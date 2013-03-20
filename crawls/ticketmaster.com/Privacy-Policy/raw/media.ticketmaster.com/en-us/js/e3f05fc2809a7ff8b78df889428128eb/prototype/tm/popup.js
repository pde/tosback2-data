Lightbox = Class.create({
initialize: function() {
this.options = Object.extend( {
zIndex: 50,
opacity: 0.5,
parent: document.body
}, arguments[0] || {} );
},
_make_shade: function() {
this.shade = new Element( 'div', {
'id': 'lightbox_shade',
'style': 'display:none;background-color:black;position:absolute;top:0px;left:0px;'
} );
this.shade.style.zIndex = this.options.zIndex;
this.shade.setOpacity( this.options.opacity );
this.options.parent.appendChild( this.shade );
if( Prototype.Browser.IE )this.blocking_iframe = new BlockingIframe( this.shade );
},
_get_height: function(){
return Math.max(document.documentElement["clientHeight"],
document.body["scrollHeight"], document.documentElement["scrollHeight"],
document.body["offsetHeight"], document.documentElement["offsetHeight"])
},
_get_width: function(){
return Math.max(document.documentElement["clientWidth"],
document.body["scrollWidth"], document.documentElement["scrollWidth"],
document.body["offsetWidth"], document.documentElement["offsetWidth"])
},
_get_dimensions: function(){
return { width: this._get_width(), height: this._get_height() };
},
_make_visible: function() {
if ( !this.shade )this._make_shade();
var size = this._get_dimensions();
this.shade.style.width = size.width + "px";
this.shade.style.height = size.height + "px";
this.shade.style.display = '';
if( this.blocking_iframe )this.blocking_iframe.update();
},
_make_invisible: function() {
if( this.shade ) {
this.shade.style.display = 'none';
if( this.blocking_iframe )this.blocking_iframe.update();
}
},
show: function () {
var options = Object.extend({
before_show: function(){},
after_show: function(){}
}, arguments[0] || {});
options.before_show();
this._make_visible();
options.after_show();
},
hide: function() {
var options = Object.extend({
before_hide: function(){},
after_hide: function(){}
}, arguments[0] || {});
options.before_hide();
this._make_invisible();
options.after_hide();
}
});
BlockingIframe = Class.create( {
initialize: function( layer, options ) {
this.options = Object.extend({
tabindex : true
}, options || {});
this.layer = layer;
},
attach: function( layer ) {
if ( !this.iframe ) {
this._make_iframe();
}
this.layer = layer;
Element.insert( this.layer,  { before: this.iframe } );
if ( this.layer.id )this.iframe.id = this.layer.id + '_blocking_iframe';
},
detach: function() {
if ( this.iframe && this.iframe.parentNode ) {
Element.remove( this.iframe );
delete this.iframe;
}
},
_make_iframe: function() {
this.iframe = document.createElement( "iframe" );
this.iframe.style.display = "none";
this.iframe.style.position = "absolute";
this.iframe.frameborder = "0";
this.iframe.title = "hidden frame";
this.iframe.style.backgroundColor = "transparent";
this.iframe.src="javascript:''";
this.iframe.style.filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
if(!this.options.tabindex) {
this.iframe.tabIndex = "-1";
}
},
update: function() {
if ( !this.iframe ) {
this.attach( this.layer );
}
var size = Element.getDimensions( this.layer );
with( this.iframe ) {
style.left = this.layer.style.left;
style.top = this.layer.style.top;
style.bottom = this.layer.style.bottom;
style.right = this.layer.style.right;
style.width = size.width + "px";
style.height = size.height + "px";
style.zIndex = this.layer.style.zIndex - 1;
style.display = this.layer.style.display;
}
}
} );
Popup = Class.create( {
initialize: function( layer_id ) {
this.defaults = {
anchor_align: {
x: -1,
y: 1
},
popup_align: {
x: -1,
y: -1
},
link_event: 'click',
adjust_on_resize: true,
close_on_clickoff: false,
tabindex : true
};
this.options = Object.extend(this.defaults, arguments[1] || {});
this.layer = $(layer_id);
this.zIndex = this.options.zIndex || '100';
this.layer.style.zIndex = this.zIndex;
this.layer.style.position = 'absolute';
this.layer.style.display = 'none';
if ( this.options.lightbox ) {
this.lightbox = new Lightbox( {
zIndex: this.layer.style.zIndex - 1,
opacity: this.options.lightbox.opacity
} );
}
else if( Prototype.Browser.IE && !this.options.no_iframe ){
this.blocking_iframe = new BlockingIframe( this.layer, { tabindex : this.options.tabindex });
}
if ( this.options.drag_id )this.setDrag( this.options.drag_id );
if ( this.options.close_id )this.setClose( this.options.close_id );
this.links = {};
if( this.options.links )this.addLinks( this.options.links );
var opts = this.options;
if (opts.carets && opts.carets.auto) {
opts.carets.top = new Element('div', {'class':'tm-top-caret',style:'display:none'});
opts.carets.bottom = new Element('div', {'class':'tm-bottom-caret',style:'display:none'});
this.layer
.insert(opts.carets.top)
.insert(opts.carets.bottom);
}
Event.observe( window, 'resize', this._onResize.bind( this ), false );
},
_update_blocking_iframe: function() {
if( this.blocking_iframe )this.blocking_iframe.update();
},
_resetAutoHideTimer: function() {
if( this.hide_timeout ) {
clearTimeout( this.hide_timeout );
delete this.hide_timeout;
}
},
_startAutohideTimer: function() {
var link = this._buildOptions( arguments[0] );
this.hide_timeout = setTimeout( this._onAutoHide.bind( this ), link.autohide_timeout );
},
_onAutoHide: function() {
this.hide();
delete this.hide_timeout;
},
addLinks: function( links ) {
for( var i = 0 ; i < links.length ; i ++ ) {
var link = links[i];
link.events = [];
var defaults = Object.extend( {}, this.defaults );
link = Object.extend( defaults, link );
var link_id = link.link_id;
var link_element = $(link_id);
if (!link_element) continue;
var show_method = this.show.bind(this, link);
var show_events = typeof(link.link_event) == 'string' ? [ link.link_event ] : link.link_event;
if ( typeof(show_events) != 'undefined' ) {
show_events.each( function( event ) {
Event.observe( link_element, event, show_method );
link.events.push( {
element: link_element,
event: event,
method: show_method
} );
} );
}
var hide_method = this.hide.bind(this, link);
var hide_events = typeof(link.hide_event) == 'string' ? [ link.hide_event ] : link.hide_event;
if ( typeof(hide_events) != 'undefined' ) {
hide_events.each( function( event ) {
Event.observe( link_element, event, hide_method );
link.events.push( {
element: link_element,
event: event,
method: hide_method
} );
} );
}
if( link.autohide_timeout ) {
var reset_method = this._resetAutoHideTimer.bind(this);
Event.observe( link_element, 'mouseover', reset_method );
link.events.push( {
element: link_element,
event: 'mouseover',
method: reset_method
} );
Event.observe( this.layer, 'mouseover', reset_method );
link.events.push( {
element: this.layer,
event: 'mouseover',
method: reset_method
} );
var start_method = this._startAutohideTimer.bind(this, link);
Event.observe( link_element, 'mouseout', start_method );
link.events.push( {
element: link_element,
event: 'mouseout',
method: start_method
} );
Event.observe( this.layer, 'mouseout', start_method );
link.events.push( {
element: this.layer,
event: 'mouseout',
method: start_method
} );
}
this.links[link_id] = link;
}
},
removeLink: function( link_id ) {
var link = this.links[link_id];
for ( var i = 0 ; i < link.events.length ; i ++ ) {
var event = link.events[i];
Event.stopObserving( event.element, event.event, event.method );
}
delete this.links[link_id];
},
removeLinks: function() {
var link_ids;
if( arguments[0] ){
link_ids = arguments[0];
}else{
link_ids = $H(this.links ).keys();
}
for( var i = 0 ; i < link_ids.length ; i ++ ){
this.removeLink( link_ids[i] );
}
},
setDrag: function ( drag_id ) {
if ( !Object.isArray(drag_id) )drag_id = [ drag_id ];
for ( var i = 0 ; i < drag_id.length ; i ++ ) {
var el = $(drag_id[i] );
Event.observe( el, 'mousedown', this.on_start_drag.bind( this ) );
el.style.cursor = 'move';
}
if ( !this.on_drag_function ) {
this.on_drag_function = this.on_drag.bind( this );
this.on_end_drag_function = this.on_end_drag.bind( this );
}
},
restrict_dragging: function( x, y ) {
var esize = this.layer.getDimensions();
var bsize = document.body.getDimensions();
x = (x < 0) ? 0 : x;
y = (y < 0) ? 0 : y;
x = (x > (bsize.width - esize.width)) ? bsize.width - esize.width : x;
y = (y > (bsize.height - esize.height)) ? bsize.height - esize.height : y;
return [x, y];
},
on_start_drag: function( e ) {
Event.observe( document.body, 'mousemove', this.on_drag_function );
Event.observe( document.body, 'mouseup', this.on_end_drag_function );
this.mouse_pos = Event.pointer( e );
Event.stop( e );
},
on_drag: function( e ) {
var mouse_pos = Event.pointer( e );
var dx = mouse_pos.x - this.mouse_pos.x;
var dy = mouse_pos.y - this.mouse_pos.y;
var offset = Element.cumulativeOffset( this.layer );
offset[0] += dx;
offset[1] += dy;
offset = this.restrict_dragging( offset[0], offset[1] );
var parent_offset = Element.cumulativeOffset( this.layer.parentNode );
offset[0] -= parent_offset[0];
offset[1] -= parent_offset[1];
this.moveTo( offset[0], offset[1] );
this.mouse_pos = mouse_pos;
Event.stop( e );
},
on_end_drag: function( e ) {
Event.stopObserving( document.body, 'mousemove', this.on_drag_function );
Event.stopObserving( document.body, 'mouseup', this.on_end_drag_function );
Event.stop( e );
},
setClose: function ( close_id ) {
if ( !Object.isArray(close_id) )close_id = [ close_id ];
for ( var i = 0 ; i < close_id.length ; i ++ ) {
$(close_id[i]).observe( 'click', this.hide.bind(this) );
}
},
moveTo: function( x, y ) {
this.layer.style.left = x + "px";
this.layer.style.top = y + "px";
this._update_blocking_iframe();
},
_onResize: function() {
if( this.options.adjust_on_resize && this.layer.style.display != "none" ) {
if( this.current_anchor ) {
var offset = this.current_anchor.cumulativeOffset();
var x = offset[0] - this.popup_anchor_offset.x;
var y = offset[1] - this.popup_anchor_offset.y;
x = x < 0 ? 0 : x;
y = y < 0 ? 0 : y;
this.moveTo( x, y );
}
}
},
_buildOptions: function() {
var options = Object.clone( this.options );
var overlay = arguments[0] || ( $H(this.links).keys().length ? this.links[$H(this.links).keys()[0]] : {} );
options = Object.extend( options, overlay );
if ( is_IE6 ) {
delete options.fade;
}
return options;
},
_checkClickOff: function( e ) {
var clicked = Event.element(e);
if (
(clicked == this.layer || !Element.descendantOf(clicked, this.layer)) &&
$H(this.links).keys().find(function (link) {
return clicked.id == link || Element.descendantOf(clicked, link);
}) == null
)
this.hide();
},
prepare_to_show: function() {
this.layer.style.top = '-10000px';
this.layer.show();
},
show: function() {
var anchor_options = this._buildOptions( arguments[0] );
if ( anchor_options.toggle && !this.layer.style.display ) {
if( anchor_options.onHideCallBack )anchor_options.onHideCallBack( anchor_options, this );
this.hide();
return;
}
if( anchor_options.onShow )
anchor_options.onShow( this );
if ( anchor_options.group ) {
if ( Popup.groups[anchor_options.group] && Popup.groups[anchor_options.group].layer.visible() )
Popup.groups[anchor_options.group].hide();
Popup.groups[anchor_options.group] = this;
}
var anchor_id = anchor_options.anchor_id || anchor_options.link_id;
var anchor = $( anchor_id );
if( anchor ) {
if( this.layer.style.display == "none" ) {
if ( !anchor_options.do_not_position ) {
this.moveTo( -3000, 0 );
}
this.layer.show();
}
this.layer.style.zIndex = this.zIndex;
if ( this.lightbox ){
if ( !anchor_options.do_not_position ) {
this.lightbox.show({ after_show: this.update_position.bind( this, anchor_options ) });
}
else {
this.lightbox.show();
}
}
else if ( !anchor_options.do_not_position ) {
this.update_position( anchor_options );
}
if ( anchor_options.close_on_clickoff ) {
this.click_off_initial = true;
this.click_off_callback = this._checkClickOff.bindAsEventListener( this );
Event.observe(document.body, 'click', this.click_off_callback);
}
if( anchor_options.onShowCallBack )anchor_options.onShowCallBack( anchor, this );
}
if ( anchor_options.fixed_position && !anchor_options.do_not_position ) {
this.fix_position_handler = this.fix_position.bind( this, anchor_options );
Event.observe( window, 'scroll', this.fix_position_handler );
Event.observe( window, 'resize', this.fix_position_handler );
}
},
update_position: function( anchor_options ) {
var anchor_id = anchor_options.anchor_id || anchor_options.link_id;
var anchor = $( anchor_id );
if ( anchor ) {
var viewport = document.viewport;
var upper_left = viewport.getScrollOffsets();
var scroll_offset = anchor.cumulativeScrollOffset();
var offset = anchor.cumulativeOffset();
offset[0] -= (scroll_offset[0] - upper_left[0]);
offset[1] -= (scroll_offset[1] - upper_left[1]);
this.current_anchor = anchor;
this.popup_anchor_offset = { x: offset[0], y: offset[1] };
var popup_align = Object.clone( anchor_options.popup_align );
var popup_offset = anchor_options.offset ? Object.clone( anchor_options.offset ) : { x:0, y:0 };
var anchor_align = Object.clone( anchor_options.anchor_align );
var popup_size = Element.getDimensions( this.layer );
var fixed = anchor_options.fixed_position;
var constrain = anchor_options.constrain;
var in_bounds = true,
cnt_tries = 0;
do {
offset = [ this.popup_anchor_offset.x, this.popup_anchor_offset.y ];
in_bounds = true;
if ( anchor_options.carets ) {
for ( var loc in anchor_options.carets ) {
var caret = anchor_options.carets[loc];
if ( Object.isElement( caret ) ) {
caret.hide();
caret.style.left = '';
caret.style.right = '';
}
}
}
if ( popup_align ) {
if ( popup_align.x == 'center' ) {
offset[0] = Math.round(upper_left.left +
((viewport.getWidth() - popup_size.width))/2);
}
else if ( anchor_align ) {
if( anchor_align.x > -1 ) {
offset[0] += anchor.getWidth() / ( anchor_align.x ? 1 : 2 );
}
if( popup_align.x > -1 ) {
offset[0] -= popup_size.width / ( popup_align.x ? 1 : 2 );
}
}
if ( popup_align.y == 'center' ) {
offset[1] = Math.round(upper_left.top +
((viewport.getHeight() - popup_size.height))/2);
}
else if ( anchor_align ) {
if( anchor_align.y > -1 ) {
offset[1] += anchor.getHeight() / ( anchor_align.y ? 1 : 2 );
}
if( popup_align.y > -1 ) {
offset[1] -= popup_size.height / ( popup_align.y ? 1 : 2 );
}
}
}
offset[0] += popup_offset.x;
offset[1] += popup_offset.y;
if ( anchor_options.carets ) {
var loc = popup_align.y < 0 ? 'top' : 'bottom';
if ( anchor_options.carets[loc] ) {
var caret = anchor_options.carets[loc];
caret.show();
var caret_size = Element.getDimensions( caret );
var caret_width = Math.round( caret_size.width / 2 );
var gap = anchor_options.carets.gap || 0;
if ( popup_align.x == 0 ) {
caret.style.left = Math.floor( popup_size.width / 2 ) - caret_width + "px";
}
else if ( popup_align.x > 0 ) {
offset[0] += gap + caret_width;
caret.style.right = gap + "px";
}
else {
offset[0] -= gap + caret_width;
caret.style.left = gap + "px";
}
if ( popup_align.y ) {
offset[1] += (caret_size.height-(anchor_options.carets.fix_height || 0))
* popup_align.y * -1;
}
}
}
if ( constrain ) {
if ( constrain.x && popup_align.x ) {
if ( !constrain.left ) {
constrain.left = 0;
}
if ( !constrain.right ) {
constrain.right = 0;
}
}
if ( constrain.y && popup_align.y ) {
if ( !constrain.top ) {
constrain.top = 0;
}
if ( !constrain.bottom ) {
constrain.bottom = 0;
}
}
fixed = false;
var lower_right = [ upper_left[0] + viewport.getWidth(), upper_left[1] + viewport.getHeight() ];
if ( typeof(constrain.top) != 'undefined' ) {
if ( (offset[1] - constrain.top) < upper_left[1] ) {
if ( constrain.y && popup_align.y ) {
if ( constrain.anchor && anchor_align.y ) {
popup_offset.y = -popup_offset.y;
anchor_align.y = -anchor_align.y;
}
popup_align.y = -popup_align.y;
in_bounds = false;
}
else {
offset[1] = upper_left[1] + constrain.top;
fixed = true;
}
}
}
if ( typeof(constrain.right) != 'undefined' ) {
if ( (offset[0] + this.layer.offsetWidth - constrain.right) > lower_right[0] ) {
if ( constrain.x && popup_align.x ) {
if ( constrain.anchor && anchor_align.x ) {
popup_offset.x = -popup_offset.x;
anchor_align.x = -anchor_align.x;
}
popup_align.x = -popup_align.x;
in_bounds = false;
}
else {
offset[0] = lower_right[0] - popup_size.width + constrain.right;
fixed = true;
}
}
}
if ( typeof(constrain.left) != 'undefined' ) {
if ( (offset[0] - constrain.left) < upper_left[0] ) {
if ( constrain.x && popup_align.x ) {
if ( constrain.anchor && anchor_align.x ) {
popup_offset.x = -popup_offset.x;
anchor_align.x = -anchor_align.x;
}
popup_align.x = -popup_align.x;
in_bounds = false;
}
else {
offset[0] = upper_left[0] + constrain.left;
fixed = true;
}
}
}
if ( typeof(constrain.bottom) != 'undefined' ) {
if ( (offset[1] + this.layer.offsetHeight - constrain.bottom) > lower_right[1] ) {
if ( constrain.y && popup_align.y ) {
if ( constrain.anchor && anchor_align.y ) {
popup_offset.y = -popup_offset.y;
anchor_align.y = -anchor_align.y;
}
popup_align.y = -popup_align.y;
in_bounds = false;
}
else {
offset[1] = lower_right[1] - popup_size.height + constrain.bottom;
fixed = true;
}
}
}
}
cnt_tries++;
} while ( !in_bounds && cnt_tries < 4 );
if ( fixed && !is_IE6 ) {
if ( !this.push_layer ) {
this.push_layer = new Element('div');
document.body.appendChild( this.push_layer );
}
this.push_layer.setStyle( {
display: '',
position: 'absolute',
left: '0px',
top: '0px',
width: offset[0] + popup_size.width + 'px',
height: '1px'
} );
offset[0] -= upper_left[0];
offset[1] -= upper_left[1];
this.layer.style.position = 'fixed';
}
else {
this.layer.style.position = 'absolute';
if ( this.push_layer ) {
this.push_layer.setStyle( {
display: 'none'
} );
}
}
if ( anchor_options.fade && anchor_options.fade.show ) {
this.layer.hide();
}
this.moveTo( offset[0], offset[1] );
if ( anchor_options.fade && anchor_options.fade.show ) {
new Effect.Appear( this.layer, {
duration: anchor_options.fade.show / 1000
} );
}
this.popup_anchor_offset.x -= offset[0];
this.popup_anchor_offset.y -= offset[1];
}
},
fix_position: function ( anchor_options ) {
this.update_position( anchor_options );
},
hide: function() {
var options = this._buildOptions( arguments[0] );
if ( options.fade && options.fade.hide ) {
var fade_options = {
duration: options.fade.hide / 1000
};
if( options.onHide ) {
fade_options.afterFinish = options.onHide.bind( this );
}
new Effect.Fade( this.layer, fade_options );
}
else {
this.layer.hide();
}
this._update_blocking_iframe();
if( options.onHide && ( !options.fade || !options.fade.hide ) ){
options.onHide( this );
}
if ( this.lightbox ) {
this.lightbox.hide();
}
if ( options.onHideCallBack ){
options.onHideCallBack( options, this );
}
if ( this.click_off_callback != null ){
Event.stopObserving(document.body, 'click', this.click_off_callback);
}
if ( this.fix_position_handler ) {
Event.stopObserving( window, 'scroll', this.fix_position_handler );
Event.stopObserving( window, 'resize', this.fix_position_handler );
delete this.fix_position_handler;
}
}
} );
Popup.groups = {};
Popup.hide_group = function( group ) {
if ( Popup.groups[group] )
Popup.groups[group].hide();
};
