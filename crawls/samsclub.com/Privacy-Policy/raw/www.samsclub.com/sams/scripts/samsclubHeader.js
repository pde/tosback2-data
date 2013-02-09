/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);
/*! jQuery UI - v1.9.1 - 2012-10-25
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js, jquery.ui.menu.js, jquery.ui.progressbar.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.slider.js, jquery.ui.sortable.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js
* Copyright (c) 2012 jQuery Foundation and other contributors Licensed MIT */

(function(e,t){function i(t,n){var r,i,o,u=t.nodeName.toLowerCase();return"area"===u?(r=t.parentNode,i=r.name,!t.href||!i||r.nodeName.toLowerCase()!=="map"?!1:(o=e("img[usemap=#"+i+"]")[0],!!o&&s(o))):(/input|select|textarea|button|object/.test(u)?!t.disabled:"a"===u?t.href||n:n)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().andSelf().filter(function(){return e.css(this,"visibility")==="hidden"}).length}var n=0,r=/^ui-id-\d+$/;e.ui=e.ui||{};if(e.ui.version)return;e.extend(e.ui,{version:"1.9.1",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({_focus:e.fn.focus,focus:function(t,n){return typeof t=="number"?this.each(function(){var r=this;setTimeout(function(){e(r).focus(),n&&n.call(r)},t)}):this._focus.apply(this,arguments)},scrollParent:function(){var t;return e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?t=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):t=this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(n){if(n!==t)return this.css("zIndex",n);if(this.length){var r=e(this[0]),i,s;while(r.length&&r[0]!==document){i=r.css("position");if(i==="absolute"||i==="relative"||i==="fixed"){s=parseInt(r.css("zIndex"),10);if(!isNaN(s)&&s!==0)return s}r=r.parent()}}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++n)})},removeUniqueId:function(){return this.each(function(){r.test(this.id)&&e(this).removeAttr("id")})}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(n,r){function u(t,n,r,s){return e.each(i,function(){n-=parseFloat(e.css(t,"padding"+this))||0,r&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var i=r==="Width"?["Left","Right"]:["Top","Bottom"],s=r.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+r]=function(n){return n===t?o["inner"+r].call(this):this.each(function(){e(this).css(s,u(this,n)+"px")})},e.fn["outer"+r]=function(t,n){return typeof t!="number"?o["outer"+r].call(this,t):this.each(function(){e(this).css(s,u(this,t,!0,n)+"px")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,r){return!!e.data(t,r[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),r=isNaN(n);return(r||n>=0)&&i(t,!r)}}),e(function(){var t=document.body,n=t.appendChild(n=document.createElement("div"));n.offsetHeight,e.extend(n.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),e.support.minHeight=n.offsetHeight===100,e.support.selectstart="onselectstart"in n,t.removeChild(n).style.display="none"}),function(){var t=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[];e.ui.ie=t.length?!0:!1,e.ui.ie6=parseFloat(t[1],10)===6}(),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,n,r){var i,s=e.ui[t].prototype;for(i in r)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([n,r[i]])},call:function(e,t,n){var r,i=e.plugins[t];if(!i||!e.element[0].parentNode||e.element[0].parentNode.nodeType===11)return;for(r=0;r<i.length;r++)e.options[i[r][0]]&&i[r][1].apply(e.element,n)}},contains:e.contains,hasScroll:function(t,n){if(e(t).css("overflow")==="hidden")return!1;var r=n&&n==="left"?"scrollLeft":"scrollTop",i=!1;return t[r]>0?!0:(t[r]=1,i=t[r]>0,t[r]=0,i)},isOverAxis:function(e,t,n){return e>t&&e<t+n},isOver:function(t,n,r,i,s,o){return e.ui.isOverAxis(t,r,s)&&e.ui.isOverAxis(n,i,o)}})})(jQuery);(function(e,t){var n=0,r=Array.prototype.slice,i=e.cleanData;e.cleanData=function(t){for(var n=0,r;(r=t[n])!=null;n++)try{e(r).triggerHandler("remove")}catch(s){}i(t)},e.widget=function(t,n,r){var i,s,o,u,a=t.split(".")[0];t=t.split(".")[1],i=a+"-"+t,r||(r=n,n=e.Widget),e.expr[":"][i.toLowerCase()]=function(t){return!!e.data(t,i)},e[a]=e[a]||{},s=e[a][t],o=e[a][t]=function(e,t){if(!this._createWidget)return new o(e,t);arguments.length&&this._createWidget(e,t)},e.extend(o,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),u=new n,u.options=e.widget.extend({},u.options),e.each(r,function(t,i){e.isFunction(i)&&(r[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},r=function(e){return n.prototype[t].apply(this,e)};return function(){var t=this._super,n=this._superApply,s;return this._super=e,this._superApply=r,s=i.apply(this,arguments),this._super=t,this._superApply=n,s}}())}),o.prototype=e.widget.extend(u,{widgetEventPrefix:u.widgetEventPrefix||t},r,{constructor:o,namespace:a,widgetName:t,widgetBaseClass:i,widgetFullName:i}),s?(e.each(s._childConstructors,function(t,n){var r=n.prototype;e.widget(r.namespace+"."+r.widgetName,o,n._proto)}),delete s._childConstructors):n._childConstructors.push(o),e.widget.bridge(t,o)},e.widget.extend=function(n){var i=r.call(arguments,1),s=0,o=i.length,u,a;for(;s<o;s++)for(u in i[s])a=i[s][u],i[s].hasOwnProperty(u)&&a!==t&&(e.isPlainObject(a)?n[u]=e.isPlainObject(n[u])?e.widget.extend({},n[u],a):e.widget.extend({},a):n[u]=a);return n},e.widget.bridge=function(n,i){var s=i.prototype.widgetFullName;e.fn[n]=function(o){var u=typeof o=="string",a=r.call(arguments,1),f=this;return o=!u&&a.length?e.widget.extend.apply(null,[o].concat(a)):o,u?this.each(function(){var r,i=e.data(this,s);if(!i)return e.error("cannot call methods on "+n+" prior to initialization; "+"attempted to call method '"+o+"'");if(!e.isFunction(i[o])||o.charAt(0)==="_")return e.error("no such method '"+o+"' for "+n+" widget instance");r=i[o].apply(i,a);if(r!==i&&r!==t)return f=r&&r.jquery?f.pushStack(r.get()):r,!1}):this.each(function(){var t=e.data(this,s);t?t.option(o||{})._init():new i(o,this)}),f}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,r){r=e(r||this.defaultElement||this)[0],this.element=e(r),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),r!==this&&(e.data(r,this.widgetName,this),e.data(r,this.widgetFullName,this),this._on(this.element,{remove:function(e){e.target===r&&this.destroy()}}),this.document=e(r.style?r.ownerDocument:r.document||r),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,r){var i=n,s,o,u;if(arguments.length===0)return e.widget.extend({},this.options);if(typeof n=="string"){i={},s=n.split("."),n=s.shift();if(s.length){o=i[n]=e.widget.extend({},this.options[n]);for(u=0;u<s.length-1;u++)o[s[u]]=o[s[u]]||{},o=o[s[u]];n=s.pop();if(r===t)return o[n]===t?null:o[n];o[n]=r}else{if(r===t)return this.options[n]===t?null:this.options[n];i[n]=r}}return this._setOptions(i),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,e==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(t,n){var r,i=this;n?(t=r=e(t),this.bindings=this.bindings.add(t)):(n=t,t=this.element,r=this.widget()),e.each(n,function(n,s){function o(){if(i.options.disabled===!0||e(this).hasClass("ui-state-disabled"))return;return(typeof s=="string"?i[s]:s).apply(i,arguments)}typeof s!="string"&&(o.guid=s.guid=s.guid||o.guid||e.guid++);var u=n.match(/^(\w+)\s*(.*)$/),a=u[1]+i.eventNamespace,f=u[2];f?r.delegate(f,a,o):t.bind(a,o)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return(typeof e=="string"?r[e]:e).apply(r,arguments)}var r=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,r){var i,s,o=this.options[t];r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent;if(s)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.apply(this.element[0],[n].concat(r))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(r,i,s){typeof i=="string"&&(i={effect:i});var o,u=i?i===!0||typeof i=="number"?n:i.effect||n:t;i=i||{},typeof i=="number"&&(i={duration:i}),o=!e.isEmptyObject(i),i.complete=s,i.delay&&r.delay(i.delay),o&&e.effects&&(e.effects.effect[u]||e.uiBackCompat!==!1&&e.effects[u])?r[t](i):u!==t&&r[u]?r[u](i.duration,i.easing,s):r.queue(function(n){e(this)[t](),s&&s.call(r[0]),n()})}}),e.uiBackCompat!==!1&&(e.Widget.prototype._getCreateOptions=function(){return e.metadata&&e.metadata.get(this.element[0])[this.widgetName]})})(jQuery);(function(e,t){var n=!1;e(document).mouseup(function(e){n=!1}),e.widget("ui.mouse",{version:"1.9.1",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(n){if(!0===e.data(n.target,t.widgetName+".preventClickEvent"))return e.removeData(n.target,t.widgetName+".preventClickEvent"),n.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(n)return;this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var r=this,i=t.which===1,s=typeof this.options.cancel=="string"&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;if(!i||s||!this._mouseCapture(t))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){r.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)){this._mouseStarted=this._mouseStart(t)!==!1;if(!this._mouseStarted)return t.preventDefault(),!0}return!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return r._mouseMove(e)},this._mouseUpDelegate=function(e){return r._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),n=!0,!0},_mouseMove:function(t){return!e.ui.ie||document.documentMode>=9||!!t.button?this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted):this._mouseUp(t)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(e){return this.mouseDelayMet},_mouseStart:function(e){},_mouseDrag:function(e){},_mouseStop:function(e){},_mouseCapture:function(e){return!0}})})(jQuery);(function(e,t){function h(e,t,n){return[parseInt(e[0],10)*(l.test(e[0])?t/100:1),parseInt(e[1],10)*(l.test(e[1])?n/100:1)]}function p(t,n){return parseInt(e.css(t,n),10)||0}e.ui=e.ui||{};var n,r=Math.max,i=Math.abs,s=Math.round,o=/left|center|right/,u=/top|center|bottom/,a=/[\+\-]\d+%?/,f=/^\w+/,l=/%$/,c=e.fn.position;e.position={scrollbarWidth:function(){if(n!==t)return n;var r,i,s=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return e("body").append(s),r=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,r===i&&(i=s[0].clientWidth),s.remove(),n=r-i},getScrollInfo:function(t){var n=t.isWindow?"":t.element.css("overflow-x"),r=t.isWindow?"":t.element.css("overflow-y"),i=n==="scroll"||n==="auto"&&t.width<t.element[0].scrollWidth,s=r==="scroll"||r==="auto"&&t.height<t.element[0].scrollHeight;return{width:i?e.position.scrollbarWidth():0,height:s?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var n=e(t||window),r=e.isWindow(n[0]);return{element:n,isWindow:r,offset:n.offset()||{left:0,top:0},scrollLeft:n.scrollLeft(),scrollTop:n.scrollTop(),width:r?n.width():n.outerWidth(),height:r?n.height():n.outerHeight()}}},e.fn.position=function(t){if(!t||!t.of)return c.apply(this,arguments);t=e.extend({},t);var n,l,d,v,m,g=e(t.of),y=e.position.getWithinInfo(t.within),b=e.position.getScrollInfo(y),w=g[0],E=(t.collision||"flip").split(" "),S={};return w.nodeType===9?(l=g.width(),d=g.height(),v={top:0,left:0}):e.isWindow(w)?(l=g.width(),d=g.height(),v={top:g.scrollTop(),left:g.scrollLeft()}):w.preventDefault?(t.at="left top",l=d=0,v={top:w.pageY,left:w.pageX}):(l=g.outerWidth(),d=g.outerHeight(),v=g.offset()),m=e.extend({},v),e.each(["my","at"],function(){var e=(t[this]||"").split(" "),n,r;e.length===1&&(e=o.test(e[0])?e.concat(["center"]):u.test(e[0])?["center"].concat(e):["center","center"]),e[0]=o.test(e[0])?e[0]:"center",e[1]=u.test(e[1])?e[1]:"center",n=a.exec(e[0]),r=a.exec(e[1]),S[this]=[n?n[0]:0,r?r[0]:0],t[this]=[f.exec(e[0])[0],f.exec(e[1])[0]]}),E.length===1&&(E[1]=E[0]),t.at[0]==="right"?m.left+=l:t.at[0]==="center"&&(m.left+=l/2),t.at[1]==="bottom"?m.top+=d:t.at[1]==="center"&&(m.top+=d/2),n=h(S.at,l,d),m.left+=n[0],m.top+=n[1],this.each(function(){var o,u,a=e(this),f=a.outerWidth(),c=a.outerHeight(),w=p(this,"marginLeft"),x=p(this,"marginTop"),T=f+w+p(this,"marginRight")+b.width,N=c+x+p(this,"marginBottom")+b.height,C=e.extend({},m),k=h(S.my,a.outerWidth(),a.outerHeight());t.my[0]==="right"?C.left-=f:t.my[0]==="center"&&(C.left-=f/2),t.my[1]==="bottom"?C.top-=c:t.my[1]==="center"&&(C.top-=c/2),C.left+=k[0],C.top+=k[1],e.support.offsetFractions||(C.left=s(C.left),C.top=s(C.top)),o={marginLeft:w,marginTop:x},e.each(["left","top"],function(r,i){e.ui.position[E[r]]&&e.ui.position[E[r]][i](C,{targetWidth:l,targetHeight:d,elemWidth:f,elemHeight:c,collisionPosition:o,collisionWidth:T,collisionHeight:N,offset:[n[0]+k[0],n[1]+k[1]],my:t.my,at:t.at,within:y,elem:a})}),e.fn.bgiframe&&a.bgiframe(),t.using&&(u=function(e){var n=v.left-C.left,s=n+l-f,o=v.top-C.top,u=o+d-c,h={target:{element:g,left:v.left,top:v.top,width:l,height:d},element:{element:a,left:C.left,top:C.top,width:f,height:c},horizontal:s<0?"left":n>0?"right":"center",vertical:u<0?"top":o>0?"bottom":"middle"};l<f&&i(n+s)<l&&(h.horizontal="center"),d<c&&i(o+u)<d&&(h.vertical="middle"),r(i(n),i(s))>r(i(o),i(u))?h.important="horizontal":h.important="vertical",t.using.call(this,e,h)}),a.offset(e.extend(C,{using:u}))})},e.ui.position={fit:{left:function(e,t){var n=t.within,i=n.isWindow?n.scrollLeft:n.offset.left,s=n.width,o=e.left-t.collisionPosition.marginLeft,u=i-o,a=o+t.collisionWidth-s-i,f;t.collisionWidth>s?u>0&&a<=0?(f=e.left+u+t.collisionWidth-s-i,e.left+=u-f):a>0&&u<=0?e.left=i:u>a?e.left=i+s-t.collisionWidth:e.left=i:u>0?e.left+=u:a>0?e.left-=a:e.left=r(e.left-o,e.left)},top:function(e,t){var n=t.within,i=n.isWindow?n.scrollTop:n.offset.top,s=t.within.height,o=e.top-t.collisionPosition.marginTop,u=i-o,a=o+t.collisionHeight-s-i,f;t.collisionHeight>s?u>0&&a<=0?(f=e.top+u+t.collisionHeight-s-i,e.top+=u-f):a>0&&u<=0?e.top=i:u>a?e.top=i+s-t.collisionHeight:e.top=i:u>0?e.top+=u:a>0?e.top-=a:e.top=r(e.top-o,e.top)}},flip:{left:function(e,t){var n=t.within,r=n.offset.left+n.scrollLeft,s=n.width,o=n.isWindow?n.scrollLeft:n.offset.left,u=e.left-t.collisionPosition.marginLeft,a=u-o,f=u+t.collisionWidth-s-o,l=t.my[0]==="left"?-t.elemWidth:t.my[0]==="right"?t.elemWidth:0,c=t.at[0]==="left"?t.targetWidth:t.at[0]==="right"?-t.targetWidth:0,h=-2*t.offset[0],p,d;if(a<0){p=e.left+l+c+h+t.collisionWidth-s-r;if(p<0||p<i(a))e.left+=l+c+h}else if(f>0){d=e.left-t.collisionPosition.marginLeft+l+c+h-o;if(d>0||i(d)<f)e.left+=l+c+h}},top:function(e,t){var n=t.within,r=n.offset.top+n.scrollTop,s=n.height,o=n.isWindow?n.scrollTop:n.offset.top,u=e.top-t.collisionPosition.marginTop,a=u-o,f=u+t.collisionHeight-s-o,l=t.my[1]==="top",c=l?-t.elemHeight:t.my[1]==="bottom"?t.elemHeight:0,h=t.at[1]==="top"?t.targetHeight:t.at[1]==="bottom"?-t.targetHeight:0,p=-2*t.offset[1],d,v;a<0?(v=e.top+c+h+p+t.collisionHeight-s-r,e.top+c+h+p>a&&(v<0||v<i(a))&&(e.top+=c+h+p)):f>0&&(d=e.top-t.collisionPosition.marginTop+c+h+p-o,e.top+c+h+p>f&&(d>0||i(d)<f)&&(e.top+=c+h+p))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,n,r,i,s,o=document.getElementsByTagName("body")[0],u=document.createElement("div");t=document.createElement(o?"div":"body"),r={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&e.extend(r,{position:"absolute",left:"-1000px",top:"-1000px"});for(s in r)t.style[s]=r[s];t.appendChild(u),n=o||document.documentElement,n.insertBefore(t,n.firstChild),u.style.cssText="position: absolute; left: 10.7432222px;",i=e(u).offset().left,e.support.offsetFractions=i>10&&i<11,t.innerHTML="",n.removeChild(t)}(),e.uiBackCompat!==!1&&function(e){var n=e.fn.position;e.fn.position=function(r){if(!r||!r.offset)return n.call(this,r);var i=r.offset.split(" "),s=r.at.split(" ");return i.length===1&&(i[1]=i[0]),/^\d/.test(i[0])&&(i[0]="+"+i[0]),/^\d/.test(i[1])&&(i[1]="+"+i[1]),s.length===1&&(/left|center|right/.test(s[0])?s[1]="center":(s[1]=s[0],s[0]="center")),n.call(this,e.extend(r,{at:s[0]+i[0]+" "+s[1]+i[1],offset:t}))}}(jQuery)})(jQuery);(function(e,t){var n=0,r={},i={};r.height=r.paddingTop=r.paddingBottom=r.borderTopWidth=r.borderBottomWidth="hide",i.height=i.paddingTop=i.paddingBottom=i.borderTopWidth=i.borderBottomWidth="show",e.widget("ui.accordion",{version:"1.9.1",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var t=this.accordionId="ui-accordion-"+(this.element.attr("id")||++n),r=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset"),this.headers=this.element.find(r.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),this._hoverable(this.headers),this._focusable(this.headers),this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide(),!r.collapsible&&(r.active===!1||r.active==null)&&(r.active=0),r.active<0&&(r.active+=this.headers.length),this.active=this._findActive(r.active).addClass("ui-accordion-header-active ui-state-active").toggleClass("ui-corner-all ui-corner-top"),this.active.next().addClass("ui-accordion-content-active").show(),this._createIcons(),this.refresh(),this.element.attr("role","tablist"),this.headers.attr("role","tab").each(function(n){var r=e(this),i=r.attr("id"),s=r.next(),o=s.attr("id");i||(i=t+"-header-"+n,r.attr("id",i)),o||(o=t+"-panel-"+n,s.attr("id",o)),r.attr("aria-controls",o),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false",tabIndex:-1}).next().attr({"aria-expanded":"false","aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true",tabIndex:0}).next().attr({"aria-expanded":"true","aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._on(this.headers,{keydown:"_keydown"}),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._setupEvents(r.event)},_getCreateEventData:function(){return{header:this.active,content:this.active.length?this.active.next():e()}},_createIcons:function(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this._destroyIcons(),e=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this.options.heightStyle!=="content"&&e.css("height","")},_setOption:function(e,t){if(e==="active"){this._activate(t);return}e==="event"&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),e==="collapsible"&&!t&&this.options.active===!1&&this._activate(0),e==="icons"&&(this._destroyIcons(),t&&this._createIcons()),e==="disabled"&&this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t)},_keydown:function(t){if(t.altKey||t.ctrlKey)return;var n=e.ui.keyCode,r=this.headers.length,i=this.headers.index(t.target),s=!1;switch(t.keyCode){case n.RIGHT:case n.DOWN:s=this.headers[(i+1)%r];break;case n.LEFT:case n.UP:s=this.headers[(i-1+r)%r];break;case n.SPACE:case n.ENTER:this._eventHandler(t);break;case n.HOME:s=this.headers[0];break;case n.END:s=this.headers[r-1]}s&&(e(t.target).attr("tabIndex",-1),e(s).attr("tabIndex",0),s.focus(),t.preventDefault())},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus()},refresh:function(){var t,n,r=this.options.heightStyle,i=this.element.parent();r==="fill"?(e.support.minHeight||(n=i.css("overflow"),i.css("overflow","hidden")),t=i.height(),this.element.siblings(":visible").each(function(){var n=e(this),r=n.css("position");if(r==="absolute"||r==="fixed")return;t-=n.outerHeight(!0)}),n&&i.css("overflow",n),this.headers.each(function(){t-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):r==="auto"&&(t=0,this.headers.next().each(function(){t=Math.max(t,e(this).height("").height())}).height(t))},_activate:function(t){var n=this._findActive(t)[0];if(n===this.active[0])return;n=n||this.active[0],this._eventHandler({target:n,currentTarget:n,preventDefault:e.noop})},_findActive:function(t){return typeof t=="number"?this.headers.eq(t):e()},_setupEvents:function(t){var n={};if(!t)return;e.each(t.split(" "),function(e,t){n[t]="_eventHandler"}),this._on(this.headers,n)},_eventHandler:function(t){var n=this.options,r=this.active,i=e(t.currentTarget),s=i[0]===r[0],o=s&&n.collapsible,u=o?e():i.next(),a=r.next(),f={oldHeader:r,oldPanel:a,newHeader:o?e():i,newPanel:u};t.preventDefault();if(s&&!n.collapsible||this._trigger("beforeActivate",t,f)===!1)return;n.active=o?!1:this.headers.index(i),this.active=s?e():i,this._toggle(f),r.removeClass("ui-accordion-header-active ui-state-active"),n.icons&&r.children(".ui-accordion-header-icon").removeClass(n.icons.activeHeader).addClass(n.icons.header),s||(i.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),n.icons&&i.children(".ui-accordion-header-icon").removeClass(n.icons.header).addClass(n.icons.activeHeader),i.next().addClass("ui-accordion-content-active"))},_toggle:function(t){var n=t.newPanel,r=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=n,this.prevHide=r,this.options.animate?this._animate(n,r,t):(r.hide(),n.show(),this._toggleComplete(t)),r.attr({"aria-expanded":"false","aria-hidden":"true"}),r.prev().attr("aria-selected","false"),n.length&&r.length?r.prev().attr("tabIndex",-1):n.length&&this.headers.filter(function(){return e(this).attr("tabIndex")===0}).attr("tabIndex",-1),n.attr({"aria-expanded":"true","aria-hidden":"false"}).prev().attr({"aria-selected":"true",tabIndex:0})},_animate:function(e,t,n){var s,o,u,a=this,f=0,l=e.length&&(!t.length||e.index()<t.index()),c=this.options.animate||{},h=l&&c.down||c,p=function(){a._toggleComplete(n)};typeof h=="number"&&(u=h),typeof h=="string"&&(o=h),o=o||h.easing||c.easing,u=u||h.duration||c.duration;if(!t.length)return e.animate(i,u,o,p);if(!e.length)return t.animate(r,u,o,p);s=e.show().outerHeight(),t.animate(r,{duration:u,easing:o,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(i,{duration:u,easing:o,complete:p,step:function(e,n){n.now=Math.round(e),n.prop!=="height"?f+=n.now:a.options.heightStyle!=="content"&&(n.now=Math.round(s-t.outerHeight()-f),f=0)}})},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}}),e.uiBackCompat!==!1&&(function(e,t){e.extend(t.options,{navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}});var n=t._create;t._create=function(){if(this.options.navigation){var t=this,r=this.element.find(this.options.header),i=r.next(),s=r.add(i).find("a").filter(this.options.navigationFilter)[0];s&&r.add(i).each(function(n){if(e.contains(this,s))return t.options.active=Math.floor(n/2),!1})}n.call(this)}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options,{heightStyle:null,autoHeight:!0,clearStyle:!1,fillSpace:!1});var n=t._create,r=t._setOption;e.extend(t,{_create:function(){this.options.heightStyle=this.options.heightStyle||this._mergeHeightStyle(),n.call(this)},_setOption:function(e){if(e==="autoHeight"||e==="clearStyle"||e==="fillSpace")this.options.heightStyle=this._mergeHeightStyle();r.apply(this,arguments)},_mergeHeightStyle:function(){var e=this.options;if(e.fillSpace)return"fill";if(e.clearStyle)return"content";if(e.autoHeight)return"auto"}})}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options.icons,{activeHeader:null,headerSelected:"ui-icon-triangle-1-s"});var n=t._createIcons;t._createIcons=function(){this.options.icons&&(this.options.icons.activeHeader=this.options.icons.activeHeader||this.options.icons.headerSelected),n.call(this)}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){t.activate=t._activate;var n=t._findActive;t._findActive=function(e){return e===-1&&(e=!1),e&&typeof e!="number"&&(e=this.headers.index(this.headers.filter(e)),e===-1&&(e=!1)),n.call(this,e)}}(jQuery,jQuery.ui.accordion.prototype),jQuery.ui.accordion.prototype.resize=jQuery.ui.accordion.prototype.refresh,function(e,t){e.extend(t.options,{change:null,changestart:null});var n=t._trigger;t._trigger=function(e,t,r){var i=n.apply(this,arguments);return i?(e==="beforeActivate"?i=n.call(this,"changestart",t,{oldHeader:r.oldHeader,oldContent:r.oldPanel,newHeader:r.newHeader,newContent:r.newPanel}):e==="activate"&&(i=n.call(this,"change",t,{oldHeader:r.oldHeader,oldContent:r.oldPanel,newHeader:r.newHeader,newContent:r.newPanel})),i):!1}}(jQuery,jQuery.ui.accordion.prototype),function(e,t){e.extend(t.options,{animate:null,animated:"slide"});var n=t._create;t._create=function(){var e=this.options;e.animate===null&&(e.animated?e.animated==="slide"?e.animate=300:e.animated==="bounceslide"?e.animate={duration:200,down:{easing:"easeOutBounce",duration:1e3}}:e.animate=e.animated:e.animate=!1),n.call(this)}}(jQuery,jQuery.ui.accordion.prototype))})(jQuery);(function(e,t){var n=0;e.widget("ui.autocomplete",{version:"1.9.1",defaultElement:"<input>",options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var t,n,r;this.isMultiLine=this._isMultiLine(),this.valueMethod=this.element[this.element.is("input,textarea")?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(i){if(this.element.prop("readOnly")){t=!0,r=!0,n=!0;return}t=!1,r=!1,n=!1;var s=e.ui.keyCode;switch(i.keyCode){case s.PAGE_UP:t=!0,this._move("previousPage",i);break;case s.PAGE_DOWN:t=!0,this._move("nextPage",i);break;case s.UP:t=!0,this._keyEvent("previous",i);break;case s.DOWN:t=!0,this._keyEvent("next",i);break;case s.ENTER:case s.NUMPAD_ENTER:this.menu.active&&(t=!0,i.preventDefault(),this.menu.select(i));break;case s.TAB:this.menu.active&&this.menu.select(i);break;case s.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(i),i.preventDefault());break;default:n=!0,this._searchTimeout(i)}},keypress:function(r){if(t){t=!1,r.preventDefault();return}if(n)return;var i=e.ui.keyCode;switch(r.keyCode){case i.PAGE_UP:this._move("previousPage",r);break;case i.PAGE_DOWN:this._move("nextPage",r);break;case i.UP:this._keyEvent("previous",r);break;case i.DOWN:this._keyEvent("next",r)}},input:function(e){if(r){r=!1,e.preventDefault();return}this._searchTimeout(e)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){if(this.cancelBlur){delete this.cancelBlur;return}clearTimeout(this.searching),this.close(e),this._change(e)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo||"body")[0]).menu({input:e(),role:null}).zIndex(this.element.zIndex()+1).hide().data("menu"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var n=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(r){r.target!==t.element[0]&&r.target!==n&&!e.contains(n,r.target)&&t.close()})})},menufocus:function(t,n){if(this.isNewMenu){this.isNewMenu=!1;if(t.originalEvent&&/^mouse/.test(t.originalEvent.type)){this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)});return}}var r=n.item.data("ui-autocomplete-item")||n.item.data("item.autocomplete");!1!==this._trigger("focus",t,{item:r})?t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(r.value):this.liveRegion.text(r.value)},menuselect:function(e,t){var n=t.item.data("ui-autocomplete-item")||t.item.data("item.autocomplete"),r=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=r,this._delay(function(){this.previous=r,this.selectedItem=n})),!1!==this._trigger("select",e,{item:n})&&this._value(n.value),this.term=this._value(),this.close(e),this.selectedItem=n}}),this.liveRegion=e("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertAfter(this.element),e.fn.bgiframe&&this.menu.element.bgiframe(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),e==="source"&&this._initSource(),e==="appendTo"&&this.menu.element.appendTo(this.document.find(t||"body")[0]),e==="disabled"&&t&&this.xhr&&this.xhr.abort()},_isMultiLine:function(){return this.element.is("textarea")?!0:this.element.is("input")?!1:this.element.prop("isContentEditable")},_initSource:function(){var t,n,r=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(n,r){r(e.ui.autocomplete.filter(t,n.term))}):typeof this.options.source=="string"?(n=this.options.source,this.source=function(t,i){r.xhr&&r.xhr.abort(),r.xhr=e.ajax({url:n,data:t,dataType:"json",success:function(e){i(e)},error:function(){i([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){e=e!=null?e:this._value(),this.term=this._value();if(e.length<this.options.minLength)return this.close(t);if(this._trigger("search",t)===!1)return;return this._search(e)},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=this,t=++n;return function(r){t===n&&e.__response(r),e.pending--,e.pending||e.element.removeClass("ui-autocomplete-loading")}},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return typeof t=="string"?{label:t,value:t}:e.extend({label:t.label||t.value,value:t.value||t.label},t)})},_suggest:function(t){var n=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(n,t),this.menu.refresh(),n.show(),this._resizeMenu(),n.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,n){var r=this;e.each(n,function(e,n){r._renderItemData(t,n)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,n){return e("<li>").append(e("<a>").text(n.label)).appendTo(t)},_move:function(e,t){if(!this.menu.element.is(":visible")){this.search(null,t);return}if(this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)){this._value(this.term),this.menu.blur();return}this.menu[e](t)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){if(!this.isMultiLine||this.menu.element.is(":visible"))this._move(e,t),t.preventDefault()}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,n){var r=new RegExp(e.ui.autocomplete.escapeRegex(n),"i");return e.grep(t,function(e){return r.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var t;this._superApply(arguments);if(this.options.disabled||this.cancelSearch)return;e&&e.length?t=this.options.messages.results(e.length):t=this.options.messages.noResults,this.liveRegion.text(t)}})})(jQuery);(function(e,t){var n,r,i,s,o="ui-button ui-widget ui-state-default ui-corner-all",u="ui-state-hover ui-state-active ",a="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",f=function(){var t=e(this).find(":ui-button");setTimeout(function(){t.button("refresh")},1)},l=function(t){var n=t.name,r=t.form,i=e([]);return n&&(r?i=e(r).find("[name='"+n+"']"):i=e("[name='"+n+"']",t.ownerDocument).filter(function(){return!this.form})),i};e.widget("ui.button",{version:"1.9.1",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,f),typeof this.options.disabled!="boolean"?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var t=this,u=this.options,a=this.type==="checkbox"||this.type==="radio",c="ui-state-hover"+(a?"":" ui-state-active"),h="ui-state-focus";u.label===null&&(u.label=this.type==="input"?this.buttonElement.val():this.buttonElement.html()),this.buttonElement.addClass(o).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){if(u.disabled)return;e(this).addClass("ui-state-hover"),this===n&&e(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){if(u.disabled)return;e(this).removeClass(c)}).bind("click"+this.eventNamespace,function(e){u.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}),this.element.bind("focus"+this.eventNamespace,function(){t.buttonElement.addClass(h)}).bind("blur"+this.eventNamespace,function(){t.buttonElement.removeClass(h)}),a&&(this.element.bind("change"+this.eventNamespace,function(){if(s)return;t.refresh()}),this.buttonElement.bind("mousedown"+this.eventNamespace,function(e){if(u.disabled)return;s=!1,r=e.pageX,i=e.pageY}).bind("mouseup"+this.eventNamespace,function(e){if(u.disabled)return;if(r!==e.pageX||i!==e.pageY)s=!0})),this.type==="checkbox"?this.buttonElement.bind("click"+this.eventNamespace,function(){if(u.disabled||s)return!1;e(this).toggleClass("ui-state-active"),t.buttonElement.attr("aria-pressed",t.element[0].checked)}):this.type==="radio"?this.buttonElement.bind("click"+this.eventNamespace,function(){if(u.disabled||s)return!1;e(this).addClass("ui-state-active"),t.buttonElement.attr("aria-pressed","true");var n=t.element[0];l(n).not(n).map(function(){return e(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){if(u.disabled)return!1;e(this).addClass("ui-state-active"),n=this,t.document.one("mouseup",function(){n=null})}).bind("mouseup"+this.eventNamespace,function(){if(u.disabled)return!1;e(this).removeClass("ui-state-active")}).bind("keydown"+this.eventNamespace,function(t){if(u.disabled)return!1;(t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active")}).bind("keyup"+this.eventNamespace,function(){e(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click()})),this._setOption("disabled",u.disabled),this._resetButton()},_determineButtonType:function(){var e,t,n;this.element.is("[type=checkbox]")?this.type="checkbox":this.element.is("[type=radio]")?this.type="radio":this.element.is("input")?this.type="input":this.type="button",this.type==="checkbox"||this.type==="radio"?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),n=this.element.is(":checked"),n&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",n)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(o+" "+u+" "+a).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(e,t){this._super(e,t);if(e==="disabled"){t?this.element.prop("disabled",!0):this.element.prop("disabled",!1);return}this._resetButton()},refresh:function(){var t=this.element.is(":disabled")||this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),this.type==="radio"?l(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):this.type==="checkbox"&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if(this.type==="input"){this.options.label&&this.element.val(this.options.label);return}var t=this.buttonElement.removeClass(a),n=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),r=this.options.icons,i=r.primary&&r.secondary,s=[];r.primary||r.secondary?(this.options.text&&s.push("ui-button-text-icon"+(i?"s":r.primary?"-primary":"-secondary")),r.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+r.primary+"'></span>"),r.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+r.secondary+"'></span>"),this.options.text||(s.push(i?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(n)))):s.push("ui-button-text-only"),t.addClass(s.join(" "))}}),e.widget("ui.buttonset",{version:"1.9.1",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(e,t){e==="disabled"&&this.buttons.button("option",e,t),this._super(e,t)},refresh:function(){var t=this.element.css("direction")==="rtl";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})})(jQuery);(function($,undefined){function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function bindHover(e){var t="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.delegate(t,"mouseout",function(){$(this).removeClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!=-1&&$(this).removeClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!=-1&&$(this).removeClass("ui-datepicker-next-hover")}).delegate(t,"mouseover",function(){$.datepicker._isDisabledDatepicker(instActive.inline?e.parent()[0]:instActive.input[0])||($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),$(this).addClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!=-1&&$(this).addClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!=-1&&$(this).addClass("ui-datepicker-next-hover"))})}function extendRemove(e,t){$.extend(e,t);for(var n in t)if(t[n]==null||t[n]==undefined)e[n]=t[n];return e}$.extend($.ui,{datepicker:{version:"1.9.1"}});var PROP_NAME="datepicker",dpuuid=(new Date).getTime(),instActive;$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return extendRemove(this._defaults,e||{}),this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline=nodeName=="div"||nodeName=="span";target.id||(this.uuid+=1,target.id="dp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),nodeName=="input"?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst)},_newInst:function(e,t){var n=e[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:n,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:t,dpDiv:t?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}},_connectDatepicker:function(e,t){var n=$(e);t.append=$([]),t.trigger=$([]);if(n.hasClass(this.markerClassName))return;this._attachments(n,t),n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,n,r){t.settings[n]=r}).bind("getData.datepicker",function(e,n){return this._get(t,n)}),this._autoSize(t),$.data(e,PROP_NAME,t),t.settings.disabled&&this._disableDatepicker(e)},_attachments:function(e,t){var n=this._get(t,"appendText"),r=this._get(t,"isRTL");t.append&&t.append.remove(),n&&(t.append=$('<span class="'+this._appendClass+'">'+n+"</span>"),e[r?"before":"after"](t.append)),e.unbind("focus",this._showDatepicker),t.trigger&&t.trigger.remove();var i=this._get(t,"showOn");(i=="focus"||i=="both")&&e.focus(this._showDatepicker);if(i=="button"||i=="both"){var s=this._get(t,"buttonText"),o=this._get(t,"buttonImage");t.trigger=$(this._get(t,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:o,alt:s,title:s}):$('<button type="button"></button>').addClass(this._triggerClass).html(o==""?s:$("<img/>").attr({src:o,alt:s,title:s}))),e[r?"before":"after"](t.trigger),t.trigger.click(function(){return $.datepicker._datepickerShowing&&$.datepicker._lastInput==e[0]?$.datepicker._hideDatepicker():$.datepicker._datepickerShowing&&$.datepicker._lastInput!=e[0]?($.datepicker._hideDatepicker(),$.datepicker._showDatepicker(e[0])):$.datepicker._showDatepicker(e[0]),!1})}},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t=new Date(2009,11,20),n=this._get(e,"dateFormat");if(n.match(/[DM]/)){var r=function(e){var t=0,n=0;for(var r=0;r<e.length;r++)e[r].length>t&&(t=e[r].length,n=r);return n};t.setMonth(r(this._get(e,n.match(/MM/)?"monthNames":"monthNamesShort"))),t.setDate(r(this._get(e,n.match(/DD/)?"dayNames":"dayNamesShort"))+20-t.getDay())}e.input.attr("size",this._formatDate(e,t).length)}},_inlineDatepicker:function(e,t){var n=$(e);if(n.hasClass(this.markerClassName))return;n.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker",function(e,n,r){t.settings[n]=r}).bind("getData.datepicker",function(e,n){return this._get(t,n)}),$.data(e,PROP_NAME,t),this._setDate(t,this._getDefaultDate(t),!0),this._updateDatepicker(t),this._updateAlternate(t),t.settings.disabled&&this._disableDatepicker(e),t.dpDiv.css("display","block")},_dialogDatepicker:function(e,t,n,r,i){var s=this._dialogInst;if(!s){this.uuid+=1;var o="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+o+'" style="position: absolute; top: -100px; width: 0px;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),s=this._dialogInst=this._newInst(this._dialogInput,!1),s.settings={},$.data(this._dialogInput[0],PROP_NAME,s)}extendRemove(s.settings,r||{}),t=t&&t.constructor==Date?this._formatDate(s,t):t,this._dialogInput.val(t),this._pos=i?i.length?i:[i.pageX,i.pageY]:null;if(!this._pos){var u=document.documentElement.clientWidth,a=document.documentElement.clientHeight,f=document.documentElement.scrollLeft||document.body.scrollLeft,l=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[u/2-100+f,a/2-150+l]}return this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),s.settings.onSelect=n,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,s),this},_destroyDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();$.removeData(e,PROP_NAME),r=="input"?(n.append.remove(),n.trigger.remove(),t.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(r=="div"||r=="span")&&t.removeClass(this.markerClassName).empty()},_enableDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();if(r=="input")e.disabled=!1,n.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if(r=="div"||r=="span"){var i=t.children("."+this._inlineClass);i.children().removeClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t})},_disableDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();if(r=="input")e.disabled=!0,n.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(r=="div"||r=="span"){var i=t.children("."+this._inlineClass);i.children().addClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t}),this._disabledInputs[this._disabledInputs.length]=e},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;t<this._disabledInputs.length;t++)if(this._disabledInputs[t]==e)return!0;return!1},_getInst:function(e){try{return $.data(e,PROP_NAME)}catch(t){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,t,n){var r=this._getInst(e);if(arguments.length==2&&typeof t=="string")return t=="defaults"?$.extend({},$.datepicker._defaults):r?t=="all"?$.extend({},r.settings):this._get(r,t):null;var i=t||{};typeof t=="string"&&(i={},i[t]=n);if(r){this._curInst==r&&this._hideDatepicker();var s=this._getDateDatepicker(e,!0),o=this._getMinMaxDate(r,"min"),u=this._getMinMaxDate(r,"max");extendRemove(r.settings,i),o!==null&&i.dateFormat!==undefined&&i.minDate===undefined&&(r.settings.minDate=this._formatDate(r,o)),u!==null&&i.dateFormat!==undefined&&i.maxDate===undefined&&(r.settings.maxDate=this._formatDate(r,u)),this._attachments($(e),r),this._autoSize(r),this._setDate(r,s),this._updateAlternate(r),this._updateDatepicker(r)}},_changeDatepicker:function(e,t,n){this._optionDatepicker(e,t,n)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var n=this._getInst(e);n&&(this._setDate(n,t),this._updateDatepicker(n),this._updateAlternate(n))},_getDateDatepicker:function(e,t){var n=this._getInst(e);return n&&!n.inline&&this._setDateFromField(n,t),n?this._getDate(n):null},_doKeyDown:function(e){var t=$.datepicker._getInst(e.target),n=!0,r=t.dpDiv.is(".ui-datepicker-rtl");t._keyEvent=!0;if($.datepicker._datepickerShowing)switch(e.keyCode){case 9:$.datepicker._hideDatepicker(),n=!1;break;case 13:var i=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",t.dpDiv);i[0]&&$.datepicker._selectDay(e.target,t.selectedMonth,t.selectedYear,i[0]);var s=$.datepicker._get(t,"onSelect");if(s){var o=$.datepicker._formatDate(t);s.apply(t.input?t.input[0]:null,[o,t])}else $.datepicker._hideDatepicker();return!1;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 34:$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&$.datepicker._clearDate(e.target),n=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&$.datepicker._gotoToday(e.target),n=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,r?1:-1,"D"),n=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,-7,"D"),n=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,r?-1:1,"D"),n=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,7,"D"),n=e.ctrlKey||e.metaKey;break;default:n=!1}else e.keyCode==36&&e.ctrlKey?$.datepicker._showDatepicker(this):n=!1;n&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var t=$.datepicker._getInst(e.target);if($.datepicker._get(t,"constrainInput")){var n=$.datepicker._possibleChars($.datepicker._get(t,"dateFormat")),r=String.fromCharCode(e.charCode==undefined?e.keyCode:e.charCode);return e.ctrlKey||e.metaKey||r<" "||!n||n.indexOf(r)>-1}},_doKeyUp:function(e){var t=$.datepicker._getInst(e.target);if(t.input.val()!=t.lastVal)try{var n=$.datepicker.parseDate($.datepicker._get(t,"dateFormat"),t.input?t.input.val():null,$.datepicker._getFormatConfig(t));n&&($.datepicker._setDateFromField(t),$.datepicker._updateAlternate(t),$.datepicker._updateDatepicker(t))}catch(r){$.datepicker.log(r)}return!0},_showDatepicker:function(e){e=e.target||e,e.nodeName.toLowerCase()!="input"&&(e=$("input",e.parentNode)[0]);if($.datepicker._isDisabledDatepicker(e)||$.datepicker._lastInput==e)return;var t=$.datepicker._getInst(e);$.datepicker._curInst&&$.datepicker._curInst!=t&&($.datepicker._curInst.dpDiv.stop(!0,!0),t&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));var n=$.datepicker._get(t,"beforeShow"),r=n?n.apply(e,[e,t]):{};if(r===!1)return;extendRemove(t.settings,r),t.lastVal=null,$.datepicker._lastInput=e,$.datepicker._setDateFromField(t),$.datepicker._inDialog&&(e.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(e),$.datepicker._pos[1]+=e.offsetHeight);var i=!1;$(e).parents().each(function(){return i|=$(this).css("position")=="fixed",!i});var s={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null,t.dpDiv.empty(),t.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(t),s=$.datepicker._checkOffset(t,s,i),t.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":i?"fixed":"absolute",display:"none",left:s.left+"px",top:s.top+"px"});if(!t.inline){var o=$.datepicker._get(t,"showAnim"),u=$.datepicker._get(t,"duration"),a=function(){var e=t.dpDiv.find("iframe.ui-datepicker-cover");if(!!e.length){var n=$.datepicker._getBorders(t.dpDiv);e.css({left:-n[0],top:-n[1],width:t.dpDiv.outerWidth(),height:t.dpDiv.outerHeight()})}};t.dpDiv.zIndex($(e).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&($.effects.effect[o]||$.effects[o])?t.dpDiv.show(o,$.datepicker._get(t,"showOptions"),u,a):t.dpDiv[o||"show"](o?u:null,a),(!o||!u)&&a(),t.input.is(":visible")&&!t.input.is(":disabled")&&t.input.focus(),$.datepicker._curInst=t}},_updateDatepicker:function(e){this.maxRows=4;var t=$.datepicker._getBorders(e.dpDiv);instActive=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var n=e.dpDiv.find("iframe.ui-datepicker-cover");!n.length||n.css({left:-t[0],top:-t[1],width:e.dpDiv.outerWidth(),height:e.dpDiv.outerHeight()}),e.dpDiv.find("."+this._dayOverClass+" a").mouseover();var r=this._getNumberOfMonths(e),i=r[1],s=17;e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),i>1&&e.dpDiv.addClass("ui-datepicker-multi-"+i).css("width",s*i+"em"),e.dpDiv[(r[0]!=1||r[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e==$.datepicker._curInst&&$.datepicker._datepickerShowing&&e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&e.input[0]!=document.activeElement&&e.input.focus();if(e.yearshtml){var o=e.yearshtml;setTimeout(function(){o===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),o=e.yearshtml=null},0)}},_getBorders:function(e){var t=function(e){return{thin:1,medium:2,thick:3}[e]||e};return[parseFloat(t(e.css("border-left-width"))),parseFloat(t(e.css("border-top-width")))]},_checkOffset:function(e,t,n){var r=e.dpDiv.outerWidth(),i=e.dpDiv.outerHeight(),s=e.input?e.input.outerWidth():0,o=e.input?e.input.outerHeight():0,u=document.documentElement.clientWidth+(n?0:$(document).scrollLeft()),a=document.documentElement.clientHeight+(n?0:$(document).scrollTop());return t.left-=this._get(e,"isRTL")?r-s:0,t.left-=n&&t.left==e.input.offset().left?$(document).scrollLeft():0,t.top-=n&&t.top==e.input.offset().top+o?$(document).scrollTop():0,t.left-=Math.min(t.left,t.left+r>u&&u>r?Math.abs(t.left+r-u):0),t.top-=Math.min(t.top,t.top+i>a&&a>i?Math.abs(i+o):0),t},_findPos:function(e){var t=this._getInst(e),n=this._get(t,"isRTL");while(e&&(e.type=="hidden"||e.nodeType!=1||$.expr.filters.hidden(e)))e=e[n?"previousSibling":"nextSibling"];var r=$(e).offset();return[r.left,r.top]},_hideDatepicker:function(e){var t=this._curInst;if(!t||e&&t!=$.data(e,PROP_NAME))return;if(this._datepickerShowing){var n=this._get(t,"showAnim"),r=this._get(t,"duration"),i=function(){$.datepicker._tidyDialog(t)};$.effects&&($.effects.effect[n]||$.effects[n])?t.dpDiv.hide(n,$.datepicker._get(t,"showOptions"),r,i):t.dpDiv[n=="slideDown"?"slideUp":n=="fadeIn"?"fadeOut":"hide"](n?r:null,i),n||i(),this._datepickerShowing=!1;var s=this._get(t,"onClose");s&&s.apply(t.input?t.input[0]:null,[t.input?t.input.val():"",t]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1}},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(!$.datepicker._curInst)return;var t=$(e.target),n=$.datepicker._getInst(t[0]);(t[0].id!=$.datepicker._mainDivId&&t.parents("#"+$.datepicker._mainDivId).length==0&&!t.hasClass($.datepicker.markerClassName)&&!t.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||t.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=n)&&$.datepicker._hideDatepicker()},_adjustDate:function(e,t,n){var r=$(e),i=this._getInst(r[0]);if(this._isDisabledDatepicker(r[0]))return;this._adjustInstDate(i,t+(n=="M"?this._get(i,"showCurrentAtPos"):0),n),this._updateDatepicker(i)},_gotoToday:function(e){var t=$(e),n=this._getInst(t[0]);if(this._get(n,"gotoCurrent")&&n.currentDay)n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear;else{var r=new Date;n.selectedDay=r.getDate(),n.drawMonth=n.selectedMonth=r.getMonth(),n.drawYear=n.selectedYear=r.getFullYear()}this._notifyChange(n),this._adjustDate(t)},_selectMonthYear:function(e,t,n){var r=$(e),i=this._getInst(r[0]);i["selected"+(n=="M"?"Month":"Year")]=i["draw"+(n=="M"?"Month":"Year")]=parseInt(t.options[t.selectedIndex].value,10),this._notifyChange(i),this._adjustDate(r)},_selectDay:function(e,t,n,r){var i=$(e);if($(r).hasClass(this._unselectableClass)||this._isDisabledDatepicker(i[0]))return;var s=this._getInst(i[0]);s.selectedDay=s.currentDay=$("a",r).html(),s.selectedMonth=s.currentMonth=t,s.selectedYear=s.currentYear=n,this._selectDate(e,this._formatDate(s,s.currentDay,s.currentMonth,s.currentYear))},_clearDate:function(e){var t=$(e),n=this._getInst(t[0]);this._selectDate(t,"")},_selectDate:function(e,t){var n=$(e),r=this._getInst(n[0]);t=t!=null?t:this._formatDate(r),r.input&&r.input.val(t),this._updateAlternate(r);var i=this._get(r,"onSelect");i?i.apply(r.input?r.input[0]:null,[t,r]):r.input&&r.input.trigger("change"),r.inline?this._updateDatepicker(r):(this._hideDatepicker(),this._lastInput=r.input[0],typeof r.input[0]!="object"&&r.input.focus(),this._lastInput=null)},_updateAlternate:function(e){var t=this._get(e,"altField");if(t){var n=this._get(e,"altFormat")||this._get(e,"dateFormat"),r=this._getDate(e),i=this.formatDate(n,r,this._getFormatConfig(e));$(t).each(function(){$(this).val(i)})}},noWeekends:function(e){var t=e.getDay();return[t>0&&t<6,""]},iso8601Week:function(e){var t=new Date(e.getTime());t.setDate(t.getDate()+4-(t.getDay()||7));var n=t.getTime();return t.setMonth(0),t.setDate(1),Math.floor(Math.round((n-t)/864e5)/7)+1},parseDate:function(e,t,n){if(e==null||t==null)throw"Invalid arguments";t=typeof t=="object"?t.toString():t+"";if(t=="")return null;var r=(n?n.shortYearCutoff:null)||this._defaults.shortYearCutoff;r=typeof r!="string"?r:(new Date).getFullYear()%100+parseInt(r,10);var i=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,s=(n?n.dayNames:null)||this._defaults.dayNames,o=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,u=(n?n.monthNames:null)||this._defaults.monthNames,a=-1,f=-1,l=-1,c=-1,h=!1,p=function(t){var n=y+1<e.length&&e.charAt(y+1)==t;return n&&y++,n},d=function(e){var n=p(e),r=e=="@"?14:e=="!"?20:e=="y"&&n?4:e=="o"?3:2,i=new RegExp("^\\d{1,"+r+"}"),s=t.substring(g).match(i);if(!s)throw"Missing number at position "+g;return g+=s[0].length,parseInt(s[0],10)},v=function(e,n,r){var i=$.map(p(e)?r:n,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)}),s=-1;$.each(i,function(e,n){var r=n[1];if(t.substr(g,r.length).toLowerCase()==r.toLowerCase())return s=n[0],g+=r.length,!1});if(s!=-1)return s+1;throw"Unknown name at position "+g},m=function(){if(t.charAt(g)!=e.charAt(y))throw"Unexpected literal at position "+g;g++},g=0;for(var y=0;y<e.length;y++)if(h)e.charAt(y)=="'"&&!p("'")?h=!1:m();else switch(e.charAt(y)){case"d":l=d("d");break;case"D":v("D",i,s);break;case"o":c=d("o");break;case"m":f=d("m");break;case"M":f=v("M",o,u);break;case"y":a=d("y");break;case"@":var b=new Date(d("@"));a=b.getFullYear(),f=b.getMonth()+1,l=b.getDate();break;case"!":var b=new Date((d("!")-this._ticksTo1970)/1e4);a=b.getFullYear(),f=b.getMonth()+1,l=b.getDate();break;case"'":p("'")?m():h=!0;break;default:m()}if(g<t.length){var w=t.substr(g);if(!/^\s+/.test(w))throw"Extra/unparsed characters found in date: "+w}a==-1?a=(new Date).getFullYear():a<100&&(a+=(new Date).getFullYear()-(new Date).getFullYear()%100+(a<=r?0:-100));if(c>-1){f=1,l=c;do{var E=this._getDaysInMonth(a,f-1);if(l<=E)break;f++,l-=E}while(!0)}var b=this._daylightSavingAdjust(new Date(a,f-1,l));if(b.getFullYear()!=a||b.getMonth()+1!=f||b.getDate()!=l)throw"Invalid date";return b},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(e,t,n){if(!t)return"";var r=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,i=(n?n.dayNames:null)||this._defaults.dayNames,s=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,o=(n?n.monthNames:null)||this._defaults.monthNames,u=function(t){var n=h+1<e.length&&e.charAt(h+1)==t;return n&&h++,n},a=function(e,t,n){var r=""+t;if(u(e))while(r.length<n)r="0"+r;return r},f=function(e,t,n,r){return u(e)?r[t]:n[t]},l="",c=!1;if(t)for(var h=0;h<e.length;h++)if(c)e.charAt(h)=="'"&&!u("'")?c=!1:l+=e.charAt(h);else switch(e.charAt(h)){case"d":l+=a("d",t.getDate(),2);break;case"D":l+=f("D",t.getDay(),r,i);break;case"o":l+=a("o",Math.round(((new Date(t.getFullYear(),t.getMonth(),t.getDate())).getTime()-(new Date(t.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":l+=a("m",t.getMonth()+1,2);break;case"M":l+=f("M",t.getMonth(),s,o);break;case"y":l+=u("y")?t.getFullYear():(t.getYear()%100<10?"0":"")+t.getYear()%100;break;case"@":l+=t.getTime();break;case"!":l+=t.getTime()*1e4+this._ticksTo1970;break;case"'":u("'")?l+="'":c=!0;break;default:l+=e.charAt(h)}return l},_possibleChars:function(e){var t="",n=!1,r=function(t){var n=i+1<e.length&&e.charAt(i+1)==t;return n&&i++,n};for(var i=0;i<e.length;i++)if(n)e.charAt(i)=="'"&&!r("'")?n=!1:t+=e.charAt(i);else switch(e.charAt(i)){case"d":case"m":case"y":case"@":t+="0123456789";break;case"D":case"M":return null;case"'":r("'")?t+="'":n=!0;break;default:t+=e.charAt(i)}return t},_get:function(e,t){return e.settings[t]!==undefined?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()==e.lastVal)return;var n=this._get(e,"dateFormat"),r=e.lastVal=e.input?e.input.val():null,i,s;i=s=this._getDefaultDate(e);var o=this._getFormatConfig(e);try{i=this.parseDate(n,r,o)||s}catch(u){this.log(u),r=t?"":r}e.selectedDay=i.getDate(),e.drawMonth=e.selectedMonth=i.getMonth(),e.drawYear=e.selectedYear=i.getFullYear(),e.currentDay=r?i.getDate():0,e.currentMonth=r?i.getMonth():0,e.currentYear=r?i.getFullYear():0,this._adjustInstDate(e)},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(e,t,n){var r=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},i=function(t){try{return $.datepicker.parseDate($.datepicker._get(e,"dateFormat"),t,$.datepicker._getFormatConfig(e))}catch(n){}var r=(t.toLowerCase().match(/^c/)?$.datepicker._getDate(e):null)||new Date,i=r.getFullYear(),s=r.getMonth(),o=r.getDate(),u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,a=u.exec(t);while(a){switch(a[2]||"d"){case"d":case"D":o+=parseInt(a[1],10);break;case"w":case"W":o+=parseInt(a[1],10)*7;break;case"m":case"M":s+=parseInt(a[1],10),o=Math.min(o,$.datepicker._getDaysInMonth(i,s));break;case"y":case"Y":i+=parseInt(a[1],10),o=Math.min(o,$.datepicker._getDaysInMonth(i,s))}a=u.exec(t)}return new Date(i,s,o)},s=t==null||t===""?n:typeof t=="string"?i(t):typeof t=="number"?isNaN(t)?n:r(t):new Date(t.getTime());return s=s&&s.toString()=="Invalid Date"?n:s,s&&(s.setHours(0),s.setMinutes(0),s.setSeconds(0),s.setMilliseconds(0)),this._daylightSavingAdjust(s)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,n){var r=!t,i=e.selectedMonth,s=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),(i!=e.selectedMonth||s!=e.selectedYear)&&!n&&this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(r?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&e.input.val()==""?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(e){var t=this._get(e,"stepMonths"),n="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(n,-t,"M")},next:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(n,+t,"M")},hide:function(){window["DP_jQuery_"+dpuuid].datepicker._hideDatepicker()},today:function(){window["DP_jQuery_"+dpuuid].datepicker._gotoToday(n)},selectDay:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectDay(n,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(n,this,"M"),!1},selectYear:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(n,this,"Y"),!1}};$(this).bind(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t=new Date;t=this._daylightSavingAdjust(new Date(t.getFullYear(),t.getMonth(),t.getDate()));var n=this._get(e,"isRTL"),r=this._get(e,"showButtonPanel"),i=this._get(e,"hideIfNoPrevNext"),s=this._get(e,"navigationAsDateFormat"),o=this._getNumberOfMonths(e),u=this._get(e,"showCurrentAtPos"),a=this._get(e,"stepMonths"),f=o[0]!=1||o[1]!=1,l=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),c=this._getMinMaxDate(e,"min"),h=this._getMinMaxDate(e,"max"),p=e.drawMonth-u,d=e.drawYear;p<0&&(p+=12,d--);if(h){var v=this._daylightSavingAdjust(new Date(h.getFullYear(),h.getMonth()-o[0]*o[1]+1,h.getDate()));v=c&&v<c?c:v;while(this._daylightSavingAdjust(new Date(d,p,1))>v)p--,p<0&&(p=11,d--)}e.drawMonth=p,e.drawYear=d;var m=this._get(e,"prevText");m=s?this.formatDate(m,this._daylightSavingAdjust(new Date(d,p-a,1)),this._getFormatConfig(e)):m;var g=this._canAdjustMonth(e,-1,d,p)?'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="'+m+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"e":"w")+'">'+m+"</span></a>":i?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+m+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"e":"w")+'">'+m+"</span></a>",y=this._get(e,"nextText");y=s?this.formatDate(y,this._daylightSavingAdjust(new Date(d,p+a,1)),this._getFormatConfig(e)):y;var b=this._canAdjustMonth(e,1,d,p)?'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"w":"e")+'">'+y+"</span></a>":i?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"w":"e")+'">'+y+"</span></a>",w=this._get(e,"currentText"),E=this._get(e,"gotoCurrent")&&e.currentDay?l:t;w=s?this.formatDate(w,E,this._getFormatConfig(e)):w;var S=e.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">'+this._get(e,"closeText")+"</button>",x=r?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(n?S:"")+(this._isInRange(e,E)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">'+w+"</button>":"")+(n?"":S)+"</div>":"",T=parseInt(this._get(e,"firstDay"),10);T=isNaN(T)?0:T;var N=this._get(e,"showWeek"),C=this._get(e,"dayNames"),k=this._get(e,"dayNamesShort"),L=this._get(e,"dayNamesMin"),A=this._get(e,"monthNames"),O=this._get(e,"monthNamesShort"),M=this._get(e,"beforeShowDay"),_=this._get(e,"showOtherMonths"),D=this._get(e,"selectOtherMonths"),P=this._get(e,"calculateWeek")||this.iso8601Week,H=this._getDefaultDate(e),B="";for(var j=0;j<o[0];j++){var F="";this.maxRows=4;for(var I=0;I<o[1];I++){var q=this._daylightSavingAdjust(new Date(d,p,e.selectedDay)),R=" ui-corner-all",U="";if(f){U+='<div class="ui-datepicker-group';if(o[1]>1)switch(I){case 0:U+=" ui-datepicker-group-first",R=" ui-corner-"+(n?"right":"left");break;case o[1]-1:U+=" ui-datepicker-group-last",R=" ui-corner-"+(n?"left":"right");break;default:U+=" ui-datepicker-group-middle",R=""}U+='">'}U+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+R+'">'+(/all|left/.test(R)&&j==0?n?b:g:"")+(/all|right/.test(R)&&j==0?n?g:b:"")+this._generateMonthYearHeader(e,p,d,c,h,j>0||I>0,A,O)+'</div><table class="ui-datepicker-calendar"><thead>'+"<tr>";var z=N?'<th class="ui-datepicker-week-col">'+this._get(e,"weekHeader")+"</th>":"";for(var W=0;W<7;W++){var X=(W+T)%7;z+="<th"+((W+T+6)%7>=5?' class="ui-datepicker-week-end"':"")+">"+'<span title="'+C[X]+'">'+L[X]+"</span></th>"}U+=z+"</tr></thead><tbody>";var V=this._getDaysInMonth(d,p);d==e.selectedYear&&p==e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,V));var J=(this._getFirstDayOfMonth(d,p)-T+7)%7,K=Math.ceil((J+V)/7),Q=f?this.maxRows>K?this.maxRows:K:K;this.maxRows=Q;var G=this._daylightSavingAdjust(new Date(d,p,1-J));for(var Y=0;Y<Q;Y++){U+="<tr>";var Z=N?'<td class="ui-datepicker-week-col">'+this._get(e,"calculateWeek")(G)+"</td>":"";for(var W=0;W<7;W++){var et=M?M.apply(e.input?e.input[0]:null,[G]):[!0,""],tt=G.getMonth()!=p,nt=tt&&!D||!et[0]||c&&G<c||h&&G>h;Z+='<td class="'+((W+T+6)%7>=5?" ui-datepicker-week-end":"")+(tt?" ui-datepicker-other-month":"")+(G.getTime()==q.getTime()&&p==e.selectedMonth&&e._keyEvent||H.getTime()==G.getTime()&&H.getTime()==q.getTime()?" "+this._dayOverClass:"")+(nt?" "+this._unselectableClass+" ui-state-disabled":"")+(tt&&!_?"":" "+et[1]+(G.getTime()==l.getTime()?" "+this._currentClass:"")+(G.getTime()==t.getTime()?" ui-datepicker-today":""))+'"'+((!tt||_)&&et[2]?' title="'+et[2]+'"':"")+(nt?"":' data-handler="selectDay" data-event="click" data-month="'+G.getMonth()+'" data-year="'+G.getFullYear()+'"')+">"+(tt&&!_?"&#xa0;":nt?'<span class="ui-state-default">'+G.getDate()+"</span>":'<a class="ui-state-default'+(G.getTime()==t.getTime()?" ui-state-highlight":"")+(G.getTime()==l.getTime()?" ui-state-active":"")+(tt?" ui-priority-secondary":"")+'" href="#">'+G.getDate()+"</a>")+"</td>",G.setDate(G.getDate()+1),G=this._daylightSavingAdjust(G)}U+=Z+"</tr>"}p++,p>11&&(p=0,d++),U+="</tbody></table>"+(f?"</div>"+(o[0]>0&&I==o[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),F+=U}B+=F}return B+=x+($.ui.ie6&&!e.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),e._keyEvent=!1,B},_generateMonthYearHeader:function(e,t,n,r,i,s,o,u){var a=this._get(e,"changeMonth"),f=this._get(e,"changeYear"),l=this._get(e,"showMonthAfterYear"),c='<div class="ui-datepicker-title">',h="";if(s||!a)h+='<span class="ui-datepicker-month">'+o[t]+"</span>";else{var p=r&&r.getFullYear()==n,d=i&&i.getFullYear()==n;h+='<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';for(var v=0;v<12;v++)(!p||v>=r.getMonth())&&(!d||v<=i.getMonth())&&(h+='<option value="'+v+'"'+(v==t?' selected="selected"':"")+">"+u[v]+"</option>");h+="</select>"}l||(c+=h+(s||!a||!f?"&#xa0;":""));if(!e.yearshtml){e.yearshtml="";if(s||!f)c+='<span class="ui-datepicker-year">'+n+"</span>";else{var m=this._get(e,"yearRange").split(":"),g=(new Date).getFullYear(),y=function(e){var t=e.match(/c[+-].*/)?n+parseInt(e.substring(1),10):e.match(/[+-].*/)?g+parseInt(e,10):parseInt(e,10);return isNaN(t)?g:t},b=y(m[0]),w=Math.max(b,y(m[1]||""));b=r?Math.max(b,r.getFullYear()):b,w=i?Math.min(w,i.getFullYear()):w,e.yearshtml+='<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';for(;b<=w;b++)e.yearshtml+='<option value="'+b+'"'+(b==n?' selected="selected"':"")+">"+b+"</option>";e.yearshtml+="</select>",c+=e.yearshtml,e.yearshtml=null}}return c+=this._get(e,"yearSuffix"),l&&(c+=(s||!a||!f?"&#xa0;":"")+h),c+="</div>",c},_adjustInstDate:function(e,t,n){var r=e.drawYear+(n=="Y"?t:0),i=e.drawMonth+(n=="M"?t:0),s=Math.min(e.selectedDay,this._getDaysInMonth(r,i))+(n=="D"?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(r,i,s)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),(n=="M"||n=="Y")&&this._notifyChange(e)},_restrictMinMax:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max"),i=n&&t<n?n:t;return i=r&&i>r?r:i,i},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return t==null?[1,1]:typeof t=="number"?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return(new Date(e,t,1)).getDay()},_canAdjustMonth:function(e,t,n,r){var i=this._getNumberOfMonths(e),s=this._daylightSavingAdjust(new Date(n,r+(t<0?t:i[0]*i[1]),1));return t<0&&s.setDate(this._getDaysInMonth(s.getFullYear(),s.getMonth())),this._isInRange(e,s)},_isInRange:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max");return(!n||t.getTime()>=n.getTime())&&(!r||t.getTime()<=r.getTime())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t=typeof t!="string"?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,n,r){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var i=t?typeof t=="object"?t:this._daylightSavingAdjust(new Date(r,n,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),i,this._getFormatConfig(e))}}),$.fn.datepicker=function(e){if(!this.length)return this;$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv),$.datepicker.initialized=!0);var t=Array.prototype.slice.call(arguments,1);return typeof e!="string"||e!="isDisabled"&&e!="getDate"&&e!="widget"?e=="option"&&arguments.length==2&&typeof arguments[1]=="string"?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t)):this.each(function(){typeof e=="string"?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this].concat(t)):$.datepicker._attachDatepicker(this,e)}):$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t))},$.datepicker=new Datepicker,$.datepicker.initialized=!1,$.datepicker.uuid=(new Date).getTime(),$.datepicker.version="1.9.1",window["DP_jQuery_"+dpuuid]=$})(jQuery);(function(e,t){var n="ui-dialog ui-widget ui-widget-content ui-corner-all ",r={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},i={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};e.widget("ui.dialog",{version:"1.9.1",options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var n=e(this).css(t).offset().top;n<0&&e(this).css("top",t.top-n)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.oldPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.options.title=this.options.title||this.originalTitle;var t=this,r=this.options,i=r.title||"&#160;",s,o,u,a,f;s=(this.uiDialog=e("<div>")).addClass(n+r.dialogClass).css({display:"none",outline:0,zIndex:r.zIndex}).attr("tabIndex",-1).keydown(function(n){r.closeOnEscape&&!n.isDefaultPrevented()&&n.keyCode&&n.keyCode===e.ui.keyCode.ESCAPE&&(t.close(n),n.preventDefault())}).mousedown(function(e){t.moveToTop(!1,e)}).appendTo("body"),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(s),o=(this.uiDialogTitlebar=e("<div>")).addClass("ui-dialog-titlebar  ui-widget-header  ui-corner-all  ui-helper-clearfix").bind("mousedown",function(){s.focus()}).prependTo(s),u=e("<a href='#'></a>").addClass("ui-dialog-titlebar-close  ui-corner-all").attr("role","button").click(function(e){e.preventDefault(),t.close(e)}).appendTo(o),(this.uiDialogTitlebarCloseText=e("<span>")).addClass("ui-icon ui-icon-closethick").text(r.closeText).appendTo(u),a=e("<span>").uniqueId().addClass("ui-dialog-title").html(i).prependTo(o),f=(this.uiDialogButtonPane=e("<div>")).addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),(this.uiButtonSet=e("<div>")).addClass("ui-dialog-buttonset").appendTo(f),s.attr({role:"dialog","aria-labelledby":a.attr("id")}),o.find("*").add(o).disableSelection(),this._hoverable(u),this._focusable(u),r.draggable&&e.fn.draggable&&this._makeDraggable(),r.resizable&&e.fn.resizable&&this._makeResizable(),this._createButtons(r.buttons),this._isOpen=!1,e.fn.bgiframe&&s.bgiframe(),this._on(s,{keydown:function(t){if(!r.modal||t.keyCode!==e.ui.keyCode.TAB)return;var n=e(":tabbable",s),i=n.filter(":first"),o=n.filter(":last");if(t.target===o[0]&&!t.shiftKey)return i.focus(1),!1;if(t.target===i[0]&&t.shiftKey)return o.focus(1),!1}})},_init:function(){this.options.autoOpen&&this.open()},_destroy:function(){var e,t=this.oldPosition;this.overlay&&this.overlay.destroy(),this.uiDialog.hide(),this.element.removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},close:function(t){var n=this,r,i;if(!this._isOpen)return;if(!1===this._trigger("beforeClose",t))return;return this._isOpen=!1,this.overlay&&this.overlay.destroy(),this.options.hide?this._hide(this.uiDialog,this.options.hide,function(){n._trigger("close",t)}):(this.uiDialog.hide(),this._trigger("close",t)),e.ui.dialog.overlay.resize(),this.options.modal&&(r=0,e(".ui-dialog").each(function(){this!==n.uiDialog[0]&&(i=e(this).css("z-index"),isNaN(i)||(r=Math.max(r,i)))}),e.ui.dialog.maxZ=r),this},isOpen:function(){return this._isOpen},moveToTop:function(t,n){var r=this.options,i;return r.modal&&!t||!r.stack&&!r.modal?this._trigger("focus",n):(r.zIndex>e.ui.dialog.maxZ&&(e.ui.dialog.maxZ=r.zIndex),this.overlay&&(e.ui.dialog.maxZ+=1,e.ui.dialog.overlay.maxZ=e.ui.dialog.maxZ,this.overlay.$el.css("z-index",e.ui.dialog.overlay.maxZ)),i={scrollTop:this.element.scrollTop(),scrollLeft:this.element.scrollLeft()},e.ui.dialog.maxZ+=1,this.uiDialog.css("z-index",e.ui.dialog.maxZ),this.element.attr(i),this._trigger("focus",n),this)},open:function(){if(this._isOpen)return;var t,n=this.options,r=this.uiDialog;return this._size(),this._position(n.position),r.show(n.show),this.overlay=n.modal?new e.ui.dialog.overlay(this):null,this.moveToTop(!0),t=this.element.find(":tabbable"),t.length||(t=this.uiDialogButtonPane.find(":tabbable"),t.length||(t=r)),t.eq(0).focus(),this._isOpen=!0,this._trigger("open"),this},_createButtons:function(t){var n=this,r=!1;this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),typeof t=="object"&&t!==null&&e.each(t,function(){return!(r=!0)}),r?(e.each(t,function(t,r){r=e.isFunction(r)?{click:r,text:t}:r;var i=e("<button type='button'></button>").attr(r,!0).unbind("click").click(function(){r.click.apply(n.element[0],arguments)}).appendTo(n.uiButtonSet);e.fn.button&&i.button()}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog)):this.uiDialog.removeClass("ui-dialog-buttons")},_makeDraggable:function(){function r(e){return{position:e.position,offset:e.offset}}var t=this,n=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(n,i){e(this).addClass("ui-dialog-dragging"),t._trigger("dragStart",n,r(i))},drag:function(e,n){t._trigger("drag",e,r(n))},stop:function(i,s){n.position=[s.position.left-t.document.scrollLeft(),s.position.top-t.document.scrollTop()],e(this).removeClass("ui-dialog-dragging"),t._trigger("dragStop",i,r(s)),e.ui.dialog.overlay.resize()}})},_makeResizable:function(n){function u(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}n=n===t?this.options.resizable:n;var r=this,i=this.options,s=this.uiDialog.css("position"),o=typeof n=="string"?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:i.maxWidth,maxHeight:i.maxHeight,minWidth:i.minWidth,minHeight:this._minHeight(),handles:o,start:function(t,n){e(this).addClass("ui-dialog-resizing"),r._trigger("resizeStart",t,u(n))},resize:function(e,t){r._trigger("resize",e,u(t))},stop:function(t,n){e(this).removeClass("ui-dialog-resizing"),i.height=e(this).height(),i.width=e(this).width(),r._trigger("resizeStop",t,u(n)),e.ui.dialog.overlay.resize()}}).css("position",s).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var e=this.options;return e.height==="auto"?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(t){var n=[],r=[0,0],i;if(t){if(typeof t=="string"||typeof t=="object"&&"0"in t)n=t.split?t.split(" "):[t[0],t[1]],n.length===1&&(n[1]=n[0]),e.each(["left","top"],function(e,t){+n[e]===n[e]&&(r[e]=n[e],n[e]=t)}),t={my:n[0]+(r[0]<0?r[0]:"+"+r[0])+" "+n[1]+(r[1]<0?r[1]:"+"+r[1]),at:n.join(" ")};t=e.extend({},e.ui.dialog.prototype.options.position,t)}else t=e.ui.dialog.prototype.options.position;i=this.uiDialog.is(":visible"),i||this.uiDialog.show(),this.uiDialog.position(t),i||this.uiDialog.hide()},_setOptions:function(t){var n=this,s={},o=!1;e.each(t,function(e,t){n._setOption(e,t),e in r&&(o=!0),e in i&&(s[e]=t)}),o&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",s)},_setOption:function(t,r){var i,s,o=this.uiDialog;switch(t){case"buttons":this._createButtons(r);break;case"closeText":this.uiDialogTitlebarCloseText.text(""+r);break;case"dialogClass":o.removeClass(this.options.dialogClass).addClass(n+r);break;case"disabled":r?o.addClass("ui-dialog-disabled"):o.removeClass("ui-dialog-disabled");break;case"draggable":i=o.is(":data(draggable)"),i&&!r&&o.draggable("destroy"),!i&&r&&this._makeDraggable();break;case"position":this._position(r);break;case"resizable":s=o.is(":data(resizable)"),s&&!r&&o.resizable("destroy"),s&&typeof r=="string"&&o.resizable("option","handles",r),!s&&r!==!1&&this._makeResizable(r);break;case"title":e(".ui-dialog-title",this.uiDialogTitlebar).html(""+(r||"&#160;"))}this._super(t,r)},_size:function(){var t,n,r,i=this.options,s=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),i.minWidth>i.width&&(i.width=i.minWidth),t=this.uiDialog.css({height:"auto",width:i.width}).outerHeight(),n=Math.max(0,i.minHeight-t),i.height==="auto"?e.support.minHeight?this.element.css({minHeight:n,height:"auto"}):(this.uiDialog.show(),r=this.element.css("height","auto").height(),s||this.uiDialog.hide(),this.element.height(Math.max(r,n))):this.element.height(Math.max(i.height-t,0)),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),e.extend(e.ui.dialog,{uuid:0,maxZ:0,getTitleId:function(e){var t=e.attr("id");return t||(this.uuid+=1,t=this.uuid),"ui-dialog-title-"+t},overlay:function(t){this.$el=e.ui.dialog.overlay.create(t)}}),e.extend(e.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(e){return e+".dialog-overlay"}).join(" "),create:function(t){this.instances.length===0&&(setTimeout(function(){e.ui.dialog.overlay.instances.length&&e(document).bind(e.ui.dialog.overlay.events,function(t){if(e(t.target).zIndex()<e.ui.dialog.overlay.maxZ)return!1})},1),e(window).bind("resize.dialog-overlay",e.ui.dialog.overlay.resize));var n=this.oldInstances.pop()||e("<div>").addClass("ui-widget-overlay");return e(document).bind("keydown.dialog-overlay",function(r){var i=e.ui.dialog.overlay.instances;i.length!==0&&i[i.length-1]===n&&t.options.closeOnEscape&&!r.isDefaultPrevented()&&r.keyCode&&r.keyCode===e.ui.keyCode.ESCAPE&&(t.close(r),r.preventDefault())}),n.appendTo(document.body).css({width:this.width(),height:this.height()}),e.fn.bgiframe&&n.bgiframe(),this.instances.push(n),n},destroy:function(t){var n=e.inArray(t,this.instances),r=0;n!==-1&&this.oldInstances.push(this.instances.splice(n,1)[0]),this.instances.length===0&&e([document,window]).unbind(".dialog-overlay"),t.height(0).width(0).remove(),e.each(this.instances,function(){r=Math.max(r,this.css("z-index"))}),this.maxZ=r},height:function(){var t,n;return e.ui.ie?(t=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),n=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),t<n?e(window).height()+"px":t+"px"):e(document).height()+"px"},width:function(){var t,n;return e.ui.ie?(t=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),n=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),t<n?e(window).width()+"px":t+"px"):e(document).width()+"px"},resize:function(){var t=e([]);e.each(e.ui.dialog.overlay.instances,function(){t=t.add(this)}),t.css({width:0,height:0}).css({width:e.ui.dialog.overlay.width(),height:e.ui.dialog.overlay.height()})}}),e.extend(e.ui.dialog.overlay.prototype,{destroy:function(){e.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);(function(e,t){e.widget("ui.draggable",e.ui.mouse,{version:"1.9.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var n=this.options;return this.helper||n.disabled||e(t.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(t),this.handle?(e(n.iframeFix===!0?"iframe":n.iframeFix).each(function(){e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var n=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,n.cursorAt&&this._adjustOffsetFromHelper(n.cursorAt),n.containment&&this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,n){this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute");if(!n){var r=this._uiHash();if(this._trigger("drag",t,r)===!1)return this._mouseUp({}),!1;this.position=r.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var n=!1;e.ui.ddmanager&&!this.options.dropBehaviour&&(n=e.ui.ddmanager.drop(this,t)),this.dropped&&(n=this.dropped,this.dropped=!1);var r=this.element[0],i=!1;while(r&&(r=r.parentNode))r==document&&(i=!0);if(!i&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!n||this.options.revert=="valid"&&n||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,n)){var s=this;e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){s._trigger("stop",t)!==!1&&s._clear()})}else this._trigger("stop",t)!==!1&&this._clear();return!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){var n=!this.options.handle||!e(this.options.handle,this.element).length?!0:!1;return e(this.options.handle,this.element).find("*").andSelf().each(function(){this==t.target&&(n=!0)}),n},_createHelper:function(t){var n=this.options,r=e.isFunction(n.helper)?e(n.helper.apply(this.element[0],[t])):n.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return r.parents("body").length||r.appendTo(n.appendTo=="parent"?this.element[0].parentNode:n.appendTo),r[0]!=this.element[0]&&!/(fixed|absolute)/.test(r.css("position"))&&r.css("position","absolute"),r},_adjustOffsetFromHelper:function(t){typeof t=="string"&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&e.ui.ie)t={top:0,left:0};return{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t=this.options;t.containment=="parent"&&(t.containment=this.helper[0].parentNode);if(t.containment=="document"||t.containment=="window")this.containment=[t.containment=="document"?0:e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t.containment=="document"?0:e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(t.containment=="document"?0:e(window).scrollLeft())+e(t.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(t.containment=="document"?0:e(window).scrollTop())+(e(t.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(t.containment)&&t.containment.constructor!=Array){var n=e(t.containment),r=n[0];if(!r)return;var i=n.offset(),s=e(r).css("overflow")!="hidden";this.containment=[(parseInt(e(r).css("borderLeftWidth"),10)||0)+(parseInt(e(r).css("paddingLeft"),10)||0),(parseInt(e(r).css("borderTopWidth"),10)||0)+(parseInt(e(r).css("paddingTop"),10)||0),(s?Math.max(r.scrollWidth,r.offsetWidth):r.offsetWidth)-(parseInt(e(r).css("borderLeftWidth"),10)||0)-(parseInt(e(r).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(s?Math.max(r.scrollHeight,r.offsetHeight):r.offsetHeight)-(parseInt(e(r).css("borderTopWidth"),10)||0)-(parseInt(e(r).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=n}else t.containment.constructor==Array&&(this.containment=t.containment)},_convertPositionTo:function(t,n){n||(n=this.position);var r=t=="absolute"?1:-1,i=this.options,s=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(s[0].tagName);return{top:n.top+this.offset.relative.top*r+this.offset.parent.top*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():o?0:s.scrollTop())*r,left:n.left+this.offset.relative.left*r+this.offset.parent.left*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():o?0:s.scrollLeft())*r}},_generatePosition:function(t){var n=this.options,r=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,i=/(html|body)/i.test(r[0].tagName),s=t.pageX,o=t.pageY;if(this.originalPosition){var u;if(this.containment){if(this.relative_container){var a=this.relative_container.offset();u=[this.containment[0]+a.left,this.containment[1]+a.top,this.containment[2]+a.left,this.containment[3]+a.top]}else u=this.containment;t.pageX-this.offset.click.left<u[0]&&(s=u[0]+this.offset.click.left),t.pageY-this.offset.click.top<u[1]&&(o=u[1]+this.offset.click.top),t.pageX-this.offset.click.left>u[2]&&(s=u[2]+this.offset.click.left),t.pageY-this.offset.click.top>u[3]&&(o=u[3]+this.offset.click.top)}if(n.grid){var f=n.grid[1]?this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1]:this.originalPageY;o=u?f-this.offset.click.top<u[1]||f-this.offset.click.top>u[3]?f-this.offset.click.top<u[1]?f+n.grid[1]:f-n.grid[1]:f:f;var l=n.grid[0]?this.originalPageX+Math.round((s-this.originalPageX)/n.grid[0])*n.grid[0]:this.originalPageX;s=u?l-this.offset.click.left<u[0]||l-this.offset.click.left>u[2]?l-this.offset.click.left<u[0]?l+n.grid[0]:l-n.grid[0]:l:l}}return{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():i?0:r.scrollTop()),left:s-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:r.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,n,r){return r=r||this._uiHash(),e.ui.plugin.call(this,t,[n,r]),t=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,n,r)},plugins:{},_uiHash:function(e){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,n){var r=e(this).data("draggable"),i=r.options,s=e.extend({},n,{item:r.element});r.sortables=[],e(i.connectToSortable).each(function(){var n=e.data(this,"sortable");n&&!n.options.disabled&&(r.sortables.push({instance:n,shouldRevert:n.options.revert}),n.refreshPositions(),n._trigger("activate",t,s))})},stop:function(t,n){var r=e(this).data("draggable"),i=e.extend({},n,{item:r.element});e.each(r.sortables,function(){this.instance.isOver?(this.instance.isOver=0,r.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,r.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,i))})},drag:function(t,n){var r=e(this).data("draggable"),i=this,s=function(t){var n=this.offset.click.top,r=this.offset.click.left,i=this.positionAbs.top,s=this.positionAbs.left,o=t.height,u=t.width,a=t.top,f=t.left;return e.ui.isOver(i+n,s+r,a,f,o,u)};e.each(r.sortables,function(s){var o=!1,u=this;this.instance.positionAbs=r.positionAbs,this.instance.helperProportions=r.helperProportions,this.instance.offset.click=r.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(o=!0,e.each(r.sortables,function(){return this.instance.positionAbs=r.positionAbs,this.instance.helperProportions=r.helperProportions,this.instance.offset.click=r.offset.click,this!=u&&this.instance._intersectsWith(this.instance.containerCache)&&e.ui.contains(u.instance.element[0],this.instance.element[0])&&(o=!1),o})),o?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return n.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=r.offset.click.top,this.instance.offset.click.left=r.offset.click.left,this.instance.offset.parent.left-=r.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=r.offset.parent.top-this.instance.offset.parent.top,r._trigger("toSortable",t),r.dropped=this.instance.element,r.currentItem=r.element,this.instance.fromOutside=r),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),r._trigger("fromSortable",t),r.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,n){var r=e("body"),i=e(this).data("draggable").options;r.css("cursor")&&(i._cursor=r.css("cursor")),r.css("cursor",i.cursor)},stop:function(t,n){var r=e(this).data("draggable").options;r._cursor&&e("body").css("cursor",r._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,n){var r=e(n.helper),i=e(this).data("draggable").options;r.css("opacity")&&(i._opacity=r.css("opacity")),r.css("opacity",i.opacity)},stop:function(t,n){var r=e(this).data("draggable").options;r._opacity&&e(n.helper).css("opacity",r._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(t,n){var r=e(this).data("draggable");r.scrollParent[0]!=document&&r.scrollParent[0].tagName!="HTML"&&(r.overflowOffset=r.scrollParent.offset())},drag:function(t,n){var r=e(this).data("draggable"),i=r.options,s=!1;if(r.scrollParent[0]!=document&&r.scrollParent[0].tagName!="HTML"){if(!i.axis||i.axis!="x")r.overflowOffset.top+r.scrollParent[0].offsetHeight-t.pageY<i.scrollSensitivity?r.scrollParent[0].scrollTop=s=r.scrollParent[0].scrollTop+i.scrollSpeed:t.pageY-r.overflowOffset.top<i.scrollSensitivity&&(r.scrollParent[0].scrollTop=s=r.scrollParent[0].scrollTop-i.scrollSpeed);if(!i.axis||i.axis!="y")r.overflowOffset.left+r.scrollParent[0].offsetWidth-t.pageX<i.scrollSensitivity?r.scrollParent[0].scrollLeft=s=r.scrollParent[0].scrollLeft+i.scrollSpeed:t.pageX-r.overflowOffset.left<i.scrollSensitivity&&(r.scrollParent[0].scrollLeft=s=r.scrollParent[0].scrollLeft-i.scrollSpeed)}else{if(!i.axis||i.axis!="x")t.pageY-e(document).scrollTop()<i.scrollSensitivity?s=e(document).scrollTop(e(document).scrollTop()-i.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<i.scrollSensitivity&&(s=e(document).scrollTop(e(document).scrollTop()+i.scrollSpeed));if(!i.axis||i.axis!="y")t.pageX-e(document).scrollLeft()<i.scrollSensitivity?s=e(document).scrollLeft(e(document).scrollLeft()-i.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<i.scrollSensitivity&&(s=e(document).scrollLeft(e(document).scrollLeft()+i.scrollSpeed))}s!==!1&&e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(r,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,n){var r=e(this).data("draggable"),i=r.options;r.snapElements=[],e(i.snap.constructor!=String?i.snap.items||":data(draggable)":i.snap).each(function(){var t=e(this),n=t.offset();this!=r.element[0]&&r.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:n.top,left:n.left})})},drag:function(t,n){var r=e(this).data("draggable"),i=r.options,s=i.snapTolerance,o=n.offset.left,u=o+r.helperProportions.width,a=n.offset.top,f=a+r.helperProportions.height;for(var l=r.snapElements.length-1;l>=0;l--){var c=r.snapElements[l].left,h=c+r.snapElements[l].width,p=r.snapElements[l].top,d=p+r.snapElements[l].height;if(!(c-s<o&&o<h+s&&p-s<a&&a<d+s||c-s<o&&o<h+s&&p-s<f&&f<d+s||c-s<u&&u<h+s&&p-s<a&&a<d+s||c-s<u&&u<h+s&&p-s<f&&f<d+s)){r.snapElements[l].snapping&&r.options.snap.release&&r.options.snap.release.call(r.element,t,e.extend(r._uiHash(),{snapItem:r.snapElements[l].item})),r.snapElements[l].snapping=!1;continue}if(i.snapMode!="inner"){var v=Math.abs(p-f)<=s,m=Math.abs(d-a)<=s,g=Math.abs(c-u)<=s,y=Math.abs(h-o)<=s;v&&(n.position.top=r._convertPositionTo("relative",{top:p-r.helperProportions.height,left:0}).top-r.margins.top),m&&(n.position.top=r._convertPositionTo("relative",{top:d,left:0}).top-r.margins.top),g&&(n.position.left=r._convertPositionTo("relative",{top:0,left:c-r.helperProportions.width}).left-r.margins.left),y&&(n.position.left=r._convertPositionTo("relative",{top:0,left:h}).left-r.margins.left)}var b=v||m||g||y;if(i.snapMode!="outer"){var v=Math.abs(p-a)<=s,m=Math.abs(d-f)<=s,g=Math.abs(c-o)<=s,y=Math.abs(h-u)<=s;v&&(n.position.top=r._convertPositionTo("relative",{top:p,left:0}).top-r.margins.top),m&&(n.position.top=r._convertPositionTo("relative",{top:d-r.helperProportions.height,left:0}).top-r.margins.top),g&&(n.position.left=r._convertPositionTo("relative",{top:0,left:c}).left-r.margins.left),y&&(n.position.left=r._convertPositionTo("relative",{top:0,left:h-r.helperProportions.width}).left-r.margins.left)}!r.snapElements[l].snapping&&(v||m||g||y||b)&&r.options.snap.snap&&r.options.snap.snap.call(r.element,t,e.extend(r._uiHash(),{snapItem:r.snapElements[l].item})),r.snapElements[l].snapping=v||m||g||y||b}}}),e.ui.plugin.add("draggable","stack",{start:function(t,n){var r=e(this).data("draggable").options,i=e.makeArray(e(r.stack)).sort(function(t,n){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(n).css("zIndex"),10)||0)});if(!i.length)return;var s=parseInt(i[0].style.zIndex)||0;e(i).each(function(e){this.style.zIndex=s+e}),this[0].style.zIndex=s+i.length}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,n){var r=e(n.helper),i=e(this).data("draggable").options;r.css("zIndex")&&(i._zIndex=r.css("zIndex")),r.css("zIndex",i.zIndex)},stop:function(t,n){var r=e(this).data("draggable").options;r._zIndex&&e(n.helper).css("zIndex",r._zIndex)}})})(jQuery);(function(e,t){e.widget("ui.droppable",{version:"1.9.1",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var t=this.options,n=t.accept;this.isover=0,this.isout=1,this.accept=e.isFunction(n)?n:function(e){return e.is(n)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},e.ui.ddmanager.droppables[t.scope]=e.ui.ddmanager.droppables[t.scope]||[],e.ui.ddmanager.droppables[t.scope].push(this),t.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];for(var n=0;n<t.length;n++)t[n]==this&&t.splice(n,1);this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,n){t=="accept"&&(this.accept=e.isFunction(n)?n:function(e){return e.is(n)}),e.Widget.prototype._setOption.apply(this,arguments)},_activate:function(t){var n=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),n&&this._trigger("activate",t,this.ui(n))},_deactivate:function(t){var n=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),n&&this._trigger("deactivate",t,this.ui(n))},_over:function(t){var n=e.ui.ddmanager.current;if(!n||(n.currentItem||n.element)[0]==this.element[0])return;this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(n)))},_out:function(t){var n=e.ui.ddmanager.current;if(!n||(n.currentItem||n.element)[0]==this.element[0])return;this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(n)))},_drop:function(t,n){var r=n||e.ui.ddmanager.current;if(!r||(r.currentItem||r.element)[0]==this.element[0])return!1;var i=!1;return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var t=e.data(this,"droppable");if(t.options.greedy&&!t.options.disabled&&t.options.scope==r.options.scope&&t.accept.call(t.element[0],r.currentItem||r.element)&&e.ui.intersect(r,e.extend(t,{offset:t.element.offset()}),t.options.tolerance))return i=!0,!1}),i?!1:this.accept.call(this.element[0],r.currentItem||r.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(r)),this.element):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(t,n,r){if(!n.offset)return!1;var i=(t.positionAbs||t.position.absolute).left,s=i+t.helperProportions.width,o=(t.positionAbs||t.position.absolute).top,u=o+t.helperProportions.height,a=n.offset.left,f=a+n.proportions.width,l=n.offset.top,c=l+n.proportions.height;switch(r){case"fit":return a<=i&&s<=f&&l<=o&&u<=c;case"intersect":return a<i+t.helperProportions.width/2&&s-t.helperProportions.width/2<f&&l<o+t.helperProportions.height/2&&u-t.helperProportions.height/2<c;case"pointer":var h=(t.positionAbs||t.position.absolute).left+(t.clickOffset||t.offset.click).left,p=(t.positionAbs||t.position.absolute).top+(t.clickOffset||t.offset.click).top,d=e.ui.isOver(p,h,l,a,n.proportions.height,n.proportions.width);return d;case"touch":return(o>=l&&o<=c||u>=l&&u<=c||o<l&&u>c)&&(i>=a&&i<=f||s>=a&&s<=f||i<a&&s>f);default:return!1}},e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,n){var r=e.ui.ddmanager.droppables[t.options.scope]||[],i=n?n.type:null,s=(t.currentItem||t.element).find(":data(droppable)").andSelf();e:for(var o=0;o<r.length;o++){if(r[o].options.disabled||t&&!r[o].accept.call(r[o].element[0],t.currentItem||t.element))continue;for(var u=0;u<s.length;u++)if(s[u]==r[o].element[0]){r[o].proportions.height=0;continue e}r[o].visible=r[o].element.css("display")!="none";if(!r[o].visible)continue;i=="mousedown"&&r[o]._activate.call(r[o],n),r[o].offset=r[o].element.offset(),r[o].proportions={width:r[o].element[0].offsetWidth,height:r[o].element[0].offsetHeight}}},drop:function(t,n){var r=!1;return e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options)return;!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance)&&(r=this._drop.call(this,n)||r),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,n))}),r},dragStart:function(t,n){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,n)})},drag:function(t,n){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,n),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible)return;var r=e.ui.intersect(t,this,this.options.tolerance),i=!r&&this.isover==1?"isout":r&&this.isover==0?"isover":null;if(!i)return;var s;if(this.options.greedy){var o=this.options.scope,u=this.element.parents(":data(droppable)").filter(function(){return e.data(this,"droppable").options.scope===o});u.length&&(s=e.data(u[0],"droppable"),s.greedyChild=i=="isover"?1:0)}s&&i=="isover"&&(s.isover=0,s.isout=1,s._out.call(s,n)),this[i]=1,this[i=="isout"?"isover":"isout"]=0,this[i=="isover"?"_over":"_out"].call(this,n),s&&i=="isout"&&(s.isout=0,s.isover=1,s._over.call(s,n))})},dragStop:function(t,n){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,n)}}})(jQuery);jQuery.effects||function(e,t){var n=e.uiBackCompat!==!1,r="ui-effects-";e.effects={effect:{}},function(t,n){function p(e,t,n){var r=a[t.type]||{};return e==null?n||!t.def?null:t.def:(e=r.floor?~~e:parseFloat(e),isNaN(e)?t.def:r.mod?(e+r.mod)%r.mod:0>e?0:r.max<e?r.max:e)}function d(e){var n=o(),r=n._rgba=[];return e=e.toLowerCase(),h(s,function(t,i){var s,o=i.re.exec(e),a=o&&i.parse(o),f=i.space||"rgba";if(a)return s=n[f](a),n[u[f].cache]=s[u[f].cache],r=n._rgba=s._rgba,!1}),r.length?(r.join()==="0,0,0,0"&&t.extend(r,c.transparent),n):c[e]}function v(e,t,n){return n=(n+1)%1,n*6<1?e+(t-e)*n*6:n*2<1?t:n*3<2?e+(t-e)*(2/3-n)*6:e}var r="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),i=/^([\-+])=\s*(\d+\.?\d*)/,s=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1]*2.55,e[2]*2.55,e[3]*2.55,e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],o=t.Color=function(e,n,r,i){return new t.Color.fn.parse(e,n,r,i)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},a={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},f=o.support={},l=t("<p>")[0],c,h=t.each;l.style.cssText="background-color:rgba(1,1,1,.5)",f.rgba=l.style.backgroundColor.indexOf("rgba")>-1,h(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),o.fn=t.extend(o.prototype,{parse:function(r,i,s,a){if(r===n)return this._rgba=[null,null,null,null],this;if(r.jquery||r.nodeType)r=t(r).css(i),i=n;var f=this,l=t.type(r),v=this._rgba=[];i!==n&&(r=[r,i,s,a],l="array");if(l==="string")return this.parse(d(r)||c._default);if(l==="array")return h(u.rgba.props,function(e,t){v[t.idx]=p(r[t.idx],t)}),this;if(l==="object")return r instanceof o?h(u,function(e,t){r[t.cache]&&(f[t.cache]=r[t.cache].slice())}):h(u,function(t,n){var i=n.cache;h(n.props,function(e,t){if(!f[i]&&n.to){if(e==="alpha"||r[e]==null)return;f[i]=n.to(f._rgba)}f[i][t.idx]=p(r[e],t,!0)}),f[i]&&e.inArray(null,f[i].slice(0,3))<0&&(f[i][3]=1,n.from&&(f._rgba=n.from(f[i])))}),this},is:function(e){var t=o(e),n=!0,r=this;return h(u,function(e,i){var s,o=t[i.cache];return o&&(s=r[i.cache]||i.to&&i.to(r._rgba)||[],h(i.props,function(e,t){if(o[t.idx]!=null)return n=o[t.idx]===s[t.idx],n})),n}),n},_space:function(){var e=[],t=this;return h(u,function(n,r){t[r.cache]&&e.push(n)}),e.pop()},transition:function(e,t){var n=o(e),r=n._space(),i=u[r],s=this.alpha()===0?o("transparent"):this,f=s[i.cache]||i.to(s._rgba),l=f.slice();return n=n[i.cache],h(i.props,function(e,r){var i=r.idx,s=f[i],o=n[i],u=a[r.type]||{};if(o===null)return;s===null?l[i]=o:(u.mod&&(o-s>u.mod/2?s+=u.mod:s-o>u.mod/2&&(s-=u.mod)),l[i]=p((o-s)*t+s,r))}),this[r](l)},blend:function(e){if(this._rgba[3]===1)return this;var n=this._rgba.slice(),r=n.pop(),i=o(e)._rgba;return o(t.map(n,function(e,t){return(1-r)*i[t]+r*e}))},toRgbaString:function(){var e="rgba(",n=t.map(this._rgba,function(e,t){return e==null?t>2?1:0:e});return n[3]===1&&(n.pop(),e="rgb("),e+n.join()+")"},toHslaString:function(){var e="hsla(",n=t.map(this.hsla(),function(e,t){return e==null&&(e=t>2?1:0),t&&t<3&&(e=Math.round(e*100)+"%"),e});return n[3]===1&&(n.pop(),e="hsl("),e+n.join()+")"},toHexString:function(e){var n=this._rgba.slice(),r=n.pop();return e&&n.push(~~(r*255)),"#"+t.map(n,function(e){return e=(e||0).toString(16),e.length===1?"0"+e:e}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}}),o.fn.parse.prototype=o.fn,u.hsla.to=function(e){if(e[0]==null||e[1]==null||e[2]==null)return[null,null,null,e[3]];var t=e[0]/255,n=e[1]/255,r=e[2]/255,i=e[3],s=Math.max(t,n,r),o=Math.min(t,n,r),u=s-o,a=s+o,f=a*.5,l,c;return o===s?l=0:t===s?l=60*(n-r)/u+360:n===s?l=60*(r-t)/u+120:l=60*(t-n)/u+240,f===0||f===1?c=f:f<=.5?c=u/a:c=u/(2-a),[Math.round(l)%360,c,f,i==null?1:i]},u.hsla.from=function(e){if(e[0]==null||e[1]==null||e[2]==null)return[null,null,null,e[3]];var t=e[0]/360,n=e[1],r=e[2],i=e[3],s=r<=.5?r*(1+n):r+n-r*n,o=2*r-s;return[Math.round(v(o,s,t+1/3)*255),Math.round(v(o,s,t)*255),Math.round(v(o,s,t-1/3)*255),i]},h(u,function(e,r){var s=r.props,u=r.cache,a=r.to,f=r.from;o.fn[e]=function(e){a&&!this[u]&&(this[u]=a(this._rgba));if(e===n)return this[u].slice();var r,i=t.type(e),l=i==="array"||i==="object"?e:arguments,c=this[u].slice();return h(s,function(e,t){var n=l[i==="object"?e:t.idx];n==null&&(n=c[t.idx]),c[t.idx]=p(n,t)}),f?(r=o(f(c)),r[u]=c,r):o(c)},h(s,function(n,r){if(o.fn[n])return;o.fn[n]=function(s){var o=t.type(s),u=n==="alpha"?this._hsla?"hsla":"rgba":e,a=this[u](),f=a[r.idx],l;return o==="undefined"?f:(o==="function"&&(s=s.call(this,f),o=t.type(s)),s==null&&r.empty?this:(o==="string"&&(l=i.exec(s),l&&(s=f+parseFloat(l[2])*(l[1]==="+"?1:-1))),a[r.idx]=s,this[u](a)))}})}),h(r,function(e,n){t.cssHooks[n]={set:function(e,r){var i,s,u="";if(t.type(r)!=="string"||(i=d(r))){r=o(i||r);if(!f.rgba&&r._rgba[3]!==1){s=n==="backgroundColor"?e.parentNode:e;while((u===""||u==="transparent")&&s&&s.style)try{u=t.css(s,"backgroundColor"),s=s.parentNode}catch(a){}r=r.blend(u&&u!=="transparent"?u:"_default")}r=r.toRgbaString()}try{e.style[n]=r}catch(l){}}},t.fx.step[n]=function(e){e.colorInit||(e.start=o(e.elem,n),e.end=o(e.end),e.colorInit=!0),t.cssHooks[n].set(e.elem,e.start.transition(e.end,e.pos))}}),t.cssHooks.borderColor={expand:function(e){var t={};return h(["Top","Right","Bottom","Left"],function(n,r){t["border"+r+"Color"]=e}),t}},c=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(){var t=this.ownerDocument.defaultView?this.ownerDocument.defaultView.getComputedStyle(this,null):this.currentStyle,n={},r,i;if(t&&t.length&&t[0]&&t[t[0]]){i=t.length;while(i--)r=t[i],typeof t[r]=="string"&&(n[e.camelCase(r)]=t[r])}else for(r in t)typeof t[r]=="string"&&(n[r]=t[r]);return n}function s(t,n){var i={},s,o;for(s in n)o=n[s],t[s]!==o&&!r[s]&&(e.fx.step[s]||!isNaN(parseFloat(o)))&&(i[s]=o);return i}var n=["add","remove","toggle"],r={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,n){e.fx.step[n]=function(e){if(e.end!=="none"&&!e.setAttr||e.pos===1&&!e.setAttr)jQuery.style(e.elem,n,e.end),e.setAttr=!0}}),e.effects.animateClass=function(t,r,o,u){var a=e.speed(r,o,u);return this.queue(function(){var r=e(this),o=r.attr("class")||"",u,f=a.children?r.find("*").andSelf():r;f=f.map(function(){var t=e(this);return{el:t,start:i.call(this)}}),u=function(){e.each(n,function(e,n){t[n]&&r[n+"Class"](t[n])})},u(),f=f.map(function(){return this.end=i.call(this.el[0]),this.diff=s(this.start,this.end),this}),r.attr("class",o),f=f.map(function(){var t=this,n=e.Deferred(),r=jQuery.extend({},a,{queue:!1,complete:function(){n.resolve(t)}});return this.el.animate(this.diff,r),n.promise()}),e.when.apply(e,f.get()).done(function(){u(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),a.complete.call(r[0])})})},e.fn.extend({_addClass:e.fn.addClass,addClass:function(t,n,r,i){return n?e.effects.animateClass.call(this,{add:t},n,r,i):this._addClass(t)},_removeClass:e.fn.removeClass,removeClass:function(t,n,r,i){return n?e.effects.animateClass.call(this,{remove:t},n,r,i):this._removeClass(t)},_toggleClass:e.fn.toggleClass,toggleClass:function(n,r,i,s,o){return typeof r=="boolean"||r===t?i?e.effects.animateClass.call(this,r?{add:n}:{remove:n},i,s,o):this._toggleClass(n,r):e.effects.animateClass.call(this,{toggle:n},r,i,s)},switchClass:function(t,n,r,i,s){return e.effects.animateClass.call(this,{add:n,remove:t},r,i,s)}})}(),function(){function i(t,n,r,i){e.isPlainObject(t)&&(n=t,t=t.effect),t={effect:t},n==null&&(n={}),e.isFunction(n)&&(i=n,r=null,n={});if(typeof n=="number"||e.fx.speeds[n])i=r,r=n,n={};return e.isFunction(r)&&(i=r,r=null),n&&e.extend(t,n),r=r||n.duration,t.duration=e.fx.off?0:typeof r=="number"?r:r in e.fx.speeds?e.fx.speeds[r]:e.fx.speeds._default,t.complete=i||n.complete,t}function s(t){return!t||typeof t=="number"||e.fx.speeds[t]?!0:typeof t=="string"&&!e.effects.effect[t]?n&&e.effects[t]?!1:!0:!1}e.extend(e.effects,{version:"1.9.1",save:function(e,t){for(var n=0;n<t.length;n++)t[n]!==null&&e.data(r+t[n],e[0].style[t[n]])},restore:function(e,n){var i,s;for(s=0;s<n.length;s++)n[s]!==null&&(i=e.data(r+n[s]),i===t&&(i=""),e.css(n[s],i))},setMode:function(e,t){return t==="toggle"&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var n,r;switch(e[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=e[0]/t.height}switch(e[1]){case"left":r=0;break;case"center":r=.5;break;case"right":r=1;break;default:r=e[1]/t.width}return{x:r,y:n}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var n={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},r=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),i={width:t.width(),height:t.height()},s=document.activeElement;try{s.id}catch(o){s=document.body}return t.wrap(r),(t[0]===s||e.contains(t[0],s))&&e(s).focus(),r=t.parent(),t.css("position")==="static"?(r.css({position:"relative"}),t.css({position:"relative"})):(e.extend(n,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,r){n[r]=t.css(r),isNaN(parseInt(n[r],10))&&(n[r]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(i),r.css(n).show()},removeWrapper:function(t){var n=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===n||e.contains(t[0],n))&&e(n).focus()),t},setTransition:function(t,n,r,i){return i=i||{},e.each(n,function(e,n){var s=t.cssUnit(n);s[0]>0&&(i[n]=s[0]*r+s[1])}),i}}),e.fn.extend({effect:function(){function a(n){function u(){e.isFunction(i)&&i.call(r[0]),e.isFunction(n)&&n()}var r=e(this),i=t.complete,s=t.mode;(r.is(":hidden")?s==="hide":s==="show")?u():o.call(r[0],t,u)}var t=i.apply(this,arguments),r=t.mode,s=t.queue,o=e.effects.effect[t.effect],u=!o&&n&&e.effects[t.effect];return e.fx.off||!o&&!u?r?this[r](t.duration,t.complete):this.each(function(){t.complete&&t.complete.call(this)}):o?s===!1?this.each(a):this.queue(s||"fx",a):u.call(this,{options:t,duration:t.duration,callback:t.complete,mode:t.mode})},_show:e.fn.show,show:function(e){if(s(e))return this._show.apply(this,arguments);var t=i.apply(this,arguments);return t.mode="show",this.effect.call(this,t)},_hide:e.fn.hide,hide:function(e){if(s(e))return this._hide.apply(this,arguments);var t=i.apply(this,arguments);return t.mode="hide",this.effect.call(this,t)},__toggle:e.fn.toggle,toggle:function(t){if(s(t)||typeof t=="boolean"||e.isFunction(t))return this.__toggle.apply(this,arguments);var n=i.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)},cssUnit:function(t){var n=this.css(t),r=[];return e.each(["em","px","%","pt"],function(e,t){n.indexOf(t)>0&&(r=[parseFloat(n),t])}),r}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,n){t[n]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return e===0||e===1?e:-Math.pow(2,8*(e-1))*Math.sin(((e-1)*80-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){var t,n=4;while(e<((t=Math.pow(2,--n))-1)/11);return 1/Math.pow(4,3-n)-7.5625*Math.pow((t*3-2)/22-e,2)}}),e.each(t,function(t,n){e.easing["easeIn"+t]=n,e.easing["easeOut"+t]=function(e){return 1-n(1-e)},e.easing["easeInOut"+t]=function(e){return e<.5?n(e*2)/2:1-n(e*-2+2)/2}})}()}(jQuery);(function(e,t){var n=/up|down|vertical/,r=/up|left|vertical|horizontal/;e.effects.effect.blind=function(t,i){var s=e(this),o=["position","top","bottom","left","right","height","width"],u=e.effects.setMode(s,t.mode||"hide"),a=t.direction||"up",f=n.test(a),l=f?"height":"width",c=f?"top":"left",h=r.test(a),p={},d=u==="show",v,m,g;s.parent().is(".ui-effects-wrapper")?e.effects.save(s.parent(),o):e.effects.save(s,o),s.show(),v=e.effects.createWrapper(s).css({overflow:"hidden"}),m=v[l](),g=parseFloat(v.css(c))||0,p[l]=d?m:0,h||(s.css(f?"bottom":"right",0).css(f?"top":"left","auto").css({position:"absolute"}),p[c]=d?g:m+g),d&&(v.css(l,0),h||v.css(c,g+m)),v.animate(p,{duration:t.duration,easing:t.easing,queue:!1,complete:function(){u==="hide"&&s.hide(),e.effects.restore(s,o),e.effects.removeWrapper(s),i()}})}})(jQuery);(function(e,t){e.effects.effect.bounce=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"effect"),o=s==="hide",u=s==="show",a=t.direction||"up",f=t.distance,l=t.times||5,c=l*2+(u||o?1:0),h=t.duration/c,p=t.easing,d=a==="up"||a==="down"?"top":"left",v=a==="up"||a==="left",m,g,y,b=r.queue(),w=b.length;(u||o)&&i.push("opacity"),e.effects.save(r,i),r.show(),e.effects.createWrapper(r),f||(f=r[d==="top"?"outerHeight":"outerWidth"]()/3),u&&(y={opacity:1},y[d]=0,r.css("opacity",0).css(d,v?-f*2:f*2).animate(y,h,p)),o&&(f/=Math.pow(2,l-1)),y={},y[d]=0;for(m=0;m<l;m++)g={},g[d]=(v?"-=":"+=")+f,r.animate(g,h,p).animate(y,h,p),f=o?f*2:f/2;o&&(g={opacity:0},g[d]=(v?"-=":"+=")+f,r.animate(g,h,p)),r.queue(function(){o&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}),w>1&&b.splice.apply(b,[1,0].concat(b.splice(w,c+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.clip=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=t.direction||"vertical",a=u==="vertical",f=a?"height":"width",l=a?"top":"left",c={},h,p,d;e.effects.save(r,i),r.show(),h=e.effects.createWrapper(r).css({overflow:"hidden"}),p=r[0].tagName==="IMG"?h:r,d=p[f](),o&&(p.css(f,0),p.css(l,d/2)),c[f]=o?d:0,c[l]=o?0:d/2,p.animate(c,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){o||r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.drop=function(t,n){var r=e(this),i=["position","top","bottom","left","right","opacity","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=t.direction||"left",a=u==="up"||u==="down"?"top":"left",f=u==="up"||u==="left"?"pos":"neg",l={opacity:o?1:0},c;e.effects.save(r,i),r.show(),e.effects.createWrapper(r),c=t.distance||r[a==="top"?"outerHeight":"outerWidth"](!0)/2,o&&r.css("opacity",0).css(a,f==="pos"?-c:c),l[a]=(o?f==="pos"?"+=":"-=":f==="pos"?"-=":"+=")+c,r.animate(l,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.explode=function(t,n){function y(){c.push(this),c.length===r*i&&b()}function b(){s.css({visibility:"visible"}),e(c).remove(),u||s.hide(),n()}var r=t.pieces?Math.round(Math.sqrt(t.pieces)):3,i=r,s=e(this),o=e.effects.setMode(s,t.mode||"hide"),u=o==="show",a=s.show().css("visibility","hidden").offset(),f=Math.ceil(s.outerWidth()/i),l=Math.ceil(s.outerHeight()/r),c=[],h,p,d,v,m,g;for(h=0;h<r;h++){v=a.top+h*l,g=h-(r-1)/2;for(p=0;p<i;p++)d=a.left+p*f,m=p-(i-1)/2,s.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-p*f,top:-h*l}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:f,height:l,left:d+(u?m*f:0),top:v+(u?g*l:0),opacity:u?0:1}).animate({left:d+(u?0:m*f),top:v+(u?0:g*l),opacity:u?1:0},t.duration||500,t.easing,y)}}})(jQuery);(function(e,t){e.effects.effect.fade=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"toggle");r.animate({opacity:i},{queue:!1,duration:t.duration,easing:t.easing,complete:n})}})(jQuery);(function(e,t){e.effects.effect.fold=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=s==="hide",a=t.size||15,f=/([0-9]+)%/.exec(a),l=!!t.horizFirst,c=o!==l,h=c?["width","height"]:["height","width"],p=t.duration/2,d,v,m={},g={};e.effects.save(r,i),r.show(),d=e.effects.createWrapper(r).css({overflow:"hidden"}),v=c?[d.width(),d.height()]:[d.height(),d.width()],f&&(a=parseInt(f[1],10)/100*v[u?0:1]),o&&d.css(l?{height:0,width:a}:{height:a,width:0}),m[h[0]]=o?v[0]:a,g[h[1]]=o?v[1]:0,d.animate(m,p,t.easing).animate(g,p,t.easing,function(){u&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()})}})(jQuery);(function(e,t){e.effects.effect.highlight=function(t,n){var r=e(this),i=["backgroundImage","backgroundColor","opacity"],s=e.effects.setMode(r,t.mode||"show"),o={backgroundColor:r.css("backgroundColor")};s==="hide"&&(o.opacity=0),e.effects.save(r,i),r.show().css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),n()}})}})(jQuery);(function(e,t){e.effects.effect.pulsate=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"show"),s=i==="show",o=i==="hide",u=s||i==="hide",a=(t.times||5)*2+(u?1:0),f=t.duration/a,l=0,c=r.queue(),h=c.length,p;if(s||!r.is(":visible"))r.css("opacity",0).show(),l=1;for(p=1;p<a;p++)r.animate({opacity:l},f,t.easing),l=1-l;r.animate({opacity:l},f,t.easing),r.queue(function(){o&&r.hide(),n()}),h>1&&c.splice.apply(c,[1,0].concat(c.splice(h,a+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.puff=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"hide"),s=i==="hide",o=parseInt(t.percent,10)||150,u=o/100,a={height:r.height(),width:r.width()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:i,complete:n,percent:s?o:100,from:s?a:{height:a.height*u,width:a.width*u}}),r.effect(t)},e.effects.effect.scale=function(t,n){var r=e(this),i=e.extend(!0,{},t),s=e.effects.setMode(r,t.mode||"effect"),o=parseInt(t.percent,10)||(parseInt(t.percent,10)===0?0:s==="hide"?0:100),u=t.direction||"both",a=t.origin,f={height:r.height(),width:r.width(),outerHeight:r.outerHeight(),outerWidth:r.outerWidth()},l={y:u!=="horizontal"?o/100:1,x:u!=="vertical"?o/100:1};i.effect="size",i.queue=!1,i.complete=n,s!=="effect"&&(i.origin=a||["middle","center"],i.restore=!0),i.from=t.from||(s==="show"?{height:0,width:0}:f),i.to={height:f.height*l.y,width:f.width*l.x,outerHeight:f.outerHeight*l.y,outerWidth:f.outerWidth*l.x},i.fade&&(s==="show"&&(i.from.opacity=0,i.to.opacity=1),s==="hide"&&(i.from.opacity=1,i.to.opacity=0)),r.effect(i)},e.effects.effect.size=function(t,n){var r,i,s,o=e(this),u=["position","top","bottom","left","right","width","height","overflow","opacity"],a=["position","top","bottom","left","right","overflow","opacity"],f=["width","height","overflow"],l=["fontSize"],c=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],h=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=e.effects.setMode(o,t.mode||"effect"),d=t.restore||p!=="effect",v=t.scale||"both",m=t.origin||["middle","center"],g=o.css("position"),y=d?u:a,b={height:0,width:0};p==="show"&&o.show(),r={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},t.mode==="toggle"&&p==="show"?(o.from=t.to||b,o.to=t.from||r):(o.from=t.from||(p==="show"?b:r),o.to=t.to||(p==="hide"?b:r)),s={from:{y:o.from.height/r.height,x:o.from.width/r.width},to:{y:o.to.height/r.height,x:o.to.width/r.width}};if(v==="box"||v==="both")s.from.y!==s.to.y&&(y=y.concat(c),o.from=e.effects.setTransition(o,c,s.from.y,o.from),o.to=e.effects.setTransition(o,c,s.to.y,o.to)),s.from.x!==s.to.x&&(y=y.concat(h),o.from=e.effects.setTransition(o,h,s.from.x,o.from),o.to=e.effects.setTransition(o,h,s.to.x,o.to));(v==="content"||v==="both")&&s.from.y!==s.to.y&&(y=y.concat(l).concat(f),o.from=e.effects.setTransition(o,l,s.from.y,o.from),o.to=e.effects.setTransition(o,l,s.to.y,o.to)),e.effects.save(o,y),o.show(),e.effects.createWrapper(o),o.css("overflow","hidden").css(o.from),m&&(i=e.effects.getBaseline(m,r),o.from.top=(r.outerHeight-o.outerHeight())*i.y,o.from.left=(r.outerWidth-o.outerWidth())*i.x,o.to.top=(r.outerHeight-o.to.outerHeight)*i.y,o.to.left=(r.outerWidth-o.to.outerWidth)*i.x),o.css(o.from);if(v==="content"||v==="both")c=c.concat(["marginTop","marginBottom"]).concat(l),h=h.concat(["marginLeft","marginRight"]),f=u.concat(c).concat(h),o.find("*[width]").each(function(){var n=e(this),r={height:n.height(),width:n.width()};d&&e.effects.save(n,f),n.from={height:r.height*s.from.y,width:r.width*s.from.x},n.to={height:r.height*s.to.y,width:r.width*s.to.x},s.from.y!==s.to.y&&(n.from=e.effects.setTransition(n,c,s.from.y,n.from),n.to=e.effects.setTransition(n,c,s.to.y,n.to)),s.from.x!==s.to.x&&(n.from=e.effects.setTransition(n,h,s.from.x,n.from),n.to=e.effects.setTransition(n,h,s.to.x,n.to)),n.css(n.from),n.animate(n.to,t.duration,t.easing,function(){d&&e.effects.restore(n,f)})});o.animate(o.to,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){o.to.opacity===0&&o.css("opacity",o.from.opacity),p==="hide"&&o.hide(),e.effects.restore(o,y),d||(g==="static"?o.css({position:"relative",top:o.to.top,left:o.to.left}):e.each(["top","left"],function(e,t){o.css(t,function(t,n){var r=parseInt(n,10),i=e?o.to.left:o.to.top;return n==="auto"?i+"px":r+i+"px"})})),e.effects.removeWrapper(o),n()}})}})(jQuery);(function(e,t){e.effects.effect.shake=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"effect"),o=t.direction||"left",u=t.distance||20,a=t.times||3,f=a*2+1,l=Math.round(t.duration/f),c=o==="up"||o==="down"?"top":"left",h=o==="up"||o==="left",p={},d={},v={},m,g=r.queue(),y=g.length;e.effects.save(r,i),r.show(),e.effects.createWrapper(r),p[c]=(h?"-=":"+=")+u,d[c]=(h?"+=":"-=")+u*2,v[c]=(h?"-=":"+=")+u*2,r.animate(p,l,t.easing);for(m=1;m<a;m++)r.animate(d,l,t.easing).animate(v,l,t.easing);r.animate(d,l,t.easing).animate(p,l/2,t.easing).queue(function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}),y>1&&g.splice.apply(g,[1,0].concat(g.splice(y,f+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.slide=function(t,n){var r=e(this),i=["position","top","bottom","left","right","width","height"],s=e.effects.setMode(r,t.mode||"show"),o=s==="show",u=t.direction||"left",a=u==="up"||u==="down"?"top":"left",f=u==="up"||u==="left",l,c={};e.effects.save(r,i),r.show(),l=t.distance||r[a==="top"?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(r).css({overflow:"hidden"}),o&&r.css(a,f?isNaN(l)?"-"+l:-l:l),c[a]=(o?f?"+=":"-=":f?"-=":"+=")+l,r.animate(c,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.transfer=function(t,n){var r=e(this),i=e(t.to),s=i.css("position")==="fixed",o=e("body"),u=s?o.scrollTop():0,a=s?o.scrollLeft():0,f=i.offset(),l={top:f.top-u,left:f.left-a,height:i.innerHeight(),width:i.innerWidth()},c=r.offset(),h=e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(t.className).css({top:c.top-u,left:c.left-a,height:r.innerHeight(),width:r.innerWidth(),position:s?"fixed":"absolute"}).animate(l,t.duration,t.easing,function(){h.remove(),n()})}})(jQuery);(function(e,t){var n=!1;e.widget("ui.menu",{version:"1.9.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,e.proxy(function(e){this.options.disabled&&e.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(e){e.preventDefault()},"click .ui-state-disabled > a":function(e){e.preventDefault()},"click .ui-menu-item:has(a)":function(t){var r=e(t.target).closest(".ui-menu-item");!n&&r.not(".ui-state-disabled").length&&(n=!0,this.select(t),r.has(".ui-menu").length?this.expand(t):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&this.active.parents(".ui-menu").length===1&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){var n=e(t.currentTarget);n.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(t,n)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var n=this.active||this.element.children(".ui-menu-item").eq(0);t||this.focus(e,n)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){e(t.target).closest(".ui-menu").length||this.collapseAll(t),n=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){function a(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var n,r,i,s,o,u=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:u=!1,r=this.previousFilter||"",i=String.fromCharCode(t.keyCode),s=!1,clearTimeout(this.filterTimer),i===r?s=!0:i=r+i,o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())}),n=s&&n.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):n,n.length||(i=String.fromCharCode(t.keyCode),o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())})),n.length?(this.focus(t,n),n.length>1?(this.previousFilter=i,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}u&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,n=this.options.icons.submenu,r=this.element.find(this.options.menus+":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"});t=r.add(this.element),t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),t.children(":not(.ui-menu-item)").each(function(){var t=e(this);/[^\-—–\s]/.test(t.text())||t.addClass("ui-widget-content ui-menu-divider")}),t.children(".ui-state-disabled").attr("aria-disabled","true"),r.each(function(){var t=e(this),r=t.prev("a"),i=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);r.attr("aria-haspopup","true").prepend(i),t.attr("aria-labelledby",r.attr("id"))}),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},focus:function(e,t){var n,r;this.blur(e,e&&e.type==="focus"),this._scrollIntoView(t),this.active=t.first(),r=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",r.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),e&&e.type==="keydown"?this._close():this.timer=this._delay(function(){this._close()},this.delay),n=t.children(".ui-menu"),n.length&&/^mouse/.test(e.type)&&this._startOpening(n),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var n,r,i,s,o,u;this._hasScroll()&&(n=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,r=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,i=t.offset().top-this.activeMenu.offset().top-n-r,s=this.activeMenu.scrollTop(),o=this.activeMenu.height(),u=t.height(),i<0?this.activeMenu.scrollTop(s+i):i+u>o&&this.activeMenu.scrollTop(s+i-o+u))},blur:function(e,t){t||clearTimeout(this.timer);if(!this.active)return;this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active})},_startOpening:function(e){clearTimeout(this.timer);if(e.attr("aria-hidden")!=="true")return;this.timer=this._delay(function(){this._close(),this._open(e)},this.delay)},_open:function(t){var n=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(n)},collapseAll:function(t,n){clearTimeout(this.timer),this.timer=this._delay(function(){var r=n?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));r.length||(r=this.element),this._close(r),this.blur(t),this.activeMenu=r},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,n){var r;this.active&&(e==="first"||e==="last"?r=this.active[e==="first"?"prevAll":"nextAll"](".ui-menu-item").eq(-1):r=this.active[e+"All"](".ui-menu-item").eq(0));if(!r||!r.length||!this.active)r=this.activeMenu.children(".ui-menu-item")[t]();this.focus(n,r)},nextPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isLastItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r-i<0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())},previousPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isFirstItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r+i>0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item").first())},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var n={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,n)}})})(jQuery);(function(e,t){e.widget("ui.progressbar",{version:"1.9.1",options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(e){return e===t?this._value():(this._setOption("value",e),this)},_setOption:function(e,t){e==="value"&&(this.options.value=t,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),this._super(e,t)},_value:function(){var e=this.options.value;return typeof e!="number"&&(e=0),Math.min(this.options.max,Math.max(this.min,e))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var e=this.value(),t=this._percentage();this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),this.valueDiv.toggle(e>this.min).toggleClass("ui-corner-right",e===this.options.max).width(t.toFixed(0)+"%"),this.element.attr("aria-valuenow",e)}})})(jQuery);(function(e,t){e.widget("ui.resizable",e.ui.mouse,{version:"1.9.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var t=this,n=this.options;this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!n.aspectRatio,aspectRatio:n.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:n.helper||n.ghost||n.animate?n.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=n.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var r=this.handles.split(",");this.handles={};for(var i=0;i<r.length;i++){var s=e.trim(r[i]),o="ui-resizable-"+s,u=e('<div class="ui-resizable-handle '+o+'"></div>');u.css({zIndex:n.zIndex}),"se"==s&&u.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(u)}}this._renderAxis=function(t){t=t||this.element;for(var n in this.handles){this.handles[n].constructor==String&&(this.handles[n]=e(this.handles[n],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var r=e(this.handles[n],this.element),i=0;i=/sw|ne|nw|se|n|s/.test(n)?r.outerHeight():r.outerWidth();var s=["padding",/ne|nw|n/.test(n)?"Top":/se|sw|s/.test(n)?"Bottom":/^e$/.test(n)?"Right":"Left"].join("");t.css(s,i),this._proportionallyResize()}if(!e(this.handles[n]).length)continue}},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!t.resizing){if(this.className)var e=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);t.axis=e&&e[1]?e[1]:"se"}}),n.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){if(n.disabled)return;e(this).removeClass("ui-resizable-autohide"),t._handles.show()}).mouseleave(function(){if(n.disabled)return;t.resizing||(e(this).addClass("ui-resizable-autohide"),t._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){t(this.element);var n=this.element;this.originalElement.css({position:n.css("position"),width:n.outerWidth(),height:n.outerHeight(),top:n.css("top"),left:n.css("left")}).insertAfter(n),n.remove()}return this.originalElement.css("resize",this.originalResizeStyle),t(this.originalElement),this},_mouseCapture:function(t){var n=!1;for(var r in this.handles)e(this.handles[r])[0]==t.target&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(t){var r=this.options,i=this.element.position(),s=this.element;this.resizing=!0,this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()},(s.is(".ui-draggable")||/absolute/.test(s.css("position")))&&s.css({position:"absolute",top:i.top,left:i.left}),this._renderProxy();var o=n(this.helper.css("left")),u=n(this.helper.css("top"));r.containment&&(o+=e(r.containment).scrollLeft()||0,u+=e(r.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:o,top:u},this.size=this._helper?{width:s.outerWidth(),height:s.outerHeight()}:{width:s.width(),height:s.height()},this.originalSize=this._helper?{width:s.outerWidth(),height:s.outerHeight()}:{width:s.width(),height:s.height()},this.originalPosition={left:o,top:u},this.sizeDiff={width:s.outerWidth()-s.width(),height:s.outerHeight()-s.height()},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio=typeof r.aspectRatio=="number"?r.aspectRatio:this.originalSize.width/this.originalSize.height||1;var a=e(".ui-resizable-"+this.axis).css("cursor");return e("body").css("cursor",a=="auto"?this.axis+"-resize":a),s.addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(e){var t=this.helper,n=this.options,r={},i=this,s=this.originalMousePosition,o=this.axis,u=e.pageX-s.left||0,a=e.pageY-s.top||0,f=this._change[o];if(!f)return!1;var l=f.apply(this,[e,u,a]);this._updateVirtualBoundaries(e.shiftKey);if(this._aspectRatio||e.shiftKey)l=this._updateRatio(l,e);return l=this._respectSize(l,e),this._propagate("resize",e),t.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(l),this._trigger("resize",e,this.ui()),!1},_mouseStop:function(t){this.resizing=!1;var n=this.options,r=this;if(this._helper){var i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),o=s&&e.ui.hasScroll(i[0],"left")?0:r.sizeDiff.height,u=s?0:r.sizeDiff.width,a={width:r.helper.width()-u,height:r.helper.height()-o},f=parseInt(r.element.css("left"),10)+(r.position.left-r.originalPosition.left)||null,l=parseInt(r.element.css("top"),10)+(r.position.top-r.originalPosition.top)||null;n.animate||this.element.css(e.extend(a,{top:l,left:f})),r.helper.height(r.size.height),r.helper.width(r.size.width),this._helper&&!n.animate&&this._proportionallyResize()}return e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t=this.options,n,i,s,o,u;u={minWidth:r(t.minWidth)?t.minWidth:0,maxWidth:r(t.maxWidth)?t.maxWidth:Infinity,minHeight:r(t.minHeight)?t.minHeight:0,maxHeight:r(t.maxHeight)?t.maxHeight:Infinity};if(this._aspectRatio||e)n=u.minHeight*this.aspectRatio,s=u.minWidth/this.aspectRatio,i=u.maxHeight*this.aspectRatio,o=u.maxWidth/this.aspectRatio,n>u.minWidth&&(u.minWidth=n),s>u.minHeight&&(u.minHeight=s),i<u.maxWidth&&(u.maxWidth=i),o<u.maxHeight&&(u.maxHeight=o);this._vBoundaries=u},_updateCache:function(e){var t=this.options;this.offset=this.helper.offset(),r(e.left)&&(this.position.left=e.left),r(e.top)&&(this.position.top=e.top),r(e.height)&&(this.size.height=e.height),r(e.width)&&(this.size.width=e.width)},_updateRatio:function(e,t){var n=this.options,i=this.position,s=this.size,o=this.axis;return r(e.height)?e.width=e.height*this.aspectRatio:r(e.width)&&(e.height=e.width/this.aspectRatio),o=="sw"&&(e.left=i.left+(s.width-e.width),e.top=null),o=="nw"&&(e.top=i.top+(s.height-e.height),e.left=i.left+(s.width-e.width)),e},_respectSize:function(e,t){var n=this.helper,i=this._vBoundaries,s=this._aspectRatio||t.shiftKey,o=this.axis,u=r(e.width)&&i.maxWidth&&i.maxWidth<e.width,a=r(e.height)&&i.maxHeight&&i.maxHeight<e.height,f=r(e.width)&&i.minWidth&&i.minWidth>e.width,l=r(e.height)&&i.minHeight&&i.minHeight>e.height;f&&(e.width=i.minWidth),l&&(e.height=i.minHeight),u&&(e.width=i.maxWidth),a&&(e.height=i.maxHeight);var c=this.originalPosition.left+this.originalSize.width,h=this.position.top+this.size.height,p=/sw|nw|w/.test(o),d=/nw|ne|n/.test(o);f&&p&&(e.left=c-i.minWidth),u&&p&&(e.left=c-i.maxWidth),l&&d&&(e.top=h-i.minHeight),a&&d&&(e.top=h-i.maxHeight);var v=!e.width&&!e.height;return v&&!e.left&&e.top?e.top=null:v&&!e.top&&e.left&&(e.left=null),e},_proportionallyResize:function(){var t=this.options;if(!this._proportionallyResizeElements.length)return;var n=this.helper||this.element;for(var r=0;r<this._proportionallyResizeElements.length;r++){var i=this._proportionallyResizeElements[r];if(!this.borderDif){var s=[i.css("borderTopWidth"),i.css("borderRightWidth"),i.css("borderBottomWidth"),i.css("borderLeftWidth")],o=[i.css("paddingTop"),i.css("paddingRight"),i.css("paddingBottom"),i.css("paddingLeft")];this.borderDif=e.map(s,function(e,t){var n=parseInt(e,10)||0,r=parseInt(o[t],10)||0;return n+r})}i.css({height:n.height()-this.borderDif[0]-this.borderDif[2]||0,width:n.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var t=this.element,n=this.options;this.elementOffset=t.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var r=e.ui.ie6?1:0,i=e.ui.ie6?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+i,height:this.element.outerHeight()+i,position:"absolute",left:this.elementOffset.left-r+"px",top:this.elementOffset.top-r+"px",zIndex:++n.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(e,t,n){return{width:this.originalSize.width+t}},w:function(e,t,n){var r=this.options,i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,n){var r=this.options,i=this.originalSize,s=this.originalPosition;return{top:s.top+n,height:i.height-n}},s:function(e,t,n){return{height:this.originalSize.height+n}},se:function(t,n,r){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,n,r]))},sw:function(t,n,r){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,n,r]))},ne:function(t,n,r){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,n,r]))},nw:function(t,n,r){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,n,r]))}},_propagate:function(t,n){e.ui.plugin.call(this,t,[n,this.ui()]),t!="resize"&&this._trigger(t,n,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","alsoResize",{start:function(t,n){var r=e(this).data("resizable"),i=r.options,s=function(t){e(t).each(function(){var t=e(this);t.data("resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};typeof i.alsoResize=="object"&&!i.alsoResize.parentNode?i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)}):s(i.alsoResize)},resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.originalSize,o=r.originalPosition,u={height:r.size.height-s.height||0,width:r.size.width-s.width||0,top:r.position.top-o.top||0,left:r.position.left-o.left||0},a=function(t,r){e(t).each(function(){var t=e(this),i=e(this).data("resizable-alsoresize"),s={},o=r&&r.length?r:t.parents(n.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var n=(i[t]||0)+(u[t]||0);n&&n>=0&&(s[t]=n||null)}),t.css(s)})};typeof i.alsoResize=="object"&&!i.alsoResize.nodeType?e.each(i.alsoResize,function(e,t){a(e,t)}):a(i.alsoResize)},stop:function(t,n){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","animate",{stop:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r._proportionallyResizeElements,o=s.length&&/textarea/i.test(s[0].nodeName),u=o&&e.ui.hasScroll(s[0],"left")?0:r.sizeDiff.height,a=o?0:r.sizeDiff.width,f={width:r.size.width-a,height:r.size.height-u},l=parseInt(r.element.css("left"),10)+(r.position.left-r.originalPosition.left)||null,c=parseInt(r.element.css("top"),10)+(r.position.top-r.originalPosition.top)||null;r.element.animate(e.extend(f,c&&l?{top:c,left:l}:{}),{duration:i.animateDuration,easing:i.animateEasing,step:function(){var n={width:parseInt(r.element.css("width"),10),height:parseInt(r.element.css("height"),10),top:parseInt(r.element.css("top"),10),left:parseInt(r.element.css("left"),10)};s&&s.length&&e(s[0]).css({width:n.width,height:n.height}),r._updateCache(n),r._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(t,r){var i=e(this).data("resizable"),s=i.options,o=i.element,u=s.containment,a=u instanceof e?u.get(0):/parent/.test(u)?o.parent().get(0):u;if(!a)return;i.containerElement=e(a);if(/document/.test(u)||u==document)i.containerOffset={left:0,top:0},i.containerPosition={left:0,top:0},i.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight};else{var f=e(a),l=[];e(["Top","Right","Left","Bottom"]).each(function(e,t){l[e]=n(f.css("padding"+t))}),i.containerOffset=f.offset(),i.containerPosition=f.position(),i.containerSize={height:f.innerHeight()-l[3],width:f.innerWidth()-l[1]};var c=i.containerOffset,h=i.containerSize.height,p=i.containerSize.width,d=e.ui.hasScroll(a,"left")?a.scrollWidth:p,v=e.ui.hasScroll(a)?a.scrollHeight:h;i.parentData={element:a,left:c.left,top:c.top,width:d,height:v}}},resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.containerSize,o=r.containerOffset,u=r.size,a=r.position,f=r._aspectRatio||t.shiftKey,l={top:0,left:0},c=r.containerElement;c[0]!=document&&/static/.test(c.css("position"))&&(l=o),a.left<(r._helper?o.left:0)&&(r.size.width=r.size.width+(r._helper?r.position.left-o.left:r.position.left-l.left),f&&(r.size.height=r.size.width/r.aspectRatio),r.position.left=i.helper?o.left:0),a.top<(r._helper?o.top:0)&&(r.size.height=r.size.height+(r._helper?r.position.top-o.top:r.position.top),f&&(r.size.width=r.size.height*r.aspectRatio),r.position.top=r._helper?o.top:0),r.offset.left=r.parentData.left+r.position.left,r.offset.top=r.parentData.top+r.position.top;var h=Math.abs((r._helper?r.offset.left-l.left:r.offset.left-l.left)+r.sizeDiff.width),p=Math.abs((r._helper?r.offset.top-l.top:r.offset.top-o.top)+r.sizeDiff.height),d=r.containerElement.get(0)==r.element.parent().get(0),v=/relative|absolute/.test(r.containerElement.css("position"));d&&v&&(h-=r.parentData.left),h+r.size.width>=r.parentData.width&&(r.size.width=r.parentData.width-h,f&&(r.size.height=r.size.width/r.aspectRatio)),p+r.size.height>=r.parentData.height&&(r.size.height=r.parentData.height-p,f&&(r.size.width=r.size.height*r.aspectRatio))},stop:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.position,o=r.containerOffset,u=r.containerPosition,a=r.containerElement,f=e(r.helper),l=f.offset(),c=f.outerWidth()-r.sizeDiff.width,h=f.outerHeight()-r.sizeDiff.height;r._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:l.left-u.left-o.left,width:c,height:h}),r._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:l.left-u.left-o.left,width:c,height:h})}}),e.ui.plugin.add("resizable","ghost",{start:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.size;r.ghost=r.originalElement.clone(),r.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof i.ghost=="string"?i.ghost:""),r.ghost.appendTo(r.helper)},resize:function(t,n){var r=e(this).data("resizable"),i=r.options;r.ghost&&r.ghost.css({position:"relative",height:r.size.height,width:r.size.width})},stop:function(t,n){var r=e(this).data("resizable"),i=r.options;r.ghost&&r.helper&&r.helper.get(0).removeChild(r.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.size,o=r.originalSize,u=r.originalPosition,a=r.axis,f=i._aspectRatio||t.shiftKey;i.grid=typeof i.grid=="number"?[i.grid,i.grid]:i.grid;var l=Math.round((s.width-o.width)/(i.grid[0]||1))*(i.grid[0]||1),c=Math.round((s.height-o.height)/(i.grid[1]||1))*(i.grid[1]||1);/^(se|s|e)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c):/^(ne)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c,r.position.top=u.top-c):/^(sw)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c,r.position.left=u.left-l):(r.size.width=o.width+l,r.size.height=o.height+c,r.position.top=u.top-c,r.position.left=u.left-l)}});var n=function(e){return parseInt(e,10)||0},r=function(e){return!isNaN(parseInt(e,10))}})(jQuery);(function(e,t){e.widget("ui.selectable",e.ui.mouse,{version:"1.9.1",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch"},_create:function(){var t=this;this.element.addClass("ui-selectable"),this.dragged=!1;var n;this.refresh=function(){n=e(t.options.filter,t.element[0]),n.addClass("ui-selectee"),n.each(function(){var t=e(this),n=t.offset();e.data(this,"selectable-item",{element:this,$element:t,left:n.left,top:n.top,right:n.left+t.outerWidth(),bottom:n.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=n.addClass("ui-selectee"),this._mouseInit(),this.helper=e("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(t){var n=this;this.opos=[t.pageX,t.pageY];if(this.options.disabled)return;var r=this.options;this.selectees=e(r.filter,this.element[0]),this._trigger("start",t),e(r.appendTo).append(this.helper),this.helper.css({left:t.clientX,top:t.clientY,width:0,height:0}),r.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var r=e.data(this,"selectable-item");r.startselected=!0,!t.metaKey&&!t.ctrlKey&&(r.$element.removeClass("ui-selected"),r.selected=!1,r.$element.addClass("ui-unselecting"),r.unselecting=!0,n._trigger("unselecting",t,{unselecting:r.element}))}),e(t.target).parents().andSelf().each(function(){var r=e.data(this,"selectable-item");if(r){var i=!t.metaKey&&!t.ctrlKey||!r.$element.hasClass("ui-selected");return r.$element.removeClass(i?"ui-unselecting":"ui-selected").addClass(i?"ui-selecting":"ui-unselecting"),r.unselecting=!i,r.selecting=i,r.selected=i,i?n._trigger("selecting",t,{selecting:r.element}):n._trigger("unselecting",t,{unselecting:r.element}),!1}})},_mouseDrag:function(t){var n=this;this.dragged=!0;if(this.options.disabled)return;var r=this.options,i=this.opos[0],s=this.opos[1],o=t.pageX,u=t.pageY;if(i>o){var a=o;o=i,i=a}if(s>u){var a=u;u=s,s=a}return this.helper.css({left:i,top:s,width:o-i,height:u-s}),this.selectees.each(function(){var a=e.data(this,"selectable-item");if(!a||a.element==n.element[0])return;var f=!1;r.tolerance=="touch"?f=!(a.left>o||a.right<i||a.top>u||a.bottom<s):r.tolerance=="fit"&&(f=a.left>i&&a.right<o&&a.top>s&&a.bottom<u),f?(a.selected&&(a.$element.removeClass("ui-selected"),a.selected=!1),a.unselecting&&(a.$element.removeClass("ui-unselecting"),a.unselecting=!1),a.selecting||(a.$element.addClass("ui-selecting"),a.selecting=!0,n._trigger("selecting",t,{selecting:a.element}))):(a.selecting&&((t.metaKey||t.ctrlKey)&&a.startselected?(a.$element.removeClass("ui-selecting"),a.selecting=!1,a.$element.addClass("ui-selected"),a.selected=!0):(a.$element.removeClass("ui-selecting"),a.selecting=!1,a.startselected&&(a.$element.addClass("ui-unselecting"),a.unselecting=!0),n._trigger("unselecting",t,{unselecting:a.element}))),a.selected&&!t.metaKey&&!t.ctrlKey&&!a.startselected&&(a.$element.removeClass("ui-selected"),a.selected=!1,a.$element.addClass("ui-unselecting"),a.unselecting=!0,n._trigger("unselecting",t,{unselecting:a.element})))}),!1},_mouseStop:function(t){var n=this;this.dragged=!1;var r=this.options;return e(".ui-unselecting",this.element[0]).each(function(){var r=e.data(this,"selectable-item");r.$element.removeClass("ui-unselecting"),r.unselecting=!1,r.startselected=!1,n._trigger("unselected",t,{unselected:r.element})}),e(".ui-selecting",this.element[0]).each(function(){var r=e.data(this,"selectable-item");r.$element.removeClass("ui-selecting").addClass("ui-selected"),r.selecting=!1,r.selected=!0,r.startselected=!0,n._trigger("selected",t,{selected:r.element})}),this._trigger("stop",t),this.helper.remove(),!1}})})(jQuery);(function(e,t){var n=5;e.widget("ui.slider",e.ui.mouse,{version:"1.9.1",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var t,r,i=this.options,s=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),o="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",u=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(i.disabled?" ui-slider-disabled ui-disabled":"")),this.range=e([]),i.range&&(i.range===!0&&(i.values||(i.values=[this._valueMin(),this._valueMin()]),i.values.length&&i.values.length!==2&&(i.values=[i.values[0],i.values[0]])),this.range=e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(i.range==="min"||i.range==="max"?" ui-slider-range-"+i.range:""))),r=i.values&&i.values.length||1;for(t=s.length;t<r;t++)u.push(o);this.handles=s.add(e(u.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(e){e.preventDefault()}).mouseenter(function(){i.disabled||e(this).addClass("ui-state-hover")}).mouseleave(function(){e(this).removeClass("ui-state-hover")}).focus(function(){i.disabled?e(this).blur():(e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),e(this).addClass("ui-state-focus"))}).blur(function(){e(this).removeClass("ui-state-focus")}),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)}),this._on(this.handles,{keydown:function(t){var r,i,s,o,u=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:t.preventDefault();if(!this._keySliding){this._keySliding=!0,e(t.target).addClass("ui-state-active"),r=this._start(t,u);if(r===!1)return}}o=this.options.step,this.options.values&&this.options.values.length?i=s=this.values(u):i=s=this.value();switch(t.keyCode){case e.ui.keyCode.HOME:s=this._valueMin();break;case e.ui.keyCode.END:s=this._valueMax();break;case e.ui.keyCode.PAGE_UP:s=this._trimAlignValue(i+(this._valueMax()-this._valueMin())/n);break;case e.ui.keyCode.PAGE_DOWN:s=this._trimAlignValue(i-(this._valueMax()-this._valueMin())/n);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(i===this._valueMax())return;s=this._trimAlignValue(i+o);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(i===this._valueMin())return;s=this._trimAlignValue(i-o)}this._slide(t,u,s)},keyup:function(t){var n=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,n),this._change(t,n),e(t.target).removeClass("ui-state-active"))}}),this._refreshValue(),this._animateOff=!1},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var n,r,i,s,o,u,a,f,l=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),n={x:t.pageX,y:t.pageY},r=this._normValueFromMouse(n),i=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var n=Math.abs(r-l.values(t));i>n&&(i=n,s=e(this),o=t)}),c.range===!0&&this.values(1)===c.min&&(o+=1,s=e(this.handles[o])),u=this._start(t,o),u===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,s.addClass("ui-state-active").focus(),a=s.offset(),f=!e(t.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=f?{left:0,top:0}:{left:t.pageX-a.left-s.width()/2,top:t.pageY-a.top-s.height()/2-(parseInt(s.css("borderTopWidth"),10)||0)-(parseInt(s.css("borderBottomWidth"),10)||0)+(parseInt(s.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,r),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},n=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,n),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,n,r,i,s;return this.orientation==="horizontal"?(t=this.elementSize.width,n=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,n=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),r=n/t,r>1&&(r=1),r<0&&(r=0),this.orientation==="vertical"&&(r=1-r),i=this._valueMax()-this._valueMin(),s=this._valueMin()+r*i,this._trimAlignValue(s)},_start:function(e,t){var n={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("start",e,n)},_slide:function(e,t,n){var r,i,s;this.options.values&&this.options.values.length?(r=this.values(t?0:1),this.options.values.length===2&&this.options.range===!0&&(t===0&&n>r||t===1&&n<r)&&(n=r),n!==this.values(t)&&(i=this.values(),i[t]=n,s=this._trigger("slide",e,{handle:this.handles[t],value:n,values:i}),r=this.values(t?0:1),s!==!1&&this.values(t,n,!0))):n!==this.value()&&(s=this._trigger("slide",e,{handle:this.handles[t],value:n}),s!==!1&&this.value(n))},_stop:function(e,t){var n={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("stop",e,n)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var n={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(n.value=this.values(t),n.values=this.values()),this._trigger("change",e,n)}},value:function(e){if(arguments.length){this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0);return}return this._value()},values:function(t,n){var r,i,s;if(arguments.length>1){this.options.values[t]=this._trimAlignValue(n),this._refreshValue(),this._change(null,t);return}if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();r=this.options.values,i=arguments[0];for(s=0;s<r.length;s+=1)r[s]=this._trimAlignValue(i[s]),this._change(null,s);this._refreshValue()},_setOption:function(t,n){var r,i=0;e.isArray(this.options.values)&&(i=this.options.values.length),e.Widget.prototype._setOption.apply(this,arguments);switch(t){case"disabled":n?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.prop("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.prop("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(r=0;r<i;r+=1)this._change(null,r);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e),e},_values:function(e){var t,n,r;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t),t;n=this.options.values.slice();for(r=0;r<n.length;r+=1)n[r]=this._trimAlignValue(n[r]);return n},_trimAlignValue:function(e){if(e<=this._valueMin())return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,n=(e-this._valueMin())%t,r=e-n;return Math.abs(n)*2>=t&&(r+=n>0?t:-t),parseFloat(r.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var t,n,r,i,s,o=this.options.range,u=this.options,a=this,f=this._animateOff?!1:u.animate,l={};this.options.values&&this.options.values.length?this.handles.each(function(r){n=(a.values(r)-a._valueMin())/(a._valueMax()-a._valueMin())*100,l[a.orientation==="horizontal"?"left":"bottom"]=n+"%",e(this).stop(1,1)[f?"animate":"css"](l,u.animate),a.options.range===!0&&(a.orientation==="horizontal"?(r===0&&a.range.stop(1,1)[f?"animate":"css"]({left:n+"%"},u.animate),r===1&&a.range[f?"animate":"css"]({width:n-t+"%"},{queue:!1,duration:u.animate})):(r===0&&a.range.stop(1,1)[f?"animate":"css"]({bottom:n+"%"},u.animate),r===1&&a.range[f?"animate":"css"]({height:n-t+"%"},{queue:!1,duration:u.animate}))),t=n}):(r=this.value(),i=this._valueMin(),s=this._valueMax(),n=s!==i?(r-i)/(s-i)*100:0,l[this.orientation==="horizontal"?"left":"bottom"]=n+"%",this.handle.stop(1,1)[f?"animate":"css"](l,u.animate),o==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[f?"animate":"css"]({width:n+"%"},u.animate),o==="max"&&this.orientation==="horizontal"&&this.range[f?"animate":"css"]({width:100-n+"%"},{queue:!1,duration:u.animate}),o==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[f?"animate":"css"]({height:n+"%"},u.animate),o==="max"&&this.orientation==="vertical"&&this.range[f?"animate":"css"]({height:100-n+"%"},{queue:!1,duration:u.animate}))}})})(jQuery);(function(e,t){e.widget("ui.sortable",e.ui.mouse,{version:"1.9.1",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?e.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_setOption:function(t,n){t==="disabled"?(this.options[t]=n,this.widget().toggleClass("ui-sortable-disabled",!!n)):e.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(t,n){var r=this;if(this.reverting)return!1;if(this.options.disabled||this.options.type=="static")return!1;this._refreshItems(t);var i=null,s=e(t.target).parents().each(function(){if(e.data(this,r.widgetName+"-item")==r)return i=e(this),!1});e.data(t.target,r.widgetName+"-item")==r&&(i=e(t.target));if(!i)return!1;if(this.options.handle&&!n){var o=!1;e(this.options.handle,i).find("*").andSelf().each(function(){this==t.target&&(o=!0)});if(!o)return!1}return this.currentItem=i,this._removeCurrentsFromItems(),!0},_mouseStart:function(t,n,r){var i=this.options;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),i.containment&&this._setContainment(),i.cursor&&(e("body").css("cursor")&&(this._storedCursor=e("body").css("cursor")),e("body").css("cursor",i.cursor)),i.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",i.opacity)),i.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",i.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!r)for(var s=this.containers.length-1;s>=0;s--)this.containers[s]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var n=this.options,r=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<n.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+n.scrollSpeed:t.pageY-this.overflowOffset.top<n.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-n.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<n.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+n.scrollSpeed:t.pageX-this.overflowOffset.left<n.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-n.scrollSpeed)):(t.pageY-e(document).scrollTop()<n.scrollSensitivity?r=e(document).scrollTop(e(document).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<n.scrollSensitivity&&(r=e(document).scrollTop(e(document).scrollTop()+n.scrollSpeed)),t.pageX-e(document).scrollLeft()<n.scrollSensitivity?r=e(document).scrollLeft(e(document).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<n.scrollSensitivity&&(r=e(document).scrollLeft(e(document).scrollLeft()+n.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var i=this.items.length-1;i>=0;i--){var s=this.items[i],o=s.item[0],u=this._intersectsWithPointer(s);if(!u)continue;if(s.instance!==this.currentContainer)continue;if(o!=this.currentItem[0]&&this.placeholder[u==1?"next":"prev"]()[0]!=o&&!e.contains(this.placeholder[0],o)&&(this.options.type=="semi-dynamic"?!e.contains(this.element[0],o):!0)){this.direction=u==1?"down":"up";if(this.options.tolerance!="pointer"&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,n){if(!t)return;e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t);if(this.options.revert){var r=this,i=this.placeholder.offset();this.reverting=!0,e(this.helper).animate({left:i.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:i.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){r._clear(t)})}else this._clear(t,n);return!1},cancel:function(){if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var n=this._getItemsAsjQuery(t&&t.connected),r=[];return t=t||{},e(n).each(function(){var n=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[-=_](.+)/);n&&r.push((t.key||n[1]+"[]")+"="+(t.key&&t.expression?n[1]:n[2]))}),!r.length&&t.key&&r.push(t.key+"="),r.join("&")},toArray:function(t){var n=this._getItemsAsjQuery(t&&t.connected),r=[];return t=t||{},n.each(function(){r.push(e(t.item||this).attr(t.attribute||"id")||"")}),r},_intersectsWith:function(e){var t=this.positionAbs.left,n=t+this.helperProportions.width,r=this.positionAbs.top,i=r+this.helperProportions.height,s=e.left,o=s+e.width,u=e.top,a=u+e.height,f=this.offset.click.top,l=this.offset.click.left,c=r+f>u&&r+f<a&&t+l>s&&t+l<o;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?c:s<t+this.helperProportions.width/2&&n-this.helperProportions.width/2<o&&u<r+this.helperProportions.height/2&&i-this.helperProportions.height/2<a},_intersectsWithPointer:function(t){var n=this.options.axis==="x"||e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),r=this.options.axis==="y"||e.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),i=n&&r,s=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return i?this.floating?o&&o=="right"||s=="down"?2:1:s&&(s=="down"?2:1):!1},_intersectsWithSides:function(t){var n=e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),r=e.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),i=this._getDragVerticalDirection(),s=this._getDragHorizontalDirection();return this.floating&&s?s=="right"&&r||s=="left"&&!r:i&&(i=="down"&&n||i=="up"&&!n)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return e!=0&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return e!=0&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor==String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){var n=[],r=[],i=this._connectWith();if(i&&t)for(var s=i.length-1;s>=0;s--){var o=e(i[s]);for(var u=o.length-1;u>=0;u--){var a=e.data(o[u],this.widgetName);a&&a!=this&&!a.options.disabled&&r.push([e.isFunction(a.options.items)?a.options.items.call(a.element):e(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a])}}r.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var s=r.length-1;s>=0;s--)r[s][0].each(function(){n.push(this)});return e(n)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var n=0;n<t.length;n++)if(t[n]==e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var n=this.items,r=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],i=this._connectWith();if(i&&this.ready)for(var s=i.length-1;s>=0;s--){var o=e(i[s]);for(var u=o.length-1;u>=0;u--){var a=e.data(o[u],this.widgetName);a&&a!=this&&!a.options.disabled&&(r.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a))}}for(var s=r.length-1;s>=0;s--){var f=r[s][1],l=r[s][0];for(var u=0,c=l.length;u<c;u++){var h=e(l[u]);h.data(this.widgetName+"-item",f),n.push({item:h,instance:f,width:0,height:0,left:0,top:0})}}},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var n=this.items.length-1;n>=0;n--){var r=this.items[n];if(r.instance!=this.currentContainer&&this.currentContainer&&r.item[0]!=this.currentItem[0])continue;var i=this.options.toleranceElement?e(this.options.toleranceElement,r.item):r.item;t||(r.width=i.outerWidth(),r.height=i.outerHeight());var s=i.offset();r.left=s.left,r.top=s.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var n=this.containers.length-1;n>=0;n--){var s=this.containers[n].element.offset();this.containers[n].containerCache.left=s.left,this.containers[n].containerCache.top=s.top,this.containers[n].containerCache.width=this.containers[n].element.outerWidth(),this.containers[n].containerCache.height=this.containers[n].element.outerHeight()}return this},_createPlaceholder:function(t){t=t||this;var n=t.options;if(!n.placeholder||n.placeholder.constructor==String){var r=n.placeholder;n.placeholder={element:function(){var n=e(document.createElement(t.currentItem[0].nodeName)).addClass(r||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];return r||(n.style.visibility="hidden"),n},update:function(e,i){if(r&&!n.forcePlaceholderSize)return;i.height()||i.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),i.width()||i.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10))}}}t.placeholder=e(n.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),n.placeholder.update(t,t.placeholder)},_contactContainers:function(t){var n=null,r=null;for(var i=this.containers.length-1;i>=0;i--){if(e.contains(this.currentItem[0],this.containers[i].element[0]))continue;if(this._intersectsWith(this.containers[i].containerCache)){if(n&&e.contains(this.containers[i].element[0],n.element[0]))continue;n=this.containers[i],r=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0)}if(!n)return;if(this.containers.length===1)this.containers[r]._trigger("over",t,this._uiHash(this)),this.containers[r].containerCache.over=1;else{var s=1e4,o=null,u=this.containers[r].floating?"left":"top",a=this.containers[r].floating?"width":"height",f=this.positionAbs[u]+this.offset.click[u];for(var l=this.items.length-1;l>=0;l--){if(!e.contains(this.containers[r].element[0],this.items[l].item[0]))continue;if(this.items[l].item[0]==this.currentItem[0])continue;var c=this.items[l].item.offset()[u],h=!1;Math.abs(c-f)>Math.abs(c+this.items[l][a]-f)&&(h=!0,c+=this.items[l][a]),Math.abs(c-f)<s&&(s=Math.abs(c-f),o=this.items[l],this.direction=h?"up":"down")}if(!o&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[r],o?this._rearrange(t,o,null,!0):this._rearrange(t,null,this.containers[r].element,!0),this._trigger("change",t,this._uiHash()),this.containers[r]._trigger("change",t,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[r]._trigger("over",t,this._uiHash(this)),this.containers[r].containerCache.over=1}},_createHelper:function(t){var n=this.options,r=e.isFunction(n.helper)?e(n.helper.apply(this.element[0],[t,this.currentItem])):n.helper=="clone"?this.currentItem.clone():this.currentItem;return r.parents("body").length||e(n.appendTo!="parent"?n.appendTo:this.currentItem[0].parentNode)[0].appendChild(r[0]),r[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(r[0].style.width==""||n.forceHelperSize)&&r.width(this.currentItem.width()),(r[0].style.height==""||n.forceHelperSize)&&r.height(this.currentItem.height()),r},_adjustOffsetFromHelper:function(t){typeof t=="string"&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&e.ui.ie)t={top:0,left:0};return{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t=this.options;t.containment=="parent"&&(t.containment=this.helper[0].parentNode);if(t.containment=="document"||t.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e(t.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(e(t.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(t.containment)){var n=e(t.containment)[0],r=e(t.containment).offset(),i=e(n).css("overflow")!="hidden";this.containment=[r.left+(parseInt(e(n).css("borderLeftWidth"),10)||0)+(parseInt(e(n).css("paddingLeft"),10)||0)-this.margins.left,r.top+(parseInt(e(n).css("borderTopWidth"),10)||0)+(parseInt(e(n).css("paddingTop"),10)||0)-this.margins.top,r.left+(i?Math.max(n.scrollWidth,n.offsetWidth):n.offsetWidth)-(parseInt(e(n).css("borderLeftWidth"),10)||0)-(parseInt(e(n).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,r.top+(i?Math.max(n.scrollHeight,n.offsetHeight):n.offsetHeight)-(parseInt(e(n).css("borderTopWidth"),10)||0)-(parseInt(e(n).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(t,n){n||(n=this.position);var r=t=="absolute"?1:-1,i=this.options,s=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(s[0].tagName);return{top:n.top+this.offset.relative.top*r+this.offset.parent.top*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():o?0:s.scrollTop())*r,left:n.left+this.offset.relative.left*r+this.offset.parent.left*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():o?0:s.scrollLeft())*r}},_generatePosition:function(t){var n=this.options,r=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,i=/(html|body)/i.test(r[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var s=t.pageX,o=t.pageY;if(this.originalPosition){this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(s=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(s=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top));if(n.grid){var u=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1];o=this.containment?u-this.offset.click.top<this.containment[1]||u-this.offset.click.top>this.containment[3]?u-this.offset.click.top<this.containment[1]?u+n.grid[1]:u-n.grid[1]:u:u;var a=this.originalPageX+Math.round((s-this.originalPageX)/n.grid[0])*n.grid[0];s=this.containment?a-this.offset.click.left<this.containment[0]||a-this.offset.click.left>this.containment[2]?a-this.offset.click.left<this.containment[0]?a+n.grid[0]:a-n.grid[0]:a:a}}return{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():i?0:r.scrollTop()),left:s-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:r.scrollLeft())}},_rearrange:function(e,t,n,r){n?n[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var i=this.counter;this._delay(function(){i==this.counter&&this.refreshPositions(!r)})},_clear:function(t,n){this.reverting=!1;var r=[];!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var i in this._storedCSS)if(this._storedCSS[i]=="auto"||this._storedCSS[i]=="static")this._storedCSS[i]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!n&&r.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!n&&r.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(n||(r.push(function(e){this._trigger("remove",e,this._uiHash())}),r.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),r.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer))));for(var i=this.containers.length-1;i>=0;i--)n||r.push(function(e){return function(t){e._trigger("deactivate",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over&&(r.push(function(e){return function(t){e._trigger("out",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over=0);this._storedCursor&&e("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!n){this._trigger("beforeStop",t,this._uiHash());for(var i=0;i<r.length;i++)r[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!1}n||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!n){for(var i=0;i<r.length;i++)r[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var n=t||this;return{helper:n.helper,placeholder:n.placeholder||e([]),position:n.position,originalPosition:n.originalPosition,offset:n.positionAbs,item:n.currentItem,sender:t?t.element:null}}})})(jQuery);(function(e){function t(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.widget("ui.spinner",{version:"1.9.1",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t={},n=this.element;return e.each(["min","max","step"],function(e,r){var i=n.attr(r);i!==undefined&&i.length&&(t[r]=i)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){if(this.cancelBlur){delete this.cancelBlur;return}this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e)},mousewheel:function(e,t){if(!t)return;if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()},"mousedown .ui-spinner-button":function(t){function r(){var e=this.element[0]===this.document[0].activeElement;e||(this.element.focus(),this.previous=n,this._delay(function(){this.previous=n}))}var n;n=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),r.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,r.call(this)});if(this._start(t)===!1)return;this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){if(!e(t.currentTarget).hasClass("ui-state-active"))return;if(this._start(t)===!1)return!1;this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var e=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=e.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(e.height()*.5)&&e.height()>0&&e.height(e.height()),this.options.disabled&&this.disable()},_keydown:function(t){var n=this.options,r=e.ui.keyCode;switch(t.keyCode){case r.UP:return this._repeat(null,1,t),!0;case r.DOWN:return this._repeat(null,-1,t),!0;case r.PAGE_UP:return this._repeat(null,n.page,t),!0;case r.PAGE_DOWN:return this._repeat(null,-n.page,t),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"},_start:function(e){return!this.spinning&&this._trigger("start",e)===!1?!1:(this.counter||(this.counter=1),this.spinning=!0,!0)},_repeat:function(e,t,n){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,n)},e),this._spin(t*this.options.step,n)},_spin:function(e,t){var n=this.value()||0;this.counter||(this.counter=1),n=this._adjustValue(n+e*this._increment(this.counter));if(!this.spinning||this._trigger("spin",t,{value:n})!==!1)this._value(n),this.counter++},_increment:function(t){var n=this.options.incremental;return n?e.isFunction(n)?n(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return this.options.min!==null&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=e.toString(),n=t.indexOf(".");return n===-1?0:t.length-n-1},_adjustValue:function(e){var t,n,r=this.options;return t=r.min!==null?r.min:0,n=e-t,n=Math.round(n/r.step)*r.step,e=t+n,e=parseFloat(e.toFixed(this._precision())),r.max!==null&&e>r.max?r.max:r.min!==null&&e<r.min?r.min:e},_stop:function(e){if(!this.spinning)return;clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e)},_setOption:function(e,t){if(e==="culture"||e==="numberFormat"){var n=this._parse(this.element.val());this.options[e]=t,this.element.val(this._format(n));return}(e==="max"||e==="min"||e==="step")&&typeof t=="string"&&(t=this._parse(t)),this._super(e,t),e==="disabled"&&(t?(this.element.prop("disabled",!0),this.buttons.button("disable")):(this.element.prop("disabled",!1),this.buttons.button("enable")))},_setOptions:t(function(e){this._super(e),this._value(this.element.val())}),_parse:function(e){return typeof e=="string"&&e!==""&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),e===""||isNaN(e)?null:e},_format:function(e){return e===""?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},_value:function(e,t){var n;e!==""&&(n=this._parse(e),n!==null&&(t||(n=this._adjustValue(n)),e=this._format(n))),this.element.val(e),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:t(function(e){this._stepUp(e)}),_stepUp:function(e){this._spin((e||1)*this.options.step)},stepDown:t(function(e){this._stepDown(e)}),_stepDown:function(e){this._spin((e||1)*-this.options.step)},pageUp:t(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:t(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){if(!arguments.length)return this._parse(this.element.val());t(this._value).call(this,e)},widget:function(){return this.uiSpinner}})})(jQuery);(function(e,t){function i(){return++n}function s(e){return e.hash.length>1&&e.href.replace(r,"")===location.href.replace(r,"")}var n=0,r=/#.*$/;e.widget("ui.tabs",{version:"1.9.1",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_create:function(){var t=this,n=this.options,r=n.active,i=location.hash.substring(1);this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",n.collapsible).delegate(".ui-tabs-nav > li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this._processTabs();if(r===null){i&&this.tabs.each(function(t,n){if(e(n).attr("aria-controls")===i)return r=t,!1}),r===null&&(r=this.tabs.index(this.tabs.filter(".ui-tabs-active")));if(r===null||r===-1)r=this.tabs.length?0:!1}r!==!1&&(r=this.tabs.index(this.tabs.eq(r)),r===-1&&(r=n.collapsible?!1:0)),n.active=r,!n.collapsible&&n.active===!1&&this.anchors.length&&(n.active=0),e.isArray(n.disabled)&&(n.disabled=e.unique(n.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),this.options.active!==!1&&this.anchors.length?this.active=this._findActive(this.options.active):this.active=e(),this._refresh(),this.active.length&&this.load(n.active)},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(t){var n=e(this.document[0].activeElement).closest("li"),r=this.tabs.index(n),i=!0;if(this._handlePageNav(t))return;switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:r++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:i=!1,r--;break;case e.ui.keyCode.END:r=this.anchors.length-1;break;case e.ui.keyCode.HOME:r=0;break;case e.ui.keyCode.SPACE:t.preventDefault(),clearTimeout(this.activating),this._activate(r);return;case e.ui.keyCode.ENTER:t.preventDefault(),clearTimeout(this.activating),this._activate(r===this.options.active?!1:r);return;default:return}t.preventDefault(),clearTimeout(this.activating),r=this._focusNextTab(r,i),t.ctrlKey||(n.attr("aria-selected","false"),this.tabs.eq(r).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",r)},this.delay))},_panelKeydown:function(t){if(this._handlePageNav(t))return;t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus())},_handlePageNav:function(t){if(t.altKey&&t.keyCode===e.ui.keyCode.PAGE_UP)return this._activate(this._focusNextTab(this.options.active-1,!1)),!0;if(t.altKey&&t.keyCode===e.ui.keyCode.PAGE_DOWN)return this._activate(this._focusNextTab(this.options.active+1,!0)),!0},_findNextTab:function(t,n){function i(){return t>r&&(t=0),t<0&&(t=r),t}var r=this.tabs.length-1;while(e.inArray(i(),this.options.disabled)!==-1)t=n?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e},_setOption:function(e,t){if(e==="active"){this._activate(t);return}if(e==="disabled"){this._setupDisabled(t);return}this._super(e,t),e==="collapsible"&&(this.element.toggleClass("ui-tabs-collapsible",t),!t&&this.options.active===!1&&this._activate(0)),e==="event"&&this._setupEvents(t),e==="heightStyle"&&this._setupHeightStyle(t)},_tabId:function(e){return e.attr("aria-controls")||"ui-tabs-"+i()},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,n=this.tablist.children(":has(a[href])");t.disabled=e.map(n.filter(".ui-state-disabled"),function(e){return n.index(e)}),this._processTabs(),t.active===!1||!this.anchors.length?(t.active=!1,this.active=e()):this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded":"false","aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-expanded":"true","aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist"),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=e(),this.anchors.each(function(n,r){var i,o,u,a=e(r).uniqueId().attr("id"),f=e(r).closest("li"),l=f.attr("aria-controls");s(r)?(i=r.hash,o=t.element.find(t._sanitizeSelector(i))):(u=t._tabId(f),i="#"+u,o=t.element.find(i),o.length||(o=t._createPanel(u),o.insertAfter(t.panels[n-1]||t.tablist)),o.attr("aria-live","polite")),o.length&&(t.panels=t.panels.add(o)),l&&f.data("ui-tabs-aria-controls",l),f.attr({"aria-controls":i.substring(1),"aria-labelledby":a}),o.attr("aria-labelledby",a)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel")},_getList:function(){return this.element.find("ol,ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(t){e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1);for(var n=0,r;r=this.tabs[n];n++)t===!0||e.inArray(n,t)!==-1?e(r).addClass("ui-state-disabled").attr("aria-disabled","true"):e(r).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=t},_setupEvents:function(t){var n={click:function(e){e.preventDefault()}};t&&e.each(t.split(" "),function(e,t){n[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(this.anchors,n),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var n,r,i=this.element.parent();t==="fill"?(e.support.minHeight||(r=i.css("overflow"),i.css("overflow","hidden")),n=i.height(),this.element.siblings(":visible").each(function(){var t=e(this),r=t.css("position");if(r==="absolute"||r==="fixed")return;n-=t.outerHeight(!0)}),r&&i.css("overflow",r),this.element.children().not(this.panels).each(function(){n-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,n-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):t==="auto"&&(n=0,this.panels.each(function(){n=Math.max(n,e(this).height("").height())}).height(n))},_eventHandler:function(t){var n=this.options,r=this.active,i=e(t.currentTarget),s=i.closest("li"),o=s[0]===r[0],u=o&&n.collapsible,a=u?e():this._getPanelForTab(s),f=r.length?this._getPanelForTab(r):e(),l={oldTab:r,oldPanel:f,newTab:u?e():s,newPanel:a};t.preventDefault();if(s.hasClass("ui-state-disabled")||s.hasClass("ui-tabs-loading")||this.running||o&&!n.collapsible||this._trigger("beforeActivate",t,l)===!1)return;n.active=u?!1:this.tabs.index(s),this.active=o?e():s,this.xhr&&this.xhr.abort(),!f.length&&!a.length&&e.error("jQuery UI Tabs: Mismatching fragment identifier."),a.length&&this.load(this.tabs.index(s),t),this._toggle(t,l)},_toggle:function(t,n){function o(){r.running=!1,r._trigger("activate",t,n)}function u(){n.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),i.length&&r.options.show?r._show(i,r.options.show,o):(i.show(),o())}var r=this,i=n.newPanel,s=n.oldPanel;this.running=!0,s.length&&this.options.hide?this._hide(s,this.options.hide,function(){n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),u()}):(n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),s.hide(),u()),s.attr({"aria-expanded":"false","aria-hidden":"true"}),n.oldTab.attr("aria-selected","false"),i.length&&s.length?n.oldTab.attr("tabIndex",-1):i.length&&this.tabs.filter(function(){return e(this).attr("tabIndex")===0}).attr("tabIndex",-1),i.attr({"aria-expanded":"true","aria-hidden":"false"}),n.newTab.attr({"aria-selected":"true",tabIndex:0})},_activate:function(t){var n,r=this._findActive(t);if(r[0]===this.active[0])return;r.length||(r=this.active),n=r.find(".ui-tabs-anchor")[0],this._eventHandler({target:n,currentTarget:n,preventDefault:e.noop})},_findActive:function(t){return t===!1?e():this.tabs.eq(t)},_getIndex:function(e){return typeof e=="string"&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeData("href.tabs").removeData("load.tabs").removeUniqueId(),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var t=e(this),n=t.data("ui-tabs-aria-controls");n?t.attr("aria-controls",n):t.removeAttr("aria-controls")}),this.options.heightStyle!=="content"&&this.panels.css("height","")},enable:function(n){var r=this.options.disabled;if(r===!1)return;n===t?r=!1:(n=this._getIndex(n),e.isArray(r)?r=e.map(r,function(e){return e!==n?e:null}):r=e.map(this.tabs,function(e,t){return t!==n?t:null})),this._setupDisabled(r)},disable:function(n){var r=this.options.disabled;if(r===!0)return;if(n===t)r=!0;else{n=this._getIndex(n);if(e.inArray(n,r)!==-1)return;e.isArray(r)?r=e.merge([n],r).sort():r=[n]}this._setupDisabled(r)},load:function(t,n){t=this._getIndex(t);var r=this,i=this.tabs.eq(t),o=i.find(".ui-tabs-anchor"),u=this._getPanelForTab(i),a={tab:i,panel:u};if(s(o[0]))return;this.xhr=e.ajax(this._ajaxSettings(o,n,a)),this.xhr&&this.xhr.statusText!=="canceled"&&(i.addClass("ui-tabs-loading"),u.attr("aria-busy","true"),this.xhr.success(function(e){setTimeout(function(){u.html(e),r._trigger("load",n,a)},1)}).complete(function(e,t){setTimeout(function(){t==="abort"&&r.panels.stop(!1,!0),i.removeClass("ui-tabs-loading"),u.removeAttr("aria-busy"),e===r.xhr&&delete r.xhr},1)}))},_ajaxSettings:function(t,n,r){var i=this;return{url:t.attr("href"),beforeSend:function(t,s){return i._trigger("beforeLoad",n,e.extend({jqXHR:t,ajaxSettings:s},r))}}},_getPanelForTab:function(t){var n=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+n))}}),e.uiBackCompat!==!1&&(e.ui.tabs.prototype._ui=function(e,t){return{tab:e,panel:t,index:this.anchors.index(e)}},e.widget("ui.tabs",e.ui.tabs,{url:function(e,t){this.anchors.eq(e).attr("href",t)}}),e.widget("ui.tabs",e.ui.tabs,{options:{ajaxOptions:null,cache:!1},_create:function(){this._super();var t=this;this._on({tabsbeforeload:function(n,r){if(e.data(r.tab[0],"cache.tabs")){n.preventDefault();return}r.jqXHR.success(function(){t.options.cache&&e.data(r.tab[0],"cache.tabs",!0)})}})},_ajaxSettings:function(t,n,r){var i=this.options.ajaxOptions;return e.extend({},i,{error:function(e,t){try{i.error(e,t,r.tab.closest("li").index(),r.tab[0])}catch(n){}}},this._superApply(arguments))},_setOption:function(e,t){e==="cache"&&t===!1&&this.anchors.removeData("cache.tabs"),this._super(e,t)},_destroy:function(){this.anchors.removeData("cache.tabs"),this._super()},url:function(e){this.anchors.eq(e).removeData("cache.tabs"),this._superApply(arguments)}}),e.widget("ui.tabs",e.ui.tabs,{abort:function(){this.xhr&&this.xhr.abort()}}),e.widget("ui.tabs",e.ui.tabs,{options:{spinner:"<em>Loading&#8230;</em>"},_create:function(){this._super(),this._on({tabsbeforeload:function(e,t){if(e.target!==this.element[0]||!this.options.spinner)return;var n=t.tab.find("span"),r=n.html();n.html(this.options.spinner),t.jqXHR.complete(function(){n.html(r)})}})}}),e.widget("ui.tabs",e.ui.tabs,{options:{enable:null,disable:null},enable:function(t){var n=this.options,r;if(t&&n.disabled===!0||e.isArray(n.disabled)&&e.inArray(t,n.disabled)!==-1)r=!0;this._superApply(arguments),r&&this._trigger("enable",null,this._ui(this.anchors[t],this.panels[t]))},disable:function(t){var n=this.options,r;if(t&&n.disabled===!1||e.isArray(n.disabled)&&e.inArray(t,n.disabled)===-1)r=!0;this._superApply(arguments),r&&this._trigger("disable",null,this._ui(this.anchors[t],this.panels[t]))}}),e.widget("ui.tabs",e.ui.tabs,{options:{add:null,remove:null,tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},add:function(n,r,i){i===t&&(i=this.anchors.length);var s,o,u=this.options,a=e(u.tabTemplate.replace(/#\{href\}/g,n).replace(/#\{label\}/g,r)),f=n.indexOf("#")?this._tabId(a):n.replace("#","");return a.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy",!0),a.attr("aria-controls",f),s=i>=this.tabs.length,o=this.element.find("#"+f),o.length||(o=this._createPanel(f),s?i>0?o.insertAfter(this.panels.eq(-1)):o.appendTo(this.element):o.insertBefore(this.panels[i])),o.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide(),s?a.appendTo(this.tablist):a.insertBefore(this.tabs[i]),u.disabled=e.map(u.disabled,function(e){return e>=i?++e:e}),this.refresh(),this.tabs.length===1&&u.active===!1&&this.option("active",0),this._trigger("add",null,this._ui(this.anchors[i],this.panels[i])),this},remove:function(t){t=this._getIndex(t);var n=this.options,r=this.tabs.eq(t).remove(),i=this._getPanelForTab(r).remove();return r.hasClass("ui-tabs-active")&&this.anchors.length>2&&this._activate(t+(t+1<this.anchors.length?1:-1)),n.disabled=e.map(e.grep(n.disabled,function(e){return e!==t}),function(e){return e>=t?--e:e}),this.refresh(),this._trigger("remove",null,this._ui(r.find("a")[0],i[0])),this}}),e.widget("ui.tabs",e.ui.tabs,{length:function(){return this.anchors.length}}),e.widget("ui.tabs",e.ui.tabs,{options:{idPrefix:"ui-tabs-"},_tabId:function(t){var n=t.is("li")?t.find("a[href]"):t;return n=n[0],e(n).closest("li").attr("aria-controls")||n.title&&n.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF\-]/g,"")||this.options.idPrefix+i()}}),e.widget("ui.tabs",e.ui.tabs,{options:{panelTemplate:"<div></div>"},_createPanel:function(t){return e(this.options.panelTemplate).attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)}}),e.widget("ui.tabs",e.ui.tabs,{_create:function(){var e=this.options;e.active===null&&e.selected!==t&&(e.active=e.selected===-1?!1:e.selected),this._super(),e.selected=e.active,e.selected===!1&&(e.selected=-1)},_setOption:function(e,t){if(e!=="selected")return this._super(e,t);var n=this.options;this._super("active",t===-1?!1:t),n.selected=n.active,n.selected===!1&&(n.selected=-1)},_eventHandler:function(){this._superApply(arguments),this.options.selected=this.options.active,this.options.selected===!1&&(this.options.selected=-1)}}),e.widget("ui.tabs",e.ui.tabs,{options:{show:null,select:null},_create:function(){this._super(),this.options.active!==!1&&this._trigger("show",null,this._ui(this.active.find(".ui-tabs-anchor")[0],this._getPanelForTab(this.active)[0]))},_trigger:function(e,t,n){var r=this._superApply(arguments);return r?(e==="beforeActivate"&&n.newTab.length?r=this._super("select",t,{tab:n.newTab.find(".ui-tabs-anchor")[0],panel:n.newPanel[0],index:n.newTab.closest("li").index()}):e==="activate"&&n.newTab.length&&(r=this._super("show",t,{tab:n.newTab.find(".ui-tabs-anchor")[0],panel:n.newPanel[0],index:n.newTab.closest("li").index()})),r):!1}}),e.widget("ui.tabs",e.ui.tabs,{select:function(e){e=this._getIndex(e);if(e===-1){if(!this.options.collapsible||this.options.selected===-1)return;e=this.options.selected}this.anchors.eq(e).trigger(this.options.event+this.eventNamespace)}}),function(){var t=0;e.widget("ui.tabs",e.ui.tabs,{options:{cookie:null},_create:function(){var e=this.options,t;e.active==null&&e.cookie&&(t=parseInt(this._cookie(),10),t===-1&&(t=!1),e.active=t),this._super()},_cookie:function(n){var r=[this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+ ++t)];return arguments.length&&(r.push(n===!1?-1:n),r.push(this.options.cookie)),e.cookie.apply(null,r)},_refresh:function(){this._super(),this.options.cookie&&this._cookie(this.options.active,this.options.cookie)},_eventHandler:function(){this._superApply(arguments),this.options.cookie&&this._cookie(this.options.active,this.options.cookie)},_destroy:function(){this._super(),this.options.cookie&&this._cookie(null,this.options.cookie)}})}(),e.widget("ui.tabs",e.ui.tabs,{_trigger:function(t,n,r){var i=e.extend({},r);return t==="load"&&(i.panel=i.panel[0],i.tab=i.tab.find(".ui-tabs-anchor")[0]),this._super(t,n,i)}}),e.widget("ui.tabs",e.ui.tabs,{options:{fx:null},_getFx:function(){var t,n,r=this.options.fx;return r&&(e.isArray(r)?(t=r[0],n=r[1]):t=n=r),r?{show:n,hide:t}:null},_toggle:function(e,t){function o(){n.running=!1,n._trigger("activate",e,t)}function u(){t.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),r.length&&s.show?r.animate(s.show,s.show.duration,function(){o()}):(r.show(),o())}var n=this,r=t.newPanel,i=t.oldPanel,s=this._getFx();if(!s)return this._super(e,t);n.running=!0,i.length&&s.hide?i.animate(s.hide,s.hide.duration,function(){t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),u()}):(t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),i.hide(),u())}}))})(jQuery);(function(e){function n(t,n){var r=(t.attr("aria-describedby")||"").split(/\s+/);r.push(n),t.data("ui-tooltip-id",n).attr("aria-describedby",e.trim(r.join(" ")))}function r(t){var n=t.data("ui-tooltip-id"),r=(t.attr("aria-describedby")||"").split(/\s+/),i=e.inArray(n,r);i!==-1&&r.splice(i,1),t.removeData("ui-tooltip-id"),r=e.trim(r.join(" ")),r?t.attr("aria-describedby",r):t.removeAttr("aria-describedby")}var t=0;e.widget("ui.tooltip",{version:"1.9.1",options:{content:function(){return e(this).attr("title")},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flipfit"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(t,n){var r=this;if(t==="disabled"){this[n?"_disable":"_enable"](),this.options[t]=n;return}this._super(t,n),t==="content"&&e.each(this.tooltips,function(e,t){r._updateContent(t)})},_disable:function(){var t=this;e.each(this.tooltips,function(n,r){var i=e.Event("blur");i.target=i.currentTarget=r[0],t.close(i,!0)}),this.element.find(this.options.items).andSelf().each(function(){var t=e(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).andSelf().each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))})},open:function(t){var n=this,r=e(t?t.target:this.element).closest(this.options.items);if(!r.length)return;if(this.options.track&&r.data("ui-tooltip-id")){this._find(r).position(e.extend({of:r},this.options.position)),this._off(this.document,"mousemove");return}r.attr("title")&&r.data("ui-tooltip-title",r.attr("title")),r.data("tooltip-open",!0),t&&t.type==="mouseover"&&r.parents().each(function(){var t;e(this).data("tooltip-open")&&(t=e.Event("blur"),t.target=t.currentTarget=this,n.close(t,!0)),this.title&&(e(this).uniqueId(),n.parents[this.id]={element:this,title:this.title},this.title="")}),this._updateContent(r,t)},_updateContent:function(e,t){var n,r=this.options.content,i=this;if(typeof r=="string")return this._open(t,e,r);n=r.call(e[0],function(n){if(!e.data("tooltip-open"))return;i._delay(function(){this._open(t,e,n)})}),n&&this._open(t,e,n)},_open:function(t,r,i){function f(e){a.of=e;if(s.is(":hidden"))return;s.position(a)}var s,o,u,a=e.extend({},this.options.position);if(!i)return;s=this._find(r);if(s.length){s.find(".ui-tooltip-content").html(i);return}r.is("[title]")&&(t&&t.type==="mouseover"?r.attr("title",""):r.removeAttr("title")),s=this._tooltip(r),n(r,s.attr("id")),s.find(".ui-tooltip-content").html(i),this.options.track&&t&&/^mouse/.test(t.originalEvent.type)?(this._on(this.document,{mousemove:f}),f(t)):s.position(e.extend({of:r},this.options.position)),s.hide(),this._show(s,this.options.show),this.options.show&&this.options.show.delay&&(u=setInterval(function(){s.is(":visible")&&(f(a.of),clearInterval(u))},e.fx.interval)),this._trigger("open",t,{tooltip:s}),o={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var n=e.Event(t);n.currentTarget=r[0],this.close(n,!0)}},remove:function(){this._removeTooltip(s)}};if(!t||t.type==="mouseover")o.mouseleave="close";if(!t||t.type==="focusin")o.focusout="close";this._on(r,o)},close:function(t){var n=this,i=e(t?t.currentTarget:this.element),s=this._find(i);if(this.closing)return;i.data("ui-tooltip-title")&&i.attr("title",i.data("ui-tooltip-title")),r(i),s.stop(!0),this._hide(s,this.options.hide,function(){n._removeTooltip(e(this))}),i.removeData("tooltip-open"),this._off(i,"mouseleave focusout keyup"),i[0]!==this.element[0]&&this._off(i,"remove"),this._off(this.document,"mousemove"),t&&t.type==="mouseleave"&&e.each(this.parents,function(e,t){t.element.title=t.title,delete n.parents[e]}),this.closing=!0,this._trigger("close",t,{tooltip:s}),this.closing=!1},_tooltip:function(n){var r="ui-tooltip-"+t++,i=e("<div>").attr({id:r,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return e("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),e.fn.bgiframe&&i.bgiframe(),this.tooltips[r]=n,i},_find:function(t){var n=t.data("ui-tooltip-id");return n?e("#"+n):e()},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_destroy:function(){var t=this;e.each(this.tooltips,function(n,r){var i=e.Event("blur");i.target=i.currentTarget=r[0],t.close(i,!0),e("#"+n).remove(),r.data("ui-tooltip-title")&&(r.attr("title",r.data("ui-tooltip-title")),r.removeData("ui-tooltip-title"))})}})})(jQuery);
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
	  /*$("#shopDrop").bgiframe({ opacity: false });*/
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
							
							html += '<div class="clearfix"></div><ul class="ItemsChoicePDP">';		
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
							
							html += '<div class="clearfix"></div><ul class="ItemsChoicePDP">';	
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
						
						html += '<div class="clearfix"></div><ul class="ItemsChoicePDP">';	
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
				var liSize = $(".ItemsChoicePDP").find("li:gt(2)");
				//add a class to hide the li 
				$(liSize).addClass('hideLi');
				$(liSize).parent().addClass('add-SeeAll');
				$('.add-SeeAll').after('<a href="#/" class="seeallLink">...See all</a>');		
					
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
		$("body").delegate("ul.ItemsChoicePDP li a", "mousemove", function(e){
			$('#'+spid).offset({left:e.pageX - 53, top:e.pageY - 134});
		});
	}
	/* Function		: fnHidePopUp takes the ID as input parameter */	
	/* Last Editor	: Sathya */
	/* Date			: 03/27/2012 */
	/* Comment		: This method is used to hide the child pop-up corresponding to the ID */
	function fnHidePopUp(id){
		document.getElementById(id).style.display='none';
		$("body").undelegate("ul.ItemsChoicePDP li a","mousemove");
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
								$('.Protectionplan-Overlay-Container').css("left","80px");
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
								$('.Protectionplan-Overlay-Container').css("left","80px");
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
									$('.Protectionplan-Overlay-Container').css("left","80px");
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
				$('#'+commerceItemId).css("left","80px");
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
					var xPos = sfOffset.left  - ($('.simpleSaverToolTip').width())/2 +15;					
					var yPos = sfOffset.top  - ($('.simpleSaverToolTip').height())*2;					
				
						if ($(this).parents('div').hasClass("simpleSaverLogoSideCart")){
						//positioning for side cart related bubble
							// reset position of info box
							beingShown = true;
							info.css({
							top: -110,							
							display: 'block'							
						}).animate({
							top: '-110px'
						}, time, 'swing', function() {
							beingShown = false;
							shown = true;
							});
						}else{
						//positioning for non side cart related bubble
						// reset position of info box
							beingShown = true;
							info.css({
							top: -93,
							left:0,
							display: 'block'							
						}).animate({
							top: '-93'
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
function fnOpenPPDetailsOverlaypCart(protectionPlanItemId){		
	var ppDetailsPostion = $(document).scrollTop();
	ppDetailsPostion = ppDetailsPostion + 20;	
	$('.persistentCart').append('<div class="ProtectionplanDetails-Overlay-Container"></div>');
	$('.ProtectionplanDetails-Overlay-Container').css('display','block');
	$('.ProtectionplanDetails-Overlay-Container').empty();
	$.ajax({               
				type: "GET",
				url:'/sams/cart/protectionPlanDetails.jsp',
				data: 'ppItemId='+protectionPlanItemId,				
				cache: false,
				success: function(ppContent) {	
					$('.ProtectionplanDetails-Overlay-Container').html(ppContent); 
				}
		});
		$('.ProtectionplanDetails-Overlay-Container').css("top",ppDetailsPostion);		
		$('.ProtectionplanDetails-Overlay-Container').css("position","absolute");
		$('.ProtectionplanDetails-Overlay-Container').css("left","150px");		
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
		$('#'+commerceItemId).css("left","80px");
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
							$('.Protectionplan-Overlay-Container').css("left","80px");
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
                  // $('#ajaxCartLoad').html(result); 
				    $('.persistentCart').html(result); 
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
/* Start PASupport 13.2 S2 Changes */

function joinNowButton(membershipType){
	var targetURL = '/sams/common/purchasemembership.jsp';
    $.ajax({
	    type: 'GET',
	    url : targetURL,
	    cache:false,                                                        
	    data: "membershipType="+membershipType,                                                                                    
	    success:function(responseElement){
		    if(responseElement == ''){                            
		        window.location.href="/sams/checkout/membership/purchaseMembership.jsp?tab=information";
		    }else{
		         $("#aboutSamsError").replaceWith(responseElement);        
		    }                                                                                                                                                              
		},
		error: function(responseElement){				
			$("#aboutSamsError").replaceWith(responseElement);	
	    }
    });
}
function submitCheckoutForm() {
	if(document.getElementById('aam') && document.getElementById('aam').checked) {
		document.checkoutAdvantageItem.submit();
     } else {
	    document.checkoutNowForm.submit();
     }
}
$(document).ready(function() { 
	$('.checkOutBtn').click(function(){
		var displayOverlayType = this.id;
		if (displayOverlayType != null && displayOverlayType != "" && displayOverlayType != "none") {
			/*Ajax call starts*/ 
			$.ajax({
				type: 'GET',
				url : '/sams/account/membership/membershipRenewalOverlay.jsp',
				cache:false,				
				data: 'displayOverlayType='+displayOverlayType,						
				success:function(responseOBJ){				
						$('#overlayHolder').html(responseOBJ);
						$('#overlayHolder').css('display','block')
						$('#overlayHolder').fadeIn('fast');
					
				},
				error: function(responseOBJ, status, xhr){							
						var msg = "Sorry but there was an error: ";
						$('#overlayHolder').html(msg + xhr.status + " " + xhr.statusText);
						$('#overlayHolder').css('display','block');
				}						
			});
			/*Ajax call ends*/
			return false;
		} else {
			return true;
		}
	});
	$('.overlayHead img').live("click",function(){
	        $('#overlayHolder').fadeOut('fast',function(){
	        submitCheckoutForm();
	    });
	});
	$('.toggleDet').live("click",function(){
		$('.toggleDet a').toggle();
		$('.membDetails').toggle();		
	});
	$('#renewOverlayCtnBtn').live("click",function(){
		var form  = document.getElementById("renewMembershipOverlay");
		var itemTypeEle = form.itemType;
		var itemType = '';
		for (i=0; i < itemTypeEle.length; i++) {
            if (itemTypeEle[i].checked == true) {
            	itemType = itemTypeEle[i].value;
            	break;
           	}
        }
		if (itemType == "renew" || itemType == "upgrade") {
			form.submit();
		} else {
			if ($('#dontShow').attr('checked')) {
				$('#displayRenewalOverlay').val("false");
			}
			submitCheckoutForm();
		}
	});
	
});	
/* End PASupport 13.2 S2 Changes */
/* Adding the CSS Selector style on the page load */
$(document).ready(function(){					
	$('ul.topSellerItems li:first-child').addClass( 'FirstItem' );
})
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
																							$("div.sortSide p a.right").replaceWith(
																									$(this).html().replace(
																											$("span#club_name").html(),
																											$.trim($("span#club_name").html().split("#")[0])
																									)
																							);
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
																						}
																				);
																			} else {
																				$("div.sortSide span[id^=clubLocatorLink] a").fadeOut(400,function(){
																					$(this).html(
																							$.trim($("span#club_name").html().split("#")[0]) + "&nbsp;" + "Club" + '<span class="arrow"></span>'
																					);
																					$(this).fadeIn(400);
																				});
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
											$("#f_sel_tire_brand").val($("#brand").find("option[value='"+srchCatId+"']").html());
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
