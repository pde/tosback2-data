var DomUtils=new Object;DomUtils.browser=new Object;DomUtils.browser.regexes={overflowX:new Array(/Firefox\/1\.0/),overflowY:new Array(/Firefox\/1\.0/)};DomUtils.browser.supportsOverflowX=function(){for(var i=0;i<DomUtils.browser.regexes.overflowX.length;i++){var regex=DomUtils.browser.regexes.overflowX[i];if(navigator.userAgent.match(regex)){return false;}}
return true;}
DomUtils.browser.supportsOverflowY=function(){for(var i=0;i<DomUtils.browser.regexes.overflowY.length;i++){var regex=DomUtils.browser.regexes.overflowY[i];if(navigator.userAgent.match(regex)){return false;}}
return true;}
DomUtils.browser.supportsDom=function(){return(document.getElementById)?true:false;}
DomUtils.browser.isIE=function(){return(document.all&&navigator.appName.indexOf('Microsoft Internet Explorer')>-1)?true:false;}
DomUtils.browser.isIE6=function(){temp=navigator.appVersion.split('MSIE');ieVer=parseInt(temp[1]);return(ieVer==6)?1:0;}
DomUtils.browser.isSafari=function(){return(navigator.userAgent.toLowerCase().indexOf('safari')>-1)?true:false;}
DomUtils.removeElement=function(elem){if(DomUtils.browser.isIE()){var garbageBin=document.getElementById('IELeakGarbageBin');if(!garbageBin){garbageBin=document.createElement('DIV');garbageBin.id='IELeakGarbageBin';garbageBin.style.display='none';document.body.appendChild(garbageBin);}
garbageBin.appendChild(elem);garbageBin.innerHTML='';}else{elem.parentNode.removeChild(elem);}}
DomUtils.getWindowWidth=function(win){win=(win)?win:window;if(document.compatMode=='CSS1Compat')return parseInt(win.document.body.parentNode.clientWidth);else if(DomUtils.browser.isIE())return parseInt(win.document.body.clientWidth);else return parseInt(win.innerWidth);}
DomUtils.getWindowHeight=function(win){win=(win)?win:window;if(document.compatMode=='CSS1Compat')return parseInt(win.document.body.parentNode.clientHeight);else if(DomUtils.browser.isIE())return parseInt(win.document.body.clientHeight);else return parseInt(win.innerHeight);}
DomUtils.getWindowScrollX=function(win){win=(win)?win:window;if(document.compatMode=='CSS1Compat'&&win.document.body.parentNode.scrollLeft)return parseInt(win.document.body.parentNode.scrollLeft);else if(DomUtils.browser.isIE())return parseInt(win.document.body.scrollLeft);else if(typeof(window.pageXOffset)=='number'||window.pageXOffset===0)return parseInt(window.pageXOffset);else	return parseInt(win.scrollX);}
DomUtils.getWindowScrollY=function(win){win=(win)?win:window;if(document.compatMode=='CSS1Compat'&&win.document.body.parentNode.scrollTop)return parseInt(win.document.body.parentNode.scrollTop);else if(DomUtils.browser.isIE())return parseInt(win.document.body.scrollTop);else if(typeof(window.pageYOffset)=='number')return parseInt(window.pageYOffset);else return parseInt(win.scrollY);}
DomUtils.getElementWidth=function(elem){var eStyle,prop,width;var w=0;if(elem.tagName=='IMG')w=parseInt(elem.width);else if(document.compatMode=='CSS1Compat')w=parseInt(elem.offsetWidth);else if(document.compatMode=='BackCompat'){eStyle=DomUtils.getCurrentStyle(elem);width=parseInt(eStyle.width);if(DomUtils.browser.isIE())width=elem.offsetWidth;var bLeft=parseInt(eStyle.borderLeft);var bRight=parseInt(eStyle.borderRight);var pLeft=parseInt(eStyle.paddingLeft);var pRight=parseInt(eStyle.paddingRight);w=parseInt(width);w+=!isNaN(bLeft)?parseInt(bLeft):0;w+=!isNaN(bRight)?parseInt(bRight):0;w+=!isNaN(pLeft)?parseInt(pLeft):0;w+=!isNaN(pRight)?parseInt(pRight):0;}else if(DomUtils.browser.isSafari()){if(typeof(writeDebug)=='function')writeDebug('browser is safari...');width=elem.offsetWidth;w=parseInt(width);}
return w;}
DomUtils.getElementHeight=function(elem){var h=0;var eStyle,height;if(elem.tagName&&elem.tagName=='IMG')h=parseInt(elem.height);else if(document.compatMode=='CSS1Compat')h=parseInt(elem.offsetHeight);else if(document.compatMode=='BackCompat'){eStyle=DomUtils.getCurrentStyle(elem);height=parseInt(eStyle.height);if(DomUtils.browser.isIE())height=elem.offsetHeight;var bTop=parseInt(eStyle.borderTop);var bBottom=parseInt(eStyle.borderBottom);var pTop=parseInt(eStyle.paddingTop);var pBottom=parseInt(eStyle.paddingBottom);h=parseInt(height);if(!DomUtils.browser.isIE()){h+=!isNaN(bTop)?parseInt(bTop):0;h+=!isNaN(bBottom)?parseInt(bBottom):0;h+=!isNaN(pTop)?parseInt(pTop):0;h+=!isNaN(pBottom)?parseInt(pBottom):0;}else{h-=!isNaN(bTop)?parseInt(bTop):0;h-=!isNaN(bBottom)?parseInt(bBottom):0;}}else if(DomUtils.browser.isSafari()){height=elem.offsetHeight;h=parseInt(height);}
return h;}
DomUtils.getElementLeft=function DomUtils_GetElementLeft(elem){var left=0;try{if(elem.offsetParent){while(elem.offsetParent){left+=parseInt(elem.offsetLeft);elem=elem.offsetParent;}}else if(elem.x){left+=parseInt(elem.x);}
return left;}catch(e){return 0;}}
DomUtils.getElementTop=function(elem){try{var top=0;if(elem.offsetParent){while(elem.offsetParent){top+=parseInt(elem.offsetTop);elem=elem.offsetParent;}}else if(elem.y){top+=parseInt(elem.y);}
return top;}catch(e){return 0;}}
DomUtils.center=function(elem){var wWidth=parseInt(DomUtils.getWindowWidth());var wHeight=parseInt(DomUtils.getWindowHeight());var eWidth=parseInt(DomUtils.getElementWidth(elem));var eHeight=parseInt(DomUtils.getElementHeight(elem));var xScroll=parseInt(DomUtils.getWindowScrollX());var yScroll=parseInt(DomUtils.getWindowScrollY());var left=parseInt(wWidth/2)-parseInt(eWidth/2)+xScroll;var top=parseInt(wHeight/2)-parseInt(eHeight/2)+yScroll;elem.style.left=left+'px';elem.style.top=top+'px';}
DomUtils.getCurrentStyle=function(elem){if(elem&&elem.currentStyle){return elem.currentStyle;}else if(document.defaultView&&document.defaultView.getComputedStyle){return document.defaultView.getComputedStyle(elem,'');}}
DomUtils.duplicateStyle=function(elem1,elem2){var style1=DomUtils.getCurrentStyle(elem1);for(prop in style1){try{eval('elem2.style.'+prop+' = style1.'+prop);}catch(e){}}};DomUtils.getZIndex=function(elem){var eStyle=DomUtils.getCurrentStyle(elem);var zIdx=0;if(eStyle.zIndex&&isNaN(eStyle.zIndex)){if(elem.offsetParent){while(elem.offsetParent){zIdx=(parseInt(eStyle.zIndex)>zIdx)?parseInt(eStyle.zIndex):zIdx;eStyle=DomUtils.getCurrentStyle(elem);elem=elem.offsetParent;}}}else{zIdx=parseInt(eStyle.zIndex);}
return zIdx;}
DomUtils.getBody=function(){return document.getElementsByTagName('body')[0];}
DomUtils.XmlHttp=function(){var request=null;try{ActiveXObject.prototype.jsonRequest=null;request=new ActiveXObject('Msxml2.XMLHTTP');}catch(e){try{ActiveXObject.prototype.jsonRequest=null;request=new ActiveXObject('Microsoft.XMLHTTP');}catch(e){try{XMLHttpRequest.prototype.jsonRequest=null;request=new XMLHttpRequest();}catch(e){request=null;}}}
return request;}
Function.prototype.method=function(name,func){this.prototype[name]=func;return this;}
function isAlien(a){return isObject(a)&&typeof a.constructor!='function';}
function isArray(a){return isObject(a)&&a.constructor==Array;}
function isBoolean(a){return typeof a=='boolean';}
function isEmpty(o){var i,v;if(isObject(o)){for(i in o){v=o[i];if(isUndefined(v)&&isFunction(v)){return false;}}}
return true;}
function isFloat(a){return typeof a=='number'&&parseFloat(a)==a;}
function isFunction(a){return typeof a=='function';}
function isInteger(a){return typeof a=='number'&&parseInt(a)==a;}
function isNull(a){return typeof a=='object'&&!a;}
function isNumber(a){return typeof a=='number'&&isFinite(a);}
function isObject(a){return(a&&typeof a=='object')||isFunction(a);}
function isString(a){return typeof a=='string';}
function isUndefined(a){return typeof a=='undefined';}
function fixPNG_IE(image){if(DomUtils.browser.isIE()){image.outerHTML='<div style="width:'+image.width+'; height:'+image.height+'; filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+image.src+'\', sizingMethod=\'scale\');"></div>';}}
function getAllChildren(e){return e.all?e.all:e.getElementsByTagName('*');}
document.getElementsBySelector=function(selector){if(!document.getElementsByTagName){return new Array();}
var tokens=selector.split(' ');var currentContext=new Array(document);for(var i=0;i<tokens.length;i++){token=tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');;if(token.indexOf('#')>-1){var bits=token.split('#');var tagName=bits[0];var id=bits[1];var element=document.getElementById(id);if(tagName&&element.nodeName.toLowerCase()!=tagName){return new Array();}
currentContext=new Array(element);continue;}
if(token.indexOf('.')>-1){var bits=token.split('.');var tagName=bits[0];var className=bits[1];if(!tagName){tagName='*';}
var found=new Array;var foundCount=0;for(var h=0;h<currentContext.length;h++){var elements;if(tagName=='*'){elements=getAllChildren(currentContext[h]);}else{elements=currentContext[h].getElementsByTagName(tagName);}
for(var j=0;j<elements.length;j++){found[foundCount++]=elements[j];}}
currentContext=new Array;var currentContextIndex=0;for(var k=0;k<found.length;k++){if(found[k].className&&found[k].className.match(new RegExp('\\b'+className+'\\b'))){currentContext[currentContextIndex++]=found[k];}}
continue;}
if(token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)){var tagName=RegExp.$1;var attrName=RegExp.$2;var attrOperator=RegExp.$3;var attrValue=RegExp.$4;if(!tagName){tagName='*';}
var found=new Array;var foundCount=0;for(var h=0;h<currentContext.length;h++){var elements;if(tagName=='*'){elements=getAllChildren(currentContext[h]);}else{elements=currentContext[h].getElementsByTagName(tagName);}
for(var j=0;j<elements.length;j++){found[foundCount++]=elements[j];}}
currentContext=new Array;var currentContextIndex=0;var checkFunction;switch(attrOperator){case'=':checkFunction=function(e){return(e.getAttribute(attrName)==attrValue);};break;case'~':checkFunction=function(e){return(e.getAttribute(attrName).match(new RegExp('\\b'+attrValue+'\\b')));};break;case'|':checkFunction=function(e){return(e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?')));};break;case'^':checkFunction=function(e){return(e.getAttribute(attrName).indexOf(attrValue)==0);};break;case'$':checkFunction=function(e){return(e.getAttribute(attrName).lastIndexOf(attrValue)==e.getAttribute(attrName).length-attrValue.length);};break;case'*':checkFunction=function(e){return(e.getAttribute(attrName).indexOf(attrValue)>-1);};break;default:checkFunction=function(e){return e.getAttribute(attrName);};}
currentContext=new Array;var currentContextIndex=0;for(var k=0;k<found.length;k++){if(checkFunction(found[k])){currentContext[currentContextIndex++]=found[k];}}
continue;}
tagName=token;var found=new Array;var foundCount=0;for(var h=0;h<currentContext.length;h++){var elements=currentContext[h].getElementsByTagName(tagName);for(var j=0;j<elements.length;j++){found[foundCount++]=elements[j];}}
currentContext=found;}
return currentContext;}
DomUtils.getElementsBySelector=document.getElementsBySelector;
function EventManager(){window.onload=null;window.onunload=null;this.alterEventObject=function(e){};var registry={};var targetIdCount=0;function registryKey(id,type,fn){return id+'#'+type+'#'+fn;}
function isInRegistry(key){return registry[key]!=null;}
function invoke(key,evt){if(!isInRegistry(key))return null;if(window.eventManager){var _evt=window.eventManager.alterEventObject(evt);if(typeof(_evt)=='object')evt=_evt;var handler=registry[key];var scope=handler.scope;scope.__EventManager_Listener__=handler.listener;scope.__EventManager_Listener__(evt);scope.__EventManager_Listener__=null;return true;}else{return false;}}
function targetId(target){if(target==document)return"__EventManager_ID_document";if(target==window)return"__EventManager_ID_window";if(target==xmlhttp)return"__EventManager_ID_xmlhttp";try{var id=target.getAttribute('id')||target.uniqueID;if(id==null){id="__EventManager_ID_"+(targetIdCount++);target.setAttribute('id',id);}}catch(e){}
return id;}
this.isEventRegistered=function(target,type,listener){var key=registryKey(targetId(target),type,listener);return isInRegistry(key);}
this.addEvent=function(target,type,listener,scope,capture){var key,handler;key=registryKey(targetId(target),type,listener);scope=scope||target;if(isInRegistry(key))window.removeEvent(target,type,listener);handler={listener:listener,scope:scope,capture:capture,invoker:function(evt){invoke(key,evt);}};registry[key]=handler;if(target.addEventListener)target.addEventListener(type,handler.invoker,capture);else if(target.attachEvent)target.attachEvent('on'+type,handler.invoker);else return false;if(typeof(window.addOnUnload)=='function')window.addOnUnload(function(){window.removeEvent(target,type,listener);target=type=listener=null;});scope=null;return true;}
this.removeEvent=function(target,type,listener){var key,invoker,capture;key=registryKey(targetId(target),type,listener);if(!isInRegistry(key))return false;invoker=registry[key].invoker;capture=registry[key].capture;registry[key]=null;if(target.removeEventListener)target.removeEventListener(type,invoker,capture);else if(target.detachEvent)target.detachEvent("on"+type,invoker);else return false;return true;}
this.addOnResize=function(func){if(typeof(window.onresize)!='function')window.onresize=func;else{var oldResize=window.onresize;window.onresize=function(){oldResize();func();}}}
return this;}
EventManager.prototype=new Object;EventManager.prototype.constructor=EventManager;EventManager.superclass=Object.prototype;window.eventManager=new EventManager();window.EventManager=window.eventManager;function EventManager_CleanWindow(){window.onafterprint=null;window.onbeforeprint=null;window.onbeforeunload=null;window.onblur=null;window.ondragdrop=null;window.onerror=null;window.onfocus=null;window.onhelp=null;window.onload=null;window.onmove=null;window.onresize=null;window.onscroll=null;window.onunload=null;}
EventManager.instance=null;EventManager.getInstance=function(){if(!EventManager.instance)EventManager.instance=new EventManager();return EventManager.instance;}
window.addEvent=function(target,type,listener,scope,capture){if(window.eventManager)window.eventManager.addEvent(target,type,listener,scope,capture);else return false;}
window.removeEvent=function(target,type,listener){if(window.eventManager)window.eventManager.removeEvent(target,type,listener);else return false;}
window.isEventRegistered=function(target,type,listener){if(window.eventManager)return window.eventManager.isEventRegistered(target,type,listener);else return false;}
window.loadQueue=new Array();window.addOnLoad=window.addOnload=function Window_AddOnLoad(func){if(!(window.onload instanceof Function)){if(window.onload){var oldOnload=window.onload;window.loadQueue.push(function(){oldOnload});}
window.onload=Window_OnLoadQueue;}else if(window.onload!==Window_OnLoadQueue){loadQueue.push(window.onload);window.onload=Window_OnLoadQueue;}
var sz=window.loadQueue.length;window.loadQueue[sz]=func;}
function Window_OnLoadQueue(){for(var i=0;i<window.loadQueue.length;i++){var loadFunc=window.loadQueue[i];loadFunc();}}
window.onload=Window_OnLoadQueue;window.unloadQueue=new Array();function Window_OnUnloadQueue(){for(var i=0;i<window.unloadQueue.length;i++){var unloadFunc=window.unloadQueue[i];unloadFunc();}
if(typeof(GUnload)=='function')GUnload();window.onload=null;window.onunload=null;window.onresize=null;window.eventManager=null;window.EventManager=null;}
window.addOnunload=window.addOnUnLoad=window.addOnUnload=function Window_AddOnUnload(func){if(!(window.onunload instanceof Function)){if(window.onunload){var oldUnload=window.onunload;window.unloadQueue.push(function(){oldUnload});}
window.onunload=Window_OnUnloadQueue;}else if(window.onunload!==Window_OnUnloadQueue){window.unloadQueue.push(window.onunload);window.onunload=Window_OnUnloadQueue;}
window.unloadQueue.push(func);}
window.onunload=Window_OnUnloadQueue;window.addOnResize=function(func){if(window.eventManager)window.eventManager.addOnResize(func);else return false;}
if(typeof window.addOnUnload=='function')window.addOnUnload(EventManager_CleanWindow);var xmlhttp=null;try{xmlhttp=new ActiveXObject('Msxml2.XMLHTTP');}catch(e){try{xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');}catch(e){try{xmlhttp=new XMLHttpRequest();}catch(e){xmlhttp=null;}}}
var AJAX_REQUEST={DEBUG:false,DEFAULT_ASYNC:false,DEFAULT_METHOD:'POST',DEFAULT_URL:'',MAX_REQUESTS:10,REQUEST_TIMEOUT:30000}
if(!window.ajax){window.ajax={NEXT_ID:0,COUNT:0,MAX_CONCURRENT:AJAX_REQUEST.MAX_REQUESTS};}
function AjaxRequest(method,url,async,requestTimeout,user,password){this.abort=function(){if(AJAX_REQUEST.DEBUG&&typeof(writeDebug)=='function')writeDebug('AjaxRequest.abort() called.');if(this.request&&this.busy){if(window.ajaxRequests&&window.ajaxTimers&&this.requestId>=0){if(AJAX_REQUEST.DEBUG&&typeof(writeDebug)=='function')writeDebug('abort(): clearing timeout: '+self.requestId+', timerId: '+window.ajaxTimers[self.requestId]);clearTimeout(window.ajaxTimers[this.requestId]);window.ajaxTimers[this.requestId]=null;window.ajaxRequests[this.requestId]=null;}
this.request.onreadystatechange=function(){};this.request.abort();this.request=null;this.busy=false;window.ajax.COUNT--;}}
this.send=function(){try{this.request=new ActiveXObject('Msxml2.XMLHTTP');}catch(e){try{this.request=new ActiveXObject('Microsoft.XMLHTTP');}catch(e){try{this.request=new XMLHttpRequest();}catch(e){this.request=null;}}}
if(this.request){var url=this.url;if(this.async&&this.callback){this.request.onreadystatechange=this.onStateChange;if(this.requestTimeout!=null&&this.timeout>0&&this.requestId==null){if(window.ajax.COUNT<window.ajax.MAX_CONCURRENT){this.requestId=window.ajax.NEXT_ID++;window.ajax.COUNT++;}else{alert('Too many concurrent ajax requests.');return false;}
if(AJAX_REQUEST.DEBUG&&typeof(writeDebug)=='function')writeDebug('XmlHttpRequest '+this.requestId+' setting timeout: '+this.requestTimeout);self.requestTimer=setTimeout(function(){self.abort();self.requestTimer=null;if(typeof(writeDebug)=='function')writeDebug('XmlHttpRequest '+self.requestId+' aborted.');},this.requestTimeout);}}
if(this.method=='POST'){this.request.open(this.method,this.url,this.async,this.user,this.password);this.request.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');this.busy=true;this.request.send(this.params.join('&'));}else{url=this.url+(this.params.length>0?'?'+this.params.join('&'):'');this.request.open(this.method,url,this.async,this.user,this.password);this.busy=true;this.request.send('');}
if(!this.async){this.busy=false;;return this.request.responseXML;}}}
this.setParameter=function(name,value){if(AJAX_REQUEST.DEBUG&&typeof(writeDebug)=='function')writeDebug('AjaxRequest.setParameter('+name+', '+value+') called.');this.params.push(name+'='+encodeURIComponent(value));}
this.setResponseType=function(ResponseType){this.ResponseType=(ResponseType=='html'?'html':'xml');}
this.setCallback=function(func){if(typeof(func)=='function')this.callback=func;else alert('Unable to set callback handler. Must be a function.');}
this.onStateChange=function(){if(self.request&&self.request.readyState&&self.request.readyState==4){if(self.requestTimer&&self.requestId){if(AJAX_REQUEST.DEBUG&&typeof(writeDebug)=='function')writeDebug('XmlHttpRequest '+this.requestId+' clearing timeout.');clearTimeout(self.requestTimer);self.requestTimer=null;self.requestId=null;}
self.busy=false;if(AJAX_REQUEST.DEBUG&&typeof(writeDebug)=='function')writeDebug('XmlHttpRequest.reponseText: '+self.request.responseText);if(self.ResponseType&&self.ResponseType=='html'){self.callback(self.request.responseText);}else{self.callback(self.request.responseXML);}}}
this.method=method||AJAX_REQUEST.DEFAULT_METHOD;this.url=url||AJAX_REQUEST.DEFAULT_URL;this.async=async||AJAX_REQUEST.DEFAULT_ASYNC;this.requestTimeout=requestTimeout||AJAX_REQUEST.REQUEST_TIMEOUT;this.user=user||null;this.password=password||null;this.callback=null;this.params=new Array;this.request=null;this.requestTimer=null;this.ResponseType='xml';var self=this;}
var ypSlideOutMenuRegistry=[];var ypSlideOutMenuConfig=new Array();ypSlideOutMenuConfig['aniLen']=250;ypSlideOutMenuConfig['hideDelay']=1000;ypSlideOutMenuConfig['minCPUResolution']=10;function ypSlideOutMenu(id,_2,_3,_4,_5,_6){this.selectedIndex;this.ie=document.all?1:0;this.ns4=document.layers?1:0;this.dom=document.getElementById?1:0;if(this.ie||this.ns4||this.dom){this.id=id;this.dir=_2;this.orientation=_2=="left"||_2=="right"?"h":"v";this.dirType=_2=="right"||_2=="down"?"-":"+";this.dim=this.orientation=="h"?_5:_6;this.hideTimer=false;this.aniTimer=false;this.open=false;this.over=false;this.startTime=0;this.gRef="ypSlideOutMenu_"+id;eval(this.gRef+"=this");ypSlideOutMenuRegistry[id]=this;this.cssFuncBody="var elContainer = document.getElementById(elContainerId);\n"
+"var elContent = document.getElementById(elContentId);\n"
+"elContainer.style.visibility = 'hidden';\n"
+"elContainer.style.display = 'none';\n"
+"elContainer.style.left = '"+_3+"px';\n"
+"elContainer.style.top = '"+_4+"px';\n"
+"elContainer.style.overflow = 'hidden';\n"
+"elContainer.style.zIndex = '10000';\n"
+"elContainer.style.position = 'absolute';\n"
+"elContainer.style.width = '"+_5+"px';\n"
+"elContainer.style.height = '"+_6+"px';\n"
+"elContainer.style.clip = 'rect(0px, "+(_5+2)+"px, "+(_6+2)+"px, 0px)';\n"
+"elContent.style.position = 'absolute';\n"
+"elContent.style.width = '"+_5+"px';\n"
+"elContent.style.height = '"+_6+"px';\n"
+"elContent.style.clip = 'rect(0px, "+_5+"px, "+_6+"px, 0px)';\n"
this.load();}}
ypSlideOutMenu.prototype.load=function(){var d=document;var _10=this.id+"Container";var _11=this.id+"Content";var cssFunc=new Function('elContainerId','elContentId',this.cssFuncBody);cssFunc(_10,_11);var _12=this.dom?d.getElementById(_10):this.ie?d.all[_10]:d.layers[_10];if(_12){var _13=this.ns4?_12.layers[_11]:this.ie?d.all[_11]:d.getElementById(_11);}
var _14;if(!_12||!_13){window.setTimeout(this.gRef+".load()",100);}
else{this.container=_12;this.menu=_13;this.style=this.ns4?this.menu:this.menu.style;this.homePos=eval("0"+this.dirType+this.dim);this.outPos=0;this.accelConst=(this.outPos-this.homePos)/ypSlideOutMenuConfig['aniLen']/ypSlideOutMenuConfig['aniLen'];if(this.ns4){this.menu.captureEvents(Event.MOUSEOVER|Event.MOUSEOUT);}
this.menu.onmouseover=new Function("ypSlideOutMenu.showMenu('"+this.id+"')");this.menu.onmouseout=new Function("ypSlideOutMenu.hideMenu('"+this.id+"')");this.endSlide();}};ypSlideOutMenu.repositionMenu=function(id,left,top){var obj=ypSlideOutMenuRegistry[id];if(obj){objStyle=this.ns4?obj.container:obj.container.style;if(objStyle){objStyle.left=left+'px';objStyle.top=top+'px';}}};ypSlideOutMenu.showMenu=function(id){var obj=ypSlideOutMenuRegistry[id];if(obj.container){ypSlideOutMenu.resetHandlers(id)
obj.over=true;for(menu in ypSlideOutMenuRegistry){if(ypSlideOutMenuRegistry[menu]){if(id!=menu){ypSlideOutMenu.hide(menu);}}}
if(obj.hideTimer){obj.hideTimer=window.clearTimeout(obj.hideTimer);}
if(!obj.open&&!obj.aniTimer){obj.startSlide(true);}}};ypSlideOutMenu.hideMenu=function(id){var obj=ypSlideOutMenuRegistry[id];if(obj.container){if(obj.hideTimer){window.clearTimeout(obj.hideTimer);}
obj.hideTimer=window.setTimeout("ypSlideOutMenu.hide('"+id+"')",ypSlideOutMenuConfig['hideDelay']);}};ypSlideOutMenu.resetHandlers=function(id){var obj=ypSlideOutMenuRegistry[id];if(obj.container){if(!obj.menu.onmouseover){obj.menu.onmouseover=new Function("ypSlideOutMenu.showMenu('"+id+"')");}
if(!obj.menu.onmouseout){obj.menu.onmouseout=new Function("ypSlideOutMenu.hideMenu('"+id+"')");}}};ypSlideOutMenu.setSelectedIndex=function(id,index){var obj=ypSlideOutMenuRegistry[id];if(obj.container){obj.selectedIndex=index;}};ypSlideOutMenu.hideMenuAfterSelection=function(id){var obj=ypSlideOutMenuRegistry[id];if(obj.container){if(obj.hideTimer){window.clearTimeout(obj.hideTimer);}
obj.menu.onmouseover=null;obj.menu.onmouseout=null;ypSlideOutMenu.hide(id);obj.hideTimer=window.setTimeout("ypSlideOutMenu.resetHandlers('"+id+"')",500);}};ypSlideOutMenu.hideAll=function(){var reg=ypSlideOutMenuRegistry;for(menu in reg){ypSlideOutMenu.hide(menu);if(menu.hideTimer){window.clearTimeout(menu.hideTimer);}}};ypSlideOutMenu.hide=function(id){var obj=ypSlideOutMenuRegistry[id];obj.over=false;if(obj.hideTimer){window.clearTimeout(obj.hideTimer);}
obj.hideTimer=0;if(obj.open&&!obj.aniTimer){obj.startSlide(false);}};ypSlideOutMenu.prototype.startSlide=function(_21){this[_21?"onactivate":"ondeactivate"]();this.open=_21;if(_21){this.setVisibility(true);}
this.startTime=(new Date()).getTime();this.aniTimer=window.setInterval(this.gRef+".slide()",ypSlideOutMenuConfig['minCPUResolution']);};ypSlideOutMenu.prototype.slide=function(){var _22=(new Date()).getTime()-this.startTime;if(_22>ypSlideOutMenuConfig['aniLen']){this.endSlide();}
else{var d=Math.round(Math.pow(ypSlideOutMenuConfig['aniLen']-_22,2)*this.accelConst);if(this.open&&this.dirType=="-"){d=-d;}
else{if(this.open&&this.dirType=="+"){d=-d;}
else{if(!this.open&&this.dirType=="-"){d=-this.dim+d;}
else{d=this.dim+d;}}}
this.moveTo(d);}};ypSlideOutMenu.prototype.endSlide=function(){this.aniTimer=window.clearTimeout(this.aniTimer);this.moveTo(this.open?this.outPos:this.homePos);if(!this.open){this.setVisibility(false);}
if((this.open&&!this.over)||(!this.open&&this.over)){this.startSlide(this.over);}};ypSlideOutMenu.prototype.setVisibility=function(_24){var s=this.ns4?this.container:this.container.style;s.visibility=_24?'visible':'hidden';s.display=_24?'block':'none';};ypSlideOutMenu.prototype.moveTo=function(p){this.style[this.orientation=='h'?'left':'top']=this.ns4?p:p+"px";};ypSlideOutMenu.prototype.getPos=function(c){return parseInt(this.style[c]);};ypSlideOutMenu.prototype.onactivate=function(){};ypSlideOutMenu.prototype.ondeactivate=function(){};
