/*!
 * jQuery JavaScript Library v1.6.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Jun 30 14:16:56 2011 -0400
 */
(function(a,b){function cv(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cs(a){if(!cg[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ch||(ch=c.createElement("iframe"),ch.frameBorder=ch.width=ch.height=0),b.appendChild(ch);if(!ci||!ch.createElement)ci=(ch.contentWindow||ch.contentDocument).document,ci.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),ci.close();d=ci.createElement(a),ci.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ch)}cg[a]=e}return cg[a]}function cr(a,b){var c={};f.each(cm.concat.apply([],cm.slice(0,b)),function(){c[this]=a});return c}function cq(){cn=b}function cp(){setTimeout(cq,0);return cn=f.now()}function cf(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ce(){try{return new a.XMLHttpRequest}catch(b){}}function b$(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bZ(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bY(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bC.test(a)?d(a,e):bY(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)bY(a+"["+e+"]",b[e],c,d);else d(a,b)}function bX(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bR,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bX(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bX(a,c,d,e,"*",g));return l}function bW(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bN),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bA(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bv:bw;if(d>0){c!=="border"&&f.each(e,function(){c||(d-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?d+=parseFloat(f.css(a,c+this))||0:d-=parseFloat(f.css(a,"border"+this+"Width"))||0});return d+"px"}d=bx(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0,c&&f.each(e,function(){d+=parseFloat(f.css(a,"padding"+this))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+this+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+this))||0)});return d+"px"}function bm(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(be,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bl(a){f.nodeName(a,"input")?bk(a):"getElementsByTagName"in a&&f.grep(a.getElementsByTagName("input"),bk)}function bk(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bj(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bi(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bh(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bg(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function W(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(R.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function V(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function N(a,b){return(a&&a!=="*"?a+".":"")+b.replace(z,"`").replace(A,"&")}function M(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(x,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function K(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function E(){return!0}function D(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"$1-$2").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=/-([a-z])/ig,x=function(a,b){return b.toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!A){A=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a);return c===b||D.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(b,c,d){a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),d=c.documentElement,(!d||!d.nodeName||d.nodeName==="parsererror")&&e.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(H)return H.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g](h)}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=a.getElementsByTagName("input")[0],k={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,k.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,k.optDisabled=!h.disabled;try{delete a.test}catch(v){k.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function(){k.noCloneEvent=!1}),a.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),k.radioValue=i.value==="t",i.setAttribute("checked","checked"),a.appendChild(i),l=c.createDocumentFragment(),l.appendChild(a.firstChild),k.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",m=c.getElementsByTagName("body")[0],o=c.createElement(m?"div":"body"),p={visibility:"hidden",width:0,height:0,border:0,margin:0},m&&f.extend(p,{position:"absolute",left:-1e3,top:-1e3});for(t in p)o.style[t]=p[t];o.appendChild(a),n=m||b,n.insertBefore(o,n.firstChild),k.appendChecked=i.checked,k.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,k.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",q=a.getElementsByTagName("td"),u=q[0].offsetHeight===0,q[0].style.display="",q[1].style.display="none",k.reliableHiddenOffsets=u&&q[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",a.appendChild(j),k.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0),o.innerHTML="",n.removeChild(o);if(a.attachEvent)for(t in{submit:1,change:1,focusin:1})s="on"+t,u=s in a,u||(a.setAttribute(s,"return;"),u=typeof a[s]=="function"),k[t+"Bubbles"]=u;o=l=g=h=m=j=a=i=null;return k}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([a-z])([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g=f.expando,h=typeof c=="string",i,j=a.nodeType,k=j?f.cache:a,l=j?a[f.expando]:a[f.expando]&&f.expando;if((!l||e&&l&&!k[l][g])&&h&&d===b)return;l||(j?a[f.expando]=l=++f.uuid:l=f.expando),k[l]||(k[l]={},j||(k[l].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?k[l][g]=f.extend(k[l][g],c):k[l]=f.extend(k[l],c);i=k[l],e&&(i[g]||(i[g]={}),i=i[g]),d!==b&&(i[f.camelCase(c)]=d);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[f.camelCase(c)]||i[c]:i}},removeData:function(b,c,d){if(!!f.acceptData(b)){var e=f.expando,g=b.nodeType,h=g?f.cache:b,i=g?b[f.expando]:f.expando;if(!h[i])return;if(c){var j=d?h[i][e]:h[i];if(j){delete j[c];if(!l(j))return}}if(d){delete h[i][e];if(!l(h[i]))return}var k=h[i][e];f.support.deleteExpando||h!=a?delete h[i]:h[i]=null,k?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=k):g&&(f.support.deleteExpando?delete b[f.expando]:b.removeAttribute?b.removeAttribute(f.expando):b[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u=/\:|^on/,v,w;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(o);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(o);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(n," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;d=e.value;return typeof d=="string"?d.replace(p,""):d==null?"":d}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);j&&(c=f.attrFix[c]||c,i=f.attrHooks[c],i||(t.test(c)?i=w:v&&c!=="className"&&(f.nodeName(a,"form")||u.test(c))&&(i=v)));if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j&&(h=i.get(a,c))!==null)return h;h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.support.getSetAttribute?a.removeAttribute(b):(f.attr(a,b,""),a.removeAttributeNode(a.getAttributeNode(b))),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},tabIndex:{get:function(a){var c=a.getAttributeNode("tabIndex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}},value:{get:function(a,b){if(v&&f.nodeName(a,"button"))return v.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(v&&f.nodeName(a,"button"))return v.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);i&&(c=f.propFix[c]||c,h=f.propHooks[c]);return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==b?g:a[c]},propHooks:{}}),w={get:function(a,c){return f.prop(a,c)?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},f.support.getSetAttribute||(f.attrFix=f.propFix,v=f.attrHooks.name=f.attrHooks.title=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,c){var d=a.getAttributeNode(c);if(d){d.nodeValue=b;return b}}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var x=/\.(.*)$/,y=/^(?:textarea|input|select)$/i,z=/\./g,A=/ /g,B=/[^\w\s.|`]/g,C=function(a){return a.replace(B,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=D;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=D);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),C).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.
shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d!=null?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,N(a.origType,a.selector),f.extend({},a,{handler:M,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,N(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?E:D):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=E;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=E;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=E,this.stopPropagation()},isDefaultPrevented:D,isPropagationStopped:D,isImmediatePropagationStopped:D};var F=function(a){var b=a.relatedTarget,c=!1,d=a.type;a.type=a.data,b!==this&&(b&&(c=f.contains(this,b)),c||(f.event.handle.apply(this,arguments),a.type=d))},G=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?G:F,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?G:F)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&f(b).closest("form").length&&K("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&K("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var H,I=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},J=function(c){var d=c.target,e,g;if(!!y.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=I(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:J,beforedeactivate:J,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&J.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&J.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",I(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in H)f.event.add(this,c+".specialChange",H[c]);return y.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return y.test(this.nodeName)}},H=f.event.special.change.filters,H.focus=H.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var L={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||D,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=x.exec(h),k="",j&&(k=j[0],h=h.replace(x,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,L[h]?(a.push(L[h]+k),h=h+k):h=(L[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+N(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+N(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var O=/Until$/,P=/^(?:parents|prevUntil|prevAll)/,Q=/,/,R=/^.[^:#\[\.,]*$/,S=Array.prototype.slice,T=f.expr.match.POS,U={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(W(this,a,!1),"not",a)},filter:function(a){return this.pushStack(W(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=T.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=T.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a=="string")return f.inArray(this[0],a?f(a):this.parent().children());return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(V(c[0])||V(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=S.call(arguments);O.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!U[a]?f.unique(e):e,(this.length>1||Q.test(d))&&P.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var X=/ jQuery\d+="(?:\d+|null)"/g,Y=/^\s+/,Z=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,$=/<([\w:]+)/,_=/<tbody/i,ba=/<|&#?\w+;/,bb=/<(?:script|object|embed|option|style)/i,bc=/checked\s*(?:[^=]|=\s*.checked.)/i,bd=/\/(java|ecma)script/i,be=/^\s*<!(?:\[CDATA\[|\-\-)/,bf={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};bf.optgroup=bf.option,bf.tbody=bf.tfoot=bf.colgroup=bf.caption=bf.thead,bf.th=bf.td,f.support.htmlSerialize||(bf._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(X,""):null;if(typeof a=="string"&&!bb.test(a)&&(f.support.leadingWhitespace||!Y.test(a))&&!bf[($.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Z,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bc.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bg(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bm)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i;b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!bb.test(a[0])&&(f.support.checkClone||!bc.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j
)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bi(a,d),e=bj(a),g=bj(d);for(h=0;e[h];++h)bi(e[h],g[h])}if(b){bh(a,d);if(c){e=bj(a),g=bj(d);for(h=0;e[h];++h)bh(e[h],g[h])}}e=g=null;return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!ba.test(k))k=b.createTextNode(k);else{k=k.replace(Z,"<$1></$2>");var l=($.exec(k)||["",""])[1].toLowerCase(),m=bf[l]||bf._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=_.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&Y.test(k)&&o.insertBefore(b.createTextNode(Y.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bl(k[i]);else bl(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||bd.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bn=/alpha\([^)]*\)/i,bo=/opacity=([^)]*)/,bp=/([A-Z]|^ms)/g,bq=/^-?\d+(?:px)?$/i,br=/^-?\d/,bs=/^[+\-]=/,bt=/[^+\-\.\de]+/g,bu={position:"absolute",visibility:"hidden",display:"block"},bv=["Left","Right"],bw=["Top","Bottom"],bx,by,bz;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bx(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d;if(h==="number"&&isNaN(d)||d==null)return;h==="string"&&bs.test(d)&&(d=+d.replace(bt,"")+parseFloat(f.css(a,c)),h="number"),h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bx)return bx(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bA(a,b,d);f.swap(a,bu,function(){e=bA(a,b,d)});return e}},set:function(a,b){if(!bq.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bo.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle;c.zoom=1;var e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.filter=bn.test(g)?g.replace(bn,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bx(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(by=function(a,c){var d,e,g;c=c.replace(bp,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bz=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bq.test(d)&&br.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bx=by||bz,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bB=/%20/g,bC=/\[\]$/,bD=/\r?\n/g,bE=/#.*$/,bF=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bG=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bH=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,bI=/^(?:GET|HEAD)$/,bJ=/^\/\//,bK=/\?/,bL=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bM=/^(?:select|textarea)/i,bN=/\s+/,bO=/([?&])_=[^&]*/,bP=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bQ=f.fn.load,bR={},bS={},bT,bU;try{bT=e.href}catch(bV){bT=c.createElement("a"),bT.href="",bT=bT.href}bU=bP.exec(bT.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bQ)return bQ.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bL,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bM.test(this.nodeName)||bG.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bD,"\r\n")}}):{name:b.name,value:c.replace(bD,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?f.extend(!0,a,f.ajaxSettings,b):(b=a,a=f.extend(!0,f.ajaxSettings,b));for(var c in{context:1,url:1})c in b?a[c]=b[c]:c in f.ajaxSettings&&(a[c]=f.ajaxSettings[c]);return a},ajaxSettings:{url:bT,isLocal:bH.test(bU[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML}},ajaxPrefilter:bW(bR),ajaxTransport:bW(bS),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a?4:0;var o,r,u,w=l?bZ(d,v,l):b,x,y;if(a>=200&&a<300||a===304){if(d.ifModified){if(x=v.getResponseHeader("Last-Modified"))f.lastModified[k]=x;if(y=v.getResponseHeader("Etag"))f.etag[k]=y}if(a===304)c="notmodified",o=!0;else try{r=b$(d,w),c="success",o=!0}catch(z){c="parsererror",u=z}}else{u=c;if(!c||a)c="error",a<0&&(a=0)}v.status=a,v.statusText=c,o?h.resolveWith(e,[r,c,v]):h.rejectWith(e,[v,c,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,c]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bF.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bE,"").replace(bJ,bU[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bN),d.crossDomain==null&&(r=bP.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bU[1]&&r[2]==bU[2]&&(r[3]||(r[1]==="http:"?80:443))==(bU[3]||(bU[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bX(bR,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bI.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bK.test(d.url)?"&":"?")+d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bO,"$1_="+x);d.url=y+(y===d.url?(bK.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", */*; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bX(bS,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){status<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)bY(g,a[g],c,e);return d.join("&").replace(bB,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var b_=f.now(),ca=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+b_++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ca.test(b.url)||e&&ca.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ca,l),b.url===j&&(e&&(k=k.replace(ca,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cb=a.ActiveXObject?function(){for(var a in cd)cd[a](0,1)}:!1,cc=0,cd;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ce()||cf()}:ce,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cb&&delete cd[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cc,cb&&(cd||(cd={},f(a).unload(cb)),cd[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cg={},ch,ci,cj=/^(?:toggle|show|hide)$/,ck=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cl,cm=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cn,co=a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cr("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cs(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cr("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cr("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cs(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cj.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=ck.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cr("show",1),slideUp:cr("hide",1),slideToggle:cr("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function h(a){return d.step(a)}var d=this,e=f.fx,g;this.startTime=cn||cp(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,h.elem=this.elem,h()&&f.timers.push(h)&&!cl&&(co?(cl=!0,g=function(){cl&&(co(g),e.tick())},co(g)):cl=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cn||cp(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cl),cl=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var ct=/^t(?:able|d|h)$/i,cu=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cv(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!ct.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cu.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cu.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cv(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cv(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a&&a.style?parseFloat(f.css(a,d,"padding")):null},f.fn["outer"+c]=function(a){var b=this[0];return b&&b.style?parseFloat(f.css(b,d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c];return e.document.compatMode==="CSS1Compat"&&g||e.document.body["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var h=f.css(e,d),i=parseFloat(h);return f.isNaN(i)?h:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);;

var Drupal = Drupal || { 'settings': {}, 'behaviors': {}, 'themes': {}, 'locale': {} };

/**
 * Set the variable that indicates if JavaScript behaviors should be applied
 */
Drupal.jsEnabled = true;

/**
 * Attach all registered behaviors to a page element.
 *
 * Behaviors are event-triggered actions that attach to page elements, enhancing
 * default non-Javascript UIs. Behaviors are registered in the Drupal.behaviors
 * object as follows:
 * @code
 *    Drupal.behaviors.behaviorName = function () {
 *      ...
 *    };
 * @endcode
 *
 * Drupal.attachBehaviors is added below to the jQuery ready event and so
 * runs on initial page load. Developers implementing AHAH/AJAX in their
 * solutions should also call this function after new page content has been
 * loaded, feeding in an element to be processed, in order to attach all
 * behaviors to the new content.
 *
 * Behaviors should use a class in the form behaviorName-processed to ensure
 * the behavior is attached only once to a given element. (Doing so enables
 * the reprocessing of given elements, which may be needed on occasion despite
 * the ability to limit behavior attachment to a particular element.)
 *
 * @param context
 *   An element to attach behaviors to. If none is given, the document element
 *   is used.
 */
Drupal.attachBehaviors = function(context) {
  context = context || document;
  // Execute all of them.
  jQuery.each(Drupal.behaviors, function() {
    this(context);
  });
};

/**
 * Encode special characters in a plain-text string for display as HTML.
 */
Drupal.checkPlain = function(str) {
  str = String(str);
  var replace = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };
  for (var character in replace) {
    var regex = new RegExp(character, 'g');
    str = str.replace(regex, replace[character]);
  }
  return str;
};

/**
 * Translate strings to the page language or a given language.
 *
 * See the documentation of the server-side t() function for further details.
 *
 * @param str
 *   A string containing the English string to translate.
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 * @return
 *   The translated string.
 */
Drupal.t = function(str, args) {
  // Fetch the localized version of the string.
  if (Drupal.locale.strings && Drupal.locale.strings[str]) {
    str = Drupal.locale.strings[str];
  }

  if (args) {
    // Transform arguments before inserting them
    for (var key in args) {
      switch (key.charAt(0)) {
        // Escaped only
        case '@':
          args[key] = Drupal.checkPlain(args[key]);
        break;
        // Pass-through
        case '!':
          break;
        // Escaped and placeholder
        case '%':
        default:
          args[key] = Drupal.theme('placeholder', args[key]);
          break;
      }
      str = str.replace(key, args[key]);
    }
  }
  return str;
};

/**
 * Format a string containing a count of items.
 *
 * This function ensures that the string is pluralized correctly. Since Drupal.t() is
 * called by this function, make sure not to pass already-localized strings to it.
 *
 * See the documentation of the server-side format_plural() function for further details.
 *
 * @param count
 *   The item count to display.
 * @param singular
 *   The string for the singular case. Please make sure it is clear this is
 *   singular, to ease translation (e.g. use "1 new comment" instead of "1 new").
 *   Do not use @count in the singular string.
 * @param plural
 *   The string for the plural case. Please make sure it is clear this is plural,
 *   to ease translation. Use @count in place of the item count, as in "@count
 *   new comments".
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 *   Note that you do not need to include @count in this array.
 *   This replacement is done automatically for the plural case.
 * @return
 *   A translated string.
 */
Drupal.formatPlural = function(count, singular, plural, args) {
  var args = args || {};
  args['@count'] = count;
  // Determine the index of the plural form.
  var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count']) : ((args['@count'] == 1) ? 0 : 1);

  if (index == 0) {
    return Drupal.t(singular, args);
  }
  else if (index == 1) {
    return Drupal.t(plural, args);
  }
  else {
    args['@count['+ index +']'] = args['@count'];
    delete args['@count'];
    return Drupal.t(plural.replace('@count', '@count['+ index +']'), args);
  }
};

/**
 * Generate the themed representation of a Drupal object.
 *
 * All requests for themed output must go through this function. It examines
 * the request and routes it to the appropriate theme function. If the current
 * theme does not provide an override function, the generic theme function is
 * called.
 *
 * For example, to retrieve the HTML that is output by theme_placeholder(text),
 * call Drupal.theme('placeholder', text).
 *
 * @param func
 *   The name of the theme function to call.
 * @param ...
 *   Additional arguments to pass along to the theme function.
 * @return
 *   Any data the theme function returns. This could be a plain HTML string,
 *   but also a complex object.
 */
Drupal.theme = function(func) {
  for (var i = 1, args = []; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(this, args);
};

/**
 * Parse a JSON response.
 *
 * The result is either the JSON object, or an object with 'status' 0 and 'data' an error message.
 */
Drupal.parseJson = function (data) {
  if ((data.substring(0, 1) != '{') && (data.substring(0, 1) != '[')) {
    return { status: 0, data: data.length ? data : Drupal.t('Unspecified error') };
  }
  return eval('(' + data + ');');
};

/**
 * Freeze the current body height (as minimum height). Used to prevent
 * unnecessary upwards scrolling when doing DOM manipulations.
 */
Drupal.freezeHeight = function () {
  Drupal.unfreezeHeight();
  var div = document.createElement('div');
  $(div).css({
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '1px',
    height: $('body').css('height')
  }).attr('id', 'freeze-height');
  $('body').append(div);
};

/**
 * Unfreeze the body height
 */
Drupal.unfreezeHeight = function () {
  $('#freeze-height').remove();
};

/**
 * Wrapper around encodeURIComponent() which avoids Apache quirks (equivalent of
 * drupal_urlencode() in PHP). This function should only be used on paths, not
 * on query string arguments.
 */
Drupal.encodeURIComponent = function (item, uri) {
  uri = uri || location.href;
  item = encodeURIComponent(item).replace(/%2F/g, '/');
  return (uri.indexOf('?q=') != -1) ? item : item.replace(/%26/g, '%2526').replace(/%23/g, '%2523').replace(/\/\//g, '/%252F');
};

/**
 * Get the text selection in a textarea.
 */
Drupal.getSelection = function (element) {
  if (typeof(element.selectionStart) != 'number' && document.selection) {
    // The current selection
    var range1 = document.selection.createRange();
    var range2 = range1.duplicate();
    // Select all text.
    range2.moveToElementText(element);
    // Now move 'dummy' end point to end point of original range.
    range2.setEndPoint('EndToEnd', range1);
    // Now we can calculate start and end points.
    var start = range2.text.length - range1.text.length;
    var end = start + range1.text.length;
    return { 'start': start, 'end': end };
  }
  return { 'start': element.selectionStart, 'end': element.selectionEnd };
};

/**
 * Build an error message from ahah response.
 */
Drupal.ahahError = function(xmlhttp, uri) {
  if (xmlhttp.status == 200) {
    if (jQuery.trim(xmlhttp.responseText)) {
      var message = Drupal.t("An error occurred. \n@uri\n@text", {'@uri': uri, '@text': xmlhttp.responseText });
    }
    else {
      var message = Drupal.t("An error occurred. \n@uri\n(no information available).", {'@uri': uri });
    }
  }
  else {
    var message = Drupal.t("An HTTP error @status occurred. \n@uri", {'@uri': uri, '@status': xmlhttp.status });
  }
  return message.replace(/\n/g, '<br />');
}

// Global Killswitch on the <html> element
$(document.documentElement).addClass('js');
// Attach all behaviors.
$(document).ready(function() {
  Drupal.attachBehaviors(this);
});

/**
 * The default themes.
 */
Drupal.theme.prototype = {

  /**
   * Formats text for emphasized display in a placeholder inside a sentence.
   *
   * @param str
   *   The text to format (plain-text).
   * @return
   *   The formatted text (html).
   */
  placeholder: function(str) {
    return '<em>' + Drupal.checkPlain(str) + '</em>';
  }
};
;
/**
 * @file
 * Javascript behaviors and helpers for modules/fb.
 */

FB_JS = function(){};
FB_JS.fbu = null;

/**
 * Drupal behaviors hook.
 *
 * Called when page is loaded, or content added via javascript.
 */
Drupal.behaviors.fb = function(context) {
  // Respond to our jquery pseudo-events
  var events = jQuery(document).data('events');
  if (!events || !events.fb_session_change) {
    jQuery(document).bind('fb_session_change', FB_JS.sessionChangeHandler);
  }

  // Once upon a time, we initialized facebook's JS SDK here, but now that is done in fb_footer().
  if (typeof(FB) != 'undefined') {
    // Render any XFBML markup that may have been added by AJAX.
    $(context).each(function() {
      var elem = $(this).get(0);
      try {
      FB.XFBML.parse(elem);
      } catch(err) {}
    });

    FB_JS.showConnectedMarkup(Drupal.settings.fb.fbu, context);
  }

  // Markup with class .fb_show should be visible if javascript is enabled.  .fb_hide should be hidden.
  jQuery('.fb_hide', context).hide();
  jQuery('.fb_show', context).show();
};

if (typeof(window.fbAsyncInit) != 'undefined') {
  // There should be only one definition of fbAsyncInit!
  debugger;
};

/**
 * This function called by facebook's javascript when it is loaded.
 * http://developers.facebook.com/docs/reference/javascript/
 *
 * This function has grown complex trying to handle various
 * permutations of facebook's APIs.  The FB functions that take a
 * callback (i.e. FB.getLoginStatus and FB.api) are often never called
 * back.  So, to work around that, there may be some redundant calls.
 */
window.fbAsyncInit = function() {

  if (Drupal.settings.fb) {
    FB.init(Drupal.settings.fb.fb_init_settings);
  }
  
  // Facebook recommends calling getLoginStatus after FB.init (http://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/)
  // However, it's got lots of bugs reported against it (https://developers.facebook.com/bugs/240058389381072, http://developers.facebook.com/bugs/173032012783482?browse=search_4ecd4a1aa27a81146273027)
  // So we make it optional whether we call it or not.
  if (Drupal.settings.fb.get_login_status) {
    FB.getLoginStatus(function(response) {
      FB_JS.initFinal(response);
      FB_JS.authResponseChange(response);
    });
  }
  else if (Drupal.settings.fb.fb_init_settings.authResponse) {
    // Our authResponse sent to us from fb.module.
    FB_JS.initFinal({'authResponse' : Drupal.settings.fb.fb_init_settings.authResponse});
  }
  else {
    // No application.  Not safe to call FB.getLoginStatus().
    // Or, we are configured to not call getLoginStatus().
    // We still want to initialize XFBML, third-party modules, etc.
    FB_JS.initFinal({'authResponse' : null});
  }

  if (!Drupal.settings.fb.get_login_status && Drupal.settings.fb.test_login_status && FB.getUserID()) {
    // This is an alternative to calling getLoginStatus().  Adds some overhead to the client side by calling FB.api on every page.  But, will detect if user has logged out of facebook.
    FB.api('/me', function(response) {
      // Calling FB.api is unfortunate overhead, but no other way to detect if user has logged out of facebook.
      if (typeof(response.error) != 'undefined') {
        // Fake an auth response change so Drupal knows user is logged out.
        FB_JS.authResponseChange({'authResponse' : null});
      }
      else if (response.id != Drupal.settings.fb.fbu) {
        // Fake an auth response change so Drupal knows user has changed.
        FB_JS.authResponseChange({'authResponse' : {'userID' : response.id}});
      }
    });
  }
};


/**
 * Finish initializing, whether there is an application or not.
 */
FB_JS.initFinal = function(response) {
  var status = {
    'status': response.status, // not using oauth
    'auth': response.authResponse, // using oauth
    'response': response
  };

  jQuery.event.trigger('fb_init', status);  // Trigger event for third-party modules.

  FB_JS.authResponseChange(response); // This will act only if fbu changed.

  FB_JS.eventSubscribe();

  FB_JS.showConnectedMarkup(); // Make sure this called even when FB callbacks are not called.

  if (typeof(FB.XFBML) != 'undefined') {
    try {
    FB.XFBML.parse(); // soon to be deprecated!
    } catch(err) {
      
    }
  }
}

/**
 * Tell facebook to notify us of events we may need to act on.
 */
FB_JS.eventSubscribe = function() {
  // Use FB.Event to detect Connect login/logout.
  FB.Event.subscribe('auth.authResponseChange', FB_JS.authResponseChange);

  // Q: what the heck is "edge.create"? A: the like button was clicked.
  FB.Event.subscribe('edge.create', FB_JS.edgeCreate);

}

/**
 * Helper parses URL params.
 *
 * http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
 */
FB_JS.getUrlVars = function(href) {
  var vars = [], hash;
  var hashes = href.slice(href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars[hash[0]] = hash[1];
    if (hash[0] != 'fbu')
      vars.push(hashes[i]); // i.e. "foo=bar"
  }
  return vars;
}

/**
 * Reload the current page, whether on canvas page or facebook connect.
 *
 * append fbsig, a hash of the session data, to avoid infinite reloads
 * in some cases.
 */
FB_JS.reload = function(destination) {

  if (Drupal.settings.fb.reload_url_append_hash) {
    var fbhash;

    // Determine url hash.
    if (typeof(FB.getAuthResponse) != 'undefined') {
      var auth = FB.getAuthResponse();

      if (auth != null)
        fbhash = auth.signedRequest; // Use sig rather than compute a new hash.
      else
        fbhash = 0;
    }
    else {
      var session = FB.getSession();
      if (session != null)
        fbhash = session.sig;
      else
        fbhash = 0;
    }
  }

  // Avoid infinite reloads.  Still needed? It would be nice to do away with this code if not needed.
  ///@TODO - does not work on iframe because facebook does not pass url args to canvas frame when cookies not accepted.  http://forum.developers.facebook.net/viewtopic.php?id=77236
  var vars = FB_JS.getUrlVars(window.location.href);
  if (typeof(fbhash) != 'undefined' && vars.fbhash == fbhash) {
    return; // Do not reload (again)
  }

  // Determine where to send user.
  if (typeof(destination) != 'undefined' && destination) {
    // Use destination passed in.
  }
  else if (typeof(Drupal.settings.fb.reload_url) != 'undefined') {
    destination = Drupal.settings.fb.reload_url;
  }
  else {
    destination = window.location.href;
  }

  // Split and parse destination
  var path;
  if (destination.indexOf('?') == -1) {
    vars = [];
    path = destination;
  }
  else {
    vars = FB_JS.getUrlVars(destination);
    path = destination.substr(0, destination.indexOf('?'));
  }

  // Add fbhash to params before reload.
  if (Drupal.settings.fb.reload_url_append_hash) {
    vars.push('fbhash=' + fbhash);
  }

  // Use window.top for iframe canvas pages.
  destination = vars.length ? (path + '?' + vars.join('&')) : path;

  if (Drupal.settings.fb.reload_url_fragment) {
    destination = destination + "#" + Drupal.settings.fb.reload_url_fragment;
  }

  // Feedback that entire page may be reloading.
  // @TODO improve the appearance of this, make it customizable.
  // This unweildy set of tags should make a progress bar in any Drupal site.
  var fbMarkup = jQuery('.fb_connected,.fb_not_connected').wrap('<div class="progress" />').wrap('<div class="bar" />').wrap('<div class="filled" />');
  if (fbMarkup.length) {
    fbMarkup.hide(); // Hides FBML, leaves progress bar.
  }
  else {
    // If no markup changed, throw a progress bar at the top of the page.
    jQuery('body').prepend('<div id="fb_js_pb" class="progress"><div class="bar"><div class="filled"></div></div></div>');
  }

  window.top.location = destination;
  //alert(destination); // debugging.
};



// Facebook pseudo-event handlers.
FB_JS.authResponseChange = function(response) {

  //debugger;
  if (response.status == 'unknown') {
    // @TODO can we test if third-party cookies are disabled?
  }

  var status = {
    'changed': false,
    'fbu': FB.getUserID(),
    'session': response.authResponse, // deprecated,  still needed???
    'auth': response.authResponse, // still needed???
    'response' : response
  };

  if ((Drupal.settings.fb.fbu || status.fbu) &&
      Drupal.settings.fb.fbu != status.fbu) {
    // A user has logged in.
    status.changed = true;
  }

  /*
  if (response.authResponse) {
    status.fbu = response.authResponse.userID;
    if (Drupal.settings.fb.fbu != status.fbu) {
      // A user has logged in.
      status.changed = true;
    }
  }
  else if (response.session) {
    status.fbu = response.session.uid;
    if (Drupal.settings.fb.fbu != status.fbu) {
      // A user has logged in.
      status.changed = true;
    }
  }
  else if (Drupal.settings.fb && Drupal.settings.fb.fbu) {
    // A user has logged out.
    status.changed = true;
  }
*/

  if (status.changed) {
    // fbu has changed since server built the page.
    jQuery.event.trigger('fb_session_change', status);

    // Remember the fbu.
    Drupal.settings.fb.fbu = status.fbu;

    FB_JS.showConnectedMarkup(status.fbu);
  }
};

// edgeCreate is handler for Like button.
FB_JS.edgeCreate = function(href, widget) {
  var status = {'href': href};
  FB_JS.ajaxEvent('edge.create', status);
};

// JQuery pseudo-event handler.
FB_JS.sessionChangeHandler = function(context, status) {
  // Pass data to ajax event.
  var data = {
    'event_type': 'session_change',
    'is_anonymous': Drupal.settings.fb.is_anonymous
  };

  data.fbu = FB.getUserID();

  FB_JS.ajaxEvent(data.event_type, data);
  // No need to call window.location.reload().  It will be called from ajaxEvent, if needed.
};


// Helper to pass events via AJAX.
// A list of javascript functions to be evaluated is returned.
FB_JS.ajaxEvent = function(event_type, request_data) {
  if (Drupal.settings.fb.ajax_event_url) {

    // Session data helpful in ajax callbacks.  See fb_settings.inc.
    // request_data.fb_js_session = JSON.stringify(FB.getSession()); // FB.getSession() FAILS! REMOVE or REPLACE.
    if (typeof(Drupal.settings.fb_page_type) != 'undefined') {
      request_data.fb_js_page_type = Drupal.settings.fb_page_type;
    }

    // Historically, we pass appId to ajax events.
    // This data no longer present in JS API, so may be removed soon.
    // In other words, deprecated!
    request_data.appId = Drupal.settings.fb.fb_init_settings.appId;

    // Other values to pass to ajax handler.
    if (Drupal.settings.fb.controls) {
      request_data.fb_controls = Drupal.settings.fb.controls;
    }

    // In case cookies are not accurate, always pass in signed request.
    if (typeof(FB.getAuthResponse) != 'undefined') {
      response = FB.getAuthResponse();
      if (response) {
        request_data.signed_request = response.signedRequest;
      }
    }
    else {
      session = FB.getSession();
      if (session) {
        //request_data.session = session;
        request_data.access_token = session.access_token;
      }
    }


    jQuery.ajax({
      url: Drupal.settings.fb.ajax_event_url + '/' + event_type,
      data : request_data,
      type: 'POST',
      dataType: 'json',
      success: function(js_array, textStatus, XMLHttpRequest) {
        if (js_array.length > 0) {
          for (var i = 0; i < js_array.length; i++) {
            eval(js_array[i]);
          }
        }
        else {
          if (event_type == 'session_change') {
            // No instructions from ajax.  Notify interested parties
            jQuery.event.trigger('fb_session_change_done');
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Unexpected error (i.e. ajax did not return json-encoded data).
        var headers = jqXHR.getAllResponseHeaders(); // debug info.
        var responseText = jqXHR.responseText; // debug info.
        debugger;
        // @TODO: handle error, but how?
      }
    });
  }
};


/**
 * Called when we first learn the currently logged in user's Facebook ID.
 *
 * Responsible for showing/hiding markup not intended for the current
 * user.  Some sites will choose to render pages with fb_connected and
 * fb_not_connected classes, rather than reload pages when user's
 * connect/disconnect.
 */
FB_JS.showConnectedMarkup = function(fbu, context) {
  if (!fbu && typeof(FB) != 'undefined')
    fbu = FB.getUserID(); // More reliable than fbu passed in.

  if (context || fbu != FB_JS.fbu) {
    if (fbu) {
      FB_JS.fbu = fbu;
      // Show markup intended only for connected users.
      jQuery('.fb_not_connected', context).hide();
      jQuery('.fb_connected', context).show();
    }
    else {
      FB_JS.fbu = null;
      // Show markup intended only for not connected users.
      jQuery('.fb_connected', context).hide();
      jQuery('.fb_not_connected', context).show();
    }
  }
};


;
/*	
 *	jQuery dotdotdot 1.5.2
 *	
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function( $ )
{
	if ( $.fn.dotdotdot )
	{
		return;
	}

	$.fn.dotdotdot = function( o )
	{
		if ( this.length == 0 )
		{
			debug( true, 'No element found for "' + this.selector + '".' );
			return this;
		}
		if ( this.length > 1 )
		{
			return this.each(
				function()
				{
					$(this).dotdotdot( o );
				}
			);
		}


		var $dot = this;

		if ( $dot.data( 'dotdotdot' ) )
		{
			$dot.trigger( 'destroy.dot' );
		}

		$dot.bind_events = function()
		{
			$dot.bind(
				'update.dot',
				function( e, c )
				{
					e.preventDefault();
					e.stopPropagation();

					opts.maxHeight = ( typeof opts.height == 'number' ) 
						? opts.height 
						: getTrueInnerHeight( $dot );

					opts.maxHeight += opts.tolerance;

					if ( typeof c != 'undefined' )
					{
						if ( typeof c == 'string' || c instanceof HTMLElement )
						{
					 		c = $('<div />').append( c ).contents();
						}
						if ( c instanceof $ )
						{
							orgContent = c;
						}
					}

					$inr = $dot.wrapInner( '<div class="dotdotdot" />' ).children();
					$inr.empty()
						.append( orgContent.clone( true ) )
						.css({
							'height'	: 'auto',
							'width'		: 'auto',
							'border'	: 'none',
							'padding'	: 0,
							'margin'	: 0
						});

					var after = false,
						trunc = false;

					if ( conf.afterElement )
					{
						after = conf.afterElement.clone( true );
						conf.afterElement.remove();
					}
					if ( test( $inr, opts ) )
					{
						if ( opts.wrap == 'children' )
						{
							trunc = children( $inr, opts, after );
						}
						else
						{
							trunc = ellipsis( $inr, $dot, $inr, opts, after );
						}
					}
					$inr.replaceWith( $inr.contents() );
					$inr = null;
					
					if ( $.isFunction( opts.callback ) )
					{
						opts.callback.call( $dot[ 0 ], trunc, orgContent );
					}

					conf.isTruncated = trunc;
					return trunc;
				}

			).bind(
				'isTruncated.dot',
				function( e, fn )
				{
					e.preventDefault();
					e.stopPropagation();

					if ( typeof fn == 'function' )
					{
						fn.call( $dot[ 0 ], conf.isTruncated );
					}
					return conf.isTruncated;
				}

			).bind(
				'originalContent.dot',
				function( e, fn )
				{
					e.preventDefault();
					e.stopPropagation();

					if ( typeof fn == 'function' )
					{
						fn.call( $dot[ 0 ], orgContent );
					}
					return orgContent;
				}

			).bind(
				'destroy.dot',
				function( e )
				{
					e.preventDefault();
					e.stopPropagation();

					$dot.unwatch()
						.unbind_events()
						.empty()
						.append( orgContent )
						.data( 'dotdotdot', false );
				}
			);
			return $dot;
		};	//	/bind_events

		$dot.unbind_events = function()
		{
			$dot.unbind('.dot');
			return $dot;
		};	//	/unbind_events

		$dot.watch = function()
		{
			$dot.unwatch();
			if ( opts.watch == 'window' )
			{
				var $window = $(window),
					_wWidth = $window.width(),
					_wHeight = $window.height(); 

				$window.bind(
					'resize.dot' + conf.dotId,
					function()
					{
						if ( _wWidth != $window.width() || _wHeight != $window.height() || !opts.windowResizeFix )
						{
							_wWidth = $window.width();
							_wHeight = $window.height();
	
							if ( watchInt )
							{
								clearInterval( watchInt );
							}
							watchInt = setTimeout(
								function()
								{
									$dot.trigger( 'update.dot' );
								}, 10
							);
						}
					}
				);
			}
			else
			{
				watchOrg = getSizes( $dot );
				watchInt = setInterval(
					function()
					{
						var watchNew = getSizes( $dot );
						if ( watchOrg.width  != watchNew.width ||
							 watchOrg.height != watchNew.height )
						{
							$dot.trigger( 'update.dot' );
							watchOrg = getSizes( $dot );
						}
					}, 100
				);
			}
			return $dot;
		};
		$dot.unwatch = function()
		{
			$(window).unbind( 'resize.dot' + conf.dotId );
			if ( watchInt )
			{
				clearInterval( watchInt );
			}
			return $dot;
		};

		var	orgContent	= $dot.contents(),
			opts 		= $.extend( true, {}, $.fn.dotdotdot.defaults, o ),
			conf		= {},
			watchOrg	= {},
			watchInt	= null,
			$inr		= null;

		conf.afterElement	= getElement( opts.after, $dot );
		conf.isTruncated	= false;
		conf.dotId			= dotId++;


		$dot.data( 'dotdotdot', true )
			.bind_events()
			.trigger( 'update.dot' );

		if ( opts.watch )
		{
			$dot.watch();
		}

		return $dot;
	};


	//	public
	$.fn.dotdotdot.defaults = {
		'ellipsis'	: '... ',
		'wrap'		: 'word',
		'lastCharacter': {
			'remove'		: [ ' ', ',', ';', '.', '!', '?' ],
			'noEllipsis'	: []
		},
		'tolerance'	: 0,
		'callback'	: null,
		'after'		: null,
		'height'	: null,
		'watch'		: false,
		'windowResizeFix': true,
		'debug'		: false
	};
	

	//	private
	var dotId = 1;

	function children( $elem, o, after )
	{
		var $elements 	= $elem.children(),
			isTruncated	= false;

		$elem.empty();

		for ( var a = 0, l = $elements.length; a < l; a++ )
		{
			var $e = $elements.eq( a );
			$elem.append( $e );
			if ( after )
			{
				$elem.append( after );
			}
			if ( test( $elem, o ) )
			{
				$e.remove();
				isTruncated = true;
				break;
			}
			else
			{
				if ( after )
				{
					after.remove();
				}
			}
		}
		return isTruncated;
	}
	function ellipsis( $elem, $d, $i, o, after )
	{
		var $elements 	= $elem.contents(),
			isTruncated	= false;

		$elem.empty();

		var notx = 'table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, select, optgroup, option, textarea, script, style';
		for ( var a = 0, l = $elements.length; a < l; a++ )
		{

			if ( isTruncated )
			{
				break;
			}

			var e	= $elements[ a ],
				$e	= $(e);

			if ( typeof e == 'undefined' )
			{
				continue;
			}

			$elem.append( $e );
			if ( after )
			{
				var func = ( $elem.is( notx ) )
					? 'after'
					: 'append';
				$elem[ func ]( after );
			}
			if ( e.nodeType == 3 )
			{
				if ( test( $i, o ) )
				{
					isTruncated = ellipsisElement( $e, $d, $i, o, after );
				}
			}
			else
			{
				isTruncated = ellipsis( $e, $d, $i, o, after );
			}

			if ( !isTruncated )
			{
				if ( after )
				{
					after.remove();
				}
			}
		}
		return isTruncated;
	}
	function ellipsisElement( $e, $d, $i, o, after )
	{
		var isTruncated	= false,
			e			= $e[ 0 ];

		if ( typeof e == 'undefined' )
		{
			return false;
		}

		var seporator	= ( o.wrap == 'letter' ) ? '' : ' ',
			textArr		= getTextContent( e ).split( seporator ),
			position 	= -1,
			midPos		= -1,
			startPos	= 0,
			endPos		= textArr.length - 1;

		while ( startPos <= endPos )
		{
			var m = Math.floor( ( startPos + endPos ) / 2 );
			if ( m == midPos ) 
			{
				break;
			}
			midPos = m;

			setTextContent( e, textArr.slice( 0, midPos + 1 ).join( seporator ) + o.ellipsis );

			if ( !test( $i, o ) )
			{
				position	= midPos;
				startPos	= midPos; 
			}
			else
			{
				endPos		= midPos;
			}				
		}	
	
		if ( position != -1 )
		{
			var txt = textArr.slice( 0, position + 1 ).join( seporator );
			isTruncated = true;

			while( $.inArray( txt.slice( -1 ), o.lastCharacter.remove ) > -1 )
			{
				txt = txt.slice( 0, -1 );
			}
			if ( $.inArray( txt.slice( -1 ), o.lastCharacter.noEllipsis ) < 0 )
			{
				txt += o.ellipsis;
			}
			setTextContent( e, txt );
		}
		else
		{
			var $w = $e.parent();
			$e.remove();

			if ( $w.contents().size() > 0 )
			{
				$n = $w.contents().eq( -1 );
				isTruncated = ellipsisElement( $n, $d, $i, o, after );
			}
			else
			{
				isTruncated = true;
			}
		}

		return isTruncated;
	}
	function test( $i, o )
	{
		return $i.innerHeight() > o.maxHeight;
	}
	function getSizes( $d )
	{
		return {
			'width'	: $d.innerWidth(),
			'height': $d.innerHeight()
		};
	}
	function setTextContent( e, content )
	{
		if ( e.innerText )
		{
			e.innerText = content;
		}
		else if ( e.nodeValue )
		{
			e.nodeValue = content;
		}
		else if (e.textContent)
		{
			e.textContent = content;
		}

	}
	function getTextContent( e )
	{
		if ( e.innerText )
		{
			return e.innerText;
		}
		else if ( e.nodeValue )
		{
			return e.nodeValue;
		}
		else if ( e.textContent )
		{
			return e.textContent;
		}
		else
		{
			return "";
		}
	}
	function getElement( e, $i )
	{
		if ( typeof e == 'undefined' )
		{
			return false;
		}
		if ( !e )
		{
			return false;
		}
		if ( typeof e == 'string' )
		{
			e = $(e, $i);
			return ( e.length )
				? e 
				: false;
		}
		if ( typeof e == 'object' )
		{
			return ( typeof e.jquery == 'undefined' )
				? false
				: e;
		}
		return false;
	}
	function getTrueInnerHeight( $el )
	{
		var h = $el.innerHeight(),
			a = [ 'paddingTop', 'paddingBottom' ];

		for ( z = 0, l = a.length; z < l; z++ ) {
			var m = parseInt( $el.css( a[ z ] ), 10 );
			if ( isNaN( m ) )
			{
				m = 0;
			}
			h -= m;
		}
		return h;
	}
	function debug( d, m )
	{
		if ( !d )
		{
			return false;
		}
		if ( typeof m == 'string' )
		{
			m = 'dotdotdot: ' + m;
		}
		else
		{
			m = [ 'dotdotdot:', m ];
		}

		if ( window.console && window.console.log )
		{
			window.console.log( m );
		}
		return false;
	}
	

	//	override jQuery.html
	var _orgHtml = $.fn.html;
    $.fn.html = function( str ) {
		if ( typeof str != 'undefined' )
		{
			if ( this.data( 'dotdotdot' ) )
			{
				if ( typeof str != 'function' )
				{
					return this.trigger( 'update', [ str ] );
				}
			}
			return _orgHtml.call( this, str );
		}
		return _orgHtml.call( this );
    };


	//	override jQuery.text
	var _orgText = $.fn.text;
    $.fn.text = function( str ) {
		if ( typeof str != 'undefined' )
		{
			if ( this.data( 'dotdotdot' ) )
			{
				var temp = $( '<div />' );
				temp.text( str );
				str = temp.html();
				temp.remove();
				return this.trigger( 'update', [ str ] );
			}
			return _orgText.call( this, str );
		}
        return _orgText.call( this );
    };


})( jQuery );;
$(document).ready(function() {
  $('.styled_nodequeue .styled_noqueue_item').each(function() {
    $(this).bind('mouseover', function() {
      $(this).css('cursor', 'pointer');
    }).bind('click', function() {
      $(location).attr('href', $(this).find('.styled_noqueue_item_headline a').attr('href'));
    });
  });
});
Drupal.behaviors.cckblock = function() {
  $("input.form-submit").bind('mouseover',function(){
    var context = $(this).parent().parent();

     $(".cckblock-ckeditor-wrapper textarea",context).each(function () {
      
      var ta_id=$(this).attr("id");

        Drupal.ckeditorOff(ta_id);
        Drupal.ckeditorOn(ta_id);
        
     });
     return false;
  });
  
  $(".div-edit-button").bind('click',function(){
    if($(this).hasClass('open')) {
      $(this).next().slideUp('fast');
      $(this).removeClass('open');
      $("a",this).text('open');
    } else {
      $(this).next().slideDown('fast');
      $(this).addClass('open');
      $("a",this).text('close');
    }
    return false;
  });

  $("body").ajaxComplete(function() {

    $('.cckblock-nids-list').filter(':not(.tabledrag-processed)').each(function() {
      var tableSettings = Drupal.settings.tableDrag['draggable-table-nids-0'];
      var base = $(this).attr('id');
      Drupal.tableDrag[base] = new Drupal.tableDrag(this,tableSettings);
      $('#' + base).addClass('tabledrag-processed');
    });
    
   
    
   var contentTaxonomy = $(".content-taxonomy-field").parent();
   

   $.each(contentTaxonomy, function (i, v) {
    v = "#" + $(v).attr('id');
    var wrapper = $(v);
    if (wrapper.length == 1 && !wrapper.hasClass('active-tags-processed')) {
      activeTagsActivate(v, i);
      wrapper.addClass('active-tags-processed');
    }
  });  
  
   var ckeditorID = $("textarea.ckeditor-processed").eq(0).attr('id');
    
   $(".cckblock-ckeditor-wrapper textarea:not(.ckeditor-processed)").each(function () {

      var ta_id=$(this).attr("id");
      $(this).addClass('ckeditor-mod');
      Drupal.settings.ckeditor.settings[ta_id] = Drupal.settings.ckeditor.settings[ckeditorID];
      
      if(typeof(CKEDITOR.instances[ta_id]) != 'null') {
        delete CKEDITOR.instances[ta_id];
      }
      
      Drupal.ckeditorOn(ta_id);
      //Drupal.attachBehaviors(".ahah-new-content");
      

      
    });
  


    
  }); 

 }

;

/**
 * Adds the custom autocomplete widget behavior.
 */
Drupal.behaviors.apachesolr_autocomplete = function(context) {
  $(".apachesolr-autocomplete.unprocessed", context).autocomplete(Drupal.settings.apachesolr_autocomplete.path,
  {
    // Classnames for the widget.
    inputClass: "",
    loadingClass: "throbbing",
    // Do not select first suggestion by default.
    selectFirst: false,
    // Specify no matching as it wil be done on server-side.
    matchContains: false,
    matchSubset: false,
    // Maximum number of items to show in widget.
    max: 50,
    scroll: true,
    scrollHeight: 360,
    // Data returned from server is JSON-encoded.
    dataType: "json",
    // Function to parse returned json into elements.
    parse: function(data) {
      return $.map(data, function(item) {
        return {
          data: item,          // Echo the input data.
          value: item.display, // This will be shown in the options widget.
          result: item.key     // The actual value to put into the form element.
        }
      });
    },
    // Return the HTML to display in the options widget.
    formatItem: function(item) {
      return item.display;
    }
  }).result(function(item, element) {
    // Handle selection of an element in the autocomplete widget.
    // We should submit the widget's parent form.
    $(this).get(0).form.submit();
  }).addClass('form-autocomplete'); // Add Drupal autocomplete widget's style.
};
;
/*
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

;(function($) {
	
$.fn.extend({
	autocomplete: function(urlOrData, options) {
		var isUrl = typeof urlOrData == "string";
		options = $.extend({}, $.Autocompleter.defaults, {
			url: isUrl ? urlOrData : null,
			data: isUrl ? null : urlOrData,
			delay: isUrl ? $.Autocompleter.defaults.delay : 10,
			max: options && !options.scroll ? 10 : 150
		}, options);
		
		// if highlight is set to false, replace it with a do-nothing function
		options.highlight = options.highlight || function(value) { return value; };
		
		// if the formatMatch option is not specified, then use formatItem for backwards compatibility
		options.formatMatch = options.formatMatch || options.formatItem;
		
		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	},
	result: function(handler) {
		return this.bind("result", handler);
	},
	search: function(handler) {
		return this.trigger("search", [handler]);
	},
	flushCache: function() {
		return this.trigger("flushCache");
	},
	setOptions: function(options){
		return this.trigger("setOptions", [options]);
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});

$.Autocompleter = function(input, options) {

	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};

	// Create $ object for input element
	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

	var timeout;
	var previousValue = "";
	var cache = $.Autocompleter.Cache(options);
	var hasFocus = 0;
	var lastKeyPressCode;
	var config = {
		mouseDownOnSelect: false
	};
	var select = $.Autocompleter.Select(options, input, selectCurrent, config);
	
	var blockSubmit;
	
	// prevent form submit in opera when selecting with return key
	$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});
	
	// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
	$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
		// a keypress means the input has focus
		// avoids issue where input had focus before the autocomplete was applied
		hasFocus = 1;
		// track last key pressed
		lastKeyPressCode = event.keyCode;
		switch(event.keyCode) {
		
			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			
			// matches also semicolon
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					// stop default to prevent a form submit, Opera needs special handling
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;
				
			case KEY.ESC:
				select.hide();
				break;
				
			default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
		}
	}).focus(function(){
		// track whether the field has focus, we shouldn't process any
		// results if the field no longer has focus
		hasFocus++;
	}).blur(function() {
		hasFocus = 0;
		if (!config.mouseDownOnSelect) {
			hideResults();
		}
	}).click(function() {
		// show select when clicking in a focused field
		if ( hasFocus++ > 1 && !select.visible() ) {
			onChange(0, true);
		}
	}).bind("search", function() {
		// TODO why not just specifying both arguments?
		var fn = (arguments.length > 1) ? arguments[1] : null;
		function findValueCallback(q, data) {
			var result;
			if( data && data.length ) {
				for (var i=0; i < data.length; i++) {
					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
						result = data[i];
						break;
					}
				}
			}
			if( typeof fn == "function" ) fn(result);
			else $input.trigger("result", result && [result.data, result.value]);
		}
		$.each(trimWords($input.val()), function(i, value) {
			request(value, findValueCallback, findValueCallback);
		});
	}).bind("flushCache", function() {
		cache.flush();
	}).bind("setOptions", function() {
		$.extend(options, arguments[1]);
		// if we've updated the data, repopulate
		if ( "data" in arguments[1] )
			cache.populate();
	}).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind();
		$(input.form).unbind(".autocomplete");
	});
	
	
	function selectCurrent() {
		var selected = select.selected();
		if( !selected )
			return false;
		
		var v = selected.result;
		previousValue = v;
		
		if ( options.multiple ) {
			var words = trimWords($input.val());
			if ( words.length > 1 ) {
				var seperator = options.multipleSeparator.length;
				var cursorAt = $(input).selection().start;
				var wordAt, progress = 0;
				$.each(words, function(i, word) {
					progress += word.length;
					if (cursorAt <= progress) {
						wordAt = i;
						return false;
					}
					progress += seperator;
				});
				words[wordAt] = v;
				// TODO this should set the cursor to the right position, but it gets overriden somewhere
				//$.Autocompleter.Selection(input, progress + seperator, progress + seperator);
				v = words.join( options.multipleSeparator );
			}
			v += options.multipleSeparator;
		}
		
		$input.val(v);
		hideResultsNow();
		$input.trigger("result", [selected.data, selected.value]);
		return true;
	}
	
	function onChange(crap, skipPrevCheck) {
		if( lastKeyPressCode == KEY.DEL ) {
			select.hide();
			return;
		}
		
		var currentValue = $input.val();
		
		if ( !skipPrevCheck && currentValue == previousValue )
			return;
		
		previousValue = currentValue;
		
		currentValue = lastWord(currentValue);
		if ( currentValue.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
				currentValue = currentValue.toLowerCase();
			request(currentValue, receiveData, hideResultsNow);
		} else {
			stopLoading();
			select.hide();
		}
	};
	
	function trimWords(value) {
		if (!value)
			return [""];
		if (!options.multiple)
			return [$.trim(value)];
		return $.map(value.split(options.multipleSeparator), function(word) {
			return $.trim(value).length ? $.trim(word) : null;
		});
	}
	
	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		if (words.length == 1) 
			return words[0];
		var cursorAt = $(input).selection().start;
		if (cursorAt == value.length) {
			words = trimWords(value)
		} else {
			words = trimWords(value.replace(value.substring(cursorAt), ""));
		}
		return words[words.length - 1];
	}
	
	// fills in the input box w/the first match (assumed to be the best match)
	// q: the term entered
	// sValue: the first matching result
	function autoFill(q, sValue){
		// autofill in the complete box w/the first match as long as the user hasn't entered in more data
		// if the last user key pressed was backspace, don't autofill
		if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
			// fill in the value (keep the case the user has typed)
			$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
			// select the portion of the value not typed by the user (so the next character will erase)
			$(input).selection(previousValue.length, previousValue.length + sValue.length);
		}
	};

	function hideResults() {
		clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		var wasVisible = select.visible();
		select.hide();
		clearTimeout(timeout);
		stopLoading();
		if (options.mustMatch) {
			// call search and run callback
			$input.search(
				function (result){
					// if no value found, clear the input box
					if( !result ) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
						}
						else {
							$input.val( "" );
							$input.trigger("result", null);
						}
					}
				}
			);
		}
	};

	function receiveData(q, data) {
		if ( data && data.length && hasFocus ) {
			stopLoading();
			select.display(data, q);
			autoFill(q, data[0].value);
			select.show();
		} else {
			hideResultsNow();
		}
	};

	function request(term, success, failure) {
		if (!options.matchCase)
			term = term.toLowerCase();
		var data = cache.load(term);
		// recieve the cached data
		if (data && data.length) {
			success(term, data);
		// if an AJAX url has been supplied, try loading the data now
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			
			var extraParams = {
				timestamp: +new Date()
			};
			$.each(options.extraParams, function(key, param) {
				extraParams[key] = typeof param == "function" ? param() : param;
			});
			
			$.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				mode: "abort",
				// limit abortion to this input
				port: "autocomplete" + input.name,
				dataType: options.dataType,
				url: options.url,
				data: $.extend({
					query: lastWord(term),
					limit: options.max
				}, extraParams),
				success: function(data) {
					var parsed = options.parse && options.parse(data) || parse(data);
					cache.add(term, parsed);
					success(term, parsed);
				}
			});
		} else {
			// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
			select.emptyList();
			failure(term);
		}
	};
	
	function parse(data) {
		var parsed = [];
		var rows = data.split("\n");
		for (var i=0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				row = row.split("|");
				parsed[parsed.length] = {
					data: row,
					value: row[0],
					result: options.formatResult && options.formatResult(row, row[0]) || row[0]
				};
			}
		}
		return parsed;
	};

	function stopLoading() {
		$input.removeClass(options.loadingClass);
	};

};

$.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 1,
	delay: 400,
	matchCase: false,
	matchSubset: true,
	matchContains: false,
	cacheLength: 10,
	max: 100,
	mustMatch: false,
	extraParams: {},
	selectFirst: true,
	formatItem: function(row) { return row[0]; },
	formatMatch: null,
	autoFill: false,
	width: 0,
	multiple: false,
	multipleSeparator: ", ",
	highlight: function(value, term) {
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	},
    scroll: true,
    scrollHeight: 180
};

$.Autocompleter.Cache = function(options) {

	var data = {};
	var length = 0;
	
	function matchSubset(s, sub) {
		if (!options.matchCase) 
			s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (options.matchContains == "word"){
			i = s.toLowerCase().search("\\b" + sub.toLowerCase());
		}
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};
	
	function add(q, value) {
		if (length > options.cacheLength){
			flush();
		}
		if (!data[q]){ 
			length++;
		}
		data[q] = value;
	}
	
	function populate(){
		if( !options.data ) return false;
		// track the matches
		var stMatchSets = {},
			nullData = 0;

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( !options.url ) options.cacheLength = 1;
		
		// track all options for minChars = 0
		stMatchSets[""] = [];
		
		// loop through the array and create a lookup structure
		for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
			var rawValue = options.data[i];
			// if rawValue is a string, make an array otherwise just reference the array
			rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
			
			var value = options.formatMatch(rawValue, i+1, options.data.length);
			if ( value === false )
				continue;
				
			var firstChar = value.charAt(0).toLowerCase();
			// if no lookup array for this character exists, look it up now
			if( !stMatchSets[firstChar] ) 
				stMatchSets[firstChar] = [];

			// if the match is a string
			var row = {
				value: value,
				data: rawValue,
				result: options.formatResult && options.formatResult(rawValue) || value
			};
			
			// push the current match into the set list
			stMatchSets[firstChar].push(row);

			// keep track of minChars zero items
			if ( nullData++ < options.max ) {
				stMatchSets[""].push(row);
			}
		};

		// add the data items to the cache
		$.each(stMatchSets, function(i, value) {
			// increase the cache size
			options.cacheLength++;
			// add to the cache
			add(i, value);
		});
	}
	
	// populate any existing data
	setTimeout(populate, 25);
	
	function flush(){
		data = {};
		length = 0;
	}
	
	return {
		flush: flush,
		add: add,
		populate: populate,
		load: function(q) {
			if (!options.cacheLength || !length)
				return null;
			/* 
			 * if dealing w/local data and matchContains than we must make sure
			 * to loop through all the data collections looking for matches
			 */
			if( !options.url && options.matchContains ){
				// track all matches
				var csub = [];
				// loop through all the data grids for matches
				for( var k in data ){
					// don't search through the stMatchSets[""] (minChars: 0) cache
					// this prevents duplicates
					if( k.length > 0 ){
						var c = data[k];
						$.each(c, function(i, x) {
							// if we've got a match, add it to the array
							if (matchSubset(x.value, q)) {
								csub.push(x);
							}
						});
					}
				}				
				return csub;
			} else 
			// if the exact item exists, use it
			if (data[q]){
				return data[q];
			} else
			if (options.matchSubset) {
				for (var i = q.length - 1; i >= options.minChars; i--) {
					var c = data[q.substr(0, i)];
					if (c) {
						var csub = [];
						$.each(c, function(i, x) {
							if (matchSubset(x.value, q)) {
								csub[csub.length] = x;
							}
						});
						return csub;
					}
				}
			}
			return null;
		}
	};
};

$.Autocompleter.Select = function (options, input, select, config) {
	var CLASSES = {
		ACTIVE: "ac_over"
	};
	
	var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;
	
	// Create results
	function init() {
		if (!needsInit)
			return;
		element = $("<div/>")
		.hide()
		.addClass(options.resultsClass)
		.css("position", "absolute")
		.appendTo(document.body);
	
		list = $("<ul/>").appendTo(element).mouseover( function(event) {
			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
			    $(target(event)).addClass(CLASSES.ACTIVE);            
	        }
		}).click(function(event) {
			$(target(event)).addClass(CLASSES.ACTIVE);
			select();
			// TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
			input.focus();
			return false;
		}).mousedown(function() {
			config.mouseDownOnSelect = true;
		}).mouseup(function() {
			config.mouseDownOnSelect = false;
		});
		
		if( options.width > 0 )
			element.css("width", options.width);
			
		needsInit = false;
	} 
	
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}

	function moveSelect(step) {
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};
	
	function movePosition(step) {
		active += step;
		if (active < 0) {
			active = listItems.size() - 1;
		} else if (active >= listItems.size()) {
			active = 0;
		}
	}
	
	function limitNumberOfItems(available) {
		return options.max && options.max < available
			? options.max
			: available;
	}
	
	function fillList() {
		list.empty();
		var max = limitNumberOfItems(data.length);
		for (var i=0; i < max; i++) {
			if (!data[i])
				continue;
			var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
			if ( formatted === false )
				continue;
			var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
			$.data(li, "ac_data", data[i]);
		}
		listItems = list.find("li");
		if ( options.selectFirst ) {
			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
			active = 0;
		}
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			list.bgiframe();
	}
	
	return {
		display: function(d, q) {
			init();
			data = d;
			term = q;
			fillList();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect( listItems.size() - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = $(input).offset();
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
				top: offset.top + input.offsetHeight,
				left: offset.left
			}).show();
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});
				
                if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						// IE doesn't recalculate width when scrollbar disappears
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }
                
            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.remove();
		}
	};
};

$.fn.selection = function(start, end) {
	if (start !== undefined) {
		return this.each(function() {
			if( this.createTextRange ){
				var selRange = this.createTextRange();
				if (end === undefined || start == end) {
					selRange.move("character", start);
					selRange.select();
				} else {
					selRange.collapse(true);
					selRange.moveStart("character", start);
					selRange.moveEnd("character", end);
					selRange.select();
				}
			} else if( this.setSelectionRange ){
				this.setSelectionRange(start, end);
			} else if( this.selectionStart ){
				this.selectionStart = start;
				this.selectionEnd = end;
			}
		});
	}
	var field = this[0];
	if ( field.createTextRange ) {
		var range = document.selection.createRange(),
			orig = field.value,
			teststring = "<->",
			textLength = range.text.length;
		range.text = teststring;
		var caretAt = field.value.indexOf(teststring);
		field.value = orig;
		this.selection(caretAt, caretAt + textLength);
		return {
			start: caretAt,
			end: caretAt + textLength
		}
	} else if( field.selectionStart !== undefined ){
		return {
			start: field.selectionStart,
			end: field.selectionEnd
		}
	}
};

})(jQuery);
;

$(document).ready(function() {

  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch only the first parent link of a clicked element.
    $(event.target).parents("a:first,area:first").andSelf().filter("a,area").each(function() {

      var ga = Drupal.settings.googleanalytics;
      // Expression to check for absolute internal links.
      var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
      // Expression to check for special links like gotwo.module /go/* links.
      var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
      // Expression to check for download links.
      var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Is download tracking activated and the file extension configured for download tracking?
        if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^=mailto:],area[href^=mailto:]")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (ga.trackOutgoing && this.href) {
          // External link clicked.
          _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
        }
      }
    });
  });
});
;
/* $Id: lightbox.js,v 1.5.2.6.2.136 2010/09/24 08:39:40 snpower Exp $ */

/**
 * jQuery Lightbox
 * @author
 *   Stella Power, <http://drupal.org/user/66894>
 *
 * Based on Lightbox v2.03.3 by Lokesh Dhakar
 * <http://www.huddletogether.com/projects/lightbox2/>
 * Also partially based on the jQuery Lightbox by Warren Krewenki
 *   <http://warren.mesozen.com>
 *
 * Permission has been granted to Mark Ashmead & other Drupal Lightbox2 module
 * maintainers to distribute this file via Drupal.org
 * Under GPL license.
 *
 * Slideshow, iframe and video functionality added by Stella Power.
 */

var Lightbox = {
  auto_modal : false,
  overlayOpacity : 0.8, // Controls transparency of shadow overlay.
  overlayColor : '000', // Controls colour of shadow overlay.
  disableCloseClick : true,
  // Controls the order of the lightbox resizing animation sequence.
  resizeSequence: 0, // 0: simultaneous, 1: width then height, 2: height then width.
  resizeSpeed: 'normal', // Controls the speed of the lightbox resizing animation.
  fadeInSpeed: 'normal', // Controls the speed of the image appearance.
  slideDownSpeed: 'slow', // Controls the speed of the image details appearance.
  minWidth: 240,
  borderSize : 10,
  boxColor : 'fff',
  fontColor : '000',
  topPosition : '',
  infoHeight: 20,
  alternative_layout : false,
  imageArray : [],
  imageNum : null,
  total : 0,
  activeImage : null,
  inprogress : false,
  disableResize : false,
  disableZoom : false,
  isZoomedIn : false,
  rtl : false,
  loopItems : false,
  keysClose : ['c', 'x', 27],
  keysPrevious : ['p', 37],
  keysNext : ['n', 39],
  keysZoom : ['z'],
  keysPlayPause : [32],

  // Slideshow options.
  slideInterval : 5000, // In milliseconds.
  showPlayPause : true,
  autoStart : true,
  autoExit : true,
  pauseOnNextClick : false, // True to pause the slideshow when the "Next" button is clicked.
  pauseOnPrevClick : true, // True to pause the slideshow when the "Prev" button is clicked.
  slideIdArray : [],
  slideIdCount : 0,
  isSlideshow : false,
  isPaused : false,
  loopSlides : false,

  // Iframe options.
  isLightframe : false,
  iframe_width : 600,
  iframe_height : 400,
  iframe_border : 1,

  // Video and modal options.
  enableVideo : false,
  flvPlayer : '/flvplayer.swf',
  flvFlashvars : '',
  isModal : false,
  isVideo : false,
  videoId : false,
  modalWidth : 400,
  modalHeight : 400,
  modalHTML : null,


  // initialize()
  // Constructor runs on completion of the DOM loading.
  // The function inserts html at the bottom of the page which is used
  // to display the shadow overlay and the image container.
  initialize: function() {

    var s = Drupal.settings.lightbox2;
    Lightbox.overlayOpacity = s.overlay_opacity;
    Lightbox.overlayColor = s.overlay_color;
    Lightbox.disableCloseClick = s.disable_close_click;
    Lightbox.resizeSequence = s.resize_sequence;
    Lightbox.resizeSpeed = s.resize_speed;
    Lightbox.fadeInSpeed = s.fade_in_speed;
    Lightbox.slideDownSpeed = s.slide_down_speed;
    Lightbox.borderSize = s.border_size;
    Lightbox.boxColor = s.box_color;
    Lightbox.fontColor = s.font_color;
    Lightbox.topPosition = s.top_position;
    Lightbox.rtl = s.rtl;
    Lightbox.loopItems = s.loop_items;
    Lightbox.keysClose = s.keys_close.split(" ");
    Lightbox.keysPrevious = s.keys_previous.split(" ");
    Lightbox.keysNext = s.keys_next.split(" ");
    Lightbox.keysZoom = s.keys_zoom.split(" ");
    Lightbox.keysPlayPause = s.keys_play_pause.split(" ");
    Lightbox.disableResize = s.disable_resize;
    Lightbox.disableZoom = s.disable_zoom;
    Lightbox.slideInterval = s.slideshow_interval;
    Lightbox.showPlayPause = s.show_play_pause;
    Lightbox.showCaption = s.show_caption;
    Lightbox.autoStart = s.slideshow_automatic_start;
    Lightbox.autoExit = s.slideshow_automatic_exit;
    Lightbox.pauseOnNextClick = s.pause_on_next_click;
    Lightbox.pauseOnPrevClick = s.pause_on_previous_click;
    Lightbox.loopSlides = s.loop_slides;
    Lightbox.alternative_layout = s.use_alt_layout;
    Lightbox.iframe_width = s.iframe_width;
    Lightbox.iframe_height = s.iframe_height;
    Lightbox.iframe_border = s.iframe_border;
    Lightbox.enableVideo = s.enable_video;
    if (s.enable_video) {
      Lightbox.flvPlayer = s.flvPlayer;
      Lightbox.flvFlashvars = s.flvFlashvars;
    }

    // Make the lightbox divs.
    var layout_class = (s.use_alt_layout ? 'lightbox2-alt-layout' : 'lightbox2-orig-layout');
    var output = '<div id="lightbox2-overlay" style="display: none;"></div>\
      <div id="lightbox" style="display: none;" class="' + layout_class + '">\
        <div id="outerImageContainer"></div>\
        <div id="imageDataContainer" class="clearfix">\
          <div id="imageData"></div>\
        </div>\
      </div>';
    var loading = '<div id="loading"><a href="#" id="loadingLink"></a></div>';
    var modal = '<div id="modalContainer" style="display: none;"></div>';
    var frame = '<div id="frameContainer" style="display: none;"></div>';
    var imageContainer = '<div id="imageContainer" style="display: none;"></div>';
    var details = '<div id="imageDetails"></div>';
    var bottomNav = '<div id="bottomNav"></div>';
    var image = '<img id="lightboxImage" alt="" />';
    var hoverNav = '<div id="hoverNav"><a id="prevLink" href="#"></a><a id="nextLink" href="#"></a></div>';
    var frameNav = '<div id="frameHoverNav"><a id="framePrevLink" href="#"></a><a id="frameNextLink" href="#"></a></div>';
    var hoverNav = '<div id="hoverNav"><a id="prevLink" title="' + Drupal.t('Previous') + '" href="#"></a><a id="nextLink" title="' + Drupal.t('Next') + '" href="#"></a></div>';
    var frameNav = '<div id="frameHoverNav"><a id="framePrevLink" title="' + Drupal.t('Previous') + '" href="#"></a><a id="frameNextLink" title="' + Drupal.t('Next') + '" href="#"></a></div>';
    var caption = '<span id="caption"></span>';
    var numberDisplay = '<span id="numberDisplay"></span>';
    var close = '<a id="bottomNavClose" title="' + Drupal.t('Close') + '" href="#"></a>';
    var zoom = '<a id="bottomNavZoom" href="#"></a>';
    var zoomOut = '<a id="bottomNavZoomOut" href="#"></a>';
    var pause = '<a id="lightshowPause" title="' + Drupal.t('Pause Slideshow') + '" href="#" style="display: none;"></a>';
    var play = '<a id="lightshowPlay" title="' + Drupal.t('Play Slideshow') + '" href="#" style="display: none;"></a>';

    $("body").append(output);
    $('#outerImageContainer').append(modal + frame + imageContainer + loading);
    if (!s.use_alt_layout) {
      $('#imageContainer').append(image + hoverNav);
      $('#imageData').append(details + bottomNav);
      $('#imageDetails').append(caption + numberDisplay);
      $('#bottomNav').append(frameNav + close + zoom + zoomOut + pause + play);
    }
    else {
      $('#outerImageContainer').append(bottomNav);
      $('#imageContainer').append(image);
      $('#bottomNav').append(close + zoom + zoomOut);
      $('#imageData').append(hoverNav + details);
      $('#imageDetails').append(caption + numberDisplay + pause + play);
    }

    // Setup onclick handlers.
    if (Lightbox.disableCloseClick) {
      $('#lightbox2-overlay').click(function() { Lightbox.end(); return false; } ).hide();
    }
    $('#loadingLink, #bottomNavClose').click(function() { Lightbox.end('forceClose'); return false; } );
    $('#prevLink, #framePrevLink').click(function() { Lightbox.changeData(Lightbox.activeImage - 1); return false; } );
    $('#nextLink, #frameNextLink').click(function() { Lightbox.changeData(Lightbox.activeImage + 1); return false; } );
    $('#bottomNavZoom').click(function() { Lightbox.changeData(Lightbox.activeImage, true); return false; } );
    $('#bottomNavZoomOut').click(function() { Lightbox.changeData(Lightbox.activeImage, false); return false; } );
    $('#lightshowPause').click(function() { Lightbox.togglePlayPause("lightshowPause", "lightshowPlay"); return false; } );
    $('#lightshowPlay').click(function() { Lightbox.togglePlayPause("lightshowPlay", "lightshowPause"); return false; } );

    // Fix positioning.
    $('#prevLink, #nextLink, #framePrevLink, #frameNextLink').css({ 'paddingTop': Lightbox.borderSize + 'px'});
    $('#imageContainer, #frameContainer, #modalContainer').css({ 'padding': Lightbox.borderSize + 'px'});
    $('#outerImageContainer, #imageDataContainer, #bottomNavClose').css({'backgroundColor': '#' + Lightbox.boxColor, 'color': '#'+Lightbox.fontColor});
    if (Lightbox.alternative_layout) {
      $('#bottomNavZoom, #bottomNavZoomOut').css({'bottom': Lightbox.borderSize + 'px', 'right': Lightbox.borderSize + 'px'});
    }
    else if (Lightbox.rtl == 1 && $.browser.msie) {
      $('#bottomNavZoom, #bottomNavZoomOut').css({'left': '0px'});
    }

    // Force navigation links to always be displayed
    if (s.force_show_nav) {
      $('#prevLink, #nextLink').addClass("force_show_nav");
    }

  },

  // initList()
  // Loops through anchor tags looking for 'lightbox', 'lightshow' and
  // 'lightframe', etc, references and applies onclick events to appropriate
  // links. You can rerun after dynamically adding images w/ajax.
  initList : function(context) {

    if (context == undefined || context == null) {
      context = document;
    }

    // Attach lightbox to any links with rel 'lightbox', 'lightshow' or
    // 'lightframe', etc.
    $("a[rel^='lightbox']:not(.lightbox-processed), area[rel^='lightbox']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
      if (Lightbox.disableCloseClick) {
        $('#lightbox').unbind('click');
        $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
      }
      Lightbox.start(this, false, false, false, false);
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    });
    $("a[rel^='lightshow']:not(.lightbox-processed), area[rel^='lightshow']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
      if (Lightbox.disableCloseClick) {
        $('#lightbox').unbind('click');
        $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
      }
      Lightbox.start(this, true, false, false, false);
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    });
    $("a[rel^='lightframe']:not(.lightbox-processed), area[rel^='lightframe']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
      if (Lightbox.disableCloseClick) {
        $('#lightbox').unbind('click');
        $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
      }
      Lightbox.start(this, false, true, false, false);
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    });
    if (Lightbox.enableVideo) {
      $("a[rel^='lightvideo']:not(.lightbox-processed), area[rel^='lightvideo']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
        if (Lightbox.disableCloseClick) {
          $('#lightbox').unbind('click');
          $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
        }
        Lightbox.start(this, false, false, true, false);
        if (e.preventDefault) { e.preventDefault(); }
        return false;
      });
    }
    $("a[rel^='lightmodal']:not(.lightbox-processed), area[rel^='lightmodal']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
      $('#lightbox').unbind('click');
      // Add classes from the link to the lightbox div - don't include lightbox-processed
      $('#lightbox').addClass($(this).attr('class'));
      $('#lightbox').removeClass('lightbox-processed');
      Lightbox.start(this, false, false, false, true);
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    });
    $("#lightboxAutoModal:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
      Lightbox.auto_modal = true;
      $('#lightbox').unbind('click');
      Lightbox.start(this, false, false, false, true);
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    });
  },

  // start()
  // Display overlay and lightbox. If image is part of a set, add siblings to
  // imageArray.
  start: function(imageLink, slideshow, lightframe, lightvideo, lightmodal) {

    Lightbox.isPaused = !Lightbox.autoStart;

    // Replaces hideSelectBoxes() and hideFlash() calls in original lightbox2.
    Lightbox.toggleSelectsFlash('hide');

    // Stretch overlay to fill page and fade in.
    var arrayPageSize = Lightbox.getPageSize();
    $("#lightbox2-overlay").hide().css({
      'width': '100%',
      'zIndex': '10090',
      'height': arrayPageSize[1] + 'px',
      'backgroundColor' : '#' + Lightbox.overlayColor
    });
    // Detect OS X FF2 opacity + flash issue.
    if (lightvideo && this.detectMacFF2()) {
      $("#lightbox2-overlay").removeClass("overlay_default");
      $("#lightbox2-overlay").addClass("overlay_macff2");
      $("#lightbox2-overlay").css({'opacity' : null});
    }
    else {
      $("#lightbox2-overlay").removeClass("overlay_macff2");
      $("#lightbox2-overlay").addClass("overlay_default");
      $("#lightbox2-overlay").css({'opacity' : Lightbox.overlayOpacity});
    }
    $("#lightbox2-overlay").fadeIn(Lightbox.fadeInSpeed);


    Lightbox.isSlideshow = slideshow;
    Lightbox.isLightframe = lightframe;
    Lightbox.isVideo = lightvideo;
    Lightbox.isModal = lightmodal;
    Lightbox.imageArray = [];
    Lightbox.imageNum = 0;

    var anchors = $(imageLink.tagName);
    var anchor = null;
    var rel_parts = Lightbox.parseRel(imageLink);
    var rel = rel_parts["rel"];
    var rel_group = rel_parts["group"];
    var title = (rel_parts["title"] ? rel_parts["title"] : imageLink.title);
    var rel_style = null;
    var i = 0;

    if (rel_parts["flashvars"]) {
      Lightbox.flvFlashvars = Lightbox.flvFlashvars + '&' + rel_parts["flashvars"];
    }

    // Set the title for image alternative text.
    var alt = imageLink.title;
    if (!alt) {
      var img = $(imageLink).find("img");
      if (img && $(img).attr("alt")) {
        alt = $(img).attr("alt");
      }
      else {
        alt = title;
      }
    }

    if ($(imageLink).attr('id') == 'lightboxAutoModal') {
      rel_style = rel_parts["style"];
      Lightbox.imageArray.push(['#lightboxAutoModal > *', title, alt, rel_style, 1]);
    }
    else {
      // Handle lightbox images with no grouping.
      if ((rel == 'lightbox' || rel == 'lightshow') && !rel_group) {
        Lightbox.imageArray.push([imageLink.href, title, alt]);
      }

      // Handle other items with no grouping.
      else if (!rel_group) {
        rel_style = rel_parts["style"];
        Lightbox.imageArray.push([imageLink.href, title, alt, rel_style]);
      }

      // Handle grouped items.
      else {

        // Loop through anchors and add them to imageArray.
        for (i = 0; i < anchors.length; i++) {
          anchor = anchors[i];
          if (anchor.href && typeof(anchor.href) == "string" && $(anchor).attr('rel')) {
            var rel_data = Lightbox.parseRel(anchor);
            var anchor_title = (rel_data["title"] ? rel_data["title"] : anchor.title);
            img_alt = anchor.title;
            if (!img_alt) {
              var anchor_img = $(anchor).find("img");
              if (anchor_img && $(anchor_img).attr("alt")) {
                img_alt = $(anchor_img).attr("alt");
              }
              else {
                img_alt = title;
              }
            }
            if (rel_data["rel"] == rel) {
              if (rel_data["group"] == rel_group) {
                if (Lightbox.isLightframe || Lightbox.isModal || Lightbox.isVideo) {
                  rel_style = rel_data["style"];
                }
                Lightbox.imageArray.push([anchor.href, anchor_title, img_alt, rel_style]);
              }
            }
          }
        }

        // Remove duplicates.
        for (i = 0; i < Lightbox.imageArray.length; i++) {
          for (j = Lightbox.imageArray.length-1; j > i; j--) {
            if (Lightbox.imageArray[i][0] == Lightbox.imageArray[j][0]) {
              Lightbox.imageArray.splice(j,1);
            }
          }
        }
        while (Lightbox.imageArray[Lightbox.imageNum][0] != imageLink.href) {
          Lightbox.imageNum++;
        }
      }
    }

    if (Lightbox.isSlideshow && Lightbox.showPlayPause && Lightbox.isPaused) {
      $('#lightshowPlay').show();
      $('#lightshowPause').hide();
    }

    // Calculate top and left offset for the lightbox.
    var arrayPageScroll = Lightbox.getPageScroll();
    var lightboxTop = arrayPageScroll[1] + (Lightbox.topPosition == '' ? (arrayPageSize[3] / 10) : Lightbox.topPosition) * 1;
    var lightboxLeft = arrayPageScroll[0];
    $('#frameContainer, #modalContainer, #lightboxImage').hide();
    $('#hoverNav, #prevLink, #nextLink, #frameHoverNav, #framePrevLink, #frameNextLink').hide();
    $('#imageDataContainer, #numberDisplay, #bottomNavZoom, #bottomNavZoomOut').hide();
    $('#outerImageContainer').css({'width': '250px', 'height': '250px'});
    $('#lightbox').css({
      'zIndex': '10500',
      'top': lightboxTop + 'px',
      'left': lightboxLeft + 'px'
    }).show();

    Lightbox.total = Lightbox.imageArray.length;
    Lightbox.changeData(Lightbox.imageNum);
  },

  // changeData()
  // Hide most elements and preload image in preparation for resizing image
  // container.
  changeData: function(imageNum, zoomIn) {

    if (Lightbox.inprogress === false) {
      if (Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) {
        if (imageNum >= Lightbox.total) imageNum = 0;
        if (imageNum < 0) imageNum = Lightbox.total - 1;
      }

      if (Lightbox.isSlideshow) {
        for (var i = 0; i < Lightbox.slideIdCount; i++) {
          window.clearTimeout(Lightbox.slideIdArray[i]);
        }
      }
      Lightbox.inprogress = true;
      Lightbox.activeImage = imageNum;

      if (Lightbox.disableResize && !Lightbox.isSlideshow) {
        zoomIn = true;
      }
      Lightbox.isZoomedIn = zoomIn;


      // Hide elements during transition.
      $('#loading').css({'zIndex': '10500'}).show();
      if (!Lightbox.alternative_layout) {
        $('#imageContainer').hide();
      }
      $('#frameContainer, #modalContainer, #lightboxImage').hide();
      $('#hoverNav, #prevLink, #nextLink, #frameHoverNav, #framePrevLink, #frameNextLink').hide();
      $('#imageDataContainer, #numberDisplay, #bottomNavZoom, #bottomNavZoomOut').hide();

      // Preload image content, but not iframe pages.
      if (!Lightbox.isLightframe && !Lightbox.isVideo && !Lightbox.isModal) {
        $("#lightbox #imageDataContainer").removeClass('lightbox2-alt-layout-data');
        imgPreloader = new Image();
        imgPreloader.onerror = function() { Lightbox.imgNodeLoadingError(this); };

        imgPreloader.onload = function() {
          var photo = document.getElementById('lightboxImage');
          photo.src = Lightbox.imageArray[Lightbox.activeImage][0];
          photo.alt = Lightbox.imageArray[Lightbox.activeImage][2];

          var imageWidth = imgPreloader.width;
          var imageHeight = imgPreloader.height;

          // Resize code.
          var arrayPageSize = Lightbox.getPageSize();
          var targ = { w:arrayPageSize[2] - (Lightbox.borderSize * 2), h:arrayPageSize[3] - (Lightbox.borderSize * 6) - (Lightbox.infoHeight * 4) - (arrayPageSize[3] / 10) };
          var orig = { w:imgPreloader.width, h:imgPreloader.height };

          // Image is very large, so show a smaller version of the larger image
          // with zoom button.
          if (zoomIn !== true) {
            var ratio = 1.0; // Shrink image with the same aspect.
            $('#bottomNavZoomOut, #bottomNavZoom').hide();
            if ((orig.w >= targ.w || orig.h >= targ.h) && orig.h && orig.w) {
              ratio = ((targ.w / orig.w) < (targ.h / orig.h)) ? targ.w / orig.w : targ.h / orig.h;
              if (!Lightbox.disableZoom && !Lightbox.isSlideshow) {
                $('#bottomNavZoom').css({'zIndex': '10500'}).show();
              }
            }

            imageWidth  = Math.floor(orig.w * ratio);
            imageHeight = Math.floor(orig.h * ratio);
          }

          else {
            $('#bottomNavZoom').hide();
            // Only display zoom out button if the image is zoomed in already.
            if ((orig.w >= targ.w || orig.h >= targ.h) && orig.h && orig.w) {
              // Only display zoom out button if not a slideshow and if the
              // buttons aren't disabled.
              if (!Lightbox.disableResize && Lightbox.isSlideshow === false && !Lightbox.disableZoom) {
                $('#bottomNavZoomOut').css({'zIndex': '10500'}).show();
              }
            }
          }

          photo.style.width = (imageWidth) + 'px';
          photo.style.height = (imageHeight) + 'px';
          Lightbox.resizeContainer(imageWidth, imageHeight);

          // Clear onLoad, IE behaves irratically with animated gifs otherwise.
          imgPreloader.onload = function() {};
        };

        imgPreloader.src = Lightbox.imageArray[Lightbox.activeImage][0];
        imgPreloader.alt = Lightbox.imageArray[Lightbox.activeImage][2];
      }

      // Set up frame size, etc.
      else if (Lightbox.isLightframe) {
        $("#lightbox #imageDataContainer").addClass('lightbox2-alt-layout-data');
        var src = Lightbox.imageArray[Lightbox.activeImage][0];
        $('#frameContainer').html('<iframe id="lightboxFrame" style="display: none;" src="'+src+'"></iframe>');

        // Enable swf support in Gecko browsers.
        if ($.browser.mozilla && src.indexOf('.swf') != -1) {
          setTimeout(function () {
            document.getElementById("lightboxFrame").src = Lightbox.imageArray[Lightbox.activeImage][0];
          }, 1000);
        }

        if (!Lightbox.iframe_border) {
          $('#lightboxFrame').css({'border': 'none'});
          $('#lightboxFrame').attr('frameborder', '0');
        }
        var iframe = document.getElementById('lightboxFrame');
        var iframeStyles = Lightbox.imageArray[Lightbox.activeImage][3];
        iframe = Lightbox.setStyles(iframe, iframeStyles);
        Lightbox.resizeContainer(parseInt(iframe.width, 10), parseInt(iframe.height, 10));
      }
      else if (Lightbox.isVideo || Lightbox.isModal) {
        $("#lightbox #imageDataContainer").addClass('lightbox2-alt-layout-data');
        var container = document.getElementById('modalContainer');
        var modalStyles = Lightbox.imageArray[Lightbox.activeImage][3];
        container = Lightbox.setStyles(container, modalStyles);
        if (Lightbox.isVideo) {
          Lightbox.modalHeight =  parseInt(container.height, 10) - 10;
          Lightbox.modalWidth =  parseInt(container.width, 10) - 10;
          Lightvideo.startVideo(Lightbox.imageArray[Lightbox.activeImage][0]);
        }
        Lightbox.resizeContainer(parseInt(container.width, 10), parseInt(container.height, 10));
      }
    }
  },

  // imgNodeLoadingError()
  imgNodeLoadingError: function(image) {
    var s = Drupal.settings.lightbox2;
    var original_image = Lightbox.imageArray[Lightbox.activeImage][0];
    if (s.display_image_size !== "") {
      original_image = original_image.replace(new RegExp("."+s.display_image_size), "");
    }
    Lightbox.imageArray[Lightbox.activeImage][0] = original_image;
    image.onerror = function() { Lightbox.imgLoadingError(image); };
    image.src = original_image;
  },

  // imgLoadingError()
  imgLoadingError: function(image) {
    var s = Drupal.settings.lightbox2;
    Lightbox.imageArray[Lightbox.activeImage][0] = s.default_image;
    image.src = s.default_image;
  },

  // resizeContainer()
  resizeContainer: function(imgWidth, imgHeight) {

    imgWidth = (imgWidth < Lightbox.minWidth ? Lightbox.minWidth : imgWidth);

    this.widthCurrent = $('#outerImageContainer').width();
    this.heightCurrent = $('#outerImageContainer').height();

    var widthNew = (imgWidth  + (Lightbox.borderSize * 2));
    var heightNew = (imgHeight  + (Lightbox.borderSize * 2));

    // Scalars based on change from old to new.
    this.xScale = ( widthNew / this.widthCurrent) * 100;
    this.yScale = ( heightNew / this.heightCurrent) * 100;

    // Calculate size difference between new and old image, and resize if
    // necessary.
    wDiff = this.widthCurrent - widthNew;
    hDiff = this.heightCurrent - heightNew;

    $('#modalContainer').css({'width': imgWidth, 'height': imgHeight});
    // Detect animation sequence.
    if (Lightbox.resizeSequence) {
      var animate1 = {width: widthNew};
      var animate2 = {height: heightNew};
      if (Lightbox.resizeSequence == 2) {
        animate1 = {height: heightNew};
        animate2 = {width: widthNew};
      }
      $('#outerImageContainer').animate(animate1, Lightbox.resizeSpeed).animate(animate2, Lightbox.resizeSpeed, 'linear', function() { Lightbox.showData(); });
    }
    // Simultaneous.
    else {
      $('#outerImageContainer').animate({'width': widthNew, 'height': heightNew}, Lightbox.resizeSpeed, 'linear', function() { Lightbox.showData(); });
    }

    // If new and old image are same size and no scaling transition is necessary
    // do a quick pause to prevent image flicker.
    if ((hDiff === 0) && (wDiff === 0)) {
      if ($.browser.msie) {
        Lightbox.pause(250);
      }
      else {
        Lightbox.pause(100);
      }
    }

    var s = Drupal.settings.lightbox2;
    if (!s.use_alt_layout) {
      $('#prevLink, #nextLink').css({'height': imgHeight + 'px'});
    }
    $('#imageDataContainer').css({'width': widthNew + 'px'});
  },

  // showData()
  // Display image and begin preloading neighbors.
  showData: function() {
    $('#loading').hide();

    if (Lightbox.isLightframe || Lightbox.isVideo || Lightbox.isModal) {
      Lightbox.updateDetails();
      if (Lightbox.isLightframe) {
        $('#frameContainer').show();
        if ($.browser.safari || Lightbox.fadeInSpeed === 0) {
          $('#lightboxFrame').css({'zIndex': '10500'}).show();
        }
        else {
          $('#lightboxFrame').css({'zIndex': '10500'}).fadeIn(Lightbox.fadeInSpeed);
        }
      }
      else {
        if (Lightbox.isVideo) {
          $("#modalContainer").html(Lightbox.modalHTML).click(function(){return false;}).css('zIndex', '10500').show();
        }
        else {
          var src = unescape(Lightbox.imageArray[Lightbox.activeImage][0]);
          if (Lightbox.imageArray[Lightbox.activeImage][4]) {
            $(src).appendTo("#modalContainer");
            $('#modalContainer').css({'zIndex': '10500'}).show();
          }
          else {
            // Use a callback to show the new image, otherwise you get flicker.
            $("#modalContainer").hide().load(src, function () {$('#modalContainer').css({'zIndex': '10500'}).show();});
          }
          $('#modalContainer').unbind('click');
        }
        // This might be needed in the Lightframe section above.
        //$('#modalContainer').css({'zIndex': '10500'}).show();
      }
    }

    // Handle display of image content.
    else {
      $('#imageContainer').show();
      if ($.browser.safari || Lightbox.fadeInSpeed === 0) {
        $('#lightboxImage').css({'zIndex': '10500'}).show();
      }
      else {
        $('#lightboxImage').css({'zIndex': '10500'}).fadeIn(Lightbox.fadeInSpeed);
      }
      Lightbox.updateDetails();
      this.preloadNeighborImages();
    }
    Lightbox.inprogress = false;

    // Slideshow specific stuff.
    if (Lightbox.isSlideshow) {
      if (!Lightbox.loopSlides && Lightbox.activeImage == (Lightbox.total - 1)) {
        if (Lightbox.autoExit) {
          Lightbox.slideIdArray[Lightbox.slideIdCount++] = setTimeout(function () {Lightbox.end('slideshow');}, Lightbox.slideInterval);
        }
      }
      else {
        if (!Lightbox.isPaused && Lightbox.total > 1) {
          Lightbox.slideIdArray[Lightbox.slideIdCount++] = setTimeout(function () {Lightbox.changeData(Lightbox.activeImage + 1);}, Lightbox.slideInterval);
        }
      }
      if (Lightbox.showPlayPause && Lightbox.total > 1 && !Lightbox.isPaused) {
        $('#lightshowPause').show();
        $('#lightshowPlay').hide();
      }
      else if (Lightbox.showPlayPause && Lightbox.total > 1) {
        $('#lightshowPause').hide();
        $('#lightshowPlay').show();
      }
    }

    // Adjust the page overlay size.
    var arrayPageSize = Lightbox.getPageSize();
    var arrayPageScroll = Lightbox.getPageScroll();
    var pageHeight = arrayPageSize[1];
    if (Lightbox.isZoomedIn && arrayPageSize[1] > arrayPageSize[3]) {
      var lightboxTop = (Lightbox.topPosition == '' ? (arrayPageSize[3] / 10) : Lightbox.topPosition) * 1;
      pageHeight = pageHeight + arrayPageScroll[1] + lightboxTop;
    }
    $('#lightbox2-overlay').css({'height': pageHeight + 'px', 'width': arrayPageSize[0] + 'px'});

    // Gecko browsers (e.g. Firefox, SeaMonkey, etc) don't handle pdfs as
    // expected.
    if ($.browser.mozilla) {
      if (Lightbox.imageArray[Lightbox.activeImage][0].indexOf(".pdf") != -1) {
        setTimeout(function () {
          document.getElementById("lightboxFrame").src = Lightbox.imageArray[Lightbox.activeImage][0];
        }, 1000);
      }
    }
  },

  // updateDetails()
  // Display caption, image number, and bottom nav.
  updateDetails: function() {

    $("#imageDataContainer").hide();

    var s = Drupal.settings.lightbox2;

    if (s.show_caption) {
      var caption = Lightbox.filterXSS(Lightbox.imageArray[Lightbox.activeImage][1]);
      if (!caption) caption = '';
      $('#caption').html(caption).css({'zIndex': '10500'}).show();
    }

    // If image is part of set display 'Image x of x'.
    var numberDisplay = null;
    if (s.image_count && Lightbox.total > 1) {
      var currentImage = Lightbox.activeImage + 1;
      if (!Lightbox.isLightframe && !Lightbox.isModal && !Lightbox.isVideo) {
        numberDisplay = s.image_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total);
      }
      else if (Lightbox.isVideo) {
        numberDisplay = s.video_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total);
      }
      else {
        numberDisplay = s.page_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total);
      }
      $('#numberDisplay').html(numberDisplay).css({'zIndex': '10500'}).show();
    }
    else {
      $('#numberDisplay').hide();
    }

    $("#imageDataContainer").hide().slideDown(Lightbox.slideDownSpeed, function() {
      $("#bottomNav").show();
    });
    if (Lightbox.rtl == 1) {
      $("#bottomNav").css({'float': 'left'});
    }
    Lightbox.updateNav();
  },

  // updateNav()
  // Display appropriate previous and next hover navigation.
  updateNav: function() {

    $('#hoverNav').css({'zIndex': '10500'}).show();
    var prevLink = '#prevLink';
    var nextLink = '#nextLink';

    // Slideshow is separated as we need to show play / pause button.
    if (Lightbox.isSlideshow) {
      if ((Lightbox.total > 1 && Lightbox.loopSlides) || Lightbox.activeImage !== 0) {
        $(prevLink).css({'zIndex': '10500'}).show().click(function() {
          if (Lightbox.pauseOnPrevClick) {
            Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
          }
          Lightbox.changeData(Lightbox.activeImage - 1); return false;
        });
      }
      else {
        $(prevLink).hide();
      }

      // If not last image in set, display next image button.
      if ((Lightbox.total > 1 && Lightbox.loopSlides) || Lightbox.activeImage != (Lightbox.total - 1)) {
        $(nextLink).css({'zIndex': '10500'}).show().click(function() {
          if (Lightbox.pauseOnNextClick) {
            Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
          }
          Lightbox.changeData(Lightbox.activeImage + 1); return false;
        });
      }
      // Safari browsers need to have hide() called again.
      else {
        $(nextLink).hide();
      }
    }

    // All other types of content.
    else {

      if ((Lightbox.isLightframe || Lightbox.isModal || Lightbox.isVideo) && !Lightbox.alternative_layout) {
        $('#frameHoverNav').css({'zIndex': '10500'}).show();
        $('#hoverNav').css({'zIndex': '10500'}).hide();
        prevLink = '#framePrevLink';
        nextLink = '#frameNextLink';
      }

      // If not first image in set, display prev image button.
      if ((Lightbox.total > 1 && Lightbox.loopItems) || Lightbox.activeImage !== 0) {
        // Unbind any other click handlers, otherwise this adds a new click handler
        // each time the arrow is clicked.
        $(prevLink).css({'zIndex': '10500'}).show().unbind().click(function() {
          Lightbox.changeData(Lightbox.activeImage - 1); return false;
        });
      }
      // Safari browsers need to have hide() called again.
      else {
        $(prevLink).hide();
      }

      // If not last image in set, display next image button.
      if ((Lightbox.total > 1 && Lightbox.loopItems) || Lightbox.activeImage != (Lightbox.total - 1)) {
        // Unbind any other click handlers, otherwise this adds a new click handler
        // each time the arrow is clicked.
        $(nextLink).css({'zIndex': '10500'}).show().unbind().click(function() {
          Lightbox.changeData(Lightbox.activeImage + 1); return false;
        });
      }
      // Safari browsers need to have hide() called again.
      else {
        $(nextLink).hide();
      }
    }

    // Don't enable keyboard shortcuts so forms will work.
    if (!Lightbox.isModal) {
      this.enableKeyboardNav();
    }
  },


  // enableKeyboardNav()
  enableKeyboardNav: function() {
    $(document).bind("keydown", this.keyboardAction);
  },

  // disableKeyboardNav()
  disableKeyboardNav: function() {
    $(document).unbind("keydown", this.keyboardAction);
  },

  // keyboardAction()
  keyboardAction: function(e) {
    if (e === null) { // IE.
      keycode = event.keyCode;
      escapeKey = 27;
    }
    else { // Mozilla.
      keycode = e.keyCode;
      escapeKey = e.DOM_VK_ESCAPE;
    }

    key = String.fromCharCode(keycode).toLowerCase();

    // Close lightbox.
    if (Lightbox.checkKey(Lightbox.keysClose, key, keycode)) {
      Lightbox.end('forceClose');
    }
    // Display previous image (p, <-).
    else if (Lightbox.checkKey(Lightbox.keysPrevious, key, keycode)) {
      if ((Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) || Lightbox.activeImage !== 0) {
        Lightbox.changeData(Lightbox.activeImage - 1);
      }

    }
    // Display next image (n, ->).
    else if (Lightbox.checkKey(Lightbox.keysNext, key, keycode)) {
      if ((Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) || Lightbox.activeImage != (Lightbox.total - 1)) {
        Lightbox.changeData(Lightbox.activeImage + 1);
      }
    }
    // Zoom in.
    else if (Lightbox.checkKey(Lightbox.keysZoom, key, keycode) && !Lightbox.disableResize && !Lightbox.disableZoom && !Lightbox.isSlideshow && !Lightbox.isLightframe) {
      if (Lightbox.isZoomedIn) {
        Lightbox.changeData(Lightbox.activeImage, false);
      }
      else if (!Lightbox.isZoomedIn) {
        Lightbox.changeData(Lightbox.activeImage, true);
      }
      return false;
    }
    // Toggle play / pause (space).
    else if (Lightbox.checkKey(Lightbox.keysPlayPause, key, keycode) && Lightbox.isSlideshow) {

      if (Lightbox.isPaused) {
        Lightbox.togglePlayPause("lightshowPlay", "lightshowPause");
      }
      else {
        Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
      }
      return false;
    }
  },

  preloadNeighborImages: function() {

    if ((Lightbox.total - 1) > Lightbox.activeImage) {
      preloadNextImage = new Image();
      preloadNextImage.src = Lightbox.imageArray[Lightbox.activeImage + 1][0];
    }
    if (Lightbox.activeImage > 0) {
      preloadPrevImage = new Image();
      preloadPrevImage.src = Lightbox.imageArray[Lightbox.activeImage - 1][0];
    }

  },

  end: function(caller) {
    var closeClick = (caller == 'slideshow' ? false : true);
    if (Lightbox.isSlideshow && Lightbox.isPaused && !closeClick) {
      return;
    }
    // To prevent double clicks on navigation links.
    if (Lightbox.inprogress === true && caller != 'forceClose') {
      return;
    }
    Lightbox.disableKeyboardNav();
    $('#lightbox').hide();
    $("#lightbox2-overlay").fadeOut();
    Lightbox.isPaused = true;
    Lightbox.inprogress = false;
    // Replaces calls to showSelectBoxes() and showFlash() in original
    // lightbox2.
    Lightbox.toggleSelectsFlash('visible');
    if (Lightbox.isSlideshow) {
      for (var i = 0; i < Lightbox.slideIdCount; i++) {
        window.clearTimeout(Lightbox.slideIdArray[i]);
      }
      $('#lightshowPause, #lightshowPlay').hide();
    }
    else if (Lightbox.isLightframe) {
      $('#frameContainer').empty().hide();
    }
    else if (Lightbox.isVideo || Lightbox.isModal) {
      if (!Lightbox.auto_modal) {
        $('#modalContainer').hide().html("");
      }
      Lightbox.auto_modal = false;
    }
  },


  // getPageScroll()
  // Returns array with x,y page scroll values.
  // Core code from - quirksmode.com.
  getPageScroll : function() {

    var xScroll, yScroll;

    if (self.pageYOffset || self.pageXOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    }
    else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {  // Explorer 6 Strict.
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    }
    else if (document.body) {// All other Explorers.
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }

    arrayPageScroll = [xScroll,yScroll];
    return arrayPageScroll;
  },

  // getPageSize()
  // Returns array with page width, height and window width, height.
  // Core code from - quirksmode.com.
  // Edit for Firefox by pHaez.

  getPageSize : function() {

    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
      xScroll = window.innerWidth + window.scrollMaxX;
      yScroll = window.innerHeight + window.scrollMaxY;
    }
    else if (document.body.scrollHeight > document.body.offsetHeight) { // All but Explorer Mac.
      xScroll = document.body.scrollWidth;
      yScroll = document.body.scrollHeight;
    }
    else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari.
      xScroll = document.body.offsetWidth;
      yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;

    if (self.innerHeight) { // All except Explorer.
      if (document.documentElement.clientWidth) {
        windowWidth = document.documentElement.clientWidth;
      }
      else {
        windowWidth = self.innerWidth;
      }
      windowHeight = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode.
      windowWidth = document.documentElement.clientWidth;
      windowHeight = document.documentElement.clientHeight;
    }
    else if (document.body) { // Other Explorers.
      windowWidth = document.body.clientWidth;
      windowHeight = document.body.clientHeight;
    }
    // For small pages with total height less than height of the viewport.
    if (yScroll < windowHeight) {
      pageHeight = windowHeight;
    }
    else {
      pageHeight = yScroll;
    }
    // For small pages with total width less than width of the viewport.
    if (xScroll < windowWidth) {
      pageWidth = xScroll;
    }
    else {
      pageWidth = windowWidth;
    }
    arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
    return arrayPageSize;
  },


  // pause(numberMillis)
  pause : function(ms) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < ms);
  },


  // toggleSelectsFlash()
  // Hide / unhide select lists and flash objects as they appear above the
  // lightbox in some browsers.
  toggleSelectsFlash: function (state) {
    if (state == 'visible') {
      $("select.lightbox_hidden, embed.lightbox_hidden, object.lightbox_hidden").show();
    }
    else if (state == 'hide') {
      $("select:visible, embed:visible, object:visible").not('#lightboxAutoModal select, #lightboxAutoModal embed, #lightboxAutoModal object').addClass("lightbox_hidden");
      $("select.lightbox_hidden, embed.lightbox_hidden, object.lightbox_hidden").hide();
    }
  },


  // parseRel()
  parseRel: function (link) {
    var parts = [];
    parts["rel"] = parts["title"] = parts["group"] = parts["style"] = parts["flashvars"] = null;
    if (!$(link).attr('rel')) return parts;
    parts["rel"] = $(link).attr('rel').match(/\w+/)[0];

    if ($(link).attr('rel').match(/\[(.*)\]/)) {
      var info = $(link).attr('rel').match(/\[(.*?)\]/)[1].split('|');
      parts["group"] = info[0];
      parts["style"] = info[1];
      if (parts["style"] != undefined && parts["style"].match(/flashvars:\s?(.*?);/)) {
        parts["flashvars"] = parts["style"].match(/flashvars:\s?(.*?);/)[1];
      }
    }
    if ($(link).attr('rel').match(/\[.*\]\[(.*)\]/)) {
      parts["title"] = $(link).attr('rel').match(/\[.*\]\[(.*)\]/)[1];
    }
    return parts;
  },

  // setStyles()
  setStyles: function(item, styles) {
    item.width = Lightbox.iframe_width;
    item.height = Lightbox.iframe_height;
    item.scrolling = "auto";

    if (!styles) return item;
    var stylesArray = styles.split(';');
    for (var i = 0; i< stylesArray.length; i++) {
      if (stylesArray[i].indexOf('width:') >= 0) {
        var w = stylesArray[i].replace('width:', '');
        item.width = jQuery.trim(w);
      }
      else if (stylesArray[i].indexOf('height:') >= 0) {
        var h = stylesArray[i].replace('height:', '');
        item.height = jQuery.trim(h);
      }
      else if (stylesArray[i].indexOf('scrolling:') >= 0) {
        var scrolling = stylesArray[i].replace('scrolling:', '');
        item.scrolling = jQuery.trim(scrolling);
      }
      else if (stylesArray[i].indexOf('overflow:') >= 0) {
        var overflow = stylesArray[i].replace('overflow:', '');
        item.overflow = jQuery.trim(overflow);
      }
    }
    return item;
  },


  // togglePlayPause()
  // Hide the pause / play button as appropriate.  If pausing the slideshow also
  // clear the timers, otherwise move onto the next image.
  togglePlayPause: function(hideId, showId) {
    if (Lightbox.isSlideshow && hideId == "lightshowPause") {
      for (var i = 0; i < Lightbox.slideIdCount; i++) {
        window.clearTimeout(Lightbox.slideIdArray[i]);
      }
    }
    $('#' + hideId).hide();
    $('#' + showId).show();

    if (hideId == "lightshowPlay") {
      Lightbox.isPaused = false;
      if (!Lightbox.loopSlides && Lightbox.activeImage == (Lightbox.total - 1)) {
        Lightbox.end();
      }
      else if (Lightbox.total > 1) {
        Lightbox.changeData(Lightbox.activeImage + 1);
      }
    }
    else {
      Lightbox.isPaused = true;
    }
  },

  triggerLightbox: function (rel_type, rel_group) {
    if (rel_type.length) {
      if (rel_group && rel_group.length) {
        $("a[rel^='" + rel_type +"\[" + rel_group + "\]'], area[rel^='" + rel_type +"\[" + rel_group + "\]']").eq(0).trigger("click");
      }
      else {
        $("a[rel^='" + rel_type +"'], area[rel^='" + rel_type +"']").eq(0).trigger("click");
      }
    }
  },

  detectMacFF2: function() {
    var ua = navigator.userAgent.toLowerCase();
    if (/firefox[\/\s](\d+\.\d+)/.test(ua)) {
      var ffversion = new Number(RegExp.$1);
      if (ffversion < 3 && ua.indexOf('mac') != -1) {
        return true;
      }
    }
    return false;
  },

  checkKey: function(keys, key, code) {
    return (jQuery.inArray(key, keys) != -1 || jQuery.inArray(String(code), keys) != -1);
  },

  filterXSS: function(str, allowed_tags) {
    var output = "";
    $.ajax({
      url: Drupal.settings.basePath + 'system/lightbox2/filter-xss',
      data: {
        'string' : str,
        'allowed_tags' : allowed_tags
      },
      type: "POST",
      async: false,
      dataType:  "json",
      success: function(data) {
        output = data;
      }
    });
    return output;
  }

};

// Initialize the lightbox.
Drupal.behaviors.initLightbox = function (context) {
  $('body:not(.lightbox-processed)', context).addClass('lightbox-processed').each(function() {
    Lightbox.initialize();
    return false; // Break the each loop.
  });

  // Attach lightbox to any links with lightbox rels.
  Lightbox.initList(context);
  $('#lightboxAutoModal', context).triggerHandler('click');
};

;

/**
 * Create a DART object to handle tagging functionality
 */
Drupal.DART = {};

/**
 * Using document.write, add a DART tag to the page
 */
Drupal.DART.tag = function(tag) {
  tag = typeof(tag) == 'string' ? eval('(' + tag + ')') : tag;

  var tagname = tag.settings.options.method == 'adj' ? 'script' : 'iframe';
  var options = tag.settings.options.method == 'adj' ? 'type="text/javascript"' : 'frameborder="0" scrolling="no" width="' + tag.sz.split("x")[0] + '" height="' + tag.sz.split("x")[1] + '"';;

  ad  = '<' + tagname + ' ' + options + ' src="';
  ad += dart_url + "/" + tag.settings.options.method + "/";
  ad += tag.site + "/" + tag.zone + ";";
  ad += this.keyVals(tag.key_vals);

  // Allow other modules to include js that can manipulate each key|val.
//  ad += $(document).triggerHandler('dart_tag_render', [ad]);

  ad += '"></' + tagname + '>';
  document.write(ad);
  // console.log('-----------------'+tag.pos+'------------------');
  // console.log(tag);
}

/**
 * Format a key|val pair into a dart tag key|val pair.
 */
Drupal.DART.keyVal = function(key, val, useEval) {
  kvp  = key + "=";
  kvp += useEval ? eval(val) : val;
  kvp += key == "ord" ? "?" : ";";
  return(kvp);
}

/**
 * Loop through an object and create kay|val pairs.
 * 
 * @param vals
 *   an object in this form:
 *   {
 *     key1 : {{val:'foo', eval:true}, {val:'foo2', eval:false}}
 *     key2 : {{val:'bar', eval:false}},
 *     key3 : {{val:'foobar', eval:true}}
 *   }
 */
Drupal.DART.keyVals = function(vals) {
  var ad = '';
  for(var key in vals) {
    value = vals[key];
    for(var val in value) {
      v = value[val];
      ad += this.keyVal(key, v['val'], v['eval']);
    }
  }
  return ad;
}
;
/* jQuery Carousel 0.9.8
Copyright 2010 Thomas Lanciaux and Pierre Bertet.
This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/
(function(g){g.fn.carousel=function(q){var q=g.extend({direction:"horizontal",loop:false,dispItems:1,pagination:false,paginationPosition:"inside",nextBtn:'<input type="button" value="Next" />',prevBtn:'<input type="button" value="Previous" />',btnsPosition:"inside",nextBtnInsert:"insertAfter",prevBtnInsert:"insertBefore",nextBtnInsertFn:false,prevBtnInsertFn:false,autoSlide:false,autoSlideInterval:3000,delayAutoSlide:false,combinedClasses:false,effect:"slide",slideEasing:"swing",animSpeed:300,equalWidths:"true",verticalMargin:0,callback:function(){},useAddress:false,adressIdentifier:"carousel",tabLabel:function(r){return r},showEmptyItems:true,ajaxMode:false,ajaxUrl:"",stopSlideBtn:false,stopSlideTextPause:"Pause",stopSlideTextPlay:"Play"},q);if(q.btnsPosition=="outside"){q.prevBtnInsert="insertBefore";q.nextBtnInsert="insertAfter"}q.delayAutoSlide=0+q.delayAutoSlide;return this.each(function(){var r={$elts:{},params:q,launchOnLoad:[]};r.$elts.carousel=g(this).addClass("js");r.$elts.content=g(this).children().css({position:"absolute",top:0});r.$elts.wrap=r.$elts.content.wrap('<div class="carousel-wrap"></div>').parent().css({overflow:"hidden",position:"relative"});r.steps={first:0,count:r.$elts.content.children().length};r.$elts.loader=g('<div class="loader"></div>').css({position:"absolute"});r.steps.last=r.steps.count-1;if(r.params.pagination){o(r)}if(g.isFunction(r.params.prevBtnInsertFn)){r.$elts.prevBtn=r.params.prevBtnInsertFn(r.$elts)}else{if(q.btnsPosition=="outside"){r.$elts.prevBtn=g(q.prevBtn)[q.prevBtnInsert](r.$elts.carousel)}else{r.$elts.prevBtn=g(q.prevBtn)[q.prevBtnInsert](r.$elts.wrap)}}if(g.isFunction(r.params.nextBtnInsertFn)){r.$elts.nextBtn=r.params.nextBtnInsertFn(r.$elts)}else{if(q.btnsPosition=="outside"){r.$elts.nextBtn=g(q.nextBtn)[q.nextBtnInsert](r.$elts.carousel)}else{r.$elts.nextBtn=g(q.nextBtn)[q.nextBtnInsert](r.$elts.wrap)}}r.$elts.nextBtn.addClass("carousel-control next carousel-next");r.$elts.prevBtn.addClass("carousel-control previous carousel-previous");r.lastItemsToLoad;d(r);r.$elts.carousel.attr("tabindex",0).add(r.$elts.carousel.children()).bind({focus:function(s){g(document).bind("keypress",function(t){switch(t.keyCode){case 39:r.$elts.nextBtn.click();break;case 37:r.$elts.prevBtn.click();break}switch(t.charCode){case 110:r.$elts.nextBtn.click();break;case 112:r.$elts.prevBtn.click();break}})},blur:function(){g(document).unbind("keypress")}});n(r);g(function(){c(r);g.each(r.launchOnLoad,function(s,t){t()});if(r.params.autoSlide){f(r)}if(q.stopSlideBtn==true){r.$elts.stopSlideBtn=g('<button type="button" class="slide-control play">'+q.stopSlideTextPause+"</button>");a(r)}})})};function c(s){var t=s.$elts.content.children();var r=0;t.each(function(){$item=g(this);$itemHeight=$item.outerHeight();if($itemHeight>r){r=$itemHeight}});if(s.params.verticalMargin>0){r=r+s.params.verticalMargin}t.height(r);var q=s.$elts.content.children(":first");s.itemWidth=q.outerWidth();if(s.params.direction=="vertical"){s.contentWidth=s.itemWidth}else{if(s.params.equalWidths){s.contentWidth=s.itemWidth*s.steps.count}else{s.contentWidth=(function(){var u=0;s.$elts.content.children().each(function(){u+=g(this).outerWidth()});return u})()}}s.$elts.content.width(s.contentWidth);s.itemHeight=r;if(s.params.direction=="vertical"){s.$elts.content.css({height:s.itemHeight*s.steps.count+"px"});s.$elts.content.parent().css({height:s.itemHeight*s.params.dispItems+"px"})}else{s.$elts.content.parent().css({height:s.itemHeight+"px"})}i(s)}function d(q){q.$elts.nextBtn.add(q.$elts.prevBtn).bind("enable",function(){var r=g(this).unbind("click").bind("click",function(){if(q.params.ajaxMode&&r.is(".next")&&b(q)==(p(q)-1)&&!q.lastItemsToLoad){h(q);q.$elts.content.ajaxSuccess(function(){})}else{e(q,j(q,(r.is(".next")?"next":"prev")));if(q.params.stopSlideBtn==true){q.$elts.stopSlideBtn.trigger("pause")}else{m(q)}}}).removeClass("disabled").removeAttr("disabled");if(q.params.combinedClasses){r.removeClass("next-disabled previous-disabled").removeAttr("disabled")}}).bind("disable",function(){var r=g(this).unbind("click").addClass("disabled").attr("disabled","disabled");if(q.params.combinedClasses){if(r.is(".next")){r.addClass("next-disabled")}else{if(r.is(".previous")){r.addClass("previous-disabled")}}}}).hover(function(){g(this).toggleClass("hover")})}function o(q){q.$elts.pagination=g('<div class="center-wrap"><div class="carousel-pagination"><p></p></div></div>')[((q.params.paginationPosition=="outside")?"insertAfter":"appendTo")](q.$elts.carousel).find("p");q.$elts.paginationBtns=g([]);q.$elts.content.find("li").each(function(r){if(r%q.params.dispItems==0){k(q,r)}})}function k(r,q){if(r.params.pagination){r.$elts.paginationBtns=r.$elts.paginationBtns.add(g('<a role="button"><span>'+r.params.tabLabel(r.$elts.paginationBtns.length+1)+"</span></a>").data("firstStep",q)).appendTo(r.$elts.pagination);r.$elts.paginationBtns.slice(0,1).addClass("active");r.$elts.paginationBtns.click(function(s){e(r,g(this).data("firstStep"));if(r.params.stopSlideBtn==true){r.$elts.stopSlideBtn.trigger("pause")}else{m(r)}})}}function n(q){if(q.params.useAddress&&g.isFunction(g.fn.address)){g.address.init(function(s){var r=g.address.pathNames();if(r[0]===q.params.adressIdentifier&&!!r[1]){e(q,r[1]-1)}else{g.address.value("/"+q.params.adressIdentifier+"/1")}}).change(function(s){var r=g.address.pathNames();if(r[0]===q.params.adressIdentifier&&!!r[1]){e(q,r[1]-1)}})}else{q.params.useAddress=false}}function e(q,r){q.params.callback(r);l(q,r);q.steps.first=r;i(q);if(q.params.useAddress){g.address.value("/"+q.params.adressIdentifier+"/"+(r+1))}}function j(r,q){if(q=="prev"){if(!r.params.showEmptyItems){if(r.steps.first==0){return((r.params.loop)?(r.steps.count-r.params.dispItems):false)}else{return Math.max(0,r.steps.first-r.params.dispItems)}}else{if((r.steps.first-r.params.dispItems)>=0){return r.steps.first-r.params.dispItems}else{return((r.params.loop)?(r.steps.count-r.params.dispItems):false)}}}else{if(q=="next"){if((r.steps.first+r.params.dispItems)<r.steps.count){if(!r.params.showEmptyItems){return Math.min(r.steps.first+r.params.dispItems,r.steps.count-r.params.dispItems)}else{return r.steps.first+r.params.dispItems}}else{return((r.params.loop)?0:false)}}}}function l(q,r){switch(q.params.effect){case"no":if(q.params.direction=="vertical"){q.$elts.content.css("top",-(q.itemHeight*r)+"px")}else{q.$elts.content.css("left",-(q.itemWidth*r)+"px")}break;case"fade":if(q.params.direction=="vertical"){q.$elts.content.hide().css("top",-(q.itemHeight*r)+"px").fadeIn(q.params.animSpeed)}else{q.$elts.content.hide().css("left",-(q.itemWidth*r)+"px").fadeIn(q.params.animSpeed)}break;default:if(q.params.direction=="vertical"){q.$elts.content.stop().animate({top:-(q.itemHeight*r)+"px"},q.params.animSpeed,q.params.slideEasing)}else{q.$elts.content.stop().animate({left:-(q.itemWidth*r)+"px"},q.params.animSpeed,q.params.slideEasing)}break}}function i(q){if(j(q,"prev")!==false){q.$elts.prevBtn.trigger("enable")}else{q.$elts.prevBtn.trigger("disable")}if(j(q,"next")!==false){q.$elts.nextBtn.trigger("enable")}else{q.$elts.nextBtn.trigger("disable")}if(q.params.pagination){q.$elts.paginationBtns.removeClass("active").filter(function(){return(g(this).data("firstStep")==q.steps.first)}).addClass("active")}}function f(q){q.delayAutoSlide=window.setTimeout(function(){q.autoSlideInterval=window.setInterval(function(){e(q,j(q,"next"))},q.params.autoSlideInterval)},q.params.delayAutoSlide)}function m(q){window.clearTimeout(q.delayAutoSlide);window.clearInterval(q.autoSlideInterval);q.params.delayAutoSlide=0}function a(r){var q=r.$elts.stopSlideBtn;q.bind({play:function(){f(r);q.removeClass("pause").addClass("play").html(r.params.stopSlideTextPause)},pause:function(){m(r);q.removeClass("play").addClass("pause").html(r.params.stopSlideTextPlay)}});q.click(function(s){if(q.is(".play")){q.trigger("pause")}else{if(q.is(".pause")){q.trigger("play")}}});q.prependTo(r.$elts.wrap)}function p(q){return q.$elts.pagination.children().length}function b(q){return q.steps.first/q.params.dispItems}function h(q){q.$elts.carousel.prepend(q.$elts.loader);g.ajax({url:q.params.ajaxUrl,dataType:"json",success:function(r){q.lastItemsToLoad=r.bLastItemsToLoad;g(q.$elts.content).append(r.shtml);q.steps={first:q.steps.first+q.params.dispItems,count:q.$elts.content.children().length};q.steps.last=q.steps.count-1;c(q);k(q,q.steps.first);e(q,q.steps.first);if(q.params.stopSlideBtn==true){q.$elts.stopSlideBtn.trigger("pause")}else{m(q)}q.$elts.loader.remove()}})}})(jQuery);;

var APIModules={};APIModules.EXPERIENCE="experience";APIModules.CONTENT="content";APIModules.VIDEO_PLAYER="videoPlayer";APIModules.SOCIAL="social";APIModules.SEARCH="search";APIModules.CUE_POINTS="cuePoints";APIModules.ADVERTISING="advertising";APIModules.MENU="menu";APIModules.EFFECTS="effects";APIModules.CONVIVA="conviva";APIModules.CAPTIONS="captions";APIModules.HTML5="_html5";if(brightcove==undefined){var brightcove={playerType:{FLASH:"flash",HTML:"html",INSTALLER:"installer",NO_SUPPORT:"nosupport"}};}
brightcove.instances={};brightcove.modules={};brightcove.ID_DELIM="|||";var bcPlayer=brightcove;brightcove.getExperience=function(pExperience){if(this.instances[pExperience]==null){if(window.console){console.log("Experience '"+pExperience+"' not found. Please ensure the name is correct and the API for the player is enabled.");}}
return this.instances[pExperience];};brightcove.getPlayer=brightcove.getExperience;brightcove.stringify=function(pObject){var type=typeof pObject;if(type=="function"||pObject==undefined){return"\"\"";}else if(type=="string"){return"\""+pObject.replace(/"/g,"\\\"")+"\"";}else if(pObject instanceof Array){var json="[";for(var i in pObject){if(typeof pObject[i]=="function"){json+=("\"\",");}else{json+=(this.stringify(pObject[i])+",");}}
if(json.substr(-1)==","){json=json.substr(0,json.length-1);}
return json+"]";}else if(type=="object"){var json="{";var i;var props=pObject.enumerableProperties;if(props){for(i in props){json+=("\""+props[i]+"\":"+this.stringify(pObject[props[i]])+",");}}else{for(i in pObject){if(typeof pObject[i]!="function"&&i!="__proto__"){json+=("\""+i+"\":"+this.stringify(pObject[i])+",");}}}
if(json.substr(-1)==","){json=json.substr(0,json.length-1);}
return json+"}";}else{return pObject;}}
function setAPICallback(pID,pCallback,pURL){brightcove.instances[pID]=new BrightcoveExperience(pCallback,pID,pURL);}
function BrightcoveExperience(pCallback,pID,pURL){if(pCallback==null){this.type=brightcove.playerType.HTML;this.playerURL=pURL;this.callback=brightcove.experiences[pID].contentWindow;}else{this.type=brightcove.playerType.FLASH;this.callback=pCallback;}
this.modules={};}
BrightcoveExperience.prototype.getModule=function(pModule){if(this.type==brightcove.playerType.HTML){pModule+=APIModules.HTML5;}
if(this.modules[pModule]==null&&brightcove.modules[pModule]){var module=new brightcove.modules[pModule](this);module.playerURL=this.playerURL;if(module.isPlayerDefined!=null){if(!module.isPlayerDefined()){return null;}}
this.modules[pModule]=module;}
return this.modules[pModule];};function APIModule(){this.handlers=[];}
APIModule.handlerCount=0;APIModule.getHandler=function(){return"bc_handler"+(APIModule.handlerCount++);};APIModule.callFlash=function(pCallback,pParams){var pCallbackArray=pCallback.split(brightcove.ID_DELIM);if(pCallbackArray.length<2)return;if(pCallbackArray[0].length<1)return;var pFlashId=pCallbackArray[0];var pCallback=pCallbackArray[1];var pExperience=document.getElementById(pFlashId);if(pExperience[pCallback]!=null){return pExperience[pCallback](BCXML.convertToXML(pParams,"js2flash"));}};APIModule.prototype.name="APIModule";APIModule.prototype.addEventListener=function(pEvent,pHandler,pPriority){var pNewHandler=APIModule.getHandler();this.handlers.push({handler:pHandler,bcHandler:pNewHandler,event:pEvent});window[pNewHandler]=pHandler;return this.callMethod("addEventListener",[pEvent,pNewHandler,pPriority]);};APIModule.prototype.removeEventListener=function(pEvent,pHandler){var pNum=this.handlers.length;for(var i=0;i<pNum;i++){if(this.handlers[i].event==pEvent&&this.handlers[i].handler==pHandler){var pBCHandler=this.handlers[i].bcHandler;this.handlers.splice(i,1);break;}}
if(pBCHandler==undefined)return;return this.callMethod("removeEventListener",[pEvent,pBCHandler]);};APIModule.prototype.callPlayer=function(pCallback,pParams){if(this.playerURL!=undefined){return this.callHTML5(pParams);}else{return APIModule.callFlash(pCallback,pParams);}};APIModule.prototype.callMethod=function(pMethod,pArguments){var pArgs=[];for(var i=0;i<pArguments.length;i++)pArgs.push(pArguments[i]);return this.callPlayer(this.callback,{module:this.name,method:pMethod,params:pArgs});};APIModule.prototype.callHTML5=function(pParams){if(!this.callback.postMessage){return null;}
var json;if(window.JSON){json=window.JSON.stringify(pParams);}else{json=brightcove.stringify(pParams);}
if(json){this.callback.postMessage(json,this.playerURL);}
return null;};var BCXML={};BCXML.convertToXML=function(pObj,pNodeName){if(pObj instanceof Function)return"";var pType=BCXML.getType(pObj);var pXML="<"+pType.name+pNodeName+">";if(pType.name=="obj"){for(var i in pObj){pXML+=BCXML.convertToXML(pObj[i],i);}}else if(pType.name=="arr"){for(var j=0;j<pObj.length;j++){pXML+=BCXML.convertToXML(pObj[j],j);}}else if(pType.name=="str"){pObj=BCXML.replaceEntities(pObj);pXML+=pObj;}else{pXML+=pObj;}
pXML+="</"+pType.name+pNodeName+">";return pXML;};BCXML.replaceEntities=function(pObj){pObj=pObj.replace(new RegExp("&","g"),"&amp;");pObj=pObj.replace(new RegExp("<","g"),"&lt;");pObj=pObj.replace(new RegExp(">","g"),"&gt;");return pObj;};BCXML.getType=function(pObj){switch(typeof(pObj)){case"boolean":return{name:"boo",type:Boolean};case"string":return{name:"str",type:String};case"number":return{name:"num",type:Number};default:if(pObj instanceof Array){return{name:"arr",type:Array};}else{return{name:"obj",type:Object};}}};BCAdvertisingEvent={}
BCAdvertisingEvent.AD_COMPLETE="adComplete";BCAdvertisingEvent.AD_POSTROLLS_COMPLETE="adPostRollsComplete";BCAdvertisingEvent.AD_PAUSE="adPause";BCAdvertisingEvent.AD_PROGRESS="adProgress";BCAdvertisingEvent.AD_RESUME="adResume";BCAdvertisingEvent.AD_RECEIVED="adReceived";BCAdvertisingEvent.AD_START="adStart";BCAdvertisingEvent.AD_CLICK="adClick";BCAdvertisingEvent.EXTERNAL_AD="externalAd";BCAdvertisingEvent.AD_RULES_READY="adRulesReady";brightcove.modules[APIModules.ADVERTISING]=AdvertisingAPI;function AdvertisingAPI(pExperience){this.experience=pExperience;this.callback=pExperience.callback;this.name=APIModules.ADVERTISING;}
var pttp=AdvertisingAPI.prototype=new APIModule();pttp.showAd=function(){return this.callMethod("showAd",arguments);};pttp.resumeAfterExternalAd=function(){return this.callMethod("resumeAfterExternalAd",arguments);};pttp.getEnabledAdFormats=function(){return this.callMethod("getEnabledAdFormats",arguments);};pttp.enableAdFormats=function(){return this.callMethod("enableAdFormats",arguments);};pttp.enableExternalAds=function(){return this.callMethod("enableExternalAds",arguments);};pttp.enableOverrideAds=function(){return this.callMethod("enableOverrideAds",arguments);};pttp.getExternalAdsEnabled=function(){return this.callMethod("getExternalAdsEnabled",arguments);};pttp.getOverrideAdsEnabled=function(){return this.callMethod("getOverrideAdsEnabled",arguments);};pttp.disableForExternalAd=function(){return this.callMethod("disableForExternalAd",arguments);};pttp.getCurrentAdProperties=function(){return this.callMethod("getCurrentAdProperties",arguments);};pttp.showSponsorMessage=function(){return this.callMethod("showSponsorMessage",arguments);};pttp.getShowSponsorMessage=function(){return this.callMethod("getShowSponsorMessage",arguments);};pttp.allowThirdPartyControl=function(){return this.callMethod("allowThirdPartyControl",arguments);};pttp.setThirdPartyTime=function(){return this.callMethod("setThirdPartyTime",arguments);};pttp.getThirdPartyTime=function(){return this.callMethod("getThirdPartyTime",arguments);};pttp.getAdPolicy=function(){return this.callMethod("getAdPolicy",arguments);};pttp.setAdPolicy=function(){return this.callMethod("setAdPolicy",arguments);};pttp.setAdRules=function(){return this.callMethod("setAdRules",arguments);};pttp.getCurrentAdRules=function(){return this.callMethod("getCurrentAdRules",arguments);};pttp.setAdTranslator=function(){return this.callMethod("setAdTranslator",arguments);};pttp.getCurrentAdTranslator=function(){return this.callMethod("getCurrentAdTranslator",arguments);};pttp.requestAd=function(){return this.callMethod("requestAd",arguments);};pttp.getStayInFullScreen=function(){return this.callMethod("getStayInFullScreen",arguments);};pttp.setStayInFullScreen=function(){return this.callMethod("setStayInFullScreen",arguments);};pttp.stopAd=function(){return this.callMethod("stopAd",arguments);};pttp.DEFAULT_AD_TRANSLATOR="defaultAdTranslator";BCCaptionsEvent={}
BCCaptionsEvent.DFXP_LOAD_SUCCESS="dfxpLoadSuccess";BCCaptionsEvent.DFXP_LOAD_ERROR="dfxpLoadError";brightcove.modules[APIModules.CAPTIONS]=CaptionsAPI;function CaptionsAPI(pExperience){this.experience=pExperience;this.callback=pExperience.callback;this.name=APIModules.CAPTIONS;}
var pttp=CaptionsAPI.prototype=new APIModule();pttp.loadDFXP=function(){return this.callMethod("loadDFXP",arguments);};pttp.setLanguage=function(){return this.callMethod("setLanguage",arguments);};pttp.getLanguages=function(){return this.callMethod("getLanguages",arguments);};BCContentEvent={}
BCContentEvent.VIDEO_LOAD="videoLoad";BCContentEvent.PLAYLIST_LOAD="playlistLoad";BCContentEvent.MEDIA_LOAD="mediaLoad";BCContentEvent.MEDIA_COLLECTION_LOAD="mediaCollectionLoad";brightcove.modules[APIModules.CONTENT]=ContentAPI;function ContentAPI(pExperience){this.experience=pExperience;if(pExperience){this.callback=pExperience.callback;}
this.name=APIModules.CONTENT;}
var pttp=ContentAPI.prototype=new APIModule();pttp.getAllMediaCollections=function(){return this.callMethod("getAllMediaCollections",arguments);};pttp.getAllMediaCollectionIDs=function(){return this.callMethod("getAllMediaCollectionIDs",arguments);};pttp.getAllPlaylists=function(){return this.callMethod("getAllPlaylists",arguments);};pttp.getAllPlaylistIDs=function(){return this.callMethod("getAllPlaylistIDs",arguments);};pttp.getMediaCollection=function(){return this.callMethod("getMediaCollection",arguments);};pttp.getMediaCollectionAsynch=function(){return this.callMethod("getMediaCollectionAsynch",arguments);};pttp.getPlaylist=function(){return this.callMethod("getPlaylist",arguments);};pttp.getPlaylistAsynch=function(){return this.callMethod("getPlaylistAsynch",arguments);};pttp.getMedia=function(){return this.callMethod("getMedia",arguments);};pttp.getMediaAsynch=function(){return this.callMethod("getMediaAsynch",arguments);};pttp.getVideo=function(){return this.callMethod("getVideo",arguments);};pttp.getVideoAsynch=function(){return this.callMethod("getVideoAsynch",arguments);};pttp.purgeAllContent=function(){return this.callMethod("purgeAllContent",arguments);};pttp.purgeMediaCollections=function(){return this.callMethod("purgeMediaCollections",arguments);};pttp.purgeMedia=function(){return this.callMethod("purgeMedia",arguments);};pttp.purgePlaylist=function(){return this.callMethod("purgePlaylist",arguments);};pttp.purgePlaylists=function(){return this.callMethod("purgePlaylists",arguments);};pttp.purgeVideo=function(){return this.callMethod("purgeVideo",arguments);};pttp.purgeVideos=function(){return this.callMethod("purgeVideos",arguments);};pttp.getMediaInGroupAsynch=function(){return this.callMethod("getMediaInGroupAsynch",arguments);};pttp.createRuntimeMediaCollection=function(){return this.callMethod("createRuntimeMediaCollection",arguments);};pttp.updateMedia=function(){return this.callMethod("updateMedia",arguments);};pttp.appendArgsToMediaRequest=function(){return this.callMethod("appendArgsToMediaRequest",arguments);};brightcove.modules[APIModules.CONTENT+APIModules.HTML5]=ContentAPI_html5;function ContentAPI_html5(pExperience){this.experience=pExperience;if(pExperience){this.callback=pExperience.callback;this.playerURL=pExperience.playerURL;}
this.name=APIModules.CONTENT;}
var pttp=ContentAPI_html5.prototype=new ContentAPI();brightcove.modules[APIModules.CONVIVA]=ConvivaAPI;function ConvivaAPI(pExperience){this.experience=pExperience;this.callback=pExperience.callback;this.name=APIModules.CONVIVA;}
var pttp=ConvivaAPI.prototype=new APIModule();pttp.sendEvent=function(){return this.callMethod("sendEvent",arguments);};BCCuePointEvent={}
BCCuePointEvent.CUE="cuePoint";brightcove.modules[APIModules.CUE_POINTS]=CuePointsAPI;function CuePointsAPI(pExperience){this.experience=pExperience;this.callback=pExperience.callback;this.name=APIModules.CUE_POINTS;}
var pttp=CuePointsAPI.prototype=new APIModule();pttp.addCuePoints=function(){return this.callMethod("addCuePoints",arguments);};pttp.clearCodeCuePoints=function(){return this.callMethod("clearCodeCuePoints",arguments);};pttp.removeCodeCuePointsAtTime=function(){return this.callMethod("removeCodeCuePointsAtTime",arguments);};pttp.getCuePoints=function(){return this.callMethod("getCuePoints",arguments);};pttp.clearAdCuePoints=function(){return this.callMethod("clearAdCuePoints",arguments);};pttp.removeAdCuePointsAtTime=function(){return this.callMethod("removeAdCuePointsAtTime",arguments);};BCEffectsEvent={};BCEffectsEvent.BEGIN="animationBegin";BCEffectsEvent.COMPLETE="animationComplete";BCEffectsEvent.CHANGE="animationChange";brightcove.modules[APIModules.EFFECTS]=EffectsAPI;function EffectsAPI(pExperience){this.experience=pExperience;this.callback=pExperience.callback;this.name=APIModules.EFFECTS;}
EffectsAPI.animations={};var pttp=EffectsAPI.prototype=new APIModule();pttp.createAnimation=function(){var pID=this.callMethod("createAnimationJS",arguments);return this.getAnimation(pID);};pttp.getAnimation=function(){var pID=this.callMethod("getAnimationJS",arguments);if(pID){return this.getAnimationWrapper(pID);}
return null;};pttp.getAnimationWrapper=function(pID){var pAnimation=EffectsAPI.animations[pID];if(pAnimation==undefined){pAnimation=new EffectsAPIAnimation(pID,this.callback);EffectsAPI.animations[pID]=pAnimation;}
return pAnimation;};function EffectsAPIAnimation(pID,pCallback){this.id=pID;this.name=APIModules.EFFECTS;this.callback=pCallback;}
pttp=EffectsAPIAnimation.prototype=new APIModule();pttp.id=-1;pttp.callMethod=function(pMethod,pArguments){if(pArguments==undefined)pArguments=[];var pArgs=[this.id];for(var i=0;i<pArguments.length;i++)pArgs.push(pArguments[i]);return APIModule.callFlash(this.callback,{module:this.name,method:pMethod,params:pArgs});};pttp.start=function(){return this.callMethod("startJS",arguments);};pttp.stop=function(){return this.callMethod("stopJS",arguments);};pttp.apply=function(target){var targetID=target.getID();if(targetID){return this.callMethod("applyJS",[targetID]);}};pttp.addEventListener=function(pEvent,pHandler){var pNewHandler=APIModule.getHandler();this.handlers.push({handler:pHandler,bcHandler:pNewHandler,event:pEvent});window[pNewHandler]=pHandler;return this.callMethod("addEventListenerJS",[pEvent,pNewHandler]);};pttp.removeEventListener=function(pEvent,pHandler){var pNum=this.handlers.length;for(var i=0;i<pNum;i++){if(this.handlers[i].event==pEvent&&this.handlers[i].handler==pHandler){var pBCHandler=this.handlers[i].bcHandler;this.handlers.splice(i,1);break;}}
if(pBCHandler==undefined)return;return this.callMethod("removeEventListenerJS",[pEvent,pBCHandler]);};BCExperienceEvent={}
BCExperienceEvent.CONTENT_LOAD="contentLoad";BCExperienceEvent.USER_MESSAGE="userMessage";BCExperienceEvent.TEMPLATE_READY="templateReady";BCExperienceEvent.ENTER_FULLSCREEN="enterFullScreen";BCExperienceEvent.EXIT_FULLSCREEN="exitFullScreen";brightcove.modules[APIModules.EXPERIENCE]=ExperienceAPI;BCComponentModules={};function ExperienceAPI(pExperience){this.experience=pExperience;if(pExperience){this.callback=pExperience.callback;}
this.name=APIModules.EXPERIENCE;}
var pttp=ExperienceAPI.prototype=new APIModule();pttp.setSize=function(){return this.callMethod("setSize",arguments);};pttp.getPlayerName=function(){return this.callMethod("getPlayerName",arguments);};pttp.getReady=function(){return this.callMethod("getReady",arguments);};pttp.getWidth=function(){return this.callMethod("getWidth",arguments);};pttp.getHeight=function(){return this.callMethod("getHeight",arguments);};pttp.getAdEnabled=function(){return this.callMethod("getAdEnabled",arguments);};pttp.getEnabled=function(){return this.callMethod("getEnabled",arguments);};pttp.setEnabled=function(){return this.callMethod("setEnabled",arguments);};pttp.loadExperience=function(){return this.callMethod("loadExperience",arguments);};pttp.getLayout=function(){return this.callMethod("getLayout",arguments);};pttp.getAffiliateID=function(){return this.callMethod("getAffiliateID",arguments);};pttp.getExperienceID=function(){return this.callMethod("getExperienceID",arguments);};pttp.getPublisherID=function(){return this.callMethod("getPublisherID",arguments);};pttp.getExperienceURL=function(){return this.callMethod("getExperienceURL",arguments);};pttp.getReferrerURL=function(){return this.callMethod("getReferrerURL",arguments);};pttp.getConfiguredPropertiesForID=function(){return this.callMethod("getConfiguredPropertiesForID",arguments);};pttp.getPlayerParameter=function(){return this.callMethod("getPlayerParameter",arguments);};pttp.getLayoutRoot=function(){var pObj=this.callMethod("getLayoutRootJS",arguments);if(pObj!=null){if(BCComponentModules[pObj.elementName]!=null){return new BCComponentModules[pObj.elementName](this.experience,this.callback,pObj.elementID);}}
return null;};pttp.getElementByID=function(){var pNodeName=this.callMethod("getJSElementByID",arguments);if(pNodeName!=null){if(pNodeName=="VideoPlayer"||pNodeName=="VideoDisplay"){var pPlayerAPI=this.experience.getModule(APIModules.VIDEO_PLAYER);if(pPlayerAPI){pPlayerAPI.initializeComponentAPI();return pPlayerAPI;}}else if(BCComponentModules[pNodeName]!=null){return new BCComponentModules[pNodeName](this.experience,this.callback,arguments[0]);}}
return null;};pttp.getElementsByType=function(){var pIDs=this.callMethod("getJSElementsByType",arguments);var pElements=[];var pElement;for(var i in pIDs){if(typeof(pIDs[i])!="function"){pElement=this.getElementByID(pIDs[i]);if(pElement)pElements.push(pElement);}}
return pElements;};pttp.getModules=function(){return this.callMethod("getModules",arguments);};pttp.unload=function(){return this.callMethod("unload",arguments);};pttp.debug=function(){return this.callMethod("debug",arguments);};pttp.getUserCountry=function(){return this.callMethod("getUserCountry",arguments);};pttp.getTranslation=function(){return this.callMethod("getTranslation",arguments);};brightcove.modules[APIModules.EXPERIENCE+APIModules.HTML5]=ExperienceAPI_html5;function ExperienceAPI_html5(pExperience){this.experience=pExperience;if(pExperience){this.callback=pExperience.callback;this.playerURL=pExperience.playerURL;}
this.name=APIModules.EXPERIENCE;}
var pttp=ExperienceAPI_html5.prototype=new ExperienceAPI();BCMenuEvent={}
BCMenuPage={}
BCMenuAdditionalMedia={}
BCMenuEvent.MENU_PAGE_OPEN="menuPageOpen";BCMenuEvent.MENU_PAGE_CLOSE="menuPageClose";BCMenuEvent.OVERLAY_MENU_OPEN="overlayMenuOpen";BCMenuEvent.OVERLAY_MENU_CLOSE="overlayMenuClose";BCMenuEvent.OVERLAY_MENU_PLAY_CLICK="overlayMenuPlayClick";BCMenuEvent.ICON_MENU_OPEN="iconMenuOpen";BCMenuEvent.ICON_MENU_CLOSE="iconMenuClose";BCMenuEvent.SEND_EMAIL_CLICK="sendEmailClick";BCMenuEvent.BLOG_POST_CLICK="blogPostClick";BCMenuEvent.COPY_LINK="copyLink";BCMenuEvent.COPY_CODE="copyCode";BCMenuEvent.VIDEO_REQUEST="videoRequest";BCMenuPage.EMAIL="Email";BCMenuPage.SHARE="Share";BCMenuPage.LINK="Link";BCMenuPage.CODE="Embed";BCMenuPage.INFO="Info";BCMenuAdditionalMedia.RELATED_VIDEOS="related videos";BCMenuAdditionalMedia.NEWEST_VIDEOS="newest videos";BCMenuAdditionalMedia.MOST_VIEWED_VIDEOS="most viewed videos";brightcove.modules[APIModules.MENU]=MenuAPI;function MenuAPI(pExperience){this.experience=pExperience;this.callback=pExperience.callback;this.name=APIModules.MENU;}
var pttp=MenuAPI.prototype=new APIModule();pttp.showIconMenu=function(){return this.callMethod("showIconMenu",arguments);};pttp.isIconMenuShowing=function(){return this.callMethod("isIconMenuShowing",arguments);};pttp.showMenuPage=function(){return this.callMethod("showMenuPage",arguments);};pttp.closeMenuPage=function(){return this.callMethod("closeMenuPage",arguments);};pttp.isMenuPageShowing=function(){return this.callMethod("isMenuPageShowing",arguments);};pttp.isOverlayMenuShowing=function(){return this.callMethod("isOverlayMenuShowing",arguments);};pttp.removeOverlayMenu=function(){return this.callMethod("removeOverlayMenu",arguments);};pttp.getCurrentMenuPage=function(){return this.callMethod("getCurrentMenuPage",arguments);};pttp.setOverlayMenuVisible=function(){return this.callMethod("setOverlayMenuVisible",arguments);};pttp.getOverlayMenuVisible=function(){return this.callMethod("getOverlayMenuVisible",arguments);};pttp.setAdditionalMediaForType=function(){return this.callMethod("setAdditionalMediaForType",arguments);};pttp.getAdditionalMediaForType=function(){return this.callMethod("getAdditionalMediaForType",arguments);};var bcAdditionalMediaCallback;pttp.setAdditionalMediaCallback=function(pCallback,pTypes){bcAdditionalMediaCallback=pCallback;return this.callMethod("setAdditionalMediaCallbackJS",["bcCallAdditionalMediaCallback",pTypes]);};function bcCallAdditionalMediaCallback(pType,pMedia){return bcAdditionalMediaCallback(pType,pMedia);};BCSearchEvent={};BCSearchEvent.RESULT="searchResult";BCSearchEvent.ERROR="searchError";brightcove.modules[APIModules.SEARCH]=SearchAPI;SortOrderType={ASC:"ASC",DESC:"DESC"};SortByType={PUBLISH_DATE:"PUBLISH_DATE",CREATION_DATE:"CREATION_DATE",MODIFIED_DATE:"MODIFIED_DATE",PLAYS_TOTAL:"PLAYS_TOTAL",PLAYS_TRAILING_WEEK:"PLAYS_TRAILING_WEEK"};function SearchAPI(pExperience){this.experience=pExperience;this.callback=pExperience.callback;this.name=APIModules.SEARCH;}
SearchAPI.searches={};var pttp=SearchAPI.prototype=new APIModule();pttp.findRelatedVideos=function(){var pID=this.callMethod("findRelatedVideosJS",arguments);return this.getVideoSearch(pID);};pttp.findVideosByText=function(){var pID=this.callMethod("findVideosByTextJS",arguments);return this.getVideoSearch(pID);};pttp.findVideosByTags=function(){var pID=this.callMethod("findVideosByTagsJS",arguments);return this.getVideoSearch(pID);};pttp.findAllVideos=function(){var pID=this.callMethod("findAllVideosJS",arguments);return this.getVideoSearch(pID);};pttp.getVideoSearch=function(pID){var pSearch=SearchAPI.searches[pID];if(pSearch==undefined){pSearch=new VideoSearch(pID,this.callback);SearchAPI.searches[pID]=pSearch;}
return pSearch;};pttp.getMaxItemsInMemory=function(){return this.callMethod("getMaxItemsInMemory",arguments);};pttp.setMaxItemsInMemory=function(){return this.callMethod("setMaxItemsInMemory",arguments);};function VideoSearch(pID,pCallback){this.id=pID;this.name=APIModules.SEARCH;this.callback=pCallback;}
pttp=VideoSearch.prototype=new APIModule();pttp.id=-1;pttp.callMethod=function(pMethod,pArguments){if(pArguments==undefined)pArguments=[];var pArgs=[this.id];for(var i=0;i<pArguments.length;i++)pArgs.push(pArguments[i]);return APIModule.callFlash(this.callback,{module:this.name,method:pMethod,params:pArgs});};pttp.getItems=function(){return this.callMethod("getItems",arguments);};pttp.getPage=function(){return this.callMethod("getPage",arguments);};pttp.getPageAsynch=function(){this.pageNumber=this.callMethod("getPageNumber");return this.callMethod("getPageAsynch",arguments);};pttp.getNextPage=function(){return this.callMethod("getNextPage",arguments);};pttp.getNextPageAsynch=function(){return this.callMethod("getNextPageAsynch",arguments);};pttp.getPreviousPage=function(){return this.callMethod("getPreviousPage",arguments);};pttp.getPreviousPageAsynch=function(){return this.callMethod("getPreviousPageAsynch",arguments);};pttp.getRow=function(){return this.callMethod("getRow",arguments);};pttp.getRowOnPage=function(){return this.callMethod("getRowOnPage",arguments);};pttp.purgeAll=function(){return this.callMethod("purgeAll",arguments);};pttp.purgePage=function(){return this.callMethod("purgePage",arguments);};pttp.getTotalRows=function(){return this.callMethod("getTotalRows",arguments);};pttp.getTotalPages=function(){return this.callMethod("getTotalPages",arguments);};pttp.getPageNumber=function(){return this.callMethod("getPageNumber",arguments);};pttp.getPageSize=function(){return this.callMethod("getPageSize",arguments);};pttp.getMaxPagesInMemory=function(){return this.callMethod("getMaxPagesInMemory",arguments);};pttp.setMaxPagesInMemory=function(){return this.callMethod("setMaxPagesInMemory",arguments);};BCSocialEvent={}
BCSocialEvent.EMBED_CODE_RETRIEVED="embedCodeRetrieved";BCSocialEvent.LINK_GENERATED="linkGenerated";brightcove.modules[APIModules.SOCIAL]=SocialAPI;function SocialAPI(pExperience){this.experience=pExperience;this.callback=pExperience.callback;this.name=APIModules.SOCIAL;}
var pttp=SocialAPI.prototype=new APIModule();pttp.shareVideoViaEmail=function(){return this.callMethod("shareVideoViaEmail",arguments);};pttp.getEmbedCode=function(){return this.callMethod("getEmbedCode",arguments);};pttp.setEmbedCode=function(){return this.callMethod("setEmbedCode",arguments);};pttp.setLink=function(){return this.callMethod("setLink",arguments);};pttp.getLink=function(){return this.callMethod("getLink",arguments);};pttp.isURLShortenedForMedia=function(){return this.callMethod("isURLShortenedForMedia",arguments);};pttp.getRSS=function(){return this.callMethod("getRSS",arguments);};pttp.enableBlogging=function(){return this.callMethod("enableBlogging",arguments);};if(BCMediaEvent==undefined){var BCMediaEvent={}
BCMediaEvent.BEGIN="mediaBegin";BCMediaEvent.BUFFER_BEGIN="mediaBufferBegin";BCMediaEvent.BUFFER_COMPLETE="mediaBufferComplete";BCMediaEvent.CHANGE="mediaChange";BCMediaEvent.COMPLETE="mediaComplete";BCMediaEvent.ERROR="mediaError";BCMediaEvent.MUTE_CHANGE="mediaMuteChange";BCMediaEvent.PLAY="mediaPlay";BCMediaEvent.PROGRESS="mediaProgress";BCMediaEvent.SEEK="mediaSeek";BCMediaEvent.STOP="mediaStop";BCMediaEvent.VOLUME_CHANGE="mediaVolumeChange";}
var BCVideoEvent={}
BCVideoEvent.END_BUFFER="endBuffering";BCVideoEvent.RENDITION_CHANGE="renditionChange";BCVideoEvent.VIDEO_CHANGE="videoChange";BCVideoEvent.VIDEO_COMPLETE="videoComplete";BCVideoEvent.VIDEO_CONNECT="videoConnect";BCVideoEvent.VIDEO_LOAD="videoLoad";BCVideoEvent.VIDEO_PROGRESS="videoProgress";BCVideoEvent.VIDEO_START="videoStart";BCVideoEvent.VIDEO_STOP="videoStop";BCVideoEvent.VIDEO_MUTE="ui_mute";BCVideoEvent.VIDEO_SEEK="seek";BCVideoEvent.START_BUFFER="startBuffering";BCVideoEvent.STREAM_START="streamStart";BCVideoEvent.VOLUME_CHANGE="volumeChange";brightcove.modules[APIModules.VIDEO_PLAYER]=VideoPlayerAPI;function VideoPlayerAPI(pExperience){this.experience=pExperience;if(pExperience){this.callback=pExperience.callback;}
this.name=APIModules.VIDEO_PLAYER;}
var pttp=VideoPlayerAPI.prototype=new APIModule();pttp.initializeComponentAPI=function(){return this.callMethod("initializeComponentAPI",arguments);};pttp.getComponentAPI=function(pElementName,pElementID){if(pElementName!=null){if(pElementName=="VideoPlayer"||pElementName=="VideoDisplay"){var pPlayerAPI=this.experience.getModule(APIModules.VIDEO_PLAYER);pPlayerAPI.initializeComponentAPI();return pPlayerAPI;}else if(BCComponentModules[pElementName]!=null){return new BCComponentModules[pElementName](this.experience,this.callback,pElementID);}}
return null;};pttp.isPlayerDefined=function(){return this.callMethod("isPlayerDefined",arguments);};pttp.setVideoFilter=function(){return this.callMethod("setVideoFilter",arguments);};pttp.getCurrentVideo=function(){return this.callMethod("getCurrentVideo",arguments);};pttp.getCurrentRendition=function(){return this.callMethod("getCurrentRendition",arguments);};pttp.loadVideo=function(){return this.callMethod("loadVideo",arguments);};pttp.cueVideo=function(){return this.callMethod("cueVideo",arguments);};pttp.play=function(){return this.callMethod("play",arguments);};pttp.stop=function(){return this.callMethod("stop",arguments);};pttp.pause=function(){return this.callMethod("pause",arguments);};pttp.seek=function(){return this.callMethod("seek",arguments);};pttp.mute=function(){return this.callMethod("mute",arguments);};pttp.setVolume=function(){return this.callMethod("setVolume",arguments);};pttp.getVolume=function(){return this.callMethod("getVolume",arguments);};pttp.showVolumeControls=function(){return this.callMethod("showVolumeControls",arguments);};pttp.getVideoPosition=function(){return this.callMethod("getVideoPosition",arguments);};pttp.getVideoDuration=function(){return this.callMethod("getVideoDuration",arguments);};pttp.getVideoBytesLoaded=function(){return this.callMethod("getVideoBytesLoaded",arguments);};pttp.getVideoBytesTotal=function(){return this.callMethod("getVideoBytesTotal",arguments);};pttp.isPlaying=function(){return this.callMethod("isPlaying",arguments);};pttp.isMuted=function(){return this.callMethod("isMuted",arguments);};pttp.getContentTypeDisplayed=function(){return this.callMethod("getContentTypeDisplayed",arguments);};pttp.setSize=function(){return this.callMethod("setSize",arguments);};pttp.move=function(){return this.callMethod("move",arguments);};pttp.getX=function(){return this.callMethod("getX",arguments);};pttp.getY=function(){return this.callMethod("getY",arguments);};pttp.getDefinition=function(){return this.callMethod("getDefinition",arguments);};pttp.getID=function(){return this.callMethod("getID",arguments);};pttp.getWidth=function(){return this.callMethod("getWidth",arguments);};pttp.getHeight=function(){return this.callMethod("getHeight",arguments);};pttp.getDisplayWidth=function(){return this.callMethod("getDisplayWidth",arguments);};pttp.getDisplayHeight=function(){return this.callMethod("getDisplayHeight",arguments);};pttp.getEnabled=function(){return this.callMethod("getEnabled",arguments);};pttp.setStyles=function(){return this.callMethod("setStyles",arguments);};pttp.setEnabled=function(){return this.callMethod("setEnabled",arguments);};pttp.getVisible=function(){return this.callMethod("getVisible",arguments);};pttp.setVisible=function(){return this.callMethod("setVisible",arguments);};pttp.getAlpha=function(){return this.callMethod("getAlpha",arguments);};pttp.setAlpha=function(){return this.callMethod("setAlpha",arguments);};pttp.getBlendMode=function(){return this.callMethod("getBlendMode",arguments);};pttp.setBlendMode=function(){return this.callMethod("setBlendMode",arguments);};pttp.getRotation=function(){return this.callMethod("getRotation",arguments);};pttp.setRotation=function(){return this.callMethod("setRotation",arguments);};pttp.getIndex=function(){return this.callMethod("getIndex",arguments);};pttp.toggleVolumeControls=function(){return this.callMethod("toggleVolumeControls",arguments);};pttp.toggleMenuPage=function(){return this.callMethod("toggleMenuPage",arguments);};pttp.getContainer=function(){var pObj=this.callMethod("getContainerJS",arguments);if(pObj){return this.getComponentAPI(pObj.elementName,pObj.elementID);}
return null;};pttp.getNextSibling=function(){var pObj=this.callMethod("getNextSiblingJS",arguments);if(pObj){return this.getComponentAPI(pObj.elementName,pObj.elementID);}
return null;};pttp.getPreviousSibling=function(){var pObj=this.callMethod("getPreviousSiblingJS",arguments);if(pObj){return this.getComponentAPI(pObj.elementName,pObj.elementID);}
return null;};pttp.getCSS=function(){return this.callMethod("getCSS",arguments);};pttp.mediaIsLive=function(){return this.callMethod("mediaIsLive",arguments);};pttp.setDynamicDeliveryParameters=function(){return this.callMethod("setDynamicDeliveryParameters",arguments);};pttp.removeUserMessage=function(){return this.callMethod("removeUserMessage",arguments);};pttp.enableInitialBandwidthDetection=function(){return this.callMethod("enableInitialBandwidthDetection",arguments);};pttp.getInitialBandwidthDetectionEnabled=function(){return this.callMethod("getInitialBandwidthDetectionEnabled",arguments);};pttp.setDefaultBufferTime=function(){return this.callMethod("setDefaultBufferTime",arguments);};pttp.getDefaultBufferTime=function(){return this.callMethod("getDefaultBufferTime",arguments);};pttp.setConnectOnLoad=function(){return this.callMethod("setConnectOnLoad",arguments);};var bcRenditionSelectionCallback;pttp.setRenditionSelectionCallback=function(pSelector){bcRenditionSelectionCallback=pSelector;return this.callMethod("setRenditionSelectionCallbackJS",["bcCallRenditionSelectionCallback"]);};function bcCallRenditionSelectionCallback(pContext){return bcRenditionSelectionCallback(pContext);};brightcove.modules[APIModules.VIDEO_PLAYER+APIModules.HTML5]=VideoPlayerAPI_html5;function VideoPlayerAPI_html5(pExperience){this.experience=pExperience;if(pExperience){this.callback=pExperience.callback;this.playerURL=pExperience.playerURL;}
this.name=APIModules.VIDEO_PLAYER;this.playing=false;this.setUpListeners();}
var pttp=VideoPlayerAPI_html5.prototype=new VideoPlayerAPI();pttp.setUpListeners=function(){var videoPlayerAPI=this;this.addEventListener("videoChangeDump",function(pEvent){var data=pEvent.data;videoPlayerAPI.video=data.video;videoPlayerAPI.rendition=data.rendition;videoPlayerAPI.position=0;videoPlayerAPI.duration=data.video.length/1000;});this.addEventListener(BCMediaEvent.PROGRESS,function(pEvent){videoPlayerAPI.position=pEvent.position;});this.addEventListener(BCMediaEvent.PLAY,function(pEvent){videoPlayerAPI.playing=true;});this.addEventListener(BCMediaEvent.STOP,function(pEvent){videoPlayerAPI.playing=false;});}
pttp.isPlayerDefined=function(){return true;};pttp.isPlaying=function(){return this.playing;};pttp.getCurrentVideo=function(){return this.video;};pttp.getCurrentRendition=function(){return this.rendition;};pttp.getVideoPosition=function(pFormat){var position=Math.max(0,this.position)
if(pFormat===true){return this.convertToTimeCode(position);}
return position;};pttp.getVideoDuration=function(pFormat){if(pFormat===true){return this.convertToTimeCode(this.duration);}
return this.duration;};pttp.convertToTimeCode=function(pTime){if(isNaN(pTime)||pTime==0)return"00:00";var hours=Math.floor(pTime/3600);var remainder=pTime%3600;var minutes=Math.floor(remainder/60);remainder%=60;var seconds=Math.round(remainder);if(seconds==60){seconds=0;if(++minutes==60){minutes=0;hours++;}}
var bufferWithZero=function(pString,pLength){pString=String(pString);while(pString.length<pLength){pString="0"+pString;}
return pString;};var time;if(hours<1){time=(bufferWithZero(minutes,2)+":"
+bufferWithZero(seconds,2));}else{time=(bufferWithZero(hours,1)+":"
+bufferWithZero(minutes,2)+":"
+bufferWithZero(seconds,2));}
return time;};function ComponentAPI(){this.name=APIModules.EXPERIENCE;}
var pttp=ComponentAPI.prototype=new APIModule();pttp.callMethod=function(pMethod,pArguments){var pArgs=[];for(var i=0;i<pArguments.length;i++)pArgs.push(pArguments[i]);return APIModule.callFlash(this.callback,{module:this.name,element:this.elementID,method:"getComponentAPI",componentMethod:pMethod,params:pArgs});};pttp.getComponentAPI=function(pElementName,pElementID){if(pElementName!=null){if(pElementName=="VideoPlayer"||pElementName=="VideoDisplay"){var pPlayerAPI=this.experience.getModule(APIModules.VIDEO_PLAYER);pPlayerAPI.initializeComponentAPI();return pPlayerAPI;}else if(BCComponentModules[pElementName]!=null){return new BCComponentModules[pElementName](this.experience,this.callback,pElementID);}}
return null;};pttp.setSize=function(){return this.callMethod("setSize",arguments);};pttp.move=function(){return this.callMethod("move",arguments);};pttp.getX=function(){return this.callMethod("getX",arguments);};pttp.getY=function(){return this.callMethod("getY",arguments);};pttp.getVisible=function(){return this.callMethod("getVisible",arguments);};pttp.setVisible=function(){return this.callMethod("setVisible",arguments);};pttp.getIncludeInLayout=function(){return this.callMethod("getIncludeInLayout",arguments);};pttp.setIncludeInLayout=function(){return this.callMethod("setIncludeInLayout",arguments);};pttp.getAlpha=function(){return this.callMethod("getAlpha",arguments);};pttp.setAlpha=function(){return this.callMethod("setAlpha",arguments);};pttp.getDefinition=function(){return this.callMethod("getDefinition",arguments);};pttp.getID=function(){return this.callMethod("getID",arguments);};pttp.getWidth=function(){return this.callMethod("getWidth",arguments);};pttp.getHeight=function(){return this.callMethod("getHeight",arguments);};pttp.getIndex=function(){return this.callMethod("getIndex",arguments);};pttp.getContainer=function(){var pObj=this.callMethod("getContainerJS",arguments);if(pObj){return this.getComponentAPI(pObj.elementName,pObj.elementID);}
return null;};pttp.getNextSibling=function(){var pObj=this.callMethod("getNextSiblingJS",arguments);if(pObj){return this.getComponentAPI(pObj.elementName,pObj.elementID);}
return null;};pttp.getPreviousSibling=function(){var pObj=this.callMethod("getPreviousSiblingJS",arguments);if(pObj){return this.getComponentAPI(pObj.elementName,pObj.elementID);}
return null;};function UIObjectAPI(pCallback,pElementID){this.callback=pCallback;this.elementID=pElementID;}
var pttp=UIObjectAPI.prototype=new ComponentAPI();pttp.getEnabled=function(){return this.callMethod("getEnabled",arguments);};pttp.setEnabled=function(){return this.callMethod("setEnabled",arguments);};pttp.getBlendMode=function(){return this.callMethod("getBlendMode",arguments);};pttp.setBlendMode=function(){return this.callMethod("setBlendMode",arguments);};pttp.getRotation=function(){return this.callMethod("getRotation",arguments);};pttp.setRotation=function(){return this.callMethod("setRotation",arguments);};pttp.setStyles=function(){return this.callMethod("setStyles",arguments);};pttp.getCSS=function(){return this.callMethod("getCSS",arguments);};if(BCMediaEvent==undefined){var BCMediaEvent={}
BCMediaEvent.BEGIN="mediaBegin";BCMediaEvent.BUFFER_BEGIN="mediaBufferBegin";BCMediaEvent.BUFFER_COMPLETE="mediaBufferComplete";BCMediaEvent.CHANGE="mediaChange";BCMediaEvent.COMPLETE="mediaComplete";BCMediaEvent.ERROR="mediaError";BCMediaEvent.MUTE_CHANGE="mediaMuteChange";BCMediaEvent.PLAY="mediaPlay";BCMediaEvent.PROGRESS="mediaProgress";BCMediaEvent.SEEK="mediaSeek";BCMediaEvent.STOP="mediaStop";BCMediaEvent.VOLUME_CHANGE="mediaVolumeChange";}
BCComponentModules["AudioPlayer"]=AudioPlayerAPI;function AudioPlayerAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=AudioPlayerAPI.prototype=new ComponentAPI();pttp.play=function(){return this.callMethod("play",arguments);};pttp.pause=function(){return this.callMethod("pause",arguments);};pttp.stop=function(){return this.callMethod("stop",arguments);};pttp.seek=function(){return this.callMethod("seek",arguments);};pttp.mute=function(){return this.callMethod("mute",arguments);};pttp.setVolume=function(){return this.callMethod("setVolume",arguments);};pttp.getVolume=function(){return this.callMethod("getVolume",arguments);};pttp.isPlaying=function(){return this.callMethod("isPlaying",arguments);};pttp.isMuted=function(){return this.callMethod("isMuted",arguments);};pttp.getMediaBytesLoaded=function(){return this.callMethod("getMediaBytesLoaded",arguments);};pttp.getMediaBytesTotal=function(){return this.callMethod("getMediaBytesTotal",arguments);};pttp.getMediaDuration=function(){return this.callMethod("getMediaDuration",arguments);};pttp.getMediaPosition=function(){return this.callMethod("getMediaPosition",arguments);};pttp.getCurrentMedia=function(){return this.callMethod("getCurrentMedia",arguments);};pttp.cueMedia=function(){return this.callMethod("cueMedia",arguments);};pttp.loadMedia=function(){return this.callMethod("loadMedia",arguments);};BCComponentModules["Banner"]=BannerAPI;function BannerAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=BannerAPI.prototype=new UIObjectAPI();BCComponentModules["Button"]=ButtonAPI;function ButtonAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=ButtonAPI.prototype=new UIObjectAPI();pttp.getLabel=function(){return this.callMethod("getLabel",arguments);};pttp.setLabel=function(){return this.callMethod("setLabel",arguments);};pttp.setFont=function(){return this.callMethod("setFont",arguments);};pttp.getFont=function(){return this.callMethod("getFont",arguments);};pttp.setLabelSize=function(){return this.callMethod("setLabelSize",arguments);};pttp.getLabelSize=function(){return this.callMethod("getLabelSize",arguments);};pttp.getAutoSize=function(){return this.callMethod("getAutoSize",arguments);};pttp.setAutoSize=function(){return this.callMethod("setAutoSize",arguments);};pttp.getTruncateLabel=function(){return this.callMethod("getTruncateLabel",arguments);};pttp.setTruncateLabel=function(){return this.callMethod("setTruncateLabel",arguments);};pttp.getMultiline=function(){return this.callMethod("getMultiline",arguments);};pttp.setMultiline=function(){return this.callMethod("setMultiline",arguments);};pttp.getIsTruncated=function(){return this.callMethod("getIsTruncated",arguments);};pttp.getLabelWidth=function(){return this.callMethod("getLabelWidth",arguments);};pttp.getShowBack=function(){return this.callMethod("getShowBack",arguments);};pttp.setShowBack=function(){return this.callMethod("setShowBack",arguments);};pttp.getTooltip=function(){return this.callMethod("getTooltip",arguments);};pttp.setTooltip=function(){return this.callMethod("setTooltip",arguments);};pttp.getIconScale=function(){return this.callMethod("getIconScale",arguments);};pttp.setIconScale=function(){return this.callMethod("setIconScale",arguments);};pttp.getIconOffsetX=function(){return this.callMethod("getIconOffsetX",arguments);};pttp.setIconOffsetX=function(){return this.callMethod("setIconOffsetX",arguments);};pttp.getIconOffsetY=function(){return this.callMethod("getIconOffsetY",arguments);};pttp.setIconOffsetY=function(){return this.callMethod("setIconOffsetY",arguments);};pttp.getLabelOffsetX=function(){return this.callMethod("getLabelOffsetX",arguments);};pttp.setLabelOffsetX=function(){return this.callMethod("setLabelOffsetX",arguments);};pttp.getLabelOffsetY=function(){return this.callMethod("getLabelOffsetY",arguments);};pttp.setLabelOffsetY=function(){return this.callMethod("setLabelOffsetY",arguments);};pttp.getLabelBuffer=function(){return this.callMethod("getLabelBuffer",arguments);};pttp.setLabelBuffer=function(){return this.callMethod("setLabelBuffer",arguments);};pttp.getIconAlignmentH=function(){return this.callMethod("getIconAlignmentH",arguments);};pttp.setIconAlignmentH=function(){return this.callMethod("setIconAlignmentH",arguments);};pttp.getIconAlignmentV=function(){return this.callMethod("getIconAlignmentV",arguments);};pttp.setIconAlignmentV=function(){return this.callMethod("setIconAlignmentV",arguments);};pttp.getLabelAlignmentH=function(){return this.callMethod("getLabelAlignmentH",arguments);};pttp.setLabelAlignmentH=function(){return this.callMethod("setLabelAlignmentH",arguments);};pttp.getLabelAlignmentV=function(){return this.callMethod("getLabelAlignmentV",arguments);};pttp.setLabelAlignmentV=function(){return this.callMethod("setLabelAlignmentV",arguments);};pttp.getIconName=function(){return this.callMethod("getIconName",arguments);};pttp.setIconName=function(){return this.callMethod("setIconName",arguments);};BCComponentModules["ChromelessVideoPlayer"]=ChromelessVideoPlayerAPI;function ChromelessVideoPlayerAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;this.initializeComponentAPI();}
var pttp=ChromelessVideoPlayerAPI.prototype=new VideoPlayerAPI();pttp.callChromelessComponentMethod=function(pMethod,pArguments){var args=[];for(var i=0;i<pArguments.length;i++)args.push(pArguments[i]);return APIModule.callFlash(this.callback,{module:APIModules.EXPERIENCE,element:this.elementID,method:"getComponentAPI",componentMethod:pMethod,params:args});};pttp.getControls=function(){var controls=this.callChromelessComponentMethod("getControlsJS",arguments);if(controls){return this.getComponentAPI(controls.elementName,controls.elementID);}
return null;};pttp.showControls=function(){return this.callChromelessComponentMethod("showControls",arguments);};pttp.getControlsVisible=function(){return this.callChromelessComponentMethod("getControlsVisible",arguments);};pttp.getIncludeInLayout=function(){return this.callChromelessComponentMethod("getIncludeInLayout",arguments);};pttp.setIncludeInLayout=function(){return this.callChromelessComponentMethod("setIncludeInLayout",arguments);};BCComponentModules["ComboBox"]=ComboBoxAPI;function ComboBoxAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=ComboBoxAPI.prototype=new UIObjectAPI();pttp.setSelectedIndex=function(){return this.callMethod("setSelectedIndex",arguments);};pttp.getSelectedIndex=function(){return this.callMethod("getSelectedIndex",arguments);};pttp.getSelectedData=function(){return this.callMethod("getSelectedData",arguments);};pttp.getDataAtIndex=function(){return this.callMethod("getDataAtIndex",arguments);};pttp.getData=function(){return this.callMethod("getData",arguments);};pttp.setData=function(){return this.callMethod("setData",arguments);};pttp.getNumItems=function(){return this.callMethod("getNumItems",arguments);};pttp.getScrollerWidth=function(){return this.callMethod("getScrollerWidth",arguments);};pttp.setScrollerWidth=function(){return this.callMethod("setScrollerWidth",arguments);};pttp.getScrollerInset=function(){return this.callMethod("getScrollerInset",arguments);};pttp.setScrollerInset=function(){return this.callMethod("setScrollerInset",arguments);};pttp.getItemLeading=function(){return this.callMethod("getItemLeading",arguments);};pttp.setItemLeading=function(){return this.callMethod("setItemLeading",arguments);};pttp.getItemInsetH=function(){return this.callMethod("getItemInsetH",arguments);};pttp.setItemInsetH=function(){return this.callMethod("setItemInsetH",arguments);};pttp.getItemInsetV=function(){return this.callMethod("getItemInsetV",arguments);};pttp.setItemInsetV=function(){return this.callMethod("setItemInsetV",arguments);};pttp.getRowHeight=function(){return this.callMethod("getRowHeight",arguments);};pttp.setRowHeight=function(){return this.callMethod("setRowHeight",arguments);};pttp.getLabelBufferLeft=function(){return this.callMethod("getLabelBufferLeft",arguments);};pttp.setLabelBufferLeft=function(){return this.callMethod("setLabelBufferLeft",arguments);};pttp.getLabelBufferRight=function(){return this.callMethod("getLabelBufferRight",arguments);};pttp.setLabelBufferRight=function(){return this.callMethod("setLabelBufferRight",arguments);};pttp.getLabelBufferTop=function(){return this.callMethod("getLabelBufferTop",arguments);};pttp.setLabelBufferTop=function(){return this.callMethod("setLabelBufferTop",arguments);};pttp.getAnimated=function(){return this.callMethod("getAnimated",arguments);};pttp.setAnimated=function(){return this.callMethod("setAnimated",arguments);};pttp.getLabelField=function(){return this.callMethod("getLabelField",arguments);};pttp.setLabelField=function(){return this.callMethod("setLabelField",arguments);};pttp.getLabel=function(){return this.callMethod("getLabel",arguments);};pttp.setLabel=function(){return this.callMethod("setLabel",arguments);};function ContainerAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=ContainerAPI.prototype=new UIObjectAPI();pttp.getHAlign=function(){return this.callMethod("getHAlign",arguments);};pttp.setHAlign=function(){return this.callMethod("setHAlign",arguments);};pttp.getVAlign=function(){return this.callMethod("getVAlign",arguments);};pttp.setVAlign=function(){return this.callMethod("setVAlign",arguments);};pttp.getBackgroundColor=function(){return this.callMethod("getBackgroundColor",arguments);};pttp.setBackgroundColor=function(){return this.callMethod("setBackgroundColor",arguments);};pttp.getBackgroundImage=function(){return this.callMethod("getBackgroundImage",arguments);};pttp.setBackgroundImage=function(){return this.callMethod("setBackgroundImage",arguments);};pttp.getGutter=function(){return this.callMethod("getGutter",arguments);};pttp.setGutter=function(){return this.callMethod("setGutter",arguments);};pttp.getPadding=function(){return this.callMethod("getPadding",arguments);};pttp.setPadding=function(){return this.callMethod("setPadding",arguments);};pttp.appendChild=function(){return this.callMethod("appendChild",arguments);};pttp.insertChildAt=function(){return this.callMethod("insertChildAt",arguments);};pttp.removeChildByID=function(){return this.callMethod("removeChildByID",arguments);};pttp.getNumChildren=function(){return this.callMethod("getNumChildren",arguments);};pttp.removeChildAt=function(){return this.callMethod("removeChildAt",arguments);};pttp.getChildAt=function(){var pObj=this.callMethod("getChildAtJS",arguments);if(pObj){return this.getComponentAPI(pObj.elementName,pObj.elementID);}
return null;};BCComponentModules["ExpandingBanner"]=ExpandingBannerAPI;function ExpandingBannerAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=ExpandingBannerAPI.prototype=new UIObjectAPI();pttp.expand=function(){return this.callMethod("expand",arguments);};pttp.contract=function(){return this.callMethod("contract",arguments);};pttp.getExpanded=function(){return this.callMethod("getExpanded",arguments);};pttp.synchBannerWithExternal=function(){return this.callMethod("synchBannerWithExternal",arguments);};BCComponentModules["GraphicBlock"]=GraphicBlockAPI;function GraphicBlockAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=GraphicBlockAPI.prototype=new UIObjectAPI();BCComponentModules["Image"]=ImageAPI;function ImageAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=ImageAPI.prototype=new UIObjectAPI();pttp.setSource=function(){return this.callMethod("setSource",arguments);};pttp.getSource=function(){return this.callMethod("getSource",arguments);};pttp.getScaleMode=function(){return this.callMethod("getScaleMode",arguments);};pttp.setScaleMode=function(){return this.callMethod("setScaleMode",arguments);};pttp.getHAlign=function(){return this.callMethod("getHAlign",arguments);};pttp.setHAlign=function(){return this.callMethod("setHAlign",arguments);};pttp.getVAlign=function(){return this.callMethod("getVAlign",arguments);};pttp.setVAlign=function(){return this.callMethod("setVAlign",arguments);};pttp.getURL=function(){return this.callMethod("getURL",arguments);};pttp.setURL=function(){return this.callMethod("setURL",arguments);};pttp.getTooltip=function(){return this.callMethod("getTooltip",arguments);};pttp.setTooltip=function(){return this.callMethod("setTooltip",arguments);};pttp.getInset=function(){return this.callMethod("getInset",arguments);};pttp.setInset=function(){return this.callMethod("setInset",arguments);};pttp.getContentWidth=function(){return this.callMethod("getContentWidth",arguments);};pttp.getContentHeight=function(){return this.callMethod("getContentHeight",arguments);};BCComponentModules["Label"]=LabelAPI;function LabelAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=LabelAPI.prototype=new UIObjectAPI();pttp.setText=function(){return this.callMethod("setText",arguments);};pttp.getText=function(){return this.callMethod("getText",arguments);};pttp.setType=function(){return this.callMethod("setType",arguments);};pttp.getType=function(){return this.callMethod("getType",arguments);};pttp.setFont=function(){return this.callMethod("setFont",arguments);};pttp.getFont=function(){return this.callMethod("getFont",arguments);};pttp.setColor=function(){return this.callMethod("setColor",arguments);};pttp.getColor=function(){return this.callMethod("getColor",arguments);};pttp.setTextSize=function(){return this.callMethod("setTextSize",arguments);};pttp.getTextSize=function(){return this.callMethod("getTextSize",arguments);};pttp.getHAlign=function(){return this.callMethod("getHAlign",arguments);};pttp.setHAlign=function(){return this.callMethod("setHAlign",arguments);};pttp.getVAlign=function(){return this.callMethod("getVAlign",arguments);};pttp.setVAlign=function(){return this.callMethod("setVAlign",arguments);};pttp.setUnderline=function(){return this.callMethod("setUnderline",arguments);};pttp.getUnderline=function(){return this.callMethod("getUnderline",arguments);};pttp.setHTMLEnabled=function(){return this.callMethod("setHTMLEnabled",arguments);};pttp.getHTMLEnabled=function(){return this.callMethod("getHTMLEnabled",arguments);};pttp.setAutoSize=function(){return this.callMethod("setAutoSize",arguments);};pttp.getAutoSize=function(){return this.callMethod("getAutoSize",arguments);};pttp.setTruncate=function(){return this.callMethod("setTruncate",arguments);};pttp.getTruncate=function(){return this.callMethod("getTruncate",arguments);};pttp.setMultiline=function(){return this.callMethod("setMultiline",arguments);};pttp.getMultiline=function(){return this.callMethod("getMultiline",arguments);};pttp.getIsTruncated=function(){return this.callMethod("getIsTruncated",arguments);};pttp.getTextWidth=function(){return this.callMethod("getTextWidth",arguments);};pttp.getTextHeight=function(){return this.callMethod("getTextHeight",arguments);};BCComponentModules["LayoutBox"]=LayoutBoxAPI;function LayoutBoxAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=LayoutBoxAPI.prototype=new ComponentAPI();pttp.getHAlign=function(){return this.callMethod("getHAlign",arguments);};pttp.setHAlign=function(){return this.callMethod("setHAlign",arguments);};pttp.getVAlign=function(){return this.callMethod("getVAlign",arguments);};pttp.setVAlign=function(){return this.callMethod("setVAlign",arguments);};pttp.getBackgroundColor=function(){return this.callMethod("getBackgroundColor",arguments);};pttp.setBackgroundColor=function(){return this.callMethod("setBackgroundColor",arguments);};pttp.getBackgroundImage=function(){return this.callMethod("getBackgroundImage",arguments);};pttp.setBackgroundImage=function(){return this.callMethod("setBackgroundImage",arguments);};pttp.getGutter=function(){return this.callMethod("getGutter",arguments);};pttp.setGutter=function(){return this.callMethod("setGutter",arguments);};pttp.getPadding=function(){return this.callMethod("getPadding",arguments);};pttp.setPadding=function(){return this.callMethod("setPadding",arguments);};pttp.appendChild=function(){return this.callMethod("appendChild",arguments);};pttp.insertChildAt=function(){return this.callMethod("insertChildAt",arguments);};pttp.removeChildByID=function(){return this.callMethod("removeChildByID",arguments);};pttp.getNumChildren=function(){return this.callMethod("getNumChildren",arguments);};pttp.removeChildAt=function(){return this.callMethod("removeChildAt",arguments);};pttp.getChildAt=function(){var pObj=this.callMethod("getChildAtJS",arguments);if(pObj){return this.getComponentAPI(pObj.elementName,pObj.elementID);}
return null;};BCComponentModules["Link"]=LinkAPI;function LinkAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=LinkAPI.prototype=new UIObjectAPI();pttp.setText=function(){return this.callMethod("setText",arguments);};pttp.getText=function(){return this.callMethod("getText",arguments);};pttp.setAutoSize=function(){return this.callMethod("setAutoSize",arguments);};pttp.getAutoSize=function(){return this.callMethod("getAutoSize",arguments);};pttp.setFont=function(){return this.callMethod("setFont",arguments);};pttp.getFont=function(){return this.callMethod("getFont",arguments);};pttp.setTextSize=function(){return this.callMethod("setTextSize",arguments);};pttp.getTextSize=function(){return this.callMethod("getTextSize",arguments);};pttp.getHAlign=function(){return this.callMethod("getHAlign",arguments);};pttp.setHAlign=function(){return this.callMethod("setHAlign",arguments);};pttp.getVAlign=function(){return this.callMethod("getVAlign",arguments);};pttp.setVAlign=function(){return this.callMethod("setVAlign",arguments);};pttp.setMultiline=function(){return this.callMethod("setMultiline",arguments);};pttp.getMultiline=function(){return this.callMethod("getMultiline",arguments);};pttp.getURL=function(){return this.callMethod("getURL",arguments);};pttp.setURL=function(){return this.callMethod("setURL",arguments);};pttp.getTooltip=function(){return this.callMethod("getTooltip",arguments);};pttp.setTooltip=function(){return this.callMethod("setTooltip",arguments);};BCComponentModules["List"]=ListAPI;function ListAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=ListAPI.prototype=new UIObjectAPI();pttp.setSelectedIndex=function(){return this.callMethod("setSelectedIndex",arguments);};pttp.getSelectedIndex=function(){return this.callMethod("getSelectedIndex",arguments);};pttp.previous=function(){return this.callMethod("previous",arguments);};pttp.next=function(){return this.callMethod("next",arguments);};pttp.scrollTo=function(){return this.callMethod("scrollTo",arguments);};pttp.getSelectedData=function(){return this.callMethod("getSelectedData",arguments);};pttp.getDataAtIndex=function(){return this.callMethod("getDataAtIndex",arguments);};pttp.getData=function(){return this.callMethod("getData",arguments);};pttp.setData=function(){return this.callMethod("setData",arguments);};pttp.showPlaylist=function(){return this.callMethod("showPlaylist",arguments);};pttp.getNumItems=function(){return this.callMethod("getNumItems",arguments);};pttp.getAutomaticAdvance=function(){return this.callMethod("getAutomaticAdvance",arguments);};pttp.setAutomaticAdvance=function(){return this.callMethod("setAutomaticAdvance",arguments);};pttp.getScrollerWidth=function(){return this.callMethod("getScrollerWidth",arguments);};pttp.setScrollerWidth=function(){return this.callMethod("setScrollerWidth",arguments);};pttp.getScrollerInset=function(){return this.callMethod("getScrollerInset",arguments);};pttp.setScrollerInset=function(){return this.callMethod("setScrollerInset",arguments);};pttp.getItemLeading=function(){return this.callMethod("getItemLeading",arguments);};pttp.setItemLeading=function(){return this.callMethod("setItemLeading",arguments);};pttp.getItemInsetH=function(){return this.callMethod("getItemInsetH",arguments);};pttp.setItemInsetH=function(){return this.callMethod("setItemInsetH",arguments);};pttp.getItemInsetV=function(){return this.callMethod("getItemInsetV",arguments);};pttp.setItemInsetV=function(){return this.callMethod("setItemInsetV",arguments);};pttp.getRowHeight=function(){return this.callMethod("getRowHeight",arguments);};pttp.setRowHeight=function(){return this.callMethod("setRowHeight",arguments);};BCComponentModules["LiveButton"]=ButtonAPI;BCComponentModules["Mask"]=MaskAPI;function MaskAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=MaskAPI.prototype=new UIObjectAPI();BCComponentModules["MediaControls"]=MediaControlsAPI;function MediaControlsAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=MediaControlsAPI.prototype=new ContainerAPI();BCComponentModules["Playhead"]=PlayheadAPI;function PlayheadAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=PlayheadAPI.prototype=new UIObjectAPI();pttp.getSliderWidth=function(){return this.callMethod("getSliderWidth",arguments);};pttp.setSliderWidth=function(){return this.callMethod("setSliderWidth",arguments);};pttp.getAutohideSlider=function(){return this.callMethod("getAutohideSlider",arguments);};pttp.setAutohideSlider=function(){return this.callMethod("setAutohideSlider",arguments);};if(BCLoaderEvent==undefined){var BCLoaderEvent={};BCLoaderEvent.PROGRESS="loaderProgress";BCLoaderEvent.INIT="loaderInit";BCLoaderEvent.COMPLETE="loaderComplete";BCLoaderEvent.ERROR="loaderError";}
if(BCLoaderState==undefined){var BCLoaderState={};BCLoaderState.DEFAULT="default";BCLoaderState.LOADING="loading";BCLoaderState.LOADED="loaded";BCLoaderState.ERROR="error";}
BCComponentModules["SWFLoader"]=SWFLoaderAPI;function SWFLoaderAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=SWFLoaderAPI.prototype=new UIObjectAPI();pttp.getState=function(){return this.callMethod("getState",arguments);}
pttp.setSource=function(){return this.callMethod("setSource",arguments);};pttp.getSource=function(){return this.callMethod("getSource",arguments);};pttp.callSWFMethod=function(){return this.callMethod("callSWFMethod",arguments);};BCComponentModules["TabBar"]=TabBarAPI;function TabBarAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=TabBarAPI.prototype=new UIObjectAPI();pttp.setSelectedIndex=function(){return this.callMethod("setSelectedIndex",arguments);};pttp.getSelectedIndex=function(){return this.callMethod("getSelectedIndex",arguments);};pttp.getSelectedData=function(){return this.callMethod("getSelectedData",arguments);};pttp.getDataAtIndex=function(){return this.callMethod("getDataAtIndex",arguments);};pttp.getData=function(){return this.callMethod("getData",arguments);};pttp.setData=function(){return this.callMethod("setData",arguments);};pttp.getNumItems=function(){return this.callMethod("getNumItems",arguments);};pttp.getAutoSizeTabs=function(){return this.callMethod("getAutoSizeTabs",arguments);};pttp.setAutoSizeTabs=function(){return this.callMethod("setAutoSizeTabs",arguments);};pttp.getTabWidth=function(){return this.callMethod("getTabWidth",arguments);};pttp.setTabWidth=function(){return this.callMethod("setTabWidth",arguments);};pttp.getLabelBuffer=function(){return this.callMethod("getLabelBuffer",arguments);};pttp.setLabelBuffer=function(){return this.callMethod("setLabelBuffer",arguments);};pttp.getLabelField=function(){return this.callMethod("getLabelField",arguments);};pttp.setLabelField=function(){return this.callMethod("setLabelField",arguments);};pttp.getTabPadding=function(){return this.callMethod("getTabPadding",arguments);};pttp.setTabPadding=function(){return this.callMethod("setTabPadding",arguments);};pttp.getTabAlign=function(){return this.callMethod("getTabAlign",arguments);};pttp.setTabAlign=function(){return this.callMethod("setTabAlign",arguments);};pttp.getIncludeMenu=function(){return this.callMethod("getIncludeMenu",arguments);};pttp.setIncludeMenu=function(){return this.callMethod("setIncludeMenu",arguments);};pttp.getMenuWidth=function(){return this.callMethod("getMenuWidth",arguments);};pttp.setMenuWidth=function(){return this.callMethod("setMenuWidth",arguments);};pttp.getMenuRowHeight=function(){return this.callMethod("getMenuRowHeight",arguments);};pttp.setMenuRowHeight=function(){return this.callMethod("setMenuRowHeight",arguments);};pttp.getMenuItemInset=function(){return this.callMethod("getMenuItemInset",arguments);};pttp.setMenuItemInset=function(){return this.callMethod("setMenuItemInset",arguments);};pttp.getMaxMenuRows=function(){return this.callMethod("getMaxMenuRows",arguments);};pttp.setMaxMenuRows=function(){return this.callMethod("setMaxMenuRows",arguments);};pttp.getHideSingleTab=function(){return this.callMethod("getHideSingleTab",arguments);};pttp.setHideSingleTab=function(){return this.callMethod("setHideSingleTab",arguments);};pttp.appendTab=function(){return this.callMethod("appendTab",arguments);};pttp.insertTabAt=function(){return this.callMethod("insertTabAt",arguments);};pttp.replaceTabAt=function(){return this.callMethod("replaceTabAt",arguments);};pttp.removeTabAt=function(){return this.callMethod("removeTabAt",arguments);};BCComponentModules["TextRegion"]=TextRegionAPI;function TextRegionAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=TextRegionAPI.prototype=new ContainerAPI();BCComponentModules["TileList"]=TileListAPI;function TileListAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=TileListAPI.prototype=new UIObjectAPI();pttp.setSelectedIndex=function(){return this.callMethod("setSelectedIndex",arguments);};pttp.getSelectedIndex=function(){return this.callMethod("getSelectedIndex",arguments);};pttp.getSelectedData=function(){return this.callMethod("getSelectedData",arguments);};pttp.getDataAtIndex=function(){return this.callMethod("getDataAtIndex",arguments);};pttp.getData=function(){return this.callMethod("getData",arguments);};pttp.setData=function(){return this.callMethod("setData",arguments);};pttp.showPlaylist=function(){return this.callMethod("showPlaylist",arguments);};pttp.previous=function(){return this.callMethod("previous",arguments);};pttp.next=function(){return this.callMethod("next",arguments);};pttp.getNumItems=function(){return this.callMethod("getNumItems",arguments);};pttp.getAutomaticAdvance=function(){return this.callMethod("getAutomaticAdvance",arguments);};pttp.setAutomaticAdvance=function(){return this.callMethod("setAutomaticAdvance",arguments);};pttp.getButtonOffsetX=function(){return this.callMethod("getButtonOffsetX",arguments);};pttp.setButtonOffsetX=function(){return this.callMethod("setButtonOffsetX",arguments);};pttp.getButtonOffsetY=function(){return this.callMethod("getButtonOffsetY",arguments);};pttp.setButtonOffsetY=function(){return this.callMethod("setButtonOffsetY",arguments);};pttp.getButtonSize=function(){return this.callMethod("getButtonSize",arguments);};pttp.setButtonSize=function(){return this.callMethod("setButtonSize",arguments);};pttp.getNumRows=function(){return this.callMethod("getNumRows",arguments);};pttp.setNumRows=function(){return this.callMethod("setNumRows",arguments);};pttp.getNumColumns=function(){return this.callMethod("getNumColumns",arguments);};pttp.setNumColumns=function(){return this.callMethod("setNumColumns",arguments);};pttp.getRowHeight=function(){return this.callMethod("getRowHeight",arguments);};pttp.setRowHeight=function(){return this.callMethod("setRowHeight",arguments);};pttp.getColumnWidth=function(){return this.callMethod("getColumnWidth",arguments);};pttp.setColumnWidth=function(){return this.callMethod("setColumnWidth",arguments);};pttp.getColumnGutter=function(){return this.callMethod("getColumnGutter",arguments);};pttp.setColumnGutter=function(){return this.callMethod("setColumnGutter",arguments);};pttp.getRowGutter=function(){return this.callMethod("getRowGutter",arguments);};pttp.setRowGutter=function(){return this.callMethod("setRowGutter",arguments);};pttp.getContentInsetV=function(){return this.callMethod("getContentInsetV",arguments);};pttp.setContentInsetV=function(){return this.callMethod("setContentInsetV",arguments);};pttp.getContentInsetH=function(){return this.callMethod("getContentInsetH",arguments);};pttp.setContentInsetH=function(){return this.callMethod("setContentInsetH",arguments);};pttp.setScrollDirection=function(){return this.callMethod("setScrollDirection",arguments);};pttp.getScrollDirection=function(){return this.callMethod("getScrollDirection",arguments);};pttp.getAnimationType=function(){return this.callMethod("getAnimationType",arguments);};pttp.setAnimationType=function(){return this.callMethod("setAnimationType",arguments);};pttp.getUseBlur=function(){return this.callMethod("getUseBlur",arguments);};pttp.setUseBlur=function(){return this.callMethod("setUseBlur",arguments);};pttp.showPage=function(){return this.callMethod("showPage",arguments);};pttp.showNextPage=function(){return this.callMethod("showNextPage",arguments);};pttp.showPreviousPage=function(){return this.callMethod("showPreviousPage",arguments);};pttp.getPageIndex=function(){return this.callMethod("getPageIndex",arguments);};pttp.getNumPages=function(){return this.callMethod("getNumPages",arguments);};pttp.getCenterContent=function(){return this.callMethod("getCenterContent",arguments);};pttp.setCenterContent=function(){return this.callMethod("setCenterContent",arguments);};pttp.getColumnCount=function(){return this.callMethod("getColumnCount",arguments);};pttp.getRowCount=function(){return this.callMethod("getRowCount",arguments);};BCComponentModules["TitleLabel"]=TitleLabelAPI;function TitleLabelAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=TitleLabelAPI.prototype=new UIObjectAPI();pttp.setText=function(){return this.callMethod("setText",arguments);};pttp.getText=function(){return this.callMethod("getText",arguments);};pttp.setFont=function(){return this.callMethod("setFont",arguments);};pttp.getFont=function(){return this.callMethod("getFont",arguments);};pttp.setTextSize=function(){return this.callMethod("setTextSize",arguments);};pttp.getTextSize=function(){return this.callMethod("getTextSize",arguments);};pttp.getHAlign=function(){return this.callMethod("getHAlign",arguments);};pttp.setHAlign=function(){return this.callMethod("setHAlign",arguments);};pttp.getVAlign=function(){return this.callMethod("getVAlign",arguments);};pttp.setVAlign=function(){return this.callMethod("setVAlign",arguments);};pttp.setAutoSize=function(){return this.callMethod("setAutoSize",arguments);};pttp.getAutoSize=function(){return this.callMethod("getAutoSize",arguments);};pttp.setTruncate=function(){return this.callMethod("setTruncate",arguments);};pttp.getTruncate=function(){return this.callMethod("getTruncate",arguments);};pttp.setMultiline=function(){return this.callMethod("setMultiline",arguments);};pttp.getMultiline=function(){return this.callMethod("getMultiline",arguments);};pttp.getIsTruncated=function(){return this.callMethod("getIsTruncated",arguments);};pttp.getTextWidth=function(){return this.callMethod("getTextWidth",arguments);};pttp.getSelected=function(){return this.callMethod("getSelected",arguments);};pttp.setSelected=function(){return this.callMethod("setSelected",arguments);};BCComponentModules["ToggleButton"]=ToggleButtonAPI;function ToggleButtonAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=ToggleButtonAPI.prototype=new ButtonAPI();pttp.getToggledLabel=function(){return this.callMethod("getToggledLabel",arguments);};pttp.setToggledLabel=function(){return this.callMethod("setToggledLabel",arguments);};pttp.getToggledTooltip=function(){return this.callMethod("getToggledTooltip",arguments);};pttp.setToggledTooltip=function(){return this.callMethod("setToggledTooltip",arguments);};pttp.getToggledIconName=function(){return this.callMethod("getToggledIconName",arguments);};pttp.setToggledIconName=function(){return this.callMethod("setToggledIconName",arguments);};pttp.getIsToggled=function(){return this.callMethod("getIsToggled",arguments);};pttp.setIsToggled=function(){return this.callMethod("setIsToggled",arguments);};BCComponentModules["ViewStack"]=ViewStackAPI;function ViewStackAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=ViewStackAPI.prototype=new LayoutBoxAPI();pttp.getSelectedIndex=function(){return this.callMethod("getSelectedIndex",arguments);};pttp.setSelectedIndex=function(){return this.callMethod("setSelectedIndex",arguments);};pttp.getSelectedItemID=function(){return this.callMethod("getSelectedItemID",arguments);};pttp.setSelectedItemID=function(){return this.callMethod("setSelectedItemID",arguments);};BCComponentModules["VolumeControl"]=VolumeControlAPI;function VolumeControlAPI(pExperience,pCallback,pElementID){this.experience=pExperience;this.callback=pCallback;this.elementID=pElementID;}
var pttp=VolumeControlAPI.prototype=new UIObjectAPI();pttp.getShowBack=function(){return this.callMethod("getShowBack",arguments);};pttp.setShowBack=function(){return this.callMethod("setShowBack",arguments);};pttp.getTooltip=function(){return this.callMethod("getTooltip",arguments);};pttp.setTooltip=function(){return this.callMethod("setTooltip",arguments);};pttp.getIconScale=function(){return this.callMethod("getIconScale",arguments);};pttp.setIconScale=function(){return this.callMethod("setIconScale",arguments);};pttp.getIconOffsetX=function(){return this.callMethod("getIconOffsetX",arguments);};pttp.setIconOffsetX=function(){return this.callMethod("setIconOffsetX",arguments);};pttp.getIconOffsetY=function(){return this.callMethod("getIconOffsetY",arguments);};pttp.setIconOffsetY=function(){return this.callMethod("setIconOffsetY",arguments);};pttp.getIconAlignmentH=function(){return this.callMethod("getIconAlignmentH",arguments);};pttp.setIconAlignmentH=function(){return this.callMethod("setIconAlignmentH",arguments);};pttp.getIconAlignmentV=function(){return this.callMethod("getIconAlignmentV",arguments);};pttp.setIconAlignmentV=function(){return this.callMethod("setIconAlignmentV",arguments);};pttp.getIconName=function(){return this.callMethod("getIconName",arguments);};pttp.setIconName=function(){return this.callMethod("setIconName",arguments);};pttp.getMutedTooltip=function(){return this.callMethod("getMutedTooltip",arguments);};pttp.setMutedTooltip=function(){return this.callMethod("setMutedTooltip",arguments);};pttp.getMutedIconName=function(){return this.callMethod("getMutedIconName",arguments);};pttp.setMutedIconName=function(){return this.callMethod("setMutedIconName",arguments);};pttp.getIsToggled=function(){return this.callMethod("getIsToggled",arguments);};pttp.setIsToggled=function(){return this.callMethod("setIsToggled",arguments);};pttp.getSliderHeight=function(){return this.callMethod("getSliderHeight",arguments);};pttp.setSliderHeight=function(){return this.callMethod("setSliderHeight",arguments);};pttp.getPopupHeight=function(){return this.callMethod("getPopupHeight",arguments);};pttp.setPopupHeight=function(){return this.callMethod("setPopupHeight",arguments);};pttp.getHorizontalPadding=function(){return this.callMethod("getHorizontalPadding",arguments);};pttp.setHorizontalPadding=function(){return this.callMethod("setHorizontalPadding",arguments);};pttp.getVerticalPadding=function(){return this.callMethod("getVerticalPadding",arguments);};pttp.setVerticalPadding=function(){return this.callMethod("setVerticalPadding",arguments);};pttp.getDirection=function(){return this.callMethod("getDirection",arguments);};pttp.setDirection=function(){return this.callMethod("setDirection",arguments);};pttp.getAnimated=function(){return this.callMethod("getAnimated",arguments);};pttp.setAnimated=function(){return this.callMethod("setAnimated",arguments);};;
/**
* Handles always selecting the highest rendition when the player determines a new rendition can be played.
*/

var _player;
var _experienceModule;

/**
* Event handler for when the player the player first loads.
*
* @param  id  The HTML ID of the player.
*/
function onTemplateLoaded(id) {
    _player = brightcove.getExperience(id);
    _experienceModule = _player.getModule("experience");
    _experienceModule.addEventListener("templateReady", onTemplateReady);
	var videoPlayer = _player.getModule("videoPlayer");
    if (videoPlayer) {
        // set callback function for rendition selection
        videoPlayer.setRenditionSelectionCallback(selectRendition);
    }
}

/**
* Event handler for when the player is ready for interaction.
*
* @param  event  Event dispatched by player experience module.
*/
function onTemplateReady(event) {
    _experienceModule.removeEventListener("templateReady", onTemplateReady);
}

/**
* The callback invoked whenever the player reaches a point when a new selection can be selected. This will occur on initial playback
* as well, for streaming videos, when there are multiple buffering events or when the screen size changed, as when going full screen.
* This method must take an object as an argument and return an int value that represents the index of the rendition to play.
* If the renditionIndex value returned is -1, or any other value that doesn't correspond to the index of an available rendition, the
* player recalculates which rendition to use, using the normal selection algorithm.
*
* @param  context  The context that the player uses to select a new rendition. This object includes the following properties:
*           video  The video currently playing to which the renditions belong.
*           currentRendition  The currently selected rendition for the video.
*           renditions  An Array of renditions for the video to choose from.
*           detectedBandwidth  The last detected bandwidth value.
*           screenWidth  The pixel width of the video screen in which the rendition will play.
*           screenHeight  The pixel height of the video screen in which the rendition will play.
*
* @returns  The index of the rendition in the renditions list for the video player to play.
*/
function selectRendition(context) {
    var renditions = context.renditions;
    var renditionIndex = -1;
    var size = 0;
    for (var i = 0; i < renditions.length; i++) {
        // set the rendition index for the rendition with the largest size
        if (renditions[i].size > size) {
            size = renditions[i].size;
            renditionIndex = i;
        }
    }
    return renditionIndex;
}

/**
* Traces out the values of rendition for testing.
*
* @param  rendition  The rendition to traces values for.
* @param  index  The index in the renditions array where this rendition is found.
*/
function describeRendition(rendition) {
    var message = ("size: " + rendition.size);
    message += ("\nframeWidth: " + rendition.frameWidth);
    message += ("\nframeHeight: " + rendition.frameHeight);
    message += ("\nencodingRate: " + rendition.encodingRate);
    alert(message);
};
/**

 * @Author Robert Powell

 Multi-Frame Tweaks added by Travis Grasser(TSG), 10/30/2008

*/
var xmlScrollView = function()
{
  this.outputElement = '';
  this.output        = '';
  this.wrappers      = new Array();
  this.tags          = new Array();
  this.tagValues     = new Array();
  this.conditionals  = new Array();
  this.items         = new Array();
  this.itemRoot      = '';
  this.queryString   = new Array();
  this.topPadding    = true;
  this.bottomPadding = true;
  this.limit         = false;
  this.scroll        = true;
  this.scrollDelay   = 25;
  this.scrollBalancer = false;
  this.scrollIntermittent = false;

  this.outputFromJSXMLProxy = function(stringVar, url)
  {
    var theHead    = document.getElementsByTagName('head').item(0);
    var theScript  = document.createElement("script");
    theScript.type = "text/javascript";
    theScript.src  = url;
    theHead.appendChild(theScript);
    var xmlScrollViewInstance = this;
    var myFunction = function() { xmlScrollViewInstance.outputFromString(eval(stringVar)); }
    window.onload = myFunction;
  };

  this.outputFromString = function(xmlString)
  {
    if (window.ActiveXObject)
    {
      this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      this.xmlDoc.async=false;
      this.xmlDoc.loadXML(xmlString);
    }
    else
    {
      var parser=new DOMParser();
      this.xmlDoc=parser.parseFromString(xmlString,"text/xml");
    }
    this.doOutput();
  };

  this.outputFromPath = function(xmlPath)
  {
      for(i=0;i<this.queryString.length;i++)
      {
        if(xmlPath.search(/\?/) == -1)
        {
          xmlPath += '?';
        }
      value = this.getUrlValue(this.queryString[i]);
      if(value != "") xmlPath += '&' + this.queryString[i+1] +'=' + value;
      i++;
    }

    if (document.implementation && document.implementation.createDocument)
    {
        this.xmlDoc = document.implementation.createDocument("", "", null);
    }
    else if(window.ActiveXObject) // IE
    {
        this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    }
    else
    {
        return false;
    }
    this.xmlDoc.async = false;
    this.xmlDoc.load(xmlPath);
    this.doOutput();
  };

  this.doOutput = function()
  {
    this.build(this.xmlDoc.documentElement);
    this.parse();
    this.write();

    if(this.scroll)
    {
      this.initScroll();
    }
  };

  this.build = function(tree)
  {
    if(tree.tagName == this.itemRoot)
    {
      if(this.limit && this.items.length === this.limit)
      {
        return;
      }
      this.items[this.items.length] = tree.tagName;
    }
    else if(this.array_key_exists(tree.tagName, this.tags))
    {
      if(tree.childNodes[0] && tree.childNodes[0].nodeValue)
      {
        this.tagValues[tree.tagName][this.tagValues[tree.tagName].length] = tree.childNodes[0].nodeValue;
      }
      else
      {
        this.tagValues[tree.tagName][this.tagValues[tree.tagName].length] = '';
      }
    }

    for(var i=0;i<tree.childNodes.length; i++)
    {
      this.build(tree.childNodes[i])
    }
  }

  this.parse = function()
  {
    for(i=0;i<this.items.length;i++)
    {
      if(this.wrappers.length)
      {
        for(position in this.wrappers)
        {
          // We need to close the previous one
          if(i != 0 && i % position == 0 && (this.wrappers[position][3] == (i - position)))
          {
            this.output += this.wrappers[position][1];
          }

          // We need to open a new one
          if(i % position == 0 || position === 0)
          {
            this.output += this.wrappers[position][0];
            this.wrappers[position][3] = i;
          }
        }
      }

      for(keyVar in this.items)
      {
        var template = this.template;

        for(varKey in this.tags)
        {
          // prototype.js stupidly extends Array.prototype which causes key's to come up in a for loop.
          if(!this.tags.hasOwnProperty(varKey))
          {
            continue;
          }
          var replacement = this.tagValues[varKey][i];
          if(this.array_key_exists(varKey, this.conditionals) && this.trim(this.tagValues[varKey][i]) != '')
          {
            replacement = this.conditionals[varKey][0] + replacement + this.conditionals[varKey][1];
          }
          var search = new RegExp(this.tags[varKey], 'g');
          template = template.replace(search, replacement);
        }
      }
      if(i === 0 && this.scrollIntermittent)
      {
        this.scrollBalancer = template;
      }
      this.output += template;
    }

    // Wrappers are never closed at the end
    if(this.wrappers.length)
    {
      for(position in this.wrappers)
      {
        this.output += this.wrappers[position][1];
      }
    }
  };

  this.write = function()
  {
    if(this.topPadding)
    {
      this.output = '<div style="height:' + this.outputElement.style.height + ';"></div>'  + this.output;
    }

    if(this.bottomPadding)
    {
       this.output += '<div style="height:' + this.outputElement.style.height + ';"></div>';
    }

    if(this.scrollIntermittent)
    {
      // Adds the first item to the bottom so we can get a clean intermittent scroll
      this.output += this.scrollBalancer;
    }
    this.outputElement.innerHTML = this.output;
  }

  this.setOutPutElement = function(element)
  {
    this.outputElement = document.getElementById(element);
    this.outputElementId = element;
  };

  this.setTemplate = function(template)
  {
    this.template = template;
  };

  this.setItemRoot = function(root)
  {
    this.itemRoot = root;
  };

  this.declareVariable = function(tag, variable)
  {
    this.tags[tag] = variable;
    this.tagValues[tag] = new Array();
  };

  this.declareConditionalVariable = function(tag, variable, pre, post)
  {
    this.tags[tag] = variable;
    this.tagValues[tag] = new Array();
    this.conditionals[tag] = new Array(pre, post);
  };

  this.addWrapper = function(position, pre, post)
  {
    this.wrappers[position] = new Array(pre,post,0);
  };

  this.setLimit = function(limit)
  {
    this.limit = limit;
  };



  this.initScroll = function()
  {
    this.scroller = new scroller();
    this.scroller.setElementId(this.outputElementId);
    this.scroller.setScrollDelay(this.scrollDelay);
    this.scroller.setPauseDelay(this.scrollIntermittent);

    if(this.scrollIntermittent)
    {
      this.scroller.startIntermittent(this.scrollIntermittent);
    }
    else
    {
      this.scroller.startScroll();
    }
  };

  this.setScrollIntermittent = function(frequency)
  {
    this.scrollIntermittent = frequency * 1000;
    this.disablePadding();
  };

  this.setScrollDelay = function(delay)
  {
    this.scrollDelay = delay;
  };
  
  this.disableScroll = function()
  {
    this.scroll = false;
    this.disablePadding();
  };

  this.disablePadding = function()
  {
    this.topPadding    = false;
    this.bottomPadding = false;
  };

  this.disableTopPadding = function()
  {
    this.topPadding = false;
  };

  this.disableBottomPadding = function()
  {
    this.bottomPadding = false;
  };

  this.addQueryStringMap = function(key, map)
  {
    // Done like this for a bug in prototype js framework
    this.queryString[this.queryString.length] = key;
    this.queryString[this.queryString.length] = map;
  };

  this.array_key_exists = function(needle, haystack)
  {
    for (keyVar in haystack)
    {
      if (keyVar === needle) return true;
    }
    return false;
  };

  this.trim = function(string)
  {
    if (string) {
        return string.replace(/^\s+|\s+$/g,"");
    }
    return '';
  };

  this.getUrlValue = function(key)
  {
    key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+key+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
    {
      return "";
    }
    else
    {
      return results[1];
    }
  };
};

var scroller = function()
{
  this.element        = '';
  this.elementHeight  = '';
  this.scrollDelay    = 25;
  this.pauseDelay     = 5000;
  this.setupDelayOne  = false;
  this.setupDelayOTwo = false;
  this.scrollInterval = false; // Internal timer
  this.pauseInterval  = null; // Internlal timer
  this.init = function(elementId, scrollDelay, pauseDelay)
  {
    this.setElementId(elementId);
    this.setScrollDelay(scrollDelay);
    this.setPauseDelay(pauseDelay * 1000);

  };

  this.setElementId = function(elementId)
  {
    this.element = document.getElementById(elementId);
    this.elementHeight = parseInt(this.element.style.height); // optimization
  };

  this.setScrollDelay = function(scrollDelay)
  {
    this.scrollDelay = scrollDelay;
  };

  this.setPauseDelay = function(pauseDelay)
  {
    var scrollTime = this.elementHeight * this.scrollDelay;
    this.pauseDelay = pauseDelay + scrollTime;
  };

  this.startIntermittent = function(setup)
  {
    element = this.element;
    elementHight = this.elementHeight;
    scrollDelay = this.scrollDelay;
    //This var was moved up, out of the if section to allow for access on both parts of the condition --TSG
    instance = this;
    if(setup)
    {
      this.element.scrollTop = 0; // when refrshing the page or loading go to the top
      //Line changed to use moveTheFrame in new way --TSG
      this.setupDelayOne = setTimeout(function() {moveTheFrame(instance);}, setup);
      this.setupDelayTwo = setTimeout("instance.startIntermittent()", setup);
    }
    else
    {
      //Line changed to use moveTheFrame in new way --TSG
      this.pauseInterval = self.setInterval(function() {moveTheFrame(instance);}, this.pauseDelay);
    }
  };

  this.stopIntermittent = function()
  {
    if(this.setupDelayOne || this.setupDelayTwo)
    {
      clearTimeout(this.setupDelayOne);
      clearTimeout(this.setupDelayTwo);
    }
    clearInterval(this.pauseInterval);
  };

  //This method was rewritten --TSG
  this.startScroll = function()
  { 
        var obj = this;
        this.scrollInterval = setTimeout(function() {scrollTheFrame(obj);}, this.scrollDelay);;
  };

  //This method was rewritten --TSG
  this.stopScroll = function()
  {
    clearTimeout(this.scrollInterval);
  };

};

//This Function was rewritten --TSG
function moveTheFrame(obj)
{
  var i = 0;
  var scrollDelay = obj.scrollDelay;
  if(obj.element.scrollTop % obj.elementHeight)
  {
    obj.element.scrollTop = 0;
  }
  do
  {
    setTimeout( function() {scrollTheFrame(obj);}, scrollDelay);
    scrollDelay = scrollDelay*2;
    ++i;
  }
  while(i < obj.elementHeight);
}

//This function was rewritten --TSG
function scrollTheFrame(obj)
{
        clearTimeout(obj.scrollInterval);
        obj.element.scrollTop = obj.element.scrollTop >= obj.element.scrollHeight - obj.elementHeight ? 1 : obj.element.scrollTop + 1;
        obj.scrollInterval = setTimeout(function() {scrollTheFrame(obj);}, obj.scrollDelay);
}

;
/*
CSS Browser Selector v0.3.5 (Feb 05, 2010) remixed by Nobleskine with no-js/js handling
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors
*/
function css_browser_selector(u){var ua = u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1;},g='gecko',w='webkit',s='safari',o='opera',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?'mobile':is('iphone')?'iphone':is('ipod')?'ipod':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win':is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'']; c = b.join(' '); h.className=h.className.replace(/\bno-js\b/,'')+'js '+c; return c;}; css_browser_selector(navigator.userAgent);

/* Modernizr custom build of 1.7: rgba | touch */
window.Modernizr=function(a,b,c){function G(){}function F(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return!!E(d,b)}function E(a,b){for(var d in a)if(k[a[d]]!==c&&(!b||b(a[d],j)))return!0}function D(a,b){return(""+a).indexOf(b)!==-1}function C(a,b){return typeof a===b}function B(a,b){return A(o.join(a+";")+(b||""))}function A(a){k.cssText=a}var d="1.7",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v,w=function(a){var c=b.createElement("style"),d=b.createElement("div"),e;c.textContent=a+"{#modernizr{height:3px}}",h.appendChild(c),d.id="modernizr",g.appendChild(d),e=d.offsetHeight===3,c.parentNode.removeChild(c),d.parentNode.removeChild(d);return!!e},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div");var f=(d="on"+d)in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y=({}).hasOwnProperty,z;C(y,c)||C(y.call,c)?z=function(a,b){return b in a&&C(a.constructor.prototype[b],c)}:z=function(a,b){return y.call(a,b)},r.touch=function(){return"ontouchstart"in a||w("@media ("+o.join("touch-enabled),(")+"modernizr)")},r.rgba=function(){A("background-color:rgba(150,255,150,.5)");return D(k.backgroundColor,"rgba")};for(var H in r)z(r,H)&&(v=H.toLowerCase(),e[v]=r[H](),u.push((e[v]?"":"no-")+v));e.input||G(),e.crosswindowmessaging=e.postmessage,e.historymanagement=e.history,e.addTest=function(a,b){a=a.toLowerCase();if(!e[a]){b=!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b;return e}},A(""),j=l=null,e._enableHTML5=f,e._version=d,g.className=g.className.replace(/\bno-js\b/,"")+" js "+u.join(" ");return e}(this,this.document)

/*! $script.js v1.2
 https://github.com/polvero/script.js
 Copyright: @ded & @fat - Dustin Diaz, Jacob Thornton 2011
 License: CC Attribution: http://creativecommons.org/licenses/by/3.0/
*/
!function(a,b,c){function u(a){h.test(b[n])?c(function(){u(a)},50):a()}var d=b.getElementsByTagName("script")[0],e={},f={},g={},h=/in/,i={},j="string",k=!1,l="push",m="DOMContentLoaded",n="readyState",o="addEventListener",p="onreadystatechange",q=function(){return Array.every||function(a,b){for(var c=0,d=a.length;c<d;++c)if(!b(a[c],c,a))return 0;return 1}}(),r=function(a,b){q(a,function(c,d){return!b(c,d,a)})};!b[n]&&b[o]&&(b[o](m,function s(){b.removeEventListener(m,s,k),b[n]="complete"},k),b[n]="loading");var t=function(a,j,k){a=a[l]?a:[a];var m=j.call,o=m?j:k,s=m?a.join(""):j,u=a.length,v=function(a){return a.call?a():e[a]},w=function(){if(!--u){e[s]=1,o&&o();for(var a in g)q(a.split("|"),v)&&!r(g[a],v)&&(g[a]=[])}};if(!f[s]){c(function(){r(a,function(a){if(!i[a]){i[a]=f[s]=1;var c=b.createElement("script"),e=0;c.onload=c[p]=function(){c[n]&&!!h.test(c[n])||e||(c.onload=c[p]=null,e=1,w())},c.async=1,c.src=a,d.parentNode.insertBefore(c,d)}})},0);return t}};t.ready=function(a,b,c){a=a[l]?a:[a];var d=[];!r(a,function(a){e[a]||d[l](a)})&&q(a,function(a){return e[a]})?b():!function(a){g[a]=g[a]||[],g[a][l](b),c&&c(d)}(a.join("|"));return t},a.$script=t}(this,document,setTimeout)




;
$(document).ready(function() {
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear() + 1;

    if(Get_Cookie("visits_counter")) {
        var counter = parseFloat(Get_Cookie("visits_counter")) + 1;
        Set_Cookie("visits_counter", counter, "", "/", "", "");
    }

    if(Get_Cookie("visits_counter") == null) {
        Set_Cookie("visits_counter", "1", day+"."+month+"."+year, "/", "", "");
    }

    $("#nav .subscribe_popup #close_subscribe").click(function() {
        $(this).parent().css("display", "none");
    });

    $(".subscribe_block").mouseover(function() {
        $("#nav .subscribe_popup").css("display", "block");
    });

    $(".subscribe_block").mouseout(function() {
        $("#nav .subscribe_popup").css("display", "none");
    });

    if(Get_Cookie("visits_counter") % 20 == 0) {
        $("#nav .subscribe_popup").css("display", "block");
        Delete_Cookie("visits_counter", "/", "");
    }

    $("#nav .subscribe_block").bind("mouseover", function() {
        $("#nav .subscribe_popup").css("display", "block");
    });

    $("#nav .subscribe_block").bind("mouseleave",  function() {
        $("#nav .subscribe_popup").css("display", "none");
    });

    $("#comments").mouseover();

    if($.browser.msie && $.browser.version.substr(0,1) <= 7 && $.browser.version != 10) {
        $(function() {
            var zIndexNumber = 1000;
            $('div').each(function() {
                $(this).css('zIndex', zIndexNumber);
                zIndexNumber -= 10;
            });
        });
    }

    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('/');

        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    $("#article.columns #main .content > p:first").css("text-indent", "0").each(function() {
        var vars = getUrlVars();
        if(vars['3'] != 'sa-article') {
            var text = $(this).html();
            text = text.replace(/^\s\s*/, '');
            var first_letter = text.substr(0,1);
            if(/[a-zA-Z]/.test(first_letter)) {
                $(this).html('<span class="init-cap">' + first_letter + '</span>' + text.slice(1));
            } else if(!/[a-zA-Z]/.test(first_letter)) {
                first_letter = text.substr(0,2);
                $(this).html('<span class="init-cap">' + first_letter + '</span>' + text.slice(2));
            }
        }
    });

    var i = 1;
    $(".list.list-columns li").each(function() {
        $(this).find("a").first().attr("onclick", "_gaq.push(['_trackEvent', 'Column Module', 'Column"+i+"', '"+$(this).find('a').first().attr('href')+"']);");
        i++;
    });

    var k = 1;
    $("#header-content.cols").find(".col").each(function() {
        if(k == 1) {
            var lit = "L";
        } else if(k == 2) {
            var lit = "C";
        } else if(k == 3) {
            var lit = "R";
        }
        $(this).find("a").attr("onclick", "_gaq.push(['_trackEvent', 'Header Promo', 'Header"+lit+"', '"+$(this).find('a').attr('href')+"']);");
        k++;
    });

    var p = 1;
    $(".mod-content .node.story.published").each(function() {
        $(this).find("span.headline a").attr("onclick", "_gaq.push(['_trackEvent', 'Editor Pick', 'Pos"+p+"', '"+$(this).find("span.headline a").attr('href')+"']);");
        p++;
    });

    var t = 1;
    $(".list.list-feed li").each(function() {
        if($(this).hasClass("buzzed")) {
            var cas = "Buzzed" + t;
        } else if($(this).hasClass("breaking")) {
            var cas = "Breaking" + t;
        } else {
            var cas = t;
        }
        $(this).find("a").attr("onclick", "_gaq.push(['_trackEvent', 'The Feed', 'Pos"+cas+"', '"+$(this).find('a').attr('href')+"']);");
        t++;
    });

    /*$(".enlarge a").click(function() {
        var raw_img = $(".article.article-single .gallery-img .imagecache.imagecache-node-detail").attr("src");
        raw_img = raw_img.replace('imagecache/node-detail/', '');
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").attr("src", raw_img);
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("width");
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("height");
    });

    $(".next a").click(function() {
        var raw_img = $(".article.article-single .gallery-img .imagecache.imagecache-node-detail").attr("src");
        raw_img = raw_img.replace('imagecache/node-detail/', '');
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").attr("src", raw_img);
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("width");
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("height");
    });

    $(".prev a").click(function() {
        var raw_img = $(".article.article-single .gallery-img .imagecache.imagecache-node-detail").attr("src");
        raw_img = raw_img.replace('imagecache/node-detail/', '');
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").attr("src", raw_img);
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("width");
        $("#lightbox .gallery-media-shell .media .imagecache.imagecache-node-detail").removeAttr("height");
    });*/

    /*$(".mod.mod-gallery.mod-related-videos ul.list-x li .subheadline").each(function(index) {
        var position = $(this).position();
        var text = $(this).text();

        while($(this).height() + position.top > $(this).parent().outerHeight()) {
            text = text.substr(0, text.lastIndexOf(" ")) + "...";
        }

        $(this).html(text);
    });*/

    /*$(".embed-image-caption").each(function() {
        var el = $(this).prev().andSelf();
        if (el != null && el.is("img")) {
            el.andSelf().wrapAll("<div class=\"graph\" />");
        }
    });*/

    $("#post").mouseover(function() {
        $(".sharebar").css({
            "position": "relative",
            "z-index": "100"
        });
        $("#email_print_comments").css("display", "block");
        $(".ruler.meta").css("overflow", "visible ");
        $("#post .meta .share").css("overflow", "visible");
    });

    $("#post").mouseout(function() {
        $("#email_print_comments").css("display", "none");
        $(".ruler.meta").css("overflow", "hidden");
        $("#post .meta .share").css("overflow", "hidden");
    });

    $(".mod.mod-author .mod-content p iframe").css("width", "65px");

    $("img.hoverable").mouseover(function() {
        var image_source    = $(this).attr("src");
        var image_name      = image_source.replace(/^.*\//, '');
        var image_path      = image_source.replace(image_name, '');
        var image_name_type = image_name.split("_");

        if(image_name_type[0] == "normal") {
            $(this).hover().css("cursor", "pointer").attr("src", image_path + "hover_" + image_name_type[1]);
        }
    }).mouseout(function() {
        var image_source    = $(this).attr("src");
        var image_name      = image_source.replace(/^.*\//, '');
        var image_path      = image_source.replace(image_name, '');
        var image_name_type = image_name.split("_");

        if(image_name_type[0] == "hover") {
            $(this).hover().attr("src", image_path + "normal_" + image_name_type[1]);
        }
    });

    if ($('#newsletters-form').size())
    {
        if ($('#newsletters-form .select-box > .form-item > .messages.error').size())
        {
            $('#newsletters-form .select-box').first().before($('#newsletters-form .select-box > .form-item > .messages.error'));
        }
    }

    if ($("body#article.node-type-news-article").length) {
        var $nli = $("#main .colsAB .article-single .news-article-image")
        $nli.width($nli.find("img").width());
    }

/*
    if ($("body#article.node-type-news-article").length) {
        var $img = $("#main .article-footer .mod.mod-photo"),
            img_after_line = 5,
            line = 0;
        if ($img.length) {
            // if we have an image, lets put it under 5'th line of tex from the article begining
            //$img.remove();
            var $text = $img.parents(".article-single").find("p.google_elide").each(function() {
                var line_height = parseInt($(this).css("lineHeight")),
                    p_lines = $(this).height()/line_height;
                if (line+p_lines == img_after_line) {
                    //easiest case. just put image after current paragraph
                    $(this).after($img.css({float: "left", margin: "6px 10px 6px 0"}).remove());
                    return false;
                } else if (line+p_lines > img_after_line) {
                    var p_ = $(this).clone().html(''),
                        html = $(this).html(),
                        inside_tag = false,
                        tag = '',
                        first_lines_height = (img_after_line - line)*line_height,
                        i = 0;

                    $(this).after(p_);
                    while ((i < html.length) && (p_.height() <= first_lines_height)) {
                        // check tag begin
                        if ((html.charAt(i) == '<') || (html.charAt(i) == '&'))  {
                            tag = '';
                            inside_tag = true;
                        }

                        // increase either tag or html
                        if (inside_tag) {
                            tag += html.charAt(i);
                        } else {
                            p_.html(html.substr(0, i+1));
                        }

                        // check tag end
                        if ((html.charAt(i) == '>') || ((html.charAt(i) == ';') && inside_tag)) {
                            inside_tag = false;
                        }

                        i++;
                    }
                    // remove last char that creates new line
                    i--;
                    // roll back if we breake the word
                    var is_word = new RegExp('\\w', 'i');
                    if (is_word.test(html.charAt(i-1)) && is_word.test(html.charAt(i))) {
                        while (is_word.test(html.charAt(i-1)) && i > 0) i--;
                    }

                    // do the replacements
                    var img_html = '<span class="mod mod-photo" style="float: left; margin: 6px 10px 6px 0;">'+$img.html().replace('<p', '<span').replace('</p', '</span') +'</span>';
                    p_.html(html.substr(0, i)+img_html+html.substr(i));
                    $(this).replaceWith(p_.remove());

                    return false;
                } else {
                    // too early at the party. Keep moving
                    line += p_lines;
                }
            });
        }
    }
*/
});

$(function() {
    pathArray = window.location.pathname.split( '/' );
    page_title = pathArray[1];

    if(page_title == "power-local") {
        var headings_html = $(".headings").html();
        headings_html += '<img src="/sites/all/themes/aw/images/700x120_Presentedby.jpg" style="padding-bottom: 5px" />';
        $(".headings").empty().html(headings_html);
    }
});

function Set_Cookie(name, value, expires, path, domain, secure)
{
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime(today.getTime());

    /*
    if the expires variable is set, make the correct
    expires time, the current script below will set
    it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));

    document.cookie = name + "=" +escape(value) +
    ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
    ((path) ? ";path=" + path : "") +
    ((domain) ? ";domain=" + domain : "") +
    ((secure) ? ";secure" : "");
}

// this fixes an issue with the old method, ambiguous values
// with this test document.cookie.indexOf( name + "=" );
function Get_Cookie(check_name) {
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false; // set boolean t/f default f

    for (i = 0; i < a_all_cookies.length; i++) {
        // now we'll split apart each name=value pair
        a_temp_cookie = a_all_cookies[i].split( '=' );


        // and trim left/right whitespace while we're at it
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        // if the extracted name matches passed check_name
        if (cookie_name == check_name) {
            b_cookie_found = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if (a_temp_cookie.length > 1) {
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookie_value;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found) {
        return null;
    }
}

// this deletes the cookie when called
function Delete_Cookie(name, path, domain) {
    if (Get_Cookie(name)) document.cookie = name + "=" +
    ((path) ? ";path=" + path : "") +
    ((domain) ? ";domain=" + domain : "" ) +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
;
