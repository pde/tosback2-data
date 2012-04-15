/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.manager"]){dojo._hasResource["dijit._base.manager"]=true;dojo.provide("dijit._base.manager");dojo.declare("dijit.WidgetSet",null,{constructor:function(){this._hash={};this.length=0},add:function(b){if(this._hash[b.id])throw Error("Tried to register widget with id=="+b.id+" but that id is already registered");this._hash[b.id]=b;this.length++},remove:function(b){if(this._hash[b]){delete this._hash[b];this.length--}},forEach:function(b,c){c=c||dojo.global;var f=0,e;
for(e in this._hash)b.call(c,this._hash[e],f++,this._hash);return this},filter:function(b,c){c=c||dojo.global;var f=new dijit.WidgetSet,e=0,m;for(m in this._hash){var n=this._hash[m];b.call(c,n,e++,this._hash)&&f.add(n)}return f},byId:function(b){return this._hash[b]},byClass:function(b){var c=new dijit.WidgetSet,f,e;for(f in this._hash){e=this._hash[f];e.declaredClass==b&&c.add(e)}return c},toArray:function(){var b=[],c;for(c in this._hash)b.push(this._hash[c]);return b},map:function(b,c){return dojo.map(this.toArray(),
b,c)},every:function(b,c){c=c||dojo.global;var f=0,e;for(e in this._hash)if(!b.call(c,this._hash[e],f++,this._hash))return false;return true},some:function(b,c){c=c||dojo.global;var f=0,e;for(e in this._hash)if(b.call(c,this._hash[e],f++,this._hash))return true;return false}});(function(){dijit.registry=new dijit.WidgetSet;var b=dijit.registry._hash,c=dojo.attr,f=dojo.hasAttr,e=dojo.style;dijit.byId=function(a){return typeof a=="string"?b[a]:a};var m={};dijit.getUniqueId=function(a){var d;do d=a+
"_"+(a in m?++m[a]:m[a]=0);while(b[d]);return dijit._scopeName=="dijit"?d:dijit._scopeName+"_"+d};dijit.findWidgets=function(a){function d(h){for(h=h.firstChild;h;h=h.nextSibling)if(h.nodeType==1){var j=h.getAttribute("widgetId");if(j)(j=b[j])&&i.push(j);else d(h)}}var i=[];d(a);return i};dijit._destroyAll=function(){dijit._curFocus=null;dijit._prevFocus=null;dijit._activeStack=[];dojo.forEach(dijit.findWidgets(dojo.body()),function(a){if(!a._destroyed)if(a.destroyRecursive)a.destroyRecursive();else a.destroy&&
a.destroy()})};dojo.isIE&&dojo.addOnWindowUnload(function(){dijit._destroyAll()});dijit.byNode=function(a){return b[a.getAttribute("widgetId")]};dijit.getEnclosingWidget=function(a){for(;a;){var d=a.getAttribute&&a.getAttribute("widgetId");if(d)return b[d];a=a.parentNode}return null};var n=dijit._isElementShown=function(a){var d=e(a);return d.visibility!="hidden"&&d.visibility!="collapsed"&&d.display!="none"&&c(a,"type")!="hidden"};dijit.hasDefaultTabStop=function(a){switch(a.nodeName.toLowerCase()){case "a":return f(a,
"href");case "area":case "button":case "input":case "object":case "select":case "textarea":return true;case "iframe":var d;try{var i=a.contentDocument;if("designMode"in i&&i.designMode=="on")return true;d=i.body}catch(h){try{d=a.contentWindow.document.body}catch(j){return false}}return d.contentEditable=="true"||d.firstChild&&d.firstChild.contentEditable=="true";default:return a.contentEditable=="true"}};var t=dijit.isTabNavigable=function(a){return c(a,"disabled")?false:f(a,"tabIndex")?c(a,"tabIndex")>=
0:dijit.hasDefaultTabStop(a)};dijit._getTabNavigable=function(a){function d(l){return l&&l.tagName.toLowerCase()=="input"&&l.type&&l.type.toLowerCase()=="radio"&&l.name&&l.name.toLowerCase()}var i,h,j,q,p,r,o={},s=function(l){dojo.query("> *",l).forEach(function(g){if(!(dojo.isIE&&g.scopeName!=="HTML"||!n(g))){if(t(g)){var k=c(g,"tabIndex");if(!f(g,"tabIndex")||k==0){i||(i=g);h=g}else if(k>0){if(!j||k<q){q=k;j=g}if(!p||k>=r){r=k;p=g}}k=d(g);if(dojo.attr(g,"checked")&&k)o[k]=g}g.nodeName.toUpperCase()!=
"SELECT"&&s(g)}})};n(a)&&s(a);return{first:o[d(i)]||i,last:o[d(h)]||h,lowest:o[d(j)]||j,highest:o[d(p)]||p}};dijit.getFirstInTabbingOrder=function(a){a=dijit._getTabNavigable(dojo.byId(a));return a.lowest?a.lowest:a.first};dijit.getLastInTabbingOrder=function(a){a=dijit._getTabNavigable(dojo.byId(a));return a.last?a.last:a.highest};dijit.defaultDuration=dojo.config.defaultDuration||200})()};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.typematic"]){dojo._hasResource["dijit._base.typematic"]=true;dojo.provide("dijit._base.typematic");dijit.typematic={_fireEventAndReload:function(){this._timer=null;this._callback(++this._count,this._node,this._evt);this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay),this._minDelay);this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),
this._currentTimeout)},trigger:function(c,a,h,f,e,g,d,b){if(e!=this._obj){this.stop();this._initialDelay=d||500;this._subsequentDelay=g||0.9;this._minDelay=b||10;this._obj=e;this._evt=c;this._node=h;this._count=this._currentTimeout=-1;this._callback=dojo.hitch(a,f);this._fireEventAndReload();this._evt=dojo.mixin({faux:true},c)}},stop:function(){if(this._timer){clearTimeout(this._timer);this._timer=null}if(this._obj){this._callback(-1,this._node,this._evt);this._obj=null}},addKeyListener:function(c,
a,h,f,e,g,d){if(a.keyCode){a.charOrCode=a.keyCode;dojo.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0")}else if(a.charCode){a.charOrCode=String.fromCharCode(a.charCode);dojo.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0")}return[dojo.connect(c,"onkeypress",this,function(b){if(b.charOrCode==a.charOrCode&&(a.ctrlKey===undefined||a.ctrlKey==b.ctrlKey)&&
(a.altKey===undefined||a.altKey==b.altKey)&&(a.metaKey===undefined||a.metaKey==(b.metaKey||false))&&(a.shiftKey===undefined||a.shiftKey==b.shiftKey)){dojo.stopEvent(b);dijit.typematic.trigger(b,h,c,f,a,e,g,d)}else dijit.typematic._obj==a&&dijit.typematic.stop()}),dojo.connect(c,"onkeyup",this,function(){dijit.typematic._obj==a&&dijit.typematic.stop()})]},addMouseListener:function(c,a,h,f,e,g){var d=dojo.connect;return[d(c,"mousedown",this,function(b){dojo.stopEvent(b);dijit.typematic.trigger(b,a,
c,h,c,f,e,g)}),d(c,"mouseup",this,function(b){dojo.stopEvent(b);dijit.typematic.stop()}),d(c,"mouseout",this,function(b){dojo.stopEvent(b);dijit.typematic.stop()}),d(c,"mousemove",this,function(b){b.preventDefault()}),d(c,"dblclick",this,function(b){dojo.stopEvent(b);if(dojo.isIE){dijit.typematic.trigger(b,a,c,h,c,f,e,g);setTimeout(dojo.hitch(this,dijit.typematic.stop),50)}})]},addListener:function(c,a,h,f,e,g,d,b){return this.addKeyListener(a,h,f,e,g,d,b).concat(this.addMouseListener(c,f,e,g,d,b))}}};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.wai"]){dojo._hasResource["dijit._base.wai"]=true;dojo.provide("dijit._base.wai");dijit.wai={onload:function(){var a=dojo.create("div",{id:"a11yTestNode",style:{cssText:'border: 1px solid;border-color:red green;position: absolute;height: 5px;top: -999px;background-image: url("'+(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif"))+'");'}},dojo.body()),b=dojo.getComputedStyle(a);if(b){var c=b.backgroundImage;dojo[b.borderTopColor==b.borderRightColor||
c!=null&&(c=="none"||c=="url(invalid-url:)")?"addClass":"removeClass"](dojo.body(),"dijit_a11y");if(dojo.isIE)a.outerHTML="";else dojo.body().removeChild(a)}}};if(dojo.isIE||dojo.isMoz)dojo._loaders.unshift(dijit.wai.onload);dojo.mixin(dijit,{hasWaiRole:function(a,b){var c=this.getWaiRole(a);return b?c.indexOf(b)>-1:c.length>0},getWaiRole:function(a){return dojo.trim((dojo.attr(a,"role")||"").replace("wairole:",""))},setWaiRole:function(a,b){dojo.attr(a,"role",b)},removeWaiRole:function(a,b){var c=
dojo.attr(a,"role");if(c)if(b){c=dojo.trim((" "+c+" ").replace(" "+b+" "," "));dojo.attr(a,"role",c)}else a.removeAttribute("role")},hasWaiState:function(a,b){return a.hasAttribute?a.hasAttribute("aria-"+b):!!a.getAttribute("aria-"+b)},getWaiState:function(a,b){return a.getAttribute("aria-"+b)||""},setWaiState:function(a,b,c){a.setAttribute("aria-"+b,c)},removeWaiState:function(a,b){a.removeAttribute("aria-"+b)}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._Contained"]){dojo._hasResource["dijit._Contained"]=true;dojo.provide("dijit._Contained");dojo.declare("dijit._Contained",null,{getParent:function(){var a=dijit.getEnclosingWidget(this.domNode.parentNode);return a&&a.isContainer?a:null},_getSibling:function(a){var b=this.domNode;do b=b[a+"Sibling"];while(b&&b.nodeType!=1);return b&&dijit.byNode(b)},getPreviousSibling:function(){return this._getSibling("previous")},getNextSibling:function(){return this._getSibling("next")},
getIndexInParent:function(){var a=this.getParent();if(!a||!a.getIndexOfChild)return-1;return a.getIndexOfChild(this)}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._Container"]){dojo._hasResource["dijit._Container"]=true;dojo.provide("dijit._Container");dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){this.inherited(arguments);if(!this.containerNode)this.containerNode=this.domNode},addChild:function(a,b){var c=this.containerNode;if(b&&typeof b=="number"){var d=this.getChildren();if(d&&d.length>=b){c=d[b-1].domNode;b="after"}}dojo.place(a.domNode,c,b);this._started&&!a._started&&a.startup()},removeChild:function(a){if(typeof a==
"number")a=this.getChildren()[a];if(a)(a=a.domNode)&&a.parentNode&&a.parentNode.removeChild(a)},hasChildren:function(){return this.getChildren().length>0},destroyDescendants:function(a){dojo.forEach(this.getChildren(),function(b){b.destroyRecursive(a)})},_getSiblingOfChild:function(a,b){var c=a.domNode,d=b>0?"nextSibling":"previousSibling";do c=c[d];while(c&&(c.nodeType!=1||!dijit.byNode(c)));return c&&dijit.byNode(c)},getIndexOfChild:function(a){return dojo.indexOf(this.getChildren(),a)},startup:function(){if(!this._started){dojo.forEach(this.getChildren(),
function(a){a.startup()});this.inherited(arguments)}}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._CssStateMixin"]){dojo._hasResource["dijit._CssStateMixin"]=true;dojo.provide("dijit._CssStateMixin");dojo.declare("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){this.inherited(arguments);dojo.forEach(["onmouseenter","onmouseleave","onmousedown"],function(b){this.connect(this.domNode,b,"_cssMouseEvent")},this);dojo.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(b){this.watch(b,
dojo.hitch(this,"_setStateClass"))},this);for(var a in this.cssStateNodes)this._trackMouseState(this[a],this.cssStateNodes[a]);this._setStateClass()},_cssMouseEvent:function(a){if(!this.disabled)switch(a.type){case "mouseenter":case "mouseover":this._set("hovering",true);this._set("active",this._mouseDown);break;case "mouseleave":case "mouseout":this._set("hovering",false);this._set("active",false);break;case "mousedown":this._set("active",true);this._mouseDown=true;var b=this.connect(dojo.body(),
"onmouseup",function(){this._mouseDown=false;this._set("active",false);this.disconnect(b)})}},_setStateClass:function(){function a(c){b=b.concat(dojo.map(b,function(e){return e+c}),"dijit"+c)}var b=this.baseClass.split(" ");this.isLeftToRight()||a("Rtl");this.checked&&a("Checked");this.state&&a(this.state);this.selected&&a("Selected");if(this.disabled)a("Disabled");else if(this.readOnly)a("ReadOnly");else if(this.active)a("Active");else this.hovering&&a("Hover");this._focused&&a("Focused");var d=
this.stateNode||this.domNode,f={};dojo.forEach(d.className.split(" "),function(c){f[c]=true});"_stateClasses"in this&&dojo.forEach(this._stateClasses,function(c){delete f[c]});dojo.forEach(b,function(c){f[c]=true});var g=[],h;for(h in f)g.push(h);d.className=g.join(" ");this._stateClasses=b},_trackMouseState:function(a,b){function d(){var i="disabled"in c&&c.disabled||"readonly"in c&&c.readonly;dojo.toggleClass(a,b+"Hover",f&&!g&&!i);dojo.toggleClass(a,b+"Active",g&&!i);dojo.toggleClass(a,b+"Focused",
h&&!i)}var f=false,g=false,h=false,c=this,e=dojo.hitch(this,"connect",a);e("onmouseenter",function(){f=true;d()});e("onmouseleave",function(){g=f=false;d()});e("onmousedown",function(){g=true;d()});e("onmouseup",function(){g=false;d()});e("onfocus",function(){h=true;d()});e("onblur",function(){h=false;d()});this.watch("disabled",d);this.watch("readOnly",d)}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.AdapterRegistry"]){dojo._hasResource["dojo.AdapterRegistry"]=true;dojo.provide("dojo.AdapterRegistry");dojo.AdapterRegistry=function(b){this.pairs=[];this.returnWrappers=b||false};dojo.extend(dojo.AdapterRegistry,{register:function(b,a,c,d,e){this.pairs[e?"unshift":"push"]([b,a,c,d])},match:function(){for(var b=0;b<this.pairs.length;b++){var a=this.pairs[b];if(a[1].apply(this,arguments))return a[3]||this.returnWrappers?a[2]:a[2].apply(this,arguments)}throw Error("No match found");
},unregister:function(b){for(var a=0;a<this.pairs.length;a++)if(this.pairs[a][0]==b){this.pairs.splice(a,1);return true}return false}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.cache"]){dojo._hasResource["dojo.cache"]=true;dojo.provide("dojo.cache");var cache={};dojo.cache=function(a,b,c){if(typeof a=="string")a=dojo.moduleUrl(a,b);else{a=a;c=b}b=a.toString();a=c;if(c!=undefined&&!dojo.isString(c))a="value"in c?c.value:undefined;c=c&&c.sanitize?true:false;if(typeof a=="string")a=cache[b]=c?dojo.cache._sanitize(a):a;else if(a===null)delete cache[b];else{if(!(b in cache)){a=dojo._getText(b);cache[b]=c?dojo.cache._sanitize(a):a}a=cache[b]}return a};
dojo.cache._sanitize=function(a){if(a){a=a.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");var b=a.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);if(b)a=b[1]}else a="";return a}};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;dojo.provide("dojo.date.stamp");dojo.getObject("date.stamp",true,dojo);dojo.date.stamp.fromISOString=function(e,d){if(!dojo.date.stamp._isoRegExp)dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;var a=dojo.date.stamp._isoRegExp.exec(e),f=null;if(a){a.shift();a[1]&&a[1]--;if(a[6])a[6]*=1E3;if(d){d=new Date(d);dojo.forEach(dojo.map(["FullYear",
"Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(g){return d["get"+g]()}),function(g,h){a[h]=a[h]||g})}f=new Date(a[0]||1970,a[1]||0,a[2]||1,a[3]||0,a[4]||0,a[5]||0,a[6]||0);if(a[0]<100)f.setFullYear(a[0]||1970);var b=0,c=a[7]&&a[7].charAt(0);if(c!="Z"){b=(a[8]||0)*60+(Number(a[9])||0);if(c!="-")b*=-1}if(c)b-=f.getTimezoneOffset();b&&f.setTime(f.getTime()+b*6E4)}return f};dojo.date.stamp.toISOString=function(e,d){var a=function(h){return h<10?"0"+h:h};d=d||{};var f=[],b=d.zulu?
"getUTC":"get",c="";if(d.selector!="time"){c=e[b+"FullYear"]();c=["0000".substr((c+"").length)+c,a(e[b+"Month"]()+1),a(e[b+"Date"]())].join("-")}f.push(c);if(d.selector!="date"){c=[a(e[b+"Hours"]()),a(e[b+"Minutes"]()),a(e[b+"Seconds"]())].join(":");b=e[b+"Milliseconds"]();if(d.milliseconds)c+="."+(b<100?"0":"")+a(b);if(d.zulu)c+="Z";else if(d.selector!="time"){b=e.getTimezoneOffset();var g=Math.abs(b);c+=(b>0?"-":"+")+a(Math.floor(g/60))+":"+a(g%60)}f.push(c)}return f.join("T")}};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.Stateful"]){dojo._hasResource["dojo.Stateful"]=true;dojo.provide("dojo.Stateful");dojo.declare("dojo.Stateful",null,{postscript:function(a){a&&dojo.mixin(this,a)},get:function(a){return this[a]},set:function(a,c){if(typeof a==="object"){for(var b in a)this.set(b,a[b]);return this}b=this[a];this[a]=c;this._watchCallbacks&&this._watchCallbacks(a,b,c);return this},watch:function(a,c){var b=this._watchCallbacks;if(!b){var i=this;b=this._watchCallbacks=function(g,j,k,l){var h=
function(d){if(d){d=d.slice();for(var f=0,m=d.length;f<m;f++)try{d[f].call(i,g,j,k)}catch(n){console.error(n)}}};h(b["_"+g]);l||h(b["*"])}}if(!c&&typeof a==="function"){c=a;a="*"}else a="_"+a;var e=b[a];if(typeof e!=="object")e=b[a]=[];e.push(c);return{unwatch:function(){e.splice(dojo.indexOf(e,c),1)}}}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;dojo.provide("dojo.string");dojo.getObject("string",true,dojo);dojo.string.rep=function(a,b){if(b<=0||!a)return"";for(var c=[];;){b&1&&c.push(a);if(!(b>>=1))break;a+=a}return c.join("")};dojo.string.pad=function(a,b,c,d){c||(c="0");a=String(a);b=dojo.string.rep(c,Math.ceil((b-a.length)/c.length));return d?a+b:b+a};dojo.string.substitute=function(a,b,c,d){d=d||dojo.global;c=c?dojo.hitch(d,c):function(e){return e};return a.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
function(e,f,g){e=dojo.getObject(f,false,b);if(g)e=dojo.getObject(g,false,d).call(d,e,f);return c(e,f).toString()})};dojo.string.trim=String.prototype.trim?dojo.trim:function(a){a=a.replace(/^\s+/,"");for(var b=a.length-1;b>=0;b--)if(/\S/.test(a.charAt(b))){a=a.substring(0,b+1);break}return a}};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.uacss"]){dojo._hasResource["dojo.uacss"]=true;dojo.provide("dojo.uacss");(function(){var a=dojo,d=a.doc.documentElement,b=a.isIE,g=a.isOpera,c=Math.floor,h=a.isFF,i=a.boxModel.replace(/-/,"");b={dj_ie:b,dj_ie6:c(b)==6,dj_ie7:c(b)==7,dj_ie8:c(b)==8,dj_ie9:c(b)==9,dj_quirks:a.isQuirks,dj_iequirks:b&&a.isQuirks,dj_opera:g,dj_khtml:a.isKhtml,dj_webkit:a.isWebKit,dj_safari:a.isSafari,dj_chrome:a.isChrome,dj_gecko:a.isMozilla,dj_ff3:c(h)==3};b["dj_"+i]=true;var e="",f;for(f in b)if(b[f])e+=
f+" ";d.className=a.trim(d.className+" "+e);dojo._loaders.unshift(function(){if(!dojo._isBodyLtr()){var j="dj_rtl dijitRtl "+e.replace(/ /g,"-rtl ");d.className=a.trim(d.className+" "+j)}})})()};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.window"]){dojo._hasResource["dojo.window"]=true;dojo.provide("dojo.window");dojo.getObject("window",true,dojo);dojo.window.getBox=function(){var b=dojo.doc.compatMode=="BackCompat"?dojo.body():dojo.doc.documentElement,i=dojo._docScroll();return{w:b.clientWidth,h:b.clientHeight,l:i.x,t:i.y}};dojo.window.get=function(b){if(dojo.isIE&&window!==document.parentWindow){b.parentWindow.execScript("document._parentWindow = window;","Javascript");var i=b._parentWindow;b._parentWindow=
null;return i}return b.parentWindow||b.defaultView};dojo.window.scrollIntoView=function(b,i){try{b=dojo.byId(b);var d=b.ownerDocument||dojo.doc,j=d.body||dojo.body(),o=d.documentElement||j.parentNode,f=dojo.isIE,e=dojo.isWebKit;if((!(dojo.isMoz||f||e||dojo.isOpera)||b==j||b==o)&&typeof b.scrollIntoView!="undefined")b.scrollIntoView(false);else{var p=d.compatMode=="BackCompat";d=p?j:o;e=e?j:d;var q=d.clientWidth,r=d.clientHeight,s=!dojo._isBodyLtr(),g=i||dojo.position(b),c=b.parentNode;d=function(x){return f<=
6||f&&p?false:dojo.style(x,"position").toLowerCase()=="fixed"};if(!d(b))for(;c;){if(c==j)c=e;var a=dojo.position(c),t=d(c);if(c==e){a.w=q;a.h=r;if(e==o&&f&&s)a.x+=e.offsetWidth-a.w;if(a.x<0||!f)a.x=0;if(a.y<0||!f)a.y=0}else{var k=dojo._getPadBorderExtents(c);a.w-=k.w;a.h-=k.h;a.x+=k.l;a.y+=k.t}if(c!=e){var h=c.clientWidth,l=a.w-h;if(h>0&&l>0){a.w=h;if(f&&s)a.x+=l}h=c.clientHeight;l=a.h-h;if(h>0&&l>0)a.h=h}if(t){if(a.y<0){a.h+=a.y;a.y=0}if(a.x<0){a.w+=a.x;a.x=0}if(a.y+a.h>r)a.h=r-a.y;if(a.x+a.w>q)a.w=
q-a.x}var m=g.x-a.x,n=g.y-Math.max(a.y,0),u=m+g.w-a.w,v=n+g.h-a.h;if(u*m>0){var w=Math[m<0?"max":"min"](m,u);g.x+=c.scrollLeft;c.scrollLeft+=f>=8&&!p&&s?-w:w;g.x-=c.scrollLeft}if(v*n>0){g.y+=c.scrollTop;c.scrollTop+=Math[n<0?"max":"min"](n,v);g.y-=c.scrollTop}c=c!=e&&!t&&c.parentNode}}}catch(y){console.error("scrollIntoView: "+y);b.scrollIntoView(false)}}};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.scroll"]){dojo._hasResource["dijit._base.scroll"]=true;dojo.provide("dijit._base.scroll");dojo.require("dojo.window");dijit.scrollIntoView=function(a,b){dojo.window.scrollIntoView(a,b)}};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.sniff"]){dojo._hasResource["dijit._base.sniff"]=true;dojo.provide("dijit._base.sniff");dojo.require("dojo.uacss")};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.window"]){dojo._hasResource["dijit._base.window"]=true;dojo.provide("dijit._base.window");dojo.require("dojo.window");dijit.getDocumentWindow=function(a){return dojo.window.get(a)}};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._KeyNavContainer"]){dojo._hasResource["dijit._KeyNavContainer"]=true;dojo.provide("dijit._KeyNavContainer");dojo.require("dijit._Container");dojo.declare("dijit._KeyNavContainer",dijit._Container,{tabIndex:"0",_keyNavCodes:{},connectKeyNavHandlers:function(a,b){var c=this._keyNavCodes={},d=dojo.hitch(this,this.focusPrev),f=dojo.hitch(this,this.focusNext);dojo.forEach(a,function(e){c[e]=d});dojo.forEach(b,function(e){c[e]=f});c[dojo.keys.HOME]=dojo.hitch(this,"focusFirstChild");
c[dojo.keys.END]=dojo.hitch(this,"focusLastChild");this.connect(this.domNode,"onkeypress","_onContainerKeypress");this.connect(this.domNode,"onfocus","_onContainerFocus")},startupKeyNavChildren:function(){dojo.forEach(this.getChildren(),dojo.hitch(this,"_startupChild"))},addChild:function(a){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);this._startupChild(a)},focus:function(){this.focusFirstChild()},focusFirstChild:function(){var a=this._getFirstFocusableChild();a&&this.focusChild(a)},
focusLastChild:function(){var a=this._getLastFocusableChild();a&&this.focusChild(a)},focusNext:function(){this.focusChild(this._getNextFocusableChild(this.focusedChild,1))},focusPrev:function(){this.focusChild(this._getNextFocusableChild(this.focusedChild,-1),true)},focusChild:function(a,b){this.focusedChild&&a!==this.focusedChild&&this._onChildBlur(this.focusedChild);a.focus(b?"end":"start");this._set("focusedChild",a)},_startupChild:function(a){a.set("tabIndex","-1");this.connect(a,"_onFocus",function(){a.set("tabIndex",
this.tabIndex)});this.connect(a,"_onBlur",function(){a.set("tabIndex","-1")})},_onContainerFocus:function(a){if(a.target===this.domNode){this.focusFirstChild();dojo.attr(this.domNode,"tabIndex","-1")}},_onBlur:function(){this.tabIndex&&dojo.attr(this.domNode,"tabIndex",this.tabIndex);this.inherited(arguments)},_onContainerKeypress:function(a){if(!(a.ctrlKey||a.altKey)){var b=this._keyNavCodes[a.charOrCode];if(b){b();dojo.stopEvent(a)}}},_onChildBlur:function(){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,
1)},_getLastFocusableChild:function(){return this._getNextFocusableChild(null,-1)},_getNextFocusableChild:function(a,b){if(a)a=this._getSiblingOfChild(a,b);for(var c=this.getChildren(),d=0;d<c.length;d++){a||(a=c[b>0?0:c.length-1]);if(a.isFocusable())return a;a=this._getSiblingOfChild(a,b)}return null}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;dojo.provide("dojo.parser");dojo.require("dojo.date.stamp");dojo.parser=new function(){function s(a){if(d.isString(a))return"string";if(typeof a=="number")return"number";if(typeof a=="boolean")return"boolean";if(d.isFunction(a))return"function";if(d.isArray(a))return"array";if(a instanceof Date)return"date";if(a instanceof d._Url)return"url";return"object"}function B(a,b){switch(b){case "string":return a;case "number":return a.length?
Number(a):NaN;case "boolean":return typeof a=="boolean"?a:a.toLowerCase()!="false";case "function":if(d.isFunction(a)){a=a.toString();a=d.trim(a.substring(a.indexOf("{")+1,a.length-1))}try{return a===""||a.search(/[^\w\.]+/i)!=-1?new Function(a):d.getObject(a,false)||new Function(a)}catch(c){return new Function}case "array":return a?a.split(/\s*,\s*/):[];case "date":switch(a){case "":return new Date("");case "now":return new Date;default:return d.date.stamp.fromISOString(a)}case "url":return d.baseUrl+
a;default:return d.fromJson(a)}}function x(a,b){for(var c in a)if(c.charAt(0)!="_")c in C||(b[c]=s(a[c]));return b}function v(a,b){var c=y[a];if(c){if(!b&&!c.params)c.params=x(c.cls.prototype,{})}else{c=d.getObject(a);var k=null;if(!c)return null;b||(k=x(c.prototype,{}));c={cls:c,params:k}}return c}var d=dojo,C={},y={};d.connect(d,"extend",function(){y={}});this._functionFromScript=function(a,b){var c="",k="",o=a.getAttribute(b+"args")||a.getAttribute("args");o&&d.forEach(o.split(/\s*,\s*/),function(n,
f){c+="var "+n+" = arguments["+f+"]; "});(o=a.getAttribute("with"))&&o.length&&d.forEach(o.split(/\s*,\s*/),function(n){c+="with("+n+"){";k+="}"});return new Function(c+a.innerHTML+k)};this.instantiate=function(a,b,c){var k=[];b=b||{};c=c||{};var o=(c.scope||d._scopeName)+"Type",n="data-"+(c.scope||d._scopeName)+"-";d.forEach(a,function(f){if(f){var e,i,g,l,q,j;if(f.node){e=f.node;i=f.type;j=f.fastpath;l=(g=f.clsInfo||i&&v(i,j))&&g.cls;q=f.scripts}else{e=f;q=(l=(g=(i=o in b?b[o]:e.getAttribute(o))&&
v(i))&&g.cls)&&(l._noScript||l.prototype._noScript)?[]:d.query("> script[type^='dojo/']",e)}if(!g)throw Error("Could not load class '"+i);var h={};c.defaults&&d._mixin(h,c.defaults);f.inherited&&d._mixin(h,f.inherited);if(j){if((g=e.getAttribute(n+"props"))&&g.length)try{g=d.fromJson.call(c.propsThis,"{"+g+"}");d._mixin(h,g)}catch(r){throw Error(r.toString()+" in data-dojo-props='"+g+"'");}if(g=e.getAttribute(n+"attach-point"))h.dojoAttachPoint=g;if(g=e.getAttribute(n+"attach-event"))h.dojoAttachEvent=
g;dojo.mixin(h,b)}else{f=e.attributes;for(var p in g.params){i=p in b?{value:b[p],specified:true}:f.getNamedItem(p);if(!(!i||!i.specified&&(!dojo.isIE||p.toLowerCase()!="value"))){i=i.value;switch(p){case "class":i="className"in b?b.className:e.className;break;case "style":i="style"in b?b.style:e.style&&e.style.cssText}var t=g.params[p];h[p]=typeof i=="string"?B(i,t):i}}}var z=[],A=[];d.forEach(q,function(m){e.removeChild(m);var w=m.getAttribute(n+"event")||m.getAttribute("event"),D=m.getAttribute("type");
m=d.parser._functionFromScript(m,n);if(w)if(D=="dojo/connect")z.push({event:w,func:m});else h[w]=m;else A.push(m)});var u=(q=l.markupFactory||l.prototype&&l.prototype.markupFactory)?q(h,e,l):new l(h,e);k.push(u);(l=e.getAttribute(n+"id")||e.getAttribute("jsId"))&&d.setObject(l,u);d.forEach(z,function(m){d.connect(u,m.event,null,m.func)});d.forEach(A,function(m){m.call(u)})}});b._started||d.forEach(k,function(f){if(!c.noStart&&f&&dojo.isFunction(f.startup)&&!f._started&&(!f.getParent||!f.getParent()))f.startup()});
return k};this.parse=function(a,b){function c(e,i){var g=dojo.clone(e.inherited);dojo.forEach(["dir","lang"],function(p){var t=e.node.getAttribute(p);if(t)g[p]=t});for(var l=e.clsInfo&&!e.clsInfo.cls.prototype._noScript?e.scripts:null,q=!e.clsInfo||!e.clsInfo.cls.prototype.stopParser||b&&b.template,j=e.node.firstChild;j;j=j.nextSibling)if(j.nodeType==1){var h,r=q&&j.getAttribute(n+"type");h=r?r:q&&j.getAttribute(o);r=r==h;if(h){h={type:h,fastpath:r,clsInfo:v(h,r),node:j,scripts:[],inherited:g};i.push(h);
c(h,i)}else if(l&&j.nodeName.toLowerCase()=="script")(h=j.getAttribute("type"))&&/^dojo\/\w/i.test(h)&&l.push(j);else q&&c({node:j,inherited:g},i)}}var k;if(!b&&a&&a.rootNode){b=a;k=b.rootNode}else k=a;b=b||{};var o=(b.scope||d._scopeName)+"Type",n="data-"+(b.scope||d._scopeName)+"-",f=[];c({node:k?dojo.byId(k):dojo.body(),inherited:b&&b.inherited||{dir:dojo._isBodyLtr()?"ltr":"rtl"}},f);return this.instantiate(f,b&&b.template?{template:true}:null,b)}};(function(){var s=function(){dojo.config.parseOnLoad&&
dojo.parser.parse()};dojo.getObject("dijit.wai.onload")===dojo._loaders[0]?dojo._loaders.splice(1,0,s):dojo._loaders.unshift(s)})()};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;dojo.provide("dijit._base.focus");dojo.require("dojo.window");dojo.require("dijit._base.manager");dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){return dijit.getBookmark().isCollapsed},getBookmark:function(){var a,d,b=dojo.doc.selection,c=dijit._curFocus;if(dojo.global.getSelection){if(b=dojo.global.getSelection())if(b.isCollapsed){if(a=c?c.tagName:""){a=a.toLowerCase();if(a=="textarea"||
a=="input"&&(!c.type||c.type.toLowerCase()=="text")){b={start:c.selectionStart,end:c.selectionEnd,node:c,pRange:true};return{isCollapsed:b.end<=b.start,mark:b}}}a={isCollapsed:true}}else{d=b.getRangeAt(0);a={isCollapsed:false,mark:d.cloneRange()}}}else if(b){a=c?c.tagName:"";a=a.toLowerCase();if(c&&a&&(a=="button"||a=="textarea"||a=="input"))if(b.type&&b.type.toLowerCase()=="none")return{isCollapsed:true,mark:null};else{d=b.createRange();return{isCollapsed:d.text&&d.text.length?false:true,mark:{range:d,
pRange:true}}}a={};try{d=b.createRange();a.isCollapsed=!(b.type=="Text"?d.htmlText.length:d.length)}catch(e){a.isCollapsed=true;return a}if(b.type.toUpperCase()=="CONTROL")if(d.length){a.mark=[];b=0;for(c=d.length;b<c;)a.mark.push(d.item(b++))}else{a.isCollapsed=true;a.mark=null}else a.mark=d.getBookmark()}else console.warn("No idea how to store the current selection for this browser!");return a},moveToBookmark:function(a){var d=dojo.doc;if(a=a.mark)if(dojo.global.getSelection){var b=dojo.global.getSelection();
if(b&&b.removeAllRanges)if(a.pRange){b=a.node;b.selectionStart=a.start;b.selectionEnd=a.end}else{b.removeAllRanges();b.addRange(a)}else console.warn("No idea how to restore selection for this browser!")}else if(d.selection&&a){var c;if(a.pRange)c=a.range;else if(dojo.isArray(a)){c=d.body.createControlRange();dojo.forEach(a,function(e){c.addElement(e)})}else{c=d.body.createTextRange();c.moveToBookmark(a)}c.select()}},getFocus:function(a,d){var b=!dijit._curFocus||a&&dojo.isDescendant(dijit._curFocus,
a.domNode)?dijit._prevFocus:dijit._curFocus;return{node:b,bookmark:b==dijit._curFocus&&dojo.withGlobal(d||dojo.global,dijit.getBookmark),openedForWindow:d}},focus:function(a){if(a){var d="node"in a?a.node:a,b=a.bookmark;a=a.openedForWindow;var c=b?b.isCollapsed:false;if(d){var e=d.tagName.toLowerCase()=="iframe"?d.contentWindow:d;if(e&&e.focus)try{e.focus()}catch(g){}dijit._onFocusNode(d)}if(b&&dojo.withGlobal(a||dojo.global,dijit.isCollapsed)&&!c){a&&a.focus();try{dojo.withGlobal(a||dojo.global,
dijit.moveToBookmark,null,[b])}catch(h){}}}},_activeStack:[],registerIframe:function(a){return dijit.registerWin(a.contentWindow,a)},unregisterIframe:function(a){dijit.unregisterWin(a)},registerWin:function(a,d){var b=function(f){dijit._justMouseDowned=true;setTimeout(function(){dijit._justMouseDowned=false},0);dojo.isIE&&f&&f.srcElement&&f.srcElement.parentNode==null||dijit._onTouchNode(d||f.target||f.srcElement,"mouse")},c=dojo.isIE?a.document.documentElement:a.document;if(c)if(dojo.isIE){a.document.body.attachEvent("onmousedown",
b);var e=function(f){f.srcElement.tagName.toLowerCase()!="#document"&&dijit.isTabNavigable(f.srcElement)?dijit._onFocusNode(d||f.srcElement):dijit._onTouchNode(d||f.srcElement)};c.attachEvent("onactivate",e);var g=function(f){dijit._onBlurNode(d||f.srcElement)};c.attachEvent("ondeactivate",g);return function(){a.document.detachEvent("onmousedown",b);c.detachEvent("onactivate",e);c.detachEvent("ondeactivate",g);c=null}}else{c.body.addEventListener("mousedown",b,true);var h=function(f){dijit._onFocusNode(d||
f.target)};c.addEventListener("focus",h,true);var i=function(f){dijit._onBlurNode(d||f.target)};c.addEventListener("blur",i,true);return function(){c.body.removeEventListener("mousedown",b,true);c.removeEventListener("focus",h,true);c.removeEventListener("blur",i,true);c=null}}},unregisterWin:function(a){a&&a()},_onBlurNode:function(){dijit._prevFocus=dijit._curFocus;dijit._curFocus=null;if(!dijit._justMouseDowned){dijit._clearActiveWidgetsTimer&&clearTimeout(dijit._clearActiveWidgetsTimer);dijit._clearActiveWidgetsTimer=
setTimeout(function(){delete dijit._clearActiveWidgetsTimer;dijit._setStack([]);dijit._prevFocus=null},100)}},_onTouchNode:function(a,d){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);delete dijit._clearActiveWidgetsTimer}var b=[];try{for(;a;){var c=dojo.attr(a,"dijitPopupParent");if(c)a=dijit.byId(c).domNode;else if(a.tagName&&a.tagName.toLowerCase()=="body"){if(a===dojo.body())break;a=dojo.window.get(a.ownerDocument).frameElement}else{var e=a.getAttribute&&a.getAttribute("widgetId"),
g=e&&dijit.byId(e);g&&!(d=="mouse"&&g.get("disabled"))&&b.unshift(e);a=a.parentNode}}}catch(h){}dijit._setStack(b,d)},_onFocusNode:function(a){if(a)if(a.nodeType!=9){dijit._onTouchNode(a);if(a!=dijit._curFocus){if(dijit._curFocus)dijit._prevFocus=dijit._curFocus;dijit._curFocus=a;dojo.publish("focusNode",[a])}}},_setStack:function(a,d){var b=dijit._activeStack;dijit._activeStack=a;for(var c=0;c<Math.min(b.length,a.length);c++)if(b[c]!=a[c])break;for(var e,g=b.length-1;g>=c;g--)if(e=dijit.byId(b[g])){e._focused=
false;e.set("focused",false);e._hasBeenBlurred=true;e._onBlur&&e._onBlur(d);dojo.publish("widgetBlur",[e,d])}for(g=c;g<a.length;g++)if(e=dijit.byId(a[g])){e._focused=true;e.set("focused",true);e._onFocus&&e._onFocus(d);dojo.publish("widgetFocus",[e,d])}}});dojo.addOnLoad(function(){var a=dijit.registerWin(window);dojo.isIE&&dojo.addOnWindowUnload(function(){dijit.unregisterWin(a);a=null})})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.place"]){dojo._hasResource["dijit._base.place"]=true;dojo.provide("dijit._base.place");dojo.require("dojo.window");dojo.require("dojo.AdapterRegistry");dijit.getViewport=function(){return dojo.window.getBox()};dijit.placeOnScreen=function(c,a,b,f){b=dojo.map(b,function(d){var e={corner:d,pos:{x:a.x,y:a.y}};if(f){e.pos.x+=d.charAt(1)=="L"?f.x:-f.x;e.pos.y+=d.charAt(0)=="T"?f.y:-f.y}return e});return dijit._place(c,b)};dijit._place=function(c,a,b,f){var d=dojo.window.getBox();
if(!c.parentNode||String(c.parentNode.tagName).toLowerCase()!="body")dojo.body().appendChild(c);var e=null;dojo.some(a,function(k){var h=k.corner,g=k.pos,j=0,p={w:h.charAt(1)=="L"?d.l+d.w-g.x:g.x-d.l,h:h.charAt(1)=="T"?d.t+d.h-g.y:g.y-d.t};if(b){j=b(c,k.aroundCorner,h,p,f);j=typeof j=="undefined"?0:j}var i=c.style,n=i.display,l=i.visibility;i.visibility="hidden";i.display="";var m=dojo.marginBox(c);i.display=n;i.visibility=l;i=Math.max(d.l,h.charAt(1)=="L"?g.x:g.x-m.w);n=Math.max(d.t,h.charAt(0)==
"T"?g.y:g.y-m.h);l=Math.min(d.l+d.w,h.charAt(1)=="L"?i+m.w:g.x);g=Math.min(d.t+d.h,h.charAt(0)=="T"?n+m.h:g.y);l=l-i;g=g-n;j+=m.w-l+(m.h-g);if(e==null||j<e.overflow)e={corner:h,aroundCorner:k.aroundCorner,x:i,y:n,w:l,h:g,overflow:j,spaceAvailable:p};return!j});e.overflow&&b&&b(c,e.aroundCorner,e.corner,e.spaceAvailable,f);a=dojo._isBodyLtr();var o=c.style;o.top=e.y+"px";o[a?"left":"right"]=(a?e.x:d.w-e.x-e.w)+"px";return e};dijit.placeOnScreenAroundNode=function(c,a,b,f){a=dojo.byId(a);a=dojo.position(a,
true);return dijit._placeOnScreenAroundRect(c,a.x,a.y,a.w,a.h,b,f)};dijit.placeOnScreenAroundRectangle=function(c,a,b,f){return dijit._placeOnScreenAroundRect(c,a.x,a.y,a.width,a.height,b,f)};dijit._placeOnScreenAroundRect=function(c,a,b,f,d,e,o){var k=[],h;for(h in e)k.push({aroundCorner:h,corner:e[h],pos:{x:a+(h.charAt(1)=="L"?0:f),y:b+(h.charAt(0)=="T"?0:d)}});return dijit._place(c,k,o,{w:f,h:d})};dijit.placementRegistry=new dojo.AdapterRegistry;dijit.placementRegistry.register("node",function(c,
a){return typeof a=="object"&&typeof a.offsetWidth!="undefined"&&typeof a.offsetHeight!="undefined"},dijit.placeOnScreenAroundNode);dijit.placementRegistry.register("rect",function(c,a){return typeof a=="object"&&"x"in a&&"y"in a&&"width"in a&&"height"in a},dijit.placeOnScreenAroundRectangle);dijit.placeOnScreenAroundElement=function(){return dijit.placementRegistry.match.apply(dijit.placementRegistry,arguments)};dijit.getPopupAroundAlignment=function(c,a){var b={};dojo.forEach(c,function(f){switch(f){case "after":b[a?
"BR":"BL"]=a?"BL":"BR";break;case "before":b[a?"BL":"BR"]=a?"BR":"BL";break;case "below-alt":a=!a;case "below":b[a?"BL":"BR"]=a?"TL":"TR";b[a?"BR":"BL"]=a?"TR":"TL";break;case "above-alt":a=!a;default:b[a?"TL":"TR"]=a?"BL":"BR";b[a?"TR":"TL"]=a?"BR":"BL"}});return b}};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._WidgetBase"]){dojo._hasResource["dijit._WidgetBase"]=true;dojo.provide("dijit._WidgetBase");dojo.require("dijit._base.manager");dojo.require("dojo.Stateful");(function(){dojo.declare("dijit._WidgetBase",dojo.Stateful,{id:"",lang:"",dir:"","class":"",style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},_blankGif:(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif")).toString(),
postscript:function(a,b){this.create(a,b)},create:function(a,b){this.srcNodeRef=dojo.byId(b);this._connects=[];this._subscribes=[];if(this.srcNodeRef&&typeof this.srcNodeRef.id=="string")this.id=this.srcNodeRef.id;if(a){this.params=a;dojo._mixin(this,a)}this.postMixInProperties();if(!this.id)this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"));dijit.registry.add(this);this.buildRendering();if(this.domNode){this._applyAttributes();var c=this.srcNodeRef;c&&c.parentNode&&this.domNode!==c&&
c.parentNode.replaceChild(this.domNode,c)}this.domNode&&this.domNode.setAttribute("widgetId",this.id);this.postCreate();this.srcNodeRef&&!this.srcNodeRef.parentNode&&delete this.srcNodeRef;this._created=true},_applyAttributes:function(){var a=function(c,d){if(d.params&&c in d.params||d[c])d.set(c,d[c])},b;for(b in this.attributeMap)a(b,this);dojo.forEach(this._getSetterAttributes(),function(c){c in this.attributeMap||a(c,this)},this)},_getSetterAttributes:function(){var a=this.constructor;if(!a._setterAttrs){var b=
a._setterAttrs=[],c,d=a.prototype,e;for(e in d)if(dojo.isFunction(d[e])&&(c=e.match(/^_set([a-zA-Z]*)Attr$/))&&c[1])b.push(c[1].charAt(0).toLowerCase()+c[1].substr(1))}return a._setterAttrs},postMixInProperties:function(){},buildRendering:function(){if(!this.domNode)this.domNode=this.srcNodeRef||dojo.create("div");if(this.baseClass){var a=this.baseClass.split(" ");this.isLeftToRight()||(a=a.concat(dojo.map(a,function(b){return b+"Rtl"})));dojo.addClass(this.domNode,a)}},postCreate:function(){},startup:function(){this._started=
true},destroyRecursive:function(a){this._beingDestroyed=true;this.destroyDescendants(a);this.destroy(a)},destroy:function(a){this._beingDestroyed=true;this.uninitialize();var b=dojo,c=b.forEach,d=b.unsubscribe;c(this._connects,function(e){c(e,b.disconnect)});c(this._subscribes,function(e){d(e)});c(this._supportingWidgets||[],function(e){if(e.destroyRecursive)e.destroyRecursive();else e.destroy&&e.destroy()});this.destroyRendering(a);dijit.registry.remove(this.id);this._destroyed=true},destroyRendering:function(a){if(this.bgIframe){this.bgIframe.destroy(a);
delete this.bgIframe}if(this.domNode){a?dojo.removeAttr(this.domNode,"widgetId"):dojo.destroy(this.domNode);delete this.domNode}if(this.srcNodeRef){a||dojo.destroy(this.srcNodeRef);delete this.srcNodeRef}},destroyDescendants:function(a){dojo.forEach(this.getChildren(),function(b){b.destroyRecursive&&b.destroyRecursive(a)})},uninitialize:function(){return false},_setClassAttr:function(a){dojo.replaceClass(this[this.attributeMap["class"]||"domNode"],a,this["class"]);this._set("class",a)},_setStyleAttr:function(a){var b=
this[this.attributeMap.style||"domNode"];if(dojo.isObject(a))dojo.style(b,a);else if(b.style.cssText)b.style.cssText+="; "+a;else b.style.cssText=a;this._set("style",a)},_attrToDom:function(a,b){var c=this.attributeMap[a];dojo.forEach(dojo.isArray(c)?c:[c],function(d){var e=this[d.node||d||"domNode"];switch(d.type||"attribute"){case "attribute":if(dojo.isFunction(b))b=dojo.hitch(this,b);d=d.attribute?d.attribute:/^on[A-Z][a-zA-Z]*$/.test(a)?a.toLowerCase():a;dojo.attr(e,d,b);break;case "innerText":e.innerHTML=
"";e.appendChild(dojo.doc.createTextNode(b));break;case "innerHTML":e.innerHTML=b;break;case "class":dojo.replaceClass(e,b,this[a])}},this)},get:function(a){var b=this._getAttrNames(a);return this[b.g]?this[b.g]():this[a]},set:function(a,b){if(typeof a==="object"){for(var c in a)this.set(c,a[c]);return this}c=this._getAttrNames(a);if(this[c.s])var d=this[c.s].apply(this,Array.prototype.slice.call(arguments,1));else{a in this.attributeMap&&this._attrToDom(a,b);this._set(a,b)}return d||this},_attrPairNames:{},
_getAttrNames:function(a){var b=this._attrPairNames;if(b[a])return b[a];var c=a.charAt(0).toUpperCase()+a.substr(1);return b[a]={n:a+"Node",s:"_set"+c+"Attr",g:"_get"+c+"Attr"}},_set:function(a,b){var c=this[a];this[a]=b;this._watchCallbacks&&this._created&&b!==c&&this._watchCallbacks(a,c,b)},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"},getDescendants:function(){return this.containerNode?dojo.query("[widgetId]",this.containerNode).map(dijit.byNode):[]},getChildren:function(){return this.containerNode?
dijit.findWidgets(this.containerNode):[]},connect:function(a,b,c){a=[dojo._connect(a,b,this,c)];this._connects.push(a);return a},disconnect:function(a){for(var b=0;b<this._connects.length;b++)if(this._connects[b]==a){dojo.forEach(a,dojo.disconnect);this._connects.splice(b,1);break}},subscribe:function(a,b){var c=dojo.subscribe(a,this,b);this._subscribes.push(c);return c},unsubscribe:function(a){for(var b=0;b<this._subscribes.length;b++)if(this._subscribes[b]==a){dojo.unsubscribe(a);this._subscribes.splice(b,
1);break}},isLeftToRight:function(){return this.dir?this.dir=="ltr":dojo._isBodyLtr()},placeAt:function(a,b){a.declaredClass&&a.addChild?a.addChild(this,b):dojo.place(this.domNode,a,b);return this}})})()};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base.popup"]){dojo._hasResource["dijit._base.popup"]=true;dojo.provide("dijit._base.popup");dojo.require("dijit._base.focus");dojo.require("dijit._base.place");dojo.require("dijit._base.window");dijit.popup={_stack:[],_beginZIndex:1E3,_idGen:1,_createWrapper:function(a){var b=a.declaredClass?a._popupWrapper:dojo.hasClass(a.parentNode,"dijitPopup")&&a.parentNode,c=a.domNode||a;if(!b){b=dojo.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},
dojo.body());b.appendChild(c);c=c.style;c.display="";c.visibility="";c.position="";c.top="0px";if(a.declaredClass){a._popupWrapper=b;dojo.connect(a,"destroy",function(){dojo.destroy(b);delete a._popupWrapper})}}return b},moveOffScreen:function(a){a=this._createWrapper(a);dojo.style(a,{visibility:"hidden",top:"-9999px",display:""})},hide:function(a){a=this._createWrapper(a);dojo.style(a,"display","none")},getTopPopup:function(){for(var a=this._stack,b=a.length-1;b>0&&a[b].parent===a[b-1].widget;b--);
return a[b]},open:function(a){for(var b=this._stack,c=a.popup,d=a.orient||((a.parent?a.parent.isLeftToRight():dojo._isBodyLtr())?{BL:"TL",BR:"TR",TL:"BL",TR:"BR"}:{BR:"TR",BL:"TL",TR:"BR",TL:"BL"}),f=a.around,h=a.around&&a.around.id?a.around.id+"_dropdown":"popup_"+this._idGen++;b.length&&(!a.parent||!dojo.isDescendant(a.parent.domNode,b[b.length-1].widget.domNode));)dijit.popup.close(b[b.length-1].widget);var g=this._createWrapper(c);dojo.attr(g,{id:h,style:{zIndex:this._beginZIndex+b.length},"class":"dijitPopup "+
(c.baseClass||c["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:a.parent?a.parent.id:""});if(dojo.isIE||dojo.isMoz)if(!c.bgIframe)c.bgIframe=new dijit.BackgroundIframe(g);d=f?dijit.placeOnScreenAroundElement(g,f,d,c.orient?dojo.hitch(c,"orient"):null):dijit.placeOnScreen(g,a,d=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],a.padding);g.style.display="";g.style.visibility="visible";c.domNode.style.visibility="visible";f=[];f.push(dojo.connect(g,"onkeypress",this,function(e){if(e.charOrCode==
dojo.keys.ESCAPE&&a.onCancel){dojo.stopEvent(e);a.onCancel()}else if(e.charOrCode===dojo.keys.TAB){dojo.stopEvent(e);(e=this.getTopPopup())&&e.onCancel&&e.onCancel()}}));c.onCancel&&f.push(dojo.connect(c,"onCancel",a.onCancel));f.push(dojo.connect(c,c.onExecute?"onExecute":"onChange",this,function(){var e=this.getTopPopup();e&&e.onExecute&&e.onExecute()}));b.push({widget:c,parent:a.parent,onExecute:a.onExecute,onCancel:a.onCancel,onClose:a.onClose,handlers:f});c.onOpen&&c.onOpen(d);return d},close:function(a){for(var b=
this._stack;a&&dojo.some(b,function(h){return h.widget==a})||!a&&b.length;){var c=b.pop(),d=c.widget,f=c.onClose;d.onClose&&d.onClose();dojo.forEach(c.handlers,dojo.disconnect);d&&d.domNode&&this.hide(d);f&&f()}}};dijit._frames=new function(){var a=[];this.pop=function(){var b;if(a.length){b=a.pop();b.style.display=""}else{if(dojo.isIE<9){b="<iframe src='"+(dojo.config.dojoBlankHtmlUrl||dojo.moduleUrl("dojo","resources/blank.html")+""||'javascript:""')+"' style='position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity=\"0\");'>";
b=dojo.doc.createElement(b)}else{b=dojo.create("iframe");b.src='javascript:""';b.className="dijitBackgroundIframe";dojo.style(b,"opacity",0.1)}b.tabIndex=-1;dijit.setWaiRole(b,"presentation")}return b};this.push=function(b){b.style.display="none";a.push(b)}};dijit.BackgroundIframe=function(a){if(!a.id)throw Error("no id");if(dojo.isIE||dojo.isMoz){var b=this.iframe=dijit._frames.pop();a.appendChild(b);if(dojo.isIE<7||dojo.isQuirks){this.resize(a);this._conn=dojo.connect(a,"onresize",this,function(){this.resize(a)})}else dojo.style(b,
{width:"100%",height:"100%"})}};dojo.extend(dijit.BackgroundIframe,{resize:function(a){this.iframe&&dojo.style(this.iframe,{width:a.offsetWidth+"px",height:a.offsetHeight+"px"})},destroy:function(){if(this._conn){dojo.disconnect(this._conn);this._conn=null}if(this.iframe){dijit._frames.push(this.iframe);delete this.iframe}}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._base"]){dojo._hasResource["dijit._base"]=true;dojo.provide("dijit._base");dojo.require("dijit._base.focus");dojo.require("dijit._base.manager");dojo.require("dijit._base.place");dojo.require("dijit._base.popup");dojo.require("dijit._base.scroll");dojo.require("dijit._base.sniff");dojo.require("dijit._base.typematic");dojo.require("dijit._base.wai");dojo.require("dijit._base.window")};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._Widget"]){dojo._hasResource["dijit._Widget"]=true;dojo.provide("dijit._Widget");dojo.require("dijit._WidgetBase");dojo.require("dijit._base");dojo.connect(dojo,"_connect",function(a,c){a&&dojo.isFunction(a._onConnect)&&a._onConnect(c)});dijit._connectOnUseEventHandler=function(){};dijit._lastKeyDownNode=null;dojo.isIE?function(){var a=function(c){dijit._lastKeyDownNode=c.srcElement};dojo.doc.attachEvent("onkeydown",a);dojo.addOnWindowUnload(function(){dojo.doc.detachEvent("onkeydown",
a)})}():dojo.doc.addEventListener("keydown",function(a){dijit._lastKeyDownNode=a.target},true);(function(){dojo.declare("dijit._Widget",dijit._WidgetBase,{_deferredConnects:{onClick:"",onDblClick:"",onKeyDown:"",onKeyPress:"",onKeyUp:"",onMouseMove:"",onMouseDown:"",onMouseOut:"",onMouseOver:"",onMouseLeave:"",onMouseEnter:"",onMouseUp:""},onClick:dijit._connectOnUseEventHandler,onDblClick:dijit._connectOnUseEventHandler,onKeyDown:dijit._connectOnUseEventHandler,onKeyPress:dijit._connectOnUseEventHandler,
onKeyUp:dijit._connectOnUseEventHandler,onMouseDown:dijit._connectOnUseEventHandler,onMouseMove:dijit._connectOnUseEventHandler,onMouseOut:dijit._connectOnUseEventHandler,onMouseOver:dijit._connectOnUseEventHandler,onMouseLeave:dijit._connectOnUseEventHandler,onMouseEnter:dijit._connectOnUseEventHandler,onMouseUp:dijit._connectOnUseEventHandler,create:function(){this._deferredConnects=dojo.clone(this._deferredConnects);for(var a in this.attributeMap)delete this._deferredConnects[a];for(a in this._deferredConnects)this[a]!==
dijit._connectOnUseEventHandler&&delete this._deferredConnects[a];this.inherited(arguments);if(this.domNode)for(a in this.params)this._onConnect(a)},_onConnect:function(a){if(a in this._deferredConnects){this.connect(this[this._deferredConnects[a]||"domNode"],a.toLowerCase(),a);delete this._deferredConnects[a]}},focused:false,isFocusable:function(){return this.focus&&dojo.style(this.domNode,"display")!="none"},onFocus:function(){},onBlur:function(){},_onFocus:function(){this.onFocus()},_onBlur:function(){this.onBlur()},
setAttribute:function(a,c){dojo.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");this.set(a,c)},attr:function(a){if(dojo.config.isDebug){var c=arguments.callee._ach||(arguments.callee._ach={}),e=(arguments.callee.caller||"unknown caller").toString();if(!c[e]){dojo.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+e,"","2.0");c[e]=true}}return arguments.length>=2||typeof a==="object"?this.set.apply(this,
arguments):this.get(a)},nodesWithKeyClick:["input","button"],connect:function(a,c,e){var d=dojo,f=d._connect,g=this.inherited(arguments,[a,c=="ondijitclick"?"onclick":c,e]);if(c=="ondijitclick")if(d.indexOf(this.nodesWithKeyClick,a.nodeName.toLowerCase())==-1){var h=d.hitch(this,e);g.push(f(a,"onkeydown",this,function(b){if((b.keyCode==d.keys.ENTER||b.keyCode==d.keys.SPACE)&&!b.ctrlKey&&!b.shiftKey&&!b.altKey&&!b.metaKey){dijit._lastKeyDownNode=b.target;"openDropDown"in this&&a==this._buttonNode||
b.preventDefault()}}),f(a,"onkeyup",this,function(b){if((b.keyCode==d.keys.ENTER||b.keyCode==d.keys.SPACE)&&b.target==dijit._lastKeyDownNode&&!b.ctrlKey&&!b.shiftKey&&!b.altKey&&!b.metaKey){dijit._lastKeyDownNode=null;return h(b)}}))}return g},_onShow:function(){this.onShow()},onShow:function(){},onHide:function(){},onClose:function(){return true}})})()};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._HasDropDown"]){dojo._hasResource["dijit._HasDropDown"]=true;dojo.provide("dijit._HasDropDown");dojo.require("dijit._Widget");dojo.declare("dijit._HasDropDown",null,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(){if(!(this.disabled||this.readOnly)){this._docHandler=this.connect(dojo.doc,"onmouseup",
"_onDropDownMouseUp");this.toggleDropDown()}},_onDropDownMouseUp:function(a){a&&this._docHandler&&this.disconnect(this._docHandler);var c=this.dropDown,f=false;if(a&&this._opened){var b=dojo.position(this._buttonNode,true);if(!(a.pageX>=b.x&&a.pageX<=b.x+b.w)||!(a.pageY>=b.y&&a.pageY<=b.y+b.h)){for(b=a.target;b&&!f;)if(dojo.hasClass(b,"dijitPopup"))f=true;else b=b.parentNode;if(f){b=a.target;if(c.onItemClick){for(var d;b&&!(d=dijit.byNode(b));)b=b.parentNode;d&&d.onClick&&d.getParent&&d.getParent().onItemClick(d,
a)}return}}}this._opened&&c.focus&&c.autoFocus!==false&&window.setTimeout(dojo.hitch(c,"focus"),1)},_onDropDownClick:function(a){this._stopClickEvents&&dojo.stopEvent(a)},buildRendering:function(){this.inherited(arguments);this._buttonNode=this._buttonNode||this.focusNode||this.domNode;this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;var a={after:this.isLeftToRight()?"Right":"Left",before:this.isLeftToRight()?"Left":"Right",above:"Up",below:"Down",left:"Left",right:"Right"}[this.dropDownPosition[0]]||
this.dropDownPosition[0]||"Down";dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+a+"ArrowButton")},postCreate:function(){this.inherited(arguments);this.connect(this._buttonNode,"onmousedown","_onDropDownMouseDown");this.connect(this._buttonNode,"onclick","_onDropDownClick");this.connect(this.focusNode,"onkeypress","_onKey")},destroy:function(){if(this.dropDown){this.dropDown._destroyed||this.dropDown.destroyRecursive();delete this.dropDown}this.inherited(arguments)},_onKey:function(a){if(!(this.disabled||
this.readOnly)){var c=this.dropDown,f=a.target;if(c&&this._opened&&c.handleKey)if(c.handleKey(a)===false){dojo.stopEvent(a);return}if(c&&this._opened&&a.charOrCode==dojo.keys.ESCAPE){this.closeDropDown();dojo.stopEvent(a)}else if(!this._opened&&(a.charOrCode==dojo.keys.DOWN_ARROW||(a.charOrCode==dojo.keys.ENTER||a.charOrCode==" ")&&((f.tagName||"").toLowerCase()!=="input"||f.type&&f.type.toLowerCase()!=="text"))){this.toggleDropDown();(c=this.dropDown)&&c.focus&&setTimeout(dojo.hitch(c,"focus"),1);
dojo.stopEvent(a)}}},_onBlur:function(){this.closeDropDown(dijit._curFocus&&this.dropDown&&dojo.isDescendant(dijit._curFocus,this.dropDown.domNode));this.inherited(arguments)},isLoaded:function(){return true},loadDropDown:function(a){a()},toggleDropDown:function(){if(!(this.disabled||this.readOnly))if(this._opened)this.closeDropDown();else this.isLoaded()?this.openDropDown():this.loadDropDown(dojo.hitch(this,"openDropDown"))},openDropDown:function(){var a=this.dropDown,c=a.domNode,f=this._aroundNode||
this.domNode,b=this;if(!this._preparedNode){this._preparedNode=true;if(c.style.width)this._explicitDDWidth=true;if(c.style.height)this._explicitDDHeight=true}if(this.maxHeight||this.forceWidth||this.autoWidth){var d={display:"",visibility:"hidden"};if(!this._explicitDDWidth)d.width="";if(!this._explicitDDHeight)d.height="";dojo.style(c,d);d=this.maxHeight;if(d==-1){d=dojo.window.getBox();var e=dojo.position(f,false);d=Math.floor(Math.max(e.y,d.h-(e.y+e.h)))}a.startup&&!a._started&&a.startup();dijit.popup.moveOffScreen(a);
e=dojo._getMarginSize(c);var g=d&&e.h>d;dojo.style(c,{overflowX:"hidden",overflowY:g?"auto":"hidden"});if(g){e.h=d;if("w"in e)e.w+=16}else delete e.h;if(this.forceWidth)e.w=f.offsetWidth;else if(this.autoWidth)e.w=Math.max(e.w,f.offsetWidth);else delete e.w;dojo.isFunction(a.resize)?a.resize(e):dojo.marginBox(c,e)}a=dijit.popup.open({parent:this,popup:a,around:f,orient:dijit.getPopupAroundAlignment(this.dropDownPosition&&this.dropDownPosition.length?this.dropDownPosition:["below"],this.isLeftToRight()),
onExecute:function(){b.closeDropDown(true)},onCancel:function(){b.closeDropDown(true)},onClose:function(){dojo.attr(b._popupStateNode,"popupActive",false);dojo.removeClass(b._popupStateNode,"dijitHasDropDownOpen");b._opened=false}});dojo.attr(this._popupStateNode,"popupActive","true");dojo.addClass(b._popupStateNode,"dijitHasDropDownOpen");this._opened=true;return a},closeDropDown:function(a){if(this._opened){a&&this.focus();dijit.popup.close(this.dropDown);this._opened=false}}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit._Templated"]){dojo._hasResource["dijit._Templated"]=true;dojo.provide("dijit._Templated");dojo.require("dijit._Widget");dojo.require("dojo.string");dojo.require("dojo.parser");dojo.require("dojo.cache");dojo.declare("dijit._Templated",null,{templateString:null,templatePath:null,widgetsInTemplate:false,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){this._attachPoints=[];this._attachEvents=[]},_stringRepl:function(b){var a=this.declaredClass,f=
this;return dojo.string.substitute(b,this,function(e,d){if(d.charAt(0)=="!")e=dojo.getObject(d.substr(1),false,f);if(typeof e=="undefined")throw Error(a+" template:"+d);if(e==null)return"";return d.charAt(0)=="!"?e:e.toString().replace(/"/g,"&quot;")},this)},buildRendering:function(){var b=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache),a;if(dojo.isString(b)){a=dojo._toDom(this._stringRepl(b));if(a.nodeType!=1)throw Error("Invalid template: "+b);}else a=
b.cloneNode(true);this.domNode=a;this.inherited(arguments);this._attachTemplateNodes(a);if(this.widgetsInTemplate){b=this._startupWidgets=dojo.parser.parse(a,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang},propsThis:this,scope:"dojo"});this._supportingWidgets=dijit.findWidgets(a);this._attachTemplateNodes(b,function(f,e){return f[e]})}this._fillContent(this.srcNodeRef)},_fillContent:function(b){var a=this.containerNode;if(b&&a)for(;b.hasChildNodes();)a.appendChild(b.firstChild)},
_attachTemplateNodes:function(b,a){a=a||function(g,k){return g.getAttribute(k)};for(var f=dojo.isArray(b)?b:b.all||b.getElementsByTagName("*"),e=dojo.isArray(b)?0:-1;e<f.length;e++){var d=e==-1?b:f[e];if(!(this.widgetsInTemplate&&(a(d,"dojoType")||a(d,"data-dojo-type")))){var c=a(d,"dojoAttachPoint")||a(d,"data-dojo-attach-point");if(c)for(var i=c.split(/\s*,\s*/);c=i.shift();){if(dojo.isArray(this[c]))this[c].push(d);else this[c]=d;this._attachPoints.push(c)}if(c=a(d,"dojoAttachEvent")||a(d,"data-dojo-attach-event")){i=
c.split(/\s*,\s*/);for(var j=dojo.trim;c=i.shift();)if(c){var h=null;if(c.indexOf(":")!=-1){h=c.split(":");c=j(h[0]);h=j(h[1])}else c=j(c);h||(h=c);this._attachEvents.push(this.connect(d,c,h))}}(c=a(d,"waiRole"))&&dijit.setWaiRole(d,c);(c=a(d,"waiState"))&&dojo.forEach(c.split(/\s*,\s*/),function(g){if(g.indexOf("-")!=-1){g=g.split("-");dijit.setWaiState(d,g[0],g[1])}})}}},startup:function(){dojo.forEach(this._startupWidgets,function(b){b&&!b._started&&b.startup&&b.startup()});this.inherited(arguments)},
destroyRendering:function(){dojo.forEach(this._attachPoints,function(b){delete this[b]},this);this._attachPoints=[];dojo.forEach(this._attachEvents,this.disconnect,this);this._attachEvents=[];this.inherited(arguments)}});dijit._Templated._templateCache={};dijit._Templated.getCachedTemplate=function(b,a,f){var e=dijit._Templated._templateCache,d=a||b,c=e[d];if(c){try{if(!c.ownerDocument||c.ownerDocument==dojo.doc)return c}catch(i){}dojo.destroy(c)}a||(a=dojo.cache(b,{sanitize:true}));a=dojo.string.trim(a);
if(f||a.match(/\$\{([^\}]+)\}/g))return e[d]=a;else{b=dojo._toDom(a);if(b.nodeType!=1)throw Error("Invalid template: "+a);return e[d]=b}};dojo.isIE&&dojo.addOnWindowUnload(function(){var b=dijit._Templated._templateCache,a;for(a in b){var f=b[a];typeof f=="object"&&dojo.destroy(f);delete b[a]}});dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.MenuSeparator"]){dojo._hasResource["dijit.MenuSeparator"]=true;dojo.provide("dijit.MenuSeparator");dojo.require("dijit._Widget");dojo.require("dijit._Templated");dojo.require("dijit._Contained");dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:dojo.cache("dijit","templates/MenuSeparator.html",'<tr class="dijitMenuSeparator">\n\t<td class="dijitMenuSeparatorIconCell">\n\t\t<div class="dijitMenuSeparatorTop"></div>\n\t\t<div class="dijitMenuSeparatorBottom"></div>\n\t</td>\n\t<td colspan="3" class="dijitMenuSeparatorLabelCell">\n\t\t<div class="dijitMenuSeparatorTop dijitMenuSeparatorLabel"></div>\n\t\t<div class="dijitMenuSeparatorBottom"></div>\n\t</td>\n</tr>\n'),
buildRendering:function(){this.inherited(arguments);dojo.setSelectable(this.domNode,false)},isFocusable:function(){return false}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form._FormWidget"]){dojo._hasResource["dijit.form._FormWidget"]=true;dojo.provide("dijit.form._FormWidget");dojo.require("dojo.window");dojo.require("dijit._Widget");dojo.require("dijit._Templated");dojo.require("dijit._CssStateMixin");dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{name:"",alt:"",value:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,scrollOnFocus:true,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,
{value:"focusNode",id:"focusNode",tabIndex:"focusNode",alt:"focusNode",title:"focusNode"}),postMixInProperties:function(){this.nameAttrSetting=this.name?'name="'+this.name.replace(/'/g,"&quot;")+'"':"";this.inherited(arguments)},postCreate:function(){this.inherited(arguments);this.connect(this.domNode,"onmousedown","_onMouseDown")},_setDisabledAttr:function(a){this._set("disabled",a);dojo.attr(this.focusNode,"disabled",a);this.valueNode&&dojo.attr(this.valueNode,"disabled",a);dijit.setWaiState(this.focusNode,
"disabled",a);if(a){this._set("hovering",false);this._set("active",false);a="tabIndex"in this.attributeMap?this.attributeMap.tabIndex:"focusNode";dojo.forEach(dojo.isArray(a)?a:[a],function(b){b=this[b];dojo.isWebKit||dijit.hasDefaultTabStop(b)?b.setAttribute("tabIndex","-1"):b.removeAttribute("tabIndex")},this)}else this.tabIndex!=""&&this.focusNode.setAttribute("tabIndex",this.tabIndex)},setDisabled:function(a){dojo.deprecated("setDisabled("+a+") is deprecated. Use set('disabled',"+a+") instead.",
"","2.0");this.set("disabled",a)},_onFocus:function(){this.scrollOnFocus&&dojo.window.scrollIntoView(this.domNode);this.inherited(arguments)},isFocusable:function(){return!this.disabled&&this.focusNode&&dojo.style(this.domNode,"display")!="none"},focus:function(){this.disabled||dijit.focus(this.focusNode)},compare:function(a,b){return typeof a=="number"&&typeof b=="number"?isNaN(a)&&isNaN(b)?0:a-b:a>b?1:a<b?-1:0},onChange:function(){},_onChangeActive:false,_handleOnChange:function(a,b){if(this._lastValueReported==
undefined&&(b===null||!this._onChangeActive))this._resetValue=this._lastValueReported=a;this._pendingOnChange=this._pendingOnChange||typeof a!=typeof this._lastValueReported||this.compare(a,this._lastValueReported)!=0;if((this.intermediateChanges||b||b===undefined)&&this._pendingOnChange){this._lastValueReported=a;this._pendingOnChange=false;if(this._onChangeActive){this._onChangeHandle&&clearTimeout(this._onChangeHandle);this._onChangeHandle=setTimeout(dojo.hitch(this,function(){this._onChangeHandle=
null;this.onChange(a)}),0)}}},create:function(){this.inherited(arguments);this._onChangeActive=true},destroy:function(){if(this._onChangeHandle){clearTimeout(this._onChangeHandle);this.onChange(this._lastValueReported)}this.inherited(arguments)},setValue:function(a){dojo.deprecated("dijit.form._FormWidget:setValue("+a+") is deprecated.  Use set('value',"+a+") instead.","","2.0");this.set("value",a)},getValue:function(){dojo.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.",
"","2.0");return this.get("value")},_onMouseDown:function(a){if(!a.ctrlKey&&dojo.mouseButtons.isLeft(a)&&this.isFocusable())var b=this.connect(dojo.body(),"onmouseup",function(){this.isFocusable()&&this.focus();this.disconnect(b)})}});dojo.declare("dijit.form._FormValueWidget",dijit.form._FormWidget,{readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"",readOnly:"focusNode"}),_setReadOnlyAttr:function(a){dojo.attr(this.focusNode,"readOnly",a);dijit.setWaiState(this.focusNode,
"readonly",a);this._set("readOnly",a)},postCreate:function(){this.inherited(arguments);if(dojo.isIE)this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);if(this._resetValue===undefined)this._lastValueReported=this._resetValue=this.value},_setValueAttr:function(a,b){this._handleOnChange(a,b)},_handleOnChange:function(a){this._set("value",a);this.inherited(arguments)},undo:function(){this._setValueAttr(this._lastValueReported,false)},reset:function(){this._hasBeenBlurred=false;this._setValueAttr(this._resetValue,
true)},_onKeyDown:function(a){if(a.keyCode==dojo.keys.ESCAPE&&!(a.ctrlKey||a.altKey||a.metaKey)){var b;if(dojo.isIE){a.preventDefault();b=document.createEventObject();b.keyCode=dojo.keys.ESCAPE;b.shiftKey=a.shiftKey;a.srcElement.fireEvent("onkeypress",b)}}},_layoutHackIE7:function(){if(dojo.isIE==7)for(var a=this.domNode,b=a.parentNode,c=a.firstChild||a,e=c.style.filter,d=this;b&&b.clientHeight==0;){(function(){var f=d.connect(b,"onscroll",function(){d.disconnect(f);c.style.filter=(new Date).getMilliseconds();
setTimeout(function(){c.style.filter=e},0)})})();b=b.parentNode}}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.MenuItem"]){dojo._hasResource["dijit.MenuItem"]=true;dojo.provide("dijit.MenuItem");dojo.require("dijit._Widget");dojo.require("dijit._Templated");dojo.require("dijit._Contained");dojo.require("dijit._CssStateMixin");dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/MenuItem.html",'<tr class="dijitReset dijitMenuItem" dojoAttachPoint="focusNode" role="menuitem" tabIndex="-1"\n\t\tdojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick">\n\t<td class="dijitReset dijitMenuItemIconCell" role="presentation">\n\t\t<img src="${_blankGif}" alt="" class="dijitIcon dijitMenuItemIcon" dojoAttachPoint="iconNode"/>\n\t</td>\n\t<td class="dijitReset dijitMenuItemLabel" colspan="2" dojoAttachPoint="containerNode"></td>\n\t<td class="dijitReset dijitMenuItemAccelKey" style="display: none" dojoAttachPoint="accelKeyNode"></td>\n\t<td class="dijitReset dijitMenuArrowCell" role="presentation">\n\t\t<div dojoAttachPoint="arrowWrapper" style="visibility: hidden">\n\t\t\t<img src="${_blankGif}" alt="" class="dijitMenuExpand"/>\n\t\t\t<span class="dijitMenuExpandA11y">+</span>\n\t\t</div>\n\t</td>\n</tr>\n'),
attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{label:{node:"containerNode",type:"innerHTML"},iconClass:{node:"iconNode",type:"class"}}),baseClass:"dijitMenuItem",label:"",iconClass:"",accelKey:"",disabled:false,_fillContent:function(a){a&&!("label"in this.params)&&this.set("label",a.innerHTML)},buildRendering:function(){this.inherited(arguments);var a=this.id+"_text";dojo.attr(this.containerNode,"id",a);if(this.accelKeyNode){dojo.attr(this.accelKeyNode,"id",this.id+"_accel");a+=
" "+this.id+"_accel"}dijit.setWaiState(this.domNode,"labelledby",a);dojo.setSelectable(this.domNode,false)},_onHover:function(){this.getParent().onItemHover(this)},_onUnhover:function(){this.getParent().onItemUnhover(this);this._set("hovering",false)},_onClick:function(a){this.getParent().onItemClick(this,a);dojo.stopEvent(a)},onClick:function(){},focus:function(){try{dojo.isIE==8&&this.containerNode.focus();dijit.focus(this.focusNode)}catch(a){}},_onFocus:function(){this._setSelected(true);this.getParent()._onItemFocus(this);
this.inherited(arguments)},_setSelected:function(a){dojo.toggleClass(this.domNode,"dijitMenuItemSelected",a)},setLabel:function(a){dojo.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");this.set("label",a)},setDisabled:function(a){dojo.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");this.set("disabled",a)},_setDisabledAttr:function(a){dijit.setWaiState(this.focusNode,"disabled",a?"true":"false");this._set("disabled",
a)},_setAccelKeyAttr:function(a){this.accelKeyNode.style.display=a?"":"none";this.accelKeyNode.innerHTML=a;dojo.attr(this.containerNode,"colSpan",a?"1":"2");this._set("accelKey",a)}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.CheckedMenuItem"]){dojo._hasResource["dijit.CheckedMenuItem"]=true;dojo.provide("dijit.CheckedMenuItem");dojo.require("dijit.MenuItem");dojo.declare("dijit.CheckedMenuItem",dijit.MenuItem,{templateString:dojo.cache("dijit","templates/CheckedMenuItem.html",'<tr class="dijitReset dijitMenuItem" dojoAttachPoint="focusNode" role="menuitemcheckbox" tabIndex="-1"\n\t\tdojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick">\n\t<td class="dijitReset dijitMenuItemIconCell" role="presentation">\n\t\t<img src="${_blankGif}" alt="" class="dijitMenuItemIcon dijitCheckedMenuItemIcon" dojoAttachPoint="iconNode"/>\n\t\t<span class="dijitCheckedMenuItemIconChar">&#10003;</span>\n\t</td>\n\t<td class="dijitReset dijitMenuItemLabel" colspan="2" dojoAttachPoint="containerNode,labelNode"></td>\n\t<td class="dijitReset dijitMenuItemAccelKey" style="display: none" dojoAttachPoint="accelKeyNode"></td>\n\t<td class="dijitReset dijitMenuArrowCell" role="presentation">&nbsp;</td>\n</tr>\n'),
checked:false,_setCheckedAttr:function(a){dojo.toggleClass(this.domNode,"dijitCheckedMenuItemChecked",a);dijit.setWaiState(this.domNode,"checked",a);this._set("checked",a)},onChange:function(){},_onClick:function(){if(!this.disabled){this.set("checked",!this.checked);this.onChange(this.checked)}this.inherited(arguments)}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.PopupMenuItem"]){dojo._hasResource["dijit.PopupMenuItem"]=true;dojo.provide("dijit.PopupMenuItem");dojo.require("dijit.MenuItem");dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var a=dojo.query("*",this.srcNodeRef);dijit.PopupMenuItem.superclass._fillContent.call(this,a[0]);this.dropDownContainer=this.srcNodeRef}},startup:function(){if(!this._started){this.inherited(arguments);if(!this.popup){var a=dojo.query("[widgetId]",
this.dropDownContainer)[0];this.popup=dijit.byNode(a)}dojo.body().appendChild(this.popup.domNode);this.popup.startup();this.popup.domNode.style.display="none";this.arrowWrapper&&dojo.style(this.arrowWrapper,"visibility","");dijit.setWaiState(this.focusNode,"haspopup","true")}},destroyDescendants:function(){if(this.popup){this.popup._destroyed||this.popup.destroyRecursive();delete this.popup}this.inherited(arguments)}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form.Button"]){dojo._hasResource["dijit.form.Button"]=true;dojo.provide("dijit.form.Button");dojo.require("dijit.form._FormWidget");dojo.require("dijit._Container");dojo.require("dijit._HasDropDown");dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:dojo.cache("dijit.form","templates/Button.html",'<span class="dijit dijitReset dijitInline"\n\t><span class="dijitReset dijitInline dijitButtonNode"\n\t\tdojoAttachEvent="ondijitclick:_onButtonClick"\n\t\t><span class="dijitReset dijitStretch dijitButtonContents"\n\t\t\tdojoAttachPoint="titleNode,focusNode"\n\t\t\trole="button" aria-labelledby="${id}_label"\n\t\t\t><span class="dijitReset dijitInline dijitIcon" dojoAttachPoint="iconNode"></span\n\t\t\t><span class="dijitReset dijitToggleButtonIconChar">&#x25CF;</span\n\t\t\t><span class="dijitReset dijitInline dijitButtonText"\n\t\t\t\tid="${id}_label"\n\t\t\t\tdojoAttachPoint="containerNode"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type="${type}" value="${value}" class="dijitOffScreen"\n\t\tdojoAttachPoint="valueNode"\n/></span>\n'),
attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"valueNode"}),_onClick:function(a){if(this.disabled)return false;this._clicked();return this.onClick(a)},_onButtonClick:function(a){if(this._onClick(a)===false)a.preventDefault();else if(this.type=="submit"&&!(this.valueNode||this.focusNode).form)for(var b=this.domNode;b.parentNode;b=b.parentNode){var c=dijit.byNode(b);if(c&&typeof c._onSubmit=="function"){c._onSubmit(a);break}}else if(this.valueNode){this.valueNode.click();
a.preventDefault()}},buildRendering:function(){this.inherited(arguments);dojo.setSelectable(this.focusNode,false)},_fillContent:function(a){if(a&&(!this.params||!("label"in this.params)))this.set("label",a.innerHTML)},_setShowLabelAttr:function(a){this.containerNode&&dojo.toggleClass(this.containerNode,"dijitDisplayNone",!a);this._set("showLabel",a)},onClick:function(){return true},_clicked:function(){},setLabel:function(a){dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.",
"","2.0");this.set("label",a)},_setLabelAttr:function(a){this._set("label",a);this.containerNode.innerHTML=a;if(this.showLabel==false&&!this.params.title)this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"")},_setIconClassAttr:function(a){dojo.replaceClass(this.iconNode,a||"dijitNoIcon",this.iconClass||"dijitNoIcon");this._set("iconClass",a)}});dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container,dijit._HasDropDown],{baseClass:"dijitDropDownButton",
templateString:dojo.cache("dijit.form","templates/DropDownButton.html",'<span class="dijit dijitReset dijitInline"\n\t><span class=\'dijitReset dijitInline dijitButtonNode\'\n\t\tdojoAttachEvent="ondijitclick:_onButtonClick" dojoAttachPoint="_buttonNode"\n\t\t><span class="dijitReset dijitStretch dijitButtonContents"\n\t\t\tdojoAttachPoint="focusNode,titleNode,_arrowWrapperNode"\n\t\t\trole="button" aria-haspopup="true" aria-labelledby="${id}_label"\n\t\t\t><span class="dijitReset dijitInline dijitIcon"\n\t\t\t\tdojoAttachPoint="iconNode"\n\t\t\t></span\n\t\t\t><span class="dijitReset dijitInline dijitButtonText"\n\t\t\t\tdojoAttachPoint="containerNode,_popupStateNode"\n\t\t\t\tid="${id}_label"\n\t\t\t></span\n\t\t\t><span class="dijitReset dijitInline dijitArrowButtonInner"></span\n\t\t\t><span class="dijitReset dijitInline dijitArrowButtonChar">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type="${type}" value="${value}" class="dijitOffScreen"\n\t\tdojoAttachPoint="valueNode"\n/></span>\n'),
_fillContent:function(){if(this.srcNodeRef){var a=dojo.query("*",this.srcNodeRef);dijit.form.DropDownButton.superclass._fillContent.call(this,a[0]);this.dropDownContainer=this.srcNodeRef}},startup:function(){if(!this._started){if(!this.dropDown&&this.dropDownContainer){var a=dojo.query("[widgetId]",this.dropDownContainer)[0];this.dropDown=dijit.byNode(a);delete this.dropDownContainer}this.dropDown&&dijit.popup.hide(this.dropDown);this.inherited(arguments)}},isLoaded:function(){var a=this.dropDown;
return!!a&&(!a.href||a.isLoaded)},loadDropDown:function(){var a=this.dropDown;if(a)if(this.isLoaded())this.openDropDown();else{var b=dojo.connect(a,"onLoad",this,function(){dojo.disconnect(b);this.openDropDown()});a.refresh()}},isFocusable:function(){return this.inherited(arguments)&&!this._mouseDown}});dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:dojo.cache("dijit.form","templates/ComboButton.html",'<table class="dijit dijitReset dijitInline dijitLeft"\n\tcellspacing=\'0\' cellpadding=\'0\' role="presentation"\n\t><tbody role="presentation"><tr role="presentation"\n\t\t><td class="dijitReset dijitStretch dijitButtonNode" dojoAttachPoint="buttonNode" dojoAttachEvent="ondijitclick:_onButtonClick,onkeypress:_onButtonKeyPress"\n\t\t><div id="${id}_button" class="dijitReset dijitButtonContents"\n\t\t\tdojoAttachPoint="titleNode"\n\t\t\trole="button" aria-labelledby="${id}_label"\n\t\t\t><div class="dijitReset dijitInline dijitIcon" dojoAttachPoint="iconNode" role="presentation"></div\n\t\t\t><div class="dijitReset dijitInline dijitButtonText" id="${id}_label" dojoAttachPoint="containerNode" role="presentation"></div\n\t\t></div\n\t\t></td\n\t\t><td id="${id}_arrow" class=\'dijitReset dijitRight dijitButtonNode dijitArrowButton\'\n\t\t\tdojoAttachPoint="_popupStateNode,focusNode,_buttonNode"\n\t\t\tdojoAttachEvent="onkeypress:_onArrowKeyPress"\n\t\t\ttitle="${optionsTitle}"\n\t\t\trole="button" aria-haspopup="true"\n\t\t\t><div class="dijitReset dijitArrowButtonInner" role="presentation"></div\n\t\t\t><div class="dijitReset dijitArrowButtonChar" role="presentation">&#9660;</div\n\t\t></td\n\t\t><td style="display:none !important;"\n\t\t\t><input ${!nameAttrSetting} type="${type}" value="${value}" dojoAttachPoint="valueNode"\n\t\t/></td></tr></tbody\n></table>\n'),
attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{id:"",tabIndex:["focusNode","titleNode"],title:"titleNode"}),optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{buttonNode:"dijitButtonNode",titleNode:"dijitButtonContents",_popupStateNode:"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(a){if(a.charOrCode==dojo.keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){dijit.focus(this._popupStateNode);dojo.stopEvent(a)}},_onArrowKeyPress:function(a){if(a.charOrCode==
dojo.keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){dijit.focus(this.titleNode);dojo.stopEvent(a)}},focus:function(a){this.disabled||dijit.focus(a=="start"?this.titleNode:this._popupStateNode)}});dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{checked:"focusNode"}),_clicked:function(){this.set("checked",!this.checked)},_setCheckedAttr:function(a,b){this._set("checked",
a);dojo.attr(this.focusNode||this.domNode,"checked",a);dijit.setWaiState(this.focusNode||this.domNode,"pressed",a);this._handleOnChange(a,b)},setChecked:function(a){dojo.deprecated("setChecked("+a+") is deprecated. Use set('checked',"+a+") instead.","","2.0");this.set("checked",a)},reset:function(){this._hasBeenBlurred=false;this.set("checked",this.params.checked||false)}})};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form.DropDownButton"]){dojo._hasResource["dijit.form.DropDownButton"]=true;dojo.provide("dijit.form.DropDownButton");dojo.require("dijit.form.Button")};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.form.ToggleButton"]){dojo._hasResource["dijit.form.ToggleButton"]=true;dojo.provide("dijit.form.ToggleButton");dojo.require("dijit.form.Button")};
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.Menu"]){dojo._hasResource["dijit.Menu"]=true;dojo.provide("dijit.Menu");dojo.require("dojo.window");dojo.require("dijit._Widget");dojo.require("dijit._KeyNavContainer");dojo.require("dijit._Templated");dojo.require("dijit.MenuItem");dojo.require("dijit.PopupMenuItem");dojo.require("dijit.CheckedMenuItem");dojo.require("dijit.MenuSeparator");dojo.declare("dijit._MenuBase",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{parentMenu:null,popupDelay:500,startup:function(){if(!this._started){dojo.forEach(this.getChildren(),
function(a){a.startup()});this.startupKeyNavChildren();this.inherited(arguments)}},onExecute:function(){},onCancel:function(){},_moveToPopup:function(a){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled)this.focusedChild._onClick(a);else(a=this._getTopMenu())&&a._isMenuBar&&a.focusNext()},_onPopupHover:function(){if(this.currentPopup&&this.currentPopup._pendingClose_timer){var a=this.currentPopup.parentMenu;a.focusedChild&&a.focusedChild._setSelected(false);a.focusedChild=
this.currentPopup.from_item;a.focusedChild._setSelected(true);this._stopPendingCloseTimer(this.currentPopup)}},onItemHover:function(a){if(this.isActive){this.focusChild(a);if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer)this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay)}this.focusedChild&&this.focusChild(a);this._hoveredChild=a},_onChildBlur:function(a){this._stopPopupTimer();a._setSelected(false);var b=a.popup;if(b){this._stopPendingCloseTimer(b);
b._pendingClose_timer=setTimeout(function(){b._pendingClose_timer=null;if(b.parentMenu)b.parentMenu.currentPopup=null;dijit.popup.close(b)},this.popupDelay)}},onItemUnhover:function(a){this.isActive&&this._stopPopupTimer();if(this._hoveredChild==a)this._hoveredChild=null},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);this.hover_timer=null}},_stopPendingCloseTimer:function(a){if(a._pendingClose_timer){clearTimeout(a._pendingClose_timer);a._pendingClose_timer=null}},
_stopFocusTimer:function(){if(this._focus_timer){clearTimeout(this._focus_timer);this._focus_timer=null}},_getTopMenu:function(){for(var a=this;a.parentMenu;a=a.parentMenu);return a},onItemClick:function(a,b){typeof this.isShowingNow=="undefined"&&this._markActive();this.focusChild(a);if(a.disabled)return false;if(a.popup)this._openPopup();else{this.onExecute();a.onClick(b)}},_openPopup:function(){this._stopPopupTimer();var a=this.focusedChild;if(a){var b=a.popup;if(!b.isShowingNow){if(this.currentPopup){this._stopPendingCloseTimer(this.currentPopup);
dijit.popup.close(this.currentPopup)}b.parentMenu=this;b.from_item=a;var c=this;dijit.popup.open({parent:this,popup:b,around:a.domNode,orient:this._orient||(this.isLeftToRight()?{TR:"TL",TL:"TR",BR:"BL",BL:"BR"}:{TL:"TR",TR:"TL",BL:"BR",BR:"BL"}),onCancel:function(){c.focusChild(a);c._cleanUp();a._setSelected(true);c.focusedChild=a},onExecute:dojo.hitch(this,"_cleanUp")});this.currentPopup=b;b.connect(b.domNode,"onmouseenter",dojo.hitch(c,"_onPopupHover"));if(b.focus)b._focus_timer=setTimeout(dojo.hitch(b,
function(){this._focus_timer=null;this.focus()}),0)}}},_markActive:function(){this.isActive=true;dojo.replaceClass(this.domNode,"dijitMenuActive","dijitMenuPassive")},onOpen:function(){this.isShowingNow=true;this._markActive()},_markInactive:function(){this.isActive=false;dojo.replaceClass(this.domNode,"dijitMenuPassive","dijitMenuActive")},onClose:function(){this._stopFocusTimer();this._markInactive();this.isShowingNow=false;this.parentMenu=null},_closeChild:function(){this._stopPopupTimer();if(this.currentPopup){dijit._curFocus&&
dojo.isDescendant(dijit._curFocus,this.currentPopup.domNode)&&this.focusedChild.focusNode.focus();dijit.popup.close(this.currentPopup);this.currentPopup=null}if(this.focusedChild){this.focusedChild._setSelected(false);this.focusedChild._onUnhover();this.focusedChild=null}},_onItemFocus:function(a){this._hoveredChild&&this._hoveredChild!=a&&this._hoveredChild._onUnhover()},_onBlur:function(){this._cleanUp();this.inherited(arguments)},_cleanUp:function(){this._closeChild();typeof this.isShowingNow==
"undefined"&&this._markInactive()}});dojo.declare("dijit.Menu",dijit._MenuBase,{constructor:function(){this._bindings=[]},templateString:dojo.cache("dijit","templates/Menu.html",'<table class="dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable" role="menu" tabIndex="${tabIndex}" dojoAttachEvent="onkeypress:_onKeyPress" cellspacing="0">\n\t<tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody>\n</table>\n'),baseClass:"dijitMenu",targetNodeIds:[],contextMenuForWindow:false,leftClickToOpen:false,
refocus:true,postCreate:function(){this.contextMenuForWindow?this.bindDomNode(dojo.body()):dojo.forEach(this.targetNodeIds,this.bindDomNode,this);var a=dojo.keys,b=this.isLeftToRight();this._openSubMenuKey=b?a.RIGHT_ARROW:a.LEFT_ARROW;this._closeSubMenuKey=b?a.LEFT_ARROW:a.RIGHT_ARROW;this.connectKeyNavHandlers([a.UP_ARROW],[a.DOWN_ARROW])},_onKeyPress:function(a){if(!(a.ctrlKey||a.altKey))switch(a.charOrCode){case this._openSubMenuKey:this._moveToPopup(a);dojo.stopEvent(a);break;case this._closeSubMenuKey:if(this.parentMenu)this.parentMenu._isMenuBar?
this.parentMenu.focusPrev():this.onCancel(false);else dojo.stopEvent(a)}},_iframeContentWindow:function(a){return dojo.window.get(this._iframeContentDocument(a))||this._iframeContentDocument(a).__parent__||a.name&&dojo.doc.frames[a.name]||null},_iframeContentDocument:function(a){return a.contentDocument||a.contentWindow&&a.contentWindow.document||a.name&&dojo.doc.frames[a.name]&&dojo.doc.frames[a.name].document||null},bindDomNode:function(a){a=dojo.byId(a);var b;if(a.tagName.toLowerCase()=="iframe"){var c=
a,e=this._iframeContentWindow(c);b=dojo.withGlobal(e,dojo.body)}else b=a==dojo.body()?dojo.doc.documentElement:a;var d={node:a,iframe:c};dojo.attr(a,"_dijitMenu"+this.id,this._bindings.push(d));var f=dojo.hitch(this,function(h){return[dojo.connect(h,this.leftClickToOpen?"onclick":"oncontextmenu",this,function(g){dojo.stopEvent(g);this._scheduleOpen(g.target,c,{x:g.pageX,y:g.pageY})}),dojo.connect(h,"onkeydown",this,function(g){if(g.shiftKey&&g.keyCode==dojo.keys.F10){dojo.stopEvent(g);this._scheduleOpen(g.target,
c)}})]});d.connects=b?f(b):[];if(c){d.onloadHandler=dojo.hitch(this,function(){var h=this._iframeContentWindow(c);b=dojo.withGlobal(h,dojo.body);d.connects=f(b)});c.addEventListener?c.addEventListener("load",d.onloadHandler,false):c.attachEvent("onload",d.onloadHandler)}},unBindDomNode:function(a){var b;try{b=dojo.byId(a)}catch(c){return}a="_dijitMenu"+this.id;if(b&&dojo.hasAttr(b,a)){var e=dojo.attr(b,a)-1,d=this._bindings[e];dojo.forEach(d.connects,dojo.disconnect);var f=d.iframe;if(f)f.removeEventListener?
f.removeEventListener("load",d.onloadHandler,false):f.detachEvent("onload",d.onloadHandler);dojo.removeAttr(b,a);delete this._bindings[e]}},_scheduleOpen:function(a,b,c){if(!this._openTimer)this._openTimer=setTimeout(dojo.hitch(this,function(){delete this._openTimer;this._openMyself({target:a,iframe:b,coords:c})}),1)},_openMyself:function(a){function b(){i.refocus&&dijit.focus(j);dijit.popup.close(i)}var c=a.target,e=a.iframe;if(a=a.coords){if(e){c=dojo.position(e,true);var d=this._iframeContentWindow(e);
d=dojo.withGlobal(d,"_docScroll",dojo);var f=dojo.getComputedStyle(e),h=dojo._toPixelValue,g=(dojo.isIE&&dojo.isQuirks?0:h(e,f.paddingLeft))+(dojo.isIE&&dojo.isQuirks?h(e,f.borderLeftWidth):0);e=(dojo.isIE&&dojo.isQuirks?0:h(e,f.paddingTop))+(dojo.isIE&&dojo.isQuirks?h(e,f.borderTopWidth):0);a.x+=c.x+g-d.x;a.y+=c.y+e-d.y}}else{a=dojo.position(c,true);a.x+=10;a.y+=10}var i=this,j=dijit.getFocus(this);dijit.popup.open({popup:this,x:a.x,y:a.y,onExecute:b,onCancel:b,orient:this.isLeftToRight()?"L":"R"});
this.focus();this._onBlur=function(){this.inherited("_onBlur",arguments);dijit.popup.close(this)}},uninitialize:function(){dojo.forEach(this._bindings,function(a){a&&this.unBindDomNode(a.node)},this);this.inherited(arguments)}})};
if (typeof dojo !== "undefined") {
  dojo.provide("blueKai.blueKai");
}

/* global blueKai document unescape */
if (typeof blueKai === "undefined") {
	blueKai = {};
}
var KRUXSetup = {
	pubid:"1c6ac852-8938-481a-84b8-4806affc8c13", 
    async: true

};
blueKai.blueKai = {
	dataJson :{},
	timercounter:0,	
	adDivs:[],
	bk_track:function(check, data){
		if(check && document.location.protocol.indexOf('https')==-1){
			if(data){
				this.dataJson = data;
				this.sendBlueKai();
			}else{
				this.adDivs = this.getbyclass();	
				if(!this.getData()){
					return;
				}
			}
		}
	},
	sendBlueKai: function(){
		/* 2.4.0-31349 */ 
		if(typeof BKTAG=="undefined"||!BKTAG){var BKTAG=(function(){var params=[];var doTagged=false;var _={getKwds:function(){var meta=document.getElementsByTagName('meta');var kwds=[];var ii=meta.length;for(var i=0;i<ii;i++){if(meta[i].name&&meta[i].name.toLowerCase()=='keywords'){kwds.push(meta[i].content)}}return kwds.join(',')},addBkParam:function(k,v){self.addParam('phint','__bk_'+k,v)}};var self={_dest:null,createHidden:function(k,v){var myInput=document.createElement("input");myInput.setAttribute('type','hidden');myInput.setAttribute("name",k);myInput.setAttribute("value",v);return myInput},doTag:function(site,limit,excludeBkParams,allowMultipleCalls){var bkFrame=null;if(doTagged&&!(allowMultipleCalls===true)){return}doTagged=true;params.unshift('r='+parseInt(Math.random()*99999));params.unshift('limit='+limit);params.unshift('ret=html');if(!excludeBkParams){self.addParam('phint','__bk_k',document.title);self.addParam('phint','__bk_k',_.getKwds())}self._dest=('https:'==document.location.protocol?'https://stags':'http://tags')+'.bluekai.com/site/'+site+'?'+params.join('&');self._dest=self._dest.substr(0,2000);var isOpera=false,isIE=false;if(typeof(window.opera)!='undefined'){isOpera=true}var ieIndex=navigator.userAgent.indexOf('Internet Explorer');if(!isOpera&&ieIndex>-1){isIE=true};if(!isIE){bkFrame=document.createElement("iframe");bkFrame.setAttribute('height','1');bkFrame.setAttribute('width','1');bkFrame.setAttribute("name","__bkframe");bkFrame.setAttribute("frameborder","0");bkFrame.setAttribute("src",self._dest);document.body.appendChild(bkFrame)}else{bkFrame=document.createElement("div");bkFrame.innerHTML='<iframe name="__bkframe" height="1" width="1" frameborder="0" src="'+self._dest+'" />';document.body.appendChild(bkFrame)}params=[]},addParam:function(type,k,v){if(v){var val=k+'='+v;val=encodeURIComponent(val);params.push(type+'='+val)}},addValue:function(k,v){if(v){var val=encodeURIComponent(v);params.push(k+'='+val)}}};return self})();function bk_addPageCtx(k,v){BKTAG.addParam('phint',k,v)}function bk_addVar(k,v){BKTAG.addValue(k,v)}function bk_doJSTag(site,limit,allowMultipleCalls){BKTAG.doTag(site,limit,false,allowMultipleCalls)}function bk_doSendData(site,limit,excludeBkParams,allowMultipleCalls){BKTAG.doTag(site,limit,excludeBkParams,allowMultipleCalls)}}		
		
		for(var key in this.dataJson ) {
			if(key && this.dataJson[key] != "" ) {
				bk_addPageCtx(key, this.dataJson[key]);
			}
		}
		
		var siteIds = { 
				"wsj.com" : "4454", 
				"barrons.com" : "4457", 
				"marketwatch.com":"4455", 
				"smartmoney.com":"4458", 
				"allthingsd.com":"4459", 
				"fins.com":"4456", 
				"wsjwine.com":"4461",	
				"efinancialnews.com":"4460"
					};
		var limit = 10;  //( we can tune it later )
		var site = document.location.href;
		var siteId = this.getSiteId(siteIds);
		this.makeFrame();
		bk_doSendData(siteId, limit, false);
		this.sendKrux();
		var url = document.URL.toLowerCase();
		if(url.indexOf('bluekaidebug=yes')>0) this.showData();
	},
	sendKrux: function(){

		KRUXSetup['site'] = this.dataJson['primaryProduct'];
		KRUXSetup['section'] = this.dataJson['section'];
		KRUXSetup['subSection'] = this.dataJson['articleType'];

		this.include("http://sj.wsj.net/internal/krux.js");
		
	},
	getSiteId:function(siteIds){
		var site = document.location.href;
		var defaultKey ="";
		for( key in siteIds ) {
			if(site.indexOf(key)>-1){
				return siteIds[key];
			}else if(".wsj.com".indexOf(key)>-1){
				defaultKey = siteIds[key];
			} 
		}		
		return defaultKey;
	},
	getData:function(){

		 this.dataJson = { 
			"serverDomain" : s?s.server:"",
			"primaryProduct" : s?s.channel:"",
			"pageName" : s?s.pageName:"",
			"section" : s?s.prop2:"",
			"articleType" : s?s.prop3:"",
			"subSection" : s?s.prop26:"",
			"contentType" : s?s.prop19:"",
			"encryptedUUID" : s?s.prop25:"",
			"contentChannel" : s?s.prop1:"",
			"isSub" : s?s.prop27:"",
			"edition" : s?s.prop24:"",
			"referrer" : document.referrer!=""?document.referrer.split('/')[2]:""
				};
		 if(typeof this.dataJson.subsection=="undefined" || this.dataJson.subsection=="")this.dataJson.subsection=this.dataJson.section;
		return this.getAdsData();
	},
	getAdsData:function(){
		if(this.adDivs.length>0){		
			var countSize=1;
			var countZone=1;
			var countSection=1;						
			var strSection = ",";
			var strZone = ",";
			var strSize = ",";
			for(i=0;i<this.adDivs.length;i++){
				if((this.adDivs[i].innerHTML.replace(/^\s+|\s+$/g,"")!='' && this.adDivs[i].getElementsByTagName('iframe')[0]!=undefined)|| this.timercounter>5){
					var ad=this.adDivs[i].getElementsByTagName('iframe')[0];
					if(ad){
						var ind=ad.src.indexOf('doubleclick.net');
						var height=ad.height;
						var width=ad.width;	
						if(ind>1 && height >2 && width >2){
							var str=ad.src.substring(ind);
							if(strSize.indexOf(","+str+",")==-1){
								strSize = strSize+width+"x"+height + ",";
								this.dataJson['adSize'+(countSize++)] = width+"x"+height;
								if(countSize>10)break;
							}
							if(str.split('/')[3]){
								var zone = str.split('/')[3].split(';')[0];
								if(strZone.indexOf(","+zone+",")==-1){
									strZone = strZone + zone+",";
									this.dataJson['adZone'+(countZone++)] = zone;
								}
								var section = str.split('/')[2];
								if(strSection.indexOf(","+section+",")==-1){
									strSection = strSection + section+",";
									this.dataJson['adSection'+(countSection++)] = section;
								}
	
							}
						}
					}
				}else{
					this.timercounter++;
					window.setTimeout('blueKai.blueKai.getAdsData()',1000);
					return false;
				}
				
				
			}
			
		}
		this.sendBlueKai();
	},
	makeFrame:function () {
	   var ifrm = document.createElement("IFRAME");
	   ifrm.setAttribute("src", "javascript:void(0)");
	   ifrm.setAttribute("name", "__bkframe");
	   ifrm.setAttribute("frameborder", 0);
	   ifrm.style.width = 0+"px";
	   ifrm.style.height = 0+"px";
	   document.body.appendChild(ifrm);
	},
	include: function(file){
		var script  = document.createElement('script');
		script.src  = file;
		script.type = 'text/javascript';
		script.defer = true;
		document.getElementsByTagName('head').item(0).appendChild(script);
	},
	showData:function(){
		var out = '';
		for (var data in blueKai.blueKai.dataJson) {
			if(blueKai.blueKai.dataJson[data]!=null && blueKai.blueKai.dataJson[data].replace(/^\s+|\s+$/g,"")!=""){
				out += data + ': ' + blueKai.blueKai.dataJson[data] + '\n';
			}
		}
		alert(out);		
	},
	getbyclass: function(){
	  var elements = document.getElementsByTagName("div");
	  var result = [];
	  var attName= "class";
	  if(elements[0].getAttribute("className")!=null){
		  attName= "className";
	  }
	  for(z=0;z<elements.length;z++){
		  if(elements[z].getAttribute(attName) && elements[z].getAttribute(attName).match(/adSummary/)){
	      result.push(elements[z]);
	    }
	  }
	  return result;
	}

};
dojo.provide("nielsenTracking");

nielsenTracking = {
      init: function() {
//  if(dj.util.Region.getViewByRegion() === "na,us") {
            var d = new Image(1, 1);
            d.onerror = d.onload = function () {
              d.onerror = d.onload = null;
            };
            d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-403743h&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
//        }
      }

};
dojo.provide("yui.yui-2.5.2");
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);if(/ Mobile\//.test(B)){C.mobile="Apple";}else{A=B.match(/NokiaN[^\/]*/);if(A){C.mobile=A[0];}}A=B.match(/AdobeAIR\/([^\s]*)/);if(A){C.air=A[0];}}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);A=B.match(/Opera Mini[^;]*/);if(A){C.mobile=A[0];}}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var A=YAHOO.lang,C=["toString","valueOf"],B={isArray:function(D){if(D){return A.isNumber(D.length)&&A.isFunction(D.splice);}return false;},isBoolean:function(D){return typeof D==="boolean";},isFunction:function(D){return typeof D==="function";},isNull:function(D){return D===null;},isNumber:function(D){return typeof D==="number"&&isFinite(D);},isObject:function(D){return(D&&(typeof D==="object"||A.isFunction(D)))||false;},isString:function(D){return typeof D==="string";},isUndefined:function(D){return typeof D==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(F,E){for(var D=0;D<C.length;D=D+1){var H=C[D],G=E[H];if(A.isFunction(G)&&G!=Object.prototype[H]){F[H]=G;}}}:function(){},extend:function(H,I,G){if(!I||!H){throw new Error("extend failed, please check that "+"all dependencies are included.");}var E=function(){};E.prototype=I.prototype;H.prototype=new E();H.prototype.constructor=H;H.superclass=I.prototype;if(I.prototype.constructor==Object.prototype.constructor){I.prototype.constructor=I;}if(G){for(var D in G){if(A.hasOwnProperty(G,D)){H.prototype[D]=G[D];}}A._IEEnumFix(H.prototype,G);}},augmentObject:function(H,G){if(!G||!H){throw new Error("Absorb failed, verify dependencies.");}var D=arguments,F,I,E=D[2];if(E&&E!==true){for(F=2;F<D.length;F=F+1){H[D[F]]=G[D[F]];}}else{for(I in G){if(E||!(I in H)){H[I]=G[I];}}A._IEEnumFix(H,G);}},augmentProto:function(G,F){if(!F||!G){throw new Error("Augment failed, verify dependencies.");}var D=[G.prototype,F.prototype];for(var E=2;E<arguments.length;E=E+1){D.push(arguments[E]);}A.augmentObject.apply(this,D);},dump:function(D,I){var F,H,K=[],L="{...}",E="f(){...}",J=", ",G=" => ";if(!A.isObject(D)){return D+"";}else{if(D instanceof Date||("nodeType"in D&&"tagName"in D)){return D;}else{if(A.isFunction(D)){return E;}}}I=(A.isNumber(I))?I:3;if(A.isArray(D)){K.push("[");for(F=0,H=D.length;F<H;F=F+1){if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}if(K.length>1){K.pop();}K.push("]");}else{K.push("{");for(F in D){if(A.hasOwnProperty(D,F)){K.push(F+G);if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}}if(K.length>1){K.pop();}K.push("}");}return K.join("");},substitute:function(S,E,L){var I,H,G,O,P,R,N=[],F,J="dump",M=" ",D="{",Q="}";for(;;){I=S.lastIndexOf(D);if(I<0){break;}H=S.indexOf(Q,I);if(I+1>=H){break;}F=S.substring(I+1,H);O=F;R=null;G=O.indexOf(M);if(G>-1){R=O.substring(G+1);O=O.substring(0,G);}P=E[O];if(L){P=L(O,P,R);}if(A.isObject(P)){if(A.isArray(P)){P=A.dump(P,parseInt(R,10));}else{R=R||"";var K=R.indexOf(J);if(K>-1){R=R.substring(4);}if(P.toString===Object.prototype.toString||K>-1){P=A.dump(P,parseInt(R,10));}else{P=P.toString();}}}else{if(!A.isString(P)&&!A.isNumber(P)){P="~-"+N.length+"-~";N[N.length]=F;}}S=S.substring(0,I)+P+S.substring(H+1);}for(I=N.length-1;I>=0;I=I-1){S=S.replace(new RegExp("~-"+I+"-~"),"{"+N[I]+"}","g");}return S;},trim:function(D){try{return D.replace(/^\s+|\s+$/g,"");}catch(E){return D;}},merge:function(){var G={},E=arguments;for(var F=0,D=E.length;F<D;F=F+1){A.augmentObject(G,E[F],true);}return G;},later:function(K,E,L,G,H){K=K||0;E=E||{};var F=L,J=G,I,D;if(A.isString(L)){F=E[L];}if(!F){throw new TypeError("method undefined");}if(!A.isArray(J)){J=[G];}I=function(){F.apply(E,J);};D=(H)?setInterval(I,K):setTimeout(I,K);return{interval:H,cancel:function(){if(this.interval){clearInterval(D);}else{clearTimeout(D);}}};},isValue:function(D){return(A.isObject(D)||A.isString(D)||A.isNumber(D)||A.isBoolean(D));}};A.hasOwnProperty=(Object.prototype.hasOwnProperty)?function(D,E){return D&&D.hasOwnProperty(E);}:function(D,E){return!A.isUndefined(D[E])&&D.constructor.prototype[E]!==D[E];};B.augmentObject(A,B,true);YAHOO.util.Lang=A;A.augment=A.augmentProto;YAHOO.augment=A.augmentProto;YAHOO.extend=A.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.5.2",build:"1076"});(function(){var B=YAHOO.util,K,I,J={},F={},M=window.document;YAHOO.env._id_counter=YAHOO.env._id_counter||0;var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i};var N=function(P){if(!E.HYPHEN.test(P)){return P;}if(J[P]){return J[P];}var Q=P;while(E.HYPHEN.exec(Q)){Q=Q.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}J[P]=Q;return Q;};var O=function(Q){var P=F[Q];if(!P){P=new RegExp("(?:^|\\s+)"+Q+"(?:\\s+|$)");F[Q]=P;}return P;};if(M.defaultView&&M.defaultView.getComputedStyle){K=function(P,S){var R=null;if(S=="float"){S="cssFloat";}var Q=P.ownerDocument.defaultView.getComputedStyle(P,"");if(Q){R=Q[N(S)];}return P.style[S]||R;};}else{if(M.documentElement.currentStyle&&G){K=function(P,R){switch(N(R)){case"opacity":var T=100;try{T=P.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(S){try{T=P.filters("alpha").opacity;}catch(S){}}return T/100;case"float":R="styleFloat";default:var Q=P.currentStyle?P.currentStyle[R]:null;return(P.style[R]||Q);}};}else{K=function(P,Q){return P.style[Q];};}}if(G){I=function(P,Q,R){switch(Q){case"opacity":if(YAHOO.lang.isString(P.style.filter)){P.style.filter="alpha(opacity="+R*100+")";if(!P.currentStyle||!P.currentStyle.hasLayout){P.style.zoom=1;}}break;case"float":Q="styleFloat";default:P.style[Q]=R;}};}else{I=function(P,Q,R){if(Q=="float"){Q="cssFloat";}P.style[Q]=R;};}var D=function(P,Q){return P&&P.nodeType==1&&(!Q||Q(P));};YAHOO.util.Dom={get:function(R){if(R&&(R.nodeType||R.item)){return R;}if(YAHOO.lang.isString(R)||!R){return M.getElementById(R);}if(R.length!==undefined){var S=[];for(var Q=0,P=R.length;Q<P;++Q){S[S.length]=B.Dom.get(R[Q]);}return S;}return R;},getStyle:function(P,R){R=N(R);var Q=function(S){return K(S,R);};return B.Dom.batch(P,Q,B.Dom,true);},setStyle:function(P,R,S){R=N(R);var Q=function(T){I(T,R,S);};B.Dom.batch(P,Q,B.Dom,true);},getXY:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}return H(R);};return B.Dom.batch(P,Q,B.Dom,true);},getX:function(P){var Q=function(R){return B.Dom.getXY(R)[0];};return B.Dom.batch(P,Q,B.Dom,true);},getY:function(P){var Q=function(R){return B.Dom.getXY(R)[1];};return B.Dom.batch(P,Q,B.Dom,true);},setXY:function(P,S,R){var Q=function(V){var U=this.getStyle(V,"position");if(U=="static"){this.setStyle(V,"position","relative");U="relative";}var X=this.getXY(V);if(X===false){return false;}var W=[parseInt(this.getStyle(V,"left"),10),parseInt(this.getStyle(V,"top"),10)];if(isNaN(W[0])){W[0]=(U=="relative")?0:V.offsetLeft;}if(isNaN(W[1])){W[1]=(U=="relative")?0:V.offsetTop;}if(S[0]!==null){V.style.left=S[0]-X[0]+W[0]+"px";}if(S[1]!==null){V.style.top=S[1]-X[1]+W[1]+"px";}if(!R){var T=this.getXY(V);if((S[0]!==null&&T[0]!=S[0])||(S[1]!==null&&T[1]!=S[1])){this.setXY(V,S,true);}}};B.Dom.batch(P,Q,B.Dom,true);},setX:function(Q,P){B.Dom.setXY(Q,[P,null]);},setY:function(P,Q){B.Dom.setXY(P,[null,Q]);},getRegion:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}var S=B.Region.getRegion(R);return S;};return B.Dom.batch(P,Q,B.Dom,true);},getClientWidth:function(){return B.Dom.getViewportWidth();},getClientHeight:function(){return B.Dom.getViewportHeight();},getElementsByClassName:function(T,X,U,V){X=X||"*";U=(U)?B.Dom.get(U):null||M;if(!U){return[];}var Q=[],P=U.getElementsByTagName(X),W=O(T);for(var R=0,S=P.length;R<S;++R){if(W.test(P[R].className)){Q[Q.length]=P[R];if(V){V.call(P[R],P[R]);}}}return Q;},hasClass:function(R,Q){var P=O(Q);var S=function(T){return P.test(T.className);};return B.Dom.batch(R,S,B.Dom,true);},addClass:function(Q,P){var R=function(S){if(this.hasClass(S,P)){return false;}S.className=YAHOO.lang.trim([S.className,P].join(" "));return true;};return B.Dom.batch(Q,R,B.Dom,true);},removeClass:function(R,Q){var P=O(Q);var S=function(T){if(!Q||!this.hasClass(T,Q)){return false;}var U=T.className;T.className=U.replace(P," ");if(this.hasClass(T,Q)){this.removeClass(T,Q);}T.className=YAHOO.lang.trim(T.className);return true;};return B.Dom.batch(R,S,B.Dom,true);},replaceClass:function(S,Q,P){if(!P||Q===P){return false;}var R=O(Q);var T=function(U){if(!this.hasClass(U,Q)){this.addClass(U,P);return true;}U.className=U.className.replace(R," "+P+" ");if(this.hasClass(U,Q)){this.replaceClass(U,Q,P);}U.className=YAHOO.lang.trim(U.className);return true;};return B.Dom.batch(S,T,B.Dom,true);},generateId:function(P,R){R=R||"yui-gen";var Q=function(S){if(S&&S.id){return S.id;}var T=R+YAHOO.env._id_counter++;if(S){S.id=T;}return T;};return B.Dom.batch(P,Q,B.Dom,true)||Q.apply(B.Dom,arguments);},isAncestor:function(P,Q){P=B.Dom.get(P);Q=B.Dom.get(Q);if(!P||!Q){return false;}if(P.contains&&Q.nodeType&&!L){return P.contains(Q);}else{if(P.compareDocumentPosition&&Q.nodeType){return!!(P.compareDocumentPosition(Q)&16);}else{if(Q.nodeType){return!!this.getAncestorBy(Q,function(R){return R==P;});}}}return false;},inDocument:function(P){return this.isAncestor(M.documentElement,P);},getElementsBy:function(W,Q,R,T){Q=Q||"*";R=(R)?B.Dom.get(R):null||M;if(!R){return[];}var S=[],V=R.getElementsByTagName(Q);for(var U=0,P=V.length;U<P;++U){if(W(V[U])){S[S.length]=V[U];if(T){T(V[U]);}}}return S;},batch:function(T,W,V,R){T=(T&&(T.tagName||T.item))?T:B.Dom.get(T);if(!T||!W){return false;}var S=(R)?V:window;if(T.tagName||T.length===undefined){return W.call(S,T,V);}var U=[];for(var Q=0,P=T.length;Q<P;++Q){U[U.length]=W.call(S,T[Q],V);}return U;},getDocumentHeight:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollHeight:M.documentElement.scrollHeight;var P=Math.max(Q,B.Dom.getViewportHeight());return P;},getDocumentWidth:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollWidth:M.documentElement.scrollWidth;var P=Math.max(Q,B.Dom.getViewportWidth());return P;},getViewportHeight:function(){var P=self.innerHeight;var Q=M.compatMode;if((Q||G)&&!C){P=(Q=="CSS1Compat")?M.documentElement.clientHeight:M.body.clientHeight;}return P;},getViewportWidth:function(){var P=self.innerWidth;var Q=M.compatMode;if(Q||G){P=(Q=="CSS1Compat")?M.documentElement.clientWidth:M.body.clientWidth;}return P;},getAncestorBy:function(P,Q){while(P=P.parentNode){if(D(P,Q)){return P;}}return null;},getAncestorByClassName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return B.Dom.hasClass(S,P);};return B.Dom.getAncestorBy(Q,R);},getAncestorByTagName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return S.tagName&&S.tagName.toUpperCase()==P.toUpperCase();};return B.Dom.getAncestorBy(Q,R);},getPreviousSiblingBy:function(P,Q){while(P){P=P.previousSibling;if(D(P,Q)){return P;}}return null;},getPreviousSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getPreviousSiblingBy(P);},getNextSiblingBy:function(P,Q){while(P){P=P.nextSibling;if(D(P,Q)){return P;}}return null;},getNextSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getNextSiblingBy(P);},getFirstChildBy:function(P,R){var Q=(D(P.firstChild,R))?P.firstChild:null;return Q||B.Dom.getNextSiblingBy(P.firstChild,R);},getFirstChild:function(P,Q){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getFirstChildBy(P);},getLastChildBy:function(P,R){if(!P){return null;}var Q=(D(P.lastChild,R))?P.lastChild:null;return Q||B.Dom.getPreviousSiblingBy(P.lastChild,R);},getLastChild:function(P){P=B.Dom.get(P);return B.Dom.getLastChildBy(P);},getChildrenBy:function(Q,S){var R=B.Dom.getFirstChildBy(Q,S);var P=R?[R]:[];B.Dom.getNextSiblingBy(R,function(T){if(!S||S(T)){P[P.length]=T;}return false;});return P;},getChildren:function(P){P=B.Dom.get(P);if(!P){}return B.Dom.getChildrenBy(P);},getDocumentScrollLeft:function(P){P=P||M;return Math.max(P.documentElement.scrollLeft,P.body.scrollLeft);},getDocumentScrollTop:function(P){P=P||M;return Math.max(P.documentElement.scrollTop,P.body.scrollTop);},insertBefore:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}return P.parentNode.insertBefore(Q,P);},insertAfter:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}if(P.nextSibling){return P.parentNode.insertBefore(Q,P.nextSibling);}else{return P.parentNode.appendChild(Q);}},getClientRegion:function(){var R=B.Dom.getDocumentScrollTop(),Q=B.Dom.getDocumentScrollLeft(),S=B.Dom.getViewportWidth()+Q,P=B.Dom.getViewportHeight()+R;return new B.Region(R,S,P,Q);}};var H=function(){if(M.documentElement.getBoundingClientRect){return function(Q){var R=Q.getBoundingClientRect();var P=Q.ownerDocument;return[R.left+B.Dom.getDocumentScrollLeft(P),R.top+B.Dom.getDocumentScrollTop(P)];};}else{return function(R){var S=[R.offsetLeft,R.offsetTop];var Q=R.offsetParent;var P=(L&&B.Dom.getStyle(R,"position")=="absolute"&&R.offsetParent==R.ownerDocument.body);if(Q!=R){while(Q){S[0]+=Q.offsetLeft;S[1]+=Q.offsetTop;if(!P&&L&&B.Dom.getStyle(Q,"position")=="absolute"){P=true;}Q=Q.offsetParent;}}if(P){S[0]-=R.ownerDocument.body.offsetLeft;S[1]-=R.ownerDocument.body.offsetTop;}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(Q.scrollTop||Q.scrollLeft){if(!E.OP_SCROLL.test(B.Dom.getStyle(Q,"display"))){if(!C||B.Dom.getStyle(Q,"overflow")!=="visible"){S[0]-=Q.scrollLeft;S[1]-=Q.scrollTop;}}}Q=Q.parentNode;}return S;};}}();})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.5.2",build:"1076"});YAHOO.util.CustomEvent=function(D,B,C,A){this.type=D;this.scope=B||window;this.silent=C;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,A);}this.subscribers.push(new YAHOO.util.Subscriber(B,C,A));},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){this.lastError=null;var K=[],E=this.subscribers.length;if(!E&&this.silent){return true;}var I=[].slice.call(arguments,0),G=true,D,J=false;if(!this.silent){}var C=this.subscribers.slice(),A=YAHOO.util.Event.throwErrors;for(D=0;D<E;++D){var M=C[D];if(!M){J=true;}else{if(!this.silent){}var L=M.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(I.length>0){B=I[0];}try{G=M.fn.call(L,B,M.obj);}catch(F){this.lastError=F;if(A){throw F;}}}else{try{G=M.fn.call(L,this.type,I,M.obj);}catch(H){this.lastError=H;if(A){throw H;}}}if(false===G){if(!this.silent){}break;}}}return(G!==false);},unsubscribeAll:function(){for(var A=this.subscribers.length-1;A>-1;A--){this._delete(A);}this.subscribers=[];return A;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers.splice(A,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(B,C,A){this.fn=B;this.obj=YAHOO.lang.isUndefined(C)?null:C;this.override=A;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var I=[];var J=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9};return{POLL_RETRYS:2000,POLL_INTERVAL:20,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,_dri:null,DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){var K=this;var L=function(){K._tryPreloadAttach();};this._interval=setInterval(L,this.POLL_INTERVAL);}},onAvailable:function(P,M,Q,O,N){var K=(YAHOO.lang.isString(P))?[P]:P;for(var L=0;L<K.length;L=L+1){F.push({id:K[L],fn:M,obj:Q,override:O,checkReady:N});}C=this.POLL_RETRYS;this.startInterval();},onContentReady:function(M,K,N,L){this.onAvailable(M,K,N,L,true);},onDOMReady:function(K,M,L){if(this.DOMReady){setTimeout(function(){var N=window;if(L){if(L===true){N=M;}else{N=L;}}K.call(N,"DOMReady",[],M);},0);}else{this.DOMReadyEvent.subscribe(K,M,L);}},addListener:function(M,K,V,Q,L){if(!V||!V.call){return false;}if(this._isValidCollection(M)){var W=true;for(var R=0,T=M.length;R<T;++R){W=this.on(M[R],K,V,Q,L)&&W;}return W;}else{if(YAHOO.lang.isString(M)){var P=this.getEl(M);if(P){M=P;}else{this.onAvailable(M,function(){YAHOO.util.Event.on(M,K,V,Q,L);});return true;}}}if(!M){return false;}if("unload"==K&&Q!==this){J[J.length]=[M,K,V,Q,L];return true;}var Y=M;if(L){if(L===true){Y=Q;}else{Y=L;}}var N=function(Z){return V.call(Y,YAHOO.util.Event.getEvent(Z,M),Q);};var X=[M,K,V,N,Y,Q,L];var S=I.length;I[S]=X;if(this.useLegacyEvent(M,K)){var O=this.getLegacyIndex(M,K);if(O==-1||M!=G[O][0]){O=G.length;B[M.id+K]=O;G[O]=[M,K,M["on"+K]];E[O]=[];M["on"+K]=function(Z){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(Z),O);};}E[O].push(X);}else{try{this._simpleAdd(M,K,N,false);}catch(U){this.lastError=U;this.removeListener(M,K,V);return false;}}return true;},fireLegacyEvent:function(O,M){var Q=true,K,S,R,T,P;S=E[M].slice();for(var L=0,N=S.length;L<N;++L){R=S[L];if(R&&R[this.WFN]){T=R[this.ADJ_SCOPE];P=R[this.WFN].call(T,O);Q=(Q&&P);}}K=G[M];if(K&&K[2]){K[2](O);}return Q;},getLegacyIndex:function(L,M){var K=this.generateId(L)+M;if(typeof B[K]=="undefined"){return-1;}else{return B[K];}},useLegacyEvent:function(L,M){if(this.webkit&&("click"==M||"dblclick"==M)){var K=parseInt(this.webkit,10);if(!isNaN(K)&&K<418){return true;}}return false;},removeListener:function(L,K,T){var O,R,V;if(typeof L=="string"){L=this.getEl(L);}else{if(this._isValidCollection(L)){var U=true;for(O=L.length-1;O>-1;O--){U=(this.removeListener(L[O],K,T)&&U);}return U;}}if(!T||!T.call){return this.purgeElement(L,false,K);}if("unload"==K){for(O=J.length-1;O>-1;O--){V=J[O];if(V&&V[0]==L&&V[1]==K&&V[2]==T){J.splice(O,1);return true;}}return false;}var P=null;var Q=arguments[3];if("undefined"===typeof Q){Q=this._getCacheIndex(L,K,T);}if(Q>=0){P=I[Q];}if(!L||!P){return false;}if(this.useLegacyEvent(L,K)){var N=this.getLegacyIndex(L,K);var M=E[N];if(M){for(O=0,R=M.length;O<R;++O){V=M[O];if(V&&V[this.EL]==L&&V[this.TYPE]==K&&V[this.FN]==T){M.splice(O,1);break;}}}}else{try{this._simpleRemove(L,K,P[this.WFN],false);}catch(S){this.lastError=S;return false;}}delete I[Q][this.WFN];delete I[Q][this.FN];I.splice(Q,1);return true;},getTarget:function(M,L){var K=M.target||M.srcElement;return this.resolveTextNode(K);},resolveTextNode:function(L){try{if(L&&3==L.nodeType){return L.parentNode;}}catch(K){}return L;},getPageX:function(L){var K=L.pageX;if(!K&&0!==K){K=L.clientX||0;if(this.isIE){K+=this._getScrollLeft();}}return K;},getPageY:function(K){var L=K.pageY;if(!L&&0!==L){L=K.clientY||0;if(this.isIE){L+=this._getScrollTop();}}return L;},getXY:function(K){return[this.getPageX(K),this.getPageY(K)];},getRelatedTarget:function(L){var K=L.relatedTarget;if(!K){if(L.type=="mouseout"){K=L.toElement;}else{if(L.type=="mouseover"){K=L.fromElement;}}}return this.resolveTextNode(K);},getTime:function(M){if(!M.time){var L=new Date().getTime();try{M.time=L;}catch(K){this.lastError=K;return L;}}return M.time;},stopEvent:function(K){this.stopPropagation(K);this.preventDefault(K);},stopPropagation:function(K){if(K.stopPropagation){K.stopPropagation();}else{K.cancelBubble=true;}},preventDefault:function(K){if(K.preventDefault){K.preventDefault();}else{K.returnValue=false;}},getEvent:function(M,K){var L=M||window.event;if(!L){var N=this.getEvent.caller;while(N){L=N.arguments[0];if(L&&Event==L.constructor){break;}N=N.caller;}}return L;},getCharCode:function(L){var K=L.keyCode||L.charCode||0;if(YAHOO.env.ua.webkit&&(K in D)){K=D[K];}return K;},_getCacheIndex:function(O,P,N){for(var M=0,L=I.length;M<L;M=M+1){var K=I[M];if(K&&K[this.FN]==N&&K[this.EL]==O&&K[this.TYPE]==P){return M;}}return-1;},generateId:function(K){var L=K.id;if(!L){L="yuievtautoid-"+A;++A;K.id=L;}return L;},_isValidCollection:function(L){try{return(L&&typeof L!=="string"&&L.length&&!L.tagName&&!L.alert&&typeof L[0]!=="undefined");}catch(K){return false;}},elCache:{},getEl:function(K){return(typeof K==="string")?document.getElementById(K):K;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(L){if(!H){H=true;var K=YAHOO.util.Event;K._ready();K._tryPreloadAttach();}},_ready:function(L){var K=YAHOO.util.Event;if(!K.DOMReady){K.DOMReady=true;K.DOMReadyEvent.fire();K._simpleRemove(document,"DOMContentLoaded",K._ready);}},_tryPreloadAttach:function(){if(F.length===0){C=0;clearInterval(this._interval);this._interval=null;return;}if(this.locked){return;}if(this.isIE){if(!this.DOMReady){this.startInterval();return;}}this.locked=true;var Q=!H;if(!Q){Q=(C>0&&F.length>0);}var P=[];var R=function(T,U){var S=T;if(U.override){if(U.override===true){S=U.obj;}else{S=U.override;}}U.fn.call(S,U.obj);};var L,K,O,N,M=[];for(L=0,K=F.length;L<K;L=L+1){O=F[L];if(O){N=this.getEl(O.id);if(N){if(O.checkReady){if(H||N.nextSibling||!Q){M.push(O);F[L]=null;}}else{R(N,O);F[L]=null;}}else{P.push(O);}}}for(L=0,K=M.length;L<K;L=L+1){O=M[L];R(this.getEl(O.id),O);}C--;if(Q){for(L=F.length-1;L>-1;L--){O=F[L];if(!O||!O.id){F.splice(L,1);}}this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;},purgeElement:function(O,P,R){var M=(YAHOO.lang.isString(O))?this.getEl(O):O;var Q=this.getListeners(M,R),N,K;if(Q){for(N=Q.length-1;N>-1;N--){var L=Q[N];this.removeListener(M,L.type,L.fn);}}if(P&&M&&M.childNodes){for(N=0,K=M.childNodes.length;N<K;++N){this.purgeElement(M.childNodes[N],P,R);}}},getListeners:function(M,K){var P=[],L;if(!K){L=[I,J];}else{if(K==="unload"){L=[J];}else{L=[I];}}var R=(YAHOO.lang.isString(M))?this.getEl(M):M;for(var O=0;O<L.length;O=O+1){var T=L[O];if(T){for(var Q=0,S=T.length;Q<S;++Q){var N=T[Q];if(N&&N[this.EL]===R&&(!K||K===N[this.TYPE])){P.push({type:N[this.TYPE],fn:N[this.FN],obj:N[this.OBJ],adjust:N[this.OVERRIDE],scope:N[this.ADJ_SCOPE],index:Q});}}}}return(P.length)?P:null;},_unload:function(Q){var K=YAHOO.util.Event,N,M,L,P,O,R=J.slice();for(N=0,P=J.length;N<P;++N){L=R[N];if(L){var S=window;if(L[K.ADJ_SCOPE]){if(L[K.ADJ_SCOPE]===true){S=L[K.UNLOAD_OBJ];}else{S=L[K.ADJ_SCOPE];}}L[K.FN].call(S,K.getEvent(Q,L[K.EL]),L[K.UNLOAD_OBJ]);R[N]=null;L=null;S=null;}}J=null;if(I){for(M=I.length-1;M>-1;M--){L=I[M];if(L){K.removeListener(L[K.EL],L[K.TYPE],L[K.FN],M);}}L=null;}G=null;K._simpleRemove(window,"unload",K._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var K=document.documentElement,L=document.body;if(K&&(K.scrollTop||K.scrollLeft)){return[K.scrollTop,K.scrollLeft];}else{if(L){return[L.scrollTop,L.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(M,N,L,K){M.addEventListener(N,L,(K));};}else{if(window.attachEvent){return function(M,N,L,K){M.attachEvent("on"+N,L);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(M,N,L,K){M.removeEventListener(N,L,(K));};}else{if(window.detachEvent){return function(L,M,K){L.detachEvent("on"+M,K);};}else{return function(){};}}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var n=document.createElement("p");EU._dri=setInterval(function(){try{n.doScroll("left");clearInterval(EU._dri);EU._dri=null;EU._ready();n=null;}catch(ex){}},EU.POLL_INTERVAL);}else{if(EU.webkit&&EU.webkit<525){EU._dri=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._dri);EU._dri=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}}EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,override:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};var A=D||{};var I=this.__yui_events;if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].override);}}}return I[G];},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null;}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F]);}return G.fire.apply(G,B);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};YAHOO.util.KeyListener=function(A,F,B,C){if(!A){}else{if(!F){}else{if(!B){}}}if(!C){C=YAHOO.util.KeyListener.KEYDOWN;}var D=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof A=="string"){A=document.getElementById(A);}if(typeof B=="function"){D.subscribe(B);}else{D.subscribe(B.fn,B.scope,B.correctScope);}function E(J,I){if(!F.shift){F.shift=false;}if(!F.alt){F.alt=false;}if(!F.ctrl){F.ctrl=false;}if(J.shiftKey==F.shift&&J.altKey==F.alt&&J.ctrlKey==F.ctrl){var G;if(F.keys instanceof Array){for(var H=0;H<F.keys.length;H++){G=F.keys[H];if(G==J.charCode){D.fire(J.charCode,J);break;}else{if(G==J.keyCode){D.fire(J.keyCode,J);break;}}}}else{G=F.keys;if(G==J.charCode){D.fire(J.charCode,J);}else{if(G==J.keyCode){D.fire(J.keyCode,J);}}}}}this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(A,C,E);this.enabledEvent.fire(F);}this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(A,C,E);this.disabledEvent.fire(F);}this.enabled=false;};this.toString=function(){return"KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.util.KeyListener.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};YAHOO.register("event",YAHOO.util.Event,{version:"2.5.2",build:"1076"});YAHOO.register("yahoo-dom-event",YAHOO,{version:"2.5.2",build:"1076"});

if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var Event=YAHOO.util.Event;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(sMethod,args){for(var i in this.ids){for(var j in this.ids[i]){var oDD=this.ids[i][j];if(!this.isTypeOfDD(oDD)){continue;}
oDD[sMethod].apply(oDD,args);}}},_onLoad:function(){this.init();Event.on(document,"mouseup",this.handleMouseUp,this,true);Event.on(document,"mousemove",this.handleMouseMove,this,true);Event.on(window,"unload",this._onUnload,this,true);Event.on(window,"resize",this._onResize,this,true);},_onResize:function(e){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,fromTimeout:false,regDragDrop:function(oDD,sGroup){if(!this.initialized){this.init();}
if(!this.ids[sGroup]){this.ids[sGroup]={};}
this.ids[sGroup][oDD.id]=oDD;},removeDDFromGroup:function(oDD,sGroup){if(!this.ids[sGroup]){this.ids[sGroup]={};}
var obj=this.ids[sGroup];if(obj&&obj[oDD.id]){delete obj[oDD.id];}},_remove:function(oDD){for(var g in oDD.groups){if(g&&this.ids[g][oDD.id]){delete this.ids[g][oDD.id];}}
delete this.handleIds[oDD.id];},regHandle:function(sDDId,sHandleId){if(!this.handleIds[sDDId]){this.handleIds[sDDId]={};}
this.handleIds[sDDId][sHandleId]=sHandleId;},isDragDrop:function(id){return(this.getDDById(id))?true:false;},getRelated:function(p_oDD,bTargetsOnly){var oDDs=[];for(var i in p_oDD.groups){for(var j in this.ids[i]){var dd=this.ids[i][j];if(!this.isTypeOfDD(dd)){continue;}
if(!bTargetsOnly||dd.isTarget){oDDs[oDDs.length]=dd;}}}
return oDDs;},isLegalTarget:function(oDD,oTargetDD){var targets=this.getRelated(oDD,true);for(var i=0,len=targets.length;i<len;++i){if(targets[i].id==oTargetDD.id){return true;}}
return false;},isTypeOfDD:function(oDD){return(oDD&&oDD.__ygDragDrop);},isHandle:function(sDDId,sHandleId){return(this.handleIds[sDDId]&&this.handleIds[sDDId][sHandleId]);},getDDById:function(id){for(var i in this.ids){if(this.ids[i][id]){return this.ids[i][id];}}
return null;},handleMouseDown:function(e,oDD){this.currentTarget=YAHOO.util.Event.getTarget(e);this.dragCurrent=oDD;var el=oDD.getEl();this.startX=YAHOO.util.Event.getPageX(e);this.startY=YAHOO.util.Event.getPageY(e);this.deltaX=this.startX-el.offsetLeft;this.deltaY=this.startY-el.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var DDM=YAHOO.util.DDM;DDM.startDrag(DDM.startX,DDM.startY);DDM.fromTimeout=true;},this.clickTimeThresh);},startDrag:function(x,y){clearTimeout(this.clickTimeout);var dc=this.dragCurrent;if(dc&&dc.events.b4StartDrag){dc.b4StartDrag(x,y);dc.fireEvent('b4StartDragEvent',{x:x,y:y});}
if(dc&&dc.events.startDrag){dc.startDrag(x,y);dc.fireEvent('startDragEvent',{x:x,y:y});}
this.dragThreshMet=true;},handleMouseUp:function(e){if(this.dragCurrent){clearTimeout(this.clickTimeout);if(this.dragThreshMet){if(this.fromTimeout){this.fromTimeout=false;this.handleMouseMove(e);}
this.fromTimeout=false;this.fireEvents(e,true);}else{}
this.stopDrag(e);this.stopEvent(e);}},stopEvent:function(e){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(e);}
if(this.preventDefault){YAHOO.util.Event.preventDefault(e);}},stopDrag:function(e,silent){var dc=this.dragCurrent;if(dc&&!silent){if(this.dragThreshMet){if(dc.events.b4EndDrag){dc.b4EndDrag(e);dc.fireEvent('b4EndDragEvent',{e:e});}
if(dc.events.endDrag){dc.endDrag(e);dc.fireEvent('endDragEvent',{e:e});}}
if(dc.events.mouseUp){dc.onMouseUp(e);dc.fireEvent('mouseUpEvent',{e:e});}}
this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(e){var dc=this.dragCurrent;if(dc){if(YAHOO.util.Event.isIE&&!e.button){this.stopEvent(e);return this.handleMouseUp(e);}else{if(e.clientX<0||e.clientY<0){}}
if(!this.dragThreshMet){var diffX=Math.abs(this.startX-YAHOO.util.Event.getPageX(e));var diffY=Math.abs(this.startY-YAHOO.util.Event.getPageY(e));if(diffX>this.clickPixelThresh||diffY>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}
if(this.dragThreshMet){if(dc&&dc.events.b4Drag){dc.b4Drag(e);dc.fireEvent('b4DragEvent',{e:e});}
if(dc&&dc.events.drag){dc.onDrag(e);dc.fireEvent('dragEvent',{e:e});}
if(dc){this.fireEvents(e,false);}}
this.stopEvent(e);}},fireEvents:function(e,isDrop){var dc=this.dragCurrent;if(!dc||dc.isLocked()||dc.dragOnly){return;}
var x=YAHOO.util.Event.getPageX(e),y=YAHOO.util.Event.getPageY(e),pt=new YAHOO.util.Point(x,y),pos=dc.getTargetCoord(pt.x,pt.y),el=dc.getDragEl(),events=['out','over','drop','enter'],curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x),oldOvers=[],inGroupsObj={},inGroups=[],data={outEvts:[],overEvts:[],dropEvts:[],enterEvts:[]};for(var i in this.dragOvers){var ddo=this.dragOvers[i];if(!this.isTypeOfDD(ddo)){continue;}
if(!this.isOverTarget(pt,ddo,this.mode,curRegion)){data.outEvts.push(ddo);}
oldOvers[i]=true;delete this.dragOvers[i];}
for(var sGroup in dc.groups){if("string"!=typeof sGroup){continue;}
for(i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(!this.isTypeOfDD(oDD)){continue;}
if(oDD.isTarget&&!oDD.isLocked()&&oDD!=dc){if(this.isOverTarget(pt,oDD,this.mode,curRegion)){inGroupsObj[sGroup]=true;if(isDrop){data.dropEvts.push(oDD);}else{if(!oldOvers[oDD.id]){data.enterEvts.push(oDD);}else{data.overEvts.push(oDD);}
this.dragOvers[oDD.id]=oDD;}}}}}
this.interactionInfo={out:data.outEvts,enter:data.enterEvts,over:data.overEvts,drop:data.dropEvts,point:pt,draggedRegion:curRegion,sourceRegion:this.locationCache[dc.id],validDrop:isDrop};for(var inG in inGroupsObj){inGroups.push(inG);}
if(isDrop&&!data.dropEvts.length){this.interactionInfo.validDrop=false;if(dc.events.invalidDrop){dc.onInvalidDrop(e);dc.fireEvent('invalidDropEvent',{e:e});}}
for(i=0;i<events.length;i++){var tmp=null;if(data[events[i]+'Evts']){tmp=data[events[i]+'Evts'];}
if(tmp&&tmp.length){var type=events[i].charAt(0).toUpperCase()+events[i].substr(1),ev='onDrag'+type,b4='b4Drag'+type,cev='drag'+type+'Event',check='drag'+type;if(this.mode){if(dc.events[b4]){dc[b4](e,tmp,inGroups);dc.fireEvent(b4+'Event',{event:e,info:tmp,group:inGroups});}
if(dc.events[check]){dc[ev](e,tmp,inGroups);dc.fireEvent(cev,{event:e,info:tmp,group:inGroups});}}else{for(var b=0,len=tmp.length;b<len;++b){if(dc.events[b4]){dc[b4](e,tmp[b].id,inGroups[0]);dc.fireEvent(b4+'Event',{event:e,info:tmp[b].id,group:inGroups[0]});}
if(dc.events[check]){dc[ev](e,tmp[b].id,inGroups[0]);dc.fireEvent(cev,{event:e,info:tmp[b].id,group:inGroups[0]});}}}}}},getBestMatch:function(dds){var winner=null;var len=dds.length;if(len==1){winner=dds[0];}else{for(var i=0;i<len;++i){var dd=dds[i];if(this.mode==this.INTERSECT&&dd.cursorIsOver){winner=dd;break;}else{if(!winner||!winner.overlap||(dd.overlap&&winner.overlap.getArea()<dd.overlap.getArea())){winner=dd;}}}}
return winner;},refreshCache:function(groups){var g=groups||this.ids;for(var sGroup in g){if("string"!=typeof sGroup){continue;}
for(var i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(this.isTypeOfDD(oDD)){var loc=this.getLocation(oDD);if(loc){this.locationCache[oDD.id]=loc;}else{delete this.locationCache[oDD.id];}}}}},verifyEl:function(el){try{if(el){var parent=el.offsetParent;if(parent){return true;}}}catch(e){}
return false;},getLocation:function(oDD){if(!this.isTypeOfDD(oDD)){return null;}
var el=oDD.getEl(),pos,x1,x2,y1,y2,t,r,b,l;try{pos=YAHOO.util.Dom.getXY(el);}catch(e){}
if(!pos){return null;}
x1=pos[0];x2=x1+el.offsetWidth;y1=pos[1];y2=y1+el.offsetHeight;t=y1-oDD.padding[0];r=x2+oDD.padding[1];b=y2+oDD.padding[2];l=x1-oDD.padding[3];return new YAHOO.util.Region(t,r,b,l);},isOverTarget:function(pt,oTarget,intersect,curRegion){var loc=this.locationCache[oTarget.id];if(!loc||!this.useCache){loc=this.getLocation(oTarget);this.locationCache[oTarget.id]=loc;}
if(!loc){return false;}
oTarget.cursorIsOver=loc.contains(pt);var dc=this.dragCurrent;if(!dc||(!intersect&&!dc.constrainX&&!dc.constrainY)){return oTarget.cursorIsOver;}
oTarget.overlap=null;if(!curRegion){var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);}
var overlap=curRegion.intersect(loc);if(overlap){oTarget.overlap=overlap;return(intersect)?true:oTarget.cursorIsOver;}else{return false;}},_onUnload:function(e,me){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}
this._execOnAll("unreg",[]);this.ids={};},elementCache:{},getElWrapper:function(id){var oWrapper=this.elementCache[id];if(!oWrapper||!oWrapper.el){oWrapper=this.elementCache[id]=new this.ElementWrapper(YAHOO.util.Dom.get(id));}
return oWrapper;},getElement:function(id){return YAHOO.util.Dom.get(id);},getCss:function(id){var el=YAHOO.util.Dom.get(id);return(el)?el.style:null;},ElementWrapper:function(el){this.el=el||null;this.id=this.el&&el.id;this.css=this.el&&el.style;},getPosX:function(el){return YAHOO.util.Dom.getX(el);},getPosY:function(el){return YAHOO.util.Dom.getY(el);},swapNode:function(n1,n2){if(n1.swapNode){n1.swapNode(n2);}else{var p=n2.parentNode;var s=n2.nextSibling;if(s==n1){p.insertBefore(n1,n2);}else if(n2==n1.nextSibling){p.insertBefore(n2,n1);}else{n1.parentNode.replaceChild(n2,n1);p.insertBefore(n1,s);}}},getScroll:function(){var t,l,dde=document.documentElement,db=document.body;if(dde&&(dde.scrollTop||dde.scrollLeft)){t=dde.scrollTop;l=dde.scrollLeft;}else if(db){t=db.scrollTop;l=db.scrollLeft;}else{}
return{top:t,left:l};},getStyle:function(el,styleProp){return YAHOO.util.Dom.getStyle(el,styleProp);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(moveEl,targetEl){var aCoord=YAHOO.util.Dom.getXY(targetEl);YAHOO.util.Dom.setXY(moveEl,aCoord);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(a,b){return(a-b);},_timeoutCount:0,_addListeners:function(){var DDM=YAHOO.util.DDM;if(YAHOO.util.Event&&document){DDM._onLoad();}else{if(DDM._timeoutCount>2000){}else{setTimeout(DDM._addListeners,10);if(document&&document.body){DDM._timeoutCount+=1;}}}},handleWasClicked:function(node,id){if(this.isHandle(id,node.id)){return true;}else{var p=node.parentNode;while(p){if(this.isHandle(id,p.id)){return true;}else{p=p.parentNode;}}}
return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}
(function(){var Event=YAHOO.util.Event;var Dom=YAHOO.util.Dom;YAHOO.util.DragDrop=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.util.DragDrop.prototype={events:null,on:function(){this.subscribe.apply(this,arguments);},id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,dragOnly:false,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(x,y){},startDrag:function(x,y){},b4Drag:function(e){},onDrag:function(e){},onDragEnter:function(e,id){},b4DragOver:function(e){},onDragOver:function(e,id){},b4DragOut:function(e){},onDragOut:function(e,id){},b4DragDrop:function(e){},onDragDrop:function(e,id){},onInvalidDrop:function(e){},b4EndDrag:function(e){},endDrag:function(e){},b4MouseDown:function(e){},onMouseDown:function(e){},onMouseUp:function(e){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=Dom.get(this.id);}
return this._domRef;},getDragEl:function(){return Dom.get(this.dragElId);},init:function(id,sGroup,config){this.initTarget(id,sGroup,config);Event.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);for(var i in this.events){this.createEvent(i+'Event');}},initTarget:function(id,sGroup,config){this.config=config||{};this.events={};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof id!=="string"){this._domRef=id;id=Dom.generateId(id);}
this.id=id;this.addToGroup((sGroup)?sGroup:"default");this.handleElId=id;Event.onAvailable(id,this.handleOnAvailable,this,true);this.setDragElId(id);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.events={mouseDown:true,b4MouseDown:true,mouseUp:true,b4StartDrag:true,startDrag:true,b4EndDrag:true,endDrag:true,drag:true,b4Drag:true,invalidDrop:true,b4DragOut:true,dragOut:true,dragEnter:true,b4DragOver:true,dragOver:true,b4DragDrop:true,dragDrop:true};if(this.config.events){for(var i in this.config.events){if(this.config.events[i]===false){this.events[i]=false;}}}
this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);this.dragOnly=((this.config.dragOnly===true)?true:false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(iTop,iRight,iBot,iLeft){if(!iRight&&0!==iRight){this.padding=[iTop,iTop,iTop,iTop];}else if(!iBot&&0!==iBot){this.padding=[iTop,iRight,iTop,iRight];}else{this.padding=[iTop,iRight,iBot,iLeft];}},setInitPosition:function(diffX,diffY){var el=this.getEl();if(!this.DDM.verifyEl(el)){if(el&&el.style&&(el.style.display=='none')){}else{}
return;}
var dx=diffX||0;var dy=diffY||0;var p=Dom.getXY(el);this.initPageX=p[0]-dx;this.initPageY=p[1]-dy;this.lastPageX=p[0];this.lastPageY=p[1];this.setStartPosition(p);},setStartPosition:function(pos){var p=pos||Dom.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=p[0];this.startPageY=p[1];},addToGroup:function(sGroup){this.groups[sGroup]=true;this.DDM.regDragDrop(this,sGroup);},removeFromGroup:function(sGroup){if(this.groups[sGroup]){delete this.groups[sGroup];}
this.DDM.removeDDFromGroup(this,sGroup);},setDragElId:function(id){this.dragElId=id;},setHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.handleElId=id;this.DDM.regHandle(this.id,id);},setOuterHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
Event.on(id,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(id);this.hasOuterHandles=true;},unreg:function(){Event.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(e,oDD){var button=e.which||e.button;if(this.primaryButtonOnly&&button>1){return;}
if(this.isLocked()){return;}
var b4Return=this.b4MouseDown(e);if(this.events.b4MouseDown){b4Return=this.fireEvent('b4MouseDownEvent',e);}
var mDownReturn=this.onMouseDown(e);if(this.events.mouseDown){mDownReturn=this.fireEvent('mouseDownEvent',e);}
if((b4Return===false)||(mDownReturn===false)){return;}
this.DDM.refreshCache(this.groups);var pt=new YAHOO.util.Point(Event.getPageX(e),Event.getPageY(e));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(pt,this)){}else{if(this.clickValidator(e)){this.setStartPosition();this.DDM.handleMouseDown(e,this);this.DDM.stopEvent(e);}else{}}},clickValidator:function(e){var target=YAHOO.util.Event.getTarget(e);return(this.isValidHandleChild(target)&&(this.id==this.handleElId||this.DDM.handleWasClicked(target,this.id)));},getTargetCoord:function(iPageX,iPageY){var x=iPageX-this.deltaX;var y=iPageY-this.deltaY;if(this.constrainX){if(x<this.minX){x=this.minX;}
if(x>this.maxX){x=this.maxX;}}
if(this.constrainY){if(y<this.minY){y=this.minY;}
if(y>this.maxY){y=this.maxY;}}
x=this.getTick(x,this.xTicks);y=this.getTick(y,this.yTicks);return{x:x,y:y};},addInvalidHandleType:function(tagName){var type=tagName.toUpperCase();this.invalidHandleTypes[type]=type;},addInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.invalidHandleIds[id]=id;},addInvalidHandleClass:function(cssClass){this.invalidHandleClasses.push(cssClass);},removeInvalidHandleType:function(tagName){var type=tagName.toUpperCase();delete this.invalidHandleTypes[type];},removeInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
delete this.invalidHandleIds[id];},removeInvalidHandleClass:function(cssClass){for(var i=0,len=this.invalidHandleClasses.length;i<len;++i){if(this.invalidHandleClasses[i]==cssClass){delete this.invalidHandleClasses[i];}}},isValidHandleChild:function(node){var valid=true;var nodeName;try{nodeName=node.nodeName.toUpperCase();}catch(e){nodeName=node.nodeName;}
valid=valid&&!this.invalidHandleTypes[nodeName];valid=valid&&!this.invalidHandleIds[node.id];for(var i=0,len=this.invalidHandleClasses.length;valid&&i<len;++i){valid=!Dom.hasClass(node,this.invalidHandleClasses[i]);}
return valid;},setXTicks:function(iStartX,iTickSize){this.xTicks=[];this.xTickSize=iTickSize;var tickMap={};for(var i=this.initPageX;i>=this.minX;i=i-iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageX;i<=this.maxX;i=i+iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(iStartY,iTickSize){this.yTicks=[];this.yTickSize=iTickSize;var tickMap={};for(var i=this.initPageY;i>=this.minY;i=i-iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageY;i<=this.maxY;i=i+iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(iLeft,iRight,iTickSize){this.leftConstraint=parseInt(iLeft,10);this.rightConstraint=parseInt(iRight,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(iTickSize){this.setXTicks(this.initPageX,iTickSize);}
this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(iUp,iDown,iTickSize){this.topConstraint=parseInt(iUp,10);this.bottomConstraint=parseInt(iDown,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(iTickSize){this.setYTicks(this.initPageY,iTickSize);}
this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var dx=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var dy=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(dx,dy);}else{this.setInitPosition();}
if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}
if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(val,tickArray){if(!tickArray){return val;}else if(tickArray[0]>=val){return tickArray[0];}else{for(var i=0,len=tickArray.length;i<len;++i){var next=i+1;if(tickArray[next]&&tickArray[next]>=val){var diff1=val-tickArray[i];var diff2=tickArray[next]-val;return(diff2>diff1)?tickArray[i]:tickArray[next];}}
return tickArray[tickArray.length-1];}},toString:function(){return("DragDrop "+this.id);}};YAHOO.augment(YAHOO.util.DragDrop,YAHOO.util.EventProvider);})();YAHOO.util.DD=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(iPageX,iPageY){var x=iPageX-this.startPageX;var y=iPageY-this.startPageY;this.setDelta(x,y);},setDelta:function(iDeltaX,iDeltaY){this.deltaX=iDeltaX;this.deltaY=iDeltaY;},setDragElPos:function(iPageX,iPageY){var el=this.getDragEl();this.alignElWithMouse(el,iPageX,iPageY);},alignElWithMouse:function(el,iPageX,iPageY){var oCoord=this.getTargetCoord(iPageX,iPageY);if(!this.deltaSetXY){var aCoord=[oCoord.x,oCoord.y];YAHOO.util.Dom.setXY(el,aCoord);var newLeft=parseInt(YAHOO.util.Dom.getStyle(el,"left"),10);var newTop=parseInt(YAHOO.util.Dom.getStyle(el,"top"),10);this.deltaSetXY=[newLeft-oCoord.x,newTop-oCoord.y];}else{YAHOO.util.Dom.setStyle(el,"left",(oCoord.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(el,"top",(oCoord.y+this.deltaSetXY[1])+"px");}
this.cachePosition(oCoord.x,oCoord.y);var self=this;setTimeout(function(){self.autoScroll.call(self,oCoord.x,oCoord.y,el.offsetHeight,el.offsetWidth);},0);},cachePosition:function(iPageX,iPageY){if(iPageX){this.lastPageX=iPageX;this.lastPageY=iPageY;}else{var aCoord=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=aCoord[0];this.lastPageY=aCoord[1];}},autoScroll:function(x,y,h,w){if(this.scroll){var clientH=this.DDM.getClientHeight();var clientW=this.DDM.getClientWidth();var st=this.DDM.getScrollTop();var sl=this.DDM.getScrollLeft();var bot=h+y;var right=w+x;var toBot=(clientH+st-y-this.deltaY);var toRight=(clientW+sl-x-this.deltaX);var thresh=40;var scrAmt=(document.all)?80:30;if(bot>clientH&&toBot<thresh){window.scrollTo(sl,st+scrAmt);}
if(y<st&&st>0&&y-st<thresh){window.scrollTo(sl,st-scrAmt);}
if(right>clientW&&toRight<thresh){window.scrollTo(sl+scrAmt,st);}
if(x<sl&&sl>0&&x-sl<thresh){window.scrollTo(sl-scrAmt,st);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(e){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},b4Drag:function(e){this.setDragElPos(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(id,sGroup,config){if(id){this.init(id,sGroup,config);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var self=this,body=document.body;if(!body||!body.firstChild){setTimeout(function(){self.createFrame();},50);return;}
var div=this.getDragEl(),Dom=YAHOO.util.Dom;if(!div){div=document.createElement("div");div.id=this.dragElId;var s=div.style;s.position="absolute";s.visibility="hidden";s.cursor="move";s.border="2px solid #aaa";s.zIndex=999;s.height="25px";s.width="25px";var _data=document.createElement('div');Dom.setStyle(_data,'height','100%');Dom.setStyle(_data,'width','100%');Dom.setStyle(_data,'background-color','#ccc');Dom.setStyle(_data,'opacity','0');div.appendChild(_data);if(YAHOO.env.ua.ie){var ifr=document.createElement('iframe');ifr.setAttribute('src','javascript:');ifr.setAttribute('scrolling','no');ifr.setAttribute('frameborder','0');div.insertBefore(ifr,div.firstChild);Dom.setStyle(ifr,'height','100%');Dom.setStyle(ifr,'width','100%');Dom.setStyle(ifr,'position','absolute');Dom.setStyle(ifr,'top','0');Dom.setStyle(ifr,'left','0');Dom.setStyle(ifr,'opacity','0');Dom.setStyle(ifr,'zIndex','-1');Dom.setStyle(ifr.nextSibling,'zIndex','2');}
body.insertBefore(div,body.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(iPageX,iPageY){var el=this.getEl();var dragEl=this.getDragEl();var s=dragEl.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(s.width,10)/2),Math.round(parseInt(s.height,10)/2));}
this.setDragElPos(iPageX,iPageY);YAHOO.util.Dom.setStyle(dragEl,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var DOM=YAHOO.util.Dom;var el=this.getEl();var dragEl=this.getDragEl();var bt=parseInt(DOM.getStyle(dragEl,"borderTopWidth"),10);var br=parseInt(DOM.getStyle(dragEl,"borderRightWidth"),10);var bb=parseInt(DOM.getStyle(dragEl,"borderBottomWidth"),10);var bl=parseInt(DOM.getStyle(dragEl,"borderLeftWidth"),10);if(isNaN(bt)){bt=0;}
if(isNaN(br)){br=0;}
if(isNaN(bb)){bb=0;}
if(isNaN(bl)){bl=0;}
var newWidth=Math.max(0,el.offsetWidth-br-bl);var newHeight=Math.max(0,el.offsetHeight-bt-bb);DOM.setStyle(dragEl,"width",newWidth+"px");DOM.setStyle(dragEl,"height",newHeight+"px");}},b4MouseDown:function(e){this.setStartPosition();var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);this.autoOffset(x,y);},b4StartDrag:function(x,y){this.showFrame(x,y);},b4EndDrag:function(e){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(e){var DOM=YAHOO.util.Dom;var lel=this.getEl();var del=this.getDragEl();DOM.setStyle(del,"visibility","");DOM.setStyle(lel,"visibility","hidden");YAHOO.util.DDM.moveToEl(lel,del);DOM.setStyle(del,"visibility","hidden");DOM.setStyle(lel,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(id,sGroup,config){if(id){this.initTarget(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.5.2",build:"1076"});

(function(){YAHOO.util.Config=function(owner){if(owner){this.init(owner);}};var Lang=YAHOO.lang,CustomEvent=YAHOO.util.CustomEvent,Config=YAHOO.util.Config;Config.CONFIG_CHANGED_EVENT="configChanged";Config.BOOLEAN_TYPE="boolean";Config.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(owner){this.owner=owner;this.configChangedEvent=this.createEvent(Config.CONFIG_CHANGED_EVENT);this.configChangedEvent.signature=CustomEvent.LIST;this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];},checkBoolean:function(val){return(typeof val==Config.BOOLEAN_TYPE);},checkNumber:function(val){return(!isNaN(val));},fireEvent:function(key,value){var property=this.config[key];if(property&&property.event){property.event.fire(value);}},addProperty:function(key,propertyObject){key=key.toLowerCase();this.config[key]=propertyObject;propertyObject.event=this.createEvent(key,{scope:this.owner});propertyObject.event.signature=CustomEvent.LIST;propertyObject.key=key;if(propertyObject.handler){propertyObject.event.subscribe(propertyObject.handler,this.owner);}
this.setProperty(key,propertyObject.value,true);if(!propertyObject.suppressEvent){this.queueProperty(key,propertyObject.value);}},getConfig:function(){var cfg={},prop,property;for(prop in this.config){property=this.config[prop];if(property&&property.event){cfg[prop]=property.value;}}
return cfg;},getProperty:function(key){var property=this.config[key.toLowerCase()];if(property&&property.event){return property.value;}else{return undefined;}},resetProperty:function(key){key=key.toLowerCase();var property=this.config[key];if(property&&property.event){if(this.initialConfig[key]&&!Lang.isUndefined(this.initialConfig[key])){this.setProperty(key,this.initialConfig[key]);return true;}}else{return false;}},setProperty:function(key,value,silent){var property;key=key.toLowerCase();if(this.queueInProgress&&!silent){this.queueProperty(key,value);return true;}else{property=this.config[key];if(property&&property.event){if(property.validator&&!property.validator(value)){return false;}else{property.value=value;if(!silent){this.fireEvent(key,value);this.configChangedEvent.fire([key,value]);}
return true;}}else{return false;}}},queueProperty:function(key,value){key=key.toLowerCase();var property=this.config[key],foundDuplicate=false,iLen,queueItem,queueItemKey,queueItemValue,sLen,supercedesCheck,qLen,queueItemCheck,queueItemCheckKey,queueItemCheckValue,i,s,q;if(property&&property.event){if(!Lang.isUndefined(value)&&property.validator&&!property.validator(value)){return false;}else{if(!Lang.isUndefined(value)){property.value=value;}else{value=property.value;}
foundDuplicate=false;iLen=this.eventQueue.length;for(i=0;i<iLen;i++){queueItem=this.eventQueue[i];if(queueItem){queueItemKey=queueItem[0];queueItemValue=queueItem[1];if(queueItemKey==key){this.eventQueue[i]=null;this.eventQueue.push([key,(!Lang.isUndefined(value)?value:queueItemValue)]);foundDuplicate=true;break;}}}
if(!foundDuplicate&&!Lang.isUndefined(value)){this.eventQueue.push([key,value]);}}
if(property.supercedes){sLen=property.supercedes.length;for(s=0;s<sLen;s++){supercedesCheck=property.supercedes[s];qLen=this.eventQueue.length;for(q=0;q<qLen;q++){queueItemCheck=this.eventQueue[q];if(queueItemCheck){queueItemCheckKey=queueItemCheck[0];queueItemCheckValue=queueItemCheck[1];if(queueItemCheckKey==supercedesCheck.toLowerCase()){this.eventQueue.push([queueItemCheckKey,queueItemCheckValue]);this.eventQueue[q]=null;break;}}}}}
return true;}else{return false;}},refireEvent:function(key){key=key.toLowerCase();var property=this.config[key];if(property&&property.event&&!Lang.isUndefined(property.value)){if(this.queueInProgress){this.queueProperty(key);}else{this.fireEvent(key,property.value);}}},applyConfig:function(userConfig,init){var sKey,oConfig;if(init){oConfig={};for(sKey in userConfig){if(Lang.hasOwnProperty(userConfig,sKey)){oConfig[sKey.toLowerCase()]=userConfig[sKey];}}
this.initialConfig=oConfig;}
for(sKey in userConfig){if(Lang.hasOwnProperty(userConfig,sKey)){this.queueProperty(sKey,userConfig[sKey]);}}},refresh:function(){var prop;for(prop in this.config){this.refireEvent(prop);}},fireQueue:function(){var i,queueItem,key,value,property;this.queueInProgress=true;for(i=0;i<this.eventQueue.length;i++){queueItem=this.eventQueue[i];if(queueItem){key=queueItem[0];value=queueItem[1];property=this.config[key];property.value=value;this.fireEvent(key,value);}}
this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(key,handler,obj,override){var property=this.config[key.toLowerCase()];if(property&&property.event){if(!Config.alreadySubscribed(property.event,handler,obj)){property.event.subscribe(handler,obj,override);}
return true;}else{return false;}},unsubscribeFromConfigEvent:function(key,handler,obj){var property=this.config[key.toLowerCase()];if(property&&property.event){return property.event.unsubscribe(handler,obj);}else{return false;}},toString:function(){var output="Config";if(this.owner){output+=" ["+this.owner.toString()+"]";}
return output;},outputEventQueue:function(){var output="",queueItem,q,nQueue=this.eventQueue.length;for(q=0;q<nQueue;q++){queueItem=this.eventQueue[q];if(queueItem){output+=queueItem[0]+"="+queueItem[1]+", ";}}
return output;},destroy:function(){var oConfig=this.config,sProperty,oProperty;for(sProperty in oConfig){if(Lang.hasOwnProperty(oConfig,sProperty)){oProperty=oConfig[sProperty];oProperty.event.unsubscribeAll();oProperty.event=null;}}
this.configChangedEvent.unsubscribeAll();this.configChangedEvent=null;this.owner=null;this.config=null;this.initialConfig=null;this.eventQueue=null;}};Config.alreadySubscribed=function(evt,fn,obj){var nSubscribers=evt.subscribers.length,subsc,i;if(nSubscribers>0){i=nSubscribers-1;do{subsc=evt.subscribers[i];if(subsc&&subsc.obj==obj&&subsc.fn==fn){return true;}}
while(i--);}
return false;};YAHOO.lang.augmentProto(Config,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Module=function(el,userConfig){if(el){this.init(el,userConfig);}else{}};var Dom=YAHOO.util.Dom,Config=YAHOO.util.Config,Event=YAHOO.util.Event,CustomEvent=YAHOO.util.CustomEvent,Module=YAHOO.widget.Module,m_oModuleTemplate,m_oHeaderTemplate,m_oBodyTemplate,m_oFooterTemplate,EVENT_TYPES={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"},DEFAULT_CONFIG={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true},"APPEND_TO_DOCUMENT_BODY":{key:"appendtodocumentbody",value:false}};Module.IMG_ROOT=null;Module.IMG_ROOT_SSL=null;Module.CSS_MODULE="yui-module";Module.CSS_HEADER="hd";Module.CSS_BODY="bd";Module.CSS_FOOTER="ft";Module.RESIZE_MONITOR_SECURE_URL="javascript:false;";Module.textResizeEvent=new CustomEvent("textResize");function createModuleTemplate(){if(!m_oModuleTemplate){m_oModuleTemplate=document.createElement("div");m_oModuleTemplate.innerHTML=("<div class=\""+
Module.CSS_HEADER+"\"></div>"+"<div class=\""+
Module.CSS_BODY+"\"></div><div class=\""+
Module.CSS_FOOTER+"\"></div>");m_oHeaderTemplate=m_oModuleTemplate.firstChild;m_oBodyTemplate=m_oHeaderTemplate.nextSibling;m_oFooterTemplate=m_oBodyTemplate.nextSibling;}
return m_oModuleTemplate;}
function createHeader(){if(!m_oHeaderTemplate){createModuleTemplate();}
return(m_oHeaderTemplate.cloneNode(false));}
function createBody(){if(!m_oBodyTemplate){createModuleTemplate();}
return(m_oBodyTemplate.cloneNode(false));}
function createFooter(){if(!m_oFooterTemplate){createModuleTemplate();}
return(m_oFooterTemplate.cloneNode(false));}
Module.prototype={constructor:Module,element:null,header:null,body:null,footer:null,id:null,imageRoot:Module.IMG_ROOT,initEvents:function(){var SIGNATURE=CustomEvent.LIST;this.beforeInitEvent=this.createEvent(EVENT_TYPES.BEFORE_INIT);this.beforeInitEvent.signature=SIGNATURE;this.initEvent=this.createEvent(EVENT_TYPES.INIT);this.initEvent.signature=SIGNATURE;this.appendEvent=this.createEvent(EVENT_TYPES.APPEND);this.appendEvent.signature=SIGNATURE;this.beforeRenderEvent=this.createEvent(EVENT_TYPES.BEFORE_RENDER);this.beforeRenderEvent.signature=SIGNATURE;this.renderEvent=this.createEvent(EVENT_TYPES.RENDER);this.renderEvent.signature=SIGNATURE;this.changeHeaderEvent=this.createEvent(EVENT_TYPES.CHANGE_HEADER);this.changeHeaderEvent.signature=SIGNATURE;this.changeBodyEvent=this.createEvent(EVENT_TYPES.CHANGE_BODY);this.changeBodyEvent.signature=SIGNATURE;this.changeFooterEvent=this.createEvent(EVENT_TYPES.CHANGE_FOOTER);this.changeFooterEvent.signature=SIGNATURE;this.changeContentEvent=this.createEvent(EVENT_TYPES.CHANGE_CONTENT);this.changeContentEvent.signature=SIGNATURE;this.destroyEvent=this.createEvent(EVENT_TYPES.DESTORY);this.destroyEvent.signature=SIGNATURE;this.beforeShowEvent=this.createEvent(EVENT_TYPES.BEFORE_SHOW);this.beforeShowEvent.signature=SIGNATURE;this.showEvent=this.createEvent(EVENT_TYPES.SHOW);this.showEvent.signature=SIGNATURE;this.beforeHideEvent=this.createEvent(EVENT_TYPES.BEFORE_HIDE);this.beforeHideEvent.signature=SIGNATURE;this.hideEvent=this.createEvent(EVENT_TYPES.HIDE);this.hideEvent.signature=SIGNATURE;},platform:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1){return"windows";}else if(ua.indexOf("macintosh")!=-1){return"mac";}else{return false;}}(),browser:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf('opera')!=-1){return'opera';}else if(ua.indexOf('msie 7')!=-1){return'ie7';}else if(ua.indexOf('msie')!=-1){return'ie';}else if(ua.indexOf('safari')!=-1){return'safari';}else if(ua.indexOf('gecko')!=-1){return'gecko';}else{return false;}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){this.cfg.addProperty(DEFAULT_CONFIG.VISIBLE.key,{handler:this.configVisible,value:DEFAULT_CONFIG.VISIBLE.value,validator:DEFAULT_CONFIG.VISIBLE.validator});this.cfg.addProperty(DEFAULT_CONFIG.EFFECT.key,{suppressEvent:DEFAULT_CONFIG.EFFECT.suppressEvent,supercedes:DEFAULT_CONFIG.EFFECT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:DEFAULT_CONFIG.MONITOR_RESIZE.value});this.cfg.addProperty(DEFAULT_CONFIG.APPEND_TO_DOCUMENT_BODY.key,{value:DEFAULT_CONFIG.APPEND_TO_DOCUMENT_BODY.value});},init:function(el,userConfig){var elId,child;this.initEvents();this.beforeInitEvent.fire(Module);this.cfg=new Config(this);if(this.isSecure){this.imageRoot=Module.IMG_ROOT_SSL;}
if(typeof el=="string"){elId=el;el=document.getElementById(el);if(!el){el=(createModuleTemplate()).cloneNode(false);el.id=elId;}}
this.element=el;if(el.id){this.id=el.id;}
child=this.element.firstChild;if(child){var fndHd=false,fndBd=false,fndFt=false;do{if(1==child.nodeType){if(!fndHd&&Dom.hasClass(child,Module.CSS_HEADER)){this.header=child;fndHd=true;}else if(!fndBd&&Dom.hasClass(child,Module.CSS_BODY)){this.body=child;fndBd=true;}else if(!fndFt&&Dom.hasClass(child,Module.CSS_FOOTER)){this.footer=child;fndFt=true;}}}while((child=child.nextSibling));}
this.initDefaultConfig();Dom.addClass(this.element,Module.CSS_MODULE);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(!Config.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}
this.initEvent.fire(Module);},initResizeMonitor:function(){var isGeckoWin=(YAHOO.env.ua.gecko&&this.platform=="windows");if(isGeckoWin){var self=this;setTimeout(function(){self._initResizeMonitor();},0);}else{this._initResizeMonitor();}},_initResizeMonitor:function(){var oDoc,oIFrame,sHTML;function fireTextResize(){Module.textResizeEvent.fire();}
if(!YAHOO.env.ua.opera){oIFrame=Dom.get("_yuiResizeMonitor");var supportsCWResize=this._supportsCWResize();if(!oIFrame){oIFrame=document.createElement("iframe");if(this.isSecure&&Module.RESIZE_MONITOR_SECURE_URL&&YAHOO.env.ua.ie){oIFrame.src=Module.RESIZE_MONITOR_SECURE_URL;}
if(!supportsCWResize){sHTML=["<html><head><script ","type=\"text/javascript\">","window.onresize=function(){window.parent.","YAHOO.widget.Module.textResizeEvent.","fire();};<","\/script></head>","<body></body></html>"].join('');oIFrame.src="data:text/html;charset=utf-8,"+encodeURIComponent(sHTML);}
oIFrame.id="_yuiResizeMonitor";oIFrame.style.position="absolute";oIFrame.style.visibility="hidden";var db=document.body,fc=db.firstChild;if(fc){db.insertBefore(oIFrame,fc);}else{db.appendChild(oIFrame);}
oIFrame.style.width="10em";oIFrame.style.height="10em";oIFrame.style.top=(-1*oIFrame.offsetHeight)+"px";oIFrame.style.left=(-1*oIFrame.offsetWidth)+"px";oIFrame.style.borderWidth="0";oIFrame.style.visibility="visible";if(YAHOO.env.ua.webkit){oDoc=oIFrame.contentWindow.document;oDoc.open();oDoc.close();}}
if(oIFrame&&oIFrame.contentWindow){Module.textResizeEvent.subscribe(this.onDomResize,this,true);if(!Module.textResizeInitialized){if(supportsCWResize){if(!Event.on(oIFrame.contentWindow,"resize",fireTextResize)){Event.on(oIFrame,"resize",fireTextResize);}}
Module.textResizeInitialized=true;}
this.resizeMonitor=oIFrame;}}},_supportsCWResize:function(){var bSupported=true;if(YAHOO.env.ua.gecko&&YAHOO.env.ua.gecko<=1.8){bSupported=false;}
return bSupported;},onDomResize:function(e,obj){var nLeft=-1*this.resizeMonitor.offsetWidth,nTop=-1*this.resizeMonitor.offsetHeight;this.resizeMonitor.style.top=nTop+"px";this.resizeMonitor.style.left=nLeft+"px";},setHeader:function(headerContent){var oHeader=this.header||(this.header=createHeader());if(headerContent.nodeName){oHeader.innerHTML="";oHeader.appendChild(headerContent);}else{oHeader.innerHTML=headerContent;}
this.changeHeaderEvent.fire(headerContent);this.changeContentEvent.fire();},appendToHeader:function(element){var oHeader=this.header||(this.header=createHeader());oHeader.appendChild(element);this.changeHeaderEvent.fire(element);this.changeContentEvent.fire();},setBody:function(bodyContent){var oBody=this.body||(this.body=createBody());if(bodyContent.nodeName){oBody.innerHTML="";oBody.appendChild(bodyContent);}else{oBody.innerHTML=bodyContent;}
this.changeBodyEvent.fire(bodyContent);this.changeContentEvent.fire();},appendToBody:function(element){var oBody=this.body||(this.body=createBody());oBody.appendChild(element);this.changeBodyEvent.fire(element);this.changeContentEvent.fire();},setFooter:function(footerContent){var oFooter=this.footer||(this.footer=createFooter());if(footerContent.nodeName){oFooter.innerHTML="";oFooter.appendChild(footerContent);}else{oFooter.innerHTML=footerContent;}
this.changeFooterEvent.fire(footerContent);this.changeContentEvent.fire();},appendToFooter:function(element){var oFooter=this.footer||(this.footer=createFooter());oFooter.appendChild(element);this.changeFooterEvent.fire(element);this.changeContentEvent.fire();},render:function(appendToNode,moduleElement){var me=this,firstChild;function appendTo(parentNode){if(typeof parentNode=="string"){parentNode=document.getElementById(parentNode);}
if(parentNode){me._addToParent(parentNode,me.element);me.appendEvent.fire();}}
this.beforeRenderEvent.fire();if(!moduleElement){moduleElement=this.element;}
if(appendToNode){appendTo(appendToNode);}else{if(!Dom.inDocument(this.element)){return false;}}
if(this.header&&!Dom.inDocument(this.header)){firstChild=moduleElement.firstChild;if(firstChild){moduleElement.insertBefore(this.header,firstChild);}else{moduleElement.appendChild(this.header);}}
if(this.body&&!Dom.inDocument(this.body)){if(this.footer&&Dom.isAncestor(this.moduleElement,this.footer)){moduleElement.insertBefore(this.body,this.footer);}else{moduleElement.appendChild(this.body);}}
if(this.footer&&!Dom.inDocument(this.footer)){moduleElement.appendChild(this.footer);}
this.renderEvent.fire();return true;},destroy:function(){var parent,e;if(this.element){Event.purgeElement(this.element,true);parent=this.element.parentNode;}
if(parent){parent.removeChild(this.element);}
this.element=null;this.header=null;this.body=null;this.footer=null;Module.textResizeEvent.unsubscribe(this.onDomResize,this);this.cfg.destroy();this.cfg=null;this.destroyEvent.fire();for(e in this){if(e instanceof CustomEvent){e.unsubscribeAll();}}},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(type,args,obj){var visible=args[0];if(visible){this.beforeShowEvent.fire();Dom.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();Dom.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(type,args,obj){var monitor=args[0];if(monitor){this.initResizeMonitor();}else{Module.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}},_addToParent:function(parentNode,element){if(!this.cfg.getProperty("appendtodocumentbody")&&parentNode===document.body&&parentNode.firstChild){parentNode.insertBefore(element,parentNode.firstChild);}else{parentNode.appendChild(element);}},toString:function(){return"Module "+this.id;}};YAHOO.lang.augmentProto(Module,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Overlay=function(el,userConfig){YAHOO.widget.Overlay.superclass.constructor.call(this,el,userConfig);};var Lang=YAHOO.lang,CustomEvent=YAHOO.util.CustomEvent,Module=YAHOO.widget.Module,Event=YAHOO.util.Event,Dom=YAHOO.util.Dom,Config=YAHOO.util.Config,Overlay=YAHOO.widget.Overlay,m_oIFrameTemplate,EVENT_TYPES={"BEFORE_MOVE":"beforeMove","MOVE":"move"},DEFAULT_CONFIG={"X":{key:"x",validator:Lang.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:Lang.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,validator:Lang.isBoolean,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:Lang.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(YAHOO.env.ua.ie==6?true:false),validator:Lang.isBoolean,supercedes:["zindex"]}};Overlay.IFRAME_SRC="javascript:false;";Overlay.IFRAME_OFFSET=3;Overlay.VIEWPORT_OFFSET=10;Overlay.TOP_LEFT="tl";Overlay.TOP_RIGHT="tr";Overlay.BOTTOM_LEFT="bl";Overlay.BOTTOM_RIGHT="br";Overlay.CSS_OVERLAY="yui-overlay";Overlay.windowScrollEvent=new CustomEvent("windowScroll");Overlay.windowResizeEvent=new CustomEvent("windowResize");Overlay.windowScrollHandler=function(e){if(YAHOO.env.ua.ie){if(!window.scrollEnd){window.scrollEnd=-1;}
clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){Overlay.windowScrollEvent.fire();},1);}else{Overlay.windowScrollEvent.fire();}};Overlay.windowResizeHandler=function(e){if(YAHOO.env.ua.ie){if(!window.resizeEnd){window.resizeEnd=-1;}
clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){Overlay.windowResizeEvent.fire();},100);}else{Overlay.windowResizeEvent.fire();}};Overlay._initialized=null;if(Overlay._initialized===null){Event.on(window,"scroll",Overlay.windowScrollHandler);Event.on(window,"resize",Overlay.windowResizeHandler);Overlay._initialized=true;}
YAHOO.extend(Overlay,Module,{init:function(el,userConfig){Overlay.superclass.init.call(this,el);this.beforeInitEvent.fire(Overlay);Dom.addClass(this.element,Overlay.CSS_OVERLAY);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(this.platform=="mac"&&YAHOO.env.ua.gecko){if(!Config.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}
if(!Config.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}
this.initEvent.fire(Overlay);},initEvents:function(){Overlay.superclass.initEvents.call(this);var SIGNATURE=CustomEvent.LIST;this.beforeMoveEvent=this.createEvent(EVENT_TYPES.BEFORE_MOVE);this.beforeMoveEvent.signature=SIGNATURE;this.moveEvent=this.createEvent(EVENT_TYPES.MOVE);this.moveEvent.signature=SIGNATURE;},initDefaultConfig:function(){Overlay.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.X.key,{handler:this.configX,validator:DEFAULT_CONFIG.X.validator,suppressEvent:DEFAULT_CONFIG.X.suppressEvent,supercedes:DEFAULT_CONFIG.X.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.Y.key,{handler:this.configY,validator:DEFAULT_CONFIG.Y.validator,suppressEvent:DEFAULT_CONFIG.Y.suppressEvent,supercedes:DEFAULT_CONFIG.Y.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.XY.key,{handler:this.configXY,suppressEvent:DEFAULT_CONFIG.XY.suppressEvent,supercedes:DEFAULT_CONFIG.XY.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.CONTEXT.key,{handler:this.configContext,suppressEvent:DEFAULT_CONFIG.CONTEXT.suppressEvent,supercedes:DEFAULT_CONFIG.CONTEXT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.FIXED_CENTER.key,{handler:this.configFixedCenter,value:DEFAULT_CONFIG.FIXED_CENTER.value,validator:DEFAULT_CONFIG.FIXED_CENTER.validator,supercedes:DEFAULT_CONFIG.FIXED_CENTER.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.WIDTH.key,{handler:this.configWidth,suppressEvent:DEFAULT_CONFIG.WIDTH.suppressEvent,supercedes:DEFAULT_CONFIG.WIDTH.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.HEIGHT.key,{handler:this.configHeight,suppressEvent:DEFAULT_CONFIG.HEIGHT.suppressEvent,supercedes:DEFAULT_CONFIG.HEIGHT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.ZINDEX.key,{handler:this.configzIndex,value:DEFAULT_CONFIG.ZINDEX.value});this.cfg.addProperty(DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.value,validator:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.validator,supercedes:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.IFRAME.key,{handler:this.configIframe,value:DEFAULT_CONFIG.IFRAME.value,validator:DEFAULT_CONFIG.IFRAME.validator,supercedes:DEFAULT_CONFIG.IFRAME.supercedes});},moveTo:function(x,y){this.cfg.setProperty("xy",[x,y]);},hideMacGeckoScrollbars:function(){Dom.removeClass(this.element,"show-scrollbars");Dom.addClass(this.element,"hide-scrollbars");},showMacGeckoScrollbars:function(){Dom.removeClass(this.element,"hide-scrollbars");Dom.addClass(this.element,"show-scrollbars");},configVisible:function(type,args,obj){var visible=args[0],currentVis=Dom.getStyle(this.element,"visibility"),effect=this.cfg.getProperty("effect"),effectInstances=[],isMacGecko=(this.platform=="mac"&&YAHOO.env.ua.gecko),alreadySubscribed=Config.alreadySubscribed,eff,ei,e,i,j,k,h,nEffects,nEffectInstances;if(currentVis=="inherit"){e=this.element.parentNode;while(e.nodeType!=9&&e.nodeType!=11){currentVis=Dom.getStyle(e,"visibility");if(currentVis!="inherit"){break;}
e=e.parentNode;}
if(currentVis=="inherit"){currentVis="visible";}}
if(effect){if(effect instanceof Array){nEffects=effect.length;for(i=0;i<nEffects;i++){eff=effect[i];effectInstances[effectInstances.length]=eff.effect(this,eff.duration);}}else{effectInstances[effectInstances.length]=effect.effect(this,effect.duration);}}
if(visible){if(isMacGecko){this.showMacGeckoScrollbars();}
if(effect){if(visible){if(currentVis!="visible"||currentVis===""){this.beforeShowEvent.fire();nEffectInstances=effectInstances.length;for(j=0;j<nEffectInstances;j++){ei=effectInstances[j];if(j===0&&!alreadySubscribed(ei.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){ei.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}
ei.animateIn();}}}}else{if(currentVis!="visible"||currentVis===""){this.beforeShowEvent.fire();Dom.setStyle(this.element,"visibility","visible");this.cfg.refireEvent("iframe");this.showEvent.fire();}}}else{if(isMacGecko){this.hideMacGeckoScrollbars();}
if(effect){if(currentVis=="visible"){this.beforeHideEvent.fire();nEffectInstances=effectInstances.length;for(k=0;k<nEffectInstances;k++){h=effectInstances[k];if(k===0&&!alreadySubscribed(h.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){h.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}
h.animateOut();}}else if(currentVis===""){Dom.setStyle(this.element,"visibility","hidden");}}else{if(currentVis=="visible"||currentVis===""){this.beforeHideEvent.fire();Dom.setStyle(this.element,"visibility","hidden");this.hideEvent.fire();}}}},doCenterOnDOMEvent:function(){if(this.cfg.getProperty("visible")){this.center();}},configFixedCenter:function(type,args,obj){var val=args[0],alreadySubscribed=Config.alreadySubscribed,windowResizeEvent=Overlay.windowResizeEvent,windowScrollEvent=Overlay.windowScrollEvent;if(val){this.center();if(!alreadySubscribed(this.beforeShowEvent,this.center,this)){this.beforeShowEvent.subscribe(this.center);}
if(!alreadySubscribed(windowResizeEvent,this.doCenterOnDOMEvent,this)){windowResizeEvent.subscribe(this.doCenterOnDOMEvent,this,true);}
if(!alreadySubscribed(windowScrollEvent,this.doCenterOnDOMEvent,this)){windowScrollEvent.subscribe(this.doCenterOnDOMEvent,this,true);}}else{this.beforeShowEvent.unsubscribe(this.center);windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);}},configHeight:function(type,args,obj){var height=args[0],el=this.element;Dom.setStyle(el,"height",height);this.cfg.refireEvent("iframe");},configWidth:function(type,args,obj){var width=args[0],el=this.element;Dom.setStyle(el,"width",width);this.cfg.refireEvent("iframe");},configzIndex:function(type,args,obj){var zIndex=args[0],el=this.element;if(!zIndex){zIndex=Dom.getStyle(el,"zIndex");if(!zIndex||isNaN(zIndex)){zIndex=0;}}
if(this.iframe||this.cfg.getProperty("iframe")===true){if(zIndex<=0){zIndex=1;}}
Dom.setStyle(el,"zIndex",zIndex);this.cfg.setProperty("zIndex",zIndex,true);if(this.iframe){this.stackIframe();}},configXY:function(type,args,obj){var pos=args[0],x=pos[0],y=pos[1];this.cfg.setProperty("x",x);this.cfg.setProperty("y",y);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);},configX:function(type,args,obj){var x=args[0],y=this.cfg.getProperty("y");this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");Dom.setX(this.element,x,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);},configY:function(type,args,obj){var x=this.cfg.getProperty("x"),y=args[0];this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");Dom.setY(this.element,y,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);},showIframe:function(){var oIFrame=this.iframe,oParentNode;if(oIFrame){oParentNode=this.element.parentNode;if(oParentNode!=oIFrame.parentNode){this._addToParent(oParentNode,oIFrame);}
oIFrame.style.display="block";}},hideIframe:function(){if(this.iframe){this.iframe.style.display="none";}},syncIframe:function(){var oIFrame=this.iframe,oElement=this.element,nOffset=Overlay.IFRAME_OFFSET,nDimensionOffset=(nOffset*2),aXY;if(oIFrame){oIFrame.style.width=(oElement.offsetWidth+nDimensionOffset+"px");oIFrame.style.height=(oElement.offsetHeight+nDimensionOffset+"px");aXY=this.cfg.getProperty("xy");if(!Lang.isArray(aXY)||(isNaN(aXY[0])||isNaN(aXY[1]))){this.syncPosition();aXY=this.cfg.getProperty("xy");}
Dom.setXY(oIFrame,[(aXY[0]-nOffset),(aXY[1]-nOffset)]);}},stackIframe:function(){if(this.iframe){var overlayZ=Dom.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(overlayZ)&&!isNaN(overlayZ)){Dom.setStyle(this.iframe,"zIndex",(overlayZ-1));}}},configIframe:function(type,args,obj){var bIFrame=args[0];function createIFrame(){var oIFrame=this.iframe,oElement=this.element,oParent;if(!oIFrame){if(!m_oIFrameTemplate){m_oIFrameTemplate=document.createElement("iframe");if(this.isSecure){m_oIFrameTemplate.src=Overlay.IFRAME_SRC;}
if(YAHOO.env.ua.ie){m_oIFrameTemplate.style.filter="alpha(opacity=0)";m_oIFrameTemplate.frameBorder=0;}
else{m_oIFrameTemplate.style.opacity="0";}
m_oIFrameTemplate.style.position="absolute";m_oIFrameTemplate.style.border="none";m_oIFrameTemplate.style.margin="0";m_oIFrameTemplate.style.padding="0";m_oIFrameTemplate.style.display="none";}
oIFrame=m_oIFrameTemplate.cloneNode(false);oParent=oElement.parentNode;var parentNode=oParent||document.body;this._addToParent(parentNode,oIFrame);this.iframe=oIFrame;}
this.showIframe();this.syncIframe();this.stackIframe();if(!this._hasIframeEventListeners){this.showEvent.subscribe(this.showIframe);this.hideEvent.subscribe(this.hideIframe);this.changeContentEvent.subscribe(this.syncIframe);this._hasIframeEventListeners=true;}}
function onBeforeShow(){createIFrame.call(this);this.beforeShowEvent.unsubscribe(onBeforeShow);this._iframeDeferred=false;}
if(bIFrame){if(this.cfg.getProperty("visible")){createIFrame.call(this);}else{if(!this._iframeDeferred){this.beforeShowEvent.subscribe(onBeforeShow);this._iframeDeferred=true;}}}else{this.hideIframe();if(this._hasIframeEventListeners){this.showEvent.unsubscribe(this.showIframe);this.hideEvent.unsubscribe(this.hideIframe);this.changeContentEvent.unsubscribe(this.syncIframe);this._hasIframeEventListeners=false;}}},_primeXYFromDOM:function(){if(YAHOO.lang.isUndefined(this.cfg.getProperty("xy"))){this.syncPosition();this.cfg.refireEvent("xy");this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);}},configConstrainToViewport:function(type,args,obj){var val=args[0];if(val){if(!Config.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}
if(!Config.alreadySubscribed(this.beforeShowEvent,this._primeXYFromDOM)){this.beforeShowEvent.subscribe(this._primeXYFromDOM);}}else{this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}},configContext:function(type,args,obj){var contextArgs=args[0],contextEl,elementMagnetCorner,contextMagnetCorner;if(contextArgs){contextEl=contextArgs[0];elementMagnetCorner=contextArgs[1];contextMagnetCorner=contextArgs[2];if(contextEl){if(typeof contextEl=="string"){this.cfg.setProperty("context",[document.getElementById(contextEl),elementMagnetCorner,contextMagnetCorner],true);}
if(elementMagnetCorner&&contextMagnetCorner){this.align(elementMagnetCorner,contextMagnetCorner);}}}},align:function(elementAlign,contextAlign){var contextArgs=this.cfg.getProperty("context"),me=this,context,element,contextRegion;function doAlign(v,h){switch(elementAlign){case Overlay.TOP_LEFT:me.moveTo(h,v);break;case Overlay.TOP_RIGHT:me.moveTo((h-element.offsetWidth),v);break;case Overlay.BOTTOM_LEFT:me.moveTo(h,(v-element.offsetHeight));break;case Overlay.BOTTOM_RIGHT:me.moveTo((h-element.offsetWidth),(v-element.offsetHeight));break;}}
if(contextArgs){context=contextArgs[0];element=this.element;me=this;if(!elementAlign){elementAlign=contextArgs[1];}
if(!contextAlign){contextAlign=contextArgs[2];}
if(element&&context){contextRegion=Dom.getRegion(context);switch(contextAlign){case Overlay.TOP_LEFT:doAlign(contextRegion.top,contextRegion.left);break;case Overlay.TOP_RIGHT:doAlign(contextRegion.top,contextRegion.right);break;case Overlay.BOTTOM_LEFT:doAlign(contextRegion.bottom,contextRegion.left);break;case Overlay.BOTTOM_RIGHT:doAlign(contextRegion.bottom,contextRegion.right);break;}}}},enforceConstraints:function(type,args,obj){var pos=args[0];var cXY=this.getConstrainedXY(pos[0],pos[1]);this.cfg.setProperty("x",cXY[0],true);this.cfg.setProperty("y",cXY[1],true);this.cfg.setProperty("xy",cXY,true);},getConstrainedXY:function(x,y){var nViewportOffset=Overlay.VIEWPORT_OFFSET,viewPortWidth=Dom.getViewportWidth(),viewPortHeight=Dom.getViewportHeight(),offsetHeight=this.element.offsetHeight,offsetWidth=this.element.offsetWidth,scrollX=Dom.getDocumentScrollLeft(),scrollY=Dom.getDocumentScrollTop();var xNew=x;var yNew=y;if(offsetWidth+nViewportOffset<viewPortWidth){var leftConstraint=scrollX+nViewportOffset;var rightConstraint=scrollX+viewPortWidth-offsetWidth-nViewportOffset;if(x<leftConstraint){xNew=leftConstraint;}else if(x>rightConstraint){xNew=rightConstraint;}}else{xNew=nViewportOffset+scrollX;}
if(offsetHeight+nViewportOffset<viewPortHeight){var topConstraint=scrollY+nViewportOffset;var bottomConstraint=scrollY+viewPortHeight-offsetHeight-nViewportOffset;if(y<topConstraint){yNew=topConstraint;}else if(y>bottomConstraint){yNew=bottomConstraint;}}else{yNew=nViewportOffset+scrollY;}
return[xNew,yNew];},center:function(){var nViewportOffset=Overlay.VIEWPORT_OFFSET,elementWidth=this.element.offsetWidth,elementHeight=this.element.offsetHeight,viewPortWidth=Dom.getViewportWidth(),viewPortHeight=Dom.getViewportHeight(),x,y;if(elementWidth<viewPortWidth){x=(viewPortWidth/2)-(elementWidth/2)+Dom.getDocumentScrollLeft();}else{x=nViewportOffset+Dom.getDocumentScrollLeft();}
if(elementHeight<viewPortHeight){y=(viewPortHeight/2)-(elementHeight/2)+Dom.getDocumentScrollTop();}else{y=nViewportOffset+Dom.getDocumentScrollTop();}
this.cfg.setProperty("xy",[parseInt(x,10),parseInt(y,10)]);this.cfg.refireEvent("iframe");},syncPosition:function(){var pos=Dom.getXY(this.element);this.cfg.setProperty("x",pos[0],true);this.cfg.setProperty("y",pos[1],true);this.cfg.setProperty("xy",pos,true);},onDomResize:function(e,obj){var me=this;Overlay.superclass.onDomResize.call(this,e,obj);setTimeout(function(){me.syncPosition();me.cfg.refireEvent("iframe");me.cfg.refireEvent("context");},0);},bringToTop:function(){var aOverlays=[],oElement=this.element;function compareZIndexDesc(p_oOverlay1,p_oOverlay2){var sZIndex1=Dom.getStyle(p_oOverlay1,"zIndex"),sZIndex2=Dom.getStyle(p_oOverlay2,"zIndex"),nZIndex1=(!sZIndex1||isNaN(sZIndex1))?0:parseInt(sZIndex1,10),nZIndex2=(!sZIndex2||isNaN(sZIndex2))?0:parseInt(sZIndex2,10);if(nZIndex1>nZIndex2){return-1;}else if(nZIndex1<nZIndex2){return 1;}else{return 0;}}
function isOverlayElement(p_oElement){var oOverlay=Dom.hasClass(p_oElement,Overlay.CSS_OVERLAY),Panel=YAHOO.widget.Panel;if(oOverlay&&!Dom.isAncestor(oElement,oOverlay)){if(Panel&&Dom.hasClass(p_oElement,Panel.CSS_PANEL)){aOverlays[aOverlays.length]=p_oElement.parentNode;}else{aOverlays[aOverlays.length]=p_oElement;}}}
Dom.getElementsBy(isOverlayElement,"DIV",document.body);aOverlays.sort(compareZIndexDesc);var oTopOverlay=aOverlays[0],nTopZIndex;if(oTopOverlay){nTopZIndex=Dom.getStyle(oTopOverlay,"zIndex");if(!isNaN(nTopZIndex)){var bRequiresBump=false;if(oTopOverlay!=oElement){bRequiresBump=true;}else if(aOverlays.length>1){var nNextZIndex=Dom.getStyle(aOverlays[1],"zIndex");if(!isNaN(nNextZIndex)&&(nTopZIndex==nNextZIndex)){bRequiresBump=true;}}
if(bRequiresBump){this.cfg.setProperty("zindex",(parseInt(nTopZIndex,10)+2));}}}},destroy:function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}
this.iframe=null;Overlay.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);Overlay.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);Overlay.superclass.destroy.call(this);},toString:function(){return"Overlay "+this.id;}});}());(function(){YAHOO.widget.OverlayManager=function(userConfig){this.init(userConfig);};var Overlay=YAHOO.widget.Overlay,Event=YAHOO.util.Event,Dom=YAHOO.util.Dom,Config=YAHOO.util.Config,CustomEvent=YAHOO.util.CustomEvent,OverlayManager=YAHOO.widget.OverlayManager;OverlayManager.CSS_FOCUSED="focused";OverlayManager.prototype={constructor:OverlayManager,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(userConfig){this.cfg=new Config(this);this.initDefaultConfig();if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.cfg.fireQueue();var activeOverlay=null;this.getActive=function(){return activeOverlay;};this.focus=function(overlay){var o=this.find(overlay);if(o){if(activeOverlay!=o){if(activeOverlay){activeOverlay.blur();}
this.bringToTop(o);activeOverlay=o;Dom.addClass(activeOverlay.element,OverlayManager.CSS_FOCUSED);o.focusEvent.fire();}}};this.remove=function(overlay){var o=this.find(overlay),originalZ;if(o){if(activeOverlay==o){activeOverlay=null;}
var bDestroyed=(o.element===null&&o.cfg===null)?true:false;if(!bDestroyed){originalZ=Dom.getStyle(o.element,"zIndex");o.cfg.setProperty("zIndex",-1000,true);}
this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,(this.overlays.length-1));o.hideEvent.unsubscribe(o.blur);o.destroyEvent.unsubscribe(this._onOverlayDestroy,o);if(!bDestroyed){Event.removeListener(o.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);o.cfg.setProperty("zIndex",originalZ,true);o.cfg.setProperty("manager",null);}
o.focusEvent.unsubscribeAll();o.blurEvent.unsubscribeAll();o.focusEvent=null;o.blurEvent=null;o.focus=null;o.blur=null;}};this.blurAll=function(){var nOverlays=this.overlays.length,i;if(nOverlays>0){i=nOverlays-1;do{this.overlays[i].blur();}
while(i--);}};this._onOverlayBlur=function(p_sType,p_aArgs){activeOverlay=null;};var overlays=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}
if(overlays){this.register(overlays);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(p_oEvent){var oTarget=Event.getTarget(p_oEvent),oClose=this.close;if(oClose&&(oTarget==oClose||Dom.isAncestor(oClose,oTarget))){this.blur();}else{this.focus();}},_onOverlayDestroy:function(p_sType,p_aArgs,p_oOverlay){this.remove(p_oOverlay);},register:function(overlay){var mgr=this,zIndex,regcount,i,nOverlays;if(overlay instanceof Overlay){overlay.cfg.addProperty("manager",{value:this});overlay.focusEvent=overlay.createEvent("focus");overlay.focusEvent.signature=CustomEvent.LIST;overlay.blurEvent=overlay.createEvent("blur");overlay.blurEvent.signature=CustomEvent.LIST;overlay.focus=function(){mgr.focus(this);};overlay.blur=function(){if(mgr.getActive()==this){Dom.removeClass(this.element,OverlayManager.CSS_FOCUSED);this.blurEvent.fire();}};overlay.blurEvent.subscribe(mgr._onOverlayBlur);overlay.hideEvent.subscribe(overlay.blur);overlay.destroyEvent.subscribe(this._onOverlayDestroy,overlay,this);Event.on(overlay.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus,null,overlay);zIndex=Dom.getStyle(overlay.element,"zIndex");if(!isNaN(zIndex)){overlay.cfg.setProperty("zIndex",parseInt(zIndex,10));}else{overlay.cfg.setProperty("zIndex",0);}
this.overlays.push(overlay);this.bringToTop(overlay);return true;}else if(overlay instanceof Array){regcount=0;nOverlays=overlay.length;for(i=0;i<nOverlays;i++){if(this.register(overlay[i])){regcount++;}}
if(regcount>0){return true;}}else{return false;}},bringToTop:function(p_oOverlay){var oOverlay=this.find(p_oOverlay),nTopZIndex,oTopOverlay,aOverlays;if(oOverlay){aOverlays=this.overlays;aOverlays.sort(this.compareZIndexDesc);oTopOverlay=aOverlays[0];if(oTopOverlay){nTopZIndex=Dom.getStyle(oTopOverlay.element,"zIndex");if(!isNaN(nTopZIndex)){var bRequiresBump=false;if(oTopOverlay!==oOverlay){bRequiresBump=true;}else if(aOverlays.length>1){var nNextZIndex=Dom.getStyle(aOverlays[1].element,"zIndex");if(!isNaN(nNextZIndex)&&(nTopZIndex==nNextZIndex)){bRequiresBump=true;}}
if(bRequiresBump){oOverlay.cfg.setProperty("zindex",(parseInt(nTopZIndex,10)+2));}}
aOverlays.sort(this.compareZIndexDesc);}}},find:function(overlay){var aOverlays=this.overlays,nOverlays=aOverlays.length,i;if(nOverlays>0){i=nOverlays-1;if(overlay instanceof Overlay){do{if(aOverlays[i]==overlay){return aOverlays[i];}}
while(i--);}else if(typeof overlay=="string"){do{if(aOverlays[i].id==overlay){return aOverlays[i];}}
while(i--);}
return null;}},compareZIndexDesc:function(o1,o2){var zIndex1=(o1.cfg)?o1.cfg.getProperty("zIndex"):null,zIndex2=(o2.cfg)?o2.cfg.getProperty("zIndex"):null;if(zIndex1===null&&zIndex2===null){return 0;}else if(zIndex1===null){return 1;}else if(zIndex2===null){return-1;}else if(zIndex1>zIndex2){return-1;}else if(zIndex1<zIndex2){return 1;}else{return 0;}},showAll:function(){var aOverlays=this.overlays,nOverlays=aOverlays.length,i;if(nOverlays>0){i=nOverlays-1;do{aOverlays[i].show();}
while(i--);}},hideAll:function(){var aOverlays=this.overlays,nOverlays=aOverlays.length,i;if(nOverlays>0){i=nOverlays-1;do{aOverlays[i].hide();}
while(i--);}},toString:function(){return"OverlayManager";}};}());(function(){YAHOO.widget.Tooltip=function(el,userConfig){YAHOO.widget.Tooltip.superclass.constructor.call(this,el,userConfig);};var Lang=YAHOO.lang,Event=YAHOO.util.Event,CustomEvent=YAHOO.util.CustomEvent,Dom=YAHOO.util.Dom,Tooltip=YAHOO.widget.Tooltip,m_oShadowTemplate,DEFAULT_CONFIG={"PREVENT_OVERLAP":{key:"preventoverlap",value:true,validator:Lang.isBoolean,supercedes:["x","y","xy"]},"SHOW_DELAY":{key:"showdelay",value:200,validator:Lang.isNumber},"AUTO_DISMISS_DELAY":{key:"autodismissdelay",value:5000,validator:Lang.isNumber},"HIDE_DELAY":{key:"hidedelay",value:250,validator:Lang.isNumber},"TEXT":{key:"text",suppressEvent:true},"CONTAINER":{key:"container"},"DISABLED":{key:"disabled",value:false,suppressEvent:true}},EVENT_TYPES={"CONTEXT_MOUSE_OVER":"contextMouseOver","CONTEXT_MOUSE_OUT":"contextMouseOut","CONTEXT_TRIGGER":"contextTrigger"};Tooltip.CSS_TOOLTIP="yui-tt";function restoreOriginalWidth(p_sType,p_aArgs,p_oObject){var sOriginalWidth=p_oObject[0],sNewWidth=p_oObject[1],oConfig=this.cfg,sCurrentWidth=oConfig.getProperty("width");if(sCurrentWidth==sNewWidth){oConfig.setProperty("width",sOriginalWidth);}
this.unsubscribe("hide",this._onHide,p_oObject);}
function setWidthToOffsetWidth(p_sType,p_aArgs){var oBody=document.body,oConfig=this.cfg,sOriginalWidth=oConfig.getProperty("width"),sNewWidth,oClone;if((!sOriginalWidth||sOriginalWidth=="auto")&&(oConfig.getProperty("container")!=oBody||oConfig.getProperty("x")>=Dom.getViewportWidth()||oConfig.getProperty("y")>=Dom.getViewportHeight())){oClone=this.element.cloneNode(true);oClone.style.visibility="hidden";oClone.style.top="0px";oClone.style.left="0px";oBody.appendChild(oClone);sNewWidth=(oClone.offsetWidth+"px");oBody.removeChild(oClone);oClone=null;oConfig.setProperty("width",sNewWidth);oConfig.refireEvent("xy");this.subscribe("hide",restoreOriginalWidth,[(sOriginalWidth||""),sNewWidth]);}}
function onDOMReady(p_sType,p_aArgs,p_oObject){this.render(p_oObject);}
function onInit(){Event.onDOMReady(onDOMReady,this.cfg.getProperty("container"),this);}
YAHOO.extend(Tooltip,YAHOO.widget.Overlay,{init:function(el,userConfig){Tooltip.superclass.init.call(this,el);this.beforeInitEvent.fire(Tooltip);Dom.addClass(this.element,Tooltip.CSS_TOOLTIP);if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.cfg.queueProperty("visible",false);this.cfg.queueProperty("constraintoviewport",true);this.setBody("");this.subscribe("beforeShow",setWidthToOffsetWidth);this.subscribe("init",onInit);this.subscribe("render",this.onRender);this.initEvent.fire(Tooltip);},initEvents:function(){Tooltip.superclass.initEvents.call(this);var SIGNATURE=CustomEvent.LIST;this.contextMouseOverEvent=this.createEvent(EVENT_TYPES.CONTEXT_MOUSE_OVER);this.contextMouseOverEvent.signature=SIGNATURE;this.contextMouseOutEvent=this.createEvent(EVENT_TYPES.CONTEXT_MOUSE_OUT);this.contextMouseOutEvent.signature=SIGNATURE;this.contextTriggerEvent=this.createEvent(EVENT_TYPES.CONTEXT_TRIGGER);this.contextTriggerEvent.signature=SIGNATURE;},initDefaultConfig:function(){Tooltip.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.PREVENT_OVERLAP.key,{value:DEFAULT_CONFIG.PREVENT_OVERLAP.value,validator:DEFAULT_CONFIG.PREVENT_OVERLAP.validator,supercedes:DEFAULT_CONFIG.PREVENT_OVERLAP.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.SHOW_DELAY.key,{handler:this.configShowDelay,value:200,validator:DEFAULT_CONFIG.SHOW_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.AUTO_DISMISS_DELAY.key,{handler:this.configAutoDismissDelay,value:DEFAULT_CONFIG.AUTO_DISMISS_DELAY.value,validator:DEFAULT_CONFIG.AUTO_DISMISS_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.HIDE_DELAY.key,{handler:this.configHideDelay,value:DEFAULT_CONFIG.HIDE_DELAY.value,validator:DEFAULT_CONFIG.HIDE_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.TEXT.key,{handler:this.configText,suppressEvent:DEFAULT_CONFIG.TEXT.suppressEvent});this.cfg.addProperty(DEFAULT_CONFIG.CONTAINER.key,{handler:this.configContainer,value:document.body});this.cfg.addProperty(DEFAULT_CONFIG.DISABLED.key,{handler:this.configContainer,value:DEFAULT_CONFIG.DISABLED.value,supressEvent:DEFAULT_CONFIG.DISABLED.suppressEvent});},configText:function(type,args,obj){var text=args[0];if(text){this.setBody(text);}},configContainer:function(type,args,obj){var container=args[0];if(typeof container=='string'){this.cfg.setProperty("container",document.getElementById(container),true);}},_removeEventListeners:function(){var aElements=this._context,nElements,oElement,i;if(aElements){nElements=aElements.length;if(nElements>0){i=nElements-1;do{oElement=aElements[i];Event.removeListener(oElement,"mouseover",this.onContextMouseOver);Event.removeListener(oElement,"mousemove",this.onContextMouseMove);Event.removeListener(oElement,"mouseout",this.onContextMouseOut);}
while(i--);}}},configContext:function(type,args,obj){var context=args[0],aElements,nElements,oElement,i;if(context){if(!(context instanceof Array)){if(typeof context=="string"){this.cfg.setProperty("context",[document.getElementById(context)],true);}else{this.cfg.setProperty("context",[context],true);}
context=this.cfg.getProperty("context");}
this._removeEventListeners();this._context=context;aElements=this._context;if(aElements){nElements=aElements.length;if(nElements>0){i=nElements-1;do{oElement=aElements[i];Event.on(oElement,"mouseover",this.onContextMouseOver,this);Event.on(oElement,"mousemove",this.onContextMouseMove,this);Event.on(oElement,"mouseout",this.onContextMouseOut,this);}
while(i--);}}}},onContextMouseMove:function(e,obj){obj.pageX=Event.getPageX(e);obj.pageY=Event.getPageY(e);},onContextMouseOver:function(e,obj){var context=this;if(context.title){obj._tempTitle=context.title;context.title="";}
if(obj.fireEvent("contextMouseOver",context,e)!==false&&!obj.cfg.getProperty("disabled")){if(obj.hideProcId){clearTimeout(obj.hideProcId);obj.hideProcId=null;}
Event.on(context,"mousemove",obj.onContextMouseMove,obj);obj.showProcId=obj.doShow(e,context);}},onContextMouseOut:function(e,obj){var el=this;if(obj._tempTitle){el.title=obj._tempTitle;obj._tempTitle=null;}
if(obj.showProcId){clearTimeout(obj.showProcId);obj.showProcId=null;}
if(obj.hideProcId){clearTimeout(obj.hideProcId);obj.hideProcId=null;}
obj.fireEvent("contextMouseOut",el,e);obj.hideProcId=setTimeout(function(){obj.hide();},obj.cfg.getProperty("hidedelay"));},doShow:function(e,context){var yOffset=25,me=this;if(YAHOO.env.ua.opera&&context.tagName&&context.tagName.toUpperCase()=="A"){yOffset+=12;}
return setTimeout(function(){var txt=me.cfg.getProperty("text");if(me._tempTitle&&(txt===""||YAHOO.lang.isUndefined(txt)||YAHOO.lang.isNull(txt))){me.setBody(me._tempTitle);}else{me.cfg.refireEvent("text");}
me.moveTo(me.pageX,me.pageY+yOffset);if(me.cfg.getProperty("preventoverlap")){me.preventOverlap(me.pageX,me.pageY);}
Event.removeListener(context,"mousemove",me.onContextMouseMove);me.contextTriggerEvent.fire(context);me.show();me.hideProcId=me.doHide();},this.cfg.getProperty("showdelay"));},doHide:function(){var me=this;return setTimeout(function(){me.hide();},this.cfg.getProperty("autodismissdelay"));},preventOverlap:function(pageX,pageY){var height=this.element.offsetHeight,mousePoint=new YAHOO.util.Point(pageX,pageY),elementRegion=Dom.getRegion(this.element);elementRegion.top-=5;elementRegion.left-=5;elementRegion.right+=5;elementRegion.bottom+=5;if(elementRegion.contains(mousePoint)){this.cfg.setProperty("y",(pageY-height-5));}},onRender:function(p_sType,p_aArgs){function sizeShadow(){var oElement=this.element,oShadow=this._shadow;if(oShadow){oShadow.style.width=(oElement.offsetWidth+6)+"px";oShadow.style.height=(oElement.offsetHeight+1)+"px";}}
function addShadowVisibleClass(){Dom.addClass(this._shadow,"yui-tt-shadow-visible");}
function removeShadowVisibleClass(){Dom.removeClass(this._shadow,"yui-tt-shadow-visible");}
function createShadow(){var oShadow=this._shadow,oElement,Module,nIE,me;if(!oShadow){oElement=this.element;Module=YAHOO.widget.Module;nIE=YAHOO.env.ua.ie;me=this;if(!m_oShadowTemplate){m_oShadowTemplate=document.createElement("div");m_oShadowTemplate.className="yui-tt-shadow";}
oShadow=m_oShadowTemplate.cloneNode(false);oElement.appendChild(oShadow);this._shadow=oShadow;addShadowVisibleClass.call(this);this.subscribe("beforeShow",addShadowVisibleClass);this.subscribe("beforeHide",removeShadowVisibleClass);if(nIE==6||(nIE==7&&document.compatMode=="BackCompat")){window.setTimeout(function(){sizeShadow.call(me);},0);this.cfg.subscribeToConfigEvent("width",sizeShadow);this.cfg.subscribeToConfigEvent("height",sizeShadow);this.subscribe("changeContent",sizeShadow);Module.textResizeEvent.subscribe(sizeShadow,this,true);this.subscribe("destroy",function(){Module.textResizeEvent.unsubscribe(sizeShadow,this);});}}}
function onBeforeShow(){createShadow.call(this);this.unsubscribe("beforeShow",onBeforeShow);}
if(this.cfg.getProperty("visible")){createShadow.call(this);}else{this.subscribe("beforeShow",onBeforeShow);}},destroy:function(){this._removeEventListeners();Tooltip.superclass.destroy.call(this);},toString:function(){return"Tooltip "+this.id;}});}());(function(){YAHOO.widget.Panel=function(el,userConfig){YAHOO.widget.Panel.superclass.constructor.call(this,el,userConfig);};var Lang=YAHOO.lang,DD=YAHOO.util.DD,Dom=YAHOO.util.Dom,Event=YAHOO.util.Event,Overlay=YAHOO.widget.Overlay,CustomEvent=YAHOO.util.CustomEvent,Config=YAHOO.util.Config,Panel=YAHOO.widget.Panel,m_oMaskTemplate,m_oUnderlayTemplate,m_oCloseIconTemplate,EVENT_TYPES={"SHOW_MASK":"showMask","HIDE_MASK":"hideMask","DRAG":"drag"},DEFAULT_CONFIG={"CLOSE":{key:"close",value:true,validator:Lang.isBoolean,supercedes:["visible"]},"DRAGGABLE":{key:"draggable",value:(DD?true:false),validator:Lang.isBoolean,supercedes:["visible"]},"DRAG_ONLY":{key:"dragonly",value:false,validator:Lang.isBoolean,supercedes:["draggable"]},"UNDERLAY":{key:"underlay",value:"shadow",supercedes:["visible"]},"MODAL":{key:"modal",value:false,validator:Lang.isBoolean,supercedes:["visible","zindex"]},"KEY_LISTENERS":{key:"keylisteners",suppressEvent:true,supercedes:["visible"]}};Panel.CSS_PANEL="yui-panel";Panel.CSS_PANEL_CONTAINER="yui-panel-container";Panel.FOCUSABLE=["a","button","select","textarea","input"];function createHeader(p_sType,p_aArgs){if(!this.header&&this.cfg.getProperty("draggable")){this.setHeader("&#160;");}}
function restoreOriginalWidth(p_sType,p_aArgs,p_oObject){var sOriginalWidth=p_oObject[0],sNewWidth=p_oObject[1],oConfig=this.cfg,sCurrentWidth=oConfig.getProperty("width");if(sCurrentWidth==sNewWidth){oConfig.setProperty("width",sOriginalWidth);}
this.unsubscribe("hide",restoreOriginalWidth,p_oObject);}
function setWidthToOffsetWidth(p_sType,p_aArgs){var nIE=YAHOO.env.ua.ie,oConfig,sOriginalWidth,sNewWidth;if(nIE==6||(nIE==7&&document.compatMode=="BackCompat")){oConfig=this.cfg;sOriginalWidth=oConfig.getProperty("width");if(!sOriginalWidth||sOriginalWidth=="auto"){sNewWidth=(this.element.offsetWidth+"px");oConfig.setProperty("width",sNewWidth);this.subscribe("hide",restoreOriginalWidth,[(sOriginalWidth||""),sNewWidth]);}}}
YAHOO.extend(Panel,Overlay,{init:function(el,userConfig){Panel.superclass.init.call(this,el);this.beforeInitEvent.fire(Panel);Dom.addClass(this.element,Panel.CSS_PANEL);this.buildWrapper();if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.subscribe("showMask",this._addFocusHandlers);this.subscribe("hideMask",this._removeFocusHandlers);this.subscribe("beforeRender",createHeader);this.initEvent.fire(Panel);},_onElementFocus:function(e){this.blur();},_addFocusHandlers:function(p_sType,p_aArgs){var me=this,focus="focus",hidden="hidden";function isFocusable(el){if(el.type!==hidden&&!Dom.isAncestor(me.element,el)){Event.on(el,focus,me._onElementFocus);return true;}
return false;}
var focusable=Panel.FOCUSABLE,l=focusable.length,arr=[];for(var i=0;i<l;i++){arr=arr.concat(Dom.getElementsBy(isFocusable,focusable[i]));}
this.focusableElements=arr;},_removeFocusHandlers:function(p_sType,p_aArgs){var aElements=this.focusableElements,nElements=aElements.length,focus="focus";if(aElements){for(var i=0;i<nElements;i++){Event.removeListener(aElements[i],focus,this._onElementFocus);}}},initEvents:function(){Panel.superclass.initEvents.call(this);var SIGNATURE=CustomEvent.LIST;this.showMaskEvent=this.createEvent(EVENT_TYPES.SHOW_MASK);this.showMaskEvent.signature=SIGNATURE;this.hideMaskEvent=this.createEvent(EVENT_TYPES.HIDE_MASK);this.hideMaskEvent.signature=SIGNATURE;this.dragEvent=this.createEvent(EVENT_TYPES.DRAG);this.dragEvent.signature=SIGNATURE;},initDefaultConfig:function(){Panel.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.CLOSE.key,{handler:this.configClose,value:DEFAULT_CONFIG.CLOSE.value,validator:DEFAULT_CONFIG.CLOSE.validator,supercedes:DEFAULT_CONFIG.CLOSE.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.DRAGGABLE.key,{handler:this.configDraggable,value:DEFAULT_CONFIG.DRAGGABLE.value,validator:DEFAULT_CONFIG.DRAGGABLE.validator,supercedes:DEFAULT_CONFIG.DRAGGABLE.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.DRAG_ONLY.key,{value:DEFAULT_CONFIG.DRAG_ONLY.value,validator:DEFAULT_CONFIG.DRAG_ONLY.validator,supercedes:DEFAULT_CONFIG.DRAG_ONLY.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.UNDERLAY.key,{handler:this.configUnderlay,value:DEFAULT_CONFIG.UNDERLAY.value,supercedes:DEFAULT_CONFIG.UNDERLAY.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.MODAL.key,{handler:this.configModal,value:DEFAULT_CONFIG.MODAL.value,validator:DEFAULT_CONFIG.MODAL.validator,supercedes:DEFAULT_CONFIG.MODAL.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.KEY_LISTENERS.key,{handler:this.configKeyListeners,suppressEvent:DEFAULT_CONFIG.KEY_LISTENERS.suppressEvent,supercedes:DEFAULT_CONFIG.KEY_LISTENERS.supercedes});},configClose:function(type,args,obj){var val=args[0],oClose=this.close;function doHide(e,obj){obj.hide();}
if(val){if(!oClose){if(!m_oCloseIconTemplate){m_oCloseIconTemplate=document.createElement("span");m_oCloseIconTemplate.innerHTML="&#160;";m_oCloseIconTemplate.className="container-close";}
oClose=m_oCloseIconTemplate.cloneNode(true);this.innerElement.appendChild(oClose);Event.on(oClose,"click",doHide,this);this.close=oClose;}else{oClose.style.display="block";}}else{if(oClose){oClose.style.display="none";}}},configDraggable:function(type,args,obj){var val=args[0];if(val){if(!DD){this.cfg.setProperty("draggable",false);return;}
if(this.header){Dom.setStyle(this.header,"cursor","move");this.registerDragDrop();}
this.subscribe("beforeShow",setWidthToOffsetWidth);}else{if(this.dd){this.dd.unreg();}
if(this.header){Dom.setStyle(this.header,"cursor","auto");}
this.unsubscribe("beforeShow",setWidthToOffsetWidth);}},configUnderlay:function(type,args,obj){var UA=YAHOO.env.ua,bMacGecko=(this.platform=="mac"&&UA.gecko),bIEQuirks=(UA.ie==6||(UA.ie==7&&document.compatMode=="BackCompat")),sUnderlay=args[0].toLowerCase(),oUnderlay=this.underlay,oElement=this.element;function fixWebkitUnderlay(){var u=this.underlay;Dom.addClass(u,"yui-force-redraw");window.setTimeout(function(){Dom.removeClass(u,"yui-force-redraw");},0);}
function createUnderlay(){var bNew=false;if(!oUnderlay){if(!m_oUnderlayTemplate){m_oUnderlayTemplate=document.createElement("div");m_oUnderlayTemplate.className="underlay";}
oUnderlay=m_oUnderlayTemplate.cloneNode(false);this.element.appendChild(oUnderlay);this.underlay=oUnderlay;if(bIEQuirks){this.sizeUnderlay();this.cfg.subscribeToConfigEvent("width",this.sizeUnderlay);this.cfg.subscribeToConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.subscribe(this.sizeUnderlay);YAHOO.widget.Module.textResizeEvent.subscribe(this.sizeUnderlay,this,true);}
if(UA.webkit&&UA.webkit<420){this.changeContentEvent.subscribe(fixWebkitUnderlay);}
bNew=true;}}
function onBeforeShow(){var bNew=createUnderlay.call(this);if(!bNew&&bIEQuirks){this.sizeUnderlay();}
this._underlayDeferred=false;this.beforeShowEvent.unsubscribe(onBeforeShow);}
function destroyUnderlay(){if(this._underlayDeferred){this.beforeShowEvent.unsubscribe(onBeforeShow);this._underlayDeferred=false;}
if(oUnderlay){this.cfg.unsubscribeFromConfigEvent("width",this.sizeUnderlay);this.cfg.unsubscribeFromConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.unsubscribe(this.sizeUnderlay);this.changeContentEvent.unsubscribe(fixWebkitUnderlay);YAHOO.widget.Module.textResizeEvent.unsubscribe(this.sizeUnderlay,this,true);this.element.removeChild(oUnderlay);this.underlay=null;}}
switch(sUnderlay){case"shadow":Dom.removeClass(oElement,"matte");Dom.addClass(oElement,"shadow");break;case"matte":if(!bMacGecko){destroyUnderlay.call(this);}
Dom.removeClass(oElement,"shadow");Dom.addClass(oElement,"matte");break;default:if(!bMacGecko){destroyUnderlay.call(this);}
Dom.removeClass(oElement,"shadow");Dom.removeClass(oElement,"matte");break;}
if((sUnderlay=="shadow")||(bMacGecko&&!oUnderlay)){if(this.cfg.getProperty("visible")){var bNew=createUnderlay.call(this);if(!bNew&&bIEQuirks){this.sizeUnderlay();}}else{if(!this._underlayDeferred){this.beforeShowEvent.subscribe(onBeforeShow);this._underlayDeferred=true;}}}},configModal:function(type,args,obj){var modal=args[0];if(modal){if(!this._hasModalityEventListeners){this.subscribe("beforeShow",this.buildMask);this.subscribe("beforeShow",this.bringToTop);this.subscribe("beforeShow",this.showMask);this.subscribe("hide",this.hideMask);Overlay.windowResizeEvent.subscribe(this.sizeMask,this,true);this._hasModalityEventListeners=true;}}else{if(this._hasModalityEventListeners){if(this.cfg.getProperty("visible")){this.hideMask();this.removeMask();}
this.unsubscribe("beforeShow",this.buildMask);this.unsubscribe("beforeShow",this.bringToTop);this.unsubscribe("beforeShow",this.showMask);this.unsubscribe("hide",this.hideMask);Overlay.windowResizeEvent.unsubscribe(this.sizeMask,this);this._hasModalityEventListeners=false;}}},removeMask:function(){var oMask=this.mask,oParentNode;if(oMask){this.hideMask();oParentNode=oMask.parentNode;if(oParentNode){oParentNode.removeChild(oMask);}
this.mask=null;}},configKeyListeners:function(type,args,obj){var listeners=args[0],listener,nListeners,i;if(listeners){if(listeners instanceof Array){nListeners=listeners.length;for(i=0;i<nListeners;i++){listener=listeners[i];if(!Config.alreadySubscribed(this.showEvent,listener.enable,listener)){this.showEvent.subscribe(listener.enable,listener,true);}
if(!Config.alreadySubscribed(this.hideEvent,listener.disable,listener)){this.hideEvent.subscribe(listener.disable,listener,true);this.destroyEvent.subscribe(listener.disable,listener,true);}}}else{if(!Config.alreadySubscribed(this.showEvent,listeners.enable,listeners)){this.showEvent.subscribe(listeners.enable,listeners,true);}
if(!Config.alreadySubscribed(this.hideEvent,listeners.disable,listeners)){this.hideEvent.subscribe(listeners.disable,listeners,true);this.destroyEvent.subscribe(listeners.disable,listeners,true);}}}},configHeight:function(type,args,obj){var height=args[0],el=this.innerElement;Dom.setStyle(el,"height",height);this.cfg.refireEvent("iframe");},configWidth:function(type,args,obj){var width=args[0],el=this.innerElement;Dom.setStyle(el,"width",width);this.cfg.refireEvent("iframe");},configzIndex:function(type,args,obj){Panel.superclass.configzIndex.call(this,type,args,obj);if(this.mask||this.cfg.getProperty("modal")===true){var panelZ=Dom.getStyle(this.element,"zIndex");if(!panelZ||isNaN(panelZ)){panelZ=0;}
if(panelZ===0){this.cfg.setProperty("zIndex",1);}else{this.stackMask();}}},buildWrapper:function(){var elementParent=this.element.parentNode,originalElement=this.element,wrapper=document.createElement("div");wrapper.className=Panel.CSS_PANEL_CONTAINER;wrapper.id=originalElement.id+"_c";if(elementParent){elementParent.insertBefore(wrapper,originalElement);}
wrapper.appendChild(originalElement);this.element=wrapper;this.innerElement=originalElement;Dom.setStyle(this.innerElement,"visibility","inherit");},sizeUnderlay:function(){var oUnderlay=this.underlay,oElement;if(oUnderlay){oElement=this.element;oUnderlay.style.width=oElement.offsetWidth+"px";oUnderlay.style.height=oElement.offsetHeight+"px";}},registerDragDrop:function(){var me=this;if(this.header){if(!DD){return;}
var bDragOnly=(this.cfg.getProperty("dragonly")===true);this.dd=new DD(this.element.id,this.id,{dragOnly:bDragOnly});if(!this.header.id){this.header.id=this.id+"_h";}
this.dd.startDrag=function(){var offsetHeight,offsetWidth,viewPortWidth,viewPortHeight,scrollX,scrollY;if(YAHOO.env.ua.ie==6){Dom.addClass(me.element,"drag");}
if(me.cfg.getProperty("constraintoviewport")){var nViewportOffset=Overlay.VIEWPORT_OFFSET;offsetHeight=me.element.offsetHeight;offsetWidth=me.element.offsetWidth;viewPortWidth=Dom.getViewportWidth();viewPortHeight=Dom.getViewportHeight();scrollX=Dom.getDocumentScrollLeft();scrollY=Dom.getDocumentScrollTop();if(offsetHeight+nViewportOffset<viewPortHeight){this.minY=scrollY+nViewportOffset;this.maxY=scrollY+viewPortHeight-offsetHeight-nViewportOffset;}else{this.minY=scrollY+nViewportOffset;this.maxY=scrollY+nViewportOffset;}
if(offsetWidth+nViewportOffset<viewPortWidth){this.minX=scrollX+nViewportOffset;this.maxX=scrollX+viewPortWidth-offsetWidth-nViewportOffset;}else{this.minX=scrollX+nViewportOffset;this.maxX=scrollX+nViewportOffset;}
this.constrainX=true;this.constrainY=true;}else{this.constrainX=false;this.constrainY=false;}
me.dragEvent.fire("startDrag",arguments);};this.dd.onDrag=function(){me.syncPosition();me.cfg.refireEvent("iframe");if(this.platform=="mac"&&YAHOO.env.ua.gecko){this.showMacGeckoScrollbars();}
me.dragEvent.fire("onDrag",arguments);};this.dd.endDrag=function(){if(YAHOO.env.ua.ie==6){Dom.removeClass(me.element,"drag");}
me.dragEvent.fire("endDrag",arguments);me.moveEvent.fire(me.cfg.getProperty("xy"));};this.dd.setHandleElId(this.header.id);this.dd.addInvalidHandleType("INPUT");this.dd.addInvalidHandleType("SELECT");this.dd.addInvalidHandleType("TEXTAREA");}},buildMask:function(){var oMask=this.mask;if(!oMask){if(!m_oMaskTemplate){m_oMaskTemplate=document.createElement("div");m_oMaskTemplate.className="mask";m_oMaskTemplate.innerHTML="&#160;";}
oMask=m_oMaskTemplate.cloneNode(true);oMask.id=this.id+"_mask";document.body.insertBefore(oMask,document.body.firstChild);this.mask=oMask;if(YAHOO.env.ua.gecko&&this.platform=="mac"){Dom.addClass(this.mask,"block-scrollbars");}
this.stackMask();}},hideMask:function(){if(this.cfg.getProperty("modal")&&this.mask){this.mask.style.display="none";this.hideMaskEvent.fire();Dom.removeClass(document.body,"masked");}},showMask:function(){if(this.cfg.getProperty("modal")&&this.mask){Dom.addClass(document.body,"masked");this.sizeMask();this.mask.style.display="block";this.showMaskEvent.fire();}},sizeMask:function(){if(this.mask){this.mask.style.height=Dom.getDocumentHeight()+"px";this.mask.style.width=Dom.getDocumentWidth()+"px";}},stackMask:function(){if(this.mask){var panelZ=Dom.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(panelZ)&&!isNaN(panelZ)){Dom.setStyle(this.mask,"zIndex",panelZ-1);}}},render:function(appendToNode){return Panel.superclass.render.call(this,appendToNode,this.innerElement);},destroy:function(){Overlay.windowResizeEvent.unsubscribe(this.sizeMask,this);this.removeMask();if(this.close){Event.purgeElement(this.close);}
Panel.superclass.destroy.call(this);},toString:function(){return"Panel "+this.id;}});}());(function(){YAHOO.widget.Dialog=function(el,userConfig){YAHOO.widget.Dialog.superclass.constructor.call(this,el,userConfig);};var Event=YAHOO.util.Event,CustomEvent=YAHOO.util.CustomEvent,Dom=YAHOO.util.Dom,KeyListener=YAHOO.util.KeyListener,Connect=YAHOO.util.Connect,Dialog=YAHOO.widget.Dialog,Lang=YAHOO.lang,EVENT_TYPES={"BEFORE_SUBMIT":"beforeSubmit","SUBMIT":"submit","MANUAL_SUBMIT":"manualSubmit","ASYNC_SUBMIT":"asyncSubmit","FORM_SUBMIT":"formSubmit","CANCEL":"cancel"},DEFAULT_CONFIG={"POST_METHOD":{key:"postmethod",value:"async"},"BUTTONS":{key:"buttons",value:"none"},"HIDEAFTERSUBMIT":{key:"hideaftersubmit",value:true}};Dialog.CSS_DIALOG="yui-dialog";function removeButtonEventHandlers(){var aButtons=this._aButtons,nButtons,oButton,i;if(Lang.isArray(aButtons)){nButtons=aButtons.length;if(nButtons>0){i=nButtons-1;do{oButton=aButtons[i];if(YAHOO.widget.Button&&oButton instanceof YAHOO.widget.Button){oButton.destroy();}
else if(oButton.tagName.toUpperCase()=="BUTTON"){Event.purgeElement(oButton);Event.purgeElement(oButton,false);}}
while(i--);}}}
YAHOO.extend(Dialog,YAHOO.widget.Panel,{form:null,initDefaultConfig:function(){Dialog.superclass.initDefaultConfig.call(this);this.callback={success:null,failure:null,argument:null};this.cfg.addProperty(DEFAULT_CONFIG.POST_METHOD.key,{handler:this.configPostMethod,value:DEFAULT_CONFIG.POST_METHOD.value,validator:function(val){if(val!="form"&&val!="async"&&val!="none"&&val!="manual"){return false;}else{return true;}}});this.cfg.addProperty(DEFAULT_CONFIG.HIDEAFTERSUBMIT.key,{value:DEFAULT_CONFIG.HIDEAFTERSUBMIT.value});this.cfg.addProperty(DEFAULT_CONFIG.BUTTONS.key,{handler:this.configButtons,value:DEFAULT_CONFIG.BUTTONS.value});},initEvents:function(){Dialog.superclass.initEvents.call(this);var SIGNATURE=CustomEvent.LIST;this.beforeSubmitEvent=this.createEvent(EVENT_TYPES.BEFORE_SUBMIT);this.beforeSubmitEvent.signature=SIGNATURE;this.submitEvent=this.createEvent(EVENT_TYPES.SUBMIT);this.submitEvent.signature=SIGNATURE;this.manualSubmitEvent=this.createEvent(EVENT_TYPES.MANUAL_SUBMIT);this.manualSubmitEvent.signature=SIGNATURE;this.asyncSubmitEvent=this.createEvent(EVENT_TYPES.ASYNC_SUBMIT);this.asyncSubmitEvent.signature=SIGNATURE;this.formSubmitEvent=this.createEvent(EVENT_TYPES.FORM_SUBMIT);this.formSubmitEvent.signature=SIGNATURE;this.cancelEvent=this.createEvent(EVENT_TYPES.CANCEL);this.cancelEvent.signature=SIGNATURE;},init:function(el,userConfig){Dialog.superclass.init.call(this,el);this.beforeInitEvent.fire(Dialog);Dom.addClass(this.element,Dialog.CSS_DIALOG);this.cfg.setProperty("visible",false);if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.showEvent.subscribe(this.focusFirst,this,true);this.beforeHideEvent.subscribe(this.blurButtons,this,true);this.subscribe("changeBody",this.registerForm);this.initEvent.fire(Dialog);},doSubmit:function(){var oForm=this.form,bUseFileUpload=false,bUseSecureFileUpload=false,aElements,nElements,i,sMethod;switch(this.cfg.getProperty("postmethod")){case"async":aElements=oForm.elements;nElements=aElements.length;if(nElements>0){i=nElements-1;do{if(aElements[i].type=="file"){bUseFileUpload=true;break;}}
while(i--);}
if(bUseFileUpload&&YAHOO.env.ua.ie&&this.isSecure){bUseSecureFileUpload=true;}
sMethod=(oForm.getAttribute("method")||"POST").toUpperCase();Connect.setForm(oForm,bUseFileUpload,bUseSecureFileUpload);Connect.asyncRequest(sMethod,oForm.getAttribute("action"),this.callback);this.asyncSubmitEvent.fire();break;case"form":oForm.submit();this.formSubmitEvent.fire();break;case"none":case"manual":this.manualSubmitEvent.fire();break;}},registerForm:function(){var form=this.element.getElementsByTagName("form")[0],me=this,firstElement,lastElement;if(this.form){if(this.form==form&&Dom.isAncestor(this.element,this.form)){return;}else{Event.purgeElement(this.form);this.form=null;}}
if(!form){form=document.createElement("form");form.name="frm_"+this.id;this.body.appendChild(form);}
if(form){this.form=form;Event.on(form,"submit",function(e){Event.stopEvent(e);this.submit();this.form.blur();},this,true);this.firstFormElement=function(){var f,el,nElements=form.elements.length;for(f=0;f<nElements;f++){el=form.elements[f];if(el.focus&&!el.disabled&&el.type!="hidden"){return el;}}
return null;}();this.lastFormElement=function(){var f,el,nElements=form.elements.length;for(f=nElements-1;f>=0;f--){el=form.elements[f];if(el.focus&&!el.disabled&&el.type!="hidden"){return el;}}
return null;}();if(this.cfg.getProperty("modal")){firstElement=this.firstFormElement||this.firstButton;if(firstElement){this.preventBackTab=new KeyListener(firstElement,{shift:true,keys:9},{fn:me.focusLast,scope:me,correctScope:true});this.showEvent.subscribe(this.preventBackTab.enable,this.preventBackTab,true);this.hideEvent.subscribe(this.preventBackTab.disable,this.preventBackTab,true);}
lastElement=this.lastButton||this.lastFormElement;if(lastElement){this.preventTabOut=new KeyListener(lastElement,{shift:false,keys:9},{fn:me.focusFirst,scope:me,correctScope:true});this.showEvent.subscribe(this.preventTabOut.enable,this.preventTabOut,true);this.hideEvent.subscribe(this.preventTabOut.disable,this.preventTabOut,true);}}}},configClose:function(type,args,obj){var val=args[0];function doCancel(e,obj){obj.cancel();}
if(val){if(!this.close){this.close=document.createElement("div");Dom.addClass(this.close,"container-close");this.close.innerHTML="&#160;";this.innerElement.appendChild(this.close);Event.on(this.close,"click",doCancel,this);}else{this.close.style.display="block";}}else{if(this.close){this.close.style.display="none";}}},configButtons:function(type,args,obj){var Button=YAHOO.widget.Button,aButtons=args[0],oInnerElement=this.innerElement,oButton,oButtonEl,oYUIButton,nButtons,oSpan,oFooter,i;removeButtonEventHandlers.call(this);this._aButtons=null;if(Lang.isArray(aButtons)){oSpan=document.createElement("span");oSpan.className="button-group";nButtons=aButtons.length;this._aButtons=[];for(i=0;i<nButtons;i++){oButton=aButtons[i];if(Button){oYUIButton=new Button({label:oButton.text,container:oSpan});oButtonEl=oYUIButton.get("element");if(oButton.isDefault){oYUIButton.addClass("default");this.defaultHtmlButton=oButtonEl;}
if(Lang.isFunction(oButton.handler)){oYUIButton.set("onclick",{fn:oButton.handler,obj:this,scope:this});}
else if(Lang.isObject(oButton.handler)&&Lang.isFunction(oButton.handler.fn)){oYUIButton.set("onclick",{fn:oButton.handler.fn,obj:((!Lang.isUndefined(oButton.handler.obj))?oButton.handler.obj:this),scope:(oButton.handler.scope||this)});}
this._aButtons[this._aButtons.length]=oYUIButton;}
else{oButtonEl=document.createElement("button");oButtonEl.setAttribute("type","button");if(oButton.isDefault){oButtonEl.className="default";this.defaultHtmlButton=oButtonEl;}
oButtonEl.innerHTML=oButton.text;if(Lang.isFunction(oButton.handler)){Event.on(oButtonEl,"click",oButton.handler,this,true);}
else if(Lang.isObject(oButton.handler)&&Lang.isFunction(oButton.handler.fn)){Event.on(oButtonEl,"click",oButton.handler.fn,((!Lang.isUndefined(oButton.handler.obj))?oButton.handler.obj:this),(oButton.handler.scope||this));}
oSpan.appendChild(oButtonEl);this._aButtons[this._aButtons.length]=oButtonEl;}
oButton.htmlButton=oButtonEl;if(i===0){this.firstButton=oButtonEl;}
if(i==(nButtons-1)){this.lastButton=oButtonEl;}}
this.setFooter(oSpan);oFooter=this.footer;if(Dom.inDocument(this.element)&&!Dom.isAncestor(oInnerElement,oFooter)){oInnerElement.appendChild(oFooter);}
this.buttonSpan=oSpan;}else{oSpan=this.buttonSpan;oFooter=this.footer;if(oSpan&&oFooter){oFooter.removeChild(oSpan);this.buttonSpan=null;this.firstButton=null;this.lastButton=null;this.defaultHtmlButton=null;}}
this.cfg.refireEvent("iframe");this.cfg.refireEvent("underlay");},getButtons:function(){var aButtons=this._aButtons;if(aButtons){return aButtons;}},focusFirst:function(type,args,obj){var oElement=this.firstFormElement,oEvent;if(args){oEvent=args[1];if(oEvent){Event.stopEvent(oEvent);}}
if(oElement){try{oElement.focus();}
catch(oException){}}else{this.focusDefaultButton();}},focusLast:function(type,args,obj){var aButtons=this.cfg.getProperty("buttons"),oElement=this.lastFormElement,oEvent;if(args){oEvent=args[1];if(oEvent){Event.stopEvent(oEvent);}}
if(aButtons&&Lang.isArray(aButtons)){this.focusLastButton();}else{if(oElement){try{oElement.focus();}catch(oException){}}}},focusDefaultButton:function(){var oElement=this.defaultHtmlButton;if(oElement){try{oElement.focus();}catch(oException){}}},blurButtons:function(){var aButtons=this.cfg.getProperty("buttons"),nButtons,oButton,oElement,i;if(aButtons&&Lang.isArray(aButtons)){nButtons=aButtons.length;if(nButtons>0){i=(nButtons-1);do{oButton=aButtons[i];if(oButton){oElement=oButton.htmlButton;if(oElement){try{oElement.blur();}catch(oException){}}}}while(i--);}}},focusFirstButton:function(){var aButtons=this.cfg.getProperty("buttons"),oButton,oElement;if(aButtons&&Lang.isArray(aButtons)){oButton=aButtons[0];if(oButton){oElement=oButton.htmlButton;if(oElement){try{oElement.focus();}
catch(oException){}}}}},focusLastButton:function(){var aButtons=this.cfg.getProperty("buttons"),nButtons,oButton,oElement;if(aButtons&&Lang.isArray(aButtons)){nButtons=aButtons.length;if(nButtons>0){oButton=aButtons[(nButtons-1)];if(oButton){oElement=oButton.htmlButton;if(oElement){try{oElement.focus();}catch(oException){}}}}}},configPostMethod:function(type,args,obj){this.registerForm();},validate:function(){return true;},submit:function(){if(this.validate()){this.beforeSubmitEvent.fire();this.doSubmit();this.submitEvent.fire();if(this.cfg.getProperty("hideaftersubmit")){this.hide();}
return true;}else{return false;}},cancel:function(){this.cancelEvent.fire();this.hide();},getData:function(){var oForm=this.form,aElements,nTotalElements,oData,sName,oElement,nElements,sType,sTagName,aOptions,nOptions,aValues,oOption,sValue,oRadio,oCheckbox,i,n;function isFormElement(p_oElement){var sTag=p_oElement.tagName.toUpperCase();return((sTag=="INPUT"||sTag=="TEXTAREA"||sTag=="SELECT")&&p_oElement.name==sName);}
if(oForm){aElements=oForm.elements;nTotalElements=aElements.length;oData={};for(i=0;i<nTotalElements;i++){sName=aElements[i].name;oElement=Dom.getElementsBy(isFormElement,"*",oForm);nElements=oElement.length;if(nElements>0){if(nElements==1){oElement=oElement[0];sType=oElement.type;sTagName=oElement.tagName.toUpperCase();switch(sTagName){case"INPUT":if(sType=="checkbox"){oData[sName]=oElement.checked;}
else if(sType!="radio"){oData[sName]=oElement.value;}
break;case"TEXTAREA":oData[sName]=oElement.value;break;case"SELECT":aOptions=oElement.options;nOptions=aOptions.length;aValues=[];for(n=0;n<nOptions;n++){oOption=aOptions[n];if(oOption.selected){sValue=oOption.value;if(!sValue||sValue===""){sValue=oOption.text;}
aValues[aValues.length]=sValue;}}
oData[sName]=aValues;break;}}
else{sType=oElement[0].type;switch(sType){case"radio":for(n=0;n<nElements;n++){oRadio=oElement[n];if(oRadio.checked){oData[sName]=oRadio.value;break;}}
break;case"checkbox":aValues=[];for(n=0;n<nElements;n++){oCheckbox=oElement[n];if(oCheckbox.checked){aValues[aValues.length]=oCheckbox.value;}}
oData[sName]=aValues;break;}}}}}
return oData;},destroy:function(){removeButtonEventHandlers.call(this);this._aButtons=null;var aForms=this.element.getElementsByTagName("form"),oForm;if(aForms.length>0){oForm=aForms[0];if(oForm){Event.purgeElement(oForm);if(oForm.parentNode){oForm.parentNode.removeChild(oForm);}
this.form=null;}}
Dialog.superclass.destroy.call(this);},toString:function(){return"Dialog "+this.id;}});}());(function(){YAHOO.widget.SimpleDialog=function(el,userConfig){YAHOO.widget.SimpleDialog.superclass.constructor.call(this,el,userConfig);};var Dom=YAHOO.util.Dom,SimpleDialog=YAHOO.widget.SimpleDialog,DEFAULT_CONFIG={"ICON":{key:"icon",value:"none",suppressEvent:true},"TEXT":{key:"text",value:"",suppressEvent:true,supercedes:["icon"]}};SimpleDialog.ICON_BLOCK="blckicon";SimpleDialog.ICON_ALARM="alrticon";SimpleDialog.ICON_HELP="hlpicon";SimpleDialog.ICON_INFO="infoicon";SimpleDialog.ICON_WARN="warnicon";SimpleDialog.ICON_TIP="tipicon";SimpleDialog.ICON_CSS_CLASSNAME="yui-icon";SimpleDialog.CSS_SIMPLEDIALOG="yui-simple-dialog";YAHOO.extend(SimpleDialog,YAHOO.widget.Dialog,{initDefaultConfig:function(){SimpleDialog.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.ICON.key,{handler:this.configIcon,value:DEFAULT_CONFIG.ICON.value,suppressEvent:DEFAULT_CONFIG.ICON.suppressEvent});this.cfg.addProperty(DEFAULT_CONFIG.TEXT.key,{handler:this.configText,value:DEFAULT_CONFIG.TEXT.value,suppressEvent:DEFAULT_CONFIG.TEXT.suppressEvent,supercedes:DEFAULT_CONFIG.TEXT.supercedes});},init:function(el,userConfig){SimpleDialog.superclass.init.call(this,el);this.beforeInitEvent.fire(SimpleDialog);Dom.addClass(this.element,SimpleDialog.CSS_SIMPLEDIALOG);this.cfg.queueProperty("postmethod","manual");if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.beforeRenderEvent.subscribe(function(){if(!this.body){this.setBody("");}},this,true);this.initEvent.fire(SimpleDialog);},registerForm:function(){SimpleDialog.superclass.registerForm.call(this);this.form.innerHTML+="<input type=\"hidden\" name=\""+
this.id+"\" value=\"\"/>";},configIcon:function(type,args,obj){var sIcon=args[0],oBody=this.body,sCSSClass=SimpleDialog.ICON_CSS_CLASSNAME,oIcon,oIconParent;if(sIcon&&sIcon!="none"){oIcon=Dom.getElementsByClassName(sCSSClass,"*",oBody);if(oIcon){oIconParent=oIcon.parentNode;if(oIconParent){oIconParent.removeChild(oIcon);oIcon=null;}}
if(sIcon.indexOf(".")==-1){oIcon=document.createElement("span");oIcon.className=(sCSSClass+" "+sIcon);oIcon.innerHTML="&#160;";}else{oIcon=document.createElement("img");oIcon.src=(this.imageRoot+sIcon);oIcon.className=sCSSClass;}
if(oIcon){oBody.insertBefore(oIcon,oBody.firstChild);}}},configText:function(type,args,obj){var text=args[0];if(text){this.setBody(text);this.cfg.refireEvent("icon");}},toString:function(){return"SimpleDialog "+this.id;}});}());(function(){YAHOO.widget.ContainerEffect=function(overlay,attrIn,attrOut,targetElement,animClass){if(!animClass){animClass=YAHOO.util.Anim;}
this.overlay=overlay;this.attrIn=attrIn;this.attrOut=attrOut;this.targetElement=targetElement||overlay.element;this.animClass=animClass;};var Dom=YAHOO.util.Dom,CustomEvent=YAHOO.util.CustomEvent,Easing=YAHOO.util.Easing,ContainerEffect=YAHOO.widget.ContainerEffect;ContainerEffect.FADE=function(overlay,dur){var fin={attributes:{opacity:{from:0,to:1}},duration:dur,method:Easing.easeIn};var fout={attributes:{opacity:{to:0}},duration:dur,method:Easing.easeOut};var fade=new ContainerEffect(overlay,fin,fout,overlay.element);fade.handleUnderlayStart=function(){var underlay=this.overlay.underlay;if(underlay&&YAHOO.env.ua.ie){var hasFilters=(underlay.filters&&underlay.filters.length>0);if(hasFilters){Dom.addClass(overlay.element,"yui-effect-fade");}}};fade.handleUnderlayComplete=function(){var underlay=this.overlay.underlay;if(underlay&&YAHOO.env.ua.ie){Dom.removeClass(overlay.element,"yui-effect-fade");}};fade.handleStartAnimateIn=function(type,args,obj){Dom.addClass(obj.overlay.element,"hide-select");if(!obj.overlay.underlay){obj.overlay.cfg.refireEvent("underlay");}
obj.handleUnderlayStart();Dom.setStyle(obj.overlay.element,"visibility","visible");Dom.setStyle(obj.overlay.element,"opacity",0);};fade.handleCompleteAnimateIn=function(type,args,obj){Dom.removeClass(obj.overlay.element,"hide-select");if(obj.overlay.element.style.filter){obj.overlay.element.style.filter=null;}
obj.handleUnderlayComplete();obj.overlay.cfg.refireEvent("iframe");obj.animateInCompleteEvent.fire();};fade.handleStartAnimateOut=function(type,args,obj){Dom.addClass(obj.overlay.element,"hide-select");obj.handleUnderlayStart();};fade.handleCompleteAnimateOut=function(type,args,obj){Dom.removeClass(obj.overlay.element,"hide-select");if(obj.overlay.element.style.filter){obj.overlay.element.style.filter=null;}
Dom.setStyle(obj.overlay.element,"visibility","hidden");Dom.setStyle(obj.overlay.element,"opacity",1);obj.handleUnderlayComplete();obj.overlay.cfg.refireEvent("iframe");obj.animateOutCompleteEvent.fire();};fade.init();return fade;};ContainerEffect.SLIDE=function(overlay,dur){var x=overlay.cfg.getProperty("x")||Dom.getX(overlay.element),y=overlay.cfg.getProperty("y")||Dom.getY(overlay.element),clientWidth=Dom.getClientWidth(),offsetWidth=overlay.element.offsetWidth,slide=new ContainerEffect(overlay,{attributes:{points:{to:[x,y]}},duration:dur,method:Easing.easeIn},{attributes:{points:{to:[(clientWidth+25),y]}},duration:dur,method:Easing.easeOut},overlay.element,YAHOO.util.Motion);slide.handleStartAnimateIn=function(type,args,obj){obj.overlay.element.style.left=((-25)-offsetWidth)+"px";obj.overlay.element.style.top=y+"px";};slide.handleTweenAnimateIn=function(type,args,obj){var pos=Dom.getXY(obj.overlay.element),currentX=pos[0],currentY=pos[1];if(Dom.getStyle(obj.overlay.element,"visibility")=="hidden"&&currentX<x){Dom.setStyle(obj.overlay.element,"visibility","visible");}
obj.overlay.cfg.setProperty("xy",[currentX,currentY],true);obj.overlay.cfg.refireEvent("iframe");};slide.handleCompleteAnimateIn=function(type,args,obj){obj.overlay.cfg.setProperty("xy",[x,y],true);obj.startX=x;obj.startY=y;obj.overlay.cfg.refireEvent("iframe");obj.animateInCompleteEvent.fire();};slide.handleStartAnimateOut=function(type,args,obj){var vw=Dom.getViewportWidth(),pos=Dom.getXY(obj.overlay.element),yso=pos[1];obj.animOut.attributes.points.to=[(vw+25),yso];};slide.handleTweenAnimateOut=function(type,args,obj){var pos=Dom.getXY(obj.overlay.element),xto=pos[0],yto=pos[1];obj.overlay.cfg.setProperty("xy",[xto,yto],true);obj.overlay.cfg.refireEvent("iframe");};slide.handleCompleteAnimateOut=function(type,args,obj){Dom.setStyle(obj.overlay.element,"visibility","hidden");obj.overlay.cfg.setProperty("xy",[x,y]);obj.animateOutCompleteEvent.fire();};slide.init();return slide;};ContainerEffect.prototype={init:function(){this.beforeAnimateInEvent=this.createEvent("beforeAnimateIn");this.beforeAnimateInEvent.signature=CustomEvent.LIST;this.beforeAnimateOutEvent=this.createEvent("beforeAnimateOut");this.beforeAnimateOutEvent.signature=CustomEvent.LIST;this.animateInCompleteEvent=this.createEvent("animateInComplete");this.animateInCompleteEvent.signature=CustomEvent.LIST;this.animateOutCompleteEvent=this.createEvent("animateOutComplete");this.animateOutCompleteEvent.signature=CustomEvent.LIST;this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);},animateIn:function(){this.beforeAnimateInEvent.fire();this.animIn.animate();},animateOut:function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();},handleStartAnimateIn:function(type,args,obj){},handleTweenAnimateIn:function(type,args,obj){},handleCompleteAnimateIn:function(type,args,obj){},handleStartAnimateOut:function(type,args,obj){},handleTweenAnimateOut:function(type,args,obj){},handleCompleteAnimateOut:function(type,args,obj){},toString:function(){var output="ContainerEffect";if(this.overlay){output+=" ["+this.overlay.toString()+"]";}
return output;}};YAHOO.lang.augmentProto(ContainerEffect,YAHOO.util.EventProvider);})();YAHOO.register("container",YAHOO.widget.Module,{version:"2.5.2",build:"1076"});

(function(){var Dom=YAHOO.util.Dom,Event=YAHOO.util.Event;YAHOO.widget.MenuManager=function(){var m_bInitializedEventHandlers=false,m_oMenus={},m_oVisibleMenus={},m_oItems={},m_oEventTypes={"click":"clickEvent","mousedown":"mouseDownEvent","mouseup":"mouseUpEvent","mouseover":"mouseOverEvent","mouseout":"mouseOutEvent","keydown":"keyDownEvent","keyup":"keyUpEvent","keypress":"keyPressEvent"},m_oFocusedMenuItem=null;function getMenuRootElement(p_oElement){var oParentNode;if(p_oElement&&p_oElement.tagName){switch(p_oElement.tagName.toUpperCase()){case"DIV":oParentNode=p_oElement.parentNode;if((Dom.hasClass(p_oElement,"hd")||Dom.hasClass(p_oElement,"bd")||Dom.hasClass(p_oElement,"ft"))&&oParentNode&&oParentNode.tagName&&oParentNode.tagName.toUpperCase()=="DIV")
{return oParentNode;}
else{return p_oElement;}
break;case"LI":return p_oElement;default:oParentNode=p_oElement.parentNode;if(oParentNode){return getMenuRootElement(oParentNode);}
break;}}}
function onDOMEvent(p_oEvent){var oTarget=Event.getTarget(p_oEvent),oElement=getMenuRootElement(oTarget),sCustomEventType,sTagName,sId,oMenuItem,oMenu;if(oElement){sTagName=oElement.tagName.toUpperCase();if(sTagName=="LI"){sId=oElement.id;if(sId&&m_oItems[sId]){oMenuItem=m_oItems[sId];oMenu=oMenuItem.parent;}}
else if(sTagName=="DIV"){if(oElement.id){oMenu=m_oMenus[oElement.id];}}}
if(oMenu){sCustomEventType=m_oEventTypes[p_oEvent.type];if(oMenuItem&&!oMenuItem.cfg.getProperty("disabled")){oMenuItem[sCustomEventType].fire(p_oEvent);if(p_oEvent.type=="keyup"||p_oEvent.type=="mousedown")
{if(m_oFocusedMenuItem!=oMenuItem){if(m_oFocusedMenuItem){m_oFocusedMenuItem.blurEvent.fire();}
oMenuItem.focusEvent.fire();}}}
oMenu[sCustomEventType].fire(p_oEvent,oMenuItem);}
else if(p_oEvent.type=="mousedown"){if(m_oFocusedMenuItem){m_oFocusedMenuItem.blurEvent.fire();m_oFocusedMenuItem=null;}
for(var i in m_oVisibleMenus){if(YAHOO.lang.hasOwnProperty(m_oVisibleMenus,i)){oMenu=m_oVisibleMenus[i];if(oMenu.cfg.getProperty("clicktohide")&&!(oMenu instanceof YAHOO.widget.MenuBar)&&oMenu.cfg.getProperty("position")=="dynamic"){oMenu.hide();}
else{if(oMenu.cfg.getProperty("showdelay")>0){oMenu._cancelShowDelay();}
if(oMenu.activeItem){oMenu.activeItem.blur();oMenu.activeItem.cfg.setProperty("selected",false);oMenu.activeItem=null;}}}}}
else if(p_oEvent.type=="keyup"){if(m_oFocusedMenuItem){m_oFocusedMenuItem.blurEvent.fire();m_oFocusedMenuItem=null;}}}
function onMenuDestroy(p_sType,p_aArgs,p_oMenu){if(m_oMenus[p_oMenu.id]){this.removeMenu(p_oMenu);}}
function onMenuFocus(p_sType,p_aArgs){var oItem=p_aArgs[0];if(oItem){m_oFocusedMenuItem=oItem;}}
function onMenuBlur(p_sType,p_aArgs){m_oFocusedMenuItem=null;}
function onMenuVisibleConfigChange(p_sType,p_aArgs){var bVisible=p_aArgs[0],sId=this.id;if(bVisible){m_oVisibleMenus[sId]=this;}
else if(m_oVisibleMenus[sId]){delete m_oVisibleMenus[sId];}}
function onItemDestroy(p_sType,p_aArgs){removeItem(this);}
function removeItem(p_oMenuItem){var sId=p_oMenuItem.id;if(sId&&m_oItems[sId]){if(m_oFocusedMenuItem==p_oMenuItem){m_oFocusedMenuItem=null;}
delete m_oItems[sId];p_oMenuItem.destroyEvent.unsubscribe(onItemDestroy);}}
function onItemAdded(p_sType,p_aArgs){var oItem=p_aArgs[0],sId;if(oItem instanceof YAHOO.widget.MenuItem){sId=oItem.id;if(!m_oItems[sId]){m_oItems[sId]=oItem;oItem.destroyEvent.subscribe(onItemDestroy);}}}
return{addMenu:function(p_oMenu){var oDoc;if(p_oMenu instanceof YAHOO.widget.Menu&&p_oMenu.id&&!m_oMenus[p_oMenu.id]){m_oMenus[p_oMenu.id]=p_oMenu;if(!m_bInitializedEventHandlers){oDoc=document;Event.on(oDoc,"mouseover",onDOMEvent,this,true);Event.on(oDoc,"mouseout",onDOMEvent,this,true);Event.on(oDoc,"mousedown",onDOMEvent,this,true);Event.on(oDoc,"mouseup",onDOMEvent,this,true);Event.on(oDoc,"click",onDOMEvent,this,true);Event.on(oDoc,"keydown",onDOMEvent,this,true);Event.on(oDoc,"keyup",onDOMEvent,this,true);Event.on(oDoc,"keypress",onDOMEvent,this,true);m_bInitializedEventHandlers=true;}
p_oMenu.cfg.subscribeToConfigEvent("visible",onMenuVisibleConfigChange);p_oMenu.destroyEvent.subscribe(onMenuDestroy,p_oMenu,this);p_oMenu.itemAddedEvent.subscribe(onItemAdded);p_oMenu.focusEvent.subscribe(onMenuFocus);p_oMenu.blurEvent.subscribe(onMenuBlur);}},removeMenu:function(p_oMenu){var sId,aItems,i;if(p_oMenu){sId=p_oMenu.id;if(m_oMenus[sId]==p_oMenu){aItems=p_oMenu.getItems();if(aItems&&aItems.length>0){i=aItems.length-1;do{removeItem(aItems[i]);}
while(i--);}
delete m_oMenus[sId];if(m_oVisibleMenus[sId]==p_oMenu){delete m_oVisibleMenus[sId];}
if(p_oMenu.cfg){p_oMenu.cfg.unsubscribeFromConfigEvent("visible",onMenuVisibleConfigChange);}
p_oMenu.destroyEvent.unsubscribe(onMenuDestroy,p_oMenu);p_oMenu.itemAddedEvent.unsubscribe(onItemAdded);p_oMenu.focusEvent.unsubscribe(onMenuFocus);p_oMenu.blurEvent.unsubscribe(onMenuBlur);}}},hideVisible:function(){var oMenu;for(var i in m_oVisibleMenus){if(YAHOO.lang.hasOwnProperty(m_oVisibleMenus,i)){oMenu=m_oVisibleMenus[i];if(!(oMenu instanceof YAHOO.widget.MenuBar)&&oMenu.cfg.getProperty("position")=="dynamic"){oMenu.hide();}}}},getVisible:function(){return m_oVisibleMenus;},getMenus:function(){return m_oMenus;},getMenu:function(p_sId){var oMenu=m_oMenus[p_sId];if(oMenu){return oMenu;}},getMenuItem:function(p_sId){var oItem=m_oItems[p_sId];if(oItem){return oItem;}},getMenuItemGroup:function(p_sId){var oUL=Dom.get(p_sId),aItems,oNode,oItem,sId;if(oUL&&oUL.tagName&&oUL.tagName.toUpperCase()=="UL"){oNode=oUL.firstChild;if(oNode){aItems=[];do{sId=oNode.id;if(sId){oItem=this.getMenuItem(sId);if(oItem){aItems[aItems.length]=oItem;}}}
while((oNode=oNode.nextSibling));if(aItems.length>0){return aItems;}}}},getFocusedMenuItem:function(){return m_oFocusedMenuItem;},getFocusedMenu:function(){if(m_oFocusedMenuItem){return(m_oFocusedMenuItem.parent.getRoot());}},toString:function(){return"MenuManager";}};}();})();(function(){YAHOO.widget.Menu=function(p_oElement,p_oConfig){if(p_oConfig){this.parent=p_oConfig.parent;this.lazyLoad=p_oConfig.lazyLoad||p_oConfig.lazyload;this.itemData=p_oConfig.itemData||p_oConfig.itemdata;}
YAHOO.widget.Menu.superclass.constructor.call(this,p_oElement,p_oConfig);};function checkPosition(p_sPosition){if(typeof p_sPosition=="string"){return("dynamic,static".indexOf((p_sPosition.toLowerCase()))!=-1);}}
var Dom=YAHOO.util.Dom,Event=YAHOO.util.Event,Module=YAHOO.widget.Module,Overlay=YAHOO.widget.Overlay,Menu=YAHOO.widget.Menu,MenuManager=YAHOO.widget.MenuManager,CustomEvent=YAHOO.util.CustomEvent,Lang=YAHOO.lang,UA=YAHOO.env.ua,m_oShadowTemplate,EVENT_TYPES={"MOUSE_OVER":"mouseover","MOUSE_OUT":"mouseout","MOUSE_DOWN":"mousedown","MOUSE_UP":"mouseup","CLICK":"click","KEY_PRESS":"keypress","KEY_DOWN":"keydown","KEY_UP":"keyup","FOCUS":"focus","BLUR":"blur","ITEM_ADDED":"itemAdded","ITEM_REMOVED":"itemRemoved"},DEFAULT_CONFIG={"VISIBLE":{key:"visible",value:false,validator:Lang.isBoolean},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:true,validator:Lang.isBoolean,supercedes:["iframe","x","y","xy"]},"POSITION":{key:"position",value:"dynamic",validator:checkPosition,supercedes:["visible","iframe"]},"SUBMENU_ALIGNMENT":{key:"submenualignment",value:["tl","tr"],suppressEvent:true},"AUTO_SUBMENU_DISPLAY":{key:"autosubmenudisplay",value:true,validator:Lang.isBoolean,suppressEvent:true},"SHOW_DELAY":{key:"showdelay",value:250,validator:Lang.isNumber,suppressEvent:true},"HIDE_DELAY":{key:"hidedelay",value:0,validator:Lang.isNumber,suppressEvent:true},"SUBMENU_HIDE_DELAY":{key:"submenuhidedelay",value:250,validator:Lang.isNumber,suppressEvent:true},"CLICK_TO_HIDE":{key:"clicktohide",value:true,validator:Lang.isBoolean,suppressEvent:true},"CONTAINER":{key:"container",suppressEvent:true},"SCROLL_INCREMENT":{key:"scrollincrement",value:1,validator:Lang.isNumber,supercedes:["maxheight"],suppressEvent:true},"MIN_SCROLL_HEIGHT":{key:"minscrollheight",value:90,validator:Lang.isNumber,supercedes:["maxheight"],suppressEvent:true},"MAX_HEIGHT":{key:"maxheight",value:0,validator:Lang.isNumber,supercedes:["iframe"],suppressEvent:true},"CLASS_NAME":{key:"classname",value:null,validator:Lang.isString,suppressEvent:true},"DISABLED":{key:"disabled",value:false,validator:Lang.isBoolean,suppressEvent:true}};YAHOO.lang.extend(Menu,Overlay,{CSS_CLASS_NAME:"yuimenu",ITEM_TYPE:null,GROUP_TITLE_TAG_NAME:"h6",OFF_SCREEN_POSITION:[-10000,-10000],_nHideDelayId:null,_nShowDelayId:null,_nSubmenuHideDelayId:null,_nBodyScrollId:null,_bHideDelayEventHandlersAssigned:false,_bHandledMouseOverEvent:false,_bHandledMouseOutEvent:false,_aGroupTitleElements:null,_aItemGroups:null,_aListElements:null,_nCurrentMouseX:0,_bStopMouseEventHandlers:false,_sClassName:null,lazyLoad:false,itemData:null,activeItem:null,parent:null,srcElement:null,mouseOverEvent:null,mouseOutEvent:null,mouseDownEvent:null,mouseUpEvent:null,clickEvent:null,keyPressEvent:null,keyDownEvent:null,keyUpEvent:null,itemAddedEvent:null,itemRemovedEvent:null,init:function(p_oElement,p_oConfig){this._aItemGroups=[];this._aListElements=[];this._aGroupTitleElements=[];if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuItem;}
var oElement;if(typeof p_oElement=="string"){oElement=document.getElementById(p_oElement);}
else if(p_oElement.tagName){oElement=p_oElement;}
if(oElement&&oElement.tagName){switch(oElement.tagName.toUpperCase()){case"DIV":this.srcElement=oElement;if(!oElement.id){oElement.setAttribute("id",Dom.generateId());}
Menu.superclass.init.call(this,oElement);this.beforeInitEvent.fire(Menu);break;case"SELECT":this.srcElement=oElement;Menu.superclass.init.call(this,Dom.generateId());this.beforeInitEvent.fire(Menu);break;}}
else{Menu.superclass.init.call(this,p_oElement);this.beforeInitEvent.fire(Menu);}
if(this.element){Dom.addClass(this.element,this.CSS_CLASS_NAME);this.initEvent.subscribe(this._onInit);this.beforeRenderEvent.subscribe(this._onBeforeRender);this.renderEvent.subscribe(this._onRender);this.renderEvent.subscribe(this.onRender);this.beforeShowEvent.subscribe(this._onBeforeShow);this.hideEvent.subscribe(this.positionOffScreen);this.showEvent.subscribe(this._onShow);this.beforeHideEvent.subscribe(this._onBeforeHide);this.mouseOverEvent.subscribe(this._onMouseOver);this.mouseOutEvent.subscribe(this._onMouseOut);this.clickEvent.subscribe(this._onClick);this.keyDownEvent.subscribe(this._onKeyDown);this.keyPressEvent.subscribe(this._onKeyPress);if(UA.gecko||UA.webkit){this.cfg.subscribeToConfigEvent("y",this._onYChange);}
if(p_oConfig){this.cfg.applyConfig(p_oConfig,true);}
MenuManager.addMenu(this);this.initEvent.fire(Menu);}},_initSubTree:function(){var oSrcElement=this.srcElement,sSrcElementTagName,nGroup,sGroupTitleTagName,oNode,aListElements,nListElements,i;if(oSrcElement){sSrcElementTagName=(oSrcElement.tagName&&oSrcElement.tagName.toUpperCase());if(sSrcElementTagName=="DIV"){oNode=this.body.firstChild;if(oNode){nGroup=0;sGroupTitleTagName=this.GROUP_TITLE_TAG_NAME.toUpperCase();do{if(oNode&&oNode.tagName){switch(oNode.tagName.toUpperCase()){case sGroupTitleTagName:this._aGroupTitleElements[nGroup]=oNode;break;case"UL":this._aListElements[nGroup]=oNode;this._aItemGroups[nGroup]=[];nGroup++;break;}}}
while((oNode=oNode.nextSibling));if(this._aListElements[0]){Dom.addClass(this._aListElements[0],"first-of-type");}}}
oNode=null;if(sSrcElementTagName){switch(sSrcElementTagName){case"DIV":aListElements=this._aListElements;nListElements=aListElements.length;if(nListElements>0){i=nListElements-1;do{oNode=aListElements[i].firstChild;if(oNode){do{if(oNode&&oNode.tagName&&oNode.tagName.toUpperCase()=="LI"){this.addItem(new this.ITEM_TYPE(oNode,{parent:this}),i);}}
while((oNode=oNode.nextSibling));}}
while(i--);}
break;case"SELECT":oNode=oSrcElement.firstChild;do{if(oNode&&oNode.tagName){switch(oNode.tagName.toUpperCase()){case"OPTGROUP":case"OPTION":this.addItem(new this.ITEM_TYPE(oNode,{parent:this}));break;}}}
while((oNode=oNode.nextSibling));break;}}}},_getFirstEnabledItem:function(){var aItems=this.getItems(),nItems=aItems.length,oItem;for(var i=0;i<nItems;i++){oItem=aItems[i];if(oItem&&!oItem.cfg.getProperty("disabled")&&oItem.element.style.display!="none"){return oItem;}}},_addItemToGroup:function(p_nGroupIndex,p_oItem,p_nItemIndex){var oItem,nGroupIndex,aGroup,oGroupItem,bAppend,oNextItemSibling,nItemIndex;function getNextItemSibling(p_aArray,p_nStartIndex){return(p_aArray[p_nStartIndex]||getNextItemSibling(p_aArray,(p_nStartIndex+1)));}
if(p_oItem instanceof this.ITEM_TYPE){oItem=p_oItem;oItem.parent=this;}
else if(typeof p_oItem=="string"){oItem=new this.ITEM_TYPE(p_oItem,{parent:this});}
else if(typeof p_oItem=="object"){p_oItem.parent=this;oItem=new this.ITEM_TYPE(p_oItem.text,p_oItem);}
if(oItem){if(oItem.cfg.getProperty("selected")){this.activeItem=oItem;}
nGroupIndex=typeof p_nGroupIndex=="number"?p_nGroupIndex:0;aGroup=this._getItemGroup(nGroupIndex);if(!aGroup){aGroup=this._createItemGroup(nGroupIndex);}
if(typeof p_nItemIndex=="number"){bAppend=(p_nItemIndex>=aGroup.length);if(aGroup[p_nItemIndex]){aGroup.splice(p_nItemIndex,0,oItem);}
else{aGroup[p_nItemIndex]=oItem;}
oGroupItem=aGroup[p_nItemIndex];if(oGroupItem){if(bAppend&&(!oGroupItem.element.parentNode||oGroupItem.element.parentNode.nodeType==11)){this._aListElements[nGroupIndex].appendChild(oGroupItem.element);}
else{oNextItemSibling=getNextItemSibling(aGroup,(p_nItemIndex+1));if(oNextItemSibling&&(!oGroupItem.element.parentNode||oGroupItem.element.parentNode.nodeType==11)){this._aListElements[nGroupIndex].insertBefore(oGroupItem.element,oNextItemSibling.element);}}
oGroupItem.parent=this;this._subscribeToItemEvents(oGroupItem);this._configureSubmenu(oGroupItem);this._updateItemProperties(nGroupIndex);this.itemAddedEvent.fire(oGroupItem);this.changeContentEvent.fire();return oGroupItem;}}
else{nItemIndex=aGroup.length;aGroup[nItemIndex]=oItem;oGroupItem=aGroup[nItemIndex];if(oGroupItem){if(!Dom.isAncestor(this._aListElements[nGroupIndex],oGroupItem.element)){this._aListElements[nGroupIndex].appendChild(oGroupItem.element);}
oGroupItem.element.setAttribute("groupindex",nGroupIndex);oGroupItem.element.setAttribute("index",nItemIndex);oGroupItem.parent=this;oGroupItem.index=nItemIndex;oGroupItem.groupIndex=nGroupIndex;this._subscribeToItemEvents(oGroupItem);this._configureSubmenu(oGroupItem);if(nItemIndex===0){Dom.addClass(oGroupItem.element,"first-of-type");}
this.itemAddedEvent.fire(oGroupItem);this.changeContentEvent.fire();return oGroupItem;}}}},_removeItemFromGroupByIndex:function(p_nGroupIndex,p_nItemIndex){var nGroupIndex=typeof p_nGroupIndex=="number"?p_nGroupIndex:0,aGroup=this._getItemGroup(nGroupIndex),aArray,oItem,oUL;if(aGroup){aArray=aGroup.splice(p_nItemIndex,1);oItem=aArray[0];if(oItem){this._updateItemProperties(nGroupIndex);if(aGroup.length===0){oUL=this._aListElements[nGroupIndex];if(this.body&&oUL){this.body.removeChild(oUL);}
this._aItemGroups.splice(nGroupIndex,1);this._aListElements.splice(nGroupIndex,1);oUL=this._aListElements[0];if(oUL){Dom.addClass(oUL,"first-of-type");}}
this.itemRemovedEvent.fire(oItem);this.changeContentEvent.fire();return oItem;}}},_removeItemFromGroupByValue:function(p_nGroupIndex,p_oItem){var aGroup=this._getItemGroup(p_nGroupIndex),nItems,nItemIndex,i;if(aGroup){nItems=aGroup.length;nItemIndex=-1;if(nItems>0){i=nItems-1;do{if(aGroup[i]==p_oItem){nItemIndex=i;break;}}
while(i--);if(nItemIndex>-1){return(this._removeItemFromGroupByIndex(p_nGroupIndex,nItemIndex));}}}},_updateItemProperties:function(p_nGroupIndex){var aGroup=this._getItemGroup(p_nGroupIndex),nItems=aGroup.length,oItem,oLI,i;if(nItems>0){i=nItems-1;do{oItem=aGroup[i];if(oItem){oLI=oItem.element;oItem.index=i;oItem.groupIndex=p_nGroupIndex;oLI.setAttribute("groupindex",p_nGroupIndex);oLI.setAttribute("index",i);Dom.removeClass(oLI,"first-of-type");}}
while(i--);if(oLI){Dom.addClass(oLI,"first-of-type");}}},_createItemGroup:function(p_nIndex){var oUL;if(!this._aItemGroups[p_nIndex]){this._aItemGroups[p_nIndex]=[];oUL=document.createElement("ul");this._aListElements[p_nIndex]=oUL;return this._aItemGroups[p_nIndex];}},_getItemGroup:function(p_nIndex){var nIndex=((typeof p_nIndex=="number")?p_nIndex:0);return this._aItemGroups[nIndex];},_configureSubmenu:function(p_oItem){var oSubmenu=p_oItem.cfg.getProperty("submenu");if(oSubmenu){this.cfg.configChangedEvent.subscribe(this._onParentMenuConfigChange,oSubmenu,true);this.renderEvent.subscribe(this._onParentMenuRender,oSubmenu,true);oSubmenu.beforeShowEvent.subscribe(this._onSubmenuBeforeShow);}},_subscribeToItemEvents:function(p_oItem){p_oItem.focusEvent.subscribe(this._onMenuItemFocus);p_oItem.blurEvent.subscribe(this._onMenuItemBlur);p_oItem.destroyEvent.subscribe(this._onMenuItemDestroy,p_oItem,this);p_oItem.cfg.configChangedEvent.subscribe(this._onMenuItemConfigChange,p_oItem,this);},_onVisibleChange:function(p_sType,p_aArgs){var bVisible=p_aArgs[0];if(bVisible){Dom.addClass(this.element,"visible");}
else{Dom.removeClass(this.element,"visible");}},_cancelHideDelay:function(){var oRoot=this.getRoot();if(oRoot._nHideDelayId){window.clearTimeout(oRoot._nHideDelayId);}},_execHideDelay:function(){this._cancelHideDelay();var oRoot=this.getRoot(),me=this;function hideMenu(){if(oRoot.activeItem){oRoot.clearActiveItem();}
if(oRoot==me&&!(me instanceof YAHOO.widget.MenuBar)&&me.cfg.getProperty("position")=="dynamic"){me.hide();}}
oRoot._nHideDelayId=window.setTimeout(hideMenu,oRoot.cfg.getProperty("hidedelay"));},_cancelShowDelay:function(){var oRoot=this.getRoot();if(oRoot._nShowDelayId){window.clearTimeout(oRoot._nShowDelayId);}},_execShowDelay:function(p_oMenu){var oRoot=this.getRoot();function showMenu(){if(p_oMenu.parent.cfg.getProperty("selected")){p_oMenu.show();}}
oRoot._nShowDelayId=window.setTimeout(showMenu,oRoot.cfg.getProperty("showdelay"));},_execSubmenuHideDelay:function(p_oSubmenu,p_nMouseX,p_nHideDelay){var me=this;p_oSubmenu._nSubmenuHideDelayId=window.setTimeout(function(){if(me._nCurrentMouseX>(p_nMouseX+10)){p_oSubmenu._nSubmenuHideDelayId=window.setTimeout(function(){p_oSubmenu.hide();},p_nHideDelay);}
else{p_oSubmenu.hide();}},50);},_disableScrollHeader:function(){if(!this._bHeaderDisabled){Dom.addClass(this.header,"topscrollbar_disabled");this._bHeaderDisabled=true;}},_disableScrollFooter:function(){if(!this._bFooterDisabled){Dom.addClass(this.footer,"bottomscrollbar_disabled");this._bFooterDisabled=true;}},_enableScrollHeader:function(){if(this._bHeaderDisabled){Dom.removeClass(this.header,"topscrollbar_disabled");this._bHeaderDisabled=false;}},_enableScrollFooter:function(){if(this._bFooterDisabled){Dom.removeClass(this.footer,"bottomscrollbar_disabled");this._bFooterDisabled=false;}},_onMouseOver:function(p_sType,p_aArgs){if(this._bStopMouseEventHandlers){return false;}
var oEvent=p_aArgs[0],oItem=p_aArgs[1],oTarget=Event.getTarget(oEvent),oParentMenu,nShowDelay,bShowDelay,oActiveItem,oItemCfg,oSubmenu;if(!this._bHandledMouseOverEvent&&(oTarget==this.element||Dom.isAncestor(this.element,oTarget))){this._nCurrentMouseX=0;Event.on(this.element,"mousemove",this._onMouseMove,this,true);this.clearActiveItem();if(this.parent&&this._nSubmenuHideDelayId){window.clearTimeout(this._nSubmenuHideDelayId);this.parent.cfg.setProperty("selected",true);oParentMenu=this.parent.parent;oParentMenu._bHandledMouseOutEvent=true;oParentMenu._bHandledMouseOverEvent=false;}
this._bHandledMouseOverEvent=true;this._bHandledMouseOutEvent=false;}
if(oItem&&!oItem.handledMouseOverEvent&&!oItem.cfg.getProperty("disabled")&&(oTarget==oItem.element||Dom.isAncestor(oItem.element,oTarget))){nShowDelay=this.cfg.getProperty("showdelay");bShowDelay=(nShowDelay>0);if(bShowDelay){this._cancelShowDelay();}
oActiveItem=this.activeItem;if(oActiveItem){oActiveItem.cfg.setProperty("selected",false);}
oItemCfg=oItem.cfg;oItemCfg.setProperty("selected",true);if(this.hasFocus()){oItem.focus();}
if(this.cfg.getProperty("autosubmenudisplay")){oSubmenu=oItemCfg.getProperty("submenu");if(oSubmenu){if(bShowDelay){this._execShowDelay(oSubmenu);}
else{oSubmenu.show();}}}
oItem.handledMouseOverEvent=true;oItem.handledMouseOutEvent=false;}},_onMouseOut:function(p_sType,p_aArgs){if(this._bStopMouseEventHandlers){return false;}
var oEvent=p_aArgs[0],oItem=p_aArgs[1],oRelatedTarget=Event.getRelatedTarget(oEvent),bMovingToSubmenu=false,oItemCfg,oSubmenu,nSubmenuHideDelay,nShowDelay;if(oItem&&!oItem.cfg.getProperty("disabled")){oItemCfg=oItem.cfg;oSubmenu=oItemCfg.getProperty("submenu");if(oSubmenu&&(oRelatedTarget==oSubmenu.element||Dom.isAncestor(oSubmenu.element,oRelatedTarget))){bMovingToSubmenu=true;}
if(!oItem.handledMouseOutEvent&&((oRelatedTarget!=oItem.element&&!Dom.isAncestor(oItem.element,oRelatedTarget))||bMovingToSubmenu)){if(!bMovingToSubmenu){oItem.cfg.setProperty("selected",false);if(oSubmenu){nSubmenuHideDelay=this.cfg.getProperty("submenuhidedelay");nShowDelay=this.cfg.getProperty("showdelay");if(!(this instanceof YAHOO.widget.MenuBar)&&nSubmenuHideDelay>0&&nShowDelay>=nSubmenuHideDelay){this._execSubmenuHideDelay(oSubmenu,Event.getPageX(oEvent),nSubmenuHideDelay);}
else{oSubmenu.hide();}}}
oItem.handledMouseOutEvent=true;oItem.handledMouseOverEvent=false;}}
if(!this._bHandledMouseOutEvent&&((oRelatedTarget!=this.element&&!Dom.isAncestor(this.element,oRelatedTarget))||bMovingToSubmenu)){Event.removeListener(this.element,"mousemove",this._onMouseMove);this._nCurrentMouseX=Event.getPageX(oEvent);this._bHandledMouseOutEvent=true;this._bHandledMouseOverEvent=false;}},_onMouseMove:function(p_oEvent,p_oMenu){if(this._bStopMouseEventHandlers){return false;}
this._nCurrentMouseX=Event.getPageX(p_oEvent);},_onClick:function(p_sType,p_aArgs){var oEvent=p_aArgs[0],oItem=p_aArgs[1],bInMenuAnchor=false,oSubmenu,oRoot,sId,sURL,nHashPos,nLen;if(oItem){if(oItem.cfg.getProperty("disabled")){Event.preventDefault(oEvent);}
else{oSubmenu=oItem.cfg.getProperty("submenu");sURL=oItem.cfg.getProperty("url");if(sURL){nHashPos=sURL.indexOf("#");nLen=sURL.length;if(nHashPos!=-1){sURL=sURL.substr(nHashPos,nLen);nLen=sURL.length;if(nLen>1){sId=sURL.substr(1,nLen);bInMenuAnchor=Dom.isAncestor(this.element,sId);}
else if(nLen===1){bInMenuAnchor=true;}}}
if(bInMenuAnchor&&!oItem.cfg.getProperty("target")){Event.preventDefault(oEvent);if(UA.webkit){oItem.focus();}
else{oItem.focusEvent.fire();}}
if(!oSubmenu){if((UA.gecko&&this.platform=="windows")&&oEvent.button>0){return;}
oRoot=this.getRoot();if(oRoot instanceof YAHOO.widget.MenuBar||oRoot.cfg.getProperty("position")=="static"){oRoot.clearActiveItem();}
else{oRoot.hide();}}}}},_onKeyDown:function(p_sType,p_aArgs){var oEvent=p_aArgs[0],oItem=p_aArgs[1],me=this,oSubmenu,oItemCfg,oParentItem,oRoot,oNextItem,oBody,nBodyScrollTop,nBodyOffsetHeight,aItems,nItems,nNextItemOffsetTop,nScrollTarget,oParentMenu;function stopMouseEventHandlers(){me._bStopMouseEventHandlers=true;window.setTimeout(function(){me._bStopMouseEventHandlers=false;},10);}
if(oItem&&!oItem.cfg.getProperty("disabled")){oItemCfg=oItem.cfg;oParentItem=this.parent;switch(oEvent.keyCode){case 38:case 40:oNextItem=(oEvent.keyCode==38)?oItem.getPreviousEnabledSibling():oItem.getNextEnabledSibling();if(oNextItem){this.clearActiveItem();oNextItem.cfg.setProperty("selected",true);oNextItem.focus();if(this.cfg.getProperty("maxheight")>0){oBody=this.body;nBodyScrollTop=oBody.scrollTop;nBodyOffsetHeight=oBody.offsetHeight;aItems=this.getItems();nItems=aItems.length-1;nNextItemOffsetTop=oNextItem.element.offsetTop;if(oEvent.keyCode==40){if(nNextItemOffsetTop>=(nBodyOffsetHeight+nBodyScrollTop)){oBody.scrollTop=nNextItemOffsetTop-nBodyOffsetHeight;}
else if(nNextItemOffsetTop<=nBodyScrollTop){oBody.scrollTop=0;}
if(oNextItem==aItems[nItems]){oBody.scrollTop=oNextItem.element.offsetTop;}}
else{if(nNextItemOffsetTop<=nBodyScrollTop){oBody.scrollTop=nNextItemOffsetTop-oNextItem.element.offsetHeight;}
else if(nNextItemOffsetTop>=(nBodyScrollTop+nBodyOffsetHeight)){oBody.scrollTop=nNextItemOffsetTop;}
if(oNextItem==aItems[0]){oBody.scrollTop=0;}}
nBodyScrollTop=oBody.scrollTop;nScrollTarget=oBody.scrollHeight-oBody.offsetHeight;if(nBodyScrollTop===0){this._disableScrollHeader();this._enableScrollFooter();}
else if(nBodyScrollTop==nScrollTarget){this._enableScrollHeader();this._disableScrollFooter();}
else{this._enableScrollHeader();this._enableScrollFooter();}}}
Event.preventDefault(oEvent);stopMouseEventHandlers();break;case 39:oSubmenu=oItemCfg.getProperty("submenu");if(oSubmenu){if(!oItemCfg.getProperty("selected")){oItemCfg.setProperty("selected",true);}
oSubmenu.show();oSubmenu.setInitialFocus();oSubmenu.setInitialSelection();}
else{oRoot=this.getRoot();if(oRoot instanceof YAHOO.widget.MenuBar){oNextItem=oRoot.activeItem.getNextEnabledSibling();if(oNextItem){oRoot.clearActiveItem();oNextItem.cfg.setProperty("selected",true);oSubmenu=oNextItem.cfg.getProperty("submenu");if(oSubmenu){oSubmenu.show();}
oNextItem.focus();}}}
Event.preventDefault(oEvent);stopMouseEventHandlers();break;case 37:if(oParentItem){oParentMenu=oParentItem.parent;if(oParentMenu instanceof YAHOO.widget.MenuBar){oNextItem=oParentMenu.activeItem.getPreviousEnabledSibling();if(oNextItem){oParentMenu.clearActiveItem();oNextItem.cfg.setProperty("selected",true);oSubmenu=oNextItem.cfg.getProperty("submenu");if(oSubmenu){oSubmenu.show();}
oNextItem.focus();}}
else{this.hide();oParentItem.focus();}}
Event.preventDefault(oEvent);stopMouseEventHandlers();break;}}
if(oEvent.keyCode==27){if(this.cfg.getProperty("position")=="dynamic"){this.hide();if(this.parent){this.parent.focus();}}
else if(this.activeItem){oSubmenu=this.activeItem.cfg.getProperty("submenu");if(oSubmenu&&oSubmenu.cfg.getProperty("visible")){oSubmenu.hide();this.activeItem.focus();}
else{this.activeItem.blur();this.activeItem.cfg.setProperty("selected",false);}}
Event.preventDefault(oEvent);}},_onKeyPress:function(p_sType,p_aArgs){var oEvent=p_aArgs[0];if(oEvent.keyCode==40||oEvent.keyCode==38){Event.preventDefault(oEvent);}},_onYChange:function(p_sType,p_aArgs){var oParent=this.parent,nScrollTop,oIFrame,nY;if(oParent){nScrollTop=oParent.parent.body.scrollTop;if(nScrollTop>0){nY=(this.cfg.getProperty("y")-nScrollTop);Dom.setY(this.element,nY);oIFrame=this.iframe;if(oIFrame){Dom.setY(oIFrame,nY);}
this.cfg.setProperty("y",nY,true);}}},_onScrollTargetMouseOver:function(p_oEvent,p_oMenu){this._cancelHideDelay();var oTarget=Event.getTarget(p_oEvent),oBody=this.body,me=this,nScrollIncrement=this.cfg.getProperty("scrollincrement"),nScrollTarget,fnScrollFunction;function scrollBodyDown(){var nScrollTop=oBody.scrollTop;if(nScrollTop<nScrollTarget){oBody.scrollTop=(nScrollTop+nScrollIncrement);me._enableScrollHeader();}
else{oBody.scrollTop=nScrollTarget;window.clearInterval(me._nBodyScrollId);me._disableScrollFooter();}}
function scrollBodyUp(){var nScrollTop=oBody.scrollTop;if(nScrollTop>0){oBody.scrollTop=(nScrollTop-nScrollIncrement);me._enableScrollFooter();}
else{oBody.scrollTop=0;window.clearInterval(me._nBodyScrollId);me._disableScrollHeader();}}
if(Dom.hasClass(oTarget,"hd")){fnScrollFunction=scrollBodyUp;}
else{nScrollTarget=oBody.scrollHeight-oBody.offsetHeight;fnScrollFunction=scrollBodyDown;}
this._nBodyScrollId=window.setInterval(fnScrollFunction,10);},_onScrollTargetMouseOut:function(p_oEvent,p_oMenu){window.clearInterval(this._nBodyScrollId);this._cancelHideDelay();},_onInit:function(p_sType,p_aArgs){this.cfg.subscribeToConfigEvent("visible",this._onVisibleChange);var bRootMenu=!this.parent,bLazyLoad=this.lazyLoad;if(((bRootMenu&&!bLazyLoad)||(bRootMenu&&(this.cfg.getProperty("visible")||this.cfg.getProperty("position")=="static"))||(!bRootMenu&&!bLazyLoad))&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}
if(this.itemData){this.addItems(this.itemData);}}
else if(bLazyLoad){this.cfg.fireQueue();}},_onBeforeRender:function(p_sType,p_aArgs){var oEl=this.element,nListElements=this._aListElements.length,bFirstList=true,i=0,oUL,oGroupTitle;if(nListElements>0){do{oUL=this._aListElements[i];if(oUL){if(bFirstList){Dom.addClass(oUL,"first-of-type");bFirstList=false;}
if(!Dom.isAncestor(oEl,oUL)){this.appendToBody(oUL);}
oGroupTitle=this._aGroupTitleElements[i];if(oGroupTitle){if(!Dom.isAncestor(oEl,oGroupTitle)){oUL.parentNode.insertBefore(oGroupTitle,oUL);}
Dom.addClass(oUL,"hastitle");}}
i++;}
while(i<nListElements);}},_onRender:function(p_sType,p_aArgs){if(this.cfg.getProperty("position")=="dynamic"){if(!this.cfg.getProperty("visible")){this.positionOffScreen();}}},_onBeforeShow:function(p_sType,p_aArgs){var nOptions,n,nViewportHeight,oRegion,oSrcElement;if(this.lazyLoad&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}
if(this.itemData){if(this.parent&&this.parent.parent&&this.parent.parent.srcElement&&this.parent.parent.srcElement.tagName.toUpperCase()=="SELECT"){nOptions=this.itemData.length;for(n=0;n<nOptions;n++){if(this.itemData[n].tagName){this.addItem((new this.ITEM_TYPE(this.itemData[n])));}}}
else{this.addItems(this.itemData);}}
oSrcElement=this.srcElement;if(oSrcElement){if(oSrcElement.tagName.toUpperCase()=="SELECT"){if(Dom.inDocument(oSrcElement)){this.render(oSrcElement.parentNode);}
else{this.render(this.cfg.getProperty("container"));}}
else{this.render();}}
else{if(this.parent){this.render(this.parent.element);}
else{this.render(this.cfg.getProperty("container"));}}}
var nMaxHeight=this.cfg.getProperty("maxheight"),nMinScrollHeight=this.cfg.getProperty("minscrollheight"),bDynamicPos=this.cfg.getProperty("position")=="dynamic";if(!this.parent&&bDynamicPos){this.cfg.refireEvent("xy");}
function clearMaxHeight(){this.cfg.setProperty("maxheight",0);this.hideEvent.unsubscribe(clearMaxHeight);}
if(!(this instanceof YAHOO.widget.MenuBar)&&bDynamicPos){if(nMaxHeight===0){nViewportHeight=Dom.getViewportHeight();if(this.parent&&this.parent.parent instanceof YAHOO.widget.MenuBar){oRegion=YAHOO.util.Region.getRegion(this.parent.element);nViewportHeight=(nViewportHeight-oRegion.bottom);}
if(this.element.offsetHeight>=nViewportHeight){nMaxHeight=(nViewportHeight-(Overlay.VIEWPORT_OFFSET*2));if(nMaxHeight<nMinScrollHeight){nMaxHeight=nMinScrollHeight;}
this.cfg.setProperty("maxheight",nMaxHeight);this.hideEvent.subscribe(clearMaxHeight);}}}},_onShow:function(p_sType,p_aArgs){var oParent=this.parent,oParentMenu,aParentAlignment,aAlignment;function disableAutoSubmenuDisplay(p_oEvent){var oTarget;if(p_oEvent.type=="mousedown"||(p_oEvent.type=="keydown"&&p_oEvent.keyCode==27)){oTarget=Event.getTarget(p_oEvent);if(oTarget!=oParentMenu.element||!Dom.isAncestor(oParentMenu.element,oTarget)){oParentMenu.cfg.setProperty("autosubmenudisplay",false);Event.removeListener(document,"mousedown",disableAutoSubmenuDisplay);Event.removeListener(document,"keydown",disableAutoSubmenuDisplay);}}}
if(oParent){oParentMenu=oParent.parent;aParentAlignment=oParentMenu.cfg.getProperty("submenualignment");aAlignment=this.cfg.getProperty("submenualignment");if((aParentAlignment[0]!=aAlignment[0])&&(aParentAlignment[1]!=aAlignment[1])){this.cfg.setProperty("submenualignment",[aParentAlignment[0],aParentAlignment[1]]);}
if(!oParentMenu.cfg.getProperty("autosubmenudisplay")&&(oParentMenu instanceof YAHOO.widget.MenuBar||oParentMenu.cfg.getProperty("position")=="static")){oParentMenu.cfg.setProperty("autosubmenudisplay",true);Event.on(document,"mousedown",disableAutoSubmenuDisplay);Event.on(document,"keydown",disableAutoSubmenuDisplay);}}},_onBeforeHide:function(p_sType,p_aArgs){var oActiveItem=this.activeItem,oConfig,oSubmenu;if(oActiveItem){oConfig=oActiveItem.cfg;oConfig.setProperty("selected",false);oSubmenu=oConfig.getProperty("submenu");if(oSubmenu){oSubmenu.hide();}}
if(this.getRoot()==this){this.blur();}},_onParentMenuConfigChange:function(p_sType,p_aArgs,p_oSubmenu){var sPropertyName=p_aArgs[0][0],oPropertyValue=p_aArgs[0][1];switch(sPropertyName){case"iframe":case"constraintoviewport":case"hidedelay":case"showdelay":case"submenuhidedelay":case"clicktohide":case"effect":case"classname":case"scrollincrement":case"minscrollheight":p_oSubmenu.cfg.setProperty(sPropertyName,oPropertyValue);break;}},_onParentMenuRender:function(p_sType,p_aArgs,p_oSubmenu){var oParentCfg=p_oSubmenu.parent.parent.cfg,oConfig={constraintoviewport:oParentCfg.getProperty("constraintoviewport"),xy:[0,0],clicktohide:oParentCfg.getProperty("clicktohide"),effect:oParentCfg.getProperty("effect"),showdelay:oParentCfg.getProperty("showdelay"),hidedelay:oParentCfg.getProperty("hidedelay"),submenuhidedelay:oParentCfg.getProperty("submenuhidedelay"),classname:oParentCfg.getProperty("classname"),scrollincrement:oParentCfg.getProperty("scrollincrement"),minscrollheight:oParentCfg.getProperty("minscrollheight"),iframe:oParentCfg.getProperty("iframe")},oLI;p_oSubmenu.cfg.applyConfig(oConfig);if(!this.lazyLoad){oLI=this.parent.element;if(this.element.parentNode==oLI){this.render();}
else{this.render(oLI);}}},_onSubmenuBeforeShow:function(p_sType,p_aArgs){var oParent=this.parent,aAlignment=oParent.parent.cfg.getProperty("submenualignment");if(!this.cfg.getProperty("context")){this.cfg.setProperty("context",[oParent.element,aAlignment[0],aAlignment[1]]);}
else{this.align();}},_onMenuItemFocus:function(p_sType,p_aArgs){this.parent.focusEvent.fire(this);},_onMenuItemBlur:function(p_sType,p_aArgs){this.parent.blurEvent.fire(this);},_onMenuItemDestroy:function(p_sType,p_aArgs,p_oItem){this._removeItemFromGroupByValue(p_oItem.groupIndex,p_oItem);},_onMenuItemConfigChange:function(p_sType,p_aArgs,p_oItem){var sPropertyName=p_aArgs[0][0],oPropertyValue=p_aArgs[0][1],oSubmenu;switch(sPropertyName){case"selected":if(oPropertyValue===true){this.activeItem=p_oItem;}
break;case"submenu":oSubmenu=p_aArgs[0][1];if(oSubmenu){this._configureSubmenu(p_oItem);}
break;}},enforceConstraints:function(type,args,obj){YAHOO.widget.Menu.superclass.enforceConstraints.apply(this,arguments);var oParent=this.parent,oParentMenu,nParentMenuX,nNewX,nX;if(oParent){oParentMenu=oParent.parent;if(!(oParentMenu instanceof YAHOO.widget.MenuBar)){nParentMenuX=oParentMenu.cfg.getProperty("x");nX=this.cfg.getProperty("x");if(nX<(nParentMenuX+oParent.element.offsetWidth)){nNewX=(nParentMenuX-this.element.offsetWidth);this.cfg.setProperty("x",nNewX,true);this.cfg.setProperty("xy",[nNewX,(this.cfg.getProperty("y"))],true);}}}},configVisible:function(p_sType,p_aArgs,p_oMenu){var bVisible,sDisplay;if(this.cfg.getProperty("position")=="dynamic"){Menu.superclass.configVisible.call(this,p_sType,p_aArgs,p_oMenu);}
else{bVisible=p_aArgs[0];sDisplay=Dom.getStyle(this.element,"display");Dom.setStyle(this.element,"visibility","visible");if(bVisible){if(sDisplay!="block"){this.beforeShowEvent.fire();Dom.setStyle(this.element,"display","block");this.showEvent.fire();}}
else{if(sDisplay=="block"){this.beforeHideEvent.fire();Dom.setStyle(this.element,"display","none");this.hideEvent.fire();}}}},configPosition:function(p_sType,p_aArgs,p_oMenu){var oElement=this.element,sCSSPosition=p_aArgs[0]=="static"?"static":"absolute",oCfg=this.cfg,nZIndex;Dom.setStyle(oElement,"position",sCSSPosition);if(sCSSPosition=="static"){Dom.setStyle(oElement,"display","block");oCfg.setProperty("visible",true);}
else{Dom.setStyle(oElement,"visibility","hidden");}
if(sCSSPosition=="absolute"){nZIndex=oCfg.getProperty("zindex");if(!nZIndex||nZIndex===0){nZIndex=this.parent?(this.parent.parent.cfg.getProperty("zindex")+1):1;oCfg.setProperty("zindex",nZIndex);}}},configIframe:function(p_sType,p_aArgs,p_oMenu){if(this.cfg.getProperty("position")=="dynamic"){Menu.superclass.configIframe.call(this,p_sType,p_aArgs,p_oMenu);}},configHideDelay:function(p_sType,p_aArgs,p_oMenu){var nHideDelay=p_aArgs[0],oMouseOutEvent=this.mouseOutEvent,oMouseOverEvent=this.mouseOverEvent,oKeyDownEvent=this.keyDownEvent;if(nHideDelay>0){if(!this._bHideDelayEventHandlersAssigned){oMouseOutEvent.subscribe(this._execHideDelay);oMouseOverEvent.subscribe(this._cancelHideDelay);oKeyDownEvent.subscribe(this._cancelHideDelay);this._bHideDelayEventHandlersAssigned=true;}}
else{oMouseOutEvent.unsubscribe(this._execHideDelay);oMouseOverEvent.unsubscribe(this._cancelHideDelay);oKeyDownEvent.unsubscribe(this._cancelHideDelay);this._bHideDelayEventHandlersAssigned=false;}},configContainer:function(p_sType,p_aArgs,p_oMenu){var oElement=p_aArgs[0];if(typeof oElement=='string'){this.cfg.setProperty("container",document.getElementById(oElement),true);}},_setMaxHeight:function(p_sType,p_aArgs,p_nMaxHeight){this.cfg.setProperty("maxheight",p_nMaxHeight);this.renderEvent.unsubscribe(this._setMaxHeight);},configMaxHeight:function(p_sType,p_aArgs,p_oMenu){var nMaxHeight=p_aArgs[0],oElement=this.element,oBody=this.body,oHeader=this.header,oFooter=this.footer,fnMouseOver=this._onScrollTargetMouseOver,fnMouseOut=this._onScrollTargetMouseOut,nMinScrollHeight=this.cfg.getProperty("minscrollheight"),nHeight,nOffsetWidth,sWidth;if(nMaxHeight!==0&&nMaxHeight<nMinScrollHeight){nMaxHeight=nMinScrollHeight;}
if(this.lazyLoad&&!oBody){this.renderEvent.unsubscribe(this._setMaxHeight);if(nMaxHeight>0){this.renderEvent.subscribe(this._setMaxHeight,nMaxHeight,this);}
return;}
Dom.setStyle(oBody,"height","");Dom.removeClass(oBody,"yui-menu-body-scrolled");var bSetWidth=((UA.gecko&&this.parent&&this.parent.parent&&this.parent.parent.cfg.getProperty("position")=="dynamic")||UA.ie);if(bSetWidth){if(!this.cfg.getProperty("width")){nOffsetWidth=oElement.offsetWidth;oElement.style.width=nOffsetWidth+"px";sWidth=(nOffsetWidth-(oElement.offsetWidth-nOffsetWidth))+"px";this.cfg.setProperty("width",sWidth);}}
if(!oHeader&&!oFooter){this.setHeader("&#32;");this.setFooter("&#32;");oHeader=this.header;oFooter=this.footer;Dom.addClass(oHeader,"topscrollbar");Dom.addClass(oFooter,"bottomscrollbar");oElement.insertBefore(oHeader,oBody);oElement.appendChild(oFooter);}
nHeight=(nMaxHeight-(oHeader.offsetHeight+oHeader.offsetHeight));if(nHeight>0&&(oBody.offsetHeight>nMaxHeight)){Dom.addClass(oBody,"yui-menu-body-scrolled");Dom.setStyle(oBody,"height",(nHeight+"px"));Event.on(oHeader,"mouseover",fnMouseOver,this,true);Event.on(oHeader,"mouseout",fnMouseOut,this,true);Event.on(oFooter,"mouseover",fnMouseOver,this,true);Event.on(oFooter,"mouseout",fnMouseOut,this,true);this._disableScrollHeader();this._enableScrollFooter();}
else if(oHeader&&oFooter){if(bSetWidth){this.cfg.setProperty("width","");}
this._enableScrollHeader();this._enableScrollFooter();Event.removeListener(oHeader,"mouseover",fnMouseOver);Event.removeListener(oHeader,"mouseout",fnMouseOut);Event.removeListener(oFooter,"mouseover",fnMouseOver);Event.removeListener(oFooter,"mouseout",fnMouseOut);oElement.removeChild(oHeader);oElement.removeChild(oFooter);this.header=null;this.footer=null;}
this.cfg.refireEvent("iframe");},configClassName:function(p_sType,p_aArgs,p_oMenu){var sClassName=p_aArgs[0];if(this._sClassName){Dom.removeClass(this.element,this._sClassName);}
Dom.addClass(this.element,sClassName);this._sClassName=sClassName;},_onItemAdded:function(p_sType,p_aArgs){var oItem=p_aArgs[0];if(oItem){oItem.cfg.setProperty("disabled",true);}},configDisabled:function(p_sType,p_aArgs,p_oMenu){var bDisabled=p_aArgs[0],aItems=this.getItems(),nItems,i;if(Lang.isArray(aItems)){nItems=aItems.length;if(nItems>0){i=nItems-1;do{aItems[i].cfg.setProperty("disabled",bDisabled);}
while(i--);}
if(bDisabled){this.clearActiveItem(true);Dom.addClass(this.element,"disabled");this.itemAddedEvent.subscribe(this._onItemAdded);}
else{Dom.removeClass(this.element,"disabled");this.itemAddedEvent.unsubscribe(this._onItemAdded);}}},onRender:function(p_sType,p_aArgs){function sizeShadow(){var oElement=this.element,oShadow=this._shadow;if(oShadow&&oElement){if(oShadow.style.width&&oShadow.style.height){oShadow.style.width="";oShadow.style.height="";}
oShadow.style.width=(oElement.offsetWidth+6)+"px";oShadow.style.height=(oElement.offsetHeight+1)+"px";}}
function replaceShadow(){this.element.appendChild(this._shadow);}
function addShadowVisibleClass(){Dom.addClass(this._shadow,"yui-menu-shadow-visible");}
function removeShadowVisibleClass(){Dom.removeClass(this._shadow,"yui-menu-shadow-visible");}
function createShadow(){var oShadow=this._shadow,oElement,me;if(!oShadow){oElement=this.element;me=this;if(!m_oShadowTemplate){m_oShadowTemplate=document.createElement("div");m_oShadowTemplate.className="yui-menu-shadow yui-menu-shadow-visible";}
oShadow=m_oShadowTemplate.cloneNode(false);oElement.appendChild(oShadow);this._shadow=oShadow;this.beforeShowEvent.subscribe(addShadowVisibleClass);this.beforeHideEvent.subscribe(removeShadowVisibleClass);if(UA.ie){window.setTimeout(function(){sizeShadow.call(me);me.syncIframe();},0);this.cfg.subscribeToConfigEvent("width",sizeShadow);this.cfg.subscribeToConfigEvent("height",sizeShadow);this.cfg.subscribeToConfigEvent("maxheight",sizeShadow);this.changeContentEvent.subscribe(sizeShadow);Module.textResizeEvent.subscribe(sizeShadow,me,true);this.destroyEvent.subscribe(function(){Module.textResizeEvent.unsubscribe(sizeShadow,me);});}
this.cfg.subscribeToConfigEvent("maxheight",replaceShadow);}}
function onBeforeShow(){createShadow.call(this);this.beforeShowEvent.unsubscribe(onBeforeShow);}
if(this.cfg.getProperty("position")=="dynamic"){if(this.cfg.getProperty("visible")){createShadow.call(this);}
else{this.beforeShowEvent.subscribe(onBeforeShow);}}},initEvents:function(){Menu.superclass.initEvents.call(this);var SIGNATURE=CustomEvent.LIST;this.mouseOverEvent=this.createEvent(EVENT_TYPES.MOUSE_OVER);this.mouseOverEvent.signature=SIGNATURE;this.mouseOutEvent=this.createEvent(EVENT_TYPES.MOUSE_OUT);this.mouseOutEvent.signature=SIGNATURE;this.mouseDownEvent=this.createEvent(EVENT_TYPES.MOUSE_DOWN);this.mouseDownEvent.signature=SIGNATURE;this.mouseUpEvent=this.createEvent(EVENT_TYPES.MOUSE_UP);this.mouseUpEvent.signature=SIGNATURE;this.clickEvent=this.createEvent(EVENT_TYPES.CLICK);this.clickEvent.signature=SIGNATURE;this.keyPressEvent=this.createEvent(EVENT_TYPES.KEY_PRESS);this.keyPressEvent.signature=SIGNATURE;this.keyDownEvent=this.createEvent(EVENT_TYPES.KEY_DOWN);this.keyDownEvent.signature=SIGNATURE;this.keyUpEvent=this.createEvent(EVENT_TYPES.KEY_UP);this.keyUpEvent.signature=SIGNATURE;this.focusEvent=this.createEvent(EVENT_TYPES.FOCUS);this.focusEvent.signature=SIGNATURE;this.blurEvent=this.createEvent(EVENT_TYPES.BLUR);this.blurEvent.signature=SIGNATURE;this.itemAddedEvent=this.createEvent(EVENT_TYPES.ITEM_ADDED);this.itemAddedEvent.signature=SIGNATURE;this.itemRemovedEvent=this.createEvent(EVENT_TYPES.ITEM_REMOVED);this.itemRemovedEvent.signature=SIGNATURE;},positionOffScreen:function(){var oIFrame=this.iframe,aPos=this.OFF_SCREEN_POSITION;Dom.setXY(this.element,aPos);if(oIFrame){Dom.setXY(oIFrame,aPos);}},getRoot:function(){var oItem=this.parent,oParentMenu;if(oItem){oParentMenu=oItem.parent;return oParentMenu?oParentMenu.getRoot():this;}
else{return this;}},toString:function(){var sReturnVal="Menu",sId=this.id;if(sId){sReturnVal+=(" "+sId);}
return sReturnVal;},setItemGroupTitle:function(p_sGroupTitle,p_nGroupIndex){var nGroupIndex,oTitle,i,nFirstIndex;if(typeof p_sGroupTitle=="string"&&p_sGroupTitle.length>0){nGroupIndex=typeof p_nGroupIndex=="number"?p_nGroupIndex:0;oTitle=this._aGroupTitleElements[nGroupIndex];if(oTitle){oTitle.innerHTML=p_sGroupTitle;}
else{oTitle=document.createElement(this.GROUP_TITLE_TAG_NAME);oTitle.innerHTML=p_sGroupTitle;this._aGroupTitleElements[nGroupIndex]=oTitle;}
i=this._aGroupTitleElements.length-1;do{if(this._aGroupTitleElements[i]){Dom.removeClass(this._aGroupTitleElements[i],"first-of-type");nFirstIndex=i;}}
while(i--);if(nFirstIndex!==null){Dom.addClass(this._aGroupTitleElements[nFirstIndex],"first-of-type");}
this.changeContentEvent.fire();}},addItem:function(p_oItem,p_nGroupIndex){if(p_oItem){return this._addItemToGroup(p_nGroupIndex,p_oItem);}},addItems:function(p_aItems,p_nGroupIndex){var nItems,aItems,oItem,i;if(Lang.isArray(p_aItems)){nItems=p_aItems.length;aItems=[];for(i=0;i<nItems;i++){oItem=p_aItems[i];if(oItem){if(Lang.isArray(oItem)){aItems[aItems.length]=this.addItems(oItem,i);}
else{aItems[aItems.length]=this._addItemToGroup(p_nGroupIndex,oItem);}}}
if(aItems.length){return aItems;}}},insertItem:function(p_oItem,p_nItemIndex,p_nGroupIndex){if(p_oItem){return this._addItemToGroup(p_nGroupIndex,p_oItem,p_nItemIndex);}},removeItem:function(p_oObject,p_nGroupIndex){var oItem;if(typeof p_oObject!="undefined"){if(p_oObject instanceof YAHOO.widget.MenuItem){oItem=this._removeItemFromGroupByValue(p_nGroupIndex,p_oObject);}
else if(typeof p_oObject=="number"){oItem=this._removeItemFromGroupByIndex(p_nGroupIndex,p_oObject);}
if(oItem){oItem.destroy();return oItem;}}},getItems:function(){var aGroups=this._aItemGroups,nGroups,aItems=[];if(Lang.isArray(aGroups)){nGroups=aGroups.length;return((nGroups==1)?aGroups[0]:(Array.prototype.concat.apply(aItems,aGroups)));}},getItemGroups:function(){return this._aItemGroups;},getItem:function(p_nItemIndex,p_nGroupIndex){var aGroup;if(typeof p_nItemIndex=="number"){aGroup=this._getItemGroup(p_nGroupIndex);if(aGroup){return aGroup[p_nItemIndex];}}},getSubmenus:function(){var aItems=this.getItems(),nItems=aItems.length,aSubmenus,oSubmenu,oItem,i;if(nItems>0){aSubmenus=[];for(i=0;i<nItems;i++){oItem=aItems[i];if(oItem){oSubmenu=oItem.cfg.getProperty("submenu");if(oSubmenu){aSubmenus[aSubmenus.length]=oSubmenu;}}}}
return aSubmenus;},clearContent:function(){var aItems=this.getItems(),nItems=aItems.length,oElement=this.element,oBody=this.body,oHeader=this.header,oFooter=this.footer,oItem,oSubmenu,i;if(nItems>0){i=nItems-1;do{oItem=aItems[i];if(oItem){oSubmenu=oItem.cfg.getProperty("submenu");if(oSubmenu){this.cfg.configChangedEvent.unsubscribe(this._onParentMenuConfigChange,oSubmenu);this.renderEvent.unsubscribe(this._onParentMenuRender,oSubmenu);}
this.removeItem(oItem);}}
while(i--);}
if(oHeader){Event.purgeElement(oHeader);oElement.removeChild(oHeader);}
if(oFooter){Event.purgeElement(oFooter);oElement.removeChild(oFooter);}
if(oBody){Event.purgeElement(oBody);oBody.innerHTML="";}
this.activeItem=null;this._aItemGroups=[];this._aListElements=[];this._aGroupTitleElements=[];this.cfg.setProperty("width",null);},destroy:function(){this.clearContent();this._aItemGroups=null;this._aListElements=null;this._aGroupTitleElements=null;Menu.superclass.destroy.call(this);},setInitialFocus:function(){var oItem=this._getFirstEnabledItem();if(oItem){oItem.focus();}},setInitialSelection:function(){var oItem=this._getFirstEnabledItem();if(oItem){oItem.cfg.setProperty("selected",true);}},clearActiveItem:function(p_bBlur){if(this.cfg.getProperty("showdelay")>0){this._cancelShowDelay();}
var oActiveItem=this.activeItem,oConfig,oSubmenu;if(oActiveItem){oConfig=oActiveItem.cfg;if(p_bBlur){oActiveItem.blur();}
oConfig.setProperty("selected",false);oSubmenu=oConfig.getProperty("submenu");if(oSubmenu){oSubmenu.hide();}
this.activeItem=null;}},focus:function(){if(!this.hasFocus()){this.setInitialFocus();}},blur:function(){var oItem;if(this.hasFocus()){oItem=MenuManager.getFocusedMenuItem();if(oItem){oItem.blur();}}},hasFocus:function(){return(MenuManager.getFocusedMenu()==this.getRoot());},subscribe:function(){function onItemAdded(p_sType,p_aArgs,p_oObject){var oItem=p_aArgs[0],oSubmenu=oItem.cfg.getProperty("submenu");if(oSubmenu){oSubmenu.subscribe.apply(oSubmenu,p_oObject);}}
function onSubmenuAdded(p_sType,p_aArgs,p_oObject){var oSubmenu=this.cfg.getProperty("submenu");if(oSubmenu){oSubmenu.subscribe.apply(oSubmenu,p_oObject);}}
Menu.superclass.subscribe.apply(this,arguments);Menu.superclass.subscribe.call(this,"itemAdded",onItemAdded,arguments);var aItems=this.getItems(),nItems,oItem,oSubmenu,i;if(aItems){nItems=aItems.length;if(nItems>0){i=nItems-1;do{oItem=aItems[i];oSubmenu=oItem.cfg.getProperty("submenu");if(oSubmenu){oSubmenu.subscribe.apply(oSubmenu,arguments);}
else{oItem.cfg.subscribeToConfigEvent("submenu",onSubmenuAdded,arguments);}}
while(i--);}}},initDefaultConfig:function(){Menu.superclass.initDefaultConfig.call(this);var oConfig=this.cfg;oConfig.addProperty(DEFAULT_CONFIG.VISIBLE.key,{handler:this.configVisible,value:DEFAULT_CONFIG.VISIBLE.value,validator:DEFAULT_CONFIG.VISIBLE.validator});oConfig.addProperty(DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.value,validator:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.validator,supercedes:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.supercedes});oConfig.addProperty(DEFAULT_CONFIG.POSITION.key,{handler:this.configPosition,value:DEFAULT_CONFIG.POSITION.value,validator:DEFAULT_CONFIG.POSITION.validator,supercedes:DEFAULT_CONFIG.POSITION.supercedes});oConfig.addProperty(DEFAULT_CONFIG.SUBMENU_ALIGNMENT.key,{value:DEFAULT_CONFIG.SUBMENU_ALIGNMENT.value,suppressEvent:DEFAULT_CONFIG.SUBMENU_ALIGNMENT.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.AUTO_SUBMENU_DISPLAY.key,{value:DEFAULT_CONFIG.AUTO_SUBMENU_DISPLAY.value,validator:DEFAULT_CONFIG.AUTO_SUBMENU_DISPLAY.validator,suppressEvent:DEFAULT_CONFIG.AUTO_SUBMENU_DISPLAY.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.SHOW_DELAY.key,{value:DEFAULT_CONFIG.SHOW_DELAY.value,validator:DEFAULT_CONFIG.SHOW_DELAY.validator,suppressEvent:DEFAULT_CONFIG.SHOW_DELAY.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.HIDE_DELAY.key,{handler:this.configHideDelay,value:DEFAULT_CONFIG.HIDE_DELAY.value,validator:DEFAULT_CONFIG.HIDE_DELAY.validator,suppressEvent:DEFAULT_CONFIG.HIDE_DELAY.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.SUBMENU_HIDE_DELAY.key,{value:DEFAULT_CONFIG.SUBMENU_HIDE_DELAY.value,validator:DEFAULT_CONFIG.SUBMENU_HIDE_DELAY.validator,suppressEvent:DEFAULT_CONFIG.SUBMENU_HIDE_DELAY.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.CLICK_TO_HIDE.key,{value:DEFAULT_CONFIG.CLICK_TO_HIDE.value,validator:DEFAULT_CONFIG.CLICK_TO_HIDE.validator,suppressEvent:DEFAULT_CONFIG.CLICK_TO_HIDE.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.CONTAINER.key,{handler:this.configContainer,value:document.body,suppressEvent:DEFAULT_CONFIG.CONTAINER.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.SCROLL_INCREMENT.key,{value:DEFAULT_CONFIG.SCROLL_INCREMENT.value,validator:DEFAULT_CONFIG.SCROLL_INCREMENT.validator,supercedes:DEFAULT_CONFIG.SCROLL_INCREMENT.supercedes,suppressEvent:DEFAULT_CONFIG.SCROLL_INCREMENT.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.MIN_SCROLL_HEIGHT.key,{value:DEFAULT_CONFIG.MIN_SCROLL_HEIGHT.value,validator:DEFAULT_CONFIG.MIN_SCROLL_HEIGHT.validator,supercedes:DEFAULT_CONFIG.MIN_SCROLL_HEIGHT.supercedes,suppressEvent:DEFAULT_CONFIG.MIN_SCROLL_HEIGHT.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.MAX_HEIGHT.key,{handler:this.configMaxHeight,value:DEFAULT_CONFIG.MAX_HEIGHT.value,validator:DEFAULT_CONFIG.MAX_HEIGHT.validator,suppressEvent:DEFAULT_CONFIG.MAX_HEIGHT.suppressEvent,supercedes:DEFAULT_CONFIG.MAX_HEIGHT.supercedes});oConfig.addProperty(DEFAULT_CONFIG.CLASS_NAME.key,{handler:this.configClassName,value:DEFAULT_CONFIG.CLASS_NAME.value,validator:DEFAULT_CONFIG.CLASS_NAME.validator,supercedes:DEFAULT_CONFIG.CLASS_NAME.supercedes});oConfig.addProperty(DEFAULT_CONFIG.DISABLED.key,{handler:this.configDisabled,value:DEFAULT_CONFIG.DISABLED.value,validator:DEFAULT_CONFIG.DISABLED.validator,suppressEvent:DEFAULT_CONFIG.DISABLED.suppressEvent});}});})();(function(){YAHOO.widget.MenuItem=function(p_oObject,p_oConfig){if(p_oObject){if(p_oConfig){this.parent=p_oConfig.parent;this.value=p_oConfig.value;this.id=p_oConfig.id;}
this.init(p_oObject,p_oConfig);}};var Dom=YAHOO.util.Dom,Module=YAHOO.widget.Module,Menu=YAHOO.widget.Menu,MenuItem=YAHOO.widget.MenuItem,CustomEvent=YAHOO.util.CustomEvent,Lang=YAHOO.lang,m_oMenuItemTemplate,EVENT_TYPES={"MOUSE_OVER":"mouseover","MOUSE_OUT":"mouseout","MOUSE_DOWN":"mousedown","MOUSE_UP":"mouseup","CLICK":"click","KEY_PRESS":"keypress","KEY_DOWN":"keydown","KEY_UP":"keyup","ITEM_ADDED":"itemAdded","ITEM_REMOVED":"itemRemoved","FOCUS":"focus","BLUR":"blur","DESTROY":"destroy"},DEFAULT_CONFIG={"TEXT":{key:"text",value:"",validator:Lang.isString,suppressEvent:true},"HELP_TEXT":{key:"helptext",supercedes:["text"],suppressEvent:true},"URL":{key:"url",value:"#",suppressEvent:true},"TARGET":{key:"target",suppressEvent:true},"EMPHASIS":{key:"emphasis",value:false,validator:Lang.isBoolean,suppressEvent:true,supercedes:["text"]},"STRONG_EMPHASIS":{key:"strongemphasis",value:false,validator:Lang.isBoolean,suppressEvent:true,supercedes:["text"]},"CHECKED":{key:"checked",value:false,validator:Lang.isBoolean,suppressEvent:true,supercedes:["disabled","selected"]},"SUBMENU":{key:"submenu",suppressEvent:true,supercedes:["disabled","selected"]},"DISABLED":{key:"disabled",value:false,validator:Lang.isBoolean,suppressEvent:true,supercedes:["text","selected"]},"SELECTED":{key:"selected",value:false,validator:Lang.isBoolean,suppressEvent:true},"ONCLICK":{key:"onclick",suppressEvent:true},"CLASS_NAME":{key:"classname",value:null,validator:Lang.isString,suppressEvent:true}};MenuItem.prototype={CSS_CLASS_NAME:"yuimenuitem",CSS_LABEL_CLASS_NAME:"yuimenuitemlabel",SUBMENU_TYPE:null,_oAnchor:null,_oHelpTextEM:null,_oSubmenu:null,_oOnclickAttributeValue:null,_sClassName:null,constructor:MenuItem,index:null,groupIndex:null,parent:null,element:null,srcElement:null,value:null,browser:Module.prototype.browser,id:null,destroyEvent:null,mouseOverEvent:null,mouseOutEvent:null,mouseDownEvent:null,mouseUpEvent:null,clickEvent:null,keyPressEvent:null,keyDownEvent:null,keyUpEvent:null,focusEvent:null,blurEvent:null,init:function(p_oObject,p_oConfig){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=Menu;}
this.cfg=new YAHOO.util.Config(this);this.initDefaultConfig();var SIGNATURE=CustomEvent.LIST,oConfig=this.cfg,sURL="#",oAnchor,sTarget,sText,sId;if(Lang.isString(p_oObject)){this._createRootNodeStructure();oConfig.queueProperty("text",p_oObject);}
else if(p_oObject&&p_oObject.tagName){switch(p_oObject.tagName.toUpperCase()){case"OPTION":this._createRootNodeStructure();oConfig.queueProperty("text",p_oObject.text);oConfig.queueProperty("disabled",p_oObject.disabled);this.value=p_oObject.value;this.srcElement=p_oObject;break;case"OPTGROUP":this._createRootNodeStructure();oConfig.queueProperty("text",p_oObject.label);oConfig.queueProperty("disabled",p_oObject.disabled);this.srcElement=p_oObject;this._initSubTree();break;case"LI":oAnchor=Dom.getFirstChild(p_oObject);if(oAnchor){sURL=oAnchor.getAttribute("href",2);sTarget=oAnchor.getAttribute("target");sText=oAnchor.innerHTML;}
this.srcElement=p_oObject;this.element=p_oObject;this._oAnchor=oAnchor;oConfig.setProperty("text",sText,true);oConfig.setProperty("url",sURL,true);oConfig.setProperty("target",sTarget,true);this._initSubTree();break;}}
if(this.element){sId=(this.srcElement||this.element).id;if(!sId){sId=this.id||Dom.generateId();this.element.id=sId;}
this.id=sId;Dom.addClass(this.element,this.CSS_CLASS_NAME);Dom.addClass(this._oAnchor,this.CSS_LABEL_CLASS_NAME);this.mouseOverEvent=this.createEvent(EVENT_TYPES.MOUSE_OVER);this.mouseOverEvent.signature=SIGNATURE;this.mouseOutEvent=this.createEvent(EVENT_TYPES.MOUSE_OUT);this.mouseOutEvent.signature=SIGNATURE;this.mouseDownEvent=this.createEvent(EVENT_TYPES.MOUSE_DOWN);this.mouseDownEvent.signature=SIGNATURE;this.mouseUpEvent=this.createEvent(EVENT_TYPES.MOUSE_UP);this.mouseUpEvent.signature=SIGNATURE;this.clickEvent=this.createEvent(EVENT_TYPES.CLICK);this.clickEvent.signature=SIGNATURE;this.keyPressEvent=this.createEvent(EVENT_TYPES.KEY_PRESS);this.keyPressEvent.signature=SIGNATURE;this.keyDownEvent=this.createEvent(EVENT_TYPES.KEY_DOWN);this.keyDownEvent.signature=SIGNATURE;this.keyUpEvent=this.createEvent(EVENT_TYPES.KEY_UP);this.keyUpEvent.signature=SIGNATURE;this.focusEvent=this.createEvent(EVENT_TYPES.FOCUS);this.focusEvent.signature=SIGNATURE;this.blurEvent=this.createEvent(EVENT_TYPES.BLUR);this.blurEvent.signature=SIGNATURE;this.destroyEvent=this.createEvent(EVENT_TYPES.DESTROY);this.destroyEvent.signature=SIGNATURE;if(p_oConfig){oConfig.applyConfig(p_oConfig);}
oConfig.fireQueue();}},_createRootNodeStructure:function(){var oElement,oAnchor;
if(!m_oMenuItemTemplate){m_oMenuItemTemplate=document.createElement("li");m_oMenuItemTemplate.innerHTML="<a href=\"#\"></a>";}
oElement=m_oMenuItemTemplate.cloneNode(true);
oElement.className=this.CSS_CLASS_NAME;oAnchor=oElement.firstChild;oAnchor.className=this.CSS_LABEL_CLASS_NAME;this.element=oElement;this._oAnchor=oAnchor;},
_initSubTree:function(){var oSrcEl=this.srcElement,oConfig=this.cfg,oNode,aOptions,nOptions,oMenu,n;if(oSrcEl.childNodes.length>0){if(this.parent.lazyLoad&&this.parent.srcElement&&this.parent.srcElement.tagName.toUpperCase()=="SELECT"){oConfig.setProperty("submenu",{id:Dom.generateId(),itemdata:oSrcEl.childNodes});}
else{oNode=oSrcEl.firstChild;aOptions=[];do{if(oNode&&oNode.tagName){switch(oNode.tagName.toUpperCase()){case"DIV":oConfig.setProperty("submenu",oNode);break;case"OPTION":aOptions[aOptions.length]=oNode;break;}}}
while((oNode=oNode.nextSibling));nOptions=aOptions.length;if(nOptions>0){oMenu=new this.SUBMENU_TYPE(Dom.generateId());oConfig.setProperty("submenu",oMenu);for(n=0;n<nOptions;n++){oMenu.addItem((new oMenu.ITEM_TYPE(aOptions[n])));}}}}},configText:function(p_sType,p_aArgs,p_oItem){var sText=p_aArgs[0],oConfig=this.cfg,oAnchor=this._oAnchor,sHelpText=oConfig.getProperty("helptext"),sHelpTextHTML="",sEmphasisStartTag="",sEmphasisEndTag="";if(sText){if(sHelpText){sHelpTextHTML="<em class=\"helptext\">"+sHelpText+"</em>";}
if(oConfig.getProperty("emphasis")){sEmphasisStartTag="<em>";sEmphasisEndTag="</em>";}
if(oConfig.getProperty("strongemphasis")){sEmphasisStartTag="<strong>";sEmphasisEndTag="</strong>";}
oAnchor.innerHTML=(sEmphasisStartTag+sText+
sEmphasisEndTag+sHelpTextHTML);}},configHelpText:function(p_sType,p_aArgs,p_oItem){this.cfg.refireEvent("text");},configURL:function(p_sType,p_aArgs,p_oItem){var sURL=p_aArgs[0];if(!sURL){sURL="#";}
var oAnchor=this._oAnchor;if(YAHOO.env.ua.opera){oAnchor.removeAttribute("href");}
oAnchor.setAttribute("href",sURL);},configTarget:function(p_sType,p_aArgs,p_oItem){var sTarget=p_aArgs[0],oAnchor=this._oAnchor;if(sTarget&&sTarget.length>0){oAnchor.setAttribute("target",sTarget);}
else{oAnchor.removeAttribute("target");}},configEmphasis:function(p_sType,p_aArgs,p_oItem){var bEmphasis=p_aArgs[0],oConfig=this.cfg;if(bEmphasis&&oConfig.getProperty("strongemphasis")){oConfig.setProperty("strongemphasis",false);}
oConfig.refireEvent("text");},configStrongEmphasis:function(p_sType,p_aArgs,p_oItem){var bStrongEmphasis=p_aArgs[0],oConfig=this.cfg;if(bStrongEmphasis&&oConfig.getProperty("emphasis")){oConfig.setProperty("emphasis",false);}
oConfig.refireEvent("text");},configChecked:function(p_sType,p_aArgs,p_oItem){var bChecked=p_aArgs[0],oElement=this.element,oAnchor=this._oAnchor,oConfig=this.cfg,sState="-checked",sClassName=this.CSS_CLASS_NAME+sState,sLabelClassName=this.CSS_LABEL_CLASS_NAME+sState;if(bChecked){Dom.addClass(oElement,sClassName);Dom.addClass(oAnchor,sLabelClassName);}
else{Dom.removeClass(oElement,sClassName);Dom.removeClass(oAnchor,sLabelClassName);}
oConfig.refireEvent("text");if(oConfig.getProperty("disabled")){oConfig.refireEvent("disabled");}
if(oConfig.getProperty("selected")){oConfig.refireEvent("selected");}},configDisabled:function(p_sType,p_aArgs,p_oItem){var bDisabled=p_aArgs[0],oConfig=this.cfg,oSubmenu=oConfig.getProperty("submenu"),bChecked=oConfig.getProperty("checked"),oElement=this.element,oAnchor=this._oAnchor,sState="-disabled",sCheckedState="-checked"+sState,sSubmenuState="-hassubmenu"+sState,sClassName=this.CSS_CLASS_NAME+sState,sLabelClassName=this.CSS_LABEL_CLASS_NAME+sState,sCheckedClassName=this.CSS_CLASS_NAME+sCheckedState,sLabelCheckedClassName=this.CSS_LABEL_CLASS_NAME+sCheckedState,sSubmenuClassName=this.CSS_CLASS_NAME+sSubmenuState,sLabelSubmenuClassName=this.CSS_LABEL_CLASS_NAME+sSubmenuState;if(bDisabled){if(oConfig.getProperty("selected")){oConfig.setProperty("selected",false);}
Dom.addClass(oElement,sClassName);Dom.addClass(oAnchor,sLabelClassName);if(oSubmenu){Dom.addClass(oElement,sSubmenuClassName);Dom.addClass(oAnchor,sLabelSubmenuClassName);}
if(bChecked){Dom.addClass(oElement,sCheckedClassName);Dom.addClass(oAnchor,sLabelCheckedClassName);}}
else{Dom.removeClass(oElement,sClassName);Dom.removeClass(oAnchor,sLabelClassName);if(oSubmenu){Dom.removeClass(oElement,sSubmenuClassName);Dom.removeClass(oAnchor,sLabelSubmenuClassName);}
if(bChecked){Dom.removeClass(oElement,sCheckedClassName);Dom.removeClass(oAnchor,sLabelCheckedClassName);}}},configSelected:function(p_sType,p_aArgs,p_oItem){var oConfig=this.cfg,bSelected=p_aArgs[0],oElement=this.element,oAnchor=this._oAnchor,bChecked=oConfig.getProperty("checked"),oSubmenu=oConfig.getProperty("submenu"),sState="-selected",sCheckedState="-checked"+sState,sSubmenuState="-hassubmenu"+sState,sClassName=this.CSS_CLASS_NAME+sState,sLabelClassName=this.CSS_LABEL_CLASS_NAME+sState,sCheckedClassName=this.CSS_CLASS_NAME+sCheckedState,sLabelCheckedClassName=this.CSS_LABEL_CLASS_NAME+sCheckedState,sSubmenuClassName=this.CSS_CLASS_NAME+sSubmenuState,sLabelSubmenuClassName=this.CSS_LABEL_CLASS_NAME+sSubmenuState;if(YAHOO.env.ua.opera){oAnchor.blur();}
if(bSelected&&!oConfig.getProperty("disabled")){Dom.addClass(oElement,sClassName);Dom.addClass(oAnchor,sLabelClassName);if(oSubmenu){Dom.addClass(oElement,sSubmenuClassName);Dom.addClass(oAnchor,sLabelSubmenuClassName);}
if(bChecked){Dom.addClass(oElement,sCheckedClassName);Dom.addClass(oAnchor,sLabelCheckedClassName);}}
else{Dom.removeClass(oElement,sClassName);Dom.removeClass(oAnchor,sLabelClassName);if(oSubmenu){Dom.removeClass(oElement,sSubmenuClassName);Dom.removeClass(oAnchor,sLabelSubmenuClassName);}
if(bChecked){Dom.removeClass(oElement,sCheckedClassName);Dom.removeClass(oAnchor,sLabelCheckedClassName);}}
if(this.hasFocus()&&YAHOO.env.ua.opera){oAnchor.focus();}},_onSubmenuBeforeHide:function(p_sType,p_aArgs){var oItem=this.parent,oMenu;function onHide(){oItem._oAnchor.blur();oMenu.beforeHideEvent.unsubscribe(onHide);}
if(oItem.hasFocus()){oMenu=oItem.parent;oMenu.beforeHideEvent.subscribe(onHide);}},configSubmenu:function(p_sType,p_aArgs,p_oItem){var oSubmenu=p_aArgs[0],oConfig=this.cfg,oElement=this.element,oAnchor=this._oAnchor,bLazyLoad=this.parent&&this.parent.lazyLoad,sState="-hassubmenu",sClassName=this.CSS_CLASS_NAME+sState,sLabelClassName=this.CSS_LABEL_CLASS_NAME+sState,oMenu,sSubmenuId,oSubmenuConfig;if(oSubmenu){if(oSubmenu instanceof Menu){oMenu=oSubmenu;oMenu.parent=this;oMenu.lazyLoad=bLazyLoad;}
else if(typeof oSubmenu=="object"&&oSubmenu.id&&!oSubmenu.nodeType){sSubmenuId=oSubmenu.id;oSubmenuConfig=oSubmenu;oSubmenuConfig.lazyload=bLazyLoad;oSubmenuConfig.parent=this;oMenu=new this.SUBMENU_TYPE(sSubmenuId,oSubmenuConfig);oConfig.setProperty("submenu",oMenu,true);}
else{oMenu=new this.SUBMENU_TYPE(oSubmenu,{lazyload:bLazyLoad,parent:this});oConfig.setProperty("submenu",oMenu,true);}
if(oMenu){Dom.addClass(oElement,sClassName);Dom.addClass(oAnchor,sLabelClassName);this._oSubmenu=oMenu;if(YAHOO.env.ua.opera){oMenu.beforeHideEvent.subscribe(this._onSubmenuBeforeHide);}}}
else{Dom.removeClass(oElement,sClassName);Dom.removeClass(oAnchor,sLabelClassName);if(this._oSubmenu){this._oSubmenu.destroy();}}
if(oConfig.getProperty("disabled")){oConfig.refireEvent("disabled");}
if(oConfig.getProperty("selected")){oConfig.refireEvent("selected");}},configOnClick:function(p_sType,p_aArgs,p_oItem){var oObject=p_aArgs[0];if(this._oOnclickAttributeValue&&(this._oOnclickAttributeValue!=oObject)){this.clickEvent.unsubscribe(this._oOnclickAttributeValue.fn,this._oOnclickAttributeValue.obj);this._oOnclickAttributeValue=null;}
if(!this._oOnclickAttributeValue&&typeof oObject=="object"&&typeof oObject.fn=="function"){this.clickEvent.subscribe(oObject.fn,((!YAHOO.lang.isUndefined(oObject.obj))?oObject.obj:this),oObject.scope);this._oOnclickAttributeValue=oObject;}},configClassName:function(p_sType,p_aArgs,p_oItem){var sClassName=p_aArgs[0];if(this._sClassName){Dom.removeClass(this.element,this._sClassName);}
Dom.addClass(this.element,sClassName);this._sClassName=sClassName;},initDefaultConfig:function(){var oConfig=this.cfg;oConfig.addProperty(DEFAULT_CONFIG.TEXT.key,{handler:this.configText,value:DEFAULT_CONFIG.TEXT.value,validator:DEFAULT_CONFIG.TEXT.validator,suppressEvent:DEFAULT_CONFIG.TEXT.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.HELP_TEXT.key,{handler:this.configHelpText,supercedes:DEFAULT_CONFIG.HELP_TEXT.supercedes,suppressEvent:DEFAULT_CONFIG.HELP_TEXT.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.URL.key,{handler:this.configURL,value:DEFAULT_CONFIG.URL.value,suppressEvent:DEFAULT_CONFIG.URL.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.TARGET.key,{handler:this.configTarget,suppressEvent:DEFAULT_CONFIG.TARGET.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.EMPHASIS.key,{handler:this.configEmphasis,value:DEFAULT_CONFIG.EMPHASIS.value,validator:DEFAULT_CONFIG.EMPHASIS.validator,suppressEvent:DEFAULT_CONFIG.EMPHASIS.suppressEvent,supercedes:DEFAULT_CONFIG.EMPHASIS.supercedes});oConfig.addProperty(DEFAULT_CONFIG.STRONG_EMPHASIS.key,{handler:this.configStrongEmphasis,value:DEFAULT_CONFIG.STRONG_EMPHASIS.value,validator:DEFAULT_CONFIG.STRONG_EMPHASIS.validator,suppressEvent:DEFAULT_CONFIG.STRONG_EMPHASIS.suppressEvent,supercedes:DEFAULT_CONFIG.STRONG_EMPHASIS.supercedes});oConfig.addProperty(DEFAULT_CONFIG.CHECKED.key,{handler:this.configChecked,value:DEFAULT_CONFIG.CHECKED.value,validator:DEFAULT_CONFIG.CHECKED.validator,suppressEvent:DEFAULT_CONFIG.CHECKED.suppressEvent,supercedes:DEFAULT_CONFIG.CHECKED.supercedes});oConfig.addProperty(DEFAULT_CONFIG.DISABLED.key,{handler:this.configDisabled,value:DEFAULT_CONFIG.DISABLED.value,validator:DEFAULT_CONFIG.DISABLED.validator,suppressEvent:DEFAULT_CONFIG.DISABLED.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.SELECTED.key,{handler:this.configSelected,value:DEFAULT_CONFIG.SELECTED.value,validator:DEFAULT_CONFIG.SELECTED.validator,suppressEvent:DEFAULT_CONFIG.SELECTED.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.SUBMENU.key,{handler:this.configSubmenu,supercedes:DEFAULT_CONFIG.SUBMENU.supercedes,suppressEvent:DEFAULT_CONFIG.SUBMENU.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.ONCLICK.key,{handler:this.configOnClick,suppressEvent:DEFAULT_CONFIG.ONCLICK.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.CLASS_NAME.key,{handler:this.configClassName,value:DEFAULT_CONFIG.CLASS_NAME.value,validator:DEFAULT_CONFIG.CLASS_NAME.validator,suppressEvent:DEFAULT_CONFIG.CLASS_NAME.suppressEvent});},getNextEnabledSibling:function(){var nGroupIndex,aItemGroups,oNextItem,nNextGroupIndex,aNextGroup;function getNextArrayItem(p_aArray,p_nStartIndex){return p_aArray[p_nStartIndex]||getNextArrayItem(p_aArray,(p_nStartIndex+1));}
if(this.parent instanceof Menu){nGroupIndex=this.groupIndex;aItemGroups=this.parent.getItemGroups();if(this.index<(aItemGroups[nGroupIndex].length-1)){oNextItem=getNextArrayItem(aItemGroups[nGroupIndex],(this.index+1));}
else{if(nGroupIndex<(aItemGroups.length-1)){nNextGroupIndex=nGroupIndex+1;}
else{nNextGroupIndex=0;}
aNextGroup=getNextArrayItem(aItemGroups,nNextGroupIndex);oNextItem=getNextArrayItem(aNextGroup,0);}
return(oNextItem.cfg.getProperty("disabled")||oNextItem.element.style.display=="none")?oNextItem.getNextEnabledSibling():oNextItem;}},getPreviousEnabledSibling:function(){var nGroupIndex,aItemGroups,oPreviousItem,nPreviousGroupIndex,aPreviousGroup;function getPreviousArrayItem(p_aArray,p_nStartIndex){return p_aArray[p_nStartIndex]||getPreviousArrayItem(p_aArray,(p_nStartIndex-1));}
function getFirstItemIndex(p_aArray,p_nStartIndex){return p_aArray[p_nStartIndex]?p_nStartIndex:getFirstItemIndex(p_aArray,(p_nStartIndex+1));}
if(this.parent instanceof Menu){nGroupIndex=this.groupIndex;aItemGroups=this.parent.getItemGroups();if(this.index>getFirstItemIndex(aItemGroups[nGroupIndex],0)){oPreviousItem=getPreviousArrayItem(aItemGroups[nGroupIndex],(this.index-1));}
else{if(nGroupIndex>getFirstItemIndex(aItemGroups,0)){nPreviousGroupIndex=nGroupIndex-1;}
else{nPreviousGroupIndex=aItemGroups.length-1;}
aPreviousGroup=getPreviousArrayItem(aItemGroups,nPreviousGroupIndex);oPreviousItem=getPreviousArrayItem(aPreviousGroup,(aPreviousGroup.length-1));}
return(oPreviousItem.cfg.getProperty("disabled")||oPreviousItem.element.style.display=="none")?oPreviousItem.getPreviousEnabledSibling():oPreviousItem;}},focus:function(){var oParent=this.parent,oAnchor=this._oAnchor,oActiveItem=oParent.activeItem,me=this;function setFocus(){try{if(YAHOO.env.ua.ie&&!document.hasFocus()){return;}
if(oActiveItem){oActiveItem.blurEvent.fire();}
oAnchor.focus();me.focusEvent.fire();}
catch(e){}}
if(!this.cfg.getProperty("disabled")&&oParent&&oParent.cfg.getProperty("visible")&&this.element.style.display!="none"){window.setTimeout(setFocus,0);}},blur:function(){var oParent=this.parent;if(!this.cfg.getProperty("disabled")&&oParent&&oParent.cfg.getProperty("visible")){var me=this;window.setTimeout(function(){try{me._oAnchor.blur();me.blurEvent.fire();}
catch(e){}},0);}},hasFocus:function(){return(YAHOO.widget.MenuManager.getFocusedMenuItem()==this);},destroy:function(){var oEl=this.element,oSubmenu,oParentNode;if(oEl){oSubmenu=this.cfg.getProperty("submenu");if(oSubmenu){oSubmenu.destroy();}
this.mouseOverEvent.unsubscribeAll();this.mouseOutEvent.unsubscribeAll();this.mouseDownEvent.unsubscribeAll();this.mouseUpEvent.unsubscribeAll();this.clickEvent.unsubscribeAll();this.keyPressEvent.unsubscribeAll();this.keyDownEvent.unsubscribeAll();this.keyUpEvent.unsubscribeAll();this.focusEvent.unsubscribeAll();this.blurEvent.unsubscribeAll();this.cfg.configChangedEvent.unsubscribeAll();oParentNode=oEl.parentNode;if(oParentNode){oParentNode.removeChild(oEl);this.destroyEvent.fire();}
this.destroyEvent.unsubscribeAll();}},toString:function(){var sReturnVal="MenuItem",sId=this.id;if(sId){sReturnVal+=(" "+sId);}
return sReturnVal;}};Lang.augmentProto(MenuItem,YAHOO.util.EventProvider);})();(function(){YAHOO.widget.ContextMenu=function(p_oElement,p_oConfig){YAHOO.widget.ContextMenu.superclass.constructor.call(this,p_oElement,p_oConfig);};var Event=YAHOO.util.Event,ContextMenu=YAHOO.widget.ContextMenu,EVENT_TYPES={"TRIGGER_CONTEXT_MENU":"triggerContextMenu","CONTEXT_MENU":(YAHOO.env.ua.opera?"mousedown":"contextmenu"),"CLICK":"click"},DEFAULT_CONFIG={"TRIGGER":{key:"trigger",suppressEvent:true}};function position(p_sType,p_aArgs,p_aPos){this.cfg.setProperty("xy",p_aPos);this.beforeShowEvent.unsubscribe(position,p_aPos);}
YAHOO.lang.extend(ContextMenu,YAHOO.widget.Menu,{_oTrigger:null,_bCancelled:false,contextEventTarget:null,triggerContextMenuEvent:null,init:function(p_oElement,p_oConfig){ContextMenu.superclass.init.call(this,p_oElement);this.beforeInitEvent.fire(ContextMenu);if(p_oConfig){this.cfg.applyConfig(p_oConfig,true);}
this.initEvent.fire(ContextMenu);},initEvents:function(){ContextMenu.superclass.initEvents.call(this);this.triggerContextMenuEvent=this.createEvent(EVENT_TYPES.TRIGGER_CONTEXT_MENU);this.triggerContextMenuEvent.signature=YAHOO.util.CustomEvent.LIST;},cancel:function(){this._bCancelled=true;},_removeEventHandlers:function(){var oTrigger=this._oTrigger;if(oTrigger){Event.removeListener(oTrigger,EVENT_TYPES.CONTEXT_MENU,this._onTriggerContextMenu);if(YAHOO.env.ua.opera){Event.removeListener(oTrigger,EVENT_TYPES.CLICK,this._onTriggerClick);}}},_onTriggerClick:function(p_oEvent,p_oMenu){if(p_oEvent.ctrlKey){Event.stopEvent(p_oEvent);}},_onTriggerContextMenu:function(p_oEvent,p_oMenu){if(p_oEvent.type=="mousedown"&&!p_oEvent.ctrlKey){return;}
var aXY;Event.stopEvent(p_oEvent);this.contextEventTarget=Event.getTarget(p_oEvent);this.triggerContextMenuEvent.fire(p_oEvent);YAHOO.widget.MenuManager.hideVisible();if(!this._bCancelled){aXY=Event.getXY(p_oEvent);if(!YAHOO.util.Dom.inDocument(this.element)){this.beforeShowEvent.subscribe(position,aXY);}
else{this.cfg.setProperty("xy",aXY);}
this.show();}
this._bCancelled=false;},toString:function(){var sReturnVal="ContextMenu",sId=this.id;if(sId){sReturnVal+=(" "+sId);}
return sReturnVal;},initDefaultConfig:function(){ContextMenu.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.TRIGGER.key,{handler:this.configTrigger,suppressEvent:DEFAULT_CONFIG.TRIGGER.suppressEvent});},destroy:function(){this._removeEventHandlers();ContextMenu.superclass.destroy.call(this);},configTrigger:function(p_sType,p_aArgs,p_oMenu){var oTrigger=p_aArgs[0];if(oTrigger){if(this._oTrigger){this._removeEventHandlers();}
this._oTrigger=oTrigger;Event.on(oTrigger,EVENT_TYPES.CONTEXT_MENU,this._onTriggerContextMenu,this,true);if(YAHOO.env.ua.opera){Event.on(oTrigger,EVENT_TYPES.CLICK,this._onTriggerClick,this,true);}}
else{this._removeEventHandlers();}}});}());YAHOO.widget.ContextMenuItem=YAHOO.widget.MenuItem;(function(){YAHOO.widget.MenuBar=function(p_oElement,p_oConfig){YAHOO.widget.MenuBar.superclass.constructor.call(this,p_oElement,p_oConfig);};function checkPosition(p_sPosition){if(typeof p_sPosition=="string"){return("dynamic,static".indexOf((p_sPosition.toLowerCase()))!=-1);}}
var Event=YAHOO.util.Event,MenuBar=YAHOO.widget.MenuBar,DEFAULT_CONFIG={"POSITION":{key:"position",value:"static",validator:checkPosition,supercedes:["visible"]},"SUBMENU_ALIGNMENT":{key:"submenualignment",value:["tl","bl"],suppressEvent:true},"AUTO_SUBMENU_DISPLAY":{key:"autosubmenudisplay",value:false,validator:YAHOO.lang.isBoolean,suppressEvent:true}};YAHOO.lang.extend(MenuBar,YAHOO.widget.Menu,{init:function(p_oElement,p_oConfig){if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuBarItem;}
MenuBar.superclass.init.call(this,p_oElement);this.beforeInitEvent.fire(MenuBar);if(p_oConfig){this.cfg.applyConfig(p_oConfig,true);}
this.initEvent.fire(MenuBar);},CSS_CLASS_NAME:"yuimenubar",_onKeyDown:function(p_sType,p_aArgs,p_oMenuBar){var oEvent=p_aArgs[0],oItem=p_aArgs[1],oSubmenu,oItemCfg,oNextItem;if(oItem&&!oItem.cfg.getProperty("disabled")){oItemCfg=oItem.cfg;switch(oEvent.keyCode){case 37:case 39:if(oItem==this.activeItem&&!oItemCfg.getProperty("selected")){oItemCfg.setProperty("selected",true);}
else{oNextItem=(oEvent.keyCode==37)?oItem.getPreviousEnabledSibling():oItem.getNextEnabledSibling();if(oNextItem){this.clearActiveItem();oNextItem.cfg.setProperty("selected",true);if(this.cfg.getProperty("autosubmenudisplay")){oSubmenu=oNextItem.cfg.getProperty("submenu");if(oSubmenu){oSubmenu.show();}}
oNextItem.focus();}}
Event.preventDefault(oEvent);break;case 40:if(this.activeItem!=oItem){this.clearActiveItem();oItemCfg.setProperty("selected",true);oItem.focus();}
oSubmenu=oItemCfg.getProperty("submenu");if(oSubmenu){if(oSubmenu.cfg.getProperty("visible")){oSubmenu.setInitialSelection();oSubmenu.setInitialFocus();}
else{oSubmenu.show();}}
Event.preventDefault(oEvent);break;}}
if(oEvent.keyCode==27&&this.activeItem){oSubmenu=this.activeItem.cfg.getProperty("submenu");if(oSubmenu&&oSubmenu.cfg.getProperty("visible")){oSubmenu.hide();this.activeItem.focus();}
else{this.activeItem.cfg.setProperty("selected",false);this.activeItem.blur();}
Event.preventDefault(oEvent);}},_onClick:function(p_sType,p_aArgs,p_oMenuBar){MenuBar.superclass._onClick.call(this,p_sType,p_aArgs,p_oMenuBar);var oItem=p_aArgs[1],oEvent,oTarget,oActiveItem,oConfig,oSubmenu;if(oItem&&!oItem.cfg.getProperty("disabled")){oEvent=p_aArgs[0];oTarget=Event.getTarget(oEvent);oActiveItem=this.activeItem;oConfig=this.cfg;if(oActiveItem&&oActiveItem!=oItem){this.clearActiveItem();}
oItem.cfg.setProperty("selected",true);oSubmenu=oItem.cfg.getProperty("submenu");if(oSubmenu){if(oSubmenu.cfg.getProperty("visible")){oSubmenu.hide();}
else{oSubmenu.show();}}}},toString:function(){var sReturnVal="MenuBar",sId=this.id;if(sId){sReturnVal+=(" "+sId);}
return sReturnVal;},initDefaultConfig:function(){MenuBar.superclass.initDefaultConfig.call(this);var oConfig=this.cfg;oConfig.addProperty(DEFAULT_CONFIG.POSITION.key,{handler:this.configPosition,value:DEFAULT_CONFIG.POSITION.value,validator:DEFAULT_CONFIG.POSITION.validator,supercedes:DEFAULT_CONFIG.POSITION.supercedes});oConfig.addProperty(DEFAULT_CONFIG.SUBMENU_ALIGNMENT.key,{value:DEFAULT_CONFIG.SUBMENU_ALIGNMENT.value,suppressEvent:DEFAULT_CONFIG.SUBMENU_ALIGNMENT.suppressEvent});oConfig.addProperty(DEFAULT_CONFIG.AUTO_SUBMENU_DISPLAY.key,{value:DEFAULT_CONFIG.AUTO_SUBMENU_DISPLAY.value,validator:DEFAULT_CONFIG.AUTO_SUBMENU_DISPLAY.validator,suppressEvent:DEFAULT_CONFIG.AUTO_SUBMENU_DISPLAY.suppressEvent});}});}());YAHOO.widget.MenuBarItem=function(p_oObject,p_oConfig){YAHOO.widget.MenuBarItem.superclass.constructor.call(this,p_oObject,p_oConfig);};YAHOO.lang.extend(YAHOO.widget.MenuBarItem,YAHOO.widget.MenuItem,{init:function(p_oObject,p_oConfig){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=YAHOO.widget.Menu;}
YAHOO.widget.MenuBarItem.superclass.init.call(this,p_oObject);var oConfig=this.cfg;if(p_oConfig){oConfig.applyConfig(p_oConfig,true);}
oConfig.fireQueue();},CSS_CLASS_NAME:"yuimenubaritem",CSS_LABEL_CLASS_NAME:"yuimenubaritemlabel",toString:function(){var sReturnVal="MenuBarItem";if(this.cfg&&this.cfg.getProperty("text")){sReturnVal+=(": "+this.cfg.getProperty("text"));}
return sReturnVal;}});YAHOO.register("menu",YAHOO.widget.Menu,{version:"2.5.2",build:"1076"});

YAHOO.util.Connect={_msxml_progid:['Microsoft.XMLHTTP','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP'],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:'application/x-www-form-urlencoded; charset=UTF-8',_default_form_header:'application/x-www-form-urlencoded',_use_default_xhr_header:true,_default_xhr_header:'XMLHttpRequest',_has_default_headers:true,_default_headers:{},_isFormSubmit:false,_isFileUpload:false,_formNode:null,_sFormData:null,_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,_submitElementValue:null,_hasSubmitListener:(function()
{if(YAHOO.util.Event){YAHOO.util.Event.addListener(document,'click',function(e){var obj=YAHOO.util.Event.getTarget(e);if(obj.nodeName.toLowerCase()=='input'&&(obj.type&&obj.type.toLowerCase()=='submit')){YAHOO.util.Connect._submitElementValue=encodeURIComponent(obj.name)+"="+encodeURIComponent(obj.value);}});return true;}
return false;})(),startEvent:new YAHOO.util.CustomEvent('start'),completeEvent:new YAHOO.util.CustomEvent('complete'),successEvent:new YAHOO.util.CustomEvent('success'),failureEvent:new YAHOO.util.CustomEvent('failure'),uploadEvent:new YAHOO.util.CustomEvent('upload'),abortEvent:new YAHOO.util.CustomEvent('abort'),_customEvents:{onStart:['startEvent','start'],onComplete:['completeEvent','complete'],onSuccess:['successEvent','success'],onFailure:['failureEvent','failure'],onUpload:['uploadEvent','upload'],onAbort:['abortEvent','abort']},setProgId:function(id)
{this._msxml_progid.unshift(id);},setDefaultPostHeader:function(b)
{if(typeof b=='string'){this._default_post_header=b;}
else if(typeof b=='boolean'){this._use_default_post_header=b;}},setDefaultXhrHeader:function(b)
{if(typeof b=='string'){this._default_xhr_header=b;}
else{this._use_default_xhr_header=b;}},setPollingInterval:function(i)
{if(typeof i=='number'&&isFinite(i)){this._polling_interval=i;}},createXhrObject:function(transactionId)
{var obj,http;try
{http=new XMLHttpRequest();obj={conn:http,tId:transactionId};}
catch(e)
{for(var i=0;i<this._msxml_progid.length;++i){try
{http=new ActiveXObject(this._msxml_progid[i]);obj={conn:http,tId:transactionId};break;}
catch(e){}}}
finally
{return obj;}},getConnectionObject:function(isFileUpload)
{var o;var tId=this._transaction_id;try
{if(!isFileUpload){o=this.createXhrObject(tId);}
else{o={};o.tId=tId;o.isUpload=true;}
if(o){this._transaction_id++;}}
catch(e){}
finally
{return o;}},asyncRequest:function(method,uri,callback,postData)
{var o=(this._isFileUpload)?this.getConnectionObject(true):this.getConnectionObject();var args=(callback&&callback.argument)?callback.argument:null;if(!o){return null;}
else{if(callback&&callback.customevents){this.initCustomEvents(o,callback);}
if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(o,callback,uri,postData);return o;}
if(method.toUpperCase()=='GET'){if(this._sFormData.length!==0){uri+=((uri.indexOf('?')==-1)?'?':'&')+this._sFormData;}}
else if(method.toUpperCase()=='POST'){postData=postData?this._sFormData+"&"+postData:this._sFormData;}}
if(method.toUpperCase()=='GET'&&(callback&&callback.cache===false)){uri+=((uri.indexOf('?')==-1)?'?':'&')+"rnd="+new Date().valueOf().toString();}
o.conn.open(method,uri,true);if(this._use_default_xhr_header){if(!this._default_headers['X-Requested-With']){this.initHeader('X-Requested-With',this._default_xhr_header,true);}}
if((method.toUpperCase()=='POST'&&this._use_default_post_header)&&this._isFormSubmit===false){this.initHeader('Content-Type',this._default_post_header);}
if(this._has_default_headers||this._has_http_headers){this.setHeader(o);}
this.handleReadyState(o,callback);o.conn.send(postData||'');if(this._isFormSubmit===true){this.resetFormState();}
this.startEvent.fire(o,args);if(o.startEvent){o.startEvent.fire(o,args);}
return o;}},initCustomEvents:function(o,callback)
{for(var prop in callback.customevents){if(this._customEvents[prop][0]){o[this._customEvents[prop][0]]=new YAHOO.util.CustomEvent(this._customEvents[prop][1],(callback.scope)?callback.scope:null);o[this._customEvents[prop][0]].subscribe(callback.customevents[prop]);}}},handleReadyState:function(o,callback)
{var oConn=this;var args=(callback&&callback.argument)?callback.argument:null;if(callback&&callback.timeout){this._timeOut[o.tId]=window.setTimeout(function(){oConn.abort(o,callback,true);},callback.timeout);}
this._poll[o.tId]=window.setInterval(function(){if(o.conn&&o.conn.readyState===4){window.clearInterval(oConn._poll[o.tId]);delete oConn._poll[o.tId];if(callback&&callback.timeout){window.clearTimeout(oConn._timeOut[o.tId]);delete oConn._timeOut[o.tId];}
oConn.completeEvent.fire(o,args);if(o.completeEvent){o.completeEvent.fire(o,args);}
oConn.handleTransactionResponse(o,callback);}},this._polling_interval);},handleTransactionResponse:function(o,callback,isAbort)
{var httpStatus,responseObject;var args=(callback&&callback.argument)?callback.argument:null;try
{if(o.conn.status!==undefined&&o.conn.status!==0){httpStatus=o.conn.status;}
else{httpStatus=13030;}}
catch(e){httpStatus=13030;}
if(httpStatus>=200&&httpStatus<300||httpStatus===1223){responseObject=this.createResponseObject(o,args);if(callback&&callback.success){if(!callback.scope){callback.success(responseObject);}
else{callback.success.apply(callback.scope,[responseObject]);}}
this.successEvent.fire(responseObject);if(o.successEvent){o.successEvent.fire(responseObject);}}
else{switch(httpStatus){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:responseObject=this.createExceptionObject(o.tId,args,(isAbort?isAbort:false));if(callback&&callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}
break;default:responseObject=this.createResponseObject(o,args);if(callback&&callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}}
this.failureEvent.fire(responseObject);if(o.failureEvent){o.failureEvent.fire(responseObject);}}
this.releaseObject(o);responseObject=null;},createResponseObject:function(o,callbackArg)
{var obj={};var headerObj={};try
{var headerStr=o.conn.getAllResponseHeaders();var header=headerStr.split('\n');for(var i=0;i<header.length;i++){var delimitPos=header[i].indexOf(':');if(delimitPos!=-1){headerObj[header[i].substring(0,delimitPos)]=header[i].substring(delimitPos+2);}}}
catch(e){}
obj.tId=o.tId;obj.status=(o.conn.status==1223)?204:o.conn.status;obj.statusText=(o.conn.status==1223)?"No Content":o.conn.statusText;obj.getResponseHeader=headerObj;obj.getAllResponseHeaders=headerStr;obj.responseText=o.conn.responseText;obj.responseXML=o.conn.responseXML;if(callbackArg){obj.argument=callbackArg;}
return obj;},createExceptionObject:function(tId,callbackArg,isAbort)
{var COMM_CODE=0;var COMM_ERROR='communication failure';var ABORT_CODE=-1;var ABORT_ERROR='transaction aborted';var obj={};obj.tId=tId;if(isAbort){obj.status=ABORT_CODE;obj.statusText=ABORT_ERROR;}
else{obj.status=COMM_CODE;obj.statusText=COMM_ERROR;}
if(callbackArg){obj.argument=callbackArg;}
return obj;},initHeader:function(label,value,isDefault)
{var headerObj=(isDefault)?this._default_headers:this._http_headers;headerObj[label]=value;if(isDefault){this._has_default_headers=true;}
else{this._has_http_headers=true;}},setHeader:function(o)
{if(this._has_default_headers){for(var prop in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,prop)){o.conn.setRequestHeader(prop,this._default_headers[prop]);}}}
if(this._has_http_headers){for(var prop in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,prop)){o.conn.setRequestHeader(prop,this._http_headers[prop]);}}
delete this._http_headers;this._http_headers={};this._has_http_headers=false;}},resetDefaultHeaders:function(){delete this._default_headers;this._default_headers={};this._has_default_headers=false;},setForm:function(formId,isUpload,secureUri)
{this.resetFormState();var oForm;if(typeof formId=='string'){oForm=(document.getElementById(formId)||document.forms[formId]);}
else if(typeof formId=='object'){oForm=formId;}
else{return;}
if(isUpload){var io=this.createFrame((window.location.href.toLowerCase().indexOf("https")===0||secureUri)?true:false);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=oForm;return;}
var oElement,oName,oValue,oDisabled;var hasSubmit=false;for(var i=0;i<oForm.elements.length;i++){oElement=oForm.elements[i];oDisabled=oElement.disabled;oName=oElement.name;oValue=oElement.value;if(!oDisabled&&oName)
{switch(oElement.type)
{case'select-one':case'select-multiple':for(var j=0;j<oElement.options.length;j++){if(oElement.options[j].selected){if(window.ActiveXObject){this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oElement.options[j].attributes['value'].specified?oElement.options[j].value:oElement.options[j].text)+'&';}
else{this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oElement.options[j].hasAttribute('value')?oElement.options[j].value:oElement.options[j].text)+'&';}}}
break;case'radio':case'checkbox':if(oElement.checked){this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}
break;case'file':case undefined:case'reset':case'button':break;case'submit':if(hasSubmit===false){if(this._hasSubmitListener&&this._submitElementValue){this._sFormData+=this._submitElementValue+'&';}
else{this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}
hasSubmit=true;}
break;default:this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}}}
this._isFormSubmit=true;this._sFormData=this._sFormData.substr(0,this._sFormData.length-1);this.initHeader('Content-Type',this._default_form_header);return this._sFormData;},resetFormState:function(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData="";},createFrame:function(secureUri){var frameId='yuiIO'+this._transaction_id;var io;if(window.ActiveXObject){io=document.createElement('<iframe id="'+frameId+'" name="'+frameId+'" />');if(typeof secureUri=='boolean'){io.src='javascript:false';}}
else{io=document.createElement('iframe');io.id=frameId;io.name=frameId;}
io.style.position='absolute';io.style.top='-1000px';io.style.left='-1000px';document.body.appendChild(io);},appendPostData:function(postData)
{var formElements=[];var postMessage=postData.split('&');for(var i=0;i<postMessage.length;i++){var delimitPos=postMessage[i].indexOf('=');if(delimitPos!=-1){formElements[i]=document.createElement('input');formElements[i].type='hidden';formElements[i].name=postMessage[i].substring(0,delimitPos);formElements[i].value=postMessage[i].substring(delimitPos+1);this._formNode.appendChild(formElements[i]);}}
return formElements;},uploadFile:function(o,callback,uri,postData){var oConn=this;var frameId='yuiIO'+o.tId;var uploadEncoding='multipart/form-data';var io=document.getElementById(frameId);var args=(callback&&callback.argument)?callback.argument:null;var rawFormAttributes={action:this._formNode.getAttribute('action'),method:this._formNode.getAttribute('method'),target:this._formNode.getAttribute('target')};this._formNode.setAttribute('action',uri);this._formNode.setAttribute('method','POST');this._formNode.setAttribute('target',frameId);if(YAHOO.env.ua.ie){this._formNode.setAttribute('encoding',uploadEncoding);}
else{this._formNode.setAttribute('enctype',uploadEncoding);}
if(postData){var oElements=this.appendPostData(postData);}
this._formNode.submit();this.startEvent.fire(o,args);if(o.startEvent){o.startEvent.fire(o,args);}
if(callback&&callback.timeout){this._timeOut[o.tId]=window.setTimeout(function(){oConn.abort(o,callback,true);},callback.timeout);}
if(oElements&&oElements.length>0){for(var i=0;i<oElements.length;i++){this._formNode.removeChild(oElements[i]);}}
for(var prop in rawFormAttributes){if(YAHOO.lang.hasOwnProperty(rawFormAttributes,prop)){if(rawFormAttributes[prop]){this._formNode.setAttribute(prop,rawFormAttributes[prop]);}
else{this._formNode.removeAttribute(prop);}}}
this.resetFormState();var uploadCallback=function()
{if(callback&&callback.timeout){window.clearTimeout(oConn._timeOut[o.tId]);delete oConn._timeOut[o.tId];}
oConn.completeEvent.fire(o,args);if(o.completeEvent){o.completeEvent.fire(o,args);}
var obj={};obj.tId=o.tId;obj.argument=callback.argument;try
{obj.responseText=io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:io.contentWindow.document.documentElement.textContent;obj.responseXML=io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;}
catch(e){}
if(callback&&callback.upload){if(!callback.scope){callback.upload(obj);}
else{callback.upload.apply(callback.scope,[obj]);}}
oConn.uploadEvent.fire(obj);if(o.uploadEvent){o.uploadEvent.fire(obj);}
YAHOO.util.Event.removeListener(io,"load",uploadCallback);setTimeout(function(){document.body.removeChild(io);oConn.releaseObject(o);},100);};YAHOO.util.Event.addListener(io,"load",uploadCallback);},abort:function(o,callback,isTimeout)
{var abortStatus;var args=(callback&&callback.argument)?callback.argument:null;if(o&&o.conn){if(this.isCallInProgress(o)){o.conn.abort();window.clearInterval(this._poll[o.tId]);delete this._poll[o.tId];if(isTimeout){window.clearTimeout(this._timeOut[o.tId]);delete this._timeOut[o.tId];}
abortStatus=true;}}
else if(o&&o.isUpload===true){var frameId='yuiIO'+o.tId;var io=document.getElementById(frameId);if(io){YAHOO.util.Event.removeListener(io,"load");document.body.removeChild(io);if(isTimeout){window.clearTimeout(this._timeOut[o.tId]);delete this._timeOut[o.tId];}
abortStatus=true;}}
else{abortStatus=false;}
if(abortStatus===true){this.abortEvent.fire(o,args);if(o.abortEvent){o.abortEvent.fire(o,args);}
this.handleTransactionResponse(o,callback,true);}
return abortStatus;},isCallInProgress:function(o)
{if(o&&o.conn){return o.conn.readyState!==4&&o.conn.readyState!==0;}
else if(o&&o.isUpload===true){var frameId='yuiIO'+o.tId;return document.getElementById(frameId)?true:false;}
else{return false;}},releaseObject:function(o)
{if(o&&o.conn){o.conn=null;o=null;}}};YAHOO.register("connection",YAHOO.util.Connect,{version:"2.5.2",build:"1076"});

(function(){var Y=YAHOO.util;var Anim=function(el,attributes,duration,method){if(!el){}
this.init(el,attributes,duration,method);};Anim.NAME='Anim';Anim.prototype={toString:function(){var el=this.getEl()||{};var id=el.id||el.tagName;return(this.constructor.NAME+': '+id);},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(attr,start,end){return this.method(this.currentFrame,start,end-start,this.totalFrames);},setAttribute:function(attr,val,unit){if(this.patterns.noNegatives.test(attr)){val=(val>0)?val:0;}
Y.Dom.setStyle(this.getEl(),attr,val+unit);},getAttribute:function(attr){var el=this.getEl();var val=Y.Dom.getStyle(el,attr);if(val!=='auto'&&!this.patterns.offsetUnit.test(val)){return parseFloat(val);}
var a=this.patterns.offsetAttribute.exec(attr)||[];var pos=!!(a[3]);var box=!!(a[2]);if(box||(Y.Dom.getStyle(el,'position')=='absolute'&&pos)){val=el['offset'+a[0].charAt(0).toUpperCase()+a[0].substr(1)];}else{val=0;}
return val;},getDefaultUnit:function(attr){if(this.patterns.defaultUnit.test(attr)){return'px';}
return'';},setRuntimeAttribute:function(attr){var start;var end;var attributes=this.attributes;this.runtimeAttributes[attr]={};var isset=function(prop){return(typeof prop!=='undefined');};if(!isset(attributes[attr]['to'])&&!isset(attributes[attr]['by'])){return false;}
start=(isset(attributes[attr]['from']))?attributes[attr]['from']:this.getAttribute(attr);if(isset(attributes[attr]['to'])){end=attributes[attr]['to'];}else if(isset(attributes[attr]['by'])){if(start.constructor==Array){end=[];for(var i=0,len=start.length;i<len;++i){end[i]=start[i]+attributes[attr]['by'][i]*1;}}else{end=start+attributes[attr]['by']*1;}}
this.runtimeAttributes[attr].start=start;this.runtimeAttributes[attr].end=end;this.runtimeAttributes[attr].unit=(isset(attributes[attr].unit))?attributes[attr]['unit']:this.getDefaultUnit(attr);return true;},init:function(el,attributes,duration,method){var isAnimated=false;var startTime=null;var actualFrames=0;el=Y.Dom.get(el);this.attributes=attributes||{};this.duration=!YAHOO.lang.isUndefined(duration)?duration:1;this.method=method||Y.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=Y.AnimMgr.fps;this.setEl=function(element){el=Y.Dom.get(element);};this.getEl=function(){return el;};this.isAnimated=function(){return isAnimated;};this.getStartTime=function(){return startTime;};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false;}
this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(Y.AnimMgr.fps*this.duration):this.duration;if(this.duration===0&&this.useSeconds){this.totalFrames=1;}
Y.AnimMgr.registerElement(this);return true;};this.stop=function(finish){if(!this.isAnimated()){return false;}
if(finish){this.currentFrame=this.totalFrames;this._onTween.fire();}
Y.AnimMgr.stop(this);};var onStart=function(){this.onStart.fire();this.runtimeAttributes={};for(var attr in this.attributes){this.setRuntimeAttribute(attr);}
isAnimated=true;actualFrames=0;startTime=new Date();};var onTween=function(){var data={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};data.toString=function(){return('duration: '+data.duration+', currentFrame: '+data.currentFrame);};this.onTween.fire(data);var runtimeAttributes=this.runtimeAttributes;for(var attr in runtimeAttributes){this.setAttribute(attr,this.doMethod(attr,runtimeAttributes[attr].start,runtimeAttributes[attr].end),runtimeAttributes[attr].unit);}
actualFrames+=1;};var onComplete=function(){var actual_duration=(new Date()-startTime)/1000;var data={duration:actual_duration,frames:actualFrames,fps:actualFrames/actual_duration};data.toString=function(){return('duration: '+data.duration+', frames: '+data.frames+', fps: '+data.fps);};isAnimated=false;actualFrames=0;this.onComplete.fire(data);};this._onStart=new Y.CustomEvent('_start',this,true);this.onStart=new Y.CustomEvent('start',this);this.onTween=new Y.CustomEvent('tween',this);this._onTween=new Y.CustomEvent('_tween',this,true);this.onComplete=new Y.CustomEvent('complete',this);this._onComplete=new Y.CustomEvent('_complete',this,true);this._onStart.subscribe(onStart);this._onTween.subscribe(onTween);this._onComplete.subscribe(onComplete);}};Y.Anim=Anim;})();YAHOO.util.AnimMgr=new function(){var thread=null;var queue=[];var tweenCount=0;this.fps=1000;this.delay=1;this.registerElement=function(tween){queue[queue.length]=tween;tweenCount+=1;tween._onStart.fire();this.start();};this.unRegister=function(tween,index){index=index||getIndex(tween);if(!tween.isAnimated()||index==-1){return false;}
tween._onComplete.fire();queue.splice(index,1);tweenCount-=1;if(tweenCount<=0){this.stop();}
return true;};this.start=function(){if(thread===null){thread=setInterval(this.run,this.delay);}};this.stop=function(tween){if(!tween){clearInterval(thread);for(var i=0,len=queue.length;i<len;++i){this.unRegister(queue[0],0);}
queue=[];thread=null;tweenCount=0;}
else{this.unRegister(tween);}};this.run=function(){for(var i=0,len=queue.length;i<len;++i){var tween=queue[i];if(!tween||!tween.isAnimated()){continue;}
if(tween.currentFrame<tween.totalFrames||tween.totalFrames===null)
{tween.currentFrame+=1;if(tween.useSeconds){correctFrame(tween);}
tween._onTween.fire();}
else{YAHOO.util.AnimMgr.stop(tween,i);}}};var getIndex=function(anim){for(var i=0,len=queue.length;i<len;++i){if(queue[i]==anim){return i;}}
return-1;};var correctFrame=function(tween){var frames=tween.totalFrames;var frame=tween.currentFrame;var expected=(tween.currentFrame*tween.duration*1000/tween.totalFrames);var elapsed=(new Date()-tween.getStartTime());var tweak=0;if(elapsed<tween.duration*1000){tweak=Math.round((elapsed/expected-1)*tween.currentFrame);}else{tweak=frames-(frame+1);}
if(tweak>0&&isFinite(tweak)){if(tween.currentFrame+tweak>=frames){tweak=frames-(frame+1);}
tween.currentFrame+=tweak;}};};YAHOO.util.Bezier=new function(){this.getPosition=function(points,t){var n=points.length;var tmp=[];for(var i=0;i<n;++i){tmp[i]=[points[i][0],points[i][1]];}
for(var j=1;j<n;++j){for(i=0;i<n-j;++i){tmp[i][0]=(1-t)*tmp[i][0]+t*tmp[parseInt(i+1,10)][0];tmp[i][1]=(1-t)*tmp[i][1]+t*tmp[parseInt(i+1,10)][1];}}
return[tmp[0][0],tmp[0][1]];};};(function(){var ColorAnim=function(el,attributes,duration,method){ColorAnim.superclass.constructor.call(this,el,attributes,duration,method);};ColorAnim.NAME='ColorAnim';var Y=YAHOO.util;YAHOO.extend(ColorAnim,Y.Anim);var superclass=ColorAnim.superclass;var proto=ColorAnim.prototype;proto.patterns.color=/color$/i;proto.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;proto.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;proto.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;proto.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;proto.parseColor=function(s){if(s.length==3){return s;}
var c=this.patterns.hex.exec(s);if(c&&c.length==4){return[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)];}
c=this.patterns.rgb.exec(s);if(c&&c.length==4){return[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)];}
c=this.patterns.hex3.exec(s);if(c&&c.length==4){return[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)];}
return null;};proto.getAttribute=function(attr){var el=this.getEl();if(this.patterns.color.test(attr)){var val=YAHOO.util.Dom.getStyle(el,attr);if(this.patterns.transparent.test(val)){var parent=el.parentNode;val=Y.Dom.getStyle(parent,attr);while(parent&&this.patterns.transparent.test(val)){parent=parent.parentNode;val=Y.Dom.getStyle(parent,attr);if(parent.tagName.toUpperCase()=='HTML'){val='#fff';}}}}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.doMethod=function(attr,start,end){var val;if(this.patterns.color.test(attr)){val=[];for(var i=0,len=start.length;i<len;++i){val[i]=superclass.doMethod.call(this,attr,start[i],end[i]);}
val='rgb('+Math.floor(val[0])+','+Math.floor(val[1])+','+Math.floor(val[2])+')';}
else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.setRuntimeAttribute=function(attr){superclass.setRuntimeAttribute.call(this,attr);if(this.patterns.color.test(attr)){var attributes=this.attributes;var start=this.parseColor(this.runtimeAttributes[attr].start);var end=this.parseColor(this.runtimeAttributes[attr].end);if(typeof attributes[attr]['to']==='undefined'&&typeof attributes[attr]['by']!=='undefined'){end=this.parseColor(attributes[attr].by);for(var i=0,len=start.length;i<len;++i){end[i]=start[i]+end[i];}}
this.runtimeAttributes[attr].start=start;this.runtimeAttributes[attr].end=end;}};Y.ColorAnim=ColorAnim;})();YAHOO.util.Easing={easeNone:function(t,b,c,d){return c*t/d+b;},easeIn:function(t,b,c,d){return c*(t/=d)*t+b;},easeOut:function(t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeBoth:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b;}
return-c/2*((--t)*(t-2)-1)+b;},easeInStrong:function(t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutStrong:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeBothStrong:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b;}
return-c/2*((t-=2)*t*t*t-2)+b;},elasticIn:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d)==1){return b+c;}
if(!p){p=d*.3;}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},elasticOut:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d)==1){return b+c;}
if(!p){p=d*.3;}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},elasticBoth:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d/2)==2){return b+c;}
if(!p){p=d*(.3*1.5);}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
if(t<1){return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;}
return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},backIn:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
return c*(t/=d)*t*((s+1)*t-s)+b;},backOut:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},backBoth:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},bounceIn:function(t,b,c,d){return c-YAHOO.util.Easing.bounceOut(d-t,0,c,d)+b;},bounceOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}
return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},bounceBoth:function(t,b,c,d){if(t<d/2){return YAHOO.util.Easing.bounceIn(t*2,0,c,d)*.5+b;}
return YAHOO.util.Easing.bounceOut(t*2-d,0,c,d)*.5+c*.5+b;}};(function(){var Motion=function(el,attributes,duration,method){if(el){Motion.superclass.constructor.call(this,el,attributes,duration,method);}};Motion.NAME='Motion';var Y=YAHOO.util;YAHOO.extend(Motion,Y.ColorAnim);var superclass=Motion.superclass;var proto=Motion.prototype;proto.patterns.points=/^points$/i;proto.setAttribute=function(attr,val,unit){if(this.patterns.points.test(attr)){unit=unit||'px';superclass.setAttribute.call(this,'left',val[0],unit);superclass.setAttribute.call(this,'top',val[1],unit);}else{superclass.setAttribute.call(this,attr,val,unit);}};proto.getAttribute=function(attr){if(this.patterns.points.test(attr)){var val=[superclass.getAttribute.call(this,'left'),superclass.getAttribute.call(this,'top')];}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.doMethod=function(attr,start,end){var val=null;if(this.patterns.points.test(attr)){var t=this.method(this.currentFrame,0,100,this.totalFrames)/100;val=Y.Bezier.getPosition(this.runtimeAttributes[attr],t);}else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.setRuntimeAttribute=function(attr){if(this.patterns.points.test(attr)){var el=this.getEl();var attributes=this.attributes;var start;var control=attributes['points']['control']||[];var end;var i,len;if(control.length>0&&!(control[0]instanceof Array)){control=[control];}else{var tmp=[];for(i=0,len=control.length;i<len;++i){tmp[i]=control[i];}
control=tmp;}
if(Y.Dom.getStyle(el,'position')=='static'){Y.Dom.setStyle(el,'position','relative');}
if(isset(attributes['points']['from'])){Y.Dom.setXY(el,attributes['points']['from']);}
else{Y.Dom.setXY(el,Y.Dom.getXY(el));}
start=this.getAttribute('points');if(isset(attributes['points']['to'])){end=translateValues.call(this,attributes['points']['to'],start);var pageXY=Y.Dom.getXY(this.getEl());for(i=0,len=control.length;i<len;++i){control[i]=translateValues.call(this,control[i],start);}}else if(isset(attributes['points']['by'])){end=[start[0]+attributes['points']['by'][0],start[1]+attributes['points']['by'][1]];for(i=0,len=control.length;i<len;++i){control[i]=[start[0]+control[i][0],start[1]+control[i][1]];}}
this.runtimeAttributes[attr]=[start];if(control.length>0){this.runtimeAttributes[attr]=this.runtimeAttributes[attr].concat(control);}
this.runtimeAttributes[attr][this.runtimeAttributes[attr].length]=end;}
else{superclass.setRuntimeAttribute.call(this,attr);}};var translateValues=function(val,start){var pageXY=Y.Dom.getXY(this.getEl());val=[val[0]-pageXY[0]+start[0],val[1]-pageXY[1]+start[1]];return val;};var isset=function(prop){return(typeof prop!=='undefined');};Y.Motion=Motion;})();(function(){var Scroll=function(el,attributes,duration,method){if(el){Scroll.superclass.constructor.call(this,el,attributes,duration,method);}};Scroll.NAME='Scroll';var Y=YAHOO.util;YAHOO.extend(Scroll,Y.ColorAnim);var superclass=Scroll.superclass;var proto=Scroll.prototype;proto.doMethod=function(attr,start,end){var val=null;if(attr=='scroll'){val=[this.method(this.currentFrame,start[0],end[0]-start[0],this.totalFrames),this.method(this.currentFrame,start[1],end[1]-start[1],this.totalFrames)];}else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.getAttribute=function(attr){var val=null;var el=this.getEl();if(attr=='scroll'){val=[el.scrollLeft,el.scrollTop];}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.setAttribute=function(attr,val,unit){var el=this.getEl();if(attr=='scroll'){el.scrollLeft=val[0];el.scrollTop=val[1];}else{superclass.setAttribute.call(this,attr,val,unit);}};Y.Scroll=Scroll;})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.5.2",build:"1076"});

YAHOO.widget.AutoComplete=function(elInput,elContainer,oDataSource,oConfigs){if(elInput&&elContainer&&oDataSource){if(oDataSource instanceof YAHOO.widget.DataSource){this.dataSource=oDataSource;}
else{return;}
if(YAHOO.util.Dom.inDocument(elInput)){if(YAHOO.lang.isString(elInput)){this._sName="instance"+YAHOO.widget.AutoComplete._nIndex+" "+elInput;this._elTextbox=document.getElementById(elInput);}
else{this._sName=(elInput.id)?"instance"+YAHOO.widget.AutoComplete._nIndex+" "+elInput.id:"instance"+YAHOO.widget.AutoComplete._nIndex;this._elTextbox=elInput;}
YAHOO.util.Dom.addClass(this._elTextbox,"yui-ac-input");}
else{return;}
if(YAHOO.util.Dom.inDocument(elContainer)){if(YAHOO.lang.isString(elContainer)){this._elContainer=document.getElementById(elContainer);}
else{this._elContainer=elContainer;}
if(this._elContainer.style.display=="none"){}
var elParent=this._elContainer.parentNode;var elTag=elParent.tagName.toLowerCase();if(elTag=="div"){YAHOO.util.Dom.addClass(elParent,"yui-ac");}
else{}}
else{return;}
if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){if(sConfig){this[sConfig]=oConfigs[sConfig];}}}
this._initContainer();this._initProps();this._initList();this._initContainerHelpers();var oSelf=this;var elTextbox=this._elTextbox;var elContent=this._elContent;YAHOO.util.Event.addListener(elTextbox,"keyup",oSelf._onTextboxKeyUp,oSelf);YAHOO.util.Event.addListener(elTextbox,"keydown",oSelf._onTextboxKeyDown,oSelf);YAHOO.util.Event.addListener(elTextbox,"focus",oSelf._onTextboxFocus,oSelf);YAHOO.util.Event.addListener(elTextbox,"blur",oSelf._onTextboxBlur,oSelf);YAHOO.util.Event.addListener(elContent,"mouseover",oSelf._onContainerMouseover,oSelf);YAHOO.util.Event.addListener(elContent,"mouseout",oSelf._onContainerMouseout,oSelf);YAHOO.util.Event.addListener(elContent,"scroll",oSelf._onContainerScroll,oSelf);YAHOO.util.Event.addListener(elContent,"resize",oSelf._onContainerResize,oSelf);YAHOO.util.Event.addListener(elTextbox,"keypress",oSelf._onTextboxKeyPress,oSelf);YAHOO.util.Event.addListener(window,"unload",oSelf._onWindowUnload,oSelf);this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);elTextbox.setAttribute("autocomplete","off");YAHOO.widget.AutoComplete._nIndex++;}
else{}};YAHOO.widget.AutoComplete.prototype.dataSource=null;YAHOO.widget.AutoComplete.prototype.minQueryLength=1;YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed=10;YAHOO.widget.AutoComplete.prototype.queryDelay=0.2;YAHOO.widget.AutoComplete.prototype.highlightClassName="yui-ac-highlight";YAHOO.widget.AutoComplete.prototype.prehighlightClassName=null;YAHOO.widget.AutoComplete.prototype.delimChar=null;YAHOO.widget.AutoComplete.prototype.autoHighlight=true;YAHOO.widget.AutoComplete.prototype.typeAhead=false;YAHOO.widget.AutoComplete.prototype.animHoriz=false;YAHOO.widget.AutoComplete.prototype.animVert=true;YAHOO.widget.AutoComplete.prototype.animSpeed=0.3;YAHOO.widget.AutoComplete.prototype.forceSelection=false;YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete=true;YAHOO.widget.AutoComplete.prototype.alwaysShowContainer=false;YAHOO.widget.AutoComplete.prototype.useIFrame=false;YAHOO.widget.AutoComplete.prototype.useShadow=false;YAHOO.widget.AutoComplete.prototype.toString=function(){return"AutoComplete "+this._sName;};YAHOO.widget.AutoComplete.prototype.isContainerOpen=function(){return this._bContainerOpen;};YAHOO.widget.AutoComplete.prototype.getListItems=function(){return this._aListItems;};YAHOO.widget.AutoComplete.prototype.getListItemData=function(oListItem){if(oListItem._oResultData){return oListItem._oResultData;}
else{return false;}};YAHOO.widget.AutoComplete.prototype.setHeader=function(sHeader){if(this._elHeader){var elHeader=this._elHeader;if(sHeader){elHeader.innerHTML=sHeader;elHeader.style.display="block";}
else{elHeader.innerHTML="";elHeader.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setFooter=function(sFooter){if(this._elFooter){var elFooter=this._elFooter;if(sFooter){elFooter.innerHTML=sFooter;elFooter.style.display="block";}
else{elFooter.innerHTML="";elFooter.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setBody=function(sBody){if(this._elBody){var elBody=this._elBody;if(sBody){elBody.innerHTML=sBody;elBody.style.display="block";elBody.style.display="block";}
else{elBody.innerHTML="";elBody.style.display="none";}
this._maxResultsDisplayed=0;}};YAHOO.widget.AutoComplete.prototype.formatResult=function(oResultItem,sQuery){var sResult=oResultItem[0];if(sResult){return sResult;}
else{return"";}};YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer=function(elTextbox,elContainer,sQuery,aResults){return true;};YAHOO.widget.AutoComplete.prototype.sendQuery=function(sQuery){this._sendQuery(sQuery);};YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery=function(sQuery){return sQuery;};YAHOO.widget.AutoComplete.prototype.destroy=function(){var instanceName=this.toString();var elInput=this._elTextbox;var elContainer=this._elContainer;this.textboxFocusEvent.unsubscribeAll();this.textboxKeyEvent.unsubscribeAll();this.dataRequestEvent.unsubscribeAll();this.dataReturnEvent.unsubscribeAll();this.dataErrorEvent.unsubscribeAll();this.containerExpandEvent.unsubscribeAll();this.typeAheadEvent.unsubscribeAll();this.itemMouseOverEvent.unsubscribeAll();this.itemMouseOutEvent.unsubscribeAll();this.itemArrowToEvent.unsubscribeAll();this.itemArrowFromEvent.unsubscribeAll();this.itemSelectEvent.unsubscribeAll();this.unmatchedItemSelectEvent.unsubscribeAll();this.selectionEnforceEvent.unsubscribeAll();this.containerCollapseEvent.unsubscribeAll();this.textboxBlurEvent.unsubscribeAll();YAHOO.util.Event.purgeElement(elInput,true);YAHOO.util.Event.purgeElement(elContainer,true);elContainer.innerHTML="";for(var key in this){if(YAHOO.lang.hasOwnProperty(this,key)){this[key]=null;}}};YAHOO.widget.AutoComplete.prototype.textboxFocusEvent=null;YAHOO.widget.AutoComplete.prototype.textboxKeyEvent=null;YAHOO.widget.AutoComplete.prototype.dataRequestEvent=null;YAHOO.widget.AutoComplete.prototype.dataReturnEvent=null;YAHOO.widget.AutoComplete.prototype.dataErrorEvent=null;YAHOO.widget.AutoComplete.prototype.containerExpandEvent=null;YAHOO.widget.AutoComplete.prototype.typeAheadEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowToEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent=null;YAHOO.widget.AutoComplete.prototype.itemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent=null;YAHOO.widget.AutoComplete.prototype.containerCollapseEvent=null;YAHOO.widget.AutoComplete.prototype.textboxBlurEvent=null;YAHOO.widget.AutoComplete._nIndex=0;YAHOO.widget.AutoComplete.prototype._sName=null;YAHOO.widget.AutoComplete.prototype._elTextbox=null;YAHOO.widget.AutoComplete.prototype._elContainer=null;YAHOO.widget.AutoComplete.prototype._elContent=null;YAHOO.widget.AutoComplete.prototype._elHeader=null;YAHOO.widget.AutoComplete.prototype._elBody=null;YAHOO.widget.AutoComplete.prototype._elFooter=null;YAHOO.widget.AutoComplete.prototype._elShadow=null;YAHOO.widget.AutoComplete.prototype._elIFrame=null;YAHOO.widget.AutoComplete.prototype._bFocused=true;YAHOO.widget.AutoComplete.prototype._oAnim=null;YAHOO.widget.AutoComplete.prototype._bContainerOpen=false;YAHOO.widget.AutoComplete.prototype._bOverContainer=false;YAHOO.widget.AutoComplete.prototype._aListItems=null;YAHOO.widget.AutoComplete.prototype._nDisplayedItems=0;YAHOO.widget.AutoComplete.prototype._maxResultsDisplayed=0;YAHOO.widget.AutoComplete.prototype._sCurQuery=null;YAHOO.widget.AutoComplete.prototype._sSavedQuery=null;YAHOO.widget.AutoComplete.prototype._oCurItem=null;YAHOO.widget.AutoComplete.prototype._bItemSelected=false;YAHOO.widget.AutoComplete.prototype._nKeyCode=null;YAHOO.widget.AutoComplete.prototype._nDelayID=-1;YAHOO.widget.AutoComplete.prototype._iFrameSrc="javascript:false;";YAHOO.widget.AutoComplete.prototype._queryInterval=null;YAHOO.widget.AutoComplete.prototype._sLastTextboxValue=null;YAHOO.widget.AutoComplete.prototype._initProps=function(){var minQueryLength=this.minQueryLength;if(!YAHOO.lang.isNumber(minQueryLength)){this.minQueryLength=1;}
var maxResultsDisplayed=this.maxResultsDisplayed;if(!YAHOO.lang.isNumber(maxResultsDisplayed)||(maxResultsDisplayed<1)){this.maxResultsDisplayed=10;}
var queryDelay=this.queryDelay;if(!YAHOO.lang.isNumber(queryDelay)||(queryDelay<0)){this.queryDelay=0.2;}
var delimChar=this.delimChar;if(YAHOO.lang.isString(delimChar)&&(delimChar.length>0)){this.delimChar=[delimChar];}
else if(!YAHOO.lang.isArray(delimChar)){this.delimChar=null;}
var animSpeed=this.animSpeed;if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){if(!YAHOO.lang.isNumber(animSpeed)||(animSpeed<0)){this.animSpeed=0.3;}
if(!this._oAnim){this._oAnim=new YAHOO.util.Anim(this._elContent,{},this.animSpeed);}
else{this._oAnim.duration=this.animSpeed;}}
if(this.forceSelection&&delimChar){}};YAHOO.widget.AutoComplete.prototype._initContainerHelpers=function(){if(this.useShadow&&!this._elShadow){var elShadow=document.createElement("div");elShadow.className="yui-ac-shadow";this._elShadow=this._elContainer.appendChild(elShadow);}
if(this.useIFrame&&!this._elIFrame){var elIFrame=document.createElement("iframe");elIFrame.src=this._iFrameSrc;elIFrame.frameBorder=0;elIFrame.scrolling="no";elIFrame.style.position="absolute";elIFrame.style.width="100%";elIFrame.style.height="100%";elIFrame.tabIndex=-1;this._elIFrame=this._elContainer.appendChild(elIFrame);}};YAHOO.widget.AutoComplete.prototype._initContainer=function(){YAHOO.util.Dom.addClass(this._elContainer,"yui-ac-container");if(!this._elContent){var elContent=document.createElement("div");elContent.className="yui-ac-content";elContent.style.display="none";this._elContent=this._elContainer.appendChild(elContent);var elHeader=document.createElement("div");elHeader.className="yui-ac-hd";elHeader.style.display="none";this._elHeader=this._elContent.appendChild(elHeader);var elBody=document.createElement("div");elBody.className="yui-ac-bd";this._elBody=this._elContent.appendChild(elBody);var elFooter=document.createElement("div");elFooter.className="yui-ac-ft";elFooter.style.display="none";this._elFooter=this._elContent.appendChild(elFooter);}
else{}};YAHOO.widget.AutoComplete.prototype._initList=function(){this._aListItems=[];while(this._elBody.hasChildNodes()){var oldListItems=this.getListItems();
if(oldListItems){for(var oldi=oldListItems.length-1;
oldi>=0;
oldi--){
oldListItems[oldi]=null;}}
this._elBody.innerHTML="";}
var oList=document.createElement("ul");
oList=this._elBody.appendChild(oList);

for(var i=0;i<this.maxResultsDisplayed;i++){
  var oItem=document.createElement("li");
  oItem=oList.appendChild(oItem);
  this._aListItems[i]=oItem;
  this._initListItem(oItem,i);
}
this._maxResultsDisplayed=this.maxResultsDisplayed;};YAHOO.widget.AutoComplete.prototype._initListItem=function(oItem,nItemIndex){
var oSelf=this;
oItem.style.display="none";
oItem._nItemIndex=nItemIndex;
oItem.mouseover=oItem.mouseout=oItem.onclick=null;
YAHOO.util.Event.addListener(oItem,"mouseover",oSelf._onItemMouseover,oSelf);
YAHOO.util.Event.addListener(oItem,"mouseout",oSelf._onItemMouseout,oSelf);
YAHOO.util.Event.addListener(oItem,"click",oSelf._onItemMouseclick,oSelf);};
YAHOO.widget.AutoComplete.prototype._onIMEDetected=function(oSelf){oSelf._enableIntervalDetection();};YAHOO.widget.AutoComplete.prototype._enableIntervalDetection=function(){var currValue=this._elTextbox.value;var lastValue=this._sLastTextboxValue;if(currValue!=lastValue){this._sLastTextboxValue=currValue;this._sendQuery(currValue);}};YAHOO.widget.AutoComplete.prototype._cancelIntervalDetection=function(oSelf){if(oSelf._queryInterval){clearInterval(oSelf._queryInterval);}};YAHOO.widget.AutoComplete.prototype._isIgnoreKey=function(nKeyCode){if((nKeyCode==9)||(nKeyCode==13)||(nKeyCode==16)||(nKeyCode==17)||(nKeyCode>=18&&nKeyCode<=20)||(nKeyCode==27)||(nKeyCode>=33&&nKeyCode<=35)||(nKeyCode>=36&&nKeyCode<=40)||(nKeyCode>=44&&nKeyCode<=45)){return true;}
return false;};YAHOO.widget.AutoComplete.prototype._sendQuery=function(sQuery){if(this.minQueryLength==-1){this._toggleContainer(false);return;}
var aDelimChar=(this.delimChar)?this.delimChar:null;if(aDelimChar){var nDelimIndex=-1;for(var i=aDelimChar.length-1;i>=0;i--){var nNewIndex=sQuery.lastIndexOf(aDelimChar[i]);if(nNewIndex>nDelimIndex){nDelimIndex=nNewIndex;}}
if(aDelimChar[i]==" "){for(var j=aDelimChar.length-1;j>=0;j--){if(sQuery[nDelimIndex-1]==aDelimChar[j]){nDelimIndex--;break;}}}
if(nDelimIndex>-1){var nQueryStart=nDelimIndex+1;while(sQuery.charAt(nQueryStart)==" "){nQueryStart+=1;}
this._sSavedQuery=sQuery.substring(0,nQueryStart);sQuery=sQuery.substr(nQueryStart);}
else if(sQuery.indexOf(this._sSavedQuery)<0){this._sSavedQuery=null;}}
if((sQuery&&(sQuery.length<this.minQueryLength))||(!sQuery&&this.minQueryLength>0)){if(this._nDelayID!=-1){clearTimeout(this._nDelayID);}
this._toggleContainer(false);return;}
sQuery=encodeURIComponent(sQuery);this._nDelayID=-1;sQuery=this.doBeforeSendQuery(sQuery);this.dataRequestEvent.fire(this,sQuery);this.dataSource.getResults(this._populateList,sQuery,this);};YAHOO.widget.AutoComplete.prototype._populateList=function(sQuery,aResults,oSelf){if(aResults===null){oSelf.dataErrorEvent.fire(oSelf,sQuery);}
if(!oSelf._bFocused||!aResults){return;}
var isOpera=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);var contentStyle=oSelf._elContent.style;contentStyle.width=(!isOpera)?null:"";contentStyle.height=(!isOpera)?null:"";var sCurQuery=decodeURIComponent(sQuery);oSelf._sCurQuery=sCurQuery;oSelf._bItemSelected=false;if(oSelf._maxResultsDisplayed!=oSelf.maxResultsDisplayed){oSelf._initList();}
var nItems=Math.min(aResults.length,oSelf.maxResultsDisplayed);oSelf._nDisplayedItems=nItems;if(nItems>0){oSelf._initContainerHelpers();var aItems=oSelf._aListItems;for(var i=nItems-1;i>=0;i--){var oItemi=aItems[i];var oResultItemi=aResults[i];oItemi.innerHTML=oSelf.formatResult(oResultItemi,sCurQuery);oItemi.style.display="list-item";
oItemi._sResultKey=oResultItemi[0];oItemi._oResultData=oResultItemi;}
for(var j=aItems.length-1;j>=nItems;j--){
var oItemj=aItems[j];
oItemj.innerHTML=null;
oItemj.style.display="none";
oItemj._sResultKey=null;
oItemj._oResultData=null;}
var ok=oSelf.doBeforeExpandContainer(oSelf._elTextbox,oSelf._elContainer,sQuery,aResults);oSelf._toggleContainer(ok);if(oSelf.autoHighlight){var oFirstItem=aItems[0];oSelf._toggleHighlight(oFirstItem,"to");oSelf.itemArrowToEvent.fire(oSelf,oFirstItem);oSelf._typeAhead(oFirstItem,sQuery);}
else{oSelf._oCurItem=null;}}
else{oSelf._toggleContainer(false);}
oSelf.dataReturnEvent.fire(oSelf,sQuery,aResults);};YAHOO.widget.AutoComplete.prototype._clearSelection=function(){var sValue=this._elTextbox.value;var sChar=(this.delimChar)?this.delimChar[0]:null;var nIndex=(sChar)?sValue.lastIndexOf(sChar,sValue.length-2):-1;if(nIndex>-1){this._elTextbox.value=sValue.substring(0,nIndex);}
else{this._elTextbox.value="";}
this._sSavedQuery=this._elTextbox.value;this.selectionEnforceEvent.fire(this);};YAHOO.widget.AutoComplete.prototype._textMatchesOption=function(){var foundMatch=null;for(var i=this._nDisplayedItems-1;i>=0;i--){var oItem=this._aListItems[i];var sMatch=oItem._sResultKey.toLowerCase();if(sMatch==this._sCurQuery.toLowerCase()){foundMatch=oItem;break;}}
return(foundMatch);};YAHOO.widget.AutoComplete.prototype._typeAhead=function(oItem,sQuery){if(!this.typeAhead||(this._nKeyCode==8)){return;}
var elTextbox=this._elTextbox;var sValue=this._elTextbox.value;if(!elTextbox.setSelectionRange&&!elTextbox.createTextRange){return;}
var nStart=sValue.length;this._updateValue(oItem);var nEnd=elTextbox.value.length;this._selectText(elTextbox,nStart,nEnd);var sPrefill=elTextbox.value.substr(nStart,nEnd);this.typeAheadEvent.fire(this,sQuery,sPrefill);};YAHOO.widget.AutoComplete.prototype._selectText=function(elTextbox,nStart,nEnd){if(elTextbox.setSelectionRange){elTextbox.setSelectionRange(nStart,nEnd);}
else if(elTextbox.createTextRange){var oTextRange=elTextbox.createTextRange();oTextRange.moveStart("character",nStart);oTextRange.moveEnd("character",nEnd-elTextbox.value.length);oTextRange.select();}
else{elTextbox.select();}};YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers=function(bShow){var bFireEvent=false;var width=this._elContent.offsetWidth+"px";var height=this._elContent.offsetHeight+"px";if(this.useIFrame&&this._elIFrame){bFireEvent=true;if(bShow){this._elIFrame.style.width=width;this._elIFrame.style.height=height;}
else{this._elIFrame.style.width=0;this._elIFrame.style.height=0;}}
if(this.useShadow&&this._elShadow){bFireEvent=true;if(bShow){this._elShadow.style.width=width;this._elShadow.style.height=height;}
else{this._elShadow.style.width=0;this._elShadow.style.height=0;}}};YAHOO.widget.AutoComplete.prototype._toggleContainer=function(bShow){var elContainer=this._elContainer;if(this.alwaysShowContainer&&this._bContainerOpen){return;}
if(!bShow){this._elContent.scrollTop=0;var aItems=this._aListItems;if(aItems&&(aItems.length>0)){for(var i=aItems.length-1;i>=0;i--){aItems[i].style.display="none";}}
if(this._oCurItem){this._toggleHighlight(this._oCurItem,"from");}
this._oCurItem=null;this._nDisplayedItems=0;this._sCurQuery=null;}
if(!bShow&&!this._bContainerOpen){this._elContent.style.display="none";return;}
var oAnim=this._oAnim;if(oAnim&&oAnim.getEl()&&(this.animHoriz||this.animVert)){if(!bShow){this._toggleContainerHelpers(bShow);}
if(oAnim.isAnimated()){oAnim.stop();}
var oClone=this._elContent.cloneNode(true);elContainer.appendChild(oClone);oClone.style.top="-9000px";oClone.style.display="block";var wExp=oClone.offsetWidth;var hExp=oClone.offsetHeight;var wColl=(this.animHoriz)?0:wExp;var hColl=(this.animVert)?0:hExp;oAnim.attributes=(bShow)?{width:{to:wExp},height:{to:hExp}}:{width:{to:wColl},height:{to:hColl}};if(bShow&&!this._bContainerOpen){this._elContent.style.width=wColl+"px";this._elContent.style.height=hColl+"px";}
else{this._elContent.style.width=wExp+"px";this._elContent.style.height=hExp+"px";}
elContainer.removeChild(oClone);oClone=null;var oSelf=this;var onAnimComplete=function(){oAnim.onComplete.unsubscribeAll();if(bShow){oSelf.containerExpandEvent.fire(oSelf);}
else{oSelf._elContent.style.display="none";oSelf.containerCollapseEvent.fire(oSelf);}
oSelf._toggleContainerHelpers(bShow);};this._elContent.style.display="block";oAnim.onComplete.subscribe(onAnimComplete);oAnim.animate();this._bContainerOpen=bShow;}
else{if(bShow){this._elContent.style.display="block";this.containerExpandEvent.fire(this);}
else{this._elContent.style.display="none";this.containerCollapseEvent.fire(this);}
this._toggleContainerHelpers(bShow);this._bContainerOpen=bShow;}};YAHOO.widget.AutoComplete.prototype._toggleHighlight=function(oNewItem,sType){var sHighlight=this.highlightClassName;if(this._oCurItem){YAHOO.util.Dom.removeClass(this._oCurItem,sHighlight);}
if((sType=="to")&&sHighlight){YAHOO.util.Dom.addClass(oNewItem,sHighlight);this._oCurItem=oNewItem;}};YAHOO.widget.AutoComplete.prototype._togglePrehighlight=function(oNewItem,sType){if(oNewItem==this._oCurItem){return;}
var sPrehighlight=this.prehighlightClassName;if((sType=="mouseover")&&sPrehighlight){YAHOO.util.Dom.addClass(oNewItem,sPrehighlight);}
else{YAHOO.util.Dom.removeClass(oNewItem,sPrehighlight);}};YAHOO.widget.AutoComplete.prototype._updateValue=function(oItem){var elTextbox=this._elTextbox;var sDelimChar=(this.delimChar)?(this.delimChar[0]||this.delimChar):null;var sSavedQuery=this._sSavedQuery;var sResultKey=oItem._sResultKey;elTextbox.focus();elTextbox.value="";if(sDelimChar){if(sSavedQuery){elTextbox.value=sSavedQuery;}
elTextbox.value+=sResultKey+sDelimChar;if(sDelimChar!=" "){elTextbox.value+=" ";}}
else{elTextbox.value=sResultKey;}
if(elTextbox.type=="textarea"){elTextbox.scrollTop=elTextbox.scrollHeight;}
var end=elTextbox.value.length;this._selectText(elTextbox,end,end);this._oCurItem=oItem;};YAHOO.widget.AutoComplete.prototype._selectItem=function(oItem){this._bItemSelected=true;this._updateValue(oItem);this._cancelIntervalDetection(this);this.itemSelectEvent.fire(this,oItem,oItem._oResultData);this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype._jumpSelection=function(){if(this._oCurItem){this._selectItem(this._oCurItem);}
else{this._toggleContainer(false);}};YAHOO.widget.AutoComplete.prototype._moveSelection=function(nKeyCode){if(this._bContainerOpen){var oCurItem=this._oCurItem;var nCurItemIndex=-1;if(oCurItem){nCurItemIndex=oCurItem._nItemIndex;}
var nNewItemIndex=(nKeyCode==40)?(nCurItemIndex+1):(nCurItemIndex-1);if(nNewItemIndex<-2||nNewItemIndex>=this._nDisplayedItems){return;}
if(oCurItem){this._toggleHighlight(oCurItem,"from");this.itemArrowFromEvent.fire(this,oCurItem);}
if(nNewItemIndex==-1){if(this.delimChar&&this._sSavedQuery){if(!this._textMatchesOption()){this._elTextbox.value=this._sSavedQuery;}
else{this._elTextbox.value=this._sSavedQuery+this._sCurQuery;}}
else{this._elTextbox.value=this._sCurQuery;}
this._oCurItem=null;return;}
if(nNewItemIndex==-2){this._toggleContainer(false);return;}
var oNewItem=this._aListItems[nNewItemIndex];var elContent=this._elContent;var scrollOn=((YAHOO.util.Dom.getStyle(elContent,"overflow")=="auto")||(YAHOO.util.Dom.getStyle(elContent,"overflowY")=="auto"));if(scrollOn&&(nNewItemIndex>-1)&&(nNewItemIndex<this._nDisplayedItems)){if(nKeyCode==40){if((oNewItem.offsetTop+oNewItem.offsetHeight)>(elContent.scrollTop+elContent.offsetHeight)){elContent.scrollTop=(oNewItem.offsetTop+oNewItem.offsetHeight)-elContent.offsetHeight;}
else if((oNewItem.offsetTop+oNewItem.offsetHeight)<elContent.scrollTop){elContent.scrollTop=oNewItem.offsetTop;}}
else{if(oNewItem.offsetTop<elContent.scrollTop){this._elContent.scrollTop=oNewItem.offsetTop;}
else if(oNewItem.offsetTop>(elContent.scrollTop+elContent.offsetHeight)){this._elContent.scrollTop=(oNewItem.offsetTop+oNewItem.offsetHeight)-elContent.offsetHeight;}}}
this._toggleHighlight(oNewItem,"to");this.itemArrowToEvent.fire(this,oNewItem);if(this.typeAhead){this._updateValue(oNewItem);}}};YAHOO.widget.AutoComplete.prototype._onItemMouseover=function(v,oSelf){if(oSelf.prehighlightClassName){oSelf._togglePrehighlight(this,"mouseover");}
else{oSelf._toggleHighlight(this,"to");}
oSelf.itemMouseOverEvent.fire(oSelf,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseout=function(v,oSelf){if(oSelf.prehighlightClassName){oSelf._togglePrehighlight(this,"mouseout");}
else{oSelf._toggleHighlight(this,"from");}
oSelf.itemMouseOutEvent.fire(oSelf,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseclick=function(v,oSelf){oSelf._toggleHighlight(this,"to");oSelf._selectItem(this);};YAHOO.widget.AutoComplete.prototype._onContainerMouseover=function(v,oSelf){oSelf._bOverContainer=true;};YAHOO.widget.AutoComplete.prototype._onContainerMouseout=function(v,oSelf){oSelf._bOverContainer=false;if(oSelf._oCurItem){oSelf._toggleHighlight(oSelf._oCurItem,"to");}};YAHOO.widget.AutoComplete.prototype._onContainerScroll=function(v,oSelf){oSelf._elTextbox.focus();};YAHOO.widget.AutoComplete.prototype._onContainerResize=function(v,oSelf){oSelf._toggleContainerHelpers(oSelf._bContainerOpen);};YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown=function(v,oSelf){var nKeyCode=v.keyCode;switch(nKeyCode){case 9:if((navigator.userAgent.toLowerCase().indexOf("mac")==-1)){if(oSelf._oCurItem){if(oSelf.delimChar&&(oSelf._nKeyCode!=nKeyCode)){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
oSelf._selectItem(oSelf._oCurItem);}
else{oSelf._toggleContainer(false);}}
break;case 13:if((navigator.userAgent.toLowerCase().indexOf("mac")==-1)){if(oSelf._oCurItem){if(oSelf._nKeyCode!=nKeyCode){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
oSelf._selectItem(oSelf._oCurItem);}
else{oSelf._toggleContainer(false);}}
break;case 27:oSelf._toggleContainer(false);return;case 39:oSelf._jumpSelection();break;case 38:YAHOO.util.Event.stopEvent(v);oSelf._moveSelection(nKeyCode);break;case 40:YAHOO.util.Event.stopEvent(v);oSelf._moveSelection(nKeyCode);break;default:break;}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress=function(v,oSelf){var nKeyCode=v.keyCode;if((navigator.userAgent.toLowerCase().indexOf("mac")!=-1)){switch(nKeyCode){case 9:if(oSelf._oCurItem){if(oSelf.delimChar&&(oSelf._nKeyCode!=nKeyCode)){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
oSelf._selectItem(oSelf._oCurItem);}
else{oSelf._toggleContainer(false);}
break;case 13:if(oSelf._oCurItem){if(oSelf._nKeyCode!=nKeyCode){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
oSelf._selectItem(oSelf._oCurItem);}
else{oSelf._toggleContainer(false);}
break;default:break;}}
else if(nKeyCode==229){oSelf._queryInterval=setInterval(function(){oSelf._onIMEDetected(oSelf);},500);}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp=function(v,oSelf){oSelf._initProps();var nKeyCode=v.keyCode;oSelf._nKeyCode=nKeyCode;var sText=this.value;if(oSelf._isIgnoreKey(nKeyCode)||(sText.toLowerCase()==oSelf._sCurQuery)){return;}
else{oSelf._bItemSelected=false;YAHOO.util.Dom.removeClass(oSelf._oCurItem,oSelf.highlightClassName);oSelf._oCurItem=null;oSelf.textboxKeyEvent.fire(oSelf,nKeyCode);}
if(oSelf.queryDelay>0){var nDelayID=setTimeout(function(){oSelf._sendQuery(sText);},(oSelf.queryDelay*1000));if(oSelf._nDelayID!=-1){clearTimeout(oSelf._nDelayID);}
oSelf._nDelayID=nDelayID;}
else{oSelf._sendQuery(sText);}};YAHOO.widget.AutoComplete.prototype._onTextboxFocus=function(v,oSelf){oSelf._elTextbox.setAttribute("autocomplete","off");oSelf._bFocused=true;if(!oSelf._bItemSelected){oSelf.textboxFocusEvent.fire(oSelf);}};YAHOO.widget.AutoComplete.prototype._onTextboxBlur=function(v,oSelf){if(!oSelf._bOverContainer||(oSelf._nKeyCode==9)){if(!oSelf._bItemSelected){var oMatch=oSelf._textMatchesOption();if(!oSelf._bContainerOpen||(oSelf._bContainerOpen&&(oMatch===null))){if(oSelf.forceSelection){oSelf._clearSelection();}
else{oSelf.unmatchedItemSelectEvent.fire(oSelf);}}
else{if(oSelf.forceSelection){oSelf._selectItem(oMatch);}}}
if(oSelf._bContainerOpen){oSelf._toggleContainer(false);}
oSelf._cancelIntervalDetection(oSelf);oSelf._bFocused=false;oSelf.textboxBlurEvent.fire(oSelf);}};YAHOO.widget.AutoComplete.prototype._onWindowUnload=function(v,oSelf){if(oSelf&&oSelf._elTextbox&&oSelf.allowBrowserAutocomplete){oSelf._elTextbox.setAttribute("autocomplete","on");}};YAHOO.widget.DataSource=function(){};YAHOO.widget.DataSource.ERROR_DATANULL="Response data was null";YAHOO.widget.DataSource.ERROR_DATAPARSE="Response data could not be parsed";YAHOO.widget.DataSource.prototype.maxCacheEntries=15;YAHOO.widget.DataSource.prototype.queryMatchContains=false;YAHOO.widget.DataSource.prototype.queryMatchSubset=false;YAHOO.widget.DataSource.prototype.queryMatchCase=false;YAHOO.widget.DataSource.prototype.toString=function(){return"DataSource "+this._sName;};YAHOO.widget.DataSource.prototype.getResults=function(oCallbackFn,sQuery,oParent){var aResults=this._doQueryCache(oCallbackFn,sQuery,oParent);if(aResults.length===0){this.queryEvent.fire(this,oParent,sQuery);this.doQuery(oCallbackFn,sQuery,oParent);}};YAHOO.widget.DataSource.prototype.doQuery=function(oCallbackFn,sQuery,oParent){};YAHOO.widget.DataSource.prototype.flushCache=function(){if(this._aCache){this._aCache=[];}
if(this._aCacheHelper){this._aCacheHelper=[];}
this.cacheFlushEvent.fire(this);};YAHOO.widget.DataSource.prototype.queryEvent=null;YAHOO.widget.DataSource.prototype.cacheQueryEvent=null;YAHOO.widget.DataSource.prototype.getResultsEvent=null;YAHOO.widget.DataSource.prototype.getCachedResultsEvent=null;YAHOO.widget.DataSource.prototype.dataErrorEvent=null;YAHOO.widget.DataSource.prototype.cacheFlushEvent=null;YAHOO.widget.DataSource._nIndex=0;YAHOO.widget.DataSource.prototype._sName=null;YAHOO.widget.DataSource.prototype._aCache=null;YAHOO.widget.DataSource.prototype._init=function(){var maxCacheEntries=this.maxCacheEntries;if(!YAHOO.lang.isNumber(maxCacheEntries)||(maxCacheEntries<0)){maxCacheEntries=0;}
if(maxCacheEntries>0&&!this._aCache){this._aCache=[];}
this._sName="instance"+YAHOO.widget.DataSource._nIndex;YAHOO.widget.DataSource._nIndex++;this.queryEvent=new YAHOO.util.CustomEvent("query",this);this.cacheQueryEvent=new YAHOO.util.CustomEvent("cacheQuery",this);this.getResultsEvent=new YAHOO.util.CustomEvent("getResults",this);this.getCachedResultsEvent=new YAHOO.util.CustomEvent("getCachedResults",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.cacheFlushEvent=new YAHOO.util.CustomEvent("cacheFlush",this);};YAHOO.widget.DataSource.prototype._addCacheElem=function(oResult){var aCache=this._aCache;if(!aCache||!oResult||!oResult.query||!oResult.results){return;}
if(aCache.length>=this.maxCacheEntries){aCache.shift();}
aCache.push(oResult);};YAHOO.widget.DataSource.prototype._doQueryCache=function(oCallbackFn,sQuery,oParent){var aResults=[];var bMatchFound=false;var aCache=this._aCache;var nCacheLength=(aCache)?aCache.length:0;var bMatchContains=this.queryMatchContains;var sOrigQuery;if((this.maxCacheEntries>0)&&aCache&&(nCacheLength>0)){this.cacheQueryEvent.fire(this,oParent,sQuery);if(!this.queryMatchCase){sOrigQuery=sQuery;sQuery=sQuery.toLowerCase();}
for(var i=nCacheLength-1;i>=0;i--){var resultObj=aCache[i];var aAllResultItems=resultObj.results;var matchKey=(!this.queryMatchCase)?encodeURIComponent(resultObj.query).toLowerCase():encodeURIComponent(resultObj.query);if(matchKey==sQuery){bMatchFound=true;aResults=aAllResultItems;if(i!=nCacheLength-1){aCache.splice(i,1);this._addCacheElem(resultObj);}
break;}
else if(this.queryMatchSubset){for(var j=sQuery.length-1;j>=0;j--){var subQuery=sQuery.substr(0,j);if(matchKey==subQuery){bMatchFound=true;for(var k=aAllResultItems.length-1;k>=0;k--){var aRecord=aAllResultItems[k];var sKeyIndex=(this.queryMatchCase)?encodeURIComponent(aRecord[0]).indexOf(sQuery):encodeURIComponent(aRecord[0]).toLowerCase().indexOf(sQuery);if((!bMatchContains&&(sKeyIndex===0))||(bMatchContains&&(sKeyIndex>-1))){aResults.unshift(aRecord);}}
resultObj={};resultObj.query=sQuery;resultObj.results=aResults;this._addCacheElem(resultObj);break;}}
if(bMatchFound){break;}}}
if(bMatchFound){this.getCachedResultsEvent.fire(this,oParent,sOrigQuery,aResults);oCallbackFn(sOrigQuery,aResults,oParent);}}
return aResults;};YAHOO.widget.DS_XHR=function(sScriptURI,aSchema,oConfigs){if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){this[sConfig]=oConfigs[sConfig];}}
if(!YAHOO.lang.isArray(aSchema)||!YAHOO.lang.isString(sScriptURI)){return;}
this.schema=aSchema;this.scriptURI=sScriptURI;this._init();};YAHOO.widget.DS_XHR.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_XHR.TYPE_JSON=0;YAHOO.widget.DS_XHR.TYPE_XML=1;YAHOO.widget.DS_XHR.TYPE_FLAT=2;YAHOO.widget.DS_XHR.ERROR_DATAXHR="XHR response failed";YAHOO.widget.DS_XHR.prototype.connMgr=YAHOO.util.Connect;YAHOO.widget.DS_XHR.prototype.connTimeout=0;YAHOO.widget.DS_XHR.prototype.scriptURI=null;YAHOO.widget.DS_XHR.prototype.scriptQueryParam="query";YAHOO.widget.DS_XHR.prototype.scriptQueryAppend="";YAHOO.widget.DS_XHR.prototype.responseType=YAHOO.widget.DS_XHR.TYPE_JSON;YAHOO.widget.DS_XHR.prototype.responseStripAfter="\n<!-";YAHOO.widget.DS_XHR.prototype.doQuery=function(oCallbackFn,sQuery,oParent){var isXML=(this.responseType==YAHOO.widget.DS_XHR.TYPE_XML);var sUri=this.scriptURI+"?"+this.scriptQueryParam+"="+sQuery;if(this.scriptQueryAppend.length>0){sUri+="&"+this.scriptQueryAppend;}
var oResponse=null;var oSelf=this;var responseSuccess=function(oResp){if(!oSelf._oConn||(oResp.tId!=oSelf._oConn.tId)){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATANULL);return;}
for(var foo in oResp){}
if(!isXML){oResp=oResp.responseText;}
else{oResp=oResp.responseXML;}
if(oResp===null){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATANULL);return;}
var aResults=oSelf.parseResponse(sQuery,oResp,oParent);var resultObj={};resultObj.query=decodeURIComponent(sQuery);resultObj.results=aResults;if(aResults===null){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATAPARSE);aResults=[];}
else{oSelf.getResultsEvent.fire(oSelf,oParent,sQuery,aResults);oSelf._addCacheElem(resultObj);}
oCallbackFn(sQuery,aResults,oParent);};var responseFailure=function(oResp){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DS_XHR.ERROR_DATAXHR);return;};var oCallback={success:responseSuccess,failure:responseFailure};if(YAHOO.lang.isNumber(this.connTimeout)&&(this.connTimeout>0)){oCallback.timeout=this.connTimeout;}
if(this._oConn){this.connMgr.abort(this._oConn);}
oSelf._oConn=this.connMgr.asyncRequest("GET",sUri,oCallback,null);};YAHOO.widget.DS_XHR.prototype.parseResponse=function(sQuery,oResponse,oParent){var aSchema=this.schema;var aResults=[];var bError=false;var nEnd=((this.responseStripAfter!=="")&&(oResponse.indexOf))?oResponse.indexOf(this.responseStripAfter):-1;if(nEnd!=-1){oResponse=oResponse.substring(0,nEnd);}
switch(this.responseType){case YAHOO.widget.DS_XHR.TYPE_JSON:var jsonList,jsonObjParsed;
if(YAHOO.lang.JSON){
  jsonObjParsed=YAHOO.lang.JSON.parse(oResponse);
  if(!jsonObjParsed){bError=true;break;}
  else{
    try{jsonList=eval("jsonObjParsed."+aSchema[0]);}
    catch(e){bError=true;break;}
  }
}else if(oResponse.parseJSON){
  jsonObjParsed=oResponse.parseJSON();
  if(!jsonObjParsed){bError=true;}
  else{
    try{jsonList=eval("jsonObjParsed."+aSchema[0]);}
    catch(e){bError=true;break;}
    }
}
else if(window.JSON){
  jsonObjParsed=JSON.parse(oResponse);
  if(!jsonObjParsed){bError=true;break;}
  else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}
  catch(e){bError=true;break;}
  }
}
else{try{while(oResponse.substring(0,1)==" "){oResponse=oResponse.substring(1,oResponse.length);}
if(oResponse.indexOf("{")<0){bError=true;break;}
if(oResponse.indexOf("{}")===0){break;}
var jsonObjRaw=eval("("+oResponse+")");if(!jsonObjRaw){bError=true;break;}
jsonList=eval("(jsonObjRaw."+aSchema[0]+")");}
catch(e){bError=true;break;}}
if(!jsonList){bError=true;break;}
if(!YAHOO.lang.isArray(jsonList)){jsonList=[jsonList];}
for(var i=jsonList.length-1;i>=0;i--){var aResultItem=[];var jsonResult=jsonList[i];for(var j=aSchema.length-1;j>=1;j--){var dataFieldValue=jsonResult[aSchema[j]];if(!dataFieldValue){dataFieldValue="";}
aResultItem.unshift(dataFieldValue);}
if(aResultItem.length==1){aResultItem.push(jsonResult);}
aResults.unshift(aResultItem);}
break;case YAHOO.widget.DS_XHR.TYPE_XML:var xmlList=oResponse.getElementsByTagName(aSchema[0]);if(!xmlList){bError=true;break;}
for(var k=xmlList.length-1;k>=0;k--){var result=xmlList.item(k);var aFieldSet=[];for(var m=aSchema.length-1;m>=1;m--){var sValue=null;var xmlAttr=result.attributes.getNamedItem(aSchema[m]);if(xmlAttr){sValue=xmlAttr.value;}
else{var xmlNode=result.getElementsByTagName(aSchema[m]);if(xmlNode&&xmlNode.item(0)&&xmlNode.item(0).firstChild){sValue=xmlNode.item(0).firstChild.nodeValue;}
else{sValue="";}}
aFieldSet.unshift(sValue);}
aResults.unshift(aFieldSet);}
break;case YAHOO.widget.DS_XHR.TYPE_FLAT:if(oResponse.length>0){var newLength=oResponse.length-aSchema[0].length;if(oResponse.substr(newLength)==aSchema[0]){oResponse=oResponse.substr(0,newLength);}
if(oResponse.length>0){var aRecords=oResponse.split(aSchema[0]);for(var n=aRecords.length-1;n>=0;n--){if(aRecords[n].length>0){aResults[n]=aRecords[n].split(aSchema[1]);}}}}
break;default:break;}
sQuery=null;oResponse=null;oParent=null;if(bError){return null;}
else{return aResults;}};YAHOO.widget.DS_XHR.prototype._oConn=null;YAHOO.widget.DS_ScriptNode=function(sUri,aSchema,oConfigs){if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){this[sConfig]=oConfigs[sConfig];}}
if(!YAHOO.lang.isArray(aSchema)||!YAHOO.lang.isString(sUri)){return;}
this.schema=aSchema;this.scriptURI=sUri;this._init();};YAHOO.widget.DS_ScriptNode.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_ScriptNode.prototype.getUtility=YAHOO.util.Get;YAHOO.widget.DS_ScriptNode.prototype.scriptURI=null;YAHOO.widget.DS_ScriptNode.prototype.scriptQueryParam="query";YAHOO.widget.DS_ScriptNode.prototype.asyncMode="allowAll";YAHOO.widget.DS_ScriptNode.prototype.scriptCallbackParam="callback";YAHOO.widget.DS_ScriptNode.callbacks=[];YAHOO.widget.DS_ScriptNode._nId=0;YAHOO.widget.DS_ScriptNode._nPending=0;YAHOO.widget.DS_ScriptNode.prototype.doQuery=function(oCallbackFn,sQuery,oParent){var oSelf=this;if(YAHOO.widget.DS_ScriptNode._nPending===0){YAHOO.widget.DS_ScriptNode.callbacks=[];YAHOO.widget.DS_ScriptNode._nId=0;}
var id=YAHOO.widget.DS_ScriptNode._nId;YAHOO.widget.DS_ScriptNode._nId++;YAHOO.widget.DS_ScriptNode.callbacks[id]=function(oResponse){if((oSelf.asyncMode!=="ignoreStaleResponses")||(id===YAHOO.widget.DS_ScriptNode.callbacks.length-1)){oSelf.handleResponse(oResponse,oCallbackFn,sQuery,oParent);}
else{}
delete YAHOO.widget.DS_ScriptNode.callbacks[id];};YAHOO.widget.DS_ScriptNode._nPending++;var sUri=this.scriptURI+"&"+this.scriptQueryParam+"="+sQuery+"&"+
this.scriptCallbackParam+"=YAHOO.widget.DS_ScriptNode.callbacks["+id+"]";this.getUtility.script(sUri,{autopurge:true,onsuccess:YAHOO.widget.DS_ScriptNode._bumpPendingDown,onfail:YAHOO.widget.DS_ScriptNode._bumpPendingDown});};YAHOO.widget.DS_ScriptNode.prototype.handleResponse=function(oResponse,oCallbackFn,sQuery,oParent){var aSchema=this.schema;var aResults=[];var bError=false;var jsonList,jsonObjParsed;try{jsonList=eval("(oResponse."+aSchema[0]+")");}
catch(e){bError=true;}
if(!jsonList){bError=true;jsonList=[];}
else if(!YAHOO.lang.isArray(jsonList)){jsonList=[jsonList];}
for(var i=jsonList.length-1;i>=0;i--){var aResultItem=[];var jsonResult=jsonList[i];for(var j=aSchema.length-1;j>=1;j--){var dataFieldValue=jsonResult[aSchema[j]];if(!dataFieldValue){dataFieldValue="";}
aResultItem.unshift(dataFieldValue);}
if(aResultItem.length==1){aResultItem.push(jsonResult);}
aResults.unshift(aResultItem);}
if(bError){aResults=null;}
if(aResults===null){this.dataErrorEvent.fire(this,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATAPARSE);aResults=[];}
else{var resultObj={};resultObj.query=decodeURIComponent(sQuery);resultObj.results=aResults;this._addCacheElem(resultObj);this.getResultsEvent.fire(this,oParent,sQuery,aResults);}
oCallbackFn(sQuery,aResults,oParent);};YAHOO.widget.DS_ScriptNode._bumpPendingDown=function(){YAHOO.widget.DS_ScriptNode._nPending--;};YAHOO.widget.DS_JSFunction=function(oFunction,oConfigs){if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){this[sConfig]=oConfigs[sConfig];}}
if(!YAHOO.lang.isFunction(oFunction)){return;}
else{this.dataFunction=oFunction;this._init();}};YAHOO.widget.DS_JSFunction.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSFunction.prototype.dataFunction=null;YAHOO.widget.DS_JSFunction.prototype.doQuery=function(oCallbackFn,sQuery,oParent){var oFunction=this.dataFunction;var aResults=[];aResults=oFunction(sQuery);if(aResults===null){this.dataErrorEvent.fire(this,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATANULL);return;}
var resultObj={};resultObj.query=decodeURIComponent(sQuery);resultObj.results=aResults;this._addCacheElem(resultObj);this.getResultsEvent.fire(this,oParent,sQuery,aResults);oCallbackFn(sQuery,aResults,oParent);return;};YAHOO.widget.DS_JSArray=function(aData,oConfigs){if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){this[sConfig]=oConfigs[sConfig];}}
if(!YAHOO.lang.isArray(aData)){return;}
else{this.data=aData;this._init();}};YAHOO.widget.DS_JSArray.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSArray.prototype.data=null;YAHOO.widget.DS_JSArray.prototype.doQuery=function(oCallbackFn,sQuery,oParent){var i;var aData=this.data;var aResults=[];var bMatchFound=false;var bMatchContains=this.queryMatchContains;if(sQuery){if(!this.queryMatchCase){sQuery=sQuery.toLowerCase();}
for(i=aData.length-1;i>=0;i--){var aDataset=[];if(YAHOO.lang.isString(aData[i])){aDataset[0]=aData[i];}
else if(YAHOO.lang.isArray(aData[i])){aDataset=aData[i];}
if(YAHOO.lang.isString(aDataset[0])){var sKeyIndex=(this.queryMatchCase)?encodeURIComponent(aDataset[0]).indexOf(sQuery):encodeURIComponent(aDataset[0]).toLowerCase().indexOf(sQuery);if((!bMatchContains&&(sKeyIndex===0))||(bMatchContains&&(sKeyIndex>-1))){aResults.unshift(aDataset);}}}}
else{for(i=aData.length-1;i>=0;i--){if(YAHOO.lang.isString(aData[i])){aResults.unshift([aData[i]]);}
else if(YAHOO.lang.isArray(aData[i])){aResults.unshift(aData[i]);}}}
this.getResultsEvent.fire(this,oParent,sQuery,aResults);oCallbackFn(sQuery,aResults,oParent);};YAHOO.register("autocomplete",YAHOO.widget.AutoComplete,{version:"2.5.2",build:"1076"});

YAHOO.widget.MultiAutoComplete=function(elInput,elContainer,oDataSources,oConfigs){if(elInput&&elContainer&&oDataSources){if(oDataSources)
{for(var i=0;i<oDataSources.length;i++)
{if(!(oDataSources[i]instanceof YAHOO.widget.DataSource))
{return;}}
this.dataSources=oDataSources;}
else{return;}
if(YAHOO.util.Dom.inDocument(elInput)){if(typeof elInput=="string"){this._sName="instance"+YAHOO.widget.MultiAutoComplete._nIndex+" "+elInput;this._oTextbox=document.getElementById(elInput);}
else{this._sName=(elInput.id)?"instance"+YAHOO.widget.MultiAutoComplete._nIndex+" "+elInput.id:"instance"+YAHOO.widget.MultiAutoComplete._nIndex;this._oTextbox=elInput;}}
else{return;}
if(YAHOO.util.Dom.inDocument(elContainer)){if(typeof elContainer=="string"){this._oContainer=document.getElementById(elContainer);}
else{this._oContainer=elContainer;}
if(this._oContainer.style.display=="none"){}}
else{return;}
if(typeof oConfigs=="object"){for(var sConfig in oConfigs){if(sConfig){this[sConfig]=oConfigs[sConfig];}}}
this._initContainer();this._initProps();this._initList();this._initContainerHelpers();var oSelf=this;var oTextbox=this._oTextbox;var oContent=this._oContainer._oContent;YAHOO.util.Event.addListener(oTextbox,"keyup",oSelf._onTextboxKeyUp,oSelf);YAHOO.util.Event.addListener(oTextbox,"keydown",oSelf._onTextboxKeyDown,oSelf);YAHOO.util.Event.addListener(oTextbox,"focus",oSelf._onTextboxFocus,oSelf);YAHOO.util.Event.addListener(oTextbox,"blur",oSelf._onTextboxBlur,oSelf);YAHOO.util.Event.addListener(oContent,"mouseover",oSelf._onContainerMouseover,oSelf);YAHOO.util.Event.addListener(oContent,"mouseout",oSelf._onContainerMouseout,oSelf);YAHOO.util.Event.addListener(oContent,"scroll",oSelf._onContainerScroll,oSelf);YAHOO.util.Event.addListener(oContent,"resize",oSelf._onContainerResize,oSelf);if(oTextbox.form){YAHOO.util.Event.addListener(oTextbox.form,"submit",oSelf._onFormSubmit,oSelf);}
YAHOO.util.Event.addListener(oTextbox,"keypress",oSelf._onTextboxKeyPress,oSelf);this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);oTextbox.setAttribute("autocomplete","off");YAHOO.widget.MultiAutoComplete._nIndex++;}
else{}};YAHOO.widget.MultiAutoComplete.prototype.dataSources=null;YAHOO.widget.MultiAutoComplete.prototype.minQueryLength=1;YAHOO.widget.MultiAutoComplete.prototype.maxResultsDisplayed=10;YAHOO.widget.MultiAutoComplete.prototype.queryDelay=0.5;YAHOO.widget.MultiAutoComplete.prototype.highlightClassName="yui-ac-highlight";YAHOO.widget.MultiAutoComplete.prototype.prehighlightClassName=null;YAHOO.widget.MultiAutoComplete.prototype.delimChar=null;YAHOO.widget.MultiAutoComplete.prototype.autoHighlight=true;YAHOO.widget.MultiAutoComplete.prototype.typeAhead=false;YAHOO.widget.MultiAutoComplete.prototype.animHoriz=false;YAHOO.widget.MultiAutoComplete.prototype.animVert=true;YAHOO.widget.MultiAutoComplete.prototype.animSpeed=0.3;YAHOO.widget.MultiAutoComplete.prototype.forceSelection=false;YAHOO.widget.MultiAutoComplete.prototype.allowBrowserAutocomplete=true;YAHOO.widget.MultiAutoComplete.prototype.alwaysShowContainer=false;YAHOO.widget.MultiAutoComplete.prototype.useIFrame=false;YAHOO.widget.MultiAutoComplete.prototype.useShadow=false;YAHOO.widget.MultiAutoComplete.prototype.toString=function(){return"AutoComplete "+this._sName;};YAHOO.widget.MultiAutoComplete.prototype.isContainerOpen=function(){return this._bContainerOpen;};YAHOO.widget.MultiAutoComplete.prototype.getListItems=function(){return this._aListItems;};YAHOO.widget.MultiAutoComplete.prototype.getListItemData=function(oListItem){if(oListItem._oResultData){return oListItem._oResultData;}
else{return false;}};YAHOO.widget.MultiAutoComplete.prototype.setHeader=function(sHeader){if(sHeader){if(this._oContainer._oContent._oHeader){this._oContainer._oContent._oHeader.innerHTML=sHeader;this._oContainer._oContent._oHeader.style.display="block";}}
else{this._oContainer._oContent._oHeader.innerHTML="";this._oContainer._oContent._oHeader.style.display="none";}};YAHOO.widget.MultiAutoComplete.prototype.setSubHeader=function(sHeader,index){if(sHeader){if(this._oContainer._oContent._oSubHeaders[index]){this._oContainer._oContent._oSubHeaders[index].innerHTML=sHeader;this._oContainer._oContent._oSubHeaders[index].style.display="block";}}
else{if(this._oContainer._oContent._oSubHeaders[index]){this._oContainer._oContent._oSubHeaders[index].innerHTML="";this._oContainer._oContent._oSubHeaders[index].style.display="none";}}};YAHOO.widget.MultiAutoComplete.prototype.setFooter=function(sFooter){if(sFooter){if(this._oContainer._oContent._oFooter){this._oContainer._oContent._oFooter.innerHTML=sFooter;this._oContainer._oContent._oFooter.style.display="block";}}
else{this._oContainer._oContent._oFooter.innerHTML="";this._oContainer._oContent._oFooter.style.display="none";}};YAHOO.widget.MultiAutoComplete.prototype.setSubFooter=function(sFooter,index){if(sFooter){if(this._oContainer._oContent._oSubFooters[index]){this._oContainer._oContent._oSubFooters[index].innerHTML=sFooter;this._oContainer._oContent._oSubFooters[index].style.display="block";}}
else{if(this._oContainer._oContent._oSubFooters[index]){this._oContainer._oContent._oSubFooters[index].innerHTML="";this._oContainer._oContent._oSubFooters[index].style.display="none";}}};YAHOO.widget.MultiAutoComplete.prototype.toggleSubHeader=function(show,index)
{if(this._oContainer._oContent._oSubHeaders[index])
{if(show===true){this._oContainer._oContent._oSubHeaders[index].style.display="block";} else {this._oContainer._oContent._oSubHeaders[index].style.display="none";}}};YAHOO.widget.MultiAutoComplete.prototype.setBody=function(sBody){if(sBody){if(this._oContainer._oContent._oBody){this._oContainer._oContent._oBody.innerHTML=sBody;this._oContainer._oContent._oBody.style.display="block";this._oContainer._oContent.style.display="block";}}
else{this._oContainer._oContent._oBody.innerHTML="";this._oContainer._oContent.style.display="none";}
this._maxResultsDisplayed=0;};YAHOO.widget.MultiAutoComplete.prototype.formatResult=function(oResultItem,sQuery){var sResult=oResultItem[0];if(sResult){return sResult;}
else{return"";}};YAHOO.widget.MultiAutoComplete.prototype.doBeforeExpandContainer=function(oResultItem,sQuery){return true;};YAHOO.widget.MultiAutoComplete.prototype.sendQuery=function(sQuery){this._sendQuery(sQuery);};YAHOO.widget.MultiAutoComplete.prototype.textboxFocusEvent=null;YAHOO.widget.MultiAutoComplete.prototype.textboxKeyEvent=null;YAHOO.widget.MultiAutoComplete.prototype.dataRequestEvent=null;YAHOO.widget.MultiAutoComplete.prototype.dataReturnEvent=null;YAHOO.widget.MultiAutoComplete.prototype.dataErrorEvent=null;YAHOO.widget.MultiAutoComplete.prototype.containerExpandEvent=null;YAHOO.widget.MultiAutoComplete.prototype.typeAheadEvent=null;YAHOO.widget.MultiAutoComplete.prototype.itemMouseOverEvent=null;YAHOO.widget.MultiAutoComplete.prototype.itemMouseOutEvent=null;YAHOO.widget.MultiAutoComplete.prototype.itemArrowToEvent=null;YAHOO.widget.MultiAutoComplete.prototype.itemArrowFromEvent=null;YAHOO.widget.MultiAutoComplete.prototype.itemSelectEvent=null;YAHOO.widget.MultiAutoComplete.prototype.unmatchedItemSelectEvent=null;YAHOO.widget.MultiAutoComplete.prototype.selectionEnforceEvent=null;YAHOO.widget.MultiAutoComplete.prototype.containerCollapseEvent=null;YAHOO.widget.MultiAutoComplete.prototype.textboxBlurEvent=null;YAHOO.widget.MultiAutoComplete._nIndex=0;YAHOO.widget.MultiAutoComplete.prototype._sName=null;YAHOO.widget.MultiAutoComplete.prototype._oTextbox=null;YAHOO.widget.MultiAutoComplete.prototype._bFocused=true;YAHOO.widget.MultiAutoComplete.prototype._oAnim=null;YAHOO.widget.MultiAutoComplete.prototype._oContainer=null;YAHOO.widget.MultiAutoComplete.prototype._bContainerOpen=false;YAHOO.widget.MultiAutoComplete.prototype._bOverContainer=false;YAHOO.widget.MultiAutoComplete.prototype._aListItems=null;YAHOO.widget.MultiAutoComplete.prototype._nDisplayedItems=0;YAHOO.widget.MultiAutoComplete.prototype._maxResultsDisplayed=0;YAHOO.widget.MultiAutoComplete.prototype._sCurQuery=null;YAHOO.widget.MultiAutoComplete.prototype._sSavedQuery=null;YAHOO.widget.MultiAutoComplete.prototype._oCurItem=null;YAHOO.widget.MultiAutoComplete.prototype._bItemSelected=false;YAHOO.widget.MultiAutoComplete.prototype._nKeyCode=null;YAHOO.widget.MultiAutoComplete.prototype._nDelayID=-1;YAHOO.widget.MultiAutoComplete.prototype._iFrameSrc="javascript:false;";YAHOO.widget.MultiAutoComplete.prototype._queryInterval=null;YAHOO.widget.MultiAutoComplete.prototype._sLastTextboxValue=null;YAHOO.widget.MultiAutoComplete.prototype._initProps=function(){var minQueryLength=this.minQueryLength;if(isNaN(minQueryLength)||(minQueryLength<1)){minQueryLength=1;}
var maxResultsDisplayed=this.maxResultsDisplayed;if(isNaN(this.maxResultsDisplayed)||(this.maxResultsDisplayed<1)){this.maxResultsDisplayed=10;}
var queryDelay=this.queryDelay;if(isNaN(this.queryDelay)||(this.queryDelay<0)){this.queryDelay=0.5;}
var aDelimChar=(this.delimChar)?this.delimChar:null;if(aDelimChar){if(typeof aDelimChar=="string"){this.delimChar=[aDelimChar];}
else if(aDelimChar.constructor!=Array){this.delimChar=null;}}
var animSpeed=this.animSpeed;if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){if(isNaN(animSpeed)||(animSpeed<0)){animSpeed=0.3;}
if(!this._oAnim){oAnim=new YAHOO.util.Anim(this._oContainer._oContent,{},this.animSpeed);this._oAnim=oAnim;}
else{this._oAnim.duration=animSpeed;}}
if(this.forceSelection&&this.delimChar){}};YAHOO.widget.MultiAutoComplete.prototype._initContainerHelpers=function(){if(this.useShadow&&!this._oContainer._oShadow){var oShadow=document.createElement("div");oShadow.className="yui-ac-shadow";this._oContainer._oShadow=this._oContainer.appendChild(oShadow);}
if(this.useIFrame&&!this._oContainer._oIFrame){var oIFrame=document.createElement("iframe");oIFrame.src=this._iFrameSrc;oIFrame.frameBorder=0;oIFrame.scrolling="no";oIFrame.style.position="absolute";oIFrame.style.width="100%";oIFrame.style.height="100%";oIFrame.tabIndex=-1;this._oContainer._oIFrame=this._oContainer.appendChild(oIFrame);}};YAHOO.widget.MultiAutoComplete.prototype._initContainer=function(){if(!this._oContainer._oContent){var oContent=document.createElement("div");oContent.className="yui-ac-content";oContent.style.display="none";this._oContainer._oContent=this._oContainer.appendChild(oContent);var oHeader=document.createElement("div");oHeader.className="yui-ac-hd";oHeader.style.display="none";this._oContainer._oContent._oHeader=this._oContainer._oContent.appendChild(oHeader);this._oContainer._oContent._oSubHeaders=new Array();this._oContainer._oContent._oBodys=new Array();this._oContainer._oContent._oSubFooters=new Array();for(var i=0;i<this.dataSources.length;i++)
{var oSubHeader=document.createElement("div");oSubHeader.className="yui-ac-hd-sub";oSubHeader.style.display="none";this._oContainer._oContent._oSubHeaders.push(this._oContainer._oContent.appendChild(oSubHeader));var oBody=document.createElement("div");oBody.className="yui-ac-bd";this._oContainer._oContent._oBodys.push(this._oContainer._oContent.appendChild(oBody));var oSubFooter=document.createElement("div");oSubFooter.className="yui-ac-ft-sub";oSubFooter.style.display="none";this._oContainer._oContent._oSubFooters.push(this._oContainer._oContent.appendChild(oSubFooter));}
var oFooter=document.createElement("div");oFooter.className="yui-ac-ft";oFooter.style.display="none";this._oContainer._oContent._oFooter=this._oContainer._oContent.appendChild(oFooter);}
else{}};YAHOO.widget.MultiAutoComplete.prototype._initList=function(){this._aListItems=[];for(var i=0;i<this._oContainer._oContent._oBodys.length;i++)
{while(this._oContainer._oContent._oBodys[i].hasChildNodes()){var oldListItems=this.getListItems()[i];if(oldListItems){for(var oldi=oldListItems.length-1;oldi>=0;oldi--){oldListItems[oldi]=null;}}
this._oContainer._oContent._oBodys[i].innerHTML="";}}
for(var i=0;i<this._oContainer._oContent._oBodys.length;i++)
{this._aListItems[i]=[]
var oList=document.createElement("ul");oList=this._oContainer._oContent._oBodys[i].appendChild(oList);for(var j=0;j<this.maxResultsDisplayed;j++){var oItem=document.createElement("li");oItem=oList.appendChild(oItem);this._aListItems[i][j]=oItem;this._initListItem(oItem,j,i);}}
this._maxResultsDisplayed=this.maxResultsDisplayed;};YAHOO.widget.MultiAutoComplete.prototype._initSubList=function(iIndex){while(this._oContainer._oContent._oBodys[iIndex].hasChildNodes()){var oldListItems=this.getListItems()[iIndex];if(oldListItems){for(var oldi=oldListItems.length-1;oldi>=0;oldi--){oldListItems[oldi]=null;}}
this._oContainer._oContent._oBodys[iIndex].innerHTML="";}
this._aListItems[iIndex]=[]
var oList=document.createElement("ul");oList=this._oContainer._oContent._oBodys[iIndex].appendChild(oList);for(var j=0;j<this.maxResultsDisplayed;j++){var oItem=document.createElement("li");oItem=oList.appendChild(oItem);this._aListItems[iIndex][j]=oItem;
this._initListItem(oItem,j,iIndex);}};
YAHOO.widget.MultiAutoComplete.prototype._initListItem=function(oItem,nItemIndex,nDataSourceIndex){
var oSelf=this;oItem.style.display="none";
oItem._nItemIndex=nItemIndex;
oItem._nDataSourceIndex=nDataSourceIndex;
oItem.mouseover=oItem.mouseout=oItem.onclick=null;
YAHOO.util.Event.addListener(oItem,"mouseover",oSelf._onItemMouseover,oSelf);
YAHOO.util.Event.addListener(oItem,"mouseout",oSelf._onItemMouseout,oSelf);
YAHOO.util.Event.addListener(oItem,"click",oSelf._onItemMouseclick,oSelf);};
YAHOO.widget.MultiAutoComplete.prototype._onIMEDetected=function(oSelf){oSelf._enableIntervalDetection();};
YAHOO.widget.MultiAutoComplete.prototype._enableIntervalDetection=function(){var currValue=this._oTextbox.value;var lastValue=this._sLastTextboxValue;if(currValue!=lastValue){this._sLastTextboxValue=currValue;this._sendQuery(currValue);}};YAHOO.widget.MultiAutoComplete.prototype._cancelIntervalDetection=function(oSelf){if(oSelf._queryInterval){clearInterval(oSelf._queryInterval);}};YAHOO.widget.MultiAutoComplete.prototype._isIgnoreKey=function(nKeyCode){if((nKeyCode==9)||(nKeyCode==13)||(nKeyCode==16)||(nKeyCode==17)||(nKeyCode>=18&&nKeyCode<=20)||(nKeyCode==27)||(nKeyCode>=33&&nKeyCode<=35)||(nKeyCode>=36&&nKeyCode<=38)||(nKeyCode==40)||(nKeyCode>=44&&nKeyCode<=45)){return true;}
return false;};YAHOO.widget.MultiAutoComplete.prototype._sendQuery=function(sQuery){if(this.minQueryLength==-1){this._toggleContainer(false);return;}
var aDelimChar=(this.delimChar)?this.delimChar:null;if(aDelimChar){var nDelimIndex=-1;for(var i=aDelimChar.length-1;i>=0;i--){var nNewIndex=sQuery.lastIndexOf(aDelimChar[i]);if(nNewIndex>nDelimIndex){nDelimIndex=nNewIndex;}}
if(aDelimChar[i]==" "){for(var j=aDelimChar.length-1;j>=0;j--){if(sQuery[nDelimIndex-1]==aDelimChar[j]){nDelimIndex--;break;}}}
if(nDelimIndex>-1){var nQueryStart=nDelimIndex+1;while(sQuery.charAt(nQueryStart)==" "){nQueryStart+=1;}
this._sSavedQuery=sQuery.substring(0,nQueryStart);sQuery=sQuery.substr(nQueryStart);}
else if(sQuery.indexOf(this._sSavedQuery)<0){this._sSavedQuery=null;}}
if(sQuery&&(sQuery.length<this.minQueryLength)||(!sQuery&&this.minQueryLength>0)){if(this._nDelayID!=-1){clearTimeout(this._nDelayID);}
this._toggleContainer(false);return;}
sQuery=encodeURIComponent(sQuery);this._nDelayID=-1;this.dataRequestEvent.fire(this,sQuery);this._waitingToPopulate=new Array();this._nDisplayedItems=0;for(var i=0;i<this.dataSources.length;i++)
{this.dataSources[i].getResults(this._populateStaging,sQuery,this);}};YAHOO.widget.MultiAutoComplete.prototype._waitingToPopulate=new Array();
YAHOO.widget.MultiAutoComplete.prototype._populateStaging=function(sQuery,aResults,oSelf,iIndex){
if(oSelf._waitingToPopulate.length==oSelf.dataSources.length-1){for(var i=0;i<oSelf._waitingToPopulate.length;i++){
if(oSelf._waitingToPopulate[i]!=null){oSelf._populateList(oSelf._waitingToPopulate[i].query,oSelf._waitingToPopulate[i].results,oSelf._waitingToPopulate[i].self,oSelf._waitingToPopulate[i].index);}
}
if(aResults!=null){oSelf._populateList(sQuery,aResults,oSelf,iIndex);}}
else{if(aResults==null){oSelf._waitingToPopulate.push(null);}else
{oSelf._waitingToPopulate.push({query:sQuery,results:aResults,self:oSelf,index:iIndex});}}}
YAHOO.widget.MultiAutoComplete.prototype._populateList=function(sQuery,aResults,oSelf,iIndex){if(aResults===null){oSelf.dataErrorEvent.fire(oSelf,sQuery);}
if(!oSelf._bFocused||!aResults){return;}
var isOpera=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);var contentStyle=oSelf._oContainer._oContent.style;contentStyle.width=(!isOpera)?null:"";contentStyle.height=(!isOpera)?null:"";var sCurQuery=decodeURIComponent(sQuery);oSelf._sCurQuery=sCurQuery;oSelf._bItemSelected=false;if(oSelf._maxResultsDisplayed!=oSelf.maxResultsDisplayed){oSelf._initList();}
var nItems=Math.min(aResults.length,oSelf.maxResultsDisplayed);oSelf._nDisplayedItems+=nItems;if(nItems>0){oSelf._initContainerHelpers();oSelf.toggleSubHeader(true,iIndex);var aItems=oSelf._aListItems[iIndex];for(var i=nItems-1;i>=0;i--){var oItemi=aItems[i];var oResultItemi=aResults[i];
oItemi.innerHTML=oSelf.formatResult(oResultItemi,sCurQuery,iIndex);
oItemi.style.display="list-item";
oItemi._sResultKey=oResultItemi[0];
oItemi._oResultData=oResultItemi;}
for(var j=aItems.length-1;j>=nItems;j--){var oItemj=aItems[j];oItemj.innerHTML=null;
oItemj.style.display="none";
oItemj._sResultKey=null;
oItemj._oResultData=null;}
if(oSelf.autoHighlight){var oFirstItem=aItems[0];oSelf._toggleHighlight(oFirstItem,"to");oSelf.itemArrowToEvent.fire(oSelf,oFirstItem);oSelf._typeAhead(oFirstItem,sQuery);}
else{this._toggleHighlight();
oSelf._oCurItem=null;}
if(!this._bContainerOpen)
{var ok=oSelf.doBeforeExpandContainer(oSelf._oTextbox,oSelf._oContainer,sQuery,aResults);oSelf._toggleContainer(ok);}}
else if(nItems==0)
{oSelf.toggleSubHeader(false,iIndex);
oSelf._initSubList(iIndex);}
if(oSelf._nDisplayedItems==0){oSelf._toggleContainer(false);}
oSelf.dataReturnEvent.fire(oSelf,sQuery,aResults,iIndex);};YAHOO.widget.MultiAutoComplete.prototype._clearSelection=function(){var sValue=this._oTextbox.value;var sChar=(this.delimChar)?this.delimChar[0]:null;var nIndex=(sChar)?sValue.lastIndexOf(sChar,sValue.length-2):-1;
if(nIndex>-1){this._oTextbox.value=sValue.substring(0,nIndex);}
else{this._oTextbox.value="";}
this._sSavedQuery=this._oTextbox.value;this.selectionEnforceEvent.fire(this);};
YAHOO.widget.MultiAutoComplete.prototype._textMatchesOption=function(){var foundMatch=false;for(var j=0;j<this._aListItems.length;j++)
{for(var i=this._nDisplayedItems-1;i>=0;i--){var oItem=this._aListItems[j][i];if(oItem==null||oItem._sResultKey==null) {
  continue;
}var sMatch=oItem._sResultKey.toLowerCase();if(sMatch==this._sCurQuery.toLowerCase()){foundMatch=true;break;}}}
return(foundMatch);};
YAHOO.widget.MultiAutoComplete.prototype._typeAhead=function(oItem,sQuery){if(!this.typeAhead||(this._nKeyCode==8)){return;}
var oTextbox=this._oTextbox;
var sValue=this._oTextbox.value;if(!oTextbox.setSelectionRange&&!oTextbox.createTextRange){return;}
var nStart=sValue.length;this._updateValue(oItem);var nEnd=oTextbox.value.length;this._selectText(oTextbox,nStart,nEnd);var sPrefill=oTextbox.value.substr(nStart,nEnd);this.typeAheadEvent.fire(this,sQuery,sPrefill);};
YAHOO.widget.MultiAutoComplete.prototype._selectText=function(oTextbox,nStart,nEnd){if(oTextbox.setSelectionRange){oTextbox.setSelectionRange(nStart,nEnd);}
else if(oTextbox.createTextRange){var oTextRange=oTextbox.createTextRange();oTextRange.moveStart("character",nStart);oTextRange.moveEnd("character",nEnd-oTextbox.value.length);oTextRange.select();}
else{oTextbox.select();}};
YAHOO.widget.MultiAutoComplete.prototype._toggleContainerHelpers=function(bShow){var bFireEvent=false;var width=this._oContainer._oContent.offsetWidth+"px";var height=this._oContainer._oContent.offsetHeight+"px";if(this.useIFrame&&this._oContainer._oIFrame){bFireEvent=true;if(bShow){this._oContainer._oIFrame.style.width=width;this._oContainer._oIFrame.style.height=height;}
else{this._oContainer._oIFrame.style.width=0;this._oContainer._oIFrame.style.height=0;}}
if(this.useShadow&&this._oContainer._oShadow){bFireEvent=true;if(bShow){this._oContainer._oShadow.style.width=width;this._oContainer._oShadow.style.height=height;}
else{this._oContainer._oShadow.style.width=0;this._oContainer._oShadow.style.height=0;}}};
YAHOO.widget.MultiAutoComplete.prototype._toggleContainer=function(bShow){var oContainer=this._oContainer;if(this.alwaysShowContainer&&this._bContainerOpen){return;}
if(!bShow){this._oContainer._oContent.scrollTop=0;for(var i=0;i<this._aListItems.length;i++)
{var aItems=this._aListItems[i];if(aItems&&(aItems.length>0)){for(var j=aItems.length-1;j>=0;j--){aItems[j].style.display="none";}}
if(this._oCurItem){this._toggleHighlight(this._oCurItem,"from");}
this._oCurItem=null;this._nDisplayedItems=0;this._sCurQuery=null;}}
if(!bShow&&!this._bContainerOpen){oContainer._oContent.style.display="none";return;}
var oAnim=this._oAnim;if(oAnim&&oAnim.getEl()&&(this.animHoriz||this.animVert)){if(!bShow){this._toggleContainerHelpers(bShow);}
if(oAnim.isAnimated()){oAnim.stop();}
var oClone=oContainer._oContent.cloneNode(true);oContainer.appendChild(oClone);oClone.style.top="-9000px";oClone.style.display="block";var wExp=oClone.offsetWidth;var hExp=oClone.offsetHeight;var wColl=(this.animHoriz)?0:wExp;var hColl=(this.animVert)?0:hExp;oAnim.attributes=(bShow)?{width:{to:wExp},height:{to:hExp}}:{width:{to:wColl},height:{to:hColl}};if(bShow&&!this._bContainerOpen){oContainer._oContent.style.width=wColl+"px";oContainer._oContent.style.height=hColl+"px";}
else{oContainer._oContent.style.width=wExp+"px";oContainer._oContent.style.height=hExp+"px";}
oContainer.removeChild(oClone);oClone=null;var oSelf=this;var onAnimComplete=function(){oAnim.onComplete.unsubscribeAll();if(bShow){oSelf.containerExpandEvent.fire(oSelf);}
else{oContainer._oContent.style.display="none";oSelf.containerCollapseEvent.fire(oSelf);}
oSelf._toggleContainerHelpers(bShow);};oContainer._oContent.style.display="block";oAnim.onComplete.subscribe(onAnimComplete);oAnim.animate();this._bContainerOpen=bShow;}
else{if(bShow){oContainer._oContent.style.display="block";this.containerExpandEvent.fire(this);}
else{oContainer._oContent.style.display="none";this.containerCollapseEvent.fire(this);}
this._toggleContainerHelpers(bShow);this._bContainerOpen=bShow;}};YAHOO.widget.MultiAutoComplete.prototype._toggleHighlight=function(oNewItem,sType){var sHighlight=this.highlightClassName;if(this._oCurItem){YAHOO.util.Dom.removeClass(this._oCurItem,sHighlight);}
if((sType=="to")&&sHighlight){YAHOO.util.Dom.addClass(oNewItem,sHighlight);this._oCurItem=oNewItem;}};YAHOO.widget.MultiAutoComplete.prototype._togglePrehighlight=function(oNewItem,sType){if(oNewItem==this._oCurItem){return;}
var sPrehighlight=this.prehighlightClassName;if((sType=="mouseover")&&sPrehighlight){YAHOO.util.Dom.addClass(oNewItem,sPrehighlight);}
else{YAHOO.util.Dom.removeClass(oNewItem,sPrehighlight);}};YAHOO.widget.MultiAutoComplete.prototype._updateValue=function(oItem){var oTextbox=this._oTextbox;var sDelimChar=(this.delimChar)?(this.delimChar[0]||this.delimChar):null;var sSavedQuery=this._sSavedQuery;var sResultKey=oItem._sResultKey;oTextbox.focus();oTextbox.value="";if(sDelimChar){if(sSavedQuery){oTextbox.value=sSavedQuery;}
oTextbox.value+=sResultKey+sDelimChar;if(sDelimChar!=" "){oTextbox.value+=" ";}}
else{oTextbox.value=sResultKey;}
if(oTextbox.type=="textarea"){oTextbox.scrollTop=oTextbox.scrollHeight;}
var end=oTextbox.value.length;this._selectText(oTextbox,end,end);this._oCurItem=oItem;};YAHOO.widget.MultiAutoComplete.prototype._selectItem=function(oItem){this._bItemSelected=true;this._updateValue(oItem);this._cancelIntervalDetection(this);this.itemSelectEvent.fire(this,oItem,oItem._oResultData);this._toggleContainer(false);};YAHOO.widget.MultiAutoComplete.prototype._jumpSelection=function(){if(!this.typeAhead){return;}
else{this._toggleContainer(false);}};YAHOO.widget.MultiAutoComplete.prototype._moveSelection=function(nKeyCode){if(this._bContainerOpen){var oCurItem=this._oCurItem;var nCurItemIndex=-1;if(oCurItem){if(oCurItem._nDataSourceIndex==0){nCurItemIndex=oCurItem._nItemIndex;}
else{var step=this.maxResultsDisplayed;for(var i=this._aListItems[oCurItem._nDataSourceIndex-1].length-1;i>=0;i--)
{if(this._aListItems[oCurItem._nDataSourceIndex-1][i]._oResultData!=null) {
  break;
}step--;}
nCurItemIndex=oCurItem._nItemIndex+step;}}
var nNewItemIndex=(nKeyCode==40)?(nCurItemIndex+1):(nCurItemIndex-1);if(nNewItemIndex<-2||nNewItemIndex>=this._nDisplayedItems){return;}
if(oCurItem){this._toggleHighlight(oCurItem,"from");this.itemArrowFromEvent.fire(this,oCurItem);}
if(nNewItemIndex==-1){if(this.delimChar&&this._sSavedQuery){if(!this._textMatchesOption()){this._oTextbox.value=this._sSavedQuery;}
else{this._oTextbox.value=this._sSavedQuery+this._sCurQuery;}}
else{this._oTextbox.value=this._sCurQuery;}
this._oCurItem=null;return;}
if(nNewItemIndex==-2){this._toggleContainer(false);return;}
var merged=new Array();for(var i=0;i<this._aListItems.length;i++)
{for(var j=0;j<this._aListItems[i].length;j++)
{if(this._aListItems[i][j]._oResultData==null) {
  break;
}merged.push(this._aListItems[i][j]);}}
var oNewItem=merged[nNewItemIndex];var oContent=this._oContainer._oContent;var scrollOn=((YAHOO.util.Dom.getStyle(oContent,"overflow")=="auto")||(YAHOO.util.Dom.getStyle(oContent,"overflowY")=="auto"));if(scrollOn&&(nNewItemIndex>-1)&&(nNewItemIndex<this._nDisplayedItems)){if(nKeyCode==40){if((oNewItem.offsetTop+oNewItem.offsetHeight)>(oContent.scrollTop+oContent.offsetHeight)){oContent.scrollTop=(oNewItem.offsetTop+oNewItem.offsetHeight)-oContent.offsetHeight;}
else if((oNewItem.offsetTop+oNewItem.offsetHeight)<oContent.scrollTop){oContent.scrollTop=oNewItem.offsetTop;}}
else{if(oNewItem.offsetTop<oContent.scrollTop){this._oContainer._oContent.scrollTop=oNewItem.offsetTop;}
else if(oNewItem.offsetTop>(oContent.scrollTop+oContent.offsetHeight)){this._oContainer._oContent.scrollTop=(oNewItem.offsetTop+oNewItem.offsetHeight)-oContent.offsetHeight;}}}
this._toggleHighlight(oNewItem,"to");this.itemArrowToEvent.fire(this,oNewItem);if(this.typeAhead){this._updateValue(oNewItem);}}};YAHOO.widget.MultiAutoComplete.prototype._onItemMouseover=function(v,oSelf){if(oSelf.prehighlightClassName){oSelf._togglePrehighlight(this,"mouseover");}
else{oSelf._toggleHighlight(this,"to");}
oSelf.itemMouseOverEvent.fire(oSelf,this);};YAHOO.widget.MultiAutoComplete.prototype._onItemMouseout=function(v,oSelf){if(oSelf.prehighlightClassName){oSelf._togglePrehighlight(this,"mouseout");}
else{oSelf._toggleHighlight(this,"from");}
oSelf.itemMouseOutEvent.fire(oSelf,this);};YAHOO.widget.MultiAutoComplete.prototype._onItemMouseclick=function(v,oSelf){oSelf._toggleHighlight(this,"to");oSelf._selectItem(this);};YAHOO.widget.MultiAutoComplete.prototype._onContainerMouseover=function(v,oSelf){oSelf._bOverContainer=true;};YAHOO.widget.MultiAutoComplete.prototype._onContainerMouseout=function(v,oSelf){oSelf._bOverContainer=false;if(oSelf._oCurItem){oSelf._toggleHighlight(oSelf._oCurItem,"to");}};YAHOO.widget.MultiAutoComplete.prototype._onContainerScroll=function(v,oSelf){oSelf._oTextbox.focus();};YAHOO.widget.MultiAutoComplete.prototype._onContainerResize=function(v,oSelf){oSelf._toggleContainerHelpers(oSelf._bContainerOpen);};YAHOO.widget.MultiAutoComplete.prototype._onTextboxKeyDown=function(v,oSelf){var nKeyCode=v.keyCode;switch(nKeyCode){case 9:if(oSelf.delimChar&&(oSelf._nKeyCode!=nKeyCode)){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
if(oSelf._oCurItem){oSelf._selectItem(oSelf._oCurItem);}
else{oSelf._toggleContainer(false);}
break;case 13:if(oSelf._nKeyCode!=nKeyCode){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
if(oSelf._oCurItem){oSelf._selectItem(oSelf._oCurItem);}
else{oSelf._toggleContainer(false);}
break;case 27:oSelf._toggleContainer(false);return;case 39:oSelf._jumpSelection();break;case 38:YAHOO.util.Event.stopEvent(v);oSelf._moveSelection(nKeyCode);break;case 40:YAHOO.util.Event.stopEvent(v);oSelf._moveSelection(nKeyCode);break;default:break;}};YAHOO.widget.MultiAutoComplete.prototype._onTextboxKeyPress=function(v,oSelf){var nKeyCode=v.keyCode;var isMac=(navigator.userAgent.toLowerCase().indexOf("mac")!=-1);if(isMac){switch(nKeyCode){case 9:if(oSelf.delimChar&&(oSelf._nKeyCode!=nKeyCode)){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
break;case 13:if(oSelf._nKeyCode!=nKeyCode){if(oSelf._bContainerOpen){YAHOO.util.Event.stopEvent(v);}}
break;case 38:case 40:YAHOO.util.Event.stopEvent(v);break;default:break;}}
else if(nKeyCode==229){oSelf._queryInterval=setInterval(function(){oSelf._onIMEDetected(oSelf);},500);}};YAHOO.widget.MultiAutoComplete.prototype._onTextboxKeyUp=function(v,oSelf){oSelf._initProps();var nKeyCode=v.keyCode;oSelf._nKeyCode=nKeyCode;var sText=this.value;if(oSelf._isIgnoreKey(nKeyCode)||(sText.toLowerCase()==oSelf._sCurQuery)){return;}
else{oSelf.textboxKeyEvent.fire(oSelf,nKeyCode);}
if(oSelf.queryDelay>0){var nDelayID=setTimeout(function(){oSelf._sendQuery(sText);},(oSelf.queryDelay*1000));if(oSelf._nDelayID!=-1){clearTimeout(oSelf._nDelayID);}
oSelf._nDelayID=nDelayID;}
else{oSelf._sendQuery(sText);}};YAHOO.widget.MultiAutoComplete.prototype._onTextboxFocus=function(v,oSelf){oSelf._oTextbox.setAttribute("autocomplete","off");oSelf._bFocused=true;oSelf.textboxFocusEvent.fire(oSelf);};YAHOO.widget.MultiAutoComplete.prototype._onTextboxBlur=function(v,oSelf){if(!oSelf._bOverContainer||(oSelf._nKeyCode==9)){if(!oSelf._bItemSelected){if(!oSelf._bContainerOpen||(oSelf._bContainerOpen&&!oSelf._textMatchesOption())){if(oSelf.forceSelection){oSelf._clearSelection();}
else{oSelf.unmatchedItemSelectEvent.fire(oSelf,oSelf._sCurQuery);}}}
if(oSelf._bContainerOpen){oSelf._toggleContainer(false);}
oSelf._cancelIntervalDetection(oSelf);oSelf._bFocused=false;oSelf.textboxBlurEvent.fire(oSelf);}};YAHOO.widget.MultiAutoComplete.prototype._onFormSubmit=function(v,oSelf){if(oSelf.allowBrowserAutocomplete){oSelf._oTextbox.setAttribute("autocomplete","on");}
else{oSelf._oTextbox.setAttribute("autocomplete","off");}};YAHOO.widget.DataSource=function(){};YAHOO.widget.DataSource.ERROR_DATANULL="Response data was null";YAHOO.widget.DataSource.ERROR_DATAPARSE="Response data could not be parsed";YAHOO.widget.DataSource.prototype.maxCacheEntries=15;YAHOO.widget.DataSource.prototype.queryMatchContains=false;YAHOO.widget.DataSource.prototype.queryMatchSubset=false;YAHOO.widget.DataSource.prototype.queryMatchCase=false;YAHOO.widget.DataSource.prototype.index=-1;YAHOO.widget.DataSource.prototype.toString=function(){return"DataSource "+this._sName;};YAHOO.widget.DataSource.prototype.getResults=function(oCallbackFn,sQuery,oParent){var aResults=this._doQueryCache(oCallbackFn,sQuery,oParent);if(aResults.length===0){this.queryEvent.fire(this,oParent,sQuery);this.doQuery(oCallbackFn,sQuery,oParent);}};YAHOO.widget.DataSource.prototype.doQuery=function(oCallbackFn,sQuery,oParent){};YAHOO.widget.DataSource.prototype.flushCache=function(){if(this._aCache){this._aCache=[];}
if(this._aCacheHelper){this._aCacheHelper=[];}
this.cacheFlushEvent.fire(this);};YAHOO.widget.DataSource.prototype.queryEvent=null;YAHOO.widget.DataSource.prototype.cacheQueryEvent=null;YAHOO.widget.DataSource.prototype.getResultsEvent=null;YAHOO.widget.DataSource.prototype.getCachedResultsEvent=null;YAHOO.widget.DataSource.prototype.dataErrorEvent=null;YAHOO.widget.DataSource.prototype.cacheFlushEvent=null;YAHOO.widget.DataSource._nIndex=0;YAHOO.widget.DataSource.prototype._sName=null;YAHOO.widget.DataSource.prototype._aCache=null;YAHOO.widget.DataSource.prototype._init=function(){var maxCacheEntries=this.maxCacheEntries;if(isNaN(maxCacheEntries)||(maxCacheEntries<0)){maxCacheEntries=0;}
if(maxCacheEntries>0&&!this._aCache){this._aCache=[];}
this._sName="instance"+YAHOO.widget.DataSource._nIndex;YAHOO.widget.DataSource._nIndex++;this.queryEvent=new YAHOO.util.CustomEvent("query",this);this.cacheQueryEvent=new YAHOO.util.CustomEvent("cacheQuery",this);this.getResultsEvent=new YAHOO.util.CustomEvent("getResults",this);this.getCachedResultsEvent=new YAHOO.util.CustomEvent("getCachedResults",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError"+this.index,this);this.cacheFlushEvent=new YAHOO.util.CustomEvent("cacheFlush",this);};YAHOO.widget.DataSource.prototype._addCacheElem=function(oResult){var aCache=this._aCache;if(!aCache||!oResult||!oResult.query||!oResult.results){return;}
if(aCache.length>=this.maxCacheEntries){aCache.shift();}
aCache.push(oResult);};YAHOO.widget.DataSource.prototype._doQueryCache=function(oCallbackFn,sQuery,oParent){var aResults=[];var bMatchFound=false;var aCache=this._aCache;var nCacheLength=(aCache)?aCache.length:0;var bMatchContains=this.queryMatchContains;if((this.maxCacheEntries>0)&&aCache&&(nCacheLength>0)){this.cacheQueryEvent.fire(this,oParent,sQuery);if(!this.queryMatchCase){var sOrigQuery=sQuery;sQuery=sQuery.toLowerCase();}
for(var i=nCacheLength-1;i>=0;i--){var resultObj=aCache[i];var aAllResultItems=resultObj.results;var matchKey=(!this.queryMatchCase)?encodeURIComponent(resultObj.query).toLowerCase():encodeURIComponent(resultObj.query);if(matchKey==sQuery){bMatchFound=true;aResults=aAllResultItems;if(i!=nCacheLength-1){aCache.splice(i,1);this._addCacheElem(resultObj);}
break;}
else if(this.queryMatchSubset){for(var j=sQuery.length-1;j>=0;j--){var subQuery=sQuery.substr(0,j);if(matchKey==subQuery){bMatchFound=true;for(var k=aAllResultItems.length-1;k>=0;k--){var aRecord=aAllResultItems[k];var sKeyIndex=(this.queryMatchCase)?encodeURIComponent(aRecord[0]).indexOf(sQuery):encodeURIComponent(aRecord[0]).toLowerCase().indexOf(sQuery);if((!bMatchContains&&(sKeyIndex===0))||(bMatchContains&&(sKeyIndex>-1))){aResults.unshift(aRecord);}}
resultObj={};resultObj.query=sQuery;resultObj.results=aResults;this._addCacheElem(resultObj);break;}}
if(bMatchFound){break;}}}
if(bMatchFound){this.getCachedResultsEvent.fire(this,oParent,sOrigQuery,aResults);oCallbackFn(sOrigQuery,aResults,oParent,this.index);}}
return aResults;};YAHOO.widget.DS_XHR=function(sScriptURI,aSchema,oConfigs){if(typeof oConfigs=="object"){for(var sConfig in oConfigs){this[sConfig]=oConfigs[sConfig];}}
if(!aSchema||(aSchema.constructor!=Array)){return;}
else{this.schema=aSchema;}
this.scriptURI=sScriptURI;this._init();};YAHOO.widget.DS_XHR.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_XHR.TYPE_JSON=0;YAHOO.widget.DS_XHR.TYPE_XML=1;YAHOO.widget.DS_XHR.TYPE_FLAT=2;YAHOO.widget.DS_XHR.ERROR_DATAXHR="XHR response failed";YAHOO.widget.DS_XHR.prototype.connMgr=YAHOO.util.Connect;YAHOO.widget.DS_XHR.prototype.connTimeout=0;YAHOO.widget.DS_XHR.prototype.scriptURI=null;YAHOO.widget.DS_XHR.prototype.scriptQueryParam="query";YAHOO.widget.DS_XHR.prototype.scriptQueryAppend="";YAHOO.widget.DS_XHR.prototype.responseType=YAHOO.widget.DS_XHR.TYPE_JSON;YAHOO.widget.DS_XHR.prototype.responseStripAfter="\n<!-";YAHOO.widget.DS_XHR.prototype.doQuery=function(oCallbackFn,sQuery,oParent){var isXML=(this.responseType==YAHOO.widget.DS_XHR.TYPE_XML);var sUri=this.scriptURI+"?"+this.scriptQueryParam+"="+sQuery;if(this.scriptQueryAppend.length>0){sUri+="&"+this.scriptQueryAppend;}
var oResponse=null;var oSelf=this;var responseSuccess=function(oResp){if(!oSelf._oConn||(oResp.tId!=oSelf._oConn.tId)){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATANULL);return;}
for(var foo in oResp){}
if(!isXML){oResp=oResp.responseText;}
else{oResp=oResp.responseXML;}
if(oResp===null){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATANULL);return;}
var aResults=oSelf.parseResponse(sQuery,oResp,oParent);var resultObj={};resultObj.query=decodeURIComponent(sQuery);resultObj.results=aResults;if(aResults===null){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATAPARSE);aResults=[];}
else{oSelf.getResultsEvent.fire(oSelf,oParent,sQuery,aResults);oSelf._addCacheElem(resultObj);}
oCallbackFn(sQuery,aResults,oParent,this.argument[0]);};var responseFailure=function(oResp){oSelf.dataErrorEvent.fire(oSelf,oParent,sQuery,YAHOO.widget.DS_XHR.ERROR_DATAXHR);return;};var oCallback={success:responseSuccess,failure:responseFailure,argument:[this.index]};if(!isNaN(this.connTimeout)&&this.connTimeout>0){oCallback.timeout=this.connTimeout;}
if(this._oConn){this.connMgr.abort(this._oConn);}
oSelf._oConn=this.connMgr.asyncRequest("GET",sUri,oCallback,null);};YAHOO.widget.DS_XHR.prototype.parseResponse=function(sQuery,oResponse,oParent){var aSchema=this.schema;var aResults=[];var bError=false;var nEnd=((this.responseStripAfter!=="")&&(oResponse.indexOf))?oResponse.indexOf(this.responseStripAfter):-1;if(nEnd!=-1){oResponse=oResponse.substring(0,nEnd);}
switch(this.responseType){
  case YAHOO.widget.DS_XHR.TYPE_JSON:var jsonList;
  if(window.JSON&&(navigator.userAgent.toLowerCase().indexOf('khtml')==-1)){
    oResponse = oResponse.replace(/\\'/g,"'");
    var jsonObjParsed=JSON.parse(oResponse);
    if(!jsonObjParsed){bError=true;break;}
    else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}
    catch(e){bError=true;break;}
    }
  }else{try{while(oResponse.substring(0,1)==" "){oResponse=oResponse.substring(1,oResponse.length);}

if(oResponse.indexOf("{")<0){bError=true;break;}
if(oResponse.indexOf("{}")===0){break;}
var jsonObjRaw=eval("("+oResponse+")");if(!jsonObjRaw){bError=true;break;}
jsonList=eval("(jsonObjRaw."+aSchema[0]+")");}
catch(e){bError=true;break;}}
if(!jsonList){bError=true;break;}
if(jsonList.constructor!=Array){jsonList=[jsonList];}
for(var i=jsonList.length-1;i>=0;i--){var aResultItem=[];var jsonResult=jsonList[i];for(var j=aSchema.length-1;j>=1;j--){var dataFieldValue=jsonResult[aSchema[j]];if(!dataFieldValue){dataFieldValue="";}
aResultItem.unshift(dataFieldValue);}
if(aResultItem.length==1){aResultItem.push(jsonResult);}
aResults.unshift(aResultItem);}
break;case YAHOO.widget.DS_XHR.TYPE_XML:var xmlList=oResponse.getElementsByTagName(aSchema[0]);if(!xmlList){bError=true;break;}
for(var k=xmlList.length-1;k>=0;k--){var result=xmlList.item(k);var aFieldSet=[];for(var m=aSchema.length-1;m>=1;m--){var sValue=null;var xmlAttr=result.attributes.getNamedItem(aSchema[m]);if(xmlAttr){sValue=xmlAttr.value;}
else{var xmlNode=result.getElementsByTagName(aSchema[m]);if(xmlNode&&xmlNode.item(0)&&xmlNode.item(0).firstChild){sValue=xmlNode.item(0).firstChild.nodeValue;}
else{sValue="";}}
aFieldSet.unshift(sValue);}
aResults.unshift(aFieldSet);}
break;case YAHOO.widget.DS_XHR.TYPE_FLAT:if(oResponse.length>0){var newLength=oResponse.length-aSchema[0].length;if(oResponse.substr(newLength)==aSchema[0]){oResponse=oResponse.substr(0,newLength);}
var aRecords=oResponse.split(aSchema[0]);for(var n=aRecords.length-1;n>=0;n--){aResults[n]=aRecords[n].split(aSchema[1]);}}
break;default:break;}
sQuery=null;oResponse=null;oParent=null;if(bError){return null;}
else{return aResults;}};YAHOO.widget.DS_XHR.prototype._oConn=null;YAHOO.widget.DS_JSFunction=function(oFunction,oConfigs){if(typeof oConfigs=="object"){for(var sConfig in oConfigs){this[sConfig]=oConfigs[sConfig];}}
if(!oFunction||(oFunction.constructor!=Function)){return;}
else{this.dataFunction=oFunction;this._init();}};YAHOO.widget.DS_JSFunction.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSFunction.prototype.dataFunction=null;YAHOO.widget.DS_JSFunction.prototype.doQuery=function(oCallbackFn,sQuery,oParent){var oFunction=this.dataFunction;var aResults=[];aResults=oFunction(sQuery);if(aResults===null){this.dataErrorEvent.fire(this,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATANULL);return;}
var resultObj={};resultObj.query=decodeURIComponent(sQuery);resultObj.results=aResults;this._addCacheElem(resultObj);this.getResultsEvent.fire(this,oParent,sQuery,aResults);oCallbackFn(sQuery,aResults,oParent,this.index);return;};YAHOO.widget.DS_JSArray=function(aData,oConfigs){if(typeof oConfigs=="object"){for(var sConfig in oConfigs){this[sConfig]=oConfigs[sConfig];}}
if(!aData||(aData.constructor!=Array)){return;}
else{this.data=aData;this._init();}};YAHOO.widget.DS_JSArray.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSArray.prototype.data=null;YAHOO.widget.DS_JSArray.prototype.doQuery=function(oCallbackFn,sQuery,oParent){var aData=this.data;var aResults=[];var bMatchFound=false;var bMatchContains=this.queryMatchContains;if(sQuery){if(!this.queryMatchCase){sQuery=sQuery.toLowerCase();}
for(var i=aData.length-1;i>=0;i--){var aDataset=[];if(aData[i]){if(aData[i].constructor==String){aDataset[0]=aData[i];}
else if(aData[i].constructor==Array){aDataset=aData[i];}}
if(aDataset[0]&&(aDataset[0].constructor==String)){var sKeyIndex=(this.queryMatchCase)?encodeURIComponent(aDataset[0]).indexOf(sQuery):encodeURIComponent(aDataset[0]).toLowerCase().indexOf(sQuery);if((!bMatchContains&&(sKeyIndex===0))||(bMatchContains&&(sKeyIndex>-1))){aResults.unshift(aDataset);}}}}
this.getResultsEvent.fire(this,oParent,sQuery,aResults);oCallbackFn(sQuery,aResults,oParent,this.index);};
dojo.provide("gravity.beacon");
dojo.require("dj.util.User");
dojo.require("dj.util.Cookie");

gravity.beacon = {
	init: function() {

		dj.util.User.getUserId(function(_u){
			var _cookieVal = '';
			if(_u !== ""){ 
				_cookieVal = _u;
			}else{
				var _anonymous = dj.util.Cookie.getCookie("djcs_route");
				if(_anonymous !== null){
					_cookieVal = _anonymous;
				}
			}
		
			if(dj.util.Cookie.getCookie("grvinsights") === null){
				if(_cookieVal !== ''){
					dj.util.Cookie.setCookie("grvinsights", _cookieVal);
					console.log("GARVITY COOKIE SET - "+_cookieVal);
				}
			}
		
			/* Gravity provided JS - Start */
			
			if(_u !== ""){ 
				var gravityInsightsParams = {type:'content', site_guid:'18f3b45caef80572d421f68a979bd6dc', user_id: _u};
			}else{
				var gravityInsightsParams = {type:'content', site_guid:'18f3b45caef80572d421f68a979bd6dc'};
			}
		
			var GravityInsights=function(b){
		
				function h(a,d){var c,f=d||"beacon";c=document.getElementsByTagName("title")[0]===void 0?"":encodeURIComponent(document.getElementsByTagName("title")[0].innerHTML);var g=new Date,g=g.getMilliseconds()+"-"+g.getSeconds();c=["cbust="+g,"site_guid="+b.site_guid,"action="+f,"user_guid="+a,"referrer="+e(document.referrer),"browser_useragent="+e(navigator.userAgent),"OS="+e(j()),"href="+e(location.href),"url="+k(),b.thread_id!==void 0?"thread_id="+b.thread_id:"",b.post_id!== void 0?"post_id="+b.post_id:"",b.forum_id!==void 0?"forum_id="+b.forum_id:"",b.user_id!==void 0?"user_id="+b.user_id:"",b.username!==void 0?"user_name="+e(b.username):"",b.post_title!==void 0?"post_title="+e(b.post_title):"",b.thread_title!==void 0?"thread_title="+e(b.thread_title):"",b.forum_title!==void 0?"forum_title="+e(b.forum_title):"",c!==void 0?"article_title="+c:"",b.external_user_id!==void 0?"external_user_id="+b.external_user_id:"",b.article_id!==void 0?"article_id="+b.article_id:"",b.type!== void 0?"type="+b.type:"",b.board!==void 0?"board="+encodeURIComponent(b.board):""].join("&");f=document.createElement("script");f.src=i+"/log?"+c;f.type="text/javascript";c=document.getElementsByTagName("head")[0]||document.documentElement;c.insertBefore(f,c.firstChild)}
		
				function e(a){return window.encodeURIComponent?encodeURIComponent(a):escape(a)}
		
				function j(){var a="Unknown OS";navigator.appVersion.indexOf("Win")!==-1&&(a="Windows");navigator.appVersion.indexOf("Mac")!==-1&&(a="MacOS");navigator.appVersion.indexOf("X11")!== -1&&(a="UNIX");navigator.appVersion.indexOf("Linux")!==-1&&(a="Linux");return a}
		
				function k(){var a=document.getElementsByTagName("link"),b=a.length,c="";for(x=0;x<b;x++)if((c=a[x].getAttribute("rel"))&&c.indexOf("canonical")===0)return encodeURIComponent(a[x].getAttribute("href"));else if(x===b)break;return encodeURIComponent(location.href)}
		
				var i="http://rma-api.gravity.com/v1/beacons";
				(function(){var a;a=document.cookie;var d=a.indexOf("grvinsights");if(d===-1)a=" ";else{var c=a.indexOf(";",d);if(c=== -1)c=a.length;a=unescape(a.substring(d+11+1,c))}if(a===" "||a==="")d="?u="+b.user_id+"&sg="+b.site_guid,a=document.createElement("script"),a.src=i+"/initialize"+d,a.type="text/javascript",d=document.getElementsByTagName("head")[0]||document.documentElement,d.insertBefore(a,d.firstChild),a=!1;a!==void 0&&a&&h(a,"beacon")})();
		
				return{cc:function(a,b){if(a!==""){var c=new Date;c.setTime(c.getTime()+432E8);c="; expires="+c.toGMTString();document.cookie=a+"="+b+c+"; path=/";h(b,"beacon")}}}
		
			}(gravityInsightsParams);
			
			/* Gravity provided JS - End */
		
		});
	}
};
dojo.provide("dj.util.animation");
dj.util.animation={crossFadeInsert:function(a,b,c){var e=new dojo.Deferred,f=0,j,g,h,k;g=dojo.byId(b);b=dojo.delegate({height:500,fadeOut:800,fadeIn:1200},c);c=dojo.contentBox(g);dojo.style(g,{position:"relative",height:c.h+"px"});if(!dojo.isIE||dojo.isIE&&!dojo.isQuirks&&dojo.isIE>7)dojo.style(g,{minHeight:"inherit"});h=dojo.create("div",{innerHTML:g.innerHTML,style:{position:"absolute",top:dojo.style(g,"paddingTop")+"px",left:dojo.style(g,"paddingLeft")+"px"}});dojo.place(h,g,"only");k=dojo.create("div",
{style:{overflow:"hidden",opacity:0,height:0}},g);a=typeof a==="object"?dojo.place(a,k):dojo.create("div",{innerHTML:a},k);a=dojo.marginBox(a);j=function(){++f===3&&e.callback()};a=dojo.animateProperty({node:g,duration:b.height,properties:{height:{start:c.h,end:a.h}},onEnd:function(){dojo.style(k,{overflow:"visible"});j()}});c=dojo.fadeOut({node:h,duration:b.fadeIn,onEnd:function(){dojo.destroy(h);dojo.style(g,{position:""});dojo.attr(k,"style","");j()}});b=dojo.fadeIn({node:k,duration:b.fadeIn,onEnd:function(){j()}});
a.play();c.play();b.play();return e}};
dojo.provide("dj.util.Form");
dj.util.Form={submitOnEvent:function(a,b,c){c=c||"onclick";a=dojo.byId(a);var e=document[b];if(typeof a==="undefined"||a===null||typeof e==="undefined"||e===null)console.warn("{dj.util.Form} element and/or form not found");else return dojo.connect(a,c,function(f){dojo.stopEvent(f);e.submit()})},clearOrDefaultValue:function(a){a=dojo.byId(a);dojo.connect(a,"onfocus",this,function(b){b=b.srcElement||b.target;if(b.value===b.defaultValue)b.value=""});dojo.connect(a,"onblur",this,function(b){b=b.srcElement||
b.target;if(b.value==="")b.value=b.defaultValue})},clearValue:function(a,b){var c=[],e=dojo.byId(a);if(e===null)throw Error("{dj.util.Form} element not found");var f=dojo.trim(e.value);if(typeof b=="undefined")e.value=" ";else if(dojo.isArray(b))c=b;else c.push(b);for(var j=0,g=c.length;j<g;j++)if(c[j]==f)e.value=""},checkEmpty:function(a){a=dojo.byId(a);if(a===null)throw Error("{dj.util.Form} element not found");return dojo.trim(a.value)===""},validateEmailAddresses:function(a){return/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(a)},
hasValidContent:function(a,b){if(b!=="")return a.test(b);return false}};
dojo.provide("dj.util.PollingConditionChecker");dojo.declare("dj.util.PollingConditionChecker",[],{check:function(a,b,c,e){var f=new dojo.Deferred,j=0,g;g=function(){if(j>=c)f.errback(e);else if(a())f.callback();else{j++;setTimeout(g,b)}};setTimeout(g,b);return f}});
dojo.provide("dj.util.user.Environment");dojo.declare("dj.util.user.Environment",[],{constructor:function(a,b,c){this.region=a;this.product=b;this.subType=c},toString:function(){return this.region+"_"+this.product+"_"+this.subType}});
dojo.provide("dj.util.Config");dojo.require("dj.util.Observer");
dojo.declare("dj.util.Config",null,{constructor:function(a){this.setOwner(a);this.cfg={};this.obs={};this.hasFired={}},getOwner:function(){return this.owner},setOwner:function(a){this.owner=a},addProperty:function(a,b){a=a.toLowerCase();if(typeof b=="undefined")throw Error("Config {key: '_', value: '_'} must be set for key '"+a+"'.");else if(typeof b.value=="undefined")throw Error("Config value must be defined for key '"+a+"'.");else if(typeof b.handler=="undefined"){this.setProperty(a,b.value,true);
return}var c=new dj.util.Observer,e=this.getOwner();c.subscribe(b.handler,e);this.obs[a]=c;this.setProperty(a,b.value,true)},getProperty:function(a){a=a.toLowerCase();return this.cfg[a]},setProperty:function(a,b,c){a=a.toLowerCase();this.cfg[a]=b;var e=null;if(!c){e=this.obs[a];e.fire(b)}},applyConfig:function(a){for(var b in a)a.hasOwnProperty(b)&&this.setProperty(b,a[b],true)},fireQueue:function(a){a=typeof a=="undefined"?false:a;var b=null,c;for(c in this.cfg)if(this.cfg.hasOwnProperty(c)){var e=
this.cfg[c];if(!a&&this.hasFired[c])break;b=this.obs[c];if(typeof b=="undefined")break;b.fire(e);this.hasFired[c]=true}}});
dojo.provide("dj.util.user.EnvironmentDao");dojo.require("dj.util.user.Environment");
dojo.declare("dj.util.user.EnvironmentDao",[],{constructor:function(a,b){this.region=a;this.user=b},getEnvironment:function(){var a=new dojo.Deferred,b=new dj.util.user.Environment;b.region=this.getRegion();this.getProduct().then(dojo.hitch(this,function(c){b.product=c;return this.user.getSubscriptionType()})).then(dojo.hitch(this,function(c){b.subType=c;a.callback(b)}));return a},getRegion:function(){return(this.region.getViewByRegion().split(",")[0]||"NA").toUpperCase()},getProduct:function(){var a=
new dojo.Deferred;this.user.hasRole("WSJ-PRO",dojo.hitch(this,function(b){b?a.callback("PRO"):this.user.hasRole("WSJ-ENT",function(c){c?a.callback("PRO"):a.callback("WSJ")})}));return a}});
dojo.provide("dj.util.io.script");dojo.require("dj.util.string");dojo.require("dj.util.io");
dj.util.io.script={get:function(a){var b=new dojo.Deferred,c="dj.util.io.script._jsonp"+ ++this.__ctr+"._jsonpCallback";a=dojo.mixin({jsonp:"c",jsonpCallback:c,content:{},timeout:5E3},a);var e,f=false;dj.util.string.toFunction(a.jsonpCallback,function(j){f=true;b.callback(j)});a.content[a.jsonp]=a.jsonpCallback;c=dojo.objectToQuery(a.content);e=a.url+"?"+c;dj.util.io.insertScriptAsync(e);setTimeout(function(){f||b.errback("[io.script] url timed out: '"+e+"'")},a.timeout);return b},__ctr:0};
dojo.provide("dj.widget.fragmentloader.dao.FileServiceDao");
dojo.declare("dj.widget.fragmentloader.dao.FileServiceDao",[],{DEFAULT_CONFIG:{TTL:"24h"},constructor:function(a,b,c){this.script=a;this.coreContext=b;this.cfg=dojo.delegate(this.DEFAULT_CONFIG,c)},getFragment:function(a){if(!a||!a.id)throw Error("FileServiceDao: fragment must have an id");this._useDataId(a.id);var b=new dojo.Deferred,c;c=a.getAbsolutePaths();c=this.script.get({url:this._getFileServiceUrl(),content:{absolutePath:c,TTL:this.cfg.TTL},jsonp:"c",jsonpCallback:"dj.module._fileServiceDao."+
a.id,timeout:25E3});c.addCallback(this,function(d){var e,f,g;f=0;for(g=d.files.length;f<g;f++){e=d.files[f];if(e.statusCode!==200){b.errback(Error("FileServiceDao: unsuccessful status code: "+e.statusCode+" for url: "+e.absolutePath));return}}b.callback(this._populateFragmentWithFiles(a,d.files))});c.addErrback(function(d){b.errback(Error("FileServiceDao: service error: "+d))});return b},__dataIds:{},_useDataId:function(a){this.__dataIds[a]=true},_getFileServiceUrl:function(){return this.coreContext.customCacheCdnPrefix+
"/cdssvco/file/v2/Files"},_populateFragmentWithFiles:function(a,b){if(dojo.isArray(a.cssFiles))for(var c=0,d=a.cssFiles.length;c<d;c++){var e=a.cssFiles[c];e.data=this._getDataByPath(b,e.absolutePath)}if(a.jsFile)a.jsFile.data=this._getDataByPath(b,a.jsFile.absolutePath);if(a.htmlFile)a.htmlFile.data=this._getDataByPath(b,a.htmlFile.absolutePath);if(a.jsonFile)a.jsonFile.data=this._getDataByPath(b,a.jsonFile.absolutePath);return a},_getDataByPath:function(a,b){var c,d,e;c=0;for(d=a.length;c<d;c++){e=
a[c];if(e.absolutePath===b)return e.data}throw"FileServiceDao: path is not in the files";}});
dojo.provide("dj.widget.fragmentloader.File");dojo.declare("dj.widget.fragmentloader.File",[],{constructor:function(a,b){this.absolutePath=a;this.data=b}});
dojo.provide("dj.widget.fragmentloader.Fragment");dojo.declare("dj.widget.fragmentloader.Fragment",[],{constructor:function(a,b,c,d){this.id=a;this.cssFiles=b;this.jsFile=c;this.htmlFile=d},getAbsolutePaths:function(){var a=[],b,c;if(dojo.isArray(this.cssFiles)){b=0;for(c=this.cssFiles.length;b<c;b++)a.push(this.cssFiles[b].absolutePath)}this.jsFile&&a.push(this.jsFile.absolutePath);this.htmlFile&&a.push(this.htmlFile.absolutePath);return a}});
dojo.provide("dj.widget.fragmentloader.renderer.FileRenderer");dojo.require("dj.util.string");
dojo.declare("dj.widget.fragmentloader.renderer.FileRenderer",[],{constructor:function(a,b){this.animation=a;this.checker=b},renderCss:function(a){var b,c,d,e,f=dojo.query("head")[0];b=0;for(c=a.length;b<c;b++){e=a[b];d=dojo.create("style",{type:"text/css","data-absolutePath":e.absolutePath});cssStr=e.data;if(d.styleSheet)d.styleSheet.cssText=cssStr;else d.appendChild(document.createTextNode(cssStr));dojo.place(d,f,"last")}},renderHtml:function(a,b){var c=new this.checker.check(function(){return dojo.byId(b)},
25,40,"Retriever: exceded num of retries for HTML");return dojo.when(c,dojo.hitch(this.animation,"crossFadeInsert",a.data,b))},renderJs:function(a){var b=dojo.create("script",{type:"text/javascript"});if(dojo.isIE)b.text=a.data;else b.appendChild(document.createTextNode(a.data));a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)},renderInlineJs:function(a){dj.util.string.evalScripts(a.data,a.absolutePath)}});
dojo.provide("dj.widget.fragmentloader.bo.FragmentBo");dojo.require("dj.widget.fragmentloader.File");dojo.require("dj.widget.fragmentloader.Fragment");
dojo.declare("dj.widget.fragmentloader.bo.FragmentBo",[],{DEFAULT_CONFIG:{js:{providedUnits:"j_global_slim"},css:{},html:{}},constructor:function(a,b,c){this.dao=a;this.userEnv=b;this.cfg=dojo.delegate(this.DEFAULT_CONFIG,c)},getFragment:function(a,b){return dojo.when(this.userEnv,dojo.hitch(this,function(c){var d="fragment_"+c.toString()+"_"+a;d=new dj.widget.fragmentloader.Fragment(d);d.cssFiles=this.cfg.isLoadCss?this._getCssFiles(c,a,b):undefined;d.jsFile=this.cfg.isLoadJs?this._getJsFile(c,a,
b):undefined;d.htmlFile=this.cfg.isLoadHtml?this._getHtmlFile(c,a,b):undefined;return this.dao.getFragment(d)}))},_getCssFiles:function(a,b,c){var d=this._getCssFileList(dojo.isIE),e=Array(d.length);i=0;for(len=d.length;i<len;i++)e[i]=new dj.widget.fragmentloader.File("/djstyle/"+d[i]+"/"+a+"/"+b+"-"+c+".css");return e},_getJsFile:function(a,b,c){return new dj.widget.fragmentloader.File("/djscript/bucket/"+a+"/page/"+b+"/provided/"+this.cfg.js.providedUnits+"/version/"+c+".js")},_getHtmlFile:function(a,
b,c){var d=this._getHtmlChipStr();return new dj.widget.fragmentloader.File("/public/page/"+a+":"+b+"-"+d+c+".html")},_getHtmlChipStr:function(){return dojo.isArray(this.cfg.html.chips)?this.cfg.html.chips.join("-")+"-":""},_getCssFileList:function(a){var b=["2/std","3/std","4/std"];if(typeof a!=="undefined")if(a<7)b.push("1/ie6");else if(a==7)b.push("1/ie7");else if(a==8)b.push("1/ie8");else a==9&&b.push("1/ie9");return b}});
dojo.provide("dj.widget.fragmentloader.FragmentLoader");dojo.require("dj.util.PollingConditionChecker");dojo.require("dj.util.animation");dojo.require("dj.util.io.script");dojo.require("dj.widget.fragmentloader.renderer.FileRenderer");dojo.require("dj.widget.fragmentloader.bo.FragmentBo");dojo.require("dj.widget.fragmentloader.dao.FileServiceDao");
dojo.declare("dj.widget.fragmentloader.FragmentLoader",[],{DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,isLoadInlineJs:false,isDataCallback:false},constructor:function(a,b,c,d,e){this.userEnv=a;this.mstPageId=b;this.domNodeId=d;this.version=c;this.cfg=dojo.delegate(this.DEFAULT_CONFIG,e);this._initRenderers()},load:function(){return dojo.when(this.fragmentBo.getFragment(this.mstPageId,this.version),dojo.hitch(this,function(a){this.cfg.isDataCallback&&this.onDataCallback(a);if(this.cfg.isLoadCss){this.fileRenderer.renderCss(a.cssFiles);
this.onCssLoad()}if(this.cfg.isLoadHtml)this.fileRenderer.renderHtml(a.htmlFile,this.domNodeId).then(dojo.hitch(this,function(){this.onHtmlLoad();if(this.cfg.isLoadJs){this.fileRenderer.renderJs(a.jsFile);this.onJsLoad()}if(this.cfg.isLoadInlineJs){this.fileRenderer.renderInlineJs(a.htmlFile);this.onInlineJsLoad()}}));else if(this.cfg.isLoadJs){this.fileRenderer.renderJs(a.jsFile);this.onJsLoad()}}))},onCssLoad:function(){},onJsLoad:function(){},onHtmlLoad:function(){},onInlineJsLoad:function(){},
onDataCallback:function(){},_initRenderers:function(){var a=new dj.widget.fragmentloader.dao.FileServiceDao(dj.util.io.script,dj.context.core),b=new dj.util.PollingConditionChecker;this.fragmentBo=new dj.widget.fragmentloader.bo.FragmentBo(a,this.userEnv,this.cfg);this.fileRenderer=new dj.widget.fragmentloader.renderer.FileRenderer(dj.util.animation,b)}});

dojo.provide("dj.widget.Slider");dojo.declare("dj.widget.Slider",null,{constructor:function(handle,track,options){this._eventConnectHandles=[];var slider=this;if(dojo.isArray(handle)){this.handles=[];for(var count=0,max=handle.length;count<max;count++){this.handles.push(dojo.byId(handle[count]));}}else{this.handles=[dojo.byId(handle)];}
this.track=dojo.byId(track);this.options=options||{};this.axis=this.options.axis||'horizontal';this.increment=this.options.increment||1;this.step=parseInt(this.options.step||'1',10);this.range=this.options.range||{start:0,end:1};this.value=0;this.values=[];dojo.forEach(this.handles,dojo.hitch(this,function(){this.values.push(0);}));this.spans=this.options.spans?dojo.forEach(this.options.spans,function(s){return dojo.byId(s);}):false;this.options.startSpan=dojo.byId(this.options.startSpan||null);this.options.endSpan=dojo.byId(this.options.endSpan||null);this.restricted=this.options.restricted||false;this.maximum=this.options.maximum||this.range.end;this.minimum=this.options.minimum||this.range.start;this.alignX=parseInt(this.options.alignX||'0',10);this.alignY=parseInt(this.options.alignY||'0',10);this.trackLength=this.maximumOffset()-this.minimumOffset();this.handleLength=this.isVertical()?(this.handles[0].offsetHeight!==0?this.handles[0].offsetHeight:this.handles[0].style.height.replace(/px$/,"")):(this.handles[0].offsetWidth!==0?this.handles[0].offsetWidth:this.handles[0].style.width.replace(/px$/,""));this.active=false;this.dragging=false;this.disabled=false;if(this.options.disabled){this.setDisabled();}
this.allowedValues=this.options.values?this.options.values.sort():false;if(this.allowedValues){this.minimum=(this.allowedValues.length>0)?this.allowedValues[0]:0;this.maximum=(this.allowedValues.length>0)?this.allowedValues[this.allowedValues.length-1]:0;}
this.eventMouseDown=dojo.hitch(this,this.startDrag);this.eventMouseUp=dojo.hitch(this,this.endDrag);this.eventMouseMove=dojo.hitch(this,this.update);dojo.forEach(this.handles,function(h,i){i=slider.handles.length-1-i;slider.setValue(parseFloat((dojo.isArray(slider.options.sliderValue)?slider.options.sliderValue[i]:slider.options.sliderValue)||slider.range.start),i);if(h.style.position&&h.style.position==='static'){h.style.position='relative';if(dojo.isOpera){h.style.top=0;h.style.left=0;}}
slider._eventConnectHandles.push(dojo.connect(h,'onmousedown',slider.eventMouseDown));});this._eventConnectHandles.push(dojo.connect(this.track,'onmousedown',this.eventMouseDown));this._eventConnectHandles.push(dojo.connect(document,'onmouseup',this.eventMouseUp));this._eventConnectHandles.push(dojo.connect(document,'onmousemove',this.eventMouseMove));this.initialized=true;},dispose:function(){dojo.forEach(this._eventConnectHandles,dojo.disconnect);},setDisabled:function(){this.disabled=true;},setEnabled:function(){this.disabled=false;},getNearestValue:function(value){if(this.allowedValues){var max=(this.allowedValues.length>0)?this.allowedValues[this.allowedValues.length-1]:0;if(value>=max){return(max);}
var min=(this.allowedValues.length>0)?this.allowedValues[0]:0;if(value<=min){return(min);}
var offset=Math.abs(this.allowedValues[0]-value);var newValue=this.allowedValues[0];dojo.forEach(this.allowedValues,function(v){var currentOffset=Math.abs(v-value);if(currentOffset<=offset){newValue=v;offset=currentOffset;}});return newValue;}
if(value>this.range.end){return this.range.end;}
if(value<this.range.start){return this.range.start;}
return value;},setValue:function(sliderValue,handleIdx){if(!this.active){this.activeHandleIdx=handleIdx||0;this.activeHandle=this.handles[this.activeHandleIdx];this.updateStyles();}
handleIdx=handleIdx||this.activeHandleIdx||0;if(this.initialized&&this.restricted){if((handleIdx>0)&&(sliderValue<this.values[handleIdx-1])){sliderValue=this.values[handleIdx-1];}
if((handleIdx<(this.handles.length-1))&&(sliderValue>this.values[handleIdx+1])){sliderValue=this.values[handleIdx+1];}}
sliderValue=this.getNearestValue(sliderValue);this.values[handleIdx]=sliderValue;this.value=this.values[0];this.handles[handleIdx].style[this.isVertical()?'top':'left']=this.translateToPx(sliderValue);this.drawSpans();if(!this.dragging||!this.event){this.updateFinished();}},setValueBy:function(delta,handleIdx){this.setValue(this.values[handleIdx||this.activeHandleIdx||0]+delta,handleIdx||this.activeHandleIdx||0);},translateToPx:function(value){return Math.round(((this.trackLength-this.handleLength)/(this.range.end-this.range.start))*(value-this.range.start))+"px";},translateToValue:function(offset){return((offset/(this.trackLength-this.handleLength)*(this.range.end-this.range.start))+this.range.start);},getRange:function(range){var v=this.values.sort();range=range||0;return{start:v[range],end:v[range+1]};},minimumOffset:function(){return(this.isVertical()?this.alignY:this.alignX);},maximumOffset:function(){return(this.isVertical()?(this.track.offsetHeight!==0?this.track.offsetHeight:this.track.style.height.replace(/px$/,""))-this.alignY:(this.track.offsetWidth!==0?this.track.offsetWidth:this.track.style.width.replace(/px$/,""))-this.alignX);},isVertical:function(){return(this.axis=='vertical');},drawSpans:function(){var slider=this;if(this.spans){for(var count=0,max=this.spans.length-1;count<=max;count++){slider.setSpan(slider.spans[count],slider.getRange(count));}}
if(this.options.startSpan){this.setSpan(this.options.startSpan,{start:0,end:this.values.length>1?this.getRange(0).start:this.value});}
if(this.options.endSpan){this.setSpan(this.options.endSpan,{start:this.values.length>1?this.getRange(this.spans.length-1).end:this.value,end:this.maximum});}},setSpan:function(span,range){if(this.isVertical()){span.style.top=this.translateToPx(range.start);span.style.height=this.translateToPx(range.end-range.start+this.range.start);}else{span.style.left=this.translateToPx(range.start);span.style.width=this.translateToPx(range.end-range.start+this.range.start);}},updateStyles:function(){dojo.forEach(this.handles,function(h){dojo.removeClass(h,'selected');});dojo.addClass(this.activeHandle,'selected');},startDrag:function(event){if(dojo.mouseButtons.isLeft(event)){if(!this.disabled){this.active=true;var handle=event.target;var pointer=[event.clientX,event.clientY];var track=handle;if(track==this.track){var trackPosition=dojo.position(this.track);this.event=event;this.setValue(this.translateToValue((this.isVertical()?pointer[1]-trackPosition.y:pointer[0]-trackPosition.x)-(this.handleLength/2)));var handlePosition=dojo.position(this.activeHandle);this.offsetX=(pointer[0]-handlePosition.x);this.offsetY=(pointer[1]-handlePosition.y);}else{while((dojo.indexOf(this.handles,handle)==-1)&&handle.parentNode){handle=handle.parentNode;}
if(dojo.indexOf(this.handles,handle)!=-1){this.activeHandle=handle;this.activeHandleIdx=dojo.indexOf(this.handles,this.activeHandle);this.updateStyles();var activeHandlePosition=dojo.position(this.activeHandle);this.offsetX=(pointer[0]-activeHandlePosition.x);this.offsetY=(pointer[1]-activeHandlePosition.y);}}}
dojo.stopEvent(event);}},update:function(event){if(this.active){if(!this.dragging){this.dragging=true;}
this.draw(event);if(dojo.isWebKit){window.scrollBy(0,0);}
dojo.stopEvent(event);}},draw:function(event){var pointer=[event.clientX,event.clientY];var trackPosition=dojo.position(this.track);pointer[0]-=this.offsetX+trackPosition.x;pointer[1]-=this.offsetY+trackPosition.y;this.event=event;this.setValue(this.translateToValue(this.isVertical()?pointer[1]:pointer[0]));if(this.initialized&&this.options.onSlide){this.options.onSlide(this.values.length>1?this.values:this.value,this);}},endDrag:function(event){if(this.active&&this.dragging){this.finishDrag(event,true);dojo.stopEvent(event);}
this.active=false;this.dragging=false;},finishDrag:function(event,success){this.active=false;this.dragging=false;this.updateFinished();},updateFinished:function(){if(this.initialized&&this.options.onChange){this.options.onChange(this.values.length>1?this.values:this.value,this);}
this.event=null;}});
dojo.provide("dj.widget.panels.PanelDTO");dojo.declare("dj.widget.panels.PanelDTO",null,{constructor:function(id,position){this._id=null;this._position=null;if(typeof id!=="undefined"){this.setId(id);}
if(typeof position!=="undefined"){this.setPosition(position);}},getId:function(){return this._id;},setId:function(id){if(typeof id==="undefined"){throw new Error("ID must be defined.");}
this._id=id;},getPosition:function(){return this._position;},setPosition:function(position){if(typeof position!=="number"){throw new TypeError("Position must be a number.");}
this._position=position;}});dojo.provide("dj.widget.panels.controller.NavArrows");dojo.require("dj.lang");dojo.declare("dj.widget.panels.controller.NavArrows",null,{DEFAULT_CONFIG:{panelIncrement:1,doStopEvent:true,tabletSwipe:false,thresholdRatio:(1/2),swipeStartId:"imageSlide",hasLastSlideScrim:false},constructor:function(model,nav,cfg){this._cfg=dj.lang.cloneMixin(this.DEFAULT_CONFIG,cfg);this._model=model;this._nav=nav;this._procs=[];this.connectHandles=[];},setLastActive:function(){var mdl=this._model;if(mdl.isLocked()){this._enqueueProc(this.setNextActive);return;}
mdl.setActiveByPosition(mdl.getNumberOfPanels()-mdl.getViewArea()+1);},setFirstActive:function(){if(this._model.isLocked()){this._enqueueProc(this.setPreviousActive);return;}
this._model.setDirection(this._model.DIRECTION.PREVIOUS);this._model.setActiveByPosition(1);},setPreviousActive:function(){if(this._model.isLocked()){this._enqueueProc(this.setPreviousActive);return;}
this._model.setDirection(this._model.DIRECTION.PREVIOUS);this._model.setActiveByPosition(this._model.getActive().getPosition()-this._cfg.panelIncrement);},setNextActive:function(){var mdl=this._model;if(mdl.isLocked()){this._enqueueProc(this.setNextActive);return;}
var tryNextPosition=(this._model.getActive().getPosition()+this._cfg.panelIncrement);var nxt=mdl.getByPosition(tryNextPosition);if(mdl.getRotationType()==mdl.ROTATION_TYPE.LINEAR){var hasMore=(((mdl.getNumberOfPanels()-(mdl.getViewArea()||0))-mdl.getActive().getPosition())>=0);if(hasMore===false){mdl._activePanelObserver.fireByName("failure",tryNextPosition);if(this._cfg.hasLastSlideScrim){this.ignoreActions=true;}
return;}}
mdl.setDirection(mdl.DIRECTION.NEXT);mdl.setActiveByPosition(tryNextPosition);},addEvents:function(){if(this._nav.prevButton){this._addEventForType(this._nav.prevButton,"prev");}
if(this._nav.nextButton){this._addEventForType(this._nav.nextButton,"next");}
if(this._nav.firstButton){this._addEventForType(this._nav.firstButton,"first");}
if(this._nav.lastButton){this._addEventForType(this._nav.lastButton,"last");}
if(this._cfg.tabletSwipe){this._addSwipeEventHandlers();}},removeEvents:function(){for(var i=0,len=this.connectHandles.length;i<len;i++){dojo.disconnect(this.connectHandles[i]);}},_enqueueProc:function(proc){this._procs.push(proc);this._model.addLockListener(function(){var pr=this._procs.shift();if(pr){pr.call(this);}},this);},_addEventForType:function(oBtn,btnType,doRemoveEvent){this.connectHandles.push(dojo.connect(oBtn,"onclick",this,this._stopEventBridge));this.connectHandles.push(dojo.connect(oBtn,'onmousedown',this,function(ev){this._stopEventBridge(ev);this._setActiveByTypeOrBeginInterval(btnType);}));this.connectHandles.push(dojo.connect(oBtn,'onmouseup',this,this._endEventBridge));this.connectHandles.push(dojo.connect(oBtn,'onmouseout',this,this._endEventBridge));},_stopEventBridge:function(ev){if(this._cfg.doStopEvent===true){dojo.stopEvent(ev);}},_setActiveByTypeOrBeginInterval:function(type){if(!this._nextInterval||this._nextInterval===null){this._setActiveByType(type);}
if(!this._cfg.disableInterval){this._nextInterval=setInterval(dojo.hitch(this,function(){this._setActiveByType(type);}),400);}},_endEventBridge:function(){clearInterval(this._nextInterval);this._nextInterval=null;},_setActiveByType:function(type){if(this.ignoreActions){return;}
var proc;switch(type){case"prev":proc=this.setPreviousActive;break;case"first":proc=this.setFirstActive;break;case"last":proc=this.setLastActive;break;case"next":proc=dojo.hitch(this,"setNextActive",type);break;default:var panelPosition=(isNaN(parseInt(type,10))?0:parseInt(type,10));if(panelPosition>0){this._model.setViewArea(panelPosition);proc=dojo.hitch(this._model,"setActiveByPosition",panelPosition);}
break;}
proc.call(this);},_addSwipeEventHandlers:function(){var that=this,_oUl=dojo.byId(this._cfg.swipeStartId);dojo.query("li img",_oUl).forEach(function(ele){that.connectHandles.push(dojo.connect(ele,'touchstart',that,that._swipeHandleStart));});},_swipeHandleStart:function(ev){var touch=ev.touches[0],_b=dojo.body(),_dc=dojo.connect,_pnls=this._model.views.panels;_pnls._doSetup();this.oSwipe={clientX:touch.clientX,clientY:touch.clientY,oUL:_pnls.getPanelByPosition(1).getElement().parentNode,mouseUpHandle:_dc(_b,"touchend",this,this._swipeHandleStop),mouseMoveHandle:_dc(_b,"touchmove",this,this._swipeHandleMouseMove)};},_swipeHandleStop:function(ev){if(typeof this.oSwipe.lastPosition!=="undefined"){var begin=this.oSwipe,end=begin.lastPosition,bx=begin.clientX,by=begin.clientY,ex=end.clientX,ey=end.clientY,_pnls=this._model.views.panels,_model=this._model.model,numOfPanels=_model.getNumberOfPanels(),panelWidth=_pnls._panelWidth;var finalDistance=(ex-bx),slidesToMove=Math.floor(Math.abs(finalDistance)/panelWidth),remainder=Math.abs(finalDistance%panelWidth),direction=(finalDistance>0?-1:(finalDistance===0?0:1)),threshold=panelWidth*this._cfg.thresholdRatio;var lastSlide=_model.getActive()._position;if(remainder>threshold){slidesToMove++;}
var newSlide=lastSlide+(slidesToMove*direction);if(newSlide<1){newSlide=1;}
else if(newSlide>numOfPanels){newSlide=numOfPanels;}
_model.setActiveByPosition(newSlide);}
dojo.disconnect(this.oSwipe.mouseUpHandle);dojo.disconnect(this.oSwipe.mouseMoveHandle);delete this.oSwipe;},_swipeHandleMouseMove:function(ev){var touch=ev.touches[0],_pnls=this._model.views.panels,_hasLast=(typeof this.oSwipe.lastPosition!=="undefined"),_oLast=(_hasLast?this.oSwipe.lastPosition:this.oSwipe),oUL=this.oSwipe.oUL,left=oUL.style.left;this.oSwipe.lastPosition={clientX:touch.clientX,clientY:touch.clientY};var distanceX=touch.clientX-_oLast.clientX,distanceY=touch.clientY-_oLast.clientY;if(Math.abs(distanceX)>Math.abs(distanceY)){dojo.stopEvent(ev);}
else{return;}
if(left===""){left=0;}
else{left=parseInt(left.replace("px",""),10);}
oUL.style.left=(left+distanceX)+"px";},disableLastSlideScrim:function(){this.ignoreActions=false;}});dojo.provide("dj.widget.panels.PanelModel");dojo.require("dj.util.Observer");dojo.declare("dj.widget.panels.PanelModel",null,{ROTATION_TYPE:{LINEAR:0,CIRCULAR:1},DIRECTION:{PREVIOUS:0,NEXT:1},DEFAULT_CONFIG:{rotationType:0},constructor:function(panels,cfg){this._cfg=dojo.mixin(dojo.clone(this.DEFAULT_CONFIG),cfg);this._hPanels={};this._panelIds=[];this._prevInHistory=null;this._lastPosition=1;this._activePanel=null;this._activePanelObserver=new dj.util.Observer();this._direction=this.DIRECTION.NEXT;this._isLocked=false;this._lockObserver=new dj.util.Observer();this._rotationState=1;if(panels){this.addPanels(panels);}},updatePanels:function(panels){this._hPanels={};this._panelIds=[];var i=1;for(var pid in panels){if(panels.hasOwnProperty(pid)){var panel=panels[pid],panelId=panel.getId();this._panelIds[i++]=panelId;this._hPanels[panelId]=panel;}}},addPanel:function(panelId){var panel=new dj.widget.panels.Panel(panelId,this._lastPosition);this._panelIds[this._lastPosition]=panel.getId();this._hPanels[panelId]=panel;this._lastPosition++;},addPanels:function(panels){for(var pid in panels){if(panels.hasOwnProperty(pid)){var panel=panels[pid],panelId=panel.getId();this._panelIds[this._lastPosition]=panelId;this._hPanels[panelId]=panel;this._lastPosition++;}}},hasId:function(panelId){return(typeof this._hPanels[panelId]!=="undefined");},hasPosition:function(panelPosition){return((panelPosition>0)&&(panelPosition<this._panelIds.length));},getById:function(panelId){if(!this.hasId(panelId)){throw new Error("NoSuchElementException");}
return this._hPanels[panelId];},getByPosition:function(panelPosition){if(!this.hasPosition(panelPosition)){if(this._cfg.rotationType===this.ROTATION_TYPE.CIRCULAR){var numOfPan=this.getNumberOfPanels();panelPosition=(panelPosition%numOfPan);panelPosition=(panelPosition===0)?numOfPan:panelPosition;}else{return;}}
var pid=this._panelIds[panelPosition];return this._hPanels[pid];},getActive:function(){return this._activePanel;},getPrevInHistory:function(){return this._prevInHistory;},getAll:function(){var values=[];for(var value in this._hPanels){if(this._hPanels.hasOwnProperty(value)){values.push(this._hPanels[value]);}}
return values;},getNumberOfPanels:function(){return(this._panelIds.length-1);},getRotationState:function(){return this._rotationState;},getRotationType:function(){return this._cfg.rotationType;},getDirection:function(){return this._direction;},setRotationState:function(state){if(state<0||state>1){this._activePanelObserver.fireByName("rotationStateFailure",state);}
this._rotationState=state;this._activePanelObserver.fireByName("rotationStateSuccess",state);},setDirection:function(dir){if(dir<0||dir>1){throw new Error("IndexOutOfBoundsException");}
this._direction=dir;},setActive:function(panel){if(panel&&panel.getId){this.setActiveById(panel.getId());}},setActiveById:function(panelId){if(!this.hasId(panelId)){this._activePanelObserver.fireByName("failure",panelId);return;}
var panel=this.getById(panelId);this._prevInHistory=this._activePanel;this._activePanel=panel;this._activePanelObserver.fireByName("success",panel);for(var controller in this.controllers){if(this.controllers[controller].panelChangedHook){this.controllers[controller].panelChangedHook(panelId);}}},setActiveByPosition:function(panelPosition){if(!this.hasPosition(panelPosition)){if(this._cfg.rotationType===this.ROTATION_TYPE.CIRCULAR){var numOfPan=this.getNumberOfPanels();panelPosition=(panelPosition%numOfPan);panelPosition=(panelPosition===0)?numOfPan:panelPosition;}else{this._activePanelObserver.fireByName("failure",panelPosition);return;}}
var pid=this._panelIds[panelPosition];this.setActiveById(pid);},addChangeListener:function(event,listener,context){if(arguments.length<3&&(typeof event==="function")){context=listener;listener=event;event="success";}
context=(typeof context!=="undefined")?context:this;this._activePanelObserver.subscribeByName(event,listener,context);},isLocked:function(){return this._isLocked;},addLockListener:function(cb,context){this._lockObserver.subscribe(cb,context);},doLock:function(){this._isLocked=true;},releaseLock:function(){this._isLocked=false;this._lockObserver.fire();},runAfterLockReleased:function(cb,ctx){if(this._isLocked){this.addLockListener(cb,ctx);}else{cb.call(ctx);}},getViewArea:function(){return this._viewArea;},setViewArea:function(va){this._viewArea=va;},getActivePanel:function(){return this.getActive().getId();},setActivePanel:function(pid){var meth=(typeof pid=="string")?this.setActiveById:this.setActiveByPosition;return meth.call(this,pid);},hasPanel:function(panel){var pid=(panel.getId)?panel.getId():panel;return this.hasId(pid);},observePanels:function(callback){this.addChangeListener(function(panel){callback.apply(this,[panel.getId(),panel.getId()]);},this);}});dojo.provide("dj.widget.panels.view.BasePanel");dojo.require("dj.lang");dojo.declare("dj.widget.panels.view.BasePanel",null,{DEFAULT_CONFIG:{animationDuration:0.3,animationType:"slide",orientation:"horizontal"},enableLazyImages:function(model,panelGroup){var a=model.getActivePanel();var v=model.getViewArea();var ulCount=dojo.query('ul.newsItem',panelGroup.parentNode).length;for(j=0;j<ulCount;j++){for(i=a;i<a+(2*v);i++){var ULs=dojo.query('ul.newsItem',panelGroup.parentNode);var image=dojo.query('img',ULs[j])[i];if(!image){break;}
if(image.getAttribute('data-src')){image.setAttribute('src',image.getAttribute('data-src'));}}}}});dojo.provide("dj.widget.panels.view.NavArrows");dojo.require("dj.lang");dojo.declare("dj.widget.panels.view.NavArrows",null,{DEFAULT_CONFIG:{prevButtonEnabledStyle:"enabledPrev",nextButtonEnabledStyle:"enabledNext",firstButtonEnabledStyle:"enabledFirst",lastButtonEnabledStyle:"enabledLast",panelIncrement:1},constructor:function(model,nav,cfg){this._cfg=dj.lang.cloneMixin(this.DEFAULT_CONFIG,cfg);this._model=model;this._nav=nav;},displayActiveSuccess:function(panel){this._updatePrevious();this._updateNext();},_updatePrevious:function(){var mod=this._model,pp=mod.getByPosition(mod.getActive().getPosition()-this._cfg.panelIncrement);if(!pp){dojo.removeClass(this._nav.prevButton,this._cfg.prevButtonEnabledStyle);if(this._nav.firstButton){dojo.removeClass(this._nav.firstButton,this._cfg.firstButtonEnabledStyle);}}else{dojo.addClass(this._nav.prevButton,this._cfg.prevButtonEnabledStyle);if(this._nav.firstButton){dojo.addClass(this._nav.firstButton,this._cfg.firstButtonEnabledStyle);}}},_updateNext:function(){var mod=this._model,np=mod.getByPosition(mod.getActive().getPosition()+mod.getViewArea());if(!np){dojo.removeClass(this._nav.nextButton,this._cfg.nextButtonEnabledStyle);if(this._nav.lastButton){dojo.removeClass(this._nav.lastButton,this._cfg.lastButtonEnabledStyle);}}else{dojo.addClass(this._nav.nextButton,this._cfg.nextButtonEnabledStyle);if(this._nav.lastButton){dojo.addClass(this._nav.lastButton,this._cfg.lastButtonEnabledStyle);}}},displayLastSlideScrim:function(){dojo.removeClass(this._nav.nextButton,this._cfg.nextButtonEnabledStyle);dojo.removeClass(this._nav.prevButton,this._cfg.prevButtonEnabledStyle);}});dojo.provide("dj.widget.panels.Panel");dojo.require("dj.widget.panels.PanelDTO");dojo.declare("dj.widget.panels.Panel",dj.widget.panels.PanelDTO,{constructor:function(id,position,element){this._element=null;if(typeof element!=="undefined"){this.setElement(element);}},getElement:function(){return this._element;},setElement:function(element){if(typeof element!=="object"){throw new TypeError("Element must be an object.");}
this._element=element;}});dojo.provide("dj.widget.panels.view.SlidePanel");dojo.require("dj.widget.panels.view.BasePanel");dojo.require("dj.lang");dojo.declare("dj.widget.panels.view.SlidePanel",dj.widget.panels.view.BasePanel,{DEFAULT_CONFIG:{animationDuration:0.3,animationType:"slide",orientation:"horizontal",cacheVector:true,tabletSwipe:false},constructor:function(model,panels,cfg){this._cfg=dj.lang.cloneMixin(this.DEFAULT_CONFIG,cfg);this._isOrientVert=(this._cfg.orientation=="vertical");this._isOrientHoriz=(this._cfg.orientation=="horizontal");this._model=model;this._panels=panels;this._isSetupDone=false;this._animation=null;this._vectorMap={};this._oCnt=this._cfg.container;this._enableLazyImages=this._cfg.enableLazyImages;this._isPanelsUpdated=false;},updatePanels:function(panels){this._panels=panels;this._isPanelsUpdated=true;},displayActiveSuccess:function(activePanel){this._model.doLock();this._doSetup();if(this._isPanelGroupLargerThanAllPanels()){return;}
if(this._isRotationCircular){this._doCircularActiveSuccess(activePanel);}else{this._doLinearActiveSuccess(activePanel);}},_doCircularActiveSuccess:function(activePanel){var prevPanel=this._model.getPrevInHistory(),prvPos=prevPanel.getPosition(),avePos=activePanel.getPosition(),that=this,isIncreasing=(this._model.getDirection()==this._model.DIRECTION.NEXT),delta=0;var isIncFlip=false;var isDecrFlip=false;if(isIncreasing&&(prvPos==this._numberOfPanels)&&(avePos==1)){isIncFlip=true;delta=(that._isOrientVert)?-this._panelHeight:-this._panelWidth;}else if(!isIncreasing&&(prvPos==1)&&(avePos==this._numberOfPanels)){isDecrFlip=true;delta=(that._isOrientVert)?this._panelHeight:this._panelWidth;}else{delta=this._getVector(prevPanel,activePanel);}
afterFin=function(){if(this._enableLazyImages){this.enableLazyImages(this._model,this._oPanelGroup);}
if(isIncFlip){var offsetType=(that._isOrientVert)?"top":"left";that._oPanelGroup.style[offsetType]="0px";}
that._model.setViewArea(that.getViewArea());that._model.releaseLock();};beforeStr=function(){if(isDecrFlip){var mv,offsetTopOrLeft,offsetHeightOrWidth;if(that._isOrientVert){offsetTopOrLeft="top";offsetHeightOrWidth="_panelHeight";}else if(that._isOrientHoriz){offsetTopOrLeft="left";offsetHeightOrWidth="_panelWidth";}
mv=that._getVector(prevPanel,activePanel)-that[offsetHeightOrWidth];this.properties.left=(mv+this.properties.xD);dojo.style(that._oPanelGroup,offsetTopOrLeft,mv+"px");}};this._doScrollAnimation(delta,beforeStr,afterFin);},_doLinearActiveSuccess:function(activePanel){var prevPanel=this._model.getPrevInHistory(),afterFin=dojo.hitch(this,function(){if(this._enableLazyImages){this.enableLazyImages(this._model,this._oPanelGroup);}
this._model.setViewArea(this.getViewArea());this._model.releaseLock();}),beforeStr=function(){};var delta=this._getVector(prevPanel,activePanel);this._doScrollAnimation(delta,beforeStr,afterFin);},_doSetup:function(){if(this._isSetupDone){return;}
this._isSetupDone=true;this._setCoreValues();this._resetStyle();if(this._isRotationCircular&&!this._isPanelGroupLargerThanAllPanels()){this._circularLoopSetup();}},_doScrollAnimation:function(delta,beforeStr,afterFin){var xD,yD;if(this._isOrientVert){xD=0;yD=delta;}else if(this._isOrientHoriz){xD=delta;yD=0;}
var newLeft=(dojo.style(this._oPanelGroup,"left")+xD),newTop=(dojo.style(this._oPanelGroup,"top")+yD),animationDurationInMillis=(this._cfg.animationDuration*1000);var animCfg={node:this._oPanelGroup,duration:animationDurationInMillis,beforeBegin:beforeStr,onEnd:afterFin,properties:{"xD":xD,"yD":yD,left:newLeft,top:newTop}};this._animation=dojo.animateProperty(animCfg);this._animation.play();},getContainer:function(){if(this._oCnt){return this._oCnt;}
if(this._cfg.container&&this._cfg.container!==""){this._oCnt=dojo.byId(this._cfg.container);return this._oCnt;}
if(this._oPanelGroup){this._oCnt=this._oPanelGroup.parentNode;return this._oCnt;}
var ap=this._panels[this._model.getByPosition(1).getId()];var el=ap.getElement();if(!el.parentNode||!el.parentNode.parentNode){return null;}
var grp=el.parentNode;this._oCnt=grp.parentNode;return this._oCnt;},getPanelByPosition:function(pos){var el=this._model.getByPosition(pos);return this._panels[el.getId()];},destroy:function(){this._resetStyle();},getViewArea:function(){var viewArea=0;if(typeof this._cfg.viewArea=="number"){viewArea=this._cfg.viewArea;}else if(this._isRotationCircular||this._isFixedSizePanels()){viewArea=this._getFixedSizeViewArea();}else{viewArea=this._getDynamicSizeViewArea();}
this._model.setViewArea(viewArea);return viewArea;},_getFixedSizeViewArea:function(){var el=(this._panels[this._model.getByPosition(1).getId()]).getElement(),cnt=el.parentNode.parentNode,hOrW=(this._isOrientVert)?"h":"w",viewArea=Math.round(dojo.position(cnt)[hOrW]/dojo.position(el)[hOrW]);return viewArea;},_getDynamicSizeViewArea:function(){var viewArea=0,activePanel=this._panels[this._model.getActive().getId()],cnt=activePanel.getElement().parentNode.parentNode,numOfPanels=this._model.getNumberOfPanels(),hOrW=(this._isOrientVert)?"h":"w",cntWidthOrHeight=dojo.position(cnt)[hOrW],totalWidthOrHeight=0;for(var i=activePanel.getPosition();i<=numOfPanels;i++){var panel=this._panels[this._model.getByPosition(i).getId()];totalWidthOrHeight+=dojo.position(panel.getElement())[hOrW];if(totalWidthOrHeight>cntWidthOrHeight){break;}
viewArea++;}
return viewArea;},_isFixedSizePanels:function(){if(typeof this.__isFixedLengthPanels==="undefined"){this.__isFixedLengthPanels=true;var hOrW=(this._isOrientVert)?"h":"w",prevLen=Math.round(dojo.position(this.getPanelByPosition(1).getElement())[hOrW]);for(var i=2;i<=this._model.getNumberOfPanels();i++){var len=Math.round(dojo.position(this.getPanelByPosition(i).getElement())[hOrW]);if(prevLen!==len){this.__isFixedLengthPanels=false;break;}
prevLen=len;}}
return this.__isFixedLengthPanels;},_getWidthOrHeightOfPanels:function(){if(typeof this._widthOrHeightOfPanels=="undefined"||this._isPanelsUpdated){var lastPanel=this.getPanelByPosition(this._model.getNumberOfPanels()),lastPanelBox=dojo.marginBox(lastPanel.getElement());this._widthOrHeightOfPanels=(this._isOrientVert)?(lastPanel.getElement().offsetTop+lastPanelBox.h):(lastPanel.getElement().offsetLeft+lastPanelBox.w);}
return this._widthOrHeightOfPanels;},_getVector:function(prevPanel,currPanel){var existingVector=this._getExistingVector(prevPanel,currPanel);if(existingVector&&this._cfg.cacheVector){return existingVector;}
currPanel=this._panels[currPanel.getId()];var offsetType=(this._isOrientVert)?"offsetTop":"offsetLeft",topOrLeft=(this._isOrientVert)?"t":"l",heightOrWidth=(this._isOrientVert)?"h":"w",yOrx=(this._isOrientVert)?"y":"x",panelsHeightOrWidth=this._getWidthOrHeightOfPanels();var panelGroupBox=dojo.marginBox(this._oPanelGroup),panelGroupOffset=this._oPanelGroup[offsetType],prevOffset=Math.abs(panelGroupBox[topOrLeft]),currPanelBox=dojo.marginBox(currPanel.getElement()),currOffset=Math.abs(currPanel.getElement()[offsetType]);var currPanelPos=currPanel.getPosition(),prevPanelPos=prevPanel.getPosition(),lastPanelPos=this._getPanelsCount(),panelDiff=currPanelPos-prevPanelPos,samePanel=(panelDiff===0),isInc=panelDiff>0;if(!isInc&&(currOffset>prevOffset)){if(!samePanel||!this._cfg.tabletSwipe){return 0;}
else{isInc=true;}}
var delta=Math.abs(currOffset-prevOffset);vector=((isInc)?(delta*-1):delta);if(this._cfg.tabletSwipe){if(samePanel){if(currPanelPos===1&&panelGroupOffset>0){vector*=-1;}}}
if(!this._isRotationCircular&&(!this._isFixedSizePanels()||!this._hasSufficientPanelsAtEnd(currPanel))){var panelGroupPos=dojo.position(this._oPanelGroup.parentNode),newPos=(panelGroupBox[topOrLeft]+vector),maxPos=(panelGroupPos[heightOrWidth]-panelsHeightOrWidth),diff=(maxPos-newPos);if(isInc&&(diff>0)){vector+=diff;}}
if(this._cfg.cacheVector){this._setExistingVector(prevPanel,currPanel,vector);}
return vector;},_hasSufficientPanelsAtEnd:function(currPanel){var delta=this._model.getNumberOfPanels()-(currPanel.getPosition()-1+this.getViewArea());if(delta>=0){return true;}else{return false;}},_getExistingVector:function(panel1,panel2){return this._vectorMap[panel1.getId()+"_"+panel2.getId()];},_setExistingVector:function(panel1,panel2,vector){this._vectorMap[panel1.getId()+"_"+panel2.getId()]=vector;},_isPanelGroupLargerThanAllPanels:function(){var heightOrWidth=(this._isOrientVert)?"h":"w",panelsHeightOrWidth=this._getWidthOrHeightOfPanels(),panelGroupPos=dojo.position(this._oPanelGroup.parentNode);return(panelGroupPos[heightOrWidth]>panelsHeightOrWidth);},_setCoreValues:function(){if(this._isCoreValuesSet){return;}
var model=this._model,ap=this._panels[model.getByPosition(1).getId()];this._oPanelGroup=dojo.query(this._cfg.panelGroup,this.getContainer())[0];this._numberOfPanels=model.getNumberOfPanels();this._isRotationCircular=(model.getRotationType()==model.ROTATION_TYPE.CIRCULAR);if(this._isOrientVert){this._panelHeight=dojo.position(ap.getElement()).h;}else if(this._isOrientHoriz){this._panelWidth=dojo.position(ap.getElement()).w;}
this._isCoreValuesSet=true;},_resetStyle:function(){if(typeof this._oPanelGroup==="object"){dojo.style(this._oPanelGroup,{left:0,top:0});}},_circularLoopSetup:function(){for(var i=1,element=null,clone=null,len=this.getViewArea();i<=len;i++){element=this._panels[this._model.getByPosition(i).getId()].getElement();clone=element.cloneNode(true);this._oPanelGroup.appendChild(clone);}},_getPanelsCount:function(){if(typeof this.panelsCount==="undefined"){var _pnls=this._panels,lastPanelPos=-1;for(var i in _pnls){if(_pnls.hasOwnProperty(i)){var pos=_pnls[i].getPosition();if(pos>lastPanelPos){lastPanelPos=pos;}}}
this.panelsCount=lastPanelPos;}
return this.panelsCount;}});dojo.provide("dj.widget.panels.PanelsFactory");dojo.require("dj.lang");dojo.require("dj.widget.panels.PanelDTO");dojo.require("dj.widget.panels.Panel");dojo.require("dj.widget.panels.PanelModel");dj.widget.panels.PanelsFactory={_CONFIG:{core:{panelGroup:".newsItem",panel:"> li",panelPrefix:"panelsPanel_",panels:undefined,panelToggleStyle:"hidden",activePanel:1,disabledPanels:undefined,panelIncrement:1,viewArea:undefined,paginationDivider:"/",paginationContainer:".pagination",controller:undefined,enableBrowserHistory:false,animationDuration:0.3},tabs:{tabPrefix:"panelsTab_",tabGroup:".newsItem",tab:"> li",navContainer:".nav-inline",prevButton:".prev",nextButton:".next",navButtonEnabledStyle:"enabled",tabOnEvent:"click",tabOnStyle:"active",tabOffStyle:"deselected"},carousel:{orientation:"horizontal",navContainer:".nav-inline",pagination:{container:false,linkClass:"prevnext_page",selectedClass:"prevnext_page-current",label:false,labelClass:"prevnext_pagelabel",prevNextDisableClass:'prevnext_prev-disabled'},disableInterval:false,prevButton:".prev",nextButton:".next",prevButtonEnabledStyle:"enabledPrev",nextButtonEnabledStyle:"enabledNext"},rotator:{rotateTime:8,rotateIterations:3,pauseOnMouseOver:false,pauseButton:".nav-inline .pause",pauseButtonEnabledStyle:"enabledPause",progressBar:".progressbarBox"}},_panelsType:{NONE:0,SLIDE:1,SWITCH:2},_paginationType:{SIMPLE:0,RANGE:1},_lookupType:{NONE:0,SELECTOR:1,PREFIX:2},create:function(container,cfg,doIgnoreOptCache){if(!container||(typeof cfg!=="object")){console.warn("{Panels} no container or config specified.");return;}
container=dojo.byId(container);if(container&&!doIgnoreOptCache){if(this._isReinitializedAndSetCache(container,cfg)){console.warn("{Panels} prevented attempt to reinitialize \""+container.id+"\".");return;}}
try{var mvc=this._setupMvc(container,cfg);this._addCompatibilityMethods(mvc,container,cfg);return mvc.model;}catch(ex){console.info(ex.message);}},_isReinitializedAndSetCache:function(container,cfg){var optCache=['{',container.id,': ',dj.lang.objectToString(cfg,true),'}'].join(''),cntOpt=container.getAttribute("djw_optcache");if(cntOpt){var opts=cntOpt.split("_");for(var i=0,len=opts.length;i<len;i++){if(opts[i]==optCache){return true;}}}
if(cntOpt){container.setAttribute("djw_optcache",[optCache,cntOpt].join("_"));}else{container.setAttribute("djw_optcache",optCache);}
return false;},createPanels:function(userCfg){var djwp=dj.widget.panels,_lookupType=this._lookupType,_panType=this._panelsType,_d=dojo,model=null,views={},controllers={};var config=dojo.clone(this._CONFIG.core);config.container="";config.doAddChangeListeners=true;config.panelsType=_panType.SWITCH;config.panelsLookupType=_lookupType.SELECTOR;dojo.mixin(config,userCfg);var panels=null;switch(config.panelsLookupType){case _lookupType.PREFIX:panels=this.lookupByPrefix(config.panelPrefix,config.panels);break;case _lookupType.SELECTOR:panels=this.lookupBySelector(config.container,config.panelGroup,config.panel);break;default:return;}
var rotType=(((config.type==djwp.PanelModel.prototype.ROTATION_TYPE.CIRCULAR)||(config.type=="circular"))?djwp.PanelModel.prototype.ROTATION_TYPE.CIRCULAR:djwp.PanelModel.prototype.ROTATION_TYPE.LINEAR);model=new djwp.PanelModel(this.panelsToPanelsDTO(panels),{rotationType:rotType});model.setActiveByPosition(config.activePanel);var view=null,viewPanelConfig,viewPanelType;switch(config.panelsType){case _panType.SLIDE:_d.require("dj.widget.panels.view.SlidePanel");viewPanelType="SlidePanel";viewPanelConfig={animationDuration:config.animationDuration,viewArea:config.viewArea,orientation:config.orientation,panelGroup:config.panelGroup,container:config.container,enableLazyImages:config.enableLazyImages};if(typeof config.cacheVector!=="undefined"){viewPanelConfig.cacheVector=config.cacheVector;}
if(typeof config.tabletSwipe!=="undefined"){viewPanelConfig.tabletSwipe=config.tabletSwipe;}
break;case _panType.SWITCH:_d.require("dj.widget.panels.view.Panel");viewPanelType="Panel";viewPanelConfig={selectedClass:config.selectedPanelClass,deselectedClass:config.deselectedPanelClass};break;}
view=new djwp.view[viewPanelType](model,panels,viewPanelConfig);views.panels=view;if(config.doAddChangeListeners){model.addChangeListener("success",view.displayActiveSuccess,view);}
return{"model":model,"views":views,"controllers":controllers};},addModuleNavArrows:function(mvc,userCfg){var _lookupType=this._lookupType,model=mvc.model,views=mvc.views,controllers=mvc.controllers,_d=dojo;var config=_d.clone(this._CONFIG.carousel);config.container="";config.doAddEvents=true;config.doAddChangeListeners=true;config.doHide=false;dj.lang.mixin(config,userCfg);if(!config.container&&views.panels&&views.panels.getContainer){config.container=views.panels.getContainer();}
var navArrowsLookupType=_lookupType.NONE;if(!config.lookupType){navArrowsLookupType=(config)?_lookupType.SELECTOR:navArrowsLookupType;}else{navArrowsLookupType=config.lookupType;}
var navArrows={};if(navArrowsLookupType==_lookupType.SELECTOR){navArrows.navContainer=_d.query(config.navContainer,config.container)[0];if(navArrows.navContainer){navArrows.prevButton=_d.query(config.prevButton,navArrows.navContainer)[0];navArrows.nextButton=_d.query(config.nextButton,navArrows.navContainer)[0];navArrows.lastButton=(config.lastButton)?_d.query(config.lastButton,navArrows.navContainer)[0]:null;navArrows.firstButton=(config.firstButton)?_d.query(config.firstButton,navArrows.navContainer)[0]:null;}else{return;}}else{return;}
if(config.doHide){navArrows.navContainer.style.visibility="hidden";return;}else if(navArrows.navContainer.style.visibility==="hidden"){navArrows.navContainer.style.visibility="";}
var controller;if(config.pagination.container){_d.require("dj.widget.panels.controller.NavArrowsPagination");controller=new dj.widget.panels.controller.NavArrowsPagination(model,navArrows,config);}else{_d.require("dj.widget.panels.controller.NavArrows");controller=new dj.widget.panels.controller.NavArrows(model,navArrows,config);}
controllers.navArrows=controller;_d.require("dj.widget.panels.view.NavArrows");var view=new dj.widget.panels.view.NavArrows(model,navArrows,config);view.displayActiveSuccess();views.navArrows=view;if(config.doAddEvents){controller.addEvents();}
if(config.doAddChangeListeners){model.addChangeListener("success",view.displayActiveSuccess,view);}},addModuleNavTabs:function(mvc,userCfg){var _lookupType=this._lookupType,model=mvc.model,views=mvc.views,controllers=mvc.controllers,_d=dojo;var config=dojo.clone(this._CONFIG.tabs);config.container="";config.panels=this._CONFIG.core.panels;config.doAddEvents=true;config.doAddChangeListeners=true;dj.lang.mixin(config,userCfg);if(!config.container&&views.panels&&views.panels.getContainer){config.container=views.panels.getContainer();}
var navTabsLookupType=_lookupType.NONE;if(!config.lookupType){navTabsLookupType=(userCfg)?_lookupType.SELECTOR:navTabsLookupType;navTabsLookupType=(userCfg&&userCfg.tabPrefix)?_lookupType.PREFIX:navTabsLookupType;}else{navTabsLookupType=config.lookupType;}
var navTabs=null;switch(navTabsLookupType){case _lookupType.PREFIX:navTabs=this.lookupByPrefix(config.tabPrefix,config.panels);break;case _lookupType.SELECTOR:navTabs=this.lookupBySelector(config.container,config.tabGroup,config.tab);break;default:return;}
_d.require("dj.widget.panels.view.Panel");var view=new dj.widget.panels.view.Panel(model,navTabs,{selectedClass:config.tabOnStyle,deselectedClass:config.tabOffStyle});_d.require("dj.widget.panels.controller.NavTabs");var controller=new dj.widget.panels.controller.NavTabs(model,navTabs,{activeEvent:config.tabOnEvent});views.navTabs=view;controllers.navTabs=controller;if(config.doAddEvents){controller.addEvents();}
if(config.doAddChangeListeners){model.addChangeListener("success",view.displayActiveSuccess,view);}},addModulePagination:function(mvc,userCfg){var config={},_d=dojo;var model=mvc.model,views=mvc.views;dj.lang.mixin((config={container:"",doAddChangeListeners:true,paginationContainer:this._CONFIG.core.paginationContainer,doHide:false}),userCfg);if(!config.container&&views.panels&&views.panels.getContainer){config.container=views.panels.getContainer();}
var oPaginationCnt=_d.query(config.paginationContainer,config.container)[0];if(!oPaginationCnt){return;}
if(config.doHide){oPaginationCnt.style.visibility="hidden";return;}
var view,isTypeRangePagination=(config.type&&config.type==this._paginationType.RANGE),requireClassName=(isTypeRangePagination)?"RangePagination":"Pagination";if(isTypeRangePagination){var ototalResultsCnt=_d.query(config.totalResultsContainer,config.container)[0];var totalCnt=ototalResultsCnt.innerHTML;_d.require("dj.widget.panels.view.RangePagination");view=new dj.widget.panels.view.RangePagination(model,oPaginationCnt,totalCnt,ototalResultsCnt,config.pageSize);model.setViewArea(1);model.setActiveByPosition(1);}else{_d.require("dj.widget.panels.view.Pagination");view=new dj.widget.panels.view.Pagination(model,oPaginationCnt,config);}
view.displayActiveSuccess();views.pagination=view;if(config.doAddChangeListeners){model.addChangeListener("success",view.displayActiveSuccess,view);}},addModuleTimer:function(mvc,userCfg){var _d=dojo,config=_d.clone(this._CONFIG.rotator);config.container="";config.doAddEvents=true;config.doAddChangeListeners=true;dj.lang.mixin(config,userCfg);var controllers=mvc.controllers;_d.require("dj.widget.panels.controller.Timer");controllers.timer=new dj.widget.panels.controller.Timer(mvc.model,config);var oPause=_d.query(config.pauseButton,config.container)[0];if(oPause){_d.require("dj.widget.panels.view.Timer");var view=new dj.widget.panels.view.Timer(mvc.model,{pauseButton:oPause},userCfg);if(config.doAddChangeListeners){mvc.model.addChangeListener("rotationStateSuccess",view.rotationStateSuccess,view);}}
if(config.doAddEvents){controllers.timer.addEvents();}},addModuleBrowserHistory:function(mvc,userCfg){var config={},_d=dojo;dj.lang.mixin((config={doAddEvents:true}),userCfg);_d.require("dj.widget.panels.controller.History");mvc.controllers.browserHistory=new dj.widget.panels.controller.History(mvc.model,config);if(config.doAddEvents){controllers.browserHistory.addEvents();}},addController:function(mvc,cMvc){if(!cMvc||!cMvc.model||!cMvc.model.addChangeListener||!mvc||!mvc.model){throw new Error("{Panels.addController} mvc and/or controller is invalid.");}
var model=mvc.model,controllerModel=cMvc.model;controllerModel.addChangeListener("success",function(panel){model.setActive(panel);});},_setupMvc:function(container,userConfig){var oCnt=dojo.byId(container);container=(oCnt.id||container);var config=dj.lang.cloneMixin(this._CONFIG,userConfig),typeCfg=this._getPanelsTypeConfig(userConfig,config);var panelsCfg={container:oCnt,doAddChangeListeners:false,panelsType:typeCfg.panelsType,panelsLookupType:typeCfg.panelsLookupType};dj.lang.mixin(panelsCfg,config.core);if(typeCfg.panelsType==this._panelsType.SWITCH){dj.lang.mixin(panelsCfg,config.tabs);}else if(typeCfg.panelsType==this._panelsType.SLIDE){dj.lang.mixin(panelsCfg,config.carousel);}
var mvc=this.createPanels(panelsCfg);if(mvc.model.getNumberOfPanels()==-1){throw new Error("{Panels} container \""+container+"\" has no panels.");}
var model=mvc.model,views=mvc.views,controllers=mvc.controllers;if(typeCfg.hasNavTabs){var navTabCfg=config.tabs;navTabCfg.container=oCnt;navTabCfg.panels=config.core.panels;navTabCfg.doAddEvents=false;navTabCfg.doAddChangeListeners=false;navTabCfg.lookupType=typeCfg.navTabsLookupType;this.addModuleNavTabs(mvc,navTabCfg);}
if(typeCfg.hasNavArrows){var navArrCfg=config.carousel;navArrCfg.container=oCnt;navArrCfg.doAddEvents=false;navArrCfg.doAddChangeListeners=false;navArrCfg.lookupType=typeCfg.navArrowsLookupType;navArrCfg.panelIncrement=config.core.panelIncrement;navArrCfg.doHide=((typeCfg.panelsType==this._panelsType.SLIDE)&&(views.panels.getViewArea()>=model.getNumberOfPanels())&&!config.carousel.showNavButtons);this.addModuleNavArrows(mvc,navArrCfg);}
var enablePagination=config.core.enablePagination;if((typeCfg.panelsType==this._panelsType.SLIDE&&(views.panels.getViewArea()<=1))||enablePagination){var paginCfg={container:oCnt,paginationContainer:config.core.paginationContainer,panelIncrement:config.core.panelIncrement,paginationDivider:config.core.paginationDivider,doAddEvents:false,doAddChangeListeners:false,doHide:(views.panels.getViewArea()==1&&enablePagination)};this.addModulePagination(mvc,paginCfg);}
if(typeCfg.hasTimer){var timerCfg=config.rotator;timerCfg.container=oCnt;timerCfg.doAddEvents=false;this.addModuleTimer(mvc,timerCfg);}
if(typeCfg.hasBrowserHistory){var histConf={container:(typeCfg.panelsLookupType==this._lookupType.SELECTOR)?oCnt.id:container,doAddEvents:false};this.addModuleBrowserHistory(mvc,histConf);}
if(typeCfg.hasController){this.addController(mvc,config.core.controller);}
this._addViewChangeListenersToModel(model,views);this._addEventsToControllers(controllers);if(!typeCfg.hasBrowserHistory&&typeCfg.panelsType==this._panelsType.SWITCH){model.setActiveByPosition(panelsCfg.activePanel);}
return mvc;},_getPanelsTypeConfig:function(userConfig,config){var _panType=this._panelsType;var _lookType=this._lookupType;var typeCfg={};typeCfg.panelsType=_panType.NONE;typeCfg.panelsType=(userConfig.core)?_panType.SWITCH:typeCfg.panelsType;typeCfg.panelsType=(userConfig.carousel)?_panType.SLIDE:typeCfg.panelsType;typeCfg.panelsLookupType=_lookType.SELECTOR;typeCfg.panelsLookupType=(userConfig.core&&userConfig.core.panelPrefix)?_lookType.PREFIX:typeCfg.panelsLookupType;typeCfg.navTabsLookupType=_lookType.NONE;typeCfg.navTabsLookupType=(userConfig.tabs)?_lookType.SELECTOR:typeCfg.navTabsLookupType;typeCfg.navTabsLookupType=(userConfig.tabs&&userConfig.tabs.tabPrefix)?_lookType.PREFIX:typeCfg.navTabsLookupType;typeCfg.navArrowsLookupType=_lookType.NONE;typeCfg.navArrowsLookupType=(userConfig.carousel)?_lookType.SELECTOR:typeCfg.navArrowsLookupType;typeCfg.navArrowsLookupType=(userConfig.tab&&userConfig.tab.navContainer)?_lookType.SELECTOR:typeCfg.navArrowsLookupType;typeCfg.hasController=(userConfig.core&&(typeof userConfig.core.controller=="object"));typeCfg.hasNavArrows=(typeCfg.navArrowsLookupType!==_lookType.NONE);typeCfg.hasNavTabs=(typeCfg.navTabsLookupType!==_lookType.NONE);typeCfg.hasTimer=(typeof userConfig.rotator=="object"&&userConfig.rotator.rotateTime>0);typeCfg.hasBrowserHistory=(config.core.enableBrowserHistory);return typeCfg;},_addViewChangeListenersToModel:function(model,views){var view=null;for(var viewName in views){if(views.hasOwnProperty(viewName)){view=views[viewName];if(view.displayActiveSuccess){model.addChangeListener("success",view.displayActiveSuccess,view);}
if(view.displayActiveFailure){model.addChangeListener("failure",view.displayActiveFailure,view);}}}},_addEventsToControllers:function(controllers){var controller=null;for(var controllerName in controllers){if(controllers.hasOwnProperty(controllerName)){controller=controllers[controllerName];controller.addEvents();}}},_addCompatibilityMethods:function(mvc,container,config){var that=this;if(typeof mvc.model.update==="undefined"){mvc.model.update=function(){that.destroy(mvc);mvc=that.create((container.id||container),config,true);return mvc;};}
if(typeof mvc.model.destroy==="undefined"){mvc.model.destroy=function(){that.destroy(mvc);};}
if(mvc.controllers&&mvc.controllers.navTabs){var tabs=mvc.controllers.navTabs.tabs,_d=dojo;mvc.model.observeTabs=function(callback,eventType){eventType=(eventType||"onclick");var _addEvForTab=function(tab){_d.connect(tab.getElement(),eventType,function(ev){var tid=tab.getId();if(mvc.controllers.navTabs._cfg.doStopEvent===true){_d.stopEvent(ev);}
tid=(isNaN(parseInt(tid,10)))?tid:(mvc.model.getById(tid).getPosition()+"");callback.call(null,tid,mvc.model);});};for(var tid in tabs){if(tabs.hasOwnProperty(tid)){_addEvForTab(tabs[tid]);}}};}
if(typeof mvc.model.updateNewPanels==="undefined"){mvc.model.updateNewPanels=function(container,group,node){var panels=that.lookupBySelector(container,group,node);mvc.model.updatePanels(that.panelsToPanelsDTO(panels));mvc.views.panels.updatePanels(panels);};}
mvc.model.model=mvc.model;mvc.model.views=mvc.views;mvc.model.controllers=mvc.controllers;},destroy:function(mvc){for(var controller in mvc.controllers){if(mvc.controllers.hasOwnProperty(controller)){mvc.controllers[controller].removeEvents();delete mvc.controllers[controller];}}
for(var viewName in mvc.views){if(mvc.views.hasOwnProperty(viewName)){var view=mvc.views[viewName];if(typeof view.destroy=="function"){view.destroy();}
delete mvc.views[viewName];}}},panelsToPanelsDTO:function(panels){var elms={};for(var panId in panels){if(panels.hasOwnProperty(panId)){var pan=panels[panId];elms[panId]=new dj.widget.panels.PanelDTO(pan.getId(),pan.getPosition());}}
return elms;},lookupByPrefix:function(prefix,names){var elms={};for(var i=0,len=names.length,id=null,el=null,pos=1;i<len;i++){id=names[i];el=dojo.byId(prefix+id);if((typeof el==="undefined")||el===null||el.firstChild===null){continue;}
elms[id]=new dj.widget.panels.Panel(id,pos++,el);}
return elms;},lookupBySelector:function(container,group,node){if(!container||container===null){throw new Error('{dj.util.Panels} container for group: "'+group+'" is undefined.');}
var oCnt=dojo.byId(container);var oPanels=dojo.query((group+' '+node),oCnt);var elms={};for(var i=0,len=oPanels.length,el=null,pos=1;i<len;i++){el=oPanels[i];if(el===null||(el.tagName!=="IMG"&&el.firstChild===null)){continue;}
elms[pos-1]=new dj.widget.panels.Panel(pos-1,pos++,el);}
return elms;}};dojo.provide("dj.widget.panels.virtual.Carousel");dojo.require("dj.widget.panels.PanelsFactory");dojo.require("dj.widget.panels.view.SlidePanel");dojo.require("dj.widget.panels.view.NavArrows");dojo.require("dj.widget.panels.controller.NavArrows");
dojo.provide("dj.widget.panel.LiveModalPanel");dojo.require("dj.util.Element");(function(djl){(dj.widget.panel.LiveModalPanel=function(cfg){this.cfg=djl.cloneMixin(this.DEFAULT_CONFIG,cfg);this._setupEvents();}).prototype={DEFAULT_CONFIG:{container:".linklist_dropdown .mn_dropdown_container",containerInd:".linklist_dropdown .mn_dropdown_container",dropdownContent:".mn_dropdownPanel > .mn_dropdownContent",actionEvent:"click",stateContainer:".mn_dropdownTree",stateCollapsed:"mn_ddState-collapsed",stateExpanded:"mn_ddState-expanded",navContainer:".pmMainNav",stateHover:"mndd_ddState-hover ",queryUpClass:"mn_dropdownTree",addMouseEvents:false},prevActivePanel:undefined,navOpened:false,_setupEvents:function(){var that=this;if(this.cfg.addMouseEvents){djl.addLiveEvent(this.cfg.container,"mouseover",function(ev){that.mouseOverOut(this,ev);});}
djl.addLiveEvent(this.cfg.containerInd,this.cfg.actionEvent,function(ev){var node=that._queryUpForClassName(this,that.cfg.queryUpClass);that.togglePanel(node,ev);});if(this.cfg.addMouseEvents){djl.addLiveEvent(this.cfg.container,"mouseout",function(ev){that.mouseOverOut(this,ev);});}
this.oDropdownContainer=dojo.query(this.cfg.navContainer)[0];dojo.connect(document,'onclick',function(ev){if(ev.target.nodeName=="A"){return true;}
if(that.prevActivePanel!==undefined&&that.navOpened===true){var dropd=dojo.query(that.cfg.dropdownContent,that.prevActivePanel)[0];if(dropd!==undefined&&!dj.util.Element.contains(dropd,ev.clientX,ev.clientY)){that.togglePanel(dropd,ev);that.navOpened=false;}}});},_queryUpForClassName:function(node,cn){if(node.className.indexOf(cn)==-1){while((typeof node!=="object")||(null===node.className)||!node.className||(node.className.indexOf(cn)!==0)){node=node.parentNode;}}
return node;},togglePanel:function(dropd,event){var cfg=this.cfg;if(dojo.hasClass(dropd,cfg.stateCollapsed)){dojo.removeClass(dropd,cfg.stateCollapsed);dojo.addClass(dropd,cfg.stateExpanded);this.navOpened=true;}else{dojo.removeClass(dropd,cfg.stateExpanded);dojo.addClass(dropd,cfg.stateCollapsed);this.navOpened=false;}
if(this.prevActivePanel!==undefined&&this.prevActivePanel!=dropd){dojo.removeClass(this.prevActivePanel,cfg.stateExpanded);dojo.addClass(this.prevActivePanel,cfg.stateCollapsed);}
this.prevActivePanel=dropd;dojo.stopEvent(event);},mouseOverOut:function(elm,ev){var cfg=this.cfg,dropd=dojo.query(cfg.stateContainer,elm)[0];if(dropd!==undefined){if(ev.type=="mouseover"){dojo.addClass(dropd,cfg.stateHover);}else if(ev.type=="mouseout"){dojo.removeClass(dropd,cfg.stateHover);}}}};}(dj.lang));dojo.provide("dj.widget.panel.ModalPanel");dojo.require("dj.util.Config");dojo.require("dj.util.Element");dojo.require("dj.util.Observer");(dj.widget.panel.ModalPanel=function(modalId,modalContainer,config){this.oModalId=dojo.byId(modalId);if(!this.oModalId){throw new Error("{dj.widget.panel.ModalPanel} modal-id is null or undefined");}
this.oModalContainer=dojo.byId(modalContainer);if(!this.oModalContainer){throw new Error("{dj.widget.panel.ModalPanel} modal-container is null or undefined");}
this.observeOpenModalPanel=new dj.util.Observer();this.observeCloseModalPanel=new dj.util.Observer();this.cfg=new dj.util.Config(this);this._setupConfig();if(config){this.cfg.applyConfig(config,true);}
this.cfg.fireQueue();if(this.oModalId===null){this._setupTargetlessModalPanel(this.oModalContainer);}else{this._setupModalPanel(this.oModalId,this.oModalContainer);}}).prototype={DEFAULT_CONFIG:{OPEN_MODAL_PANEL_EVENT_OPTION:{key:"openModalPanelEvent",value:"mouseover"},CLOSE_MODAL_PANEL_EVENT_OPTION:{key:"closeModalPanelEvent",value:"mouseout"},CLOSE_MODAL_PANEL_BUTTON_SELECTOR:{key:"closeModalPanelButtonSelector",value:null},CLOSE_MODAL_PANEL_EVENT_FOR_BUTTON_SELECTOR:{key:"closeModalPanelEventForButtonSelector",value:null}},_setupModalPanel:function(oModalId,oModalContainer){dojo.style(oModalContainer,{visibility:"hidden"});var modalOpenEvent=this.cfg.getProperty(this.DEFAULT_CONFIG.OPEN_MODAL_PANEL_EVENT_OPTION.key);var modalCloseEvent=this.cfg.getProperty(this.DEFAULT_CONFIG.CLOSE_MODAL_PANEL_EVENT_OPTION.key);var that=this;dojo.connect(oModalId,"on"+modalOpenEvent,this,function(event){dojo.stopEvent(event);this.openModalPanel();});var closeModalPanelSelector=this.cfg.getProperty(this.DEFAULT_CONFIG.CLOSE_MODAL_PANEL_BUTTON_SELECTOR.key);if(closeModalPanelSelector!==null){var closeModalPanelButtons=dojo.query(closeModalPanelSelector,oModalContainer);var modalCloseEventForButtonSelector=(this.cfg.getProperty(this.DEFAULT_CONFIG.CLOSE_MODAL_PANEL_EVENT_FOR_BUTTON_SELECTOR.key)!==null)?this.cfg.getProperty(this.DEFAULT_CONFIG.CLOSE_MODAL_PANEL_EVENT_FOR_BUTTON_SELECTOR.key):modalCloseEvent;closeModalPanelButtons.forEach(function(oCloseModalPanelButton){dojo.connect(oCloseModalPanelButton,"on"+modalCloseEventForButtonSelector,this,function(event){dojo.stopEvent(event);this.closeModalPanel();});},this);}else{dojo.connect(oModalContainer,"onmouseover",this,this.openModalPanel);dojo.connect(oModalContainer,"on"+modalCloseEvent,this,this.closeModalPanel);}
if(modalCloseEvent=='blur'){dojo.connect(document,"onclick",this,function(event){var isMousePointerinModalContainer=dj.util.Element.contains(oModalContainer,event.clientX,event.clientY);if(isMousePointerinModalContainer===false){this.closeModalPanel();}});}},_setupTargetlessModalPanel:function(oModalContainer){var modalCloseEvent=this.cfg.getProperty(this.DEFAULT_CONFIG.CLOSE_MODAL_PANEL_EVENT_OPTION.key);var closeModalPanelSelector=this.cfg.getProperty(this.DEFAULT_CONFIG.CLOSE_MODAL_PANEL_BUTTON_SELECTOR.key);this.openModalPanel();var that=this;if(closeModalPanelSelector!==null){var closeModalPanelButtons=dojo.query(closeModalPanelSelector,oModalContainer).each(function(oCloseModalPanelButton){dojo.connect(oCloseModalPanelButton,"on"+modalCloseEvent,this,function(event){dojo.stopEvent(event);this.closeModalPanel();});});}else{dojo.connect(oCloseModalPanelButton,"on"+modalCloseEvent,this,this.closeModalPanel);}},openModalPanel:function(){dojo.style(this.oModalContainer,{visibility:"visible"});},closeModalPanel:function(){dojo.style(this.oModalContainer,{visibility:"hidden"});},_setupConfig:function(config){var cfg=this.cfg;var defCfg=this.DEFAULT_CONFIG;cfg.addProperty(defCfg.OPEN_MODAL_PANEL_EVENT_OPTION.key,{value:defCfg.OPEN_MODAL_PANEL_EVENT_OPTION.value});cfg.addProperty(defCfg.CLOSE_MODAL_PANEL_EVENT_OPTION.key,{value:defCfg.CLOSE_MODAL_PANEL_EVENT_OPTION.value});cfg.addProperty(defCfg.CLOSE_MODAL_PANEL_BUTTON_SELECTOR.key,{value:defCfg.CLOSE_MODAL_PANEL_BUTTON_SELECTOR.value});cfg.addProperty(defCfg.CLOSE_MODAL_PANEL_EVENT_FOR_BUTTON_SELECTOR.key,{value:defCfg.CLOSE_MODAL_PANEL_EVENT_FOR_BUTTON_SELECTOR.value});}};dojo.provide("dj.widget.panel.SelectDropdownPanel");dojo.require("dj.util.Element");dojo.require("dj.lang");dojo.declare("dj.widget.panel.SelectDropdownPanel",null,{DEFAULT_CONFIG:{scrollContainerClass:".scroll_container",scrollBarClass:".scrollbar",scrollTrackClass:".scrollbar_container",scrollValuesContainerClass:".scroll_values_container",dropdownCollapsedClassName:"dropdown_collapsed",dropdownExpandedClassName:"dropdown_open",scrollContainerCollapsedClassName:"collapsed",scrollContainerExpandedClassName:"expanded",selectedClassName:".selected",scrollTrackContainerClassName:".scroll_track",dropdownScrollUpArrow:".scroll_up",dropdownScrollDownArrow:".scroll_down",scrollTrackHeight:"154",scrollValuesDisplayHeight:"190",scrollBarArrowShiftValue:"2"},constructor:function(selectDropdownContainer,config){this.cfg=dj.lang.cloneMixin(this.DEFAULT_CONFIG,config);var scrollBarClass=this.cfg.scrollBarClass;var scrollTrackClass=this.cfg.scrollTrackClass;var scrollContainerClass=this.cfg.scrollContainerClass;var scrollValuesContainerClass=this.cfg.scrollValuesContainerClass;this.oSelectDropDownContainer=dojo.byId(selectDropdownContainer);if(this.oSelectDropDownContainer){this.oScrollBar=dojo.query(scrollBarClass,this.oSelectDropDownContainer)[0];this.oScrollTrack=dojo.query(scrollTrackClass,this.oSelectDropDownContainer)[0];this.oScrollContainer=dojo.query(scrollContainerClass,this.oSelectDropDownContainer)[0];this.oScrollValuesContainer=dojo.query(scrollValuesContainerClass,this.oSelectDropDownContainer)[0];this._setupSelectDropdown(this.oSelectDropDownContainer,this.oScrollContainer,this.oScrollValuesContainer,this.oScrollBar,this.oScrollTrack);}},_setupSelectDropdown:function(oSelectDropdownContainer,oScrollContainer,oScrollValuesContainer,oScrollBar,oScrollTrack){var selectDropdownCollapsedClassName=this.cfg.dropdownCollapsedClassName;var selectDropdownExpandedClassName=this.cfg.dropdownExpandedClassName;var scrollContainerCollapsedClassName=this.cfg.scrollContainerCollapsedClassName;var scrollContainerExpandedClassName=this.cfg.scrollContainerExpandedClassName;var selectedClassName=this.cfg.selectedClassName;this.oSelected=dojo.query(selectedClassName,oSelectDropdownContainer)[0];var toggleDropdownClass=function(){if(dojo.hasClass(oSelectDropdownContainer,selectDropdownCollapsedClassName)){dojo.removeClass(oSelectDropdownContainer,selectDropdownCollapsedClassName);dojo.addClass(oSelectDropdownContainer,selectDropdownExpandedClassName);}else
if(dojo.hasClass(oSelectDropdownContainer,selectDropdownExpandedClassName)){dojo.removeClass(oSelectDropdownContainer,selectDropdownExpandedClassName);dojo.addClass(oSelectDropdownContainer,selectDropdownCollapsedClassName);}
if(dojo.hasClass(oScrollContainer,scrollContainerCollapsedClassName)){dojo.removeClass(oScrollContainer,scrollContainerCollapsedClassName);dojo.addClass(oScrollContainer,scrollContainerExpandedClassName);}else
if(dojo.hasClass(oScrollContainer,scrollContainerExpandedClassName)){dojo.removeClass(oScrollContainer,scrollContainerExpandedClassName);dojo.addClass(oScrollContainer,scrollContainerCollapsedClassName);}};dojo.connect(this.oSelected,"onclick",toggleDropdownClass);dojo.connect(oScrollValuesContainer,"onclick",toggleDropdownClass);dojo.connect(document,"onclick",function(event){var isMousePointerinModalContainer=dj.util.Element.contains(oScrollContainer,event.clientX,event.clientY);if(isMousePointerinModalContainer===false){if(dojo.hasClass(oSelectDropdownContainer,selectDropdownExpandedClassName)){dojo.removeClass(oSelectDropdownContainer,selectDropdownExpandedClassName);dojo.addClass(oSelectDropdownContainer,selectDropdownCollapsedClassName);}
if(dojo.hasClass(oScrollContainer,scrollContainerExpandedClassName)){dojo.removeClass(oScrollContainer,scrollContainerExpandedClassName);dojo.addClass(oScrollContainer,scrollContainerCollapsedClassName);}}});if(oScrollBar&&oScrollBar!==null&&oScrollTrack&&oScrollTrack!==null){dojo.require("dj.widget.Slider");var noOfValues=oScrollValuesContainer.children.length;var scrollTrackHeight=parseInt(this.cfg.scrollTrackHeight,10);var scrollValuesDisplayHeight=parseInt(this.cfg.scrollValuesDisplayHeight,10);var scrollBarHeight=parseInt((scrollTrackHeight/(noOfValues/10)),10);dojo.style(oScrollBar,{height:scrollBarHeight+"px"});var scrollValuesTopShiftFactor=(scrollValuesDisplayHeight/scrollTrackHeight)*(noOfValues/10);var moveDropDown=function(value){var sliderPx=slider.translateToPx(value);var sliderPxValue=sliderPx.replace("px","");dojo.style(oScrollValuesContainer,{top:"-"+sliderPxValue*scrollValuesTopShiftFactor+"px"});};var slider=new dj.widget.Slider(oScrollBar,oScrollTrack,{onSlide:moveDropDown,onChange:moveDropDown,axis:'vertical'});var scrollTrackContainerClass=this.cfg.scrollTrackContainerClassName;this.oScrollTrackContainer=dojo.query(scrollTrackContainerClass,oSelectDropdownContainer)[0];var scrollUpArrowClass=this.cfg.dropdownScrollUpArrow;var scrollDownArrowClass=this.cfg.dropdownScrollDownArrow;this.oScrollUpArrow=dojo.query(scrollUpArrowClass,this.oScrollTrackContainer)[0];this.oScrollDownArrow=dojo.query(scrollDownArrowClass,this.oScrollTrackContainer)[0];var scrollArrowShiftValue=parseInt(this.cfg.scrollBarArrowShiftValue,10);var scrollBarTopPx,scrollBarTop,sliderValue;dojo.connect(this.oScrollUpArrow,"onclick",function(event){scrollBarTop=dojo.style(oScrollBar,"top");sliderValue=slider.translateToValue(scrollBarTop-scrollArrowShiftValue);if(scrollBarTop>0){slider.setValue(sliderValue);}});dojo.connect(this.oScrollDownArrow,"onclick",function(event){scrollBarTop=dojo.style(oScrollBar,"top");sliderValue=slider.translateToValue(scrollBarTop+scrollArrowShiftValue);if(scrollBarTop<(scrollTrackHeight-scrollBarHeight)){slider.setValue(sliderValue);}});}}});
dojo.provide("dj.util.account");dojo.require("dj.lang");dj.util.account={getAccountData:function(url,params){params.responseType=(!params.responseType)?"application/json":params.responseType;var isResponseJson=(params.responseType.indexOf("json")>-1);this._sendXhrRequest(url,params,{requestMethod:"GET",handleAs:(isResponseJson)?"json":"text",requestHeaders:{"Accept":params.responseType}});},postAccountData:function(url,postData,params){params.requestType=(!params.requestType)?"application/json":params.requestType;this._sendXhrRequest(url,params,{requestMethod:"POST",content:postData,requestHeaders:{"X-HTTP-Method-Override":"POST","Content-Type":params.requestType}});},putAccountData:function(url,postData,params){this._sendXhrRequest(url,params,{requestMethod:"PUT",content:dojo.toJson(postData),requestHeaders:{"X-HTTP-Method-Override":"PUT","Content-Type":"application/json"}});},_sendXhrRequest:function(requestUrl,userParams,requestOptions){var params=dj.lang.cloneMixin({callback:function(){}},userParams);var options=dj.lang.cloneMixin({requestHeaders:{"Accept":"application/json"},handleAs:"json"},requestOptions);var xhrReq=this._getRequestByMethod(options.requestMethod);var deferred=xhrReq({url:requestUrl,headers:options.requestHeaders,handleAs:options.handleAs,postData:options.content,timeout:dj.context.account.serviceTimeOut,load:function(data,ioargs){params.callback.apply(params.context,[data,ioargs.xhr,params]);},error:function(data,ioargs){console.error("HTTP status code: %s, response: %o",ioargs.xhr.status,data);if(typeof params.errorCallback!=="undefined"){params.errorCallback.apply(params.context,[data.status,ioargs.xhr,params]);}else{params.callback.apply(params.context,[data.status,ioargs.xhr,params]);}}});return deferred;},_getRequestByMethod:function(requestMethod){return(requestMethod=="GET")?dojo.xhrGet:dojo.xhrPost;}};dojo.provide("dj.widget.loader.LoadPageFragment");dojo.require("dj.widget.fragmentloader.FragmentLoader");dojo.require("dj.util.Region");dojo.require("dj.util.User");dojo.require("dj.util.user.EnvironmentDao");dojo.require("dj.util.Url");dojo.declare("dj.widget.loader.LoadPageFragment",null,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.getGreyBckgroundCSSDiv="getGreyBckgroundCSSDiv";this.scrimManagerFile=dj.context.account.scrimManagerFilePath;},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:5.9},init:function(){dojo.query(this._cfg.initNodeClass).connect("click",this,function(ev){this.initLoader(this._cfg.domNodeId,this._cfg.mstPageId,this.scrimCallback,this);});},initScrim:function(){this.initLoader(this._cfg.domNodeId,this._cfg.mstPageId,this.scrimCallback,this);},getScrimContents:function(domNodeId,mstPageId,callback,context){var dao=new dj.util.user.EnvironmentDao(dj.util.Region,dj.util.User);var userEnv=dao.getEnvironment();var loader=new dj.widget.fragmentloader.FragmentLoader(userEnv,mstPageId,this._cfg.version,domNodeId,this._cfg);loader.load();dojo.connect(loader,"onJsLoad",this,function(){if(typeof callback!="undefined"&&typeof callback==='function'){callback.call(context);}});},initLoader:function(domNodeId,mstPageId,callback,context){var domNodeDiv=dojo.byId(domNodeId);if(domNodeDiv!=null&&dj.lang.trim(domNodeDiv.innerHTML)!=""){if(dojo.hasClass(domNodeDiv,"initialLoad")){dojo.removeClass(domNodeDiv,"initialLoad");context.scrimCallback(true);}else{context.showScrim(domNodeId);}}else{if(dojo.byId(this.getGreyBckgroundCSSDiv)==null){dojo.create("div",{id:this.getGreyBckgroundCSSDiv,"class":"login_overlay"},dojo.body(),"last");this.addclassForArticles();}
dojo.destroy("overlayDiv");dojo.create("div",{id:domNodeId},this.getGreyBckgroundCSSDiv,"last");this.getScrimContents(domNodeId,mstPageId,callback,context);}},initIframeLoader:function(height,width){this._cfg.domNodeId="overlayDiv";if(dojo.byId(this._cfg.domNodeId)==null||dj.lang.trim(dojo.byId(this._cfg.domNodeId).innerHTML)==""){if(dojo.byId(this.getGreyBckgroundCSSDiv)==null){dojo.create("div",{id:this.getGreyBckgroundCSSDiv,"class":"login_overlay"},dojo.body(),"last");this.addclassForArticles();}
if(dojo.byId("loginScrimLoader")==null){dojo.create("div",{id:"loginScrimLoader","class":"login_scrim_loader"},this.getGreyBckgroundCSSDiv,"last");dojo.byId("loginScrimLoader").innerHTML='<h4>'+dj.context.account.loading+'</h4>';}
dojo.create("div",{id:this._cfg.domNodeId,"class":"login_scrim_wrapper hidden"},this.getGreyBckgroundCSSDiv,"last");dojo.create("div",{id:"inner","class":"login_scrim_inner"},this._cfg.domNodeId,"last");dojo.create("div",{id:"module","class":"login_scrim_module"},"inner","last");dojo.create("div",{id:"iframe_headerStrap","class":"headerStrap"},"module","last");dojo.byId("iframe_headerStrap").innerHTML='<a href="#" class="closeBtn iframeOverlayCloseBtn">'+dj.context.account.closeText+'</a>';this.addListnerForCloseButton();}else{dojo.addClass(this._cfg.domNodeId,"hidden");if(typeof this.userdata!="undefined"&&(typeof this.userdata.screenName!="undefined"||typeof this.userdata.confScreenName!="undefined")){if(this.userdata.screenName=="LoginVerifyEmail"||this.userdata.confScreenName=="LoginVerifyEmail"||this.userdata.screenName=="UnverifiedFreeReg"||this.userdata.confScreenName=="UnverifiedFreeReg"){this.addListnerForCloseButton();}}}
var iframeId="module"+"iframe";if(dojo.byId(iframeId)==null||dj.lang.trim(dojo.byId(iframeId)).innerHTML==""){this.disableIPadScroll();this.initIFrame("module",height,width);}else{this.fadeScrim(iframeId,300);dojo.removeClass(dojo.byId("module"),"hidden");}},addListnerForCloseButton:function(){dojo.query(".iframeOverlayCloseBtn").connect("click",this,function(ev){dojo.stopEvent(ev);this.enableIPadScroll();dojo.destroy(dojo.byId("moduleiframe"));dojo.destroy(dojo.byId(this.getGreyBckgroundCSSDiv));this.destroyAccountInstanceArr();if(typeof this.userdata!="undefined"&&(typeof this.userdata.screenName!="undefined"||typeof this.userdata.confScreenName!="undefined")){if(this.userdata.screenName=="LoginVerifyEmail"||this.userdata.confScreenName=="LoginVerifyEmail"){parent.location=decodeURIComponent(this.userdata.refreshPageUrlForUnverifiedSub);}else if(this.userdata.screenName=="UnverifiedFreeReg"||this.userdata.confScreenName=="UnverifiedFreeReg"){this.initIFrameForLogout();}}});},enableIPadScroll:function(){document.ontouchmove=function(e){return true;}},disableIPadScroll:function(){document.ontouchmove=function(e){return false;}},initIFrameForLogout:function(){var logoutDomNodeId="unverifiedFreeReglogout";if(dojo.byId(logoutDomNodeId)==null){dojo.create("div",{id:logoutDomNodeId,"class":"hidden"},dojo.body(),"last");}
var url="http://"+document.domain+"/logout";if(window.console)console.log("url for logout "+url);var options={"src":url,"class":"hidden"};setTimeout(this.isUserLoggedout,10000);dj.util.Url.createSimpleIframe(options,logoutDomNodeId,this.testLogoutIframeLoaded,this);},testLogoutIframeLoaded:function(){this.userLoggedOut=true;dojo.destroy("unverifiedFreeReglogout");},isUserLoggedout:function(){if(!this.userLoggedOut){if(window.console)console.warn(" unverified free reg user couldn't be logged out ");}},initIFrame:function(domNodeId,height,width){url=dj.context.account.idDomainToHostScrims+this._cfg.mstPageId+".html?successFileUrl="+
encodeURIComponent("http://"+document.domain+this.scrimManagerFile)+"&currentPageUrl="+encodeURIComponent(this.getPageUrl())
+"&region="+encodeURIComponent(dj.util.Region.getViewByRegion());if(typeof this.userdata!="undefined"){if(typeof this.userdata.refreshPageUrlForUnverifiedSub!="undefined"){var urlValue=this.userdata.refreshPageUrlForUnverifiedSub;this.userdata.refreshPageUrlForUnverifiedSub=encodeURIComponent(urlValue);}
url+="&userdata="+dojo.toJson(this.userdata);}
var options={"src":url,"class":"login_scrim_framed","style":{"height":height,"width":width},"allowTransparency":"true"};dj.util.Url.createSimpleIframe(options,domNodeId,this.iframeLoaded,this);},initScrimFromIframe:function(){this.initIframeLoader(this._cfg.height,this._cfg.width);},iframeLoaded:function(){if(dojo.hasClass(this._cfg.domNodeId,"hidden")){this.fadeScrim(this._cfg.domNodeId,300);if(dojo.byId(this._cfg.domNodeId)!=null){dojo.removeClass(dojo.byId(this._cfg.domNodeId),"hidden");}}},getDomain:function(){var concatURL="";if((typeof gcDomain!=="undefined")&&(gcDomain!==null)&&(gcDomain!=="")){concatURL="http://"+gcDomain;}else{concatURL="http://"+document.domain;}
return concatURL;},getPageUrl:function(){var nonSubscriberHomepagePid=this._cfg.NONSUBSCRIBER_HOMEPAGE_PID;var nonSubscriberSearchPagePid=this._cfg.NONSUBSCRIBER_SEARCH_PAGE_PID;var nonSubNewslettersAlertsPagePid=this._cfg.NONSUBSCRIBER_NEWSLETTERS_ALERTS_PAGE_PID;var mdcPagePid=this._cfg.MDC_PAGE_PID;var concatURL;concatURL=this.getDomain();var oCurrentUrl;if(dojo.isIE){oCurrentUrl=window.location.href;}else{oCurrentUrl=document.location.href;}
var url_value=oCurrentUrl;if(typeof pID!=="undefined"){if(pID===nonSubscriberHomepagePid){url_value=concatURL+this._cfg.HOMEPAGE_SUBSCRIBER_URL;}else if(pID===nonSubNewslettersAlertsPagePid){url_value=concatURL+"/email";}else if(pID===nonSubscriberSearchPagePid){url_value=concatURL+this._cfg.SEARCH_PAGE_SUBSCRIBER_URL;}else if(pID===mdcPagePid){url_value=concatURL+this._cfg.MDC_LINK_URL;}else{url_value=oCurrentUrl;}
var cachebuster=(url_value.indexOf("?")!=-1)?"&":"?";if(typeof cachebuster!==undefined){cachebuster=cachebuster+"_nocache="+new Date().getTime();if(url_value.indexOf("#")!=-1){url_value=url_value.replace("#",cachebuster);}else{url_value=url_value+cachebuster;}}}
return url_value;},initHiddenScrim:function(domNodeId,mstPageId,callback,context){if(typeof mstPageId=="undefined"){mstPageId=this._cfg.mstPageId;}
if(typeof domNodeId=="undefined"){domNodeId=this._cfg.domNodeId;}
if(dojo.byId(domNodeId)==null||dj.lang.trim(dojo.byId(domNodeId).innerHTML)==""){if(dojo.byId(domNodeId)==null){if(dojo.byId(this.getGreyBckgroundCSSDiv)==null){dojo.create("div",{id:this.getGreyBckgroundCSSDiv,"class":"login_overlay"},dojo.body(),"last");this.addclassForArticles();}
dojo.create("div",{id:domNodeId,"class":"hidden initialLoad"},this.getGreyBckgroundCSSDiv,"last");}else{dojo.addClass(dojo.byId(domNodeId),"hidden");}
this.getScrimContents(domNodeId,mstPageId,callback,context);}},fadeScrim:function(domId,fadeDuration){var d=new Date();var _fadeDuration=1000;if(fadeDuration){_fadeDuration=fadeDuration;}
dojo.style(domId,"opacity","0");var fadeArgs={node:domId,duration:_fadeDuration};dojo.fadeIn(fadeArgs).play();},addclassForArticles:function(){if(this.getPageUrl().indexOf("/article/")>0){dojo.addClass(dojo.byId(this.getGreyBckgroundCSSDiv),"article_LIFP");}},setUserdata:function(userdata){this.userdata=userdata;},addToAccountInstanceArr:function(instance){if(typeof dj.module.loader.accountInstanceArr=="undefined"){dj.module.loader.accountInstanceArr=new Array();}
dj.module.loader.accountInstanceArr.push(instance);},addToAccountWidgetInstanceArr:function(instance){},destroyAccountInstanceArr:function(){if(typeof dj.module.loader!="undefined"&&typeof dj.module.loader.accountInstanceArr!="undefined"){while(dj.module.loader.accountInstanceArr.length!=0){var entry=dj.module.loader.accountInstanceArr.pop();if(typeof entry!="undefined"&&typeof entry.destroyObject!="undefined"&&typeof entry.destroyObject=="function"){entry.destroyObject();}}
if(dj.module.loader.accountInstanceArr.length==0){dj.module.loader.accountInstanceArr={};dj.module.loader={};}}}});dojo.provide("dj.widget.loader.FBInitLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.FBInitLoader",[],{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.loadpageFragObj=new dj.widget.loader.LoadPageFragment({version:this._cfg.version});},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,initNodeClass:".connectwithfb",mstPageId:dj.context.account.fbInitPageId,domNodeId:"fbInitDivId"},init:function(){dojo.query(this._cfg.initNodeClass).connect("click",this,function(ev){this.initScrim();});},initScrim:function(){this.isShow=true;if(typeof this.loadStatus!="undefined"){if(this.loadStatus=="loaded"){this.showScrim();}}else{this.loadpageFragObj.initLoader(this._cfg.domNodeId,this._cfg.mstPageId,this.scrimCallback,this);}},initHiddenScrim:function(){if(typeof this.isShow=="undefined"&&typeof this.loadStatus=="undefined"){this.isShow=false;this.loadStatus="loading";this.loadpageFragObj.initHiddenScrim(this._cfg.domNodeId,this._cfg.mstPageId,this.scrimCallback,this);}else{this.isShow=false;}},initScrimFromIframe:function(){this.isShow=true;if(typeof this.loadStatus!="undefined"){if(this.loadStatus=="loaded"){this.showScrim();}}else{this.loadpageFragObj.initLoader(this._cfg.domNodeId,this._cfg.mstPageId,this.scrimCallback,this);}},scrimCallback:function(isFadingRequired){this.loadStatus="loaded";if(typeof this.fbInitdWidget!="undefined"&&this.fbInitdWidget!=null){this.fbInitdWidget.init(this._cfg.domNodeId,isFadingRequired,this.isShow);}else{this.fbInitdWidget=new dj.widget.accountscrim.FBInit(this._cfg);this.fbInitdWidget.init(this._cfg.domNodeId,isFadingRequired,this.isShow);this.loadpageFragObj.addToAccountWidgetInstanceArr(this.fbInitdWidget);}},showScrim:function(){if(typeof this.fbInitdWidget!="undefined"&&this.fbInitdWidget!=null){this.fbInitdWidget.showScrim(this._cfg.domNodeId,true);}else{this.fbInitdWidget=new dj.widget.accountscrim.FBInit(this._cfg);this.fbInitdWidget.showScrim(this._cfg.domNodeId,true);this.loadpageFragObj.addToAccountWidgetInstanceArr(this.fbInitdWidget);}},destroyObject:function(){delete this.fbInitdWidget;}});dojo.provide("dj.widget.loader.FbLoginOrWSJPswdConfirmationLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.FbLoginOrWSJPswdConfirmationLoader",dj.widget.loader.LoadPageFragment,{constructor:function(userdata,cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this._cfg.domNodeId=this.getDomNodeId(userdata);this._cfg.mstPageId=this.getMstPageId(userdata);this.userdata=userdata;},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,height:"370px",width:"678px"},scrimCallback:function(isFadingRequired){if(typeof this.fbLoginOrWSJPswdConfWidget!="undefined"&&this.fbLoginOrWSJPswdConfWidget!=null){this.fbLoginOrWSJPswdConfWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);}else{this.fbLoginOrWSJPswdConfWidget=new dj.widget.accountscrim.Confirmation(this._cfg);this.fbLoginOrWSJPswdConfWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);this.addToAccountWidgetInstanceArr(this.fbLoginOrWSJPswdConfWidget);}},showScrim:function(){if(typeof this.fbLoginOrWSJPswdConfWidget!="undefined"&&this.fbLoginOrWSJPswdConfWidget!=null){this.fbLoginOrWSJPswdConfWidget.showScrim(this._cfg.domNodeId,this.userdata,true);}else{this.fbLoginOrWSJPswdConfWidget=new dj.widget.accountscrim.Confirmation(this._cfg);this.fbLoginOrWSJPswdConfWidget.showScrim(this._cfg.domNodeId,this.userdata,true);this.addToAccountWidgetInstanceArr(this.fbLoginOrWSJPswdConfWidget);}},getDomNodeId:function(userdata){return userdata.screenName+"ConfirmationDivId";},getMstPageId:function(userdata){return dj.context.account.fbLoginOrWSJPswdConfPageId;},destroyObject:function(){delete this.fbLoginOrWSJPswdConfWidget;}});dojo.provide("dj.widget.loader.FbLoginOrWSJPswdLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.FbLoginOrWSJPswdLoader",dj.widget.loader.LoadPageFragment,{constructor:function(userdata,cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.userdata=userdata;},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,domNodeId:"fbLoginOrWSJPswdDivId",mstPageId:dj.context.account.fbLoginOrWSJPswdPageId,height:"370px",width:"678px"},initScrimFromIframe:function(){this.initIframeLoader(this._cfg.height,this._cfg.width);},destroyObject:function(){delete this.fbLoginOrWSJPswdWidget;}});dojo.provide("dj.widget.loader.ForgotPasswordConfirmationLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.ForgotPasswordConfirmationLoader",dj.widget.loader.LoadPageFragment,{constructor:function(userdata,cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this._cfg.domNodeId=this.getDomNodeId(userdata);this._cfg.mstPageId=this.getMstPageId(userdata);this.userdata=userdata;},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,height:"340px",width:"678px"},scrimCallback:function(isFadingRequired){if(typeof this.forgotPasswordConfWidget!="undefined"&&this.forgotPasswordConfWidget!=null){this.forgotPasswordConfWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);}else{this.forgotPasswordConfWidget=new dj.widget.accountscrim.Confirmation(this._cfg);this.forgotPasswordConfWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);this.addToAccountWidgetInstanceArr(this.forgotPasswordConfWidget);}},showScrim:function(){if(typeof this.forgotPasswordConfWidget!="undefined"&&this.forgotPasswordConfWidget!=null){this.forgotPasswordConfWidget.showScrim(this._cfg.domNodeId,this.userdata,true);}else{this.forgotPasswordConfWidget=new dj.widget.accountscrim.Confirmation(this._cfg);this.forgotPasswordConfWidget.showScrim(this._cfg.domNodeId,this.userdata,true);this.addToAccountWidgetInstanceArr(this.forgotPasswordConfWidget);}},getDomNodeId:function(userdata){return userdata.screenName+"ConfirmationDivId";},getMstPageId:function(userdata){return dj.context.account.forgotPasswordConfPageId;},destroyObject:function(){delete this.forgotPasswordConfWidget;}});dojo.provide("dj.widget.loader.ForgotPasswordLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.ForgotPasswordLoader",dj.widget.loader.LoadPageFragment,{constructor:function(userdata,cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.userdata={};},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.4,initNodeClass:".forgotPasswordClass",mstPageId:dj.context.account.forgotPasswordPageId,domNodeId:"forgotPasswordDivId",height:"370px",width:"678px"},init:function(){dojo.query(this._cfg.initNodeClass).connect("click",this,function(ev){this.initIframeLoader(this._cfg.height,this._cfg.width);});},destroyObject:function(){delete this.forgotPasswordWidget;}});dojo.provide("dj.widget.loader.ForgotUsernameConfirmationLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.ForgotUsernameConfirmationLoader",dj.widget.loader.LoadPageFragment,{constructor:function(userdata,cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this._cfg.domNodeId=this.getDomNodeId(userdata);this._cfg.mstPageId=this.getMstPageId(userdata);this.userdata=userdata;},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,height:"370px",width:"678px"},scrimCallback:function(isFadingRequired){if(typeof this.forgotUsernameConfWidget!="undefined"&&this.forgotUsernameConfWidget!=null){this.forgotUsernameConfWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);}else{this.forgotUsernameConfWidget=new dj.widget.accountscrim.Confirmation(this._cfg);this.forgotUsernameConfWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);this.addToAccountWidgetInstanceArr(this.forgotUsernameConfWidget);}},showScrim:function(){if(typeof this.forgotUsernameConfWidget!="undefined"&&this.forgotUsernameConfWidget!=null){this.forgotUsernameConfWidget.showScrim(this._cfg.domNodeId,this.userdata,true);}else{this.forgotUsernameConfWidget=new dj.widget.accountscrim.Confirmation(this._cfg);this.forgotUsernameConfWidget.showScrim(this._cfg.domNodeId,this.userdata,true);this.addToAccountWidgetInstanceArr(this.forgotUsernameConfWidget);}},getDomNodeId:function(userdata){return userdata.screenName+"ConfirmationDivId";},getMstPageId:function(userdata){return dj.context.account.forgotUsernameConfPageId;},destroyObject:function(){delete this.forgotUsernameConfWidget;}});dojo.provide("dj.widget.loader.ForgotUserOrPswdLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.ForgotUserOrPswdLoader",dj.widget.loader.LoadPageFragment,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.userdata={};},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.4,initNodeClass:".forgotUsernameClass",mstPageId:dj.context.account.forgotUsernamePageId,domNodeId:"forgotUsernameDivId",height:"350px",width:"678px"},init:function(){dojo.query(this._cfg.initNodeClass).connect("click",this,function(ev){this.initIframeLoader(this._cfg.height,this._cfg.width);});},initScrimFromIframe:function(){this.initIframeLoader(this._cfg.height,this._cfg.width);},destroyObject:function(){delete this.forgotUsernameWidget;}});dojo.provide("dj.widget.loader.LoginVerifyEmailConfirmationLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.LoginVerifyEmailConfirmationLoader",dj.widget.loader.LoadPageFragment,{constructor:function(userdata,cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this._cfg.domNodeId=this.getDomNodeId(userdata);this._cfg.mstPageId=this.getMstPageId(userdata);this.userdata=userdata;},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,height:"280px",width:"678px"},scrimCallback:function(isFadingRequired){if(typeof this.loginVerifyConfWidget!="undefined"&&this.loginVerifyConfWidget!=null){this.loginVerifyConfWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);}else{this.loginVerifyConfWidget=new dj.widget.accountscrim.Confirmation(this._cfg);this.loginVerifyConfWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);this.addToAccountWidgetInstanceArr(this.loginVerifyConfWidget);}},showScrim:function(){if(typeof this.loginVerifyConfWidget!="undefined"&&this.loginVerifyConfWidget!=null){this.loginVerifyConfWidget.showScrim(this._cfg.domNodeId,this.userdata,true);}else{this.loginVerifyConfWidget=new dj.widget.accountscrim.Confirmation(this._cfg);this.loginVerifyConfWidget.showScrim(this._cfg.domNodeId,this.userdata,true);this.addToAccountWidgetInstanceArr(this.loginVerifyConfWidget);}},getDomNodeId:function(userdata){return userdata.screenName+"ConfirmationDivId";},getMstPageId:function(userdata){return dj.context.account.loginVerifyEmailConfPageId;},destroyObject:function(){delete this.loginVerifyConfWidget;}});dojo.provide("dj.widget.loader.LoginVerifyEmailLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.LoginVerifyEmailLoader",dj.widget.loader.LoadPageFragment,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.userdata={};},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,domNodeId:"loginVerifyEmailDivId",mstPageId:dj.context.account.loginVerifyEmailPageId,height:"400px",width:"678px"},initScrimFromIframe:function(){this.initIframeLoader(this._cfg.height,this._cfg.width);},scrimCallback:function(isFadingRequired){if(typeof this.loginVerifyWidget!="undefined"&&this.loginVerifyWidget!=null){this.loginVerifyWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);}else{this.loginVerifyWidget=new dj.widget.accountscrim.LoginVerifyEmail(this._cfg);this.loginVerifyWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);this.addToAccountWidgetInstanceArr(this.loginVerifyWidget);}},showScrim:function(){if(typeof this.loginVerifyWidget!="undefined"&&this.loginVerifyWidget!=null){this.loginVerifyWidget.showScrim(this._cfg.domNodeId,this.userdata,true);}else{this.loginVerifyWidget=new dj.widget.accountscrim.LoginVerifyEmail(this._cfg);this.loginVerifyWidget.showScrim(this._cfg.domNodeId,this.userdata,true);this.addToAccountWidgetInstanceArr(this.loginVerifyWidget);}},destroyObject:function(){delete this.loginVerifyWidget;}});dojo.provide("dj.widget.loader.ThankYouLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.ThankYouLoader",dj.widget.loader.LoadPageFragment,{constructor:function(userdata,cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.userdata=userdata;},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,domNodeId:"thankYouDivId",mstPageId:dj.context.account.thankYouPageId,height:"280px",width:"678px"},initScrimFromIframe:function(){this.initIframeLoader(this._cfg.height,this._cfg.width);},scrimCallback:function(isFadingRequired){if(typeof this.thankYouWidget!="undefined"&&this.thankYouWidget!=null){this.thankYouWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);}else{this.thankYouWidget=new dj.widget.accountscrim.ThankYou(this._cfg);this.thankYouWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);this.addToAccountWidgetInstanceArr(this.thankYouWidget);}},showScrim:function(){if(typeof this.thankYouWidget!="undefined"&&this.thankYouWidget!=null){this.thankYouWidget.showScrim(this._cfg.domNodeId,this.userdata,true);}else{this.thankYouWidget=new dj.widget.accountscrim.ThankYou(this._cfg);this.thankYouWidget.showScrim(this._cfg.domNodeId,this.userdata,true);this.addToAccountWidgetInstanceArr(this.thankYouWidget);}},destroyObject:function(){delete this.thankYouWidget;}});dojo.provide("dj.widget.loader.UnverifiedFreeRegConfirmationLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.UnverifiedFreeRegConfirmationLoader",dj.widget.loader.LoadPageFragment,{constructor:function(userdata,cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this._cfg.domNodeId=this.getDomNodeId(userdata);this._cfg.mstPageId=this.getMstPageId(userdata);this.userdata=userdata;},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,height:"280px",width:"678px"},scrimCallback:function(isFadingRequired){if(typeof this.unverifiedFreeRegConfWidget!="undefined"&&this.unverifiedFreeRegConfWidget!=null){this.unverifiedFreeRegConfWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);}else{this.unverifiedFreeRegConfWidget=new dj.widget.accountscrim.Confirmation(this._cfg);this.unverifiedFreeRegConfWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);this.addToAccountWidgetInstanceArr(this.unverifiedFreeRegConfWidget);}},showScrim:function(){if(typeof this.unverifiedFreeRegConfWidget!="undefined"&&this.unverifiedFreeRegConfWidget!=null){this.unverifiedFreeRegConfWidget.showScrim(this._cfg.domNodeId,this.userdata,true);}else{this.unverifiedFreeRegConfWidget=new dj.widget.accountscrim.Confirmation(this._cfg);this.unverifiedFreeRegConfWidget.showScrim(this._cfg.domNodeId,this.userdata,true);this.addToAccountWidgetInstanceArr(this.unverifiedFreeRegConfWidget);}},getDomNodeId:function(userdata){return userdata.screenName+"ConfirmationDivId";},getMstPageId:function(userdata){return dj.context.account.unverifiedFreeRegConfPageId;},destroyObject:function(){delete this.unverifiedFreeRegConfWidget;}});dojo.provide("dj.widget.loader.UnverifiedFreeRegLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.UnverifiedFreeRegLoader",dj.widget.loader.LoadPageFragment,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.userdata={};},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,domNodeId:"unverifiedFreeRegDivId",mstPageId:dj.context.account.unverifiedFreeRegPageId,height:"400px",width:"678px"},initScrimFromIframe:function(){this.initIframeLoader(this._cfg.height,this._cfg.width);},scrimCallback:function(isFadingRequired){if(typeof this.unverifiedFreeRegWidget!="undefined"&&this.unverifiedFreeRegWidget!=null){this.unverifiedFreeRegWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);}else{this.unverifiedFreeRegWidget=new dj.widget.accountscrim.LoginVerifyEmail(this._cfg);this.unverifiedFreeRegWidget.init(this._cfg.domNodeId,this.userdata,isFadingRequired);this.addToAccountWidgetInstanceArr(this.unverifiedFreeRegWidget);}},showScrim:function(){if(typeof this.unverifiedFreeRegWidget!="undefined"&&this.unverifiedFreeRegWidget!=null){this.unverifiedFreeRegWidget.showScrim(this._cfg.domNodeId,this.userdata,true);}else{this.unverifiedFreeRegWidget=new dj.widget.accountscrim.LoginVerifyEmail(this._cfg);this.unverifiedFreeRegWidget.showScrim(this._cfg.domNodeId,this.userdata,true);this.addToAccountWidgetInstanceArr(this.unverifiedFreeRegWidget);}},destroyObject:function(){delete this.unverifiedFreeRegWidget;}});dojo.provide("dj.widget.loader.UserWithourEmailConfirmationLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.UserWithourEmailConfirmationLoader",dj.widget.loader.LoadPageFragment,{constructor:function(userdata,cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.userdata=userdata;},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,domNodeId:"userWithoutEmailConfDivId",mstPageId:dj.context.account.userWithoutEmailConfPageId,height:"350px",width:"678px"},scrimCallback:function(isFadingRequired){var userrWithoutEmailConfObj=new dj.widget.accountscrim.UserWithoutEmailConfirmation(this._cfg);userrWithoutEmailConfObj.init(this._cfg.domNodeId,this.userdata,isFadingRequired);},showScrim:function(){var userrWithoutEmailConfObj=new dj.widget.accountscrim.UserWithoutEmailConfirmation(this._cfg);userrWithoutEmailConfObj.showScrim(this._cfg.domNodeId,this.userdata,true);}});dojo.provide("dj.widget.loader.UserWithoutEmailLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.declare("dj.widget.loader.UserWithoutEmailLoader",dj.widget.loader.LoadPageFragment,{constructor:function(userdata,cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.userdata=userdata;},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.5,mstPageId:dj.context.account.userWithoutEmailPageId,domNodeId:"changeUsernameDivId",height:"400px",width:"678px"},chkIfUserWoEmail:function(){var paramString=dojo.queryToObject(window.location.search.slice(1));if(typeof paramString.user!='undefined'&&paramString.user=="welcome"){var that=this;dj.util.User.isLoggedIn(function(isLoggedIn){if(isLoggedIn){if(dojo.byId("userEmailId_temp")!=null){dojo.byId("userEmailId_temp").innerHTML="";}else{dojo.create("div",{id:"userEmailId_temp"},dojo.body());}
dj.util.User.renderEmailAddress("userEmailId_temp");var userEmail=dojo.byId("userEmailId_temp").innerHTML;var verifyEmails=['dupe@wsj.com','cancel@dowjones.com','canceled@wsj.com','cancelled@wsj.com','dup@wsj.com','cancel@wsj.com','dupe@wsj.com','test@test.com','cancel@dj.com','dup@dowjones.com','duplicate@wsj.com','refused@wsj.com'];var contains=dojo.indexOf(verifyEmails,userEmail);if(typeof userEmail=="undefined"||userEmail=="undefined"||userEmail==""||contains>0){that.initIframeLoader(that._cfg.height,that._cfg.width);}}else{}});}},scrimCallback:function(isFadingRequired){var userWithoutEmailObj=new dj.widget.accountscrim.UserWithoutEmail(this._cfg);userWithoutEmailObj.init(this._cfg.domNodeId,isFadingRequired);},showScrim:function(){var userWithoutEmailObj=new dj.widget.accountscrim.UserWithoutEmail(this._cfg);userWithoutEmailObj.showScrim(this._cfg.domNodeId,true);}});dojo.provide("dj.service.account.LoginService");dojo.require("dj.util.account");dojo.require("dj.util.Observer");dj.service.account.LoginService={loginUser:function(url,postData,loadCallback,errorCallback,context){var clientInfo={loadCallback:loadCallback,errorCallback:errorCallback,context:context};dj.util.account.postAccountData(url,postData,{callback:this.handleSuccessResp,errorCallback:this.handleErrorResp,context:this,url:url,responseType:"application/json",clientInfo:clientInfo});},handleErrorResp:function(response,xhr,params){var resp="";var errorsFromSvcArr=new Array();if(xhr.status=='404'||xhr.status=='500'){errorsFromSvcArr[0]="generalError";}else{resp=dojo.fromJson(xhr.responseText);if(typeof resp["user-status"]!="undefined"){errorsFromSvcArr[0]=resp["user-status"];}else{var errorsArr=resp.errors;dojo.forEach(errorsArr,function(entry,i){errorsFromSvcArr[i]=entry.name+entry.status;});}}
params.clientInfo.errorCallback.apply(params.clientInfo.context,[errorsFromSvcArr]);},handleSuccessResp:function(response,xhr,params){if(xhr.status=='200'){params.clientInfo.loadCallback.call(params.clientInfo.context,response);}},testLogin:function(url,postData,loadCallback,errorCallback,context){var clientInfo={loadCallback:loadCallback,errorCallback:errorCallback,context:context};dj.util.account.postAccountData(url,postData,{callback:this.handleLoginSuccess,errorCallback:this.handleLoginError,context:this,url:url,responseType:"application/json",clientInfo:clientInfo});},handleLoginSuccess:function(response,xhr,params){params.clientInfo.loadCallback.call(params.clientInfo.context,response);},handleLoginError:function(response,xhr,params){params.clientInfo.errorCallback.call(params.clientInfo.context,response);}};dojo.provide("dj.service.account.RegistrationService");dojo.require("dj.util.account");dojo.require("dj.util.Observer");dj.service.account.RegistrationService={registerUser:function(url,postData,loadCallback,errorCallback,context){var clientInfo={loadCallback:loadCallback,errorCallback:errorCallback,context:context};dj.util.account.postAccountData(url,postData,{callback:this.handleSuccessResp,errorCallback:this.handleErrorResp,context:this,url:url,responseType:"application/json",requestType:"application/x-www-form-urlencoded;charset="+document.characterSet,clientInfo:clientInfo});},handleErrorResp:function(response,xhr,params){var errorsFromSvcArr=new Array();if(xhr.status=='404'||xhr.status=='500'){errorsFromSvcArr[0]="generalError";}else if(xhr.status==412){var resp=dojo.fromJson(xhr.responseText);if(resp.status=="precondition_failed"){var errorsObj=resp.profile.errors;errorsFromSvcArr[0]=errorsObj.emailAddress;if(typeof errorsObj.emailAddress=="undefined"){errorsFromSvcArr[0]="generalError";}}}
params.clientInfo.errorCallback.apply(params.clientInfo.context,[errorsFromSvcArr]);},handleSuccessResp:function(response,xhr,params){if(xhr.status=='200'){var emailId=response.profile.emailAddress;params.clientInfo.loadCallback.call(params.clientInfo.context,emailId);}},changeUsername:function(url,postData,loadCallback,errorCallback,context){var clientInfo={loadCallback:loadCallback,errorCallback:errorCallback,context:context};dj.util.account.postAccountData(url,postData,{callback:this.handleChangeUsernameSuccessResp,errorCallback:this.handleChangeUsernameErrorResp,context:this,url:url,responseType:"application/json",requestType:"application/x-www-form-urlencoded;charset="+document.characterSet,clientInfo:clientInfo});},handleChangeUsernameErrorResp:function(response,xhr,params){var errorsFromSvcArr=new Array();if(xhr.status=='404'||xhr.status=='500'){errorsFromSvcArr[0]="generalError";}else if(xhr.status==412){var resp=dojo.fromJson(xhr.responseText);if(resp.status=="precondition_failed"){var errorsObj=resp.profile.errors;errorsFromSvcArr[0]=errorsObj.username;if(typeof errorsObj.username=="undefined"){errorsFromSvcArr[0]="generalError";}}}
params.clientInfo.errorCallback.apply(params.clientInfo.context,[errorsFromSvcArr]);},handleChangeUsernameSuccessResp:function(response,xhr,params){if(xhr.status=='200'){var uuid=response.profile.uuid;params.clientInfo.loadCallback.call(params.clientInfo.context,uuid);}},getNodeValue:function(tree,el){return tree.getElementsByTagName(el)[0].firstChild.nodeValue;},getNode:function(tree,el){return tree.getElementsByTagName(el)[0];},getAttribute:function(tree,el){return tree.getAttribute(el);}};dojo.provide("dj.widget.loader.FBConnectedLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.require("dj.util.Ads");dojo.declare("dj.widget.loader.FBConnectedLoader",dj.widget.loader.LoadPageFragment,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,initNodeClass:".connectwithfb",mstPageId:dj.context.account.fbConnectedPageId,domNodeId:"fbConnectedDivId"},initScrimFromIframe:function(){this.initLoader(this._cfg.domNodeId,this._cfg.mstPageId,this.scrimCallback,this);},scrimCallback:function(isFadingRequired){if(typeof this.fbConnectedWidget!="undefined"&&this.fbConnectedWidget!=null){this.fbConnectedWidget.init(this._cfg.domNodeId,isFadingRequired);}else{this.fbConnectedWidget=new dj.widget.accountscrim.FBConnected(this._cfg);this.fbConnectedWidget.init(this._cfg.domNodeId,isFadingRequired);this.addToAccountWidgetInstanceArr(this.fbConnectedWidget);}
new dj.util.Ads().loadAds("facebook2");},showScrim:function(){if(typeof this.fbConnectedWidget!="undefined"&&this.fbConnectedWidget!=null){this.fbConnectedWidget.showScrim(this._cfg.domNodeId,true);}else{this.fbConnectedWidget=new dj.widget.accountscrim.FBConnected(this._cfg);this.fbConnectedWidget.showScrim(this._cfg.domNodeId,true);this.addToAccountWidgetInstanceArr(this.fbConnectedWidget);}
new dj.util.Ads().loadAds("facebook2");},destroyObject:function(){delete this.fbConnectedWidget;}});dojo.provide("dj.widget.loader.LoginLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.require("dj.util.Region");dojo.declare("dj.widget.loader.LoginLoader",dj.widget.loader.LoadPageFragment,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,initNodeClass:".loginClass",mstPageId:dj.context.account.loginOverlayPageId,domNodeId:"loginDivId",scrimManagerFile:"/static_html_files/account/accountScrimManager.html",height:dj.context.account.loginOverlayHeight,width:dj.context.account.loginOverlayWidth,isMobile:false},init:function(){if(window.console)console.log("this._cfg.initNodeClass "+this._cfg.initNodeClass);dojo.query(this._cfg.initNodeClass).connect("click",this,function(ev){dojo.stopEvent(ev);this.redirectIfMobileUser();});},initLoginScrimInIframe:function(){this.initIframeLoader(this._cfg.height,this._cfg.width);},isGermanyProduct:function(){if(dj.util.Region.getViewByRegion()==="germany"){return true;}
return false;},redirectIfMobileUser:function(){var that=this;if(navigator.userAgent.search(/Mobile/i)>-1&&!that.isGermanyProduct()){var deferred=dojo.xhrGet({url:'/static_html_files/mobile/mobileDevices.json',headers:{Accept:'application/json'},handleAs:"json",load:function(data){if(data.hasOwnProperty("deviceList")){var devices;for(devices in data.deviceList){device=data.deviceList[devices];if(new RegExp(device.OS,"i").test(navigator.userAgent)){that._cfg.isMobile=true;break;}}}},error:function(response,ioArgs){console.error("HTTP status code: ",ioArgs.xhr.status);}});deferred.then(function(data){if(that._cfg.isMobile){window.location=dj.context.core.secureLoginPrefix+"/content/public/page/login-mobile.html";}
else{that.initIframeLoader(that._cfg.height,that._cfg.width);}},function(error){console.log("errror"+error);});}
else
{this.initIframeLoader(this._cfg.height,this._cfg.width);}}});dojo.provide("dj.widget.loader.LoaderInstanceFactory");dj.widget.loader.LoaderInstanceFactory={intializeLoader:function(){if(dj.module.loader==null||typeof dj.module.loader=="undefined"){dj.module.loader={};}},getLoginLoaderInstance:function(cfg){this.intializeLoader();if(typeof dj.module.loader.loginLoaderObj=="undefined"||dj.module.loader.loginLoaderObj==null){var cfgObj={};if(typeof cfg!="undefined"){cfgObj={isLoadJs:cfg.isLoadJs,version:cfg.version};}
dj.module.loader.loginLoaderObj=new dj.widget.loader.LoginLoader(cfgObj);dj.module.loader.loginLoaderObj.addToAccountInstanceArr(dj.module.loader.loginLoaderObj);}
return dj.module.loader.loginLoaderObj;},getRegistrationLoaderInstance:function(){this.intializeLoader();if(typeof dj.module.loader.registrationLoaderObj=="undefined"||dj.module.loader.registrationLoaderObj==null){dj.module.loader.registrationLoaderObj=new dj.widget.loader.RegistrationLoader();dj.module.loader.registrationLoaderObj.addToAccountInstanceArr(dj.module.loader.registrationLoaderObj);}
return dj.module.loader.registrationLoaderObj;},getForgotUserOrPswdLoaderInstance:function(userdata){this.intializeLoader();if(typeof dj.module.loader.forgotUserOrPswdLoaderObj=="undefined"||dj.module.loader.forgotUserOrPswdLoaderObj==null){dj.module.loader.forgotUserOrPswdLoaderObj=new dj.widget.loader.ForgotUserOrPswdLoader();dj.module.loader.forgotUserOrPswdLoaderObj.addToAccountInstanceArr(dj.module.loader.forgotUserOrPswdLoaderObj);}
dj.module.loader.forgotUserOrPswdLoaderObj.setUserdata(userdata);return dj.module.loader.forgotUserOrPswdLoaderObj;},getForgotPasswordLoaderInstance:function(userdata){this.intializeLoader();if(typeof dj.module.loader.forgotPasswordLoaderObj=="undefined"||dj.module.loader.forgotPasswordLoaderObj==null){dj.module.loader.forgotPasswordLoaderObj=new dj.widget.loader.ForgotPasswordLoader();dj.module.loader.forgotPasswordLoaderObj.addToAccountInstanceArr(dj.module.loader.forgotPasswordLoaderObj);}
dj.module.loader.forgotPasswordLoaderObj.setUserdata(userdata);return dj.module.loader.forgotPasswordLoaderObj;},getFBInitLoaderInstance:function(cfg){this.intializeLoader();if(typeof dj.module.loader.fbInitLoaderObj=="undefined"||dj.module.loader.fbInitLoaderObj==null){dj.module.loader.fbInitLoaderObj=new dj.widget.loader.FBInitLoader();dj.module.loader.fbInitLoaderObj.loadpageFragObj.addToAccountInstanceArr(dj.module.loader.fbInitLoaderObj);}
return dj.module.loader.fbInitLoaderObj;},getLoginVerifyEmailLoaderInstance:function(userdata){this.intializeLoader();if(typeof dj.module.loader.loginVerifyEmailLoaderObj=="undefined"||dj.module.loader.loginVerifyEmailLoaderObj==null){dj.module.loader.loginVerifyEmailLoaderObj=new dj.widget.loader.LoginVerifyEmailLoader();dj.module.loader.loginVerifyEmailLoaderObj.addToAccountInstanceArr(dj.module.loader.loginVerifyEmailLoaderObj);}
dj.module.loader.loginVerifyEmailLoaderObj.setUserdata(userdata);return dj.module.loader.loginVerifyEmailLoaderObj;},getUnverifiedFreeRegLoaderInstance:function(userdata){this.intializeLoader();if(typeof dj.module.loader.unverifiedFreeRegLoaderObj=="undefined"||dj.module.loader.unverifiedFreeRegLoaderObj==null){dj.module.loader.unverifiedFreeRegLoaderObj=new dj.widget.loader.UnverifiedFreeRegLoader();dj.module.loader.unverifiedFreeRegLoaderObj.addToAccountInstanceArr(dj.module.loader.unverifiedFreeRegLoaderObj);}
dj.module.loader.unverifiedFreeRegLoaderObj.setUserdata(userdata);return dj.module.loader.unverifiedFreeRegLoaderObj;},getFbLoginOrWSJPswdLoaderInstance:function(userdata){this.intializeLoader();if(typeof dj.module.loader.fbLoginOrWSJPswdLoaderObj=="undefined"||dj.module.loader.fbLoginOrWSJPswdLoaderObj==null){dj.module.loader.fbLoginOrWSJPswdLoaderObj=new dj.widget.loader.FbLoginOrWSJPswdLoader();dj.module.loader.fbLoginOrWSJPswdLoaderObj.addToAccountInstanceArr(dj.module.loader.fbLoginOrWSJPswdLoaderObj);}
dj.module.loader.fbLoginOrWSJPswdLoaderObj.setUserdata(userdata);return dj.module.loader.fbLoginOrWSJPswdLoaderObj;},getThankYouLoaderInstance:function(userdata){this.intializeLoader();if(typeof dj.module.loader.thankYouLoaderObj=="undefined"||dj.module.loader.thankYouLoaderObj==null){dj.module.loader.thankYouLoaderObj=new dj.widget.loader.ThankYouLoader();dj.module.loader.thankYouLoaderObj.addToAccountInstanceArr(dj.module.loader.thankYouLoaderObj);}
dj.module.loader.thankYouLoaderObj.setUserdata(userdata);return dj.module.loader.thankYouLoaderObj;},getUserWithourEmailConfirmationLoaderInstance:function(userdata){this.intializeLoader();if(typeof dj.module.loader.userWithourEmailConfirmationLoaderObj=="undefined"||dj.module.loader.userWithourEmailConfirmationLoaderObj==null){dj.module.loader.userWithourEmailConfirmationLoaderObj=new dj.widget.loader.UserWithourEmailConfirmationLoader();dj.module.loader.userWithourEmailConfirmationLoaderObj.addToAccountInstanceArr(dj.module.loader.userWithourEmailConfirmationLoaderObj);}
dj.module.loader.userWithourEmailConfirmationLoaderObj.setUserdata(userdata);return dj.module.loader.userWithourEmailConfirmationLoaderObj;},getFBConnectedLoaderInstance:function(cfg){this.intializeLoader();if(typeof dj.module.loader.fbConnectedLoaderObj=="undefined"||dj.module.loader.fbConnectedLoaderObj==null){dj.module.loader.fbConnectedLoaderObj=new dj.widget.loader.FBConnectedLoader({isLoadJs:cfg.isLoadJs,version:cfg.version});dj.module.loader.fbConnectedLoaderObj.addToAccountInstanceArr(dj.module.loader.fbConnectedLoaderObj);}
return dj.module.loader.fbConnectedLoaderObj;},getConfirmationLoaderInstance:function(userdata){this.intializeLoader();if(typeof userdata!="undefined"){if(userdata.confScreenName==="LoginVerifyEmail"){dojo.require("dj.widget.loader.LoginVerifyEmailConfirmationLoader");if(typeof dj.module.loader.loginVerifyEmailConfirmationLoaderObj=="undefined"||dj.module.loader.loginVerifyEmailConfirmationLoaderObj==null){dj.module.loader.loginVerifyEmailConfirmationLoaderObj=new dj.widget.loader.LoginVerifyEmailConfirmationLoader(userdata);dj.module.loader.loginVerifyEmailConfirmationLoaderObj.addToAccountInstanceArr(dj.module.loader.loginVerifyEmailConfirmationLoaderObj);}
dj.module.loader.loginVerifyEmailConfirmationLoaderObj.setUserdata(userdata);return dj.module.loader.loginVerifyEmailConfirmationLoaderObj;}else if(userdata.confScreenName==="FbLoginOrWSJPswd"){dojo.require("dj.widget.loader.FbLoginOrWSJPswdConfirmationLoader");if(typeof dj.module.loader.fbLoginOrWSJPswdConfirmationLoaderObj=="undefined"||dj.module.loader.fbLoginOrWSJPswdConfirmationLoaderObj==null){dj.module.loader.fbLoginOrWSJPswdConfirmationLoaderObj=new dj.widget.loader.FbLoginOrWSJPswdConfirmationLoader(userdata);dj.module.loader.fbLoginOrWSJPswdConfirmationLoaderObj.addToAccountInstanceArr(dj.module.loader.fbLoginOrWSJPswdConfirmationLoaderObj);}
dj.module.loader.fbLoginOrWSJPswdConfirmationLoaderObj.setUserdata(userdata);return dj.module.loader.fbLoginOrWSJPswdConfirmationLoaderObj;}else if(userdata.confScreenName==="ForgotUsername"){dojo.require("dj.widget.loader.ForgotUsernameConfirmationLoader");if(typeof dj.module.loader.forgotUsernameConfirmationLoaderObj=="undefined"||dj.module.loader.forgotUsernameConfirmationLoaderObj==null){dj.module.loader.forgotUsernameConfirmationLoaderObj=new dj.widget.loader.ForgotUsernameConfirmationLoader(userdata);dj.module.loader.forgotUsernameConfirmationLoaderObj.addToAccountInstanceArr(dj.module.loader.forgotUsernameConfirmationLoaderObj);}
dj.module.loader.forgotUsernameConfirmationLoaderObj.setUserdata(userdata);return dj.module.loader.forgotUsernameConfirmationLoaderObj;}else if(userdata.confScreenName==="ForgotPassword"){dojo.require("dj.widget.loader.ForgotPasswordConfirmationLoader");if(typeof dj.module.loader.forgotPasswordConfirmationLoaderObj=="undefined"||dj.module.loader.forgotPasswordConfirmationLoaderObj==null){dj.module.loader.forgotPasswordConfirmationLoaderObj=new dj.widget.loader.ForgotPasswordConfirmationLoader(userdata);dj.module.loader.forgotPasswordConfirmationLoaderObj.addToAccountInstanceArr(dj.module.loader.forgotPasswordConfirmationLoaderObj);}
dj.module.loader.forgotPasswordConfirmationLoaderObj.setUserdata(userdata);return dj.module.loader.forgotPasswordConfirmationLoaderObj;}else if(userdata.confScreenName==="UnverifiedFreeReg"){dojo.require("dj.widget.loader.UnverifiedFreeRegConfirmationLoader");if(typeof dj.module.loader.unverifiedFreeRegConfirmationLoaderObj=="undefined"||dj.module.loader.unverifiedFreeRegConfirmationLoaderObj==null){dj.module.loader.unverifiedFreeRegConfirmationLoaderObj=new dj.widget.loader.UnverifiedFreeRegConfirmationLoader(userdata);dj.module.loader.unverifiedFreeRegConfirmationLoaderObj.addToAccountInstanceArr(dj.module.loader.unverifiedFreeRegConfirmationLoaderObj);}
dj.module.loader.unverifiedFreeRegConfirmationLoaderObj.setUserdata(userdata);return dj.module.loader.unverifiedFreeRegConfirmationLoaderObj;}}}};dojo.provide("dj.widget.loader.RegistrationLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.require("dj.widget.loader.LoaderInstanceFactory");dojo.declare("dj.widget.loader.RegistrationLoader",dj.widget.loader.LoadPageFragment,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:13.2,initNodeClass:".registerUserClass",mstPageId:dj.context.account.registrationOverlayPageId,domNodeId:"registrationDivId",scrimManagerFile:"/static_html_files/account/accountScrimManager.html",height:dj.context.account.registrationOverlayHeight,width:dj.context.account.registrationOverlayWidth},init:function(){if(window.console)console.log("this._cfg.initNodeClass in reg "+this._cfg.initNodeClass);dojo.query(this._cfg.initNodeClass).connect("click",this,function(ev){this.initIframeLoader(this._cfg.height,this._cfg.width);});},initRegisterScrimInIframe:function(){this.initIframeLoader(this._cfg.height,this._cfg.width);},loadRegistrationRelatedScrims:function(){dj.widget.loader.LoaderInstanceFactory.getThankYouLoaderInstance(this._cfg).initHiddenScrim();}});dojo.provide("dj.widget.loader.FBLoginLoader");dojo.require("dj.widget.loader.LoadPageFragment");dojo.require("dj.widget.loader.LoaderInstanceFactory");dojo.require("dj.widget.loader.FBConnectedLoader");dojo.declare("dj.widget.loader.FBLoginLoader",dj.widget.loader.LoadPageFragment,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);},DEFAULT_CONFIG:{isLoadJs:true,isLoadCss:true,isLoadHtml:true,version:4.2,initNodeClass:".connectwithfb",mstPageId:dj.context.account.fbLoginPageId,domNodeId:"fbLoginDivId",scrimManagerFile:"/static_html_files/account/accountScrimManager.html",height:"660px",width:"678px"},init:function(){this.initIframeLoader(this._cfg.height,this._cfg.width);},loadFBRegistrationRelatedScrims:function(){dj.widget.loader.LoaderInstanceFactory.getFBConnectedLoaderInstance(this._cfg).initHiddenScrim();}});dojo.provide("dj.widget.accountscrim.BaseScrim");dojo.require("dj.util.Form");dojo.require("dj.widget.loader.LoaderInstanceFactory");dojo.require("dj.widget.loader.ForgotUserOrPswdLoader");dojo.require("dj.widget.loader.ForgotPasswordLoader");dojo.require("dj.widget.loader.FBInitLoader");dojo.require("dj.widget.loader.RegistrationLoader");dojo.require("dj.util.Url");dojo.declare("dj.widget.accountscrim.BaseScrim",null,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.PRODUCT_CD=dj.context.account.productCd;this.queryStringList={};this.getGreyBckgroundCSSDiv="getGreyBckgroundCSSDiv";this._constants=this.CONSTANTS;this.successFileUrl=this.getQueryStrParam("successFileUrl");this.currentPageUrl=this.getQueryStrParam("currentPageUrl");this.userdata=this.getQueryStrParam("userdata");this.userdata=dojo.fromJson(this.userdata);this.checkIfMobileUser();},DEFAULT_CONFIG:{},CONSTANTS:{FORGOT_USERNAME_SCREEN:"ForgotUsername",FORGOT_PASSWORD_SCREEN:"ForgotPassword",FB_LOGIN_OR_WSJ_PSWD_SCREEN:"FbLoginOrWSJPswd",UNVERIFIED_FREE_REG:"UnverifiedFreeReg",LOGIN_VERIFY_EMAIL_SCREEN:"LoginVerifyEmail",FORGOT_USERNAME_CONF_SCREEN:"ForgotUsernameConfirmation",FORGOT_PASSWORD_CONF_SCREEN:"ForgotPasswordConfirmation",FB_LOGIN_OR_WSJ_PSWD_CONF_SCREEN:"FbLoginOrWSJPswdConfirmation",UNVERIFIED_FREE_CONF_REG:"UnverifiedFreeRegConfirmation",LOGIN_VERIFY_EMAIL_CONF_SCREEN:"LoginVerifyEmailConfirmation",USER_WITHOUT_EMAIL:"UserWithoutEmail",LOGIN_SCREEN:"Login",SCRIMS_OK_CLOSE_BTN_CLASS:".accountScrimOkOrCloseBtnClass"},checkIfMobileUser:function(){if(typeof dj.context.mobile!=='undefined'){dj.context.account.forgotUserOrPswdPageUrl=dj.context.mobile.forgotUserOrPswdPageUrl;dj.context.account.forgotUsernameConfPageUrl=dj.context.mobile.forgotUsernameConfPageUrl;dj.context.account.forgotPasswordPageUrl=dj.context.mobile.forgotPasswordPageUrl;dj.context.account.forgotPasswordConfPageUrl=dj.context.mobile.forgotPasswordConfPageUrl;dj.context.account.resetPasswordPageUrl=dj.context.mobile.resetPasswordPageUrl;}},hideErrorMessages:function(domId){dojo.addClass(dojo.byId(this._nodes.errorUl),this._nodes.hiddenClass);},hideScrim:function(domId){if(typeof this._nodes.isStandalonePage=="undefined"||!this._nodes.isStandalonePage){if(dojo.byId(domId)!=null){dojo.addClass(dojo.byId(domId),this._nodes.hiddenClass);}}},displayScrim:function(domId,isFadingRequired){if(typeof this._nodes.isStandalonePage=="undefined"||!this._nodes.isStandalonePage){if(typeof isFadingRequired!="undefined"&&isFadingRequired){this.fadeScrim(domId);}
if(dojo.byId(domId)!=null){dojo.removeClass(dojo.byId(domId),this._nodes.hiddenClass);}}},showErrorMessage:function(errorDomId,errorKeyArr){var errorMessage="";if(errorKeyArr.length>0){dojo.forEach(errorKeyArr,function(entry,i){errorMessage+=dojo.byId(entry).innerHTML;},this);var errorUl=dojo.byId(errorDomId);errorUl.innerHTML=errorMessage;dojo.removeClass(errorUl,this._nodes.hiddenClass);if(typeof this._nodes.isIframe!="undefined"&&this._nodes.isIframe){dojo.removeClass(dojo.byId(this._nodes.iframeErrorOverlayDiv),this._nodes.hiddenClass);dojo.connect(dojo.byId(this._nodes.goBackToIframeFrmErr),"click",this,function(event){dojo.addClass(dojo.byId(this._nodes.iframeErrorOverlayDiv),this._nodes.hiddenClass);});}}},addErrorClass:function(fieldName){dojo.addClass(dojo.byId(fieldName),this._nodes.fieldErrorClass);},connectForgotPasswordFromIframe:function(emailAddress){dojo.query(this._nodes.gotoForgotPasswordFromIframe).connect("click",this,function(ev){dojo.stopEvent(ev);if(this._nodes.isStandalonePage){if(typeof emailAddress=="undefined"){window.location=this._nodes.pageUrls.forgotPasswordPageUrl;}else{window.location=this._nodes.pageUrls.forgotPasswordPageUrl+"?userEmailId="+emailAddress;}}else if(this.chkIfHttpsDomain()){parent.location=dj.context.account.forgotPasswordPageUrl;}else{this.initForgotPasswordFromIframe(emailAddress);}});},connectForgotUsernameFromIframe:function(emailAddress){dojo.query(this._nodes.gotoForgotUsernameFromIframe).connect("click",this,function(ev){dojo.stopEvent(ev);if(this._nodes.isStandalonePage){if(typeof emailAddress=="undefined"){window.location=this._nodes.pageUrls.forgotUserOrPswdPageUrl;}else{window.location=this._nodes.pageUrls.forgotUserOrPswdPageUrl+"?userEmailId="+emailAddress;}}else{this.initForgotUsernameFromIframe(emailAddress);}});},connectForgotUsername:function(){dojo.query(this._nodes.gotoForgotUsername).connect("click",this,function(ev){dojo.stopEvent(ev);if(this._nodes.isStandalonePage){window.location=this._nodes.pageUrls.forgotUserOrPswdPageUrl;}else{this.initForgotUserOrPswd();}});},connectForgotPassword:function(){dojo.query(this._nodes.gotoForgotPassword).connect("click",this,function(ev){dojo.stopEvent(ev);if(this._nodes.isStandalonePage){window.location=this._nodes.pageUrls.forgotPasswordPageUrl;}else{this.initForgotPassword();}});},initForgotUserOrPswd:function(){this.hideScrim(this.domNodeId);dj.widget.loader.LoaderInstanceFactory.getForgotUserOrPswdLoaderInstance(this._cfg).initScrim();},initForgotPassword:function(){this.hideScrim(this.domNodeId);dj.widget.loader.LoaderInstanceFactory.getForgotPasswordLoaderInstance(this._cfg).initScrim();},initConfirmation:function(userdata){this.hideScrim(this.domNodeId);dj.widget.loader.LoaderInstanceFactory.getConfirmationLoaderInstance(userdata).initScrim();},initConfirmationFromIframe:function(userdata){document.location=this.successFileUrl+"?userdata="+dojo.toJson(userdata);},initLoginScrim:function(){if(this.domNodeId!=null&&dojo.byId(this.domNodeId)!=null){this.hideScrim(this.domNodeId);dj.widget.loader.LoaderInstanceFactory.getLoginLoaderInstance(this._cfg).initLoginScrimInIframe();}},initRegistration:function(){dj.widget.loader.LoaderInstanceFactory.getRegistrationLoaderInstance(this._cfg).initRegisterScrimInIframe();},initForgotUsernameFromIframe:function(userEmail){if(typeof userEmail=="undefined"){userEmail="";}
var userdata={"screenName":this._constants.FORGOT_USERNAME_SCREEN,"userEmail":userEmail};document.location=this.successFileUrl+"?userdata="+dojo.toJson(userdata);},initLoginFromIframe:function(){var userdata={"screenName":this._constants.LOGIN_SCREEN};document.location=this.successFileUrl+"?userdata="+dojo.toJson(userdata);},initForgotPasswordFromIframe:function(userEmail){if(typeof userEmail=="undefined"){userEmail="";}
var userdata={"screenName":this._constants.FORGOT_PASSWORD_SCREEN,"userEmail":userEmail};document.location=this.successFileUrl+"?userdata="+dojo.toJson(userdata);},initRegistrationFromIframe:function(){var userdata={"screenName":"Registration"};document.location=this.successFileUrl+"?userdata="+dojo.toJson(userdata);},moveOutOfIframe:function(userdata){if(this._nodes.isStandalonePage||this.chkIfHttpsDomain()){parent.dj.widget.loader.ScrimLoaders.callBackFromIframe(dojo.toJson(userdata));}else{if(typeof userdata.refreshPageUrl!="undefined"){parent.location=decodeURIComponent(userdata.refreshPageUrl);}else{document.location=this.successFileUrl+"?userdata="+dojo.toJson(userdata);}}},isChkEnter:function(e){var cKeyCode=e.keyCode||e.which;if(cKeyCode==dojo.keys.ENTER){return true;}
return false;},isChkBackSpace:function(e){var cKeyCode=e.keyCode||e.which;if(cKeyCode==dojo.keys.BACKSPACE){return true;}
return false;},initConnectWithFbNoIframe:function(){dojo.query(this._nodes.connectFB).connect("click",this,function(ev){this.hideScrim(this.domNodeId);dj.widget.loader.LoaderInstanceFactory.getFBInitLoaderInstance(this._cfg).initScrim();});},initConnectWithFB:function(successFileUrl){var userdata={"cfg":this._cfg,"screenName":"FBInit"};this.moveOutOfIframe(userdata);},makeFBConnections:function(successFileUrl){this.makeFBWhatsThisConnection();dojo.query(this._nodes.connectFB).connect("click",this,function(ev){this.initConnectWithFB(successFileUrl);});},makeFBConnectionsNoIframe:function(){this.makeFBWhatsThisConnection();this.initConnectWithFbNoIframe();},makeFBWhatsThisConnection:function(){dojo.query(this._nodes.whatsThisFbClass).connect("click",this,function(ev){dojo.stopEvent(ev);dojo.removeClass(dojo.query(this._nodes.fbToolTipClass)[0],this._nodes.hiddenClass);});dojo.query(this._nodes.fbToolTipCloseClass).connect("click",this,function(ev){dojo.stopEvent(ev);dojo.addClass(dojo.query(this._nodes.fbToolTipClass)[0],this._nodes.hiddenClass);});},makeCloseOrOKButtonConnection:function(domNodeId){dojo.query(this._constants.SCRIMS_OK_CLOSE_BTN_CLASS).connect("click",this,function(ev){this.closeNDestroyGreyBckground(domNodeId,ev);});},closeNDestroyGreyBckground:function(domNodeId,ev){dojo.stopEvent(ev);if(typeof domNodeId!="undefined"&&dojo.byId(domNodeId)!=null){this.hideScrim(domNodeId);}
this.destroyGreyBckground();this.destroyAccountInstanceArr();},destroyGreyBckground:function(){dojo.destroy(this.getGreyBckgroundCSSDiv);},makeCloseOrOKButtonConnectionFromIframe:function(){dojo.query(this._constants.SCRIMS_OK_CLOSE_BTN_CLASS).connect("click",this,function(ev){this.closeFromIframe();});},closeFromIframe:function(){this.destroyAccountInstanceArr();var userdata={"close":"close"};this.moveOutOfIframe(userdata);},hideErrorNPassIndGreen:function(passInd){dojo.addClass(this._nodes.errorUl,this._nodes.hiddenClass);this.updatePasswordInd(passInd,this._nodes.passIndClassGreen);},chkEmpty:function(value){if(typeof value!="undefined"){if(dj.lang.trim(value)===""){return false;}else{return true;}}
return false;},updatePasswordInd:function(spanId,value){var span=dojo.byId(spanId);span.className=value;},isValidEmailAddress:function(emailAddress){return dj.util.Form.validateEmailAddresses(emailAddress);},chkEmailAddress:function(emailAddress){if(!this.chkEmpty(emailAddress)){this.errorArr.push(this._nodes.emailIdrequired);return false;}else{if(!this.isValidEmailAddress(emailAddress)){this.errorArr.push(this._nodes.invalidemailFormat);return false;}}
return true;},chkPasswordLength:function(element1,passInd,errorDomId){if(typeof element1!="undefined"){var value=element1.value;if(typeof value!="undefined"){if(dj.lang.trim(value).length<5){if(dojo.indexOf(this.errorArr,this._nodes.passwordTooShort)<0){this.errorArr.push(this._nodes.passwordTooShort);}}else if(dj.lang.trim(value).length>15){if(dojo.indexOf(this.errorArr,this._nodes.passwordTooLong)<0){this.errorArr.push(this._nodes.passwordTooLong);}}else{this.updatePasswordInd(passInd,this._nodes.passIndClassGreen);return true;}}}
this.updatePasswordInd(passInd,this._nodes.passIndClassRed);return false;},chkPasswordMatch:function(password1,password2,errorDomId){if(typeof password1!="undefined"&&typeof password2!="undefined"){if(typeof password1.value!="undefined"&&typeof password2.value!="undefined"){if(dj.lang.trim(password1.value)===dj.lang.trim(password2.value)){this.hideErrorNPassIndGreen(this._nodes.newPassInd);this.hideErrorNPassIndGreen(this._nodes.confirmPassInd);return true;}}}
this.updatePasswordInd(this._nodes.confirmPassInd,this._nodes.passIndClassRed);this.errorArr.push(this._nodes.passwordDoNotMatch);return false;},validateNewPassword:function(){var validation=true;if(!this.chkEmpty(this.oNewPassword.value)){if(dojo.indexOf(this.errorArr,this._nodes.newPasswordRequired)<0){this.errorArr.push(this._nodes.newPasswordRequired);}
this.updatePasswordInd(this._nodes.newPassInd,this._nodes.passIndClassRed);validation=false;}else if(!this.chkPasswordLength(this.oNewPassword,this._nodes.newPassInd,this._nodes.errorUl)){validation=false;}else if(!this.chkPasswordSplChars(this.oNewPassword,this._nodes.newPassInd,this._nodes.errorUl)){validation=false;}
if(validation){this.hideErrorNPassIndGreen(this._nodes.newPassInd);}
return validation;},validateConfirmPassword:function(){var validation=true;if(!this.chkEmpty(this.oConfirmPassword.value)){if(dojo.indexOf(this.errorArr,this._nodes.confirmPasswordRequired)<0){this.errorArr.push(this._nodes.confirmPasswordRequired);}
this.updatePasswordInd(this._nodes.confirmPassInd,this._nodes.passIndClassRed);validation=false;}else if(!this.chkPasswordLength(this.oConfirmPassword,this._nodes.confirmPassInd,this._nodes.errorUl)){validation=false;}else if(!this.chkPasswordSplChars(this.oConfirmPassword,this._nodes.confirmPassInd,this._nodes.errorUl)){validation=false;}
if(validation){this.hideErrorNPassIndGreen(this._nodes.confirmPassInd);}
return validation;},initForgotPasswordPage:function(){var emailId=dojo.byId(this._nodes.userEmailId);document.location=this._nodes.pageUrls.forgotPasswordPageUrl;},getQueryStrParam:function(param,location){if(typeof this.queryStringList[param]=="undefined"){var url="";if(typeof location=="undefined"){url=window.location.toString();}else{url=location.toString();}
url.match(/\?(.+)$/);var params=RegExp.$1;var params=params.split("&");for(var i=0;i<params.length;i++){var tmp=params[i].split("=");this.queryStringList[tmp[0]]=unescape(tmp[1]);}}
return this.queryStringList[param];},hideFormFactor:function(classToHide){dojo.addClass(dojo.query(classToHide)[0],"hidden");},fadeScrim:function(domId,fadeDuration){var d=new Date();var _fadeDuration=500;if(fadeDuration){_fadeDuration=fadeDuration;}
dojo.style(domId,"opacity","0");var fadeArgs={node:domId,duration:_fadeDuration};dojo.fadeIn(fadeArgs).play();},getPageUrl:function(){var nonSubscriberHomepagePid=this._cfg.NONSUBSCRIBER_HOMEPAGE_PID;var nonSubscriberSearchPagePid=this._cfg.NONSUBSCRIBER_SEARCH_PAGE_PID;var nonSubNewslettersAlertsPagePid=this._cfg.NONSUBSCRIBER_NEWSLETTERS_ALERTS_PAGE_PID;var mdcPagePid=this._cfg.MDC_PAGE_PID;var concatURL;if((typeof gcDomain!=="undefined")&&(gcDomain!==null)&&(gcDomain!=="")){concatURL="http://"+gcDomain;}else{concatURL="http://"+document.domain;}
var oCurrentUrl;oCurrentUrl=parent.window.location.href;var url_value=oCurrentUrl;if(typeof pID!=="undefined"){if(this._nodes.isStandalonePage){url_value=concatURL+this._cfg.HOMEPAGE_SUBSCRIBER_URL;}else{if(pID===nonSubscriberHomepagePid){url_value=concatURL+this._cfg.HOMEPAGE_SUBSCRIBER_URL;}else if(pID===nonSubNewslettersAlertsPagePid){url_value=concatURL+"/email";}else if(pID===nonSubscriberSearchPagePid){url_value=concatURL+this._cfg.SEARCH_PAGE_SUBSCRIBER_URL;}else if(pID===mdcPagePid){url_value=concatURL+this._cfg.MDC_LINK_URL;}else{url_value=oCurrentUrl;}}
var cachebuster=(url_value.indexOf("?")!=-1)?"&":"?";if(typeof cachebuster!==undefined){cachebuster=cachebuster+"_nocache="+new Date().getTime();if(url_value.indexOf("#")!=-1){url_value=url_value.replace("#",cachebuster+"#");}else{url_value=url_value+cachebuster;}}}
return url_value;},chkPasswordSplChars:function(element1,passInd,errorDomId){if(typeof element1!="undefined"){var value=element1.value;if(typeof value!="undefined"){var validate=true;var iChars="!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_ ";for(var i=0;i<value.length;i++){if(iChars.indexOf(value.charAt(i))!=-1){validate=false;}}
if(!validate){if(dojo.indexOf(this.errorArr,this._nodes.invalidCharacters)<0){this.errorArr.push(this._nodes.invalidCharacters);}}else{this.updatePasswordInd(passInd,this._nodes.passIndClassGreen);return true;}}}
this.updatePasswordInd(passInd,this._nodes.passIndClassRed);return false;},resizeIframe:function(){if(dojo.byId("moduleiframe")!=null&&typeof dojo.byId("moduleiframe")!="undefined"){var divHeight=dojo.query(".loginModule")[0].clientHeight?dojo.query(".loginModule")[0].clientHeight:0;if(divHeight!=0){dojo.byId("moduleiframe").style.height=divHeight;}}},addClassToBody:function(){dojo.addClass(dojo.body(),"loginForm_content");},chkIfHttpsDomain:function(){try{if(typeof parent.window.location.href!="undefined"&&parent.window.location.href.indexOf("https://")>-1){return true;}
return false;}catch(e){return false;}},lifpOmnitureTracking:function(trackValues,events,pName){setMetaData("pagename",pName);pName=pName.replace("WSJ_","");setMetaData("apage","WSJ_Customer Resources_"+pName);setMetaData("atype","WSJ_Customer Resourcess_"+pName);setMetaData("section","Customer Resources");setMetaData("subsection","WSJ_Login");setMetaData("csource","Customer Resources");setMetaData("ctype","marketing and support");setMetaData("basesection","WSJ_Customer Resources_Login");if(typeof trackValues!="undefined"&&trackValues.length>0){for(index=0;index<trackValues.length;index++){setMetaData(trackValues[index][0],trackValues[index][1]);}}
if(typeof events!="undefined"){s.events=events;}
dj.util.Tracking.omniture.firePixel(true);},destroyIframe:function(){parent.dojo.destroy("moduleiframe");parent.dojo.destroy("overlayDiv");},destroyAccountInstanceArr:function(){if(typeof dj.module.loader!="undefined"&&typeof dj.module.loader.accountInstanceArr!="undefined"){while(dj.module.loader.accountInstanceArr.length!=0){var entry=dj.module.loader.accountInstanceArr.pop();if(typeof entry!="undefined"&&typeof entry.destroyObject!="undefined"&&typeof entry.destroyObject=="function"){entry.destroyObject();}}
if(dj.module.loader.accountInstanceArr.length==0){dj.module.loader.accountInstanceArr={};dj.module.loader={};}}},logoutTheUnverifiedFreeRegUser:function(){this.destroyAccountInstanceArr();var userdata={"logout":"logout"};this.moveOutOfIframe(userdata);}});dojo.provide("dj.widget.accountscrim.FBConnected");dojo.require("dj.widget.accountscrim.BaseScrim");dojo.require("dj.util.User");dojo.declare("dj.widget.accountscrim.FBConnected",dj.widget.accountscrim.BaseScrim,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.fragmentLoaded=false;this._nodes=this.WIDGET_CONFIG;this.errorArr=new Array();},DEFAULT_CONFIG:{isLoadJs:true,version:4.3,NONSUBSCRIBER_HOMEPAGE_PID:"0_0_WH_0001_public",NONSUBSCRIBER_SEARCH_PAGE_PID:"3_0466",NONSUBSCRIBER_NEWSLETTERS_ALERTS_PAGE_PID:"5_6007",MDC_PAGE_PID:"2_3000",HOMEPAGE_SUBSCRIBER_URL:"/",SEARCH_PAGE_SUBSCRIBER_URL:"/search",MDC_LINK_URL:"/mdc/page/marketsdata.html"},WIDGET_CONFIG:{closeButton:".closeBtn",tryagain:".tryagian",hiddenClass:"hidden"},init:function(domNodeId,isFadingRequired){this.displayScrim(domNodeId,isFadingRequired);this.domNodeId=domNodeId;this.makeWidgetConnections();if(typeof dj.module.facebook!="undefined"&&typeof dj.module.facebook.connect!="undefined"){if(typeof FB=="undefined"){dj.module.facebook.connect.init(this.updateUserInfo);}else{this.updateUserInfo();}}else{if(window.console)console.warn(" In {FBConnected.js} dj.module.facebook.connect is not found, please make the required js file available");}},setOmnitureTracking:function(){var trackValues=new Array();var pName="";pName="WSJ_Auth_FBConnect_Thank_You_Original";dj.util.User.isSubLoggedIn(function(subLoggedIn){if(subLoggedIn){trackValues[0]=new Array("caccess","sub");}else{trackValues[0]=new Array("caccess","reg");}});this.lifpOmnitureTracking(trackValues,"event12,evenr57",pName);},showScrim:function(domNodeId,isFadingRequired){this.domNodeId=domNodeId;this.displayScrim(domNodeId,isFadingRequired);this.setOmnitureTracking();},makeWidgetConnections:function(){this.makeCloseOrOKButtonConnection(this.domNodeId);dojo.query(".login_invite").connect("click",this,function(ev){this.closeNDestroyGreyBckground(this.domNodeId,ev);FB.ui({method:'apprequests',message:'You should learn more about this awesome game.',data:'tracking information for the user'});});},updateUserInfo:function(){var that=this;if(typeof FB!="undefined"){FB.api('/me',function(response){if(!response||response.error){}else{dojo.byId("name").innerHTML=response.first_name+" "+response.last_name;}});}}});dojo.provide("dj.widget.accountscrim.Registration");dojo.require("dj.widget.accountscrim.BaseScrim");dojo.require("dj.util.Form");dojo.require("dj.service.account.RegistrationService");dojo.declare("dj.widget.accountscrim.Registration",dj.widget.accountscrim.BaseScrim,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.fragmentLoaded=false;this._nodes=this.WIDGET_CONFIG;this.errorArr=new Array();},DEFAULT_CONFIG:{isLoadJs:true,version:4.2},WIDGET_CONFIG:{serviceUrls:{registrationServiceUrl:"/epiton/registration/v2/profile"},closeButton:"registrationClose",firstName:"firstName",lastName:"lastName",emailToRegister:"emailToRegister",newPassword:"newPassword",confirmPassword:"confirmPassword",companySize:"companySize",registerNow:"registerNow",newPassInd:"newPassInd",confirmPassInd:"confirmPassInd",jobTitleDropDown:"jobTitleDropDown",passIndClassRed:"validate no",passIndClassGreen:"validate yes",hiddenClass:"hidden",gotoLogin:".loginClass",gotoForgotPasswordFromIframe:".forgotPasswordFromIframeClass",registrationIframeForm:"registrationIframeForm",errorUl:"registrationErrorUl",goBackToIframeFrmErr:"goBackToIframeFrmErr",fieldErrorClass:"errorState",isIframe:false,iframeErrorOverlayDiv:"iframeErrorOverlayDiv",firstNameRequired:"firstNameRequired",lastNameRequired:"lastNameRequired",invalidemailFormat:"invalidemailFormat",emailIdrequired:"emailIdrequired",newPasswordRequired:"newPasswordRequired",confirmPasswordRequired:"confirmPasswordRequired",privacyPolicyRequired:"privacyPolicyRequired",passwordTooShort:"passwordTooShort",passwordTooLong:"passwordTooLong",invalidCharacters:"invalidCharacters",passwordDoNotMatch:"passwordDoNotMatch",passwordSuggestion:".pw_suggestion",passwordSuggestionClose:".pw_tooltip",generalError:"generalError",emailAddressexists:"emailAddressexists",emailAddressinvalid:"emailAddressinvalid",connectFB:".connectwithfb",whatsThisFbClass:".whatsThisFbClass",fbToolTipClass:".fb_tooltip",fbToolTipCloseClass:".fb-close-tooltip-btn"},init:function(domNodeId){this.addClassToBody();this.successFileUrl=this.getQueryStrParam("successFileUrl");this.numOfLoginAttempts=0;this.domNodeId=domNodeId;this.makeWidgetConnections();this.makeFBConnections(this.successFileUrl);this.setOmnitureTracking();},setOmnitureTracking:function(){var trackValues=new Array();var pName="WSJ_FreeReg_Login_FreeReg_Form";trackValues[0]=new Array("basesection","WSJ_Free_Reg");trackValues[1]=new Array("subsection","WSJ_Free_Reg");trackValues[2]=new Array("caccess","free");this.lifpOmnitureTracking(trackValues,"event12",pName);},showScrim:function(domNodeId){this.domNodeId=domNodeId;this.displayScrim(domNodeId);this.hideErrorMessages(this._nodes.errorUl);this.setOmnitureTracking();},makeWidgetConnections:function(){this.fragmentLoaded=true;this.oFirstName=dojo.byId(this._nodes.firstName);this.oLastName=dojo.byId(this._nodes.lastName);this.oEmailToRegister=dojo.byId(this._nodes.emailToRegister);this.oNewPassword=dojo.byId(this._nodes.newPassword);this.oConfirmPassword=dojo.byId(this._nodes.confirmPassword);this.oCompanySize=dojo.byId(this._nodes.companySize);this.oRegisterNow=dojo.byId(this._nodes.registerNow);if(this.oFirstName!==null){dojo.connect(this.oFirstName,"onfocus",this,function(event){dj.util.Form.clearValue(this.oFirstName,"First Name");});dojo.connect(this.oFirstName,"onclick",this,function(event){dj.util.Form.clearValue(this.oFirstName,"First Name");});}
dojo.connect(dojo.byId("registrationIframeForm"),"onsubmit",this,function(e){dojo.stopEvent(e);this.submitForm();});dojo.connect(dojo.byId(this._nodes.closeButton),"click",this,function(ev){dojo.stopEvent(ev);dojo.addClass(dojo.byId(this.domNodeId),this._nodes.hiddenClass);});if(this.oNewPassword!==null){this.oNewPassword.type="password";}
if(this.oConfirmPassword!==null){this.oConfirmPassword.type="password";}
dojo.connect(this.oNewPassword,"keyup",this,function(e){if(this.oNewPassword.value==""&&!(this.isChkEnter(e))){dojo.removeClass(dojo.byId("newPassInd"),"validate no");dojo.removeClass(dojo.byId("newPassInd"),"validate yes");dojo.removeClass(dojo.byId("newPassword"),"errorState");}});dojo.connect(this.oConfirmPassword,"keyup",this,function(e){if(this.oConfirmPassword.value==""&&!(this.isChkEnter(e))){dojo.removeClass(dojo.byId("confirmPassInd"),"validate no");dojo.removeClass(dojo.byId("confirmPassInd"),"validate yes");dojo.removeClass(dojo.byId("confirmPassword"),"errorState");}});dojo.query(this._nodes.passwordSuggestion).connect("click",this,function(ev){dojo.removeClass(dojo.byId("pwSuggestion"),"hidden");});dojo.query(this._nodes.passwordSuggestionClose).connect("click",this,function(ev){dojo.addClass(dojo.byId("pwSuggestion"),"hidden");});dojo.query(this._nodes.gotoLogin).connect("click",this,function(ev){if(this.chkIfHttpsDomain()){var userdata={"close":"close"};this.moveOutOfIframe(userdata);}else{this.initLoginFromIframe(this.successFileUrl);}});},submitForm:function(){this.clearRedBoundaryFromFields();if(!this.validateForm()){return;}
dojo.byId(this._nodes.errorUl).innerHTML="";var jobTitle=dojo.byId(this._nodes.jobTitleDropDown);var postData="profile.firstName="+this.oFirstName.value;postData+="&profile.lastName="+this.oLastName.value;postData+="&profile.emailAddress="+this.oEmailToRegister.value;postData+="&profile.password="+this.oNewPassword.value;postData+="&profile.passwordConfirmation="+this.oConfirmPassword.value;postData+="&service.prodct=wsj-online&service.templateCode="+this.PRODUCT_CD;postData+="&service.registrationType=FREE_REGISTRATION";if(typeof jobTitle!="undefined"&&jobTitle.value!=""){postData+="&profile.demographics.questionId1=dt_job_title&profile.demographics.answer1="+jobTitle.value;}
dj.service.account.RegistrationService.registerUser(this._nodes.serviceUrls.registrationServiceUrl,postData,this.load,this.error,this);},load:function(emailId){var userdata={"screenName":"RegistrationConfirmation","emailId":encodeURIComponent(emailId),"firstName":encodeURIComponent(this.oFirstName.value),"lastName":encodeURIComponent(this.oLastName.value)}
this.moveOutOfIframe(userdata);},error:function(errorsArr){dojo.forEach(errorsArr,function(entry,i){if(entry.indexOf("-")>-1){entry=entry.replace(/-/g,"");errorsArr[i]=entry;}},this);this.showErrorMessage(this._nodes.errorUl,errorsArr);var isEmailAlreadyExistError=false;dojo.forEach(errorsArr,function(entry,i){if(entry==this._nodes.emailAddressexists||entry==this._nodes.emailAddressinvalid){this.addErrorClass(this._nodes.emailToRegister);if(entry==this._nodes.emailAddressexists){isEmailAlreadyExistError=true;}}},this);if(isEmailAlreadyExistError){var trackValues=new Array();var pName="WSJ_Auth_WSJ_Registration_Scrim Email Already Exists";this.lifpOmnitureTracking(trackValues,"event12",pName);}
this.connectForgotPasswordFromIframe();},validateForm:function(){var validation=true;if(!this.chkEmpty(this.oFirstName.value)){this.errorArr.push(this._nodes.firstNameRequired);this.addErrorClass(this._nodes.firstName);validation=false;}
if(!this.chkEmpty(this.oLastName.value)){this.errorArr.push(this._nodes.lastNameRequired);this.addErrorClass(this._nodes.lastName);validation=false;}
var emailValidation=this.chkEmailAddress(this.oEmailToRegister.value);if(!emailValidation){this.addErrorClass(this._nodes.emailToRegister);}
validation=validation?emailValidation:false;var newPassValidation=this.validateNewPassword();if(!newPassValidation){this.addErrorClass(this._nodes.newPassword);}
var confirmPassValidation=this.validateConfirmPassword();if(!confirmPassValidation){this.addErrorClass(this._nodes.confirmPassword);}
validation=validation?newPassValidation?confirmPassValidation:false:false;if(newPassValidation&&confirmPassValidation){if(!this.chkPasswordMatch(this.oNewPassword,this.oConfirmPassword,this._nodes.errorUl)){this.addErrorClass(this._nodes.confirmPassword);validation=false;}}
if(dojo.byId("privacypolicybox")){if(dojo.byId("privacypolicybox").checked==false)
{this.errorArr.push(this._nodes.privacyPolicyRequired);validation=false;}}
this.showErrorNClearArray();return validation;},showErrorNClearArray:function(){this.showErrorMessage(this._nodes.errorUl,this.errorArr);this.errorArr=new Array();},highlightTheErrorField:function(errorKeyArr){dojo.forEach(errorKeyArr,function(entry,i){if(entry==this._nodes.usernamemissing){this.addErrorClass(this._nodes.userOrEmailInput);}
if(entry==this._nodes.passwordmissing){this.addErrorClass(this._nodes.password);}},this);},clearRedBoundaryFromFields:function(){dojo.removeClass(dojo.byId(this._nodes.firstName),this._nodes.fieldErrorClass);dojo.removeClass(dojo.byId(this._nodes.lastName),this._nodes.fieldErrorClass);dojo.removeClass(dojo.byId(this._nodes.emailToRegister),this._nodes.fieldErrorClass);dojo.removeClass(dojo.byId(this._nodes.newPassword),this._nodes.fieldErrorClass);dojo.removeClass(dojo.byId(this._nodes.confirmPassword),this._nodes.fieldErrorClass);}});dojo.provide("dj.widget.accountscrim.BaseLogin");dojo.require("dj.widget.accountscrim.BaseScrim");dojo.require("dj.util.Form");dojo.require("dj.service.account.LoginService");dojo.require("dj.util.User");dojo.declare("dj.widget.accountscrim.BaseLogin",dj.widget.accountscrim.BaseScrim,{constructor:function(cfg){},submitForm:function(loginData){this.clearRedBoundaryFromFields();if(!this.validateForm(loginData)){return;}
dojo.byId(this._nodes.errorUl).innerHTML="";if(this._nodes.isStandalonePage){if(this._nodes.isAmazonOffer){this.currentPageUrl=this._nodes.shopnbuyUrl;}else if(this._nodes.loginTargetUrl){this.currentPageUrl=this._nodes.loginTargetUrl;}else{this.currentPageUrl=this.getPageUrl();}}
var url="";if(this.currentPageUrl.indexOf("?")>-1){url=encodeURIComponent(this.currentPageUrl+"&user=welcome");}else{url=encodeURIComponent(this.currentPageUrl+"?user=welcome");}
var postData={"username":dj.lang.trim(loginData.username),"password":loginData.password,"url":encodeURIComponent(dj.context.account.testLogin)+"?currentPageUrl="+url,"template":"default","realm":"default","savelogin":loginData.savelogin};dj.service.account.LoginService.loginUser(this._nodes.serviceUrls.loginServiceUrl,dojo.toJson(postData),this.load,this.error,this);},setupLoginData:function(){var savelogin=dojo.byId(this._nodes.savelogin).checked+"";var loginData={"username":this.oUserName.value,"password":this.oPassword.value,"savelogin":savelogin,"errorUI":this._nodes.errorUl}
return loginData;},load:function(data){var userEmail="";if(typeof data.status!="undefined"){if(!this.isValidEmailAddress(data.username)){if(dojo.byId("userEmailIdToResendEmail")!=null){dojo.byId("userEmailIdToResendEmail").innerHTML="";}else{dojo.create("div",{id:"userEmailIdToResendEmail"},dojo.body());}
dj.util.User.renderEmailAddress("userEmailIdToResendEmail");userEmail=dojo.byId("userEmailIdToResendEmail").innerHTML;}else{userEmail=data.username;}
if(data.status==this._nodes.unverifiedsubscriber){this.isUnverifiedSubscriber=true;this.loginVerifyEmailUserdata={"screenName":this._constants.LOGIN_VERIFY_EMAIL_SCREEN,"uuid":data.uuid,"productCode":this.PRODUCT_CD,"userEmail":userEmail,"refreshPageUrlForUnverifiedSub":encodeURIComponent(this.currentPageUrl)}
if(dojo.byId("unverifiedFreeRegOrSub")==null){dojo.create("div",{id:"unverifiedFreeRegOrSub","class":"hidden"},dojo.body(),"last");}}else if(data.status==this._nodes.unverifiedfreereg){this.isUnverifiedFreeReg=true;this.unverifiedFreeRegUserdata={"screenName":this._constants.UNVERIFIED_FREE_REG,"uuid":data.uuid,"productCode":this.PRODUCT_CD,"userEmail":userEmail}
if(dojo.byId("unverifiedFreeRegOrSub")==null){dojo.create("div",{id:"unverifiedFreeRegOrSub","class":"hidden"},dojo.body(),"last");}}}
if(this._nodes.isStandalonePage&&typeof this.isUnverifiedSubscriber=="undefined"&&typeof this.isUnverifiedFreeReg=="undefined"){window.location=data.url;}else{dojo.create("div",{id:"testLoginContainer"},dojo.body(),"last");this.initIFrame("testLoginContainer",0,0,data.url);}},error:function(errorsArr){if(this._nodes.fbConnectLogin){dojo.removeClass(dojo.byId("fbconnect"),"disabled");dojo.removeClass(dojo.byId("loginSubmit"),"disabled");}
var addingNewGotoFUPLink="N";this.numOfLoginAttempts++;dojo.forEach(errorsArr,function(entry,i){if(entry.indexOf("-")>-1){entry=entry.replace(/-/g,"");errorsArr[i]=entry;if(entry===this._nodes.usernameinvalidcredentials&&this.numOfLoginAttempts>2){errorsArr[i]=this._nodes.morethan2invalidcredentials;addingNewGotoFUPLink="Y";};if(entry===this._nodes.facebookconnected){var userdata={"screenName":this._constants.FB_LOGIN_OR_WSJ_PSWD_SCREEN,"username":this.oUserName.value,"productCode":this.PRODUCT_CD}
this.moveOutOfIframe(userdata);};}},this);this.showErrorMessage(this._nodes.errorUl,errorsArr);if(errorsArr.length>0){this.clearRedBoundaryFromFields();this.focusOnError();}
if(addingNewGotoFUPLink==="Y"){this.connectForgotUsernameFromIframe();this.connectForgotPasswordFromIframe();}
var trackValues=new Array();var pName="";var trackValues=new Array();if(this._nodes.fbConnectLogin){pName="WSJ_Auth_WSJ/Barrons_Login_Page_Post_FBConnect Invalid Login Credentials";}else{if(this._nodes.isStandalonePage){pName="WSJ_Auth_WSJ_Login_Page Bad Credentials page";}else{pName="WSJ_Auth_WSJ_Login_Scrim Bad Credentials page";}}
this.lifpOmnitureTracking(trackValues,"event12",pName);},gotoSubscribePage:function(){var userdata={};if(dj.util.Region.getViewByRegion()=="asia,india")
{this._nodes.subscribeFromLoginPage=dj.context.account.india_subscribeFromLoginPage;this._nodes.subscribeFromLoginOverlay=dj.context.account.india_subscribeFromLoginOverlay;}else if(dj.util.Region.getViewByRegion()=="asia")
{this._nodes.subscribeFromLoginPage=dj.context.account.asia_subscribeFromLoginPage;this._nodes.subscribeFromLoginOverlay=dj.context.account.asia_subscribeFromLoginOverlay;}else if(dj.util.Region.getViewByRegion()=="europe")
{this._nodes.subscribeFromLoginPage=dj.context.account.europe_subscribeFromLoginPage;this._nodes.subscribeFromLoginOverlay=dj.context.account.europe_subscribeFromLoginOverlay;}
if(this._nodes.isStandalonePage){userdata={"refreshPageUrl":encodeURIComponent(this._nodes.subscribeFromLoginPage)};}else{userdata={"refreshPageUrl":encodeURIComponent(this._nodes.subscribeFromLoginOverlay)};}
this.moveOutOfIframe(userdata);},highlightTheErrorField:function(errorKeyArr){dojo.forEach(errorKeyArr,function(entry,i){if(entry==this._nodes.usernamemissing){this.addErrorClass(this._nodes.userOrEmailInput);}
if(entry==this._nodes.passwordmissing){this.addErrorClass(this._nodes.password);}},this);},clearRedBoundaryFromFields:function(){dojo.removeClass(dojo.byId(this._nodes.userOrEmailInput),this._nodes.fieldErrorClass);dojo.removeClass(dojo.byId(this._nodes.password),this._nodes.fieldErrorClass);},focusOnError:function(){this.oPassword.value="";this.oUserName.focus();},validateForm:function(loginData){var validate=true;if(!this.chkEmpty(loginData.username)){this.errorArr.push(this._nodes.usernamemissing);this.addErrorClass(this._nodes.userOrEmailInput);validate=false;}
if(validate){if(!this.chkEmpty(loginData.password)){this.errorArr.push(this._nodes.passwordmissing);this.addErrorClass(this._nodes.password);validate=false;}}
this.showErrorMessage(loginData.errorUI,this.errorArr);this.errorArr=new Array();return validate;},initIFrame:function(domNodeId,height,width,url){setTimeout(this.isLoginSuccess,20000);var options={"src":url,"class":"hidden","allowTransparency":"true"};dj.util.Url.createSimpleIframe(options,domNodeId,this.testLoginIframeLoaded,this);},isLoginSuccess:function(){if(!this.isUserLoggedIn){this.errorArr=["generalError"];this.showErrorMessage(this._nodes.errorUl,this.errorArr);if(window.console)console.warn("User couldn't be logged in ");this.errorArr=new Array();this.isUserLoggedIn=false;}},testLoginIframeLoaded:function(){this.isUserLoggedIn=true;if(this.isUnverifiedSubscriber){this.moveOutOfIframe(this.loginVerifyEmailUserdata);}else if(this.isUnverifiedFreeReg){this.moveOutOfIframe(this.unverifiedFreeRegUserdata);}
dojo.destroy("unverifiedFreeRegOrSub");}});dojo.provide("dj.widget.accountscrim.Login");dojo.require("dj.widget.accountscrim.BaseLogin");dojo.require("dj.util.Form");dojo.require("dj.service.account.LoginService");dojo.require("dj.util.User");dojo.declare("dj.widget.accountscrim.Login",dj.widget.accountscrim.BaseLogin,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this._nodes=this.WIDGET_CONFIG;this._dls=dj.service.account.LoginService;this.errorArr=new Array();},DEFAULT_CONFIG:{isLoadJs:true,version:4.2,NONSUBSCRIBER_HOMEPAGE_PID:"0_0_WH_0001_public",NONSUBSCRIBER_SEARCH_PAGE_PID:"3_0466",NONSUBSCRIBER_NEWSLETTERS_ALERTS_PAGE_PID:"5_6007",MDC_PAGE_PID:"2_3000",HOMEPAGE_SUBSCRIBER_URL:"/",SEARCH_PAGE_SUBSCRIBER_URL:"/search",MDC_LINK_URL:"/mdc/page/marketsdata.html"},WIDGET_CONFIG:{serviceUrls:{loginServiceUrl:"/auth/submitlogin.json"},closeButton:"loginClose",userOrEmailInput:"loginUserOrEmail",password:"password",submitButton:"loginSubmit",hiddenClass:"hidden",gotoForgotUsernameFromIframe:".forgotUsernameFromIframeClass",gotoForgotPasswordFromIframe:".forgotPasswordFromIframeClass",gotoRegistration:".registerUserClass",gotoSubscribe:".subscribeUser",savelogin:"savelogin",loginIframeForm:"loginIframeForm",errorUl:"loginErrorUl",goBackToIframeFrmErr:"goBackToIframeFrmErr",fieldErrorClass:"errorState",isIframe:false,iframeErrorOverlayDiv:"iframeErrorOverlayDiv",usernamemissing:"usernamemissing",passwordmissing:"passwordmissing",usernameinvalidcredentials:"usernameinvalidcredentials",morethan2invalidcredentials:"morethan2invalidcredentials",facebookconnected:"facebookconnected",unverifiedsubscriber:"unverified-subscriber",unverifiedfreereg:"unverified-freereg",generalError:"generalError",connectFB:".connectwithfb",whatsThisFbClass:".whatsThisFbClass",fbToolTipClass:".login_tooltip",fbToolTipCloseClass:".close-tooltip-btn",subscribeFromLoginOverlay:dj.context.account.subscribeFromLoginOverlay,subscribeFromLoginPage:dj.context.account.subscribeFromLoginPage},init:function(domNodeId,focusOnUsername){if(typeof this._nodes.isStandalonePage=="undefined"||!this._nodes.isStandalonePage){this.addClassToBody();this.updatePromoUrlnImage();}
this.numOfLoginAttempts=0;this.domNodeId=domNodeId;this.makeWidgetConnections();this.makeFBConnections(this.successFileUrl);var that=this;dj.lang.addLiveEvent('.login_id',"keypress",function(e){if(dojo.isIE){if(that.isChkEnter(e)){dojo.stopEvent(e);that.submitForm(that.setupLoginData());}}});dj.lang.addLiveEvent('.login_pw',"keypress",function(e){if(dojo.isIE){if(that.isChkEnter(e)){dojo.stopEvent(e);that.submitForm(that.setupLoginData());}}});this.setOmnitureTracking();if(typeof focusOnUsername=="undefined"||focusOnUsername){dojo.ready(function(){setTimeout(function(){document.loginform.loginUserOrEmail.focus();},100);});}},setOmnitureTracking:function(){var trackValues=new Array();var pName="";if(this._nodes.isStandalonePage){pName="WSJ_Auth_WSJ/Barrons_Login_Page_Sub_with_Promo";}else{pName="WSJ_Auth_WSJ/Barrons_Login_Scrim_Sub_with_Promo";}
this.lifpOmnitureTracking(trackValues,"event12",pName);},showScrim:function(domNodeId){this.domNodeId=domNodeId;this.displayScrim(domNodeId);this.hideErrorMessages(this._nodes.errorUl);this.setOmnitureTracking();},makeWidgetConnections:function(){this.fragmentLoaded=true;this.oUserName=dojo.byId(this._nodes.userOrEmailInput);this.oPassword=dojo.byId(this._nodes.password);this.oLoginSub=dojo.byId(this._nodes.submitButton);if(this.oUserName!==null){dojo.connect(this.oUserName,"focus",this,function(event){dj.util.Form.clearValue(this.oUserName,"User Name");});dojo.connect(this.oUserName,"click",this,function(event){dj.util.Form.clearValue(this.oUserName,"User Name");});}
dojo.connect(dojo.byId("loginIframeForm"),"onsubmit",this,function(e){this.submitForm(this.setupLoginData());dojo.stopEvent(e);});dojo.connect(dojo.byId(this._nodes.closeButton),"click",this,function(ev){dojo.stopEvent(ev);dojo.addClass(dojo.byId(this.domNodeId),this._nodes.hiddenClass);});if(this.oPassword!==null){this.oPassword.type="password";dojo.connect(this.oPassword,"focus",this,function(event){dj.util.Form.clearValue(this.oPassword,"Password");});}
this.connectForgotPasswordFromIframe();this.connectForgotUsernameFromIframe();dojo.query(this._nodes.gotoRegistration).connect("click",this,function(ev){if(this._nodes.isStandalonePage){this.initRegistration();}else{this.initRegistrationFromIframe(this.successFileUrl);}});dojo.query(this._nodes.gotoSubscribe).connect("click",this,function(ev){dojo.stopEvent(ev);this.gotoSubscribePage();});},updatePromoUrlnImage:function(){var region=dj.util.Region.getViewByRegion();console.log("region "+region);if(typeof region!="undefined"&&dojo.byId("usLoginPromo")!=null){var divId="usLoginPromo";var hideDivId1="asiaLoginPromo";var hideDivId2="europeLoginPromo";if(region.toUpperCase().indexOf("US")>-1){divId="usLoginPromo";hideDivId1="asiaLoginPromo";hideDivId2="europeLoginPromo";}
else if(region.toUpperCase().indexOf("ASIA")>-1){divId="asiaLoginPromo";hideDivId1="usLoginPromo";hideDivId2="europeLoginPromo";}
else if(region.toUpperCase().indexOf("EUROPE")>-1){divId="europeLoginPromo";hideDivId1="usLoginPromo";hideDivId2="asiaLoginPromo";}
dojo.removeClass(dojo.byId(divId),"hidden");dojo.addClass(dojo.byId(hideDivId1),"hidden");dojo.addClass(dojo.byId(hideDivId2),"hidden");}}});dojo.provide("dj.widget.accountscrim.FBLogin");dojo.require("dj.widget.accountscrim.BaseLogin");dojo.require("dj.util.Form");dojo.require("dj.service.account.LoginService");dojo.require("dj.widget.accountscrim.Login");dojo.require("dj.widget.accountscrim.Registration");dojo.declare("dj.widget.accountscrim.FBLogin",dj.widget.accountscrim.BaseLogin,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this.fragmentLoaded=false;this._nodes=this.WIDGET_CONFIG;this._dls=dj.service.account.LoginService;this.errorArr=new Array();},DEFAULT_CONFIG:{isLoadJs:true,version:4.2,productCd:"WSJ_FACEBOOK",NONSUBSCRIBER_HOMEPAGE_PID:"0_0_WH_0001_public",NONSUBSCRIBER_SEARCH_PAGE_PID:"3_0466",NONSUBSCRIBER_NEWSLETTERS_ALERTS_PAGE_PID:"5_6007",MDC_PAGE_PID:"2_3000",HOMEPAGE_SUBSCRIBER_URL:"/",SEARCH_PAGE_SUBSCRIBER_URL:"/search",MDC_LINK_URL:"/mdc/page/marketsdata.html"},WIDGET_CONFIG:{serviceUrls:{loginServiceUrl:"/auth/submitlogin.json",registrationServiceUrl:"/epiton/registration/v2/profile"},closeButton:".closeBtn",userOrEmailInput:"fb_loginUserOrEmail",password:"fb_password",loginSubmit:"loginSubmit",fbSubmit:"fbconnect",hiddenClass:"hidden",gotoForgotUsernameFromIframe:".forgotUsernameFromIframeClass",loginConnect:".wsj_login_form_intro",loginForm:".wsj_login_form",savelogin:"fb_savelogin",errorUl:"fb_loginErrorUl",usernamemissing:"usernamemissing",passwordmissing:"passwordmissing",usernameinvalidcredentials:"usernameinvalidcredentials",morethan2invalidcredentials:"morethan2invalidcredentials",facebookconnected:"facebookconnected",unverifiedsubscriber:"unverified-subscriber",unverifiedfreereg:"unverified-freereg",generalError:"generalError",fieldErrorClass:"errorState",firstNameRequired:"firstNameRequired",lastNameRequired:"lastNameRequired",invalidemailFormat:"invalidemailFormat",emailIdrequired:"emailIdrequired",newPasswordRequired:"newPasswordRequired",confirmPasswordRequired:"confirmPasswordRequired",passwordTooShort:"passwordTooShort",passwordTooLong:"passwordTooLong",invalidCharacters:"invalidCharacters",passwordDoNotMatch:"passwordDoNotMatch",emailAddressexists:"emailAddressexists",firstName:"fb_firstName",lastName:"fb_lastName",emailToRegister:"fb_emailToRegister",newPassword:"fb_newPassword",confirmPassword:"fb_confirmPassword",registerErrorUl:"fb_registrationErrorUl",registerNow:"registerNow",newPassInd:"newPassInd",confirmPassInd:"confirmPassInd",passIndClassRed:"validate no",passIndClassGreen:"validate yes",passwordSuggestion:".pw_suggestion",passwordSuggestionClose:".pw_tooltip",connectFB:"connectwithfb",whatsThisFb:"whatsThisFb",fbToolTip:"fbToolTip",fbToolTipClose:"fbToolTipClose",helpTipTarget:".helpTipTarget",helpbtnclose:".btn_close"},init:function(domNodeId){this.addClassToBody();this._nodes.fbConnectLogin=true;this.successFileUrl=this.getQueryStrParam("successFileUrl");this.currentPageUrl=this.getQueryStrParam("currentPageUrl");this.fbconnectURL=this.getFBConnectURL(this.currentPageUrl);this.numOfLoginAttempts=0;this.domNodeId=domNodeId;this.makeWidgetConnections();if(typeof dj.module.facebook!="undefined"&&typeof dj.module.facebook.connect!="undefined"){if(typeof FB=="undefined"){dj.module.facebook.connect.init(this.updateUserInfo);}else{this.updateUserInfo();}}else{if(window.console)console.warn(" In {FBLogin.js} dj.module.facebook.connect is not found, please make the required js file available");}
this.setOmnitureTracking();var that=this;dj.lang.addLiveEvent('.fbloginid',"keypress",function(e){if(dojo.isIE){if(that.isChkEnter(e)){dojo.stopEvent(e);that.submitLoginForm();}}});dj.lang.addLiveEvent('.fbloginpassword',"keypress",function(e){if(dojo.isIE){if(that.isChkEnter(e)){dojo.stopEvent(e);that.submitLoginForm();}}});},showScrim:function(domNodeId){this.domNodeId=domNodeId;this.displayScrim(domNodeId);this.hideErrorMessages(this._nodes.errorUl);this.setOmnitureTracking();},setOmnitureTracking:function(){var trackValues=new Array();var pName="";pName="WSJ_Auth_WSJ_Login_Page_Post_FBConnect";this.lifpOmnitureTracking(trackValues,"event12",pName);},updateUserInfo:function(){FB.api('/me',function(response){if(!response||response.error){}else{dojo.byId("fb_firstName").value=response.first_name;dojo.byId("fb_lastName").value=response.last_name;dojo.byId("fb_emailToRegister").value=response.email;}});},showLoginForm:function(){dojo.removeClass(dojo.byId("wsj_login_box"),"wsj_login_box collapsed");dojo.addClass(dojo.byId("wsj_login_box"),"wsj_login_box expanded");this.makeLoginConnections();},setupRegistrationData:function(){var registrationData={"firstname":this.oFirstName.value,"lastname":this.oLastName.value,"email":this.oEmailToRegister.value,"password":this.oNewPassword.value,"confirmpassword":this.oConfirmPassword.value,"errorUI":this._nodes.registerErrorUl}
return registrationData;},setupLoginData:function(){var savelogin=dojo.byId(this._nodes.savelogin).checked+"";var loginData={"username":this.oUserName.value,"password":this.oPassword.value,"savelogin":savelogin,"errorUI":this._nodes.errorUl}
return loginData;},makeWidgetConnections:function(){this.fragmentLoaded=true;this.oFirstName=dojo.byId(this._nodes.firstName);this.oLastName=dojo.byId(this._nodes.lastName);this.oEmailToRegister=dojo.byId(this._nodes.emailToRegister);this.oNewPassword=dojo.byId(this._nodes.newPassword);this.oConfirmPassword=dojo.byId(this._nodes.confirmPassword);dojo.connect(dojo.byId("fbRegisterForm"),"onsubmit",this,function(e){dojo.stopEvent(e);this.submitFBForm();});dojo.query(this._nodes.closeButton).connect("click",this,function(ev){dojo.addClass(dojo.byId(this.domNodeId),this._nodes.hiddenClass);});this.connectForgotPasswordFromIframe();this.connectForgotUsernameFromIframe();dojo.query(this._nodes.loginConnect).connect("click",this,function(ev){this.showLoginForm();});dojo.query(this._nodes.helpTipTarget).connect("click",this,function(ev){dojo.removeClass(dojo.byId("helpTipTree"),"helpTipTree-collapsed");dojo.addClass(dojo.byId("helpTipTree"),"helpTipTree-expanded");});dojo.query(this._nodes.helpbtnclose).connect("click",this,function(ev){dojo.addClass(dojo.byId("helpTipTree"),"helpTipTree-collapsed");dojo.removeClass(dojo.byId("helpTipTree"),"helpTipTree-expanded");});dojo.query(this._nodes.passwordSuggestion).connect("click",this,function(ev){dojo.removeClass(dojo.byId("pwSuggestion"),"hidden");});dojo.query(this._nodes.passwordSuggestionClose).connect("click",this,function(ev){dojo.addClass(dojo.byId("pwSuggestion"),"hidden");});dojo.connect(this.oConfirmPassword,"keyup",this,function(e){if(this.oConfirmPassword.value==""&&!(this.isChkEnter(e))){dojo.removeClass(dojo.byId("confirmPassInd"),"validate no");dojo.removeClass(dojo.byId("confirmPassInd"),"validate yes");dojo.removeClass(dojo.byId("fb_confirmPassword"),"errorState");}
if(this.isChkEnter(e)){dojo.stopEvent(e);this.submitFBForm();}});dojo.connect(this.oNewPassword,"keyup",this,function(e){if(this.oNewPassword.value==""&&!(this.isChkEnter(e))){dojo.removeClass(dojo.byId("newPassInd"),"validate no");dojo.removeClass(dojo.byId("newPassInd"),"validate yes");dojo.removeClass(dojo.byId("fb_newPassword"),"errorState");}
if(this.isChkEnter(e)){dojo.stopEvent(e);this.submitFBForm();}});},makeLoginConnections:function(){this.fragmentLoaded=true;this.oUserName=dojo.byId(this._nodes.userOrEmailInput);this.oPassword=dojo.byId(this._nodes.password);this.oLoginSub=dojo.byId(this._nodes.loginSubmit);this.oFBSub=dojo.byId(this._nodes.fbSubmit);if(this.oUserName!==null){dojo.connect(this.oUserName,"focus",this,function(event){dj.util.Form.clearValue(this.oUserName,"User Name");});dojo.connect(this.oUserName,"click",this,function(event){dj.util.Form.clearValue(this.oUserName,"User Name");});}
dojo.connect(dojo.byId("fbLoginForm"),"onsubmit",this,function(e){dojo.stopEvent(e);this.submitLoginForm();});},validateLoginForm:function(loginData){this.errorArr=new Array();var validate=true;if(!this.chkEmpty(loginData.username)){this.errorArr.push(this._nodes.usernamemissing);this.addErrorClass(this._nodes.userOrEmailInput);validate=false;}
if(validate){if(!this.chkEmpty(loginData.password)){this.errorArr.push(this._nodes.passwordmissing);this.addErrorClass(this._nodes.password);validate=false;}}
this.showErrorMessage(loginData.errorUI,this.errorArr);this.errorArr=new Array();return validate;},submitLoginForm:function(){if(dojo.hasClass("loginSubmit","disabled")){return;}
this.clearRedBoundaryFromFields("loginForm");var loginData=this.setupLoginData();if(!this.validateLoginForm(loginData)){return;}
dojo.byId(this._nodes.errorUl).innerHTML="";dojo.addClass(dojo.byId("loginSubmit"),"disabled");var postData={"username":dj.lang.trim(loginData.username),"password":loginData.password,"url":encodeURIComponent(dj.context.account.testLogin)+"?fbConnectPageUrl="+this.fbconnectURL,"template":"default","realm":"default","savelogin":loginData.savelogin};dj.service.account.LoginService.loginUser(this._nodes.serviceUrls.loginServiceUrl,dojo.toJson(postData),this.load,this.error,this);},submitFBForm:function(){if(dojo.hasClass("fbconnect","disabled")){return;}
this.clearRedBoundaryFromFields("registrationForm");if(!this.validateRegistrationForm()){return;}
dojo.byId(this._nodes.registerErrorUl).innerHTML="";dojo.addClass(dojo.byId("fbconnect"),"disabled");var postData="profile.firstName="+this.oFirstName.value;postData+="&profile.lastName="+this.oLastName.value;postData+="&profile.emailAddress="+this.oEmailToRegister.value;postData+="&profile.password="+this.oNewPassword.value;postData+="&profile.passwordConfirmation="+this.oConfirmPassword.value;postData+="&profile.uuid=true";postData+="&profile.options.createCommunityProfile=";postData+="&profile.options.featureEmailOptIn=true";postData+="&profile.options.returnLink=http%3A%2F%2F"+document.domain;postData+="&service.registrationType=FREE_REGISTRATION";postData+="&profile.trackingCode=FACEBOOK_CONNECT";postData+="&profile.newsletterOptIns=";postData+="&service.templateCode="+this.PRODUCT_CD+"_FACEBOOK";postData+="&profile.registrationSource=facebook";dj.service.account.RegistrationService.registerUser(this._nodes.serviceUrls.registrationServiceUrl,postData,this.registrationLoad,this.registrationError,this);},registrationLoad:function(emailId){var postData={"username":dj.lang.trim(this.oEmailToRegister.value),"password":this.oNewPassword.value,"url":encodeURIComponent(dj.context.account.testLogin)+"?fbConnectPageUrl="+this.fbconnectURL,"template":"default","realm":"default","savelogin":"true"};dj.service.account.LoginService.loginUser(this._nodes.serviceUrls.loginServiceUrl,dojo.toJson(postData),this.load,this.error,this);},registrationError:function(errorsArr){dojo.removeClass(dojo.byId("fbconnect"),"disabled");dojo.forEach(errorsArr,function(entry,i){if(entry.indexOf("-")>-1){entry=entry.replace(/-/g,"");errorsArr[i]=entry;}},this);this.showErrorMessage(this._nodes.registerErrorUl,errorsArr);this.connectForgotPasswordFromIframe();var trackValues=new Array();var pName="";pName="WSJ_Auth_WSJ/Barrons_Login_Page_Post_FBConnect EmailAddressexists Error Page";this.lifpOmnitureTracking(trackValues,"event12",pName);},validateRegistrationForm:function(){var validation=true;if(!this.chkEmpty(this.oFirstName.value)){this.errorArr.push(this._nodes.firstNameRequired);this.addErrorClass(this._nodes.firstName);validation=false;}
if(!this.chkEmpty(this.oLastName.value)){this.errorArr.push(this._nodes.lastNameRequired);this.addErrorClass(this._nodes.lastName);validation=false;}
var emailValidation=this.chkEmailAddress(this.oEmailToRegister.value);if(!emailValidation){this.addErrorClass(this._nodes.emailToRegister);}
validation=validation?emailValidation:false;var newPassValidation=this.validateNewPassword();if(!newPassValidation){this.addErrorClass(this._nodes.newPassword);}
var confirmPassValidation=this.validateConfirmPassword();if(!confirmPassValidation){this.addErrorClass(this._nodes.confirmPassword);}
validation=validation?newPassValidation?confirmPassValidation:false:false;if(newPassValidation&&confirmPassValidation){if(!this.chkPasswordMatch(this.oNewPassword,this.oConfirmPassword,this._nodes.registerErrorUl)){validation=false;}}
this.showErrorNClearArray();return validation;},showErrorNClearArray:function(){this.showErrorMessage(this._nodes.registerErrorUl,this.errorArr);this.errorArr=new Array();},getFBConnectURL:function(currentpageURL){var query=currentpageURL.substring(currentpageURL.indexOf("?")+1,currentpageURL.length);var queryObject=dojo.queryToObject(query);var fbConnectURL="";if(typeof queryObject.url!="undefined"){if(queryObject.url.constructor.toString().indexOf("Array")==-1){var fbConnectURL=queryObject.url;}else{var fbConnectURL=queryObject.url[1];}}else{var uri=currentpageURL.substring(0,currentpageURL.indexOf("?"));fbConnectURL=dj.context.facebook.commerceFBConnectURL+"?url="+encodeURIComponent(uri);fbConnectURL=encodeURIComponent(fbConnectURL);}
fbConnectURL=fbConnectURL;return fbConnectURL;},clearRedBoundaryFromFields:function(formName){if(typeof formName=="undefined"){formName="loginForm";}
if(formName=="registrationForm"){dojo.removeClass(dojo.byId(this._nodes.firstName),this._nodes.fieldErrorClass);dojo.removeClass(dojo.byId(this._nodes.lastName),this._nodes.fieldErrorClass);dojo.removeClass(dojo.byId(this._nodes.emailToRegister),this._nodes.fieldErrorClass);dojo.removeClass(dojo.byId(this._nodes.newPassword),this._nodes.fieldErrorClass);dojo.removeClass(dojo.byId(this._nodes.confirmPassword),this._nodes.fieldErrorClass);}else if(formName=="loginForm"){dojo.removeClass(dojo.byId(this._nodes.userOrEmailInput),this._nodes.fieldErrorClass);dojo.removeClass(dojo.byId(this._nodes.password),this._nodes.fieldErrorClass);}}});dojo.provide("dj.widget.loader.ScrimLoaders");dojo.require("dj.widget.loader.LoaderInstanceFactory");dojo.require("dj.util.Url");dj.widget.loader.ScrimLoaders={init:function(cfg){},callBackFromIframe:function(userdata){userdata=dojo.fromJson(userdata);if(typeof userdata!="undefined"){if(typeof userdata.logout!="undefined"){this.initIFrameForLogout();dojo.destroy(dojo.byId("moduleiframe"));dojo.destroy(dojo.byId("getGreyBckgroundCSSDiv"));}
if(typeof userdata.refreshPageUrl!="undefined"){window.location=decodeURIComponent(userdata.refreshPageUrl);}
if(typeof userdata.close!="undefined"){dojo.destroy(dojo.byId("moduleiframe"));dojo.destroy(dojo.byId("getGreyBckgroundCSSDiv"));}else{parent.dojo.destroy("moduleiframe");}
if(typeof userdata.screenName!="undefined"){if(userdata.screenName==="LoginVerifyEmail"){dojo.require("dj.widget.loader.LoginVerifyEmailLoader");dj.widget.loader.LoaderInstanceFactory.getLoginVerifyEmailLoaderInstance(userdata).initScrimFromIframe();}else if(userdata.screenName==="UnverifiedFreeReg"){dojo.require("dj.widget.loader.UnverifiedFreeRegLoader");dj.widget.loader.LoaderInstanceFactory.getUnverifiedFreeRegLoaderInstance(userdata).initScrimFromIframe();}else if(userdata.screenName==="FbLoginOrWSJPswd"){dojo.require("dj.widget.loader.FbLoginOrWSJPswdLoader");dj.widget.loader.LoaderInstanceFactory.getFbLoginOrWSJPswdLoaderInstance(userdata).initScrimFromIframe();}else if(userdata.screenName==="RegistrationConfirmation"){dojo.require("dj.widget.loader.ThankYouLoader");dj.widget.loader.LoaderInstanceFactory.getThankYouLoaderInstance(userdata).initScrimFromIframe();}else if(userdata.screenName==="ForgotUsername"){dojo.require("dj.widget.loader.ForgotUserOrPswdLoader");dj.widget.loader.LoaderInstanceFactory.getForgotUserOrPswdLoaderInstance(userdata).initScrimFromIframe();}else if(userdata.screenName==="ForgotPassword"){dojo.require("dj.widget.loader.ForgotPasswordLoader");dj.widget.loader.LoaderInstanceFactory.getForgotPasswordLoaderInstance(userdata).initScrimFromIframe();}else if(userdata.screenName==="Registration"){dojo.require("dj.widget.loader.RegistrationLoader");dj.widget.loader.LoaderInstanceFactory.getRegistrationLoaderInstance().initRegisterScrimInIframe();}else if(userdata.screenName==="FBInit"){dojo.require("dj.widget.loader.FBInitLoader");dj.widget.loader.LoaderInstanceFactory.getFBInitLoaderInstance(userdata.cfg).initScrimFromIframe();}else if(userdata.screenName==="Login"){dojo.require("dj.widget.loader.LoginLoader");dj.widget.loader.LoaderInstanceFactory.getLoginLoaderInstance(userdata.cfg).initLoginScrimInIframe();}else if(userdata.screenName==="FBConnected"){dojo.require("dj.widget.loader.FBConnectedLoader");dj.widget.loader.LoaderInstanceFactory.getFBConnectedLoaderInstance(userdata.cfg).initScrimFromIframe();}else if(userdata.screenName==="UserWithoutEmail"){dojo.require("dj.widget.loader.UserWithourEmailConfirmationLoader");dj.widget.loader.LoaderInstanceFactory.getUserWithourEmailConfirmationLoaderInstance(userdata).initScrimFromIframe();}}else if(typeof userdata.confScreenName!="undefined"){dj.widget.loader.LoaderInstanceFactory.getConfirmationLoaderInstance(userdata).initScrimFromIframe();}}},callBackFromAdops:function(operation,trackCode){parent.dojo.destroy("moduleiframe");parent.dojo.destroy("overlayDiv");if(typeof operation!="undefined"){if(operation=="subscribeFromOverlay"){parent.location=dj.context.account.subscribeOfferFromLoginOverlay;}else if(operation=="subscribeFromPage"){parent.location=dj.context.account.subscribeOfferFromLoginPage;}else if(operation=="subscribeFromAmazonPage"){parent.location=dj.context.account.subscribeFromAmazonPage;}else if(operation=="subscribeFromFB"){parent.location=dj.context.account.subscribeOfferFromFBOverlay;}else if(operation=="subscribeFromRegistration"){parent.location=dj.context.account.subscribeOfferFromRegistrationOverlay;}else if(operation=="registerFromPage"||operation=="registerFromOverlay"){dojo.require("dj.widget.loader.RegistrationLoader");dj.widget.loader.LoaderInstanceFactory.getRegistrationLoaderInstance().initRegisterScrimInIframe();}}},chkIfHttpsDomain:function(){try{if(typeof parent.location.href!="undefined"&&parent.location.href.indexOf("https://")>-1){return true;}
return false;}catch(e){return false;}},initIFrameForLogout:function(){var logoutDomNodeId="unverifiedFreeReglogout";if(dojo.byId(logoutDomNodeId)==null){dojo.create("div",{id:logoutDomNodeId,"class":"hidden"},dojo.body(),"last");}
var url="http://"+document.domain+"/logout";var options={"src":url,"class":"hidden"};setTimeout(this.isUserLoggedout,10000);dj.util.Url.createSimpleIframe(options,logoutDomNodeId,this.testLogoutIframeLoaded,this);},testLogoutIframeLoaded:function(){this.userLoggedOut=true;dojo.destroy("unverifiedFreeReglogout");},isUserLoggedout:function(){if(!this.userLoggedOut){if(window.console)console.warn(" unverified free reg user couldn't be logged out ");}
this.userLoggedOut=false;}};
dojo.provide("dj.module.scrimloader.ScrimLoader");dojo.declare("dj.module.scrimloader.ScrimLoader",[],{DEFAULT_CONFIG:{scrimWrapperDiv:"genericdiv"},constructor:function(scrimConfig,callBack){if(callBack){this.preCallback=callBack.preCallBack;this.postCallback=callBack.postCallBack;this.callbackContext=callBack.context;}
this.cfg=dojo.mixin(this.DEFAULT_CONFIG,scrimConfig);},initScrim:function(){this._preCallback(this.preCallback,this.callbackContext);var d=dojo;d.require("djscript.require.dj_module_scrimloader.version.1");d.addOnLoad(this._requiredJSLoaded());},_requiredJSLoaded:function(){this._loadScrimContent();this._showScrim();},_showScrim:function(){var _scrimContentObj=new dj.widget.scrim.ShowScrim(this.cfg);this.dialog=_scrimContentObj.init();},_loadScrimContent:function(){var cnt=dojo.create("div",{"id":this.cfg.scrimWrapperDiv},dojo.body(),"last");this._scrimContent=new dj.module.scrimloader.LoadScrimContent(this.cfg,this.postCallback,this.callbackContext);this._scrimContent.init();},_preCallback:function(preCallbackFunc,context){if(typeof preCallbackFunc==='function'){return preCallbackFunc.call(context);}
return false;}});dojo.provide("dj.widget.scrim.starbucksscrim.scrimTracking");dojo.require("dj.util.Tracking");dj.widget.scrim.starbucksscrim.scrimTracking={init:function(){this.omniture={};this.omniture.saveVars=["pageName","prop2","prop3","prop4","prop8","prop20","prop26"];this.omniture.saveValues=[];},omnituresavepixel:function(){var svlen=this.omniture.saveVars.length;for(var f=0;f<svlen;f++){this.omniture.saveValues[f]=this.omniture.pixel.getMetaData(this.omniture.saveVars[f]);}},omniturerestorepixel:function(){var svlen=this.omniture.saveVars.length;for(var f=0;f<svlen;f++){this.omniture.pixel.setMetaData(this.omniture.saveVars[f],this.omniture.saveValues[f]);}},omniturefirepixel:function(){this.init();if(!this.omniture.pixel){this.omniture.pixel=dj.util.Tracking.omniture;}
this.omniture.pixel.resetPixel();this.omnituresavepixel();this.omniture.pixel.setMetaData('pageName','WSJ_Starbucks Scrim');this.omniture.pixel.setMetaData('section','Customer Resources');this.omniture.pixel.setMetaData('subsection','WSJ_Marketing');this.omniture.pixel.setMetaData('apage','WSJ_Customer Resources_Starbucks Scrim');this.omniture.pixel.setMetaData('atype','WSJ_Customer Resources_Starbucks Scrim');this.omniture.pixel.setMetaData('aheadline','');this.omniture.pixel.setMetaData('csource','WSJ Online');this.omniture.pixel.setMetaData('abasedocid','');this.omniture.pixel.setMetaData('basesection','WSJ_Marketing');this.omniture.pixel.firePixel(true);this.omniturerestorepixel();}};dojo.provide("dj.module.starbucksscrim.StarbucksScrim");dojo.require("dj.module.scrimloader.ScrimLoader");dojo.require("dj.util.Cookie");dojo.require("dj.util.User");dojo.require("dj.widget.scrim.starbucksscrim.scrimTracking");dojo.declare("dj.module.starbucksscrim.StarbucksScrim",dj.module.scrimloader.ScrimLoader,{constructor:function(scrimConfig,callBack){this.cfg=dojo.mixin(this.DEFAULT_CONFIG,scrimConfig);this.postCallback=this._postScrimCall;this.callbackContext={StarbucksScrimObj:this};},init:function(){this.showScrim();},hasSeenScrim:function(){return(dj.util.Cookie.getGroupCookie('DJSESSION',this.cfg.cookieName)!==null);},setScrimAsSeen:function(){dj.util.Cookie.setGroupCookie('DJSESSION',this.cfg.cookieName,"true");},showScrim:function(){if(!this.hasSeenScrim()){if(this._isIpad()){return false;}
if(this._isBlockedScreenResolution(600,800)){return false;}
this._isWsjUser();}
return false;},_isBlockedScreenResolution:function(height,width){if((screen.height<=height)&&(screen.width<=width)){return true;}
return false;},_isIpad:function(){if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/Android/i))||(navigator.userAgent.match(/iPad/i))){return true;}
return false;},_postScrimCall:function(StarbucksScrimObj){dojo.connect(dojo.query(".closeBtn")[0],"click",this,function(){this.StarbucksScrimObj.dialog.hide();});dojo.connect(dojo.query(".scrimStarbucksReadMore")[0],"click",this,function(){this.StarbucksScrimObj.dialog.hide();});dojo.connect(dojo.query(".starbucksScrimBtnNo")[0],"click",this,function(){this.StarbucksScrimObj.dialog.hide();});dojo.query(".dijit_scrim")[0].style.zIndex=1050;dj.widget.scrim.starbucksscrim.scrimTracking.omniturefirepixel();},_isWsjUser:function(){var that=this;dj.util.User.isOpenHouseUser('SDN',function(isOpenHouseUser){if(isOpenHouseUser){dj.util.User.isLoggedIn(function(isLoggedIn){if(!isLoggedIn){that.setScrimAsSeen();that.initScrim();}});}});}});dojo.provide("dj.module.facebook.connect");dojo.require("dj.lang");
dj.module.facebook.connect={init:function(a,b){window.fbAsyncInit=function(){FB.UIServer.setActiveNode=function(c,d){FB.UIServer._active[c.id]=d};FB.init({appId:dj.context.facebook.appId,status:true,cookie:false,xfbml:true,oauth:true});FB.getLoginStatus(function(){if(typeof a=="function")b?a.apply(b):a()})};(function(){var c=document.createElement("script");c.src=document.location.protocol+"//connect.facebook.net/en_US/all.js";c.type="text/javascript";c.charset="utf-8";c.async=true;var d=dojo.byId("fb-root");
if(null==d)d=dojo.create("div",{id:"fb-root",style:{display:"none"}},dojo.body());dojo.place(c,d)})()},registerFBConnect:function(a){if(typeof a=="undefined")a=fbScrimCFG;FB.getLoginStatus(function(b){console.log("Facebook connect staus: "+b.status);if(b.status=="connected"){dojo.require("dj.widget.loader.FBLoginLoader");dojo.require("dj.widget.accountscrim.FBLogin");(new dj.widget.loader.FBLoginLoader(a)).init()}})},fbConnected:function(a){if(typeof a=="undefined")a=fbScrimCFG;dojo.require("dj.widget.loader.FBConnectedLoader");
dojo.require("dj.widget.accountscrim.FBConnected");(new dj.widget.loader.FBConnectedLoader(a)).initScrim()},fireScrimPixel:function(a){if(typeof setMetaData!="undefined"){var b=dj.util.Tracking.omniture.getMetaData("pagename"),c=dj.util.Tracking.omniture.getMetaData("ctype"),d=dj.util.Tracking.omniture.getMetaData("section"),e=dj.util.Tracking.omniture.getMetaData("subsection"),h=dj.util.Tracking.omniture.getMetaData("caccess"),g=dj.util.Tracking.omniture.getMetaData("qsymbol"),f=dj.util.Tracking.omniture.getMetaData("basesection");
setMetaData("pagename",a);setMetaData("ctype","marketing and support");setMetaData("section","WSJ_Customer Resources");setMetaData("subsection","WSJ_Customer Resources");setMetaData("caccess","free");setMetaData("basesection","WSJ_FBconnect");setMetaData("qsymbol",null);dj.util.Tracking.omniture.firePixel();setMetaData("pagename",b);setMetaData("ctype",c);setMetaData("section",d);setMetaData("subsection",e);setMetaData("caccess",h);setMetaData("basesection",f);setMetaData("qsymbol",g)}},login:function(a){typeof FB==
"undefined"?this.init(dj.module.facebook.connect.processLogin):this.processLogin(a)},processLogin:function(a,b){if(a)this.afterLoginURL=a;typeof b!="undefined"?FB.login(b,{scope:"publish_stream,email,read_stream,publish_actions"}):FB.login(dj.module.facebook.connect.afterLogin,{scope:"publish_stream,email,read_stream,publish_actions"})},afterLogin:function(a){if(a.authResponse){a=FB.JSON.stringify(a.authResponse);dj.util.Cookie.setCookie("djfbsr_"+dj.context.facebook.appId,a);if(dj.module.facebook.connect.afterLoginURL)location.href=
dj.context.facebook.commerceFBConnectURL+"?url="+encodeURIComponent(dj.module.facebook.connect.afterLoginURL);else{oldUrlParts=location.href.split("?");location.href=dj.context.facebook.commerceFBConnectURL+"?url="+encodeURIComponent(oldUrlParts[0])}}},addConnectClick:function(a,b){var c=this;dj.lang.addLiveEvent(a,"click",function(d){dojo.stopEvent(d);c.login(b)})},displayMessage:function(a){a.url="";a.message="";typeof a.callback=="function"&&a.callback()},logout:function(a){dj.util.Cookie.deleteCookie("djfbsr_"+
dj.context.facebook.appId);FB.logout(a)},getUserID:function(){return FB.getAuthResponse()?FB.getAuthResponse().userID:null},getFBUserInfo:function(){var a;FB.api("/me",function(b){a=b});return a},checkQueryString:function(a){fbScrimCFG=a;var b=dojo.queryToObject(window.location.search.slice(1));if(typeof b.fbresult!="undefined")if(b.fbresult=="add")typeof FB=="undefined"?dj.module.facebook.connect.init(dj.module.facebook.connect.fbConnected):dj.module.facebook.connect.fbConnected(a);else if(b.fbresult==
"register")typeof FB=="undefined"?dj.module.facebook.connect.init(dj.module.facebook.connect.registerFBConnect):dj.module.facebook.connect.registerFBConnect(a)},publish:function(a,b){if(typeof FB!="undefined"){if(FB.getAuthResponse()){myObj=a;myObj.method="stream.publish";myObj.preview=1;myObj.display="popup";FB.ui(myObj,b)}}else{console.error("User is not logged in or FB in undefined");b(false)}},showModalScrim:function(){var a=dojo.byId("fbscrim"),b=dojo.byId("fbscrim_content");a.style.display=
"block";b.style.display="block";dojo.query("div#fbscrim_content a.closebtn").connect("onclick",dj.module.facebook.connect.hideModalScrim)},hideModalScrim:function(){var a=dojo.byId("fbscrim"),b=dojo.byId("fbscrim_content");a.style.display="none";b.style.display="none"},openModalMessage:function(){}};
dojo.provide("dj.module.facebook.api");dojo.require("dj.module.facebook.connect");
dj.module.facebook.api={modValue:"fbconnect_wsj",numOfWords:40,truncateWords:function(a,b){var c="",d=a.split(" ");if(d.length>b){c="...";d=d.slice(0,b)}return d.join(" ")+c},addtracking:function(a,b){parseUri=function(g){var f=parseUri.options;g=f.parser[f.strictMode?"strict":"loose"].exec(g);for(var n={},m=14;m--;)n[f.key[m]]=g[m]||"";n[f.q.name]={};n[f.key[12]].replace(f.q.parser,function(k,i,j){if(i)n[f.q.name][i]=j});return n};parseUri.options={strictMode:false,key:["source","protocol","authority",
"userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};
var c=parseUri(a),d=c.protocol+"://"+c.host+c.path+"?",e=b?b:this.modValue,h;for(h in c.queryKey)if(String(h).toUpperCase()!="MOD")d+=h+"="+c.queryKey[h]+"&";d+="mod="+e;d+=c.anchor?"#"+c.anchor:"";return d},postAnswer:function(a){if(!(a.question&&a.answer&&a.questionPermalink))return false;var b=this.truncateWords(a.answer,this.numOfWords),c={name:a.question,href:this.addtracking(a.questionPermalink),caption:"WSJ.com"},d=[{text:"Answer",href:this.addtracking(a.questionPermalink)}];this.sendStream(b,
c,d,a.callbackFn,a.callbackParams)},postArticleComment:function(a){if(!(a.comment&&a.commentPermalink))return false;JSON.stringify=function(g){return dojo.toJson(g)};var b=typeof AT_VARS!="undefined"?AT_VARS.articleUrl:a.commentPermalink,c=typeof AT_VARS!="undefined"?AT_VARS.seoHeadline:"";if(typeof c=="undefined")c=AT_VARS.articleHeadline;var d=typeof AT_VARS!="undefined"?AT_VARS.imgSizeA:"http://s.wsj.net/img/WSJ_profile_lg.gif",e=typeof AT_VARS!="undefined"&&typeof AT_VARS.bodyText!="undefined"?
AT_VARS.bodyText.replace(/\+/g," "):"",h=this.truncateWords(a.comment,this.numOfWords);c={name:c,href:this.addtracking(b),description:unescape(e),caption:"WSJ.com"};if(d!=null)c.media=[{type:"image",src:d,href:this.addtracking(b)}];b=[{text:"Read the Article",href:this.addtracking(a.commentPermalink)}];this.sendStream(h,c,b,a.callbackFn,a.callbackParams)},postCreateGroup:function(a){if(!(a.groupName&&a.groupDescription&&a.groupPermalink))return false;var b={name:a.groupName,href:this.addtracking(a.groupPermalink),
description:a.groupDescription,caption:"WSJ.com"},c=[{text:"Join this Journal Group",href:this.addtracking(a.groupPermalink)}];this.sendStream("",b,c,a.callbackFn,a.callbackParams)},postJoinGroup:function(a){if(!(a.groupName&&a.groupDescription&&a.groupPermalink))return false;var b={name:a.groupName,href:this.addtracking(a.groupPermalink),description:a.groupDescription,caption:"WSJ.com"},c=[{text:"Join this Journal Group",href:this.addtracking(a.groupPermalink)}];this.sendStream("",b,c,a.callbackFn,
a.callbackParams)},postPollVote:function(a){if(!a)return null;params=dojo.fromJson(a);a="";JSON.stringify=function(c){return dojo.toJson(c)};for(var b=0;b<params.options.length;b++)a+=b+1+") "+params.options[b].value+" ";a={name:params.question,href:this.addtracking(window.location),description:a,media:[{type:"image",src:"http://s.wsj.net/img/WSJ_profile_lg.gif",href:this.addtracking(window.location)}]};b=[{text:"Related Article",href:this.addtracking(params.poll_meta.urlSrc)}];if(params.poll_meta.communityURLSrc!=
"")b=[{text:"Journal Community Group",href:this.addtracking(params.poll_meta.communityURLSrc)}];this.sendStream("voted on a Wall Street Journal poll",a,b,function(){},null)},postQuestion:function(a){if(!(a.question&&a.category&&a.questionPermalink))return false;var b=this.truncateWords(a.question,this.numOfWords),c={name:a.category,href:this.addtracking(a.questionPermalink),caption:"WSJ.com"},d=[{text:"Answer",href:this.addtracking(a.questionPermalink)}];this.sendStream(b,c,d,a.callbackFn,a.callbackParams)},
postTopic:function(a){if(!(a.topic&&a.topicPermalink&&a.description))return false;var b=this.truncateWords(a.topic,this.numOfWords),c={name:a.topic,href:this.addtracking(a.topicPermalink),description:a.description,caption:"WSJ.com"},d=[{text:"Join the discussion",href:this.addtracking(a.topicPermalink)}];this.sendStream(b,c,d,a.callbackFn,a.callbackParams)},postTopicComment:function(a){if(!(a.comment&&a.commentPermalink&&a.topicName&&a.topicDescription&&a.topicPermalink))return false;var b=this.truncateWords(a.comment,
this.numOfWords),c={name:a.topicName,href:this.addtracking(a.topicPermalink),description:a.topicDescription,caption:"WSJ.com"},d=[{text:"Join this discussion",href:this.addtracking(a.commentPermalink)}];this.sendStream(b,c,d,a.callbackFn,a.callbackParams)},sendStream:function(a,b,c,d,e){var h=-1;FB.getLoginStatus(function(g){g.session?dj.module.facebook.connect.publish({message:a,attachment:b,action_links:c},function(f){if(f){h=f.post_id;dj.module.facebook.api.omnitureEventCall("event56");d?d(e,dj.module.facebook.connect.getUserID(),
h):console.log("success: "+h)}}):dj.module.facebook.connect.processLogin(document.location,dojo.hitch(this,dj.module.facebook.api.sendStream,a,b,c,d,e))});return h},omnitureEventCall:function(){if(typeof s!="undefined"){s.linkTrackVars="events";s.linkTrackEvents="event56";s.events="event56";s.tl(this,"o","fb_activity");s.linkTrackVars="None";s.linkTrackEvents="None"}}};
if((document.URL.indexOf("wsj")>0||document.URL.indexOf("barrons")>0||document.URL.indexOf("smart")>0)&&document.URL.indexOf("jp")==-1&&document.URL.indexOf("cn")==-1&&document.URL.indexOf("jobs.wsj.com")==-1&&document.URL.indexOf("customercenter")==-1)dojo.provide("dj.widget.networkHat.hat");
hat={init:function(){this.currId=this.getSelectedProduct();this.partyHatMoreDropdown=document.getElementById("partyhat_more_dropdown");this.oHatFBButton=document.getElementById("hat_fb_button");this.oHatTwtButton=document.getElementById("hat_twt_button");if(window.addEventListener){this.partyHatMoreDropdown.addEventListener("click",this.moredropdown,false);typeof this.oHatFBButton!=="undefined"&&this.oHatFBButton&&this.oHatFBButton.addEventListener("click",this.showFacebookOverlay,false);window.addEventListener("click",
this.hideOverlays,false);typeof this.oHatTwtButton!=="undefined"&&this.oHatTwtButton&&this.oHatTwtButton.addEventListener("click",this.showTwitterOverlay,false)}else{this.partyHatMoreDropdown.attachEvent("onclick",this.moredropdown);typeof this.oHatFBButton!=="undefined"&&this.oHatFBButton&&this.oHatFBButton.attachEvent("onclick",this.showFacebookOverlay);document.attachEvent("onclick",this.hideOverlays);typeof this.oHatTwtButton!=="undefined"&&this.oHatTwtButton&&this.oHatTwtButton.attachEvent("onclick",
this.showTwitterOverlay)}},moredropdown:function(a){hat.hideFacebookOverlay();hat.hideTwitterOverlay();var b=hat.partyHatMoreDropdown.parentNode;if(b.className.match(/hat_dd_selected/))b.className=b.className.replace("hat_dd_selected","");else b.className+=" hat_dd_selected";hat.StopEvent(a)},hideMoreDropdown:function(){var a=hat.partyHatMoreDropdown.parentNode;if(a.className.match(/hat_dd_selected/))a.className=a.className.replace("hat_dd_selected","")},showFacebookOverlay:function(a){hat.hideOverlays();
this.oHatFBLikeOverlay=document.getElementById("fb_like_overlay");this.oHatFBLikeOverlay.className="hat_overlay hat_overlay_fb";if(!window.frames.facebook_iframe){var b=hat.facebookURL().split("|");fbULEle=document.createElement("ul");for(var c=0;c<b.length;c++){if(document.URL.indexOf("wallstreetjournal.de")>0)var d=hat.createLIElement(b[c].split(",")[1]+" auf Facebook","hat_fb_icon"),e="http://www.facebook.com/plugins/like.php?href=http://www.facebook.com/"+b[c].split(",")[0]+"&layout=button_count&send=false&show_faces=false&width=90&locale=de_DE";
else{d=hat.createLIElement(b[c].split(",")[1]+" on Facebook","hat_fb_icon");e="http://www.facebook.com/plugins/like.php?href=http://www.facebook.com/"+b[c].split(",")[0]+"&layout=button_count&send=false&show_faces=false&width=90"}e=hat.createIFRAMEElement("facebook_iframe",e,200,21);d.appendChild(e);fbULEle.appendChild(d)}this.oHatFBLikeOverlay.appendChild(fbULEle)}hat.StopEvent(a)},createLIElement:function(a,b){var c=document.createElement("li");h4Ele=document.createElement("h4");c.appendChild(h4Ele);
SpanEle=document.createElement("span");SpanEle.className="icon";SpanEle.setAttribute("id",b);h4Ele.appendChild(SpanEle);strNode=document.createTextNode(a);h4Ele.appendChild(strNode);return c},createIFRAMEElement:function(a,b,c,d){var e=document.createElement("IFRAME");e.setAttribute("name",a);e.setAttribute("id",a);e.setAttribute("src",b);e.setAttribute("frameBorder",0);e.style.width=c+"px";e.setAttribute("allowtransparency","true");e.setAttribute("scrolling","no");e.style.height=d+"px";return e},
hideFacebookOverlay:function(){this.oHatFBLikeOverlay=document.getElementById("fb_like_overlay");if(typeof this.oHatFBLikeOverlay!=="undefined"&&this.oHatFBLikeOverlay)this.oHatFBLikeOverlay.className="hat_overlay hat_overlay_fb hidden"},showTwitterOverlay:function(a){hat.hideOverlays();this.oHatTwtLikeOverlay=document.getElementById("twitter_overlay");this.oHatTwtLikeOverlay.className="hat_overlay hat_overlay_twitter";if(!window.frames.twitter_iframe){var b=hat.twitterURL().split("|");twULEle=document.createElement("ul");
for(var c=0;c<b.length;c++){if(document.URL.indexOf("wallstreetjournal.de")>0)var d=hat.createLIElement(b[c].split(",")[1]+" auf Twitter","hat_twt_icon"),e="http://platform.twitter.com/widgets/follow_button.html?screen_name="+b[c].split(",")[0]+"&show_count=true&show_screen_name=true&lang=de";else{d=hat.createLIElement(b[c].split(",")[1]+" on Twitter","hat_twt_icon");e="http://platform.twitter.com/widgets/follow_button.html?screen_name="+b[c].split(",")[0]+"&show_count=true&show_screen_name=true"}var g=
hat.createIFRAMEElement("twitter_iframe",e,250,21);g.setAttribute("src",e);d.appendChild(g);twULEle.appendChild(d)}this.oHatTwtLikeOverlay.appendChild(twULEle)}hat.StopEvent(a)},hideTwitterOverlay:function(){this.oHatTwtLikeOverlay=document.getElementById("twitter_overlay");if(typeof this.oHatTwtLikeOverlay!=="undefined"&&this.oHatTwtLikeOverlay)this.oHatTwtLikeOverlay.className="hat_overlay hat_overlay_twitter hidden"},facebookURL:function(){return this.currId.match(/wsj_asia/)?"wsjasia, WSJAsia":
this.currId.match(/wsj_india/)?"wsjindia, WSJ India":this.currId.match(/wsj_gm/)?"pages/The-Wall-Street-Journal-Deutschland/111293262305204, WSJDeutschland":this.currId.match(/wsj_eu/)?"pages/The-Wall-Street-Journal-Europe/124739154250536, WSJEurope":this.currId.match(/wsjpro_eu/)?"pages/The-Wall-Street-Journal-Europe/124739154250536, WSJEurope":this.currId.match(/wsjpro_asia/)?"wsjasia, WSJAsia":this.currId.match(/wsj_classroom/)?"wsjclassroom, WSJclassroom":this.currId.match(/wsj/)?"wsj, WSJ":this.currId.match(/bol/)?
"barronsonline, Barron's":this.currId.match(/mw/)?"marketwatch, Marketwatch":this.currId.match(/sm/)?"SmartMoney, SmartMoney":this.currId.match(/atd/)?"allthingsd, AllThingsD":this.currId.match(/fins/)?"FINSfinancecareers,FINS Finance|FINStechcareers,FINS Technology|FINSsalesmarketingcareers,FINS Sales & Marketing":"wsj, WSJ"},twitterURL:function(){return this.currId.match(/wsj_eu/)?"wsjeurope, WSJEurope":this.currId.match(/wsj_india/)?"wsjindia, WSJ India":this.currId.match(/wsj_gm/)?"WSJDeutschland, WSJDeutschland":
this.currId.match(/wsjpro_eu/)?"wsjeurope, WSJEurope":this.currId.match(/wsjpro_asia/)?"wsjasia, WSJAsia":this.currId.match(/wsj_classroom/)?"wsjclassroom, WSJclassroom":this.currId.match(/wsj_pro/)?"wsj, WSJ":this.currId.match(/wsj_jp/)?"WSJJapan, WSJJapan":this.currId.match(/wsj_ch/)?"wsjchina, WSJChina":this.currId.match(/wsj_asia/)?"wsjasia, WSJAsia":this.currId.match(/wsj_sp/)?"WSJAmericas, WSJAmericas":this.currId.match(/wsj/)?"wsj, WSJ":this.currId.match(/bol/)?"barronsonline, Barron's":this.currId.match(/mw/)?
"MarketWatch, MarketWatch":this.currId.match(/sm/)?"SmartMoney, SmartMoney":this.currId.match(/atd/)?"allthingsd, AllThingsD":this.currId.match(/fins/)?"FINSider,FINS Finance Careers|techFINSider,FINS Technology Careers|salesFINSider,FINS Sales Careers":"wsj, WSJ"},getSelectedProduct:function(){var a=document.getElementById("hattabs").children;for(i=0;i<a.length;i++)if(a[i].className.match(/current/))return a[i].id;return"hat_tab_wsj"},StopEvent:function(a){if(!a)if(window.event)a=window.event;else return;
if(a.cancelBubble!=null)a.cancelBubble=true;a.stopPropagation&&a.stopPropagation();a.preventDefault&&a.preventDefault();if(window.event)a.returnValue=false;if(a.cancel!=null)a.cancel=true},hideOverlays:function(){hat.hideFacebookOverlay();hat.hideTwitterOverlay();hat.hideMoreDropdown()}};hat.init();
dojo.provide("dj.widget.networkHat.infocomplete");function InfoComplete(){this.autoComplete=this.dataSource=null;this.count=0;this.allowexchanges=this.allowsymboltypes=this.allowcountries=this.domain="";this.currentQueryHasResultMatch=false;this.lastExactResult="";this.exactMatches=[];this.keyword=this.symbol=null}function autoCompleteTrim(a){return a.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1")}
InfoComplete.prototype.Setup=function(a){var b,c;if(!(typeof a=="undefined"||a===null)){b=0;for(c=a.sections.length;b<c;b++){var d=a.sections[b].dataSource.server;if(typeof d=="undefined"||d===null||d==="")return}document.getElementsByTagName("BODY");this.count=a.count;this.dataSource=[];b=0;for(c=a.sections.length;b<c;b++){d=a.sections[b];if(d.type=="keyword")this.keyword=b;else if(d.type=="symbol")this.symbol=b;var e=new YAHOO.widget.DS_XHR(d.dataSource.server,d.dataSource.schema);e.responseType=
d.dataSource.responseType;e.scriptQueryAppend=d.dataSource.scriptQueryAppend;e.index=b;e.dataErrorEvent.subscribe(this.handleError,e);this.dataSource[b]=e}this.autoComplete=new YAHOO.widget.MultiAutoComplete(a.inputId,a.containerId,this.dataSource);this.count=a.count;this.autoComplete.autoHighlight=false;this.autoComplete.maxResultsDisplayed=a.count;this.autoComplete.queryDelay=a.delay;this.autoComplete.allowBrowserAutocomplete=false;this.autoComplete.typeAhead=true;this.autoComplete.animVert=false;
this.autoComplete.animHoriz=false;this.autoComplete.delimChar=",";this.autoComplete.setHeader('Choose a quote match or "GO" to get quote news');this.autoComplete.setFooter("Separate multiple symbols with commas (,)");this.autoComplete.formatResult=function(g,l,p){return a.sections[p].formatFunc(g,l,p,this)};this.autoComplete.dataReturnEvent.subscribe(this.checkResultsForExactMatch,this.autoComplete,this);this.autoComplete.textboxKeyEvent.subscribe(this.checkPastExactResults,this.autoComplete,this)}};
InfoComplete.prototype.getFirstDelimChar=function(){if(this.autoComplete.delimChar&&this.autoComplete.delimChar.length>0)return this.autoComplete.delimChar[0];return""};
InfoComplete.prototype.isSymbolMatch=function(){var a=this.getFirstDelimChar();if(this.currentQueryHasResultMatch===true&&this.lastExactResult.toUpperCase()==autoCompleteTrim(this.autoComplete._oTextbox.value).replace(/,$|\.,$/,"").toUpperCase())return true;a=this.autoComplete._oTextbox.value.split(a);for(var b=0;b<this.exactMatches.length;b++)for(var c=0;c<a.length;c++)if(this.exactMatches[b]==a[c])return true;return this.doesListHaveMatch(0)};
InfoComplete.prototype.handleError=function(a,b){var c=b[1];c._populateStaging&&c._populateStaging("null",null,c,b[0].index)};
InfoComplete.prototype.checkPastExactResults=function(a,b){if("function"==typeof this.getFirstDelimChar){var c=this.getFirstDelimChar();if(b[0]._oTextbox.value.length>0&&b[0]._oTextbox.value.lastIndexOf(c)==b[0]._oTextbox.value.length-1&&this.currentQueryHasResultMatch){if(this.exactMatches.length>0)for(c=0;c<this.exactMatches.length;c++)if(this.exactMatches[c]==this.lastExactResult)return;this.exactMatches.push(this.lastExactResult)}}};
InfoComplete.prototype.checkResultsForExactMatch=function(a,b){if(!(!b||b.length<4||b[3]>0)){var c=this.getFirstDelimChar(),d=b[2],e=b[0]._oTextbox.value;if(e.indexOf(c)>0){e=e.split(c);e=autoCompleteTrim(e[e.length-1])}if(d&&d.length>0)for(c=0;c<d.length;c++)if(d[c]&&d[c][0]!==null){var g=d[c][0];if(e.toUpperCase()==g.toUpperCase()){this.currentQueryHasResultMatch=true;this.lastExactResult=e;return}}this.currentQueryHasResultMatch=false}};
InfoComplete.prototype.doesListHaveMatch=function(a){var b=this.getFirstDelimChar(),c=this.autoComplete.getListItems(),d=autoCompleteTrim(this.autoComplete._oTextbox.value).replace(/,$|\.,$/,"");if(d.indexOf(b)>0){d=d.split(b);d=autoCompleteTrim(d[d.length-1])}if(a<c.length){a=c[a];for(c=0;c<a.length;c++)if(a[c]&&a[c]._oResultData)if(d.toUpperCase()==a[c]._oResultData[0].toUpperCase())return true}return false};
function param(){this.array=Array(1);this.setValue=function(a){this.array[0]=a};this.getValue=function(){return this.array[0]}}function InstallLibrary(a){a=a||window;a.symbolComplete=new InfoComplete;a.InfoComplete=new InfoComplete}InstallLibrary();
dojo.provide("dj.widget.networkHat.AutoComplete");dojo.require("dj.widget.networkHat.infocomplete");dojo.require("dj.lang");dojo.getObject("dj.context.networkHat",true);
(function(){var a=dj.widget.networkHat;(a.AutoComplete=function(){this.d=document;this.cdnDomain=dj.context.core.cdnPrefix;this.uP="";if(typeof uP!="undefined")this.uP=uP;var b=new Date;b=""+b.getFullYear()+b.getMonth()+b.getDay();this.jScript=this.d.location.host.indexOf("s.dev")!=-1||this.d.location.host.indexOf("idev")!=-1?this.uP+"/djscript/j_networkHat-"+b+".js":this.cdnDomain+"/djscript/j_networkHat-"+b+".js";this.d.getElementsByTagName("div")[0].className.indexOf("subType-subscribed");this.inputDefaultText=
"News, Quotes, Companies, Videos";b=dojo.byId("hat_div");this.oHatInput=dojo.byId("hat_input_auto");dojo.query(".hat_select",b);if(dojo.isIE&&(this.d.domain.indexOf("ds.sat.wsj.com")!=-1||this.d.domain.indexOf("ds.wsj.com")!=-1))dj.util.Url.addStylesheet("http://s.wsj.net/css/hatIEPortfolio.css");this.onfocusLoad=dojo.connect(this.oHatInput,"onfocus",this,this.onHatLoad);this.onmouseoverLoad=dojo.connect(this.oHatInput,"onmouseover",this,this.onHatLoad);this.onclickClear=dojo.connect(this.oHatInput,
"onclick",this,this.clearField);this.onkeydownClear=dojo.connect(this.oHatInput,"onkeydown",this,this.clearField);if(this.oHatInput.value!==""&&this.oHatInput.value!=this.inputDefaultText||dj.context.networkHat.jnetworkHatJsLoaded)this.onHatLoad();this.setFieldDefault()}).prototype={setFieldDefault:function(){if(this.oHatInput.value===""){this.oHatInput.value=this.inputDefaultText;dojo.addClass(this.oHatInput,"unUsed")}},clearField:function(){this.stopObservingClick();if(dojo.hasClass(this.oHatInput,
"unUsed"))this.oHatInput.value="";dojo.removeClass(this.oHatInput,"unUsed")},stopObservingClick:function(){dojo.disconnect(this.onclickClear);dojo.disconnect(this.onkeydownClear)},onHatLoad:function(){dojo.disconnect(this.onfocusLoad);dojo.disconnect(this.onmouseoverLoad);if(dj.context.networkHat.jnetworkHatJsLoaded)this.initInfoComplete();else{var b;if(!this.d.getElementsByTagName("head")){b=new Element("head");this.d.getElementsByTagName("body")[0].appendChild(b)}this.jsNode=this.loadAutoCompleteScript(this.jScript)}},
loadAutoCompleteScript:function(b){var c=this.d.createElement("script");c.type="text/javascript";c.src=b;if(this.d.getElementsByTagName("head").length===0){b=this.d.createElement("head");this.d.getElementsByTagName("html")[0].appendChild(b)}this.d.getElementsByTagName("head")[0].appendChild(c);return c},initInfoComplete:function(){if(dojo.isIE&&(this.d.domain.indexOf("ds.sat.wsj.com")!=-1||this.d.domain.indexOf("ds.wsj.com")!=-1))dj.util.Url.addStylesheet("http://s.wsj.net/css/hatIEPortfolio.css");
initInfoComplete();this.stopObservingClick();dojo.connect(this.oHatInput,"onfocus",null,function(){this.style.backgroundImage="url('http://s.wsj.net/img/b.gif')";searchFieldOnFocus(this);setFocused(this)});dojo.connect(this.oHatInput,"onkeypress",null,function(){showHideCRDrpdwn("hide")});dojo.connect(this.oHatInput,"onblur",null,function(){showHideCRDrpdwn("show")});var b=this.oHatInput.value;b&&b!=this.inputDefaultText&&InfoComplete.autoComplete.sendQuery(b)}}})();

dojo.provide("dj.module.browserPhaseout");dojo.declare("dj.module.browserPhaseout",null,{constructor:function(cfg){this._cfg=dojo.mixin(this.DEFAULT_CONFIG,cfg);this._duc=dj.util.Cookie;},DEFAULT_CONFIG:{djCookieName:"DJCOOKIE",djSessionName:"DJSESSION",bannerDivIdClass:"ie6banner",bannerDivId:"ie6bannerDiv",cookieName:"NoIE6Banner",phaseoutBr:"IE",brVersion:6},init:function(){if(this._cfg.phaseoutBr==="IE"){if(dojo.isIE<=this._cfg.brVersion){this.displayOrhideMessage();}}},displayOrhideMessage:function(){var sessionBlock=this._duc.getGroupCookie(this._cfg.djSessionName,this._cfg.cookieName);var permanentBlock=this._duc.getGroupCookie(this._cfg.djCookieName,this._cfg.cookieName);this.hiddenClassName=this._cfg.bannerDivIdClass+" hidden";this.upgradeDiv=dojo.byId(this._cfg.bannerDivId);if(this.upgradeDiv!==null){if(sessionBlock||permanentBlock){this.upgradeDiv.className=this.hiddenClassName;}else{this.displayBrowserImage();this.makeConnections();}}},displayBrowserImage:function(){var browserImagesArr=[];dojo.query("#bList .b_li").forEach(function(node,index,arr){browserImagesArr[index]=node.innerHTML;});var whichImage=0;var imagesLength=browserImagesArr.length;var milisecs=new Date().getMilliseconds();dojo.query("#bList .b_li").forEach(function(node,index,arr){whichImage=milisecs%imagesLength--;node.innerHTML=browserImagesArr[whichImage];browserImagesArr.splice(whichImage,1);});this.upgradeDiv.className=this._cfg.bannerDivIdClass;},makeConnections:function(){var that=this;dojo.connect(dojo.byId("actClose"),"onclick",function(ev){that.upgradeDiv.className=that.hiddenClassName;var check=dojo.byId("inputCheck");if(typeof check!="undefined"&&check.checked){dj.util.Cookie.setGroupCookie(that._cfg.djCookieName,that._cfg.cookieName,"Y",365);}else{dj.util.Cookie.setGroupCookie(that._cfg.djSessionName,that._cfg.cookieName,"Y");}});},openPopup:function(url,width,height){if(typeof width==="undefined"){width=600;}
if(typeof height==="undefined"){height=600;}
var popWin="width="+width+",height= "+height+",resizable=1,scrollbars=1,location=0,status=0";var win=window.open(url,"browserDownload",popWin);}});dojo.provide("dj.module.newsReel");dojo.require("dj.widget.ad.AdManager");dojo.require("dj.util.Page");dojo.require("dj.widget.panels.virtual.Carousel");dj.module.newsReel={REEL_STATE:{FULL:0,COLLAPSED:1,SMALL:2},reelState:0,reelHeight:0,isAnimation:false,cfg:{reelOpenClass:"reelState-open",reelClosedClass:"reelState-closed",btnSelectedClass:"selected",stateCookieName:"newsReel_state",currentArticleClass:"currentArticle",currentPointerClass:"current",newsReelPointerClass:".newsreelPointer",reelLoadedClass:"reelState-loaded"},oCnt:null,cntId:null,init:function(newsreelContainer,adRegisterKey){this.oCnt=dojo.byId(newsreelContainer);if(this.oCnt===null){throw new Error("{newsReel} container is not located.");}
dojo.addClass(this.oCnt,this.cfg.reelLoadedClass);this.currentArticle=null;var defState=this.REEL_STATE;this.reelState=defState.FULL;this.reel=this.initReel(this.oCnt);if(typeof adRegisterKey==='undefined'||adRegisterKey===null||adRegisterKey===''){return;}
try{this.initNewsReelAds(adRegisterKey,this.oCnt);}catch(e){console.error("{newsReel} ads error: "+e);}},setId:function(newsreelContainer){this.cntId=newsreelContainer;},update:function(){this.init(this.cntId);return this;},initReel:function(cnt){var reel=dj.widget.panels.PanelsFactory.create(cnt,{core:{panelGroup:"#newsReelContent > .reelContentTree .unitList",panel:"li",viewArea:4},carousel:{navContainer:".reelNav",prevButton:".newsreel_prev",nextButton:".newsreel_next",type:"circular"}});var vid=this._setCurrentPanelActive(cnt);if(vid===null){return reel;}
this.reelPtrCnt=dojo.query(this.cfg.newsReelPointerClass,cnt)[0];var pans=dojo.query(".newsreel_pointer_container li",this.reelPtrCnt);dojo.addClass(pans[vid],this.cfg.currentPointerClass);if(dojo.query(".unit.sponsor").children().first()[0]){var element=pans[0];var grp=element.parentNode;var clone=dojo.create(element.tagName,{"className":element.className,innerHTML:element.innerHTML});grp.appendChild(clone);}
var reelPtr=dj.widget.panels.PanelsFactory.create(this.reelPtrCnt,{core:{panelGroup:".newsreel_pointer_container",panel:"li",viewArea:4,controller:reel},carousel:{type:"circular"}});if(reel.getNumberOfPanels()>3){try{var vidPosition=reel.getById(vid).getPosition();reel.setActiveByPosition(vidPosition+1);}catch(e){console.error("{newsReel} cannot scroll to invalid panel id: "+vid);}}
return reel;},_setCurrentPanelActive:function(cnt){var artCurrent=((typeof AT_VARS==="object"&&AT_VARS.baseDocId)?AT_VARS.baseDocId:dj.util.Page.getQueryParam('baseDocId'));var vid=null;var that=this;dojo.query("#newsReelContent > .reelContentTree .unitList .unit",cnt).forEach(function(el,pos){var anch=dojo.query("a",el)[0];if((typeof anch!=='undefined')&&(anch.href!==null)&&(anch.href.indexOf(artCurrent)!==-1)){vid=pos;dojo.addClass(dojo.byId(el),that.cfg.currentPointerClass);}});return vid;},initNewsReelAds:function(adRegisterKey,newsReelContainer){var adId="";dojo.query("#newsReelContent .newsReelAd",newsReelContainer).forEach(function(el){dj.widget.ad.AdManager.loadAds(adRegisterKey,{id:el.getAttribute("id")});});}};dojo.provide("dj.module.globalHeader");dojo.deprecated("dj.module.globalHeader","use the one in the 'header' bundle","0.7");dojo.require("dj.lang");dojo.require("dj.util.Config");dojo.require("dj.util.Cookie");dojo.require("dj.util.Date");dojo.require("dj.util.Region");dojo.require("dj.util.Element");dojo.require("dj.util.User");dj.module.globalHeader=function(){var DEFAULT_CONFIG={HEADER_CONTAINER_CLASS:".header",TIMESTAMP_CLASS:".date",WSJ_LOGO_ID:"wsjLogo",WSJ_LARGE_LOGO_CLASSNAME:"logo_large",WSJ_SMALL_LOGO_CLASSNAME:"logo_small",CURRENT_SUBSECTION_DISPLAY_CLASS:".currentSubSection",GLOBALNAV_SUBSECTION_ELEMENT_ID:"currentGlobalNavSubSection",SUBSCRIBER_LOGIN_CLASS:".login",HEADER_PROMO_CLASS:".promo",SUBSCRIBER_DETAILS_ELEMENT_ID:"subscribedUserDetailsId",COMMUNITY_FORUMS_LINK_CLASS:".communityForumsLink",TODAYS_PAPER_LINK_CLASS:".todaysPaperLink",MOJ_LINK_CLASS:".myOnlineJournalLink",MESSAGE_CENTER_LINK_CLASS:".messageCenterLink",MESSAGE_COUNT_CLASS:".messageCount",LOGIN_USERNAME_ELEMENT_ID:"login_username",LOGIN_PASSWORD_ELEMENT_ID:"login_password",LOGIN_FORM_ID:"login_form",PAGE_URL_ELEMENT_ID:"page_url",LOGOUT_LINK_ELEMENT_ID:"logoutLink",LOGIN_BUTTON_ELEMENT_ID:"login_button",USER_NAME_ELEMENT_ID:"userName",WSJ_LOGO_FADE_APPEAR_DURATION:"1.0",WSJ_LOGO_DELAY_DURATION:"2000",LOGGED_IN_COMMUNITY_URL:"/community",LOGGED_IN_TODAYS_PAPER_URL:"/itp?mod=WSJ_formfactor",MESSAGE_CENTER_POST_URL:"/community/integration/userinfo.html",LOGOUT_URL:"/static_html_files/logout_confirmation.htm",SUBSCRIBER_HOMEPAGE_PID:"0_0_WH_0001",NONSUBSCRIBER_HOMEPAGE_PID:"0_0_WH_0001_public",ASIA_PAGE_PID:"0_0_WP_2103",EUROPE_PAGE_PID:"0_0_WP_2104",NONSUBSCRIBER_NEWSLETTERS_ALERTS_PAGE_PID:"5_6007",NONSUBSCRIBER_SEARCH_PAGE_PID:"3_0466",HOMEPAGE_SUBSCRIBER_URL:"/",SEARCH_PAGE_SUBSCRIBER_URL:"/search",TODAYS_PAPER_LINK_CONTAINER_CLASS:".todaysPaperLinkContainer",VIDEO_LINK_CONTAINER_CLASS:".videoLinkContainer",COLUMNS_LINK_CONTAINER_CLASS:".columnsLinkContainer",BLOGS_LINK_CONTAINER_CLASS:".blogsLinkContainer",INTERACTIVE_GRAPHICS_LINK_CONTAINER_CLASS:".interactiveGraphicsLinkContainer",TOPICS_LINK_CONTAINER_CLASS:".topicsLinkContainer",COMMUNITY_FORUMS_LINK_CONTAINER_CLASS:".communityForumsLinkContainer",TODAYS_PAPER_PID:"0_0_WP_40",TODAYS_PAPER_US_NONSUB_PID:"2_0433",TODAYS_PAPER_EUROPE_NONSUB_PID:"2_0434",TODAYS_PAPER_ASIA_NONSUB_PID:"2_0435",TODAYS_PAPER_US_PID:"2_0133",TODAYS_PAPER_EUROPE_PID:"2_0134",TODAYS_PAPER_ASIA_PID:"2_0135",TODAYS_PAPER_PAST_EDITIONS_PID:"2_0233",TODAYS_PAPER_INDEX_BIZ_PID:"2_0156",TODAYS_PAPER_INDEX_PEOPLE_PID:"2_0155",TODAYS_PAPER_CORRECTIONS_PID:"Corrections",VIDEO_PID:"0_0_WP_3000",BLOGS_PID:"8_0019",COLUMNS_PID:"2_0140",INTERACTIVE_GRAPHICS_PID:"0_0_WP_2003",TOPICS_PID:"0_0_WT_0001",NEWSLETTERS_ALERTS_SUB_PID:"5_6001",NEWSLETTERS_ALERTS_PUB_PID:"5_6003",MOJ_LINK_URL:"/page/my-journal-main.html",MDC_LINK_URL:"/mdc/page/marketsdata.html",MDC_PAGE_PID:"2_3000",COMMUNITY_HIGHLIGHT_COMPARE_URL:"/community",FORUMS_HIGHLIGHT_COMPARE_URL:"forums.wsj.com",FREE_REG_CLASS:".freereg",LOCATION_NAV_CLASS:".location_nav",LOCATION_NAV_COLLAPSED_CLASSNAME:"location_collapsed",LOCATION_NAV_EXPANDED_CLASSNAME:"location_expanded",US_EDITION_LINK_CLASS:".map_us",EU_EDITION_LINK_CLASS:".map_europe",ASIA_EDITION_LINK_CLASS:".map_asia",IN_EDITION_LINK_CLASS:".map_india",LOGGED_IN_TODAYS_PAPER_URL_ASIA:"/page/asia_in_todays_paper.html?mod=WSJ_formfactor",LOGGED_IN_TODAYS_PAPER_URL_EUROPE:"/page/europe_in_todays_paper.html?mod=WSJ_formfactor",US_EDITION_MDC_URL:"/marketsdata",EU_EDITION_MDC_URL:"/mdc/public/page/marketsdata_europe.html",ASIA_EDITION_MDC_URL:"/mdc/public/page/marketsdata_asia.html",IN_EDITION_MDC_URL:"/mdc/public/page/marketsdata_asia.html",MDC_COMPARE_URL:"/mdc/",FOOTER_CONTAINER_CLASS:".pagefooter"};return{initialize:function(config){this.cfg=dj.lang.cloneMixin(DEFAULT_CONFIG,config);var headerContainerClass=this.cfg.HEADER_CONTAINER_CLASS;this.oHeader=dojo.query(headerContainerClass)[0];this.editionDropdownSetUp();this.displaySubSection();this.displayTimeStamp();var that=this;this.currRegion=dj.util.Region.getViewByRegion();this.concatURL='';if((typeof gcDomain!=="undefined")&&(gcDomain!==null)&&(gcDomain!=="")){this.concatURL="http://"+gcDomain;}else{this.concatURL="http://"+document.domain;}
dj.util.User.isLoggedIn(function(isLoggedIn){if(isLoggedIn){that.displaySubscriberDetails();that.setupLogout();}else{that.setupLogin();var freeregClass=that.cfg.FREE_REG_CLASS;that.ofreereg=dojo.query(freeregClass,that.oHeader)[0];var registerModule=dojo.query("#register_module",that.ofreereg)[0];dojo.style(registerModule,{display:"none"});dojo.style(that.ofreereg,{display:"block"});var subscriberLoginClass=that.cfg.SUBSCRIBER_LOGIN_CLASS;that.oSubscriberLogin=dojo.query(subscriberLoginClass,that.oHeader)[0];var loginModule=dojo.query(".login_module",that.oSubscriberLogin)[0];dojo.style(loginModule,{display:"none"});dojo.style(that.oSubscriberLogin,{display:"block"});var headerPromoClass=that.cfg.HEADER_PROMO_CLASS;that.oHeaderPromo=dojo.query(headerPromoClass,that.oHeader)[0];dojo.style(that.oHeaderPromo,{display:"block"});}});this.highlightFormFactorLinks();var todaysPaperLinkClass=this.cfg.TODAYS_PAPER_LINK_CLASS;this.oTodaysPaperLink=dojo.query(todaysPaperLinkClass,this.oHeader)[0];var loggedInTodaysPaperUrl=this.cfg.LOGGED_IN_TODAYS_PAPER_URL;var loggedInTodaysPaperUrlAsia=this.cfg.LOGGED_IN_TODAYS_PAPER_URL_ASIA;var loggedInTodaysPaperUrlEurope=this.cfg.LOGGED_IN_TODAYS_PAPER_URL_EUROPE;var currEdition="";if(this.currRegion=="asia"||this.currRegion=="asia,india"){loggedInTodaysPaperUrl=loggedInTodaysPaperUrlAsia;}else if(this.currRegion=="europe"){loggedInTodaysPaperUrl=loggedInTodaysPaperUrlEurope;}
if((typeof gcDomain!=="undefined")&&(gcDomain!==null)&&(gcDomain!=="")){this.oTodaysPaperLink.href="http://"+gcDomain+loggedInTodaysPaperUrl;}else{this.oTodaysPaperLink.href=loggedInTodaysPaperUrl;}
var that=this;dj.util.User.isSubLoggedIn(function(subLoggedIn){if(!subLoggedIn){if((typeof gcDomain!=="undefined")&&(gcDomain!==null)&&(gcDomain!=="")){that.oTodaysPaperLink.href="http://"+gcDomain+"/public"+loggedInTodaysPaperUrl;}else{that.oTodaysPaperLink.href="/public"+loggedInTodaysPaperUrl;}}});},toggleDropdownClass:function(){var selLocDrpdwnCollapsedClassName=this.cfg.LOCATION_NAV_COLLAPSED_CLASSNAME;var selLocDrpdwnExpandedClassName=this.cfg.LOCATION_NAV_EXPANDED_CLASSNAME;if(dojo.hasClass(this.oLocDropDownContainer,selLocDrpdwnCollapsedClassName)){dojo.removeClass(this.oLocDropDownContainer,selLocDrpdwnCollapsedClassName);dojo.addClass(this.oLocDropDownContainer,selLocDrpdwnExpandedClassName);}else if(dojo.hasClass(this.oLocDropDownContainer,selLocDrpdwnExpandedClassName)){dojo.addClass(this.oLocDropDownContainer,selLocDrpdwnCollapsedClassName);}},editionDropdownSetUp:function(){var that=this;var locationNavClass=this.cfg.LOCATION_NAV_CLASS;this.oLocationNav=dojo.query(locationNavClass,this.oHeader)[0];var selLocDrpdwnCollapsedClassName=this.cfg.LOCATION_NAV_COLLAPSED_CLASSNAME;var selLocDrpdwnExpandedClassName=this.cfg.LOCATION_NAV_EXPANDED_CLASSNAME;var usEditionLinkClassName=this.cfg.US_EDITION_LINK_CLASS;var usEditionLinkClassName=this.cfg.US_EDITION_LINK_CLASS;var euEditionLinkClassName=this.cfg.EU_EDITION_LINK_CLASS;var inEditionLinkClassName=this.cfg.IN_EDITION_LINK_CLASS;var asiaEditionLinkClassName=this.cfg.ASIA_EDITION_LINK_CLASS;this.usEditionMDCUrl=this.cfg.US_EDITION_MDC_URL;this.euEditionMDCUrl=this.cfg.EU_EDITION_MDC_URL;this.inEditionMDCUrl=this.cfg.IN_EDITION_MDC_URL;this.asiaEditionMDCUrl=this.cfg.ASIA_EDITION_MDC_URL;var mdcCompareUrl=this.cfg.MDC_COMPARE_URL;this.oCurrentEdition=dojo.byId("currentEdition");this.oUsEdition=dojo.byId("usEdition");this.oEuEdition=dojo.byId("europeEdition");this.oInEdition=dojo.byId("indiaEdition");this.oAsiaEdition=dojo.byId("asiaEdition");this.oChiEdition=dojo.byId("chiEdition");this.oSpaEdition=dojo.byId("spaEdition");this.oPorEdition=dojo.byId("porEdition");this.osectionFooterSub=dojo.byId("hrefNonSubId");this.osectionFooterNonSub=dojo.byId("hrefSubId");this.oUsEditionFooter=dojo.byId("usEditionFooter");this.currRegion=dj.util.Region.getViewByRegion();var currEdition="";if((typeof gcDomain!=="undefined")&&(gcDomain!==null)&&(gcDomain!=="")){this.tempConcatURL="http://"+gcDomain;}else{this.tempConcatURL="http://"+document.domain;}
this.isMDCPageFlag=((document.location.href!==null)&&(document.location.href!=="")&&(document.location.href.indexOf(mdcCompareUrl)!==-1));if(this.oUsEdition!==null){dojo.connect(this.oUsEdition,"onclick",this,function(ev){dojo.stopEvent(ev);dj.util.Region.setViewByRegion('na,us');dj.util.Cookie.setGroupCookie("DJCOOKIE","HOMEPAGE","/home-page",365);window.location=(this.isMDCPageFlag)?this.tempConcatURL+this.usEditionMDCUrl:this.oUsEdition.href;});}
if(this.oUsEditionFooter!==null){dojo.connect(this.oUsEditionFooter,"onclick",this,function(ev){dojo.stopEvent(ev);dj.util.Region.setViewByRegion('na,us');dj.util.Cookie.setGroupCookie("DJCOOKIE","HOMEPAGE","/home/us",365);window.location=(this.isMDCPageFlag)?this.tempConcatURL+this.usEditionMDCUrl:this.oUsEditionFooter.href;});}
if(this.oEuEdition!==null){dojo.connect(this.oEuEdition,"onclick",this,function(ev){dojo.stopEvent(ev);window.location=(this.isMDCPageFlag)?this.tempConcatURL+this.euEditionMDCUrl:this.oEuEdition.href;if(this.isMDCPageFlag){dj.util.Region.setViewByRegion("europe");dj.util.Cookie.setGroupCookie("DJCOOKIE","HOMEPAGE","/home/europe",365);}});}
if(this.oInEdition!==null){dojo.connect(this.oInEdition,"onclick",this,function(ev){dojo.stopEvent(ev);window.location=(this.isMDCPageFlag)?this.tempConcatURL+this.inEditionMDCUrl:this.oInEdition.href;if(this.isMDCPageFlag){dj.util.Region.setViewByRegion("asia,india");dj.util.Cookie.setGroupCookie("DJCOOKIE","HOMEPAGE","/home/india",365);}});}
if(this.oAsiaEdition!==null){dojo.connect(this.oAsiaEdition,"onclick",this,function(ev){dojo.stopEvent(ev);window.location=(this.isMDCPageFlag)?this.tempConcatURL+this.asiaEditionMDCUrl:this.oAsiaEdition.href;if(this.isMDCPageFlag){dj.util.Region.setViewByRegion("asia");dj.util.Cookie.setGroupCookie("DJCOOKIE","HOMEPAGE","/home/asia",365);}});}
if(this.oChiEdition!==null){dojo.connect(this.oChiEdition,"onclick",this,function(ev){dojo.stopEvent(ev);window.open(this.oChiEdition.href);});}
if(this.oSpaEdition!==null){dojo.connect(this.oSpaEdition,"onclick",this,function(ev){dojo.stopEvent(ev);window.location=this.oSpaEdition.href;});}
if(this.oPorEdition!==null){dojo.connect(this.oPorEdition,"onclick",this,function(ev){dojo.stopEvent(ev);window.location=this.oPorEdition.href;});}
if(this.osectionFooterSub!==null){dojo.connect(this.osectionFooterSub,"onclick",this,function(ev){dojo.stopEvent(ev);window.location=this.osectionFooterSub.href;});}
if(this.osectionFooterNonSub!==null){dojo.connect(this.osectionFooterNonSub,"onclick",this,function(ev){dojo.stopEvent(ev);window.location=this.osectionFooterNonSub.href;});}
if(this.currRegion=="asia"){currEdition="Asia Edition";this.oSelectedEdition=dojo.query(asiaEditionLinkClassName,this.oHeader)[0];}else if(this.currRegion=="asia,india"){currEdition="Asia Edition";this.oSelectedEdition=dojo.query(inEditionLinkClassName,this.oHeader)[0];}else if(this.currRegion=="europe"){currEdition="Europe Edition";this.oSelectedEdition=dojo.query(euEditionLinkClassName,this.oHeader)[0];}else{currEdition="U.S. Edition";this.oSelectedEdition=dojo.query(usEditionLinkClassName,this.oHeader)[0];}
dojo.addClass(this.oSelectedEdition,"selected");this.oCurrentEdition.innerHTML=currEdition;this.oFormFactorContainer=dojo.byId("formFactorContainer");dojo.style(this.oFormFactorContainer,{"display":""});this.oLocDropDownContainer=dojo.byId("locNavContainer");dojo.style(this.oLocDropDownContainer,{"display":""});if(this.oLocDropDownContainer!==null){var toggleDropdownClass=function(){if(dojo.hasClass(that.oLocDropDownContainer,selLocDrpdwnCollapsedClassName)){dojo.removeClass(that.oLocDropDownContainer,selLocDrpdwnCollapsedClassName);dojo.addClass(that.oLocDropDownContainer,selLocDrpdwnExpandedClassName);}else if(dojo.hasClass(that.oLocDropDownContainer,selLocDrpdwnExpandedClassName)){dojo.removeClass(that.oLocDropDownContainer,selLocDrpdwnExpandedClassName);dojo.addClass(that.oLocDropDownContainer,selLocDrpdwnCollapsedClassName);}};dojo.connect(this.oLocationNav,"onclick",this,function(event){dojo.stopEvent(event);toggleDropdownClass();});dojo.connect(document,"onclick",this,function(event){var isMousePointerinModalContainer=dj.util.Element.contains(this.oLocDropDownContainer,event.clientX,event.clientY);if(isMousePointerinModalContainer==false){if(dojo.hasClass(this.oLocDropDownContainer,selLocDrpdwnExpandedClassName)){dojo.removeClass(this.oLocDropDownContainer,selLocDrpdwnExpandedClassName);dojo.addClass(this.oLocDropDownContainer,selLocDrpdwnCollapsedClassName);}}});this.oSectionFooterNonSub=dojo.byId("sectionFooterNonSub");this.oSectionFooterSub=dojo.byId("sectionFooterSub");dj.util.User.isLoggedIn(function(isLoggedIn){if(isLoggedIn){dojo.style(that.oSectionFooterNonSub,{"display":"none"});dojo.style(that.oSectionFooterSub,{"display":""});}else{dojo.style(that.oSectionFooterNonSub,{"display":""});dojo.style(that.oSectionFooterSub,{"display":"none"});}});}},displayTimeStamp:function(){var timestampClass=this.cfg.TIMESTAMP_CLASS;this.oTimestamp=dojo.query(timestampClass,this.oHeader)[0];if((typeof pDate!=="undefined")&&(this.oTimestamp!==null)){if(window.pStl=="renovation"){var pubDate=dj.util.Date.displayTime(pDate,pDateinGMT);this.oTimestamp.innerHTML=pubDate;}else{this.oTimestamp.innerHTML=pDate;}}},displaySubSection:function(){this.oCurrentSubSection=dojo.query(this.cfg.CURRENT_SUBSECTION_DISPLAY_CLASS,this.oHeader)[0];if((typeof globalHeaderPageTitle!=="undefined")&&(globalHeaderPageTitle!==null)&&(globalHeaderPageTitle!=="")){this.oCurrentSubSection.innerHTML=globalHeaderPageTitle;this._delayedFadeInSubSection();}},_delayedFadeInSubSection:function(){setTimeout(dojo.hitch(this,function(){dojo.style(this.oCurrentSubSection,{"display":"inline","opacity":0});dojo.fadeIn({node:this.oCurrentSubSection,duration:(this.cfg.WSJ_LOGO_FADE_APPEAR_DURATION*1000)}).play();}),this.cfg.WSJ_LOGO_DELAY_DURATION);},displaySubscriberDetails:function(){var userNameElementId=this.cfg.USER_NAME_ELEMENT_ID;dj.util.User.renderCallsign(userNameElementId);this.setupSubscriberLinks();var messageCenterLinkClass=this.cfg.MESSAGE_CENTER_LINK_CLASS;this.oMessageCenterLink=dojo.query(messageCenterLinkClass,this.oHeader)[0];var that=this;dj.util.User.isSubLoggedIn(function(subLoggedIn){if(subLoggedIn){that.setupMessageCenter();}else{that.setUpMJLinksForReg();dojo.style(that.oMessageCenterLink,{"display":"none"});}});var subscriberDetailsElementId=this.cfg.SUBSCRIBER_DETAILS_ELEMENT_ID;this.oSubscriberDetails=dojo.byId(subscriberDetailsElementId);dojo.removeClass(this.oSubscriberDetails,"hidden");},setUpMJLinksForReg:function(){var footerContainerClass=this.cfg.FOOTER_CONTAINER_CLASS;this.oFooter=dojo.query(footerContainerClass)[0];var mojLinkUrl=this.cfg.MOJ_LINK_URL;var mojLinkClass=this.cfg.MOJ_LINK_CLASS;this.oMojLinkHeader=dojo.query(mojLinkClass,this.oHeader)[0];this.oMojLinkFooter=dojo.query(mojLinkClass,this.oFooter)[0];if((typeof gcDomain!=="undefined")&&(gcDomain!==null)&&(gcDomain!=="")){this.oMojLinkHeader.href="http://"+gcDomain+mojLinkUrl;this.oMojLinkFooter.href="http://"+gcDomain+mojLinkUrl;}else{this.oMojLinkHeader.href=mojLinkUrl;this.oMojLinkFooter.href=mojLinkUrl;}},setupSubscriberLinks:function(){var todaysPaperLinkClass=this.cfg.TODAYS_PAPER_LINK_CLASS;this.oTodaysPaperLink=dojo.query(todaysPaperLinkClass,this.oHeader)[0];var loggedInTodaysPaperUrl=this.cfg.LOGGED_IN_TODAYS_PAPER_URL;var that=this;dj.util.User.isSubLoggedIn(function(subLoggedIn){if(subLoggedIn){if((typeof gcDomain!=="undefined")&&(gcDomain!==null)&&(gcDomain!=="")){that.oTodaysPaperLink.href="http://"+gcDomain+loggedInTodaysPaperUrl;}else{that.oTodaysPaperLink.href=loggedInTodaysPaperUrl;}}});},setupMessageCenter:function(){var messageCenterLinkClass=this.cfg.MESSAGE_CENTER_LINK_CLASS;this.oMessageCenterLink=dojo.query(messageCenterLinkClass,this.oHeader)[0];var messageCountClass=this.cfg.MESSAGE_COUNT_CLASS;this.oMessageCount=dojo.query(messageCountClass,this.oHeader)[0];var that=this;var setupMsgCenterLink=function(noOfMessages){if(noOfMessages==='-1'){dojo.style(that.oMessageCenterLink,{"display":"none"});}else{that.oMessageCount.innerHTML=noOfMessages;}};var noOfMessages=dj.util.Cookie.getCookie("msgCount");if(noOfMessages===null){var messageCenterPostUrl=this.cfg.MESSAGE_CENTER_POST_URL;var messageCountReq=dojo.xhrPost({url:messageCenterPostUrl,load:function(data,ioargs){var jsonObj=data;noOfMessages=jsonObj.MessagesCount;var userStatus=jsonObj.Status;dj.util.Cookie.setCookie("msgCount",noOfMessages,(5/24/60));dj.util.Cookie.setCookie("userStatus",userStatus,(5/24/60));setupMsgCenterLink(noOfMessages);},error:function(transport,exception){console.error("Exception occured while posting posting Ajax Request: %s",exception);}});}else{setupMsgCenterLink(noOfMessages);}},setupLogin:function(){var loginUserElementId=this.cfg.LOGIN_USERNAME_ELEMENT_ID;this.oUserName=dojo.byId(loginUserElementId);var loginPasswordElementId=this.cfg.LOGIN_PASSWORD_ELEMENT_ID;this.oPassword=dojo.byId(loginPasswordElementId);var loginButtonImageId=this.cfg.LOGIN_BUTTON_ELEMENT_ID;this.oLoginImg=dojo.byId(loginButtonImageId);var loginFormId=this.cfg.LOGIN_FORM_ID;this.oLoginForm=dojo.byId(loginFormId);this.oLoginForm.reset();var pageUrlId=this.cfg.PAGE_URL_ELEMENT_ID;this.oPageUrl=dojo.byId(pageUrlId);var that=this;if(this.oPageUrl!==null){var nonSubscriberHomepagePid=this.cfg.NONSUBSCRIBER_HOMEPAGE_PID;var nonSubscriberSearchPagePid=this.cfg.NONSUBSCRIBER_SEARCH_PAGE_PID;var nonSubNewslettersAlertsPagePid=this.cfg.NONSUBSCRIBER_NEWSLETTERS_ALERTS_PAGE_PID;var mdcPagePid=this.cfg.MDC_PAGE_PID;var concatURL;if((typeof gcDomain!=="undefined")&&(gcDomain!==null)&&(gcDomain!=="")){concatURL="http://"+gcDomain;}else{concatURL="http://"+document.domain;}
var oCurrentUrl;if(dojo.isIE){oCurrentUrl=window.location.href;}else{oCurrentUrl=document.location.href;}
var url_value=oCurrentUrl;if(typeof pID!=="undefined"){if(pID===nonSubscriberHomepagePid){url_value=concatURL+this.cfg.HOMEPAGE_SUBSCRIBER_URL;}else if(pID===nonSubNewslettersAlertsPagePid){url_value=concatURL+"/email";}else if(pID===nonSubscriberSearchPagePid){url_value=concatURL+this.cfg.SEARCH_PAGE_SUBSCRIBER_URL;}else if(pID===mdcPagePid){url_value=concatURL+this.cfg.MDC_LINK_URL;}else{url_value=oCurrentUrl;}
if(dojo.isIE){document.login_form.url.value=url_value;}else{this.oPageUrl.value=url_value;}}
if(this.oUserName!==null){dojo.connect(this.oUserName,"onfocus",this,function(event){dj.util.Form.clearValue(this.oUserName,"User Name");});dojo.connect(this.oUserName,"onclick",this,function(event){dj.util.Form.clearValue(this.oUserName,"User Name");});}
if(this.oPassword!==null){dojo.connect(this.oPassword,"onfocus",this,function(event){dj.util.Form.clearValue(that.oPassword,"Password");this.oPassword.type="password";});dojo.connect(this.oPassword,"onclick",this,function(event){dj.util.Form.clearValue(that.oPassword,"Password");});dojo.connect(this.oPassword,"onchange",this,function(event){dj.util.Form.clearValue(that.oPassword,"Password");});}
if(dojo.isIE){dojo.connect(this.oLoginImg,"onclick",this,function(e){document.login_form.url.value=oCurrentUrl;console.log("coming in to img onlick in IE"+oCurrentUrl);this.oLoginForm.submit();});}
dojo.connect(this.oPassword,"onkeypress",this,function(e){var cKeyCode=e.keyCode||e.which;if(dojo.isIE){if(cKeyCode==Event.KEY_RETURN){document.login_form.url.value=oCurrentUrl;this.oLoginForm.submit();}}});}},setupLogout:function(){var logoutLinkElementId=this.cfg.LOGOUT_LINK_ELEMENT_ID;this.oLogout=dojo.byId(logoutLinkElementId);if(this.oLogout!==null){dojo.connect(this.oLogout,"onclick",this,function(ev){dojo.stopEvent(ev);dj.util.Cookie.deleteCookie("msgCount");dj.util.Cookie.deleteCookie("HOMEPAGE",true);document.cookie="HOMEPAGE"+"="+";path=/"+";domain=.wsj.com"
+";expires=Thu, 01-Jan-1970 00:00:01 GMT";if((typeof gcDomain!=="undefined")&&(gcDomain!==null)&&(gcDomain!=="")){window.location="/logout?url=http://"+gcDomain;}else{window.location="/logout";}});}},highlightFormFactorLinks:function(){var todaysPaperLinkContainerClass=this.cfg.TODAYS_PAPER_LINK_CONTAINER_CLASS;this.oTodaysPaperLinkContainer=dojo.query(todaysPaperLinkContainerClass,this.oHeader)[0];var videoLinkContainerClass=this.cfg.VIDEO_LINK_CONTAINER_CLASS;this.oVideoLinkContainer=dojo.query(videoLinkContainerClass,this.oHeader)[0];var blogsLinkContainerClass=this.cfg.BLOGS_LINK_CONTAINER_CLASS;this.oBlogsLinkContainer=dojo.query(blogsLinkContainerClass,this.oHeader)[0];var columnsLinkContainerClass=this.cfg.COLUMNS_LINK_CONTAINER_CLASS;this.oColumnsLinkContainer=dojo.query(columnsLinkContainerClass,this.oHeader)[0];var interactiveGraphicsLinkContainerClass=this.cfg.INTERACTIVE_GRAPHICS_LINK_CONTAINER_CLASS;this.oInteractiveGraphicsLinkContainer=dojo.query(interactiveGraphicsLinkContainerClass,this.oHeader)[0];var topicsLinkContainerClass=this.cfg.TOPICS_LINK_CONTAINER_CLASS;this.oTopicsLinkContainer=dojo.query(topicsLinkContainerClass,this.oHeader)[0];var communityForumsLinkContainerClass=this.cfg.COMMUNITY_FORUMS_LINK_CONTAINER_CLASS;this.oCommunityForumsLinkContainer=dojo.query(communityForumsLinkContainerClass,this.oHeader)[0];var todaysPaperPid=this.cfg.TODAYS_PAPER_PID;var todaysPaperUsNonSubPid=this.cfg.TODAYS_PAPER_US_NONSUB_PID;var todaysPaperEuropeNonSubPid=this.cfg.TODAYS_PAPER_EUROPE_NONSUB_PID;var todaysPaperAsiaNonSubPid=this.cfg.TODAYS_PAPER_ASIA_NONSUB_PID;var todaysPaperUsPid=this.cfg.TODAYS_PAPER_US_PID;var todaysPaperEuropePid=this.cfg.TODAYS_PAPER_EUROPE_PID;var todaysPaperAsiaPid=this.cfg.TODAYS_PAPER_ASIA_PID;var todaysPaperPastEditionsPid=this.cfg.TODAYS_PAPER_PAST_EDITIONS_PID;var todaysPaperIndexBizPid=this.cfg.TODAYS_PAPER_INDEX_BIZ_PID;var todaysPaperIndexPeoplePid=this.cfg.TODAYS_PAPER_INDEX_PEOPLE_PID;var todaysPaperCorrectionsPid=this.cfg.TODAYS_PAPER_CORRECTIONS_PID;var videoPid=this.cfg.VIDEO_PID;var interactiveGraphicsPid=this.cfg.INTERACTIVE_GRAPHICS_PID;var topicsPid=this.cfg.TOPICS_PID;var newslettersAlertsPubPid=this.cfg.NEWSLETTERS_ALERTS_PUB_PID;var newslettersAlertsSubPid=this.cfg.NEWSLETTERS_ALERTS_SUB_PID;var columnsPid=this.cfg.COLUMNS_PID;var blogsPid=this.cfg.BLOGS_PID;var hostUrl=document.location.host;var communityUrl=hostUrl+this.cfg.COMMUNITY_HIGHLIGHT_COMPARE_URL;var compareForumsUrl=this.cfg.FORUMS_HIGHLIGHT_COMPARE_URL;if(typeof pID!=="undefined"){if((pID.indexOf(todaysPaperPid)==0)||(pID===todaysPaperUsNonSubPid)||(pID===todaysPaperEuropeNonSubPid)||(pID===todaysPaperAsiaNonSubPid)||(pID===todaysPaperUsPid)||(pID===todaysPaperEuropePid)||(pID===todaysPaperAsiaPid)||(pID===todaysPaperPastEditionsPid)||(pID===todaysPaperIndexBizPid)||(pID===todaysPaperIndexPeoplePid)||(pID===todaysPaperCorrectionsPid)){dojo.addClass(this.oTodaysPaperLinkContainer,"selected");}else if(pID===videoPid){dojo.addClass(this.oVideoLinkContainer,"selected");}else if(pID===interactiveGraphicsPid){dojo.addClass(this.oInteractiveGraphicsLinkContainer,"selected");}else if(pID===columnsPid){dojo.addClass(this.oColumnsLinkContainer,"selected");}else if(pID===blogsPid){dojo.addClass(this.oBlogsLinkContainer,"selected");}else if(pID===topicsPid){dojo.addClass(this.oTopicsLinkContainer,"selected");}}
if((document.location.href!==null)&&(document.location.href!=="")&&(document.location.href.indexOf(communityUrl)!==-1)||(document.location.href.indexOf(compareForumsUrl)!==-1)){dojo.addClass(this.oCommunityForumsLinkContainer,"selected");}}};}();
dojo.provide("dj.widget.newsreel.NewsReelLoader");dojo.require("dj.widget.fragmentloader.FragmentLoader");dojo.require("dj.util.user.EnvironmentDao");dojo.require("dj.util.Region");dojo.require("dj.util.User");dojo.declare("dj.widget.newsreel.NewsReelLoader",dj.widget.fragmentloader.FragmentLoader,{NEWSREEL_CONFIG:{newsreelContainer:"newsReel",adRegisterKey:"newsReelAd",TTL:"24h"},constructor:function(userEnv,mstPageId,version,domNodeId,config){this.cfg=dojo.delegate(this.DEFAULT_CONFIG,this.NEWSREEL_CONFIG);dojo.mixin(this.cfg,config);var dataset=dj.util.Element.getDataset(dojo.byId(domNodeId)||{});if(dataset){this.mstPageId=dataset.newsreelpage||this.mstPageId;}
this.cfg.isLoadCss=false;this.cfg.isLoadJs=false;this._initNewsReelRenderers();console.info("this.cfg.isLoadHtml="+this.cfg.isLoadHtml);},onHtmlLoad:function(){dj.module.newsReel.init(this.cfg.newsreelContainer,this.cfg.adRegisterKey);},_initRenderers:function(){},_initNewsReelRenderers:function(){var localContextCore=dojo.clone(dj.context.core);this.userEnv=this._getUserEnv();localContextCore.customCacheCdnPrefix=dj.context.core.cdnPrefix;var fragmentDao=new dj.widget.fragmentloader.dao.FileServiceDao(dj.util.io.script,localContextCore,{TTL:this.cfg.TTL});var checker=new dj.util.PollingConditionChecker();this.fragmentBo=new dj.widget.fragmentloader.bo.FragmentBo(fragmentDao,this.userEnv,this.cfg);this.fileRenderer=new dj.widget.fragmentloader.renderer.FileRenderer(dj.util.animation,checker);},_getUserEnv:function(){var env=this.userEnv;if(!env){var dao=new dj.util.user.EnvironmentDao(dj.util.Region,dj.util.User);env=dao.getEnvironment();}
return env;}});
dojo.provide("dj.module.CCS");dojo.require("dj.lang");dojo.require("dj.util.Cookie");dojo.require("dj.util.User");dj.module.CCS={init:function(cfg){this._cfg=dj.lang.cloneMixin(this.DEFAULT_CONFIG,cfg);this.product='WSJ';var prefixDtext=(typeof window.nSP!='undefined')?window.nSP:"";this.dtext=['<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>','<td class="p10" style="padding:4px 0px 5px 0px;border-right:1px solid #9BADCE;" align="center"><a href="'+prefixDtext+'/acct/setup_account" class="unvisited p10">My Account</a></td>','<td class="p10" style="padding:4px 0px 5px 0px;border-right:1px solid #9BADCE;" align="center"><a href="'+prefixDtext+'/msgcenter/view_messages.html?product='+this.product+'" class="unvisited p10">Messages</a></td>','<td class="p10" style="padding:4px 0px 5px 0px;" align="center"><a href="'+prefixDtext+'/setup/setup_center_mainpage" class="unvisited p10">Preferences</a></td>','</tr></table>'];var prefixAtext=(typeof window.nSP!='undefined')?window.nSP:"";this.atext=['<a href="'+prefixAtext+'/msgcenter/view_messages.html?product='+this.product+'">','<img src="/img/message_alert_icon.gif" border="0" width="25" height="16" style="padding:0px;margin:0px;vertical-align:middle;"/><span class="p11" style="vertical-align:middle;">You have an important message</span>','</a>'];var prefixNtext=(typeof window.nSP!='undefined')?window.nSP:"";this.ntext=['<a href="'+prefixNtext+'/msgcenter/view_messages.html?product='+this.product+'">','<img src="/img/message_icon_WSJ.gif" border="0" width="15" height="11" style="padding:0px;margin:0px;vertical-align:middle;"/><span class="p11" style="vertical-align:middle;">You have a new message</span>','</a>'];},DEFAULT_CONFIG:{product:null,messageCenterRequest:null,messageCenterTimeout:null,displayedInterstitialRequest:null,displayedInterstitialTimeout:null,readRequest:null,readTimeout:null,getContentRequest:null,getContentTimeout:null,changeOrderRequest:null,changeOrderTimeout:null,dtext:null,atext:null,ntext:null,VarX:null,y:null,z:null},changeStyle:function(httpRequest,msgid){var v=document.getElementById('m_'+msgid+'_f');v.style.fontWeight='';v=document.getElementById('m_'+msgid+'_s');v.style.fontWeight='';v=document.getElementById('m_'+msgid+'_r');v.style.fontWeight='';v=document.getElementById('m_'+msgid+'_e');v.style.fontWeight='';},displayMessages:function(httpRequest){var m=document.getElementById("messages");m.innerHTML=httpRequest.xhr.responseText;},closeMessage:function(){this.y.style.display='none';this.VarX.style.display='none';},checkAll:function(){var f=document.getElementById("mform");var num=f.elements.length;for(var i=0;i<num;i++){var e=f.elements[i];if(e.type=='checkbox'){e.checked=true;}}},uncheckAll:function(){var f=document.getElementById("mform");var num=f.elements.length;for(var i=0;i<num;i++){var e=f.elements[i];if(e.type=='checkbox'){e.checked=false;}}},displayDiv:function(content,mid,mname,isInterstitial){this.VarX=dojo.byId('modal');this.y=dojo.byId('message');this.z=dojo.byId('messagecontent');this.z.innerHTML=content;this.y.style.zIndex=1000000001;this.y.style.display='block';this.y.style.overflow='hidden';this.VarX.style.zIndex=1000000000;this.VarX.style.display='block';this.VarX.style.height=document.body.scrollHeight+'px';var s;if(typeof s==='undefined'){s=(typeof window.s!='undefined')?window.s:"";}
if(s!==""){s.events="event30";if(isInterstitial){s.eVar30='WSJ Interstitial - '+mname;}else{s.eVar30='WSJ Message - '+mname;}
s.linkTrackVars="eVar30,events";s.linkTrackEvents="event30";if(isInterstitial){s.tl(true,'o','WSJ Interstitial - '+mname);}else{s.tl(true,'o','WSJ Message - '+mname);}}},showInterstitialContent:function(content,mid,uid,umid,mname){var tmp='';try{tmp=(new XMLSerializer()).serializeToString(content);}catch(e){tmp=content.xml;}
tmp=tmp.replace(/&amp;/g,'&');tmp=tmp.replace(/<user\/>/g,userName);tmp=tmp.replace(/gotosite/g,'WSJ.com');tmp=tmp.replace(/myacctsite/g,'https://commerce.wsj.com/myaccount/do/viewBillingInfo');tmp=tmp.replace(/modvalue/g,'mc_wsj_interstitial_'+mname);tmp=tmp.replace(/<site_name\/>/g,'WSJ.com');tmp=tmp.replace(/site/g,'wsj');tmp=tmp.replace(/msgbg/g,'#364A92');var d=new Date();tmp=tmp.replace(/<year\/>/g,d.getFullYear());tmp=tmp.substring(9,tmp.indexOf("</content>"));this.displayDiv(tmp,mid,mname,true);this.sendDisplayedInterstitialRequest(uid,umid);},processTop:function(httpRequest){try{var strDtext=this.dtext.join("");var strAtext=this.atext.join("");var strNtext=this.ntext.join("");var message=httpRequest.xhr.responseXML.getElementsByTagName("message")[0];if(message!==null){if(message.firstChild!==null){var mid=(message.getElementsByTagName("mid")[0]).firstChild.nodeValue;var uid=(message.getElementsByTagName("uid")[0]).firstChild.nodeValue;var umid=(message.getElementsByTagName("umid")[0]).firstChild.nodeValue;var mname=(message.getElementsByTagName("messageid")[0]).firstChild.nodeValue;var priority=message.getElementsByTagName("priority")[0];var display=message.getElementsByTagName("display")[0];if(display!==null){var dvalue=display.firstChild.nodeValue;if(dvalue=='true'){var content=message.getElementsByTagName("content")[0];this.showInterstitialContent(content,mid,uid,umid,mname);}else{if(priority!==null){var value=priority.firstChild.nodeValue;if(value==1){dojo.byId('msgCenter').innerHTML=strAtext;dj.util.Cookie.setCookie('CMCAlert',strAtext,1);}else{dojo.byId('msgCenter').innerHTML=strNtext;dj.util.Cookie.setCookie('CMCAlert',strNtext,1);}}}}else{dojo.byId('msgCenter').innerHTML=strDtext;}}else{dojo.byId('msgCenter').innerHTML=strDtext;}}else{dojo.byId('msgCenter').innerHTML=strDtext;}
return true;}catch(e){console.error("Exception while processing response",e);return false;}},reloadMessageCenter:function(){this.init();var cmcalertcookie=dj.util.Cookie.getCookie("CMCAlert");if(cmcalertcookie!==null){dojo.byId('msgCenter').innerHTML=cmcalertcookie;}
var cmccookie=dj.util.Cookie.getCookie("CMC");if(cmccookie===null){if(this.messageCenterRequest!==null){this.messageCenterRequest=null;}
dj.util.Cookie.setCookie('CMC','top',1);var processX;var d=new Date();var dataUrl='/msgcenter/top_message.html';var dataUrlParams={product:this.product,d:d.getTime()};var that=this;dojo.xhrGet({url:dataUrl,content:dataUrlParams,load:function(data,ioargs){processX=that.processTop(ioargs);},error:function(exception,ioargs){console.error('Exception occured during Ajax Request to retrieve data: %o',exception);}});}},sendDisplayedInterstitialRequest:function(uid,umid){if(this.displayedInterstitialRequest!==null){this.displayedInterstitialRequest=null;}
var params={uId:uid,umId:umid,product:this.product};var postUrl='/msgcenter/displayed_interstitial.html';var that=this;dojo.xhrPost({url:postUrl,postData:dojo.objectToQuery(params),error:function(exception,ioargs){console.error('Exception occured while posting posting Ajax Request : '+exception);},handle:function(data,ioargs){that.reloadMessageCenter();}});},sendReadRequest:function(msgid,umid){if(this.readRequest!==null){this.readRequest=null;}
var params={umId:umid,product:this.product};var postUrl='/msgcenter/read_message.html';var that=this;dojo.xhrPost({url:postUrl,postData:dojo.objectToQuery(params),error:function(exception,ioargs){console.error('Exception occured while posting posting Ajax Request : '+exception);},handle:function(data,ioargs){that.changeStyle(ioargs,msgid);that.reloadMessageCenter();}});},showMessage:function(httpRequest,msgid,umid,mname){var message=httpRequest.xhr.responseText.replace(/&amp;/g,'&');var ccsuser1=document.getElementById('CCS_USER');if(ccsuser1){dj.util.User.renderCallsign(ccsuser1);}
message=message.replace(/gotosite/g,'WSJ.com');message=message.replace(/myacctsite/g,'https://commerce.wsj.com/myaccount/do/viewBillingInfo');message=message.replace(/modvalue/g,'mc_wsj_message_'+mname);var d=new Date();message=message.replace(/<year\/>/g,d.getFullYear());message=message.replace(/<site_name\/>/g,'WSJ.com');message=message.replace(/site/g,'wsj');message=message.replace(/msgbg/g,'#364A92');dj.util.Cookie.setCookie('CMCAlert','',-1);this.displayDiv(message,msgid,mname,false);this.sendReadRequest(msgid,umid);},loadMessageContent:function(msgid,uid,umid,read,mname){if(this.getContentRequest!==null){this.getContentRequest=null;}
var dataUrl='/msgcenter/get_message.html?messageId='+msgid+'&product='+this.product;var that=this;dojo.xhrGet({url:dataUrl,load:function(data,ioargs){that.showMessage(ioargs,msgid,umid,mname);},error:function(exception,ioargs){console.error('Exception occured during Ajax Request to retrieve data: %o',exception);}});},sendChangeOrderRequest:function(order,product){if(this.changeOrderRequest!==null){this.changeOrderRequest=null;}
var dataUrl='/msgcenter/order_messages.html?order='+order+'&product='+product;var that=this;dojo.xhrGet({url:dataUrl,load:function(data,ioargs){that.displayMessages(ioargs);},error:function(exception,ioargs){console.error('Exception occured during Ajax Request to retrieve data: %o',exception);}});},updateusermessagestatuscode:function(){if(this.readRequest!==null){this.readRequest=null;}
var params={product:this.product};var postUrl='/umsl/user_messages/do_not_show';var that=this;dojo.xhrPost({url:postUrl,postData:dojo.objectToQuery(params),error:function(exception,ioargs){console.error('Exception occured while posting posting Ajax Request : '+exception);},handle:function(data,ioargs){that.reloadMessageCenter();}});}};dojo.provide("dj.module.globalNav");

dj.module.globalNav = {
  setupQuicklinks : function(globalSubNavId, quicklinksContainerId){
    this.oHideQuickLinks = dojo.query('.hideQuickLinks');
    this.oGlobalSubNav = dojo.byId(globalSubNavId);
    this.oQuicklinksContainer = dojo.byId(quicklinksContainerId);
    
    if(typeof this.oHideQuickLinks === 'undefined'){
      if(this.oGlobalSubNav === null){
        if(this.oQuicklinksContainer != null){
          dojo.removeClass(this.oQuicklinksContainer,"subnav_hide");
          dojo.addClass(this.oQuicklinksContainer,"subnav_show");
        }
      }
    }
  }
};
/* global document, dj, dojo, console, Ajax */
dojo.provide("dj.module.header.localWeather");
dojo.require("dj.util.Cookie");
dojo.require("dj.util.User");

/* Local Weather:
 *   This module sets the user's local weather in the WSJ header.  Currently
 *   there are strict xhtml dependencies to the wsj header structure.  This
 *   code will update several cookies and the pzn service to store the
 *   weather data.  The weather data will be populated next to the timestamp.
 *
 * TODO: Move the utility functions at the bottom into the utilities bundle.
 *
 * Testing Commands: (use this to clear the cookie cache)
 *   dj.util.Cookie.deleteGroupCookie("DJCOOKIE", "weatherUser");
 *   dj.util.Cookie.deleteGroupCookie("DJCOOKIE", "weatherCode");
 *   dj.util.Cookie.deleteGroupCookie("DJCOOKIE", "weatherExpire");
 *   dj.util.Cookie.deleteGroupCookie("DJCOOKIE", "weatherJson");
 *
 *   Config with defaultLocation overridden:
 *   dj.module.header.localWeather.init({defaultLocation:"08054"});
 */

(function() {

  dj.module.header.localWeather = {
    init : function(cfg) {

      var defaultConfig = {
        defaultLocation   : "10005",
        expireInterval    : "1200", // in seconds
        htmlService       : "/public/page/0_0_WC_HeaderWeather",
        populateEl        : "weatherContent",
        iframeId          : "iframeweatherDetails",
        iframeParam       : "location",
        locationNameId    : "locationName",
        pznUrl            : "/pznusersvc/update/user/profile",
        setPznWeatherUrl  : "/pznusersvc/view/user/profile?profileType=weatherCode",
        redirectUrl       : "http://commerce.wsj.com/auth/login",
        locationSavedTxt  : "Default location saved"
      };

      dojo.mixin(defaultConfig, cfg);
      this.config = defaultConfig;
      this.cookieWeatherCode = this.getCookie("weatherCode");
      this.cookieWeatherJson = this.getCookie("weatherJson");

      // limiting the header weather to US region
      if (dj.util.Region.getViewByRegion() == "na,us") {
        this._load();
      }
    },

    /**
     * Loads the weather data in the WSJ header.  Weather data can be pulled
     * from cookie data or the PZN service, assuming the user is logged in.
     * Load essentially retrieves the weather data and sets appropriate cookie
     * data to optimize future requests.
     *
     * TODO: Update code to disallow non reg/freereg users
     *
     */
    _load : function() {
      var that = this;

      dj.util.User.isLoggedIn(function(isLoggedIn) {
        if (isLoggedIn) {
          dj.util.User.getUserId(function(userId) {
            if (that.getCookie("weatherUser") == userId) {
              try {
                that.populateHeaderJson(dojo.fromJson(that.cookieWeatherJson));
              }
              catch(err) { // just show default weather if the cookies are screwed up
                var wc = that.getCookie("weatherCode");
                if (wc) {
                  that.getHTML(wc);
                }
                else {
                  that.getHTML(that.config.defaultLocation);
                }
              }
            }
            else {
              that.clearWeatherCookies();
              that.getPznLocalWeather();
            }
          });
        }
        else {
          if (that.isExpired("weatherExpire")) {
            that.getHTML(that.config.defaultLocation);
          }
          else {
            if (that.getCookie("weatherCode") == that.config.defaultLocation) {
              if (that.cookieWeatherJson) {
                that.populateHeaderJson(dojo.fromJson(that.cookieWeatherJson));
              }
              else {
                that.getHTML(that.config.defaultLocation);
              }
            }
            else {
              that.getHTML(that.config.defaultLocation);
            }
          }
        }
      });
    },

    /**
     * Retrieves weather XHTML for ajax requests
     *
     * @param {String}
     *          location, location code (zip code).  Service requires a
     *          location to pull weather data from.
     */
    getHTML : function(location) {
      var that = this;

      dojo.xhrGet( {
         url : that.config.htmlService+'-'+location+".html",
         headers : {
           Accept : 'application/html'
         },
         handleAs : "text",
         load : function(response, ioArgs) {
           var requestStatus = ioArgs.xhr.getResponseHeader('Status');

           // don't do any dom manipulation if the xhtml service fails
           if (response.match(/<ul class="local-info">/)) {
             that.populateHeaderHtml(response);

             dj.util.User.getUserId(function(userId) {
               that.setCookie("weatherUser", userId);
             });

             that.setCookie("weatherJson", dojo.toJson(that.parseHTML(response)));
             that.setCookie("weatherExpire", that.calcDate(that.config.expireInterval+"s+"));
             that.setCookie("weatherCode", location);
           }
           else {
             console.error("Could not pull weather from xhtml service.");
           }
         },
         error: function(response, ioArgs) {
           console.error("HTTP status code: ", ioArgs.xhr.status);
           return response;
         }
      });
    },

    /**
     * Updates DOM with xhtml content
     *
     * @param {String}
     *          content, xhtml content pulled from an xhtml service
     */
    populateHeaderHtml : function(content) {
      dojo.byId(this.config.populateEl).innerHTML = content;
    },

    /**
     * Populates Header with weather data pulled from weatherJson cookie
     *
     * @param {Object}
     *          weatherJson, Object with weather data pulled from weatherJson
     *          cookie.
     */
    populateHeaderJson : function(weatherJson) {
      var icon = dojo.byId('w_icon');
      var location = dojo.byId('w_location');

      dojo.addClass(icon, "wsj-"+weatherJson.image);
      dojo.byId('w_high').innerHTML = weatherJson.high + "&#186;";
      dojo.byId('w_low').innerHTML = weatherJson.low + "&#186";

      icon.href = weatherJson.url;
      location.href = weatherJson.url;
      location.innerHTML = weatherJson.city;

      dojo.removeClass(dojo.query(".temperature.divider")[0], "hidden");
    },

    /**
     * Populates Header with weather data pulled from the pzn service
     */
    populateFromPznSvc : function() {
      var pznHTML = this.getHTML(pznWeather);
      this.setCookie("weatherCode", pznWeather);
      this.populateHeaderHtml(pznHTML);
      this.setLocalWeatherJson(pznHTML);
    },

    /**
     * Wrapper to get DJ cookie data
     *
     * @param {String}
     *          name, name of sub-cookie value to be retrieved
     */
    getCookie : function(name) {
      return dj.util.Cookie.getGroupCookie("DJCOOKIE", name);
    },

    /**
     * Wrapper to set DJ cookie data
     *
     * @param {String}
     *          name, name of sub-cookie value to be set
     * @param {String}
     *          value, value of sub-cookie to be set
     */
    setCookie : function(name, value) {
      dj.util.Cookie.setGroupCookie("DJCOOKIE", name, value, 365);
    },

    /**
     * Writes weather data to weatherJson cookie from the parsed htmlFragment.
     *
     * @param {String}
     *          htmlFragment, fragment of header code to parse into weatherJson cookie
     */
    setLocalWeatherJson : function(htmlFragment) {
      dj.util.Cookie.setGroupCookie("DJCOOKIE", "weatherJson", dojo.fromJson(this.parseHTML(htmlFragment)), 365);
    },

    /**
     * This method is specifically for setting the User's local weather on the Accuweather
     * detail page (0_0_WP_AccuWeather_Details).  On that page exists an iFrame to accuweather
     * that has the location code stored in the iFrame src attribute, named "location".  We
     * then update the pzn service with the code (if the user is logged in), delete existing
     * weather cookies and re-run the weather initialization.
     *
     * @param {String}
     *          locationEl, ID of the iframe you are targeting
     */
    setDefaultLocation : function(locationId) {
      var that = this;
      var locationEl = dojo.byId(locationId);
      var iFrameParam =  that.getIframeParam(this.config.iframeId, this.config.iframeParam);
      var locationCode = iFrameParam !== "" ? iFrameParam : this.config.defaultLocation;

      dojo.byId(this.config.locationNameId).innerHTML = unescape(this.getIframeParam(that.config.iframeId, "name"));

      dj.util.User.isLoggedIn(function(isLoggedIn) {
        if (isLoggedIn) {
          if (locationCode != that.getCookie("weatherCode")) {
            dojo.connect(locationEl, "click", function(ev) {
              dojo.stopEvent(ev);
              that.clearWeatherCookies();
              that.setPznLocalWeather(locationCode);
              that.getHTML(locationCode);
              dojo.addClass(locationEl, "hidden");
              dojo.place("<span style='font-size:1.1em'>"+that.config.locationSavedTxt+"</span>", locationEl, "before");
            });
          }
          else {
            dojo.addClass(locationEl, "hidden");
          }
        }
        else {
          dojo.connect(locationEl, "click", function(ev) {
            dojo.stopEvent(ev);
            window.location = that.getCommerceRedirectUrl();
          });
        }
      });
    },

    /**
     * Parses HTML into json object.  The regular expressions are very sensitive to xhtml
     * changes.  Whenever and xhtml change happens, this function should be tested.  In the
     * event of a failure, the error will be caught and should not produce a catastrophic
     * breakage.
     *
     * @param {String}
     *          htmlFragment, fragment of header code to be parsed by regex's
     */
    parseHTML : function(frag) {
      try {
        var city      = frag.match(/([^>]*)<\/a>/)[1];
        var imageCode = frag.match(/class="wsj-(\d*)/)[1];
        var high      = frag.match(/(\d+)&#186;/g)[0].match(/\d*/);
        var low       = frag.match(/(\d+)&#186;/g)[1].match(/\d*/);
        var url       = frag.match(/href\="([^"]*)/)[1];

        return {city: city, image: imageCode, high: high, low: low, url: url};
      }
      catch(err) {
        console.error("Unable to parse xhtml service: %s",err);
        return false;
      }
    },

    /**
     * Asynchronous request to pull in weather data from pzn service.  User must be
     * logged in and have populated their pzn settings with their local weather.  PZN
     * service knows if the user is logged in, so there is no need to pass that status.
     */
    getPznLocalWeather : function() {
      var that = this;
      dojo.xhrGet( {
       url : that.config.setPznWeatherUrl,
       headers : {
         Accept : 'application/json'
       },
       handleAs : "json",
       load : function(response, ioArgs) {
         var requestStatus = ioArgs.xhr.getResponseHeader('Status');

         if ( 200 !== ioArgs.xhr.status ) {
           console.error("Error message: Service is not working with Error Code: " + ioArgs.xhr.status);
           return;
         }
         var profileData = response.User.profileData[0];

         if (profileData !== undefined) {
           that.getHTML(profileData.weatherCode);
         }
         else {
           that.getHTML(that.config.defaultLocation);
         }
       },
       error: function(response, ioArgs) {
         console.error("HTTP status code: ", ioArgs.xhr.status);
         return response;
       }
      });
    },

    /**
     * Sets a Reg/FreeReg user's local weather code (most often a zip code)
     *
     * @param {String}
     *          code, local weather code (zip code)
     */
    setPznLocalWeather : function(code) {
      var data = {"profileType":"weatherCode","profileName":"weatherCode","params":[{"weatherCode": code}]};

      var xhrArgs = {
        url: this.config.pznUrl,
        postData: dojo.toJson(data),
        handleAs: "json",
        contentType: "application/json",
        accept: "application/json",
        load: function(data){},
        error: function(error){}
      };
      var deferred = dojo.xhrPost(xhrArgs);
    },

    /**
     * Delete DJCOOKIE group cookie related to custom weather settings
     */
    clearWeatherCookies : function() {
      dj.util.Cookie.deleteGroupCookie("DJCOOKIE", "weatherUser");
      dj.util.Cookie.deleteGroupCookie("DJCOOKIE", "weatherCode");
      dj.util.Cookie.deleteGroupCookie("DJCOOKIE", "weatherExpire");
      dj.util.Cookie.deleteGroupCookie("DJCOOKIE", "weatherJson");
    },

    // TODO: Move utilities below to utilities bundle **********

    /**
     * Returns a url to commerce login with the current page as the redirect (after success)
     *
     * TODO: detect whether a "?" or "&" should be passed
     * @param {String}
     *          urll, param to point to commerce login page, not required
     */
    getCommerceRedirectUrl : function(urll) {
      var url = urll || this.config.redirectUrl;
      return url+"&url="+escape(window.location);
    },

    /*
     * @param D: ##(m|d|s)(+|-)
     * @examples: "9d+", 9 days in future, "90s+", 90 seconds in future, "30m-" 30 months in past
     */
    calcDate :function(D){
      // args TimeValue & (Months|Days|Seconds) & (+|-)
      var MS = this.calcMilliseconds(D), dO = new Date();
      dO.setTime((D.substring(D.length-1,D.length)=="+")?dO.getTime()+MS:dO.getTime()-MS);
      return dO.toGMTString();
    },

    calcMilliseconds : function(D) {
      // args TimeValue & (Months|Days|Seconds) & (+|-)
      var TD=D.substring(0,D.length-2),TC=D.substring(D.length-2,D.length-1).toLowerCase(),MS=0;
      MS=(TC=="m")?TD*((24*60*60*1000)*30):MS;
      MS=(TC=="d")?TD*(24*60*60*1000):MS;
      MS=(TC=="s")?TD*1000:MS;
      return MS;
    },

    isExpired : function(cookieName) {
      var expireTime = new Date(this.getCookie(cookieName));
      var status = expireTime - (new Date());

      if (status > 0) { // cookie has not expired
        return false;
      }
      else { // cookie has expired
        return true;
      }
    },

    getIframeParam : function(iframeId, name) {
      var iframeSrc = dojo.byId(iframeId).src;
      var location = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
      var regexS = "[\\?&]" + location + "=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec(iframeSrc);

      if( results === null ) {
        return "";
      }
      else {
        return results[1];
      }
    }
  };
 }());
dojo.provide("dj.module.header.sectionMenu");
dojo.require("dj.widget.panel.LiveModalPanel");
dojo.require("dj.util.Element");
dojo.require("dj.lang");
dojo.require("dj.widget.panel.SelectDropdownPanel");

(function() {
  dj.module.header.sectionMenu = {
    init: function() {      
      // functions automatically called
	    var isInitDone = false;
      this.delayedMouseOver("._exp", function(el) {
        if (!isInitDone) {
          this.initializeHeaderPanels();
          this.setEvents();
          isInitDone = true;
        }
        this.initShowData(el);
      }, 250);

      this.fadeInArrows();
    },

    /**
     * Initialize Panels object for menu dropdown
     * 
     */  
    initializeHeaderPanels: function() {
      var headerMenu = new dj.widget.panel.LiveModalPanel(
      {
        container : ".linklist_dropdown .wsjmn_dropdown_container",
        containerInd : ".linklist_dropdown .wsjmn_dropdown_container .mnExpand",
        dropdownContent : ".wsjmn_dropdownContent",
        actionEvent : "click",
        stateContainer : ".wsjmn_dropdownTree",
        stateCollapsed : "wsjmn_ddState-collapsed",
        stateExpanded : "wsjmn_ddState-expanded",
        navContainer : ".pmMainNav",
        stateHover : "mndd_ddState-hover",
        queryUpClass : "wsjmn_dropdownTree",
        addMouseEvents : false
      });
    },

    initShowData: function(el) {
      var svcUrl = this.getDropdownIndex(el);
      var ddi = dj.util.Element.getDataset(el).dropdownindex;
      var ddiEl = dojo.byId(ddi+"_content");
      
      this.showData(svcUrl, ddiEl, el);
    },

    showData: function(svcUrl, ddiEl, dataEl) {
      var that = this;
      var initDelay = false;

      initDelay = setTimeout(function() {
        // data class ensures that multiple requests aren't initiated by the click and mouseover events 
        if ((dojo.hasClassName(dataEl, "_data") === false)) {
          dojo.addClass(dataEl, '_data');
          that.getHTML(svcUrl, ddiEl, dataEl);  // replaces spinner html with menu content
        }
      });
    },
    
    getDropdownIndex: function(el) {
      var sEl = dj.util.Element.getDataset(el);
      var svcEl = dj.util.Element.getDataset(dojo.byId(sEl.dropdownindex));
      return svcEl.panelServiceUri;
    },

    setIframeShimHeights: function(el) {
      var elData = dj.util.Element.getDataset(el).dropdownindex;
      var elNum = elData.match(/(\d.*)/)[0];
      var iFrameId = "wsjmn_dropdown_iframe"+elNum;
      var dropdownId = "wsjmn_dropdown"+elNum+"_content";
      var content = dojo.byId(dropdownId);
	    var iFrameEl = dojo.byId(iFrameId);
	  
	    for (var i=0;i<=content.length - 1;i++) {
	      try {
	        iFrameEl.offsetHeight = dojo.byId("wsjmn_dropdown_content"+elNum).offsetHeight;
	      }
	      catch(err) {}       
	    }

	    try {
	      iFrameEl.offsetHeight = dojo.byId("wsjmn_dropdown_content"+elNum).offsetHeight;
	    }
	    catch(e) {}
    },	
    
    setEvents: function() {
      var that = this;

      dj.lang.addLiveEvent("._exp", "mousedown", function(ev) {
        var el = (ev.target || ev.srcElement);
        that.initShowData(el);
      });
      
      dj.lang.addLiveEvent(".subExpand", "mousedown", function(ev) {
        var el = (ev.target || ev.srcElement);
        that.subFlyoutToggle("1-3");
      });
    },
    
    delayedMouseOver: function(containerClass, func, time) {
      var doInit = false, initDelay;
      var that = this;

      // debugger;
      var outEvent = dj.lang.addLiveEvent(containerClass, "mouseout", function() { doInit = false; });
      var overEvent = dj.lang.addLiveEvent(containerClass, "mouseover", function(ev) {
      if (initDelay) { clearTimeout(initDelay); }
        doInit = true;
        var el = this;
        initDelay = setTimeout(function() {
          if (!doInit) { 
            return; 
          }
          //dj.lang.removeLiveEvent(overEvent);
          //dj.lang.removeLiveEvent(outEvent);
          func.call(that, el);
        }, time);
      });
    },

    getHTML: function(location, el, dataEl) {
      var that = this;
      
      dojo.xhrGet( {
         url: location,
         headers: {
           Accept: 'application/html'
         },
         handleAs: "text",
         load: function(response, ioArgs) {
           var requestStatus = ioArgs.xhr.getResponseHeader('Status');
           el.innerHTML = response;
           // try{that.setIframeShimHeights(dataEl);}catch(err){} // IE Specific
           // when the comment below is matched in the request a special panel is initialized 
           if (response.match(/<!--BusinessDropdown-->/)) {
             var panel = new dj.widget.panel.SelectDropdownPanel('subIndDropdown');
           }
         },
         error: function(response, ioArgs) {
           console.error("HTTP status code: ", ioArgs.xhr.status);
           return response;
         }
      });
    },

    subFlyoutToggle: function(n) {
      // Get the dropdown
      var el = dojo.byId("wsjsub_flyout" + n);
      
      if (el === null) {
        return false;
      }
       
      var currentClass = el.className;
      // Toggle between the classes mn_ddState-collapsed and mn_ddState-expanded
      if(currentClass.indexOf("wsjsub_ddState-collapsed") != -1) {
        el.className = currentClass.replace( /wsjsub_ddState-collapsed/, "wsjsub_ddState-expanded");
      } 
      else {
        el.className = currentClass.replace(/wsjsub_ddState-expanded/, "wsjsub_ddState-collapsed");
      }
      return false;	
    },

    fadeInArrows: function() {
      var arrowNodes = dojo.query(".mnExpand._exp");

      for (var i=0;i<=arrowNodes.length - 1;i++) {
        dojo.fadeIn({
          node: arrowNodes[i],
          duration: (1.0 * 1000)
        }).play();
      }
    }
  };
}());
dojo.provide("dj.module.globalHeader");

dojo.deprecated("dj.module.globalHeader", "use dj.module.header.globalHeader instead", "1.4.1");

dojo.require("dj.lang");
dojo.require("dj.util.Config");
dojo.require("dj.util.Cookie");
dojo.require("dj.util.Date");
dojo.require("dj.util.Region");
dojo.require("dj.util.Element");
dojo.require("dj.util.User");

/**
 * Javascript functions to initialize and setup for Global Header
 *
 * Lookups are done only to find the first element matching the class in the header container. This can be updated to
 * lookup multiple elements and apply the required functionality if required.
 */
dj.module.globalHeader = function() {

  var DEFAULT_CONFIG = {
     HEADER_CONTAINER_CLASS: ".header",
     TIMESTAMP_CLASS: ".date",
     WSJ_LOGO_ID: "wsjLogo",
     WSJ_LARGE_LOGO_CLASSNAME: "logo_large",
     WSJ_SMALL_LOGO_CLASSNAME: "logo_small",
     CURRENT_SUBSECTION_DISPLAY_CLASS: ".currentSubSection",
     GLOBALNAV_SUBSECTION_ELEMENT_ID: "currentGlobalNavSubSection",
     SUBSCRIBER_LOGIN_CLASS: ".login",
     HEADER_PROMO_CLASS: ".promo",
     SUBSCRIBER_DETAILS_ELEMENT_ID: "subscribedUserDetailsId",
     COMMUNITY_FORUMS_LINK_CLASS: ".communityForumsLink",
     TODAYS_PAPER_LINK_CLASS: ".todaysPaperLink",
     MOJ_LINK_CLASS: ".myOnlineJournalLink",
     MESSAGE_CENTER_LINK_CLASS: ".messageCenterLink",
     MESSAGE_COUNT_CLASS: ".messageCount",
     LOGIN_USERNAME_ELEMENT_ID: "login_username",
     LOGIN_PASSWORD_ELEMENT_ID: "login_password",
     LOGIN_FORM_ID: "login_form",
     PAGE_URL_ELEMENT_ID: "page_url",
     LOGOUT_LINK_ELEMENT_ID: "logoutLink",
     LOGIN_BUTTON_ELEMENT_ID: "login_button",
     USER_NAME_ELEMENT_ID: "userName",
     WSJ_LOGO_FADE_APPEAR_DURATION: "1.0",
     WSJ_LOGO_DELAY_DURATION: "2000",
     LOGGED_IN_COMMUNITY_URL: "/community",
     //LOGGED_IN_TODAYS_PAPER_URL: "/page/us_in_todays_paper.html?mod=WSJ_formfactor",
     LOGGED_IN_TODAYS_PAPER_URL: "/itp?mod=WSJ_formfactor",
     LOGGED_IN_TODAYS_PAPER_URL_ASIA: "/itp/asia?mod=WSJ_formfactor",
     LOGGED_IN_TODAYS_PAPER_URL_EUROPE: "/itp/europe?mod=WSJ_formfactor",
     MESSAGE_CENTER_POST_URL: "/community/integration/userinfo.html",
      // MESSAGE_CENTER_POST_URL : "/community/integration/messagescount.html",
     LOGOUT_URL: "/static_html_files/logout_confirmation.htm",
     SUBSCRIBER_HOMEPAGE_PID: "0_0_WH_0001",
     NONSUBSCRIBER_HOMEPAGE_PID: "0_0_WH_0001_public",
     ASIA_PAGE_PID: "0_0_WP_2103",
     EUROPE_PAGE_PID: "0_0_WP_2104",
     NONSUBSCRIBER_NEWSLETTERS_ALERTS_PAGE_PID: "5_6007",
     NONSUBSCRIBER_SEARCH_PAGE_PID: "3_0466",
     HOMEPAGE_SUBSCRIBER_URL: "/",
     SEARCH_PAGE_SUBSCRIBER_URL: "/search",
     TODAYS_PAPER_LINK_CONTAINER_CLASS: ".todaysPaperLinkContainer",
     VIDEO_LINK_CONTAINER_CLASS: ".videoLinkContainer",
     COLUMNS_LINK_CONTAINER_CLASS: ".columnsLinkContainer",
     BLOGS_LINK_CONTAINER_CLASS: ".blogsLinkContainer",
     INTERACTIVE_GRAPHICS_LINK_CONTAINER_CLASS: ".interactiveGraphicsLinkContainer",
     TOPICS_LINK_CONTAINER_CLASS: ".topicsLinkContainer",
     COMMUNITY_FORUMS_LINK_CONTAINER_CLASS: ".communityForumsLinkContainer",
     TODAYS_PAPER_PID: "0_0_WP_40",
     TODAYS_PAPER_US_NONSUB_PID: "2_0433",
     TODAYS_PAPER_EUROPE_NONSUB_PID: "2_0434",
     TODAYS_PAPER_ASIA_NONSUB_PID: "2_0435",
     TODAYS_PAPER_US_PID: "2_0133",
     TODAYS_PAPER_EUROPE_PID: "2_0134",
     TODAYS_PAPER_ASIA_PID: "2_0135",
     TODAYS_PAPER_PAST_EDITIONS_PID: "2_0233",
     TODAYS_PAPER_INDEX_BIZ_PID: "2_0156",
     TODAYS_PAPER_INDEX_PEOPLE_PID: "2_0155",
     TODAYS_PAPER_CORRECTIONS_PID: "Corrections",
     VIDEO_PID: "0_0_WP_3000",
     BLOGS_PID: "8_0019",
     COLUMNS_PID: "2_0140",
     INTERACTIVE_GRAPHICS_PID: "0_0_WP_2003",
     TOPICS_PID: "0_0_WT_0001",
     NEWSLETTERS_ALERTS_SUB_PID: "5_6001",
     NEWSLETTERS_ALERTS_PUB_PID: "5_6003",
     MOJ_LINK_URL: "/page/my-journal-main.html",
     MDC_LINK_URL: "/mdc/page/marketsdata.html",
     MDC_PAGE_PID: "2_3000",
     COMMUNITY_HIGHLIGHT_COMPARE_URL: "/community",
     FORUMS_HIGHLIGHT_COMPARE_URL: "forums.wsj.com",
     FREE_REG_CLASS: ".freereg",
     LOCATION_NAV_CLASS: ".location_nav",
     LOCATION_NAV_COLLAPSED_CLASSNAME: "location_collapsed",
     LOCATION_NAV_EXPANDED_CLASSNAME: "location_expanded",
     US_EDITION_LINK_CLASS: ".map_us",
     EU_EDITION_LINK_CLASS: ".map_europe",
     ASIA_EDITION_LINK_CLASS: ".map_asia",
     IN_EDITION_LINK_CLASS: ".map_india",
     US_EDITION_MDC_URL: "/marketsdata",
     EU_EDITION_MDC_URL: "/mdc/public/page/marketsdata_europe.html",
     ASIA_EDITION_MDC_URL: "/mdc/public/page/marketsdata_asia.html",
     IN_EDITION_MDC_URL: "/mdc/public/page/marketsdata_asia.html",
     MDC_COMPARE_URL: "/mdc/",
     FOOTER_CONTAINER_CLASS: ".pagefooter",
     //PRO_HOOK
     GO_PRO_HOOK: "goprohook",
     GO_PRO_HOOK_REGION: ["na,us"]
  };


  return {
    /**
     * Initialize the Global Header Logo bar (G2)
     *
     * @param {Object}
     *            config
     */
    initialize: function(config) {

      this.cfg = dj.lang.cloneMixin(DEFAULT_CONFIG, config);

      var headerContainerClass = this.cfg.HEADER_CONTAINER_CLASS;
      this.oHeader = dojo.query(headerContainerClass)[0];

      //Edition dropdown setUp
      this.editionDropdownSetUp();

      //Display subsection
      this.displaySubSection();

      //Display timestamp
      this.displayTimeStamp();

      //Subscriber Details
      var that = this;

      //Current Region
      this.currRegion = dj.util.Region.getViewByRegion();

      this.concatURL = '';
      if ((typeof gcDomain !== "undefined") && (gcDomain) && (gcDomain !== "")) {
        this.concatURL = "http://" + gcDomain;
      } else {
        this.concatURL = "http://" + document.domain;
      }

      dj.util.User.isLoggedIn(function(isLoggedIn) {
        if (isLoggedIn) {
          that.displaySubscriberDetails();
          that.setupLogout();
        } else {

          that.setupLogin();

          var freeregClass = that.cfg.FREE_REG_CLASS;
          that.ofreereg = dojo.query(freeregClass, that.oHeader)[0];
          var registerModule = dojo.query("#register_module", that.ofreereg)[0];
          dojo.style(registerModule, {display: "none"});
          dojo.style(that.ofreereg, { display: "block" });

          var subscriberLoginClass = that.cfg.SUBSCRIBER_LOGIN_CLASS;
          that.oSubscriberLogin = dojo.query(subscriberLoginClass, that.oHeader)[0];
          var loginModule = dojo.query(".login_module", that.oSubscriberLogin)[0];
          dojo.style(loginModule, {display: "none"});
          dojo.style(that.oSubscriberLogin, { display: "block" });

          var headerPromoClass = that.cfg.HEADER_PROMO_CLASS;
          that.oHeaderPromo = dojo.query(headerPromoClass, that.oHeader)[0];
          dojo.style(that.oHeaderPromo, { display: "block" });
        }
      });

      //Form factor links highlighting
      this.highlightFormFactorLinks();

      //Setup Region Specific - Todays's Newspaper url

      var todaysPaperLinkClass = this.cfg.TODAYS_PAPER_LINK_CLASS;
      this.oTodaysPaperLink = dojo.query(todaysPaperLinkClass, this.oHeader)[0];
      var loggedInTodaysPaperUrl = this.cfg.LOGGED_IN_TODAYS_PAPER_URL;
      var loggedInTodaysPaperUrlAsia = this.cfg.LOGGED_IN_TODAYS_PAPER_URL_ASIA;
      var loggedInTodaysPaperUrlEurope = this.cfg.LOGGED_IN_TODAYS_PAPER_URL_EUROPE;

      var currEdition = "";

      if (this.currRegion == "asia" || this.currRegion == "asia,india") {
        loggedInTodaysPaperUrl = loggedInTodaysPaperUrlAsia;
      } else if (this.currRegion == "europe") {
        loggedInTodaysPaperUrl = loggedInTodaysPaperUrlEurope;
      }

      if ((typeof gcDomain !== "undefined") && (gcDomain) && (gcDomain !== "")) {
        this.oTodaysPaperLink.href = "http://" + gcDomain + loggedInTodaysPaperUrl;
      } else {
        this.oTodaysPaperLink.href = loggedInTodaysPaperUrl;
      }

      //var that = this;

     /* dj.util.User.isSubLoggedIn(function(subLoggedIn) {
        if (!subLoggedIn) {

          if ((typeof gcDomain !== "undefined") && (gcDomain) && (gcDomain !== "")) {
            that.oTodaysPaperLink.href = "http://" + gcDomain + "/public" + loggedInTodaysPaperUrl;
          } else {
            that.oTodaysPaperLink.href = "/public" + loggedInTodaysPaperUrl;
          }
        }
      });*/

      dj.util.User.isSubLoggedIn(function(subLoggedIn){
        if(subLoggedIn) {
          //IE doesn't support Array.indexOf, so...
          var region_index = -1;
          dojo.forEach(
            that.cfg.GO_PRO_HOOK_REGION,
            function(element,index){
              if(element===that.currRegion){
                region_index = index;
              }
            }
          );
          if(that.cfg.GO_PRO_HOOK_REGION==="all" || region_index!==-1) {
            dojo.removeClass(that.cfg.GO_PRO_HOOK, "hidden");
          }
        }
      });

    },

    toggleDropdownClass : function() {
      var selLocDrpdwnCollapsedClassName = this.cfg.LOCATION_NAV_COLLAPSED_CLASSNAME;
      var selLocDrpdwnExpandedClassName = this.cfg.LOCATION_NAV_EXPANDED_CLASSNAME;

      if (dojo.hasClass(this.oLocDropDownContainer, selLocDrpdwnCollapsedClassName)) {
        dojo.removeClass(this.oLocDropDownContainer, selLocDrpdwnCollapsedClassName);
        dojo.addClass(this.oLocDropDownContainer, selLocDrpdwnExpandedClassName);
      } else if (dojo.hasClass(this.oLocDropDownContainer, selLocDrpdwnExpandedClassName)) {
        dojo.addClass(this.oLocDropDownContainer, selLocDrpdwnCollapsedClassName);
      }
    },
    /**
     * Edition Dropdown SetUp
     *
     * @param {Object}
     *            oLocationNav
     */
    editionDropdownSetUp: function() {
      var that=this;

      var locationNavClass = this.cfg.LOCATION_NAV_CLASS;
      this.oLocationNav = dojo.query(locationNavClass, this.oHeader)[0];

      //Observer to open/close the location dropdown
      var selLocDrpdwnCollapsedClassName = this.cfg.LOCATION_NAV_COLLAPSED_CLASSNAME;
      var selLocDrpdwnExpandedClassName = this.cfg.LOCATION_NAV_EXPANDED_CLASSNAME;

      var usEditionLinkClassName = this.cfg.US_EDITION_LINK_CLASS;

      var usEditionLinkClassName = this.cfg.US_EDITION_LINK_CLASS;
      var euEditionLinkClassName = this.cfg.EU_EDITION_LINK_CLASS;
      var inEditionLinkClassName = this.cfg.IN_EDITION_LINK_CLASS;
      var asiaEditionLinkClassName = this.cfg.ASIA_EDITION_LINK_CLASS;

      this.usEditionMDCUrl = this.cfg.US_EDITION_MDC_URL;
      this.euEditionMDCUrl = this.cfg.EU_EDITION_MDC_URL;
      this.inEditionMDCUrl = this.cfg.IN_EDITION_MDC_URL;
      this.asiaEditionMDCUrl = this.cfg.ASIA_EDITION_MDC_URL;

      var mdcCompareUrl = this.cfg.MDC_COMPARE_URL;

      this.oCurrentEdition = dojo.byId("currentEdition");

      this.oUsEdition = dojo.byId("usEdition");
      this.oEuEdition = dojo.byId("europeEdition");
      this.oInEdition = dojo.byId("indiaEdition");
      this.oAsiaEdition = dojo.byId("asiaEdition");
      this.oChiEdition = dojo.byId("chiEdition");
      this.oJpnEdition = dojo.byId("jpnEdition");
      this.oSpaEdition = dojo.byId("spaEdition");
      this.oPorEdition = dojo.byId("porEdition");
      this.osectionFooterSub = dojo.byId("hrefNonSubId");
      this.osectionFooterNonSub = dojo.byId("hrefSubId");

      this.oUsEditionFooter = dojo.byId("usEditionFooter");

      this.currRegion = dj.util.Region.getViewByRegion();
      var currEdition = "";

      if ((typeof gcDomain !== "undefined") && (gcDomain) && (gcDomain !== "")) {
        this.tempConcatURL = "http://" + gcDomain;
      } else {
        this.tempConcatURL = "http://" + document.domain;
      }

      this.isMDCPageFlag = ((document.location.href) && (document.location.href !== "") && (document.location.href
          .indexOf(mdcCompareUrl) !== -1));

      if (this.oUsEdition) {

        dojo.connect(this.oUsEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          dj.util.Region.setViewByRegion('na,us');
          dj.util.Cookie.setGroupCookie("DJCOOKIE", "HOMEPAGE", "/home-page", 365);
          window.location = (this.isMDCPageFlag) ? this.tempConcatURL + this.usEditionMDCUrl : this.oUsEdition.href;
        });
      }

      if (this.oUsEditionFooter) {
        dojo.connect(this.oUsEditionFooter,"onclick", this, function(ev) {
          dojo.stopEvent(ev);
          dj.util.Region.setViewByRegion('na,us');
          dj.util.Cookie.setGroupCookie("DJCOOKIE", "HOMEPAGE", "/home/us", 365);
          window.location = (this.isMDCPageFlag) ? this.tempConcatURL + this.usEditionMDCUrl
              : this.oUsEditionFooter.href;
        });
      }

      if (this.oEuEdition) {
        dojo.connect( this.oEuEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = (this.isMDCPageFlag) ? this.tempConcatURL + this.euEditionMDCUrl : this.oEuEdition.href;

          if (this.isMDCPageFlag) {
            dj.util.Region.setViewByRegion("europe");
            dj.util.Cookie.setGroupCookie("DJCOOKIE", "HOMEPAGE", "/home/europe", 365);
          }

        });
      }

      if (this.oInEdition) {
        dojo.connect( this.oInEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = (this.isMDCPageFlag) ? this.tempConcatURL + this.inEditionMDCUrl : this.oInEdition.href;

          if (this.isMDCPageFlag) {
            dj.util.Region.setViewByRegion("asia,india");
            dj.util.Cookie.setGroupCookie("DJCOOKIE", "HOMEPAGE", "/home/india", 365);
          }

        });
      }

      if (this.oAsiaEdition) {
        dojo.connect( this.oAsiaEdition, "onclick", this,
            function(ev) {
              dojo.stopEvent(ev);
              window.location = (this.isMDCPageFlag) ? this.tempConcatURL + this.asiaEditionMDCUrl
                  : this.oAsiaEdition.href;

              if (this.isMDCPageFlag) {
                dj.util.Region.setViewByRegion("asia");
                dj.util.Cookie.setGroupCookie("DJCOOKIE", "HOMEPAGE", "/home/asia", 365);
              }

            });
      }

      if (this.oChiEdition) {
        dojo.connect( this.oChiEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.open(this.oChiEdition.href);
        });
      }

      if (this.oJpnEdition) {
        dojo.connect( this.oJpnEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.open(this.oJpnEdition.href);
        });
      }

      if (this.oSpaEdition) {
        dojo.connect( this.oSpaEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = this.oSpaEdition.href;
        });
      }

      if (this.oPorEdition) {
        dojo.connect( this.oPorEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = this.oPorEdition.href;
        });
      }

      if (this.osectionFooterSub) {
        dojo.connect( this.osectionFooterSub, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = this.osectionFooterSub.href;
        });
      }

      if (this.osectionFooterNonSub) {
        dojo.connect( this.osectionFooterNonSub, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = this.osectionFooterNonSub.href;
        });
      }

      if (this.currRegion == "asia") {
        currEdition = "Asia Edition";
        this.oSelectedEdition = dojo.query(asiaEditionLinkClassName, this.oHeader)[0];
      } else if (this.currRegion == "asia,india") {
        currEdition = "Asia Edition";
        this.oSelectedEdition = dojo.query(inEditionLinkClassName, this.oHeader)[0];
      } else if (this.currRegion == "europe") {
        currEdition = "Europe Edition";
        this.oSelectedEdition = dojo.query(euEditionLinkClassName, this.oHeader)[0];
      } else {
        // For US Edition we are using the new header, no need to execute this code
        currEdition = "U.S. Edition";
        this.oSelectedEdition = dojo.query(usEditionLinkClassName, this.oHeader)[0];
      }

      dojo.addClass(this.oSelectedEdition, "selected");

      this.oCurrentEdition.innerHTML = currEdition;

      this.oFormFactorContainer = dojo.byId("formFactorContainer");
      dojo.style(this.oFormFactorContainer, {"display": ""});

      this.oLocDropDownContainer = dojo.byId("locNavContainer");
      dojo.style(this.oLocDropDownContainer, {"display": ""});

      if (this.oLocDropDownContainer) {
        var toggleDropdownClass = function() {
          if (dojo.hasClass(that.oLocDropDownContainer, selLocDrpdwnCollapsedClassName)) {
            dojo.removeClass(that.oLocDropDownContainer, selLocDrpdwnCollapsedClassName);
            dojo.addClass(that.oLocDropDownContainer, selLocDrpdwnExpandedClassName);
          } else if (dojo.hasClass(that.oLocDropDownContainer, selLocDrpdwnExpandedClassName)) {
            dojo.removeClass(that.oLocDropDownContainer, selLocDrpdwnExpandedClassName);
            dojo.addClass(that.oLocDropDownContainer, selLocDrpdwnCollapsedClassName);
          }
        };

        dojo.connect( this.oLocationNav, "onclick", this, function(event) {
          dojo.stopEvent(event);
          toggleDropdownClass();
        });

        //Close the dropdown when a click happens outside the locNavContainer
        dojo.connect(document, "onclick", this, function(event) {
          var isMousePointerinModalContainer = dj.util.Element.contains(this.oLocDropDownContainer, event.clientX,
              event.clientY);
          if (isMousePointerinModalContainer == false) {
            if (dojo.hasClass(this.oLocDropDownContainer, selLocDrpdwnExpandedClassName)) {
              dojo.removeClass(this.oLocDropDownContainer, selLocDrpdwnExpandedClassName);
              dojo.addClass(this.oLocDropDownContainer, selLocDrpdwnCollapsedClassName);
            }
          }
        });

        this.oSectionFooterNonSub = dojo.byId("sectionFooterNonSub");
        this.oSectionFooterSub = dojo.byId("sectionFooterSub");

        dj.util.User.isLoggedIn(function(isLoggedIn) {
          if (isLoggedIn) {
            dojo.style(that.oSectionFooterNonSub, {"display":"none" });
            dojo.style(that.oSectionFooterSub, {"display": "" });
          } else {
            dojo.style(that.oSectionFooterNonSub, {"display": "" });
            dojo.style(that.oSectionFooterSub, {"display":"none" });
          }
        });
      }
    },

    /**
     * Timestamp display
     *
     * @param {Object}
     *            oTimestamp
     */
    displayTimeStamp: function() {
      var timestampClass = this.cfg.TIMESTAMP_CLASS;
      this.oTimestamp = dojo.query(timestampClass, this.oHeader)[0];

      if ((typeof pDate !== "undefined") && (this.oTimestamp)) {
        if (window.pStl == "renovation") {
          var pubDate = dj.util.Date.displayTime(pDate, pDateinGMT);
          this.oTimestamp.innerHTML= pubDate;
        } else {
          this.oTimestamp.innerHTML = pDate;
        }
      }
    },

    /**
     * Display the subsection
     *
     * @param {Object}
     *            oCurrentSubSection
     */
    displaySubSection: function() {
      this.oCurrentSubSection = dojo.query(this.cfg.CURRENT_SUBSECTION_DISPLAY_CLASS, this.oHeader)[0];

      if ((typeof globalHeaderPageTitle !== "undefined") && (globalHeaderPageTitle)
          && (globalHeaderPageTitle !== "")) {
        this.oCurrentSubSection.innerHTML = globalHeaderPageTitle;
        this._delayedFadeInSubSection();
      }
    },

    _delayedFadeInSubSection: function() {
      setTimeout(dojo.hitch(this, function() {
        // prepare for the fadeIn
        dojo.style(this.oCurrentSubSection, {
          "display": "inline",
          "opacity": 0
        });

        dojo.fadeIn({
          node: this.oCurrentSubSection,
          duration: (this.cfg.WSJ_LOGO_FADE_APPEAR_DURATION * 1000)
        }).play();
      }), this.cfg.WSJ_LOGO_DELAY_DURATION);
    },

    /**
     * Display the subscriber details
     */
    displaySubscriberDetails: function() {
      // Display the username
      var userNameElementId = this.cfg.USER_NAME_ELEMENT_ID;

      dj.util.User.renderCallsign(userNameElementId);

      // Construct Links for logged-in user
      this.setupSubscriberLinks();
      var messageCenterLinkClass = this.cfg.MESSAGE_CENTER_LINK_CLASS;
      this.oMessageCenterLink = dojo.query(messageCenterLinkClass, this.oHeader)[0];

      var that = this;

      dj.util.User.isSubLoggedIn(function(subLoggedIn) {
        if (subLoggedIn) {
          that.setupMessageCenter();
        } else {
          that.setUpMJLinksForReg();
          dojo.style(that.oMessageCenterLink, {"display":"none" });
        }
      });

      // Display the links specific to subscribed user
      var subscriberDetailsElementId = this.cfg.SUBSCRIBER_DETAILS_ELEMENT_ID;
      this.oSubscriberDetails = dojo.byId(subscriberDetailsElementId);
      dojo.removeClass(this.oSubscriberDetails, "hidden");
    },

    /**
     * Setup MJ Links for Reg user
     */
    setUpMJLinksForReg: function() {
      //Exception added below for handling footer link for MJ in-here
      var footerContainerClass = this.cfg.FOOTER_CONTAINER_CLASS;
      this.oFooter = dojo.query(footerContainerClass)[0];

      var mojLinkUrl = this.cfg.MOJ_LINK_URL;

      var mojLinkClass = this.cfg.MOJ_LINK_CLASS;
      this.oMojLinkHeader = dojo.query(mojLinkClass, this.oHeader)[0];
      this.oMojLinkFooter = dojo.query(mojLinkClass, this.oFooter)[0];

      if ((typeof gcDomain !== "undefined") && (gcDomain) && (gcDomain !== "")) {
        this.oMojLinkHeader.href = "http://" + gcDomain + mojLinkUrl;
        this.oMojLinkFooter.href = "http://" + gcDomain + mojLinkUrl;
      } else {
        this.oMojLinkHeader.href = mojLinkUrl;
        this.oMojLinkFooter.href = mojLinkUrl;
      }
    },

    /**
     * Setup Subscriber Links
     */
    setupSubscriberLinks: function() {

      var todaysPaperLinkClass = this.cfg.TODAYS_PAPER_LINK_CLASS;
      this.oTodaysPaperLink = dojo.query(todaysPaperLinkClass, this.oHeader)[0];
      var loggedInTodaysPaperUrl = this.cfg.LOGGED_IN_TODAYS_PAPER_URL;

      var that = this;

      dj.util.User.isSubLoggedIn(function(subLoggedIn) {
        if (subLoggedIn) {
          if ((typeof gcDomain !== "undefined") && (gcDomain) && (gcDomain !== "")) {
            that.oTodaysPaperLink.href = "http://" + gcDomain + loggedInTodaysPaperUrl;
          } else {
            that.oTodaysPaperLink.href = loggedInTodaysPaperUrl;
          }
        }
      });

    },

    /**
     * Message Center Setup
     */
    setupMessageCenter: function() {
      var messageCenterLinkClass = this.cfg.MESSAGE_CENTER_LINK_CLASS;
      this.oMessageCenterLink = dojo.query(messageCenterLinkClass, this.oHeader)[0];

      var messageCountClass = this.cfg.MESSAGE_COUNT_CLASS;
      this.oMessageCount = dojo.query(messageCountClass, this.oHeader)[0];

      // Url for Message Center and the no of messages
      var that = this;
      var setupMsgCenterLink = function(noOfMessages) {
        if (noOfMessages == '-1') {
          dojo.style(that.oMessageCenterLink, {"display":"none" });
        } else {
          that.oMessageCount.innerHTML = noOfMessages;
        }
      };

      var noOfMessages = dj.util.Cookie.getCookie("msgCount");

      if (noOfMessages === null) {
        var messageCenterPostUrl = this.cfg.MESSAGE_CENTER_POST_URL;


        var messageCountReq = dojo.xhrPost({
          url : messageCenterPostUrl,
          handleAs : "json",
          handle : function(data, ioargs) {
            var jsonObj = data;
            noOfMessages = jsonObj.MessagesCount;
            var userStatus = jsonObj.Status; //Set for expiry = 5 min == (5/24/60)
            dj.util.Cookie.setCookie("msgCount", noOfMessages, (5 / 24 / 60));
            dj.util.Cookie.setCookie("userStatus", userStatus, (5 / 24 / 60));
            setupMsgCenterLink(noOfMessages);
          },

          error: function(transport, exception) {
            console.error("Exception occured while posting posting Ajax Request: %s", exception);
          }

        });
      } else {
        setupMsgCenterLink(noOfMessages);
      }
    },

    /**
     * Subscriber Login
     */
    setupLogin: function() {
      var loginUserElementId = this.cfg.LOGIN_USERNAME_ELEMENT_ID;
      this.oUserName = dojo.byId(loginUserElementId);

      var loginPasswordElementId = this.cfg.LOGIN_PASSWORD_ELEMENT_ID;
      this.oPassword = dojo.byId(loginPasswordElementId);

      var loginButtonImageId = this.cfg.LOGIN_BUTTON_ELEMENT_ID;
      this.oLoginImg = dojo.byId(loginButtonImageId);

      var loginFormId = this.cfg.LOGIN_FORM_ID;
      this.oLoginForm = dojo.byId(loginFormId);
      if(this.oLoginForm != null){
    	  this.oLoginForm.reset();
      }

      var pageUrlId = this.cfg.PAGE_URL_ELEMENT_ID;
      this.oPageUrl = dojo.byId(pageUrlId);

      var that = this;

      if (this.oPageUrl) {

        var nonSubscriberHomepagePid = this.cfg.NONSUBSCRIBER_HOMEPAGE_PID;
        var nonSubscriberSearchPagePid = this.cfg.NONSUBSCRIBER_SEARCH_PAGE_PID;
        var nonSubNewslettersAlertsPagePid = this.cfg.NONSUBSCRIBER_NEWSLETTERS_ALERTS_PAGE_PID;
        var mdcPagePid = this.cfg.MDC_PAGE_PID;

        var concatURL;

        if ((typeof gcDomain !== "undefined") && (gcDomain) && (gcDomain !== "")) {
          concatURL = "http://" + gcDomain;
        } else {
          concatURL = "http://" + document.domain;
        }

        var oCurrentUrl;

        if (dojo.isIE) {
          oCurrentUrl = window.location.href;
        } else {
          oCurrentUrl = document.location.href;
        }

        var url_value = oCurrentUrl;
        if (typeof pID !== "undefined") {
          if (pID === nonSubscriberHomepagePid) {
            url_value = concatURL + this.cfg.HOMEPAGE_SUBSCRIBER_URL;
          } else if (pID === nonSubNewslettersAlertsPagePid) {
            url_value = concatURL + "/email";
          } else if (pID === nonSubscriberSearchPagePid) {
            url_value = concatURL + this.cfg.SEARCH_PAGE_SUBSCRIBER_URL;
          } else if (pID === mdcPagePid) {
            url_value = concatURL + this.cfg.MDC_LINK_URL;
          } else {
            url_value = oCurrentUrl;
          }
          if (dojo.isIE) {
            document.login_form.url.value = url_value;
          } else {
            this.oPageUrl.value = url_value;
          }

        }

        if (this.oUserName) {
          dojo.connect(this.oUserName, "onfocus", this, function(event) {
            dj.util.Form.clearValue(this.oUserName, "User Name");
          });

          dojo.connect(this.oUserName, "onclick", this, function(event) {
            dj.util.Form.clearValue(this.oUserName, "User Name");
          });

        }

        if (this.oPassword) {

          dojo.connect(this.oPassword, "onfocus", this, function(event) {
            dj.util.Form.clearValue(that.oPassword, "Password");
            this.oPassword.type = "password";
          });

          dojo.connect(this.oPassword, "onclick", this, function(event) {
            dj.util.Form.clearValue(that.oPassword, "Password");
            //     this.oPassword.type = "password";
            });

          dojo.connect(this.oPassword, "onchange", this, function(event) {
            dj.util.Form.clearValue(that.oPassword, "Password");
            //    this.oPassword.type = "password";
            });
        }

        if (dojo.isIE) {
          dojo.connect(this.oLoginImg, "onclick", this, function(e) {
            document.login_form.url.value = oCurrentUrl;
            console.log("coming in to img onlick in IE" + oCurrentUrl);
            this.oLoginForm.submit();
          });
        }

        dojo.connect(this.oPassword, "onkeypress", this, function(e) {
          var cKeyCode = e.keyCode || e.which;
          if (dojo.isIE) {
            if (cKeyCode == dojo.keys.ENTER) {
              document.login_form.url.value = oCurrentUrl;
              this.oLoginForm.submit();
            }
          }
        });
      }
    },

    /**
     * Logout
     */
    setupLogout: function() {
      var logoutLinkElementId = this.cfg.LOGOUT_LINK_ELEMENT_ID;
      this.oLogout = dojo.byId(logoutLinkElementId);

      if (this.oLogout) {
        //var logoutLinkUrl = this.cfg.LOGOUT_URL;
        //var logoutUrl = (typeof overrideHeaderLogout == "undefined") ? logoutLinkUrl : overrideHeaderLogout;

        dojo.connect(this.oLogout, "onclick", this, function(ev) {
          dojo.stopEvent(ev);

          //Delete the msgCount cookie
            dj.util.Cookie.deleteCookie("msgCount");

            //Delete the HOMEPAGE cookie
            dj.util.Cookie.deleteCookie("HOMEPAGE", true);
            document.cookie = "HOMEPAGE" + "=" + ";path=/" + ";domain=.wsj.com"
                + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";

            //Disconnect from Facebook
            if((typeof dj.module.facebook.connect.logout == "function") && ( FB.getAuthResponse() ) ) {
            	dj.module.facebook.connect.logout( function() {
            		  if ((typeof gcDomain !== "undefined") && (gcDomain) && (gcDomain !== "")) {
                    window.location = "/logout?url=http://" + gcDomain;
                  } else {
                    window.location = "/logout";
                  }
              });
            } else {
            	console.info("Facebook API is not available when executing Logout");
            	if ((typeof gcDomain !== "undefined") && (gcDomain) && (gcDomain !== "")) {
                window.location = "/logout?url=http://" + gcDomain;
              } else {
                window.location = "/logout";
              }
            }

          });
      }
    },

    /**
     * Highlight form factor links
     */
    highlightFormFactorLinks: function() {

      var todaysPaperLinkContainerClass = this.cfg.TODAYS_PAPER_LINK_CONTAINER_CLASS;
      this.oTodaysPaperLinkContainer = dojo.query(todaysPaperLinkContainerClass, this.oHeader)[0];

      var videoLinkContainerClass = this.cfg.VIDEO_LINK_CONTAINER_CLASS;
      this.oVideoLinkContainer = dojo.query(videoLinkContainerClass, this.oHeader)[0];

      var blogsLinkContainerClass = this.cfg.BLOGS_LINK_CONTAINER_CLASS;
      this.oBlogsLinkContainer = dojo.query(blogsLinkContainerClass, this.oHeader)[0];

      var columnsLinkContainerClass = this.cfg.COLUMNS_LINK_CONTAINER_CLASS;
      this.oColumnsLinkContainer = dojo.query(columnsLinkContainerClass, this.oHeader)[0];

      var interactiveGraphicsLinkContainerClass = this.cfg.INTERACTIVE_GRAPHICS_LINK_CONTAINER_CLASS;
      this.oInteractiveGraphicsLinkContainer = dojo.query(interactiveGraphicsLinkContainerClass, this.oHeader)[0];

      var topicsLinkContainerClass = this.cfg.TOPICS_LINK_CONTAINER_CLASS;
      this.oTopicsLinkContainer = dojo.query(topicsLinkContainerClass, this.oHeader)[0];

      var communityForumsLinkContainerClass = this.cfg.COMMUNITY_FORUMS_LINK_CONTAINER_CLASS;
      this.oCommunityForumsLinkContainer = dojo.query(communityForumsLinkContainerClass, this.oHeader)[0];

      var todaysPaperPid = this.cfg.TODAYS_PAPER_PID;
      var todaysPaperUsNonSubPid = this.cfg.TODAYS_PAPER_US_NONSUB_PID;
      var todaysPaperEuropeNonSubPid = this.cfg.TODAYS_PAPER_EUROPE_NONSUB_PID;
      var todaysPaperAsiaNonSubPid = this.cfg.TODAYS_PAPER_ASIA_NONSUB_PID;
      var todaysPaperUsPid = this.cfg.TODAYS_PAPER_US_PID;
      var todaysPaperEuropePid = this.cfg.TODAYS_PAPER_EUROPE_PID;
      var todaysPaperAsiaPid = this.cfg.TODAYS_PAPER_ASIA_PID;
      var todaysPaperPastEditionsPid = this.cfg.TODAYS_PAPER_PAST_EDITIONS_PID;
      var todaysPaperIndexBizPid = this.cfg.TODAYS_PAPER_INDEX_BIZ_PID;
      var todaysPaperIndexPeoplePid = this.cfg.TODAYS_PAPER_INDEX_PEOPLE_PID;
      var todaysPaperCorrectionsPid = this.cfg.TODAYS_PAPER_CORRECTIONS_PID;

      var videoPid = this.cfg.VIDEO_PID;
      var interactiveGraphicsPid = this.cfg.INTERACTIVE_GRAPHICS_PID;
      var topicsPid = this.cfg.TOPICS_PID;
      var newslettersAlertsPubPid = this.cfg.NEWSLETTERS_ALERTS_PUB_PID;
      var newslettersAlertsSubPid = this.cfg.NEWSLETTERS_ALERTS_SUB_PID;
      var columnsPid = this.cfg.COLUMNS_PID;
      var blogsPid = this.cfg.BLOGS_PID;

      var hostUrl = document.location.host;
      var communityUrl = hostUrl + this.cfg.COMMUNITY_HIGHLIGHT_COMPARE_URL;
      var compareForumsUrl = this.cfg.FORUMS_HIGHLIGHT_COMPARE_URL;

      if (typeof pID !== "undefined") {

        if ((pID.indexOf(todaysPaperPid)==0) || (pID === todaysPaperUsNonSubPid) || (pID === todaysPaperEuropeNonSubPid)
            || (pID === todaysPaperAsiaNonSubPid) || (pID === todaysPaperUsPid) || (pID === todaysPaperEuropePid)
            || (pID === todaysPaperAsiaPid) || (pID === todaysPaperPastEditionsPid) || (pID === todaysPaperIndexBizPid)
            || (pID === todaysPaperIndexPeoplePid) || (pID === todaysPaperCorrectionsPid)) {
          dojo.addClass(this.oTodaysPaperLinkContainer, "selected");
        } else if (pID === videoPid) {
          dojo.addClass(this.oVideoLinkContainer, "selected");
        } else if (pID === interactiveGraphicsPid) {
          dojo.addClass(this.oInteractiveGraphicsLinkContainer, "selected");
        } else if (pID === columnsPid) {
          dojo.addClass(this.oColumnsLinkContainer, "selected");
        } else if (pID === blogsPid) {
          dojo.addClass(this.oBlogsLinkContainer, "selected");
        } else if (pID === topicsPid) {
          dojo.addClass(this.oTopicsLinkContainer, "selected");
        }
      }
      if ((document.location.href) && (document.location.href !== "")
          && (document.location.href.indexOf(communityUrl) !== -1)
          || (document.location.href.indexOf(compareForumsUrl) !== -1)) {
        dojo.addClass(this.oCommunityForumsLinkContainer, "selected");
      }

    }
  };

}();
dojo.provide("dj.module.header.globalHeader");
dojo.require("dj.lang");
dojo.require("dj.util.Config");
dojo.require("dj.util.Cookie");
dojo.require("dj.util.Date");
dojo.require("dj.util.Region");
dojo.require("dj.util.Element");
dojo.require("dj.util.User");

/**
 * Javascript functions to initialize and setup for Global Header
 *
 * Lookups are done only to find the first element matching the class in the header container. This can be updated to
 * lookup multiple elements and apply the required functionality if required.
 */
dj.module.header.globalHeader = function() {

  var DEFAULT_CONFIG = {
     HEADER_CONTAINER_CLASS: ".header",
     CURRENT_SUBSECTION_DISPLAY_CLASS: ".currentSubSection",
     GLOBALNAV_SUBSECTION_ELEMENT_ID: "currentGlobalNavSubSection",
     MOJ_LINK_URL: "/page/my-journal-main.html",
     MDC_LINK_URL: "/mdc/page/marketsdata.html",
     MDC_PAGE_PID: "2_3000",
     COMMUNITY_HIGHLIGHT_COMPARE_URL: "/community",
     FORUMS_HIGHLIGHT_COMPARE_URL: "forums.wsj.com",
     
     LOCATION_NAV_CLASS: ".location_nav",
     LOCATION_NAV_COLLAPSED_CLASSNAME: "location_collapsed",
     LOCATION_NAV_EXPANDED_CLASSNAME: "location_expanded",
     US_EDITION_LINK_CLASS: ".map_us",
     EU_EDITION_LINK_CLASS: ".map_europe",
     ASIA_EDITION_LINK_CLASS: ".map_asia",
     IN_EDITION_LINK_CLASS: ".map_india",
     
     US_EDITION_MDC_URL: "/marketsdata",
     EU_EDITION_MDC_URL: "/mdc/public/page/marketsdata_europe.html",
     ASIA_EDITION_MDC_URL: "/mdc/public/page/marketsdata_asia.html",
     IN_EDITION_MDC_URL: "/mdc/public/page/marketsdata_asia.html",
     MDC_COMPARE_URL: "/mdc/",
     
     FOOTER_CONTAINER_CLASS: ".pagefooter"
  };


  return {
    initialize: function(config) {
      this.cfg = dj.lang.cloneMixin(DEFAULT_CONFIG, config);
      var headerContainerClass = this.cfg.HEADER_CONTAINER_CLASS;
      this.oHeader = dojo.query(".header")[0];
      this.editionDropdownSetUp();
      this.currRegion = dj.util.Region.getViewByRegion();
      this.oLocToggle = dojo.byId("loc_toggle");
    },

    toggleDropdownClass : function() {
      var selLocDrpdwnCollapsedClassName = this.cfg.LOCATION_NAV_COLLAPSED_CLASSNAME;
      var selLocDrpdwnExpandedClassName = this.cfg.LOCATION_NAV_EXPANDED_CLASSNAME;
      this.oLocToggle = dojo.byId("loc_toggle");
      
      if (dojo.hasClass(this.oLocToggle, selLocDrpdwnCollapsedClassName)) {
        dojo.removeClass(this.oLocToggle, selLocDrpdwnCollapsedClassName);
        dojo.addClass(this.oLocToggle, selLocDrpdwnExpandedClassName);
      } 
      else if (dojo.hasClass(this.oLocToggle, selLocDrpdwnExpandedClassName)) {
        dojo.removeClass(this.oLocToggle, selLocDrpdwnExpandedClassName);
    	dojo.addClass(this.oLocToggle, selLocDrpdwnCollapsedClassName);
      }
    },

    editionDropdownSetUp: function() {
      var that = this;
      
      this.oLocationNav = dojo.byId("locNavContainer");

      //Observer to open/close the location dropdown
      var selLocDrpdwnCollapsedClassName = this.cfg.LOCATION_NAV_COLLAPSED_CLASSNAME;
      var selLocDrpdwnExpandedClassName = this.cfg.LOCATION_NAV_EXPANDED_CLASSNAME;
      
      var usEditionLinkClassName = this.cfg.US_EDITION_LINK_CLASS;
      var euEditionLinkClassName = this.cfg.EU_EDITION_LINK_CLASS;
      var inEditionLinkClassName = this.cfg.IN_EDITION_LINK_CLASS;
      var asiaEditionLinkClassName = this.cfg.ASIA_EDITION_LINK_CLASS;

      this.usEditionMDCUrl = this.cfg.US_EDITION_MDC_URL;
      this.euEditionMDCUrl = this.cfg.EU_EDITION_MDC_URL;
      this.inEditionMDCUrl = this.cfg.IN_EDITION_MDC_URL;
      this.asiaEditionMDCUrl = this.cfg.ASIA_EDITION_MDC_URL;

      var mdcCompareUrl = this.cfg.MDC_COMPARE_URL;

      this.oCurrentEdition = dojo.byId("currentEdition"); //good
      this.oUsEdition = dojo.byId("usEdition");
      this.oEuEdition = dojo.byId("europeEdition");
      this.oInEdition = dojo.byId("indiaEdition");
      this.oAsiaEdition = dojo.byId("asiaEdition");
      this.oChiEdition = dojo.byId("chiEdition");
      this.oGerEdition = dojo.byId("gerEdition");
      this.oJpnEdition = dojo.byId("jpnEdition");
      this.oSpaEdition = dojo.byId("spaEdition");
      this.oPorEdition = dojo.byId("porEdition");
      this.osectionFooterSub = dojo.byId("hrefNonSubId");
      this.osectionFooterNonSub = dojo.byId("hrefSubId");

      this.oUsEditionFooter = dojo.byId("usEditionFooter");

      this.currRegion = dj.util.Region.getViewByRegion();
      var currEdition = "";

      if ((typeof gcDomain !== "undefined") && (gcDomain) && (gcDomain !== "")) {
        this.tempConcatURL = "http://" + gcDomain;
      } else {
        this.tempConcatURL = "http://" + document.domain;
      }

      this.isMDCPageFlag = ((document.location.href) && (document.location.href !== "") && (document.location.href
          .indexOf(mdcCompareUrl) !== -1));

      if (this.oUsEdition) {

        dojo.connect(this.oUsEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          dj.util.Region.setViewByRegion('na,us');
          dj.util.Cookie.setGroupCookie("DJCOOKIE", "HOMEPAGE", "/home-page", 365);
          window.location = (this.isMDCPageFlag) ? this.tempConcatURL + this.usEditionMDCUrl : this.oUsEdition.href;
        });
      }

      if (this.oUsEditionFooter) {
        dojo.connect(this.oUsEditionFooter,"onclick", this, function(ev) {
          dojo.stopEvent(ev);
          dj.util.Region.setViewByRegion('na,us');
          dj.util.Cookie.setGroupCookie("DJCOOKIE", "HOMEPAGE", "/home/us", 365);
          window.location = (this.isMDCPageFlag) ? this.tempConcatURL + this.usEditionMDCUrl
              : this.oUsEditionFooter.href;
        });
      }

      if (this.oEuEdition) {
        dojo.connect( this.oEuEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = (this.isMDCPageFlag) ? this.tempConcatURL + this.euEditionMDCUrl : this.oEuEdition.href;

          if (this.isMDCPageFlag) {
            dj.util.Region.setViewByRegion("europe");
            dj.util.Cookie.setGroupCookie("DJCOOKIE", "HOMEPAGE", "/home/europe", 365);
          }

        });
      }

      if (this.oInEdition) {
        dojo.connect( this.oInEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = (this.isMDCPageFlag) ? this.tempConcatURL + this.inEditionMDCUrl : this.oInEdition.href;

          if (this.isMDCPageFlag) {
            dj.util.Region.setViewByRegion("asia,india");
            dj.util.Cookie.setGroupCookie("DJCOOKIE", "HOMEPAGE", "/home/india", 365);
          }

        });
      }

      if (this.oAsiaEdition) {
        dojo.connect( this.oAsiaEdition, "onclick", this,
            function(ev) {
              dojo.stopEvent(ev);
              window.location = (this.isMDCPageFlag) ? this.tempConcatURL + this.asiaEditionMDCUrl
                  : this.oAsiaEdition.href;

              if (this.isMDCPageFlag) {
                dj.util.Region.setViewByRegion("asia");
                dj.util.Cookie.setGroupCookie("DJCOOKIE", "HOMEPAGE", "/home/asia", 365);
              }

            });
      }

      if (this.oChiEdition) {
        dojo.connect( this.oChiEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.open(this.oChiEdition.href);
        });
      }

      if (this.oGerEdition) {
        dojo.connect( this.oGerEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.open(this.oGerEdition.href);
        });
      }

      if (this.oJpnEdition) {
        dojo.connect( this.oJpnEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.open(this.oJpnEdition.href);
        });
      }

      if (this.oSpaEdition) {
        dojo.connect( this.oSpaEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = this.oSpaEdition.href;
        });
      }

      if (this.oPorEdition) {
        dojo.connect( this.oPorEdition, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = this.oPorEdition.href;
        });
      }

      if (this.osectionFooterSub) {
        dojo.connect( this.osectionFooterSub, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = this.osectionFooterSub.href;
        });
      }

      if (this.osectionFooterNonSub) {
        dojo.connect( this.osectionFooterNonSub, "onclick", this, function(ev) {
          dojo.stopEvent(ev);
          window.location = this.osectionFooterNonSub.href;
        });
      }

      if (this.currRegion == "asia") {
        currEdition = "Asia Edition Home";
        this.oSelectedEdition = dojo.query(asiaEditionLinkClassName, this.oHeader)[0];
      } else if (this.currRegion == "asia,india") {
        currEdition = "Asia Edition Home";
        this.oSelectedEdition = dojo.query(inEditionLinkClassName, this.oHeader)[0];
      } else if (this.currRegion == "europe") {
        currEdition = "Europe Edition Home";
        this.oSelectedEdition = dojo.query(euEditionLinkClassName, this.oHeader)[0];
      } else {
        
        currEdition = "U.S. Edition Home";
        this.oSelectedEdition = dojo.query(usEditionLinkClassName, this.oHeader)[0];
      }

      dojo.addClass(this.oSelectedEdition, "selected");

      this.oFormFactorContainer = dojo.byId("formFactorContainer");

      this.oLocDropDownContainer = dojo.byId("locNavContainer");
      this.oLocPopupContainer = dojo.byId("popupContainer");

      //dojo.removeClassName(this.oLocDropDownContainer,"location_collapsed");
     // dojo.addClassName(this.oLocDropDownContainer,"location_expanded");
      
      //dojo.style(this.oFormFactorContainer, {"display": ""});

      //dojo.style(this.oLocDropDownContainer, {"display": ""});
      
      if (this.oLocDropDownContainer) {
        var toggleDropdownClass = function() {
          this.oLocToggle = dojo.byId("loc_toggle");
        	
          if (dojo.hasClass(this.oLocToggle, selLocDrpdwnCollapsedClassName)) {
            dojo.removeClass(this.oLocToggle, selLocDrpdwnCollapsedClassName);
            dojo.addClass(this.oLocToggle, selLocDrpdwnExpandedClassName);
          } else if (dojo.hasClass(this.oLocToggle, selLocDrpdwnExpandedClassName)) {
            dojo.removeClass(this.oLocToggle, selLocDrpdwnExpandedClassName);
            dojo.addClass(this.oLocToggle, selLocDrpdwnCollapsedClassName);
          }
        };

        dojo.connect( this.oLocationNav, "onclick", this, function(event) {
          dojo.stopEvent(event);
          toggleDropdownClass();
        });

        //Close the dropdown when a click happens outside the locNavContainer
        dojo.connect(document, "onclick", this, function(event) {

          var isMousePointerinModalContainer = dj.util.Element.contains(this.oLocPopupContainer, event.clientX,
              event.clientY);
          if (isMousePointerinModalContainer == false) {
            if (dojo.hasClass(this.oLocToggle, selLocDrpdwnExpandedClassName)) {
              dojo.removeClass(this.oLocToggle, selLocDrpdwnExpandedClassName);
              dojo.addClass(this.oLocToggle, selLocDrpdwnCollapsedClassName);
            }
          }
        });

        this.oSectionFooterNonSub = dojo.byId("sectionFooterNonSub");
        this.oSectionFooterSub = dojo.byId("sectionFooterSub");
        
        dj.util.User.isLoggedIn(function(isLoggedIn) {
          if (isLoggedIn) {
            //dojo.style(that.oSectionFooterNonSub, {"display":"none" });
            //dojo.style(that.oSectionFooterSub, {"display": "" });
          } else {
            //dojo.style(that.oSectionFooterNonSub, {"display": "" });
            //dojo.style(that.oSectionFooterSub, {"display":"none" });
          }
        });
      }
    }
  };
}();
dojo.provide("dj.module.header.login");

dojo.require("dj.lang");
dojo.require("dj.util.Config");
dojo.require("dj.util.Cookie");
dojo.require("dj.util.Date");
dojo.require("dj.util.Region");
dojo.require("dj.util.Element");
dojo.require("dj.util.User");
dojo.require("dj.module.facebook.connect");

/**
 * Javascript functions to initialize and setup for Global Header
 *
 * Lookups are done only to find the first element matching the class in the header container. This can be updated to
 * lookup multiple elements and apply the required functionality if required.
 */
dj.module.header.login = function() {

  var DEFAULT_CONFIG = {
     HEADER_CONTAINER_CLASS: ".header",
     TIMESTAMP_CLASS: ".date",
     WSJ_LOGO_ID: "wsjLogo",
     WSJ_LARGE_LOGO_CLASSNAME: "logo_large",
     WSJ_SMALL_LOGO_CLASSNAME: "logo_small",
     CURRENT_SUBSECTION_DISPLAY_CLASS: ".currentSubSection",
     GLOBALNAV_SUBSECTION_ELEMENT_ID: "currentGlobalNavSubSection",
     SUBSCRIBER_LOGIN_CLASS: ".login",
     HEADER_PROMO_CLASS: ".promo",
     SUBSCRIBER_DETAILS_ELEMENT_ID: "subscribedUserDetailsId",
     COMMUNITY_FORUMS_LINK_CLASS: ".communityForumsLink",
     TODAYS_PAPER_LINK_CLASS: ".todaysPaperLink",
     MOJ_LINK_CLASS: ".myOnlineJournalLink",
     MESSAGE_CENTER_LINK_CLASS: ".messageCenterLink",
     MESSAGE_COUNT_CLASS: ".messageCount",
     LOGIN_USERNAME_ELEMENT_ID: "login_username",
     LOGIN_PASSWORD_ELEMENT_ID: "login_password",
     LOGIN_FORM_ID: "login_form",
     PAGE_URL_ELEMENT_ID: "page_url",
     LOGOUT_LINK_ELEMENT_ID: "logoutLink",
     LOGIN_BUTTON_ELEMENT_ID: "login_button",
     USER_NAME_ELEMENT_ID: "userName",
     WSJ_LOGO_FADE_APPEAR_DURATION: "1.0",
     WSJ_LOGO_DELAY_DURATION: "2000",
     LOGGED_IN_COMMUNITY_URL: "/community",
     //LOGGED_IN_TODAYS_PAPER_URL: "/page/us_in_todays_paper.html?mod=WSJ_formfactor",
     LOGGED_IN_TODAYS_PAPER_URL: "/itp?mod=WSJ_formfactor",
     LOGGED_IN_TODAYS_PAPER_URL_ASIA: "/itp/asia?mod=WSJ_formfactor",
     LOGGED_IN_TODAYS_PAPER_URL_EUROPE: "/itp/europe?mod=WSJ_formfactor",
     MESSAGE_CENTER_POST_URL: "/community/integration/userinfo.html",
      // MESSAGE_CENTER_POST_URL : "/community/integration/messagescount.html",
     LOGOUT_URL: "/static_html_files/logout_confirmation.htm",
     SUBSCRIBER_HOMEPAGE_PID: "0_0_WH_0001",
     NONSUBSCRIBER_HOMEPAGE_PID: "0_0_WH_0001_public",
     ASIA_PAGE_PID: "0_0_WP_2103",
     EUROPE_PAGE_PID: "0_0_WP_2104",
     NONSUBSCRIBER_NEWSLETTERS_ALERTS_PAGE_PID: "5_6007",
     NONSUBSCRIBER_SEARCH_PAGE_PID: "3_0466",
     HOMEPAGE_SUBSCRIBER_URL: "/",
     SEARCH_PAGE_SUBSCRIBER_URL: "/search",
     TODAYS_PAPER_LINK_CONTAINER_CLASS: ".todaysPaperLinkContainer",
     VIDEO_LINK_CONTAINER_CLASS: ".videoLinkContainer",
     COLUMNS_LINK_CONTAINER_CLASS: ".columnsLinkContainer",
     BLOGS_LINK_CONTAINER_CLASS: ".blogsLinkContainer",
     INTERACTIVE_GRAPHICS_LINK_CONTAINER_CLASS: ".interactiveGraphicsLinkContainer",
     TOPICS_LINK_CONTAINER_CLASS: ".topicsLinkContainer",
     COMMUNITY_FORUMS_LINK_CONTAINER_CLASS: ".communityForumsLinkContainer",
     TODAYS_PAPER_PID: "0_0_WP_40",
     TODAYS_PAPER_US_NONSUB_PID: "2_0433",
     TODAYS_PAPER_EUROPE_NONSUB_PID: "2_0434",
     TODAYS_PAPER_ASIA_NONSUB_PID: "2_0435",
     TODAYS_PAPER_US_PID: "2_0133",
     TODAYS_PAPER_EUROPE_PID: "2_0134",
     TODAYS_PAPER_ASIA_PID: "2_0135",
     TODAYS_PAPER_PAST_EDITIONS_PID: "2_0233",
     TODAYS_PAPER_INDEX_BIZ_PID: "2_0156",
     TODAYS_PAPER_INDEX_PEOPLE_PID: "2_0155",
     TODAYS_PAPER_CORRECTIONS_PID: "Corrections",
     VIDEO_PID: "0_0_WP_3000",
     BLOGS_PID: "8_0019",
     COLUMNS_PID: "2_0140",
     INTERACTIVE_GRAPHICS_PID: "0_0_WP_2003",
     TOPICS_PID: "0_0_WT_0001",
     NEWSLETTERS_ALERTS_SUB_PID: "5_6001",
     NEWSLETTERS_ALERTS_PUB_PID: "5_6003",
     MOJ_LINK_URL: "/page/my-journal-main.html",
     MDC_LINK_URL: "/mdc/page/marketsdata.html",
     MDC_PAGE_PID: "2_3000",
     COMMUNITY_HIGHLIGHT_COMPARE_URL: "/community",
     FORUMS_HIGHLIGHT_COMPARE_URL: "forums.wsj.com",
     FREE_REG_CLASS: ".freereg",
     LOCATION_NAV_CLASS: ".location_nav",
     LOCATION_NAV_COLLAPSED_CLASSNAME: "location_collapsed",
     LOCATION_NAV_EXPANDED_CLASSNAME: "location_expanded",
     US_EDITION_LINK_CLASS: ".map_us",
     EU_EDITION_LINK_CLASS: ".map_europe",
     ASIA_EDITION_LINK_CLASS: ".map_asia",
     IN_EDITION_LINK_CLASS: ".map_india",
     US_EDITION_MDC_URL: "/mdc/public/page/marketsdata.html",
     EU_EDITION_MDC_URL: "/mdc/public/page/marketsdata_europe.html",
     ASIA_EDITION_MDC_URL: "/mdc/public/page/marketsdata_asia.html",
     IN_EDITION_MDC_URL: "/mdc/public/page/marketsdata_asia.html",
     MDC_COMPARE_URL: "/mdc/",
     FOOTER_CONTAINER_CLASS: ".pagefooter",
     //PRO_HOOK
     GO_PRO_HOOK: "goprohook",
     GO_PRO_HOOK_REGION: ["all"]
  };

  return {
    /**
     * Initialize the Global Header Logo bar (G2)
     *
     * @param {Object}
     *            config
     */
    initialize: function(config) {
      this.cfg = dj.lang.cloneMixin(DEFAULT_CONFIG, config);
      var headerContainerClass = this.cfg.HEADER_CONTAINER_CLASS;
      this.oHeader = dojo.query(headerContainerClass)[0];
      this.currRegion = dj.util.Region.getViewByRegion();
      this.concatURL = '';
      this.subscriberLoginInit();
      this.displayGoPro();

      if ((typeof gcDomain !== "undefined") && (gcDomain !== null) && (gcDomain !== "")) {
        this.concatURL = "http://" + gcDomain;
      } else {
        this.concatURL = "http://" + document.domain;
      }
    },

    /**
     * Display Subscriber Info
     */
    subscriberLoginInit: function() {
      var that = this;
            dj.util.User.isLoggedIn(function(isLoggedIn) {
                if (isLoggedIn) {
                  that.displaySubscriberDetails();
                  that.setupLogout();
                } else {

                  that.setupLogin();

                  //var freeregClass = that.cfg.FREE_REG_CLASS;
                  //that.ofreereg = dojo.query(freeregClass, that.oHeader)[0];
                  //var registerModule = dojo.query("#register_module", that.ofreereg)[0];
                  //dojo.style(registerModule, {display: "none"});
                  //dojo.style(that.ofreereg, { display: "block" });

                  var subscriberLoginClass = that.cfg.SUBSCRIBER_LOGIN_CLASS;
                  that.oSubscriberLogin = dojo.query(subscriberLoginClass, that.oHeader)[0];
                  var loginModule = dojo.query(".login_module", that.oSubscriberLogin)[0];
                  dojo.style(loginModule, {display: "block"});
                  dojo.style(that.oSubscriberLogin, { display: "block" });

                  var headerPromoClass = that.cfg.HEADER_PROMO_CLASS;
                  that.oHeaderPromo = dojo.query(headerPromoClass, that.oHeader)[0];
                  dojo.style(that.oHeaderPromo, { display: "block" });
                }
              });
    },

    /**
     * Display the GoPro Promo
     */
    displayGoPro: function() {
      var that = this;

      dj.util.User.isSubLoggedIn(function(subLoggedIn){
            if(subLoggedIn) {
              var region_index = -1;
              dojo.forEach(
                that.cfg.GO_PRO_HOOK_REGION,
                function(element,index){
                  if(element===that.currRegion){
                    region_index = index;
                  }
                }
              );
              if(that.cfg.GO_PRO_HOOK_REGION[0] === "all" || region_index !== -1) {
                if(dojo.byId(that.cfg.GO_PRO_HOOK)){
                	dojo.removeClass(that.cfg.GO_PRO_HOOK, "hidden");
                }
              }
            }
      });
    },

    /**
     * Display the subscriber details
     */
    displaySubscriberDetails: function() {
      // Display the username
      var userNameElementId = this.cfg.USER_NAME_ELEMENT_ID;

      dj.util.User.renderCallsign(userNameElementId);

      // Construct Links for logged-in user
      // this.setupSubscriberLinks();
      var messageCenterLinkClass = this.cfg.MESSAGE_CENTER_LINK_CLASS;
      this.oMessageCenterLink = dojo.query(messageCenterLinkClass, this.oHeader)[0];

      var that = this;

      dj.util.User.isSubLoggedIn(function(subLoggedIn) {
        if (subLoggedIn) {
          that.setupMessageCenter();
        } else {
          that.setUpMJLinksForReg();
          if(that.oMessageCenterLink){
        	  dojo.style(that.oMessageCenterLink, {"display":"none" });
          }
        }
      });

      // Display the links specific to subscribed user
      var subscriberDetailsElementId = this.cfg.SUBSCRIBER_DETAILS_ELEMENT_ID;
      this.oSubscriberDetails = dojo.byId(subscriberDetailsElementId);
      dojo.removeClass(this.oSubscriberDetails, "hidden");
    },

    /**
     * Setup MJ Links for Reg user
     */
    setUpMJLinksForReg: function() {
      //Exception added below for handling footer link for MJ in-here
      var footerContainerClass = this.cfg.FOOTER_CONTAINER_CLASS;
      this.oFooter = dojo.query(footerContainerClass)[0];

      var mojLinkUrl = this.cfg.MOJ_LINK_URL;

      var mojLinkClass = this.cfg.MOJ_LINK_CLASS;
      this.oMojLinkHeader = dojo.query(mojLinkClass, this.oHeader)[0];
      this.oMojLinkFooter = dojo.query(mojLinkClass, this.oFooter)[0];

      if ((typeof gcDomain !== "undefined") && (gcDomain !== null) && (gcDomain !== "")) {
        if(this.oMojLinkHeader){
        	this.oMojLinkHeader.href = "http://" + gcDomain + mojLinkUrl;
        }
        if(this.oMojLinkFooter){
        	this.oMojLinkFooter.href = "http://" + gcDomain + mojLinkUrl;
        }
      } else {
    	if(this.oMojLinkHeader){  
    		this.oMojLinkHeader.href = mojLinkUrl;
    	}
    	if(this.oMojLinkFooter){
    		this.oMojLinkFooter.href = mojLinkUrl;
    	}	
      }
    },

    /**
     * Setup Subscriber Links
     */
    setupSubscriberLinks: function() {

      var todaysPaperLinkClass = this.cfg.TODAYS_PAPER_LINK_CLASS;
      this.oTodaysPaperLink = dojo.query(todaysPaperLinkClass, this.oHeader)[0];
      var loggedInTodaysPaperUrl = this.cfg.LOGGED_IN_TODAYS_PAPER_URL;

      var that = this;

      dj.util.User.isSubLoggedIn(function(subLoggedIn) {
        if (subLoggedIn) {
          if ((typeof gcDomain !== "undefined") && (gcDomain !== null) && (gcDomain !== "")) {
            that.oTodaysPaperLink.href = "http://" + gcDomain + loggedInTodaysPaperUrl;
          } else {
            that.oTodaysPaperLink.href = loggedInTodaysPaperUrl;
          }
        }
      });

    },

    /**
     * Message Center Setup
     */
    setupMessageCenter: function() {
      var messageCenterLinkClass = this.cfg.MESSAGE_CENTER_LINK_CLASS;
      this.oMessageCenterLink = dojo.query(messageCenterLinkClass, this.oHeader)[0];

      var messageCountClass = this.cfg.MESSAGE_COUNT_CLASS;
      this.oMessageCount = dojo.query(messageCountClass, this.oHeader)[0];

      // Url for Message Center and the no of messages
      var that = this;
      var setupMsgCenterLink = function(noOfMessages) {
        if (noOfMessages == '-1') {
          dojo.style(that.oMessageCenterLink, {"display":"none" });
        } else {
          that.oMessageCount.innerHTML = noOfMessages;
        }
      };

      var noOfMessages = dj.util.Cookie.getCookie("msgCount");

      if (noOfMessages === null) {
        var messageCenterPostUrl = this.cfg.MESSAGE_CENTER_POST_URL;


        var messageCountReq = dojo.xhrPost({
          url : messageCenterPostUrl,
          handleAs : "json",
          handle : function(data, ioargs) {
            var jsonObj = data;
            noOfMessages = jsonObj.MessagesCount;
            var userStatus = jsonObj.Status; //Set for expiry = 5 min == (5/24/60)
            dj.util.Cookie.setCookie("msgCount", noOfMessages, (5 / 24 / 60));
            dj.util.Cookie.setCookie("userStatus", userStatus, (5 / 24 / 60));
            setupMsgCenterLink(noOfMessages);
          },

          error: function(transport, exception) {
            console.error("Exception occured while posting posting Ajax Request: %s", exception);
          }

        });
      } else {
        setupMsgCenterLink(noOfMessages);
      }
    },

    /**
     * Subscriber Login
     */
    setupLogin: function() {
      var loginUserElementId = this.cfg.LOGIN_USERNAME_ELEMENT_ID;
      this.oUserName = dojo.byId(loginUserElementId);

      var loginPasswordElementId = this.cfg.LOGIN_PASSWORD_ELEMENT_ID;
      this.oPassword = dojo.byId(loginPasswordElementId);

      var loginButtonImageId = this.cfg.LOGIN_BUTTON_ELEMENT_ID;
      this.oLoginImg = dojo.byId(loginButtonImageId);

      var loginFormId = this.cfg.LOGIN_FORM_ID;
      this.oLoginForm = dojo.byId(loginFormId);
      if(this.oLoginForm != null){
    	  this.oLoginForm.reset();
      }

      var pageUrlId = this.cfg.PAGE_URL_ELEMENT_ID;
      this.oPageUrl = dojo.byId(pageUrlId);

      var that = this;

      if (this.oPageUrl !== null) {

        var nonSubscriberHomepagePid = this.cfg.NONSUBSCRIBER_HOMEPAGE_PID;
        var nonSubscriberSearchPagePid = this.cfg.NONSUBSCRIBER_SEARCH_PAGE_PID;
        var nonSubNewslettersAlertsPagePid = this.cfg.NONSUBSCRIBER_NEWSLETTERS_ALERTS_PAGE_PID;
        var mdcPagePid = this.cfg.MDC_PAGE_PID;

        var concatURL;

        if ((typeof gcDomain !== "undefined") && (gcDomain !== null) && (gcDomain !== "")) {
          concatURL = "http://" + gcDomain;
        } else {
          concatURL = "http://" + document.domain;
        }

        var oCurrentUrl;

        if (dojo.isIE) {
          oCurrentUrl = window.location.href;
        } else {
          oCurrentUrl = document.location.href;
        }

        var url_value = oCurrentUrl;
        if (typeof pID !== "undefined") {
          if (pID === nonSubscriberHomepagePid) {
            url_value = concatURL + this.cfg.HOMEPAGE_SUBSCRIBER_URL;
          } else if (pID === nonSubNewslettersAlertsPagePid) {
            url_value = concatURL + "/email";
          } else if (pID === nonSubscriberSearchPagePid) {
            url_value = concatURL + this.cfg.SEARCH_PAGE_SUBSCRIBER_URL;
          } else if (pID === mdcPagePid) {
            url_value = concatURL + this.cfg.MDC_LINK_URL;
          } else {
            url_value = oCurrentUrl;
          }

          var cachebuster = (url_value.indexOf("?")!=-1)? "&" : "?";
          //check for ? and add & otherwise
          if(typeof cachebuster!== undefined)
          {
            cachebuster = cachebuster+"_nocache="+new Date().getTime();
            if(url_value.indexOf("#")!=-1){
              url_value = url_value.replace("#",cachebuster+"#");
            }else{
              url_value = url_value + cachebuster;
            }
          }


          if (dojo.isIE) {
            document.login_form.url.value = url_value;
          } else {
            this.oPageUrl.value = url_value;
          }


        }

        if (this.oUserName !== null) {
          dojo.connect(this.oUserName, "onfocus", this, function(event) {
            dj.util.Form.clearValue(this.oUserName, "User Name");
          });

          dojo.connect(this.oUserName, "onclick", this, function(event) {
            dj.util.Form.clearValue(this.oUserName, "User Name");
          });

        }

        if (this.oPassword !== null) {

          dojo.connect(this.oPassword, "onfocus", this, function(event) {
            dj.util.Form.clearValue(that.oPassword, "Password");
            this.oPassword.type = "password";
          });

          dojo.connect(this.oPassword, "onclick", this, function(event) {
            dj.util.Form.clearValue(that.oPassword, "Password");
            //     this.oPassword.type = "password";
            });

          dojo.connect(this.oPassword, "onchange", this, function(event) {
            dj.util.Form.clearValue(that.oPassword, "Password");
            //    this.oPassword.type = "password";
            });
        }

        if (dojo.isIE) {
          dojo.connect(this.oLoginImg, "onclick", this, function(e) {
            document.login_form.url.value = oCurrentUrl;
            console.log("coming in to img onlick in IE" + oCurrentUrl);
            this.oLoginForm.submit();
          });
        }

        dojo.connect(this.oPassword, "onkeypress", this, function(e) {
          var cKeyCode = e.keyCode || e.which;
          if (dojo.isIE) {
            if (cKeyCode == dojo.keys.ENTER) {
              document.login_form.url.value = oCurrentUrl;
              this.oLoginForm.submit();
            }
          }
        });
      }
    },

    /**
     * Logout
     */
    setupLogout: function() {
      var logoutLinkElementId = this.cfg.LOGOUT_LINK_ELEMENT_ID;
      this.oLogout = dojo.byId(logoutLinkElementId);

      if (this.oLogout !== null) {
        //var logoutLinkUrl = this.cfg.LOGOUT_URL;
        //var logoutUrl = (typeof overrideHeaderLogout == "undefined") ? logoutLinkUrl : overrideHeaderLogout;

        dojo.connect(this.oLogout, "onclick", this, function(ev) {
          dojo.stopEvent(ev);

          //Delete the msgCount cookie
            dj.util.Cookie.deleteCookie("msgCount");

            //Delete the HOMEPAGE cookie
            dj.util.Cookie.deleteCookie("HOMEPAGE", true);
            document.cookie = "HOMEPAGE" + "=" + ";path=/" + ";domain=.wsj.com" + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";

            //Disconnect from Facebook
            if((typeof dj.module.facebook.connect.logout == "function") && ( FB.getAuthResponse() ) ) {
            	dj.module.facebook.connect.logout( function() {
            		  if ((typeof gcDomain !== "undefined") && (gcDomain !== null) && (gcDomain !== "")) {
                    window.location = "/logout?url=http://" + gcDomain;
                  } else {
                    window.location = "/logout";
                  }
              });
            } else {
            	console.info("Facebook API is not available when executing Logout");
            	if ((typeof gcDomain !== "undefined") && (gcDomain !== null) && (gcDomain !== "")) {
                window.location = "/logout?url=http://" + gcDomain;
              } else {
                window.location = "/logout";
              }
            }


          });
      }
    }
  };

}();
dojo.provide("dj.module.header.exec._common");
dojo.require("dj.module.header.sectionMenu");

dj.module.header.exec._common = {
  init: function(_cfgObj) {
    var cfgObj = _cfgObj || {};
    this._exec(this.preInit);

    this._exec([
      function() {
        dj.module.header.sectionMenu.init();
      }
    ]);

    this._exec(this.postInit, cfgObj);
  },
  preInit: [],
  postInit: [],

  _exec: function(arr, cfgObj) {
    for (var i = 0; i < arr.length; i++) {
      var fn = arr[i];
      try {
        fn.call(null, cfgObj);
      } catch (e) {
        console.error("HeaderExec-"+i+": ", e);
      }
    }
  }
};
dojo.provide("dj.module.header.exec.NA_WSJ_SUB");
dojo.require("dj.module.header.exec._common");

dojo.require("dj.widget.networkHat.AutoComplete");
dojo.require("dj.module.header.globalHeader");
dojo.require("dj.module.header.localWeather");
dojo.require("dj.module.header.login");
dojo.require("dj.module.facebook.connect");
dojo.require("dj.widget.panel.SelectDropdownPanel");
dojo.require("gravity.beacon");

dj.module.header.exec.NA_WSJ_SUB = dojo.delegate(dj.module.header.exec._common, {
  postInit: [
    function() {
      dj.module.networkHatLoader = new dj.widget.networkHat.AutoComplete();
    },

    function() {
      dj.module.header.globalHeader.initialize();
    },

    function() {
      dj.module.header.localWeather.init({
        defaultLocation:"10005", 
        redirectUrl:"http://commerce.wsj.com/auth/login?roles=FREEREG-BASE&mg=cmy-wsj"
      });
    },

    function() {
      dj.module.header.login.initialize();
    },

    function() {
      dj.module.facebook.connect.init();
    },

    function() {
      var moreNode = dojo.byId("MoreIndustries_Container");
      if (moreNode) {
        dj.module.moreIndustries = new dj.widget.panel.SelectDropdownPanel(moreNode);
      }
    },
    
    function() {
      dj.module.browserPhaseout().init();
    },

    function() {
 	      gravity.beacon.init();
    } 
  ]
});
dojo.provide("dj.module.header.exec.NA_WSJ_PUB");
dojo.require("dj.module.header.exec._common");

dojo.require("dj.widget.networkHat.AutoComplete");
dojo.require("dj.module.header.globalHeader");
dojo.require("dj.module.header.localWeather");
dojo.require("dj.widget.panel.ModalPanel");
dojo.require("dj.module.header.login");
dojo.require("dj.module.facebook.connect");
dojo.require("dj.widget.panel.SelectDropdownPanel");
dojo.require("gravity.beacon");

dj.module.header.exec.NA_WSJ_PUB = dojo.delegate(dj.module.header.exec._common, {
  postInit: [
    function() {
      dj.module.networkHatLoader = new dj.widget.networkHat.AutoComplete();
    },

    function() {
      dj.module.header.globalHeader.initialize();
    },

    function() {
      dj.module.header.localWeather.init({
        defaultLocation:"10005",
        expireInterval: "2400",
        redirectUrl:"http://commerce.wsj.com/auth/login?roles=FREEREG-BASE&mg=cmy-wsj"
      });
    },

    function() {
      dj.module.facebook.connect.init();
    },

    function() {
      var moreNode = dojo.byId("MoreIndustries_Container");
      if (moreNode) {
        dj.module.moreIndustries = new dj.widget.panel.SelectDropdownPanel(moreNode);
      }
    },

    function() {
      if (typeof openHouseMode!=="undefined" && openHouseMode)
      { dojo.byId("hat_top_style").className=""; }      
   } ,

   function() {     
     dj.module.browserPhaseout().init();
   },

   function() {
	      gravity.beacon.init();
   },

   function(cfg){
	   if(typeof cfg != "undefined"){
		   dojo.require("dj.widget.loader.LoginLoader");
		   if (window.console) console.log("here... version is " + cfg.version );
		   dj.widget.loader.LoginLoader({isLoadJs:cfg.isLoadJs,version:cfg.version}).init();
	   }else{
		   if (window.console) console.log("..cfg....is undefined " );
	   }
   }

  ]
});
dojo.provide("dj.module.header.exec.NA_WSJ_REG");
dojo.require("dj.module.header.exec.NA_WSJ_SUB");

dj.module.header.exec.NA_WSJ_REG = dojo.delegate(dj.module.header.exec.NA_WSJ_SUB, {
});

dojo.provide("dj.util.doubleclick");dj.util.doubleclick={createTrackingPixel:function(userConf){var conf={container:"",source:"",type:"",category:"",url:"",trackingType:"iframe"};dojo.mixin(conf,userConf);var axel=Math.random()+"";var a=axel*10000000000000;if(conf.container===""){console.error("{dj.util.doubleclick} - container cannot be null or empty");}
try{if(conf.trackingType=="iframe"){dojo.create("iframe",{src:conf.url+";src="+conf.source+";type="+conf.type+";cat="+conf.category+";ord="+a+"?",width:"1",height:"1",frameborder:"0"},conf.container);}
else{dojo.create("img",{src:conf.url+";src="+conf.source+";type="+conf.type+";cat="+conf.category+";ord="+a+"?",width:"1",height:"1",border:"0",alt:""},conf.container);}}catch(e){console.error("{dj.util.doubleclick} - Could not create pixel");console.log(e);}}};
dojo.provide("dj.module.mst.preview.decorator");dojo.require("dijit.Menu");dojo.require("dijit.MenuItem");dojo.require("dijit.form.DropDownButton");dojo.require("dijit.form.ToggleButton");dj.module.mst.preview.decorator={override:false,showMasks:true,init:function(){var hn=document.location.hostname;var domain=hn.substring(hn.substring(0,hn.lastIndexOf(".")).lastIndexOf(".")+1,hn.length);if(domain==="dowjones.net"){this.injectCSS("http://ajax.googleapis.com/ajax/libs/dojo/1.6/dijit/themes/tundra/tundra.css");dojo.addClass(dojo.body()," tundra ");if(window.parent!==window.self||this.override){var self=this;dojo.query("div[data-module-id]").forEach(function(node,index,arr){if(dojo.query("div[data-module-id]",node).length===0){dojo.connect(node,"onmouseenter",function(ev){self.placeMask(node);});}});dojo.query(".filteredNode").forEach(function(node,index,arr){dojo.style(node,"border","2px dashed black");dojo.style(node,"height","30px");dojo.style(node,"margin","5px 0px 5px 0px");dojo.style(node,"backgroundColor","#DCDCDC");dojo.style(node,"display","none");node.innerHTML="Name: "+node.getAttribute("data-module-name")+", Rank: "+node.getAttribute("data-module-rank")||"???";});var microPageToggleButton=new dijit.form.ToggleButton({showLabel:true,checked:false,iconClass:"dijitCheckBoxIcon",style:"position:absolute;z-index:2000000;top:5px;left:5px;",onChange:dojo.hitch(this,function(val){this.toggleMicroPageIncludes();}),label:"Show MicroPageIncludes"});var moduleToggleButton=new dijit.form.ToggleButton({showLabel:true,checked:false,iconClass:"dijitCheckBoxIcon",style:"position:absolute;z-index:2000000;top:5px;left:200px;",onChange:dojo.hitch(this,function(val){this.toggleFilteredNodes();}),label:"Show Hidden Modules"});var maskToggleButton=new dijit.form.ToggleButton({showLabel:true,checked:true,iconClass:"dijitCheckBoxIcon",style:"position:absolute;z-index:2000000;top:5px;left:380px;",onChange:dojo.hitch(this,function(val){this.toggleMask();}),label:"Show Module Highlight"});document.body.appendChild(microPageToggleButton.domNode);document.body.appendChild(moduleToggleButton.domNode);document.body.appendChild(maskToggleButton.domNode);}else{var button=new dijit.form.Button({label:"Edit in MST",id:"mstButton",style:"position:absolute;z-index:2000000;top:5px;left:5px;",onClick:function(){document.location.href="/CDSTools/MST/#!"+pID;}});document.body.appendChild(button.domNode);}}},toggleMicroPageIncludes:function(){dojo.query("div[data-module-name=MicroPageInclude]").forEach(function(node,index,arr){dojo.style(node,"border",dojo.style(node,"border")==="2px solid blue"?"0px":"2px solid blue");dojo.style(node,"padding",dojo.style(node,"padding")===2?"0px":"2px");});},toggleFilteredNodes:function(){dojo.query(".filteredNode").forEach(function(node,index,arr){dojo.style(node,"display",dojo.style(node,"display")==="none"?"":"none");});},injectCSS:function(url){var e=document.createElement("link");e.href=url;e.type="text/css";e.rel="stylesheet";e.media="screen";document.getElementsByTagName("head")[0].appendChild(e);},createDrop:function(){this.ele=dojo.create("div",{id:"mask",style:"background-image:url('/static_html_files/mstTool/mask.png');z-index:1000050;position:absolute;"},dojo.body(),"first");var menu=new dijit.Menu({id:"previewMenu",style:"display: none;z-index:1000100"});dojo.connect(menu,"onOpen",menu,function(){this._popupWrapper.style.zIndex="1000100";dojo.style("previewMenu","z-index","1000100");});var menuItem1=new dijit.MenuItem({label:"Edit",id:"previewMaskEdit",maskedElementId:"M565903",onClick:function(){window.parent.dj.util.mst.toolApi.jumpToNode(this.maskedElementId);}});menu.addChild(menuItem1);var menuItem2=new dijit.MenuItem({label:"Copy",onClick:function(){}});var menuItem3=new dijit.MenuItem({label:"Hide/Disable",onClick:function(){}});var button=new dijit.form.DropDownButton({label:"Options",dropDown:menu,id:"optionsButton"});this.ele.appendChild(button.domNode);dojo.create("p",{id:"maskText",style:"color:white;float:right;font-size:1.5em"},this.ele,"last");},placeMask:function(node){if(!this.showMasks){return true;}
var button=dijit.byId("optionsButton");if(!node&&this.ele){if(button){button.closeDropDown();}
dojo.style(this.ele,"display","none");return;}
var targetPos=dojo.position(node,true);if(!this.ele){this.createDrop();dojo.connect(this.ele,"onmouseleave",dojo.hitch(this,function(ev){if(ev.relatedTarget&&(ev.relatedTarget.id.indexOf("Menu")>-1||ev.relatedTarget.id.indexOf("previewMaskEdit")>-1)){return;}else{this.placeMask();}}));}
if(!dojo.hasClass(node,"filteredNode")){dojo.byId("maskText").innerHTML="Name: "+node.getAttribute("data-module-name")+", Rank: "+node.getAttribute("data-module-rank")||"???";}else{dojo.byId("maskText").innerHTML="";}
if(button){button.closeDropDown();}
dijit.byId("previewMaskEdit").maskedElementId="M"+dojo.attr(node,"data-module-id");dojo.style(this.ele,"display","");dojo.style(this.ele,"top",targetPos.y+"px");dojo.style(this.ele,"left",targetPos.x+"px");dojo.style(this.ele,"width",targetPos.w+"px");dojo.style(this.ele,"height",targetPos.h+"px");},toggleMask:function(){this.showMasks=this.showMasks?false:true;}};
