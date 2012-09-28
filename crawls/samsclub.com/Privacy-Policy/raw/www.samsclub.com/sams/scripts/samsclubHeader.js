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
/*!
 * jQuery UI 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */(function(a,b){function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;if(!b.href||!g||f.nodeName.toLowerCase()!=="map")return!1;h=a("img[usemap=#"+g+"]")[0];return!!h&&d(h)}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}a.ui=a.ui||{};a.ui.version||(a.extend(a.ui,{version:"1.8.17",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function h(b,c,d,f){a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)});return c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){if(c===b)return g["inner"+d].call(this);return this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){if(typeof b!="number")return g["outer"+d].call(this,b);return this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!!d&&!!a.element[0].parentNode)for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;if(b[d]>0)return!0;b[d]=1,e=b[d]>0,b[d]=0;return e},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}}))})(jQuery);/*!
 * jQuery UI Widget 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}});return d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e;if(f&&e.charAt(0)==="_")return h;f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b){h=f;return!1}}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))});return h}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}this._setOptions(e);return this},_setOptions:function(b){var c=this;a.each(b,function(a,b){c._setOption(a,b)});return this},_setOption:function(a,b){this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b);return this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);this.element.trigger(c,d);return!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);/*!
 * jQuery UI Mouse 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent")){a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation();return!1}}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(b){if(!c){this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted){b.preventDefault();return!0}}!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0;return!0}},_mouseMove:function(b){if(a.browser.msie&&!(document.documentMode>=9)&&!b.button)return this._mouseUp(b);if(this._mouseStarted){this._mouseDrag(b);return b.preventDefault()}this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b));return!this._mouseStarted},_mouseUp:function(b){a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b));return!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);/*
 * jQuery UI Position 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */(function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1];return this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.curCSS(this,"marginLeft",!0))||0,i=parseInt(a.curCSS(this,"marginTop",!0))||0,o=d+h+(parseInt(a.curCSS(this,"marginRight",!0))||0),p=g+i+(parseInt(a.curCSS(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at})}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]!==e){var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0}},top:function(b,c){if(c.at[1]!==e){var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0}}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,h):d.css(h)},a.fn.offset=function(b){var c=this[0];if(!c||!c.ownerDocument)return null;if(b)return this.each(function(){a.offset.setOffset(this,b)});return h.call(this)}),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&jQuery.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g)d.style[j]=g[j];d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22}()})(jQuery);/*
 * jQuery UI Draggable 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */(function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},destroy:function(){if(!!this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy();return this}},_mouseCapture:function(b){var c=this.options;if(this.helper||c.disabled||a(b.target).is(".ui-resizable-handle"))return!1;this.handle=this._getHandle(b);if(!this.handle)return!1;c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")});return!0},_mouseStart:function(b){var c=this.options;this.helper=this._createHelper(b),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment();if(this._trigger("start",b)===!1){this._clear();return!1}this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.helper.addClass("ui-draggable-dragging"),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b);return!0},_mouseDrag:function(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1){this._mouseUp({});return!1}this.position=d.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";a.ui.ddmanager&&a.ui.ddmanager.drag(this,b);return!1},_mouseStop:function(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return!1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var d=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){d._trigger("stop",b)!==!1&&d._clear()})}else this._trigger("stop",b)!==!1&&this._clear();return!1},_mouseUp:function(b){this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b);return a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0)});return c},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute");return d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){var c=a(b.containment),d=c[0];if(!d)return;var e=c.offset(),f=a(d).css("overflow")!="hidden";this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c}else b.containment.constructor==Array&&(this.containment=b.containment)},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){var i=this.relative_container.offset();h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]}else h=this.containment;b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top)}if(c.grid){var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(b,c,d){d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute"));return a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(a){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.extend(a.ui.draggable,{version:"1.8.17"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[],a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f))})},stop:function(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e))})},drag:function(b,c){var d=a(this).data("draggable"),e=this,f=function(b){var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;return a.ui.isOver(e+c,f+d,i,j,g,h)};a.each(d.sortables,function(f){this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0]},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1)})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c){var d=a("body"),e=a(this).data("draggable").options;d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(b,c){var d=a(this).data("draggable");d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset())},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=!1;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed)}else{if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed))}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c){var d=a(this).data("draggable"),e=d.options;d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;for(var k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;continue}if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left)}var t=p||q||r||s;if(e.snapMode!="outer"){var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left)}!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t}}}),a.ui.plugin.add("draggable","stack",{start:function(b,c){var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(!!e.length){var f=parseInt(e[0].style.zIndex)||0;a(e).each(function(a){this.style.zIndex=f+a}),this[0].style.zIndex=f+e.length}}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})})(jQuery);/*
 * jQuery UI Droppable 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */(function(a,b){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var b=this.options,c=b.accept;this.isover=0,this.isout=1,this.accept=a.isFunction(c)?c:function(a){return a.is(c)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},a.ui.ddmanager.droppables[b.scope]=a.ui.ddmanager.droppables[b.scope]||[],a.ui.ddmanager.droppables[b.scope].push(this),b.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){var b=a.ui.ddmanager.droppables[this.options.scope];for(var c=0;c<b.length;c++)b[c]==this&&b.splice(c,1);this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");return this},_setOption:function(b,c){b=="accept"&&(this.accept=a.isFunction(c)?c:function(a){return a.is(c)}),a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),c&&this._trigger("activate",b,this.ui(c))},_deactivate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),c&&this._trigger("deactivate",b,this.ui(c))},_over:function(b){var c=a.ui.ddmanager.current;!!c&&(c.currentItem||c.element)[0]!=this.element[0]&&this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",b,this.ui(c)))},_out:function(b){var c=a.ui.ddmanager.current;!!c&&(c.currentItem||c.element)[0]!=this.element[0]&&this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",b,this.ui(c)))},_drop:function(b,c){var d=c||a.ui.ddmanager.current;if(!d||(d.currentItem||d.element)[0]==this.element[0])return!1;var e=!1;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var b=a.data(this,"droppable");if(b.options.greedy&&!b.options.disabled&&b.options.scope==d.options.scope&&b.accept.call(b.element[0],d.currentItem||d.element)&&a.ui.intersect(d,a.extend(b,{offset:b.element.offset()}),b.options.tolerance)){e=!0;return!1}});if(e)return!1;if(this.accept.call(this.element[0],d.currentItem||d.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",b,this.ui(d));return this.element}return!1},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}}),a.extend(a.ui.droppable,{version:"1.8.17"}),a.ui.intersect=function(b,c,d){if(!c.offset)return!1;var e=(b.positionAbs||b.position.absolute).left,f=e+b.helperProportions.width,g=(b.positionAbs||b.position.absolute).top,h=g+b.helperProportions.height,i=c.offset.left,j=i+c.proportions.width,k=c.offset.top,l=k+c.proportions.height;switch(d){case"fit":return i<=e&&f<=j&&k<=g&&h<=l;case"intersect":return i<e+b.helperProportions.width/2&&f-b.helperProportions.width/2<j&&k<g+b.helperProportions.height/2&&h-b.helperProportions.height/2<l;case"pointer":var m=(b.positionAbs||b.position.absolute).left+(b.clickOffset||b.offset.click).left,n=(b.positionAbs||b.position.absolute).top+(b.clickOffset||b.offset.click).top,o=a.ui.isOver(n,m,k,i,c.proportions.height,c.proportions.width);return o;case"touch":return(g>=k&&g<=l||h>=k&&h<=l||g<k&&h>l)&&(e>=i&&e<=j||f>=i&&f<=j||e<i&&f>j);default:return!1}},a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(b,c){var d=a.ui.ddmanager.droppables[b.options.scope]||[],e=c?c.type:null,f=(b.currentItem||b.element).find(":data(droppable)").andSelf();droppablesLoop:for(var g=0;g<d.length;g++){if(d[g].options.disabled||b&&!d[g].accept.call(d[g].element[0],b.currentItem||b.element))continue;for(var h=0;h<f.length;h++)if(f[h]==d[g].element[0]){d[g].proportions.height=0;continue droppablesLoop}d[g].visible=d[g].element.css("display")!="none";if(!d[g].visible)continue;e=="mousedown"&&d[g]._activate.call(d[g],c),d[g].offset=d[g].element.offset(),d[g].proportions={width:d[g].element[0].offsetWidth,height:d[g].element[0].offsetHeight}}},drop:function(b,c){var d=!1;a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){!this.options||(!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance)&&(d=this._drop.call(this,c)||d),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],b.currentItem||b.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,c)))});return d},dragStart:function(b,c){b.element.parents(":not(body,html)").bind("scroll.droppable",function(){b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)})},drag:function(b,c){b.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(b,c),a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var d=a.ui.intersect(b,this,this.options.tolerance),e=!d&&this.isover==1?"isout":d&&this.isover==0?"isover":null;if(!e)return;var f;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");g.length&&(f=a.data(g[0],"droppable"),f.greedyChild=e=="isover"?1:0)}f&&e=="isover"&&(f.isover=0,f.isout=1,f._out.call(f,c)),this[e]=1,this[e=="isout"?"isover":"isout"]=0,this[e=="isover"?"_over":"_out"].call(this,c),f&&e=="isout"&&(f.isout=0,f.isover=1,f._over.call(f,c))}})},dragStop:function(b,c){b.element.parents(":not(body,html)").unbind("scroll.droppable"),b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)}}})(jQuery);/*
 * jQuery UI Resizable 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */(function(a,b){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var b=this,c=this.options;this.element.addClass("ui-resizable"),a.extend(this,{_aspectRatio:!!c.aspectRatio,aspectRatio:c.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:c.helper||c.ghost||c.animate?c.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(/relative/.test(this.element.css("position"))&&a.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"}),this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=c.handles||(a(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var d=this.handles.split(",");this.handles={};for(var e=0;e<d.length;e++){var f=a.trim(d[e]),g="ui-resizable-"+f,h=a('<div class="ui-resizable-handle '+g+'"></div>');/sw|se|ne|nw/.test(f)&&h.css({zIndex:++c.zIndex}),"se"==f&&h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[f]=".ui-resizable-"+f,this.element.append(h)}}this._renderAxis=function(b){b=b||this.element;for(var c in this.handles){this.handles[c].constructor==String&&(this.handles[c]=a(this.handles[c],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var d=a(this.handles[c],this.element),e=0;e=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth();var f=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join("");b.css(f,e),this._proportionallyResize()}if(!a(this.handles[c]).length)continue}},this._renderAxis(this.element),this._handles=a(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!b.resizing){if(this.className)var a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=a&&a[1]?a[1]:"se"}}),c.autoHide&&(this._handles.hide(),a(this.element).addClass("ui-resizable-autohide").hover(function(){c.disabled||(a(this).removeClass("ui-resizable-autohide"),b._handles.show())},function(){c.disabled||b.resizing||(a(this).addClass("ui-resizable-autohide"),b._handles.hide())})),this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(b){a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var c=this.element;c.after(this.originalElement.css({position:c.css("position"),width:c.outerWidth(),height:c.outerHeight(),top:c.css("top"),left:c.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle),b(this.originalElement);return this},_mouseCapture:function(b){var c=!1;for(var d in this.handles)a(this.handles[d])[0]==b.target&&(c=!0);return!this.options.disabled&&c},_mouseStart:function(b){var d=this.options,e=this.element.position(),f=this.element;this.resizing=!0,this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()},(f.is(".ui-draggable")||/absolute/.test(f.css("position")))&&f.css({position:"absolute",top:e.top,left:e.left}),a.browser.opera&&/relative/.test(f.css("position"))&&f.css({position:"relative",top:"auto",left:"auto"}),this._renderProxy();var g=c(this.helper.css("left")),h=c(this.helper.css("top"));d.containment&&(g+=a(d.containment).scrollLeft()||0,h+=a(d.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:g,top:h},this.size=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalSize=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalPosition={left:g,top:h},this.sizeDiff={width:f.outerWidth()-f.width(),height:f.outerHeight()-f.height()},this.originalMousePosition={left:b.pageX,top:b.pageY},this.aspectRatio=typeof d.aspectRatio=="number"?d.aspectRatio:this.originalSize.width/this.originalSize.height||1;var i=a(".ui-resizable-"+this.axis).css("cursor");a("body").css("cursor",i=="auto"?this.axis+"-resize":i),f.addClass("ui-resizable-resizing"),this._propagate("start",b);return!0},_mouseDrag:function(b){var c=this.helper,d=this.options,e={},f=this,g=this.originalMousePosition,h=this.axis,i=b.pageX-g.left||0,j=b.pageY-g.top||0,k=this._change[h];if(!k)return!1;var l=k.apply(this,[b,i,j]),m=a.browser.msie&&a.browser.version<7,n=this.sizeDiff;this._updateVirtualBoundaries(b.shiftKey);if(this._aspectRatio||b.shiftKey)l=this._updateRatio(l,b);l=this._respectSize(l,b),this._propagate("resize",b),c.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(l),this._trigger("resize",b,this.ui());return!1},_mouseStop:function(b){this.resizing=!1;var c=this.options,d=this;if(this._helper){var e=this._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&a.ui.hasScroll(e[0],"left")?0:d.sizeDiff.height,h=f?0:d.sizeDiff.width,i={width:d.helper.width()-h,height:d.helper.height()-g},j=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,k=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;c.animate||this.element.css(a.extend(i,{top:k,left:j})),d.helper.height(d.size.height),d.helper.width(d.size.width),this._helper&&!c.animate&&this._proportionallyResize()}a("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",b),this._helper&&this.helper.remove();return!1},_updateVirtualBoundaries:function(a){var b=this.options,c,e,f,g,h;h={minWidth:d(b.minWidth)?b.minWidth:0,maxWidth:d(b.maxWidth)?b.maxWidth:Infinity,minHeight:d(b.minHeight)?b.minHeight:0,maxHeight:d(b.maxHeight)?b.maxHeight:Infinity};if(this._aspectRatio||a)c=h.minHeight*this.aspectRatio,f=h.minWidth/this.aspectRatio,e=h.maxHeight*this.aspectRatio,g=h.maxWidth/this.aspectRatio,c>h.minWidth&&(h.minWidth=c),f>h.minHeight&&(h.minHeight=f),e<h.maxWidth&&(h.maxWidth=e),g<h.maxHeight&&(h.maxHeight=g);this._vBoundaries=h},_updateCache:function(a){var b=this.options;this.offset=this.helper.offset(),d(a.left)&&(this.position.left=a.left),d(a.top)&&(this.position.top=a.top),d(a.height)&&(this.size.height=a.height),d(a.width)&&(this.size.width=a.width)},_updateRatio:function(a,b){var c=this.options,e=this.position,f=this.size,g=this.axis;d(a.height)?a.width=a.height*this.aspectRatio:d(a.width)&&(a.height=a.width/this.aspectRatio),g=="sw"&&(a.left=e.left+(f.width-a.width),a.top=null),g=="nw"&&(a.top=e.top+(f.height-a.height),a.left=e.left+(f.width-a.width));return a},_respectSize:function(a,b){var c=this.helper,e=this._vBoundaries,f=this._aspectRatio||b.shiftKey,g=this.axis,h=d(a.width)&&e.maxWidth&&e.maxWidth<a.width,i=d(a.height)&&e.maxHeight&&e.maxHeight<a.height,j=d(a.width)&&e.minWidth&&e.minWidth>a.width,k=d(a.height)&&e.minHeight&&e.minHeight>a.height;j&&(a.width=e.minWidth),k&&(a.height=e.minHeight),h&&(a.width=e.maxWidth),i&&(a.height=e.maxHeight);var l=this.originalPosition.left+this.originalSize.width,m=this.position.top+this.size.height,n=/sw|nw|w/.test(g),o=/nw|ne|n/.test(g);j&&n&&(a.left=l-e.minWidth),h&&n&&(a.left=l-e.maxWidth),k&&o&&(a.top=m-e.minHeight),i&&o&&(a.top=m-e.maxHeight);var p=!a.width&&!a.height;p&&!a.left&&a.top?a.top=null:p&&!a.top&&a.left&&(a.left=null);return a},_proportionallyResize:function(){var b=this.options;if(!!this._proportionallyResizeElements.length){var c=this.helper||this.element;for(var d=0;d<this._proportionallyResizeElements.length;d++){var e=this._proportionallyResizeElements[d];if(!this.borderDif){var f=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],g=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];this.borderDif=a.map(f,function(a,b){var c=parseInt(a,10)||0,d=parseInt(g[b],10)||0;return c+d})}if(a.browser.msie&&(!!a(c).is(":hidden")||!!a(c).parents(":hidden").length))continue;e.css({height:c.height()-this.borderDif[0]-this.borderDif[2]||0,width:c.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var b=this.element,c=this.options;this.elementOffset=b.offset();if(this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var d=a.browser.msie&&a.browser.version<7,e=d?1:0,f=d?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+f,height:this.element.outerHeight()+f,position:"absolute",left:this.elementOffset.left-e+"px",top:this.elementOffset.top-e+"px",zIndex:++c.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(a,b,c){return{width:this.originalSize.width+b}},w:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{left:f.left+b,width:e.width-b}},n:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{top:f.top+c,height:e.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},sw:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]))},ne:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},nw:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]))}},_propagate:function(b,c){a.ui.plugin.call(this,b,[c,this.ui()]),b!="resize"&&this._trigger(b,c,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),a.extend(a.ui.resizable,{version:"1.8.17"}),a.ui.plugin.add("resizable","alsoResize",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=function(b){a(b).each(function(){var b=a(this);b.data("resizable-alsoresize",{width:parseInt(b.width(),10),height:parseInt(b.height(),10),left:parseInt(b.css("left"),10),top:parseInt(b.css("top"),10),position:b.css("position")})})};typeof e.alsoResize=="object"&&!e.alsoResize.parentNode?e.alsoResize.length?(e.alsoResize=e.alsoResize[0],f(e.alsoResize)):a.each(e.alsoResize,function(a){f(a)}):f(e.alsoResize)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.originalSize,g=d.originalPosition,h={height:d.size.height-f.height||0,width:d.size.width-f.width||0,top:d.position.top-g.top||0,left:d.position.left-g.left||0},i=function(b,e){a(b).each(function(){var b=a(this),f=a(this).data("resizable-alsoresize"),g={},i=e&&e.length?e:b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(i,function(a,b){var c=(f[b]||0)+(h[b]||0);c&&c>=0&&(g[b]=c||null)}),a.browser.opera&&/relative/.test(b.css("position"))&&(d._revertToRelativePosition=!0,b.css({position:"absolute",top:"auto",left:"auto"})),b.css(g)})};typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?a.each(e.alsoResize,function(a,b){i(a,b)}):i(e.alsoResize)},stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=function(b){a(b).each(function(){var b=a(this);b.css({position:b.data("resizable-alsoresize").position})})};d._revertToRelativePosition&&(d._revertToRelativePosition=!1,typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?a.each(e.alsoResize,function(a){f(a)}):f(e.alsoResize)),a(this).removeData("resizable-alsoresize")}}),a.ui.plugin.add("resizable","animate",{stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d._proportionallyResizeElements,g=f.length&&/textarea/i.test(f[0].nodeName),h=g&&a.ui.hasScroll(f[0],"left")?0:d.sizeDiff.height,i=g?0:d.sizeDiff.width,j={width:d.size.width-i,height:d.size.height-h},k=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,l=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;d.element.animate(a.extend(j,l&&k?{top:l,left:k}:{}),{duration:e.animateDuration,easing:e.animateEasing,step:function(){var c={width:parseInt(d.element.css("width"),10),height:parseInt(d.element.css("height"),10),top:parseInt(d.element.css("top"),10),left:parseInt(d.element.css("left"),10)};f&&f.length&&a(f[0]).css({width:c.width,height:c.height}),d._updateCache(c),d._propagate("resize",b)}})}}),a.ui.plugin.add("resizable","containment",{start:function(b,d){var e=a(this).data("resizable"),f=e.options,g=e.element,h=f.containment,i=h instanceof a?h.get(0):/parent/.test(h)?g.parent().get(0):h;if(!!i){e.containerElement=a(i);if(/document/.test(h)||h==document)e.containerOffset={left:0,top:0},e.containerPosition={left:0,top:0},e.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight};else{var j=a(i),k=[];a(["Top","Right","Left","Bottom"]).each(function(a,b){k[a]=c(j.css("padding"+b))}),e.containerOffset=j.offset(),e.containerPosition=j.position(),e.containerSize={height:j.innerHeight()-k[3],width:j.innerWidth()-k[1]};var l=e.containerOffset,m=e.containerSize.height,n=e.containerSize.width,o=a.ui.hasScroll(i,"left")?i.scrollWidth:n,p=a.ui.hasScroll(i)?i.scrollHeight:m;e.parentData={element:i,left:l.left,top:l.top,width:o,height:p}}}},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.containerSize,g=d.containerOffset,h=d.size,i=d.position,j=d._aspectRatio||b.shiftKey,k={top:0,left:0},l=d.containerElement;l[0]!=document&&/static/.test(l.css("position"))&&(k=g),i.left<(d._helper?g.left:0)&&(d.size.width=d.size.width+(d._helper?d.position.left-g.left:d.position.left-k.left),j&&(d.size.height=d.size.width/e.aspectRatio),d.position.left=e.helper?g.left:0),i.top<(d._helper?g.top:0)&&(d.size.height=d.size.height+(d._helper?d.position.top-g.top:d.position.top),j&&(d.size.width=d.size.height*e.aspectRatio),d.position.top=d._helper?g.top:0),d.offset.left=d.parentData.left+d.position.left,d.offset.top=d.parentData.top+d.position.top;var m=Math.abs((d._helper?d.offset.left-k.left:d.offset.left-k.left)+d.sizeDiff.width),n=Math.abs((d._helper?d.offset.top-k.top:d.offset.top-g.top)+d.sizeDiff.height),o=d.containerElement.get(0)==d.element.parent().get(0),p=/relative|absolute/.test(d.containerElement.css("position"));o&&p&&(m-=d.parentData.left),m+d.size.width>=d.parentData.width&&(d.size.width=d.parentData.width-m,j&&(d.size.height=d.size.width/d.aspectRatio)),n+d.size.height>=d.parentData.height&&(d.size.height=d.parentData.height-n,j&&(d.size.width=d.size.height*d.aspectRatio))},stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.position,g=d.containerOffset,h=d.containerPosition,i=d.containerElement,j=a(d.helper),k=j.offset(),l=j.outerWidth()-d.sizeDiff.width,m=j.outerHeight()-d.sizeDiff.height;d._helper&&!e.animate&&/relative/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m}),d._helper&&!e.animate&&/static/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m})}}),a.ui.plugin.add("resizable","ghost",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size;d.ghost=d.originalElement.clone(),d.ghost.css({opacity:.25,display:"block",position:"relative",height:f.height,width:f.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof e.ghost=="string"?e.ghost:""),d.ghost.appendTo(d.helper)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.ghost.css({position:"relative",height:d.size.height,width:d.size.width})},stop:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.helper&&d.helper.get(0).removeChild(d.ghost.get(0))}}),a.ui.plugin.add("resizable","grid",{resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size,g=d.originalSize,h=d.originalPosition,i=d.axis,j=e._aspectRatio||b.shiftKey;e.grid=typeof e.grid=="number"?[e.grid,e.grid]:e.grid;var k=Math.round((f.width-g.width)/(e.grid[0]||1))*(e.grid[0]||1),l=Math.round((f.height-g.height)/(e.grid[1]||1))*(e.grid[1]||1);/^(se|s|e)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l):/^(ne)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l):/^(sw)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.left=h.left-k):(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l,d.position.left=h.left-k)}});var c=function(a){return parseInt(a,10)||0},d=function(a){return!isNaN(parseInt(a,10))}})(jQuery);/*
 * jQuery UI Selectable 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */(function(a,b){a.widget("ui.selectable",a.ui.mouse,{options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch"},_create:function(){var b=this;this.element.addClass("ui-selectable"),this.dragged=!1;var c;this.refresh=function(){c=a(b.options.filter,b.element[0]),c.addClass("ui-selectee"),c.each(function(){var b=a(this),c=b.offset();a.data(this,"selectable-item",{element:this,$element:b,left:c.left,top:c.top,right:c.left+b.outerWidth(),bottom:c.top+b.outerHeight(),startselected:!1,selected:b.hasClass("ui-selected"),selecting:b.hasClass("ui-selecting"),unselecting:b.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=c.addClass("ui-selectee"),this._mouseInit(),this.helper=a("<div class='ui-selectable-helper'></div>")},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"),this._mouseDestroy();return this},_mouseStart:function(b){var c=this;this.opos=[b.pageX,b.pageY];if(!this.options.disabled){var d=this.options;this.selectees=a(d.filter,this.element[0]),this._trigger("start",b),a(d.appendTo).append(this.helper),this.helper.css({left:b.clientX,top:b.clientY,width:0,height:0}),d.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var d=a.data(this,"selectable-item");d.startselected=!0,!b.metaKey&&!b.ctrlKey&&(d.$element.removeClass("ui-selected"),d.selected=!1,d.$element.addClass("ui-unselecting"),d.unselecting=!0,c._trigger("unselecting",b,{unselecting:d.element}))}),a(b.target).parents().andSelf().each(function(){var d=a.data(this,"selectable-item");if(d){var e=!b.metaKey&&!b.ctrlKey||!d.$element.hasClass("ui-selected");d.$element.removeClass(e?"ui-unselecting":"ui-selected").addClass(e?"ui-selecting":"ui-unselecting"),d.unselecting=!e,d.selecting=e,d.selected=e,e?c._trigger("selecting",b,{selecting:d.element}):c._trigger("unselecting",b,{unselecting:d.element});return!1}})}},_mouseDrag:function(b){var c=this;this.dragged=!0;if(!this.options.disabled){var d=this.options,e=this.opos[0],f=this.opos[1],g=b.pageX,h=b.pageY;if(e>g){var i=g;g=e,e=i}if(f>h){var i=h;h=f,f=i}this.helper.css({left:e,top:f,width:g-e,height:h-f}),this.selectees.each(function(){var i=a.data(this,"selectable-item");if(!!i&&i.element!=c.element[0]){var j=!1;d.tolerance=="touch"?j=!(i.left>g||i.right<e||i.top>h||i.bottom<f):d.tolerance=="fit"&&(j=i.left>e&&i.right<g&&i.top>f&&i.bottom<h),j?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,c._trigger("selecting",b,{selecting:i.element}))):(i.selecting&&((b.metaKey||b.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),c._trigger("unselecting",b,{unselecting:i.element}))),i.selected&&!b.metaKey&&!b.ctrlKey&&!i.startselected&&(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,c._trigger("unselecting",b,{unselecting:i.element})))}});return!1}},_mouseStop:function(b){var c=this;this.dragged=!1;var d=this.options;a(".ui-unselecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-unselecting"),d.unselecting=!1,d.startselected=!1,c._trigger("unselected",b,{unselected:d.element})}),a(".ui-selecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-selecting").addClass("ui-selected"),d.selecting=!1,d.selected=!0,d.startselected=!0,c._trigger("selected",b,{selected:d.element})}),this._trigger("stop",b),this.helper.remove();return!1}}),a.extend(a.ui.selectable,{version:"1.8.17"})})(jQuery);/*
 * jQuery UI Sortable 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */(function(a,b){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var a=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var a=this.items.length-1;a>=0;a--)this.items[a].item.removeData(this.widgetName+"-item");return this},_setOption:function(b,c){b==="disabled"?(this.options[b]=c,this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")):a.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(b,c){var d=this;if(this.reverting)return!1;if(this.options.disabled||this.options.type=="static")return!1;this._refreshItems(b);var e=null,f=this,g=a(b.target).parents().each(function(){if(a.data(this,d.widgetName+"-item")==f){e=a(this);return!1}});a.data(b.target,d.widgetName+"-item")==f&&(e=a(b.target));if(!e)return!1;if(this.options.handle&&!c){var h=!1;a(this.options.handle,e).find("*").andSelf().each(function(){this==b.target&&(h=!0)});if(!h)return!1}this.currentItem=e,this._removeCurrentsFromItems();return!0},_mouseStart:function(b,c,d){var e=this.options,f=this;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(b),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),e.containment&&this._setContainment(),e.cursor&&(a("body").css("cursor")&&(this._storedCursor=a("body").css("cursor")),a("body").css("cursor",e.cursor)),e.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",e.opacity)),e.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",e.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",b,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!d)for(var g=this.containers.length-1;g>=0;g--)this.containers[g]._trigger("activate",b,f._uiHash(this));a.ui.ddmanager&&(a.ui.ddmanager.current=this),a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(b);return!0},_mouseDrag:function(b){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var c=this.options,d=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-b.pageY<c.scrollSensitivity?this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop+c.scrollSpeed:b.pageY-this.overflowOffset.top<c.scrollSensitivity&&(this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop-c.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-b.pageX<c.scrollSensitivity?this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft+c.scrollSpeed:b.pageX-this.overflowOffset.left<c.scrollSensitivity&&(this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft-c.scrollSpeed)):(b.pageY-a(document).scrollTop()<c.scrollSensitivity?d=a(document).scrollTop(a(document).scrollTop()-c.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<c.scrollSensitivity&&(d=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed)),b.pageX-a(document).scrollLeft()<c.scrollSensitivity?d=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<c.scrollSensitivity&&(d=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed))),d!==!1&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var e=this.items.length-1;e>=0;e--){var f=this.items[e],g=f.item[0],h=this._intersectsWithPointer(f);if(!h)continue;if(g!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=g&&!a.ui.contains(this.placeholder[0],g)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],g):!0)){this.direction=h==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(f))this._rearrange(b,f);else break;this._trigger("change",b,this._uiHash());break}}this._contactContainers(b),a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),this._trigger("sort",b,this._uiHash()),this.lastPositionAbs=this.positionAbs;return!1},_mouseStop:function(b,c){if(!!b){a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,b);if(this.options.revert){var d=this,e=d.placeholder.offset();d.reverting=!0,a(this.helper).animate({left:e.left-this.offset.parent.left-d.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-d.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){d._clear(b)})}else this._clear(b,c);return!1}},cancel:function(){var b=this;if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("deactivate",null,b._uiHash(this)),this.containers[c].containerCache.over&&(this.containers[c]._trigger("out",null,b._uiHash(this)),this.containers[c].containerCache.over=0)}this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),a.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem));return this},serialize:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];b=b||{},a(c).each(function(){var c=(a(b.item||this).attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/);c&&d.push((b.key||c[1]+"[]")+"="+(b.key&&b.expression?c[1]:c[2]))}),!d.length&&b.key&&d.push(b.key+"=");return d.join("&")},toArray:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];b=b||{},c.each(function(){d.push(a(b.item||this).attr(b.attribute||"id")||"")});return d},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,d=this.positionAbs.top,e=d+this.helperProportions.height,f=a.left,g=f+a.width,h=a.top,i=h+a.height,j=this.offset.click.top,k=this.offset.click.left,l=d+j>h&&d+j<i&&b+k>f&&b+k<g;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?l:f<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<g&&h<d+this.helperProportions.height/2&&e-this.helperProportions.height/2<i},_intersectsWithPointer:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top,b.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left,b.width),e=c&&d,f=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();if(!e)return!1;return this.floating?g&&g=="right"||f=="down"?2:1:f&&(f=="down"?2:1)},_intersectsWithSides:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top+b.height/2,b.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left+b.width/2,b.width),e=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();return this.floating&&f?f=="right"&&d||f=="left"&&!d:e&&(e=="down"&&c||e=="up"&&!c)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){this._refreshItems(a),this.refreshPositions();return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(b){var c=this,d=[],e=[],f=this._connectWith();if(f&&b)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&e.push([a.isFunction(j.options.items)?j.options.items.call(j.element):a(j.options.items,j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),j])}}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var g=e.length-1;g>=0;g--)e[g][0].each(function(){d.push(this)});return a(d)},_removeCurrentsFromItems:function(){var a=this.currentItem.find(":data("+this.widgetName+"-item)");for(var b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(b){this.items=[],this.containers=[this];var c=this.items,d=this,e=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]],f=this._connectWith();if(f)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&(e.push([a.isFunction(j.options.items)?j.options.items.call(j.element[0],b,{item:this.currentItem}):a(j.options.items,j.element),j]),this.containers.push(j))}}for(var g=e.length-1;g>=0;g--){var k=e[g][1],l=e[g][0];for(var i=0,m=l.length;i<m;i++){var n=a(l[i]);n.data(this.widgetName+"-item",k),c.push({item:n,instance:k,width:0,height:0,left:0,top:0})}}},refreshPositions:function(b){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var c=this.items.length-1;c>=0;c--){var d=this.items[c];if(d.instance!=this.currentContainer&&this.currentContainer&&d.item[0]!=this.currentItem[0])continue;var e=this.options.toleranceElement?a(this.options.toleranceElement,d.item):d.item;b||(d.width=e.outerWidth(),d.height=e.outerHeight());var f=e.offset();d.left=f.left,d.top=f.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var c=this.containers.length-1;c>=0;c--){var f=this.containers[c].element.offset();this.containers[c].containerCache.left=f.left,this.containers[c].containerCache.top=f.top,this.containers[c].containerCache.width=this.containers[c].element.outerWidth(),this.containers[c].containerCache.height=this.containers[c].element.outerHeight()}return this},_createPlaceholder:function(b){var c=b||this,d=c.options;if(!d.placeholder||d.placeholder.constructor==String){var e=d.placeholder;d.placeholder={element:function(){var b=a(document.createElement(c.currentItem[0].nodeName)).addClass(e||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];e||(b.style.visibility="hidden");return b},update:function(a,b){if(!e||!!d.forcePlaceholderSize)b.height()||b.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10)),b.width()||b.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||0,10))}}}c.placeholder=a(d.placeholder.element.call(c.element,c.currentItem)),c.currentItem.after(c.placeholder),d.placeholder.update(c,c.placeholder)},_contactContainers:function(b){var c=null,d=null;for(var e=this.containers.length-1;e>=0;e--){if(a.ui.contains(this.currentItem[0],this.containers[e].element[0]))continue;if(this._intersectsWith(this.containers[e].containerCache)){if(c&&a.ui.contains(this.containers[e].element[0],c.element[0]))continue;c=this.containers[e],d=e}else this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",b,this._uiHash(this)),this.containers[e].containerCache.over=0)}if(!!c)if(this.containers.length===1)this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1;else if(this.currentContainer!=this.containers[d]){var f=1e4,g=null,h=this.positionAbs[this.containers[d].floating?"left":"top"];for(var i=this.items.length-1;i>=0;i--){if(!a.ui.contains(this.containers[d].element[0],this.items[i].item[0]))continue;var j=this.items[i][this.containers[d].floating?"left":"top"];Math.abs(j-h)<f&&(f=Math.abs(j-h),g=this.items[i])}if(!g&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[d],g?this._rearrange(b,g,null,!0):this._rearrange(b,null,this.containers[d].element,!0),this._trigger("change",b,this._uiHash()),this.containers[d]._trigger("change",b,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1}},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem;d.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(d[0]),d[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(d[0].style.width==""||c.forceHelperSize)&&d.width(this.currentItem.width()),(d[0].style.height==""||c.forceHelperSize)&&d.height(this.currentItem.height());return d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)){var c=a(b.containment)[0],d=a(b.containment).offset(),e=a(c).css("overflow")!="hidden";this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var f=b.pageX,g=b.pageY;if(this.originalPosition){this.containment&&(b.pageX-this.offset.click.left<this.containment[0]&&(f=this.containment[0]+this.offset.click.left),b.pageY-this.offset.click.top<this.containment[1]&&(g=this.containment[1]+this.offset.click.top),b.pageX-this.offset.click.left>this.containment[2]&&(f=this.containment[2]+this.offset.click.left),b.pageY-this.offset.click.top>this.containment[3]&&(g=this.containment[3]+this.offset.click.top));if(c.grid){var h=this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1];g=this.containment?h-this.offset.click.top<this.containment[1]||h-this.offset.click.top>this.containment[3]?h-this.offset.click.top<this.containment[1]?h+c.grid[1]:h-c.grid[1]:h:h;var i=this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0];f=this.containment?i-this.offset.click.left<this.containment[0]||i-this.offset.click.left>this.containment[2]?i-this.offset.click.left<this.containment[0]?i+c.grid[0]:i-c.grid[0]:i:i}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_rearrange:function(a,b,c,d){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var e=this,f=this.counter;window.setTimeout(function(){f==e.counter&&e.refreshPositions(!d)},0)},_clear:function(b,c){this.reverting=!1;var d=[],e=this;!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var f in this._storedCSS)if(this._storedCSS[f]=="auto"||this._storedCSS[f]=="static")this._storedCSS[f]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!c&&d.push(function(a){this._trigger("receive",a,this._uiHash(this.fromOutside))}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!c&&d.push(function(a){this._trigger("update",a,this._uiHash())});if(!a.ui.contains(this.element[0],this.currentItem[0])){c||d.push(function(a){this._trigger("remove",a,this._uiHash())});for(var f=this.containers.length-1;f>=0;f--)a.ui.contains(this.containers[f].element[0],this.currentItem[0])&&!c&&(d.push(function(a){return function(b){a._trigger("receive",b,this._uiHash(this))}}.call(this,this.containers[f])),d.push(function(a){return function(b){a._trigger("update",b,this._uiHash(this))}}.call(this,this.containers[f])))}for(var f=this.containers.length-1;f>=0;f--)c||d.push(function(a){return function(b){a._trigger("deactivate",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over&&(d.push(function(a){return function(b){a._trigger("out",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over=0);this._storedCursor&&a("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!c){this._trigger("beforeStop",b,this._uiHash());for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}return!1}c||this._trigger("beforeStop",b,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!c){for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}this.fromOutside=!1;return!0},_trigger:function(){a.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(b){var c=b||this;return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:b?b.element:null}}}),a.extend(a.ui.sortable,{version:"1.8.17"})})(jQuery);/*
 * jQuery UI Accordion 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */(function(a,b){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:!0,clearStyle:!1,collapsible:!1,event:"click",fillSpace:!1,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var b=this,c=b.options;b.running=0,b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"),b.headers=b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){c.disabled||a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){c.disabled||a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){c.disabled||a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){c.disabled||a(this).removeClass("ui-state-focus")}),b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");if(c.navigation){var d=b.element.find("a").filter(c.navigationFilter).eq(0);if(d.length){var e=d.closest(".ui-accordion-header");e.length?b.active=e:b.active=d.closest(".ui-accordion-content").prev()}}b.active=b._findActive(b.active||c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"),b.active.next().addClass("ui-accordion-content-active"),b._createIcons(),b.resize(),b.element.attr("role","tablist"),b.headers.attr("role","tab").bind("keydown.accordion",function(a){return b._keydown(a)}).next().attr("role","tabpanel"),b.headers.not(b.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide(),b.active.length?b.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):b.headers.eq(0).attr("tabIndex",0),a.browser.safari||b.headers.find("a").attr("tabIndex",-1),c.event&&b.headers.bind(c.event.split(" ").join(".accordion ")+".accordion",function(a){b._clickHandler.call(b,a,this),a.preventDefault()})},_createIcons:function(){var b=this.options;b.icons&&(a("<span></span>").addClass("ui-icon "+b.icons.header).prependTo(this.headers),this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected),this.element.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.children(".ui-icon").remove(),this.element.removeClass("ui-accordion-icons")},destroy:function(){var b=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"),this.headers.find("a").removeAttr("tabIndex"),this._destroyIcons();var c=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");(b.autoHeight||b.fillHeight)&&c.css("height","");return a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b=="active"&&this.activate(c),b=="icons"&&(this._destroyIcons(),c&&this._createIcons()),b=="disabled"&&this.headers.add(this.headers.next())[c?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(b){if(!(this.options.disabled||b.altKey||b.ctrlKey)){var c=a.ui.keyCode,d=this.headers.length,e=this.headers.index(b.target),f=!1;switch(b.keyCode){case c.RIGHT:case c.DOWN:f=this.headers[(e+1)%d];break;case c.LEFT:case c.UP:f=this.headers[(e-1+d)%d];break;case c.SPACE:case c.ENTER:this._clickHandler({target:b.target},b.target),b.preventDefault()}if(f){a(b.target).attr("tabIndex",-1),a(f).attr("tabIndex",0),f.focus();return!1}return!0}},resize:function(){var b=this.options,c;if(b.fillSpace){if(a.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}c=this.element.parent().height(),a.browser.msie&&this.element.parent().css("overflow",d),this.headers.each(function(){c-=a(this).outerHeight(!0)}),this.headers.next().each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")}else b.autoHeight&&(c=0,this.headers.next().each(function(){c=Math.max(c,a(this).height("").height())}).height(c));return this},activate:function(a){this.options.active=a;var b=this._findActive(a)[0];this._clickHandler({target:b},b);return this},_findActive:function(b){return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===!1?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(b,c){var d=this.options;if(!d.disabled){if(!b.target){if(!d.collapsible)return;this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),this.active.next().addClass("ui-accordion-content-active");var e=this.active.next(),f={options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:e},g=this.active=a([]);this._toggle(g,e,f);return}var h=a(b.currentTarget||c),i=h[0]===this.active[0];d.active=d.collapsible&&i?!1:this.headers.index(h);if(this.running||!d.collapsible&&i)return;var j=this.active,g=h.next(),e=this.active.next(),f={options:d,newHeader:i&&d.collapsible?a([]):h,oldHeader:this.active,newContent:i&&d.collapsible?a([]):g,oldContent:e},k=this.headers.index(this.active[0])>this.headers.index(h[0]);this.active=i?a([]):h,this._toggle(g,e,f,i,k),j.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),i||(h.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected),h.next().addClass("ui-accordion-content-active"));return}},_toggle:function(b,c,d,e,f){var g=this,h=g.options;g.toShow=b,g.toHide=c,g.data=d;var i=function(){if(!!g)return g._completed.apply(g,arguments)};g._trigger("changestart",null,g.data),g.running=c.size()===0?b.size():c.size();if(h.animated){var j={};h.collapsible&&e?j={toShow:a([]),toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace}:j={toShow:b,toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace},h.proxied||(h.proxied=h.animated),h.proxiedDuration||(h.proxiedDuration=h.duration),h.animated=a.isFunction(h.proxied)?h.proxied(j):h.proxied,h.duration=a.isFunction(h.proxiedDuration)?h.proxiedDuration(j):h.proxiedDuration;var k=a.ui.accordion.animations,l=h.duration,m=h.animated;m&&!k[m]&&!a.easing[m]&&(m="slide"),k[m]||(k[m]=function(a){this.slide(a,{easing:m,duration:l||700})}),k[m](j)}else h.collapsible&&e?b.toggle():(c.hide(),b.show()),i(!0);c.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur(),b.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;this.running||(this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""}),this.toHide.removeClass("ui-accordion-content-active"),this.toHide.length&&(this.toHide.parent()[0].className=this.toHide.parent()[0].className),this._trigger("change",null,this.data))}}),a.extend(a.ui.accordion,{version:"1.8.17",animations:{slide:function(b,c){b=a.extend({easing:"swing",duration:300},b,c);if(!b.toHide.size())b.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},b);else{if(!b.toShow.size()){b.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},b);return}var d=b.toShow.css("overflow"),e=0,f={},g={},h=["height","paddingTop","paddingBottom"],i,j=b.toShow;i=j[0].style.width,j.width(j.parent().width()-parseFloat(j.css("paddingLeft"))-parseFloat(j.css("paddingRight"))-(parseFloat(j.css("borderLeftWidth"))||0)-(parseFloat(j.css("borderRightWidth"))||0)),a.each(h,function(c,d){g[d]="hide";var e=(""+a.css(b.toShow[0],d)).match(/^([\d+-.]+)(.*)$/);f[d]={value:e[1],unit:e[2]||"px"}}),b.toShow.css({height:0,overflow:"hidden"}).show(),b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g,{step:function(a,c){c.prop=="height"&&(e=c.end-c.start===0?0:(c.now-c.start)/(c.end-c.start)),b.toShow[0].style[c.prop]=e*f[c.prop].value+f[c.prop].unit},duration:b.duration,easing:b.easing,complete:function(){b.autoHeight||b.toShow.css("height",""),b.toShow.css({width:i,overflow:d}),b.complete()}})}},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1e3:200})}}})})(jQuery);/*
 * jQuery UI Autocomplete 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */(function(a,b){var c=0;a.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var b=this,c=this.element[0].ownerDocument,d;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(!b.options.disabled&&!b.element.propAttr("readOnly")){d=!1;var e=a.ui.keyCode;switch(c.keyCode){case e.PAGE_UP:b._move("previousPage",c);break;case e.PAGE_DOWN:b._move("nextPage",c);break;case e.UP:b._move("previous",c),c.preventDefault();break;case e.DOWN:b._move("next",c),c.preventDefault();break;case e.ENTER:case e.NUMPAD_ENTER:b.menu.active&&(d=!0,c.preventDefault());case e.TAB:if(!b.menu.active)return;b.menu.select(c);break;case e.ESCAPE:b.element.val(b.term),b.close(c);break;default:clearTimeout(b.searching),b.searching=setTimeout(function(){b.term!=b.element.val()&&(b.selectedItem=null,b.search(null,c))},b.options.delay)}}}).bind("keypress.autocomplete",function(a){d&&(d=!1,a.preventDefault())}).bind("focus.autocomplete",function(){b.options.disabled||(b.selectedItem=null,b.previous=b.element.val())}).bind("blur.autocomplete",function(a){b.options.disabled||(clearTimeout(b.searching),b.closing=setTimeout(function(){b.close(a),b._change(a)},150))}),this._initSource(),this.response=function(){return b._response.apply(b,arguments)},this.menu=a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo||"body",c)[0]).mousedown(function(c){var d=b.menu.element[0];a(c.target).closest(".ui-menu-item").length||setTimeout(function(){a(document).one("mousedown",function(c){c.target!==b.element[0]&&c.target!==d&&!a.ui.contains(d,c.target)&&b.close()})},1),setTimeout(function(){clearTimeout(b.closing)},13)}).menu({focus:function(a,c){var d=c.item.data("item.autocomplete");!1!==b._trigger("focus",a,{item:d})&&/^key/.test(a.originalEvent.type)&&b.element.val(d.value)},selected:function(a,d){var e=d.item.data("item.autocomplete"),f=b.previous;b.element[0]!==c.activeElement&&(b.element.focus(),b.previous=f,setTimeout(function(){b.previous=f,b.selectedItem=e},1)),!1!==b._trigger("select",a,{item:e})&&b.element.val(e.value),b.term=b.element.val(),b.close(a),b.selectedItem=e},blur:function(a,c){b.menu.element.is(":visible")&&b.element.val()!==b.term&&b.element.val(b.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu"),a.fn.bgiframe&&this.menu.element.bgiframe(),b.beforeunloadHandler=function(){b.element.removeAttr("autocomplete")},a(window).bind("beforeunload",b.beforeunloadHandler)},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"),this.menu.element.remove(),a(window).unbind("beforeunload",this.beforeunloadHandler),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b==="source"&&this._initSource(),b==="appendTo"&&this.menu.element.appendTo(a(c||"body",this.element[0].ownerDocument)[0]),b==="disabled"&&c&&this.xhr&&this.xhr.abort()},_initSource:function(){var b=this,d,e;a.isArray(this.options.source)?(d=this.options.source,this.source=function(b,c){c(a.ui.autocomplete.filter(d,b.term))}):typeof this.options.source=="string"?(e=this.options.source,this.source=function(d,f){b.xhr&&b.xhr.abort(),b.xhr=a.ajax({url:e,data:d,dataType:"json",autocompleteRequest:++c,success:function(a,b){this.autocompleteRequest===c&&f(a)},error:function(){this.autocompleteRequest===c&&f([])}})}):this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val(),this.term=this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search",b)!==!1)return this._search(a)},_search:function(a){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.source({term:a},this.response)},_response:function(a){!this.options.disabled&&a&&a.length?(a=this._normalize(a),this._suggest(a),this._trigger("open")):this.close(),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},close:function(a){clearTimeout(this.closing),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.deactivate(),this._trigger("close",a))},_change:function(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(b){if(b.length&&b[0].label&&b[0].value)return b;return a.map(b,function(b){if(typeof b=="string")return{label:b,value:b};return a.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(b){var c=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(c,b),this.menu.deactivate(),this.menu.refresh(),c.show(),this._resizeMenu(),c.position(a.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(new a.Event("mouseover"))},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(b,c){var d=this;a.each(c,function(a,c){d._renderItem(b,c)})},_renderItem:function(b,c){return a("<li></li>").data("item.autocomplete",c).append(a("<a></a>").text(c.label)).appendTo(b)},_move:function(a,b){if(!this.menu.element.is(":visible"))this.search(null,b);else{if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term),this.menu.deactivate();return}this.menu[a](b)}},widget:function(){return this.menu.element}}),a.extend(a.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(b,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return d.test(a.label||a.value||a)})}})})(jQuery),function(a){a.widget("ui.menu",{_create:function(){var b=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){!a(c.target).closest(".ui-menu-item a").length||(c.preventDefault(),b.select(c))}),this.refresh()},refresh:function(){var b=this,c=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");c.children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(c){b.activate(c,a(this).parent())}).mouseleave(function(){b.deactivate()})},activate:function(a,b){this.deactivate();if(this.hasScroll()){var c=b.offset().top-this.element.offset().top,d=this.element.scrollTop(),e=this.element.height();c<0?this.element.scrollTop(d+c):c>=e&&this.element.scrollTop(d+c-e+b.height())}this.active=b.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end(),this._trigger("focus",a,{item:b})},deactivate:function(){!this.active||(this.active.children("a").removeClass("ui-state-hover").removeAttr("id"),this._trigger("blur"),this.active=null)},next:function(a){this.move("next",".ui-menu-item:first",a)},previous:function(a){this.move("prev",".ui-menu-item:last",a)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(a,b,c){if(!this.active)this.activate(c,this.element.children(b));else{var d=this.active[a+"All"](".ui-menu-item").eq(0);d.length?this.activate(c,d):this.activate(c,this.element.children(b))}},nextPage:function(b){if(this.hasScroll()){if(!this.active||this.last()){this.activate(b,this.element.children(".ui-menu-item:first"));return}var c=this.active.offset().top,d=this.element.height(),e=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c-d+a(this).height();return b<10&&b>-10});e.length||(e=this.element.children(".ui-menu-item:last")),this.activate(b,e)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))},previousPage:function(b){if(this.hasScroll()){if(!this.active||this.first()){this.activate(b,this.element.children(".ui-menu-item:last"));return}var c=this.active.offset().top,d=this.element.height();result=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c+d-a(this).height();return b<10&&b>-10}),result.length||(result=this.element.children(".ui-menu-item:first")),this.activate(b,result)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element[a.fn.prop?"prop":"attr"]("scrollHeight")},select:function(a){this._trigger("selected",a,{item:this.active})}})}(jQuery);/*
 * jQuery UI Button 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */(function(a,b){var c,d,e,f,g="ui-button ui-widget ui-state-default ui-corner-all",h="ui-state-hover ui-state-active ",i="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",j=function(){var b=a(this).find(":ui-button");setTimeout(function(){b.button("refresh")},1)},k=function(b){var c=b.name,d=b.form,e=a([]);c&&(d?e=a(d).find("[name='"+c+"']"):e=a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form}));return e};a.widget("ui.button",{options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",j),typeof this.options.disabled!="boolean"&&(this.options.disabled=this.element.propAttr("disabled")),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var b=this,h=this.options,i=this.type==="checkbox"||this.type==="radio",l="ui-state-hover"+(i?"":" ui-state-active"),m="ui-state-focus";h.label===null&&(h.label=this.buttonElement.html()),this.element.is(":disabled")&&(h.disabled=!0),this.buttonElement.addClass(g).attr("role","button").bind("mouseenter.button",function(){h.disabled||(a(this).addClass("ui-state-hover"),this===c&&a(this).addClass("ui-state-active"))}).bind("mouseleave.button",function(){h.disabled||a(this).removeClass(l)}).bind("click.button",function(a){h.disabled&&(a.preventDefault(),a.stopImmediatePropagation())}),this.element.bind("focus.button",function(){b.buttonElement.addClass(m)}).bind("blur.button",function(){b.buttonElement.removeClass(m)}),i&&(this.element.bind("change.button",function(){f||b.refresh()}),this.buttonElement.bind("mousedown.button",function(a){h.disabled||(f=!1,d=a.pageX,e=a.pageY)}).bind("mouseup.button",function(a){!h.disabled&&(d!==a.pageX||e!==a.pageY)&&(f=!0)})),this.type==="checkbox"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).toggleClass("ui-state-active"),b.buttonElement.attr("aria-pressed",b.element[0].checked)}):this.type==="radio"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).addClass("ui-state-active"),b.buttonElement.attr("aria-pressed","true");var c=b.element[0];k(c).not(c).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown.button",function(){if(h.disabled)return!1;a(this).addClass("ui-state-active"),c=this,a(document).one("mouseup",function(){c=null})}).bind("mouseup.button",function(){if(h.disabled)return!1;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(b){if(h.disabled)return!1;(b.keyCode==a.ui.keyCode.SPACE||b.keyCode==a.ui.keyCode.ENTER)&&a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(b){b.keyCode===a.ui.keyCode.SPACE&&a(this).click()})),this._setOption("disabled",h.disabled),this._resetButton()},_determineButtonType:function(){this.element.is(":checkbox")?this.type="checkbox":this.element.is(":radio")?this.type="radio":this.element.is("input")?this.type="input":this.type="button";if(this.type==="checkbox"||this.type==="radio"){var a=this.element.parents().filter(":last"),b="label[for='"+this.element.attr("id")+"']";this.buttonElement=a.find(b),this.buttonElement.length||(a=a.length?a.siblings():this.element.siblings(),this.buttonElement=a.filter(b),this.buttonElement.length||(this.buttonElement=a.find(b))),this.element.addClass("ui-helper-hidden-accessible");var c=this.element.is(":checked");c&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.attr("aria-pressed",c)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(g+" "+h+" "+i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title"),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);b==="disabled"?c?this.element.propAttr("disabled",!0):this.element.propAttr("disabled",!1):this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b),this.type==="radio"?k(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):this.type==="checkbox"&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass(i),c=a("<span></span>",this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary,f=[];d.primary||d.secondary?(this.options.text&&f.push("ui-button-text-icon"+(e?"s":d.primary?"-primary":"-secondary")),d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>"),d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>"),this.options.text||(f.push(e?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||b.attr("title",c))):f.push("ui-button-text-only"),b.addClass(f.join(" "))}}}),a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c),a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){var b=this.element.css("direction")==="rtl";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(b?"ui-corner-left":"ui-corner-right").end().end()},destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"),a.Widget.prototype.destroy.call(this)}})})(jQuery);/*
 * jQuery UI Dialog 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */(function(a,b){var c="ui-dialog ui-widget ui-widget-content ui-corner-all ",d={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},e={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},f=a.attrFn||{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0,click:!0};a.widget("ui.dialog",{options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;var b=this,d=b.options,e=d.title||"&#160;",f=a.ui.dialog.getTitleId(b.element),g=(b.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass(c+d.dialogClass).css({zIndex:d.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(c){d.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}).attr({role:"dialog","aria-labelledby":f}).mousedown(function(a){b.moveToTop(!1,a)}),h=b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),i=(b.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),j=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){j.addClass("ui-state-hover")},function(){j.removeClass("ui-state-hover")}).focus(function(){j.addClass("ui-state-focus")}).blur(function(){j.removeClass("ui-state-focus")}).click(function(a){b.close(a);return!1}).appendTo(i),k=(b.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),l=a("<span></span>").addClass("ui-dialog-title").attr("id",f).html(e).prependTo(i);a.isFunction(d.beforeclose)&&!a.isFunction(d.beforeClose)&&(d.beforeClose=d.beforeclose),i.find("*").add(i).disableSelection(),d.draggable&&a.fn.draggable&&b._makeDraggable(),d.resizable&&a.fn.resizable&&b._makeResizable(),b._createButtons(d.buttons),b._isOpen=!1,a.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy(),a.uiDialog.hide(),a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),a.uiDialog.remove(),a.originalTitle&&a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(b){var c=this,d,e;if(!1!==c._trigger("beforeClose",b)){c.overlay&&c.overlay.destroy(),c.uiDialog.unbind("keypress.ui-dialog"),c._isOpen=!1,c.options.hide?c.uiDialog.hide(c.options.hide,function(){c._trigger("close",b)}):(c.uiDialog.hide(),c._trigger("close",b)),a.ui.dialog.overlay.resize(),c.options.modal&&(d=0,a(".ui-dialog").each(function(){this!==c.uiDialog[0]&&(e=a(this).css("z-index"),isNaN(e)||(d=Math.max(d,e)))}),a.ui.dialog.maxZ=d);return c}},isOpen:function(){return this._isOpen},moveToTop:function(b,c){var d=this,e=d.options,f;if(e.modal&&!b||!e.stack&&!e.modal)return d._trigger("focus",c);e.zIndex>a.ui.dialog.maxZ&&(a.ui.dialog.maxZ=e.zIndex),d.overlay&&(a.ui.dialog.maxZ+=1,d.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)),f={scrollTop:d.element.scrollTop(),scrollLeft:d.element.scrollLeft()},a.ui.dialog.maxZ+=1,d.uiDialog.css("z-index",a.ui.dialog.maxZ),d.element.attr(f),d._trigger("focus",c);return d},open:function(){if(!this._isOpen){var b=this,c=b.options,d=b.uiDialog;b.overlay=c.modal?new a.ui.dialog.overlay(b):null,b._size(),b._position(c.position),d.show(c.show),b.moveToTop(!0),c.modal&&d.bind("keydown.ui-dialog",function(b){if(b.keyCode===a.ui.keyCode.TAB){var c=a(":tabbable",this),d=c.filter(":first"),e=c.filter(":last");if(b.target===e[0]&&!b.shiftKey){d.focus(1);return!1}if(b.target===d[0]&&b.shiftKey){e.focus(1);return!1}}}),a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(),b._isOpen=!0,b._trigger("open");return b}},_createButtons:function(b){var c=this,d=!1,e=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);c.uiDialog.find(".ui-dialog-buttonpane").remove(),typeof b=="object"&&b!==null&&a.each(b,function(){return!(d=!0)}),d&&(a.each(b,function(b,d){d=a.isFunction(d)?{click:d,text:b}:d;var e=a('<button type="button"></button>').click(function(){d.click.apply(c.element[0],arguments)}).appendTo(g);a.each(d,function(a,b){a!=="click"&&(a in f?e[a](b):e.attr(a,b))}),a.fn.button&&e.button()}),e.appendTo(c.uiDialog))},_makeDraggable:function(){function f(a){return{position:a.position,offset:a.offset}}var b=this,c=b.options,d=a(document),e;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(d,g){e=c.height==="auto"?"auto":a(this).height(),a(this).height(a(this).height()).addClass("ui-dialog-dragging"),b._trigger("dragStart",d,f(g))},drag:function(a,c){b._trigger("drag",a,f(c))},stop:function(g,h){c.position=[h.position.left-d.scrollLeft(),h.position.top-d.scrollTop()],a(this).removeClass("ui-dialog-dragging").height(e),b._trigger("dragStop",g,f(h)),a.ui.dialog.overlay.resize()}})},_makeResizable:function(c){function h(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}c=c===b?this.options.resizable:c;var d=this,e=d.options,f=d.uiDialog.css("position"),g=typeof c=="string"?c:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:g,start:function(b,c){a(this).addClass("ui-dialog-resizing"),d._trigger("resizeStart",b,h(c))},resize:function(a,b){d._trigger("resize",a,h(b))},stop:function(b,c){a(this).removeClass("ui-dialog-resizing"),e.height=a(this).height(),e.width=a(this).width(),d._trigger("resizeStop",b,h(c)),a.ui.dialog.overlay.resize()}}).css("position",f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(b){var c=[],d=[0,0],e;if(b){if(typeof b=="string"||typeof b=="object"&&"0"in b)c=b.split?b.split(" "):[b[0],b[1]],c.length===1&&(c[1]=c[0]),a.each(["left","top"],function(a,b){+c[a]===c[a]&&(d[a]=c[a],c[a]=b)}),b={my:c.join(" "),at:c.join(" "),offset:d.join(" ")};b=a.extend({},a.ui.dialog.prototype.options.position,b)}else b=a.ui.dialog.prototype.options.position;e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},b)),e||this.uiDialog.hide()},_setOptions:function(b){var c=this,f={},g=!1;a.each(b,function(a,b){c._setOption(a,b),a in d&&(g=!0),a in e&&(f[a]=b)}),g&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",f)},_setOption:function(b,d){var e=this,f=e.uiDialog;switch(b){case"beforeclose":b="beforeClose";break;case"buttons":e._createButtons(d);break;case"closeText":e.uiDialogTitlebarCloseText.text(""+d);break;case"dialogClass":f.removeClass(e.options.dialogClass).addClass(c+d);break;case"disabled":d?f.addClass("ui-dialog-disabled"):f.removeClass("ui-dialog-disabled");break;case"draggable":var g=f.is(":data(draggable)");g&&!d&&f.draggable("destroy"),!g&&d&&e._makeDraggable();break;case"position":e._position(d);break;case"resizable":var h=f.is(":data(resizable)");h&&!d&&f.resizable("destroy"),h&&typeof d=="string"&&f.resizable("option","handles",d),!h&&d!==!1&&e._makeResizable(d);break;case"title":a(".ui-dialog-title",e.uiDialogTitlebar).html(""+(d||"&#160;"))}a.Widget.prototype._setOption.apply(e,arguments)},_size:function(){var b=this.options,c,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),b.minWidth>b.width&&(b.width=b.minWidth),c=this.uiDialog.css({height:"auto",width:b.width}).height(),d=Math.max(0,b.minHeight-c);if(b.height==="auto")if(a.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();var f=this.element.css("height","auto").height();e||this.uiDialog.hide(),this.element.height(Math.max(f,d))}else this.element.height(Math.max(b.height-c,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),a.extend(a.ui.dialog,{version:"1.8.17",uuid:0,maxZ:0,getTitleId:function(a){var b=a.attr("id");b||(this.uuid+=1,b=this.uuid);return"ui-dialog-title-"+b},overlay:function(b){this.$el=a.ui.dialog.overlay.create(b)}}),a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(b){this.instances.length===0&&(setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return!1})},1),a(document).bind("keydown.dialog-overlay",function(c){b.options.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}),a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize));var c=(this.oldInstances.pop()||a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});a.fn.bgiframe&&c.bgiframe(),this.instances.push(c);return c},destroy:function(b){var c=a.inArray(b,this.instances);c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]),this.instances.length===0&&a([document,window]).unbind(".dialog-overlay"),b.remove();var d=0;a.each(this.instances,function(){d=Math.max(d,this.css("z-index"))}),this.maxZ=d},height:function(){var b,c;if(a.browser.msie&&a.browser.version<7){b=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return b<c?a(window).height()+"px":b+"px"}return a(document).height()+"px"},width:function(){var b,c;if(a.browser.msie){b=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return b<c?a(window).width()+"px":b+"px"}return a(document).width()+"px"},resize:function(){var b=a([]);a.each(a.ui.dialog.overlay.instances,function(){b=b.add(this)}),b.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}}),a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);/*
 * jQuery UI Slider 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */(function(a,b){var c=5;a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var b=this,d=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",g=d.values&&d.values.length||1,h=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(d.disabled?" ui-slider-disabled ui-disabled":"")),this.range=a([]),d.range&&(d.range===!0&&(d.values||(d.values=[this._valueMin(),this._valueMin()]),d.values.length&&d.values.length!==2&&(d.values=[d.values[0],d.values[0]])),this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(d.range==="min"||d.range==="max"?" ui-slider-range-"+d.range:"")));for(var i=e.length;i<g;i+=1)h.push(f);this.handles=e.add(a(h.join("")).appendTo(b.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(a){a.preventDefault()}).hover(function(){d.disabled||a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){d.disabled?a(this).blur():(a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),a(this).addClass("ui-state-focus"))}).blur(function(){a(this).removeClass("ui-state-focus")}),this.handles.each(function(b){a(this).data("index.ui-slider-handle",b)}),this.handles.keydown(function(d){var e=!0,f=a(this).data("index.ui-slider-handle"),g,h,i,j;if(!b.options.disabled){switch(d.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:e=!1;if(!b._keySliding){b._keySliding=!0,a(this).addClass("ui-state-active"),g=b._start(d,f);if(g===!1)return}}j=b.options.step,b.options.values&&b.options.values.length?h=i=b.values(f):h=i=b.value();switch(d.keyCode){case a.ui.keyCode.HOME:i=b._valueMin();break;case a.ui.keyCode.END:i=b._valueMax();break;case a.ui.keyCode.PAGE_UP:i=b._trimAlignValue(h+(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.PAGE_DOWN:i=b._trimAlignValue(h-(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(h===b._valueMax())return;i=b._trimAlignValue(h+j);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(h===b._valueMin())return;i=b._trimAlignValue(h-j)}b._slide(d,f,i);return e}}).keyup(function(c){var d=a(this).data("index.ui-slider-handle");b._keySliding&&(b._keySliding=!1,b._stop(c,d),b._change(c,d),a(this).removeClass("ui-state-active"))}),this._refreshValue(),this._animateOff=!1},destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),this._mouseDestroy();return this},_mouseCapture:function(b){var c=this.options,d,e,f,g,h,i,j,k,l;if(c.disabled)return!1;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),d={x:b.pageX,y:b.pageY},e=this._normValueFromMouse(d),f=this._valueMax()-this._valueMin()+1,h=this,this.handles.each(function(b){var c=Math.abs(e-h.values(b));f>c&&(f=c,g=a(this),i=b)}),c.range===!0&&this.values(1)===c.min&&(i+=1,g=a(this.handles[i])),j=this._start(b,i);if(j===!1)return!1;this._mouseSliding=!0,h._handleIndex=i,g.addClass("ui-state-active").focus(),k=g.offset(),l=!a(b.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:b.pageX-k.left-g.width()/2,top:b.pageY-k.top-g.height()/2-(parseInt(g.css("borderTopWidth"),10)||0)-(parseInt(g.css("borderBottomWidth"),10)||0)+(parseInt(g.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,i,e),this._animateOff=!0;return!0},_mouseStart:function(a){return!0},_mouseDrag:function(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);this._slide(a,this._handleIndex,c);return!1},_mouseStop:function(a){this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1;return!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b,c,d,e,f;this.orientation==="horizontal"?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),d<0&&(d=0),this.orientation==="vertical"&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e;return this._trimAlignValue(f)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values());return this._trigger("start",a,c)},_slide:function(a,b,c){var d,e,f;this.options.values&&this.options.values.length?(d=this.values(b?0:1),this.options.values.length===2&&this.options.range===!0&&(b===0&&c>d||b===1&&c<d)&&(c=d),c!==this.values(b)&&(e=this.values(),e[b]=c,f=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e}),d=this.values(b?0:1),f!==!1&&this.values(b,c,!0))):c!==this.value()&&(f=this._trigger("slide",a,{handle:this.handles[b],value:c}),f!==!1&&this.value(c))},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("change",a,c)}},value:function(a){if(arguments.length)this.options.value=this._trimAlignValue(a),this._refreshValue(),this._change(null,0);else return this._value()},values:function(b,c){var d,e,f;if(arguments.length>1)this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),this._change(null,b);else{if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();d=this.options.values,e=arguments[0];for(f=0;f<d.length;f+=1)d[f]=this._trimAlignValue(e[f]),this._change(null,f);this._refreshValue()}},_setOption:function(b,c){var d,e=0;a.isArray(this.options.values)&&(e=this.options.values.length),a.Widget.prototype._setOption.apply(this,arguments);switch(b){case"disabled":c?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.propAttr("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.propAttr("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(d=0;d<e;d+=1)this._change(null,d);this._animateOff=!1}},_value:function(){var a=this.options.value;a=this._trimAlignValue(a);return a},_values:function(a){var b,c,d;if(arguments.length){b=this.options.values[a],b=this._trimAlignValue(b);return b}c=this.options.values.slice();for(d=0;d<c.length;d+=1)c[d]=this._trimAlignValue(c[d]);return c},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;Math.abs(c)*2>=b&&(d+=c>0?b:-b);return parseFloat(d.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b=this.options.range,c=this.options,d=this,e=this._animateOff?!1:c.animate,f,g={},h,i,j,k;this.options.values&&this.options.values.length?this.handles.each(function(b,i){f=(d.values(b)-d._valueMin())/(d._valueMax()-d._valueMin())*100,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",a(this).stop(1,1)[e?"animate":"css"](g,c.animate),d.options.range===!0&&(d.orientation==="horizontal"?(b===0&&d.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({width:f-h+"%"},{queue:!1,duration:c.animate})):(b===0&&d.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({height:f-h+"%"},{queue:!1,duration:c.animate}))),h=f}):(i=this.value(),j=this._valueMin(),k=this._valueMax(),f=k!==j?(i-j)/(k-j)*100:0,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",this.handle.stop(1,1)[e?"animate":"css"](g,c.animate),b==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[e?"animate":"css"]({width:f+"%"},c.animate),b==="max"&&this.orientation==="horizontal"&&this.range[e?"animate":"css"]({width:100-f+"%"},{queue:!1,duration:c.animate}),b==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},c.animate),b==="max"&&this.orientation==="vertical"&&this.range[e?"animate":"css"]({height:100-f+"%"},{queue:!1,duration:c.animate}))}}),a.extend(a.ui.slider,{version:"1.8.17"})})(jQuery);/*
 * jQuery UI Tabs 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */(function(a,b){function f(){return++d}function e(){return++c}var c=0,d=0;a.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:!1,cookie:null,collapsible:!1,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(!0)},_setOption:function(a,b){if(a=="selected"){if(this.options.collapsible&&b==this.options.selected)return;this.select(b)}else this.options[a]=b,this._tabify()},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+e()},_sanitizeSelector:function(a){return a.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+f());return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(a,b){return{tab:a,panel:b,index:this.anchors.index(a)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(c){function m(b,c){b.css("display",""),!a.support.opacity&&c.opacity&&b[0].style.removeAttribute("filter")}var d=this,e=this.options,f=/^#.+/;this.list=this.element.find("ol,ul").eq(0),this.lis=a(" > li:has(a[href])",this.list),this.anchors=this.lis.map(function(){return a("a",this)[0]}),this.panels=a([]),this.anchors.each(function(b,c){var g=a(c).attr("href"),h=g.split("#")[0],i;h&&(h===location.toString().split("#")[0]||(i=a("base")[0])&&h===i.href)&&(g=c.hash,c.href=g);if(f.test(g))d.panels=d.panels.add(d.element.find(d._sanitizeSelector(g)));else if(g&&g!=="#"){a.data(c,"href.tabs",g),a.data(c,"load.tabs",g.replace(/#.*$/,""));var j=d._tabId(c);c.href="#"+j;var k=d.element.find("#"+j);k.length||(k=a(e.panelTemplate).attr("id",j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(d.panels[b-1]||d.list),k.data("destroy.tabs",!0)),d.panels=d.panels.add(k)}else e.disabled.push(b)}),c?(this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"),this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.lis.addClass("ui-state-default ui-corner-top"),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"),e.selected===b?(location.hash&&this.anchors.each(function(a,b){if(b.hash==location.hash){e.selected=a;return!1}}),typeof e.selected!="number"&&e.cookie&&(e.selected=parseInt(d._cookie(),10)),typeof e.selected!="number"&&this.lis.filter(".ui-tabs-selected").length&&(e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))),e.selected=e.selected||(this.lis.length?0:-1)):e.selected===null&&(e.selected=-1),e.selected=e.selected>=0&&this.anchors[e.selected]||e.selected<0?e.selected:0,e.disabled=a.unique(e.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(a,b){return d.lis.index(a)}))).sort(),a.inArray(e.selected,e.disabled)!=-1&&e.disabled.splice(a.inArray(e.selected,e.disabled),1),this.panels.addClass("ui-tabs-hide"),this.lis.removeClass("ui-tabs-selected ui-state-active"),e.selected>=0&&this.anchors.length&&(d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass("ui-tabs-hide"),this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active"),d.element.queue("tabs",function(){d._trigger("show",null,d._ui(d.anchors[e.selected],d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0]))}),this.load(e.selected)),a(window).bind("unload",function(){d.lis.add(d.anchors).unbind(".tabs"),d.lis=d.anchors=d.panels=null})):e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected")),this.element[e.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible"),e.cookie&&this._cookie(e.selected,e.cookie);for(var g=0,h;h=this.lis[g];g++)a(h)[a.inArray(g,e.disabled)!=-1&&!a(h).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");e.cache===!1&&this.anchors.removeData("cache.tabs"),this.lis.add(this.anchors).unbind(".tabs");if(e.event!=="mouseover"){var i=function(a,b){b.is(":not(.ui-state-disabled)")&&b.addClass("ui-state-"+a)},j=function(a,b){b.removeClass("ui-state-"+a)};this.lis.bind("mouseover.tabs",function(){i("hover",a(this))}),this.lis.bind("mouseout.tabs",function(){j("hover",a(this))}),this.anchors.bind("focus.tabs",function(){i("focus",a(this).closest("li"))}),this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var k,l;e.fx&&(a.isArray(e.fx)?(k=e.fx[0],l=e.fx[1]):k=l=e.fx);var n=l?function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.hide().removeClass("ui-tabs-hide").animate(l,l.duration||"normal",function(){m(c,l),d._trigger("show",null,d._ui(b,c[0]))})}:function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.removeClass("ui-tabs-hide"),d._trigger("show",null,d._ui(b,c[0]))},o=k?function(a,b){b.animate(k,k.duration||"normal",function(){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),m(b,k),d.element.dequeue("tabs")})}:function(a,b,c){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),d.element.dequeue("tabs")};this.anchors.bind(e.event+".tabs",function(){var b=this,c=a(b).closest("li"),f=d.panels.filter(":not(.ui-tabs-hide)"),g=d.element.find(d._sanitizeSelector(b.hash));if(c.hasClass("ui-tabs-selected")&&!e.collapsible||c.hasClass("ui-state-disabled")||c.hasClass("ui-state-processing")||d.panels.filter(":animated").length||d._trigger("select",null,d._ui(this,g[0]))===!1){this.blur();return!1}e.selected=d.anchors.index(this),d.abort();if(e.collapsible){if(c.hasClass("ui-tabs-selected")){e.selected=-1,e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){o(b,f)}).dequeue("tabs"),this.blur();return!1}if(!f.length){e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){n(b,g)}),d.load(d.anchors.index(this)),this.blur();return!1}}e.cookie&&d._cookie(e.selected,e.cookie);if(g.length)f.length&&d.element.queue("tabs",function(){o(b,f)}),d.element.queue("tabs",function(){n(b,g)}),d.load(d.anchors.index(this));else throw"jQuery UI Tabs: Mismatching fragment identifier.";a.browser.msie&&this.blur()}),this.anchors.bind("click.tabs",function(){return!1})},_getIndex:function(a){typeof a=="string"&&(a=this.anchors.index(this.anchors.filter("[href$="+a+"]")));return a},destroy:function(){var b=this.options;this.abort(),this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"),this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.anchors.each(function(){var b=a.data(this,"href.tabs");b&&(this.href=b);var c=a(this).unbind(".tabs");a.each(["href","load","cache"],function(a,b){c.removeData(b+".tabs")})}),this.lis.unbind(".tabs").add(this.panels).each(function(){a.data(this,"destroy.tabs")?a(this).remove():a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))}),b.cookie&&this._cookie(null,b.cookie);return this},add:function(c,d,e){e===b&&(e=this.anchors.length);var f=this,g=this.options,h=a(g.tabTemplate.replace(/#\{href\}/g,c).replace(/#\{label\}/g,d)),i=c.indexOf("#")?this._tabId(a("a",h)[0]):c.replace("#","");h.addClass("ui-state-default ui-corner-top").data("destroy.tabs",!0);var j=f.element.find("#"+i);j.length||(j=a(g.panelTemplate).attr("id",i).data("destroy.tabs",!0)),j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"),e>=this.lis.length?(h.appendTo(this.list),j.appendTo(this.list[0].parentNode)):(h.insertBefore(this.lis[e]),j.insertBefore(this.panels[e])),g.disabled=a.map(g.disabled,function(a,b){return a>=e?++a:a}),this._tabify(),this.anchors.length==1&&(g.selected=0,h.addClass("ui-tabs-selected ui-state-active"),j.removeClass("ui-tabs-hide"),this.element.queue("tabs",function(){f._trigger("show",null,f._ui(f.anchors[0],f.panels[0]))}),this.load(0)),this._trigger("add",null,this._ui(this.anchors[e],this.panels[e]));return this},remove:function(b){b=this._getIndex(b);var c=this.options,d=this.lis.eq(b).remove(),e=this.panels.eq(b).remove();d.hasClass("ui-tabs-selected")&&this.anchors.length>1&&this.select(b+(b+1<this.anchors.length?1:-1)),c.disabled=a.map(a.grep(c.disabled,function(a,c){return a!=b}),function(a,c){return a>=b?--a:a}),this._tabify(),this._trigger("remove",null,this._ui(d.find("a")[0],e[0]));return this},enable:function(b){b=this._getIndex(b);var c=this.options;if(a.inArray(b,c.disabled)!=-1){this.lis.eq(b).removeClass("ui-state-disabled"),c.disabled=a.grep(c.disabled,function(a,c){return a!=b}),this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]));return this}},disable:function(a){a=this._getIndex(a);var b=this,c=this.options;a!=c.selected&&(this.lis.eq(a).addClass("ui-state-disabled"),c.disabled.push(a),c.disabled.sort(),this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a])));return this},select:function(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;this.anchors.eq(a).trigger(this.options.event+".tabs");return this},load:function(b){b=this._getIndex(b);var c=this,d=this.options,e=this.anchors.eq(b)[0],f=a.data(e,"load.tabs");this.abort();if(!f||this.element.queue("tabs").length!==0&&a.data(e,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(b).addClass("ui-state-processing");if(d.spinner){var g=a("span",e);g.data("label.tabs",g.html()).html(d.spinner)}this.xhr=a.ajax(a.extend({},d.ajaxOptions,{url:f,success:function(f,g){c.element.find(c._sanitizeSelector(e.hash)).html(f),c._cleanup(),d.cache&&a.data(e,"cache.tabs",!0),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.success(f,g)}catch(h){}},error:function(a,f,g){c._cleanup(),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.error(a,f,b,e)}catch(g){}}})),c.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]),this.panels.stop(!1,!0),this.element.queue("tabs",this.element.queue("tabs").splice(-2,2)),this.xhr&&(this.xhr.abort(),delete this.xhr),this._cleanup();return this},url:function(a,b){this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",b);return this},length:function(){return this.anchors.length}}),a.extend(a.ui.tabs,{version:"1.8.17"}),a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(a,b){var c=this,d=this.options,e=c._rotate||(c._rotate=function(b){clearTimeout(c.rotation),c.rotation=setTimeout(function(){var a=d.selected;c.select(++a<c.anchors.length?a:0)},a),b&&b.stopPropagation()}),f=c._unrotate||(c._unrotate=b?function(a){t=d.selected,e()}:function(a){a.clientX&&c.rotate(null)});a?(this.element.bind("tabsshow",e),this.anchors.bind(d.event+".tabs",f),e()):(clearTimeout(c.rotation),this.element.unbind("tabsshow",e),this.anchors.unbind(d.event+".tabs",f),delete this._rotate,delete this._unrotate);return this}})})(jQuery);/*
 * jQuery UI Datepicker 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */(function($,undefined){function isArray(a){return a&&($.browser.safari&&typeof a=="object"&&a.length||a.constructor&&a.constructor.toString().match(/\Array\(\)/))}function extendRemove(a,b){$.extend(a,b);for(var c in b)if(b[c]==null||b[c]==undefined)a[c]=b[c];return a}function bindHover(a){var b="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return a.bind("mouseout",function(a){var c=$(a.target).closest(b);!c.length||c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")}).bind("mouseover",function(c){var d=$(c.target).closest(b);!$.datepicker._isDisabledDatepicker(instActive.inline?a.parent()[0]:instActive.input[0])&&!!d.length&&(d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),d.addClass("ui-state-hover"),d.hasClass("ui-datepicker-prev")&&d.addClass("ui-datepicker-prev-hover"),d.hasClass("ui-datepicker-next")&&d.addClass("ui-datepicker-next-hover"))})}function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}$.extend($.ui,{datepicker:{version:"1.8.17"}});var PROP_NAME="datepicker",dpuuid=(new Date).getTime(),instActive;$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){extendRemove(this._defaults,a||{});return this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline=nodeName=="div"||nodeName=="span";target.id||(this.uuid+=1,target.id="dp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),nodeName=="input"?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst)},_newInst:function(a,b){var c=a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:c,input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:b?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}},_connectDatepicker:function(a,b){var c=$(a);b.append=$([]),b.trigger=$([]);c.hasClass(this.markerClassName)||(this._attachments(c,b),c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(a,c,d){b.settings[c]=d}).bind("getData.datepicker",function(a,c){return this._get(b,c)}),this._autoSize(b),$.data(a,PROP_NAME,b),b.settings.disabled&&this._disableDatepicker(a))},_attachments:function(a,b){var c=this._get(b,"appendText"),d=this._get(b,"isRTL");b.append&&b.append.remove(),c&&(b.append=$('<span class="'+this._appendClass+'">'+c+"</span>"),a[d?"before":"after"](b.append)),a.unbind("focus",this._showDatepicker),b.trigger&&b.trigger.remove();var e=this._get(b,"showOn");(e=="focus"||e=="both")&&a.focus(this._showDatepicker);if(e=="button"||e=="both"){var f=this._get(b,"buttonText"),g=this._get(b,"buttonImage");b.trigger=$(this._get(b,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:g,alt:f,title:f}):$('<button type="button"></button>').addClass(this._triggerClass).html(g==""?f:$("<img/>").attr({src:g,alt:f,title:f}))),a[d?"before":"after"](b.trigger),b.trigger.click(function(){$.datepicker._datepickerShowing&&$.datepicker._lastInput==a[0]?$.datepicker._hideDatepicker():$.datepicker._showDatepicker(a[0]);return!1})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var d=function(a){var b=0,c=0;for(var d=0;d<a.length;d++)a[d].length>b&&(b=a[d].length,c=d);return c};b.setMonth(d(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort"))),b.setDate(d(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=$(a);c.hasClass(this.markerClassName)||(c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(a,c,d){b.settings[c]=d}).bind("getData.datepicker",function(a,c){return this._get(b,c)}),$.data(a,PROP_NAME,b),this._setDate(b,this._getDefaultDate(b),!0),this._updateDatepicker(b),this._updateAlternate(b),b.settings.disabled&&this._disableDatepicker(a),b.dpDiv.css("display","block"))},_dialogDatepicker:function(a,b,c,d,e){var f=this._dialogInst;if(!f){this.uuid+=1;var g="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+g+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),f=this._dialogInst=this._newInst(this._dialogInput,!1),f.settings={},$.data(this._dialogInput[0],PROP_NAME,f)}extendRemove(f.settings,d||{}),b=b&&b.constructor==Date?this._formatDate(f,b):b,this._dialogInput.val(b),this._pos=e?e.length?e:[e.pageX,e.pageY]:null;if(!this._pos){var h=document.documentElement.clientWidth,i=document.documentElement.clientHeight,j=document.documentElement.scrollLeft||document.body.scrollLeft,k=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[h/2-100+j,i/2-150+k]}this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),f.settings.onSelect=c,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,f);return this},_destroyDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!!b.hasClass(this.markerClassName)){var d=a.nodeName.toLowerCase();$.removeData(a,PROP_NAME),d=="input"?(c.append.remove(),c.trigger.remove(),b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(d=="div"||d=="span")&&b.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!!b.hasClass(this.markerClassName)){var d=a.nodeName.toLowerCase();if(d=="input")a.disabled=!1,c.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);e.children().removeClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b})}},_disableDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!!b.hasClass(this.markerClassName)){var d=a.nodeName.toLowerCase();if(d=="input")a.disabled=!0,c.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);e.children().addClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b}),this._disabledInputs[this._disabledInputs.length]=a}},_isDisabledDatepicker:function(a){if(!a)return!1;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return!0;return!1},_getInst:function(a){try{return $.data(a,PROP_NAME)}catch(b){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(a,b,c){var d=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?$.extend({},$.datepicker._defaults):d?b=="all"?$.extend({},d.settings):this._get(d,b):null;var e=b||{};typeof b=="string"&&(e={},e[b]=c);if(d){this._curInst==d&&this._hideDatepicker();var f=this._getDateDatepicker(a,!0),g=this._getMinMaxDate(d,"min"),h=this._getMinMaxDate(d,"max");extendRemove(d.settings,e),g!==null&&e.dateFormat!==undefined&&e.minDate===undefined&&(d.settings.minDate=this._formatDate(d,g)),h!==null&&e.dateFormat!==undefined&&e.maxDate===undefined&&(d.settings.maxDate=this._formatDate(d,h)),this._attachments($(a),d),this._autoSize(d),this._setDate(d,f),this._updateAlternate(d),this._updateDatepicker(d)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){var b=this._getInst(a);b&&this._updateDatepicker(b)},_setDateDatepicker:function(a,b){var c=this._getInst(a);c&&(this._setDate(c,b),this._updateDatepicker(c),this._updateAlternate(c))},_getDateDatepicker:function(a,b){var c=this._getInst(a);c&&!c.inline&&this._setDateFromField(c,b);return c?this._getDate(c):null},_doKeyDown:function(a){var b=$.datepicker._getInst(a.target),c=!0,d=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=!0;if($.datepicker._datepickerShowing)switch(a.keyCode){case 9:$.datepicker._hideDatepicker(),c=!1;break;case 13:var e=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",b.dpDiv);e[0]&&$.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,e[0]);var f=$.datepicker._get(b,"onSelect");if(f){var g=$.datepicker._formatDate(b);f.apply(b.input?b.input[0]:null,[g,b])}else $.datepicker._hideDatepicker();return!1;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");break;case 34:$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");break;case 35:(a.ctrlKey||a.metaKey)&&$.datepicker._clearDate(a.target),c=a.ctrlKey||a.metaKey;break;case 36:(a.ctrlKey||a.metaKey)&&$.datepicker._gotoToday(a.target),c=a.ctrlKey||a.metaKey;break;case 37:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?1:-1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");break;case 38:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,-7,"D"),c=a.ctrlKey||a.metaKey;break;case 39:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?-1:1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");break;case 40:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,7,"D"),c=a.ctrlKey||a.metaKey;break;default:c=!1}else a.keyCode==36&&a.ctrlKey?$.datepicker._showDatepicker(this):c=!1;c&&(a.preventDefault(),a.stopPropagation())},_doKeyPress:function(a){var b=$.datepicker._getInst(a.target);if($.datepicker._get(b,"constrainInput")){var c=$.datepicker._possibleChars($.datepicker._get(b,"dateFormat")),d=String.fromCharCode(a.charCode==undefined?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||d<" "||!c||c.indexOf(d)>-1}},_doKeyUp:function(a){var b=$.datepicker._getInst(a.target);if(b.input.val()!=b.lastVal)try{var c=$.datepicker.parseDate($.datepicker._get(b,"dateFormat"),b.input?b.input.val():null,$.datepicker._getFormatConfig(b));c&&($.datepicker._setDateFromField(b),$.datepicker._updateAlternate(b),$.datepicker._updateDatepicker(b))}catch(a){$.datepicker.log(a)}return!0},_showDatepicker:function(a){a=a.target||a,a.nodeName.toLowerCase()!="input"&&(a=$("input",a.parentNode)[0]);if(!$.datepicker._isDisabledDatepicker(a)&&$.datepicker._lastInput!=a){var b=$.datepicker._getInst(a);$.datepicker._curInst&&$.datepicker._curInst!=b&&($.datepicker._curInst.dpDiv.stop(!0,!0),b&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));var c=$.datepicker._get(b,"beforeShow"),d=c?c.apply(a,[a,b]):{};if(d===!1)return;extendRemove(b.settings,d),b.lastVal=null,$.datepicker._lastInput=a,$.datepicker._setDateFromField(b),$.datepicker._inDialog&&(a.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(a),$.datepicker._pos[1]+=a.offsetHeight);var e=!1;$(a).parents().each(function(){e|=$(this).css("position")=="fixed";return!e}),e&&$.browser.opera&&($.datepicker._pos[0]-=document.documentElement.scrollLeft,$.datepicker._pos[1]-=document.documentElement.scrollTop);var f={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null,b.dpDiv.empty(),b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(b),f=$.datepicker._checkOffset(b,f,e),b.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":e?"fixed":"absolute",display:"none",left:f.left+"px",top:f.top+"px"});if(!b.inline){var g=$.datepicker._get(b,"showAnim"),h=$.datepicker._get(b,"duration"),i=function(){var a=b.dpDiv.find("iframe.ui-datepicker-cover");if(!!a.length){var c=$.datepicker._getBorders(b.dpDiv);a.css({left:-c[0],top:-c[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})}};b.dpDiv.zIndex($(a).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&$.effects[g]?b.dpDiv.show(g,$.datepicker._get(b,"showOptions"),h,i):b.dpDiv[g||"show"](g?h:null,i),(!g||!h)&&i(),b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus(),$.datepicker._curInst=b}}},_updateDatepicker:function(a){var b=this;b.maxRows=4;var c=$.datepicker._getBorders(a.dpDiv);instActive=a,a.dpDiv.empty().append(this._generateHTML(a));var d=a.dpDiv.find("iframe.ui-datepicker-cover");!d.length||d.css({left:-c[0],top:-c[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()}),a.dpDiv.find("."+this._dayOverClass+" a").mouseover();var e=this._getNumberOfMonths(a),f=e[1],g=17;a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),f>1&&a.dpDiv.addClass("ui-datepicker-multi-"+f).css("width",g*f+"em"),a.dpDiv[(e[0]!=1||e[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),a==$.datepicker._curInst&&$.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input[0]!=document.activeElement&&a.input.focus();if(a.yearshtml){var h=a.yearshtml;setTimeout(function(){h===a.yearshtml&&a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml),h=a.yearshtml=null},0)}},_getBorders:function(a){var b=function(a){return{thin:1,medium:2,thick:3}[a]||a};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkOffset:function(a,b,c){var d=a.dpDiv.outerWidth(),e=a.dpDiv.outerHeight(),f=a.input?a.input.outerWidth():0,g=a.input?a.input.outerHeight():0,h=document.documentElement.clientWidth+$(document).scrollLeft(),i=document.documentElement.clientHeight+$(document).scrollTop();b.left-=this._get(a,"isRTL")?d-f:0,b.left-=c&&b.left==a.input.offset().left?$(document).scrollLeft():0,b.top-=c&&b.top==a.input.offset().top+g?$(document).scrollTop():0,b.left-=Math.min(b.left,b.left+d>h&&h>d?Math.abs(b.left+d-h):0),b.top-=Math.min(b.top,b.top+e>i&&i>e?Math.abs(e+g):0);return b},_findPos:function(a){var b=this._getInst(a),c=this._get(b,"isRTL");while(a&&(a.type=="hidden"||a.nodeType!=1||$.expr.filters.hidden(a)))a=a[c?"previousSibling":"nextSibling"];var d=$(a).offset();return[d.left,d.top]},_hideDatepicker:function(a){var b=this._curInst;if(!(!b||a&&b!=$.data(a,PROP_NAME))&&this._datepickerShowing){var c=this._get(b,"showAnim"),d=this._get(b,"duration"),e=this,f=function(){$.datepicker._tidyDialog(b),e._curInst=null};$.effects&&$.effects[c]?b.dpDiv.hide(c,$.datepicker._get(b,"showOptions"),d,f):b.dpDiv[c=="slideDown"?"slideUp":c=="fadeIn"?"fadeOut":"hide"](c?d:null,f),c||f(),this._datepickerShowing=!1;var g=this._get(b,"onClose");g&&g.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(a){if(!!$.datepicker._curInst){var b=$(a.target),c=$.datepicker._getInst(b[0]);(b[0].id!=$.datepicker._mainDivId&&b.parents("#"+$.datepicker._mainDivId).length==0&&!b.hasClass($.datepicker.markerClassName)&&!b.hasClass($.datepicker._triggerClass)&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||b.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=c)&&$.datepicker._hideDatepicker()}},_adjustDate:function(a,b,c){var d=$(a),e=this._getInst(d[0]);this._isDisabledDatepicker(d[0])||(this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c),this._updateDatepicker(e))},_gotoToday:function(a){var b=$(a),c=this._getInst(b[0]);if(this._get(c,"gotoCurrent")&&c.currentDay)c.selectedDay=c.currentDay,c.drawMonth=c.selectedMonth=c.currentMonth,c.drawYear=c.selectedYear=c.currentYear;else{var d=new Date;c.selectedDay=d.getDate(),c.drawMonth=c.selectedMonth=d.getMonth(),c.drawYear=c.selectedYear=d.getFullYear()}this._notifyChange(c),this._adjustDate(b)},_selectMonthYear:function(a,b,c){var d=$(a),e=this._getInst(d[0]);e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10),this._notifyChange(e),this._adjustDate(d)},_selectDay:function(a,b,c,d){var e=$(a);if(!$(d).hasClass(this._unselectableClass)&&!this._isDisabledDatepicker(e[0])){var f=this._getInst(e[0]);f.selectedDay=f.currentDay=$("a",d).html(),f.selectedMonth=f.currentMonth=b,f.selectedYear=f.currentYear=c,this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))}},_clearDate:function(a){var b=$(a),c=this._getInst(b[0]);this._selectDate(b,"")},_selectDate:function(a,b){var c=$(a),d=this._getInst(c[0]);b=b!=null?b:this._formatDate(d),d.input&&d.input.val(b),this._updateAlternate(d);var e=this._get(d,"onSelect");e?e.apply(d.input?d.input[0]:null,[b,d]):d.input&&d.input.trigger("change"),d.inline?this._updateDatepicker(d):(this._hideDatepicker(),this._lastInput=d.input[0],typeof d.input[0]!="object"&&d.input.focus(),this._lastInput=null)},_updateAlternate:function(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),d=this._getDate(a),e=this.formatDate(c,d,this._getFormatConfig(a));$(b).each(function(){$(this).val(e)})}},noWeekends:function(a){var b=a.getDay();return[b>0&&b<6,""]},iso8601Week:function(a){var b=new Date(a.getTime());b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();b.setMonth(0),b.setDate(1);return Math.floor(Math.round((c-b)/864e5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b=="object"?b.toString():b+"";if(b=="")return null;var d=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;d=typeof d!="string"?d:(new Date).getFullYear()%100+parseInt(d,10);var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,g=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,h=(c?c.monthNames:null)||this._defaults.monthNames,i=-1,j=-1,k=-1,l=-1,m=!1,n=function(b){var c=s+1<a.length&&a.charAt(s+1)==b;c&&s++;return c},o=function(a){var c=n(a),d=a=="@"?14:a=="!"?20:a=="y"&&c?4:a=="o"?3:2,e=new RegExp("^\\d{1,"+d+"}"),f=b.substring(r).match(e);if(!f)throw"Missing number at position "+r;r+=f[0].length;return parseInt(f[0],10)},p=function(a,c,d){var e=$.map(n(a)?d:c,function(a,b){return[[b,a]]}).sort(function(a,b){return-(a[1].length-b[1].length)}),f=-1;$.each(e,function(a,c){var d=c[1];if(b.substr(r,d.length).toLowerCase()==d.toLowerCase()){f=c[0],r+=d.length;return!1}});if(f!=-1)return f+1;throw"Unknown name at position "+r},q=function(){if(b.charAt(r)!=a.charAt(s))throw"Unexpected literal at position "+r;r++},r=0;for(var s=0;s<a.length;s++)if(m)a.charAt(s)=="'"&&!n("'")?m=!1:q();else switch(a.charAt(s)){case"d":k=o("d");break;case"D":p("D",e,f);break;case"o":l=o("o");break;case"m":j=o("m");break;case"M":j=p("M",g,h);break;case"y":i=o("y");break;case"@":var t=new Date(o("@"));i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case"!":var t=new Date((o("!")-this._ticksTo1970)/1e4);i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case"'":n("'")?q():m=!0;break;default:q()}if(r<b.length)throw"Extra/unparsed characters found in date: "+b.substring(r);i==-1?i=(new Date).getFullYear():i<100&&(i+=(new Date).getFullYear()-(new Date).getFullYear()%100+(i<=d?0:-100));if(l>-1){j=1,k=l;for(;;){var u=this._getDaysInMonth(i,j-1);if(k<=u)break;j++,k-=u}}var t=this._daylightSavingAdjust(new Date(i,j-1,k));if(t.getFullYear()!=i||t.getMonth()+1!=j||t.getDate()!=k)throw"Invalid date";return t},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(a,b,c){if(!b)return"";var d=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,e=(c?c.dayNames:null)||this._defaults.dayNames,f=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,h=function(b){var c=m+1<a.length&&a.charAt(m+1)==b;c&&m++;return c},i=function(a,b,c){var d=""+b;if(h(a))while(d.length<c)d="0"+d;return d},j=function(a,b,c,d){return h(a)?d[b]:c[b]},k="",l=!1;if(b)for(var m=0;m<a.length;m++)if(l)a.charAt(m)=="'"&&!h("'")?l=!1:k+=a.charAt(m);else switch(a.charAt(m)){case"d":k+=i("d",b.getDate(),2);break;case"D":k+=j("D",b.getDay(),d,e);break;case"o":k+=i("o",Math.round(((new Date(b.getFullYear(),b.getMonth(),b.getDate())).getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":k+=i("m",b.getMonth()+1,2);break;case"M":k+=j("M",b.getMonth(),f,g);break;case"y":k+=h("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case"@":k+=b.getTime();break;case"!":k+=b.getTime()*1e4+this._ticksTo1970;break;case"'":h("'")?k+="'":l=!0;break;default:k+=a.charAt(m)}return k},_possibleChars:function(a){var b="",c=!1,d=function(b){var c=e+1<a.length&&a.charAt(e+1)==b;c&&e++;return c};for(var e=0;e<a.length;e++)if(c)a.charAt(e)=="'"&&!d("'")?c=!1:b+=a.charAt(e);else switch(a.charAt(e)){case"d":case"m":case"y":case"@":b+="0123456789";break;case"D":case"M":return null;case"'":d("'")?b+="'":c=!0;break;default:b+=a.charAt(e)}return b},_get:function(a,b){return a.settings[b]!==undefined?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()!=a.lastVal){var c=this._get(a,"dateFormat"),d=a.lastVal=a.input?a.input.val():null,e,f;e=f=this._getDefaultDate(a);var g=this._getFormatConfig(a);try{e=this.parseDate(c,d,g)||f}catch(h){this.log(h),d=b?"":d}a.selectedDay=e.getDate(),a.drawMonth=a.selectedMonth=e.getMonth(),a.drawYear=a.selectedYear=e.getFullYear(),a.currentDay=d?e.getDate():0,a.currentMonth=d?e.getMonth():0,a.currentYear=d?e.getFullYear():0,this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var d=function(a){var b=new Date;b.setDate(b.getDate()+a);return b},e=function(b){try{return $.datepicker.parseDate($.datepicker._get(a,"dateFormat"),b,$.datepicker._getFormatConfig(a))}catch(c){}var d=(b.toLowerCase().match(/^c/)?$.datepicker._getDate(a):null)||new Date,e=d.getFullYear(),f=d.getMonth(),g=d.getDate(),h=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,i=h.exec(b);while(i){switch(i[2]||"d"){case"d":case"D":g+=parseInt(i[1],10);break;case"w":case"W":g+=parseInt(i[1],10)*7;break;case"m":case"M":f+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f));break;case"y":case"Y":e+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f))}i=h.exec(b)}return new Date(e,f,g)},f=b==null||b===""?c:typeof b=="string"?e(b):typeof b=="number"?isNaN(b)?c:d(b):new Date(b.getTime());f=f&&f.toString()=="Invalid Date"?c:f,f&&(f.setHours(0),f.setMinutes(0),f.setSeconds(0),f.setMilliseconds(0));return this._daylightSavingAdjust(f)},_daylightSavingAdjust:function(a){if(!a)return null;a.setHours(a.getHours()>12?a.getHours()+2:0);return a},_setDate:function(a,b,c){var d=!b,e=a.selectedMonth,f=a.selectedYear,g=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=a.currentDay=g.getDate(),a.drawMonth=a.selectedMonth=a.currentMonth=g.getMonth(),a.drawYear=a.selectedYear=a.currentYear=g.getFullYear(),(e!=a.selectedMonth||f!=a.selectedYear)&&!c&&this._notifyChange(a),this._adjustInstDate(a),a.input&&a.input.val(d?"":this._formatDate(a))},_getDate:function(a){var b=!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return b},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),d=this._get(a,"showButtonPanel"),e=this._get(a,"hideIfNoPrevNext"),f=this._get(a,"navigationAsDateFormat"),g=this._getNumberOfMonths(a),h=this._get(a,"showCurrentAtPos"),i=this._get(a,"stepMonths"),j=g[0]!=1||g[1]!=1,k=this._daylightSavingAdjust(a.currentDay?new Date(a.currentYear,a.currentMonth,a.currentDay):new Date(9999,9,9)),l=this._getMinMaxDate(a,"min"),m=this._getMinMaxDate(a,"max"),n=a.drawMonth-h,o=a.drawYear;n<0&&(n+=12,o--);if(m){var p=this._daylightSavingAdjust(new Date(m.getFullYear(),m.getMonth()-g[0]*g[1]+1,m.getDate()));p=l&&p<l?l:p;while(this._daylightSavingAdjust(new Date(o,n,1))>p)n--,n<0&&(n=11,o--)}a.drawMonth=n,a.drawYear=o;var q=this._get(a,"prevText");q=f?this.formatDate(q,this._daylightSavingAdjust(new Date(o,n-i,1)),this._getFormatConfig(a)):q;var r=this._canAdjustMonth(a,-1,o,n)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+a.id+"', -"+i+", 'M');\""+' title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>":e?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>",s=this._get(a,"nextText");s=f?this.formatDate(s,this._daylightSavingAdjust(new Date(o,n+i,1)),this._getFormatConfig(a)):s;var t=this._canAdjustMonth(a,1,o,n)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+a.id+"', +"+i+", 'M');\""+' title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>":e?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>",u=this._get(a,"currentText"),v=this._get(a,"gotoCurrent")&&a.currentDay?k:b;u=f?this.formatDate(u,v,this._getFormatConfig(a)):u;var w=a.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+dpuuid+'.datepicker._hideDatepicker();">'+this._get(a,"closeText")+"</button>",x=d?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?w:"")+(this._isInRange(a,v)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._gotoToday('#"+a.id+"');\""+">"+u+"</button>":"")+(c?"":w)+"</div>":"",y=parseInt(this._get(a,"firstDay"),10);y=isNaN(y)?0:y;var z=this._get(a,"showWeek"),A=this._get(a,"dayNames"),B=this._get(a,"dayNamesShort"),C=this._get(a,"dayNamesMin"),D=this._get(a,"monthNames"),E=this._get(a,"monthNamesShort"),F=this._get(a,"beforeShowDay"),G=this._get(a,"showOtherMonths"),H=this._get(a,"selectOtherMonths"),I=this._get(a,"calculateWeek")||this.iso8601Week,J=this._getDefaultDate(a),K="";for(var L=0;L<g[0];L++){var M="";this.maxRows=4;for(var N=0;N<g[1];N++){var O=this._daylightSavingAdjust(new Date(o,n,a.selectedDay)),P=" ui-corner-all",Q="";if(j){Q+='<div class="ui-datepicker-group';if(g[1]>1)switch(N){case 0:Q+=" ui-datepicker-group-first",P=" ui-corner-"+(c?"right":"left");break;case g[1]-1:Q+=" ui-datepicker-group-last",P=" ui-corner-"+(c?"left":"right");break;default:Q+=" ui-datepicker-group-middle",P=""}Q+='">'}Q+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+P+'">'+(/all|left/.test(P)&&L==0?c?t:r:"")+(/all|right/.test(P)&&L==0?c?r:t:"")+this._generateMonthYearHeader(a,n,o,l,m,L>0||N>0,D,E)+'</div><table class="ui-datepicker-calendar"><thead>'+"<tr>";var R=z?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(var S=0;S<7;S++){var T=(S+y)%7;R+="<th"+((S+y+6)%7>=5?' class="ui-datepicker-week-end"':"")+">"+'<span title="'+A[T]+'">'+C[T]+"</span></th>"}Q+=R+"</tr></thead><tbody>";var U=this._getDaysInMonth(o,n);o==a.selectedYear&&n==a.selectedMonth&&(a.selectedDay=Math.min(a.selectedDay,U));var V=(this._getFirstDayOfMonth(o,n)-y+7)%7,W=Math.ceil((V+U)/7),X=j?this.maxRows>W?this.maxRows:W:W;this.maxRows=X;var Y=this._daylightSavingAdjust(new Date(o,n,1-V));for(var Z=0;Z<X;Z++){Q+="<tr>";var _=z?'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(Y)+"</td>":"";for(var S=0;S<7;S++){var ba=F?F.apply(a.input?a.input[0]:null,[Y]):[!0,""],bb=Y.getMonth()!=n,bc=bb&&!H||!ba[0]||l&&Y<l||m&&Y>m;_+='<td class="'+((S+y+6)%7>=5?" ui-datepicker-week-end":"")+(bb?" ui-datepicker-other-month":"")+(Y.getTime()==O.getTime()&&n==a.selectedMonth&&a._keyEvent||J.getTime()==Y.getTime()&&J.getTime()==O.getTime()?" "+this._dayOverClass:"")+(bc?" "+this._unselectableClass+" ui-state-disabled":"")+(bb&&!G?"":" "+ba[1]+(Y.getTime()==k.getTime()?" "+this._currentClass:"")+(Y.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!bb||G)&&ba[2]?' title="'+ba[2]+'"':"")+(bc?"":' onclick="DP_jQuery_'+dpuuid+".datepicker._selectDay('#"+a.id+"',"+Y.getMonth()+","+Y.getFullYear()+', this);return false;"')+">"+(bb&&!G?"&#xa0;":bc?'<span class="ui-state-default">'+Y.getDate()+"</span>":'<a class="ui-state-default'+(Y.getTime()==b.getTime()?" ui-state-highlight":"")+(Y.getTime()==k.getTime()?" ui-state-active":"")+(bb?" ui-priority-secondary":"")+'" href="#">'+Y.getDate()+"</a>")+"</td>",Y.setDate(Y.getDate()+1),Y=this._daylightSavingAdjust(Y)}Q+=_+"</tr>"}n++,n>11&&(n=0,o++),Q+="</tbody></table>"+(j?"</div>"+(g[0]>0&&N==g[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),M+=Q}K+=M}K+=x+($.browser.msie&&parseInt($.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),a._keyEvent=!1;return K},_generateMonthYearHeader:function(a,b,c,d,e,f,g,h){var i=this._get(a,"changeMonth"),j=this._get(a,"changeYear"),k=this
._get(a,"showMonthAfterYear"),l='<div class="ui-datepicker-title">',m="";if(f||!i)m+='<span class="ui-datepicker-month">'+g[b]+"</span>";else{var n=d&&d.getFullYear()==c,o=e&&e.getFullYear()==c;m+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" "+">";for(var p=0;p<12;p++)(!n||p>=d.getMonth())&&(!o||p<=e.getMonth())&&(m+='<option value="'+p+'"'+(p==b?' selected="selected"':"")+">"+h[p]+"</option>");m+="</select>"}k||(l+=m+(f||!i||!j?"&#xa0;":""));if(!a.yearshtml){a.yearshtml="";if(f||!j)l+='<span class="ui-datepicker-year">'+c+"</span>";else{var q=this._get(a,"yearRange").split(":"),r=(new Date).getFullYear(),s=function(a){var b=a.match(/c[+-].*/)?c+parseInt(a.substring(1),10):a.match(/[+-].*/)?r+parseInt(a,10):parseInt(a,10);return isNaN(b)?r:b},t=s(q[0]),u=Math.max(t,s(q[1]||""));t=d?Math.max(t,d.getFullYear()):t,u=e?Math.min(u,e.getFullYear()):u,a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+a.id+"', this, 'Y');\" "+">";for(;t<=u;t++)a.yearshtml+='<option value="'+t+'"'+(t==c?' selected="selected"':"")+">"+t+"</option>";a.yearshtml+="</select>",l+=a.yearshtml,a.yearshtml=null}}l+=this._get(a,"yearSuffix"),k&&(l+=(f||!i||!j?"&#xa0;":"")+m),l+="</div>";return l},_adjustInstDate:function(a,b,c){var d=a.drawYear+(c=="Y"?b:0),e=a.drawMonth+(c=="M"?b:0),f=Math.min(a.selectedDay,this._getDaysInMonth(d,e))+(c=="D"?b:0),g=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(d,e,f)));a.selectedDay=g.getDate(),a.drawMonth=a.selectedMonth=g.getMonth(),a.drawYear=a.selectedYear=g.getFullYear(),(c=="M"||c=="Y")&&this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max"),e=c&&b<c?c:b;e=d&&e>d?d:e;return e},_notifyChange:function(a){var b=this._get(a,"onChangeMonthYear");b&&b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){var b=this._get(a,"numberOfMonths");return b==null?[1,1]:typeof b=="number"?[1,b]:b},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,d){var e=this._getNumberOfMonths(a),f=this._daylightSavingAdjust(new Date(c,d+(b<0?b:e[0]*e[1]),1));b<0&&f.setDate(this._getDaysInMonth(f.getFullYear(),f.getMonth()));return this._isInRange(a,f)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!d||b.getTime()<=d.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);return{shortYearCutoff:b,dayNamesShort:this._get(a,"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,d){b||(a.currentDay=a.selectedDay,a.currentMonth=a.selectedMonth,a.currentYear=a.selectedYear);var e=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(d,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),e,this._getFormatConfig(a))}}),$.fn.datepicker=function(a){if(!this.length)return this;$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv),$.datepicker.initialized=!0);var b=Array.prototype.slice.call(arguments,1);if(typeof a=="string"&&(a=="isDisabled"||a=="getDate"||a=="widget"))return $.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b));if(a=="option"&&arguments.length==2&&typeof arguments[1]=="string")return $.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b));return this.each(function(){typeof a=="string"?$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this].concat(b)):$.datepicker._attachDatepicker(this,a)})},$.datepicker=new Datepicker,$.datepicker.initialized=!1,$.datepicker.uuid=(new Date).getTime(),$.datepicker.version="1.8.17",window["DP_jQuery_"+dpuuid]=$})(jQuery);/*
 * jQuery UI Progressbar 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */(function(a,b){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove(),a.Widget.prototype.destroy.apply(this,arguments)},value:function(a){if(a===b)return this._value();this._setOption("value",a);return this},_setOption:function(b,c){b==="value"&&(this.options.value=c,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),a.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;typeof a!="number"&&(a=0);return Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var a=this.value(),b=this._percentage();this.oldValue!==a&&(this.oldValue=a,this._trigger("change")),this.valueDiv.toggle(a>this.min).toggleClass("ui-corner-right",a===this.options.max).width(b.toFixed(0)+"%"),this.element.attr("aria-valuenow",a)}}),a.extend(a.ui.progressbar,{version:"1.8.17"})})(jQuery);/*
 * jQuery UI Effects 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/
 */jQuery.effects||function(a,b){function l(b){if(!b||typeof b=="number"||a.fx.speeds[b])return!0;if(typeof b=="string"&&!a.effects[b])return!0;return!1}function k(b,c,d,e){typeof b=="object"&&(e=c,d=null,c=b,b=c.effect),a.isFunction(c)&&(e=c,d=null,c={});if(typeof c=="number"||a.fx.speeds[c])e=d,d=c,c={};a.isFunction(d)&&(e=d,d=null),c=c||{},d=d||c.duration,d=a.fx.off?0:typeof d=="number"?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,e=e||c.complete;return[b,c,d,e]}function j(a,b){var c={_:0},d;for(d in b)a[d]!=b[d]&&(c[d]=b[d]);return c}function i(b){var c,d;for(c in b)d=b[c],(d==null||a.isFunction(d)||c in g||/scrollbar/.test(c)||!/color/i.test(c)&&isNaN(parseFloat(d)))&&delete b[c];return b}function h(){var a=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,b={},c,d;if(a&&a.length&&a[0]&&a[a[0]]){var e=a.length;while(e--)c=a[e],typeof a[c]=="string"&&(d=c.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),b[d]=a[c])}else for(c in a)typeof a[c]=="string"&&(b[c]=a[c]);return b}function d(b,d){var e;do{e=a.curCSS(b,d);if(e!=""&&e!="transparent"||a.nodeName(b,"body"))break;d="backgroundColor"}while(b=b.parentNode);return c(e)}function c(b){var c;if(b&&b.constructor==Array&&b.length==3)return b;if(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))return[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)];if(c=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))return[parseFloat(c[1])*2.55,parseFloat(c[2])*2.55,parseFloat(c[3])*2.55];if(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))return[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)];if(c=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))return[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)];if(c=/rgba\(0, 0, 0, 0\)/.exec(b))return e.transparent;return e[a.trim(b).toLowerCase()]}a.effects={},a.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(b,e){a.fx.step[e]=function(a){a.colorInit||(a.start=d(a.elem,e),a.end=c(a.end),a.colorInit=!0),a.elem.style[e]="rgb("+Math.max(Math.min(parseInt(a.pos*(a.end[0]-a.start[0])+a.start[0],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[1]-a.start[1])+a.start[1],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[2]-a.start[2])+a.start[2],10),255),0)+")"}});var e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},f=["add","remove","toggle"],g={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.effects.animateClass=function(b,c,d,e){a.isFunction(d)&&(e=d,d=null);return this.queue(function(){var g=a(this),k=g.attr("style")||" ",l=i(h.call(this)),m,n=g.attr("class");a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),m=i(h.call(this)),g.attr("class",n),g.animate(j(l,m),{queue:!1,duration:c,easing:d,complete:function(){a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),typeof g.attr("style")=="object"?(g.attr("style").cssText="",g.attr("style").cssText=k):g.attr("style",k),e&&e.apply(this,arguments),a.dequeue(this)}})})},a.fn.extend({_addClass:a.fn.addClass,addClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{add:b},c,d,e]):this._addClass(b)},_removeClass:a.fn.removeClass,removeClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{remove:b},c,d,e]):this._removeClass(b)},_toggleClass:a.fn.toggleClass,toggleClass:function(c,d,e,f,g){return typeof d=="boolean"||d===b?e?a.effects.animateClass.apply(this,[d?{add:c}:{remove:c},e,f,g]):this._toggleClass(c,d):a.effects.animateClass.apply(this,[{toggle:c},d,e,f])},switchClass:function(b,c,d,e,f){return a.effects.animateClass.apply(this,[{add:c,remove:b},d,e,f])}}),a.extend(a.effects,{version:"1.8.17",save:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.data("ec.storage."+b[c],a[0].style[b[c]])},restore:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.css(b[c],a.data("ec.storage."+b[c]))},setMode:function(a,b){b=="toggle"&&(b=a.is(":hidden")?"show":"hide");return b},getBaseline:function(a,b){var c,d;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":d=0;break;case"center":d=.5;break;case"right":d=1;break;default:d=a[1]/b.width}return{x:d,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e=document.activeElement;b.wrap(d),(b[0]===e||a.contains(b[0],e))&&a(e).focus(),d=b.parent(),b.css("position")=="static"?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"}));return d.css(c).show()},removeWrapper:function(b){var c,d=document.activeElement;if(b.parent().is(".ui-effects-wrapper")){c=b.parent().replaceWith(b),(b[0]===d||a.contains(b[0],d))&&a(d).focus();return c}return b},setTransition:function(b,c,d,e){e=e||{},a.each(c,function(a,c){unit=b.cssUnit(c),unit[0]>0&&(e[c]=unit[0]*d+unit[1])});return e}}),a.fn.extend({effect:function(b,c,d,e){var f=k.apply(this,arguments),g={options:f[1],duration:f[2],callback:f[3]},h=g.options.mode,i=a.effects[b];if(a.fx.off||!i)return h?this[h](g.duration,g.callback):this.each(function(){g.callback&&g.callback.call(this)});return i.call(this,g)},_show:a.fn.show,show:function(a){if(l(a))return this._show.apply(this,arguments);var b=k.apply(this,arguments);b[1].mode="show";return this.effect.apply(this,b)},_hide:a.fn.hide,hide:function(a){if(l(a))return this._hide.apply(this,arguments);var b=k.apply(this,arguments);b[1].mode="hide";return this.effect.apply(this,b)},__toggle:a.fn.toggle,toggle:function(b){if(l(b)||typeof b=="boolean"||a.isFunction(b))return this.__toggle.apply(this,arguments);var c=k.apply(this,arguments);c[1].mode="toggle";return this.effect.apply(this,c)},cssUnit:function(b){var c=this.css(b),d=[];a.each(["em","px","%","pt"],function(a,b){c.indexOf(b)>0&&(d=[parseFloat(c),b])});return d}}),a.easing.jswing=a.easing.swing,a.extend(a.easing,{def:"easeOutQuad",swing:function(b,c,d,e,f){return a.easing[a.easing.def](b,c,d,e,f)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;g||(g=e*.3*1.5);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-0.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,c,d,e,f,g){g==b&&(g=1.70158);return e*(c/=f)*c*((g+1)*c-g)+d},easeOutBack:function(a,c,d,e,f,g){g==b&&(g=1.70158);return e*((c=c/f-1)*c*((g+1)*c+g)+1)+d},easeInOutBack:function(a,c,d,e,f,g){g==b&&(g=1.70158);if((c/=f/2)<1)return e/2*c*c*(((g*=1.525)+1)*c-g)+d;return e/2*((c-=2)*c*(((g*=1.525)+1)*c+g)+2)+d},easeInBounce:function(b,c,d,e,f){return e-a.easing.easeOutBounce(b,f-c,0,e,f)+d},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(b,c,d,e,f){if(c<f/2)return a.easing.easeInBounce(b,c*2,0,e,f)*.5+d;return a.easing.easeOutBounce(b,c*2-f,0,e,f)*.5+e*.5+d}})}(jQuery);/*
 * jQuery UI Effects Blind 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.blind=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"vertical";a.effects.save(c,d),c.show();var g=a.effects.createWrapper(c).css({overflow:"hidden"}),h=f=="vertical"?"height":"width",i=f=="vertical"?g.height():g.width();e=="show"&&g.css(h,0);var j={};j[h]=e=="show"?i:0,g.animate(j,b.duration,b.options.easing,function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}})(jQuery);/*
 * jQuery UI Effects Bounce 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.bounce=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"effect"),f=b.options.direction||"up",g=b.options.distance||20,h=b.options.times||5,i=b.duration||250;/show|hide/.test(e)&&d.push("opacity"),a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var j=f=="up"||f=="down"?"top":"left",k=f=="up"||f=="left"?"pos":"neg",g=b.options.distance||(j=="top"?c.outerHeight({margin:!0})/3:c.outerWidth({margin:!0})/3);e=="show"&&c.css("opacity",0).css(j,k=="pos"?-g:g),e=="hide"&&(g=g/(h*2)),e!="hide"&&h--;if(e=="show"){var l={opacity:1};l[j]=(k=="pos"?"+=":"-=")+g,c.animate(l,i/2,b.options.easing),g=g/2,h--}for(var m=0;m<h;m++){var n={},p={};n[j]=(k=="pos"?"-=":"+=")+g,p[j]=(k=="pos"?"+=":"-=")+g,c.animate(n,i/2,b.options.easing).animate(p,i/2,b.options.easing),g=e=="hide"?g*2:g/2}if(e=="hide"){var l={opacity:0};l[j]=(k=="pos"?"-=":"+=")+g,c.animate(l,i/2,b.options.easing,function(){c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)})}else{var n={},p={};n[j]=(k=="pos"?"-=":"+=")+g,p[j]=(k=="pos"?"+=":"-=")+g,c.animate(n,i/2,b.options.easing).animate(p,i/2,b.options.easing,function(){a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)})}c.queue("fx",function(){c.dequeue()}),c.dequeue()})}})(jQuery);/*
 * jQuery UI Effects Clip 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.clip=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","height","width"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"vertical";a.effects.save(c,d),c.show();var g=a.effects.createWrapper(c).css({overflow:"hidden"}),h=c[0].tagName=="IMG"?g:c,i={size:f=="vertical"?"height":"width",position:f=="vertical"?"top":"left"},j=f=="vertical"?h.height():h.width();e=="show"&&(h.css(i.size,0),h.css(i.position,j/2));var k={};k[i.size]=e=="show"?j:0,k[i.position]=e=="show"?0:j/2,h.animate(k,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()}})})}})(jQuery);/*
 * jQuery UI Effects Drop 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.drop=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","opacity"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"left";a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var g=f=="up"||f=="down"?"top":"left",h=f=="up"||f=="left"?"pos":"neg",i=b.options.distance||(g=="top"?c.outerHeight({margin:!0})/2:c.outerWidth({margin:!0})/2);e=="show"&&c.css("opacity",0).css(g,h=="pos"?-i:i);var j={opacity:e=="show"?1:0};j[g]=(e=="show"?h=="pos"?"+=":"-=":h=="pos"?"-=":"+=")+i,c.animate(j,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);/*
 * jQuery UI Effects Explode 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.explode=function(b){return this.queue(function(){var c=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3,d=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;b.options.mode=b.options.mode=="toggle"?a(this).is(":visible")?"hide":"show":b.options.mode;var e=a(this).show().css("visibility","hidden"),f=e.offset();f.top-=parseInt(e.css("marginTop"),10)||0,f.left-=parseInt(e.css("marginLeft"),10)||0;var g=e.outerWidth(!0),h=e.outerHeight(!0);for(var i=0;i<c;i++)for(var j=0;j<d;j++)e.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(g/d),top:-i*(h/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:g/d,height:h/c,left:f.left+j*(g/d)+(b.options.mode=="show"?(j-Math.floor(d/2))*(g/d):0),top:f.top+i*(h/c)+(b.options.mode=="show"?(i-Math.floor(c/2))*(h/c):0),opacity:b.options.mode=="show"?0:1}).animate({left:f.left+j*(g/d)+(b.options.mode=="show"?0:(j-Math.floor(d/2))*(g/d)),top:f.top+i*(h/c)+(b.options.mode=="show"?0:(i-Math.floor(c/2))*(h/c)),opacity:b.options.mode=="show"?1:0},b.duration||500);setTimeout(function(){b.options.mode=="show"?e.css({visibility:"visible"}):e.css({visibility:"visible"}).hide(),b.callback&&b.callback.apply(e[0]),e.dequeue(),a("div.ui-effects-explode").remove()},b.duration||500)})}})(jQuery);/*
 * jQuery UI Effects Fade 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Fade
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.fade=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"hide");c.animate({opacity:d},{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);/*
 * jQuery UI Effects Fold 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.fold=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.size||15,g=!!b.options.horizFirst,h=b.duration?b.duration/2:a.fx.speeds._default/2;a.effects.save(c,d),c.show();var i=a.effects.createWrapper(c).css({overflow:"hidden"}),j=e=="show"!=g,k=j?["width","height"]:["height","width"],l=j?[i.width(),i.height()]:[i.height(),i.width()],m=/([0-9]+)%/.exec(f);m&&(f=parseInt(m[1],10)/100*l[e=="hide"?0:1]),e=="show"&&i.css(g?{height:0,width:f}:{height:f,width:0});var n={},p={};n[k[0]]=e=="show"?l[0]:f,p[k[1]]=e=="show"?l[1]:0,i.animate(n,h,b.options.easing).animate(p,h,b.options.easing,function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}})(jQuery);/*
 * jQuery UI Effects Highlight 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.highlight=function(b){return this.queue(function(){var c=a(this),d=["backgroundImage","backgroundColor","opacity"],e=a.effects.setMode(c,b.options.mode||"show"),f={backgroundColor:c.css("backgroundColor")};e=="hide"&&(f.opacity=0),a.effects.save(c,d),c.show().css({backgroundImage:"none",backgroundColor:b.options.color||"#ffff99"}).animate(f,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),e=="show"&&!a.support.opacity&&this.style.removeAttribute("filter"),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);/*
 * jQuery UI Effects Pulsate 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.pulsate=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"show");times=(b.options.times||5)*2-1,duration=b.duration?b.duration/2:a.fx.speeds._default/2,isVisible=c.is(":visible"),animateTo=0,isVisible||(c.css("opacity",0).show(),animateTo=1),(d=="hide"&&isVisible||d=="show"&&!isVisible)&&times--;for(var e=0;e<times;e++)c.animate({opacity:animateTo},duration,b.options.easing),animateTo=(animateTo+1)%2;c.animate({opacity:animateTo},duration,b.options.easing,function(){animateTo==0&&c.hide(),b.callback&&b.callback.apply(this,arguments)}),c.queue("fx",function(){c.dequeue()}).dequeue()})}})(jQuery);/*
 * jQuery UI Effects Scale 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.puff=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"hide"),e=parseInt(b.options.percent,10)||150,f=e/100,g={height:c.height(),width:c.width()};a.extend(b.options,{fade:!0,mode:d,percent:d=="hide"?e:100,from:d=="hide"?g:{height:g.height*f,width:g.width*f}}),c.effect("scale",b.options,b.duration,b.callback),c.dequeue()})},a.effects.scale=function(b){return this.queue(function(){var c=a(this),d=a.extend(!0,{},b.options),e=a.effects.setMode(c,b.options.mode||"effect"),f=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:e=="hide"?0:100),g=b.options.direction||"both",h=b.options.origin;e!="effect"&&(d.origin=h||["middle","center"],d.restore=!0);var i={height:c.height(),width:c.width()};c.from=b.options.from||(e=="show"?{height:0,width:0}:i);var j={y:g!="horizontal"?f/100:1,x:g!="vertical"?f/100:1};c.to={height:i.height*j.y,width:i.width*j.x},b.options.fade&&(e=="show"&&(c.from.opacity=0,c.to.opacity=1),e=="hide"&&(c.from.opacity=1,c.to.opacity=0)),d.from=c.from,d.to=c.to,d.mode=e,c.effect("size",d,b.duration,b.callback),c.dequeue()})},a.effects.size=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","width","height","overflow","opacity"],e=["position","top","bottom","left","right","overflow","opacity"],f=["width","height","overflow"],g=["fontSize"],h=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],i=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],j=a.effects.setMode(c,b.options.mode||"effect"),k=b.options.restore||!1,l=b.options.scale||"both",m=b.options.origin,n={height:c.height(),width:c.width()};c.from=b.options.from||n,c.to=b.options.to||n;if(m){var p=a.effects.getBaseline(m,n);c.from.top=(n.height-c.from.height)*p.y,c.from.left=(n.width-c.from.width)*p.x,c.to.top=(n.height-c.to.height)*p.y,c.to.left=(n.width-c.to.width)*p.x}var q={from:{y:c.from.height/n.height,x:c.from.width/n.width},to:{y:c.to.height/n.height,x:c.to.width/n.width}};if(l=="box"||l=="both")q.from.y!=q.to.y&&(d=d.concat(h),c.from=a.effects.setTransition(c,h,q.from.y,c.from),c.to=a.effects.setTransition(c,h,q.to.y,c.to)),q.from.x!=q.to.x&&(d=d.concat(i),c.from=a.effects.setTransition(c,i,q.from.x,c.from),c.to=a.effects.setTransition(c,i,q.to.x,c.to));(l=="content"||l=="both")&&q.from.y!=q.to.y&&(d=d.concat(g),c.from=a.effects.setTransition(c,g,q.from.y,c.from),c.to=a.effects.setTransition(c,g,q.to.y,c.to)),a.effects.save(c,k?d:e),c.show(),a.effects.createWrapper(c),c.css("overflow","hidden").css(c.from);if(l=="content"||l=="both")h=h.concat(["marginTop","marginBottom"]).concat(g),i=i.concat(["marginLeft","marginRight"]),f=d.concat(h).concat(i),c.find("*[width]").each(function(){child=a(this),k&&a.effects.save(child,f);var c={height:child.height(),width:child.width()};child.from={height:c.height*q.from.y,width:c.width*q.from.x},child.to={height:c.height*q.to.y,width:c.width*q.to.x},q.from.y!=q.to.y&&(child.from=a.effects.setTransition(child,h,q.from.y,child.from),child.to=a.effects.setTransition(child,h,q.to.y,child.to)),q.from.x!=q.to.x&&(child.from=a.effects.setTransition(child,i,q.from.x,child.from),child.to=a.effects.setTransition(child,i,q.to.x,child.to)),child.css(child.from),child.animate(child.to,b.duration,b.options.easing,function(){k&&a.effects.restore(child,f)})});c.animate(c.to,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){c.to.opacity===0&&c.css("opacity",c.from.opacity),j=="hide"&&c.hide(),a.effects.restore(c,k?d:e),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);/*
 * jQuery UI Effects Shake 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.shake=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"effect"),f=b.options.direction||"left",g=b.options.distance||20,h=b.options.times||3,i=b.duration||b.options.duration||140;a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var j=f=="up"||f=="down"?"top":"left",k=f=="up"||f=="left"?"pos":"neg",l={},m={},n={};l[j]=(k=="pos"?"-=":"+=")+g,m[j]=(k=="pos"?"+=":"-=")+g*2,n[j]=(k=="pos"?"-=":"+=")+g*2,c.animate(l,i,b.options.easing);for(var p=1;p<h;p++)c.animate(m,i,b.options.easing).animate(n,i,b.options.easing);c.animate(m,i,b.options.easing).animate(l,i/2,b.options.easing,function(){a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)}),c.queue("fx",function(){c.dequeue()}),c.dequeue()})}})(jQuery);/*
 * jQuery UI Effects Slide 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.slide=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"show"),f=b.options.direction||"left";a.effects.save(c,d),c.show(),a.effects.createWrapper(c).css({overflow:"hidden"});var g=f=="up"||f=="down"?"top":"left",h=f=="up"||f=="left"?"pos":"neg",i=b.options.distance||(g=="top"?c.outerHeight({margin:!0}):c.outerWidth({margin:!0}));e=="show"&&c.css(g,h=="pos"?isNaN(i)?"-"+i:-i:i);var j={};j[g]=(e=="show"?h=="pos"?"+=":"-=":h=="pos"?"-=":"+=")+i,c.animate(j,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);/*
 * jQuery UI Effects Transfer 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	jquery.effects.core.js
 */(function(a,b){a.effects.transfer=function(b){return this.queue(function(){var c=a(this),d=a(b.options.to),e=d.offset(),f={top:e.top,left:e.left,height:d.innerHeight(),width:d.innerWidth()},g=c.offset(),h=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({top:g.top,left:g.left,height:c.innerHeight(),width:c.innerWidth(),position:"absolute"}).animate(f,b.duration,b.options.easing,function(){h.remove(),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}})(jQuery);
window.onload = function () {
$('#pageFilters-noSub, #pageFilters-inner').attr("id","pageFilters");
$('#clubLocator1, #clubLocator2, #clubLocator3').attr("id","clubLocator");
$('#clubLocatorN1, #clubLocatorN2, #clubLocatorN3').attr("id","clubLocatorN");
$('#clubLocatorLink1, #clubLocatorLink2, #clubLocatorLink3').attr("id","clubLocatorLink");
$('#clubLocatorLinkN1, #clubLocatorLinkN2, #clubLocatorLinkN3').attr("id","clubLocatorLinkN");

$("#clubLocator, #clubLocatorN").hide(); 

$("#clubLocatorLink").mouseover(function(){  
     $("#clubLocator").stop(true, true).delay(1000).show(0);  
});  

$("#clubLocatorLink").mouseout(function(){  
     $("#clubLocator").stop(true, true).delay(1000).hide(0);                                               
});  

$("#clubLocator").mouseover(function(){  
     $("#clubLocator").stop(true, true).show(0);  
  	 try { document.execCommand("BackgroundImageCache", false, true); }
catch(err) {}

});  

$("#clubLocator").mouseout(function(){  
     $("#clubLocator").stop(true, true).delay(2000).hide(0);  
});

//END Club Locator 

//START Club LocatorN


$("#clubLocatorLinkN").mouseover(function(){  
     $("#clubLocatorN").stop(true, true).delay(1000).show(0);  
});  

$("#clubLocatorLinkN").mouseout(function(){  
     $("#clubLocatorN").stop(true, true).delay(1000).hide(0);                                               
});  

$("#clubLocatorN").mouseover(function(){  
     $("#clubLocatorN").stop(true, true).show(0);  
  	 try { document.execCommand("BackgroundImageCache", false, true); }
catch(err) {}

});  

$("#clubLocatorN").mouseout(function(){  
     $("#clubLocatorN").stop(true, true).delay(2000).hide(0);  
});

$('#clubLocatorLinkN').parents('span').css({"background" : "none", "position" : "relative"});
$('#clubLocatorLinkN').css({"left" : "-5px"});

$(".nav").children().each(function (index) {
						   
			// Get count of columns inside of the dropdowns in order to set the width of the dropdown menu.
			
			var y = $(this).children("a").siblings().children("li").children(".dropDown_new").children(".col").size();
			
			var posL = $(this).position().left;
			 

			// Also determines the placement of the dropdowns depending on the number of columns 
			
			if (y == 3) {
				$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","530px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","400px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","190px");
				
			}
	if (posL == 0) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
        
      } 
			
	  if (posL >= 2 && posL < 100) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-60px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
        
      } 
	  
	  if (posL > 101 && posL < 200) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-100px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-100px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      } 
	   if (posL > 201 && posL < 300) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-180px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-150px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      } 
	  if (posL > 301 && posL < 400) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-260px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-150px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      }
	  if (posL > 401 && posL < 500) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-340px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-250px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      }
	  if (posL > 501 && posL < 600) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-440px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-300px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      }
 });     
	   
$(".nav li").unbind().hover(function(){
		$navElem = $(this);							 
		$.timeout('Sams.Menu', function(){
			$(".nav li ul").hide();
			$navElem.find('ul').show() 
		}, 400);
	},function(e){
		$navElem = $(this);
		$.timeout('Sams.Menu', function(){
			$(".nav li ul").hide();							
		}, 300)
	});
//end navigation 1

$('.nav li ul').unbind().mouseover(function(){
	$.timeout('Sams.Menu');
}).mouseout(function(){
	$navElem = $(this);
	$.timeout('Sams.Menu', function(){
		$(".nav li ul").hide();							
	}, 300)
});


$(".nav2").children().each(function (index) {
								   
			// Get count of columns inside of the dropdowns in order to set the width of the dropdown menu.
			
			var y = $(this).children("a").siblings().children("li").children(".dropDown_new").children(".col").size();
			
			var posL = $(this).position().left;
			 

			// Also determines the placement of the dropdowns depending on the number of columns 
			
			if (y == 3) {
				$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","530px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","400px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","190px");
				
			}
	if (posL == 0) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
        
      } 
			
	  if (posL >= 2 && posL < 100) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-60px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
        
      } 
	  
	  if (posL > 101 && posL < 200) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-100px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-100px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      } 
	   if (posL > 201 && posL < 300) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-180px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-150px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      } 
	  if (posL > 301 && posL < 400) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-260px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-150px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      }
	  if (posL > 401 && posL < 500) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-340px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-250px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      }
	  if (posL > 501 && posL < 600) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-440px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-300px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      }
});

$(".nav2 li").unbind().hover(function(){
		$navElem = $(this);							 
		$.timeout('Sams.Menu', function(){
			$(".nav2 li ul").hide();
			$navElem.find('ul').show() 
		}, 400);
	},function(e){
		$navElem = $(this);
		$.timeout('Sams.Menu', function(){
			$('.nav2 li ul').hide();							
		}, 300)
	});
//end navigation 1

$('.nav2 li ul').unbind().mouseover(function(){
	$.timeout('Sams.Menu');
}).mouseout(function(){
	$navElem = $(this);
	$.timeout('Sams.Menu', function(){
		$('.nav2 li ul').hide();							
	}, 300)
});

$(".nav3").children().each(function (index) {
								   
			// Get count of columns inside of the dropdowns in order to set the width of the dropdown menu.
			
			var y = $(this).children("a").siblings().children("li").children(".dropDown_new").children(".col").size();
			
			var posL = $(this).position().left;
			 

			// Also determines the placement of the dropdowns depending on the number of columns 
			
			if (y == 3) {
				$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","530px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","400px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings().children("li").children(".dropDown_new").css("width","190px");
				
			}
	if (posL == 0) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
        
      } 
			
	  if (posL >= 2 && posL < 100) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-60px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","0px");
				
			}
        
      } 
	  
	  if (posL > 101 && posL < 200) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-100px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-100px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      } 
	   if (posL > 201 && posL < 300) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-180px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-150px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      } 
	  if (posL > 301 && posL < 400) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-260px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-150px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      }
	  if (posL > 401 && posL < 500) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-340px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-250px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      }
	  if (posL > 501 && posL < 600) {
		  
			if (y == 3) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-440px");
				
			}
			if (y == 2) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-300px");
				
			}
			if (y == 1) {
				$(this).children("a").siblings("ul").children("li").children(".dropDown_new").css("left","-50px");
				
			}
        
      }
   });   
	   
$(".nav3 li").unbind().hover(function(){
		$navElem = $(this);							 
		$.timeout('Sams.Menu', function(){
			$(".nav3 li ul").hide();
			$navElem.find('ul').show() 
		}, 400);
	},function(e){
		$navElem = $(this);
		$.timeout('Sams.Menu', function(){
			$('.nav3 li ul').hide();							
		}, 300)
	});
//end navigation 1

$('.nav3 li ul').unbind().mouseover(function(){
	$.timeout('Sams.Menu');
}).mouseout(function(){
	$navElem = $(this);
	$.timeout('Sams.Menu', function(){
		$('.nav3 li ul').hide();							
	}, 300)
});

$(".btnAvailable").parent("a").each(function(i) {
		$(this).bind("click", function() {
			$(".pop-cart").hide();
			$("#product_"+(i+1)).show();
			
			return false;
		});
	});

$(".pop-cart a.fright").each(function(i) {
		$(this).bind("click", function() {
			$("#product_"+(i+1)).hide();
			
			return false;
		});
	});

// Membership Auto-Renewal Pop-up

$(".pop-cart").hide();
$("#renewPop").hide();
$("#changeRenew").click(function () {
	$("#renewPop").show();
return false;
});
$("#autoClose").click(function () {
	$("#renewPop").hide();
return false;
});
// Membership Auto-Renewal Pop-up Ends

//Start PASupport:: 25th May, 2011 :: 7647 :: Misalignment in the Availability pop up 
// -------------Availability Pop-up
/*$("#available_1").mouseover(function() {
		$("#product_1").show();	 	
	});
	$("#product_1").mouseover(function() {
		$("#product_1").show();	 	
	});
	$("#product_1").mouseout(function() {
		$("#product_1").hide();	 	
	});*/
// -------------Availability Pop-up Ends
//End PASupport:: 25th May, 2011 :: 7647 :: misalignment in the Availability pop up 	
	
// ---------------Product Checkbox and Sorting
	$("#selectproCheck").click(function() {
		var checked_status = this.checked;
		$("input[name$=proCheck]").each(function(i)
		{
			if (this.checked = checked_status) {
				$("#iceproduct_"+(i)).removeClass("iceberg-product");
				$("#iceproduct_"+(i)).addClass("iceberg-productSelected");
				$("#selectAllTop").text("Unselect All");
				$("#selectAllBottom").text("Unselect All");
			} else {
				$("#iceproduct_"+(i)).removeClass("iceberg-productSelected");
				$("#iceproduct_"+(i)).addClass("iceberg-product");
				$("#selectAllTop").text("Select All");
				$("#selectAllBottom").text("Select All");
			}
		});
	});
	
	$("#selectproCheck2").click(function() {
		var checked_status = this.checked;
		$("input[name$=proCheck]").each(function(i)
		{
			if (this.checked = checked_status) {
				$("#iceproduct_"+(i)).removeClass("iceberg-product");
				$("#iceproduct_"+(i)).addClass("iceberg-productSelected");
				$("#selectAllTop").text("Unselect All");
				$("#selectAllBottom").text("Unselect All");
			} else {
				$("#iceproduct_"+(i)).removeClass("iceberg-productSelected");
				$("#iceproduct_"+(i)).addClass("iceberg-product");
				$("#selectAllTop").text("Select All");
				$("#selectAllBottom").text("Select All");
			}
		});
	});
	
	$("input[name$=proCheck]").each(function(i) {
			$(this).bind("click", function () {
			var checked_status = this.checked;								 
			if (this.checked = checked_status) {
				$("#iceproduct_"+(i-1)).removeClass("iceberg-product");
				$("#iceproduct_"+(i-1)).addClass("iceberg-productSelected");
			} else {
				$("#iceproduct_"+(i-1)).removeClass("iceberg-productSelected");
				$("#iceproduct_"+(i-1)).addClass("iceberg-product");
			}
		});
			});
	
// --------------Product Checkbox and Sorting Ends


// ---------- Membership Details
	$("#indiLink").click(function() {
		$("#lgBizLink").removeClass("lgBiz-active");
		$("#lgBizLink").addClass("lgBiz");
		$("#smallBizLink").removeClass("smallBiz-active");
		$("#smallBizLink").addClass("smallBiz");
		$(this).removeClass("indiMem");
		$(this).addClass("indiMem-active");
		$("#indiHouse").fadeIn();
		$("#smallCorp").hide();
		$("#largeCorp").hide();
								  
								  });
	$("#smallBizLink").click(function() {
		$("#indiLink").removeClass("indiMem-active");
		$("#indiLink").addClass("indiMem");
		$("#lgBizLink").removeClass("lgBiz-active");
		$("#lgBizLink").addClass("lgBiz");
		$(this).removeClass("smallBiz");
		$(this).addClass("smallBiz-active");
		$("#indiHouse").hide();
		$("#smallCorp").fadeIn();
		$("#largeCorp").hide();
								  
								  });
	$("#lgBizLink").click(function() {
		$("#indiLink").removeClass("indiMem-active");
		$("#indiLink").addClass("indiMem");
		$("#smallBizLink").removeClass("smallBiz-active");
		$("#smallBizLink").addClass("smallBiz");
		$(this).removeClass("lgBiz");
		$(this).addClass("lgBiz-active");
		$("#indiHouse").hide();
		$("#smallCorp").hide();
		$("#largeCorp").fadeIn();
								  
								  });
	
// ---------- Membership Details Ends
	
	
// ---------Shopping Tools Dropdown
$("#shopToolsLink").click(function () {
       $("#searchDrop").css({ visibility:"hidden" });
	   $("#shopDrop").show();
	  $("#shopDrop").bgiframe({ opacity: false });
	  $("#sub-nav-oneTier ul").css({ float:"none" });

    });
	
	$("#shopDrop").click(function () {
	 $("#searchDrop").css({ visibility:"visible" });
     $("#shopDrop").hide();
	 $("#sub-nav-oneTier ul").css({ float:"left" });
	
    });
// ---------Shopping Tools Dropdown Ends

// --------- Allows keyed entries
$("#monthsdropdown").keyup(function(event){
		if (event.keyCode == 49) {
			$("#jan").attr("selected","selected");
		}
		if (event.keyCode == 50) {
			$("#feb").attr("selected","selected");
		}
		if (event.keyCode == 51) {
			$("#mar").attr("selected","selected");
		}
		if (event.keyCode == 52) {
			$("#apr").attr("selected","selected");
		}
		if (event.keyCode == 53) {
			$("#may").attr("selected","selected");
		}
		if (event.keyCode == 54) {
			$("#jun").attr("selected","selected");
		}
		if (event.keyCode == 55) {
			$("#jul").attr("selected","selected");
		}
		if (event.keyCode == 56) {
			$("#aug").attr("selected","selected");
		}
		if (event.keyCode == 57) {
			$("#sept").attr("selected","selected");
		}
		
	});
// --------- Allows keyed entries Ends
}

function showhide(id){
if (document.getElementById){
obj = document.getElementById(id);
if (obj.style.display == "none"){
obj.style.display = "";
} else {
obj.style.display = "none";
}
}
}
//-- R2 Taxware s1sivap START
function hidePopUp(id){
	if (document.getElementById){
		obj = document.getElementById(id);
		if (obj != null) {
			obj.style.display = "none";
		}
	}
}
//-- R2 Taxware s1sivap END
(function($){
	var reg = {};
	$.timeout = function(key, fn, time, args){
		var args = args || [];
		if(reg[key] != undefined){
			clearTimeout(reg[key]);
		}
		
		if(arguments.length > 1){
			var fnWrapper = function(){ fn.apply(this, args); };
			reg[key] = setTimeout(fnWrapper, time);
		}
	}
	
})(jQuery)

var $=jQuery.noConflict();

/* begin 11.8 UX updates: Searchbar and Filters */

(function($){
	$('.searchBarNew').ready(function(){
		$('form[name="searchForm"]').submit(function(){
			string=$(this).find('#searchBar').val();
			if(string==='Search' || string===''){
				return false;
			}else{
				return true;
			}
			return false;
		});
		$('#searchSelect').hide();
		if($('#searchBar').val()=='Search'){$('#searchBar').addClass('out');}
		$('#searchBar').focus(function(){if($(this).val()=='Search'){$(this).removeClass('out').val('');}});
		$('#searchBar').blur(function(){if($(this).val()==''){$(this).addClass('out').val('Search');}});
		$('#searchBar').after('<div id="searchSelectJSWrapper" tabindex="100"><span id="searchSelectJS">All SamsClub<span class="arrow"></span></span><ul></ul></div>');
		$('.searchBarNew').children(':not(":last")').wrapAll('<span id="searchBarJS">');
		$('#searchSelect>option').each(function(){
                    var textvalue=$(this).text();
                    $(this).text($.trim(textvalue));
                    $('#searchSelectJSWrapper>ul').append('<li><a href="#">'+$.trim(textvalue)+'</a></li>');});
		$('#searchSelectJSWrapper>ul').hide();
		$('#searchSelectJS').click(function(){$(this).closest('#searchBarJS').toggleClass('dropdown');$(this).siblings('ul').toggle(200);return false;});
		var searchHoverTimeout;
		$('#searchSelectJSWrapper').hover(function(){clearTimeout(searchHoverTimeout);},function(){searchHoverTimeout=setTimeout(function(){$('#searchBarJS').removeClass('dropdown');$('#searchSelectJS').siblings('ul').hide(200);},500);});
		
		$('#searchSelectJSWrapper a').click(function(){
			//console.log($(this).text());
			var text=$(this).text();
                        var keepvalue=$.trim(text);
                        var trimtext=$.trim(text);
			trimtext=(trimtext.length>=15) ? $.trim(trimtext.substr(0,12))+'...' : trimtext;
			$(this).closest('#searchSelectJSWrapper').children('#searchSelectJS').html(trimtext+'<span class="arrow"></span>');
			$(this).addClass('current').parent().siblings().children().removeAttr('class');
                        $('#searchSelect option:selected').removeAttr("selected");
                        $("#searchSelect option").each(function() {
                            if($(this).text() == keepvalue){
                                $(this).attr("selected","selected");
                            }
                        });
			$('#searchBarJS').removeClass('dropdown');
			$('#searchSelectJS').siblings('ul').hide(200);
			return false;
		});
                var preSearchCategoryId=$("#preSearchCategoryId").val();
                if(preSearchCategoryId!=undefined && preSearchCategoryId!=''){
                    var isExistCategory=false;
                    $('#searchSelect option').each(function(){
                        if($(this).val()==preSearchCategoryId){
                            isExistCategory=true;
                        }
                    });
                    if(isExistCategory){
                        $('#searchSelect').val(preSearchCategoryId);
                    }
                }
		selectedO=$('#searchSelect').children('option:selected');
		selected=selectedO.index('#searchSelect option');
		$('#searchSelectJSWrapper>ul>li').eq(selected).children('a').addClass('current');
		var text=selectedO.text();
                var tirmtext=$.trim(text);
		tirmtext=(tirmtext.length>=15) ? $.trim(tirmtext.substr(0,12))+'...' : tirmtext;
		$('#searchSelectJSWrapper').children('#searchSelectJS').html(tirmtext+'<span class="arrow"></span>');
		var barPad=$('#searchSelectJS').outerWidth()+5,barWidth=295-barPad;
		$('#searchBar').css({'width':barWidth,'padding-right':barPad});
	});
	$('#clubChangeAlert>a.close').live('click',function(){//Close Button
		$('#clubChangeAlert').animate({'opacity':'0','height':'0px'},400,function(){$(this).css('display','none');});
		return false;
	});
})(jQuery)

/* end 11.8 UX updates: Searchbar and Filters */
//Start PASupport: 17Aug2011 (Site Redesign Update)
function trackEvent(tag){
	page=document.location.href;
	title=$('.pageTitle').eq(0).text();
	if(title==''){title=$('title').text();}
	title=title.replace(' ','');
	if(page.search(/\?/)>=0){page+='&iid='+title+'|'+tag;}else{page+='?iid='+title+'|'+tag;}
	$.get(page);
}


function openPopupWindow(content,content2){
	if(content==undefined){
		//popup is empty, aborting...
		return false;
	}
	$('body').append('<div class="popupOverlay"></div><div class="popupWindow"><div class="popupCornerTL"></div><div class="popupCornerTop"></div><div class="popupCornerLeft"></div><div class="popupCornerBottom"></div><div class="popupCornerRight"></div><div class="popupCornerBL"></div><div class="popupCornerBR"></div><a href="#" class="popupClose">Close Popup Window</a><div class="popupLogo"></div><div class="popupContent"><div class="popupContentInner"></div></div></div>');
	$('.popupOverlay').add('.popupWindow').fadeOut(0);
	$('.popupOverlay').fadeTo(400,0.6);
	$('.popupWindow').fadeIn(400);
	
	if(typeof(content)=='string' && content.match('^http[s]?://')){
		// url - do xhr
		if(document.location.href.match(/https:\/\//)){
			protocol='https://';
		}else{
			protocol='http://';
		}
		
		$('.popupContentInner').append('<img src="'+protocol+'www.samsclub.com/sams/images/cartAjax_loading.gif" style="display:block;margin:auto;" />');
		
		pageName=content.replace(/\&|\?iid=[\w\W]+\&?/,'').replace(/(https?:\/\/)?[A-Za-z0-9\/ \_\-\%\#\@\+\.\?]*(pageName\=|\/)/,'');
		trackEvent(pageName+'|popup|page');
				
		if(content.match('https')){
			$('.popupContent').after('<iframe class="popupContent" src="'+content+'" id="secure_popup_content" style="width:740px;border:0;padding:0;margin:0 -10px;overflow:auto;overflow-x:hidden;overflow-y:auto;"></iframe>');
			$('div.popupContent').remove();
			//checkPopupHeight();
			$('iframe.popupContent').load(function(){
				checkPopupHeight();
			});
		}else{
			$.get(content, function(data){
				html = data.replace(/<head>[\w\W]+<\/head>/gim,'').replace(/<\!DOCTYPE[\w\W]+\><html>/gim,'').replace(/(<body>|<\/body>|<\/html>)/gim,'')
				.replace(/document.write/gi,'//document.write')
				.replace(/<script[ A-Za-z0-9\'\"\-\_\=\+\[\]\{\}\;\:\.\,\?\\!\@\#\$\%\^\&\*\(\)\/\\]*src=('|")[ A-Za-z0-9\'\"\-\_\=\+\[\]\{\}\;\:\.\,\?\\!\@\#\$\%\^\&\*\(\)\/\\]*(jquery)[ A-Za-z0-9\'\"\-\_\=\+\[\]\{\}\;\:\.\,\?\\!\@\#\$\%\^\&\*\(\)]*\.js('|")[ A-Za-z0-9\'\"\-\_\=\+\[\]\{\}\;\:\.\,\?\\!\@\#\$\%\^\&\*\(\)\/\\]*><\/script>/gi,'')
				.replace(/<noscript[ \w\W\n\r]*<\/noscript>/gim,'')
				.replace(/window\.close\(\)/gim,'$(\'.popupOverlay\').click();return false;');
							
				if(html=='' || html==undefined){$('.popupContent').html('<h2>Error Opening</h2><p>Please try again later.</p>');return false;}//Content returned is empty, give error feedback
				
				$('.popupContent').removeClass('loading').children('.popupContentInner').html(html);
				checkPopupHeight();
			});
			$('.popupContent').ajaxError(function(){
				$('.popupContent .popupContentInner').html('<h2>Error Opening</h2><p>Please try again later.</p>');
			});
		}
		
	}else{
		if(content=='FLASH'){
			if(typeof(content2)=='object'){
				
				flvName=content2.url.replace(/\&|\?iid=[\w\W]+\&?/,'').replace(/(https?:\/\/)?[A-Za-z0-9\/ \_\-\%\#\@\+\.\?]*\//,'');
				trackEvent(flvName+'|popup|video');
				
				$('.popupContent .popupContentInner').empty().append('<div id="popupWindowVideo"></div>');
				$('#popupWindowVideo').css('height',content2.height);
				var fv={'screen':content2.screen,'video':content2.url,'width':content2.width,'height':content2.height};
				swfobject.embedSWF("http://scene7.samsclub.com/is/content/samsclub/Video_Player_v1?v=2","popupWindowVideo",content2.width,content2.height,"9.0.0","/sams/swf/expressInstall.swf",fv,{wmode:"transparent",allowscriptaccess:"always"});
				checkPopupHeight();
			}else{
				// flash config is fubar, aborting.
				return false;
			}
		}else{
			$(content).clone().css({'display':'block','visibility':'visible','opacity':'1'}).appendTo($('.popupContentInner'));
			
			contentName=$(content).attr('id');
			if(contentName==''){contentName=$(content).find('h1:first,h2:first,h3:first,h4:first,h5:first,strong:first').eq(0).text();}
			if(contentName==''){contentName=$.trim($(content).text()).substr(0,20).replace(/ /gm,'');}
			trackEvent(contentName+'|popup|content');
			checkPopupHeight();
		}
	}
	$('.popupClose,.popupOverlay').live('click',function(){
		$('.popupOverlay').add('.popupWindow').fadeOut(400,function(){$(this).remove();});
		return false;
	});
}
function checkPopupHeight(){
	var scrollHeight = new Number;
		
	if($('.popupContent')[0] && $('.popupContent')[0].nodeName.toLowerCase()=='iframe'){
		scrollHeight=$('.popupContent').contents().find('html')[0].scrollHeight;
	}else{
		scrollHeight=$('.popupContent .popupContentInner').height();
	}
		
	if(($('.popupContent').outerHeight()+100)>$(window).height() || scrollHeight > $('.popupContent').outerHeight()){	
		$('.popupWindow').css({'width':'740px','padding':'10px 0 0 0'}).find('#mainContent,#helpContent-negativeTop').css('padding','0');
		$('.popupLogo').css({'margin-left':'-1px'});
		$('.popupContent').css({'height':($(window).height()-200)+'px','overflow':'auto','overflow-x':'hidden'});
	}else{
		var height = new Number;
		if($(window).height()-200 < parseInt(scrollHeight)){
			height = parseInt($(window).height())-200;
		}else{
			height = parseInt(scrollHeight);
		}
		$('.popupContent').css({'height':height+'px','overflow':'auto','overflow-x':'hidden'});
	}
}
$(window).resize(function(){
	checkPopupHeight();
});

function openPopup(url,e){
	proto=location.protocol;
	sub=location.host.split('.').shift();
	if(sub=='samsclub'){sub='www'}
	if(!url.match(/https?:\/\//)){url=proto+'//'+sub+'.samsclub.com/'+url;}	
	openPopupWindow(url);
}
//End PASupport: 17Aug2011 (Site Redesign Update)

/* Start PASupport: 19 August, 2011 :: Membership purchase checkout (Site Redesign)*/
$('#joinNow').ready(function(){
	var hoverTimeout,
		leaveTimeout,
		tableTimeout;
	 	if (typeof benefitTitle!=="undefined" && typeof benefitDefault!=="undefined") {
		$('#joinNow').find('th').parent().append(benefitTitle).closest('table').find('tbody').find('td').eq(0).parent().append(benefitDefault);
		$('#joinNow tbody td:not(".memInfo"),#joinNow label,#joinNow input[type=radio]').css({'cursor':'pointer'});
		$('#joinNow td:not(".memInfo")').click(function(){
			$(this).parent().find('input[type="radio"]').attr('checked',true);
		});
		
		$('#joinNow td,.memInfo').hover(function(){
			clearTimeout(leaveTimeout);clearTimeout(hoverTimeout);
			tr=$(this).parent();
			if($(this).hasClass('memInfo')){return false;}
			hoverTimeout=setTimeout(function(){
				tr.siblings().find('td:not(".memInfo")').css({'background':''});
				$('#joinNowArrow').remove();
				//START : Site Stabilization R12.8 | Defect Fix CASE00456609
				tr.find('td:not(".memInfo")').css({'background':'#efefef','background-position':'-20px top'}).eq(0).css({'background':'#efefef'});
				//END : Site Stabilization R12.8 | Defect Fix CASE00456609
				offTop=tr.children('td:first').position().top;
				offLeft=tr.children('td:eq(0)').outerWidth(true) + tr.children('td:eq(1)').outerWidth(true);
				tr.children('td').eq(1).append('<div id="joinNowArrow"></div>');
				$('#joinNowArrow').css({'top':offTop,'left':offLeft});
				name=tr.children('td').eq(0).text();
				// Start PA Modified for 12.9 MVP changes 
				if(name.match(/Advantage Plus/)){				
					$('.memInfo').html(benefitsText.advPlus);
				}else if(name.match(/Advantage/)){
					$('.memInfo').html(benefitsText.adv);
				}else if(name.match(/Business Plus/)){
					$('.memInfo').html(benefitsText.busPlus);
				}else if(name.match(/Plus Membership/)){
					$('.memInfo').html(benefitsText.pplus);
				}else if(name.match(/Savings Membership/)){
					$('.memInfo').html(benefitsText.padv);
				}else if(name.match(/Sam\'s Business Membership/)){
					$('.memInfo').html(benefitsText.pbus);
				}else if(name.match(/Business/)){
					$('.memInfo').html(benefitsText.bus);
				}
				// End PA Modified for 12.9 MVP changes 
			},100);
		},function(){
			tr=$(this).parent();
			clearTimeout(leaveTimeout);clearTimeout(hoverTimeout);
			leaveTimeout=setTimeout(function(){
				tr.find('td:not(".memInfo")').css({'background':''});
				$('#joinNowArrow').remove();
				$('.memInfo').html(benefitsText.def);
			},100);
		});
		$('#joinNow').hover(function(){
			clearTimeout(tableTimeout);return true;
		},function(){
			clearTimeout(tableTimeout);
			tableTimeout=setTimeout(function(){
				tr.siblings().find('td:not(".memInfo")').css({'background':''});
				$('#joinNowArrow').remove();
				$('.memInfo').html(benefitsText.def);
			},100);
		});		
	}	
});
/* End PASupport: 19 August, 2011 :: Membership purchase checkout (Site Redesign)*/

//Start PASupport Site-Enhancements User Story 3 18 jan 2012 : Adding new method to display club locator pop-up
function openClubLocatorOverlay(content){
	if(content==undefined){
		//popup is empty, aborting...
		return false;
	}
	$('body').append('<div class="clubpopupOverlay"></div><div class="popupModalWindow clubLoc"><div class="popupCornerTL"></div><div class="popupCornerTop"></div><div class="popupCornerLeft"></div><div class="popupCornerBottom"></div><div class="popupCornerRight"></div><div class="popupCornerBL"></div><div class="popupCornerBR"></div><a href="#" class="popupClose">Close Popup Window</a><div class="popupModalContent"><div class="popupContentInner"></div></div></div>');
	
	/* To avoid modal window to appear off screen - Prashant/SamsClub*/
	var newTop = $(document).scrollTop();
	var clubTop = newTop + 100;
	$('.clubLoc').css("top",clubTop);
	//alert(newTop);
	/* */
	
	$('.clubpopupOverlay').add('.popupModalWindow').fadeOut(0);
	$('.clubpopupOverlay').fadeTo(100,0.6);
	$('.popupModalWindow').fadeIn(100);
	
	if(typeof(content)=='string' && content.match('')){		
		$('.popupContentInner').load(content);
	}else{
		$(content).clone().css({'display':'block','visibility':'visible','opacity':'1'}).appendTo($('.popupContentInner'));
		contentName=$(content).attr('id');
		if(contentName==''){contentName=$(content).find('h1:first,h2:first,h3:first,h4:first,h5:first,strong:first').eq(0).text();}
		if(contentName==''){contentName=$.trim($(content).text()).substr(0,20).replace(/ /gm,'');}
		trackEvent(contentName+'|popup|content');
		checkPopupHeight();	
	}
	$('.popupClose').live('click',function(){
	$('.clubpopupOverlay').add('.popupModalWindow').fadeOut(400,function(){$(this).remove();});
		return false;
	});
}
//End PASupport
//Start PASupport S2 preference center
function closeModal(){
	var close="later";
	submitPrefPopUp(close);
	$('.popupOverlay').add('.popupWindow').fadeOut(400,function(){$(this).remove();});
	
}

function openPrefCenterModal(content,headContent){
	
if(content==undefined){
	//popup is empty, aborting...
	return false;
}
$('body').append('<div class="popupOverlay"></div><div class="popupWindow"><div class="popupCornerTL"></div><div class="popupCornerTop" align="center" style="padding:5px 0;">'+headContent+'</div><div class="popupCornerLeft"></div><div class="popupCornerBottom"></div><div class="popupCornerRight"></div><div class="popupCornerBL"></div><div class="popupCornerBR"></div><a href="javascript:closeModal();" class="popupClose">Close Popup Window</a><div class="popupContent" style="margin-top:10px;"><div class="popupContentInner"></div></div></div>');
$('.popupOverlay').add('.popupWindow').fadeOut(0);
$('.popupOverlay').fadeTo(400,0.6);
$('.popupWindow').fadeIn(400);

if(typeof(content)=='string' && content.match('')){
	
	$('.popupContentInner').load(content);	
}

}
function submitPrefPopUp(val){	
	document.getElementById("alertFlag").value=val;
	document.prefPopUpForm.submit();
}
//End PASupport S2 preference center

//Start Infosys :: 12.9 Release :: RAF POPUP
function callRAFOverlay(contextPath,rafoverlay,pageRefreshonclick){	
	var newTopPostion = $(document).scrollTop();
	newTopPostion = newTopPostion + 160;	
	$('.Referafriend-Overlay-Container').css('display','block');		
	$('#rafoverlay').empty();	
	pagepath = contextPath+	'/account/referal/rafPopupOverlay.jsp?overlay='+rafoverlay+'&pageRefreshonclick='+pageRefreshonclick;
	$.get(pagepath, function(result){
		$('#rafoverlay').html(result);
	});
	$('#rafoverlay').css("top",newTopPostion);
	$('#rafoverlay').css("left","150px");
	$('#rafoverlay').css("position","absolute");
	$('#rafoverlay').css("z-index","99999");		
	$('.Referafriend-Overlay-Content').css('position','fixed');	
}
//End Infosys :: 12.9 Release :: RAF POPUP
var regFocus = ""; function focusOnEmailField() { document.getElementById("mail").focus(); } function focusOnUserNameField() { document.getElementById("username").focus(); } function setFocus() { if (document.getElementById("fName")) { document.getElementById("fName").focus(); } } function showMap(club_id, url) { var href = url + "&myClub=" + club_id; if (!window.focus) return true; window.open(href, '', 'width=625, height=500, menubar=yes, scrollbars=yes,resizable=yes'); } function updateNeedHaveQunatities(formObj) { var needQts = ""; for (counter = 0; counter <= size; counter++) { if (document.getElementById('need' + counter) != null) { var name = document.getElementById('need' + counter).name; var value = document.getElementById('need' + counter).value; needQts = needQts + name + "=" + value + ","; } } formObj["/atg/commerce/gifts/GiftlistFormHandler.updateNeed"].value = needQts; var haveQts = ""; for (counter = 0; counter <= size; counter++) { if (document.getElementById('have' + counter) != null) { var name = document.getElementById('have' + counter).name; var value = document.getElementById('have' + counter).value; haveQts = haveQts + name + "=" + value + ","; } } formObj["/atg/commerce/gifts/GiftlistFormHandler.updateHave"].value = haveQts; var storeDeliverQuantities = ""; for (counter = 0; counter <= size; counter++) { if (document.getElementById('delqty' + counter) != null) { var name = document.getElementById('delgiftItemid' + counter).name; var value = document.getElementById('delqty' + counter).value; storeDeliverQuantities = storeDeliverQuantities + counter + "=" + value + ","; } } formObj["/atg/commerce/gifts/GiftlistFormHandler.storeDeliverQuantities"].value = storeDeliverQuantities; var storePickupQuantities = ""; for (counter = 0; counter <= size; counter++) { if (document.getElementById('pickqty' + counter) != null) { var name = document.getElementById('pickqty' + counter).name; var value = document.getElementById('pickqty' + counter).value; storePickupQuantities = storePickupQuantities + counter + "=" + value + ","; } } formObj["/atg/commerce/gifts/GiftlistFormHandler.storePickupQuantities"].value = storePickupQuantities; /* * * * * R2 * * * EGiftCards * * * VGDESAI * * * start */ var storeEGiftCardAmount = ""; for (counter = 0; counter <= size; counter++) { if (document.getElementById('eGiftCardAmount' + counter) != null) { var name = document.getElementById('eGiftCardAmount' + counter).name; var value = document.getElementById('eGiftCardAmount' + counter).value; storeEGiftCardAmount = storeEGiftCardAmount + counter + "=" + value + ","; } } formObj["/atg/commerce/gifts/GiftlistFormHandler.storeEGiftCardAmounts"].value = storeEGiftCardAmount; /* * * * * R2 * * * EGiftCards * * * VGDESAI * * * end */ formobj.submit(); } function addMapPriceToCartDelivary() { document.getElementById("delivary").value = '1'; document.MapPriceToCart.submit(); } function addMapPriceToCartPickup() { document.getElementById("pickup").value = '1'; document.MapPriceToCartPickup.submit(); } function addToMapPickup(form, pickup) { form.elements[pickup].value = '1'; form.submit(); } function updateClubSelection(form, clubId) { document.getElementById("clubId").value = clubId; } function addToMapDelivary(form, delivary) { form.elements[delivary].value = '1'; form.submit(); } function submitOptOut() { document.privacyOptOutForm.optOutSub.value = 'submit'; document.privacyOptOutForm.submit(); } function isPageloaded(id, value) { if (isloaded == null) { document.getElementById(id).href = value; } else { document.getElementById(id).href = '#'; } } function selectAll(elemId) { if (document.getElementById('SelectAll1').firstChild.nodeValue != selectAllMessage) { document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage; document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } else { document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage; document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } for (i = 0; i < size; i++) { var item = document.getElementById(elemId + i); if (item != null) { if (document.getElementById('SelectAll1').firstChild.nodeValue != selectAllMessage) { item.checked = true; } else { item.checked = false; } } } } function SelectAll2(elemId) { var checkedd = ''; for (i = 0; i < size; i++) { var item = document.getElementById(elemId + i); if (item != null && !item.checked) { checkedd = 'false'; } } if (checkedd == 'false') { document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage; document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } else { document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage; document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } } function deleteList(formObj, name) { var wishcheckboxchecked = "false"; var shopcheckboxchecked = "false"; for (counter = 1; counter <= wishlistsize; counter++) { var wishlist = document.getElementById('wish' + counter).checked; if (wishlist) { wishcheckboxchecked = "true"; } } for (counter = 1; counter <= shoppinglistsize; counter++) { var shoplist = document.getElementById('shop' + counter).checked; if (shoplist) { shopcheckboxchecked = "true"; } } if (wishcheckboxchecked == "true" || shopcheckboxchecked == "true") { formObj.name.value = 'submit'; formObj.submit(); } else { document.getElementById('listError').innerHTML = '<div class="scrollingPromo"><div align="center"><span class="errorRed">Please select one or more lists to remove! </span></div></div>'; } } function callSubmit(formObj) { var checkboxchecked = "false"; var giftListIds = ""; for (counter = 0; counter < size; counter++) { var checkBoxName = document.getElementById('giftCheck' + counter); if (checkBoxName.checked) { giftListIds = giftListIds + checkBoxName.value + ","; checkboxchecked = "true"; } } if (checkboxchecked == "true") { formObj["/atg/commerce/gifts/GiftlistFormHandler.selectedGiftListItem"].value = giftListIds; formObj.submit(); } else { document.getElementById('listError').innerHTML = '<div class="scrollingPromo"><div align="center"><span class="errorRed">Uh-oh!...It looks like you forgot to select a list item. Please select a list item before proceeding.</span></div></div>'; } } function Check(formObj, chk) { var total = ""; checkCount = 0; count = 0; var objField = formObj.elements[chk]; count = objField.length; if (count != null) { for (i = 0; i < count; i++) { if (objField[i].checked) { total = checkCount + 1; checkCount++; } else if (objField[i] == "") { total = checkCount + 1; checkCount++; } } } else { total = 1; if (objField.checked) { count = 1; } else { count = 0; } } if (total == count) { unCheckAll(formObj); if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage; } } else { checkAll(formObj); if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage; } } } function Check2(formObj, chk) { var objField = formObj.elements[chk]; total = objField.length; if (total != null) { count = 0; checkCount = 0; for (i = 0; i < total; i++) { if (objField[i].checked) { count = checkCount + 1; checkCount++; } } if (total == count) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage; } } if (total != count) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage; } } } else { if (objField.checked) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage; } } else { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } if (document.getElementById('SelectAll1')) { document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage; } } } } function selectRefreshMultiplePay(param, value) { var URL = ""; if (value == 'combination') { var formObj = document.selectpmfrm; formObj["/atg/commerce/order/purchase/PaymentGroupFormHandler.populateProfileCardsIntoOrder"].value = "submit"; formObj.submit(); } else { URL = window.location.pathname + '?' + param + '=' + value; window.location.href = URL; } } function selectRefresh(param, value) { var URL = window.location.pathname + '?' + param + '=' + value; window.location.href = URL; } function checkAll(formObj) { count = formObj.elements.length; for (i = 0; i < count; i++) { formObj.elements[i].checked = true; } } function confirmDeletion() { if (confirm("Are you Sure You Want to Delete this List(s)?")) { return true; } else { return false; } } function confirmDeletionForItems() { if (confirm("Are you Sure You Want to Delete items from the List")) { return true; } else { return false; } } function unCheckAll(formObj) { count = formObj.elements.length; for (i = 0; i < count; i++) { formObj.elements[i].checked = false; } } function deleteAddress(formObj, name) { formObj.elements[name].value = 'submit'; formObj.submit(); } function submitFormOnEnter(form, ev) { var keycode; if (window.event) { keycode = window.event.keyCode; } else if (ev) { keycode = ev.which; } else { return true; } if (keycode == 13) { if (regFocus.length == 0) { trimFormElements(form); form.submit(); return false; } } else { return true; } return false; } function setCookie() { var name = "usernameCookie"; var docCookie = document.cookie; var value = document.loginForm.username.value; if (docCookie.length > 0 && value != "") { var expiry = new Date(); expiry.setTime(expiry.getTime() + (1000 * 60 * 60 * 24 * 30)); document.cookie = name + "=" + escape(value) + "; path=/" + ((expiry == null) ? "" : "; expires=" + expiry.toGMTString()); } } function getCookie() { var cookieName = "usernameCookie"; var cookieValue; var nameEQ = cookieName + '='; var splittedCookie = document.cookie.split(';'); for ( var i = 0; i < splittedCookie.length; i++) { var temp = splittedCookie[i]; while (temp.charAt(0) == ' ') temp = temp.substring(1, temp.length); if (temp.indexOf(nameEQ) == 0) cookieValue = unescape(temp.substring(nameEQ.length, temp.length)); if (cookieValue != null) { var emailId = cookieValue.replace(/\"/g, ""); document.loginForm.username.value = emailId; } } return null; } function clearTextBoxes() { var itemNumberBoxes = document.searchbyitemnumber["/com/walmart/ecommerce/samsclub/search/SearchFormHandler.itemNumber"]; var itemNumberBoxes1 = document.searchbyitemnumber["/com/walmart/ecommerce/samsclub/search/ShopByItemNumberFormHandler.itemNumber"]; if (itemNumberBoxes != undefined && itemNumberBoxes != null) { if (itemNumberBoxes.length != undefined) { for ( var i = 0; i < itemNumberBoxes.length; i++) { itemNumberBoxes[i].value = ""; } } else { itemNumberBoxes.value = ""; } } if (itemNumberBoxes1 != undefined && itemNumberBoxes1 != null) { if (itemNumberBoxes1.length != undefined) { for ( var i = 0; i < itemNumberBoxes1.length; i++) { itemNumberBoxes1[i].value = ""; } } else { itemNumberBoxes1.value = ""; } } } function clearAllTextBoxes() { var itemNumberBoxes = document.searchbykeyword["/com/walmart/ecommerce/samsclub/search/SearchFormHandler.keywordsArray"]; if (itemNumberBoxes != undefined && itemNumberBoxes != null) { if (itemNumberBoxes.length != undefined) { for ( var i = 0; i < itemNumberBoxes.length; i++) { itemNumberBoxes[i].value = ""; } } else { itemNumberBoxes.value = ""; } } } function clearTextArea() { document.searchbyitemnumbers.itemNumbersTextArea.value = ""; } function selectAllCheckBoxes() { var skuCheckBoxes = document.getElementsByName('skuCheckBox'); if (skuCheckBoxes != undefined && skuCheckBoxes != null) { if (skuCheckBoxes.length != undefined) { for ( var i = 0; i < skuCheckBoxes.length; i++) { skuCheckBoxes[i].checked = true; } } else { skuCheckBoxes.checked = true; } } } function clearFormElements(form) { var noOfFormElements = form.elements.length; for ( var i = 0; i < noOfFormElements; i++) { if (form.elements[i].type == "text" || form.elements[i].type == "textarea") { form.elements[i].value = ""; } if ((form.elements[i].type == "radio") || (form.elements[i].type == "checkbox")) { form.elements[i].checked = false; } if (form.elements[i].type == 'select-one') { if (form.elements[i].name == "where") { var temp = form.elements[i]; temp.value = "Home"; } else { if (form.elements[i].name == "whereb") { var temp1 = form.elements[i]; temp1.value = "Mobile"; } else { form.elements[i].value = ""; } } } } } function populatevalue(form, ptype) { var formElem = form.elements; for ( var i = 0; i <= formElem.length; i++) { if (formElem[i]) { if (formElem[i].type == 'select-one') { var elem = formElem[i].options; for ( var j = 0; j <= formElem[i].length; j++) { if (elem[j]) { if (elem[j].value == formElem[i].id) { elem[j].selected = true; } } } } if (formElem[i].type == 'radio') { if (formElem[i].id == 'Credit/Debit Card') { if (formElem[i].value == 0) { formElem[i].checked = true; } } if (formElem[i].id == 'Sams Club Credit') { if (formElem[i].value == 1) { formElem[i].checked = true; } } } } } } function populateField(form, query) { var arr1 = new Array(); var str = query; arr1 = str.substring(0, str.length).split("&"); for ( var i = 0; i <= arr1.length; i++) { if (arr1[i] != null) { var val = arr1[i].toString(); var key = val.substring(0, val.indexOf('=')); var valuess = val.substring(val.indexOf('=') + 1); if (key != 'status_code_msg' && key != 'cardCvv') { if (form.elements[key]) { form.elements[key].value = valuess; } if (key == 'defaultPaymentMethod' || key == 'saveAsDefault' || key == 'saveInfo' || key == 'autoRenewMembership') { form.elements[key].checked = true; } } } } } function formReset() { var skuCheckBoxes = document.searchResults.skuCheckBox; if (skuCheckBoxes != undefined && skuCheckBoxes != null) { if (skuCheckBoxes.length != undefined) { for ( var i = 0; i < skuCheckBoxes.length; i++) { skuCheckBoxes[i].checked = false; } } else { skuCheckBoxes.checked = false; } } } function addSingleItemToOrder(skuItemId, productID) { var formObjOne = document.searchResults; var formObjTwo = document.searchResultsformtwo; formObjTwo["/atg/commerce/order/purchase/CartModifierFormHandler.catalogRefIds"].value = skuItemId; formObjTwo["/atg/commerce/order/purchase/CartModifierFormHandler.productId"].value = productID; formObjTwo["/atg/commerce/order/purchase/CartModifierFormHandler.quantity"].value = formObjOne[skuItemId].value; formObjTwo.submit(); } function hideErrorMessage() { document.getElementById("Error").style.display = 'none'; } function hideAll(a1) { for ( var iCounter = 0; iCounter <= Size; iCounter++) { if (document.getElementById(a1 + iCounter)) { document.getElementById(a1 + iCounter).style.display = 'none'; } if (document.getElementById('change' + iCounter)) { document.getElementById('change' + iCounter).innerHTML = showSubCatgoryMessage; document.getElementById('change' + iCounter).className = "blueCircleUp"; } } intialChecking(intiallySelected); } function showAll(a3) { for ( var iCounter = 0; iCounter <= Size; iCounter++) { if (document.getElementById(a3 + iCounter)) { document.getElementById(a3 + iCounter).style.display = 'inline'; } if (document.getElementById('change' + iCounter)) { document.getElementById('change' + iCounter).innerHTML = hideSubCatgoryMessage; document.getElementById('change' + iCounter).className = "blueCircleDown"; } } } function switchVisibility(a5, a8) { if (document.getElementById(a5).style.display == "inline") { document.getElementById(a8).innerHTML = showSubCatgoryMessage; document.getElementById(a8).className = "blueCircleUp"; document.getElementById(a5).style.display = 'none'; } else { document.getElementById(a8).innerHTML = hideSubCatgoryMessage; document.getElementById(a8).className = "blueCircleDown"; document.getElementById(a5).style.display = 'inline'; } } function checkboxSelected() { var size = 0; var check = ''; var formElements = document.survey.elements; for ( var i = 0; i < formElements.length; i++) { if (formElements[i].type == "checkbox" && formElements[i].id.indexOf('belongsTorootCat') == 0 && formElements[i].checked) { size += 1; if (Number(selectedSize) + size > 25) { formElements[i].checked = false; check = 'true' } } if (formElements[i].type == "checkbox" && formElements[i].id.indexOf('rootCat') == 0 && formElements[i].checked && check == 'true') { formElements[i].checked = false; } } return size; } function intialChecking(count) { var size = checkboxSelected(); if (size != 0) { if (count < 25) { checkForMaxSelected(); } else { selectedSize = count; displayErrormessage(count); } } else { selectedSize = count; if (count < 25) { checkForMaxSelected(); } else { displayErrormessage(count); } } } function checkForMaxSelected() { var tempSize = checkboxSelected(); var size = Number(selectedSize) + tempSize; displayErrormessage(size); } function displayErrormessage(size) { var noOfFormElements = document.survey.elements.length; var formElements = document.survey.elements; if (size >= 25) { document.getElementById("Error").style.display = 'inline'; for ( var i = 0; i < noOfFormElements; i++) { if (!formElements[i].checked) { var tagName = formElements[i].id; if ((tagName.indexOf('belongsTorootCat') >= 0) || (tagName.indexOf('rootCat') >= 0)) { formElements[i].disabled = true; selectedSize = 0; } } } window.scrollTo(0, 0); } else { document.getElementById("Error").style.display = 'none'; for ( var i = 0; i < noOfFormElements; i++) { formElements[i].disabled = false; } } } 
function clearAllCheckBoxes() { var formElements = document.survey.elements; for ( var i = 0; i < formElements.length; i++) { if (formElements[i].type == "checkbox") { formElements[i].checked = false; } } intialChecking(intiallySelected); } function nextbox(fldobj, nbox, ev) { var key_code; if (window.event) { key_code = event.keyCode } else if (ev.which) { key_code = ev.which } if (key_code != '39' && key_code != '37' && key_code != '16' && key_code != '9') { if (fldobj.value.length == fldobj.maxLength) { fldobj.form.elements[nbox].focus(); } } else if (key_code == '39' && fldobj.selectionEnd == 3) { fldobj.form.elements[nbox].focus(); } else { var txt = fldobj.value; var len = txt.length; var erg = txt.split("\n"); var pos = -1; if (typeof document.selection != "undefined") { range_sel = document.selection.createRange(); range_obj = fldobj.createTextRange(); range_obj.moveToBookmark(range_sel.getBookmark()); range_obj.moveEnd('character', fldobj.value.length); pos = len - range_obj.text.length; if (pos == 3) { fldobj.form.elements[nbox].focus(); } } } } function submitRegistration() { var formObj = document.registrationForm; formObj["/atg/userprofiling/ProfileFormHandler.createSuccessURL"].value = formObj["/atg/userprofiling/ProfileFormHandler.createSuccessURL"].value; formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value = formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value; if (validatePasswordAndConfirmPassword(formObj)) { trimFormElements(formObj); formObj.submit(); } } function displaySelectEmailAddress() { document.getElementById('Error').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">' + selectEmailAddress + '</h2></div>'; document.getElementById('Error').style.display = "inline"; } function checkEnterAndSubmitFindForShopByKeyWord(e) { if (checkEnter(e)) { document.getElementById("updateButton").name = ""; document.getElementById("findButton").click(); return false; } } function checkPasswordAndConfirmPassword(formObj) { var password = formObj.ypass.value; var confirmpassword = formObj.cpass.value; if (password != "" && confirmpassword != "") { if (password != confirmpassword) { document.getElementById('passwordError').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">Password and Confirm Password fields do not match</h2></div>'; document.getElementById('passwordError').style.display = "inline"; document.getElementById('Password').style.color = "red"; document.getElementById('confirmPassword').style.color = "red"; regPassword = formObj.ypass.value; regConfirmPassword = formObj.cpass.value; formObj.ypass.value = ""; formObj.cpass.value = ""; return false; } else { document.getElementById('passwordError').style.display = "none"; document.getElementById('Password').style.color = ""; document.getElementById('confirmPassword').style.color = ""; regPassword = ""; regConfirmPassword = ""; return true; } } return true; } function validatePasswordAndConfirmPassword(formObj) { var password = regPassword; var confirmpassword = regConfirmPassword; if (password != "" && confirmpassword != "") { if (password != confirmpassword) { document.getElementById('passwordError').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">Password and Confirm Password fields do not match</h2></div>'; document.getElementById('Password').style.color = "red"; document.getElementById('confirmPassword').style.color = "red"; formObj.ypass.value = ""; formObj.cpass.value = ""; return false; } else { document.getElementById('passwordError').style.visibility = "hidden"; document.getElementById('Password').style.color = ""; document.getElementById('confirmPassword').style.color = ""; return true; } } return true; } function submitRemoveInterest(category, frmObj) { frmObj["/com/walmart/ecommerce/samsclub/inmyclub/ItemsOfInterestFormHandler.removeCategory"].value = category; frmObj.submit(); } function clearRegFormElements(form) { var noOfFormElements = form.elements.length; for ( var i = 0; i < noOfFormElements; i++) { if (form.elements[i].type == "checkbox") { form.elements[i].checked = false; } if (form.elements[i].type == "text") { form.elements[i].value = ""; } if (form.elements[i].type == "password") { form.elements[i].value = ""; } form.suffix.value = ""; } } function trimAll(sString) { while (sString.substring(0, 1) == ' ') { sString = sString.substring(1, sString.length); } while (sString.substring(sString.length - 1, sString.length) == ' ') { sString = sString.substring(0, sString.length - 1); } return sString; } function trimFormElements(form) { var noOfFormElements = form.elements.length; var i = 0; for (i = 0; i < noOfFormElements; i++) { if (form.elements[i].type == "text") { form.elements[i].value = trimAll(form.elements[i].value); } } } function openNewWindow(URL, popUpName) { if (!window.focus) return true; var href; if (typeof (URL) == 'string') href = URL; window.open(href, popUpName, 'resizable=0,width=600,height=250,left = 440,top = 212'); return false; } function submitRenewal(form, change) { window.location.href = window.location.pathname; form["/com/walmart/ecommerce/samsclub/profile/MyAccountProfileFormHandler.changeRenewalSetting"].value = change; form.submit(); window.focus(); } function closeWindow(URL, closeme, closeonly) { if (!(window.focus && window.opener)) return true; window.opener.focus(); if (!closeonly) window.opener.location.href = URL; if (closeme) window.close(); return false; } function checkEnter(e) { var characterCode; if (e && e.which) { e = e; characterCode = e.which; } else { e = event; characterCode = e.keyCode; } if (characterCode == 13) { return true; } else { return false; } } function checkEnterAndSubmitUpdate(e) { if (checkEnter(e)) { document.getElementById("findButton").name = ""; document.getElementById("updateButton").click(); return false; } } function checkEnterAndSubmitFind(e) { if (checkEnter(e)) { document.getElementById("updateButton").name = ""; document.getElementById("findButton").click(); return false; } else { return isNumberKey(e); } } function checkEnterAndSubmitToCart(e, index) { var cartElement = "addtocartsingle"; if (index != null && index.length > 0 && index != '') { cartElement = cartElement + index; } if (checkEnter(e)) { document.getElementById(cartElement).click(); return false; } } function checkEnterAndSubmitSearch(e) { if (checkEnter(e)) { document.getElementById("searchButton").click(); return false; } } var xmlHttp; var clubId; function dispalyPopup(productId, club, param, contextRoot) { xmlHttp = GetXmlHttpObject(); clubId = "club" + param; var contextPath = contextRoot + "/common"; if (xmlHttp == null) { alert("Your browser does not support AJAX!"); return; } var url = contextPath + "/selectClub.jsp"; url = url + "?productId=" + productId; url = url + "&clubId=" + club; xmlHttp.open("GET", url, true); xmlHttp.onreadystatechange = clubStateChanged; xmlHttp.send(null); } function clubStateChanged() { if (xmlHttp.readyState == 4) { var clubResponse = xmlHttp.responseText; var clubAvailable = new String(clubResponse); clubAvailable = clubAvailable.trim(); var club = document.getElementById(clubId); if (clubAvailable == "true") { club.style.visibility = "visible"; } } } String.prototype.trim = function() { return this.replace(/^\s*/, "").replace(/\s*$/, ""); }; function GetXmlHttpObject() { var xmlHttp = null; try { xmlHttp = new XMLHttpRequest(); } catch (e) { try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); } } return xmlHttp; } function setValue() { regFocus = "onlink"; } function clearValue() { regFocus = ""; } function addMultipleItemsToCart(formobj) { var length = document.getElementById("formCount").value;	 for (i = 0; i < length; i++) { if (document.getElementById('delqty' + i) != null || document.getElementById('delqty' + i) != undefined) { if (document.getElementById('multidelqty' + i + formobj) != null || document.getElementById('multidelqty' + i + formobj) != undefined) { document.getElementById('multidelqty' + i + formobj).value = document .getElementById('delqty' + i).value; } } if (document.getElementById('pickqty' + i) != null || document.getElementById('pickqty' + i) != undefined) { if (document.getElementById('multipickqty' + i + formobj) != null || document.getElementById('multipickqty' + i + formobj) != undefined) { document.getElementById('multipickqty' + i + formobj).value = document .getElementById('pickqty' + i).value; } } if (document.getElementById('delgiftItemid' + i) != null || document.getElementById('delgiftItemid' + i) != undefined) { if (document.getElementById('multidelgiftitemids' + i + formobj) != null || document.getElementById('multidelgiftitemids' + i + formobj) != undefined) { document.getElementById('multidelgiftitemids' + i + formobj).value = document .getElementById('delgiftItemid' + i).value; } } if (document.getElementById('pickgiftItemid' + i) != null || document.getElementById('pickgiftItemid' + i) != undefined) { if (document.getElementById('multipickgiftitemids' + i + formobj) != null || document.getElementById('multipickgiftitemids' + i + formobj) != undefined) { document.getElementById('multipickgiftitemids' + i + formobj).value = document .getElementById('pickgiftItemid' + i).value; } } /* R2 EGiftCards VGDESAI start */		 if (document.getElementById('eGiftCardAmount' + i) != null || document.getElementById('eGiftCardAmount' + i) != undefined) { if (document.getElementById('multiEGiftAmounts' + i + formobj) != null || document.getElementById('multiEGiftAmounts' + i + formobj) != undefined) { document.getElementById('multiEGiftAmounts' + i + formobj).value = document .getElementById('eGiftCardAmount' + i).value; } } /* R2 EGiftCards VGDESAI end */ } formobj.submit(); } function checkIsProductsSelected(requestUri) { var length = formCount; var flag = false; for (i = 0; i < length; i++) { if (document.getElementById('delqty' + i) != null) { var delQty = document.getElementById('delqty' + i).value; if (delQty > 0) { flag = true; } } } for (i = 0; i < length; i++) { if (document.getElementById('pickqty' + i) != null) { var pickQty = document.getElementById('pickqty' + i).value; if (pickQty > 0) { flag = true; } } } if (flag) { document.getElementById('addMultipleItems').style.display = 'inline'; document.getElementById('continue').href = requestUri; document.getElementById("addCount").value = length; } else { document.location.href = requestUri; } } function addProductsSelected(formobj) { var length = formCount; for (i = 0; i < length; i++) { if (document.getElementById('delqty' + i) != null) { if (document.getElementById('multidelqty' + i + formobj.name) != null) { document.getElementById('multidelqty' + i + formobj.name).value = document .getElementById('delqty' + i).value; } } if (document.getElementById('pickqty' + i) != null) { if (document.getElementById('multipickqty' + i + formobj.name) != null) { document.getElementById('multipickqty' + i + formobj.name).value = document .getElementById('pickqty' + i).value; } } } formobj.submit(); } function cartformselectall() { var total = ""; checkCount = 0; count = 0; var objField = document.cartform.elements["removalcommmerceids"]; if (objField != undefined) { count = objField.length; if (count != null) { for (i = 0; i < count; i++) { if (document.cartform.removalcommmerceids[i].checked) { total = checkCount + 1; checkCount++; } else if (document.cartform.removalcommmerceids[i] == "") { total = checkCount + 1; checkCount++; } } } else { total = 1; if (document.cartform.removalcommmerceids.checked) { count = 1; } else { count = 0; } } if (total == count) { unCheckAllItems(); document.getElementById('SelectAllItems').firstChild.nodeValue = selectAllMessage;/* Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */  document.getElementById('SelectAllItems1').firstChild.nodeValue = selectAllMessage; /* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */} else { checkAllItems(); document.getElementById('SelectAllItems').firstChild.nodeValue = deselectAllMessage; /*Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */document.getElementById('SelectAllItems1').firstChild.nodeValue = deselectAllMessage;/* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ } } } function checkAllItems() { count = document.cartform.removalcommmerceids.length; if (count != undefined) { for (i = 0; i < count; i++) { document.cartform.removalcommmerceids[i].checked = true; } } else { document.cartform.removalcommmerceids.checked = true; } } function unCheckAllItems() { count = document.cartform.removalcommmerceids.length; if (count != undefined) { for (i = 0; i < count; i++) { document.cartform.removalcommmerceids[i].checked = false; } } else { document.cartform.removalcommmerceids.checked = false; } } function onmyinput(o) { if (o.value.length >= o.getAttribute("maxlength")) { if (o.value.length > o.getAttribute("maxlength")) o.value = o.value.substring(0, o.getAttribute("maxlength")); return false; } return true; } function onmypaste(o) { var nMaxLen = o.getAttribute ? parseInt(o.getAttribute("maxlength")) : ""; if (document.all) { if (document.selection.createRange().text.length > 0) { var ovalueandclipboarddata = o.value + window.clipboardData.getData("Text"); if (o.getAttribute && ovalueandclipboarddata.length - document.selection.createRange().text.length > nMaxLen) { if (window.clipboardData.getData("Text").substring( 0, document.selection.createRange().text.length + nMaxLen - o.value.length) != "") { window.clipboardData .setData( "Text", window.clipboardData .getData("Text") .substring( 0, document.selection .createRange().text.length + nMaxLen - o.value.length)); } else { return false; } } } else { var ovalueandclipboarddata = o.value + window.clipboardData.getData("Text"); if (o.getAttribute && ovalueandclipboarddata.length > nMaxLen) { if (ovalueandclipboarddata.substring(0, nMaxLen - o.value.length) != "") window.clipboardData.setData("Text", ovalueandclipboarddata .substring(0, nMaxLen - o.value.length)); else return false; } } return true; } } function onmykeypress(o) { if (!document.all) { var nMaxLen = o.getAttribute ? parseInt(o.getAttribute("maxlength")) : ""; if (onmykeypress.caller.arguments[0].ctrlKey == true) { if (onmykeypress.caller.arguments[0].which == 118) { if (o.selectionStart < o.selectionEnd) { var ovalueandclipboarddata = o.value + mygetclipdata(); if (o.getAttribute && (ovalueandclipboarddata.length - o.selectionEnd + o.selectionStart > nMaxLen)) { if (mygetclipdata().substring( 0, o.selectionEnd - o.selectionStart + nMaxLen - o.value.length) != "") { mysetclipdata(mygetclipdata().substring( 0, o.selectionEnd - o.selectionStart + nMaxLen - o.value.length)); } else { return false; } } } else { var ovalueandclipboarddata = o.value + mygetclipdata(); if (o.getAttribute && ovalueandclipboarddata.length > nMaxLen) { if (ovalueandclipboarddata.substring(0, nMaxLen - o.value.length) != "") { mysetclipdata(ovalueandclipboarddata.substring(0, nMaxLen - o.value.length)); } else { return false; } } } return true; } } if (onmykeypress.caller.arguments[0].which == 0 || onmykeypress.caller.arguments[0].which == 8) return true; if (o.value.length >= o.getAttribute("maxlength")) { if (o.selectionStart < o.selectionEnd) return true; if (o.value.length > o.getAttribute("maxlength")) o.value = o.value.substring(0, o.getAttribute("maxlength")); return false; } else return true; } else { if (document.selection.createRange().text.length > 0) return true; if (o.value.length >= o.getAttribute("maxlength")) return false; else return true; } } function selectAddOnype(form, elementId, number) { var element = document.getElementById(elementId); if (element.selectedIndex == 0) { form["/com/walmart/ecommerce/samsclub/profile/MyAccountProfileFormHandler.editMembership"].value = number; form.submit(); } if (element.selectedIndex == 1) { window.location.href = 'replaceBusinessAddon.jsp?cardToUpdate=' + number; } } function submitAddBusinessAddonToForm(param, form) { var param1 = param; if (param1 == 'addon') { form["/com/walmart/ecommerce/samsclub/order/purchase/EcomMembershipCartModifierFormhandler.addAddOnMembershipToCart"].name = ""; form["/com/walmart/ecommerce/samsclub/order/purchase/EcomMembershipCartModifierFormhandler.attachAdditionalAddonAccount"].value = "submit"; ; form.submit(); } else if (param1 = 'continue') { form["/com/walmart/ecommerce/samsclub/order/purchase/EcomMembershipCartModifierFormhandler.attachAdditionalAddonAccount"].name = ""; form["/com/walmart/ecommerce/samsclub/order/purchase/EcomMembershipCartModifierFormhandler.addAddOnMembershipToCart"].value = "submit"; ; form.submit(); } } function selectType(form, pSams, pCredit) { if (form.value == 0) { form.checked = true; document.getElementById(pCredit).style.display = 'inline'; document.getElementById(pSams).style.display = 'none'; } if (form.value == 1) { form.checked = true; document.getElementById(pCredit).style.display = 'none'; document.getElementById(pSams).style.display = 'inline'; } } var commerceIds = new Array(); function setCommerceIds(pCommerceIds) { commerceIds = pCommerceIds; } function cartformsubmit(method) { if (method == 'updatecart') { var length = document.getElementById("cartItemsCount").value; for ( var j = 0; j < commerceIds.length; j++) { document.getElementById(commerceIds[j] + 'updateqty').value = document .getElementById(commerceIds[j] + 'qty').value; } document.getElementById("removefromcart").name = ""; document.cartupdateform.submit(); } if (method == 'deleteselected') { document.getElementById("updatecart").name = ""; document.cartform.submit(); } } function cartupdateformsubmit() { document.getElementById("removefromcart").name = ""; var length = document.getElementById("cartItemsCount").value; for ( var j = 0; j < commerceIds.length; j++) { document.getElementById(commerceIds[j] + 'updateqty').value = document .getElementById(commerceIds[j] + 'qty').value; } document.cartupdateform.submit(); return false; } function addServiceAgg(commmerceItemId, serviceAgreementId) { document.getElementById("selectedCommerceItem").value = commmerceItemId; document.getElementById("serviceAgreement").value = serviceAgreementId; document.AddServiceAgreement.submit(); } function changeDate(deliveryDate, ClubcommerceItemId) { if (deliveryDate == "") return; document.getElementById("ClubDeliveryDate").value = deliveryDate; document.getElementById("ClubCommerceItemId").value = ClubcommerceItemId; document.changeDateInCommerceItem.submit(); } function ShippingMethodChange(commerceItemId, shippingMethod) { document.getElementById('commId').value = commerceItemId; document.getElementById('changedShippingMethod').value = shippingMethod; document.changeShippingMethod.submit(); } function pickupClubChange(contextpath, commerceItemId, newClubId) { if (newClubId == "selectnewclub") { window.location.href = contextpath + '/shoppingtools/selectaclub.jsp?page=cart&commerceItemId=' + commerceItemId; } else { document.getElementById('assosciatedCommId').value = commerceItemId; document.getElementById('selectedPickupClub').value = newClubId; document.changeSelectedClub.submit(); } } function showdeselect(formObj, chk) { var objField = formObj.elements[chk]; total = objField.length; if (total != null) { count = 0; checkCount = 0; for (i = 0; i < total; i++) { if (objField[i].checked) { count = checkCount + 1; checkCount++; } } if (total == count) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } if (document.getElementById('SelectAllItems')) { document.getElementById('SelectAllItems').firstChild.nodeValue = deselectAllMessage; /* Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */document.getElementById('SelectAllItems1').firstChild.nodeValue = deselectAllMessage;/* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ } } if (total != count) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } if (document.getElementById('SelectAllItems')) { document.getElementById('SelectAllItems').firstChild.nodeValue = selectAllMessage; /* Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ document.getElementById('SelectAllItems1').firstChild.nodeValue = selectAllMessage; /* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ } } } else { if (objField.checked) { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = deselectAllMessage; } if (document.getElementById('SelectAllItems')) { document.getElementById('SelectAllItems').firstChild.nodeValue = deselectAllMessage; /* Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ document.getElementById('SelectAllItems1').firstChild.nodeValue = deselectAllMessage; /* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ } } else { if (document.getElementById('SelectAll2')) { document.getElementById('SelectAll2').firstChild.nodeValue = selectAllMessage; } if (document.getElementById('SelectAllItems')) { document.getElementById('SelectAllItems').firstChild.nodeValue = selectAllMessage; /* Start PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */document.getElementById('SelectAllItems1').firstChild.nodeValue = selectAllMessage; /* End PASupport:: 22nd April, 2011 :: 8393:: Cartpage changes */ } } } } function isNumberKey(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (charCode > 31 && (charCode < 48 || charCode > 57)) { return false; } else { return true; } } function allownumbersonly(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (!((charCode >= 48 && charCode <= 57) || (charCode == 8))) { return false; } else { return true; } } function allowAlphabeticsonly(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (!((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || (charCode == 8))) { return false; } else { return true; } } function allowAlphabeticsAndSpecialCharsOnly(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (!((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || (charCode == 8) || (charCode == 45))) { return false; } else { return true; } } function show() { var check = document.getElementById('aam'); var tr = document.getElementById('grandtotal'); if (check.checked) { tr.style.display = 'block'; } else { tr.style.display = 'none'; } } function populateBillingAddress(addressKey, path) { if (addressKey == "novalue") { document.getElementById("fName").value = ""; document.getElementById("midl").value = ""; document.getElementById("lName").value = ""; document.addPayment.elements['suffix'].options[0].selected = true; document.getElementById("bizOrg").value = ""; document.getElementById("srtAddress").value = ""; document.getElementById("city").value = ""; document.getElementById("zip").value = ""; document.getElementById("p_num").value = ""; document.getElementById("p_num2").value = ""; document.getElementById("p_num3").value = ""; document.getElementById("p_numb").value = ""; document.getElementById("p_numb2").value = ""; document.getElementById("p_numb3").value = ""; document.addPayment.elements['state'].options[0].selected = true; document.getElementById("address2").value = ""; document.getElementById("address3").value = ""; document.addPayment.elements['phoneType'].options[0].selected = true; document.addPayment.elements['phoneType2'].options[2].selected = true; } else { xmlHttp = GetXmlHttpObject(); if (xmlHttp == null) { alert("Your browser does not support AJAX!"); return; } var url = path + "/checkout/common/populateAddress.jsp"; url += "?addressKey=" + addressKey; xmlHttp.onreadystatechange = populateBillingAddressFields; xmlHttp.open("GET", url, true); xmlHttp.send(null); } } function populateBillingAddressFields() { if (xmlHttp.readyState == 4) { var ele = xmlHttp.responseXML; if (ele != null) { ele = xmlHttp.responseXML.documentElement; } if (ele != null) { var xmlDoc = ele; if (xmlDoc.getElementsByTagName("firstName")[0] != null) { document.getElementById("fName").value = xmlDoc .getElementsByTagName("firstName")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("middleName")[0] != null) { document.getElementById("midl").value = xmlDoc .getElementsByTagName("middleName")[0].childNodes[0].nodeValue; } else { document.getElementById("midl").value = ""; } if (xmlDoc.getElementsByTagName("lname")[0] != null) { document.getElementById("lName").value = xmlDoc .getElementsByTagName("lname")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("suffix")[0] != null) { var suffixVal = xmlDoc.getElementsByTagName("suffix")[0].childNodes[0].nodeValue; var suffixprop = document.addPayment.elements['suffix']; ; var elem = suffixprop.options; for ( var j = 0; j <= suffixprop.length; j++) { if (elem[j] != null) { if (elem[j].value == suffixVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['suffix'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("companyName")[0] != null) { document.getElementById("bizOrg").value = xmlDoc .getElementsByTagName("companyName")[0].childNodes[0].nodeValue; } else { document.getElementById("bizOrg").value = ""; } if (xmlDoc.getElementsByTagName("address1")[0] != null) { document.getElementById("srtAddress").value = xmlDoc .getElementsByTagName("address1")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("city")[0] != null) { document.getElementById("city").value = xmlDoc .getElementsByTagName("city")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("zip")[0] != null) { document.getElementById("zip").value = xmlDoc .getElementsByTagName("zip")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pArea")[0] != null) { document.getElementById("p_num").value = xmlDoc .getElementsByTagName("pArea")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pPrefix")[0] != null) { document.getElementById("p_num2").value = xmlDoc .getElementsByTagName("pPrefix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pSuffix")[0] != null) { document.getElementById("p_num3").value = xmlDoc .getElementsByTagName("pSuffix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("p2Area")[0] != null) { document.getElementById("p_numb").value = xmlDoc .getElementsByTagName("p2Area")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb").value = ""; } if (xmlDoc.getElementsByTagName("p2Prefix")[0] != null) { document.getElementById("p_numb2").value = xmlDoc .getElementsByTagName("p2Prefix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb2").value = ""; } if (xmlDoc.getElementsByTagName("p2Suffix")[0] != null) { document.getElementById("p_numb3").value = xmlDoc .getElementsByTagName("p2Suffix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb3").value = ""; } if (xmlDoc.getElementsByTagName("phoneType")[0] != null) { var phoneTypeVal = xmlDoc.getElementsByTagName("phoneType")[0].childNodes[0].nodeValue; var phoneTypeProp = document.addPayment.elements['phoneType']; var elem = phoneTypeProp.options; for ( var j = 0; j <= phoneTypeProp.length; j++) { if (elem[j] != null) { if (elem[j].value == phoneTypeVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['phoneType'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("phoneType2")[0] != null) { var phone2TypeVal = xmlDoc.getElementsByTagName("phoneType2")[0].childNodes[0].nodeValue; var phone2TypeProp = document.addPayment.elements['phoneType2']; var elem = phone2TypeProp.options; for ( var j = 0; j <= phone2TypeProp.length; j++) { if (elem[j] != null) { if (elem[j].value == phone2TypeVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['phoneType2'].options[2].selected = true; } if (xmlDoc.getElementsByTagName("state")[0] != null) { var stateVal = xmlDoc.getElementsByTagName("state")[0].childNodes[0].nodeValue; var stateProp = document.addPayment.elements['state']; var elem = stateProp.options; for ( var j = 0; j <= stateProp.length; j++) { if (elem[j] != null) { if (elem[j].value == stateVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['state'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("address2")[0] != null) { document.getElementById("address2").value = xmlDoc .getElementsByTagName("address2")[0].childNodes[0].nodeValue; } else { document.getElementById("address2").value = ""; } if (xmlDoc.getElementsByTagName("address3")[0] != null) { document.getElementById("address3").value = xmlDoc .getElementsByTagName("address3")[0].childNodes[0].nodeValue; } else { document.getElementById("address3").value = ""; } } } } function populateAddress(addressKey, path) { if (addressKey == "") { document.getElementById("fName").value = ""; document.getElementById("lName").value = ""; document.getElementById("midl").value = ""; document.getElementById("bizOrg").value = ""; document.getElementById("srtAddress").value = ""; document.getElementById("address2").value = ""; document.getElementById("city").value = ""; document.getElementById("address3").value = ""; document.getElementById("nickName").value = ""; document.getElementById("zip").value = ""; document.getElementById("p_num").value = ""; document.getElementById("p_num2").value = ""; document.getElementById("p_num3").value = ""; document.getElementById("p_numb").value = ""; document.getElementById("p_numb2").value = ""; document.getElementById("p_numb3").value = ""; document.getElementById("state").value = ""; document.getElementById("address2").value = ""; document.getElementById("address3").value = ""; document.addPayment.elements['suffix'].options[0].selected = true; document.addPayment.elements['phoneNumberType'].options[0].selected = true; document.addPayment.elements['phone2Type'].options[2].selected = true; } else { xmlHttp = GetXmlHttpObject(); if (xmlHttp == null) { alert("Your browser does not support AJAX!"); return; } var url = path + "/common/populateAddress.jsp"; url += "?addressKey=" + addressKey; xmlHttp.onreadystatechange = populateAddressValue; xmlHttp.open("GET", url, true); xmlHttp.send(null); } } function populateAddressValue() { if (xmlHttp.readyState == 4) { var ele = xmlHttp.responseXML; if (ele != null) { ele = xmlHttp.responseXML.documentElement; } if (ele != null) { var xmlDoc = ele; if (xmlDoc.getElementsByTagName("firstName")[0] != null) { document.getElementById("fName").value = xmlDoc .getElementsByTagName("firstName")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("lname")[0] != null) { document.getElementById("lName").value = xmlDoc .getElementsByTagName("lname")[0].childNodes[0].nodeValue; } else { document.getElementById("lname").value = ""; } if (xmlDoc.getElementsByTagName("middleName")[0] != null) { document.getElementById("midl").value = xmlDoc .getElementsByTagName("middleName")[0].childNodes[0].nodeValue; } else { document.getElementById("midl").value = ""; } if (xmlDoc.getElementsByTagName("suffix")[0] != null) { var suffixVal = xmlDoc.getElementsByTagName("suffix")[0].childNodes[0].nodeValue; var suffixprop = document.addPayment.elements['suffix']; var elem = suffixprop.options; for ( var j = 0; j <= suffixprop.length; j++) { if (elem[j] != null) { if (elem[j].value == suffixVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['suffix'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("companyName")[0] != null) { document.getElementById("bizOrg").value = xmlDoc .getElementsByTagName("companyName")[0].childNodes[0].nodeValue; } else { document.getElementById("bizOrg").value = ""; } if (xmlDoc.getElementsByTagName("address1")[0] != null) { document.getElementById("srtAddress").value = xmlDoc .getElementsByTagName("address1")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("address2")[0] != null) { document.getElementById("address2").value = xmlDoc .getElementsByTagName("address2")[0].childNodes[0].nodeValue; } else { document.getElementById("address2").value = ""; } if (xmlDoc.getElementsByTagName("address3")[0] != null) { document.getElementById("address3").value = xmlDoc .getElementsByTagName("address3")[0].childNodes[0].nodeValue; } else { document.getElementById("address3").value = ""; } if (xmlDoc.getElementsByTagName("city")[0] != null) { document.getElementById("city").value = xmlDoc .getElementsByTagName("city")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("zip")[0] != null) { document.getElementById("zip").value = xmlDoc .getElementsByTagName("zip")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pArea")[0] != null) { document.getElementById("p_num").value = xmlDoc .getElementsByTagName("pArea")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pPrefix")[0] != null) { document.getElementById("p_num2").value = xmlDoc .getElementsByTagName("pPrefix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pSuffix")[0] != null) { document.getElementById("p_num3").value = xmlDoc .getElementsByTagName("pSuffix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("p2Area")[0] != null) { document.getElementById("p_numb").value = xmlDoc .getElementsByTagName("p2Area")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb").value = ""; } if (xmlDoc.getElementsByTagName("p2Prefix")[0] != null) { document.getElementById("p_numb2").value = xmlDoc .getElementsByTagName("p2Prefix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb2").value = ""; } if (xmlDoc.getElementsByTagName("p2Suffix")[0] != null) { document.getElementById("p_numb3").value = xmlDoc .getElementsByTagName("p2Suffix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb3").value = ""; } if (xmlDoc.getElementsByTagName("state")[0] != null) { var stateVal = xmlDoc.getElementsByTagName("state")[0].childNodes[0].nodeValue; var stateProp = document.addPayment.elements['state']; var elem = stateProp.options; for ( var j = 0; j <= stateProp.length; j++) { if (elem[j] != null) { if (elem[j].value == stateVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['state'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("phoneNumberType")[0] != null) { var phoneTypeVal = xmlDoc .getElementsByTagName("phoneNumberType")[0].childNodes[0].nodeValue; var phoneTypeProp = document.addPayment.elements['phoneNumberType']; var elem = phoneTypeProp.options; for ( var j = 0; j <= phoneTypeProp.length; j++) { if (elem[j] != null) { if (elem[j].value == phoneTypeVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['phoneNumberType'].options[0].selected = true; } if (xmlDoc.getElementsByTagName("phone2Type")[0] != null) { var phone2TypeVal = xmlDoc.getElementsByTagName("phone2Type")[0].childNodes[0].nodeValue; var phone2TypeProp = document.addPayment.elements['phone2Type']; var elem = phone2TypeProp.options; for ( var j = 0; j <= phone2TypeProp.length; j++) { if (elem[j] != null) { if (elem[j].value == phone2TypeVal) { elem[j].selected = true; } } } } else { document.addPayment.elements['phone2Type'].options[2].selected = true; } if (xmlDoc.getElementsByTagName("nickName")[0] != null) { document.getElementById("nickName").value = xmlDoc .getElementsByTagName("nickName")[0].childNodes[0].nodeValue; } else { document.getElementById("nickName").value = ""; } } } } function populateCheckingAddress(addressKey, form, path) { if (addressKey == "") { document.getElementById("fName").value = ""; document.getElementById("lName").value = ""; document.getElementById("midl").value = ""; document.getElementById("bizOrg").value = ""; document.getElementById("suffix").options[0].selected = true; document.getElementById("stAdd").value = ""; document.getElementById("add2").value = ""; document.getElementById("addressInfo").value = ""; document.getElementById("city").value = ""; document.getElementById("zip").value = ""; document.getElementById("p_num").value = ""; document.getElementById("p_num2").value = ""; document.getElementById("p_num3").value = ""; document.getElementById("p_numb").value = ""; document.getElementById("p_numb2").value = ""; document.getElementById("p_numb3").value = ""; form.elements["states"].options[0].selected = true; form.elements["phoneNumberType"].options[0].selected = true; form.elements["phone2Type"].options[2].selected = true; } else { xmlHttp = GetXmlHttpObject(); if (xmlHttp == null) { alert("Your browser does not support AJAX!"); return; } var url = path + "/common/populateAddress.jsp"; url += "?addressKey=" + addressKey; xmlHttp.onreadystatechange = populateCheckingAddressValue; xmlHttp.open("GET", url, true); xmlHttp.send(null); } } function populateCheckingAddressValue() { if (xmlHttp.readyState == 4) { var ele = xmlHttp.responseXML; if (ele != null) { ele = xmlHttp.responseXML.documentElement; } if (ele != null) { var xmlDoc = ele; if (xmlDoc.getElementsByTagName("firstName")[0] != null) { document.getElementById("fName").value = xmlDoc .getElementsByTagName("firstName")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("lname")[0] != null) { document.getElementById("lName").value = xmlDoc .getElementsByTagName("lname")[0].childNodes[0].nodeValue; } else { document.getElementById("lName").value = ""; } if (xmlDoc.getElementsByTagName("middleName")[0] != null) { document.getElementById("midl").value = xmlDoc .getElementsByTagName("middleName")[0].childNodes[0].nodeValue; } else { document.getElementById("midl").value = ""; } if (xmlDoc.getElementsByTagName("suffix")[0] != null) { document.getElementById("suffix").value = xmlDoc .getElementsByTagName("suffix")[0].childNodes[0].nodeValue; } else { document.getElementById("suffix").options[0].selected = true; } if (xmlDoc.getElementsByTagName("companyName")[0] != null) { document.getElementById("bizOrg").value = xmlDoc .getElementsByTagName("companyName")[0].childNodes[0].nodeValue; } else { document.getElementById("bizOrg").value = ""; } if (xmlDoc.getElementsByTagName("address1")[0] != null) { document.getElementById("stAdd").value = xmlDoc .getElementsByTagName("address1")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("address2")[0] != null) { document.getElementById("add2").value = xmlDoc .getElementsByTagName("address2")[0].childNodes[0].nodeValue; } else { document.getElementById("add2").value = ""; } if (xmlDoc.getElementsByTagName("address3")[0] != null) { document.getElementById("addressInfo").value = xmlDoc .getElementsByTagName("address3")[0].childNodes[0].nodeValue; } else { document.getElementById("addressInfo").value = ""; } if (xmlDoc.getElementsByTagName("city")[0] != null) { document.getElementById("city").value = xmlDoc .getElementsByTagName("city")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("zip")[0] != null) { document.getElementById("zip").value = xmlDoc .getElementsByTagName("zip")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pArea")[0] != null) { document.getElementById("p_num").value = xmlDoc .getElementsByTagName("pArea")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pPrefix")[0] != null) { document.getElementById("p_num2").value = xmlDoc .getElementsByTagName("pPrefix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("pSuffix")[0] != null) { document.getElementById("p_num3").value = xmlDoc .getElementsByTagName("pSuffix")[0].childNodes[0].nodeValue; } if (xmlDoc.getElementsByTagName("p2Area")[0] != null) { document.getElementById("p_numb").value = xmlDoc .getElementsByTagName("p2Area")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb").value = ""; } if (xmlDoc.getElementsByTagName("p2Prefix")[0] != null) { document.getElementById("p_numb2").value = xmlDoc .getElementsByTagName("p2Prefix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb2").value = ""; } if (xmlDoc.getElementsByTagName("p2Suffix")[0] != null) { document.getElementById("p_numb3").value = xmlDoc .getElementsByTagName("p2Suffix")[0].childNodes[0].nodeValue; } else { document.getElementById("p_numb3").value = ""; } if (xmlDoc.getElementsByTagName("state")[0] != null) { document.getElementById("states").value = xmlDoc .getElementsByTagName("state")[0].childNodes[0].nodeValue; } else { document.getElementById("states").options[0].selected = true; } if (xmlDoc.getElementsByTagName("phoneNumberType")[0] != null) { document.getElementById("phoneNumberType").value = xmlDoc .getElementsByTagName("phoneNumberType")[0].childNodes[0].nodeValue; } else { document.getElementById("phoneNumberType").options[0].selected = true; } if (xmlDoc.getElementsByTagName("phone2Type")[0] != null) { document.getElementById("phone2Type").value = xmlDoc .getElementsByTagName("phone2Type")[0].childNodes[0].nodeValue; } else { document.getElementById("phone2Type").options[2].selected = true; } } } } function limitTextArea(limitField, limitNum) { if (limitField.value.length > limitNum) { limitField.value = limitField.value.substring(0, limitNum); } } function selectedCommerceItems() { count = 0; var objField = document.cartform.elements["removalcommmerceids"]; if (objField != undefined) { count = objField.length; if (count != undefined) { for (i = 0; i < count; i++) { if (document.cartform.removalcommmerceids[i].checked) { document.getElementById('hideSelectedItems' + i).value = document.cartform.removalcommmerceids[i].value; } else { document.getElementById('hideSelectedItems' + i).name = ""; } } } else { document.getElementById('hideSelectedItems' + 0).name = ""; } } } function selectedSaveForLaterItems() { count = 0; var objField = document.giftform.elements["giftItems"]; if (objField != undefined) { count = objField.length; if (count != undefined) { for (i = 0; i < count; i++) { if (document.giftform.giftItems[i].checked) { document .getElementById('hideSelectedSaveForLaterItems' + i).value = document.giftform.giftItems[i].value; } else { document .getElementById('hideSelectedSaveForLaterItems' + i).name = ""; } } } else { document.getElementById('hideSelectedSaveForLaterItems' + 0).name = ""; } } } function isSpaceEntered(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (charCode == 32) { return false; } else { return true; } } function submitFormOnEnterOnChooseAList(form, ev) { selectedCommerceItems(); submitFormOnEnter(form, ev); } function submitFormOnEnterOnChooseAListOnSaveForLater(form, ev) { selectedSaveForLaterItems(); submitFormOnEnter(form, ev); } function isDoubleValue(evt) { var charCode = (evt.which) ? evt.which : event.keyCode; if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) { return false; } else { return true; } } function addToCartPopUpEnter(form, ev) { var keycode; if (window.event) { keycode = window.event.keyCode; } else if (ev) { keycode = ev.which; } else { return true; } if (keycode == 13) { form.submit(); return false; } else { return true; } return false; } function mtrackdown() { document.getElementById('serverdownError').innerHTML = '<div class="scrollingPromo"><center><strong><font color="#CC0033">Server down please try after some time</font></strong></center></div>'; document.getElementById('serverdownError').style.display = "inline"; } function saveanywayAddAddress() { var formObj = document.saveanywayform; var selected = document.getElementById('add1'); if (selected.checked) { document.getElementById('selected').value = true; formObj.submit(); } } function editaddress(param) { document.getElementById("editkey").value = document.getElementById("key").value; document.getElementById("editaddressSuccessURL").value = document .getElementById("updateAddressSuccessURL").value; document.getElementById("editaddressType").value = document .getElementById("addressType").value; document.getElementById("editfirstName").value = document .getElementById("firstName").value; document.getElementById("editlastName").value = document .getElementById("lastName").value; document.getElementById("editmiddleName").value = document .getElementById("middleName").value; document.getElementById("editcompanyName").value = document .getElementById("companyName").value; document.getElementById("editsuffix").value = document .getElementById("suffix").value; document.getElementById("editaddress1").value = document .getElementById("address1").value; document.getElementById("editaddress2").value = document .getElementById("address2").value; document.getElementById("editaddress3").value = document .getElementById("address3").value; document.getElementById("editpostalCode").value = document .getElementById("postalCode").value; document.getElementById("editphoneAreaCode").value = document .getElementById("phoneAreaCode").value; document.getElementById("editphonePrefix").value = document .getElementById("phonePrefix").value; document.getElementById("editphoneSuffix").value = document .getElementById("phoneSuffix").value; document.getElementById("editphone2AreaCode").value = document .getElementById("phone2AreaCode").value; document.getElementById("editphone2Prefix").value = document .getElementById("phone2Prefix").value; document.getElementById("editphone2Suffix").value = document .getElementById("phone2Suffix").value; document.getElementById("editphoneNumberType").value = document .getElementById("phoneNumberType").value; document.getElementById("editphone2Type").value = document .getElementById("phone2Type").value; document.getElementById("editphone2").value = document .getElementById("phone2").value; document.getElementById("editnickName").value = document .getElementById("nickName").value; if (param == 'suggestedaddress') { document.getElementById("editcity").value = document .getElementById("validCity").value; document.getElementById("editstate").value = document .getElementById("validState").value; } else { document.getElementById("editcity").value = document .getElementById("city").value; document.getElementById("editstate").value = document .getElementById("state").value; } document.editaddress.submit(); } function submitSearchForm1(contextpath) { var searchTerm = document.getElementById("searchBar").value; var catId = document.getElementById("searchSelect").value; var path = contextpath + "/search/searchResults.jsp?searchTerm=" + searchTerm + "&searchCategoryId=" + catId; document.searchForm.action = path; return true; } function shwhidecategories(a8, a5, a9) { if (document.getElementById(a8).checked == true) { document.getElementById(a5).style.display = 'inline'; document.getElementById(a9).innerHTML = hideSubCatgoryMessage; document.getElementById(a9).className = "blueCircleDown"; } else { document.getElementById(a9).innerHTML = showSubCatgoryMessage; document.getElementById(a9).className = "blueCircleUp"; document.getElementById(a5).style.display = 'none'; } } function savegiftlistitems(formobj) { var length = document.getElementById("formCount").value; for (i = 0; i < length; i++) { if (document.getElementById('delqty' + i) != null || document.getElementById('delqty' + i) != undefined) { if (document.getElementById('multidelqty' + i + formobj) != null || document.getElementById('multidelqty' + i + formobj) != undefined) { document.getElementById('multidelqty' + i + formobj).value = document .getElementById('delqty' + i).value; } } if (document.getElementById('pickqty' + i) != null || document.getElementById('pickqty' + i) != undefined) { if (document.getElementById('multipickqty' + i + formobj) != null || document.getElementById('multipickqty' + i + formobj) != undefined) { document.getElementById('multipickqty' + i + formobj).value = document .getElementById('pickqty' + i).value; } } /* R2 EGiftCards VGDESAI start */ if (document.getElementById('eGiftCardAmount' + i) != null || document.getElementById('eGiftCardAmount' + i) != undefined) { if (document.getElementById('multiEGiftAmounts' + i + formobj) != null || document.getElementById('multiEGiftAmounts' + i + formobj) != undefined) { document.getElementById('multiEGiftAmounts' + i + formobj).value = document .getElementById('eGiftCardAmount' + i).value; } } /* R2 EGiftCards VGDESAI end */ } var formNameObj = document.getElementsByName(formobj); formNameObj[0].submit(); } function submitListForm() { document.chooseListForm.submit(); } 
function copyValues() {	
	if (document.getElementById('delqty') != null || document.getElementById('delqty') != undefined) { 
		document.getElementById("haveShipQty").value = document .getElementById("delqty").value; 
		}
		if (document.getElementById('pickqty') != null || document.getElementById('pickqty') != undefined) {
			document.getElementById("pickUpQty").value = document .getElementById("pickqty").value; 
			} /* R2 EGiftCards VGDESAI start */
			if (document.getElementById('eGiftCardAmount') != null || document.getElementById('eGiftCardAmount') != undefined) {
				document.getElementById('eGiftCardAmount').value = document .getElementById('eGiftCardAmount0').value;
				} /* R2 EGiftCards VGDESAI end */
				 document.getElementById("giftListItemId").value = document.getElementById("selectedGiftlistId").value;
				 document.getElementById("giftlistId").value = document.getElementById("selectedGiftlistId").value;
				 document.ChooseList.submit();				
				}
function checkParent(objForm, strName, parCatName, parentCatNumber) { 
     var objField = document.survey.elements[strName]; 
	 var parent = document.survey.elements[parCatName]; 
	 var TotalNumbers = 0; 
	 var TotalChecked = 0; 
	 var length=objField.length; 
	 if (length == undefined) { 
	     length=1;
	     if (!parent.checked) { 
		     TotalChecked = 0; 
		 } else { 
		     TotalChecked = 1; 
		 }
	 }else{
	     length=objField.length;
	 }
	 for ( var iCounter = 0; iCounter <length; iCounter++) { 
	      if (objField[iCounter].checked) { 
		       TotalNumbers = TotalNumbers + 1; 
			   if (objField[iCounter].checked) {
   			         TotalChecked = TotalChecked + 1; 
			   } 
		   } 
	 } 	
	 
	 if (TotalChecked > 0) { 
		  //Start Bleum Support 12.6 Site Stabilization-Defect Fix<9211> 
		     if(TotalNumbers==objField.length){
	               parent.checked = true; 
	         }else{
	               parent.checked = false;
	         }
	      //End Bleum Support 12.6 Site Stabilization-Defect Fix<9211>
	 } else { 
	      parent.checked = false; 
		  intialChecking(intiallySelected);
	 }
	 
	 checkForMaxSelected(); 
}
function checkChild(checObj, parCatName, parentCatNumber) { 
     
     var subcatParamNumber = "SubCategory" + parentCatNumber; 
	 var changeParamNumber = "change" + parentCatNumber;  
	 //Start Bleum Support 12.6 Site Stabilization-Defect Fix<9211>
	 //showhidecategories(parCatName, subcatParamNumber, changeParamNumber); 
	 //switchVisibility(subcatParamNumber,changeParamNumber);
	 //End Bleum Support 12.6 Site Stabilization-Defect Fix<9211>
	 var combinString = "belongsTo" + parCatName; 
	 var totalChildCheckBox = document.survey.elements[combinString]; 
	 if (totalChildCheckBox) { 
	      var childBoxSize = totalChildCheckBox.length; 
		  if (childBoxSize == undefined) { 
		         if (totalChildCheckBox.checked) {
				         totalChildCheckBox.checked = false; 
				 } else { 
				         totalChildCheckBox.checked = true; 
			     } 
		  } 
		  if (checObj.checked) { 
		  
		         for ( var iCounter = 0; iCounter < childBoxSize; iCounter++) {
				        totalChildCheckBox[iCounter].checked = true; 
				 } 
		 } else { 
		        for ( var iCounter = 0; iCounter < childBoxSize; iCounter++) { 
				     totalChildCheckBox[iCounter].checked = false; 
				} 
				intialChecking(intiallySelected); 
		} 
    } 
    checkForMaxSelected(); 
}
/* R2 EGiftCards VGDESAI start */
function copyValuesSearch1(index, productId) {
	copyValuesSearch(index);
	if (document.getElementById('eGiftCardAmount' + productId) != null
			|| document.getElementById('eGiftCardAmount' + productId) != undefined) {
		document.getElementById('eGiftCardAmountPopup_' + productId).value = document
				.getElementById('eGiftCardAmount' + productId).value;
	}
}
/* R2 EGiftCards VGDESAI end */
function copyValuesSearch(index) {
	if (document.getElementById('delqty' + index) != null
			|| document.getElementById('delqty' + index) != undefined) {
		document.getElementById("haveShipQty" + index).value = document
				.getElementById("delqty" + index).value;
	}
	if (document.getElementById('pickqty' + index) != null
			|| document.getElementById('pickqty' + index) != undefined) {
		document.getElementById("pickUpQty" + index).value = document
				.getElementById("pickqty" + index).value;
	}
}
/* R2 EGiftCards VGDESAI start */
function onmessagepaste(o) {
	var nMaxLen = o.getAttribute ? parseInt(o.getAttribute("maxlength")) : "";
	if (document.all) {
		if (o.value.length > 0) {
			var clipboarddata = window.clipboardData.getData("Text");
			if (o.getAttribute
					&& o.value.length + clipboarddata.length > nMaxLen) {
				if (window.clipboardData.getData("Text").substring(0,
						nMaxLen - o.value.length) != "") {
					window.clipboardData.setData("Text", window.clipboardData
							.getData("Text").substring(0,
									nMaxLen - o.value.length));
				} else {
					window.clipboardData.setData("Text", "");
					return false;
				}
			}
		} else {
			var clipboarddata = window.clipboardData.getData("Text");
			if (o.getAttribute && clipboarddata.length > nMaxLen) {
				if (clipboarddata.substring(0, nMaxLen - o.value.length) != "") {
					window.clipboardData.setData("Text", clipboarddata
							.substring(0, nMaxLen - o.value.length));
				} else {
					return false;
				}
			}
		}
		return true;
	}
}
/* R2 EGiftCards VGDESAI end */
function addToList(form, giftId, index,prodIndex) {
	form.elements["giftId"].value = giftId;
	form.target = '_top';
	if (document.getElementById('delqty' + index) != null
			|| document.getElementById('delqty' + index) != undefined) {
		form.haveItShipped.value = document.getElementById("delqty" + index).value;
	}
	if (document.getElementById('pickqty' + index) != null
			|| document.getElementById('pickqty' + index) != undefined) {
		form.pickUpInClub.value = document.getElementById("pickqty" + index).value;
	}
	/* R2 EGiftCards VGDESAI start */
	if (document.getElementById('eGiftCardAmount' + prodIndex) != null
			|| document.getElementById('eGiftCardAmount' + prodIndex) != undefined) {
		document.getElementById('eGiftCardAmount_' + prodIndex).value = document
				.getElementById('eGiftCardAmount' + prodIndex).value;
	}
	/* R2 EGiftCards VGDESAI end */
	form.submit();
}
function addMultipleItemsToCart2(formobj, id) {
	var length = document.getElementById("formCount").value;
	var check = "";
	var productIds = document.getElementsByName("eGiftCardAmountProductIds"); // R2 EGiftCards VGDESAI start
	for (i = 0; i < length; i++) {
		if (document.getElementById('delqty' + i) != null
				|| document.getElementById('delqty' + i) != undefined) {
			if (document.getElementById('multidelqty' + i + formobj) != null
					|| document.getElementById('multidelqty' + i + formobj) != undefined) {
				document.getElementById('multidelqty' + i + formobj).value = document
						.getElementById('delqty' + i).value;

			}
		}
		if (document.getElementById('pickqty' + i) != null
				|| document.getElementById('pickqty' + i) != undefined) {
			if (document.getElementById('multipickqty' + i + formobj) != null
					|| document.getElementById('multipickqty' + i + formobj) != undefined) {
				document.getElementById('multipickqty' + i + formobj).value = document
						.getElementById('pickqty' + i).value;
			}
		}
		if (document.getElementById('delgiftItemid' + i) != null
				|| document.getElementById('delgiftItemid' + i) != undefined) {
			if (document.getElementById('multidelgiftitemids' + i + formobj) != null
					|| document.getElementById('multidelgiftitemids' + i
							+ formobj) != undefined) {
				document.getElementById('multidelgiftitemids' + i + formobj).value = document
						.getElementById('delgiftItemid' + i).value;
			}
		}
		if (document.getElementById('pickgiftItemid' + i) != null
				|| document.getElementById('pickgiftItemid' + i) != undefined) {
			if (document.getElementById('multipickgiftitemids' + i + formobj) != null
					|| document.getElementById('multipickgiftitemids' + i
							+ formobj) != undefined) {
				document.getElementById('multipickgiftitemids' + i + formobj).value = document
						.getElementById('pickgiftItemid' + i).value;
			}
		}
		/* R2 EGiftCards VGDESAI start */
		if(productIds != null && productIds != undefined && productIds[i] != null && productIds[i] != undefined){
			var productId = productIds[i].value;
			if(productId != null && productId != undefined){
				if (document.getElementById('eGiftCardAmount' + productId) != null
						|| document.getElementById('eGiftCardAmount' + productId) != undefined) {
					if (document.getElementById('multiEGiftAmounts' + i + formobj) != null
							|| document.getElementById('multiEGiftAmounts' + i
									+ formobj) != undefined) {
						document.getElementById('multiEGiftAmounts' + i + formobj).value = document
								.getElementById('eGiftCardAmount' + productId).value;
					}
				}				
			}
		}  /* R2 EGiftCards VGDESAI end */
	}

	for (j = 0; j < length; j++) {
		var item = document.getElementById('giftCheck' + j);
		if (item != null && item.checked) {
			check = check + 'true' + ",";
		} else {
			check = check + "false" + ",";
		}
	}

	document.getElementById("samsAddItemToCartSubselected" + id).value = check;
	formobj.submit();
}
function addMultipleItemsToCart1(formobj, id) {

	var length = document.getElementById("formCountDummy").value;
	var check = "";
	for (i = 0; i < length; i++) {
		if (document.getElementById('delqty' + i) != null
				|| document.getElementById('delqty' + i) != undefined) {
			if (document.getElementById('multidelqty' + i + formobj) != null
					|| document.getElementById('multidelqty' + i + formobj) != undefined) {
				document.getElementById('multidelqty' + i + formobj).value = document
						.getElementById('delqty' + i).value;

			}
		}
		if (document.getElementById('pickqty' + i) != null
				|| document.getElementById('pickqty' + i) != undefined) {
			if (document.getElementById('multipickqty' + i + formobj) != null
					|| document.getElementById('multipickqty' + i + formobj) != undefined) {
				document.getElementById('multipickqty' + i + formobj).value = document
						.getElementById('pickqty' + i).value;
			}
		}
		if (document.getElementById('delgiftItemid' + i) != null
				|| document.getElementById('delgiftItemid' + i) != undefined) {
			if (document.getElementById('multidelgiftitemids' + i + formobj) != null
					|| document.getElementById('multidelgiftitemids' + i
							+ formobj) != undefined) {
				document.getElementById('multidelgiftitemids' + i + formobj).value = document
						.getElementById('delgiftItemid' + i).value;
			}
		}
		if (document.getElementById('pickgiftItemid' + i) != null
				|| document.getElementById('pickgiftItemid' + i) != undefined) {
			if (document.getElementById('multipickgiftitemids' + i + formobj) != null
					|| document.getElementById('multipickgiftitemids' + i
							+ formobj) != undefined) {
				document.getElementById('multipickgiftitemids' + i + formobj).value = document
						.getElementById('pickgiftItemid' + i).value;
			}
		}
		/* R2 EGiftCards VGDESAI start */
		if (document.getElementById('eGiftCardAmount' + i) != null
				|| document.getElementById('eGiftCardAmount' + i) != undefined) {
			if (document.getElementById('multiEGiftAmounts' + i + formobj) != null
					|| document.getElementById('multiEGiftAmounts' + i
							+ formobj) != undefined) {
				document.getElementById('multiEGiftAmounts' + i + formobj).value = document
						.getElementById('eGiftCardAmount' + i).value;
			}
		} /* R2 EGiftCards VGDESAI end */
	}

	for (j = 0; j < length; j++) {
		var item = document.getElementById('giftCheck' + j);
		if (item != null && item.checked) {
			check = check + 'true' + ",";
		} else {
			check = check + "false" + ",";
		}
	}

	document.getElementById("samsAddItemToCartSubselected" + id).value = check;
	var formNameObj = document.getElementsByName(formobj);
	formNameObj[0].submit();

}
function deleteGiftlistitem(formobj) {

	var formNameObj = document.getElementsByName(formobj);
	formNameObj[0].submit();
}
function selectAllShoppingList(elemId) {
	if (document.getElementById('SelectAll1').firstChild.nodeValue != selectAllMessage) {
		document.getElementById('SelectAll1').firstChild.nodeValue = selectAllMessage;
	} else {
		document.getElementById('SelectAll1').firstChild.nodeValue = deselectAllMessage;
	}

	for (i = 0; i < size; i++) {

		var item = document.getElementById(elemId + i);
		if (item != null || item != undefined) {
			if (document.getElementById('SelectAll1').firstChild.nodeValue != selectAllMessage) {
				item.checked = true;
			} else {
				item.checked = false;
			}
		}
	}
}

//R2 shipping enh s1sivap changes start

function dockSubmit() {
	var objDockDoorChkBox = document.getElementById('dockDoorPresentCheckBox');
	if (objDockDoorChkBox != null) {
		if(objDockDoorChkBox.checked && 
				!objDockDoorChkBox.disabled) {		
			document.getElementById('dockDoorPresent').value='Y';
		}
	}	
	showhide('dockDoorTerms');
}

function dockCancel() {
	document.getElementById('dockDoorPresentCheckBox').checked = false;
	document.getElementById('dockDoorPresent').value = 'N';
	showhide('dockDoorTerms');
}

function showDockDoorTerms() {	
	if (document.getElementById('dockDoorPresentCheckBox').checked==true)
	{
		showhide('dockDoorTerms');		
	} else {
		hidePopUp('dockDoorTerms');
		document.getElementById('dockDoorPresent').value='N';
	}
}

function showDockDoorCheck() {
	var objDockDoorCheckBox = document.getElementById('addOrChangeAddress');
	if (objDockDoorCheckBox != null) {
		if (document.getElementById('com').checked) {
			objDockDoorCheckBox.style.display='';
		} else if (document.getElementById('res').checked) {
			objDockDoorCheckBox.style.display='none';
			document.getElementById('dockDoorPresent').value='N';
		}
	} else if (document.getElementById('changeCommAddr') != null) {
		if (document.getElementById('com').checked) {
			document.getElementById('changeCommAddr').style.display='';
		} else if (document.getElementById('res').checked) {
			document.getElementById('changeCommAddr').style.display='none';
			document.getElementById('dockDoorPresent').value='N';
		}
	}
}

function checkFormSubmit(ev) {
	if (chkDisablePopupSubmit == "notDefault") {
		return false;
	} else {
		return true;
	}
}

//R2 shipping enh s1sivap changes end
/* Start PASupport:: 25th April, 2011 :: AutoRenew */
function submitForm()
{	    
	if(document.getElementById('autoRenewMembership').checked){
		if(document.getElementById('autoRenewYes').checked || 
				document.getElementById('autoRenewNo').checked){
			
			if(document.getElementById('autoRenewYes').checked && !(document.getElementById('saveAsDefault').checked)){
				document.getElementById('regError').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">' +selectDefaultPaymentmethod+ '</h2></div>';
			}else{
				document.addPayment.submit(); 
			}
		}else{
			document.getElementById('regError').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">' +selectAutoRenewYes+ '</h2></div>';
		}
	}else{
		document.addPayment.submit(); 
	}

}
function submitFormOnEnterIn(form, ev) { 
	var keycode; 
	if (window.event) 
	{ keycode = window.event.keyCode;
	} else if (ev) {
	keycode = ev.which;
	} else
	 { return true; 
	 } 
	if (keycode == 13) {
	if (regFocus.length == 0) {  
	trimFormElements(form);
	submitForm();	
	return false; 
	} }	else {
	return true; 
	} 
	return false;
}
function submitAutoRenewForm(){
	if(document.getElementById("autoRenewTrue") || document.getElementById("autoRenewFalse")){
		if(document.getElementById("autoRenewTrue").checked  || document.getElementById("autoRenewFalse").checked){
		document.changeRenewalSetting.submit();
		}else{
			document.getElementById('regError').innerHTML = '<div class="orangeBg-whiteBrdr smMargB"><h2 class="red">' +selectAutoRenewYes+ '</h2></div>';
		}
	}
}
 /* End PASupport:: 25th April, 2011 :: AutoRenew */
/* Start PASupport: 22Mar2011 for 8384 (GE-PO Issue) */
function isAlphnumericKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode; 
	if (!(charCode>=48 && charCode<=57 || charCode>=65 && charCode<=90 || charCode>=97 && charCode<=122)) {
		return false; }
	else { 
		return true; 
	}
}
/* End PASupport: 22Mar2011 for 8384 (GE-PO Issue) */
//Start PASupport Site-Enhancements 07 dec 2011 : Adding new method to update fields on click on swatches
function changeFieldsForSwatches(skuId,productId)
{

	$('#swatchSKUID').html('<input value="'+skuId+'" name="/atg/commerce/order/purchase/CartModifierFormHandler.catalogRefIds" id="mainForm'+skuId+'" type="hidden"><input value=" " name="_D:/atg/commerce/order/purchase/CartModifierFormHandler.catalogRefIds" type="hidden">'); 

	$.get("/sams/shop/product/ajax/skuPickerAjax.jsp?skuId="+skuId+"&productId="+productId, displayResult);
	
}
//End PASupport

function displayResult(data) {
       //begin of 12.8 site stabilization refresh the inventory lable 
 	   $("div#productDisplayName").html( data.productDisplayName);
 	   //end of 12.8 site stabilization refresh the inventory lable 
	   $("div#price").html( data.price);
       $("#model").html( data.model);
	   $("#item").html( data.item);
		$("div#shopFilter").html( data.shopFilter);
		$("div#variance").html( data.vari);
		$("div#shippingIncluded").html( data.shippingIncluded);
		// Start Add YP for the swatch bug 01-05-2012
		if(document.getElementById('swatchImg')){
		   $("div#swatchImg").html( data.swatchImg);
		}
		
  }

//Start    PASupport Site-Enhancements User Story 3 18 jan 2012 : Adding new method to display club locator pop-up
function callClubLocatorOverlay(productId,skuId,rdURL){
	  var lastPageAccessInSeconds = Math.floor(lastAccesspage/1000);
	  var currnetDate = new Date();
	  var currnetDateInTime = currnetDate.getTime();
	  var currnetDateInSeconds = Math.floor(currnetDateInTime/1000);
	  var diffTime = currnetDateInSeconds - lastPageAccessInSeconds;
	  if(diffTime >= sessionTimeout){
		  window.location.reload();
	  }else{
	  openClubLocatorOverlay("/sams/shoppingtools/clubSelector/clubSelector.jsp?prodId="+productId+"&skuId="+skuId+"&redirectURL="+encodeURIComponent(rdURL));
	  }
}
//End PASupport
//Start PASupport Site-Enhancements User Story 5 27 jan 2012 : Adding new method to update fields on changing variance
function changesDetailsAfterSelection(productId,variance)
{
	var position = "side";
	selectedVariance = variance;
	$('.loadVarianceCircle').css("display",'block');
	$('#eveDisplay').load("/sams/eValues/shop/displayevalueicon.jsp?productId="+productId+"&variance="+selectedVariance+"&position="+position);
	$.get("/sams/shop/product/ajax/getSkuOfSelectedVariance.jsp?productId="+productId+"&variance="+variance,getResults);
	$('.loadVarianceCircle').animate({fontSize: "1em"},4000).fadeOut('slow');

}


function getResults(result){	
	if(result!= null){
		var imageName=result.largeImageName;
		imageName=imageName.substring(0,imageName.lastIndexOf("_"));
		sjPD.changeImage(imageName,result.skuId,result.productId);
	}
}

//End PASupport
$(document).ready(function() {
	$('#updateEmail #updateEmaillink').click(function() {	
	var newEmail=$('#updateEmail #newEmail').val();
	var confirmEmailAddress=$('#updateEmail #confirmEmailAddress').val();
	var password=$('#updateEmail #password').val();
	//alert("newEmail="+newEmail+"\nconfirmEmailAddress="+confirmEmailAddress+"\npassword="+password);
	var dataString = 'newEmail='+newEmail+'&confirmEmailAddress='+confirmEmailAddress+'&password='+password;
		$.ajax({
			
			type: "POST",
			url: "/sams/preference/preferenceUpdateEmailAjax.jsp",
			data: dataString,
			success: function(msg) {	
			alert(msg);
				if(msg.trim()=='success') {	
					$('#ErrorMessage').html("");
					$('#SuccessPage').show();					
				} 
				else {
					$('#SuccessPage').hide();
					$('#ErrorMessage').html(msg.trim());
				}
			}
		});
		return false;
	});
});
function step1form(){
document.step1Form.submit();
}
function step2form(){
	document.step2Form.submit();
	}
/* Start PASupport: 29 March 2012, S2 evalues  */
$(document).ready(function(){
	 
	$('.test').click(function(){
		var itemId;
		if(!$('#cnpItemNumber').val()){
			itemId=$('#onlineItemNumber').val();
		}
		if(!$('#onlineItemNumber').val()){
			itemId=$('#cnpItemNumber').val();
		}
		var response = {
				evaluerequest:{
	        	itemnumber:itemId,
	        	page:'productDetail'
	    	}
		}
		var data = $.parseJSON(response);
		$.ajax({			
			type:"GET",
				url:"/sams/product.jsp?jsonRequest="+JSON.stringify(response),
					contentType:'application/json charset=utf-8',						
							success:function(data) {
					}
					
		});
		
	});
	
	

});

function showEvalueMsg() { 
      if (document.getElementById) {
            if(document.getElementById('eValuesMsg')){
                  document.getElementById('eValuesMsg').style.visibility = 'visible'; 
                  document.getElementById('eValuesMsg').style.display = 'block';
            }
      } 
}

/* End PASupport: 29 March 2012, S2 evalues  */


/* Start PASupport: 7 April 2012 for S2 */

/*defined a namespace to define global vars for pdp json and modal window related activities - pj*/
pdpJson = {
		pdpJsonUrl:''
}

/* Comment		: This method is used to load the pop-up window, the inner content will be loaded after reading from pdp json file. */
function eValModal(eValJSONUrl, prodId, pageName){
	var eValJSONUrlVal = eValJSONUrl;
	var prodIdVal = prodId;
	var pageNameVal = pageName;		
	//url being saved in a global var 
	pdpJson.pdpJsonUrl = eValJSONUrl+'?productId='+prodId+'&itemNumber='+pageName+'&src=web';
	//alert(pdpJson.pdpJsonUrl);
}

$(document).ready(function(){
	//set modal window status = close	
	var modalStatus = false;
	
	  
	//adds the class on-the-fly
	$('.evalButn').click(function(){
		
		//keeping a check if modal window is already open
		if (modalStatus == false){
		//assign an id to the link on-the-fly 
		$(this).attr('id','myEvalButn');		
		
		// load and populate modal window - start //
		
		var mainHtml = '<div class="evaluesOverlay">';		  
		  mainHtml += '<div class="evaluesTitle forModal"><h2 class="jsonTitle"></h2><img src="/sams/images/BTN_Close-modal_19x20.gif" alt="Close" title="Close" /></div>';
		  mainHtml += '<div class="scroll">';		  
		
		 
		  /* Currently this has a static URLs and is not posting JSON request yet, this will be replaced by a dynamic one by Onsite */	
		  $('body').delegate("a#myEvalButn","click",(function() {				
				//set modal window status = open
			  modalStatus = true;
			  
			  //
				$.getJSON(pdpJson.pdpJsonUrl,function(sampData){
					
					//following lines truncates the evalue title (in modal window) to 41 chars and adds 3 ellipses to it 
					var truncTitle = sampData['producttitle'];
					var availability = sampData['availability'];
					if (truncTitle.length > 41){
						truncTitle = truncTitle.substring(0,41)+'...';
					}
					$('.evaluesTitle h2').html(truncTitle);
					 
				$('.scroll').empty(); 	
				
				if(sampData['evalue'] != ''){//check if json data not available
				
				var productid = sampData.productid;				
					/* Looping only the eValue (Level-1)*/
					var html = '<ul id="eValueItems"><div class="ConditionText">'+availability+'</div>';							
					
					$.each(sampData['evalue'], function(idx1, val1){ 	
						
						var eValTypeInt = val1['eValueType'];
						
						//$('.jsonTitle').html(producttitle);					
						var evalID =val1.eValueId;
						html += '<li class="eValListItems">';				
		                html += '<div class="ProductImage"><img src="'+val1['eValueImage']+'" alt="'+val1['title']+'" title="'+val1['title']+'" width="80" /></div>';  				 
		                html +='<div class="ProductDesc"><div class="HeaderText">' + val1['title']+'</div>';
													
						
						// Loop through the skuvariants
						/*
							$.each(val1['skuvariants'], function(idx2, val2){													
									var skunumber = val2.skunumber;							
									var titleVal = val2.title;	
									var imgPath	= val2.image;
									var url = val2.url;
									var description = val2.desc;
									var descriptionText=new Array();							
									$.each(val2['desc'], function(idx3, val3){								
										descriptionText[idx3]=val2.desc[idx3]+'<li>';								
									});
									//
									var spid = "p"+skunumber+idx2;
									//						
									html += '<li><a href="'+url+'" onMouseOver="javascript:fnShowPopUp(\''+skunumber+'\',\''+spid+'\',\''+imgPath+'\',\''+titleVal+'\',\''+descriptionText+'\');" onMouseOut="javascript:fnHidePopUp(\''+spid+'\');">' +skunumber+ '</a> '+titleVal+'<div id="'+spid+'" class="triangle-border"></div></li>';
								});
							
						html += '</ul></div>'; 				
						html += '<div class="ProductAvailability">';
						//html += '<div class="ProductAvailabilityText">Available...'+val1['availStart']+'</div>';
						html += '<div class="ProductAvailabilityText">'+val1['startDateStatus']+'...'+val1['availStart']+'</div>';						
		                */						
						/* -- */
						/* loop to get coreskus*/ 		
															
						if (eValTypeInt == 1 || eValTypeInt == 2){
							
							html += '<div class="clearfix"></div><ul class="ItemsChoice">';		
							html +='<span class="myeValLimit">'+val1['usage']+'</span>';		
												
						// Loop through the coreskus
							$.each(val1['coreSkus'], function(idx2, val2){													
								var skunumber = val2.skunumber;							
								var titleVal = val2.title;	
								var imgPath	= val2.image;
								var url = val2.url;
								var description = val2.desc;
								var descriptionText=new Array();							
								$.each(val2['desc'], function(idx3, val3){								
									descriptionText[idx3]=val2.desc[idx3]+'<li>';								
								});
								//
								var spid = "p"+skunumber+idx2;
								//						
								html += '<li><a href="'+url+'" onMouseOver="javascript:fnShowPopUp(\''+skunumber+'\',\''+spid+'\',\''+imgPath+'\',\''+titleVal+'\',\''+descriptionText+'\');" onMouseOut="javascript:fnHidePopUp(\''+spid+'\');">' +skunumber+ '</a> '+titleVal+'<div id="'+spid+'" class="triangle-border"></div></li>';
							});
						
					html += '</ul>'; 	
						
						}else if(eValTypeInt == 3 || eValTypeInt == 4){	
							
							html += '<div class="clearfix"></div><ul class="ItemsChoice">';	
							html +='<div class="isSubHeadPdp"><strong>'+val1['seedTitle']+'</strong></div>';
							html +='<div class="clearfix"></div><span class="myeValLimit">'+val1['usage']+'</span>';		
							
							// Loop through the seedskus
							html +=''
								$.each(val1['seedSkus'], function(idx2, val2){													
									var skunumber = val2.skunumber;							
									var titleVal = val2.title;	
									var imgPath	= val2.image;
									var url = val2.url;
									var description = val2.desc;
									var descriptionText=new Array();							
									$.each(val2['desc'], function(idx3, val3){								
										descriptionText[idx3]=val2.desc[idx3]+'<li>';								
									});
									//
									var spid = "p"+skunumber+idx2;
									//						
									html += '<li><a href="'+url+'" onMouseOver="javascript:fnShowPopUp(\''+skunumber+'\',\''+spid+'\',\''+imgPath+'\',\''+titleVal+'\',\''+descriptionText+'\');" onMouseOut="javascript:fnHidePopUp(\''+spid+'\');">' +skunumber+ '</a> '+titleVal+'<div id="'+spid+'" class="triangle-border"></div></li>';
								});
							
						html += '</ul>'; 	
						
						html += '<div class="clearfix"></div><ul class="ItemsChoice">';	
						html +='<div class="isSubHeadPdp"><strong>'+val1['rewardTitle']+'</strong></div>';
						html +='<span class="myeValLimit">'+val1['usage']+'</span>';		
						
						// Loop through the rewardskus	
						
						html +=''
							$.each(val1['rewardSkus'], function(idx2, val2){													
								var skunumber = val2.skunumber;							
								var titleVal = val2.title;	
								var imgPath	= val2.image;
								var url = val2.url;
								var description = val2.desc;
								var descriptionText=new Array();							
								$.each(val2['desc'], function(idx3, val3){								
									descriptionText[idx3]=val2.desc[idx3]+'<li>';								
								});
								//
								var spid = "p"+skunumber+idx2;
								//						
								html += '<li><a href="'+url+'" onMouseOver="javascript:fnShowPopUp(\''+skunumber+'\',\''+spid+'\',\''+imgPath+'\',\''+titleVal+'\',\''+descriptionText+'\');" onMouseOut="javascript:fnHidePopUp(\''+spid+'\');">' +skunumber+ '</a> '+titleVal+'<div id="'+spid+'" class="triangle-border"></div></li>';
							});
						
					html += '</ul>'; 				
							
						}else{
							//nothing
						}
						html += '</div>';	
						/* -- */
						
						/* condition to check if it is expires or expires soon */
						html += '<div class="ProductAvailability">';
						//html += '<div class="ProductAvailabilityText">Available...'+val1['availStart']+'</div>';
						html += '<div class="ProductAvailabilityText">'+val1['startDateStatus']+'...'+val1['availStart']+'</div>';
						
						var expFlag = (val1['expiryFlag']);
						if (expFlag == 1){
							html += '<div class="ProductExpiryText"><span class="expires">'+val1['availStatus']+'</span><span class="expiryDate">...'+val1['availEnd']+'</span></div>';				
						}
						else{
							html += '<div class="ProductExpiryText"><span class="expiresSoon">'+val1['availStatus']+'</span><span class="expiryDate">...'+val1['availEnd']+'</span></div>';				
						}
		                /**/
						html += '</div></li>';							
					  });	
					  html +='</ul>';
					 $('.scroll').append(html); 
					 
				} else{
					$('.scroll').html('<h2 class="jsonError">Sorry, please try later.</h2>');//rendering error if no data available				
				}
					 });	
						
		        
				$(".evaluesOverlay").show("fast");	
								
		        return false;  
		     }));  
		        $("body").delegate("div.evaluesTitle img","click", (function(event){
				$(".evaluesOverlay").hide("fast");
				$('body').find('a').attr('id','');
				//removes the class that was assigned on the fly while clicking on 'view savings'
				$(".evaluesOverlay").remove();
				//set modal window status = close
				modalStatus = false;
		      }));
		   mainHtml += '</div></div>';
		   $("a#myEvalButn").after(mainHtml);
		  //load and populate modal window - end //
		   
			
	
	}
		
	
	});
	  
});

setTimeout(function() {
 	$('.evaluesOverlay').ready(function(){
		
				/* see all - start - p0joshi */
				/* find an eValue with more than 2 skus */
				var liSize = $(".ItemsChoice").find("li:gt(2)");
				//add a class to hide the li 
				$(liSize).addClass('hideLi');
				$(liSize).parent().addClass('add-SeeAll');
				$('.add-SeeAll').after('<a href="javascript:void(0);" class="seeallLink"  style="font:normal 12px arial;color:#0075c8; text-decoration:none;">...See all</a>');		
					
				//display 'see all' and enable a click on it
				$('.seeallLink').click(function(){
					$(this).parent().find('.hideLi').removeClass('hideLi');		
					$(this).parent().find('.seeallLink').hide('fast');		
				});	
				/* see all - end - p0joshi */
				});
}, 5000);

	/* Function		: fnShowPopUp takes the ID, Image Path, Title & the Description as input parameters */	
	/* Last Editor	: Sathya */
	/* Date			: 03/27/2012 */
	/* Comment		: This method is used to show the child pop-up upon mouse over corresponding to the Link-ID */

	 function fnShowPopUp(skunumber,spid,imgPath,titleText,descriptionText){	
		jQuery(".triangle-border").empty();		
		var arrElements = new Array();	
		arrElements = descriptionText.split('<li>,');		
		var htm = '<div class="opImage">';
		htm += '<img src="'+imgPath+'" /></div>';
		htm += '<div class="opBody"><h1>' + titleText +'</h1>';
		htm += '<ul class="opDesc">';
		for(var ival=0;ival<arrElements.length;ival++){		
			htm += '<li>' + arrElements[ival].replace('<li>','') + '</li>';
		}	
		htm += '</ul></div><div class="itemNo">Item #: '+skunumber+'</div><div class="clearfix"></div>';
		htm += '<div>&nbsp;</div><span class="eVarrow"></span>';//added span tag to create arrow at the bottom of pop-up box (by Stan 05-16-2012)	

		$("#"+spid).append(htm);
		var boxHeight = $("#"+spid).height();
		
		var vOffset = 35;
		if ($.browser.webkit) {
           vOffset=47;
          }
		var vertPos = boxHeight+vOffset;// Fix for Google Chrome! (by Stan 6-9-2012)

        $("#"+spid).css('margin-top', '-'+vertPos+'px');//setting vertical offset of each pop-up box (by Stan 05-15-2012)                
        $("#"+spid).css('display', 'block');
		
		$("#"+spid).insertAfter('.scroll').fadeIn();
		$("body").delegate("ul.ItemsChoice li a", "mousemove", function(e){
			$('#'+spid).offset({left:e.pageX - 53, top:e.pageY - 134});
		});
	}
	/* Function		: fnHidePopUp takes the ID as input parameter */	
	/* Last Editor	: Sathya */
	/* Date			: 03/27/2012 */
	/* Comment		: This method is used to hide the child pop-up corresponding to the ID */
	function fnHidePopUp(id){
		document.getElementById(id).style.display='none';
		$("body").undelegate("ul.ItemsChoice li a","mousemove");
	}
	function setRegOnlineAndSubmit(){
		var formObj = document.registrationForm;
		if((document.getElementById("checkboxOnline")!=null ||
				document.getElementById("checkboxOnline")!=undefined) && 
					document.getElementById("checkboxOnline").checked){
			formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value=
				formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value+"&regOnline=true";
		} else {
			formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value=
				formObj["/atg/userprofiling/ProfileFormHandler.conflictingEmailURL"].value+"&regOnline=false";
		}
		submitRegistration();
  	}
	
	/* to open an overlay window on the new My Sams page - p0joshi*/
	function fnOpenMySamsOverlay(){	
		//alert("mysams overlay");
			var MySamsPostion = $(document).scrollTop();
			MySamsPostion = MySamsPostion + 20;	
			$('.mySamsModalContainer').css('display','block');
			$('.mySamsModalContainer').empty();
			
			var urlPath = '/sams/shoppingtools/justforyou/justForYouModal.jsp';
			$.ajax({
				type: 'GET',
				url : urlPath,
				cache:false,                                                        
				//data: "commerceItemId="+commerceItemId,                                                                                    
				success:function(result){                                                             
					$('.mySamsModalContainer').html(result); 
				}                                                                              
			});		
		$('.mySamsModalContainer').css("top",MySamsPostion);		
		$('.mySamsModalContainer').css("position","absolute");
		$('.mySamsModalContainer').css("z-index","99999");
		$('.mySamsModalContainer').css("left","5px");
		$('.mySams_overlayBG').css('display','block');
		//
		}	
/* End PASupport: 7 April 2012 for S2 */

//StartPA Support  for 12.8

/* Function		: fnCalculateTotal  */           
/* Last Editor	: Sathya */
/* Date			: 04/19/2012 */
/* Comment		: Amount will be set as a part of the input parameter for each radio button field. Upon selecting the radio button, this method calculates the TOTAL amount for the number of quantities if applicable. */	
	function fnCalculateTotal(amount,commerceId){
		var radioButtonsVal = document.getElementsByName('ProtectPlanOption');				
		var rdx = 0;			
		for (rdx = 0; rdx < radioButtonsVal.length; rdx ++) {					
			if (radioButtonsVal[rdx].checked) {
					var serviceAgrement = radioButtonsVal[rdx].value;						
					//$('.slidingDiv').load('/sams/cart/protectionplanSpecifications.jsp?id='+serviceAgrement+'&comerceItemId='+commerceId);									
					//$('.slidingDiv').html('');
					var urlDataPath = '/sams/cart/protectionplanSpecifications.jsp';
					var PPDataString = 'id='+serviceAgrement+'&comerceItemId='+commerceId;
					$.ajax({
						type: 'GET',
						url : urlDataPath,
						cache:false,				
						data: PPDataString,						
						success:function(result){				
							$('.slidingDiv').html(result); 			
						}						 					 
					});
				}
		}
		var Quantity=0;
					if(amount!='0'){				
						document.getElementById('QtyDDValue').disabled = false;						
						if(document.getElementById('QtyDDValue').value !=null && document.getElementById('QtyDDValue').value!='' ){							
							Quantity= document.getElementById('QtyDDValue').value;						
							amount = parseFloat(amount.replace('$','') * Quantity);							
							$('#GrandTotal').html('$'+amount.toFixed(2));							
						}
					else if(document.getElementById('qtyLbl').value !=null && document.getElementById('qtyLbl').value!='' ){
							Quantity= document.getElementById('QtyDDValue').value;						
							amount = parseFloat(amount.replace('$','') * Quantity);								
							$('#GrandTotal').html('$'+amount.toFixed(2));	
						}						
						else{
							$('#GrandTotal').html('$'+amount);	
						}
					}else{					
						document.getElementById('QtyDDValue').disabled = true;
						$('#GrandTotal').html('$00.00');	
					}
					
		}
/* Function		: EnableQty */           
/* Last Editor	: Sathya */
/* Date			: 04/19/2012 */
/* Comment		: This method is used to enable the dropdown on the page load based on the number quantity */	
		function EnableQty(QuantityCount,totalItems){	
				if(QuantityCount >1 && (document.getElementById('QtyLbl')!=null)){
				document.getElementById('QtyLbl').style.display = '';
				$('#QtyCount').html(QuantityCount);
				document.getElementById('QtyDD').style.display = '';
				document.getElementById('QtyDDValue').style.display = ''
				var iCount=0;		
				//Dynamically add the numer of quantities in the drop down list in the Descending order...
				for(iCount=QuantityCount;iCount>0;iCount--){				
					var optn = document.createElement("OPTION");
					optn.text = iCount;
					optn.value = iCount;
					document.getElementById('QtyDDValue').options.add(optn); 
				}	
				//document.getElementById('QtyDDValue').options[0].selected = true;						
				var radioButtons = document.getElementsByName('ProtectPlanOption');
				for (var x = 0; x < radioButtons.length; x ++) {
					  if ((radioButtons[x].checked) && (radioButtons[x].value=='0')) {  
						//Disable the dropdown if no protection plan is selected.
						 document.getElementById('QtyDDValue').disabled=true;
						 break;
						}
					 }			 
				}
				if(totalItems!=null && totalItems !=''){					
					document.getElementById('QtyLbl').style.display = '';
					$('#QtyCount').val('');
					$('#QtyCount').html(totalItems);
				}
				
		}	
		

/* Function		: fnDropdownTotal  */           
/* Last Editor	: Sathya */
/* Date			: 04/19/2012 */
/* Comment		: Amount will be set as a part of the input parameter for each radio button field. Upon choosing the Drop down value (When enabled), this method calculates the TOTAL amount */	
	function fnDropdownTotal(quantity){
			var radioButtonsVal = document.getElementsByName('ProtectPlanOption');			
			var planAmount =0;	
			var rdx = 0;			
			for (rdx = 0; rdx < radioButtonsVal.length; rdx ++) {					
				if (radioButtonsVal[rdx].checked) {
					if(radioButtonsVal[rdx].value !='0') {
						var serviceAgriment = document.getElementById(radioButtonsVal[rdx].value);						
						planAmount = parseFloat(serviceAgriment.innerHTML.replace('$','') * quantity);						
						$('#GrandTotal').html('$'+planAmount.toFixed(2));	
						break;
					}					
					else{ 					
						//document.getElementById('GrandTotal').innerHTML = '$00.00';											
						$('#GrandTotal').html('$00.00');	
						break;						
					}
				}
			}				
		}
		
/* Function		: fnUpdateProtectionPlan*/           
/* Last Editor	: Sathya */
/* Date			: 04/19/2012 */
/* Comment		: This method will be triggered when the user is in Cart page and clicks on Edit link */			
	function fnEditProtectionPlan(prodCount,planCount){
		// Show the quantity label on top regardless if the no of product is just 1
		document.getElementById('QtyLbl').style.display = '';
		document.getElementById('QtyCount').innerHTML =prodCount;		
		
		//show the corresponding radio button option which was opted earlier
		//Show the total number of plan count. Here we need to show the label instead of the drop down. Regardless if it is 1
		document.getElementById('QtyDD').style.display = '';
		document.getElementById('QtyDDValue').style.display = 'none';
		document.getElementById('qtyLbl').style.display = '';
		document.getElementById('qtyLbl').innerHTML =planCount;		
	}

	//StartPA Support  for 12.8
	$('#addtocartsingleajax').live('click',function() {			
		$('.loadPPOverlayCircle').css('display','block');
	    var dataString = "/sams" + $("#addToCartSingleForm").serialize();		
		var PDPaction = $("#addToCartSingleForm").attr("action");	
		$('.Protectionplan-Overlay-Container').empty();
	    var res = false;		  
		var overlayPos = Math.max(0, (($(window).height() - $('.Protectionplan-Overlay-Container').outerHeight()) / 2) + $(window).scrollTop()) - 70;
		var popupPosition = $(document).scrollTop() +10;	
		overlayPos = 	popupPosition + 60;	  
		$('.loadPPOverlayCircle').css('display','block');
		$('.loadPPOverlayCircle').css("position","absolute");
		$('.loadPPOverlayCircle').css("top", Math.max(0, (($(window).height() - $('.loadPPOverlayCircle').outerHeight()) / 2) + $(window).scrollTop()) + "px");
		$('.loadPPOverlayCircle').css("left", "100px");		
		$.ajax({               
			type: "POST",
			url:PDPaction,
			data: dataString,
			dataType: "json",
			cache: false,
			success: function(respObj) {		
				if(respObj != undefined && respObj != 'undefined' && respObj != null){
					var comeerceItemId= respObj.commerceItemId;
					var prdId = respObj.pId;
					var zipcodepageurl = respObj.GEZipcodePageUrl;				 
					var gepage = respObj.GEZipCodepage;				 
					if(gepage =='GE'){					
						window.location.href= zipcodepageurl;
					} else {
						if(respObj.isOverlay && respObj.isSuccess){
						//	Here is the nested Ajax call to load the actual protection plan upon Success...
							var urlCartPath = '/sams/cart/protectionPlanSelector.jsp';
					var cartDataString = 'productid='+prdId+'&comerceItemId='+comeerceItemId;
						$.ajax({
							type: 'GET',
							url : urlCartPath,
							cache:false,				
							data: cartDataString,						
							success:function(result){				
								$('.Protectionplan-Overlay-Container').html(result); 
								$('.Protectionplan-Overlay-Container').ready(function(){
								$('.loadPPOverlayCircle').hide();
								$('.Protectionplan-Overlay-Container').css('top', overlayPos+ "px");
								$('.Protectionplan-Overlay-Container').css('position','absolute');	
								$('.Protectionplan-Overlay-Container').css("left","5px");
								$('.Protectionplan-Overlay-Container').css("z-index","99999");									
								$('.Protectionplan-Overlay-Container').css('display','block');								
							});							 
							fnUpdateRHSCart();	
							$(this).css({
								"display" : "block",
								"left" : ($("body").width()-$(this).width())/2
							});
						}					 
					});		        
				} else if(respObj.isSuccess && !respObj.isOverlay){
					window.location.href="/sams/cart/addToCartConfirmPage.jsp";
				} else{
					if(($('#delqty').val()=='0' || $('#delqty').val()=='' || $('#delqty').val() == undefined ) && ($('#pickqty').val()=='0' || $('#pickqty').val()=='' ||$('#pickqty').val() == undefined)  ){ 
						$('#delqty').css("border","solid 2px #CC0000");
						$('#pickqty').css("border","solid 2px #CC0000");
					}				
					//Consolidated the error case and calling fnShowErrorCode method...
					fnShowErrorCode(respObj.Error_Code);
				}
			}
		}else{
			fnRecallJustOnce();
			//fnShowErrorCode('m_error_reset_wrong_att_system_fail');
		}
      }, 
      error: function(respObj){				
		//Consolidated the error case and calling fnShowErrorCode method...	
		if(respObj != undefined && respObj != 'undefined' && respObj != null){
			fnShowErrorCode(respObj.Error_Code);
		} else {
			fnShowErrorCode('m_error_reset_wrong_att_system_fail');
		}
      }
	});
		return res;	
	});
	
	function fnRecallJustOnce(){			
		$('.loadPPOverlayCircle').css('display','block');
	    var dataString = "/sams" + $("#addToCartSingleForm").serialize();		
		var PDPaction = $("#addToCartSingleForm").attr("action");	
		$('.Protectionplan-Overlay-Container').empty();
	    var res = false;		  
		var overlayPos = Math.max(0, (($(window).height() - $('.Protectionplan-Overlay-Container').outerHeight()) / 2) + $(window).scrollTop()) - 70;
		var popupPosition = $(document).scrollTop() +10;	
		overlayPos = 	popupPosition + 60;	  
		$('.loadPPOverlayCircle').css('display','block');
		$('.loadPPOverlayCircle').css("position","absolute");
		$('.loadPPOverlayCircle').css("top", Math.max(0, (($(window).height() - $('.loadPPOverlayCircle').outerHeight()) / 2) + $(window).scrollTop()) + "px");
		$('.loadPPOverlayCircle').css("left", "100px");		
		$.ajax({               
			type: "POST",
			url:PDPaction,
			data: dataString,
			dataType: "json",
			cache: false,
			success: function(respObj) {				
				if(respObj != undefined && respObj != 'undefined' && respObj != null){
					var comeerceItemId= respObj.commerceItemId;
					var prdId = respObj.pId;
					var zipcodepageurl = respObj.GEZipcodePageUrl;				 
					var gepage = respObj.GEZipCodepage;				 
					if(gepage =='GE'){					
						window.location.href= zipcodepageurl;
					} else {
						if(respObj.isOverlay && respObj.isSuccess){
						//	Here is the nested Ajax call to load the actual protection plan upon Success...
							var urlCartPath = '/sams/cart/protectionPlanSelector.jsp';
					var cartDataString = 'productid='+prdId+'&comerceItemId='+comeerceItemId;
						$.ajax({
							type: 'GET',
							url : urlCartPath,
							cache:false,				
							data: cartDataString,						
							success:function(result){				
								$('.Protectionplan-Overlay-Container').html(result); 
								$('.Protectionplan-Overlay-Container').ready(function(){
								$('.loadPPOverlayCircle').hide();
								$('.Protectionplan-Overlay-Container').css('top', overlayPos+ "px");
								$('.Protectionplan-Overlay-Container').css('position','absolute');	
								$('.Protectionplan-Overlay-Container').css("left","5px");
								$('.Protectionplan-Overlay-Container').css("z-index","99999");									
								$('.Protectionplan-Overlay-Container').css('display','block');								
							});							 
							fnUpdateRHSCart();	
							$(this).css({
								"display" : "block",
								"left" : ($("body").width()-$(this).width())/2
							});
						}					 
					});		        
				} else if(respObj.isSuccess && !respObj.isOverlay){
					window.location.href="/sams/cart/addToCartConfirmPage.jsp";
				} else{
					if(($('#delqty').val()=='0' || $('#delqty').val()=='' || $('#delqty').val() == undefined ) && ($('#pickqty').val()=='0' || $('#pickqty').val()=='' ||$('#pickqty').val() == undefined)  ){ 
						$('#delqty').css("border","solid 2px #CC0000");
						$('#pickqty').css("border","solid 2px #CC0000");
					}				
					//Consolidated the error case and calling fnShowErrorCode method...
					fnShowErrorCode(respObj.Error_Code);
				}
			}
		}else{									
			fnShowErrorCode('m_error_reset_wrong_att_system_fail');
		}
      }, 
      error: function(respObj){				
		//Consolidated the error case and calling fnShowErrorCode method...		
		fnShowErrorCode(respObj.Error_Code);	
      }
	});
		return res;		
	}
	
	
	
	
		$('.searchAddtocart').live('click',function() {					
				var formId=this.form.id;
				var action = $("#"+formId).attr("action");
				var overlayPos = Math.max(0, (($(window).height() - $('.Protectionplan-Overlay-Container').outerHeight()) / 2) + $(window).scrollTop()) - 70;
				var popupRePosition = $(document).scrollTop() +10;
						overlayPos = popupRePosition +40;
				$('.loadPPOverlayCircle').css('display','block');
				$('.loadPPOverlayCircle').css("position","absolute");
				$('.loadPPOverlayCircle').css("top", Math.max(0, (($(window).height() - $('.loadPPOverlayCircle').outerHeight()) / 2) + $(window).scrollTop()) + "px");
				$('.loadPPOverlayCircle').css("left", "100px");
				var dataString = "/sams" + $("#"+formId).serialize();
				$('.Protectionplan-Overlay-Container').empty();
				var res = false;		
				$.ajax({
				  context: this,	
				  type: "POST",
				   url:action,
				  data: dataString,
				  dataType: "json",
				  cache: false,
				  success: function(data) {
				   if(data!=null && data!=''){
					var comeerceItemId= data.commerceItemId;
					var prdId = data.pId;
					 var zipcodepageurl = data.GEZipcodePageUrl;				 
					 var gepage = data.GEZipCodepage;				 
					 if(gepage =='GE'){					
					window.location.href= zipcodepageurl;
					 }else {
					 if(data.isOverlay && data.isSuccess){
					//Here is the nested Ajax call to load the actual protection plan upon Success...
					var urlSearchtoCartPath = '/sams/cart/protectionPlanSelector.jsp';
					var searchDataString = 'productid='+prdId+'&comerceItemId='+comeerceItemId;
					$('#'+prdId).html('');
					$.ajax({
						type: 'GET',
						url : urlSearchtoCartPath,
						cache:false,				
						data: searchDataString,						
						success:function(result){				
							$('#'+prdId).html(result); 
							 $('.Protectionplan-Overlay-Container').ready(function(){
								$('.loadPPOverlayCircle').hide();
								$('.Protectionplan-Overlay-Container').css('top',popupRePosition);								
									$('.Protectionplan-Overlay-Container').css('position','absolute');	
									$('.Protectionplan-Overlay-Container').css("left","5px");
									$('.Protectionplan-Overlay-Container').css("z-index","99999");										
										$('#'+prdId).css('display','block');
								});							  
							  //$('#ajaxCartLoad').load('/sams/common/myCart.jsp');
							   fnUpdateRHSCart();	
							$(this).css({
								"display" : "block",
								"left" : ($("body").width()-$(this).width())/2
							});
						}					 
					});
				   }else if(data.isSuccess && !data.isOverlay){
					   if(data.fromShippingList){
						   window.location.href="/sams/cart/addToCartConfirmPage.jsp?shoppinglist=true";
					   }else{
						   window.location.href="/sams/cart/addToCartConfirmPage.jsp"; 
					   }						
					 }					 
				   else{						
						//Consolidated the error case and calling fnShowErrorCode method...
						fnShowErrorCode(data.Error_Code);
						if(data.fromShippingList){
							addErrorInListpage(data);
						}
				    	 
		             }
					 }
					 }
					 //The response object is empty hence throwing the error message...
							else{						
								fnShowErrorCode('m_error_reset_wrong_att_system_fail'); 
							}
					}, 
					error: function(data){						
						//Consolidated the error case and calling fnShowErrorCode method...
						fnShowErrorCode(data.Error_Code);
					}
				});
		return res;
		});
		



	function callProtectionplanOverlay(commerceItemId){		
		var newTopPostion = $(document).scrollTop();
		newTopPostion = newTopPostion + 80;					
		$('#'+commerceItemId).empty();
		$('#'+commerceItemId).css('display','none');
		var urlPath = '/sams/cart/cartProtectionplanSelctor.jsp';
		$.ajax({
		type: 'GET',
		url : urlPath,
		cache:false,                                                        
		data: "commerceItemId="+commerceItemId,                                                                                    
		success:function(result){                                                             
				$('#'+commerceItemId).html(result);
				$('#'+commerceItemId).css("top",newTopPostion);
				$('#'+commerceItemId).css("left","5px");
				$('#'+commerceItemId).css("position","absolute");
				$('#'+commerceItemId).css("z-index","99999");                                
				$('#'+commerceItemId).css('display','block');	
			}                                                                              
		});
			
}
	/* Threshold Shipping begins */
	/* function to bring up the tooltip on simple saver logo - prashant - 6/25/2012*/
		$(".threshold-tooltip").ready(function () {          

			var htm1 = '<div>&nbsp;</div><span class="eVarrow"></span>';
			$(".simpleSaverToolTip").append(htm1);		
					
			$('.simpleSaverLogo .simpleSaverLogoSideCart').ready(function() {
			$('.simpleSaverLogo, .simpleSaverLogoSideCart').each(function () {	
			
			var boxHeight = $(".simpleSaverToolTip").height();
			//alert("boxHeight = "+boxHeight);
			var vOffset = 55;
			if ($.browser.webkit) {
				vOffset=55;
		    }
			
			var distance = boxHeight-vOffset;// Fix for Google Chrome! (by Stan 6-9-2012)
			//var distance = 20;
			var time = 50;
			var hideDelay = 500;
			var hideDelayTimer = null;
			var beingShown = false;
			var shown = false;
			var trigger = $('.shipsFreeCopy', this);
			var info = $('.threshold-tooltip', this).css('display', 'none');
			$([trigger.get(0), info.get(0)]).mouseover(function () {
				if (hideDelayTimer) clearTimeout(hideDelayTimer);
				if (beingShown || shown) {
					// don't trigger the animation again
					return;
				} else {
					
					//var sfContainerOffset = $('.simpleSaverLogoSideCart').position();
					var sfOffset = $('.shipsFreeCopy').position();
					var xPos = sfOffset.left  - ($('.simpleSaverToolTip').width())/2 + 65;
					//alert(xPos);
					var yPos = sfOffset.top  - ($('.simpleSaverToolTip').height())*2 + 55;
					//alert(yPos);
				
						if ($(this).parents('div').hasClass("simpleSaverLogoSideCart")){
						//positioning for side cart related bubble
							// reset position of info box
							beingShown = true;
							info.css({
							top: yPos,
							left:xPos,
							display: 'block'
						}).animate({
							top: '-=' + distance + 'px'
						}, time, 'swing', function() {
							beingShown = false;
							shown = true;
							});
						}else{
						//positioning for non side cart related bubble
						// reset position of info box
							beingShown = true;
							info.css({
							top: -100,
							left:-60,
							display: 'block'
						}).animate({
							top: '-=' + distance + 'px'
						}, time, 'swing', function() {
							beingShown = false;
							shown = true;
							});
						}					
				}
					return false;
			}).mouseout(function () {
				if (hideDelayTimer) clearTimeout(hideDelayTimer);
					hideDelayTimer = setTimeout(function () {
						hideDelayTimer = null;
						info.css({
							'display':'none'
						}).animate({
							top: '-=' + distance + 'px'
						}
						, time, 'swing', function () {
							shown = false;
						});
					}, hideDelay);
					return false;
				});
			});
		});
		//--> 		
		});
		
		/* function to pull up a modal window for Threshold Shipping banner on homepage */
		/* This function has been commented as the modal window is no more required */
		/*$(function(){				
			$('.tsShipsFreeDONT').click(function(){				
				fnOpenShipsFreeOverlay();
			})							
		});  
		
		function fnOpenShipsFreeOverlay(){	
			var ShipsFreePostion = $(document).scrollTop();
			ShipsFreePostion = ShipsFreePostion + 20;	
			$('.shipsFreeModalContainer').css('display','block');
			$('.shipsFreeModalContainer').empty();
			//
				var urlPath = '/sams/shop/product/common/thresholdShippingOverlay.jsp';
				$.ajax({
				type: 'GET',
				url : urlPath,
				cache:false,                                                        
				//data: "commerceItemId="+commerceItemId,                                                                                    
				success:function(result){                                                             
				$('.shipsFreeModalContainer').html(result); 
							}                                                                              
		});		
		$('.shipsFreeModalContainer').css("top",ShipsFreePostion);				
		$('.shipsFreeModalContainer').css("position","absolute");
		$('.shipsFreeModalContainer').css("z-index","99999");
		$('.shipsFree_overlayBG').css('display','block');		
		}*/		
				
	/* Threshold Shipping ends */
function fnOpenPPDetailsOverlay(protectionPlanItemId){	
	var ppDetailsPostion = $(document).scrollTop();
	ppDetailsPostion = ppDetailsPostion + 20;	
	$('.ProtectionplanDetails-Overlay-Container').css('display','block');
	$('.ProtectionplanDetails-Overlay-Container').empty();
	$.get('/sams/cart/protectionPlanDetails.jsp?ppItemId='+protectionPlanItemId, function(ppContent){
		$('.ProtectionplanDetails-Overlay-Container').html(ppContent); 
	});
		$('.ProtectionplanDetails-Overlay-Container').css("top",ppDetailsPostion);		
		$('.ProtectionplanDetails-Overlay-Container').css("position","absolute");
		$('.ProtectionplanDetails-Overlay-Container').css("z-index","99999");
}
function callProtectionplanOverlayOrderHistory(commerceItemId,orderId,sgId){	
		var newTopPostion = $(document).scrollTop();
		newTopPostion = newTopPostion + 20;			
		$('#'+commerceItemId).empty();	
		$('#'+commerceItemId).css('display','none');
		$.get('/sams/cart/orderhistoryprotectionplanselector.jsp?commerceItemId='+commerceItemId+'&orderId='+orderId+'&ShGrpId='+sgId, function(result){
			$('#'+commerceItemId).html(result); 
		});
		$('#'+commerceItemId).css("top",newTopPostion);
		$('#'+commerceItemId).css("left","5px");
		$('#'+commerceItemId).css("position","absolute");
		$('#'+commerceItemId).css("z-index","99999");	
		$('#'+commerceItemId).css('display','block');				
}



$('#express').live('click',function() {	
	$('.loadPPOverlayCircle').css('display','block');
    var dataString = "/sams" + $("#addToCartSingleForm").serialize();
	   var action = $("#addToCartSingleForm").attr("action");	
	  $('.Protectionplan-Overlay-Container').empty();
    var res = false;		  
	  var overlayPos = Math.max(0, (($(window).height() - $('.Protectionplan-Overlay-Container').outerHeight()) / 2) + $(window).scrollTop()) - 70;
	  var popupPosition = $(document).scrollTop() +10;	
		overlayPos = 	popupPosition + 60;	  
			$('.loadPPOverlayCircle').css('display','block');
			$('.loadPPOverlayCircle').css("position","absolute");
			$('.loadPPOverlayCircle').css("top", Math.max(0, (($(window).height() - $('.loadPPOverlayCircle').outerHeight()) / 2) + $(window).scrollTop()) + "px");
			$('.loadPPOverlayCircle').css("left", "100px");				
	      $.ajax({                
	        type: "POST",
	        url:action,
	        data: dataString,
	        dataType: "json",
	        cache: false,
	        success: function(data) {
	    	  var comeerceItemId= data.commerceItemId;
	    	  var prdId = data.pId;
				 var page='express';
				 var zipcodepageurl = data.GEZipcodePageUrl;				 
				 var gepage = data.GEZipCodepage;				 
				 if(gepage =='GE'){					
				window.location.href= zipcodepageurl;
				 }else {
			 if(data.isOverlay && data.isSuccess){
					//Here is the nested Ajax call to load the actual protection plan upon Success...
					var urlExpressCartPath = '/sams/cart/protectionPlanSelector.jsp';
					var expressDataString = 'productid='+prdId+'&comerceItemId='+comeerceItemId+'&page='+page;
					$('.Protectionplan-Overlay-Container').html('');
					$.ajax({
						type: 'GET',
						url : urlExpressCartPath,
						cache:false,				
						data: expressDataString,						
						success:function(result){				
						$('.Protectionplan-Overlay-Container').html(result); 
						$('.Protectionplan-Overlay-Container').ready(function(){
							$('.loadPPOverlayCircle').hide();
							$('.Protectionplan-Overlay-Container').css('top', popupPosition+ "px");
							$('.Protectionplan-Overlay-Container').css('position','absolute');	
							$('.Protectionplan-Overlay-Container').css("left","5px");
							$('.Protectionplan-Overlay-Container').css("z-index","99999");									
							$('.Protectionplan-Overlay-Container').css('display','block');								
						});							 
						  //$('#ajaxCartLoad').load('/sams/common/myCart.jsp');	
						   fnUpdateRHSCart();	
						$(this).css({
							"display" : "block",
							"left" : ($("body").width()-$(this).width())/2
						});
						}					 
					});
		     }else if(data.isSuccess && !data.isOverlay){
		    	window.location.href='/sams/shop/product.jsp?productId='+prdId+'&checkout='+page;
			 }else{
				 //Start Modified for 12.9 site enhancements
				 if(($('#delqty').val()=='0' || $('#delqty').val()=='' || $('#delqty').val() == undefined ) && ($('#pickqty').val()=='0' || $('#pickqty').val()=='' ||$('#pickqty').val() == undefined)  ){ 
		                $('#delqty').css("border","solid 2px #CC0000");
	                    $('#pickqty').css("border","solid 2px #CC0000");
				     }
				 //end modified for 12.9 site enhancement changes								
				//Consolidated the error case and calling fnShowErrorCode method...
				fnShowErrorCode(data.Error_Code);
		    	 
             }
				 }
	      	}, 
	            error: function(data){							
				//Consolidated the error case and calling fnShowErrorCode method...
				fnShowErrorCode(data.Error_Code);
			}
	  });
	  return res;
	});
// Start12.9 site enhancement changes 
function SelectaClub(productId,skuId,rdurl,cId,page){	
	$('#pickup'+cId).show();
	$('#selectaclub'+cId).hide();
	
	$('#CartZipCode'+cId).live('click',function() {
		var zipCodeValue = $("#cartZip"+cId).val();
		if($("#cartZip"+cId).val().length == 0  || $("#cartZip"+cId).val()=="Enter ZIP, City or State"){
				$('#zipcodeError'+cId).css('display','block');
				$('#cartZip'+cId).addClass('cart_zipCodeErrorStroke');
		}
		else{
				$('#zipcodeError'+cId).css('display','none');					
				$('#cartZip'+cId).removeClass('cart_zipCodeErrorStroke').addClass('cart_zipCode');			
				
				callClubLocatorOverlayFromCartPage(productId,skuId,rdurl,cId,page);
			} 
	});
	
}
function callClubLocatorOverlayFromCartPage(productId,skuId,rdURL,cId,page){
	 var decodeUrl = decodeURIComponent(rdURL) 
	  var lastPageAccessInSeconds = Math.floor(lastAccesspage/1000);
	  var currnetDate = new Date();
	  var currnetDateInTime = currnetDate.getTime();
	  var currnetDateInSeconds = Math.floor(currnetDateInTime/1000);
	  var diffTime = currnetDateInSeconds - lastPageAccessInSeconds;
	  if(diffTime >= sessionTimeout){
		  window.location.reload();
	  }else{
	  openClubLocatorOverlay("/sams/shoppingtools/clubSelector/clubSelector.jsp?prodId="+productId+"&skuId="+skuId+"&redirectURL="+encodeURIComponent(decodeUrl)+"&page="+page+"&cID="+cId);
	  }
}

function changeClubFromCartPage(productId,skuId,rdURL,cId,page){	
	var changeclub = true;	
	  var lastPageAccessInSeconds = Math.floor(lastAccesspage/1000);
	  var currnetDate = new Date();
	  var currnetDateInTime = currnetDate.getTime();
	  var currnetDateInSeconds = Math.floor(currnetDateInTime/1000);
	  var diffTime = currnetDateInSeconds - lastPageAccessInSeconds;
	  if(diffTime >= sessionTimeout){
		  window.location.reload();
	  }else{
	  openClubLocatorOverlay("/sams/shoppingtools/clubSelector/clubSelector.jsp?prodId="+productId+"&changeclub="+changeclub+"&skuId="+skuId+"&redirectURL="+encodeURIComponent(rdURL)+"&page="+page+"&cID="+cId);
	  }
}


//end 12.9 site enhancement changes

function fnUpdateRHSCart(){	
	var urlRHSCartPath = '/sams/common/myCart.jsp';
    $.ajax({
           type: 'GET',
           url : urlRHSCartPath,
           cache:false,                                                                                                                                                    
           success:function(result){                                                             
                   $('#ajaxCartLoad').html(result); 
          }                                                                              
    });
}

$('#enableNotifyBtn').live('click',function() {
	 $('#mainAddToCart').empty();
	 document.getElementById('mainAddToCart').disabled=true;
		document.addToCartSingleForm.submit();
		
	 });
	 
function fnShowErrorCode(errCode){
		$('#ajaxError').empty();
		var msgurlPath = '/sams/common/getmessagekey.jsp';	
		if(!(errCode != '' && errCode !=null)){				
				errCode = 'm_error_reset_wrong_att_system_fail';
		}		
			$.ajax({
			type: 'GET',
			url : msgurlPath,
			cache:false,                                                        
			data: "key="+errCode,                                                                                    
			success:function(result){
							$('#ajaxError').addClass("orangeBg-whiteBrdr smMargB"); 						
							$('#displayError').hide();
							$('#ajaxError').html(result); 	
							$('#ajaxError').show();
							$('.loadPPOverlayCircle').hide();												
				}                                                                              
			});		
}
/* Start PA Modified :12.9 S2(Cash back) requirement */
function selectCashBack(){ 
	if(document.getElementById('cashPaymentGroupIds').checked){
		$.get("/sams/checkout/payment/addCashBack.jsp",function(sampData){								
			var payId = $.trim(($(sampData).find(".cashbackdiv")).html());				
			document.getElementById("cashPaymentGroupIds").value = payId;				
		});
	}else{		
		$.get("/sams/checkout/payment/removeCashBack.jsp",function(sampData){
		});
	}	
}
/* End PA Modified :12.9 S2(Cash back) requirement */
	
/* Start PA Modified :12.9 S2(MVP) requirement */

function submitCheckBoxForm(form, type) {
	if (type == 'select')
	{
		form.pilotpurchase.value = 'submit';
		if(form.selectMemType && !form.selectMemType.checked) {
		form.memType.value='Advantage Plus';
		} else {
		form.memType.value='Business Plus';
		}
		document.getElementById('pilotsetmemberInfo').disabled=true; 
		form.submit();
	} else {
		form.pilotpurchase.value = '';
		form.memType.value= '';
		document.getElementById('pilotpurchase').disabled=true;
		document.getElementById('pilotsetmemberInfo').disabled=false;
		}
  }
/* End PA support 12.9(MVP) changed */

function addErrorInListpage(data){
	$('.ajaxerr').removeClass("errorRed");
	$('#ajaxErrorTag'+data.pId).addClass("errorRed");
	if(window.location.href.indexOf("#") > -1) {
		window.location.href = document.URL	
	}else{
		window.location.href = document.URL+'#'
	}
}
/* Start PASupport 12.9 MVP Changes */

function submitFormOnEnterForPilot(form, ev) {
	var keycode;
	if (window.event) {
		keycode = window.event.keyCode;
	} else if (ev) {
		keycode = ev.which;
	} else {
		return true;
	}
	if (keycode == 13) {
		if (regFocus.length == 0) {
			trimFormElements(form);
			fetchPilotStatus('OnEnter', form);			
			return false;
		}
	} else {
		return true;
	}
	return false;
}

function fetchPilotStatus(content, form) {
	var zipCode = $("#zip").val();
	$.get("/sams/account/signin/fetchPilotStatus.jsp?zipCode=" + zipCode,
			function(result) {
				var reslength = result.length;			
				if (content == 'OnEnter') {
					if ((result != null || result != undefined)
							&& reslength > 0) {
						alert(result);
						form.submit();
					} else {
						form.submit();
					}
				} else {
					if ((result != null || result != undefined)
							&& reslength > 0) {
						alert(result);
						$("#purchaseAdvForm").submit();
					} else {
						$("#purchaseAdvForm").submit();
					}
				}
			});

}
/* End PASupport 12.9 MVP Changes */
//Product Wizard section starts here...
$(function(){
	
	$(document).ready(function(){
		
		// Load the subsequent scripts only for a product wizard template
		var isProductWizard = true;
		var finderInstanceId;
		var contentTemplate;
		var wizardDivId;
		var bgImgDivId;
		$('#SpinloadingImg').css('display','block');
		if ($("#tire_wizard").size()) {
			finderInstanceId = "tires";
			wizardDivId = "tire_wizard";
			bgImgDivId = "tw_bg_img";
			contentTemplate = "/sams/search/wizard/tireWizardContent.jsp";
		} else if ($("#ink_toner").size()) {
			finderInstanceId = "inktoner";
			wizardDivId = "ink_toner";
			bgImgDivId = "search_option";
			contentTemplate = "/sams/search/wizard/inkAndTonerWizardContent.jsp";
		} else {
			isProductWizard = false;
		}
		
		// Load the scripts only for a product wizard
		if (isProductWizard) {

			// The required wizard scoped objects
			var searchOptions;
			var currentSearchOption;
			var currentDataElements;
			var applicableDataElements;
			var searchOptionId;
			var currentCategoryId;
			var interactionState = "new";
			
			// Firstly, load the fragment to fetch the wizard parameters as a JSON
			$.ajax({
				type	: "POST",
				url		: "/sams/search/wizard/common/fetchWizardParams.jsp",
				data	: {finderInstance: finderInstanceId, interactionState: interactionState, selectionCount: 0},
				dataType: "json",
				cache	: false,
				success	: function(wizardData) {
					if (wizardData) {
	
						// In the event of a successful wizard data retrieval
						if (wizardData.isSuccess) {
	
							// Set the wizard's search option details
							searchOptions = wizardData.searchOptions;
							setSearchOptionData(wizardData, wizardData.searchOptId);
							
							// Load the wizard's search option content
							var isOpenSearch = currentSearchOption.isOpenSearch
							$("#" + wizardDivId).load(
									contentTemplate,
									{
										instanceId				: finderInstanceId,
										searchOption			: searchOptionId,
										isOpenSearch			: isOpenSearch,
										srchOptIdsStr 			: JSON.stringify(wizardData.srchOptIdsStr),
										dataElementsStr			: JSON.stringify(currentDataElements),
										dataElementId			: wizardData.dataElementId,
										applicableDataElemStr	: JSON.stringify(applicableDataElements),
										isLastSearch 			: currentSearchOption.isStoreLastSearch,
										isPopCategory			: currentSearchOption.isPopulateCategory,
										currentCategoryId		: currentCategoryId,
										isClubSelected			: false
									},
									function(){
										onWizardLoad();
									}
							);
	
							// The function to load the relevant JQuery after loading the wizard's content
							function onWizardLoad() {
	
								// Set the wizard's dimensions and background image
								setWizardUI(wizardData);
								
								// Change the interaction state to 'rendered' and load the relevant scripts
								interactionState = "rendered";
								if (finderInstanceId == "tires") {
									loadTireWizardScript();
									loadTireWizardSrchOptScript();
								} else if (finderInstanceId == "inktoner" && searchOptionId == "brand-model-series") {
									loadInkTonerWizardBMSScript();
								}
								
								// Load the open search and last search related JQuery, as applicable
								if (isOpenSearch) {
									loadOpenSrchScript();
								}
								if (currentSearchOption.isStoreLastSearch) {
									loadLastSrchScript();
								}
							}
	
							// The function which loads the scripts for a tire wizard in general
							function loadTireWizardScript() {
								
								// Initially, hide the club selection prompt.
								$("#club_sel_prompt").css("display","none");
								
								// The actions to be performed when the member wishes to select/change a club
								$("#select_a_club").live("click",function(){
									showClubSelection(true);
								});
								$("#change_club").live("click",function(){
									showClubSelection(false);
								});
								
								$("#LearnMoreLnk").live("click",function(){										
									showLearnMoreOverlay();
								});
								
								//Function to show the Learn More Overlay...
								function showLearnMoreOverlay(){
									var lmDetailsPostion = $(document).scrollTop();
									lmDetailsPostion = lmDetailsPostion + 20;	
									$('.LearnMoreLnk-Container').css('display','block');
									$('.LearnMoreLnk-Container').empty();
									var urlPathLm = '/sams/search/wizard/tire/searchBySizeLearnMore.jsp';
										$.ajax({
										type: 'GET',
										url : urlPathLm,
										cache:false,                                                        											                                                                           
										success:function(result){  												
											$('.LearnMoreLnk-Container').html(result); 
											$('.LearnMoreLnk-Container').css("top",lmDetailsPostion);				
											$('.LearnMoreLnk-Container').css("position","absolute");
											$('.LearnMoreLnk-Container').css("z-index","99999");
										  }                                                                              
										});
									
								}
								function showClubSelection(isFirstSel) {
									var content = "/sams/search/wizard/common/clubSelector.jsp";
									$('body').append('<div class="clubpopupOverlay"></div><div class="popupModalWindow clubLoc"><div class="popupCornerTL"></div><div class="popupCornerTop"></div><div class="popupCornerLeft"></div><div class="popupCornerBottom"></div><div class="popupCornerRight"></div><div class="popupCornerBL"></div><div class="popupCornerBR"></div><a href="#" class="popupClose">Close Popup Window</a><div class="popupModalContent"><div class="popupContentInner"></div></div></div>');
									
									/* To avoid modal window to appear off screen - Prashant/SamsClub*/
									var newTop = $(document).scrollTop();
									var clubTop = newTop + 100;
									$('.clubLoc').css("top",clubTop);
																			
									$('.clubpopupOverlay').add('.popupModalWindow').fadeOut(0);
									$('.clubpopupOverlay').fadeTo(100,0.6);
									$('.popupModalWindow').fadeIn(100);
									
									if(typeof(content)=='string' && content.match('')){		
										$('.popupContentInner').load(content);
									}else{
										$(content).clone().css({'display':'block','visibility':'visible','opacity':'1'}).appendTo($('.popupContentInner'));
										contentName=$(content).attr('id');
										if(contentName==''){contentName=$(content).find('h1:first,h2:first,h3:first,h4:first,h5:first,strong:first').eq(0).text();}
										if(contentName==''){contentName=$.trim($(content).text()).substr(0,20).replace(/ /gm,'');}
										trackEvent(contentName+'|popup|content');
										checkPopupHeight();	
									}
									
									// The action to facilitate Club Selection
									$("a[id^=submitClubSel_]").live("click",function(){
										var clubIdTokens = $(this).attr("id").split("_");
										var clubId;
										if (clubIdTokens.length == 2) {
											clubId = clubIdTokens[1];
										}
										$("#sel_club_id").val(clubId);
										$.ajax({                
											type	: "POST",
											url		: $("#update_club_form").attr("action"),
											data	: "/sams" + $("#update_club_form").serialize(),
											dataType: "json",
											cache	: false,
											success	: function(data) {
												if (data.isSuccess) {
													$('.clubpopupOverlay').add('.popupModalWindow').fadeOut(400,function(){$(this).remove();});
													$("#club_prompt").fadeOut();
													$("#club_sel_prompt").fadeOut();
													$("#club_info").load(
															"/sams/search/wizard/tire/clubInfo.jsp",
															{
																isLastSearch : currentSearchOption.isStoreLastSearch
															},
															function (){
																if (isFirstSel) {
																	$("#club_info").css("display", "block");
																} 
																$("div[id^=pageFilters] div[id^=clubLocator]").load(
																		"/sams/search/wizard/common/clubMetaInfo.jsp",
																		{selectedCatId : $("#vehicle").parent().attr("id")},
																		function(){
																			if (isFirstSel) {
																				$('<div></div>').load(
																						"/sams/search/wizard/common/clubName.jsp",
																						{selectedCatId : $("#vehicle").parent().attr("id")},
																						function() {
																							$("div.sortSide p a.right").replaceWith($(this).html());
																						}
																				);
																			} else {
																				$("div.sortSide span[id^=clubLocatorLink] a").html(
																					$.trim($("span#club_name").html()) + "&nbsp;" + "Club" + '<span class="arrow"></span>'
																				);
																			}
																		}
																);
																/*// The actions to be performed when the member wishes to change the club
																$("#change_club").click(function(){
																	showClubSelection();
																});*/
															}
													);
												}
											}, 
											error	: function(data) {
												
											}
										});
									});
									
									$('.popupClose').live('click',function(){
										$('.clubpopupOverlay').add('.popupModalWindow').fadeOut(400,function(){$(this).remove();});
										return false;
									});
								}
								
								// The actions in the event of a search option switch
								$("#vehicle .container .search .tabs ._nav li").click(function(){
									var srchOptContentDivId = $(this).attr("id");
									// Initially, hide the club selection prompt.
									$("#club_sel_prompt").css("display","none");
									if(srchOptContentDivId == "ssize"){
										//assign a height-A
										$('#tw_bg_img').css('height','265px');
									}else{
										//assign height-B
										$('#tw_bg_img').css('height','217px');
									}
									if(srchOptContentDivId && srchOptContentDivId=="svehicle" || srchOptContentDivId=="ssize"){
	
										// Set the search option switch
										$(this).addClass("active").siblings().removeClass("active");
										var $sept = $("#vehicle #svehicle").next();
										var $sepb = $("#vehicle #ssize").next();
										if($sept.attr("class")=="seperator-tb" && srchOptContentDivId=="svehicle"){
											$sept.attr("class","seperator-tt");		
											$sepb.attr("class","seperator-bt");						
										}
										else if($sept.attr("class")=="seperator-tt" && srchOptContentDivId=="ssize"){
											$sept.attr("class","seperator-tb");
											$sepb.attr("class","seperator-bb");
										}
	
										// Set the search option specific variables
										setSearchOptionData(wizardData, $(this).next().attr("id"));
	
										// Load the member selected search option with the initial data options
										$.ajax({
											type	: "POST",
											url		: "/sams/search/wizard/common/fetchWizardParams.jsp",
											data	: {
														finderInstance: finderInstanceId, 
														searchOption: searchOptionId,
														interactionState: interactionState, 
														applicableDataElemStr: JSON.stringify(applicableDataElements),
														selectionCount: 0
													},
											dataType: "json",
											cache	: false,
											success	: function(wizData) {
												if (wizData && wizData.isSuccess) {
													$("#search_option").load(
															"/sams/search/wizard/tire/searchOption.jsp",
															{
																searchOption		: searchOptionId,
																isOpenSearch		: isOpenSearch,
																dataElementsStr		: JSON.stringify(currentDataElements),
																dataElementId		: wizardData.dataElementId,
																isLastSearch 		: currentSearchOption.isStoreLastSearch,
																isPopCategory		: currentSearchOption.isPopulateCategory,
																currentCategoryId	: currentCategoryId
															},
															function(){
																$("#c_" + srchOptContentDivId).css("display", "block");
																loadTireWizardSrchOptScript();
															}
													);
												}
											}
										});
									}
								});
							}
	
							// The function which loads the scripts for a tire wizard's search option
							function loadTireWizardSrchOptScript() {
								
								function deactive(ids){
									var len = ids.length;
									for(var i=0; i<len; i++){
										var $mySelects = $('#' + ids[i]);
										$mySelects.addClass("deactive").attr("disabled","disabled").prev().addClass("deactive");
									}
								}
								
								function forgeSelect(id) {
									var $mySelects = $('#' + id);
									var $div = $("<div class='forgeSelect'></div>");
									var $ul = $("<ul></ul>");
									var $em = $("<span></span>");
									$div.css('zIndex',999);
									$div.click(
										function(){
											$('ul',this).show();
										}
									).mouseleave(
										function(){
											$('ul',this).hide();
										}
									);
									$div.append($em);
									$div.append($ul);
									var $myOptions = $('option', $mySelects);
									var k = $myOptions.length;
									for (var j = 0; j < k; j++) {
										var $myValue = $($myOptions[j]).val() ? $($myOptions[j]).val() : $($myOptions[j]).text();
										var $li = $("<li>" + $myValue + "</li>");
										$li.hover(function(){
											$(this).addClass('hover');
										},function(){
											$(this).removeClass('hover');
										});
										$li.click(function(){
											$(this).parent().prev().html($(this).text());
											var index = $(this).parent().find('li').index(this);
											$(this).parent().parent().next().get(0).selectedIndex = index;
											$(this).parent().parent().next().trigger("change");                                            
											$(this).parent().hide();            
											return false;
										});
										if ($myOptions[j].selected == true) {
											$em.html($myValue);
										}
										$ul.append($li);
										$ul.hide();
									}
									$($mySelects).parent().find('label').after($div);
									$($mySelects).hide();
								}
								
								// Reset the club prompt and the error message.
								$("#form_val_error").css("display","none");
								
								// Load the current search option specific scripts
								if (searchOptionId == "year-make-model") {
									loadTireWizardYMMScript();
								} else if (searchOptionId == "tire-size") {
									loadTireWizardTSScript();
								}
								
								// Pre-select the current brand
								var selectedBrand = $("#vehicle").parent().attr("id");
								$("#brand option[value=" + selectedBrand + "], #sbrand option[value=" + selectedBrand + "]")
								.attr("selected", "selected");
							}
	
							// The function which loads the scripts for a tire wizard's YMM search option
							function loadTireWizardYMMScript() {
								
								// Load the available vehicle years
								populateDataOptions(
										{
											finderInstance			: finderInstanceId,
											searchOption			: searchOptionId,
											interactionState		: interactionState,
											applicableDataElemStr	: JSON.stringify(applicableDataElements),
											selectionCount			: 0
										},
										"year"
								);
								if($('#year').val() == "Please Select" || $('#year').val() == null){
									$('#make').attr("disabled","disabled");
									$('label[for="make"]').addClass("deactive"); 
									$('#model').attr("disabled","disabled");
									$('label[for="model"]').addClass("deactive"); 
									$('#size').attr("disabled","disabled");
									$('label[for="size"]').addClass("deactive"); 
								}
								// The actions to be performed upon a year change
								$("#year").change(function(){
									resetDataElement("make");
									resetDataElement("model");
									resetDataElement("size");
									if ($(this).val() != "Please Select") {
										populateDataOptions(
												{
													finderInstance			: finderInstanceId,
													searchOption			: searchOptionId,
													interactionState		: interactionState,
													data1					: $(this).val(),
													applicableDataElemStr	: JSON.stringify(applicableDataElements),
													selectionCount			: 1
												},
												"make"
										);
									}
									if($('#year').val() == "Please Select" || $('#year').val() == null){
										$('#make').attr("disabled","disabled");
										$('label[for="make"]').removeClass('activate').addClass('deactive');
										$('#model').attr("disabled","disabled");
										$('label[for="model"]').removeClass('activate').addClass('deactive'); 
										$('#size').attr("disabled","disabled");
										$('label[for="size"]').removeClass('activate').addClass('deactive');
									}else if($('#make').val() == "Please Select" || $('#make').val() == null){
										$('#make').removeAttr("disabled","disabled");
										$('label[for="make"]').removeClass('deactive').addClass('activate');									
										$('#model').attr("disabled","disabled");
										$('label[for="model"]').addClass("deactive"); 
										$('#size').attr("disabled","disabled");
										$('label[for="size"]').addClass("deactive"); 
									}
								});
								
								// The actions to be performed upon a make change
								$("#make").change(function(){
									resetDataElement("model");
									resetDataElement("size");
									if ($(this).val() != "Please Select") {
										populateDataOptions(
												{
													finderInstance			: finderInstanceId,
													searchOption			: searchOptionId,
													interactionState		: interactionState,
													data1					: $("#year").val(),
													data2					: $(this).val(),
													applicableDataElemStr	: JSON.stringify(applicableDataElements),
													selectionCount			: 2
												},
												"model"
										);
									}
									if($('#year').val() == "Please Select" || $('#year').val() == null){
										$('#make').attr("disabled","disabled");
										$('label[for="make"]').removeClass('activate').addClass('deactive');
										$('#model').attr("disabled","disabled");
										$('label[for="model"]').removeClass('activate').addClass('deactive'); 
										$('#size').attr("disabled","disabled");
										$('label[for="size"]').removeClass('activate').addClass('deactive');
									}else if($('#make').val() == "Please Select" || $('#make').val() == null){
										$('#make').removeAttr("disabled","disabled");
										$('label[for="make"]').removeClass('deactive').addClass('activate');
										$('#model').attr("disabled","disabled");
										$('label[for="model"]').removeClass('activate').addClass('deactive'); 
										$('#size').attr("disabled","disabled");
										$('label[for="size"]').removeClass('activate').addClass('deactive');
									}else if($('#model').val() == "Please Select" || $('#model').val() == null){
										$('#make').removeAttr("disabled","disabled");
										$('label[for="make"]').removeClass('deactive').addClass('activate');									
										$('#model').removeAttr("disabled","disabled");
										$('label[for="model"]').removeClass('deactive').addClass('activate');									
										$('#size').attr("disabled","disabled");
										$('label[for="size"]').addClass("deactive"); 
									}
								});
								
								// The actions to be performed upon a model change
								$("#model").change(function(){
									resetDataElement("size");
									if ($(this).val() != "Please Select" || $(this).val() != "") {
										$("#form_val_error").css("display","none");
									}
									$("#form_val_error").css("display","none");
									if ($(this).val() != "Please Select") {
	
										// Populate the tire size specific data options fragment
										$("#size").load(
												"/sams/search/wizard/tire/tireSizeDataOptions.jsp",
												{
													finderInstance			: finderInstanceId, 
													searchOption			: searchOptionId,
													interactionState		: interactionState, 
													data1 					: $("#year").val(),
													data2 					: $("#make").val(),
													data3 					: $(this).val(),
													applicableDataElemStr 	: JSON.stringify(applicableDataElements),
													selectionCount			: 3
												}
										);
									}
									if($('#year').val() == "Please Select" || $('#year').val() == null){
										$('#make').attr("disabled","disabled");
										$('label[for="make"]').removeClass('activate').addClass('deactive');
										$('#model').attr("disabled","disabled");
										$('label[for="model"]').removeClass('activate').addClass('deactive'); 
										$('#size').attr("disabled","disabled");
										$('label[for="size"]').removeClass('activate').addClass('deactive');
									}else if($('#make').val() == "Please Select" || $('#make').val() == null){
										$('#make').removeAttr("disabled","disabled");
										$('label[for="make"]').removeClass('deactive').addClass('activate');
										$('#model').attr("disabled","disabled");
										$('label[for="model"]').removeClass('activate').addClass('deactive'); 
										$('#size').attr("disabled","disabled");
										$('label[for="size"]').removeClass('activate').addClass('deactive');
									}else if($('#model').val() == "Please Select" || $('#model').val() == null){
										$('#make').removeAttr("disabled","disabled");
										$('label[for="make"]').removeClass('deactive').addClass('activate');									
										$('#model').removeAttr("disabled","disabled");
										$('label[for="model"]').removeClass('deactive').addClass('activate');									
										$('#size').attr("disabled","disabled");
										$('label[for="size"]').removeClass('activate').addClass('deactive');	
									}else if($('#size').val() == "Please Select" || $('#size').val() == null){
										$('#make').removeAttr("disabled","disabled");
										$('label[for="make"]').removeClass('deactive').addClass('activate');									
										$('#model').removeAttr("disabled","disabled");
										$('label[for="model"]').removeClass('deactive').addClass('activate');									
										$('#size').removeAttr("disabled","disabled");
										$('label[for="size"]').removeClass('deactive').addClass('activate');
									}
								});
								
								// Configure the action to be performed when the user clicks on the 'Show Me Tires' link
								$("#tw_year-make-model_search").click(function(){
									var isValidationSuccess = true;
									var vYear = $("#year").val();
									var vMake = $("#make").val();
									var vModel = $("#model").val();
									var srchCatId = $("#brand").val();
									var srchSize = $("#size").val();
									// See if a club check is required and prompt the user for club selection if required
									if (currentSearchOption.isClubCheck && !$("#change_club").size()) {
										$("#club_sel_prompt").css("display","block").html("Please select a Club to see available tires.");
										isValidationSuccess = false;
										return;
									}
									// Perform initial validation and populate the corresponding error messages if required
									if (vYear == "Please Select" || vMake == "Please Select" || vModel == "Please Select") {
										$("#form_val_error").css("display","block").html("Please select your vehicle's Year, Make and Model");
										isValidationSuccess = false;
									}
									
									//1- Validation for Year option...																		
									if (vYear == "Please Select" || vYear == null){
										$("#year").addClass('errorBorder');
										isValidationSuccess = false;
									} else { $("#year").removeClass('errorBorder'); }									
									
									//2- Validation for Make Option...
									if(vMake == "Please Select" || vMake == null){
										$("#make").addClass('errorBorder');										
										isValidationSuccess = false;
									}else { $("#make").removeClass('errorBorder'); }
									
									//3- Validation for Model option...									
									if(vModel == "Please Select" || vModel == null){
										$("#model").addClass('errorBorder');										
										isValidationSuccess = false;
									}else { $("#model").removeClass('errorBorder'); }
									
									//4- Validation for Size option...									
									if(srchSize == "Please Select" || srchSize == null){
										$("#size").addClass('errorBorder');										
										isValidationSuccess = false;
									}else { $("#size").removeClass('errorBorder'); }
	
									// If there are no form errors, set the necessary form handler attributes and submit the form
									if (isValidationSuccess) {	
										$("#f_veh_year").val(vYear);
										$("#f_veh_make").val(vMake);
										$("#f_veh_model").val(vModel);
										$("#f_tire_size").val($("#size").val());											
										if (srchCatId && srchCatId != "See all brands") {
											$("#f_srch_cat_id").val(srchCatId);
											$("#f_sel_tire_brand").val($("#brand").find("'option[value=" + srchCatId + "]'").html());
										} else {
											$("#f_srch_cat_id").val("all");
										}
										var clubId = $("#change_club").parent().attr("id");
										$("#f_club_id").val(clubId);
										$("#f_store_num").val(clubId);
										$("#f_srch_cnt_type").val(currentSearchOption.searchContentType);
										$("#f_srch_term").val($("#size").val());
											$("#ymm_srch_form").submit();										
										
									} else{
									//Validation is failed, stay on the same page...
										$("#form_val_error").css("display","block").html("Please select your vehicle's Year, Make and Model");
										return;
									}
								});
							}
							
							
							// The function which loads the scripts for a tire wizard's TS search option
							function loadTireWizardTSScript() {
								
								// Load the available tire width values from the feed
								populateDataOptions(
										{
											finderInstance			: finderInstanceId,
											searchOption			: searchOptionId,
											interactionState		: interactionState,
											applicableDataElemStr	: JSON.stringify(applicableDataElements),
											selectionCount			: 0
										},
										"tire_width"
								);
								 if($('#tire_width').val() == "Please Select" || $('#tire_width').val() == null){
										$('#tire_width').removeAttr("disabled","disabled");
										$('label[for="tire_width"]').removeClass('deactive').addClass('activate');	
										$('#aspect_ratio').attr("disabled","disabled");
										$('label[for="aspect_ratio"]').addClass("deactive"); 
										$('#rim_diameter').attr("disabled","disabled");
										$('label[for="rim_diameter"]').addClass("deactive"); 
									}
								
								// The actions to be performed upon a tire width change
								$("#tire_width").change(function(){
									resetDataElement("aspect_ratio");
									resetDataElement("rim_diameter");
									if ($(this).val() != "Please Select") {
										populateDataOptions(
												{
													finderInstance			: finderInstanceId,
													searchOption			: searchOptionId,
													interactionState		: interactionState,
													data1					: $(this).val(),
													applicableDataElemStr	: JSON.stringify(applicableDataElements),
													selectionCount			: 1
												},
												"aspect_ratio"
										);
									}
									if($('#tire_width').val() == "Please Select" || $('#tire_width').val() == null){
										$('#tire_width').removeAttr("disabled","disabled");
										$('label[for="tire_width"]').removeClass('deactive').addClass('activate');
										$('#aspect_ratio').attr("disabled","disabled");
										$('label[for="aspect_ratio"]').removeClass('activate').addClass('deactive'); 
										$('#rim_diameter').attr("disabled","disabled");
										$('label[for="rim_diameter"]').removeClass('activate').addClass('deactive');
									}else if($('#aspect_ratio').val() == "Please Select" || $('#aspect_ratio').val() == null){
										$('#tire_width').removeAttr("disabled","disabled");
										$('label[for="tire_width"]').removeClass('deactive').addClass('activate');									
										$('#aspect_ratio').removeAttr("disabled","disabled");
										$('label[for="aspect_ratio"]').removeClass('deactive').addClass('activate');									
										$('#rim_diameter').attr("disabled","disabled");
										$('label[for="rim_diameter"]').addClass("deactive"); 
									}
								});
								
								// The actions to be performed upon an aspect ratio change
								$("#aspect_ratio").change(function(){
									resetDataElement("rim_diameter");
									if ($(this).val() != "Please Select" || $(this).val() != "") {
										$("#form_val_error").css("display","none");
									}
									if ($(this).val() != "Please Select") {
										populateDataOptions(
												{
													finderInstance			: finderInstanceId,
													searchOption			: searchOptionId,
													interactionState		: interactionState,
													data1					: $("#tire_width").val(),
													data2					: $(this).val(),
													applicableDataElemStr	: JSON.stringify(applicableDataElements),
													selectionCount			: 2
												},
												"rim_diameter"
										);
									}
									if($('#tire_width').val() == "Please Select" || $('#tire_width').val() == null){
										$('#tire_width').removeAttr("disabled","disabled");
										$('label[for="tire_width"]').removeClass('deactive').addClass('activate');
										$('#aspect_ratio').attr("disabled","disabled");
										$('label[for="aspect_ratio"]').removeClass('activate').addClass('deactive'); 
										$('#rim_diameter').attr("disabled","disabled");
										$('label[for="rim_diameter"]').removeClass('activate').addClass('deactive');
									}else if($('#aspect_ratio').val() == "Please Select" || $('#aspect_ratio').val() == null){
										$('#tire_width').removeAttr("disabled","disabled");
										$('label[for="tire_width"]').removeClass('deactive').addClass('activate');									
										$('#aspect_ratio').removeAttr("disabled","disabled");
										$('label[for="aspect_ratio"]').removeClass('deactive').addClass('activate');									
										$('#rim_diameter').attr("disabled","disabled");
										$('label[for="rim_diameter"]').removeClass('activate').addClass('deactive');	
									}else if($('#rim_diameter').val() == "Please Select" || $('#rim_diameter').val() == null){
										$('#tire_width').removeAttr("disabled","disabled");
										$('label[for="tire_width"]').removeClass('deactive').addClass('activate');									
										$('#aspect_ratio').removeAttr("disabled","disabled");
										$('label[for="aspect_ratio"]').removeClass('deactive').addClass('activate');									
										$('#rim_diameter').removeAttr("disabled","disabled");
										$('label[for="rim_diameter"]').removeClass('deactive').addClass('activate');
									}
								});
								
								// Configure the action to be performed when the user clicks on the 'Show Me Tires' link
								$("#tw_tire-size_search").click(function(){
									var isValidationSuccess = true;
									var tWidth = $("#tire_width").val();
									var tRatio = $("#aspect_ratio").val();
									var tDia = $("#rim_diameter").val();
									var srchCatId = $("#sbrand").val();	
									
									// See if a club check is required and prompt the user for club selection if required
									if (currentSearchOption.isClubCheck && $("#club_prompt").css("display") == "block" 
										//Start PA Support: 12.9 Product Wizard - Fix for Defect # 9676
										&& !$("#change_club").size()
										//End PA Support: 12.9 Product Wizard - Fix for Defect # 9676
									) {
										$("#club_sel_prompt").css("display","block").html("Please select a club to see available tires");
										isValidationSuccess = false;
										return;
									}
									
									// Perform initial validation and populate the corresponding error messages if required
									if (tWidth == "Please Select" || tRatio == "Please Select" || tDia == "Please Select") {
										$("#form_val_error").css("display","block").html("Please tell us the Tire Width, Aspect Ratio, and Rim Diameter");
										isValidationSuccess = false;
									}
									
									//1- Validation for Tire Width option...
									if(tWidth == "Please Select" || tWidth == null){										
										$("#tire_width").addClass('errorBorder');										
										isValidationSuccess = false;
									}else { $("#tire_width").removeClass('errorBorder'); }
									
									//2- Validation for Aspect Ration option...
									if (tRatio == "Please Select" || tRatio == null){										
										$("#aspect_ratio").addClass('errorBorder');										
										isValidationSuccess = false;
									} else { $("#aspect_ratio").removeClass('errorBorder'); }
									
									//3- Validation for Rim Diameter Option....
									if(tDia == "Please Select" || tDia == null){									
										$("#rim_diameter").addClass('errorBorder');																					
										isValidationSuccess = false;
									} else { $("#rim_diameter").removeClass('errorBorder'); }
									
									
									
									
									// If there are no form errors, set the necessary form handler attributes and submit the form
									if (isValidationSuccess) {																					
										showWarningOverlay();
									}else{
										//Validation is failed, hence stay on the same page...
										$("#form_val_error").css("display","block").html("Please tell us the Tire Width, Aspect Ratio, and Rim Diameter");											
										return;
									}
									
									//Function to Show Warning overlay...
								function showWarningOverlay(){																				
									var WarningPostion = $(document).scrollTop();
									WarningPostion = WarningPostion + 120;	
									$('.SBSWarning-Container').css('display','block');
									$('.SBSWarning-Container').css("top",WarningPostion);				
									$('.SBSWarning-Container').css("position","absolute");
									$('.SBSWarning-Container').css("z-index","99999");										
								}
									$("#btnAgree").live("click",function(){																																
										$("#f_tire_width").val(tWidth);
										$("#f_tire_ratio").val(tRatio);
										$("#f_tire_dia").val(tDia);	
										$("#f_srch_cat_id").val((srchCatId && srchCatId != "See all brands") ? srchCatId : "all");
										var clubId = $("#change_club").parent().attr("id");
										$("#f_club_id").val(clubId);
										$("#f_store_num").val(clubId);
										$("#f_srch_cnt_type").val(currentSearchOption.searchContentType);
										$("#ts_srch_form").submit();
									});
								});
							}
							
							
							function fnSearchbySizeFormSubmit(){											
										$("#f_tire_width").val(tWidth);
										$("#f_tire_ratio").val(tRatio);
										$("#f_tire_dia").val(tDia);
										var srchCatId = $("#sbrand").val();
										$("#f_srch_cat_id").val(
												(srchCatId && srchCatId != "See all brands") ? srchCatId : "all");
										var clubId = $("#change_club").parent().attr("id");
										$("#f_club_id").val(clubId);
										$("#f_store_num").val(clubId);
										$("#f_srch_cnt_type").val(currentSearchOption.searchContentType);
										$("#ts_srch_form").submit();
							}
							
							// The function which loads the scripts for an ink and toner wizard's BMS search option
							function loadInkTonerWizardBMSScript() {
								
								// Load the available printer brands from the feed
								populateDataOptions(
										{
											finderInstance			: finderInstanceId,
											searchOption			: searchOptionId,
											interactionState		: interactionState,
											applicableDataElemStr	: JSON.stringify(applicableDataElements),
											selectionCount			: 0
										},
										"brand"
								);
								
								// Initially hide the error message DIV
								$("#form_val_error").css("display", "none");
								$('a.Find_BTN_darkblue').ready(function(){
									//$('a.Find_BTN_darkblue').addClass('mt15');
								});
								
								// The actions to be performed upon a brand change
								$("#brand").change(function(){
									resetDataElement("printer");
									resetDataElement("model");
									if ($(this).val() != "Please Select") {
										populateDataOptions(
												{
													finderInstance			: finderInstanceId,
													searchOption			: searchOptionId,
													interactionState		: interactionState,
													data1					: $(this).val(),
													applicableDataElemStr	: JSON.stringify(applicableDataElements),
													selectionCount			: 1
												},
												"printer"
										);
									}
								});
								
								// The actions to be performed upon a printer change
								$("#printer").change(function(){
									resetDataElement("model");
									if ($(this).val() != "Please Select") {
										populateDataOptions(
												{
													finderInstance			: finderInstanceId,
													searchOption			: searchOptionId,
													interactionState		: interactionState,
													data1					: $("#brand").val(),
													data2					: $(this).val(),
													applicableDataElemStr	: JSON.stringify(applicableDataElements),
													selectionCount			: 2
												},
												"model"
										);
									}
								});
								
								// The actions to be performed upon a model change
								$("#model").change(function(){
									if ($(this).val() != "Please Select" || $(this).val() != "") {
										$("#form_val_error").css("display","none");
									}
								});
								
								// Configure the action to be performed when the user clicks on the 'See Ink & Toner' link
								$("#int_brand-model-series_search").click(function(){
									var isValidationSuccess = true;
									var pBrand = $("#brand").val();
									var pType = $("#printer").val();
									var pModel = $("#model").val();
									//Hiding the top image error section...
									$("#partNum_val_error").css("display","none");
									$('#srch_term').removeClass('errorBorder');
									// Perform initial validation and populate the corresponding error messages if required
									if (pBrand == "Please Select" || pType == "Please Select" || pModel == "Please Select") {
										$("#form_val_error").css("display","block").html("Please tell us your Printer Brand, Printer Type, and Model Number");
										isValidationSuccess = false;
									}
									//1- Validation for Brand option...
									if (pBrand == "Please Select"  || pBrand == null){
										$("#brand").addClass('errorBorder');
										isValidationSuccess = false;
									}else{
										$("#brand").removeClass('errorBorder');
									}
									
									//2-Validation for Printer type option...
									if (pType == "Please Select"  || pType == null){
										$("#printer").addClass('errorBorder');
										isValidationSuccess = false;
									}else{
										$("#printer").removeClass('errorBorder');
									}
									
									//3-Validation for Model option....
									if (pModel == "Please Select"  || pModel == null){
										$("#model").addClass('errorBorder');
										isValidationSuccess = false;
									}else{
										$("#model").removeClass('errorBorder');
									}
									// If there are no form errors, set the necessary form handler attributes and submit the form
									if (isValidationSuccess) {
										$("#f_sel_opts").val(JSON.stringify([pBrand, pType, pModel]));
										$("#f_srch_cnt_type").val(currentSearchOption.searchContentType);
										$("#bms_srch_form").submit();
									}else{
										$("#form_val_error").css("display","block").html("Please tell us your Printer Brand, Printer Type, and Model Number");
										return;
									}
								});
								
								// Configure the action to be performed when the user performs a 'Part Number Search'
								$("#int-open-search").click(function(){
									//Hide the error message sections...
									$("#form_val_error").css("display","none");
									$("#brand").removeClass('errorBorder');
									$("#printer").removeClass('errorBorder');
									$("#model").removeClass('errorBorder');									
									if ($("#srch_term").val() && $("#srch_term").val() != null && $.trim($("#srch_term").val()) != '') {
										$('#srch_term').removeClass('errorBorder');
										$("#partNum_val_error").css("display","none");
										$("#osf_srch_term").val($("#srch_term").val());
										$("#open_srch_form").submit();
									} else {
										$("#partNum_val_error").css("display","block").html("Please enter your part number or search by Brand.");
										$('#srch_term').addClass('errorBorder');
									}
								});
								
							}
	
							// The function to populate data options based on the given interface and input parameter JSON
							function populateDataOptions(inputParamJSON, interfaceId) {
								$("#" + interfaceId).load("/sams/search/wizard/common/dataOptions.jsp", inputParamJSON);
							}
	
							// The function to load the relevant JQuery for the Open Search on the product wizard
							function loadOpenSrchScript() {
								$("#ink_toner .direct .tips").click(function(){
									//Hide the error message if it is available...
									$("#form_val_error").css("display","none");
									$("#brand").removeClass('errorBorder');
									$("#printer").removeClass('errorBorder');
									$("#model").removeClass('errorBorder');
									var cheight = $(".content").height();
									var govisable = $(this).next().css("display");
									if(govisable!="block"){
										$(this).css("margin-bottom",0).next().css("display","block");											
										$(".content").height(cheight+35);
									}
									else{
										$(this).css("margin-bottom",25).next().css("display","none");											
										$(".content").height(cheight-41);
									}
								});		
							}
	
							// The function to load the relevant JQuery to facilitate the product wizard's last search feature
							function loadLastSrchScript() {
								
							}
														 
						}
	
						// If the wizard data could not be retrieved successfully
						else if (wizardData.isEmpty) {
							
						}
	
						// In the event of an error while retrieving the wizard data
						else if (wizardData.isError) {
							
						}
					}
				}
			});
			
			// The function to set the initial wizard data parameters
			function setSearchOptionData(wizardData, searchOptId) {
				searchOptionId = searchOptId;
				if (searchOptions) {
					currentSearchOption = searchOptions[searchOptId];
					if (currentSearchOption) {
						currentDataElements = currentSearchOption.dataElements;
						applicableDataElements = currentSearchOption.applicableDataElements;
						if (currentSearchOption.isPopulateCategory) {
							currentCategoryId = currentSearchOption.categoryId;
						}
					}
				}
			}
			
			// The function to set the wizard's dimensions and background image
			function setWizardUI(wizardData) {
				
				// Dynamically create a CSS class to render the wizard's background image  
				$("head").append(
						"<style type='text/css'> .dynWizParams{background:url("
						+ wizardData.backgroundImageURL
						+ ");} </style>"
				);

				// Set the finder instance's height and width and add the dynamically created class to the background image holder element 
				$("#" + wizardDivId).css({					
					"width" : wizardData.width
				});
				$("#" + bgImgDivId).addClass("dynWizParams");
				
			}
			
			// The function to reset a data element with the given ID, if already set.
			function resetDataElement(elementId) {
				var dataElem = $("#" + elementId);
				if (dataElem && dataElem != null) {
					dataElem.empty();
				}
			}
		
		}
		$('.conditions').ready(function(){						
			//Hide the loading image once the page is ready...
			$('#SpinloadingImg').css('display','none');
		});		
		
	});

});
//Product Wizard section ends...
/* SWFObject v2.2 alpha10 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007-2009 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var C="undefined",q="object",R="Shockwave Flash",V="ShockwaveFlash.ShockwaveFlash",p="application/x-shockwave-flash",Q="SWFObjectExprInst",w="onreadystatechange",N=window,j=document,s=navigator,S=false,T=[h],n=[],M=[],H=[],l,P,D,A,I=false,a=false,m,F,L=function(){var Z=typeof j.getElementById!=C&&typeof j.getElementsByTagName!=C&&typeof j.createElement!=C,af=[0,0,0],ab=null;if(typeof s.plugins!=C&&typeof s.plugins[R]==q){ab=s.plugins[R].description;if(ab&&!(typeof s.mimeTypes!=C&&s.mimeTypes[p]&&!s.mimeTypes[p].enabledPlugin)){S=true;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");af[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);af[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);af[2]=/r/.test(ab)?parseInt(ab.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof N.ActiveXObject!=C){try{var ac=new ActiveXObject(V);if(ac){ab=ac.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");af=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Y){}}}var ag=s.userAgent.toLowerCase(),X=s.platform.toLowerCase(),ae=/webkit/.test(ag)?parseFloat(ag.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,W=false,ad=X?/win/.test(X):/win/.test(ag),aa=X?/mac/.test(X):/mac/.test(ag);/*@cc_on W=true;@if(@_win32)ad=true;@elif(@_mac)aa=true;@end@*/return{w3:Z,pv:af,wk:ae,ie:W,win:ad,mac:aa}}(),k=function(){if(!L.w3){return}if((typeof j.readyState!=C&&j.readyState=="complete")||(typeof j.readyState==C&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!I){if(typeof j.addEventListener!=C){j.addEventListener("DOMContentLoaded",f,false)}if(L.ie&&L.win){j.attachEvent(w,function(){if(j.readyState=="complete"){j.detachEvent(w,arguments.callee);f()}});if(N==top){(function(){if(I){return}try{j.documentElement.doScroll("left")}catch(W){setTimeout(arguments.callee,0);return}f()})()}}if(L.wk){(function(){if(I){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}r(f)}}();function f(){if(I){return}try{var Y=j.getElementsByTagName("body")[0].appendChild(B("span"));Y.parentNode.removeChild(Y)}catch(Z){return}I=true;var W=T.length;for(var X=0;X<W;X++){T[X]()}}function J(W){if(I){W()}else{T[T.length]=W}}function r(X){if(typeof N.addEventListener!=C){N.addEventListener("load",X,false)}else{if(typeof j.addEventListener!=C){j.addEventListener("load",X,false)}else{if(typeof N.attachEvent!=C){i(N,"onload",X)}else{if(typeof N.onload=="function"){var W=N.onload;N.onload=function(){W();X()}}else{N.onload=X}}}}}function h(){if(S){U()}else{G()}}function U(){var W=j.getElementsByTagName("body")[0];var Z=B(q);Z.setAttribute("type",p);var Y=W.appendChild(Z);if(Y){var X=0;(function(){if(typeof Y.GetVariable!=C){var aa=Y.GetVariable("$version");if(aa){aa=aa.split(" ")[1].split(",");L.pv=[parseInt(aa[0],10),parseInt(aa[1],10),parseInt(aa[2],10)]}}else{if(X<10){X++;setTimeout(arguments.callee,10);return}}W.removeChild(Z);Y=null;setTimeout(G,10)})()}else{setTimeout(G,10)}}function G(){var af=n.length;if(af>0){for(var ae=0;ae<af;ae++){var X=n[ae].id;var aa=n[ae].callbackFn;var Z={success:false,id:X};if(L.pv[0]>0){var ad=c(X);if(ad){if(E(n[ae].swfVersion)&&!(L.wk&&L.wk<312)){v(X,true);if(aa){Z.success=true;Z.ref=y(X);aa(Z)}}else{if(n[ae].expressInstall&&z()){var ah={};ah.data=n[ae].expressInstall;ah.width=ad.getAttribute("width")||"0";ah.height=ad.getAttribute("height")||"0";if(ad.getAttribute("class")){ah.styleclass=ad.getAttribute("class")}if(ad.getAttribute("align")){ah.align=ad.getAttribute("align")}var ag={};var W=ad.getElementsByTagName("param");var ab=W.length;for(var ac=0;ac<ab;ac++){if(W[ac].getAttribute("name").toLowerCase()!="movie"){ag[W[ac].getAttribute("name")]=W[ac].getAttribute("value")}}O(ah,ag,X,aa)}else{o(ad);if(aa){aa(Z)}}}}}else{v(X,true);if(aa){var Y=y(X);if(Y){Z.success=true;Z.ref=Y}aa(Z)}}}}}function y(Z){var W=null;var X=c(Z);if(X&&X.nodeName=="OBJECT"){var Y=X.getElementsByTagName(q)[0];if(!Y||(Y&&typeof X.SetVariable!=C)){W=X}else{if(typeof Y.SetVariable!=C){W=Y}}}return W}function z(){return !a&&E("6.0.65")&&(L.win||L.mac)&&!(L.wk&&L.wk<312)}function O(Z,aa,W,Y){a=true;D=Y||null;A={success:false,id:W};var ad=c(W);if(ad){if(ad.nodeName=="OBJECT"){l=g(ad);P=null}else{l=ad;P=W}Z.id=Q;if(typeof Z.width==C||(!/%$/.test(Z.width)&&parseInt(Z.width,10)<310)){Z.width="310"}if(typeof Z.height==C||(!/%$/.test(Z.height)&&parseInt(Z.height,10)<137)){Z.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ac=L.ie&&L.win?"ActiveX":"PlugIn",ab="MMredirectURL="+N.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ac+"&MMdoctitle="+j.title;if(typeof aa.flashvars!=C){aa.flashvars+="&"+ab}else{aa.flashvars=ab}if(L.ie&&L.win&&ad.readyState!=4){var X=B("div");W+="SWFObjectNew";X.setAttribute("id",W);ad.parentNode.insertBefore(X,ad);ad.style.display="none";(function(){if(ad.readyState==4){ad.parentNode.removeChild(ad)}else{setTimeout(arguments.callee,10)}})()}t(Z,aa,W)}}function o(X){if(L.ie&&L.win&&X.readyState!=4){var W=B("div");X.parentNode.insertBefore(W,X);W.parentNode.replaceChild(g(X),W);X.style.display="none";(function(){if(X.readyState==4){X.parentNode.removeChild(X)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.replaceChild(g(X),X)}}function g(aa){var Z=B("div");if(L.win&&L.ie){Z.innerHTML=aa.innerHTML}else{var X=aa.getElementsByTagName(q)[0];if(X){var ab=X.childNodes;if(ab){var W=ab.length;for(var Y=0;Y<W;Y++){if(!(ab[Y].nodeType==1&&ab[Y].nodeName=="PARAM")&&!(ab[Y].nodeType==8)){Z.appendChild(ab[Y].cloneNode(true))}}}}}return Z}function t(ah,af,X){var W,Z=c(X);if(L.wk&&L.wk<312){return W}if(Z){if(typeof ah.id==C){ah.id=X}if(L.ie&&L.win){var ag="";for(var ad in ah){if(ah[ad]!=Object.prototype[ad]){if(ad.toLowerCase()=="data"){af.movie=ah[ad]}else{if(ad.toLowerCase()=="styleclass"){ag+=' class="'+ah[ad]+'"'}else{if(ad.toLowerCase()!="classid"){ag+=" "+ad+'="'+ah[ad]+'"'}}}}}var ae="";for(var ac in af){if(af[ac]!=Object.prototype[ac]){ae+='<param name="'+ac+'" value="'+af[ac]+'" />'}}Z.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ag+">"+ae+"</object>";M[M.length]=ah.id;W=c(ah.id)}else{var Y=B(q);Y.setAttribute("type",p);for(var ab in ah){if(ah[ab]!=Object.prototype[ab]){if(ab.toLowerCase()=="styleclass"){Y.setAttribute("class",ah[ab])}else{if(ab.toLowerCase()!="classid"){Y.setAttribute(ab,ah[ab])}}}}for(var aa in af){if(af[aa]!=Object.prototype[aa]&&aa.toLowerCase()!="movie"){e(Y,aa,af[aa])}}Z.parentNode.replaceChild(Y,Z);W=Y}}return W}function e(Y,W,X){var Z=B("param");Z.setAttribute("name",W);Z.setAttribute("value",X);Y.appendChild(Z)}function x(X){var W=c(X);if(W&&W.nodeName=="OBJECT"){if(L.ie&&L.win){W.style.display="none";(function(){if(W.readyState==4){b(X)}else{setTimeout(arguments.callee,10)}})()}else{W.parentNode.removeChild(W)}}}function b(Y){var X=c(Y);if(X){for(var W in X){if(typeof X[W]=="function"){X[W]=null}}X.parentNode.removeChild(X)}}function c(Y){var W=null;try{W=j.getElementById(Y)}catch(X){}return W}function B(W){return j.createElement(W)}function i(Y,W,X){Y.attachEvent(W,X);H[H.length]=[Y,W,X]}function E(Y){var X=L.pv,W=Y.split(".");W[0]=parseInt(W[0],10);W[1]=parseInt(W[1],10)||0;W[2]=parseInt(W[2],10)||0;return(X[0]>W[0]||(X[0]==W[0]&&X[1]>W[1])||(X[0]==W[0]&&X[1]==W[1]&&X[2]>=W[2]))?true:false}function u(ab,X,ac,aa){if(L.ie&&L.mac){return}var Z=j.getElementsByTagName("head")[0];if(!Z){return}var W=(ac&&typeof ac=="string")?ac:"screen";if(aa){m=null;F=null}if(!m||F!=W){var Y=B("style");Y.setAttribute("type","text/css");Y.setAttribute("media",W);m=Z.appendChild(Y);if(L.ie&&L.win&&typeof j.styleSheets!=C&&j.styleSheets.length>0){m=j.styleSheets[j.styleSheets.length-1]}F=W}if(L.ie&&L.win){if(m&&typeof m.addRule==q){m.addRule(ab,X)}}else{if(m&&typeof j.createTextNode!=C){m.appendChild(j.createTextNode(ab+" {"+X+"}"))}}}function v(Y,W){var X=W?"visible":"hidden";if(I&&c(Y)){c(Y).style.visibility=X}else{u("#"+Y,"visibility:"+X)}}function K(X){var Y=/[\\\"<>\.;]/;var W=Y.exec(X)!=null;return W&&typeof encodeURIComponent!=C?encodeURIComponent(X):X}var d=function(){if(L.ie&&L.win){window.attachEvent("onunload",function(){var ab=H.length;for(var aa=0;aa<ab;aa++){H[aa][0].detachEvent(H[aa][1],H[aa][2])}var Y=M.length;for(var Z=0;Z<Y;Z++){x(M[Z])}for(var X in L){L[X]=null}L=null;for(var W in swfobject){swfobject[W]=null}swfobject=null})}}();return{registerObject:function(aa,W,Z,Y){if(L.w3&&aa&&W){var X={};X.id=aa;X.swfVersion=W;X.expressInstall=Z;X.callbackFn=Y;n[n.length]=X;v(aa,false)}else{if(Y){Y({success:false,id:aa})}}},getObjectById:function(W){if(L.w3){return y(W)}},embedSWF:function(aa,ag,ad,af,X,Z,Y,ac,ae,ab){var W={success:false,id:ag};if(L.w3&&!(L.wk&&L.wk<312)&&aa&&ag&&ad&&af&&X){v(ag,false);J(function(){ad+="";af+="";var ai={};if(ae&&typeof ae===q){for(var ak in ae){ai[ak]=ae[ak]}}ai.data=aa;ai.width=ad;ai.height=af;var al={};if(ac&&typeof ac===q){for(var aj in ac){al[aj]=ac[aj]}}if(Y&&typeof Y===q){for(var ah in Y){if(typeof al.flashvars!=C){al.flashvars+="&"+ah+"="+Y[ah]}else{al.flashvars=ah+"="+Y[ah]}}}if(E(X)){var am=t(ai,al,ag);if(ai.id==ag){v(ag,true)}W.success=true;W.ref=am}else{if(Z&&z()){ai.data=Z;O(ai,al,ag,ab);return}else{v(ag,true)}}if(ab){ab(W)}})}else{if(ab){ab(W)}}},getFlashPlayerVersion:function(){return{major:L.pv[0],minor:L.pv[1],release:L.pv[2]}},hasFlashPlayerVersion:E,createSWF:function(Y,X,W){if(L.w3){return t(Y,X,W)}else{return undefined}},showExpressInstall:function(Y,Z,W,X){if(L.w3&&z()){O(Y,Z,W,X)}},removeSWF:function(W){if(L.w3){x(W)}},createCSS:function(Z,Y,X,W){if(L.w3){u(Z,Y,X,W)}},addDomLoadEvent:J,addLoadEvent:r,getQueryParamValue:function(Z){var Y=j.location.search||j.location.hash;if(Z==null){return K(Y)}if(Y){var X=Y.substring(1).split("&");for(var W=0;W<X.length;W++){if(X[W].substring(0,X[W].indexOf("="))==Z){return K(X[W].substring((X[W].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var W=c(Q);if(W&&l){W.parentNode.replaceChild(l,W);if(P){v(P,true);if(L.ie&&L.win){l.style.display="block"}}if(D){D(A)}}a=false}}}}();
function SjValidator(inObj) {
	this.obj = inObj;
}

SjValidator.prototype.notNull = function(inField) {
	if (typeof(this.obj[inField]) == 'undefined') {
		alert(inField + ' is not set');
		return false;
	} else {
		return true;
	}
};

SjValidator.prototype.elementNotNull = function(inElementIdFieldName) {
	if (!this.notNull(inElementIdFieldName)) {
		return false;
	}
	var elmId = this.obj[inElementIdFieldName];
	var elm = document.getElementById(elmId);
	if ((elm == null) || (typeof(elm) == 'undefined')) {
		alert('[' + elmId + '] not found');
		return false;
	} else {
		return true;
	}
};
//loads a JSON response from the server for specified image and request type. When the response arrives callback function
//passed as an argument is executed. The format of the JSON response depends on the request type.
//
//inReq - string, PS request type, for example 'req=ctx'
//inImg - string, image name with optional modifiers after '?'
//inCallback - callback function, will be executed when the successful response arrives from the server. JSON object
//			will be passed to the callback function as a sole argument.
//inErrCallback - callback function, will be executed when the error response arrives from the server. JSON object
//			will be passed to the callback function as a sole argument. this JSON object will contains a single field 
//			'message' carrying server error.
function sjGetResponse(inReq, inCallback, inErrCallback) {
	var id = sjHashCode(inReq);
	inReq += '&id=' + id;
	if (typeof inCallback != 'undefined'){
		sjCallbacks[id] = inCallback;
	}
	if (typeof inErrCallback != 'undefined'){
		sjErrCallbacks[id] = inErrCallback;
	}
    var oScript = document.getElementById('sjScript_'+id);
    if (oScript) {
		document.getElementById('scriptHolder').removeChild(oScript);
    }
    oScript = document.createElement('script');
    oScript.id = 'sjScript_'+id;
    oScript.src = inReq;
    document.getElementById('scriptHolder').appendChild(oScript);
}


//private functions and variables

var sjCallbacks=new Object();
var sjErrCallbacks=new Object();

function s7jsonResponse(inArg, inId) {
	sjCallbacks[inId](inArg);
}

function s7jsonError(inArg, inId) {
	if (typeof sjErrCallbacks[inId] != 'undefined'){
		sjErrCallbacks[inId](inArg);
	}else{
		alert(inArg.message);
	}
}

function sjHashCode(d) {//unix style
	if (!d || d=="") return 1;
	var h=0,g=0;
	for (var i=d.length-1;i>=0;i--) {
		var c=parseInt(d.charCodeAt(i));
		h=((h << 6) & 0xfffffff) + c + (c << 14);
		if ((g=h & 0xfe00000)!=0) h=(h ^ (g >> 21));
	}
	return h;
}

function SjProductListing() {
	this.plDivHolderId = 'productListingContainer';
	this.plMainImageHolderId = 'izView';
	this.plMainImageId = 'plMainImage';
	this.plMoreColorsAvailableId = 'plMoreColorsAvailable';
	this.plMoreViewsId = 'plMoreViews';
	this.serverUrl = '/is/image/';
	this.imageList = null;
	this.colorCode = null;
	this.anchor = null;
	this.showDelay = 1000;
	this.hideId = null;
	this.modifiers = null;
	this.skuArray = null;
	this.productDetailURL = null;
	this.validator = new SjValidator(this);
	this.onEvent = new Object();
	this.startTime = (new Date()).getTime();
	this.sessionId = this.createSessionId();
	this.imageListsArray = new Array();
	this.color_attributes_list = ['_A', '_B', '_C', '_D', '_E', '_F', '_G', '_H', '_I'];
};

SjProductListing.prototype.setServerUrl = function(inServerUrl) {
	this.serverUrl = inServerUrl;
	if (this.serverUrl.charAt(this.serverUrl.length - 1) != '/') {
		this.serverUrl += '/';
	}
};

SjProductListing.prototype.setColorCode = function(inColorCode) {
	this.colorCode = inColorCode;
};

SjProductListing.prototype.getImageList = function() {
	this.imageList = '';
	if (this.imageListsArray[this.colorCode] != null){
		for (var i = 0; i < this.imageListsArray[this.colorCode].imageList.length; i++){
			if (this.imageList == ''){
				this.imageList += this.imageListsArray[this.colorCode].imageList[i];
			} else {
				this.imageList += ',' + this.imageListsArray[this.colorCode].imageList[i];
			}
		}
		this.doShow();
	} else {
		this.doGetImageList();
	}
};

SjProductListing.prototype.doGetImageList = function() {
	this.imageListsArray[this.colorCode] = new Object();
	this.imageListsArray[this.colorCode].jsonResponseArray = new Array();
	this.imageListsArray[this.colorCode].imageList = new Array();
	this.imageListsArray[this.colorCode].responseIdx = 0;
	for (var i = 0; i < this.color_attributes_list.length; i++) {
		this.check(this.colorCode, i);
	}
};

SjProductListing.prototype.check = function(inColorCode, i) {
	var image = 'samsclub/' + inColorCode + this.color_attributes_list[i];
	var selfRef = this;
	var obj = new Object();
	
	obj.colorId = inColorCode;
	obj.image = inColorCode + this.color_attributes_list[i];
	this.imageListsArray[inColorCode].jsonResponseArray.push(obj);
	this.imageListsArray[inColorCode].jsonResponseArray[i].jsonResponse = function(inData){
		selfRef.imageListsArray[this.colorId].responseIdx ++;
		if (inData['catalogRecord.exists'] == 1){
			selfRef.imageListsArray[this.colorId].imageList.push(this.image);

		}
		if (selfRef.color_attributes_list.length == selfRef.imageListsArray[this.colorId].responseIdx){
			var imList = selfRef.imageListsArray[this.colorId].imageList;
			for (var j = 0; j < imList.length; j++){
				if (selfRef.imageList == ''){
					selfRef.imageList += imList[j];
				} else {
					selfRef.imageList += ',' + imList[j];						
				}
			}
			selfRef.doShow();
		}
	};
	var id = image;
	sjGetResponse(
		this.serverUrl + image + '?req=exists,json',
		function (inData) {
			obj.jsonResponse(inData);
		},
		function (inData) {
			//by design, fail quitely
			//alert('unable to load image props for ips id [' + heroImageName + ']: ' + inData.message);
		}
	);
};

SjProductListing.prototype.setAnchor = function(inAnchor) {
	this.anchor = inAnchor;
};

SjProductListing.prototype.setShowDelay = function(inShowDelay) {
	this.showDelay = inShowDelay;
};

SjProductListing.prototype.setModifiers = function(inModifiers) {
	this.modifiers = inModifiers;
};

SjProductListing.prototype.setSKU = function(inSKUArray) {
	this.skuArray = inSKUArray;
};

SjProductListing.prototype.setProductDetailURL = function(inProductDetailURL) {
	this.productDetailURL = inProductDetailURL;
};

SjProductListing.prototype.requestShow = function() {
	if (this.hideId != null) {
		clearTimeout(this.hideId);
		this.hideId = null;
	}
	var selfRef = this;
	setTimeout(
		function() {
			selfRef.show();
		}, this.showDelay
	);
};

SjProductListing.prototype.requestHide = function() {
	var selfRef = this;
	this.hideId = setTimeout(
		function() {
			selfRef.hide();
		}, 100
	);
};

SjProductListing.prototype.show = function() {
	if (this.anchor == null) {
		return;
	}
	if (!this.validate()) {
		return;
	}	
	this.getImageList();
};

SjProductListing.prototype.doShow = function() {
	var originalPosition = this.anchor.style.position;
	this.anchor.style.position = 'relative';
	var centerX = Math.round(this.anchor.offsetLeft + this.anchor.offsetWidth / 2);
	var centerY = Math.round(this.anchor.offsetTop + this.anchor.offsetHeight / 2);
	this.anchor.style.position = originalPosition;
	var plDivHolder = document.getElementById(this.plDivHolderId);
	plDivHolder.style.left = centerX + 'px';
	plDivHolder.style.top = (centerY - 100) + 'px';
	plDivHolder.style.visibility = 'inherit';

	var selfRef = this;
	this.anchor.onmouseout = function() {
		selfRef.requestHide();
	};
	plDivHolder.onmouseover = function() {
		if (selfRef.hideId != null) {
			clearTimeout(selfRef.hideId);
			selfRef.hideId = null;
		}
	};
	plDivHolder.onmouseout = function() {
		selfRef.requestHide();
	};
	if (this.productDetailURL != null) {
		plDivHolder.onmouseup = function() {
			document.location.href = selfRef.productDetailURL;
		};
	}

	var plMoreColorsAvailable = document.getElementById(this.plMoreColorsAvailableId);
	plMoreColorsAvailable.style.visibility = 'hidden';
	if ((this.skuArray != null) && (this.skuArray.length > 0)) {
		var toknes = this.skuArray[0].split('|');
		if (toknes.length > 3) {
			var text = toknes[3];
			plMoreColorsAvailable.innerHTML = text;
		}
		plMoreColorsAvailable.style.visibility = 'inherit';
	}

	var plMoreViews = document.getElementById(this.plMoreViewsId);
	plMoreViews.style.visibility = 'hidden';

	var tokens = this.imageList.split(',');

	var firstImage;
	if (tokens.length > 0) {
		firstImage = 'samsclub/' + tokens[0];
	} else {
		firstImage = 'samsclub/';
	}
	
	this.loadMainImage(firstImage);
	this.loadLabel(firstImage, document.getElementById(this.plMainImageId));

	for (var i = 1; i < 6; i ++) {
		var swatch = document.getElementById('swatch' + (i - 1));
		swatch.style.visibility = 'hidden';
	}

	var selfRef = this;
	for (var i = 0; (i < tokens.length) && (i < 5); i ++) {
		var imageName = 'samsclub/' + tokens[i];
		var swatch = document.getElementById('swatch' + i);
		swatch.style.visibility = 'inherit';
		swatch.src = this.serverUrl + imageName + '?wid=56&hei=56' + (this.modifiers == null ? '' : '&' + this.modifiers);
		swatch.imageName = imageName;
		swatch.idx = i;

		swatch.onmouseover = function() {
			selfRef.loadMainImage(this.imageName);
			selfRef.evtPAGE(this.idx, null);
		};

		this.loadLabel(imageName, swatch);
	}

	if (tokens.length > 5) {
		plMoreViews.style.visibility = 'inherit';
	}
};

SjProductListing.prototype.hide = function() {
	var plDivHolder = document.getElementById(this.plDivHolderId);
	plDivHolder.style.visibility = 'hidden';
	plDivHolder.onmouseover = null;
	plDivHolder.onmouseout = null;
	this.anchor = null;
};

SjProductListing.prototype.loadMainImage = function(inImageName) {
	var plMainImageHolder = document.getElementById(this.plMainImageHolderId);
	var width = plMainImageHolder.offsetWidth;
	var height = plMainImageHolder.offsetHeight;
	var plMainImage = document.getElementById(this.plMainImageId);
	plMainImage.src = this.serverUrl + inImageName + '?wid=' + width + '&hei=' + height + (this.modifiers == null ? '' : '&' + this.modifiers);
};

SjProductListing.prototype.loadLabel = function(inImageName, inElm) {
/*
	temporary disabled
	sjGetResponse(
		this.serverUrl + inImageName + '?req=userdata,json',
		function (inData) {
			//look for the first non-empty key (in order to not bother with passing labelKey)
			var label = null;
			for (var field in inData) {
				if (inData[field] != null) {
					label = inData[field];
				}
			}
			if ((label != null) && (label != '')) {
				inElm.title = label;
				inElm.alt = label;
			}
		},
		function (inData) {
			alert('unable to load userdata for ips id [' + inImageName + ']: ' + inData.message);
		}
	);
*/
};

SjProductListing.prototype.evtPAGE = function(inIdx, inLabel) {
	if (this.onEvent.onLogEvent != null) {
		var eventData = 'PAGE,' + inIdx + (inLabel != null ? ',' + inLabel : '');
		var time = Math.round(((new Date().getTime()) - this.startTime) / 1000);
		this.onEvent.onLogEvent(eventData, time, this.sessionId, null);
	}
};

SjProductListing.prototype.createSessionId = function() {
	//can't use random due to safari crash
	var d = new Date();
	var n = d.getTime() * d.getMilliseconds() * d.getTimezoneOffset();
	return this.intToHex(Math.abs(n), 16);
};

SjProductListing.prototype.intToHex = function(inVal, inLength) {
	var num = new Number(inVal);
	var hexStr = num.toString(16);
	if (inLength != null) {
		while (hexStr.length < inLength) {
			hexStr = '0' + hexStr;
		}
	}
	return hexStr;
};

SjProductListing.prototype.validate = function() {
	if (!this.validator.notNull('serverUrl')) {
		return false;
	}
	if (!this.validator.notNull('imageList')) {
		return false;
	}
	if (!this.validator.notNull('colorCode')) {
		return false;
	}
	if (!this.validator.elementNotNull('plDivHolderId')) {
		return false;
	}
	if (!this.validator.elementNotNull('plMainImageHolderId')) {
		return false;
	}
	if (!this.validator.elementNotNull('plMainImageId')) {
		return false;
	}
	if (!this.validator.elementNotNull('plMoreColorsAvailableId')) {
		return false;
	}
	if (!this.validator.elementNotNull('plMoreViewsId')) {
		return false;
	}
	return true;
};
/*
 * jQuery UI Autocomplete @VERSION
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */
(function( $, undefined ) {

    $.widget( "ui.samsclubautocomplete", $.ui.autocomplete, {
        _normalizestring : function(item ) {
            return {
                label: item,
                value: item
            };
        },
	
        _normalizecategories : function(item, itemId, key) {
            return {
                label: item,
                value: itemId,
                keyword: key
            };
        },

        _renderMenu: function( ul, items ) {
            var self = this;
            self._renderItemSuggestion( ul);
            var noOfResultsDisplayed = 0;
            var term = self.element.val();
            var reg = new RegExp("^(" +term.replace(/_/g,".") + ")", "i");
            $.each( items, function( index, item ) {
                if (noOfResultsDisplayed >= 12) {
                    return false;
                }
                if (item.label != undefined) {
                    noOfResultsDisplayed++;
                    self._renderItem( ul, item,reg);
                } else {
                    var keyword = item[0];
                    var itemwithCategories = self._normalizestring(keyword);
        		
                    noOfResultsDisplayed++;
                    if (itemwithCategories.label != undefined)
                        self._renderItem( ul, itemwithCategories, reg);
                			
                    var categories = item[1];
                    for(var j=0; j<categories.length; j++) {
                        sItem = self._normalizecategories(categories[j][0],categories[j][1],keyword);
                        if (sItem.label != undefined) {
                            noOfResultsDisplayed++;
                            self._renderItemCategories( ul, sItem);
                        }
                    }
                }
            });
        },

        _renderItemSuggestion : function(ul) {
            return $( "<div id='Suggest'>Suggestions</div>" ).addClass("jqcustom-ac-hd")
            .appendTo( ul );
        },

        _renderItem : function( ul, item, reg ) {
            var value = item.label;
            value=(value.length>41) ? $.trim(value.substr(0,40))+'...' : value;
            var itemLabel =  value.replace(reg,"<b>$1</b>");
            return $( "<li></li>" ).addClass("jqcustom-ac-bd")
            .data( "item.autocomplete", item )
            .append( $( "<a></a>" ).html(itemLabel ) )
            .appendTo( ul );
        },

        _renderItemCategories : function( ul, item) {
            return $( "<li></li>" ).addClass("jqcustom-ac-bd")
            .data( "item.autocomplete", item )
            .append($( "<a></a>" ).html( "&nbsp;&nbsp; in "+item.label ) )
            .appendTo( ul );
        }
    });

}( jQuery ));
    //if previous typeahead has result, default is not determine
    var hasPreResult='yes';
    var preSearchTerm='';
    var typeaheadRequest;
    var typeaheadResponse;

WalmartAutoComplete = function(inputId, containerId,indexId,cdnId,reServletPathId,searchPathId) {
    var selfObj = this;
    var indexValue = document.getElementById(indexId).value;
    var cdnHost = document.getElementById(cdnId).value;
    var reServletPath=document.getElementById(reServletPathId).value;
    var requestScheme=document.getElementById("requestSchmem").value;
    var isHomePage = false;
    var fromHome='no';
    if(reServletPath=='/homepage.jsp' || reServletPath=='//homepage.jsp'){
         isHomePage = true;
         fromHome='yes';
         $("#fromHome").val("yes");
    }else{
        $("#fromHome").val("no");
    }
    var searchboxid=inputId;


    this.getConstraintIdForUI = function(ui) {
        //if it is all departments, change it to 0
        var id = this.getConstraintId();
        //if item.label and item.value is different, it indicates that the user selected the category.
        if (ui.item != undefined && ui.item.label != ui.item.value) {
            id = ui.item.value;
        }
        return id;
    }

    this.getConstraintId = function() {
        var idValue =document.getElementById(containerId).value;
        return $("#"+idValue).val();
    }

    this.isValidConstraint = function() {
        var id = this.getConstraintId();
        if(id=='all'){
            return true;
        }
        var validPattern = /^[0-9]+$/;
        return validPattern.test(id);
    }

    this.cleanQuery = function(sQuery) {
        //trim the value
        return decodeURIComponent(sQuery)
        .replace(/^\s+|\s+$/g,"")
        .replace(/\s+/g," ")
        .toLowerCase();
    }

    $("#"+searchboxid).samsclubautocomplete({
        minLength : 1,
        source: function( request, response ) {
            if(requestScheme!="http"){
                return false;
            }
            if(reServletPath.indexOf("/cart/cart.jsp")==0){
                return false;
            }
            if(hasPreResult=="no" && request.term.indexOf(preSearchTerm)==0){
                return false;
            }
            if ( !selfObj.isValidConstraint() ) {
                return false;
            }
            if(request.term.length>41){
                return false;
            }
            if($.trim(request.term).length==0){
                return false;
            }
            typeaheadRequest=request;
            typeaheadResponse=response;
            var searchConstraint = selfObj.getConstraintId();
            var query = selfObj.cleanQuery(request.term);
            var q = encodeQuery(query);
            var URL="";
            if(cdnHost != ""){
                URL =cdnHost+"/search/ajx_typeahead.jsp?searchTerm="+q+"&searchCategoryId="+searchConstraint+"&indexId="+indexValue;
            }
            $.ajax({
                url: URL,
                dataType: 'jsonp',
                cache:true,
                jsonpCallback: 'typeaheadResult'
            });
        },
        open: function(event, ui){
           $(".ui-widget-autocomplete").width(324); 
           $('ul.ui-autocomplete > li').last().addClass("last-suggestion-item");
        },
        focus: function( event, ui ) {
            var item = ui.item;
            // allow only , if it was a key event
            if (event.which == 38 || event.which==40 ) {
                if (item.keyword != undefined) {
                    $("#"+searchboxid).val( item.keyword );
                } else {
                    $("#"+searchboxid).val( item.label );
                }
            }
            return false;
        },
        select: function( event, ui ) {
            var constraint = selfObj.getConstraintIdForUI(ui);
            var keyword = ui.item.label;
            if (ui.item.keyword != undefined) {
                keyword = ui.item.keyword;
            }
            $("#"+searchboxid).val( keyword );
            var target = $("#"+searchPathId).val();
            if (target != "") {
                target+="/search/searchResults.jsp";
                if (constraint == undefined) {
                    window.location.href = target + "?searchCategoryId=all&searchTerm=" + escape(keyword)+"&fromHome="+fromHome;
                }
                else if (keyword == undefined) {
                    window.location.href = target + "?searchCategoryId=" + escape(constraint);
                }
                else {
                    window.location.href = target + "?searchCategoryId=" + escape(constraint) + "&searchTerm=" + escape(keyword)+"&fromHome="+fromHome;
                }
            }
            return false;
        }
    });

    $(".ui-autocomplete.ui-menu").removeClass("ui-widget-content").addClass("ui-widget-autocomplete");
    
    $.event.props = $.event.props.join('|').replace('layerX|layerY|', '').split('|');
};

 function typeaheadResult (data) {
   try {
        if (null != AutoComplete) {
            if (data != undefined && data.R != undefined) {
                preSearchTerm=typeaheadRequest.term;
                if(data.R==''){
                    hasPreResult='no';
                }else{
                    hasPreResult='yes';
                }
                typeaheadResponse(data.R);
             }
         }
    }catch (err){
    }
  }

function encodeQuery (query) {
    return  encodeURIComponent(query)
    .replace(/\./g, "%2E")
    .replace(/'/g, "%27")
    .replace(/\//g, "%2F")
    .replace(/%/g, "_")
    .toLowerCase();
}
if(!this.JSON){this.JSON={}}(function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];if(i&&typeof i==="object"&&typeof i.toJSON==="function"){i=i.toJSON(a)}if(typeof rep==="function"){i=rep.call(b,a,i)}switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i){return"null"}gap+=indent;h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1){h[c]=str(c,i)||"null"}e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]";gap=g;return e}if(rep&&typeof rep==="object"){f=rep.length;for(c=0;c<f;c+=1){d=rep[c];if(typeof d==="string"){e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}else{for(d in i){if(Object.hasOwnProperty.call(i,d)){e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}";gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(a,b,c){var d;gap="";indent="";if(typeof c==="number"){for(d=0;d<c;d+=1){indent+=" "}}else if(typeof c==="string"){indent=c}rep=b;if(b&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":a})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e==="object"){for(c in e){if(Object.hasOwnProperty.call(e,c)){d=walk(e,c);if(d!==undefined){e[c]=d}else{delete e[c]}}}}return reviver.call(a,b,e)}var j;cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()
