/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);;//     Underscore.js 1.4.2
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
(function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,s=Function.prototype,o=r.push,u=r.slice,a=r.concat,f=r.unshift,l=i.toString,c=i.hasOwnProperty,h=r.forEach,p=r.map,d=r.reduce,v=r.reduceRight,m=r.filter,g=r.every,y=r.some,b=r.indexOf,w=r.lastIndexOf,E=Array.isArray,S=Object.keys,x=s.bind,T=function(e){if(e instanceof T)return e;if(!(this instanceof T))return new T(e);this._wrapped=e};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=T),exports._=T):e._=T,T.VERSION="1.4.2";var N=T.each=T.forEach=function(e,t,r){if(e==null)return;if(h&&e.forEach===h)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,s=e.length;i<s;i++)if(t.call(r,e[i],i,e)===n)return}else for(var o in e)if(T.has(e,o)&&t.call(r,e[o],o,e)===n)return};T.map=T.collect=function(e,t,n){var r=[];return e==null?r:p&&e.map===p?e.map(t,n):(N(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)}),r)},T.reduce=T.foldl=T.inject=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(d&&e.reduce===d)return r&&(t=T.bind(t,r)),i?e.reduce(t,n):e.reduce(t);N(e,function(e,s,o){i?n=t.call(r,n,e,s,o):(n=e,i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.reduceRight=T.foldr=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(v&&e.reduceRight===v)return r&&(t=T.bind(t,r)),arguments.length>2?e.reduceRight(t,n):e.reduceRight(t);var s=e.length;if(s!==+s){var o=T.keys(e);s=o.length}N(e,function(u,a,f){a=o?o[--s]:--s,i?n=t.call(r,n,e[a],a,f):(n=e[a],i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.find=T.detect=function(e,t,n){var r;return C(e,function(e,i,s){if(t.call(n,e,i,s))return r=e,!0}),r},T.filter=T.select=function(e,t,n){var r=[];return e==null?r:m&&e.filter===m?e.filter(t,n):(N(e,function(e,i,s){t.call(n,e,i,s)&&(r[r.length]=e)}),r)},T.reject=function(e,t,n){var r=[];return e==null?r:(N(e,function(e,i,s){t.call(n,e,i,s)||(r[r.length]=e)}),r)},T.every=T.all=function(e,t,r){t||(t=T.identity);var i=!0;return e==null?i:g&&e.every===g?e.every(t,r):(N(e,function(e,s,o){if(!(i=i&&t.call(r,e,s,o)))return n}),!!i)};var C=T.some=T.any=function(e,t,r){t||(t=T.identity);var i=!1;return e==null?i:y&&e.some===y?e.some(t,r):(N(e,function(e,s,o){if(i||(i=t.call(r,e,s,o)))return n}),!!i)};T.contains=T.include=function(e,t){var n=!1;return e==null?n:b&&e.indexOf===b?e.indexOf(t)!=-1:(n=C(e,function(e){return e===t}),n)},T.invoke=function(e,t){var n=u.call(arguments,2);return T.map(e,function(e){return(T.isFunction(t)?t:e[t]).apply(e,n)})},T.pluck=function(e,t){return T.map(e,function(e){return e[t]})},T.where=function(e,t){return T.isEmpty(t)?[]:T.filter(e,function(e){for(var n in t)if(t[n]!==e[n])return!1;return!0})},T.max=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&T.isEmpty(e))return-Infinity;var r={computed:-Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o>=r.computed&&(r={value:e,computed:o})}),r.value},T.min=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&T.isEmpty(e))return Infinity;var r={computed:Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o<r.computed&&(r={value:e,computed:o})}),r.value},T.shuffle=function(e){var t,n=0,r=[];return N(e,function(e){t=T.random(n++),r[n-1]=r[t],r[t]=e}),r};var k=function(e){return T.isFunction(e)?e:function(t){return t[e]}};T.sortBy=function(e,t,n){var r=k(t);return T.pluck(T.map(e,function(e,t,i){return{value:e,index:t,criteria:r.call(n,e,t,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(n<r||r===void 0)return-1}return e.index<t.index?-1:1}),"value")};var L=function(e,t,n,r){var i={},s=k(t);return N(e,function(t,o){var u=s.call(n,t,o,e);r(i,u,t)}),i};T.groupBy=function(e,t,n){return L(e,t,n,function(e,t,n){(T.has(e,t)?e[t]:e[t]=[]).push(n)})},T.countBy=function(e,t,n){return L(e,t,n,function(e,t,n){T.has(e,t)||(e[t]=0),e[t]++})},T.sortedIndex=function(e,t,n,r){n=n==null?T.identity:k(n);var i=n.call(r,t),s=0,o=e.length;while(s<o){var u=s+o>>>1;n.call(r,e[u])<i?s=u+1:o=u}return s},T.toArray=function(e){return e?e.length===+e.length?u.call(e):T.values(e):[]},T.size=function(e){return e.length===+e.length?e.length:T.keys(e).length},T.first=T.head=T.take=function(e,t,n){return t!=null&&!n?u.call(e,0,t):e[0]},T.initial=function(e,t,n){return u.call(e,0,e.length-(t==null||n?1:t))},T.last=function(e,t,n){return t!=null&&!n?u.call(e,Math.max(e.length-t,0)):e[e.length-1]},T.rest=T.tail=T.drop=function(e,t,n){return u.call(e,t==null||n?1:t)},T.compact=function(e){return T.filter(e,function(e){return!!e})};var A=function(e,t,n){return N(e,function(e){T.isArray(e)?t?o.apply(n,e):A(e,t,n):n.push(e)}),n};T.flatten=function(e,t){return A(e,t,[])},T.without=function(e){return T.difference(e,u.call(arguments,1))},T.uniq=T.unique=function(e,t,n,r){var i=n?T.map(e,n,r):e,s=[],o=[];return N(i,function(n,r){if(t?!r||o[o.length-1]!==n:!T.contains(o,n))o.push(n),s.push(e[r])}),s},T.union=function(){return T.uniq(a.apply(r,arguments))},T.intersection=function(e){var t=u.call(arguments,1);return T.filter(T.uniq(e),function(e){return T.every(t,function(t){return T.indexOf(t,e)>=0})})},T.difference=function(e){var t=a.apply(r,u.call(arguments,1));return T.filter(e,function(e){return!T.contains(t,e)})},T.zip=function(){var e=u.call(arguments),t=T.max(T.pluck(e,"length")),n=new Array(t);for(var r=0;r<t;r++)n[r]=T.pluck(e,""+r);return n},T.object=function(e,t){var n={};for(var r=0,i=e.length;r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},T.indexOf=function(e,t,n){if(e==null)return-1;var r=0,i=e.length;if(n){if(typeof n!="number")return r=T.sortedIndex(e,t),e[r]===t?r:-1;r=n<0?Math.max(0,i+n):n}if(b&&e.indexOf===b)return e.indexOf(t,n);for(;r<i;r++)if(e[r]===t)return r;return-1},T.lastIndexOf=function(e,t,n){if(e==null)return-1;var r=n!=null;if(w&&e.lastIndexOf===w)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);var i=r?n:e.length;while(i--)if(e[i]===t)return i;return-1},T.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;var r=Math.max(Math.ceil((t-e)/n),0),i=0,s=new Array(r);while(i<r)s[i++]=e,e+=n;return s};var O=function(){};T.bind=function(t,n){var r,i;if(t.bind===x&&x)return x.apply(t,u.call(arguments,1));if(!T.isFunction(t))throw new TypeError;return i=u.call(arguments,2),r=function(){if(this instanceof r){O.prototype=t.prototype;var e=new O,s=t.apply(e,i.concat(u.call(arguments)));return Object(s)===s?s:e}return t.apply(n,i.concat(u.call(arguments)))}},T.bindAll=function(e){var t=u.call(arguments,1);return t.length==0&&(t=T.functions(e)),N(t,function(t){e[t]=T.bind(e[t],e)}),e},T.memoize=function(e,t){var n={};return t||(t=T.identity),function(){var r=t.apply(this,arguments);return T.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},T.delay=function(e,t){var n=u.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},T.defer=function(e){return T.delay.apply(T,[e,1].concat(u.call(arguments,1)))},T.throttle=function(e,t){var n,r,i,s,o,u,a=T.debounce(function(){o=s=!1},t);return function(){n=this,r=arguments;var f=function(){i=null,o&&(u=e.apply(n,r)),a()};return i||(i=setTimeout(f,t)),s?o=!0:(s=!0,u=e.apply(n,r)),a(),u}},T.debounce=function(e,t,n){var r,i;return function(){var s=this,o=arguments,u=function(){r=null,n||(i=e.apply(s,o))},a=n&&!r;return clearTimeout(r),r=setTimeout(u,t),a&&(i=e.apply(s,o)),i}},T.once=function(e){var t=!1,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}},T.wrap=function(e,t){return function(){var n=[e];return o.apply(n,arguments),t.apply(this,n)}},T.compose=function(){var e=arguments;return function(){var t=arguments;for(var n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},T.after=function(e,t){return e<=0?t():function(){if(--e<1)return t.apply(this,arguments)}},T.keys=S||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var n in e)T.has(e,n)&&(t[t.length]=n);return t},T.values=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push(e[n]);return t},T.pairs=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push([n,e[n]]);return t},T.invert=function(e){var t={};for(var n in e)T.has(e,n)&&(t[e[n]]=n);return t},T.functions=T.methods=function(e){var t=[];for(var n in e)T.isFunction(e[n])&&t.push(n);return t.sort()},T.extend=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]=t[n]}),e},T.pick=function(e){var t={},n=a.apply(r,u.call(arguments,1));return N(n,function(n){n in e&&(t[n]=e[n])}),t},T.omit=function(e){var t={},n=a.apply(r,u.call(arguments,1));for(var i in e)T.contains(n,i)||(t[i]=e[i]);return t},T.defaults=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]==null&&(e[n]=t[n])}),e},T.clone=function(e){return T.isObject(e)?T.isArray(e)?e.slice():T.extend({},e):e},T.tap=function(e,t){return t(e),e};var M=function(e,t,n,r){if(e===t)return e!==0||1/e==1/t;if(e==null||t==null)return e===t;e instanceof T&&(e=e._wrapped),t instanceof T&&(t=t._wrapped);var i=l.call(e);if(i!=l.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if(typeof e!="object"||typeof t!="object")return!1;var s=n.length;while(s--)if(n[s]==e)return r[s]==t;n.push(e),r.push(t);var o=0,u=!0;if(i=="[object Array]"){o=e.length,u=o==t.length;if(u)while(o--)if(!(u=M(e[o],t[o],n,r)))break}else{var a=e.constructor,f=t.constructor;if(a!==f&&!(T.isFunction(a)&&a instanceof a&&T.isFunction(f)&&f instanceof f))return!1;for(var c in e)if(T.has(e,c)){o++;if(!(u=T.has(t,c)&&M(e[c],t[c],n,r)))break}if(u){for(c in t)if(T.has(t,c)&&!(o--))break;u=!o}}return n.pop(),r.pop(),u};T.isEqual=function(e,t){return M(e,t,[],[])},T.isEmpty=function(e){if(e==null)return!0;if(T.isArray(e)||T.isString(e))return e.length===0;for(var t in e)if(T.has(e,t))return!1;return!0},T.isElement=function(e){return!!e&&e.nodeType===1},T.isArray=E||function(e){return l.call(e)=="[object Array]"},T.isObject=function(e){return e===Object(e)},N(["Arguments","Function","String","Number","Date","RegExp"],function(e){T["is"+e]=function(t){return l.call(t)=="[object "+e+"]"}}),T.isArguments(arguments)||(T.isArguments=function(e){return!!e&&!!T.has(e,"callee")}),typeof /./!="function"&&(T.isFunction=function(e){return typeof e=="function"}),T.isFinite=function(e){return T.isNumber(e)&&isFinite(e)},T.isNaN=function(e){return T.isNumber(e)&&e!=+e},T.isBoolean=function(e){return e===!0||e===!1||l.call(e)=="[object Boolean]"},T.isNull=function(e){return e===null},T.isUndefined=function(e){return e===void 0},T.has=function(e,t){return c.call(e,t)},T.noConflict=function(){return e._=t,this},T.identity=function(e){return e},T.times=function(e,t,n){for(var r=0;r<e;r++)t.call(n,r)},T.random=function(e,t){return t==null&&(t=e,e=0),e+(0|Math.random()*(t-e+1))};var _={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};_.unescape=T.invert(_.escape);var D={escape:new RegExp("["+T.keys(_.escape).join("")+"]","g"),unescape:new RegExp("("+T.keys(_.unescape).join("|")+")","g")};T.each(["escape","unescape"],function(e){T[e]=function(t){return t==null?"":(""+t).replace(D[e],function(t){return _[e][t]})}}),T.result=function(e,t){if(e==null)return null;var n=e[t];return T.isFunction(n)?n.call(e):n},T.mixin=function(e){N(T.functions(e),function(t){var n=T[t]=e[t];T.prototype[t]=function(){var e=[this._wrapped];return o.apply(e,arguments),F.call(this,n.apply(T,e))}})};var P=0;T.uniqueId=function(e){var t=P++;return e?e+t:t},T.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var H=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","  ":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;T.template=function(e,t,n){n=T.defaults({},n,T.templateSettings);var r=new RegExp([(n.escape||H).source,(n.interpolate||H).source,(n.evaluate||H).source].join("|")+"|$","g"),i=0,s="__p+='";e.replace(r,function(t,n,r,o,u){s+=e.slice(i,u).replace(j,function(e){return"\\"+B[e]}),s+=n?"'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?"'+\n((__t=("+r+"))==null?'':__t)+\n'":o?"';\n"+o+"\n__p+='":"",i=u+t.length}),s+="';\n",n.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{var o=new Function(n.variable||"obj","_",s)}catch(u){throw u.source=s,u}if(t)return o(t,T);var a=function(e){return o.call(this,e,T)};return a.source="function("+(n.variable||"obj")+"){\n"+s+"}",a},T.chain=function(e){return T(e).chain()};var F=function(e){return this._chain?T(e).chain():e};T.mixin(T),N(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];T.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),(e=="shift"||e=="splice")&&n.length===0&&delete n[0],F.call(this,n)}}),N(["concat","join","slice"],function(e){var t=r[e];T.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}}),T.extend(T.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);;/*
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
}(jQuery));;/*jslint browser: true */ /*global jQuery: true */

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
    edit: function(a, add) {
      $(document).one('close.facebox', function() {
        $(document).attr('title', 'My Account - LivingSocial');
      })
      $.facebox({ajax: $(a).attr('href')});
      if (add) {
        $(document).attr('title', 'Add Credit Card - LivingSocial');
      }
      else {
        $(document).attr('title', 'Edit Credit Card - LivingSocial');
      }
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
          if(Me.id()() == null) {
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

  getUserLikes: function() {
    FB.api('/me/likes', function(response) {
      if (response.data) {
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
    var args = [];
    if (data.params && !data.href.match(/\?/)) {
      for (var k in data.params) { if (data.params[k]) { args.push(encodeURIComponent(k) + "=" + encodeURIComponent(data.params[k])); } }
    }
    if (data.href.match(/\?/)) { data.href += "&" + args.join("&"); } else { data.href += "?" + args.join("&"); }
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
          clipObject = clip;
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
    var render_share = function(evt, data) {
      var me = data.body;
      var uid = dls.viewer.id;

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
    if (document.cookie.match(/authd/)) {
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

    $('.gift-coupons li input[type="radio"]').change( function() {
      var li = $(this).parents('li');
      var lis = $(this).parents('ul').find('li');
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
    $('.gift-coupons').each (function(i,v) {
      var e = $(this);
      if ((e.find('.gift-headers input:checked').length === 0) || !valid) {
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
    var envelopes = $('.gift-coupons li input[type="radio"][value="envelope"]:checked').length;

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
    var viewed_placements = [];
    $('.placements').each(function() {
      var self = $(this);
      var placement = self.attr('data-ls-placement');
      var campaign = self.attr('data-ls-campaign');
      if(typeof(placement) != 'undefined') {
        if (!_.contains(viewed_placements, placement)) {
          _gaq.push(['_trackEvent', 'Campaigns', campaign, 'view_'+placement]);
          viewed_placements.push(placement);
        }
        self.find("a").click(function(e){
          _gaq.push(['_trackEvent', 'Campaigns', campaign, 'click_'+placement]);
        });
      }
    });
  }
}
;$(function() {
  setTimeout(function(){
    dls.placements.init();
  }, 500);
});
;var plus = {
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
      dls = root.dls,
      $container = null,
      $button = null;

  var tokenData = {valid_token: false};


  dls.IncentivizedDeal = {
    init: init
  };


  function init(){
    $container = $('#incentivized-deal-button-container')
    $button = $('#incentivized-deal-button')

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
    $button.text('Buy now!').removeClass('disabled loading');
  }

  function showUnavailableButton(){
    $container.addClass('unavailable');
    $button.text('Unavailable').addClass('disabled').removeClass('loading');
    showAlert();
    shiftPriceOver('210px');
  }

  function showLoginButton(){
    $container.addClass('login-first');
    $button.text('Log in first').addClass('btn-secondary').removeClass('disabled loading');
  }

  function showAlert(){
    var $alert = $('#incentivized-token-alert')
    var $close = $('#incentivized-close-button')
    $alert.delay(2000).slideDown()
    $close.click(function(){
      $alert.slideUp()
    })
  }

  function shiftPriceOver(right){
    $('#deal-buy-box .deal-price').css({right: right})
  }

}(window));
;$.extend(Date.prototype, {
  monthAbbreviations: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
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

  mobileHeaderFormatted: function() {
    return "" + this.monthAbbreviations[this.getMonth()] + " " + this.getDate();
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
    tourDateMessage: "travelers & departure date",
    tour: false,
    tourLength: 0,
    flights: false,
    numTravelers: 1,
    minimumNights: 1,
    mobile: false,
    currencySymbol: "$",
    hoverAbTest: "original"

    // week offset - does the calendar start on sunday or monday?
    // button labels (translation), next, previous etc., button elements etc.
  };
}

$.extend(ItineraryBuilder.prototype, {
  
  markerClassName: 'hasItineraryBuilder',
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
    if (settings.minimumNights) { this._defaults.minimumNights = parseInt(settings.minimumNights, 0); }
    if (settings.currencySymbol) { this._defaults.currencySymbol = settings.currencySymbol; }
    if (settings.tourLength) { this._defaults.tourLength = parseInt(settings.tourLength, 0); }
    if (settings.tour) {
      this._defaults.tour = settings.tour;
      this._handleTravelersSelection(target);
    }
    if (settings.airTour) {
      this._defaults.airTour = settings.airTour;
      this._handleFlightSelection(target);
      this._handleDepartureAirportSelection(target);
    } else { this._handleRoomTypeSelection(); }
    if (settings.mobile) {
      this._defaults.mobile = settings.mobile;
      this._handleMobileBookNowClick();
    } else { this._handleBookNowButtonClick(); }
    if (settings.hoverAbTest) { this._defaults.hoverAbTest = settings.hoverAbTest };

    this._initCheckInCalendar();
    
    this._setUIStateCheckIn(target);
    
    this._initTooltips(target);
    this._handleCheckInDateHeaderClick(target);
    this._handleCheckOutDateHeaderClick(target, settings);
    this._loadInventory();
  },

  _checkInHeaderContent: function() {
    var self = this;
    var content = [];
    if (self.checkInDate) {
      content.push("<div class='title-checkin'>");
      if (self._defaults.tour) {
        content.push(self.checkInDate.tourHeaderFormatted());
        content.push("</div><div class='selection-info'>" + self._defaults.numTravelers + " traveler");
        if (self._defaults.numTravelers > 1) { content.push("s"); }
        if (self._defaults.airTour) { content.push(" : from " + self._selectedDepartureAirport()); }
      }
      else if (self._defaults.mobile) { content.push(self.checkInDate.mobileHeaderFormatted()); }
      else { content.push("<span>checking in</span> " + self.checkInDate.headerFormatted()); }
      content.push("</div>");
    } else {
      if (self._defaults.tour) { content.push(self._defaults.tourDateMessage); }
      else { content.push(self._defaults.checkInDateMessage); }
    }
    return content.join("");
  },

  _checkOutHeaderContent: function() {
    var self = this;
    var content = [];
    if (self.checkOutDate) {
      content.push("<div class='title-checkout'>");
      if (self._defaults.mobile) { content.push(self.checkOutDate.mobileHeaderFormatted()); }
      else { content.push("<span>checking out</span> " + self.checkOutDate.headerFormatted()); }
      content.push("</div>");
    } else {
      content.push(self._defaults.checkOutDateMessage);
    }
    return content.join("");
  },

  _transitionSpeed: function(){
    if (this._defaults.mobile) {
      return 100;
    } else {
      return 250;
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
        var cell = $('<td class="ineligible"><div class="date"></div></td>');
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
          if (self._validCheckOutDate($(cell).data('date'))) {
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

  _registerTourHovering: function(target) {
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
    var monthLabel = month.monthNames[month.getMonth()] + ' ' + month.getFullYear();
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
      $(day).find(".date").text(day.date.getDate());
      $(day).data('date', day.date);
      self._applyDayCellStyles(day, month);
      iterator.setDate(iterator.getDate() + 1);
    });

    month.setMonth(month.getMonth() + 1);
    self._handleMonthNavClick(target);
    if (this._defaults.tour) { this._registerTourHovering(target); }
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
    var returning = false;
    var self = this;
    if (date.afterToday(this.browserStartDate)) {
      for (i = 0; i < this._defaults.minimumNights; i ++) {
        if (self._availableOptionsForDate(date.addDays(i)).length > 0) {
          returning = true;
        } else {
          returning = false;
          break;
        }
      }
    }
    return returning;
  },

  _validCheckOutDate: function(date) {
    var self = this;
    var returning = false;
    if (date && self.checkInDate && date.afterToday(self.checkInDate.addDays(self._defaults.minimumNights - 1))) {
      $.each(self._availableOptionsForDate(date.date_by_subtracting_days(1)), function(i, option) {
        if (self._roomTypeIdsForDate(self.checkInDate).length > 0) {
          $.each(self._roomTypeIdsForDate(self.checkInDate), function(j, id) {
            if (id == option.room_type_id) {
              returning = true;
            }
          });
        }
      });
    }
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
              if ((option.remaining_orders >= self._defaults.numTravelers) && option.room_type_id !== undefined) { dateOptions.push(option); }
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

  _availableFlightOptionsForDate: function(date) {
    var self = this;
    var dateOptions = [];
    if (self.inventory && self.inventory.length > 0) {
      $.each(self.inventory, function(i, day) {
        if (day.hasOwnProperty(date.formatted()) || day.hasOwnProperty(date.addDays(1).formatted())) {
          $.each(day, function(j, options) {
            $.each(options, function(k, option) {
              if ((option.remaining_orders >= self._defaults.numTravelers) && option.departure_airport !== undefined) { dateOptions.push(option); }
            });
          });
        }
      });
    }
    return dateOptions;
  },

  _departureAirportsForDate: function(date) {
    var airports = [];
    $.each(this._availableFlightOptionsForDate(date), function(i, option) {
      airports.push(option.departure_airport);
    });
    return airports;
  },

  _applyDayCellStyles: function(cell, date) {
    this._resetCell(cell);
    this._calculateDayEligibility(cell);
    this._handleDateClick(cell);
    if (!this._defaults.tour) {
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

    if (this.checkInDate) {
      if (dateToCompare.toString() === this.checkInDate.toString()) {
        $(cell).addClass('selected');
      } else if (dateToCompare.afterToday(this.checkInDate) && this.checkInDate.addDays(this._defaults.minimumNights).afterToday(dateToCompare)) {
        this._makeRequiredNight(cell);
      }
    }
    if (this._defaults.hoverAbTest !== "original" && !this._defaults.tour && !this._defaults.airTour && $(cell).hasClass("eligible") && !$(cell).hasClass("required-night")) {
      this._setPriceHover(cell, dateToCompare);
    }
  },

  _setPriceHover: function(cell, date) {
    $(cell).addClass("price-hover");
    $(cell).find(".date").prepend("<div class='price-hover-bubble "+this._defaults.hoverAbTest+"'>"+ this._hoverPriceText(date) +"<div class='arrow-down'></div></div>");

    $(cell).bind("mouseover", function(e) {
      e.preventDefault();
      $(e.currentTarget).find(".price-hover-bubble").show();
    });
    $(cell).bind("mouseout", function(e) {
      e.preventDefault();
      $(e.currentTarget).find(".price-hover-bubble").hide();
    });
  },

  _hoverPriceText: function(date) {
    var self = this;
    var price = null;
    var priceText = "";

    if (!this.checkInDate || self._defaults.hoverAbTest === "night_price") {
      $.each(self._availableOptionsForDate(date), function(i, option) {
        if (price === null || option.price < price) { price = option.price; }
        priceText = self._defaults.currencySymbol+""+price;
      });
    } else if(self._defaults.hoverAbTest === "avg_night_price" || self._defaults.hoverAbTest == "subtotal_price") {

      var potentialRoomNight = self.checkInDate;

      while (date.afterToday(potentialRoomNight)) {
        var dayPrice = null;
        $.each(self._availableOptionsForDate(potentialRoomNight), function(i, option) {
          if (dayPrice === null || option.price < dayPrice) { dayPrice = option.price; }
        });
        price += dayPrice;
        potentialRoomNight = potentialRoomNight.addDays(1);
      }

      if (self._defaults.hoverAbTest == "avg_night_price") {
        var nightsOfStay = Date.getNightsInRange(self.checkInDate, date).length;
        price = Math.ceil(price / nightsOfStay);
        priceText = self._defaults.currencySymbol+""+price+"<br /><em>avg/night</em>";
      } else {
        priceText = "<em>subtotal:</em><br />"+self._defaults.currencySymbol+""+price;
      }
    }

    return priceText;
  },

  _makeRequiredNight: function(cell) {
    var self = this;
    $(cell).addClass("required-night");
    $(cell).find(".date").prepend("<div class='required-night-tooltip'>" + this._defaults.minimumNights + " nights<br /><em>minimum</em><div class='arrow-down'></div></div>");
    if (self._defaults.mobile === true) {
      $(cell).bind("click", function(e) {
        e.preventDefault();
        alert("minimum " + self._defaults.minimumNights + " night stay");
      });
    } else {
      $(cell).bind("mouseover", function(e) {
        e.preventDefault();
        $(e.currentTarget).find(".required-night-tooltip").show();
      });
      $(cell).bind("mouseout", function(e) {
        e.preventDefault();
        $(e.currentTarget).find(".required-night-tooltip").hide();
      });
    }
  },

  _resetCell: function(cell) {
    $(cell).addClass('ineligible');
    $(cell).removeClass('eligible');
    $(cell).removeClass('prev-month');
    $(cell).removeClass('next-month');
    $(cell).removeClass('cur-month');
    $(cell).removeClass('selected');
    $(cell).removeClass('required-night');
    $(cell).removeClass('price-hover');
    $(cell).unbind("mouseover").unbind("mouseout");
  },

  _calculateDayEligibility: function(cell) {
    var self = this;
    var dateToCompare = $(cell).data('date');
    if (this.checkInDate) {
      if (dateToCompare.afterToday(self.checkInDate.addDays(self._defaults.minimumNights-1))) {
        if (self._validCheckOutDate(dateToCompare)) {
          $(cell).removeClass('ineligible');
          $(cell).addClass('eligible');
        } else if (self.checkOutRangeEndDate === null) {
          self.checkOutRangeEndDate = dateToCompare;
        }
      }
    } else if (self._validCheckInDate(dateToCompare)) {
      $(cell).removeClass('ineligible');
      $(cell).addClass('eligible');
    }
    if (this._defaults.tour) {
      var available = false;
      $.each(self._availableOptionsForDate(dateToCompare), function(i, option) {
        if (self._defaults.numTravelers <= option.remaining_orders) {
          available = true;
        }
      });

      if (!available) {
        $(cell).addClass('ineligible');
        $(cell).removeClass('eligible');
      }
    }
    if (this.checkOutRangeEndDate !== null && dateToCompare.afterToday(this.checkOutRangeEndDate)) {
      $(cell).addClass('ineligible');
      $(cell).removeClass('eligible');
    }

    if (this._defaults.airTour) {
      if (self._departureAirportsForDate(dateToCompare).size === 0) {
        $(cell).addClass('ineligible');
        $(cell).removeClass('eligible');
      } else if ($.inArray(this._selectedDepartureAirport(), self._departureAirportsForDate(dateToCompare)) < 0) {
        $(cell).addClass('ineligible');
        $(cell).removeClass('eligible');
      }
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
        if (self._defaults.tour) {
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
    var rooms = $(".room-types .room a").not(".btn"); // don't want to edit the buy button on mobile
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
      if ($(room).closest(".room").hasClass('sold-out-room')) {
        $(room).find(".status .night-label").hide();
        $(room).find(".status .price").hide();
        $(room).find(".status .cur-symbol").hide();
        if ($(room).find(".status .sold-out").length) {
          $(room).find(".status .sold-out").show();
        } else {
          $(room).find(".status").append("<span class='sold-out'>sold out</span>");
        }
      } else {
        $(room).find(".status .night-label").show();
        $(room).find(".status .price").show();
        $(room).find(".status .cur-symbol").show();
        $(room).find(".status .sold-out").hide();
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
      roomRatesText.push(" <strong>"+self._defaults.currencySymbol+""+price+"</strong> (");
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
        
        $(".book-now-button").removeClass('disabled');
      }
      
    });
  },

  _handleFlightSelection: function(target) {
    var self = this;

    // FIXME don't hard-code
    $(target).find('.room-types a').bind('click', function(e) {
      e.preventDefault();

      if ($(this).closest('.room').hasClass('sold-out-room')) {
        return null;
      } else {
        $(target).find('.room-types .room').removeClass("selected");
        $(this).closest('.room').addClass('selected');
        self.selectedRoomType = $(this).find('.name').text();
        self.selectedRoomTypeId = parseInt($(this).attr("data-room-type-id"), 0);

        self._updatePrice();

        $(".book-now-button").removeClass('disabled');
      }

    });
  },

  _updatePrice: function() {
    var self = this;
    var currencySymbol = this._defaults.currencySymbol,
        dollars = "0",
        cents = "00",
        option = null,
        flightOption = null;

    if (this._defaults.airTour) {
      if (this.checkInDate) {
        option = self._availableOptionsForDate(self.checkInDate)[0];
        dollars = parseInt(option.price, 0);
        flightOption = self._selectedFlightOption();
        dollars += parseInt(flightOption.price, 0);
      }
    } else {
      var element = $(".room.selected a");
      if ($(element).length > 0) {
        dollars = String($(element).data().price).split(".")[0];
        cents = String($(element).data().price).split(".")[1];
      }
    }
    dollars = parseInt(dollars, 0);
    if ((this._defaults.airTour || this._defaults.tour)) {
      var container = $(".flight .inventory");
      if (option) { container.find(".amount-left .num-left").text(option.remaining_orders); }
      container.find(".per-person-price .price").text(dollars);
      $("#price-breakdown").remove();
      if (this._defaults.numTravelers > 1 && dollars > 0) {
        $("#price-row").prepend("<div id='price-breakdown'>" + this._defaults.numTravelers + " x travelers @ <span class='per-person-price'><sup>$</sup>" + dollars + ".<sup>00</sup></span></div>");
      }
    }
    dollars *= this._defaults.numTravelers;
    $('#price-row').find(".dollars").text(dollars);
    $('#price-row').find(".cents").text(cents);
  },
  
  _handleBookNowButtonClick: function() {
    var self = this;
    $(".book-now-button").bind("click", function(e) {
      e.preventDefault();
      if ($(this).hasClass('disabled')) {
        return null;
      } else {
        self._sendOptionIdsToServer();
        $(this).addClass('disabled').find("span").text("loading...");
      }
    });
  },

  _handleMobileBookNowClick: function() {
    var self = this;
    $(".book-now-button").bind("click", function(e) {
      e.preventDefault();
      roomContainer = $(this).closest('.room-container')
      self.selectedRoomType = roomContainer.find('.name').text();
      self.selectedRoomTypeId = parseInt(roomContainer.find("a").attr("data-room-type-id"), 0);
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
      if (this._defaults.tour) {
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
    var returning = false;
    for (var i=0; i < this.inventory.length; i++) {
      var obj = this.inventory[i];
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          var inventoryDate = Date.dateFromString(prop);
          if (self.checkInDate) {
            var inventoryDate = new Date(inventoryDate.getFullYear(), inventoryDate.getMonth(), parseInt(inventoryDate.getDate() + 1, 0));
            if (inventoryDate && inventoryDate.isFutureMonthFrom(month) && self._validCheckOutDate(inventoryDate)) { returning = true; }
          } else {
            if (inventoryDate && inventoryDate.isFutureMonthFrom(month) && self._validCheckInDate(inventoryDate)) { returning = true; }
          }
        }
      }
    }
    return returning;
  },

  _setUIStateCheckIn: function(target) {
    var segmentCheckIn, segmentCheckOut, segmentRoomType;
    segmentCheckIn = $(".segment:nth-child(1)");
    segmentCheckIn.addClass("active").removeClass("userdata inactive");
    this._initCheckInCalendar();
    segmentCheckIn.find(".segment-content").slideDown();
    segmentCheckIn.find("#header-check-in .title").empty().append(this._checkInHeaderContent());
    this._setMobileDownArrow();
    
    segmentCheckOut = $(".segment:nth-child(2)");
    segmentCheckOut.removeClass("active userdata").addClass("inactive");
    segmentCheckOut.find("#check-out.calendar").empty();
    segmentCheckOut.find(".segment-content").hide();
    segmentCheckOut.find("#header-check-out .title").empty().append("check-out");

    segmentRoomType = $(".segment:nth-child(3)");
    segmentRoomType.removeClass("active").addClass("inactive");
    segmentRoomType.find(".segment-content").hide();
    $(".book-now-button").addClass('disabled');
  },
  
  _setUIStateCheckOut: function(target) {
    var segmentCheckIn, segmentCheckOut, segmentRoomType;
    segmentCheckIn = $(".segment:nth-child(1)");
    segmentCheckIn.addClass("userdata").removeClass("inactive");
    segmentCheckIn.find("#check-in.calendar").empty();
    segmentCheckIn.find(".segment-content").slideUp(this._transitionSpeed());
    segmentCheckIn.find("#header-check-in .title").empty().append(this._checkInHeaderContent());

    segmentCheckOut = $(".segment:nth-child(2)");
    segmentCheckOut.addClass("active").removeClass("userdata inactive");
    segmentCheckOut.find("#check-out.calendar").empty();
    var self = this;
    setTimeout(function() {
      segmentCheckOut.find(".segment-content").slideDown(self._transitionSpeed());
    }, self._transitionSpeed());
    
    this._initCheckOutCalendar();
    segmentCheckOut.find("#header-check-out .title").empty().append(this._checkOutHeaderContent());
    this._setMobileDownArrow();

    segmentRoomType = $(".segment:nth-child(3)");
    segmentRoomType.removeClass("active").addClass("inactive");
    segmentRoomType.find(".segment-content").hide();
    $(".book-now-button").addClass('disabled');
  },
  
  _setUIStateRoomType: function(target) {
    var self = this;
    var segmentCheckIn, segmentCheckOut, segmentRoomType;
    segmentCheckIn = $(".segment:nth-child(1)");
    segmentCheckIn.find("#check-in.calendar").empty();
    segmentCheckIn.find(".segment-content").hide();
    segmentCheckIn.find("#header-check-in .title").empty().append(this._checkInHeaderContent());
    
    segmentCheckOut = $(".segment:nth-child(2)");
    segmentCheckOut.addClass("userdata").removeClass("inactive");
    segmentCheckOut.find("#check-out.calendar").empty();
    segmentCheckOut.find(".segment-content").slideUp(this._transitionSpeed());
    segmentCheckOut.find("#header-check-out .title").empty().append(this._checkOutHeaderContent());
    this._setMobileDownArrow();
    segmentRoomType = $(".segment:nth-child(3)");
    segmentRoomType.addClass("active").removeClass("inactive");
    setTimeout(function() {
      segmentRoomType.find(".segment-content").slideDown(self._transitionSpeed());
    }, self._transitionSpeed());
    segmentRoomType.find(".room").removeClass("selected");
    $(".book-now-button").addClass('disabled');
    this._selectFirstAvailableRoom(target);
    this._setMobileRoomContainerSize();
  },

  _setMobileRoomContainerSize: function() {
    var self = this;
    if (this._defaults.mobile) {
      if ($(".room-types").height() && $(".room-types").height() > 0) {
        var newHeight = $(".room-types").height()+$("h2.label").height()+$(".header").height();
        if (newHeight > $("#itinerary-builder.mobile #itinerary-segments").height()) {
          $("#itinerary-builder.mobile #itinerary-segments").height(newHeight);
        }
      } else {
        setTimeout(function() {
          self._setMobileRoomContainerSize();
        }, 100);
      }
    }
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
    segmentCheckIn.find(".segment-content").slideUp(self._transitionSpeed());
    segmentCheckIn.find("#header-check-in .title").empty().append(this._checkInHeaderContent());

    segmentRoomType = $(".segment:nth-child(2)");
    segmentRoomType.addClass("active").removeClass("inactive");
    setTimeout(function() {
      segmentRoomType.find(".segment-content").slideDown(self._transitionSpeed());
    }, self._transitionSpeed());
    segmentRoomType.find(".room").removeClass("selected");
    $(".book-now-button").addClass('disabled');
    this._selectFirstAvailableRoom(target);
    self._updatePrice();
  },

  _selectFirstAvailableRoom: function(target) {
    if (!this._defaults.mobile) {
      setTimeout(function() {
        var firstAvailableRoom = target.find(".room-types .room:not(.sold-out-room):first a");
        firstAvailableRoom.trigger("click");
      }, 500);
    }
  },

  _optionIdsForTour: function() {
    var self = this;
    var selectedOptionIds = [];
    $.each(this._availableOptionsForDate(this.checkInDate), function(i, option) {
      if (self._defaults.airTour) {
        selectedOptionIds.push(option.option_id);
      } else if ($.inArray(option.option_id, selectedOptionIds) < 0 && self.selectedRoomTypeId === option.room_type_id) {
        selectedOptionIds.push(option.option_id);
      }
    });
    if (self._defaults.airTour) {
      selectedOptionIds.push(self._selectedFlightOption().option_id);
    }
    return selectedOptionIds;
  },

  _handleTravelersSelection: function(target) {
    var self = this;
    self._defaults.numTravelers = $(target).find("select.travelers-selection").val();
    $(target).find("select.travelers-selection").change(function(e) {
      self._defaults.numTravelers = $(e.currentTarget).val();
      self._hideOrShowCalendarOverlay(target);
      self._populateCalendar(target);
      self._updatePrice();
    });
  },

  _handleDepartureAirportSelection: function(target) {
    var self = this;
    this._updateFlightFilters(target);
    $(target).find("select.departure-airport-selection").change(function(e) {
      self._updateFlightFilters(target);
      self._hideOrShowCalendarOverlay(target);
      self._populateCalendar(target);
      self._updatePrice();
    });
  },

  _hideOrShowCalendarOverlay: function(target) {
    if(this._defaults.numTravelers && this._selectedDepartureAirport()) {
      $(target).find(".calendar-overlay").hide();
    } else {
      $(target).find(".calendar-overlay").show();
    }
  },

  _updateFlightFilters: function(target) {
    flightOptions = $(target).find(".room-types .room");
    var self = this;
    $.each(flightOptions, function(i, flightOption) {
      $(flightOption).show();
      $(flightOption).removeClass("sold-out-room");
      if ($(flightOption).find("a").attr("data-departure-airport") !== self._selectedDepartureAirport()) {
        $(flightOption).hide();
        $(flightOption).addClass("sold-out-room");
      }
    });
  },

  _selectedDepartureAirport: function() {
    return $("select.departure-airport-selection option:selected").val();
  },

  _selectedDepartureCity: function() {
    return $("select.departure-airport-selection option:selected").html();
  },

  _selectedTravelers: function() {
    return $("select.travelers-selection option:selected").html();
  },
  
  _selectedFlightOption: function() {
    var self = this;
    if (this.checkInDate && this._selectedDepartureAirport()) {
      var flightOptions = this._availableFlightOptionsForDate(this.checkInDate);
      var selectedFlightOption = null;
      $.each(flightOptions, function(i, option) {
        if (option.departure_airport === self._selectedDepartureAirport()) {
          selectedFlightOption = option;
        }
      });
      return selectedFlightOption;
    }
  },

  _setMobileDownArrow: function() {
    $('.segment-content-arrow.left').hide();
    $('.segment-content-arrow.middle').hide();
    $('.segment-content-arrow.right').hide();

    if (this.checkInDate) {
      if (this.checkOutDate) {
        $('.segment-content-arrow.right').show();
      }
      else {
        $('.segment-content-arrow.middle').show();
      }
    } else {
      $('.segment-content-arrow.left').show();
    }
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
;/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */
!function ($, undefined) {
    "use strict";
    /*global document, window, jQuery, console */

    if (window.Select2 !== undefined) {
        return;
    }

    var KEY, AbstractSelect2, SingleSelect2, MultiSelect2;

    KEY = {
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        HOME: 36,
        END: 35,
        BACKSPACE: 8,
        DELETE: 46,
        isArrow: function (k) {
            k = k.which ? k.which : k;
            switch (k) {
            case KEY.LEFT:
            case KEY.RIGHT:
            case KEY.UP:
            case KEY.DOWN:
                return true;
            }
            return false;
        },
        isControl: function (k) {
            k = k.which ? k.which : k;
            switch (k) {
            case KEY.SHIFT:
            case KEY.CTRL:
            case KEY.ALT:
                return true;
            }
            return false;
        },
        isFunctionKey: function (k) {
            k = k.which ? k.which : k;
            return k >= 112 && k <= 123;
        }
    };

    function indexOf(value, array) {
        var i = 0, l = array.length, v;

        if (typeof value === "undefined") {
          return -1;
        }

        if (value.constructor === String) {
            for (; i < l; i = i + 1) if (value.localeCompare(array[i]) === 0) return i;
        } else {
            for (; i < l; i = i + 1) {
                v = array[i];
                if (v.constructor === String) {
                    if (v.localeCompare(value) === 0) return i;
                } else {
                    if (v === value) return i;
                }
            }
        }
        return -1;
    }

    /**
     * Compares equality of a and b taking into account that a and b may be strings, in which case localCompare is used
     * @param a
     * @param b
     */
    function equal(a, b) {
        if (a === b) return true;
        if (a === undefined || b === undefined) return false;
        if (a === null || b === null) return false;
        if (a.constructor === String) return a.localeCompare(b) === 0;
        if (b.constructor === String) return b.localeCompare(a) === 0;
        return false;
    }

    /**
     * Splits the string into an array of values, trimming each value. An empty array is returned for nulls or empty
     * strings
     * @param string
     * @param separator
     */
    function splitVal(string, separator) {
        var val, i, l;
        if (string === null || string.length < 1) return [];
        val = string.split(separator);
        for (i = 0, l = val.length; i < l; i = i + 1) val[i] = $.trim(val[i]);
        return val;
    }

    function getSideBorderPadding(element) {
        return element.outerWidth() - element.width();
    }

    function installKeyUpChangeEvent(element) {
        element.bind("keydown", function () {
            element.data("keyup-change-value", element.val());
        });
        element.bind("keyup", function () {
            if (element.val() !== element.data("keyup-change-value")) {
                element.trigger("keyup-change");
            }
        });
    }

    /**
     * filters mouse events so an event is fired only if the mouse moved.
     *
     * filters out mouse events that occur when mouse is stationary but
     * the elements under the pointer are scrolled.
     */
    $(document).delegate("*", "mousemove", function (e) {
        $(document).data("select2-lastpos", {x: e.pageX, y: e.pageY});
    });
    function installFilteredMouseMove(element) {
        element.bind("mousemove", function (e) {
            var lastpos = $(document).data("select2-lastpos");
            if (lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) {
                $(e.target).trigger("mousemove-filtered", e);
            }
        });
    }

    /**
     * Debounces a function. Returns a function that calls the original fn function only if no invocations have been made
     * within the last quietMillis milliseconds.
     *
     * @param quietMillis number of milliseconds to wait before invoking fn
     * @param fn function to be debounced
     * @return debounced version of fn
     */
    function debounce(quietMillis, fn) {
        var timeout;
        return function () {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(fn, quietMillis);
        };
    }

    function installDebouncedScroll(threshold, element) {
        var notify = debounce(threshold, function (e) { element.trigger("scroll-debounced", e);});
        element.bind("scroll", function (e) {
            if (indexOf(e.target, element.get()) >= 0) notify(e);
        });
    }

    function killEvent(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function measureTextWidth(e) {
        var sizer, width;
        sizer = $("<div></div>").css({
            position: "absolute",
            left: "-1000px",
            top: "-1000px",
            display: "none",
            fontSize: e.css("fontSize"),
            fontFamily: e.css("fontFamily"),
            fontStyle: e.css("fontStyle"),
            fontWeight: e.css("fontWeight"),
            letterSpacing: e.css("letterSpacing"),
            textTransform: e.css("textTransform"),
            whiteSpace: "nowrap"
        });
        sizer.text(e.val());
        $("body").append(sizer);
        width = sizer.width();
        sizer.remove();
        return width;
    }

    /**
     * Produces an ajax-based query function
     *
     * @param options object containing configuration paramters
     * @param options.transport function that will be used to execute the ajax request. must be compatible with parameters supported by $.ajax
     * @param options.url url for the data
     * @param options.data a function(searchTerm, pageNumber, context) that should return an object containing query string parameters for the above url.
     * @param options.dataType request data type: ajax, jsonp, other datatatypes supported by jQuery's $.ajax function or the transport function if specified
     * @param options.quietMillis (optional) milliseconds to wait before making the ajaxRequest, helps debounce the ajax function if invoked too often
     * @param options.results a function(remoteData, pageNumber) that converts data returned form the remote request to the format expected by Select2.
     *      The expected format is an object containing the following keys:
     *      results array of objects that will be used as choices
     *      more (optional) boolean indicating whether there are more results available
     *      Example: {results:[{id:1, text:'Red'},{id:2, text:'Blue'}], more:true}
     */
    function ajax(options) {
        var timeout, // current scheduled but not yet executed request
            requestSequence = 0, // sequence used to drop out-of-order responses
            handler = null,
            quietMillis = options.quietMillis || 100;

        return function (query) {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                requestSequence += 1; // increment the sequence
                var requestNumber = requestSequence, // this request's sequence number
                    data = options.data, // ajax data function
                    transport = options.transport || $.ajax;

                data = data.call(this, query.term, query.page, query.context);

                if( null !== handler){
                    handler.abort();
                }
                handler = transport.call(null, {
                    url: options.url,
                    dataType: options.dataType,
                    data: data,
                    success: function (data) {
                        if (requestNumber < requestSequence) {
                            return;
                        }
                        // TODO 3.0 - replace query.page with query so users have access to term, page, etc.
                        var results = options.results(data, query.page);
                        query.callback(results);
                    }
                });
            }, quietMillis);
        };
    }

    /**
     * Produces a query function that works with a local array
     *
     * @param options object containing configuration parameters. The options parameter can either be an array or an
     * object.
     *
     * If the array form is used it is assumed that it contains objects with 'id' and 'text' keys.
     *
     * If the object form is used ti is assumed that it contains 'data' and 'text' keys. The 'data' key should contain
     * an array of objects that will be used as choices. These objects must contain at least an 'id' key. The 'text'
     * key can either be a String in which case it is expected that each element in the 'data' array has a key with the
     * value of 'text' which will be used to match choices. Alternatively, text can be a function(item) that can extract
     * the text.
     */
    function local(options) {
        var data = options, // data elements
            text = function (item) { return ""+item.text; }; // function used to retrieve the text portion of a data item that is matched against the search

        if (!$.isArray(data)) {
            text = data.text;
            // if text is not a function we assume it to be a key name
            if (!$.isFunction(text)) text = function (item) { return item[data.text]; };
            data = data.results;
        }

        return function (query) {
            var t = query.term, filtered = {};
            if (t === "") {
                query.callback({results: data});
                return;
            }
            filtered.results = $(data)
                .filter(function () {return query.matcher(t, text(this));})
                .get();
            query.callback(filtered);
        };
    }

    // TODO javadoc
    function tags(data) {
        // TODO even for a function we should probably return a wrapper that does the same object/string check as
        // the function for arrays. otherwise only functions that return objects are supported.
        if ($.isFunction(data)) {
            return data;
        }

        // if not a function we assume it to be an array

        return function (query) {
            var t = query.term, filtered = {results: []};
            $(data).each(function () {
                var isObject = this.text !== undefined,
                    text = isObject ? this.text : this;
                if (t === "" || query.matcher(t, text)) {
                    filtered.results.push(isObject ? this : {id: this, text: this});
                }
            });
            query.callback(filtered);
        };
    }

    /**
     * blurs any Select2 container that has focus when an element outside them was clicked or received focus
     */
    $(document).ready(function () {
        $(document).delegate("*", "mousedown focusin touchend", function (e) {
            var target = $(e.target).closest("div.select2-container").get(0);
            $(document).find("div.select2-container-active").each(function () {
                if (this !== target) $(this).data("select2").blur();
            });
        });
    });

    /**
     * Creates a new class
     *
     * @param superClass
     * @param methods
     */
    function clazz(SuperClass, methods) {
        var constructor = function () {};
        constructor.prototype = new SuperClass;
        constructor.prototype.constructor = constructor;
        constructor.prototype.parent = SuperClass.prototype;
        constructor.prototype = $.extend(constructor.prototype, methods);
        return constructor;
    }

    AbstractSelect2 = clazz(Object, {

        bind: function (func) {
            var self = this;
            return function () {
                func.apply(self, arguments);
            };
        },

        init: function (opts) {
            var results, search, resultsSelector = ".select2-results";

            // prepare options
            this.opts = opts = this.prepareOpts(opts);

            this.id=opts.id;

            // destroy if called on an existing component
            if (opts.element.data("select2") !== undefined &&
                opts.element.data("select2") !== null) {
                this.destroy();
            }

            this.enabled=true;
            this.container = this.createContainer();

            if (opts.element.attr("class") !== undefined) {
                this.container.addClass(opts.element.attr("class"));
            }

            // swap container for the element
            this.opts.element
                .data("select2", this)
                .hide()
                .after(this.container);
            this.container.data("select2", this);

            this.dropdown = this.container.find(".select2-drop");
            this.results = results = this.container.find(resultsSelector);
            this.search = search = this.container.find("input[type=text]");

            this.resultsPage = 0;
            this.context = null;

            // initialize the container
            this.initContainer();

            installFilteredMouseMove(this.results);
            this.container.delegate(resultsSelector, "mousemove-filtered", this.bind(this.highlightUnderEvent));

            installDebouncedScroll(80, this.results);
            this.container.delegate(resultsSelector, "scroll-debounced", this.bind(this.loadMoreIfNeeded));

            // if jquery.mousewheel plugin is installed we can prevent out-of-bounds scrolling of results via mousewheel
            if ($.fn.mousewheel) {
                results.mousewheel(function (e, delta, deltaX, deltaY) {
                    var top = results.scrollTop(), height;
                    if (deltaY > 0 && top - deltaY <= 0) {
                        results.scrollTop(0);
                        killEvent(e);
                    } else if (deltaY < 0 && results.get(0).scrollHeight - results.scrollTop() + deltaY <= results.height()) {
                        results.scrollTop(results.get(0).scrollHeight - results.height());
                        killEvent(e);
                    }
                });
            }

            installKeyUpChangeEvent(search);
            search.bind("keyup-change", this.bind(this.updateResults));
            search.bind("focus", function () { search.addClass("select2-focused");});
            search.bind("blur", function () { search.removeClass("select2-focused");});

            this.container.delegate(resultsSelector, "click", this.bind(function (e) {
                if ($(e.target).closest(".select2-result:not(.select2-disabled)").length > 0) {
                    this.highlightUnderEvent(e);
                    this.selectHighlighted(e);
                } else {
                    killEvent(e);
                    this.focusSearch();
                }
            }));

            if ($.isFunction(this.opts.initSelection)) {
                // initialize selection based on the current value of the source element
                this.initSelection();

                // if the user has provided a function that can set selection based on the value of the source element
                // we monitor the change event on the element and trigger it, allowing for two way synchronization
                this.monitorSource();
            }

            if (opts.element.is(":disabled")) this.disable();
        },

        destroy: function () {
            var select2 = this.opts.element.data("select2");
            if (select2 !== undefined) {
                select2.container.remove();
                select2.opts.element
                    .removeData("select2")
                    .unbind(".select2")
                    .show();
            }
        },

        prepareOpts: function (opts) {
            var element, select, idKey;

            element = opts.element;

            if (element.get(0).tagName.toLowerCase() === "select") {
                this.select = select = opts.element;
            }

            if (select) {
                // these options are not allowed when attached to a select because they are picked up off the element itself
                $.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                    if (this in opts) {
                        throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.");
                    }
                });
            }

            opts = $.extend({}, {
                formatResult: function (data) { return data.text; },
                formatSelection: function (data) { return data.text; },
                formatNoMatches: function () { return "No matches found"; },
                formatInputTooShort: function (input, min) { return "Please enter " + (min - input.length) + " more characters"; },
                minimumResultsForSearch: 0,
                minimumInputLength: 0,
                id: function (e) { return e.id; },
                matcher: function(term, text) {
                    return text.toUpperCase().indexOf(term.toUpperCase()) >= 0;
                }
            }, opts);

            if (typeof(opts.id) !== "function") {
                idKey = opts.id;
                opts.id = function (e) { return e[idKey]; };
            }

            if (select) {
                opts.query = this.bind(function (query) {
                    var data = {results: [], more: false},
                        term = query.term,
                        placeholder = this.getPlaceholder();
                    element.find("option").each(function (i) {
                        var e = $(this),
                            text = e.text();

                        if (i === 0 && placeholder !== undefined && text === "") return true;

                        if (query.matcher(term, text)) {
                            data.results.push({id: e.attr("value"), text: text});
                        }
                    });
                    query.callback(data);
                });
                // this is needed because inside val() we construct choices from options and there id is hardcoded
                opts.id=function(e) { return e.id; };
            } else {
                if (!("query" in opts)) {
                    if ("ajax" in opts) {
                        opts.query = ajax(opts.ajax);
                    } else if ("data" in opts) {
                        opts.query = local(opts.data);
                    } else if ("tags" in opts) {
                        opts.query = tags(opts.tags);
                        opts.createSearchChoice = function (term) { return {id: term, text: term}; };
                        opts.initSelection = function (element) {
                            var data = [];
                            $(splitVal(element.val(), ",")).each(function () {
                                data.push({id: this, text: this});
                            });
                            return data;
                        };
                    }
                }
            }
            if (typeof(opts.query) !== "function") {
                throw "query function not defined for Select2 " + opts.element.attr("id");
            }

            return opts;
        },

        /**
         * Monitor the original element for changes and update select2 accordingly
         */
        monitorSource: function () {
            this.opts.element.bind("change.select2", this.bind(function (e) {
                if (this.opts.element.data("select2-change-triggered") !== true) {
                    this.initSelection();
                }
            }));
        },

        /**
         * Triggers the change event on the source element
         */
        triggerChange: function () {
            // Prevents recursive triggering
            this.opts.element.data("select2-change-triggered", true);
            this.opts.element.trigger("change");
            this.opts.element.data("select2-change-triggered", false);
        },


        enable: function() {
            if (this.enabled) return;

            this.enabled=true;
            this.container.removeClass("select2-container-disabled");
        },

        disable: function() {
            if (!this.enabled) return;

            this.close();

            this.enabled=false;
            this.container.addClass("select2-container-disabled");
        },

        opened: function () {
            return this.container.hasClass("select2-dropdown-open");
        },

        open: function () {
            if (this.opened()) return;

            this.container.addClass("select2-dropdown-open").addClass("select2-container-active");

            this.updateResults(true);
            this.dropdown.show();
            this.ensureHighlightVisible();
            this.focusSearch();
        },

        close: function () {
            if (!this.opened()) return;

            this.dropdown.hide();
            this.container.removeClass("select2-dropdown-open");
            this.results.empty();
            this.clearSearch();
        },

        clearSearch: function () {

        },

        ensureHighlightVisible: function () {
            var results = this.results, children, index, child, hb, rb, y, more;

            children = results.children(".select2-result");
            index = this.highlight();

            if (index < 0) return;

            child = $(children[index]);

            hb = child.offset().top + child.outerHeight();

            // if this is the last child lets also make sure select2-more-results is visible
            if (index === children.length - 1) {
                more = results.find("li.select2-more-results");
                if (more.length > 0) {
                    hb = more.offset().top + more.outerHeight();
                }
            }

            rb = results.offset().top + results.outerHeight();
            if (hb > rb) {
                results.scrollTop(results.scrollTop() + (hb - rb));
            }
            y = child.offset().top - results.offset().top;

            // make sure the top of the element is visible
            if (y < 0) {
                results.scrollTop(results.scrollTop() + y); // y is negative
            }
        },

        moveHighlight: function (delta) {
            var choices = this.results.children(".select2-result"),
                index = this.highlight();

            while (index > -1 && index < choices.length) {
                index += delta;
                if (!$(choices[index]).hasClass("select2-disabled")) {
                    this.highlight(index);
                    break;
                }
            }
        },

        highlight: function (index) {
            var choices = this.results.children(".select2-result");

            if (arguments.length === 0) {
                return indexOf(choices.filter(".select2-highlighted")[0], choices.get());
            }

            choices.removeClass("select2-highlighted");

            if (index >= choices.length) index = choices.length - 1;
            if (index < 0) index = 0;

            $(choices[index]).addClass("select2-highlighted");
            this.ensureHighlightVisible();

            if (this.opened()) this.focusSearch();
        },

        highlightUnderEvent: function (event) {
            var el = $(event.target).closest(".select2-result");
            if (el.length > 0) {
                this.highlight(el.index());
            }
        },

        loadMoreIfNeeded: function () {
            var results = this.results,
                more = results.find("li.select2-more-results"),
                below, // pixels the element is below the scroll fold, below==0 is when the element is starting to be visible
                offset = -1, // index of first element without data
                page = this.resultsPage + 1;

            if (more.length === 0) return;

            below = more.offset().top - results.offset().top - results.height();

            if (below <= 0) {
                more.addClass("select2-active");
                this.opts.query({
                        term: this.search.val(),
                        page: page,
                        context: this.context,
                        matcher: this.opts.matcher,
                        callback: this.bind(function (data) {
                    var parts = [], self = this;
                    $(data.results).each(function () {
                        parts.push("<li class='select2-result'>");
                        parts.push(self.opts.formatResult(this));
                        parts.push("</li>");
                    });
                    more.before(parts.join(""));
                    results.find(".select2-result").each(function (i) {
                        var e = $(this);
                        if (e.data("select2-data") !== undefined) {
                            offset = i;
                        } else {
                            e.data("select2-data", data.results[i - offset - 1]);
                        }
                    });
                    if (data.more) {
                        more.removeClass("select2-active");
                    } else {
                        more.remove();
                    }
                    this.resultsPage = page;
                })});
            }
        },

        /**
         * @param initial whether or not this is the call to this method right after the dropdown has been opened
         */
        updateResults: function (initial) {
            var search = this.search, results = this.results, opts = this.opts, self=this;

            // if the search is currently hidden we do not alter the results
            if (initial !== true && this.showSearchInput === false) {
                return;
            }

            search.addClass("select2-active");

            function render(html) {
                results.html(html);
                results.scrollTop(0);
                search.removeClass("select2-active");
            }

            if (search.val().length < opts.minimumInputLength) {
                render("<li class='select2-no-results'>" + opts.formatInputTooShort(search.val(), opts.minimumInputLength) + "</li>");
                return;
            }

            this.resultsPage = 1;
            opts.query({
                    term: search.val(),
                    page: this.resultsPage,
                    context: null,
                    matcher: opts.matcher,
                    callback: this.bind(function (data) {
                var parts = [], // html parts
                    def; // default choice

                // save context, if any
                this.context = (data.context===undefined) ? null : data.context;

                // create a default choice and prepend it to the list
                if (this.opts.createSearchChoice && search.val() !== "") {
                    def = this.opts.createSearchChoice.call(null, search.val(), data.results);
                    if (def !== undefined && def !== null && self.id(def) !== undefined && self.id(def) !== null) {
                        if ($(data.results).filter(
                            function () {
                                return equal(self.id(this), self.id(def));
                            }).length === 0) {
                            data.results.unshift(def);
                        }
                    }
                }

                if (data.results.length === 0) {
                    render("<li class='select2-no-results'>" + opts.formatNoMatches(search.val()) + "</li>");
                    return;
                }

                $(data.results).each(function () {
                    parts.push("<li class='select2-result'>");
                    parts.push(opts.formatResult(this));
                    parts.push("</li>");
                });

                if (data.more === true) {
                    parts.push("<li class='select2-more-results'>Loading more results...</li>");
                }

                render(parts.join(""));
                results.children(".select2-result").each(function (i) {
                    var d = data.results[i];
                    $(this).data("select2-data", d);
                });
                this.postprocessResults(data, initial);
            })});
        },

        cancel: function () {
            this.close();
        },

        blur: function () {
            /* we do this in a timeout so that current event processing can complete before this code is executed.
             this allows tab index to be preserved even if this code blurs the textfield */
            window.setTimeout(this.bind(function () {
                this.close();
                this.container.removeClass("select2-container-active");
                this.clearSearch();
                this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                this.search.blur();
            }), 10);
        },

        focusSearch: function () {
            /* we do this in a timeout so that current event processing can complete before this code is executed.
             this makes sure the search field is focussed even if the current event would blur it */
            window.setTimeout(this.bind(function () {
                this.search.focus();
            }), 10);
        },

        selectHighlighted: function () {
            var data = this.results.find(".select2-highlighted:not(.select2-disabled)").data("select2-data");
            if (data) {
                this.onSelect(data);
            }
        },

        getPlaceholder: function () {
            return this.opts.element.attr("placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder;
        },

        /**
         * Get the desired width for the container element.  This is
         * derived first from option `width` passed to select2, then
         * the inline 'style' on the original element, and finally
         * falls back to the jQuery calculated element width.
         *
         * @returns The width string (with units) for the container.
         */
        getContainerWidth: function () {
            var style, attrs, matches, i, l;
            if (this.opts.width !== undefined)
                return this.opts.width;

            style = this.opts.element.attr('style');
            if (style !== undefined) {
                attrs = style.split(';');
                for (i = 0, l = attrs.length; i < l; i = i + 1) {
                    matches = attrs[i].replace(/\s/g, '')
                        .match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/);
                    if (matches !== null && matches.length >= 1)
                        return matches[1];
                }
            }
            return this.opts.element.width() + 'px';
        }
    });

    SingleSelect2 = clazz(AbstractSelect2, {

        createContainer: function () {
            return $("<div></div>", {
                "class": "select2-container",
                "style": "width: " + this.getContainerWidth()
            }).html([
                "    <a href='javascript:void(0)' class='select2-choice'>",
                "   <span></span><abbr class='select2-search-choice-close' style='display:none;'></abbr>",
                "   <div><b></b></div>" ,
                "</a>",
                "    <div class='select2-drop' style='display:none;'>" ,
                "   <div class='select2-search'>" ,
                "       <input type='text' autocomplete='off'/>" ,
                "   </div>" ,
                "   <ul class='select2-results'>" ,
                "   </ul>" ,
                "</div>"].join(""));
        },

        open: function () {

            if (this.opened()) return;

            this.parent.open.apply(this, arguments);

        },

        close: function () {
            if (!this.opened()) return;
            this.parent.close.apply(this, arguments);
        },

        focus: function () {
            this.close();
            this.selection.focus();
        },

        isFocused: function () {
            return this.selection.is(":focus");
        },

        cancel: function () {
            this.parent.cancel.apply(this, arguments);
            this.selection.focus();
        },

        initContainer: function () {

            var selection, container = this.container, clickingInside = false,
                selector = ".select2-choice";

            this.selection = selection = container.find(selector);

            this.search.bind("keydown", this.bind(function (e) {
                switch (e.which) {
                case KEY.UP:
                case KEY.DOWN:
                    this.moveHighlight((e.which === KEY.UP) ? -1 : 1);
                    killEvent(e);
                    return;
                case KEY.TAB:
                case KEY.ENTER:
                    this.selectHighlighted();
                    killEvent(e);
                    return;
                case KEY.ESC:
                    this.cancel(e);
                    e.preventDefault();
                    return;
                }
            }));

            container.delegate(selector, "click", this.bind(function (e) {
                clickingInside = true;

                if (this.opened()) {
                    this.close();
                    selection.focus();
                } else if (this.enabled) {
                    this.open();
                }
                e.preventDefault();

                clickingInside = false;
            }));
            container.delegate(selector, "keydown", this.bind(function (e) {
                if (!this.enabled || e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
                    return;
                }
                this.open();
                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN || e.which === KEY.SPACE) {
                    // prevent the page from scrolling
                    killEvent(e);
                }
                if (e.which === KEY.ENTER) {
                    // do not propagate the event otherwise we open, and propagate enter which closes
                    killEvent(e);
                }
            }));
            container.delegate(selector, "focus", function () { if (this.enabled) container.addClass("select2-container-active"); });
            container.delegate(selector, "blur", this.bind(function () {
                if (clickingInside) return;
                if (!this.opened()) this.blur();
            }));

            selection.delegate("abbr", "click", this.bind(function (e) {
                if (!this.enabled) return;
                this.val("");
                killEvent(e);
                this.close();
                this.triggerChange();
            }));

            this.setPlaceholder();
        },

        /**
         * Sets selection based on source element's value
         */
        initSelection: function () {
            var selected;
            if (this.opts.element.val() === "") {
                this.updateSelection({id: "", text: ""});
            } else {
                selected = this.opts.initSelection.call(null, this.opts.element);
                if (selected !== undefined && selected !== null) {
                    this.updateSelection(selected);
                }
            }

            this.close();
            this.setPlaceholder();
        },

        prepareOpts: function () {
            var opts = this.parent.prepareOpts.apply(this, arguments);

            if (opts.element.get(0).tagName.toLowerCase() === "select") {
                // install sthe selection initializer
                opts.initSelection = function (element) {
                    var selected = element.find(":selected");
                    // a single select box always has a value, no need to null check 'selected'
                    return {id: selected.attr("value"), text: selected.text()};
                };
            }

            return opts;
        },

        setPlaceholder: function () {
            var placeholder = this.getPlaceholder();

            if (this.opts.element.val() === "" && placeholder !== undefined) {

                // check for a first blank option if attached to a select
                if (this.select && this.select.find("option:first").text() !== "") return;

                if (typeof(placeholder) === "object") {
                    this.updateSelection(placeholder);
                } else {
                    this.selection.find("span").html(placeholder);
                }
                this.selection.addClass("select2-default");

                this.selection.find("abbr").hide();
            }
        },

        postprocessResults: function (data, initial) {
            var selected = 0, self = this, showSearchInput = true;

            // find the selected element in the result list

            this.results.find(".select2-result").each(function (i) {
                if (equal(self.id($(this).data("select2-data")), self.opts.element.val())) {
                    selected = i;
                    return false;
                }
            });

            // and highlight it

            this.highlight(selected);

            // hide the search box if this is the first we got the results and there are a few of them

            if (initial === true) {
                showSearchInput = this.showSearchInput = data.results.length >= this.opts.minimumResultsForSearch;
                this.container.find(".select2-search")[showSearchInput ? "removeClass" : "addClass"]("select2-search-hidden");

                //add "select2-with-searchbox" to the container if search box is shown
                this.container[showSearchInput ? "addClass" : "removeClass"]("select2-with-searchbox");
            }

        },

        onSelect: function (data) {
            var old = this.opts.element.val();

            this.opts.element.val(this.id(data));
            this.updateSelection(data);
            this.close();
            this.selection.focus();

            if (!equal(old, this.id(data))) { this.triggerChange(); }
        },

        updateSelection: function (data) {
            this.selection
                .find("span")
                .html(this.opts.formatSelection(data));

            this.selection.removeClass("select2-default");

            if (this.opts.allowClear && this.getPlaceholder() !== undefined) {
                this.selection.find("abbr").show();
            }
        },

        val: function () {
            var val, data = null;

            if (arguments.length === 0) {
                return this.opts.element.val();
            }

            val = arguments[0];

            if (this.select) {
                // val is an id
                this.select
                    .val(val)
                    .find(":selected").each(function () {
                        data = {id: $(this).attr("value"), text: $(this).text()};
                        return false;
                    });
                this.updateSelection(data);
            } else {
                // val is an object. !val is true for [undefined,null,'']
                this.opts.element.val(!val ? "" : this.id(val));
                this.updateSelection(val);
            }
            this.setPlaceholder();

        },

        clearSearch: function () {
            this.search.val("");
        }
    });

    MultiSelect2 = clazz(AbstractSelect2, {

        createContainer: function () {
            return $("<div></div>", {
                "class": "select2-container select2-container-multi",
                "style": "width: " + this.getContainerWidth()
            }).html([
                "    <ul class='select2-choices'>",
                //"<li class='select2-search-choice'><span>California</span><a href="javascript:void(0)" class="select2-search-choice-close"></a></li>" ,
                "  <li class='select2-search-field'>" ,
                "    <input type='text' autocomplete='off' style='width: 25px;'>" ,
                "  </li>" ,
                "</ul>" ,
                "<div class='select2-drop' style='display:none;'>" ,
                "   <ul class='select2-results'>" ,
                "   </ul>" ,
                "</div>"].join(""));
        },

        prepareOpts: function () {
            var opts = this.parent.prepareOpts.apply(this, arguments);

            opts = $.extend({}, {
                closeOnSelect: true
            }, opts);

            // TODO validate placeholder is a string if specified

            if (opts.element.get(0).tagName.toLowerCase() === "select") {
                // install sthe selection initializer
                opts.initSelection = function (element) {
                    var data = [];
                    element.find(":selected").each(function () {
                        data.push({id: $(this).attr("value"), text: $(this).text()});
                    });
                    return data;
                };
            }

            return opts;
        },

        initContainer: function () {

            var selector = ".select2-choices", selection;

            this.searchContainer = this.container.find(".select2-search-field");
            this.selection = selection = this.container.find(selector);

            this.search.bind("keydown", this.bind(function (e) {
                if (!this.enabled) return;

                if (e.which === KEY.BACKSPACE && this.search.val() === "") {
                    this.close();

                    var choices,
                        selected = selection.find(".select2-search-choice-focus");
                    if (selected.length > 0) {
                        this.unselect(selected.first());
                        this.search.width(10);
                        killEvent(e);
                        return;
                    }

                    choices = selection.find(".select2-search-choice");
                    if (choices.length > 0) {
                        choices.last().addClass("select2-search-choice-focus");
                    }
                } else {
                    selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                }

                if (this.opened()) {
                    switch (e.which) {
                    case KEY.UP:
                    case KEY.DOWN:
                        this.moveHighlight((e.which === KEY.UP) ? -1 : 1);
                        killEvent(e);
                        return;
                    case KEY.ENTER:
                    case KEY.TAB:
                        this.selectHighlighted();
                        killEvent(e);
                        return;
                    case KEY.ESC:
                        this.cancel(e);
                        e.preventDefault();
                        return;
                    }
                }

                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.BACKSPACE || e.which === KEY.ESC) {
                    return;
                }

                this.open();

                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {
                    // prevent the page from scrolling
                    killEvent(e);
                }
            }));

            this.search.bind("keyup", this.bind(this.resizeSearch));

            this.container.delegate(selector, "click", this.bind(function (e) {
                if (!this.enabled) return;
                this.open();
                this.focusSearch();
                e.preventDefault();
            }));

            this.container.delegate(selector, "focus", this.bind(function () {
                if (!this.enabled) return;
                this.container.addClass("select2-container-active");
                this.clearPlaceholder();
            }));

            // set the placeholder if necessary
            this.clearSearch();
        },

        enable: function() {
            if (this.enabled) return;

            this.parent.enable.apply(this, arguments);

            this.search.show();
        },

        disable: function() {
            if (!this.enabled) return;

            this.parent.disable.apply(this, arguments);

            this.search.hide();
        },

        initSelection: function () {
            var data;
            if (this.opts.element.val() === "") {
                this.updateSelection([]);
            }
            if (this.select || this.opts.element.val() !== "") {
                data = this.opts.initSelection.call(null, this.opts.element);
                if (data !== undefined && data !== null) {
                    this.updateSelection(data);
                }
            }

            this.close();

            // set the placeholder if necessary
            this.clearSearch();
        },

        clearSearch: function () {
            var placeholder = this.getPlaceholder();

            if (placeholder !== undefined
                && this.getVal().length === 0
                && this.search.hasClass("select2-focused") === false) {

                this.search.val(placeholder).addClass("select2-default");
                // stretch the search box to full width of the container so as much of the placeholder is visible as possible
                this.search.width(this.getContainerWidth());
            } else {
                this.search.val("").width(10);
            }
        },

        clearPlaceholder: function () {
            if (this.search.hasClass("select2-default")) {
                this.search.val("").removeClass("select2-default");
            }
        },

        open: function () {
            if (this.opened()) return;
            this.parent.open.apply(this, arguments);
            this.resizeSearch();
            this.focusSearch();
        },

        close: function () {
            if (!this.opened()) return;
            this.parent.close.apply(this, arguments);
        },

        focus: function () {
            this.close();
            this.search.focus();
        },

        isFocused: function () {
            return this.search.hasClass("select2-focused");
        },

        updateSelection: function (data) {
            var ids = [], filtered = [], self = this;

            // filter out duplicates
            $(data).each(function () {
                if (indexOf(self.id(this), ids) < 0) {
                    ids.push(self.id(this));
                    filtered.push(this);
                }
            });
            data = filtered;

            this.selection.find(".select2-search-choice").remove();
            $(data).each(function () {
                self.addSelectedChoice(this);
            });
            self.postprocessResults();
        },

        onSelect: function (data) {
            this.addSelectedChoice(data);
            if (this.select) { this.postprocessResults(); }

            if (this.opts.closeOnSelect) {
                this.close();
                this.search.width(10);
            } else {
                this.search.width(10);
                this.resizeSearch();
            }

            // since its not possible to select an element that has already been
            // added we do not need to check if this is a new element before firing change
            this.triggerChange();

            this.focusSearch();
        },

        cancel: function () {
            this.close();
            this.focusSearch();
        },

        addSelectedChoice: function (data) {
            var choice,
                id = this.id(data),
                parts,
                val = this.getVal();

            parts = ["<li class='select2-search-choice'>",
                this.opts.formatSelection(data),
                "<a href='javascript:void(0)' class='select2-search-choice-close' tabindex='-1'></a>",
                "</li>"
            ];

            choice = $(parts.join(""));
            choice.find("a")
                .bind("click dblclick", this.bind(function (e) {
                if (!this.enabled) return;

                this.unselect($(e.target));
                this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                killEvent(e);
                this.close();
                this.focusSearch();
            })).bind("focus", this.bind(function () {
                if (!this.enabled) return;
                this.container.addClass("select2-container-active");
            }));

            choice.data("select2-data", data);
            choice.insertBefore(this.searchContainer);

            val.push(id);
            this.setVal(val);
        },

        unselect: function (selected) {
            var val = this.getVal(),
                index;

            selected = selected.closest(".select2-search-choice");

            if (selected.length === 0) {
                throw "Invalid argument: " + selected + ". Must be .select2-search-choice";
            }

            index = indexOf(this.id(selected.data("select2-data")), val);

            if (index >= 0) {
                val.splice(index, 1);
                this.setVal(val);
                if (this.select) this.postprocessResults();
            }
            selected.remove();
            this.triggerChange();
        },

        postprocessResults: function () {
            var val = this.getVal(),
                choices = this.results.find(".select2-result"),
                self = this;

            choices.each(function () {
                var choice = $(this), id = self.id(choice.data("select2-data"));
                if (indexOf(id, val) >= 0) {
                    choice.addClass("select2-disabled");
                } else {
                    choice.removeClass("select2-disabled");
                }
            });

            choices.each(function (i) {
                if (!$(this).hasClass("select2-disabled")) {
                    self.highlight(i);
                    return false;
                }
            });

        },

        resizeSearch: function () {

            var minimumWidth, left, maxWidth, containerLeft, searchWidth;

            minimumWidth = measureTextWidth(this.search) + 10;

            left = this.search.offset().left;

            maxWidth = this.selection.width();
            containerLeft = this.selection.offset().left;

            searchWidth = maxWidth - (left - containerLeft) - getSideBorderPadding(this.search);

            if (searchWidth < minimumWidth) {
                searchWidth = maxWidth - getSideBorderPadding(this.search);
            }

            if (searchWidth < 40) {
                searchWidth = maxWidth - getSideBorderPadding(this.search);
            }
            this.search.width(searchWidth);
        },

        getVal: function () {
            var val;
            if (this.select) {
                val = this.select.val();
                return val === null ? [] : val;
            } else {
                val = this.opts.element.val();
                return splitVal(val, ",");
            }
        },

        setVal: function (val) {
            var unique;
            if (this.select) {
                this.select.val(val);
            } else {
                unique = [];
                // filter out duplicates
                $(val).each(function () {
                    if (indexOf(this, unique) < 0) unique.push(this);
                });
                this.opts.element.val(unique.length === 0 ? "" : unique.join(","));
            }
        },

        val: function () {
            var val, data = [], self=this;

            if (arguments.length === 0) {
                return this.getVal();
            }

            val = arguments[0];

            if (this.select) {
                // val is a list of ids
                this.setVal(val);
                this.select.find(":selected").each(function () {
                    data.push({id: $(this).attr("value"), text: $(this).text()});
                });
                this.updateSelection(data);
            } else {
                val = (val === null) ? [] : val;
                this.setVal(val);
                // val is a list of objects
                $(val).each(function () { data.push(self.id(this)); });
                this.setVal(data);
                this.updateSelection(val);
            }

            this.clearSearch();
        },
        onSortStart: function() {
            if (this.select) {
                throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
            }

            // collapse search field into 0 width so its container can be collapsed as well
            this.search.width(0);
            // hide the container
            this.searchContainer.hide();
        },
        onSortEnd:function() {

            var val=[], self=this;

            // show search and move it to the end of the list
            this.searchContainer.show();
            // make sure the search container is the last item in the list
            this.searchContainer.appendTo(this.searchContainer.parent());
            // since we collapsed the width in dragStarteed, we resize it here
            this.resizeSearch();

            // update selection

            this.selection.find(".select2-search-choice").each(function() {
                val.push(self.opts.id($(this).data("select2-data")));
            });
            this.setVal(val);
            this.triggerChange();
        }
    });

    $.fn.select2 = function () {

        var args = Array.prototype.slice.call(arguments, 0),
            opts,
            select2,
            value, multiple, allowedMethods = ["val", "destroy", "open", "close", "focus", "isFocused", "container", "onSortStart", "onSortEnd", "enable", "disable"];

        this.each(function () {
            if (args.length === 0 || typeof(args[0]) === "object") {
                opts = args.length === 0 ? {} : $.extend({}, args[0]);
                opts.element = $(this);

                if (opts.element.get(0).tagName.toLowerCase() === "select") {
                    multiple = opts.element.attr("multiple");
                } else {
                    multiple = opts.multiple || false;
                    if ("tags" in opts) {opts.multiple = multiple = true;}
                }

                select2 = multiple ? new MultiSelect2() : new SingleSelect2();
                select2.init(opts);
            } else if (typeof(args[0]) === "string") {

                if (indexOf(args[0], allowedMethods) < 0) {
                    throw "Unknown method: " + args[0];
                }

                value = undefined;
                select2 = $(this).data("select2");
                if (select2 === undefined) return;
                if (args[0] === "container") {
                    value=select2.container;
                } else {
                    value = select2[args[0]].apply(select2, args.slice(1));
                }
                if (value !== undefined) {return false;}
            } else {
                throw "Invalid arguments to select2 plugin: " + args;
            }
        });
        return (value === undefined) ? this : value;
    };

    // exports
    window.Select2 = {
        query: {
            ajax: ajax,
            local: local,
            tags: tags
        }, util: {
            debounce: debounce
        }, "class": {
            "abstract": AbstractSelect2,
            "single": SingleSelect2,
            "multi": MultiSelect2
        }
    };

}(jQuery);
;var NavMenu = {
  handleNavMouseEvents: function() {
    var self = this;
    $(".subnav-item.regions, .subnav-item.interests").bind("mouseenter", function(e) {
      self.setSecondaryNav($(this), 400);
    });

    $(".subnav-item.regions, .subnav-item.interests").bind("click", function(e) {
      e.preventDefault();
      self.setSecondaryNav($(this), 0);
    });

    $(".category_nav_secondary").bind("mouseover", function(e) {
      clearTimeout($(".category_nav_secondary").data('navInDelay'));
    });

    $(".subnav-item, .category_nav_secondary").bind("mouseleave", function(e) {
      self.setSecondaryNav($(".subnav-item.active"), 400);
    });

    $(".category_nav_secondary .item a, .subnav-item.all_escapes").bind("click", function(e) {
      $(this).addClass("hovering");
      $(".subnav-item, .category_nav_secondary").unbind();
    });
  },

  setSecondaryNav: function(subNavToSet, waitTime) {
    var self = this;
    var secondaryNav = $(".category_nav_secondary");
    clearTimeout($(secondaryNav).data('navInDelay'));

    var navInDelay = setTimeout(function(){
      $(".subnav-item").not(subNavToSet).removeClass("hovering");
      $(subNavToSet).addClass("hovering");
      
      if (subNavToSet.length === 0 || subNavToSet.hasClass("all_escapes")) {
        self.hideSecondaryNav();
      } else {
        self.showSecondaryNav(subNavToSet);
      }
    }, waitTime);
    secondaryNav.data('navInDelay', navInDelay);
  },

  hideSecondaryNav: function() {
    $(".category_nav_secondary").slideUp(200);
  },

  showSecondaryNav: function(subNavToShow) {
    var secondaryNav = $(".category_nav_secondary");
    var type = null, otherType = null;
    if (subNavToShow.hasClass("regions")) {
      type = "regions";
      otherType = "interests";
    } else if (subNavToShow.hasClass("interests")) {
      type = "interests";
      otherType = "regions";
    }

    if (!secondaryNav.is(":visible")) {
      secondaryNav.slideDown(200);
    }
    secondaryNav.find("." + otherType).hide();
    secondaryNav.find("." + type).fadeIn();
  },

  displayInitialState: function() {
    var self = this;
    var landingPageName = $("#landing-page-name").attr("data-grouping-name");
    var category = null;
    if (landingPageName != null && landingPageName.length > 0) {
      if (/^region/.test(landingPageName)) {
        category = $(".subnav-item.regions");
        $(".category_nav_secondary").show();
        $(".category_nav_secondary").find(".regions").show();
      } else if (/^interest/.test(landingPageName)) {
        category = $(".subnav-item.interests");
        $(".category_nav_secondary").show();
        $(".category_nav_secondary").find(".interests").show();
      }
      if (category) {
        self.setSecondaryNav(category, 0);
        category.addClass("active hovering");
        $("a#"+landingPageName).addClass("active");
      }
    }
  },

  init: function() {
    this.handleNavMouseEvents();
    this.displayInitialState();
  }
};

$(document).ready(function() {
  NavMenu.init();
  
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

  // packing list
  $("#to-packing-list").bind("click", function(e) {
    e.preventDefault();
    if($("html").scrollTop != 0) {
      $("html").animate({scrollTop:$("#packing-list").offset().top - 100}, 1000, 'easeInOutCubic');
    }
    if($("body").scrollTop != 0) {
      $("body").animate({scrollTop:$("#packing-list").offset().top - 100}, 1000, 'easeInOutCubic');
    }
  });

  // scrolling data
  if (window.location.pathname && window.location.pathname.match(/escapes\/\d+/)) {
    var wouldHaveSeenRecirculation = false;
    var necessaryHeight = parseInt($(".wide-footer").offset().top - $(window).height(), 10);
    $(window).scroll(function() {
      if (!wouldHaveSeenRecirculation && ($(window).scrollTop() > necessaryHeight)) {
        wouldHaveSeenRecirculation = true;
        _gaq.push(['_trackEvent', 'escapes', 'ESCAPES_SCROLLED_FAR_ENOUGH']);
      }
    });
  }

  // tours image
  $(".itinerary-circle").bind("click", function(e) {
    e.preventDefault();
    var dayText = $(e.currentTarget).find(".day-title").text();
    var dayBubbles = $(".day-bubble");
    var scrollTarget = null;
    $.each(dayBubbles, function(i, bubble) {
      if ($(bubble).text() == dayText){
        scrollTarget = $(bubble);
      }
    });
    if (scrollTarget) {
      if($("html").scrollTop != 0) {
        $("html").animate({scrollTop:scrollTarget.offset().top - 50}, 1000, 'easeInOutCubic');
      }
      if($("body").scrollTop != 0) {
        $("body").animate({scrollTop:scrollTarget.offset().top - 50}, 1000, 'easeInOutCubic');
      }
    }
  });

  // selectors
  $("select.lsui-select").select2({minimumResultsForSearch:20});

  // subcategory map click events
  $("a.escapes-category").bind("click", function(e) {
    var subcategoryName = $(e.currentTarget).text();
    _gaq.push(['_trackEvent', 'escapes', 'SUBCATEGORY_CLICKED', subcategoryName]);
  });

  if ($(".deal-buy-box .deal-price #lead-price-explanation") != null && $(".deal-buy-box .deal-price #lead-price-explanation").length > 0) {
    $(".deal-buy-box .deal-price").mouseover(function(e) {
      e.preventDefault();
      $(this).find("#lead-price-explanation").show();
    });
    $(".deal-buy-box .deal-price").mouseout(function(e) {
      e.preventDefault();
      $(this).find("#lead-price-explanation").hide();
    });
  }
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
 $($("#deal-buy-box, .deal-buy")[0]).delegate('#deals-show-email-share', 'click', function() {
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
    if(dls.deal_pieshare_rendered!=true) {
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
      $("#copy-link").val($("#copy-link").val() + "?rpi=" + purchaseInfo[0] + "&ref=personalized-link-box-" + purchaseInfo[0] + "&rui=" + dls.viewer.id);
      $("#deal-pieshare-box .pie-fill").addClass("pie-fill-" + purchaseInfo[2]).show();
    }
  }
  Stached._bind("url:/me/info.json", showMePlusThree);
});
;(function(a){a.tiny=a.tiny||{};a.tiny.scrollbar={options:{axis:"y",wheel:40,scroll:true,lockscroll:true,size:"auto",sizethumb:"auto"}};a.fn.tinyscrollbar=function(d){var c=a.extend({},a.tiny.scrollbar.options,d);this.each(function(){a(this).data("tsb",new b(a(this),c))});return this};a.fn.tinyscrollbar_update=function(c){return a(this).data("tsb").update(c)};function b(q,g){var k=this,t=q,j={obj:a(".viewport",q)},h={obj:a(".overview",q)},d={obj:a(".scrollbar",q)},m={obj:a(".track",d.obj)},p={obj:a(".thumb",d.obj)},l=g.axis==="x",n=l?"left":"top",v=l?"Width":"Height",r=0,y={start:0,now:0},o={},e=("ontouchstart" in document.documentElement)?true:false;function c(){k.update();s();return k}this.update=function(z){j[g.axis]=j.obj[0]["offset"+v];h[g.axis]=h.obj[0]["scroll"+v];h.ratio=j[g.axis]/h[g.axis];d.obj.toggleClass("disable",h.ratio>=1);m[g.axis]=g.size==="auto"?j[g.axis]:g.size;p[g.axis]=Math.min(m[g.axis],Math.max(0,(g.sizethumb==="auto"?(m[g.axis]*h.ratio):g.sizethumb)));d.ratio=g.sizethumb==="auto"?(h[g.axis]/m[g.axis]):(h[g.axis]-j[g.axis])/(m[g.axis]-p[g.axis]);r=(z==="relative"&&h.ratio<=1)?Math.min((h[g.axis]-j[g.axis]),Math.max(0,r)):0;r=(z==="bottom"&&h.ratio<=1)?(h[g.axis]-j[g.axis]):isNaN(parseInt(z,10))?r:parseInt(z,10);w()};function w(){var z=v.toLowerCase();p.obj.css(n,r/d.ratio);h.obj.css(n,-r);o.start=p.obj.offset()[n];d.obj.css(z,m[g.axis]);m.obj.css(z,m[g.axis]);p.obj.css(z,p[g.axis])}function s(){if(!e){p.obj.bind("mousedown",i);m.obj.bind("mouseup",u)}else{j.obj[0].ontouchstart=function(z){if(1===z.touches.length){i(z.touches[0]);z.stopPropagation()}}}if(g.scroll&&window.addEventListener){t[0].addEventListener("DOMMouseScroll",x,false);t[0].addEventListener("mousewheel",x,false)}else{if(g.scroll){t[0].onmousewheel=x}}}function i(A){var z=parseInt(p.obj.css(n),10);o.start=l?A.pageX:A.pageY;y.start=z=="auto"?0:z;if(!e){a(document).bind("mousemove",u);a(document).bind("mouseup",f);p.obj.bind("mouseup",f)}else{document.ontouchmove=function(B){B.preventDefault();u(B.touches[0])};document.ontouchend=f}}function x(B){if(h.ratio<1){var A=B||window.event,z=A.wheelDelta?A.wheelDelta/120:-A.detail/3;r-=z*g.wheel;r=Math.min((h[g.axis]-j[g.axis]),Math.max(0,r));p.obj.css(n,r/d.ratio);h.obj.css(n,-r);if(g.lockscroll||(r!==(h[g.axis]-j[g.axis])&&r!==0)){A=a.event.fix(A);A.preventDefault()}}}function u(z){if(h.ratio<1){if(!e){y.now=Math.min((m[g.axis]-p[g.axis]),Math.max(0,(y.start+((l?z.pageX:z.pageY)-o.start))))}else{y.now=Math.min((m[g.axis]-p[g.axis]),Math.max(0,(y.start+(o.start-(l?z.pageX:z.pageY)))))}r=y.now*d.ratio;h.obj.css(n,-r);p.obj.css(n,y.now)}}function f(){a(document).unbind("mousemove",u);a(document).unbind("mouseup",f);p.obj.unbind("mouseup",f);document.ontouchmove=document.ontouchend=null}return c()}}(jQuery));;jQuery.fn.youtubePlayer = function(youtubeId, options) {
  options = typeof options !== 'undefined' ? options : {};
  var elementId = $(this).attr('id');
  var playerHeight = options.height       || $(this).attr("data-height")   || '349';
  var playerWidth  = options.width        || $(this).attr("data-width")    || '620';
  var trackingCategory = options.category || $(this).attr("data-category") || 'youtube';
  var trackingAction = options.action     || $(this).attr("data-action")   || 'youtube';

  var player;
  createPlayer = function(){
    player = new YT.Player(elementId, {
      height: playerHeight,
      width: playerWidth,
      videoId: youtubeId,
      playerVars: {rel: 0},
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  }

  var playerViewed = false;
  playerChanged = function(event) {
    if (event.data == YT.PlayerState.PLAYING && !playerViewed) {
      _gaq.push(['_trackEvent', trackingCategory, trackingAction, 'viewed', 1, true]);
      playerViewed = true; //mark the player as viewed so we won't duplicate tracking
    }
  }

  //load the Youtube API JS
  var tag = document.createElement('script');
  tag.src = "//www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = function() {
    createPlayer();
  }
  window.onPlayerStateChange = function(event) {
    playerChanged(event);
  }
  $(this);
};
;function findCampaigns(placements){
  $.ajax({
    url: "/campaigns.json",
    data: findCampaignData(placements),
    success: function(response) {
      _.each(response.deal_tile_headers, function(deal){
        addDealTileBanner(deal);
      });
      _.each(response.placements, function(campaign, slot_name){
        insertCampaign(slot_name, campaign);
      });
    }
  });
}

function findCampaignData(placements){
  hash = {};
  hash["preferred_city_id"] = $("meta[name='current_city_id']").attr('content');
  hash["placements"] = placements
  if (typeof(Deal) != "undefined") {
    hash["deal_id"] = Deal.id
  }
  if (dealIds().length > 0){
    hash["deal_ids"] = dealIds();
  }
  return hash;
}

function insertCampaign(slot_name, campaign){
  $("#"+slot_name).html(campaign);
  category = $(".current").find(".filter").attr("data-category");
  if ((slot_name == "deals_slot") || (slot_name == "collection_deals_slot")){
    campaignTiles(category);
  }
  else if (slot_name == "cities_show_banner"){
    campaignBanners(category);
  }
}


function dealIds(){
  var dealIds = [];
  $('.deal').each(function(){
    id = parseInt($(this).attr('dealid'));
    if (typeof id == "number")
      dealIds.push($(this).attr('dealid'));
  });
  return dealIds;
}

function addDealTileBanner(deal){
  dealTile = $(".deal[dealid='"+deal.id+"']")
  if (dealTile.find(".category").length > 0){
    updateDealTileBanner(deal,dealTile);
  }
  else {
    createDealTileBanner(deal, dealTile);
  }
}

function updateDealTileBanner(deal, dealTile){
  dealTile.removeClass().addClass("ls-item deal deal_campaign")
  dealTile.find(".category").css({"background-color": deal.tile_background_color})
  dealTile.find(".category").find("span").css({"color": deal.tile_text_color}).text(deal.banner_title)
}

function createDealTileBanner(deal,dealTile){
  template = "<p class='category' style='background-color:"+deal.tile_background_color+"'>"+
    "<span style='color:"+deal.tile_text_color+"'>"+deal.banner_title+"</span>"+
    "</p>";
  dealTile.addClass("deal_campaign").find(".hd").prepend(template);
}

function findPlacements(){
  potentialSlots = [];
  $('.campaign-slot').each(function(){
    potentialSlots.push(this.id);
  });
  return potentialSlots;
}

function campaignBanners(category){
  $(".cities_show_banner").hide();
  $(".cities_show_banner."+category).show();
}

function determinePlacement(){
  $("ul.cities-items .ls-item").eq(placement)
}

function sortByPositon(a, b) {
  return slot_name_to_integer($(a)) - slot_name_to_integer($(b))
}

function slot_name_to_integer(slot){
  return parseInt(slot.attr("data-ls-position").replace("slot_", "") - 2);
}

function campaignTiles(category){
  $(".deals_slot").hide();
  $(".display-deal-ad-slot").removeClass("display-deal-ad-slot");
  $(".deals_slot."+category).removeAttr("style");
  $(".deals_slot."+category).addClass("display-deal-ad-slot");
  if ($.browser.msie && +$.browser.version === 8){
    $(".deals_slot").css("margin-left", 8);
  }
  $(".deals_slot."+category).sort(sortByPositon).each(function (index) {
    if ($(this).attr("data-ls-position")) {
      if (category == "all"){
        addCampaignTile($("ul.cities-items .ls-item"), slot_name_to_integer($(this)), category, $(this));
      }
      else {
        addCampaignTile($("ul.cities-items .ls-item[data-categories~='"+category+"']"), (slot_name_to_integer($(this)) - index), category, $(this));
      }
    }
  })
}
function dfpTiles(category){
  $(".deal-dfp-ad-slot").hide();
  $(".deal-dfp-ad-slot."+category).show();
}
function addCampaignTile(tiles, placement, category, campaign){
  if (tiles.eq(placement).length > 0){
    tiles.eq(placement).after(campaign);
  }
  else{
    tiles.last().after(campaign);
  }
}

$(document).ready(function() {
  placements = findPlacements();
  if ((placements.length > 0) || (dealIds().length > 0)){
    findCampaigns(placements);
  }
});
$(document).bind("filters_finished", function(){
  category = $(".current").find(".filter").attr("data-category");
  campaignBanners(category);
  campaignTiles(category);
  dfpTiles(category);
});

;var targetedCampaignsTracker = Journal.newTrackerFunction({bucketId: 'targetedCampaigns'});
(function(){

  function findCampaignData(slots){
    hash = {};
    hash["slots"] = slots;
    if (typeof(Deal) != "undefined") {
      hash["deal_id"] = Deal.id;
    }
    return hash;
  }

  function insertCampaign(slot_name, campaign_hash){
    $('div.dfp-promo-banner').remove();
    $("#"+slot_name).html(campaign_hash.placement_partial);
    targetedCampaignsTracker('insertCampaign', {entityId: slot_name, variationId: campaign_hash.placement_id});
  }

  function findCampaigns(slots){
    $.ajax({
      url: "/targeted_campaigns.json",
      data: findCampaignData(slots),
      success: function(response) {
        _.each(response.placements, function(campaign_hash, slot_name){
          insertCampaign(slot_name, campaign_hash);
        });
      }
    });
  }

  function findSlots(selector){
    potentialSlots = [];
    $(selector).each(function(){
      potentialSlots.push(this.id);
    });
    return potentialSlots;
  }

  $(document).ready(function() {

    slots = findSlots('.targeted-campaign-slot');
    if (slots.length > 0){
      findCampaigns(slots);
    }
  });

})();
;  //     automatically adds JS bindings to attach Google Analytics tracking
  //
  //                          defaults
  //
  //  class:           ga-track       all elements with this class will have
  //                                  handlers attached on DOM ready
  //
  //  data-ga-binding: click          the binding on which to fire the tracking
  //
  //  data-ga-event:   _trackEvent    the analytics event send to Google
  //
  //  data-ga-data:    the binding    a comma-sparated list of properties to
  //                                  include with the event
  //
  //  e.g. <a class='ga-track'></a>
  //
  //  This will attach a click handler to the link tag,
  //  triggering _gaq.push(['_trackEvent','click'])
  //
  //  That's pretty useless, so let's add some more stuff!
  //
  //  <a class='ga-track' data-ga-data='bubbles, billionaire' data-ga-bind='hover'></a>
  //
  //  This will attach a hover handler to the link tag,
  //  triggering _gaq.push(['_trackEvent','bubbles', 'billionaire'])
  //
  //                                    Type Checking
  //
  // The Google Analytics documentation specifies the areguments passed into
  // any call to trackEvent:
  //
  // _trackEvent(category, action, opt_label, opt_value, opt_noninteraction)
  //
  // category, action, and the optional label are all strings. Since data
  // attributes are strings anyway, you don't need to worry about these.
  //
  // the optional value parameter is an integer, and $.gaTrack will throw an
  // error if you try to supply something else.
  //
  // Similarly, the optional non-interation value (which, if set to true
  // indicates that the event hit will not be used in bounce-rate calculation)
  // must be a boolean. Pass in anything other that 'true' or 'false' and an
  // error will be raised.
  //
  //
  //                        ================ AJAX ==============
  //
  //  If you are loading elements after DOM-ready, you can add a class to them and call
  //  dls.gaTrack([array,of,jquery,selectors]) and it will take care of the rest!
  //
  //
  // NOTE: If you are attaching tracking to an element surrounding a link or other element
  // which will not propagate events, the tracking will not fire. For example:
  //
  // <li id='cant-track-this' class='ga-track' data-ga-data='Click, SomewhereElse'>
  //   <a href='/somewhere-else'>I wish I could be tracked...</a>
  // </li>
  //
  // clicking the a tag will not propagate the click event because it leaves the page

$.fn.gaTrackElement = function(){
  var binding = $(this).attr('data-ga-binding') || 'click';
  //use on, unless pre jquery 1.7
  var trackingFn = $('.ga-track').on ? 'on' : 'bind';
  $(this)[trackingFn](binding, function(evnt){
    var element = $(this);
    var gaEvent = element.attr('data-ga-event') || '_trackEvent';
    var gaData = element.attr('data-ga-data');
    if(gaData.length){
      gaData = gaData.split(/,\s*/);
      if(gaData.length > 3){
        gaData[3] = stringToInteger(gaData[3]);
        if(gaData.length > 4){
          gaData[4] = stringToBoolean(gaData[4]);
        }
      }
    } else {
      gaData = [binding];
    }
    gaData.unshift(gaEvent);
    _gaq.push(gaData);
  });
};

function stringToInteger(str, base) {
  base = base || 10;
  integer = parseInt(str, base);
  if(isNaN(integer)) {
    throw new Error('Expected string ' + str + ' to be an integer.');
  } else {
    return integer;
  }
}

function stringToBoolean(str) {
  if(str == 'true'){
    return true;
  } else if(str == 'false') {
    return false;
  } else {
    throw new Error('Expected string ' + str + ' to be true or false.');
  }
}

$.gaTrack = function(selectors){
  _gaq = _gaq || [];
  for (var i = selectors.length - 1; i >= 0; i--) {
    var selector = selectors[i];
    var trackedElements = $(selector);
    for (var j = trackedElements.length - 1; j >= 0; j--) {
      var elem = $(trackedElements[j]).gaTrackElement();
    }
  }
};

dls = dls || {};
$(function(){
  dls.gaTrack = $.gaTrack;
  dls.gaTrack(['.ga-track']);
});

;/**
 * jQuery DFP v0.9.6
 * http://github.com/coop182/jquery.dfp.js
 *
 * Copyright 2012 Matt Cooper
 * Released under the MIT license
 */
/**
*   For instructions on how to implement
*   http://lsdev.co/lsui/consumer/plugins#dfp
**/
(function ($, window) {

    "use strict";

    // Save Scope
    var dfpScript = this;

    // DFP account ID
    var dfpID = '7132793';

    // Count of ads
    var count = 0;

    // Count of rendered ads
    var rendered = 0;

    // Default DFP jQuery selector
    var dfpSelector = '.ads-dart';

    /**
     * Init function sets required params and loads Google's DFP script
     * @param  String id       The DFP account ID
     * @param  String selector The adunit selector
     * @param  Object options  Custom options to apply
     */
    var init = function (id, selector, options) {

        dfpID = id || dfpID;
        dfpSelector = selector || dfpSelector;
        options = options || {};
        dfpLoader();
        $(function () { createAds(options); });

    };

    /**
     * Main function to find and create all Ads
     * @param Object options Custom options to apply
     */
    var createAds = function (options) {

        // Array to Store AdUnits
        var adUnitArray = [];

        // Default DFP options
        var URLTargets = getURLTargets();

        var dfpOptions = {
            'setTargeting': {
                'inURL': URLTargets.inURL,
                'URLIs': URLTargets.URLIs,
                'Query': URLTargets.Query,
                'countryid': $("meta[name='current_country_id']").attr("content"),
                'cityid': $("meta[name='current_city_id']").attr("content"),
                'domain': window.location.host
            },
            'enableSingleRequest': true,
            'collapseEmptyDivs': 'original'
        };


        // Make sure the default setTargeting is not lost in the object merge
        if (typeof options.setTargeting !== 'undefined' && typeof dfpOptions.setTargeting !== 'undefined') {
            options.setTargeting = $.extend(options.setTargeting, dfpOptions.setTargeting);
        }

        // Merge options objects
        dfpOptions = $.extend(dfpOptions, options);

        // Loops through on page Ad units and gets ads for them.
        $(dfpSelector).each(function (index) {
            var adUnit = this;

            count++;

            // adUnit name
            var adUnitName = getName(adUnit);

            // adUnit id - this will use an existing id or an auto generated one.
            var adUnitID = getID(adUnit, adUnitName, count);

            // get dimensions of the adUnit
            var dimensions = getDimensions(adUnit);

            // get existing content
            var $existingContent = $(adUnit).html();

            // wipe html clean ready for ad and set the default display class.
            $(adUnit).html('').addClass('display-none');

            // Store AdUnits
            adUnitArray.push(adUnitID);

            // Push commands to DFP to create ads
            window.googletag.cmd.push(function () {
                defineCallbacks(adUnit);

                // Create the ad
                var googleAdUnit = window.googletag.defineSlot('/' + dfpID + '/' + adUnitName, [dimensions.width, dimensions.height], adUnitID).addService(window.googletag.pubads());

                if ($(adUnit).data('targeting')){
                  $.each($(adUnit).data("targeting"), function(k,v){
                    googleAdUnit.setTargeting(k, v);
                  });
                }

                // The following hijacks an internal google method to check if the div has been
                // collapsed after the ad has been attempted to be loaded.
                googleAdUnit.oldRenderEnded = googleAdUnit.renderEnded;
                googleAdUnit.renderEnded = function () {

                    rendered++;

                    var display = $(adUnit).css('display');

                    // if the div has been collapsed but there was existing content expand the
                    // div and reinsert the existing content.
                    if (display === 'none' && $.trim($existingContent).length > 0 && dfpOptions.collapseEmptyDivs === 'original') {
                        $(adUnit).show().html($existingContent);
                        display = 'block display-original';
                    }

                    $(adUnit).removeClass('display-none').addClass('display-' + display);

                    googleAdUnit.oldRenderEnded();

                    // Excute afterEachAdLoaded callback if provided
                    if (typeof dfpOptions.afterEachAdLoaded === 'function') {
                        dfpOptions.afterEachAdLoaded.call(this, adUnit);
                    }

                    // Excute afterAllAdsLoaded callback if provided
                    if (typeof dfpOptions.afterAllAdsLoaded === 'function' && rendered === count) {
                        dfpOptions.afterAllAdsLoaded.call(this, $(dfpSelector));
                    }

                };

            });

        });

        // Push DFP config options
        window.googletag.cmd.push(function () {
            if (dfpOptions.enableSingleRequest === true) {
                window.googletag.pubads().enableSingleRequest();
            }
            $.each(dfpOptions.setTargeting, function (k, v) {
                window.googletag.pubads().setTargeting(k, v);
            });
            if (dfpOptions.collapseEmptyDivs === true || dfpOptions.collapseEmptyDivs === 'original') {
                window.googletag.pubads().collapseEmptyDivs();
            }
            window.googletag.enableServices();
        });

        // Display each ad
        $.each(adUnitArray, function (k, v) {
          window.googletag.cmd.push(function () { window.googletag.display(v); });
        });

    };

    /**
     * Create an array of paths so that we can target DFP ads to Page URI's
     * @return Array an array of URL parts that can be targeted.
     */
    var getURLTargets = function () {

        // Get the paths for targeting against
        var paths = window.location.pathname.replace(/\/$/, '');
        var patt = new RegExp('\/([^\/]*)', 'ig');
        var pathsMatches = paths.match(patt);
        var targetPaths = ['/'];
        var longestpath = '';
        if (paths !== '/' && pathsMatches !== null) {
            var target = '';
            var size = pathsMatches.length;
            if (size > 0) {
                for (var i = 0; i < size; i++) {
                    target = pathsMatches[i];
                    targetPaths.push(target);
                    for (var j = i + 1; j < size; j++) {
                        target += pathsMatches[j];
                        targetPaths.push(target);
                    }
                    if (i === 0) {
                        targetPaths.splice(-1, 1);
                        longestpath = target;
                    }
                }
            }
            targetPaths.push(longestpath);
        }

        targetPaths = targetPaths.reverse();

        // Get the query params for targeting against
        var url = window.location.toString().replace(/\=/ig, ':').match(/\?(.+)$/);
        var params = RegExp.$1.split("&");

        return {
            'inURL': targetPaths,
            'URLIs': targetPaths[0],
            'Query': params
        };

    };

    /**
     * Get the id of the adUnit div or generate a unique one.
     * @param  Object adUnit     The adunit to work with
     * @param  String adUnitName The name of the adunit
     * @param  Integer count     The current count of adunit, for uniqueness
     * @return String             The ID of the adunit or a unique autogenerated ID
     */
    var getID = function (adUnit, adUnitName, count) {

        var id = adUnit.id;
        if (id === '')
        {
            id = adUnit.id = adUnitName + '-auto-gen-id-' + count;
        }

        return id;

    };

    /**
     * Get the name of the Ad unit, either use the div id or
     * check for the optional attribute data-adUnit
     * @param  Object adUnit The adunit to work with
     * @return String        The name of the adunit, will be the same as inside DFP
     */
    var getName = function (adUnit) {

        return  $(adUnit).data('adunit');
    };

    var defineCallbacks = function (adunit) {
      var events = [];
      var _log = googletag.debug_log.log;
      var addEvent = function(name,match){
        events.push({
          "name":name,
          "match":match
        });
      }


      addEvent("gpt-google_js_loaded",			/Google service JS loaded/ig);
      addEvent("gpt-gpt_fetch",				/Fetching GPT implementation/ig);
      addEvent("gpt-gpt_fetched",				/GPT implementation fetched./ig);
      addEvent("gpt-page_load_complete",			/Page load complete/ig);
      addEvent("gpt-queue_start",				/^Invoked queued function/ig);

      addEvent("gpt-service_add_slot",			/Associated (.*) service with slot (.*)/ig);
      addEvent("gpt-service_add_targeting",			/Setting targeting attribute (.*) with value (.*) for service (.*)/ig);
      addEvent("gpt-service_collapse_containers_enable",	/Enabling collapsing of containers when there is no ad content/ig);
      addEvent("gpt-service_create",				/Created service: (.*)/ig);
      addEvent("gpt-service_single_request_mode_enable",	/Using single request mode to fetch ads/ig);

      addEvent("gpt-slot_create",				/Created slot: (.*)/ig);
      addEvent("gpt-slot_add_targeting",			/Setting targeting attribute (.*) with value (.*) for slot (.*)/ig);
      addEvent("gpt-slot_fill",				/Calling fillslot/ig);
      addEvent("gpt-slot_fetch",				/Fetching ad for slot (.*)/ig);
      addEvent("gpt-slot_receiving",				/Receiving ad for slot (.*)/ig);
      addEvent("gpt-slot_render_delay",			/Delaying rendering of ad slot (.*) pending loading of the GPT implementation/ig);
      addEvent("gpt-slot_rendering",				/^Rendering ad for slot (.*)/ig);
      addEvent("gpt-slot_rendered",				/Completed rendering ad for slot (.*)/ig);

      googletag.debug_log.log = function(level,message,service,slot,reference){
        var _arguments = Array.prototype.slice.call(arguments);
        for(var e = 0,el = events.length;e < el; e++)
          if(message.search(events[e].match) > -1){
            $(googletag).trigger(events[e].name,_arguments);
          }
        return _log.apply(this,arguments);
      };
    };

    /**
     * Get the dimensions of the ad unit using the cotainer div dimensions or
     * check for the optional attribute data-dimensions
     * @param  Object adUnit The adunit to work with
     * @return Array         The dimensions of the adunit (width, height)
     */
    var getDimensions = function (adUnit) {

        var width = $(adUnit).width();
        var height = $(adUnit).height();

        // check if dimensions are hardcoded and overide the size
        if (typeof $(adUnit).data('dimensions') !== 'undefined') {

            var dimensions = $(adUnit).data('dimensions').split('x');
            width = parseInt(dimensions[0], 10);
            height = parseInt(dimensions[1], 10);

        }

        return {width: width, height: height};

    };

    /**
     * Call the google DFP script - there is a little bit of error detection in here to detect
     * if the dfp script has failed to load either through an error or it being blocked by an ad
     * blocker... if it does not load we execute a dummy script to replace the real DFP.
     */
    var dfpLoader = function () {

        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];

        var gads = document.createElement('script');
        gads.async = true;
        gads.type = 'text/javascript';

        // Adblock blocks the load of Ad scripts... so we check for that
        gads.onerror = function () {
            dfpBlocked();
        };

        var useSSL = 'https:' === document.location.protocol;
        gads.src = (useSSL ? 'https:' : 'http:') +
        '//www.googletagservices.com/tag/js/gpt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node);

        // Adblock plus seems to hide blocked scripts... so we check for that
        if (gads.style.display === 'none') {
          alert("ad blocked!");
            dfpBlocked();
        }

    };

    /**
     * This function gets called if DFP has been blocked by an adblocker
     * it implements a dummy version of the dfp object and allows the script to excute its callbacks
     * regardless of wheather DFP is actually loaded or not... it is basically only useful for situations
     * where you are laying DFP over existing content and need to init things like slide shows after the loading
     * is completed.
     */
    var dfpBlocked = function () {

        // Get the stored dfp commands
        var commands = window.googletag.cmd;

        // SetTimeout is a bit dirty but the script does not execute in the correct order without it
        setTimeout(function () {

            // overwrite the dfp object - replacing the command array with a function and defining missing functions
            window.googletag = {
                cmd: {
                    push: function (callback) {
                        callback.call(dfpScript);
                    }
                },
                ads: [],
                pubads: function () { return this; },
                enableSingleRequest: function () { return this; },
                setTargeting: function () { return this; },
                collapseEmptyDivs: function () { return this; },
                enableServices: function () { return this; },
                defineSlot: function (name, dimensions, id) {
                    window.googletag.ads.push(id);
                    window.googletag.ads[id] = {
                        renderEnded: function () {},
                        addService: function () { return this; }
                    };
                    return window.googletag.ads[id];
                },
                display: function (id) {
                    window.googletag.ads[id].renderEnded.call(dfpScript);
                    return this;
                }

            };

            // Execute any stored commands
            $.each(commands, function (k, v) {
                window.googletag.cmd.push(v);
            });

        }, 50);

    };

    /**
     * Add function to the jQuery namespace

     * @param  String id      (Optional) The DFP account ID
     * @param  Object options (Optional) Custom options to apply
     */
    $.dfp = $.fn.dfp = function (id, options) {

        options = options || {};

        if (typeof id === 'undefined') {
            id = dfpID;
        }

        if (typeof id === 'object') {
            options = id;
            id = options.dfpID || dfpID;
        }

        var selector = this;

        if (typeof this === 'function') {
            selector = dfpSelector;
        }

        init(id, selector, options);

    };

})(window.jQuery, window);
$.dfp();
$(googletag).on("gpt-slot_rendered",function(e,level,message,service,slot,reference){
  if ((slot["w"] == "/7132793/Cities-Show_Tile_220x430") && (!slot['rendered'])){
    slot['rendered'] = true;
    var link = $("#"+slot.getSlotId().getDomId() + " iframe").first().contents().find("a");
    if (link.length == 0)
      $("#"+slot.getSlotId().getDomId()).remove();
    $(document).trigger("filters_finished");
  }
});
;$(document).ready(function() {
    if ($(".twitter-share-js")){
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.type= 'text/javascript';
      script.src= '//platform.twitter.com/widgets.js';
      head.appendChild(script);
    }

    $('.twitter-share-js').wrap(function() {
        return '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent($(this).data("twitter-share-message")) + '" />';
    });
    $('.facebook-share-js').wrap(function() {
        return '<a href="#" class="facebook-share-link" />';
    });
    $(".facebook-share-link").click(function(e) {
      e.preventDefault();
      var title   = encodeURIComponent($(this).find("img").data("facebook-title"));
      var summary = encodeURIComponent($(this).find("img").data("facebook-summary"));
      var image   = encodeURIComponent($(this).find("img").data("facebook-image") || "http://a5.lscdn.net/imgs/495f741d-50ea-4cc2-b973-e23656de1d07");
      var link    = encodeURIComponent($(this).find("img").data("facebook-link") || window.location.href);
      window.open("https://www.facebook.com/sharer/sharer.php?s=100&p%5Btitle%5D="+title+"&p%5Bsummary%5D="+summary+"&p%5Burl%5D="+link+"&p%5Bimages%5D%5B0%5D="+image,'sharer','toolbar=0,status=0,width=548,height=325');
    });
});
;function getQueryParams (string) {
  var queryString = string.substring(string.lastIndexOf("?") + 1);
  return _.inject(queryString.split('&'), function(hash,pair){
    keyValue = pair.split('=');
    hash[keyValue[0]] = decodeURI(keyValue[1]);
    return hash;
  },{});
}

var params = getQueryParams(location.search);
if(params['show_promo_code'] == 'true') {
  jqxhr = $.get('/promo_codes/terms_and_conditions',
                params,
                function(response){
                  var renderedTemplate = response['template'];
                  $.facebox(renderedTemplate);
                });
};(function() {
  window.Personalization = {
    perform: function() {
      $('[data-personalization-url]').each(function() {
        var elem  = $(this);
        var url = elem.data('personalization-url');
        $.get(url, function(data) { elem.replaceWith(data); });
      });
    }
  };
})();

$(document).ready(function() {
  Personalization.perform()
});
;(function ($) {
  window.SubscribeButton = function(button) {
    var sb = this;
    sb.button = button;
    sb.handle = $("#" + button.data('handle-id'));

    sb.dropDown = function(cb) {
      sb.button.load(sb.button.data('url'), { vertical: sb.button.data('vertical') }, cb);
      sb.button.css({ zoom: 1 });
    };

    sb.handle.headerDropDown({ dropDownArea: "#" + sb.button.attr('id'),
                               onDropDown: sb.dropDown });
  };
})(jQuery);
;