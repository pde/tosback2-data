





(function($) {
var lib = window.lib = function($) {
return {
image : {
preload : function(images) {
var tImageArr = [];
var tImages = images.split(",");
$(tImages).each(function(i) {
tImageArr[i] = new Image();
tImageArr[i].src = tImages[i];
});
}
},
input : {
defaultText : function(selector, settings) {
settings = $.extend({
defaultText: "enter keyword or item"
}, settings);

return $(selector).each(function(){
$(this).focus( function() {
if( $(this).val() == settings.defaultText )
{ $(this).val(""); }
});

$(this).blur(function() {
$(this).val( lib.utils.strTrim($(this).val()) );
if( $(this).val() == "" )
{ $(this).val( settings.defaultText ); }
});
$(this).blur();
});
},
setMaxCharacters : function(selector, settings) {
settings = $.extend({
limit: 500,
results : "#_donotplace"
}, settings);

$(selector).bind("keyup.max_characters", function() {
if( $(this).val().length > settings.limit )
{ $(this).val( $(this).val().substring(0, settings.limit) ); }

var remainingCount = ((settings.limit - $(this).val().length) == 0) ? "0" : settings.limit - $(this).val().length;
$(settings.results).html(remainingCount);
});
$(selector).keyup();
},
autoAdvance : function(selector) {
$(selector).each(function(i) {
$(this).keyup(function() {
if( $(this).val().length >= $(this).attr("maxlength") )
{
$(this).blur();
$(selector).eq(i+1).focus();
}
});
});
}
},
link : {
disable : function(selector) {
$(selector).attr("href","#jsLink");
$(selector).click(function(evt) {
evt.preventDefault();
});
},
popupWindow : function(selector, settings) {
settings = jQuery.extend({
width: 500,
height: 500,
toolbar: 0,
menubar: 0,
location: 0,
directories: 0,
status: 0,
scrollbars: 0,
resizable: 0,
name: "Popup_Window"
}, settings);

return $(selector).each(function() {
var features = "toolbar=" + settings.toolbar + "," +
"menubar=" + settings.menubar + "," +
"location=" + settings.location + "," +
"directories=" + settings.directories + "," +
"status=" + settings.status + "," +
"scrollbars=" + settings.scrollbars + "," +
"resizable=" + settings.resizable;
$(this).click(function(evt) {
evt.preventDefault();
var newWindow = window.open($(this).attr("href"), settings.name, 'width=' + settings.width + ',height=' + settings.height + ',"' + features + '"');
newWindow.focus();
});
});
}
},
screen : {
position : function() {
if( typeof( window.pageYOffset ) == 'number' ) {
//Netscape compliant
return [ window.pageXOffset, window.pageYOffset ];
} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
//DOM compliant
return [ document.body.scrollLeft, document.body.scrollTop ];
} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
//IE6 standards compliant mode
return [ document.documentElement.scrollLeft, document.documentElement.scrollTop ];
} else {
return [ -1, -1 ];
}
},
size : function() {
var vpW = 0, vpH = 0;
if (typeof window.innerWidth != 'undefined')
{ return [ window.innerWidth, window.innerHeight ]; }
else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
{ return [ document.documentElement.clientWidth, document.documentElement.clientHeight ]; }
else
{ return [ document.getElementsByTagName('body')[0].clientWidth, document.getElementsByTagName('body')[0].clientHeight ]; }
}
},
layer : {
add : function(selector, defaultHTML, closeButton) {
lib.layer.remove(selector);
addHTML = '<div id="' + selector.split("#")[1] + '"></div>';
$("body").append(addHTML);
$(selector).append(defaultHTML);
lib.layer.vCenter(selector);
lib.layer.ie6Fix(selector, "a");
lib.layer.closeButton(closeButton, selector);
},
remove : function(selector) {
if( $(selector).size() > 0 )
{
$(selector).remove();
lib.layer.ie6Fix(selector,"r");
}
},
loadHTML : function(selector,page,closeButton) {
$.get(page,function(data) {
$(selector + " *").remove();
$(selector).html("");
$(selector).append(data);
lib.layer.vCenter(selector);
lib.layer.ie6Fix(selector,"u");
lib.layer.closeButton(closeButton, selector);
});
},
vCenter : function(selector) {
var wPosition = lib.screen.position();
var wSize = lib.screen.size();
var top = ((wSize[1] / 2) - ($(selector).height() / 2)) + wPosition[1];
top = (top < 0) ? 100 : top;
$(selector).css("top",top+"px");
lib.layer.ie6Fix(selector,"u");
},
closeButton : function( selector, layerSelector ) {
lib.link.disable(layerSelector + " " + selector);
$(layerSelector + " " + selector).unbind("click.lib.layer.close").bind("click.lib.layer.close", function() { lib.layer.remove(layerSelector); });
},
ie6Fix : function(selector,action) {
if(lib.utils.isIE6())
{
var fixId = selector.split("#")[1] + "-iframe";
var exists = $("#" + fixId).size() > 0 ? true : false;

if(action == "r" && exists)
{ $("#" + fixId).remove(); }

if(action == "a" && !exists)
{
fixHTML = '<div id="' + fixId + '"><iframe width="100%" height="100%" frameborder="0" style="filter:progid:DXImageTransform.Microsoft.Alpha(opacity=1);" src="/assets/blank.gif"><!-- --></iframe></div>';
$("body").append(fixHTML);
exists = $("#" + fixId).size() > 0 ? true : false;
}

if( (action == "a") || (action == "u") && exists )
{
$("#" + fixId).css("position", $(selector).css("position"));
$("#" + fixId).css("height", $(selector).height());
$("#" + fixId).css("width", $(selector).width());
$("#" + fixId).css("margin-left", $(selector).css("margin-left"));
$("#" + fixId).css("margin-right", $(selector).css("margin-right"));
$("#" + fixId).css("margin-top", $(selector).css("margin-top"));
$("#" + fixId).css("margin-bottom", $(selector).css("margin-bottom"));
$("#" + fixId).css("top", $(selector).css("top"));
$("#" + fixId).css("left", $(selector).css("left"));
$("#" + fixId).css("bottom", $(selector).css("bottom"));
$("#" + fixId).css("right", $(selector).css("right"));
$("#" + fixId).css("z-index", $(selector).css("z-index")-1);
}
}
}
},
json : {
get : function(url, data, func) {
$.getJSON(url, data, function(data) { func(data); });
}
},
utils : {
isIE6 : function() {
if($.browser.msie && (parseFloat($.browser.version) < 7))
{ return true; }
return false;
},
timestamp : function() {
return new Date().getTime();
},
strTrim : function(s) {
while (s.substring(0,1) == ' ') {
s = s.substring(1, s.length);
}
while (s.substring(s.length-1, s.length) == ' ') {
s = s.substring(0, s.length-1);
}
return s;
}
},
func : {
formSetup : function() {
/* Basicly Stylesheet Entries */
/*
div.FormArea {}
div.FormArea div.FormEntry { border: 1px solid #fff; padding: 5px; margin-bottom: 15px; }
div.FormArea div.FormEntry label { display: block; margin-bottom: 5px; font-weight: bold; }
div.FormArea div.FormEntry label.optional { font-weight: normal; }
div.FormArea div.FormError { border: 1px solid red; background-color: #fff; }
div.FormArea div.FormError .ErrorText { display: block; margin-bottom: 5px; }
.FormFieldHighlight { background-color: yellow; }
*/

var formSelector = ".FormArea";
var globalErrorClass = "ErrorText";
var formFieldHighlightClass = "FormFieldHighlight";
var formEntryErrorClass = "FormError";
var formEntryClass = "FormEntry";
var inputs = "input, select, textarea";

$(formSelector + " ." + globalErrorClass).each(function() {
var formEntry = $(this).parent();
while( !$(formEntry).is(".FormEntry") )
{ formEntry = $(formEntry).parent(); }
$(formEntry).addClass( formEntryErrorClass );
});
$(inputs, $(formSelector)).bind("focus.fields", function(evt) {
if( (!$(evt.target).is("input[@type=image]")) && (!$(evt.target).is("input[@type=radio]")) )
{ $(evt.target).addClass( formFieldHighlightClass ); }
});
$(inputs, $(formSelector)).bind("blur.fields", function(evt) {
$(evt.target).removeClass( formFieldHighlightClass );
});
$("select", $(formSelector)).mousedown(function(evt) {
$(evt.target).addClass( formFieldHighlightClass );
});
}
},
obj : {
contentCollection : function(settings) {
if(arguments.length > 0)
{ this.init(settings); }
},
itemSlider : function(settings) {
if(arguments.length > 0)
{ this.init(settings); }
},
button : function(settings) {
if(arguments.length > 0)
{ this.init(settings); }
}
},
about : function() {
alert("Property: Fry, Inc.");
}
};
}($);

/* button Code */
lib.obj.button.prototype.init = function(settings) {
settings = jQuery.extend({
off: "but-off.gif",
on: "but-on.gif",
hover: "but-hover.gif",
hasClick: false,
hasHover: true,
activeId: "but-active",
cssButton: false,
cssOff: "glo-but-css-off",
cssOn: "glo-but-css-on",
cssHover: "glo-but-css-hover",
buttonSelector: ".but-class",
buttonCollectionSelector : ".but-class"
} , settings);

this.buttonSelector = settings.buttonSelector;
this.buttonCollectionSelector = settings.buttonCollectionSelector;
this.activeId = settings.activeId;
this.hasClick = settings.hasClick;
this.hasHover = settings.hasHover;

if( settings.cssButton )
{
this.type = "CSSBUTTON";
this.cssOff = settings.cssOff;
this.cssOn = settings.cssOn;
this.cssHover = settings.cssHover;
var pObj = this;

$(this.buttonSelector).each(function() {
// make sure the right styles are on the button by default.
if( $(this).attr("id") != pObj.activeId )
{ $(this).addClass(pObj.cssOff);}
else
{
$(this).removeClass(pObj.cssOff);
$(this).addClass(pObj.cssOn);
}
//setup the hover
if( pObj.hasHover )
{
$(this).unbind("mouseover.button").bind("mouseover.button", function() {
if( $(this).attr("id") != pObj.activeId )
{
$(this).removeClass(pObj.cssOff);
$(this).addClass(pObj.cssHover);
}
});
$(this).unbind("mouseout.button").bind("mouseout.button", function() {
if( $(this).attr("id") != pObj.activeId )
{
$(this).removeClass(pObj.cssHover);
$(this).addClass(pObj.cssOff);
}
});
}
//setup the click
if( pObj.hasClick )
{
$(this).unbind("click.button").bind("click.button", function() {
if( $(this).attr("id") != pObj.activeId )
{
$(pObj.buttonCollectionSelector).attr("id","");
$(pObj.buttonCollectionSelector).removeClass(pObj.cssHover);
$(pObj.buttonCollectionSelector).removeClass(pObj.cssOn);
$(pObj.buttonCollectionSelector).trigger("mouseout.button");
$(this).removeClass(pObj.cssOff);
$(this).addClass(pObj.cssOn);
$(this).attr("id",pObj.activeId);
}
});
}
});
}
else
{
this.type = "IMAGEBUTTON";
this.off = settings.off;
this.on = settings.on;
this.hover = settings.hover;
var pObj = this;
$(this.buttonSelector).each(function() {
// always have the mouseout
$(this).unbind("mouseout.button").bind("mouseout.button", function() {
if( $(this).attr("id") != pObj.activeId )
{ $(this).attr("src",pObj.off); }
});
//setup the hover
if( pObj.hasHover )
{
$(this).unbind("mouseover.button").bind("mouseover.button", function() {
if( $(this).attr("id") != pObj.activeId )
{ $(this).attr("src",pObj.hover); }
});
}
//setup the click
if( pObj.hasClick )
{
$(this).unbind("click.button").bind("click.button", function() {
if( $(this).attr("id") != pObj.activeId )
{
$(pObj.buttonCollectionSelector).attr("id","");
$(pObj.buttonCollectionSelector).trigger("mouseout.button");
$(this).attr("src",pObj.on);
$(this).attr("id",pObj.activeId);
}
});
}
});

lib.image.preload(pObj.off);
if( pObj.hasClick )
{lib.image.preload(pObj.on); }
if (pObj.hasHover )
{ lib.image.preload(pObj.hover); }
}
};
/* ------------- */

/* itemSlider Object Code */
lib.obj.itemSlider.prototype.init = function(settings) {
settings = $.extend({
viewport: "#widget-slider-viewport",
content: "#widget-slider-content",
next: "#widget-slider-next",
prev: "#widget-slider-prev",
item: "div",
direction: "vertical",
showAmount: 3
}, settings);

this.viewport = settings.viewport;
this.content = settings.content;
this.next = settings.next;
this.prev = settings.prev;
this.item = settings.item;
this.direction = settings.direction;
this.showAmount = settings.showAmount;
this.sliderInfo = new Object();
this.sliderInfo.index = 0;

// fix overflwo for items not showing (should be FF only?)
$(this.item + " *").each(function(i) {
if( $(this).css("overflow") == "auto" )
{ $(this).addClass("is__overflow"); }
});
$(".is__overflow", $(this.item).slice(this.sliderInfo.index+this.showAmount, $(this.item).size())).css("overflow", "hidden");
// --------------------------------

if ( $(this.viewport).size() > 0 )
{
$(this.next).hide();
$(this.prev).hide();

if( $(this.item).size() > this.showAmount )
{ $(this.next).show(); }

if( this.direction == "vertical" )
{
this.sliderInfo.start = 0;
this.sliderInfo.end = ($(this.item).size() - this.showAmount) * $(this.item).eq(0).height() * -1;
this.sliderInfo.itemSize = $(this.item).eq(0).height();
this.sliderInfo.top = 0;
}
else
{
//setup the vars.
this.sliderInfo.start = 0;
this.sliderInfo.end = ($(this.item).size() - this.showAmount) * $(this.item).eq(0).width() * -1;
this.sliderInfo.itemSize = $(this.item).eq(0).width();
this.sliderInfo.left = 0;
}

this.nextSetup();
this.prevSetup();

}
};
lib.obj.itemSlider.prototype.nextSetup = function() {
$(this.next).unbind("click");
var currObj = this;
setTimeout(function() {
$(".is__overflow", $(currObj.item).slice(currObj.sliderInfo.index, currObj.sliderInfo.index+currObj.showAmount)).css("overflow", "auto");
$(currObj.next).click(function(evt) {
evt.preventDefault();
$(".is__overflow", $(currObj.item).eq(currObj.sliderInfo.index)).css("overflow","hidden");
currObj.sliderInfo.index++;
if(currObj.direction == "vertical")
{
currObj.sliderInfo.top = parseInt($(currObj.content).css("top").split("px")[0]) - currObj.sliderInfo.itemSize;
$(currObj.content).animate( { top:currObj.sliderInfo.top+"px"}, 350 );
if( currObj.sliderInfo.top == currObj.sliderInfo.end )
{ $(currObj.next).hide(); }
if( currObj.sliderInfo.top != 0 )
{ $(currObj.prev).show(); }
}
else
{
currObj.sliderInfo.left = parseInt($(currObj.content).css("left").split("px")[0]) - currObj.sliderInfo.itemSize;
$(currObj.content).animate( { left:currObj.sliderInfo.left+"px"}, 350 );
if( currObj.sliderInfo.left == currObj.sliderInfo.end )
{ $(currObj.next).hide(); }
if( currObj.sliderInfo.left != 0 )
{ $(currObj.prev).show(); }
}
currObj.nextSetup();
});
}, 351);
};
lib.obj.itemSlider.prototype.prevSetup = function() {
$(this.prev).unbind("click");
var currObj = this;
setTimeout(function() {
$(".is__overflow", $(currObj.item).slice(currObj.sliderInfo.index, currObj.sliderInfo.index+currObj.showAmount)).css("overflow", "auto");
$(currObj.prev).click(function(evt) {
evt.preventDefault();
$(".is__overflow", $(currObj.item).eq(currObj.sliderInfo.index + currObj.showAmount-1)).css("overflow","hidden");
currObj.sliderInfo.index--;
if( currObj.direction == "vertical")
{
currObj.sliderInfo.top = parseInt($(currObj.content).css("top").split("px")[0]) + currObj.sliderInfo.itemSize;
$(currObj.content).animate( { top:currObj.sliderInfo.top+"px"}, 350 );
if( currObj.sliderInfo.top != currObj.sliderInfo.end )
{ $(currObj.next).show(); }
if( currObj.sliderInfo.top == 0 )
{ $(currObj.prev).hide(); }
}
else
{
currObj.sliderInfo.left = parseInt($(currObj.content).css("left").split("px")[0]) + currObj.sliderInfo.itemSize;
$(currObj.content).animate( { left:currObj.sliderInfo.left+"px"}, 350 );
if( currObj.sliderInfo.left != currObj.sliderInfo.end )
{ $(currObj.next).show(); }
if( currObj.sliderInfo.left == 0 )
{ $(currObj.prev).hide(); }
}

currObj.prevSetup();
});
}, 351);
};
/* ----------------------- */


/* contentCollection */
lib.obj.contentCollection.prototype.init = function(settings) {
settings = jQuery.extend({
selectorContent : ".lib_cC_Content",
selectorActivator : ".lib_cC_Activator",
defaultIndex : 0
}, settings);

this.selectorContent = settings.selectorContent;
this.defaultIndex = settings.defaultIndex;
this.eventName = "click.contentCollection_" + lib.utils.timestamp();
this.selectorActivators = settings.selectorActivator.split(",");

//Initialize the collection correctly.
this.activateContent(this.defaultIndex);

//setup the events
var this_contentCollection = this;

for( var x = 0; x < this.selectorActivators.length; x++)
{
$(this.selectorActivators[x]).each(function(i) {
$(this).unbind(this_contentCollection.eventName).bind(this_contentCollection.eventName, function(evt) {
evt.preventDefault();
this_contentCollection.activateContent(i);
});
});
}
};
lib.obj.contentCollection.prototype.activateContent = function(index) {
$(this.selectorContent).hide();
$(this.selectorContent).eq(index).show();
};
/* ------------------ */

})($);


/* -------- BEGIN LIB2 ------------ */

(function($) {

var lib2 = window.lib2 = {
image : {
preload : function(images) {
var tImageArr = [];
var tImages = images.split(",");
$(tImages).each(function(i) {
tImageArr[i] = new Image();
tImageArr[i].src = tImages[i];
});
},
isComplete : function( selector ) {
var complete = true;
$(selector).each(function() {
if( !$(this).get(0).complete )
{ complete = false; }
});
return complete;
}
},
input : {
defaultText : function(selector, settings) {
var settings = $.extend({
defaultText: "enter keyword or item"
}, settings);

$(selector).each(function(){
$(this).focus( function() {
if( $(this).val() == settings.defaultText )
{ $(this).val(""); }
});

$(this).blur(function() {
$(this).val( lib2.utils.strTrim($(this).val()) );
if( $(this).val() == "" )
{ $(this).val( settings.defaultText ); }
});
$(this).blur();
});
},
setMaxCharacters : function(selector, settings) {
var settings = $.extend({
limit: 500,
results : "#_donotplace"
}, settings);

$(selector).bind("keyup.max_characters", function() {
if( $(this).val().length > settings.limit )
{ $(this).val( $(this).val().substring(0, settings.limit) ); }

var remainingCount = ((settings.limit - $(this).val().length) == 0) ? "0" : settings.limit - $(this).val().length;
$(settings.results).html(remainingCount);
});
$(selector).keyup();
},
autoAdvance : function(selector) {
$(selector).each(function(i) {
$(this).keyup(function() {
if( $(this).val().length >= $(this).attr("maxlength") )
{
$(this).blur();
$(selector).eq(i+1).focus();
}
});
});
}
},
link : {
popupWindow : function(selector, settings) {
$(selector).click(function(evt) {
evt.preventDefault();
lib2.link.openPopup( $(this).attr("href"), settings );
});
},
openPopup : function( url, settings ) {
var settings = jQuery.extend({
width: 500,
height: 500,
toolbar: 0,
menubar: 0,
location: 0,
directories: 0,
status: 0,
scrollbars: 0,
resizable: 0,
name: "Popup_Window"
}, settings);

var features = "toolbar=" + settings.toolbar + "," +
"menubar=" + settings.menubar + "," +
"location=" + settings.location + "," +
"directories=" + settings.directories + "," +
"status=" + settings.status + "," +
"scrollbars=" + settings.scrollbars + "," +
"resizable=" + settings.resizable;

var newWindow = window.open( url, settings.name, 'width=' + settings.width + ',height=' + settings.height + ',"' + features + '"');
if( newWindow != null) { newWindow.focus(); }
}
},
screen : {
position : function() {
if( typeof( window.pageYOffset ) == 'number' ) {
//Netscape compliant
return [ window.pageXOffset, window.pageYOffset ];
} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
//DOM compliant
return [ document.body.scrollLeft, document.body.scrollTop ];
} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
//IE6 standards compliant mode
return [ document.documentElement.scrollLeft, document.documentElement.scrollTop ];
} else {
return [ 0, 0 ];
}
},
size : function() {
return [ $(window).width(), $(window).height() ];
}
},
layer : {
initManager : function() {
$(window).unbind("resize.layerManager").bind("resize.layerManager", function() {
$(".lib__keepcentered").each(function(){ lib2.layer.center( "#" + $(this).attr("id") ); });
$(".lib__shouldbecentered").each(function() {
$(this).addClass("lib__keepcentered").removeClass("lib__shouldbecentered");
lib2.layer.center( "#" + $(this).attr("id") );
});
}).unbind("scroll.layerManager").bind("scroll.layerManager", function() {
$(".lib__keepcentered").each(function(){ lib2.layer.center( "#" + $(this).attr("id") ); });
});
},
create : function(selector, settings) {
var settings = $.extend({
closeSelector : "#_none",
url : null,
defaultContent : "",
xPos : null,
yPos : null,
keepCentered : false,
callback : null,
method : "get",
data : null,
transition : false
}, settings);

lib2.layer.add( selector, settings );
if( settings.url != null)
{
if (settings.method == "get")
{
$.get(settings.url, settings.data, function(data){
settings.defaultContent = data;
lib2.layer.add(selector, settings);
if (settings.callback != null) {
settings.callback();
}
});
}
else
{
$.post(settings.url, settings.data, function(data){
settings.defaultContent = data;
lib2.layer.add(selector, settings);
if (settings.callback != null) {
settings.callback();
}
});
}
}
else
{
if( settings.callback != null )
{ settings.callback(); }
}
},
add : function(selector, settings) {
lib2.layer.remove(selector);
var layerTransitionHTML = ( settings.transition ) ? ( 'class="lib__transition" style="opacity: 0; filter: alpha(opacity=0)"' ) : "";
var addHTML = '<div id="' + selector.split("#")[1] + '" ' + layerTransitionHTML +'></div>';
$("body").append(addHTML);

if( settings.xPos != null && settings.yPos != null )
{
$(selector).css("left", settings.xPos+"px").css("top", settings.yPos+"px");
$(selector).append(settings.defaultContent);
}
else
{
if( settings.keepCentered )
{ $(selector).addClass("lib__keepcentered"); }
lib2.layer.center(selector);
$(selector).append(settings.defaultContent);
lib2.layer.center(selector);
}

/* Transition in the Layer, if applicable */
if( settings.transition )
{ $(selector).fadeTo(250, 1); }
/* --------------------- */

lib2.layer.ie6Fix(selector, "a");
lib2.layer.closeButton(settings.closeSelector, selector);
},
remove : function(selector) {
$(selector).remove();
lib2.layer.ie6Fix(selector,"r");
},
center : function(selector) {
var wPosition = lib2.screen.position();
var wSize = lib2.screen.size();

/* Get Left Offset */
var left = 0;
left = (( wSize[0] - $(selector).width() ) / 2);
left = ( left < 0 ) ? 20 : left;
left += wPosition[0];
/* ---------------- */

/* Get Top Offset */
var top = 0;
top = (( wSize[1] - $(selector).height() ) / 2);
top = ( top < 0 ) ? 20 : top;
top += wPosition[1];
/* ----------------- */

/* if layer Can't be centered on Screen */
if( ( $(selector).width() > wSize[0] ) || ( $(selector).height() > wSize[1] ) )
{
/* Should this layer stay centered? */
if( $(selector).hasClass("lib__keepcentered") )
{ $(selector).removeClass("lib__keepcentered").addClass("lib__shouldbecentered"); }
}
/* ---------------------------------- */

$(selector).css("top",top+"px").css("left", left+"px");
lib2.layer.ie6Fix(selector,"u");
},
closeButton : function( selector, layerSelector ) {
$(layerSelector + " " + selector).unbind("click.lib.layer.close").bind("click.lib.layer.close", function(evt) { evt.preventDefault(); lib2.layer.remove(layerSelector); });
},
ie6Fix : function(selector,action) {
if(lib2.utils.isIE6())
{
var fixId = selector.split("#")[1] + "-iframe";
var exists = $("#" + fixId).size() > 0 ? true : false;

if(action == "r" && exists)
{ $("#" + fixId).remove(); }

if( ((action == "a") || (action == "u")) && !exists)
{
fixHTML = '<div id="' + fixId + '"><iframe width="100%" height="100%" frameborder="0" src="/css/blank.gif" style="filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);"><!-- --></iframe></div>';
$("body").append(fixHTML);
exists = $("#" + fixId).size() > 0 ? true : false;
}

if( (action == "a" || "u") && exists)
{
$("#" + fixId).css("position", $(selector).css("position"));
$("#" + fixId).css("height", $(selector).height());
$("#" + fixId).css("width", $(selector).width());
$("#" + fixId).css("margin-left", $(selector).css("margin-left"));
$("#" + fixId).css("margin-right", $(selector).css("margin-right"));
$("#" + fixId).css("margin-top", $(selector).css("margin-top"));
$("#" + fixId).css("margin-bottom", $(selector).css("margin-bottom"));
$("#" + fixId).css("top", $(selector).css("top"));
$("#" + fixId).css("left", $(selector).css("left"));
$("#" + fixId).css("bottom", $(selector).css("bottom"));
$("#" + fixId).css("right", $(selector).css("right"));
$("#" + fixId).css("z-index", $(selector).css("z-index")-1);
}
}
}
},
utils : {
isIE6 : function() {
var IE6 = /msie|MSIE 6/.test(navigator.userAgent);
return IE6;
},
timestamp : function() {
return new Date().getTime();
},
strTrim : function(s) {
return s.replace(/^\s+|\s+$/g, "");
},
getPosition : function( selector ) {
var positions = [];
$(selector).each(function(i) {
var offset = $(this).offset();
positions[positions.length] = [ offset.left, offset.top ];
});
return positions
},
strTruncate : function(selector, settings) {
var settings = $.extend({
length : 20,
postfix : "..."
}, settings);

settings.length -= settings.postfix.length;

$(selector).each(function() {
var text = $(this).text();
if( text.length > settings.length )
{
var tIndex = settings.length-1;
while( ( text.charAt(tIndex) != " ") && (tIndex > 0) )
{ tIndex--; }

tIndex = ( tIndex == 0 ) ? settings.length : tIndex+1;
$(this).text( text.substr(0,tIndex) + settings.postfix);
}
});
},
cookie : function(settings) {
var settings = $.extend({
name : "",
value : null,
expires : null,
path : null,
domain : null,
secure : null
}, settings);
var cookieValue = null;
if( settings.name != "" )
{
/* Set the cookie */
if( settings.value != null || settings.expires != null )
{
settings.value = ( settings.value == null ) ? "" : settings.value;
var cookieString = settings.name + "=" + encodeURIComponent(settings.value);
if( settings.expires != null )
{
var expirationDate = new Date();
expirationDate.setTime(expirationDate.getTime() + (settings.expires * 24 * 60 * 60 * 1000));
cookieString += "; expires=" + expirationDate.toUTCString();
}
cookieString += ( settings.path != null ) ? "; path=" + settings.path : "";
cookieString += ( settings.domain != null ) ? "; domain=" + settings.domain : "";
cookieString += ( settings.secure != null ) ? "; secure" : "";
document.cookie = cookieString;
}
/* ---------------- */

/* Get the cookie */
if( document.cookie.length > 0 )
{
var results = document.cookie.match( '(^|;) ?' + settings.name + '=([^;]*)(;|$)');
if( results )
{ cookieValue = decodeURIComponent(results[2]); }
}
/* ----------------- */
}
return cookieValue;
}
},
func : {
formSetup : function() {
var formSelector = ".formArea";
var globalErrorClass = "errorText";
var formFieldHighlightClass = "formFieldHighlight";
var formEntryErrorClass = "formError";
var formEntryClass = "formEntry";
var inputs = "input, select, textarea";

$(formSelector + " ." + globalErrorClass).each(function() {
var formEntry = $(this).parent();
while( !$(formEntry).is("." + formEntryClass) )
{ formEntry = $(formEntry).parent(); }
$(formEntry).addClass( formEntryErrorClass );
});
$(inputs, $(formSelector)).bind("focus.fields", function(evt) {
if( (!$(evt.target).is("input[type=image]")) && (!$(evt.target).is("input[type=radio]")) && (!$(evt.target).is("input[type=checkbox]")) )
{ $(evt.target).addClass( formFieldHighlightClass ); }
});
$(inputs, $(formSelector)).bind("blur.fields", function(evt) {
$(evt.target).removeClass( formFieldHighlightClass );
});
$("select", $(formSelector)).mousedown(function(evt) {
$(evt.target).addClass( formFieldHighlightClass );
});
}
},
obj : {
contentCollection : function(settings) {
if(arguments.length > 0)
{ this.init(settings); }
},
itemSlider : function(settings) {
if(arguments.length > 0)
{ this.init(settings); }
},
ajaxItemSlider : function(settings) {
if(arguments.length > 0)
{ this.init(settings); }
},
button : function(settings) {
if(arguments.length > 0)
{ this.init(settings); }
},
pageOverlay : function(settings) {
if(arguments.length > 0)
{ this.init(settings); }
}
},
about : function() {

}
};

/* button Code */
lib2.obj.button.prototype.init = function(settings) {
var settings = jQuery.extend({
off: "but-off.gif",
on: "but-on.gif",
hover: "but-hover.gif",
hasClick: false,
hasHover: true,
activeId: "but-active",
cssButton: false,
cssOff: "glo-but-css-off",
cssOn: "glo-but-css-on",
cssHover: "glo-but-css-hover",
buttonSelector: ".but-class",
buttonCollectionSelector : ".but-class"
}, settings);

this.buttonSelector = settings.buttonSelector;
this.buttonCollectionSelector = settings.buttonCollectionSelector;
this.activeId = settings.activeId;
this.hasClick = settings.hasClick;
this.hasHover = settings.hasHover;

if( settings.cssButton )
{
this.type = "CSSBUTTON";
this.cssOff = settings.cssOff;
this.cssOn = settings.cssOn;
this.cssHover = settings.cssHover;
var pObj = this;

$(this.buttonSelector).each(function() {
// make sure the right styles are on the button by default.
if( $(this).attr("id") != pObj.activeId )
{ $(this).addClass(pObj.cssOff);}
else
{
$(this).removeClass(pObj.cssOff);
$(this).addClass(pObj.cssOn);
}
//setup the hover
if( pObj.hasHover )
{
$(this).unbind("mouseover.button").bind("mouseover.button", function() {
if( $(this).attr("id") != pObj.activeId )
{
$(this).removeClass(pObj.cssOff);
$(this).addClass(pObj.cssHover);
}
});
$(this).unbind("mouseout.button").bind("mouseout.button", function() {
if( $(this).attr("id") != pObj.activeId )
{
$(this).removeClass(pObj.cssHover);
$(this).addClass(pObj.cssOff);
}
});
}
//setup the click
if( pObj.hasClick )
{
$(this).unbind("click.button").bind("click.button", function() {
if( $(this).attr("id") != pObj.activeId )
{
$(pObj.buttonCollectionSelector).attr("id","");
$(pObj.buttonCollectionSelector).removeClass(pObj.cssHover);
$(pObj.buttonCollectionSelector).removeClass(pObj.cssOn);
$(pObj.buttonCollectionSelector).trigger("mouseout.button");
$(this).removeClass(pObj.cssOff);
$(this).addClass(pObj.cssOn);
$(this).attr("id",pObj.activeId);
}
});
}
});
}
else
{
this.type = "IMAGEBUTTON";
this.off = settings.off;
this.on = settings.on;
this.hover = settings.hover;
var pObj = this;
$(this.buttonSelector).each(function() {
// always have the mouseout
$(this).unbind("mouseout.button").bind("mouseout.button", function() {
if( $(this).attr("id") != pObj.activeId )
{ $(this).attr("src",pObj.off); }
});
//setup the hover
if( pObj.hasHover )
{
$(this).unbind("mouseover.button").bind("mouseover.button", function() {
if( $(this).attr("id") != pObj.activeId )
{ $(this).attr("src",pObj.hover); }
});
}
//setup the click
if( pObj.hasClick )
{
$(this).unbind("click.button").bind("click.button", function() {
if( $(this).attr("id") != pObj.activeId )
{
$(pObj.buttonCollectionSelector).attr("id","");
$(pObj.buttonCollectionSelector).trigger("mouseout.button");
$(this).attr("src",pObj.on);
$(this).attr("id",pObj.activeId);
}
});
}
});

lib2.image.preload(pObj.off);
if( pObj.hasClick )
{lib2.image.preload(pObj.on); }
if (pObj.hasHover )
{ lib2.image.preload(pObj.hover); }
}
};
/* ------------- */


/* contentCollection */
lib2.obj.contentCollection.prototype.init = function(settings) {
var settings = $.extend({
selectorContent : ".lib_cC_Content",
selectorActivator : ".lib_cC_Activator",
defaultIndex : 0
}, settings);

this.selectorContent = settings.selectorContent;
this.defaultIndex = settings.defaultIndex;
this.eventName = "click.contentCollection_" + lib2.utils.timestamp();
this.selectorActivators = settings.selectorActivator.split(",");

//Initialize the collection correctly.
this.activateContent(this.defaultIndex);

//setup the events
var this_contentCollection = this;
for( var x = 0; x < this.selectorActivators.length; x++)
{
$(this.selectorActivators[x]).each(function(i) {
$(this).unbind(this_contentCollection.eventName).bind(this_contentCollection.eventName, function(evt) {
evt.preventDefault();
this_contentCollection.activateContent(i);
});
});
}
};
lib2.obj.contentCollection.prototype.activateContent = function(index) {
$(this.selectorContent).hide();
$(this.selectorContent).eq(index).show();
};
/* ------------------ */

/* pageOverlay */
lib2.obj.pageOverlay.prototype.init = function(settings){
var settings = jQuery.extend({
selector : "#widget-pageOverlay"
}, settings);

var myOverlay = this;
this.selector = settings.selector;
this.currentInfo = {};
this.addOverlay();
};

lib2.obj.pageOverlay.prototype.resize = function(){
if( ($(window).width() != this.currentInfo.wWidth) || ($(window).height() != this.currentInfo.wHeight) || ($(document).width() != this.currentInfo.dWidth) || ($(document).height() != this.currentInfo.dHeight) )
{
this.currentInfo.wWidth = $(window).width();
this.currentInfo.wHeight = $(window).height();
this.currentInfo.dWidth = $(document).width();
this.currentInfo.dHeight = $(document).height();

$(this.selector).height( $(window).height() );
$(this.selector).width( $(window).width() );

var height = Math.max( $(document).height(), $(window).height() );
var width = Math.max( $(document).width(), $(window).width() );
$(this.selector).height(height);
$(this.selector).width(width);

lib2.layer.ie6Fix(this.selector,'u');
}
};

lib2.obj.pageOverlay.prototype.addOverlay = function(){
this.currentInfo = { wWidth : 0, wHeight : 0, dWidth : 0, dHeight : 0 };
lib2.layer.create( this.selector, { xPos : 0, yPos : 0, transition: false });
$(this.selector).css("position", "absolute");
this.resize();
var myOverlay = this;
this.interval = setInterval(function(){ myOverlay.resize(); }, 250);
};

lib2.obj.pageOverlay.prototype.removeOverlay = function(){
lib2.layer.remove(this.selector);
clearInterval(this.interval);
};
/* ------------------ */

$(function() {
/* Form Initialization */
lib2.func.formSetup();

/* Layer Manager */
lib2.layer.initManager();
});

})($);