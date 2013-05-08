/*Jquery Google analytics lightboxes js and cookie.js is here
i am doing it this way because we want to include  these files in the header rather than the footer
lightboxes and cookie javascript is used for the inpage interstitial while google analytics is called in the header too
 */

/*!
 * jQuery JavaScript Library v1.6
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
 * Date: Mon May 2 13:50:00 2011 -0400
 */
(function(a,b){function cw(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function ct(a){if(!ch[a]){var b=f("<"+a+">").appendTo("body"),d=b.css("display");b.remove();if(d==="none"||d===""){ci||(ci=c.createElement("iframe"),ci.frameBorder=ci.width=ci.height=0),c.body.appendChild(ci);if(!cj||!ci.createElement)cj=(ci.contentWindow||ci.contentDocument).document,cj.write("<!doctype><html><body></body></html>");b=cj.createElement(a),cj.body.appendChild(b),d=f.css(b,"display"),c.body.removeChild(ci)}ch[a]=d}return ch[a]}function cs(a,b){var c={};f.each(cn.concat.apply([],cn.slice(0,b)),function(){c[this]=a});return c}function cr(){co=b}function cq(){setTimeout(cr,0);return co=f.now()}function cg(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cf(){try{return new a.XMLHttpRequest}catch(b){}}function b_(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function b$(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bZ(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):bZ(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)bZ(a+"["+e+"]",b[e],c,d);else d(a,b)}function bY(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bY(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bY(a,c,d,e,"*",g));return l}function bX(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?bv:bw,e=b==="width"?a.offsetWidth:a.offsetHeight;if(c==="border")return e;f.each(d,function(){c||(e-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?e+=parseFloat(f.css(a,"margin"+this))||0:e-=parseFloat(f.css(a,"border"+this+"Width"))||0});return e}function bl(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval(b.text||b.textContent||b.innerHTML||""),b.parentNode&&b.parentNode.removeChild(b)}function bk(a){f.nodeName(a,"input")?bj(a):a.getElementsByTagName&&f.grep(a.getElementsByTagName("input"),bj)}function bj(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bi(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bh(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bg(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bf(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function W(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(R.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function V(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function N(a,b){return(a&&a!=="*"?a+".":"")+b.replace(z,"`").replace(A,"&")}function M(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(x,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function K(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function E(){return!0}function D(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){name="data-"+c.replace(j,"$1-$2").toLowerCase(),d=a.getAttribute(name);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(e){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function H(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(H,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=d.userAgent,x,y,z,A=Object.prototype.toString,B=Object.prototype.hasOwnProperty,C=Array.prototype.push,D=Array.prototype.slice,E=String.prototype.trim,F=Array.prototype.indexOf,G={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?g=[null,a,null]:g=i.exec(a);if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6",length:0,size:function(){return this.length},toArray:function(){return D.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?C.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),y.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(D.apply(this,arguments),"slice",D.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:C,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;y.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!y){y=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",z,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",z),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&H()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):G[A.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;if(a.constructor&&!B.call(a,"constructor")&&!B.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a);return c===b||B.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(b,c,d){a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),d=c.documentElement,(!d||!d.nodeName||d.nodeName==="parsererror")&&e.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:E?function(a){return a==null?"":E.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?C.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(F)return F.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=D.call(arguments,2),g=function(){return a.apply(c,f.concat(D.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(c,d){d&&d instanceof e&&!(d instanceof a)&&(d=a(d));return e.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){G["[object "+b+"]"]=b.toLowerCase()}),x=e.uaMatch(w),x.browser&&(e.browser[x.browser]=!0,e.browser.version=x.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?z=function(){c.removeEventListener("DOMContentLoaded",z,!1),e.ready()}:c.attachEvent&&(z=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",z),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g](h)}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b,d,e,f,g,h,i,j,k,l,m,n,o,p,q;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",b=a.getElementsByTagName("*"),d=a.getElementsByTagName("a")[0];if(!b||!b.length||!d)return{};e=c.createElement("select"),f=e.appendChild(c.createElement("option")),g=a.getElementsByTagName("input")[0],i={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.55$/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:g.value==="on",optSelected:f.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},g.checked=!0,i.noCloneChecked=g.cloneNode(!0).checked,e.disabled=!0,i.optDisabled=!f.disabled;try{delete a.test}catch(r){i.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function click(){i.noCloneEvent=!1,a.detachEvent("onclick",click)}),a.cloneNode(!0).fireEvent("onclick")),g=c.createElement("input"),g.value="t",g.setAttribute("type","radio"),i.radioValue=g.value==="t",g.setAttribute("checked","checked"),a.appendChild(g),j=c.createDocumentFragment(),j.appendChild(a.firstChild),i.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",k=c.createElement("body"),l={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};for(p in l)k.style[p]=l[p];k.appendChild(a),c.documentElement.appendChild(k),i.appendChecked=g.checked,i.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,i.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",i.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",m=a.getElementsByTagName("td"),q=m[0].offsetHeight===0,m[0].style.display="",m[1].style.display="none",i.reliableHiddenOffsets=q&&m[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(h=c.createElement("div"),h.style.width="0",h.style.marginRight="0",a.appendChild(h),i.reliableMarginRight=(parseInt(c.defaultView.getComputedStyle(h,null).marginRight,10)||0)===0),k.innerHTML="",c.documentElement.removeChild(k);if(a.attachEvent)for(p in{submit:1,change:1,focusin:1})o="on"+p,q=o in a,q||(a.setAttribute(o,"return;"),q=typeof a[o]=="function"),i[p+"Bubbles"]=q;return i}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([a-z])([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g=f.expando,h=typeof c=="string",i,j=a.nodeType,k=j?f.cache:a,l=j?a[f.expando]:a[f.expando]&&f.expando;if((!l||e&&l&&!k[l][g])&&h&&d===b)return;l||(j?a[f.expando]=l=++f.uuid:l=f.expando),k[l]||(k[l]={},j||(k[l].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?k[l][g]=f.extend(k[l][g],c):k[l]=f.extend(k[l],c);i=k[l],e&&(i[g]||(i[g]={}),i=i[g]),d!==b&&(i[c]=d);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[c]:i}},removeData:function(b,c,d){if(!!f.acceptData(b)){var e=f.expando,g=b.nodeType,h=g?f.cache:b,i=g?b[f.expando]:f.expando;if(!h[i])return;if(c){var j=d?h[i][e]:h[i];if(j){delete j[c];if(!l(j))return}}if(d){delete h[i][e];if(!l(h[i]))return}var k=h[i][e];f.support.deleteExpando||h!=a?delete h[i]:h[i]=null,k?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=k):g&&(f.support.deleteExpando?delete b[f.expando]:b.removeAttribute?b.removeAttribute(f.expando):b[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function l(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark";while(g--)if(tmp=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,tmp.done(l);l();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:data-|aria-)/,u=/\:/,v;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.addClass(a.call(this,b,c.attr("class")||""))});if(a&&typeof a=="string"){var b=(a||"").split(o);for(var c=0,d=this.length;c<d;c++){var e=this[c];if(e.nodeType===1)if(!e.className)e.className=a;else{var g=" "+e.className+" ",h=e.className;for(var i=0,j=b.length;i<j;i++)g.indexOf(" "+b[i]+" ")<0&&(h+=" "+b[i]);e.className=f.trim(h)}}}return this},removeClass:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.removeClass(a.call(this,b,c.attr("class")))});if(a&&typeof a=="string"||a===b){var c=(a||"").split(o);for(var d=0,e=this.length;d<e;d++){var g=this[d];if(g.nodeType===1&&g.className)if(a){var h=(" "+g.className+" ").replace(n," ");for(var i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){var d=f(this);d.toggleClass(a.call(this,c,d.attr("class"),b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;return(e.value||"").replace(p,"")}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||"set"in c&&c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b=a.selectedIndex,c=[],d=a.options,e=a.type==="select-one";if(b<0)return null;for(var g=e?b:0,h=e?b+1:d.length;g<h;g++){var i=d[g];if(i.selected&&(f.support.optDisabled?!i.disabled:i.getAttribute("disabled")===null)&&(!i.parentNode.disabled||!f.nodeName(i.parentNode,"optgroup"))){value=f(i).val();if(e)return value;c.push(value)}}if(e&&!c.length&&d.length)return f(d[b]).val();return c},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex",readonly:"readOnly"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);var h,i,j=g!==1||!f.isXMLDoc(a);c=j&&f.attrFix[c]||c,i=f.attrHooks[c]||(v&&(f.nodeName(a,"form")||u.test(c))?v:b);if(d!==b){if(d===null||d===!1&&!t.test(c)){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;d===!0&&!t.test(c)&&(d=c),a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j)return i.get(a,c);h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){a.nodeType===1&&(b=f.attrFix[b]||b,f.support.getSetAttribute?a.removeAttribute(b):(f.attr(a,b,""),a.removeAttributeNode(a.getAttributeNode(b))))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.getAttribute("value");a.setAttribute("type",b),c&&(a.value=c);return b}}},tabIndex:{get:function(a){var c=a.getAttributeNode("tabIndex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}}},propFix:{},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);c=i&&f.propFix[c]||c,h=f.propHooks[c];return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==b?g:a[c]},propHooks:{}}),f.support.getSetAttribute||(f.attrFix=f.extend(f.attrFix,{"for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder"}),v=f.attrHooks.name=f.attrHooks.value=f.valHooks.button={get:function(a,c){var d;if(c==="value"&&!f.nodeName(a,"button"))return a.getAttribute(c);d=a.getAttributeNode(c);return d&&d.specified?d.nodeValue:b},set:function(a,b,c){var d=a.getAttributeNode(c);if(d){d.nodeValue=b;return b}}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var w=Object.prototype.hasOwnProperty,x=/\.(.*)$/,y=/^(?:textarea|input|select)$/i,z=/\./g,A=/ /g,B=/[^\w\s.|`]/g,C=function(a){return a.replace(B,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=D;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=D);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),C).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,N(a.origType,a.selector),f.extend({},a,{handler:M,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,N(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?E:D):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=E;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=E;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=E,this.stopPropagation()},isDefaultPrevented:D,isPropagationStopped:D,isImmediatePropagationStopped:D};var F=function(a){var b=a.relatedTarget;try{if(b&&b!==c&&!b.parentNode)return;while(b&&b!==this)b=b.parentNode;b!==this&&(a.type=a.data,f.event.handle.apply(this,arguments))}catch(d){}},G=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?G:F,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?G:F)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&f(b).closest("form").length&&K("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&K("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var H,I=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},J=function J(a){var c=a.target,d,e;if(!!y.test(c.nodeName)&&!c.readOnly){d=f._data(c,"_change_data"),e=I(c),(a.type!=="focusout"||c.type!=="radio")&&f._data(c,"_change_data",e);if(d===b||e===d)return;if(d!=null||e)a.type="change",a.liveFired=b,f.event.trigger(a,arguments[1],c)}};f.event.special.change={filters:{focusout:J,beforedeactivate:J,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&J.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&J.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",I(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in H)f.event.add(this,c+".specialChange",H[c]);return y.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return y.test(this.nodeName)}},H=f.event.special.change.filters,H.focus=H.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var L={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||D,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=x.exec(h),k="",j&&(k=j[0],h=h.replace(x,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,L[h]?(a.push(L[h]+k),h=h+k):h=(L[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+N(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+N(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){return a.nodeName.toLowerCase()==="input"&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(a===b){g=!0;return 0}if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var O=/Until$/,P=/^(?:parents|prevUntil|prevAll)/,Q=/,/,R=/^.[^:#\[\.,]*$/,S=Array.prototype.slice,T=f.expr.match.POS,U={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(W(this,a,!1),"not",a)},filter:function(a){return this.pushStack(W(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=T.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=T.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a=="string")return f.inArray(this[0],a?f(a):this.parent().children());return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(V(c[0])||V(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=S.call(arguments);O.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!U[a]?f.unique(e):e,(this.length>1||Q.test(d))&&P.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var X=/ jQuery\d+="(?:\d+|null)"/g,Y=/^\s+/,Z=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,$=/<([\w:]+)/,_=/<tbody/i,ba=/<|&#?\w+;/,bb=/<(?:script|object|embed|option|style)/i,bc=/checked\s*(?:[^=]|=\s*.checked.)/i,bd=/\/(java|ecma)script/i,be={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};be.optgroup=be.option,be.tbody=be.tfoot=be.colgroup=be.caption=be.thead,be.th=be.td,f.support.htmlSerialize||(be._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(X,""):null;if(typeof a=="string"&&!bb.test(a)&&(f.support.leadingWhitespace||!Y.test(a))&&!be[($.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Z,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bc.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bf(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bl)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i=b&&b[0]?b[0].ownerDocument||b[0]:c;a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!bb.test(a[0])&&(f.support.checkClone||!bc.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bh(a,d),e=bi(a),g=bi(d);for(h=0;e[h];++h)bh(e[h],g[h])}if(b){bg(a,d);if(c){e=bi(a),g=bi(d);for(h=0;e[h];++h)bg(e[h],g[h])}}return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[];for(var i=0,j;(j=a[i])!=null;i++){typeof j=="number"&&(j+="");if(!j)continue;if(typeof j=="string")if(!ba.test(j))j=b.createTextNode(j);else{j=j.replace(Z,"<$1></$2>");var k=($.exec(j)||["",""])[1].toLowerCase(),l=be[k]||be._default,m=l[0],n=b.createElement("div");n.innerHTML=l[1]+j+l[2];while(m--)n=n.lastChild;if(!f.support.tbody){var o=_.test(j),p=k==="table"&&!o?n.firstChild&&n.firstChild.childNodes:l[1]==="<table>"&&!o?n.childNodes:[];for(var q=p.length-1;q>=0;--q)f.nodeName(p[q],"tbody")&&!p[q].childNodes.length&&p[q].parentNode.removeChild(p[q])}!f.support.leadingWhitespace&&Y.test(j)&&n.insertBefore(b.createTextNode(Y.exec(j)[0]),n.firstChild),j=n.childNodes}var r;if(!f.support.appendChecked)if(j[0]&&typeof (r=j.length)=="number")for(i=0;i<r;i++)bk(j[i]);else bk(j);j.nodeType?h.push(j):h=f.merge(h,j)}if(d){g=function(a){return!a.type||bd.test(a.type)};for(i=0;h[i];i++)if(e&&f.nodeName(h[i],"script")&&(!h[i].type||h[i].type.toLowerCase()==="text/javascript"))e.push(h[i].parentNode?h[i].parentNode.removeChild(h[i]):h[i]);else{if(h[i].nodeType===1){var s=f.grep(h[i].getElementsByTagName("script"),g);h.splice.apply(h,[i+1,0].concat(s))}d.appendChild(h[i])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bm=/alpha\([^)]*\)/i,bn=/opacity=([^)]*)/,bo=/-([a-z])/ig,bp=/([A-Z]|^ms)/g,bq=/^-?\d+(?:px)?$/i,br=/^-?\d/,bs=/^[+\-]=/,bt=/[^+\-\.\de]+/g,bu={position:"absolute",visibility:"hidden",display:"block"},bv=["Left","Right"],bw=["Top","Bottom"],bx,by,bz,bA=function(a,b){return b.toUpperCase()};f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bx(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{zIndex:!0,fontWeight:!0,opacity:!0,zoom:!0,lineHeight:!0,widows:!0,orphans:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d;if(h==="number"&&isNaN(d)||d==null)return;h==="string"&&bs.test(d)&&(d=+d.replace(bt,"")+parseFloat(f.css(a,c))),h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bx)return bx(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]},camelCase:function(a){return a.replace(bo,bA)}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){a.offsetWidth!==0?e=bB(a,b,d):f.swap(a,bu,function(){e=bB(a,b,d)});if(e<=0){e=bx(a,b,b),e==="0px"&&bz&&(e=bz(a,b,b));if(e!=null)return e===""||e==="auto"?"0px":e}if(e<0||e==null){e=a.style[b];return e===""||e==="auto"?"0px":e}return typeof e=="string"?e:e+"px"}},set:function(a,b){if(!bq.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bn.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle;c.zoom=1;var e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.filter=bm.test(g)?g.replace(bm,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bx(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(by=function(a,c){var d,e,g;c=c.replace(bp,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bz=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bq.test(d)&&br.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bx=by||bz,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV;try{bU=e.href}catch(bW){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?f.extend(!0,a,f.ajaxSettings,b):(b=a,a=f.extend(!0,f.ajaxSettings,b));for(var c in{context:1,url:1})c in b?a[c]=b[c]:c in f.ajaxSettings&&(a[c]=f.ajaxSettings[c]);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML}},ajaxPrefilter:bX(bS),ajaxTransport:bX(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a?4:0;var o,r,u,w=l?b$(d,v,l):b,x,y;if(a>=200&&a<300||a===304){if(d.ifModified){if(x=v.getResponseHeader("Last-Modified"))f.lastModified[k]=x;if(y=v.getResponseHeader("Etag"))f.etag[k]=y}if(a===304)c="notmodified",o=!0;else try{r=b_(d,w),c="success",o=!0}catch(z){c="parsererror",u=z}}else{u=c;if(!c||a)c="error",a<0&&(a=0)}v.status=a,v.statusText=c,o?h.resolveWith(e,[r,c,v]):h.rejectWith(e,[v,c,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,c]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bY(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", */*; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bY(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){status<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)bZ(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var ca=f.now(),cb=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+ca++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cb.test(b.url)||e&&cb.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cb,l),b.url===j&&(e&&(k=k.replace(cb,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cc=a.ActiveXObject?function(){for(var a in ce)ce[a](0,1)}:!1,cd=0,ce;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cf()||cg()}:cf,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cc&&delete ce[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cd,cc&&(ce||(ce={},f(a).unload(cc)),ce[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ch={},ci,cj,ck=/^(?:toggle|show|hide)$/,cl=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cm,cn=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],co,cp=a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cs("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",ct(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cs("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cs("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g];if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=ct(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block")),b.animatedProperties[g]=f.isArray(h)?h[1]:b.specialEasing&&b.specialEasing[g]||b.easing||"swing"}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],ck.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=cl.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[g]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cs("show",1),slideUp:cs("hide",1),slideToggle:cs("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this),f.isFunction(d.old)&&d.old.call(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function h(a){return d.step(a)}var d=this,e=f.fx,g;this.startTime=co||cq(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,h.elem=this.elem,h()&&f.timers.push(h)&&!cm&&(cp?(cm=1,g=function(){cm&&(cp(g),e.tick())},cp(g)):cm=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=co||cq(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a=f.timers,b=a.length;while(b--)a[b]()||a.splice(b,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cm),cm=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cu=/^t(?:able|d|h)$/i,cv=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cw(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!cu.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cv.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cv.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cw(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cw(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){return this[0]?parseFloat(f.css(this[0],d,"padding")):null},f.fn["outer"+c]=function(a){return this[0]?parseFloat(f.css(this[0],d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c];return e.document.compatMode==="CSS1Compat"&&g||e.document.body["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var h=f.css(e,d),i=parseFloat(h);return f.isNaN(i)?h:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);

//ga.js
(function(){var g=void 0,h=true,i=null,j=false,ba=encodeURIComponent,ca=Infinity,da=setTimeout,ea=decodeURIComponent,k=Math;function fa(a,b){return a.onload=b}function ga(a,b){return a.name=b}var m="push",ha="slice",ia="replace",ja="load",ka="floor",n="charAt",la="value",p="indexOf",ma="match",r="name",oa="host",t="toString",u="length",v="prototype",w="split",pa="stopPropagation",qa="scope",x="location",y="getString",z="substring",ra="navigator",A="join",C="toLowerCase",D;function sa(a,b){switch(b){case 0:return""+a;case 1:return a*1;case 2:return!!a;case 3:return a*1E3}return a}function E(a,b){return g==a||"-"==a&&!b||""==a}function ta(a){if(!a||""==a)return"";for(;a&&" \n\r\t"[p](a[n](0))>-1;)a=a[z](1);for(;a&&" \n\r\t"[p](a[n](a[u]-1))>-1;)a=a[z](0,a[u]-1);return a}function ua(a){var b=1,c=0,d;if(!E(a)){b=0;for(d=a[u]-1;d>=0;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=c!=0?b^c>>21:b}return b}
function va(){return k.round(k.random()*2147483647)}function wa(){}function F(a,b){return ba instanceof Function?b?encodeURI(a):ba(a):(G(68),escape(a))}function H(a){a=a[w]("+")[A](" ");if(ea instanceof Function)try{return ea(a)}catch(b){G(17)}else G(68);return unescape(a)}var xa=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},ya=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,!!d):a.detachEvent&&a.detachEvent("on"+b,c)};
function I(a){return a&&a[u]>0?a[0]:""}function za(a){var b=a?a[u]:0;return b>0?a[b-1]:""}var Aa=function(){this.prefix="ga.";this.I={}};Aa[v].set=function(a,b){this.I[this.prefix+a]=b};Aa[v].get=function(a){return this.I[this.prefix+a]};Aa[v].contains=function(a){return this.get(a)!==g};function Ba(a){a[p]("www.")==0&&(a=a[z](4));return a[C]()}function Ca(a,b){var c,d={url:a,protocol:"http",host:"",path:"",c:new Aa,anchor:""};if(!a)return d;c=a[p]("://");if(c>=0)d.protocol=a[z](0,c),a=a[z](c+3);c=a.search("/|\\?|#");if(c>=0)d.host=a[z](0,c)[C](),a=a[z](c);else return d.host=a[C](),d;c=a[p]("#");if(c>=0)d.anchor=a[z](c+1),a=a[z](0,c);c=a[p]("?");c>=0&&(Da(d.c,a[z](c+1)),a=a[z](0,c));d.anchor&&b&&Da(d.c,d.anchor);a&&a[n](0)=="/"&&(a=a[z](1));d.path=a;return d}
function Da(a,b){function c(b,c){a.contains(b)||a.set(b,[]);a.get(b)[m](c)}for(var d=ta(b)[w]("&"),e=0;e<d[u];e++)if(d[e]){var f=d[e][p]("=");f<0?c(d[e],"1"):c(d[e][z](0,f),d[e][z](f+1))}}function Ea(a,b){if(E(a))return"-";if("["==a[n](0)&&"]"==a[n](a[u]-1))return"-";var c=J.domain;c+=b&&b!="/"?b:"";return a[p](c)==(a[p]("http://")==0?7:a[p]("https://")==0?8:0)?"0":a};function Fa(a,b,c){k.random()*100>=1||(a=["utmt=error","utmerr="+a,"utmwv=5.2.2","utmn="+va(),"utmsp=1"],b&&a[m]("api="+b),c&&a[m]("msg="+F(c[z](0,100))),K.q&&a[m]("aip=1"),Ga(a[A]("&")))};var Ha=0;function L(a){return(a?"_":"")+Ha++}
var Ia=L(),Ja=L(),Ka=L(),La=L(),Ma=L(),M=L(),N=L(),Na=L(),Oa=L(),Pa=L(),Qa=L(),Ra=L(),Sa=L(),Ta=L(),Ua=L(),Va=L(),Wa=L(),Xa=L(),Ya=L(),Za=L(),$a=L(),ab=L(),bb=L(),cb=L(),db=L(),eb=L(),fb=L(),gb=L(),hb=L(),ib=L(),jb=L(),kb=L(),lb=L(),mb=L(),nb=L(),O=L(h),ob=L(),pb=L(),qb=L(),rb=L(),sb=L(),tb=L(),ub=L(),vb=L(),wb=L(),xb=L(),P=L(h),yb=L(h),zb=L(h),Bb=L(h),Cb=L(h),Db=L(h),Eb=L(h),Fb=L(h),Gb=L(h),Hb=L(h),Ib=L(h),Q=L(h),Jb=L(h),Kb=L(h),Lb=L(h),Mb=L(h),Nb=L(h),Ob=L(h),Pb=L(h),Qb=L(h),Rb=L(h),Sb=L(h),Tb=
L(h),Ub=L(h),Vb=L(h),Wb=L(),Xb=L(),Yb=L();L();var Zb=L(),$b=L(),ac=L(),bc=L(),cc=L(),dc=L(),ec=L(),hc=L(),ic=L(),jc=L();L();var kc=L(),lc=L();var mc=function(){function a(a,c,d){R(S[v],a,c,d)}T("_getName",Ka,58);T("_getAccount",Ia,64);T("_visitCode",P,54);T("_getClientInfo",Ta,53,1);T("_getDetectTitle",Wa,56,1);T("_getDetectFlash",Ua,65,1);T("_getLocalGifPath",fb,57);T("_getServiceMode",gb,59);U("_setClientInfo",Ta,66,2);U("_setAccount",Ia,3);U("_setNamespace",Ja,48);U("_setAllowLinker",Qa,11,2);U("_setDetectFlash",Ua,61,2);U("_setDetectTitle",Wa,62,2);U("_setLocalGifPath",fb,46,0);U("_setLocalServerMode",gb,92,g,0);U("_setRemoteServerMode",
gb,63,g,1);U("_setLocalRemoteServerMode",gb,47,g,2);U("_setSampleRate",eb,45,1);U("_setCampaignTrack",Va,36,2);U("_setAllowAnchor",Ra,7,2);U("_setCampNameKey",Ya,41);U("_setCampContentKey",cb,38);U("_setCampIdKey",Xa,39);U("_setCampMediumKey",ab,40);U("_setCampNOKey",db,42);U("_setCampSourceKey",$a,43);U("_setCampTermKey",bb,44);U("_setCampCIdKey",Za,37);U("_setCookiePath",N,9,0);U("_setMaxCustomVariables",hb,0,1);U("_setVisitorCookieTimeout",Na,28,1);U("_setSessionCookieTimeout",Oa,26,1);U("_setCampaignCookieTimeout",
Pa,29,1);U("_setReferrerOverride",qb,49);U("_setSiteSpeedSampleRate",ic,132);a("_trackPageview",S[v].na,1);a("_trackEvent",S[v].v,4);a("_trackPageLoadTime",S[v].ma,100);a("_trackSocial",S[v].oa,104);a("_trackTrans",S[v].pa,18);a("_sendXEvent",S[v].u,78);a("_createEventTracker",S[v].V,74);a("_getVersion",S[v].$,60);a("_setDomainName",S[v].t,6);a("_setAllowHash",S[v].ea,8);a("_getLinkerUrl",S[v].Z,52);a("_link",S[v].link,101);a("_linkByPost",S[v].da,102);a("_setTrans",S[v].ha,20);a("_addTrans",S[v].O,
21);a("_addItem",S[v].M,19);a("_setTransactionDelim",S[v].ia,82);a("_setCustomVar",S[v].fa,10);a("_deleteCustomVar",S[v].X,35);a("_getVisitorCustomVar",S[v].aa,50);a("_setXKey",S[v].ka,83);a("_setXValue",S[v].la,84);a("_getXKey",S[v].ba,76);a("_getXValue",S[v].ca,77);a("_clearXKey",S[v].S,72);a("_clearXValue",S[v].T,73);a("_createXObj",S[v].W,75);a("_addIgnoredOrganic",S[v].K,15);a("_clearIgnoredOrganic",S[v].P,97);a("_addIgnoredRef",S[v].L,31);a("_clearIgnoredRef",S[v].Q,32);a("_addOrganic",S[v].N,
14);a("_clearOrganic",S[v].R,70);a("_cookiePathCopy",S[v].U,30);a("_get",S[v].Y,106);a("_set",S[v].ga,107);a("_addEventListener",S[v].addEventListener,108);a("_removeEventListener",S[v].removeEventListener,109);a("_initData",S[v].m,2);a("_setVar",S[v].ja,22);U("_setSessionTimeout",Oa,27,3);U("_setCookieTimeout",Pa,25,3);U("_setCookiePersistence",Na,24,1);a("_setAutoTrackOutbound",wa,79);a("_setTrackOutboundSubdomains",wa,81);a("_setHrefExamineLimit",wa,80)},R=function(a,b,c,d){a[b]=function(){try{return G(d),
c.apply(this,arguments)}catch(a){throw Fa("exc",b,a&&a[r]),a;}}},T=function(a,b,c,d){S[v][a]=function(){try{return G(c),sa(this.a.get(b),d)}catch(e){throw Fa("exc",a,e&&e[r]),e;}}},U=function(a,b,c,d,e){S[v][a]=function(f){try{G(c),e==g?this.a.set(b,sa(f,d)):this.a.set(b,e)}catch(l){throw Fa("exc",a,l&&l[r]),l;}}},nc=function(a,b){return{type:b,target:a,stopPropagation:function(){throw"aborted";}}};var oc=function(a,b){return b!=="/"?j:(a[p]("www.google.")==0||a[p](".google.")==0||a[p]("google.")==0)&&!(a[p]("google.org")>-1)?h:j},pc=function(a){var b=a.get(Ma),c=a[y](N,"/");oc(b,c)&&a[pa]()};var uc=function(){var a={},b={},c=new qc;this.g=function(a,b){c.add(a,b)};var d=new qc;this.d=function(a,b){d.add(a,b)};var e=j,f=j,l=h;this.J=function(){e=h};this.f=function(a){this[ja]();this.set(Wb,a,h);a=new rc(this);e=j;d.execute(this);e=h;b={};this.i();a.qa()};this.load=function(){e&&(e=j,this.sa(),sc(this),f||(f=h,c.execute(this),tc(this),sc(this)),e=h)};this.i=function(){if(e)if(f)e=j,tc(this),e=h;else this[ja]()};this.get=function(c){c&&c[n](0)=="_"&&this[ja]();return b[c]!==g?b[c]:a[c]};
this.set=function(c,d,e){c&&c[n](0)=="_"&&this[ja]();e?b[c]=d:a[c]=d;c&&c[n](0)=="_"&&this.i()};this.n=function(b){a[b]=this.b(b,0)+1};this.b=function(a,b){var c=this.get(a);return c==g||c===""?b:c*1};this.getString=function(a,b){var c=this.get(a);return c==g?b:c+""};this.sa=function(){if(l){var b=this[y](Ma,""),c=this[y](N,"/");oc(b,c)||(a[M]=a[Sa]&&b!=""?ua(b):1,l=j)}}};uc[v].stopPropagation=function(){throw"aborted";};
var rc=function(a){var b=this;this.j=0;var c=a.get(Xb);this.Aa=function(){b.j>0&&c&&(b.j--,b.j||c())};this.qa=function(){!b.j&&c&&da(c,0)};a.set(Yb,b,h)};function vc(a,b){for(var b=b||[],c=0;c<b[u];c++){var d=b[c];if(""+a==d||d[p](a+".")==0)return d}return"-"}
var xc=function(a,b,c){c=c?"":a[y](M,"1");b=b[w](".");if(b[u]!==6||wc(b[0],c))return j;var c=b[1]*1,d=b[2]*1,e=b[3]*1,f=b[4]*1,b=b[5]*1;if(!(c>=0&&d>0&&e>0&&f>0&&b>=0))return G(110),j;a.set(P,c);a.set(Cb,d);a.set(Db,e);a.set(Eb,f);a.set(Fb,b);return h},yc=function(a){var b=a.get(P),c=a.get(Cb),d=a.get(Db),e=a.get(Eb),f=a.b(Fb,1);b==g?G(113):b==NaN&&G(114);b>=0&&c>0&&d>0&&e>0&&f>=0||G(115);return[a.b(M,1),b!=g?b:"-",c||"-",d||"-",e||"-",f][A](".")},zc=function(a){return[a.b(M,1),a.b(Ib,0),a.b(Q,1),
a.b(Jb,0)][A](".")},Ac=function(a,b,c){var c=c?"":a[y](M,"1"),d=b[w](".");if(d[u]!==4||wc(d[0],c))d=i;a.set(Ib,d?d[1]*1:0);a.set(Q,d?d[2]*1:10);a.set(Jb,d?d[3]*1:a.get(La));return d!=i||!wc(b,c)},Bc=function(a,b){var c=F(a[y](zb,"")),d=[],e=a.get(O);if(!b&&e){for(var f=0;f<e[u];f++){var l=e[f];l&&l[qa]==1&&d[m](f+"="+F(l[r])+"="+F(l[la])+"=1")}d[u]>0&&(c+="|"+d[A](","))}return c?a.b(M,1)+"."+c:i},Cc=function(a,b,c){c=c?"":a[y](M,"1");b=b[w](".");if(b[u]<2||wc(b[0],c))return j;b=b[ha](1)[A](".")[w]("|");
b[u]>0&&a.set(zb,H(b[0]));if(b[u]<=1)return h;for(var c=b[1][w](b[1][p](",")==-1?"^":","),d=0;d<c[u];d++){var e=c[d][w]("=");if(e[u]==4){var f={};ga(f,H(e[1]));f.value=H(e[2]);f.scope=1;a.get(O)[e[0]]=f}}b[1][p]("^")>=0&&G(125);return h},Ec=function(a,b){var c=Dc(a,b);return c?[a.b(M,1),a.b(Kb,0),a.b(Lb,1),a.b(Mb,1),c][A]("."):""},Dc=function(a){function b(b,e){if(!E(a.get(b))){var f=a[y](b,""),f=f[w](" ")[A]("%20"),f=f[w]("+")[A]("%20");c[m](e+"="+f)}}var c=[];b(Ob,"utmcid");b(Sb,"utmcsr");b(Qb,
"utmgclid");b(Rb,"utmdclid");b(Pb,"utmccn");b(Tb,"utmcmd");b(Ub,"utmctr");b(Vb,"utmcct");return c[A]("|")},Gc=function(a,b,c){c=c?"":a[y](M,"1");b=b[w](".");if(b[u]<5||wc(b[0],c))return a.set(Kb,g),a.set(Lb,g),a.set(Mb,g),a.set(Ob,g),a.set(Pb,g),a.set(Sb,g),a.set(Tb,g),a.set(Ub,g),a.set(Vb,g),a.set(Qb,g),a.set(Rb,g),j;a.set(Kb,b[1]*1);a.set(Lb,b[2]*1);a.set(Mb,b[3]*1);Fc(a,b[ha](4)[A]("."));return h},Fc=function(a,b){function c(a){return(a=b[ma](a+"=(.*?)(?:\\|utm|$)"))&&a[u]==2?a[1]:g}function d(b,
c){c&&(c=e?H(c):c[w]("%20")[A](" "),a.set(b,c))}b[p]("=")==-1&&(b=H(b));var e=c("utmcvr")=="2";d(Ob,c("utmcid"));d(Pb,c("utmccn"));d(Sb,c("utmcsr"));d(Tb,c("utmcmd"));d(Ub,c("utmctr"));d(Vb,c("utmcct"));d(Qb,c("utmgclid"));d(Rb,c("utmdclid"))},wc=function(a,b){return b?a!=b:!/^\d+$/.test(a)};var qc=function(){this.s=[]};qc[v].add=function(a,b){this.s[m]({name:a,Da:b})};qc[v].execute=function(a){try{for(var b=0;b<this.s[u];b++)this.s[b].Da.call(V,a)}catch(c){}};function Hc(a){a.get(eb)!=100&&a.get(P)%1E4>=a.get(eb)*100&&a[pa]()}function Ic(a){Jc()&&a[pa]()}function Kc(a){J[x].protocol=="file:"&&a[pa]()}function Lc(a){a.get(pb)||a.set(pb,J.title,h);a.get(ob)||a.set(ob,J[x].pathname+J[x].search,h)};var Mc=new function(){var a=[];this.set=function(b){a[b]=h};this.Ea=function(){for(var b=[],c=0;c<a[u];c++)a[c]&&(b[k[ka](c/6)]^=1<<c%6);for(c=0;c<b[u];c++)b[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[n](b[c]||0);return b[A]("")+"~"}};function G(a){Mc.set(a)};var V=window,J=document,Jc=function(){var a=V._gaUserPrefs;return a&&a.ioo&&a.ioo()},Nc=function(a,b){da(a,b)},W=function(a){for(var b=[],c=J.cookie[w](";"),a=RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$"),d=0;d<c[u];d++){var e=c[d][ma](a);e&&b[m](e[1])}return b},X=function(a,b,c,d,e){var f;f=Jc()?j:oc(d,c)?j:h;if(f){if(b&&V[ra].userAgent[p]("Firefox")>=0){b=b[ia](/\n|\r/g," ");f=0;for(var l=b[u];f<l;++f){var o=b.charCodeAt(f)&255;if(o==10||o==13)b=b[z](0,f)+"?"+b[z](f+1)}}b&&b[u]>2E3&&(b=b[z](0,2E3),G(69));
a=a+"="+b+"; path="+c+"; ";e&&(a+="expires="+(new Date((new Date).getTime()+e)).toGMTString()+"; ");d&&(a+="domain="+d+";");J.cookie=a}};var Oc,Pc,Qc=function(){if(!Oc){var a={},b=V[ra],c=V.screen;a.H=c?c.width+"x"+c.height:"-";a.G=c?c.colorDepth+"-bit":"-";a.language=(b&&(b.language||b.browserLanguage)||"-")[C]();a.javaEnabled=b&&b.javaEnabled()?1:0;a.characterSet=J.characterSet||J.charset||"-";Oc=a}},Rc=function(){Qc();for(var a=Oc,b=V[ra],a=b.appName+b.version+a.language+b.platform+b.userAgent+a.javaEnabled+a.H+a.G+(J.cookie?J.cookie:"")+(J.referrer?J.referrer:""),b=a[u],c=V.history[u];c>0;)a+=c--^b++;return ua(a)},Sc=function(a){Qc();
var b=Oc;a.set(sb,b.H);a.set(tb,b.G);a.set(wb,b.language);a.set(xb,b.characterSet);a.set(ub,b.javaEnabled);if(a.get(Ta)&&a.get(Ua)){if(!(b=Pc)){var c,d,e;d="ShockwaveFlash";if((b=(b=V[ra])?b.plugins:g)&&b[u]>0)for(c=0;c<b[u]&&!e;c++)d=b[c],d[r][p]("Shockwave Flash")>-1&&(e=d.description[w]("Shockwave Flash ")[1]);else{d=d+"."+d;try{c=new ActiveXObject(d+".7"),e=c.GetVariable("$version")}catch(f){}if(!e)try{c=new ActiveXObject(d+".6"),e="WIN 6,0,21,0",c.AllowScriptAccess="always",e=c.GetVariable("$version")}catch(l){}if(!e)try{c=
new ActiveXObject(d),e=c.GetVariable("$version")}catch(o){}e&&(e=e[w](" ")[1][w](","),e=e[0]+"."+e[1]+" r"+e[2])}b=e?e:"-"}Pc=b;a.set(vb,Pc)}else a.set(vb,"-")};var Y=function(){R(Y[v],"push",Y[v][m],5);R(Y[v],"_createAsyncTracker",Y[v].Ba,33);R(Y[v],"_getAsyncTracker",Y[v].Ca,34);this.r=0};Y[v].Ba=function(a,b){return K.l(a,b||"")};Y[v].Ca=function(a){return K.p(a)};Y[v].push=function(a){this.r>0&&G(105);this.r++;for(var b=arguments,c=0,d=0;d<b[u];d++)try{if(typeof b[d]==="function")b[d]();else{var e="",f=b[d][0],l=f.lastIndexOf(".");l>0&&(e=f[z](0,l),f=f[z](l+1));var o=e=="_gat"?K:e=="_gaq"?Tc:K.p(e);o[f].apply(o,b[d][ha](1))}}catch(q){c++}this.r--;return c};var Yc=function(){function a(a,b,c,d){g==f[a]&&(f[a]={});g==f[a][b]&&(f[a][b]=[]);f[a][b][c]=d}function b(a,b,c){if(g!=f[a]&&g!=f[a][b])return f[a][b][c]}function c(a,b){if(g!=f[a]&&g!=f[a][b]){f[a][b]=g;var c=h,d;for(d=0;d<l[u];d++)if(g!=f[a][l[d]]){c=j;break}c&&(f[a]=g)}}function d(a){var b="",c=j,d,e;for(d=0;d<l[u];d++)if(e=a[l[d]],g!=e){c&&(b+=l[d]);for(var c=[],f=g,$=g,$=0;$<e[u];$++)if(g!=e[$]){f="";$!=aa&&g==e[$-1]&&(f+=$[t]()+na);for(var Wc=e[$],Xc="",Ab=g,fc=g,gc=g,Ab=0;Ab<Wc[u];Ab++)fc=
Wc[n](Ab),gc=B[fc],Xc+=g!=gc?gc:fc;f+=Xc;c[m](f)}b+=o+c[A](s)+q;c=j}else c=h;return b}var e=this,f=[],l=["k","v"],o="(",q=")",s="*",na="!",B={"'":"'0"};B[q]="'1";B[s]="'2";B[na]="'3";var aa=1;e.va=function(a){return g!=f[a]};e.o=function(){for(var a="",b=0;b<f[u];b++)g!=f[b]&&(a+=b[t]()+d(f[b]));return a};e.ua=function(a){if(a==g)return e.o();for(var b=a.o(),c=0;c<f[u];c++)g!=f[c]&&!a.va(c)&&(b+=c[t]()+d(f[c]));return b};e.e=function(b,c,d){if(!Uc(d))return j;a(b,"k",c,d);return h};e.k=function(b,
c,d){if(!Vc(d))return j;a(b,"v",c,d[t]());return h};e.getKey=function(a,c){return b(a,"k",c)};e.C=function(a,c){return b(a,"v",c)};e.A=function(a){c(a,"k")};e.B=function(a){c(a,"v")};R(e,"_setKey",e.e,89);R(e,"_setValue",e.k,90);R(e,"_getKey",e.getKey,87);R(e,"_getValue",e.C,88);R(e,"_clearKey",e.A,85);R(e,"_clearValue",e.B,86)};function Uc(a){return typeof a=="string"}function Vc(a){return typeof a!="number"&&(g==Number||!(a instanceof Number))||k.round(a)!=a||a==NaN||a==ca?j:h};var Zc=function(a){var b=V.gaGlobal;a&&!b&&(V.gaGlobal=b={});return b},$c=function(){var a=Zc(h).hid;if(a==i)a=va(),Zc(h).hid=a;return a},ad=function(a){a.set(rb,$c());var b=Zc();if(b&&b.dh==a.get(M)){var c=b.sid;c&&(c=="0"&&G(112),a.set(Eb,c),a.get(yb)&&a.set(Db,c));b=b.vid;a.get(yb)&&b&&(b=b[w]("."),b[1]*1||G(112),a.set(P,b[0]*1),a.set(Cb,b[1]*1))}};var bd,cd=function(a,b,c){var d=a[y](Ma,""),e=a[y](N,"/"),a=a.b(Na,0);X(b,c,e,d,a)},tc=function(a){var b=a[y](Ma,"");a.b(M,1);var c=a[y](N,"/");X("__utma",yc(a),c,b,a.get(Na));X("__utmb",zc(a),c,b,a.get(Oa));X("__utmc",""+a.b(M,1),c,b);var d=Ec(a,h);d?X("__utmz",d,c,b,a.get(Pa)):X("__utmz","",c,b,-1);(d=Bc(a,j))?X("__utmv",d,c,b,a.get(Na)):X("__utmv","",c,b,-1)},sc=function(a){var b=a.b(M,1);if(!xc(a,vc(b,W("__utma"))))return a.set(Bb,h),j;var c=!Ac(a,vc(b,W("__utmb")));a.set(Hb,c);Gc(a,vc(b,W("__utmz")));
Cc(a,vc(b,W("__utmv")));bd=!c;return h},dd=function(a){!bd&&!(W("__utmb")[u]>0)&&(X("__utmd","1",a[y](N,"/"),a[y](Ma,""),1E4),W("__utmd")[u]==0&&a[pa]())};var gd=function(a){a.get(P)==g?ed(a):a.get(Bb)&&!a.get(kc)?ed(a):a.get(Hb)&&fd(a)},hd=function(a){a.get(Nb)&&!a.get(Gb)&&(fd(a),a.set(Lb,a.get(Fb)))},ed=function(a){var b=a.get(La);a.set(yb,h);a.set(P,va()^Rc(a)&2147483647);a.set(zb,"");a.set(Cb,b);a.set(Db,b);a.set(Eb,b);a.set(Fb,1);a.set(Gb,h);a.set(Ib,0);a.set(Q,10);a.set(Jb,b);a.set(O,[]);a.set(Bb,j);a.set(Hb,j)},fd=function(a){a.set(Db,a.get(Eb));a.set(Eb,a.get(La));a.n(Fb);a.set(Gb,h);a.set(Ib,0);a.set(Q,10);a.set(Jb,a.get(La));a.set(Hb,j)};var id="daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,google:q,yahoo:p,yahoo:q,msn:q,bing:q,aol:query,aol:q,lycos:query,ask:q,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,live:q,baidu:wd,alice:qs,yandex:text,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query".split(","),od=function(a){if(a.get(Va)&&!a.get(kc)){for(var b=!E(a.get(Ob))||!E(a.get(Sb))||!E(a.get(Qb))||!E(a.get(Rb)),c={},d=0;d<jd[u];d++){var e=jd[d];
c[e]=a.get(e)}d=Ca(J[x].href,a.get(Ra));if(!(za(d.c.get(a.get(db)))=="1"&&b)&&(d=kd(a,d)||ld(a),!d&&!b&&a.get(Gb)&&(md(a,g,"(direct)",g,g,"(direct)","(none)",g,g),d=h),d&&(a.set(Nb,nd(a,c)),b=a.get(Sb)=="(direct)"&&a.get(Pb)=="(direct)"&&a.get(Tb)=="(none)",a.get(Nb)||a.get(Gb)&&!b)))a.set(Kb,a.get(La)),a.set(Lb,a.get(Fb)),a.n(Mb)}},kd=function(a,b){function c(c,d){var d=d||"-",e=za(b.c.get(a.get(c)));return e&&e!="-"?H(e):d}var d=za(b.c.get(a.get(Xa)))||"-",e=za(b.c.get(a.get($a)))||"-",f=za(b.c.get(a.get(Za)))||
"-",l=za(b.c.get("dclid"))||"-",o=c(Ya,"(not set)"),q=c(ab,"(not set)"),s=c(bb),na=c(cb);if(E(d)&&E(f)&&E(l)&&E(e))return j;if(E(s)){var B=Ea(a.get(qb),a.get(N)),B=Ca(B,h);(B=pd(a,B))&&!E(B[1]&&!B[2])&&(s=B[1])}md(a,d,e,f,l,o,q,s,na);return h},ld=function(a){var b=Ea(a.get(qb),a.get(N)),c=Ca(b,h);if(!(b!=g&&b!=i&&b!=""&&b!="0"&&b!="-"&&b[p]("://")>=0)||c&&c[oa][p]("google")>-1&&c.c.contains("q")&&c.path=="cse")return j;if((b=pd(a,c))&&!b[2])return md(a,g,b[0],g,g,"(organic)","organic",b[1],g),h;else if(b)return j;
if(a.get(Gb))a:{for(var b=a.get(kb),d=Ba(c[oa]),e=0;e<b[u];++e)if(d[p](b[e])>-1){a=j;break a}md(a,g,d,g,g,"(referral)","referral",g,"/"+c.path);a=h}else a=j;return a},pd=function(a,b){for(var c=a.get(ib),d=0;d<c[u];++d){var e=c[d][w](":");if(b[oa][p](e[0][C]())>-1){var f=b.c.get(e[1]);if(f&&(f=I(f),!f&&b[oa][p]("google.")>-1&&(f="(not provided)"),!e[3]||b.url[p](e[3])>-1)){a:{for(var c=f,d=a.get(jb),c=H(c)[C](),l=0;l<d[u];++l)if(c==d[l]){c=h;break a}c=j}return[e[2]||e[0],f,c]}}}return i},md=function(a,
b,c,d,e,f,l,o,q){a.set(Ob,b);a.set(Sb,c);a.set(Qb,d);a.set(Rb,e);a.set(Pb,f);a.set(Tb,l);a.set(Ub,o);a.set(Vb,q)},jd=[Pb,Ob,Qb,Rb,Sb,Tb,Ub,Vb],nd=function(a,b){function c(a){a=(""+a)[w]("+")[A]("%20");return a=a[w](" ")[A]("%20")}function d(c){var d=""+(a.get(c)||""),c=""+(b[c]||"");return d[u]>0&&d==c}if(d(Qb)||d(Rb))return G(131),j;for(var e=0;e<jd[u];e++){var f=jd[e],l=b[f]||"-",f=a.get(f)||"-";if(c(l)!=c(f))return h}return j};var rd=function(a){qd(a,J[x].href)?(a.set(kc,h),G(12)):a.set(kc,j)},qd=function(a,b){if(!a.get(Qa))return j;var c=Ca(b,a.get(Ra)),d=I(c.c.get("__utma")),e=I(c.c.get("__utmb")),f=I(c.c.get("__utmc")),l=I(c.c.get("__utmx")),o=I(c.c.get("__utmz")),q=I(c.c.get("__utmv")),c=I(c.c.get("__utmk"));if(ua(""+d+e+f+l+o+q)!=c){d=H(d);e=H(e);f=H(f);l=H(l);a:{for(var f=d+e+f+l,s=0;s<3;s++){for(var na=0;na<3;na++){if(c==ua(f+o+q)){G(127);c=[o,q];break a}var B=o[ia](/ /g,"%20"),aa=q[ia](/ /g,"%20");if(c==ua(f+B+
aa)){G(128);c=[B,aa];break a}B=B[ia](/\+/g,"%20");aa=aa[ia](/\+/g,"%20");if(c==ua(f+B+aa)){G(129);c=[B,aa];break a}o=H(o)}q=H(q)}c=g}if(!c)return j;o=c[0];q=c[1]}if(!xc(a,d,h))return j;Ac(a,e,h);Gc(a,o,h);Cc(a,q,h);sd(a,l,h);return h},ud=function(a,b,c){var d;d=yc(a)||"-";var e=zc(a)||"-",f=""+a.b(M,1)||"-",l=td(a)||"-",o=Ec(a,j)||"-",a=Bc(a,j)||"-",q=ua(""+d+e+f+l+o+a),s=[];s[m]("__utma="+d);s[m]("__utmb="+e);s[m]("__utmc="+f);s[m]("__utmx="+l);s[m]("__utmz="+o);s[m]("__utmv="+a);s[m]("__utmk="+
q);d=s[A]("&");if(!d)return b;e=b[p]("#");return c?e<0?b+"#"+d:b+"&"+d:(c="",f=b[p]("?"),e>0&&(c=b[z](e),b=b[z](0,e)),f<0?b+"?"+d+c:b+"&"+d+c)};var vd="|",xd=function(a,b,c,d,e,f,l,o,q){var s=wd(a,b);s||(s={},a.get(lb)[m](s));s.id_=b;s.affiliation_=c;s.total_=d;s.tax_=e;s.shipping_=f;s.city_=l;s.state_=o;s.country_=q;s.items_=s.items_||[];return s},yd=function(a,b,c,d,e,f,l){var a=wd(a,b)||xd(a,b,"",0,0,0,"","",""),o;a:{if(a&&a.items_){o=a.items_;for(var q=0;q<o[u];q++)if(o[q].sku_==c){o=o[q];break a}}o=i}q=o||{};q.transId_=b;q.sku_=c;q.name_=d;q.category_=e;q.price_=f;q.quantity_=l;o||a.items_[m](q);return q},wd=function(a,b){for(var c=
a.get(lb),d=0;d<c[u];d++)if(c[d].id_==b)return c[d];return i};var zd,Ad=function(a){var f;var e;if(!zd){var b;b=J[x].hash;var c=V[r],d=/^#?gaso=([^&]*)/;if(f=(e=(b=b&&b[ma](d)||c&&c[ma](d))?b[1]:I(W("GASO")),b=e)&&b[ma](/^(?:\|([-0-9a-z.]{1,40})\|)?([-.\w]{10,1200})$/i),c=f)if(cd(a,"GASO",""+b),K._gasoDomain=a.get(Ma),K._gasoCPath=a.get(N),b="https://"+((c[1]||"www")+".google.com")+"/analytics/reporting/overlay_js?gaso="+c[2]+"&"+va())a=J.createElement("script"),a.type="text/javascript",a.async=h,a.src=b,a.id="_gasojs",fa(a,g),b=J.getElementsByTagName("script")[0],
b.parentNode.insertBefore(a,b);zd=h}};var sd=function(a,b,c){c&&(b=H(b));c=a.b(M,1);b=b[w](".");!(b[u]<2)&&/^\d+$/.test(b[0])&&(b[0]=""+c,cd(a,"__utmx",b[A](".")))},td=function(a,b){var c=vc(a.get(M),W("__utmx"));c=="-"&&(c="");return b?F(c):c};var Fd=function(a,b){var c=k.min(a.b(ic,0),10);if(a.b(P,0)%100>=c)return j;c=Bd()||Cd();if(c==g)return j;var d=c[0];if(d==g||d==ca||isNaN(d))return j;d>0?Dd(c)?b(Ed(c)):b(Ed(c[ha](0,1))):xa(V,"load",function(){Fd(a,b)},j);return h},Dd=function(a){for(var b=1;b<a[u];b++)if(isNaN(a[b])||a[b]==ca||a[b]<0)return j;return h},Ed=function(a){for(var b=new Yc,c=0;c<a[u];c++)b.e(14,c+1,(isNaN(a[c])||a[c]<0?0:a[c]<5E3?k[ka](a[c]/10)*10:a[c]<45E4?k[ka](a[c]/100)*100:45E4)+""),b.k(14,c+1,a[c]);return b},Bd=function(){var a=
V.performance||V.webkitPerformance;if(a=a&&a.timing){var b=a.navigationStart;if(b==0)G(133);else return[a.loadEventStart-b,a.domainLookupEnd-a.domainLookupStart,a.connectEnd-a.connectStart,a.responseStart-a.requestStart,a.responseEnd-a.responseStart,a.fetchStart-b]}},Cd=function(){if(V.top==V){var a=V.external,b=a&&a.onloadT;a&&!a.isValidLoadTime&&(b=g);b>2147483648&&(b=g);b>0&&a.setPageReadyTime();return b==g?g:[b]}};var S=function(a,b,c){function d(a){return function(b){if((b=b.get(lc)[a])&&b[u])for(var c=nc(e,a),d=0;d<b[u];d++)b[d].call(e,c)}}var e=this;this.a=new uc;this.get=function(a){return this.a.get(a)};this.set=function(a,b,c){this.a.set(a,b,c)};this.set(Ia,b||"UA-XXXXX-X");this.set(Ka,a||"");this.set(Ja,c||"");this.set(La,k.round((new Date).getTime()/1E3));this.set(N,"/");this.set(Na,63072E6);this.set(Pa,15768E6);this.set(Oa,18E5);this.set(Qa,j);this.set(hb,50);this.set(Ra,j);this.set(Sa,h);this.set(Ta,
h);this.set(Ua,h);this.set(Va,h);this.set(Wa,h);this.set(Ya,"utm_campaign");this.set(Xa,"utm_id");this.set(Za,"gclid");this.set($a,"utm_source");this.set(ab,"utm_medium");this.set(bb,"utm_term");this.set(cb,"utm_content");this.set(db,"utm_nooverride");this.set(eb,100);this.set(ic,1);this.set(jc,j);this.set(fb,"/__utm.gif");this.set(gb,1);this.set(lb,[]);this.set(O,[]);this.set(ib,id[ha](0));this.set(jb,[]);this.set(kb,[]);this.t("auto");this.set(qb,this.ra());this.set(lc,{hit:[],load:[]});this.a.g("0",
rd);this.a.g("1",gd);this.a.g("2",od);this.a.g("3",hd);this.a.g("4",d("load"));this.a.g("5",Ad);this.a.d("A",Ic);this.a.d("B",Kc);this.a.d("C",gd);this.a.d("D",Hc);this.a.d("E",pc);this.a.d("F",Gd);this.a.d("G",dd);this.a.d("H",Lc);this.a.d("I",Sc);this.a.d("J",ad);this.a.d("K",d("hit"));this.a.d("L",Hd);this.a.d("M",Id);this.get(La)===0&&G(111);this.a.J();this.w=g};D=S[v];D.h=function(){var a=this.get(mb);a||(a=new Yc,this.set(mb,a));return a};
D.ta=function(a){for(var b in a){var c=a[b];a.hasOwnProperty(b)&&typeof c!="function"&&this.set(b,c,h)}};D.z=function(a){if(this.get(jc))return j;var b=this,c=Fd(this.a,function(c){b.set(ob,a,h);b.u(c)});this.set(jc,c);return c};D.na=function(a){a&&a!=g&&(a.constructor+"")[p]("String")>-1?(G(13),this.set(ob,a,h)):typeof a==="object"&&a!==i&&this.ta(a);this.w=a=this.get(ob);this.a.f("page");this.z(a)};
D.v=function(a,b,c,d,e){if(a==""||!Uc(a)||b==""||!Uc(b))return j;if(c!=g&&!Uc(c))return j;if(d!=g&&!Vc(d))return j;this.set($b,a,h);this.set(ac,b,h);this.set(bc,c,h);this.set(cc,d,h);this.set(Zb,!!e,h);this.a.f("event");return h};D.oa=function(a,b,c,d){if(!a||!b)return j;this.set(dc,a,h);this.set(ec,b,h);this.set(hc,c||J[x].href,h);d&&this.set(ob,d,h);this.a.f("social");return h};D.ma=function(){this.set(ic,10);this.z(this.w)};D.pa=function(){this.a.f("trans")};D.u=function(a){this.set(nb,a,h);this.a.f("event")};
D.V=function(a){this.m();var b=this;return{_trackEvent:function(c,d,e){G(91);b.v(a,c,d,e)}}};D.Y=function(a){return this.get(a)};D.ga=function(a,b){if(a)if(a!=g&&(a.constructor+"")[p]("String")>-1)this.set(a,b);else if(typeof a=="object")for(var c in a)a.hasOwnProperty(c)&&this.set(c,a[c])};D.addEventListener=function(a,b){var c=this.get(lc)[a];c&&c[m](b)};D.removeEventListener=function(a,b){for(var c=this.get(lc)[a],d=0;c&&d<c[u];d++)if(c[d]==b){c.splice(d,1);break}};D.$=function(){return"5.2.2"};
D.t=function(a){this.get(Sa);a=a=="auto"?Ba(J.domain):!a||a=="-"||a=="none"?"":a[C]();this.set(Ma,a)};D.ea=function(a){this.set(Sa,!!a)};D.Z=function(a,b){return ud(this.a,a,b)};D.link=function(a,b){if(this.a.get(Qa)&&a){var c=ud(this.a,a,b);J[x].href=c}};D.da=function(a,b){this.a.get(Qa)&&a&&a.action&&(a.action=ud(this.a,a.action,b))};
D.ha=function(){this.m();var a=this.a,b=J.getElementById?J.getElementById("utmtrans"):J.utmform&&J.utmform.utmtrans?J.utmform.utmtrans:i;if(b&&b[la]){a.set(lb,[]);for(var b=b[la][w]("UTM:"),c=0;c<b[u];c++){b[c]=ta(b[c]);for(var d=b[c][w](vd),e=0;e<d[u];e++)d[e]=ta(d[e]);"T"==d[0]?xd(a,d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8]):"I"==d[0]&&yd(a,d[1],d[2],d[3],d[4],d[5],d[6])}}};D.O=function(a,b,c,d,e,f,l,o){return xd(this.a,a,b,c,d,e,f,l,o)};D.M=function(a,b,c,d,e,f){return yd(this.a,a,b,c,d,e,f)};
D.ia=function(a){vd=a||"|"};D.fa=function(a,b,c,d){var e=this.a;if(a<=0||a>e.get(hb))a=j;else if(!b||!c||F(b)[u]+F(c)[u]>64)a=j;else{d!=1&&d!=2&&(d=3);var f={};ga(f,b);f.value=c;f.scope=d;e.get(O)[a]=f;a=h}a&&this.a.i();return a};D.X=function(a){this.a.get(O)[a]=g;this.a.i()};D.aa=function(a){return(a=this.a.get(O)[a])&&a[qa]==1?a[la]:g};D.ka=function(a,b,c){this.h().e(a,b,c)};D.la=function(a,b,c){this.h().k(a,b,c)};D.ba=function(a,b){return this.h().getKey(a,b)};
D.ca=function(a,b){return this.h().C(a,b)};D.S=function(a){this.h().A(a)};D.T=function(a){this.h().B(a)};D.W=function(){return new Yc};D.K=function(a){a&&this.get(jb)[m](a[C]())};D.P=function(){this.set(jb,[])};D.L=function(a){a&&this.get(kb)[m](a[C]())};D.Q=function(){this.set(kb,[])};D.N=function(a,b,c,d,e){if(a&&b){a=[a,b[C]()][A](":");if(d||e)a=[a,d,e][A](":");d=this.get(ib);d.splice(c?0:d[u],0,a)}};D.R=function(){this.set(ib,[])};
D.U=function(a){this.a[ja]();var b=this.get(N),c=td(this.a);this.set(N,a);this.a.i();sd(this.a,c);this.set(N,b)};D.ra=function(){return J.referrer};D.m=function(){this.a[ja]()};D.ja=function(a){a&&a!=""&&(this.set(zb,a),this.a.f("var"))};var Gd=function(a){a.get(Wb)!=="trans"&&a.b(Ib,0)>=500&&a[pa]();if(a.get(Wb)==="event"){var b=(new Date).getTime(),c=a.b(Jb,0),d=a.b(Eb,0),c=k[ka](0.2*((b-(c!=d?c:c*1E3))/1E3));c>0&&(a.set(Jb,b),a.set(Q,k.min(10,a.b(Q,0)+c)));a.b(Q,0)<=0&&a[pa]()}},Id=function(a){a.get(Wb)==="event"&&a.set(Q,k.max(0,a.b(Q,10)-1))};var Jd=function(){var a=[];this.add=function(b,c,d){d&&(c=F(""+c));a[m](b+"="+c)};this.toString=function(){return a[A]("&")}},Kd=function(a,b){(b||a.get(gb)!=2)&&a.n(Ib)},Ld=function(a,b){b.add("utmwv","5.2.2");b.add("utms",a.get(Ib));b.add("utmn",va());var c=J[x].hostname;E(c)||b.add("utmhn",c,h);c=a.get(eb);c!=100&&b.add("utmsp",c,h)},Nd=function(a,b){b.add("utmac",a.get(Ia));a.get(Zb)&&b.add("utmni",1);Md(a,b);K.q&&b.add("aip",1);b.add("utmu",Mc.Ea())},Md=function(a,b){function c(a,b){b&&d[m](a+
"="+b+";")}var d=[];c("__utma",yc(a));c("__utmz",Ec(a,j));c("__utmv",Bc(a,h));c("__utmx",td(a));b.add("utmcc",d[A]("+"),h)},Od=function(a,b){a.get(Ta)&&(b.add("utmcs",a.get(xb),h),b.add("utmsr",a.get(sb)),b.add("utmsc",a.get(tb)),b.add("utmul",a.get(wb)),b.add("utmje",a.get(ub)),b.add("utmfl",a.get(vb),h))},Pd=function(a,b){a.get(Wa)&&a.get(pb)&&b.add("utmdt",a.get(pb),h);b.add("utmhid",a.get(rb));b.add("utmr",Ea(a.get(qb),a.get(N)),h);b.add("utmp",F(a.get(ob),h),h)},Qd=function(a,b){for(var c=a.get(mb),
d=a.get(nb),e=a.get(O)||[],f=0;f<e[u];f++){var l=e[f];l&&(c||(c=new Yc),c.e(8,f,l[r]),c.e(9,f,l[la]),l[qa]!=3&&c.e(11,f,""+l[qa]))}!E(a.get($b))&&!E(a.get(ac),h)&&(c||(c=new Yc),c.e(5,1,a.get($b)),c.e(5,2,a.get(ac)),e=a.get(bc),e!=g&&c.e(5,3,e),e=a.get(cc),e!=g&&c.k(5,1,e));c?b.add("utme",c.ua(d),h):d&&b.add("utme",d.o(),h)},Rd=function(a,b,c){var d=new Jd;Kd(a,c);Ld(a,d);d.add("utmt","tran");d.add("utmtid",b.id_,h);d.add("utmtst",b.affiliation_,h);d.add("utmtto",b.total_,h);d.add("utmttx",b.tax_,
h);d.add("utmtsp",b.shipping_,h);d.add("utmtci",b.city_,h);d.add("utmtrg",b.state_,h);d.add("utmtco",b.country_,h);!c&&Nd(a,d);return d[t]()},Sd=function(a,b,c){var d=new Jd;Kd(a,c);Ld(a,d);d.add("utmt","item");d.add("utmtid",b.transId_,h);d.add("utmipc",b.sku_,h);d.add("utmipn",b.name_,h);d.add("utmiva",b.category_,h);d.add("utmipr",b.price_,h);d.add("utmiqt",b.quantity_,h);!c&&Nd(a,d);return d[t]()},Td=function(a,b){var c=a.get(Wb);if(c=="page")c=new Jd,Kd(a,b),Ld(a,c),Qd(a,c),Od(a,c),Pd(a,c),b||
Nd(a,c),c=[c[t]()];else if(c=="event")c=new Jd,Kd(a,b),Ld(a,c),c.add("utmt","event"),Qd(a,c),Od(a,c),Pd(a,c),!b&&Nd(a,c),c=[c[t]()];else if(c=="var")c=new Jd,Kd(a,b),Ld(a,c),c.add("utmt","var"),!b&&Nd(a,c),c=[c[t]()];else if(c=="trans")for(var c=[],d=a.get(lb),e=0;e<d[u];++e){c[m](Rd(a,d[e],b));for(var f=d[e].items_,l=0;l<f[u];++l)c[m](Sd(a,f[l],b))}else c=="social"?b?c=[]:(c=new Jd,Kd(a,b),Ld(a,c),c.add("utmt","social"),c.add("utmsn",a.get(dc),h),c.add("utmsa",a.get(ec),h),c.add("utmsid",a.get(hc),
h),Qd(a,c),Od(a,c),Pd(a,c),Nd(a,c),c=[c[t]()]):c=[];return c},Hd=function(a){var b,c=a.get(gb),d=a.get(Yb),e=d&&d.Aa,f=0;if(c==0||c==2){var l=a.get(fb)+"?";b=Td(a,h);for(var o=0,q=b[u];o<q;o++)Ga(b[o],e,l,h),f++}if(c==1||c==2){b=Td(a);o=0;for(q=b[u];o<q;o++)try{Ga(b[o],e),f++}catch(s){s&&Fa(s[r],g,s.message)}}if(d)d.j=f};var Ud="https:"==J[x].protocol?"https://ssl.google-analytics.com":"http://www.google-analytics.com",Vd=function(a){ga(this,"len");this.message=a+"-8192"},Wd=function(a){ga(this,"ff2post");this.message=a+"-2036"},Ga=function(a,b,c,d){b=b||wa;if(d||a[u]<=2036)Xd(a,b,c);else if(a[u]<=8192){if(V[ra].userAgent[p]("Firefox")>=0&&![].reduce)throw new Wd(a[u]);Yd(a,b)||Zd(a,b)}else throw new Vd(a[u]);},Xd=function(a,b,c){var c=c||Ud+"/__utm.gif?",d=new Image(1,1);d.src=c+a;fa(d,function(){fa(d,i);d.onerror=
i;b()});d.onerror=function(){fa(d,i);d.onerror=i;b()}},Yd=function(a,b){var c,d=Ud+"/p/__utm.gif",e=V.XDomainRequest;if(e)c=new e,c.open("POST",d);else if(e=V.XMLHttpRequest)e=new e,"withCredentials"in e&&(c=e,c.open("POST",d,h),c.setRequestHeader("Content-Type","text/plain"));if(c)return c.onreadystatechange=function(){c.readyState==4&&(b(),c=i)},c.send(a),h},Zd=function(a,b){if(J.body){a=ba(a);try{var c=J.createElement('<iframe name="'+a+'"></iframe>')}catch(d){c=J.createElement("iframe"),ga(c,
a)}c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var e=J[x],e=Ud+"/u/post_iframe.html#"+ba(e.protocol+"//"+e[oa]+"/favicon.ico"),f=function(){c.src="";c.parentNode&&c.parentNode.removeChild(c)};xa(V,"beforeunload",f);var l=j,o=0,q=function(){if(!l){try{if(o>9||c.contentWindow[x][oa]==J[x][oa]){l=h;f();ya(V,"beforeunload",f);b();return}}catch(a){}o++;da(q,200)}};xa(c,"load",q);J.body.appendChild(c);c.src=e}else Nc(function(){Zd(a,b)},100)};var Z=function(){this.q=j;this.D={};this.F=[];this.wa=0;this._gasoCPath=this._gasoDomain=g;R(Z[v],"_createTracker",Z[v].l,55);R(Z[v],"_getTracker",Z[v].ya,0);R(Z[v],"_getTrackerByName",Z[v].p,51);R(Z[v],"_getTrackers",Z[v].za,130);R(Z[v],"_anonymizeIp",Z[v].xa,16);mc()};D=Z[v];D.ya=function(a,b){return this.l(a,g,b)};D.l=function(a,b,c){b&&G(23);c&&G(67);b==g&&(b="~"+K.wa++);a=new S(b,a,c);K.D[b]=a;K.F[m](a);return a};D.p=function(a){a=a||"";return K.D[a]||K.l(g,a)};D.za=function(){return K.F[ha](0)};
D.xa=function(){this.q=h};var $d=function(a){if(J.webkitVisibilityState=="prerender")return j;a();return h};var K=new Z;var ae=V._gat;ae&&typeof ae._getTracker=="function"?K=ae:V._gat=K;var Tc=new Y;(function(a){if(!$d(a)){G(123);var b=j,c=function(){!b&&$d(a)&&(G(124),b=h,ya(J,"webkitvisibilitychange",c))};xa(J,"webkitvisibilitychange",c)}})(function(){var a=V._gaq,b=j;if(a&&typeof a[m]=="function"&&(b=Object[v][t].call(Object(a))=="[object Array]",!b)){Tc=a;return}V._gaq=Tc;b&&Tc[m].apply(Tc,a)});})();


//cookie.js code here
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
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
 * @param String name The name of the cookie.
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
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};






//Lightboxes.js code here
var format1 = {
	className : "popupFormat1",
	arrowDefaultOffsets : [-5,-10,-15,-5],
	arrowDefaultOffsetsIE6 : [0,-1,-1,-6],
	popupContentBgAdjustmentClass : "gradientAdjustment"
};

var format2 = {
	className : "popupFormat2",
	arrowDefaultOffsets : [-6,-9,0,-6],
	arrowDefaultOffsetsIE6 : [0,-51,0,-6],
	popupContentBgAdjustmentClass : "gradientAdjustment"
}

var format3 = {
	className : "popupFormat3",
	arrowDefaultOffsets : [-6,-9,0,-6],
	arrowDefaultOffsetsIE6 : [0,-1,0,-6],
	popupContentBgAdjustmentClass : "gradientAdjustment"
};

var format4 = {
	className : "popupFormat4",
	arrowDefaultOffsets : [-5,-10,-15,-10],
	arrowDefaultOffsetsIE6 : [0,-1,-1,-8],
	popupContentBgAdjustmentClass : "gradientAdjustment"
};

var format5 = {
	className : "popupFormat5",
	arrowDefaultOffsets : [-5,-10,-15,-10],
	arrowDefaultOffsetsIE6 : [0,-1,-1,-8],
	popupContentBgAdjustmentClass : "gradientAdjustment"
};

var format6 = {
	className : "popupFormat6",
	arrowDefaultOffsets : [0,0,0,0],
	arrowDefaultOffsetsIE6 : [0,0,0,0],
	popupContentBgAdjustmentClass : "gradientAdjustment"
};

var format7 = {
	className : "popupFormat7",
	arrowDefaultOffsets : [0,0,0,0],
	arrowDefaultOffsetsIE6 : [0,0,0,0],
	popupContentBgAdjustmentClass : "gradientAdjustment"
};

var format8 = {
	className : "popupFormat8",
	arrowDefaultOffsets : [-5,-10,-15,-5],
	arrowDefaultOffsetsIE6 : [0,-1,-1,-6],
	popupContentBgAdjustmentClass : "gradientAdjustment"
};

var format9 = {
	className : "popupFormat9",
	arrowDefaultOffsets : [0,0,0,0],
	arrowDefaultOffsetsIE6 : [0,0,0,0],
	popupContentBgAdjustmentClass : "gradientAdjustment"
};

var format10 = {
	className : "popupFormat10",
	arrowDefaultOffsets : [-5,-10,-15,-5],
	arrowDefaultOffsetsIE6 : [-5,-1,-1,-6],
	popupContentBgAdjustmentClass : "gradientAdjustment"
};

function lightboxifyLink(link, ajaxForm, layout,validateAjaxForm,async) {
    //adding "isLightBox=true" parameter to the request, so the back-end knows to return a lightbox ready jsp.
    if (link.indexOf('?') > 0)
        link = link+"&isLightbox=true";
    else
        link = link+"?isLightbox=true";

	if (layout == undefined) layout = format1;
    if (async == undefined) async = true;
	if($("div#lightboxContainer").length == 0) {
     	createLightbox(layout);
	}
    if ($.browser.msie && $.browser.version.substr(0,1)==8) {
        $("body").children("#lightboxContainer").addClass("lightboxContainerIE8").css("height",$(document).height()).css('position','fixed').show();
    }
    else {
    	$("body").children("#lightboxContainer").css({"opacity":"0.5", 'position':'fixed'}).css("height",$(document).height()).show();
    }

//	$("body").children("#lightboxContentContainer").find('.popupMainRight').load(link,
    $.ajax({
        url:link,
        async:async,
        context: $("body").children("#lightboxContentContainer").find('.popupMainRight'),
        success:	function(data) {
        $(this).html(data);
		$(this).children().addClass(layout.popupContentBgAdjustmentClass);
		if(ajaxForm) {
            var formRefAjax = $(this).find("form");
                var options = {
                    beforeSubmit:function(attr, form){
//                        if validatAjaxForm is set to true and if the form has the correct validation class applied. This is needed because a page may have more than one form
                        if(validateAjaxForm && form.hasClass("js_form_validate"))
                            return form.validate();
                     },
                    success: function(data){
                        handleLightboxResponse(containerRef, data);
                    }
                }
			containerRef = $(this);
			formRefAjax.ajaxForm(options,function(data) {

				});
		}

		centerOnPage($(this).parents('#lightboxContentContainer'));
		$(this).parents('#lightboxContentContainer').fadeIn('fast');
		$(this).find('input:first').focus();
		IE6DropDownHide();
	}
//    ); matches load(link
    }); //matches $.ajax
}


function lightboxifyLinkWithParam(link, ajaxForm, layout, paramName, paramValue) {
	if (layout == undefined) layout = format1;
	if($("div#lightboxContainer").length == 0) {
     	createLightbox(layout);
	}

    link += escape('&' + paramName + '=' + paramValue);
    if ($.browser.msie && $.browser.version.substr(0,1)==8) {
        $("body").children("#lightboxContainer").addClass("lightboxContainerIE8").css("height",$(document).height()).css('position','fixed').show();
    }
    else {
    	$("body").children("#lightboxContainer").css({"opacity":"0.5", 'position':'fixed'}).css("height",$(document).height()).show();
    }

	$("body").children("#lightboxContentContainer").find('.popupMainRight').load(link,
	function() {
		$(this).children().addClass(layout.popupContentBgAdjustmentClass);
		if(ajaxForm) {
			containerRef = $(this);
			$(this).find("form").ajaxForm(function(data) {
					handleLightboxResponse(containerRef, data);
				});
		}

		centerOnPage($(this).parents('#lightboxContentContainer'));
		$(this).parents('#lightboxContentContainer').fadeIn('fast');
		$(this).find('input:first').focus();
		IE6DropDownHide();
	});
}

function lightboxifyObject(objRef, ajaxForm, layout, removeOnClick,cloneObject) {
	if (layout == undefined) layout = format1;
    if (cloneObject == undefined) cloneObject = true;
	var objRefClone = objRef.clone(cloneObject);
	if($("div#lightboxContainer").length == 0) {
     	createLightbox(layout);
	}
	objRefClone.addClass(layout.popupContentBgAdjustmentClass);
    if ($.browser.msie && $.browser.version.substr(0,1)==8) {
        $("body").children("#lightboxContainer").addClass("lightboxContainerIE8").css("height",$(document).height()).css('position','fixed').show();
    }
    else {
    	$("body").children("#lightboxContainer").css({"opacity":"0.5", 'position':'fixed'}).css("height",$(document).height()).show();
    }
	$("body").children("#lightboxContentContainer").find('.popupMainRight').html(objRefClone);
	if(ajaxForm) {
		objRefClone.find("form").ajaxForm(function(data) {
					handleLightboxResponse(containerRef, data);
			});
		}
		var lightBoxContentContainer =  $("#lightboxContentContainer");
        var lightboxContainer = $("#lightboxContainer");
        if(removeOnClick)
            lightboxContainer.click(function(){  removeLightboxContent(); });
		objRefClone.show('slow', function() {
			centerOnPage(lightBoxContentContainer);
			lightBoxContentContainer.fadeIn('fast');
			$(this).find('input:first').focus();
		});
		IE6DropDownHide();

}

function createLightbox(layout) {
		$("body").append("<div class='lightbox' id='lightboxContainer'><!-- --></div>\
		<table id='lightboxContentContainer' class='lightboxContentContainer " + layout.className + "'  cellpadding='0' cellspacing='0'><tr>\
			<td class='popupTopLeft'><!-- --></td>\
			<td class='popupTopRight'><!-- --></td>\
		</tr><tr>\
			<td class='popupMainLeft'><!-- --></td>\
			<td class='popupMainRight'><!-- --></td>\
		 </tr></table>");
}



function centerOnPage(elemRef) {
	var pscroll = getPageScroll();
	elemRef.css("top",($(window).height()/2 - elemRef.height()/2) + pscroll[1]);
    elemRef.css("left",($(window).width()/2 - elemRef.width()/2));
}

function handleLightboxResponse(containerRef, data) {
    containerRef.html(data);
    containerRef.children().addClass("gradientAdjustment");
	formRef = containerRef.find('form');
	if (formRef.length == 1)
		formRef.ajaxForm(function(data) {
			handleLightboxResponse(containerRef, data);
		});
    else if (formRef.length > 1) {
//        TODO right now it always chooses the first form returned. Come up with a smarter way of doing this
        $(formRef[0]).ajaxForm(function(data) {
                handleLightboxResponse(containerRef, data);
            });
    }
	else
		centerOnPage(containerRef.parents('#lightboxContentContainer').fadeIn());

//        centerOnPage(containerRef.children(".lightboxMain"));;

}

function closeLightbox() {
	$("div#lightboxContainer").hide().siblings('#lightboxContentContainer').hide();
	IE6DropDownShow();
}
function removeLightboxContent() {
	closeLightbox();
	$("body").children("#lightboxContentContainer").find('.popupMainRight').children().remove();
}


//function popupify(popupContent, refObj, arrowPosition, popupOffset, arrowOffset, backgroundClass, popupContentBgAdjustmentClass) {
function popupify (popupContent, refObj, arrowPosition, popupOffset, arrowOffset, layout, hideOnCreate) {
	if(popupOffset == undefined) popupOffset = [0,0];
	if (arrowOffset == undefined) arrowOffset = [0,0];
    if (hideOnCreate == undefined) hideOnCreate = false;
	if (layout == undefined) layout = format1;
//	if(backgroundClass == undefined) backgroundClass = "";
//	if(popupContentBgAdjustmentClass == undefined) popupContentBgAdjustmentClass = "defaultGradientAdjustment"

	popupObj = $("<div  class='popupContainer " + layout.className + "'><table cellpadding='0' cellspacing='0'><tr>\
					<td class='popupTopLeft'><!-- --></td>\
					<td class='popupTopRight'><!-- --></td>\
				</tr><tr>\
					<td class='popupMainLeft'><!-- --></td>\
					<td class='popupMainRight'><!-- --></td>\
				 </tr></table><div class='arrow'><!-- --></div></div>")

	popupContent.addClass(layout.popupContentBgAdjustmentClass);
//	refObj.css('position','relative');
	popupObj = popupObj.find('.popupMainRight').append(popupContent.css('display','block')).end().insertAfter(refObj);


	var topPosition = 0;
	var leftPosition = 0;


	var refObjTop = refObj.offset().top;
	var refObjLeft = refObj.offset().left;

	if ($.browser.msie && $.browser.version.substr(0,1)<7) {
		popupArrowOffset = layout.arrowDefaultOffsetsIE6;
	}
	else {
		popupArrowOffset = layout.arrowDefaultOffsets;
	}

	popupObj.css('top', topPosition).css('left', leftPosition);
	if(arrowPosition == 'left') {
		topPosition = refObjTop + popupOffset[1];
		leftPosition = refObjLeft  + refObj.width() + popupOffset[0];
		if(leftPosition + popupObj.width() > $(window).width()) {
			leftPosition = refObjLeft - popupObj.width() - popupOffset[0];
			popupObj.css('left', leftPosition).css('top',topPosition).show();

			popupObj.find('.arrow').addClass('arrowRight').css({
				'left': popupObj.width() + popupArrowOffset[1] + arrowOffset[0],
				'top':   popupObj.height()/2   + arrowOffset[1]
				});
		}
		else {
			popupObj.css('left', leftPosition).css('top',topPosition).show();
			popupArrow = popupObj.find('.arrow').addClass('arrowLeft').css({
				'left' : popupArrowOffset[3] - arrowOffset[0],
				'top' : popupObj.height()/2  + arrowOffset[1]
				});
		}
//		popupObj.css('left', leftPosition).css('top',topPosition).show();
	}

	else if(arrowPosition == 'right') {
		topPosition = refObjTop + popupOffset[1];
		leftPosition = refObjLeft - popupObj.width() - popupOffset[0];
		if(leftPosition < 0) {
			leftPosition = refObjLeft  + refObj.width() + popupOffset[0];
			popupObj.css('left', leftPosition).css('top',topPosition).show();
			popupArrow = popupObj.find('.arrow').addClass('arrowLeft').css({
				'left' : popupArrowOffset[3] - arrowOffset[0],
				'top' : popupObj.height()/2  + arrowOffset[1]
				});

		}
		else {
			popupObj.css('left', leftPosition).css('top',topPosition).show();
			popupObj.find('.arrow').addClass('arrowRight').css({
				'left': popupObj.width() + popupArrowOffset[1] + arrowOffset[0],
				'top':   popupObj.height()/2   + arrowOffset[1]
				});

		}
//		popupObj.css('left', leftPosition).css('top',topPosition).show();
	}

	else if(arrowPosition == 'top') {
		 topPosition = refObjTop + refObj.height() + popupOffset[1];
		leftPosition = refObjLeft  + refObj.width()/2 - popupObj.width()/2 + popupOffset[0];
		popupObj.css('left', leftPosition).css('top', topPosition).show();
		popupObj.find('.arrow').addClass('arrowUp').css('left', popupObj.width()/2 + arrowOffset[0]).css('top', popupArrowOffset[0] + arrowOffset[1]);

	}
	else if(arrowPosition == 'bottom') {
		topPosition = refObjTop - refObj.height() + popupOffset[1];
		leftPosition = refObjLeft  + refObj.width()/2 - popupObj.width()/2 + popupOffset[0];
		popupObj.css('left', leftPosition).css('top', topPosition).show();
		popupObj.find('.arrow').addClass('arrowDown').css('left', popupObj.width()/2 + arrowOffset[0]).css('top', popupObj.height() + popupArrowOffset[2] + arrowOffset[1]);
	}
	else {
		topPosition = refObjTop +  popupOffset[1];
		leftPosition = refObjLeft  + refObj.width() + popupOffset[0];
		popupObj.css('left', leftPosition).css('top', topPosition).show();
	}
    if(hideOnCreate)
        popupObj.hide();
    else
	    popupObj.show();
	return popupObj;

}

function popupifyWToggle(popupContent, refObj, arrowPosition, popupOffset, arrowOffset, layout, hideOnCreate){
    var popupRef = refObj.siblings(".popupContainer");
    if(popupRef.length > 0) {
        if(popupRef.css('display') == 'block')
            popupRef.hide();
        else
            popupRef.show();
    }
    else {
        popupify(popupContent, refObj, arrowPosition, popupOffset, arrowOffset, layout, hideOnCreate);
    }
}

function hidePopup(hideLink) {
	$(hideLink).parents('.popupContainer').hide();
}
function fadeOutPopup(hideLink) {
    if ($.browser.msie) {
        $(hideLink).parents('.popupContainer').hide();
    } else {
        $(hideLink).parents('.popupContainer').fadeOut();
    }
}

//Sale Alert popup, enabling enter key to login for IE
$('#saleAlert input#loginEmail').live('keyup', function(e) {
    if (e.keyCode == 13) {
        checkField($('#loginEmail'), 'add_sale_alert_email', true);
        return false;
    }
});

//Main sale alerts signup page, enabling enter key to login for IE
$('input#loginEmail').live('keydown', function(e) {
    if (e.keyCode == 13 && ie && $('#fullPageContainer').hasClass('registration')) {
        checkField($('#loginEmail'), 'login_email');
        return false;
    }
});

function checkField (fieldRef, field, event) {
	var illegalPassChars = /\s/;
	var illegalNameChars = /[^a-zA-Z\s\'\-]/;
	var illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/;
	var illegalChars2 = /[\(\)\<\>\,\;\:\\\/\"\[\]" "]/;
	var emailFilter = /^.+@.+\..+$/;
	var validZip = /(^\d{5}$)|(^\d{5}-\d{4}$)|(^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$)|(^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$)/;
	var bgRef = fieldRef.parent();
	var errorDiv = fieldRef.siblings('.errorMsg');

	var val = $.trim(fieldRef.val());
	switch(field){
		case 'add_sale_alert_email' :
				if (val == "") {
					errorDiv.html('Email address is required');
				}
				 else if(!(emailFilter.test(val))) {
					errorDiv.html('Please enter a valid email address');
				}
				 else if(val.match(illegalChars2)) {
					errorDiv.html('The email address contains illegal characters');
				}
				else {
                    if(event)
                        $('#loginRCForm').submit();
					errorDiv.html('');
				}
				break;
		case 'login_email' :
				if (val == "") {
					bgRef.removeClass('noErrorIco').addClass('errorIco');
					errorDiv.html('Email address is required');
				}
				 else if(!(emailFilter.test(val))) {
					bgRef.removeClass('noErrorIco').addClass('errorIco');
					errorDiv.html('Please enter a valid email address');
				}
				 else if(val.match(illegalChars)) {
					bgRef.removeClass('noErrorIco').addClass('errorIco');
					errorDiv.html('The email address contains illegal characters');
				}
				else {
					asyncFormErrorCheck(field, val, fieldRef)
					bgRef.removeClass('errorIco').addClass('noErrorIco');
					errorDiv.html('');
				}
				break;
			case 'pass' :
				if (val.length < 5) {
					bgRef.removeClass('noErrorIco').addClass('errorIco');
					errorDiv.html('Password must be at least 5 characters');
				}
				else if(illegalPassChars.test(val)) {
					bgRef.removeClass('noErrorIco').addClass('errorIco');
					errorDiv.html('Password has invalid characters');
				}
				else {
					bgRef.removeClass('errorIco').addClass('noErrorIco');
					errorDiv.html('');
				}
                break;
               case 'passVerification' :
				if (val.length < 5) {
					bgRef.removeClass('noErrorIco').addClass('errorIco');
					errorDiv.html('Password must be at least 5 characters');
				}
				else if(illegalPassChars.test(val)) {
					bgRef.removeClass('noErrorIco').addClass('errorIco');
					errorDiv.html('Password has invalid characters');
				}
                else if(val != $("#password").val()){
                    bgRef.removeClass('noErrorIco').addClass('errorIco');
					errorDiv.html('Passwords don\'t match');
                    }
				else {
					bgRef.removeClass('errorIco').addClass('noErrorIco');
					errorDiv.html('');
				}
		break;
		case 'firstname' :
			if(val == "")	{
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('First name is required');
			}
			 else if(val.match(illegalChars)) {
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('First name has invalid characters');
			}
			else {
				bgRef.removeClass('errorIco').addClass('noErrorIco');
				errorDiv.html('');
			}
			break;
		case 'lastname' :
			if(val == "")	{
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('Last name is required');
			}
			 else if(val.match(illegalChars)) {
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('Last name has invalid characters');
			}
			else {
				bgRef.removeClass('errorIco').addClass('noErrorIco');
				errorDiv.html('');
			}
			break;
		case 'email' :
			if (val == "") {
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('Email address is required');
			}
			 else if(!(emailFilter.test(val))) {
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('Please enter a valid email address');
			}
			 else if(val.match(illegalChars)) {
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('The email address contains illegal characters');
			}
			else {
				asyncFormErrorCheck(field, val, fieldRef)
				bgRef.removeClass('errorIco').addClass('noErrorIco');
				errorDiv.html('');
			}
			break;
		case 'password' :
			if (val.length < 5) {
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('Password must be at least 5 characters');
			}
			else if(illegalPassChars.test(val)) {
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('Password has invalid characters');
			}
			else {
				bgRef.removeClass('errorIco').addClass('noErrorIco');
				errorDiv.html('');
			}
			break;
		case 'postalCode' :
			if(val == "")	{
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('ZIP code is required');
			}
			 else if(val.match(illegalChars)) {
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('ZIP code has invalid characters');
			}
			else {
				asyncFormErrorCheck('zipcode', val,folder,'error_postalCode','check_postalCode')
				bgRef.removeClass('errorIco').addClass('noErrorIco');
				errorDiv.html('');
			}
			break;
		case 'birthdayMonth':
			var bdayMonth = $("#birthdayMonth").val();
			if( bdayMonth >= 1 && bdayMonth <=12 || $.trim(bdayMonth) == '') {
				bgRef.removeClass('errorIco').addClass('noErrorIco');
				errorDiv.html('');
			}
			else {
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('Month must be an integer');
			}
			break;
		case 'birthdayDay':
			var bdayDay = $("#birthdayDay").val();
			if( bdayDay >= 1 && bdayDay <=31 || $.trim(bdayDay) == '') {
				bgRef.removeClass('errorIco').addClass('noErrorIco');
				errorDiv.html('');
			}
			else {
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('Day must be an integer');
			}
			break;
		case 'birthdayYear':
			var bdayYear = $("#birthdayYear").val();
			if( bdayYear >= 1 && bdayYear <=99 || $.trim(bdayYear) == '') {
				bgRef.removeClass('errorIco').addClass('noErrorIco');
				errorDiv.html('');
			}
			else {
				bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html('Year must be an integer');
			}
			break;
		case 'saleEmail' :
			var saleEmailError = "Uh oh! There\'s something wrong with your email address. Please try again."
			if (val == "") {
				//bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html(saleEmailError); //Email address is required
			}
			 else if(!(emailFilter.test(val))) {
				//bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html(saleEmailError); //Please enter a valid email address
			}
			 else if(val.match(illegalChars)) {
				//bgRef.removeClass('noErrorIco').addClass('errorIco');
				errorDiv.html(saleEmailError); //The email address contains illegal characters
			}
			else {
				asyncFormErrorCheck(field, val, fieldRef)
				//bgRef.removeClass('errorIco').addClass('noErrorIco');
				errorDiv.html('');
			}
	}
}

function clearBDate(ref) {
     if($(ref).val() == 'DD' || $(ref).val() == 'MM' || $(ref).val() == 'YY') {
        $("#birthdayDay").val('');
        $("#birthdayDay").css('color','#333');
        $("#birthdayMonth").val('');
        $("#birthdayMonth").css('color','#333');
        $("#birthdayYear").val('');
        $("#birthdayYear").css('color','#333');
   }
}

function asyncFormErrorCheck(key, val,fieldRef) {

    var isValid;
    var bgRef = fieldRef.parent();
	var errorDiv = fieldRef.siblings('.errorMsg');
    var asyncURL = "/community/async/isValid.do?";
    var asyncQuery = "key=" + key + "&value=" + encodeURIComponent(val);

    $.get(asyncURL + asyncQuery, function(xmlResponse) {
       if (document.implementation.createDocument){
         var domParser = new DOMParser();
        xml_doc = domParser.parseFromString(xmlResponse,"text/xml");
        }
       else if (window.ActiveXObject){
           xml_doc = new ActiveXObject("Microsoft.XMLDOM")
           xml_doc.async="false";
           xml_doc.loadXML(xmlResponse);
       }
        isValid = xml_doc.documentElement.getElementsByTagName('isValid')[0].firstChild.data;

          var loginDiv = fieldRef.parents("#loginmain");
        var password = loginDiv.find("#password");

       if(isValid == "false") {
           msgType = xml_doc.documentElement.getElementsByTagName('messageType')[0].firstChild.data;
            if (msgType=="exists-partial") {
//                displayMsg = xml_doc.documentElement.getElementsByTagName('displayMessage')[0].firstChild.data;
                loginDiv.find(".submitButton").hide();
                loginDiv.find("#fullUser").slideUp(function(){
                password.val("partial");
                   loginDiv.find("#partialUser").slideDown();
               });

            }
           else {
            bgRef.removeClass('noErrorIco').addClass('errorIco');
           	errorDiv.html(xml_doc.documentElement.getElementsByTagName('displayMessage')[0].firstChild.data);
            }
        }
       else{
           loginDiv.find(".submitButton").hide();
            loginDiv.find("#partialUser").css("display","none");
            loginDiv.find("#fullUser").css("display","block");
            password.focus();
       }
    });
}






function startProgress() {
    var hasError = false;
    $("#login").find(".eachFormField").each (function() {
        if ($(this).hasClass("errorIco") && ($(this).css("display")!='none')) {
            hasError = true;
            return;
        }
    });
    if (hasError == true) {
        return false;
    }
    else {
        $('#progressImgDiv').css("display","block");
        return true;
    }
}

function ajaxifyLogout(caller){
    $.get(caller.attr('href'), function(){
        window.location='/welcome/index.do';
    } );
    return false;
}

function getPageScroll(){

     var yScroll;

     if (self.pageYOffset) {
          yScroll = self.pageYOffset;
     } else if (document.documentElement && document.documentElement.scrollTop){      // Explorer 6 Strict
          yScroll = document.documentElement.scrollTop;
     } else if (document.body) {// all other Explorers
          yScroll = document.body.scrollTop;
     }

     arrayPageScroll = new Array('',yScroll)
     return arrayPageScroll;
}


function showInPageInterstitial(displayQuery) {
	var interstitialObj = $("<div id='interstitialInPage'>\
							<div class='closeContainer'><a href='#' onclick='closeLightbox();return false' class='closeX button'>close</a></div>\
							<div class='siteLogo'><!-- --></div>\
							<div class='interstitialMessage'> We have searched thousands of stores<br/>to find you the best deals on <div class='searchTerm'>"+ displayQuery + "</div>\
							</div></div>\
	")
	lightboxifyObject(interstitialObj,false,format1);
	setTimeout(function(){
		closeLightbox();
	},4000);
//    cookie, so we donot reshow interstitial on refresh and back button
    $.cookie("pr_entry_interstitial","true");
}

//add the class IE6LightboxFix to any element you want hidden for IE 6
function IE6DropDownHide() {
	if ($.browser.msie && $.browser.version.substr(0,1)<7)
		$('.IE6LightboxFix').hide();
}

function IE6DropDownShow() {
	if ($.browser.msie && $.browser.version.substr(0,1)<7)
		$('.IE6LightboxFix').show();
}


$(document).ready(function(){
    $(".js_form_validate").live("submit",function(){
        return $(this).validate();
    });
});



(function( $ ){
    var validations = {
        label : '',
        requiredMsg : 'Please enter a valid',
        invalidEmailMsg : 'Please enter a valid',
        minimumLengthMsg : 'must be at least',
        maximiumLengthMsg : 'must be less than',
        js_validate_email_exists : function() { return (minLength(this.val(),2) ? (validInput(this.val(),emailFilter1, true) && asyncErrorCheck('login_email',this.val())) : false);  },
        js_validate_new_email : function() { return (minLength(this.val(),2) ? (validInput(this.val(),emailFilter1, true) && asyncErrorCheck('email',this.val())) : false);  },
        js_validate_password : function() { return (minLength(this.val(),5)  ? (validInput(this.val(),illegalPassChars, false) && maxLength(this.val(),8)) : false);  },
        js_validate_name : function() { return (minLength(this.val(),2)  ? (validInput(this.val(),illegalChars, false) && maxLength(this.val(),20)) : false);  },
        js_validate_confirm_password : function() { return matchPasswords(this);},
        js_validate_salealert_email : function() { return (minLength(this.val(),2) ? (validInput(this.val(),emailFilter1, true)) : false) ;  }

    };

    var printMessage = "";
    var illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/;
    var emailFilter1 = /^.+@.+\..+$/;
    var illegalPassChars = /\s/;
    var alphaNumDashAposSpace = /^[a-zA-Z0-9 '\-]*$/;

    function minLength(val,minLength){
        if(val.length >= minLength) { return true; }
        else if(val.length == 0) { printMessage =  validations['requiredMsg'] + " " + validations['label'] + "."; return false;}
        else { printMessage = validations['label'] + " " + validations['minimumLengthMsg'] + " " + minLength + " characters"; return false; }
    }

    function maxLength(val,maxLength){
        if(val.length > maxLength) {
            printMessage = validations['label'] + " " + validations['maximiumLengthMsg'] + " " + maxLength + " characters"; return false;
        }
        else {return true;}
    }

    function matchPasswords(passwordRef) {
        var otherPassword = passwordRef.parents('form').find('.js_validate_password');
       if(passwordRef.val().length <= 0 && otherPassword.val().length <= 0){
           printMessage  = "";
           return false;
       }
       else if(passwordRef.val() != otherPassword.val()){
           printMessage  = "Passwords do not match!";
           return false;
       }
        else {return true;}
    }

    function validInput(val,regEx, shouldMatch) {
        if(regEx.test(val) == shouldMatch){ return true; }
        else {printMessage = validations['invalidEmailMsg'] + " " +  validations['label'] + "."; return false; }
    }

    function asyncErrorCheck(key, val,specialPartialHandling){
        var asyncURL = "/community/async/isValid.do?";
        var asyncQuery = "key=" + key + "&value=" + encodeURIComponent(val);
        var noError = true;
        jQuery.ajax({
            url: asyncURL + asyncQuery,
            success: function(xmlResponse) {
             if (document.implementation.createDocument){
               var domParser = new DOMParser();
              xml_doc = domParser.parseFromString(xmlResponse,"text/xml");
              }
             else if (window.ActiveXObject){
                 xml_doc = new ActiveXObject("Microsoft.XMLDOM")
                 xml_doc.async="false";
                 xml_doc.loadXML(xmlResponse);
             }
              isValid = xml_doc.documentElement.getElementsByTagName('isValid')[0].firstChild.data;
              messageType = xml_doc.documentElement.getElementsByTagName('messageType')[0].firstChild.data;

              if(isValid == "false") {
                  printMessage = xml_doc.documentElement.getElementsByTagName('displayMessage')[0].firstChild.data;
                  if(messageType == "exists-partial" && specialPartialHandling) {
                      noError = false;
                      closeLightbox();
                      lightboxifyLink('/account/signUpForm.do?partialFromLB=true&email=' + encodeURIComponent(val),true,format1,true);return false;
                  }
                   noError = false;
              }
              else {

                noError = true;
              }
          },
        async: false
    });
        return noError;
    }



    function validateField(valid,inputRef,formRef,errorDiv,superErrorMsg) {
        if(valid) {
                inputRef.siblings('.errorStatus').removeClass('errorIcon').addClass('checkIcon');
                inputRef.removeClass('errorField');
        }
        else {
            if(superErrorMsg) {
                printMessage = superErrorMsg;
            }
            inputRef.siblings('.errorStatus').removeClass('checkIcon').addClass('errorIcon');
            inputRef.addClass('errorField');
            errorDiv.append("<li>"+printMessage+"</li>");
            if(formRef.data('valid')) {
                formRef.data('valid',false);
                inputRef.focus();
            }
        }
    }

    function validateField2(valid,inputRef,formRef,errorDiv,superErrorMsg) {
        var popPosition;
        if(!valid) {
            if($('.validateWrapper .popupContainer').length >= 0) {
                $('.validateWrapper .popupContainer').remove();
            }
            var sorryText = "Sorry, there was a problem with the email address you provided.<div class='clearfix'><div class='errorField' style='padding:18px 0 10px 0;'>" + printMessage + "</div></div>";
            var popupifyContent = '<div class="clearfix closeContainer"><a href="#" onclick="fadeOutPopup($(this));return false;" class="closeX2 button">close</a></div><div class="emailMessageText">'+sorryText+'</div>';
            if(formRef.hasClass('js_position2'))
                popPosition = [100,190];
            else if(formRef.hasClass('js_position3'))
                popPosition = [100,-39];
            else
                popPosition = [100,125];
            popupify( $(popupifyContent), formRef.parents(".validateNewsletterSignup"), "bottom", popPosition, [0,0], undefined, true);
            if(formRef.data('valid')) {
                formRef.data('valid',false);
                inputRef.focus();
            }
            $('.validateWrapper .popupContainer').show();
        }

    }

    $.fn.validate = function(){
       var errorDiv = this.find('.js_error');
        errorDiv.slideUp().empty();
        var formRef = this;
        var skipBlankValidate = formRef.hasClass('js_skip_blank_validate');
        this.data('valid',true);
        this.find('input').each(function(){
            var val =  $(this).val();
            validations['label'] = $(this).attr('alt');
            if($(this).hasClass('js_validate_email_exists')) {
                if(!(skipBlankValidate && $(this).attr('title') == val))
                    validateField(minLength(val,2) ? (validInput(val,emailFilter1, true) && asyncErrorCheck('login_email',val,true)) : false,$(this),formRef,errorDiv);
            }
            if($(this).hasClass('js_validate_forgot_email_exists')) {
                if(!(skipBlankValidate && $(this).attr('title') == val))
                    validateField(minLength(val,2) ? (validInput(val,emailFilter1, true) && asyncErrorCheck('forgot_password_email',val,true)) : false,$(this),formRef,errorDiv);
            }
            if($(this).hasClass('js_validate_password')) {
                if(!(skipBlankValidate && $(this).attr('title') == val))
                    validateField(minLength(val,5)  ? (validInput(val,illegalPassChars, false) && maxLength(val,15)) : false,$(this),formRef,errorDiv,"Password should be a mix of alphanumeric characters and symbols (no spaces), 5-15 characters long.");
            }
            if($(this).hasClass('js_validate_new_email')) {
                if(!(skipBlankValidate && $(this).attr('title') == val))
                    validateField(minLength(val,2) ? (validInput(val,emailFilter1, true) && asyncErrorCheck('email',val,true)) : false,$(this),formRef,errorDiv);
            }
            if($(this).hasClass('js_validate_name')) {
                if(!(skipBlankValidate && $(this).attr('title') == val))
                    validateField(minLength($.trim(val),2)  ? (validInput(val,alphaNumDashAposSpace, true) && maxLength(val,20)) : false,$(this),formRef,errorDiv,validations['label'] +" must be 2-20 characters long and contain only letters, apostophes, dashes and spaces.");
            }
            if($(this).hasClass('js_validate_confirm_password')) {
                if(!(skipBlankValidate && $(this).attr('title') == val))
                    validateField( matchPasswords($(this)),$(this),formRef,errorDiv);
                }
            if($(this).hasClass('js_validate_sale_alert_email')) {
                if(!(skipBlankValidate && $(this).attr('title') == val))
                    validateField2(minLength(val,2) ? (validInput(val,emailFilter1, true) && asyncErrorCheck('email',val,false)) : false,$(this),formRef,errorDiv);
            }
            if($(this).hasClass('js_validate_salealert_email')) {
               validateField(minLength(val,2) ? (validInput(val,emailFilter1, true)) : false,$(this),formRef,errorDiv);
            }
            });


            if(!formRef.data('valid'))
                errorDiv.slideDown();
            return formRef.data('valid');
    };
}) (jQuery);

function forgotPasswordLightboxifyHelper(link, ajaxForm,layout,validateAjaxForm,emailRef) {
    var linkRef = link;
    var emailAdress = $.trim(emailRef.val());
    if(emailAdress != '')
        linkRef = insertURLParams(linkRef,'email',encodeURIComponent(emailAdress));
    lightboxifyLink(linkRef, ajaxForm,layout,validateAjaxForm);
}

 function handleFacebookLogin() {
         FB.getLoginStatus(function(response) {
             if (response.status === 'connected') {
                 var input = $("<input>").attr("type", "hidden").attr("name", "accessToken").val(response.authResponse.accessToken);
                 var fbForm =  $("#fbForm");
                 fbForm.append($(input));
                 fbForm.submit();
            } else {
              //this is called if the user hits cancel
            }
        });

    }


function handleSaleAlertFacebookLogin(addSAURL) {
         FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                var input = $("<input>").attr("type", "hidden").attr("name", "accessToken").val(response.authResponse.accessToken);
                var fbForm =  $("#fbForm");
                fbForm.append($(input));
                // do this via ajax and then on callback add the sale alert
                fbForm.ajaxSubmit(function(){
                    closeLightbox();
                    lightboxifyLink(addSAURL,false,format1);
                });
            } else {
              //this is called if the user hits cancel
            }
        });

    }
