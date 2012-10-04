/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function(A,w){function ma(){if(!c.isReady){try{s.documentElement.doScroll("left")}catch(a){setTimeout(ma,1);return}c.ready()}}function Qa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,j){var i=a.length;if(typeof b==="object"){for(var o in b)X(a,o,b[o],f,e,d);return a}if(d!==w){f=!j&&f&&c.isFunction(d);for(o=0;o<i;o++)e(a[o],b,f?d.call(a[o],o,e(a[o],b)):d,j);return a}return i?
e(a[0],b):w}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function na(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function oa(a){var b,d=[],f=[],e=arguments,j,i,o,k,n,r;i=c.data(this,"events");if(!(a.liveFired===this||!i||!i.live||a.button&&a.type==="click")){a.liveFired=this;var u=i.live.slice(0);for(k=0;k<u.length;k++){i=u[k];i.origType.replace(O,"")===a.type?f.push(i.selector):u.splice(k--,1)}j=c(a.target).closest(f,a.currentTarget);n=0;for(r=
j.length;n<r;n++)for(k=0;k<u.length;k++){i=u[k];if(j[n].selector===i.selector){o=j[n].elem;f=null;if(i.preType==="mouseenter"||i.preType==="mouseleave")f=c(a.relatedTarget).closest(i.selector)[0];if(!f||f!==o)d.push({elem:o,handleObj:i})}}n=0;for(r=d.length;n<r;n++){j=d[n];a.currentTarget=j.elem;a.data=j.handleObj.data;a.handleObj=j.handleObj;if(j.handleObj.origHandler.apply(j.elem,e)===false){b=false;break}}return b}}function pa(a,b){return"live."+(a&&a!=="*"?a+".":"")+b.replace(/\./g,"`").replace(/ /g,
"&")}function qa(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function ra(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var j in f)for(var i in f[j])c.event.add(this,j,f[j][i],f[j][i].data)}}})}function sa(a,b,d){var f,e,j;b=b&&b[0]?b[0].ownerDocument||b[0]:s;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===s&&!ta.test(a[0])&&(c.support.checkClone||!ua.test(a[0]))){e=
true;if(j=c.fragments[a[0]])if(j!==1)f=j}if(!f){f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=j?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ra=A.jQuery,Sa=A.$,s=A.document,T,Ta=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Ua=/^.[^:#\[\.,]*$/,Va=/\S/,
Wa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Xa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,R=Array.prototype.slice,ya=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b){this.context=s;this[0]=s.body;this.selector="body";this.length=1;return this}if(typeof a==="string")if((d=Ta.exec(a))&&
(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Xa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=sa([d[1]],[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}return c.merge(this,a)}else{if(b=s.getElementById(d[2])){if(b.id!==d[2])return T.find(a);this.length=1;this[0]=b}this.context=s;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=s;a=s.getElementsByTagName(a);return c.merge(this,
a)}else return!b||b.jquery?(b||T).find(a):c(b).find(a);else if(c.isFunction(a))return T.ready(a);if(a.selector!==w){this.selector=a.selector;this.context=a.context}return c.makeArray(a,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return R.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){var f=c();c.isArray(a)?ba.apply(f,a):c.merge(f,a);f.prevObject=this;f.context=this.context;if(b===
"find")f.selector=this.selector+(this.selector?" ":"")+d;else if(b)f.selector=this.selector+"."+b+"("+d+")";return f},each:function(a,b){return c.each(this,a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(s,c);else Q&&Q.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(R.apply(this,arguments),"slice",R.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,
function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,j,i,o;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(j in e){i=a[j];o=e[j];if(a!==o)if(f&&o&&(c.isPlainObject(o)||c.isArray(o))){i=i&&(c.isPlainObject(i)||
c.isArray(i))?i:c.isArray(o)?[]:{};a[j]=c.extend(f,i,o)}else if(o!==w)a[j]=o}return a};c.extend({noConflict:function(a){A.$=Sa;if(a)A.jQuery=Ra;return c},isReady:false,ready:function(){if(!c.isReady){if(!s.body)return setTimeout(c.ready,13);c.isReady=true;if(Q){for(var a,b=0;a=Q[b++];)a.call(s,c);Q=null}c.fn.triggerHandler&&c(s).triggerHandler("ready")}},bindReady:function(){if(!xa){xa=true;if(s.readyState==="complete")return c.ready();if(s.addEventListener){s.addEventListener("DOMContentLoaded",
L,false);A.addEventListener("load",c.ready,false)}else if(s.attachEvent){s.attachEvent("onreadystatechange",L);A.attachEvent("onload",c.ready);var a=false;try{a=A.frameElement==null}catch(b){}s.documentElement.doScroll&&a&&ma()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,
"isPrototypeOf"))return false;var b;for(b in a);return b===w||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;a=c.trim(a);if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return A.JSON&&A.JSON.parse?A.JSON.parse(a):(new Function("return "+
a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Va.test(a)){var b=s.getElementsByTagName("head")[0]||s.documentElement,d=s.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(s.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,j=a.length,i=j===w||c.isFunction(a);if(d)if(i)for(f in a){if(b.apply(a[f],
d)===false)break}else for(;e<j;){if(b.apply(a[e++],d)===false)break}else if(i)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=a[0];e<j&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Wa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===
a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==w;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,j=a.length;e<j;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,j=0,i=a.length;j<i;j++){e=b(a[j],j,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=w}else if(b&&
!c.isFunction(b)){d=b;b=w}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});P=c.uaMatch(P);if(P.browser){c.browser[P.browser]=true;c.browser.version=P.version}if(c.browser.webkit)c.browser.safari=
true;if(ya)c.inArray=function(a,b){return ya.call(b,a)};T=c(s);if(s.addEventListener)L=function(){s.removeEventListener("DOMContentLoaded",L,false);c.ready()};else if(s.attachEvent)L=function(){if(s.readyState==="complete"){s.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=s.documentElement,b=s.createElement("script"),d=s.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var e=d.getElementsByTagName("*"),j=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!j)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(j.getAttribute("style")),hrefNormalized:j.getAttribute("href")==="/a",opacity:/^0.55$/.test(j.style.opacity),cssFloat:!!j.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,
parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};b.type="text/javascript";try{b.appendChild(s.createTextNode("window."+f+"=1;"))}catch(i){}a.insertBefore(b,a.firstChild);if(A[f]){c.support.scriptEval=true;delete A[f]}try{delete b.test}catch(o){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function k(){c.support.noCloneEvent=
false;d.detachEvent("onclick",k)});d.cloneNode(true).fireEvent("onclick")}d=s.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=s.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var k=s.createElement("div");k.style.width=k.style.paddingLeft="1px";s.body.appendChild(k);c.boxModel=c.support.boxModel=k.offsetWidth===2;s.body.removeChild(k).style.display="none"});a=function(k){var n=
s.createElement("div");k="on"+k;var r=k in n;if(!r){n.setAttribute(k,"return;");r=typeof n[k]==="function"}return r};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=j=null}})();c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ya=0,za={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,
applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var f=a[G],e=c.cache;if(!f&&typeof b==="string"&&d===w)return null;f||(f=++Ya);if(typeof b==="object"){a[G]=f;e[f]=c.extend(true,{},b)}else if(!e[f]){a[G]=f;e[f]={}}a=e[f];if(d!==w)a[b]=d;return typeof b==="string"?a[b]:a}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{if(c.support.deleteExpando)delete a[c.expando];
else a.removeAttribute&&a.removeAttribute(c.expando);delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===w){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===w&&this.length)f=c.data(this[0],a);return f===w&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,
a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===
w)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Aa=/[\n\t]/g,ca=/\s+/,Za=/\r/g,$a=/href|src|style/,ab=/(button|input)/i,bb=/(button|input|object|select|textarea)/i,
cb=/^(a|area)$/i,Ba=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(n){var r=c(this);r.addClass(a.call(this,n,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className){for(var j=" "+e.className+" ",
i=e.className,o=0,k=b.length;o<k;o++)if(j.indexOf(" "+b[o]+" ")<0)i+=" "+b[o];e.className=c.trim(i)}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(k){var n=c(this);n.removeClass(a.call(this,k,n.attr("class")))});if(a&&typeof a==="string"||a===w)for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var j=(" "+e.className+" ").replace(Aa," "),i=0,o=b.length;i<o;i++)j=j.replace(" "+b[i]+" ",
" ");e.className=c.trim(j)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var j=c(this);j.toggleClass(a.call(this,e,j.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,j=0,i=c(this),o=b,k=a.split(ca);e=k[j++];){o=f?o:!i.hasClass(e);i[o?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=
this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Aa," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===w){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var j=b?d:0;for(d=b?d+1:e.length;j<d;j++){var i=
e[j];if(i.selected){a=c(i).val();if(b)return a;f.push(a)}}return f}if(Ba.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Za,"")}return w}var o=c.isFunction(a);return this.each(function(k){var n=c(this),r=a;if(this.nodeType===1){if(o)r=a.call(this,k,n.val());if(typeof r==="number")r+="";if(c.isArray(r)&&Ba.test(this.type))this.checked=c.inArray(n.val(),r)>=0;else if(c.nodeName(this,"select")){var u=c.makeArray(r);c("option",this).each(function(){this.selected=
c.inArray(c(this).val(),u)>=0});if(!u.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return w;if(f&&b in c.attrFn)return c(a)[b](d);f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==w;b=f&&c.props[b]||b;if(a.nodeType===1){var j=$a.test(b);if(b in a&&f&&!j){if(e){b==="type"&&ab.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");
a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:bb.test(a.nodeName)||cb.test(a.nodeName)&&a.href?0:w;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&j?a.getAttribute(b,2):a.getAttribute(b);return a===null?w:a}return c.style(a,b,d)}});var O=/\.(.*)$/,db=function(a){return a.replace(/[^\w\s\.\|`]/g,
function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==A&&!a.frameElement)a=A;var e,j;if(d.handler){e=d;d=e.handler}if(!d.guid)d.guid=c.guid++;if(j=c.data(a)){var i=j.events=j.events||{},o=j.handle;if(!o)j.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,arguments):w};o.elem=a;b=b.split(" ");for(var k,n=0,r;k=b[n++];){j=e?c.extend({},e):{handler:d,data:f};if(k.indexOf(".")>-1){r=k.split(".");
k=r.shift();j.namespace=r.slice(0).sort().join(".")}else{r=[];j.namespace=""}j.type=k;j.guid=d.guid;var u=i[k],z=c.event.special[k]||{};if(!u){u=i[k]=[];if(!z.setup||z.setup.call(a,f,r,o)===false)if(a.addEventListener)a.addEventListener(k,o,false);else a.attachEvent&&a.attachEvent("on"+k,o)}if(z.add){z.add.call(a,j);if(!j.handler.guid)j.handler.guid=d.guid}u.push(j);c.event.global[k]=true}a=null}}},global:{},remove:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){var e,j=0,i,o,k,n,r,u,z=c.data(a),
C=z&&z.events;if(z&&C){if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(e in C)c.event.remove(a,e+b)}else{for(b=b.split(" ");e=b[j++];){n=e;i=e.indexOf(".")<0;o=[];if(!i){o=e.split(".");e=o.shift();k=new RegExp("(^|\\.)"+c.map(o.slice(0).sort(),db).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(r=C[e])if(d){n=c.event.special[e]||{};for(B=f||0;B<r.length;B++){u=r[B];if(d.guid===u.guid){if(i||k.test(u.namespace)){f==null&&r.splice(B--,1);n.remove&&n.remove.call(a,u)}if(f!=
null)break}}if(r.length===0||f!=null&&r.length===1){if(!n.teardown||n.teardown.call(a,o)===false)Ca(a,e,z.handle);delete C[e]}}else for(var B=0;B<r.length;B++){u=r[B];if(i||k.test(u.namespace)){c.event.remove(a,n,u.handler,B);r.splice(B--,1)}}}if(c.isEmptyObject(C)){if(b=z.handle)b.elem=null;delete z.events;delete z.handle;c.isEmptyObject(z)&&c.removeData(a)}}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=
e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return w;a.result=w;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(j){}if(!a.isPropagationStopped()&&
f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){f=a.target;var i,o=c.nodeName(f,"a")&&e==="click",k=c.event.special[e]||{};if((!k._default||k._default.call(d,a)===false)&&!o&&!(f&&f.nodeName&&c.noData[f.nodeName.toLowerCase()])){try{if(f[e]){if(i=f["on"+e])f["on"+e]=null;c.event.triggered=true;f[e]()}}catch(n){}if(i)f["on"+e]=i;c.event.triggered=false}}},handle:function(a){var b,d,f,e;a=arguments[0]=c.event.fix(a||A.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;
if(!b){d=a.type.split(".");a.type=d.shift();f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}e=c.data(this,"events");d=e[a.type];if(e&&d){d=d.slice(0);e=0;for(var j=d.length;e<j;e++){var i=d[e];if(b||f.test(i.namespace)){a.handler=i.handler;a.data=i.data;a.handleObj=i;i=i.handler.apply(this,arguments);if(i!==w){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||s;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=s.documentElement;d=s.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==w)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,a.origType,c.extend({},a,{handler:oa}))},remove:function(a){var b=true,d=a.origType.replace(O,"");c.each(c.data(this,
"events").live||[],function(){if(d===this.origType.replace(O,""))return b=false});b&&c.event.remove(this,a.origType,oa)}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};var Ca=s.removeEventListener?function(a,b,d){a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=
a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,
isImmediatePropagationStopped:Y};var Da=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ea=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ea:Da,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ea:Da)}}});if(!c.support.submitBubbles)c.event.special.submit=
{setup:function(){if(this.nodeName.toLowerCase()!=="form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length)return na("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13)return na("submit",this,arguments)})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};
if(!c.support.changeBubbles){var da=/textarea|input|select/i,ea,Fa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},fa=function(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Fa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",
e);if(!(f===w||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:fa,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return fa.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return fa.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,
"_change_data",Fa(a))}},setup:function(){if(this.type==="file")return false;for(var a in ea)c.event.add(this,a+".specialChange",ea[a]);return da.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return da.test(this.nodeName)}};ea=c.event.special.change.filters}s.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,f)}c.event.special[b]={setup:function(){this.addEventListener(a,
d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var j in d)this[b](j,f,d[j],e);return this}if(c.isFunction(f)){e=f;f=w}var i=b==="one"?c.proxy(e,function(k){c(this).unbind(k,i);return e.apply(this,arguments)}):e;if(d==="unload"&&b!=="one")this.one(d,f,e);else{j=0;for(var o=this.length;j<o;j++)c.event.add(this[j],d,i,f)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&
!a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var f=this.length;d<f;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,f){return this.live(b,d,f,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},
toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ga={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e,j){var i,o=0,k,n,r=j||this.selector,
u=j?this:c(this.context);if(c.isFunction(f)){e=f;f=w}for(d=(d||"").split(" ");(i=d[o++])!=null;){j=O.exec(i);k="";if(j){k=j[0];i=i.replace(O,"")}if(i==="hover")d.push("mouseenter"+k,"mouseleave"+k);else{n=i;if(i==="focus"||i==="blur"){d.push(Ga[i]+k);i+=k}else i=(Ga[i]||i)+k;b==="live"?u.each(function(){c.event.add(this,pa(i,r),{data:f,selector:r,handler:e,origType:i,origHandler:e,preType:n})}):u.unbind(pa(i,r),e)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});A.attachEvent&&!A.addEventListener&&A.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});(function(){function a(g){for(var h="",l,m=0;g[m];m++){l=g[m];if(l.nodeType===3||l.nodeType===4)h+=l.nodeValue;else if(l.nodeType!==8)h+=a(l.childNodes)}return h}function b(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];
if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=l;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}m[q]=y}}}function d(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=l;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(k.filter(h,[t]).length>0){y=t;break}}t=t[g]}m[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
e=0,j=Object.prototype.toString,i=false,o=true;[0,0].sort(function(){o=false;return 0});var k=function(g,h,l,m){l=l||[];var q=h=h||s;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||typeof g!=="string")return l;for(var p=[],v,t,y,S,H=true,M=x(h),I=g;(f.exec(""),v=f.exec(I))!==null;){I=v[3];p.push(v[1]);if(v[2]){S=v[3];break}}if(p.length>1&&r.exec(g))if(p.length===2&&n.relative[p[0]])t=ga(p[0]+p[1],h);else for(t=n.relative[p[0]]?[h]:k(p.shift(),h);p.length;){g=p.shift();if(n.relative[g])g+=p.shift();
t=ga(g,t)}else{if(!m&&p.length>1&&h.nodeType===9&&!M&&n.match.ID.test(p[0])&&!n.match.ID.test(p[p.length-1])){v=k.find(p.shift(),h,M);h=v.expr?k.filter(v.expr,v.set)[0]:v.set[0]}if(h){v=m?{expr:p.pop(),set:z(m)}:k.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=v.expr?k.filter(v.expr,v.set):v.set;if(p.length>0)y=z(t);else H=false;for(;p.length;){var D=p.pop();v=D;if(n.relative[D])v=p.pop();else D="";if(v==null)v=h;n.relative[D](y,v,M)}}else y=[]}y||(y=t);y||k.error(D||
g);if(j.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))l.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&l.push(t[g]);else l.push.apply(l,y);else z(y,l);if(S){k(S,q,l,m);k.uniqueSort(l)}return l};k.uniqueSort=function(g){if(B){i=o;g.sort(B);if(i)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};k.matches=function(g,h){return k(g,null,null,h)};k.find=function(g,h,l){var m,q;if(!g)return[];
for(var p=0,v=n.order.length;p<v;p++){var t=n.order[p];if(q=n.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");m=n.find[t](q,h,l);if(m!=null){g=g.replace(n.match[t],"");break}}}}m||(m=h.getElementsByTagName("*"));return{set:m,expr:g}};k.filter=function(g,h,l,m){for(var q=g,p=[],v=h,t,y,S=h&&h[0]&&x(h[0]);g&&h.length;){for(var H in n.filter)if((t=n.leftMatch[H].exec(g))!=null&&t[2]){var M=n.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-
1)!=="\\"){if(v===p)p=[];if(n.preFilter[H])if(t=n.preFilter[H](t,v,l,p,m,S)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=v[U])!=null;U++)if(D){I=M(D,t,U,v);var Ha=m^!!I;if(l&&I!=null)if(Ha)y=true;else v[U]=false;else if(Ha){p.push(D);y=true}}if(I!==w){l||(v=p);g=g.replace(n.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)k.error(g);else break;q=g}return v};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},
relative:{"+":function(g,h){var l=typeof h==="string",m=l&&!/\W/.test(h);l=l&&!m;if(m)h=h.toLowerCase();m=0;for(var q=g.length,p;m<q;m++)if(p=g[m]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[m]=l||p&&p.nodeName.toLowerCase()===h?p||false:p===h}l&&k.filter(h,g,true)},">":function(g,h){var l=typeof h==="string";if(l&&!/\W/.test(h)){h=h.toLowerCase();for(var m=0,q=g.length;m<q;m++){var p=g[m];if(p){l=p.parentNode;g[m]=l.nodeName.toLowerCase()===h?l:false}}}else{m=0;for(q=g.length;m<q;m++)if(p=g[m])g[m]=
l?p.parentNode:p.parentNode===h;l&&k.filter(h,g,true)}},"":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("parentNode",h,m,g,p,l)},"~":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,m,g,p,l)}},find:{ID:function(g,h,l){if(typeof h.getElementById!=="undefined"&&!l)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var l=[];
h=h.getElementsByName(g[1]);for(var m=0,q=h.length;m<q;m++)h[m].getAttribute("name")===g[1]&&l.push(h[m]);return l.length===0?null:l}},TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,l,m,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var v;(v=h[p])!=null;p++)if(v)if(q^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))l||m.push(v);else if(l)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},
CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,l,m,q,p){h=g[1].replace(/\\/g,"");if(!p&&n.attrMap[h])g[1]=n.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,l,m,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,h);else{g=k.filter(g[3],h,l,true^q);l||m.push.apply(m,
g);return false}else if(n.match.POS.test(g[0])||n.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,l){return!!k(l[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},
text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},
setFilters:{first:function(g,h){return h===0},last:function(g,h,l,m){return h===m.length-1},even:function(g,h){return h%2===0},odd:function(g,h){return h%2===1},lt:function(g,h,l){return h<l[3]-0},gt:function(g,h,l){return h>l[3]-0},nth:function(g,h,l){return l[3]-0===h},eq:function(g,h,l){return l[3]-0===h}},filter:{PSEUDO:function(g,h,l,m){var q=h[1],p=n.filters[q];if(p)return p(g,l,h,m);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=
h[3];l=0;for(m=h.length;l<m;l++)if(h[l]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+q)},CHILD:function(g,h){var l=h[1],m=g;switch(l){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(l==="first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":l=h[2];var q=h[3];if(l===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var v=0;for(m=p.firstChild;m;m=
m.nextSibling)if(m.nodeType===1)m.nodeIndex=++v;p.sizcache=h}g=g.nodeIndex-q;return l===0?g===0:g%l===0&&g/l>=0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var l=h[1];g=n.attrHandle[l]?n.attrHandle[l](g):g[l]!=null?g[l]:g.getAttribute(l);l=g+"";var m=h[2];h=h[4];return g==null?m==="!=":m===
"="?l===h:m==="*="?l.indexOf(h)>=0:m==="~="?(" "+l+" ").indexOf(h)>=0:!h?l&&g!==false:m==="!="?l!==h:m==="^="?l.indexOf(h)===0:m==="$="?l.substr(l.length-h.length)===h:m==="|="?l===h||l.substr(0,h.length+1)===h+"-":false},POS:function(g,h,l,m){var q=n.setFilters[h[2]];if(q)return q(g,l,h,m)}}},r=n.match.POS;for(var u in n.match){n.match[u]=new RegExp(n.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[u].source.replace(/\\(\d+)/g,function(g,
h){return"\\"+(h-0+1)}))}var z=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};try{Array.prototype.slice.call(s.documentElement.childNodes,0)}catch(C){z=function(g,h){h=h||[];if(j.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var l=0,m=g.length;l<m;l++)h.push(g[l]);else for(l=0;g[l];l++)h.push(g[l]);return h}}var B;if(s.documentElement.compareDocumentPosition)B=function(g,h){if(!g.compareDocumentPosition||
!h.compareDocumentPosition){if(g==h)i=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===h?0:1;if(g===0)i=true;return g};else if("sourceIndex"in s.documentElement)B=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)i=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)i=true;return g};else if(s.createRange)B=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)i=true;return g.ownerDocument?-1:1}var l=g.ownerDocument.createRange(),m=
h.ownerDocument.createRange();l.setStart(g,0);l.setEnd(g,0);m.setStart(h,0);m.setEnd(h,0);g=l.compareBoundaryPoints(Range.START_TO_END,m);if(g===0)i=true;return g};(function(){var g=s.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var l=s.documentElement;l.insertBefore(g,l.firstChild);if(s.getElementById(h)){n.find.ID=function(m,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(m[1]))?q.id===m[1]||typeof q.getAttributeNode!=="undefined"&&
q.getAttributeNode("id").nodeValue===m[1]?[q]:w:[]};n.filter.ID=function(m,q){var p=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&p&&p.nodeValue===q}}l.removeChild(g);l=g=null})();(function(){var g=s.createElement("div");g.appendChild(s.createComment(""));if(g.getElementsByTagName("*").length>0)n.find.TAG=function(h,l){l=l.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var m=0;l[m];m++)l[m].nodeType===1&&h.push(l[m]);l=h}return l};g.innerHTML="<a href='#'></a>";
if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")n.attrHandle.href=function(h){return h.getAttribute("href",2)};g=null})();s.querySelectorAll&&function(){var g=k,h=s.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){k=function(m,q,p,v){q=q||s;if(!v&&q.nodeType===9&&!x(q))try{return z(q.querySelectorAll(m),p)}catch(t){}return g(m,q,p,v)};for(var l in g)k[l]=g[l];h=null}}();
(function(){var g=s.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){n.order.splice(1,0,"CLASS");n.find.CLASS=function(h,l,m){if(typeof l.getElementsByClassName!=="undefined"&&!m)return l.getElementsByClassName(h[1])};g=null}}})();var E=s.compareDocumentPosition?function(g,h){return!!(g.compareDocumentPosition(h)&16)}:
function(g,h){return g!==h&&(g.contains?g.contains(h):true)},x=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},ga=function(g,h){var l=[],m="",q;for(h=h.nodeType?[h]:h;q=n.match.PSEUDO.exec(g);){m+=q[0];g=g.replace(n.match.PSEUDO,"")}g=n.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)k(g,h[q],l);return k.filter(m,l)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=a;c.isXMLDoc=x;c.contains=E})();var eb=/Until$/,fb=/^(?:parents|prevUntil|prevAll)/,
gb=/,/;R=Array.prototype.slice;var Ia=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,j){return!!b.call(e,j,e)===d});else if(b.nodeType)return c.grep(a,function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Ua.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;
c.find(a,this[f],b);if(f>0)for(var j=d;j<b.length;j++)for(var i=0;i<d;i++)if(b[i]===b[j]){b.splice(j--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ia(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ia(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,j=
{},i;if(f&&a.length){e=0;for(var o=a.length;e<o;e++){i=a[e];j[i]||(j[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;f&&f.ownerDocument&&f!==b;){for(i in j){e=j[i];if(e.jquery?e.index(f)>-1:c(f).is(e)){d.push({selector:i,elem:f});delete j[i]}}f=f.parentNode}}return d}var k=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(n,r){for(;r&&r.ownerDocument&&r!==b;){if(k?k.index(r)>-1:c(r).is(a))return r;r=r.parentNode}return null})},index:function(a){if(!a||typeof a===
"string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),a);return this.pushStack(qa(a[0])||qa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",
d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?
a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);eb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):e;if((this.length>1||gb.test(f))&&fb.test(a))e=e.reverse();return this.pushStack(e,a,R.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===w||a.nodeType!==1||!c(a).is(d));){a.nodeType===
1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var Ja=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ka=/(<([\w:]+)[^>]*?)\/>/g,hb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,La=/<([\w:]+)/,ib=/<tbody/i,jb=/<|&#?\w+;/,ta=/<script|<object|<embed|<option|<style/i,ua=/checked\s*(?:[^=]|=\s*.checked.)/i,Ma=function(a,b,d){return hb.test(d)?
a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==w)return this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,f;(f=this[d])!=null;d++)if(!a||c.filter(a,[f]).length){if(!b&&f.nodeType===1){c.cleanData(f.getElementsByTagName("*"));c.cleanData([f])}f.parentNode&&f.parentNode.removeChild(f)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Ja,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){ra(this,b);ra(this.find("*"),b.find("*"))}return b},html:function(a){if(a===w)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Ja,
""):null;else if(typeof a==="string"&&!ta.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(La.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ka,Ma);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var j=c(this),i=j.html();j.empty().append(function(){return a.call(this,e,i)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&
this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,b,f))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(u){return c.nodeName(u,"table")?u.getElementsByTagName("tbody")[0]||
u.appendChild(u.ownerDocument.createElement("tbody")):u}var e,j,i=a[0],o=[],k;if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&ua.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(u){var z=c(this);a[0]=i.call(this,u,b?z.html():w);z.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:sa(a,this,o);k=e.fragment;if(j=k.childNodes.length===
1?(k=k.firstChild):k.firstChild){b=b&&c.nodeName(j,"tr");for(var n=0,r=this.length;n<r;n++)d.call(b?f(this[n],j):this[n],n>0||e.cacheable||this.length>1?k.cloneNode(true):k)}o.length&&c.each(o,Qa)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);var e=this.length===1&&this[0].parentNode;if(e&&e.nodeType===11&&e.childNodes.length===1&&d.length===1){d[b](this[0]);
return this}else{e=0;for(var j=d.length;e<j;e++){var i=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),i);f=f.concat(i)}return this.pushStack(f,a,d.selector)}}});c.extend({clean:function(a,b,d,f){b=b||s;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||s;for(var e=[],j=0,i;(i=a[j])!=null;j++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!jb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(Ka,Ma);var o=(La.exec(i)||["",
""])[1].toLowerCase(),k=F[o]||F._default,n=k[0],r=b.createElement("div");for(r.innerHTML=k[1]+i+k[2];n--;)r=r.lastChild;if(!c.support.tbody){n=ib.test(i);o=o==="table"&&!n?r.firstChild&&r.firstChild.childNodes:k[1]==="<table>"&&!n?r.childNodes:[];for(k=o.length-1;k>=0;--k)c.nodeName(o[k],"tbody")&&!o[k].childNodes.length&&o[k].parentNode.removeChild(o[k])}!c.support.leadingWhitespace&&V.test(i)&&r.insertBefore(b.createTextNode(V.exec(i)[0]),r.firstChild);i=r.childNodes}if(i.nodeType)e.push(i);else e=
c.merge(e,i)}}if(d)for(j=0;e[j];j++)if(f&&c.nodeName(e[j],"script")&&(!e[j].type||e[j].type.toLowerCase()==="text/javascript"))f.push(e[j].parentNode?e[j].parentNode.removeChild(e[j]):e[j]);else{e[j].nodeType===1&&e.splice.apply(e,[j+1,0].concat(c.makeArray(e[j].getElementsByTagName("script"))));d.appendChild(e[j])}return e},cleanData:function(a){for(var b,d,f=c.cache,e=c.event.special,j=c.support.deleteExpando,i=0,o;(o=a[i])!=null;i++)if(d=o[c.expando]){b=f[d];if(b.events)for(var k in b.events)e[k]?
c.event.remove(o,k):Ca(o,k,b.handle);if(j)delete o[c.expando];else o.removeAttribute&&o.removeAttribute(c.expando);delete f[d]}}});var kb=/z-?index|font-?weight|opacity|zoom|line-?height/i,Na=/alpha\([^)]*\)/,Oa=/opacity=([^)]*)/,ha=/float/i,ia=/-([a-z])/ig,lb=/([A-Z])/g,mb=/^-?\d+(?:px)?$/i,nb=/^-?\d/,ob={position:"absolute",visibility:"hidden",display:"block"},pb=["Left","Right"],qb=["Top","Bottom"],rb=s.defaultView&&s.defaultView.getComputedStyle,Pa=c.support.cssFloat?"cssFloat":"styleFloat",ja=
function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===w)return c.curCSS(d,f);if(typeof e==="number"&&!kb.test(f))e+="px";c.style(d,f,e)})};c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return w;if((b==="width"||b==="height")&&parseFloat(d)<0)d=w;var f=a.style||a,e=d!==w;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=
Na.test(a)?a.replace(Na,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Oa.exec(f.filter)[1])/100+"":""}if(ha.test(b))b=Pa;b=b.replace(ia,ja);if(e)f[b]=d;return f[b]},css:function(a,b,d,f){if(b==="width"||b==="height"){var e,j=b==="width"?pb:qb;function i(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(j,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,
"border"+this+"Width",true))||0})}a.offsetWidth!==0?i():c.swap(a,ob,i);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&a.currentStyle){f=Oa.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ha.test(b))b=Pa;if(!d&&e&&e[b])f=e[b];else if(rb){if(ha.test(b))b="float";b=b.replace(lb,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=
a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ia,ja);f=a.currentStyle[b]||a.currentStyle[d];if(!mb.test(f)&&nb.test(f)){b=e.left;var j=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=j}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=
a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var sb=J(),tb=/<script(.|\s)*?\/script>/gi,ub=/select|textarea/i,vb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ka=/\?/,wb=/(\?|&)_=.*?(&|$)/,xb=/^(\w+:)?\/\/([^\/?#]+)/,yb=/%20/g,zb=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!==
"string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}var j=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(i,o){if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"")).find(e):i.responseText);d&&j.each(d,[i.responseText,o,i])}});return this},
serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ub.test(this.nodeName)||vb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,
global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:A.XMLHttpRequest&&(A.location.protocol!=="file:"||!A.ActiveXObject)?function(){return new A.XMLHttpRequest}:function(){try{return new A.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&
e.success.call(k,o,i,x);e.global&&f("ajaxSuccess",[x,e])}function d(){e.complete&&e.complete.call(k,x,i);e.global&&f("ajaxComplete",[x,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),j,i,o,k=a&&a.context||e,n=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(n==="GET")N.test(e.url)||(e.url+=(ka.test(e.url)?
"&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||N.test(e.url))){j=e.jsonpCallback||"jsonp"+sb++;if(e.data)e.data=(e.data+"").replace(N,"="+j+"$1");e.url=e.url.replace(N,"="+j+"$1");e.dataType="script";A[j]=A[j]||function(q){o=q;b();d();A[j]=w;try{delete A[j]}catch(p){}z&&z.removeChild(C)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===
false&&n==="GET"){var r=J(),u=e.url.replace(wb,"$1_="+r+"$2");e.url=u+(u===e.url?(ka.test(e.url)?"&":"?")+"_="+r:"")}if(e.data&&n==="GET")e.url+=(ka.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&c.event.trigger("ajaxStart");r=(r=xb.exec(e.url))&&(r[1]&&r[1]!==location.protocol||r[2]!==location.host);if(e.dataType==="script"&&n==="GET"&&r){var z=s.getElementsByTagName("head")[0]||s.documentElement,C=s.createElement("script");C.src=e.url;if(e.scriptCharset)C.charset=e.scriptCharset;if(!j){var B=
false;C.onload=C.onreadystatechange=function(){if(!B&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){B=true;b();d();C.onload=C.onreadystatechange=null;z&&C.parentNode&&z.removeChild(C)}}}z.insertBefore(C,z.firstChild);return w}var E=false,x=e.xhr();if(x){e.username?x.open(n,e.url,e.async,e.username,e.password):x.open(n,e.url,e.async);try{if(e.data||a&&a.contentType)x.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&x.setRequestHeader("If-Modified-Since",
c.lastModified[e.url]);c.etag[e.url]&&x.setRequestHeader("If-None-Match",c.etag[e.url])}r||x.setRequestHeader("X-Requested-With","XMLHttpRequest");x.setRequestHeader("Accept",e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(ga){}if(e.beforeSend&&e.beforeSend.call(k,x,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");x.abort();return false}e.global&&f("ajaxSend",[x,e]);var g=x.onreadystatechange=function(q){if(!x||x.readyState===0||q==="abort"){E||
d();E=true;if(x)x.onreadystatechange=c.noop}else if(!E&&x&&(x.readyState===4||q==="timeout")){E=true;x.onreadystatechange=c.noop;i=q==="timeout"?"timeout":!c.httpSuccess(x)?"error":e.ifModified&&c.httpNotModified(x,e.url)?"notmodified":"success";var p;if(i==="success")try{o=c.httpData(x,e.dataType,e)}catch(v){i="parsererror";p=v}if(i==="success"||i==="notmodified")j||b();else c.handleError(e,x,i,p);d();q==="timeout"&&x.abort();if(e.async)x=null}};try{var h=x.abort;x.abort=function(){x&&h.call(x);
g("abort")}}catch(l){}e.async&&e.timeout>0&&setTimeout(function(){x&&!E&&g("timeout")},e.timeout);try{x.send(n==="POST"||n==="PUT"||n==="DELETE"?e.data:null)}catch(m){c.handleError(e,x,null,m);d()}e.async||g();return x}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===
1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b===
"json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(i,o){if(c.isArray(o))c.each(o,function(k,n){b||/\[\]$/.test(i)?f(i,n):d(i+"["+(typeof n==="object"||c.isArray(n)?k:"")+"]",n)});else!b&&o!=null&&typeof o==="object"?c.each(o,function(k,n){d(i+"["+k+"]",n)}):f(i,o)}function f(i,o){o=c.isFunction(o)?o():o;e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(o)}var e=[];if(b===w)b=c.ajaxSettings.traditional;
if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var j in a)d(j,a[j]);return e.join("&").replace(yb,"+")}});var la={},Ab=/toggle|show|hide/,Bb=/^([+-]=)?([\d+-.]+)(.*)$/,W,va=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");
this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(la[d])f=la[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();la[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],
"olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},
animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var j=c.extend({},e),i,o=this.nodeType===1&&c(this).is(":hidden"),k=this;for(i in a){var n=i.replace(ia,ja);if(i!==n){a[n]=a[i];delete a[i];i=n}if(a[i]==="hide"&&o||a[i]==="show"&&!o)return j.complete.call(this);if((i==="height"||i==="width")&&this.style){j.display=c.css(this,"display");j.overflow=this.style.overflow}if(c.isArray(a[i])){(j.specialEasing=
j.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(j.overflow!=null)this.style.overflow="hidden";j.curAnim=c.extend({},a);c.each(a,function(r,u){var z=new c.fx(k,j,r);if(Ab.test(u))z[u==="toggle"?o?"show":"hide":u](a);else{var C=Bb.exec(u),B=z.cur(true)||0;if(C){u=parseFloat(C[2]);var E=C[3]||"px";if(E!=="px"){k.style[r]=(u||1)+E;B=(u||1)/z.cur(true)*B;k.style[r]=B+E}if(C[1])u=(C[1]==="-="?-1:1)*u+B;z.custom(B,u,E)}else z.custom(B,u,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);
this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration===
"number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||
c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(j){return e.step(j)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;
this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=
this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,
e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||
c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in s.documentElement?
function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=
this[0];if(a)return this.each(function(r){c.offset.setOffset(this,a,r)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=b,e=b.ownerDocument,j,i=e.documentElement,o=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var k=b.offsetTop,n=b.offsetLeft;(b=b.parentNode)&&b!==o&&b!==i;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;j=e?e.getComputedStyle(b,null):b.currentStyle;
k-=b.scrollTop;n-=b.scrollLeft;if(b===d){k+=b.offsetTop;n+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=j}if(f.position==="relative"||f.position==="static"){k+=o.offsetTop;n+=o.offsetLeft}if(c.offset.supportsFixedPosition&&
f.position==="fixed"){k+=Math.max(i.scrollTop,o.scrollTop);n+=Math.max(i.scrollLeft,o.scrollLeft)}return{top:k,left:n}};c.offset={initialize:function(){var a=s.body,b=s.createElement("div"),d,f,e,j=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
a.insertBefore(b,a.firstChild);d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==j;a.removeChild(b);
c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),j=parseInt(c.curCSS(a,"top",true),10)||0,i=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,
d,e);d={top:b.top-e.top+j,left:b.left-e.left+i};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-
f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||s.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],j;if(!e)return null;if(f!==w)return this.each(function(){if(j=wa(this))j.scrollTo(!a?f:c(j).scrollLeft(),a?f:c(j).scrollTop());else this[d]=f});else return(j=wa(e))?"pageXOffset"in j?j[a?"pageYOffset":
"pageXOffset"]:c.support.boxModel&&j.document.documentElement[d]||j.document.body[d]:e[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(j){var i=c(this);i[d](f.call(this,j,i[d]()))});return"scrollTo"in
e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===w?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});A.jQuery=A.$=c})(window);
/** $Id: MI_AdDrivers.js 2966 2012-07-10 20:45:10Z scowles $ */
/******************************************************************
 * @fileoverview Class for implementing the side scroll ad, used to provide the
 * scroll event bindings that cause the ad to slide in and out of view, and
 * the functionality for the 'close' button in the ad.
 *
 * In order to use this class, simply call the constructor to instantiate the
 * object, passing it the css selector of the outermost container element in the ad
 * markup, like:
 *   var sideScrollAd = new mi.SideScrollAd('#slideadContainer');
 *
 * @minify true
 * @author Ryan Storment
 * @requires jQuery-1.2.6
 *************************************************************************************/

var mi = (!mi) ? {'media_domain':''} : mi;

/** 
 * SideScrollAd @constructor. Accepts a single parameter, a string representing the css selector
 * of the outermost container element within the ad markup--can be any css selector
 * string, just like using jQuery element selection.  Instantiates an object that handles
 * event bindings for scrolling past a certain percentage of the page, and for clicking on
 * the 'close' link in the ad.
 *
 * @param container {string} the css selector of the ad's outermost element
 */
mi.SideScrollAd = function( container ) {
    
    /** css selector of the outermost container element within the ad markup
     * @type String
     */
    this.container = $(container).length ? $(container) : '';
    
    /** percentage of the page at which the ad should be triggered to slide
     *  in/out of view
     * @type Integer
     */
    this.trigger_percentage = 70;
    
    this.show = false;
    
    /* create event bindings if ad markup has been loaded, otherwise fail gracefully */
    if ( this.container !== '' )
    { 
        this.right = this.container.css('right');
        
        /* handle scroll event */
        $(window).bind( 'scroll', {obj: this}, function(event) {
        
            var obj = event.data.obj;
        
            if ( obj.getScrollPosition() > obj.trigger_percentage && obj.show === false )
            {
                obj.container.stop().animate( {'right': '0px'}, 850 );
                obj.visible('true');
            }
            else if ( obj.getScrollPosition() < obj.trigger_percentage )
            {
                obj.container.stop().animate( {'right': obj.right}, 850 );
                obj.visible('false');
            }        
        });
        
        /* handle click on 'close' link */
        $("#closeSlideout a").bind( 'click', {obj: this}, function(event) {
            var obj = event.data.obj;
            obj.container.stop().animate( {'right': obj.right}, 850 );
        });
    }
    else
    {
        console.warn( "Slide ad cannot be instantiated. "+container+" does not exist." );
    }

};


/**
 * gets/sets the 'show' property of the ad, flagging whether the ad has been shown
 *
 * getter/setter
 * @private
 * @param value {Boolean} value to set the 'show' property to.
 */
mi.SideScrollAd.prototype.visible = function( value )
{
    if ( value === undefined )
    {
        return this.show;
    }
    else
    {
        switch (value)
        {
            case 'true':
            case 1:
                this.show = true;
                break;
            case 'false':
            case 0:
                this.show = false;
                break;
            default:
                break;
        }
    }
};

/**
* returns the amount of the page that has been scrolled into view as a percentage of
* the page's total height--this is essentially a measure of what percentage of the
* page is represented by the BOTTOM visible row of pixels in the browser's window.
*
* @private
*/
mi.SideScrollAd.prototype.getScrollPosition = function()
{
     var bottom = $(window).height() + $(window).scrollTop();
     var height = $(document).height();

     return Math.round(100*bottom/height);
};


/**
 * FloorAd @constructor. Accepts a single parameter, a string representing the css selector
 * of the outermost container element within the ad markup--can be any css selector
 * string, just like using jQuery element selection.  Instantiates an object that handles
 * event bindings for clicking on the ad to open and close.
 *
 * @param container {string} the css selector of the ad's outermost element
 * @param repeat {string} repeat time in hours before given floorboard is served expanded
 */

mi.floorAd = function( container, repeat ) {
    mi.App.apply(this, arguments);
    /* get needed information */
    this.container = $(container).length ? $(container) : '';
    this.wrapper = $(container + ' #floorboard-wrapper');
    this.mainImg = $(container + ' img:eq(0)');  //main image
    this.mainWidth = this.mainImg.width();  //main image width
    this.mainHeight = this.mainImg.height();  //main image height
    this.leaveImg = $(container + ' img:eq(1)');  //leave behind image
    this.leaveHeight = this.leaveImg.height();  //leave behind height
    this.closeLink = $(container + ' map[name="floorclosemap"]  area');  //get area link(s?) for close button
    this.openLink = $(container + ' map[name="flooropenmap"] area');  //get area link(s?) for open button
    this.repeat = typeof repeat !== 'undefined' ? repeat : 240;//default to 4 hours (240 minutes) before a given floorboard is expanded
    
    this.setConf('repeat',this.repeat);//repeat time in minutes before given floorboard is expanded
    this.setConf('container',container);
    this.timeStamp = Math.round(new Date().getTime()/60000);//epoch minutes
    this.cookieName = 'mi_floorboard';
    this.expand = true;
    
    this.cookie = new mi.Cookie(document, this.cookieName);
    this.cookie.load();
    
    if (this.container !== '')
    {
        this.container.css({'position' : 'fixed',
                            'text-align' : 'left',
                            'bottom' : '0',
                            'right' : '0',
                            'left' : '0'});
        // work around a bug in iPad/iPhone viewport
        if(navigator.platform == 'iPad' || 
           navigator.platform == 'iPhone' || 
           navigator.platform == 'iPod' || 
           navigator.platform == 'Linux armv7l') 
        {
            this.container.css("position", "static");
        }
        // end workaround

        this.wrapper.css({'width' : this.mainWidth + 'px',
                          'text-align' : 'left',
                          'margin' : '0 auto'});

        if (this.mainImg !== '')
        {
            this.flightID = this.mainImg[0].getAttribute('data-flightid');
            if(this.flightID == null){
                this.leaveImg[0].getAttribute('data-flightid');
            }
            this.flightID = this.flightID != null ? this.flightID : '';
            
            var minutesAgo = this.lastShown();
            if(minutesAgo >= 0 && minutesAgo <= this.repeat){
                this.expand = false;
            }
            
            this.setCookie();
            
            this.mainImg.css({'position' : 'absolute', 
                              'border' : '0', 
                              'bottom' : (-1 * this.mainHeight), 
                              'z-index' : '2147483647'});            
            
            
            if (this.leaveImg !== '' && this.closeLink !== '')
            {
                this.leaveImg.css({'visibility' : 'hidden', 
                                   'border' : '0', 
                                   'position' : 'absolute', 
                                   'bottom' : (-1 * this.leaveHeight), 
                                   'z-index' : '2147483647'});
                
                this.closeAd = function(){
                    $(container + ' img:eq(1)').css({'visibility' : 'visible',
                                                     'bottom' : (-1 * $(container + ' img:eq(0)').height())});
                    $(container + ' img:eq(0)').animate({'bottom' : (-1 * $(container + ' img:eq(0)').height())});
                    $('body').animate({'margin-bottom' : $(container + ' img:eq(1)').height()});
                    $(container + ' img:eq(1)').animate({'bottom' : '0'});
                };               
                this.closeLink.click(this.closeAd);

                // set up open button if it exists
                if (this.openLink != '') 
                {
                    this.openLink.click(function() {
                        $(container + ' img:eq(1)').animate({'bottom' : (-1 * $(container + ' img:eq(1)').height())});
                        $(container + ' img:eq(0)').animate({'bottom' : '0'});
                        $('body').animate({'margin-bottom' : $(container + ' img:eq(0)').height()});
                    });
                }
            }

            // animate main image into view first thing
            var passAd2ready = this;
            $(document).ready(function() {
                if(passAd2ready.expand){
                    $(container + ' img:eq(1)').css({'bottom' : (-1 * $(container + ' img:eq(1)').height())});
                    $(container + ' img:eq(0)').animate({'bottom' : '0'});
                    $('body').css({'margin-bottom' : $(container + ' img:eq(0)').height()});
                }
                else{
                    passAd2ready.closeAd();
                }
            });
        }
        else
        {
            console.warn("No floor ad images to display");
        }
    }
    else
    {
        console.warn("Floor ad cannot be instantiated. "+container+" does not exist.");
    }
};

/**
 * FloorAd @setCookie. Stores info on when each ad campaign was last seen.
 */
mi.floorAd.prototype.setCookie = function()
{
    var cookieData = new Array();
    var flightKey = 'fbid' + this.flightID;
    if(this.cookie){//if there was an existing cookie, read and get rid of expired timestamps
        for(var prop in this.cookie) {
            //if(prop.indexOf('fbid') != -1 && prop != flightKey){
            if(prop.indexOf('fbid') != -1){
                var id_time = parseInt(this.cookie[prop]);
                if((this.timeStamp - id_time) <= this.repeat){//if we saw this ad within the repeat period, retain it in cookie, else throw it out
                    cookieData[prop] = this.cookie[prop];
                }
            }
        }
    }
    this.cookie.remove();
    this.cookie = new mi.Cookie(document, this.cookieName, this.getConf('repeat'), '/');//new mi.Cookie(document, name, minutes, path, domain, secure);
    this.cookie[flightKey] = this.timeStamp;
    for(var prop in cookieData) {
        this.cookie[prop] = cookieData[prop];
    }
    this.cookie.store();
};

/**
 * FloorAd @lastShown. Given the flight id of an ad, returns minutes ago add was last shown, or false if we haven't seen it
 * @param flightID {string} unique identifier for this ad, embedded in the ad
 */
mi.floorAd.prototype.lastShown = function(flightID)
{
    flightKey = 'fbid' + this.flightID;
    if(this.cookie){
        if(this.cookie[flightKey]){
            var id_time = parseInt(this.cookie[flightKey]);
            return (this.timeStamp - id_time);
        }
        else{return -1;} //we haven't seen this ad since the cookie was created
    }
    return -1;//no cookie
}

// IMPORTANT: executes when complete page is fully loaded, including all frames, objects and images
// meaning, we can't bind click for the ad until after the window.load
$(window).load(function() {
    $('div[name=adx_al]').bind('click', function() {
        /* keep this scoped inside of he click */
        var $curMarg = $('body').css('margin-bottom').replace("px", "");
        $curMarg = ($curMarg == 30) ? 110 : 30;
        $('body').css('margin-bottom', $curMarg + 'px');
    });
    
    //fix for extra spacing and images displaying in untargeted ad slots
    //FIXME: this should be moved out of document.ready to bottom of page when we add a js file to the bottom
    $('.advertisement img').each(function(index) {
        if(this.height==1 && this.width==1){
            $(this).css("display", "none");
         }
    });
});

// $Id: MI.js 1603 2011-03-24 20:29:00Z bjones $
/** MI.js **********************************************************************
 * @fileoverview Inclusion of this library creates an MI object within a
 * variable named <tt>mi</tt>. The MI object is intended to namespace
 * functionality developed by McClatchy Interactive. Because the MI object is
 * self-instantiating there is no constructor per se, and there should be no
 * reason to try to create any additional copies/instances, it is a generic
 * object.
 *
 * <p><strong>window.console</strong><br>In addition to automatically creating
 * the <tt>mi</tt> variable this library also will create a
 * <tt>window.console</tt> object in browsers that don't already have one. The
 * window.console object is then provided with Firebug-like methods if they do
 * not already exist. At the very least this allows you to use
 * <tt>console.log()</tt> in your code without the fear of throwing errors in
 * browsers that don't support it. <em>Note:</em> Safari natively supports
 * console.log, but not (m)any of the other Firebug console methods. With Safari
 * and Firefox/Firebug output from console methods can be viewed in the
 * browser's console window. In browsers without a console window the console's
 * log can be accessed via an alert window at page load if the page is loaded
 * with the query string <em>?viewlog=1</em>. Currently all supported Firebug
 * methods are basically aliases for the log, though the log will report what
 * method was used. Future updates may provide additional features with these
 * methods to make them more Firebug-like.</p>
 *
 * <p><strong>Extending the MI object</strong><br>
 * The MI object is an evolving piece of code and extending its functionality is
 * encouraged. However, we do ask that you follow these guidelines.</p>
 * <ul>
 * 	<li><strong>Document your code -</strong> This was specifically chosen as 
 * 		the first item. The more the better. With the aggregator's ability to strip 
 * 		comments don't be shy about putting too much documentation into your code. 
 * 		For the win, write your documentation in the format used by JSDoc so that 
 * 		your documentation can be parsed. See this file as an example. Inclusion of 
 * 		the <tt>&#64;minify true</tt> flag will allow your code to be minified, thus 
 * 		stripping whitespace and comments from code used on live sites.</li>
 * 	<li><strong>More, smaller files -</strong> Your code should be included on
 * 		pages via aggregation, so there's no need to write huge library files that
 * 		contain the kitchen sink. Organize your code into files of related 
 * 		functionality.</li>
 * 	<li><strong>Consolidate features into apps -</strong> The MI object provides
 * 		the <tt>mi.App</tt> class that facilitates easy creation of applications
 * 		for specific features.</li>
 * 	<li><strong>Stick to naming conventions -</strong>
 * 		<ul>
 * 			<li>CamelCase constructors with an initial cap</li>
 * 			<li>Start private method and variable names with an underscore</li>
 * 			<li>File names should imply scope, separated by underscores. For example
 * 			<tt>MI_Search.js</tt>.</li>
 * 		</ul>
 * 	</li>
 * 	<li><strong>Overwrite similar functionality -</strong> There's no need to 
 * 		have multiple apps or methods that do similar tasks. Instead overwrite the
 * 		existing feature with your new version. Even better, make your new version
 * 		accept input and produce output the same as the old version, but with 
 * 		additional options to facilitate your new behavior. This will preserve 
 * 		backward compatability.</li>
 * 	<li><strong>Contain dependencies -</strong> Don't rely on, or trust in 
 * 		global variables. Either pass values in during execution, or make them
 * 		configurable options.</li>
 * 	<li><strong>Generalize -</strong> Any code within the MI object should be 
 * 		considered general in that it could be utilized on any site. No 
 * 		site-specific code. Any site-specific values should be configuration 
 * 		options.</li>
 * 	<li><strong>Exit gracefully -</strong> With the console now available on all
 * 		browsers there's little or no need to use <tt>alert()</tt> and fear users
 * 		getting messages meant for developers. Test for dependencies and exit if
 * 		they don't meet your requirements after outputting a message to the 
 * 		console.</li>
 * </ul>
 * 
 * @minify true
 * @author Joe Whetzel (jwhetzel [at] mcclatchyinteractive.com)
 * @namespace mi
 * @aggpath js/MI.js
 */

var mi = (typeof mi == 'undefined') ? {'media_domain':''} : mi;
if (window.miAppControler) {
	mi.control = new miAppControler();
}



/** This method parses name=value argument pairs from
 * the query string of the URL. It stores the name=value pairs in 
 * properties of an object and returns that object.
 * @author Adapted from "Javascript: The Definitive Guide" by David Flanagan
 */
mi.getArgs = function() {
        if (typeof mi.args == 'undefined') {
	        mi.args = {};
	        var query = location.search.substring(1);
	        var pairs = query.split('&');
	        for(var i=pairs.length -1; i >= 0; i--) {
		        var pos = pairs[i].indexOf('=');
		        if (pos == -1) {continue;}
		        mi.args[pairs[i].substring(0,pos)] = unescape(pairs[i].substring(pos+1));
	        }
        }
        return mi.args;
};


/** A stand-in for console.log() for browsers without the functionality
 * The logged message is stored for later retreival. This function gets set as
 * console.log by mi.fixConsole if needed. Each logged message is separated by 
 * a line of hyphens.
 * @private
 */
mi._console = function(s) {
	mi._console.log = (mi._console.log && mi._console.log.length > 0) ? mi._console.log + '\n---------------------------------------------------\n' + s : s;
};



/** Use console methods even in browsers without a console.
 * Defines a console object in browsers that lack one and then populates the
 * console with any missing methods from a list based on those used by Firebug.
 * Any methods created in this manner act effectively as a self-identifying
 * alias for console.log.
 *
 * <p>This method is automatically executed as the code is loaded. With this
 * in place developers can make use of console methods without worrying about
 * causing errors on browsers with no console. This makes troubleshooting during
 * development easier, as well as allowing standing error reporting features to
 * be utilized even on live pages.</p>
 *
 * This method is based on Pluck's NYX object method of the same name.
 */
mi.fixConsole = function() {
	if (typeof window.console != "object") { window.console = {}; }
	if (window.console.is_fixed) {/*already fixed*/}
	else {
		// list of firebug method names, "log" should always be first
		// this list is used to create "stand-in" methods for the console object if needed
		var firebugMethods = ["log","debug","info","warn","error","assert","dir","dirxml",
			"trace","group","groupEnd","time","timeEnd","profile","profileEnd","count"];
		var methodCount = firebugMethods.length;
		var args = mi.getArgs();
		var view = (args.viewlog && args.viewlog == '1');
		for (var i = 0; i < methodCount; i++) {
			var methodName = firebugMethods[i];
			if (typeof window.console[methodName] != "function") {
				switch (methodName) {
					// Firebug console methods can be replicated here by adding cases
					case 'log':
						if (view) {
							window.console.log = mi._console;
							if (window.addEventListener) {
								window.addEventListener("load", function(){alert(mi._console.log);}, false);
							} else if (window.attachEvent) {
								window.attachEvent("onload", function(){alert(mi._console.log);});
							}
						} else {
							window.console.log = function(){};
						}
						break;
					default:
						eval("window.console[methodName] = function(s){window.console.log('"+methodName.toUpperCase() + ": '+ s)};");
				}
			}
		}
	}
	//add our tracking flag
	window.console.is_fixed = true;
};
mi.fixConsole();

/** handy method/constructor for cloning objects
 * by default, setting a variable equal to a pre-existing object just creates
 * a reference to the original, this allows you to create an independant copy
 * of the original with no back-reference
 * @param {Object} sourceObj The object to be cloned.
 * @return A copy of the source object, <b>not</b> a reference to the original
 * @type Object
 */
mi.cloneObject = function(sourceObj) {
	if (sourceObj == null || typeof sourceObj != 'object') {
		return sourceObj;
	}
	var temp = new sourceObj.constructor();
	for (var key in sourceObj) {
			temp[key] = mi.cloneObject(sourceObj[key]);
	}
	return temp;
};


/** A constructor for applications that come pre-loaded with useful features.
 *
 * <p>Application objects come with features that facilitate the management of
 * configuration values with a system of methods used to make setting and 
 * accessing configuration values easily while protecting those settings from 
 * accidental or malevolent corruption.</p>
 * <h2>Creating your App</h2>
 * <p>In order to properly inherit all of the private properties that keep your 
 * configuration settings safe you need to use a somewhat non-traditional manner 
 * to instantiate your App. Instead of creating an instance of mi.App you 
 * instead create a constuctor for your App and inherit from the mi.App "class",
 * making your constructor a sub-class of mi.App.</p>
 * <h4>Usage Example:</h4>
 * <pre>mi.YourApp &#61; function() {
  mi.App.apply(this, arguments);
}</pre>
 * <h2>Enforcing config values</h2>
 * <p>With the only way to set configuration values being via the 
 * {@link #setConf} method you have the ability to define rules around what 
 * kinds of values are acceptable per configurable option. This is accomplished 
 * by defining a method named <tt>_manageConf</tt> specifically to
 * apply your rules. It is up to you to develop the enforcement of your rules. 
 * Here's an example:</p>
 * <h4>Usage Example:</h4>
 * <pre>mi.YourApp &#61; function() {
  mi.App.apply(this, arguments);
  this._manageConf = function(prop, val) {  
    switch (prop) {
      case 'gender':          // each case is based on the name of the configurable option
        if (
          val != 'male' ||
          val != 'female' ||
          val != 'unknown'
        ) {
          val = 'unknown';
        }
      break;
    }
    return val;
  };
}</pre>
 * <p>This example only enforces the setting of the <i>gender</i> configuration,
 * with three possible values. If an unacceptable value is passed the config 
 * gets set to an acceptable default value. Set up a case for each configuration
 * that needs enforcement. In any case, your method needs to accept two variables,
 * the name of the config and the value, and must return the value to be used.</p>
 * @constructor
 */
mi.App = function() {
	var _configs = {};
	/**
	 * Stand in method to be used for managing configuration values. By default
	 * this method does not do anything. Individual apps have the option to overwrite
	 * this method with their own functionality.
	 * @private
	 */
	this._manageConf = function(prop, val) { return val; };
	/**
	 * Set configuration values in the app.
	 * <p>Configurations may be loaded in one of two ways:</p>
	 * <ol><li>Individually: Pass two arguments, the first being the name of the
	 * configuration value and the second being the value, or</li>
	 * <li>Batch: Pass an object with attributes named after the config name and
	 * their values being the desired config setting.</li></ol>
	 * <p>Actually, you can also use these two means of configuring your app when
	 * you instantiate it by passing arguments to the constructor.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.yourApp1 &#61; new mi.YourApp('gender','male');
mi.yourApp2 &#61; new mi.YourApp({'gender':'unknown','name':'Pat'});</pre>
	 * <p>If you have multiple configurations to set at one time, passing an object
	 * is probably the most efficient means of getting them set.</p>
	 * @param {Object} confs A generic object containing one or more attributes
	 * that will be used to create the configuration(s), or
	 * @param {String} name The name of the configuration value to be set, this
	 * should be a string value, and
	 * @param value The value to be used.
	 */
	this.setConf = function() {
		switch (arguments.length) {
			case 1:
				for (var prop in arguments[0]) {
					_configs[prop] = this._manageConf(prop, arguments[0][prop]);
				}
				break;
			case 2:
				_configs[arguments[0]] = this._manageConf(arguments[0],arguments[1]);
				break;
			default:
				console.warn('mi.App.setConf was passed an incorrect number of arguments, the method should be used with either a name-value pair or an object containing configuration settings.');
		}
	};
	/**
	 * Retreive a configuration value from the app.
	 *
	 * <p>Any configuration value can be retrieved using this method. Simply pass
	 * the name of the config setting as the one argument. The value of the 
	 * setting is returned.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.example.setConf('name','Fred');
name &#61; mi.example.getConf('name');	//name is now equal to "Fred"</pre>
	 * @param {String} prop The configuration setting name you want returned; a string.
	 * @return The value associated with the named setting.
	 */
	this.getConf = function(prop) {
		return _configs[prop];
	};
	/**
	 * Outputs all configuration settings to the console.
	 *
	 * A convenience method for troubleshooting. Calling this method will output
	 * the name and value of each configuration setting in the app.
	 */
	this.viewConfs = function() {
		console.dir(_configs);
	};
	/**
	 * Object used for storing temporary values.
	 *
	 * <p>Rather than littering your app with variables used by the app's methods
	 * this object is provided as a bucket for storing those values. There are no
	 * controls around what can be set in this object. Basically it's an 
	 * unprotected bucket, so values shouldn't necessarily be trusted, test them
	 * before relying on them.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.exampleApp.cache.foo = "bar";</pre>
	 */
	this.cache = {};
	/* pass any arguments on to setConf() to configure the app as it's instantiated
	 */
	switch (arguments.length) {
		case 1:
			this.setConf(arguments[0]);
			break;
		case 2:
			this.setConf(arguments[0], arguments[1]);
			break;
	}
};


/** A Method for discovering the object/node that kicked off the current event.
 *
 * <p>This can be a very handy method to make determining what element kicked
 * off an even a snap. It can also be frustrating without proper documentation.
 * Basically, when called correctly this will return the source element of the
 * current event.</p>
 * <b>Usage Example:</b><br>
 * <pre>jQuery(window).click(function(e){
	console.log(mi.getEventSrc(e));
});</pre>
 * <p>In this case the object that was clicked on will be output to the console.
 * Due to event bubbling it is the object clicked, not the object with the
 * listener that is reported. That's what makes this so useful. So if in this
 * example you clicked on a paragraph object it would be that paragraph that
 * would be returned not the window object.</p>
 * <p><i>Note:</i> it is key that an argument representing the event object is 
 * passed to the handler for browsers that do not support IE's <tt>window.event</tt>
 * object.</p>
 */
mi.getEventSrc = function (e) {
	if (!e) {e = window.event;}
	if (e.target) {
		return e.target;
	} else if (e.srcElement) {
		return e.srcElement;
	}
};


/**
 * Pattern used by {@link #templateParser} to find variables.
 * @type RegEx
 */
mi.templateVarPattern = /\@([^\@]+)\@/g;
/** method for parsing a template and replacing a pattern with the equivalent
 * attributes from an object
 *
 * <pre>var data object to get values from
 *var template string containing placeholders</pre>
 *
 * <p>Placeholders in the template should be given the name of the attribute to be 
 * used as the substitute surrounded by "@" symbols, i.e. @name@</p>
 *
 * <p>The pattern is defined outside of the method to avoid instantiating the 
 * pattern every time the method is used.</p>
 *
 * @param {Object} data Attributes should be the name of the variable to be searched for
 * and value is what will be put into the template.
 * @param {String} template The template string used to format the output.
 * @return The template with each variable replaced with the corresponding value from
 * the <i>data</i> argument.
 * @type String
 */
mi.templateParser = function(data, template) {
	return template.replace(mi.templateVarPattern, function() {
			return data[arguments[1]];
		}
	)
};


/** method for parsing name/value data into name/value pairs
 *
 * @param {Object} sourceData Each attribute will be made into part of the resulting string.
 * @param {String} firstDelimiter Delimiter to be used between attributes.
 * @param {String} secondDelimiter Delimiter to be used between the name and the value.
 * @author Jamie Kirk
 * @type String
 */
mi.makeHash = function (sourceData, firstDelimiter, secondDelimiter) {
	if (sourceData && firstDelimiter && secondDelimiter) {
        	var hash = {};
        	var pairs = sourceData.split(firstDelimiter);
        	var pos; 
        	for(var i=pairs.length -1; i >= 0; i--) {
			if (typeof(pairs[i + 1]) != 'undefined') {
                		pos = pairs[i].indexOf(secondDelimiter);
                		if (pos == -1) {continue;}
                		hash[pairs[i].substring(0,pos)] = pairs[i].substring(pos+1);
                	}
        	}
        	return hash;
	}
        else {
		console.log('sourceData, firstDelimiter, & secondDelimiter must be defined. There are no default values.');
	}
};

/**
 * Checks for a pageInfo object in the global namespace and loads any data, that
 * doesn't already exist, into the mi.pageInfo object.
 * <p>Any objects will be cloned, not referenced, and pre-existing values will 
 * not be overwritten.</p>
 * <p> This method only officially supports one nested object, 
 * i.e. pageInfo.asset.id. A second-level nested object may be created,
 * i.e., pageInfo.asset.foo.bar; however, pageInfo.asset.foo cannot then
 * accept additional attributes, nor can pageInfo.asset.foo.bar be overwritten.</p>
 * <p>The global object is nullified after loading is complete to encourage
 * accessing data in the mi object.</p>
 */
mi.loadPageInfo = function() {
	if (window.pageInfo) {
		var pi = window.pageInfo;
		if (this.pageInfo == undefined) {
			this.pageInfo = this.cloneObject(pi);
		} else {
			for (var key in pi) {
				if (key === 'version' && ( parseFloat(pi[key]) > parseFloat(this.pageInfo.version) ) ) {
					this.pageInfo.version = pi[key];
				} else if (this.pageInfo[key] == undefined) {
					this.pageInfo[key] = this.cloneObject(pi[key]);
				} else if (typeof this.pageInfo[key] == 'object') {
					for (var key2 in pi[key]) {
						this.pageInfo[key][key2] = (this.pageInfo[key][key2]) ? this.pageInfo[key][key2] : this.cloneObject(pi[key][key2]);
					}
				}
			}
		}
	}
	window.pageInfo = null;
}

/** method for ensuring that js executes only after the document is ready
 *
 * @param {Integer} time How long (in seconds) to wait for the document to render
 * @param {String} target A JQuery-type selector
 * @param {Object} callback The function to execute when the document is ready
 * @author Scot Billman
 */
mi.wait_for_ready = function( time, target, callback ){
   var checker, time_spent = 0, interval = 3000;

   _check_document = function(){
      if( null !== $(target) ){
         clearInterval( checker );
         callback();
      } else {
         time_spent += interval/1000;
         if( time_spent >= time ){
            clearInterval( checker );
         }
      }
   };

   $(document).ready( function() {
      checker = setInterval( _check_document, interval );
   });
};

/** MI.js ^ ***************************************************************** */

/** MI_Search.js ***************************************************************
 * @fileOverview
 * App used to provide function behind search options within the standard search
 * widget.
 *
 * @minify true
 * @author Jamison Kirk (jkirk [at] mcclatchyinteractive.com)
 */


mi.Search = function() {
        mi.App.apply(this, arguments);   // makes this a sub-class of the mi.App class
        mi.getArgs();
        this.kill;
};

//  called from form onsubmit
//  uses option/radio setting to determine which URL to build and then calls the appropriate method
mi.Search.prototype.submitForm = function(searchType) {
        this.kill = "false";

        switch (this.getConf("searchSelectorType")) {
                case "option" :
                        searchType = document.miSearchForm.aff.value;
                break;
                case "radio" :
                        searchType = $('input:radio[name=aff]:checked').val();
                break;
        }

        /* Test to see what the name (q or keywords) of the search
         * query input field and use that to set searchText. 
         */
        var queryInputField;
        if (document.miSearchForm.keywords) {
                queryInputField = document.miSearchForm.keywords;
        }
        else {
                queryInputField = document.miSearchForm.q;
        }

        /*  Not all sites will contain the HTML5 'placeholder' input attribute
         *  Also, browswers that are not yet HTML5 capable don't handle the 'placeholder'
         *  value well so we must check when the user fails to enter a search term.
         */ 
        var searchText = "";
        if ($(queryInputField).attr("placeholder")) {
                if (!(queryInputField.value == $(queryInputField).attr("placeholder"))) {
                        searchText = queryInputField.value;
                }
        }
        else {
                searchText = queryInputField.value;
        }     

        
        if (searchType == parseInt(searchType)){
                return;
        }
        
        else {
                this.searchParamConfig(searchType, searchText);  //build configuration object
                this.buildForm(searchType);                              //create the form input elemnets
        }
        // if no config case present in affiliates configuration file,
        if (this.kill == "false") {
                document.miSearchForm.submit();
        }
        else {
                return false;
        }
};


//  removes current hidden input elements and adds new ones based on configuration "query_fields"
mi.Search.prototype.buildForm = function(search_type) {
        var self = this;

        // if the #searchInputContainer div contains data via innerHTML then proceed into JQuery.
        // That simple test decreases obtrusive overhead of jquery processes when unnecesary which
        // happens to be most of the time. But when the condition is met removing any unneeded input
        // elements is essential to reliable search execution.
        // The following .remove() removes hidden input elements from the page. Although the
        // #searchInputContainer div is placed only around the hidden input elements, thus only those
        // being affected by the .remove, the jquery also limits based on type="hidden" in case the
        // container div encompases other type input elements
        var searchInputContainer_div = document.getElementById("searchInputContainer").innerHTML;
        if (searchInputContainer_div) {
                $("#searchInputContainer > input[type='hidden']").each(function(){
                        $(this).remove(); //  remove input
                });
        }

        //assign site config value "post" or "get" to method attribute of form
        $("#search_widget_form").attr('method', self.getConf("form_method"));

//        if (self.getConf("form_method")) {
//                $("#search_widget_form").attr('method', self.getConf("form_method"));
//        }

        // creates input elements using getConf method from siteConfig file
        // In any case that the buildform method is executed the following jquery must be executed as
        // there are input elements to be appended. In the case that the config hasn't been properly
        // set up with params and values the error thrown will be caught.
        try{
                jQuery.each(self.getConf("query_fields"), function(paramName, paramValue) {
                        paramName = paramName.replace(/(.*)_mihyphen_(.*)/, "$1-$2");

                        $("<input type='hidden' name='" + paramName + "' value='" + paramValue + "' />").appendTo("#searchInputContainer");
                });
        }
        catch (e) {
                console.error("Script Caught Error - " + e);
        }

        document.miSearchForm.action = self.getConf("form_action");  //set action using getConf method from siteConfig file
};


// if the search results site honors the search query string we submit, this sets the option
// or radio button to the kind just searched on the search results page.
mi.Search.prototype.checkOption = function() {
        var self = this;

        if (typeof mi.args.collection != "undefined") {
                switch (self.getConf("searchSelectorType")) {
                        case "option" :
                                if (mi.args.collection == "WEB"){
                                        $("select#search_select option[value='web_search']").attr("selected", 1);
                                } else if (mi.args.collection == "ARCHIVES") {
                                        $("select#search_select option[value='archives']").attr("selected", 1);
                                } else {
                                        $("select#search_select option[value='h_archives']").attr("selected", 1);
                                }
                        break;
                        case "radio" :
                                if (mi.args.collection == "WEB"){
                                        $("#search_web").attr("checked", 1);
                                } else if (mi.args.collection == "ARCHIVES") {
                                        $("#search_archives").attr("checked", 1);
                                } else {
                                        $("#search_history").attr("checked", 1);
                                }
                        break;
                }
        }



};

// drives dropdown functionality for sites not using radio buttons nor selects
mi.Search.prototype.dropDownSelection = function(target) {

                mi.search.cache.mi_search_type = target.children('a').attr("id");

                if ( target.children('a').is('#site_search') ) {

                        var this_image = target.find("img").attr("src");
                        mi.search.getConf("mi_search_widget_icon").attr("src", this_image);
                }
                else if ( target.children('a').is('#web_search') ) {

                        var this_image = target.find("img").attr("src");
                        mi.search.getConf("mi_search_widget_icon").attr("src", this_image);
                }
                else if ( target.children('a').is('#archives') ) {

                        var this_image = target.find("img").attr("src");
                        mi.search.getConf("mi_search_widget_icon").attr("src", this_image);
                }
                $("#search_keywords").focus();
                return false;

}


// called from each sites configuration file default case in the event that a
// radio/option type has not been configured
mi.Search.prototype.configErrorReporter = function() {

        this.kill = "true";
        alert("Option doesn't exist in your configuration. Please review your browsers error console.");
        console.error("Option doesn't exist in your configuration. Please submit a ticket to MI Support for assistance.");
        return false;
}

mi.Search.prototype.setUp = function() {
                mi.search.searchParamConfig();
                if ( !mi.search.getConf("noWebSearch") ) {
                    mi.search.getConf("mi_search_drop_down_web_search_item").show();
                    mi.search.getConf("yahoo_credit").css("visibility","visible");
                }
                mi.search.getConf("mi_search_dropdown_keys").hover(function(){mi.search.getConf("mi_search_drop_down").show();},function(){mi.search.getConf("mi_search_drop_down").hide();});
                mi.search.getConf("mi_search_drop_down_link").bind("click",function(e){mi.search.getConf("mi_search_drop_down").hide();});
                mi.search.getConf("mi_search_dropdown_input").focus(function(){mi.search.getConf("mi_search_drop_down").hide();});
                mi.search.getConf("mi_search_selected").click(function(){mi.search.dropDownSelection($(this));return false;});
                mi.search.checkOption();
                mi.search.cache.mi_search_type=mi.search.getConf("defaultSearchType");
                var mi_search_form=document.miSearchForm;
                mi_search_form.onsubmit=function(){
                    return mi.search.submitForm(mi.search.cache.mi_search_type);
                }
}
/** MI_Search.js ^ ***************************************************************** */

// *****************************************************************************
// Function:	fetchKeywordUrlMap( 'myTargetSelector' )
// Arguments:	myKeywordUrlMap:  A string of URL to keyword mappings
//		myTargetSelector: JQuery style selector to inject keyword
//		mapping into.
// Purpose:	Based on keywords extrapolated from the current URL will compare
//		these keywords to a user generated mapping of URLs to Keywords
//		and if matched will output the URL link passed.
// Return:	NA
// *****************************************************************************
mi.Search.prototype.fetchKeywordUrlMap = function( myKeywordUrlMap, myTargetSelector ){

    // If 'myKeywordUrlMap' has a trailing '++' then we need to strip this, the
    //   '++' is replaced by Template Toolkit for every line break, and having
    //   a trailing '++' means the page element had a trailing line break with
    //   no data after it
    if( myKeywordUrlMap.match( /\++$/ ) )
	myKeywordUrlMap = myKeywordUrlMap.replace( /\+*$/, '' );
	
    // This will contain all the HTML to be injected into the selector passed
    //   above after processing.
    var formattedOutput		= '';
    // All the keywords extrapolated from the current URL, urlKeyword == Array
    var urlKeywords		= this.fetch404Keywords( );
    
    // This array will house all objects of class type keywordUrlMapClass
    var keywordUrlMapObjects	= [];
    
    // Now we have to parse the Keyword -> URL mappings so we can match on the
    //   404 keywords found.
    myKeywordUrlMap 	= myKeywordUrlMap.split( '++' );
    for( var i in myKeywordUrlMap ){
	// Example Map: Link Name 1||http://www.link1.com||link1, test1, keyword
	
	// Split the current keyword / url map by '||' and create new object
	var currentKeywordUrlMap	= myKeywordUrlMap[i].split( '||' );
	// Create the object and set the name and URL
	keywordUrlMapObjects[i]	= new this.keywordUrlMapClass( currentKeywordUrlMap[0], currentKeywordUrlMap[1] );
	
	// Now split the 3rd( [2] ) part of data by ',' and add to list of
	//   keywords for this object
	var currentKeywords		= currentKeywordUrlMap[2].split( ',' );
	for( var x in currentKeywords ){
	    keywordUrlMapObjects[i].addKeyword( currentKeywords[x] );
	}
    }
    
    
    // Finally loop through all the 404 keywords extrapolated, and call the
    //   keywordUrlMapClass objects 'matchKeyword' method to see if any of the
    //   objects keywords match the 404 keyword
    for( var i in urlKeywords ){	
	for( var x in keywordUrlMapObjects ){
	    if( keywordUrlMapObjects[x].matchKeyword( urlKeywords[i] ) ){
		// Then add the output code
		formattedOutput += "\
		    <li><a href='" + keywordUrlMapObjects[x].url + "'>" +
			    keywordUrlMapObjects[x].name + "</a>\
		    </li>";
	    }
	}
    }
    
    // Output the final HTML to the page
    $( myTargetSelector ).append( formattedOutput );
    
    
}

/**
 * Construct a keywordUrlMapClass
 * @class Basic class to house keyword to url mappings, and any helper methods
 * needed.
 * @constructor
 * @param {String} myName The human readable link name, used for innerHTML of
 * the anchor when outputting to the user.
 * @param {String} myUrl The actual href URL for the anchor
 * @return A new keywordUrlMapClass
 */
mi.Search.prototype.keywordUrlMapClass = function( myName, myUrl){
    this.name		= myName;		// Name of link to display
    this.url		= myUrl;		// Actual URL
    this.keywords	= [];			// An array of keywords match
    this.matchedKeyword = false;		// This is set to true when we
						// match a keyword to prevent dups
        
    
     /**
    * Adds a new keyword to the Array 'keywords' for the current instance of
    * this object, also lowercases the keyword
    * @type String
    */
    this.addKeyword 	= function( myKeyword ){
	this.keywords.push( myKeyword.toLowerCase() );
    }
    
    /**
     * Given a passed keyword, see if it matches any keywords in this object,
     * if so then return true, and set that object as matchedKeyword == true
     * to prevent duplicate outputs
     * @type String
     * @return 'true' if match found, 'false' otherwise
    */
    this.matchKeyword 	= function( myKeyword ){
	
	if( ( !this.matchedKeyword ) && ( this.getKeywords().match( myKeyword ) ) ){
		this.matchedKeyword 	= true;
		return( true );
	}
	return( false );
    }
    
    /**
     * Will return a list of this objects instance keywords, in comma delimited
     * format.
     * @return String of comma delimited keywords
     */
    this.getKeywords 	= function( ){
	
	return( this.keywords.join( ', ' ) );
    }
    
}
// *****************************************************************************


// *****************************************************************************
// Function:	fetchSearchResults( 'myTargetSelector' )
// Arguments:	myTargetSelector: JQuery style selector to inject SOLR results in
// Purpose:	Based on keywords extrapolated from the current URL, will inject
// 		SOLR search results into the passed JQuery selector
// Return:	NA
// *****************************************************************************
mi.Search.prototype.fetchSearchResults = function( myTargetSelector ){
    
    // 'keywordList' is a space separated list of keywords found in the URL
    var keywordList 	= '';
    
    // Get the URL and send to function to get keywords, will return an array
    //   of keywords.
    var keywords 		= this.fetch404Keywords( );
    
    // Here we loop through the keywords, and assemble into a space separated
    //   string that SOLR can parse
    for( var i in keywords ){
	keywordList += ' ' + keywords[i];
    }
    
    // Now inject the search results into the passed selector
    $( myTargetSelector ).load( '/search/ #search', { q: keywordList } );

}
// *****************************************************************************


// *****************************************************************************
// Function:	fetch404Keywords( )
// Purpose:	Will parse for all words between forward slashes after the
// 		domain name and return this list of words as an array
// Return:	An array of keywords found in the url after the domain name
// *****************************************************************************
mi.Search.prototype.fetch404Keywords = function( ){
    
    // This will be the array that holds the unedited version of all 404 keywords
    var keywordsArray 		= [];
    // This will be the array returned by this function containing all keywords
    //   after filtering out the 'bad' keywords as defined by the regex below
    var returnKeywordsList 	= [];
    
    // Get the list of 404 keywords from the current URL
    keywordsArray = window.location.pathname.toLowerCase().slice(1).split('/');
    
    // Go through all the keywords and filter out for 'invalid' keywords
    //   based on the regex in the loop.
    for( var x in keywordsArray ){	

	// If the current keyword doesn't match the regex then assign on the
	//   returned keyword array
	if(  ( keywordsArray[x].match( /story/ ) ) || ( keywordsArray[x].match( /[0-9]+/ ) ) ){
	    //console.log( 'INVALID KEYWORD FOUND: ' + keywordsArray[x] );
	} else {
	    //console.log( 'VALID KEYWORD FOUND: ' + keywordsArray[x] ); 
	    returnKeywordsList.push( keywordsArray[x] );
	}
    }
	
    return( returnKeywordsList );

}

/**
 * @fileOverview
 * This is the configuration file for the affiliate. Making changes to this file could result in
 * breaking your search. If you have any questions please submit a ticket via the Support Portal.
 *
 * When hyphens (-) are used in URL query params, the string "_mihyphen_" is used in place of an
 * actual hyphen (-) in the object property names below. Hyphens can't be used in object property
 * names.
 *
 *
 *
 * @minify true
 * @author Jamison Kirk (jkirk [at] mcclatchyinteractive.com)
 */


mi.Search.prototype.searchParamConfig = function(search_type, search_text) {

        this.setConf("searchSelectorType","radio");

        if (search_type) {
                switch (search_type) {
                        case "web_search":

                                this.setConf("form_action","http://search2.adn.com/search-bin/search.pl.cgi");
                                this.setConf("query_fields",{sf_Keywords:search_text,
                                                                product:"Yahoo,Overture",
                                                                collection:"WEB",
                                                                live_template:"http://www.adn.com/searchresults/v-ysr/index.html",
                                                                error_template:"http://www.adn.com/searchresults/v-yerr/index.html",
                                                                preview_template:"http://preview.adn.com/searchresults/v-ysr/index.html",
                                                                results_per_page:"10",
                                                                preview:"0",
                                                                prop_related:"1",
                                                                prop_dym:"1"}
                                                );
                        break;
                        default:
                                this.configErrorReporter();
                }
        }
};
/** MI.js **********************************************************************
 * @fileoverview Inclusion of this library creates an MI object within a
 * variable named <tt>mi</tt>. The MI object is intended to namespace
 * functionality developed by McClatchy Interactive. Because the MI object is
 * self-instantiating there is no constructor per se, and there should be no
 * reason to try to create any additional copies/instances, it is a generic
 * object.
 *
 * <p><strong>window.console</strong><br>In addition to automatically creating
 * the <tt>mi</tt> variable this library also will create a
 * <tt>window.console</tt> object in browsers that don't already have one. The
 * window.console object is then provided with Firebug-like methods if they do
 * not already exist. At the very least this allows you to use
 * <tt>console.log()</tt> in your code without the fear of throwing errors in
 * browsers that don't support it. <em>Note:</em> Safari natively supports
 * console.log, but not (m)any of the other Firebug console methods. With Safari
 * and Firefox/Firebug output from console methods can be viewed in the
 * browser's console window. In browsers without a console window the console's
 * log can be accessed via an alert window at page load if the page is loaded
 * with the query string <em>?viewlog=1</em>. Currently all supported Firebug
 * methods are basically aliases for the log, though the log will report what
 * method was used. Future updates may provide additional features with these
 * methods to make them more Firebug-like.</p>
 *
 * <p><strong>Extending the MI object</strong><br>
 * The MI object is an evolving piece of code and extending its functionality is
 * encouraged. However, we do ask that you follow these guidelines.</p>
 * <ul>
 * 	<li><strong>Document your code -</strong> This was specifically chosen as 
 * 		the first item. The more the better. With the aggregator's ability to strip 
 * 		comments don't be shy about putting too much documentation into your code. 
 * 		For the win, write your documentation in the format used by JSDoc so that 
 * 		your documentation can be parsed. See this file as an example. Inclusion of 
 * 		the <tt>&#64;minify true</tt> flag will allow your code to be minified, thus 
 * 		stripping whitespace and comments from code used on live sites.</li>
 * 	<li><strong>More, smaller files -</strong> Your code should be included on
 * 		pages via aggregation, so there's no need to write huge library files that
 * 		contain the kitchen sink. Organize your code into files of related 
 * 		functionality.</li>
 * 	<li><strong>Consolidate features into apps -</strong> The MI object provides
 * 		the <tt>mi.App</tt> class that facilitates easy creation of applications
 * 		for specific features.</li>
 * 	<li><strong>Stick to naming conventions -</strong>
 * 		<ul>
 * 			<li>CamelCase constructors with an initial cap</li>
 * 			<li>Start private method and variable names with an underscore</li>
 * 			<li>File names should imply scope, separated by underscores. For example
 * 			<tt>MI_Search.js</tt>.</li>
 * 		</ul>
 * 	</li>
 * 	<li><strong>Overwrite similar functionality -</strong> There's no need to 
 * 		have multiple apps or methods that do similar tasks. Instead overwrite the
 * 		existing feature with your new version. Even better, make your new version
 * 		accept input and produce output the same as the old version, but with 
 * 		additional options to facilitate your new behavior. This will preserve 
 * 		backward compatability.</li>
 * 	<li><strong>Contain dependencies -</strong> Don't rely on, or trust in 
 * 		global variables. Either pass values in during execution, or make them
 * 		configurable options.</li>
 * 	<li><strong>Generalize -</strong> Any code within the MI object should be 
 * 		considered general in that it could be utilized on any site. No 
 * 		site-specific code. Any site-specific values should be configuration 
 * 		options.</li>
 * 	<li><strong>Exit gracefully -</strong> With the console now available on all
 * 		browsers there's little or no need to use <tt>alert()</tt> and fear users
 * 		getting messages meant for developers. Test for dependencies and exit if
 * 		they don't meet your requirements after outputting a message to the 
 * 		console.</li>
 * </ul>
 * 
 * @minify true
 * @author Joe Whetzel (jwhetzel [at] mcclatchyinteractive.com)
 * @namespace mi
 * @aggpath js/MI.js
 */

var mi = (typeof mi == 'undefined') ? {'media_domain':''} : mi;
if (window.miAppControler) {
	mi.control = new miAppControler();
}



/** This method parses name=value argument pairs from
 * the query string of the URL. It stores the name=value pairs in 
 * properties of an object and returns that object.
 * @author Adapted from "Javascript: The Definitive Guide" by David Flanagan
 */
mi.getArgs = function() {
        if (typeof mi.args == 'undefined') {
	        mi.args = {};
	        var query = location.search.substring(1);
	        var pairs = query.split('&');
	        for(var i=pairs.length -1; i >= 0; i--) {
		        var pos = pairs[i].indexOf('=');
		        if (pos == -1) {continue;}
		        mi.args[pairs[i].substring(0,pos)] = unescape(pairs[i].substring(pos+1));
	        }
        }
        return mi.args;
};


/** A stand-in for console.log() for browsers without the functionality
 * The logged message is stored for later retreival. This function gets set as
 * console.log by mi.fixConsole if needed. Each logged message is separated by 
 * a line of hyphens.
 * @private
 */
mi._console = function(s) {
	mi._console.log = (mi._console.log && mi._console.log.length > 0) ? mi._console.log + '\n---------------------------------------------------\n' + s : s;
};



/** Use console methods even in browsers without a console.
 * Defines a console object in browsers that lack one and then populates the
 * console with any missing methods from a list based on those used by Firebug.
 * Any methods created in this manner act effectively as a self-identifying
 * alias for console.log.
 *
 * <p>This method is automatically executed as the code is loaded. With this
 * in place developers can make use of console methods without worrying about
 * causing errors on browsers with no console. This makes troubleshooting during
 * development easier, as well as allowing standing error reporting features to
 * be utilized even on live pages.</p>
 *
 * This method is based on Pluck's NYX object method of the same name.
 */
mi.fixConsole = function() {
	if (typeof window.console != "object") { window.console = {}; }
	if (window.console.is_fixed) {/*already fixed*/}
	else {
		// list of firebug method names, "log" should always be first
		// this list is used to create "stand-in" methods for the console object if needed
		var firebugMethods = ["log","debug","info","warn","error","assert","dir","dirxml",
			"trace","group","groupEnd","time","timeEnd","profile","profileEnd","count"];
		var methodCount = firebugMethods.length;
		var args = mi.getArgs();
		var view = (args.viewlog && args.viewlog == '1');
		for (var i = 0; i < methodCount; i++) {
			var methodName = firebugMethods[i];
			if (typeof window.console[methodName] != "function") {
				switch (methodName) {
					// Firebug console methods can be replicated here by adding cases
					case 'log':
						if (view) {
							window.console.log = mi._console;
							if (window.addEventListener) {
								window.addEventListener("load", function(){alert(mi._console.log);}, false);
							} else if (window.attachEvent) {
								window.attachEvent("onload", function(){alert(mi._console.log);});
							}
						} else {
							window.console.log = function(){};
						}
						break;
					default:
						eval("window.console[methodName] = function(s){window.console.log('"+methodName.toUpperCase() + ": '+ s)};");
				}
			}
		}
	}
	//add our tracking flag
	window.console.is_fixed = true;
};
mi.fixConsole();

/** handy method/constructor for cloning objects
 * by default, setting a variable equal to a pre-existing object just creates
 * a reference to the original, this allows you to create an independant copy
 * of the original with no back-reference
 * @param {Object} sourceObj The object to be cloned.
 * @return A copy of the source object, <b>not</b> a reference to the original
 * @type Object
 */
mi.cloneObject = function(sourceObj) {
	if (sourceObj == null || typeof sourceObj != 'object') {
		return sourceObj;
	}
	var temp = new sourceObj.constructor();
	for (var key in sourceObj) {
			temp[key] = mi.cloneObject(sourceObj[key]);
	}
	return temp;
};


/** A constructor for applications that come pre-loaded with useful features.
 *
 * <p>Application objects come with features that facilitate the management of
 * configuration values with a system of methods used to make setting and 
 * accessing configuration values easily while protecting those settings from 
 * accidental or malevolent corruption.</p>
 * <h2>Creating your App</h2>
 * <p>In order to properly inherit all of the private properties that keep your 
 * configuration settings safe you need to use a somewhat non-traditional manner 
 * to instantiate your App. Instead of creating an instance of mi.App you 
 * instead create a constuctor for your App and inherit from the mi.App "class",
 * making your constructor a sub-class of mi.App.</p>
 * <h4>Usage Example:</h4>
 * <pre>mi.YourApp &#61; function() {
  mi.App.apply(this, arguments);
}</pre>
 * <h2>Enforcing config values</h2>
 * <p>With the only way to set configuration values being via the 
 * {@link #setConf} method you have the ability to define rules around what 
 * kinds of values are acceptable per configurable option. This is accomplished 
 * by defining a method named <tt>_manageConf</tt> specifically to
 * apply your rules. It is up to you to develop the enforcement of your rules. 
 * Here's an example:</p>
 * <h4>Usage Example:</h4>
 * <pre>mi.YourApp &#61; function() {
  mi.App.apply(this, arguments);
  this._manageConf = function(prop, val) {  
    switch (prop) {
      case 'gender':          // each case is based on the name of the configurable option
        if (
          val != 'male' ||
          val != 'female' ||
          val != 'unknown'
        ) {
          val = 'unknown';
        }
      break;
    }
    return val;
  };
}</pre>
 * <p>This example only enforces the setting of the <i>gender</i> configuration,
 * with three possible values. If an unacceptable value is passed the config 
 * gets set to an acceptable default value. Set up a case for each configuration
 * that needs enforcement. In any case, your method needs to accept two variables,
 * the name of the config and the value, and must return the value to be used.</p>
 * @constructor
 */
mi.App = function() {
	var _configs = {};
	/**
	 * Stand in method to be used for managing configuration values. By default
	 * this method does not do anything. Individual apps have the option to overwrite
	 * this method with their own functionality.
	 * @private
	 */
	this._manageConf = function(prop, val) { return val; };
	/**
	 * Set configuration values in the app.
	 * <p>Configurations may be loaded in one of two ways:</p>
	 * <ol><li>Individually: Pass two arguments, the first being the name of the
	 * configuration value and the second being the value, or</li>
	 * <li>Batch: Pass an object with attributes named after the config name and
	 * their values being the desired config setting.</li></ol>
	 * <p>Actually, you can also use these two means of configuring your app when
	 * you instantiate it by passing arguments to the constructor.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.yourApp1 &#61; new mi.YourApp('gender','male');
mi.yourApp2 &#61; new mi.YourApp({'gender':'unknown','name':'Pat'});</pre>
	 * <p>If you have multiple configurations to set at one time, passing an object
	 * is probably the most efficient means of getting them set.</p>
	 * @param {Object} confs A generic object containing one or more attributes
	 * that will be used to create the configuration(s), or
	 * @param {String} name The name of the configuration value to be set, this
	 * should be a string value, and
	 * @param value The value to be used.
	 */
	this.setConf = function() {
		switch (arguments.length) {
			case 1:
				for (var prop in arguments[0]) {
					_configs[prop] = this._manageConf(prop, arguments[0][prop]);
				}
				break;
			case 2:
				_configs[arguments[0]] = this._manageConf(arguments[0],arguments[1]);
				break;
			default:
				console.warn('mi.App.setConf was passed an incorrect number of arguments, the method should be used with either a name-value pair or an object containing configuration settings.');
		}
	};
	/**
	 * Retreive a configuration value from the app.
	 *
	 * <p>Any configuration value can be retrieved using this method. Simply pass
	 * the name of the config setting as the one argument. The value of the 
	 * setting is returned.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.example.setConf('name','Fred');
name &#61; mi.example.getConf('name');	//name is now equal to "Fred"</pre>
	 * @param {String} prop The configuration setting name you want returned; a string.
	 * @return The value associated with the named setting.
	 */
	this.getConf = function(prop) {
		return _configs[prop];
	};
	/**
	 * Outputs all configuration settings to the console.
	 *
	 * A convenience method for troubleshooting. Calling this method will output
	 * the name and value of each configuration setting in the app.
	 */
	this.viewConfs = function() {
		console.dir(_configs);
	};
	/**
	 * Object used for storing temporary values.
	 *
	 * <p>Rather than littering your app with variables used by the app's methods
	 * this object is provided as a bucket for storing those values. There are no
	 * controls around what can be set in this object. Basically it's an 
	 * unprotected bucket, so values shouldn't necessarily be trusted, test them
	 * before relying on them.</p>
	 * <b>Usage Example:</b><br>
	 * <pre>mi.exampleApp.cache.foo = "bar";</pre>
	 */
	this.cache = {};
	/* pass any arguments on to setConf() to configure the app as it's instantiated
	 */
	switch (arguments.length) {
		case 1:
			this.setConf(arguments[0]);
			break;
		case 2:
			this.setConf(arguments[0], arguments[1]);
			break;
	}
};


/** A Method for discovering the object/node that kicked off the current event.
 *
 * <p>This can be a very handy method to make determining what element kicked
 * off an even a snap. It can also be frustrating without proper documentation.
 * Basically, when called correctly this will return the source element of the
 * current event.</p>
 * <b>Usage Example:</b><br>
 * <pre>jQuery(window).click(function(e){
	console.log(mi.getEventSrc(e));
});</pre>
 * <p>In this case the object that was clicked on will be output to the console.
 * Due to event bubbling it is the object clicked, not the object with the
 * listener that is reported. That's what makes this so useful. So if in this
 * example you clicked on a paragraph object it would be that paragraph that
 * would be returned not the window object.</p>
 * <p><i>Note:</i> it is key that an argument representing the event object is 
 * passed to the handler for browsers that do not support IE's <tt>window.event</tt>
 * object.</p>
 */
mi.getEventSrc = function (e) {
	if (!e) {e = window.event;}
	if (e.target) {
		return e.target;
	} else if (e.srcElement) {
		return e.srcElement;
	}
};


/**
 * Pattern used by {@link #templateParser} to find variables.
 * @type RegEx
 */
mi.templateVarPattern = /\@([^\@]+)\@/g;
/** method for parsing a template and replacing a pattern with the equivalent
 * attributes from an object
 *
 * <pre>var data object to get values from
 *var template string containing placeholders</pre>
 *
 * <p>Placeholders in the template should be given the name of the attribute to be 
 * used as the substitute surrounded by "@" symbols, i.e. @name@</p>
 *
 * <p>The pattern is defined outside of the method to avoid instantiating the 
 * pattern every time the method is used.</p>
 *
 * @param {Object} data Attributes should be the name of the variable to be searched for
 * and value is what will be put into the template.
 * @param {String} template The template string used to format the output.
 * @return The template with each variable replaced with the corresponding value from
 * the <i>data</i> argument.
 * @type String
 */
mi.templateParser = function(data, template) {
	return template.replace(mi.templateVarPattern, function() {
			return data[arguments[1]];
		}
	)
};


/** method for parsing name/value data into name/value pairs
 *
 * @param {Object} sourceData Each attribute will be made into part of the resulting string.
 * @param {String} firstDelimiter Delimiter to be used between attributes.
 * @param {String} secondDelimiter Delimiter to be used between the name and the value.
 * @author Jamie Kirk
 * @type String
 */
mi.makeHash = function (sourceData, firstDelimiter, secondDelimiter) {
	if (sourceData && firstDelimiter && secondDelimiter) {
        	var hash = {};
        	var pairs = sourceData.split(firstDelimiter);
        	var pos; 
        	for(var i=pairs.length -1; i >= 0; i--) {
			if (typeof(pairs[i + 1]) != 'undefined') {
                		pos = pairs[i].indexOf(secondDelimiter);
                		if (pos == -1) {continue;}
                		hash[pairs[i].substring(0,pos)] = pairs[i].substring(pos+1);
                	}
        	}
        	return hash;
	}
        else {
		console.log('sourceData, firstDelimiter, & secondDelimiter must be defined. There are no default values.');
	}
};

/**
 * Checks for a pageInfo object in the global namespace and loads any data, that
 * doesn't already exist, into the mi.pageInfo object.
 * <p>Any objects will be cloned, not referenced, and pre-existing values will 
 * not be overwritten.</p>
 * <p> This method only officially supports one nested object, 
 * i.e. pageInfo.asset.id. A second-level nested object may be created,
 * i.e., pageInfo.asset.foo.bar; however, pageInfo.asset.foo cannot then
 * accept additional attributes, nor can pageInfo.asset.foo.bar be overwritten.</p>
 * <p>The global object is nullified after loading is complete to encourage
 * accessing data in the mi object.</p>
 */
mi.loadPageInfo = function() {
	if (window.pageInfo) {
		var pi = window.pageInfo;
		if (this.pageInfo == undefined) {
			this.pageInfo = this.cloneObject(pi);
		} else {
			for (var key in pi) {
				if (key === 'version' && ( parseFloat(pi[key]) > parseFloat(this.pageInfo.version) ) ) {
					this.pageInfo.version = pi[key];
				} else if (this.pageInfo[key] == undefined) {
					this.pageInfo[key] = this.cloneObject(pi[key]);
				} else if (typeof this.pageInfo[key] == 'object') {
					for (var key2 in pi[key]) {
						this.pageInfo[key][key2] = (this.pageInfo[key][key2]) ? this.pageInfo[key][key2] : this.cloneObject(pi[key][key2]);
					}
				}
			}
		}
	}
	window.pageInfo = null;
}

/** method for ensuring that js executes only after the document is ready
 *
 * @param {Integer} time How long (in seconds) to wait for the document to render
 * @param {String} target A JQuery-type selector
 * @param {Object} callback The function to execute when the document is ready
 * @author Scot Billman
 */
mi.wait_for_ready = function( time, target, callback ){
   var checker, time_spent = 0, interval = 3000;

   _check_document = function(){
      if( null !== $(target) ){
         clearInterval( checker );
         callback();
      } else {
         time_spent += interval/1000;
         if( time_spent >= time ){
            clearInterval( checker );
         }
      }
   };

   $(document).ready( function() {
      checker = setInterval( _check_document, interval );
   });
};

/** MI.js ^ ***************************************************************** */

/** MI_Cookie.js ****************************************************************
 * @fileoverview Class for managing cookies. This class allows you to interact with cookies
 * as an object with each named value represented as a property of the object.
 * This class will store multiple name/value pairs in a single cookie, reducing 
 * the number of cookies needed. Browsers may enforce limits to the number of 
 * individual cookies stored, so bundling values up in a single cookie is a good
 * idea. New cookies should be used if there's a difference in access rights, or
 * a cookie is getting too big, 4k of data is generally the limit.
 * @minify true
 * @author Joe Whetzel
 * @aggpath js/MI_Cookie.js
 *************************************************************************** */
 var mi = (!mi) ? {'media_domain':''} : mi;
 
/** Cookie object constructor. This constructor creates the javascript object, it
 * does not create the browser cookie, use {@link #store} to store the cookie in 
 * the browser.
 * @param document the Document object for which the cookie is stored
 * @param {String} name string that specifies a name for the cookie, defaults to "cookie"
 * @param {Integer} minutes how long until the cookie expires, defaults to current session
 * @param {String} path the path with which the cookie is associated, defaults to current page
 * @param {String} domain domain the cookie is associated to
 * @param {Boolean} secure whether or not the cookie is secure, only if the connection is secure
 * @constructor
 */
mi.Cookie = function (document, name, minutes, path, domain, secure) {
	/** Document object for which the cookie is stored. Default is to use the current document. */
	this.$document = (document) ? document : window.document;
	/** Name of the cookie. Defaults to "cookie".
	 * @type Document
	 */
	this.$name = (name) ? name : 'cookie';
	/** Minutes until the cookie expires. Default is at the end of the current session.
	 * @type Integer
	 */
	this.$expiration = (minutes) ? new Date((new Date()).getTime() + minutes * 60000) : null;
	/** Path associated with the cookie.
	 * @type String
	 */
	this.$path = (path) ? path : null;
	/** Domain associated with the cookie.
	 * @type String
	 */
	this.$domain = (domain) ? domain : null;
	/** Whether or not the cookie is secure.
	 * @type Boolean
	 */
	this.$secure = (secure) ? true : false;
};

/** Stores the cookie in the browser. Defining or changing values in the cookie
 * object alone does not save the values to the browser. After working with the
 * cookie object it must be stored in the browser.
 */
mi.Cookie.prototype.store = function() {
	var cookieVal = "";
	for(var prop in this) {
		if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function')) {
			continue;
		}
		if (cookieVal !== "") {
			cookieVal += '&';
		}
		cookieVal += prop + ':' + escape(this[prop]);
	}
	var cookie = this.$name + '=' + cookieVal;
	cookie += (this.$expiration) ? '; expires=' + this.$expiration.toGMTString() : '';
	cookie += (this.$path) ? '; path=' + this.$path : '';
	cookie += (this.$domain) ? '; domain=' + this.$domain : '';
	cookie += (this.$secure) ? '; secure' : '';
	this.$document.cookie = cookie;
};

/** Loads a single cookie from the browser into the cookie object, making each 
 * name/value pair properties of the object.
 * @type Boolean
 */
mi.Cookie.prototype.load = function() {
	var allCookies = this.$document.cookie;
	if (allCookies === "") {
		return false;
	}
	var start = allCookies.indexOf(this.$name + '=');
	if (start == -1) {
		return false;
	}
	start += this.$name.length + 1;
	var end = allCookies.indexOf(';', start);
	if (end == -1) {
		end = allCookies.length;
	}
	var cookieVal = allCookies.substring(start, end);
	var a = cookieVal.split('&');
	if ((a.length == 1) && (a[0].indexOf(':') == -1)) {
		var prop = this.$name;
		this[prop] = unescape(cookieVal.replace(/\+/g, '%20')); // PHP encodes spaces with a '+'
		return true;
	}
	for(var i=0; i < a.length; i++) {
		a[i] = a[i].split(':');
	}
	for(i=0; i < a.length; i++) {
		this[a[i][0]] = unescape(a[i][1]);
	}
	return true;
};

/** Method for removing the entire cookie from the browser.
 */
mi.Cookie.prototype.remove = function() {
	var cookie = this.$name + '=';
	cookie += (this.$path) ? '; path=' + this.$path : '';
	cookie += (this.$domain) ? '; domain=' + this.$domain : '';
	cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
	this.$document.cookie = cookie;
};



/* MI_Cookie.js ^ *********************************************************** */
// $Id: MI_Commenting.js 1603 2011-03-24 20:29:00Z bjones $
/** MI_Commenting.js ***************************************************************
 * @fileOverview
 * A generic class for managing commenting functionality. This app should be
 * extended with an backend-specific extension.
 *
 * @minify true
 * @author Joe Whetzel (jwhetzel [at] mcclatchyinteractive.com)
 * @aggpath commenting/js/MI_Commenting.js
 */

/**
 * Commenting app constructor. This app functions as a generalized API for 
 * commenting functionality, a backend-specific extension is required.
 *
 * <p>All that is required to implement commenting on a page is:</p>
 * <ol>
 *   <li>A target div, default is to look for a div with an id of "commentingStage",</li>
 *   <li>Instantiate the commenting app, and</li>
 *   <li>Call the commenting app's display method.</li>
 * </ol>
 * <pre><div id='commentingStage'></div>
<script>
	mi.commenting = new mi.Commenting();
	mi.commenting.display();
</script></pre>
 *
 * <h3>Configuration options</h3>
 * <dl>
 *   <dt>accountName</dt>
 *   <dd>Name used by the backend to identify the site, default is derived from 
 *     the domain.</dd>
 *   <dt>enabled</dt>
 *   <dd>Integer value to enable/disable commenting, default is enabled.<br>
 *     0 = fully disabled<br>
 *     1 = fully enabled<br>
 *     2 = disable comment submission & display<br>
 *     3 = enable comment submission & display only<br>
 *     4 = disable popular threads widget<br>
 *   </dd>
 *   <dt>target</dt>
 *   <dd>Id value of the target element on the page in which the commenting 
 *     features are inserted, default is "commentingStage".</dd>
 * </dl>
 *
 * @constructor
 */
mi.Commenting = function() {
  mi.App.apply(this, arguments);
/**
 * @private
 */
   this._manageConf = function(prop, val) {
    switch (prop) {
      case 'enabled':
        var v = parseInt(val);
        if (isNaN(v)) {
					val = (val.toLowerCase) ? val.toLowerCase() : val;
        	switch (val) {
						case true:
						case 'true':
						case 'yes':
						case 'on':
							v = 1;
							break;
						default:
							v = 0;
							break;
        	}
        }
        val = v;
			default:
				break;
    }
    return val;
  };
  // without the ability to disable commenting globally commenting will default to disabled
  if (mi.control && mi.control.commenting != undefined) {
		this.setConf('enabled',mi.control.commenting);
  } else {
  	this.setConf('enabled',0);
  	console.warn('Commenting has been instantiated, but disabled because mi.control.commenting is not defined.');
  }
  mi.loadPageInfo();
  // account name is based on the domain, i.e. for www.mireference.com the account name is "mireference"
  var splitHost = window.location.host.split('.');
	this.setConf('accountName',splitHost[splitHost.length - 2]);
	this.setConf('target','commentingStage');
	this.finish();
};

/**
 * Hook used to add a process to the end of the constructor.
 *
 * <p>This is called by default, but out of the box  doesn't contain any functionality. Overwrite this method if you want to add your own functionality.</p>
 */
mi.Commenting.prototype.finish = function() {};

/**
 * Calling this method will add commenting features to the page.
 *
 * <p>For commenting to be successfully added the page must have a target element
 * present on the page.</p>
 */
mi.Commenting.prototype.display = function() {
	if(window.gomez && window.gomez.startInterval){window.gomez.startInterval('display commenting');}
	var e = this.getConf('enabled');
	if ( e !== 0 && e !== 2 ) {
		this._renderCommenting();
	} else {
		console.info('Submission and display of comments has been disabled.');
	}
	if(window.gomez && window.gomez.endInterval){window.gomez.endInterval('display commenting');}
};

mi.Commenting.prototype.displayPopular = function(count) {
	if(window.gomez && window.gomez.startInterval){window.gomez.startInterval('popular comment threads');}
	var e = this.getConf('enabled');
	if ( e !== 0 && e !== 3 && e !== 4 ) {
		this._displayPopular(count);
	} else {
		console.info('The popular comment threads widget has been disabled.');
	}
	if(window.gomez && window.gomez.endInterval){window.gomez.endInterval('popular comment threads');}
};

mi.Commenting.prototype.displayCommentCount = function() {
	if(window.gomez && window.gomez.startInterval){window.gomez.startInterval('comment count');}
	var e = this.getConf('enabled');
	if ( e !== 0 && e !== 2 ) {
		this._displayCommentCount();
  } else {
		console.info('Submission and display of comments has been disabled.');
  }
	if(window.gomez && window.gomez.endInterval){window.gomez.endInterval('comment count');}
}

/** ^ MI_Commenting.js ****************************************************** */
// $Id: MI_Commenting_Disqus.js 3007 2012-08-01 18:26:24Z scowles $
/** MI_Commenting_Disqus.js ****************************************************
 * @fileOverview
 * This is an extension to MI_Commenting.js that enables commenting via Disqus.
 *
 * @minify true
 * @author Joe Whetzel (jwhetzel [at] mcclatchyinteractive.com)
 * @aggpath commenting/js/MI_Commenting_Disqus.js
 */

mi.Commenting.prototype.extended = true;

/** Required to resolve some IE scoping issues.
*/
var disqus_identifier, disqus_shortname, disqus_remote_auth_s2, disqus_title;

/**
 * facebookXdReceiverPath used to prevent a conflict between Disqus and Facebook
 * Connect that can cause analytics issues. The variable will be defined when
 * Disqus commenting is instantiated. We define it here to avoid IE problems
 * declaring variables in the window after the page has loaded.
 */
if (typeof facebookXdReceiverPath == "undefined") {
	var facebookXdReceiverPath;
}

/**
 * Method that handles any of the Disqus specific processes required in adding
 * commenting features to a page. Both the input form and comments are included.
 *
 * <p>This method should not be called directly, instead it is called via the
   mi.Commenting.display method.</p>
 *
 * @private
 */

mi.Commenting.prototype._displayCommentingDisqus = function() {
	// global variables used by Disqus
	window.disqus_identifier = this.getThreadId();	// identifies thread
	var cookie = new mi.Cookie(document, 'disqus');
	if(cookie.load()){
		window.disqus_remote_auth_s2 = cookie.disqus;	// single sign on, original disqus
	}
	window.disqus_title = mi.pageInfo.asset.title;

	if (window.disqus_identifier != undefined) {
		var target = document.getElementById(this.getConf('target'));

		// since a Disqus-specific element is targeted we'll handle creating and adding it to the configured target
		var thread = document.createElement('div');
		thread.id = 'disqus_thread';
		target.appendChild(thread);

		// add the call to Disqus' script
		var dsq = document.createElement('script');
		dsq.type = 'text/javascript';
		dsq.async = true;
		dsq.src = 'http://'+ this.getConf('accountName') +'.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

                /* replace the disqus logout link if needed */
                //mi.wait_for_ready( 15, this.getConf( 'selectorTarget' ), this.linkReplace() );
	} else {
		console.error('Commenting could not be loaded because there was no defined thread id.');
	}
};
// a non-vendor-specific method name is used so that vendors can be changed
// vendor-specific names used in extensions so that multiple vendors can be present
mi.Commenting.prototype._renderCommenting = mi.Commenting.prototype._displayCommentingDisqus;
/**
 * Writes the Disqus Popular Threads widget. WARNING: makes use of document.write().
 * @private
 */
mi.Commenting.prototype._displayPopularDisqus = function(count) {
	count = (isNaN(count)) ? this.getConf('discoveryCount') : count;
	if (isNaN(count)) {
		count = 0;
	}
	count = (count > 0 && count < 21) ? Math.floor(count) : 5;
	document.write('<script type="text/javascript" src="http://disqus.com/forums/' + this.getConf('accountName') + '/popular_threads_widget.js?num_items='+ count +'"></script>');
};
mi.Commenting.prototype._displayPopular = mi.Commenting.prototype._displayPopularDisqus;
/**
 * Writes the number of comments to a specified a tag. WARNING: makes use of document.write().
 * @private
 */
mi.Commenting.prototype._displayCommentCountDisqus = function() {
	window.disqus_identifier = this.getThreadId();	// identifies thread
	window.disqus_shortname = this.getConf('accountName');	// identifies site
  document.getElementById('commentCount').href = document.getElementById('commentCount').href + '#disqus_thread';
  document.getElementById('commentCount').setAttribute('data-disqus-identifier', this.getThreadId());

  var s = document.createElement('script'); s.async = true;
  s.src = 'http://disqus.com/forums/' + this.getConf('accountName') + '/count.js';
  (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
};
mi.Commenting.prototype._displayCommentCount = mi.Commenting.prototype._displayCommentCountDisqus;
/**
 * Method used to construct the id used to uniquely identify threads for an asset.
 */
mi.Commenting.prototype.getThreadId = function() {
	return (mi.pageInfo && mi.pageInfo.asset && mi.pageInfo.asset.id) ? mi.pageInfo.asset.id : undefined;
};

/**
 *  Method to replace the Disqus comment widget logout link
 *  with the InSite logout link. The 'target' and 'source' are
 *  JQuery selectors. The 'target' is delivered by Disqus,
 *  it should always be that value. The 'source' may have a
 *  different value if there is a non-standard install.
 */
//mi.Commenting.prototype.linkReplace = function() {
//   var obj = this;
//
//   return( function(){
//      if( !obj.getConf( 'selectorTarget' ) ){
//         obj.setConf( 'selectorTarget', '.dsq-request-user-logout' );
//      }
//      if( !obj.getConf( 'selectorSource' ) ){
//         obj.setConf( 'selectorSource', '#pluckLogOut' );
//      }
//      var target = $( obj.getConf( 'selectorTarget' ) );
//      var source = $( obj.getConf( 'selectorSource' ) );
//      if ( null !== source && null !== target && 'Guest' !== account_user_name ){
//         var s = source.clone( 1 );
//         s.attr( 'class', target.attr( 'class' ) );
//         target.replaceWith( s );
//      }
//   });
//};

/**
 * Overwrites the Commenting app's default, empty finish method.
 * 
 * <p>This is being used to set the facebookXdReceiverPath variable to avoid
   Facebook Connect conflicts with Disqus.</p>
 */
mi.Commenting.prototype.finish = function() {
	window.facebookXdReceiverPath = '/static/scripts/mi/third_party/facebook/fb-disqus_xd_receiver.html';
}

/**
 * Redefine the disqus_config for disqus 2012.
 * 
 * <p>This is being used to reset the disqus_config function to add parameters for this.page.remote_auth_s3 and this.page.api_key</p>
 */
mi.Commenting.prototype.reset_disqus_config = function(disqus_cookie_val,public_api_key) {
	var mi_disqus_config = new disqus_config();
	var sso_name = mi_disqus_config.sso.name.toString(); 
	var sso_button = mi_disqus_config.sso.button.toString(); 
	var sso_url = mi_disqus_config.sso.url.toString(); 
	var sso_logout = mi_disqus_config.sso.logout.toString(); 
	var sso_width = mi_disqus_config.sso.width.toString(); 
	var sso_height = mi_disqus_config.sso.height.toString();
	
	disqus_config = function () {
		this.page.remote_auth_s3 = disqus_cookie_val;
		this.page.api_key = public_api_key;

		this.sso = {
		    name:    sso_name,
		    button:  sso_button,
		    url:     sso_url,
		    logout:  sso_logout,
		    width:   sso_width,
		    height:  sso_height
		};
	};
	
}

/** ^ MI_Commenting_Disqus.js *********************************************** */
 mi.commenting = new mi.Commenting();
 // If necessary, you can add configuration overrides here.
 mi.commenting.setConf('accountName','anchoragedailynews');

 var disqus_config = function () {
     this.sso = {
         name:    "ADN",
         button:  "http://media.adn.com/static/images/dsq-login-button-mi.png",
         url:     "http://registration.adn.com/static/insite/disqus_login.html",
         logout:  "http://registration.adn.com/reg-bin/tint.cgi?mode=logout",
         width:   "600",
         height:  "375"
     };
 };

/** DealSaver.js **********************************************************************
 * @minify true
 * @author Todd Edwards (tedwards [at] mcclatchyinteractive.com)
 * @aggpath dealsaver/js/MI_DealSaver.js
 */

mi.DealSaver = function() {
  mi.App.apply(this, arguments);
  if (mi.control && mi.control.dealsaver !== undefined) {
    this.setConf("enabled",mi.control.dealsaver);
  } else {
    this.setConf("enabled",0);
    console.warn("DealSaver has been instantiated, but disabled because mi.control.dealsaver is not defined.");
  }
};

mi.DealSaver.prototype.executeDs = function() {
  var self = this;
  var e = self.getConf("enabled");

  if ( e !== 0 ) {
    dsUrl = "http://" + window.location.hostname + "/static/dealsaver/widget/dealsaver.json";

    jQuery.ajax({
      type: "GET",
      cache: false,
      dataType: "json",
      url: dsUrl,
      success: function(data) {
        self.checkData(data);
        self.displayWidget(self.getConf("enabled"));
      },
      error: function() {
        self.setConf("enabled",0);
        self.displayWidget(self.getConf("enabled"));
      }
    });
  }
  else {
    console.info('Display of DealSaver has been disabled.');
  }
};

mi.DealSaver.prototype.checkData = function(data) {
  var self = this;

  if (data.page.deals.deal == undefined) {
    self.setConf("enabled",0);
    console.warn("The DealSaver widget has been disabled because it can't find any deal information in the feed.");
  } else if (data.page.deals.deal.saleprice.$t <= 0 || data.page.deals.deal.saleprice.$t == undefined) {
    self.setConf("enabled",2);
    console.warn("The DealSaver widget has been placed in PlaceHolder mode because saleprice is empty or 0.");
    self.distributeData(data);
  } else {
    self.distributeData(data);
  }
}

mi.DealSaver.prototype.distributeData = function(data) {
  var self = this;

  if (self.getConf("LID") !== undefined) {
    var lid = self.getConf("LID");
    var lidHash = "&LID=" + lid;
  } else {
    console.warn("DealSaver can't find mi.dealSaver.getConf('LID'). Disabling the LID hash tag in URLs.");
    var lidHash = '';
  }

  var dsvalue = data.page.deals.deal.productvalue.$t;
  var dsprice = data.page.deals.deal.saleprice.$t;
  var dollarsoff = (dsvalue-dsprice);
  var percentoff = (dollarsoff / dsvalue) * 100;
  var misitelink = data.page.site.sitelink.$t + lidHash + "#widget=ds_rrail";
  var mideallink = data.page.deals.deal.link.$t + lidHash + "#widget=ds_rrail";

  jQuery("#ds_value").html("$"+Math.round(dsvalue));
  jQuery("#ds_discount").html(Math.floor(percentoff)+"%");
  jQuery("#ds_save").html("$"+Math.round(dollarsoff));
  jQuery("#dealsaver_td .ds_title_link").attr("href",mideallink);
  jQuery("#dealsaver_td .ds_title_link").html(data.page.deals.deal.offer.$t);
  jQuery("#dealsaver_td .ds_pricetag_container").html("$"+data.page.deals.deal.saleprice.$t);
  jQuery("#dealsaver_td .ds_deal_image img").attr("src",data.page.deals.deal.splashpagethumbnail.$t);
  jQuery("#dealsaver_td .ds_logo_link").attr("href",misitelink);
  jQuery("#dealsaver_td .ds_dealtitle").attr("href",misitelink);
  jQuery("#dealsaver_td .ds_deal_image a").attr("href",mideallink);
  jQuery("#dealsaver_td .ds_pricetag a").attr("href",mideallink);
};

mi.DealSaver.prototype.displayWidget = function(display_mode) {
  var self = this;

  if ( display_mode !== 0 && display_mode !== 2 ) {
    jQuery("#dealSaverWidget").attr("style", "display:block");
  } else if ( display_mode == 2 ) {
    jQuery("#dealSaverWidget .ds_buycontainer").attr("style", "display:none");
    jQuery("#dealSaverWidget .ds_deal_image").attr("style", "float:none; text-align:center");
    jQuery("#dealSaverWidget").attr("style", "display:block");
  }
};
/**
 * Equal Heights Plugin
 * @minify true
 * Equalize the heights of elements. Great for columns or any elements
 * that need to be the same size (floats, etc).
 * 
 * Version 1.0
 * Updated 12/10/2008
 *
 * Copyright (c) 2008 Rob Glazebrook (cssnewbie.com) 
 *
 * Usage: $(object).equalHeights([minHeight], [maxHeight]);
 * 
 * Example 1: $(".cols").equalHeights(); Sets all columns to the same height.
 * Example 2: $(".cols").equalHeights(400); Sets all cols to at least 400px tall.
 * Example 3: $(".cols").equalHeights(100,300); Cols are at least 100 but no more
 * than 300 pixels tall. Elements with too much content will gain a scrollbar.
 * 
 */

(function($) {
	$.fn.equalHeights = function(minHeight, maxHeight) {
		tallest = (minHeight) ? minHeight : 0;
		this.each(function() {
			if($(this).height() > tallest) {
				tallest = $(this).height();
			}
		});
		if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
		return this.each(function() {
			$(this).height(tallest).css("overflow","auto");
		});
	}
})(jQuery);