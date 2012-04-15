/*
 * VSD Plugins
 * @Includes
 * jQuery JavaScript Library v1.4.4
 * jQuery UI 1.8.4
 * jQuery UI Widget 1.8.4
 * jQuery UI Mouse 1.8.4
 * jQuery UI Position 1.8.4
 * jQuery UI Datepicker 1.8.11
 * jQuery UI Slider 1.8.6
 * DD_belatedPNG
 * Cufon version 1.09i
 * Helvetica Neue LT Std Light
 * Helvetica Neue LT Std
 * AnythingZoomer
 * preload
 * OS scrollbar
 * jQuery UI selectmenu
 * jQuery Tools 1.2.5 Tooltip - UI essentials
 * jScrollPane
 * MouseWheel
 * VSD Overlay
 * VSD errorhanlding
 * Date Format 1.2.3
 * vsdselectmenu
 * toTitleCase
 * Masked Input plugin for jQuery v1.3
 * jQuery.getCSS
 * Exists
 * cartMenu
 * date format
 * shoppingBag
 * shoppingBagItem
*/
/*!
 * jQuery JavaScript Library v1.4.4
 */
(function(E,B){function ka(a,b,d){if(d===B&&a.nodeType===1){d=a.getAttribute("data-"+b);if(typeof d==="string"){try{d=d==="true"?true:d==="false"?false:d==="null"?null:!c.isNaN(d)?parseFloat(d):Ja.test(d)?c.parseJSON(d):d}catch(e){}c.data(a,b,d)}else d=B}return d}function U(){return false}function ca(){return true}function la(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function Ka(a){var b,d,e,f,h,l,k,o,x,r,A,C=[];f=[];h=c.data(this,this.nodeType?"events":"__events__");if(typeof h==="function")h=
h.events;if(!(a.liveFired===this||!h||!h.live||a.button&&a.type==="click")){if(a.namespace)A=RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)");a.liveFired=this;var J=h.live.slice(0);for(k=0;k<J.length;k++){h=J[k];h.origType.replace(X,"")===a.type?f.push(h.selector):J.splice(k--,1)}f=c(a.target).closest(f,a.currentTarget);o=0;for(x=f.length;o<x;o++){r=f[o];for(k=0;k<J.length;k++){h=J[k];if(r.selector===h.selector&&(!A||A.test(h.namespace))){l=r.elem;e=null;if(h.preType==="mouseenter"||
h.preType==="mouseleave"){a.type=h.preType;e=c(a.relatedTarget).closest(h.selector)[0]}if(!e||e!==l)C.push({elem:l,handleObj:h,level:r.level})}}}o=0;for(x=C.length;o<x;o++){f=C[o];if(d&&f.level>d)break;a.currentTarget=f.elem;a.data=f.handleObj.data;a.handleObj=f.handleObj;A=f.handleObj.origHandler.apply(f.elem,arguments);if(A===false||a.isPropagationStopped()){d=f.level;if(A===false)b=false;if(a.isImmediatePropagationStopped())break}}return b}}function Y(a,b){return(a&&a!=="*"?a+".":"")+b.replace(La,
"`").replace(Ma,"&")}function ma(a,b,d){if(c.isFunction(b))return c.grep(a,function(f,h){return!!b.call(f,h,f)===d});else if(b.nodeType)return c.grep(a,function(f){return f===b===d});else if(typeof b==="string"){var e=c.grep(a,function(f){return f.nodeType===1});if(Na.test(b))return c.filter(b,e,!d);else b=c.filter(b,e)}return c.grep(a,function(f){return c.inArray(f,b)>=0===d})}function na(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var e=c.data(a[d++]),f=c.data(this,
e);if(e=e&&e.events){delete f.handle;f.events={};for(var h in e)for(var l in e[h])c.event.add(this,h,e[h][l],e[h][l].data)}}})}function Oa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function oa(a,b,d){var e=b==="width"?a.offsetWidth:a.offsetHeight;if(d==="border")return e;c.each(b==="width"?Pa:Qa,function(){d||(e-=parseFloat(c.css(a,"padding"+this))||0);if(d==="margin")e+=parseFloat(c.css(a,
"margin"+this))||0;else e-=parseFloat(c.css(a,"border"+this+"Width"))||0});return e}function da(a,b,d,e){if(c.isArray(b)&&b.length)c.each(b,function(f,h){d||Ra.test(a)?e(a,h):da(a+"["+(typeof h==="object"||c.isArray(h)?f:"")+"]",h,d,e)});else if(!d&&b!=null&&typeof b==="object")c.isEmptyObject(b)?e(a,""):c.each(b,function(f,h){da(a+"["+f+"]",h,d,e)});else e(a,b)}function S(a,b){var d={};c.each(pa.concat.apply([],pa.slice(0,b)),function(){d[this]=a});return d}function qa(a){if(!ea[a]){var b=c("<"+
a+">").appendTo("body"),d=b.css("display");b.remove();if(d==="none"||d==="")d="block";ea[a]=d}return ea[a]}function fa(a){return c.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var t=E.document,c=function(){function a(){if(!b.isReady){try{t.documentElement.doScroll("left")}catch(j){setTimeout(a,1);return}b.ready()}}var b=function(j,s){return new b.fn.init(j,s)},d=E.jQuery,e=E.$,f,h=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,l=/\S/,k=/^\s+/,o=/\s+$/,x=/\W/,r=/\d/,A=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,
C=/^[\],:{}\s]*$/,J=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,w=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,I=/(?:^|:|,)(?:\s*\[)+/g,L=/(webkit)[ \/]([\w.]+)/,g=/(opera)(?:.*version)?[ \/]([\w.]+)/,i=/(msie) ([\w.]+)/,n=/(mozilla)(?:.*? rv:([\w.]+))?/,m=navigator.userAgent,p=false,q=[],u,y=Object.prototype.toString,F=Object.prototype.hasOwnProperty,M=Array.prototype.push,N=Array.prototype.slice,O=String.prototype.trim,D=Array.prototype.indexOf,R={};b.fn=b.prototype={init:function(j,
s){var v,z,H;if(!j)return this;if(j.nodeType){this.context=this[0]=j;this.length=1;return this}if(j==="body"&&!s&&t.body){this.context=t;this[0]=t.body;this.selector="body";this.length=1;return this}if(typeof j==="string")if((v=h.exec(j))&&(v[1]||!s))if(v[1]){H=s?s.ownerDocument||s:t;if(z=A.exec(j))if(b.isPlainObject(s)){j=[t.createElement(z[1])];b.fn.attr.call(j,s,true)}else j=[H.createElement(z[1])];else{z=b.buildFragment([v[1]],[H]);j=(z.cacheable?z.fragment.cloneNode(true):z.fragment).childNodes}return b.merge(this,
j)}else{if((z=t.getElementById(v[2]))&&z.parentNode){if(z.id!==v[2])return f.find(j);this.length=1;this[0]=z}this.context=t;this.selector=j;return this}else if(!s&&!x.test(j)){this.selector=j;this.context=t;j=t.getElementsByTagName(j);return b.merge(this,j)}else return!s||s.jquery?(s||f).find(j):b(s).find(j);else if(b.isFunction(j))return f.ready(j);if(j.selector!==B){this.selector=j.selector;this.context=j.context}return b.makeArray(j,this)},selector:"",jquery:"1.4.4",length:0,size:function(){return this.length},
toArray:function(){return N.call(this,0)},get:function(j){return j==null?this.toArray():j<0?this.slice(j)[0]:this[j]},pushStack:function(j,s,v){var z=b();b.isArray(j)?M.apply(z,j):b.merge(z,j);z.prevObject=this;z.context=this.context;if(s==="find")z.selector=this.selector+(this.selector?" ":"")+v;else if(s)z.selector=this.selector+"."+s+"("+v+")";return z},each:function(j,s){return b.each(this,j,s)},ready:function(j){b.bindReady();if(b.isReady)j.call(t,b);else q&&q.push(j);return this},eq:function(j){return j===
-1?this.slice(j):this.slice(j,+j+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(N.apply(this,arguments),"slice",N.call(arguments).join(","))},map:function(j){return this.pushStack(b.map(this,function(s,v){return j.call(s,v,s)}))},end:function(){return this.prevObject||b(null)},push:M,sort:[].sort,splice:[].splice};b.fn.init.prototype=b.fn;b.extend=b.fn.extend=function(){var j,s,v,z,H,G=arguments[0]||{},K=1,Q=arguments.length,ga=false;
if(typeof G==="boolean"){ga=G;G=arguments[1]||{};K=2}if(typeof G!=="object"&&!b.isFunction(G))G={};if(Q===K){G=this;--K}for(;K<Q;K++)if((j=arguments[K])!=null)for(s in j){v=G[s];z=j[s];if(G!==z)if(ga&&z&&(b.isPlainObject(z)||(H=b.isArray(z)))){if(H){H=false;v=v&&b.isArray(v)?v:[]}else v=v&&b.isPlainObject(v)?v:{};G[s]=b.extend(ga,v,z)}else if(z!==B)G[s]=z}return G};b.extend({noConflict:function(j){E.$=e;if(j)E.jQuery=d;return b},isReady:false,readyWait:1,ready:function(j){j===true&&b.readyWait--;
if(!b.readyWait||j!==true&&!b.isReady){if(!t.body)return setTimeout(b.ready,1);b.isReady=true;if(!(j!==true&&--b.readyWait>0))if(q){var s=0,v=q;for(q=null;j=v[s++];)j.call(t,b);b.fn.trigger&&b(t).trigger("ready").unbind("ready")}}},bindReady:function(){if(!p){p=true;if(t.readyState==="complete")return setTimeout(b.ready,1);if(t.addEventListener){t.addEventListener("DOMContentLoaded",u,false);E.addEventListener("load",b.ready,false)}else if(t.attachEvent){t.attachEvent("onreadystatechange",u);E.attachEvent("onload",
b.ready);var j=false;try{j=E.frameElement==null}catch(s){}t.documentElement.doScroll&&j&&a()}}},isFunction:function(j){return b.type(j)==="function"},isArray:Array.isArray||function(j){return b.type(j)==="array"},isWindow:function(j){return j&&typeof j==="object"&&"setInterval"in j},isNaN:function(j){return j==null||!r.test(j)||isNaN(j)},type:function(j){return j==null?String(j):R[y.call(j)]||"object"},isPlainObject:function(j){if(!j||b.type(j)!=="object"||j.nodeType||b.isWindow(j))return false;if(j.constructor&&
!F.call(j,"constructor")&&!F.call(j.constructor.prototype,"isPrototypeOf"))return false;for(var s in j);return s===B||F.call(j,s)},isEmptyObject:function(j){for(var s in j)return false;return true},error:function(j){throw j;},parseJSON:function(j){if(typeof j!=="string"||!j)return null;j=b.trim(j);if(C.test(j.replace(J,"@").replace(w,"]").replace(I,"")))return E.JSON&&E.JSON.parse?E.JSON.parse(j):(new Function("return "+j))();else b.error("Invalid JSON: "+j)},noop:function(){},globalEval:function(j){if(j&&
l.test(j)){var s=t.getElementsByTagName("head")[0]||t.documentElement,v=t.createElement("script");v.type="text/javascript";if(b.support.scriptEval)v.appendChild(t.createTextNode(j));else v.text=j;s.insertBefore(v,s.firstChild);s.removeChild(v)}},nodeName:function(j,s){return j.nodeName&&j.nodeName.toUpperCase()===s.toUpperCase()},each:function(j,s,v){var z,H=0,G=j.length,K=G===B||b.isFunction(j);if(v)if(K)for(z in j){if(s.apply(j[z],v)===false)break}else for(;H<G;){if(s.apply(j[H++],v)===false)break}else if(K)for(z in j){if(s.call(j[z],
z,j[z])===false)break}else for(v=j[0];H<G&&s.call(v,H,v)!==false;v=j[++H]);return j},trim:O?function(j){return j==null?"":O.call(j)}:function(j){return j==null?"":j.toString().replace(k,"").replace(o,"")},makeArray:function(j,s){var v=s||[];if(j!=null){var z=b.type(j);j.length==null||z==="string"||z==="function"||z==="regexp"||b.isWindow(j)?M.call(v,j):b.merge(v,j)}return v},inArray:function(j,s){if(s.indexOf)return s.indexOf(j);for(var v=0,z=s.length;v<z;v++)if(s[v]===j)return v;return-1},merge:function(j,
s){var v=j.length,z=0;if(typeof s.length==="number")for(var H=s.length;z<H;z++)j[v++]=s[z];else for(;s[z]!==B;)j[v++]=s[z++];j.length=v;return j},grep:function(j,s,v){var z=[],H;v=!!v;for(var G=0,K=j.length;G<K;G++){H=!!s(j[G],G);v!==H&&z.push(j[G])}return z},map:function(j,s,v){for(var z=[],H,G=0,K=j.length;G<K;G++){H=s(j[G],G,v);if(H!=null)z[z.length]=H}return z.concat.apply([],z)},guid:1,proxy:function(j,s,v){if(arguments.length===2)if(typeof s==="string"){v=j;j=v[s];s=B}else if(s&&!b.isFunction(s)){v=
s;s=B}if(!s&&j)s=function(){return j.apply(v||this,arguments)};if(j)s.guid=j.guid=j.guid||s.guid||b.guid++;return s},access:function(j,s,v,z,H,G){var K=j.length;if(typeof s==="object"){for(var Q in s)b.access(j,Q,s[Q],z,H,v);return j}if(v!==B){z=!G&&z&&b.isFunction(v);for(Q=0;Q<K;Q++)H(j[Q],s,z?v.call(j[Q],Q,H(j[Q],s)):v,G);return j}return K?H(j[0],s):B},now:function(){return(new Date).getTime()},uaMatch:function(j){j=j.toLowerCase();j=L.exec(j)||g.exec(j)||i.exec(j)||j.indexOf("compatible")<0&&n.exec(j)||
[];return{browser:j[1]||"",version:j[2]||"0"}},browser:{}});b.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(j,s){R["[object "+s+"]"]=s.toLowerCase()});m=b.uaMatch(m);if(m.browser){b.browser[m.browser]=true;b.browser.version=m.version}if(b.browser.webkit)b.browser.safari=true;if(D)b.inArray=function(j,s){return D.call(s,j)};if(!/\s/.test("\u00a0")){k=/^[\s\xA0]+/;o=/[\s\xA0]+$/}f=b(t);if(t.addEventListener)u=function(){t.removeEventListener("DOMContentLoaded",u,
false);b.ready()};else if(t.attachEvent)u=function(){if(t.readyState==="complete"){t.detachEvent("onreadystatechange",u);b.ready()}};return E.jQuery=E.$=b}();(function(){c.support={};var a=t.documentElement,b=t.createElement("script"),d=t.createElement("div"),e="script"+c.now();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var f=d.getElementsByTagName("*"),h=d.getElementsByTagName("a")[0],l=t.createElement("select"),
k=l.appendChild(t.createElement("option"));if(!(!f||!f.length||!h)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(h.getAttribute("style")),hrefNormalized:h.getAttribute("href")==="/a",opacity:/^0.55$/.test(h.style.opacity),cssFloat:!!h.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:k.selected,deleteExpando:true,optDisabled:false,checkClone:false,
scriptEval:false,noCloneEvent:true,boxModel:null,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableHiddenOffsets:true};l.disabled=true;c.support.optDisabled=!k.disabled;b.type="text/javascript";try{b.appendChild(t.createTextNode("window."+e+"=1;"))}catch(o){}a.insertBefore(b,a.firstChild);if(E[e]){c.support.scriptEval=true;delete E[e]}try{delete b.test}catch(x){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function r(){c.support.noCloneEvent=
false;d.detachEvent("onclick",r)});d.cloneNode(true).fireEvent("onclick")}d=t.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=t.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var r=t.createElement("div");r.style.width=r.style.paddingLeft="1px";t.body.appendChild(r);c.boxModel=c.support.boxModel=r.offsetWidth===2;if("zoom"in r.style){r.style.display="inline";r.style.zoom=
1;c.support.inlineBlockNeedsLayout=r.offsetWidth===2;r.style.display="";r.innerHTML="<div style='width:4px;'></div>";c.support.shrinkWrapBlocks=r.offsetWidth!==2}r.innerHTML="<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";var A=r.getElementsByTagName("td");c.support.reliableHiddenOffsets=A[0].offsetHeight===0;A[0].style.display="";A[1].style.display="none";c.support.reliableHiddenOffsets=c.support.reliableHiddenOffsets&&A[0].offsetHeight===0;r.innerHTML="";t.body.removeChild(r).style.display=
"none"});a=function(r){var A=t.createElement("div");r="on"+r;var C=r in A;if(!C){A.setAttribute(r,"return;");C=typeof A[r]==="function"}return C};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=f=h=null}})();var ra={},Ja=/^(?:\{.*\}|\[.*\])$/;c.extend({cache:{},uuid:0,expando:"jQuery"+c.now(),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:true},data:function(a,b,d){if(c.acceptData(a)){a=a==E?ra:a;var e=a.nodeType,f=e?a[c.expando]:null,h=
c.cache;if(!(e&&!f&&typeof b==="string"&&d===B)){if(e)f||(a[c.expando]=f=++c.uuid);else h=a;if(typeof b==="object")if(e)h[f]=c.extend(h[f],b);else c.extend(h,b);else if(e&&!h[f])h[f]={};a=e?h[f]:h;if(d!==B)a[b]=d;return typeof b==="string"?a[b]:a}}},removeData:function(a,b){if(c.acceptData(a)){a=a==E?ra:a;var d=a.nodeType,e=d?a[c.expando]:a,f=c.cache,h=d?f[e]:e;if(b){if(h){delete h[b];d&&c.isEmptyObject(h)&&c.removeData(a)}}else if(d&&c.support.deleteExpando)delete a[c.expando];else if(a.removeAttribute)a.removeAttribute(c.expando);
else if(d)delete f[e];else for(var l in a)delete a[l]}},acceptData:function(a){if(a.nodeName){var b=c.noData[a.nodeName.toLowerCase()];if(b)return!(b===true||a.getAttribute("classid")!==b)}return true}});c.fn.extend({data:function(a,b){var d=null;if(typeof a==="undefined"){if(this.length){var e=this[0].attributes,f;d=c.data(this[0]);for(var h=0,l=e.length;h<l;h++){f=e[h].name;if(f.indexOf("data-")===0){f=f.substr(5);ka(this[0],f,d[f])}}}return d}else if(typeof a==="object")return this.each(function(){c.data(this,
a)});var k=a.split(".");k[1]=k[1]?"."+k[1]:"";if(b===B){d=this.triggerHandler("getData"+k[1]+"!",[k[0]]);if(d===B&&this.length){d=c.data(this[0],a);d=ka(this[0],a,d)}return d===B&&k[1]?this.data(k[0]):d}else return this.each(function(){var o=c(this),x=[k[0],b];o.triggerHandler("setData"+k[1]+"!",x);c.data(this,a,b);o.triggerHandler("changeData"+k[1]+"!",x)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var e=
c.data(a,b);if(!d)return e||[];if(!e||c.isArray(d))e=c.data(a,b,c.makeArray(d));else e.push(d);return e}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),e=d.shift();if(e==="inprogress")e=d.shift();if(e){b==="fx"&&d.unshift("inprogress");e.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===B)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,
a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var sa=/[\n\t]/g,ha=/\s+/,Sa=/\r/g,Ta=/^(?:href|src|style)$/,Ua=/^(?:button|input)$/i,Va=/^(?:button|input|object|select|textarea)$/i,Wa=/^a(?:rea)?$/i,ta=/^(?:radio|checkbox)$/i;c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",
colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};c.fn.extend({attr:function(a,b){return c.access(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(x){var r=c(this);r.addClass(a.call(this,x,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ha),d=0,e=this.length;d<e;d++){var f=this[d];if(f.nodeType===
1)if(f.className){for(var h=" "+f.className+" ",l=f.className,k=0,o=b.length;k<o;k++)if(h.indexOf(" "+b[k]+" ")<0)l+=" "+b[k];f.className=c.trim(l)}else f.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(o){var x=c(this);x.removeClass(a.call(this,o,x.attr("class")))});if(a&&typeof a==="string"||a===B)for(var b=(a||"").split(ha),d=0,e=this.length;d<e;d++){var f=this[d];if(f.nodeType===1&&f.className)if(a){for(var h=(" "+f.className+" ").replace(sa," "),
l=0,k=b.length;l<k;l++)h=h.replace(" "+b[l]+" "," ");f.className=c.trim(h)}else f.className=""}return this},toggleClass:function(a,b){var d=typeof a,e=typeof b==="boolean";if(c.isFunction(a))return this.each(function(f){var h=c(this);h.toggleClass(a.call(this,f,h.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var f,h=0,l=c(this),k=b,o=a.split(ha);f=o[h++];){k=e?k:!l.hasClass(f);l[k?"addClass":"removeClass"](f)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,
"__className__",this.className);this.className=this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(sa," ").indexOf(a)>-1)return true;return false},val:function(a){if(!arguments.length){var b=this[0];if(b){if(c.nodeName(b,"option")){var d=b.attributes.value;return!d||d.specified?b.value:b.text}if(c.nodeName(b,"select")){var e=b.selectedIndex;d=[];var f=b.options;b=b.type==="select-one";
if(e<0)return null;var h=b?e:0;for(e=b?e+1:f.length;h<e;h++){var l=f[h];if(l.selected&&(c.support.optDisabled?!l.disabled:l.getAttribute("disabled")===null)&&(!l.parentNode.disabled||!c.nodeName(l.parentNode,"optgroup"))){a=c(l).val();if(b)return a;d.push(a)}}return d}if(ta.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Sa,"")}return B}var k=c.isFunction(a);return this.each(function(o){var x=c(this),r=a;if(this.nodeType===1){if(k)r=
a.call(this,o,x.val());if(r==null)r="";else if(typeof r==="number")r+="";else if(c.isArray(r))r=c.map(r,function(C){return C==null?"":C+""});if(c.isArray(r)&&ta.test(this.type))this.checked=c.inArray(x.val(),r)>=0;else if(c.nodeName(this,"select")){var A=c.makeArray(r);c("option",this).each(function(){this.selected=c.inArray(c(this).val(),A)>=0});if(!A.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},
attr:function(a,b,d,e){if(!a||a.nodeType===3||a.nodeType===8)return B;if(e&&b in c.attrFn)return c(a)[b](d);e=a.nodeType!==1||!c.isXMLDoc(a);var f=d!==B;b=e&&c.props[b]||b;var h=Ta.test(b);if((b in a||a[b]!==B)&&e&&!h){if(f){b==="type"&&Ua.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");if(d===null)a.nodeType===1&&a.removeAttribute(b);else a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&
b.specified?b.value:Va.test(a.nodeName)||Wa.test(a.nodeName)&&a.href?0:B;return a[b]}if(!c.support.style&&e&&b==="style"){if(f)a.style.cssText=""+d;return a.style.cssText}f&&a.setAttribute(b,""+d);if(!a.attributes[b]&&a.hasAttribute&&!a.hasAttribute(b))return B;a=!c.support.hrefNormalized&&e&&h?a.getAttribute(b,2):a.getAttribute(b);return a===null?B:a}});var X=/\.(.*)$/,ia=/^(?:textarea|input|select)$/i,La=/\./g,Ma=/ /g,Xa=/[^\w\s.|`]/g,Ya=function(a){return a.replace(Xa,"\\$&")},ua={focusin:0,focusout:0};
c.event={add:function(a,b,d,e){if(!(a.nodeType===3||a.nodeType===8)){if(c.isWindow(a)&&a!==E&&!a.frameElement)a=E;if(d===false)d=U;else if(!d)return;var f,h;if(d.handler){f=d;d=f.handler}if(!d.guid)d.guid=c.guid++;if(h=c.data(a)){var l=a.nodeType?"events":"__events__",k=h[l],o=h.handle;if(typeof k==="function"){o=k.handle;k=k.events}else if(!k){a.nodeType||(h[l]=h=function(){});h.events=k={}}if(!o)h.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,
arguments):B};o.elem=a;b=b.split(" ");for(var x=0,r;l=b[x++];){h=f?c.extend({},f):{handler:d,data:e};if(l.indexOf(".")>-1){r=l.split(".");l=r.shift();h.namespace=r.slice(0).sort().join(".")}else{r=[];h.namespace=""}h.type=l;if(!h.guid)h.guid=d.guid;var A=k[l],C=c.event.special[l]||{};if(!A){A=k[l]=[];if(!C.setup||C.setup.call(a,e,r,o)===false)if(a.addEventListener)a.addEventListener(l,o,false);else a.attachEvent&&a.attachEvent("on"+l,o)}if(C.add){C.add.call(a,h);if(!h.handler.guid)h.handler.guid=
d.guid}A.push(h);c.event.global[l]=true}a=null}}},global:{},remove:function(a,b,d,e){if(!(a.nodeType===3||a.nodeType===8)){if(d===false)d=U;var f,h,l=0,k,o,x,r,A,C,J=a.nodeType?"events":"__events__",w=c.data(a),I=w&&w[J];if(w&&I){if(typeof I==="function"){w=I;I=I.events}if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(f in I)c.event.remove(a,f+b)}else{for(b=b.split(" ");f=b[l++];){r=f;k=f.indexOf(".")<0;o=[];if(!k){o=f.split(".");f=o.shift();x=RegExp("(^|\\.)"+
c.map(o.slice(0).sort(),Ya).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(A=I[f])if(d){r=c.event.special[f]||{};for(h=e||0;h<A.length;h++){C=A[h];if(d.guid===C.guid){if(k||x.test(C.namespace)){e==null&&A.splice(h--,1);r.remove&&r.remove.call(a,C)}if(e!=null)break}}if(A.length===0||e!=null&&A.length===1){if(!r.teardown||r.teardown.call(a,o)===false)c.removeEvent(a,f,w.handle);delete I[f]}}else for(h=0;h<A.length;h++){C=A[h];if(k||x.test(C.namespace)){c.event.remove(a,r,C.handler,h);A.splice(h--,1)}}}if(c.isEmptyObject(I)){if(b=
w.handle)b.elem=null;delete w.events;delete w.handle;if(typeof w==="function")c.removeData(a,J);else c.isEmptyObject(w)&&c.removeData(a)}}}}},trigger:function(a,b,d,e){var f=a.type||a;if(!e){a=typeof a==="object"?a[c.expando]?a:c.extend(c.Event(f),a):c.Event(f);if(f.indexOf("!")>=0){a.type=f=f.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[f]&&c.each(c.cache,function(){this.events&&this.events[f]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===
8)return B;a.result=B;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(e=d.nodeType?c.data(d,"handle"):(c.data(d,"__events__")||{}).handle)&&e.apply(d,b);e=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+f]&&d["on"+f].apply(d,b)===false){a.result=false;a.preventDefault()}}catch(h){}if(!a.isPropagationStopped()&&e)c.event.trigger(a,b,e,true);else if(!a.isDefaultPrevented()){var l;e=a.target;var k=f.replace(X,""),o=c.nodeName(e,"a")&&k===
"click",x=c.event.special[k]||{};if((!x._default||x._default.call(d,a)===false)&&!o&&!(e&&e.nodeName&&c.noData[e.nodeName.toLowerCase()])){try{if(e[k]){if(l=e["on"+k])e["on"+k]=null;c.event.triggered=true;e[k]()}}catch(r){}if(l)e["on"+k]=l;c.event.triggered=false}}},handle:function(a){var b,d,e,f;d=[];var h=c.makeArray(arguments);a=h[0]=c.event.fix(a||E.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;if(!b){e=a.type.split(".");a.type=e.shift();d=e.slice(0).sort();e=RegExp("(^|\\.)"+
d.join("\\.(?:.*\\.)?")+"(\\.|$)")}a.namespace=a.namespace||d.join(".");f=c.data(this,this.nodeType?"events":"__events__");if(typeof f==="function")f=f.events;d=(f||{})[a.type];if(f&&d){d=d.slice(0);f=0;for(var l=d.length;f<l;f++){var k=d[f];if(b||e.test(k.namespace)){a.handler=k.handler;a.data=k.data;a.handleObj=k;k=k.handler.apply(this,h);if(k!==B){a.result=k;if(k===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[c.expando])return a;var b=a;a=c.Event(b);for(var d=this.props.length,e;d;){e=this.props[--d];a[e]=b[e]}if(!a.target)a.target=a.srcElement||t;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=t.documentElement;d=t.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(a.which==null&&(a.charCode!=null||a.keyCode!=null))a.which=a.charCode!=null?a.charCode:a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==B)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,Y(a.origType,a.selector),c.extend({},a,{handler:Ka,guid:a.handler.guid}))},remove:function(a){c.event.remove(this,
Y(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,d){if(c.isWindow(this))this.onbeforeunload=d},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};c.removeEvent=t.removeEventListener?function(a,b,d){a.removeEventListener&&a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent&&a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=a;this.type=a.type}else this.type=a;this.timeStamp=
c.now();this[c.expando]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=ca;var a=this.originalEvent;if(a)if(a.preventDefault)a.preventDefault();else a.returnValue=false},stopPropagation:function(){this.isPropagationStopped=ca;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=ca;this.stopPropagation()},isDefaultPrevented:U,isPropagationStopped:U,isImmediatePropagationStopped:U};
var va=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},wa=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?wa:va,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?wa:va)}}});if(!c.support.submitBubbles)c.event.special.submit={setup:function(){if(this.nodeName.toLowerCase()!==
"form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length){a.liveFired=B;return la("submit",this,arguments)}});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13){a.liveFired=B;return la("submit",this,arguments)}})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};if(!c.support.changeBubbles){var V,
xa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(e){return e.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},Z=function(a,b){var d=a.target,e,f;if(!(!ia.test(d.nodeName)||d.readOnly)){e=c.data(d,"_change_data");f=xa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",f);if(!(e===B||f===e))if(e!=null||f){a.type="change";a.liveFired=
B;return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:Z,beforedeactivate:Z,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return Z.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return Z.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,"_change_data",xa(a))}},setup:function(){if(this.type===
"file")return false;for(var a in V)c.event.add(this,a+".specialChange",V[a]);return ia.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return ia.test(this.nodeName)}};V=c.event.special.change.filters;V.focus=V.beforeactivate}t.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.trigger(e,null,e.target)}c.event.special[b]={setup:function(){ua[b]++===0&&t.addEventListener(a,d,true)},teardown:function(){--ua[b]===
0&&t.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,e,f){if(typeof d==="object"){for(var h in d)this[b](h,e,d[h],f);return this}if(c.isFunction(e)||e===false){f=e;e=B}var l=b==="one"?c.proxy(f,function(o){c(this).unbind(o,l);return f.apply(this,arguments)}):f;if(d==="unload"&&b!=="one")this.one(d,e,f);else{h=0;for(var k=this.length;h<k;h++)c.event.add(this[h],d,l,e)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&!a.preventDefault)for(var d in a)this.unbind(d,
a[d]);else{d=0;for(var e=this.length;d<e;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,e){return this.live(b,d,e,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){var d=c.Event(a);d.preventDefault();d.stopPropagation();c.event.trigger(d,b,this[0]);return d.result}},toggle:function(a){for(var b=arguments,d=
1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(e){var f=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,f+1);e.preventDefault();return b[f].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var ya={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,e,f,h){var l,k=0,o,x,r=h||this.selector;h=h?this:c(this.context);if(typeof d===
"object"&&!d.preventDefault){for(l in d)h[b](l,e,d[l],r);return this}if(c.isFunction(e)){f=e;e=B}for(d=(d||"").split(" ");(l=d[k++])!=null;){o=X.exec(l);x="";if(o){x=o[0];l=l.replace(X,"")}if(l==="hover")d.push("mouseenter"+x,"mouseleave"+x);else{o=l;if(l==="focus"||l==="blur"){d.push(ya[l]+x);l+=x}else l=(ya[l]||l)+x;if(b==="live"){x=0;for(var A=h.length;x<A;x++)c.event.add(h[x],"live."+Y(l,r),{data:e,selector:r,handler:f,origType:l,origHandler:f,preType:o})}else h.unbind("live."+Y(l,r),f)}}return this}});
c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){c.fn[b]=function(d,e){if(e==null){e=d;d=null}return arguments.length>0?this.bind(b,d,e):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});E.attachEvent&&!E.addEventListener&&c(E).bind("unload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});
(function(){function a(g,i,n,m,p,q){p=0;for(var u=m.length;p<u;p++){var y=m[p];if(y){var F=false;for(y=y[g];y;){if(y.sizcache===n){F=m[y.sizset];break}if(y.nodeType===1&&!q){y.sizcache=n;y.sizset=p}if(y.nodeName.toLowerCase()===i){F=y;break}y=y[g]}m[p]=F}}}function b(g,i,n,m,p,q){p=0;for(var u=m.length;p<u;p++){var y=m[p];if(y){var F=false;for(y=y[g];y;){if(y.sizcache===n){F=m[y.sizset];break}if(y.nodeType===1){if(!q){y.sizcache=n;y.sizset=p}if(typeof i!=="string"){if(y===i){F=true;break}}else if(k.filter(i,
[y]).length>0){F=y;break}}y=y[g]}m[p]=F}}}var d=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,e=0,f=Object.prototype.toString,h=false,l=true;[0,0].sort(function(){l=false;return 0});var k=function(g,i,n,m){n=n||[];var p=i=i||t;if(i.nodeType!==1&&i.nodeType!==9)return[];if(!g||typeof g!=="string")return n;var q,u,y,F,M,N=true,O=k.isXML(i),D=[],R=g;do{d.exec("");if(q=d.exec(R)){R=q[3];D.push(q[1]);if(q[2]){F=q[3];
break}}}while(q);if(D.length>1&&x.exec(g))if(D.length===2&&o.relative[D[0]])u=L(D[0]+D[1],i);else for(u=o.relative[D[0]]?[i]:k(D.shift(),i);D.length;){g=D.shift();if(o.relative[g])g+=D.shift();u=L(g,u)}else{if(!m&&D.length>1&&i.nodeType===9&&!O&&o.match.ID.test(D[0])&&!o.match.ID.test(D[D.length-1])){q=k.find(D.shift(),i,O);i=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]}if(i){q=m?{expr:D.pop(),set:C(m)}:k.find(D.pop(),D.length===1&&(D[0]==="~"||D[0]==="+")&&i.parentNode?i.parentNode:i,O);u=q.expr?k.filter(q.expr,
q.set):q.set;if(D.length>0)y=C(u);else N=false;for(;D.length;){q=M=D.pop();if(o.relative[M])q=D.pop();else M="";if(q==null)q=i;o.relative[M](y,q,O)}}else y=[]}y||(y=u);y||k.error(M||g);if(f.call(y)==="[object Array]")if(N)if(i&&i.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&k.contains(i,y[g])))n.push(u[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&n.push(u[g]);else n.push.apply(n,y);else C(y,n);if(F){k(F,p,n,m);k.uniqueSort(n)}return n};k.uniqueSort=function(g){if(w){h=
l;g.sort(w);if(h)for(var i=1;i<g.length;i++)g[i]===g[i-1]&&g.splice(i--,1)}return g};k.matches=function(g,i){return k(g,null,null,i)};k.matchesSelector=function(g,i){return k(i,null,null,[g]).length>0};k.find=function(g,i,n){var m;if(!g)return[];for(var p=0,q=o.order.length;p<q;p++){var u,y=o.order[p];if(u=o.leftMatch[y].exec(g)){var F=u[1];u.splice(1,1);if(F.substr(F.length-1)!=="\\"){u[1]=(u[1]||"").replace(/\\/g,"");m=o.find[y](u,i,n);if(m!=null){g=g.replace(o.match[y],"");break}}}}m||(m=i.getElementsByTagName("*"));
return{set:m,expr:g}};k.filter=function(g,i,n,m){for(var p,q,u=g,y=[],F=i,M=i&&i[0]&&k.isXML(i[0]);g&&i.length;){for(var N in o.filter)if((p=o.leftMatch[N].exec(g))!=null&&p[2]){var O,D,R=o.filter[N];D=p[1];q=false;p.splice(1,1);if(D.substr(D.length-1)!=="\\"){if(F===y)y=[];if(o.preFilter[N])if(p=o.preFilter[N](p,F,n,y,m,M)){if(p===true)continue}else q=O=true;if(p)for(var j=0;(D=F[j])!=null;j++)if(D){O=R(D,p,j,F);var s=m^!!O;if(n&&O!=null)if(s)q=true;else F[j]=false;else if(s){y.push(D);q=true}}if(O!==
B){n||(F=y);g=g.replace(o.match[N],"");if(!q)return[];break}}}if(g===u)if(q==null)k.error(g);else break;u=g}return F};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var o=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},relative:{"+":function(g,i){var n=typeof i==="string",m=n&&!/\W/.test(i);n=n&&!m;if(m)i=i.toLowerCase();m=0;for(var p=g.length,q;m<p;m++)if(q=g[m]){for(;(q=q.previousSibling)&&q.nodeType!==1;);g[m]=n||q&&q.nodeName.toLowerCase()===
i?q||false:q===i}n&&k.filter(i,g,true)},">":function(g,i){var n,m=typeof i==="string",p=0,q=g.length;if(m&&!/\W/.test(i))for(i=i.toLowerCase();p<q;p++){if(n=g[p]){n=n.parentNode;g[p]=n.nodeName.toLowerCase()===i?n:false}}else{for(;p<q;p++)if(n=g[p])g[p]=m?n.parentNode:n.parentNode===i;m&&k.filter(i,g,true)}},"":function(g,i,n){var m,p=e++,q=b;if(typeof i==="string"&&!/\W/.test(i)){m=i=i.toLowerCase();q=a}q("parentNode",i,p,g,m,n)},"~":function(g,i,n){var m,p=e++,q=b;if(typeof i==="string"&&!/\W/.test(i)){m=
i=i.toLowerCase();q=a}q("previousSibling",i,p,g,m,n)}},find:{ID:function(g,i,n){if(typeof i.getElementById!=="undefined"&&!n)return(g=i.getElementById(g[1]))&&g.parentNode?[g]:[]},NAME:function(g,i){if(typeof i.getElementsByName!=="undefined"){for(var n=[],m=i.getElementsByName(g[1]),p=0,q=m.length;p<q;p++)m[p].getAttribute("name")===g[1]&&n.push(m[p]);return n.length===0?null:n}},TAG:function(g,i){return i.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,i,n,m,p,q){g=" "+g[1].replace(/\\/g,
"")+" ";if(q)return g;q=0;for(var u;(u=i[q])!=null;q++)if(u)if(p^(u.className&&(" "+u.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))n||m.push(u);else if(n)i[q]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},CHILD:function(g){if(g[1]==="nth"){var i=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=i[1]+(i[2]||1)-0;g[3]=i[3]-0}g[0]=e++;return g},ATTR:function(g,i,n,
m,p,q){i=g[1].replace(/\\/g,"");if(!q&&o.attrMap[i])g[1]=o.attrMap[i];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,i,n,m,p){if(g[1]==="not")if((d.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,i);else{g=k.filter(g[3],i,n,true^p);n||m.push.apply(m,g);return false}else if(o.match.POS.test(g[0])||o.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===
true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,i,n){return!!k(n[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===
g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},setFilters:{first:function(g,i){return i===0},last:function(g,i,n,m){return i===m.length-1},even:function(g,i){return i%2===0},odd:function(g,i){return i%2===1},lt:function(g,i,n){return i<n[3]-0},gt:function(g,i,n){return i>n[3]-0},nth:function(g,i,n){return n[3]-
0===i},eq:function(g,i,n){return n[3]-0===i}},filter:{PSEUDO:function(g,i,n,m){var p=i[1],q=o.filters[p];if(q)return q(g,n,i,m);else if(p==="contains")return(g.textContent||g.innerText||k.getText([g])||"").indexOf(i[3])>=0;else if(p==="not"){i=i[3];n=0;for(m=i.length;n<m;n++)if(i[n]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+p)},CHILD:function(g,i){var n=i[1],m=g;switch(n){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(n===
"first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":n=i[2];var p=i[3];if(n===1&&p===0)return true;var q=i[0],u=g.parentNode;if(u&&(u.sizcache!==q||!g.nodeIndex)){var y=0;for(m=u.firstChild;m;m=m.nextSibling)if(m.nodeType===1)m.nodeIndex=++y;u.sizcache=q}m=g.nodeIndex-p;return n===0?m===0:m%n===0&&m/n>=0}},ID:function(g,i){return g.nodeType===1&&g.getAttribute("id")===i},TAG:function(g,i){return i==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===
i},CLASS:function(g,i){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(i)>-1},ATTR:function(g,i){var n=i[1];n=o.attrHandle[n]?o.attrHandle[n](g):g[n]!=null?g[n]:g.getAttribute(n);var m=n+"",p=i[2],q=i[4];return n==null?p==="!=":p==="="?m===q:p==="*="?m.indexOf(q)>=0:p==="~="?(" "+m+" ").indexOf(q)>=0:!q?m&&n!==false:p==="!="?m!==q:p==="^="?m.indexOf(q)===0:p==="$="?m.substr(m.length-q.length)===q:p==="|="?m===q||m.substr(0,q.length+1)===q+"-":false},POS:function(g,i,n,m){var p=o.setFilters[i[2]];
if(p)return p(g,n,i,m)}}},x=o.match.POS,r=function(g,i){return"\\"+(i-0+1)},A;for(A in o.match){o.match[A]=RegExp(o.match[A].source+/(?![^\[]*\])(?![^\(]*\))/.source);o.leftMatch[A]=RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[A].source.replace(/\\(\d+)/g,r))}var C=function(g,i){g=Array.prototype.slice.call(g,0);if(i){i.push.apply(i,g);return i}return g};try{Array.prototype.slice.call(t.documentElement.childNodes,0)}catch(J){C=function(g,i){var n=0,m=i||[];if(f.call(g)==="[object Array]")Array.prototype.push.apply(m,
g);else if(typeof g.length==="number")for(var p=g.length;n<p;n++)m.push(g[n]);else for(;g[n];n++)m.push(g[n]);return m}}var w,I;if(t.documentElement.compareDocumentPosition)w=function(g,i){if(g===i){h=true;return 0}if(!g.compareDocumentPosition||!i.compareDocumentPosition)return g.compareDocumentPosition?-1:1;return g.compareDocumentPosition(i)&4?-1:1};else{w=function(g,i){var n,m,p=[],q=[];n=g.parentNode;m=i.parentNode;var u=n;if(g===i){h=true;return 0}else if(n===m)return I(g,i);else if(n){if(!m)return 1}else return-1;
for(;u;){p.unshift(u);u=u.parentNode}for(u=m;u;){q.unshift(u);u=u.parentNode}n=p.length;m=q.length;for(u=0;u<n&&u<m;u++)if(p[u]!==q[u])return I(p[u],q[u]);return u===n?I(g,q[u],-1):I(p[u],i,1)};I=function(g,i,n){if(g===i)return n;for(g=g.nextSibling;g;){if(g===i)return-1;g=g.nextSibling}return 1}}k.getText=function(g){for(var i="",n,m=0;g[m];m++){n=g[m];if(n.nodeType===3||n.nodeType===4)i+=n.nodeValue;else if(n.nodeType!==8)i+=k.getText(n.childNodes)}return i};(function(){var g=t.createElement("div"),
i="script"+(new Date).getTime(),n=t.documentElement;g.innerHTML="<a name='"+i+"'/>";n.insertBefore(g,n.firstChild);if(t.getElementById(i)){o.find.ID=function(m,p,q){if(typeof p.getElementById!=="undefined"&&!q)return(p=p.getElementById(m[1]))?p.id===m[1]||typeof p.getAttributeNode!=="undefined"&&p.getAttributeNode("id").nodeValue===m[1]?[p]:B:[]};o.filter.ID=function(m,p){var q=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&q&&q.nodeValue===p}}n.removeChild(g);
n=g=null})();(function(){var g=t.createElement("div");g.appendChild(t.createComment(""));if(g.getElementsByTagName("*").length>0)o.find.TAG=function(i,n){var m=n.getElementsByTagName(i[1]);if(i[1]==="*"){for(var p=[],q=0;m[q];q++)m[q].nodeType===1&&p.push(m[q]);m=p}return m};g.innerHTML="<a href='#'></a>";if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")o.attrHandle.href=function(i){return i.getAttribute("href",2)};g=null})();t.querySelectorAll&&
function(){var g=k,i=t.createElement("div");i.innerHTML="<p class='TEST'></p>";if(!(i.querySelectorAll&&i.querySelectorAll(".TEST").length===0)){k=function(m,p,q,u){p=p||t;m=m.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!u&&!k.isXML(p))if(p.nodeType===9)try{return C(p.querySelectorAll(m),q)}catch(y){}else if(p.nodeType===1&&p.nodeName.toLowerCase()!=="object"){var F=p.getAttribute("id"),M=F||"__sizzle__";F||p.setAttribute("id",M);try{return C(p.querySelectorAll("#"+M+" "+m),q)}catch(N){}finally{F||
p.removeAttribute("id")}}return g(m,p,q,u)};for(var n in g)k[n]=g[n];i=null}}();(function(){var g=t.documentElement,i=g.matchesSelector||g.mozMatchesSelector||g.webkitMatchesSelector||g.msMatchesSelector,n=false;try{i.call(t.documentElement,"[test!='']:sizzle")}catch(m){n=true}if(i)k.matchesSelector=function(p,q){q=q.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(p))try{if(n||!o.match.PSEUDO.test(q)&&!/!=/.test(q))return i.call(p,q)}catch(u){}return k(q,null,null,[p]).length>0}})();(function(){var g=
t.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){o.order.splice(1,0,"CLASS");o.find.CLASS=function(i,n,m){if(typeof n.getElementsByClassName!=="undefined"&&!m)return n.getElementsByClassName(i[1])};g=null}}})();k.contains=t.documentElement.contains?function(g,i){return g!==i&&(g.contains?g.contains(i):true)}:t.documentElement.compareDocumentPosition?
function(g,i){return!!(g.compareDocumentPosition(i)&16)}:function(){return false};k.isXML=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false};var L=function(g,i){for(var n,m=[],p="",q=i.nodeType?[i]:i;n=o.match.PSEUDO.exec(g);){p+=n[0];g=g.replace(o.match.PSEUDO,"")}g=o.relative[g]?g+"*":g;n=0;for(var u=q.length;n<u;n++)k(g,q[n],m);return k.filter(p,m)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=k.getText;c.isXMLDoc=k.isXML;
c.contains=k.contains})();var Za=/Until$/,$a=/^(?:parents|prevUntil|prevAll)/,ab=/,/,Na=/^.[^:#\[\.,]*$/,bb=Array.prototype.slice,cb=c.expr.match.POS;c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,e=0,f=this.length;e<f;e++){d=b.length;c.find(a,this[e],b);if(e>0)for(var h=d;h<b.length;h++)for(var l=0;l<d;l++)if(b[l]===b[h]){b.splice(h--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,e=b.length;d<e;d++)if(c.contains(this,b[d]))return true})},
not:function(a){return this.pushStack(ma(this,a,false),"not",a)},filter:function(a){return this.pushStack(ma(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){var d=[],e,f,h=this[0];if(c.isArray(a)){var l,k={},o=1;if(h&&a.length){e=0;for(f=a.length;e<f;e++){l=a[e];k[l]||(k[l]=c.expr.match.POS.test(l)?c(l,b||this.context):l)}for(;h&&h.ownerDocument&&h!==b;){for(l in k){e=k[l];if(e.jquery?e.index(h)>-1:c(h).is(e))d.push({selector:l,elem:h,level:o})}h=
h.parentNode;o++}}return d}l=cb.test(a)?c(a,b||this.context):null;e=0;for(f=this.length;e<f;e++)for(h=this[e];h;)if(l?l.index(h)>-1:c.find.matchesSelector(h,a)){d.push(h);break}else{h=h.parentNode;if(!h||!h.ownerDocument||h===b)break}d=d.length>1?c.unique(d):d;return this.pushStack(d,"closest",a)},index:function(a){if(!a||typeof a==="string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var d=typeof a==="string"?c(a,b||this.context):
c.makeArray(a),e=c.merge(this.get(),d);return this.pushStack(!d[0]||!d[0].parentNode||d[0].parentNode.nodeType===11||!e[0]||!e[0].parentNode||e[0].parentNode.nodeType===11?e:c.unique(e))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,
2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,
b){c.fn[a]=function(d,e){var f=c.map(this,b,d);Za.test(a)||(e=d);if(e&&typeof e==="string")f=c.filter(e,f);f=this.length>1?c.unique(f):f;if((this.length>1||ab.test(e))&&$a.test(a))f=f.reverse();return this.pushStack(f,a,bb.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return b.length===1?c.find.matchesSelector(b[0],a)?[b[0]]:[]:c.find.matches(a,b)},dir:function(a,b,d){var e=[];for(a=a[b];a&&a.nodeType!==9&&(d===B||a.nodeType!==1||!c(a).is(d));){a.nodeType===1&&
e.push(a);a=a[b]}return e},nth:function(a,b,d){b=b||1;for(var e=0;a;a=a[d])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var za=/ jQuery\d+="(?:\d+|null)"/g,$=/^\s+/,Aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Ba=/<([\w:]+)/,db=/<tbody/i,eb=/<|&#?\w+;/,Ca=/<(?:script|object|embed|option|style)/i,Da=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/\=([^="'>\s]+\/)>/g,P={option:[1,
"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};P.optgroup=P.option;P.tbody=P.tfoot=P.colgroup=P.caption=P.thead;P.th=P.td;if(!c.support.htmlSerialize)P._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==B)return this.empty().append((this[0]&&this[0].ownerDocument||t).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,e;(e=this[d])!=null;d++)if(!a||c.filter(a,[e]).length){if(!b&&e.nodeType===1){c.cleanData(e.getElementsByTagName("*"));c.cleanData([e])}e.parentNode&&e.parentNode.removeChild(e)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,e=this.ownerDocument;if(!d){d=e.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(za,"").replace(fb,'="$1">').replace($,"")],e)[0]}else return this.cloneNode(true)});if(a===true){na(this,b);na(this.find("*"),b.find("*"))}return b},html:function(a){if(a===B)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(za,""):null;
else if(typeof a==="string"&&!Ca.test(a)&&(c.support.leadingWhitespace||!$.test(a))&&!P[(Ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Aa,"<$1></$2>");try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(e){this.empty().append(a)}}else c.isFunction(a)?this.each(function(f){var h=c(this);h.html(a.call(this,f,h.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=
c(this),e=d.html();d.replaceWith(a.call(this,b,e))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){var e,f,h,l=a[0],k=[];if(!c.support.checkClone&&arguments.length===3&&typeof l==="string"&&Da.test(l))return this.each(function(){c(this).domManip(a,
b,d,true)});if(c.isFunction(l))return this.each(function(x){var r=c(this);a[0]=l.call(this,x,b?r.html():B);r.domManip(a,b,d)});if(this[0]){e=l&&l.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:c.buildFragment(a,this,k);h=e.fragment;if(f=h.childNodes.length===1?h=h.firstChild:h.firstChild){b=b&&c.nodeName(f,"tr");f=0;for(var o=this.length;f<o;f++)d.call(b?c.nodeName(this[f],"table")?this[f].getElementsByTagName("tbody")[0]||this[f].appendChild(this[f].ownerDocument.createElement("tbody")):
this[f]:this[f],f>0||e.cacheable||this.length>1?h.cloneNode(true):h)}k.length&&c.each(k,Oa)}return this}});c.buildFragment=function(a,b,d){var e,f,h;b=b&&b[0]?b[0].ownerDocument||b[0]:t;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===t&&!Ca.test(a[0])&&(c.support.checkClone||!Da.test(a[0]))){f=true;if(h=c.fragments[a[0]])if(h!==1)e=h}if(!e){e=b.createDocumentFragment();c.clean(a,b,e,d)}if(f)c.fragments[a[0]]=h?e:1;return{fragment:e,cacheable:f}};c.fragments={};c.each({appendTo:"append",
prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var e=[];d=c(d);var f=this.length===1&&this[0].parentNode;if(f&&f.nodeType===11&&f.childNodes.length===1&&d.length===1){d[b](this[0]);return this}else{f=0;for(var h=d.length;f<h;f++){var l=(f>0?this.clone(true):this).get();c(d[f])[b](l);e=e.concat(l)}return this.pushStack(e,a,d.selector)}}});c.extend({clean:function(a,b,d,e){b=b||t;if(typeof b.createElement==="undefined")b=b.ownerDocument||
b[0]&&b[0].ownerDocument||t;for(var f=[],h=0,l;(l=a[h])!=null;h++){if(typeof l==="number")l+="";if(l){if(typeof l==="string"&&!eb.test(l))l=b.createTextNode(l);else if(typeof l==="string"){l=l.replace(Aa,"<$1></$2>");var k=(Ba.exec(l)||["",""])[1].toLowerCase(),o=P[k]||P._default,x=o[0],r=b.createElement("div");for(r.innerHTML=o[1]+l+o[2];x--;)r=r.lastChild;if(!c.support.tbody){x=db.test(l);k=k==="table"&&!x?r.firstChild&&r.firstChild.childNodes:o[1]==="<table>"&&!x?r.childNodes:[];for(o=k.length-
1;o>=0;--o)c.nodeName(k[o],"tbody")&&!k[o].childNodes.length&&k[o].parentNode.removeChild(k[o])}!c.support.leadingWhitespace&&$.test(l)&&r.insertBefore(b.createTextNode($.exec(l)[0]),r.firstChild);l=r.childNodes}if(l.nodeType)f.push(l);else f=c.merge(f,l)}}if(d)for(h=0;f[h];h++)if(e&&c.nodeName(f[h],"script")&&(!f[h].type||f[h].type.toLowerCase()==="text/javascript"))e.push(f[h].parentNode?f[h].parentNode.removeChild(f[h]):f[h]);else{f[h].nodeType===1&&f.splice.apply(f,[h+1,0].concat(c.makeArray(f[h].getElementsByTagName("script"))));
d.appendChild(f[h])}return f},cleanData:function(a){for(var b,d,e=c.cache,f=c.event.special,h=c.support.deleteExpando,l=0,k;(k=a[l])!=null;l++)if(!(k.nodeName&&c.noData[k.nodeName.toLowerCase()]))if(d=k[c.expando]){if((b=e[d])&&b.events)for(var o in b.events)f[o]?c.event.remove(k,o):c.removeEvent(k,o,b.handle);if(h)delete k[c.expando];else k.removeAttribute&&k.removeAttribute(c.expando);delete e[d]}}});var Ea=/alpha\([^)]*\)/i,gb=/opacity=([^)]*)/,hb=/-([a-z])/ig,ib=/([A-Z])/g,Fa=/^-?\d+(?:px)?$/i,
jb=/^-?\d/,kb={position:"absolute",visibility:"hidden",display:"block"},Pa=["Left","Right"],Qa=["Top","Bottom"],W,Ga,aa,lb=function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){if(arguments.length===2&&b===B)return this;return c.access(this,a,b,true,function(d,e,f){return f!==B?c.style(d,e,f):c.css(d,e)})};c.extend({cssHooks:{opacity:{get:function(a,b){if(b){var d=W(a,"opacity","opacity");return d===""?"1":d}else return a.style.opacity}}},cssNumber:{zIndex:true,fontWeight:true,opacity:true,
zoom:true,lineHeight:true},cssProps:{"float":c.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,d,e){if(!(!a||a.nodeType===3||a.nodeType===8||!a.style)){var f,h=c.camelCase(b),l=a.style,k=c.cssHooks[h];b=c.cssProps[h]||h;if(d!==B){if(!(typeof d==="number"&&isNaN(d)||d==null)){if(typeof d==="number"&&!c.cssNumber[h])d+="px";if(!k||!("set"in k)||(d=k.set(a,d))!==B)try{l[b]=d}catch(o){}}}else{if(k&&"get"in k&&(f=k.get(a,false,e))!==B)return f;return l[b]}}},css:function(a,b,d){var e,f=c.camelCase(b),
h=c.cssHooks[f];b=c.cssProps[f]||f;if(h&&"get"in h&&(e=h.get(a,true,d))!==B)return e;else if(W)return W(a,b,f)},swap:function(a,b,d){var e={},f;for(f in b){e[f]=a.style[f];a.style[f]=b[f]}d.call(a);for(f in b)a.style[f]=e[f]},camelCase:function(a){return a.replace(hb,lb)}});c.curCSS=c.css;c.each(["height","width"],function(a,b){c.cssHooks[b]={get:function(d,e,f){var h;if(e){if(d.offsetWidth!==0)h=oa(d,b,f);else c.swap(d,kb,function(){h=oa(d,b,f)});if(h<=0){h=W(d,b,b);if(h==="0px"&&aa)h=aa(d,b,b);
if(h!=null)return h===""||h==="auto"?"0px":h}if(h<0||h==null){h=d.style[b];return h===""||h==="auto"?"0px":h}return typeof h==="string"?h:h+"px"}},set:function(d,e){if(Fa.test(e)){e=parseFloat(e);if(e>=0)return e+"px"}else return e}}});if(!c.support.opacity)c.cssHooks.opacity={get:function(a,b){return gb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var d=a.style;d.zoom=1;var e=c.isNaN(b)?"":"alpha(opacity="+b*100+")",f=
d.filter||"";d.filter=Ea.test(f)?f.replace(Ea,e):d.filter+" "+e}};if(t.defaultView&&t.defaultView.getComputedStyle)Ga=function(a,b,d){var e;d=d.replace(ib,"-$1").toLowerCase();if(!(b=a.ownerDocument.defaultView))return B;if(b=b.getComputedStyle(a,null)){e=b.getPropertyValue(d);if(e===""&&!c.contains(a.ownerDocument.documentElement,a))e=c.style(a,d)}return e};if(t.documentElement.currentStyle)aa=function(a,b){var d,e,f=a.currentStyle&&a.currentStyle[b],h=a.style;if(!Fa.test(f)&&jb.test(f)){d=h.left;
e=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;h.left=b==="fontSize"?"1em":f||0;f=h.pixelLeft+"px";h.left=d;a.runtimeStyle.left=e}return f===""?"auto":f};W=Ga||aa;if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=a.offsetHeight;return a.offsetWidth===0&&b===0||!c.support.reliableHiddenOffsets&&(a.style.display||c.css(a,"display"))==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var mb=c.now(),nb=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
ob=/^(?:select|textarea)/i,pb=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,qb=/^(?:GET|HEAD)$/,Ra=/\[\]$/,T=/\=\?(&|$)/,ja=/\?/,rb=/([?&])_=[^&]*/,sb=/^(\w+:)?\/\/([^\/?#]+)/,tb=/%20/g,ub=/#.*$/,Ha=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!=="string"&&Ha)return Ha.apply(this,arguments);else if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var f=a.slice(e,a.length);a=a.slice(0,e)}e="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b===
"object"){b=c.param(b,c.ajaxSettings.traditional);e="POST"}var h=this;c.ajax({url:a,type:e,dataType:"html",data:b,complete:function(l,k){if(k==="success"||k==="notmodified")h.html(f?c("<div>").append(l.responseText.replace(nb,"")).find(f):l.responseText);d&&h.each(d,[l.responseText,k,l])}});return this},serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&
!this.disabled&&(this.checked||ob.test(this.nodeName)||pb.test(this.type))}).map(function(a,b){var d=c(this).val();return d==null?null:c.isArray(d)?c.map(d,function(e){return{name:b.name,value:e}}):{name:b.name,value:d}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,e){if(c.isFunction(b)){e=e||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:e})},
getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,e){if(c.isFunction(b)){e=e||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:e})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return new E.XMLHttpRequest},accepts:{xml:"application/xml, text/xml",html:"text/html",
script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},ajax:function(a){var b=c.extend(true,{},c.ajaxSettings,a),d,e,f,h=b.type.toUpperCase(),l=qb.test(h);b.url=b.url.replace(ub,"");b.context=a&&a.context!=null?a.context:b;if(b.data&&b.processData&&typeof b.data!=="string")b.data=c.param(b.data,b.traditional);if(b.dataType==="jsonp"){if(h==="GET")T.test(b.url)||(b.url+=(ja.test(b.url)?"&":"?")+(b.jsonp||"callback")+"=?");else if(!b.data||
!T.test(b.data))b.data=(b.data?b.data+"&":"")+(b.jsonp||"callback")+"=?";b.dataType="json"}if(b.dataType==="json"&&(b.data&&T.test(b.data)||T.test(b.url))){d=b.jsonpCallback||"jsonp"+mb++;if(b.data)b.data=(b.data+"").replace(T,"="+d+"$1");b.url=b.url.replace(T,"="+d+"$1");b.dataType="script";var k=E[d];E[d]=function(m){if(c.isFunction(k))k(m);else{E[d]=B;try{delete E[d]}catch(p){}}f=m;c.handleSuccess(b,w,e,f);c.handleComplete(b,w,e,f);r&&r.removeChild(A)}}if(b.dataType==="script"&&b.cache===null)b.cache=
false;if(b.cache===false&&l){var o=c.now(),x=b.url.replace(rb,"$1_="+o);b.url=x+(x===b.url?(ja.test(b.url)?"&":"?")+"_="+o:"")}if(b.data&&l)b.url+=(ja.test(b.url)?"&":"?")+b.data;b.global&&c.active++===0&&c.event.trigger("ajaxStart");o=(o=sb.exec(b.url))&&(o[1]&&o[1].toLowerCase()!==location.protocol||o[2].toLowerCase()!==location.host);if(b.dataType==="script"&&h==="GET"&&o){var r=t.getElementsByTagName("head")[0]||t.documentElement,A=t.createElement("script");if(b.scriptCharset)A.charset=b.scriptCharset;
A.src=b.url;if(!d){var C=false;A.onload=A.onreadystatechange=function(){if(!C&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){C=true;c.handleSuccess(b,w,e,f);c.handleComplete(b,w,e,f);A.onload=A.onreadystatechange=null;r&&A.parentNode&&r.removeChild(A)}}}r.insertBefore(A,r.firstChild);return B}var J=false,w=b.xhr();if(w){b.username?w.open(h,b.url,b.async,b.username,b.password):w.open(h,b.url,b.async);try{if(b.data!=null&&!l||a&&a.contentType)w.setRequestHeader("Content-Type",
b.contentType);if(b.ifModified){c.lastModified[b.url]&&w.setRequestHeader("If-Modified-Since",c.lastModified[b.url]);c.etag[b.url]&&w.setRequestHeader("If-None-Match",c.etag[b.url])}o||w.setRequestHeader("X-Requested-With","XMLHttpRequest");w.setRequestHeader("Accept",b.dataType&&b.accepts[b.dataType]?b.accepts[b.dataType]+", */*; q=0.01":b.accepts._default)}catch(I){}if(b.beforeSend&&b.beforeSend.call(b.context,w,b)===false){b.global&&c.active--===1&&c.event.trigger("ajaxStop");w.abort();return false}b.global&&
c.triggerGlobal(b,"ajaxSend",[w,b]);var L=w.onreadystatechange=function(m){if(!w||w.readyState===0||m==="abort"){J||c.handleComplete(b,w,e,f);J=true;if(w)w.onreadystatechange=c.noop}else if(!J&&w&&(w.readyState===4||m==="timeout")){J=true;w.onreadystatechange=c.noop;e=m==="timeout"?"timeout":!c.httpSuccess(w)?"error":b.ifModified&&c.httpNotModified(w,b.url)?"notmodified":"success";var p;if(e==="success")try{f=c.httpData(w,b.dataType,b)}catch(q){e="parsererror";p=q}if(e==="success"||e==="notmodified")d||
c.handleSuccess(b,w,e,f);else c.handleError(b,w,e,p);d||c.handleComplete(b,w,e,f);m==="timeout"&&w.abort();if(b.async)w=null}};try{var g=w.abort;w.abort=function(){w&&Function.prototype.call.call(g,w);L("abort")}}catch(i){}b.async&&b.timeout>0&&setTimeout(function(){w&&!J&&L("timeout")},b.timeout);try{w.send(l||b.data==null?null:b.data)}catch(n){c.handleError(b,w,null,n);c.handleComplete(b,w,e,f)}b.async||L();return w}},param:function(a,b){var d=[],e=function(h,l){l=c.isFunction(l)?l():l;d[d.length]=
encodeURIComponent(h)+"="+encodeURIComponent(l)};if(b===B)b=c.ajaxSettings.traditional;if(c.isArray(a)||a.jquery)c.each(a,function(){e(this.name,this.value)});else for(var f in a)da(f,a[f],b,e);return d.join("&").replace(tb,"+")}});c.extend({active:0,lastModified:{},etag:{},handleError:function(a,b,d,e){a.error&&a.error.call(a.context,b,d,e);a.global&&c.triggerGlobal(a,"ajaxError",[b,a,e])},handleSuccess:function(a,b,d,e){a.success&&a.success.call(a.context,e,d,b);a.global&&c.triggerGlobal(a,"ajaxSuccess",
[b,a])},handleComplete:function(a,b,d){a.complete&&a.complete.call(a.context,b,d);a.global&&c.triggerGlobal(a,"ajaxComplete",[b,a]);a.global&&c.active--===1&&c.event.trigger("ajaxStop")},triggerGlobal:function(a,b,d){(a.context&&a.context.url==null?c(a.context):c.event).trigger(b,d)},httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===1223}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),
e=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(e)c.etag[b]=e;return a.status===304},httpData:function(a,b,d){var e=a.getResponseHeader("content-type")||"",f=b==="xml"||!b&&e.indexOf("xml")>=0;a=f?a.responseXML:a.responseText;f&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b==="json"||!b&&e.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&e.indexOf("javascript")>=0)c.globalEval(a);return a}});
if(E.ActiveXObject)c.ajaxSettings.xhr=function(){if(E.location.protocol!=="file:")try{return new E.XMLHttpRequest}catch(a){}try{return new E.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}};c.support.ajax=!!c.ajaxSettings.xhr();var ea={},vb=/^(?:toggle|show|hide)$/,wb=/^([+\-]=)?([\d+.\-]+)(.*)$/,ba,pa=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b,d){if(a||a===0)return this.animate(S("show",
3),a,b,d);else{d=0;for(var e=this.length;d<e;d++){a=this[d];b=a.style.display;if(!c.data(a,"olddisplay")&&b==="none")b=a.style.display="";b===""&&c.css(a,"display")==="none"&&c.data(a,"olddisplay",qa(a.nodeName))}for(d=0;d<e;d++){a=this[d];b=a.style.display;if(b===""||b==="none")a.style.display=c.data(a,"olddisplay")||""}return this}},hide:function(a,b,d){if(a||a===0)return this.animate(S("hide",3),a,b,d);else{a=0;for(b=this.length;a<b;a++){d=c.css(this[a],"display");d!=="none"&&c.data(this[a],"olddisplay",
d)}for(a=0;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b,d){var e=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||e?this.each(function(){var f=e?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(S("toggle",3),a,b,d);return this},fadeTo:function(a,b,d,e){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d,e)},animate:function(a,b,d,e){var f=c.speed(b,
d,e);if(c.isEmptyObject(a))return this.each(f.complete);return this[f.queue===false?"each":"queue"](function(){var h=c.extend({},f),l,k=this.nodeType===1,o=k&&c(this).is(":hidden"),x=this;for(l in a){var r=c.camelCase(l);if(l!==r){a[r]=a[l];delete a[l];l=r}if(a[l]==="hide"&&o||a[l]==="show"&&!o)return h.complete.call(this);if(k&&(l==="height"||l==="width")){h.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(c.css(this,"display")==="inline"&&c.css(this,"float")==="none")if(c.support.inlineBlockNeedsLayout)if(qa(this.nodeName)===
"inline")this.style.display="inline-block";else{this.style.display="inline";this.style.zoom=1}else this.style.display="inline-block"}if(c.isArray(a[l])){(h.specialEasing=h.specialEasing||{})[l]=a[l][1];a[l]=a[l][0]}}if(h.overflow!=null)this.style.overflow="hidden";h.curAnim=c.extend({},a);c.each(a,function(A,C){var J=new c.fx(x,h,A);if(vb.test(C))J[C==="toggle"?o?"show":"hide":C](a);else{var w=wb.exec(C),I=J.cur()||0;if(w){var L=parseFloat(w[2]),g=w[3]||"px";if(g!=="px"){c.style(x,A,(L||1)+g);I=(L||
1)/J.cur()*I;c.style(x,A,I+g)}if(w[1])L=(w[1]==="-="?-1:1)*L+I;J.custom(I,L,g)}else J.custom(I,C,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);this.each(function(){for(var e=d.length-1;e>=0;e--)if(d[e].elem===this){b&&d[e](true);d.splice(e,1)}});b||this.dequeue();return this}});c.each({slideDown:S("show",1),slideUp:S("hide",1),slideToggle:S("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){c.fn[a]=function(d,e,f){return this.animate(b,
d,e,f)}});c.extend({speed:function(a,b,d){var e=a&&typeof a==="object"?c.extend({},a):{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};e.duration=c.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in c.fx.speeds?c.fx.speeds[e.duration]:c.fx.speeds._default;e.old=e.complete;e.complete=function(){e.queue!==false&&c(this).dequeue();c.isFunction(e.old)&&e.old.call(this)};return e},easing:{linear:function(a,b,d,e){return d+e*a},swing:function(a,b,d,e){return(-Math.cos(a*
Math.PI)/2+0.5)*e+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||c.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a=parseFloat(c.css(this.elem,this.prop));return a&&a>-1E4?a:0},custom:function(a,b,d){function e(l){return f.step(l)}
var f=this,h=c.fx;this.startTime=c.now();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;this.pos=this.state=0;e.elem=this.elem;if(e()&&c.timers.push(e)&&!ba)ba=setInterval(h.tick,h.interval)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;
this.custom(this.cur(),0)},step:function(a){var b=c.now(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var e in this.options.curAnim)if(this.options.curAnim[e]!==true)d=false;if(d){if(this.options.overflow!=null&&!c.support.shrinkWrapBlocks){var f=this.elem,h=this.options;c.each(["","X","Y"],function(k,o){f.style["overflow"+o]=h.overflow[k]})}this.options.hide&&c(this.elem).hide();if(this.options.hide||
this.options.show)for(var l in this.options.curAnim)c.style(this.elem,l,this.options.orig[l]);this.options.complete.call(this.elem)}return false}else{a=b-this.startTime;this.state=a/this.options.duration;b=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||b](this.state,a,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=
c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||c.fx.stop()},interval:13,stop:function(){clearInterval(ba);ba=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===
b.elem}).length};var xb=/^t(?:able|d|h)$/i,Ia=/^(?:body|html)$/i;c.fn.offset="getBoundingClientRect"in t.documentElement?function(a){var b=this[0],d;if(a)return this.each(function(l){c.offset.setOffset(this,a,l)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);try{d=b.getBoundingClientRect()}catch(e){}var f=b.ownerDocument,h=f.documentElement;if(!d||!c.contains(h,b))return d||{top:0,left:0};b=f.body;f=fa(f);return{top:d.top+(f.pageYOffset||c.support.boxModel&&
h.scrollTop||b.scrollTop)-(h.clientTop||b.clientTop||0),left:d.left+(f.pageXOffset||c.support.boxModel&&h.scrollLeft||b.scrollLeft)-(h.clientLeft||b.clientLeft||0)}}:function(a){var b=this[0];if(a)return this.each(function(x){c.offset.setOffset(this,a,x)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d,e=b.offsetParent,f=b.ownerDocument,h=f.documentElement,l=f.body;d=(f=f.defaultView)?f.getComputedStyle(b,null):b.currentStyle;
for(var k=b.offsetTop,o=b.offsetLeft;(b=b.parentNode)&&b!==l&&b!==h;){if(c.offset.supportsFixedPosition&&d.position==="fixed")break;d=f?f.getComputedStyle(b,null):b.currentStyle;k-=b.scrollTop;o-=b.scrollLeft;if(b===e){k+=b.offsetTop;o+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&xb.test(b.nodeName))){k+=parseFloat(d.borderTopWidth)||0;o+=parseFloat(d.borderLeftWidth)||0}e=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"){k+=
parseFloat(d.borderTopWidth)||0;o+=parseFloat(d.borderLeftWidth)||0}d=d}if(d.position==="relative"||d.position==="static"){k+=l.offsetTop;o+=l.offsetLeft}if(c.offset.supportsFixedPosition&&d.position==="fixed"){k+=Math.max(h.scrollTop,l.scrollTop);o+=Math.max(h.scrollLeft,l.scrollLeft)}return{top:k,left:o}};c.offset={initialize:function(){var a=t.body,b=t.createElement("div"),d,e,f,h=parseFloat(c.css(a,"marginTop"))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",
height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";a.insertBefore(b,a.firstChild);d=b.firstChild;e=d.firstChild;f=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=e.offsetTop!==5;this.doesAddBorderForTableAndCells=
f.offsetTop===5;e.style.position="fixed";e.style.top="20px";this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15;e.style.position=e.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==h;a.removeChild(b);c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.css(a,
"marginTop"))||0;d+=parseFloat(c.css(a,"marginLeft"))||0}return{top:b,left:d}},setOffset:function(a,b,d){var e=c.css(a,"position");if(e==="static")a.style.position="relative";var f=c(a),h=f.offset(),l=c.css(a,"top"),k=c.css(a,"left"),o=e==="absolute"&&c.inArray("auto",[l,k])>-1;e={};var x={};if(o)x=f.position();l=o?x.top:parseInt(l,10)||0;k=o?x.left:parseInt(k,10)||0;if(c.isFunction(b))b=b.call(a,d,h);if(b.top!=null)e.top=b.top-h.top+l;if(b.left!=null)e.left=b.left-h.left+k;"using"in b?b.using.call(a,
e):f.css(e)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),e=Ia.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.css(a,"marginTop"))||0;d.left-=parseFloat(c.css(a,"marginLeft"))||0;e.top+=parseFloat(c.css(b[0],"borderTopWidth"))||0;e.left+=parseFloat(c.css(b[0],"borderLeftWidth"))||0;return{top:d.top-e.top,left:d.left-e.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||t.body;a&&!Ia.test(a.nodeName)&&
c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(e){var f=this[0],h;if(!f)return null;if(e!==B)return this.each(function(){if(h=fa(this))h.scrollTo(!a?e:c(h).scrollLeft(),a?e:c(h).scrollTop());else this[d]=e});else return(h=fa(f))?"pageXOffset"in h?h[a?"pageYOffset":"pageXOffset"]:c.support.boxModel&&h.document.documentElement[d]||h.document.body[d]:f[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();
c.fn["inner"+b]=function(){return this[0]?parseFloat(c.css(this[0],d,"padding")):null};c.fn["outer"+b]=function(e){return this[0]?parseFloat(c.css(this[0],d,e?"margin":"border")):null};c.fn[d]=function(e){var f=this[0];if(!f)return e==null?null:this;if(c.isFunction(e))return this.each(function(l){var k=c(this);k[d](e.call(this,l,k[d]()))});if(c.isWindow(f))return f.document.compatMode==="CSS1Compat"&&f.document.documentElement["client"+b]||f.document.body["client"+b];else if(f.nodeType===9)return Math.max(f.documentElement["client"+
b],f.body["scroll"+b],f.documentElement["scroll"+b],f.body["offset"+b],f.documentElement["offset"+b]);else if(e===B){f=c.css(f,d);var h=parseFloat(f);return c.isNaN(h)?f:h}else return this.css(d,typeof e==="string"?e:e+"px")}})})(window);
/*!
 * jQuery UI 1.8.4
 */
(function(c,j){function k(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.4",plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,
b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,
CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable",
"off").css("MozUserSelect","")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none")},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,
"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"));if(!isNaN(b)&&b!=0)return b}a=a.parent()}}return 0}});c.each(["Width","Height"],function(a,b){function d(f,g,l,m){c.each(e,function(){g-=
parseFloat(c.curCSS(f,"padding"+this,true))||0;if(l)g-=parseFloat(c.curCSS(f,"border"+this+"Width",true))||0;if(m)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c.style(this,h,d(this,f)+"px")})};c.fn["outer"+
b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c.style(this,h,d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");if("area"===b){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&k(a)}return(/input|select|textarea|button|object/.test(b)?!a.disabled:"a"==
b?a.href||!isNaN(d):!isNaN(d))&&k(a)},tabbable:function(a){var b=c.attr(a,"tabindex");return(isNaN(b)||b>=0)&&c(a).is(":focusable")}})}})(jQuery);
;/*!
 * jQuery UI Widget 1.8.4
 */
(function(b,j){var k=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return k.call(b(this),a,c)})};b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);
b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.substring(0,1)==="_")return h;e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):
this.each(function(){var g=b.data(this,a);if(g){d&&g.option(d);g._init()}else b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,b.metadata&&b.metadata.get(c)[this.widgetName],a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});
this._create();this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(a,c){var d=a,e=this;if(arguments.length===0)return b.extend({},e.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}b.each(d,function(f,
h){e._setOption(f,h)});return e},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=
b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*!
 * jQuery UI Mouse 1.8.4
 */
(function(c){c.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(b){return a._mouseDown(b)}).bind("click."+this.widgetName,function(b){if(a._preventClickEvent){a._preventClickEvent=false;b.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){a.originalEvent=a.originalEvent||{};if(!a.originalEvent.mouseHandled){this._mouseStarted&&
this._mouseUp(a);this._mouseDownEvent=a;var b=this,e=a.which==1,f=typeof this.options.cancel=="string"?c(a.target).parents().add(a.target).filter(this.options.cancel).length:false;if(!e||f||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){b.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();
return true}}this._mouseMoveDelegate=function(d){return b._mouseMove(d)};this._mouseUpDelegate=function(d){return b._mouseUp(d)};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);c.browser.safari||a.preventDefault();return a.originalEvent.mouseHandled=true}},_mouseMove:function(a){if(c.browser.msie&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&
this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=a.target==this._mouseDownEvent.target;this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-
a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
;/*!
 * jQuery UI Position 1.8.4
 */
(function(c){c.ui=c.ui||{};var m=/left|center|right/,n=/top|center|bottom/,p=c.fn.position,q=c.fn.offset;c.fn.position=function(a){if(!a||!a.of)return p.apply(this,arguments);a=c.extend({},a);var b=c(a.of),d=(a.collision||"flip").split(" "),e=a.offset?a.offset.split(" "):[0,0],g,h,i;if(a.of.nodeType===9){g=b.width();h=b.height();i={top:0,left:0}}else if(a.of.scrollTo&&a.of.document){g=b.width();h=b.height();i={top:b.scrollTop(),left:b.scrollLeft()}}else if(a.of.preventDefault){a.at="left top";g=h=
0;i={top:a.of.pageY,left:a.of.pageX}}else{g=b.outerWidth();h=b.outerHeight();i=b.offset()}c.each(["my","at"],function(){var f=(a[this]||"").split(" ");if(f.length===1)f=m.test(f[0])?f.concat(["center"]):n.test(f[0])?["center"].concat(f):["center","center"];f[0]=m.test(f[0])?f[0]:"center";f[1]=n.test(f[1])?f[1]:"center";a[this]=f});if(d.length===1)d[1]=d[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(a.at[0]==="right")i.left+=g;else if(a.at[0]==="center")i.left+=
g/2;if(a.at[1]==="bottom")i.top+=h;else if(a.at[1]==="center")i.top+=h/2;i.left+=e[0];i.top+=e[1];return this.each(function(){var f=c(this),k=f.outerWidth(),l=f.outerHeight(),j=c.extend({},i);if(a.my[0]==="right")j.left-=k;else if(a.my[0]==="center")j.left-=k/2;if(a.my[1]==="bottom")j.top-=l;else if(a.my[1]==="center")j.top-=l/2;j.left=parseInt(j.left);j.top=parseInt(j.top);c.each(["left","top"],function(o,r){c.ui.position[d[o]]&&c.ui.position[d[o]][r](j,{targetWidth:g,targetHeight:h,elemWidth:k,
elemHeight:l,offset:e,my:a.my,at:a.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(j,{using:a.using}))})};c.ui.position={fit:{left:function(a,b){var d=c(window);b=a.left+b.elemWidth-d.width()-d.scrollLeft();a.left=b>0?a.left-b:Math.max(0,a.left)},top:function(a,b){var d=c(window);b=a.top+b.elemHeight-d.height()-d.scrollTop();a.top=b>0?a.top-b:Math.max(0,a.top)}},flip:{left:function(a,b){if(b.at[0]!=="center"){var d=c(window);d=a.left+b.elemWidth-d.width()-d.scrollLeft();var e=b.my[0]==="left"?
-b.elemWidth:b.my[0]==="right"?b.elemWidth:0,g=-2*b.offset[0];a.left+=a.left<0?e+b.targetWidth+g:d>0?e-b.targetWidth+g:0}},top:function(a,b){if(b.at[1]!=="center"){var d=c(window);d=a.top+b.elemHeight-d.height()-d.scrollTop();var e=b.my[1]==="top"?-b.elemHeight:b.my[1]==="bottom"?b.elemHeight:0,g=b.at[1]==="top"?b.targetHeight:-b.targetHeight,h=-2*b.offset[1];a.top+=a.top<0?e+b.targetHeight+h:d>0?e+g+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(a,b){if(/static/.test(c.curCSS(a,"position")))a.style.position=
"relative";var d=c(a),e=d.offset(),g=parseInt(c.curCSS(a,"top",true),10)||0,h=parseInt(c.curCSS(a,"left",true),10)||0;e={top:b.top-e.top+g,left:b.left-e.left+h};"using"in b?b.using.call(a,e):d.css(e)};c.fn.offset=function(a){var b=this[0];if(!b||!b.ownerDocument)return null;if(a)return this.each(function(){c.offset.setOffset(this,a)});return q.call(this)}}})(jQuery);
;
/*!
 * jQuery UI Datepicker 1.8.11
 */
(function(d,A){function K(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._inDialog=this._datepickerShowing=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass=
"ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su",
"Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",
minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false};d.extend(this._defaults,this.regional[""]);this.dpDiv=d('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')}function F(a,b){d.extend(a,b);for(var c in b)if(b[c]==
null||b[c]==A)a[c]=b[c];return a}d.extend(d.ui,{datepicker:{version:"1.8.11"}});var y=(new Date).getTime();d.extend(K.prototype,{markerClassName:"hasDatepicker",log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){F(this._defaults,a||{});return this},_attachDatepicker:function(a,b){var c=null;for(var e in this._defaults){var f=a.getAttribute("date:"+e);if(f){c=c||{};try{c[e]=eval(f)}catch(h){c[e]=f}}}e=a.nodeName.toLowerCase();
f=e=="div"||e=="span";if(!a.id){this.uuid+=1;a.id="dp"+this.uuid}var i=this._newInst(d(a),f);i.settings=d.extend({},b||{},c||{});if(e=="input")this._connectDatepicker(a,i);else f&&this._inlineDatepicker(a,i)},_newInst:function(a,b){return{id:a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:!b?this.dpDiv:d('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')}},
_connectDatepicker:function(a,b){var c=d(a);b.append=d([]);b.trigger=d([]);if(!c.hasClass(this.markerClassName)){this._attachments(c,b);c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});this._autoSize(b);d.data(a,"datepicker",b)}},_attachments:function(a,b){var c=this._get(b,"appendText"),e=this._get(b,"isRTL");b.append&&
b.append.remove();if(c){b.append=d('<span class="'+this._appendClass+'">'+c+"</span>");a[e?"before":"after"](b.append)}a.unbind("focus",this._showDatepicker);b.trigger&&b.trigger.remove();c=this._get(b,"showOn");if(c=="focus"||c=="both")a.focus(this._showDatepicker);if(c=="button"||c=="both"){c=this._get(b,"buttonText");var f=this._get(b,"buttonImage");b.trigger=d(this._get(b,"buttonImageOnly")?d("<img/>").addClass(this._triggerClass).attr({src:f,alt:c,title:c}):d('<button type="button"></button>').addClass(this._triggerClass).html(f==
""?c:d("<img/>").attr({src:f,alt:c,title:c})));a[e?"before":"after"](b.trigger);b.trigger.click(function(){d.datepicker._datepickerShowing&&d.datepicker._lastInput==a[0]?d.datepicker._hideDatepicker():d.datepicker._showDatepicker(a[0]);return false})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var e=function(f){for(var h=0,i=0,g=0;g<f.length;g++)if(f[g].length>h){h=f[g].length;i=g}return i};b.setMonth(e(this._get(a,
c.match(/MM/)?"monthNames":"monthNamesShort")));b.setDate(e(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=d(a);if(!c.hasClass(this.markerClassName)){c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});d.data(a,"datepicker",b);this._setDate(b,this._getDefaultDate(b),
true);this._updateDatepicker(b);this._updateAlternate(b);b.dpDiv.show()}},_dialogDatepicker:function(a,b,c,e,f){a=this._dialogInst;if(!a){this.uuid+=1;this._dialogInput=d('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');this._dialogInput.keydown(this._doKeyDown);d("body").append(this._dialogInput);a=this._dialogInst=this._newInst(this._dialogInput,false);a.settings={};d.data(this._dialogInput[0],"datepicker",a)}F(a.settings,e||{});
b=b&&b.constructor==Date?this._formatDate(a,b):b;this._dialogInput.val(b);this._pos=f?f.length?f:[f.pageX,f.pageY]:null;if(!this._pos)this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");a.settings.onSelect=c;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);d.blockUI&&d.blockUI(this.dpDiv);d.data(this._dialogInput[0],"datepicker",a);return this},_destroyDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();d.removeData(a,"datepicker");if(e=="input"){c.append.remove();c.trigger.remove();b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",
this._doKeyUp)}else if(e=="div"||e=="span")b.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=false;c.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().removeClass("ui-state-disabled");this._disabledInputs=d.map(this._disabledInputs,
function(f){return f==a?null:f})}},_disableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=true;c.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().addClass("ui-state-disabled");this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:
f});this._disabledInputs[this._disabledInputs.length]=a}},_isDisabledDatepicker:function(a){if(!a)return false;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return true;return false},_getInst:function(a){try{return d.data(a,"datepicker")}catch(b){throw"Missing instance data for this datepicker";}},_optionDatepicker:function(a,b,c){var e=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?d.extend({},d.datepicker._defaults):e?b=="all"?d.extend({},
e.settings):this._get(e,b):null;var f=b||{};if(typeof b=="string"){f={};f[b]=c}if(e){this._curInst==e&&this._hideDatepicker();var h=this._getDateDatepicker(a,true),i=this._getMinMaxDate(e,"min"),g=this._getMinMaxDate(e,"max");F(e.settings,f);if(i!==null&&f.dateFormat!==A&&f.minDate===A)e.settings.minDate=this._formatDate(e,i);if(g!==null&&f.dateFormat!==A&&f.maxDate===A)e.settings.maxDate=this._formatDate(e,g);this._attachments(d(a),e);this._autoSize(e);this._setDateDatepicker(a,h);this._updateDatepicker(e)}},
_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){(a=this._getInst(a))&&this._updateDatepicker(a)},_setDateDatepicker:function(a,b){if(a=this._getInst(a)){this._setDate(a,b);this._updateDatepicker(a);this._updateAlternate(a)}},_getDateDatepicker:function(a,b){(a=this._getInst(a))&&!a.inline&&this._setDateFromField(a,b);return a?this._getDate(a):null},_doKeyDown:function(a){var b=d.datepicker._getInst(a.target),c=true,e=b.dpDiv.is(".ui-datepicker-rtl");
b._keyEvent=true;if(d.datepicker._datepickerShowing)switch(a.keyCode){case 9:d.datepicker._hideDatepicker();c=false;break;case 13:c=d("td."+d.datepicker._dayOverClass+":not(."+d.datepicker._currentClass+")",b.dpDiv);c[0]?d.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,c[0]):d.datepicker._hideDatepicker();return false;case 27:d.datepicker._hideDatepicker();break;case 33:d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),
"M");break;case 34:d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 35:if(a.ctrlKey||a.metaKey)d.datepicker._clearDate(a.target);c=a.ctrlKey||a.metaKey;break;case 36:if(a.ctrlKey||a.metaKey)d.datepicker._gotoToday(a.target);c=a.ctrlKey||a.metaKey;break;case 37:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?+1:-1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?
-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 38:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,-7,"D");c=a.ctrlKey||a.metaKey;break;case 39:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?-1:+1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 40:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,
+7,"D");c=a.ctrlKey||a.metaKey;break;default:c=false}else if(a.keyCode==36&&a.ctrlKey)d.datepicker._showDatepicker(this);else c=false;if(c){a.preventDefault();a.stopPropagation()}},_doKeyPress:function(a){var b=d.datepicker._getInst(a.target);if(d.datepicker._get(b,"constrainInput")){b=d.datepicker._possibleChars(d.datepicker._get(b,"dateFormat"));var c=String.fromCharCode(a.charCode==A?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||c<" "||!b||b.indexOf(c)>-1}},_doKeyUp:function(a){a=d.datepicker._getInst(a.target);
if(a.input.val()!=a.lastVal)try{if(d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,d.datepicker._getFormatConfig(a))){d.datepicker._setDateFromField(a);d.datepicker._updateAlternate(a);d.datepicker._updateDatepicker(a)}}catch(b){d.datepicker.log(b)}return true},_showDatepicker:function(a){a=a.target||a;if(a.nodeName.toLowerCase()!="input")a=d("input",a.parentNode)[0];if(!(d.datepicker._isDisabledDatepicker(a)||d.datepicker._lastInput==a)){var b=d.datepicker._getInst(a);
d.datepicker._curInst&&d.datepicker._curInst!=b&&d.datepicker._curInst.dpDiv.stop(true,true);var c=d.datepicker._get(b,"beforeShow");F(b.settings,c?c.apply(a,[a,b]):{});b.lastVal=null;d.datepicker._lastInput=a;d.datepicker._setDateFromField(b);if(d.datepicker._inDialog)a.value="";if(!d.datepicker._pos){d.datepicker._pos=d.datepicker._findPos(a);d.datepicker._pos[1]+=a.offsetHeight}var e=false;d(a).parents().each(function(){e|=d(this).css("position")=="fixed";return!e});if(e&&d.browser.opera){d.datepicker._pos[0]-=
document.documentElement.scrollLeft;d.datepicker._pos[1]-=document.documentElement.scrollTop}c={left:d.datepicker._pos[0],top:d.datepicker._pos[1]};d.datepicker._pos=null;b.dpDiv.empty();b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});d.datepicker._updateDatepicker(b);c=d.datepicker._checkOffset(b,c,e);b.dpDiv.css({position:d.datepicker._inDialog&&d.blockUI?"static":e?"fixed":"absolute",display:"none",left:c.left+"px",top:c.top+"px"});if(!b.inline){c=d.datepicker._get(b,"showAnim");
var f=d.datepicker._get(b,"duration"),h=function(){d.datepicker._datepickerShowing=true;var i=b.dpDiv.find("iframe.ui-datepicker-cover");if(i.length){var g=d.datepicker._getBorders(b.dpDiv);i.css({left:-g[0],top:-g[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})}};b.dpDiv.zIndex(d(a).zIndex()+1);d.effects&&d.effects[c]?b.dpDiv.show(c,d.datepicker._get(b,"showOptions"),f,h):b.dpDiv[c||"show"](c?f:null,h);if(!c||!f)h();b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus();d.datepicker._curInst=
b}}},_updateDatepicker:function(a){var b=this,c=d.datepicker._getBorders(a.dpDiv);a.dpDiv.empty().append(this._generateHTML(a));var e=a.dpDiv.find("iframe.ui-datepicker-cover");e.length&&e.css({left:-c[0],top:-c[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()});a.dpDiv.find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",function(){d(this).removeClass("ui-state-hover");this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).removeClass("ui-datepicker-prev-hover");
this.className.indexOf("ui-datepicker-next")!=-1&&d(this).removeClass("ui-datepicker-next-hover")}).bind("mouseover",function(){if(!b._isDisabledDatepicker(a.inline?a.dpDiv.parent()[0]:a.input[0])){d(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");d(this).addClass("ui-state-hover");this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).addClass("ui-datepicker-prev-hover");this.className.indexOf("ui-datepicker-next")!=-1&&d(this).addClass("ui-datepicker-next-hover")}}).end().find("."+
this._dayOverClass+" a").trigger("mouseover").end();c=this._getNumberOfMonths(a);e=c[1];e>1?a.dpDiv.addClass("ui-datepicker-multi-"+e).css("width",17*e+"em"):a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");a.dpDiv[(c[0]!=1||c[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");a==d.datepicker._curInst&&d.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&
a.input[0]!=document.activeElement&&a.input.focus();if(a.yearshtml){var f=a.yearshtml;setTimeout(function(){f===a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml);f=a.yearshtml=null},0)}},_getBorders:function(a){var b=function(c){return{thin:1,medium:2,thick:3}[c]||c};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkOffset:function(a,b,c){var e=a.dpDiv.outerWidth(),f=a.dpDiv.outerHeight(),h=a.input?a.input.outerWidth():
0,i=a.input?a.input.outerHeight():0,g=document.documentElement.clientWidth+d(document).scrollLeft(),j=document.documentElement.clientHeight+d(document).scrollTop();b.left-=this._get(a,"isRTL")?e-h:0;b.left-=c&&b.left==a.input.offset().left?d(document).scrollLeft():0;b.top-=c&&b.top==a.input.offset().top+i?d(document).scrollTop():0;b.left-=Math.min(b.left,b.left+e>g&&g>e?Math.abs(b.left+e-g):0);b.top-=Math.min(b.top,b.top+f>j&&j>f?Math.abs(f+i):0);return b},_findPos:function(a){for(var b=this._get(this._getInst(a),
"isRTL");a&&(a.type=="hidden"||a.nodeType!=1||d.expr.filters.hidden(a));)a=a[b?"previousSibling":"nextSibling"];a=d(a).offset();return[a.left,a.top]},_hideDatepicker:function(a){var b=this._curInst;if(!(!b||a&&b!=d.data(a,"datepicker")))if(this._datepickerShowing){a=this._get(b,"showAnim");var c=this._get(b,"duration"),e=function(){d.datepicker._tidyDialog(b);this._curInst=null};d.effects&&d.effects[a]?b.dpDiv.hide(a,d.datepicker._get(b,"showOptions"),c,e):b.dpDiv[a=="slideDown"?"slideUp":a=="fadeIn"?
"fadeOut":"hide"](a?c:null,e);a||e();if(a=this._get(b,"onClose"))a.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b]);this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if(d.blockUI){d.unblockUI();d("body").append(this.dpDiv)}}this._inDialog=false}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(a){if(d.datepicker._curInst){a=
d(a.target);a[0].id!=d.datepicker._mainDivId&&a.parents("#"+d.datepicker._mainDivId).length==0&&!a.hasClass(d.datepicker.markerClassName)&&!a.hasClass(d.datepicker._triggerClass)&&d.datepicker._datepickerShowing&&!(d.datepicker._inDialog&&d.blockUI)&&d.datepicker._hideDatepicker()}},_adjustDate:function(a,b,c){a=d(a);var e=this._getInst(a[0]);if(!this._isDisabledDatepicker(a[0])){this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c);this._updateDatepicker(e)}},_gotoToday:function(a){a=
d(a);var b=this._getInst(a[0]);if(this._get(b,"gotoCurrent")&&b.currentDay){b.selectedDay=b.currentDay;b.drawMonth=b.selectedMonth=b.currentMonth;b.drawYear=b.selectedYear=b.currentYear}else{var c=new Date;b.selectedDay=c.getDate();b.drawMonth=b.selectedMonth=c.getMonth();b.drawYear=b.selectedYear=c.getFullYear()}this._notifyChange(b);this._adjustDate(a)},_selectMonthYear:function(a,b,c){a=d(a);var e=this._getInst(a[0]);e._selectingMonthYear=false;e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c==
"M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10);this._notifyChange(e);this._adjustDate(a)},_clickMonthYear:function(a){var b=this._getInst(d(a)[0]);b.input&&b._selectingMonthYear&&setTimeout(function(){b.input.focus()},0);b._selectingMonthYear=!b._selectingMonthYear},_selectDay:function(a,b,c,e){var f=d(a);if(!(d(e).hasClass(this._unselectableClass)||this._isDisabledDatepicker(f[0]))){f=this._getInst(f[0]);f.selectedDay=f.currentDay=d("a",e).html();f.selectedMonth=f.currentMonth=
b;f.selectedYear=f.currentYear=c;this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))}},_clearDate:function(a){a=d(a);this._getInst(a[0]);this._selectDate(a,"")},_selectDate:function(a,b){a=this._getInst(d(a)[0]);b=b!=null?b:this._formatDate(a);a.input&&a.input.val(b);this._updateAlternate(a);var c=this._get(a,"onSelect");if(c)c.apply(a.input?a.input[0]:null,[b,a]);else a.input&&a.input.trigger("change");if(a.inline)this._updateDatepicker(a);else{this._hideDatepicker();
this._lastInput=a.input[0];typeof a.input[0]!="object"&&a.input.focus();this._lastInput=null}},_updateAlternate:function(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),e=this._getDate(a),f=this.formatDate(c,e,this._getFormatConfig(a));d(b).each(function(){d(this).val(f)})}},noWeekends:function(a){a=a.getDay();return[a>0&&a<6,""]},iso8601Week:function(a){a=new Date(a.getTime());a.setDate(a.getDate()+4-(a.getDay()||7));var b=a.getTime();a.setMonth(0);
a.setDate(1);return Math.floor(Math.round((b-a)/864E5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b=="object"?b.toString():b+"";if(b=="")return null;var e=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;e=typeof e!="string"?e:(new Date).getFullYear()%100+parseInt(e,10);for(var f=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,h=(c?c.dayNames:null)||this._defaults.dayNames,i=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?
c.monthNames:null)||this._defaults.monthNames,j=c=-1,l=-1,u=-1,k=false,o=function(p){(p=z+1<a.length&&a.charAt(z+1)==p)&&z++;return p},m=function(p){var v=o(p);p=new RegExp("^\\d{1,"+(p=="@"?14:p=="!"?20:p=="y"&&v?4:p=="o"?3:2)+"}");p=b.substring(s).match(p);if(!p)throw"Missing number at position "+s;s+=p[0].length;return parseInt(p[0],10)},n=function(p,v,H){p=o(p)?H:v;for(v=0;v<p.length;v++)if(b.substr(s,p[v].length).toLowerCase()==p[v].toLowerCase()){s+=p[v].length;return v+1}throw"Unknown name at position "+
s;},r=function(){if(b.charAt(s)!=a.charAt(z))throw"Unexpected literal at position "+s;s++},s=0,z=0;z<a.length;z++)if(k)if(a.charAt(z)=="'"&&!o("'"))k=false;else r();else switch(a.charAt(z)){case "d":l=m("d");break;case "D":n("D",f,h);break;case "o":u=m("o");break;case "m":j=m("m");break;case "M":j=n("M",i,g);break;case "y":c=m("y");break;case "@":var w=new Date(m("@"));c=w.getFullYear();j=w.getMonth()+1;l=w.getDate();break;case "!":w=new Date((m("!")-this._ticksTo1970)/1E4);c=w.getFullYear();j=w.getMonth()+
1;l=w.getDate();break;case "'":if(o("'"))r();else k=true;break;default:r()}if(c==-1)c=(new Date).getFullYear();else if(c<100)c+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c<=e?0:-100);if(u>-1){j=1;l=u;do{e=this._getDaysInMonth(c,j-1);if(l<=e)break;j++;l-=e}while(1)}w=this._daylightSavingAdjust(new Date(c,j-1,l));if(w.getFullYear()!=c||w.getMonth()+1!=j||w.getDate()!=l)throw"Invalid date";return w},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",
RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1E7,formatDate:function(a,b,c){if(!b)return"";var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,h=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort;c=(c?c.monthNames:null)||this._defaults.monthNames;var i=function(o){(o=k+1<a.length&&
a.charAt(k+1)==o)&&k++;return o},g=function(o,m,n){m=""+m;if(i(o))for(;m.length<n;)m="0"+m;return m},j=function(o,m,n,r){return i(o)?r[m]:n[m]},l="",u=false;if(b)for(var k=0;k<a.length;k++)if(u)if(a.charAt(k)=="'"&&!i("'"))u=false;else l+=a.charAt(k);else switch(a.charAt(k)){case "d":l+=g("d",b.getDate(),2);break;case "D":l+=j("D",b.getDay(),e,f);break;case "o":l+=g("o",(b.getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":l+=g("m",b.getMonth()+1,2);break;case "M":l+=j("M",
b.getMonth(),h,c);break;case "y":l+=i("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case "@":l+=b.getTime();break;case "!":l+=b.getTime()*1E4+this._ticksTo1970;break;case "'":if(i("'"))l+="'";else u=true;break;default:l+=a.charAt(k)}return l},_possibleChars:function(a){for(var b="",c=false,e=function(h){(h=f+1<a.length&&a.charAt(f+1)==h)&&f++;return h},f=0;f<a.length;f++)if(c)if(a.charAt(f)=="'"&&!e("'"))c=false;else b+=a.charAt(f);else switch(a.charAt(f)){case "d":case "m":case "y":case "@":b+=
"0123456789";break;case "D":case "M":return null;case "'":if(e("'"))b+="'";else c=true;break;default:b+=a.charAt(f)}return b},_get:function(a,b){return a.settings[b]!==A?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()!=a.lastVal){var c=this._get(a,"dateFormat"),e=a.lastVal=a.input?a.input.val():null,f,h;f=h=this._getDefaultDate(a);var i=this._getFormatConfig(a);try{f=this.parseDate(c,e,i)||h}catch(g){this.log(g);e=b?"":e}a.selectedDay=f.getDate();a.drawMonth=a.selectedMonth=
f.getMonth();a.drawYear=a.selectedYear=f.getFullYear();a.currentDay=e?f.getDate():0;a.currentMonth=e?f.getMonth():0;a.currentYear=e?f.getFullYear():0;this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var e=function(h){var i=new Date;i.setDate(i.getDate()+h);return i},f=function(h){try{return d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),h,d.datepicker._getFormatConfig(a))}catch(i){}var g=
(h.toLowerCase().match(/^c/)?d.datepicker._getDate(a):null)||new Date,j=g.getFullYear(),l=g.getMonth();g=g.getDate();for(var u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,k=u.exec(h);k;){switch(k[2]||"d"){case "d":case "D":g+=parseInt(k[1],10);break;case "w":case "W":g+=parseInt(k[1],10)*7;break;case "m":case "M":l+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break;case "y":case "Y":j+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break}k=u.exec(h)}return new Date(j,
l,g)};if(b=(b=b==null||b===""?c:typeof b=="string"?f(b):typeof b=="number"?isNaN(b)?c:e(b):new Date(b.getTime()))&&b.toString()=="Invalid Date"?c:b){b.setHours(0);b.setMinutes(0);b.setSeconds(0);b.setMilliseconds(0)}return this._daylightSavingAdjust(b)},_daylightSavingAdjust:function(a){if(!a)return null;a.setHours(a.getHours()>12?a.getHours()+2:0);return a},_setDate:function(a,b,c){var e=!b,f=a.selectedMonth,h=a.selectedYear;b=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=
a.currentDay=b.getDate();a.drawMonth=a.selectedMonth=a.currentMonth=b.getMonth();a.drawYear=a.selectedYear=a.currentYear=b.getFullYear();if((f!=a.selectedMonth||h!=a.selectedYear)&&!c)this._notifyChange(a);this._adjustInstDate(a);if(a.input)a.input.val(e?"":this._formatDate(a))},_getDate:function(a){return!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay))},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),
b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),e=this._get(a,"showButtonPanel"),f=this._get(a,"hideIfNoPrevNext"),h=this._get(a,"navigationAsDateFormat"),i=this._getNumberOfMonths(a),g=this._get(a,"showCurrentAtPos"),j=this._get(a,"stepMonths"),l=i[0]!=1||i[1]!=1,u=this._daylightSavingAdjust(!a.currentDay?new Date(9999,9,9):new Date(a.currentYear,a.currentMonth,a.currentDay)),k=this._getMinMaxDate(a,"min"),o=this._getMinMaxDate(a,"max");g=a.drawMonth-g;var m=a.drawYear;if(g<0){g+=12;m--}if(o){var n=
this._daylightSavingAdjust(new Date(o.getFullYear(),o.getMonth()-i[0]*i[1]+1,o.getDate()));for(n=k&&n<k?k:n;this._daylightSavingAdjust(new Date(m,g,1))>n;){g--;if(g<0){g=11;m--}}}a.drawMonth=g;a.drawYear=m;n=this._get(a,"prevText");n=!h?n:this.formatDate(n,this._daylightSavingAdjust(new Date(m,g-j,1)),this._getFormatConfig(a));n=this._canAdjustMonth(a,-1,m,g)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', -"+j+", 'M');\" title=\""+n+'"><span class="ui-icon ui-icon-circle-triangle-'+
(c?"e":"w")+'">'+n+"</span></a>":f?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>";var r=this._get(a,"nextText");r=!h?r:this.formatDate(r,this._daylightSavingAdjust(new Date(m,g+j,1)),this._getFormatConfig(a));f=this._canAdjustMonth(a,+1,m,g)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', +"+j+", 'M');\" title=\""+r+'"><span class="ui-icon ui-icon-circle-triangle-'+
(c?"w":"e")+'">'+r+"</span></a>":f?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+r+"</span></a>";j=this._get(a,"currentText");r=this._get(a,"gotoCurrent")&&a.currentDay?u:b;j=!h?j:this.formatDate(j,r,this._getFormatConfig(a));h=!a.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+y+'.datepicker._hideDatepicker();">'+this._get(a,
"closeText")+"</button>":"";e=e?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?h:"")+(this._isInRange(a,r)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._gotoToday('#"+a.id+"');\">"+j+"</button>":"")+(c?"":h)+"</div>":"";h=parseInt(this._get(a,"firstDay"),10);h=isNaN(h)?0:h;j=this._get(a,"showWeek");r=this._get(a,"dayNames");this._get(a,"dayNamesShort");var s=this._get(a,"dayNamesMin"),z=
this._get(a,"monthNames"),w=this._get(a,"monthNamesShort"),p=this._get(a,"beforeShowDay"),v=this._get(a,"showOtherMonths"),H=this._get(a,"selectOtherMonths");this._get(a,"calculateWeek");for(var L=this._getDefaultDate(a),I="",D=0;D<i[0];D++){for(var M="",E=0;E<i[1];E++){var N=this._daylightSavingAdjust(new Date(m,g,a.selectedDay)),t=" ui-corner-all",x="";if(l){x+='<div class="ui-datepicker-group';if(i[1]>1)switch(E){case 0:x+=" ui-datepicker-group-first";t=" ui-corner-"+(c?"right":"left");break;case i[1]-
1:x+=" ui-datepicker-group-last";t=" ui-corner-"+(c?"left":"right");break;default:x+=" ui-datepicker-group-middle";t="";break}x+='">'}x+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+t+'">'+(/all|left/.test(t)&&D==0?c?f:n:"")+(/all|right/.test(t)&&D==0?c?n:f:"")+this._generateMonthYearHeader(a,g,m,k,o,D>0||E>0,z,w)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var B=j?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(t=0;t<7;t++){var q=
(t+h)%7;B+="<th"+((t+h+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+r[q]+'">'+s[q]+"</span></th>"}x+=B+"</tr></thead><tbody>";B=this._getDaysInMonth(m,g);if(m==a.selectedYear&&g==a.selectedMonth)a.selectedDay=Math.min(a.selectedDay,B);t=(this._getFirstDayOfMonth(m,g)-h+7)%7;B=l?6:Math.ceil((t+B)/7);q=this._daylightSavingAdjust(new Date(m,g,1-t));for(var O=0;O<B;O++){x+="<tr>";var P=!j?"":'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(q)+"</td>";for(t=0;t<7;t++){var G=
p?p.apply(a.input?a.input[0]:null,[q]):[true,""],C=q.getMonth()!=g,J=C&&!H||!G[0]||k&&q<k||o&&q>o;P+='<td class="'+((t+h+6)%7>=5?" ui-datepicker-week-end":"")+(C?" ui-datepicker-other-month":"")+(q.getTime()==N.getTime()&&g==a.selectedMonth&&a._keyEvent||L.getTime()==q.getTime()&&L.getTime()==N.getTime()?" "+this._dayOverClass:"")+(J?" "+this._unselectableClass+" ui-state-disabled":"")+(C&&!v?"":" "+G[1]+(q.getTime()==u.getTime()?" "+this._currentClass:"")+(q.getTime()==b.getTime()?" ui-datepicker-today":
""))+'"'+((!C||v)&&G[2]?' title="'+G[2]+'"':"")+(J?"":' onclick="DP_jQuery_'+y+".datepicker._selectDay('#"+a.id+"',"+q.getMonth()+","+q.getFullYear()+', this);return false;"')+">"+(C&&!v?"&#xa0;":J?'<span class="ui-state-default">'+q.getDate()+"</span>":'<a class="ui-state-default'+(q.getTime()==b.getTime()?" ui-state-highlight":"")+(q.getTime()==u.getTime()?" ui-state-active":"")+(C?" ui-priority-secondary":"")+'" href="#">'+q.getDate()+"</a>")+"</td>";q.setDate(q.getDate()+1);q=this._daylightSavingAdjust(q)}x+=
P+"</tr>"}g++;if(g>11){g=0;m++}x+="</tbody></table>"+(l?"</div>"+(i[0]>0&&E==i[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");M+=x}I+=M}I+=e+(d.browser.msie&&parseInt(d.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");a._keyEvent=false;return I},_generateMonthYearHeader:function(a,b,c,e,f,h,i,g){var j=this._get(a,"changeMonth"),l=this._get(a,"changeYear"),u=this._get(a,"showMonthAfterYear"),k='<div class="ui-datepicker-title">',
o="";if(h||!j)o+='<span class="ui-datepicker-month">'+i[b]+"</span>";else{i=e&&e.getFullYear()==c;var m=f&&f.getFullYear()==c;o+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+a.id+"');\">";for(var n=0;n<12;n++)if((!i||n>=e.getMonth())&&(!m||n<=f.getMonth()))o+='<option value="'+n+'"'+(n==b?' selected="selected"':"")+">"+g[n]+"</option>";o+="</select>"}u||(k+=o+(h||!(j&&
l)?"&#xa0;":""));a.yearshtml="";if(h||!l)k+='<span class="ui-datepicker-year">'+c+"</span>";else{g=this._get(a,"yearRange").split(":");var r=(new Date).getFullYear();i=function(s){s=s.match(/c[+-].*/)?c+parseInt(s.substring(1),10):s.match(/[+-].*/)?r+parseInt(s,10):parseInt(s,10);return isNaN(s)?r:s};b=i(g[0]);g=Math.max(b,i(g[1]||""));b=e?Math.max(b,e.getFullYear()):b;g=f?Math.min(g,f.getFullYear()):g;for(a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+
a.id+"', this, 'Y');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+a.id+"');\">";b<=g;b++)a.yearshtml+='<option value="'+b+'"'+(b==c?' selected="selected"':"")+">"+b+"</option>";a.yearshtml+="</select>";if(d.browser.mozilla)k+='<select class="ui-datepicker-year"><option value="'+c+'" selected="selected">'+c+"</option></select>";else{k+=a.yearshtml;a.yearshtml=null}}k+=this._get(a,"yearSuffix");if(u)k+=(h||!(j&&l)?"&#xa0;":"")+o;k+="</div>";return k},_adjustInstDate:function(a,b,c){var e=
a.drawYear+(c=="Y"?b:0),f=a.drawMonth+(c=="M"?b:0);b=Math.min(a.selectedDay,this._getDaysInMonth(e,f))+(c=="D"?b:0);e=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(e,f,b)));a.selectedDay=e.getDate();a.drawMonth=a.selectedMonth=e.getMonth();a.drawYear=a.selectedYear=e.getFullYear();if(c=="M"||c=="Y")this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");b=c&&b<c?c:b;return b=a&&b>a?a:b},_notifyChange:function(a){var b=this._get(a,
"onChangeMonthYear");if(b)b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){a=this._get(a,"numberOfMonths");return a==null?[1,1]:typeof a=="number"?[1,a]:a},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,e){var f=this._getNumberOfMonths(a);
c=this._daylightSavingAdjust(new Date(c,e+(b<0?b:f[0]*f[1]),1));b<0&&c.setDate(this._getDaysInMonth(c.getFullYear(),c.getMonth()));return this._isInRange(a,c)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!a||b.getTime()<=a.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);return{shortYearCutoff:b,dayNamesShort:this._get(a,
"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,e){if(!b){a.currentDay=a.selectedDay;a.currentMonth=a.selectedMonth;a.currentYear=a.selectedYear}b=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(e,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),b,this._getFormatConfig(a))}});d.fn.datepicker=
function(a){if(!this.length)return this;if(!d.datepicker.initialized){d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);d.datepicker.initialized=true}var b=Array.prototype.slice.call(arguments,1);if(typeof a=="string"&&(a=="isDisabled"||a=="getDate"||a=="widget"))return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));if(a=="option"&&arguments.length==2&&typeof arguments[1]=="string")return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,
[this[0]].concat(b));return this.each(function(){typeof a=="string"?d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this].concat(b)):d.datepicker._attachDatepicker(this,a)})};d.datepicker=new K;d.datepicker.initialized=false;d.datepicker.uuid=(new Date).getTime();d.datepicker.version="1.8.11";window["DP_jQuery_"+y]=d})(jQuery);
;
/*!
 * jQuery UI Slider 1.8.6
 */
(function(d){d.widget("ui.slider",d.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var a=this,b=this.options;this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");b.disabled&&this.element.addClass("ui-slider-disabled ui-disabled");
this.range=d([]);if(b.range){if(b.range===true){this.range=d("<div></div>");if(!b.values)b.values=[this._valueMin(),this._valueMin()];if(b.values.length&&b.values.length!==2)b.values=[b.values[0],b.values[0]]}else this.range=d("<div></div>");this.range.appendTo(this.element).addClass("ui-slider-range");if(b.range==="min"||b.range==="max")this.range.addClass("ui-slider-range-"+b.range);this.range.addClass("ui-widget-header")}d(".ui-slider-handle",this.element).length===0&&d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
if(b.values&&b.values.length)for(;d(".ui-slider-handle",this.element).length<b.values.length;)d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");this.handles=d(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(c){c.preventDefault()}).hover(function(){b.disabled||d(this).addClass("ui-state-hover")},function(){d(this).removeClass("ui-state-hover")}).focus(function(){if(b.disabled)d(this).blur();
else{d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");d(this).addClass("ui-state-focus")}}).blur(function(){d(this).removeClass("ui-state-focus")});this.handles.each(function(c){d(this).data("index.ui-slider-handle",c)});this.handles.keydown(function(c){var e=true,f=d(this).data("index.ui-slider-handle"),h,g,i;if(!a.options.disabled){switch(c.keyCode){case d.ui.keyCode.HOME:case d.ui.keyCode.END:case d.ui.keyCode.PAGE_UP:case d.ui.keyCode.PAGE_DOWN:case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:e=
false;if(!a._keySliding){a._keySliding=true;d(this).addClass("ui-state-active");h=a._start(c,f);if(h===false)return}break}i=a.options.step;h=a.options.values&&a.options.values.length?(g=a.values(f)):(g=a.value());switch(c.keyCode){case d.ui.keyCode.HOME:g=a._valueMin();break;case d.ui.keyCode.END:g=a._valueMax();break;case d.ui.keyCode.PAGE_UP:g=a._trimAlignValue(h+(a._valueMax()-a._valueMin())/5);break;case d.ui.keyCode.PAGE_DOWN:g=a._trimAlignValue(h-(a._valueMax()-a._valueMin())/5);break;case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:if(h===
a._valueMax())return;g=a._trimAlignValue(h+i);break;case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:if(h===a._valueMin())return;g=a._trimAlignValue(h-i);break}a._slide(c,f,g);return e}}).keyup(function(c){var e=d(this).data("index.ui-slider-handle");if(a._keySliding){a._keySliding=false;a._stop(c,e);a._change(c,e);d(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();return this},_mouseCapture:function(a){var b=this.options,c,e,f,h,g;if(b.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();c=this._normValueFromMouse({x:a.pageX,y:a.pageY});e=this._valueMax()-this._valueMin()+1;h=this;this.handles.each(function(i){var j=Math.abs(c-h.values(i));if(e>j){e=j;f=d(this);g=i}});if(b.range===true&&this.values(1)===b.min){g+=1;f=d(this.handles[g])}if(this._start(a,
g)===false)return false;this._mouseSliding=true;h._handleIndex=g;f.addClass("ui-state-active").focus();b=f.offset();this._clickOffset=!d(a.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:a.pageX-b.left-f.width()/2,top:a.pageY-b.top-f.height()/2-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)};this._slide(a,g,c);return this._animateOff=true},_mouseStart:function(){return true},_mouseDrag:function(a){var b=
this._normValueFromMouse({x:a.pageX,y:a.pageY});this._slide(a,this._handleIndex,b);return false},_mouseStop:function(a){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(a,this._handleIndex);this._change(a,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b;if(this.orientation==="horizontal"){b=
this.elementSize.width;a=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{b=this.elementSize.height;a=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}b=a/b;if(b>1)b=1;if(b<0)b=0;if(this.orientation==="vertical")b=1-b;a=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+b*a)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);
c.values=this.values()}return this._trigger("start",a,c)},_slide:function(a,b,c){var e;if(this.options.values&&this.options.values.length){e=this.values(b?0:1);if(this.options.values.length===2&&this.options.range===true&&(b===0&&c>e||b===1&&c<e))c=e;if(c!==this.values(b)){e=this.values();e[b]=c;a=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e});this.values(b?0:1);a!==false&&this.values(b,c,true)}}else if(c!==this.value()){a=this._trigger("slide",a,{handle:this.handles[b],value:c});
a!==false&&this.value(c)}},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}this._trigger("change",a,c)}},value:function(a){if(arguments.length){this.options.value=
this._trimAlignValue(a);this._refreshValue();this._change(null,0)}return this._value()},values:function(a,b){var c,e,f;if(arguments.length>1){this.options.values[a]=this._trimAlignValue(b);this._refreshValue();this._change(null,a)}if(arguments.length)if(d.isArray(arguments[0])){c=this.options.values;e=arguments[0];for(f=0;f<c.length;f+=1){c[f]=this._trimAlignValue(e[f]);this._change(null,f)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(a):this.value();
else return this._values()},_setOption:function(a,b){var c,e=0;if(d.isArray(this.options.values))e=this.options.values.length;d.Widget.prototype._setOption.apply(this,arguments);switch(a){case "disabled":if(b){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled");this.element.addClass("ui-disabled")}else{this.handles.removeAttr("disabled");this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(c=0;c<e;c+=1)this._change(null,c);this._animateOff=false;break}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a)},_values:function(a){var b,c;if(arguments.length){b=this.options.values[a];
return b=this._trimAlignValue(b)}else{b=this.options.values.slice();for(c=0;c<b.length;c+=1)b[c]=this._trimAlignValue(b[c]);return b}},_trimAlignValue:function(a){if(a<this._valueMin())return this._valueMin();if(a>this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=a%b;a=a-c;if(Math.abs(c)*2>=b)a+=c>0?b:-b;return parseFloat(a.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var a=
this.options.range,b=this.options,c=this,e=!this._animateOff?b.animate:false,f,h={},g,i,j,l;if(this.options.values&&this.options.values.length)this.handles.each(function(k){f=(c.values(k)-c._valueMin())/(c._valueMax()-c._valueMin())*100;h[c.orientation==="horizontal"?"left":"bottom"]=f+"%";d(this).stop(1,1)[e?"animate":"css"](h,b.animate);if(c.options.range===true)if(c.orientation==="horizontal"){if(k===0)c.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},b.animate);if(k===1)c.range[e?"animate":"css"]({width:f-
g+"%"},{queue:false,duration:b.animate})}else{if(k===0)c.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},b.animate);if(k===1)c.range[e?"animate":"css"]({height:f-g+"%"},{queue:false,duration:b.animate})}g=f});else{i=this.value();j=this._valueMin();l=this._valueMax();f=l!==j?(i-j)/(l-j)*100:0;h[c.orientation==="horizontal"?"left":"bottom"]=f+"%";this.handle.stop(1,1)[e?"animate":"css"](h,b.animate);if(a==="min"&&this.orientation==="horizontal")this.range.stop(1,1)[e?"animate":"css"]({width:f+"%"},
b.animate);if(a==="max"&&this.orientation==="horizontal")this.range[e?"animate":"css"]({width:100-f+"%"},{queue:false,duration:b.animate});if(a==="min"&&this.orientation==="vertical")this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},b.animate);if(a==="max"&&this.orientation==="vertical")this.range[e?"animate":"css"]({height:100-f+"%"},{queue:false,duration:b.animate})}}});d.extend(d.ui.slider,{version:"1.8.6"})})(jQuery);
;
if(jQuery.browser.msie && parseFloat(jQuery.browser.version) < 7){
/*!
 * DD_belatedPNG
*/
var DD_belatedPNG={ns:"DD_belatedPNG",imgSize:{},delay:10,nodesFixed:0,createVmlNameSpace:function(){if(document.namespaces&&!document.namespaces[this.ns]){document.namespaces.add(this.ns,"urn:schemas-microsoft-com:vml")}},createVmlStyleSheet:function(){var b,a;b=document.createElement("style");b.setAttribute("media","screen");document.documentElement.firstChild.insertBefore(b,document.documentElement.firstChild.firstChild);if(b.styleSheet){b=b.styleSheet;b.addRule(this.ns+"\\:*","{behavior:url(#default#VML)}");b.addRule(this.ns+"\\:shape","position:absolute;");b.addRule("img."+this.ns+"_sizeFinder","behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;");this.screenStyleSheet=b;a=document.createElement("style");a.setAttribute("media","print");document.documentElement.firstChild.insertBefore(a,document.documentElement.firstChild.firstChild);a=a.styleSheet;a.addRule(this.ns+"\\:*","{display: none !important;}");a.addRule("img."+this.ns+"_sizeFinder","{display: none !important;}")}},readPropertyChange:function(){var b,c,a;b=event.srcElement;if(!b.vmlInitiated){return}if(event.propertyName.search("background")!=-1||event.propertyName.search("border")!=-1){DD_belatedPNG.applyVML(b)}if(event.propertyName=="style.display"){c=(b.currentStyle.display=="none")?"none":"block";for(a in b.vml){if(b.vml.hasOwnProperty(a)){b.vml[a].shape.style.display=c}}}if(event.propertyName.search("filter")!=-1){DD_belatedPNG.vmlOpacity(b)}},vmlOpacity:function(b){if(b.currentStyle.filter.search("lpha")!=-1){var a=b.currentStyle.filter;a=parseInt(a.substring(a.lastIndexOf("=")+1,a.lastIndexOf(")")),10)/100;b.vml.color.shape.style.filter=b.currentStyle.filter;b.vml.image.fill.opacity=a}},handlePseudoHover:function(a){setTimeout(function(){DD_belatedPNG.applyVML(a)},1)},fix:function(a){if(this.screenStyleSheet){var c,b;c=a.split(",");for(b=0;b<c.length;b++){this.screenStyleSheet.addRule(c[b],"behavior:expression(DD_belatedPNG.fixPng(this))")}}},applyVML:function(a){a.runtimeStyle.cssText="";this.vmlFill(a);this.vmlOffsets(a);this.vmlOpacity(a);if(a.isImg){this.copyImageBorders(a)}},attachHandlers:function(i){var d,c,g,e,b,f;d=this;c={resize:"vmlOffsets",move:"vmlOffsets"};if(i.nodeName=="A"){e={mouseleave:"handlePseudoHover",mouseenter:"handlePseudoHover",focus:"handlePseudoHover",blur:"handlePseudoHover"};for(b in e){if(e.hasOwnProperty(b)){c[b]=e[b]}}}for(f in c){if(c.hasOwnProperty(f)){g=function(){d[c[f]](i)};i.attachEvent("on"+f,g)}}i.attachEvent("onpropertychange",this.readPropertyChange)},giveLayout:function(a){a.style.zoom=1;if(a.currentStyle.position=="static"){a.style.position="relative"}},copyImageBorders:function(b){var c,a;c={borderStyle:true,borderWidth:true,borderColor:true};for(a in c){if(c.hasOwnProperty(a)){b.vml.color.shape.style[a]=b.currentStyle[a]}}},vmlFill:function(e){if(!e.currentStyle){return}else{var d,f,g,b,a,c;d=e.currentStyle}for(b in e.vml){if(e.vml.hasOwnProperty(b)){e.vml[b].shape.style.zIndex=d.zIndex}}e.runtimeStyle.backgroundColor="";e.runtimeStyle.backgroundImage="";f=true;if(d.backgroundImage!="none"||e.isImg){if(!e.isImg){e.vmlBg=d.backgroundImage;e.vmlBg=e.vmlBg.substr(5,e.vmlBg.lastIndexOf('")')-5)}else{e.vmlBg=e.src}g=this;if(!g.imgSize[e.vmlBg]){a=document.createElement("img");g.imgSize[e.vmlBg]=a;a.className=g.ns+"_sizeFinder";a.runtimeStyle.cssText="behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;";c=function(){this.width=this.offsetWidth;this.height=this.offsetHeight;g.vmlOffsets(e)};a.attachEvent("onload",c);a.src=e.vmlBg;a.removeAttribute("width");a.removeAttribute("height");document.body.insertBefore(a,document.body.firstChild)}e.vml.image.fill.src=e.vmlBg;f=false}e.vml.image.fill.on=!f;e.vml.image.fill.color="none";e.vml.color.shape.style.backgroundColor=d.backgroundColor;e.runtimeStyle.backgroundImage="none";e.runtimeStyle.backgroundColor="transparent"},vmlOffsets:function(d){var h,n,a,e,g,m,f,l,j,i,k;h=d.currentStyle;n={W:d.clientWidth+1,H:d.clientHeight+1,w:this.imgSize[d.vmlBg].width,h:this.imgSize[d.vmlBg].height,L:d.offsetLeft,T:d.offsetTop,bLW:d.clientLeft,bTW:d.clientTop};a=(n.L+n.bLW==1)?1:0;e=function(b,p,q,c,s,u){b.coordsize=c+","+s;b.coordorigin=u+","+u;b.path="m0,0l"+c+",0l"+c+","+s+"l0,"+s+" xe";b.style.width=c+"px";b.style.height=s+"px";b.style.left=p+"px";b.style.top=q+"px"};e(d.vml.color.shape,(n.L+(d.isImg?0:n.bLW)),(n.T+(d.isImg?0:n.bTW)),(n.W-1),(n.H-1),0);e(d.vml.image.shape,(n.L+n.bLW),(n.T+n.bTW),(n.W),(n.H),1);g={X:0,Y:0};if(d.isImg){g.X=parseInt(h.paddingLeft,10)+1;g.Y=parseInt(h.paddingTop,10)+1}else{for(j in g){if(g.hasOwnProperty(j)){this.figurePercentage(g,n,j,h["backgroundPosition"+j])}}}d.vml.image.fill.position=(g.X/n.W)+","+(g.Y/n.H);m=h.backgroundRepeat;f={T:1,R:n.W+a,B:n.H,L:1+a};l={X:{b1:"L",b2:"R",d:"W"},Y:{b1:"T",b2:"B",d:"H"}};if(m!="repeat"||d.isImg){i={T:(g.Y),R:(g.X+n.w),B:(g.Y+n.h),L:(g.X)};if(m.search("repeat-")!=-1){k=m.split("repeat-")[1].toUpperCase();i[l[k].b1]=1;i[l[k].b2]=n[l[k].d]}if(i.B>n.H){i.B=n.H}d.vml.image.shape.style.clip="rect("+i.T+"px "+(i.R+a)+"px "+i.B+"px "+(i.L+a)+"px)"}else{d.vml.image.shape.style.clip="rect("+f.T+"px "+f.R+"px "+f.B+"px "+f.L+"px)"}},figurePercentage:function(d,c,f,a){var b,e;e=true;b=(f=="X");switch(a){case"left":case"top":d[f]=0;break;case"center":d[f]=0.5;break;case"right":case"bottom":d[f]=1;break;default:if(a.search("%")!=-1){d[f]=parseInt(a,10)/100}else{e=false}}d[f]=Math.ceil(e?((c[b?"W":"H"]*d[f])-(c[b?"w":"h"]*d[f])):parseInt(a,10));if(d[f]%2===0){d[f]++}return d[f]},fixPng:function(c){c.style.behavior="none";var g,b,f,a,d;if(c.nodeName=="BODY"||c.nodeName=="TD"||c.nodeName=="TR"){return}c.isImg=false;if(c.nodeName=="IMG"){if(c.src.toLowerCase().search(/\.png$/)!=-1){c.isImg=true;c.style.visibility="hidden"}else{return}}else{if(c.currentStyle.backgroundImage.toLowerCase().search(".png")==-1){return}}g=DD_belatedPNG;c.vml={color:{},image:{}};b={shape:{},fill:{}};for(a in c.vml){if(c.vml.hasOwnProperty(a)){for(d in b){if(b.hasOwnProperty(d)){f=g.ns+":"+d;c.vml[a][d]=document.createElement(f)}}c.vml[a].shape.stroked=false;c.vml[a].shape.appendChild(c.vml[a].fill);c.parentNode.insertBefore(c.vml[a].shape,c)}}c.vml.image.shape.fillcolor="none";c.vml.image.fill.type="tile";c.vml.color.fill.on=false;g.attachHandlers(c);g.giveLayout(c);g.giveLayout(c.offsetParent);c.vmlInitiated=true;g.applyVML(c)}};try{document.execCommand("BackgroundImageCache",false,true)}catch(r){}DD_belatedPNG.createVmlNameSpace();DD_belatedPNG.createVmlStyleSheet();
}
/*!
 * Cufon version 1.09i
 */
var Cufon=(function(){var m=function(){return m.replace.apply(null,arguments)};var x=m.DOM={ready:(function(){var C=false,E={loaded:1,complete:1};var B=[],D=function(){if(C){return}C=true;for(var F;F=B.shift();F()){}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",D,false);window.addEventListener("pageshow",D,false)}if(!window.opera&&document.readyState){(function(){E[document.readyState]?D():setTimeout(arguments.callee,10)})()}if(document.readyState&&document.createStyleSheet){(function(){try{document.body.doScroll("left");D()}catch(F){setTimeout(arguments.callee,1)}})()}q(window,"load",D);return function(F){if(!arguments.length){D()}else{C?F():B.push(F)}}})(),root:function(){return document.documentElement||document.body}};var n=m.CSS={Size:function(C,B){this.value=parseFloat(C);this.unit=String(C).match(/[a-z%]*$/)[0]||"px";this.convert=function(D){return D/B*this.value};this.convertFrom=function(D){return D/this.value*B};this.toString=function(){return this.value+this.unit}},addClass:function(C,B){var D=C.className;C.className=D+(D&&" ")+B;return C},color:j(function(C){var B={};B.color=C.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(E,D,F){B.opacity=parseFloat(F);return"rgb("+D+")"});return B}),fontStretch:j(function(B){if(typeof B=="number"){return B}if(/%$/.test(B)){return parseFloat(B)/100}return{"ultra-condensed":0.5,"extra-condensed":0.625,condensed:0.75,"semi-condensed":0.875,"semi-expanded":1.125,expanded:1.25,"extra-expanded":1.5,"ultra-expanded":2}[B]||1}),getStyle:function(C){var B=document.defaultView;if(B&&B.getComputedStyle){return new a(B.getComputedStyle(C,null))}if(C.currentStyle){return new a(C.currentStyle)}return new a(C.style)},gradient:j(function(F){var G={id:F,type:F.match(/^-([a-z]+)-gradient\(/)[1],stops:[]},C=F.substr(F.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var E=0,B=C.length,D;E<B;++E){D=C[E].split("=",2).reverse();G.stops.push([D[1]||E/(B-1),D[0]])}return G}),quotedList:j(function(E){var D=[],C=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,B;while(B=C.exec(E)){D.push(B[3]||B[1])}return D}),recognizesMedia:j(function(G){var E=document.createElement("style"),D,C,B;E.type="text/css";E.media=G;try{E.appendChild(document.createTextNode("/**/"))}catch(F){}C=g("head")[0];C.insertBefore(E,C.firstChild);D=(E.sheet||E.styleSheet);B=D&&!D.disabled;C.removeChild(E);return B}),removeClass:function(D,C){var B=RegExp("(?:^|\\s+)"+C+"(?=\\s|$)","g");D.className=D.className.replace(B,"");return D},supports:function(D,C){var B=document.createElement("span").style;if(B[D]===undefined){return false}B[D]=C;return B[D]===C},textAlign:function(E,D,B,C){if(D.get("textAlign")=="right"){if(B>0){E=" "+E}}else{if(B<C-1){E+=" "}}return E},textShadow:j(function(F){if(F=="none"){return null}var E=[],G={},B,C=0;var D=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(B=D.exec(F)){if(B[0]==","){E.push(G);G={};C=0}else{if(B[1]){G.color=B[1]}else{G[["offX","offY","blur"][C++]]=B[2]}}}E.push(G);return E}),textTransform:(function(){var B={uppercase:function(C){return C.toUpperCase()},lowercase:function(C){return C.toLowerCase()},capitalize:function(C){return C.replace(/\b./g,function(D){return D.toUpperCase()})}};return function(E,D){var C=B[D.get("textTransform")];return C?C(E):E}})(),whiteSpace:(function(){var D={inline:1,"inline-block":1,"run-in":1};var C=/^\s+/,B=/\s+$/;return function(H,F,G,E){if(E){if(E.nodeName.toLowerCase()=="br"){H=H.replace(C,"")}}if(D[F.get("display")]){return H}if(!G.previousSibling){H=H.replace(C,"")}if(!G.nextSibling){H=H.replace(B,"")}return H}})()};n.ready=(function(){var B=!n.recognizesMedia("all"),E=false;var D=[],H=function(){B=true;for(var K;K=D.shift();K()){}};var I=g("link"),J=g("style");function C(K){return K.disabled||G(K.sheet,K.media||"screen")}function G(M,P){if(!n.recognizesMedia(P||"all")){return true}if(!M||M.disabled){return false}try{var Q=M.cssRules,O;if(Q){search:for(var L=0,K=Q.length;O=Q[L],L<K;++L){switch(O.type){case 2:break;case 3:if(!G(O.styleSheet,O.media.mediaText)){return false}break;default:break search}}}}catch(N){}return true}function F(){if(document.createStyleSheet){return true}var L,K;for(K=0;L=I[K];++K){if(L.rel.toLowerCase()=="stylesheet"&&!C(L)){return false}}for(K=0;L=J[K];++K){if(!C(L)){return false}}return true}x.ready(function(){if(!E){E=n.getStyle(document.body).isUsable()}if(B||(E&&F())){H()}else{setTimeout(arguments.callee,10)}});return function(K){if(B){K()}else{D.push(K)}}})();function s(D){var C=this.face=D.face,B={"\u0020":1,"\u00a0":1,"\u3000":1};this.glyphs=D.glyphs;this.w=D.w;this.baseSize=parseInt(C["units-per-em"],10);this.family=C["font-family"].toLowerCase();this.weight=C["font-weight"];this.style=C["font-style"]||"normal";this.viewBox=(function(){var F=C.bbox.split(/\s+/);var E={minX:parseInt(F[0],10),minY:parseInt(F[1],10),maxX:parseInt(F[2],10),maxY:parseInt(F[3],10)};E.width=E.maxX-E.minX;E.height=E.maxY-E.minY;E.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")};return E})();this.ascent=-parseInt(C.ascent,10);this.descent=-parseInt(C.descent,10);this.height=-this.ascent+this.descent;this.spacing=function(L,N,E){var O=this.glyphs,M,K,G,P=[],F=0,J=-1,I=-1,H;while(H=L[++J]){M=O[H]||this.missingGlyph;if(!M){continue}if(K){F-=G=K[H]||0;P[I]-=G}F+=P[++I]=~~(M.w||this.w)+N+(B[H]?E:0);K=M.k}P.total=F;return P}}function f(){var C={},B={oblique:"italic",italic:"oblique"};this.add=function(D){(C[D.style]||(C[D.style]={}))[D.weight]=D};this.get=function(H,I){var G=C[H]||C[B[H]]||C.normal||C.italic||C.oblique;if(!G){return null}I={normal:400,bold:700}[I]||parseInt(I,10);if(G[I]){return G[I]}var E={1:1,99:0}[I%100],K=[],F,D;if(E===undefined){E=I>400}if(I==500){I=400}for(var J in G){if(!k(G,J)){continue}J=parseInt(J,10);if(!F||J<F){F=J}if(!D||J>D){D=J}K.push(J)}if(I<F){I=F}if(I>D){I=D}K.sort(function(M,L){return(E?(M>=I&&L>=I)?M<L:M>L:(M<=I&&L<=I)?M>L:M<L)?-1:1});return G[K[0]]}}function r(){function D(F,G){if(F.contains){return F.contains(G)}return F.compareDocumentPosition(G)&16}function B(G){var F=G.relatedTarget;if(!F||D(this,F)){return}C(this,G.type=="mouseover")}function E(F){C(this,F.type=="mouseenter")}function C(F,G){setTimeout(function(){var H=d.get(F).options;m.replace(F,G?h(H,H.hover):H,true)},10)}this.attach=function(F){if(F.onmouseenter===undefined){q(F,"mouseover",B);q(F,"mouseout",B)}else{q(F,"mouseenter",E);q(F,"mouseleave",E)}}}function u(){var C=[],D={};function B(H){var E=[],G;for(var F=0;G=H[F];++F){E[F]=C[D[G]]}return E}this.add=function(F,E){D[F]=C.push(E)-1};this.repeat=function(){var E=arguments.length?B(arguments):C,F;for(var G=0;F=E[G++];){m.replace(F[0],F[1],true)}}}function A(){var D={},B=0;function C(E){return E.cufid||(E.cufid=++B)}this.get=function(E){var F=C(E);return D[F]||(D[F]={})}}function a(B){var D={},C={};this.extend=function(E){for(var F in E){if(k(E,F)){D[F]=E[F]}}return this};this.get=function(E){return D[E]!=undefined?D[E]:B[E]};this.getSize=function(F,E){return C[F]||(C[F]=new n.Size(this.get(F),E))};this.isUsable=function(){return !!B}}function q(C,B,D){if(C.addEventListener){C.addEventListener(B,D,false)}else{if(C.attachEvent){C.attachEvent("on"+B,function(){return D.call(C,window.event)})}}}function v(C,B){var D=d.get(C);if(D.options){return C}if(B.hover&&B.hoverables[C.nodeName.toLowerCase()]){b.attach(C)}D.options=B;return C}function j(B){var C={};return function(D){if(!k(C,D)){C[D]=B.apply(null,arguments)}return C[D]}}function c(F,E){var B=n.quotedList(E.get("fontFamily").toLowerCase()),D;for(var C=0;D=B[C];++C){if(i[D]){return i[D].get(E.get("fontStyle"),E.get("fontWeight"))}}return null}function g(B){return document.getElementsByTagName(B)}function k(C,B){return C.hasOwnProperty(B)}function h(){var C={},B,F;for(var E=0,D=arguments.length;B=arguments[E],E<D;++E){for(F in B){if(k(B,F)){C[F]=B[F]}}}return C}function o(E,M,C,N,F,D){var K=document.createDocumentFragment(),H;if(M===""){return K}var L=N.separate;var I=M.split(p[L]),B=(L=="words");if(B&&t){if(/^\s/.test(M)){I.unshift("")}if(/\s$/.test(M)){I.push("")}}for(var J=0,G=I.length;J<G;++J){H=z[N.engine](E,B?n.textAlign(I[J],C,J,G):I[J],C,N,F,D,J<G-1);if(H){K.appendChild(H)}}return K}function l(D,M){var C=D.nodeName.toLowerCase();if(M.ignore[C]){return}var E=!M.textless[C];var B=n.getStyle(v(D,M)).extend(M);var F=c(D,B),G,K,I,H,L,J;if(!F){return}for(G=D.firstChild;G;G=I){K=G.nodeType;I=G.nextSibling;if(E&&K==3){if(H){H.appendData(G.data);D.removeChild(G)}else{H=G}if(I){continue}}if(H){D.replaceChild(o(F,n.whiteSpace(H.data,B,H,J),B,M,G,D),H);H=null}if(K==1){if(G.firstChild){if(G.nodeName.toLowerCase()=="cufon"){z[M.engine](F,null,B,M,G,D)}else{arguments.callee(G,M)}}J=G}}}var t=" ".split(/\s+/).length==0;var d=new A();var b=new r();var y=new u();var e=false;var z={},i={},w={autoDetect:false,engine:null,forceHitArea:false,hover:false,hoverables:{a:true},ignore:{applet:1,canvas:1,col:1,colgroup:1,head:1,iframe:1,map:1,optgroup:1,option:1,script:1,select:1,style:1,textarea:1,title:1,pre:1},printable:true,selector:(window.Sizzle||(window.jQuery&&function(B){return jQuery(B)})||(window.dojo&&dojo.query)||(window.Ext&&Ext.query)||(window.YAHOO&&YAHOO.util&&YAHOO.util.Selector&&YAHOO.util.Selector.query)||(window.$$&&function(B){return $$(B)})||(window.$&&function(B){return $(B)})||(document.querySelectorAll&&function(B){return document.querySelectorAll(B)})||g),separate:"words",textless:{dl:1,html:1,ol:1,table:1,tbody:1,thead:1,tfoot:1,tr:1,ul:1},textShadow:"none"};var p={words:/\s/.test("\u00a0")?/[^\S\u00a0]+/:/\s+/,characters:"",none:/^/};m.now=function(){x.ready();return m};m.refresh=function(){y.repeat.apply(y,arguments);return m};m.registerEngine=function(C,B){if(!B){return m}z[C]=B;return m.set("engine",C)};m.registerFont=function(D){if(!D){return m}var B=new s(D),C=B.family;if(!i[C]){i[C]=new f()}i[C].add(B);return m.set("fontFamily",'"'+C+'"')};m.replace=function(D,C,B){C=h(w,C);if(!C.engine){return m}if(!e){n.addClass(x.root(),"cufon-active cufon-loading");n.ready(function(){n.addClass(n.removeClass(x.root(),"cufon-loading"),"cufon-ready")});e=true}if(C.hover){C.forceHitArea=true}if(C.autoDetect){delete C.fontFamily}if(typeof C.textShadow=="string"){C.textShadow=n.textShadow(C.textShadow)}if(typeof C.color=="string"&&/^-/.test(C.color)){C.textGradient=n.gradient(C.color)}else{delete C.textGradient}if(!B){y.add(D,arguments)}if(D.nodeType||typeof D=="string"){D=[D]}n.ready(function(){for(var F=0,E=D.length;F<E;++F){var G=D[F];if(typeof G=="string"){m.replace(C.selector(G),C,true)}else{l(G,C)}}});return m};m.set=function(B,C){w[B]=C;return m};return m})();Cufon.registerEngine("vml",(function(){var e=document.namespaces;if(!e){return}e.add("cvml","urn:schemas-microsoft-com:vml");e=null;var b=document.createElement("cvml:shape");b.style.behavior="url(#default#VML)";if(!b.coordsize){return}b=null;var h=(document.documentMode||0)<8;document.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:'+(h?"middle":"text-bottom")+";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>").replace(/;/g,"!important;"));function c(i,j){return a(i,/(?:em|ex|%)$|^[a-z-]+$/i.test(j)?"1em":j)}function a(l,m){if(m==="0"){return 0}if(/px$/i.test(m)){return parseFloat(m)}var k=l.style.left,j=l.runtimeStyle.left;l.runtimeStyle.left=l.currentStyle.left;l.style.left=m.replace("%","em");var i=l.style.pixelLeft;l.style.left=k;l.runtimeStyle.left=j;return i}function f(l,k,j,n){var i="computed"+n,m=k[i];if(isNaN(m)){m=k.get(n);k[i]=m=(m=="normal")?0:~~j.convertFrom(a(l,m))}return m}var g={};function d(p){var q=p.id;if(!g[q]){var n=p.stops,o=document.createElement("cvml:fill"),i=[];o.type="gradient";o.angle=180;o.focus="0";o.method="sigma";o.color=n[0][1];for(var m=1,l=n.length-1;m<l;++m){i.push(n[m][0]*100+"% "+n[m][1])}o.colors=i.join(",");o.color2=n[l][1];g[q]=o}return g[q]}return function(ac,G,Y,C,K,ad,W){var n=(G===null);if(n){G=K.alt}var I=ac.viewBox;var p=Y.computedFontSize||(Y.computedFontSize=new Cufon.CSS.Size(c(ad,Y.get("fontSize"))+"px",ac.baseSize));var y,q;if(n){y=K;q=K.firstChild}else{y=document.createElement("cufon");y.className="cufon cufon-vml";y.alt=G;q=document.createElement("cufoncanvas");y.appendChild(q);if(C.printable){var Z=document.createElement("cufontext");Z.appendChild(document.createTextNode(G));y.appendChild(Z)}if(!W){y.appendChild(document.createElement("cvml:shape"))}}var ai=y.style;var R=q.style;var l=p.convert(I.height),af=Math.ceil(l);var V=af/l;var P=V*Cufon.CSS.fontStretch(Y.get("fontStretch"));var U=I.minX,T=I.minY;R.height=af;R.top=Math.round(p.convert(T-ac.ascent));R.left=Math.round(p.convert(U));ai.height=p.convert(ac.height)+"px";var F=Y.get("color");var ag=Cufon.CSS.textTransform(G,Y).split("");var L=ac.spacing(ag,f(ad,Y,p,"letterSpacing"),f(ad,Y,p,"wordSpacing"));if(!L.length){return null}var k=L.total;var x=-U+k+(I.width-L[L.length-1]);var ah=p.convert(x*P),X=Math.round(ah);var O=x+","+I.height,m;var J="r"+O+"ns";var u=C.textGradient&&d(C.textGradient);var o=ac.glyphs,S=0;var H=C.textShadow;var ab=-1,aa=0,w;while(w=ag[++ab]){var D=o[ag[ab]]||ac.missingGlyph,v;if(!D){continue}if(n){v=q.childNodes[aa];while(v.firstChild){v.removeChild(v.firstChild)}}else{v=document.createElement("cvml:shape");q.appendChild(v)}v.stroked="f";v.coordsize=O;v.coordorigin=m=(U-S)+","+T;v.path=(D.d?"m"+D.d+"xe":"")+"m"+m+J;v.fillcolor=F;if(u){v.appendChild(u.cloneNode(false))}var ae=v.style;ae.width=X;ae.height=af;if(H){var s=H[0],r=H[1];var B=Cufon.CSS.color(s.color),z;var N=document.createElement("cvml:shadow");N.on="t";N.color=B.color;N.offset=s.offX+","+s.offY;if(r){z=Cufon.CSS.color(r.color);N.type="double";N.color2=z.color;N.offset2=r.offX+","+r.offY}N.opacity=B.opacity||(z&&z.opacity)||1;v.appendChild(N)}S+=L[aa++]}var M=v.nextSibling,t,A;if(C.forceHitArea){if(!M){M=document.createElement("cvml:rect");M.stroked="f";M.className="cufon-vml-cover";t=document.createElement("cvml:fill");t.opacity=0;M.appendChild(t);q.appendChild(M)}A=M.style;A.width=X;A.height=af}else{if(M){q.removeChild(M)}}ai.width=Math.max(Math.ceil(p.convert(k*P)),0);if(h){var Q=Y.computedYAdjust;if(Q===undefined){var E=Y.get("lineHeight");if(E=="normal"){E="1em"}else{if(!isNaN(E)){E+="em"}}Y.computedYAdjust=Q=0.5*(a(ad,E)-parseFloat(ai.height))}if(Q){ai.marginTop=Math.ceil(Q)+"px";ai.marginBottom=Q+"px"}}return y}})());Cufon.registerEngine("canvas",(function(){var b=document.createElement("canvas");if(!b||!b.getContext||!b.getContext.apply){return}b=null;var a=Cufon.CSS.supports("display","inline-block");var e=!a&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var f=document.createElement("style");f.type="text/css";f.appendChild(document.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(e?"":"font-size:1px;line-height:1px;")+"}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(a?"cufon canvas{position:relative;}":"cufon canvas{position:absolute;}")+"}@media print{cufon{padding:0;}cufon canvas{display:none;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(f);function d(p,h){var n=0,m=0;var g=[],o=/([mrvxe])([^a-z]*)/g,k;generate:for(var j=0;k=o.exec(p);++j){var l=k[2].split(",");switch(k[1]){case"v":g[j]={m:"bezierCurveTo",a:[n+~~l[0],m+~~l[1],n+~~l[2],m+~~l[3],n+=~~l[4],m+=~~l[5]]};break;case"r":g[j]={m:"lineTo",a:[n+=~~l[0],m+=~~l[1]]};break;case"m":g[j]={m:"moveTo",a:[n=~~l[0],m=~~l[1]]};break;case"x":g[j]={m:"closePath"};break;case"e":break generate}h[g[j].m].apply(h,g[j].a)}return g}function c(m,k){for(var j=0,h=m.length;j<h;++j){var g=m[j];k[g.m].apply(k,g.a)}}return function(V,w,P,t,C,W){var k=(w===null);if(k){w=C.getAttribute("alt")}var A=V.viewBox;var m=P.getSize("fontSize",V.baseSize);var B=0,O=0,N=0,u=0;var z=t.textShadow,L=[];if(z){for(var U=z.length;U--;){var F=z[U];var K=m.convertFrom(parseFloat(F.offX));var I=m.convertFrom(parseFloat(F.offY));L[U]=[K,I];if(I<B){B=I}if(K>O){O=K}if(I>N){N=I}if(K<u){u=K}}}var Z=Cufon.CSS.textTransform(w,P).split("");var E=V.spacing(Z,~~m.convertFrom(parseFloat(P.get("letterSpacing"))||0),~~m.convertFrom(parseFloat(P.get("wordSpacing"))||0));if(!E.length){return null}var h=E.total;O+=A.width-E[E.length-1];u+=A.minX;var s,n;if(k){s=C;n=C.firstChild}else{s=document.createElement("cufon");s.className="cufon cufon-canvas";s.setAttribute("alt",w);n=document.createElement("canvas");s.appendChild(n);if(t.printable){var S=document.createElement("cufontext");S.appendChild(document.createTextNode(w));s.appendChild(S)}}var aa=s.style;var H=n.style;var j=m.convert(A.height);var Y=Math.ceil(j);var M=Y/j;var G=M*Cufon.CSS.fontStretch(P.get("fontStretch"));var J=h*G;var Q=Math.ceil(m.convert(J+O-u));var o=Math.ceil(m.convert(A.height-B+N));n.width=Q;n.height=o;H.width=Q+"px";H.height=o+"px";B+=A.minY;H.top=Math.round(m.convert(B-V.ascent))+"px";H.left=Math.round(m.convert(u))+"px";var r=Math.max(Math.ceil(m.convert(J)),0)+"px";if(a){aa.width=r;aa.height=m.convert(V.height)+"px"}else{aa.paddingLeft=r;aa.paddingBottom=(m.convert(V.height)-1)+"px"}var X=n.getContext("2d"),D=j/A.height;X.scale(D,D*M);X.translate(-u,-B);X.save();function T(){var x=V.glyphs,ab,l=-1,g=-1,y;X.scale(G,1);while(y=Z[++l]){var ab=x[Z[l]]||V.missingGlyph;if(!ab){continue}if(ab.d){X.beginPath();if(ab.code){c(ab.code,X)}else{ab.code=d("m"+ab.d,X)}X.fill()}X.translate(E[++g],0)}X.restore()}if(z){for(var U=z.length;U--;){var F=z[U];X.save();X.fillStyle=F.color;X.translate.apply(X,L[U]);T()}}var q=t.textGradient;if(q){var v=q.stops,p=X.createLinearGradient(0,A.minY,0,A.maxY);for(var U=0,R=v.length;U<R;++U){p.addColorStop.apply(p,v[U])}X.fillStyle=p}else{X.fillStyle=P.get("color")}T();return s}})());
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * ? 1988, 1990, 1993, 2002 Adobe Systems Incorporated. All rights reserved.
 * 
 * Trademark:
 * Helvetica is a trademark of Linotype Corp. registered in the U.S. Patent and
 * Trademark Office and may be registered in certain other jurisdictions in the
 * name of Linotype Corp. or its licensee Linotype GmbH.
 * 
 * Full name:
 * HelveticaNeueLTStd-Lt
 * 
 * Designer:
 * Linotype Staff
 * 
 * Vendor URL:
 * http://www.adobe.com/type
 * 
 * License information:
 * http://www.adobe.com/type/legal.html
 */
Cufon.registerFont({"w":200,"face":{"font-family":"Helvetica Neue LT Std Light","font-weight":300,"font-stretch":"normal","units-per-em":"360","panose-1":"2 11 4 3 2 2 2 2 2 4","ascent":"257","descent":"-103","x-height":"5","bbox":"-60 -348 378 77","underline-thickness":"18","underline-position":"-18","stemh":"19","stemv":"23","unicode-range":"U+0020-U+FB02"},"glyphs":{" ":{"w":100},"!":{"d":"37,-64r-6,-116r0,-77r25,0r0,77r-6,116r-13,0xm59,0r-31,0r0,-38r31,0r0,38","w":86},"\"":{"d":"31,-170r0,-87r23,0r0,87r-23,0xm79,-170r0,-87r23,0r0,87r-23,0","w":133},"#":{"d":"179,-96r0,16r-40,0r-11,80r-18,0r11,-80r-51,0r-11,80r-18,0r11,-80r-39,0r0,-16r41,0r8,-57r-39,0r0,-16r41,0r12,-80r18,0r-12,80r51,0r11,-80r18,0r-11,80r38,0r0,16r-40,0r-8,57r38,0xm131,-153r-51,0r-8,57r51,0"},"$":{"d":"107,-117r0,103v31,0,60,-15,60,-52v0,-34,-32,-44,-60,-51xm93,-143r0,-100v-29,0,-53,15,-53,53v0,33,26,41,53,47xm10,-82r23,0v0,41,22,64,60,68r0,-106v-41,-9,-76,-22,-76,-72v0,-43,34,-70,76,-70r0,-29r14,0r0,29v42,0,77,31,76,78r-23,0v0,-36,-22,-59,-53,-59r0,103v41,9,83,23,83,73v0,47,-41,72,-83,72r0,31r-14,0r0,-31v-56,-5,-81,-32,-83,-87"},"%":{"d":"82,-238v-30,0,-38,29,-38,52v0,23,8,52,38,52v30,0,38,-29,38,-52v0,-23,-8,-52,-38,-52xm82,-254v41,0,57,29,57,68v0,39,-16,68,-57,68v-41,0,-57,-29,-57,-68v0,-39,16,-68,57,-68xm240,-131v41,0,57,29,57,68v0,39,-16,68,-57,68v-41,0,-57,-29,-57,-68v0,-39,16,-68,57,-68xm240,-114v-30,0,-38,29,-38,52v0,23,8,51,38,51v30,0,38,-28,38,-51v0,-23,-8,-52,-38,-52xm68,12r163,-273r17,0r-162,273r-18,0","w":320},"&":{"d":"153,-50r-64,-78v-24,13,-52,33,-52,64v0,30,27,50,56,50v26,0,46,-15,60,-36xm195,0r-28,-33v-37,58,-154,50,-153,-34v0,-37,34,-61,63,-76v-14,-18,-32,-37,-32,-62v0,-31,26,-52,57,-52v31,0,57,21,57,52v0,32,-24,51,-50,67r56,67v6,-13,7,-24,7,-43r23,0v0,14,-3,40,-15,62r43,52r-28,0xm102,-238v-19,0,-34,12,-34,33v0,18,18,38,29,52v18,-11,39,-27,39,-52v0,-21,-15,-33,-34,-33","w":219},"\u2019":{"d":"36,-257r30,0v1,41,2,77,-32,87r0,-15v12,-4,18,-22,17,-34r-15,0r0,-38","w":100,"k":{"\u2019":43,"s":40,"\u0161":40,"t":6}},"(":{"d":"87,69r-18,0v-68,-98,-66,-234,0,-331r18,0v-61,98,-61,234,0,331","w":86},")":{"d":"0,-262r18,0v67,97,65,234,0,331r-18,0v61,-98,61,-234,0,-331","w":86},"*":{"d":"51,-200r-41,-14r5,-14r41,15r0,-44r14,0r0,44r42,-15r5,14r-42,14r25,35r-11,8r-26,-36r-27,36r-11,-8","w":126},"+":{"d":"99,-100r0,-81r19,0r0,81r81,0r0,19r-81,0r0,81r-19,0r0,-81r-81,0r0,-19r81,0","w":216},",":{"d":"35,-38r30,0v1,41,2,77,-32,87r0,-15v12,-4,18,-22,17,-34r-15,0r0,-38","w":100},"-":{"d":"112,-89r-90,0r0,-20r90,0r0,20","w":133},".":{"d":"65,0r-30,0r0,-38r30,0r0,38","w":100},"\/":{"d":"15,5r-20,0r111,-267r19,0","w":119},"0":{"d":"100,-235v-58,0,-65,66,-65,110v0,44,7,111,65,111v58,0,65,-67,65,-111v0,-44,-7,-110,-65,-110xm100,-254v73,0,88,70,88,129v0,59,-15,130,-88,130v-73,0,-88,-70,-88,-129v0,-59,15,-130,88,-130"},"1":{"d":"35,-187r0,-16v40,-1,64,-3,71,-49r18,0r0,252r-22,0r0,-187r-67,0"},"2":{"d":"178,-183v-1,86,-117,91,-139,162r140,0r0,21r-166,0v2,-75,76,-95,121,-136v37,-33,21,-99,-35,-99v-41,0,-58,33,-57,70r-23,0v-1,-52,26,-89,81,-89v44,0,78,24,78,71"},"3":{"d":"12,-80r23,0v-1,40,22,66,63,66v33,0,64,-19,64,-55v-1,-43,-35,-58,-80,-54r0,-19v38,3,71,-6,71,-46v0,-33,-25,-47,-55,-47v-38,0,-59,27,-58,64r-22,0v0,-48,30,-83,79,-83v40,0,78,19,78,64v0,27,-15,50,-42,56v33,5,52,30,52,63v0,49,-41,76,-87,76v-52,0,-90,-31,-86,-85"},"4":{"d":"11,-63r0,-22r116,-167r21,0r0,170r38,0r0,19r-38,0r0,63r-21,0r0,-63r-116,0xm31,-82r96,0r-1,-137"},"5":{"d":"13,-72r23,0v1,35,27,58,62,58v39,0,63,-31,63,-68v0,-65,-90,-89,-121,-36r-19,0r24,-131r126,0r0,21r-110,0r-16,84v49,-51,138,-11,138,64v0,49,-39,85,-87,85v-47,0,-82,-29,-83,-77"},"6":{"d":"104,-145v-40,0,-62,30,-62,67v0,36,19,64,63,64v36,0,60,-29,60,-64v0,-37,-22,-67,-61,-67xm182,-188r-23,0v-4,-28,-23,-47,-52,-47v-58,-1,-72,69,-69,113v12,-25,39,-42,67,-42v50,0,83,35,83,84v0,49,-35,85,-85,85v-61,0,-89,-36,-89,-134v0,-30,8,-125,90,-125v44,0,73,22,78,66"},"7":{"d":"18,-228r0,-21r162,0r0,21v-31,33,-96,111,-102,228r-24,0v6,-85,34,-148,104,-228r-140,0"},"8":{"d":"100,-14v35,0,64,-18,64,-57v0,-36,-30,-54,-64,-54v-35,0,-64,17,-64,54v0,38,29,57,64,57xm176,-191v1,28,-17,46,-41,56v32,6,52,30,52,64v0,51,-40,76,-87,76v-47,0,-87,-25,-87,-76v0,-34,22,-57,51,-65v-26,-8,-41,-27,-41,-55v1,-84,152,-85,153,0xm100,-144v28,0,54,-15,54,-47v0,-29,-24,-44,-54,-44v-28,0,-54,15,-54,44v0,34,27,47,54,47"},"9":{"d":"96,-104v40,0,62,-29,62,-66v0,-36,-19,-65,-63,-65v-36,0,-60,30,-60,65v0,37,22,66,61,66xm18,-60r23,0v4,28,24,46,53,46v58,1,71,-68,68,-112v-12,25,-39,41,-67,41v-50,0,-83,-35,-83,-84v0,-49,36,-85,86,-85v61,0,88,36,88,134v0,30,-8,125,-90,125v-44,0,-73,-21,-78,-65"},":":{"d":"65,-142r-30,0r0,-38r30,0r0,38xm65,0r-30,0r0,-38r30,0r0,38","w":100},";":{"d":"35,-38r30,0v1,41,2,77,-32,87r0,-15v12,-4,18,-22,17,-34r-15,0r0,-38xm65,-142r-30,0r0,-38r30,0r0,38","w":100},"<":{"d":"199,-17r0,20r-182,-84r0,-20r182,-84r0,20r-160,74","w":216},"=":{"d":"199,-136r0,19r-181,0r0,-19r181,0xm199,-65r0,19r-181,0r0,-19r181,0","w":216},">":{"d":"17,-17r160,-74r-160,-74r0,-20r182,84r0,20r-182,84r0,-20","w":216},"?":{"d":"87,-64v-11,-64,65,-75,65,-131v0,-29,-24,-48,-52,-48v-39,0,-59,28,-58,65r-23,0v0,-51,30,-84,82,-84v40,0,73,24,73,66v0,61,-78,70,-65,132r-22,0xm83,0r0,-38r30,0r0,38r-30,0","w":193},"@":{"d":"153,-184v-37,0,-61,50,-61,84v0,22,13,34,30,34v33,0,60,-52,60,-84v0,-17,-15,-34,-29,-34xm221,-196r-35,104v-5,15,-7,30,5,30v32,0,61,-50,61,-90v0,-59,-47,-94,-102,-94v-67,0,-114,53,-114,119v0,66,48,116,114,116v35,0,72,-18,93,-48r19,0v-22,40,-67,64,-112,64v-77,0,-133,-59,-133,-135v0,-75,59,-132,132,-132v69,0,122,46,122,112v0,58,-43,104,-83,104v-12,0,-24,-8,-25,-24v-26,39,-94,26,-94,-29v0,-50,35,-104,86,-104v16,0,30,9,38,31r9,-24r19,0","w":288},"A":{"d":"-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm114,-233r-52,132r101,0","w":226},"B":{"d":"50,-123r0,102v66,-3,149,18,152,-53v2,-62,-90,-48,-152,-49xm26,0r0,-257v81,4,188,-23,191,63v0,27,-18,52,-45,58v33,4,55,30,55,63v0,24,-8,73,-92,73r-109,0xm50,-236r0,92v57,0,143,9,143,-44v0,-62,-83,-46,-143,-48","w":240},"C":{"d":"238,-179r-24,0v-9,-40,-42,-63,-79,-63v-132,1,-130,226,0,227v48,0,77,-37,82,-83r25,0v-7,63,-47,103,-107,103v-81,0,-121,-64,-121,-134v0,-70,40,-133,121,-133v49,0,97,29,103,83","w":253},"D":{"d":"50,-236r0,215v97,5,158,-9,158,-108v0,-99,-61,-113,-158,-107xm26,0r0,-257r89,0v77,2,118,44,118,128v0,84,-41,129,-118,129r-89,0","w":246},"E":{"d":"26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0","w":213},"F":{"d":"26,0r0,-257r163,0r0,21r-139,0r0,93r124,0r0,21r-124,0r0,122r-24,0","w":193,"k":{"A":20,"\u00c6":20,"\u00c1":20,"\u00c2":20,"\u00c4":20,"\u00c0":20,"\u00c5":20,"\u00c3":20,",":46,".":46}},"G":{"d":"246,-131r0,131r-18,0v-2,-15,0,-34,-4,-47v-17,37,-52,52,-89,52v-81,0,-121,-64,-121,-134v0,-70,40,-133,121,-133v54,0,98,29,107,85r-24,0v-3,-30,-34,-65,-83,-65v-132,1,-130,226,0,227v57,0,90,-41,89,-95r-88,0r0,-21r110,0","w":266},"H":{"d":"26,0r0,-257r24,0r0,112r153,0r0,-112r25,0r0,257r-25,0r0,-125r-153,0r0,125r-24,0","w":253},"I":{"d":"28,0r0,-257r24,0r0,257r-24,0","w":79},"J":{"d":"130,-82r0,-175r24,0r0,185v0,52,-20,77,-75,77v-59,0,-71,-42,-71,-87r24,0v1,22,-2,67,49,67v38,0,49,-20,49,-67","w":180},"K":{"d":"26,0r0,-257r24,0r0,138r150,-138r33,0r-115,106r120,151r-31,0r-107,-134r-50,46r0,88r-24,0","w":233},"L":{"d":"26,0r0,-257r24,0r0,236r144,0r0,21r-168,0","w":193,"k":{"T":33,"V":33,"W":20,"y":13,"\u00fd":13,"\u00ff":13,"Y":40,"\u00dd":40,"\u0178":40,"\u2019":35}},"M":{"d":"25,0r0,-257r36,0r89,225r89,-225r36,0r0,257r-25,0r-1,-222r-87,222r-23,0r-89,-222r0,222r-25,0","w":299},"N":{"d":"26,0r0,-257r27,0r150,217r0,-217r25,0r0,257r-27,0r-151,-217r0,217r-24,0","w":253},"O":{"d":"12,-129v0,-70,41,-133,122,-133v81,0,121,63,121,133v0,70,-40,134,-121,134v-81,0,-122,-64,-122,-134xm134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227","w":266},"P":{"d":"26,0r0,-257r114,0v46,0,76,27,76,73v0,46,-30,74,-76,74r-90,0r0,110r-24,0xm50,-236r0,105v63,-2,142,15,142,-53v0,-67,-79,-50,-142,-52","w":226,"k":{"A":27,"\u00c6":27,"\u00c1":27,"\u00c2":27,"\u00c4":27,"\u00c0":27,"\u00c5":27,"\u00c3":27,",":55,".":55}},"Q":{"d":"160,-69r37,28v59,-60,42,-201,-63,-201v-132,1,-130,226,0,227v19,0,34,-5,47,-13r-34,-26xm252,1r-12,16r-40,-31v-18,12,-39,19,-66,19v-81,0,-122,-64,-122,-134v0,-70,41,-133,122,-133v125,0,155,163,82,235","w":266},"R":{"d":"202,0v-16,-45,6,-114,-59,-114r-93,0r0,114r-24,0r0,-257v85,3,195,-22,196,67v1,33,-19,58,-50,66v62,4,34,81,57,124r-27,0xm50,-236r0,101v63,-2,144,15,147,-50v3,-65,-85,-50,-147,-51","w":240,"k":{"T":-2,"V":-2,"W":-2,"y":-9,"\u00fd":-9,"\u00ff":-9,"Y":5,"\u00dd":5,"\u0178":5}},"S":{"d":"13,-85r24,0v-1,53,37,70,84,70v27,0,68,-16,68,-53v0,-83,-167,-24,-168,-122v0,-25,17,-72,89,-72v51,0,95,26,95,79r-25,0v2,-72,-134,-84,-134,-7v0,47,64,42,101,54v35,12,67,26,67,68v0,18,-7,73,-98,73v-61,0,-106,-27,-103,-90","w":226},"T":{"d":"-2,-236r0,-21r204,0r0,21r-90,0r0,236r-24,0r0,-236r-90,0","k":{"\u00fc":33,"\u0161":40,"\u00f2":40,"\u00f6":40,"\u00e8":40,"\u00eb":40,"\u00ea":40,"\u00e3":40,"\u00e5":40,"\u00e0":40,"\u00e4":40,"\u00e2":40,"w":40,"y":40,"\u00fd":40,"\u00ff":40,"A":24,"\u00c6":24,"\u00c1":24,"\u00c2":24,"\u00c4":24,"\u00c0":24,"\u00c5":24,"\u00c3":24,",":40,".":40,"c":40,"\u00e7":40,"e":40,"\u00e9":40,"o":40,"\u00f8":40,"\u0153":40,"\u00f3":40,"\u00f4":40,"\u00f5":40,"-":46,"a":40,"\u00e6":40,"\u00e1":40,"i":-9,"\u0131":-9,"\u00ed":-9,"\u00ee":-9,"\u00ef":-9,"\u00ec":-9,"r":33,"s":40,"u":33,"\u00fa":33,"\u00fb":33,"\u00f9":33,":":40,";":40}},"U":{"d":"123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,60,28,83,75,83v48,0,76,-23,76,-83r0,-159r24,0v-7,120,37,262,-100,262","w":246},"V":{"d":"93,0r-96,-257r27,0r84,230r83,-230r26,0r-96,257r-28,0","w":213,"k":{"\u00f6":20,"\u00f4":20,"\u00e8":20,"\u00eb":20,"\u00ea":20,"\u00e3":20,"\u00e5":20,"\u00e0":20,"\u00e4":20,"\u00e2":20,"y":6,"\u00fd":6,"\u00ff":6,"A":20,"\u00c6":20,"\u00c1":20,"\u00c2":20,"\u00c4":20,"\u00c0":20,"\u00c5":20,"\u00c3":20,",":46,".":46,"e":20,"\u00e9":20,"o":20,"\u00f8":20,"\u0153":20,"\u00f3":20,"\u00f2":20,"\u00f5":20,"-":20,"a":20,"\u00e6":20,"\u00e1":20,"i":-2,"\u0131":-2,"\u00ed":-2,"\u00ee":-2,"\u00ef":-2,"\u00ec":-2,"r":13,"u":13,"\u00fa":13,"\u00fb":13,"\u00fc":13,"\u00f9":13,":":27,";":27}},"W":{"d":"71,0r-71,-257r26,0r59,225r63,-225r31,0r63,225r59,-225r24,0r-70,257r-26,0r-66,-230r-65,230r-27,0","w":326,"k":{"\u00fc":6,"\u00f6":6,"\u00ea":6,"\u00e4":13,"A":6,"\u00c6":6,"\u00c1":6,"\u00c2":6,"\u00c4":6,"\u00c0":6,"\u00c5":6,"\u00c3":6,",":27,".":27,"e":6,"\u00e9":6,"\u00eb":6,"\u00e8":6,"o":6,"\u00f8":6,"\u0153":6,"\u00f3":6,"\u00f4":6,"\u00f2":6,"\u00f5":6,"a":13,"\u00e6":13,"\u00e1":13,"\u00e2":13,"\u00e0":13,"\u00e5":13,"\u00e3":13,"i":-9,"\u0131":-9,"\u00ed":-9,"\u00ee":-9,"\u00ef":-9,"\u00ec":-9,"r":6,"u":6,"\u00fa":6,"\u00fb":6,"\u00f9":6,":":6,";":6}},"X":{"d":"88,-132r-87,-125r29,0r73,108r75,-108r27,0r-88,125r93,132r-29,0r-78,-113r-80,113r-27,0","w":206},"Y":{"d":"98,0r0,-106r-102,-151r30,0r84,130r84,-130r30,0r-102,151r0,106r-24,0","w":219,"k":{"\u00fc":27,"\u00f6":33,"v":20,"A":27,"\u00c6":27,"\u00c1":27,"\u00c2":27,"\u00c4":27,"\u00c0":27,"\u00c5":27,"\u00c3":27,",":44,".":36,"e":33,"\u00e9":33,"\u00ea":33,"\u00eb":33,"\u00e8":33,"o":33,"\u00f8":33,"\u0153":33,"\u00f3":33,"\u00f4":33,"\u00f2":33,"\u00f5":33,"q":33,"-":40,"a":33,"\u00e6":33,"\u00e1":33,"\u00e2":33,"\u00e4":33,"\u00e0":33,"\u00e5":33,"\u00e3":33,"i":3,"\u0131":3,"\u00ed":3,"\u00ee":3,"\u00ef":3,"\u00ec":3,"u":27,"\u00fa":27,"\u00fb":27,"\u00f9":27,":":33,";":33,"p":27}},"Z":{"d":"13,-236r0,-21r185,0r0,22r-169,214r173,0r0,21r-200,0r0,-22r169,-214r-158,0","w":206},"[":{"d":"85,69r-58,0r0,-331r58,0r0,19r-35,0r0,293r35,0r0,19","w":86},"\\":{"d":"125,5r-20,0r-110,-267r19,0","w":119},"]":{"d":"1,-262r58,0r0,331r-58,0r0,-19r36,0r0,-293r-36,0r0,-19","w":86},"^":{"d":"37,-86r-21,0r83,-163r18,0r83,163r-20,0r-72,-140","w":216},"_":{"d":"180,45r-180,0r0,-18r180,0r0,18","w":180},"\u2018":{"d":"64,-170r-30,0v-1,-41,-2,-77,32,-87r0,15v-12,4,-18,22,-17,34r15,0r0,38","w":100,"k":{"\u2018":43}},"a":{"d":"140,-102v-30,22,-106,6,-106,52v0,23,21,36,42,36v46,0,71,-34,64,-88xm42,-129r-23,0v2,-44,34,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-130,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-4,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43","w":186},"b":{"d":"109,-14v83,-1,82,-157,0,-158v-89,1,-89,157,0,158xm22,0r0,-257r22,0r1,107v10,-27,36,-41,64,-41v57,0,84,45,84,98v0,53,-27,98,-84,98v-31,1,-55,-17,-67,-40r0,35r-20,0","w":206},"c":{"d":"175,-127r-22,0v-6,-28,-23,-45,-53,-45v-44,0,-65,39,-65,79v0,40,21,79,65,79v28,0,51,-22,54,-53r23,0v-6,45,-36,72,-77,72v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98v40,0,70,22,75,64","w":186},"d":{"d":"97,-172v-83,1,-82,157,0,158v89,-1,89,-157,0,-158xm185,-257r0,257r-21,0v-1,-11,2,-26,-1,-35v-10,24,-39,40,-66,40v-57,0,-83,-45,-83,-98v0,-53,26,-98,83,-98v28,0,55,14,65,41r0,-107r23,0","w":206},"e":{"d":"178,-87r-143,0v0,33,17,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v60,0,84,52,82,104xm35,-106r120,0v-1,-34,-22,-66,-59,-66v-37,0,-57,32,-61,66","w":186},"f":{"d":"93,-186r0,19r-36,0r0,167r-23,0r0,-167r-32,0r0,-19r32,0v-5,-48,12,-79,64,-70r0,20v-36,-9,-46,13,-41,50r36,0","w":93,"k":{"\u2019":-6,"f":6,"\ufb01":6,"\ufb02":6,"\u00df":6}},"g":{"d":"96,-21v39,0,60,-36,60,-74v0,-36,-17,-77,-60,-77v-43,0,-61,38,-61,77v0,37,19,74,61,74xm179,-186r0,171v0,55,-22,89,-83,89v-37,0,-74,-16,-77,-56r23,0v5,27,29,37,54,37v50,0,66,-42,59,-95v-10,23,-32,38,-59,38v-59,0,-84,-43,-84,-96v0,-51,30,-93,84,-93v28,-1,49,18,60,37r0,-32r23,0"},"h":{"d":"21,0r0,-257r23,0r1,103v8,-22,33,-37,59,-37v98,0,61,108,68,191r-23,0v-8,-67,28,-171,-47,-172v-75,-1,-56,99,-58,172r-23,0","w":193},"i":{"d":"22,0r0,-186r23,0r0,186r-23,0xm22,-221r0,-36r23,0r0,36r-23,0","w":66},"j":{"d":"22,23r0,-209r23,0r0,203v2,34,-16,59,-56,51r0,-19v21,5,33,-6,33,-26xm22,-221r0,-36r23,0r0,36r-23,0","w":66},"k":{"d":"22,0r0,-257r22,0r0,161r103,-90r30,0r-79,69r85,117r-29,0r-73,-101r-37,30r0,71r-22,0","w":180},"l":{"d":"22,0r0,-257r23,0r0,257r-23,0","w":66},"m":{"d":"22,0r0,-186r20,0v2,10,-3,26,2,32v16,-44,99,-53,114,-1v11,-24,35,-36,59,-36v87,0,55,114,61,191r-22,0r0,-125v0,-31,-12,-47,-44,-47v-74,0,-45,103,-51,172r-22,0r0,-126v0,-25,-10,-46,-39,-46v-76,0,-53,100,-56,172r-22,0","w":299},"n":{"d":"21,0r0,-186r23,0v1,10,-2,24,1,32v8,-22,33,-37,59,-37v98,0,61,108,68,191r-23,0v-8,-67,28,-171,-47,-172v-75,-1,-56,99,-58,172r-23,0","w":193},"o":{"d":"100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm100,-172v-44,0,-65,39,-65,79v0,40,21,79,65,79v44,0,65,-39,65,-79v0,-40,-21,-79,-65,-79"},"p":{"d":"109,-14v83,-1,82,-157,0,-158v-50,0,-65,37,-65,79v0,39,17,79,65,79xm22,69r0,-255r20,0v1,11,-2,27,1,36v10,-25,36,-41,66,-41v57,0,84,45,84,98v0,53,-27,98,-84,98v-29,1,-53,-15,-65,-40r0,104r-22,0","w":206},"q":{"d":"97,-172v-83,1,-82,157,0,158v89,-1,89,-157,0,-158xm185,-186r0,255r-23,0r0,-104v-10,27,-37,40,-65,40v-57,0,-83,-45,-83,-98v0,-53,26,-98,83,-98v28,-1,55,19,67,41r0,-36r21,0","w":206},"r":{"d":"22,0r0,-186r20,0v1,14,-2,32,1,44v12,-30,37,-47,70,-46r0,22v-41,-2,-69,28,-69,67r0,99r-22,0","w":113,"k":{",":33,".":33,"c":6,"\u00e7":6,"d":6,"e":6,"\u00e9":6,"\u00ea":6,"\u00eb":6,"\u00e8":6,"n":-6,"\u00f1":-6,"o":6,"\u00f8":6,"\u0153":6,"\u00f3":6,"\u00f4":6,"\u00f6":6,"\u00f2":6,"\u00f5":6,"q":6,"-":20}},"s":{"d":"156,-131r-23,0v-1,-28,-23,-41,-49,-41v-20,0,-44,8,-44,32v15,55,123,17,122,90v0,40,-40,55,-75,55v-43,0,-72,-20,-76,-65r23,0v2,31,25,46,55,46v21,0,50,-9,50,-35v0,-58,-121,-20,-121,-90v0,-38,36,-52,69,-52v37,0,68,20,69,60","w":173},"t":{"d":"58,-242r0,56r37,0r0,19r-37,0r0,126v-4,23,16,27,37,23r0,19v-36,3,-60,0,-60,-41r0,-127r-32,0r0,-19r32,0r0,-56r23,0","w":106},"u":{"d":"172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,48,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0","w":193},"v":{"d":"72,0r-71,-186r25,0r59,163r58,-163r23,0r-70,186r-24,0","w":166,"k":{",":27,".":27}},"w":{"d":"63,0r-60,-186r24,0r48,159r46,-159r25,0r46,159r48,-159r24,0r-60,186r-25,0r-46,-156r-46,156r-24,0","w":266,"k":{",":20,".":20}},"x":{"d":"0,0r72,-96r-66,-90r28,0r53,71r52,-71r28,0r-67,89r73,97r-29,0r-58,-78r-58,78r-28,0","w":173},"y":{"d":"75,-1r-74,-185r24,0r61,159r57,-159r23,0r-81,214v-13,37,-29,45,-66,39r0,-19v37,12,47,-21,56,-49","w":166,"k":{",":33,".":33}},"z":{"d":"156,-170r-123,151r128,0r0,19r-156,0r0,-18r122,-149r-113,0r0,-19r142,0r0,16","w":166},"{":{"d":"105,69v-56,11,-50,-48,-49,-99v0,-29,-5,-57,-26,-57r0,-19v62,-6,-21,-170,75,-156r0,19v-38,-4,-27,51,-27,87v0,40,-21,54,-25,60v5,3,25,19,25,58v0,34,-13,91,27,88r0,19","w":119},"|":{"d":"31,77r0,-360r19,0r0,360r-19,0","w":79},"}":{"d":"14,-262v55,-11,51,46,50,98v0,29,5,57,26,57r0,20v-62,6,21,170,-76,156r0,-19v39,5,27,-52,27,-88v0,-40,22,-53,26,-59v-5,-3,-26,-20,-26,-59v0,-34,13,-91,-27,-87r0,-19","w":119},"~":{"d":"70,-112v24,-1,56,23,77,23v14,0,23,-11,31,-24r13,13v-11,15,-23,31,-45,31v-37,0,-90,-50,-108,1r-13,-13v8,-15,21,-31,45,-31","w":216},"\u00a1":{"d":"50,-122r6,117r0,74r-25,0r0,-74r6,-117r13,0xm28,-186r31,0r0,38r-31,0r0,-38","w":86},"\u00a2":{"d":"97,-14r0,-157v-74,11,-73,145,0,157xm183,-127r-23,0v-6,-27,-22,-44,-49,-45r0,158v26,-1,47,-23,50,-53r23,0v-6,43,-34,71,-73,72r0,37r-14,0r0,-37v-50,-5,-78,-48,-78,-98v0,-50,28,-92,78,-97r0,-32r14,0r0,31v37,1,67,23,72,64"},"\u00a3":{"d":"195,-17v-43,53,-120,-17,-167,22r-13,-19v33,-23,54,-63,31,-105r-29,0r0,-11r22,0v-11,-18,-20,-37,-20,-58v0,-51,42,-74,83,-74v53,0,84,32,83,85r-23,0v0,-39,-20,-66,-60,-66v-31,0,-60,17,-60,56v0,24,12,36,21,57r58,0r0,11r-51,0v22,40,-5,81,-30,101v46,-31,109,31,144,-16"},"\u2044":{"d":"-60,12r163,-273r17,0r-162,273r-18,0","w":60},"\u00a5":{"d":"40,-109r0,-17r38,0r-76,-131r26,0r72,131r72,-131r25,0r-76,131r39,0r0,17v-16,2,-39,-4,-49,3r0,26r49,0r0,17r-49,0r0,63r-23,0r0,-63r-48,0r0,-17r48,0v-1,-9,2,-23,-2,-29r-46,0"},"\u0192":{"d":"3,60r3,-19v31,10,48,-15,52,-38r27,-142r-36,0r3,-19r36,0v9,-53,17,-112,88,-97r-4,18v-52,-9,-52,40,-61,79r41,0r-4,19r-40,0r-22,116v-6,48,-20,96,-83,83"},"\u00a7":{"d":"161,-83v0,-38,-62,-57,-93,-78v-17,7,-29,19,-29,39v0,36,61,57,92,78v17,-7,30,-19,30,-39xm184,-83v0,24,-18,42,-39,50v40,32,6,91,-43,91v-40,0,-67,-23,-67,-64r23,0v-1,24,17,45,42,45v20,0,40,-9,40,-32v0,-54,-124,-57,-124,-128v0,-24,18,-43,39,-51v-40,-32,-7,-90,43,-90v40,0,67,22,67,63r-23,0v1,-24,-17,-44,-42,-44v-20,0,-40,9,-40,32v0,54,124,57,124,128"},"\u00a4":{"d":"10,-49r21,-20v-27,-29,-26,-82,0,-111r-21,-20r14,-14r20,20v29,-25,83,-27,112,0r19,-20r14,14r-19,19v27,30,26,83,0,113r19,19r-14,14r-19,-20v-29,26,-83,27,-112,0r-20,20xm34,-125v0,39,29,69,66,69v37,0,67,-30,67,-69v0,-39,-30,-68,-67,-68v-37,0,-66,29,-66,68"},"'":{"d":"39,-170r0,-87r23,0r0,87r-23,0","w":100},"\u201c":{"d":"109,-170r-31,0v-1,-42,-2,-76,33,-87r0,15v-12,4,-18,22,-17,34r15,0r0,38xm53,-170r-30,0v-1,-41,-2,-77,32,-87r0,15v-12,4,-18,22,-17,34r15,0r0,38","w":133},"\u00ab":{"d":"127,-43r-47,-45r0,-22r47,-45r0,24r-33,32r33,32r0,24xm69,-43r-47,-45r0,-22r47,-45r0,24r-33,32r33,32r0,24","w":153},"\u2039":{"d":"67,-43r-48,-45r0,-22r48,-45r0,24r-34,32r34,32r0,24","w":93},"\u203a":{"d":"26,-43r0,-24r34,-32r-34,-32r0,-24r48,45r0,22","w":93},"\ufb01":{"d":"115,0r0,-186r23,0r0,186r-23,0xm34,0r0,-167r-32,0r0,-19r32,0v-5,-48,12,-79,64,-70r0,20v-36,-9,-46,13,-41,50r36,0r0,19r-36,0r0,167r-23,0xm115,-221r0,-36r23,0r0,36r-23,0","w":159},"\ufb02":{"d":"34,0r0,-167r-32,0r0,-19r32,0v-5,-48,12,-79,64,-70r0,20v-36,-9,-46,13,-41,50r36,0r0,19r-36,0r0,167r-23,0xm115,0r0,-257r23,0r0,257r-23,0","w":159},"\u2013":{"d":"180,-89r-180,0r0,-20r180,0r0,20","w":180},"\u2020":{"d":"89,-158r-72,0r0,-19r72,0r0,-80r22,0r0,80r72,0r0,19r-72,0r0,212r-22,0r0,-212"},"\u2021":{"d":"89,-17r-72,0r0,-19r72,0r0,-131r-72,0r0,-19r72,0r0,-71r22,0r0,71r72,0r0,19r-72,0r0,131r72,0r0,19r-72,0r0,71r-22,0r0,-71"},"\u00b7":{"d":"50,-135v12,0,21,10,21,22v0,11,-10,20,-21,20v-12,0,-21,-9,-21,-21v0,-11,10,-21,21,-21","w":100},"\u00b6":{"d":"98,64r0,-182v-42,0,-74,-31,-74,-68v0,-45,30,-71,80,-71r83,0r0,321r-23,0r0,-302r-43,0r0,302r-23,0","w":216},"\u2022":{"d":"26,-129v0,-36,28,-64,64,-64v36,0,64,28,64,64v0,36,-28,65,-64,65v-36,0,-64,-29,-64,-65","w":180},"\u201a":{"d":"36,-38r30,0v1,41,2,77,-32,87r0,-15v12,-4,18,-22,17,-34r-15,0r0,-38","w":100},"\u201e":{"d":"80,-38r30,0v1,41,2,77,-32,87r0,-15v12,-4,18,-22,17,-34r-15,0r0,-38xm24,-38r31,0v1,41,2,77,-32,87r0,-15v12,-4,18,-22,17,-34r-16,0r0,-38","w":133},"\u201d":{"d":"80,-257r30,0v1,41,2,77,-32,87r0,-15v12,-4,18,-22,17,-34r-15,0r0,-38xm24,-257r31,0v1,41,2,77,-32,87r0,-15v12,-4,18,-22,17,-34r-16,0r0,-38","w":133},"\u00bb":{"d":"84,-43r0,-24r34,-32r-34,-32r0,-24r48,45r0,22xm26,-43r0,-24r34,-32r-34,-32r0,-24r48,45r0,22","w":153},"\u2026":{"d":"75,0r-30,0r0,-38r30,0r0,38xm195,0r-30,0r0,-38r30,0r0,38xm315,0r-30,0r0,-38r30,0r0,38","w":360},"\u2030":{"d":"197,-116v39,0,54,26,54,61v0,35,-15,60,-54,60v-39,0,-54,-25,-54,-60v0,-35,15,-61,54,-61xm197,-100v-29,0,-35,24,-35,45v0,21,6,44,35,44v29,0,34,-23,34,-44v0,-21,-5,-45,-34,-45xm324,-116v39,0,54,26,54,61v0,35,-15,60,-54,60v-39,0,-53,-25,-53,-60v0,-35,14,-61,53,-61xm324,-100v-29,0,-34,24,-34,45v0,21,5,44,34,44v29,0,35,-23,35,-44v0,-21,-6,-45,-35,-45xm77,-254v39,0,54,26,54,61v0,35,-15,61,-54,61v-39,0,-54,-26,-54,-61v0,-35,15,-61,54,-61xm77,-238v-29,0,-35,24,-35,45v0,21,6,44,35,44v29,0,35,-23,35,-44v0,-21,-6,-45,-35,-45xm46,12r164,-273r16,0r-162,273r-18,0","w":399},"\u00bf":{"d":"107,-124v11,64,-65,75,-65,130v0,29,24,49,52,49v39,0,59,-28,58,-65r22,0v0,51,-29,84,-81,84v-40,0,-74,-24,-74,-66v0,-61,78,-70,65,-132r23,0xm111,-186r0,38r-31,0r0,-38r31,0","w":193},"`":{"d":"36,-212r-47,-50r28,0r38,50r-19,0","w":66},"\u00b4":{"d":"78,-262r-48,50r-18,0r38,-50r28,0","w":66},"\u02c6":{"d":"46,-262r41,50r-24,0r-31,-36r-31,36r-21,0r41,-50r25,0","w":66},"\u02dc":{"d":"9,-253v0,0,57,33,67,-2r14,0v-3,17,-13,34,-32,34v-18,1,-34,-15,-48,-16v-11,0,-19,6,-19,18r-14,0v2,-17,13,-34,32,-34","w":66},"\u00af":{"d":"93,-228r-119,0r0,-16r119,0r0,16","w":66},"\u02d8":{"d":"-18,-260r14,0v3,40,71,39,75,0r14,0v-4,28,-24,46,-52,46v-29,0,-49,-17,-51,-46","w":66},"\u02d9":{"d":"46,-218r-25,0r0,-36r25,0r0,36","w":66},"\u00a8":{"d":"77,-218r-24,0r0,-36r24,0r0,36xm14,-218r-25,0r0,-36r25,0r0,36","w":66},"\u02da":{"d":"-5,-244v0,-21,17,-38,38,-38v21,0,39,17,39,38v0,21,-18,39,-39,39v-21,0,-38,-18,-38,-39xm9,-244v0,14,10,25,24,25v14,0,25,-11,25,-25v0,-14,-11,-24,-25,-24v-14,0,-24,10,-24,24","w":66},"\u00b8":{"d":"11,28v12,-9,12,-30,34,-28r-15,21v17,-3,41,0,41,22v0,35,-47,36,-73,24r5,-12v13,5,47,12,47,-10v0,-24,-33,-5,-39,-17","w":66},"\u02dd":{"d":"6,-212r-18,0r36,-50r28,0xm63,-212r-19,0r37,-50r27,0","w":66},"\u02db":{"d":"54,-1r14,0v-26,21,-32,34,-32,46v1,26,31,17,36,2r10,5v-13,37,-71,28,-69,-6v0,-6,4,-25,41,-47","w":66},"\u02c7":{"d":"21,-212r-41,-50r23,0r31,36r32,-36r21,0r-41,50r-25,0","w":66},"\u2014":{"d":"313,-89r-266,0r0,-20r266,0r0,20","w":360},"\u00c6":{"d":"185,-122r0,101r133,0r0,21r-158,0r0,-81r-93,0r-42,81r-28,0r135,-257r185,0r0,21r-132,0r0,93r124,0r0,21r-124,0xm78,-102r82,0r0,-134r-14,0","w":326},"\u00aa":{"d":"82,-198v-21,12,-71,5,-67,30v6,37,69,20,67,-13r0,-17xm19,-215r-16,0v1,-28,21,-39,50,-39v23,0,46,6,46,36r0,62v0,7,8,10,14,7r0,12v-17,4,-28,-4,-28,-19v-15,33,-87,34,-87,-11v0,-33,33,-35,65,-38v12,-1,19,-3,19,-11v0,-19,-15,-24,-32,-24v-17,0,-31,8,-31,25","w":111},"\u0141":{"d":"26,-110r0,-147r24,0r0,130r88,-61r0,21r-88,60r0,86r144,0r0,21r-168,0r0,-90r-30,20r0,-20","w":193,"k":{"T":33,"V":33,"W":20,"y":13,"\u00fd":13,"\u00ff":13,"Y":40,"\u00dd":40,"\u0178":40,"\u2019":35}},"\u00d8":{"d":"209,-203r-143,159v16,18,38,29,68,29v97,-1,118,-120,75,-188xm58,-54r143,-159v-15,-17,-37,-29,-67,-29v-98,0,-119,119,-76,188xm242,-259r9,8r-26,30v61,78,28,226,-91,226v-36,0,-64,-12,-84,-32r-27,31r-10,-9r29,-31v-61,-80,-28,-229,92,-226v35,0,62,12,82,31","w":266},"\u0152":{"d":"135,-15v30,1,70,-15,70,-49r0,-119v6,-46,-38,-59,-70,-59v-63,0,-97,52,-97,113v0,61,34,114,97,114xm229,-236r0,93r133,0r0,21r-133,0r0,101r148,0r0,21r-172,0r0,-25v-17,20,-45,30,-70,30v-77,0,-122,-62,-122,-134v0,-72,45,-133,122,-133v27,0,53,7,70,26r0,-21r170,0r0,21r-146,0","w":386},"\u00ba":{"d":"58,-132v-37,0,-57,-27,-57,-61v0,-34,20,-61,57,-61v41,0,61,27,61,61v0,34,-20,61,-61,61xm60,-147v56,0,56,-93,0,-93v-56,0,-56,93,0,93","w":120},"\u00e6":{"d":"163,-106r117,0v0,-34,-23,-66,-59,-66v-38,0,-59,31,-58,66xm140,-102v-30,22,-106,6,-106,52v0,23,21,36,42,36v46,0,71,-34,64,-88xm303,-87r-140,0v-3,40,17,73,61,73v31,0,49,-17,55,-46r22,0v-8,74,-127,91,-149,19v-12,58,-140,68,-140,-8v0,-52,50,-54,99,-60v19,-2,29,-4,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43r-23,0v2,-44,34,-62,76,-62v25,0,58,6,62,38v10,-26,38,-38,65,-38v61,0,81,50,81,104","w":313},"\u0131":{"d":"45,0r-23,0r0,-186r23,0r0,186","w":66},"\u0142":{"d":"22,-142r0,-115r23,0r0,96r24,-20r0,20r-24,20r0,141r-23,0r0,-122r-24,19r0,-19","w":66},"\u00f8":{"d":"48,-44r98,-106v-10,-13,-26,-22,-46,-22v-62,0,-80,80,-52,128xm153,-141r-99,106v10,13,26,21,46,21v62,0,80,-78,53,-127xm161,-167v9,-7,17,-28,27,-13r-20,22v43,59,15,166,-68,163v-26,0,-46,-9,-60,-24r-22,23r-8,-7r22,-24v-42,-58,-16,-164,68,-164v26,0,47,9,61,24"},"\u0153":{"d":"95,-172v-47,0,-59,44,-59,83v0,37,16,75,59,75v46,0,55,-42,55,-80v0,-37,-10,-78,-55,-78xm288,-60r22,0v-10,73,-126,91,-148,18v-11,30,-34,47,-67,47v-58,0,-82,-46,-82,-98v0,-51,26,-98,83,-98v33,-1,55,17,67,46v10,-27,35,-46,68,-46v55,0,80,36,80,104r-139,0v0,36,18,73,58,73v31,0,50,-17,58,-46xm172,-106r116,0v0,-35,-21,-66,-58,-66v-38,0,-58,31,-58,66","w":320},"\u00df":{"d":"22,0r0,-193v0,-48,29,-69,72,-69v39,0,70,22,70,63v1,27,-17,48,-41,55v35,3,54,33,54,66v-1,59,-41,86,-98,80r0,-20v40,8,75,-9,75,-56v0,-50,-31,-58,-75,-58r0,-20v32,0,62,-9,62,-46v0,-27,-21,-45,-47,-45v-36,0,-49,18,-49,52r0,191r-23,0","w":193},"\u00b9":{"d":"13,-210r0,-14v26,-1,41,-2,46,-27r14,0r0,152r-17,0r0,-111r-43,0","w":119},"\u00ac":{"d":"180,-40r0,-77r-162,0r0,-19r181,0r0,96r-19,0","w":216},"\u00b5":{"d":"172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-17,38,-69,50,-106,26r0,76r-23,0r0,-255r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0","w":193},"\u2122":{"d":"97,-109r-19,0r0,-132r-48,0r0,-16r115,0r0,16r-48,0r0,132xm190,-109r-19,0r0,-148r31,0r48,120r46,-120r31,0r0,148r-19,0r-1,-131r-52,131r-11,0r-54,-131r0,131","w":356},"\u00d0":{"d":"50,-236r0,95r85,0r0,16r-85,0r0,104v97,5,158,-9,158,-108v0,-99,-61,-113,-158,-107xm26,-141r0,-116r89,0v77,2,118,44,118,128v0,84,-41,129,-118,129r-89,0r0,-125r-26,0r0,-16r26,0","w":246},"\u00bd":{"d":"48,12r163,-273r17,0r-163,273r-17,0xm17,-210r0,-14v26,-1,41,-2,46,-27r15,0r0,152r-17,0r0,-111r-44,0xm173,0v0,-60,93,-56,93,-112v0,-18,-17,-29,-37,-29v-26,0,-36,20,-36,41r-17,0v-1,-33,17,-56,54,-56v30,0,53,14,53,45v0,52,-74,54,-91,97r90,0r0,14r-109,0","w":300},"\u00b1":{"d":"99,-116r0,-65r19,0r0,65r81,0r0,19r-81,0r0,65r-19,0r0,-65r-81,0r0,-19r81,0xm18,0r0,-19r181,0r0,19r-181,0","w":216},"\u00de":{"d":"26,0r0,-257r24,0r0,42r90,0v46,0,76,28,76,74v0,46,-30,73,-76,73r-90,0r0,68r-24,0xm50,-194r0,105v63,-2,142,15,142,-52v0,-67,-79,-52,-142,-53","w":226},"\u00bc":{"d":"231,0r0,-36r-75,0r0,-14r76,-102r16,0r0,102r25,0r0,14r-25,0r0,36r-17,0xm231,-128v-22,24,-39,53,-59,78r59,0r0,-78xm48,12r163,-273r17,0r-163,273r-17,0xm17,-210r0,-14v26,-1,41,-2,46,-27r15,0r0,152r-17,0r0,-111r-44,0","w":300},"\u00f7":{"d":"199,-81r-181,0r0,-19r181,0r0,19xm88,-163v0,-11,9,-20,20,-20v11,0,20,9,20,20v0,10,-10,20,-20,20v-11,0,-20,-9,-20,-20xm88,-18v0,-11,9,-20,20,-20v11,0,20,9,20,20v0,10,-10,20,-20,20v-11,0,-20,-9,-20,-20","w":216},"\u00a6":{"d":"31,32r0,-90r19,0r0,90r-19,0xm31,-148r0,-90r19,0r0,90r-19,0","w":79},"\u00b0":{"d":"20,-202v0,-29,23,-52,52,-52v29,0,52,23,52,52v0,29,-23,52,-52,52v-29,0,-52,-23,-52,-52xm34,-202v0,21,17,37,38,37v21,0,38,-16,38,-37v0,-21,-17,-38,-38,-38v-21,0,-38,17,-38,38","w":144},"\u00fe":{"d":"109,-14v83,-1,82,-157,0,-158v-89,1,-89,157,0,158xm22,69r0,-326r22,0r1,107v10,-27,36,-41,64,-41v57,0,84,45,84,98v0,53,-27,98,-84,98v-29,1,-53,-15,-65,-40r0,104r-22,0","w":206},"\u00be":{"d":"231,0r0,-36r-75,0r0,-14r76,-102r16,0r0,102r25,0r0,14r-25,0r0,36r-17,0xm231,-128v-22,24,-39,53,-59,78r59,0r0,-78xm49,-172r0,-14v23,2,46,-5,46,-27v0,-19,-17,-27,-36,-27v-23,0,-36,16,-36,37r-17,0v0,-30,20,-51,53,-51v27,0,53,12,53,40v1,18,-12,28,-28,34v21,3,34,17,34,37v0,31,-26,48,-58,48v-35,0,-60,-19,-57,-53r17,0v-1,23,14,39,39,39v21,0,42,-12,42,-33v0,-24,-24,-32,-52,-30xm62,12r163,-273r17,0r-162,273r-18,0","w":300},"\u00b2":{"d":"5,-99v0,-60,93,-56,93,-112v0,-18,-17,-29,-37,-29v-26,0,-35,20,-35,41r-17,0v-1,-33,17,-55,54,-55v30,0,52,14,52,45v-1,52,-74,53,-90,96r89,0r0,14r-109,0","w":119},"\u00ae":{"d":"144,-262v76,0,134,58,134,133v0,75,-58,134,-134,134v-76,0,-134,-59,-134,-134v0,-75,58,-133,134,-133xm144,-243v-65,0,-113,50,-113,114v0,64,48,115,113,115v65,0,113,-51,113,-115v0,-64,-48,-114,-113,-114xm114,-120r0,69r-19,0r0,-155v49,0,110,-8,110,43v0,27,-18,39,-39,43r46,69r-22,0r-43,-69r-33,0xm114,-136v32,-1,72,8,72,-27v0,-34,-40,-26,-72,-27r0,54","w":288},"\u2212":{"d":"199,-100r0,19r-181,0r0,-19r181,0","w":216},"\u00f0":{"d":"99,-163v-46,0,-64,34,-64,74v0,39,19,75,64,75v42,0,64,-31,64,-76v0,-36,-18,-73,-64,-73xm49,-215r36,-20v-11,-7,-22,-14,-34,-20r13,-12v13,6,26,14,38,23r41,-23r11,11r-39,22v40,33,71,79,71,141v0,54,-28,98,-88,98v-58,0,-86,-41,-86,-95v0,-69,75,-117,134,-78v-12,-22,-29,-40,-48,-56r-38,21"},"\u00d7":{"d":"94,-90r-67,-68r13,-14r68,68r68,-68r13,14r-68,68r68,68r-13,13r-68,-68r-68,68r-13,-13","w":216},"\u00b3":{"d":"49,-172r0,-14v23,2,46,-5,46,-27v0,-19,-17,-27,-36,-27v-23,0,-36,16,-36,37r-17,0v0,-30,20,-51,53,-51v27,0,53,12,53,40v1,18,-12,28,-28,34v21,3,34,17,34,37v0,31,-26,48,-58,48v-35,0,-60,-19,-57,-53r17,0v-1,23,14,39,39,39v21,0,42,-12,42,-33v0,-24,-24,-32,-52,-30","w":119},"\u00a9":{"d":"278,-129v0,75,-58,134,-134,134v-76,0,-134,-59,-134,-134v0,-75,58,-133,134,-133v76,0,134,58,134,133xm257,-129v0,-64,-48,-114,-113,-114v-65,0,-113,50,-113,114v0,64,48,115,113,115v65,0,113,-51,113,-115xm214,-157r-19,0v-18,-68,-107,-36,-107,28v0,37,21,67,60,67v26,0,43,-16,47,-38r19,0v-5,35,-33,54,-67,54v-49,0,-78,-35,-78,-83v0,-89,132,-114,145,-28","w":288},"\u00c1":{"d":"-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm114,-233r-52,132r101,0xm158,-328r-47,50r-19,0r38,-50r28,0","w":226},"\u00c2":{"d":"-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm114,-233r-52,132r101,0xm126,-328r41,50r-23,0r-31,-36r-32,36r-21,0r41,-50r25,0","w":226},"\u00c4":{"d":"-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm114,-233r-52,132r101,0xm158,-284r-25,0r0,-36r25,0r0,36xm94,-284r-25,0r0,-36r25,0r0,36","w":226},"\u00c0":{"d":"-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm114,-233r-52,132r101,0xm117,-278r-48,-50r28,0r38,50r-18,0","w":226},"\u00c5":{"d":"-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm114,-233r-52,132r101,0xm75,-310v0,-21,18,-38,39,-38v21,0,38,17,38,38v0,21,-17,39,-38,39v-21,0,-39,-18,-39,-39xm89,-310v0,14,11,25,25,25v14,0,24,-11,24,-25v0,-14,-10,-24,-24,-24v-14,0,-25,10,-25,24","w":226},"\u00c3":{"d":"-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm114,-233r-52,132r101,0xm89,-319v25,1,58,34,67,-2r14,0v-3,17,-12,34,-31,34v-19,0,-35,-16,-49,-16v-11,0,-19,6,-19,18r-14,0v2,-17,13,-34,32,-34","w":226},"\u00c7":{"d":"217,-98r25,0v-7,63,-47,103,-107,103r-12,16v17,-3,42,0,42,22v0,35,-47,37,-74,24r5,-12v13,5,48,12,48,-10v0,-24,-34,-5,-40,-17r18,-23v-73,-6,-108,-67,-108,-134v0,-70,40,-133,121,-133v49,0,97,29,103,83r-24,0v-9,-40,-42,-63,-79,-63v-132,1,-130,226,0,227v48,0,77,-37,82,-83","w":253},"\u00c9":{"d":"26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm151,-328r-47,50r-19,0r38,-50r28,0","w":213},"\u00ca":{"d":"26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm119,-328r41,50r-23,0r-31,-36r-32,36r-21,0r41,-50r25,0","w":213},"\u00cb":{"d":"26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm151,-284r-25,0r0,-36r25,0r0,36xm87,-284r-24,0r0,-36r24,0r0,36","w":213},"\u00c8":{"d":"26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm110,-278r-48,-50r28,0r38,50r-18,0","w":213},"\u00cd":{"d":"28,0r0,-257r24,0r0,257r-24,0xm85,-328r-48,50r-18,0r38,-50r28,0","w":79},"\u00ce":{"d":"28,0r0,-257r24,0r0,257r-24,0xm53,-328r41,50r-24,0r-31,-36r-31,36r-21,0r41,-50r25,0","w":79},"\u00cf":{"d":"28,0r0,-257r24,0r0,257r-24,0xm84,-284r-24,0r0,-36r24,0r0,36xm21,-284r-25,0r0,-36r25,0r0,36","w":79},"\u00cc":{"d":"28,0r0,-257r24,0r0,257r-24,0xm43,-278r-47,-50r28,0r38,50r-19,0","w":79},"\u00d1":{"d":"26,0r0,-257r27,0r150,217r0,-217r25,0r0,257r-27,0r-151,-217r0,217r-24,0xm102,-319v25,1,58,34,68,-2r13,0v-3,17,-12,34,-31,34v-19,0,-35,-16,-49,-16v-11,0,-19,6,-19,18r-14,0v2,-17,13,-34,32,-34","w":253},"\u00d3":{"d":"12,-129v0,-70,41,-133,122,-133v81,0,121,63,121,133v0,70,-40,134,-121,134v-81,0,-122,-64,-122,-134xm134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm178,-328r-48,50r-18,0r38,-50r28,0","w":266},"\u00d4":{"d":"12,-129v0,-70,41,-133,122,-133v81,0,121,63,121,133v0,70,-40,134,-121,134v-81,0,-122,-64,-122,-134xm134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm146,-328r41,50r-24,0r-31,-36r-31,36r-21,0r41,-50r25,0","w":266},"\u00d6":{"d":"12,-129v0,-70,41,-133,122,-133v81,0,121,63,121,133v0,70,-40,134,-121,134v-81,0,-122,-64,-122,-134xm134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm177,-284r-24,0r0,-36r24,0r0,36xm114,-284r-25,0r0,-36r25,0r0,36","w":266},"\u00d2":{"d":"12,-129v0,-70,41,-133,122,-133v81,0,121,63,121,133v0,70,-40,134,-121,134v-81,0,-122,-64,-122,-134xm134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm136,-278r-47,-50r28,0r38,50r-19,0","w":266},"\u00d5":{"d":"12,-129v0,-70,41,-133,122,-133v81,0,121,63,121,133v0,70,-40,134,-121,134v-81,0,-122,-64,-122,-134xm134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm109,-319v25,1,57,34,67,-2r14,0v-3,17,-13,34,-32,34v-18,0,-34,-16,-48,-16v-11,0,-19,6,-19,18r-14,0v2,-17,13,-34,32,-34","w":266},"\u0160":{"d":"13,-85r24,0v-1,53,37,70,84,70v27,0,68,-16,68,-53v0,-83,-167,-24,-168,-122v0,-25,17,-72,89,-72v51,0,95,26,95,79r-25,0v2,-72,-134,-84,-134,-7v0,47,64,42,101,54v35,12,67,26,67,68v0,18,-7,73,-98,73v-61,0,-106,-27,-103,-90xm101,-278r-41,-50r24,0r30,36r32,-36r21,0r-41,50r-25,0","w":226},"\u00da":{"d":"123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,60,28,83,75,83v48,0,76,-23,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm168,-328r-48,50r-18,0r38,-50r28,0","w":246},"\u00db":{"d":"123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,60,28,83,75,83v48,0,76,-23,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm136,-328r41,50r-24,0r-31,-36r-31,36r-21,0r41,-50r25,0","w":246},"\u00dc":{"d":"123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,60,28,83,75,83v48,0,76,-23,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm167,-284r-24,0r0,-36r24,0r0,36xm104,-284r-25,0r0,-36r25,0r0,36","w":246},"\u00d9":{"d":"123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,60,28,83,75,83v48,0,76,-23,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm126,-278r-47,-50r28,0r38,50r-19,0","w":246},"\u00dd":{"d":"98,0r0,-106r-102,-151r30,0r84,130r84,-130r30,0r-102,151r0,106r-24,0xm154,-328r-47,50r-18,0r37,-50r28,0","w":219,"k":{"v":20,"A":27,"\u00c6":27,"\u00c1":27,"\u00c2":27,"\u00c4":27,"\u00c0":27,"\u00c5":27,"\u00c3":27,",":44,".":36,"e":33,"\u00e9":33,"\u00ea":33,"\u00eb":33,"\u00e8":33,"o":33,"\u00f8":33,"\u0153":33,"\u00f3":33,"\u00f4":33,"\u00f6":33,"\u00f2":33,"\u00f5":33,"q":33,"-":40,"a":33,"\u00e6":33,"\u00e1":33,"\u00e2":33,"\u00e4":33,"\u00e0":33,"\u00e5":33,"\u00e3":33,"i":3,"\u0131":3,"\u00ed":3,"\u00ee":3,"\u00ef":3,"\u00ec":3,"u":27,"\u00fa":27,"\u00fb":27,"\u00fc":27,"\u00f9":27,":":33,";":33,"p":27}},"\u0178":{"d":"98,0r0,-106r-102,-151r30,0r84,130r84,-130r30,0r-102,151r0,106r-24,0xm154,-284r-24,0r0,-36r24,0r0,36xm90,-284r-24,0r0,-36r24,0r0,36","w":219,"k":{"v":20,"A":27,"\u00c6":27,"\u00c1":27,"\u00c2":27,"\u00c4":27,"\u00c0":27,"\u00c5":27,"\u00c3":27,",":44,".":36,"e":33,"\u00e9":33,"\u00ea":33,"\u00eb":33,"\u00e8":33,"o":33,"\u00f8":33,"\u0153":33,"\u00f3":33,"\u00f4":33,"\u00f6":33,"\u00f2":33,"\u00f5":33,"q":33,"-":40,"a":33,"\u00e6":33,"\u00e1":33,"\u00e2":33,"\u00e4":33,"\u00e0":33,"\u00e5":33,"\u00e3":33,"i":3,"\u0131":3,"\u00ed":3,"\u00ee":3,"\u00ef":3,"\u00ec":3,"u":27,"\u00fa":27,"\u00fb":27,"\u00fc":27,"\u00f9":27,":":33,";":33,"p":27}},"\u017d":{"d":"13,-236r0,-21r185,0r0,22r-169,214r173,0r0,21r-200,0r0,-22r169,-214r-158,0xm91,-278r-41,-50r23,0r31,36r32,-36r21,0r-41,50r-25,0","w":206},"\u00e1":{"d":"140,-102v-30,22,-106,6,-106,52v0,23,21,36,42,36v46,0,71,-34,64,-88xm42,-129r-23,0v2,-44,34,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-130,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-4,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm138,-262r-48,50r-18,0r38,-50r28,0","w":186},"\u00e2":{"d":"140,-102v-30,22,-106,6,-106,52v0,23,21,36,42,36v46,0,71,-34,64,-88xm42,-129r-23,0v2,-44,34,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-130,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-4,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm106,-262r41,50r-24,0r-30,-36r-32,36r-21,0r41,-50r25,0","w":186},"\u00e4":{"d":"140,-102v-30,22,-106,6,-106,52v0,23,21,36,42,36v46,0,71,-34,64,-88xm42,-129r-23,0v2,-44,34,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-130,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-4,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm138,-218r-25,0r0,-36r25,0r0,36xm74,-218r-25,0r0,-36r25,0r0,36","w":186},"\u00e0":{"d":"140,-102v-30,22,-106,6,-106,52v0,23,21,36,42,36v46,0,71,-34,64,-88xm42,-129r-23,0v2,-44,34,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-130,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-4,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm96,-212r-47,-50r28,0r38,50r-19,0","w":186},"\u00e5":{"d":"140,-102v-30,22,-106,6,-106,52v0,23,21,36,42,36v46,0,71,-34,64,-88xm42,-129r-23,0v2,-44,34,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-130,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-4,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm55,-244v0,-21,18,-38,39,-38v21,0,38,17,38,38v0,21,-17,39,-38,39v-21,0,-39,-18,-39,-39xm69,-244v0,14,11,25,25,25v14,0,24,-11,24,-25v0,-14,-10,-24,-24,-24v-14,0,-25,10,-25,24","w":186},"\u00e3":{"d":"140,-102v-30,22,-106,6,-106,52v0,23,21,36,42,36v46,0,71,-34,64,-88xm42,-129r-23,0v2,-44,34,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-130,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-4,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm69,-253v0,0,57,33,67,-2r14,0v-3,17,-13,34,-32,34v-18,1,-34,-15,-48,-16v-11,0,-19,6,-19,18r-14,0v2,-17,13,-34,32,-34","w":186},"\u00e7":{"d":"154,-67r23,0v-6,44,-34,71,-75,72r-12,16v17,-3,41,0,41,22v0,35,-47,36,-73,24r5,-12v13,5,48,11,48,-10v0,-24,-34,-5,-40,-17r18,-23v-50,-5,-77,-48,-77,-98v0,-53,31,-98,88,-98v40,0,70,22,75,64r-22,0v-6,-28,-23,-45,-53,-45v-44,0,-65,39,-65,79v0,40,21,79,65,79v28,0,51,-22,54,-53","w":186},"\u00e9":{"d":"178,-87r-143,0v0,33,17,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v60,0,84,52,82,104xm35,-106r120,0v-1,-34,-22,-66,-59,-66v-37,0,-57,32,-61,66xm138,-262r-48,50r-18,0r38,-50r28,0","w":186},"\u00ea":{"d":"178,-87r-143,0v0,33,17,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v60,0,84,52,82,104xm35,-106r120,0v-1,-34,-22,-66,-59,-66v-37,0,-57,32,-61,66xm106,-262r41,50r-24,0r-30,-36r-32,36r-21,0r41,-50r25,0","w":186},"\u00eb":{"d":"178,-87r-143,0v0,33,17,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v60,0,84,52,82,104xm35,-106r120,0v-1,-34,-22,-66,-59,-66v-37,0,-57,32,-61,66xm138,-218r-25,0r0,-36r25,0r0,36xm74,-218r-25,0r0,-36r25,0r0,36","w":186},"\u00e8":{"d":"178,-87r-143,0v0,33,17,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v60,0,84,52,82,104xm35,-106r120,0v-1,-34,-22,-66,-59,-66v-37,0,-57,32,-61,66xm96,-212r-47,-50r28,0r38,50r-19,0","w":186},"\u00ed":{"d":"45,0r-23,0r0,-186r23,0r0,186xm78,-262r-48,50r-18,0r38,-50r28,0","w":66},"\u00ee":{"d":"45,0r-23,0r0,-186r23,0r0,186xm46,-262r41,50r-24,0r-31,-36r-31,36r-21,0r41,-50r25,0","w":66},"\u00ef":{"d":"45,0r-23,0r0,-186r23,0r0,186xm77,-218r-24,0r0,-36r24,0r0,36xm14,-218r-25,0r0,-36r25,0r0,36","w":66},"\u00ec":{"d":"45,0r-23,0r0,-186r23,0r0,186xm36,-212r-47,-50r28,0r38,50r-19,0","w":66},"\u00f1":{"d":"21,0r0,-186r23,0v1,10,-2,24,1,32v8,-22,33,-37,59,-37v98,0,61,108,68,191r-23,0v-8,-67,28,-171,-47,-172v-75,-1,-56,99,-58,172r-23,0xm72,-253v26,0,58,33,67,-2r14,0v-3,17,-12,34,-31,34v-18,1,-34,-15,-49,-16v-11,0,-19,6,-19,18r-14,0v2,-17,13,-34,32,-34","w":193},"\u00f3":{"d":"100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm100,-172v-44,0,-65,39,-65,79v0,40,21,79,65,79v44,0,65,-39,65,-79v0,-40,-21,-79,-65,-79xm145,-262r-48,50r-18,0r38,-50r28,0"},"\u00f4":{"d":"100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm100,-172v-44,0,-65,39,-65,79v0,40,21,79,65,79v44,0,65,-39,65,-79v0,-40,-21,-79,-65,-79xm113,-262r41,50r-24,0r-31,-36r-31,36r-21,0r41,-50r25,0"},"\u00f6":{"d":"100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm100,-172v-44,0,-65,39,-65,79v0,40,21,79,65,79v44,0,65,-39,65,-79v0,-40,-21,-79,-65,-79xm144,-218r-24,0r0,-36r24,0r0,36xm81,-218r-25,0r0,-36r25,0r0,36"},"\u00f2":{"d":"100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm100,-172v-44,0,-65,39,-65,79v0,40,21,79,65,79v44,0,65,-39,65,-79v0,-40,-21,-79,-65,-79xm103,-212r-47,-50r28,0r38,50r-19,0"},"\u00f5":{"d":"100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm100,-172v-44,0,-65,39,-65,79v0,40,21,79,65,79v44,0,65,-39,65,-79v0,-40,-21,-79,-65,-79xm76,-253v0,0,57,33,67,-2r14,0v-3,17,-13,34,-32,34v-18,1,-34,-15,-48,-16v-11,0,-19,6,-19,18r-14,0v2,-17,13,-34,32,-34"},"\u0161":{"d":"156,-131r-23,0v-1,-28,-23,-41,-49,-41v-20,0,-44,8,-44,32v15,55,123,17,122,90v0,40,-40,55,-75,55v-43,0,-72,-20,-76,-65r23,0v2,31,25,46,55,46v21,0,50,-9,50,-35v0,-58,-121,-20,-121,-90v0,-38,36,-52,69,-52v37,0,68,20,69,60xm74,-212r-41,-50r24,0r30,36r32,-36r21,0r-41,50r-25,0","w":173},"\u00fa":{"d":"172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,48,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm141,-262r-47,50r-19,0r38,-50r28,0","w":193},"\u00fb":{"d":"172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,48,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm109,-262r41,50r-23,0r-31,-36r-32,36r-21,0r41,-50r25,0","w":193},"\u00fc":{"d":"172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,48,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm141,-218r-25,0r0,-36r25,0r0,36xm77,-218r-24,0r0,-36r24,0r0,36","w":193},"\u00f9":{"d":"172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,48,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm100,-212r-48,-50r28,0r38,50r-18,0","w":193},"\u00fd":{"d":"75,-1r-74,-185r24,0r61,159r57,-159r23,0r-81,214v-13,37,-29,45,-66,39r0,-19v37,12,47,-21,56,-49xm128,-262r-48,50r-18,0r38,-50r28,0","w":166,"k":{",":33,".":33}},"\u00ff":{"d":"75,-1r-74,-185r24,0r61,159r57,-159r23,0r-81,214v-13,37,-29,45,-66,39r0,-19v37,12,47,-21,56,-49xm127,-218r-24,0r0,-36r24,0r0,36xm64,-218r-25,0r0,-36r25,0r0,36","w":166,"k":{",":33,".":33}},"\u017e":{"d":"156,-170r-123,151r128,0r0,19r-156,0r0,-18r122,-149r-113,0r0,-19r142,0r0,16xm71,-212r-41,-50r23,0r31,36r32,-36r21,0r-41,50r-25,0","w":166},"\u2206":{"d":"12,0r0,-15r93,-242r23,0r93,242r0,15r-209,0xm32,-17r166,0r-83,-216","w":232},"\u2126":{"d":"19,-17v18,-1,40,2,56,-1v-27,-23,-51,-63,-51,-115v0,-73,48,-121,108,-121v63,0,105,55,105,120v1,55,-27,94,-51,117r56,0r0,17r-84,0r0,-13v30,-19,58,-60,58,-118v0,-48,-29,-106,-85,-106v-53,0,-86,48,-86,107v0,54,29,99,58,117r0,13r-84,0r0,-17","w":261},"\u03bc":{"d":"172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-17,38,-69,50,-106,26r0,76r-23,0r0,-255r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0","w":193},"\u03c0":{"d":"192,-168r-31,0v1,50,-4,133,6,168r-20,0v-11,-32,-4,-120,-6,-168r-71,0v-3,49,-14,135,-28,168r-20,0v14,-37,26,-117,28,-168v-24,0,-35,2,-42,5r-4,-13v41,-17,132,-6,190,-9","w":201},"\u20ac":{"d":"30,-156v8,-55,44,-101,104,-100v30,0,52,9,67,27r-10,22v-27,-36,-83,-39,-112,-5v-12,14,-21,33,-25,56r120,0r-6,16r-116,0r-1,21r110,0r-7,16r-101,0v4,49,31,88,79,88v31,-1,44,-13,63,-31r0,28v-68,56,-166,1,-166,-85r-24,0r7,-16v7,-1,19,4,16,-7r0,-14r-23,0r7,-16r18,0"},"\u2113":{"d":"151,-48r11,8v-15,28,-36,44,-64,44v-43,-1,-58,-34,-58,-74r-22,18r-7,-13v10,-8,20,-17,29,-25r0,-100v0,-66,28,-85,52,-85v29,0,42,25,42,56v0,46,-30,90,-75,134v-3,45,17,72,42,72v24,0,41,-19,50,-35xm59,-193r0,88v34,-36,60,-73,60,-112v0,-24,-7,-42,-28,-42v-14,0,-32,17,-32,66","w":171},"\u212e":{"d":"301,-121r-236,2v2,26,-4,58,3,79v46,51,139,49,181,-5r21,0v-26,30,-68,50,-114,50v-80,0,-144,-58,-144,-129v0,-72,64,-130,144,-130v81,1,146,58,145,133xm246,-128v1,-24,4,-60,-2,-82v-45,-48,-132,-47,-176,2v-6,20,-5,58,-1,80r179,0","w":312},"\u2202":{"d":"36,-244r-8,-15v67,-46,147,-10,147,115v0,82,-31,148,-92,148v-46,0,-67,-41,-67,-82v0,-55,36,-90,76,-90v35,0,56,24,62,36v11,-97,-54,-164,-118,-112xm85,-13v37,0,61,-45,66,-96v-6,-17,-26,-43,-56,-43v-32,0,-59,32,-59,73v0,38,19,66,49,66","w":192},"\u220f":{"d":"239,-231r-40,0r0,266r-20,0r0,-266r-109,0r0,266r-20,0r0,-266r-41,0r0,-19r230,0r0,19","w":249},"\u2211":{"d":"190,35r-182,0r0,-14r100,-128r-95,-129r0,-14r172,0r0,18r-143,1r90,121r-97,125r155,0r0,20","w":198},"\u2219":{"d":"50,-135v12,0,21,10,21,22v0,11,-10,20,-21,20v-12,0,-21,-9,-21,-21v0,-11,10,-21,21,-21","w":100},"\u221a":{"d":"202,-296r-80,351r-19,0r-59,-170r-27,10r-4,-13r44,-17r49,140v3,8,3,21,7,25r73,-326r16,0","w":202},"\u221e":{"d":"260,-104v0,33,-26,55,-54,55v-23,0,-40,-15,-66,-43v-19,22,-39,43,-69,43v-29,0,-52,-24,-52,-54v0,-32,23,-55,55,-55v27,0,48,22,67,44v20,-22,38,-44,68,-44v31,0,51,22,51,54xm34,-102v0,22,15,39,40,39v24,0,43,-24,58,-39v-16,-19,-34,-42,-61,-42v-24,0,-37,20,-37,42xm207,-144v-25,0,-45,27,-58,40v25,26,39,41,59,41v24,0,37,-20,37,-40v0,-27,-16,-41,-38,-41","w":279},"\u222b":{"d":"50,-217v0,-60,20,-98,68,-82r-4,14v-36,-12,-45,20,-45,70v0,55,5,126,5,183v1,67,-19,98,-70,82r4,-15v36,12,47,-11,47,-68v0,-57,-5,-129,-5,-184","w":123},"\u2248":{"d":"66,-152v44,0,85,55,111,0r9,8v-9,18,-22,33,-45,33v-25,0,-51,-27,-77,-28v-17,0,-28,13,-37,27r-10,-7v11,-21,28,-33,49,-33xm66,-93v44,0,84,56,111,0r9,8v-9,18,-22,33,-45,33v-24,0,-52,-27,-77,-28v-17,0,-28,14,-37,28r-10,-8v11,-21,29,-33,49,-33","w":204},"\u2260":{"d":"143,-180r-17,37r59,0r0,14r-65,0r-25,54r90,0r0,15r-96,0r-20,43r-12,-6r18,-37r-56,0r0,-15r62,0r25,-54r-87,0r0,-14r93,0r20,-42","w":204},"\u2264":{"d":"185,-34r-164,-81r0,-15r164,-81r0,17r-148,72r148,71r0,17xm185,-4r-166,0r0,-15r166,0r0,15","w":204},"\u2265":{"d":"21,-211r164,81r0,15r-164,81r0,-17r147,-72r-147,-71r0,-17xm185,-4r-166,0r0,-15r166,0r0,15","w":204},"\u25ca":{"d":"183,-125r-74,141r-16,0r-73,-141r74,-141r16,0xm164,-124v-20,-42,-46,-78,-62,-124r-63,123v20,42,46,79,62,124","w":203},"\u00a0":{"w":100},"\u00ad":{"d":"112,-89r-90,0r0,-20r90,0r0,20","w":133},"\u02c9":{"d":"93,-228r-119,0r0,-16r119,0r0,16","w":66},"\u03a9":{"d":"19,-17v18,-1,40,2,56,-1v-27,-23,-51,-63,-51,-115v0,-73,48,-121,108,-121v63,0,105,55,105,120v1,55,-27,94,-51,117r56,0r0,17r-84,0r0,-13v30,-19,58,-60,58,-118v0,-48,-29,-106,-85,-106v-53,0,-86,48,-86,107v0,54,29,99,58,117r0,13r-84,0r0,-17","w":261},"\u2215":{"d":"-60,12r163,-273r17,0r-162,273r-18,0","w":60},"\u2010":{"d":"112,-89r-90,0r0,-20r90,0r0,20","w":133}}});
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * ? 1988, 1990, 1993, 2002 Adobe Systems Incorporated. All rights reserved.
 * 
 * Trademark:
 * Helvetica is a trademark of Linotype Corp. registered in the U.S. Patent and
 * Trademark Office and may be registered in certain other jurisdictions in the
 * name of Linotype Corp. or its licensee Linotype GmbH.
 * 
 * Full name:
 * HelveticaNeueLTStd-Roman
 * 
 * Designer:
 * Linotype Staff
 * 
 * Vendor URL:
 * http://www.adobe.com/type
 * 
 * License information:
 * http://www.adobe.com/type/legal.html
 */
Cufon.registerFont({"w":200,"face":{"font-family":"Helvetica Neue LT Std","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"2 11 6 4 2 2 2 2 2 4","ascent":"257","descent":"-103","x-height":"4","bbox":"-60 -343 387 77","underline-thickness":"18","underline-position":"-18","stemh":"27","stemv":"31","unicode-range":"U+0020-U+FB02"},"glyphs":{" ":{"w":100},"!":{"d":"64,-257v2,68,-4,130,-9,191r-16,0r-9,-112r0,-79r34,0xm27,0r0,-40r40,0r0,40r-40,0","w":93},"\"":{"d":"39,-164r0,-93r25,0r0,93r-25,0xm90,-164r0,-93r24,0r0,93r-24,0","w":153},"#":{"d":"37,0r10,-74r-35,0r0,-25r39,0r7,-54r-36,0r0,-24r40,0r10,-74r25,0r-11,74r45,0r10,-74r25,0r-10,74r32,0r0,24r-35,0r-8,54r33,0r0,25r-37,0r-10,74r-25,0r11,-74r-45,0r-10,74r-25,0xm128,-153r-45,0r-7,54r44,0"},"$":{"d":"90,-150r0,-84v-23,3,-41,16,-41,43v0,26,17,34,41,41xm110,-113r0,90v27,-2,47,-15,47,-46v0,-27,-21,-36,-47,-44xm9,-78r31,0v1,32,21,50,50,55r0,-95v-51,-12,-73,-28,-73,-70v0,-44,32,-72,73,-75r0,-24r20,0r0,24v39,5,62,30,71,71r-31,0v-5,-23,-18,-37,-40,-41r0,88v36,9,79,16,79,73v0,46,-33,74,-79,78r0,30r-20,0r0,-30v-47,-5,-77,-34,-81,-84"},"%":{"d":"211,-67v0,-39,14,-73,58,-73v45,0,58,33,58,72v0,37,-16,72,-58,72v-44,0,-58,-32,-58,-71xm238,-68v0,21,3,53,30,53v27,0,32,-31,32,-53v0,-21,-4,-52,-31,-52v-27,0,-31,30,-31,52xm33,-182v0,-39,14,-73,58,-73v45,0,58,33,58,72v0,37,-16,72,-58,72v-44,0,-58,-32,-58,-71xm60,-183v0,21,3,52,30,52v27,0,32,-30,32,-52v0,-21,-4,-52,-31,-52v-27,0,-31,30,-31,52xm68,8r193,-268r31,0r-193,268r-31,0","w":360},"&":{"d":"148,-53r-59,-71v-24,14,-45,27,-45,58v0,54,83,55,104,13xm192,0r-27,-32v-15,24,-45,36,-73,36v-69,0,-80,-49,-80,-70v0,-40,27,-61,60,-78v-14,-21,-28,-34,-28,-60v0,-28,21,-53,58,-53v32,0,62,18,62,53v0,31,-23,52,-48,66r46,57v5,-13,7,-26,8,-40r29,0v-3,30,-6,40,-17,63r50,58r-40,0xm99,-158v15,-9,34,-23,34,-45v0,-15,-11,-27,-29,-27v-14,0,-30,8,-30,27v0,15,14,31,25,45","w":226},"\u2019":{"d":"30,-217r0,-40r40,0v1,44,2,92,-40,93r0,-18v16,0,21,-18,21,-35r-21,0","w":100,"k":{"\u2019":34,"s":27,"\u0161":27,"t":6}},"(":{"d":"97,71r-24,0v-72,-101,-76,-232,0,-334r24,0v-66,106,-64,228,0,334","w":93},")":{"d":"20,71r-24,0v66,-106,64,-228,0,-334r24,0v72,101,76,232,0,334","w":93},"*":{"d":"72,-257r0,41r39,-15r7,18r-39,13r24,33r-15,11r-25,-34r-23,34r-17,-11r24,-33r-38,-13r6,-18r38,15r0,-41r19,0","w":126},"+":{"d":"120,-182r0,79r79,0r0,24r-79,0r0,79r-24,0r0,-79r-79,0r0,-24r79,0r0,-79r24,0","w":216},",":{"d":"30,0r0,-40r40,0v2,47,0,82,-40,93r0,-18v16,-5,22,-23,21,-35r-21,0","w":100},"-":{"d":"18,-86r0,-28r104,0r0,28r-104,0","w":140},".":{"d":"30,0r0,-40r40,0r0,40r-40,0","w":100},"\/":{"d":"-6,6r106,-269r26,0r-106,269r-26,0","w":119},"0":{"d":"15,-125v0,-57,5,-130,85,-130v80,0,85,73,85,130v0,56,-5,129,-85,129v-80,0,-85,-73,-85,-129xm48,-126v0,38,0,103,52,103v52,0,53,-65,53,-103v0,-38,-1,-102,-53,-102v-52,0,-52,64,-52,102"},"1":{"d":"128,-255r0,255r-30,0r0,-183r-67,0r0,-24v35,0,67,-9,74,-48r23,0"},"2":{"d":"9,0v-3,-104,134,-103,136,-182v0,-28,-22,-46,-49,-46v-36,0,-51,32,-50,63r-30,0v-3,-52,28,-90,82,-90v45,0,80,25,80,73v0,87,-118,89,-134,155r131,0r0,27r-166,0"},"3":{"d":"78,-120r0,-26v33,5,61,-8,62,-41v0,-27,-19,-41,-45,-41v-33,0,-48,25,-48,55r-31,0v2,-49,28,-82,79,-82v44,0,78,21,78,68v1,23,-18,41,-35,52v31,7,46,31,46,62v0,51,-40,77,-88,77v-52,0,-86,-30,-85,-83r30,0v1,33,20,56,55,56v30,0,55,-18,55,-49v0,-39,-33,-54,-73,-48"},"4":{"d":"151,-255r0,168r34,0r0,27r-34,0r0,60r-29,0r0,-60r-112,0r0,-29r116,-166r25,0xm36,-87r86,0r-1,-125"},"5":{"d":"169,-251r0,27r-103,0r-13,74v50,-42,130,-9,130,69v0,43,-30,85,-89,85v-44,0,-80,-27,-81,-73r30,0v2,26,23,46,54,46v29,0,54,-19,54,-60v0,-58,-76,-77,-105,-34r-27,-1r24,-133r126,0"},"6":{"d":"103,-137v-34,0,-53,25,-53,57v0,32,20,57,53,57v33,0,51,-26,51,-56v0,-32,-16,-58,-51,-58xm180,-190r-31,0v-3,-23,-19,-38,-43,-38v-51,-1,-63,60,-61,97v37,-63,142,-29,142,50v0,37,-21,85,-85,85v-76,0,-88,-68,-88,-122v0,-70,21,-137,94,-137v42,0,68,24,72,65"},"7":{"d":"183,-251r0,26v-51,51,-93,145,-98,225r-34,0v6,-86,47,-165,101,-222r-134,0r0,-29r165,0"},"8":{"d":"47,-72v0,31,22,49,54,49v31,0,52,-21,52,-49v0,-28,-23,-49,-52,-49v-30,0,-54,19,-54,49xm23,-190v0,-42,36,-65,75,-65v89,-2,100,90,42,118v31,10,46,32,46,64v0,49,-38,77,-85,77v-49,0,-87,-25,-87,-77v0,-30,17,-54,45,-64v-21,-9,-36,-30,-36,-53xm56,-189v0,28,20,41,45,41v24,0,42,-15,42,-41v0,-26,-18,-39,-43,-39v-24,0,-44,13,-44,39"},"9":{"d":"147,-170v0,-31,-18,-58,-52,-58v-36,0,-50,29,-50,60v0,28,20,54,50,54v32,0,52,-26,52,-56xm18,-62r30,0v2,25,23,39,47,39v36,0,59,-36,57,-99v-35,66,-140,31,-140,-50v0,-49,35,-83,84,-83v48,0,88,26,88,122v0,88,-27,137,-89,137v-43,0,-73,-22,-77,-66"},":":{"d":"30,0r0,-40r40,0r0,40r-40,0xm70,-186r0,40r-40,0r0,-40r40,0","w":100},";":{"d":"30,0r0,-40r40,0v2,47,0,82,-40,93r0,-18v16,-5,22,-23,21,-35r-21,0xm70,-186r0,40r-40,0r0,-40r40,0","w":100},"<":{"d":"199,-185r0,24r-153,70r153,69r0,25r-182,-83r0,-22","w":216},"=":{"d":"199,-140r0,25r-182,0r0,-25r182,0xm17,-42r0,-25r182,0r0,25r-182,0","w":216},">":{"d":"17,3r0,-25r153,-69r-153,-70r0,-24r182,83r0,22","w":216},"?":{"d":"176,-191v0,62,-69,62,-62,128r-30,0v-9,-72,60,-70,60,-131v0,-26,-18,-42,-44,-42v-34,0,-50,26,-50,59r-30,0v-1,-49,30,-86,80,-86v44,0,76,26,76,72xm78,0r0,-40r40,0r0,40r-40,0"},"@":{"d":"151,-182v-34,0,-57,44,-57,75v0,20,13,35,31,35v31,0,55,-46,55,-76v0,-17,-14,-34,-29,-34xm222,-199r-34,120v0,6,3,11,9,11v22,0,50,-43,50,-82v0,-57,-48,-93,-98,-93v-62,0,-109,52,-109,115v0,107,141,153,200,71r23,0v-23,40,-67,63,-113,63v-76,0,-135,-60,-135,-136v0,-74,61,-133,134,-133v67,0,122,46,122,111v0,63,-50,104,-84,104v-13,0,-21,-9,-24,-23v-27,41,-96,25,-96,-33v0,-50,33,-102,84,-102v17,0,33,7,41,29r8,-22r22,0","w":288},"A":{"d":"-3,0r101,-257r38,0r100,257r-38,0r-28,-77r-108,0r-29,77r-36,0xm117,-226v-17,38,-29,81,-45,120r87,0","w":233},"B":{"d":"62,-118r0,89v57,-2,137,15,134,-46v-2,-60,-78,-39,-134,-43xm28,-257v83,3,192,-20,192,63v0,27,-15,48,-39,58v78,18,59,136,-29,136r-124,0r0,-257xm62,-228r0,81v51,-1,126,10,123,-41v-4,-60,-72,-34,-123,-40","w":246},"C":{"d":"243,-180r-34,0v-7,-36,-36,-54,-72,-54v-61,0,-87,50,-87,104v0,59,25,107,87,107v45,0,71,-32,74,-74r35,0v-6,64,-47,103,-112,103v-80,0,-119,-59,-119,-134v0,-75,43,-135,122,-135v54,0,98,28,106,83","w":259},"D":{"d":"28,0r0,-257r88,0v79,0,124,39,124,122v0,86,-38,135,-124,135r-88,0xm62,-228r0,199r57,0v23,0,87,-6,87,-101v0,-61,-23,-98,-86,-98r-58,0","w":253},"E":{"d":"28,0r0,-257r178,0r0,29r-144,0r0,81r134,0r0,29r-134,0r0,89r145,0r0,29r-179,0","w":219},"F":{"d":"28,0r0,-257r169,0r0,29r-135,0r0,81r118,0r0,29r-118,0r0,118r-34,0","w":206,"k":{"A":20,"\u00c6":20,"\u00c1":20,"\u00c2":20,"\u00c4":20,"\u00c0":20,"\u00c5":20,"\u00c3":20,",":57,".":57}},"G":{"d":"229,0r-9,-32v-20,27,-52,38,-82,38v-77,0,-123,-62,-123,-129v0,-75,42,-140,123,-140v56,0,100,25,110,85r-34,0v-7,-39,-38,-56,-76,-56v-62,0,-88,54,-88,109v0,54,31,102,88,102v53,0,84,-37,82,-84r-82,0r0,-28r113,0r0,135r-22,0","w":273},"H":{"d":"28,0r0,-257r34,0r0,110r136,0r0,-110r34,0r0,257r-34,0r0,-118r-136,0r0,118r-34,0","w":259},"I":{"d":"30,0r0,-257r34,0r0,257r-34,0","w":93},"J":{"d":"159,-257r0,193v0,35,-18,70,-76,70v-54,0,-79,-33,-75,-91r34,0v-1,36,5,62,42,62v31,0,41,-18,41,-46r0,-188r34,0","w":186},"K":{"d":"28,0r0,-257r34,0r0,128r131,-128r44,0r-108,104r112,153r-43,0r-93,-130r-43,40r0,90r-34,0","w":240},"L":{"d":"28,0r0,-257r34,0r0,228r136,0r0,29r-170,0","k":{"T":33,"V":33,"W":20,"y":13,"\u00fd":13,"\u00ff":13,"Y":40,"\u00dd":40,"\u0178":40,"\u2019":27}},"M":{"d":"29,0r0,-257r47,0r81,216r81,-216r47,0r0,257r-33,0r0,-214r-81,214r-29,0r-81,-214r0,214r-32,0","w":313},"N":{"d":"28,0r0,-257r36,0r136,208r0,-208r33,0r0,257r-38,0r-135,-206r0,206r-32,0","w":259},"O":{"d":"14,-129v0,-70,41,-134,123,-134v82,0,123,64,123,134v0,70,-41,135,-123,135v-82,0,-123,-65,-123,-135xm137,-234v-121,1,-120,210,0,211v120,-1,120,-210,0,-211","w":273},"P":{"d":"28,0r0,-257r113,0v51,0,79,28,79,76v0,48,-28,76,-79,76r-79,0r0,105r-34,0xm62,-228r0,94v55,0,129,9,123,-47v6,-55,-68,-47,-123,-47","w":233,"k":{"A":27,"\u00c6":27,"\u00c1":27,"\u00c2":27,"\u00c4":27,"\u00c0":27,"\u00c5":27,"\u00c3":27,",":64,".":64}},"Q":{"d":"255,1r-17,21r-40,-31v-17,10,-37,15,-61,15v-82,0,-123,-65,-123,-135v0,-70,41,-134,123,-134v127,0,157,162,84,237xm144,-53r18,-20r34,27v53,-56,39,-188,-59,-188v-121,1,-120,210,0,211v13,0,24,-2,35,-7","w":273},"R":{"d":"62,-139v57,-4,130,17,131,-45v0,-25,-14,-44,-46,-44r-85,0r0,89xm198,0v-17,-27,9,-110,-52,-110r-84,0r0,110r-34,0r0,-257r121,0v86,-9,106,110,34,132v56,13,26,86,53,125r-38,0","w":246,"k":{"T":6,"V":6,"W":6,"Y":13,"\u00dd":13,"\u0178":13}},"S":{"d":"186,-69v0,-73,-165,-28,-165,-119v0,-52,46,-75,93,-75v53,0,93,24,95,81r-32,0v-4,-37,-29,-52,-64,-52v-29,0,-58,11,-58,44v0,32,42,36,83,45v41,9,82,24,82,74v0,55,-53,77,-100,77v-58,0,-107,-28,-107,-91r33,0v0,43,36,62,75,62v31,0,65,-9,65,-46","w":233},"T":{"d":"86,0r0,-228r-85,0r0,-29r205,0r0,29r-85,0r0,228r-35,0","w":206,"k":{"\u00fc":33,"\u0161":40,"\u00f2":40,"\u00f6":40,"\u00e8":40,"\u00eb":40,"\u00ea":40,"\u00e3":40,"\u00e5":40,"\u00e0":40,"\u00e4":40,"\u00e2":40,"w":40,"y":40,"\u00fd":40,"\u00ff":40,"A":33,"\u00c6":33,"\u00c1":33,"\u00c2":33,"\u00c4":33,"\u00c0":33,"\u00c5":33,"\u00c3":33,",":40,".":40,"c":40,"\u00e7":40,"e":40,"\u00e9":40,"o":40,"\u00f8":40,"\u0153":40,"\u00f3":40,"\u00f4":40,"\u00f5":40,"-":46,"a":40,"\u00e6":40,"\u00e1":40,"r":33,"s":40,"u":33,"\u00fa":33,"\u00fb":33,"\u00f9":33,":":40,";":40}},"U":{"d":"233,-257r0,164v0,65,-37,99,-101,99v-66,0,-105,-31,-105,-99r0,-164r34,0r0,164v0,45,26,70,71,70v101,0,58,-143,67,-234r34,0","w":259},"V":{"d":"221,-257r-92,257r-39,0r-90,-257r37,0r74,223r74,-223r36,0","w":219,"k":{"\u00f6":20,"\u00f4":20,"\u00ee":6,"\u00e8":20,"\u00eb":20,"\u00ea":20,"\u00e3":20,"\u00e5":20,"\u00e0":20,"\u00e4":20,"\u00e2":20,"y":6,"\u00fd":6,"\u00ff":6,"A":17,"\u00c6":17,"\u00c1":17,"\u00c2":17,"\u00c4":17,"\u00c0":17,"\u00c5":17,"\u00c3":17,",":46,".":46,"e":20,"\u00e9":20,"o":20,"\u00f8":20,"\u0153":20,"\u00f3":20,"\u00f2":20,"\u00f5":20,"-":20,"a":20,"\u00e6":20,"\u00e1":20,"r":13,"u":13,"\u00fa":13,"\u00fb":13,"\u00fc":13,"\u00f9":13,":":17,";":17,"i":6,"\u0131":6,"\u00ed":6,"\u00ef":6,"\u00ec":6}},"W":{"d":"329,-257r-69,257r-35,0r-60,-216r-59,216r-36,0r-66,-257r35,0r51,214r58,-214r37,0r58,214r52,-214r34,0","w":333,"k":{"\u00fc":6,"\u00f6":21,"\u00ea":21,"\u00e4":13,"A":9,"\u00c6":9,"\u00c1":9,"\u00c2":9,"\u00c4":9,"\u00c0":9,"\u00c5":9,"\u00c3":9,",":27,".":27,"e":21,"\u00e9":21,"\u00eb":21,"\u00e8":21,"o":21,"\u00f8":21,"\u0153":21,"\u00f3":21,"\u00f4":21,"\u00f2":21,"\u00f5":21,"a":13,"\u00e6":13,"\u00e1":13,"\u00e2":13,"\u00e0":13,"\u00e5":13,"\u00e3":13,"r":6,"u":6,"\u00fa":6,"\u00fb":6,"\u00f9":6,":":6,";":6}},"X":{"d":"0,0r89,-132r-84,-125r41,0r64,100r67,-100r38,0r-85,125r90,132r-41,0r-70,-106r-71,106r-38,0","w":219},"Y":{"d":"233,-257r-99,152r0,105r-34,0r0,-105r-99,-152r40,0r77,122r76,-122r39,0","w":233,"k":{"\u00fc":27,"\u00f6":40,"v":20,"A":27,"\u00c6":27,"\u00c1":27,"\u00c2":27,"\u00c4":27,"\u00c0":27,"\u00c5":27,"\u00c3":27,",":50,".":50,"e":40,"\u00e9":40,"\u00ea":40,"\u00eb":40,"\u00e8":40,"o":40,"\u00f8":40,"\u0153":40,"\u00f3":40,"\u00f4":40,"\u00f2":40,"\u00f5":40,"q":33,"-":40,"a":33,"\u00e6":33,"\u00e1":33,"\u00e2":33,"\u00e4":33,"\u00e0":33,"\u00e5":33,"\u00e3":33,"u":27,"\u00fa":27,"\u00fb":27,"\u00f9":27,":":33,";":33,"i":13,"\u0131":13,"\u00ed":13,"\u00ee":13,"\u00ef":13,"\u00ec":13,"p":27}},"Z":{"d":"8,0r0,-29r160,-199r-148,0r0,-29r188,0r0,29r-159,199r163,0r0,29r-204,0","w":219},"[":{"d":"93,-263r0,24r-38,0r0,286r38,0r0,24r-67,0r0,-334r67,0","w":93},"\\":{"d":"20,-263r106,269r-26,0r-106,-269r26,0","w":119},"]":{"d":"0,71r0,-24r39,0r0,-286r-39,0r0,-24r67,0r0,334r-67,0","w":93},"^":{"d":"18,-95r78,-156r24,0r78,156r-25,0r-65,-130r-64,130r-26,0","w":216},"_":{"d":"0,45r0,-18r180,0r0,18r-180,0","w":180},"\u2018":{"d":"70,-204r0,40r-40,0v-1,-44,-2,-92,40,-93r0,18v-16,0,-21,18,-21,35r21,0","w":100,"k":{"\u2018":34}},"a":{"d":"138,-96v-25,17,-94,1,-93,46v0,20,17,27,36,27v55,0,60,-27,57,-73xm188,-24r0,23v-18,9,-51,7,-48,-23v-31,41,-126,42,-127,-24v0,-42,31,-51,63,-57v34,-6,63,-4,63,-27v0,-48,-90,-40,-88,4r-31,0v2,-46,38,-62,79,-62v33,0,70,7,70,51r0,95v-1,19,4,24,19,20","w":193},"b":{"d":"168,-95v0,-35,-17,-68,-57,-68v-41,0,-57,35,-57,70v0,37,16,70,58,70v42,0,56,-36,56,-72xm24,0r0,-257r31,0r0,96v10,-21,34,-29,60,-29v57,0,86,44,86,97v0,53,-28,97,-85,97v-19,0,-47,-7,-61,-29r0,25r-31,0","w":213},"c":{"d":"181,-126r-32,0v-5,-23,-21,-37,-46,-37v-44,0,-58,34,-58,72v0,34,16,68,55,68v30,0,47,-17,51,-45r31,0v-7,45,-35,72,-82,72v-57,0,-87,-40,-87,-95v0,-56,29,-99,88,-99v42,0,76,20,80,64","w":193},"d":{"d":"189,-257r0,257r-30,0v-1,-8,2,-19,-1,-25v-10,21,-33,29,-59,29v-57,0,-86,-45,-86,-98v0,-82,93,-130,146,-67r0,-96r30,0xm45,-91v0,35,18,68,58,68v41,0,57,-35,57,-70v0,-37,-17,-70,-59,-70v-42,0,-56,36,-56,72","w":213},"e":{"d":"152,-59r30,0v-8,41,-38,63,-80,63v-59,0,-89,-41,-89,-98v0,-56,36,-96,87,-96v66,0,87,61,85,106r-140,0v-1,32,17,61,58,61v25,0,44,-12,49,-36xm45,-111r107,0v-1,-29,-23,-52,-53,-52v-32,0,-52,24,-54,52","w":193},"f":{"d":"36,0r0,-159r-32,0r0,-27r32,0v-8,-53,19,-85,71,-71r0,27v-18,-6,-41,-5,-41,18r0,26r36,0r0,27r-36,0r0,159r-30,0","w":106,"k":{"\u2019":-6,"f":6,"\ufb01":6,"\ufb02":6,"\u00df":6}},"g":{"d":"98,-25v72,0,77,-137,2,-138v-39,0,-55,31,-55,67v0,33,13,71,53,71xm184,-186v-7,109,35,262,-87,262v-35,0,-75,-14,-77,-55r31,0v1,22,28,30,48,30v44,1,61,-37,55,-83v-10,23,-35,34,-58,34v-55,0,-83,-43,-83,-94v0,-44,22,-98,86,-98v24,-1,43,12,56,31r0,-27r29,0","w":206},"h":{"d":"23,0r0,-257r31,0r0,98v10,-22,37,-31,59,-31v94,-2,56,109,64,190r-30,0r0,-126v0,-23,-15,-37,-38,-37v-76,-1,-51,94,-55,163r-31,0"},"i":{"d":"25,0r0,-186r30,0r0,186r-30,0xm55,-257r0,37r-30,0r0,-37r30,0","w":79},"j":{"d":"55,-186r0,210v0,39,-24,51,-60,46r0,-26v19,1,30,1,30,-25r0,-205r30,0xm55,-257r0,37r-30,0r0,-37r30,0","w":79},"k":{"d":"25,0r0,-257r30,0r0,152r85,-81r41,0r-73,68r79,118r-39,0r-64,-97r-29,26r0,71r-30,0","w":186},"l":{"d":"25,0r0,-257r30,0r0,257r-30,0","w":79},"m":{"d":"23,0r0,-186r29,0v1,8,-2,21,1,27v22,-38,93,-46,111,0v25,-46,120,-44,120,23r0,136r-31,0r0,-122v0,-23,-6,-41,-36,-41v-72,-1,-42,99,-48,163r-31,0r0,-122v0,-24,-8,-41,-35,-41v-79,0,-40,93,-49,163r-31,0","w":307},"n":{"d":"23,0r0,-186r29,0v1,9,-2,22,1,29v13,-23,33,-33,60,-33v94,-2,56,109,64,190r-30,0r0,-126v0,-23,-15,-37,-38,-37v-76,-1,-51,94,-55,163r-31,0"},"o":{"d":"13,-93v0,-55,31,-97,90,-97v59,0,91,42,91,97v0,54,-32,97,-91,97v-59,0,-90,-43,-90,-97xm45,-93v0,45,26,70,58,70v32,0,58,-25,58,-70v0,-45,-26,-70,-58,-70v-32,0,-58,25,-58,70","w":206},"p":{"d":"168,-95v0,-35,-17,-68,-57,-68v-41,0,-57,35,-57,70v0,37,16,70,58,70v42,0,56,-36,56,-72xm24,71r0,-257r31,0r0,25v10,-21,34,-29,60,-29v57,0,86,44,86,97v0,53,-28,97,-85,97v-19,0,-47,-7,-61,-29r0,96r-31,0","w":213},"q":{"d":"189,-186r0,257r-30,0r-1,-96v-10,21,-33,29,-59,29v-57,0,-86,-45,-86,-98v0,-82,93,-130,146,-67r0,-25r30,0xm45,-91v0,35,18,68,58,68v41,0,57,-35,57,-70v0,-37,-17,-70,-59,-70v-42,0,-56,36,-56,72","w":213},"r":{"d":"22,0r0,-186r29,0r0,39v15,-30,36,-44,69,-43r0,32v-81,-4,-66,83,-67,158r-31,0","w":119,"k":{",":33,".":33,"c":6,"\u00e7":6,"d":6,"e":6,"\u00e9":6,"\u00ea":6,"\u00eb":6,"\u00e8":6,"g":10,"n":-6,"\u00f1":-6,"o":6,"\u00f8":6,"\u0153":6,"\u00f3":6,"\u00f4":6,"\u00f6":6,"\u00f2":6,"\u00f5":6,"q":6,"-":20}},"s":{"d":"48,-140v10,47,121,19,121,86v0,44,-41,58,-79,58v-42,0,-77,-17,-79,-63r31,0v1,27,25,36,50,36v19,0,45,-4,45,-27v0,-50,-122,-19,-122,-88v0,-37,38,-52,70,-52v41,0,73,13,76,58r-31,0v-2,-24,-23,-31,-43,-31v-18,0,-39,4,-39,23","w":180},"t":{"d":"66,-242r0,56r37,0r0,27r-37,0r0,115v-4,19,18,17,37,17r0,27v-40,0,-68,3,-68,-41r0,-118r-32,0r0,-27r32,0r0,-56r31,0","w":113},"u":{"d":"177,-186r0,186r-29,0r0,-30v-13,23,-34,34,-61,34v-94,2,-56,-109,-64,-190r31,0r0,126v0,23,14,37,37,37v77,1,52,-93,56,-163r30,0"},"v":{"d":"175,-186r-68,186r-33,0r-69,-186r34,0r53,155r51,-155r32,0","w":180,"k":{",":27,".":27}},"w":{"d":"267,-186r-60,186r-32,0r-39,-148r-37,148r-33,0r-60,-186r34,0r43,152r37,-152r34,0r39,152r42,-152r32,0","w":272,"k":{",":20,".":20}},"x":{"d":"3,0r70,-98r-65,-88r40,0r44,65r47,-65r36,0r-64,86r72,100r-39,0r-52,-77r-52,77r-37,0","w":186},"y":{"d":"177,-186r-81,211v-17,44,-35,58,-75,46r0,-28v17,8,36,6,43,-12r13,-32r-74,-185r34,0r56,152r52,-152r32,0","w":180,"k":{",":27,".":27}},"z":{"d":"8,0r0,-23r112,-136r-105,0r0,-27r145,0r0,21r-114,138r119,0r0,27r-157,0","w":172},"{":{"d":"111,-263r0,21v-51,-11,-35,54,-35,97v0,35,-24,45,-31,50v8,1,31,11,31,48v0,38,-21,105,35,97r0,21v-39,3,-64,-5,-64,-47v0,-42,6,-108,-30,-108r0,-24v36,0,30,-66,30,-108v0,-42,25,-50,64,-47","w":119},"|":{"d":"28,77r0,-360r24,0r0,360r-24,0","w":79},"}":{"d":"9,71r0,-21v51,11,35,-54,35,-97v0,-35,24,-44,31,-49v-8,-1,-31,-12,-31,-49v0,-38,21,-105,-35,-97r0,-21v39,-3,64,5,64,47v0,42,-7,109,30,108r0,24v-35,0,-30,66,-30,108v0,42,-25,50,-64,47","w":119},"~":{"d":"70,-113v24,0,57,26,77,26v14,0,23,-15,31,-28r13,18v-11,15,-23,31,-45,31v-37,0,-91,-53,-108,2r-13,-18v8,-15,21,-31,45,-31","w":216},"\u00a1":{"d":"30,71v-2,-68,4,-130,9,-191r16,0r9,112r0,79r-34,0xm67,-186r0,40r-40,0r0,-40r40,0","w":93},"\u00a2":{"d":"98,-23r0,-140v-67,7,-67,134,0,140xm98,42r0,-38v-53,-2,-81,-42,-81,-95v0,-52,27,-95,81,-99r0,-35r14,0r0,35v39,1,68,20,73,64r-31,0v-5,-22,-19,-36,-42,-37r0,140v26,-3,40,-21,44,-45r30,0v-4,36,-29,72,-74,72r0,38r-14,0"},"\u00a3":{"d":"196,-10v-46,44,-117,-23,-162,14r-17,-24v31,-18,52,-60,31,-98r-31,0r0,-16r21,0v-10,-16,-17,-34,-17,-56v0,-46,38,-73,82,-73v53,0,86,31,85,93r-31,0v-1,-41,-17,-66,-52,-66v-29,0,-52,20,-52,47v0,24,11,37,19,55r57,0r0,16r-49,0v20,39,-6,75,-35,95v40,-26,102,20,135,-11"},"\u2044":{"d":"-60,10r157,-271r23,0r-157,271r-23,0","w":60},"\u00a5":{"d":"84,0r0,-63r-51,0r0,-21r51,0v1,-13,-2,-21,-7,-27r-44,0r0,-22r33,0r-66,-124r39,0r63,127r61,-127r37,0r-64,124r34,0r0,22r-46,0v-4,7,-7,15,-6,27r52,0r0,21r-52,0r0,63r-34,0"},"\u0192":{"d":"177,-257r-5,27v-22,-1,-38,-1,-43,19r-12,49r37,0r-5,25r-36,0v-17,66,-14,207,-88,196r-24,0r5,-27v38,0,44,-3,50,-36r25,-133r-33,0r5,-25r33,0v6,-55,18,-107,91,-95"},"\u00a7":{"d":"68,-151v-14,5,-26,18,-26,33v0,44,61,48,88,73v14,-6,26,-17,26,-33v0,-43,-60,-49,-88,-73xm138,14v-7,-54,-125,-58,-125,-131v0,-22,17,-44,38,-50v-38,-37,0,-96,50,-96v39,0,65,21,66,66r-30,0v0,-22,-14,-39,-37,-39v-19,0,-34,10,-34,31v0,50,120,58,120,123v0,23,-16,44,-38,52v44,33,16,101,-46,101v-42,0,-69,-26,-72,-68r30,0v-5,45,75,58,78,11"},"\u00a4":{"d":"9,-200r18,-17r20,20v27,-25,79,-25,106,-1r20,-20r18,19r-20,19v25,27,25,80,0,108r20,20r-17,17r-20,-21v-28,27,-81,26,-108,0r-20,21r-17,-17r20,-21v-25,-27,-26,-80,1,-106xm101,-189v-34,0,-60,28,-60,63v0,35,27,63,60,63v33,0,58,-28,58,-63v0,-34,-25,-63,-58,-63"},"'":{"d":"38,-164r0,-93r24,0r0,93r-24,0","w":100},"\u201c":{"d":"130,-204r0,40r-40,0v-1,-44,-3,-92,39,-93r0,18v-16,0,-21,18,-21,35r22,0xm64,-204r0,40r-40,0v-1,-44,-3,-92,39,-93r0,18v-16,0,-21,18,-21,35r22,0","w":153},"\u00ab":{"d":"143,-41r-54,-43r0,-32r54,-43r0,31r-36,28r36,28r0,31xm73,-41r-55,-43r0,-32r55,-43r0,31r-36,28r36,28r0,31","w":166},"\u2039":{"d":"73,-41r-55,-43r0,-32r55,-43r0,31r-36,28r36,28r0,31","w":93},"\u203a":{"d":"21,-159r54,43r0,32r-54,43r0,-31r36,-28r-36,-28r0,-31","w":93},"\ufb01":{"d":"36,0r0,-159r-32,0r0,-27r32,0v-8,-53,19,-85,71,-71r0,27v-18,-6,-41,-5,-41,18r0,26r36,0r0,27r-36,0r0,159r-30,0xm162,-220r-31,0r0,-37r31,0r0,37xm162,0r-31,0r0,-186r31,0r0,186","w":186},"\ufb02":{"d":"36,0r0,-159r-32,0r0,-27r32,0v-8,-53,19,-85,71,-71r0,27v-18,-6,-41,-5,-41,18r0,26r36,0r0,27r-36,0r0,159r-30,0xm131,0r0,-257r31,0r0,257r-31,0","w":186},"\u2013":{"d":"0,-86r0,-28r180,0r0,28r-180,0","w":180},"\u2020":{"d":"85,56r0,-215r-70,0r0,-27r70,0r0,-71r29,0r0,71r71,0r0,27r-71,0r0,215r-29,0"},"\u2021":{"d":"85,56r0,-71r-70,0r0,-27r70,0r0,-117r-70,0r0,-27r70,0r0,-71r29,0r0,71r71,0r0,27r-71,0r0,117r71,0r0,27r-71,0r0,71r-29,0"},"\u00b7":{"d":"27,-112v0,-13,11,-23,23,-23v12,0,23,11,23,23v0,12,-11,23,-23,23v-13,0,-23,-11,-23,-23","w":100},"\u00b6":{"d":"185,-257r0,313r-24,0r0,-293r-44,0r0,293r-24,0r0,-172v-44,0,-76,-30,-76,-67v0,-47,32,-74,82,-74r86,0","w":216},"\u2022":{"d":"26,-129v0,-36,28,-64,64,-64v36,0,64,28,64,64v0,36,-28,65,-64,65v-36,0,-64,-29,-64,-65","w":180},"\u201a":{"d":"30,0r0,-40r40,0v1,44,2,92,-40,93r0,-18v16,0,21,-18,21,-35r-21,0","w":100},"\u201e":{"d":"24,0r0,-40r40,0v1,44,2,92,-40,93r0,-18v16,0,21,-18,21,-35r-21,0xm90,0r0,-40r40,0v1,44,2,92,-40,93r0,-18v16,0,21,-18,21,-35r-21,0","w":153},"\u201d":{"d":"90,-217r0,-40r40,0v1,44,2,92,-40,93r0,-18v16,0,21,-18,21,-35r-21,0xm24,-217r0,-40r40,0v1,44,2,92,-40,93r0,-18v16,0,21,-18,21,-35r-21,0","w":153},"\u00bb":{"d":"23,-159r55,43r0,32r-55,43r0,-31r36,-28r-36,-28r0,-31xm94,-159r55,43r0,32r-55,43r0,-31r36,-28r-36,-28r0,-31","w":166},"\u2026":{"d":"40,0r0,-40r40,0r0,40r-40,0xm160,0r0,-40r40,0r0,40r-40,0xm280,0r0,-40r40,0r0,40r-40,0","w":360},"\u2030":{"d":"132,-194v1,31,-21,62,-54,62v-37,0,-52,-26,-52,-61v0,-35,14,-62,53,-62v38,0,53,26,53,61xm80,-235v-38,0,-38,83,-1,83v21,0,26,-23,26,-41v0,-15,-4,-42,-25,-42xm263,-58v0,31,-19,62,-53,62v-37,0,-53,-25,-53,-60v0,-35,15,-62,54,-62v38,0,52,25,52,60xm184,-57v0,19,4,42,26,42v21,0,26,-24,26,-42v0,-15,-3,-42,-24,-42v-22,0,-28,24,-28,42xm387,-58v0,31,-19,62,-53,62v-37,0,-52,-25,-52,-60v0,-35,14,-62,53,-62v38,0,52,25,52,60xm309,-57v0,19,3,42,25,42v21,0,26,-24,26,-42v0,-15,-3,-42,-24,-42v-22,0,-27,24,-27,42xm32,8r194,-268r31,0r-194,268r-31,0","w":413},"\u00bf":{"d":"24,4v0,-62,67,-63,63,-126r30,0v8,70,-60,68,-60,128v0,26,17,43,43,43v34,0,50,-27,50,-60r31,0v1,49,-31,87,-81,87v-44,0,-76,-26,-76,-72xm121,-186r0,40r-40,0r0,-40r40,0"},"`":{"d":"39,-212r-47,-51r39,0r31,51r-23,0","w":79},"\u00b4":{"d":"18,-212r31,-51r39,0r-47,51r-23,0","w":79},"\u02c6":{"d":"-14,-212r37,-51r34,0r37,51r-30,0r-25,-34r-25,34r-28,0","w":79},"\u02dc":{"d":"17,-255v23,0,58,32,67,-1r19,0v-4,20,-13,41,-40,40v-12,0,-36,-14,-48,-14v-8,0,-18,6,-17,15r-19,0v6,-21,15,-40,38,-40","w":79},"\u00af":{"d":"-21,-223r0,-20r123,0r0,20r-123,0","w":79},"\u02d8":{"d":"-16,-263r18,0v6,20,19,30,40,30v21,0,29,-12,36,-30r18,0v-5,31,-25,50,-57,50v-33,0,-50,-18,-55,-50","w":79},"\u02d9":{"d":"56,-251r0,38r-32,0r0,-38r32,0","w":79},"\u00a8":{"d":"58,-213r0,-38r32,0r0,38r-32,0xm-10,-213r0,-38r32,0r0,38r-32,0","w":79},"\u02da":{"d":"15,-238v0,14,11,24,25,24v14,0,24,-10,24,-24v0,-14,-10,-25,-24,-25v-14,0,-25,11,-25,25xm-1,-238v0,-22,19,-41,41,-41v22,0,41,19,41,41v0,22,-19,40,-41,40v-22,0,-41,-18,-41,-40","w":79},"\u00b8":{"d":"2,69r6,-16v12,6,45,8,45,-7v0,-11,-22,-14,-32,-8v-13,-14,10,-25,16,-38r15,0v-5,7,-11,12,-15,20v17,-8,44,2,43,24v-3,36,-50,37,-78,25","w":79},"\u02dd":{"d":"-17,-212r29,-51r38,0r-44,51r-23,0xm39,-212r29,-51r38,0r-43,51r-24,0","w":79},"\u02db":{"d":"68,-1r15,0v-25,21,-31,33,-31,43v0,21,30,19,36,5r11,6v-10,17,-24,23,-39,23v-9,0,-33,-2,-33,-30v0,-6,4,-25,41,-47","w":79},"\u02c7":{"d":"94,-263r-37,51r-34,0r-37,-51r30,0r25,34r25,-34r28,0","w":79},"\u2014":{"d":"47,-86r0,-28r266,0r0,28r-266,0","w":360},"\u00c6":{"d":"-3,0r130,-257r193,0r0,29r-126,0r0,81r118,0r0,29r-118,0r0,89r128,0r0,29r-161,0r0,-75r-88,0r-37,75r-39,0xm161,-228r-14,0r-61,124r75,0r0,-124","w":333},"\u00aa":{"d":"9,-169v-9,-45,84,-29,85,-51v0,-16,-14,-17,-28,-17v-17,0,-29,5,-30,20r-22,0v1,-28,25,-38,53,-38v22,0,47,5,47,31r0,58v-1,14,5,11,13,10r0,16v-13,6,-34,3,-34,-13v-20,24,-84,23,-84,-16xm93,-197v-15,12,-59,2,-60,27v6,31,68,8,60,-10r0,-17","w":136},"\u0141":{"d":"28,0r0,-86r-28,20r0,-28r28,-20r0,-143r34,0r0,119r82,-58r0,28r-82,57r0,82r136,0r0,29r-170,0","k":{"T":33,"V":33,"W":20,"y":13,"\u00fd":13,"\u00ff":13,"Y":40,"\u00dd":40,"\u0178":40,"\u2019":27}},"\u00d8":{"d":"66,-61r133,-147v-14,-16,-35,-26,-62,-26v-90,0,-108,108,-71,173xm208,-195r-132,147v14,16,34,25,61,25v89,-1,109,-107,71,-172xm249,-263r11,11r-29,32v60,81,25,228,-94,226v-35,0,-63,-12,-83,-31r-29,32r-12,-11r31,-33v-62,-80,-27,-229,93,-226v36,0,63,13,83,32","w":273},"\u0152":{"d":"198,-182v1,-36,-27,-52,-63,-52v-58,0,-87,50,-87,108v0,57,29,103,86,103v36,0,64,-20,64,-50r0,-109xm198,0r0,-25v-13,20,-41,31,-67,31v-76,0,-117,-59,-117,-134v0,-77,44,-135,120,-135v24,0,54,9,64,27r0,-21r172,0r0,29r-137,0r0,81r126,0r0,29r-126,0r0,89r139,0r0,29r-174,0","w":386},"\u00ba":{"d":"69,-255v39,0,60,26,60,60v0,35,-21,58,-60,58v-38,0,-60,-24,-60,-58v0,-33,21,-60,60,-60xm105,-195v-2,-63,-72,-53,-72,0v0,22,10,40,36,40v26,0,36,-18,36,-40","w":138},"\u00e6":{"d":"272,-111v-1,-29,-19,-52,-51,-52v-33,0,-53,22,-53,52r104,0xm139,-96v-27,16,-94,2,-94,46v0,20,17,27,36,27v55,0,61,-27,58,-73xm305,-84r-137,0v-10,60,89,87,103,25r31,0v-9,68,-115,88,-148,27v-22,48,-142,56,-141,-16v0,-42,31,-51,63,-57v45,-9,63,-8,63,-30v0,-25,-21,-28,-42,-28v-26,0,-45,8,-46,35r-31,0v2,-46,38,-62,79,-62v22,0,51,4,62,27v13,-19,37,-27,60,-27v65,0,84,48,84,106","w":313},"\u0131":{"d":"55,0r-30,0r0,-186r30,0r0,186","w":79},"\u0142":{"d":"25,0r0,-116r-25,20r0,-25r25,-20r0,-116r30,0r0,91r26,-20r0,26r-26,20r0,140r-30,0","w":79},"\u00f8":{"d":"56,-49r87,-98v-39,-35,-101,-10,-98,54v0,17,4,32,11,44xm151,-136r-87,97v38,35,100,10,97,-54v0,-18,-4,-32,-10,-43xm194,-183r-21,24v45,58,17,163,-70,163v-25,0,-44,-7,-59,-20r-22,24r-10,-9r23,-25v-45,-58,-19,-164,68,-164v25,0,46,7,61,21r21,-24","w":206},"\u0153":{"d":"311,-84r-135,0v-1,32,18,61,54,61v24,0,43,-13,50,-36r29,0v-11,71,-115,86,-147,27v-12,27,-36,36,-64,36v-59,0,-85,-44,-85,-97v0,-54,27,-97,85,-97v28,0,52,6,64,32v13,-22,40,-32,66,-32v62,0,86,47,83,106xm176,-111r103,0v0,-31,-19,-52,-51,-52v-32,0,-52,21,-52,52xm149,-94v0,-34,-9,-69,-51,-69v-70,1,-74,139,0,140v41,0,51,-38,51,-71","w":320},"\u00df":{"d":"23,0r0,-191v0,-43,28,-72,71,-72v35,0,75,21,75,63v0,27,-11,47,-38,56v84,21,50,156,-34,148v-5,0,-10,0,-15,-1r0,-27v39,6,66,-16,66,-51v0,-47,-26,-54,-66,-54r0,-25v29,2,54,-8,54,-41v0,-23,-17,-41,-40,-41v-25,0,-42,10,-42,50r0,186r-31,0"},"\u00b9":{"d":"90,-255r0,154r-25,0r0,-111r-41,0r0,-18v23,0,44,-5,48,-25r18,0","w":119},"\u00ac":{"d":"199,-140r0,101r-25,0r0,-76r-157,0r0,-25r182,0","w":216},"\u00b5":{"d":"177,-186r0,186r-29,0r0,-30v-14,32,-68,47,-94,21r0,80r-31,0r0,-257r31,0r0,126v0,23,14,37,37,37v77,1,52,-93,56,-163r30,0"},"\u2122":{"d":"140,-257r0,20r-46,0r0,128r-25,0r0,-128r-46,0r0,-20r117,0xm334,-257r0,148r-25,0r0,-124r-49,124r-16,0r-49,-124r0,124r-24,0r0,-148r37,0r45,113r43,-113r38,0","w":356},"\u00d0":{"d":"28,0r0,-122r-25,0r0,-25r25,0r0,-110r88,0v79,0,124,39,124,122v0,86,-38,135,-124,135r-88,0xm62,-228r0,81r77,0r0,25r-77,0r0,93r57,0v23,0,87,-6,87,-101v0,-61,-23,-98,-86,-98r-58,0","w":253},"\u00bd":{"d":"49,10r156,-271r23,0r-156,271r-23,0xm79,-255r0,154r-25,0r0,-111r-41,0r0,-18v23,0,44,-5,48,-25r18,0xm178,0v-4,-63,86,-62,87,-109v0,-15,-13,-26,-30,-26v-22,0,-30,17,-30,36r-24,0v0,-33,22,-55,55,-55v29,0,53,16,53,45v1,50,-76,56,-87,89r85,0r0,20r-109,0","w":300},"\u00b1":{"d":"17,-98r0,-24r79,0r0,-60r24,0r0,60r79,0r0,24r-79,0r0,61r-24,0r0,-61r-79,0xm17,0r0,-24r182,0r0,24r-182,0","w":216},"\u00de":{"d":"62,0r-34,0r0,-257r34,0r0,41r79,0v51,0,79,28,79,76v0,48,-28,76,-79,76r-79,0r0,64xm62,-187r0,94v55,0,129,9,123,-47v6,-55,-68,-47,-123,-47","w":233},"\u00bc":{"d":"260,-154r0,100r22,0r0,19r-22,0r0,35r-22,0r0,-35r-72,0r0,-20r76,-99r18,0xm238,-124v-20,22,-35,47,-54,70r54,0r0,-70xm54,10r157,-271r23,0r-157,271r-23,0xm79,-255r0,154r-25,0r0,-111r-41,0r0,-18v23,0,44,-5,48,-25r18,0","w":300},"\u00f7":{"d":"17,-79r0,-24r182,0r0,24r-182,0xm85,-165v0,-13,11,-23,23,-23v12,0,23,11,23,23v0,12,-11,23,-23,23v-13,0,-23,-11,-23,-23xm85,-17v0,-13,11,-23,23,-23v12,0,23,11,23,23v0,12,-11,23,-23,23v-13,0,-23,-11,-23,-23","w":216},"\u00a6":{"d":"28,32r0,-90r24,0r0,90r-24,0xm52,-238r0,90r-24,0r0,-90r24,0","w":79},"\u00b0":{"d":"20,-203v0,-29,23,-52,52,-52v29,0,52,23,52,52v0,29,-23,51,-52,51v-29,0,-52,-22,-52,-51xm72,-237v-46,0,-44,67,0,67v21,0,34,-16,34,-33v0,-17,-13,-34,-34,-34","w":144},"\u00fe":{"d":"168,-95v0,-35,-17,-68,-57,-68v-41,0,-57,35,-57,70v0,37,16,70,58,70v42,0,56,-36,56,-72xm55,-257r0,96v10,-21,34,-29,60,-29v57,0,86,44,86,97v0,53,-28,97,-85,97v-19,0,-47,-7,-61,-29r0,96r-31,0r0,-328r31,0","w":213},"\u00be":{"d":"266,-154r0,100r22,0r0,19r-22,0r0,35r-22,0r0,-35r-72,0r0,-20r76,-99r18,0xm190,-53r54,0r0,-69xm77,10r157,-271r23,0r-157,271r-23,0xm64,-172r0,-18v20,1,38,-3,38,-23v0,-14,-11,-22,-27,-22v-19,0,-29,13,-29,31r-25,0v2,-31,22,-51,54,-51v50,0,72,57,27,72v18,7,32,19,32,38v0,32,-29,47,-59,47v-32,0,-57,-18,-57,-51r24,0v0,20,12,31,33,31v18,0,34,-10,34,-26v-1,-24,-21,-30,-45,-28","w":300},"\u00b2":{"d":"5,-101v-4,-63,87,-61,87,-109v0,-15,-13,-25,-30,-25v-22,0,-30,16,-30,35r-24,0v0,-33,22,-55,55,-55v29,0,53,16,53,45v0,50,-75,56,-86,89r84,0r0,20r-109,0","w":119},"\u00ae":{"d":"9,-129v0,-76,61,-134,135,-134v73,0,135,58,135,134v0,77,-62,135,-135,135v-74,0,-135,-58,-135,-135xm33,-129v0,66,48,115,111,115v62,0,111,-49,111,-115v0,-64,-49,-114,-111,-114v-63,0,-111,50,-111,114xm92,-50r0,-157v52,0,116,-8,116,45v0,28,-19,39,-42,42r45,70r-26,0r-43,-68r-26,0r0,68r-24,0xm116,-188r0,50v30,-2,68,9,67,-25v-1,-33,-37,-24,-67,-25","w":288},"\u2212":{"d":"17,-79r0,-24r182,0r0,24r-182,0","w":216},"\u00f0":{"d":"13,-93v0,-68,83,-119,136,-69v-11,-25,-33,-46,-44,-54r-42,19r-13,-14r39,-19v-8,-6,-18,-13,-25,-17r25,-16v6,5,19,12,28,20r43,-20r12,13r-41,19v43,35,63,83,63,138v0,54,-32,97,-91,97v-59,0,-90,-43,-90,-97xm102,-155v-37,0,-57,25,-57,62v0,45,26,70,58,70v32,0,58,-25,58,-70v0,-33,-17,-62,-59,-62","w":206},"\u00d7":{"d":"43,-9r-17,-17r65,-65r-65,-65r17,-18r65,65r65,-65r17,18r-64,65r65,65r-17,17r-66,-65","w":216},"\u00b3":{"d":"48,-172r0,-18v20,1,38,-3,38,-23v0,-14,-12,-22,-28,-22v-19,0,-28,13,-28,31r-25,0v2,-31,21,-51,53,-51v50,0,73,57,28,72v18,7,31,19,31,38v0,32,-28,47,-58,47v-32,0,-58,-18,-58,-51r25,0v0,20,12,31,33,31v18,0,34,-10,34,-26v-1,-24,-21,-30,-45,-28","w":119},"\u00a9":{"d":"9,-129v0,-76,61,-134,135,-134v73,0,135,58,135,134v0,77,-62,135,-135,135v-74,0,-135,-58,-135,-135xm33,-129v0,66,48,115,111,115v62,0,111,-49,111,-115v0,-64,-49,-114,-111,-114v-63,0,-111,50,-111,114xm193,-103r23,0v-18,95,-154,59,-147,-26v-11,-88,134,-115,146,-27r-22,0v-19,-62,-107,-34,-100,27v-9,62,90,88,100,26","w":288},"\u00c1":{"d":"-3,0r101,-257r38,0r100,257r-38,0r-28,-77r-108,0r-29,77r-36,0xm117,-226v-17,38,-29,81,-45,120r87,0xm95,-275r31,-52r39,0r-47,52r-23,0","w":233},"\u00c2":{"d":"-3,0r101,-257r38,0r100,257r-38,0r-28,-77r-108,0r-29,77r-36,0xm117,-226v-17,38,-29,81,-45,120r87,0xm63,-275r37,-52r33,0r38,52r-31,0r-24,-35r-26,35r-27,0","w":233},"\u00c4":{"d":"-3,0r101,-257r38,0r100,257r-38,0r-28,-77r-108,0r-29,77r-36,0xm117,-226v-17,38,-29,81,-45,120r87,0xm134,-277r0,-37r33,0r0,37r-33,0xm67,-277r0,-37r32,0r0,37r-32,0","w":233},"\u00c0":{"d":"-3,0r101,-257r38,0r100,257r-38,0r-28,-77r-108,0r-29,77r-36,0xm117,-226v-17,38,-29,81,-45,120r87,0xm116,-275r-48,-52r40,0r31,52r-23,0","w":233},"\u00c5":{"d":"-3,0r101,-257r38,0r100,257r-38,0r-28,-77r-108,0r-29,77r-36,0xm117,-226v-17,38,-29,81,-45,120r87,0xm92,-302v0,14,11,24,25,24v14,0,24,-10,24,-24v0,-14,-10,-25,-24,-25v-14,0,-25,11,-25,25xm76,-302v0,-22,19,-41,41,-41v22,0,40,19,40,41v0,22,-18,41,-40,41v-22,0,-41,-19,-41,-41","w":233},"\u00c3":{"d":"-3,0r101,-257r38,0r100,257r-38,0r-28,-77r-108,0r-29,77r-36,0xm117,-226v-17,38,-29,81,-45,120r87,0xm94,-318v23,1,58,30,67,-2r18,0v-3,20,-12,42,-39,40v-12,0,-36,-14,-48,-14v-8,0,-18,6,-17,15r-19,0v6,-21,15,-39,38,-39","w":233},"\u00c7":{"d":"243,-180r-34,0v-7,-36,-36,-54,-72,-54v-61,0,-87,50,-87,104v0,59,25,107,87,107v45,0,71,-32,74,-74r35,0v-6,63,-46,102,-109,103v-3,5,-8,8,-10,14v17,-8,44,2,43,24v-3,36,-50,37,-78,25r6,-16v12,6,45,8,45,-7v0,-11,-22,-14,-32,-8v-12,-12,5,-22,11,-33v-72,-5,-107,-62,-107,-133v0,-75,43,-135,122,-135v54,0,98,28,106,83","w":259},"\u00c9":{"d":"28,0r0,-257r178,0r0,29r-144,0r0,81r134,0r0,29r-134,0r0,89r145,0r0,29r-179,0xm88,-275r31,-52r39,0r-47,52r-23,0","w":219},"\u00ca":{"d":"28,0r0,-257r178,0r0,29r-144,0r0,81r134,0r0,29r-134,0r0,89r145,0r0,29r-179,0xm56,-275r37,-52r34,0r37,52r-30,0r-25,-35r-25,35r-28,0","w":219},"\u00cb":{"d":"28,0r0,-257r178,0r0,29r-144,0r0,81r134,0r0,29r-134,0r0,89r145,0r0,29r-179,0xm128,-277r0,-37r32,0r0,37r-32,0xm60,-277r0,-37r33,0r0,37r-33,0","w":219},"\u00c8":{"d":"28,0r0,-257r178,0r0,29r-144,0r0,81r134,0r0,29r-134,0r0,89r145,0r0,29r-179,0xm109,-275r-47,-52r39,0r31,52r-23,0","w":219},"\u00cd":{"d":"30,0r0,-257r34,0r0,257r-34,0xm25,-275r31,-52r39,0r-47,52r-23,0","w":93},"\u00ce":{"d":"30,0r0,-257r34,0r0,257r-34,0xm-7,-275r37,-52r33,0r38,52r-30,0r-25,-35r-25,35r-28,0","w":93},"\u00cf":{"d":"30,0r0,-257r34,0r0,257r-34,0xm64,-277r0,-37r33,0r0,37r-33,0xm-3,-277r0,-37r32,0r0,37r-32,0","w":93},"\u00cc":{"d":"30,0r0,-257r34,0r0,257r-34,0xm46,-275r-47,-52r39,0r31,52r-23,0","w":93},"\u00d1":{"d":"28,0r0,-257r36,0r136,208r0,-208r33,0r0,257r-38,0r-135,-206r0,206r-32,0xm107,-318v24,0,58,30,67,-2r19,0v-4,20,-13,41,-40,40v-12,0,-36,-14,-48,-14v-8,0,-18,6,-17,15r-19,0v6,-21,15,-39,38,-39","w":259},"\u00d3":{"d":"14,-129v0,-70,41,-134,123,-134v82,0,123,64,123,134v0,70,-41,135,-123,135v-82,0,-123,-65,-123,-135xm137,-234v-121,1,-120,210,0,211v120,-1,120,-210,0,-211xm115,-275r31,-52r39,0r-47,52r-23,0","w":273},"\u00d4":{"d":"14,-129v0,-70,41,-134,123,-134v82,0,123,64,123,134v0,70,-41,135,-123,135v-82,0,-123,-65,-123,-135xm137,-234v-121,1,-120,210,0,211v120,-1,120,-210,0,-211xm83,-275r37,-52r33,0r38,52r-30,0r-25,-35r-25,35r-28,0","w":273},"\u00d6":{"d":"14,-129v0,-70,41,-134,123,-134v82,0,123,64,123,134v0,70,-41,135,-123,135v-82,0,-123,-65,-123,-135xm137,-234v-121,1,-120,210,0,211v120,-1,120,-210,0,-211xm154,-277r0,-37r33,0r0,37r-33,0xm87,-277r0,-37r32,0r0,37r-32,0","w":273},"\u00d2":{"d":"14,-129v0,-70,41,-134,123,-134v82,0,123,64,123,134v0,70,-41,135,-123,135v-82,0,-123,-65,-123,-135xm137,-234v-121,1,-120,210,0,211v120,-1,120,-210,0,-211xm136,-275r-47,-52r39,0r31,52r-23,0","w":273},"\u00d5":{"d":"14,-129v0,-70,41,-134,123,-134v82,0,123,64,123,134v0,70,-41,135,-123,135v-82,0,-123,-65,-123,-135xm137,-234v-121,1,-120,210,0,211v120,-1,120,-210,0,-211xm114,-318v23,1,58,30,67,-2r18,0v-3,20,-12,42,-39,40v-12,0,-36,-14,-48,-14v-8,0,-18,6,-17,15r-19,0v6,-21,15,-39,38,-39","w":273},"\u0160":{"d":"186,-69v0,-73,-165,-28,-165,-119v0,-52,46,-75,93,-75v53,0,93,24,95,81r-32,0v-4,-37,-29,-52,-64,-52v-29,0,-58,11,-58,44v0,32,42,36,83,45v41,9,82,24,82,74v0,55,-53,77,-100,77v-58,0,-107,-28,-107,-91r33,0v0,43,36,62,75,62v31,0,65,-9,65,-46xm171,-327r-37,52r-34,0r-37,-52r30,0r25,35r25,-35r28,0","w":233},"\u00da":{"d":"233,-257r0,164v0,65,-37,99,-101,99v-66,0,-105,-31,-105,-99r0,-164r34,0r0,164v0,45,26,70,71,70v101,0,58,-143,67,-234r34,0xm108,-275r31,-52r39,0r-47,52r-23,0","w":259},"\u00db":{"d":"233,-257r0,164v0,65,-37,99,-101,99v-66,0,-105,-31,-105,-99r0,-164r34,0r0,164v0,45,26,70,71,70v101,0,58,-143,67,-234r34,0xm76,-275r37,-52r34,0r37,52r-30,0r-25,-35r-25,35r-28,0","w":259},"\u00dc":{"d":"233,-257r0,164v0,65,-37,99,-101,99v-66,0,-105,-31,-105,-99r0,-164r34,0r0,164v0,45,26,70,71,70v101,0,58,-143,67,-234r34,0xm148,-277r0,-37r32,0r0,37r-32,0xm80,-277r0,-37r32,0r0,37r-32,0","w":259},"\u00d9":{"d":"233,-257r0,164v0,65,-37,99,-101,99v-66,0,-105,-31,-105,-99r0,-164r34,0r0,164v0,45,26,70,71,70v101,0,58,-143,67,-234r34,0xm129,-275r-47,-52r39,0r31,52r-23,0","w":259},"\u00dd":{"d":"233,-257r-99,152r0,105r-34,0r0,-105r-99,-152r40,0r77,122r76,-122r39,0xm95,-275r31,-52r39,0r-47,52r-23,0","w":233,"k":{"v":20,"A":27,"\u00c6":27,"\u00c1":27,"\u00c2":27,"\u00c4":27,"\u00c0":27,"\u00c5":27,"\u00c3":27,",":50,".":50,"e":40,"\u00e9":40,"\u00ea":40,"\u00eb":40,"\u00e8":40,"o":40,"\u00f8":40,"\u0153":40,"\u00f3":40,"\u00f4":40,"\u00f6":40,"\u00f2":40,"\u00f5":40,"q":33,"-":40,"a":33,"\u00e6":33,"\u00e1":33,"\u00e2":33,"\u00e4":33,"\u00e0":33,"\u00e5":33,"\u00e3":33,"u":27,"\u00fa":27,"\u00fb":27,"\u00fc":27,"\u00f9":27,":":33,";":33,"i":13,"\u0131":13,"\u00ed":13,"\u00ee":13,"\u00ef":13,"\u00ec":13,"p":27}},"\u0178":{"d":"233,-257r-99,152r0,105r-34,0r0,-105r-99,-152r40,0r77,122r76,-122r39,0xm134,-277r0,-37r33,0r0,37r-33,0xm67,-277r0,-37r32,0r0,37r-32,0","w":233,"k":{"v":20,"A":27,"\u00c6":27,"\u00c1":27,"\u00c2":27,"\u00c4":27,"\u00c0":27,"\u00c5":27,"\u00c3":27,",":50,".":50,"e":40,"\u00e9":40,"\u00ea":40,"\u00eb":40,"\u00e8":40,"o":40,"\u00f8":40,"\u0153":40,"\u00f3":40,"\u00f4":40,"\u00f6":40,"\u00f2":40,"\u00f5":40,"q":33,"-":40,"a":33,"\u00e6":33,"\u00e1":33,"\u00e2":33,"\u00e4":33,"\u00e0":33,"\u00e5":33,"\u00e3":33,"u":27,"\u00fa":27,"\u00fb":27,"\u00fc":27,"\u00f9":27,":":33,";":33,"i":13,"\u0131":13,"\u00ed":13,"\u00ee":13,"\u00ef":13,"\u00ec":13,"p":27}},"\u017d":{"d":"8,0r0,-29r160,-199r-148,0r0,-29r188,0r0,29r-159,199r163,0r0,29r-204,0xm164,-327r-37,52r-33,0r-38,-52r30,0r25,35r25,-35r28,0","w":219},"\u00e1":{"d":"138,-96v-25,17,-94,1,-93,46v0,20,17,27,36,27v55,0,60,-27,57,-73xm188,-24r0,23v-18,9,-51,7,-48,-23v-31,41,-126,42,-127,-24v0,-42,31,-51,63,-57v34,-6,63,-4,63,-27v0,-48,-90,-40,-88,4r-31,0v2,-46,38,-62,79,-62v33,0,70,7,70,51r0,95v-1,19,4,24,19,20xm75,-212r31,-51r39,0r-47,51r-23,0","w":193},"\u00e2":{"d":"138,-96v-25,17,-94,1,-93,46v0,20,17,27,36,27v55,0,60,-27,57,-73xm188,-24r0,23v-18,9,-51,7,-48,-23v-31,41,-126,42,-127,-24v0,-42,31,-51,63,-57v34,-6,63,-4,63,-27v0,-48,-90,-40,-88,4r-31,0v2,-46,38,-62,79,-62v33,0,70,7,70,51r0,95v-1,19,4,24,19,20xm43,-212r37,-51r33,0r38,51r-30,0r-25,-34r-25,34r-28,0","w":193},"\u00e4":{"d":"138,-96v-25,17,-94,1,-93,46v0,20,17,27,36,27v55,0,60,-27,57,-73xm188,-24r0,23v-18,9,-51,7,-48,-23v-31,41,-126,42,-127,-24v0,-42,31,-51,63,-57v34,-6,63,-4,63,-27v0,-48,-90,-40,-88,4r-31,0v2,-46,38,-62,79,-62v33,0,70,7,70,51r0,95v-1,19,4,24,19,20xm114,-213r0,-38r33,0r0,38r-33,0xm47,-213r0,-38r32,0r0,38r-32,0","w":193},"\u00e0":{"d":"138,-96v-25,17,-94,1,-93,46v0,20,17,27,36,27v55,0,60,-27,57,-73xm188,-24r0,23v-18,9,-51,7,-48,-23v-31,41,-126,42,-127,-24v0,-42,31,-51,63,-57v34,-6,63,-4,63,-27v0,-48,-90,-40,-88,4r-31,0v2,-46,38,-62,79,-62v33,0,70,7,70,51r0,95v-1,19,4,24,19,20xm96,-212r-47,-51r39,0r31,51r-23,0","w":193},"\u00e5":{"d":"138,-96v-25,17,-94,1,-93,46v0,20,17,27,36,27v55,0,60,-27,57,-73xm188,-24r0,23v-18,9,-51,7,-48,-23v-31,41,-126,42,-127,-24v0,-42,31,-51,63,-57v34,-6,63,-4,63,-27v0,-48,-90,-40,-88,4r-31,0v2,-46,38,-62,79,-62v33,0,70,7,70,51r0,95v-1,19,4,24,19,20xm72,-238v0,14,11,24,25,24v14,0,24,-10,24,-24v0,-14,-10,-25,-24,-25v-14,0,-25,11,-25,25xm56,-238v0,-22,19,-41,41,-41v22,0,41,19,41,41v0,22,-19,40,-41,40v-22,0,-41,-18,-41,-40","w":193},"\u00e3":{"d":"138,-96v-25,17,-94,1,-93,46v0,20,17,27,36,27v55,0,60,-27,57,-73xm188,-24r0,23v-18,9,-51,7,-48,-23v-31,41,-126,42,-127,-24v0,-42,31,-51,63,-57v34,-6,63,-4,63,-27v0,-48,-90,-40,-88,4r-31,0v2,-46,38,-62,79,-62v33,0,70,7,70,51r0,95v-1,19,4,24,19,20xm74,-255v23,0,58,31,67,-1r18,0v-3,20,-12,42,-39,40v-12,0,-36,-14,-48,-14v-8,0,-18,6,-17,15r-19,0v6,-21,15,-40,38,-40","w":193},"\u00e7":{"d":"181,-126r-32,0v-5,-23,-21,-37,-46,-37v-44,0,-58,34,-58,72v0,34,16,68,55,68v30,0,47,-17,51,-45r31,0v-6,44,-33,70,-77,72r-11,16v17,-8,43,2,42,24v-2,36,-49,37,-77,25r6,-16v12,6,43,9,44,-7v1,-11,-21,-14,-31,-8v-13,-13,7,-23,13,-34v-51,-4,-78,-43,-78,-95v0,-56,29,-99,88,-99v42,0,76,20,80,64","w":193},"\u00e9":{"d":"152,-59r30,0v-8,41,-38,63,-80,63v-59,0,-89,-41,-89,-98v0,-56,36,-96,87,-96v66,0,87,61,85,106r-140,0v-1,32,17,61,58,61v25,0,44,-12,49,-36xm45,-111r107,0v-1,-29,-23,-52,-53,-52v-32,0,-52,24,-54,52xm75,-212r31,-51r39,0r-47,51r-23,0","w":193},"\u00ea":{"d":"152,-59r30,0v-8,41,-38,63,-80,63v-59,0,-89,-41,-89,-98v0,-56,36,-96,87,-96v66,0,87,61,85,106r-140,0v-1,32,17,61,58,61v25,0,44,-12,49,-36xm45,-111r107,0v-1,-29,-23,-52,-53,-52v-32,0,-52,24,-54,52xm43,-212r37,-51r33,0r38,51r-30,0r-25,-34r-25,34r-28,0","w":193},"\u00eb":{"d":"152,-59r30,0v-8,41,-38,63,-80,63v-59,0,-89,-41,-89,-98v0,-56,36,-96,87,-96v66,0,87,61,85,106r-140,0v-1,32,17,61,58,61v25,0,44,-12,49,-36xm45,-111r107,0v-1,-29,-23,-52,-53,-52v-32,0,-52,24,-54,52xm114,-213r0,-38r33,0r0,38r-33,0xm47,-213r0,-38r32,0r0,38r-32,0","w":193},"\u00e8":{"d":"152,-59r30,0v-8,41,-38,63,-80,63v-59,0,-89,-41,-89,-98v0,-56,36,-96,87,-96v66,0,87,61,85,106r-140,0v-1,32,17,61,58,61v25,0,44,-12,49,-36xm45,-111r107,0v-1,-29,-23,-52,-53,-52v-32,0,-52,24,-54,52xm96,-212r-47,-51r39,0r31,51r-23,0","w":193},"\u00ed":{"d":"55,0r-30,0r0,-186r30,0r0,186xm18,-212r31,-51r39,0r-47,51r-23,0","w":79},"\u00ee":{"d":"55,0r-30,0r0,-186r30,0r0,186xm-14,-212r37,-51r34,0r37,51r-30,0r-25,-34r-25,34r-28,0","w":79},"\u00ef":{"d":"55,0r-30,0r0,-186r30,0r0,186xm58,-213r0,-38r32,0r0,38r-32,0xm-10,-213r0,-38r32,0r0,38r-32,0","w":79},"\u00ec":{"d":"55,0r-30,0r0,-186r30,0r0,186xm39,-212r-47,-51r39,0r31,51r-23,0","w":79},"\u00f1":{"d":"23,0r0,-186r29,0v1,9,-2,22,1,29v13,-23,33,-33,60,-33v94,-2,56,109,64,190r-30,0r0,-126v0,-23,-15,-37,-38,-37v-76,-1,-51,94,-55,163r-31,0xm77,-255v23,0,58,32,67,-1r19,0v-3,20,-13,42,-40,40v-12,0,-36,-14,-48,-14v-8,0,-18,6,-17,15r-19,0v6,-21,15,-40,38,-40"},"\u00f3":{"d":"13,-93v0,-55,31,-97,90,-97v59,0,91,42,91,97v0,54,-32,97,-91,97v-59,0,-90,-43,-90,-97xm45,-93v0,45,26,70,58,70v32,0,58,-25,58,-70v0,-45,-26,-70,-58,-70v-32,0,-58,25,-58,70xm81,-212r31,-51r40,0r-48,51r-23,0","w":206},"\u00f4":{"d":"13,-93v0,-55,31,-97,90,-97v59,0,91,42,91,97v0,54,-32,97,-91,97v-59,0,-90,-43,-90,-97xm45,-93v0,45,26,70,58,70v32,0,58,-25,58,-70v0,-45,-26,-70,-58,-70v-32,0,-58,25,-58,70xm49,-212r37,-51r34,0r37,51r-30,0r-25,-34r-25,34r-28,0","w":206},"\u00f6":{"d":"13,-93v0,-55,31,-97,90,-97v59,0,91,42,91,97v0,54,-32,97,-91,97v-59,0,-90,-43,-90,-97xm45,-93v0,45,26,70,58,70v32,0,58,-25,58,-70v0,-45,-26,-70,-58,-70v-32,0,-58,25,-58,70xm121,-213r0,-38r32,0r0,38r-32,0xm53,-213r0,-38r33,0r0,38r-33,0","w":206},"\u00f2":{"d":"13,-93v0,-55,31,-97,90,-97v59,0,91,42,91,97v0,54,-32,97,-91,97v-59,0,-90,-43,-90,-97xm45,-93v0,45,26,70,58,70v32,0,58,-25,58,-70v0,-45,-26,-70,-58,-70v-32,0,-58,25,-58,70xm102,-212r-47,-51r39,0r31,51r-23,0","w":206},"\u00f5":{"d":"13,-93v0,-55,31,-97,90,-97v59,0,91,42,91,97v0,54,-32,97,-91,97v-59,0,-90,-43,-90,-97xm45,-93v0,45,26,70,58,70v32,0,58,-25,58,-70v0,-45,-26,-70,-58,-70v-32,0,-58,25,-58,70xm80,-255v23,1,58,32,67,-1r19,0v-3,20,-13,42,-40,40v-12,0,-36,-14,-48,-14v-8,0,-18,6,-17,15r-19,0v6,-21,15,-40,38,-40","w":206},"\u0161":{"d":"48,-140v10,47,121,19,121,86v0,44,-41,58,-79,58v-42,0,-77,-17,-79,-63r31,0v1,27,25,36,50,36v19,0,45,-4,45,-27v0,-50,-122,-19,-122,-88v0,-37,38,-52,70,-52v41,0,73,13,76,58r-31,0v-2,-24,-23,-31,-43,-31v-18,0,-39,4,-39,23xm144,-263r-37,51r-34,0r-37,-51r30,0r25,34r25,-34r28,0","w":180},"\u00fa":{"d":"177,-186r0,186r-29,0r0,-30v-13,23,-34,34,-61,34v-94,2,-56,-109,-64,-190r31,0r0,126v0,23,14,37,37,37v77,1,52,-93,56,-163r30,0xm78,-212r31,-51r39,0r-47,51r-23,0"},"\u00fb":{"d":"177,-186r0,186r-29,0r0,-30v-13,23,-34,34,-61,34v-94,2,-56,-109,-64,-190r31,0r0,126v0,23,14,37,37,37v77,1,52,-93,56,-163r30,0xm46,-212r37,-51r34,0r37,51r-30,0r-25,-34r-25,34r-28,0"},"\u00fc":{"d":"177,-186r0,186r-29,0r0,-30v-13,23,-34,34,-61,34v-94,2,-56,-109,-64,-190r31,0r0,126v0,23,14,37,37,37v77,1,52,-93,56,-163r30,0xm118,-213r0,-38r32,0r0,38r-32,0xm50,-213r0,-38r32,0r0,38r-32,0"},"\u00f9":{"d":"177,-186r0,186r-29,0r0,-30v-13,23,-34,34,-61,34v-94,2,-56,-109,-64,-190r31,0r0,126v0,23,14,37,37,37v77,1,52,-93,56,-163r30,0xm99,-212r-47,-51r39,0r31,51r-23,0"},"\u00fd":{"d":"177,-186r-81,211v-17,44,-35,58,-75,46r0,-28v17,8,36,6,43,-12r13,-32r-74,-185r34,0r56,152r52,-152r32,0xm68,-212r31,-51r39,0r-47,51r-23,0","w":180,"k":{",":27,".":27}},"\u00ff":{"d":"177,-186r-81,211v-17,44,-35,58,-75,46r0,-28v17,8,36,6,43,-12r13,-32r-74,-185r34,0r56,152r52,-152r32,0xm108,-213r0,-38r32,0r0,38r-32,0xm40,-213r0,-38r32,0r0,38r-32,0","w":180,"k":{",":27,".":27}},"\u017e":{"d":"8,0r0,-23r112,-136r-105,0r0,-27r145,0r0,21r-114,138r119,0r0,27r-157,0xm140,-263r-37,51r-33,0r-38,-51r31,0r24,34r26,-34r27,0","w":172},"\u2206":{"d":"11,0r0,-19r89,-238r34,0r88,238r0,19r-211,0xm40,-23r151,0r-74,-201r-2,0","w":232},"\u2126":{"d":"71,-24v-25,-22,-49,-61,-49,-111v0,-69,46,-119,108,-119v65,0,106,57,106,118v0,51,-25,91,-49,112r54,0r0,24r-87,0r0,-17v27,-18,53,-57,53,-114v0,-47,-26,-99,-77,-99v-48,0,-79,44,-79,100v0,53,26,96,53,113r0,17r-87,0r0,-24r54,0","w":258},"\u03bc":{"d":"177,-186r0,186r-29,0r0,-30v-14,32,-68,47,-94,21r0,80r-31,0r0,-257r31,0r0,126v0,23,14,37,37,37v77,1,52,-93,56,-163r30,0"},"\u03c0":{"d":"197,-162r-29,0v1,48,-4,127,5,162r-28,0v-11,-31,-4,-116,-6,-162r-63,0v-2,46,-13,128,-26,162r-29,0v14,-39,24,-115,26,-162v-22,0,-31,2,-39,5r-5,-19v41,-19,136,-7,196,-10","w":206},"\u20ac":{"d":"33,-162v8,-81,97,-130,168,-76r-17,30v-46,-54,-114,-9,-116,46r102,0r-10,22r-94,0v-1,7,-1,13,0,19r89,0r-9,22r-79,0v5,80,81,98,124,51r0,38v-72,40,-152,3,-159,-89r-27,0r9,-22r17,0r0,-19r-26,0r9,-22r19,0"},"\u2113":{"d":"154,-55r13,12v-16,31,-40,46,-68,46v-42,-1,-59,-32,-60,-70v-6,5,-13,11,-20,16r-9,-16r29,-25r0,-97v0,-65,28,-87,56,-87v31,0,45,27,45,59v0,45,-29,87,-74,131v-1,38,15,66,39,66v22,0,40,-19,49,-35xm95,-254v-35,0,-29,94,-29,140v31,-33,55,-69,55,-103v0,-22,-8,-37,-26,-37","w":175},"\u212e":{"d":"301,-122r-236,2v2,26,-4,58,3,79v46,51,139,49,181,-5r21,0v-26,30,-68,50,-114,50v-80,0,-144,-58,-144,-129v0,-72,64,-130,144,-130v81,1,146,58,145,133xm246,-129v1,-24,4,-60,-2,-82v-45,-47,-132,-47,-176,1v-6,20,-4,59,-1,81r179,0","w":312},"\u2202":{"d":"37,-240r-10,-21v68,-47,152,-8,152,116v0,84,-32,148,-94,148v-47,0,-70,-43,-70,-83v0,-56,36,-92,76,-92v34,0,52,25,60,34v8,-92,-53,-149,-114,-102xm87,-21v33,0,56,-43,61,-89v-5,-15,-25,-38,-52,-38v-29,0,-52,31,-52,68v0,34,17,59,43,59","w":197},"\u220f":{"d":"243,-224r-40,0r0,259r-28,0r0,-259r-98,0r0,259r-29,0r0,-259r-39,0r0,-26r234,0r0,26","w":252},"\u2211":{"d":"191,35r-183,0r0,-20r96,-122r-92,-123r0,-20r173,0r0,25r-133,1r85,112r-92,120r146,0r0,27","w":199},"\u2219":{"d":"27,-112v0,-13,11,-23,23,-23v12,0,23,11,23,23v0,12,-11,23,-23,23v-13,0,-23,-11,-23,-23","w":100},"\u221a":{"d":"207,-297r-80,350r-25,0r-57,-165r-27,10r-6,-17r50,-20r52,158r71,-316r22,0","w":206},"\u221e":{"d":"261,-104v0,35,-27,58,-55,58v-22,0,-41,-14,-66,-43v-19,22,-39,43,-68,43v-29,0,-54,-24,-54,-56v0,-33,25,-57,57,-57v27,0,47,19,66,42v18,-20,36,-42,67,-42v31,0,53,22,53,55xm75,-64v23,0,40,-22,55,-38v-16,-20,-32,-41,-58,-41v-23,0,-35,19,-35,41v0,21,16,38,38,38xm206,-143v-24,0,-44,27,-56,40v23,26,38,39,57,39v23,0,35,-20,35,-38v0,-25,-15,-41,-36,-41","w":278},"\u222b":{"d":"50,-215v0,-64,22,-102,73,-86r-4,20v-35,-13,-43,20,-43,68v0,57,5,121,5,180v0,68,-22,103,-76,85r5,-21v34,13,46,-12,45,-64v0,-59,-5,-125,-5,-182","w":129},"\u2248":{"d":"66,-156v44,0,81,55,108,1r11,10v-10,19,-24,34,-46,34v-25,0,-50,-27,-76,-27v-17,0,-26,13,-35,27r-12,-10v11,-21,29,-35,50,-35xm66,-94v45,0,81,55,108,1r11,10v-10,19,-24,34,-46,34v-24,0,-49,-26,-75,-27v-17,0,-27,13,-36,27r-12,-10v11,-21,29,-35,50,-35","w":201},"\u2260":{"d":"144,-181r-16,35r56,0r0,18r-63,0r-25,52r88,0r0,19r-95,0r-19,42r-15,-7r17,-35r-54,0r0,-19r61,0r24,-52r-85,0r0,-18r92,0r19,-42","w":201},"\u2264":{"d":"183,-35r-163,-80r0,-20r163,-80r0,22r-143,68r143,69r0,21xm184,-1r-166,0r0,-19r166,0r0,19","w":201},"\u2265":{"d":"21,-215r162,80r0,20r-162,80r0,-21r142,-69r-142,-68r0,-22xm183,-1r-164,0r0,-19r164,0r0,19","w":201},"\u25ca":{"d":"187,-125r-73,142r-23,0r-72,-142r73,-141r23,0xm161,-124v-19,-40,-42,-75,-58,-118v-17,40,-39,77,-58,116r59,119v14,-43,39,-77,57,-117","w":206},"\u00a0":{"w":100},"\u00ad":{"d":"18,-86r0,-28r104,0r0,28r-104,0","w":140},"\u02c9":{"d":"-21,-223r0,-20r123,0r0,20r-123,0","w":79},"\u03a9":{"d":"71,-24v-25,-22,-49,-61,-49,-111v0,-69,46,-119,108,-119v65,0,106,57,106,118v0,51,-25,91,-49,112r54,0r0,24r-87,0r0,-17v27,-18,53,-57,53,-114v0,-47,-26,-99,-77,-99v-48,0,-79,44,-79,100v0,53,26,96,53,113r0,17r-87,0r0,-24r54,0","w":258},"\u2215":{"d":"-60,10r157,-271r23,0r-157,271r-23,0","w":60},"\u2010":{"d":"18,-86r0,-28r104,0r0,28r-104,0","w":140}}});
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright ? 1985, 1987, 1989, 1990, 1997, 1998, 1999, 2002 Adobe Systems
 * Incorporated.  All Rights Reserved. ? 1981, 1999, 2002 Heidelberger
 * Druckmaschinen AG. All rights reserved.
 * 
 * Trademark:
 * Helvetica is a trademark of Heidelberger Druckmaschinen AG, exclusively
 * licensed through Linotype Library GmbH, and may be registered in certain
 * jurisdictions.
 * 
 * Full name:
 * HelveticaLTStd-Roman
 * 
 * Designer:
 * Max Miedinger
 * 
 * Vendor URL:
 * http://www.adobe.com/type
 * 
 * License information:
 * http://www.adobe.com/type/legal.html
 */
Cufon.registerFont({"w":200,"face":{"font-family":"Helvetica LT Std","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"2 11 5 4 2 2 2 2 2 4","ascent":"258","descent":"-102","x-height":"5","bbox":"-60 -335 360 80.7468","underline-thickness":"18","underline-position":"-18","stemh":"27","stemv":"32","unicode-range":"U+0020-U+FB02"},"glyphs":{" ":{"w":100,"k":{"\u040e":18,"\u0427":18,"\u0423":18,"\u0422":36,"\u0410":18,"\u0178":32,"\u00dd":32,"\u201c":11,"\u2018":22,"Y":32,"T":18,"V":18,"W":14,"A":18,"\u00c6":18,"\u00c1":18,"\u00c2":18,"\u00c4":18,"\u00c0":18,"\u00c5":18,"\u00c3":18}},"!":{"d":"67,-37r0,37r-35,0r0,-37r35,0xm59,-62r-18,0r-9,-111r0,-85r35,0v2,70,-3,133,-8,196","w":100},"\"":{"d":"25,-167r0,-91r26,0r0,91r-26,0xm76,-167r0,-91r27,0r0,91r-27,0","w":127},"#":{"d":"140,-76r-11,76r-24,0r11,-76r-45,0r-11,76r-23,0r10,-76r-37,0r3,-22r37,0r7,-51r-37,0r3,-23r37,0r11,-76r24,0r-10,76r44,0r11,-76r24,0r-11,76r37,0r-3,23r-37,0r-7,51r37,0r-3,22r-37,0xm126,-149r-45,0r-7,51r45,0"},"$":{"d":"91,-147r0,-83v-28,0,-43,20,-43,42v0,26,21,37,43,41xm108,-111r0,92v57,2,61,-74,19,-86xm181,-188r-31,0v-3,-19,-9,-36,-42,-42r0,86v49,14,79,23,79,73v0,61,-49,78,-79,78r0,34r-17,0r0,-34v-45,-3,-79,-22,-79,-84r31,0v2,39,12,52,48,58r0,-96v-37,-9,-74,-21,-74,-71v0,-39,31,-70,74,-70r0,-23r17,0r0,23v23,2,71,10,73,68"},"%":{"d":"14,-189v0,-34,28,-61,62,-61v33,0,61,27,61,61v0,34,-27,61,-61,61v-34,0,-62,-26,-62,-61xm39,-189v0,22,17,36,36,36v21,0,37,-16,37,-36v0,-20,-16,-36,-36,-36v-21,0,-37,17,-37,36xm183,-59v0,-34,28,-61,62,-61v33,0,61,27,61,61v0,34,-27,62,-61,62v-34,0,-62,-27,-62,-62xm208,-59v0,22,17,36,36,36v21,0,37,-16,37,-36v0,-20,-16,-36,-36,-36v-21,0,-37,17,-37,36xm241,-253r-143,260r-19,0r142,-260r20,0","w":320},"&":{"d":"150,-51r-58,-71v-28,18,-44,29,-44,57v0,61,77,51,102,14xm103,-158v14,-9,32,-23,32,-45v0,-23,-17,-28,-27,-28v-56,0,-24,56,-5,73xm186,-56r46,56r-41,0r-24,-30v-18,20,-37,35,-75,35v-64,0,-76,-47,-76,-67v0,-35,10,-55,58,-82v-44,-41,-35,-114,34,-114v41,0,58,27,58,53v0,36,-27,54,-46,67r47,57v6,-16,7,-22,10,-41r30,0v-1,18,-8,42,-21,66","w":240},"\u2019":{"d":"19,-220r0,-38r38,0v1,45,3,82,-38,91r0,-17v19,-3,19,-24,19,-36r-19,0","w":79,"k":{"\u0161":18,"s":18,".":81,",":81,"\u2019":21," ":25,"d":18,"\u0131":18,"O":18,"\u00d8":18,"\u0152":18,"\u00d3":18,"\u00d4":18,"\u00d6":18,"\u00d2":18,"\u00d5":18,"A":72,"\u00c6":72,"\u00c1":72,"\u00c2":72,"\u00c4":72,"\u00c0":72,"\u00c5":72,"\u00c3":72,"t":7,"r":18}},"(":{"d":"85,-264r22,0v-31,58,-49,93,-49,179v0,59,21,103,50,160r-22,0v-79,-101,-83,-235,-1,-339","w":119},")":{"d":"35,75r-22,0v31,-58,49,-93,49,-179v0,-59,-21,-103,-50,-160r21,0v79,101,83,235,2,339","w":119},"*":{"d":"14,-213r7,-20r38,14r0,-39r22,0r0,39r37,-14r8,20r-39,12r24,34r-18,12r-23,-34r-24,34r-17,-12r24,-34","w":140},"+":{"d":"92,-104r0,-78r26,0r0,78r78,0r0,26r-78,0r0,78r-26,0r0,-78r-78,0r0,-26r78,0","w":210},",":{"d":"31,0r0,-38r38,0r0,35v0,49,-31,55,-38,56r0,-17v15,-1,19,-19,19,-36r-19,0","w":100,"k":{"\u201d":36,"\u201c":81,"\u2018":81,"\u2019":36}},"-":{"d":"104,-116r0,32r-88,0r0,-32r88,0","w":119},".":{"d":"69,-38r0,38r-38,0r0,-38r38,0","w":100,"k":{"\u201d":36,"\u201c":81,"\u2018":81,"\u2019":36," ":22}},"\/":{"d":"106,-265r-88,272r-24,0r88,-272r24,0","w":100},"0":{"d":"153,-123v0,-63,-17,-102,-53,-102v-36,0,-53,39,-53,102v0,63,17,101,53,101v36,0,53,-38,53,-101xm187,-123v0,53,-14,130,-87,130v-73,0,-87,-77,-87,-130v0,-53,14,-130,87,-130v73,0,87,77,87,130","k":{"1":27}},"1":{"d":"129,-253r0,253r-34,0r0,-180r-59,0r0,-25v41,-3,58,-7,68,-48r25,0","k":{"9":14,"8":14,"7":14,"6":14,"5":14,"4":14,"3":14,"2":14,"1":41,"0":20,".":54,"-":41}},"2":{"d":"48,-162r-32,0v0,-82,60,-91,87,-91v44,0,80,29,80,76v0,78,-129,91,-138,147r138,0r0,30r-174,0v1,-71,48,-93,93,-120v27,-15,47,-26,47,-59v0,-20,-13,-46,-50,-46v-48,0,-50,45,-51,63"},"3":{"d":"81,-117r0,-27v33,4,63,-3,64,-41v0,-15,-8,-40,-46,-40v-45,0,-49,37,-50,55r-31,0v0,-37,15,-83,82,-83v49,0,78,28,78,67v0,32,-18,48,-32,52v24,8,42,25,42,59v0,41,-27,82,-91,82v-55,0,-85,-38,-85,-84r33,0v1,24,7,55,54,55v32,0,55,-20,55,-49v0,-48,-40,-46,-73,-46"},"4":{"d":"188,-62r-37,0r0,62r-31,0r0,-62r-111,0r0,-31r116,-160r26,0r0,164r37,0r0,27xm120,-204v-29,36,-54,77,-82,115r82,0r0,-115"},"5":{"d":"64,-217r-11,70v46,-35,132,-8,132,65v0,28,-13,89,-92,89v-33,0,-75,-13,-81,-70r32,0v3,30,26,42,54,42v33,0,53,-25,53,-57v2,-60,-74,-75,-103,-33r-27,-1r19,-136r131,0r0,31r-107,0"},"6":{"d":"186,-81v-2,50,-25,88,-88,88v-19,0,-50,-7,-65,-37v-38,-74,-32,-223,74,-223v29,0,71,16,74,67r-31,0v-4,-22,-16,-39,-43,-39v-50,0,-63,69,-60,95v27,-48,142,-44,139,49xm51,-78v0,27,16,56,53,56v30,0,50,-24,50,-58v0,-22,-12,-53,-51,-53v-35,0,-52,25,-52,55"},"7":{"d":"13,-217r0,-31r175,0r0,28v-25,26,-86,107,-104,220r-35,0v9,-69,55,-160,104,-217r-140,0","k":{"6":14,"4":34,".":68,"-":49,",":68}},"8":{"d":"99,-253v90,-5,94,98,46,118v34,14,41,43,41,62v0,64,-88,111,-146,60v-50,-44,-30,-100,17,-121v-58,-26,-47,-115,42,-119xm100,-119v-36,0,-52,24,-52,47v0,20,10,50,54,50v23,0,50,-7,50,-47v0,-34,-23,-50,-52,-50xm99,-146v52,-1,69,-79,-2,-79v-34,0,-42,24,-42,40v0,24,21,39,44,39"},"9":{"d":"153,-114v-34,52,-138,29,-138,-52v0,-46,28,-87,81,-87v81,0,89,76,89,117v0,27,-5,143,-92,143v-59,0,-75,-44,-75,-68r32,0v2,26,17,42,43,42v35,0,52,-29,60,-95xm99,-113v17,0,49,-8,49,-58v0,-29,-15,-54,-51,-54v-30,0,-49,23,-49,57v0,49,30,55,51,55"},":":{"d":"69,-38r0,38r-38,0r0,-38r38,0xm69,-186r0,38r-38,0r0,-38r38,0","w":100,"k":{" ":18}},";":{"d":"31,0r0,-38r38,0r0,35v0,49,-31,55,-38,56r0,-17v15,-1,19,-19,19,-36r-19,0xm69,-148r-38,0r0,-38r38,0r0,38","w":100,"k":{" ":18}},"<":{"d":"193,-33r0,29r-176,-74r0,-26r176,-74r0,29r-140,58","w":210},"=":{"d":"196,-140r0,26r-182,0r0,-26r182,0xm196,-68r0,27r-182,0r0,-27r182,0","w":210},">":{"d":"17,-149r0,-29r176,74r0,26r-176,74r0,-29r141,-58","w":210},"?":{"d":"80,-66v-12,-60,65,-82,63,-127v0,-15,-8,-41,-43,-41v-46,0,-48,42,-48,57r-32,0v-5,-40,33,-85,81,-85v40,0,76,25,76,71v0,48,-76,67,-65,125r-32,0xm114,-37r0,37r-34,0r0,-37r34,0"},"@":{"d":"220,-147v0,-18,-14,-33,-30,-33v-32,0,-54,40,-54,70v0,21,12,35,30,35v31,0,54,-43,54,-72xm231,-178r7,-22r25,0v-14,50,-33,107,-33,117v0,7,2,11,8,11v24,0,51,-39,51,-78v0,-58,-46,-93,-100,-93v-64,0,-110,51,-110,115v0,106,140,151,200,71r24,0v-23,39,-67,64,-113,64v-77,0,-137,-60,-137,-137v0,-75,62,-135,136,-135v67,0,123,46,123,112v0,65,-54,104,-86,104v-12,0,-23,-12,-23,-22v-28,39,-96,20,-96,-36v0,-67,83,-141,124,-71","w":365},"A":{"d":"172,-75r-104,0r-27,75r-36,0r97,-258r40,0r93,258r-38,0xm79,-106r80,0r-39,-114","w":240,"k":{"v":14,"w":14,"y":14,"\u00fd":14,"\u00ff":14,"c":7,"\u00e7":7,"C":11,"\u00c7":11,"d":7,"\u0131":7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"G":11,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"O":11,"\u00d8":11,"\u0152":11,"\u00d3":11,"\u00d4":11,"\u00d6":11,"\u00d2":11,"\u00d5":11,"q":7,"Q":11,"S":5,"\u0160":5,"T":43,"u":11,"\u00fa":11,"\u00fb":11,"\u00fc":11,"\u00f9":11,"U":18,"\u00da":18,"\u00db":18,"\u00dc":18,"\u00d9":18,"V":25,"W":18,"Y":36,"\u00dd":36,"\u0178":36,"\u00ab":36,"\u00bb":18,"-":14,"\u201c":61,"\u201d":61,"\u2018":61,"\u2019":61}},"B":{"d":"62,-229r0,80v51,-2,117,13,117,-42v0,-45,-69,-39,-117,-38xm27,0r0,-258r113,0v76,0,102,84,39,119v75,23,55,139,-41,139r-111,0xm62,-121r0,91v56,0,133,9,129,-47v-4,-60,-73,-41,-129,-44","w":240,"k":{"U":4,"\u00da":4,"\u00db":4,"\u00dc":4,"\u00d9":4,"V":20,"W":7,"Y":20,"\u00dd":20,"\u0178":20,",":7,".":7,"A":5,"\u00c6":5,"\u00c1":5,"\u00c2":5,"\u00c4":5,"\u00c0":5,"\u00c5":5,"\u00c3":5}},"C":{"d":"243,-181r-34,0v-10,-45,-48,-53,-73,-53v-47,0,-84,34,-84,102v0,61,22,108,86,108v23,0,61,-11,73,-71r34,0v-14,98,-94,102,-113,102v-59,0,-116,-39,-116,-138v0,-80,45,-134,120,-134v67,0,102,41,107,84","w":259,"k":{".":11,",":11,"y":9,"\u00fd":9,"\u00ff":9,"e":5,"\u00e9":5,"\u00ea":5,"\u00eb":5,"\u00e8":5,"o":5,"\u00f8":5,"\u0153":5,"\u00f3":5,"\u00f4":5,"\u00f6":5,"\u00f2":5,"\u00f5":5,"Y":14,"\u00dd":14,"\u0178":14,"A":14,"\u00c6":14,"\u00c1":14,"\u00c2":14,"\u00c4":14,"\u00c0":14,"\u00c5":14,"\u00c3":14,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9}},"D":{"d":"29,0r0,-258r105,0v67,0,109,50,109,125v0,58,-26,133,-111,133r-103,0xm64,-229r0,199r68,0v45,0,75,-36,75,-101v0,-94,-55,-105,-143,-98","w":259,"k":{"y":5,"\u00fd":5,"\u00ff":5,"u":5,"\u00fa":5,"\u00fb":5,"\u00fc":5,"\u00f9":5,"V":25,"W":14,"Y":32,"\u00dd":32,"\u0178":32,"\u2019":14,",":25,".":25,"A":14,"\u00c6":14,"\u00c1":14,"\u00c2":14,"\u00c4":14,"\u00c0":14,"\u00c5":14,"\u00c3":14,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9,"J":9}},"E":{"d":"222,-31r0,31r-191,0r0,-258r188,0r0,30r-153,0r0,80r141,0r0,31r-141,0r0,86r156,0","w":240,"k":{"G":9,"s":9,"\u0161":9}},"F":{"d":"66,-117r0,117r-35,0r0,-258r179,0r0,30r-144,0r0,80r127,0r0,31r-127,0","w":219,"k":{"\u00eb":11,"\u00e3":18,"\u00e0":18,"\u00e4":18,"e":11,"\u00e9":11,"\u00ea":11,"\u00e8":11,"o":11,"\u00f8":11,"\u0153":11,"\u00f3":11,"\u00f4":11,"\u00f6":11,"\u00f2":11,"\u00f5":11,"T":-7,"u":20,"\u00fa":20,"\u00fb":20,"\u00fc":20,"\u00f9":20,"-":14,",":54,".":54,"A":29,"\u00c6":29,"\u00c1":29,"\u00c2":29,"\u00c4":29,"\u00c0":29,"\u00c5":29,"\u00c3":29,"a":18,"\u00e6":18,"\u00e1":18,"\u00e2":18,"\u00e5":18,"J":72,"i":9,"\u00ed":9,"\u00ee":9,"\u00ef":9,"\u00ec":9,"r":16}},"G":{"d":"137,7v-92,0,-120,-87,-120,-138v0,-63,39,-134,123,-134v48,0,101,27,109,85r-34,0v-11,-45,-49,-54,-77,-54v-46,0,-85,36,-85,104v0,53,17,107,86,107v39,0,92,-40,82,-85r-81,0r0,-30r113,0r0,138r-22,0r-9,-33v-18,24,-50,40,-85,40","w":280,"k":{"A":7,"\u00c6":7,"\u00c1":7,"\u00c2":7,"\u00c4":7,"\u00c0":7,"\u00c5":7,"\u00c3":7}},"H":{"d":"198,-152r0,-106r35,0r0,258r-35,0r0,-121r-135,0r0,121r-35,0r0,-258r35,0r0,106r135,0","w":259,"k":{"\u00ab":18,"\u00bb":18}},"I":{"d":"68,-258r0,258r-35,0r0,-258r35,0","w":100,"k":{"T":7}},"J":{"d":"6,-83r33,0v-3,36,8,60,39,60v32,0,41,-20,41,-45r0,-190r35,0r0,188v0,60,-39,77,-74,77v-72,0,-76,-41,-74,-90","w":180,"k":{"e":4,"\u00e9":4,"\u00ea":4,"\u00eb":4,"\u00e8":4,"o":4,"\u00f8":4,"\u0153":4,"\u00f3":4,"\u00f4":4,"\u00f6":4,"\u00f2":4,"\u00f5":4,"u":7,"\u00fa":7,"\u00fb":7,"\u00fc":7,"\u00f9":7,",":11,".":11,"A":7,"\u00c6":7,"\u00c1":7,"\u00c2":7,"\u00c4":7,"\u00c0":7,"\u00c5":7,"\u00c3":7,"a":7,"\u00e6":7,"\u00e1":7,"\u00e2":7,"\u00e4":7,"\u00e0":7,"\u00e5":7,"\u00e3":7}},"K":{"d":"62,-91r0,91r-35,0r0,-258r35,0r0,125r126,-125r48,0r-108,104r111,154r-46,0r-90,-130","w":240,"k":{"w":20,"y":18,"\u00fd":18,"\u00ff":18,"e":14,"\u00e9":14,"\u00ea":14,"\u00eb":14,"\u00e8":14,"o":14,"\u00f8":14,"\u0153":14,"\u00f3":14,"\u00f4":14,"\u00f6":14,"\u00f2":14,"\u00f5":14,"O":18,"\u00d8":18,"\u0152":18,"\u00d3":18,"\u00d4":18,"\u00d6":18,"\u00d2":18,"\u00d5":18,"u":11,"\u00fa":11,"\u00fb":11,"\u00fc":11,"\u00f9":11,"A":-14,"\u00c6":-14,"\u00c1":-14,"\u00c2":-14,"\u00c4":-14,"\u00c0":-14,"\u00c5":-14,"\u00c3":-14,"a":7,"\u00e6":7,"\u00e1":7,"\u00e2":7,"\u00e4":7,"\u00e0":7,"\u00e5":7,"\u00e3":7}},"L":{"d":"62,-258r0,227r131,0r0,31r-166,0r0,-258r35,0","k":{"\u201d":50,"\u2019":58,"y":11,"\u00fd":11,"\u00ff":11,"O":11,"\u00d8":11,"\u0152":11,"\u00d3":11,"\u00d4":11,"\u00d6":11,"\u00d2":11,"\u00d5":11,"S":5,"\u0160":5,"T":40,"V":40,"W":25,"Y":50,"\u00dd":50,"\u0178":50,"-":25,"\u201c":90,"\u2018":72}},"M":{"d":"274,0r-34,0r0,-217r-73,217r-34,0r-74,-217r1,217r-34,0r0,-258r50,0r75,218r73,-218r50,0r0,258","w":299},"N":{"d":"198,-50r1,-208r34,0r0,258r-40,0r-132,-209r0,209r-34,0r0,-258r42,0","w":259},"O":{"d":"230,-129v0,-61,-34,-105,-90,-105v-56,0,-90,44,-90,105v0,61,34,105,90,105v56,0,90,-44,90,-105xm266,-129v0,56,-30,136,-126,136v-96,0,-126,-80,-126,-136v0,-56,30,-136,126,-136v96,0,126,80,126,136","w":280,"k":{".":14,",":14,"T":14,"V":18,"W":11,"Y":25,"\u00dd":25,"\u0178":25,"\u00ab":9,"\u00bb":9,"A":7,"\u00c6":7,"\u00c1":7,"\u00c2":7,"\u00c4":7,"\u00c0":7,"\u00c5":7,"\u00c3":7,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9,"X":22}},"P":{"d":"66,-229r0,90v55,-3,122,15,122,-46v0,-59,-68,-41,-122,-44xm66,-109r0,109r-35,0r0,-258r116,0v48,0,77,30,77,72v0,36,-21,77,-77,77r-81,0","w":240,"k":{"\u00e4":14,"e":18,"\u00e9":18,"\u00ea":18,"\u00eb":18,"\u00e8":18,"o":18,"\u00f8":18,"\u0153":18,"\u00f3":18,"\u00f4":18,"\u00f6":18,"\u00f2":18,"\u00f5":18,"u":14,"\u00fa":14,"\u00fb":14,"\u00fc":14,"\u00f9":14,"Y":18,"\u00dd":18,"\u0178":18,"-":20,",":65,".":65,"A":43,"\u00c6":43,"\u00c1":43,"\u00c2":43,"\u00c4":43,"\u00c0":43,"\u00c5":43,"\u00c3":43,"a":14,"\u00e6":14,"\u00e1":14,"\u00e2":14,"\u00e0":14,"\u00e5":14,"\u00e3":14,"r":20}},"Q":{"d":"151,-53r18,-22r33,26v54,-53,28,-185,-62,-185v-56,0,-90,44,-90,105v0,75,59,125,128,97xm264,-1r-18,21r-39,-30v-17,11,-40,17,-67,17v-96,0,-126,-80,-126,-136v0,-56,30,-136,126,-136v96,0,126,80,126,136v0,33,-10,73,-37,101","w":280,"k":{"U":4,"\u00da":4,"\u00db":4,"\u00dc":4,"\u00d9":4}},"R":{"d":"67,-111r0,111r-35,0r0,-258v88,6,204,-28,204,69v0,38,-19,52,-36,62v29,0,34,55,33,95v0,14,2,20,13,26r0,6r-43,0v-17,-52,20,-111,-52,-111r-84,0xm67,-229r0,88v57,-6,133,23,133,-44v0,-73,-74,-35,-133,-44","w":259,"k":{"y":5,"\u00fd":5,"\u00ff":5,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"O":7,"\u00d8":7,"\u0152":7,"\u00d3":7,"\u00d4":7,"\u00d6":7,"\u00d2":7,"\u00d5":7,"S":4,"\u0160":4,"T":11,"u":4,"\u00fa":4,"\u00fb":4,"\u00fc":4,"\u00f9":4,"U":14,"\u00da":14,"\u00db":14,"\u00dc":14,"\u00d9":14,"V":18,"W":11,"Y":18,"\u00dd":18,"\u0178":18,"\u2019":20,"a":4,"\u00e6":4,"\u00e1":4,"\u00e2":4,"\u00e4":4,"\u00e0":4,"\u00e5":4,"\u00e3":4}},"S":{"d":"216,-183r-33,0v-2,-40,-35,-52,-64,-52v-22,0,-59,6,-59,45v0,48,67,37,105,50v32,11,58,28,58,69v0,95,-142,89,-179,53v-21,-21,-26,-42,-26,-66r32,0v0,47,39,61,72,61v25,0,67,-7,67,-44v0,-43,-70,-47,-108,-58v-17,-5,-55,-15,-55,-60v0,-40,26,-80,89,-80v90,0,100,54,101,82","w":240,"k":{".":7,",":7,"v":9,"w":9,"y":9,"\u00fd":9,"\u00ff":9,"T":7,"V":18,"Y":14,"\u00dd":14,"\u0178":14,"A":9,"\u00c6":9,"\u00c1":9,"\u00c2":9,"\u00c4":9,"\u00c0":9,"\u00c5":9,"\u00c3":9,"a":5,"\u00e6":5,"\u00e1":5,"\u00e2":5,"\u00e4":5,"\u00e0":5,"\u00e5":5,"\u00e3":5}},"T":{"d":"5,-228r0,-30r210,0r0,30r-88,0r0,228r-34,0r0,-228r-88,0","w":219,"k":{"\u00ff":43,"\u00fc":43,"\u00f5":43,"\u00f2":43,"\u00f6":43,"\u00ec":7,"\u00ee":7,"\u00ed":7,"\u00e8":43,"\u00eb":43,"\u00ea":43,"\u00e3":43,"\u00e5":43,"\u00e0":43,"\u00e4":43,"\u00e2":43,"w":43,"y":43,"\u00fd":43,"e":43,"\u00e9":43,"o":43,"\u00f8":43,"\u0153":43,"\u00f3":43,"\u00f4":43,"O":14,"\u00d8":14,"\u0152":14,"\u00d3":14,"\u00d4":14,"\u00d6":14,"\u00d2":14,"\u00d5":14,"u":43,"\u00fa":43,"\u00fb":43,"\u00f9":43,"\u00ab":81,"\u00bb":81,"-":50,",":43,".":43,"A":43,"\u00c6":43,"\u00c1":43,"\u00c2":43,"\u00c4":43,"\u00c0":43,"\u00c5":43,"\u00c3":43,"a":43,"\u00e6":43,"\u00e1":43,"J":45,"i":7,"\u00ef":7,"r":43,":":7,";":7}},"U":{"d":"197,-258r35,0r0,167v0,53,-33,98,-104,98v-138,-1,-93,-144,-100,-265r35,0r0,162v0,56,35,72,66,72v32,0,68,-15,68,-71r0,-163","w":259,"k":{".":14,",":14,"A":14,"\u00c6":14,"\u00c1":14,"\u00c2":14,"\u00c4":14,"\u00c0":14,"\u00c5":14,"\u00c3":14}},"V":{"d":"120,-38r74,-220r39,0r-94,258r-37,0r-95,-258r39,0","w":240,"k":{"\u00f6":29,"\u00f4":29,"\u00ee":7,"\u00e8":29,"\u00eb":29,"\u00ea":29,"\u00e3":25,"\u00e5":25,"\u00e0":25,"\u00e4":25,"\u00e2":25,"C":20,"\u00c7":20,"e":29,"\u00e9":29,"G":14,"o":29,"\u00f8":29,"\u0153":29,"\u00f3":29,"\u00f2":29,"\u00f5":29,"O":14,"\u00d8":14,"\u0152":14,"\u00d3":14,"\u00d4":14,"\u00d6":14,"\u00d2":14,"\u00d5":14,"u":25,"\u00fa":25,"\u00fb":25,"\u00fc":25,"\u00f9":25,"\u00ab":54,"\u00bb":36,"-":29,",":45,".":45,"A":29,"\u00c6":29,"\u00c1":29,"\u00c2":29,"\u00c4":29,"\u00c0":29,"\u00c5":29,"\u00c3":29,"a":25,"\u00e6":25,"\u00e1":25,"i":7,"\u00ed":7,"\u00ef":7,"\u00ec":7,":":14,";":14}},"W":{"d":"110,0r-37,0r-67,-258r38,0r49,210r57,-210r39,0r58,210r49,-210r38,0r-68,258r-37,0r-59,-214","w":339,"k":{"\u00fc":11,"\u00f6":11,"\u00ea":11,"\u00e4":14,"y":7,"\u00fd":7,"\u00ff":7,"e":11,"\u00e9":11,"\u00eb":11,"\u00e8":11,"o":11,"\u00f8":11,"\u0153":11,"\u00f3":11,"\u00f4":11,"\u00f2":11,"\u00f5":11,"O":7,"\u00d8":7,"\u0152":7,"\u00d3":7,"\u00d4":7,"\u00d6":7,"\u00d2":7,"\u00d5":7,"u":11,"\u00fa":11,"\u00fb":11,"\u00f9":11,"Y":7,"\u00dd":7,"\u0178":7,"\u00ab":36,"\u00bb":27,"-":14,",":29,".":29,"A":18,"\u00c6":18,"\u00c1":18,"\u00c2":18,"\u00c4":18,"\u00c0":18,"\u00c5":18,"\u00c3":18,"a":14,"\u00e6":14,"\u00e1":14,"\u00e2":14,"\u00e0":14,"\u00e5":14,"\u00e3":14,"i":7,"\u00ed":7,"\u00ee":7,"\u00ef":7,"\u00ec":7,"r":20,":":27,";":27,"h":7}},"X":{"d":"143,-132r90,132r-43,0r-69,-106r-72,106r-42,0r92,-132r-86,-126r44,0r65,99r66,-99r41,0","w":240,"k":{"y":25,"\u00fd":25,"\u00ff":25,"C":20,"\u00c7":20,"e":14,"\u00e9":14,"\u00ea":14,"\u00eb":14,"\u00e8":14,"O":20,"\u00d8":20,"\u0152":20,"\u00d3":20,"\u00d4":20,"\u00d6":20,"\u00d2":20,"\u00d5":20}},"Y":{"d":"138,-104r0,104r-35,0r0,-104r-98,-154r41,0r74,124r74,-124r41,0","w":240,"k":{"\u00fc":40,"\u00f6":50,";":22,":":22,".":50,"-":50,",":50,"C":27,"\u00c7":27,"e":50,"\u00e9":50,"\u00ea":50,"\u00eb":50,"\u00e8":50,"o":50,"\u00f8":50,"\u0153":50,"\u00f3":50,"\u00f4":50,"\u00f2":50,"\u00f5":50,"O":31,"\u00d8":31,"\u0152":31,"\u00d3":31,"\u00d4":31,"\u00d6":31,"\u00d2":31,"\u00d5":31,"S":27,"\u0160":27,"u":40,"\u00fa":40,"\u00fb":40,"\u00f9":40,"\u00ab":90,"\u00bb":72,"A":40,"\u00c6":40,"\u00c1":40,"\u00c2":40,"\u00c4":40,"\u00c0":40,"\u00c5":40,"\u00c3":40,"a":50,"\u00e6":50,"\u00e1":50,"\u00e2":50,"\u00e4":50,"\u00e0":50,"\u00e5":50,"\u00e3":50,"i":7,"\u00ed":7,"\u00ee":7,"\u00ef":7,"\u00ec":7}},"Z":{"d":"212,-31r0,31r-204,0r0,-29r159,-199r-147,0r0,-30r192,0r0,30r-159,197r159,0","w":219},"[":{"d":"51,-234r0,279r39,0r0,26r-67,0r0,-331r67,0r0,26r-39,0","w":100},"\\":{"d":"82,7r-88,-272r24,0r88,272r-24,0","w":100},"]":{"d":"49,45r0,-279r-39,0r0,-26r67,0r0,331r-67,0r0,-26r39,0","w":100},"^":{"d":"174,-95r-28,0r-61,-124r-62,124r-28,0r77,-153r26,0","w":168},"_":{"d":"200,45r-200,0r0,-18r200,0r0,18"},"\u2018":{"d":"61,-207r0,38r-38,0v-1,-45,-3,-82,38,-92r0,17v-19,3,-19,25,-19,37r19,0","w":79,"k":{"\u2018":21,".":81,",":81,"A":63,"\u00c6":63,"\u00c1":63,"\u00c2":63,"\u00c4":63,"\u00c0":63,"\u00c5":63,"\u00c3":63}},"a":{"d":"51,-131r-29,0v1,-45,32,-63,78,-63v15,0,70,5,70,53r0,108v0,13,10,12,21,10r0,23v-23,11,-57,-5,-51,-25v-12,13,-31,30,-68,30v-35,0,-59,-22,-59,-54v0,-16,4,-53,57,-59v27,-9,67,10,69,-29v0,-20,-14,-30,-44,-30v-36,0,-42,22,-44,36xm138,-96v-4,13,-92,1,-92,42v0,21,10,33,34,33v43,-2,65,-27,58,-75"},"b":{"d":"51,0r-30,0r0,-258r32,0r0,93v45,-63,133,-16,133,65v0,45,-19,105,-83,105v-32,0,-46,-18,-52,-28r0,23xm153,-95v0,-24,-2,-70,-51,-70v-46,0,-51,49,-51,80v0,50,32,63,52,63v35,0,50,-32,50,-73","k":{"v":7,"y":7,"\u00fd":7,"\u00ff":7,"u":7,"\u00fa":7,"\u00fb":7,"\u00fc":7,"\u00f9":7,"b":4,"\u00fe":4,"l":7,"\u0142":7,",":14,".":14}},"c":{"d":"172,-125r-31,0v-4,-25,-18,-40,-45,-40v-39,0,-51,38,-51,71v0,32,7,72,51,72v21,0,40,-16,45,-45r31,0v-3,30,-22,72,-77,72v-53,0,-84,-40,-84,-94v0,-58,28,-105,90,-105v49,0,68,36,71,69","w":180,"k":{",":5,"y":4,"\u00fd":4,"\u00ff":4,"k":7}},"d":{"d":"180,-258r0,258r-30,0v-1,-8,2,-20,-1,-26v-14,26,-36,31,-54,31v-115,-3,-107,-201,-4,-199v34,0,48,21,56,32v3,-29,0,-65,1,-96r32,0xm45,-95v0,41,16,73,51,73v20,0,52,-13,52,-63v0,-31,-5,-80,-51,-80v-49,0,-52,46,-52,70"},"e":{"d":"183,-59v-5,22,-28,64,-84,64v-53,0,-85,-40,-85,-94v0,-58,29,-105,91,-105v54,0,81,43,81,110r-138,0v0,39,19,62,55,62v30,0,48,-23,49,-37r31,0xm48,-109r105,0v-2,-29,-14,-56,-53,-56v-29,0,-52,27,-52,56","k":{".":5,",":5,"v":11,"w":7,"y":7,"\u00fd":7,"\u00ff":7,"\u201c":18,"\u201d":18,"\u2019":18,"x":11}},"f":{"d":"94,-162r-31,0r0,162r-32,0r0,-162r-26,0r0,-26r26,0v-6,-51,10,-82,63,-73r0,28v-30,-8,-34,15,-31,45r31,0r0,26","w":100,"k":{"\u0131":10,"e":11,"\u00e9":11,"\u00ea":11,"\u00eb":11,"\u00e8":11,"o":11,"\u00f8":11,"\u0153":11,"\u00f3":11,"\u00f4":11,"\u00f6":11,"\u00f2":11,"\u00f5":11,"\u201d":-22,"\u2019":-18,"l":5,"\u0142":5,",":11,".":11,"a":11,"\u00e6":11,"\u00e1":11,"\u00e2":11,"\u00e4":11,"\u00e0":11,"\u00e5":11,"\u00e3":11,"f":14,"\u00df":14,"\ufb01":14,"\ufb02":14,"i":5,"\u00ed":5,"\u00ee":5,"\u00ef":5,"\u00ec":5,"t":14}},"g":{"d":"47,-95v0,41,16,73,51,73v20,0,51,-13,51,-63v0,-31,-4,-80,-50,-80v-49,0,-52,46,-52,70xm180,-188r0,173v0,27,-1,94,-88,94v-22,0,-66,-6,-72,-56r32,0v6,30,34,30,42,30v58,-2,56,-46,53,-74v-7,15,-25,26,-50,26v-115,0,-108,-199,-4,-199v35,0,47,22,57,32r0,-26r30,0","k":{",":7,".":7,"a":7,"\u00e6":7,"\u00e1":7,"\u00e2":7,"\u00e4":7,"\u00e0":7,"\u00e5":7,"\u00e3":7,"r":4}},"h":{"d":"177,-128r0,128r-32,0r0,-123v0,-26,-7,-42,-37,-42v-26,0,-53,14,-53,62r0,103r-32,0r0,-258r32,0r1,95v22,-40,121,-52,121,35","k":{"y":11,"\u00fd":11,"\u00ff":11,"\u2019":20}},"i":{"d":"56,-188r0,188r-32,0r0,-188r32,0xm56,-222r-32,0r0,-36r32,0r0,36","w":79},"j":{"d":"56,-188r0,216v0,16,-1,48,-48,48v-4,0,-9,0,-14,-1r0,-28v21,0,30,1,30,-23r0,-212r32,0xm56,-258r0,36r-32,0r0,-36r32,0","w":79},"k":{"d":"104,-118r76,118r-40,0r-59,-95r-26,24r0,71r-31,0r0,-258r31,0r0,149r81,-79r40,0","w":180,"k":{"y":-7,"\u00fd":-7,"\u00ff":-7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"a":7,"\u00e6":7,"\u00e1":7,"\u00e2":7,"\u00e4":7,"\u00e0":7,"\u00e5":7,"\u00e3":7}},"l":{"d":"56,-258r0,258r-32,0r0,-258r32,0","w":79,"k":{"v":7,"w":7,"y":7,"\u00fd":7,"\u00ff":7}},"m":{"d":"23,0r0,-188r30,0v1,8,-2,20,1,26v7,-10,23,-32,57,-32v34,0,45,21,50,31v31,-42,116,-54,116,33r0,130r-32,0r0,-122v0,-26,-8,-43,-35,-43v-66,0,-39,101,-44,165r-32,0r0,-130v0,-16,-6,-35,-29,-35v-18,0,-50,11,-50,62r0,103r-32,0","w":299,"k":{"y":5,"\u00fd":5,"\u00ff":5,"u":4,"\u00fa":4,"\u00fb":4,"\u00fc":4,"\u00f9":4}},"n":{"d":"177,-128r0,128r-32,0r0,-116v0,-33,-9,-49,-40,-49v-18,0,-50,11,-50,62r0,103r-32,0r0,-188r30,0v1,8,-2,20,1,26v7,-10,25,-32,57,-32v29,0,66,12,66,66","k":{"v":7,"w":7,"y":5,"\u00fd":5,"\u00ff":5,"u":4,"\u00fa":4,"\u00fb":4,"\u00fc":4,"\u00f9":4,"\u201d":20,"\u2019":20}},"o":{"d":"100,5v-118,-1,-116,-198,0,-199v118,1,118,198,0,199xm45,-94v0,25,10,72,55,72v45,0,55,-47,55,-72v0,-25,-10,-72,-55,-72v-45,0,-55,47,-55,72","k":{".":14,",":14,"v":5,"w":5,"y":11,"\u00fd":11,"\u00ff":11,"\u201c":11,"\u201d":11,"\u2019":11,"x":11}},"p":{"d":"51,-85v0,50,32,63,52,63v35,0,50,-32,50,-73v0,-24,-2,-70,-51,-70v-46,0,-51,49,-51,80xm21,75r0,-263r30,0r0,26v8,-11,23,-32,57,-32v50,0,78,41,78,94v0,45,-19,105,-83,105v-25,0,-42,-12,-50,-25r0,95r-32,0","k":{"y":11,"\u00fd":11,"\u00ff":11,",":13,".":13}},"q":{"d":"178,-188r0,263r-32,0r-1,-95v-8,13,-25,25,-50,25v-115,-3,-107,-199,-4,-199v35,0,47,22,57,32r0,-26r30,0xm148,-85v0,-31,-5,-80,-51,-80v-49,0,-52,46,-52,70v0,41,16,73,51,73v20,0,52,-13,52,-63"},"r":{"d":"120,-160v-85,-7,-56,90,-61,160r-31,0r0,-188r30,0r0,31v15,-24,32,-41,62,-36r0,33","w":119,"k":{"v":-11,"y":-11,"\u00fd":-11,"\u00ff":-11,"c":7,"\u00e7":7,"d":7,"\u0131":7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"q":7,"u":-5,"\u00fa":-5,"\u00fb":-5,"\u00fc":-5,"\u00f9":-5,"-":27,"\u2019":-7,"l":-5,"\u0142":-5,",":18,".":18,"k":-5,"a":4,"\u00e6":4,"\u00e1":4,"\u00e2":4,"\u00e4":4,"\u00e0":4,"\u00e5":4,"\u00e3":4,"s":7,"\u0161":7,"i":-5,"\u00ed":-5,"\u00ee":-5,"\u00ef":-5,"\u00ec":-5,"t":-14,"m":-9,"n":-9,"\u00f1":-9,"p":-11,":":-11,";":-11}},"s":{"d":"161,-135r-31,0v0,-12,-4,-31,-44,-31v-10,0,-38,3,-38,26v0,24,43,27,66,33v39,10,53,24,53,50v0,39,-32,62,-74,62v-75,0,-80,-42,-81,-65r30,0v1,15,5,38,50,38v23,0,43,-9,43,-30v0,-44,-117,-18,-117,-82v0,-41,34,-60,71,-60v67,0,72,50,72,59","w":180,"k":{".":5,",":5,"v":7,"w":11,"y":7,"\u00fd":7,"\u00ff":7,"\u2019":18}},"t":{"d":"93,-162r-31,0r0,122v3,20,16,14,31,15r0,25v-39,10,-62,-5,-62,-38r0,-124r-26,0r0,-26r26,0r0,-53r31,0r0,53r31,0r0,26","w":100,"k":{"w":-14,"y":-7,"\u00fd":-7,"\u00ff":-7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"a":4,"\u00e6":4,"\u00e1":4,"\u00e2":4,"\u00e4":4,"\u00e0":4,"\u00e5":4,"\u00e3":4,"t":14}},"u":{"d":"176,0r-30,0v-1,-9,2,-21,-1,-28v-23,48,-121,50,-121,-25r0,-135r32,0r0,125v0,31,16,41,37,41v76,0,44,-96,51,-166r32,0r0,188","k":{"\u2019":9}},"v":{"d":"143,-188r34,0r-72,188r-33,0r-69,-188r37,0r49,153","w":180,"k":{"c":7,"\u00e7":7,"e":9,"\u00e9":9,"\u00ea":9,"\u00eb":9,"\u00e8":9,"o":9,"\u00f8":9,"\u0153":9,"\u00f3":9,"\u00f4":9,"\u00f6":9,"\u00f2":9,"\u00f5":9,"-":14,",":29,".":29,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9}},"w":{"d":"130,-146v-15,46,-24,98,-38,146r-33,0r-54,-188r35,0r36,148r37,-148r35,0r37,148r39,-148r31,0r-54,188r-33,0","w":259,"k":{"c":7,"\u00e7":7,"d":7,"\u0131":7,"e":4,"\u00e9":4,"\u00ea":4,"\u00eb":4,"\u00e8":4,"o":4,"\u00f8":4,"\u0153":4,"\u00f3":4,"\u00f4":4,"\u00f6":4,"\u00f2":4,"\u00f5":4,"-":7,",":22,".":22,"a":5,"\u00e6":5,"\u00e1":5,"\u00e2":5,"\u00e4":5,"\u00e0":5,"\u00e5":5,"\u00e3":5}},"x":{"d":"110,-97r66,97r-40,0r-47,-71r-45,71r-40,0r66,-97r-63,-91r41,0r43,66r44,-66r39,0","w":180,"k":{"c":14,"\u00e7":14,"e":11,"\u00e9":11,"\u00ea":11,"\u00eb":11,"\u00e8":11,"o":14,"\u00f8":14,"\u0153":14,"\u00f3":14,"\u00f4":14,"\u00f6":14,"\u00f2":14,"\u00f5":14,"-":34,"a":7,"\u00e6":7,"\u00e1":7,"\u00e2":7,"\u00e4":7,"\u00e0":7,"\u00e5":7,"\u00e3":7}},"y":{"d":"90,-35v19,-49,33,-103,51,-153r35,0r-68,184v-33,83,-34,85,-87,78r0,-29v30,7,37,9,53,-40r-70,-193r36,0","w":180,"k":{".":36,",":36,"c":7,"\u00e7":7,"d":7,"\u0131":7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"-":14,"a":7,"\u00e6":7,"\u00e1":7,"\u00e2":7,"\u00e4":7,"\u00e0":7,"\u00e5":7,"\u00e3":7,"s":7,"\u0161":7}},"z":{"d":"166,-162r-113,136r116,0r0,26r-158,0r0,-25r114,-137r-105,0r0,-26r146,0r0,26","w":180,"k":{"e":5,"\u00e9":5,"\u00ea":5,"\u00eb":5,"\u00e8":5,"o":5,"\u00f8":5,"\u0153":5,"\u00f3":5,"\u00f4":5,"\u00f6":5,"\u00f2":5,"\u00f5":5}},"{":{"d":"15,-84r0,-22v35,-1,29,-66,29,-107v0,-40,23,-51,61,-47r0,23v-47,-10,-29,52,-32,91v-3,35,-25,49,-32,51v7,2,28,15,32,52v4,35,-19,98,32,90r0,24v-38,4,-59,-6,-61,-47v-2,-41,6,-107,-29,-108","w":120},"|":{"d":"34,7r0,-272r26,0r0,272r-26,0","w":93},"}":{"d":"105,-106r0,22v-35,0,-29,67,-29,108v0,40,-23,51,-61,47r0,-24v48,10,30,-51,33,-90v3,-37,24,-50,31,-52v-7,-2,-27,-16,-31,-51v-4,-36,19,-100,-33,-91r0,-23v38,-4,59,6,61,47v2,41,-7,106,29,107","w":120},"~":{"d":"67,-116v20,0,63,25,77,25v14,0,23,-13,31,-26r13,20v-11,17,-26,31,-45,31v-36,0,-90,-51,-108,1r-13,-20v8,-15,21,-31,45,-31","w":210},"\u00a1":{"d":"42,-152r0,-36r35,0r0,36r-35,0xm51,-127r18,0r8,112r0,85r-35,0v-2,-70,3,-134,9,-197","w":119},"\u00a2":{"d":"76,-28r39,-137v-40,-6,-64,18,-65,77v0,26,11,50,26,60xm183,-124r-29,0v-3,-12,-8,-31,-25,-37r-39,139v32,3,52,-1,64,-44r31,0v1,30,-41,87,-103,70r-11,37r-15,0r12,-41v-28,-13,-50,-42,-50,-88v0,-73,39,-114,104,-104r10,-32r14,0r-9,36v13,4,42,20,46,64"},"\u00a3":{"d":"73,-137r61,0r0,23r-50,0v10,41,-5,62,-40,91v37,-35,104,17,135,-12r15,23v-45,48,-112,-25,-163,16r-18,-25v46,-38,51,-55,37,-93r-38,0r0,-23r25,0v-30,-52,-22,-121,73,-121v56,0,80,39,78,82r-32,0v1,-33,-18,-55,-49,-55v-67,0,-60,49,-34,94"},"\u2044":{"d":"120,-253r-159,260r-21,0r159,-260r21,0","w":60},"\u00a5":{"d":"15,-118r0,-20r56,0r-70,-110r36,0r63,107r63,-107r36,0r-69,110r55,0r0,20r-69,0r0,31r69,0r0,20r-69,0r0,67r-32,0r0,-67r-69,0r0,-20r69,0r0,-31r-69,0"},"\u0192":{"d":"180,-260r-5,28v-43,-23,-53,29,-57,66r41,0r0,25r-46,0r-21,118v-17,83,-43,109,-96,93r5,-29v36,16,47,-10,56,-58r23,-124r-39,0r0,-25r44,0v6,-53,30,-117,95,-94"},"\u00a7":{"d":"166,-199r-31,0v-1,-12,-3,-39,-36,-39v-14,0,-33,7,-33,29v15,55,118,50,118,121v0,30,-19,46,-37,58v11,12,19,23,19,41v0,37,-34,58,-65,58v-40,0,-71,-20,-71,-68r32,0v0,12,2,40,34,40v13,0,38,-3,38,-29v0,-12,-8,-20,-20,-29v-32,-24,-99,-47,-99,-94v0,-31,15,-45,36,-57v-34,-37,-15,-97,48,-97v29,0,67,13,67,66xm154,-81v0,-44,-57,-50,-85,-73v-29,6,-28,58,-7,65r68,44v14,-9,24,-18,24,-36"},"\u00a4":{"d":"173,-217r17,17r-20,20v24,28,24,79,0,108r20,20r-16,16r-20,-21v-29,26,-79,27,-108,0r-19,21r-17,-16r20,-20v-24,-29,-24,-79,0,-108r-20,-20r17,-17r21,20v28,-24,76,-24,104,0xm38,-126v0,35,27,64,62,64v35,0,62,-29,62,-64v0,-34,-28,-64,-62,-64v-34,0,-62,30,-62,64"},"'":{"d":"21,-167r0,-91r27,0r0,91r-27,0","w":68},"\u201c":{"d":"111,-207r0,38r-38,0v-1,-45,-3,-82,38,-92r0,17v-19,3,-20,25,-20,37r20,0xm51,-207r0,38r-37,0v0,-45,-4,-83,37,-92r0,17v-19,3,-19,25,-19,37r19,0","w":119,"k":{".":108,",":108,"e":9,"\u00e9":9,"\u00ea":9,"\u00eb":9,"\u00e8":9,"o":9,"\u00f8":9,"\u0153":9,"\u00f3":9,"\u00f4":9,"\u00f6":9,"\u00f2":9,"\u00f5":9,"O":9,"\u00d8":9,"\u0152":9,"\u00d3":9,"\u00d4":9,"\u00d6":9,"\u00d2":9,"\u00d5":9,"A":63,"\u00c6":63,"\u00c1":63,"\u00c2":63,"\u00c4":63,"\u00c0":63,"\u00c5":63,"\u00c3":63}},"\u00ab":{"d":"91,-71r0,32r-56,-44r0,-33r56,-45r0,32r-37,29xm165,-71r0,32r-56,-44r0,-33r56,-45r0,32r-38,29","k":{".":36,",":36,"O":9,"\u00d8":9,"\u0152":9,"\u00d3":9,"\u00d4":9,"\u00d6":9,"\u00d2":9,"\u00d5":9,"T":81,"V":36,"W":27,"Y":72,"\u00dd":72,"\u0178":72,"A":18,"\u00c6":18,"\u00c1":18,"\u00c2":18,"\u00c4":18,"\u00c0":18,"\u00c5":18,"\u00c3":18,"H":18}},"\u2039":{"d":"88,-71r0,32r-56,-44r0,-33r56,-45r0,32r-38,29","w":119},"\u203a":{"d":"32,-39r0,-32r37,-29r-37,-29r0,-32r56,45r0,33","w":119},"\u2013":{"d":"200,-113r0,27r-200,0r0,-27r200,0"},"\u2020":{"d":"117,-155r0,212r-33,0r0,-212r-69,0r0,-28r69,0r0,-75r33,0r0,75r68,0r0,28r-68,0"},"\u2021":{"d":"117,-158r0,115r68,0r0,28r-68,0r0,72r-33,0r0,-72r-69,0r0,-28r69,0r0,-115r-69,0r0,-27r69,0r0,-73r33,0r0,73r68,0r0,27r-68,0"},"\u00b7":{"d":"50,-113v11,0,23,9,23,22v0,12,-10,23,-23,23v-12,0,-22,-11,-22,-23v0,-13,10,-22,22,-22","w":100},"\u00b6":{"d":"84,62r0,-186v-46,0,-78,-29,-78,-66v0,-80,94,-68,173,-68r0,320r-26,0r0,-299r-43,0r0,299r-26,0","w":193},"\u2022":{"d":"120,-129v0,31,-26,56,-57,56v-31,0,-57,-24,-57,-56v0,-31,25,-57,57,-57v31,0,57,26,57,57","w":126},"\u201a":{"d":"19,0r0,-38r38,0v1,45,3,82,-38,92r0,-17v19,-3,19,-25,19,-37r-19,0","w":79},"\u201e":{"d":"9,0r0,-38r38,0v1,45,3,82,-38,92r0,-17v19,-3,19,-25,19,-37r-19,0xm69,0r0,-38r37,0v0,45,4,83,-37,92r0,-17v19,-3,19,-25,19,-37r-19,0","w":119},"\u201d":{"d":"9,-220r0,-38r38,0v1,45,3,82,-38,91r0,-17v19,-3,19,-24,19,-36r-19,0xm69,-220r0,-38r37,0v0,45,4,82,-37,91r0,-17v19,-3,19,-24,19,-36r-19,0","w":119,"k":{".":108,",":108," ":14,"o":9,"\u00f8":9,"\u0153":9,"\u00f3":9,"\u00f4":9,"\u00f6":9,"\u00f2":9,"\u00f5":9,"O":18,"\u00d8":18,"\u0152":18,"\u00d3":18,"\u00d4":18,"\u00d6":18,"\u00d2":18,"\u00d5":18,"A":72,"\u00c6":72,"\u00c1":72,"\u00c2":72,"\u00c4":72,"\u00c0":72,"\u00c5":72,"\u00c3":72}},"\u00bb":{"d":"91,-83r-56,44r0,-32r38,-29r-38,-29r0,-32r56,45r0,33xm165,-83r-56,44r0,-32r38,-29r-38,-29r0,-32r56,45r0,33","k":{".":45,",":45,"O":9,"\u00d8":9,"\u0152":9,"\u00d3":9,"\u00d4":9,"\u00d6":9,"\u00d2":9,"\u00d5":9,"T":81,"V":54,"W":36,"Y":90,"\u00dd":90,"\u0178":90,"A":36,"\u00c6":36,"\u00c1":36,"\u00c2":36,"\u00c4":36,"\u00c0":36,"\u00c5":36,"\u00c3":36,"H":18}},"\u2026":{"d":"79,-38r0,38r-38,0r0,-38r38,0xm199,-38r0,38r-38,0r0,-38r38,0xm319,-38r0,38r-38,0r0,-38r38,0","w":360},"\u2030":{"d":"3,-194v0,-31,25,-56,56,-56v31,0,56,25,56,56v0,31,-25,56,-56,56v-31,0,-56,-24,-56,-56xm25,-194v0,18,15,33,34,33v18,0,33,-15,33,-33v0,-19,-15,-34,-33,-34v-19,0,-34,16,-34,34xm115,-54v0,-31,25,-56,56,-56v31,0,56,25,56,56v0,31,-25,57,-56,57v-31,0,-56,-25,-56,-57xm138,-54v0,18,14,34,33,34v18,0,33,-16,33,-34v0,-19,-15,-33,-33,-33v-19,0,-33,15,-33,33xm246,-54v0,-31,25,-56,56,-56v31,0,56,25,56,56v0,31,-25,57,-56,57v-31,0,-56,-25,-56,-57xm268,-54v0,18,15,34,34,34v18,0,33,-16,33,-34v0,-19,-15,-33,-33,-33v-19,0,-34,15,-34,33xm196,-253r-143,260r-20,0r143,-260r20,0","w":360},"\u00bf":{"d":"130,-123v12,60,-66,82,-63,127v0,15,8,41,43,41v46,0,48,-42,48,-57r32,0v5,40,-32,84,-81,84v-40,0,-76,-24,-76,-70v0,-49,76,-67,65,-125r32,0xm95,-152r0,-37r35,0r0,37r-35,0","w":219},"`":{"d":"52,-213r-47,-51r39,0r32,51r-24,0","w":119},"\u00b4":{"d":"115,-264r-47,51r-24,0r32,-51r39,0","w":119},"\u02c6":{"d":"60,-247r-24,34r-28,0r35,-51r34,0r35,51r-28,0","w":119},"\u02dc":{"d":"103,-260r18,0v-3,35,-34,46,-66,31v-23,-11,-32,-7,-39,11r-17,0v0,-36,40,-48,69,-30v16,10,35,3,35,-12","w":119},"\u00af":{"d":"116,-246r0,20r-112,0r0,-20r112,0","w":119},"\u02d8":{"d":"22,-263v4,14,15,28,39,28v29,0,34,-17,37,-28r18,0v-4,35,-27,49,-58,49v-48,0,-52,-36,-53,-49r17,0","w":119},"\u02d9":{"d":"76,-254r0,37r-32,0r0,-37r32,0","w":119},"\u00a8":{"d":"47,-254r0,37r-33,0r0,-37r33,0xm105,-254r0,37r-32,0r0,-37r32,0","w":119},"\u02da":{"d":"60,-272v19,0,33,14,33,33v0,19,-14,33,-33,33v-19,0,-33,-14,-33,-33v0,-19,14,-33,33,-33xm41,-239v0,10,9,19,19,19v10,0,19,-9,19,-19v0,-10,-9,-19,-19,-19v-10,0,-19,9,-19,19","w":119},"\u00b8":{"d":"28,31r23,-31r17,0r-16,22v24,-6,44,11,41,26v4,32,-52,40,-77,25r6,-14v16,6,39,12,44,-10v-5,-17,-15,-16,-31,-11","w":119},"\u02dd":{"d":"82,-264r-47,51r-24,0r32,-51r39,0xm147,-264r-47,51r-24,0r32,-51r39,0","w":119},"\u02db":{"d":"97,59r6,14v-20,14,-84,8,-77,-25v-5,-14,23,-59,64,-47v-30,16,-36,27,-36,45v0,26,26,19,43,13","w":119},"\u02c7":{"d":"36,-264r24,33r24,-33r28,0r-35,51r-34,0r-35,-51r28,0","w":119},"\u2014":{"d":"360,-113r0,27r-360,0r0,-27r360,0","w":360},"\u00c6":{"d":"69,-75r-28,75r-38,0r105,-258r232,0r0,30r-141,0r0,80r129,0r0,31r-129,0r0,86r143,0r0,31r-177,0r0,-75r-96,0xm165,-106r0,-122r-35,0r-48,122r83,0","w":360,"k":{"G":9,"s":9,"\u0161":9}},"\u00aa":{"d":"125,-163r0,15v-16,6,-37,-2,-34,-16v-12,23,-82,26,-82,-15v0,-11,3,-32,40,-36v16,-6,40,6,40,-18v0,-8,-8,-14,-27,-14v-25,0,-27,13,-28,19r-19,0v1,-27,21,-37,51,-37v10,0,45,2,45,31r0,64v0,8,7,7,14,7xm89,-205v2,7,-58,1,-58,22v0,11,6,18,21,18v25,-1,42,-13,37,-40xm13,-127r106,0r0,18r-106,0r0,-18","w":133},"\u0141":{"d":"105,-187r0,21r-43,24r0,111r131,0r0,31r-166,0r0,-124r-34,20r0,-21r34,-20r0,-113r35,0r0,95","k":{"\u201d":50,"\u2019":58,"y":11,"\u00fd":11,"\u00ff":11,"O":11,"\u00d8":11,"\u0152":11,"\u00d3":11,"\u00d4":11,"\u00d6":11,"\u00d2":11,"\u00d5":11,"S":5,"\u0160":5,"T":40,"V":40,"W":25,"Y":50,"\u00dd":50,"\u0178":50,"-":25,"\u201c":90,"\u2018":72}},"\u00d8":{"d":"212,-195r-134,145v55,58,152,12,152,-79v0,-26,-6,-49,-18,-66xm68,-62r135,-146v-56,-58,-153,-12,-153,79v0,26,6,49,18,67xm266,-255r-29,33v22,28,29,64,29,93v0,56,-30,136,-126,136v-38,0,-66,-12,-85,-31r-29,31r-11,-10r30,-33v-22,-28,-31,-63,-31,-93v0,-56,30,-136,126,-136v39,0,67,13,86,32r29,-32","w":280,"k":{".":14,",":14,"T":14,"V":18,"W":11,"Y":25,"\u00dd":25,"\u0178":25,"\u00ab":9,"\u00bb":9,"A":7,"\u00c6":7,"\u00c1":7,"\u00c2":7,"\u00c4":7,"\u00c0":7,"\u00c5":7,"\u00c3":7,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9,"X":22}},"\u0152":{"d":"49,-122v1,59,20,100,80,99v23,0,57,-16,57,-60r0,-94v0,-36,-26,-58,-62,-58v-69,0,-75,78,-75,113xm188,-258r159,0r0,30r-126,0r0,80r120,0r0,31r-120,0r0,86r126,0r0,31r-159,0v-1,-8,2,-21,-1,-27v-12,15,-26,34,-69,34v-68,0,-105,-58,-105,-135v0,-50,20,-137,110,-137v43,0,60,24,65,33r0,-26","w":360,"k":{"T":14,"V":18,"W":11,"Y":25,"\u00dd":25,"\u0178":25,"\u00ab":9,"\u00bb":9,"A":7,"\u00c6":7,"\u00c1":7,"\u00c2":7,"\u00c4":7,"\u00c0":7,"\u00c5":7,"\u00c3":7,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9,"X":22}},"\u00ba":{"d":"123,-206v0,47,-30,60,-57,60v-27,0,-57,-13,-57,-60v0,-47,30,-59,57,-59v27,0,57,12,57,59xm99,-206v0,-15,-5,-41,-33,-41v-28,0,-33,26,-33,41v0,15,5,41,33,41v28,0,33,-26,33,-41xm13,-127r106,0r0,18r-106,0r0,-18","w":131},"\u00e6":{"d":"167,-109r105,0v-2,-29,-13,-56,-52,-56v-29,0,-53,27,-53,56xm302,-59v-5,22,-28,64,-84,64v-45,0,-62,-26,-69,-39v-25,54,-136,55,-136,-15v0,-16,4,-53,57,-59v27,-9,67,10,69,-29v0,-20,-14,-30,-44,-30v-36,0,-42,22,-44,36r-29,0v-9,-73,114,-78,139,-36v10,-10,25,-27,63,-27v54,0,81,43,81,110r-138,0v0,39,19,62,55,62v30,0,48,-23,49,-37r31,0xm138,-96v-4,13,-92,1,-92,42v0,21,10,33,34,33v43,-2,65,-27,58,-75","w":320},"\u0131":{"d":"66,-188r0,188r-32,0r0,-188r32,0","w":100},"\u0142":{"d":"87,-157r-31,18r0,139r-32,0r0,-122r-31,18r0,-21r31,-18r0,-115r32,0r0,99r31,-18r0,20","w":79,"k":{"y":7,"v":7,"w":7,"\u00fd":7,"\u00ff":7}},"\u00f8":{"d":"193,-187r-25,28v41,60,18,164,-68,164v-24,0,-43,-9,-57,-22r-22,25r-11,-9r23,-26v-41,-60,-19,-167,67,-167v26,0,45,10,59,24r23,-26xm54,-51r85,-97v-8,-11,-21,-18,-39,-18v-62,0,-64,69,-46,115xm147,-134r-84,95v8,10,20,17,37,17v60,0,63,-67,47,-112","w":219,"k":{"\u017e":20,"\u00ff":11,"\u00fd":11,"\u00f9":20,"\u00fc":20,"\u00fb":20,"\u00fa":20,"\u0161":20,"\u00f5":20,"\u00f2":20,"\u00f6":20,"\u00f4":20,"\u00f3":20,"\u00f1":20,"\u00ec":20,"\u00ef":20,"\u00ee":20,"\u00ed":20,"\u00e8":20,"\u00eb":20,"\u00ea":20,"\u00e9":20,"\u00e7":20,"\u00e3":20,"\u00e5":20,"\u00e0":20,"\u00e4":20,"\u00e2":20,"\u00e1":20,"\u00f8":20,"\u0142":20,"z":20,"y":11,"x":11,"w":5,"v":5,"u":20,"t":20,"s":20,"r":20,"q":20,"p":20,"o":20,"n":20,"m":20,"l":20,"k":20,"j":20,"i":20,"h":20,"g":20,"f":20,"e":20,"d":20,"c":20,"b":20,"a":20,".":34,",":34,"\u201c":11,"\u201d":11,"\u2019":11}},"\u0153":{"d":"187,-109r105,0v-2,-29,-14,-56,-53,-56v-29,0,-52,27,-52,56xm322,-59v-5,22,-28,64,-84,64v-27,0,-52,-10,-70,-36v-17,33,-54,36,-68,36v-118,-1,-116,-198,0,-199v30,0,56,12,71,38v18,-27,40,-38,73,-38v54,0,81,43,81,110r-138,0v0,39,19,62,55,62v30,0,48,-23,49,-37r31,0xm45,-94v0,25,10,72,55,72v45,0,55,-47,55,-72v0,-25,-10,-72,-55,-72v-45,0,-55,47,-55,72","w":339,"k":{"v":5,"w":5,"y":11,"\u00fd":11,"\u00ff":11,"\u201c":11,"\u201d":11,"\u2019":11,"x":11}},"\u00df":{"d":"24,0r0,-192v0,-41,29,-70,83,-70v53,0,86,26,86,65v0,35,-21,48,-29,53v27,7,42,37,42,58v-1,71,-48,98,-110,89r0,-27v45,6,77,-12,77,-53v0,-43,-33,-53,-75,-49r0,-28v82,9,86,-81,9,-81v-41,0,-51,20,-51,51r0,184r-32,0","w":219,"k":{"v":7,"w":11,"y":7,"\u00fd":7,"\u00ff":7,"\u2019":18}},"\u00ac":{"d":"170,-39r0,-75r-156,0r0,-26r182,0r0,101r-26,0","w":210},"\u00b5":{"d":"176,0r-30,0v-1,-9,2,-21,-1,-28v-15,30,-57,46,-89,21r0,82r-32,0r0,-263r32,0r0,125v0,31,16,41,37,41v76,0,44,-96,51,-166r32,0r0,188","w":208},"\u2122":{"d":"201,-258r42,109r42,-109r40,0r0,148r-26,0r-1,-121r-46,121r-18,0r-48,-121r0,121r-26,0r0,-148r41,0xm134,-258r0,21r-45,0r0,127r-27,0r0,-127r-45,0r0,-21r117,0","w":360},"\u00d0":{"d":"133,-148r0,31r-69,0r0,87r68,0v45,0,75,-36,75,-101v0,-94,-55,-105,-143,-98r0,81r69,0xm0,-117r0,-31r29,0r0,-110r105,0v67,0,109,50,109,125v0,22,-6,133,-111,133r-103,0r0,-117r-29,0","w":259,"k":{"y":5,"\u00fd":5,"\u00ff":5,"u":5,"\u00fa":5,"\u00fb":5,"\u00fc":5,"\u00f9":5,"V":25,"W":14,"Y":32,"\u00dd":32,"\u0178":32,"\u2019":14,",":25,".":25,"A":14,"\u00c6":14,"\u00c1":14,"\u00c2":14,"\u00c4":14,"\u00c0":14,"\u00c5":14,"\u00c3":14,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9,"J":9}},"\u00bd":{"d":"222,-253r-159,260r-21,0r160,-260r20,0xm54,-208r-39,0r0,-16v27,-2,39,-4,45,-29r20,0r0,152r-26,0r0,-107xm190,-98r-21,0v0,-49,39,-54,57,-54v30,0,52,17,52,45v0,48,-72,54,-88,85r88,0r0,22r-115,0v1,-43,31,-56,59,-72v19,-10,31,-15,31,-35v0,-11,-6,-24,-30,-24v-30,0,-32,24,-33,33","w":300},"\u00b1":{"d":"92,-124r0,-58r26,0r0,58r78,0r0,26r-78,0r0,58r-26,0r0,-58r-78,0r0,-26r78,0xm14,0r0,-26r182,0r0,26r-182,0","w":210},"\u00de":{"d":"66,-186r0,90v55,-2,122,14,122,-47v0,-59,-69,-40,-122,-43xm31,0r0,-258r35,0r0,42r81,0v48,0,77,31,77,73v0,36,-21,77,-77,77r-81,0r0,66r-35,0","w":240},"\u00bc":{"d":"151,-34r0,-21r74,-97r23,0r0,97r24,0r0,21r-24,0r0,34r-23,0r0,-34r-74,0xm225,-55v-1,-22,2,-47,-1,-67r-51,67r52,0xm235,-253r-159,260r-21,0r160,-260r20,0xm65,-209r-39,0r0,-15v27,-2,39,-4,45,-29r19,0r0,152r-25,0r0,-108","w":300},"\u00f7":{"d":"196,-78r-182,0r0,-26r182,0r0,26xm81,-164v0,-14,11,-25,24,-25v13,0,25,12,25,25v0,12,-12,24,-25,24v-13,0,-24,-11,-24,-24xm81,-18v0,-14,11,-24,24,-24v13,0,25,11,25,24v0,12,-12,25,-25,25v-13,0,-24,-12,-24,-25","w":210},"\u00a6":{"d":"34,7r0,-106r26,0r0,106r-26,0xm34,-166r0,-99r26,0r0,99r-26,0","w":93},"\u00b0":{"d":"72,-238v-19,0,-35,18,-35,37v0,19,16,38,35,38v19,0,35,-19,35,-38v0,-19,-16,-37,-35,-37xm125,-201v0,30,-23,53,-53,53v-30,0,-53,-23,-53,-53v0,-30,23,-52,53,-52v30,0,53,22,53,52","w":144},"\u00fe":{"d":"51,-85v0,50,32,63,52,63v35,0,50,-32,50,-73v0,-24,-2,-70,-51,-70v-46,0,-51,49,-51,80xm21,75r0,-333r32,0r0,96v6,-10,21,-32,55,-32v50,0,78,41,78,94v0,45,-19,105,-83,105v-25,0,-42,-12,-50,-25r0,95r-32,0","k":{"v":7,"y":7,"\u00fd":7,"\u00ff":7,"u":7,"\u00fa":7,"\u00fb":7,"\u00fc":7,"\u00f9":7,"b":4,"\u00fe":4,"l":7,"\u0142":7,",":14,".":14}},"\u00be":{"d":"170,-34r0,-21r74,-97r23,0r0,97r25,0r0,21r-25,0r0,34r-23,0r0,-34r-74,0xm193,-55r51,0r0,-67xm256,-253r-159,260r-20,0r159,-260r20,0xm16,-148r25,0v1,13,4,30,31,30v21,0,34,-8,34,-26v0,-29,-25,-26,-45,-26r0,-18v21,1,39,-1,39,-24v0,-8,-4,-20,-29,-20v-24,0,-28,16,-29,29r-22,0v0,-22,12,-50,55,-50v52,0,64,58,29,71v44,18,34,85,-33,85v-34,0,-55,-24,-55,-51","w":300},"\u00ae":{"d":"133,7v-75,0,-138,-58,-138,-137v0,-78,63,-135,138,-135v74,0,138,57,138,135v0,79,-64,137,-138,137xm22,-130v0,66,49,114,111,114v62,0,110,-48,110,-114v0,-64,-48,-113,-110,-113v-62,0,-111,49,-111,113xm104,-119r0,68r-23,0r0,-157v52,0,115,-8,115,45v0,28,-18,40,-41,43r45,69r-27,0r-41,-68r-28,0xm104,-139v30,-2,67,8,67,-26v0,-30,-38,-22,-67,-23r0,49","w":265},"\u2212":{"d":"196,-78r-182,0r0,-26r182,0r0,26","w":210},"\u00f0":{"d":"45,-91v0,20,9,69,55,69v46,0,55,-49,55,-69v0,-20,-9,-70,-55,-70v-46,0,-55,50,-55,70xm169,-251r-39,18v37,34,58,80,58,126v0,86,-48,112,-85,112v-63,0,-90,-48,-90,-96v0,-70,72,-128,131,-78v-8,-21,-25,-39,-40,-51r-45,22r-15,-15r42,-21v-10,-8,-21,-13,-32,-18r27,-13v12,5,23,10,33,18r38,-18"},"\u00d7":{"d":"87,-91r-73,-73r19,-18r72,72r73,-72r18,18r-72,73r72,73r-18,18r-73,-72r-73,72r-18,-18","w":210},"\u00a9":{"d":"133,7v-75,0,-138,-58,-138,-137v0,-78,63,-135,138,-135v74,0,138,57,138,135v0,79,-64,137,-138,137xm22,-130v0,66,49,114,111,114v62,0,110,-48,110,-114v0,-64,-48,-113,-110,-113v-62,0,-111,49,-111,113xm180,-104r25,0v-18,97,-154,60,-147,-26v-12,-89,134,-117,146,-27r-24,0v-19,-58,-101,-30,-95,27v-9,58,85,84,95,26","w":265},"\u00c1":{"d":"172,-75r-104,0r-27,75r-36,0r97,-258r40,0r93,258r-38,0xm79,-106r80,0r-39,-114xm175,-334r-47,50r-24,0r32,-50r39,0","w":240,"k":{"v":14,"w":14,"y":14,"\u00fd":14,"\u00ff":14,"c":7,"\u00e7":7,"C":11,"\u00c7":11,"d":7,"\u0131":7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"G":11,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"O":11,"\u00d8":11,"\u0152":11,"\u00d3":11,"\u00d4":11,"\u00d6":11,"\u00d2":11,"\u00d5":11,"q":7,"Q":11,"S":5,"\u0160":5,"T":43,"u":11,"\u00fa":11,"\u00fb":11,"\u00fc":11,"\u00f9":11,"U":18,"\u00da":18,"\u00db":18,"\u00dc":18,"\u00d9":18,"V":25,"W":18,"Y":36,"\u00dd":36,"\u0178":36,"\u00ab":36,"\u00bb":18,"-":14,"\u201c":61,"\u201d":61,"\u2018":61,"\u2019":61}},"\u00c2":{"d":"172,-75r-104,0r-27,75r-36,0r97,-258r40,0r93,258r-38,0xm79,-106r80,0r-39,-114xm120,-317r-24,33r-28,0r35,-50r34,0r35,50r-28,0","w":240,"k":{"v":14,"w":14,"y":14,"\u00fd":14,"\u00ff":14,"c":7,"\u00e7":7,"C":11,"\u00c7":11,"d":7,"\u0131":7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"G":11,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"O":11,"\u00d8":11,"\u0152":11,"\u00d3":11,"\u00d4":11,"\u00d6":11,"\u00d2":11,"\u00d5":11,"q":7,"Q":11,"S":5,"\u0160":5,"T":43,"u":11,"\u00fa":11,"\u00fb":11,"\u00fc":11,"\u00f9":11,"U":18,"\u00da":18,"\u00db":18,"\u00dc":18,"\u00d9":18,"V":25,"W":18,"Y":36,"\u00dd":36,"\u0178":36,"\u00ab":36,"\u00bb":18,"-":14,"\u201c":61,"\u201d":61,"\u2018":61,"\u2019":61}},"\u00c4":{"d":"172,-75r-104,0r-27,75r-36,0r97,-258r40,0r93,258r-38,0xm79,-106r80,0r-39,-114xm107,-324r0,36r-32,0r0,-36r32,0xm166,-324r0,36r-33,0r0,-36r33,0","w":240,"k":{"v":14,"w":14,"y":14,"\u00fd":14,"\u00ff":14,"c":7,"\u00e7":7,"C":11,"\u00c7":11,"d":7,"\u0131":7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"G":11,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"O":11,"\u00d8":11,"\u0152":11,"\u00d3":11,"\u00d4":11,"\u00d6":11,"\u00d2":11,"\u00d5":11,"q":7,"Q":11,"S":5,"\u0160":5,"T":43,"u":11,"\u00fa":11,"\u00fb":11,"\u00fc":11,"\u00f9":11,"U":18,"\u00da":18,"\u00db":18,"\u00dc":18,"\u00d9":18,"V":25,"W":18,"Y":36,"\u00dd":36,"\u0178":36,"\u00ab":36,"\u00bb":18,"-":14,"\u201c":61,"\u201d":61,"\u2018":61,"\u2019":61}},"\u00c0":{"d":"172,-75r-104,0r-27,75r-36,0r97,-258r40,0r93,258r-38,0xm79,-106r80,0r-39,-114xm112,-284r-47,-50r39,0r32,50r-24,0","w":240,"k":{"v":14,"w":14,"y":14,"\u00fd":14,"\u00ff":14,"c":7,"\u00e7":7,"C":11,"\u00c7":11,"d":7,"\u0131":7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"G":11,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"O":11,"\u00d8":11,"\u0152":11,"\u00d3":11,"\u00d4":11,"\u00d6":11,"\u00d2":11,"\u00d5":11,"q":7,"Q":11,"S":5,"\u0160":5,"T":43,"u":11,"\u00fa":11,"\u00fb":11,"\u00fc":11,"\u00f9":11,"U":18,"\u00da":18,"\u00db":18,"\u00dc":18,"\u00d9":18,"V":25,"W":18,"Y":36,"\u00dd":36,"\u0178":36,"\u00ab":36,"\u00bb":18,"-":14,"\u201c":61,"\u201d":61,"\u2018":61,"\u2019":61}},"\u00c5":{"d":"172,-75r-104,0r-27,75r-36,0r97,-258r40,0r93,258r-38,0xm79,-106r80,0r-39,-114xm120,-335v19,0,33,14,33,33v0,19,-14,33,-33,33v-19,0,-33,-14,-33,-33v0,-19,14,-33,33,-33xm102,-302v0,10,8,19,18,19v10,0,19,-9,19,-19v0,-10,-9,-19,-19,-19v-10,0,-18,9,-18,19","w":240,"k":{"v":14,"w":14,"y":14,"\u00fd":14,"\u00ff":14,"c":7,"\u00e7":7,"C":11,"\u00c7":11,"d":7,"\u0131":7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"G":11,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"O":11,"\u00d8":11,"\u0152":11,"\u00d3":11,"\u00d4":11,"\u00d6":11,"\u00d2":11,"\u00d5":11,"q":7,"Q":11,"S":5,"\u0160":5,"T":43,"u":11,"\u00fa":11,"\u00fb":11,"\u00fc":11,"\u00f9":11,"U":18,"\u00da":18,"\u00db":18,"\u00dc":18,"\u00d9":18,"V":25,"W":18,"Y":36,"\u00dd":36,"\u0178":36,"\u00ab":36,"\u00bb":18,"-":14,"\u201c":61,"\u201d":61,"\u2018":61,"\u2019":61}},"\u00c3":{"d":"172,-75r-104,0r-27,75r-36,0r97,-258r40,0r93,258r-38,0xm79,-106r80,0r-39,-114xm163,-330r18,0v-2,50,-54,38,-88,26v-10,0,-14,7,-17,16r-17,0v0,-36,40,-48,70,-30v16,9,34,1,34,-12","w":240,"k":{"v":14,"w":14,"y":14,"\u00fd":14,"\u00ff":14,"c":7,"\u00e7":7,"C":11,"\u00c7":11,"d":7,"\u0131":7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"G":11,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"O":11,"\u00d8":11,"\u0152":11,"\u00d3":11,"\u00d4":11,"\u00d6":11,"\u00d2":11,"\u00d5":11,"q":7,"Q":11,"S":5,"\u0160":5,"T":43,"u":11,"\u00fa":11,"\u00fb":11,"\u00fc":11,"\u00f9":11,"U":18,"\u00da":18,"\u00db":18,"\u00dc":18,"\u00d9":18,"V":25,"W":18,"Y":36,"\u00dd":36,"\u0178":36,"\u00ab":36,"\u00bb":18,"-":14,"\u201c":61,"\u201d":61,"\u2018":61,"\u2019":61}},"\u00c7":{"d":"95,73r7,-14v16,6,39,11,43,-10v-5,-17,-15,-16,-31,-11v-13,-10,7,-21,12,-32v-56,-2,-110,-41,-110,-137v0,-80,45,-134,120,-134v67,0,102,41,107,84r-34,0v-10,-45,-48,-53,-73,-53v-47,0,-84,34,-84,102v0,61,22,108,86,108v23,0,61,-11,73,-71r34,0v-13,85,-74,99,-102,101r-12,16v24,-6,44,11,41,26v4,32,-52,40,-77,25","w":259,"k":{".":11,",":11,"y":9,"\u00fd":9,"\u00ff":9,"e":5,"\u00e9":5,"\u00ea":5,"\u00eb":5,"\u00e8":5,"o":5,"\u00f8":5,"\u0153":5,"\u00f3":5,"\u00f4":5,"\u00f6":5,"\u00f2":5,"\u00f5":5,"Y":14,"\u00dd":14,"\u0178":14,"A":14,"\u00c6":14,"\u00c1":14,"\u00c2":14,"\u00c4":14,"\u00c0":14,"\u00c5":14,"\u00c3":14,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9}},"\u00c9":{"d":"222,-31r0,31r-191,0r0,-258r188,0r0,30r-153,0r0,80r141,0r0,31r-141,0r0,86r156,0xm175,-334r-47,50r-24,0r32,-50r39,0","w":240,"k":{"G":9,"s":9,"\u0161":9}},"\u00ca":{"d":"222,-31r0,31r-191,0r0,-258r188,0r0,30r-153,0r0,80r141,0r0,31r-141,0r0,86r156,0xm120,-317r-24,33r-28,0r35,-50r34,0r35,50r-28,0","w":240,"k":{"G":9,"s":9,"\u0161":9}},"\u00cb":{"d":"222,-31r0,31r-191,0r0,-258r188,0r0,30r-153,0r0,80r141,0r0,31r-141,0r0,86r156,0xm107,-324r0,36r-32,0r0,-36r32,0xm166,-324r0,36r-33,0r0,-36r33,0","w":240,"k":{"G":9,"s":9,"\u0161":9}},"\u00c8":{"d":"222,-31r0,31r-191,0r0,-258r188,0r0,30r-153,0r0,80r141,0r0,31r-141,0r0,86r156,0xm112,-284r-47,-50r39,0r32,50r-24,0","w":240,"k":{"G":9,"s":9,"\u0161":9}},"\u00cd":{"d":"68,-258r0,258r-35,0r0,-258r35,0xm105,-334r-47,50r-24,0r32,-50r39,0","w":100,"k":{"T":7}},"\u00ce":{"d":"68,-258r0,258r-35,0r0,-258r35,0xm50,-317r-24,33r-28,0r35,-50r34,0r36,50r-29,0","w":100,"k":{"T":7}},"\u00cf":{"d":"68,-258r0,258r-35,0r0,-258r35,0xm37,-324r0,36r-32,0r0,-36r32,0xm96,-324r0,36r-33,0r0,-36r33,0","w":100,"k":{"T":7}},"\u00cc":{"d":"68,-258r0,258r-35,0r0,-258r35,0xm42,-284r-47,-50r39,0r32,50r-24,0","w":100,"k":{"T":7}},"\u00d1":{"d":"198,-50r1,-208r34,0r0,258r-40,0r-132,-209r0,209r-34,0r0,-258r42,0xm177,-330r18,0v-2,50,-54,38,-88,26v-10,0,-14,7,-17,16r-18,0v1,-35,40,-48,70,-30v16,10,35,2,35,-12","w":259},"\u00d3":{"d":"230,-129v0,-61,-34,-105,-90,-105v-56,0,-90,44,-90,105v0,61,34,105,90,105v56,0,90,-44,90,-105xm266,-129v0,56,-30,136,-126,136v-96,0,-126,-80,-126,-136v0,-56,30,-136,126,-136v96,0,126,80,126,136xm195,-334r-47,50r-24,0r32,-50r39,0","w":280,"k":{".":14,",":14,"T":14,"V":18,"W":11,"Y":25,"\u00dd":25,"\u0178":25,"\u00ab":9,"\u00bb":9,"A":7,"\u00c6":7,"\u00c1":7,"\u00c2":7,"\u00c4":7,"\u00c0":7,"\u00c5":7,"\u00c3":7,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9,"X":22}},"\u00d4":{"d":"230,-129v0,-61,-34,-105,-90,-105v-56,0,-90,44,-90,105v0,61,34,105,90,105v56,0,90,-44,90,-105xm266,-129v0,56,-30,136,-126,136v-96,0,-126,-80,-126,-136v0,-56,30,-136,126,-136v96,0,126,80,126,136xm140,-317r-24,33r-28,0r35,-50r34,0r36,50r-29,0","w":280,"k":{".":14,",":14,"T":14,"V":18,"W":11,"Y":25,"\u00dd":25,"\u0178":25,"\u00ab":9,"\u00bb":9,"A":7,"\u00c6":7,"\u00c1":7,"\u00c2":7,"\u00c4":7,"\u00c0":7,"\u00c5":7,"\u00c3":7,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9,"X":22}},"\u00d6":{"d":"230,-129v0,-61,-34,-105,-90,-105v-56,0,-90,44,-90,105v0,61,34,105,90,105v56,0,90,-44,90,-105xm266,-129v0,56,-30,136,-126,136v-96,0,-126,-80,-126,-136v0,-56,30,-136,126,-136v96,0,126,80,126,136xm127,-324r0,36r-32,0r0,-36r32,0xm186,-324r0,36r-33,0r0,-36r33,0","w":280,"k":{".":14,",":14,"T":14,"V":18,"W":11,"Y":25,"\u00dd":25,"\u0178":25,"\u00ab":9,"\u00bb":9,"A":7,"\u00c6":7,"\u00c1":7,"\u00c2":7,"\u00c4":7,"\u00c0":7,"\u00c5":7,"\u00c3":7,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9,"X":22}},"\u00d2":{"d":"230,-129v0,-61,-34,-105,-90,-105v-56,0,-90,44,-90,105v0,61,34,105,90,105v56,0,90,-44,90,-105xm266,-129v0,56,-30,136,-126,136v-96,0,-126,-80,-126,-136v0,-56,30,-136,126,-136v96,0,126,80,126,136xm132,-284r-47,-50r39,0r32,50r-24,0","w":280,"k":{".":14,",":14,"T":14,"V":18,"W":11,"Y":25,"\u00dd":25,"\u0178":25,"\u00ab":9,"\u00bb":9,"A":7,"\u00c6":7,"\u00c1":7,"\u00c2":7,"\u00c4":7,"\u00c0":7,"\u00c5":7,"\u00c3":7,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9,"X":22}},"\u00d5":{"d":"230,-129v0,-61,-34,-105,-90,-105v-56,0,-90,44,-90,105v0,61,34,105,90,105v56,0,90,-44,90,-105xm266,-129v0,56,-30,136,-126,136v-96,0,-126,-80,-126,-136v0,-56,30,-136,126,-136v96,0,126,80,126,136xm184,-330r18,0v-2,50,-55,38,-89,26v-10,0,-14,7,-17,16r-17,0v0,-36,40,-48,70,-30v16,9,35,2,35,-12","w":280,"k":{".":14,",":14,"T":14,"V":18,"W":11,"Y":25,"\u00dd":25,"\u0178":25,"\u00ab":9,"\u00bb":9,"A":7,"\u00c6":7,"\u00c1":7,"\u00c2":7,"\u00c4":7,"\u00c0":7,"\u00c5":7,"\u00c3":7,"a":9,"\u00e6":9,"\u00e1":9,"\u00e2":9,"\u00e4":9,"\u00e0":9,"\u00e5":9,"\u00e3":9,"X":22}},"\u0160":{"d":"216,-183r-33,0v-2,-40,-35,-52,-64,-52v-22,0,-59,6,-59,45v0,48,67,37,105,50v32,11,58,28,58,69v0,95,-142,89,-179,53v-21,-21,-26,-42,-26,-66r32,0v0,47,39,61,72,61v25,0,67,-7,67,-44v0,-43,-70,-47,-108,-58v-17,-5,-55,-15,-55,-60v0,-40,26,-80,89,-80v90,0,100,54,101,82xm96,-334r24,33r24,-33r28,0r-35,50r-34,0r-35,-50r28,0","w":240,"k":{".":7,",":7,"v":9,"w":9,"y":9,"\u00fd":9,"\u00ff":9,"T":7,"V":18,"Y":14,"\u00dd":14,"\u0178":14,"A":9,"\u00c6":9,"\u00c1":9,"\u00c2":9,"\u00c4":9,"\u00c0":9,"\u00c5":9,"\u00c3":9,"a":5,"\u00e6":5,"\u00e1":5,"\u00e2":5,"\u00e4":5,"\u00e0":5,"\u00e5":5,"\u00e3":5}},"\u00da":{"d":"197,-258r35,0r0,167v0,53,-33,98,-104,98v-138,-1,-93,-144,-100,-265r35,0r0,162v0,56,35,72,66,72v32,0,68,-15,68,-71r0,-163xm185,-334r-47,50r-24,0r32,-50r39,0","w":259,"k":{".":14,",":14,"A":14,"\u00c6":14,"\u00c1":14,"\u00c2":14,"\u00c4":14,"\u00c0":14,"\u00c5":14,"\u00c3":14}},"\u00db":{"d":"197,-258r35,0r0,167v0,53,-33,98,-104,98v-138,-1,-93,-144,-100,-265r35,0r0,162v0,56,35,72,66,72v32,0,68,-15,68,-71r0,-163xm130,-317r-24,33r-28,0r35,-50r34,0r36,50r-29,0","w":259,"k":{".":14,",":14,"A":14,"\u00c6":14,"\u00c1":14,"\u00c2":14,"\u00c4":14,"\u00c0":14,"\u00c5":14,"\u00c3":14}},"\u00dc":{"d":"197,-258r35,0r0,167v0,53,-33,98,-104,98v-138,-1,-93,-144,-100,-265r35,0r0,162v0,56,35,72,66,72v32,0,68,-15,68,-71r0,-163xm117,-324r0,36r-32,0r0,-36r32,0xm176,-324r0,36r-33,0r0,-36r33,0","w":259,"k":{".":14,",":14,"A":14,"\u00c6":14,"\u00c1":14,"\u00c2":14,"\u00c4":14,"\u00c0":14,"\u00c5":14,"\u00c3":14}},"\u00d9":{"d":"197,-258r35,0r0,167v0,53,-33,98,-104,98v-138,-1,-93,-144,-100,-265r35,0r0,162v0,56,35,72,66,72v32,0,68,-15,68,-71r0,-163xm122,-284r-47,-50r39,0r32,50r-24,0","w":259,"k":{".":14,",":14,"A":14,"\u00c6":14,"\u00c1":14,"\u00c2":14,"\u00c4":14,"\u00c0":14,"\u00c5":14,"\u00c3":14}},"\u00dd":{"d":"138,-104r0,104r-35,0r0,-104r-98,-154r41,0r74,124r74,-124r41,0xm175,-334r-47,50r-24,0r32,-50r39,0","w":240,"k":{"\u00e3":50,";":22,":":22,".":50,"-":50,",":50,"C":27,"\u00c7":27,"e":50,"\u00e9":50,"\u00ea":50,"\u00eb":50,"\u00e8":50,"o":50,"\u00f8":50,"\u0153":50,"\u00f3":50,"\u00f4":50,"\u00f6":50,"\u00f2":50,"\u00f5":50,"O":31,"\u00d8":31,"\u0152":31,"\u00d3":31,"\u00d4":31,"\u00d6":31,"\u00d2":31,"\u00d5":31,"S":27,"\u0160":27,"u":40,"\u00fa":40,"\u00fb":40,"\u00fc":40,"\u00f9":40,"\u00ab":90,"\u00bb":72,"A":40,"\u00c6":40,"\u00c1":40,"\u00c2":40,"\u00c4":40,"\u00c0":40,"\u00c5":40,"\u00c3":40,"a":50,"\u00e6":50,"\u00e1":50,"\u00e2":50,"\u00e4":50,"\u00e0":50,"\u00e5":50,"i":7,"\u00ed":7,"\u00ee":7,"\u00ef":7,"\u00ec":7}},"\u0178":{"d":"138,-104r0,104r-35,0r0,-104r-98,-154r41,0r74,124r74,-124r41,0xm107,-324r0,36r-32,0r0,-36r32,0xm166,-324r0,36r-33,0r0,-36r33,0","w":240,"k":{"\u00e3":50,";":22,":":22,".":50,"-":50,",":50,"C":27,"\u00c7":27,"e":50,"\u00e9":50,"\u00ea":50,"\u00eb":50,"\u00e8":50,"o":50,"\u00f8":50,"\u0153":50,"\u00f3":50,"\u00f4":50,"\u00f6":50,"\u00f2":50,"\u00f5":50,"O":31,"\u00d8":31,"\u0152":31,"\u00d3":31,"\u00d4":31,"\u00d6":31,"\u00d2":31,"\u00d5":31,"S":27,"\u0160":27,"u":40,"\u00fa":40,"\u00fb":40,"\u00fc":40,"\u00f9":40,"\u00ab":90,"\u00bb":72,"A":40,"\u00c6":40,"\u00c1":40,"\u00c2":40,"\u00c4":40,"\u00c0":40,"\u00c5":40,"\u00c3":40,"a":50,"\u00e6":50,"\u00e1":50,"\u00e2":50,"\u00e4":50,"\u00e0":50,"\u00e5":50,"i":7,"\u00ed":7,"\u00ee":7,"\u00ef":7,"\u00ec":7}},"\u017d":{"d":"212,-31r0,31r-204,0r0,-29r159,-199r-147,0r0,-30r192,0r0,30r-159,197r159,0xm86,-334r24,33r24,-33r28,0r-35,50r-34,0r-35,-50r28,0","w":219},"\u00e1":{"d":"51,-131r-29,0v1,-45,32,-63,78,-63v15,0,70,5,70,53r0,108v0,13,10,12,21,10r0,23v-23,11,-57,-5,-51,-25v-12,13,-31,30,-68,30v-35,0,-59,-22,-59,-54v0,-16,4,-53,57,-59v27,-9,67,10,69,-29v0,-20,-14,-30,-44,-30v-36,0,-42,22,-44,36xm138,-96v-4,13,-92,1,-92,42v0,21,10,33,34,33v43,-2,65,-27,58,-75xm155,-264r-47,51r-24,0r32,-51r39,0"},"\u00e2":{"d":"51,-131r-29,0v1,-45,32,-63,78,-63v15,0,70,5,70,53r0,108v0,13,10,12,21,10r0,23v-23,11,-57,-5,-51,-25v-12,13,-31,30,-68,30v-35,0,-59,-22,-59,-54v0,-16,4,-53,57,-59v27,-9,67,10,69,-29v0,-20,-14,-30,-44,-30v-36,0,-42,22,-44,36xm138,-96v-4,13,-92,1,-92,42v0,21,10,33,34,33v43,-2,65,-27,58,-75xm100,-247r-24,34r-28,0r36,-51r33,0r36,51r-29,0"},"\u00e4":{"d":"51,-131r-29,0v1,-45,32,-63,78,-63v15,0,70,5,70,53r0,108v0,13,10,12,21,10r0,23v-23,11,-57,-5,-51,-25v-12,13,-31,30,-68,30v-35,0,-59,-22,-59,-54v0,-16,4,-53,57,-59v27,-9,67,10,69,-29v0,-20,-14,-30,-44,-30v-36,0,-42,22,-44,36xm138,-96v-4,13,-92,1,-92,42v0,21,10,33,34,33v43,-2,65,-27,58,-75xm87,-254r0,37r-32,0r0,-37r32,0xm146,-254r0,37r-33,0r0,-37r33,0"},"\u00e0":{"d":"51,-131r-29,0v1,-45,32,-63,78,-63v15,0,70,5,70,53r0,108v0,13,10,12,21,10r0,23v-23,11,-57,-5,-51,-25v-12,13,-31,30,-68,30v-35,0,-59,-22,-59,-54v0,-16,4,-53,57,-59v27,-9,67,10,69,-29v0,-20,-14,-30,-44,-30v-36,0,-42,22,-44,36xm138,-96v-4,13,-92,1,-92,42v0,21,10,33,34,33v43,-2,65,-27,58,-75xm92,-213r-47,-51r39,0r32,51r-24,0"},"\u00e5":{"d":"51,-131r-29,0v1,-45,32,-63,78,-63v15,0,70,5,70,53r0,108v0,13,10,12,21,10r0,23v-23,11,-57,-5,-51,-25v-12,13,-31,30,-68,30v-35,0,-59,-22,-59,-54v0,-16,4,-53,57,-59v27,-9,67,10,69,-29v0,-20,-14,-30,-44,-30v-36,0,-42,22,-44,36xm138,-96v-4,13,-92,1,-92,42v0,21,10,33,34,33v43,-2,65,-27,58,-75xm100,-272v19,0,34,14,34,33v0,19,-15,33,-34,33v-19,0,-33,-14,-33,-33v0,-19,14,-33,33,-33xm82,-239v0,10,8,19,18,19v10,0,19,-9,19,-19v0,-10,-9,-19,-19,-19v-10,0,-18,9,-18,19"},"\u00e3":{"d":"51,-131r-29,0v1,-45,32,-63,78,-63v15,0,70,5,70,53r0,108v0,13,10,12,21,10r0,23v-23,11,-57,-5,-51,-25v-12,13,-31,30,-68,30v-35,0,-59,-22,-59,-54v0,-16,4,-53,57,-59v27,-9,67,10,69,-29v0,-20,-14,-30,-44,-30v-36,0,-42,22,-44,36xm138,-96v-4,13,-92,1,-92,42v0,21,10,33,34,33v43,-2,65,-27,58,-75xm140,-260r18,0v-3,36,-34,46,-67,31v-23,-11,-31,-8,-38,11r-18,0v1,-35,41,-48,70,-30v16,10,35,3,35,-12"},"\u00e7":{"d":"56,73r6,-14v16,6,39,11,43,-10v-5,-17,-15,-16,-31,-11v-13,-10,8,-22,13,-33v-49,-4,-76,-43,-76,-94v0,-58,28,-105,90,-105v49,0,68,36,71,69r-31,0v-4,-25,-18,-40,-45,-40v-39,0,-51,38,-51,71v0,32,7,72,51,72v21,0,40,-16,45,-45r31,0v-3,28,-19,67,-67,71r-14,18v24,-6,45,10,42,26v4,32,-52,41,-77,25","w":180,"k":{",":5,"y":4,"\u00fd":4,"\u00ff":4,"k":7}},"\u00e9":{"d":"183,-59v-5,22,-28,64,-84,64v-53,0,-85,-40,-85,-94v0,-58,29,-105,91,-105v54,0,81,43,81,110r-138,0v0,39,19,62,55,62v30,0,48,-23,49,-37r31,0xm48,-109r105,0v-2,-29,-14,-56,-53,-56v-29,0,-52,27,-52,56xm155,-264r-47,51r-24,0r32,-51r39,0","k":{".":5,",":5,"v":11,"w":7,"y":7,"\u00fd":7,"\u00ff":7,"\u201c":18,"\u201d":18,"\u2019":18,"x":11}},"\u00ea":{"d":"183,-59v-5,22,-28,64,-84,64v-53,0,-85,-40,-85,-94v0,-58,29,-105,91,-105v54,0,81,43,81,110r-138,0v0,39,19,62,55,62v30,0,48,-23,49,-37r31,0xm48,-109r105,0v-2,-29,-14,-56,-53,-56v-29,0,-52,27,-52,56xm100,-247r-24,34r-28,0r36,-51r33,0r36,51r-29,0","k":{".":5,",":5,"v":11,"w":7,"y":7,"\u00fd":7,"\u00ff":7,"\u201c":18,"\u201d":18,"\u2019":18,"x":11}},"\u00eb":{"d":"183,-59v-5,22,-28,64,-84,64v-53,0,-85,-40,-85,-94v0,-58,29,-105,91,-105v54,0,81,43,81,110r-138,0v0,39,19,62,55,62v30,0,48,-23,49,-37r31,0xm48,-109r105,0v-2,-29,-14,-56,-53,-56v-29,0,-52,27,-52,56xm87,-254r0,37r-32,0r0,-37r32,0xm146,-254r0,37r-33,0r0,-37r33,0","k":{".":5,",":5,"v":11,"w":7,"y":7,"\u00fd":7,"\u00ff":7,"\u201c":18,"\u201d":18,"\u2019":18,"x":11}},"\u00e8":{"d":"183,-59v-5,22,-28,64,-84,64v-53,0,-85,-40,-85,-94v0,-58,29,-105,91,-105v54,0,81,43,81,110r-138,0v0,39,19,62,55,62v30,0,48,-23,49,-37r31,0xm48,-109r105,0v-2,-29,-14,-56,-53,-56v-29,0,-52,27,-52,56xm92,-213r-47,-51r39,0r32,51r-24,0","k":{".":5,",":5,"v":11,"w":7,"y":7,"\u00fd":7,"\u00ff":7,"\u201c":18,"\u201d":18,"\u2019":18,"x":11}},"\u00ed":{"d":"66,-188r0,188r-32,0r0,-188r32,0xm105,-264r-47,51r-24,0r32,-51r39,0","w":100},"\u00ee":{"d":"66,-188r0,188r-32,0r0,-188r32,0xm50,-247r-24,34r-28,0r35,-51r34,0r36,51r-29,0","w":100},"\u00ef":{"d":"66,-188r0,188r-32,0r0,-188r32,0xm37,-254r0,37r-32,0r0,-37r32,0xm96,-254r0,37r-33,0r0,-37r33,0","w":100},"\u00ec":{"d":"66,-188r0,188r-32,0r0,-188r32,0xm42,-213r-47,-51r39,0r32,51r-24,0","w":100},"\u00f1":{"d":"177,-128r0,128r-32,0r0,-116v0,-33,-9,-49,-40,-49v-18,0,-50,11,-50,62r0,103r-32,0r0,-188r30,0v1,8,-2,20,1,26v7,-10,25,-32,57,-32v29,0,66,12,66,66xm140,-260r18,0v-3,36,-34,46,-67,31v-23,-11,-31,-8,-38,11r-18,0v1,-35,41,-48,70,-30v16,10,35,3,35,-12","k":{"v":7,"w":7,"y":5,"\u00fd":5,"\u00ff":5,"u":4,"\u00fa":4,"\u00fb":4,"\u00fc":4,"\u00f9":4,"\u201d":20,"\u2019":20}},"\u00f3":{"d":"100,5v-118,-1,-116,-198,0,-199v118,1,118,198,0,199xm45,-94v0,25,10,72,55,72v45,0,55,-47,55,-72v0,-25,-10,-72,-55,-72v-45,0,-55,47,-55,72xm155,-264r-47,51r-24,0r32,-51r39,0","k":{".":14,",":14,"v":5,"w":5,"y":11,"\u00fd":11,"\u00ff":11,"\u201c":11,"\u201d":11,"\u2019":11,"x":11}},"\u00f4":{"d":"100,5v-118,-1,-116,-198,0,-199v118,1,118,198,0,199xm45,-94v0,25,10,72,55,72v45,0,55,-47,55,-72v0,-25,-10,-72,-55,-72v-45,0,-55,47,-55,72xm100,-247r-24,34r-28,0r36,-51r33,0r36,51r-29,0","k":{".":14,",":14,"v":5,"w":5,"y":11,"\u00fd":11,"\u00ff":11,"\u201c":11,"\u201d":11,"\u2019":11,"x":11}},"\u00f6":{"d":"100,5v-118,-1,-116,-198,0,-199v118,1,118,198,0,199xm45,-94v0,25,10,72,55,72v45,0,55,-47,55,-72v0,-25,-10,-72,-55,-72v-45,0,-55,47,-55,72xm87,-254r0,37r-32,0r0,-37r32,0xm146,-254r0,37r-33,0r0,-37r33,0","k":{".":14,",":14,"v":5,"w":5,"y":11,"\u00fd":11,"\u00ff":11,"\u201c":11,"\u201d":11,"\u2019":11,"x":11}},"\u00f2":{"d":"100,5v-118,-1,-116,-198,0,-199v118,1,118,198,0,199xm45,-94v0,25,10,72,55,72v45,0,55,-47,55,-72v0,-25,-10,-72,-55,-72v-45,0,-55,47,-55,72xm92,-213r-47,-51r39,0r32,51r-24,0","k":{".":14,",":14,"v":5,"w":5,"y":11,"\u00fd":11,"\u00ff":11,"\u201c":11,"\u201d":11,"\u2019":11,"x":11}},"\u00f5":{"d":"100,5v-118,-1,-116,-198,0,-199v118,1,118,198,0,199xm45,-94v0,25,10,72,55,72v45,0,55,-47,55,-72v0,-25,-10,-72,-55,-72v-45,0,-55,47,-55,72xm144,-260r18,0v-2,35,-35,46,-67,31v-23,-11,-32,-7,-39,11r-17,0v0,-36,40,-48,70,-30v16,10,35,3,35,-12","k":{".":14,",":14,"v":5,"w":5,"y":11,"\u00fd":11,"\u00ff":11,"\u201c":11,"\u201d":11,"\u2019":11,"x":11}},"\u0161":{"d":"161,-135r-31,0v0,-12,-4,-31,-44,-31v-10,0,-38,3,-38,26v0,24,43,27,66,33v39,10,53,24,53,50v0,39,-32,62,-74,62v-75,0,-80,-42,-81,-65r30,0v1,15,5,38,50,38v23,0,43,-9,43,-30v0,-44,-117,-18,-117,-82v0,-41,34,-60,71,-60v67,0,72,50,72,59xm66,-264r24,33r24,-33r29,0r-36,51r-34,0r-35,-51r28,0","w":180,"k":{".":5,",":5,"v":7,"w":11,"y":7,"\u00fd":7,"\u00ff":7,"\u2019":18}},"\u00fa":{"d":"176,0r-30,0v-1,-9,2,-21,-1,-28v-23,48,-121,50,-121,-25r0,-135r32,0r0,125v0,31,16,41,37,41v76,0,44,-96,51,-166r32,0r0,188xm155,-264r-47,51r-24,0r32,-51r39,0","k":{"\u2019":9}},"\u00fb":{"d":"176,0r-30,0v-1,-9,2,-21,-1,-28v-23,48,-121,50,-121,-25r0,-135r32,0r0,125v0,31,16,41,37,41v76,0,44,-96,51,-166r32,0r0,188xm100,-247r-24,34r-28,0r36,-51r33,0r36,51r-29,0","k":{"\u2019":9}},"\u00fc":{"d":"176,0r-30,0v-1,-9,2,-21,-1,-28v-23,48,-121,50,-121,-25r0,-135r32,0r0,125v0,31,16,41,37,41v76,0,44,-96,51,-166r32,0r0,188xm87,-254r0,37r-32,0r0,-37r32,0xm146,-254r0,37r-33,0r0,-37r33,0","k":{"\u2019":9}},"\u00f9":{"d":"176,0r-30,0v-1,-9,2,-21,-1,-28v-23,48,-121,50,-121,-25r0,-135r32,0r0,125v0,31,16,41,37,41v76,0,44,-96,51,-166r32,0r0,188xm92,-213r-47,-51r39,0r32,51r-24,0","k":{"\u2019":9}},"\u00fd":{"d":"90,-35v19,-49,33,-103,51,-153r35,0r-68,184v-33,83,-34,85,-87,78r0,-29v30,7,37,9,53,-40r-70,-193r36,0xm145,-264r-47,51r-24,0r32,-51r39,0","w":180,"k":{".":36,",":36,"c":7,"\u00e7":7,"d":7,"\u0131":7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"-":14,"a":7,"\u00e6":7,"\u00e1":7,"\u00e2":7,"\u00e4":7,"\u00e0":7,"\u00e5":7,"\u00e3":7,"s":7,"\u0161":7}},"\u00ff":{"d":"90,-35v19,-49,33,-103,51,-153r35,0r-68,184v-33,83,-34,85,-87,78r0,-29v30,7,37,9,53,-40r-70,-193r36,0xm77,-254r0,37r-32,0r0,-37r32,0xm136,-254r0,37r-33,0r0,-37r33,0","w":180,"k":{".":36,",":36,"c":7,"\u00e7":7,"d":7,"\u0131":7,"e":7,"\u00e9":7,"\u00ea":7,"\u00eb":7,"\u00e8":7,"g":7,"o":7,"\u00f8":7,"\u0153":7,"\u00f3":7,"\u00f4":7,"\u00f6":7,"\u00f2":7,"\u00f5":7,"-":14,"a":7,"\u00e6":7,"\u00e1":7,"\u00e2":7,"\u00e4":7,"\u00e0":7,"\u00e5":7,"\u00e3":7,"s":7,"\u0161":7}},"\u017e":{"d":"166,-162r-113,136r116,0r0,26r-158,0r0,-25r114,-137r-105,0r0,-26r146,0r0,26xm66,-264r24,33r24,-33r29,0r-36,51r-34,0r-35,-51r28,0","w":180,"k":{"e":5,"\u00e9":5,"\u00ea":5,"\u00eb":5,"\u00e8":5,"o":5,"\u00f8":5,"\u0153":5,"\u00f3":5,"\u00f4":5,"\u00f6":5,"\u00f2":5,"\u00f5":5}},"\ufb01":{"d":"94,-162r-31,0r0,162r-32,0r0,-162r-26,0r0,-26r26,0v-6,-51,10,-82,63,-73r0,28v-30,-8,-34,15,-31,45r31,0r0,26xm156,-188r0,188r-31,0r0,-188r31,0xm156,-222r-31,0r0,-36r31,0r0,36","w":180,"k":{"e":11,"\u00e9":11,"\u00ea":11,"\u00eb":11,"\u00e8":11,"o":11,"\u00f8":11,"\u0153":11,"\u00f3":11,"\u00f4":11,"\u00f6":11,"\u00f2":11,"\u00f5":11,"\u201d":-22,"\u2019":-18,"l":5,"\u0142":5,",":11,".":11,"a":11,"\u00e6":11,"\u00e1":11,"\u00e2":11,"\u00e4":11,"\u00e0":11,"\u00e5":11,"\u00e3":11,"f":14,"\u00df":14,"\ufb01":14,"\ufb02":14,"i":5,"\u00ed":5,"\u00ee":5,"\u00ef":5,"\u00ec":5,"t":14}},"\ufb02":{"d":"94,-162r-31,0r0,162r-32,0r0,-162r-26,0r0,-26r26,0v-6,-51,10,-82,63,-73r0,28v-30,-8,-34,15,-31,45r31,0r0,26xm156,-258r0,258r-32,0r0,-258r32,0","w":180,"k":{"e":11,"\u00e9":11,"\u00ea":11,"\u00eb":11,"\u00e8":11,"o":11,"\u00f8":11,"\u0153":11,"\u00f3":11,"\u00f4":11,"\u00f6":11,"\u00f2":11,"\u00f5":11,"\u201d":-22,"\u2019":-18,"l":5,"\u0142":5,",":11,".":11,"a":11,"\u00e6":11,"\u00e1":11,"\u00e2":11,"\u00e4":11,"\u00e0":11,"\u00e5":11,"\u00e3":11,"f":14,"\u00df":14,"\ufb01":14,"\ufb02":14,"i":5,"\u00ed":5,"\u00ee":5,"\u00ef":5,"\u00ec":5,"t":14}},"\u00b9":{"d":"54,-208r-39,0r0,-16v27,-2,39,-4,45,-29r20,0r0,152r-26,0r0,-107","w":119},"\u00b2":{"d":"28,-199r-21,0v0,-49,39,-54,57,-54v30,0,52,17,52,45v0,48,-73,53,-88,85r88,0r0,22r-115,0v1,-43,31,-56,59,-72v19,-10,31,-15,31,-35v0,-11,-6,-24,-30,-24v-30,0,-32,24,-33,33","w":119},"\u00b3":{"d":"2,-148r24,0v1,13,4,30,31,30v21,0,35,-8,35,-26v0,-30,-26,-26,-46,-26r0,-18v21,1,40,-1,40,-24v0,-8,-4,-20,-29,-20v-24,0,-28,16,-29,29r-22,0v0,-22,11,-50,54,-50v52,0,66,58,30,71v44,18,34,85,-33,85v-34,0,-55,-24,-55,-51","w":119},"\u2206":{"d":"163,-30r-60,-153r-69,153r129,0xm0,0r115,-253r101,253r-216,0","w":216},"\u2126":{"d":"17,-25v17,-1,38,2,53,-1v-25,-22,-48,-59,-48,-109v0,-69,46,-120,108,-120v66,0,106,58,106,118v1,52,-26,89,-49,112r54,0r0,25r-88,0r0,-18v27,-17,52,-55,52,-113v0,-46,-25,-98,-75,-98v-47,0,-77,44,-77,99v0,54,25,95,52,112r0,18r-88,0r0,-25","w":258},"\u03bc":{"d":"176,0r-30,0v-1,-9,2,-21,-1,-28v-15,30,-57,46,-89,21r0,82r-32,0r0,-263r32,0r0,125v0,31,16,41,37,41v76,0,44,-96,51,-166r32,0r0,188","w":208},"\u03c0":{"d":"198,-161r-29,0v1,48,-4,125,5,161r-29,0v-11,-30,-4,-115,-6,-161r-62,0v-2,45,-13,126,-26,161r-30,0v13,-39,24,-114,26,-161v-22,0,-32,1,-40,4r-4,-19v41,-19,137,-7,198,-10","w":207},"\u0410":{"d":"198,0r-28,-78r-101,0r-27,78r-37,0r97,-258r39,0r94,258r-37,0xm161,-106r-41,-114r-41,114r82,0","w":240,"k":{"\u045e":20,"\u0443":20,"\u0441":7,"\u0435":7,"\u040e":45,"\u0404":14,"\u0427":36,"\u0423":45,"\u0422":34,"\u0421":14,"\u041e":14,"\u201d":61,"-":14,"\u2019":61}},"\u0411":{"d":"27,0r0,-258r171,0r0,30r-137,0r0,76r76,0v60,0,89,29,89,76v0,46,-30,76,-82,76r-117,0xm61,-122r0,92v56,-4,128,18,128,-46v0,-60,-72,-44,-128,-46","w":240,"k":{"\u0423":20,"\u0410":5,".":9,",":9}},"\u0412":{"d":"27,-258v83,3,186,-19,186,65v0,18,-8,43,-34,54v21,7,47,24,47,63v0,34,-23,76,-90,76r-109,0r0,-258xm61,-30v54,1,139,6,130,-45v8,-51,-76,-47,-130,-45r0,90xm61,-148r65,0v45,0,53,-19,53,-42v0,-46,-71,-38,-118,-38r0,80","w":240,"k":{"\u0425":7,"\u0423":18,"\u0410":5}},"\u0413":{"d":"27,0r0,-258r152,0r0,30r-118,0r0,228r-34,0","w":186,"k":{"\u0459":90,"\u0454":94,"\u0451":36,"\u044f":90,"\u044d":90,"\u0443":101,"\u0441":94,"\u043e":94,"\u043b":90,"\u0438":90,"\u0437":90,"\u0435":94,"\u0434":101,"\u0430":97,"\u042f":27,"\u041e":20,"\u0414":45,"\u0410":72,".":90,",":90}},"\u0490":{"d":"27,0r0,-258r136,0r0,-50r30,0r0,80r-132,0r0,228r-34,0"},"\u0414":{"d":"30,-30v21,-30,31,-185,30,-228r153,0r0,228r26,0r0,85r-32,0r0,-55r-168,0r0,55r-33,0r0,-85r24,0xm92,-228v-1,63,-10,160,-26,198r112,0r0,-198r-86,0","w":240},"\u0415":{"d":"27,0r0,-258r188,0r0,30r-154,0r0,80r142,0r0,30r-142,0r0,88r157,0r0,30r-191,0","w":240},"\u0416":{"d":"198,-258r0,110r10,0r100,-110r49,0r-116,123r116,135r-49,0r-100,-118r-10,0r0,118r-35,0r0,-118r-11,0r-100,118r-48,0r118,-134r-117,-124r46,0r101,110r11,0r0,-110r35,0","w":360,"k":{"\u0454":7,"\u0451":14,"\u044d":7,"\u0443":25,"\u043e":14,"\u0435":14,"\u0430":7}},"\u0417":{"d":"96,-122r0,-28v39,5,70,-10,70,-40v0,-32,-26,-45,-53,-45v-39,0,-59,27,-62,58r-32,0v5,-67,50,-88,95,-88v46,0,85,24,85,71v0,27,-9,46,-35,55v27,8,46,29,46,66v0,53,-50,79,-97,79v-54,0,-97,-22,-103,-81r34,0v4,28,22,51,66,51v36,0,65,-14,65,-51v0,-36,-34,-52,-79,-47","w":219},"\u0418":{"d":"27,0r0,-258r34,0r1,209r131,-209r40,0r0,258r-34,0r-1,-210r-131,210r-40,0","w":259},"\u0419":{"d":"75,-325r17,0v7,39,69,38,76,0r17,0v-3,27,-19,50,-55,50v-36,0,-52,-23,-55,-50xm27,0r0,-258r34,0r1,209r131,-209r40,0r0,258r-34,0r-1,-210r-131,210r-40,0","w":259},"\u041a":{"d":"27,0r0,-258r34,0r0,126r126,-126r48,0r-107,104r110,154r-44,0r-91,-130r-42,40r0,90r-34,0","w":240,"k":{"\u045e":18,"\u0454":9,"\u0451":9,"\u0443":25,"\u043e":9,"\u0435":9,"\u0404":20,"\u0421":20,"\u041e":20}},"\u041b":{"d":"174,0r0,-228r-80,0v-3,60,-10,119,-10,177v0,35,-34,70,-78,53r0,-30v38,12,44,1,47,-70v3,-65,4,-115,5,-160r150,0r0,258r-34,0","w":233},"\u041c":{"d":"27,0r0,-258r49,0r74,217r73,-217r50,0r0,258r-33,0r0,-217r-73,217r-35,0r-73,-217r0,217r-32,0","w":299},"\u041d":{"d":"27,0r0,-258r34,0r0,106r138,0r0,-106r34,0r0,258r-34,0r0,-122r-138,0r0,122r-34,0","w":259},"\u041e":{"d":"266,-129v0,67,-40,135,-126,135v-86,0,-126,-68,-126,-135v0,-80,46,-136,126,-136v80,0,126,56,126,136xm231,-129v0,-62,-33,-106,-91,-106v-58,0,-91,44,-91,106v0,63,29,105,91,105v62,0,91,-42,91,-105","w":280,"k":{"\u040e":27,"\u0425":20,"\u0423":27,"\u0422":14,"\u0410":14}},"\u041f":{"d":"27,0r0,-258r206,0r0,258r-34,0r0,-228r-138,0r0,228r-34,0","w":259},"\u0420":{"d":"61,-138v53,-1,129,11,123,-45v6,-56,-70,-44,-123,-45r0,90xm27,0r0,-258r108,0v57,0,83,30,83,75v0,45,-26,76,-83,76r-74,0r0,107r-34,0","w":240,"k":{"\u0454":18,"\u0451":20,"\u0441":20,"\u043e":20,"\u0435":20,"\u0430":20,"\u040e":27,"\u0404":9,"\u0427":7,"\u0423":27,"\u0410":47,".":68,"-":20,",":68}},"\u0421":{"d":"49,-130v0,65,34,106,85,106v44,0,70,-35,75,-69r33,0v-5,45,-40,99,-108,99v-47,0,-120,-25,-120,-132v0,-105,64,-139,121,-139v71,0,102,47,105,83r-33,0v-32,-93,-158,-55,-158,52","w":259,"k":{"\u0410":14,".":36,",":27}},"\u0422":{"d":"5,-228r0,-30r210,0r0,30r-88,0r0,228r-34,0r0,-228r-88,0","w":219,"k":{"\u045e":18,"\u0456":7,"\u0454":58,"\u0451":36,"\u0443":65,"\u0441":65,"\u043e":65,"\u0438":65,"\u0435":65,"\u0430":68,"\u0404":14,"\u041e":14,"\u0410":34,";":54,":":54,".":61,"-":76,",":61}},"\u0423":{"d":"45,1r0,-35v12,11,69,7,60,-17v0,-6,0,-11,-8,-26r-89,-181r41,0r80,172r70,-172r39,0r-85,193v-24,60,-49,81,-108,66","w":240,"k":{"\u0456":9,"\u0453":36,"\u0451":36,"\u0442":18,"\u043e":47,"\u0438":36,"\u0435":47,"\u0433":36,"\u0430":54,"\u0405":18,"\u041e":20,"\u0410":43,";":36,":":36,".":90,"-":45,",":90}},"\u0424":{"d":"236,-129v0,-46,-30,-73,-79,-73r0,145v49,0,79,-26,79,-72xm123,0r0,-31v-60,0,-111,-32,-111,-98v0,-66,51,-99,111,-99r0,-30r34,0r0,30v60,0,112,33,112,99v0,66,-52,98,-112,98r0,31r-34,0xm44,-129v0,46,30,72,79,72r0,-145v-49,0,-79,27,-79,73","w":280,"k":{"\u0423":14,"\u0410":27,".":36}},"\u0425":{"d":"49,0r-43,0r92,-132r-86,-126r42,0r66,99r65,-99r43,0r-87,126r92,132r-43,0r-70,-106","w":240,"k":{"\u041e":20}},"\u0426":{"d":"27,0r0,-258r34,0r0,228r138,0r0,-228r34,0r0,228r22,0r0,85r-33,0r0,-55r-195,0","w":259},"\u0427":{"d":"173,0r0,-107v-58,17,-163,26,-156,-66r0,-85r34,0r0,82v-8,68,82,49,122,39r0,-121r35,0r0,258r-35,0","w":233},"\u0428":{"d":"27,0r0,-258r34,0r0,228r92,0r0,-228r34,0r0,228r92,0r0,-228r34,0r0,258r-286,0","w":339},"\u0429":{"d":"27,0r0,-258r34,0r0,228r92,0r0,-228r34,0r0,228r92,0r0,-228r34,0r0,228r21,0r0,85r-32,0r0,-55r-275,0","w":339},"\u042a":{"d":"92,0r0,-228r-87,0r0,-30r122,0r0,106r68,0v62,0,91,29,91,76v0,46,-30,76,-82,76r-112,0xm127,-122r0,92v55,-3,122,17,122,-46v0,-58,-68,-45,-122,-46","w":299},"\u042b":{"d":"33,0r0,-258r34,0r0,106r69,0v62,0,90,29,90,76v0,46,-29,76,-81,76r-112,0xm67,-30v55,-3,123,17,123,-46v0,-58,-68,-45,-123,-46r0,92xm261,0r0,-258r35,0r0,258r-35,0","w":320},"\u042c":{"d":"32,0r0,-258r35,0r0,106r68,0v62,0,91,29,91,76v0,46,-30,76,-82,76r-112,0xm67,-30v55,-3,122,17,122,-46v0,-58,-68,-45,-122,-46r0,92","w":240},"\u042d":{"d":"117,-118r0,-30r92,0v-3,-39,-25,-87,-83,-87v-35,0,-62,20,-71,53r-33,0v3,-36,34,-83,105,-83v57,0,119,36,119,134v0,109,-72,137,-121,137v-67,0,-102,-54,-107,-99r33,0v5,34,31,69,75,69v35,0,81,-23,83,-94r-92,0","w":259,"k":{"\u0425":20}},"\u042e":{"d":"27,0r0,-258r34,0r0,113r34,0v5,-72,51,-120,125,-120v80,0,126,56,126,136v0,67,-40,135,-126,135v-80,0,-120,-58,-125,-120r-34,0r0,114r-34,0xm311,-129v0,-62,-33,-106,-91,-106v-58,0,-91,44,-91,106v0,63,29,105,91,105v62,0,91,-42,91,-105","w":360,"k":{"\u0425":20}},"\u042f":{"d":"27,-186v0,-97,113,-67,203,-72r0,258r-34,0r0,-110v-59,6,-129,-23,-129,51v0,22,0,45,-9,59r-39,0v27,-31,-7,-112,52,-123v-15,-5,-44,-17,-44,-63xm61,-183v0,25,24,44,60,44r75,0r0,-89r-79,0v-32,-5,-56,18,-56,45","w":260},"\u0401":{"d":"27,0r0,-258r188,0r0,30r-154,0r0,80r142,0r0,30r-142,0r0,88r157,0r0,30r-191,0xm75,-275r0,-37r32,0r0,37r-32,0xm132,-275r0,-37r33,0r0,37r-33,0","w":240},"\u0402":{"d":"202,-258r0,30r-90,0r0,87v26,-13,94,-22,120,9v47,55,32,137,-16,179v-29,25,-61,25,-79,26r0,-30v12,-1,34,-4,56,-20v47,-36,45,-150,-27,-147v-21,0,-37,6,-54,12r0,112r-34,0r0,-228r-73,0r0,-30r197,0","w":273},"\u0403":{"d":"27,0r0,-258r152,0r0,30r-118,0r0,228r-34,0xm83,-275r32,-52r39,0r-47,52r-24,0","w":186,"k":{"\u0451":36,"\u0443":101,"\u043e":94,"\u0437":90,"\u0435":94,"\u0434":101,"\u0430":97,"\u041e":20,"\u0414":45,"\u0410":72,".":90,",":90}},"\u0404":{"d":"209,-93r33,0v-5,45,-40,99,-108,99v-47,0,-120,-25,-120,-132v0,-105,64,-139,121,-139v71,0,102,47,105,83r-33,0v-9,-33,-36,-53,-71,-53v-58,0,-82,48,-85,87r92,0r0,30r-92,0v1,127,147,113,158,25","w":259,"k":{"\u0441":5,"\u0434":36,"\u0425":18,"\u0423":18,"\u0410":14,".":18,",":18}},"\u0405":{"d":"215,-183r-32,0v-2,-29,-22,-52,-64,-52v-41,0,-61,17,-61,45v-1,35,63,40,96,49v47,13,68,33,68,69v0,62,-53,78,-104,78v-70,-1,-102,-40,-101,-90r33,0v0,39,32,60,69,60v37,0,69,-12,69,-43v0,-39,-60,-46,-96,-55v-46,-12,-66,-32,-66,-66v0,-42,30,-77,91,-77v58,0,98,28,98,82","w":240,"k":{"\u0422":7}},"\u0406":{"d":"33,0r0,-258r34,0r0,258r-34,0","w":100,"k":{"\u0435":7,"\u0422":7}},"\u0407":{"d":"33,0r0,-258r34,0r0,258r-34,0xm5,-275r0,-37r32,0r0,37r-32,0xm63,-275r0,-37r32,0r0,37r-32,0","w":100},"\u0408":{"d":"119,-71r0,-187r34,0r0,185v0,64,-37,79,-77,79v-42,0,-77,-30,-70,-89r33,0v-2,35,3,59,38,59v25,0,42,-11,42,-47","w":180,"k":{"\u0430":7,"\u0410":14}},"\u0409":{"d":"172,-228r-78,0r-6,138v4,54,-17,113,-80,92r0,-30v38,10,44,7,46,-63r5,-167r148,0r0,106v76,-6,139,11,139,76v0,46,-30,76,-82,76r-92,0r0,-228xm207,-122r0,92v50,-1,102,10,102,-46v0,-51,-52,-47,-102,-46","w":360,"k":{"\u0423":45,"\u0410":9,".":9,",":9}},"\u040a":{"d":"208,-122r0,92v0,0,96,8,96,-46v0,-49,-47,-48,-96,-46xm27,0r0,-258r34,0r0,106r112,0r0,-106r35,0r0,106v75,-6,133,14,133,76v0,46,-30,76,-82,76r-86,0r0,-122r-112,0r0,122r-34,0","w":360,"k":{"\u0423":45,"\u0410":9,".":18,",":18}},"\u040b":{"d":"79,0r0,-228r-65,0r0,-30r191,0r0,30r-92,0r0,80r66,0v90,-4,80,68,79,148r-34,0v-3,-55,18,-121,-48,-118r-63,0r0,118r-34,0","w":280},"\u040c":{"d":"95,-275r32,-52r40,0r-47,52r-25,0xm27,0r0,-258r34,0r0,126r126,-126r48,0r-107,104r110,154r-44,0r-91,-130r-42,40r0,90r-34,0","w":240,"k":{"\u045e":18,"\u0451":9,"\u0443":25,"\u043e":9,"\u0435":9,"\u041e":20}},"\u040e":{"d":"45,1r0,-35v12,11,69,7,60,-17v0,-6,0,-11,-8,-26r-89,-181r41,0r80,172r70,-172r39,0r-85,193v-24,60,-49,81,-108,66xm64,-325r18,0v7,39,69,38,76,0r17,0v-3,27,-19,50,-55,50v-36,0,-53,-23,-56,-50","w":240,"k":{"\u0456":9,"\u043e":47,"\u0438":36,"\u0435":47,"\u0430":54,"\u041e":20,"\u0410":43,";":36,":":36,".":90,"-":45,",":90}},"\u040f":{"d":"27,0r0,-258r36,0r0,228r134,0r0,-228r36,0r0,258r-86,0r0,55r-34,0r0,-55r-86,0","w":259},"\u0462":{"d":"81,0r0,-188r-76,0r0,-31r76,0r0,-39r35,0r0,39r98,0r0,31r-98,0r0,36r69,0v62,0,90,29,90,76v0,46,-30,76,-82,76r-112,0xm116,-122r0,92v55,-3,122,17,122,-46v0,-58,-68,-45,-122,-46","w":289},"\u0472":{"d":"266,-129v0,67,-40,135,-126,135v-86,0,-126,-68,-126,-135v0,-80,46,-136,126,-136v80,0,126,56,126,136xm231,-118r-182,0v3,57,33,94,91,94v58,0,88,-37,91,-94xm49,-148r182,0v-6,-51,-39,-87,-91,-87v-52,0,-85,36,-91,87","w":280},"\u0474":{"d":"98,0r-92,-258r44,0r67,219r59,-175v10,-39,37,-61,76,-46r0,31v-29,-15,-37,-2,-50,38r-66,191r-38,0","w":240},"\u0430":{"d":"54,-132r-31,0v1,-46,34,-62,78,-62v36,0,71,14,71,52r0,110v0,10,11,13,21,9r0,23v-23,7,-52,2,-51,-25v-25,40,-128,48,-127,-24v1,-62,57,-59,110,-65v10,-1,16,-7,16,-22v0,-23,-15,-32,-43,-32v-28,0,-42,12,-44,36xm140,-96v-21,16,-92,4,-92,43v0,22,14,33,34,33v19,0,58,-14,58,-46r0,-30","k":{"\u045e":7,"\u0443":7,"\u0442":9}},"\u0431":{"d":"100,6v-51,0,-87,-30,-87,-110v0,-30,5,-80,23,-108v22,-33,45,-37,86,-37v15,0,20,-2,23,-12r25,0v1,23,-24,39,-64,39v-36,0,-51,19,-58,61v8,-9,25,-27,59,-27v44,0,81,32,81,93v0,29,-10,101,-88,101xm45,-91v0,21,5,71,55,71v55,0,55,-60,55,-74v0,-35,-14,-68,-54,-68v-39,0,-56,32,-56,71","k":{"\u0443":9,"\u043b":9}},"\u0432":{"d":"27,0r0,-188v62,0,149,-9,149,50v0,17,-9,29,-23,38v20,8,32,21,32,43v0,35,-23,57,-73,57r-85,0xm59,-85r0,59v37,1,101,5,94,-29v6,-34,-56,-31,-94,-30xm59,-162r0,53v34,-1,85,8,84,-26v-2,-40,-48,-24,-84,-27","k":{"\u045e":9,"\u0443":9}},"\u0433":{"d":"24,0r0,-188r110,0r0,28r-78,0r0,160r-32,0","w":139,"k":{"\u0454":14,"\u0451":14,"\u043e":14,"\u043b":18,"\u0435":14,"\u0434":43,"\u0430":14,".":54,",":54}},"\u0491":{"d":"24,0r0,-188r82,0r0,-42r28,0r0,70r-78,0r0,160r-32,0","w":140},"\u0434":{"d":"183,46r0,-46r-139,0r0,46r-30,0r0,-74r25,0v21,-51,28,-105,28,-160r123,0r0,160r23,0r0,74r-30,0xm96,-160v0,30,-17,116,-25,132r86,0r0,-132r-61,0","w":219},"\u0435":{"d":"153,-60r31,0v-5,33,-36,66,-82,66v-50,0,-88,-33,-88,-101v2,-134,175,-130,172,-4r0,16r-137,0v0,37,20,61,53,61v33,0,45,-21,51,-38xm49,-109r105,0v-1,-37,-21,-57,-52,-57v-30,0,-51,24,-53,57","k":{"\u045e":7,"\u0456":7,"\u0445":14,"\u0443":7,"\u0434":18,".":9,",":9}},"\u0436":{"d":"157,-188r0,77r9,0r69,-77r39,0r-81,89r84,99r-40,0r-71,-86r-9,0r0,86r-32,0r0,-86r-10,0r-71,86r-40,0r85,-99r-81,-89r39,0r68,77r10,0r0,-77r32,0","w":280,"k":{"\u0454":14,"\u0451":14,"\u043e":14,"\u0435":14,"\u0430":7}},"\u0437":{"d":"72,-85r0,-27v25,1,57,-1,57,-26v0,-15,-13,-28,-38,-28v-13,0,-38,5,-42,35r-31,0v5,-50,45,-63,74,-63v33,0,69,17,69,55v1,23,-16,30,-31,38v13,3,37,15,37,45v0,42,-39,62,-76,62v-48,0,-79,-26,-82,-64r32,0v3,50,96,46,94,3v4,-22,-31,-36,-63,-30","w":180},"\u0438":{"d":"22,0r0,-188r33,0r0,140r86,-140r37,0r0,188r-33,0r0,-141r-86,141r-37,0"},"\u0439":{"d":"22,0r0,-188r33,0r0,140r86,-140r37,0r0,188r-33,0r0,-141r-86,141r-37,0xm45,-265r17,0v7,39,69,38,76,0r18,0v-3,27,-20,50,-56,50v-36,0,-52,-23,-55,-50"},"\u043a":{"d":"27,0r0,-188r32,0r0,89r95,-89r43,0r-83,76r84,112r-42,0r-65,-91r-32,30r0,61r-32,0","k":{"\u0454":11,"\u0451":14,"\u0441":14,"\u043e":14,"\u0435":14}},"\u043b":{"d":"150,0r0,-160r-73,0v-3,70,7,195,-72,160r0,-26v26,11,33,1,36,-50r4,-112r138,0r0,188r-33,0","w":206},"\u043c":{"d":"24,0r0,-188r47,0r50,154r51,-154r44,0r0,188r-30,0r-1,-152r-50,152r-31,0r-50,-152r0,152r-30,0","w":239},"\u043d":{"d":"24,0r0,-188r32,0r0,76r88,0r0,-76r32,0r0,188r-32,0r0,-84r-88,0r0,84r-32,0"},"\u043e":{"d":"155,-94v0,-42,-19,-72,-55,-72v-36,0,-55,30,-55,72v0,42,19,72,55,72v36,0,55,-30,55,-72xm188,-94v0,62,-33,100,-88,100v-55,0,-87,-38,-87,-100v0,-61,32,-100,87,-100v55,0,88,39,88,100","k":{"\u045e":7,"\u0456":7,"\u0447":9,"\u0445":14,"\u0443":7,"\u043b":14,"\u0436":18,"\u0434":18,"\u0430":7}},"\u043f":{"d":"144,0r0,-160r-88,0r0,160r-32,0r0,-188r152,0r0,188r-32,0"},"\u0440":{"d":"22,74r0,-262r32,0v1,8,-2,20,1,26v33,-59,133,-33,133,61v0,77,-33,107,-83,107v-26,1,-43,-16,-51,-27r0,95r-32,0xm54,-93v0,41,16,71,50,71v36,0,51,-30,51,-71v0,-42,-15,-73,-51,-73v-34,0,-50,31,-50,73","k":{"\u045e":7,"\u0443":7,"\u0436":18,"\u0434":18,"\u0430":7}},"\u0441":{"d":"141,-66r31,0v-3,28,-20,72,-81,72v-33,0,-78,-23,-78,-99v0,-62,37,-101,81,-101v59,0,76,40,78,69r-31,0v-3,-26,-17,-41,-43,-41v-36,0,-53,31,-53,75v0,85,85,94,96,25","w":180,"k":{"\u045e":4,"\u0443":4}},"\u0442":{"d":"74,0r0,-160r-65,0r0,-28r162,0r0,28r-65,0r0,160r-32,0","w":180,"k":{"\u043b":18,"\u0430":14,".":54,",":54}},"\u0443":{"d":"74,5r-70,-193r36,0r50,153r50,-153r36,0r-72,196v-25,67,-34,72,-83,66r0,-29v15,5,39,4,42,-13","w":180,"k":{"\u0455":7,"\u0451":7,"\u0441":7,"\u043e":7,"\u0435":7,"\u0434":45,"\u0430":14,".":41,"-":14,",":41}},"\u0444":{"d":"92,-20v39,0,42,-45,42,-91v0,-36,-19,-55,-41,-55v-35,0,-48,33,-48,72v0,32,9,74,47,74xm134,74r-1,-97v-13,24,-30,29,-48,29v-37,0,-73,-35,-73,-101v0,-49,21,-99,72,-99v27,-1,40,17,50,28r0,-92r32,0r1,92v8,-12,22,-28,48,-28v51,0,72,50,72,99v0,66,-35,101,-72,101v-19,0,-34,-7,-49,-29r0,97r-32,0xm207,-20v69,0,64,-146,0,-146v-34,0,-41,45,-41,91v0,35,15,55,41,55","w":299,"k":{"\u0443":18}},"\u0445":{"d":"136,0r-48,-70r-44,70r-40,0r65,-96r-62,-92r41,0r44,65r43,-65r39,0r-64,92r66,96r-40,0","w":180,"k":{"\u0454":14,"\u0451":14,"\u0441":14,"\u043e":14,"\u0435":14,"\u0430":7,"-":34}},"\u0446":{"d":"24,0r0,-188r32,0r0,160r88,0r0,-160r32,0r0,160r18,0r0,74r-30,0r0,-46r-140,0"},"\u0447":{"d":"137,0r0,-76v-60,10,-125,5,-121,-54r0,-58r33,0v1,49,-12,96,49,90v10,0,29,-1,39,-5r0,-85r33,0r0,188r-33,0","w":193},"\u0448":{"d":"24,0r0,-188r32,0r0,160r68,0r0,-160r32,0r0,160r68,0r0,-160r32,0r0,188r-232,0","w":280},"\u0449":{"d":"244,46r0,-46r-220,0r0,-188r32,0r0,160r68,0r0,-160r32,0r0,160r68,0r0,-160r32,0r0,160r18,0r0,74r-30,0","w":280},"\u044a":{"d":"64,0r0,-160r-59,0r0,-28r91,0r0,71v60,-4,118,4,118,58v0,36,-25,59,-66,59r-84,0xm96,-91r0,65v39,-1,85,8,85,-33v0,-38,-47,-32,-85,-32","w":219},"\u044b":{"d":"204,0r0,-188r32,0r0,188r-32,0xm24,0r0,-188r32,0r0,71v61,-4,122,0,122,58v0,36,-24,59,-65,59r-89,0xm56,-91r0,65v40,-1,90,9,90,-33v0,-39,-51,-31,-90,-32","w":259},"\u044c":{"d":"24,0r0,-188r32,0r0,71v60,-4,118,2,118,58v0,36,-25,59,-66,59r-84,0xm56,-91r0,65v39,-1,85,8,85,-33v0,-38,-47,-32,-85,-32","w":180},"\u044d":{"d":"68,-80r0,-26r65,0v-3,-38,-20,-60,-50,-60v-28,0,-41,19,-45,37r-31,0v6,-45,43,-65,77,-65v54,0,83,41,83,99v0,59,-29,101,-83,101v-40,0,-70,-22,-79,-68r33,0v3,23,20,40,44,40v34,0,51,-32,51,-58r-65,0","w":180},"\u044e":{"d":"235,-94v0,-42,-19,-72,-55,-72v-36,0,-55,30,-55,72v0,42,19,72,55,72v36,0,55,-30,55,-72xm24,0r0,-188r32,0r0,79r37,0v5,-53,37,-85,87,-85v55,0,87,39,87,100v0,62,-32,100,-87,100v-51,0,-83,-34,-87,-89r-37,0r0,83r-32,0","w":280,"k":{"\u045e":7,"\u0443":7,"\u043b":14,"\u0436":14,"\u0434":18}},"\u044f":{"d":"19,-134v3,-71,89,-51,158,-54r0,188r-33,0r0,-75v-38,4,-88,-14,-88,30v0,18,0,25,-6,45r-36,0v6,-2,10,-36,11,-52v2,-25,7,-30,25,-37v-20,-7,-31,-22,-31,-45xm144,-160v-40,2,-98,-10,-93,29v6,47,52,26,93,31r0,-60"},"\u0451":{"d":"153,-60r31,0v-5,33,-36,66,-82,66v-50,0,-88,-33,-88,-101v2,-134,175,-130,172,-4r0,16r-137,0v0,37,20,61,53,61v33,0,45,-21,51,-38xm49,-109r105,0v-1,-37,-21,-57,-52,-57v-30,0,-51,24,-53,57xm55,-220r0,-36r32,0r0,36r-32,0xm113,-220r0,-36r32,0r0,36r-32,0","k":{"\u0445":14,"\u0443":7,".":9,",":9}},"\u0452":{"d":"40,0r0,-181r-35,0r0,-28r35,0r0,-49r32,0r0,49r82,0r0,28r-82,0r0,50v9,-6,25,-16,47,-16v63,0,65,72,65,98v0,49,-10,119,-80,123r0,-28v40,-7,48,-43,48,-92v0,-34,-3,-73,-40,-73v-20,0,-35,12,-40,16r0,103r-32,0"},"\u0453":{"d":"24,0r0,-188r110,0r0,28r-78,0r0,160r-32,0xm45,-213r32,-52r40,0r-48,52r-24,0","w":139,"k":{"\u0451":14,"\u043e":14,"\u043b":18,"\u0435":14,"\u0434":43,"\u0430":14,".":54,",":54}},"\u0454":{"d":"142,-62r33,0v-9,46,-39,68,-79,68v-54,0,-83,-42,-83,-101v0,-58,29,-99,83,-99v34,0,71,20,77,65r-31,0v-4,-18,-17,-37,-45,-37v-30,0,-47,22,-50,60r65,0r0,26r-65,0v0,26,17,58,51,58v24,0,41,-17,44,-40","w":180},"\u0455":{"d":"13,-59r30,0v1,28,21,39,50,39v29,0,44,-13,44,-31v0,-42,-118,-17,-118,-83v0,-39,30,-60,70,-60v46,0,73,26,73,59r-31,0v-2,-21,-16,-33,-44,-33v-24,0,-38,11,-38,28v0,44,118,15,118,82v0,34,-24,64,-75,64v-47,0,-78,-19,-79,-65","w":180,"k":{"\u2019":18}},"\u0456":{"d":"24,-220r0,-36r32,0r0,36r-32,0xm24,0r0,-188r32,0r0,188r-32,0","w":79},"\u0457":{"d":"24,0r0,-188r32,0r0,188r-32,0xm-5,-220r0,-36r32,0r0,36r-32,0xm53,-220r0,-36r32,0r0,36r-32,0","w":79},"\u0458":{"d":"-6,73r0,-27v22,1,30,-4,30,-22r0,-212r32,0r0,214v3,32,-19,53,-62,47xm24,-220r0,-36r32,0r0,36r-32,0","w":79},"\u0459":{"d":"148,0r0,-160r-71,0v-4,69,10,194,-72,160r0,-26v27,10,33,2,36,-50r4,-112r135,0r0,71v59,-4,112,6,112,58v0,36,-25,59,-66,59r-78,0xm180,-91r0,65v0,0,79,6,79,-33v0,-36,-42,-33,-79,-32","w":304},"\u045a":{"d":"144,0r0,-91r-88,0r0,91r-32,0r0,-188r32,0r0,71r88,0r0,-71r32,0r0,71v58,-4,110,7,110,58v0,36,-25,59,-66,59r-76,0xm176,-91r0,65v37,0,77,6,77,-33v0,-36,-41,-33,-77,-32","w":297},"\u045b":{"d":"149,0v-3,-47,15,-121,-31,-121v-13,0,-28,6,-46,20r0,101r-32,0r0,-181r-35,0r0,-28r35,0r0,-49r32,0r0,49r82,0r0,28r-82,0r0,52v26,-28,109,-29,109,37r0,92r-32,0","k":{"\u0443":7}},"\u045c":{"d":"27,0r0,-188r32,0r0,89r95,-89r43,0r-83,76r84,112r-42,0r-65,-91r-32,30r0,61r-32,0xm83,-213r32,-52r39,0r-47,52r-24,0","k":{"\u0451":14,"\u043e":14,"\u0435":14}},"\u045e":{"d":"74,5r-70,-193r36,0r50,153r50,-153r36,0r-72,196v-25,67,-34,72,-83,66r0,-29v15,5,39,4,42,-13xm35,-265r17,0v7,39,69,38,76,0r17,0v-3,27,-19,50,-55,50v-36,0,-52,-23,-55,-50","w":180,"k":{"\u043e":7,"\u0435":7,"\u0430":14,".":41,",":41}},"\u045f":{"d":"24,0r0,-188r32,0r0,160r88,0r0,-160r32,0r0,188r-60,0r0,46r-32,0r0,-46r-60,0"},"\u0463":{"d":"64,0r0,-160r-59,0r0,-28r59,0r0,-70r32,0r0,70r59,0r0,28r-59,0r0,43v60,-4,118,2,118,58v0,36,-25,59,-66,59r-84,0xm181,-59v0,-41,-47,-31,-85,-32r0,65v39,-1,85,9,85,-33","w":219},"\u0473":{"d":"154,-80r-108,0v4,35,22,58,54,58v32,0,50,-23,54,-58xm46,-106r108,0v-3,-36,-22,-60,-54,-60v-32,0,-51,24,-54,60xm188,-94v0,62,-33,100,-88,100v-55,0,-87,-38,-87,-100v0,-61,32,-100,87,-100v55,0,88,39,88,100"},"\u0475":{"d":"66,0r-65,-188r33,0r51,156r40,-126v10,-34,34,-42,63,-32r0,26v-18,-10,-31,0,-38,20r-51,144r-33,0","w":180},"\u04d9":{"d":"48,-128r-32,0v5,-33,36,-66,82,-66v50,0,88,33,88,101v-2,134,-175,130,-172,4r0,-16r138,0v0,-37,-20,-61,-53,-61v-33,0,-45,21,-51,38xm152,-80r-106,0v1,37,22,58,53,58v30,0,51,-25,53,-58"},"\u20ac":{"d":"195,-226r-12,34v-9,-18,-27,-33,-58,-33v-37,0,-52,34,-55,65r102,0r-8,26r-95,0r0,26r86,0r-9,26r-75,0v3,37,25,60,52,60v27,0,54,-16,60,-25r0,35v-3,3,-26,19,-57,19v-51,0,-81,-31,-89,-89r-28,0r9,-26r17,0r0,-26r-26,0r9,-26r18,0v6,-59,36,-93,91,-93v32,0,57,12,68,27"},"\u2113":{"d":"154,-53r14,12v-17,31,-40,46,-68,46v-42,-1,-60,-31,-61,-69v-6,5,-13,11,-20,16r-9,-17r29,-25r0,-96v0,-65,29,-88,57,-88v31,0,45,27,45,59v0,45,-29,88,-73,131v-3,39,15,65,38,65v22,0,39,-18,48,-34xm96,-251v-34,0,-28,93,-28,138v30,-33,53,-68,53,-101v0,-22,-7,-37,-25,-37","w":176},"\u2116":{"d":"253,-136v0,27,13,47,36,47v23,0,37,-20,37,-47v0,-27,-14,-48,-37,-48v-23,0,-36,21,-36,48xm220,-136v0,-49,32,-74,69,-74v37,0,70,25,70,74v0,49,-33,73,-70,73v-37,0,-69,-24,-69,-73xm228,-11r0,-28r123,0r0,28r-123,0xm4,0r0,-258r38,0r122,207r0,-207r33,0r0,258r-38,0r-122,-207r0,207r-33,0","w":360},"\u212e":{"d":"65,-47v36,62,144,58,185,3r20,0v-26,30,-68,50,-114,50v-80,0,-144,-57,-144,-129v0,-72,64,-130,144,-130v81,1,146,58,145,133r-236,2r0,71xm248,-200v-36,-57,-135,-58,-179,-7v-8,18,-5,59,-2,81r179,0v6,-20,0,-51,2,-74","w":313},"\u2202":{"d":"81,-253v68,0,98,74,98,128v0,42,-8,131,-92,131v-109,0,-100,-164,-1,-162v15,0,41,4,57,24v1,-40,-8,-94,-59,-94v-21,0,-39,11,-47,19r-19,-22v15,-12,33,-24,63,-24xm92,-128v-38,0,-49,28,-49,53v0,39,21,53,46,53v39,0,54,-41,53,-83v-7,-8,-26,-23,-50,-23"},"\u220f":{"d":"243,-223r-39,0r0,258r-29,0r0,-258r-97,0r0,258r-30,0r0,-258r-39,0r0,-27r234,0r0,27","w":252},"\u2211":{"d":"191,35r-183,0r0,-20r95,-123r-91,-121r0,-21r174,0r0,25v-43,2,-94,-4,-132,2r84,111r-92,118r145,0r0,29","w":199},"\u2219":{"d":"50,-113v11,0,23,9,23,22v0,12,-10,23,-23,23v-12,0,-22,-11,-22,-23v0,-13,10,-22,22,-22","w":100},"\u221a":{"d":"25,-27r-12,-31r41,-24r36,95r44,-266r32,0r-55,327r-30,0r-42,-109","w":185},"\u221e":{"d":"147,-71v-19,19,-36,38,-66,38v-34,0,-60,-24,-60,-61v0,-40,29,-62,59,-62v33,0,52,24,67,42v17,-20,36,-42,67,-42v27,0,58,19,58,62v0,36,-23,62,-58,62v-27,0,-46,-16,-67,-39xm167,-93v19,21,33,28,47,28v10,0,27,-6,27,-29v0,-21,-15,-29,-28,-29v-10,0,-22,4,-46,30xm127,-93v-5,-7,-38,-34,-48,-30v-13,0,-26,10,-26,29v1,49,63,22,74,1","w":293},"\u222b":{"d":"50,-215v0,-65,22,-103,74,-87r-4,21v-37,-11,-43,21,-43,69v0,57,5,119,5,179v0,68,-22,102,-77,86r5,-22v37,10,45,-12,45,-65v0,-60,-5,-124,-5,-181","w":130},"\u2248":{"d":"146,-101v-36,0,-90,-51,-108,1r-13,-25v10,-18,23,-32,45,-32v26,0,55,26,77,26v15,0,24,-16,31,-27r13,26v-12,16,-23,31,-45,31xm146,-26v-38,0,-90,-52,-108,2r-13,-26v10,-18,23,-31,45,-31v25,0,55,24,77,25v15,0,24,-15,31,-26r13,25v-12,16,-23,31,-45,31","w":216},"\u2260":{"d":"17,-38r0,-30r62,0r23,-46r-85,0r0,-30r101,0r20,-38r34,0r-20,38r47,0r0,30r-62,0r-24,46r86,0r0,30r-101,0r-20,38r-34,0r19,-38r-46,0","w":216},"\u2264":{"d":"199,-60r0,30r-182,-68r0,-30r182,-68r0,30r-141,53xm199,-13r0,30r-182,0r0,-30r182,0","w":216},"\u2265":{"d":"17,-30r0,-30r141,-53r-141,-53r0,-30r182,68r0,30xm17,17r0,-30r182,0r0,30r-182,0","w":216},"\u25ca":{"d":"187,-125r-72,142r-24,0r-72,-142r73,-142r24,0xm160,-124r-57,-118v-14,43,-39,77,-57,116r58,118v15,-42,38,-77,56,-116","w":207},"\u00a0":{"w":100},"\u00ad":{"d":"104,-116r0,32r-88,0r0,-32r88,0","w":119},"\u02c9":{"d":"116,-246r0,20r-112,0r0,-20r112,0","w":119},"\uf6c9":{"d":"15,-275r33,-52r39,0r-47,52r-25,0","w":100},"\uf6ca":{"d":"33,-275r-35,-52r28,0r24,34r24,-34r28,0r-35,52r-34,0","w":100},"\uf6cb":{"d":"5,-275r0,-37r32,0r0,37r-32,0xm63,-275r0,-37r32,0r0,37r-32,0","w":100},"\uf6cc":{"d":"-15,-275r0,-37r30,0r0,37r-30,0xm85,-275r0,-37r30,0r0,37r-30,0xm29,-275r14,-52r39,0r-29,52r-24,0","w":100},"\uf6cd":{"d":"115,-312r0,37r-30,0r0,-37r30,0xm15,-312r0,37r-30,0r0,-37r30,0xm57,-327r14,52r-24,0r-29,-52r39,0","w":100},"\uf6ce":{"d":"40,-275r-47,-52r39,0r32,52r-24,0","w":100},"\uf6cf":{"d":"46,-275r32,-52r39,0r-47,52r-24,0xm-13,-275r32,-52r40,0r-47,52r-25,0","w":100},"\uf6d0":{"d":"106,-296r0,21r-112,0r0,-21r112,0","w":100},"\uf6d1":{"d":"-5,-325r17,0v7,39,69,38,76,0r17,0v-3,27,-19,50,-55,50v-36,0,-52,-23,-55,-50","w":100},"\uf6d2":{"d":"12,-275r-17,0v3,-27,19,-50,55,-50v36,0,52,23,55,50r-17,0v-7,-39,-69,-38,-76,0","w":100},"\uf6d6":{"d":"94,-275r-47,-52r39,0r32,52r-24,0xm29,-275r-47,-52r39,0r32,52r-24,0","w":100},"\uf6d4":{"d":"-15,-263r17,0v7,39,69,38,76,0r17,0v-3,27,-19,50,-55,50v-36,0,-52,-23,-55,-50","w":79},"\uf6d5":{"d":"2,-213r-17,0v3,-27,19,-50,55,-50v36,0,52,23,55,50r-17,0v-7,-39,-69,-38,-76,0","w":79},"\uf6d3":{"d":"84,-213r-47,-52r39,0r32,52r-24,0xm19,-213r-47,-52r39,0r32,52r-24,0","w":79},"\uf6d7":{"d":"-25,-213r0,-37r30,0r0,37r-30,0xm75,-213r0,-37r30,0r0,37r-30,0xm19,-213r14,-52r39,0r-29,52r-24,0","w":79},"\uf6d8":{"d":"105,-250r0,37r-30,0r0,-37r30,0xm5,-250r0,37r-30,0r0,-37r30,0xm47,-265r14,52r-24,0r-29,-52r39,0","w":79},"\uf6c5":{"d":"146,-260r25,0v-5,46,-45,38,-84,38v-18,0,-37,1,-37,18v0,16,18,16,40,16v27,0,50,2,71,21v21,20,27,48,27,72v0,42,-17,101,-89,101v-78,0,-86,-74,-86,-99v0,-51,25,-67,37,-75v-6,-2,-27,-7,-27,-35v0,-54,49,-45,87,-46v32,-1,33,-2,36,-11xm155,-96v0,-13,-4,-66,-55,-66v-50,0,-55,50,-55,71v0,32,11,71,55,71v45,0,55,-39,55,-76"},"\u2215":{"d":"120,-253r-159,260r-21,0r159,-260r21,0","w":60},"\u03a9":{"d":"17,-25v17,-1,38,2,53,-1v-25,-22,-48,-59,-48,-109v0,-69,46,-120,108,-120v66,0,106,58,106,118v1,52,-26,89,-49,112r54,0r0,25r-88,0r0,-18v27,-17,52,-55,52,-113v0,-46,-25,-98,-75,-98v-47,0,-77,44,-77,99v0,54,25,95,52,112r0,18r-88,0r0,-25","w":258}}});
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

/*!
 * AnythingZoomer Version: 1.0
*/
var Enum_ZoomType={Click:"click",MouseOver:"mouseOver"};var Enum_ZoomDefaults={largeImgSrc:"",width:300,height:300,enabled:true,type:Enum_ZoomType.Click,speedX:1.4,speedY:1.52};(function($){$.anythingZoomer={defaults:{largeImgSrc:Enum_ZoomDefaults.largeImgSrc,width:Enum_ZoomDefaults.width,height:Enum_ZoomDefaults.height,enabled:Enum_ZoomDefaults.enabled,type:Enum_ZoomDefaults.type,speedX:Enum_ZoomDefaults.speedX,speedY:Enum_ZoomDefaults.speedY}};$.fn.extend({anythingZoomer:function(config){config=$.extend({},$.anythingZoomer.defaults,config);var smallArea=$(this);var largeArea=$('<div id="large-image-wrapper"><img src="'+(config.largeImgSrc)+'" alt="" /></div>');var temp=$('<div id="zoom-lens"></div>').html(largeArea);var zoomLensContainer=$('<div id="zoom-lens-container"></div>').html(temp);var continuousMouseOver=false;function moveMagnifier(e){var x=e.pageX-smallArea.offset().left;var y=e.pageY-smallArea.offset().top;var largeAreaNewLeft=(-x*config.speedX)+(zoomLensContainer.width()*0.5)*(1-(x/smallArea.width()));var largeAreaNewTop=(-y*config.speedY)+(zoomLensContainer.height()*0.5)*(1-(y/smallArea.height()));zoomLensContainer.css({top:y-zoomLensContainer.height()*0.5,left:x-zoomLensContainer.width()*0.5});largeArea.css({left:largeAreaNewLeft,top:largeAreaNewTop})}function setup(){smallArea.append(zoomLensContainer).mousemove(function(e){moveMagnifier(e)}).mouseenter(function(e){if(config.type===Enum_ZoomType.MouseOver){zoomLensContainer.show().addClass('no-cursor')}else{if(continuousMouseOver){zoomLensContainer.show().addClass('no-cursor')}}}).mouseleave(function(e){zoomLensContainer.hide().removeClass('no-cursor')}).click(function(e){if(config.type===Enum_ZoomType.Click){if(zoomLensContainer.is(':visible')){zoomLensContainer.hide().removeClass('no-cursor');continuousMouseOver=false}else{zoomLensContainer.show().addClass('no-cursor');continuousMouseOver=true}}});zoomLensContainer.css({width:config.width+2,height:config.height+2,overflow:"hidden",position:"absolute"});$("#zoom-lens").css({width:config.width,height:config.height})}if(config.enabled){setup()}return this}})})(jQuery);
/*
 * preload - vsd image preloader
*/
(function($){$.fn.preload=function(){this.each(function(){preloadImg=new Image();preloadImg.src=this})}})(jQuery);
/*!
 * Storage plugin
 */
(function($){var isLS=typeof window.localStorage!=='undefined';function wls(n,v){var c;if(typeof n==="string"&&typeof v==="string"){localStorage[n]=v;return true}else if(typeof n==="object"&&typeof v==="undefined"){for(c in n){if(n.hasOwnProperty(c)){localStorage[c]=n[c]}}return true}return false}function wc(n,v){var dt,e,c;dt=new Date();dt.setTime(dt.getTime()+31536000000);e="; expires="+dt.toGMTString();if(typeof n==="string"&&typeof v==="string"){document.cookie=n+"="+v+e+"; path=/";return true}else if(typeof n==="object"&&typeof v==="undefined"){for(c in n){if(n.hasOwnProperty(c)){document.cookie=c+"="+n[c]+e+"; path=/"}}return true}return false}function rls(n){return localStorage[n]}function rc(n){var nn,ca,i,c;nn=n+"=";ca=document.cookie.split(';');for(i=0;i<ca.length;i++){c=ca[i];while(c.charAt(0)===' '){c=c.substring(1,c.length)}if(c.indexOf(nn)===0){return c.substring(nn.length,c.length)}}return null}function dls(n){return delete localStorage[n]}function dc(n){return wc(n,"",-1)}$.extend({Storage:{set:isLS?wls:wc,get:isLS?rls:rc,remove:isLS?dls:dc}})})(jQuery);
/*!
 * OS scrollbar
 */
(function($){var scrollbarWidth=0;$.getScrollbarWidth=function(){if(!scrollbarWidth){if($.browser.msie){var $textarea1=$('<textarea cols="10" rows="2"></textarea>').css({position:'absolute',top:-1000,left:-1000}).appendTo('body'),$textarea2=$('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({position:'absolute',top:-1000,left:-1000}).appendTo('body');scrollbarWidth=$textarea1.width()-$textarea2.width();$textarea1.add($textarea2).remove()}else{var $div=$('<div />').css({width:100,height:100,overflow:'auto',position:'absolute',top:-1000,left:-1000}).prependTo('body').append('<div />').find('div').css({width:'100%',height:200});scrollbarWidth=100-$div.width();$div.parent().remove()}}return scrollbarWidth}})(jQuery);
/*!
* jQuery UI selectmenu
*/
(function($){$.widget("ui.selectmenu",{_init:function(){var self=this,o=this.options;this.ids=[this.element.attr('id')+'-'+'button',this.element.attr('id')+'-'+'menu'];this._safemouseup=true;this.newelement=$('<a class="'+this.widgetBaseClass+' ui-widget ui-state-default ui-corner-all" id="'+this.ids[0]+'" role="button" href="#" aria-haspopup="true" aria-owns="'+this.ids[1]+'"></a>').insertAfter(this.element);var tabindex=this.element.attr('tabindex');if(tabindex){this.newelement.attr('tabindex',tabindex)}this.newelement.data('selectelement',this.element);this.selectmenuIcon=$('<span class="'+this.widgetBaseClass+'-icon ui-icon"></span>').prependTo(this.newelement).addClass((o.style==="popup")?'ui-icon-triangle-2-n-s':'ui-icon-triangle-1-s');$('label[for='+this.element.attr('id')+']').attr('for',this.ids[0]).bind('click',function(){self.newelement[0].focus();return false});this.newelement.bind('mousedown',function(event){self._toggle(event);if(o.style==="popup"){self._safemouseup=false;setTimeout(function(){self._safemouseup=true},300)}return false}).bind('click',function(){return false}).keydown(function(event){var ret=true;switch(event.keyCode){case $.ui.keyCode.ENTER:ret=true;break;case $.ui.keyCode.SPACE:ret=false;self._toggle(event);break;case $.ui.keyCode.UP:case $.ui.keyCode.LEFT:ret=false;self._moveSelection(-1);break;case $.ui.keyCode.DOWN:case $.ui.keyCode.RIGHT:ret=false;self._moveSelection(1);break;case $.ui.keyCode.TAB:ret=true;break;default:ret=false;self._typeAhead(event.keyCode,'mouseup');break}return ret}).bind('mouseover focus',function(){$(this).addClass(self.widgetBaseClass+'-focus ui-state-hover')}).bind('mouseout blur',function(){$(this).removeClass(self.widgetBaseClass+'-focus ui-state-hover')});$(document).mousedown(function(event){self.close(event)});this.element.click(function(){this._refreshValue()}).focus(function(){this.newelement[0].focus()});var cornerClass=(o.style==="dropdown")?" ui-corner-bottom":" ui-corner-all";this.list=$('<ul class="'+self.widgetBaseClass+'-menu ui-widget ui-widget-content'+cornerClass+'" aria-hidden="true" role="listbox" aria-labelledby="'+this.ids[0]+'" id="'+this.ids[1]+'"></ul>').appendTo('body');var selectOptionData=[];this.element.find('option').each(function(){selectOptionData.push({value:$(this).attr('value'),text:self._formatText(jQuery(this).text()),selected:$(this).attr('selected'),classes:$(this).attr('class'),parentOptGroup:$(this).parent('optgroup').attr('label')})});var activeClass=(self.options.style==="popup")?" ui-state-active":"";var i;for(i in selectOptionData){var thisLi=$('<li role="presentation"><a href="#" tabindex="-1" role="option" aria-selected="false">'+selectOptionData[i].text+'</a></li>').data('index',i).addClass(selectOptionData[i].classes).data('optionClasses',selectOptionData[i].classes||'').mouseup(function(event){if(self._safemouseup){var changed=$(this).data('index')!==self._selectedIndex();self.value($(this).data('index'));self.select(event);if(changed){self.change(event)}self.close(event,true)}return false}).click(function(){return false}).bind('mouseover focus',function(){self._selectedOptionLi().addClass(activeClass);self._focusedOptionLi().removeClass(self.widgetBaseClass+'-item-focus ui-state-hover');$(this).removeClass('ui-state-active').addClass(self.widgetBaseClass+'-item-focus ui-state-hover')}).bind('mouseout blur',function(){$(this).removeClass(self.widgetBaseClass+'-item-focus ui-state-hover')});if(selectOptionData[i].parentOptGroup){var optGroupName=self.widgetBaseClass+'-group-'+selectOptionData[i].parentOptGroup;if(this.list.find('li.'+optGroupName).size()){this.list.find('li.'+optGroupName+':last ul').append(thisLi)}else{$('<li role="presentation" class="'+self.widgetBaseClass+'-group '+optGroupName+'"><span class="'+self.widgetBaseClass+'-group-label">'+selectOptionData[i].parentOptGroup+'</span><ul></ul></li>').appendTo(this.list).find('ul').append(thisLi)}}else{thisLi.appendTo(this.list)}this.list.bind('mousedown mouseup',function(){return false});if(o.icons){for(var j in o.icons){if(thisLi.is(o.icons[j].find)){thisLi.data('optionClasses',selectOptionData[i].classes+' '+self.widgetBaseClass+'-hasIcon').addClass(self.widgetBaseClass+'-hasIcon');var iconClass=o.icons[j].icon||"";thisLi.find('a:eq(0)').prepend('<span class="'+self.widgetBaseClass+'-item-icon ui-icon '+iconClass+'"></span>')}}}}this.list.find('li:last').addClass("ui-corner-bottom");if(o.style==='popup'){this.list.find('li:first').addClass("ui-corner-top")}if(o.transferClasses){var transferClasses=this.element.attr('class')||'';this.newelement.add(this.list).addClass(transferClasses)}var selectWidth=this.element.width();this.newelement.width((o.width)?o.width:selectWidth);if(o.style==='dropdown'){this.list.width((o.menuWidth)?o.menuWidth:((o.width)?o.width:selectWidth))}else{this.list.width((o.menuWidth)?o.menuWidth:((o.width)?o.width-o.handleWidth:selectWidth-o.handleWidth))}if(o.maxHeight&&o.maxHeight<this.list.height()){this.list.height(o.maxHeight)}this._optionLis=this.list.find('li:not(.'+self.widgetBaseClass+'-group)');this.list.keydown(function(event){var ret=true;switch(event.keyCode){case $.ui.keyCode.UP:case $.ui.keyCode.LEFT:ret=false;self._moveFocus(-1);break;case $.ui.keyCode.DOWN:case $.ui.keyCode.RIGHT:ret=false;self._moveFocus(1);break;case $.ui.keyCode.HOME:ret=false;self._moveFocus(':first');break;case $.ui.keyCode.PAGE_UP:ret=false;self._scrollPage('up');break;case $.ui.keyCode.PAGE_DOWN:ret=false;self._scrollPage('down');break;case $.ui.keyCode.END:ret=false;self._moveFocus(':last');break;case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:ret=false;self.close(event,true);$(event.target).parents('li:eq(0)').trigger('mouseup');break;case $.ui.keyCode.TAB:ret=true;self.close(event,true);break;case $.ui.keyCode.ESCAPE:ret=false;self.close(event,true);break;default:ret=false;self._typeAhead(event.keyCode,'focus');break}return ret});if(o.style==='dropdown'){this.newelement.addClass(self.widgetBaseClass+"-dropdown");this.list.addClass(self.widgetBaseClass+"-menu-dropdown")}else{this.newelement.addClass(self.widgetBaseClass+"-popup");this.list.addClass(self.widgetBaseClass+"-menu-popup")}this.newelement.prepend('<span class="'+self.widgetBaseClass+'-status">'+selectOptionData[this._selectedIndex()].text+'</span>');this.element.hide();if(this.element.attr('disabled')===true){this.disable()}this.value(this._selectedIndex())},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+'-disabled'+' '+this.namespace+'-state-disabled').removeAttr('aria-disabled');$('label[for='+this.newelement.attr('id')+']').attr('for',this.element.attr('id')).unbind('click');this.newelement.remove();this.list.remove();this.element.show()},_typeAhead:function(code,eventType){var self=this;if(!self._prevChar){self._prevChar=['',0]}var C=String.fromCharCode(code);c=C.toLowerCase();var focusFound=false;function focusOpt(elem,ind){focusFound=true;$(elem).trigger(eventType);self._prevChar[1]=ind}this.list.find('li a').each(function(i){if(!focusFound){var thisText=$(this).text();if(thisText.indexOf(C)===0||thisText.indexOf(c)===0){if(self._prevChar[0]===C){if(self._prevChar[1]<i){focusOpt(this,i)}}else{focusOpt(this,i)}}}});this._prevChar[0]=C},_uiHash:function(){return{value:this.value()}},open:function(event){var self=this;var disabledStatus=this.newelement.attr("aria-disabled");if(disabledStatus!=='true'){this._refreshPosition();this._closeOthers(event);this.newelement.addClass('ui-state-active');this.list.appendTo('body').addClass(self.widgetBaseClass+'-open').attr('aria-hidden',false).find('li:not(.'+self.widgetBaseClass+'-group):eq('+this._selectedIndex()+') a')[0].focus();if(this.options.style==="dropdown"){this.newelement.removeClass('ui-corner-all').addClass('ui-corner-top')}this._refreshPosition();this._trigger("open",event,this._uiHash())}},close:function(event,retainFocus){if(this.newelement.is('.ui-state-active')){this.newelement.removeClass('ui-state-active');this.list.attr('aria-hidden',true).removeClass(this.widgetBaseClass+'-open');if(this.options.style==="dropdown"){this.newelement.removeClass('ui-corner-top').addClass('ui-corner-all')}if(retainFocus){this.newelement[0].focus()}this._trigger("close",event,this._uiHash())}},change:function(event){this.element.trigger('change');this._trigger("change",event,this._uiHash())},select:function(event){this._trigger("select",event,this._uiHash())},_closeOthers:function(event){$('.'+this.widgetBaseClass+'.ui-state-active').not(this.newelement).each(function(){$(this).data('selectelement').selectmenu('close',event)});$('.'+this.widgetBaseClass+'.ui-state-hover').trigger('mouseout')},_toggle:function(event,retainFocus){if(this.list.is('.'+this.widgetBaseClass+'-open')){this.close(event,retainFocus)}else{this.open(event)}},_formatText:function(text){return this.options.format?this.options.format(text):text},_selectedIndex:function(){return this.element[0].selectedIndex},_selectedOptionLi:function(){return this._optionLis.eq(this._selectedIndex())},_focusedOptionLi:function(){return this.list.find('.'+this.widgetBaseClass+'-item-focus')},_moveSelection:function(amt){var currIndex=parseInt(this._selectedOptionLi().data('index'),10);var newIndex=currIndex+amt;return this._optionLis.eq(newIndex).trigger('mouseup')},_moveFocus:function(amt){var newIndex;if(!isNaN(amt)){var currIndex=parseInt(this._focusedOptionLi().data('index'),10);newIndex=currIndex+amt}else{newIndex=parseInt(this._optionLis.filter(amt).data('index'),10)}if(newIndex<0){newIndex=0}if(newIndex>this._optionLis.size()-1){newIndex=this._optionLis.size()-1}var activeID=this.widgetBaseClass+'-item-'+Math.round(Math.random()*1000);this._focusedOptionLi().find('a:eq(0)').attr('id','');this._optionLis.eq(newIndex).find('a:eq(0)').attr('id',activeID)[0].focus();this.list.attr('aria-activedescendant',activeID)},_scrollPage:function(direction){var numPerPage=Math.floor(this.list.outerHeight()/this.list.find('li:first').outerHeight());numPerPage=(direction==='up')?-numPerPage:numPerPage;this._moveFocus(numPerPage)},_setData:function(key,value){this.options[key]=value;if(key==='disabled'){this.close();this.element.add(this.newelement).add(this.list)[value?'addClass':'removeClass'](this.widgetBaseClass+'-disabled'+' '+this.namespace+'-state-disabled').attr("aria-disabled",value)}},value:function(newValue){if(arguments.length){this.element[0].selectedIndex=newValue;this._refreshValue();this._refreshPosition()}return this.element[0].selectedIndex},_refreshValue:function(){var activeClass=(this.options.style==="popup")?" ui-state-active":"";var activeID=this.widgetBaseClass+'-item-'+Math.round(Math.random()*1000);this.list.find('.'+this.widgetBaseClass+'-item-selected').removeClass(this.widgetBaseClass+"-item-selected"+activeClass).find('a').attr('aria-selected','false').attr('id','');this._selectedOptionLi().addClass(this.widgetBaseClass+"-item-selected"+activeClass).find('a').attr('aria-selected','true').attr('id',activeID);var currentOptionClasses=this.newelement.data('optionClasses')?this.newelement.data('optionClasses'):"";var newOptionClasses=this._selectedOptionLi().data('optionClasses')?this._selectedOptionLi().data('optionClasses'):"";this.newelement.removeClass(currentOptionClasses).data('optionClasses',newOptionClasses).addClass(newOptionClasses).find('.'+this.widgetBaseClass+'-status').html(this._selectedOptionLi().find('a:eq(0)').html());this.list.attr('aria-activedescendant',activeID)},_refreshPosition:function(){this.list.css('left',this.newelement.offset().left);var menuTop=this.newelement.offset().top;var scrolledAmt=this.list[0].scrollTop;this.list.find('li:lt('+this._selectedIndex()+')').each(function(){scrolledAmt-=$(this).outerHeight()});if(this.newelement.is('.'+this.widgetBaseClass+'-popup')){menuTop+=scrolledAmt;this.list.css('top',menuTop)}else{menuTop+=this.newelement.height();this.list.css('top',menuTop)}}});$.extend($.ui.selectmenu,{getter:"value",version:"@VERSION",eventPrefix:"selectmenu",defaults:{transferClasses:true,style:'popup',width:null,menuWidth:null,handleWidth:26,maxHeight:null,icons:null,format:null}})})(jQuery);
/*!
 * jQuery Tools 1.2.5 Tooltip - UI essentials
 */
(function($){$.tools=$.tools||{version:'1.2.5'};$.tools.tooltip={conf:{effect:'toggle',fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,position:['top','center'],offset:[0,0],relative:false,cancelDefault:true,width:null,events:{def:"mouseenter,mouseleave",input:"focus,blur,scroll",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:'<div/>',tipClass:'tooltip'},addEffect:function(name,loadFn,hideFn){effects[name]=[loadFn,hideFn]}};var effects={toggle:[function(done){var conf=this.getConf(),tip=this.getTip(),o=conf.opacity;if(o<1){tip.css({opacity:o})}tip.show();done.call()},function(done){this.getTip().hide();done.call()}],fade:[function(done){var conf=this.getConf();this.getTip().fadeTo(conf.fadeInSpeed,conf.opacity,done)},function(done){this.getTip().fadeOut(this.getConf().fadeOutSpeed,done)}]};function getPosition(trigger,tip,conf){if(conf.width){tip.width(conf.width-(tip.outerWidth()-tip.width()))}var top=conf.relative?trigger.position().top:trigger.offset().top,left=conf.relative?trigger.position().left:trigger.offset().left,pos=conf.position[0];top-=tip.outerHeight()-conf.offset[0];left+=trigger.outerWidth()+conf.offset[1];if(/iPad/i.test(navigator.userAgent)){top-=$(window).scrollTop()}var height=tip.outerHeight()+trigger.outerHeight();if(pos==='center'){top+=height/2}if(pos==='bottom'){top+=height}pos=conf.position[1];var width=tip.outerWidth()+trigger.outerWidth();if(pos==='center'){left-=width/2}if(pos==='left'){left-=width}return{top:top,left:left}}function Tooltip(trigger,conf){var self=this,fire=trigger.add(self),tip,timer=0,pretimer=0,title=trigger.attr("title"),tipAttr=trigger.attr("data-tooltip"),effect=effects[conf.effect],shown,isInput=trigger.is(":input"),isWidget=isInput&&trigger.is(":checkbox, :radio, select, :button, :submit"),type=trigger.attr("type"),evt=conf.events[type]||conf.events[isInput?(isWidget?'widget':'input'):'def'];if(!effect){throw"Nonexistent effect \""+conf.effect+"\"";}evt=evt.split(/,\s*/);if(evt.length!==2){throw"Tooltip: bad events configuration for "+type;}trigger.bind(evt[0],function(e){clearTimeout(timer);if(conf.predelay){pretimer=setTimeout(function(){self.show(e)},conf.predelay)}else{self.show(e)}}).bind(evt[1],function(e){clearTimeout(pretimer);if(conf.delay){timer=setTimeout(function(){self.hide(e)},conf.delay)}else{self.hide(e)}});if(title&&conf.cancelDefault){trigger.removeAttr("title");trigger.data("title",title)}$.extend(self,{show:function(e){if(!tip){if(tipAttr){tip=$(tipAttr)}else if(conf.tip){tip=$(conf.tip).eq(0)}else if(title){tip=$(conf.layout).addClass(conf.tipClass).appendTo(document.body).hide().append(title)}else{tip=trigger.next();if(!tip.length){tip=trigger.parent().next()}}if(!tip.length){throw"Cannot find tooltip for "+trigger;}}if(self.isShown()){return self}tip.stop(true,true);var pos=getPosition(trigger,tip,conf);if(conf.tip){tip.html(trigger.data("title"))}e=e||$.Event();e.type="onBeforeShow";fire.trigger(e,[pos]);if(e.isDefaultPrevented()){return self}pos=getPosition(trigger,tip,conf);tip.css({position:'absolute',top:pos.top,left:pos.left});shown=true;effect[0].call(self,function(){e.type="onShow";shown='full';fire.trigger(e)});var event=conf.events.tooltip.split(/,\s*/);if(!tip.data("__set")){tip.bind(event[0],function(){clearTimeout(timer);clearTimeout(pretimer)});if(event[1]&&!trigger.is("input:not(:checkbox, :radio), textarea")){tip.bind(event[1],function(e){if(e.relatedTarget!==trigger[0]){trigger.trigger(evt[1].split(" ")[0])}})}tip.data("__set",true)}return self},hide:function(e){if(!tip||!self.isShown()){return self}e=e||$.Event();e.type="onBeforeHide";fire.trigger(e);if(e.isDefaultPrevented()){return}shown=false;effects[conf.effect][1].call(self,function(){e.type="onHide";fire.trigger(e)});return self},isShown:function(fully){return fully?shown==='full':shown},getConf:function(){return conf},getTip:function(){return tip},getTrigger:function(){return trigger}});$.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(i,name){if($.isFunction(conf[name])){$(self).bind(name,conf[name])}self[name]=function(fn){if(fn){$(self).bind(name,fn)}return self}})}$.fn.tooltip=function(conf){var api=this.data("tooltip");if(api){return api}conf=$.extend(true,{},$.tools.tooltip.conf,conf);if(typeof conf.position==='string'){conf.position=conf.position.split(/,?\s/)}this.each(function(){api=new Tooltip($(this),conf);$(this).data("tooltip",api)});return conf.api?api:this}})(jQuery);
/*!
 * jScrollPane
 */
/* Copyright (c) 2009 Kelvin Luck (kelvin AT kelvinluck DOT com || http://www.kelvinluck.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * See http://kelvinluck.com/assets/jquery/jScrollPane/
 * $Id: jScrollPane.js 93 2010-06-01 08:17:28Z kelvin.luck $
 */
/**
 * Replace the vertical scroll bars on any matched elements with a fancy
 * styleable (via CSS) version. With JS disabled the elements will
 * gracefully degrade to the browsers own implementation of overflow:auto.
 * If the mousewheel plugin has been included on the page then the scrollable areas will also
 * respond to the mouse wheel.
 *
 * @example jQuery(".scroll-pane").jScrollPane();
 *
 * @name jScrollPane 
 * @type jQuery
 * @param Object	settings	hash with options, described below.
 *								scrollbarWidth	-	The width of the generated scrollbar in pixels
 *								scrollbarMargin	-	The amount of space to leave on the side of the scrollbar in pixels
 *								wheelSpeed		-	The speed the pane will scroll in response to the mouse wheel in pixels
 *								showArrows		-	Whether to display arrows for the user to scroll with
 *								arrowSize		-	The height of the arrow buttons if showArrows=true
 *								animateTo		-	Whether to animate when calling scrollTo and scrollBy
 *								dragMinHeight	-	The minimum height to allow the drag bar to be
 *								dragMaxHeight	-	The maximum height to allow the drag bar to be
 *								animateInterval	-	The interval in milliseconds to update an animating scrollPane (default 100)
 *								animateStep		-	The amount to divide the remaining scroll distance by when animating (default 3)
 *								maintainPosition-	Whether you want the contents of the scroll pane to maintain it's position when you re-initialise it - so it doesn't scroll as you add more content (default true)
 *								tabIndex		-	The tabindex for this jScrollPane to control when it is tabbed to when navigating via keyboard (default 0)
 *								enableKeyboardNavigation - Whether to allow keyboard scrolling of this jScrollPane when it is focused (default true)
 *								animateToInternalLinks - Whether the move to an internal link (e.g. when it's focused by tabbing or by a hash change in the URL) should be animated or instant (default false)
 *								scrollbarOnLeft	-	Display the scrollbar on the left side?  (needs stylesheet changes, see examples.html)
 *								reinitialiseOnImageLoad - Whether the jScrollPane should automatically re-initialise itself when any contained images are loaded (default false)
 *								topCapHeight	-	The height of the "cap" area between the top of the jScrollPane and the top of the track/ buttons
 *								bottomCapHeight	-	The height of the "cap" area between the bottom of the jScrollPane and the bottom of the track/ buttons
 *								observeHash		-	Whether jScrollPane should attempt to automagically scroll to the correct place when an anchor inside the scrollpane is linked to (default true)
 * @return jQuery
 * @cat Plugins/jScrollPane
 * @author Kelvin Luck (kelvin AT kelvinluck DOT com || http://www.kelvinluck.com)
 */
(function($) {

$.jScrollPane = {
	active : []
};
$.fn.jScrollPane = function(settings)
{
	settings = $.extend({}, $.fn.jScrollPane.defaults, settings);

	var rf = function() { return false; };
	
	return this.each(
		function()
		{
			var $this = $(this);
			var paneEle = this;
			var currentScrollPosition = 0;
			var paneWidth;
			var paneHeight;
			var trackHeight;
			var trackOffset = settings.topCapHeight;
			var $container;
			
			if ($(this).parent().is('.jScrollPaneContainer')) {
				$container = $(this).parent();
				currentScrollPosition = settings.maintainPosition ? $this.position().top : 0;
				var $c = $(this).parent();
				paneWidth = $c.innerWidth();
				paneHeight = $c.outerHeight();
				$('>.jScrollPaneTrack, >.jScrollArrowUp, >.jScrollArrowDown, >.jScrollCap', $c).remove();
				$this.css({'top':0});
			} else {
				$this.data('originalStyleTag', $this.attr('style'));
				// Switch the element's overflow to hidden to ensure we get the size of the element without the scrollbars [http://plugins.jquery.com/node/1208]
				$this.css('overflow', 'hidden');
				this.originalPadding = $this.css('paddingTop') + ' ' + $this.css('paddingRight') + ' ' + $this.css('paddingBottom') + ' ' + $this.css('paddingLeft');
				this.originalSidePaddingTotal = (parseInt($this.css('paddingLeft'),10) || 0) + (parseInt($this.css('paddingRight'),10) || 0);
				paneWidth = $this.innerWidth();
				paneHeight = $this.innerHeight();
				$container = $('<div></div>')
					.attr({'className':'jScrollPaneContainer'})
					.css(
						{
							'height':paneHeight+'px', 
							'width':paneWidth+'px'
						}
					);
				if (settings.enableKeyboardNavigation) {
					$container.attr(
						'tabindex', 
						settings.tabIndex
					);
				}
				$this.wrap($container);
				$container = $this.parent();
				// deal with text size changes (if the jquery.em plugin is included)
				// and re-initialise the scrollPane so the track maintains the
				// correct size
				$(document).bind(
					'emchange', 
					function(e, cur, prev)
					{
						$this.jScrollPane(settings);
					}
				);
				
			}
			trackHeight = paneHeight;
			
			if (settings.reinitialiseOnImageLoad) {
				// code inspired by jquery.onImagesLoad: http://plugins.jquery.com/project/onImagesLoad
				// except we re-initialise the scroll pane when each image loads so that the scroll pane is always up to size...
				// TODO: Do I even need to store it in $.data? Is a local variable here the same since I don't pass the reinitialiseOnImageLoad when I re-initialise?
				var $imagesToLoad = $.data(paneEle, 'jScrollPaneImagesToLoad') || $('img', $this);
				var loadedImages = [];
				
				if ($imagesToLoad.length) {
					$imagesToLoad.each(function(i, val)	{
						$(this).bind('load readystatechange', function() {
							if($.inArray(i, loadedImages) === -1){ //don't double count images
								loadedImages.push(val); //keep a record of images we've seen
								$imagesToLoad = $.grep($imagesToLoad, function(n, i) {
									return n !== val;
								});
								$.data(paneEle, 'jScrollPaneImagesToLoad', $imagesToLoad);
								var s2 = $.extend(settings, {reinitialiseOnImageLoad:false});
								$this.jScrollPane(s2); // re-initialise
							}
						}).each(function(i, val) {
							if(this.complete || this.complete===undefined) { 
								//needed for potential cached images
								this.src = this.src; 
							} 
						});
					});
				}
			}

			var p = this.originalSidePaddingTotal;
			var realPaneWidth = paneWidth - settings.scrollbarWidth - settings.scrollbarMargin - p;

			var cssToApply = {
				'height':'auto',
				'width': realPaneWidth + 'px'
			};

			if(settings.scrollbarOnLeft) {
				cssToApply.paddingLeft = settings.scrollbarMargin + settings.scrollbarWidth + 'px';
			} else {
				cssToApply.paddingRight = settings.scrollbarMargin + 'px';
			}

			$this.css(cssToApply);

			var contentHeight = $this.outerHeight();
			var percentInView = paneHeight / contentHeight;
			
			var isScrollable = percentInView < 0.99;
			$container[isScrollable ? 'addClass' : 'removeClass']('jScrollPaneScrollable');

			if (isScrollable) {
			
			
				$container.append(
					$('<div></div>').addClass('jScrollCap jScrollCapTop').css({height:settings.topCapHeight}),
					$('<div></div>').attr({'className':'jScrollPaneTrack'}).css({'width':settings.scrollbarWidth+'px'}).append(
						$('<div></div>').attr({'className':'jScrollPaneDrag'}).css({'width':settings.scrollbarWidth+'px'}).append(
							$('<div></div>').attr({'className':'jScrollPaneDragTop'}).css({'width':settings.scrollbarWidth+'px'}),
							$('<div></div>').attr({'className':'jScrollPaneDragBottom'}).css({'width':settings.scrollbarWidth+'px'})
						)
					),
					$('<div></div>').addClass('jScrollCap jScrollCapBottom').css({height:settings.bottomCapHeight})
				);
				
				var $track = $('>.jScrollPaneTrack', $container);
				var $drag = $('>.jScrollPaneTrack .jScrollPaneDrag', $container);
				
				
				//----touch device scrolling
				var isTouchScreen;
				if(VSD.Client.isTouch()) {
					isTouchScreen = 1;
					$container.children(':first').addClass('touchscroll');
				}else{
					isTouchScreen = 0;
				}			
				$drag.bind('touchstart', function(e){
					var cpos = dragPosition;					
					if(isTouchScreen){
									e = e.originalEvent.touches[0];
								}
					var sY = e.pageY;
					var sX = e.pageX;
										
					$drag.bind('touchmove',function(ev){
						if(isTouchScreen){
							ev.preventDefault();
							ev = ev.originalEvent.touches[0];
						}						
						
						var top = cpos+(ev.pageY-sY);
						positionDrag(top);	
					});
					$drag.bind('touchend',function(ev){
						$drag.unbind('touchmove touchend');
					});
				});
				
				//need to change selector to a global dedicated class for inner content 
				$container.children(':first').bind('touchstart', function(e){
					
					var cpos = dragPosition;					
					if(isTouchScreen){
									e = e.originalEvent.touches[0];
								}
					var sY = e.pageY;
					var sX = e.pageX;
										
					$container.children(':first').bind('touchmove',function(ev){
						if(isTouchScreen){
							ev.preventDefault();
							ev = ev.originalEvent.touches[0];
						}						
						
						var top = cpos-(ev.pageY-sY);
						positionDrag(top);	
					});
					$container.children(':first').bind('touchend',function(ev){
						$container.children(':first').unbind('touchmove touchend');
					});
				});
			//---------------------------
				
				
				

				var currentArrowDirection;
				var currentArrowTimerArr = [];// Array is used to store timers since they can stack up when dealing with keyboard events. This ensures all timers are cleaned up in the end, preventing an acceleration bug.
				var currentArrowInc;
				var whileArrowButtonDown = function() 
				{
					if (currentArrowInc > 4 || currentArrowInc % 4 === 0) {
						positionDrag(dragPosition + currentArrowDirection * mouseWheelMultiplier);
					}
					currentArrowInc++;
				};

				if (settings.enableKeyboardNavigation) {
					$container.bind(
						'keydown.jscrollpane',
						function(e) 
						{
							switch (e.keyCode) {
								case 38: //up
									currentArrowDirection = -1;
									currentArrowInc = 0;
									whileArrowButtonDown();
									currentArrowTimerArr[currentArrowTimerArr.length] = setInterval(whileArrowButtonDown, 100);
									return false;
								case 40: //down
									currentArrowDirection = 1;
									currentArrowInc = 0;
									whileArrowButtonDown();
									currentArrowTimerArr[currentArrowTimerArr.length] = setInterval(whileArrowButtonDown, 100);
									return false;
								case 33: // page up
								case 34: // page down
									// TODO
									return false;
								default:
							}
						}
					).bind(
						'keyup.jscrollpane',
						function(e) 
						{
							if (e.keyCode === 38 || e.keyCode === 40) {
								var i = 0;
								for (i; i < currentArrowTimerArr.length; i++) {
									clearInterval(currentArrowTimerArr[i]);
								}
								return false;
							}
						}
					);
				}

				if (settings.showArrows) {
					
					var currentArrowButton;
					var currentArrowInterval;

					var onArrowMouseUp = function(event)
					{
						$('html').unbind('mouseup', onArrowMouseUp);
						currentArrowButton.removeClass('jScrollActiveArrowButton');
						clearInterval(currentArrowInterval);
					};
					var onArrowMouseDown = function() {
						$('html').bind('mouseup', onArrowMouseUp);
						currentArrowButton.addClass('jScrollActiveArrowButton');
						currentArrowInc = 0;
						whileArrowButtonDown();
						currentArrowInterval = setInterval(whileArrowButtonDown, 100);
					};
					$container
						.append(
							$('<a></a>')
								.attr(
									{
										'href':'javascript:;', 
										'className':'jScrollArrowUp', 
										'tabindex':-1
									}
								)
								.css(
									{
										'width':settings.scrollbarWidth+'px',
										'top':settings.topCapHeight + 'px'
									}
								)
								.html('Scroll up')
								.bind('mousedown', function()
								{
									currentArrowButton = $(this);
									currentArrowDirection = -1;
									onArrowMouseDown();
									this.blur();
									return false;
								})
								.bind('click', rf),
							$('<a></a>')
								.attr(
									{
										'href':'javascript:;', 
										'className':'jScrollArrowDown', 
										'tabindex':-1
									}
								)
								.css(
									{
										'width':settings.scrollbarWidth+'px',
										'bottom':settings.bottomCapHeight + 'px'
									}
								)
								.html('Scroll down')
								.bind('mousedown', function()
								{
									currentArrowButton = $(this);
									currentArrowDirection = 1;
									onArrowMouseDown();
									this.blur();
									return false;
								})
								.bind('click', rf)
						);
					var $upArrow = $('>.jScrollArrowUp', $container);
					var $downArrow = $('>.jScrollArrowDown', $container);
				}
				
				if (settings.arrowSize) {
					trackHeight = paneHeight - settings.arrowSize - settings.arrowSize;
					trackOffset += settings.arrowSize;
				} else if ($upArrow) {
					var topArrowHeight = $upArrow.height();
					settings.arrowSize = topArrowHeight;
					trackHeight = paneHeight - topArrowHeight - $downArrow.height();
					trackOffset += topArrowHeight;
				}
				trackHeight -= settings.topCapHeight + settings.bottomCapHeight;
				$track.css({'height': trackHeight+'px', top:trackOffset+'px'});
				
				var $pane = $(this).css({'position':'absolute', 'overflow':'visible'});
				
				var currentOffset;
				var maxY;
				var mouseWheelMultiplier;
				// store this in a seperate variable so we can keep track more accurately than just updating the css property..
				var dragPosition = 0;
				var dragMiddle = percentInView*paneHeight/2;
				
				// pos function borrowed from tooltip plugin and adapted...
				var getPos = function (event, c) {
					var p = c === 'X' ? 'Left' : 'Top';
					return event['page' + c] || (event['client' + c] + (document.documentElement['scroll' + p] || document.body['scroll' + p])) || 0;
				};
				
				var ignoreNativeDrag = function() {	return false; };
				
				var initDrag = function()
				{
					ceaseAnimation();
					currentOffset = $drag.offset(false);
					//currentOffset.top -= dragPosition;
					currentOffset = $.extend({}, currentOffset, {top: currentOffset.top - dragPosition});
					maxY = trackHeight - $drag[0].offsetHeight;
					mouseWheelMultiplier = 2 * settings.wheelSpeed * maxY / contentHeight;
				};
				
				var onStartDrag = function(event)
				{
					initDrag();
					dragMiddle = getPos(event, 'Y') - dragPosition - currentOffset.top;
					$('html').bind('mouseup', onStopDrag).bind('mousemove', updateScroll).bind('mouseleave', onStopDrag);
					if ($.browser.msie) {
						$('html').bind('dragstart', ignoreNativeDrag).bind('selectstart', ignoreNativeDrag);
					}
					return false;
				};
				var onStopDrag = function()
				{
					$('html').unbind('mouseup', onStopDrag).unbind('mousemove', updateScroll);
					dragMiddle = percentInView*paneHeight/2;
					if ($.browser.msie) {
						$('html').unbind('dragstart', ignoreNativeDrag).unbind('selectstart', ignoreNativeDrag);
					}
				};
				var positionDrag = function(destY)
				{
					$container.scrollTop(0);
					/* Original Code: Allowed a variable amount of space at the
					                  top of scroll pane.
					destY = destY <= -1 ? 0 : (destY >= maxY ? maxY+1 : destY); // don't show the top/bottom edge of the handle at min/max scroll
					*/
					
					// Edit by Marcus: Puts no additional space at the top
					//                 of scroll pane.
					destY = destY < 0 ? 0 : (destY >= maxY ? maxY+1 : destY); // don't show the top/bottom edge of the handle at min/max scroll
					dragPosition = destY;
					$drag.css({'top':destY+'px'});
					var p = destY / maxY;
					$this.data('jScrollPanePosition', (paneHeight-contentHeight)*-p);
					$pane.css({'top':((paneHeight-contentHeight)*p) + 'px'});
					$this.trigger('scroll');
					if (settings.showArrows) {
						$upArrow[destY === 0 ? 'addClass' : 'removeClass']('disabled');
						$downArrow[destY === maxY ? 'addClass' : 'removeClass']('disabled');
					}
				};
				var updateScroll = function(e)
				{
					positionDrag(getPos(e, 'Y') - currentOffset.top - dragMiddle);
				};
				
				var dragH = Math.max(Math.min(percentInView*(paneHeight-settings.arrowSize*2), settings.dragMaxHeight), settings.dragMinHeight);
				
				$drag.css(
					{'height':dragH+'px'}
				).bind('mousedown', onStartDrag);
				
				var trackScrollInterval;
				var trackScrollInc;
				var trackScrollMousePos;
				var doTrackScroll = function()
				{
					if (trackScrollInc > 8 || trackScrollInc%4===0) {
						positionDrag((dragPosition - ((dragPosition - trackScrollMousePos) / 2)));
					}
					trackScrollInc ++;
				};
				var onStopTrackClick = function()
				{
					clearInterval(trackScrollInterval);
					$('html').unbind('mouseup', onStopTrackClick).unbind('mousemove', onTrackMouseMove);
				};
				var onTrackMouseMove = function(event)
				{
					trackScrollMousePos = getPos(event, 'Y') - currentOffset.top - dragMiddle;
				};
				var onTrackClick = function(event)
				{
					initDrag();
					onTrackMouseMove(event);
					trackScrollInc = 0;
					$('html').bind('mouseup', onStopTrackClick).bind('mousemove', onTrackMouseMove);
					trackScrollInterval = setInterval(doTrackScroll, 100);
					doTrackScroll();
					return false;
				};
				
				$track.bind('mousedown', onTrackClick);
				
				$container.bind(
					'mousewheel',
					function (event, delta) {
						delta = delta || (event.wheelDelta ? event.wheelDelta / 120 : (event.detail) ? -event.detail/3 : 0);
						initDrag();
						ceaseAnimation();
						var d = dragPosition;
						positionDrag(dragPosition - delta * mouseWheelMultiplier);
						var dragOccured = d !== dragPosition;
						return !dragOccured;
					}
				);

				var _animateToPosition;
				var _animateToInterval;
				function animateToPosition()
				{
					var diff = (_animateToPosition - dragPosition) / settings.animateStep;
					if (diff > 1 || diff < -1) {
						positionDrag(dragPosition + diff);
					} else {
						positionDrag(_animateToPosition);
						ceaseAnimation();
					}
				}
				var ceaseAnimation = function()
				{
					if (_animateToInterval) {
						clearInterval(_animateToInterval);
						delete _animateToPosition;
					}
				};
				var scrollTo = function(pos, preventAni)
				{
					if (typeof pos === "string") {
						// Legal hash values aren't necessarily legal jQuery selectors so we need to catch any
						// errors from the lookup...
						try {
							$e = $(pos, $this);
						} catch (err) {
							return;
						}
						if (!$e.length) return;
						pos = $e.offset().top - $this.offset().top;
						
						//if (pos > 20)
						pos -=20; // leave space above anchor content
					}
					ceaseAnimation();
					var maxScroll = contentHeight - paneHeight;
					pos = pos > maxScroll ? maxScroll : pos;
					$this.data('jScrollPaneMaxScroll', maxScroll);
					var destDragPosition = pos/maxScroll * maxY;
					if (preventAni || !settings.animateTo) {
						positionDrag(destDragPosition);
					} else {
						$container.scrollTop(0);
						_animateToPosition = destDragPosition;
						_animateToInterval = setInterval(animateToPosition, settings.animateInterval);
					}
				};
				$this[0].scrollTo = scrollTo;
				
				$this[0].scrollBy = function(delta)
				{
					var 

currentPos = -parseInt($pane.css('top'), 10) || 0;
					scrollTo(currentPos + delta);
				};
				
				initDrag();
				
				scrollTo(-currentScrollPosition, true);
			
				// Deal with it when the user tabs to a link or form element within this scrollpane
				$('*', this).bind(
					'focus',
					function(event)
					{
						var $e = $(this);
						
						// loop through parents adding the offset top of any elements that are relatively positioned between
						// the focused element and the jScrollPaneContainer so we can get the true distance from the top
						// of the focused element to the top of the scrollpane...
						var eleTop = 0;
						
						var preventInfiniteLoop = 100;
						
						while ($e[0] !== $this[0]) {
							eleTop += $e.position().top;
							$e = $e.offsetParent();
							if (!preventInfiniteLoop--) {
								return;
							}
						}
						
						var viewportTop = -parseInt($pane.css('top'), 10) || 0;
						var maxVisibleEleTop = viewportTop + paneHeight;
						var eleInView = eleTop > viewportTop && eleTop < maxVisibleEleTop;
						if (!eleInView) {
							var destPos = eleTop - settings.scrollbarMargin;
							if (eleTop > viewportTop) { // element is below viewport - scroll so it is at bottom.
								destPos += $(this).height() + 15 + settings.scrollbarMargin - paneHeight;
							}
							scrollTo(destPos);
						}
					}
				);
				
				
				if (settings.observeHash) {
					if (location.hash && location.hash.length > 1) {
						setTimeout(function(){
							scrollTo(location.hash);
						}, $.browser.safari ? 100 : 0);
					}
					
					// use event delegation to listen for all clicks on links and hijack them if they are links to
					// anchors within our content...
					$(document).bind('click', function(e){
						$target = $(e.target);
						if ($target.is('a')) {
							var h = $target.attr('href');
							//vk - below line is to accomodate scroll-to-anchor in IE6/7
							if(h) {if(h.match('http:/') || h.match('https:/')) {h = "#"+h.split('#')[1];}}
							if (h && h.substr(0, 1) === '#' && h.length > 1) {
								setTimeout(function(){
									scrollTo(h, !settings.animateToInternalLinks);
								}, $.browser.safari ? 100 : 0);
							}
						}
					});
				}
				
				// Deal with dragging and selecting text to make the scrollpane scroll...
				function onSelectScrollMouseDown(e)
				{
				   $(document).bind('mousemove.jScrollPaneDragging', onTextSelectionScrollMouseMove);
				   $(document).bind('mouseup.jScrollPaneDragging',   onSelectScrollMouseUp);
				  
				}
				
				var textDragDistanceAway;
				var textSelectionInterval;
				
				function onTextSelectionInterval()
				{
					direction = textDragDistanceAway < 0 ? -1 : 1;
					$this[0].scrollBy(textDragDistanceAway / 2);
				}

				function clearTextSelectionInterval()
				{
					if (textSelectionInterval) {
						clearInterval(textSelectionInterval);
						textSelectionInterval = undefined;
					}
				}
				
				function onTextSelectionScrollMouseMove(e)
				{
					var offset = $this.parent().offset().top;
					var maxOffset = offset + paneHeight;
					var mouseOffset = getPos(e, 'Y');
					textDragDistanceAway = mouseOffset < offset ? mouseOffset - offset : (mouseOffset > maxOffset ? mouseOffset - maxOffset : 0);
					if (textDragDistanceAway === 0) {
						clearTextSelectionInterval();
					} else {
						if (!textSelectionInterval) {
							textSelectionInterval  = setInterval(onTextSelectionInterval, 100);
						}
					}
				}

				function onSelectScrollMouseUp(e)
				{
				   $(document)
					  .unbind('mousemove.jScrollPaneDragging')
					  .unbind('mouseup.jScrollPaneDragging');
				   clearTextSelectionInterval();
				}

				$container.bind('mousedown.jScrollPane', onSelectScrollMouseDown);

				
				$.jScrollPane.active.push($this[0]);
				
			} else {
				$this.css(
					{
						'height':paneHeight+'px',
						'width':paneWidth-this.originalSidePaddingTotal+'px',
						'padding':this.originalPadding
					}
				);
				$this[0].scrollTo = $this[0].scrollBy = function() {};
				// clean up listeners
				$this.parent().unbind('mousewheel').unbind('mousedown.jScrollPane').unbind('keydown.jscrollpane').unbind('keyup.jscrollpane');
			}
		}
	);
};

$.fn.jScrollPaneRemove = function()
{
	$(this).each(function()
	{
		$this = $(this);
		var $c = $this.parent();
		if ($c.is('.jScrollPaneContainer')) {
			$this.css(
				{
					'top':'',
					'height':'',
					'width':'',
					'padding':'',
					'overflow':'',
					'position':''
				}
			);
			$this.attr('style', $this.data('originalStyleTag'));
			$c.after($this).remove();
		}
	});
};
	
$.fn.jScrollPane.defaults = {
	scrollbarWidth : 25,
	scrollbarMargin : 0,
	wheelSpeed : 70,
	showArrows : true,
	arrowSize : 0,
	animateTo : false,
	dragMinHeight : 1,
	dragMaxHeight : 99999,
	animateInterval : 100,
	animateStep: 3,
	maintainPosition: true,
	scrollbarOnLeft: false,
	reinitialiseOnImageLoad: false,
	tabIndex : 0,
	enableKeyboardNavigation: true,
	animateToInternalLinks: false,
	topCapHeight: 0,
	bottomCapHeight: 0,
	observeHash: true
};

// clean up the scrollTo expandos
$(window)
	.bind('unload', function() {
		var els = $.jScrollPane.active; 
		var i=0;
		for (i; i<els.length; i++) {
			els[i].scrollTo = els[i].scrollBy = null;
		}
	}
);

})(jQuery);
/*!
 * MouseWheel Version: 3.0 Requires: jQuery 1.2.2+
 */
(function($){$.event.special.mousewheel={setup:function(){var handler=$.event.special.mousewheel.handler;if($.browser.mozilla){$(this).bind('mousemove.mousewheel',function(event){$.data(this,'mwcursorposdata',{pageX:event.pageX,pageY:event.pageY,clientX:event.clientX,clientY:event.clientY})})}if(this.addEventListener){this.addEventListener(($.browser.mozilla?'DOMMouseScroll':'mousewheel'),handler,false)}else{this.onmousewheel=handler}},teardown:function(){var handler=$.event.special.mousewheel.handler;$(this).unbind('mousemove.mousewheel');if(this.removeEventListener){this.removeEventListener(($.browser.mozilla?'DOMMouseScroll':'mousewheel'),handler,false)}else{this.onmousewheel=function(){}}$.removeData(this,'mwcursorposdata')},handler:function(event){var args=Array.prototype.slice.call(arguments,1);event=$.event.fix(event||window.event);$.extend(event,$.data(this,'mwcursorposdata')||{});var delta=0,returnValue=true;if(event.wheelDelta){delta=event.wheelDelta/120}if(event.detail){delta=-event.detail/3}event.data=event.data||{};event.type="mousewheel";args.unshift(delta);args.unshift(event);return $.event.handle.apply(this,args)}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}})})(jQuery);
/*
 * VSD Overlay
 */
/**
 * @class Overlay
 * @constructor
 * Overlay plugin
 * @namespace
 */

/**
 * @constructor
 */
var originalTabs = [];
var originalIndex= [];

var Overlay  = {
	/** @private */
	_overlay: {},
	/**
	 * Set modal function<br/>
	 * @config {string} [modal] Set class modal-open
	 * @config {string} [modalClose]
	 * @config {object} [bind] Click to closeMethod
	 * @constructor 
	 */
	setModal: function() {
		if(!this.modal){
			this.modal = $('<div class="modal-open" />');

			$.getDocHeight = function(){
					return Math.max(
							$(document).height(),
							$(window).height(),
							/* For opera: */
							document.documentElement.clientHeight
					);
			};
			this.modal.height($.getDocHeight());

			if(this.options.modalClose){
				this.modal.bind(VSD.UI.CLICK, this.options.closeMethod);
				this.closer.push(this.modal);
				}
				$("body").prepend(this.modal);
			}
		},
		/**
		 * Set close button function
		 * @config {element} [closeButton] Define link class "close"
		 * @config {object} [bind] Click to closeMethod
		 * @constructor
		 */
	setCloseButton: function() {
		if(!this.closeButton){
			this.closeButton = $('<a class="close">close</a>');
			this.element.prepend(this.closeButton);
			this.closeButton.bind("click", this.options.closeMethod);
			this.closer.push(this.closeButton);	
			}
		},
		/**
		 * Establish open
		 * @config {element} [addClass] "overlay-on", focus
		 * @constructor 
		 */
	open: function() {
		this.element.addClass("overlay-on");	
		this.focus();
		},
		/**
		 * Establish close
		 * @config {element} [removeClass]
		 * @config {element} [addClass] "overlay"
		 * @config {function} [lock] modal
		 * @config {function} [empty] modal
		 * @config {function} {remove] modal
		 * @constructor 
		 */
	close: function() {
		VSD.Selectmenu.destroyAll("#overlay");
		if(this.options.beforeClose){
			this.options.beforeClose();
		}
		this.element.css("width", "");
		this.content.css("width", "");
		this.element.removeClass();
		this.element.addClass("overlay");
		this.lock();
		this.empty();
		if(this.modal){
			this.modal.remove();
		}
		if(typeof this.iframe !== "undefined")
		{
			this.iframe.remove();
		}
		if(this.options.closeCallback)
		{
			this.options.closeCallback();
		}
		this.unfocus();
		this.destroy();
		},
		/**
		 * Establish lock
		 * @config {function} [unbind] Click
		 * @constructor 
		 */
		lock: function() {
		$.each(this.closer, function(i,e){ e.unbind(VSD.UI.CLICK); });
		},
		/**
		 * Establish empty function
		 * @config {element} [attr] class, "overlay ui-shadow"
		 * @constructor 
		 */
		empty: function(){
		this.closeButton = null;
		this.element.attr("class", "overlay ui-shadow");
		this.element.html("");
		},
	center: function(width){
		width = width===null ? width : this.element.width();
		var top = $(document).scrollTop() + ($(window).height() - this.element.height()) * 0.45;
		this.element.css({
			"margin-left":"-"+(this.element.width()/2)+"px",
			"top": top > 20 ? top : 20
			});
		},
		/**
		 * Focus function for all elements
		 * @config {function} [pageElements] Retrieve all focusable elements
		 * @param {string} originalTabs
		 * @config {element} [setAttribute] tabIndex, -1 
		 * @constructor
		 */
	focus: function(){				
			// tabFocus 
			//get all tab focusable elements on page.							
			var pageElements = $('#wrap').find('[tabindex!=undefined]');	
			var i = 0;				
			//set all tab focusable elements index to -1

			if(originalTabs.length<=0 && originalIndex.length<=0) {
				
				for (i; i < pageElements.length; i++) 
				{
					originalTabs[i] = pageElements[i];
					if (pageElements[i].getAttribute("tabIndex") !== null) 
					{
						var index = pageElements[i].getAttribute("tabIndex"); 
						originalIndex[i] = index;
					}
					pageElements[i].setAttribute("tabIndex","-1");
				}
				i = 0;
			}
			
			//Get tab focusable elements in pop-up window
			/**
			 * @description Tab focusable elements placed in a pop-up window
			 * @constructor
			 */
			var popupElement = $('#overlay');
			var popupElements = $("a,input:not(:hidden),textarea,select,button,.item", popupElement);
			var count = 0;
			
			//set index of tab focusable elements (increment by one)
			for (i = 0; i < popupElements.length; i++) 
			{
				var holder = popupElements[i];
				if (popupElements[i].nodeType === 1 ) {
				popupElements[i].setAttribute("tabIndex",count);
				count++;
				}
			}
			i = 0;
			
			//set focus to overlay if there is no other tab focusable element
			var closeButton = popupElements[0];
			var firstInput = popupElements[1];

			if (typeof firstInput === "undefined")
			{
				firstInput = this.element[0];
			}
			setTimeout(function() {$(firstInput).focus();},100);
		},			
		/**
		 * @constructor
		 */
		unfocus: function(){
			var k = 0;
			for (k; k < originalTabs.length; k++) 
			{
				if (originalTabs[k].getAttribute("tabIndex") !== 'undefined') 
				{
					originalTabs[k].setAttribute("tabIndex", originalIndex[k]);
				}
				if (originalTabs[k].getAttribute("tabIndex") === 'undefined') {
					originalTabs[k].removeAttribute("tabIndex");		
				}
			}
			originalTabs = [];
			originalIndex = [];
			
		},
		/**
		 * @description Set content height dynamically
		 * @constructor
		 */
		contentHeight: function(height){
			var h;
			this.content = $(".content-inner", this.element);
			if (height) {
				h = height;
			}
			else if (this.options.contentHeight === "auto") {
				h = this.element.height() - this.titleBar.outerHeight() - this.footerBar.outerHeight();
				h -= this.content.outerHeight() - this.content.height();
			}
			else {
				h = this.options.contentHeight;
			}
			this.content.height(h);
		},
		/**
		 * @description Load content height and center
		 * @constructor
		 */
		load: function() {
		this.open();
		this.contentHeight();
		this.center();
		if(VSD.Client.isIE())
		{
			this.shadow();
		}
		},
		/**
		 * @description Custom params for IE6
		 * @constructor
		 */
	ie6: function(){
		if(this.options.modal){
			var m = this.modal, 
				h = $(document).height(), 
				w = $("body").width();
			this.modal.css({
				height:h,
				width:w
				});
			$(window).bind("resize", function(){
				m.css({
					height:$(document).height(),
					width:$("body").width()
					});
				});
			}
		if(this.options.closeButton){
			this.closeButton.bind("mouseover focus", function(){
				$(this).addClass("close-hover");
				});
			this.closeButton.bind("mouseout blur", function(){
				$(this).removeClass("close-hover");
				});
			}
		},
		/**
		 * @description UI shadow element
		 * @constructor
		 */
	shadow: function(){
		VSD.UI.ieShadow(this.element);
		},
		/**
		 * @constructor
		 */
	title: function(text){
		$(".title", this.titleBarContent).html(text);
		},
		/**
		 * @constructor
		 */
	subtitle: function(text){
		$(".subtitle", this.titleBarContent).html(text);
		},
		/**
		 * @constructor
		 */
	callback: function(){
			this.options.callback();
		},
		/**
		 * @description Add footer overlay
		 * @constructor
		 */
	footer: function(footer){
			if(footer.footer){
				this.footerBar.addClass("footerbar-on "+footer.footerAddClass);
				this.footerBar.append('<div class="grp footer-bar-content"><div class="grp footer-bar-buttons"></div></div>');
				this.footerBarContent = $(".footer-bar-content", this.footerBar);
				this.footerBarButtons = $(".footer-bar-buttons", this.footerBar);
				this.footerButtons(footer.footerAddButton);
			}
		},
		/**
		 * @constructor
		 */
	footerButtons: function(footerAddButton){
			// clear content	
			_overlay.footerBarButtons.html("");
		
			// make new ones
			$.each(footerAddButton, function(name, options){
				var newBtn;
				if (options.tag) {
					newBtn = $('<' + options.tag + ' class="small ui-button '+options.addClass+'">'+name+'</' + options.tag + '>');
				} else {
					newBtn = $('<button class="small ui-button '+options.addClass+'">'+name+'</button>');
				}
				_overlay.footerBarButtons.append(newBtn);
				if(typeof options.callback === "function")
				{
					newBtn.bind(VSD.UI.CLICK, options.callback);
				}
			});
		},
		/**
		 * @constructor
		 */
	_init: function(){
		_overlay = this;

		this.closer = [];

		if(this.options.reset){
			this.lock();
			this.empty();
			}

		this.element.append('<div class="content" />');

		this.element.prepend(this.titleBar = $('<div class="title-bar '+this.options.titleAddClass+'" />'));
		if(this.options.title)
		{
			this.titleBar.addClass("titlebar-on");
		}
		
		if(typeof this.options.titleText === "string"){
			var titleContainer = this.options.title ? this.titleBar : this.element;
			titleContainer.html('<div class="grp titlebar-content"></div>');
			this.titleBarContent = $(".titlebar-content",titleContainer);
			this.titleBarContent.html('<h1 class="title large">'+this.options.titleText+'</h1>');
			if(this.options.subtitleText !== null){
				this.titleBarContent.append('<p class="subtitle">'+this.options.subtitleText+'</p>');				
			}
		}

		this.element.append(this.footerBar = $('<div class="footerbar" />'));
		this.footer({
			'footer': this.options.footer,
			'footerAddButton': this.options.footerAddButton,
			'footerAddClass': this.options.footerAddClass
			});

		if(this.options.closeButton)
		{
			this.setCloseButton();
		}
		
		if(this.options.overlayAddClass)
		{
			this.element.addClass(this.options.overlayAddClass);
		}
		
		if(this.options.sidebar)
		{
			this.element.removeClass(this.options.overlayAddClass).addClass("overlay-sidebar");
			$(".close,.overlay>div").wrapAll('<div class="grp overlay-columns"><div class="col col-a"></div><div class="col col-b">grey</div></div>');
		}

		if(this.options.modal)
		{
			this.setModal();
		}

		if(VSD.Client.isIE6())
		{
			this.ie6();
		}
		
		this.content = $('<div class="grp content-inner" />');
		$(".content",this.element).append(this.content);
		
		// display overlay content option 1-
		// use jQuery ajax to 
		if(typeof this.options.ajax.url == "string"){
			$.ajax(this.options.ajax);
		}
		
		// display overlay with a content function option 2-
		// use jQuery ajax to 
		if(typeof this.options.content === "function")
		{
			this.options.content();
		}
		
		// display overlay with a content function option 3-
		// use jquery load or iframe
		if(this.options.loadUrl){
			var params = "";
			if(this.options.loadData !== null && typeof this.options.loadData === "object"){
				$.each(this.options.loadData, function(name,value){
					params += "&"+name+"="+value;
				});	
			}
			if(this.options.loadType === "load"){
				this.content.load(this.options.loadUrl+params, function(){
					$("#overlay").overlay("callback");
				});
			} else if(this.options.loadType === "iframe")
			{
				this.content.append('<iframe style="display:none;" src="'+this.options.loadUrl+params+'"></iframe>');
			}
		}
		
		// if no loadUrl do the callback stuff
		else if(typeof this.options.ajax.url != "string") {
			if(this.options.callbackParameter)
			{
				this.options.callback(this.options.callbackParameter);
			}
			else
			{
				this.options.callback();
			}
		}
		
		if(this.options.autoLoad){
			this.load();
			}
		},
	options: {
		ajax: {},
		modal:true,
		modalClose: false,
		reset:true, // needed?
		closeMethod: function(){ _overlay.close(); },
		closeCallback: null,
		closeButton:true,
		loadUrl:null,
		loadData: null,
		loadType: "load",
		title:false,
		titleAddClass:"",
		titleText:null,
		footer:false,
		footerAddClass:"",
		footerAddButton:{},
		cufon:true,	
		subtitleText:null,
		sidebar:false,
		overlayAddClass:null,
		contentHeight:"auto",
		autoLoad:true,
		callback: function(){}
		}
};
$.widget("ui.overlay", Overlay);
/*
 * VSD errorhandling
 */
/**
 * @class Errorhandling
 * Error handling plugin
 * @namespace
*/

var Errorhandling = {
		/** 
		 * 	RegExp <br />
		 *  Error = This field is Required
		 *  @constructor
		 */	
		required: {
		//required	
		value: {
			regex: new RegExp (/[^ ]/),
			error: 'This field is Required'
		},
		//alpha
		/** 
		 *  RegExp <br />
		 *  Error = Please enter letters only
		 *  @constructor
		 */	
		alpha: {
			regex: new RegExp(/^[a-zA-Z]+/),
			error: 'Please enter letters only'
		},
		//numeric
		/** 
		 *  RegExp <br />
		 *  Error = Please enter numbers only
		 *  @constructor
		 */	
		numeric: {
			regex: new RegExp(/^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/),
			error: 'Please enter numbers only'
		},
		// alpha numeric
		/** 
		 *  RegExp <br />
		 *  Error = Please enter numbers and letters only
		 *  @constructor
		 */	
		alphanumeric: {
			regex: new RegExp(/^[a-zA-Z0-9]+$/),
			error: 'Please enter numbers and letters only'
		},
		// inputField
		/** 
		 *  RegExp <br />
		 *  Error = Only Letters, Numbers, Forward Slash, Hash, Hyphens and Question marks are allowed in inputs
		 *	Will  return a non match on any field which contains special characters not allowed.
		 *	Allowed example: "#123" "1/2" "Who?" "1-2-3-4" "Dennis1#-/?" "Dennis ?-#/"
		 *  @constructor
		 */	
		inputField: {
			regex: new RegExp (/^(\s*[a-zA-Z0-9\-\/#]\s*)+$/),
			error: 'Please remove any special characters in the highlighted fields below.'
		},
		// inputField
		/** 
		 *  RegExp <br />
		 *  Error = Only Letters, Numbers, Forward Slash, Hash, Hyphens and Question marks are allowed in inputs
		 *	Will  return a non match on any field which contains special characters not allowed.
		 *	Allowed example: "#123" "1/2" "Who?" "1-2-3-4" "Dennis1#-/?" "Dennis ?-#/"
		 *  @constructor
		 */	
		city: {
			regex: new RegExp (/^(\s*[a-zA-Z0-9\-]\s*)+$/),
			error: 'Please remove any special characters in the highlighted fields below.'
		},
		//email
		/** 
		 *  RegExp <br />
		 *  Error = Please Enter an Email Address
		 *  @constructor
		 */	
		email: {
			regex: new RegExp (/^[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,5}$/),
			error: 'Please Enter an Email Address'
		},
		//emails
		/** 
		 *  RegExp <br />
		 *  Error = Please Enter an Email Address
		 *  @constructor
		 */	
		emails: {
			regex: new RegExp (/^([a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})){1}(,[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,}))*$/),
			error: 'Please Enter an Email Address'
		},
		// nameInput
		/** 
		 *  RegExp <br />
		 *  Error = Please remove any salutations or titles
		 *	Will  return a non match on any of of these with a space or "." following (non case sensitive: Dr Mr Mrs Ms Sr Jr
		 *	non match on single word Miss PhD Sr Jr and 1st 2nd 4rd 4th 5th (not case sensitive)
		 *  @constructor
		 */	
		nameInput: {
			regex: new RegExp (/(?!.*?(?:^|\W)(?:(?:Dr|Mr|Mrs|Ms|Sr|Jr)\.?|Miss|PHD|BA|Sr|Jr|and|1st|2nd|3rd|4th|5th|\+|&)(?:\W|$))^.*$/i),
			error: 'Please remove any salutations or titles in the highlighted fields below'
		},
		// nameFirstLast
		/** 
		 *  RegExp <br />
		 *  Error = Only Letters, Hyphens and Apostrophes are allowed in First and Last names
		 *	Will  return a non match on any person first or last name that contains numbers or specials characters.
		 *	Allowed example: "O'Brian" "St-Claire" "Van Derm"  (note, 2 words max, will ignore white spaces)
		 *  @constructor
		 */	
		nameFirstLast: {
			regex: new RegExp (/^(\s*[a-zA-Z]+(([\'\-\s]\s*[a-zA-Z])?[a-zA-Z]*)\s*)+$/),
			error: 'Please remove any special characters in the highlighted fields below.'
		},
		//password
		/** 
		 *  RegExp <br />
		 *  Error = Please Enter a valid Password
		 *  @constructor
		 */	
		password: {
			regex: new RegExp (/^(?=.*[a-zA-Z0-9]).{4,12}$/),
			error:'Please Enter a valid Password'	
		},
		//postalCode - Matches 12345 | 12345-1234 | A1H 4A2
		/** 
		 *  RegExp <br />
		 *  Error = Please Enter a Postal Code
		 *  @constructor
		 */	
		postalCode: {
			regex: new RegExp (/^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/),
			error:'Please Enter a Postal Code'	
		},
		//us zip
		/** 
		 *  RegExp <br />
		 *  Error = Please Enter a Zip Code
		 *	Looks for 5 numeric digits, if zip + 4, looks for 4 digits with an optional space or "-" seperation
		 *	Matches "12345"  "123451234" "12345 1234" "12345-1234"
		 *  @constructor
		 */	
		usZip: {
			regex: new RegExp (/^(?!0{5})(\d{5})(?!-?0{4})(\s*-?\d{4})?$/),
			error:'Please Enter a Zip Code'	
		},
		//canadian zip
		/** 
		 *  RegExp <br />
		 *  Error = Please Enter a Canadian Postal Code
		 *	Looks for an alpha charter to start (upper or lower case) string, then 1 numeric, then one alpha
		 *	next group of 3 can be together or seperated by an optional space.  Looks for 1 numeric, one alpha and 1 numeric
		 *  @constructor
		 */	
		caZip: {
			regex: new RegExp (/^[a-zA-Z]{1}\d{1}[a-zA-Z]{1}\s?\d{1}[a-zA-Z]{1}\d{1}$/), 
			error:'Please Enter a Canadian Postal Code'	
		},
		//us phone 
		/** 
		 *  RegExp <br />
		 *  Error = Please Enter a Phone Number
		 *	Looks for (222) 333-1234 | 222.333.1234 | 223-123-1232 | 2223334444
		 *	Pretty much any combination of the above
		 *  @constructor
		 */	
		usPhone: {				
			regex: new RegExp (/^(?:\+?1[-. ]?)?\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/),
			error:'Please Enter a Phone Number'	
		},
		//credit card
		/** 
		 *  RegExp <br />
		 *  Error = Please Enter a Valid Credit Card Number
		 *  @constructor
		 */	
		creditcard: {
			regex: new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|3088|1800|35\d{3})\d{11})|(2[5-9][0-9]|59[0-9]|81[3-9]|82[0-9]|8[6-9][0-9]|9[6-7][0-9]){1}\d{6}|(?:x+)\d{4}$/),
			error:"Please Enter a Valid Credit Card Number"
		}
	},
	/**
	 * Builds all errors
	 * @constructor
	 */
	errors: [],
	/** 
	 * Initiates the validation function
	 * @constructor 
	 */
	_init: function() {
		if(this.options.format)
		{
			this.formatInput();
		}
		if(this.element.parents(VSD.Overlay.id)[0])
		{
			this.tooltipEnd = $(VSD.Overlay.footer, VSD.Overlay.id).offset().top;
		}
		if(this.options.autoSubmit){
			this.validate();
		} else if(this.options.unbindForm === true) {
			this.element.unbind("submit");
			this.element.bind("submit", { sender: this }, function(e){
				e.preventDefault();
				e.data.sender.validate();
			});
		} else if(this.options.bindFormSubmit === true && this.options.unbindForm === false) {
			var _old_submit = $.Event("submit");
			this.element.unbind("submit");
			this.element.bind("submit", { sender: this }, function(e){
				e.preventDefault();
				e.data.sender.validate();
				$(this).unbind("submit");
				$(this).bind("submit", _old_submit);
			});
		}
	},
	/**
	 * Run validate function <br/>
	 * Run special password tests <br/>
	 * If special password test passes<br/>
	 * Run against RegEx<br/>
	 * If errors are found, report error <br />
	 * If no errors are found<br/>
	 * Success
	 * @constructor  
	 */
	validate: function(){
		_this = this;
		_this.errors = [];
		
		this.options.onValidate();
		
		// run special
		this.specialTests();
		
		// if special passed test regex
		if(this.specialPassed){
			this.regexTests();		
			if(_this.errors.length > 0)
			{
				_this.error();
				this.options.errorCallback();
			}

			if(_this.errors.length > 0)
			{				
				_this._next();
			}
			else
			{
				_this.success();
			}
		}
	},
	/**
	 * Special Password Test
	 * @constructor
	 */
	specialTests: function(){
		this.noErrors();
		this.specialPassed = true;
		$.each(this.options.special, function(i, test){
			if(!test())
			{
				_this.specialPassed = false;
				return false;
			}
		});
	},
	/**
	 * Check data for required classes
	 * @config {string} [substring] "required-"
	 * @constructor
	 */
	regexTests: function(){
		/** @function */
		var requiredA = [];
		$.each(_this.required, function(type, data){
			requiredA.push(".required-"+type);
		});
		this.requiredClasses = requiredA.toString();
		/** @function */
		$(this.requiredClasses, _this.element).each(function(i, el){
			var element = $(el);
			var str = element.attr("class");
			var typ = str.substring(str.indexOf("required-"), str.indexOf(" ", str.indexOf("required-")) === -1 ? str.length : str.indexOf(" ", str.indexOf("required-"))).replace("required-", "");
			/** @private */
			_this.test({
				type: typ,
				displayName: element.data("displayName") ? element.data("displayName") : "Field",
				element: element,
				view: element.hasClass("ui-select") && element.hasClass("pre-rendered") && !VSD.Client.isIOS() ? element.next(".ui-select").find(".ui-selectmenu")
						: element.hasClass("ui-select") && !VSD.Client.isIOS() ? $(element.next('a.ui-select'))
								: element.hasClass("ui-checkbox") ?  $(element.next('a.ui-checkbox'))
										: element.hasClass("ui-radio") ? $(element.next('a.ui-radio'))
												: element,
				instruction: element.data("instruction") ? element.data("instruction") : _this.required[typ] ? _this.required[typ].error : _this.required.value.error,
				defaultValue: element.data("defaultValue"),
				position: element.hasClass("tooltip-right") ? "right" : "left",
				offset: element.data("offset") ? element.data("offset") : {top:0,left:0},
				invalid: element.data("invalid") ?  element.data("invalid") : ''
			});
		});
		
		$.each(this.options.requirements, function(i, requirement){
			var $element = $(requirement.element);
			/** @private */
			_this.test({
				type: requirement.type ? requirement.type : "value",
				displayName: requirement.displayName ? requirement.displayName : "Field",
				element: $element,
				view: $element.hasClass("ui-select") && $element.hasClass("pre-rendered") && !VSD.Client.isIOS() ? $element.next(".ui-select").find(".ui-selectmenu")
						: $element.hasClass("ui-select") && !VSD.Client.isIOS() ? $($element.next('a.ui-selectmenu'))
								: $element.hasClass("ui-checkbox") ?  $($element.next('a.ui-checkbox'))
										: $element.hasClass("ui-radio") ? $($element.next('a.ui-radio'))
												: $element,
				instruction: requirement.instruction ? requirement.instruction : _this.required[requirement.type] ? _this.required[requirement.type].error : _this.required.value.error,
				defaultValue: requirement.defaultValue,
				position: requirement.position ? requirement.position : "left",
				offset: requirement.offset ? requirement.offset : {top:0,left:0},
				minLength: requirement.minLength ? requirement.minLength : 1,
				invalid: requirement.invalid ?  requirement.invalid : '',
				maxLength: requirement.maxLength ? requirement.maxLength : -1
			});
		});
	},
	/**
	 * Requirement Validation
	 * @config {string} [element.is] If the element class is "a.ui-select"
	 * @config {string} [element.removeClass] Removes required value class from the element
	 * @param {object} [element.hasClass] If the element class is "ui-checkbox"
	 * @param {object} [element.is] Check to see if the element is checked
	 * @constructor
	 */
	test: function(requirement){
		
		// if the element tested the view
		// remove the required value
		// and return true
		if(requirement.element.is("a.ui-select") || requirement.element.is("a.ui-selectmenu")){
			requirement.element.removeClass("required-value");
			return true;
		}
		
		// check if the element is checked
		if(requirement.element.hasClass("ui-checkbox")){
			if(requirement.element.is(":checked")){
				$.each(_this.errors, function(i, el){
					if(eval(requirement) === eval(el)){
						_this.remove(i);
						_this._next();
					}
				});
			} else {
				_this.add(requirement);
			}
			return true;
		}
		
		// add the error if it does not pass tests
		/**
		 * Pass or error if failed
		 * @function
		 */
		if(requirement.element.val() === requirement.defaultValue 
				|| requirement.element.val() === "" 
					|| (typeof requirement.type !== "undefined" && _this.required[requirement.type].regex.test(requirement.element.val()) === false)
						|| requirement.element.val().length < requirement.minLength
							|| requirement.invalid.indexOf( requirement.element.val() ) !== -1
								|| requirement.invalidMatch === requirement.element.val()){
			_this.add(requirement);
		}
		// remove the error
		else {
			$.each(_this.errors, function(i, el){
				if(eval(requirement) === eval(el)){
					_this.remove(i);
					_this._next();
				}
			});
		}
	},
	/** @function */
	add: function(requirement, showTooltip){
		var isAlreadyError = false;
		$.each(_this.errors, function(i, error){
			if(requirement.element === error.element) {
				isAlreadyError = true;
			}
		});
		if(isAlreadyError === false) {
			var temp = $.extend({}, {
				type: requirement.type ? requirement.type : "value",
				invalid: requirement.invalid ?  requirement.invalid : '',
				invalidMatch: requirement.invalidMatch ?  requirement.invalidMatch : ''
			}, requirement);
			_this.errors.push(temp);
			requirement.view.addClass("requirement-error");
			var event = "keyup blur";
			if(requirement.element.is("select") || requirement.element.is(":radio") || requirement.element.is(":checkbox"))
			{
				event = "change";
			}
			requirement.element.bind(event, { 'requirement': temp, 'plugin': this }, this._test);
			
			// user overloaded
			if(showTooltip){
				this._next();
			}
		}
	},
	_test: function(e){
		e.data.plugin.test(e.data.requirement);
	},
	_next: function(){		
		if(this.errors.length > 0){
			// this.errors[0].view.trigger("focus");
			if(this.options.tooltipError){
				this._tooltip();
			}
		} else {
			this.noErrors();
		}
	},
	error: function(message){
		this._highlevel(message);
	},
	lowlevel: function(message){
		if(typeof this.lowlevelError === "undefined"){
			this.lowlevelError = $('<p class="ui-notice"></p>');
			if(this.options.highlevelErrorContainer){
				$(this.options.highlevelErrorContainer).prepend(this.lowlevelError);
			} else{
				this.element.prepend(this.lowlevelError);
			}
		}
		this.lowlevelError.html(message);
		this.lowlevelError.show();
		this.options.errorCallback();
	},
	/**
	 * @function
	 * @private
	 * @config {string} [highlevelError] Returns the message
	 */
	_highlevel: function(message){
		if(this.options.highlevelError || message){
			if(typeof this.highlevelError === "undefined"){
				this.highlevelError = $('<div class="ui-alert"><p></p></div>');
				if(this.options.highlevelErrorList){
					this.highlevelErrorList = $("<ul />");
				}
				if(this.options.highlevelErrorContainer){
					$(this.options.highlevelErrorContainer).prepend(this.highlevelError);
				} else{
					this.element.prepend(this.highlevelError);
				}
			}
			if(this.options.highlevelErrorList){
				this.highlevelErrorList.html("");
				$.each(this.errors, function(i, requirement){
					_this.highlevelErrorList.append('<li>'+requirement.displayName+': '+requirement.instruction+'</li>');
				});
				this.highlevelError.append(this.highlevelErrorList);
			}
			$("p", this.highlevelError).html(message ? message : this.options.highlevelErrorMessage);
			this.highlevelError.show();
		}
	},
	/**
	 * @function
	 * @private
	 */
	_tooltip: function(requirement){
		if(this.options.tooltipError){
			if(typeof this.tooltip === "undefined" || !$(".tooltip-error", "body")[0]){
				if($(".tooltip-error", "body")[0]){
					this.tooltip = $(".tooltip-error", "body");
				} else {
					this.tooltip = $('<div class="tooltip-error grp" style="display: none"><p></p></div>');
					$("body").append(this.tooltip);
				}
			}
			// is tooltip in an overlay or not
			if(this.element.parents(VSD.Overlay.id)[0])
			{
				this.tooltip.addClass("tooltip-overlay");
			}
			else
			{
				this.tooltip.removeClass("tooltip-overlay");
			}
			this.autoScroll();
			// is there an instruction or not
			if(this.errors[0].instruction)
			{
				$("p", this.tooltip).html(this.errors[0].instruction);
				this.moveTooltip();
				this.tooltip.show();
				clearTimeout(this.tooltipTimeout);
				this.honestTooltip();
			} 
			else 
			{
				this.tooltip.hide();
			}
		}
	},
	/** @function */
	autoScroll: function(){
		if(this.element.parents(".jScrollPaneScrollable")[0]){
			this.scrollClient = $(":first-child", this.element.parents(".jScrollPaneContainer")).first()[0];
			if(this.element.parents(".jScrollPaneContainer").height() < this.errors[0].view.position().top + this.tooltip.height())
			{
				this.scrollClient.scrollTo( this.errors[0].view.position().top + this.tooltip.height() );
			}
			$("input.active", this.element).trigger("focus");
		}
	},
	adjustScroll: function(){
		if(this.scrollClient){
			VSD.UI.scrollbar(this.scrollClient);
		}
	},
	formatInput: function(){
//			console.log('format..');
//			$(":input", this.element).each(function(i, el){
//				$e = $(el);
//				if( $e.is(":select") || $e.is(":checkbox") || $e.is(":radio") )
//					return true;
//				console.log($e.attr("name"));
//			});
	},
	honestTooltip: function(){
		if(_this.options.honestTooltip){
			_this.moveTooltip();
			_this.tooltipTimeout = setTimeout(_this.honestTooltip, 10);
		}
	},
	moveTooltip: function(){
		var ttLeft;
		if(!this.errors)
		{
			return true;
		}
		if(this.tooltipEnd){
			if( this.tooltipEnd >= $(_this.errors[0].view).offset().top + $(_this.errors[0].view).outerHeight() )
			{
				this.tooltip.show();
			}
			else
			{
				this.tooltip.hide();
			}
		}
		// try left
		if(this.errors[0].position === "left"){
			ttLeft = $(this.errors[0].view).offset().left - this.tooltip.width() - 5;
			// if left is off screen
			if(ttLeft < 0){
				this.errors[0].position = "right";
			} else {
				this.tooltip.addClass("tooltip-error-left");
				this.tooltip.css({
					left: ttLeft,
//						top: $(this.errors[0].view).offset().top + this.errors[0].offset.top - this.tooltip.outerHeight() / 2
					top: ($(this.errors[0].view).offset().top + $(this.errors[0].view).outerHeight() / 2) + this.errors[0].offset.top - this.tooltip.outerHeight() / 2
				});
			}
		}
		// do right
		if(this.errors[0].position === "right"){
			this.tooltip.removeClass("tooltip-error-left");
			this.tooltip.css({
				left: $(this.errors[0].view).offset().left + $(this.errors[0].view).outerWidth() + 5,
//					top: $(this.errors[0].view).offset().top + _this.errors[0].offset.top - this.tooltip.outerHeight() / 2
				top: ($(this.errors[0].view).offset().top + $(this.errors[0].view).outerHeight() / 2) + this.errors[0].offset.top - this.tooltip.outerHeight() / 2
			});
		}
	},
	/** @function */
	noErrors: function(){
		$(".requirement-error", this.element).removeClass("requirement-error");
		if(this.options.tooltipError && this.tooltip){
			clearTimeout(this.tooltipTimeout);
			this.tooltip.hide();
		}
		if(this.options.highlevelError && this.highlevelError)
		{
			this.highlevelError.hide();
		}
		this.adjustScroll();
	},
	/** @function */
	success: function(){
		this.options.onsuccess();
	},
	/** @function */
	remove: function(i){
		this.errors[i].view.removeClass("requirement-error");
		if(this.errors[i].element.is("input:text"))
		{
			this.errors[i].element.unbind("keyup blur", this._test);
		}
		if(this.errors[i].element.is("select"))
		{
			this.errors[i].element.unbind("change", this._test);
		}
		this.errors.splice(i,1);
	},
	/** @function */
	removeBySelector: function(selector){
		$.each(_this.errors, function(i, error){
			if(error.element.is(selector))
			{
				_this.remove(i);
			}
		});
	},
	/** @function */
	off: function(){
		clearTimeout(this.tooltipTimeout);
		$.each(this.errors, function(i, el){
			//el.element.unbind("change", this._test);
			if(el.element.is("input:text"))
			{
				el.element.unbind("keyup blur", this._test);
			}
			if(el.element.is("select"))
			{
				el.element.unbind("change", this._test);
			}
		});
		this.element.unbind("submit");
		$(".requirement-error", this.element).removeClass("requirement-error");
		if(this.tooltip)
		{
			this.tooltip.remove();
		}
		if(this.highlevelError)
		{
			this.highlevelError.remove();
		}
		this.destroy();
	},
	options: {
		requirements: {},
		special: {},
		onsuccess: function(){},
		errorCallback: function(){},
		onValidate: function(){},
		autoSubmit: false,
		tooltipError: true,
		honestTooltip: true,
		highlevelError: true,
		highlevelErrorContainer: null,
		highlevelErrorMessage: "Please Correct the Highlighted Fields Below.",
		highlevelErrorList: true,
		unbindForm: true,
		format: true,
		bindFormSubmit: false
	}
};
$.widget("ui.errorhandling", Errorhandling);
/*
 * Date Format 1.2.3
 */
var dateFormat=(function(){var token=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,timezone=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,timezoneClip=/[^-+\dA-Z]/g,pad=function(val,len){val=String(val);len=len||2;while(val.length<len){val="0"+val}return val};return function(date,mask,utc){var dF=dateFormat;if(arguments.length===1&&Object.prototype.toString.call(date)==="[object String]"&&!/\d/.test(date)){mask=date;date=undefined}date=date?new Date(date):new Date;if(isNaN(date)){throw SyntaxError("invalid date");}mask=String(dF.masks[mask]||mask||dF.masks["default"]);if(mask.slice(0,4)==="UTC:"){mask=mask.slice(4);utc=true}var _=utc?"getUTC":"get",d=date[_+"Date"](),D=date[_+"Day"](),m=date[_+"Month"](),y=date[_+"FullYear"](),H=date[_+"Hours"](),M=date[_+"Minutes"](),s=date[_+"Seconds"](),L=date[_+"Milliseconds"](),o=utc?0:date.getTimezoneOffset(),flags={d:d,dd:pad(d),ddd:dF.i18n.dayNames[D],dddd:dF.i18n.dayNames[D+7],m:m+1,mm:pad(m+1),mmm:dF.i18n.monthNames[m],mmmm:dF.i18n.monthNames[m+12],yy:String(y).slice(2),yyyy:y,h:H%12||12,hh:pad(H%12||12),H:H,HH:pad(H),M:M,MM:pad(M),s:s,ss:pad(s),l:pad(L,3),L:pad(L>99?Math.round(L/10):L),t:H<12?"a":"p",tt:H<12?"am":"pm",T:H<12?"A":"P",TT:H<12?"AM":"PM",Z:utc?"UTC":(String(date).match(timezone)||[""]).pop().replace(timezoneClip,""),o:(o>0?"-":"+")+pad(Math.floor(Math.abs(o)/60)*100+Math.abs(o)%60,4),S:["th","st","nd","rd"][d%10>3?0:(d%100-d%10!=10)*d%10]};return mask.replace(token,function($0){return $0 in flags?flags[$0]:$0.slice(1,$0.length-1)})}}());dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};Date.prototype.format=function(mask,utc){return dateFormat(this,mask,utc)};
/*
 * vsdselectmenu
 */
/**
 * @class VSDSelectMenu
 * VSD Select menu plugin
 */

(function($) {

var Parent = $.ui.selectmenu;
$.widget("ui.vsdselectmenu", Parent, {
	/**
	 * Add Options to select menu
	 *
	 * @param {Object} opts 
		-type
		 -value
		 -id
		 -attribute_id
		if type == 'color':
		 -swatchURL
		 -colorName
		 -colorCode
	 */
	addOptions: function(opts) {
		for(var i in opts) {
			var o = opts[i];
			var display = "";
			var $newOpt = $('<option></option>');
			if( o.type == 'size' ) {
				display += o.value;
			} else if( o.type = 'color') {
				if(o.swatchURL != undefined)
					display += '<span class="image-container"><span class="overlay"></span>'+
						'<img width="16" height=:"16" src="'+o.swatchURL+'" alt="'+
						o.colorName+'" /></span><span class="text-container">'+
						o.colorName + ' (' + o.colorCode + ')</span>';
				else display += o.colorName + ' (' + o.colorCode + ')';
				$newOpt.addClass('color');
			}
			if(o.id != undefined)
				$newOpt.data('id', o.id);
			if(o.attribute_id != undefined)
				$newOpt.data('attribute_id', o.attribute_id);
			if(o.value != undefined)
				$newOpt.attr('value', o.value);
			$newOpt.data('display', display);
			$newOpt.html(display);
			this.element.append($newOpt);
		}
		if(!this._rendered) {
			this._render();
		} else {
			this._initSelectOptionData();
		}
	},
	/**
	 * Open the select menu
	 *
	 * @param {string} event
	 */
	open: function(event){
		var self = this;
		var i = $(self.newelement).attr('id');
		$('.ui-selectmenu[id!="'+i+'"]').each(function(){
			var selectmenu = $(this).data('selectmenu');
			if(selectmenu != undefined) selectmenu.close(event);
		});
		o = this.options;
		this._refreshPosition();
		this._closeOthers(event);
		this.newelement
			.attr('aria-expanded', true)
			.addClass('ui-state-active');
		this.list
			.appendTo('body')
			.addClass('ui-selectmenu-open')
			.attr('aria-hidden', false)
			.find('p:not(.ui-selectmenu-group):eq('+ this._selectedIndex() +') a').focus();
		if(this.options.style == "dropdown")
			this.newelement.removeClass('ui-corner-all').addClass('ui-corner-top');
		this._refreshPosition();
		var setCloseExternal = function() {
			self._closeExternal = function() {
				self.close();
			};
			$(document).bind('mousedown', self._closeExternal);
		};
		var tmout = setTimeout(setCloseExternal, 100); 
		//this._trigger("open", event, this._uiHash());
	},
	/**
	 * Add classes to each option
	 *
	 * @param {string} class
	 */
	addOptionClass: function(clss) {
		this.listContainer.children().each(function() {
			$(this).addClass(clss);
		});
	},
	/**
	 * Close the select menu
	 *
	 * @param {string} event
	 * @param {boolean} retainFocus
	 */
	close: function(event, retainFocus){
		if(this.newelement.is('.ui-state-active')) {
			this.newelement
				.removeClass('ui-state-active');
			this.list
				.attr('aria-hidden', true)
				.removeClass('ui-selectmenu-open');
			this.newelement.removeClass('ui-corner-top').addClass('ui-corner-all');
			if(retainFocus){this.newelement[0].focus();}
			//this._trigger("close", event, this._uiHash());
			this.newelement.removeClass("ui-state-hover");
			this.newelement.removeClass("ui-selectmenu-focus");
		}
		if(this._closeExternal != undefined) {
			$(document).unbind('mousedown', this._closeExternal);
			delete this._closeExternal;
		}
	},
	/**
	 * Destroy the select menu
	 *
	 */
	destroy: function() {
		this.element.removeData(this.widgetName)
			.removeClass('.ui-selectmenu-disabled' + ' ' + this.namespace + '-state-disabled')
			.removeAttr('aria-disabled');
	
		//unbind click on label, reset its for attr
		$('label[for='+this.newelement.attr('id')+']')
			.attr('for',this.element.attr('id'))
			.unbind('click');
		this.newelement.remove();
		this.list.remove();
		this.element.show();	
	},
	/**
	 * Change event
	 *
	 * @param {string} event
	 */
	change: function(event) {
		this.element.trigger('change');
		//this._trigger("change", event, this._uiHash());
	},
	/**
	 * Select an option by index
	 *
	 * @param {integer} index The index of the option to select
	 */
	selectByIndex: function(index) {
		var value = this.element.children().eq(index).attr('value');
		this.element.val(value);
		this._selectByValue();
	},
	/**
	 * Get or set the value for the input
	 *
	 * @param {string} v The value to set the input to
	 * @return {string} The value of the input
	 */
	value: function(v) {
		var response = this._setValue(v);
		if(v != undefined) {
			this._selectByValue();
		}
		return response;
	},
	/**
	 * Get the selected id
	 *
	 * @return {string} The attribute ID for the selected item
	 */
	selected: function() {
		return this._selectedId;
	},
	/**
	 * Select an option by the control object
	 *
	 * @param {JQuery object} $selector The selector to select
	 */
	select: function($selector) {
		if($selector.data('attribute_id') != undefined)
			this._selectedId = $selector.data('attribute_id');
		$selector.attr("selected",true);
		var index = $selector.data('index');
		var value = this.element.children().eq(index).attr('value');
		if($selector.hasClass('prompt')) {
			this._setValue(value);
			this.element.trigger('deselect');
		} else {
			if($selector.hasClass('not-available')) {
				if(this.productform.productform('selectNotAvailable')) {
					this.list
						.find('.selected')
						.removeClass("selected")
						.find('a')
						.attr('aria-selected', 'false')
						.attr('id', '');
					var activeID = 'ui-selectmenu-item-' + Math.round(Math.random() * 1000);
					$selector.addClass("selected")
						.find('a')
						.attr('aria-selected', 'true')
						.attr('id', activeID);
					this._setValue(value);
				}
				this.element.trigger('select-unavailable');
			} else {
				this.list
					.find('.selected')
					.removeClass("selected")
					.find('a')
					.attr('aria-selected', 'false')
					.attr('id', '');
				var activeID = 'ui-selectmenu-item-' + Math.round(Math.random() * 1000);
				$selector.addClass("selected")
					.find('a')
					.attr('aria-selected', 'true')
					.attr('id', activeID);
				this._setValue(value);
				this.element.trigger('select');
			}
		}
		this._refreshValue();
		this._refreshPosition();
	},
	/**
	 * Deselect the control
	 *
	 */
	deselect: function() {
		delete this._selectedId;
		this.element.find('.selected').removeClass('selected');
		this.input.val('');
	},
	/**
	 * Set the product form
	 *
	 * @param {ProductForm} The Product Form that the select menu resides in
	 */
	setProductForm: function(form) {
		this.productform = form;
	},
	/** @private */
	_findMenuWidth: function() {
		var self = this;
		var menuWidth = 0;
		var $container = $('<div id="tmp-container" style="background:#ffffff;'+
			'font-size:11px;position:absolute;left:0;top:0;width:100%"></div>');
		$('body').append($container);
		var promptTxt = this.listContainer.children(':first').html();
		var prepend = true;
		this.listContainer.children().each(function(){
			var txt = $(this).html();
			var $tmp = $('<span style="display:inline-block;">'+txt+'</span>');
			$container.append($tmp);
			var w = $tmp.innerWidth() + ($.support.boxModel ? 44 : 34);
			$tmp.remove();
			if(w > menuWidth) menuWidth = w;
		});
		$container.remove();
		this.options.menuWidth = Math.ceil(menuWidth);
		if(this.options.fluidWidth) {
			this.options.width = this.options.menuWidth - this.newElementWidthOffset + this.menuWidthOffset;
			this.newelement.css('width', this.options.width);
			this.newelement.find('.ui-selectmenu-status').css('width', this.options.width);
		} else if(this.options.menuWidth < this.options.width + this.newElementWidthOffset)
			this.options.menuWidth = this.options.width + this.newElementWidthOffset - this.menuWidthOffset;
		this.list.css( 'width', this.options.menuWidth + 'px' );
	},
	/** @private */
	_prerendered: function() {
		return true;
		this.originalId = this.element.attr('id');
		this.pluginId = 'vsd-selectmenu-' + this.originalId;
		this.ids = [ this.pluginId + '-button', this.pluginId + '-menu-select' ];
		this.newelement = $('#'+this.ids[0]);
		this.newelement.css('width',this.options.width);
		this.screen = this.newelement.find('.ui-selectmenu-screen');
		var tabindex = this.element.attr('tabindex') || '0';
		this.newelement.data('selectelement', this.element);
		this.newelement.data('selectmenu', this);
		$('label[for='+this.element.attr('id')+']')
			.attr('for', this.ids[0])
			.bind('click', function(){
				self.newelement.focus();
				return false;
			});
		this.list = $('#'+this.ids[1]);
		this.listContainer = this.list.find('.listContainer');
		this._selectOptions = this.list.find('p:not(.ui-selectmenu-group)');
		this._bindListeners();
		this._findMenuWidth();
		if(this.element.children(':selected').length <= 0) {
			this.select(this.list.find('.prompt:first'));
		} else {
			this._selectByValue();
		}
		this._rendered = true;
	},
	/** @private */
	_bindListeners: function() {
		var self = this;
		this.element.bind('toggle', function(){
			self._toggle();
		});
		this.newelement
			.bind('mousedown', function(event){
				self._toggle();
			})
			.bind('click',function(){
				return false;
			})
			.keydown(function(event){
				var ret = true;
				switch (event.keyCode) {
					case $.ui.keyCode.ENTER:
						ret = true;
						break;
					case $.ui.keyCode.SPACE:
						ret = false;
						self._toggle(event);
						break;
					case $.ui.keyCode.UP:
					case $.ui.keyCode.LEFT:
						ret = false;
						self._moveSelection(-1);
						break;
					case $.ui.keyCode.DOWN:
					case $.ui.keyCode.RIGHT:
						ret = false;
						self._moveSelection(1);
						break;
					case $.ui.keyCode.TAB:
						ret = true;
						break;
					default:
						ret = false;
						self._typeAhead(event.keyCode, 'mouseup');
						break;
				}
				return ret;
			})
			.bind('mouseover focus', function(){ 
				$(this).addClass('ui-selectmenu-focus ui-state-hover');
			})
			.bind('mouseout blur', function(){
				$(this).removeClass('ui-selectmenu-focus ui-state-hover'); 
			});
		this.element
			.click(function(){ this._refreshValue(); })
			.focus(function(){ this.newelement.focus(); });
		this.list
			.keydown(function(event){
			var ret = true;
			switch (event.keyCode) {
				case $.ui.keyCode.UP:
				case $.ui.keyCode.LEFT:
					ret = false;
					self._moveFocus(-1);
					break;
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.RIGHT:
					ret = false;
					self._moveFocus(1);
					break;	
				case $.ui.keyCode.HOME:
					ret = false;
					self._moveFocus(':first');
					break;	
				case $.ui.keyCode.PAGE_UP:
					ret = false;
					self._scrollPage('up');
					break;	
				case $.ui.keyCode.PAGE_DOWN:
					ret = false;
					self._scrollPage('down');
					break;
				case $.ui.keyCode.END:
					ret = false;
					self._moveFocus(':last');
					break;			
				case $.ui.keyCode.ENTER:
				case $.ui.keyCode.SPACE:
					ret = false;
					self.close(event,true);
					$(event.target).parents('p:eq(0)').trigger('mouseup');
					break;		
				case $.ui.keyCode.TAB:
					ret = true;
					self.close(event);
					break;	
				case $.ui.keyCode.ESCAPE:
					ret = false;
					self.close(event,true);
					break;	
				default:
					ret = false;
					self._typeAhead(event.keyCode,'focus');
					break;
			}
			return ret;
		});
		var i = 0;
		this.listContainer.children().each(function(){
			$(this).data('index',i)
				.mouseup(function(event) {
					if(self._safemouseup){
						var changed = $(this).data('index') != self._selectedIndex();
						if(changed) {
							self.select($(this));
							self.change(event);
						}
						self.close(event,true);
					}
				})
				.click(function() {
					return false;
				})
				.bind('mouseover focus', function(){
					self._focusedOption().removeClass('ui-selectmenu-item-focus ui-state-hover');
					$(this).removeClass('ui-state-active').addClass('ui-selectmenu-item-focus ui-state-hover');
				})
				.bind('mouseout blur', function(){
					$(this).removeClass('ui-selectmenu-item-focus ui-state-hover');
					self._selectedOption()
						.addClass('ui-state-hover ui-selectmenu-item-focus');
					return false;
				});
			i++;
		});
		this.list.bind('mousedown mouseup', function(){return false;});
		this.listContainer.bind('mousedown mouseup', function(){return false;});
	},
	/** @private */
	_render: function() {
		var self = this, o = this.options;
		var originalId = this.element.attr('id');
		if(originalId == undefined) originalId = Math.round(Math.random() * 1000);
		this.pluginId = 'vsd-selectmenu-' + originalId;
		this.ids = [ this.pluginId + '-button', this.pluginId + '-menu-select' ];
		this.newelement = $('<a class="ui-selectmenu ui-widget ui-state-default ui-corner-all" id="'+this.ids[0]+
			'" role="button" href="#" aria-haspopup="true" aria-owns="'+this.ids[1]+
			'" aria-expanded="false"><span class="container"><span class="ui-selectmenu-screen"></span></span></a>')
			.insertAfter(this.element);
		this.screen = this.newelement.find('.ui-selectmenu-screen');
		var tabindex = this.element.attr('tabindex') || '0';
		this.newelement.attr('tabindex', tabindex);
		this.newelement.data('selectelement', this.element);
		this.newelement.data('selectmenu', this);
		var newElementClasses = this.newelement.attr('class');
		var oldElementClasses = this.element.attr('class');
		this.newelement.attr('class', oldElementClasses + ' ' + newElementClasses);
		this.element.bind('toggle', function(){
			self._toggle();
		});
		$('label[for='+this.element.attr('id')+']')
			.attr('for', this.ids[0])
			.bind('click', function(){
				self.newelement.focus();
				return false;
			});
		var cornerClass = (o.style == "dropdown")? " ui-corner-bottom" : " ui-corner-all";
		var tmpstr = '<div class="ui-selectmenu-menu ui-widget ui-widget-content'+cornerClass+'" aria-hidden="true" role="listbox" aria-multiselectable="false" aria-labelledby="'+this.ids[0]+'" id="'+this.ids[1]+'"></div>';
		this.list = $(tmpstr).appendTo('body');
		tmpstr = '<div class="listContainer"></div>';
		this.listContainer = $(tmpstr)
			.appendTo(this.list);
		this._initSelectOptionData();
		this.newelement
			.addClass("ui-selectmenu-dropdown");
		this.list
			.addClass("ui-selectmenu-menu-dropdown");
		this.newelement.children(':first').prepend('<span class="ui-selectmenu-status"></span>');
		if(this.element.attr('disabled') == true){ this.disable(); }
		this.element.hide();
		this.newelement.css('width', o.width);
		var $status = this.newelement.children('.ui-selectmenu-status:first');
		$status.css("width", o.width);
		this._bindListeners();		
		if(this.element.children(':selected').length <= 0) {
			this.select(this.list.find('.prompt:first'));
		} else {
			this._selectByValue();
		}
		this._rendered = true;
	},
	/** @private */
	_initSelectOptionData: function() {
		var self = this;
		var data = [];
		this.element
			.find('option')
			.each(function(){
				data.push({
					value: $(this).attr('value'),
					text: ($(this).data('display') == undefined) ? self._formatText($(this).text()) : $(this).data('display'),
					selected: $(this).attr('selected'),
					classes: $(this).attr('class'),
					parentOptGroup: $(this).parent('optgroup').attr('label')
				});
			});
		this.listContainer.html('');
		var self = this;
		var selectOptionData = [];
		var i = 0;
		this.element.children().each(function(){
			var $opt = $(this);			
			var optData = {
				id: $opt.data('id'),
				attribute_id: $opt.data('attribute_id'),
				value: $opt.attr('value'),
				text: ($opt.data('display') == undefined) ? self._formatText($(this).text()) : $(this).data('display'),
				selected: $opt.attr('selected'),
				classes: $opt.attr('class'),
				parentOptGroup: $opt.parent('optgroup').attr('label')
			};
			if($opt.val() == '')
				optData.classes += ' prompt';
			var listr = '<p><a href="#" tabindex="'+i+
				'" role="option" aria-selected="false">'+ 
				optData.text +'</a></p>';
			var $newopt = $(listr)
				.appendTo(self.listContainer)
				.addClass(optData.classes);				
			if( optData.attribute_id != undefined )
				$newopt.data('attribute_id', optData.attribute_id);
			if( optData.id != undefined )
				$newopt.attr('id', optData.id);
			i++;
		});
		this._selectOptions = this.list.find('p:not(.ui-selectmenu-group)');
		this._findMenuWidth();
		this.listContainer.children(":first").addClass("first");
		this.listContainer.find(".ui-corner-bottom").removeClass("ui-corner-bottom");
		this.listContainer.find(".last").removeClass("last");
		this.listContainer.children(":last").addClass("last ui-corner-bottom");
		this._selectOptions = this.list.find('p:not(.ui-selectmenu-group)');
		if(this.options.maxHeight < this.list.height()) { this.list.height(this.options.maxHeight); }		
	},
	/** @private */
	_init: function() {
		this.element.data('selector',this);
		if(this._rendered == undefined)
			this._rendered = false;
		var o = this.options;
		this._safemouseup = true;
		this.browser_offset_height = $.support.boxModel ? 11 : 11;
		this.newElementWidthOffset = $.support.boxModel ? 34 : 0;
		this.menuWidthOffset = $.support.boxModel ? 2 : 0;
		var elementHeight = 26;
		var numOptions = 11;
		o.maxHeight = numOptions * elementHeight - this.browser_offset_height;
		o.fluidWidth = this.element.hasClass('fluid-width');
		o.width = this.element.outerWidth() - this.newElementWidthOffset;
		if(this.element.hasClass('pre-render')) {
			this._prerendered();
		} else {
			if(this.element.children().length > 0 && 
				navigator.userAgent.match(/iPad/i) == null && 
				navigator.userAgent.match(/iPad/i) == null && !this._rendered) {
				this._render();
			}
		}
	},
	/** @private */
	_moveFocus: function(amt){
		var $currFocusedOption = this._focusedOption();
		if(!isNaN(amt)){
			var currIndex = parseInt($currFocusedOption.data('index'), 10);
			var newIndex = currIndex + amt;
		}
		else { var newIndex = parseInt(this._selectOptions.filter(amt).data('index'), 10); }
		if(newIndex < 0){ newIndex = 0; }
		if(newIndex > this._selectOptions.size()-1){
			newIndex =  this._selectOptions.size()-1;
		}
		var activeID = 'ui-selectmenu-item-' + Math.round(Math.random() * 1000);
		$currFocusedOption.removeClass('ui-selectmenu-item-focus').removeClass('ui-state-hover').find('a:eq(0)').attr('id','');
		$newFocusedOption = this._selectOptions.eq(newIndex);
		$newFocusedOption.addClass('ui-selectmenu-item-focus').addClass('ui-state-hover').find('a:eq(0)').attr('id',activeID)[0].focus();
		this.list.attr('aria-activedescendant', activeID);
	},
	/** @private */
	_refreshPosition: function(){
		//set left value
		var $content = $('#content');
		var elementOffset = this.newelement.offset();
		var elementWidth = this.newelement.outerWidth();
		var menuWidth = this.list.outerWidth();
		var minX = $content.offset().left;
		var maxX = $content.offset().left + $content.width();
		var x = elementOffset.left;
		if(x + menuWidth > maxX) {
			x = elementOffset.left + elementWidth - menuWidth;
		}
		this.list.css('left', x);
		//set top value
		var menuTop = elementOffset.top + 25;
		this.list.css('top', menuTop);
	},
	/** @private */
	_scrollPage: function(direction){
		var numPerPage = Math.floor(this.list.outerHeight() / this.list.find('p:first').outerHeight());
		numPerPage = (direction == 'up') ? -numPerPage : numPerPage;
		this._moveFocus(numPerPage);
	},
	/** @private */
	_typeAhead: function(code, eventType){
		var self = this;
		var firstOption=0;
		var firstIndex=0,lastIndex=0;
		//define self._prevChar if needed
		if(!self._prevChar){ self._prevChar = ['',0]; }
		var C = String.fromCharCode(code);
		c = C.toLowerCase();
		var focusFound = false;
		function focusOpt(elem, ind){
			focusFound = true;
			$(elem).trigger(eventType);			
			self._prevChar[1] = ind;
		};
		var Options = this.list.find('p a').filter(function () {
			var ta_regex= '^'+C;var ta_regex2= '^'+c;
			return ($(this).text().match(ta_regex) || $(this).text().match(ta_regex2));			
		});
		var numOptions = Options.length;
		
		firstOption = Options[0];
		var lastOption = Options[Options.length-1];
		firstIndex = $(firstOption).attr('tabindex');
		lastIndex = $(lastOption).attr('tabindex');	
		var veryLastIndex= this.list.find('p a:last').attr('tabindex');			
		this.list.find('p a').each(function(i){
			if (i > lastIndex && !focusFound && C==self._prevChar[0] && firstIndex!=0) {	
				focusOpt(firstOption,firstIndex);
				self._prevChar[1]=firstIndex;
			}	
			if(!focusFound){
				var thisText = $(this).text();
				if( thisText.indexOf(C) == 0 || thisText.indexOf(c) == 0){				
						if(self._prevChar[0] == C){
							if(self._prevChar[1] < i){ 
								focusOpt(this,i);						
								}														
						}						
						else{focusOpt(this,i); }
				}
			}
		});	
		
		if(self._prevChar[1]==veryLastIndex && !focusFound && C==self._prevChar[0] && firstIndex!=0) {focusOpt(firstOption,firstIndex);}
		this._prevChar[0] = C;
		
	},
	/** @private */
	_refreshValue: function() {
		var $selectedOption = this._selectedOption();
		var currentOptionClasses = this.newelement.data('optionClasses') ? this.newelement.data('optionClasses') : "";
		var newOptionClasses = $selectedOption.data('optionClasses') ? $selectedOption.data('optionClasses') : "";
		var $status = this.newelement
			.removeClass(currentOptionClasses)
			.data('optionClasses', newOptionClasses)
			.addClass( newOptionClasses )
			.find('.ui-selectmenu-status');
		if( this._selectedOption().hasClass('prompt') )
			$status.removeClass("selected");
		else
			$status.addClass("selected");
		this.list.attr('aria-activedescendant', $selectedOption.find('a:eq(0)').attr('id'));
		var newStatus = $selectedOption.find('a:eq(0)').html();
		if( this.element.hasClass('prepend') && !$selectedOption.hasClass('prompt') )
			newStatus = this.list.find('.prompt a').html() + ' ' + newStatus;
		$status.html(newStatus);
		if($status.children().length == 0) {
			$status.html('<span>'+newStatus+'</span>');
		}
		var w = 0;
		if(w == 0) {
			$status.children().each(function() {
				w += $(this).width();
			});
		}
		if(this.newelement.width() < w)
			this.screen.show();
		else 
			this.screen.hide();
	},
	/** @private */
	_uiHash: function(){
		return {
			value: this.value()
		};
	},
	/** @private */
	_closeOthers: function(event){
		$('.ui-selectmenu.ui-state-active').not(this.newelement).each(function(){
			$(this).data('selectelement').selectmenu('close',event);
		});
	},
	/** @private */
	_toggle: function(){
		if(this.list.is('.ui-selectmenu-open')){ this.close(); }
		else { this.open(); }
	},
	/** @private */
	_formatText: function(text){
		return this.options.format ? this.options.format(text) : text;
	},
	/** @private */
	_selectedIndex: function(){
		return this.element[0].selectedIndex;
	},
	/** @private */
	_selectedOption: function(){
		return this._selectOptions.eq(this._selectedIndex());
	},
	/** @private */
	_focusedOption: function(){
		return this.list.find('.ui-selectmenu-item-focus');
	},
	/** @private */
	_moveSelection: function(amt){
		var currIndex = parseInt(this._selectedOption().data('index'), 10);
		var newIndex = currIndex + amt;
		if(newIndex < 0){ newIndex = 0; }
		if(newIndex > this._selectOptions.size()-1) {
			newIndex =  this._selectOptions.size()-1;
		}
		return this._selectOptions.eq(newIndex).trigger('mouseup');
	},
	/** @private */
	_setData: function(key, value) {
		this.options[key] = value;
		if (key == 'disabled') {
			this.close();
			this.element
				.add(this.newelement)
				.add(this.list)
					[value ? 'addClass' : 'removeClass'](
						'ui-selectmenu-disabled' + ' ' +
						this.namespace + '-state-disabled')
					.attr("aria-disabled", value);
		}
	},
	/** @private */
	_setValue: function(v) {
		return this.element.val(v);
	},
	/** @private */
	_selectByValue: function() {
		var value = this.element.val();
		if(value != undefined && value != '') {
			var $selector = this._selectOptions.eq(this._selectedIndex());
			this._selectedId = $selector.data('attribute_id');
			if($selector.hasClass('not-available')) {
				if(this.productform.productform('selectNotAvailable')) {
					this.list
						.find('.selected')
						.removeClass("selected")
						.find('a')
						.attr('aria-selected', 'false')
						.attr('id', '');
					var activeID = 'ui-selectmenu-item-' + Math.round(Math.random() * 1000);
					$selector.addClass("selected")
						.find('a')
						.attr('aria-selected', 'true')
						.attr('id', activeID);
				}
			} else {
				this.list
					.find('.selected')
					.removeClass("selected")
					.find('a')
					.attr('aria-selected', 'false')
					.attr('id', '');
				var activeID = 'ui-selectmenu-item-' + Math.round(Math.random() * 1000);
				$selector.addClass("selected")
					.find('a')
					.attr('aria-selected', 'true')
					.attr('id', activeID);
			}
		}
		this._refreshValue();
		this._refreshPosition();
	}
});

$.extend($.ui.vsdselectmenu, {
	getter: "value",
	version: "@VERSION",
	eventPrefix: "selectmenu",
	defaults: {
		transferClasses: true,
		style: '', 
		width: null, 
		menuWidth: null, 
		handleWidth: 0, 
		maxHeight: null,
		icons: null, 
		format: null,
		appendObject: 'body'
	}
});

})(jQuery);
/*
 * toTitleCase
 */
String.prototype.toTitleCase=function(){var tmp=this.split(" ");for(var i in tmp)tmp[i]=(tmp[i]).charAt(0).toUpperCase()+(tmp[i]).slice(1);var tmp=(tmp.join(" ")).split("/");for(var i in tmp)tmp[i]=(tmp[i]).charAt(0).toUpperCase()+(tmp[i]).slice(1);return tmp.join("/")};
/*
Masked Input plugin for jQuery version: 1.3
*/
(function(a){var b=(a.browser.msie?"paste":"input")+".mask",c=window.orientation!=undefined;a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn"},a.fn.extend({caret:function(a,b){if(this.length!=0){if(typeof a=="number"){b=typeof b=="number"?b:a;return this.each(function(){if(this.setSelectionRange)this.setSelectionRange(a,b);else if(this.createTextRange){var c=this.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select()}})}if(this[0].setSelectionRange)a=this[0].selectionStart,b=this[0].selectionEnd;else if(document.selection&&document.selection.createRange){var c=document.selection.createRange();a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length}return{begin:a,end:b}}},unmask:function(){return this.trigger("unmask")},mask:function(d,e){if(!d&&this.length>0){var f=a(this[0]);return f.data(a.mask.dataName)()}e=a.extend({placeholder:"_",completed:null},e);var g=a.mask.definitions,h=[],i=d.length,j=null,k=d.length;a.each(d.split(""),function(a,b){b=="?"?(k--,i=a):g[b]?(h.push(new RegExp(g[b])),j==null&&(j=h.length-1)):h.push(null)});return this.trigger("unmask").each(function(){function v(a){var b=f.val(),c=-1;for(var d=0,g=0;d<k;d++)if(h[d]){l[d]=e.placeholder;while(g++<b.length){var m=b.charAt(g-1);if(h[d].test(m)){l[d]=m,c=d;break}}if(g>b.length)break}else l[d]==b.charAt(g)&&d!=i&&(g++,c=d);if(!a&&c+1<i)f.val(""),t(0,k);else if(a||c+1>=i)u(),a||f.val(f.val().substring(0,c+1));return i?d:j}function u(){return f.val(l.join("")).val()}function t(a,b){for(var c=a;c<b&&c<k;c++)h[c]&&(l[c]=e.placeholder)}function s(a){var b=a.which,c=f.caret();if(a.ctrlKey||a.altKey||a.metaKey||b<32)return!0;if(b){c.end-c.begin!=0&&(t(c.begin,c.end),p(c.begin,c.end-1));var d=n(c.begin-1);if(d<k){var g=String.fromCharCode(b);if(h[d].test(g)){q(d),l[d]=g,u();var i=n(d);f.caret(i),e.completed&&i>=k&&e.completed.call(f)}}return!1}}function r(a){var b=a.which;if(b==8||b==46||c&&b==127){var d=f.caret(),e=d.begin,g=d.end;g-e==0&&(e=b!=46?o(e):g=n(e-1),g=b==46?n(g):g),t(e,g),p(e,g-1);return!1}if(b==27){f.val(m),f.caret(0,v());return!1}}function q(a){for(var b=a,c=e.placeholder;b<k;b++)if(h[b]){var d=n(b),f=l[b];l[b]=c;if(d<k&&h[d].test(f))c=f;else break}}function p(a,b){if(!(a<0)){for(var c=a,d=n(b);c<k;c++)if(h[c]){if(d<k&&h[c].test(l[d]))l[c]=l[d],l[d]=e.placeholder;else break;d=n(d)}u(),f.caret(Math.max(j,a))}}function o(a){while(--a>=0&&!h[a]);return a}function n(a){while(++a<=k&&!h[a]);return a}var f=a(this),l=a.map(d.split(""),function(a,b){if(a!="?")return g[a]?e.placeholder:a}),m=f.val();f.data(a.mask.dataName,function(){return a.map(l,function(a,b){return h[b]&&a!=e.placeholder?a:null}).join("")}),f.attr("readonly")||f.one("unmask",function(){f.unbind(".mask").removeData(a.mask.dataName)}).bind("focus.mask",function(){m=f.val();var b=v();u();var c=function(){b==d.length?f.caret(0,b):f.caret(b)};(a.browser.msie?c:function(){setTimeout(c,0)})()}).bind("blur.mask",function(){v(),f.val()!=m&&f.change()}).bind("keydown.mask",r).bind("keypress.mask",s).bind(b,function(){setTimeout(function(){f.caret(v(!0))},0)}),v()})}})})(jQuery);
/*
 * Strip non numeric characters
 */
(function($){
	 $.fn.numbers = function() {

	    return this.each(function() {
			obj = $(this);
			var str = obj.val();
			str += '';
			var rgx = /^\d|\.|-$/;
			var out = '';
			for( var i = 0; i < str.length; i++ ){
			if( rgx.test( str.charAt(i) ) ){
				  if( !( ( str.charAt(i) == '.' ) ||
						 ( str.charAt(i) == '-' && out.length != 0 ) ) ){
					out += str.charAt(i);
					}
				}
			}
			// if (out.length == 10) { out = "(" + out.substring(0,3) + ") " + out.substring(3,6) + "-" + out.substring(6,10); alert(out); }
			obj.val(out);
			
	    });
	 };
	})(jQuery);
/*
 * Format the value of a dom object to show us phone as (111) 222-3333
 * @constructor
 */
(function($){
	 $.fn.usPhone = function() {

	    return this.each(function() {
			var obj = $(this), out = $.trim(obj.val()), fmt = '';
			
			if(out.substring(0,1) === "1" && out.length > 10){
				out = out.substring(1, out.length);
			}
			
			if( out.length > 2){
				fmt = "(" + out.substring(0, 3) + ") ";
			}
			if( out.length > 5 ){
				fmt += out.substring(3, 6) + "-";
			}
			if( out.length > 9){
				fmt += out.substring(6, 10);
			}
			
			obj.val(fmt);
			
	    });
	 };
	})(jQuery);
/*
 * Format the value of a dom object to show us zip as 12345 or 12345-1234
 * @constructor
 */
(function($){
	 $.fn.usZip = function() {

	    return this.each(function() {
			var obj = $(this), out = obj.val(), fmt = '';
			
			if( out.length > 4){
				fmt = out.substring(0, 5);
			}
			if( out.length > 6 ){
				fmt += "-" + out.substring(5, 9);
			}			
			obj.val(fmt);
			
	    });
	 };
	})(jQuery);
/*
 * Format the value of a dom object to show Canadian zip as A1A 1A1
 * @constructor
 */
(function($){
	 $.fn.caZip = function() {

	    return this.each(function() {
			var obj = $(this), out = obj.val().toUpperCase(), fmt = '';
			
			if( (out.length > 4) && (out.length < 7)){
				fmt = out.substring(0, 3) + out.substring(3, 6);
			}
			if (out.length == 7){
				fmt = out.substring(0, 3) + out.substring(4, 7);
			}
			
			obj.val(fmt);
			
	    });
	 };
	})(jQuery);
/*
 * Exists 
 * @constructor
 */
jQuery.fn.exists = function(){return jQuery(this).length>0;}
/*
 * cartMenu 
 * @constructor
 */
$.fn.cartMenu = function(){
	//vars
	var window_object = $(window);
	var checkout_object = $(this);
	var cross_sell_object = $('#footer');
	window_object.scroll(function (event) {
		// determine the gap between the window and the checkout cart
		var gap = window_object.height() - checkout_object.height();
		// determine the top boundary
		var topBoundry = checkout_object.parent().offset().top;
		// determine the bottom boundary
		var bottomBoundry = cross_sell_object.position().top + gap;	
		// top edge of window
		var positionWindowTop = window_object.scrollTop() + 20;
		// bottom edge of window
		var positionWindowBottom = window_object.scrollTop() + window_object.height();
		// at the top -  don't move with window
		if (positionWindowTop <= topBoundry) {
			checkout_object.css('top',topBoundry + "px").css('position','absolute');
		// at the bottom - don't move with window
		} else if ((bottomBoundry - 20) <= positionWindowBottom) {
			checkout_object.css('top',bottomBoundry - checkout_object.height() - gap + 'px').css('position','absolute');
		// in the middle -  move with window
		} else {
			checkout_object.css('top','20px').css('position','fixed');
		}
	});
};
/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2011 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license) 
	Version: 1.3
*/
(function(c){var a=(c.browser.msie?"paste":"input")+".mask";var b=(window.orientation!=undefined);c.mask={definitions:{"9":"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn"};c.fn.extend({caret:function(f,d){if(this.length==0){return}if(typeof f=="number"){d=(typeof d=="number")?d:f;return this.each(function(){if(this.setSelectionRange){this.setSelectionRange(f,d)}else{if(this.createTextRange){var g=this.createTextRange();g.collapse(true);g.moveEnd("character",d);g.moveStart("character",f);g.select()}}})}else{if(this[0].setSelectionRange){f=this[0].selectionStart;d=this[0].selectionEnd}else{if(document.selection&&document.selection.createRange){var e=document.selection.createRange();f=0-e.duplicate().moveStart("character",-100000);d=f+e.text.length}}return{begin:f,end:d}}},unmask:function(){return this.trigger("unmask")},mask:function(f,j){if(!f&&this.length>0){var g=c(this[0]);return g.data(c.mask.dataName)()}j=c.extend({placeholder:"_",completed:null},j);var e=c.mask.definitions;var i=[];var k=f.length;var h=null;var d=f.length;c.each(f.split(""),function(l,m){if(m=="?"){d--;k=l}else{if(e[m]){i.push(new RegExp(e[m]));if(h==null){h=i.length-1}}else{i.push(null)}}});return this.trigger("unmask").each(function(){var u=c(this);var p=c.map(f.split(""),function(y,x){if(y!="?"){return e[y]?j.placeholder:y}});var w=u.val();function t(x){while(++x<=d&&!i[x]){}return x}function q(x){while(--x>=0&&!i[x]){}return x}function o(A,x){if(A<0){return}for(var z=A,y=t(x);z<d;z++){if(i[z]){if(y<d&&i[z].test(p[y])){p[z]=p[y];p[y]=j.placeholder}else{break}y=t(y)}}s();u.caret(Math.max(h,A))}function l(B){for(var z=B,A=j.placeholder;z<d;z++){if(i[z]){var x=t(z);var y=p[z];p[z]=A;if(x<d&&i[x].test(y)){A=y}else{break}}}}function r(A){var y=A.which;if(y==8||y==46||(b&&y==127)){var B=u.caret(),z=B.begin,x=B.end;if(x-z==0){z=y!=46?q(z):(x=t(z-1));x=y==46?t(x):x}m(z,x);o(z,x-1);return false}else{if(y==27){u.val(w);u.caret(0,n());return false}}}function v(A){var x=A.which,C=u.caret();if(A.ctrlKey||A.altKey||A.metaKey||x<32){return true}else{if(x){if(C.end-C.begin!=0){m(C.begin,C.end);o(C.begin,C.end-1)}var z=t(C.begin-1);if(z<d){var B=String.fromCharCode(x);if(i[z].test(B)){l(z);p[z]=B;s();var y=t(z);u.caret(y);if(j.completed&&y>=d){j.completed.call(u)}}}return false}}}function m(z,x){for(var y=z;y<x&&y<d;y++){if(i[y]){p[y]=j.placeholder}}}function s(){return u.val(p.join("")).val()}function n(y){var C=u.val();var B=-1;for(var x=0,A=0;x<d;x++){if(i[x]){p[x]=j.placeholder;while(A++<C.length){var z=C.charAt(A-1);if(i[x].test(z)){p[x]=z;B=x;break}}if(A>C.length){break}}else{if(p[x]==C.charAt(A)&&x!=k){A++;B=x}}}if(!y&&B+1<k){u.val("");m(0,d)}else{if(y||B+1>=k){s();if(!y){u.val(u.val().substring(0,B+1))}}}return(k?x:h)}u.data(c.mask.dataName,function(){return c.map(p,function(y,x){return i[x]&&y!=j.placeholder?y:null}).join("")});if(!u.attr("readonly")){u.one("unmask",function(){u.unbind(".mask").removeData(c.mask.dataName)}).bind("focus.mask",function(){w=u.val();var y=n();s();var x=function(){if(y==f.length){u.caret(0,y)}else{u.caret(y)}};(c.browser.msie?x:function(){setTimeout(x,0)})()}).bind("blur.mask",function(){n();if(u.val()!=w){u.change()}}).bind("keydown.mask",r).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){u.caret(n(true))},0)})}n()})}})})(jQuery);

/**
 * jQuery.getCSS plugin
 * http://github.com/furf/jquery-getCSS
 *
 * Copyright 2010, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Inspired by Julian Aubourg's Dominoes
 * http://code.google.com/p/javascript-dominoes/
 */
(function(f,b,g){var d=b.getElementsByTagName("head")[0],a=/loaded|complete/,e={},c=0,h;g.getCSS=function(j,i,l){if(g.isFunction(i)){l=i;i={};}var k=b.createElement("link");k.rel="stylesheet";k.type="text/css";k.media=i.media||"screen";k.href=j;if(i.charset){k.charset=i.charset;}if(i.title){l=(function(m){return function(){k.title=i.title;m(k,"success");};})(l);}if(k.readyState){k.onreadystatechange=function(){if(a.test(k.readyState)){k.onreadystatechange=null;l(k,"success");}};}else{if(k.onload===null&&k.all){k.onload=function(){k.onload=null;l(k,"success");};}else{e[k.href]=function(){l(k,"success");};if(!c++){h=f.setInterval(function(){var r,o,q=b.styleSheets,m,n=q.length;while(n--){o=q[n];if((m=o.href)&&(r=e[m])){try{r.r=o.cssRules;throw"SECURITY";}catch(p){if(/SECURITY/.test(p)){r(k,"success");delete e[m];if(!--c){h=f.clearInterval(h);}}}}}},13);}}}d.appendChild(k);};})(this,this.document,this.jQuery);
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}
		
		// if the last part is a year
		if( parseInt( date.replace(/ /g,"").substr(-4) ) > 1900 ){
			dateArr = date.split(" ");
			dateArr.splice(3,0,dateArr[dateArr.length-1]);
			dateArr.pop();
			date = dateArr.toString().replace(/,/g," ");
		}
		
		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

var Shoppingbag  = {
		_this: {},
		_init: function() {
			_this = this;
			if(this.options.bag != null){
				this.showBag();
			}
			if(this.options.showEmptyBag){
				this.showEmptyBag();
			}
			if(this.options.errorMessage != null){
				this.showError();
			}
		},
		showBag: function(){

			// create markup for each bag item
			var bagitemclass;
			var params="";
			$(_this.options.items,_this.element).append('<div id="viewbagRemovedMessage" class="viewbag-removedmessage"></div>');
			$.each(this.options.bag, function(index,bagitem){			
				markup = $(_this.options.bagitem);
				
				// bagitem class
				bagitemclass = (index==0 && _this.options.bag.length > 1) ? 'bagitem-first' : 
									(index==_this.options.bag.length-1) ? 'bagitem-last' : '';
				
				// editable test
				if(bagitem.lineItem.itmNbr != 152432 && bagitem.editableFlag != false){
					bagitemclass += " bagitem-editable";
					$(".thumb", markup).wrap('<a href="#" class="item-wrap viewbag-item-wrap edit-btn"></a>');
				} else {
					$(".thumb", markup).wrap('<div class="item-wrap viewbag-item-wrap"></div>');
				}
				
				// add a class to the bag item
				markup.addClass(bagitemclass);
				
				// specify type of product
				$(".item", markup).attr("class", "").addClass( (bagitem.lineItem.itmNbr == 3000) ? "egc" : (bagitem.lineItem.itmNbr == 6001) ? "gc" : "product" )
				
				// image
				if( bagitem.thumbNailSmall ){
					// regular products
					var imgUrl = VSD.imgUrl + "/product/"+_this.options.imageSize+"/" + bagitem.thumbNailSmall.fileName;
					// gift cards
					if(bagitem.lineItem.itmNbr == 6001){
						imgUrl = "/giftcard/"+_this.options.imageSize+"/"+bagitem.lineItem.clrCde+".jpg";
					}
					$("img", markup).attr("src", imgUrl)
						.attr("alt", bagitem.shortDescription);
				}
				
				// BUILD MARKUP
				var info, specs, edit;
				// product
				if(bagitem.lineItem.itmNbr != 6001 && bagitem.lineItem.itmNbr != 3000)
				{
				
					params = '<div class="bagitem-parameters"><span class="data-model">';
					params+= '<span class="from">viewBag</span>';
					params+= '<span class="coreMetric">'+bagitem.coreMetric+'</span>';
					params+= '<span class="imgURLSecure">'+bagitem.secure+'</span>';
					params+= '<span class="namespace">shoppingBag-editProduct</span>';
					params+= '<span class="catalogCode">'+bagitem.lineItem.ctlgCde+'</span>';
					params+= '<span class="event">link.productEdit</span>';
					params+= '<span class="loadpage">vsdonlineshop/vsdEditProductOverlay</span>';
					params+= '<span class="COLORSELECTORLABEL">'+bagitem.lineItem.clrCde+'</span>';
					params+= '<span class="color">'+bagitem.color+'</span>';
					params+= '<span class="SIZESELECTORLABEL">'+bagitem.lineItem.sizeCde+'</span>';
					params+= '<span class="assetId">'+bagitem.lineItem.assetId+'</span>';
					params+= '<span class="itemNumber">'+bagitem.lineItem.itmNbr+'</span>';
					params+= '<span class="quantity">'+bagitem.oredrQty+'</span>';
					params+= '<span class="shpdQty">'+bagitem.lineItem.shpdQty+'</span>';
					params+= '<span class="bkOrdQty">'+bagitem.lineItem.bkOrdQty+'</span>';
					params+= '<span class="simplePageName">'+bagitem.lineItem.simplePageName+'</span>';
					params+= '<span class="overlay">true</span>';
					params+= '<span class="lineItemId">'+bagitem.lineItem.timeStamp+'</span>';
					params+= '<span class="shortDescription">'+bagitem.shortDescription+'</span>';
					params+= '<span class="lineItemToatal">'+bagitem.lineItemToatal+'</span>';
					params+= '<span class="curitemindex">'+index+'</span>';
					params+= '<span class="itemStock">'+(bagitem.lineItem.expShipDt == null ? 0: 1)+'</span>';
					if(bagitem.length!=null && bagitem.length!=''){
						params+= '<span class="distinctAttr">'+bagitem.length+'</span>';
					}
					params=params+'</span></div>';
					
					// info
					info = '<!-- mp_trans_disable_start -->'
						+'<p class="item-name small edit-btn">';
						if(bagitem.brandName != null && bagitem.brandName != '')
						{
							info += bagitem.brandName + '<br />';
						}
				
					info += bagitem.shortDescription+'</p>'+
						'<p class="item-number">'+bagitem.lineItem.ctlgCde+'-'+bagitem.formatedItemNbr+'<!-- mp_trans_disable_end --></p>'+
						'<div class="item-availability"></div>';

					// specs
					specs = '<p><span class="label">Size</span><!-- mp_trans_disable_start -->'+bagitem.lineItem.sizeCde+'<!-- mp_trans_disable_end --></p>';
					if(bagitem.length != null && bagitem.length != "") {
						specs = '<p><span class="label">Length</span><!-- mp_trans_disable_start -->'+bagitem.length+'<!-- mp_trans_disable_end --></p>' + specs;
					}
					if(bagitem.color != null && bagitem.color.length > 0)
					{
						specs += '<p><span class="label">Color</span><!-- mp_trans_disable_start -->'+bagitem.color+' ('+bagitem.lineItem.clrCde+')</p><!-- mp_trans_disable_end -->';
					}
					specs += '<p><span class="label">Qty</span><!-- mp_trans_disable_start -->'+bagitem.oredrQty+'</p><!-- mp_trans_disable_end -->';
					if(bagitem.lineItem.giftBoxNumber > 0)
					{
						specs += '<p class="giftbox">Wrapped in Gift Box <!-- mp_trans_disable_start -->'+ bagitem.lineItem.giftBoxNumber +'<!-- mp_trans_disable_end --></p>';
					}
				
					// edit
					edit = $(_this.options.edit.markup);
					edit.addClass("edit-btn");
					$(".viewbag-item-wrap", markup).addClass("edit-btn");
				}
				
				// gc
				else if(bagitem.lineItem.itmNbr == 6001)
				{
					//data
					params = '<div class="bagitem-parameters"><span class="data-model">';
					params+= '<span class="coreMetric">'+bagitem.coreMetric+'</span>';
					params+= '<span class="color">'+bagitem.lineItem.clrCde+'</span>';
					params+= '<span class="amountGC">'+bagitem.lineItem.sizeCde+'</span>';
					params+= '<span class="fromAttr">'+bagitem.lineItem.giftCardCYO.gcFrom+'</span>';
					params+= '<span class="form_editGC_SUBMIT">'+bagitem.oredrQty+'</span>';
					params+= '<span class="toAttr">'+bagitem.lineItem.giftCardCYO.gcTo+'</span>';
					params+= '<span class="lineItemIdGC">'+bagitem.lineItem.timeStamp+'</span>';
					params+= '<span class="lineItemId">'+bagitem.lineItem.timeStamp+'</span>';
					params+= '<span class="curitemindex">'+index+'</span>';
					params+= '<span class="shpdQty">'+bagitem.lineItem.shpdQty+'</span>';
					params+= '<span class="bkOrdQty">'+bagitem.lineItem.bkOrdQty+'</span>';
					params+= '</span></div>';
					
					
					// info
					info = '<p class="item-name small edit-btn">Gift Card: <!-- mp_trans_disable_start -->'+bagitem.shortDescription+' ('+bagitem.lineItem.clrCde+')</p><!-- mp_trans_disable_end -->';
					
					// specs
					specs = '<div class="item-specs">'+
					'<p><span>To</span><span class="ui-caps"><!-- mp_trans_disable_start -->'+(bagitem.lineItem.giftCardCYO.gcTo.toLowerCase())+'</span><!-- mp_trans_disable_end --></p>'+
					'<p><span>From</span><span class="ui-caps"><!-- mp_trans_disable_start -->'+(bagitem.lineItem.giftCardCYO.gcFrom.toLowerCase())+'</span><!-- mp_trans_disable_end --></p>'+
					'</div>';
					
					// edit
					edit = $(_this.options.edit.markup);
					edit.addClass("edit-btn");
					$(".viewbag-item-wrap", markup).addClass("edit-btn");
				}
				
				// egc
				else if(bagitem.lineItem.itmNbr == 3000)
				{
					params = '<div class="bagitem-parameters"><span class="data-model">';					
					params+= '<span class="coreMetric">'+bagitem.coreMetric+'</span>';
					params+= '<span class="amountEGC">'+bagitem.lineItem.sizeCde+'</span>';
					params+= '<span class="date">'+VSD.Util.formatDate(bagitem.lineItem.giftCardCYO.egcDeliveryDate,"MM/dd/yyyy")+'</span>';
					params+= '<span class="fromName">'+bagitem.lineItem.giftCardCYO.gcFrom+'</span>';
					params+= '<span class="lineItemIdEGC">'+bagitem.lineItem.timeStamp+'</span>';
					params+= '<span class="lineItemId">'+bagitem.lineItem.timeStamp+'</span>';
					params+= '<span class="personalMessage">'+bagitem.lineItem.giftCardCYO.gcPersonalMessage+'</span>';
					params+= '<span class="recipientEmail">'+bagitem.lineItem.giftCardCYO.gcRecpEmail+'</span>';
					params+= '<span class="sendTo">'+bagitem.lineItem.giftCardCYO.gcTo+'</span>';
					params+= '<span class="yearS">'+VSD.Util.formatDate(bagitem.lineItem.giftCardCYO.egcDeliveryDate, "yyyy")+'</span>';
					params+= '<span class="monthS">'+VSD.Util.formatDate(bagitem.lineItem.giftCardCYO.egcDeliveryDate, "mm")+'</span>';
					params+= '<span class="dayS">'+VSD.Util.formatDate(bagitem.lineItem.giftCardCYO.egcDeliveryDate, "dd")+'</span>';
					params+= '<span class="curitemindex">'+index+'</span>';
					params+= '</span></div>';
					
					// info
					info = '<p class="item-name small edit-btn">Egift Card</p>';
					
					// specs
					specs = '<div class="item-specs egc-specs">'+
					'<p><span>Date to Send</span><!-- mp_trans_disable_start -->'+VSD.Util.formatDate(bagitem.lineItem.giftCardCYO.egcDeliveryDate, "m/dd/yy")+'<!-- mp_trans_disable_end --></p>'+
					'<p><span>Email</span><!-- mp_trans_disable_start -->'+bagitem.lineItem.giftCardCYO.gcRecpEmail+'<!-- mp_trans_disable_end --></p>'+
					'<p><span>To</span><!-- mp_trans_disable_start -->'+bagitem.lineItem.giftCardCYO.gcTo+'<!-- mp_trans_disable_end --></p>'+
					'<p><span>From</span><!-- mp_trans_disable_start -->'+bagitem.lineItem.giftCardCYO.gcFrom+'<!-- mp_trans_disable_end --></p>'+
					'</div>';
					
					// edit
					edit = $(_this.options.edit.markup);
					edit.addClass("edit-btn");
					$(".viewbag-item-wrap", markup).addClass("edit-btn");
				}
				
				// PLACE MARKUP
				
				// info
				$(".item-specs", markup).before(info);
				
				// specs
				$(".item-specs", markup).append(specs);
				
				// edit
				if(bagitem.editableFlag != false && bagitem.lineItem.itmNbr != 152432)
				{
					$(_this.options.edit.target, markup).prepend(edit);
				}
				
				// remove
				if( _this.options.page === 'vsb' )
				{
					$(_this.options.edit.target, markup).append( '<a class="btn-18-b btn-item-remove" tabindex="0">Remove</a>' );
				}
				
				// deal pricing
				if(_this.options.dealMessaging==true)
				{
					var dealpricing = '';
					if(bagitem.lineItem.dealTotal > 0){
						dealpricing += '<div class="grp item-dealpricing">';
							if(bagitem.buyMoreCount > 0){
								var which_special="";
								if(bagitem.lineItem.priceTypInd == 'M' || bagitem.lineItem.priceTypInd == 'P') {which_special="Special ";}
								else if (bagitem.lineItem.priceTypInd == 'S' || bagitem.lineItem.priceTypInd == 'D' || bagitem.lineItem.priceTypInd == 'W') {which_special="Sale ";}
								else if (bagitem.lineItem.priceTypInd == 'C') {which_special="Clearance ";}						
								dealpricing += '<p><span class="dealpricing-offer"><!-- mp_trans_disable_start -->'+which_special+bagitem.lineItem.dealBreak+'/$'+bagitem.lineItem.dealPrice+'</span><!-- mp_trans_disable_end -->';
								dealpricing += '<a href="/ss/Satellite?ProductID='+bagitem.lineItem.assetId+'&pagename=vsdWrapper&simplename='+bagitem.lineItem.simplePageName+'">Buy <span><!-- mp_trans_disable_start -->'+bagitem.buyMoreCount+'<!-- mp_trans_disable_end --></span> more &amp; save!</a></p>';
							}else{
								dealpricing += '<p><a href="/ss/Satellite?ProductID='+bagitem.lineItem.assetId+'&pagename=vsdWrapper&simplename='+bagitem.lineItem.simplePageName+'"><span>Buy More &amp; Continue to Save</span></a></p>';
							}
						dealpricing += '</div>';
					}
					$(".bagitem-data", markup).append(dealpricing);
				}
				
				// swatches
				if(bagitem.swatchSmall != null) {
					var backUrl = "url('" + VSD.imgUrl + "/product/swatch18x18/" + bagitem.swatchSmall.fileName + "') 0px 0px no-repeat";
					$(".viewbag-item-wrap", markup).prepend('<span class="swatch"></span>');
					$(".swatch", markup).css("background", backUrl );
				}
				
				// availability
				if(bagitem.lineItem.expShipDt != null)
				{
					$(".item-availability", markup).addClass("ui-tooltip").attr("title", 'Backordered until '+VSD.Util.formatDate(bagitem.lineItem.expShipDt, "m/d")+'. This Backordered item will ship separately with no extra shipping and handling charges.');
					availability = '<p class="item-status">Expected Ship: <!-- mp_trans_disable_start -->'+VSD.Util.formatDate(bagitem.lineItem.expShipDt, "m/d")+'<!-- mp_trans_disable_end --></p>'+
						'<a tabindex="0" href="#" class="info-icon">more info</a>';
				}
				else
				{
					availability = '<p class="item-status">In Stock</p>';
				}
				$(".item-availability", markup).html(availability);
				
				// prices
				var price = '';
				var itemStatus = ((bagitem.lineItem.priceTypInd == 'M' && bagitem.lineItem.dealBreak<=bagitem.lineItem.dealTotal )|| bagitem.lineItem.priceTypInd == 'P' || (bagitem.lineItem.adjUnitPrice < bagitem.lineItem.origUnitPrice)) ? 'Special' 
						: (bagitem.lineItem.priceTypInd == 'S' || bagitem.lineItem.priceTypInd == 'W') ? 'Sale' 
								: (bagitem.lineItem.priceTypInd == 'C' || bagitem.lineItem.priceTypInd == 'D') ? 'Clearance'
										: '';
				var dealpriceClass = (itemStatus== '') ? '' : 'item-dealprice';
				
				price += '<p class="grp small item-total '+dealpriceClass+'">';
				if(bagitem.lineItem.freeInd == 'Y' || bagitem.lineItemToatal == "0" && _this.options.page == 'opc')
					price += '<span class="free">Free</span>';
				else
					price += '<!-- mp_trans_disable_start --><span>$'+bagitem.lineItemToatal+'</span><!-- mp_trans_disable_end -->';
				price += '</p>';
				
				if(bagitem.oredrQty > 1 && (!(bagitem.lineItem.offerKeyWord != null && bagitem.lineItem.offerKeyWord != ''))){
					
					price += '<p class="grp item-qty '+dealpriceClass+'">';
						if(bagitem.priceTypInd!='R'&& bagitem.buyMoreCount == 0){
							price += itemStatus;
						}
						price += '<!-- mp_trans_disable_start --> $'+bagitem.adjUnitPrice+'<!-- mp_trans_disable_end --> each</p>';
				} else if(bagitem.priceTypInd != 'R' && bagitem.oredrQty == 1 && bagitem.buyMoreCount==0) {
					price += '<p class="grp item-status">'+itemStatus+'</p>';
				}
				if(bagitem.lineItem.offerKeyWord != null && bagitem.lineItem.offerKeyWord != ''){
					price += '<p class="item-offer">'
						+'Offer <!-- mp_trans_disable_start -->'+bagitem.lineItem.offerKeyWord
					+'<!-- mp_trans_disable_end --></p>';
				}
				if(bagitem.lineItemDiscount > 0){
					price += '<p class="item-discount">'
						+ 'You Saved <!-- mp_trans_disable_start -->$'+bagitem.lineItemDiscount
					+'<!-- mp_trans_disable_end --></p>'
				}				
				if(bagitem.origUnitPrice > bagitem.adjUnitPrice && bagitem.lineItem.dealTotal > 0 && (bagitem.lineItem.itmNbr!=6001 && bagitem.lineItem.itmNbr!=3000)) {
					var itemPriceLanguage = bagitem.lineItem.priceTypInd == 'W' ? 'Was' : 'Orig';
					price += '<p class="grp item-price-orig">'+itemPriceLanguage+'<!-- mp_trans_disable_start --> $'+bagitem.origUnitPrice+'<!-- mp_trans_disable_end --></p>';
				}
				else if(bagitem.origUnitPrice > bagitem.adjUnitPrice && !(bagitem.lineItem.dealTotal > 0) && (bagitem.lineItem.itmNbr!=6001 && bagitem.lineItem.itmNbr!=3000)) {
					var itemPriceLanguage = bagitem.lineItem.priceTypInd == 'W' ? 'Was' : 'Orig';
					price += '<p class="grp item-price-orig">'+itemPriceLanguage+'<!-- mp_trans_disable_start --> $'+bagitem.origUnitPrice+'<!-- mp_trans_disable_end --></p>';
				}
				else if(bagitem.origUnitPrice != bagitem.adjUnitPrice && (bagitem.lineItem.itmNbr!=6001 && bagitem.lineItem.itmNbr!=3000)){	
					var itemPriceLanguage = bagitem.lineItem.priceTypInd == 'W' ? 'Was' : 'Orig';
					price += '<p class="grp item-price-orig">'+itemPriceLanguage+'<!-- mp_trans_disable_start --> $'+bagitem.origUnitPrice+'<!-- mp_trans_disable_end --></p>';			
				}				
				$(".bagitem-price", markup).html(price);
				$(_this.options.items,_this.element).append(markup);
				$(".bagitem-price", markup).after(params);			
				
			});
			 
			 // this.options.bag = null; // garbage collection
		},
		showEmptyBag: function(){
			$(this.options.empty,this.element).css('display','block');
			$(this.options.items,this.element).remove();
			$(this.options.footer,this.element).remove();
		},
		showError: function(){
			var err = $('<div class="ui-alert"><p>'+this.options.errorMessage+'</p></div>'); 
			if(this.options.errorItems != null){
				var ul = $("<ul></ul>");
				$.each(this.options.errorItems, function(i,bagitem){
					ul.append("<li><!-- mp_trans_disable_start -->"+bagitem.lineItem.ctlgCde+"-"+bagitem.lineItem.itmNbr+" "+bagitem.shortDescription +
							"<!-- mp_trans_disable_end --> | Color: <!-- mp_trans_disable_start -->"+bagitem.color+" ("+bagitem.lineItem.clrCde+")<!-- mp_trans_disable_end --> | Size: <!-- mp_trans_disable_start -->"+bagitem.lineItem.sizeCde+"<!-- mp_trans_disable_end --></li>");
				});
				err.append(ul);
			}
			$(this.options.errorContainer).prepend(err);
		},
		hideErrors: function(){
			$(".ui-alert",this.options.errorContainer).remove();
		},
		reset: function(){
			$(this.options.items,this.element).html("");
			this.hideErrors();
		},
		options: {
			bag:null,
			items:".viewbag-items",
			imageSize: "85x113",
			footer:".viewbag-footer",
			empty:".emptybag",
			errorContainer:".viewbag-content",
			errorMessage:null,
			errorItems:null,
			showEmptyBag:false,
			bagitem:'<div></div>',
			dealMessaging: true,
			page:''
		}
};
$.widget("ui.shoppingbag", Shoppingbag);


var ShoppingbagItem  = {
		_this: {},
		_init: function(){
			_this = this;
		},
		edit: function(){
			if(typeof this.options.beforeEdit == 'function'){
				this.options.beforeEdit();
			}
			if(this.options.editLocation == "overlay") {
				this.editOverlay();
			} else if(typeof this.options.editLocation == "string") {
				this.editPage();
			}
		},
		editOverlay: function(){
			
			VSD.Overlay.open({
				title: true,
				titleText: "Edit",
				ajax: {
					url: "/ss/Satellite?pagename="+_this.element.data("product").loadpage,
					data: _this.element.data("product"),
					dataType: "html",
					success: function(data) {
						if (location.protocol == "https:"){
							data = data.replace(/http:\/\/media.victoriassecret.com/g, VSD.imgUrl);
						}
						$(VSD.Overlay.content).html(data);
						VSD.Shoppingbag.productEditCallback();
					}
				},
				footer: true,
				overlayAddClass: "overlay-product",
				footerAddButton: {
					"Update Item": {
						addClass: "btn-40 btn-40-p small ui-loader",
						callback: _this.options.updateCallback
					}
				}
			});
		},
		editPage: function(){
			$(this.element).prepend('<form method="post" />');
			form = $("form", this.element);
			$.each(this.element.data("product"), function(name, value){
				form.append('<input type="hidden" name="'+name+'" value="'+((value) ? value : '')+'" />');
			});
			form.attr('action', this.options.editLocation);
			form.trigger('submit');
		},
		remove: function(){
			VSD.Loader.show(this.element,"item", {top:-21,height:1});
			$.ajax({
				type:"POST",
				url: VSD.commerce + '/update/remove',
				data: _this.element.data("product"),
				dataType:"json",
				cache: false,
				error:function(XMLHttpRequest, textStatus, errorThrown) {
					window.location.reload();
				},
				success: function(data) {
					VSD.Loader.hide(_this.element);
					_this.element.fadeOut(function(e){
						_this.options.removeCallback(data);
					});
				}
			});
		},
		updateItem: function(){
			var hiddenid;
			
			$("select","#overlay").each(function(i,el){
				hiddenid = $(el).attr("name");
				if(hiddenid.indexOf("quantity")==-1){
					hiddenid = hiddenid.toUpperCase();
					hiddenid = hiddenid.replace(/\./g,"__");
					$("#"+hiddenid.replace("_0","")).val($(el).val());
				}
				$("#"+hiddenid).val($(el).val());
			});
			
			var temp="";
			var objName;
			var sel;
			var parent = document.getElementById("formElements");
			for(var i=0;i<objectarray[0].Distinctattr.length;i++)
			{
				try{
					objName=objectarray[0].Distinctattr[i]+"_0";
					sel=document.form0.elements[objName];
					if(objectarray[0].Distinctattr[i]!="quantity")
						{
							temp=objectarray[0].Distinctattr[i].toUpperCase();
						}else{
						
						temp=objectarray[0].Distinctattr[i];
						}
						if(sel.options[sel.selectedIndex].value!="null"){
							document.SelectionForm.elements[temp].value=sel.options[sel.selectedIndex].value;
							if(objectarray[0].SelectorLabel[i]=="distinctattrselectorlabel" && objectarray[0].extskuflag[0]==false)
							{	
								document.SelectionForm.elements["itemNumber"].value=sel.options[sel.selectedIndex].value;
								document.SelectionForm.elements[temp].value=sel.options[sel.selectedIndex].text;
							}
							parent.removeChild(document.SelectionForm.elements[objName.toUpperCase()]);
						}
				}catch(e)
				{//alert(e.description);
				}
			}
			var pdata = this.element.data("product");
			$('[name="DISTINCTATTRS"]',"#overlay").val($("#DISTINCTATTRS_0","#overlay").val());
			$('[name="lineItemId"]').val(pdata.lineItemId);
			$('[name="productType"]').val("online");
			$(parent).append('<input type="hidden" name="CURITEMINDEX" value="'+pdata.curitemindex+'"');
			parent.removeChild(document.SelectionForm.elements["DISTINCTATTRS_0"]);
			
		},
		options: {
			editLocation: "overlay",
			beforeEdit: null,
			updateCallback: null,
			params: ".bagitem-parameters",
			removeCallback: null
		}
};
$.widget("ui.bagitem", ShoppingbagItem);