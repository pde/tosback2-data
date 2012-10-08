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
;(function(){var n=this,A=n._,r=typeof StopIteration!=="undefined"?StopIteration:"__break__",B=function(a){return a.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},j=Array.prototype,l=Object.prototype,o=j.slice,C=j.unshift,D=l.toString,p=l.hasOwnProperty,E=l.propertyIsEnumerable,s=j.forEach,t=j.map,u=j.reduce,v=j.reduceRight,w=j.filter,x=j.every,y=j.some,m=j.indexOf,z=j.lastIndexOf;l=Array.isArray;var F=Object.keys,b=function(a){return new k(a)};if(typeof exports!=="undefined")exports._=b;n._=b;b.VERSION=
"0.6.0";var i=b.forEach=function(a,c,d){try{if(s&&a.forEach===s)a.forEach(c,d);else if(b.isNumber(a.length))for(var e=0,f=a.length;e<f;e++)c.call(d,a[e],e,a);else for(e in a)p.call(a,e)&&c.call(d,a[e],e,a)}catch(g){if(g!=r)throw g;}return a};b.map=function(a,c,d){if(t&&a.map===t)return a.map(c,d);var e=[];i(a,function(f,g,h){e.push(c.call(d,f,g,h))});return e};b.reduce=function(a,c,d,e){if(u&&a.reduce===u)return a.reduce(b.bind(d,e),c);i(a,function(f,g,h){c=d.call(e,c,f,g,h)});return c};b.reduceRight=
function(a,c,d,e){if(v&&a.reduceRight===v)return a.reduceRight(b.bind(d,e),c);a=b.clone(b.toArray(a)).reverse();return b.reduce(a,c,d,e)};b.detect=function(a,c,d){var e;i(a,function(f,g,h){if(c.call(d,f,g,h)){e=f;b.breakLoop()}});return e};b.filter=function(a,c,d){if(w&&a.filter===w)return a.filter(c,d);var e=[];i(a,function(f,g,h){c.call(d,f,g,h)&&e.push(f)});return e};b.reject=function(a,c,d){var e=[];i(a,function(f,g,h){!c.call(d,f,g,h)&&e.push(f)});return e};b.every=function(a,c,d){c=c||b.identity;
if(x&&a.every===x)return a.every(c,d);var e=true;i(a,function(f,g,h){(e=e&&c.call(d,f,g,h))||b.breakLoop()});return e};b.some=function(a,c,d){c=c||b.identity;if(y&&a.some===y)return a.some(c,d);var e=false;i(a,function(f,g,h){if(e=c.call(d,f,g,h))b.breakLoop()});return e};b.include=function(a,c){if(m&&a.indexOf===m)return a.indexOf(c)!=-1;var d=false;i(a,function(e){if(d=e===c)b.breakLoop()});return d};b.invoke=function(a,c){var d=b.rest(arguments,2);return b.map(a,function(e){return(c?e[c]:e).apply(e,
d)})};b.pluck=function(a,c){return b.map(a,function(d){return d[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a))return Math.max.apply(Math,a);var e={computed:-Infinity};i(a,function(f,g,h){g=c?c.call(d,f,g,h):f;g>=e.computed&&(e={value:f,computed:g})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a))return Math.min.apply(Math,a);var e={computed:Infinity};i(a,function(f,g,h){g=c?c.call(d,f,g,h):f;g<e.computed&&(e={value:f,computed:g})});return e.value};b.sortBy=function(a,c,d){return b.pluck(b.map(a,
function(e,f,g){return{value:e,criteria:c.call(d,e,f,g)}}).sort(function(e,f){e=e.criteria;f=f.criteria;return e<f?-1:e>f?1:0}),"value")};b.sortedIndex=function(a,c,d){d=d||b.identity;for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?(e=g+1):(f=g)}return e};b.toArray=function(a){if(!a)return[];if(a.toArray)return a.toArray();if(b.isArray(a))return a;if(b.isArguments(a))return o.call(a);return b.values(a)};b.size=function(a){return b.toArray(a).length};b.first=function(a,c,d){return c&&!d?o.call(a,
0,c):a[0]};b.rest=function(a,c,d){return o.call(a,b.isUndefined(c)||d?1:c)};b.last=function(a){return a[a.length-1]};b.compact=function(a){return b.filter(a,function(c){return!!c})};b.flatten=function(a){return b.reduce(a,[],function(c,d){if(b.isArray(d))return c.concat(b.flatten(d));c.push(d);return c})};b.without=function(a){var c=b.rest(arguments);return b.filter(a,function(d){return!b.include(c,d)})};b.uniq=function(a,c){return b.reduce(a,[],function(d,e,f){if(0==f||(c===true?b.last(d)!=e:!b.include(d,
e)))d.push(e);return d})};b.intersect=function(a){var c=b.rest(arguments);return b.filter(b.uniq(a),function(d){return b.every(c,function(e){return b.indexOf(e,d)>=0})})};b.zip=function(){for(var a=b.toArray(arguments),c=b.max(b.pluck(a,"length")),d=new Array(c),e=0;e<c;e++)d[e]=b.pluck(a,String(e));return d};b.indexOf=function(a,c){if(m&&a.indexOf===m)return a.indexOf(c);for(var d=0,e=a.length;d<e;d++)if(a[d]===c)return d;return-1};b.lastIndexOf=function(a,c){if(z&&a.lastIndexOf===z)return a.lastIndexOf(c);
for(var d=a.length;d--;)if(a[d]===c)return d;return-1};b.range=function(a,c,d){var e=b.toArray(arguments),f=e.length<=1;a=f?0:e[0];c=f?e[0]:e[1];d=e[2]||1;e=Math.ceil((c-a)/d);if(e<=0)return[];e=new Array(e);f=a;for(var g=0;;f+=d){if((d>0?f-c:c-f)>=0)return e;e[g++]=f}};b.bind=function(a,c){var d=b.rest(arguments,2);return function(){return a.apply(c||{},d.concat(b.toArray(arguments)))}};b.bindAll=function(a){var c=b.rest(arguments);if(c.length==0)c=b.functions(a);i(c,function(d){a[d]=b.bind(a[d],
a)});return a};b.delay=function(a,c){var d=b.rest(arguments,2);return setTimeout(function(){return a.apply(a,d)},c)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(b.rest(arguments)))};b.wrap=function(a,c){return function(){var d=[a].concat(b.toArray(arguments));return c.apply(c,d)}};b.compose=function(){var a=b.toArray(arguments);return function(){for(var c=b.toArray(arguments),d=a.length-1;d>=0;d--)c=[a[d].apply(this,c)];return c[0]}};b.keys=F||function(a){if(b.isArray(a))return b.range(0,
a.length);var c=[];for(var d in a)p.call(a,d)&&c.push(d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=function(a){return b.filter(b.keys(a),function(c){return b.isFunction(a[c])}).sort()};b.extend=function(a,c){for(var d in c)a[d]=c[d];return a};b.clone=function(a){if(b.isArray(a))return a.slice(0);return b.extend({},a)};b.tap=function(a,c){c(a);return a};b.isEqual=function(a,c){if(a===c)return true;var d=typeof a;if(d!=typeof c)return false;if(a==c)return true;if(!a&&c||
a&&!c)return false;if(a.isEqual)return a.isEqual(c);if(b.isDate(a)&&b.isDate(c))return a.getTime()===c.getTime();if(b.isNaN(a)&&b.isNaN(c))return true;if(b.isRegExp(a)&&b.isRegExp(c))return a.source===c.source&&a.global===c.global&&a.ignoreCase===c.ignoreCase&&a.multiline===c.multiline;if(d!=="object")return false;if(a.length&&a.length!==c.length)return false;d=b.keys(a);var e=b.keys(c);if(d.length!=e.length)return false;for(var f in a)if(!b.isEqual(a[f],c[f]))return false;return true};b.isEmpty=
function(a){if(b.isArray(a))return a.length===0;for(var c in a)if(p.call(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=l||function(a){return!!(a&&a.concat&&a.unshift)};b.isArguments=function(a){return a&&b.isNumber(a.length)&&!a.concat&&!a.substr&&!a.apply&&!E.call(a,"length")};b.isFunction=function(a){return!!(a&&a.constructor&&a.call&&a.apply)};b.isString=function(a){return!!(a===""||a&&a.charCodeAt&&a.substr)};b.isNumber=function(a){return a===+a||
D.call(a)==="[object Number]"};b.isDate=function(a){return!!(a&&a.getTimezoneOffset&&a.setUTCFullYear)};b.isRegExp=function(a){return!!(a&&a.test&&a.exec&&(a.ignoreCase||a.ignoreCase===false))};b.isNaN=function(a){return b.isNumber(a)&&isNaN(a)};b.isNull=function(a){return a===null};b.isUndefined=function(a){return typeof a=="undefined"};b.noConflict=function(){n._=A;return this};b.identity=function(a){return a};b.times=function(a,c,d){for(var e=0;e<a;e++)c.call(d,e)};b.breakLoop=function(){throw r;
};b.mixin=function(a){i(b.functions(a),function(c){G(c,b[c]=a[c])})};var H=0;b.uniqueId=function(a){var c=H++;return a?a+c:c};b.templateSettings={start:"<%",end:"%>",interpolate:/<%=(.+?)%>/g};b.template=function(a,c){var d=b.templateSettings,e=new RegExp("'(?=[^"+d.end.substr(0,1)+"]*"+B(d.end)+")","g");a=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+a.replace(/[\r\t\n]/g," ").replace(e,"\t").split("'").join("\\'").split("\t").join("'").replace(d.interpolate,
"',$1,'").split(d.start).join("');").split(d.end).join("p.push('")+"');}return p.join('');");return c?a(c):a};b.each=b.forEach;b.foldl=b.inject=b.reduce;b.foldr=b.reduceRight;b.select=b.filter;b.all=b.every;b.any=b.some;b.head=b.first;b.tail=b.rest;b.methods=b.functions;var k=function(a){this._wrapped=a},q=function(a,c){return c?b(a).chain():a},G=function(a,c){k.prototype[a]=function(){var d=b.toArray(arguments);C.call(d,this._wrapped);return q(c.apply(b,d),this._chain)}};b.mixin(b);i(["pop","push",
"reverse","shift","sort","splice","unshift"],function(a){var c=j[a];k.prototype[a]=function(){c.apply(this._wrapped,arguments);return q(this._wrapped,this._chain)}});i(["concat","join","slice"],function(a){var c=j[a];k.prototype[a]=function(){return q(c.apply(this._wrapped,arguments),this._chain)}});k.prototype.chain=function(){this._chain=true;return this};k.prototype.value=function(){return this._wrapped}})();
;/*
 * Insert Script Plugin
 *
 * Copyright (c) 2008 Kevin Martin (http://synarchydesign.com/insert)
 * Licensed under the GPL license:
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.insert = function(file)
{
	var data	= [];
	var data2	= [];

	if (typeof file == 'object')
	{
		data = file;
		file = data.src !== undefined ? data.src : false;
		file = file === false && data.href !== undefined ? data.href : file;
		file = file === false ? file2 : false;
	}

	if (typeof file == 'string' && file.length)
	{
		var index	= file.lastIndexOf('.');
		var index2	= file.replace('\\', '/').lastIndexOf('/') + 1;
		var ext		= file.substring(index + 1, file.length).split(/[\?|#]/)[0];
	}

	switch(ext)
	{
		case 'js':
			data2 = {
				elm:	'script',
				type:	'text/javascript',
				src:	file
			};
		break;

		case 'css':
			data2 = {
				elm:	'link',
				rel:	'stylesheet',
				type:	'text/css',
				href:	file
			};
		break;

		default:
			data2 = {elm: 'link'};
		break;
	}

	data2.id = 'script-' + (typeof file == 'string' && file.length ?
		file.substring(index2, index) : Math.round(Math.rand() * 100));

	for (var i in data)
	{
		data2[i] = data[i];
	}

	data	= data2;
	var tag	= document.createElement(data.elm);

	delete data.elm;

	for (i in data)
	{
		tag.setAttribute(i, data[i]);
	}
	jQuery('head').append(tag);

	return jQuery('#' + data.id);
};;/**
 * Copyright (c) 2009 Sergiy Kovalchuk (serg472@gmail.com)
 * 
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *  
 * Following code is based on Element.mask() implementation from ExtJS framework (http://extjs.com/)
 *
 */
;(function($){
	
	/**
	 * Displays loading mask over selected element(s). Accepts both single and multiple selectors.
	 *
	 * @param label Text message that will be displayed on top of the mask besides a spinner (optional). 
	 * 				If not provided only mask will be displayed without a label or a spinner.  	
	 * @param delay Delay in milliseconds before element is masked (optional). If unmask() is called 
	 *              before the delay times out, no mask is displayed. This can be used to prevent unnecessary 
	 *              mask display for quick processes.   	
	 */
	$.fn.mask = function(label, delay){
		$(this).each(function() {
			if(delay !== undefined && delay > 0) {
		        var element = $(this);
		        element.data("_mask_timeout", setTimeout(function() { $.maskElement(element, label)}, delay));
			} else {
				$.maskElement($(this), label);
			}
		});
	};
	
	/**
	 * Removes mask from the element(s). Accepts both single and multiple selectors.
	 */
	$.fn.unmask = function(){
		$(this).each(function() {
			$.unmaskElement($(this));
		});
	};
	
	/**
	 * Checks if a single element is masked. Returns false if mask is delayed or not displayed. 
	 */
	$.fn.isMasked = function(){
		return this.hasClass("masked");
	};

	$.maskElement = function(element, label){
	
		//if this element has delayed mask scheduled then remove it and display the new one
		if (element.data("_mask_timeout") !== undefined) {
			clearTimeout(element.data("_mask_timeout"));
			element.removeData("_mask_timeout");
		}

		if(element.isMasked()) {
			$.unmaskElement(element);
		}
		
		if(element.css("position") == "static") {
			element.addClass("masked-relative");
		}
		
		element.addClass("masked");
		
		var maskDiv = $('<div class="loadmask"></div>');
		
		//auto height fix for IE
		if(navigator.userAgent.toLowerCase().indexOf("msie") > -1){
			maskDiv.height(element.height() + parseInt(element.css("padding-top")) + parseInt(element.css("padding-bottom")));
			maskDiv.width(element.width() + parseInt(element.css("padding-left")) + parseInt(element.css("padding-right")));
		}
		
		//fix for z-index bug with selects in IE6
		if(navigator.userAgent.toLowerCase().indexOf("msie 6") > -1){
			element.find("select").addClass("masked-hidden");
		}
		
		element.append(maskDiv);
		
		if(label !== undefined) {
			var maskMsgDiv = $('<div class="loadmask-msg" style="display:none;"></div>');
			maskMsgDiv.append('<div>' + label + '</div>');
			element.append(maskMsgDiv);
			
			//calculate center position
			maskMsgDiv.css("top", Math.round(element.height() / 2 - (maskMsgDiv.height() - parseInt(maskMsgDiv.css("padding-top")) - parseInt(maskMsgDiv.css("padding-bottom"))) / 2)+"px");
			maskMsgDiv.css("left", Math.round(element.width() / 2 - (maskMsgDiv.width() - parseInt(maskMsgDiv.css("padding-left")) - parseInt(maskMsgDiv.css("padding-right"))) / 2)+"px");
			
			maskMsgDiv.show();
		}
		else {
			var maskMsgDiv = $('<div class="loadmask-msg just-spinner" style="display:none;"></div>');
			maskMsgDiv.append('<div></div>');
			element.append(maskMsgDiv);
			
			//calculate center position
			maskMsgDiv.css("top", Math.round(element.height() / 2 - (maskMsgDiv.height() - parseInt(maskMsgDiv.css("padding-top")) - parseInt(maskMsgDiv.css("padding-bottom"))) / 2)+"px");
			maskMsgDiv.css("left", Math.round(element.width() / 2 - (maskMsgDiv.width() - parseInt(maskMsgDiv.css("padding-left")) - parseInt(maskMsgDiv.css("padding-right"))) / 2)+"px");
			
			maskMsgDiv.show();
		}
		
	};
	
	$.unmaskElement = function(element){
		//if this element has delayed mask scheduled then remove it
		if (element.data("_mask_timeout") !== undefined) {
			clearTimeout(element.data("_mask_timeout"));
			element.removeData("_mask_timeout");
		}
		
		element.find(".loadmask-msg,.loadmask").remove();
		element.removeClass("masked");
		element.removeClass("masked-relative");
		element.find("select").removeClass("masked-hidden");
	};
 
})(jQuery);;/*!
 * jQuery UI 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 *//*
 * jQuery UI 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
jQuery.ui||(function(a){a.ui={version:"1.8",plugin:{add:function(c,d,f){var e=a.ui[c].prototype;for(var b in f){e.plugins[b]=e.plugins[b]||[];e.plugins[b].push([d,f[b]])}},call:function(b,d,c){var f=b.plugins[d];if(!f||!b.element[0].parentNode){return}for(var e=0;e<f.length;e++){if(b.options[f[e][0]]){f[e][1].apply(b.element,c)}}}},contains:function(d,c){return document.compareDocumentPosition?d.compareDocumentPosition(c)&16:d!==c&&d.contains(c)},hasScroll:function(e,c){if(a(e).css("overflow")=="hidden"){return false}var b=(c&&c=="left")?"scrollLeft":"scrollTop",d=false;if(e[b]>0){return true}e[b]=1;d=(e[b]>0);e[b]=0;return d},isOverAxis:function(c,b,d){return(c>b)&&(c<(b+d))},isOver:function(g,c,f,e,b,d){return a.ui.isOverAxis(g,f,b)&&a.ui.isOverAxis(c,e,d)},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};a.fn.extend({_focus:a.fn.focus,focus:function(b,c){return typeof b==="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus();(c&&c.call(d))},b)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false})},scrollParent:function(){var b;if((a.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){b=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(a.curCSS(this,"position",1))&&(/(auto|scroll)/).test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0)}else{b=this.parents().filter(function(){return(/(auto|scroll)/).test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0)}return(/fixed/).test(this.css("position"))||!b.length?a(document):b},zIndex:function(e){if(e!==undefined){return this.css("zIndex",e)}if(this.length){var c=a(this[0]),b,d;while(c.length&&c[0]!==document){b=c.css("position");if(b=="absolute"||b=="relative"||b=="fixed"){d=parseInt(c.css("zIndex"));if(!isNaN(d)&&d!=0){return d}}c=c.parent()}}return 0}});a.extend(a.expr[":"],{data:function(d,c,b){return !!a.data(d,b[3])},focusable:function(c){var d=c.nodeName.toLowerCase(),b=a.attr(c,"tabindex");return(/input|select|textarea|button|object/.test(d)?!c.disabled:"a"==d||"area"==d?c.href||!isNaN(b):!isNaN(b))&&!a(c)["area"==d?"parents":"closest"](":hidden").length},tabbable:function(c){var b=a.attr(c,"tabindex");return(isNaN(b)||b>=0)&&a(c).is(":focusable")}})})(jQuery);;/*!
 * jQuery UI Widget 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 *//*
 * jQuery UI Widget 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b){var a=b.fn.remove;b.fn.remove=function(c,d){return this.each(function(){if(!d){if(!c||b.filter(c,[this]).length){b("*",this).add(this).each(function(){b(this).triggerHandler("remove")})}}return a.call(b(this),c,d)})};b.widget=function(d,f,c){var e=d.split(".")[0],h;d=d.split(".")[1];h=e+"-"+d;if(!c){c=f;f=b.Widget}b.expr[":"][h]=function(i){return !!b.data(i,d)};b[e]=b[e]||{};b[e][d]=function(i,j){if(arguments.length){this._createWidget(i,j)}};var g=new f();g.options=b.extend({},g.options);b[e][d].prototype=b.extend(true,g,{namespace:e,widgetName:d,widgetEventPrefix:b[e][d].prototype.widgetEventPrefix||d,widgetBaseClass:h},c);b.widget.bridge(d,b[e][d])};b.widget.bridge=function(d,c){b.fn[d]=function(g){var e=typeof g==="string",f=Array.prototype.slice.call(arguments,1),h=this;g=!e&&f.length?b.extend.apply(null,[true,g].concat(f)):g;if(e&&g.substring(0,1)==="_"){return h}if(e){this.each(function(){var i=b.data(this,d),j=i&&b.isFunction(i[g])?i[g].apply(i,f):i;if(j!==i&&j!==undefined){h=j;return false}})}else{this.each(function(){var i=b.data(this,d);if(i){if(g){i.option(g)}i._init()}else{b.data(this,d,new c(g,this))}})}return h}};b.Widget=function(c,d){if(arguments.length){this._createWidget(c,d)}};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(d,e){this.element=b(e).data(this.widgetName,this);this.options=b.extend(true,{},this.options,b.metadata&&b.metadata.get(e)[this.widgetName],d);var c=this;this.element.bind("remove."+this.widgetName,function(){c.destroy()});this._create();this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled")},widget:function(){return this.element},option:function(e,f){var d=e,c=this;if(arguments.length===0){return b.extend({},c.options)}if(typeof e==="string"){if(f===undefined){return this.options[e]}d={};d[e]=f}b.each(d,function(g,h){c._setOption(g,h)});return c},_setOption:function(c,d){this.options[c]=d;if(c==="disabled"){this.widget()[d?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",d)}return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(d,e,f){var h=this.options[d];e=b.Event(e);e.type=(d===this.widgetEventPrefix?d:this.widgetEventPrefix+d).toLowerCase();f=f||{};if(e.originalEvent){for(var c=b.event.props.length,g;c;){g=b.event.props[--c];e[g]=e.originalEvent[g]}}this.element.trigger(e,f);return !(b.isFunction(h)&&h.call(this.element[0],e,f)===false||e.isDefaultPrevented())}}})(jQuery);;/*
 * jQuery UI Accordion 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */(function(a){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()==location.href.toLowerCase()}},_create:function(){var d=this.options,b=this;this.running=0;this.element.addClass("ui-accordion ui-widget ui-helper-reset");if(this.element[0].nodeName=="UL"){this.element.children("li").addClass("ui-accordion-li-fix")}this.headers=this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){a(this).removeClass("ui-state-focus")});this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");if(d.navigation){var c=this.element.find("a").filter(d.navigationFilter);if(c.length){var e=c.closest(".ui-accordion-header");if(e.length){this.active=e}else{this.active=c.closest(".ui-accordion-content").prev()}}}this.active=this._findActive(this.active||d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");this.active.next().addClass("ui-accordion-content-active");this._createIcons();if(a.browser.msie){this.element.find("a").css("zoom","1")}this.resize();this.element.attr("role","tablist");this.headers.attr("role","tab").bind("keydown",function(f){return b._keydown(f)}).next().attr("role","tabpanel");this.headers.not(this.active||"").attr("aria-expanded","false").attr("tabIndex","-1").next().hide();if(!this.active.length){this.headers.eq(0).attr("tabIndex","0")}else{this.active.attr("aria-expanded","true").attr("tabIndex","0")}if(!a.browser.safari){this.headers.find("a").attr("tabIndex","-1")}if(d.event){this.headers.bind((d.event)+".accordion",function(f){b._clickHandler.call(b,f,this);f.preventDefault()})}},_createIcons:function(){var b=this.options;if(b.icons){a("<span/>").addClass("ui-icon "+b.icons.header).prependTo(this.headers);this.active.find(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected);this.element.addClass("ui-accordion-icons")}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();this.element.removeClass("ui-accordion-icons")},destroy:function(){var c=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");this.headers.find("a").removeAttr("tabindex");this._destroyIcons();var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");if(c.autoHeight||c.fillHeight){b.css("height","")}return this},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b=="active"){this.activate(c)}if(b=="icons"){this._destroyIcons();if(c){this._createIcons()}}},_keydown:function(e){var g=this.options,f=a.ui.keyCode;if(g.disabled||e.altKey||e.ctrlKey){return}var d=this.headers.length;var b=this.headers.index(e.target);var c=false;switch(e.keyCode){case f.RIGHT:case f.DOWN:c=this.headers[(b+1)%d];break;case f.LEFT:case f.UP:c=this.headers[(b-1+d)%d];break;case f.SPACE:case f.ENTER:this._clickHandler({target:e.target},e.target);e.preventDefault()}if(c){a(e.target).attr("tabIndex","-1");a(c).attr("tabIndex","0");c.focus();return false}return true},resize:function(){var d=this.options,c;if(d.fillSpace){if(a.browser.msie){var b=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}c=this.element.parent().height();if(a.browser.msie){this.element.parent().css("overflow",b)}this.headers.each(function(){c-=a(this).outerHeight(true)});this.headers.next().each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")}else{if(d.autoHeight){c=0;this.headers.next().each(function(){c=Math.max(c,a(this).height())}).height(c)}}return this},activate:function(b){this.options.active=b;var c=this._findActive(b)[0];this._clickHandler({target:c},c);return this},_findActive:function(b){return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===false?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(b,f){var d=this.options;if(d.disabled){return}if(!b.target){if(!d.collapsible){return}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");var h=this.active.next(),e={options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:h},c=(this.active=a([]));this._toggle(c,h,e);return}var g=a(b.currentTarget||f);var i=g[0]==this.active[0];d.active=d.collapsible&&i?false:a(".ui-accordion-header",this.element).index(g);if(this.running||(!d.collapsible&&i)){return}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);if(!i){g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);g.next().addClass("ui-accordion-content-active")}var c=g.next(),h=this.active.next(),e={options:d,newHeader:i&&d.collapsible?a([]):g,oldHeader:this.active,newContent:i&&d.collapsible?a([]):c,oldContent:h},j=this.headers.index(this.active[0])>this.headers.index(g[0]);this.active=i?a([]):g;this._toggle(c,h,e,i,j);return},_toggle:function(b,i,g,j,k){var d=this.options,m=this;this.toShow=b;this.toHide=i;this.data=g;var c=function(){if(!m){return}return m._completed.apply(m,arguments)};this._trigger("changestart",null,this.data);this.running=i.size()===0?b.size():i.size();if(d.animated){var f={};if(d.collapsible&&j){f={toShow:a([]),toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace}}else{f={toShow:b,toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace}}if(!d.proxied){d.proxied=d.animated}if(!d.proxiedDuration){d.proxiedDuration=d.duration}d.animated=a.isFunction(d.proxied)?d.proxied(f):d.proxied;d.duration=a.isFunction(d.proxiedDuration)?d.proxiedDuration(f):d.proxiedDuration;var l=a.ui.accordion.animations,e=d.duration,h=d.animated;if(h&&!l[h]&&!a.easing[h]){h="slide"}if(!l[h]){l[h]=function(n){this.slide(n,{easing:h,duration:e||700})}}l[h](f)}else{if(d.collapsible&&j){b.toggle()}else{i.hide();b.show()}c(true)}i.prev().attr("aria-expanded","false").attr("tabIndex","-1").blur();b.prev().attr("aria-expanded","true").attr("tabIndex","0").focus()},_completed:function(b){var c=this.options;this.running=b?0:--this.running;if(this.running){return}if(c.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})}this.toHide.removeClass("ui-accordion-content-active");this._trigger("change",null,this.data)}});a.extend(a.ui.accordion,{version:"1.8",animations:{slide:function(j,h){j=a.extend({easing:"swing",duration:300},j,h);if(!j.toHide.size()){j.toShow.animate({height:"show"},j);return}if(!j.toShow.size()){j.toHide.animate({height:"hide"},j);return}var c=j.toShow.css("overflow"),g=0,d={},f={},e=["height","paddingTop","paddingBottom"],b;var i=j.toShow;b=i[0].style.width;i.width(parseInt(i.parent().width(),10)-parseInt(i.css("paddingLeft"),10)-parseInt(i.css("paddingRight"),10)-(parseInt(i.css("borderLeftWidth"),10)||0)-(parseInt(i.css("borderRightWidth"),10)||0));a.each(e,function(k,m){f[m]="hide";var l=(""+a.css(j.toShow[0],m)).match(/^([\d+-.]+)(.*)$/);d[m]={value:l[1],unit:l[2]||"px"}});j.toShow.css({height:0,overflow:"hidden"}).show();j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(f,{step:function(k,l){if(l.prop=="height"){g=(l.end-l.start===0)?0:(l.now-l.start)/(l.end-l.start)}j.toShow[0].style[l.prop]=(g*d[l.prop].value)+d[l.prop].unit},duration:j.duration,easing:j.easing,complete:function(){if(!j.autoHeight){j.toShow.css("height","")}j.toShow.css("width",b);j.toShow.css({overflow:c});j.complete()}})},bounceslide:function(b){this.slide(b,{easing:b.down?"easeOutBounce":"swing",duration:b.down?1000:200})}}})})(jQuery);;/*
 * jQuery UI Effects 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */jQuery.effects||(function(g){g.effects={};g.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(l,k){g.fx.step[k]=function(m){if(!m.colorInit){m.start=j(m.elem,k);m.end=i(m.end);m.colorInit=true}m.elem.style[k]="rgb("+Math.max(Math.min(parseInt((m.pos*(m.end[0]-m.start[0]))+m.start[0],10),255),0)+","+Math.max(Math.min(parseInt((m.pos*(m.end[1]-m.start[1]))+m.start[1],10),255),0)+","+Math.max(Math.min(parseInt((m.pos*(m.end[2]-m.start[2]))+m.start[2],10),255),0)+")"}});function i(l){var k;if(l&&l.constructor==Array&&l.length==3){return l}if(k=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(l)){return[parseInt(k[1],10),parseInt(k[2],10),parseInt(k[3],10)]}if(k=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(l)){return[parseFloat(k[1])*2.55,parseFloat(k[2])*2.55,parseFloat(k[3])*2.55]}if(k=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(l)){return[parseInt(k[1],16),parseInt(k[2],16),parseInt(k[3],16)]}if(k=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(l)){return[parseInt(k[1]+k[1],16),parseInt(k[2]+k[2],16),parseInt(k[3]+k[3],16)]}if(k=/rgba\(0, 0, 0, 0\)/.exec(l)){return a.transparent}return a[g.trim(l).toLowerCase()]}function j(m,k){var l;do{l=g.curCSS(m,k);if(l!=""&&l!="transparent"||g.nodeName(m,"body")){break}k="backgroundColor"}while(m=m.parentNode);return i(l)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};var e=["add","remove","toggle"],c={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};function f(){var n=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,o={},l,m;if(n&&n.length&&n[0]&&n[n[0]]){var k=n.length;while(k--){l=n[k];if(typeof n[l]=="string"){m=l.replace(/\-(\w)/g,function(p,q){return q.toUpperCase()});o[m]=n[l]}}}else{for(l in n){if(typeof n[l]==="string"){o[l]=n[l]}}}return o}function b(l){var k,m;for(k in l){m=l[k];if(m==null||g.isFunction(m)||k in c||(/scrollbar/).test(k)||(!(/color/i).test(k)&&isNaN(parseFloat(m)))){delete l[k]}}return l}function h(k,m){var n={_:0},l;for(l in m){if(k[l]!=m[l]){n[l]=m[l]}}return n}g.effects.animateClass=function(k,l,n,m){if(g.isFunction(n)){m=n;n=null}return this.each(function(){var r=g(this),o=r.attr("style")||" ",s=b(f.call(this)),q,p=r.attr("className");g.each(e,function(t,u){if(k[u]){r[u+"Class"](k[u])}});q=b(f.call(this));r.attr("className",p);r.animate(h(s,q),l,n,function(){g.each(e,function(t,u){if(k[u]){r[u+"Class"](k[u])}});if(typeof r.attr("style")=="object"){r.attr("style").cssText="";r.attr("style").cssText=o}else{r.attr("style",o)}if(m){m.apply(this,arguments)}})})};g.fn.extend({_addClass:g.fn.addClass,addClass:function(l,k,n,m){return k?g.effects.animateClass.apply(this,[{add:l},k,n,m]):this._addClass(l)},_removeClass:g.fn.removeClass,removeClass:function(l,k,n,m){return k?g.effects.animateClass.apply(this,[{remove:l},k,n,m]):this._removeClass(l)},_toggleClass:g.fn.toggleClass,toggleClass:function(m,l,k,o,n){if(typeof l=="boolean"||l===undefined){if(!k){return this._toggleClass(m,l)}else{return g.effects.animateClass.apply(this,[(l?{add:m}:{remove:m}),k,o,n])}}else{return g.effects.animateClass.apply(this,[{toggle:m},l,k,o])}},switchClass:function(k,m,l,o,n){return g.effects.animateClass.apply(this,[{add:m,remove:k},l,o,n])}});g.extend(g.effects,{version:"1.8",save:function(l,m){for(var k=0;k<m.length;k++){if(m[k]!==null){l.data("ec.storage."+m[k],l[0].style[m[k]])}}},restore:function(l,m){for(var k=0;k<m.length;k++){if(m[k]!==null){l.css(m[k],l.data("ec.storage."+m[k]))}}},setMode:function(k,l){if(l=="toggle"){l=k.is(":hidden")?"show":"hide"}return l},getBaseline:function(l,m){var n,k;switch(l[0]){case"top":n=0;break;case"middle":n=0.5;break;case"bottom":n=1;break;default:n=l[0]/m.height}switch(l[1]){case"left":k=0;break;case"center":k=0.5;break;case"right":k=1;break;default:k=l[1]/m.width}return{x:k,y:n}},createWrapper:function(k){if(k.parent().is(".ui-effects-wrapper")){return k.parent()}var l={width:k.outerWidth(true),height:k.outerHeight(true),"float":k.css("float")},m=g("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});k.wrap(m);m=k.parent();if(k.css("position")=="static"){m.css({position:"relative"});k.css({position:"relative"})}else{g.extend(l,{position:k.css("position"),zIndex:k.css("z-index")});g.each(["top","left","bottom","right"],function(n,o){l[o]=k.css(o);if(isNaN(parseInt(l[o],10))){l[o]="auto"}});k.css({position:"relative",top:0,left:0})}return m.css(l).show()},removeWrapper:function(k){if(k.parent().is(".ui-effects-wrapper")){return k.parent().replaceWith(k)}return k},setTransition:function(l,n,k,m){m=m||{};g.each(n,function(p,o){unit=l.cssUnit(o);if(unit[0]>0){m[o]=unit[0]*k+unit[1]}});return m}});function d(l,k,m,n){if(typeof l=="object"){n=k;m=null;k=l;l=k.effect}if(g.isFunction(k)){n=k;m=null;k={}}if(g.isFunction(m)){n=m;m=null}if(typeof k=="number"||g.fx.speeds[k]){n=m;m=k;k={}}k=k||{};m=m||k.duration;m=g.fx.off?0:typeof m=="number"?m:g.fx.speeds[m]||g.fx.speeds._default;n=n||k.complete;return[l,k,m,n]}g.fn.extend({effect:function(n,m,p,q){var l=d.apply(this,arguments),o={options:l[1],duration:l[2],callback:l[3]},k=g.effects[n];return k&&!g.fx.off?k.call(this,o):this},_show:g.fn.show,show:function(l){if(!l||typeof l=="number"||g.fx.speeds[l]){return this._show.apply(this,arguments)}else{var k=d.apply(this,arguments);k[1].mode="show";return this.effect.apply(this,k)}},_hide:g.fn.hide,hide:function(l){if(!l||typeof l=="number"||g.fx.speeds[l]){return this._hide.apply(this,arguments)}else{var k=d.apply(this,arguments);k[1].mode="hide";return this.effect.apply(this,k)}},__toggle:g.fn.toggle,toggle:function(l){if(!l||typeof l=="number"||g.fx.speeds[l]||typeof l=="boolean"||g.isFunction(l)){return this.__toggle.apply(this,arguments)}else{var k=d.apply(this,arguments);k[1].mode="toggle";return this.effect.apply(this,k)}},cssUnit:function(k){var l=this.css(k),m=[];g.each(["em","px","%","pt"],function(n,o){if(l.indexOf(o)>0){m=[parseFloat(l),o]}});return m}});g.easing.jswing=g.easing.swing;g.extend(g.easing,{def:"easeOutQuad",swing:function(l,m,k,o,n){return g.easing[g.easing.def](l,m,k,o,n)},easeInQuad:function(l,m,k,o,n){return o*(m/=n)*m+k},easeOutQuad:function(l,m,k,o,n){return -o*(m/=n)*(m-2)+k},easeInOutQuad:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m+k}return -o/2*((--m)*(m-2)-1)+k},easeInCubic:function(l,m,k,o,n){return o*(m/=n)*m*m+k},easeOutCubic:function(l,m,k,o,n){return o*((m=m/n-1)*m*m+1)+k},easeInOutCubic:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m*m+k}return o/2*((m-=2)*m*m+2)+k},easeInQuart:function(l,m,k,o,n){return o*(m/=n)*m*m*m+k},easeOutQuart:function(l,m,k,o,n){return -o*((m=m/n-1)*m*m*m-1)+k},easeInOutQuart:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m*m*m+k}return -o/2*((m-=2)*m*m*m-2)+k},easeInQuint:function(l,m,k,o,n){return o*(m/=n)*m*m*m*m+k},easeOutQuint:function(l,m,k,o,n){return o*((m=m/n-1)*m*m*m*m+1)+k},easeInOutQuint:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m*m*m*m+k}return o/2*((m-=2)*m*m*m*m+2)+k},easeInSine:function(l,m,k,o,n){return -o*Math.cos(m/n*(Math.PI/2))+o+k},easeOutSine:function(l,m,k,o,n){return o*Math.sin(m/n*(Math.PI/2))+k},easeInOutSine:function(l,m,k,o,n){return -o/2*(Math.cos(Math.PI*m/n)-1)+k},easeInExpo:function(l,m,k,o,n){return(m==0)?k:o*Math.pow(2,10*(m/n-1))+k},easeOutExpo:function(l,m,k,o,n){return(m==n)?k+o:o*(-Math.pow(2,-10*m/n)+1)+k},easeInOutExpo:function(l,m,k,o,n){if(m==0){return k}if(m==n){return k+o}if((m/=n/2)<1){return o/2*Math.pow(2,10*(m-1))+k}return o/2*(-Math.pow(2,-10*--m)+2)+k},easeInCirc:function(l,m,k,o,n){return -o*(Math.sqrt(1-(m/=n)*m)-1)+k},easeOutCirc:function(l,m,k,o,n){return o*Math.sqrt(1-(m=m/n-1)*m)+k},easeInOutCirc:function(l,m,k,o,n){if((m/=n/2)<1){return -o/2*(Math.sqrt(1-m*m)-1)+k}return o/2*(Math.sqrt(1-(m-=2)*m)+1)+k},easeInElastic:function(l,n,k,u,r){var o=1.70158;var q=0;var m=u;if(n==0){return k}if((n/=r)==1){return k+u}if(!q){q=r*0.3}if(m<Math.abs(u)){m=u;var o=q/4}else{var o=q/(2*Math.PI)*Math.asin(u/m)}return -(m*Math.pow(2,10*(n-=1))*Math.sin((n*r-o)*(2*Math.PI)/q))+k},easeOutElastic:function(l,n,k,u,r){var o=1.70158;var q=0;var m=u;if(n==0){return k}if((n/=r)==1){return k+u}if(!q){q=r*0.3}if(m<Math.abs(u)){m=u;var o=q/4}else{var o=q/(2*Math.PI)*Math.asin(u/m)}return m*Math.pow(2,-10*n)*Math.sin((n*r-o)*(2*Math.PI)/q)+u+k},easeInOutElastic:function(l,n,k,u,r){var o=1.70158;var q=0;var m=u;if(n==0){return k}if((n/=r/2)==2){return k+u}if(!q){q=r*(0.3*1.5)}if(m<Math.abs(u)){m=u;var o=q/4}else{var o=q/(2*Math.PI)*Math.asin(u/m)}if(n<1){return -0.5*(m*Math.pow(2,10*(n-=1))*Math.sin((n*r-o)*(2*Math.PI)/q))+k}return m*Math.pow(2,-10*(n-=1))*Math.sin((n*r-o)*(2*Math.PI)/q)*0.5+u+k},easeInBack:function(l,m,k,p,o,n){if(n==undefined){n=1.70158}return p*(m/=o)*m*((n+1)*m-n)+k},easeOutBack:function(l,m,k,p,o,n){if(n==undefined){n=1.70158}return p*((m=m/o-1)*m*((n+1)*m+n)+1)+k},easeInOutBack:function(l,m,k,p,o,n){if(n==undefined){n=1.70158}if((m/=o/2)<1){return p/2*(m*m*(((n*=(1.525))+1)*m-n))+k}return p/2*((m-=2)*m*(((n*=(1.525))+1)*m+n)+2)+k},easeInBounce:function(l,m,k,o,n){return o-g.easing.easeOutBounce(l,n-m,0,o,n)+k},easeOutBounce:function(l,m,k,o,n){if((m/=n)<(1/2.75)){return o*(7.5625*m*m)+k}else{if(m<(2/2.75)){return o*(7.5625*(m-=(1.5/2.75))*m+0.75)+k}else{if(m<(2.5/2.75)){return o*(7.5625*(m-=(2.25/2.75))*m+0.9375)+k}else{return o*(7.5625*(m-=(2.625/2.75))*m+0.984375)+k}}}},easeInOutBounce:function(l,m,k,o,n){if(m<n/2){return g.easing.easeInBounce(l,m*2,0,o,n)*0.5+k}return g.easing.easeOutBounce(l,m*2-n,0,o,n)*0.5+o*0.5+k}})})(jQuery);;/*
 * jQuery UI Effects Highlight 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a){a.effects.highlight=function(b){return this.queue(function(){var d=a(this),c=["backgroundImage","backgroundColor","opacity"],f=a.effects.setMode(d,b.options.mode||"show"),e={backgroundColor:d.css("backgroundColor")};if(f=="hide"){e.opacity=0}a.effects.save(d,c);d.show().css({backgroundImage:"none",backgroundColor:b.options.color||"#ffff99"}).animate(e,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){(f=="hide"&&d.hide());a.effects.restore(d,c);(f=="show"&&!a.support.opacity&&this.style.removeAttribute("filter"));(b.callback&&b.callback.apply(this,arguments));d.dequeue()}})})}})(jQuery);;;/*!
* jquery.qtip. The jQuery tooltip plugin
*
* Copyright (c) 2009 Craig Thompson
* http://craigsworks.com
*
* Licensed under MIT
* http://www.opensource.org/licenses/mit-license.php
*
* Launch  : February 2009
* Version : 1.0.0-rc3
* Released: Tuesday 12th May, 2009 - 00:00
* Debug: jquery.qtip.debug.js
*/

"use strict"; // Enable ECMAScript "strict" operation for this function. See more: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
/*jslint browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */

/*global window: false, jQuery: false */
(function ($) {
	// Assign cache and event initialisation on document load
	$(document).ready(function () {
		// Adjust positions of the tooltips on window resize or scroll if enabled
		var i;
		$(window).bind('resize scroll', function (event) {
			for (i = 0; i < $.fn.qtip.interfaces.length; i++) {
				// Access current elements API
				var api = $.fn.qtip.interfaces[i];

				// Update position if resize or scroll adjustments are enabled
				if(api && api.status && api.status.rendered && api.options.position.type !== 'static' && api.elements.tooltip.is(':visible') &&
				(api.options.position.adjust.scroll && event.type === 'scroll' || api.options.position.adjust.resize && event.type === 'resize')) {
					// Queue the animation so positions are updated correctly
					api.updatePosition(event, true);
				}
			}
		});

		// Hide unfocus toolipts on document mousedown
		$(document).bind('mouseenter.qtip', function (event) {
			if($(event.target).parents('div.qtip').length === 0) {
				var tooltip = $('.qtipSelector'),
					api = tooltip.qtip('api');

				// Only hide if its visible and not the tooltips target
				if(tooltip.is(':visible') && api && api.status && !api.status.disabled && $(event.target).add(api.elements.target).length > 1) { api.hide(event); }
			}
		});
	});

	// Corner object parser
	function Corner(corner) {
		if(!corner){ return false; }

		this.x = String(corner).replace(/middle/i, 'center').match(/left|right|center/i)[0].toLowerCase();
		this.y = String(corner).replace(/middle/i, 'center').match(/top|bottom|center/i)[0].toLowerCase();
		this.offset = { left: 0, top: 0 };
		this.precedance = (corner.charAt(0).search(/^(t|b)/) > -1) ? 'y' : 'x';
		this.string = function(){ return (this.precedance === 'y') ? this.y+this.x : this.x+this.y; };
	}

	// Tip coordinates calculator
	function calculateTip(corner, width, height) {
		// Define tip coordinates in terms of height and width values
		var tips = {
			bottomright: [[0, 0], [width, height], [width, 0]],
			bottomleft: [[0, 0], [width, 0], [0, height]],
			topright: [[0, height], [width, 0], [width, height]],
			topleft: [[0, 0], [0, height], [width, height]],
			topcenter: [[0, height], [width / 2, 0], [width, height]],
			bottomcenter: [[0, 0], [width, 0], [width / 2, height]],
			rightcenter: [[0, 0], [width, height / 2], [0, height]],
			leftcenter: [[width, 0], [width, height], [0, height / 2]]
		};
		tips.lefttop = tips.bottomright;
		tips.righttop = tips.bottomleft;
		tips.leftbottom = tips.topright;
		tips.rightbottom = tips.topleft;

		return tips[corner];
	}

	// Border coordinates calculator
	function calculateBorders(radius) {
		var borders;

		// Use canvas element if supported
		if($('<canvas />').get(0).getContext) {
			borders = {
				topLeft: [radius, radius],
				topRight: [0, radius],
				bottomLeft: [radius, 0],
				bottomRight: [0, 0]
			};
		}

		// Canvas not supported - Use VML (IE)
		else if($.browser.msie) {
			borders = {
				topLeft: [-90, 90, 0],
				topRight: [-90, 90, -radius],
				bottomLeft: [90, 270, 0],
				bottomRight: [90, 270, -radius]
			};
		}

		return borders;
	}


	// Build a jQuery style object from supplied style object
	function jQueryStyle(style, sub) {
		var styleObj, i;

		styleObj = $.extend(true, {}, style);
		for (i in styleObj) {
			if(sub === true && (/(tip|classes)/i).test(i)) { delete styleObj[i]; }
			else if(!sub && (/(width|border|tip|title|classes|user)/i).test(i)) { delete styleObj[i]; }
		}

		return styleObj;
	}

	// Sanitize styles
	function sanitizeStyle(style) {
		if(typeof style.tip !== 'object') {
			style.tip = { corner: style.tip };
		}
		if(typeof style.tip.size !== 'object') {
			style.tip.size = {
				width: style.tip.size,
				height: style.tip.size
			};
		}
		if(typeof style.border !== 'object') {
			style.border = {
				width: style.border
			};
		}
		if(typeof style.width !== 'object') {
			style.width = {
				value: style.width
			};
		}
		if(typeof style.width.max === 'string') { style.width.max = parseInt(style.width.max.replace(/([0-9]+)/i, "$1"), 10); }
		if(typeof style.width.min === 'string') { style.width.min = parseInt(style.width.min.replace(/([0-9]+)/i, "$1"), 10); }

		// Convert deprecated x and y tip values to width/height
		if(typeof style.tip.size.x === 'number') {
			style.tip.size.width = style.tip.size.x;
			delete style.tip.size.x;
		}
		if(typeof style.tip.size.y === 'number') {
			style.tip.size.height = style.tip.size.y;
			delete style.tip.size.y;
		}

		return style;
	}

	// Build styles recursively with inheritance
	function buildStyle() {
		var self, i, styleArray, styleExtend, finalStyle, ieAdjust;
		self = this;

		// Build style options from supplied arguments
		styleArray = [true, {}];
		for(i = 0; i < arguments.length; i++){ styleArray.push(arguments[i]); }
		styleExtend = [$.extend.apply($, styleArray)];

		// Loop through each named style inheritance
		while(typeof styleExtend[0].name === 'string') {
			// Sanitize style data and append to extend array
			styleExtend.unshift(sanitizeStyle($.fn.qtip.styles[styleExtend[0].name]));
		}

		// Make sure resulting tooltip className represents final style
		styleExtend.unshift(true, {
			classes: {
				tooltip: 'qtip-' + (arguments[0].name || 'defaults')
			}
		}, $.fn.qtip.styles.defaults);

		// Extend into a single style object
		finalStyle = $.extend.apply($, styleExtend);

		// Adjust tip size if needed (IE 1px adjustment bug fix)
		ieAdjust = ($.browser.msie) ? 1 : 0;
		finalStyle.tip.size.width += ieAdjust;
		finalStyle.tip.size.height += ieAdjust;

		// Force even numbers for pixel precision
		if(finalStyle.tip.size.width % 2 > 0) { finalStyle.tip.size.width += 1; }
		if(finalStyle.tip.size.height % 2 > 0) { finalStyle.tip.size.height += 1; }

		// Sanitize final styles tip corner value
		if(finalStyle.tip.corner === true) {
			if(self.options.position.corner.tooltip === 'center' && self.options.position.corner.target === 'center') {
				finalStyle.tip.corner = false;
			}
			else {
				finalStyle.tip.corner = self.options.position.corner.tooltip;
			}
		}

		return finalStyle;
	}

	// Border canvas draw method
	function drawBorder(canvas, coordinates, radius, color) {
		// Create corner
		var context = canvas.get(0).getContext('2d');
		context.fillStyle = color;
		context.beginPath();
		context.arc(coordinates[0], coordinates[1], radius, 0, Math.PI * 2, false);
		context.fill();
	}

	// Create borders using canvas and VML
	function createBorder() {
		var self, i, width, radius, color, coordinates, containers, size, betweenWidth, betweenCorners, borderTop, borderBottom, borderCoord, sideWidth, vertWidth;
		self = this;

		// Destroy previous border elements, if present
		self.elements.wrapper.find('.qtip-borderBottom, .qtip-borderTop').remove();

		// Setup local variables
		width = self.options.style.border.width;
		radius = self.options.style.border.radius;
		color = self.options.style.border.color || self.options.style.tip.color;

		// Calculate border coordinates
		coordinates = calculateBorders(radius);

		// Create containers for the border shapes
		containers = {};
		for (i in coordinates) {
			// Create shape container
			containers[i] = '<div rel="' + i + '" style="' + ((/Left/).test(i) ? 'left' : 'right') + ':0; ' + 'position:absolute; height:' + radius + 'px; width:' + radius + 'px; overflow:hidden; line-height:0.1px; font-size:1px">';

			// Canvas is supported
			if($('<canvas />').get(0).getContext) { containers[i] += '<canvas height="' + radius + '" width="' + radius + '" style="vertical-align: top"></canvas>'; }

			// No canvas, but if it's IE use VML
			else if($.browser.msie) {
				size = radius * 2 + 3;
				containers[i] += '<v:arc stroked="false" fillcolor="' + color + '" startangle="' + coordinates[i][0] + '" endangle="' + coordinates[i][1] + '" ' + 'style="width:' + size + 'px; height:' + size + 'px; margin-top:' + ((/bottom/).test(i) ? -2 : -1) + 'px; ' + 'margin-left:' + ((/Right/).test(i) ? coordinates[i][2] - 3.5 : -1) + 'px; ' + 'vertical-align:top; display:inline-block; behavior:url(#default#VML)"></v:arc>';

			}

			containers[i] += '</div>';
		}

		// Create between corners elements
		betweenWidth = self.getDimensions().width - (Math.max(width, radius) * 2);
		betweenCorners = '<div class="qtip-betweenCorners" style="height:' + radius + 'px; width:' + betweenWidth + 'px; ' + 'overflow:hidden; background-color:' + color + '; line-height:0.1px; font-size:1px;">';

		// Create top border container
		borderTop = '<div class="qtip-borderTop" dir="ltr" style="height:' + radius + 'px; ' + 'margin-left:' + radius + 'px; line-height:0.1px; font-size:1px; padding:0;">' + containers.topLeft + containers.topRight + betweenCorners;
		self.elements.wrapper.prepend(borderTop);

		// Create bottom border container
		borderBottom = '<div class="qtip-borderBottom" dir="ltr" style="height:' + radius + 'px; ' + 'margin-left:' + radius + 'px; line-height:0.1px; font-size:1px; padding:0;">' + containers.bottomLeft + containers.bottomRight + betweenCorners;
		self.elements.wrapper.append(borderBottom);

		// Draw the borders if canvas were used (Delayed til after DOM creation)
		if($('<canvas />').get(0).getContext) {
			self.elements.wrapper.find('canvas').each(function () {
				borderCoord = coordinates[$(this).parent('[rel]:first').attr('rel')];
				drawBorder.call(self, $(this), borderCoord, radius, color);
			});
		}

		// Create a phantom VML element (IE won't show the last created VML element otherwise)
		else if($.browser.msie) { self.elements.tooltip.append('<v:image style="behavior:url(#default#VML);"></v:image>'); }

		// Setup contentWrapper border
		sideWidth = Math.max(radius, (radius + (width - radius)));
		vertWidth = Math.max(width - radius, 0);
		self.elements.contentWrapper.css({
			border: '0px solid ' + color,
			borderWidth: vertWidth + 'px ' + sideWidth + 'px'
		});
	}

	// Canvas tip drawing method
	function drawTip(canvas, coordinates, color) {
		// Setup properties
		var context = canvas.get(0).getContext('2d');
		context.fillStyle = color;

		// Create tip
		context.beginPath();
		context.moveTo(coordinates[0][0], coordinates[0][1]);
		context.lineTo(coordinates[1][0], coordinates[1][1]);
		context.lineTo(coordinates[2][0], coordinates[2][1]);
		context.fill();
	}

	function positionTip(corner) {
		var self, ieAdjust, positionAdjust, paddingCorner, paddingSize, newMargin;
		self = this;

		// Return if tips are disabled or tip is not yet rendered
		if(self.options.style.tip.corner === false || !self.elements.tip) { return; }
		if(!corner) { corner = new Corner(self.elements.tip.attr('rel')); }

		// Setup adjustment variables
		ieAdjust = positionAdjust = ($.browser.msie) ? 1 : 0;

		// Set initial position
		self.elements.tip.css(corner[corner.precedance], 0);

		// Set position of tip to correct side
		if(corner.precedance === 'y') {
			// Adjustments for IE6 - 0.5px border gap bug
			if($.browser.msie) {
				if(parseInt($.browser.version.charAt(0), 10) === 6) { positionAdjust = corner.y === 'top' ? -3 : 1; }
				else { positionAdjust = corner.y === 'top' ? 1 : 2; }
			}

			if(corner.x === 'center') {
				self.elements.tip.css({
					left: '50%',
					marginLeft: -(self.options.style.tip.size.width / 2)
				});
			}
			else if(corner.x === 'left') {
				self.elements.tip.css({
					left: self.options.style.border.radius - ieAdjust
				});
			}
			else {
				self.elements.tip.css({
					right: self.options.style.border.radius + ieAdjust
				});
			}

			if(corner.y === 'top') {
				self.elements.tip.css({
					top: -positionAdjust
				});
			}
			else {
				self.elements.tip.css({
					bottom: positionAdjust
				});
			}

		}
		else {
			// Adjustments for IE6 - 0.5px border gap bug
			if($.browser.msie) {
				positionAdjust = (parseInt($.browser.version.charAt(0), 10) === 6) ? 1 : (corner.x === 'left' ? 1 : 2);
			}

			if(corner.y === 'center') {
				self.elements.tip.css({
					top: '50%',
					marginTop: -(self.options.style.tip.size.height / 2)
				});
			}
			else if(corner.y === 'top') {
				self.elements.tip.css({
					top: self.options.style.border.radius - ieAdjust
				});
			}
			else {
				self.elements.tip.css({
					bottom: self.options.style.border.radius + ieAdjust
				});
			}

			if(corner.x === 'left') {
				self.elements.tip.css({
					left: -positionAdjust
				});
			}
			else {
				self.elements.tip.css({
					right: positionAdjust
				});
			}
		}

		// Adjust tooltip padding to compensate for tip
		paddingCorner = 'padding-' + corner[corner.precedance];
		paddingSize = self.options.style.tip.size[corner.precedance === 'x' ? 'width' : 'height'];
		self.elements.tooltip.css('padding', 0).css(paddingCorner, paddingSize);

		// Match content margin to prevent gap bug in IE6 ONLY
		if($.browser.msie && parseInt($.browser.version.charAt(0), 6) === 6) {
			newMargin = parseInt(self.elements.tip.css('margin-top'), 10) || 0;
			newMargin += parseInt(self.elements.content.css('margin-top'), 10) || 0;

			self.elements.tip.css({ marginTop: newMargin });
		}
	}

	// Create tip using canvas and VML
	function createTip(corner) {
		var self, color, coordinates, coordsize, path, tip;
		self = this;

		// Destroy previous tip, if there is one
		if(self.elements.tip !== null) { self.elements.tip.remove(); }

		// Setup color and corner values
		color = self.options.style.tip.color || self.options.style.border.color;
		if(self.options.style.tip.corner === false) { return; }
		else if(!corner) { corner = new Corner(self.options.style.tip.corner); }

		// Calculate tip coordinates
		coordinates = calculateTip(corner.string(), self.options.style.tip.size.width, self.options.style.tip.size.height);

		// Create tip element
		self.elements.tip = '<div class="' + self.options.style.classes.tip + '" dir="ltr" rel="' + corner.string() + '" style="position:absolute; ' + 'height:' + self.options.style.tip.size.height + 'px; width:' + self.options.style.tip.size.width + 'px; ' + 'margin:0 auto; line-height:0.1px; font-size:1px;"></div>';

		// Attach new tip to tooltip element
		self.elements.tooltip.prepend(self.elements.tip);

		// Use canvas element if supported
		if($('<canvas />').get(0).getContext) { tip = '<canvas height="' + self.options.style.tip.size.height + '" width="' + self.options.style.tip.size.width + '"></canvas>'; }

		// Canvas not supported - Use VML (IE)
		else if($.browser.msie) {
			// Create coordize and tip path using tip coordinates
			coordsize = self.options.style.tip.size.width + ',' + self.options.style.tip.size.height;
			path = 'm' + coordinates[0][0] + ',' + coordinates[0][1];
			path += ' l' + coordinates[1][0] + ',' + coordinates[1][1];
			path += ' ' + coordinates[2][0] + ',' + coordinates[2][1];
			path += ' xe';

			// Create VML element
			tip = '<v:shape fillcolor="' + color + '" stroked="false" filled="true" path="' + path + '" coordsize="' + coordsize + '" ' + 'style="width:' + self.options.style.tip.size.width + 'px; height:' + self.options.style.tip.size.height + 'px; ' + 'line-height:0.1px; display:inline-block; behavior:url(#default#VML); ' + 'vertical-align:' + (corner.y === 'top' ? 'bottom' : 'top') + '"></v:shape>';

			// Create a phantom VML element (IE won't show the last created VML element otherwise)
			tip += '<v:image style="behavior:url(#default#VML);"></v:image>';

			// Prevent tooltip appearing above the content (IE z-index bug)
			self.elements.contentWrapper.css('position', 'relative');
		}

		// Create element reference and append vml/canvas
		self.elements.tip = self.elements.tooltip.find('.' + self.options.style.classes.tip).eq(0);
		self.elements.tip.html(tip);

		// Draw the canvas tip (Delayed til after DOM creation)
		if($('<canvas  />').get(0).getContext) { drawTip.call(self, self.elements.tip.find('canvas:first'), coordinates, color); }

		// Fix IE small tip bug
		if(corner.y === 'top' && $.browser.msie && parseInt($.browser.version.charAt(0), 10) === 6) {
			self.elements.tip.css({
				marginTop: -4
			});
		}

		// Set the tip position
		positionTip.call(self, corner);
	}

	// Create title bar for content
	function createTitle() {
		var self = this;

		// Destroy previous title element, if present
		if(self.elements.title !== null) { self.elements.title.remove(); }

		// Append new ARIA attribute to tooltip
		self.elements.tooltip.attr('aria-labelledby', 'qtip-' + self.id + '-title');

		// Create title element
		self.elements.title = $('<div id="qtip-' + self.id + '-title" class="' + self.options.style.classes.title + '"></div>').css(jQueryStyle(self.options.style.title, true)).css({
			zoom: ($.browser.msie) ? 1 : 0
		}).prependTo(self.elements.contentWrapper);

		// Update title with contents if enabled
		if(self.options.content.title.text) { self.updateTitle.call(self, self.options.content.title.text); }

		// Create title close buttons if enabled
		if(self.options.content.title.button !== false && typeof self.options.content.title.button === 'string') {
			self.elements.button = $('<a class="' + self.options.style.classes.button + '" role="button" style="float:right; position: relative"></a>').css(jQueryStyle(self.options.style.button, true)).html(self.options.content.title.button).prependTo(self.elements.title).click(function (event) {
				if(!self.status.disabled) { self.hide(event); }
			});
		}
	}

	// Assign hide and show events
	function assignEvents() {
		var self, showTarget, hideTarget, inactiveEvents;
		self = this;

		// Setup event target variables
		showTarget = self.options.show.when.target;
		hideTarget = self.options.hide.when.target;

		// Add tooltip as a hideTarget is its fixed
		if(self.options.hide.fixed) { hideTarget = hideTarget.add(self.elements.tooltip); }

		// Define events which reset the 'inactive' event handler
		inactiveEvents = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove',
							'mouseout', 'mouseenter', 'mouseleave', 'mouseover'];

		// Define 'inactive' event timer method
		function inactiveMethod(event) {
			if(self.status.disabled === true) { return; }

			//Clear and reset the timer
			clearTimeout(self.timers.inactive);
			self.timers.inactive = setTimeout(function () {
				// Unassign 'inactive' events
				$(inactiveEvents).each(function () {
					hideTarget.unbind(this + '.qtip-inactive');
					self.elements.content.unbind(this + '.qtip-inactive');
				});

				// Hide the tooltip
				self.hide(event);
			}, self.options.hide.delay);
		}

		// Check if the tooltip is 'fixed'
		if(self.options.hide.fixed === true) {
			self.elements.tooltip.bind('mouseover.qtip', function () {
				if(self.status.disabled === true) { return; }

				// Reset the hide timer
				clearTimeout(self.timers.hide);
			});
		}

		// Define show event method
		function showMethod(event) {
			if(self.status.disabled === true) { return; }

			// If set, hide tooltip when inactive for delay period
			if(self.options.hide.when.event === 'inactive') {
				// Assign each reset event
				$(inactiveEvents).each(function () {
					hideTarget.bind(this + '.qtip-inactive', inactiveMethod);
					self.elements.content.bind(this + '.qtip-inactive', inactiveMethod);
				});

				// Start the inactive timer
				inactiveMethod();
			}

			// Clear hide timers
			clearTimeout(self.timers.show);
			clearTimeout(self.timers.hide);

			// Start show timer
			if(self.options.show.delay > 0) {
				self.timers.show = setTimeout(function () {
					self.show(event);
				}, self.options.show.delay);
			}
			else {
				self.show(event);
			}
		}

		// Define hide event method
		function hideMethod(event) {
			if(self.status.disabled === true) { return; }

			// Prevent hiding if tooltip is fixed and event target is the tooltip
			if(self.options.hide.fixed === true && (/mouse(out|leave)/i).test(self.options.hide.when.event) && $(event.relatedTarget).parents('div.qtip[id^="qtip"]').length > 0) {
				// Prevent default and popagation
				event.stopPropagation();
				event.preventDefault();

				// Reset the hide timer
				clearTimeout(self.timers.hide);
				return false;
			}

			// Clear timers and stop animation queue
			clearTimeout(self.timers.show);
			clearTimeout(self.timers.hide);
			self.elements.tooltip.stop(true, true);

			// If tooltip has displayed, start hide timer
			self.timers.hide = setTimeout(function () {
				self.hide(event);
			}, self.options.hide.delay);
		}

		// If mouse is the target, update tooltip position on mousemove
		if(self.options.position.target === 'mouse' && self.options.position.type !== 'static') {
			showTarget.bind('mousemove.qtip', function (event) {
				// Set the new mouse positions if adjustment is enabled
				self.cache.mouse = {
					left: event.pageX,
					top: event.pageY
				};

				// Update the tooltip position only if the tooltip is visible and adjustment is enabled
				if(self.status.disabled === false && self.options.position.adjust.mouse === true && self.options.position.type !== 'static' && self.elements.tooltip.css('display') !== 'none') {
					self.updatePosition(event);
				}
			});
		}

		// Both events and targets are identical, apply events using a toggle
		if((self.options.show.when.target.add(self.options.hide.when.target).length === 1 &&
		self.options.show.when.event === self.options.hide.when.event && self.options.hide.when.event !== 'inactive') ||
		self.options.hide.when.event === 'unfocus') {
			self.cache.toggle = 0;
			// Use a toggle to prevent hide/show conflicts
			showTarget.bind(self.options.show.when.event + '.qtip', function (event) {
				if(self.cache.toggle === 0) { showMethod(event); }
				else { hideMethod(event); }
			});
		}

		// Events are not identical, bind normally
		else {
			showTarget.bind(self.options.show.when.event + '.qtip', showMethod);

			// If the hide event is not 'inactive', bind the hide method
			if(self.options.hide.when.event !== 'inactive') { hideTarget.bind(self.options.hide.when.event + '.qtip', hideMethod); }
		}

		// Focus the tooltip on mouseover
		if((/(fixed|absolute)/).test(self.options.position.type)) { self.elements.tooltip.bind('mouseover.qtip', self.focus); }
	}

	// BGIFRAME JQUERY PLUGIN ADAPTION
	//   Special thanks to Brandon Aaron for this plugin
	//   http://plugins.jquery.com/project/bgiframe
	function bgiframe() {
		var self, html, dimensions;
		self = this;
		dimensions = self.getDimensions();

		// Setup iframe HTML string
		html = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:false" ' + 'style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=\'0\'); border: 1px solid red; ' + 'height:' + dimensions.height + 'px; width:' + dimensions.width + 'px" />';

		// Append the new HTML and setup element reference
		self.elements.bgiframe = self.elements.wrapper.prepend(html).children('.qtip-bgiframe:first');
	}

	// Define primary construct function
	function construct() {
		var self, content, url, data, method;
		self = this;

		// Call API method
		self.beforeRender.call(self);

		// Set rendered status to true
		self.status.rendered = 2;

		// Create initial tooltip elements
		self.elements.tooltip = '<div qtip="' + self.id + '" id="qtip-' + self.id + '" role="tooltip" ' + 'aria-describedby="qtip-' + self.id + '-content" class="qtip ' + (self.options.style.classes.tooltip || self.options.style) + '" ' + 'style="display:none; -moz-border-radius:0; -webkit-border-radius:0; border-radius:0; position:' + self.options.position.type + ';"> ' + '  <div class="qtip-wrapper" style="position:relative; overflow:hidden; text-align:left;"> ' + '    <div class="qtip-contentWrapper" style="overflow:hidden;"> ' + '       <div id="qtip-' + self.id + '-content" class="qtip-content ' + self.options.style.classes.content + '"></div> ' + '</div></div></div>';

		// Append to container element
		self.elements.tooltip = $(self.elements.tooltip);
		self.elements.tooltip.appendTo(self.options.position.container);

		// Setup tooltip qTip data
		self.elements.tooltip.data('qtip', {
			current: 0,
			interfaces: [self]
		});

		// Setup element references
		self.elements.wrapper = self.elements.tooltip.children('div:first');
		self.elements.contentWrapper = self.elements.wrapper.children('div:first');
		self.elements.content = self.elements.contentWrapper.children('div:first').css(jQueryStyle(self.options.style));

		// Apply IE hasLayout fix to wrapper and content elements
		if($.browser.msie) { self.elements.wrapper.add(self.elements.content).css({ zoom: 1 }); }

		// Setup tooltip attributes
		if(self.options.hide.when.event === 'unfocus') { self.elements.tooltip.attr('unfocus', true); }

		// If an explicit width is set, updateWidth prior to setting content to prevent dirty rendering
		if(typeof self.options.style.width.value === 'number') { self.updateWidth(); }

		// Create borders and tips if supported by the browser
		if($('<canvas />').get(0).getContext || $.browser.msie) {
			// Create border
			if(self.options.style.border.radius > 0) { createBorder.call(self); }
			else {
				self.elements.contentWrapper.css({
					border: self.options.style.border.width + 'px solid ' + self.options.style.border.color
				});
			}

			// Create tip if enabled
			if(self.options.style.tip.corner !== false) { createTip.call(self); }
		}

		// Neither canvas or VML is supported, tips and borders cannot be drawn!
		else {
			// Set defined border width
			self.elements.contentWrapper.css({
				border: self.options.style.border.width + 'px solid ' + self.options.style.border.color
			});

			// Reset border radius and tip
			self.options.style.border.radius = 0;
			self.options.style.tip.corner = false;
		}

		// Use the provided content string or DOM array
		if((typeof self.options.content.text === 'string' && self.options.content.text.length > 0) || (self.options.content.text.jquery && self.options.content.text.length > 0)) { 
			content = self.options.content.text; 
		}

		// Check for valid title and alt attributes
		else { content = ' '; }

		// Set the tooltips content and create title if enabled
		if(self.options.content.title.text !== false) { createTitle.call(self); }
		self.updateContent(content, false);

		// Assign events and toggle tooltip with focus
		assignEvents.call(self);
		if(self.options.show.ready === true) { self.show(); }

		// Retrieve ajax content if provided
		if(self.options.content.url !== false) {
			url = self.options.content.url;
			data = self.options.content.data;
			method = self.options.content.method || 'get';
			self.loadContent(url, data, method);
		}

		// Call API method and log event
		self.status.rendered = true;
		self.onRender.call(self);
	}

	// Instantiator
	function QTip(target, options, id) {
		// Declare this reference
		var self = this;

		// Setup class attributes
		self.id = id;
		self.options = options;
		self.status = {
			animated: false,
			rendered: false,
			disabled: false,
			focused: false
		};
		self.elements = {
			target: target.addClass(self.options.style.classes.target),
			tooltip: null,
			wrapper: null,
			content: null,
			contentWrapper: null,
			title: null,
			button: null,
			tip: null,
			bgiframe: null
		};
		self.cache = {
			attr: false,
			mouse: {},
			toggle: 0,
			overflow: { left: false, top: false }
		};
		self.timers = {};

		// Define exposed API methods
		$.extend(self, self.options.api, {
			show: function (event) {
				var returned, solo;

				// Make sure tooltip is rendered and if not, return
				if(!self.status.rendered) { return false; }

				// Only continue if element is visible
				if(self.elements.tooltip.css('display') !== 'none') { return self; }

				// Clear animation queue
				self.elements.tooltip.stop(true, false);

				// Call API method and if return value is false, halt
				returned = self.beforeShow.call(self, event);
				if(returned === false) { return self; }

				// Define afterShow callback method
				function afterShow() {
					// Set ARIA hidden status attribute
					self.elements.tooltip.attr('aria-hidden', true);

					// Call API method and focus if it isn't static
					if(self.options.position.type !== 'static') { self.focus(); }
					self.onShow.call(self, event);

					// Prevent antialias from disappearing in IE7 by removing filter and opacity attribute
					if($.browser.msie) { 
						var ieStyle = self.elements.tooltip.get(0).style;
						ieStyle.removeAttribute('filter');
						ieStyle.removeAttribute('opacity');
					}
					else {
						self.elements.tooltip.css({ opacity: '' });
					}
				}

				// Maintain toggle functionality if enabled
				self.cache.toggle = 1;

				// Update tooltip position if it isn't static
				if(self.options.position.type !== 'static') {
					self.updatePosition(event, (self.options.show.effect.length > 0 && self.rendered !== 2));
				}

				// Hide other tooltips if tooltip is solo
				if(typeof self.options.show.solo === 'object') {
					solo = $(self.options.show.solo);
				}
				else if(self.options.show.solo === true) {
					solo = $('div.qtip').not(self.elements.tooltip);
				}
				if(solo) {
					solo.each(function () {
						if($(this).qtip('api').status.rendered === true) { $(this).qtip('api').hide(); }
					});
				}

				// Show tooltip
				if(typeof self.options.show.effect.type === 'function') {
					self.options.show.effect.type.call(self.elements.tooltip, self.options.show.effect.length);
					self.elements.tooltip.queue(function () {
						afterShow();
						$(this).dequeue();
					});
				}
				else {
					switch (self.options.show.effect.type.toLowerCase()) {
						case 'fade':
							self.elements.tooltip.fadeIn(self.options.show.effect.length, afterShow);
						break;

						case 'slide':
							self.elements.tooltip.slideDown(self.options.show.effect.length, function () {
								afterShow();
								if(self.options.position.type !== 'static') { self.updatePosition(event, true); }
							});
						break;

						case 'grow':
							self.elements.tooltip.show(self.options.show.effect.length, afterShow);
						break;

						default:
							self.elements.tooltip.show(null, afterShow);
						break;
					}

					// Add active class to tooltip
					self.elements.tooltip.addClass(self.options.style.classes.active);
				}

				// Log event and return
				return self;
			},

			hide: function (event) {
				var returned;

				// Make sure tooltip is rendered and if not, return
				if(!self.status.rendered) { return false; }

				// Only continue if element is visible
				else if(self.elements.tooltip.css('display') === 'none') { return self; }

				// Stop show timer and animation queue
				clearTimeout(self.timers.show);
				self.elements.tooltip.stop(true, false);

				// Call API method and if return value is false, halt
				returned = self.beforeHide.call(self, event);
				if(returned === false) { return self; }

				// Define afterHide callback method
				function afterHide() {
					// Set ARIA hidden status attribute
					self.elements.tooltip.attr('aria-hidden', true);

					// Remove opacity attribute
					if($.browser.msie) { 
						self.elements.tooltip.get(0).style.removeAttribute('opacity');
					}
					else {
						self.elements.tooltip.css({ opacity: '' });
					}

					// Call API callback
					self.onHide.call(self, event);
				}

				// Maintain toggle functionality if enabled
				self.cache.toggle = 0;

				// Hide tooltip
				if(typeof self.options.hide.effect.type === 'function') {
					self.options.hide.effect.type.call(self.elements.tooltip, self.options.hide.effect.length);
					self.elements.tooltip.queue(function () {
						afterHide();
						$(this).dequeue();
					});
				}
				else {
					switch (self.options.hide.effect.type.toLowerCase()) {
						case 'fade':
							self.elements.tooltip.fadeOut(self.options.hide.effect.length, afterHide);
						break;

						case 'slide':
							self.elements.tooltip.slideUp(self.options.hide.effect.length, afterHide);
						break;

						case 'grow':
							self.elements.tooltip.hide(self.options.hide.effect.length, afterHide);
						break;

						default:
							self.elements.tooltip.hide(null, afterHide);
						break;
					}

					// Remove active class to tooltip
					self.elements.tooltip.removeClass(self.options.style.classes.active);
				}

				// Log event and return
				return self;
			},

			toggle: function (event, state) {
				var condition = /boolean|number/.test(typeof state) ? state : !self.elements.tooltip.is(':visible');

				self[condition ? 'show' : 'hide'](event);

				return self;
			},

			updatePosition: function (event, animate) {
				if(!self.status.rendered) {
					return false;
				}

				var posOptions = options.position,
					target = $(posOptions.target),
					elemWidth = self.elements.tooltip.outerWidth(),
					elemHeight = self.elements.tooltip.outerHeight(),
					targetWidth, targetHeight, position,
					my = posOptions.corner.tooltip,
					at = posOptions.corner.target,
					returned,
					coords, i, mapName, imagePos,
					adapt = {
						left: function () {
							var leftEdge = $(window).scrollLeft(),
								rightEdge = $(window).width() + $(window).scrollLeft(),
								myOffset = my.x === 'center' ? elemWidth/2 : elemWidth,
								atOffset = my.x === 'center' ? targetWidth/2 : targetWidth,
								borderAdjust = (my.x === 'center' ? 1 : 2) * self.options.style.border.radius,
								offset = -2 * posOptions.adjust.x,
								pRight = position.left + elemWidth,
								adj;

							// Cut off by right side of window
							if(pRight > rightEdge) {
								adj = offset - myOffset - atOffset + borderAdjust;

								// Shifting to the left will make whole qTip visible, or will minimize how much is cut off
								if(position.left + adj > leftEdge || leftEdge - (position.left + adj) < pRight - rightEdge) {
									return { adjust: adj, tip: 'right' };
								}
							}
							// Cut off by left side of window
							if(position.left < leftEdge) {
								adj = offset + myOffset + atOffset - borderAdjust;

								// Shifting to the right will make whole qTip visible, or will minimize how much is cut off
								if(pRight + adj < rightEdge || pRight + adj - rightEdge < leftEdge - position.left) {
									return { adjust: adj, tip: 'left' };
								}
							}

							return { adjust: 0, tip: my.x };
						},
						top: function () {
							var topEdge = $(window).scrollTop(),
								bottomEdge = $(window).height() + $(window).scrollTop(),
								myOffset = my.y === 'center' ? elemHeight/2 : elemHeight,
								atOffset = my.y === 'center' ? targetHeight/2 : targetHeight,
								borderAdjust = (my.y === 'center' ? 1 : 2) * self.options.style.border.radius,
								offset = -2 * posOptions.adjust.y,
								pBottom = position.top + elemHeight,
								adj;

							// Cut off by bottom of window
							if(pBottom > bottomEdge) {
								adj = offset - myOffset - atOffset + borderAdjust;

								// Shifting to the top will make whole qTip visible, or will minimize how much is cut off
								if(position.top + adj > topEdge || topEdge - (position.top + adj) < pBottom - bottomEdge) {
									return { adjust: adj, tip: 'bottom' };
								}
							}
							// Cut off by top of window
							if(position.top < topEdge) {
								adj = offset + myOffset + atOffset - borderAdjust;

								// Shifting to the top will make whole qTip visible, or will minimize how much is cut off
								if(pBottom + adj < bottomEdge || pBottom + adj - bottomEdge < topEdge - position.top) {
									return { adjust: adj, tip: 'top' };
								}
							}

							return { adjust: 0, tip: my.y };
						}
					};

				if(event && options.position.target === 'mouse') {
					// Force left top to allow flipping
					at = { x: 'left', y: 'top' };
					targetWidth = targetHeight = 0;
					
					// Use cached mouse coordiantes if not available
					if(!event.pageX) {
						position = self.cache.mouse;
					}
					else {
						position = {
							top: event.pageY,
							left: event.pageX
						};
					}
				}
				else {
					if(target[0] === document) {
						targetWidth = target.width();
						targetHeight = target.height();
						position = { top: 0, left: 0 };
					}
					else if(target[0] === window) {
						targetWidth = target.width();
						targetHeight = target.height();
						position = {
							top: target.scrollTop(),
							left: target.scrollLeft()
						};
					}
					else if(target.is('area')) {
						// Retrieve coordinates from coords attribute and parse into integers
						coords = self.options.position.target.attr('coords').split(',');
						for(i = 0; i < coords.length; i++) { coords[i] = parseInt(coords[i], 10); }

						// Setup target position object
						mapName = self.options.position.target.parent('map').attr('name');
						imagePos = $('img[usemap="#' + mapName + '"]:first').offset();
						position = {
							left: Math.floor(imagePos.left + coords[0]),
							top: Math.floor(imagePos.top + coords[1])
						};

						// Determine width and height of the area
						switch (self.options.position.target.attr('shape').toLowerCase()) {
							case 'rect':
								targetWidth = Math.ceil(Math.abs(coords[2] - coords[0]));
								targetHeight = Math.ceil(Math.abs(coords[3] - coords[1]));
							break;

							case 'circle':
								targetWidth = coords[2] + 1;
								targetHeight = coords[2] + 1;
							break;

							case 'poly':
								targetWidth = coords[0];
								targetHeight = coords[1];

								for (i = 0; i < coords.length; i++) {
									if(i % 2 === 0) {
										if(coords[i] > targetWidth) { targetWidth = coords[i]; }
										if(coords[i] < coords[0]) { position.left = Math.floor(imagePos.left + coords[i]); }
									}
									else {
										if(coords[i] > targetHeight) { targetHeight = coords[i]; }
										if(coords[i] < coords[1]) { position.top = Math.floor(imagePos.top + coords[i]); }
									}
								}

								targetWidth = targetWidth - (position.left - imagePos.left);
								targetHeight = targetHeight - (position.top - imagePos.top);
							break;
						}

						// Adjust position by 2 pixels (Positioning bug?)
						targetWidth -= 2;
						targetHeight -= 2;
					}
					else {
						targetWidth = target.outerWidth();
						targetHeight = target.outerHeight();

						if(!self.elements.tooltip.is(':visible')) {
							self.elements.tooltip.css({ left: '-10000000em' }).show();
						}

						// Account for tooltips offset parent if necessary
						if(self.elements.tooltip.offsetParent()[0] === document.body) {
							position = target.offset();	
						}
						else {
							// Account for offset parent and it's scroll positions
							position = target.position();
							position.top += target.offsetParent().scrollTop();
							position.left += target.offsetParent().scrollLeft();
						}
					}

					// Adjust position relative to target
					position.left += at.x === 'right' ? targetWidth : at.x === 'center' ? targetWidth / 2 : 0;
					position.top += at.y === 'bottom' ? targetHeight : at.y === 'center' ? targetHeight / 2 : 0;
				}

				// Adjust position relative to tooltip
				position.left += posOptions.adjust.x + (my.x === 'right' ? -elemWidth : my.x === 'center' ? -elemWidth / 2 : 0);
				position.top += posOptions.adjust.y + (my.y === 'bottom' ? -elemHeight : my.y === 'center' ? -elemHeight / 2 : 0);

				// Adjust for border radius
				if(self.options.style.border.radius > 0) {
					if(my.x === 'left') { position.left -= self.options.style.border.radius; }
					else if(my.x === 'right') { position.left += self.options.style.border.radius; }

					if(my.y === 'top') { position.top -= self.options.style.border.radius; }
					else if(my.y === 'bottom') { position.top += self.options.style.border.radius; }
				}

				// Adjust tooltip position if screen adjustment is enabled
				if(posOptions.adjust.screen) {
					(function() {
						var adjusted = { x: 0, y: 0 },
							adapted = { x: adapt.left(), y: adapt.top() },
							tip = new Corner(options.style.tip.corner);

						if(self.elements.tip && tip) {
							// Adjust position according to adjustment that took place
							if(adapted.y.adjust !== 0) {
								position.top += adapted.y.adjust;
								tip.y = adjusted.y = adapted.y.tip;
							}
							if(adapted.x.adjust !== 0) {
								position.left += adapted.x.adjust;
								tip.x = adjusted.x = adapted.x.tip;
							}

							// Update overflow cache
							self.cache.overflow = {
								left: adjusted.x === false,
								top: adjusted.y === false
							};

							// Update and redraw the tip
							if(self.elements.tip.attr('rel') !== tip.string()) { createTip.call(self, tip); }
						}
					}());
				}

				// Initiate bgiframe plugin in IE6 if tooltip overlaps a select box or object element
				if(!self.elements.bgiframe && $.browser.msie && parseInt($.browser.version.charAt(0), 10) === 6) {
					bgiframe.call(self);
				}

				// Call API method and if return value is false, halt
				returned = self.beforePositionUpdate.call(self, event);
				if(returned === false) { return self; }

				// Check if animation is enabled
				if(options.position.target !== 'mouse' && animate === true) {
					// Set animated status
					self.status.animated = true;

					// Animate and reset animated status on animation end
					self.elements.tooltip.stop().animate(position, 200, 'swing', function () {
						self.status.animated = false;
					});
				}

				// Set new position via CSS
				else { self.elements.tooltip.css(position); }

				// Call API method and log event if its not a mouse move
				self.onPositionUpdate.call(self, event);

				return self;
			},

			updateWidth: function (newWidth) {
				// Make sure tooltip is rendered and width is a number
				if(!self.status.rendered || (newWidth && typeof newWidth !== 'number')) { return false; }

				// Setup elements which must be hidden during width update
				var hidden = self.elements.contentWrapper.siblings().add(self.elements.tip).add(self.elements.button),
					zoom = self.elements.wrapper.add(self.elements.contentWrapper.children()),
					tooltip = self.elements.tooltip,
					max = self.options.style.width.max,
					min = self.options.style.width.min;

				// Calculate the new width if one is not supplied
				if(!newWidth) {
					// Explicit width is set
					if(typeof self.options.style.width.value === 'number') {
						newWidth = self.options.style.width.value;
					}

					// No width is set, proceed with auto detection
					else {
						// Set width to auto initally to determine new width and hide other elements
						self.elements.tooltip.css({ width: 'auto' });
						hidden.hide();

						// Set the new calculated width and if width has not numerical, grab new pixel width
						tooltip.width(newWidth);

						// Set position and zoom to defaults to prevent IE hasLayout bug
						if($.browser.msie) {
							zoom.css({ zoom: '' });
						}

						// Set the new width
						newWidth = self.getDimensions().width;

						// Make sure its within the maximum and minimum width boundries
						if(!self.options.style.width.value) {
							newWidth = Math.min(Math.max(newWidth, min), max);
						}
					}
				}

				// Adjust newWidth by 1px if width is odd (IE6 rounding bug fix)
				if(newWidth % 2) { newWidth += 1; }

				// Set the new calculated width and unhide other elements
				self.elements.tooltip.width(newWidth);
				hidden.show();

				// Set the border width, if enabled
				if(self.options.style.border.radius) {
					self.elements.tooltip.find('.qtip-betweenCorners').each(function (i) {
						$(this).width(newWidth - (self.options.style.border.radius * 2));
					});
				}

				// IE only adjustments
				if($.browser.msie) {
					// Reset position and zoom to give the wrapper layout (IE hasLayout bug)
					zoom.css({ zoom: 1 });

					// Set the new width
					self.elements.wrapper.width(newWidth);

					// Adjust BGIframe height and width if enabled
					if(self.elements.bgiframe) { self.elements.bgiframe.width(newWidth).height(self.getDimensions.height); }
				}

				// Log event and return
				return self;
			},

			updateStyle: function (name) {
				var tip, borders, context, corner, coordinates;

				// Make sure tooltip is rendered and style is defined
				if(!self.status.rendered || typeof name !== 'string' || !$.fn.qtip.styles[name]) { return false; }

				// Set the new style object
				self.options.style = buildStyle.call(self, $.fn.qtip.styles[name], self.options.user.style);

				// Update initial styles of content and title elements
				self.elements.content.css(jQueryStyle(self.options.style));
				if(self.options.content.title.text !== false) { self.elements.title.css(jQueryStyle(self.options.style.title, true)); }

				// Update CSS border colour
				self.elements.contentWrapper.css({
					borderColor: self.options.style.border.color
				});

				// Update tip color if enabled
				if(self.options.style.tip.corner !== false) {
					if($('<canvas />').get(0).getContext) {
						// Retrieve canvas context and clear
						tip = self.elements.tooltip.find('.qtip-tip canvas:first');
						context = tip.get(0).getContext('2d');
						context.clearRect(0, 0, 300, 300);

						// Draw new tip
						corner = tip.parent('div[rel]:first').attr('rel');
						coordinates = calculateTip(corner, self.options.style.tip.size.width, self.options.style.tip.size.height);
						drawTip.call(self, tip, coordinates, self.options.style.tip.color || self.options.style.border.color);
					}
					else if($.browser.msie) {
						// Set new fillcolor attribute
						tip = self.elements.tooltip.find('.qtip-tip [nodeName="shape"]');
						tip.attr('fillcolor', self.options.style.tip.color || self.options.style.border.color);
					}
				}

				// Update border colors if enabled
				if(self.options.style.border.radius > 0) {
					self.elements.tooltip.find('.qtip-betweenCorners').css({
						backgroundColor: self.options.style.border.color
					});

					if($('<canvas />').get(0).getContext) {
						borders = calculateBorders(self.options.style.border.radius);
						self.elements.tooltip.find('.qtip-wrapper canvas').each(function () {
							// Retrieve canvas context and clear
							context = $(this).get(0).getContext('2d');
							context.clearRect(0, 0, 300, 300);

							// Draw new border
							corner = $(this).parent('div[rel]:first').attr('rel');
							drawBorder.call(self, $(this), borders[corner], self.options.style.border.radius, self.options.style.border.color);
						});
					}
					else if($.browser.msie) {
						// Set new fillcolor attribute on each border corner
						self.elements.tooltip.find('.qtip-wrapper [nodeName="arc"]').each(function () {
							$(this).attr('fillcolor', self.options.style.border.color);
						});
					}
				}

				// Log event and return
				return self;
			},

			updateContent: function (content, reposition) {
				var parsedContent, images, loadedImages;

				function afterLoad() {
					// Update the tooltip width
					self.updateWidth();

					// If repositioning is enabled, update positions
					if(reposition !== false) {
						// Update position if tooltip isn't static
						if(self.options.position.type !== 'static') { self.updatePosition(self.elements.tooltip.is(':visible'), true); }

						// Reposition the tip if enabled
						if(self.options.style.tip.corner !== false) { positionTip.call(self); }
					}
				}

				// Make sure content is defined if not, return
				if(!content) { return false; }

				// Call API method and set new content if a string is returned
				parsedContent = self.beforeContentUpdate.call(self, content);
				if(typeof parsedContent === 'string') { content = parsedContent; }
				else if(parsedContent === false) { return; }

				// Continue normally if rendered, but if not set options.content.text instead
				if(self.status.rendered) {
					// Set position and zoom to defaults to prevent IE hasLayout bug
					if($.browser.msie) {
						self.elements.contentWrapper.children().css({
							zoom: 'normal'
						});
					}

					// Append new content if its a DOM array and show it if hidden
					if(content.jquery && content.length > 0) { content.clone(true).appendTo(self.elements.content).show(); }

					// Content is a regular string, insert the new content
					else { self.elements.content.html(content); }

					// Check if images need to be loaded before position is updated to prevent mis-positioning
					images = self.elements.content.find('img[complete=false]');
					if(images.length > 0) {
						loadedImages = 0;
						images.each(function (i) {
							$('<img src="' + $(this).attr('src') + '" />').load(function () {
								if(++loadedImages === images.length) { afterLoad(); }
							});
						});
					}
					else { afterLoad(); }
				}
				else {
					self.options.content.text = content;
				}

				// Call API method and log event
				self.onContentUpdate.call(self);
				return self;
			},

			loadContent: function (url, data, method) {
				var returned;

				function setupContent(content) {
					// Call API method and log event
					self.onContentLoad.call(self);

					// Update the content
					self.updateContent(content);
				}

				// Make sure tooltip is rendered and if not, return
				if(!self.status.rendered) { return false; }

				// Call API method and if return value is false, halt
				returned = self.beforeContentLoad.call(self);
				if(returned === false) { return self; }

				// Load content using specified request type
				if(method === 'post') { $.post(url, data, setupContent); }
				else { $.get(url, data, setupContent); }

				return self;
			},

			updateTitle: function (content) {
				var returned;

				// Make sure tooltip is rendered and content is defined
				if(!self.status.rendered || !content) { return false; }

				// Call API method and if return value is false, halt
				returned = self.beforeTitleUpdate.call(self);
				if(returned === false) { return self; }

				// Set the new content and reappend the button if enabled
				if(self.elements.button) { self.elements.button = self.elements.button.clone(true); }
				self.elements.title.html(content);
				if(self.elements.button) { self.elements.title.prepend(self.elements.button); }

				// Call API method and log event
				self.onTitleUpdate.call(self);
				return self;
			},

			focus: function (event) {
				var curIndex, newIndex, elemIndex, returned;

				// Make sure tooltip is rendered and if not, return
				if(!self.status.rendered || self.options.position.type === 'static') { return false; }

				// Set z-index variables
				curIndex = parseInt(self.elements.tooltip.css('z-index'), 10);
				newIndex = 15000 + $('div.qtip[id^="qtip"]').length - 1;

				// Only update the z-index if it has changed and tooltip is not already focused
				if(!self.status.focused && curIndex !== newIndex) {
					// Call API method and if return value is false, halt
					returned = self.beforeFocus.call(self, event);
					if(returned === false) { return self; }

					// Loop through all other tooltips
					$('div.qtip[id^="qtip"]').not(self.elements.tooltip).each(function () {
						if($(this).qtip('api').status.rendered === true) {
							elemIndex = parseInt($(this).css('z-index'), 10);

							// Reduce all other tooltip z-index by 1
							if(typeof elemIndex === 'number' && elemIndex > -1) {
								$(this).css({ zIndex: parseInt($(this).css('z-index'), 10) - 1 });
							}

							// Set focused status to false
							$(this).qtip('api').status.focused = false;
						}
					});

					// Set the new z-index and set focus status to true
					self.elements.tooltip.css({ zIndex: newIndex });
					self.status.focused = true;

					// Call API method and log event
					self.onFocus.call(self, event);
				}

				return self;
			},

			disable: function (state) {
				self.status.disabled = state ? true : false;
				return self;
			},

			destroy: function () {
				var i, returned, interfaces,
					oldattr = self.elements.target.data('old'+self.cache.attr[0]);

				// Call API method and if return value is false, halt
				returned = self.beforeDestroy.call(self);
				if(returned === false) { return self; }

				// Check if tooltip is rendered
				if(self.status.rendered) {
					// Remove event handlers and remove element
					self.options.show.when.target.unbind('mousemove.qtip', self.updatePosition);
					self.options.show.when.target.unbind('mouseout.qtip', self.hide);
					self.options.show.when.target.unbind(self.options.show.when.event + '.qtip');
					self.options.hide.when.target.unbind(self.options.hide.when.event + '.qtip');
					self.elements.tooltip.unbind(self.options.hide.when.event + '.qtip');
					self.elements.tooltip.unbind('mouseover.qtip', self.focus);
					self.elements.tooltip.remove();
				}

				// Tooltip isn't yet rendered, remove render event
				else { self.options.show.when.target.unbind(self.options.show.when.event + '.qtip-' + self.id + '-create'); }

				// Check to make sure qTip data is present on target element
				if(typeof self.elements.target.data('qtip') === 'object') {
					// Remove API references from interfaces object
					interfaces = self.elements.target.data('qtip').interfaces;
					if(typeof interfaces === 'object' && interfaces.length > 0) {
						// Remove API from interfaces array
						for(i = 0; i < interfaces.length - 1; i++) {
							if(interfaces[i].id === self.id) { interfaces.splice(i, 1); }
						}
					}
				}
				$.fn.qtip.interfaces.splice(self.id, 1);

				// Set qTip current id to previous tooltips API if available
				if(typeof interfaces === 'object' && interfaces.length > 0) { self.elements.target.data('qtip').current = interfaces.length - 1; }
				else { self.elements.target.removeData('qtip'); }

				// Reset old title attribute if removed
				if(oldattr) {
					self.elements.target.attr(self.cache.attr[0], oldattr);
				}

				// Call API method and log destroy
				self.onDestroy.call(self);

				return self.elements.target;
			},

			getPosition: function () {
				var show, offset;

				// Make sure tooltip is rendered and if not, return
				if(!self.status.rendered) { return false; }

				show = (self.elements.tooltip.css('display') !== 'none') ? false : true;

				// Show and hide tooltip to make sure coordinates are returned
				if(show) { self.elements.tooltip.css({ visiblity: 'hidden' }).show(); }
				offset = self.elements.tooltip.offset();
				if(show) { self.elements.tooltip.css({ visiblity: 'visible' }).hide(); }

				return offset;
			},

			getDimensions: function () {
				var show, dimensions;

				// Make sure tooltip is rendered and if not, return
				if(!self.status.rendered) { return false; }

				show = (!self.elements.tooltip.is(':visible')) ? true : false;

				// Show and hide tooltip to make sure dimensions are returned
				if(show) { self.elements.tooltip.css({ visiblity: 'hidden' }).show(); }
				dimensions = {
					height: self.elements.tooltip.outerHeight(),
					width: self.elements.tooltip.outerWidth()
				};
				if(show) { self.elements.tooltip.css({ visiblity: 'visible' }).hide(); }

				return dimensions;
			}
		});
	}

	// Implementation
	$.fn.qtip = function (options, blanket) {
		var i, id, interfaces, opts, obj, command, config, api;

		// Return API / Interfaces if requested
		if(typeof options === 'string') {
			if($(this).data('qtip')) {
				// Return requested object
				if(options === 'api') {
					return $(this).data('qtip').interfaces[$(this).data('qtip').current];
				}
				else if(options === 'interfaces') {
					return $(this).data('qtip').interfaces;
				}
			}
			else {
				return $(this);
			}
		}

		// Validate provided options
		else {
			// Set null options object if no options are provided
			if(!options) { options = {}; }

			// Sanitize option data
			if(typeof options.content !== 'object' || (options.content.jquery && options.content.length > 0)) {
				options.content = { text: options.content };
			}
			if(typeof options.content.title !== 'object') {
				options.content.title = { text: options.content.title };
			}
			if(typeof options.position !== 'object') {
				options.position = { corner: options.position };
			}
			if(typeof options.position.corner !== 'object') {
				options.position.corner = {
					target: options.position.corner,
					tooltip: options.position.corner
				};
			}
			if(typeof options.show !== 'object') {
				options.show = { when: options.show };
			}
			if(typeof options.show.when !== 'object') {
				options.show.when = { event: options.show.when };
			}
			if(typeof options.show.effect !== 'object') {
				options.show.effect = { type: options.show.effect };
			}
			if(typeof options.hide !== 'object') {
				options.hide = { when: options.hide };
			}
			if(typeof options.hide.when !== 'object') {
				options.hide.when = { event: options.hide.when };
			}
			if(typeof options.hide.effect !== 'object') {
				options.hide.effect = { type: options.hide.effect };
			}
			if(typeof options.style !== 'object') {
				options.style = { name: options.style };
			}

			// Sanitize option styles
			options.style = sanitizeStyle(options.style);

			// Build main options object
			opts = $.extend(true, {}, $.fn.qtip.defaults, options);

			// Inherit all style properties into one syle object and include original options
			opts.style = buildStyle.call({
				options: opts
			}, opts.style);
			opts.user = $.extend(true, {}, options);
		}

		// Iterate each matched element
		return $(this).each(function () // Return original elements as per jQuery guidelines
		{
			var self = $(this), content = false;

			// Check for API commands
			if(typeof options === 'string') {
				command = options.toLowerCase();
				interfaces = $(this).qtip('interfaces');

				// Make sure API data exists
				if(typeof interfaces === 'object') {
					// Check if API call is a BLANKET DESTROY command
					if(blanket === true && command === 'destroy') {
						for(i = interfaces.length - 1; i > -1; i--) {
							if('object' === typeof interfaces[i]) {
								interfaces[i].destroy();
							}
						}
					}

					// API call is not a BLANKET DESTROY command
					else {
						// Check if supplied command effects this tooltip only (NOT BLANKET)
						if(blanket !== true) { interfaces = [$(this).qtip('api')]; }

						// Execute command on chosen qTips
						for (i = 0; i < interfaces.length; i++) {
							// Destroy command doesn't require tooltip to be rendered
							if(command === 'destroy') { interfaces[i].destroy(); }

							// Only call API if tooltip is rendered and it wasn't a destroy call
							else if(interfaces[i].status.rendered === true) {
								if(command === 'show') { interfaces[i].show(); }
								else if(command === 'hide') { interfaces[i].hide(); }
								else if(command === 'focus') { interfaces[i].focus(); }
								else if(command === 'disable') { interfaces[i].disable(true); }
								else if(command === 'enable') { interfaces[i].disable(false); }
								else if(command === 'update') { interfaces[i].updatePosition(); }
							}
						}
					}
				}
			}

			// No API commands, continue with qTip creation
			else {
				// Create unique configuration object
				config = $.extend(true, {}, opts);
				config.hide.effect.length = opts.hide.effect.length;
				config.show.effect.length = opts.show.effect.length;

				// Sanitize target options
				if(config.position.container === false) { config.position.container = $(document.body); }
				if(config.position.target === false) { config.position.target = $(this); }
				if(config.show.when.target === false) { config.show.when.target = $(this); }
				if(config.hide.when.target === false) { config.hide.when.target = $(this); }

				// Parse corner options
				config.position.corner.tooltip = new Corner(config.position.corner.tooltip);
				config.position.corner.target = new Corner(config.position.corner.target);

				// If no content is provided, check title and alt attributes for fallback
				if(!config.content.text.length) {
					$(['title', 'alt']).each(function(i, attr) {
						var val = self.attr(attr);
						if(val && val.length) {
							content = [attr, val];
							self.data('old'+attr, val).removeAttr(attr);
							config.content.text = val.replace(/\n/gi, '<br />');
							return false;
						}
					});
				}

				// Determine tooltip ID (Reuse array slots if possible)
				id = $.fn.qtip.interfaces.length;
				for (i = 0; i < id; i++) {
					if(typeof $.fn.qtip.interfaces[i] === 'undefined') {
						id = i;
						break;
					}
				}

				// Instantiate the tooltip
				obj = new QTip($(this), config, id);

				// Add API references and cache content if present
				$.fn.qtip.interfaces[id] = obj;
				obj.cache.attr = content;

				// Check if element already has qTip data assigned
				if(typeof $(this).data('qtip') === 'object' && $(this).data('qtip')) {
					// Set new current interface id
					if(typeof $(this).attr('qtip') === 'undefined') { $(this).data('qtip').current = $(this).data('qtip').interfaces.length; }

					// Push new API interface onto interfaces array
					$(this).data('qtip').interfaces.push(obj);
				}

				// No qTip data is present, create now
				else {
					$(this).data('qtip', {
						current: 0,
						interfaces: [obj]
					});
				}

				// If prerendering is disabled, create tooltip on showEvent
				if(config.content.prerender === false && config.show.when.event !== false && config.show.ready !== true) {
					config.show.when.target.bind(config.show.when.event + '.qtip-' + id + '-create', { qtip: id }, function (event) {
						// Retrieve API interface via passed qTip Id
						api = $.fn.qtip.interfaces[event.data.qtip];

						// Unbind show event and cache mouse coords
						api.options.show.when.target.unbind(api.options.show.when.event + '.qtip-' + event.data.qtip + '-create');
						api.cache.mouse = {
							left: event.pageX,
							top: event.pageY
						};

						// Render tooltip and start the event sequence
						construct.call(api);
						api.options.show.when.target.trigger(api.options.show.when.event);
					});
				}

				// Prerendering is enabled, create tooltip now
				else {
					// Set mouse position cache to top left of the element
					obj.cache.mouse = {
						left: config.show.when.target.offset().left,
						top: config.show.when.target.offset().top
					};

					// Construct the tooltip
					construct.call(obj);
				}
			}
		});
	};

	// Define qTip API interfaces array
	$.fn.qtip.interfaces = [];

	/* Add intermediary method to the 'attr' class to allow other plugins to successfully 
	retrieve the title of an element with a qTip applied */
	$.fn.qtip.fn = { attr: $.fn.attr };
	$.fn.attr = function(attr) {
		var api = $(this).qtip('api');

		return (arguments.length === 1 && (/title|alt/i).test(attr) && api.status && api.status.rendered === true)
			? $(this).data('old' + api.cache.attr[0])
			: $.fn.qtip.fn.attr.apply(this, arguments);
	};

	// Define configuration defaults
	$.fn.qtip.defaults = {
		// Content
		content: {
			prerender: false,
			text: false,
			url: false,
			data: null,
			title: {
				text: false,
				button: false
			}
		},
		// Position
		position: {
			target: false,
			corner: {
				target: 'bottomRight',
				tooltip: 'topLeft'
			},
			adjust: {
				x: 0,
				y: 0,
				mouse: true,
				screen: false,
				scroll: true,
				resize: true
			},
			type: 'absolute',
			container: false
		},
		// Effects
		show: {
			when: {
				target: false,
				event: 'mouseover'
			},
			effect: {
				type: 'fade',
				length: 100
			},
			delay: 140,
			solo: false,
			ready: false
		},
		hide: {
			when: {
				target: false,
				event: 'mouseout'
			},
			effect: {
				type: 'fade',
				length: 100
			},
			delay: 0,
			fixed: false
		},
		// Callbacks
		api: {
			beforeRender: function () {},
			onRender: function () {},
			beforePositionUpdate: function () {},
			onPositionUpdate: function () {},
			beforeShow: function () {},
			onShow: function () {},
			beforeHide: function () {},
			onHide: function () {},
			beforeContentUpdate: function () {},
			onContentUpdate: function () {},
			beforeContentLoad: function () {},
			onContentLoad: function () {},
			beforeTitleUpdate: function () {},
			onTitleUpdate: function () {},
			beforeDestroy: function () {},
			onDestroy: function () {},
			beforeFocus: function () {},
			onFocus: function () {}
		}
	};

	$.fn.qtip.styles = {
		defaults: {
			background: 'white',
			color: '#111',
			overflow: 'hidden',
			textAlign: 'left',
			width: {
				min: 0,
				max: 250
			},
			padding: '5px 9px',
			border: {
				width: 1,
				radius: 0,
				color: '#d3d3d3'
			},
			tip: {
				corner: false,
				color: false,
				size: {
					width: 13,
					height: 13
				},
				opacity: 1
			},
			title: {
				background: '#e1e1e1',
				fontWeight: 'bold',
				padding: '7px 12px'
			},
			button: {
				cursor: 'pointer'
			},
			classes: {
				target: '',
				tip: 'qtip-tip',
				title: 'qtip-title',
				button: 'qtip-button',
				content: 'qtip-content',
				active: 'qtip-active'
			}
		},
		cream: {
			border: {
				width: 3,
				radius: 0,
				color: '#F9E98E'
			},
			title: {
				background: '#F0DE7D',
				color: '#A27D35'
			},
			background: '#FBF7AA',
			color: '#A27D35',

			classes: {
				tooltip: 'qtip-cream'
			}
		},
		light: {
			border: {
				width: 3,
				radius: 0,
				color: '#E2E2E2'
			},
			title: {
				background: '#f1f1f1',
				color: '#454545'
			},
			background: 'white',
			color: '#454545',

			classes: {
				tooltip: 'qtip-light'
			}
		},
		dark: {
			border: {
				width: 3,
				radius: 0,
				color: '#303030'
			},
			title: {
				background: '#404040',
				color: '#f3f3f3'
			},
			background: '#505050',
			color: '#f3f3f3',

			classes: {
				tooltip: 'qtip-dark'
			}
		},
		red: {
			border: {
				width: 3,
				radius: 0,
				color: '#CE6F6F'
			},
			title: {
				background: '#f28279',
				color: '#9C2F2F'
			},
			background: '#F79992',
			color: '#9C2F2F',

			classes: {
				tooltip: 'qtip-red'
			}
		},
		green: {
			border: {
				width: 3,
				radius: 0,
				color: '#A9DB66'
			},
			title: {
				background: '#b9db8c',
				color: '#58792E'
			},
			background: '#CDE6AC',
			color: '#58792E',

			classes: {
				tooltip: 'qtip-green'
			}
		},
		blue: {
			border: {
				width: 3,
				radius: 0,
				color: '#ADD9ED'
			},
			title: {
				background: '#D0E9F5',
				color: '#5E99BD'
			},
			background: '#E5F6FE',
			color: '#4D9FBF',

			classes: {
				tooltip: 'qtip-blue'
			}
		}
	};
}(jQuery));;/* fontAvailable jQuery Plugin, v1.1
 *
 * Copyright (c) 2009, Howard Rauscher
 * Licensed under the MIT License
 */
(function($) {
	var element;
	
    $.fontAvailable = function(fontName) {
        var width, height;
        
        // prepare element, and append to DOM
        if(!element) {
            element = $( document.createElement( 'span' ))
                .css( 'visibility', 'hidden' )
                .css( 'position', 'absolute' )
                .css( 'top', '-10000px' )
                .css( 'left', '-10000px' )
                .html( 'abcdefghijklmnopqrstuvwxyz' )
                .appendTo( document.body );
        }
        
        // get the width/height of element after applying a fake font
        width = element
            .css('font-family', '__FAKEFONT__')
            .width();
        height = element.height();
        
        // set test font
        element.css('font-family', fontName);
        
        return width !== element.width() || height !== element.height();
    }
})(jQuery);
;/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;/*
 * jQuery validation plug-in 1.7
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.validate.js 6403 2009-06-17 14:27:16Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}
		
		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator); 
		
		if ( validator.settings.onsubmit ) {
		
			// allow suppresing validation by adding a cancel class to the submit button
			this.find("input, button").filter(".cancel").click(function() {
				validator.cancelSubmit = true;
			});
			
			// when a submitHandler is used, capture the submitting button
			if (validator.settings.submitHandler) {
				this.find("input, button").filter(":submit").click(function() {
					validator.submitButton = this;
				});
			}
		
			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug )
					// prevent form submit to be able to see console output
					event.preventDefault();
					
				function handle() {
					if ( validator.settings.submitHandler ) {
						if (validator.submitButton) {
							// insert a hidden input as a replacement for the missing submit button
							var hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm );
						if (validator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}
					
				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}
		
		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
        if ( $(this[0]).is('form')) {
            return this.validate().form();
        } else {
            var valid = true;
            var validator = $(this[0].form).validate();
            this.each(function() {
				valid &= validator.element(this);
            });
            return valid;
        }
    },
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];
		
		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages)
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}
		
		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.metadataRules(element),
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.staticRules(element)
		), element);
		
		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}
		
		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function(source, params) {
	if ( arguments.length == 1 ) 
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	if ( arguments.length > 2 && params.constructor != Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor != Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.validator, {
	
	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: [],
		ignoreTitle: false,
		onfocusin: function(element) {
			this.lastActive = element;
				
			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				this.errorsFor(element).hide();
			}
		},
		onfocusout: function(element) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element) {
			if ( element.name in this.submitted || element == this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted )
				this.element(element);
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted)
				this.element(element.parentNode);
		},
		highlight: function( element, errorClass, validClass ) {
			$(element).addClass(errorClass).removeClass(validClass);
		},
		unhighlight: function( element, errorClass, validClass ) {
			$(element).removeClass(errorClass).addClass(validClass);
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valid extension.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},
	
	autoCreateRanges: false,
	
	prototype: {
		
		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();
			
			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				$.each(value.split(/\s/), function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});
			
			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				validator.settings[eventType] && validator.settings[eventType].call(validator, this[0] );
			}
			$(this.currentForm)
				.validateDelegate(":text, :password, :file, select, textarea", "focusin focusout keyup", delegate)
				.validateDelegate(":radio, :checkbox, select, option", "click", delegate);

			if (this.settings.invalidHandler)
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid())
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			this.showErrors();
			return this.valid();
		},
		
		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid(); 
		},
		
		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.clean( element );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element );
			if ( result ) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			this.settings.showErrors
				? this.settings.showErrors.call( this, this.errorMap, this.errorList )
				: this.defaultShowErrors();
		},
		
		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm )
				$( this.currentForm ).resetForm();
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass );
		},
		
		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},
		
		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		},
		
		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},
		
		valid: function() {
			return this.size() == 0;
		},
		
		size: function() {
			return this.errorList.length;
		},
		
		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},
		
		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name == lastActive.name;
			}).length == 1 && lastActive;
		},
		
		elements: function() {
			var validator = this,
				rulesCache = {};
			
			// select all valid inputs inside the form (no submit or reset buttons)
			// workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
			return $([]).add(this.currentForm.elements)
			.filter(":input")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);
			
				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
					return false;
				
				rulesCache[this.name] = true;
				return true;
			});
		},
		
		clean: function( selector ) {
			return $( selector )[0];
		},
		
		errors: function() {
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		},
		
		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},
		
		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},
		
		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},
	
		check: function( element ) {
			element = this.clean( element );
			
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name )[0];
			}
			
			var rules = $(element).rules();
			var dependencyMismatch = false;
			for( method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );
					
					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;
					
					if ( result == "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}
					
					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method", e);
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		},
		
		// return the custom message for the given element and validation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) {
			if (!$.metadata)
				return;
			
			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();
			
			return meta && meta.messages && meta.messages[method];
		},
		
		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		},
		
		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined)
					return arguments[i];
			}
			return undefined;
		},
		
		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},
		
		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message == "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
			}			
			this.errorList.push({
				message: message,
				element: element
			});
			
			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},
		
		addWrapper: function(toToggle) {
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			return toToggle;
		},
		
		defaultShowErrors: function() {
			for ( var i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( var i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},
		
		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},
		
		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},
		
		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass().addClass( this.settings.errorClass );
			
				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			}
			if ( !message && this.settings.success ) {
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			}
			this.toShow = this.toShow.add(label);
		},
		
		errorsFor: function(element) {
			var name = this.idOrName(element);
    		return this.errors().filter(function() {
				return $(this).attr('for') == name;
			});
		},
		
		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		checkable: function( element ) {
			return /radio|checkbox/i.test(element.type);
		},
		
		findByName: function( name ) {
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) {
				return element.form == form && element.name == name && element  || null;
			});
		},
		
		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			}
			return value.length;
		},
	
		depend: function(param, element) {
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		},
	
		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},
		
		optional: function(element) {
			return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		},
		
		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},
		
		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},
		
		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}
		
	},
	
	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		dateDE: {dateDE: true},
		number: {number: true},
		numberDE: {numberDE: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},
	
	addClassRules: function(className, rules) {
		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	},
	
	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() {
			if (this in $.validator.classRuleSettings) {
				$.extend(rules, $.validator.classRuleSettings[this]);
			}
		});
		return rules;
	},
	
	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);
		
		for (method in $.validator.methods) {
			var value = $element.attr(method);
			if (value) {
				rules[method] = value;
			}
		}
		
		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}
		
		return rules;
	},
	
	metadataRules: function(element) {
		if (!$.metadata) return {};
		
		var meta = $.data(element.form, 'validator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	},
	
	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},
	
	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});
		
		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});
		
		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			if (rules[this]) {
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			}
		});
		
		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}
		
		// To support custom messages in metadata ignore rule methods titled "messages"
		if (rules.messages) {
			delete rules.messages;
		}
		
		return rules;
	},
	
	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data == "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},
	
	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message != undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			}
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			
			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = {};
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;
			
			param = typeof param == "string" && {url:param} || param; 
			
			if ( previous.old !== value ) {
				previous.old = value;
				var validator = this;
				this.startRequest(element);
				var data = {};
				data[element.name] = value;
				$.ajax($.extend(true, {
					url: param,
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					success: function(response) {
						validator.settings.messages[element.name].remote = previous.originalMessage;
						var valid = response === true;
						if ( valid ) {
							var submitted = validator.formSubmitted;
							validator.prepareElement(element);
							validator.formSubmitted = submitted;
							validator.successList.push(element);
							validator.showErrors();
						} else {
							var errors = {};
							var message = (previous.message = response || validator.defaultMessage( element, "remote" ));
							errors[element.name] = $.isFunction(message) ? message(value) : message;
							validator.showErrors(errors);
						}
						previous.valid = valid;
						validator.stopRequest(element, valid);
					}
				}, param));
				return "pending";
			} else if( this.pending[element.name] ) {
				return "pending";
			}
			return previous.valid;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},
        
		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only digits, dashes, and spaces
			if (/[^0-9- ]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) == 0;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/accept
		accept: function(value, element, param) {
			param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i")); 
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
				$(element).valid();
			});
			return value == target.val();
		}
		
	}
	
});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort() 
;(function($) {
	var ajax = $.ajax;
	var pendingRequests = {};
	$.ajax = function(settings) {
		// create settings for compatibility with ajaxSetup
		settings = $.extend(settings, $.extend({}, $.ajaxSettings, settings));
		var port = settings.port;
		if (settings.mode == "abort") {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			return (pendingRequests[port] = ajax.apply(this, arguments));
		}
		return ajax.apply(this, arguments);
	};
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target 
;(function($) {
	// only implement if not provided by jQuery core (since 1.4)
	// TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
		$.each({
			focus: 'focusin',
			blur: 'focusout'	
		}, function( original, fix ){
			$.event.special[fix] = {
				setup:function() {
					this.addEventListener( original, handler, true );
				},
				teardown:function() {
					this.removeEventListener( original, handler, true );
				},
				handler: function(e) {
					arguments[0] = $.event.fix(e);
					arguments[0].type = fix;
					return $.event.handle.apply(this, arguments);
				}
			};
			function handler(e) {
				e = $.event.fix(e);
				e.type = fix;
				return $.event.handle.call(this, e);
			}
		});
	};
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
})(jQuery);
;/**
 * @see http://github.com/NV/placeholder.js
 */
jQuery.fn.textPlaceholder = function () {

	return this.each(function(){

		var that = this;

		if (that.placeholder && 'placeholder' in document.createElement(that.tagName)) return;

		var placeholder = that.getAttribute('placeholder');
		var input = jQuery(that);

		if (that.value === '' || that.value == placeholder) {
			input.addClass('text-placeholder');
			that.value = placeholder;
		}

		input.focus(function(){
			if (input.hasClass('text-placeholder')) {
				this.value = '';
				input.removeClass('text-placeholder')
			}
		});

		input.blur(function(){
			if (this.value === '') {
				input.addClass('text-placeholder');
				this.value = placeholder;
			} else {
				input.removeClass('text-placeholder');
			}
		});

		that.form && jQuery(that.form).submit(function(){
			if (input.hasClass('text-placeholder')) {
				that.value = '';
			}
		});

	});

};;// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};

  this.jtmpl = function jtmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.

    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        jtmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
		str.replace(/[\r\t\n]/g, " ")
		   .replace(/'(?=[^#]*#>)/g,"\t")
		   .split("'").join("\\'")
		   .split("\t").join("'")
		   .replace(/<#=(.+?)#>/g, "',$1,'")
		   .split("<#").join("');")
		   .split("#>").join("p.push('")
		   + "');}return p.join('');");


    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();;/*
 * Facebox (for jQuery)
 * version: 1.2 (05/05/2008)
 * @requires jQuery v1.2 or later
 *
 * Examples at http://famspam.com/facebox/
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2007, 2008 Chris Wanstrath [ chris@ozmm.org ]
 *
 * Usage:
 *  
 *  jQuery(document).ready(function() {
 *    jQuery('a[rel*=facebox]').facebox() 
 *  })
 *
 *  <a href="#terms" rel="facebox">Terms</a>
 *    Loads the #terms div in the box
 *
 *  <a href="terms.html" rel="facebox">Terms</a>
 *    Loads the terms.html page in the box
 *
 *  <a href="terms.png" rel="facebox">Terms</a>
 *    Loads the terms.png image in the box
 *
 *
 *  You can also use it programmatically:
 * 
 *    jQuery.facebox('some html')
 *
 *  The above will open a facebox with "some html" as the content.
 *    
 *    jQuery.facebox(function($) { 
 *      $.get('blah.html', function(data) { $.facebox(data) })
 *    })
 *
 *  The above will show a loading screen before the passed function is called,
 *  allowing for a better ajaxy experience.
 *
 *  The facebox function can also display an ajax page or image:
 *  
 *    jQuery.facebox({ ajax: 'remote.html' })
 *    jQuery.facebox({ image: 'dude.jpg' })
 *
 *  Want to close the facebox?  Trigger the 'close.facebox' document event:
 *
 *    jQuery(document).trigger('close.facebox')
 *
 *  Facebox also has a bunch of other hooks:
 *
 *    loading.facebox
 *    beforeReveal.facebox
 *    reveal.facebox (aliased as 'afterReveal.facebox')
 *    init.facebox
 *
 *  Simply bind a function to any of these hooks:
 *
 *   $(document).bind('reveal.facebox', function() { ...stuff to do after the facebox and contents are revealed... })
 *
 */
(function($) {
  $.facebox = function(data, klass) {
    $.facebox.loading();

    if (data.ajax) fillFaceboxFromAjax(data.ajax);
    else if (data.image) fillFaceboxFromImage(data.image);
    else if (data.div) fillFaceboxFromHref(data.div, klass);
    else if ($.isFunction(data)) data.call($);
    else $.facebox.reveal(data, klass);
  };

  /*
   * Public, $.facebox methods
   */

  $.extend($.facebox, {
    settings: {
      opacity      : 0.4,
      overlay      : true,
      modal        : false,
      loadingImage : window.location.protocol + '//a1.lscdn.net/deals/images/bingy/facebox/loading.gif',
      closeImage   : window.location.protocol + '//a1.lscdn.net/deals/images/bingy/facebox/closelabel.gif',
      imageTypes   : [ 'png', 'jpg', 'jpeg', 'gif' ],
      faceboxHtml  : '\
    <div id="facebox" style="display:none;"> \
      <div class="popup modal"> \
        <a class="close-fb-modal close" href="#">×</a> \
        <table> \
          <tbody> \
            <tr> \
              <td class="tl"/><td class="b"/><td class="tr"/> \
            </tr> \
            <tr> \
              <td class="b"/> \
              <td class="body"> \
                <div class="content"> \
                </div> \
              </td> \
              <td class="b"/> \
            </tr> \
            <tr> \
              <td class="bl"/><td class="b"/><td class="br"/> \
            </tr> \
          </tbody> \
        </table> \
      </div> \
    </div>'
    },

    loading: function() {
      init();
      if ($('#facebox .loading').length == 1) return true;
      showOverlay();
      var leftOffset = 385.5;
      if($("#main").length > 0){
        leftOffset = $("#main").offset().left;
      }
      $('#facebox .content').empty();
      $('#facebox .body').children().hide().end().
        append('<div class="loading"><img src="'+$.facebox.settings.loadingImage+'"/></div>');

      $('#facebox').css({
        top:	getPageScroll()[1] + (getPageHeight() / 10),
        left:	leftOffset
      }).show();

      $(document).bind('keydown.facebox', function(e) {
        if (e.keyCode == 27) $.facebox.close();
        return true;
      });
      $(document).trigger('loading.facebox');
      return false;
    },

    reveal: function(data, klass) {
      $(document).trigger('beforeReveal.facebox');
      if (klass) { 
        $('#facebox').addClass(klass);
        $('#facebox .content').addClass(klass);
      }
      $('#facebox .content').append(data);
      $('#facebox .loading').remove();
      $('#facebox .body').children().fadeIn('normal');
      $('#facebox').css('left', $(window).width() / 2 - ($('#facebox table').width() / 2));
      if($('#facebox').offset().top < 200) {
        $('#facebox').css('top', "200px");
      }
      $(document).trigger('reveal.facebox').trigger('afterReveal.facebox');
    },

    close: function() {
      $(document).trigger('close.facebox');
      return false;
    }
  });

  /*
   * Public, $.fn methods
   */

  $.fn.facebox = function(settings) {
    init(settings);

    function clickHandler() {
      $.facebox.loading(true);

      // support for rel="facebox.inline_popup" syntax, to add a class
      // also supports deprecated "facebox[.inline_popup]" syntax
      var klass = this.rel.match(/facebox\[?\.(\w+)\]?/);
      if (klass) klass = klass[1];

      fillFaceboxFromHref(this.href, klass);
      return false;
    }

    return this.click(clickHandler);
  };

  /*
   * Private methods
   */

  // called one time to setup facebox on this page
  function init(settings) {
    if ($.facebox.settings.inited) return true;
    else $.facebox.settings.inited = true;

    $(document).trigger('init.facebox');
    makeCompatible();

    var imageTypes = $.facebox.settings.imageTypes.join('|');
    $.facebox.settings.imageTypesRegexp = new RegExp('\.' + imageTypes + '$', 'i');

    if (settings) $.extend($.facebox.settings, settings);
    $('body').append($.facebox.settings.faceboxHtml);

    var preload = [ new Image(), new Image() ];
    preload[0].src = $.facebox.settings.closeImage;
    preload[1].src = $.facebox.settings.loadingImage;

    $('#facebox').find('.b:first, .bl, .br, .tl, .tr').each(function() {
      preload.push(new Image());
      preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1');
    });
    $('#facebox .close, #facebox .close-fb-modal').click($.facebox.close);
    $('#facebox .close_image').attr('src', $.facebox.settings.closeImage);
    return false;
  }
  
  // getPageScroll() by quirksmode.com
  function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;	
    }
    return new Array(xScroll,yScroll) ;
  }

  // Adapted from getPageSize() by quirksmode.com
  function getPageHeight() {
    var windowHeight;
    if (self.innerHeight) {	// all except Explorer
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }	
    return windowHeight;
  }

  // Backwards compatibility
  function makeCompatible() {
    var $s = $.facebox.settings;

    $s.loadingImage = $s.loading_image || $s.loadingImage;
    $s.closeImage = $s.close_image || $s.closeImage;
    $s.imageTypes = $s.image_types || $s.imageTypes;
    $s.faceboxHtml = $s.facebox_html || $s.faceboxHtml;
  }

  // Figures out what you want to display and displays it
  // formats are:
  //     div: #id
  //   image: blah.extension
  //    ajax: anything else
  function fillFaceboxFromHref(href, klass) {
    // div
    if (href.match(/#/)) {
      var url    = window.location.href.split('#')[0];
      var target = href.replace(url,'');
      $.facebox.reveal($(target).clone().show(), klass);

    // image
    } else if (href.match($.facebox.settings.imageTypesRegexp)) {
      fillFaceboxFromImage(href, klass);
    // ajax
    } else {
      fillFaceboxFromAjax(href, klass);
    }
  }

  function fillFaceboxFromImage(href, klass) {
    var image = new Image();
    image.onload = function() {
      $.facebox.reveal('<div class="image"><img src="' + image.src + '" /></div>', klass);
    };
    image.src = href;
  }

  function fillFaceboxFromAjax(href, klass) {
    $.get(href, function(data) { $.facebox.reveal(data, klass); }, 'html');
  }

  function skipOverlay() {
    return $.facebox.settings.overlay == false || $.facebox.settings.opacity === null;
  }

  function showOverlay() {
    if (skipOverlay()) return;

    if ($('facebox_overlay').length == 0) 
      $("body").append('<div id="facebox_overlay" class="facebox_hide"></div>');

    $('#facebox_overlay').hide().addClass("facebox_overlayBG")
      .css('opacity', $.facebox.settings.opacity)
      .click(function() { 
        if (!$.facebox.settings.modal) {
          $(document).trigger('close.facebox'); 
        }
      })
      .fadeIn(200);
  }

  function hideOverlay() {
    if (skipOverlay()) return;

    $('#facebox_overlay').fadeOut(100, function(){
      $("#facebox_overlay").removeClass("facebox_overlayBG");
      $("#facebox_overlay").addClass("facebox_hide") ;
      $("#facebox_overlay").remove();
    });
  }

  /*
   * Bindings
   */

  $(document).bind('close.facebox', function() {
    $(document).unbind('keydown.facebox');
    $('#facebox').fadeOut(function() {
      $('#facebox').removeClass();
      $('#facebox .content').removeClass().addClass('content');
      hideOverlay();
      $('#facebox .loading').remove();
    });
  });

})(jQuery);;// global jquery ajax settings to supports rails respond_to
jQuery.ajaxSetup({
  beforeSend: function (xhr) {xhr.setRequestHeader("Accept", "text/javascript");}
});

$(function() {
  if ($.browser.msie) {
    $('body').addClass('ie').addClass('ie' + $.browser.version.substring(0,1));
  }

  $(this).bind('change:city', function(e,data) {
    $('#city-logo').attr('src', data.logo);
    dls.swapBackground(data.thumb,data.image);
  });

  // Account Panel
  var myAccountPanel = $('#my-account');
  var myAccountPanelTop = 35;

  $('#new-badge').delegate('#my-account-handle', 'click', function(e) {
    myAccountPanel = $('#my-account');
    e.preventDefault();
    e.stopPropagation();

    $(this).closest('li').toggleClass('active');
    if (myAccountPanel.is(':visible')) {
      myAccountPanel.hide();
    } else {
      myAccountPanel.
        css({top: (myAccountPanelTop - 10 +'px'), opacity: 0.0}).
        show().
        animate({top: (myAccountPanelTop + 'px'), opacity: 1.0}, {duration: 200});
    }
  });

  $('html').click(function() {
    if (myAccountPanel.is(':visible')) {
      myAccountPanel.hide();
      $('#new-badge .user').removeClass('active');
    }
  });

  dls.loadBackground(dls.preferredCity.image);

});

/* Fallback Carousel for Adventures Homepage */
$(function advFallback(){
    $('.adventures-fallback img:gt(0)').hide();
    setInterval(function(){
      $('.adventures-fallback :first-child').fadeOut()
         .next('img').fadeIn()
         .end().appendTo('.adventures-fallback');},
      3000);
});

$('a[rel*=facebox]').facebox();

function appendAsynchScript(src) {
  var _s=document.createElement('script'); _s.async = true;
  _s.src=('https:' == document.location.protocol ? 'https://' : 'http://') + src;
  var _fs = document.getElementsByTagName('script')[0];// script is guarenteed to exist
  _fs.parentNode.insertBefore(_s, _fs);
}

(function($) {
  $.getQueryStringParam = function(name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results ? results[1] : null;
  };

  dls.logout = function() {
    var fbc = new RegExp("fbsr_" + dls.fbKey + "=");
    if (window.FB && dls.fbConnect && document.cookie.match(fbc)) {
      dls.fbConnect.logout(); // fb shared so we're logged in with both fb and ext
    }
    else {
      dls._logout();
      document.getElementById('sign-out-form').submit();
    }
    return false;
  };

  dls.backgroundLoaded = false;

  dls.instantOrderingPromo = function() {
    var $sidebar   = $('#instant-left-promo');
    var $window    = $(window);
    var offset     = $sidebar.offset();
    var images     = [{name:"El Rincon", img_src:"http://lscdn.net/imgs/1b0a2ccc-dc47-4ca7-b28a-490b64d4a726", url:"http://www.livingsocial.com/deals/216870"},
                      {name:"Marrakech Lounge", img_src:"http://lscdn.net/imgs/46a7f83e-3375-41ed-a98c-2019498cce52", url:"http://www.livingsocial.com/deals/217258"},
                      {name:"Pasta Pasta", img_src:"http://lscdn.net/imgs/1b789b74-e473-4537-9894-24d949cad94c", url:"http://www.livingsocial.com/deals/217266"},
                      {name:"Italian Kitchen on U", img_src:"http://lscdn.net/imgs/399d753e-d35c-47a5-9013-d67049b4dcaf", url:"http://www.livingsocial.com/deals/212480"},
                      {name:"Levante's", img_src:"http://lscdn.net/imgs/3a87dde3-1305-4b07-a8ff-2957095f645e", url:"http://www.livingsocial.com/deals/212518"}];

    var refCode = "instant_ordering_left_nav";
    var index = Math.floor(Math.random()*4);
    var currentImage = images[index];

    $sidebar.html('<a href="' + currentImage["url"] + '?ref=' + refCode + '"><img title="order from ' + currentImage["name"] + '" src="' + currentImage["img_src"] + '" /></a>');

    $("a", $sidebar).click(function(){
      if(_gaq){
        _gaq.push(['_trackEvent', 'instant ordering promo', 'clicked - '+ currentImage["name"], 'clicked sidebar promo for instant ordering']);
      }
    });

    $window.scroll(function() {
      if ($window.scrollTop() > offset.top) {
        $sidebar.attr('style', 'top: 0; position: fixed');
      } else {
        $sidebar.attr('style', 'top: auto; position: static');
      }
    });
  }

  dls.swapBackground = function(thumbSrc,src) {
    $('#background img:first').attr('src', thumbSrc);
    dls.loadBackground(src);
  };

  dls.loadBackground = function(src) {
    var img = new Image();
    dls.backgroundLoaded = false;
    $(img).
      load(function() {
        if (!dls.backgroundLoaded) dls.onBackgroundLoad($(img,true));
      })
      .attr('src', src);
    // load it right away if is in browser cache
    if (img.complete) {
      dls.backgroundLoaded = true;
      dls.onBackgroundLoad($(img),false);
    }
  };

  dls.onBackgroundLoad = function(img,animated) {
    var old = $('#background .stretch-image');
    var bgstyle = 'background-image:url('+img.attr('src')+');'
    if(!$('body').hasClass('ie9') && $('body').hasClass('ie')) bgstyle += 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='+img.attr('src')+',sizingMethod="scale");'
    if (!animated) {
      $('<div class="stretch-image"></div>').
        attr('style', bgstyle).
        appendTo('#background');
      old.remove();
      return;
    }
    var background = $('<div class="stretch-image"></div>').hide().
      attr('style',bgstyle).
      appendTo('#background');
    background.fadeIn(300, function(){ old.remove(); });
  };

  dls.currency = function(total,options) {
    total  = total.toFixed(2);
    format = options.format;
    format = format.replace(/%n/, total);
    format = format.replace('.', options.separator);
    format = format.replace(/%u/, options.unit);

    return format;
  };

  dls.socialShares = {
    twttrJsAttempts: 1,
    twttrJsMaxAttempts: 10,
    add: function(url, counterId, externalId) {
      $.post(url, { external_id: externalId }, function(data){
        // counter will be incremented out of band
        // just increment on page on success
        var count = parseInt($('#'+counterId).html());
        $('#'+counterId).html(count + 1);
      });
    },
    bindTwttrEvent: function(event) {
      if (dls.socialShares.twttrJsAttempts >= dls.socialShares.twttrJsMaxAttempts) {
        return false;
      } else if (typeof twttr === 'undefined') {
        dls.socialShares.twttrJsAttempts++;
        setTimeout(function()  { dls.socialShares.bindTwttrEvent(event)}, 500);
      } else {
        event();
      }
    }
  };

  dls.widgets = {};
  dls.widgets.counter = function(element, options) {
    this.element = element;
    this.options = options;
    this.units = this.element.find('.num');
    base = 1000;
    interval = (options[2][1] == "s" ? base : 60 * base); //seconds
    var self = this;
    this.timer = setInterval(function(){ self.tick(); }, base);
  };

  dls.widgets.counter.prototype = {
    tick: function() {
      this.options[2][0] -= 1;
      this.refresh(2);
      if (this.options[2][0] < 0) {
      this.options[2][0] = 59;  //works for minutes or seconds
        this.options[1][0] -= 1;
      this.refresh(2);
      this.refresh(1);
        if (this.options[1][0] < 0) {
        flip_number = (this.options[0][1] == "d" ? 23 : 59);
        this.options[1][0] = flip_number;
        this.options[0][0] -= 1;
        this.refresh(1);
        this.refresh(0);
        }
      }
      if (this.expired()) { window.location.reload();}
    },

    expired: function() {
      return this.options[0][0] <= 0 && this.options[1][0] <= 0 && this.options[2][0] <= 0;
    },

    refresh: function(index) {
      value = this.options[index][0];
      if (value.toString().length < 2) {
        value = "0" + value;
      }
      $(this.units.get(index)).html(value);
    }
  };

  dls.creditCard = {
    edit: function(a) {
      $.facebox({ajax: $(a).attr('href')});

      return false;
    },

    destroy: function(form) {
      if (confirm('Are you sure you want to delete this credit card?')) {
        $(form).submit();
      }
      return false;
    },

    submit: function(form) {
      form = $(form);
      form.find('.errors').html(null);
      var method = 'POST';
      if (form.find('input[name=_method]').val() == 'put') {
        method = 'PUT';
      }

      Payment.addCreditCard(
        Payment.serializeHash(form),
        function(data){
          if (method == 'POST') {
            var credit_card = {'token': data.credit_card.token};
            var default_checkbox = form.find('#credit_card_default');
            if (default_checkbox.length && default_checkbox[0].checked) {
              credit_card['default'] = default_checkbox.val();
            }
            $(document)
              .trigger('reload.credit-cards')
              .trigger('close.facebox');
          } else {
            $(document).trigger('reload.credit-cards').trigger('close.facebox');
          }
        },
        function(xhr, message, errorThrown) {
          data = $.parseJSON(xhr.responseText);
          $(data.errors).each(function(e){ form.find('.errors').append('<p>'+this+'</p>'); });
        },
        form.attr('action') + '.json'
      )

      return false;
    }
  };

  dls.purchases = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    gift: function(a) {
      console.info(a);
    },
    update_used: function(button, coupon_id) {
      // Show the mask and spinner
      $("#voucher-" + coupon_id).mask();

      // ajax submit the form
      $.post(button.href, {'_method':'put'}, function(data) {
        var voucher_row = $('#voucher-' + coupon_id);
        voucher_row.unmask();
        voucher_row.html(data);
        voucher_row.effect("highlight", {color: '#ffe383'}, 3000);
      }, 'js');

      return false;
    },
    update_gift_card: function(input) {
      var form = $(input).closest('form');
      form.find('.errors').html(null);
      $.post(form.attr('action'), form.serialize(), function(data) {
        if (data.errors) {
          $(data.errors).each(function(e){ form.find('.errors').append('<p>'+this+'</p>'); });
        } else {
          var resp = data.recipient_name;
          if (data.recipient_email.length > 0) {
            var date_items = data.deliver_email_on.split('/');
            var delivery_date = dls.purchases.months[parseInt(date_items[1], 0)-1] + ' ' + date_items[2] + ', ' + date_items[0];
            resp += ' (' + data.recipient_email + ') Delivery date: ' + delivery_date;
          }
          $('#gc-data-'+data.id).html(resp);
          $(document).trigger('close.facebox');
          $('div.system-notice').hide();
        }
      }, 'json');
    },
    claim_code: function(gc_link, purchase_id) {
      var link = $(gc_link);

      $.facebox(jtmpl('tmpl_code_processing',{}));
      $.post(link.attr('href'), function(response){
        var code = response["code"];
        var error = response["error"];
        if (code) {
          code = code.toString();
          $('#amazon-claim-code').html(code);
          $('#amazon-claim-code-link').replaceWith('<a href="/purchases/' + purchase_id + '/amazon_gift_code/register?code=' + code + '" class="button medium buy-now">apply to my Amazon.com account</a>');
        } else {
          $('#amazon-claim-code').html(error.toString());
        }
      }, 'json');
    },
    open_in_modal: function(a) {
       $.facebox({ajax: $(a).attr('href')});

       return false;
     },
     open_in_modal_div: function(a) {
       $.facebox({div: $(a).attr('href')});
     },
     submit: function(form) {
       form = $(form);
       form.find('.errors').html(null);
       $.post(form.attr('action'), form.serialize(), function(data){
         data = jQuery.parseJSON(data);
         if (data.errors) {
           $(data.errors).each(function(e){ form.find('.errors').append('<p>'+this+'</p>'); });
         } else {
           location.reload();
         }
       }, 'js');
     },

     show_fine_print: function() {
       $.facebox(jtmpl('tmpl_fine_print',{}));
       return false;
     },

     create_adventures_option_handlers: function () {
       $('a.cal').click(function(evt){
         $.facebox({ div: '#hidden-cal'}, 'adventures-cal');
         return false;
       });

     },

     create_option_handlers: function (currencyOptions, viewerCredit) {
        function currencyToNumber(currency) {
          return (parseFloat(currency.replace(currencyOptions.delimiter, "").replace(currencyOptions.separator, ".").replace(currencyOptions.unit, "")) || 0.0);
        }

        function numberToCurrency(number) {
          return dls.currency((number || 0.0), currencyOptions);
        }

        function reduce(array, f, initialValue) {
          var acc = initialValue;
          for(var i=0; i < array.length; i++) {
            acc = f(acc, array[i]);
          }
          return acc;
        }

        var $grandTotal = $('#grand_total');
        var $dealBucksUsed = $('#deal_bucks_used');

        $('.option_orders, .option_gifts').each(function(){
          var $tr = $(this);
          var price = currencyToNumber($tr.find('.price span').html());

          if($tr.hasClass('option_gifts')) {
            function toggleGiftDetails() {
              if($tr.find('input.option_gift:checked').val()) {
                var select = $tr.find('.quantity .quantity_field');
                if(select.val() < 1 && !$tr.hasClass('picker-gift')) {
                  select.val(1);
                }
                $tr.find('.option_gift_details').show();
              } else {
                $tr.find('.quantity .quantity_field').val(0);
                $tr.find('.option_gift_details').hide();
              }
            }
            $tr.find('input.option_gift').change(toggleGiftDetails);
            toggleGiftDetails();
          }

          function updateTotal() {
            var quantity = $tr.find('.quantity_field').val();

            var total = numberToCurrency(price * quantity);
            $tr.find('.total .total_value').html(total);

            var grandTotal = reduce($('#purchase td.total .total_value:visible'), function(acc, e) {
              return acc + currencyToNumber($(e).html());
            }, -viewerCredit);
            var dealBucksUsed = Math.min(viewerCredit, grandTotal + viewerCredit);
            grandTotal = Math.max(0, grandTotal);

            $grandTotal.html(numberToCurrency(grandTotal));
            $dealBucksUsed.html('&minus;' + numberToCurrency(dealBucksUsed));
            return grandTotal;
          }

          $(this).change(updateTotal);
          updateTotal();
       });
     },

     create_option_handlers_wide: function (currencyOptions, viewerCredit) {
        function currencyToNumber(currency) {
          return (parseFloat(currency.replace(currencyOptions.delimiter, "").replace(currencyOptions.separator, ".").replace(currencyOptions.unit, "")) || 0.0);
        }

        function numberToCurrency(number) {
          return dls.currency((number || 0.0), currencyOptions);
        }

        function reduce(array, f, initialValue) {
          var acc = initialValue;
          for(var i=0; i < array.length; i++) {
            acc = f(acc, array[i]);
          }
          return acc;
        }

        var $grandTotal = $('#grand_total');
        var $dealBucksUsed = $('#deal_bucks_used');

        $('.option_orders, .option_gifts').each(function(){
          var $tr = $(this);
          var price = currencyToNumber($tr.find('.price').html());

          function toggleGiftDetails() {
            if($tr.find('input.option_gift:checked').val()) {
              var select = $tr.find('.gift.quantity .quantity_field');
              if(select.val() < 1 && !$tr.hasClass('picker-gift')) {
                select.val(1);
              }
              select.show();
              $tr.find('.gift_hint').show();
              $tr.find('.total .total_value').show();
              $tr.prev().find('.gift_hint').show();
            } else {
              $tr.find('.gift.quantity .quantity_field').val(0).hide();
              $tr.find('.gift_hint').hide();
              $tr.find('.total .total_value').hide();
              $tr.prev().find('.gift_hint').hide();
            }
          }
          $tr.find('input.option_gift').change(toggleGiftDetails).change();

          function updateTotal() {
            var quantity = $tr.find('.quantity_field').val();
            var totalValue = price * quantity;
            var total = numberToCurrency(totalValue);
            $tr.find('.total .total_value').html(total);
            if (totalValue === 0.0) {
              $tr.find('.total .total_value').addClass('zero');
            } else {
              $tr.find('.total .total_value').removeClass('zero');
            }

            var totalSelected = reduce($('#purchase td.total .total_value:visible'), function(acc, e) {
              return acc + currencyToNumber($(e).html());
            }, 0);

            if(totalSelected === 0.0) {
              $(document).trigger('deals.purchases.none_selected');
            }
            else {
              $(document).trigger('deals.purchases.some_selected');
            }

            var grandTotal = Math.max(0, totalSelected - viewerCredit);
            var dealBucksUsed = Math.min(viewerCredit, grandTotal + viewerCredit);

            $grandTotal.html(numberToCurrency(grandTotal));
            $dealBucksUsed.html('&minus;' + numberToCurrency(dealBucksUsed));
            $('#grand_total').trigger('grand_total_updated');
            return grandTotal;
          }

          $(this).change(updateTotal);
          updateTotal();
         });
     }
  };

  dls.personAddress = {
    edit: function(url) {
      $.facebox({ajax: url});
      return false;
    },
    submit_email: function(form) {
      form = $(form);
      form.find('.errors').html(null);
    $("#email-submit-button").addClass("disabled").children().first().html("Saving...");
      $.post(form.attr('action') + '.js', form.serialize(), function(data){
      $("#monkey-form-contents").html(data);
      }, 'html');
      return false;
    },
    submit: function(form) {
      form = $(form);
      $.post(form.attr('action') + '.js', form.serialize(), function(data){
      $("#monkey-form-contents").html(data);
      }, 'html');
    }
  };

  dls.cities = {
    subscribe: function(a, url) {
      $(a).closest('.sub').removeClass('unsubscribed').addClass('subscribed');
      $.post(url, {
        email: dls.viewer.email
      }, function(html) {
        $('#subscriptions').html(html);
      });
    },
    add: function() {
      var select = $('#add-another-city');
      $.post(select.val(),{
        email: dls.viewer.email
      }, function(html) {
        $('#subscriptions').html(html);
      });
    },
    show_picker: function() {
      $.facebox.settings.modal = true;
      $.facebox(jtmpl('tmpl_pick_cities',{}));

      if($.browser.msie) {
        $("#city-siblings img").live("click", function() {
          $("#" + $(this).parents("label").attr("for")).click();
        });
      }

      if ($('#picker-person-email').length) {
        $("#create-many-ns-form").validate({
          rules: {
            "email": {
              required: true,
              email: true
            }
          }
        });
      }
    },
    show_family_edition_subscription_modal: function() {
      $.facebox.settings.modal = true;
      $.facebox(jtmpl('tmpl_subscribe_to_family',{}));
    },
    add_many: function(form) {
      form = $(form);
      $button = $("#ns_submit_button");
      if($button.hasClass("disabled")) {
        return false;
      } else {
        $button.addClass("disabled");
        $.post(form.attr('action') + '.js', form.serialize(), function(html) {
          $("#subscriptions").html(html);
        });
        return false;
      }
    },
    update_subscription: function(form_id) {
      form = $('#'+form_id);
      $.post(form.attr('action') + '.js', form.serialize(), function(html) {
        $("#subscriptions").html(html);
      });
      return false;
    }
  };

  dls.verticalLauncher = {
    show_launcher: function() {
      $.facebox.settings.modal = true;
      $.facebox(jtmpl('tmpl_launch_vertical',{}));

      if($.browser.msie) {
        $("#launcher img").live("click", function() {
          $("#" + $(this).parents("label").attr("for")).click();
        });
      }

      if ($('#launcher-person-email').length) {
        $("#create-many-ns-form").validate({
          rules: {
            "email": {
              required: true,
              email: true
            }
          }
        });
      }
    }
  };

  dls.smsVoucherNotification = {
    submit: function(form) {
      if(form.data("disabledOnSubmit") == undefined) {
        form.data("disabledOnSubmit", { submitted: false });
      }
      form_data = form.data("disabledOnSubmit");
      if(form_data.submitted == false) {
        form_data.submitted = true;
        //disable the button
        var send = form.find("#send-voucher-sms-button");
        send.attr("disabled", true);
        send.toggleClass("sixth");
        send.html("Sending...");
        send.attr("value", 'Sending...');
        //TODO disable form input as well (after you serialize the form)
        var serialized_form = form.serialize();
        var input = form.find("#send-voucher-sms-input");
        input.attr("disabled", true);

        //submit the form
        var message = $('#sms_voucher_notification_message');
        message.html('');
        $.post(form.attr('action') + '.json', serialized_form, function(data){
          if (data.errors) {
            message.text(data.errors);
          } else if (data.number) {
            message.text("Your voucher was sent to " + data.number);
            form.hide();
          } else {
            message.text('Your voucher has been sent.');
          }
          form_data.submitted = false;
          //enable the button
          send.attr("disabled", false);
          send.toggleClass("sixth");
          send.html('Send');
          send.attr("value", 'Send');
          //enable the input
          input.attr("disabled", false);
        }, 'json');
      }
      return false;
    }
  };

  $.fn.headerDropDown = function(options) {
    var dropDownArea = $(options.dropDownArea);
    var topOffset = (options.top) ? options.top : dropDownArea.closest('.deal-wrapper').length ? 26 : 46;
    var onDropDown = (options.onDropDown) ? options.onDropDown : function() {};
    $(this).click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).toggleClass('active');
      if (dropDownArea.is(':visible')) {
        closeAllMenus();
      } else {
        closeAllMenus();
        $(dropDownArea).addClass('headerDropDown-open');
        dropDownArea.
          css({top: (topOffset - 10 +'px'), opacity: 0.0}).
          show().
          animate({top: (topOffset + 'px'), opacity: 1.0}, {duration: 200}, onDropDown());
      }
    });

    $(".sub-close", dropDownArea).live('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      closeAllMenus();
      $("#market-subscription-handle").fadeOut(200);
    });

    var mouseOverDropDown = false;
    dropDownArea.live('mouseenter', function(){
      mouseOverDropDown = true;
    }).live('mouseleave', function(){
      mouseOverDropDown = false;
    });
    $("html").click(function(e){
      if (!mouseOverDropDown) {
        closeAllMenus();
      }
    });

    function closeAllMenus(){
      var mainHeader = $("#market-subscription");
      $(".headerDropDown-open", mainHeader).each(function(){
          $(this).hide();
          $(this).removeClass("headerDropDown-open");
          //$('#new-badge .user').removeClass('active');
      });
    }
    return this.each(function() {
    });
  };

  $.fn.extend({
    counter: function(options) {
      var args = Array.prototype.slice.call(arguments, 1);

      return this.each(function() {
        new dls.widgets.counter($(this), options);
      });
    },

    bucket: function() {
      return this.each(function() {
        var self = $(this);
        self.find('.deal-bucket-header').bind('click', function(e){
          e.preventDefault();
          var collapsed = self.hasClass('deal-bucket-open') ? '1' : '0';
          $.post($(this).attr('href') + '/update_collapsed', {'_method':'put', 'purchase[collapsed]': collapsed});
          self.toggleClass('deal-bucket-open');
        });
      });
    },

    purchaseFilter: function() {
      return this.each(function() {
        var self = $(this);
        self.bind('click', function(e) {
          $('#purchases-filter li').removeClass('selected');
          self.addClass('selected');
          $("#purchases")
            .removeClass('unused')
            .removeClass('gift-cards')
            .removeClass('all')
            .addClass(self.find('a:first').attr('fid'));
        });
      });
    }
  });
})(jQuery);

$(document).ready(function(){
  //tracking for primary navigation clicks
  $('#primary-nav > li').click(function(){
    var navItemID = $(this).attr('class').split(' ')[0], currItem = $(this).hasClass('current') ? $(this) : $(this).siblings('.current'), currItemID = currItem.length ? currItem.attr('class').split(' ')[0] : window.location.pathname;
    _gaq.push(['_trackEvent','LeftNav',navItemID,currItemID]);
  });

  //support for cross-browser last-child selection on deal description bullets in
  $('.deal-description ul > li:last-child,.deal-actions .details ul > li:last-child').addClass('last-child');

  //support for external link tracking
  $.expr[':'].external = function(obj){
    return !obj.href.match(/^mailto:/)
      && (obj.hostname != document.location.hostname);
  };

  //track external links in deal description ONLY
  $('.track-external a:external').click(function(){
    var datanode = $(this).closest('.track-external');
    var dealtype = datanode.attr('data-dealtype'),dealid = datanode.attr('data-dealid'),merchant = datanode.attr('data-merchant'),market = datanode.attr('data-market');
    _gaq.push(['_trackEvent', 'Deals Description - Merchant External Link', dealid+" - "+merchant+ " // "+market+" // "+dealtype]);
  });

  //fix for ie7 not wanting to go to links that are within a div.. refactor this at some point
  $('.ie7 .ls-item a img').click(function(e){
    var gotoHref = $(this).closest('a').attr('href');
    if(gotoHref != '#') {
      window.location = $(this).closest('a').attr('href');
    }
  });

});
;;
if(!Array.prototype.map){Array.prototype.map=function(a,b){var c,d,e;if(this==null){throw new TypeError(" this is null or not defined")}var f=Object(this);var g=f.length>>>0;if({}.toString.call(a)!="[object Function]"){throw new TypeError(a+" is not a function")}if(b){c=b}d=new Array(g);e=0;while(e<g){var h,i;if(e in f){h=f[e];i=a.call(c,h,e,f);d[e]=i}e++}return d}}
if(!Array.prototype.forEach){Array.prototype.forEach=function(a,b){var c,d;if(this==null){throw new TypeError(" this is null or not defined")}var e=Object(this);var f=e.length>>>0;if({}.toString.call(a)!="[object Function]"){throw new TypeError(a+" is not a function")}if(b){c=b}d=0;while(d<f){var g;if(d in e){g=e[d];a.call(c,g,d,e)}d++}}}
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(a){"use strict";if(this==null){throw new TypeError}var b=Object(this);var c=b.length>>>0;if(c===0){return-1}var d=0;if(arguments.length>0){d=Number(arguments[1]);if(d!=d){d=0}else if(d!=0&&d!=Infinity&&d!=-Infinity){d=(d>0||-1)*Math.floor(Math.abs(d))}}if(d>=c){return-1}var e=d>=0?d:Math.max(c-Math.abs(d),0);for(;e<c;e++){if(e in b&&b[e]===a){return e}}return-1}}

if (!Date.prototype.addMonths) {
  Date.prototype.addMonths = function(value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, 30));
    return this;
  }
}
dls.pendingLogin = false;
dls.fbReady = false;
dls.xfbml_render = 0;
dls.fbConnect = {
  fbIsDown : {
    init : function(errorMsg,msgContainerSelector ){
      if ( typeof msgContainerSelector === 'string' ) {
        this.container = msgContainerSelector;
      }
      if ( typeof errorMsg === 'string' && errorMsg !== '' ) {
        this.errorMsg = errorMsg;
      }
    },
    container : '#fb-login-button',
    errorMsg : 'Well nuts. We can\'t seem to connect to Facebook\'s servers to get you logged in. We\'re doing everything we can to get it up and running again, but until then how about browsing some more great deals?',
    html : function(){
      var html =  '<div class="ls-fbDown-errorMsg">' +
                    '<img src="/deals/images/bingy/fbdownfrown.png"/>' +
                    '<p>' + this.errorMsg + '</p>' +
                  '</div>';
      return html;
    },
    hasFBObject : function(){
      return typeof window.FB === 'object' && typeof FB.init === 'function';
    },
    setTimeout : function( timeout ){
      var self = dls.fbConnect.fbIsDown;
      self.timeout = window.setTimeout(function(){
        if ( !self.hasFBObject() ) {
          $(self.container).html(self.html());
        }
      },timeout || 5000);
    },
    clearTimeout : function(){
      var self = dls.fbConnect.fbIsDown;
      window.clearTimeout(self.timeout);
      $(self.container + ' .ls-fbDown-errorMsg').remove();
    }
  },
  init: function(appKey, options) {
    dls.fbConnect.fbIsDown.setTimeout();
    window.fbAsyncInit = function() {
      var fbchannel = window.location.protocol + '//' + window.location.host +"/deals/fbchannel.html?locale=" + dls.fb_locale;

      FB.init({
        appId  : appKey,
        cookie : true,
        status : true,
        xfbml  : true,
        channelUrl: fbchannel,
        oauth  : true
      });

      FB.Event.subscribe('auth.login', dls.fbConnect.AuthResponseHandler);

      FB.Event.subscribe('edge.create', function(response) {
          $("#like-to-buy-subtext").hide();
          $("#like-to-buy-link").hide();
          $("#buy-now-phone").show();
          $("#buy-now-link").show();
        }
      );

      FB.Event.subscribe('comments.add', function(response) {
        $(document).trigger('fbcomment.added');
      });

      FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.status == 'connected') {
          $(document).trigger('fb:connected');
        }
      });

      FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          if(Me.id() == null) {
            dls.fbConnect.AuthResponseHandler(response);
          }
          if (dls.fbConnect.fanPageIdPresent()) {
             dls.fbConnect.getUserLikes();
          }
        }
      });

      dls.fbReady = true;
      dls.fbConnect.fbIsDown.clearTimeout();
    };
    appendAsynchScript('connect.facebook.net/' + dls.fb_locale + '/all.js');
  },
  AuthResponseHandler: function(response) {
    if (response.authResponse && response.status == 'connected') {
      var expires = new Date();
      expires.setTime(expires.getTime()+(7*24*60*60*1000));
      document.cookie = "fbls_" + FBAppKey + "= " +
                        encodeURIComponent(JSON.stringify(response.authResponse)) +
                        ";path=/;domain=" + dls.tld +
                        ";expires=" + expires.toGMTString();
      if (dls.fbConnect.fanPageIdPresent()) {
         dls.fbConnect.getUserLikes();
      }
      function loginReady() {
        if (!dls.pendingLogin) {
      if(dls.redirect_path) { window.location = dls.redirect_path; return; }
          if (window.FbRedirectURL) { // for sharing... redirect after a share for example
            if (!window.location.search.match(/[&?]rt=[0-9]/)) {
              window.location = "/login?fba=1&rt=0&dest=" + encodeURI(FbRedirectURL);
            }
            else if (!document.cookie.match(/_lsx=2/)) {
              if (window.location.pathname.match(/deals/) && !window.location.pathname.match(/purchases|login/)) { return; }
              document.cookie = "_lsx=2; path=/; domain=" + dls.tld;
              window.location.reload();
            }
          }
          else if (!document.cookie.match(/_lsx=2/)) {
            if (window.location.pathname.match(/deals.*checkout/)) { return; }
            if (window.location.pathname.match(/deals/) && !window.location.pathname.match(/purchases|login/)) { return; }
            document.cookie = "_lsx=2; path=/; domain=" + dls.tld;
            window.location.reload();
          }
        }
      }
      FB.getAuthResponse();
      FB.api("/fql", { return_ssl_resources:true, q:"SELECT email, first_name, last_name, sex FROM user WHERE uid = me()"}, function(response) {
        if (!response.error) {
          var email = response.data[0].email,
              first_name = response.data[0].first_name,
              last_name = response.data[0].last_name,
              sex = response.data[0].sex;
          $("#fb-login-button").html("Loading...");
          $.post('/mtrc/logins.details.web.facebook.login_page.successful');
          $.post('/mtrc/logins.sessions.finished');
          $.ajax({type:'POST', url: '/deals/update_facebook', data: { "email": email, "first_name": first_name, "last_name": last_name, "sex": sex }, complete: loginReady, success: function(data) { dls.redirect_path = data['redirect_path']; } });
        }
        else {
          loginReady(); // force
          console.error(JSON.stringify(response.error));
          $.post('/mtrc/logins.details.web.facebook.login_page.failed');
        }
      });
    }
  },

  login: function(url, callback) {
    $.post('/mtrc/logins.sessions.started');
    if (callback && window.console && window.console.error) { console.error("dls.login with callback deprecated."); }
    FB.login(function(response) {
      if (response.session) {
        if (dls.isHomePage) {
          $(document).trigger('reload.session');
        } else {
          window.FbRedirectURL = url;
        }
        if (callback) {
          callback.call();
        }
      }
    });
    return false;
  },

  /* NOTE: this isn't used anywhere yet but might make fb logins
   * without page refreshes easier in the future.
   * */
  loginInline: function() {
    FB.login(function(response) {
      if (response.session) {
        $(document).trigger("reload.session");
      } else {}
    });
    return false;
  },

  loginAndReload: function() {
    FB.login(function(response) {
      if (response.session) {
        window.location.reload();
      } else {}
    });
    return false;
  },

  logoutAndGo: function(afterLogoutUrl) {
    dls._logout();
    FB.logout(function(response) {
      document.cookie = "viewer=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=" + dls.tld;
      document.cookie = "authd=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=" + dls.tld;
      document.cookie = "ls_fb_connected=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=" + dls.tld;
      document.cookie = "ls_deals_st=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=" + dls.tld;
      document.cookie = "fbsr_" + dls.fbKey + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=" + dls.tld;
      document.cookie = "fbsr_" + dls.fbKey + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/;";
      document.cookie = "fbls_" + dls.fbKey + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=" + dls.tld;
      document.cookie = "fblk_" + dls.fbKey + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=" + dls.tld;
      document.cookie = "fbm_" + dls.fbKey + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=" + dls.tld;
      window.location = '/deals/people/logout?dest='+afterLogoutUrl;
    });
    return false;
  },

  logout: function() {
    return dls.fbConnect.logoutAndGo('/');
  },

  getUserLikes: function() {
    FB.api('/me/likes', function(response) {
      if (response.data) {
        //console.log(response);
        var expires = new Date();
        expires.setTime(expires.getTime()+(7*24*60*60*1000));
        document.cookie = "fblk_" + dls.fbKey + "= " +
                          encodeURIComponent(JSON.stringify(response.data)) +
                          ";path=/;domain=" + dls.tld +
                          ";expires=" + expires.toGMTString();
        var fb_page_page_id = dls.fbConnect.fanPageId();
        if(!!fb_page_page_id) {
          for (var i = 0; i < response.data.length; i++) {
            if(response.data[i].id == fb_page_page_id) {
              $("#like-to-buy-subtext").hide();
              $("#like-to-buy-link").hide();
              $("#buy-now-phone").show();
              $("#buy-now-link").show();
              return false;
            }
          }
        }
      }
    });
    return false;
  },
  fanPageIdPresent: function () {
    return !!dls.fbConnect.fanPageId();
  },
  fanPageId: function () {
    return $("#deal-fan-page-id").html();
  },
  top_friends: function() {
    FB.api('/', 'post', {
      batch: [
        {
          relative_url: 'fql?q=' + encodeURIComponent("SELECT uid,name, pic, mutual_friend_count FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())"),
          method: 'get'
        }
      ]
    }, function (batch_response) {
      if ( typeof batch_response[0] !== 'undefined' && typeof batch_response[0].body !== 'undefined' ) {
        // TODO: Look for paging links to get more results if necessary
        var results = JSON.parse(batch_response[0].body);
        results = results.data;
        results.sort(function(a,b){return b.mutual_friend_count - a.mutual_friend_count});
        if ( typeof callback === 'function' ) {
          callback.call(callbackScope || window, results);
        }
      }
    });
  },
  sendMessage : function( friendId, config, callback ) {
    var defaults = {
      name : document.title,
      link : window.location.toString(),
      picture : '',
      method : 'send',
      to : friendId || 0,
      description : ''
    },
    uiOptions = $.extend(defaults,config);
    uiOptions = dls.fbConnect._createFBDialogObj(uiOptions);
    FB.ui(uiOptions,callback);
  },
  // callback: (error, friends)
  friends_posted: function(graph_type, resource_url, callback) {
    var friends = [], referFriends = {};
    FB.api("/fql", {return_ssl_resources: true, q: "SELECT uid, name, sex, pic_square FROM user WHERE is_app_user = 1 and uid IN (SELECT uid2 FROM friend WHERE uid1=me())"}, function(response) {
      if (response.error) { callback(response.error, []); return; }
      var users = response.data;
      if (users) {
        var batch = [];

        if (!window.console) { window.console = { log: function() { } } }

        function findFriendsThatBought() {
          var batchedUsers = {};
          batch.forEach(function(bset) { return batchedUsers[bset.user.uid] = bset.user; });
          FB.api('/?return_ssl_resources=1', 'post', {batch: batch}, function (batch_response) {
            if (batch_response.error) { callback(batch_response.error, []); return; }
            batch_response.forEach(function(bres) {
              if (!bres || !bres.body) { return; }
              JSON.parse(bres.body).data.forEach(function(o) {
                var post = o.data,
                    user = batchedUsers[o.from.id];
                if (!referFriends[user.uid] &&
                    post && post.deal && parseInt(post.deal.url.replace(/.*deals\/(\d+)/,'$1')) ==
                                         parseInt(resource_url.replace(/.*deals\/(\d+)/,'$1'))) {
                  friends.push(user);
                  referFriends[user.uid] = true;
                  return;
                }
              });
            });

            if (friends.length > 1) {
              callback(null, friends);
            } else if (0 == users.length && friends.length <= 1) {
              callback(null, friends);
            } else {
              searchUsers();
            }
          });
        }

        function searchUsers() {
          //console.log("call searchUsers: " + batch.length);
          batch = [];
          while (users.length) {
            var user = users.pop();
            if (user.sex) {
              user.himher = (user.sex == 'male') ? 'him' : 'her';
            } else {
              user.himher = 'them';
            }

            batch.push({
              user: user,
              method: 'get',
              relative_url: (user.uid + '/' + graph_type),
              return_ssl_resources: '1'
            });

            if (batch.length >= 50) {
              findFriendsThatBought();
              return;
            }
          }
          findFriendsThatBought();
        }

        searchUsers();

      }
      else {
        callback(null, friends); // no friends of this app
      }
    });
  },
  _createFBDialogObj : function(options){
    var data = {
       width: '450',
       text: "share",
       link:'http://' +  window.location.host + window.location.pathname,
       caption: 'livingsocial.com'
    };

    if (options) { for (var k in options) { data[k] = options[k]; } }

    if (data.params) {
      var args = [];
      for (var k in data.params) { if (data.params[k]) { args.push(encodeURIComponent(k) + "=" + encodeURIComponent(data.params[k])); } }
      if (data.link.match(/\?/)) { data.link += "&" + args.join("&"); } else { data.link += "?" + args.join("&"); }
    }

    // check for og data tags
    if (!data.image) { data.image = $("meta[property='og:image']").attr("content"); }
    if (!data.title) { data.title = $("meta[property='og:title']").attr("content"); }
    if (!data.description) { data.description = $("meta[property='og:description']").attr("content"); }

    return data;
  }
};

// share buttons
;(function() {
  var refcodes = [],
      __id = function(id) { return document.getElementById(id); };

  function set_refcodes(codes) {
    refcodes = codes;
  }
  set_refcodes(['ref_code', 'ref', 'ref2', 'cm', 'a2u', 'rpi', 'rpt', 'rui', 'ctr']);

  function ref_codes() {
    var ref_params = {},
        parts = window.location.search.split('&');
    for (var i = 0, len = parts.length; i < len; ++i) {
      var kv = parts[i],
          l = kv.split('='),
          k = l[0].replace(/\?/,''),
          v = l[1];
      if (refcodes.indexOf(k) != -1) { ref_params[k] = v; }
    }
    return ref_params;
  }

  function share(id, options, cb) {
    var node = __id(id),
        data = {
                 width: '450',
                 text: "share",
                 href:'http://' +  window.location.host + window.location.pathname,
                 caption: 'livingsocial.com'
               };
    if (!node) { return false; }
    if (options) { for (var k in options) { data[k] = options[k]; } }
    if (data.params) {
      var args = [];
      for (var k in data.params) { if (data.params[k]) { args.push(encodeURIComponent(k) + "=" + encodeURIComponent(data.params[k])); } }
      if (data.href.match(/\?/)) { data.href += "&" + args.join("&"); } else { data.href += "?" + args.join("&"); }
    }
    // check for og data tags
    if (!data.image) { data.image = $("meta[property='og:image']").attr("content"); }
    if (!data.title) { data.title = $("meta[property='og:title']").attr("content"); }
    if (!data.description) { data.description = $("meta[property='og:description']").attr("content"); }

    cb(node, data);
    return true;
  }

  function fb_share_box_show(data, share_count, share_icon, callback) {
    if (data.params && !data.href.match(/\?/)) {
      var args = [];
      for (var k in data.params) { if (data.params[k]) { args.push(encodeURIComponent(k) + "=" + encodeURIComponent(data.params[k])); } }
      if (data.href.match(/\?/)) { data.href += "&" + args.join("&"); } else { data.href += "?" + args.join("&"); }
    }
    var fbShareBundle = { attachment:{href: data.href,
                          media:[{type: "image",
                                  href: data.href,
                                  src: data.image}],
                                  name: data.title,
                                  description: data.description,
                                  caption: data.caption},
                                  method: "stream.publish",
                                  action_links: [] };
    FB.ui(fbShareBundle, function(r) {
      dls.pendingLogin = false; // restore after ui is displayed
      if (r && r.post_id) {
        if (share_count) { share_count.innerHTML = (parseInt(share_count.innerHTML) + 1); }
        var share_url = "/social_shares?share_type=" + data.share_type;
        if (data.shareable) { share_url += "&shareable_id=" + data.shareable; }
        if (data.shareable_type) { share_url += "&shareable_type=" + data.shareable_type; }
        if (r.post_id) { share_url += "&external_id=" + r.post_id; }
        $.post(share_url, function() { if (!data.prevent_reload) { window.location.reload(); } });
        if (callback) { callback(null, r.post_id); }
      } else {
        if (callback) { callback({cancel:true}, null); }
      }
    });
  }

  function fb_share(id, options) {
    if ($(".social-share-fb").length) {
      return;
    }

    var node, data;
    if (options && options.params && !options.params.ref) { options.params.ref = 'fb_share'; }
    if (!share(id, options, function(n,d) { node = n; data = d; })) {
      return;
    }

    data.share_type = 'FacebookShare';

    var share_icon = document.createElement("a"),
        share_count= document.createElement("span");

    function fbShareClick() {
      dls.pendingLogin = true;
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          data.prevent_reload = true;
          fb_share_box_show(data, share_count, share_icon);
        }
        else {
          FB.login(function(response) {
            if (!FbMe.isfbVisible()()) { data.prevent_reload = true; }
            fb_share_box_show(data, share_count, share_icon);
          });
        }
      });
      return false;
    }

    share_icon.className = "social-share-fb";
    share_icon.title = data.title;
    share_count.className = "social-share-fb-count";
    share_icon.innerHTML = data.text;
    share_count.innerHTML = data.counts;

    node.appendChild(share_icon);
    node.appendChild(share_count);
    node.onclick = fbShareClick;
    _ls.push(['share_counts', data.share_type, data.shareable, function(count) { share_count.innerHTML = count; }]);
  }

  function email_share() {
    var share_url = '/touch/track?event=share';
    $('#send-to-friends-wrapper a').attr("ping", share_url);
    $('#send-to-friends-wrapper a').click(function(e) {
      if (!("ping" in document.createElement("a"))) {
        $.ajax({
          url: share_url,
          async: false,
          timeout: 800
        });
      }
      return true;
    });
  }

  function tw_share(id, options) {
    if ($(".twitter-share-button").length) {
      return;
    }

    var locales = ['nl','en','fr', 'de', 'id', 'it', 'ja', 'ko', 'pt', 'ru', 'es', 'tr'],
        node, data;
    if (options && options.params && !options.params.ref) { options.params.ref = 'tw_share'; }
    if (!share(id, options, function(n,d) { node = n; data = d; })) {
      return;
    }
    data.share_type = 'TwitterShare';
    if (data.href) { data.options.url = data.href; }
    if (data.locale) {
      for (var i = 0; i < locales.length; ++i) {
        if (locales[i].match(data.locale)) {
          data.options.lang = locales[i];
          break;
        }
      }
    }

    var share_icon   = document.createElement("a"),
        share_count  = document.createElement("span"),
        tweet_button = document.createElement('div');

    var tweetCallback = function() {
      twttr.events.bind('tweet', function(event) {
        if (event) {
          share_count.innerHTML = (parseInt(share_count.innerHTML) + 1);
          var share_url = "/social_shares?share_type=" + data.share_type;
          if (data.shareable) { share_url += "&shareable_id=" + data.shareable; }
          if (data.shareable_type) { share_url += "&shareable_type=" + data.shareable_type; }
          $.post(share_url);
        };
      });
    };
    dls.socialShares.bindTwttrEvent(tweetCallback);

    tweet_button.id = 'tweet-button';
    tweet_button.appendChild(share_icon);
    share_icon.className = "twitter-share-button";
    for (var k in data.options) {
      $(share_icon).attr('data-' + k, data.options[k]);
    }

    share_count.className = "social-share-twitter-count";
    share_count.innerHTML = data.counts;

    node.appendChild(tweet_button);
    node.appendChild(share_count);

    appendAsynchScript('platform.twitter.com/widgets.js');

    _ls.push(['share_counts', data.share_type, data.shareable, function(count) { share_count.innerHTML = count; }]);
  }

  // relace the contents of the given element with the facebook like button, ensure any reference codes are also included
  function fb_like(id, options) {
    var node = document.getElementById(id),
        data = {
                 send: 'false',
                 width: '450',
                 'show-faces': false,
                 layout: 'button_count',
                 href: window.location.protocol + '//' +  window.location.host + window.location.pathname
               };
    if (options) { for (var k in options) { data[k] = options[k]; } }

    // fb_ref is special
    if (!data.ref) {
      var refs = ref_codes(); // grab ref params from window.location
      var refstr = [];
      for (var k in refs) {
        refstr.push(k + ':' + refs[k]);
      }
      data.ref = refstr.join("+");
    }

    var data_attrs = [];
    for (var dattr in data) { data_attrs.push("data-" + dattr + "=\"" + data[dattr] + "\""); }
    var button = "<div class='fb-like' " + data_attrs.join(' ') + "></div>";
    node.innerHTML = button;

    if ($.trim($('div.fb-like').html()) =='') {
      FB.XFBML.parse(node);
    }
    return node;
  }

  function fb_send(id, options) {
    var node = document.getElementById(id),
        data = {
                 send: 'false',
                 width: '450',
                 'show-faces': false,
                 layout: 'button_count',
                 href: window.location.protocol + '//' +  window.location.host + window.location.pathname
               };
    if (options) { for (var k in options) { data[k] = options[k]; } }

    // fb_ref is special
    if (!data.ref) {
      var refs = ref_codes(); // grab ref params from window.location
      var refstr = [];
      for (var k in refs) {
        refstr.push(k + ':' + refs[k]);
      }
      data.ref = refstr.join("+");
    }

    var data_attrs = [];
    for (var dattr in data) { data_attrs.push("data-" + dattr + "=\"" + data[dattr] + "\""); }
    var button = "<div class='fb-send' " + data_attrs.join(' ') + "></div>";
    node.innerHTML = button;

    if ($.trim($('div.fb-send').html()) == '') {
      FB.XFBML.parse(node);
    }
    return node;
  }

  function retweet(id, options) {
    // twitter
    if (options.ref) { options.url += '?' + options.ref.join('&'); }
    options.url = encodeURIComponent(options.url);
    var query = [];
    for (var k in options) { query.push(k + '=' + options[k]); }
    var twitter_url = window.location.protocol + "//platform.twitter.com/widgets/tweet_button.html?" + query.join("&");
    var iframe = document.createElement("iframe");
    iframe.setAttribute("allowtransparency", "1");
    iframe.setAttribute("frameBorder", "0");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("src", twitter_url);
    iframe.allowtransparency = '1';
    iframe.scrolling = 'no';
    iframe.frameBorder = '0';

    var width =  options.width ? options.width : '60px',
        height =  options.height ? options.height : '20px';
    iframe.style.width = width;
    iframe.style.height = height;
    document.getElementById(id).appendChild(iframe);;
  }

  var fetchedCounts = null,
      sharefetching = false,
      fetchback = [];

  function share_counts(sharetype, shareid, cb) {
    if (fetchedCounts) {
      cb(fetchedCounts[sharetype]);
    }
    else {
      if (sharefetching) {
        fetchback.push([sharetype, shareid, cb]);
      }
      else {
        sharefetching = true;
        $.get("/shares/" + shareid + ".json", function(res) {
          fetchedCounts = {};
          fetchedCounts.TwitterShare = res.tw_count;
          fetchedCounts.FacebookShare = res.fb_count;
          fetchedCounts.DealsSold = res.number_sold;
          fetchedCounts.DealsLeft = res.deals_left;

          cb(fetchedCounts[sharetype]);
          while(fetchback.length > 0) {
            var args = fetchback.shift()
                sharetype = args.shift(),
                shareid = args.shift(),
                cb = args.shift();
            cb(fetchedCounts[sharetype]);
          }
        },'json');
      }
    }
  }

  function fb_friends(selector, graph_type, deal_url, deal_id, tries) {
    var node = $(selector);
    if (!node) { return; }
    //node.html('<img style="margin:25px 200px;border:none;" src="/deals/images/share_og/throbber.gif"/>');

    $('#deal-buy-box .send-as-gift').hide();

    dls.fbConnect.friends_posted(graph_type, deal_url, function(error, friends) {
      if (error || friends == null) {
        $('#deal-buy-box .send-as-gift').show();
        node.hide();
        if (error.type == 'OAuthException' && tries == undefined) {
          node.show();
          _ls.push(['fb_friends', selector, graph_type, deal_url, deal_id, 1]);
        }
        return;
      }
      var uids = friends.map(function(friend) { return friend.uid; });

      if (friends.length == 0) {
        $('#deal-buy-box .send-as-gift').show();
        $.cookie('rfui', null, { path    : '/',  domain  : dls.tld });
        node.hide();
      }

      var uid = $.cookie('rfui');
      var referring_friend = null;

      for (var i in friends) {
        var friend = friends[i];
        if (friend.uid == uid) {
          referring_friend = friend;
          break;
        }
      }
      if (!referring_friend && uid) {
        $.cookie('rfui', null, { path    : '/',  domain  : dls.tld });
      }

      if (friends.length == 1) {
        node.html(Mustache.to_html($("#fb-person-template-single").html(), {
          friend : friends[0]
        }));

        $.cookie('rfui', friends[0].uid, {
          expires : 10080,
          path    : '/',
          domain  : dls.tld
        });
        node.show();

      } else if (friends.length > 1) {
        node.html(Mustache.to_html($("#fb-person-template").html(), {
          friends       : friends,
          friends_count : friends.length
        }));
        node.show();
      }
      $("#me3-inverse img").click(function(e) { e.preventDefault();
        var link = $("#deal-buy-box .button-container a.buy-now").attr("href");
        if (link) { window.location = link; }
      });
    });
  }

  function ls_reveal(selector, wait_time, animation_start_options, animation_end_options, speed, cb) {
    if (!wait_time) { wait_time = 500; }
    if (!animation_start_options) { animation_start_options = {opacity:0,display:'block'}; }
    if (!animation_end_options) { animation_end_options = {opacity:1}; }
    if (!speed) { speed = 'fast'; }

    setTimeout(function() {
      $(selector).css(animation_start_options);
      $(selector).animate(animation_end_options,'fast', cb);
    }, wait_time);
  }

  function trackEvent(category, action, opt_label, opt_value, opt_noninteraction) {
    _gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);

    var tracking = []
      , tracker  = new Image();

    for (var a in arguments) { if (arguments[a]) { tracking.push(arguments[a]); } }
    tracker.src = "https://t.livingsocial.com/track/stat.gif?n=" + encodeURIComponent(tracking.join('.'));
  }

  function clip(buttonId, copyLinkId, copyLinkContainerId, options) {
    if ($(copyLinkId).length > 0) {
      options = options ? options : {};
      (function() {
        var copyLinkButton = $(buttonId);
        if (copyLinkButton.length > 0) {
          ZeroClipboard.setMoviePath( '/deals/swf/ZeroClipboard.swf' );
          var clip = new ZeroClipboard.Client();
          clip.setHandCursor(true);
          clip.addEventListener("load", function() { });
          clip.addEventListener('complete', function(client, text) {
            $(copyLinkId).css({'backgroundColor':'#FFF'});
            copyLinkButton.html('<span>copied</span>');
          } );
          clip.addEventListener('mouseDown', function (client) {
            clip.setText($(copyLinkId).val());
          } );
          clip.addEventListener('mouseOut', function (client) {
            $(copyLinkId).css({backgroundColor:'#FFF'});
            clip.setText($(copyLinkId).val());
          } );
          clip.addEventListener('mouseOver', function (client) {
            clip.setText($(copyLinkId).val());
          } );
          clip.glue(buttonId.replace(/^#/,''));
        }
      })();
    }
  }

  function ls_share_bar(share) {
    var uid = (function() { var id = document.cookie.match(/viewer=(\d+)/);
                           if (id && id.length == 2) { return id[1]; } })();
    var render_share = function(evt, data) {
      var me = data.body;

      var pid = (function() {
        if (me && me.deals && me.deals[share.deal_id]) {
          var purchases = me.deals[share.deal_id];
          var best = 0, bi = 0;
          for (var i = 0, len = purchases.length; i < len; ++i) {
            var ref_count = purchases[i][2];
            if (ref_count > best) {
              best = ref_count;
              bi = i;
            }
          }
          return purchases[bi][0];
        }
      })();

      _ls.push(['fb_share', 'fbshare', {href: share.share_url,
                                        params: {rpi: pid, rui: uid, deal_share: share.deal_share},
                                        shareable: share.deal_id,
                                        counts: share.fb_share_counts,
                                        shareable_type: share.shareable_type}]);

      _ls.push(['tw_share', 'tweetit', {
        shareable: share.deal_id,
        shareable_type: share.shareable_type,
        params: {rpi: pid, rui: uid},
        locale: share.locale,
        href: share.share_url,
        title: share.twitter_title,
        counts: share.twitter_counts,
        options: {
          counturl: encodeURIComponent(share.deal_url),
          text: share.text,
          count: "none",
          via: 'LivingSocial',
          lang: share.locale,
          width: '60px'
        }
      }]);

      _ls.push(['email_share', '', {}]);
    };
    if (uid) {
      Stached._bind("url:/me/info.json", render_share);
    } else {
      render_share('evt', {body: null, xhr: null});
    }
  }

// register functions

  var ls = {}, fb_deferred = [];
  ls.retweet = retweet;
  ls.fb_like = fb_like;
  ls.fb_send = fb_send;
  ls.share_counts = share_counts;
  ls.fb_friends = fb_friends;
  ls.fb_share = fb_share;
  ls.tw_share = tw_share;
  ls.email_share = email_share;
  ls.ls_reveal = ls_reveal;
  ls.fb_share_show = fb_share_box_show;
  ls._trackEvent = trackEvent;
  ls.clip = clip;
  ls.ls_share_bar = ls_share_bar;

  ls.set_refcodes = set_refcodes;

  function run_fb_deferred() {
    if (!dls.fbReady) {
      setTimeout(run_fb_deferred, 400);
      return;
    }
    // invoke deferred
    while (fb_deferred.length > 0) {
      _ls.push(fb_deferred.shift());
    }
  }

  function runner() { // async runner

    function invoke(run) {
      var func_name = run.shift(), func = ls[func_name];
      if (!dls.fbReady && func_name.match(/^fb/)) {
        run.unshift(func_name);
        fb_deferred.push(run);
      }
      else {
        func.apply(func, run);
      }

      // continue to wait for fb
      if (fb_deferred.length > 0) {
        setTimeout(run_fb_deferred, 100);
      }
    }

//    try {
      while (window._ls.length > 0) {
        invoke(_ls.shift());
      }

      // redefine push to execute immediately
      _ls.push = invoke;
      _ls.queue = invoke; // migrate to this API
//    } catch(e) {
//      setTimeout(runner, 3000);
//      console.error(e);
//    }

  }

  dls.runner = runner;

})();
;;(function($) {  
  dls.IphoneDL = function(element, imagePaths) {
    this.images     = [];
    this.currentIndex  = 0;
    this.requestedIndex = 0;
    this.imagePaths = imagePaths;
    this.container  = $(element);
    this.pager      = $('#pager');
    var self = this;
    for (var i = 0; i < this.imagePaths.length; i++) {
      (new Image(1,1)).src = this.imagePaths[i];

      var dot = $('<span></span>')
        .html('&middot;')
        .attr({id: 'dot-'+i, className: 'dot', rel: i})
        .click(function(e){
          self.play($(this).attr('rel'));
        });
      this.pager.append(dot);
    }
    this.play(0);
  };
  
  dls.IphoneDL.prototype = {
    play: function(startingIndex) {
      this.currentIndex = startingIndex;
      
      var next = this.getImage(this.imagePaths[this.currentIndex]);
      var curr = this.container.find('img:first');
  
      if (curr.length > 0 && !(this.requestedIndex === startingIndex)) {
        this.selectDot(this.currentIndex);
  
        next.css({left: 163, position: 'absolute'});
        this.container.append(next);

        next.animate({left: 0}, {queue: false});
        curr.animate({left: -163},{
          queue: false,
          complete: function() {
            curr.remove();
          }
        });
      } else {
        this.container.html(next);
      }
  
      this.requestedIndex = startingIndex;
      this.deselectDots();
      this.selectDot(this.currentIndex);
  
      if (this.timeout) clearTimeout(this.timeout);
  
      this.currentIndex++;
      if (this.currentIndex == this.imagePaths.length) this.currentIndex = 0;
      var self = this;
      this.timeout = setTimeout(function(){
        self.play(self.currentIndex);
      }, 4000);        
    },

    selectDot: function(index) {
      $('.dot-'+index).animate({color: '#fff'},300);
    },

    deselectDots: function() {
      this.pager.find('.dot').css({color: '#5a5a5a'});
    },

    getImage: function(path) {
      var image = this.images[path];
      if (!image) {
        image = $('<img/>').attr('src', path);
        this.images[path] = image;
      }
      return image;
    }
  };
  
  $.fn.extend({
    iphoneDL: function(options) {
  	  var args = Array.prototype.slice.call(arguments, 1);

  	  return this.each(function() {
        var dl = new dls.IphoneDL($(this), options);
  	  });
    }
  });
})(jQuery);;var Gifting = {
  init: function(currencyOptions, envelopePrice) {
    this.currencyOptions = currencyOptions;
    this.envelopePrice = envelopePrice;

    var self = this;

    $('.gift_coupons li input[type="radio"]').change( function() {
      var li = $(this).closest('li');
      var lis = $(this).closest('ul').find('li');
      lis.each( function() {
        $(this).removeClass('active');
        $(this).find('.form-container').slideUp();
      });
      li.addClass('active');
      self.onFormValidate();
      self.updateSubtotal();
      li.find('.form-container').slideDown(function() {
        li.find('input[type="text"]:first').select();
      });
    });

    this.onFormValidate();
    this.updateSubtotal();
  },

  onFormValidate: function() {
    var valid = true;
    $('.gift_coupons li ul.gift_options').each (function(i,v) {
      var e = $(this);
      if ((e.find('.radio input:checked').length === 0) || !valid) {
        valid = false;
      }
    });
    if (valid) {
      Gifting.enableSubmitButton();
    }
  },

  enableSubmitButton: function() {
    $('a.btn.disabled').removeClass('disabled').click(function() {
      $('#gift_form').submit();
    });
    return false;
  },

  updateSubtotal: function (currencyOptions) {

    var $subtotal = $('#gift_envelope_subtotal');
    var $payments = $('#payment-fields');

    var $grandTotal = $('#grand_total');
    var envelopes = $('.gift_coupons li input[type="radio"][value="envelope"]:checked').length;

    if(envelopes) {
      $subtotal.slideDown();
      $payments.slideDown();

      var price = this.numberToCurrency(envelopes * this.envelopePrice);

      $subtotal.find('td.quantity').html(envelopes);
      $subtotal.find('td.total').html(price);
      $('#grand_total').html(price);

    } else {
      $subtotal.slideUp();
      $payments.slideUp();
    }
  },

  numberToCurrency: function(number) {
    return dls.currency((number || 0.0), this.currencyOptions);
  },

  // used by gifts/_form, possibly dead code:
  enableField: function(selector) {
    $(selector).removeAttr("disabled");
    $(selector).removeClass("disabled");
  },

  enableFields: function(coupon_id) {
    this.enableField("#coupons_" + coupon_id + "_recipient_email");
    this.enableField("#coupons_" + coupon_id + "_message");
    this.enableField("#coupons_" + coupon_id + "_deliver_email_on");
  },

  enableVisaGiftFields: function(coupon_id) {
    this.enableField("#gift_recipient_email");
    this.enableField("#gift_message");
  },

  disableField: function(selector) {
    $(selector).attr("disabled", true);
    $(selector).addClass("disabled");
  },

  disableFields: function(coupon_id) {
    this.disableField("#coupons_" + coupon_id + "_recipient_email");
    this.disableField("#coupons_" + coupon_id + "_message");
    this.disableField("#coupons_" + coupon_id + "_deliver_email_on");
  },

  disableVisaGiftFields: function(coupon_id) {
    this.disableField("#gift_recipient_email");
    this.disableField("#gift_message");
  }

};
;$(document).ready(function(){
  $('.deal-bucket').bucket();
  $('#purchases-filter li').purchaseFilter();
  $('.vouchers a.edit-gift-card').click(function() {
    $.facebox({ajax: $(this).attr('href')});
    return false;
  });
  $('.vouchers a.amazon-claim').click(function() {
    var purchase_id = $(this).attr('id').split('_')[1];
    dls.purchases.claim_code(this, purchase_id);
    return false;
  });
  $('li.purchase .purchase-summary').live('click',function() {
    var otherExpanded = $('.expanded').not($(this).parent());
    $(otherExpanded).find('.purchase-details').slideUp(function() {
      otherExpanded.removeClass('expanded');
    });

    var element = $(this).parent();
    var purchase_id = element.attr('id').split('_')[1];
    if (element.hasClass('gift-card')) {
      // gift card details are loaded with the page
      element.toggleClass('expanded');
      element.find('.purchase-details').slideToggle();
    } else {
      // send a single ajax request
      if (element.find('.purchase-details').attr('data-has-content') == 'true') {
        element.toggleClass('expanded');
        element.find('.purchase-details').slideToggle();
      } else {
        element.find('.purchase-details').addClass('loading');
        element.find('.purchase-details').show();
        var url = '/purchases/' + purchase_id + '/details';
        $.get(url, function(content) {
          element.find('.purchase-details').html(content);
          element.toggleClass('expanded');
          element.find('.purchase-details').removeClass('loading');
          element.find('.purchase-details').attr('data-has-content', 'true');
        });
      }
    }
  });
  $('#purchases .pagination a').live('click', function() {
    $.get($(this).attr('href'), function(data) {
      $('#purchases').replaceWith(data);
    });
    return false;
  });
});
;$(function() {
  
  function enableSubmitButton() {
    $('.feedback-form #feedback-submit').removeAttr('disabled');
  }

  function isValidForm(form) {
    var thumbVal = parseInt(form.find('#purchase_feedback_thumbs_up').val(), 10);
    return thumbVal === 1 || thumbVal === 0 ? true : false;
  }

  function disableForm() {
    var submitButton = $('.feedback-form #feedback-submit');
    submitButton.addClass('disabled').attr('disabled', true).val('submitting...');
  }

  $('#thumbs-up').bind('click', function(e) {
    e.preventDefault();
    $('#thumbs-down').closest('.rating').removeClass('selected');
    $('#thumbs-up').closest('.rating').addClass('selected');
    $('#purchase_feedback_thumbs_up').val(1);
  });
  
  $('#thumbs-down').bind('click', function(e) {
    e.preventDefault();
    $('#thumbs-up').closest('.rating').removeClass('selected');
    $('#thumbs-down').closest('.rating').addClass('selected');
    $('#purchase_feedback_thumbs_up').val(0);
  });

  $('.has_visited input[type=radio]').bind('change', function(e) {
    $('.feedback-form .last-visit').toggle();
  });

  $('a.close-notice').bind('click', function(e) {
    e.preventDefault();
    $(this).closest('.feedback-form .system-notice').hide();
  });

  function showFormError() {
    window.scroll(0,0);
    $('.feedback-form .system-notice').show();
    if ($('.feedback-form #feedback-submit').hasClass('disabled')) {
      $('.feedback-form #feedback-submit').removeClass('disabled').val('submit feedback');
    }
  }

  $('#feedback-form').bind('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    if (isValidForm(form)) {
      disableForm();
      $.ajax({
        url: form.attr('action'),
        type: 'post',
        data: form.serialize(),
        success: function(data) {
          $('.feedback-form').hide();
          $('.feedback .feedback-thanks').toggle();
          window.scroll(0,0);
        },
        error: function(data) {
          showFormError();
          enableSubmitButton();
        }
      });
    } else {
      showFormError();
    }
  });

  function initForm() {
    $('.feedback-form a.close-notice').trigger('click');
    $('.feedback-form .last-visit').hide();
    $('.feedback .feedback-thanks').hide();
  }
  initForm();

});
;jQuery(function($) {
  $('#vouchers .sort a, #vouchers .pagination a').live('click', function() {
    $.get($(this).attr('href'), function(data) {
      $('#vouchers').replaceWith(data);
    });
    return false;
  });

  $('#vouchers a.show_envelope_details, #purchases a.show_envelope_details').live('click', function() {
    $(this).fadeOut();
    $(this).siblings('.gift_envelope_details').slideDown();
    return false;
  });
});
;// Simple Set Clipboard System
// Author: Joseph Huckaby

var ZeroClipboard = {
	
	version: "1.0.7",
	clients: {}, // registered upload clients on page, indexed by id
	moviePath: 'ZeroClipboard.swf', // URL to movie
	nextId: 1, // ID of next movie
	
	$: function(thingy) {
		// simple DOM lookup utility function
		if (typeof(thingy) == 'string') thingy = document.getElementById(thingy);
		if (!thingy.addClass) {
			// extend element with a few useful methods
			thingy.hide = function() { this.style.display = 'none'; };
			thingy.show = function() { this.style.display = ''; };
			thingy.addClass = function(name) { this.removeClass(name); this.className += ' ' + name; };
			thingy.removeClass = function(name) {
				var classes = this.className.split(/\s+/);
				var idx = -1;
				for (var k = 0; k < classes.length; k++) {
					if (classes[k] == name) { idx = k; k = classes.length; }
				}
				if (idx > -1) {
					classes.splice( idx, 1 );
					this.className = classes.join(' ');
				}
				return this;
			};
			thingy.hasClass = function(name) {
				return !!this.className.match( new RegExp("\\s*" + name + "\\s*") );
			};
		}
		return thingy;
	},
	
	setMoviePath: function(path) {
		// set path to ZeroClipboard.swf
		this.moviePath = path;
	},
	
	dispatch: function(id, eventName, args) {
		// receive event from flash movie, send to client		
		var client = this.clients[id];
		if (client) {
			client.receiveEvent(eventName, args);
		}
	},
	
	register: function(id, client) {
		// register new client to receive events
		this.clients[id] = client;
	},
	
	getDOMObjectPosition: function(obj, stopObj) {
		// get absolute coordinates for dom element
		var info = {
			left: 0, 
			top: 0, 
			width: obj.width ? obj.width : obj.offsetWidth, 
			height: obj.height ? obj.height : obj.offsetHeight
		};

		while (obj && (obj != stopObj)) {
			info.left += obj.offsetLeft;
			info.top += obj.offsetTop;
			obj = obj.offsetParent;
		}

		return info;
	},
	
	Client: function(elem) {
		// constructor for new simple upload client
		this.handlers = {};
		
		// unique ID
		this.id = ZeroClipboard.nextId++;
		this.movieId = 'ZeroClipboardMovie_' + this.id;
		
		// register client with singleton to receive flash events
		ZeroClipboard.register(this.id, this);
		
		// create movie
		if (elem) this.glue(elem);
	}
};

ZeroClipboard.Client.prototype = {
	
	id: 0, // unique ID for us
	ready: false, // whether movie is ready to receive events or not
	movie: null, // reference to movie object
	clipText: '', // text to copy to clipboard
	handCursorEnabled: true, // whether to show hand cursor, or default pointer cursor
	cssEffects: true, // enable CSS mouse effects on dom container
	handlers: null, // user event handlers
	
	glue: function(elem, appendElem, stylesToAdd) {
		// glue to DOM element
		// elem can be ID or actual DOM element object
		this.domElement = ZeroClipboard.$(elem);
		
		// float just above object, or zIndex 99 if dom element isn't set
		var zIndex = 99;
		if (this.domElement.style.zIndex) {
			zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
		}
		
		if (typeof(appendElem) == 'string') {
			appendElem = ZeroClipboard.$(appendElem);
		}
		else if (typeof(appendElem) == 'undefined') {
			appendElem = document.getElementsByTagName('body')[0];
		}
		
		// find X/Y position of domElement
		var box = ZeroClipboard.getDOMObjectPosition(this.domElement, appendElem);
		
		// create floating DIV above element
		this.div = document.createElement('div');
		var style = this.div.style;
		style.position = 'absolute';
		style.left = '' + box.left + 'px';
		style.top = '' + box.top + 'px';
		style.width = '' + box.width + 'px';
		style.height = '' + box.height + 'px';
		style.zIndex = zIndex;
		
		if (typeof(stylesToAdd) == 'object') {
			for (addedStyle in stylesToAdd) {
				style[addedStyle] = stylesToAdd[addedStyle];
			}
		}
		
		// style.backgroundColor = '#f00'; // debug
		
		appendElem.appendChild(this.div);
		
		this.div.innerHTML = this.getHTML( box.width, box.height );
	},
	
	getHTML: function(width, height) {
		// return HTML for movie
		var html = '';
		var flashvars = 'id=' + this.id + 
			'&width=' + width + 
			'&height=' + height;
			
		if (navigator.userAgent.match(/MSIE/)) {
			// IE gets an OBJECT tag
			var protocol = location.href.match(/^https/i) ? 'https://' : 'http://';
			html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+protocol+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+width+'" height="'+height+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+flashvars+'"/><param name="wmode" value="transparent"/></object>';
		}
		else {
			// all other browsers get an EMBED tag
			html += '<embed id="'+this.movieId+'" src="'+ZeroClipboard.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+width+'" height="'+height+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" wmode="transparent" />';
		}
		return html;
	},
	
	hide: function() {
		// temporarily hide floater offscreen
		if (this.div) {
			this.div.style.left = '-2000px';
		}
	},
	
	show: function() {
		// show ourselves after a call to hide()
		this.reposition();
	},
	
	destroy: function() {
		// destroy control and floater
		if (this.domElement && this.div) {
			this.hide();
			this.div.innerHTML = '';
			
			var body = document.getElementsByTagName('body')[0];
			try { body.removeChild( this.div ); } catch(e) {;}
			
			this.domElement = null;
			this.div = null;
		}
	},
	
	reposition: function(elem) {
		// reposition our floating div, optionally to new container
		// warning: container CANNOT change size, only position
		if (elem) {
			this.domElement = ZeroClipboard.$(elem);
			if (!this.domElement) this.hide();
		}
		
		if (this.domElement && this.div) {
			var box = ZeroClipboard.getDOMObjectPosition(this.domElement);
			var style = this.div.style;
			style.left = '' + box.left + 'px';
			style.top = '' + box.top + 'px';
		}
	},
	
	setText: function(newText) {
		// set text to be copied to clipboard
		this.clipText = newText;
		if (this.ready) this.movie.setText(newText);
	},
	
	addEventListener: function(eventName, func) {
		// add user event listener for event
		// event types: load, queueStart, fileStart, fileComplete, queueComplete, progress, error, cancel
		eventName = eventName.toString().toLowerCase().replace(/^on/, '');
		if (!this.handlers[eventName]) this.handlers[eventName] = [];
		this.handlers[eventName].push(func);
	},
	
	setHandCursor: function(enabled) {
		// enable hand cursor (true), or default arrow cursor (false)
		this.handCursorEnabled = enabled;
		if (this.ready) this.movie.setHandCursor(enabled);
	},
	
	setCSSEffects: function(enabled) {
		// enable or disable CSS effects on DOM container
		this.cssEffects = !!enabled;
	},
	
	receiveEvent: function(eventName, args) {
		// receive event from flash
		eventName = eventName.toString().toLowerCase().replace(/^on/, '');
				
		// special behavior for certain events
		switch (eventName) {
			case 'load':
				// movie claims it is ready, but in IE this isn't always the case...
				// bug fix: Cannot extend EMBED DOM elements in Firefox, must use traditional function
				this.movie = document.getElementById(this.movieId);
				if (!this.movie) {
					var self = this;
					setTimeout( function() { self.receiveEvent('load', null); }, 1 );
					return;
				}
				
				// firefox on pc needs a "kick" in order to set these in certain cases
				if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
					var self = this;
					setTimeout( function() { self.receiveEvent('load', null); }, 100 );
					this.ready = true;
					return;
				}
				
				this.ready = true;
				this.movie.setText( this.clipText );
				this.movie.setHandCursor( this.handCursorEnabled );
				break;
			
			case 'mouseover':
				if (this.domElement && this.cssEffects) {
					this.domElement.addClass('hover');
					if (this.recoverActive) this.domElement.addClass('active');
				}
				break;
			
			case 'mouseout':
				if (this.domElement && this.cssEffects) {
					this.recoverActive = false;
					if (this.domElement.hasClass('active')) {
						this.domElement.removeClass('active');
						this.recoverActive = true;
					}
					this.domElement.removeClass('hover');
				}
				break;
			
			case 'mousedown':
				if (this.domElement && this.cssEffects) {
					this.domElement.addClass('active');
				}
				break;
			
			case 'mouseup':
				if (this.domElement && this.cssEffects) {
					this.domElement.removeClass('active');
					this.recoverActive = false;
				}
				break;
		} // switch eventName
		
		if (this.handlers[eventName]) {
			for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
				var func = this.handlers[eventName][idx];
			
				if (typeof(func) == 'function') {
					// actual function reference
					func(this, args);
				}
				else if ((typeof(func) == 'object') && (func.length == 2)) {
					// PHP style object + method, i.e. [myObject, 'myMethod']
					func[0][ func[1] ](this, args);
				}
				else if (typeof(func) == 'string') {
					// name of function
					window[func](this, args);
				}
			} // foreach event handler defined
		} // user defined handler for event
	}
	
};
;/*
 * jQuery UI Datepicker 1.8.6
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function( $, undefined ) {

$.extend($.ui, { datepicker: { version: "1.8.6" } });

var PROP_NAME = 'datepicker';
var dpuuid = new Date().getTime();

/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this.debug = false; // Change this to true to start debugging
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
	this._inlineClass = 'ui-datepicker-inline'; // The name of the inline marker class
	this._appendClass = 'ui-datepicker-append'; // The name of the append marker class
	this._triggerClass = 'ui-datepicker-trigger'; // The name of the trigger marker class
	this._dialogClass = 'ui-datepicker-dialog'; // The name of the dialog marker class
	this._disableClass = 'ui-datepicker-disabled'; // The name of the disabled covering marker class
	this._unselectableClass = 'ui-datepicker-unselectable'; // The name of the unselectable cell marker class
	this._currentClass = 'ui-datepicker-current-day'; // The name of the current day marker class
	this._dayOverClass = 'ui-datepicker-days-cell-over'; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		closeText: 'Done', // Display text for close link
		prevText: 'Prev', // Display text for previous month link
		nextText: 'Next', // Display text for next month link
		currentText: 'Today', // Display text for current month link
		monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'], // Names of months for drop-down and formatting
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
		weekHeader: 'Wk', // Column header for week of the year
		dateFormat: 'mm/dd/yy', // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: '' // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
		showAnim: 'fadeIn', // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: '', // Display text following the input box, e.g. showing the format
		buttonText: '...', // Text for trigger button
		buttonImage: '', // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: 'c-10:c+10', // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: '+10', // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with '+' for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: 'fast', // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: '', // Selector for an alternate field to store selected dates into
		altFormat: '', // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false // True to size the input for the date format, false to leave as is
	};
	$.extend(this._defaults, this.regional['']);
	this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>');
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: 'hasDatepicker',

	/* Debug logging (if enabled). */
	log: function () {
		if (this.debug)
			console.log.apply('', arguments);
	},

	// TODO rename to "widget" when switching to widget factory
	_widgetDatepicker: function() {
		return this.dpDiv;
	},

	/* Override the default settings for all instances of the date picker.
	   @param  settings  object - the new settings to use as defaults (anonymous object)
	   @return the manager object */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span
	   @param  settings  object - the new settings to use for this date picker instance (anonymous) */
	_attachDatepicker: function(target, settings) {
		// check for settings on the control itself - in namespace 'date:'
		var inlineSettings = null;
		for (var attrName in this._defaults) {
			var attrValue = target.getAttribute('date:' + attrName);
			if (attrValue) {
				inlineSettings = inlineSettings || {};
				try {
					inlineSettings[attrName] = eval(attrValue);
				} catch (err) {
					inlineSettings[attrName] = attrValue;
				}
			}
		}
		var nodeName = target.nodeName.toLowerCase();
		var inline = (nodeName == 'div' || nodeName == 'span');
		if (!target.id) {
			this.uuid += 1;
			target.id = 'dp' + this.uuid;
		}
		var inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {}, inlineSettings || {});
		if (nodeName == 'input') {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'); // escape jQuery meta chars
		return {id: id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			$('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName))
			return;
		this._attachments(input, inst);
		input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp).
			bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
		this._autoSize(inst);
		$.data(target, PROP_NAME, inst);
	},

	/* Make attachments based on settings. */
	_attachments: function(input, inst) {
		var appendText = this._get(inst, 'appendText');
		var isRTL = this._get(inst, 'isRTL');
		if (inst.append)
			inst.append.remove();
		if (appendText) {
			inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
			input[isRTL ? 'before' : 'after'](inst.append);
		}
		input.unbind('focus', this._showDatepicker);
		if (inst.trigger)
			inst.trigger.remove();
		var showOn = this._get(inst, 'showOn');
		if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
			var buttonText = this._get(inst, 'buttonText');
			var buttonImage = this._get(inst, 'buttonImage');
			inst.trigger = $(this._get(inst, 'buttonImageOnly') ?
				$('<img/>').addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$('<button type="button"></button>').addClass(this._triggerClass).
					html(buttonImage == '' ? buttonText : $('<img/>').attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? 'before' : 'after'](inst.trigger);
			inst.trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])
					$.datepicker._hideDatepicker();
				else
					$.datepicker._showDatepicker(input[0]);
				return false;
			});
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function(inst) {
		if (this._get(inst, 'autoSize') && !inst.inline) {
			var date = new Date(2009, 12 - 1, 20); // Ensure double digits
			var dateFormat = this._get(inst, 'dateFormat');
			if (dateFormat.match(/[DM]/)) {
				var findMax = function(names) {
					var max = 0;
					var maxI = 0;
					for (var i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					'monthNames' : 'monthNamesShort'))));
				date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
			}
			inst.input.attr('size', this._formatDate(inst, date).length);
		}
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName))
			return;
		divSpan.addClass(this.markerClassName).append(inst.dpDiv).
			bind("setData.datepicker", function(event, key, value){
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key){
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
	},

	/* Pop-up the date picker in a "dialog" box.
	   @param  input     element - ignored
	   @param  date      string or Date - the initial date to display
	   @param  onSelect  function - the function to call when a date is selected
	   @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	   @param  pos       int[2] - coordinates for the dialog's position within the screen or
	                     event - with x/y coordinates or
	                     leave empty for default (screen centre)
	   @return the manager object */
	_dialogDatepicker: function(input, date, onSelect, settings, pos) {
		var inst = this._dialogInst; // internal instance
		if (!inst) {
			this.uuid += 1;
			var id = 'dp' + this.uuid;
			this._dialogInput = $('<input type="text" id="' + id +
				'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
			this._dialogInput.keydown(this._doKeyDown);
			$('body').append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
		this._dialogInput.val(date);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			var browserWidth = document.documentElement.clientWidth;
			var browserHeight = document.documentElement.clientHeight;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI)
			$.blockUI(this.dpDiv);
		$.data(this._dialogInput[0], PROP_NAME, inst);
		return this;
	},

	/* Detach a datepicker from its control.
	   @param  target    element - the target input field or division or span */
	_destroyDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		$.removeData(target, PROP_NAME);
		if (nodeName == 'input') {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind('focus', this._showDatepicker).
				unbind('keydown', this._doKeyDown).
				unbind('keypress', this._doKeyPress).
				unbind('keyup', this._doKeyUp);
		} else if (nodeName == 'div' || nodeName == 'span')
			$target.removeClass(this.markerClassName).empty();
	},

	/* Enable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_enableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = false;
			inst.trigger.filter('button').
				each(function() { this.disabled = false; }).end().
				filter('img').css({opacity: '1.0', cursor: ''});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().removeClass('ui-state-disabled');
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_disableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = true;
			inst.trigger.filter('button').
				each(function() { this.disabled = true; }).end().
				filter('img').css({opacity: '0.5', cursor: 'default'});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().addClass('ui-state-disabled');
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	   @param  target    element - the target input field or division or span
	   @return boolean - true if disabled, false if enabled */
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] == target)
				return true;
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
	   @param  target  element - the target input field or division or span
	   @return  object - the associated instance data
	   @throws  error if a jQuery problem getting data */
	_getInst: function(target) {
		try {
			return $.data(target, PROP_NAME);
		}
		catch (err) {
			throw 'Missing instance data for this datepicker';
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span
	   @param  name    object - the new settings to update or
	                   string - the name of the setting to change or retrieve,
	                   when retrieving also 'all' for all instance settings or
	                   'defaults' for all global defaults
	   @param  value   any - the new value for the setting
	                   (omit if above is an object or to retrieve a value) */
	_optionDatepicker: function(target, name, value) {
		var inst = this._getInst(target);
		if (arguments.length == 2 && typeof name == 'string') {
			return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) :
				(inst ? (name == 'all' ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}
		var settings = name || {};
		if (typeof name == 'string') {
			settings = {};
			settings[name] = value;
		}
		if (inst) {
			if (this._curInst == inst) {
				this._hideDatepicker();
			}
			var date = this._getDateDatepicker(target, true);
			extendRemove(inst.settings, settings);
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDateDatepicker(target, date);
			this._updateDatepicker(inst);
		}
	},

	// change method deprecated
	_changeDatepicker: function(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	   @param  target   element - the target input field or division or span
	   @param  date     Date - the new date */
	_setDateDatepicker: function(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	   @param  target     element - the target input field or division or span
	   @param  noDefault  boolean - true if no default date is to be used
	   @return Date - the current date */
	_getDateDatepicker: function(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline)
			this._setDateFromField(inst, noDefault);
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(event) {
		var inst = $.datepicker._getInst(event.target);
		var handled = true;
		var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing)
			switch (event.keyCode) {
				case 9: $.datepicker._hideDatepicker();
						handled = false;
						break; // hide on tab out
				case 13: var sel = $('td.' + $.datepicker._dayOverClass, inst.dpDiv).
							add($('td.' + $.datepicker._currentClass, inst.dpDiv));
						if (sel[0])
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						else
							$.datepicker._hideDatepicker();
						return false; // don't submit the form
						break; // select the value on enter
				case 27: $.datepicker._hideDatepicker();
						break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, 'stepBigMonths') :
							-$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, 'stepBigMonths') :
							+$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) $.datepicker._clearDate(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) $.datepicker._gotoToday(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									-$.datepicker._get(inst, 'stepBigMonths') :
									-$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +left on Mac
						break;
				case 38: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, -7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									+$.datepicker._get(inst, 'stepBigMonths') :
									+$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +right
						break;
				case 40: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, +7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		else if (event.keyCode == 36 && event.ctrlKey) // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		else {
			handled = false;
		}
		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if ($.datepicker._get(inst, 'constrainInput')) {
			var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
			var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
			return event.ctrlKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Synchronise manual entry and field/alternate field. */
	_doKeyUp: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if (inst.input.val() != inst.lastVal) {
			try {
				var date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
					(inst.input ? inst.input.val() : null),
					$.datepicker._getFormatConfig(inst));
				if (date) { // only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					$.datepicker._updateDatepicker(inst);
				}
			}
			catch (event) {
				$.datepicker.log(event);
			}
		}
		return true;
	},

	/* Pop-up the date picker for a given input field.
	   @param  input  element - the input field attached to the date picker or
	                  event - if triggered by focus */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
			input = $('input', input.parentNode)[0];
		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
			return;
		var inst = $.datepicker._getInst(input);
		if ($.datepicker._curInst && $.datepicker._curInst != inst) {
			$.datepicker._curInst.dpDiv.stop(true, true);
		}
		var beforeShow = $.datepicker._get(inst, 'beforeShow');
		extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);
		if ($.datepicker._inDialog) // hide cursor
			input.value = '';
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}
		var isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css('position') == 'fixed';
			return !isFixed;
		});
		if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
			$.datepicker._pos[0] -= document.documentElement.scrollLeft;
			$.datepicker._pos[1] -= document.documentElement.scrollTop;
		}
		var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		// determine sizing offscreen
		inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px'});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
			left: offset.left + 'px', top: offset.top + 'px'});
		if (!inst.inline) {
			var showAnim = $.datepicker._get(inst, 'showAnim');
			var duration = $.datepicker._get(inst, 'duration');
			var postProcess = function() {
				$.datepicker._datepickerShowing = true;
				var borders = $.datepicker._getBorders(inst.dpDiv);
				inst.dpDiv.find('iframe.ui-datepicker-cover'). // IE6- only
					css({left: -borders[0], top: -borders[1],
						width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()});
			};
			inst.dpDiv.zIndex($(input).zIndex()+1);
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[showAnim || 'show']((showAnim ? duration : null), postProcess);
			if (!showAnim || !duration)
				postProcess();
			if (inst.input.is(':visible') && !inst.input.is(':disabled'))
				inst.input.focus();
			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		var self = this;
		var borders = $.datepicker._getBorders(inst.dpDiv);
		inst.dpDiv.empty().append(this._generateHTML(inst))
			.find('iframe.ui-datepicker-cover') // IE6- only
				.css({left: -borders[0], top: -borders[1],
					width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()})
			.end()
			.find('button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a')
				.bind('mouseout', function(){
					$(this).removeClass('ui-state-hover');
					if(this.className.indexOf('ui-datepicker-prev') != -1) $(this).removeClass('ui-datepicker-prev-hover');
					if(this.className.indexOf('ui-datepicker-next') != -1) $(this).removeClass('ui-datepicker-next-hover');
				})
				.bind('mouseover', function(){
					if (!self._isDisabledDatepicker( inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
						$(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
						$(this).addClass('ui-state-hover');
						if(this.className.indexOf('ui-datepicker-prev') != -1) $(this).addClass('ui-datepicker-prev-hover');
						if(this.className.indexOf('ui-datepicker-next') != -1) $(this).addClass('ui-datepicker-next-hover');
					}
				})
			.end()
			.find('.' + this._dayOverClass + ' a')
				.trigger('mouseover')
			.end();
		var numMonths = this._getNumberOfMonths(inst);
		var cols = numMonths[1];
		var width = 17;
		if (cols > 1)
			inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
		else
			inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
		inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
		inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
		if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input &&
				inst.input.is(':visible') && !inst.input.is(':disabled'))
			inst.input.focus();
	},

	/* Retrieve the size of left and top borders for an element.
	   @param  elem  (jQuery object) the element of interest
	   @return  (number[2]) the left and top borders */
	_getBorders: function(elem) {
		var convert = function(value) {
			return {thin: 1, medium: 2, thick: 3}[value] || value;
		};
		return [parseFloat(convert(elem.css('border-left-width'))),
			parseFloat(convert(elem.css('border-top-width')))];
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth();
		var dpHeight = inst.dpDiv.outerHeight();
		var inputWidth = inst.input ? inst.input.outerWidth() : 0;
		var inputHeight = inst.input ? inst.input.outerHeight() : 0;
		var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
		var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();

		offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		// now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function(obj) {
		var inst = this._getInst(obj);
		var isRTL = this._get(inst, 'isRTL');
        while (obj && (obj.type == 'hidden' || obj.nodeType != 1)) {
            obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
        }
        var position = $(obj).offset();
	    return [position.left, position.top];
	},

	/* Hide the date picker from view.
	   @param  input  element - the input field attached to the date picker */
	_hideDatepicker: function(input) {
		var inst = this._curInst;
		if (!inst || (input && inst != $.data(input, PROP_NAME)))
			return;
		if (this._datepickerShowing) {
			var showAnim = this._get(inst, 'showAnim');
			var duration = this._get(inst, 'duration');
			var postProcess = function() {
				$.datepicker._tidyDialog(inst);
				this._curInst = null;
			};
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))]((showAnim ? duration : null), postProcess);
			if (!showAnim)
				postProcess();
			var onClose = this._get(inst, 'onClose');
			if (onClose)
				onClose.apply((inst.input ? inst.input[0] : null),
					[(inst.input ? inst.input.val() : ''), inst]);  // trigger custom callback
			this._datepickerShowing = false;
			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
				if ($.blockUI) {
					$.unblockUI();
					$('body').append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst)
			return;
		var $target = $(event.target);
		if ($target[0].id != $.datepicker._mainDivId &&
				$target.parents('#' + $.datepicker._mainDivId).length == 0 &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.hasClass($.datepicker._triggerClass) &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))
			$.datepicker._hideDatepicker();
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
			period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		}
		else {
			var date = new Date();
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		inst._selectingMonthYear = false;
		inst['selected' + (period == 'M' ? 'Month' : 'Year')] =
		inst['draw' + (period == 'M' ? 'Month' : 'Year')] =
			parseInt(select.options[select.selectedIndex].value,10);
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Restore input focus after not changing month/year. */
	_clickMonthYear: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (inst.input && inst._selectingMonthYear) {
			setTimeout(function() {
				inst.input.focus();
			}, 0);
		}
		inst._selectingMonthYear = !inst._selectingMonthYear;
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		var target = $(id);
		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}
		var inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $('a', td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		this._selectDate(target, '');
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input)
			inst.input.val(dateStr);
		this._updateAlternate(inst);
		var onSelect = this._get(inst, 'onSelect');
		if (onSelect)
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		else if (inst.input)
			inst.input.trigger('change'); // fire the change event
		if (inst.inline)
			this._updateDatepicker(inst);
		else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) != 'object')
				inst.input.focus(); // restore focus
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // update alternate field too
			var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
			var date = this._getDate(inst);
			var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	   @param  date  Date - the date to customise
	   @return [boolean, string] - is this date selectable?, what is its CSS class? */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ''];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	   @param  date  Date - the date to get the week for
	   @return  number - the number of the week within the year that contains this date */
	iso8601Week: function(date) {
		var checkDate = new Date(date.getTime());
		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
		var time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Parse a string value into a date object.
	   See formatDate below for the possible formats.

	   @param  format    string - the expected format of the date
	   @param  value     string - the date in the above format
	   @param  settings  Object - attributes include:
	                     shortYearCutoff  number - the cutoff year for determining the century (optional)
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  Date - the extracted date value or null if value is blank */
	parseDate: function (format, value, settings) {
		if (format == null || value == null)
			throw 'Invalid arguments';
		value = (typeof value == 'object' ? value.toString() : value + '');
		if (value == '')
			return null;
		var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		var year = -1;
		var month = -1;
		var day = -1;
		var doy = -1;
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Extract a number from the string value
		var getNumber = function(match) {
			lookAhead(match);
			var size = (match == '@' ? 14 : (match == '!' ? 20 :
				(match == 'y' ? 4 : (match == 'o' ? 3 : 2))));
			var digits = new RegExp('^\\d{1,' + size + '}');
			var num = value.substring(iValue).match(digits);
			if (!num)
				throw 'Missing number at position ' + iValue;
			iValue += num[0].length;
			return parseInt(num[0], 10);
		};
		// Extract a name from the string value and convert to an index
		var getName = function(match, shortNames, longNames) {
			var names = (lookAhead(match) ? longNames : shortNames);
			for (var i = 0; i < names.length; i++) {
				if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
					iValue += names[i].length;
					return i + 1;
				}
			}
			throw 'Unknown name at position ' + iValue;
		};
		// Confirm that a literal character matches the string value
		var checkLiteral = function() {
			if (value.charAt(iValue) != format.charAt(iFormat))
				throw 'Unexpected literal at position ' + iValue;
			iValue++;
		};
		var iValue = 0;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					checkLiteral();
			else
				switch (format.charAt(iFormat)) {
					case 'd':
						day = getNumber('d');
						break;
					case 'D':
						getName('D', dayNamesShort, dayNames);
						break;
					case 'o':
						doy = getNumber('o');
						break;
					case 'm':
						month = getNumber('m');
						break;
					case 'M':
						month = getName('M', monthNamesShort, monthNames);
						break;
					case 'y':
						year = getNumber('y');
						break;
					case '@':
						var date = new Date(getNumber('@'));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case '!':
						var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'"))
							checkLiteral();
						else
							literal = true;
						break;
					default:
						checkLiteral();
				}
		}
		if (year == -1)
			year = new Date().getFullYear();
		else if (year < 100)
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				var dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim)
					break;
				month++;
				day -= dim;
			} while (true);
		}
		var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
			throw 'Invalid date'; // E.g. 31/02/*
		return date;
	},

	/* Standard date formats. */
	ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
	COOKIE: 'D, dd M yy',
	ISO_8601: 'yy-mm-dd',
	RFC_822: 'D, d M y',
	RFC_850: 'DD, dd-M-y',
	RFC_1036: 'D, d M y',
	RFC_1123: 'D, d M yy',
	RFC_2822: 'D, d M yy',
	RSS: 'D, d M y', // RFC 822
	TICKS: '!',
	TIMESTAMP: '@',
	W3C: 'yy-mm-dd', // ISO 8601

	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

	/* Format a date object into a string value.
	   The format can be combinations of the following:
	   d  - day of month (no leading zero)
	   dd - day of month (two digit)
	   o  - day of year (no leading zeros)
	   oo - day of year (three digit)
	   D  - day name short
	   DD - day name long
	   m  - month of year (no leading zero)
	   mm - month of year (two digit)
	   M  - month name short
	   MM - month name long
	   y  - year (two digit)
	   yy - year (four digit)
	   @ - Unix timestamp (ms since 01/01/1970)
	   ! - Windows ticks (100ns since 01/01/0001)
	   '...' - literal text
	   '' - single quote

	   @param  format    string - the desired format of the date
	   @param  date      Date - the date value to format
	   @param  settings  Object - attributes include:
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  string - the date in the above format */
	formatDate: function (format, date, settings) {
		if (!date)
			return '';
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Format a number, with leading zero if necessary
		var formatNumber = function(match, value, len) {
			var num = '' + value;
			if (lookAhead(match))
				while (num.length < len)
					num = '0' + num;
			return num;
		};
		// Format a name, short or long as requested
		var formatName = function(match, value, shortNames, longNames) {
			return (lookAhead(match) ? longNames[value] : shortNames[value]);
		};
		var output = '';
		var literal = false;
		if (date)
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						output += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							output += formatNumber('d', date.getDate(), 2);
							break;
						case 'D':
							output += formatName('D', date.getDay(), dayNamesShort, dayNames);
							break;
						case 'o':
							output += formatNumber('o',
								(date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
							break;
						case 'm':
							output += formatNumber('m', date.getMonth() + 1, 2);
							break;
						case 'M':
							output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
							break;
						case 'y':
							output += (lookAhead('y') ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
							break;
						case '@':
							output += date.getTime();
							break;
						case '!':
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'"))
								output += "'";
							else
								literal = true;
							break;
						default:
							output += format.charAt(iFormat);
					}
			}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var chars = '';
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		for (var iFormat = 0; iFormat < format.length; iFormat++)
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					chars += format.charAt(iFormat);
			else
				switch (format.charAt(iFormat)) {
					case 'd': case 'm': case 'y': case '@':
						chars += '0123456789';
						break;
					case 'D': case 'M':
						return null; // Accept anything
					case "'":
						if (lookAhead("'"))
							chars += "'";
						else
							literal = true;
						break;
					default:
						chars += format.charAt(iFormat);
				}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst, noDefault) {
		if (inst.input.val() == inst.lastVal) {
			return;
		}
		var dateFormat = this._get(inst, 'dateFormat');
		var dates = inst.lastVal = inst.input ? inst.input.val() : null;
		var date, defaultDate;
		date = defaultDate = this._getDefaultDate(inst);
		var settings = this._getFormatConfig(inst);
		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			this.log(event);
			dates = (noDefault ? '' : dates);
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates ? date.getDate() : 0);
		inst.currentMonth = (dates ? date.getMonth() : 0);
		inst.currentYear = (dates ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(inst, date, defaultDate) {
		var offsetNumeric = function(offset) {
			var date = new Date();
			date.setDate(date.getDate() + offset);
			return date;
		};
		var offsetString = function(offset) {
			try {
				return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
					offset, $.datepicker._getFormatConfig(inst));
			}
			catch (e) {
				// Ignore
			}
			var date = (offset.toLowerCase().match(/^c/) ?
				$.datepicker._getDate(inst) : null) || new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 'd') {
					case 'd' : case 'D' :
						day += parseInt(matches[1],10); break;
					case 'w' : case 'W' :
						day += parseInt(matches[1],10) * 7; break;
					case 'm' : case 'M' :
						month += parseInt(matches[1],10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
					case 'y': case 'Y' :
						year += parseInt(matches[1],10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day);
		};
		date = (date == null ? defaultDate : (typeof date == 'string' ? offsetString(date) :
			(typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
		date = (date && date.toString() == 'Invalid Date' ? defaultDate : date);
		if (date) {
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(date);
	},

	/* Handle switch to/from daylight saving.
	   Hours may be non-zero on daylight saving cut-over:
	   > 12 when midnight changeover, but then cannot generate
	   midnight datetime, so jump to 1AM, otherwise reset.
	   @param  date  (Date) the date to check
	   @return  (Date) the corrected date */
	_daylightSavingAdjust: function(date) {
		if (!date) return null;
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, noChange) {
		var clear = !(date);
		var origMonth = inst.selectedMonth;
		var origYear = inst.selectedYear;
		date = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
		inst.selectedDay = inst.currentDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
		if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
			this._notifyChange(inst);
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? '' : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function(inst) {
		var today = new Date();
		today = this._daylightSavingAdjust(
			new Date(today.getFullYear(), today.getMonth(), today.getDate())); // clear time
		var isRTL = this._get(inst, 'isRTL');
		var showButtonPanel = this._get(inst, 'showButtonPanel');
		var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
		var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
		var numMonths = this._getNumberOfMonths(inst);
		var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
		var stepMonths = this._get(inst, 'stepMonths');
		var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
		var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		var drawMonth = inst.drawMonth - showCurrentAtPos;
		var drawYear = inst.drawYear;
		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;
		var prevText = this._get(inst, 'prevText');
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));
		var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' +
			' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+ prevText +'"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
		var nextText = this._get(inst, 'nextText');
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));
		var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' +
			' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+ nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
		var currentText = this._get(inst, 'currentText');
		var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
		var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._hideDatepicker();">' + this._get(inst, 'closeText') + '</button>' : '');
		var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') +
			(this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid +
			'.datepicker._gotoToday(\'#' + inst.id + '\');"' +
			'>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
		var firstDay = parseInt(this._get(inst, 'firstDay'),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);
		var showWeek = this._get(inst, 'showWeek');
		var dayNames = this._get(inst, 'dayNames');
		var dayNamesShort = this._get(inst, 'dayNamesShort');
		var dayNamesMin = this._get(inst, 'dayNamesMin');
		var monthNames = this._get(inst, 'monthNames');
		var monthNamesShort = this._get(inst, 'monthNamesShort');
		var beforeShowDay = this._get(inst, 'beforeShowDay');
		var showOtherMonths = this._get(inst, 'showOtherMonths');
		var selectOtherMonths = this._get(inst, 'selectOtherMonths');
		var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
		var defaultDate = this._getDefaultDate(inst);
		var html = '';
		for (var row = 0; row < numMonths[0]; row++) {
			var group = '';
			for (var col = 0; col < numMonths[1]; col++) {
				var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				var cornerClass = ' ui-corner-all';
				var calender = '';
				if (isMultiMonth) {
					calender += '<div class="ui-datepicker-group';
					if (numMonths[1] > 1)
						switch (col) {
							case 0: calender += ' ui-datepicker-group-first';
								cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left'); break;
							case numMonths[1]-1: calender += ' ui-datepicker-group-last';
								cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right'); break;
							default: calender += ' ui-datepicker-group-middle'; cornerClass = ''; break;
						}
					calender += '">';
				}
				calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' +
					(/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
					(/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					'</div><table class="ui-datepicker-calendar"><thead>' +
					'<tr>';
				var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
				for (var dow = 0; dow < 7; dow++) { // days of the week
					var day = (dow + firstDay) % 7;
					thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' +
						'<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
				}
				calender += thead + '</tr></thead><tbody>';
				var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7)); // calculate the number of rows to generate
				var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += '<tr>';
					var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' +
						this._get(inst, 'calculateWeek')(printDate) + '</td>');
					for (var dow = 0; dow < 7; dow++) { // create date picker days
						var daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
						var otherMonth = (printDate.getMonth() != drawMonth);
						var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						tbody += '<td class="' +
							((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
							(otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
							((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							' ' + this._dayOverClass : '') + // highlight selected day
							(unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled': '') +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							(unselectable ? '' : ' onclick="DP_jQuery_' + dpuuid + '.datepicker._selectDay(\'#' +
							inst.id + '\',' + printDate.getMonth() + ',' + printDate.getFullYear() + ', this);return false;"') + '>' + // actions
							(otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
							(unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' +
							(printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') +
							(printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') + // highlight selected day
							(otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
							'" href="#">' + printDate.getDate() + '</a>')) + '</td>'; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + '</tr>';
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += '</tbody></table>' + (isMultiMonth ? '</div>' +
							((numMonths[0] > 0 && col == numMonths[1]-1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
				group += calender;
			}
			html += group;
		}
		html += buttonPanel + ($.browser.msie && parseInt($.browser.version,10) < 7 && !inst.inline ?
			'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort) {
		var changeMonth = this._get(inst, 'changeMonth');
		var changeYear = this._get(inst, 'changeYear');
		var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
		var html = '<div class="ui-datepicker-title">';
		var monthHtml = '';
		// month selection
		if (secondary || !changeMonth)
			monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
		else {
			var inMinYear = (minDate && minDate.getFullYear() == drawYear);
			var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
			monthHtml += '<select class="ui-datepicker-month" ' +
				'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' +
				'onclick="DP_jQuery_' + dpuuid + '.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
			 	'>';
			for (var month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) &&
						(!inMaxYear || month <= maxDate.getMonth()))
					monthHtml += '<option value="' + month + '"' +
						(month == drawMonth ? ' selected="selected"' : '') +
						'>' + monthNamesShort[month] + '</option>';
			}
			monthHtml += '</select>';
		}
		if (!showMonthAfterYear)
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
		// year selection
		if (secondary || !changeYear)
			html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
		else {
			// determine range of years to display
			var years = this._get(inst, 'yearRange').split(':');
			var thisYear = new Date().getFullYear();
			var determineYear = function(value) {
				var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
					(value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
					parseInt(value, 10)));
				return (isNaN(year) ? thisYear : year);
			};
			var year = determineYear(years[0]);
			var endYear = Math.max(year, determineYear(years[1] || ''));
			year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
			endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
			html += '<select class="ui-datepicker-year" ' +
				'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' +
				'onclick="DP_jQuery_' + dpuuid + '.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
				'>';
			for (; year <= endYear; year++) {
				html += '<option value="' + year + '"' +
					(year == drawYear ? ' selected="selected"' : '') +
					'>' + year + '</option>';
			}
			html += '</select>';
		}
		html += this._get(inst, 'yearSuffix');
		if (showMonthAfterYear)
			html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
		html += '</div>'; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period == 'Y' ? offset : 0);
		var month = inst.drawMonth + (period == 'M' ? offset : 0);
		var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
			(period == 'D' ? offset : 0);
		var date = this._restrictMinMax(inst,
			this._daylightSavingAdjust(new Date(year, month, day)));
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period == 'M' || period == 'Y')
			this._notifyChange(inst);
	},

	/* Ensure a date is within any min/max bounds. */
	_restrictMinMax: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		date = (minDate && date < minDate ? minDate : date);
		date = (maxDate && date > maxDate ? maxDate : date);
		return date;
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, 'onChangeMonthYear');
		if (onChange)
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, 'numberOfMonths');
		return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set. */
	_getMinMaxDate: function(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - new Date(year, month, 32).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst);
		var date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
		if (offset < 0)
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()));
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, 'shortYearCutoff');
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
			monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day == 'object' ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
	}
});

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props)
		if (props[name] == null || props[name] == undefined)
			target[name] = props[name];
	return target;
};

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && (($.browser.safari && typeof a == 'object' && a.length) ||
		(a.constructor && a.constructor.toString().match(/\Array\(\)/))));
};

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
                    Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick).
			find('body').append($.datepicker.dpDiv);
		$.datepicker.initialized = true;
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	return this.each(function() {
		typeof options == 'string' ?
			$.datepicker['_' + options + 'Datepicker'].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.8.6";

// Workaround for #4055
// Add another global to avoid noConflict issues with inline event handlers
window['DP_jQuery_' + dpuuid] = $;

})(jQuery);



$.fn.extend({
  lsCalendar:function(options){
    var defaults = {};
    var options = $.extend(defaults, options);
    return this.each(function() {
      var $this = $(this);
      var o = options;
      var event_dates = o.event_dates;
      var current_date = o.current_date.replace(/\//g, "-");
      var earliest_date = o.earliest_date;
      var latest_date = o.latest_date;
      var no_available_dates_message = o.no_available_dates_message;
      var deal_id = o.deal_id;
      var multiple_redemption_locations = o.multiple_redemption_locations;
      var dates_allowed = {};
      var months_with_events = {};
      function init() {
        setAllowedDates();
        if(current_date == "" || current_date == undefined) {
          current_date = earliest_date;
        }
        var date = new Date(current_date.replace(/-/g, "/"));
        current_date = dateToString(date.getFullYear(), date.getMonth(), date.getDate());
        $('.datepicker', $this).datepicker("setDate", date);
        if($('.datepicker', $this).datepicker("getDate") != date) {
          $('.datepicker', $this).datepicker("setDate", date);
        }
        rebuildList(dates_allowed[current_date]);
      }

      function setAllowedDates() {
        var current_event_date;
        for(var i = 0; i < event_dates.length; i++){
          current_event_date = event_dates[i];
          for(var day in current_event_date) {
            var curDate = new Date(day.replace(/-/g, "/"));
            months_with_events[dateToString(curDate.getFullYear(), curDate.getMonth() )] = true;
            dates_allowed[day] = current_event_date[day];
          }
        }
      }

      function rebuildList(available_times) {
        var available_days = $(".available-days", $this);
        available_days.html("");
        if (available_times == undefined) {
          available_days.append("<li>"+ no_available_dates_message + "</li>");
        } else {
          $(".current-day span", $this).html(available_times[0].formated_date);
          var time;
          var previous_time;
          var num_available_times = available_times.length - 1, i;
          for(i = 0; i < available_times.length; i++) {
            time = available_times[i];
            var has_options = ((i < num_available_times && available_times[(parseInt(i) + 1)].start_time == time.start_time) || previous_time == time.start_time) ? true : false;
            available_days.append(day_li(time, has_options));
            previous_time = time.start_time;
          }
        }
      }

      function day_li(time_slot, has_options){
        var date = encodeURIComponent(time_slot.event_starts_at);
        var message = (time_slot.in_the_past) ? "" : time_slot.slots_left;
		var withopts = has_options ? "with-options " : ""
		var soldout = (time_slot.sold_out) ? "sold-out " : "available ";
        var li = '<li id="option_' + time_slot.id + '" class="' + withopts + soldout +'"><span class="time">' + time_slot.start_time + '</span> <span class="spots-left">' + message +"</span>";
        /* Enable title on all options */
        if (true || multiple_redemption_locations || deal_id == 386988) {
          li += "<span> | </span><span class='title'>" + time_slot.title+ "</span>";
          if (has_options) {
            li += "<span class='price'>" + time_slot.price + "</span>";
          }
        }
        else if(has_options) {
          li += (time_slot.in_the_past ? "" : "<span> | </span>")+"<span class='title'>" + time_slot.title+ "</span>";
          li += "<span class='price'>" + time_slot.price + "</span>";
        }
        if(!time_slot.sold_out && !time_slot.in_the_past) {
          li += '<a href="/deals/' + deal_id + '/options/'+ time_slot.id +'/purchases/new" id="option_' + time_slot.id + '" class="btn btn-small">book it</a>';
        }
        li += '</li>';

        return li;
      }

      function dateToString(year, month, day){
        month += 1;
        var date = [
            year,
            (month < 10) ? "0" + month : month
        ];
        if(day != undefined) {
          date.push((day < 10) ? "0" + day : day);
        }
        return date.join('-');
      }

      $(".datepicker", $this).datepicker({
        minDate: new Date(earliest_date.replace(/-/g, "/")),
        maxDate: new Date(latest_date.replace(/-/g, "/")),
        beforeShowDay: function(date) {
            var month = date.getMonth();
            var day = date.getDate();
            var date_str = dateToString(date.getFullYear(), month, day);
            if (dates_allowed[date_str]) {
                return [true, 'enabled', ''];
            } else {
                return [false, 'disabled', 'no events'];
            }
        },
        onSelect: function(dateText, inst) {
          var current_day = dateToString(inst.currentYear, inst.currentMonth, inst.currentDay);
          rebuildList(dates_allowed[current_day]);
        },
        onChangeMonthYear: function(year, month, inst) {
          var month = dateToString(year,month-1), times, curr_time, first_date, i, day_date;
          if (months_with_events[month] ) {
            for(var day in dates_allowed) {
              if(day.indexOf(month) != -1){
				times = dates_allowed[day];
				curr_time = false;
				day_date = new Date(day.replace(/-/g, "/"));
				if(!first_date || first_date > day_date) first_date = day_date;
				for(i = 0; i < times.length; i++){
					if(!times[i].in_the_past && !times[i].sold_out){
						curr_time = true;
						break;
					}
				}
				if(curr_time){
			$('.datepicker', $this).datepicker("setDate", day_date );
			rebuildList(times);
			break;
				}
              }
            }
			if(!curr_time){
				$('.datepicker', $this).datepicker("setDate", first_date );
		rebuildList(times);
			}
          } else {
            rebuildList();
          }
        }
      });
      init();
    });
  }
});
;/*	SWFObject v2.2 <http://code.google.com/p/swfobject/>
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();;/*
  mustache.js — Logic-less templates in JavaScript

  See http://mustache.github.com/ for more info.
*/

var Mustache = function() {
  var regexCache = {};
  var Renderer = function() {};

  Renderer.prototype = {
    otag: "{{",
    ctag: "}}",
    pragmas: {},
    buffer: [],
    pragmas_implemented: {
      "IMPLICIT-ITERATOR": true
    },
    context: {},

    render: function(template, context, partials, in_recursion) {
      // reset buffer & set context
      if(!in_recursion) {
        this.context = context;
        this.buffer = []; // TODO: make this non-lazy
      }

      // fail fast
      if(!this.includes("", template)) {
        if(in_recursion) {
          return template;
        } else {
          this.send(template);
          return;
        }
      }

      // get the pragmas together
      template = this.render_pragmas(template);

      // render the template
      var html = this.render_section(template, context, partials);

      // render_section did not find any sections, we still need to render the tags
      if (html === false) {
        html = this.render_tags(template, context, partials, in_recursion);
      }

      if (in_recursion) {
        return html;
      } else {
        this.sendLines(html);
      }
    },

    /*
      Sends parsed lines
    */
    send: function(line) {
      if(line !== "") {
        this.buffer.push(line);
      }
    },

    sendLines: function(text) {
      if (text) {
        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++) {
          this.send(lines[i]);
        }
      }
    },

    /*
      Looks for %PRAGMAS
    */
    render_pragmas: function(template) {
      // no pragmas
      if(!this.includes("%", template)) {
        return template;
      }

      var that = this;
      var regex = this.getCachedRegex("render_pragmas", function(otag, ctag) {
        return new RegExp(otag + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + ctag, "g");
      });

      return template.replace(regex, function(match, pragma, options) {
        if(!that.pragmas_implemented[pragma]) {
          throw({message:
            "This implementation of mustache doesn't understand the '" +
            pragma + "' pragma"});
        }
        that.pragmas[pragma] = {};
        if(options) {
          var opts = options.split("=");
          that.pragmas[pragma][opts[0]] = opts[1];
        }
        return "";
        // ignore unknown pragmas silently
      });
    },

    /*
      Tries to find a partial in the curent scope and render it
    */
    render_partial: function(name, context, partials) {
      name = this.trim(name);
      if(!partials || partials[name] === undefined) {
        throw({message: "unknown_partial '" + name + "'"});
      }
      if(typeof(context[name]) != "object") {
        return this.render(partials[name], context, partials, true);
      }
      return this.render(partials[name], context[name], partials, true);
    },

    /*
      Renders inverted (^) and normal (#) sections
    */
    render_section: function(template, context, partials) {
      if(!this.includes("#", template) && !this.includes("^", template)) {
        // did not render anything, there were no sections
        return false;
      }

      var that = this;

      var regex = this.getCachedRegex("render_section", function(otag, ctag) {
        // This regex matches _the first_ section ({{#foo}}{{/foo}}), and captures the remainder
        return new RegExp(
          "^([\\s\\S]*?)" +         // all the crap at the beginning that is not {{*}} ($1)

          otag +                    // {{
          "(\\^|\\#)\\s*(.+)\\s*" + //  #foo (# == $2, foo == $3)
          ctag +                    // }}

          "\n*([\\s\\S]*?)" +       // between the tag ($2). leading newlines are dropped

          otag +                    // {{
          "\\/\\s*\\3\\s*" +        //  /foo (backreference to the opening tag).
          ctag +                    // }}

          "\\s*([\\s\\S]*)$",       // everything else in the string ($4). leading whitespace is dropped.

        "g");
      });


      // for each {{#foo}}{{/foo}} section do...
      return template.replace(regex, function(match, before, type, name, content, after) {
        // before contains only tags, no sections
        var renderedBefore = before ? that.render_tags(before, context, partials, true) : "",

        // after may contain both sections and tags, so use full rendering function
            renderedAfter = after ? that.render(after, context, partials, true) : "",

        // will be computed below
            renderedContent,

            value = that.find(name, context);

        if (type === "^") { // inverted section
          if (!value || that.is_array(value) && value.length === 0) {
            // false or empty list, render it
            renderedContent = that.render(content, context, partials, true);
          } else {
            renderedContent = "";
          }
        } else if (type === "#") { // normal section
          if (that.is_array(value)) { // Enumerable, Let's loop!
            renderedContent = that.map(value, function(row) {
              return that.render(content, that.create_context(row), partials, true);
            }).join("");
          } else if (that.is_object(value)) { // Object, Use it as subcontext!
            renderedContent = that.render(content, that.create_context(value),
              partials, true);
          } else if (typeof value === "function") {
            // higher order section
            renderedContent = value.call(context, content, function(text) {
              return that.render(text, context, partials, true);
            });
          } else if (value) { // boolean section
            renderedContent = that.render(content, context, partials, true);
          } else {
            renderedContent = "";
          }
        }

        return renderedBefore + renderedContent + renderedAfter;
      });
    },

    /*
      Replace {{foo}} and friends with values from our view
    */
    render_tags: function(template, context, partials, in_recursion) {
      // tit for tat
      var that = this;



      var new_regex = function() {
        return that.getCachedRegex("render_tags", function(otag, ctag) {
          return new RegExp(otag + "(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?" + ctag + "+", "g");
        });
      };

      var regex = new_regex();
      var tag_replace_callback = function(match, operator, name) {
        switch(operator) {
        case "!": // ignore comments
          return "";
        case "=": // set new delimiters, rebuild the replace regexp
          that.set_delimiters(name);
          regex = new_regex();
          return "";
        case ">": // render partial
          return that.render_partial(name, context, partials);
        case "{": // the triple mustache is unescaped
          return that.find(name, context);
        default: // escape the value
          return that.escape(that.find(name, context));
        }
      };
      var lines = template.split("\n");
      for(var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(regex, tag_replace_callback, this);
        if(!in_recursion) {
          this.send(lines[i]);
        }
      }

      if(in_recursion) {
        return lines.join("\n");
      }
    },

    set_delimiters: function(delimiters) {
      var dels = delimiters.split(" ");
      this.otag = this.escape_regex(dels[0]);
      this.ctag = this.escape_regex(dels[1]);
    },

    escape_regex: function(text) {
      // thank you Simon Willison
      if(!arguments.callee.sRE) {
        var specials = [
          '/', '.', '*', '+', '?', '|',
          '(', ')', '[', ']', '{', '}', '\\'
        ];
        arguments.callee.sRE = new RegExp(
          '(\\' + specials.join('|\\') + ')', 'g'
        );
      }
      return text.replace(arguments.callee.sRE, '\\$1');
    },

    /*
      find `name` in current `context`. That is find me a value
      from the view object
    */
    find: function(name, context) {
      name = this.trim(name);

      // Checks whether a value is thruthy or false or 0
      function is_kinda_truthy(bool) {
        return bool === false || bool === 0 || bool;
      }

      var value;

      // check for dot notation eg. foo.bar
      if(name.match(/([a-z_]+)\./ig)){
        var childValue = this.walk_context(name, context);
        if(is_kinda_truthy(childValue)) {
          value = childValue;
        }
      }
      else{
        if(is_kinda_truthy(context[name])) {
          value = context[name];
        } else if(is_kinda_truthy(this.context[name])) {
          value = this.context[name];
        }
      }

      if(typeof value === "function") {
        return value.apply(context);
      }
      if(value !== undefined) {
        return value;
      }
      // silently ignore unkown variables
      return "";
    },

    walk_context: function(name, context){
      var path = name.split('.');
      // if the var doesn't exist in current context, check the top level context
      var value_context = (context[path[0]] != undefined) ? context : this.context;
      var value = value_context[path.shift()];
      while(value != undefined && path.length > 0){
        value_context = value;
        value = value[path.shift()];
      }
      // if the value is a function, call it, binding the correct context
      if(typeof value === "function") {
        return value.apply(value_context);
      }
      return value;
    },

    // Utility methods

    /* includes tag */
    includes: function(needle, haystack) {
      return haystack && haystack.indexOf(this.otag + needle) != -1;
    },

    /*
      Does away with nasty characters
    */
    escape: function(s) {
      s = String(s === null ? "" : s);
      return s.replace(/&(?!\w+;)|["'<>\\]/g, function(s) {
        switch(s) {
        case "&": return "&amp;";
        case '"': return '&quot;';
        case "'": return '&#39;';
        case "<": return "&lt;";
        case ">": return "&gt;";
        default: return s;
        }
      });
    },

    // by @langalex, support for arrays of strings
    create_context: function(_context) {
      if(this.is_object(_context)) {
        return _context;
      } else {
        var iterator = ".";
        if(this.pragmas["IMPLICIT-ITERATOR"]) {
          iterator = this.pragmas["IMPLICIT-ITERATOR"].iterator;
        }
        var ctx = {};
        ctx[iterator] = _context;
        return ctx;
      }
    },

    is_object: function(a) {
      return a && typeof a == "object";
    },

    is_array: function(a) {
      return Object.prototype.toString.call(a) === '[object Array]';
    },

    /*
      Gets rid of leading and trailing whitespace
    */
    trim: function(s) {
      return s.replace(/^\s*|\s*$/g, "");
    },

    /*
      Why, why, why? Because IE. Cry, cry cry.
    */
    map: function(array, fn) {
      if (typeof array.map == "function") {
        return array.map(fn);
      } else {
        var r = [];
        var l = array.length;
        for(var i = 0; i < l; i++) {
          r.push(fn(array[i]));
        }
        return r;
      }
    },

    getCachedRegex: function(name, generator) {
      var byOtag = regexCache[this.otag];
      if (!byOtag) {
        byOtag = regexCache[this.otag] = {};
      }

      var byCtag = byOtag[this.ctag];
      if (!byCtag) {
        byCtag = byOtag[this.ctag] = {};
      }

      var regex = byCtag[name];
      if (!regex) {
        regex = byCtag[name] = generator(this.otag, this.ctag);
      }

      return regex;
    }
  };

  return({
    name: "mustache.js",
    version: "0.4.0-dev",

    /*
      Turns a template and view into HTML
    */
    to_html: function(template, view, partials, send_fun) {
      var renderer = new Renderer();
      if(send_fun) {
        renderer.send = send_fun;
      }
      renderer.render(template, view || {}, partials);
      if(!send_fun) {
        return renderer.buffer.join("\n");
      }
    }
  });
}();
;;(function() {
  var flash = {};

  function show(selector, name) {
    if (document.cookie.match(/__fs=y/) && $.trim($("#flash").html()).length == 0) {
      $.post("/flash", {name:name}, function(res) {
        var view = {},
            flash = res.flash,
            template = res.template;

        $(selector).hide();
        for (var k in flash) {
          view.key = k;
          view.msg = flash[k];
          $(selector).append(Mustache.to_html(template, view));
        }
        $(selector).fadeIn();
      },'json');
    } else {
      var domains = document.domain.split('.');
      var domain_postfix = domains[domains.length-1];
      var domain_prefix = domains[domains.length-2];
      document.cookie = "__fs=n;path=/;domain="+domain_prefix+"."+domain_postfix+";";
    }
  }

  flash.show = show;

  while (window.__flash && __flash.length > 0) {
    var args = __flash.shift();
    var func = flash[args.shift()];
    func.apply(flash, args);
  }

})();
;dls.setHomeCity = {
  init: function(self) {
    this.appendSwitcher();
    this.attachListeners(self);
    this.attachSetHomeCity(self);
    this.animate();
  },
  appendSwitcher: function() {
    $('.current-city a.market .mkt-switcher').remove(); // ****HACK**** need to pass in an init class name to target just one element
    $('.current-city a.market').append('<span class="mkt-switcher market-button animated">&nbsp;</span>');
  },
  animate: function() {
    if (($.cookie('home_city_fte_012712') == null)) {
      setTimeout(function() {$('.market-button').addClass('swing');}, 2000);
      $.cookie('home_city_fte_012712',1, {path: '/'});
    }
  },
  toggleMenu: function(element) {
    $(element).closest('.city-picker').find('.market-nav').toggleClass('active');
    $('html').one('click', function() {
     $(element).closest('.city-picker').find('.market-nav').add('h2.current-city a').removeClass('active');
    });
  },
  attachListeners: function(self) {
    var _this = this;
    $('.market-nav').bind('home_city:show', function() {
      _gaq.push(['_trackEvent', 'setHomeCity','activateMarketNav',self.currentCity.name,1]);
      _this.toggleMenu(this);
    });
    $('h2.current-city a .mkt-switcher').click(function(e) {
      $('body').trigger('home_city:clicked');
      e.preventDefault();
      e.stopPropagation();
      _gaq.push(['_trackEvent', 'setHomeCity','activateMarketNav',self.currentCity.name,1]);
      _this.toggleMenu(this);
    });
    $('#left-navigation').delegate('.market-nav', 'click', function(event){
      event.stopPropagation();
    });
    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        $('.market-nav, h2.current-city a').removeClass('active');
      }
    });
    $('.set-market.is-home-city, .set-market.loading-home-city').delegate('a', 'click', function(e){
      e.preventDefault();
      e.stopPropagation();
    });
    $('li.my-cities li.home').delegate('a', 'click', function(e){
      _gaq.push(['_trackEvent', 'setHomeCity','navToHomeCity',this.text,1]);
    });
    $('li.my-cities li').not('.home').delegate('a', 'click', function(e){
      _gaq.push(['_trackEvent', 'setHomeCity','navToMyCity',this.text,1]);
    });
    $('li.nearby-cities li').delegate('a', 'click', function(e){
      _gaq.push(['_trackEvent', 'setHomeCity','navToNearbyCity',this.text,1]);
    });
  },
  attachSetHomeCity: function(self) {
    $('.set-market.set-home-city').delegate('a','click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var el = $(this);
      el.closest('h2').removeClass('set-home-city').addClass('loading-home-city');
      $.cookie('home_city',self.cookie(), { expires: 1095, path: '/', domain: "." + dls.tld });
      try {
        $('li.my-cities ul li.home').removeClass('home');
        $('li.my-cities ul li.city-id-'+self.currentCity.id).remove();
        $('li.my-cities ul').prepend("<li class='home city-id-"+self.currentCity.id+"'><a href='/'>"+self.currentCity.name+" <span class='home-market'>&nbsp;</span></a></li>");
      } catch(e) {}
      el.text(self.isHomeCityText);
      if (Me.loggedIn()()) {
        $.post(self.updateHomeCityPeoplePath, { city_id: self.currentCity.id });
      }
      _gaq.push(['_trackEvent', 'setHomeCity','setCity',self.currentCity.name,1]);
      setTimeout(function(){
        el.closest('h2').removeClass('loading-home-city set-home-city').addClass('is-home-city');
      }, 500);
    });
  }
}
;dls.placements = {
  init: function() {
    $('.placements').each(function() {
      var self = $(this);
      var placement = self.attr('data-ls-placement');
      var campaign = self.attr('data-ls-campaign');
      var personId = Me && Me.id();
      if(typeof(placement) != 'undefined') {
        _gaq.push(['_trackEvent', campaign, 'view_'+placement, personId]);
        self.click(function(e){
          _gaq.push(['_trackEvent', campaign, 'click_'+placement, personId]);
        });
      }
    });
  }
}
;$(function() {
  setTimeout(function(){
    dls.placements.init();
  }, 500);
});;var plus = {
  init: function() {
    $('#grand_total').bind('before_grand_total_update', plus.showSignup);
    $('#grand_total').bind('grand_total_update', plus.checkTermsAgreement);
    $('#plus_agree').change(plus.checkTermsAgreement);

    $('#plus_learn_more_link').click(function() {
      $('#plus_learn_more').show().modal();
      return false;
    });

    $('#plus_terms_link').click(function() {
      $('#plus_terms').show().modal();
      return false;
    });

    $('#purchase_form').submit(function() {
      if(plus.optionSelected()) {
        if($("#plus_agree").is(":checked")) {
          return true;
        } else {
          alert("You must agree to the LivingSocial terms");
          return false;
        }
      }
    });

    plus.showSignup();
  },

  showSignup: function() {
    if(plus.optionSelected()) {
      $('.plus_signup').show();
      $('tr.plus_signup select').val(1);
      plus.checkTermsAgreement();
    } else {
      $('.plus_signup').hide();
      $('tr.plus_signup select').val(0);
      $('tr #plus_agree').attr('checked',false);
    }
  },

  optionSelected: function() {
    var selectedPlusOptions = $('.plus select option:selected').map(function(index,opt) {
      if($(opt).val() != "0") {
        return $(opt).val();
      }
    });
    return(selectedPlusOptions.length > 0);
  },

  checkTermsAgreement: function() {
    if(plus.optionSelected()) {
      if($('#plus_agree').attr('checked')) {
        checkouts.enableCheckoutForm();
      }
      else {
        checkouts.disableCheckoutForm();
      }
    }
  }
};

;(function(root){

  var $ = root.jQuery,
      deal = root.Deal,
      dls = root.dls;

  var tokenData = {valid_token: false};


  dls.IncentivizedDeal = {
    init: init
  };


  function init(){
    if(isLoggedIn()){
      if(hasToken()){
        validateToken(getDealId(), getToken(), onValidateToken);
      }
      else {
        showUnavailableButton();
      }
    }
    else {
      showLoginButton();
    }
  }

  function isLoggedIn(){
    return (dls.viewer || {})['loggedIn'];
  }

  function hasToken(){
    return Boolean(getToken());
  }

  function hasValidToken(){
    return isLoggedIn() && hasToken() && tokenData['valid_token'];
  }

  function onValidateToken(){
    if(hasValidToken()){
      showBuyNowButton()
    }
    else {
      showUnavailableButton()
    }
  }

  function getDealId(){
    return deal.id;
  }

  function getPurchaseUrl(){
    return deal.purchase_path().call(deal);
  }

  function getToken() {
    return (document.cookie.match(/(?:^|; )it=([^;]+)/) || [])[1] || '';
  }

  function validateToken(dealId, token, callback){
    var url = '/deals/' + dealId + '/validate_incentivized_deal_token/' + token;
    var onSuccess = function(data){
      tokenData = data;
      callback();
    }
    $.ajax({type: 'get', url: url, success: onSuccess});
  }

  function showBuyNowButton(){
    var purchaseUrl = getPurchaseUrl(),
        buttonHtml = '<a class="button buy-now" href="' + purchaseUrl + '"><span>buy now!</span></a>';
    $('#incentivized-deal-button-container').html(buttonHtml);
  }

  function showUnavailableButton(){
    var buttonHtml = '<span class="button buy-sold-out">Unavailable</a>';
    $('#incentivized-deal-button-container').html(buttonHtml);
    showImageOverlay();
    showAlert();
  }

  function showLoginButton(){
    var purchaseUrl = getPurchaseUrl(),
        buttonHtml = '<a class="button buy-now" href="' + purchaseUrl + '"><span>Log in first</span></a>';
    $('#incentivized-deal-button-container').html(buttonHtml);
    showImageOverlay();
  }

  function showAlert(){
    $('#incentivized-token-alert').show();
  }

  function showImageOverlay(){
    $('#incentivized-deal-image-overlay').css('display', 'block');
  }

}(window));
;$.extend(Date.prototype, {
  monthAbbreviations: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  neutral: function() {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 12);
  },
  formatted: function() {
    // TODO FIXME REPLACE this with a better strftime() impl?
    var year = this.getFullYear(),
        month = this.getMonth() + 1,
        date = this.getDate();
        
    month = month < 10 ? ("0" + month) : month;
    date = date < 10 ? ("0" + date) : date;
    return [year, month, date].join("-");
  },

  headerFormatted: function() {
    return "" + this.monthAbbreviations[this.getMonth()] + " " + this.getDate() + " " + this.getFullYear();
  },

  flyoutFormatted: function() {
    return "" + this.monthAbbreviations[this.getMonth()] + " " + this.getDate();
  },

  tourHeaderFormatted: function() {
    var endDate = new Date(this.getFullYear(), this.getMonth(), this.getDate() + $.itineraryBuilder._defaults.tourLength)
    return "" + this.headerFormatted() + " - " + endDate.headerFormatted();
  },

  date_by_subtracting_days: function(days) {
    return new Date(
        this.getFullYear(), 
        this.getMonth(), 
        this.getDate() - days,
        this.getHours(),
        this.getMinutes(),
        this.getSeconds(),
        this.getMilliseconds()
    );
  },
  isPastMonthFrom: function(date) {
    returning = false;
    if (date) {
      if (date.getFullYear() > this.getFullYear()) {
        return true;
      } else if (date.getFullYear() === this.getFullYear() && date.getMonth() > this.getMonth()) {
        return true;
      }
    }
    return returning;
  },
  isFutureMonthFrom: function(date) {
    returning = false;
    if (date) {
      if (date.getFullYear() < this.getFullYear()) {
        return true;
      } else if (date.getFullYear() === this.getFullYear() && date.getMonth() < this.getMonth()) {
        return true;
      }
    }
    return returning;
  },
  afterToday: function(today) {
    if (today) {
      if (this.getFullYear() > today.getFullYear()) {
        return true;
      } else if (this.getFullYear() === today.getFullYear() &&
                this.getMonth() > today.getMonth()) {
        return true;
      } else if (this.getFullYear() === today.getFullYear() &&
                 this.getMonth() === today.getMonth() &&
                 this.getDate() > today.getDate()) {
        return true;
      } else {
        return false;
      }
    } else {
      return -1;
    }
  },
  addDays: function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  }
});
  
$.extend(Date, {
  getNightsInRange: function(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate < stopDate) {
      dateArray.push( new Date (currentDate) );
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  },

  dateFromString: function(dateString) {
    var month = dateString.match(/-(\d*)-/);
    var date = dateString.match(/-\d*-(\d*)/);
    var year = dateString.match(/(\d{4})/);

    if (month && date && year) {
      return new Date(parseInt(year[1], 10), parseInt(month[1], 10) - 1, parseInt(date[1], 10));
    } else {
      return null;
    }
  }
});

(function($) {
  $.fn.outerHTML = function() {
    return $(this).clone().wrap('<div></div>').parent().html();
  };
})(jQuery);

(function($) { 

var PROP_NAME = 'itineraryBuilder';

function ItineraryBuilder() {
  this._defaults = {
    dealId: null,
    checkInDateMessage: "check-in",
    checkOutDateMessage: "check-out",
    toursDateMessage: "select departure date",
    tours: false,
    tourLength: 4,
    numTravelers: 1
    // week offset - does the calendar start on sunday or monday?
    // button labels (translation), next, previous etc., button elements etc.
  };
}

$.extend(ItineraryBuilder.prototype, {
  
  markerClassName: 'hasItineraryBuilder',
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  weekOffset: 0,
  date: new Date(),
  browserStartDate: new Date(),
  selectedDates: new Array(),
  checkInDate: null,
  checkOutDate: null,
  checkOutRangeEndDate: null,  // day before first day after check-in date that is unavailable
  selectedRoomType: "",
  selectedRoomTypeId: null,
  inventory: [], // ((options by room type by date) supplied as result from ajax call)
  
  setDefaults: function(settings) {
    $.extend(this._defaults, settings || {});
    return this;
  },

  _attachItineraryBuilder: function(target, settings) {
    target = $(target);
    if (target.hasClass(this.markerClassName)) {
      // prevent attaching functionality to same element more than once
      return;
    }
    target.addClass(this.markerClassName);
    
    var instance = {settings: $.extend({}, this._defaults)};
    $.data(target[0], PROP_NAME, instance);
    
    this.dealId = settings.dealId; // check this
    if (settings.tours) {
      this._defaults.tours = settings.tours;
      this._handleTravelersSelection(target);
      this._handleSingleSupplementAcceptance(target);
    }
    this._initCheckInCalendar();
    this._handleRoomTypeSelection();
    this._handleBookNowButtonClick();
    
    this._setUIStateCheckIn(target);
    
    this._initTooltips(target);
    this._handleCheckInDateHeaderClick(target);
    this._handleCheckOutDateHeaderClick(target, settings);
    this._loadInventory();
  },

  _checkInHeaderContent: function() {
    var self = this;
    if (self._defaults.tours) {
      if (self.checkInDate) {
        return "<div class='title-checkin'>" + self.checkInDate.tourHeaderFormatted() + "</div>";
      } else {
        return self._defaults.toursDateMessage;
      }
    }
    else if (self.checkInDate) {
      return "<div class='title-checkin'><span>check-in</span> " + self.checkInDate.headerFormatted() + "</div>";
    } else {
      return self._defaults.checkInDateMessage;
    }
  },

  _checkOutHeaderContent: function() {
    var self = this;
    if (self.checkOutDate) {
      return "<div class='title-checkout'><span>check-out</span> " + self.checkOutDate.headerFormatted() + "</div>";
    } else {
      return self._defaults.checkOutDateMessage;
    }
  },

  _loadInventory: function() {
    var self = this;
    if (self.dealId) {
      $.ajax({
        type: "get",
        url: "/escapes/" + self.dealId + "/dated_inventory",
        success: function(data) {
          if (data.hasOwnProperty("days")) {
            self.inventory = data["days"];
            self._initCheckInCalendar();
          }
        }
      });
    }
  },

  _initTooltips: function(target) {
    $(target).find("#big-price .left-column").mouseover(function(e) {
      e.preventDefault();
      $(target).find("#lead-price-explanation").show();
    });
    $(target).find("#big-price .left-column").mouseout(function(e) {
      e.preventDefault();
      $(target).find("#lead-price-explanation").hide();
    });

    var timer;
    $(target).find(".room-types .room.available").mouseover(function(event){
      timer = setTimeout(function() {
        $(event.currentTarget).find(".room-type-explanation").show();
      }, 1000);
    });

    $(target).find(".room-types .room.available").mouseout(function(event){
      clearTimeout(timer);
      $(event.currentTarget).find(".room-type-explanation").hide();
    });
  },
  
  _initCheckInCalendar: function() {
    var calendarElement = $("#check-in.calendar");
    this._clearCalendar(calendarElement);

    var self = this;
    if (self.inventory && self.inventory.length > 0) {
      for (var prop in self.inventory[0]) {
        if (self.inventory[0].hasOwnProperty(prop)) { self.date = Date.dateFromString(prop); }
      }
    }

    var calendarMarkup = this._createCalendarMarkup(calendarElement);
    $(calendarElement).append(calendarMarkup);

    this._populateCalendar(calendarElement);
  },
  
  _initCheckOutCalendar: function() {
    var calendarElement = $("#check-out.calendar");

    var calendarMarkup = this._createCalendarMarkup(calendarElement);
    $(calendarElement).append(calendarMarkup);
    
    this._populateCalendar(calendarElement);
    this._registerHovering(calendarElement);
  },
  
  _createCalendarMarkup: function(target, settings) {
    var self = this;
    var calendar = $("<table border='0' cellspace='0' cellpadding='0'></table>");
    calendar.prepend($('<caption></caption>'));

    var head = $('<thead></thead>');
    var row  = $('<tr></tr>');

    $.each(self.dayNames, function(i, dayName) {
      var weekday = dayName.substring(0,3);
      var cell = $("<th></th>").text(weekday);
      row.append(cell);
    });
    head.append(row);
    calendar.append(head);
    
    var body = $('<tbody></tbody>');
    // TODO count month's days and set appropriate number of rows
    $.each([0,1,2,3,4,5], function(i, item) {
      var row  = $('<tr></tr>');
      
      $.each(self.dayNames, function(i, dayName) {
        var cell = $('<td class="ineligible"></td>');
        row.append(cell);
      });
      body.append(row);
    });

    calendar.append(body);

    return calendar.outerHTML();
  },
  
  _registerHovering: function(target) {
    var self = this;
    
    var cells = $(target).find('td.eligible');
    $.each(cells, function(i, cell) {
      $(cell).bind("mouseenter", function(e) {
        e.preventDefault();
        var c = this;
        $.each(cells, function(i, cell) {
          if ($(cell).data('date').afterToday(self.checkInDate)) {
            if ($(cell).data('date').valueOf() == $(c).data('date').valueOf()) {
              $(cell).addClass("hovering hovering-check-out");
            } else if ($(c).data('date').afterToday($(cell).data('date'))) {
              $(cell).addClass("hovering");
            }
          }
        });
      });
    });
    
    $.each(cells, function(i, cell) {
      $(cell).bind("mouseleave", function(e) {
        e.preventDefault();
        var c = this;
        $.each(cells, function(i, cell) {
          $(cell).removeClass("hovering hovering-check-out");
        });
      });
    });

  },

  _registerToursHovering: function(target) {
    var self = this;

    var eligibleCells = $(target).find('td.eligible.cur-month');
    var cells = $(target).find('td');
    $.each(eligibleCells, function(i, cell) {
      $(cell).bind("mouseenter", function(e) {
        e.preventDefault();
        var c = this;
        $.each(cells, function(i, cell) {
          if ($(cell).data('date').afterToday($(c).data('date'))) {
            if ($(cell).data('date').valueOf() == $(c).data('date').addDays(self._defaults.tourLength).valueOf()) {
              $(cell).addClass("hovering hovering-check-out");
            } else if ($(c).data('date').addDays(self._defaults.tourLength).afterToday($(cell).data('date'))) {
              $(cell).addClass("hovering");
            }
          }
        });
      });
      $(cell).bind("mouseleave", function(e) {
        e.preventDefault();
        var c = this;
        $.each(cells, function(i, cell) {
          $(cell).removeClass("hovering hovering-check-out");
        });
      });
    });

    var ineligibleCells = $(target).find('td.ineligible');
    $.each(ineligibleCells, function(i, cell) {
      $(cell).unbind("mouseenter");
      $(cell).unbind("mouseleave");
    });

  },
  
  _populateCalendar: function(target) {
    var self = this;

    if (self.checkInDate) {
      var firstAvailableCheckoutDate = new Date(self.checkInDate.getFullYear(), self.checkInDate.getMonth(), parseInt(self.checkInDate.getDate() + 1, 0));
      if (firstAvailableCheckoutDate.isFutureMonthFrom(self.date)) {
        self.date = firstAvailableCheckoutDate;
      }
    }
    
    var month = self.date.neutral();
    month.setDate(1);
    
    // set caption
    var captionElem = $(target).find('caption').get(0);
    var monthLabel = self.monthNames[month.getMonth()] + ' ' + month.getFullYear();
    var captionContent = "<div class='monthnav prev'>&laquo;</div><div id='month-label'>" + monthLabel + "</div><div class='monthnav next'>&raquo;</div>";
    $(captionElem).empty().append(captionContent);
    // end set caption

    $(".monthnav.prev, .monthnav.next").addClass("disabled");

    if (self._hasPastInventoryMonths(month)) {
      $(".monthnav.prev").removeClass("disabled");
    }

    if (self._hasFutureInventoryMonths(month)) {
      $(".monthnav.next").removeClass("disabled");
    }
      
    var iterator = new Date(month);
    var offset = (iterator.getDay() - self.weekOffset) % 7;

    var inactive = offset > 0 ? true : false;
    iterator.setDate(iterator.getDate() - offset);
    if (iterator.getDate() > 1 && !inactive) {
      iterator.setDate(iterator.getDate() - 7);
      if (iterator.getDate() > 1) {
        inactive = true;
      }
    }
    
    $(target).find('td').each(function(i, day) {
      
      day.date = new Date(iterator);
      $(day).text(day.date.getDate());
      $(day).data('date', day.date);
      self._applyDayCellStyles(day, month);
      iterator.setDate(iterator.getDate() + 1);
    });

    month.setMonth(month.getMonth() + 1);
    self._handleMonthNavClick(target);
    if (this._defaults.tours) { this._registerToursHovering(target); }
  },

  _handleMonthNavClick: function(target) {
    var self = this;
    $('.monthnav').bind('click', function(e) {
      e.preventDefault();
      if (!($(this).hasClass('disabled'))) {
        self.date.setDate(1);
        if ($(this).hasClass('prev')) {
          self.date.setMonth(self.date.getMonth() - 1);
        } else if ($(this).hasClass('next')) {
          self.date.setMonth(self.date.getMonth() + 1);
        }
        self._populateCalendar(target);
      }
    });
  },
  

  _validCheckInDate: function(date) {
    return date.afterToday(this.browserStartDate) && this._availableOptionsForDate(date).length > 0;
  },

  _validCheckOutDate: function(date) {
    var self = this;
    var returning = false;
    $.each(self._availableOptionsForDate(date.date_by_subtracting_days(1)), function(i, option) {
      if (self._roomTypeIdsForDate(self.checkInDate).length > 0) {
        $.each(self._roomTypeIdsForDate(self.checkInDate), function(j, id) {
          if (id == option.room_type_id) {
            returning = true;
          }
        });
      }
    });
    return returning;
  },

  _availableOptionsForDate: function(date) {
    var self = this;
    var dateOptions = [];
    if (self.inventory && self.inventory.length > 0) {
      $.each(self.inventory, function(i, day) {
        if (day.hasOwnProperty(date.formatted())) {
          $.each(day, function(j, options) {
            $.each(options, function(k, option) {
              if (!option.sold_out) { dateOptions.push(option); }
            });
          });
        }
      });
    }
    return dateOptions;
  },

  _roomTypeIdsForDate: function(date) {
    var roomTypes = [];
    $.each(this._availableOptionsForDate(date), function(i, option) {
      roomTypes.push(option.room_type_id);
    });
    return roomTypes;
  },
  
  
  _applyDayCellStyles: function(cell, date) {
    this._resetCell(cell);
    this._calculateDayEligibility(cell);
    this._handleDateClick(cell);
    if (!this._defaults.tours) {
      this._adjustVisibleRows(cell, date);
    }

    var dateToCompare = $(cell).data('date');
    if (dateToCompare.isPastMonthFrom(date)) {
      $(cell).addClass('prev-month');
    } else if (dateToCompare.isFutureMonthFrom(date)) {
      $(cell).addClass('next-month');
    } else {
      $(cell).addClass('cur-month');
    }

    if (this.checkInDate && (dateToCompare.toString() === this.checkInDate.toString())) {
      $(cell).addClass('selected');
    }
  },

  _resetCell: function(cell) {
    $(cell).addClass('ineligible');
    $(cell).removeClass('eligible');
    $(cell).removeClass('prev-month');
    $(cell).removeClass('next-month');
    $(cell).removeClass('cur-month');
    $(cell).removeClass('selected');
  },

  _calculateDayEligibility: function(cell) {
    var self = this;
    var dateToCompare = $(cell).data('date');
    if (this.checkInDate === null) {
      if (self._validCheckInDate(dateToCompare)) {
        $(cell).removeClass('ineligible');
        $(cell).addClass('eligible');
      }
    } else if (this.checkInDate != null) {
      if (dateToCompare.afterToday(self.checkInDate)) {
        if (this._validCheckOutDate(dateToCompare)) {
          $(cell).removeClass('ineligible');
          $(cell).addClass('eligible');
        } else if (this.checkOutRangeEndDate === null) {
          this.checkOutRangeEndDate = dateToCompare;
        }
      }
    }
    if (this.checkOutRangeEndDate != null && dateToCompare.afterToday(this.checkOutRangeEndDate)) {
      $(cell).addClass('ineligible');
      $(cell).removeClass('eligible');
    }
  },

  _handleDateClick: function(cell) {
    var self = this;

    $(cell).filter('.eligible').bind('click', function(e) {
      e.preventDefault();
      $(this).addClass('selected');
      var date = $(this).data('date');
      var target = $(this).closest("#itinerary-builder");

      if ($(this).closest("#check-in").length) {
        if (date) { self.checkInDate = date; }
        if (self._defaults.tours) {
          self._setUIStateTourPackage(target);
        } else {
          self._setUIStateCheckOut(target);
        }

      } else if (self.checkOutDate === null && $(this).closest("#check-out").length) {
        self.checkOutDate = date;
        self._updateRoomTypeInformation();
        self._setUIStateRoomType(target);
      }
    });

    $(cell).not('.eligible').unbind('click');
  },

  _adjustVisibleRows: function(day, date) {
    if(day.date.getDay() === 0) {
      if(day.date.isFutureMonthFrom(date)) {
        $(day.parentElement).addClass("next-month-row");
      } else {
        $(day.parentElement).removeClass("next-month-row");
      }
    }
  },
  
  
  _updateRoomTypeInformation: function() {
    var self = this;
    var rooms = $(".room-types .room a");
    var roomOptions = new Array();
    var nights = Date.getNightsInRange(this.checkInDate, this.checkOutDate);
    $.each(rooms, function(i, room) {
      $(room).closest(".room").show();
      $(room).closest(".room").removeClass("sold-out-room");
      $.each(self._filteredInventoryByItinerary(), function(itineraryIndex, option) {
        if (roomOptions[i] === undefined) { roomOptions[i] = new Array();}
        var roomId = parseInt($(room).attr("data-room-type-id"), 0);
        if (option.room_type_id === roomId) {
          if (option.sold_out) {
            $(room).closest(".room").addClass("sold-out-room");
          } else {
            roomOptions[i].push(option);
          }
        }
      });
      if (nights.length === roomOptions[i].length) {
        var average = self._calculateOptionsAveragePrice(roomOptions[i]);
        var total = self._calculateOptionsTotalPrice(roomOptions[i]);
        self._applyRoomTypePrices(average, total, room);
        self._updateRoomTypeFlyouts(roomOptions[i], room);
      } else {
        $(room).closest(".room").addClass('sold-out-room');
      }
    });
  },
  
  _calculateOptionsAveragePrice: function(options) {
    var average = 0, total = 0;
    if (options && options.length) {
      $.each(options, function(i, option) { total += option.price; });
      average = parseInt((total / options.length), 0);
    }
    return average;
  },
  
  _calculateOptionsTotalPrice: function(options) {
    var total = 0;
    $.each(options, function(i, option) { total += option.price; });
    return total.toFixed(2);
  },

  _applyRoomTypePrices: function(averagePrice, totalPrice, room) {
    if (averagePrice && totalPrice && $(room).length) {
      $(room).find(".price").text(averagePrice);
      $(room).data("price", totalPrice);
    }
  },

  _updateRoomTypeFlyouts: function(options, room) {
    var self = this;
    var groupedOptions = new Object();
    $.each(options, function(i, option) {
      var optionDate = new Date(self.checkInDate.getFullYear(), self.checkInDate.getMonth(), parseInt(self.checkInDate.getDate() + i, 0));
      if (groupedOptions[option.price] === undefined) { groupedOptions[option.price] = []; }
      groupedOptions[option.price].push(optionDate);
    });

    var roomRatesText = new Array();
    roomRatesText.push("<strong>room rates:</strong>");
    $.each(groupedOptions, function(price, dates) {
      if (roomRatesText[roomRatesText.length-1] === ")") { roomRatesText.push(" | "); }
      roomRatesText.push(" <strong>$"+price+"</strong> (");
      $.each(dates, function(i, date) {
        if (i === 0) {
          roomRatesText.push(date.flyoutFormatted());
        } else if (date.getMonth() !== dates[i-1].getMonth()) {
          roomRatesText.push(", "+date.flyoutFormatted());
        } else {
          roomRatesText.push(", "+date.getDate());
        }
      });
      roomRatesText.push(")");
    });

    var size = 0;
    for (key in groupedOptions) {
      if (groupedOptions.hasOwnProperty(key)) size ++;
    }
    if (size <= 1 && $('.room-type-explanation.no-details')[0]) {
      $('.room-type-explanation.no-details').addClass('narrow');
    } else {
      $('.room-type-explanation.no-details').removeClass('narrow');
      }

    $(room).closest(".room").find(".room-type-explanation .room-rates").html(roomRatesText.join(""));
  },
  
  _clearCalendar: function(element) {
    $(element).closest(".calendar").empty();
  },
  
  _handleRoomTypeSelection: function() {
    var self = this;
    
    // FIXME don't hard-code
    $('.room-types a').bind('click', function(e) {
      e.preventDefault();
      
      if ($(this).closest('.room').hasClass('sold-out-room')) {
        return null;
      } else {
        $('.room-types .room').removeClass("selected");
        $(this).closest('.room').addClass('selected');
        self.selectedRoomType = $(this).find('.name').text();
        self.selectedRoomTypeId = parseInt($(this).attr("data-room-type-id"), 0);
        
        self._updatePrice();
        
        // FIXME don't hard-code
        $('#book-now-button').removeClass('disabled');
      }
      
    });
  },
  
  _updatePrice: function() {
    var self = this;
    var currencySymbol = "$",
    dollars = "0",
    cents = "00";

    var element = $(".room.selected a");
    if ($(element).length > 0) {
      dollars = String($(element).data().price).split(".")[0];
      cents = String($(element).data().price).split(".")[1];
    }

    dollars = parseInt(dollars, 0) * this._defaults.numTravelers;
    $('#price-row').find(".currency-symbol").text(currencySymbol);
    $('#price-row').find(".dollars").text(dollars);
    $('#price-row').find(".cents").text(cents);
  },
  
  _handleBookNowButtonClick: function() {
    var self = this;
    $('#book-now-button').bind("click", function(e) {
      e.preventDefault();
      
      if ($(this).hasClass('disabled')) {
        return null;
      } else {

        self._sendOptionIdsToServer();
        
        $(this).addClass('disabled').find("span").text("loading...");
      }
    });
  },

  _handleCheckInDateHeaderClick: function(target) {
    var self = this;
    target.find(".segment a#header-check-in").bind("click", function(e) {
      e.preventDefault();

      self.checkOutRangeEndDate = null;
      self.checkInDate = null;
      self.checkOutDate = null;
      self._setUIStateCheckIn(target);
    });
  },
  
  _handleCheckOutDateHeaderClick: function(target) {
    var self = this;

    target.find(".segment a#header-check-out").bind("click", function(e) {
      e.preventDefault();
      
      if ($(this).closest(".segment").hasClass("inactive")) {
        return null;
      }

      self.checkOutDate = null;
      self._setUIStateCheckOut(target);
    });
  },
  
  _optionIdsForItineraryAndRoomType: function() {
    var self = this;
    var optionIds = [];
    var roomId = self.selectedRoomTypeId;
    $.each(self._filteredInventoryByItinerary(), function(i, option) {
      
      if (option.room_type_id === self.selectedRoomTypeId) {
        optionIds.push(option.option_id);
      }
    });
    return optionIds;
  },
  
  _sendOptionIdsToServer: function() {
    var self = this;
    if (this.dealId && document.domain) {
      var postUrl = "https://" + document.domain + "/deals/" + this.dealId + "/purchases/new";
      var form = $("<form id='itinerary-builder-form'></form>").attr("method", "get").attr("action", postUrl);

      var optionIds = [];
      if (this._defaults.tours) {
        optionIds = this._optionIdsForTour();
      } else {
        optionIds = this._optionIdsForItineraryAndRoomType();
      }

      $.each(optionIds, function(i, optionId) {
        form.append("<input type='hidden' name='order_quantities[" + optionId + "]' value='"+ self._defaults.numTravelers +"' />");
      });

      // TODO replace itinerary-builder with "target"
      $("#itinerary-builder").append(form.outerHTML());
      $('#itinerary-builder-form').submit();
    }
  },
  
  _filteredInventoryByItinerary: function() {
    var self = this;
    var filteredInventory = [];
    
    if (this.checkInDate != null && this.checkOutDate != null && (this.checkOutDate > this.checkInDate) && this.inventory.length > 0) {

      var nights = Date.getNightsInRange(this.checkInDate, this.checkOutDate);
      
      $.each(nights, function(i, night) {

        $.each(self.inventory, function(i, invObj) {
          var options = invObj.hasOwnProperty(night.formatted()) ? invObj[night.formatted()] : null;
          if (options != null) {
            filteredInventory = filteredInventory.concat(options);
          }
          
        });
      });
      
    }
    return filteredInventory;
  },

  _hasPastInventoryMonths: function(month) {
    var self = this;
    for (var i=0; i < this.inventory.length; i++) {
      var obj = this.inventory[i];
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
         var inventoryDate = Date.dateFromString(prop);
         if (self.checkInDate && self.checkInDate > inventoryDate) { continue; }
         if (inventoryDate && inventoryDate.isPastMonthFrom(month)) {
            return true;
          }
        }
      }
    }
    return false;
  },

  _hasFutureInventoryMonths: function(month) {
    var self = this;
    for (var i=0; i < this.inventory.length; i++) {
      var obj = this.inventory[i];
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          var inventoryDate = Date.dateFromString(prop);
          if (self.checkInDate) { var inventoryDate = new Date(inventoryDate.getFullYear(), inventoryDate.getMonth(), parseInt(inventoryDate.getDate() + 1, 0)); }
          if (inventoryDate && inventoryDate.isFutureMonthFrom(month)) {
            return true;
          }
        }
      }
    }
    return false;
  },

  _setUIStateCheckIn: function(target) {
    var segmentCheckIn, segmentCheckOut, segmentRoomType;
    segmentCheckIn = $(".segment:nth-child(1)");
    segmentCheckIn.addClass("active").removeClass("userdata inactive");
    this._initCheckInCalendar();
    segmentCheckIn.find(".segment-content").slideDown();
    segmentCheckIn.find("#header-check-in .title").empty().append(this._checkInHeaderContent());
    
    segmentCheckOut = $(".segment:nth-child(2)");
    segmentCheckOut.removeClass("active userdata").addClass("inactive");
    segmentCheckOut.find("#check-out.calendar").empty();
    segmentCheckOut.find(".segment-content").hide();
    segmentCheckOut.find("#header-check-out .title").empty().append("check-out");

    segmentRoomType = $(".segment:nth-child(3)");
    segmentRoomType.removeClass("active").addClass("inactive");
    segmentRoomType.find(".segment-content").hide();
    target.find('#book-now-button').addClass('disabled');
  },
  
  _setUIStateCheckOut: function(target) {
    var segmentCheckIn, segmentCheckOut, segmentRoomType;
    segmentCheckIn = $(".segment:nth-child(1)");
    segmentCheckIn.addClass("userdata").removeClass("inactive");
    segmentCheckIn.find("#check-in.calendar").empty();
    segmentCheckIn.find(".segment-content").slideUp(250);
    segmentCheckIn.find("#header-check-in .title").empty().append(this._checkInHeaderContent());
    
    segmentCheckOut = $(".segment:nth-child(2)");
    segmentCheckOut.addClass("active").removeClass("userdata inactive");
    segmentCheckOut.find("#check-out.calendar").empty();
    setTimeout(function() {
      segmentCheckOut.find(".segment-content").slideDown(250);
    }, 250);
    
    this._initCheckOutCalendar();
    segmentCheckOut.find("#header-check-out .title").empty().append(this._checkOutHeaderContent());
    segmentRoomType = $(".segment:nth-child(3)");
    segmentRoomType.removeClass("active").addClass("inactive");
    segmentRoomType.find(".segment-content").hide();
    target.find('#book-now-button').addClass('disabled');
  },
  
  _setUIStateRoomType: function(target) {
    var segmentCheckIn, segmentCheckOut, segmentRoomType;
    segmentCheckIn = $(".segment:nth-child(1)");
    segmentCheckIn.find("#check-in.calendar").empty();
    segmentCheckIn.find(".segment-content").hide();
    segmentCheckIn.find("#header-check-in .title").empty().append(this._checkInHeaderContent());
    
    segmentCheckOut = $(".segment:nth-child(2)");
    segmentCheckOut.addClass("userdata").removeClass("inactive");
    segmentCheckOut.find("#check-out.calendar").empty();
    segmentCheckOut.find(".segment-content").slideUp(250);
    segmentCheckOut.find("#header-check-out .title").empty().append(this._checkOutHeaderContent());

    segmentRoomType = $(".segment:nth-child(3)");
    segmentRoomType.addClass("active").removeClass("inactive");
    setTimeout(function() {
      segmentRoomType.find(".segment-content").slideDown(250);
    }, 250);
    segmentRoomType.find(".room").removeClass("selected");
    target.find('#book-now-button').addClass('disabled');
    this._selectFirstAvailableRoom(target);
  },

  _setUIStateTourPackage: function(target) {
    var self = this;

    var rooms = $(".room-types .room a");
    $.each(rooms, function(i, room) {
      $.each(self._availableOptionsForDate(self.checkInDate), function(j, option) {
        var roomId = parseInt($(room).attr("data-room-type-id"), 0);
        if (option.room_type_id === roomId) {
          var total = option.price;
          self._applyRoomTypePrices(total, total, room);
        }
      });
    });

    var segmentCheckIn, segmentCheckOut, segmentRoomType;
    segmentCheckIn = $(".segment:nth-child(1)");
    segmentCheckIn.addClass("userdata").removeClass("inactive");
    segmentCheckIn.find("#check-in.calendar").empty();
    segmentCheckIn.find(".segment-content").slideUp(250);
    segmentCheckIn.find("#header-check-in .title").empty().append(this._checkInHeaderContent());

    segmentRoomType = $(".segment:nth-child(2)");
    segmentRoomType.addClass("active").removeClass("inactive");
    setTimeout(function() {
      segmentRoomType.find(".segment-content").slideDown(250);
    }, 250);
    segmentRoomType.find(".room").removeClass("selected");
    target.find('#book-now-button').addClass('disabled');
    this._selectFirstAvailableRoom(target);
  },

  _selectFirstAvailableRoom: function(target) {
    setTimeout(function() {
      var firstAvailableRoom = target.find(".room-types .room:not(.sold-out-room):first a");
      firstAvailableRoom.trigger("click");
    }, 500);
  },

  _optionIdsForTour: function() {
    var self = this;
    var selectedOptionIds = [];
    $.each(this._availableOptionsForDate(this.checkInDate), function(i, option) {
      if ($.inArray(option.option_id, selectedOptionIds) < 0 && self.selectedRoomTypeId === option.room_type_id) {
        selectedOptionIds.push(option.option_id);
      }
    });
    return selectedOptionIds;
  },

  _handleTravelersSelection: function(target) {
    var self = this;
    self._defaults.numTravelers = $(target).find("select#travelers-selection").val();
    $(target).find("select#travelers-selection").change(function(e) {
      self._defaults.numTravelers = $(e.currentTarget).val();
      if (self._defaults.numTravelers == 1) {
        $(target).find("#single-supplement-notice").show();
        $(target).find(".room-types").hide();
      }
      self._updatePrice();
    });

  },

  _handleSingleSupplementAcceptance: function(target) {
    $(target).find("#single-supplement-notice a").bind("click", function(e) {
      e.preventDefault();
      $(target).find("#single-supplement-notice").hide();
      $(target).find(".room-types").show();
    });
  }


});

var getters = ['settings'];
  
$.fn.itineraryBuilder = function(options) {
  var otherArgs = Array.prototype.slice.call(arguments, 1);
  if ($.inArray(options, getters) > -1) {
    return $.itineraryBuilder['_' + options + 'ItineraryBuilder'].
      apply($.itineraryBuilder, [this[0]].concat(otherArgs));
  }
  return this.each(function() {
    if (typeof options == 'string') {
      $.itineraryBuilder['_' + options + 'ItineraryBuilder'].
        apply($.itineraryBuilder, [this].concat(otherArgs));
    }
    else {
      $.itineraryBuilder._attachItineraryBuilder(this, options || {});
    }
  });

};

$.itineraryBuilder = new ItineraryBuilder();

})(jQuery);
;$(document).ready(function() {
  //dated escapes room type details
  var roomTypeDescription = $(".room-type-descriptions .room-type-description");
  roomTypeDescription.find(".room-type-details .truncated .read-more").bind("click", function(e) {
    e.preventDefault();
    $(this).closest(".truncated").hide();
    $(this).closest(".room-type-details").find(".full").show();
  });
  roomTypeDescription.find(".room-type-details .full .read-less").bind("click", function(e) {
    e.preventDefault();
    $(this).closest(".full").hide();
    $(this).closest(".room-type-details").find(".truncated").show();
  });
  roomTypeDescription.find(".room-type-header .lead-price").mouseover(function(e) {
    e.preventDefault();
    $(this).find(".explanation").show();
  });
  roomTypeDescription.find(".room-type-header .lead-price").mouseout(function(e) {
    e.preventDefault();
    $(this).find(".explanation").hide();
  });

  //tours js
  $("#to-packing-list").bind("click", function(e) {
    e.preventDefault();
    if($("html").scrollTop != 0) {
      $("html").animate({scrollTop:$("#packing-list").offset().top - 100}, 1000, 'easeInOutCubic');
    }
    if($("body").scrollTop != 0) {
      $("body").animate({scrollTop:$("#packing-list").offset().top}, 1000, 'easeInOutCubic');
    }
  });
});
;$(function() {

  window.City = {
    id: parseInt($("#city-picker-nav").attr("data-city-id")),
    home_city: function() {
      var home_city = {};
      var hc = decodeURIComponent(Cache.Cookie.Helpers.readFor('home_city'));
      try { home_city = JSON.parse(hc); } catch(e) {}
      return home_city;
    },
    home_city_name: function() {
      return this.home_city()['name'].replace(/\+/g,' '); // hack to account for ruby vs. js uri encoding
    },
    home_city_id: function() {
      return this.home_city()['id'];
    },
    show_home_city: function() {
      return function() {
        if (this.city.home_city() && this.city.home_city()['id']) {
          return true;
        }
        return false;
      }
    },
    has_my_cities: function() {
      return function() {
        var viewer = this.me;
        if (viewer.city_id || this.city.show_home_city()) {
          return true;
        } else {
          return false;
        }
      }
    },
    valid_home_city: function() {
      return function() {
        return !!$("#city-picker-nav").attr("data-valid");
      }
    },
    my_cities: function() {
      return function() {
        var viewer = this.me;
        var me_cities = viewer.cities;
        var output = "";
        for (var city_id in viewer.subs)
        {
          try {
            var me_city = me_cities[city_id];
            if (me_city['home'] == 0) {
              output += "<li class='city-id-"+city_id+"'><a href='/cities/"+city_id+"'>"+me_city['name']+"</a></li>";
            }
          } catch(err) {} // in case cities response is not available
        }
        return output;
      }
    },
    home_city_button: function() {
      return function() {
        var city = this.city, cookie_city = Cache.Cookie.Helpers.readFor("home_city");
        var home_city = city.home_city();
        if ( home_city && home_city['id'] == this.city.id) {
          return ["is-home-city", $("#city-picker-nav").attr("data-is-home")];
        } else {
          return ["set-home-city", $("#city-picker-nav").attr("data-set-home")];
        }
      }
    },
    home_city_button_text: function() {
      var home_city_button = this.home_city_button();
      return function() {
        return home_city_button.call(this)[1];
      }
    },
    home_city_button_css: function() {
      var home_city_button = this.home_city_button();
      return function() {
        return home_city_button.call(this)[0];
      }
    }
  }
  window.stached_render_city_picker = 0;
  var preferred_city = JSON.parse($("#city-picker-template").attr("data-preferred_city"));
  var locale = $("#city-picker-template").attr("data-locale");
  var homeCityText = $("#city-picker-template").attr("data-home-city-text");
  var homeCityPeoplePath = $("#city-picker-template").attr("data-home-city-people-path");

  function loadHomeCityPicker(evt, ctx) {
    var context = {
      city: City,
      me: $.extend(ctx.body, Me, FbMe)
    }
    $("#city-picker-template").replaceWith(Mustache.to_html($("#city-picker-template").html(), context));
    $(".city-picker-placeholder").html($("#city-picker-nav").html()).addClass("city-picker");
    ++stached_render_city_picker;
    setHomeCity = {
      currentCity: preferred_city,
      locale: locale,
      updateHomeCityPeoplePath: homeCityPeoplePath,
      isHomeCityText: homeCityText,
      _init : true,
      init: function() {
        if (this.locale.match(/en|fr|ar/) && setHomeCity._init ) {
          var self = this;
          setHomeCity,_init = false;
          dls.setHomeCity.init(self);
        }
      },
      cookie: function() {
        return JSON.stringify(this.currentCity);
      }
    }
    setHomeCity.init();
  }

  if (Me.loggedIn()()) {
    Stached._bind("url:/me/info.json", loadHomeCityPicker);
  } else {
    loadHomeCityPicker({}, {body: {}});
  }
  //Stached.on("render:city_picker", function(evt) { ++stached_render_city_picker; });
});
;$(function() {
 $($("#deal-buy-box, .deal-buy")[0]).delegate('a.social-share-email', 'click', function() {
  var emailShareURL = $("#deal-buy-email-share-link").attr("data-new-email");
      _gaq.push(['_trackEvent', 'DealShowShare', 'Email']);
      if (Me && Me.loggedIn()()) {
        $.get(emailShareURL, function(html) {
          $.facebox(html, 'email-share-facebox');
        });
      } else {
        document.location.href = emailShareURL;
      }
    });
    if (Me && Me.loggedIn()()) {
      if ($.cookie("popup_share_email") == 'true') {
        $.cookie("popup_share_email", "");
        $.get(emailShareURL, function(html) {
          $.facebox(html, 'email-share-facebox');
        });
      }
    }
  if (window.location.search.indexOf('open_email=1') >= 0) {
    $('.social-share-email').trigger('click');
  }
});
;$(function() {
  dls.deal_pieshare_rendered = false;
  function showMePlusThree(uri, ctx) {
    dls.deal_pieshare_rendered = true;
    if (!window.Deal) { return; }
    var purchaseInfo = ctx.body.purchases_for(Deal.id);
    if (purchaseInfo && purchaseInfo.length > 0) {
      purchaseInfo = purchaseInfo[0];
    }
    // 0: 82895797 -> buyer purchase id 
    // 1: 1 -> how did the buyer purchase
    // 2: 0 -> how many have purchased towards me+3
    if (!purchaseInfo || Deal.me_plus_three_disabled) { return; }

    // has purchased update pie-fill
    $("#deal-share-link a").attr("href", "/deals/" + Deal.id + "/purchases/" + purchaseInfo[0] + "/share");
    if (purchaseInfo[2] > 2) {
      $("#deal-share-link a").html($("#deal-share-link").attr("data-promo-free"));
      $("#deal-pieshare-box .pie-referral").hide();
    }
    $("#deal-share-promo-text").html(Deal.promo_pie_text[purchaseInfo[2]]);
    $("#copy-link").val($("#copy-link").val() + "?rpi=" + purchaseInfo[0] + "&ref=personalized-link-box-" + purchaseInfo[0] + "&rui=" + ctx.body.id());
    $("#deal-pieshare-box .pie-fill").addClass("pie-fill-" + purchaseInfo[2]).show();
  }
  Stached._bind("url:/me/info.json", showMePlusThree);
});
;