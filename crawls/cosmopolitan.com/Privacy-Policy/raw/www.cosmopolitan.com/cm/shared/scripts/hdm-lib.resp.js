/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);


/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexbox_legacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

/* jQuery Tools v1.2.5 - The missing UI library for the Web */
//$.tools.overlay
(function(a){a.tools=a.tools||{version:"v1.2.5"},a.tools.overlay={addEffect:function(a,b,d){c[a]=[b,d]},conf:{close:null,closeOnClick:!0,closeOnEsc:!0,closeSpeed:"fast",effect:"default",fixed:!a.browser.msie||a.browser.version>6,left:"center",load:!1,mask:null,oneInstance:!0,speed:"normal",target:null,top:"10%"}};var b=[],c={};a.tools.overlay.addEffect("default",function(b,c){var d=this.getConf(),e=a(window);d.fixed||(b.top+=e.scrollTop(),b.left+=e.scrollLeft()),b.position=d.fixed?"fixed":"absolute",this.getOverlay().css(b).fadeIn(d.speed,c)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,a)});function d(d,e){var f=this,g=d.add(f),h=a(window),i,j,k,l=a.tools.expose&&(e.mask||e.expose),m=Math.random().toString().slice(10);l&&(typeof l=="string"&&(l={color:l}),l.closeOnClick=l.closeOnEsc=!1);var n=e.target||d.attr("rel");j=n?a(n):null||d;if(!j.length)throw"Could not find Overlay: "+n;d&&d.index(j)==-1&&d.click(function(a){f.load(a);return a.preventDefault()}),a.extend(f,{load:function(d){if(f.isOpened())return f;var i=c[e.effect];if(!i)throw"Overlay: cannot find effect : \""+e.effect+"\"";e.oneInstance&&a.each(b,function(){this.close(d)}),d=d||a.Event(),d.type="onBeforeLoad",g.trigger(d);if(d.isDefaultPrevented())return f;k=!0,l&&a(j).expose(l);var n=e.top,o=e.left,p=j.outerWidth({margin:!0}),q=j.outerHeight({margin:!0});typeof n=="string"&&(n=n=="center"?Math.max((h.height()-q)/2,0):parseInt(n,10)/100*h.height()),o=="center"&&(o=Math.max((h.width()-p)/2,0)),i[0].call(f,{top:n,left:o},function(){k&&(d.type="onLoad",g.trigger(d))}),l&&e.closeOnClick&&a.mask.getMask().one("click",f.close),e.closeOnClick&&a(document).bind("click."+m,function(b){a(b.target).parents(j).length||f.close(b)}),e.closeOnEsc&&a(document).bind("keydown."+m,function(a){a.keyCode==27&&f.close(a)});return f},close:function(b){if(!f.isOpened())return f;b=b||a.Event(),b.type="onBeforeClose",g.trigger(b);if(!b.isDefaultPrevented()){k=!1,c[e.effect][1].call(f,function(){b.type="onClose",g.trigger(b)}),a(document).unbind("click."+m).unbind("keydown."+m),l&&a.mask.close();return f}},getOverlay:function(){return j},getTrigger:function(){return d},getClosers:function(){return i},isOpened:function(){return k},getConf:function(){return e}}),a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),i=j.find(e.close||".close"),!i.length&&!e.close&&(i=a("<a class=\"close\"></a>"),j.prepend(i)),i.click(function(a){f.close(a)}),e.load&&f.load()}a.fn.overlay=function(c){var e=this.data("overlay");if(e)return e;a.isFunction(c)&&(c={onBeforeLoad:c}),c=a.extend(!0,{},a.tools.overlay.conf,c),this.each(function(){e=new d(a(this),c),b.push(e),a(this).data("overlay",e)});return c.api?e:this}})(jQuery);
(function(a){var b=a.tools.overlay,c=a(window);a.extend(b.conf,{start:{top:null,left:null},fadeInSpeed:"fast",zIndex:9999});function d(a){var b=a.offset();return{top:b.top+a.height()/2,left:b.left+a.width()/2}}var e=function(b,e){var f=this.getOverlay(),g=this.getConf(),h=this.getTrigger(),i=this,j=f.outerWidth({margin:!0}),k=f.data("img"),l=g.fixed?"fixed":"absolute";if(!k){var m=f.css("backgroundImage");if(!m)throw"background-image CSS property not set for overlay";m=m.slice(m.indexOf("(")+1,m.indexOf(")")).replace(/\"/g,""),f.css("backgroundImage","none"),k=a("<img src=\""+m+"\"/>"),k.css({border:0,display:"none"}).width(j),a("body").append(k),f.data("img",k)}var n=g.start.top||Math.round(c.height()/2),o=g.start.left||Math.round(c.width()/2);if(h){var p=d(h);n=p.top,o=p.left}g.fixed?(n-=c.scrollTop(),o-=c.scrollLeft()):(b.top+=c.scrollTop(),b.left+=c.scrollLeft()),k.css({position:"absolute",top:n,left:o,width:0,zIndex:g.zIndex}).show(),b.position=l,f.css(b),k.animate({top:f.css("top"),left:f.css("left"),width:j},g.speed,function(){f.css("zIndex",g.zIndex+1).fadeIn(g.fadeInSpeed,function(){i.isOpened()&&!a(this).index(f)?e.call():f.hide()})}).css("position",l)},f=function(b){var e=this.getOverlay().hide(),f=this.getConf(),g=this.getTrigger(),h=e.data("img"),i={top:f.start.top,left:f.start.left,width:0};g&&a.extend(i,d(g)),f.fixed&&h.css({position:"absolute"}).animate({top:"+="+c.scrollTop(),left:"+="+c.scrollLeft()},0),h.animate(i,f.closeSpeed,b)};b.addEffect("apple",e,f)})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.5"},a.tools.scrollable={conf:{activeClass:"active",circular:!1,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:null,items:".items",keyboard:!0,mousewheel:!1,next:".next",prev:".prev",speed:400,vertical:!1,touch:!0,wheelSpeed:0}};function b(a,b){var c=parseInt(a.css(b),10);if(c)return c;var d=a[0].currentStyle;return d&&d.width&&parseInt(d.width,10)}function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}var d;function e(b,e){var f=this,g=b.add(f),h=b.children(),i=0,j=e.vertical;d||(d=f),h.length>1&&(h=a(e.items,b)),a.extend(f,{getConf:function(){return e},getIndex:function(){return i},getSize:function(){return f.getItems().size()},getNaviButtons:function(){return m.add(n)},getRoot:function(){return b},getItemWrap:function(){return h},getItems:function(){return h.children(e.item).not("."+e.clonedClass)},move:function(a,b){return f.seekTo(i+a,b)},next:function(a){return f.move(1,a)},prev:function(a){return f.move(-1,a)},begin:function(a){return f.seekTo(0,a)},end:function(a){return f.seekTo(f.getSize()-1,a)},focus:function(){d=f;return f},addItem:function(b){b=a(b),e.circular?(h.children("."+e.clonedClass+":last").before(b),h.children("."+e.clonedClass+":first").replaceWith(b.clone().addClass(e.clonedClass))):h.append(b),g.trigger("onAddItem",[b]);return f},seekTo:function(b,c,k){b.jquery||(b*=1);if(e.circular&&b===0&&i==-1&&c!==0)return f;if(!e.circular&&b<0||b>f.getSize()||b<-1)return f;var l=b;b.jquery?b=f.getItems().index(b):l=f.getItems().eq(b);var m=a.Event("onBeforeSeek");if(!k){g.trigger(m,[b,c]);if(m.isDefaultPrevented()||!l.length)return f}var n=j?{top:-l.position().top}:{left:-l.position().left};i=b,d=f,c===undefined&&(c=e.speed),h.animate(n,c,e.easing,k||function(){g.trigger("onSeek",[b])});return f}}),a.each(["onBeforeSeek","onSeek","onAddItem"],function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}});if(e.circular){var k=f.getItems().slice(-1).clone().prependTo(h),l=f.getItems().eq(1).clone().appendTo(h);k.add(l).addClass(e.clonedClass),f.onBeforeSeek(function(a,b,c){if(!a.isDefaultPrevented()){if(b==-1){f.seekTo(k,c,function(){f.end(0)});return a.preventDefault()}b==f.getSize()&&f.seekTo(l,c,function(){f.begin(0)})}}),f.seekTo(0,0,function(){})}var m=c(b,e.prev).click(function(){f.prev()}),n=c(b,e.next).click(function(){f.next()});!e.circular&&f.getSize()>1&&(f.onBeforeSeek(function(a,b){setTimeout(function(){a.isDefaultPrevented()||(m.toggleClass(e.disabledClass,b<=0),n.toggleClass(e.disabledClass,b>=f.getSize()-1))},1)}),e.initialIndex||m.addClass(e.disabledClass)),e.mousewheel&&a.fn.mousewheel&&b.mousewheel(function(a,b){if(e.mousewheel){f.move(b<0?1:-1,e.wheelSpeed||50);return!1}});if(e.touch){var o={};h[0].ontouchstart=function(a){var b=a.touches[0];o.x=b.clientX,o.y=b.clientY},h[0].ontouchmove=function(a){if(a.touches.length==1&&!h.is(":animated")){var b=a.touches[0],c=o.x-b.clientX,d=o.y-b.clientY;f[j&&d>0||!j&&c>0?"next":"prev"](),a.preventDefault()}}}e.keyboard&&a(document).bind("keydown.scrollable",function(b){if(e.keyboard&&!b.altKey&&!b.ctrlKey&&!a(b.target).is(":input")){if(e.keyboard!="static"&&d!=f)return;var c=b.keyCode;if(j&&(c==38||c==40)){f.move(c==38?-1:1);return b.preventDefault()}if(!j&&(c==37||c==39)){f.move(c==37?-1:1);return b.preventDefault()}}}),e.initialIndex&&f.seekTo(e.initialIndex,0,function(){})}a.fn.scrollable=function(b){var c=this.data("scrollable");if(c)return c;b=a.extend({},a.tools.scrollable.conf,b),this.each(function(){c=new e(a(this),b),a(this).data("scrollable",c)});return b.api?c:this}})(jQuery);
(function(a){var b=a.tools.scrollable;b.autoscroll={conf:{autoplay:!0,interval:3e3,autopause:!0}},a.fn.autoscroll=function(c){typeof c=="number"&&(c={interval:c});var d=a.extend({},b.autoscroll.conf,c),e;this.each(function(){var b=a(this).data("scrollable");b&&(e=b);var c,f=!0;b.play=function(){c||(f=!1,c=setInterval(function(){b.next()},d.interval))},b.pause=function(){c=clearInterval(c)},b.stop=function(){b.pause(),f=!0},d.autopause&&b.getRoot().add(b.getNaviButtons()).hover(b.pause,b.play),d.autoplay&&b.play()});return d.api?e:this}})(jQuery);
(function(a){var b=a.tools.scrollable;b.navigator={conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:!1,idPrefix:null,history:!1}};function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}a.fn.navigator=function(d){typeof d=="string"&&(d={navi:d}),d=a.extend({},b.navigator.conf,d);var e;this.each(function(){var b=a(this).data("scrollable"),f=d.navi.jquery?d.navi:c(b.getRoot(),d.navi),g=b.getNaviButtons(),h=d.activeClass,i=d.history&&a.fn.history;b&&(e=b),b.getNaviButtons=function(){return g.add(f)};function j(a,c,d){b.seekTo(c);if(i)location.hash&&(location.hash=a.attr("href").replace("#",""));else return d.preventDefault()}function k(){return f.find(d.naviItem||"> *")}function l(b){var c=a("<"+(d.naviItem||"a")+"/>").click(function(c){j(a(this),b,c)}).attr("href","#"+b);b===0&&c.addClass(h),d.indexed&&c.text(b+1),d.idPrefix&&c.attr("id",d.idPrefix+b);return c.appendTo(f)}k().length?k().each(function(b){a(this).click(function(c){j(a(this),b,c)})}):a.each(b.getItems(),function(a){l(a)}),b.onBeforeSeek(function(a,b){setTimeout(function(){if(!a.isDefaultPrevented()){var c=k().eq(b);!a.isDefaultPrevented()&&c.length&&k().removeClass(h).eq(b).addClass(h)}},1)});function m(a,b){var c=k().eq(b.replace("#",""));c.length||(c=k().filter("[href="+b+"]")),c.click()}b.onAddItem(function(a,c){c=l(b.getItems().index(c)),i&&c.history(m)}),i&&k().history(m)});return d.api?e:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.5"},a.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:!1,history:!1},addEffect:function(a,c){b[a]=c}};var b={"default":function(a,b){this.getPanes().hide().eq(a).show(),b.call()},fade:function(a,b){var c=this.getConf(),d=c.fadeOutSpeed,e=this.getPanes();d?e.fadeOut(d):e.hide(),e.eq(a).fadeIn(c.fadeInSpeed,b)},slide:function(a,b){this.getPanes().slideUp(200),this.getPanes().eq(a).slideDown(400,b)},ajax:function(a,b){this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"),b)}},c;a.tools.tabs.addEffect("horizontal",function(b,d){c||(c=this.getPanes().eq(0).width()),this.getCurrentPane().animate({width:0},function(){a(this).hide()}),this.getPanes().eq(b).animate({width:c},function(){a(this).show(),d.call()})});function d(c,d,e){var f=this,g=c.add(this),h=c.find(e.tabs),i=d.jquery?d:c.children(d),j;h.length||(h=c.children()),i.length||(i=c.parent().find(d)),i.length||(i=a(d)),a.extend(this,{click:function(c,d){var i=h.eq(c);typeof c=="string"&&c.replace("#","")&&(i=h.filter("[href*="+c.replace("#","")+"]"),c=Math.max(h.index(i),0));if(e.rotate){var k=h.length-1;if(c<0)return f.click(k,d);if(c>k)return f.click(0,d)}if(!i.length){if(j>=0)return f;c=e.initialIndex,i=h.eq(c)}if(c===j)return f;d=d||a.Event(),d.type="onBeforeClick",g.trigger(d,[c]);if(!d.isDefaultPrevented()){b[e.effect].call(f,c,function(){d.type="onClick",g.trigger(d,[c])}),j=c,h.removeClass(e.current),i.addClass(e.current);return f}},getConf:function(){return e},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return f.click(j+1)},prev:function(){return f.click(j-1)},destroy:function(){h.unbind(e.event).removeClass(e.current),i.find("a[href^=#]").unbind("click.T");return f}}),a.each("onBeforeClick,onClick".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),e.history&&a.fn.history&&(a.tools.history.init(h),e.event="history"),h.each(function(b){a(this).bind(e.event,function(a){f.click(b,a);return a.preventDefault()})}),i.find("a[href^=#]").bind("click.T",function(b){f.click(a(this).attr("href"),b)}),location.hash&&e.tabs=="a"&&c.find("[href="+location.hash+"]").length?f.click(location.hash):(e.initialIndex===0||e.initialIndex>0)&&f.click(e.initialIndex)}a.fn.tabs=function(b,c){var e=this.data("tabs");e&&(e.destroy(),this.removeData("tabs")),a.isFunction(c)&&(c={onBeforeClick:c}),c=a.extend({},a.tools.tabs.conf,c),this.each(function(){e=new d(a(this),b,c),a(this).data("tabs",e)});return c.api?e:this}})(jQuery);
(function(a){var b;b=a.tools.tabs.slideshow={conf:{next:".forward",prev:".backward",disabledClass:"disabled",autoplay:!1,autopause:!0,interval:3e3,clickable:!0,api:!1}};function c(b,c){var d=this,e=b.add(this),f=b.data("tabs"),g,h=!0;function i(c){var d=a(c);return d.length<2?d:b.parent().find(c)}var j=i(c.next).click(function(){f.next()}),k=i(c.prev).click(function(){f.prev()});a.extend(d,{getTabs:function(){return f},getConf:function(){return c},play:function(){if(g)return d;var b=a.Event("onBeforePlay");e.trigger(b);if(b.isDefaultPrevented())return d;g=setInterval(f.next,c.interval),h=!1,e.trigger("onPlay");return d},pause:function(){if(!g)return d;var b=a.Event("onBeforePause");e.trigger(b);if(b.isDefaultPrevented())return d;g=clearInterval(g),e.trigger("onPause");return d},stop:function(){d.pause(),h=!0}}),a.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","),function(b,e){a.isFunction(c[e])&&a(d).bind(e,c[e]),d[e]=function(b){return a(d).bind(e,b)}}),c.autopause&&f.getTabs().add(j).add(k).add(f.getPanes()).hover(d.pause,function(){h||d.play()}),c.autoplay&&d.play(),c.clickable&&f.getPanes().click(function(){f.next()});if(!f.getConf().rotate){var l=c.disabledClass;f.getIndex()||k.addClass(l),f.onBeforeClick(function(a,b){k.toggleClass(l,!b),j.toggleClass(l,b==f.getTabs().length-1)})}}a.fn.slideshow=function(d){var e=this.data("slideshow");if(e)return e;d=a.extend({},b.conf,d),this.each(function(){e=new c(a(this),d),a(this).data("slideshow",e)});return d.api?e:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.5"};var b;b=a.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:!0,closeOnEsc:!0,zIndex:9998,opacity:.8,startOpacity:0,color:"#fff",onLoad:null,onClose:null}};function c(){if(a.browser.msie){var b=a(document).height(),c=a(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b-c<20?c:b]}return[a(document).width(),a(document).height()]}function d(b){if(b)return b.call(a.mask)}var e,f,g,h,i;a.mask={load:function(j,k){if(g)return this;typeof j=="string"&&(j={color:j}),j=j||h,h=j=a.extend(a.extend({},b.conf),j),e=a("#"+j.maskId),e.length||(e=a("<div/>").attr("id",j.maskId),a("body").append(e));var l=c();e.css({position:"absolute",top:0,left:0,width:l[0],height:l[1],display:"none",opacity:j.startOpacity,zIndex:j.zIndex}),j.color&&e.css("backgroundColor",j.color);if(d(j.onBeforeLoad)===!1)return this;j.closeOnEsc&&a(document).bind("keydown.mask",function(b){b.keyCode==27&&a.mask.close(b)}),j.closeOnClick&&e.bind("click.mask",function(b){a.mask.close(b)}),a(window).bind("resize.mask",function(){a.mask.fit()}),k&&k.length&&(i=k.eq(0).css("zIndex"),a.each(k,function(){var b=a(this);/relative|absolute|fixed/i.test(b.css("position"))||b.css("position","relative")}),f=k.css({zIndex:Math.max(j.zIndex+1,i=="auto"?0:i)})),e.css({display:"block"}).fadeTo(j.loadSpeed,j.opacity,function(){a.mask.fit(),d(j.onLoad),g="full"}),g=!0;return this},close:function(){if(g){if(d(h.onBeforeClose)===!1)return this;e.fadeOut(h.closeSpeed,function(){d(h.onClose),f&&f.css({zIndex:i}),g=!1}),a(document).unbind("keydown.mask"),e.unbind("click.mask"),a(window).unbind("resize.mask")}return this},fit:function(){if(g){var a=c();e.css({width:a[0],height:a[1]})}},getMask:function(){return e},isLoaded:function(a){return a?g=="full":g},getConf:function(){return h},getExposed:function(){return f}},a.fn.mask=function(b){a.mask.load(b);return this},a.fn.expose=function(b){a.mask.load(b,this);return this}})(jQuery);
(function(a){var b,c,d,e;a.tools=a.tools||{version:"v1.2.5"},a.tools.history={init:function(g){e||(a.browser.msie&&a.browser.version<"8"?c||(c=a("<iframe/>").attr("src","javascript:false;").hide().get(0),a("body").append(c),setInterval(function(){var d=c.contentWindow.document,e=d.location.hash;b!==e&&a.event.trigger("hash",e)},100),f(location.hash||"#")):setInterval(function(){var c=location.hash;c!==b&&a.event.trigger("hash",c)},100),d=d?d.add(g):g,g.click(function(b){var d=a(this).attr("href");c&&f(d);if(d.slice(0,1)!="#"){location.href="#"+d;return b.preventDefault()}}),e=!0)}};function f(a){if(a){var b=c.contentWindow.document;b.open().close(),b.location.hash=a}}a(window).bind("hash",function(c,e){e?d.filter(function(){var b=a(this).attr("href");return b==e||b==e.replace("#","")}).trigger("history",[e]):d.eq(0).trigger("history",[e]),b=e}),a.fn.history=function(b){a.tools.history.init(this);return this.bind("history",b)}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.5"},a.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,position:["top","center"],offset:[0,0],relative:!1,cancelDefault:!0,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,c,d){b[a]=[c,d]}};var b={toggle:[function(a){var b=this.getConf(),c=this.getTip(),d=b.opacity;d<1&&c.css({opacity:d}),c.show(),a.call()},function(a){this.getTip().hide(),a.call()}],fade:[function(a){var b=this.getConf();this.getTip().fadeTo(b.fadeInSpeed,b.opacity,a)},function(a){this.getTip().fadeOut(this.getConf().fadeOutSpeed,a)}]};function c(b,c,d){var e=d.relative?b.position().top:b.offset().top,f=d.relative?b.position().left:b.offset().left,g=d.position[0];e-=c.outerHeight()-d.offset[0],f+=b.outerWidth()+d.offset[1],/iPad/i.test(navigator.userAgent)&&(e-=a(window).scrollTop());var h=c.outerHeight()+b.outerHeight();g=="center"&&(e+=h/2),g=="bottom"&&(e+=h),g=d.position[1];var i=c.outerWidth()+b.outerWidth();g=="center"&&(f-=i/2),g=="left"&&(f-=i);return{top:e,left:f}}function d(d,e){var f=this,g=d.add(f),h,i=0,j=0,k=d.attr("title"),l=d.attr("data-tooltip"),m=b[e.effect],n,o=d.is(":input"),p=o&&d.is(":checkbox, :radio, select, :button, :submit"),q=d.attr("type"),r=e.events[q]||e.events[o?p?"widget":"input":"def"];if(!m)throw"Nonexistent effect \""+e.effect+"\"";r=r.split(/,\s*/);if(r.length!=2)throw"Tooltip: bad events configuration for "+q;d.bind(r[0],function(a){clearTimeout(i),e.predelay?j=setTimeout(function(){f.show(a)},e.predelay):f.show(a)}).bind(r[1],function(a){clearTimeout(j),e.delay?i=setTimeout(function(){f.hide(a)},e.delay):f.hide(a)}),k&&e.cancelDefault&&(d.removeAttr("title"),d.data("title",k)),a.extend(f,{show:function(b){if(!h){l?h=a(l):e.tip?h=a(e.tip).eq(0):k?h=a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k):(h=d.next(),h.length||(h=d.parent().next()));if(!h.length)throw"Cannot find tooltip for "+d}if(f.isShown())return f;h.stop(!0,!0);var o=c(d,h,e);e.tip&&h.html(d.data("title")),b=b||a.Event(),b.type="onBeforeShow",g.trigger(b,[o]);if(b.isDefaultPrevented())return f;o=c(d,h,e),h.css({position:"absolute",top:o.top,left:o.left}),n=!0,m[0].call(f,function(){b.type="onShow",n="full",g.trigger(b)});var p=e.events.tooltip.split(/,\s*/);h.data("__set")||(h.bind(p[0],function(){clearTimeout(i),clearTimeout(j)}),p[1]&&!d.is("input:not(:checkbox, :radio), textarea")&&h.bind(p[1],function(a){a.relatedTarget!=d[0]&&d.trigger(r[1].split(" ")[0])}),h.data("__set",!0));return f},hide:function(c){if(!h||!f.isShown())return f;c=c||a.Event(),c.type="onBeforeHide",g.trigger(c);if(!c.isDefaultPrevented()){n=!1,b[e.effect][1].call(f,function(){c.type="onHide",g.trigger(c)});return f}},isShown:function(a){return a?n=="full":n},getConf:function(){return e},getTip:function(){return h},getTrigger:function(){return d}}),a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}})}a.fn.tooltip=function(b){var c=this.data("tooltip");if(c)return c;b=a.extend(!0,{},a.tools.tooltip.conf,b),typeof b.position=="string"&&(b.position=b.position.split(/,?\s/)),this.each(function(){c=new d(a(this),b),a(this).data("tooltip",c)});return b.api?c:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.5"};var b=/\[type=([a-z]+)\]/,c=/^-?[0-9]*(\.[0-9]+)?$/,d=a.tools.dateinput,e=/^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,f=/^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i,g;g=a.tools.validator={conf:{grouped:!1,effect:"default",errorClass:"invalid",inputEvent:null,errorInputEvent:"keyup",formEvent:"submit",lang:"en",message:"<div/>",messageAttr:"data-message",messageClass:"error",offset:[0,0],position:"center right",singleError:!1,speed:"normal"},messages:{"*":{en:"Please correct this value"}},localize:function(b,c){a.each(c,function(a,c){g.messages[a]=g.messages[a]||{},g.messages[a][b]=c})},localizeFn:function(b,c){g.messages[b]=g.messages[b]||{},a.extend(g.messages[b],c)},fn:function(c,d,e){a.isFunction(d)?e=d:(typeof d=="string"&&(d={en:d}),this.messages[c.key||c]=d);var f=b.exec(c);f&&(c=i(f[1])),j.push([c,e])},addEffect:function(a,b,c){k[a]=[b,c]}};function h(b,c,d){var e=b.offset().top,f=b.offset().left,g=d.position.split(/,?\s+/),h=g[0],i=g[1];e-=c.outerHeight()-d.offset[0],f+=b.outerWidth()+d.offset[1],/iPad/i.test(navigator.userAgent)&&(e-=a(window).scrollTop());var j=c.outerHeight()+b.outerHeight();h=="center"&&(e+=j/2),h=="bottom"&&(e+=j);var k=b.outerWidth();i=="center"&&(f-=(k+c.outerWidth())/2),i=="left"&&(f-=k);return{top:e,left:f}}function i(a){function b(){return this.getAttribute("type")==a}b.key="[type="+a+"]";return b}var j=[],k={"default":[function(b){var c=this.getConf();a.each(b,function(b,d){var e=d.input;e.addClass(c.errorClass);var f=e.data("msg.el");f||(f=a(c.message).addClass(c.messageClass).appendTo(document.body),e.data("msg.el",f)),f.css({visibility:"hidden"}).find("p").remove(),a.each(d.messages,function(b,c){a("<p/>").html(c).appendTo(f)}),f.outerWidth()==f.parent().width()&&f.add(f.find("p")).css({display:"inline"});var g=h(e,f,c);f.css({visibility:"visible",position:"absolute",top:g.top,left:g.left}).fadeIn(c.speed)})},function(b){var c=this.getConf();b.removeClass(c.errorClass).each(function(){var b=a(this).data("msg.el");b&&b.css({visibility:"hidden"})})}]};a.each("email,url,number".split(","),function(b,c){a.expr[":"][c]=function(a){return a.getAttribute("type")===c}}),a.fn.oninvalid=function(a){return this[a?"bind":"trigger"]("OI",a)},g.fn(":email","Please enter a valid email address",function(a,b){return!b||e.test(b)}),g.fn(":url","Please enter a valid URL",function(a,b){return!b||f.test(b)}),g.fn(":number","Please enter a numeric value.",function(a,b){return c.test(b)}),g.fn("[max]","Please enter a value smaller than $1",function(a,b){if(b===""||d&&a.is(":date"))return!0;var c=a.attr("max");return parseFloat(b)<=parseFloat(c)?!0:[c]}),g.fn("[min]","Please enter a value larger than $1",function(a,b){if(b===""||d&&a.is(":date"))return!0;var c=a.attr("min");return parseFloat(b)>=parseFloat(c)?!0:[c]}),g.fn("[required]","Please complete this mandatory field.",function(a,b){if(a.is(":checkbox"))return a.is(":checked");return b}),g.fn("[pattern]",function(a){var b=new RegExp("^"+a.attr("pattern")+"$");return b.test(a.val())});function l(b,c,e){var f=this,i=c.add(f);b=b.not(":button, :image, :reset, :submit");function l(b,c,d){if(e.grouped||!b.length){var f;if(d===!1||a.isArray(d)){f=g.messages[c.key||c]||g.messages["*"],f=f[e.lang]||g.messages["*"].en;var h=f.match(/\$\d/g);h&&a.isArray(d)&&a.each(h,function(a){f=f.replace(this,d[a])})}else f=d[e.lang]||d;b.push(f)}}a.extend(f,{getConf:function(){return e},getForm:function(){return c},getInputs:function(){return b},reflow:function(){b.each(function(){var b=a(this),c=b.data("msg.el");if(c){var d=h(b,c,e);c.css({top:d.top,left:d.left})}});return f},invalidate:function(c,d){if(!d){var g=[];a.each(c,function(a,c){var d=b.filter("[name='"+a+"']");d.length&&(d.trigger("OI",[c]),g.push({input:d,messages:[c]}))}),c=g,d=a.Event()}d.type="onFail",i.trigger(d,[c]),d.isDefaultPrevented()||k[e.effect][0].call(f,c,d);return f},reset:function(c){c=c||b,c.removeClass(e.errorClass).each(function(){var b=a(this).data("msg.el");b&&(b.remove(),a(this).data("msg.el",null))}).unbind(e.errorInputEvent||"");return f},destroy:function(){c.unbind(e.formEvent+".V").unbind("reset.V"),b.unbind(e.inputEvent+".V").unbind("change.V");return f.reset()},checkValidity:function(c,g){c=c||b,c=c.not(":disabled");if(!c.length)return!0;g=g||a.Event(),g.type="onBeforeValidate",i.trigger(g,[c]);if(g.isDefaultPrevented())return g.result;var h=[];c.not(":radio:not(:checked)").each(function(){var b=[],c=a(this).data("messages",b),k=d&&c.is(":date")?"onHide.v":e.errorInputEvent+".v";c.unbind(k),a.each(j,function(){var a=this,d=a[0];if(c.filter(d).length){var h=a[1].call(f,c,c.val());if(h!==!0){g.type="onBeforeFail",i.trigger(g,[c,d]);if(g.isDefaultPrevented())return!1;var j=c.attr(e.messageAttr);if(j){b=[j];return!1}l(b,d,h)}}}),b.length&&(h.push({input:c,messages:b}),c.trigger("OI",[b]),e.errorInputEvent&&c.bind(k,function(a){f.checkValidity(c,a)}));if(e.singleError&&h.length)return!1});var m=k[e.effect];if(!m)throw"Validator: cannot find effect \""+e.effect+"\"";if(h.length){f.invalidate(h,g);return!1}m[1].call(f,c,g),g.type="onSuccess",i.trigger(g,[c]),c.unbind(e.errorInputEvent+".v");return!0}}),a.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),e.formEvent&&c.bind(e.formEvent+".V",function(a){if(!f.checkValidity(null,a))return a.preventDefault()}),c.bind("reset.V",function(){f.reset()}),b[0]&&b[0].validity&&b.each(function(){this.oninvalid=function(){return!1}}),c[0]&&(c[0].checkValidity=f.checkValidity),e.inputEvent&&b.bind(e.inputEvent+".V",function(b){f.checkValidity(a(this),b)}),b.filter(":checkbox, select").filter("[required]").bind("change.V",function(b){var c=a(this);(this.checked||c.is("select")&&a(this).val())&&k[e.effect][1].call(f,c,b)});var m=b.filter(":radio").change(function(a){f.checkValidity(m,a)});a(window).resize(function(){f.reflow()})}a.fn.validator=function(b){var c=this.data("validator");c&&(c.destroy(),this.removeData("validator")),b=a.extend(!0,{},g.conf,b);if(this.is("form"))return this.each(function(){var d=a(this);c=new l(d.find(":input"),d,b),d.data("validator",c)});c=new l(this,this.eq(0).closest("form"),b);return this.data("validator",c)}})(jQuery);

/* customSelect by Adam Coulombe - http://www.adamcoulombe.info/lab/jquery/select-box/ */
(function($){$.fn.extend({customStyle:function(options){if(!$.browser.msie||($.browser.msie&&$.browser.version>6)){return this.each(function(){var currentSelected=$(this).find(':selected');$(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">'+currentSelected.text()+'</span></span>').css({position:'absolute',opacity:0,fontSize:$(this).next().css('font-size')});var selectBoxSpan=$(this).next();var selectBoxWidth=parseInt($(this).width())-parseInt(selectBoxSpan.css('padding-left'))-parseInt(selectBoxSpan.css('padding-right'));var selectBoxSpanInner=selectBoxSpan.find(':first-child');selectBoxSpan.css({display:'inline-block'});selectBoxSpanInner.css({width:selectBoxWidth,display:'inline-block'});var selectBoxHeight=parseInt(selectBoxSpan.height())+parseInt(selectBoxSpan.css('padding-top'))+parseInt(selectBoxSpan.css('padding-bottom'));$(this).height(selectBoxHeight).change(function(){selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');});});}}});})(jQuery);

// for all browsers that do not support console
if (typeof console == "undefined") {
	window.console = {log: function() {},warn: function() {},dir: function() {},error: function(msg) {try{throw new Error(100,msg)}catch(e){}}};
}


/*
 * http://code.google.com/p/css3-mediaqueries-js/ (because ie8 sucks)
$(document).ready(function(){
	var links = document.querySelectorAll("link[rel=stylesheet][media]");
	var lastlink = links[links.length-1]
	$('head').append('<link rel="stylesheet" href="'+lastlink.getAttribute("href")+'" />');
})

 */

if (!Date.now) {Date.now = function() {return new Date().valueOf();}}// For IE8 and earlier version.


/* *******
 * http://stackoverflow.com/questions/5434656/ipad-layout-scales-up-when-rotating-from-portrait-to-landcape
 * so ipads zoom when going landscape..
 */
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
		document.addEventListener('gesturestart', function () {
			var viewportmeta = document.querySelector('meta[name="viewport"]');
			viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
		}, false);
    }
}



if(!(window.console && console.log)) {console = {log: function(){},debug: function(){},info: function(){},warn: function(){},error: function(){}};}






var HDM = {};

HDM.util = {
	key: {
		BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESCAPE: 27, SPACE: 32, PAGEUP: 33,
		PAGEDOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, INS: 45, DEL: 46
	},
	setCookie: function(name,value,days){
		var expDate = new Date(), cookieValue;
		expDate.setDate(expDate.getDate() + days);
		cookieValue = encodeURIComponent(value) + ( (days == null) ? '' : ';expires=' + expDate.toUTCString() );
		document.cookie = name + '=' + cookieValue;
	},
	setCookieAdvanced : function(name,value,options){
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
		}
	},
	getCookie: function(name){
		var nameEQ = name + "=",
			ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {c = c.substring(1,c.length);}
			if (c.indexOf(nameEQ) === 0) {
				var result = c.substring(nameEQ.length,c.length);
				return result;
			}
		}
		return null;
	},
	eraseCookie: function(name){
		if ( HDM.util.getCookie(name) ){
			document.cookie = name + '=' + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
		}
	},
	getCookieDump: function(){
		var cookies = document.cookie.split(';'), cookieDump = {};
		for (var i = 0; i < cookies.length; i++){
			var thisCookie = cookies[i].split('=');
			cookieDump[thisCookie[0]] = thisCookie[1];
		}
		return cookieDump;
	},
	cacheBust: function(){
		return Math.floor(1 + Math.random() * 100000);
	},
	getParameter: function(key){
		var searchString = window.location.search.substring(1),i, val, params = searchString.split("&");
		for (i=0;i<params.length;i++) {
			val = params[i].split("=");
			if (val[0] == key) {
				return unescape(val[1]);
			}
		}
		return null;
/*		
		var params = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0, len = params.length; i < len; i++){
			var param = params[i].split('=');
			if (param[0] === key){
				return param[1];
			}
		}
		return false;
*/
	},
	setBreadcrumb: function(){
		if (Modernizr.localstorage){
			localStorage.nextURL = window.location.href;
		} else {
			HDM.util.setCookie('nextURL',window.location.href);
		}
		return true;
	},
	getBreadcrumb: function(preserve){
		var nextURL = '';
		if (Modernizr.localstorage && !!localStorage.nextURL){
			nextURL = localStorage.nextURL;
			if (!preserve){ delete localStorage.nextURL; }
		} else {
			nextURL = HDM.util.getCookie('nextURL') || '/';
		}
		return nextURL;
	},
	storeData: function(key,data){
		if (Modernizr.localstorage){
			localStorage[key] = (typeof data === 'object') ? JSON.stringify(data) : data;
		} else {
			HDM.util.setCookie(key,encodeURIComponent(data));
		}
	},
	getData: function(key){
		if (Modernizr.localstorage){
			return localStorage[key];
		} else {
			return HDM.util.getCookie(key);
		}
	},
	getJSON : function(key){
		var unparsed = this.getData(key);
		try{
			// seems wierd using a try/catch block to pass code, but I'm pressed for time
			// I'll fix this later
			return JSON.parse(unparsed);
		} catch(e){
			return {}
		}
	},
	eraseData: function(key){
		if (Modernizr.localstorage){
/*			if($.browser.msie && $.browser.version === '8.0') // #CHG0056954 -this should never even happen like this..
				HDM.util.eraseCookie(key);
			else*/
				delete localStorage[key];
		} else {
			HDM.util.eraseCookie(key);
		}
	},
    processQueue: function (name, queue, params) {
        var queuebuffer = queue.slice(0);
        while (queuebuffer.length > 0) {
            var func = queuebuffer.pop();
            try {
                func(params);
            } catch (e) {
                console.error("[HDM.util.processQueue:"+name+"]" + e + "\n\n" + func);
            }
        }
    },
	// really empty.. lets fill this out soon!!
	tmpl : function(str,data){ // HDM.util.tmpl()
		// resig's nifty micro templating engine. so sweet.
		/// <summary>
		/// Client side template parser that uses &lt;#= #&gt; and &lt;# code #&gt; expressions.
		/// and # # code blocks for template expansion.
		/// NOTE: chokes on single quotes in the document in some situations
		///       use &amp;rsquo; for literals in text and avoid any single quote
		///       attribute delimiters.
		/// </summary>
		/// <param name="str" type="string">The text of the template to expand</param>
		/// <param name="data" type="var">
		/// Any data that is to be merged. Pass an object and
		/// that object's properties are visible as variables.
		/// </param>
		/// <returns type="string" />
		if (this._tmplCache == null){
			this._tmplCache = {};
		}
		var err = "";
		try {
			var func = this._tmplCache[str];
			if (!func) {
				var strFunc = "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+str.replace(/[\r\t\n]/g," ").replace(/'(?=[^#]*#>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g,"',$1,'").split("<#").join("');").split("#>").join("p.push('")+"');}return p.join('');";
//				console.log("((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((")
//				console.log(strFunc);
				func = new Function("obj", strFunc);
				this._tmplCache[str] = func;
			}
			return func(data);
		} catch (e) {
			err = e.message;
			console.error(e);
			console.warn("[TMPLERROR] "+str);
			console.warn("var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+str.replace(/[\r\t\n]/g," ").replace(/'(?=[^#]*#>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g,"',$1,'").split("<#").join("');").split("#>").join("p.push('")+"');}return p.join('');");
		}
		return "< # ERROR: " + err.htmlEncode() + " # >";
	},
	buildScriptTag: function(src,callback){
		var script = document.createElement('script'), $head = $('head');
		$head.find('script').filter(function(i){
			return $(this).attr('src') && $(this).attr('src').split('?')[0] == src.split('?')[0];
		}).remove();
		script.src = src;
		script.onload = function(){
			try{
				callback(this);
			} catch(e){}
		};
		script.onreadystatechange = function(){
			if (script.readyState === 'loaded' || script.readyState === 'complete'){
				try{
					callback(this);
				} catch(e){}
			}
		};
		$head.get(0).appendChild(script);
	}
}




HDM.ads = {
	viewCount: 1, //this is the first view, so set to 1
	//fake ad tags taken from live GHK.. for testing
	fakeAdJSON: {
		"ams_gh_top":"<!-- Begin 728x90 Top Ad Tag -->\r\n<script language=\"JavaScript\" type=\"text/javascript\">\r\nif(typeof(segQS) == \"undefined\") {var segQS=\"\";}\r\nif(typeof(ord) == \"undefined\") {var ord=\"1234567890\";}\r\nif(typeof(g_GamePageName) == \"undefined\") {var g_GamePageName = '';};\r\ndocument.write('<script language=\"JavaScript\" src=\"http://ad.doubleclick.net/adj/hdm.goodhousekeeping/wellness/;sz=728x90,1000x124;tile=1;pos=1;' + segQS + 'site=goodhousekeeping;sect=health;sub=advice;subsub=index;page=healthy-alternatives;cat=wellness;subcat=;tool=cravings-911;kw=;a=;b=;game=' + g_GamePageName + ';ord=' + ord + '?\" type=\"text/javascript\"><\\/script>');\r\n</script>\r\n<!-- End 728x90 Top Ad Tag -->\r\n<script language=\"Javascript\">if (typeof lb728t == 'object'){lb728t[0] = 1;lb728t[1]++} else {var lb728t = new Array(2);lb728t[0]=1;lb728t[1]=0};</script>",
		"ams_gh_gallery":"<!-- Begin 336x280 Top Ad Tag -->\r\n<script language=\"JavaScript\" type=\"text/javascript\">\r\nif(typeof(segQS) == \"undefined\") {var segQS=\"\";}\r\nif(typeof(ord) == \"undefined\") {var ord=\"1234567890\";}\r\nif(typeof(g_GamePageName) == \"undefined\") {var g_GamePageName = '';};\r\ndocument.write('<script language=\"JavaScript\" src=\"http://ad.doubleclick.net/adj/hdm.goodhousekeeping/wellness/;sz=336x280;tile=2;pos=4;' + segQS + 'site=goodhousekeeping;sect=health;sub=advice;subsub=index;page=healthy-alternatives;cat=wellness;subcat=;tool=cravings-911;kw=;a=;b=;game=' + g_GamePageName + ';ord=' + ord + '?\" type=\"text/javascript\"><\\/script>');\r\n</script>\r\n<!-- End 336x280 Top Ad Tag -->\r\n<script language=\"Javascript\">if (typeof gal336t == 'object'){gal336t[0] = 1;gal336t[1]++} else {var gal336t = new Array(2);gal336t[0]=1;gal336t[1]=0};</script>"
	},
	ispreview : /a\w+preview/.test(document.location.hostname),
	//array of regular expressions that will match our ads.. i could have made one big one, but this is more readable (and easier to add to)
	refreshablePositions: [
		/^ams_\w+_top$/i, //banner ad
		/^ams_\w+_banner$/i, //banner ad - alternative title since most are labeled _top instead of _banner
		/^ams_\w+_tower$/i, //tower ad
		/^ams_\w+_skyscraper$/i, //tower ad
		/^ams_\w+_bottom$/i, //bottom banner
		/^ams_\w+_bot$/i, //bot banner
		/^ams_\w+_gallery$/i, //gallery ad
		/^ams_\w+_gallery_bottom$/i, //bottom gallery ad
		/^ams_\w+_wild$/i, //wild card ad
		/^ams_\w+_social_ad$/i //social ad
	],
	positionList: '', //String - will store the position list string for page-ads.js
	pageAdsParams: {}, //Object - will store the pageAdsParams object for page-ads.js
	//intializer.. sets up the pageAdsParams object for page-ads calls.. sets the refresh and flipbook ad intervals
	init: function(){
		var pageAdsParams = (typeof(pageAdsParams) != 'undefined')?pageAdsParams:{};


		var refreshInterval = $("meta[property='hdm:article_id']").attr("content")
		var flipbookAdInterval = $("meta[property='hdm:ad_refresh_interval']").attr("content")

		var self = HDM.ads,
			positionList, //this will hold our position list after filtering it through the white list
			$allPositions = $('[id^=ams_]'); //this collection will contain all ams elements on the page
		self.pageAdsParams = pageAdsParams || {};
		self.pageAdsParams.position_list = self.getPositionList($allPositions);
		self.refreshInterval = refreshInterval || 4;
		self.flipbookAdInterval = flipbookAdInterval || 5;
		window.refreshAds = self.refreshAds; //set the global refreshAds function for legacy applications
	},
	//returns a list of positions to refresh as a string: 'ams_gh_top,ams_gh_gallery'
	getPositionList: function($positions){
		//$positions will be a jQuery collection of all ad nodes on the page
		var self = HDM.ads,
			positionList = ''; //start off with an empty string
		//loop through the ads
		$positions.each(function(){
			//loop through the list of refreshable positions
			for (var i = 0, len = self.refreshablePositions.length; i < len; i++){
				//if our ad node's id matches the refreshable position, add it to the list
				if ( this.id.match(self.refreshablePositions[i]) ){
					positionList += this.id + ',';
				}
			}
		});
		return positionList.substring(0,positionList.length - 1); //return the list and get rid of the trailing comma
	},
    //this function will make all of our tracking calls
    trackingCalls: function(pageName){
        try {
            if(typeof pageName === 'undefined') {
                pageviewTracking();
            } else {
                pageviewTracking(pageName);
            }
        } catch(e) {}
        try { _vrtrack(); } catch(e) {}
    },
	refreshAds: function(forceRefresh, pageName){
		ord = Math.floor(Math.random()*10e12); // this is a global object used by all ads
		var self = HDM.ads,
			//check to see if the dapMgr object exists and we're on delish.. if so we're gonna call a different function
			isMSN = (typeof dapMgr === 'object') && window.location.hostname.match('delish.com');
		if (isMSN){ return self.refreshMSNAds(); } //if it's MSN, call the msn refresh ads function and exit
		if (forceRefresh === true || self.viewCount >= self.refreshInterval){ //if we're forcing a refresh or we've reached the refresh interval..
			self.getAds(function(adjson){ //get the new ads
				self.renderAdJSON(adjson); //render the ads that come back
				self.trackingCalls(pageName); //execute the tracking calls
			});
			self.viewCount = 1; //reset the view count
			return true;
		}
		self.trackingCalls(pageName);
		self.viewCount++; //if we didn't force a refresh or hit the refresh interval, increment the view count
		return false;
	},
	refreshMSNAds: function(){
		//call the MSN tracking functions
        try { wlAnalytics.TrackPage(); }
		catch (e) {
			try {
				$.track.trackInfo.userStatic.requestId = null;
				$.track.trackPage();
			} catch(e){}
		}
		//find the msn ads
		$('[id^=ams_del]').each(function(){
			var adIndex = dapMgr.getAdItemIndex(this.firstChild.id); //get the index of the ad in dapMgr
			if (adIndex >= 0){ dapMgr.displayAd(adIndex); } //if we have a valid ad index, refresh it
		});
		return true;
	},
	//renderAds takes a position name and a target jQuery object
	//it makes a call to page-ads for the positionName and renders the ad inside the target
	renderAd: function(positionName,$target,parentWidth,parentHeight,browserPath){
		var self = HDM.ads;
		//if a target wasn't passed, look for an element with the same id as the position name
		if (typeof target === 'undefined'){
			target = $(document.getElementById(positionName));
		}
		self.getAds(function(adjson){ //get the ad, passing in the position name
			self.renderAdJSON(adjson,$target,parentWidth,parentHeight); //render the ad
		},positionName,browserPath);
	},
	//all this really does it take a string and wrap it in jQuery then append it to the container
	//need to look for the document.write doubleclick stuff and handle that appropriately
	renderAdJSON: function(adjson,$target,parentWidth,parentHeight){
		
		// sorting by tile!
		var tileorder = [];
		for (var key in adjson){
			var adObj = {
				"positionName" : key,
				"creative" : adjson[key],
				"order" : /\;tile\=(\d*)\;/.test(adjson[key]) ? parseInt(/\;tile\=(\d*)\;/.exec(adjson[key])[1]) : 999
			}
			tileorder.push(adObj);
		}
		
		tileorder.sort(function(a,b){return (a.order-b.order)});	
		
		
		
		for (var i = 0; i < tileorder.length; i++){
			var val = tileorder[i].creative;
			var adPositionName = tileorder[i].positionName;
			if (HDM.ads.ispreview)	console.warn("AD RENDER CHECK",adPositionName,"############",val);
			
			//if there's a target passed, that's out container.. otherwise get the element with the id of our ad object
			var $container = (typeof $target === 'undefined') ? $(document.getElementById(adPositionName)) : $target,
				$adHTML, //this will hold out ad html
				randomColor, //random color we'll give to preview ad backgrounds for lols
				isAdDebug = val.match('FOR PREVIEW ONLY - Ad Ops Debug'), //look for preview ads for testing the refresh
				isDoubleClick = val.match('ad.doubleclick.net/adj/'); //matches doubleclick javascript ads.. we need to turn them into iframe ads
			var refreshTMPLRegexp = /\<script type=\"text\/html\" ams_refresh_tmpl=\"\w*\"\>[\s\S]*?\<\/script\>/;
			var isRefreshTMPL = refreshTMPLRegexp.test(val);

			if (isRefreshTMPL){
				val = HDM.ads.handleRefreshTMPL(refreshTMPLRegexp.exec(val)[0],adPositionName)
				if (HDM.ads.ispreview)	console.warn("--------------------my ad!",val)
			} else if ( isDoubleClick ){ //if it's a doubleclick ad.. handle it
				val = HDM.ads.handleDoubleclickAd(val,parentWidth,parentHeight,adPositionName); //swap the document.write for an iframe
			}
			$adHTML = $(val); //wrap the string in jquery and poof we have an ad
			if ( isAdDebug ){ //if it's a preview ad..
				randomColor = 'rgb(' + Math.ceil(Math.random()*254) + ',' + Math.ceil(Math.random()*254) + ',' + Math.ceil(Math.random()*254) + ')'; //get a random rgb color
				$adHTML.filter('div').css({'background-color':randomColor}); //set the divs background-color to our random color
			}

			if (isRefreshTMPL){
//				console.warn("--------------------INSERTING!",$adHTML,$container)
				$container.html($adHTML); //insert the ad html into the container
//				$container.html(val)
			} else if (isDoubleClick){
				$container.html($adHTML); //insert the ad html into the container
			} else {
				if (HDM.ads.ispreview)	console.error("[pageAds ERROR] nonsupported insert of ad. Please review ad content",val)
				$container.html($adHTML);
			}
			
		};
	},
	handleRefreshTMPL : function(parsed,amsposition){

		var myreg = new RegExp("ams_refresh_tmpl=[\"|']"+amsposition+"[\"|']","i")
		if (myreg.test(parsed)){
			var firsttag = parsed.match(/<script(.*)>/gi)[0];
			var lasttag = parsed.match(/<\/script>/gi)[0]
			var mytmpl = parsed.replace(firsttag,"").replace(lasttag,"");
			var output = HDM.util.tmpl(mytmpl,window);
			if (HDM.ads.ispreview)	console.log("################################# AMS POSITION:"+amsposition,output,"/################################# AMS POSITION:"+amsposition)
			return output;
		} else {
			console.error("[adRefresh] illegal amsposition! "+amsposition,parsed);
			return "<!-- illegal ams position used "+amsposition+" -->";
		}
	},
	handleDoubleclickAd_BUSTED : function(val,parentWidth,parentHeight,target){
//		console.log("YO WHAT AM I??????",val,parentWidth,parentHeight,target)
		window[target] = val;

	},
	handleDoubleclickAd: function(adCode,parentWidth,parentHeight){
		//finds the document.write line in the doubleclick ad
		var doubleclickReg = /document\.write\(\'<script[\s\w="]+src="([\w\s\:\/\.;=,'\+-?]+)"[\s\w="\/]+><\\\/script>'\);/,
			sizeCodeReg = /\d{2,4}x\d{2,4}/g, //looking for size codes like 336x280, 1024x90, etc..
			varReplaceReg = /'\s\+\s\w*\s\+\s'/g, //find variables we need to replace (' + ord + ')
			varNameReg = /\w+/, //matches the variable name in the string being replaced abovedoubleclickURL,
			doubleclickURL, //will hold our doubleclick iframe url
			variablesToReplace, //array for the variables we need to replace
			tempVar; //temp var to hold the variable names
			//sizeArray, //array for the ad size codes
			//tempSize, //temp var to hold the sizes
			//styleString = ""; //style string for the iframe
		try{
			doubleclickURL = doubleclickReg.exec(adCode)[1]; //the url for our doubleclick ad tag
		} catch(e) {
			console.error("[handleDoubleclickAd] check failed!",adCode)
			return "<!-- FAIL --><!-- "+adCode+" --><!-- /FAIL -->";
		}
		doubleclickURL = doubleclickURL.replace('/adj/','/adi/'); //swap adj (js document.write implementaion) for adi (iframe implementation)
		adCode = adCode.replace(doubleclickReg,''); //strip out the document.write line
		variablesToReplace = doubleclickURL.match(varReplaceReg); //get an array of the variables we need to replace
		//loop through the variables
		for (var j = 0; j < variablesToReplace.length; j++){
			tempVar = variablesToReplace[j].match(varNameReg)[0]; //get the variable name
			tempVar = window[tempVar] || ''; //look to window for a value.. or give it an empty string
			doubleclickURL = doubleclickURL.replace(variablesToReplace[j],tempVar); //replace the variables with values
		}
		sizeArray = doubleclickURL.match(sizeCodeReg); //get the size code array
		//if there's only 1 size code, just set the style string to that size
		tempSize = sizeArray[0].split('x'); //get [width,height]
		styleString = "width:" + tempSize[0] + "px;height:" + tempSize[1] + "px;border:none;";
		//add our iframe tag into the ad string
		if (parentWidth) {
			console.log("parentWidth: " + parentWidth);
			adCode += '<iframe src="' + doubleclickURL + '" width="' + parentWidth + '" height="' + parentHeight + '" style="border:0 none;" frameborder="0" scrolling="no"></iframe>';
		} else {
			adCode += '<iframe src="' + doubleclickURL + '" width="' + tempSize[0] + '" height="' + tempSize[1] + '" style="' + styleString + '" frameborder="0" scrolling="no"></iframe>';
		}
		return adCode; //return it
	},
	getAds: function(callback,positionName,browserPath){
		var self = HDM.ads,
			pageAdsParams = $.extend({},self.pageAdsParams); //get a temporary pageAds Params object
		if (typeof callback !== 'function'){
			callback = function(){};
		}
		//if we passed in a position, overwrite the temp position list
		if (typeof positionName === 'string'){
			pageAdsParams.position_list = positionName;
		}
		if (typeof browserPath === 'string'){
			pageAdsParams.browser_path = browserPath;
		}
		//get the ads
		$.ajax({
			url: '/ams/page-ads.js',
			data: pageAdsParams,
			dataType: 'json',
			success: function(json){
				callback(json); //fire the callback
				//callback(self.fakeAdJSON); //this is the callback with the test ads
			}
		});
	}
};






HDM.menu = {
	_vars : {
		wrapscreen : null,
		jqWrap : null,
		jqMenu : null,
		jqBoth : null,
		jqnavTarget : null,
		jqnavtier1 : null,
		jqMenuHeader : null,
		jqNavOverlay : null,
		body : null,
		domlistonavs : null,
		domScreenTop : null,
		openstate : false,
		stickyState : false,
		stickyScrollThreshold : 0,
		currNavOpen : 0,
		currentScrollY : 0,
		altDropDown: false,
		openTimestamp : 0,
		iPadTouch: false
	},
	open : function(e){
		if ((e.timeStamp -HDM.menu._vars.openTimestamp) < 150){
			return false;
		} else {
			HDM.menu._vars.openTimestamp = e.timeStamp;
		}
		if (HDM.menu._vars.openstate){
			HDM.menu.close(e);
			return false;
		} else {
			HDM.menu._vars.currentScrollY = window.scrollY;
/*			if (HDM.menu._vars.currentScrollY > HDM.menu._vars.stickyScrollThreshold.top){
				HDM.menu._vars.body.addClass("menustaysticky")
			}*/
//			HDM.menu._vars.currentScrollY = window.scrollY;
			HDM.menu._vars.jqWrap.addClass("slideTransition");
			setTimeout(function(){
				HDM.menu._vars.openstate = true;
//				HDM.menu._vars.body.addClass("menulock")
				HDM.menu._vars.jqWrap.removeClass("slideTransition");
				HDM.menu._vars.jqWrap.addClass("fixedopen");


				HDM.menu._vars.stickyState = false;
				HDM.menu._vars.jqNavOverlay.removeClass("visible");
				$("#HDM_panelHeader").removeClass("hidden");


			},250)
			setTimeout(function(){
				HDM.menu._vars.body.addClass("hidex menuopen").removeClass("menuclosed");
			},250)
//			alert("am I being called??")
			if (window.scrollY >HDM.menu._vars.stickyScrollThreshold.top){
//				window.scrollTo(0, HDM.menu._vars.stickyScrollThreshold.top);
			}
			HDM.menu._vars.jqWrap.bind('click',HDM.menu.close).bind('touchstart',HDM.menu.close);
			$("[role=menuclose]").bind('click',function(e){HDM.menu.close(e)})

		}
	},
	tier2 : function(n,el){
		if(this._vars.altDropDown){
			function setOpen(i,className){
				HDM.menu._vars.jqnavTarget.each(function(x){
					if((this.getAttribute("topnavtarget")==i)||(i== -1)){
						$(this).addClass(className)
						$(HDM.menu._vars.domlistonavs[x]).addClass(className)
					}
				})
			}
			function setClose(i,className){
				HDM.menu._vars.jqnavTarget.each(function(x){
					if((this.getAttribute("topnavtarget")==i)||(i== -1)){
						$(this).removeClass(className)
						$(HDM.menu._vars.domlistonavs[x]).removeClass(className)
					}
				})
			}

			if ((this._vars.currNavOpen != n)||(n == -1)){
				//console.log("oh look",n,this._vars.currNavOpen)
				setClose(this._vars.currNavOpen,"open");
				this._vars.currNavOpen = -1;
			}

			if ((this._vars.currNavOpen == n)){
				setClose(this._vars.currNavOpen,"open");
				setOpen(this._vars.currNavOpen,"closing")
				setTimeout(function(){
					setClose(HDM.menu._vars.currNavOpen,"closing")
					HDM.menu._vars.currNavOpen = 0;
				},250)
				this._vars.jqnavtier1.removeClass("tier2open")
				this._vars.jqMenuHeader.removeClass("subnavopen");

			} else {
				this._vars.jqnavtier1.addClass("tier2open")
				this._vars.jqMenuHeader.addClass("subnavopen");
				setOpen(n,"open");
				this._vars.currNavOpen = n;
			}
		}else{
			function toggle(i, className){
	//			console.log("triggered",i);
				HDM.menu._vars.jqnavTarget.each(function(x){
					if((this.getAttribute("topnavtarget")==i)||(i== 0)){
						var dat = $(this);
						var datDOM = $(HDM.menu._vars.domlistonavs[x])

						if (dat.hasClass(className)||(i==0)){
							dat.removeClass(className);
							datDOM.removeClass(className);
						} else {
							dat.addClass(className);
							datDOM.addClass(className);
						}
					}
				})
			}
			toggle(n,"open")
		}



	},
	closetier2 : function(e){
//		var tnum = e.target.parentNode.getAttribute("topnavtarget")
//		alert(e.target.getAttribute("topnavclose"))
		function findnavTag(el) {
			// dude this code is crass as hell, fixme.. :-(
			while (el.parentNode) {
				el = el.parentNode;
				if (el.tagName === "BODY"){
					return null;
				}
				var at = el.getAttribute("topnavclose")
				if (el.getAttribute("topnavclose")){
					return at
				}
			}
			return null;
		}

		var navnum = e.target.getAttribute("topnavclose");
		if (!navnum){
			navnum = findnavTag(e.target)
		}

		HDM.menu.tier2(navnum);
	},
	close : function(e){
		function findUpTag(el) {
			while (el.parentNode) {
				el = el.parentNode;
				if (el.tagName === "BODY"){
					return null;
				}
				if (el.getAttribute("topnavtarget")){
					return el
				}
			}
			return null;
		}
		if(e){
			var uptag = findUpTag(e.target)
			if (uptag){
				return false;
			}
			var testattribute = e.target? e.target.getAttribute("topnav") : null;
			if (testattribute !== null){
				return false;
			}
		}
		if (HDM.menu._vars.openstate){
			HDM.menu._vars.openstate = false;
			HDM.menu._vars.jqWrap.removeClass("fixedopen");
			setTimeout(function(){
				HDM.menu._vars.jqWrap.addClass("slideTransition");
				HDM.menu._vars.body.removeClass("menuopen").addClass("menuclosed");
			},180)
			setTimeout(function(){
				HDM.menu._vars.body.removeClass("hidex");
				HDM.menu.tier2(0);
				HDM.menu._vars.jqnavtier1.removeClass("tier2open")
				HDM.menu._vars.jqWrap.removeClass("slideTransition");
				HDM.menu._vars.jqMenuHeader.removeClass("subnavopen");
			},250);
			HDM.menu._vars.jqWrap.unbind('click',HDM.menu.close).unbind('touchstart',HDM.menu.close);
			$("[role=menuclose]").unbind('click',HDM.menu.close)

		} else {
			return false;
		}
	},
	click : function(o){
		if (window.innerWidth >= 960){
			if((!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) || (HDM.menu._vars.iPadTouch)){
				HDM.menu._vars.iPadTouch = false;
				window.location.assign(this.getAttribute("deskhref"));
			}else{
				HDM.menu._vars.iPadTouch = true;
			}
		} else {
			HDM.menu.tier2(this.getAttribute("topnav"),o);
		}
	},
	init : function(){
		// before we do *anything*, clone the nav and place it into the screen-menu element..
		$('[role=screen-menu]').insertBefore('[role=screen-top]')
		// this must be cloned before being occurs
		this._vars.jqNavOverlay = $("[role=screen-menuoverlay]");
		
		var panelHeader = $("#HDM_panelHeader")
		panelHeader.find("span[id] script:contains('document.write')").remove(); // strip out tags that may document.write
		panelHeader.clone(true,true).appendTo(HDM.menu._vars.jqNavOverlay)
		
//		$("#HDM_panelHeader").clone().appendTo(HDM.menu._vars.jqNavOverlay);
		var roleNavul = $('[role=navigation]>ul.nav').eq(1);
		roleNavul.find("span[id] script:contains('document.write')").remove(); // strip out tags that may document.write
		roleNavul.clone(true,true).appendTo('[role=screen-menu]');
//		$('[role=navigation]>ul.nav').eq(1).clone().appendTo('[role=screen-menu]');
//		$("[role=screen-menu] .tier2").appendTo("[role=screen-menu]");// moving the t2 nav items to 'top level'
		this._vars.wrapscreen = document.querySelector("[role=screen-top]");
		this._vars.jqnavtier1 = $("ul.nav.tier1");
			if(this._vars.jqnavtier1.attr("role")=="menu-dropdown")
			this._vars.altDropDown = true;
		this._vars.jqWrap = $("[role=screen-top]");
		this._vars.jqMenuHeader = $("[role=menu-header]");
		this._vars.jqnavTarget = $("[topnavtarget]");
		this._vars.body = $(document.body);
		this._vars.domScreenTop = this._vars.jqWrap[0];



		var listonavs = document.querySelectorAll("a[topnav]");
		$(listonavs).bind('click',HDM.menu.click);
		var listocloset2 = document.querySelectorAll(".tier2 .tier2close")
		$(listocloset2).bind('click',HDM.menu.closetier2);


		$("[role=menusubback]").bind('click',function(){HDM.menu.tier2(-1);})
//		$("[role=screen-top]").bind('click',function(e){HDM.menu.close(e)})
//		$("[role=menuclose]").bind('click',function(e){HDM.menu.close(e)})
		HDM.menu._vars.domlistonavs = listonavs;
		$("[role=menuopen]").bind('click',function(e){HDM.menu.open(e)}).bind('touchstart',function(e){HDM.menu.open(e)});

		$(window).scroll(function(){
			var wo = (window.scrollY) ? window.scrollY : document.documentElement.scrollTop;
//			console.log(wo,HDM.menu._vars.stickyScrollThreshold.top,HDM.menu._vars.stickyState)
			if((wo > HDM.menu._vars.stickyScrollThreshold.top) && (!HDM.menu._vars.stickyState)){
//				console.warn("SHOW STICKY STATE!")
				HDM.menu._vars.stickyState = true;
				HDM.menu._vars.jqNavOverlay.addClass("visible");
				$("#HDM_panelHeader").addClass("hidden");
			} else if((wo <= HDM.menu._vars.stickyScrollThreshold.top)&&(HDM.menu._vars.stickyState)){
//				console.warn("HIDE STICKY STATE!")
				HDM.menu._vars.stickyState = false;
				HDM.menu._vars.jqNavOverlay.removeClass("visible");
				$("#HDM_panelHeader").removeClass("hidden");
			}
		}).resize(function(){
			HDM.menu.fn.getNavScrollThreshold();
		});
		HDM.menu.fn.getNavScrollThreshold(); // at least run it once..

	},
	fn : {
		getNavScrollThreshold : function(){
			HDM.menu._vars.stickyScrollThreshold = $("[role='screen-top'] [role='navigation']").offset();

			if (!HDM.menu._vars.stickyScrollThreshold){
				console.warn("stickynav not found, exit")
				return false;
			}
			HDM.menu._vars.stickyScrollThreshold.top = Math.ceil(HDM.menu._vars.stickyScrollThreshold.top);
//			console.log("sticky scroll threshold",HDM.menu._vars.stickyScrollThreshold )
		}
	}
};



HDM.search = {
	_vars : {
		activated : false,
		body : null
	},
	activate : function(){
		HDM.search._vars.activated = !HDM.search._vars.activated;
		if (HDM.search._vars.activated){
			HDM.search._vars.body.addClass("searchmode");
			document.querySelector("#windowedsearch").focus();
		} else {
			HDM.search._vars.body.removeClass("searchmode");
		}
	},
	close : function(){
		HDM.search._vars.activated = false;
		HDM.search._vars.body.removeClass("searchmode");
	},
	init : function(){
		HDM.search._vars.body = $(document.body)

		$("[role=activatesearch]").bind('click',HDM.search.activate);
		$("[role=search-cancel]").bind('click',HDM.search.close);
/*		var searchb = document.querySelectorAll("[role=activatesearch]");
		for (var i = 0; i < searchb.length; i++){
			searchb[i].addEventListener('click',HDM.search.activate,false);
		}
		var searchc = document.querySelectorAll("[role=search-cancel]");
		for (var i = 0; i < searchc.length; i++){
			searchc[i].addEventListener('click',HDM.search.close,false);
		}*/
	}
}


HDM.footer = {
	_var : {
		jqnode : null,
		jqnodeTarget : null
	},
	toggle : function(e){
		var xtar = e.target.getAttribute("expand");
		function findUpTag(el) {
			while (el.parentNode) {
				el = el.parentNode;
				ex = el.getAttribute("expand");
				if (ex){
					return ex;
				}
			}
			return null;
		}
		xtar = xtar ? xtar : findUpTag(e.target);
		console.log(xtar)


		var tarlist = HDM.footer._var.jqnodeTarget;
		for (var i = 0; i < tarlist.length; i++){
			var itar = tarlist[i];
			if (itar.getAttribute("expandtarget") == xtar){
				var jtar = $(itar);
				if (jtar.hasClass("expanded")){
					jtar.removeClass("expanded")
				} else {
					jtar.addClass("expanded")
				}
			}
		}
	},
	init : function(){
		HDM.footer._var.jqnode = $("[expand]");
		HDM.footer._var.jqnodeTarget = $("[expandtarget]")
		HDM.footer._var.jqnode.bind('click',HDM.footer.toggle)
	}
}

HDM.widgets = {
	share : {
		_var : {
			jqshoverlay : null,
			baseY : null,
			scrollThreshold : null,
			fixState : false
		},
		init : function(){
			// first thing we want to do is get the offset position of the bodyContent..
			if ($("[role=articleBody]").length == 0){
				$("[role=screen-shareoverlay]").hide();
				return false;
			}
			HDM.widgets.share._var.baseY = $("[role=articleBody]").offset();
			HDM.widgets.share._var.jqshoverlay = $("[role=screen-shareoverlay]").css("top",HDM.widgets.share._var.baseY.top);
			// now let's calculate the scroll threshold while also taking into account the stickymenu..
			HDM.widgets.share._var.scrollThreshold = HDM.widgets.share._var.baseY.top-$("[role=screen-menuoverlay]").height()-HDM.widgets.share._var.jqshoverlay.attr("scrollOffsetY");
			// add scroll event listener thingy
			$(window).scroll(function(){
				var wo = (window.scrollY) ? window.scrollY : document.documentElement.scrollTop;
				if((wo >= HDM.widgets.share._var.scrollThreshold)&& (!HDM.widgets.share._var.fixState)){
					HDM.widgets.share._var.fixState = true;
					HDM.widgets.share._var.jqshoverlay.addClass("fixed");
				} else if((wo < HDM.widgets.share._var.scrollThreshold)&&(HDM.widgets.share._var.fixState)){
					HDM.widgets.share._var.fixState = false;
					HDM.widgets.share._var.jqshoverlay.removeClass("fixed");
				}
			});

		}
	},
	learnMore: {
		_var: {
			button : null,
			container : null,
			contentContainer: null,
			content: ''
		},

		showLearnMore: function(){
			var button = HDM.widgets.learnMore._var.button;

			$(".learnMoreContent").toggleClass("hidden");

			button.toggleClass("show");
		},

		init: function(){
			HDM.widgets.learnMore._var.button = $(".learnMore.hdmTooltip");
			HDM.widgets.learnMore._var.container = $(".learnMore.hdmTooltip").parent();
			HDM.widgets.learnMore._var.contentContainer = $(".learnMoreContent");
			HDM.widgets.learnMore._var.content = $(".learnMore.hdmTooltip").attr("title");

			HDM.widgets.learnMore._var.contentContainer.html(HDM.widgets.learnMore._var.content);

			HDM.widgets.learnMore._var.button.bind("click", HDM.widgets.learnMore.showLearnMore);
		}
	},
	init : function(){
		HDM.widgets.share.init();
		$(document).ajaxComplete(function(){
			HDM.widgets.learnMore.init();
		});
	}
}


HDM.article = {
	_vars : {
		commentNodes : [],
		imgJSON : []
	},
	images : {
		getSource : function(){
			var source = $("[HDMJSON='images']").html(); 
			if (source){
				console.log("success found source");
				source = source.replace(/\\'/g,"'");
				source = source.replace(/^\s+|\s+$/g,''); //cause string.trim not supporteed in IE<9
				HDM.article._vars.imgJSON = jQuery.parseJSON(source);
				console.log(HDM.article._vars.imgJSON);
				return true
			} else {
				return false;
			}
		}
	},
	template : {
		code : "",
		register : function(){
			HDM.article.template.article_images = $("[HDMTMPL='article_images']").html();
		},
		output : function(imgdata){
			if (!HDM.article._vars.imgJSON[imgdata[0]]){
				console.error("[article.template.output] image does not exist..",imgdata[0])
				return false;
			}
			var oJSON = {img : HDM.article._vars.imgJSON[imgdata[0]]};
			oJSON.img["className"] = imgdata[1];
			var myoutput = HDM.util.tmpl(HDM.article.template.article_images,oJSON);
			return myoutput;
		}
	},
	init : function(){
		var hassource = this.images.getSource();
		if (!hassource){
			return false;
		}
		this.template.register(); // register the image template
		var jqArticleBody = $("[role=articleBody]");
//		var commentNodes = jqArticleBody.contents().filter(function(){return this.nodeType==8});
		// the code above is not as robust..
		var commentNodes = jqArticleBody.find(":not(iframe)").andSelf().contents().filter(function(){return this.nodeType==8})
		var reg = /IMG[0-9]*:[A-z]*/i;

		for (i = 0; i < commentNodes.length; i++){
			// scan the initial list of comment nodes and lets only grab the appropriate ones..
			var comment = commentNodes[i].textContent;
			if (reg.test(comment)){
				HDM.article._vars.commentNodes.push(commentNodes[i]);
			}
		}
		// okay, now that we have our list, lets try and append the appropriate template renders..
		for (var i = 0; i < HDM.article._vars.commentNodes.length; i++){
			var mycomment = HDM.article._vars.commentNodes[i];
			var imgData = mycomment.textContent.toLowerCase().split(":")
			var html = HDM.article.template.output(imgData)
			$(html).insertAfter(mycomment);
			console.log("MY COMMENT " + mycomment);
			$(mycomment).remove();// remove the comment tag
		}
		// lets find all the image tags inside articleBody..
		$(document).ready(function(){
			var smartloadimages = $("[role=articleBody] .smartload[hdmimg]");
			smartloadimages.each(function(index){
				HDM.smartImages.fn.register(this,this.getAttribute("hdmimg"));
			});
		})

	}
}


HDM.flipbook = {
	dom : {
		frame : null,
		stage : null,
		indframeleft : null, // HDM.flipbook.dom.indframeleft
		indframemiddle : null,
		indframeright : null,
		jqMain : null,
		jqInterstitial : null,
		jqRelatedStories : null,
		jqRelatedStoriesSource : null,
		jdDocBody : null,
		jqPageNum : null,
		jqPageTotal : null,
		jqLarge : null
	},
	_vars : {
		FBModel : {},
		counter : 0,
		deltaframe : null,
		deltaboundary : null,
		eventDisabled : false,
		isAnimating : false,
		state : "main",
		notouch : false,
		smartloadThumbs : false
	},
	template : {
		code : "",
		largeCode : "",
		register : function(){
//			HDM.article.template.article_images = $("[HDMTMPL='article_images']").html();
			// lets grab the template and store it locally..
			this.code =  $("[HDMTMPL='flipbook_images']").html();
			this.largeCode = $("[HDMTMPL='flipbook_large']").html();

		},
		output : function(position){
			var imgObject = HDM.flipbook._vars.FBModel.slides[position];
			if (!imgObject){
				return "<!-- nothing here.. -->";
			}
			var framewidth = HDM.flipbook.dom.frame.offsetWidth*HDM.smartImages._vars.devicePixelRatio; // this is the width of the frames... also taking into account pixeldensity
			var cuts = imgObject.cuts;
			// ok lets place them in a fancypants array... hrm.. you knwo what, screw that!
			cuts.sort(function(a,b){return b[0]-a[0]});
			for (var i = 0; i < cuts.length; i++){
				var mywidth = cuts[i][0];
				if (mywidth > framewidth){
					imgObject.src = cuts[i][1];
				}
			}

			imgObject.sponsored = HDM.flipbook._vars.FBModel.slides[position].sponsored;
			var myoutput = HDM.util.tmpl(HDM.flipbook.template.code,imgObject);
//			console.log(myoutput,imgObject,cutstring)
			return myoutput;
		},
		generateThumbCode : function(tmplsource,slides){
			var html = "";
			for (var i = 0; i < slides.length; i++){
				var myslide = slides[i];
				/*if (!!myslide.i || true){ // wtf is this??? lol
				}*/
				myslide.i = i+1;
				html += HDM.util.tmpl(tmplsource,myslide);
				console.log("TMPL THUMB OUTPUT "+i,HDM.util.tmpl(tmplsource,myslide))
			}
			return html;
		},
		outputLarge : function(position){
			var imgObject = HDM.flipbook._vars.FBModel.slides[position];
			if (!imgObject){
				return "<!-- nothing here.. -->";
			}
			imgObject.sponsored = HDM.flipbook._vars.FBModel.slides[position].sponsored;
			var myoutput = HDM.util.tmpl(HDM.flipbook.template.largeCode,imgObject);
			$("[role='flipbook-largecontent']").html(myoutput);

			// get the first img inside..
			var myimg = $("[role='flipbook-largecontent'] img").get(0);

			var tsmartimg = HDM.smartImages.fn.register(myimg,"flipbook",true);
			if (tsmartimg){
				HDM.smartImages.fn.findIdealImageSrc(tsmartimg);
				HDM.smartImages.fn.loadIt(tsmartimg,true)
			}
		},
		updateSlidePosition : function(slideNumber){
			// if we have active next and prev buttons, href updates for those go in here..
			//update the URL
			window.location.hash = '#slide-' + ( slideNumber );
		}
	},
	engine : {
		centralizeFrames : function(whackyoffset){
//			console.log("frames centralized!",HDM.flipbook._vars.counter)
			// the first thing we're going to do is remove the event listener:
			HDM.flipbook.dom.stage.removeEventListener('webkitTransitionEnd',HDM.flipbook.engine.centralizeFrames,false);
			HDM.flipbook.dom.stage.removeEventListener('transitionend',HDM.flipbook.engine.centralizeFrames,false);

			HDM.flipbook.dom.stage.style.webkitTransitionDuration = '0';
			HDM.flipbook.dom.stage.style.MozTransitionDuration = '0ms';
			HDM.flipbook.dom.stage.style.msTransitionDuration = '0ms';
			// we need to find out if the css assignment is too slow.. if that's the case may need to wrap in timeout event...
			if (HDM.flipbook._vars.currentDirection === "next"){
				HDM.flipbook._vars.counter++;//console.log("[engine.next] current counter position is: "+HDM.flipbook._vars.counter)
			} else if (HDM.flipbook._vars.currentDirection === "back"){
				HDM.flipbook._vars.counter--;//console.log("[engine.next] current counter position is: "+HDM.flipbook._vars.counter)
			}
			
			// first thing we need to do is populate the center area..
			HDM.flipbook.dom.indframemiddle.innerHTML = HDM.flipbook.template.output(HDM.flipbook._vars.counter)
			// then we do a instant repositioning (some flicker may occur..?)
			if (HDM.flipbook._vars.notouch){
				HDM.flipbook.dom.stage.style.webkitTransform = 'translate3d(0px, 0px, 0)';
				HDM.flipbook.dom.stage.style.MozTransform = 'translate(0px, 0px)';
				HDM.flipbook.dom.stage.style.msTransform = 'translate(0px, 0px)';
				HDM.flipbook.dom.stage.style.left= "0px";
			} else {
				HDM.flipbook.dom.stage.style.webkitTransform = 'translate3d(0px, 0px, 0)';
				HDM.flipbook.dom.stage.style.MozTransform = 'translate(0px, 0px)';
				HDM.flipbook.dom.stage.style.msTransform = 'translate(0px, 0px)';
			}

			// then once it is center positioned, readjust the left and right frames with the appropriate code..

			HDM.flipbook.dom.indframeleft.innerHTML = HDM.flipbook.template.output(HDM.flipbook._vars.counter-1)
			HDM.flipbook.dom.indframeright.innerHTML = HDM.flipbook.template.output(HDM.flipbook._vars.counter+1)

			HDM.flipbook.position.offsetx = -HDM.flipbook._vars.deltaframe;// reset to middle frame
			// lets bind any buttons we find..
			// lets bind any buttons we find..
			if(HDM.flipbook._vars.counter + 1 > 1){
				$(".fb_prev").css('display','block');
				$(".fb_prev").removeClass("inactive");
				$("[flipbook='button_prev']").bind("mousedown",HDM.flipbook.click.back)
			}else{
				$(".fb_prev").addClass("inactive");
			}
			$("[flipbook='button_next']").bind("mousedown",HDM.flipbook.click.next)
			$("[flipbook='button_thumbs']").bind("mousedown",HDM.flipbook.click.gotoThumbs)
			$("[flipbook='button_larger']").bind("mousedown",HDM.flipbook.click.gotoLarger)

			HDM.flipbook.dom.jqPageNum.html((HDM.flipbook._vars.counter+1)+" of "+HDM.flipbook._vars.FBModel.slides.length)
			HDM.flipbook.dom.jqPageTotal.html(HDM.flipbook._vars.FBModel.slides.length + " images")

			if (typeof HDM.flipbook.flipCallback == 'function'){
				try {
					HDM.flipbook.flipCallback(HDM.flipbook._vars.counter);
				} catch(e) {}
			}
			try{// calling omniture tracking
				console.log("pageviewTracking call..");
				pageviewTracking(); // weyland's famous omniture calls..
			} catch(e){
				console.error("[omniture] pageviewTracking() call not found!");
			}
			HDM.flipbook.interstitial.tick(HDM.flipbook._vars.currentDirection);
			HDM.flipbook.template.updateSlidePosition(HDM.flipbook._vars.counter+1);
			// lets adjust the height value of the parent container..
			HDM.flipbook.isAnimating = false;
		},
		events : {
			disable : function(){
				if (HDM.flipbook._vars.eventDisabled){
					console.error("dude this is busted!",HDM.flipbook._vars.eventDisabled);
				} else {
					HDM.flipbook._vars.eventDisabled = true;
				}
			},
			enable : function(){
				if (!HDM.flipbook._vars.eventDisabled){
					console.error("dude this is busted!",HDM.flipbook._vars.eventDisabled);
				} else {
					HDM.flipbook._vars.eventDisabled = false;
				}
			}
		},
		renderThumbs : function(FBModel){
			console.error("render thumbs here")
			$(document).ready(function(){
				var thumbsSourceDOM = $("[HDMTMPL='flipbook_thumbs']");
				console.log("MY SOURCEDOM",thumbsSourceDOM.html());
				
				var thumbsOutput = HDM.flipbook.template.generateThumbCode(thumbsSourceDOM.html(),FBModel.slides)
//				console.log("_____________",thumbsOutput);
				thumbsSourceDOM.after(thumbsOutput);
//				$("[flipbook='thumbsFrame']").html(thumbsOutput);
				thumbsSourceDOM.remove();
			})
		}
	},
	position : {
		startx : null,
		starttimestamp : 0,
		previousx : null, // this is used to test immediate velocity
		currentx : null,
		currenttimestamp : 0,
		offsetx : 0,
		updatex : function(x,timeStamp){
			this.previousx = this.currentx;
			this.currentx = x;
			this.previoustimestamp = this.currenttimestamp;
			this.currenttimestamp = timeStamp;
		},
		initx : function(x,timeStamp){// intialization
			this.startx = x;
			this.currentx = x;
			this.previousx = x;
			this.starttimestamp = timeStamp;
			this.currenttimestamp = timeStamp;
			this.offsetx = 0;
		},
		delta : function(){
			var delta = this.currentx-this.startx+this.offsetx;
			// this is where we need to calculate the boundary limits...
			// lets assume that every image initiated always starts off in the middle frame...
			if ((HDM.flipbook._vars.counter==0)&&(delta > 0)){
				delta = 0;
			} else if ((delta > HDM.flipbook._vars.deltaframe)){
				delta = HDM.flipbook._vars.deltaframe;
			} else if ((HDM.flipbook._vars.counter >(HDM.flipbook._vars.FBModel.slides.length-2))&&(delta < 0)){
				delta = 0;
			} else if (((-delta) > HDM.flipbook._vars.deltaframe)){
				delta = -HDM.flipbook._vars.deltaframe;
			}
			return delta;
		}
	},
	util : {
		getFrameWidth : function(){
			// lets grab some initial scroll boundaries..
			HDM.flipbook._vars.deltaframe = $("[flipbook='frame_left']").width();
			HDM.flipbook._vars.deltaboundary = (HDM.flipbook._vars.deltaframe-$("[flipbook='scrollstage']").width());
		},
		readjustFrameScroll : function(){
		}
	},
	view : {
		hideMain : function(){
			console.log("view.hideMain");
			HDM.flipbook.dom.jqMain.addClass("hidden").removeClass("show");
		},
		hideThumbs : function(){
			console.log("view.hideThumbs");
			HDM.flipbook.dom.jqDocBody.removeClass("showfbthumbs");
			$('html, body').animate({scrollTop:$(".fb_frame").offset().top - $(".stickymenu.visible").height()}, 'slow');
		},
		hideInterstitial : function(){
			console.log("view.hideInterstitial")
			HDM.flipbook.dom.jqInterstitial.addClass("hidden").removeClass("show");
		},
		hideRelatedStories : function(){
			console.log("view.hideRelatedStories")
			HDM.flipbook.dom.jqRelatedStories.addClass("hidden").removeClass("show");
			HDM.flipbook.dom.jqRelatedStoriesSource.removeClass("hidden").addClass("show");
		},
		hideLarge : function(){
			console.log("view.hideLarge")
			HDM.flipbook.dom.jqLarge.addClass("hidden").removeClass("show");
			HDM.flipbook.dom.jqDocBody.removeClass("showfblarge")
		},
		showMain : function(){
			console.log("view.showMain")
			HDM.flipbook.dom.jqMain.removeClass("hidden").addClass("show");
		},
		showThumbs : function(){
			console.log("view.showThumbs")
			HDM.flipbook.dom.jqDocBody.addClass("showfbthumbs");
		},
		showInterstitial : function(){
			console.log("view.showInterstitial")
			HDM.flipbook.dom.jqInterstitial.removeClass("hidden").addClass("show");
		},
		showRelatedStories : function(){
			console.log("view.showRelatedStories")
			HDM.flipbook.dom.jqRelatedStories.removeClass("hidden").addClass("show");
			HDM.flipbook.dom.jqRelatedStoriesSource.addClass("hidden").removeClass("show");
		},
		showLarge : function(){
			console.log("view.showLarge")
			HDM.flipbook.dom.jqLarge.removeClass("hidden").addClass("show");
			HDM.flipbook.dom.jqDocBody.addClass("showfblarge")
			HDM.flipbook.template.outputLarge(HDM.flipbook._vars.counter);
		}
	},
	control : {
		// all of the main fb actions are performed here...
		gotoThumbs : function(e){
			console.log("thumbs clicked..",e,this)
			// should only be called from main..
			if (HDM.flipbook._vars.state == "main"){
				HDM.flipbook._vars.state = "thumbs";
				HDM.flipbook.view.hideMain();
				HDM.flipbook.view.showThumbs();
				window.scrollTo(0, 1);
				if (HDM.flipbook._vars.smartloadThumbs == false){
					var thumbimg = $("[flipbook='thumbsFrame'] img");
					thumbimg.each(function(index){
						var attr = this.getAttribute("hdmimg")
						if (attr){
							var smartimg = HDM.smartImages.fn.register(this,"flipbookThumbs");
							HDM.smartImages.fn.findIdealImageSrc(smartimg);
						}
					})
					HDM.flipbook._vars.smartloadThumbs = true;
				}
			} else {
				console.error("this should not have been called from here...",HDM.flipbook._vars.state)
//				HDM.flipbook.control.gotoMain();
//				HDM.flipbook.view.hideInterstitial();
			}
		},
		gotoMain : function(){
			// should only be called from interstitial, or thumbs..
			if (HDM.flipbook._vars.state == "interstitial"){
				HDM.flipbook._vars.state = "main";
				HDM.flipbook.view.hideInterstitial();
				HDM.flipbook.view.showMain();
			} else 	if (HDM.flipbook._vars.state == "thumbs"){
				HDM.flipbook._vars.state = "main";
				HDM.flipbook.view.hideThumbs();
				HDM.flipbook.view.showMain();
			} else 	if (HDM.flipbook._vars.state == "larger"){
				HDM.flipbook._vars.state = "main";
				HDM.flipbook.view.hideLarge();
				HDM.flipbook.dom.jqDocBody.unbind('click',HDM.flipbook.click.gotoMain)

			} else {
				console.error("this should not have been called from here...",HDM.flipbook._vars.state)
			}
		},
		gotoInterstitial : function(callback){
			// shoud only be called from main..
			if (HDM.flipbook._vars.state == "main"){
				HDM.flipbook._vars.state = "interstitial";
				HDM.flipbook.view.hideMain();
				HDM.flipbook.view.showInterstitial();

				if (typeof callback == 'function'){
					callback();
				}

			} else {
				console.error("this should not have been called from here...",HDM.flipbook._vars.state)
			}
		},
		gotoLastFrame : function(){
			if (HDM.flipbook._vars.state == "main"){
				HDM.flipbook._vars.state = "lastFrame";
				HDM.flipbook.view.hideMain();
				HDM.flipbook.view.showRelatedStories();
			} else {
				console.error("this should not have been called from here...",HDM.flipbook._vars.state)
			}
		},
		restartFB : function(e){
			if (HDM.flipbook._vars.state == "lastFrame"){
				if(HDM.flipbook._vars.state != "interstitial"){
					HDM.flipbook._vars.state = "main";
				}
				// we're restarting the fb..
				HDM.flipbook._vars.currentDirection = "";
				HDM.flipbook._vars.counter = 0;
				$(".fb_prev").addClass("inactive");
				HDM.flipbook.engine.centralizeFrames();
			
				HDM.flipbook.view.hideRelatedStories();
				if(HDM.flipbook._vars.state != "interstitial"){
					HDM.flipbook.view.showMain();
				}
			} else {
				console.error("this should not have been called from here...",HDM.flipbook._vars.state)
			}
		},
		gotoSlide : function(position){
			if (HDM.flipbook._vars.state == "thumbs"){
				HDM.flipbook._vars.state = "main";
				// we're restarting the fb..
				HDM.flipbook._vars.currentDirection = null;
				HDM.flipbook._vars.counter = position;
				HDM.flipbook.view.hideThumbs();
				HDM.flipbook.view.showMain();
				HDM.flipbook.engine.centralizeFrames();
			} else {
				console.error("this should not have been called from here...",HDM.flipbook._vars.state)
			}
		},
		gotoLarger : function(e){
			if (HDM.flipbook._vars.state == "main"){
				HDM.flipbook._vars.state = "larger";
				HDM.flipbook.view.showLarge();
				HDM.flipbook.dom.jqDocBody.bind('click',HDM.flipbook.click.gotoMain)

			} else {
				console.error("this should not have been called from here...",HDM.flipbook._vars.state)
			}
		}
	},
	interstitial : {
		_vars : {
			counter : 0,
			interval : -1,
			adPosition : null,
			jqAdDOM : null
		},
		init : function(interval,adPosition){
			HDM.flipbook.interstitial._vars.counter = 0;
			HDM.flipbook.interstitial._vars.interval = interval;
			HDM.flipbook.interstitial._vars.adPosition = adPosition;
			HDM.flipbook.interstitial._vars.jqAdDOM = $(".fb_adContainer");
			console.log("HDM.flipbook interstitial intialization:",this)
		},
		tick : function (direction){
//			console.error("I need to trace this..",this,direction)
			if ((HDM.flipbook.interstitial._vars.interval < 0)||(direction == null)){
				/* tick will only run if a direction has been placed
				 * if it is null, do not do anything
				 */
				return false;
			}
			HDM.flipbook.interstitial._vars.counter++;
			HDM.ads.refreshAds(true); // global ad refresh happens regardless..
//			console.log("[interstitial.tick]",HDM.flipbook.interstitial._vars.counter)
			if (HDM.flipbook.interstitial._vars.counter >= HDM.flipbook.interstitial._vars.interval){
				HDM.ads.renderAd(HDM.flipbook.interstitial._vars.adPosition,HDM.flipbook.interstitial._vars.jqAdDOM);
				HDM.flipbook.control.gotoInterstitial(function(){
					HDM.flipbook.interstitial._vars.counter = 0
				});
			}
		}
	},
	autoplay : {
		autoplayset : false,
		interval : 5000,
		intervalID : null,
		nextit : function(){
			if(HDM.flipbook._vars.state == "lastFrame"){
				HDM.flipbook.control.restartFB();
			} else if(HDM.flipbook._vars.state == "interstitial"){
				HDM.flipbook.control.gotoMain();
			} else {
				HDM.flipbook.click.next();
			}
		},
		start : function(){
			if (HDM.flipbook.autoplay.intervalID == null){
				HDM.flipbook.autoplay.intervalID = setInterval(HDM.flipbook.autoplay.nextit,HDM.flipbook.autoplay.interval)
			} else {
				console.error("[flipbook autoplay] already set! Cannot invoke a second start event")
			}
		},
		stop : function(){
			window.clearInterval(HDM.flipbook.autoplay.intervalID);
			HDM.flipbook.autoplay.intervalID = null;
		},
		init : function(playit,interval){
			if (playit){
				HDM.flipbook.autoplay.autoplayset = true;
				HDM.flipbook.autoplay.interval = interval;
				$(document).ready(HDM.flipbook.autoplay.start)
				$(HDM.flipbook.dom.stage).bind('mousedown',HDM.flipbook.autoplay.stop).bind('touchstart',HDM.flipbook.autoplay.stop);
				
//			HDM.menu._vars.jqWrap.unbind('click',HDM.menu.close).unbind('touchstart',HDM.menu.close);
				
				
			}
		}
	},
	move : {
		start : function(x,timeStamp){
//			console.log("move start!",x,timeStamp);
			if (HDM.flipbook.isAnimating){
//				console.log("is animating! lets centralize..")
				HDM.flipbook.engine.centralizeFrames();
			}
			HDM.flipbook.position.initx(x,timeStamp);
			// I'm having some real problems with this stupid thing not being removed quickly enough...
			// so instead I'm just gonna fire it every time the user starts
			HDM.flipbook.dom.stage.removeEventListener('webkitTransitionEnd',HDM.flipbook.engine.centralizeFrames,false);
			HDM.flipbook.dom.stage.removeEventListener('transitionend',HDM.flipbook.engine.centralizeFrames,false);
			HDM.flipbook.dom.stage.style.webkitTransitionDuration = '0ms';
			HDM.flipbook.dom.stage.style.MozTransitionDuration = '0ms';
			HDM.flipbook.dom.stage.style.msTransitionDuration = '0';
		},
		drag : function(x,timeStamp){
			var delta = HDM.flipbook.position.delta(); // we calculate maximum allowed delta movement, one frame at a time
//			console.log("[move.drag] "+x+" "+timeStamp,delta);
			HDM.flipbook.position.updatex(x,timeStamp);
			HDM.flipbook.dom.stage.style.webkitTransform = 'translate3d(' + delta + 'px, 0px, 0)';
			HDM.flipbook.dom.stage.style.MozTransform = 'translate(' + delta + 'px, 0px)';
			HDM.flipbook.dom.stage.style.msTransform = 'translate(' + delta + 'px, 0px)';
		},
		end : function(timeStamp){
			if (HDM.flipbook.isAnimating){
				console.log("***end is isAnimating")
			}
			HDM.flipbook.isAnimating = true;
//			console.log("[HDM.flipbook.position.offsetx:"+HDM.flipbook.position.offsetx+"]");
			HDM.flipbook._vars.currentDirection = null; // this is the default current direction

			var transitionDuration = 300;
			var movedelta = HDM.flipbook.position.delta();
			var movethreshold =movedelta-HDM.flipbook.position.offsetx;

			if (Math.abs(movethreshold) > 143){
				if (movethreshold < 0){
					if (HDM.flipbook._vars.counter <= (HDM.flipbook._vars.FBModel.slides.length-2)){
						HDM.flipbook._vars.currentDirection = "next";
					}
				} else {
					if (HDM.flipbook._vars.counter!= 0){
						HDM.flipbook._vars.currentDirection = "back";
					}
				}
			}
			var flicktime = HDM.flipbook.position.currenttimestamp-HDM.flipbook.position.starttimestamp;
			if (flicktime < 500){
				var flickdistance = HDM.flipbook.position.startx - HDM.flipbook.position.currentx;
				var flickvelocity = Math.abs(flickdistance)/flicktime; // units: pixels/milliseconds
				if (flickvelocity > .25){
					if (flickdistance > 0){
						if (HDM.flipbook._vars.counter <= (HDM.flipbook._vars.FBModel.slides.length-2)){
							transitionDuration = (HDM.flipbook.position.delta()-(HDM.flipbook.position.offsetx - HDM.flipbook._vars.deltaframe))/flickvelocity;
							HDM.flipbook._vars.currentDirection = "next";
						}
						if (HDM.flipbook._vars.counter == (HDM.flipbook._vars.FBModel.slides.length-1)){
							HDM.flipbook.control.gotoLastFrame();
						}
					} else {
						if (HDM.flipbook._vars.counter!= 0){
							transitionDuration = Math.abs(-HDM.flipbook.position.delta());
							HDM.flipbook._vars.currentDirection = "back";
						}
					}
//					console.warn("high velocity detected! lets roll out..",HDM.flipbook.position.delta(),HDM.flipbook.position.offsetx,HDM.flipbook._vars.deltaframe,flickvelocity,transitionDuration)
				}
			}
			if (HDM.flipbook._vars.currentDirection === "next"){
				HDM.flipbook.position.offsetx -= HDM.flipbook._vars.deltaframe;
			} else if (HDM.flipbook._vars.currentDirection === "back"){
				HDM.flipbook.position.offsetx += HDM.flipbook._vars.deltaframe;
			}
			if (movedelta == HDM.flipbook.position.offsetx){
				// TIL that transitionend won't invoke if the translate value is the same as it's previous value
				// so if you managed to do a 'full' screen push, then it'll never fire
				// good part is that you don't have to do your own animations, yay.
				HDM.flipbook.engine.centralizeFrames();
			} else {

				if (HDM.flipbook._vars.notouch){
//					console.log("MER DERTER",HDM.flipbook._vars.currentDirection,HDM.flipbook.position.offsetx,transitionDuration,movedelta)
					$(HDM.flipbook.dom.stage).animate({
						left: HDM.flipbook.position.offsetx-movedelta
					}, transitionDuration, function(e) {
						// Animation complete.
						HDM.flipbook.engine.centralizeFrames(movedelta);
					});
					// we gotta ghetto animate this,, also unbind any events..
				} else {

					HDM.flipbook.dom.stage.addEventListener('webkitTransitionEnd',HDM.flipbook.engine.centralizeFrames,false);
					HDM.flipbook.dom.stage.addEventListener('transitionend',HDM.flipbook.engine.centralizeFrames,false);

					HDM.flipbook.dom.stage.style.webkitTransitionDuration = transitionDuration+'ms';
					HDM.flipbook.dom.stage.style.MozTransitionDuration = transitionDuration+'ms';
					HDM.flipbook.dom.stage.style.msTransitionDuration = transitionDuration+'ms';

					HDM.flipbook.dom.stage.style.webkitTransform = 'translate3d('+HDM.flipbook.position.offsetx+'px, 0px, 0)';
					HDM.flipbook.dom.stage.style.MozTransform = 'translate(' + HDM.flipbook.position.offsetx + 'px, 0px)';
					HDM.flipbook.dom.stage.style.msTransform = 'translate(' + HDM.flipbook.position.offsetx + 'px, 0px)';
				}
			}
		}
	},
	event :{
//		ythreshold : null,// silly little hacky thing to make the frame sticky-like
		lockScrolling : false,
		eventCache : null,
		/*
			ok, so this sucker is related to a stupid android bug that prevents the touchmove from firing correctly..
			http://code.google.com/p/chromium/issues/detail?id=150779
			what needs to be done is that on touchstart we enable lockScrolling at touchstart..
			however, we need to make sure that a user *CAN* scroll at a certain threshold.. lets call it  25 px
		*/
		touchstart : function(e){
			HDM.flipbook.move.start(e.touches[0].pageX,e.timeStamp);
			HDM.flipbook.event.ythreshold = e.touches[0].pageY;
			HDM.flipbook.event.lockScrolling = true;
		},
		touchmove : function(e){
			// ghetto user agent switching... blah
			/* so, the iPhone has different behavior with .preventDefault(), so by default I'm just gonna not have the preventDefault fire on iOS
				which is actually okay, since the problem was with the android browsers having a bug that would cancel touchmove
			*/
			var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
			if (HDM.flipbook.event.lockScrolling && (!iOS)){
				e.preventDefault();
				HDM.flipbook.move.drag(e.touches[0].pageX,e.timeStamp);
				if (Math.abs(HDM.flipbook.event.ythreshold-e.touches[0].pageY) > 25){
					// making the scroll a little sticky
					HDM.flipbook.event.lockScrolling = false;
					e.target.dispatchEvent(e); // honestly, I don't even know if this works...
				}
			} else if (iOS) {
				if (HDM.flipbook.event.ythreshold === e.touches[0].pageY){
					e.preventDefault();
				}
				HDM.flipbook.move.drag(e.touches[0].pageX,e.timeStamp);
			}
		},
		touchend : function(e){
			HDM.flipbook.move.end(e.timeStamp);
		},
		touchcancel : function(e){
			HDM.flipbook.move.end(e.timeStamp);
		},
		initmouseposition : function(e){
			HDM.flipbook.move.start(e.pageX,e.timeStamp);
		},
		mousestart : function(e){

			function findbuttonTag(el) {
				// dude this code is crass as hell, fixme.. :-(
				var at = el.getAttribute("flipbook")
				if ((at== "button_next")||(at=="button_prev")){
					return at
				}
				while (el.parentNode) {
					el = el.parentNode;
					if (el.tagName === "BODY"){
						return null;
					}
					var at = el.getAttribute("flipbook")
					if ((at== "button_next")||(at=="button_prev")){
						return at
					}
				}
				return null;
			}
			if (findbuttonTag(e.target)){
				if (!e) e = window.event;
				if (e.stopPropagation) { //IE9 & Other Browsers
				  e.stopPropagation();
				} else { //IE8 and Lower
				  e.cancelBubble = true;
				}
				return false;
			}
			console.log("what am i",e.target,e)

			HDM.flipbook.event.mousedown = true;
			document.body.addEventListener("mouseup",HDM.flipbook.event.mouseend,  false);
		},
		mousemove : function(e){
			if (HDM.flipbook.event.mousedown) {
				HDM.flipbook.move.drag(e.pageX,e.timeStamp);
			}
		},
		mouseend : function(e){
			HDM.flipbook.event.mousedown = false;
			HDM.flipbook.move.end(e.timeStamp);
			document.body.removeEventListener("mouseup",HDM.flipbook.event.mouseend,  false);
		},
		mousedown : false
	},
	click : {
		back : function(){
			if (HDM.flipbook._vars.counter > 0){
				HDM.flipbook._vars.currentDirection = "back"
				HDM.flipbook.click.scrollNCentralize((HDM.flipbook._vars.deltaframe))
			}
		},
		next : function(){
			if (HDM.flipbook._vars.counter < (HDM.flipbook._vars.FBModel.slides.length-1)){
				HDM.flipbook._vars.currentDirection = "next"
				HDM.flipbook.click.scrollNCentralize((-HDM.flipbook._vars.deltaframe))
			} else if (HDM.flipbook._vars.counter == (HDM.flipbook._vars.FBModel.slides.length-1)){
				HDM.flipbook.control.gotoLastFrame();
			}
		},
		scrollNCentralize : function(distance){
				if (HDM.flipbook._vars.notouch){
					$(HDM.flipbook.dom.stage).animate({
						left: distance
					}, 300, function(e) {
						// Animation complete.
						HDM.flipbook.engine.centralizeFrames();
					});
					// we gotta ghetto animate this,, also unbind any events..
				} else {
					HDM.flipbook.dom.stage.style.webkitTransitionDuration = 300+'ms';
					HDM.flipbook.dom.stage.style.MozTransitionDuration = 300+'ms';
					HDM.flipbook.dom.stage.addEventListener('webkitTransitionEnd',HDM.flipbook.engine.centralizeFrames,false);
					HDM.flipbook.dom.stage.addEventListener('transitionend',HDM.flipbook.engine.centralizeFrames,false);
					HDM.flipbook.dom.stage.style.webkitTransform = 'translate3d('+distance+'px, 0px, 0)';
					HDM.flipbook.dom.stage.style.MozTransform = 'translate(' + distance + 'px, 0px)';
					HDM.flipbook.dom.stage.style.msTransform = 'translate(' + distance + 'px, 0px)';
				}
		},
		zoom : function(){
			var e = {
				currentTarget : HDM.flipbook.dom.zoomicon
			}
			HDM.image.enable(e);
		},
		gotoThumbs : function(e){
//			HDM.flipbook.control.gotoInterstitial(e);
			HDM.flipbook.control.gotoThumbs(e);
		},
		gotoMain : function(e){
			HDM.flipbook.control.gotoMain(e);
			HDM.flipbook._vars.currentDirection = null;
			HDM.flipbook.engine.centralizeFrames();
		},
		restartFB : function(e){
			HDM.flipbook.control.restartFB(e);
		},
		thumbSelect : function(position){
			HDM.flipbook.control.gotoSlide(--position);
			HDM.flipbook.engine.centralizeFrames();
		},
		gotoLarger : function(e){
			HDM.flipbook.control.gotoLarger(e);
		}
	},
	init: function(FBModel,options){
		// lets grab the jquery references and store them locally...
		this.dom.frame = document.querySelector("[flipbook=scrollframe]");
		this.dom.stage = document.querySelector("[flipbook=scrollstage]");
		this.dom.indframeleft = document.querySelector("[flipbook=frame_left]");
		this.dom.indframemiddle = document.querySelector("[flipbook=frame_center]");
		this.dom.indframeright = document.querySelector("[flipbook=frame_right]");

		// lets bind some jq objects..

		this.dom.jqMain = $("[flipbook='scrollframe'],[flipbook='flipbookSubHead'],[flipbook='flipbookSubFoot']");
		this.dom.jqInterstitial = $("[flipbook='adFrame']");
		this.dom.jqDocBody = $(document.body);
		this.dom.jqPageNum = $("[flipbook='pageNum']");
		this.dom.jqPageTotal = $("[flipbook='pageNumTotal']");
		this.dom.jqRelatedStories = $("[flipbook='storiesFrame']");
		this.dom.jqRelatedStoriesSource = $("[flipbook='storiesFrameSource']");
		this.dom.jqRelatedStoriesSource.find("span[id] script:contains('document.write')").remove();
		this.dom.jqRelatedStories.append(this.dom.jqRelatedStoriesSource.clone());
		this.dom.jqLarge = $("[role='screen-flipbooklargeoverlay']");

		if (this.dom.frame==null){
			return false;
		}
		this.util.getFrameWidth(); // store the frame width value so when the screen changes..
		this.template.register();// register the template!


		if (Modernizr.touch){
			this.dom.frame.addEventListener("touchstart",HDM.flipbook.event.touchstart,  true);
			this.dom.frame.addEventListener("touchmove",HDM.flipbook.event.touchmove,  false);
			this.dom.frame.addEventListener("touchend",HDM.flipbook.event.touchend,  true);
			this.dom.frame.addEventListener("touchcancel",HDM.flipbook.event.touchcancel, true);
		} else {
			this._vars.notouch = true;
			//this.dom.frame.addEventListener("mousedown",HDM.flipbook.event.mousestart,  false);
			//document.body.addEventListener("mousedown",HDM.flipbook.event.initmouseposition,  false);
			//document.body.addEventListener("mousemove",HDM.flipbook.event.mousemove,  false);

		}



		HDM.flipbook._vars.FBModel = FBModel;

		// if a hash exists for pagination, lets load that page..
		var indexString = /slide\-(\d+)$/.exec(window.location.hash)
		if ( indexString ){
			HDM.flipbook._vars.counter = parseInt(indexString[1],10)-1;
		}

		HDM.flipbook.engine.centralizeFrames();
		
		this._vars.state = "main"; // I know it's redundantly being called, but whatever..


		$(window).resize(function(){
			HDM.flipbook.util.getFrameWidth();
		});

		this.interstitial.init(options.fb_adInterval,options.flipbookAdPosition);

		HDM.flipbook.engine.renderThumbs(HDM.flipbook._vars.FBModel);
		
		$(document).ready(function(){

			// lets render the thumbs..
			// lets move thumbs content to it the container..
			$("[role='flipbook-thumbscontent']").append($("[flipbook='thumbsFrame']"))
			// gonna bind it onload..
			$("[flipbook='button_closead'],[flipbook='button_closethumbs'],[flipbook='button_closelarge']").bind("click",HDM.flipbook.click.gotoMain);
			$("[flipbook='button_restart']").bind("click",HDM.flipbook.click.restartFB)
			
			$("[flipbook='pageNumTotal']").html(HDM.flipbook._vars.FBModel.slides.length+" images")
			
		})
		
//		options.fb_autoplay = true;
//		options.fb_autoplayDelay = 3000;
		this.autoplay.init(options.fb_autoplay,options.fb_autoplayDelay);

	}
}


/**********************************************************
 *
 * HDM smartImages
 *
 * Handles the lazy loading scripts, along with choosing the appropriate cut sizes
 * based on dom attributes. The attribute syntax looks something like this:
 *
 * hdmimgcut_[width]x[height]="path/to/file.jpg"
 *
 * make sure we have hdmimg="smart" attribute in the dom node as well. Classnames
 * smartload and noimg will change dynamically and only have a visual impact, mostly
 * for fancy fadin effects and stuff
 *
 * <img class="smartload noimg" hdmimg="smart" src="placeholder16x9.gif" hdmimgcut_1280x768="reallylargefile.jpg" hdmimgcut_960x576="largefile.jpg" hdmimgcut_640x384="mediumfile.jpg" hdmimgcut_320x192="smallfile.jpg" hdmimgcut_160x96="thumbfile.jpg" >
 *
 * attributes:
 *		hdmimg
 *			- smart - standard attribute name
 *			- unique - there is only one image being used here, so replace common images
 *
 *
 **********************************************************/
HDM.smartImages = {
	_vars : {
		devicePixelRatio : 1, // lets default this to one..
		imglist : [],
		windowHeight : null,
		jqwindowobj : null/*,
		loadQueue : []*/
	},
	fn : {
		checksize : function(){
		},
		loadByimg : function(imgObj){
			var imglist = HDM.smartImages._vars.imglist;
			var foundsmartimg = null;
			for (var i = 0; i < imglist.length; i++){
				if (imglist[i].img = imgObj){
					foundsmartimg = imglist[i];
					break;
				}
			}
//			console.log("DURD ER FURD ERT?",foundsmartimg,foundsmartimg.img)
			if (foundsmartimg != null){
				HDM.smartImages.fn.loadIt(foundsmartimg);
			}

		},
		loadIt: function(smartimg,force){
			// ok even before all that, lets' find out if this element is attached to the dom..
			var elementInDocument = function(e) {
				while (e = e.parentNode) {
					if (e == document) {return true;}
				}
				return false;
			}
			if (!elementInDocument(smartimg.img)){
//				console.warn("[HDM.smargImages.fb.loadInt] imagen not in dom",smartimg);
				return false;
			}
			// before we do antyhing, lets check smartimg and see if the idealURL is already being used as the src
			if ((smartimg.img.src == smartimg.selectedCut[0]) && (!force)){
//				console.warn("***** same url found",smartimg.img.src,smartimg.selectedCut);
				return false;
			}
			if ((smartimg.top == -1)&&(!force)){
				return false;
			}
			// lets see if it is hidden..
			if ((window.getComputedStyle(smartimg.img,null).getPropertyValue("display") == "none")&&(!force)){
				return false;
			}
			if (smartimg.img.src == smartimg.selectedCut[0]){
				return false; // if the same img is attempted to being loaded, lets pass..
			}
			var newimg = new Image();
//			alert("load it"); return false;
			function loadme(){
				smartimg.jqobj.removeClass("noimg");
				smartimg.img.src = this.src;
				smartimg.jqobj.addClass("loaded");
			}
			newimg.addEventListener('load',loadme,false);
			newimg.src = smartimg.selectedCut[0];
		},
		lazyLoadit : function(){
		},
		selectImageSrc : function(index){
			// let's get the img object..
			myimg = HDM.smartImages._vars.imglist[index];

		},
		register : function(imgObj,imgType,nosave){
			var jqsmart = $(imgObj)
			// lets find all the cuts...
			var cuts = [];
			var attributes = imgObj.attributes;
			for (var i = 0; i < attributes.length; i++){
				var name = attributes[i].nodeName.toLowerCase();
				if (/hdmimgcut_\d+x\d+$/.test(name)){
					var dimensions = name.split("hdmimgcut_")[1].split("x");
					cuts.push([attributes[i].nodeValue,parseInt(dimensions[0]),parseInt(dimensions[1])]);
					// array format: [hdmimgcut_1280x768,1280,768]
					// or [name, width, height]
				}

			}

			if (cuts.length == 0){
				console.warn("[HDM.smartImages.fn.register] no image cuts found",imgObj);
				return false;
			}
			cuts.sort(function(a,b){return b[1]-a[1]});// sort it by width value - I love these slick functions, always so fancy
			var smartimg = {
				height : jqsmart.height(),
				width : jqsmart.width(), // needed when image is resized and need to check to see if the url we need is good enough
				top : -1,
				loaded : false,
				cuts : cuts,
				selectedCut : [],
				imgType : imgType,
				jqobj : jqsmart,
				img : imgObj // may not need these..
			}
/*			jqsmart.load(function(){
//				smartimg.top = smartimg.jqobj.offset().top;
				console.log("smartimg test "+smartimg.jqobj.offset().top,smartimg,this)
			});*/
			// keep in mind that if there are redundant image
			var found = false;
			if (imgType == "unique"){
				var imglist = HDM.smartImages._vars.imglist;
				for (var i = 0; i < imglist.length; i++){
					var testimg = imglist[i];
					if (testimg.img.src == smartimg.img.src){
						// reference has already been found, lets replace it..
						HDM.smartImages._vars.imglist[i] = smartimg;
						found = true;
						break;
					}
				}
			} else {
			// okay, so we will also need to make sure any redundant files pointing to the same src file will
			// not be referenced twice..
				var imglist = HDM.smartImages._vars.imglist;
				for (var i = 0; i < imglist.length; i++){
					var testimg = imglist[i];
					if (testimg.img == smartimg.img){
						// reference has already been found, lets replace it..
//						console.error("[HDM.smartImages.fn.register] duplicate img ref found, ignoring..",smartimg)
						found = true;
						break;
					}
				}
			}

			console.warn("regme",imgType)

			if (!found && (imgType != "carousel") && (imgType != "flipbook")){
				HDM.smartImages._vars.imglist.push(smartimg);
				return smartimg;
			} else if ((imgType == "carousel")||(imgType == "flipbook")){
				// we do not store carousel images in the smartImage bank, carousels have their own management
				// same thing with flipbook..
				return smartimg;
			} else if (nosave){
				console.warn("not saving this smartimg in the registry, simply just pass the obj back")
				return smartimg;
			} else {
				return smartimg;
			}
		},
		findIdealImageSrc : function(smartimg){
			smartimg.loaded = false;
			var currentwidth = smartimg.width*HDM.smartImages._vars.devicePixelRatio;

			var cuts = smartimg.cuts;
			var chosencut;
			for (var i = 0; i < cuts.length; i++){
				var mywidth = cuts[i][1];
				if (mywidth > currentwidth){// this sucker works because it's sorted.. remember?
					chosencut = cuts[i];
				}
			}
			if (!chosencut){
				chosencut = cuts[0];
			}
			if (smartimg.selectedCut.length < 1){
				smartimg.selectedCut = chosencut;
			} else 	if (chosencut[1] > smartimg.selectedCut[1]){
//				console.log("chosen cut changed!",chosencut[1],smartimg.selectedCut[1]);
				smartimg.selectedCut  = chosencut
			} else if (!chosencut){
				smartimg.selectedCut = cuts[0];
			}
//			console.log("selected cut found",smartimg.selectedCut)
			/*
				in addition to this, we need to be able to detect things like retina display.. also, I kinda wanna do a load comparison to see if it is worth checking the load times
				that way I can figure out if I need to load up a smaller image next time around... you know what, tat's really complicated, lol
				yeah scratch that. I'll do that later, right now I"m just pressed for time.
			*/
			return smartimg;// after it is all found and set to idealURL, pass the var back..
		}
	},
	event : {
		repositionCheck : function(e){
			// do we need to grab the window for anything? oh yeah, to determine the bottom..
			HDM.smartImages._vars.windowHeight = HDM.smartImages._vars.jqwindowobj.height();
			for(var i = 0; i < HDM.smartImages._vars.imglist.length; i++){
				var smartimg = HDM.smartImages._vars.imglist[i];
				var ttop = smartimg.jqobj.offset().top;
				if (smartimg.top != ttop){
					HDM.smartImages._vars.imglist[i].top = ttop;
					// hopefully this isn't too taxing...
				}
				var twidth = smartimg.jqobj.width()
				if (smartimg.width != twidth){
					// find the ideal image width
					HDM.smartImages._vars.imglist[i].width = twidth;
					if (HDM.smartImages._vars.imglist[i].imgType == "carousel"){// ok thing about the carousels, they will have to manage their own images.. hrm how the frig
						continue; // bail out for carousels
					}

					HDM.smartImages.fn.loadIt(HDM.smartImages.fn.findIdealImageSrc(HDM.smartImages._vars.imglist[i]));
				}
			}
		},
		scrollCheck : function(e){
			/*			// initially used to throttle down the scrollCheck event.. but prolly not necessary
			var timegate = true;
			if (e && (e.timeStamp > (HDM.smartImages._vars.scrollTimestamp+100))){
				console.log("DO EEET")
				timegate = false;
				HDM.smartImages._vars.scrollTimestamp = e.timeStamp;
			}
			if (timegate){
				return;
			}*/
			var scrollValue = HDM.smartImages._vars.jqwindowobj.scrollTop();
			for(var i = 0; i < HDM.smartImages._vars.imglist.length; i++){
				if (HDM.smartImages._vars.imglist[i].loaded){
					continue;
				}
				if (HDM.smartImages._vars.imglist[i].imgType == "carousel"){
					// ok thing about the carousels, they will have to manage their own images.. hrm how the frig
					continue;
				}
				var smartimg = HDM.smartImages._vars.imglist[i];
				smartimg.top = smartimg.jqobj.offset().top; // man.. I really didn't want to call this like this..
				if ((smartimg.top-(HDM.smartImages._vars.windowHeight*2)) < scrollValue){
					if (!smartimg.loaded){
						HDM.smartImages._vars.imglist[i].loaded = true;
						HDM.smartImages.fn.loadIt(smartimg);
//						console.warn("load it!",smartimg,smartimg.top,HDM.smartImages._vars.windowHeight,scrollValue,smartimg.jqobj.offset().top)
					}
				}
			}
		}
	},
	init : function(){
		HDM.smartImages._vars.devicePixelRatio = window["devicePixelRatio"] ? window["devicePixelRatio"] : 1;
		HDM.smartImages._vars.jqwindowobj = $(window);
		/*
		 scan the loaded page, look for all images
		 register all lazyloading images
		 load up initial set, then bind events to resize and scroll
		*/

		var unculledimages = $("img.smartload");
		unculledimages.each(function(index){
			var attr = this.getAttribute("hdmimg")
			if ((attr) && (attr != "carousel")){
				HDM.smartImages.fn.register(this,attr);
			}
		})
		// let's test this out..
		HDM.smartImages._vars.jqwindowobj.resize(HDM.smartImages.event.repositionCheck);
		HDM.smartImages._vars.windowHeight = HDM.smartImages._vars.jqwindowobj.height();
		for(var i = 0; i < HDM.smartImages._vars.imglist.length; i++){
				// write code here to generate idealURL
				HDM.smartImages.fn.findIdealImageSrc(HDM.smartImages._vars.imglist[i])
		}
		// bind scroll event
		$(document).scroll(HDM.smartImages.event.scrollCheck);
		// let's initiate reposition event
	}
}


/*************************************************************
 *
 * PromoPlayer
 *
 ************************************************************/


HDM.promoplayer = {
	dom : {
		frame : null,
		stage : null,
		jqMain : null,
		pagination : null,

		mainPlayer	: null,
		wrapper		: null,
		slidelist	: null,
		slides 		: []
	},
	_vars : {
		setInterval : null, // HDM.promoplayer._vars.setInterval
		counter : 0,
		deltaframe : null,
		detlaHeight: 0,
		eventDisabled : false,
		isAnimating : false,
		state : "main",
		promoDOMlist : [], // trying something out...
		promolistlength: 0,
		currentDirection: "",
		currentPagPosition : null, // HDM.promoplayer._vars.currentPagPosition
		resizeRatio: 0,
		pPlayerAd		: null,
		afterSlide		: null,
		playerWidth		: 0,
		slideInterval 	: 7000,
		slideIntevalId 	: null,
		current 		: 0,
		total 			: 0,
		slidePosition 	: null
	},
	engine : {

		events : {
			disable : function(){
				if (HDM.promoplayer._vars.eventDisabled){
					console.error("dude this is busted!",HDM.promoplayer._vars.eventDisabled);
				} else {
					HDM.promoplayer._vars.eventDisabled = true;
				}
			},
			enable : function(){
				if (!HDM.promoplayer._vars.eventDisabled){
					console.error("dude this is busted!",HDM.promoplayer._vars.eventDisabled);
				} else {
					HDM.promoplayer._vars.eventDisabled = false;
				}
			}
		}
	},
	position : {
		startx : null,
		starttimestamp : 0,
		previousx : null, // this is used to test immediate velocity
		currentx : null,
		currenttimestamp : 0,
		offsetx : 0,
		updatex : function(x,timeStamp){
			this.previousx = this.currentx;
			this.currentx = x;
			this.previoustimestamp = this.currenttimestamp;
			this.currenttimestamp = timeStamp;
		},
		initx : function(x,timeStamp){// intialization
			this.startx = x ;
			this.currentx = x;
			this.previousx = x;
			this.starttimestamp = timeStamp;
			this.currenttimestamp = timeStamp;
			this.offsetx = HDM.promoplayer._vars.slidePosition;
		},
		delta : function(){
			var delta = this.currentx-this.startx;
			//console.log("START X : " + this.startx);
			//console.log("CURRENT X : " + this.currentx);
			//console.log("PREVIOUS X : " + this.previousx);
			//console.log("OFFSET X : " + this.offsetx);
			//console.log("Delta : " + delta);
			// this is where we need to calculate the boundary limits...
			// lets assume that every image initiated always starts off in the middle frame...

			return delta;
		}
	},
	player : {

		startSlideShow: function(){

			clearInterval(HDM.promoplayer._vars.slideIntervalId);
			HDM.promoplayer._vars.slideIntervalId =
				setInterval(function(){
				HDM.promoplayer.player.slideTo('next');
				},HDM.promoplayer._vars.slideInterval);
		},

		stopSlideShow: function(){
			clearInterval(HDM.promoplayer._vars.slideIntervalId);
			//HDM.promoplayer.dom.stage.style.webkitTransition = 'all 0s linear 0s';
		},

		slideTo : function(goTo, spd){
			var speed = 600;
			if(spd){
				speed = spd;
			}
			if(goTo == null){
				return false;
			}
			$("[role='promoplayer-pagination']").children("li").removeClass("current");

			HDM.promoplayer.player.stopSlideShow();

			if (goTo == 'next') {
				HDM.promoplayer._vars.current = (HDM.promoplayer._vars.current < HDM.promoplayer._vars.total - 1) ? HDM.promoplayer._vars.current + 1 : 0;
				HDM.promoplayer._vars.slidePosition -= $("#promoplayer").width();
			} else if (goTo == 'prev') {
				HDM.promoplayer._vars.current = (HDM.promoplayer._vars.current > 0) ? HDM.promoplayer._vars.current - 1 : HDM.promoplayer._vars.total - 1;
				HDM.promoplayer._vars.slidePosition += $("#promoplayer").width();
			} else {
				//console.log("I've been passed a slide ");
				slide = parseInt(goTo);
				HDM.promoplayer._vars.current = goTo;
				HDM.promoplayer._vars.slidePosition = -($("#promoplayer").width() * (HDM.promoplayer._vars.current + 1));
			}

	
			HDM.promoplayer._vars.isAnimating = true;
			HDM.promoplayer.player.beginAnimation(HDM.promoplayer._vars.slidePosition, speed);

		},
		beginAnimation: function(distance, transitionSpeed){
			
			if ($('#ppad').length != 0 && HDM.promoplayer._vars.current == HDM.promoplayer._vars.afterSlide) {
				HDM.ads.renderAd(HDM.promoplayer._vars.pPlayerAd,$('#ppad'));
			}

			$("[role='promoplayer-pagination']").children("li").eq(HDM.promoplayer._vars.current).addClass("current");

			if (Modernizr.csstransitions) {
				//console.log("Im using CSS3 transforms");
				HDM.promoplayer.dom.stage.style.webkitTransitionDuration = transitionSpeed+'ms';
				HDM.promoplayer.dom.stage.style.MozTransitionDuration = transitionSpeed+'ms';
				HDM.promoplayer.dom.stage.style.msTransitionDuration = transitionSpeed+'ms';
				//console.log("Distance left is : " + distance);
				HDM.promoplayer.dom.stage.style.webkitTransform = 'translate3d('+distance+'px, 0px, 0)';
				HDM.promoplayer.dom.stage.style.MozTransform = 'translate('+distance+'px, 0px)';
				HDM.promoplayer.dom.stage.style.msTransform = 'translate('+distance+'px, 0px)';

				HDM.promoplayer.dom.stage.addEventListener('webkitTransitionEnd',HDM.promoplayer.endAnimation,false);
				HDM.promoplayer.dom.stage.addEventListener('transitionend',HDM.promoplayer.endAnimation,false);

			}else{
				$("#promowrapper").animate({

					left: HDM.promoplayer._vars.slidePosition

					},600,"swing",function() {
						if ($('#ppad').length != 0 && HDM.promoplayer._vars.current > HDM.promoplayer._vars.afterSlide) {
							HDM.promoplayer.util.removePplayerAd();
						}
						
						HDM.promoplayer._vars.slidePosition = -($("#promoplayer").width() * (HDM.promoplayer._vars.current + 1));
						HDM.promoplayer.position.offsetx = HDM.promoplayer._vars.slidePosition;

						$("#promowrapper").css("left",HDM.promoplayer._vars.slidePosition+'px');

						HDM.promoplayer._vars.isAnimating = false;

				});
			}

			HDM.promoplayer.player.startSlideShow();
		}
	},
	endAnimation: function(){
					
			if ($('#ppad').length != 0 && HDM.promoplayer._vars.current > HDM.promoplayer._vars.afterSlide) {
				HDM.promoplayer.util.removePplayerAd();
			}

			HDM.promoplayer._vars.slidePosition = -($("#promoplayer").width() * (HDM.promoplayer._vars.current + 1));
			HDM.promoplayer.position.offsetx = HDM.promoplayer._vars.slidePosition;

			HDM.promoplayer.dom.stage.style.webkitTransitionDuration = '0ms';
			HDM.promoplayer.dom.stage.style.webkitTransform = 'translate3d('+HDM.promoplayer._vars.slidePosition+'px, 0px, 0)';
			HDM.promoplayer.dom.stage.style.MozTransitionDuration = HDM.promoplayer.dom.stage.style.msTransitionDuration= '0ms';
			HDM.promoplayer.dom.stage.style.MozTransform = HDM.promoplayer.dom.stage.style.msTransform = 'translate('+HDM.promoplayer._vars.slidePosition+'px, 0px)';

			HDM.promoplayer._vars.isAnimating = false;
			
			HDM.promoplayer.dom.stage.removeEventListener('webkitTransitionEnd',HDM.promoplayer.endAnimation,false);
			HDM.promoplayer.dom.stage.removeEventListener('transitionend',HDM.promoplayer.endAnimation,false);
		
	},
	util : {
		removePplayerAd: function(){

			$("#promowrapper article").remove('#ppad');
			if (HDM.promoplayer._vars.current != 0) {
				HDM.promoplayer._vars.current = HDM.promoplayer._vars.current - 1;
				--HDM.promoplayer._vars.total;
				HDM.promoplayer.util.buildPagination();
			}
			$("[role='promoplayer-pagination']").children("li").removeClass("current");
			$("[role='promoplayer-pagination']").children("li").eq(HDM.promoplayer._vars.current).addClass("current");
			HDM.promoplayer.util.getFrameWidth();
			HDM.promoplayer.util.positionSlides();
		},
		positionSlides: function(){

			if(HDM.promoplayer._vars.current==0){
				HDM.promoplayer._vars.slidePosition = (-HDM.promoplayer._vars.playerWidth);
			}else{
				HDM.promoplayer._vars.slidePosition = (HDM.promoplayer._vars.current) * (-HDM.promoplayer._vars.playerWidth) + (-HDM.promoplayer._vars.playerWidth);
			}

			if(HDM.promoplayer._vars.total > 1){
				HDM.promoplayer.player.beginAnimation(HDM.promoplayer._vars.slidePosition, 0);
			}


		},
		getFrameWidth: function(){

			HDM.promoplayer._vars.playerWidth = HDM.promoplayer._vars.deltaframe = $("#promoplayer").width();
			HDM.promoplayer.position.offsetx = -HDM.promoplayer._vars.playerWidth;

			var size = $("#promowrapper").children().length;
			$("#promowrapper").width(HDM.promoplayer._vars.playerWidth*size)
			$("#scrollframe, article[promoplayer]").width(HDM.promoplayer._vars.playerWidth);

		},
		getFrameHeight : function(f){

			docObj = document.getElementById("promowrapper");

			docObj.trueheight=docObj.scrollHeight + $("ul.promopagination").height();
			if(f){
				//console.log(f + ":" + docObj.trueheight)
			}else{
				//console.log("Trueheight:" + docObj.trueheight)
			}
			$("#promoplayer").height(docObj.trueheight);

		},
		buildPagination: function(){

				$("[role='promoplayer-pagination']").empty();

				var toAppend = '';

				for(var i=0; i<= HDM.promoplayer._vars.total-1; i++){

					if(i==0){
						toAppend = '<li class="first"></li>';
					}else if(i==HDM.promoplayer._vars.total-1){
						toAppend = '<li class="last"></li>';
					}else{
						toAppend = '<li></li>';
					}
					$("[role='promoplayer-pagination']").append(toAppend);

				}

				$("[role='promoplayer-pagination']").each(function(idx){
						$(this).children("li").each(function(j){
							$(this).click(function(){
								if ($(this).not('.current')) {
									HDM.promoplayer.player.slideTo(j);
								}
							});
						});
					});

			//console.log("Just built Pagination. Current is : " + HDM.promoplayer._vars.current);
			//console.log("After Slide is : " + HDM.promoplayer._vars.afterSlide);

			$("[role='promoplayer-pagination']").children("li").eq(HDM.promoplayer._vars.current).addClass("current");

				if ($("#promowrapper .slide").eq(HDM.promoplayer._vars.afterSlide+1).is("#ppad")) {
					$("[role='promoplayer-pagination']").children("li").eq(HDM.promoplayer._vars.afterSlide).hide();
				}
				if ($('#ppad').length == 0) {
					$("[role='promoplayer-pagination']").children("li").eq(HDM.promoplayer._vars.afterSlide).show();
				}



		}
	},
	move : {
		start : function(x,timeStamp){
			// We're starting the move....let's clear the auto interval
			HDM.promoplayer.player.stopSlideShow();

			//console.log("move start!",x,timeStamp);
			HDM.promoplayer.position.initx(x,timeStamp);
			// I'm having some real problems with this stupid thing not being removed quickly enough...
			// so instead I'm just gonna fire it every time the user starts
			HDM.promoplayer.dom.stage.style.msTransitionDuration = '0ms';
			HDM.promoplayer.dom.stage.style.MozTransitionDuration = '0ms';
			HDM.promoplayer.dom.stage.style.webkitTransitionDuration = '0ms';
		},
		drag : function(x,timeStamp){
			var delta = HDM.promoplayer.position.delta()+HDM.promoplayer._vars.slidePosition; // we calculate maximum allowed delta movement, one frame at a time
			//console.log("[move.drag] "+x+" "+timeStamp,delta);
			HDM.promoplayer.position.updatex(x,timeStamp);
			HDM.promoplayer.dom.stage.style.webkitTransform = 'translate3d(' + delta + 'px, 0px, 0)';
			HDM.promoplayer.dom.stage.style.MozTransform = 'translate(' + delta + 'px, 0px)';
			HDM.promoplayer.dom.stage.style.msTransform = 'translate(' + delta + 'px, 0px)';
		},
		end : function(timeStamp){
			//console.log("Move end");
			HDM.promoplayer.isAnimating = true;
			HDM.promoplayer._vars.currentDirection = null; // this is the default current direction

			var transitionDuration = 600;
			var movedelta = HDM.promoplayer.position.delta();
			var movethreshold = movedelta;

			var flicktime = HDM.promoplayer.position.currenttimestamp-HDM.promoplayer.position.starttimestamp;
			if (Math.abs(movethreshold) > 143 ){
				if (movethreshold < 0){
					HDM.promoplayer._vars.currentDirection = "next";
				} else {
					HDM.promoplayer._vars.currentDirection = "prev";
				}
			}
			else{
					HDM.promoplayer.dom.stage.style.webkitTransitionDuration = '300ms';
					HDM.promoplayer.dom.stage.style.MozTransitionDuration = '300ms';
					HDM.promoplayer.dom.stage.style.msTransitionDuration = '300ms';
					HDM.promoplayer.dom.stage.style.webkitTransform = 'translate3d(' + (HDM.promoplayer._vars.slidePosition) + 'px, 0px, 0)';
					HDM.promoplayer.dom.stage.style.MozTransform = 'translate(' + (HDM.promoplayer._vars.slidePosition) + 'px, 0px)';
					HDM.promoplayer.dom.stage.style.msTransform = 'translate(' + (HDM.promoplayer._vars.slidePosition) + 'px, 0px)';
					HDM.promoplayer.player.startSlideShow();
				}

			if (flicktime < 500){
				var flickdistance = HDM.promoplayer.position.startx - HDM.promoplayer.position.currentx;
				var flickvelocity = Math.abs(flickdistance)/flicktime;
			//console.log("Flickvelocity: " + flickvelocity);
				if (flickvelocity > .45){
					if (flickdistance > 0){
						HDM.promoplayer._vars.currentDirection = "next";

					} else {

							HDM.promoplayer._vars.currentDirection = "prev";
					}
//					console.warn("high velocity detected! lets roll out..",HDM.promoplayer.position.delta(),HDM.promoplayer.position.offsetx,HDM.promoplayer._vars.deltaframe,flickvelocity,transitionDuration)
				}
			}

			HDM.promoplayer.player.slideTo(HDM.promoplayer._vars.currentDirection, transitionDuration);

		}
	},
	event : {
		ythreshold : null,// silly little hacky thing to make the frame sticky-like
		lockScrolling : false,
		eventCache : null,
		/*
			ok, so this sucker is related to a stupid android bug that prevents the touchmove from firing correctly..
			http://code.google.com/p/chromium/issues/detail?id=150779
			what needs to be done is that on touchstart we enable lockScrolling at touchstart..
			however, we need to make sure that a user *CAN* scroll at a certain threshold.. lets call it  25 px
		*/
		touchstart : function(e){
			HDM.promoplayer.move.start(e.touches[0].pageX,e.timeStamp);
			HDM.promoplayer.event.ythreshold = e.touches[0].pageY;
			HDM.promoplayer.event.lockScrolling = true;
		},
		touchmove : function(e){
			// ghetto user agent switching... blah
			/* so, the iPhone has different behavior with .preventDefault(), so by default I'm just gonna not have the preventDefault fire on iOS
				which is actually okay, since the problem was with the android browsers having a bug that would cancel touchmove
			*/
			var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
			if (HDM.promoplayer.event.lockScrolling && (!iOS)){
				e.preventDefault();
				HDM.promoplayer.move.drag(e.touches[0].pageX,e.timeStamp);
				if (Math.abs(HDM.promoplayer.event.ythreshold-e.touches[0].pageY) > 100){
					// making the scroll a little sticky
					HDM.promoplayer.event.lockScrolling = false;
					e.target.dispatchEvent(e); // honestly, I don't even know if this works...
				}
			} else if (iOS) {
				HDM.promoplayer.move.drag(e.touches[0].pageX,e.timeStamp);

			}
		},
		touchend : function(e){
			HDM.promoplayer.move.end(e.timeStamp);
		},
		touchcancel : function(e){
			HDM.promoplayer.move.end(e.timeStamp);
		}
	},
	click : {
		back : function(){

			if(!HDM.promoplayer._vars.isAnimating){
				HDM.promoplayer._vars.isAnimating = true;
				HDM.promoplayer.player.slideTo('prev');
			}
		},
		next : function(){
			if(!HDM.promoplayer._vars.isAnimating){
				HDM.promoplayer._vars.isAnimating = true;
				HDM.promoplayer.player.slideTo('next');
			}
		}
	},
	init: function(p,a){
		this._vars.pPlayerAd = p;
		this._vars.afterSlide = a;

		// lets grab the jquery references and store them locally...
		this.dom.frame = document.querySelector("[promoplayer=scrollframe]");
		this.dom.stage = document.querySelector("[promoplayer=scrollstage]");

		// lets bind some jq objects..
		this.dom.jqMain = $("[promoplayer='scrollstage']");

		if (this.dom.frame==null){
			return false;
		}

		this._vars.total = $("#promowrapper article[promoplayer]").length;
		console.log("Total" + this._vars.total)
		if(this._vars.total == 1){
			$("[promoplayer='button_prev']").remove();
			$("[promoplayer='button_next']").remove();
			var smartloadimages = $("#promoplayer .smartload[hdmimg]");
			smartloadimages.each(function(index){
				var smartimg = HDM.smartImages.fn.register(this,this.getAttribute("hdmimg"));
					if (smartimg){
						HDM.smartImages.fn.findIdealImageSrc(smartimg);
					}
			});
			this.util.getFrameWidth(); // store the frame width value so when the screen changes..\

		}
		
		//If we have an ad give the div a minimum 1px height to force it to stretch so that the next slide doesn't show prematurely 
		if($("#ppad").length !=0){
			$("#ppad").css('min-height',"1px");
		}

		if(this._vars.total > 1){
			var firstChild = $("article[promoplayer]:first-child").clone();
			var lastChild = $("article[promoplayer]:last-child").clone();

			this.dom.jqMain.append(firstChild);
			this.dom.jqMain.prepend(lastChild);
			
			//need to register images and find the ideal one.
			var smartloadimages = $("#promoplayer .smartload[hdmimg]");
			smartloadimages.each(function(index){
				var smartimg = HDM.smartImages.fn.register(this,this.getAttribute("hdmimg"));
					if (smartimg){
						HDM.smartImages.fn.findIdealImageSrc(smartimg);
					}
			});
			
			this.util.getFrameWidth(); // store the frame width value so when the screen changes..

			this.dom.frame.addEventListener("touchstart",HDM.promoplayer.event.touchstart,  true);
			this.dom.frame.addEventListener("touchmove",HDM.promoplayer.event.touchmove,  false);
			this.dom.frame.addEventListener("touchend",HDM.promoplayer.event.touchend,  true);
			this.dom.frame.addEventListener("touchcancel",HDM.promoplayer.event.touchcancel, true);

			$("[promoplayer='button_prev']").bind("mousedown",HDM.promoplayer.click.back)
			$("[promoplayer='button_next']").bind("mousedown",HDM.promoplayer.click.next)

			this.util.getFrameWidth();
			this.util.positionSlides();
			HDM.promoplayer.util.buildPagination();
		}else{
			
			
			this.util.getFrameWidth(); // store the frame width value so when the screen changes..
			HDM.promoplayer.util.positionSlides();
			
		}
		
		//Fix bug promo player is break on IE9 when user re-size browser
		if ($.browser.msie) {
			$(window).resize(function() {
				HDM.promoplayer.util.getFrameWidth();
				if(this.resizeTO) clearTimeout(this.resizeTO);
					this.resizeTO = setTimeout(function() {
					HDM.promoplayer.util.positionSlides();
				}, 100);
			});
		}
		else
		{
			$(window).resize(function(){
				HDM.promoplayer.util.getFrameWidth();
				HDM.promoplayer.util.positionSlides();
			});
		}
		
		$(window).focus(function(){
				//HDM.promoplayer.player.stopSlideShow();
				//HDM.promoplayer.player.startSlideShow();
		});
	}
}


/*************************************************************
 *
 * Carousel
 *
 ************************************************************/

HDM.carousel = {
	_vars : {
		carousels : {},
		targetCarousel : null
	},
	util : {
		setHeight : function(){
			var imgHeight= $(".ccul li").eq(0).find("img").height();
			$(".carouselback").css('height',imgHeight);
			$(".carouselnext").css('height',imgHeight);
		},

		getRow : function(el){
//			var b=a.getAttribute("carousel");if("row"==b)return a;for(;a.parentNode;){a=a.parentNode;if("BODY"===a.tagName)break;b=a.getAttribute("carousel");if("row"==b)return a}return null;
			// ok, so we need to traverse and find the parent node carouselcontainer first, then crawl back to find the row..

			function snagrow(el){
				return $(el).find("[carousel='row']")[0]
			}

			var trow = el.getAttribute("carousel");
			if (trow == "container"){
				return snagrow(el)
			}
			while(el.parentNode){
				el = el.parentNode;
				if (el.tagName === "BODY"){
					return null;
				};
				if (el.getAttribute("carousel") == "container"){
					return snagrow(el);
				}
			}
			return null;
		},
		getItemup : function(carouselObj){
			var fwidth = carouselObj.frameWidth;
			var iwidth = carouselObj.itemWidth;
			var itemup = Math.ceil(fwidth/iwidth);
			if ((carouselObj.itemlistJQ.length < 1)|| (!isFinite(itemup))){
				// had a problem where this was going into infinity..
				return 1;
			}
			return itemup;
		}
	},
	updatePagination : function(targetCarousel,currentPage,totalPage){
//		console.log("list out my paginations tuff here..",targetCarousel,currentPage,totalPage)
		var jqPagination = $(targetCarousel.dom).find("[carousel='pagination']");
		jqPagination.html(currentPage+" of "+totalPage);
	},
	register : function(carouselDOM){
		// create a container for the vars..
		var carouselObj = {
			dom : null,
			pagination : 0,
			position: 0,
			totalCount : 0,
			rowDOM : null,
			itemlistJQ : [],
			itemWidth : 1,// we're gonna have this be 1px wide instead of 0 for infinity reasons..
			frameWidth : $(carouselDOM).width(),
			smartImages : [],
			position : {
				startx : null,
				starttimestamp : 0,
				previousx : null, // this is used to test immediate velocity
				currentx : null,
				currenttimestamp : 0,
				offsetPerc : 0,
				currentoffsetPerc : 0,
				updatex : function(x,timeStamp){
					this.previousx = this.currentx;
					this.currentx = x;
					this.previoustimestamp = this.currenttimestamp;
					this.currenttimestamp = timeStamp;
				},
				initx : function(x,timeStamp,targetWidth,maxPXPosition,tcrowOffsetPerc,currentoffsetPerc){// intialization
					this.startx = x;
					this.currentx = x;
					this.previousx = x;
					this.starttimestamp = timeStamp;
					this.currenttimestamp = timeStamp;
					this.offsetPerc = parseInt(tcrowOffsetPerc);
					this.currentoffsetPerc = currentoffsetPerc;
					this.maxPXPosition = maxPXPosition;
					this.targetWidth = targetWidth;
				},
				delta : function(){
					var deltaPerc = (this.currentx-this.startx/*+this.offsetx*/)*100/this.targetWidth+this.offsetPerc;
					if (deltaPerc > 0){
						deltaPerc = 0;
					}
					this.currentoffsetPerc = deltaPerc;
					return deltaPerc;
				},
				maxPXPosition : 360,
				targetWidth : 360
			}

		}
		if (!carouselDOM.id){
			carouselDOM.id = "carouselID"+Date.now();
		} else if (HDM.carousel._vars.carousels[carouselDOM.id]){
			console.error("[carousel dom id already exists:"+carouselDOM.id,+"]",carouselDOM)
			carouselDOM.id = carouselDOM.id+Date.now();
		}
		carouselObj.dom = carouselDOM;
		var backbutton = $(carouselDOM).find("[carousel='back']")
		backbutton.unbind("click").click(function(){HDM.carousel.click.back(carouselDOM.id)})
		var nextbutton = $(carouselDOM).find("[carousel='next']")
		nextbutton.unbind("click").click(function(){HDM.carousel.click.next(carouselDOM.id)})

		var row = $(carouselDOM).find("[carousel='row']");
		if (row){
			carouselObj.rowDOM = row.get(0);
			var offsetxp = carouselObj.rowDOM.getAttribute("carouseloffsetXP");
			if (!offsetxp){
				carouselObj.rowDOM.setAttribute("carouseloffsetXP",0);
			}
			row.attr("carouselfor",carouselDOM.id)
			// find items.. if no items are in the row, we're not binding and instead gonna bail out early..
			var items = row.children("[carousel='item']");
			if (items.length > 1){
				// event should not be handling unless there are more than 1 element
				// add touch events to the dom element..
				var cdom = $(carouselDOM)
				cdom.unbind("touchstart").bind("touchstart",function(e){HDM.carousel.event.touchstart(e.originalEvent);})
				cdom.unbind("touchmove").bind("touchmove",function(e){HDM.carousel.event.touchmove(e.originalEvent);})
				cdom.unbind("touchend").bind("touchend",function(e){HDM.carousel.event.touchend(e.originalEvent);})
				cdom.unbind("touchcancel").bind("touchcancel",function(e){HDM.carousel.event.touchend(e.originalEvent);})

				carouselObj.itemWidth = items.width();
				carouselObj.itemlistJQ = items;
			}
			var smartimglist = row.find("[hdmimg]");


			smartimglist.each(function(index){
				var smartimg = HDM.smartImages.fn.register(this,"carousel",true)
				if (smartimg){
					HDM.smartImages.fn.findIdealImageSrc(smartimg);
					carouselObj.smartImages.push(smartimg);
				}
			})
			carouselObj.totalCount = items.length;
			// lets see how many counts there are...
		} else {
			console.error("ROW NOT FOUND!");
		}
		// and finally, lets place the object in..
		HDM.carousel._vars.carousels[carouselDOM.id] = carouselObj;
		HDM.carousel.checksmartimg(carouselObj);
		HDM.carousel.util.setHeight();
		HDM.carousel.click.back(carouselDOM.id);
	},
	event : {
		ythreshold : null,
		lockScrolling : false,
		touchstarted : false,
		resize : function(){
			// when a resize event occurs, we need to crawl thru all the carousel lists and calculate accordingly..
			clist = HDM.carousel._vars.carousels;
			for (var id in clist){
				var carouselObj = clist[id];
				carouselObj.frameWidth = $(carouselObj.dom).width();

				var rowwidth = $(carouselObj.rowDOM).find("[carousel='item']").width()
				carouselObj.itemWidth = rowwidth;
				// lets calculate how many up..
				var itemup = HDM.carousel.util.getItemup(carouselObj);
				var pagination = carouselObj.pagination;
				var newPercentage = Math.round(parseInt(pagination)*100/itemup)*-1
				carouselObj.rowDOM.style.webkitTransitionDuration = '0ms';
				carouselObj.rowDOM.style.MozTransitionDuration = '0ms';
				carouselObj.rowDOM.style.msTransitionDuration = '0';

				carouselObj.rowDOM.style.webkitTransform = 'translate3d(' + newPercentage + '%, 0px, 0)';
				carouselObj.rowDOM.style.MozTransform = 'translate(' + newPercentage + '%, 0px)';
				carouselObj.rowDOM.style.msTransform = 'translate(' + newPercentage + '%, 0px)';

				carouselObj.rowDOM.setAttribute("carouseloffsetXP",newPercentage)
				carouselObj.position.currentoffsetPerc = newPercentage;

				HDM.carousel.checksmartimg(carouselObj); // and finally check for smartimage..
			}
			HDM.carousel.util.setHeight();
		},
		touchstart : function(e){
			var rowDOM = HDM.carousel.util.getRow(e.target)
			var myid = rowDOM.getAttribute("carouselfor")
			if (HDM.carousel._vars.targetCarousel != null){ // break out because of illegal touchstart..
				return false;
			}
			var buttoncheck = e.target.getAttribute("carousel");
			if ((buttoncheck == "next") || (buttoncheck == "back")){
				return false;
			}
			HDM.carousel.event.touchstarted = true;
			HDM.carousel._vars.targetCarousel = HDM.carousel._vars.carousels[myid];

			var tcWidth = $(HDM.carousel._vars.targetCarousel.dom).width();

			var tcmaxpxposition = $(HDM.carousel._vars.targetCarousel.rowDOM).find("li:last-child").position().left;
			var tcrowOffsetPerc = HDM.carousel._vars.targetCarousel.rowDOM.getAttribute("carouseloffsetXP")
			var currentoffsetPerc = HDM.carousel._vars.targetCarousel.rowDOM.getAttribute("carouseloffsetxp");

			HDM.carousel._vars.targetCarousel.position.initx(e.touches[0].pageX,e.timeStamp,tcWidth,tcmaxpxposition,tcrowOffsetPerc,currentoffsetPerc);
			HDM.carousel.event.ythreshold = e.touches[0].pageY;
			HDM.carousel.event.lockScrolling = true;
			// make drag not affect transition, we need instant updates..
			HDM.carousel._vars.targetCarousel.rowDOM.style.webkitTransitionDuration = '0ms';
			HDM.carousel._vars.targetCarousel.rowDOM.style.MozTransitionDuration = '0ms';
			HDM.carousel._vars.targetCarousel.rowDOM.style.msTransitionDuration = '0';

		},
		touchmove : function(e){
			if (!HDM.carousel.event.touchstarted){
				return false;
			}
			// ghetto user agent switching... blah
			/* so, the iPhone has different behavior with .preventDefault(), so by default I'm just gonna not have the preventDefault fire on iOS
				which is actually okay, since the problem was with the android browsers having a bug that would cancel touchmove
			*/
			var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
			if (HDM.carousel.event.lockScrolling && (!iOS)){
				e.preventDefault();
				HDM.carousel.move.drag(e.touches[0].pageX,e.timeStamp);
				if (Math.abs(HDM.carousel.event.ythreshold-e.touches[0].pageY) > 25){
					// making the scroll a little sticky
					HDM.carousel.event.lockScrolling = false;
					e.target.dispatchEvent(e); // honestly, I don't even know if this works...
				}
			} else if (iOS) {
				HDM.carousel.move.drag(e.touches[0].pageX,e.timeStamp);

			}
		},
		touchend : function(e){
			if (!HDM.carousel.event.touchstarted){
				return false;
			}
			var ttargetCarousel = HDM.carousel._vars.targetCarousel;

			var ttposition = ttargetCarousel.position;

			var flicktime = ttposition.currenttimestamp-ttposition.starttimestamp;
			var flickdistance = ttposition.startx - ttposition.currentx;
			var flickvelocity = Math.abs(flickdistance)/flicktime; // units: pixels/milliseconds

			if (flickvelocity > .1){
				var itemup = HDM.carousel.util.getItemup(ttargetCarousel);
				if (flickdistance < 0){
					// this is the prev call
					var page = ttargetCarousel.pagination-itemup;
					if (page < 0){
						page = 0;
					}
					var scrollToit = page*100/itemup;
					HDM.carousel.move.snapTo(e,ttargetCarousel,scrollToit)
				} else {
					// this is the next call
					var page = ttargetCarousel.pagination+itemup;
					var scrollToit = page*100/itemup;
					HDM.carousel.move.snapTo(e,ttargetCarousel,scrollToit)

				}
			} else {
				HDM.carousel.move.snapTo(e,ttargetCarousel,ttargetCarousel.position.currentoffsetPerc)
			}
			// this is used to unlock the targetCarousel..
			HDM.carousel._vars.targetCarousel = null;
			HDM.carousel.event.touchstarted = false;
			HDM.carousel.event.lockScrolling = false;
		}
	},
	checksmartimg : function(carouselObj){
		/* this uses the following values..
		 * position = carouselObj.pagination
		 * not happy with the child list..
		 * smartImageslist = carouselObj.smartImages;
		 */
		var itemup = HDM.carousel.util.getItemup(carouselObj);
		var position = carouselObj.pagination;
		for (var i = 0; i < itemup*2; i++){
			var selectedPosition = i+position;
			var mysmartimg = carouselObj.smartImages[selectedPosition];
			if (mysmartimg){
				HDM.smartImages.fn.loadIt(mysmartimg,true);
			} else {
				console.warn("no images found..",carouselObj,carouselObj.smartImages, itemup)
			}
		}
	},
	move : {
		drag : function(x,timeStamp){
			var delta = HDM.carousel._vars.targetCarousel.position.delta();
			HDM.carousel._vars.targetCarousel.position.updatex(x,timeStamp);
			HDM.carousel._vars.targetCarousel.rowDOM.style.webkitTransform = 'translate3d(' + delta + '%, 0px, 0)';
			HDM.carousel._vars.targetCarousel.rowDOM.style.MozTransform = 'translate(' + delta + '%, 0px)';
			HDM.carousel._vars.targetCarousel.rowDOM.style.msTransform = 'translate(' + delta + '%, 0px)';
		},
		snapTo : function(e,targetCarousel,currentPercentage){
			// first thing we need to do is find out what slide this is closest to..
			var itemup = HDM.carousel.util.getItemup(targetCarousel);
			var endOfCarousel = targetCarousel.rowDOM.getAttribute("endOfCarousel");
			var negperc = Math.abs(currentPercentage)/(100/itemup);
			var position = Math.round(negperc);
			var newPercentage = position*100/itemup*-1;
			if (newPercentage > 0){
				// do not go below past position 0
				newPercentage = 0;
				position = 0;
			}
			var totalCount = targetCarousel.totalCount;
			var negperclimit = (-100*(totalCount)/itemup)+100;

			if (newPercentage <= negperclimit){
				// do not go any further past the totalCount;
				if(endOfCarousel == 1){
					// go back to first slide when enter end of slide
					newPercentage = 0;
					position = 0;
					targetCarousel.rowDOM.setAttribute("endOfCarousel", 0);
				}
				else{
					newPercentage = negperclimit;
					position = negperclimit*itemup/-100;
					targetCarousel.rowDOM.setAttribute("endOfCarousel", 1);
				}
			}
			targetCarousel.pagination = position;

//			console.log("currentoffsetPerc",targetCarousel.position.currentoffsetPerc);
//			console.log("newperc",newPercentage);
			targetCarousel.position.currentoffsetPerc = newPercentage; // catch the boundaries..

			targetCarousel.rowDOM.style.webkitTransitionDuration = '300ms';
			targetCarousel.rowDOM.style.MozTransitionDuration = '300ms';
			targetCarousel.rowDOM.style.msTransitionDuration = '300ms';

			targetCarousel.rowDOM.style.webkitTransform = 'translate3d(' + newPercentage + '%, 0px, 0)';
			targetCarousel.rowDOM.style.MozTransform = 'translate(' + newPercentage + '%, 0px)';
			targetCarousel.rowDOM.style.msTransform = 'translate(' + newPercentage + '%, 0px)';

			targetCarousel.rowDOM.setAttribute("carouseloffsetXP",newPercentage)

			var currentPage = Math.round(position/itemup);
			var totalPage = Math.round(totalCount/itemup);

			HDM.carousel.updatePagination(targetCarousel,currentPage+1,totalPage);
			HDM.carousel.checksmartimg(targetCarousel);
		}
	},
	click : {
		next : function(id){
			var ttc = HDM.carousel._vars.carousels[id];
			var nop = ttc.position.currentoffsetPerc-=100;
			HDM.carousel.move.snapTo(null,ttc,nop)
		},
		back : function(id){
			var ttc = HDM.carousel._vars.carousels[id];
			var nop = ttc.position.currentoffsetPerc+=100;
			if (nop > 0){
				nop = 0;
				ttc.position.currentoffsetPerc = 0;
			}
			HDM.carousel.move.snapTo(null,ttc,nop)
		}
	},
	init : function(){
		// scan for all carousel elements.. start with carousel frames..
		var carousels = $("[carousel='frame']");
		for (var i = 0; i < carousels.length; i++){
			HDM.carousel.register(carousels[i]);
		}
		HDM.carousel.util.setHeight();
		$(window).resize(HDM.carousel.event.resize);
	}
}




HDM.archive = {
	_vars : {
		jqbutton : null,
		jqwindowobj : null,
		insertBeforeDOM : null,
		windowHeight : 480,
		buttonOffsetTop : 100,
		archiveGetCache : null,
		hideElement : null

	},
	load : function(){
		alert("load")
	},
	ajax : {
		lock : false,
		get : function(){
			if (!HDM.archive.ajax.lock){
				console.warn("get once")
				HDM.archive.ajax.lock = true;
				var path = HDM.archive._vars.jqbutton.attr("hdmarchive");
				$.ajax({
					url: path,
					success : function(data){
						if(data.length > 210){
							HDM.archive._vars.archiveGetCache = data;
							if (typeof HDM.archive.ajax.callback == "function"){
								HDM.archive.ajax.callback();
								HDM.archive.ajax.callback = null;
							}
						}
						else{
							HDM.archive._vars.jqbutton.hide();
							$('span.olderPosts').hide();
						}
					}
				})


			}
		},
		callback : null
	},
	event : {
		scrollCheck : function(){
			var scrollValue = HDM.archive._vars.jqwindowobj.scrollTop();
			if((HDM.archive._vars.buttonOffsetTop-HDM.archive._vars.windowHeight) < scrollValue){
				HDM.archive.ajax.get();
			}
		},
		resize: function(){
			HDM.archive._vars.windowHeight = HDM.archive._vars.jqwindowobj.height();
			HDM.archive._vars.buttonOffsetTop = HDM.archive._vars.jqbutton.offset().top;
		},
		loadNext : function(){
			if (typeof HDM.archive._vars.archiveGetCache == "string"){

				$(HDM.archive._vars.archiveGetCache).insertBefore(HDM.archive._vars.insertBeforeDOM);

				// update the archive button..
				var path = HDM.archive._vars.jqbutton.attr("hdmarchive");
				var halfback = /\d*\/\d*$/.exec(path)[0];
				var halffront = path.split(halfback)[0]
				var querypart = halfback.split("/");

				var newpath = halffront+(parseInt(querypart[0])+parseInt(querypart[1]))+"/"+querypart[1];
				
				var querytotalcount = querypart[1]; // this is how many items that should exist..
				HDM.archive._vars.jqbutton.attr("hdmarchive",newpath);

				HDM.archive._vars.archiveGetCache = null; // dump
				HDM.archive.ajax.lock = false; // unlock the ajax call
				HDM.archive._vars.buttonOffsetTop = HDM.archive._vars.jqbutton.offset().top; // get the new button offset..

				// and finally lets load up any smartload images..
				var jqimglist = $("[role='archivearticle'] img.smartload.noimg")
				jqimglist.each(function(index){
					var attr = this.getAttribute("hdmimg")
					var smartimg = HDM.smartImages.fn.register(this,attr);
					console.log(smartimg,this,attr)
					if (smartimg){
						HDM.smartImages.fn.findIdealImageSrc(smartimg)
					}
				})
				if (parseInt(jqimglist.length) < parseInt(querytotalcount)){
					// hide the load more button!
					HDM.archive._vars.hideElement.hide();
				}
				setTimeout(HDM.smartImages.event.scrollCheck,500);
			} else {
				HDM.archive.ajax.callback = HDM.archive.event.loadNext;
				HDM.archive.ajax.get();
			}
		}
	},
	init : function(){
		// find the button and lets initialize it..
		this._vars.jqbutton = $("[role='archivebutton']").first(); // we only want the first one..

		if (this._vars.jqbutton.length < 1){
			return false;
		}

		this._vars.buttonOffsetTop = this._vars.jqbutton.offset().top;

		this._vars.insertBeforeDOM = $("[role='archiveInsertBefore']");
		
		this._vars.hideElement = $("[HDMARCHIVEHIDE]");

		this._vars.jqwindowobj = $(window);
		this._vars.jqwindowobj.resize(HDM.archive.event.resize)

		this._vars.jqbutton.click(HDM.archive.event.loadNext); // bind this event..
		HDM.archive.event.resize();

		$(document).scroll(HDM.archive.event.scrollCheck);
	}
}




/*************************************************************
 *
 * Video

        $.ajax({
            type: "GET",
            url: 'http://api.brightcove.com/services/library?command=find_playlist_by_id&playlist_id=<TMPL_IF edit_video_list><TMPL_VAR edit_video_list><TMPL_ELSE><TMPL_VAR video_list></TMPL_IF>&video_fields=id,name,thumbnailURL,length,linkURL,linkText,customFields&token=NDcs2_OfvBWZpg-RFwBqncrJhdrr4uJcYj4MAjjifiw.&page_size=4&get_item_count=true&media_delivery=http',
			dataType: "jsonp",
            crossDomain: "true",
            success: function(data){
                console.log(data)
            }
        });



 *
 ************************************************************/

HDM.video = {
	bc : {
		ivp: {
			tmpljqsource : null,
			tmplrelated : "",
			processRelated : function(json){
//				console.log("processing...",json,typeof json,json.length)
				var html = "";
				for (var i = 0; i < json.length; i++){
					json[i].index = i;
					html += HDM.util.tmpl(HDM.video.bc.ivp.tmplrelated,{video : json[i]})
				}
				HDM.video.bc.ivp.tmpljqsource.after(html);

				// after this is all set, lets make sure to recalculate this if it is a carousel..
//				console.error("recalculate if this is a carousel..");
				// we need to crawl up the parent it seems..
				var parentcarouselFrame = HDM.video.bc.ivp.tmpljqsource.closest("[carousel='frame']")[0];
				if (parentcarouselFrame){
					HDM.carousel.register(parentcarouselFrame);
					// carousel is responsible for it's own script..
				} else {
					var videosmartloadimages = HDM.video.bc.ivp.tmpljqsource.parent().find("[hdmimg]");
					videosmartloadimages.each(function(index){
	//					console.log("registering..",this)
						var smartimg = HDM.smartImages.fn.register(this,this.getAttribute("hdmimg"));
						if (smartimg){
							HDM.smartImages.fn.findIdealImageSrc(smartimg);
						}
					});
				}



			},
			relatedVideos : function(playlist,token,video_fields){
				// first lets grab the tmpls..
				HDM.video.bc.ivp.tmpljqsource = $("[HDMTMPL='ivp_relatedvideos']");
				HDM.video.bc.ivp.tmplrelated = HDM.video.bc.ivp.tmpljqsource.html();



				// build out the params..
				var params = {
					command : "find_playlist_by_id",
					playlist_id : playlist,
					video_fields : video_fields,
					token : token,
					page_size : 4,
					get_item_count : true,
					media_delivery: "http"
				}
				$.ajax({
					type: "GET",
					url: 'http://api.brightcove.com/services/library',
					data : params,
					dataType: "jsonp",
					crossDomain: "true",
					success: function(data){
						HDM.video.bc.ivp.processRelated(data.videos);
					}
				});
			}
		}
	}
}

/*************************************************************
 *
 * Contribution
 *
 *
 ************************************************************/

HDM.contribution = {
	_vars : {
		jqContOverlay : null,
		jqContContent : null,
		jqButton : null
	},
	view : {
		show : function(){
			HDM.contribution._vars.jqContOverlay.addClass("show");
			$("body").addClass("showContribution");
		},
		hide : function(){
			HDM.contribution._vars.jqContOverlay.removeClass("show");
			$("body").removeClass("showContribution");
		}
	},
	engine : {
		loadToContent : function(response){
			HDM.contribution._vars.jqContContent.empty();
			var letstrimthecontent = $(response).find("body").html();
//			console.log("************* letstrimthecontent")
//			console.log(letstrimthecontent,$(response).find("body").html());
			HDM.contribution._vars.jqContContent.append(response);
			
		},
		validate : function(form){
/*			console.log(form.querySelector("input[name=title]").value);
			console.log(form.querySelector("input[name=contributor_first_name]").value);
			console.log(form.querySelector("textarea[name=body]").value);
			console.log(form.querySelector("input[name=contributor_email]").value);
			console.log(form.querySelector("input[name=title]").value);
			console.log(form.querySelector("input[name=title]").value);
			console.dir(form);
			// only subject and comments is required
*/
			var ihazpass = true;
			var fields = {
				title : form.querySelector("input[name=title]"),
				temp_first_name : form.querySelector("input[name=temp_contributor_first_name]"),
				first_name : form.querySelector("input[name=contributor_first_name]"),
				body : form.querySelector("textarea[name=body]"),
				temp_email : form.querySelector("input[name=temp_contributor_email]"),
				email : form.querySelector("input[name=contributor_email]"),
				image : form.querySelector("input[name=file_upload]")
			}
/*			if (fields.title.value == ""){
//				fields.title.value = "[NO TITLE]";
				document.getElementById("contribute_error").innerHTML = "Please supply a title for your submission.";
				$("input[name=title]").addClass("ERROR");
				ihazpass = false;
			}*/
			if (fields.temp_first_name.value != ""){
				fields.first_name.value = fields.temp_first_name.value;
//				HDM.contribution.engine.showError("contributor_first_name","Please supply your name.");
//				ihazpass = false;
			}
			if (fields.body.value == ""){
				document.getElementById("contribute_error").innerHTML = "Please supply a comment for your submission.";
				$("textarea[name=body]").addClass("ERROR");
				ihazpass = false;
			}
			if (fields.temp_email.value != ""){
				fields.email.value = fields.temp_email.value;
			}
			if ((fields.email.value != "") && (!/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(fields.email.value))){
				HDM.contribution.engine.showError("temp_contributor_email","Please enter a valid email address.");
				ihazpass = false;
			}
			return ihazpass;
			
		},
		showError : function(inputname,msg){
			document.getElementById("contribute_error").innerHTML = msg;
			$("input[name="+inputname+"]").addClass("ERROR");
		}
	},
	action : {
		load : function(){
			$.ajax({
				type : "GET",
				url : "/contribute",
//				data : ser+"&next_url=/login",
				beforeSend: function() {},
				complete: function(e,textStatus) {},
				success : function(data){
					HDM.contribution.engine.loadToContent(data);
//					console.log("data!",data);
					HDM.contribution.view.show();
				}
			})
			
		},
		close : function(){
			HDM.contribution.view.hide();
			HDM.contribution._vars.jqContContent.empty();
		},
		submit : function(myform){
			//document.querySelector("form[name=user_contribution_form]") // also queryable like this..
//console.log("VALIDATE FORM--------------------------",HDM.contribution.engine.validate(myform));
			if (HDM.contribution.engine.validate(myform)){
				try{
/*					var titlefield = myform.querySelector("input[name=title]");
					if (titlefield.value == ""){
						titlefield.value = "[NO TITLE]"
					}*/
					var formData = new FormData(myform);
					// I know ie is not going to support xhr, so they will fallback to catch block - screw those guys

					var xhr = new XMLHttpRequest();
					// let's begin binding events..
					var progressBar = document.querySelector("[role=contribute-overlay] progress");
					xhr.open('POST', '/contribute/submitContent', true);
					xhr.onload = function(e) {
						HDM.contribution.engine.loadToContent(e.target.responseText);
						HDM.contribution._vars.jqContOverlay.removeClass("uploadInProgress");
					};
					var progressBar = document.querySelector("[role=contribute-overlay] progress");
					xhr.upload.onprogress = function(e){
						if (e.lengthComputable) {
						  progressBar.value = (e.loaded / e.total) * 100;
						  progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
						}
					}
					xhr.send(formData);
					HDM.contribution._vars.jqContOverlay.addClass("uploadInProgress");
					return false;
					
				} catch(e){
//					alert("FormData not found, lets submit oldschool")
					console.error("FORM DATA??? "+e)
//					return false;
					return true;
				}
			} else {
//				alert("validation failed!")
				return false;
			}
		}
	},
	init : function(){
		this._vars.jqContOverlay = $("[role='contribute-overlay']");
		this._vars.jqContContent = $("[contribute='content']");
		$("[contribution='loadbutton']").click(HDM.contribution.action.load);
		$(".contclose .close").click(HDM.contribution.action.close);
		
	}
}

$(document).ready(function(){
	HDM.contribution.init();
});


/*************************************************************
 *
 * Registration
 *
 *
 ************************************************************/

HDM.registration = {
	_vars : {
		mag_user : {},
		hearst_user : {},
		fbAppID : null,
		fbResponse : null,
		fbUser : null, // need to fix this..
		_event_queue : {
			loggedin : [],
			loggedout : [],
			renderLoginLinks : []
		},
		loginstate : -1, // -1 == undefined..
		processAttempt : 0,
		jqRegContent : null,
		jqRegOverlay : null
	},
	count : {
		callstomag_user : 0
	},
	ha :{
		mode : false,
		check : function(){

		}
	},
	init : function(){// lives in here because I don't know where mike may call this elsewhere. In any case, this is more legacy than anything..
		// make sure this code isn't run twice..
		try{
			if (!this._vars.initialized){
				this._vars.initialized = true;
			} else {
				throw("[HDM.registration.init] initialization already invoked: aborting")
			}
		} catch(error){
			return;
		}

		var fbAppID = $("meta[property='fb:app_id']").attr("content");
		this._vars.fbAppID = fbAppID;

		if ( !Modernizr.localstorage || !!HDM.util.getData('hdm_linkProcess') || !!HDM.util.getData('hdm_forceMagUserUpdate') || (document.location.pathname == "/login/")){
			forceMagUserUpdate = true;
		}
		this._vars.jqRegOverlay = $("[role='screen-regoverlay']");
		this._vars.jqRegContent = $("[registration='content']");
		$("[registration='close']").click(function(){HDM.registration.ui.loginOverlay.close()})

		this.boot.start(fbAppID);
	},
	process : function(){
		// now that we have all 3 states, lets begin!
		HDM.registration._vars.processAttempt++;
		if (HDM.registration._vars.processAttempt > 4){
			console.error("[HDM.registration.process] loop detected! Aborting. Setting default")
			if (!HDM.registration._vars.mag_user){
				HDM.registration._vars.mag_user = { logged_in: false,tempstatus: true };
			}
			console.warn("mag_user",window.mag_user,HDM.registration._vars.mag_user)
			console.warn("hearst_user",window.hearst_user,HDM.registration._vars.hearst_user)
			HDM.registration._vars.hearst_user = HDM.registration._vars.mag_user;

			HDM.registration._Maguser.set(HDM.registration._vars.mag_user);
			HDM.registration._Hearstuser.com.parentSet(HDM.registration._vars.hearst_user);

			//HDM.util.processQueue("queue.loggedin",HDM.registration._vars._event_queue.loggedout);
			HDM.registration.ui.renderLoginLinks();

			return false;
		}
		if (HDM.registration._vars.processAttempt == 1){
			$("[action='/registration/login'],[action='/registration/logout']").submit(function(){
				HDM.util.storeData('hdm_forceMagUserUpdate',true);
				return true;
			});
		}

		var fbLoggedin = HDM.registration._vars.fbResponse ? (HDM.registration._vars.fbResponse["status"] == "connected" ? true : false) : false
		var mLoggedin = HDM.registration._vars.mag_user["logged_in"] ? !!HDM.registration._vars.mag_user["logged_in"] : false;// !!HDM.registration._vars.mag_user["logged_in"]
		var hLoggedin = HDM.registration._vars.hearst_user["logged_in"] ? !! HDM.registration._vars.hearst_user["logged_in"] : false;// !!HDM.registration._vars.hearst_user["logged_in"]


		if (!mLoggedin && hLoggedin){
//			console.log("*** autologin",HDM.registration._vars.mag_user,HDM.registration._vars.hearst_user)
			var tdomain = "."+document.domain.replace(new RegExp(/^www\./i),"");
			tdomain = tdomain.replace(".pp","").replace(".alphapreview","").replace(".betapreview","");// sanitizing for alpha/betapreview

			console.log("my hearst_user object..",HDM.registration._vars.hearst_user)
			HDM.util.setCookieAdvanced('fSpaceSSOUserId',HDM.registration._vars.hearst_user.user_name,{"path" : "/","domain" : tdomain});
			HDM.util.setCookieAdvanced('fSpaceSSOUserEmail',HDM.registration._vars.hearst_user.email,{"path" : "/","domain" : tdomain});
			HDM.util.setCookieAdvanced('fSpaceSSOUserCheck',HDM.registration._vars.hearst_user.encString,{"path" : "/","domain" : tdomain});
			HDM.util.setCookieAdvanced('fSpaceSSOExpires',HDM.registration._vars.hearst_user.expires,{"path" : "/","domain" : tdomain});

			setTimeout(function(){ // adding timeout... because I don't really trust the browser to save the cookie settings fast enough..
				HDM.registration._Maguser.generate({logged_in: false,tempstatus: true,cookieScan : "online"},HDM.registration.process)
			},100)

			console.log("run autologin..","1["+HDM.registration._vars.mag_user["logged_in"]+"]"+hLoggedin)
			return false;
		} else if (mLoggedin && !hLoggedin){
			// lets make sure this is correct..?
			HDM.registration._Hearstuser.gethearstuser(function(_hearst_user){
				setTimeout(function(){
					if (window.hearst_user["logged_in"] == false){
						HDM.registration._Maguser.generate({logged_in: true,tempstatus: true,cookieScan : "offline"},HDM.registration.process)
					} else {
						HDM.registration.process();
					}
				},100)
			});
			return false;
			// hearst_user is NOT logged in, lets force invoke a logout..
		}
		// states should be in sync before we fire...
//		console.log("registration.process: event.fire is next[mLoggedin:"+mLoggedin+"][hLoggedin:"+hLoggedin+"]")
		HDM.registration.event.fire();

		if (fbLoggedin && mLoggedin && hLoggedin && HDM.util.getData('hdm_linkProcess')){
			HDM.registration.action.linkFB(function(){
				var $modalAnchor = $('<div id="hdmModalAnchor" />').appendTo('body').hide();
				$modalAnchor.overlay({
					target: '#accountsLinked',
					load: true
				});
				$('#accountsLinked').find('a.continue').click(function(){
					$modalAnchor.data('overlay').close();
				});
				$('#accountsLinked').find('[fblink=closetoProfile]').click(function(){
					$modalAnchor.data('overlay').close();
					HDM.registration.ui.profile.get()
				});
				HDM.registration._Fbuser.getfbUser(HDM.registration.ui.renderLoginLinks);// make sure to render loginlinks after fbUser is got
				HDM.util.eraseData('hdm_linkProcess');
			});
			return false;
		}

		HDM.registration.ui.renderLoginLinks();
		HDM.registration.ui.loginOverlay.onload();
	},
	ui : {
		submitButton : {
			processLock : false,
			lock: function(){
				HDM.registration.ui.submitButton.processLock = true;
				$('[type="submit"]', HDM.registration._vars.jqRegOverlay).each(function(i){
					// this is where we have to cache a copy of the text in as an attribute.. for each element
					var t = $(this);
					var uibackuptext = t.attr("uibackuptext");
					t.attr("uibackuptext",uibackuptext ? uibackuptext : t.text()).text('Processing...').css('cursor','wait');
				})
			},
			unlock: function(){
				HDM.registration.ui.submitButton.processLock = false;
				$('[type="submit"]', HDM.registration._vars.jqRegOverlay).each(function(i){
					// this is where we have to cache a copy of the text in as an attribute.. for each element
					var t = $(this);
					var text = t.attr("uibackuptext");
					t.text(text).css('cursor','');
				})
			}
		},

		renderLoginLinks : function(){
			this.changed = false;

			//define our various states of logged in-ness
			if (this.fbLoggedIn != HDM.registration._Fbuser.isLoggedIn()){
				this.fbLoggedIn = HDM.registration._Fbuser.isLoggedIn();
				this.changed = true;
			}
			if (this.fbConnected !=  HDM.registration._Fbuser.isConnected()){
				this.fbConnected =  HDM.registration._Fbuser.isConnected();
				this.changed = true;
			}
			if (this.fbLinked !=  HDM.registration._Fbuser.isLinked()){
				this.fbLinked =  HDM.registration._Fbuser.isLinked();
				this.changed = true;
			}
			if (this.hdmLoggedIn != HDM.registration._vars.mag_user.logged_in){
				this.hdmLoggedIn = HDM.registration._vars.mag_user.logged_in;
				this.changed = true;
			}
			if (!this.changed){
				// nothing changed, do nothing. bounce the f out
				return false;
			} else {
				// okay! time to re-render our login links
				var $newRegLink;
				var $linkContainer;// = $('#hdmLoginLinks').fadeOut().empty();
				var $editProfileLink;
				var $signinLink;
				var $signoutLink;

				$linkContainer = $('[registration="loginlinks"]');
				$linkContainer.hide().empty(); //fade the link container out

				//fb link needs to say different stuff based on logged in ness
				var fbLinkText = (this.hdmLoggedIn) ? 'Connect with Facebook' : 'Sign In with Facebook';
				var $fbLink = $('<li class="facebookSignIn"><a id="iconFB" href="#">' + fbLinkText + '</a></li>');
				$fbLink.click(HDM.registration.action.openFBLogin);

				if (this.hdmLoggedIn){
					//logged in.. we'll need a signout link
					$signoutLink = $('<li><a href="#">Sign out</a></li>'); //the sign out link
					$signoutLink.click(HDM.registration.action.logout);
					// lets figure out fb
					if (this.fbConnected){
						if (this.fbLinked){
							if ( HDM.registration._vars.fbUser != null ){
								$fbLink = $('<li><img src="https://graph.facebook.com/' + HDM.registration._vars.fbUser.id + '/picture" width="15" height="15" /> Hi <a class="trackSender" href="#">' + HDM.registration._vars.fbUser.first_name + '</a></li>');
								$fbLink.click(HDM.registration.action.openProfile);
							} else {
								$fbLink = $('<li>Hi <a href="#">' + mag_user.first_name + '</a></li>'); //new fb link with profile link
							}

						} else {
							$editProfileLink = $('<li>Hi <a>' + mag_user.first_name + '</a></li>'); //append the hdm edit profile link
							$editProfileLink.click(HDM.registration.action.openProfile);
							$linkContainer.append($editProfileLink); //append the edit profile link
							$fbLink = $('<li class="facebookSignIn"><a id="iconFB" href="#">' + fbLinkText + '</a></li>');
							$fbLink.click(function(){
								HDM.registration.action.linkFB(HDM.registration.ui.renderLoginLinks);
								return false;
							});
						}
					} else {
						//if no fb, leave the fb link as-is
						$editProfileLink = $('<li>Hi <a href="#">' + mag_user.first_name + '</a></li>'); //append the hdm edit profile link
						$editProfileLink.click(HDM.registration.action.openProfile);
						$linkContainer.append($editProfileLink); //append the edit profile link
					}
					$linkContainer.append($fbLink); //append the facebook link
					$linkContainer.append($signoutLink); //append the signout link
				} else {
					//not logged into hdm.. not much else matters
					$newRegLink = $('<li class="joinFree"><a href="#">Join Free</a></li>'); //new reg link
					$newRegLink.click(HDM.registration.action.openSignup);
					$signinLink = $('<li><a href="#">Sign In</a></li>'); //sign in link
					$signinLink.click(HDM.registration.action.openLogin);
					$linkContainer.append($newRegLink); //append the join free
					$linkContainer.append($fbLink); //append the facebook link
					$linkContainer.append($signinLink); //append the sign in link
				}
				$linkContainer.fadeIn(); //fade the container back in
				HDM.util.processQueue("event.renderLoginLinks",HDM.registration._vars._event_queue.renderLoginLinks);
			}
		},
		loginOverlay : {
			show : function(callback){
				HDM.registration._vars.jqRegOverlay.addClass("loading")
				HDM.registration._vars.jqRegContent.empty();
				if (typeof callback == "function") callback();
			},
			load : function(callback,data){
				HDM.registration._vars.jqRegOverlay.addClass("show");
				$(document.body).addClass("showRegistration")
				HDM.registration._vars.jqRegOverlay.removeClass("loading")
				FB.XFBML.parse(document.querySelector('.facebook'));
				FB.XFBML.parse(document.getElementById('registrationOverlay'));
				if (typeof callback == "function") callback();
				try{
					FB.XFBML.parse(document.getElementById('registrationOverlay'));
				} catch(e){
					// FB does not exist.. just bailing out
					console.warn("[HDM.registration.ui] FB.XFBML not found")
				}
			},
			close : function(){
				// lets also remove some cleanup data from initiateHDMSignin..
				HDM.util.eraseData('hdm_linkProcess');
				HDM.util.eraseData('hdm_wasFBLinked');

				HDM.registration._vars.jqRegOverlay.removeClass("show");
				setTimeout(function(){
					HDM.registration._vars.jqRegContent.empty();
				},500);
				$(document.body).removeClass("showRegistration")
			},
			onload : function(){
				switch (document.location.hash){
					case "#HDMaction=login" :
						HDM.registration.ui.login.get();
						break;
					case "#HDMaction=registration" :
						HDM.registration.ui.signup.get();
						break;
					case "#HDMaction=editProfile" :
						HDM.registration.ui.profile.get();
						break;
					case "#HDMaction=passwordReset" :
						HDM.registration.ui.forgetPassword.get();
						break;
						
				}
			}
		},
		login : {
			get : function(){
				HDM.registration.ui.loginOverlay.show(function(){
					// welcome back message
					if (HDM.registration._vars.mag_user.logged_in){
						HDM.registration._vars.jqRegContent.load("/login?cachebust="+Date.now()+" #loginConfirmation",HDM.registration.ui.login.load)
					} else {
						HDM.registration._vars.jqRegContent.load("/login?cachebust="+Date.now()+" #login",HDM.registration.ui.login.load)
					}
					// also do a check for offline status..
//					$.get("/login?cachebust="+Date.now(),HDM.registration.ui.login.load);
				})
			},
			load : function(data){
				HDM.registration.ui.loginOverlay.load(function(){
					$("[href='/registration/forgotPassword.html']").removeAttr("href").click(function(){HDM.registration.ui.forgetPassword.get(); return false;});
					$("#hdmLoginForm").submit(HDM.registration.ui.login.submit);
					$('#hdmLoginForm [href="\/login\/"]').click(function(){
						HDM.registration.ui.login.get();
						return false;
					});
					$('#hdmLoginForm [href="\/registration\/"]').click(function(){
						HDM.registration.ui.signup.get();
						return false;
					})
				},data);
			},
			submit : function(e){	
				HDM.registration._vars.jqRegOverlay.addClass("loading")
				var ser = $(this).serialize();
				
				
				HDM.util.buildScriptTag("/registration/login?next_url=/registration/get_mag_user.js&"+ser,function(script){
//					console.error(window["mag_user"]);
					script.parentNode.removeChild(script);
					// my god this is ghetto.. :-(
					if (window["mag_user"]["logged_in"] == 1){
						HDM.registration._vars.hearst_user = window["mag_user"];
						HDM.registration._vars.mag_user = window["mag_user"];
						HDM.registration._Hearstuser.com.parentSet(window["mag_user"]);
						HDM.registration._Maguser.set(window["mag_user"]);
						HDM.registration.process();// use process instead of rednerLoginLinks
						
						HDM.registration._vars.jqRegContent.load("/login?cachebust="+Date.now()+" #loginConfirmation",HDM.registration.ui.login.load)
					} else {
						if (JSON.stringify(window.hearst_user) == '{"initial_login":1}'){
							// ok see this little beaut here? This is the result of the servers' static file
							window.hearst_user = { initial_login: 1, logged_in: false,tempstatus: true,cookieScan : "offline"};
						}
						HDM.registration._vars.hearst_user = window.hearst_user;
						HDM.registration._vars.mag_user = window.hearst_user;
						HDM.registration._Hearstuser.com.parentSet(window.hearst_user);
						HDM.registration._Maguser.set(window.hearst_user);
						HDM.registration.process();// use process instead of rednerLoginLinks
// okay, so this process totally doesn't work..
//						HDM.registration._vars.jqRegContent.load("/registration/login?next_url=/login?cachebust="+Date.now()+"&"+ser+" #login",HDM.registration.ui.login.load)
/* see this here? it's a bad budget hack.. just so I can get login working on iphone */
						HDM.registration._vars.jqRegContent.load("/login?ur_login_failed=Login%20Failed #login",HDM.registration.ui.login.load)
					}
				});
				
				return false;
				var url = "/registration/login";
				// see this stuff? This is a botched call, gonna keep it around because DAYAM
				$.ajax({
					type : "POST",
					url : url,
					data : ser+"&next_url=/login",
					beforeSend: function() {
					// show indicator
					},
					complete: function(e,textStatus) {
						// okay, if I'm here, I can trust that login 'worked'.. lets proceed once more..
						if (textStatus == "error"){
							if (navigator.appName == "Microsoft Internet Explorer"){// ie can blow me
								// we make sure to keep a reset flag in mag_user to ensure a forced load next around, toss in a tempstatus:true flag in json mag_user
								window["mag_user"] = { logged_in: false,tempstatus: true }; //set the temp mag_user to the stored mag_user, or a logged_out version of it
								HDM.registration._Maguser.set(window.mag_user,function(){
//									alert("enable ie to simply use the form to submit.. but lets set next_url to be document.location.href");
									$("#hdmLoginForm").unbind("submit").attr("action","/registration/login").attr("onsubmit","return true;").append("<input type='hidden' name='next_url' value="+document.location.href+">").submit();
								});
								return false;
							}
							var url = "/registration/login?"+ser+"&next_url=http://"+HDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/registration/get_hearst_user.js?cachebust="+Date.now();
							HDM.util.buildScriptTag(url,function(script){
								if (JSON.stringify(window.hearst_user) == '{"initial_login":1}'){
									// ok see this little beaut here? This is the result of the servers' static file
									window.hearst_user = { initial_login: 1, logged_in: false,tempstatus: true,cookieScan : "offline"};
								}
								HDM.registration._vars.hearst_user = window.hearst_user;
								HDM.registration._vars.mag_user = window.hearst_user;
								HDM.registration._Hearstuser.com.parentSet(window.hearst_user);
								HDM.registration._Maguser.set(window.hearst_user);

								HDM.registration.process()//HDM.registration.ui.renderLoginLinks(); // process used instead of renderLoginLinks because process doe some behind the scenes stuff

								script.parentNode.removeChild(script);
								HDM.registration.ui.login.get();
								HDM.registration._vars.jqRegOverlay.removeClass("loading")
//								window.setTimeout(function(){HDM.registration.ui.login.close()},2000)
							});
						} else if (textStatus == "success"){
							var data = e.responseText;
							var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
							// lifted straight from jQuery.fn.load
							HDM.registration._vars.jqRegContent.html(jQuery("<div>").append(data.replace(rscript,"")).find("#login"));
							HDM.registration.ui.login.load(data);
						}
					},
					success : function(data){}
				})
				return false; // make sure this is here..
			},
			close : function(){HDM.registration.ui.loginOverlay.close();}
		},
		signup : {
			get : function(){
				HDM.registration.ui.loginOverlay.show(function(){
					HDM.registration._vars.jqRegContent.load("/registration/ #registration",HDM.registration.ui.signup.load) //$.get("/registration/",HDM.registration.ui.signup.load);
				})
			},
			load : function(data){
				HDM.registration.ui.loginOverlay.load(function(){
					HDM.registration.ui.profile.dohousekeeping();
					$("#hdmRegistrationForm").submit(HDM.registration.ui.signup.submit);
					$('#hdmRegistrationForm [href="\/login\/"]').click(function(){
						HDM.registration.ui.login.get();
						return false;
					});
				},data);
			},
			submit : function(e){
				HDM.registration._vars.jqRegOverlay.addClass("loading")
				var ser = $(this).serialize();
				var url = "/registration/save_registration";
//				console.warn("YO WHERE AM I",e,ser,url)
				$.ajax({
					url : url,
					data : ser+"&next_url=/registration/",
					beforeSend: function() {
					// show indicator
//						HDM.registration._vars.jqRegContent.html("loading..");
					},
					complete : function(e,textStatus){
						if (textStatus == "error"){
							var url = "/registration/login?"+ser+"&next_url=http://"+HDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/registration/get_hearst_user.js?cachebust="+Date.now();
							HDM.util.buildScriptTag(url,function(script){
								if (JSON.stringify(window.hearst_user) == '{"initial_login":1}'){
									// ok see this little beaut here? This is the result of the servers' static file
									window.hearst_user = { initial_login: 1, logged_in: false,tempstatus: true,cookieScan : "offline"};
								}
								HDM.registration._vars.hearst_user = window.hearst_user;
								HDM.registration._vars.mag_user = window.hearst_user;
								HDM.registration._Hearstuser.com.parentSet(window.hearst_user);
								HDM.registration._Maguser.set(window.hearst_user);
								HDM.registration.process();// use process instead of rednerLoginLinks
//								HDM.registration.ui.renderLoginLinks();
								script.parentNode.removeChild(script);
								HDM.registration.ui.signup.confirm();
							});


						} else  if (textStatus == "success"){
							var data = e.responseText;
							var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
							// lifted straight from jQuery.fn.load
							HDM.registration._vars.jqRegContent.html(jQuery("<div>").append(data.replace(rscript,"")).find("#registration"));
							HDM.registration.ui.signup.load(data);
							var listoparams = ser.split("&");
							for (var i = 0; i < listoparams.length; i++){
								var param = listoparams[i].split("=");
//								console.log("dumping",param[0],unescape(param[1]))
								$("[name="+param[0]+"]").val(unescape(param[1]));
							}

						}
						console.log("*****, complete..",e,textStatus);
						location.hash = "";
						location.hash = "#registerationOverlay";
					},
					success : function(data){}
				});
				return false;
			},
			confirm : function(){
				HDM.registration._vars.jqRegContent.load("/registration/confirmation.html #save_success",function(){
					HDM.registration.ui.renderLoginLinks();
				});
				

			},
			close : function(){HDM.registration.ui.loginOverlay.close();}
		},
		forgetPassword : {
			get : function(){
				HDM.registration.ui.loginOverlay.show(function(){
					HDM.registration._vars.jqRegContent.load("/registration/forgotPassword.html #forgotPassword",HDM.registration.ui.forgetPassword.load)
				})
			},
			load : function(data){
				HDM.registration.ui.loginOverlay.load(function(){
					$("#hdmForgotPassword").submit(HDM.registration.ui.forgetPassword.request);
					$('#hdmForgotPassword [href="\/login\/"]').click(function(){
						HDM.registration.ui.login.get();
						return false;
					})
				},data);
			},
			request : function(e){
				if (HDM.registration.ui.submitButton.processLock == true){
					return false;
				} // in order to prevent second request				
				
				HDM.registration._vars.jqRegOverlay.addClass("loading")
				var ser = $(this).serialize();
				var url = "/registration/resetPassword";
				var email = $("#hdmForgotPassword [name='email']").val();
				if (email == ""){
					HDM.registration.ui.forgetPassword.confirm(1);
					return false;
				}
				HDM.registration.ui.submitButton.lock();
				// lets first check if email exists..
				function mycallback(exists){
					if (exists){
						$.ajax({
							type : "POST",
							url : url,
							data : ser,
							beforeSend: function() {
							// show indicator
							},
							complete: function(e,textStatus) {
								// okay, if I'm here, I can trust that login 'worked'.. lets proceed once more..
								if (textStatus == "error"){
								} else if (textStatus == "success"){
								}
								HDM.registration.ui.forgetPassword.confirm(2);
								HDM.registration.ui.submitButton.unlock();
								console.log("ajax done!",e,textStatus);
							},
							success : function(data){
								HDM.registration.ui.forgetPassword.confirm(1);
							}
						});
					} else {
						HDM.registration.ui.forgetPassword.confirm(1);
						HDM.registration.ui.submitButton.unlock();
					}
				}
				HDM.registration._Fbuser.checkEmailExists(email,mycallback);
				
				return false;
			},
			confirm : function(state){
				HDM.registration._vars.jqRegOverlay.removeClass("loading");
				if (state == 1){ // email is missing, lets show error
					$("#forgotPassword .error").show().html("Your email address was not found in our records")
				}
				if (state == 2){
					$("#forgotPasswordInit,#forgotPassword .error, #hdmForgotPassword button, #hdmForgotPassword p label").hide()
					$("#forgotPasswordConfirm").show();
					$('#hdmLoginForm [href="\/login\/"]').click(function(){
						HDM.registration.ui.login.get();
						return false;
					})
				}
			},
			close : function(){HDM.registration.ui.loginOverlay.close();}
		},
		profile : {
			get : function(){
				HDM.registration.ui.loginOverlay.show(function(){
					HDM.registration._vars.jqRegContent.load("/registration/editProfile.html #editProfile",HDM.registration.ui.profile.load)				
				})
			},
			load : function(data){
				HDM.registration.ui.loginOverlay.load(function(){
					HDM.registration.ui.profile.dohousekeeping();
					$("#hdmEditProfileForm").submit(HDM.registration.ui.profile.submit);
				},data);
				
				if (typeof mag_user.facebook_id !== 'undefined'){
					$(".fbLinkButton").toggleClass('inactive');
				}
				else{
					$(".fbUnLinkButton").toggleClass('inactive');
				}
			},
			dohousekeeping : function(){
				//render 100 years back and set the users year if found
				//this should only run on pages with the dob_year select box on them
				$('select[name=dob_year]').each(function(){
					var currentYear = (new Date()).getFullYear(),
						startYear = currentYear - 100,
						$select = $(this), selectedYear = $select.attr('data-selectedyear'),
						$option = $('<option />'), $optionClone;

					for (var i = currentYear; i >= startYear; i--){
						$optionClone = $option.clone();
						$optionClone.val(i);
						$optionClone.text(i);
						if (!!selectedYear && selectedYear == i){
							$optionClone.attr('selected','selected');
						}
						$select.append($optionClone);
					}
				});
				//set the user's month if found
				$('select[name=dob_month]').each(function(){
					var $select = $(this), selectedMonth = $select.attr('data-selectedmonth'),
						$options = $select.find('option'), $selectedOption;
					if (!!selectedMonth){
						$selectedOption = $options.filter('[value='+ selectedMonth + ']');
						$select.get(0).selectedIndex = $options.index($selectedOption);
					}
				});
				//set the user's dob day if found
				$('select[name=dob_day]').each(function(){
					var $select = $(this), selectedDay = $select.attr('data-selectedday'),
						$options = $select.find('option'), $selectedOption;
					if (!!selectedDay){
						$selectedOption = $options.filter('[value=' + selectedDay + ']');
						$select.get(0).selectedIndex = $options.index($selectedOption);
					}
				});
				//we need to do some basic validation on the login and reg forms and set the cookie so we get an updated mag_user on next load
				$('#hdmLoginForm, #hdmEditProfileForm, #hdmRegistrationForm, #hdmConnectLogin, #quizLogin').submit(function(){
					var $this     = $(this)
						, $required = $this.find('[required]')
						, $error    = $this.find('.formError')
						, valid     = true;
					//validation
					switch ( this.id ){
						case 'hdmLoginForm':
							$required.each(function(i, val){
								if ( !val.value ){
									valid = false;
									$(val).addClass('error');
								} else {
									$(val).removeClass('error');
								}
							});
							if ( !valid ){
								$error.text('Please fill in all required fields.');
								$error.fadeIn( 200 );
							} else {
								$error.fadeOut( 200 );
							}
						default:
							break;
					}
					if ( valid ){ HDM.util.storeData('hdm_forceMagUserUpdate',true); }
					return valid;
				});
				// lets bind the link and unlink buttons for facebook..
				
				
				var showLinked = function(islinked){
					console.log("SHOWLINKED",islinked);
					if (islinked){
						$(".fbLinkButton").hide().addClass('inactive');
						$(".fbUnLinkButton").show().removeClass('inactive');
					} else {
						$(".fbUnLinkButton").hide().addClass('inactive');
						$(".fbLinkButton").show().removeClass('inactive');
					}
				}
				
				$(".fbUnLinkButton").click(function(){
					HDM.registration.action.unlinkFB(function(){
						showLinked(false)
					});
				})
				$(".fbLinkButton").click(function(){
					FB.getLoginStatus(function(response){
						if (response.status != "connected"){
							FB.login(function(response){
								HDM.registration._Fbuser.processLogin(response);
								if (response.status != "connected"){
									showLinked(false);
								} else {
									showLinked(true);
								}
							},{scope:'email'});
						} else {
							HDM.registration.action.linkFB(function(){
								showLinked(true);
							});
						}
					})
				})
				if (HDM.registration._vars.mag_user["facebook_id"]){
						showLinked(true);
				} else {
						showLinked(false);
				}
			},	
			submit : function(e){
				HDM.registration._vars.jqRegOverlay.addClass("loading")
				var ser = $(this).serialize();
				var url = "/registration/saveProfile";
				$.ajax({
					type : "POST",
					url : url,
					data : ser,
					beforeSend: function() {
					// show indicator
					},
					complete: function(e,textStatus) {
						// okay, if I'm here, I can trust that login 'worked'.. lets proceed once more..
						if (textStatus == "error"){
							HDM.registration._vars.jqRegContent.load("/registration/confirmation.html #profile_success")
						} else if (textStatus == "success"){
						}
						console.log("ajax done!",e,textStatus)
					},
					success : function(data){
						HDM.registration._vars.jqRegContent.html(data);
						HDM.registration.ui.profile.load(data);
						location.hash = "#registerationOverlay";
					}
				});
				return false;
			},
			close : function(){HDM.registration.ui.loginOverlay.close();}
		}

	},
	action : {
		logout : function(){
			// before we do anything, lets think about this for a sec.. how should we invoke a soft logout event...
			HDM.registration._Hearstuser.com.parentSet({},function(){
				HDM.registration._Maguser.generate({logged_in: true,tempstatus: true,cookieScan : "offline"},function(){
					if (window.location.href.match('/registration/')){
						// any locations to /registration get an autologout
						window.location.href = '/';
					} else {
						HDM.registration.ui.renderLoginLinks();
						HDM.registration.event.fire()
					}
				});
			});
		},
		linkFB : function(callback){
			//links fb accounts
			if (typeof callback !== 'function'){
				callback = function(){};
			}
			//don't need to pass params.. it reads acocunt info from the session cookies
			$.ajax({
				url: '/registration/FbLink',
				dataType: 'json',
				success: function(data){ //we should get back a valid mag_user with facebook_id set
					HDM.registration._Maguser.set(data); // also has callback.. (window.mag_user,callback);
					HDM.util.storeData('hdm_wasFBLinked',true); //store the "wasLinked" value for future checks
					callback(data); //execute the callback
				}
			});
		},
		unlinkFB : function(callback){
			if (typeof callback !== 'function'){
				callback = function(){};
			}
			//hit FbLink with delete=1.. will read account info from the session cookie
			$.ajax({
				url: '/registration/FbLink',
				data: { 'delete': 1 },
				dataType: 'json',
				success: function(data){
					//this doesn't return a mag_user, so we have to delete facebook_id on our own
					var magUser = HDM.registration._vars.mag_user; //get a pointer to mag_user
//					console.log("MAGUSER UNLINKED::",window.mag_user,HDM.registration._vars.mag_user,data)
					delete magUser.facebook_id; //delete the facebook_id
					HDM.util.eraseData('hdm_wasFBLinked'); //erase the "wasLinked" value so future checks know we're not linked anymore
					HDM.registration._Maguser.set(data); //update mag_user with the new object minus the facebook_id
					callback(); //execute the callback.. don't really need to pass mag_user back for anything
				}
			});
		},
		openFBLogin : function(){
			FB.login(function(response){
				// no need to bind a callback, the event handler does it for us now..
				if (HDM.registration._vars.fbResponse.status == "connected"){
					// ok user is logged in, lets process it..
					HDM.registration._Fbuser.processLogin(response);
				} else {
					// otherwise, we let the auth.statuschance event handler do the rest..
				}
			},{scope:'email'});

		},
		openLogin : function(){
			// if there are any other screens open, close em..
			HDM.registration.ui.login.get()
		},
		openSignup : function(){
			// check if user exists..
			if (HDM.registration._vars.hearst_user.logged_in == 1){
				// user is logged in, we're not supposed to run this..
				console.error("signup - user is logged in, will not load")
			} else {
				HDM.registration.ui.signup.get();
			}
		},
		openProfile : function(){
			// check if user exists..
			if (HDM.registration._vars.hearst_user.logged_in == 1){
				// user is logged in, lets open it up..
				HDM.registration.ui.profile.get();
			} else {
				console.error("editProfile - user is not logged in, will not load")
			}

		},
		forgotPassword : function(){
			// check if user exists..
			if (HDM.registration._vars.hearst_user.logged_in == 1){
				// user is logged in, we're not supposed to run this..
				console.error("forgotPassword - user is logged in, will not load")
			} else {
				alert("call for forgot password!")
			}
		}
	},
	_Maguser : {
		init : function(callback){
			function fastScanCookies(c){
				var c = c + "=",
					d = document.cookie.split(";"),
					b;
				for (b = 0; b < d.length; b++) {
					for (var a = d[b];
					" " === a.charAt(0);) a = a.substring(1, a.length);
					if (0 === a.indexOf(c)) return !0
				}
				return !1
			};
			if (fastScanCookies("password")&&fastScanCookies("cgi-session-id")&&fastScanCookies("fSpaceSSOUserCheck")){
//				console.log("[HDM.registration._Maguser.init] cookiescan determines user is ONLINE")
				var _mag_user = HDM.util.getJSON("mag_user");
				if (_mag_user["logged_in"] != 1){
					// cookie data does not match storage data! grabbing a fresh copy..
					HDM.registration._Maguser.generate(_mag_user,callback);
				} else {
					HDM.registration._Maguser.set(_mag_user,callback)
				}
			} else {
//				console.log("[HDM.registration._Maguser.init] cookiescan determines user is OFFLINE")
				this.set({ logged_in: false,tempstatus: true,cookieScan : "offline"});// setting mag_user offline no exceptions
				// this is where we also need to check if hearst_user is available...
				if (typeof callback == "function"){callback();};
			}
		},
		generate : function(_mag_user,callback){
			console.error("generate calledback",_mag_user)
			// okay, lets check if _mag_user is whack..
			function isEmpty(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}; // simple check to see if obj is empty
			if (isEmpty(_mag_user)){// meaning nothing was found.. lets build out an offline object and store it
				window["mag_user"] = { logged_in: false,tempstatus: true }; //set the temp mag_user to the stored mag_user, or a logged_out version of it
				HDM.registration._Maguser.set(window.mag_user,callback);
			} else if ((_mag_user.cookieScan == "offline") && (_mag_user.logged_in)){
//				console.warn("[_Maguser.generate] expensive logout call made to get_mag_user.js")
				var url = "/registration/logout?next_url=/registration/get_mag_user.js?cachebust="+Date.now();
				HDM.util.buildScriptTag(url,function(){
					HDM.registration._Maguser.set(window.mag_user,callback);
				});
			} else {// object is just incorrect.. lets re-get_mag_user.js it!
				HDM.registration.count.callstomag_user++; // just counting..
//				console.warn("[_Maguser.generate] expensive call made to get_mag_user.js")
				var url;
				if (!_mag_user.logged_in && (_mag_user.cookieScan == "online")){
					url = "/registration/login?next_url=/registration/get_mag_user.js?cachebust="+Date.now();
				} else {
					url = "/registration/get_mag_user.js?cachebust="+Date.now();
				}
				HDM.util.buildScriptTag(url,function(){
//					console.log("is empty",isEmpty(window["mag_user"]),window["mag_user"],callback)
					if (isEmpty(window["mag_user"])){// meaning nothing was found.. lets build out an offline object and store it
//						console.log("mag_user is empty",window["mag_user"]);
//						console.log("hearst_user",window["hearst_user"])
						window["mag_user"] = { logged_in: false,tempstatus: true }; //set the temp mag_user to the stored mag_user, or a logged_out version of it
					}
//					console.warn("YOOO CHECK ME")
//					console.log(window.mag_user)
					HDM.registration._Maguser.set(window.mag_user,callback);
				});
			}
		},
		set : function(_mag_user,callback){
			HDM.util.storeData("mag_user",_mag_user);// storing it in the browser
			HDM.registration._vars.mag_user = _mag_user; // grabbing a local reference for fast access
			window["mag_user"] = _mag_user;
			if (typeof callback == "function"){callback();};
		}
	},
	_Hearstuser : {
		bootCallback : null,
		previewHost : function(){
			if (window.location.host.match('alphapreview')){
				return "alphapreview.";
			} else if (window.location.host.match('betapreview')){
				return "betapreview.";
			} else {
				return "";
			}
		},
		init : function(callback){
			if (document.body == null){
				// LOL SO GHETTO, but I'm pressed for time
				/* okay so this needs an explanation
				 * sometimes this is invoked before the page finishes loading
				 * largely depends on _where_ in the html this is being called from
				 * some sites have this script in the header
				 * most of them in the footer
				 * if in the header, it usually just barfed
				 * but at least with this we can 'try again'
				 */
				setTimeout(function(){
					HDM.registration._Hearstuser.init(callback);
				},50)
				return false
			}
			try{
				/******************************************
				 * Why in a try catch block?
				 * Because fudge IE 7/8. Fudge its problems. Fudge the king.
				 *
				 *
				 */
				this.bootCallback = callback;

				HDM.registration._Hearstuser.tunnel.address = "http://"+HDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/cm/shared/hdm-lib_hearstuser_proxy.min.html"; // this is the address used for the proxy;
				HDM.registration._Hearstuser.tunnel.address = "http://"+HDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/cm/shared/hdm-lib_hearstuser_proxy.html"; // this is the address used for the proxy;
				//alert(new RegExp("^https?://[^/]+/").exec(HDM.registration._Hearstuser.tunnel.address)[0]);
				HDM.registration._Hearstuser.tunnel.origin = "http://"+HDM.registration._Hearstuser.previewHost()+"services.hearstmags.com"; // I wanna like, use a regexp but later on

				// build out iframe, begin tunneling info and get hearst_user via localstorage/cookie/jsfile
				window.addEventListener("message",HDM.registration._Hearstuser.tunnel.receive,false)
				HDM.registration._Hearstuser.tunnel.iframe = document.createElement('iframe')

				HDM.registration._Hearstuser.tunnel.iframe.style.position = "fixed";
				HDM.registration._Hearstuser.tunnel.iframe.style.top = "-50px";
				HDM.registration._Hearstuser.tunnel.iframe.style.left = "-50000px";
				HDM.registration._Hearstuser.tunnel.iframe.style.height = "1px";
				HDM.registration._Hearstuser.tunnel.iframe.style.width = "1px";
				HDM.registration._Hearstuser.tunnel.iframe.style.border = "none";
				HDM.registration._Hearstuser.tunnel.iframe.style.zIndex = "-1";
				HDM.registration._Hearstuser.tunnel.iframe.style['float'] = "left"; // closure compiler disallows certain keywords, so we gotta quote them
				HDM.registration._Hearstuser.tunnel.iframe.style.opacity = "0";


				document.body.appendChild(HDM.registration._Hearstuser.tunnel.iframe);
				HDM.registration._Hearstuser.tunnel.iframe.onload = function(){
					HDM.registration._Hearstuser.com.init(false);
				}
				HDM.registration._Hearstuser.tunnel.iframe.src = HDM.registration._Hearstuser.tunnel.address;


			} catch(e){
				// my plan for this is to fall back and treat this like mag_user..
				function fastScanCookies(c){
				var c = c + "=",
					d = document.cookie.split(";"),
					b;
				for (b = 0; b < d.length; b++) {
					for (var a = d[b];
					" " === a.charAt(0);) a = a.substring(1, a.length);
					if (0 === a.indexOf(c)) return !0
				}
				return !1
			};
				if (fastScanCookies("password")&&fastScanCookies("cgi-session-id")&&fastScanCookies("fSpaceSSOUserCheck")){
//					console.log("[HDM.registration._Hearstuser.init] cookiescan determines user is ONLINE")
					var _hearst_user = HDM.util.getJSON("mag_user");
					if (_hearst_user["logged_in"] != 1){
						// cookie data does not match storage data! grabbing a fresh copy..
						HDM.registration._Maguser.generate(_hearst_user,function(){
							window["hearst_user"] = window["mag_user"];
							HDM.registration._vars.hearst_user = window["mag_user"];
							if (typeof callback == "function"){callback();};
						});
					} else {
						window["hearst_user"] = _hearst_user;
						HDM.registration._vars.hearst_user = _hearst_user;
						if (typeof callback == "function"){callback();};
					}
				} else {
//					console.log("[HDM.registration._Hearstuser.init] cookiescan determines user is OFFLINE")
					HDM.registration._Maguser.set({ logged_in: false,tempstatus: true,cookieScan : "offline"});// setting mag_user offline no exceptions
					HDM.registration._vars.hearst_user = HDM.registration._vars.mag_user;
					window["hearst_user"] = HDM.registration._vars.mag_user;
					// this is where we also need to check if hearst_user is available...
					if (typeof callback == "function"){callback();};
				}

				// lets override that logout button..
				HDM.registration.action.logout = function(){
					HDM.registration._Maguser.generate({logged_in: true,tempstatus: true,cookieScan : "offline"},function(){
						HDM.registration._vars.hearst_user = HDM.registration._vars.mag_user;
						window["hearst_user"] = HDM.registration._vars.mag_user;
						if (window.location.href.match('/registration/')){
							// any locations to /registration get an autologout
							window.location.href = '/';
						} else {
							HDM.registration.ui.renderLoginLinks();
							HDM.registration.event.fire()
						}
					});
				}


			}
		},
		synchronize : function(){
			// console.log("[HDM.registration._Hearstuser.synchronize] begin syncprocess, sending syn")
			this.com.init(true);
		},
		attemptLogin : function(callback){
			var l = document.location;
			var url = l.protocol+"//"+l.host+"/registration/login?next_url=http://"+HDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/registration/get_hearst_user.js"
			if (navigator.appName == "Microsoft Internet Explorer"){
				window.location = "/registration/login?next_url="+document.location.href;
			} else {
				HDM.util.buildScriptTag(url,function(){
//					console.warn("[_Hearstuser] expensive login requested hearst_user",window.hearst_user);
					HDM.registration._vars.hearst_user = window.hearst_user;
					HDM.registration._Hearstuser.com.parentSet(window.hearst_user);
					if (typeof callback == "function"){callback();};
				});
			}
		},
		gethearstuser : function(callback){
			var url = "http://"+HDM.registration._Hearstuser.previewHost()+"services.hearstmags.com/registration/get_hearst_user.js?cachebust="+Date.now();
			HDM.util.buildScriptTag(url,function(){
				if (JSON.stringify(window.hearst_user) == '{"initial_login":1}'){
					// ok see this little beaut here? This is the result of the servers' static file
					window.hearst_user = { initial_login: 1, logged_in: false,tempstatus: true,cookieScan : "offline"};
				}
				HDM.registration._vars.hearst_user = window.hearst_user;
				HDM.registration._Hearstuser.com.parentSet(window.hearst_user);
				if (typeof callback == "function"){callback(window.hearst_user);};
			});

		},
		com : {
			init : function(forced){
				var forceUpdate = forced || !!HDM.util.getData('hdm_forceMagUserUpdate');
				HDM.util.eraseData('hdm_forceMagUserUpdate');
				HDM.registration._Hearstuser.tunnel.send({
					command : "initialize",
					force : forceUpdate
				});
			},
			parentSet : function(_hearst_user,callback){
				// time for ghetto check for empty obj
				function isEmpty(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}; // simple check to see if obj is empty
				if (isEmpty(_hearst_user)){// meaning nothing was found.. lets build out an offline object and store it
					_hearst_user = { logged_in: false,tempstatus: true,cookieScan : "offline"};
				}
				window["hearst_user"] = _hearst_user;
				HDM.registration._vars.hearst_user = _hearst_user;
				HDM.registration._Hearstuser.tunnel.send({
					command : "parentSet",
					hearst_user : _hearst_user
				});
				if (typeof callback == "function"){callback();};
			},
			tearDown : function(){
				// tear this entry down
				HDM.registration._Hearstuser.tunnel.send({
					command : "delete"
				});
			}
		},
		tunnel : {
			iframe : null,
			address : null, // this is the address used for the proxy
			origin : null, // damn, I'm feeling lazy so here we go
			send : function(message){
				if (typeof message == "object"){
					message = JSON.stringify(message);
				}
				HDM.registration._Hearstuser.tunnel.iframe.contentWindow.postMessage(message,HDM.registration._Hearstuser.tunnel.origin)
			},
			receive : function(e){
				//console.warn("[HDM.registration._Hearstuser.tunnel.receive] received!",msg)
				if ((e.origin == HDM.registration._Hearstuser.tunnel.origin) && (e.source == HDM.registration._Hearstuser.tunnel.iframe.contentWindow)){
					//console.error("HDM.registration.hearst_user.messageReceived! LOOKS LEGIT",e,e.data)
					var msg = JSON.parse(e.data);
					if (msg.command == "save"){
						//console.log("Lets save hearst_user",(msg.hearst_user == HDM.registration._vars.mag_user))
						HDM.registration._vars.hearst_user = msg.hearst_user;
						HDM.registration.boot._vars.hearst_isReady = true;
					} else if (msg.command == "parentget"){
						HDM.registration._Hearstuser.gethearstuser(function(){
							HDM.registration.boot._vars.hearst_isReady = true;
						})
					} else if (msg.command == "ack"){
//						console.log("ack received!");
					} else {
//						console.error("[HDM.registration._Hearstuser.tunnel.receive] unrecognized command",msg)
					}
				}
			}
		}
	},
	_Fbuser : {
		init : function(callback){
			HDM.util.buildScriptTag('//connect.facebook.net/en_US/all.js',function(){
				//init the facebook api..
				FB.init({
					appId: HDM.registration._vars.fbAppID, //pass in the Site object's app id
					status: true, //we want status
					cookie: true, //we want fb to set cookies
					xfbml: true, //we want to parse xfbml
					channelUrl : document.location.protocol+"//"+document.location.host+"/cm/shared/channel.html" //this helps with issues in IE where we're getting hits from ?xd_fragment= or whatever it is
				});
				FB.getLoginStatus(function(response){
					HDM.registration._vars.fbResponse = response;
					if (response.status == "connected"){
						HDM.registration._Fbuser.getfbUser(callback); // make sure not to execute it, but to pass it along..
					} else {
						FB.Event.subscribe('auth.statusChange',function(response){
							HDM.registration._vars.fbResponse = response;
							HDM.registration._Fbuser.processLogin(response);
						})
						// lets bind a status change event
						if (typeof callback == "function"){callback();};
					}
				});

				$(document).ready(function(){
					//set up the link/unlink button on the profile form
					// eek, kinda messy but whatever works..
					$('fieldset#facebookConnect').each(function linkUnlink(){
						// mike is a big fan of self... and I don't feel like refactoring all this.. so I'll just be lazy
						var self = HDM.registration._Fbuser

						var $this = $(this), $status = $('#editProfileFBStatus'),
							$button = $this.find('.linkButton'),
							statusText = '', buttonText = '';
						//set the appropriate button based on whether we're linked or not
						if ( self.isLinked() ){
							$status.addClass('linked').text('linked');
							$button.addClass('linked').text('unlink');
						} else {
							$status.addClass('unlinked').text('unlinked');
							$button.addClass('unlinked').text('link');
						}
						$button.click(function(){
							//when the button is clicked, check for existing link
							if ( self.isLinked() ){
								//if we're linked, unlink and switch the button
								HDM.registration.action.unlinkFB(function(){
									HDM.registration.ui.renderLoginLinks();
									$status.removeClass('linked').addClass('unlinked').text('unlinked');
									$button.removeClass('linked').addClass('unlinked').text('link');
								});
							} else {
								//if we're not linked, link and switch the button
								HDM.registration.action.linkFB(function(){
									HDM.registration.ui.renderLoginLinks();
									$status.removeClass('unlinked').addClass('linked').text('linked');
									$button.removeClass('unlinked').addClass('linked').text('unlink');
								});
							}
							return false;
						});
					});
				})
			});

		},
		getfbUser : function(callback){
			FB.api('/me',function(response){
				HDM.registration._vars.fbUser = response;
				if (typeof callback == "function"){callback();};
			});
		},
		queryFBLinkisEmpty : function(callback){
			if (typeof callback !== 'function'){callback = function(){};}
			$.ajax({
				url: '/registration/FbLink',
				dataType: 'json',
				success: function(data){
					function isEmpty(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}; // simple check to see if obj is empty
					callback(isEmpty(data));
				}
			});

		},
		checkEmailExists : function(emailToCheck,callback){
			if (typeof callback !== 'function'){callback = function(){};}
			$.ajax({
				url: '/registration/email_exist',
				data: { email: emailToCheck },
				success: function(response){
					var exists = (response !== 'Does not exist');
					callback(exists);
				}
			});
		},
		createLinkedAccount: function(email,callback){ //creates a linked account given the email address associated with the user's facebook account
			if (typeof callback !== 'function'){
				callback = function(){};
			}
			//hit FbLink with the email address.. we should get a valid mag_user back
			$.ajax({
				url: '/registration/FbLink',
				data: { email: email },
				dataType: 'json',
				success: function(data){
					HDM.registration._Maguser.set(data); //update the mag_users
					HDM.util.storeData('hdm_wasFBLinked',true); //store the "wasLinked" value for future checks
					HDM.registration._Hearstuser.attemptLogin(function(){
						HDM.registration.ui.renderLoginLinks();
						HDM.registration.event.fire();
					});
				}
			});
		},
		isLoggedIn : function(){
			return (HDM.registration._vars.fbResponse) ? HDM.registration._vars.fbResponse.status !== "unknown" : false;
		},
		isConnected : function(){
			return (HDM.registration._vars.fbResponse) ? HDM.registration._vars.fbResponse.status === "connected" : false;
		},
		isLinked : function(){
			return !!HDM.registration._vars.mag_user.facebook_id;
		},
		initiateHDMSignin : function(){
			var proceedWithLink = HDM.util.getData('hdm_linkProcess');
			var wasLinked = HDM.util.getData('hdm_wasFBLinked'),
			$exists, $thanks, $accountsLinked, modalAPI, $modalAnchor = $('<div id="hdmModalAnchor" />').appendTo('body').hide();
			HDM.registration._Fbuser.getfbUser(function(){
				// once we have the info...
				var info = HDM.registration._vars.fbUser; //set a local pointer to it
				HDM.registration._Fbuser.checkEmailExists(HDM.registration._vars.fbUser.email,function(exists){
					if (exists){//if it exists, pop the existing account modal
						HDM.util.storeData('hdm_linkProcess',true);
						if ( proceedWithLink ){
							$accountsLinked = $('#accountsLinked');
							$(document.body).addClass("showFbLink");

							HDM.registration.action.linkFB(function(){
								$modalAnchor.overlay({
									target: '#accountsLinked',
									load: true
								});
								modalAPI = $modalAnchor.data('overlay');
								$accountsLinked.find('a.continue,[fblink=close]').click(function(){
									modalAPI.close();
									$(document.body).removeClass("showFbLink");
								});
								HDM.registration.ui.renderLoginLinks();
								HDM.util.eraseData('hdm_linkProcess');
							});
							return;
						}
						$exists = $('#connectEmailExists');
						$exists.find('.hdmFacebookPic').html('<img src="https://graph.facebook.com/' + info.id + '/picture" width="50" height="50" />');
						$exists.find('.welcome').text('Welcome, ' + info.first_name);
						$exists.find('input[name=user_name]').val(info.email);
						$exists.find('form').submit(function(){
							var $error = $(this).find('.loginError');
							if ( ! $(this).find('[name=user_name]').val() || !$(this).find('[name=password]').val() ){
								$error.text('Please fill out your username and password');
								return false;
							} else {
								HDM.util.storeData('hdm_linkProcess',true);
								return true;
							}
						});
						$modalAnchor.overlay({
							target: '#connectEmailExists',
							load: true,
							closeOnEsc: false,
							closeOnClick: false
						});
						modalAPI = $modalAnchor.data('overlay');
						$exists.find('.cancelLink,[fblink=close]').click(function(){
							modalAPI.close();
							$(document.body).removeClass("showFbLink");
							HDM.util.eraseData('hdm_linkProcess');
						});
						$exists.find('[fblink=forgotpassword]').click(function(){
							modalAPI.close();
							$(document.body).removeClass("showFbLink");
							HDM.registration.ui.forgetPassword.get();
						})
						$("#hdmConnectLogin").append("<input type='hidden' name='next_url' value='"+(( window.location.href.match('/registration/') ) ? '/' : window.location.href)+"'>");

					} else {//if the email doesn't exist in the db, lets create an HDM account
						HDM.registration._Fbuser.createLinkedAccount(info.email,function(){
							HDM.registration.ui.renderLoginLinks();
							$(document.body).addClass("showFbLink")
							$thanks = $('#thanksForJoining');
							$modalAnchor.overlay({
								target: '#thanksForJoining',
								load: true,
								closeOnClick: false
							});
							modalAPI = $modalAnchor.data('overlay');
							$thanks.find('a.continue,[fblink=close]').click(function(){
								modalAPI.close();
								$(document.body).removeClass("showFbLink");
							});
						});

					}
				});
			});
		},
		processLoginTimestamp : Date.now(),
		processLogin : function(response){//
			if ((Date.now()-this.processLoginTimestamp)<200){
//				console.error("[processLogin] revoking calls made too soon")
				return false;
			}//console.log("[processLogin] timeStamp:",this.processLoginTimestamp,Date.now()-this.processLoginTimestamp)
			this.processLoginTimestamp = Date.now();

			var oldResponse = HDM.registration._vars.fbResponse;
			var newResponse = response;
			//console.log("(( FB.login ))",oldResponse,newResponse)
			function fastScanCookies(c){
					var c = c + "=",
						d = document.cookie.split(";"),
						b;
					for (b = 0; b < d.length; b++) {
						for (var a = d[b];
						" " === a.charAt(0);) a = a.substring(1, a.length);
						if (0 === a.indexOf(c)) return !0
					}
					return !1
				};
			if ((newResponse.status == "connected") && fastScanCookies("password")&&fastScanCookies("cgi-session-id")&&fastScanCookies("fSpaceSSOUserCheck")){
				
				// user is logged in, and connecting...
				HDM.registration.action.linkFB(function(newmag_user){
//					console.log("linked mag_user",newmag_user,HDM.registration._vars.mag_user,window["mag_user"])
					HDM.registration._Hearstuser.attemptLogin(function(){
						HDM.registration.ui.renderLoginLinks();
						HDM.registration.event.fire();
						// also popup thank you event
						$(document.body).addClass("showFbLink");
						var $linked = $('#accountsLinked'), modalAPI,
							$modalAnchor = $('<div id="modalAnchor" />').appendTo('body').hide();
								$modalAnchor.overlay({
								target: '#accountsLinked',
								load: true,
								closeOnClick: false
							});
							modalAPI = $modalAnchor.data('overlay');
//							$linked.click(function(){
//								modalAPI.close();
//							});
						$('#accountsLinked').find('a.continue').click(function(){
							$modalAnchor.data('overlay').close();
							$(document.body).removeClass("showFbLink");
						});
						$('#accountsLinked').find('[fblink=closetoProfile], [fblink=close]').click(function(){
							$modalAnchor.data('overlay').close();
							$(document.body).removeClass("showFbLink");
							HDM.registration.ui.profile.get();
						});
					});
				});
			} else if (newResponse.status == "connected"){
				// but NOT logged in... that's when we take action
				HDM.registration._Fbuser.queryFBLinkisEmpty(function(FBLinkisEmpty){
					// if FBLink returns empty, that means we begin the initiate signin process
					if (FBLinkisEmpty){
//						console.log("initiateHDMSignin")
						HDM.registration._Fbuser.initiateHDMSignin();
					} else {
						// otherwise we are logged in, set cookies and be on our way.
						// rebooting the registration process...
//						console.log("[processLogin] attemptLogin");
						HDM.registration._Hearstuser.attemptLogin(HDM.registration.process);
					};
				})
			}
		}
	},
	boot : {
		_vars : {
			started : false,
			intervalID : null,
			mag_isReady : false, // boot._vars.mag_isReady = true
			hearst_isReady : false,
			fb_isReady : false,
			counter : 0,
			loopstartdate : 0
		},
		start : function(fbAppID){
			// build code here to get mag_user
			HDM.registration._Maguser.init(function(){HDM.registration.boot._vars.mag_isReady = true});

			// build code here to get hearst_user
			HDM.registration._Hearstuser.init(function(){HDM.registration.boot._vars.hearst_isReady = true});

			// build code here to get fb user
			if (fbAppID){
				HDM.registration._vars.fbAppID = fbAppID;
				HDM.registration._Fbuser.init(function(){HDM.registration.boot._vars.fb_isReady = true});
			} else {
				HDM.registration.boot._vars.fb_isReady = true
			}
			// begin loop..
			HDM.registration.boot._vars.loopstartdate = Date.now();
			this._vars.intervalID = window.setInterval(HDM.registration.boot.scan,250);
		},
		scan : function(){
			// wanna know why I have to do this?
			// it's because 2 of the calls have to be made async
			// fb needs to initialize via facebook's own fancypants code
			// worse is that hearst_user is needed via an iframe, used to tunnel messages
			// 4x a second isn't so bad tho..
			if (HDM.registration.boot._vars.mag_isReady && HDM.registration.boot._vars.hearst_isReady && HDM.registration.boot._vars.fb_isReady){
				window.clearInterval(HDM.registration.boot._vars.intervalID);
				HDM.registration.process();
			}
			if ((HDM.registration.boot._vars.loopstartdate+5000) < Date.now()){
				window.clearInterval(HDM.registration.boot._vars.intervalID);
				HDM.registration.process();
			}
			HDM.registration.boot._vars.counter++;
			if (HDM.registration.boot._vars.counter++ > 40){
			}
		}
	},
	event : {
		_vars : {
			fireInterval : null
		},
		renderLoginLinks : function(func){
			/************************************
			 * Event hooks to enable callbacks on renderLoginLInks
			 * 
			 * HDM.registration.event.renderLoginLinks(function(){alert("hello world!")});
			 ************************************/
			if (typeof func == "function"){
				HDM.registration._vars._event_queue.renderLoginLinks.push(func);
			} else {
				console.log("[event.renderLoginLinks] invalid function callback:"+(typeof func),func)
			}
		},
		loggedin : function(func){
			if (typeof func == "function"){
				HDM.registration._vars._event_queue.loggedin.push(func);
			} else {
				console.log("[event.loggedin] invalid function callback:"+(typeof func),func)
			}
		},
		loggedout : function(func){
			if (typeof func == "function"){
				HDM.registration._vars._event_queue.loggedout.push(func);
			} else {
				console.log("[event.loggedin] invalid function callback:"+(typeof func),func)
			}
		},
		sure : {
			loggedin : function(){
				if (HDM.registration._vars._event_queue.loggedin.length > 0){
					window.clearInterval(HDM.registration.event._vars.fireInterval);
					HDM.util.processQueue("queue.loggedin",HDM.registration._vars._event_queue.loggedin);
				}
			},
			loggedout : function(){
				if (HDM.registration._vars._event_queue.loggedout.length > 0){
					window.clearInterval(HDM.registration.event._vars.fireInterval);
					HDM.util.processQueue("queue.loggedin",HDM.registration._vars._event_queue.loggedout);
				}
			}
		},
		fire : function(){
			var mLoggedin = !!HDM.registration._vars.mag_user["logged_in"]
			var hLoggedin = !!HDM.registration._vars.hearst_user["logged_in"]
			if (mLoggedin && hLoggedin){//console.error("[event.fire] user is logged IN!")
				HDM.registration.event._vars.fireInterval = setInterval(HDM.registration.event.sure.loggedin,250);
			} else if (!mLoggedin && !hLoggedin){//console.error("[event.fire] user is logged OUT!")
				HDM.registration.event._vars.fireInterval = setInterval(HDM.registration.event.sure.loggedout,250);
			} else {
				console.error("[HDM.registration.event] login state out of sync",mLoggedin,hLoggedin)
			}
		}
	}
};








































































$(document).ready(function(){
//	HDM.promoplayer.init();
	HDM.menu.init();
	HDM.search.init();
	HDM.footer.init();
	HDM.widgets.init();
	HDM.article.init();
	HDM.smartImages.init();
	HDM.carousel.init();
	HDM.registration.init();
	HDM.archive.init();
	HDM.ads.init(); //initialize ads with the pageAdsParams and refresh interval




window.scrollTo(0, 1);
// mobile sniffer then scroll to hide browser nav
/mobi/i.test(navigator.userAgent) && !location.hash && setTimeout(function () {
  if (!pageYOffset) window.scrollTo(0, 1);
}, 1000);
})

