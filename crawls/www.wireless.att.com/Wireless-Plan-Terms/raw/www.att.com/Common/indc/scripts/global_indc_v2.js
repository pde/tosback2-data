/* Version 2.0 last updated by DO on 11-16-2009 at 10:18 am */

try{document.execCommand('BackgroundImageCache', false, true);} catch(e){}

/**
* @author Ryan Johnson <http://syntacticx.com/>
* @copyright 2008 PersonalGrid Corporation <http://personalgrid.com/>
* @package LivePipe UI
* @license MIT
* @url http://livepipe.net/core
* @require prototype.js
*/
 
if(typeof(Control) == 'undefined')
Control = {};
 
var $proc = function(proc){
return typeof(proc) == 'function' ? proc : function(){return proc};
};
 
var $value = function(value){
return typeof(value) == 'function' ? value() : value;
};
 
Object.Event = {
extend: function(object){
object._objectEventSetup = function(event_name){
this._observers = this._observers || {};
this._observers[event_name] = this._observers[event_name] || [];
};
object.observe = function(event_name,observer){
if(typeof(event_name) == 'string' && typeof(observer) != 'undefined'){
this._objectEventSetup(event_name);
if(!this._observers[event_name].include(observer))
this._observers[event_name].push(observer);
}else
for(var e in event_name)
this.observe(e,event_name[e]);
};
object.stopObserving = function(event_name,observer){
this._objectEventSetup(event_name);
if(event_name && observer)
this._observers[event_name] = this._observers[event_name].without(observer);
else if(event_name)
this._observers[event_name] = [];
else
this._observers = {};
};
object.observeOnce = function(event_name,outer_observer){
var inner_observer = function(){
outer_observer.apply(this,arguments);
this.stopObserving(event_name,inner_observer);
}.bind(this);
this._objectEventSetup(event_name);
this._observers[event_name].push(inner_observer);
};
object.notify = function(event_name){
this._objectEventSetup(event_name);
var collected_return_values = [];
var args = $A(arguments).slice(1);
try{
for(var i = 0; i < this._observers[event_name].length; ++i)
collected_return_values.push(this._observers[event_name][i].apply(this._observers[event_name][i],args) || null);
}catch(e){
if(e == $break)
return false;
else
throw e;
}
return collected_return_values;
};
if(object.prototype){
object.prototype._objectEventSetup = object._objectEventSetup;
object.prototype.observe = object.observe;
object.prototype.stopObserving = object.stopObserving;
object.prototype.observeOnce = object.observeOnce;
object.prototype.notify = function(event_name){
if(object.notify){
var args = $A(arguments).slice(1);
args.unshift(this);
args.unshift(event_name);
object.notify.apply(object,args);
}
this._objectEventSetup(event_name);
var args = $A(arguments).slice(1);
var collected_return_values = [];
try{
if(this.options && this.options[event_name] && typeof(this.options[event_name]) == 'function')
collected_return_values.push(this.options[event_name].apply(this,args) || null);
for(var i = 0; i < this._observers[event_name].length; ++i)
collected_return_values.push(this._observers[event_name][i].apply(this._observers[event_name][i],args) || null);
}catch(e){
if(e == $break)
return false;
else
throw e;
}
return collected_return_values;
};
}
}
};
 
/* Begin Core Extensions */
 
//Element.observeOnce
Element.addMethods({
observeOnce: function(element,event_name,outer_callback){
var inner_callback = function(){
outer_callback.apply(this,arguments);
Element.stopObserving(element,event_name,inner_callback);
};
Element.observe(element,event_name,inner_callback);
}
});
 
//mouse:wheel
(function(){
function wheel(event){
var delta, element, custom_event;
// normalize the delta
if (event.wheelDelta) { // IE & Opera
delta = event.wheelDelta / 120;
} else if (event.detail) { // W3C
delta =- event.detail / 3;
}
if (!delta) { return; }
element = Event.extend(event).target;
element = Element.extend(element.nodeType === Node.TEXT_NODE ? element.parentNode : element);
custom_event = element.fire('mouse:wheel',{ delta: delta });
if (custom_event.stopped) {
Event.stop(event);
return false;
}
}
document.observe('mousewheel',wheel);
document.observe('DOMMouseScroll',wheel);
})();
 
/* End Core Extensions */
 
//from PrototypeUI
var IframeShim = Class.create({
initialize: function() {
this.element = new Element('iframe',{
style: 'position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);display:none',
src: 'javascript:void(0);',
frameborder: 0
});
$(document.body).insert(this.element);
},
hide: function() {
this.element.hide();
return this;
},
show: function() {
this.element.show();
return this;
},
positionUnder: function(element) {
var element = $(element);
var offset = element.cumulativeOffset();
var dimensions = element.getDimensions();
this.element.setStyle({
left: offset[0] + 'px',
top: offset[1] + 'px',
width: dimensions.width + 'px',
height: dimensions.height + 'px',
zIndex: element.getStyle('zIndex') - 1
}).show();
return this;
},
setBounds: function(bounds) {
for(prop in bounds)
bounds[prop] += 'px';
this.element.setStyle(bounds);
return this;
},
destroy: function() {
if(this.element)
this.element.remove();
return this;
}
});


/**
 * @author Ryan Johnson <ryan@livepipe.net>
 * @copyright 2007 LivePipe LLC
 * @package Control.Modal
 * @license MIT
 * @url http://livepipe.net/projects/control_modal/
 * @version 2.2.2
 */
if(typeof(Control)=="undefined")Control={};Control.Modal=Class.create();Object.extend(Control.Modal,{loaded:false,loading:false,loadingTimeout:false,overlay:false,container:false,current:false,ie:false,msie:false,browser:navigator.appName,effects:{containerFade:false,containerAppear:false,overlayFade:false,overlayAppear:false},targetRegexp:/#(.+)$/,imgRegexp:/\.(jpe?g|gif|png|tiff?)$/,overlayStyles:{position:'fixed',top:0,left:0,width:'100%',height:'100%',zIndex:9998},overlayIEStyles:{position:'absolute',top:0,left:0,zIndex:9998},disableHoverClose:false,load:function(){if(!Control.Modal.loaded){
Control.Modal.loaded=true;Control.Modal.ie=!(typeof document.body.style.maxHeight!='undefined');Control.Modal.overlay=$(document.createElement('div'));Control.Modal.overlay.id='modal_overlay';Object.extend(Control.Modal.overlay.style,Control.Modal['overlay'+(Control.Modal.ie?'IE':'')+'Styles']);Control.Modal.overlay.hide();Control.Modal.container=$(document.createElement('div'));Control.Modal.container.id='modal_container';Control.Modal.container.hide();Control.Modal.loading=$(document.createElement('div'));Control.Modal.loading.id='modal_loading';Control.Modal.loading.hide();var body_tag=document.getElementById('modal');body_tag.appendChild(Control.Modal.overlay);body_tag.appendChild(Control.Modal.container);body_tag.appendChild(Control.Modal.loading);Control.Modal.container.observe('mouseout',function(event){if(!Control.Modal.disableHoverClose&&Control.Modal.current&&Control.Modal.current.options.hover&&!Position.within(Control.Modal.container,Event.pointerX(event),Event.pointerY(event)))Control.Modal.close()})}},open:function(contents,options){options=options||{};if(!options.contents)options.contents=contents;var modal_instance=new Control.Modal(false,options);modal_instance.open();return modal_instance},close:function(force){if(typeof(force)!='boolean')force=false;if(Control.Modal.current)Control.Modal.current.close(force)},attachEvents:function(){Event.observe(window,'load',Control.Modal.load);Event.observe(window,'unload',Event.unloadCache,false)},center:function(element){if(!element._absolutized){element.setStyle({position:'absolute'});element._absolutized=true}var dimensions=element.getDimensions();Position.prepare();var offset_left=(Position.deltaX+Math.floor((Control.Modal.getWindowWidth()-dimensions.width)/2));var offset_top=(Position.deltaY+((Control.Modal.getWindowHeight()>dimensions.height)?Math.floor((Control.Modal.getWindowHeight()-dimensions.height)/2):0));element.setStyle({top:((dimensions.height<=Control.Modal.getDocumentHeight())?((offset_top!=null&&offset_top>0)?offset_top:'0')+'px':0),left:((dimensions.width<=Control.Modal.getDocumentWidth())?((offset_left!=null&&offset_left>0)?offset_left:'0')+'px':0)})},getWindowWidth:function(){return(self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0)},getWindowHeight:function(){return(self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0)},getDocumentWidth:function(){return Math.min(document.body.scrollWidth,Control.Modal.getWindowWidth())},getDocumentHeight:function(){return Math.max(document.body.scrollHeight,Control.Modal.getWindowHeight())},onKeyDown:function(event){if(event.keyCode==Event.KEY_ESC)Control.Modal.close()}});Object.extend(Control.Modal.prototype,{mode:'',html:false,href:'',element:false,src:false,imageLoaded:false,ajaxRequest:false,initialize:function(element,options){this.element=$(element);this.options={beforeOpen:Prototype.emptyFunction,afterOpen:Prototype.emptyFunction,beforeClose:Prototype.emptyFunction,afterClose:Prototype.emptyFunction,onSuccess:Prototype.emptyFunction,onFailure:Prototype.emptyFunction,onException:Prototype.emptyFunction,beforeImageLoad:Prototype.emptyFunction,afterImageLoad:Prototype.emptyFunction,autoOpenIfLinked:true,contents:false,loading:false,fade:false,fadeDuration:0.75,image:false,imageCloseOnClick:true,hover:false,iframe:false,iframeTemplate:new Template('<iframe src="#{href}" width="100%" height="100%" frameborder="0" id="#{id}"></iframe>'),evalScripts:true,requestOptions:{},overlayDisplay:true,overlayClassName:'',overlayCloseOnClick:true,containerClassName:'',opacity:0.3,zIndex:9998,width:null,height:null,offsetLeft:0,offsetTop:0,position:'absolute'};Object.extend(this.options,options||{});var target_match=false;var image_match=false;if(this.element){target_match=Control.Modal.targetRegexp.exec(this.element.href);image_match=Control.Modal.imgRegexp.exec(this.element.href)}if(this.options.position=='mouse')this.options.hover=true;if(this.options.contents){this.mode='contents'}else if(this.options.image||image_match){this.mode='image';this.src=this.element.href}else if(target_match){this.mode='named';var x=$(target_match[1]);this.html=x.innerHTML;x.remove();this.href=target_match[1]}else{this.mode=(this.options.iframe)?'iframe':'ajax';this.href=this.element.href}if(this.element){if(this.options.hover){this.element.observe('mouseover',this.open.bind(this));this.element.observe('mouseout',function(event){if(!Position.within(Control.Modal.container,Event.pointerX(event),Event.pointerY(event)))this.close()}.bindAsEventListener(this))}else{this.element.onclick=function(event){this.open();Event.stop(event);return false}.bindAsEventListener(this)}}var targets=Control.Modal.targetRegexp.exec(window.location);this.position=function(event){if(this.options.position=='absolute')Control.Modal.center(Control.Modal.container);else{var xy=(event&&this.options.position=='mouse'?[Event.pointerX(event),Event.pointerY(event)]:this.element.cumulativeOffset());Control.Modal.container.setStyle({position:'absolute',top:xy[1]+(typeof(this.options.offsetTop)=='function'?this.options.offsetTop():this.options.offsetTop)+'px',left:xy[0]+(typeof(this.options.offsetLeft)=='function'?this.options.offsetLeft():this.options.offsetLeft)+'px'})}if(Control.Modal.ie){Control.Modal.overlay.setStyle({height:Control.Modal.getDocumentHeight()+'px',width:Control.Modal.getDocumentWidth()+'px'})}}.bind(this);if(this.mode=='named'&&this.options.autoOpenIfLinked&&targets&&targets[1]&&targets[1]==this.href)this.open()},showLoadingIndicator:function(){if(this.options.loading){Control.Modal.loadingTimeout=window.setTimeout(function(){var modal_image=$('modal_image');if(modal_image)modal_image.hide();Control.Modal.loading.style.zIndex=this.options.zIndex+1;Control.Modal.loading.update('<img id="modal_loading" src="'+this.options.loading+'"/>');Control.Modal.loading.show();Control.Modal.center(Control.Modal.loading)}.bind(this),250)}},hideLoadingIndicator:function(){if(this.options.loading){if(Control.Modal.loadingTimeout)window.clearTimeout(Control.Modal.loadingTimeout);var modal_image=$('modal_image');if(modal_image)modal_image.show();Control.Modal.loading.hide()}},open:function(force){if(!force&&this.notify('beforeOpen')===false)return;if(!Control.Modal.loaded)Control.Modal.load();Control.Modal.close();if(!this.options.hover)Event.observe($(document.getElementsByTagName('body')[0]),'keydown',Control.Modal.onKeyDown);Control.Modal.current=this;if(!this.options.hover)Control.Modal.overlay.setStyle({zIndex:this.options.zIndex,opacity:this.options.opacity});Control.Modal.container.setStyle({zIndex:this.options.zIndex+1,width:(this.options.width?(typeof(this.options.width)=='function'?this.options.width():this.options.width)+'px':null),height:(this.options.height?(typeof(this.options.height)=='function'?this.options.height():this.options.height)+'px':null)});if(Control.Modal.ie&&!this.options.hover){$A(document.getElementsByTagName('select')).each(function(select){select.style.visibility='hidden'})}Control.Modal.overlay.addClassName(this.options.overlayClassName);Control.Modal.container.addClassName(this.options.containerClassName);switch(this.mode){case'image':this.imageLoaded=false;this.notify('beforeImageLoad');this.showLoadingIndicator();var img=document.createElement('img');img.onload=function(img){this.hideLoadingIndicator();this.update([img]);if(this.options.imageCloseOnClick)$(img).observe('click',Control.Modal.close);this.position();this.notify('afterImageLoad');img.onload=null}.bind(this,img);img.src=this.src;img.id='modal_image';break;case'ajax':this.notify('beforeLoad');var options={method:'post',onSuccess:function(request){this.hideLoadingIndicator();this.update(request.responseText);this.notify('onSuccess',request);this.ajaxRequest=false}.bind(this),onFailure:function(){this.notify('onFailure')}.bind(this),onException:function(){this.notify('onException')}.bind(this)};Object.extend(options,this.options.requestOptions);this.showLoadingIndicator();this.ajaxRequest=new Ajax.Request(this.href,options);break;case'iframe':this.update(this.options.iframeTemplate.evaluate({href:this.href,id:'modal_iframe'}));break;case'contents':this.update((typeof(this.options.contents)=='function'?this.options.contents():this.options.contents));break;case'named':this.update(this.html);break}if(!this.options.hover){if(this.options.overlayCloseOnClick&&this.options.overlayDisplay)Control.Modal.overlay.observe('click',Control.Modal.close);if(this.options.overlayDisplay){if(this.options.fade){if(Control.Modal.effects.overlayFade)Control.Modal.effects.overlayFade.cancel();Control.Modal.effects.overlayAppear=new Effect.Appear(Control.Modal.overlay,{queue:{position:'front',scope:'Control.Modal'},to:this.options.opacity,duration:this.options.fadeDuration/2})}else Control.Modal.overlay.show()}}if(this.options.position=='mouse'){this.mouseHoverListener=this.position.bindAsEventListener(this);this.element.observe('mousemove',this.mouseHoverListener)}this.notify('afterOpen')},update:function(html){if(typeof(html)=='string')Control.Modal.container.update(html);else{Control.Modal.container.update('');(html.each)?html.each(function(node){Control.Modal.container.appendChild(node)}):Control.Modal.container.appendChild(node)}if(this.options.fade){if(Control.Modal.effects.containerFade)Control.Modal.effects.containerFade.cancel();Control.Modal.effects.containerAppear=new Effect.Appear(Control.Modal.container,{queue:{position:'end',scope:'Control.Modal'},to:1,duration:this.options.fadeDuration/2})}else Control.Modal.container.show();this.position();Event.observe(window,'resize',this.position,false);Event.observe(window,'scroll',this.position,false)},close:function(force){if(!force&&this.notify('beforeClose')===false)return;if(this.ajaxRequest)this.ajaxRequest.transport.abort();this.hideLoadingIndicator();if(this.mode=='image'){var modal_image=$('modal_image');if(this.options.imageCloseOnClick&&modal_image)modal_image.stopObserving('click',Control.Modal.close)}if(Control.Modal.ie&&!this.options.hover){$A(document.getElementsByTagName('select')).each(function(select){select.style.visibility='visible'})}if(!this.options.hover)Event.stopObserving(window,'keyup',Control.Modal.onKeyDown);Control.Modal.current=false;Event.stopObserving(window,'resize',this.position,false);Event.stopObserving(window,'scroll',this.position,false);if(!this.options.hover){if(this.options.overlayCloseOnClick&&this.options.overlayDisplay)Control.Modal.overlay.stopObserving('click',Control.Modal.close);if(this.options.overlayDisplay){if(this.options.fade){if(Control.Modal.effects.overlayAppear)Control.Modal.effects.overlayAppear.cancel();Control.Modal.effects.overlayFade=new Effect.Fade(Control.Modal.overlay,{queue:{position:'end',scope:'Control.Modal'},from:this.options.opacity,to:0,duration:this.options.fadeDuration/2})}else Control.Modal.overlay.hide()}}if(this.options.fade&&!Control.Modal.msie){if(Control.Modal.effects.containerAppear)Control.Modal.effects.containerAppear.cancel();Control.Modal.effects.containerFade=new Effect.Fade(Control.Modal.container,{queue:{position:'front',scope:'Control.Modal'},from:1,to:0,duration:this.options.fadeDuration/2,afterFinish:function(){Control.Modal.container.update('');this.resetClassNameAndStyles()}.bind(this)})}else{Control.Modal.effects.containerAppear.cancel();Control.Modal.container.hide();Control.Modal.container.update('');this.resetClassNameAndStyles()}if(this.options.position=='mouse')this.element.stopObserving('mousemove',this.mouseHoverListener);this.notify('afterClose')},resetClassNameAndStyles:function(){Control.Modal.overlay.removeClassName(this.options.overlayClassName);Control.Modal.container.removeClassName(this.options.containerClassName);Control.Modal.container.setStyle({height:null,width:null,top:null,left:null})},notify:function(event_name){try{if(this.options[event_name])return[this.options[event_name].apply(this.options[event_name],$A(arguments).slice(1))]}catch(e){if(e!=$break)throw e;else return false}}});if(typeof(Object.Event)!='undefined')Object.Event.extend(Control.Modal);Control.Modal.attachEvents();

/**
* @author Ryan Johnson <http://syntacticx.com/>
* @copyright 2008 PersonalGrid Corporation <http://personalgrid.com/>
* @package LivePipe UI
* @license MIT
* @url http://livepipe.net/control/tabs
* @require prototype.js, livepipe.js
*/
 
/*global window, document, Prototype, $, $A, $H, $break, Class, Element, Event, Control */
 
if(typeof(Prototype) == "undefined") {
throw "Control.Tabs requires Prototype to be loaded."; }
if(typeof(Object.Event) == "undefined") {
throw "Control.Tabs requires Object.Event to be loaded."; }
 
Control.Tabs = Class.create({
initialize: function(tab_list_container,options){
if(!$(tab_list_container)) {
throw "Control.Tabs could not find the element: " + tab_list_container; }
this.activeContainer = false;
this.activeLink = false;
this.containers = $H({});
this.links = [];
Control.Tabs.instances.push(this);
this.options = {
beforeChange: Prototype.emptyFunction,
afterChange: Prototype.emptyFunction,
hover: false,
linkSelector: 'li a',
setClassOnContainer: false,
activeClassName: 'active',
defaultTab: 'first',
autoLinkExternal: true,
targetRegExp: /#(.+)$/,
showFunction: Element.show,
hideFunction: Element.hide
};
Object.extend(this.options,options || {});
(typeof(this.options.linkSelector == 'string') ?
$(tab_list_container).select(this.options.linkSelector) :
this.options.linkSelector($(tab_list_container))
).findAll(function(link){
return (/^#/).exec((Prototype.Browser.WebKit ? decodeURIComponent(link.href) : link.href).replace(window.location.href.split('#')[0],''));
}).each(function(link){
this.addTab(link);
}.bind(this));
this.containers.values().each(Element.hide);
if(this.options.defaultTab == 'first') {
this.setActiveTab(this.links.first());
} else if(this.options.defaultTab == 'last') {
this.setActiveTab(this.links.last());
} else {
this.setActiveTab(this.options.defaultTab); }
var targets = this.options.targetRegExp.exec(window.location);
if(targets && targets[1]){
targets[1].split(',').each(function(target){
this.setActiveTab(this.links.find(function(link){
return link.key == target;
}));
}.bind(this));
}
if(this.options.autoLinkExternal){
$A(document.getElementsByTagName('a')).each(function(a){
if(!this.links.include(a)){
var clean_href = a.href.replace(window.location.href.split('#')[0],'');
if(clean_href.substring(0,1) == '#'){
if(this.containers.keys().include(clean_href.substring(1))){
$(a).observe('click',function(event,clean_href){
this.setActiveTab(clean_href.substring(1));
}.bindAsEventListener(this,clean_href));
}
}
}
}.bind(this));
}
},
addTab: function(link){
this.links.push(link);
link.key = link.getAttribute('href').replace(window.location.href.split('#')[0],'').split('#').last().replace(/#/,'');
var container = $(link.key);
if(!container) {
throw "Control.Tabs: #" + link.key + " was not found on the page."; }
this.containers.set(link.key,container);
link[this.options.hover ? 'onmouseover' : 'onclick'] = function(link){
if(window.event) {
Event.stop(window.event); }
this.setActiveTab(link);
return false;
}.bind(this,link);
},
setActiveTab: function(link){
if(!link && typeof(link) == 'undefined') {
return; }
if(typeof(link) == 'string'){
this.setActiveTab(this.links.find(function(_link){
return _link.key == link;
}));
}else if(typeof(link) == 'number'){
this.setActiveTab(this.links[link]);
}else{
if(this.notify('beforeChange',this.activeContainer,this.containers.get(link.key)) === false) {
return; }
if(this.activeContainer) {
this.options.hideFunction(this.activeContainer); }
this.links.each(function(item){
(this.options.setClassOnContainer ? $(item.parentNode) : item).removeClassName(this.options.activeClassName);
}.bind(this));
(this.options.setClassOnContainer ? $(link.parentNode) : link).addClassName(this.options.activeClassName);
this.activeContainer = this.containers.get(link.key);
this.activeLink = link;
this.options.showFunction(this.containers.get(link.key));
this.notify('afterChange',this.containers.get(link.key));
}
},
next: function(){
this.links.each(function(link,i){
if(this.activeLink == link && this.links[i + 1]){
this.setActiveTab(this.links[i + 1]);
throw $break;
}
}.bind(this));
},
previous: function(){
this.links.each(function(link,i){
if(this.activeLink == link && this.links[i - 1]){
this.setActiveTab(this.links[i - 1]);
throw $break;
}
}.bind(this));
},
first: function(){
this.setActiveTab(this.links.first());
},
last: function(){
this.setActiveTab(this.links.last());
}
});
Object.extend(Control.Tabs,{
instances: [],
findByTabId: function(id){
return Control.Tabs.instances.find(function(tab){
return tab.links.find(function(link){
return link.key == id;
});
});
}
});
Object.Event.extend(Control.Tabs);


var timeoutVariable; // Global variable for Timeouts. 
var heroTime = 7000; // used by initiateRotateHero() and  autoRotate(heroToShow)	

document.observe("dom:loaded", function(){
	createStyleRule("#moreNav", "display:none !important");
	createStyleRule("#nohoverbox_moreNav", "display:none !important");

	validateSearch();
	if ((document.getElementById) && (!navigator.userAgent.match(/iPhone/i)) && (!navigator.userAgent.match(/iPod/i))) {
		createStyleRule("#moreNav", "display:none !important");
		createStyleRule("#nohoverbox_moreNav", "display:none !important");
		createStyleRule("#PrimaryNav li.selected ul#accountSecondaryNav", "background: #fff !important; height: 37px; width: 930px; position: absolute; top: 34px;");
	}
	
	if((!navigator.userAgent.match(/iPhone/i)) && (!navigator.userAgent.match(/iPod/i))) {
		detectBG();
		printMe();
		//replaceSM();		
	}
	
});

/* WINDOWS ONLOAD */
Event.observe(window, 'load', function(){
	/* SEARCH SUGGESTIONS */
	if($("autoSuggestBox")){
		var divSuggest = $("autoSuggestBox");
	}
	if($("cloneBox")){
		var divClone = $("cloneBox");
		divSuggest.clonePosition(divClone,{setHeight:false,setWidth:false}); 
	}
	
	attTableInit();
	moveQuickLinks();
	assignPopupHandler();
	imagePreLoader();
	initiateRotateHero();
	toggleList();
	tabs();	
	
	if ($('rotateNext1')) {
		autoRotate('hero1');
	}
	
});

function validateSearch(){
	
        var searchVar = $("search").value;
	
		if($("searchForm")){
					
			//$("search").value = "";
		
			$("search").onfocus = function(){
				if($("search").value == searchVar){
					$("search").value = "";
				}
			}
			$("search").onblur = function(){
				if($("search").value == ""){
					$("search").value = searchVar;
				}
			}			
			$("searchSubmit").onclick = function(){
				if( $("search").value == "" || $("search").value == " " || $("search").value == searchVar ){
					alert("Please enter at least one keyword in the Search box.");
					$("search").focus();
					return false;
				}
				else{
					$("searchForm").submit();
					return true;
				}
			}					
			$("searchForm").onsubmit = function(){
				if( $("search").value == "" || $("search").value == " " || $("search").value == searchVar){
					alert("Please enter at least one keyword in the Search box.");	
					$("search").focus();
					return false;
				}
				else{
					$("searchForm").submit();
					return true;
				}
			}
			
		}

}

function moveQuickLinks(){
	if($('QuickLinks')){
		$('QuickLinks').innerHTML = $('siteUtil').innerHTML;
		$('siteUtil').remove();
	}
}

function imagePreLoader(){
	newImage0 = new Image();
	newImage0.src = location.protocol+"//www.att.com/Common/indc/images/nav/primaryNavOrange.png";		
}

function detectPage(){
	if ($('pageID')){
		var pageID = $('pageID').innerHTML;
		$('page_').id = 'page_' + pageID;
	}
}

function detectBG(){
	if ($('wrapper')){ 
		var z = $('wrapper').getStyle('backgroundColor');
	}
	if ($('popupWrapper')){	
		var z = $('popupWrapper').getStyle('backgroundColor');
	}
	if (z == '#ededed' || z == 'rgb(237, 237, 237)'){ 
		tertiaryNav();
	}
	if ($('accountSecondaryNav')){
		var myAcctStyle = $('accountSecondaryNav').getStyle('backgroundColor');
		if ( myAcctStyle == '#fff' || myAcctStyle == '#ffffff' || myAcctStyle == 'rgb(255, 255, 255)') 
		{
			createStyleRule("#PrimaryNav", "height: 35px;");
			createStyleRule("#PrimaryNav li#first", "height: 35px;");
			createStyleRule("#PrimaryNav li#last", "height: 35px;");
			createStyleRule(".secondaryNav", "display: none !important;");
		}
	}
}

function tertiaryNav(){
	if($('modal')){
		function rightPost()	{
			return '<span id="rightPost">&nbsp;</span>';
		}		
		function removeParentOnHover(id) {
			$(id).up('li').removeClassName('onHover');
		}		
		function removeRightPost(xPath) {
			$$(xPath).each(function(element)	{
				element.remove();
			});
		}	
		if (Control.Modal.browser == 'Microsoft Internet Explorer')	{
			Control.Modal.msie = true; 
		}	
		new Control.Modal("hoverbox_wireless",{hover:true,position:"relative",offsetTop:30,offsetLeft:0,fade:true,fadeDuration:0.3,contents:function(){$("hoverbox_wireless").up("li").addClassName("onHover");$("hoverbox_wireless").insert({after:rightPost()});return $("hoverbox_wireless_contents").innerHTML},afterClose:function(){removeParentOnHover("hoverbox_wireless");removeRightPost("#shopSecondaryNav span")}});
		new Control.Modal("hoverbox_explore_wireless",{hover:true,position:"relative",offsetTop:30,offsetLeft:0,fade:true,fadeDuration:0.3,contents:function(){$("hoverbox_explore_wireless").up("li").addClassName("onHover");$("hoverbox_explore_wireless").insert({after:rightPost()});return $("hoverbox_explore_wireless_contents").innerHTML},afterClose:function(){removeParentOnHover("hoverbox_explore_wireless");removeRightPost("#exploreSecondaryNav span")}});
		new Control.Modal("hoverbox_internet",{hover:true,position:"relative",offsetTop:30,offsetLeft:0,fade:true,fadeDuration:0.3,contents:function(){$("hoverbox_internet").up("li").addClassName("onHover");$("hoverbox_internet").insert({after:rightPost()});return $("hoverbox_internet_contents").innerHTML},afterClose:function(){removeParentOnHover("hoverbox_internet");removeRightPost("#shopSecondaryNav span")}});
		new Control.Modal("hoverbox_digitaltv",{hover:true,position:"relative",offsetTop:30,offsetLeft:0,fade:true,fadeDuration:0.3,contents:function(){$("hoverbox_digitaltv").up("li").addClassName("onHover");$("hoverbox_digitaltv").insert({after:rightPost()});return $("hoverbox_digitaltv_contents").innerHTML},afterClose:function(){removeParentOnHover("hoverbox_digitaltv");removeRightPost("#shopSecondaryNav span")}});
		new Control.Modal("hoverbox_homephone",{hover:true,position:"relative",offsetTop:30,offsetLeft:0,fade:true,fadeDuration:0.3,contents:function(){$("hoverbox_homephone").up("li").addClassName("onHover");$("hoverbox_homephone").insert({after:rightPost()});return $("hoverbox_homephone_contents").innerHTML},afterClose:function(){removeParentOnHover("hoverbox_homephone");removeRightPost("#shopSecondaryNav span")}});
		new Control.Modal("s-hoverbox_bundles",{hover:true,position:"relative",offsetTop:30,offsetLeft:0,fade:true,fadeDuration:0.3,contents:function(){$("s-hoverbox_bundles").up("li").addClassName("onHover");$("s-hoverbox_bundles").insert({after:rightPost()});return $("hoverbox_bundles_contents").innerHTML},afterClose:function(){removeParentOnHover("s-hoverbox_bundles");removeRightPost("#shopSecondaryNav span")}})
		new Control.Modal("t-hoverbox_bundles",{hover:true,position:"relative",offsetTop:30,offsetLeft:0,fade:true,fadeDuration:0.3,contents:function(){$("t-hoverbox_bundles").up("li").addClassName("onHover");$("t-hoverbox_bundles").insert({after:rightPost()});return $("hoverbox_bundles_contents").innerHTML},afterClose:function(){removeParentOnHover("t-hoverbox_bundles");removeRightPost("#shopSecondaryNav span")}})
		new Control.Modal("hoverbox_addserv",{hover:true,position:"relative",offsetTop:30,offsetLeft:0,fade:true,fadeDuration:0.3,contents:function(){$("hoverbox_addserv").up("li").addClassName("onHover");$("hoverbox_addserv").insert({after:rightPost()});return $("hoverbox_addserv_contents").innerHTML},afterClose:function(){removeParentOnHover("hoverbox_addserv");removeRightPost("#shopSecondaryNav span")}})
		new Control.Modal("hoverbox_offers",{hover:true,position:"relative",offsetTop:30,offsetLeft:0,fade:true,fadeDuration:0.3,contents:function(){$("hoverbox_offers").up("li").addClassName("onHover");$("hoverbox_offers").insert({after:rightPost()});return $("hoverbox_offers_contents").innerHTML},afterClose:function(){removeParentOnHover("hoverbox_offers");removeRightPost("#shopSecondaryNav span")}})
	}
}

function replaceSM() {
	var getSUP = $$('sup');
	getSUP.each(function(element)	{
		if (element.innerHTML == 'SM')
			element.replace('<sup class="sm">SM</sup>');
	});
}

function toggleList() {
	if($('toggleList')) {
		var hideRows = $$('.open');
		var showRows = $$('.notHidden');
		
		hideRows.each(function(hideRow) { 
			hideRow.removeClassName('open');
			hideRow.addClassName('close');	
			hideRow.next(0).down(0).removeClassName('hide');
			hideRow.next(0).toggle();	
			showRows.each(function(showRow) {
				showRow.removeClassName('close');
				showRow.addClassName('open');
				showRow.next(0).show();
			});		
		});	
		
		Event.observe($('toggleList'), 'click', function(event) {
			var element = Event.element(event);
			if(element.up(0).hasClassName('toggleNextRow')) {
				element.up(0).next(0).down(0).removeClassName('hide');
				element.up(0).next(0).toggle();		
				if(element.up(0).hasClassName('open')) {
					element.up(0).toggleClassName('close');
					element.up(0).removeClassName('open');
				}
				else if(element.up(0).hasClassName('close')) {
					element.up(0).toggleClassName('open');
					element.up(0).removeClassName('close');
				}
				return false;
			}
			else if(element.hasClassName('openAll')){ 
				element.toggleClassName('closeAll');
				element.removeClassName('openAll');
				element.update('Close all');
				if(element.hasClassName('printLink')){
					element.update('Print all');
				}
				hideRows.each(function(showRow) { 
					showRow.removeClassName('close');
					showRow.addClassName('open');
					showRow.next(0).show();					
				});
				return false;
			}
			else if(element.hasClassName('closeAll')){ 
				element.toggleClassName('openAll');
				element.removeClassName('closeAll');
				element.update('Open all');
				if(element.hasClassName('printLink')){
					element.update('Print all');
				}
				hideRows.each(function(hideRow) { 
					hideRow.removeClassName('open');
					hideRow.addClassName('close');
					hideRow.next(0).hide();					
				});
				return false;
			}
		});		
	}
}

function printMe() {
	Event.observe(document.body, 'click', function(event)	{
		var element = Event.element(event);
		if (element.hasClassName('printLink'))	{
			window.print();
		}
	});
}

function setElementStyleById(id, propertyName, propertyValue){
	if (!document.getElementById) return;
	var el = document.getElementById(id);
	if (el) el.style[propertyName] = propertyValue;
}

function setElementStyle(element, propertyName, propertyValue){
	if (!document.getElementsByTagName) return;
	var el = document.getElementsByTagName(element);
	for (var i = 0; i < el.length; i++)	{
		el[i].style[propertyName] = propertyValue;
	}
}

function setElementStyleByClassName(cl, propertyName, propertyValue){
	if (!document.getElementsByTagName) return;
	var re = new RegExp("(^| )" + cl + "( |$)");
	var el = document.all ? document.all : document.getElementsByTagName("body")[0].getElementsByTagName("*"); // fix for IE5.x
	for (var i = 0; i < el.length; i++)	{
		if (el[i].className && el[i].className.match(re)) {
			el[i].style[propertyName] = propertyValue;
		}
	}
}

function createStyleRule(selector, declaration) {
	if (!document.getElementsByTagName || !(document.createElement || document.createElementNS)) return;
	var agt = navigator.userAgent.toLowerCase();
	var is_ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
	var is_iewin = (is_ie && (agt.indexOf("win") != -1));
	var is_iemac = (is_ie && (agt.indexOf("mac") != -1));
	if (is_iemac) return; // script doesn't work properly in IE/Mac
	var head = document.getElementsByTagName("head")[0]; 
	var style = (typeof document.createElementNS != "undefined") ?  document.createElementNS("http://www.w3.org/1999/xhtml", "style") : document.createElement("style");
	if (!is_iewin)	{
		var styleRule = document.createTextNode(selector + " {" + declaration + "}");
		style.appendChild(styleRule); // bugs in IE/Win
	}
	style.setAttribute("type", "text/css");
	style.setAttribute("media", "screen"); 
	head.appendChild(style);
	if (is_iewin && document.styleSheets && document.styleSheets.length > 0) {
		var lastStyle = document.styleSheets[document.styleSheets.length - 1];
		if (typeof lastStyle.addRule == "object") {
		// bugs in IE/Mac and Safari
			lastStyle.addRule(selector, declaration);
		}
	}
}

function tabs() {
//Controls tabs on product detail pages like triple pack as well as tabs found on popup with tab content.
	if ($('tabContainer')) {
		new Control.Tabs($('tabContainer'),{
			linkSelector: 'li a',
			setClassOnContainer: true,
			activeClassName: 'active',
			defaultTab: 'first'
		});		
	}	
}

function assignPopupHandler() {
	$$('a.popup').each(function(element) {
		element.onclick = function() {
			return openPopup(this.href);
		}
	});
	
	$$('a.popupClose').each(function(element) {
		element.onclick = function() {
			return window.close();
		}
	});
}

function openPopup(url){
	window.open(url,'popup_window','height=600,width=800,resizable=yes,scrollbars=yes');
	return false;
}

function initiateRotateHero() {
	if ($('hero1')) {
		$$('div.rotateHero').each(Element.show);
		$$('div.rotateHero a').each(function(element) {
			element.onclick = function() {
				var elementClass = element.readAttribute('href');
				if(elementClass == "#hero1"){
					$('hero1').show();
					$('hero2').hide();
					if($('hero3')){
						$('hero3').hide();
					}	
					// call code to start autorotate	
					if ($('rotateNext1')) {
						clearTimeout(timeoutVariable);
						timeoutVariable = setTimeout("autoRotate('hero2')",heroTime);
					}
				}
				if(elementClass == "#hero2"){
					$('hero1').hide();
					$('hero2').show();
					if($('hero3')){
						$('hero3').hide();
						// call code to start autorotate	
						if ($('rotateNext1')) {
							clearTimeout(timeoutVariable);
							timeoutVariable = setTimeout("autoRotate('hero3')",heroTime);
						}
					} else {
						if ($('rotateNext1')) {
							clearTimeout(timeoutVariable);
							timeoutVariable = setTimeout("autoRotate('hero1')",heroTime);	
						}		
					}
				}
				if(elementClass == "#hero3"){
					$('hero1').hide();
					$('hero2').hide();
					if($('hero3')){
						$('hero3').show();
					}
					// call code to start autorotate	
					if ($('rotateNext1')) {
						clearTimeout(timeoutVariable);
						timeoutVariable = setTimeout("autoRotate('hero1')",heroTime);
					}
				}
				if(elementClass == "#heroPause"){
					// call function to stop 
					clearTimeout(timeoutVariable);
				}					
				return false;
			}
		});
	}	
}
// Additional Rotation Scripts
function autoRotate(heroToShow) {
	if(heroToShow == "hero1"){
		$('hero1').show();
		$('hero2').hide();
		if($('hero3')){
			$('hero3').hide();
		}	
		// call code to start autorotate	
		clearTimeout(timeoutVariable);
		timeoutVariable = setTimeout("autoRotate('hero2')",heroTime);
	}
	if(heroToShow == "hero2"){
		$('hero1').hide();
		$('hero2').show();
		if($('hero3')){
			$('hero3').hide();
			// call code to start autorotate	
			clearTimeout(timeoutVariable);
			timeoutVariable = setTimeout("autoRotate('hero3')",heroTime);
		} else {
			// call code to start autorotate	
			clearTimeout(timeoutVariable);
			timeoutVariable = setTimeout("autoRotate('hero1')",heroTime);
		}
		
	}
	if(heroToShow == "hero3"){
		$('hero1').hide();
		$('hero2').hide();
		if($('hero3')){
			$('hero3').show();
		}
		// call code to start autorotate	
		clearTimeout(timeoutVariable);
		timeoutVariable = setTimeout("autoRotate('hero1')",heroTime);
	}
}


// Table Behavior - set by using class="ledger" in the table tag. This script will stripe the table automatically by inserting class="odd/even" on alternating table rows. By using class="selected" on a TR, the row can be set to be the selected row and not have a hover state for the row.
function attTableInit() {
	function zebraStripes(cssClass) {
		var evenClass = arguments[1] ? arguments[1] : 'even';
		var oddClass = arguments[2] ? arguments[2] : 'odd';
		//var hoverClass = '';
		var zebras = new Array();
		var tables = document.getElementsByTagName('table');
		for (i = 0, j = 0; i < tables.length; i++) {
			if (new RegExp("\\b"+cssClass+"\\b").test(tables[i].className)) {
				zebras[j] = tables[i]; j++;
			}
		}
		for (i = 0; i < zebras.length; i++) {
			var tbodies = zebras[i].getElementsByTagName('tbody');
			var parity = false;
			for (j = 0; j < tbodies.length; j++) {
				var trs = tbodies[j].getElementsByTagName('tr');
				for (k = 0; k < trs.length; k++) {
					newClass = parity ? evenClass : oddClass;
					trs[k].className += trs[k].className ? ' '+newClass : newClass;
					parity = !parity;
					if((trs[k].className != 'selected') && (trs[k].className != 'selected even') && (trs[k].className != 'selected odd')) {
						if ((zebras[i].className != 'ledger noHover') && (zebras[i].className != 'noHover ledger') && (zebras[i].className != 'ledger nohover') && (zebras[i].className != 'nohover ledger')) {
							trs[k].onmouseover = function() { 
								this.oldClassName = this.className;
								var hoverClass = 'sfhover';
								this.className = hoverClass;		  	
							};
							trs[k].onmouseout = function() {
								this.className = this.oldClassName;
							};
						}
					}
				}
			}
		}
	}
	zebraStripes('ledger'); /* calls all table class='ledger' and runs the javascript on it to create the stripes. Otherwise you have to put class="even" and class="odd" on each TR to get the same thing. */
}

//--------------------------------
/*for switching highlighted business segment in universal nav element 12/12/08 */ 
function navHighlightBU(bu) {
  	 $$('ul#universalNav li a').each(function(element)	{
			element.removeClassName('currentSubSite');	  
				if(element.innerHTML==bu){
					element.addClassName('currentSubSite')
				}
		});
}

/* For revealing state specific info */
function stateReveal(element) {
	// Set Variables
	stateClass = "null";
	element = (element == null || element == "")?"p":element;
	// Get State value
	var localStr2 = getTopCookie("attPersistantLocalization");
	if ((localStr2 != null) && (localStr2 != "")){
		var localArr2 = localStr2.split("|");
		var stateStr2 = "";
		for (i=0; i<localArr2.length; i++){
			if (localArr2[i].indexOf("state") > -1){
				var stateArr2 = localArr2[i].split("=");
				var stateClass = stateArr2[1];
			}
		}
	}
	// once we have the state we can reveal it
	stateClass = stateClass.replace(" ","-");
	var statesActual = document.getElementById("statesPricing").getElementsByTagName(element);
	for (i=0;i<statesActual.length;i++) { // Loop through states

		if(statesActual[i].className == stateClass){
			//alert(statesActual[i].className);
			statesActual[i].className = 'showmestate';
		}
	}
}