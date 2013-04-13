/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


((function(){
var _1=function(){
function _2(a,b,c){
return function(){
a&&a[_6]==4&&(_7.test(a.status)?b(a):c(a));
};
};
function _8(a,b){
var c=b.headers||{},d;
c.Accept=c.Accept||_d.accept[b.type]||_d.accept["*"],!b.crossOrigin&&!c[_e]&&(c[_e]=_d.requestedWith),c[_f]||(c[_f]=b.contentType||_d.contentType);
for(d in c){
c.hasOwnProperty(d)&&a.setRequestHeader(d,c[d]);
}
};
function _10(a){
_12=a;
};
function _13(a,b){
return a+(/\?/.test(a)?"&":"?")+b;
};
function _16(a,b,c,d){
var e=_1c++,f=a.jsonpCallback||"callback",g=a.jsonpCallbackName||"reqwest_"+e,h=new RegExp("((^|\\?|&)"+f+")=([^&]+)"),i=d.match(h),j=doc.createElement("script"),k=0;
i?i[3]==="?"?d=d.replace(h,"$1="+g):g=i[3]:d=_13(d,f+"="+g),win[g]=_10,j.type="text/javascript",j.src=d,j.async=!0,typeof j.onreadystatechange!="undefined"&&(j.event="onclick",j.htmlFor=j.id="_reqwest_"+e),j.onload=j.onreadystatechange=function(){
if(j[_6]&&j[_6]!=="complete"&&j[_6]!=="loaded"||k){
return !1;
}
j.onload=j.onreadystatechange=null,j.onclick&&j.onclick(),a.success&&a.success(_12),_12=undefined,_25.removeChild(j),k=1;
},_25.appendChild(j);
};
function _26(a,b,c){
var d=(a.method||"GET").toUpperCase(),e=typeof a=="string"?a:a.url,f=a.processData!==!1&&a.data&&typeof a.data!="string"?_1.toQueryString(a.data):a.data||null,g;
return (a.type=="jsonp"||d=="GET")&&f&&(e=_13(e,f),f=null),a.type=="jsonp"?_16(a,b,c,e):(g=xhr(),g.open(d,e,!0),_8(g,a),g.onreadystatechange=_2(g,b,c),a.before&&a.before(g),g.send(f),g);
};
function _2f(a,b){
this.o=a,this.fn=b,_32.apply(this,arguments);
};
function _33(a){
var b=a.match(/\.(json|jsonp|html|xml)(\?|$)/);
return b?b[1]:"js";
};
function _32(o,fn){
function _38(a){
o.timeout&&clearTimeout(_3a.timeout),_3a.timeout=null,o.complete&&o.complete(a);
};
function _3b(_3c){
var r=_3c.responseText;
if(r){
switch(_3e){
case "json":
try{
_3c=win.JSON?win.JSON.parse(r):eval("("+r+")");
}
catch(err){
return _3f(_3c,"Could not parse JSON in response",err);
}
break;
case "js":
_3c=eval(r);
break;
case "html":
_3c=r;
}
}
fn(_3c),o.success&&o.success(_3c),_38(_3c);
};
function _3f(a,b,c){
o.error&&o.error(a,b,c),_38(a);
};
this.url=typeof o=="string"?o:o.url,this.timeout=null;
var _3e=o.type||_33(this.url),_3a=this;
fn=fn||function(){
},o.timeout&&(this.timeout=setTimeout(function(){
_3a.abort();
},o.timeout)),this.request=_26(o,_3b,_3f);
};
function _1(a,b){
return new _2f(a,b);
};
function _45(a){
return a?a.replace(/\r?\n/g,"\r\n"):"";
};
function _47(a,b){
var c=a.name,d=a.tagName.toLowerCase(),e=function(a){
a&&!a.disabled&&b(c,_45(a.attributes.value&&a.attributes.value.specified?a.value:a.text));
};
if(a.disabled||!c){
return;
}
switch(d){
case "input":
if(!/reset|button|image|file/i.test(a.type)){
var f=/checkbox/i.test(a.type),g=/radio/i.test(a.type),h=a.value;
(!f&&!g||a.checked)&&b(c,_45(f&&h===""?"on":h));
}
break;
case "textarea":
b(c,_45(a.value));
break;
case "select":
if(a.type.toLowerCase()==="select-one"){
e(a.selectedIndex>=0?a.options[a.selectedIndex]:null);
}else{
for(var i=0;a.length&&i<a.length;i++){
a.options[i].selected&&e(a.options[i]);
}
}
}
};
function _52(){
var a=this,b,c,d,e=function(b,c){
for(var e=0;e<c.length;e++){
var f=b[_5c](c[e]);
for(d=0;d<f.length;d++){
_47(f[d],a);
}
}
};
for(c=0;c<arguments.length;c++){
b=arguments[c],/input|select|textarea/i.test(b.tagName)&&_47(b,a),e(b,["input","select","textarea"]);
}
};
function _5d(){
return _1.toQueryString(_1.serializeArray.apply(null,arguments));
};
function _5e(){
var a={};
return _52.apply(function(b,c){
b in a?(a[b]&&!_62(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c;
},arguments),a;
};
var _63=this,win=window,doc=document,old=_63.reqwest,_7=/^20\d$/,_5c="getElementsByTagName",_6="readyState",_f="Content-Type",_e="X-Requested-With",_25=doc[_5c]("head")[0],_1c=0,_12,_65="XMLHttpRequest",_62=typeof Array.isArray=="function"?Array.isArray:function(a){
return a instanceof Array;
},_d={contentType:"application/x-www-form-urlencoded",accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"},requestedWith:_65},xhr=win[_65]?function(){
return new XMLHttpRequest;
}:function(){
return new ActiveXObject("Microsoft.XMLHTTP");
};
return _2f.prototype={abort:function(){
this.request.abort();
},retry:function(){
_32.call(this,this.o,this.fn);
}},_1.serializeArray=function(){
var a=[];
return _52.apply(function(b,c){
a.push({name:b,value:c});
},arguments),a;
},_1.serialize=function(){
if(arguments.length===0){
return "";
}
var a,b,c=Array.prototype.slice.call(arguments,0);
return a=c.pop(),a&&a.nodeType&&c.push(a)&&(a=null),a&&(a=a.type),a=="map"?b=_5e:a=="array"?b=_1.serializeArray:b=_5d,b.apply(null,c);
},_1.toQueryString=function(a){
var b="",c,d=encodeURIComponent,e=function(a,c){
b+=d(a)+"="+d(c)+"&";
};
if(_62(a)){
for(c=0;a&&c<a.length;c++){
e(a[c].name,a[c].value);
}
}else{
for(var f in a){
if(!Object.hasOwnProperty.call(a,f)){
continue;
}
var g=a[f];
if(_62(g)){
for(c=0;c<g.length;c++){
e(f,g[c]);
}
}else{
e(f,a[f]);
}
}
}
return b.replace(/&$/,"").replace(/%20/g,"+");
},_1.compat=function(a,b){
return a&&(a.type&&(a.method=a.type)&&delete a.type,a.dataType&&(a.type=a.dataType),a.jsonpCallback&&(a.jsonpCallbackName=a.jsonpCallback)&&delete a.jsonpCallback,a.jsonp&&(a.jsonpCallback=a.jsonp)),new _2f(a,b);
},_1;
}();
((function(){
function a(b,c,d){
if(b===c){
return 0!==b||1/b==1/c;
}
if(null==b||null==c){
return b===c;
}
b._chain&&(b=b._wrapped),c._chain&&(c=c._wrapped);
if(b.isEqual&&v.isFunction(b.isEqual)){
return b.isEqual(c);
}
if(c.isEqual&&v.isFunction(c.isEqual)){
return c.isEqual(b);
}
var e=i.call(b);
if(e!=i.call(c)){
return !1;
}
switch(e){
case "[object String]":
return b==""+c;
case "[object Number]":
return b!=+b?c!=+c:0==b?1/b==1/c:b==+c;
case "[object Date]":
case "[object Boolean]":
return +b==+c;
case "[object RegExp]":
return b.source==c.source&&b.global==c.global&&b.multiline==c.multiline&&b.ignoreCase==c.ignoreCase;
}
if("object"!=typeof b||"object"!=typeof c){
return !1;
}
for(var f=d.length;f--;){
if(d[f]==b){
return !0;
}
}
d.push(b);
var f=0,g=!0;
if("[object Array]"==e){
if(f=b.length,g=f==c.length){
for(;f--&&(g=f in b==f in c&&a(b[f],c[f],d));){
}
}
}else{
if("constructor" in b!="constructor" in c||b.constructor!=c.constructor){
return !1;
}
for(var h in b){
if(v.has(b,h)&&(f++,!(g=v.has(c,h)&&a(b[h],c[h],d)))){
break;
}
}
if(g){
for(h in c){
if(v.has(c,h)&&!(f--)){
break;
}
}
g=!f;
}
}
return d.pop(),g;
};
var b=this,c=b._,d={},e=Array.prototype,f=Object.prototype,g=e.slice,h=e.unshift,i=f.toString,j=f.hasOwnProperty,k=e.forEach,l=e.map,m=e.reduce,n=e.reduceRight,o=e.filter,p=e.every,q=e.some,r=e.indexOf,s=e.lastIndexOf,f=Array.isArray,t=Object.keys,u=Function.prototype.bind,v=function(a){
return new G(a);
};
"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=v),exports._=v):b._=v,v.VERSION="1.3.3";
var w=v.each=v.forEach=function(a,b,c){
if(a!=null){
if(k&&a.forEach===k){
a.forEach(b,c);
}else{
if(a.length===+a.length){
for(var e=0,f=a.length;e<f;e++){
if(e in a&&b.call(c,a[e],e,a)===d){
break;
}
}
}else{
for(e in a){
if(v.has(a,e)&&b.call(c,a[e],e,a)===d){
break;
}
}
}
}
}
};
v.map=v.collect=function(a,b,c){
var d=[];
return a==null?d:l&&a.map===l?a.map(b,c):(w(a,function(a,e,f){
d[d.length]=b.call(c,a,e,f);
}),a.length===+a.length&&(d.length=a.length),d);
},v.reduce=v.foldl=v.inject=function(a,b,c,d){
var e=arguments.length>2;
a==null&&(a=[]);
if(m&&a.reduce===m){
return d&&(b=v.bind(b,d)),e?a.reduce(b,c):a.reduce(b);
}
w(a,function(a,f,g){
e?c=b.call(d,c,a,f,g):(c=a,e=!0);
});
if(!e){
throw new TypeError("Reduce of empty array with no initial value");
}
return c;
},v.reduceRight=v.foldr=function(a,b,c,d){
var e=arguments.length>2;
a==null&&(a=[]);
if(n&&a.reduceRight===n){
return d&&(b=v.bind(b,d)),e?a.reduceRight(b,c):a.reduceRight(b);
}
var f=v.toArray(a).reverse();
return d&&!e&&(b=v.bind(b,d)),e?v.reduce(f,b,c,d):v.reduce(f,b);
},v.find=v.detect=function(a,b,c){
var d;
return x(a,function(a,e,f){
if(b.call(c,a,e,f)){
return d=a,!0;
}
}),d;
},v.filter=v.select=function(a,b,c){
var d=[];
return a==null?d:o&&a.filter===o?a.filter(b,c):(w(a,function(a,e,f){
b.call(c,a,e,f)&&(d[d.length]=a);
}),d);
},v.reject=function(a,b,c){
var d=[];
return a==null?d:(w(a,function(a,e,f){
b.call(c,a,e,f)||(d[d.length]=a);
}),d);
},v.every=v.all=function(a,b,c){
var e=!0;
return a==null?e:p&&a.every===p?a.every(b,c):(w(a,function(a,f,g){
if(!(e=e&&b.call(c,a,f,g))){
return d;
}
}),!!e);
};
var x=v.some=v.any=function(a,b,c){
b||(b=v.identity);
var e=!1;
return a==null?e:q&&a.some===q?a.some(b,c):(w(a,function(a,f,g){
if(e||(e=b.call(c,a,f,g))){
return d;
}
}),!!e);
};
v.include=v.contains=function(a,b){
var c=!1;
return a==null?c:r&&a.indexOf===r?a.indexOf(b)!=-1:c=x(a,function(a){
return a===b;
});
},v.invoke=function(a,b){
var c=g.call(arguments,2);
return v.map(a,function(a){
return (v.isFunction(b)?b||a:a[b]).apply(a,c);
});
},v.pluck=function(a,b){
return v.map(a,function(a){
return a[b];
});
},v.max=function(a,b,c){
if(!b&&v.isArray(a)&&a[0]===+a[0]){
return Math.max.apply(Math,a);
}
if(!b&&v.isEmpty(a)){
return -Infinity;
}
var d={computed:-Infinity};
return w(a,function(a,e,f){
e=b?b.call(c,a,e,f):a,e>=d.computed&&(d={value:a,computed:e});
}),d.value;
},v.min=function(a,b,c){
if(!b&&v.isArray(a)&&a[0]===+a[0]){
return Math.min.apply(Math,a);
}
if(!b&&v.isEmpty(a)){
return Infinity;
}
var d={computed:Infinity};
return w(a,function(a,e,f){
e=b?b.call(c,a,e,f):a,e<d.computed&&(d={value:a,computed:e});
}),d.value;
},v.shuffle=function(a){
var b=[],c;
return w(a,function(a,d){
c=Math.floor(Math.random()*(d+1)),b[d]=b[c],b[c]=a;
}),b;
},v.sortBy=function(a,b,c){
var d=v.isFunction(b)?b:function(a){
return a[b];
};
return v.pluck(v.map(a,function(a,b,e){
return {value:a,criteria:d.call(c,a,b,e)};
}).sort(function(a,b){
var c=a.criteria,d=b.criteria;
return c===void 0?1:d===void 0?-1:c<d?-1:c>d?1:0;
}),"value");
},v.groupBy=function(a,b){
var c={},d=v.isFunction(b)?b:function(a){
return a[b];
};
return w(a,function(a,b){
var e=d(a,b);
(c[e]||(c[e]=[])).push(a);
}),c;
},v.sortedIndex=function(a,b,c){
c||(c=v.identity);
for(var d=0,e=a.length;d<e;){
var f=d+e>>1;
c(a[f])<c(b)?d=f+1:e=f;
}
return d;
},v.toArray=function(a){
return a?v.isArray(a)||v.isArguments(a)?g.call(a):a.toArray&&v.isFunction(a.toArray)?a.toArray():v.values(a):[];
},v.size=function(a){
return v.isArray(a)?a.length:v.keys(a).length;
},v.first=v.head=v.take=function(a,b,c){
return b!=null&&!c?g.call(a,0,b):a[0];
},v.initial=function(a,b,c){
return g.call(a,0,a.length-(b==null||c?1:b));
},v.last=function(a,b,c){
return b!=null&&!c?g.call(a,Math.max(a.length-b,0)):a[a.length-1];
},v.rest=v.tail=function(a,b,c){
return g.call(a,b==null||c?1:b);
},v.compact=function(a){
return v.filter(a,function(a){
return !!a;
});
},v.flatten=function(a,b){
return v.reduce(a,function(a,c){
return v.isArray(c)?a.concat(b?c:v.flatten(c)):(a[a.length]=c,a);
},[]);
},v.without=function(a){
return v.difference(a,g.call(arguments,1));
},v.uniq=v.unique=function(a,b,c){
var c=c?v.map(a,c):a,d=[];
return a.length<3&&(b=!0),v.reduce(c,function(c,e,f){
if(b?v.last(c)!==e||!c.length:!v.include(c,e)){
c.push(e),d.push(a[f]);
}
return c;
},[]),d;
},v.union=function(){
return v.uniq(v.flatten(arguments,!0));
},v.intersection=v.intersect=function(a){
var b=g.call(arguments,1);
return v.filter(v.uniq(a),function(a){
return v.every(b,function(b){
return v.indexOf(b,a)>=0;
});
});
},v.difference=function(a){
var b=v.flatten(g.call(arguments,1),!0);
return v.filter(a,function(a){
return !v.include(b,a);
});
},v.zip=function(){
for(var a=g.call(arguments),b=v.max(v.pluck(a,"length")),c=Array(b),d=0;d<b;d++){
c[d]=v.pluck(a,""+d);
}
return c;
},v.indexOf=function(a,b,c){
if(a==null){
return -1;
}
var d;
if(c){
return c=v.sortedIndex(a,b),a[c]===b?c:-1;
}
if(r&&a.indexOf===r){
return a.indexOf(b);
}
c=0;
for(d=a.length;c<d;c++){
if(c in a&&a[c]===b){
return c;
}
}
return -1;
},v.lastIndexOf=function(a,b){
if(a==null){
return -1;
}
if(s&&a.lastIndexOf===s){
return a.lastIndexOf(b);
}
for(var c=a.length;c--;){
if(c in a&&a[c]===b){
return c;
}
}
return -1;
},v.range=function(a,b,c){
arguments.length<=1&&(b=a||0,a=0);
for(var c=arguments[2]||1,d=Math.max(Math.ceil((b-a)/c),0),e=0,f=Array(d);e<d;){
f[e++]=a,a+=c;
}
return f;
};
var y=function(){
};
v.bind=function(a,b){
var c,d;
if(a.bind===u&&u){
return u.apply(a,g.call(arguments,1));
}
if(!v.isFunction(a)){
throw new TypeError;
}
return d=g.call(arguments,2),c=function(){
if(this instanceof c){
y.prototype=a.prototype;
var e=new y,f=a.apply(e,d.concat(g.call(arguments)));
return Object(f)===f?f:e;
}
return a.apply(b,d.concat(g.call(arguments)));
};
},v.bindAll=function(a){
var b=g.call(arguments,1);
return b.length==0&&(b=v.functions(a)),w(b,function(b){
a[b]=v.bind(a[b],a);
}),a;
},v.memoize=function(a,b){
var c={};
return b||(b=v.identity),function(){
var d=b.apply(this,arguments);
return v.has(c,d)?c[d]:c[d]=a.apply(this,arguments);
};
},v.delay=function(a,b){
var c=g.call(arguments,2);
return setTimeout(function(){
return a.apply(null,c);
},b);
},v.defer=function(a){
return v.delay.apply(v,[a,1].concat(g.call(arguments,1)));
},v.throttle=function(a,b){
var c,d,e,f,g,h,i=v.debounce(function(){
g=f=!1;
},b);
return function(){
return c=this,d=arguments,e||(e=setTimeout(function(){
e=null,g&&a.apply(c,d),i();
},b)),f?g=!0:h=a.apply(c,d),i(),f=!0,h;
};
},v.debounce=function(a,b,c){
var d;
return function(){
var e=this,f=arguments;
c&&!d&&a.apply(e,f),clearTimeout(d),d=setTimeout(function(){
d=null,c||a.apply(e,f);
},b);
};
},v.once=function(a){
var b=!1,c;
return function(){
return b?c:(b=!0,c=a.apply(this,arguments));
};
},v.wrap=function(a,b){
return function(){
var c=[a].concat(g.call(arguments,0));
return b.apply(this,c);
};
},v.compose=function(){
var a=arguments;
return function(){
for(var b=arguments,c=a.length-1;c>=0;c--){
b=[a[c].apply(this,b)];
}
return b[0];
};
},v.after=function(a,b){
return a<=0?b():function(){
if(--a<1){
return b.apply(this,arguments);
}
};
},v.keys=t||function(a){
if(a!==Object(a)){
throw new TypeError("Invalid object");
}
var b=[],c;
for(c in a){
v.has(a,c)&&(b[b.length]=c);
}
return b;
},v.values=function(a){
return v.map(a,v.identity);
},v.functions=v.methods=function(a){
var b=[],c;
for(c in a){
v.isFunction(a[c])&&b.push(c);
}
return b.sort();
},v.extend=function(a){
return w(g.call(arguments,1),function(b){
for(var c in b){
a[c]=b[c];
}
}),a;
},v.pick=function(a){
var b={};
return w(v.flatten(g.call(arguments,1)),function(c){
c in a&&(b[c]=a[c]);
}),b;
},v.defaults=function(a){
return w(g.call(arguments,1),function(b){
for(var c in b){
a[c]==null&&(a[c]=b[c]);
}
}),a;
},v.clone=function(a){
return v.isObject(a)?v.isArray(a)?a.slice():v.extend({},a):a;
},v.tap=function(a,b){
return b(a),a;
},v.isEqual=function(b,c){
return a(b,c,[]);
},v.isEmpty=function(a){
if(a==null){
return !0;
}
if(v.isArray(a)||v.isString(a)){
return a.length===0;
}
for(var b in a){
if(v.has(a,b)){
return !1;
}
}
return !0;
},v.isElement=function(a){
return !!a&&a.nodeType==1;
},v.isArray=f||function(a){
return i.call(a)=="[object Array]";
},v.isObject=function(a){
return a===Object(a);
},v.isArguments=function(a){
return i.call(a)=="[object Arguments]";
},v.isArguments(arguments)||(v.isArguments=function(a){
return !!a&&!!v.has(a,"callee");
}),v.isFunction=function(a){
return i.call(a)=="[object Function]";
},v.isString=function(a){
return i.call(a)=="[object String]";
},v.isNumber=function(a){
return i.call(a)=="[object Number]";
},v.isFinite=function(a){
return v.isNumber(a)&&isFinite(a);
},v.isNaN=function(a){
return a!==a;
},v.isBoolean=function(a){
return a===!0||a===!1||i.call(a)=="[object Boolean]";
},v.isDate=function(a){
return i.call(a)=="[object Date]";
},v.isRegExp=function(a){
return i.call(a)=="[object RegExp]";
},v.isNull=function(a){
return a===null;
},v.isUndefined=function(a){
return a===void 0;
},v.has=function(a,b){
return j.call(a,b);
},v.noConflict=function(){
return b._=c,this;
},v.identity=function(a){
return a;
},v.times=function(a,b,c){
for(var d=0;d<a;d++){
b.call(c,d);
}
},v.escape=function(a){
return (""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;");
},v.result=function(a,b){
if(a==null){
return null;
}
var c=a[b];
return v.isFunction(c)?c.call(a):c;
},v.mixin=function(a){
w(v.functions(a),function(b){
I(b,v[b]=a[b]);
});
};
var z=0;
v.uniqueId=function(a){
var b=z++;
return a?a+b:b;
},v.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};
var A=/.^/,B={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:" ",u2029:" "},C;
for(C in B){
B[B[C]]=C;
}
var D=/\\|'|\r|\n|\t|\u2028|\u2029/g,E=/\\(\\|'|r|n|t|u2028|u2029)/g,F=function(a){
return a.replace(E,function(a,b){
return B[b];
});
};
v.template=function(a,b,c){
c=v.defaults(c||{},v.templateSettings),a="__p+='"+a.replace(D,function(a){
return "\\"+B[a];
}).replace(c.escape||A,function(a,b){
return "'+\n_.escape("+F(b)+")+\n'";
}).replace(c.interpolate||A,function(a,b){
return "'+\n("+F(b)+")+\n'";
}).replace(c.evaluate||A,function(a,b){
return "';\n"+F(b)+"\n;__p+='";
})+"';\n",c.variable||(a="with(obj||{}){\n"+a+"}\n");
var a="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+a+"return __p;\n",d=new Function(c.variable||"obj","_",a);
return b?d(b,v):(b=function(a){
return d.call(this,a,v);
},b.source="function("+(c.variable||"obj")+"){\n"+a+"}",b);
},v.chain=function(a){
return v(a).chain();
};
var G=function(a){
this._wrapped=a;
};
v.prototype=G.prototype;
var H=function(a,b){
return b?v(a).chain():a;
},I=function(a,b){
G.prototype[a]=function(){
var a=g.call(arguments);
return h.call(a,this._wrapped),H(b.apply(v,a),this._chain);
};
};
v.mixin(v),w("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){
var b=e[a];
G.prototype[a]=function(){
var c=this._wrapped;
b.apply(c,arguments);
var d=c.length;
return (a=="shift"||a=="splice")&&d===0&&delete c[0],H(c,this._chain);
};
}),w(["concat","join","slice"],function(a){
var b=e[a];
G.prototype[a]=function(){
return H(b.apply(this._wrapped,arguments),this._chain);
};
}),G.prototype.chain=function(){
return this._chain=!0,this;
},G.prototype.value=function(){
return this._wrapped;
};
})).call(this);
var _1ae,_,_1b0=[].slice;
_=this._.noConflict(),_1ae=function(){
function a(a,b){
this.key=a,b==null&&(b={}),this.staging=!1,this.versions={ip:2,email:3,domain:1},this.reqwest=b.reqwest||_1;
};
return a.prototype.setVersion=function(a,b){
return this.versions[a]=b;
},a.prototype.getVersion=function(a){
return this.versions[a];
},a.prototype.setStaging=function(a){
return this.staging=a;
},a.prototype.ip=function(){
var a,b;
return a=1<=arguments.length?_1b0.call(arguments,0):[],a=this._extract_args(a),b=a.opts,a[0]!=null&&(b.query=a[0]),this._invoke_api("ip",a.opts,"organization",a.callback);
},a.prototype.email=function(){
var a,b;
return a=1<=arguments.length?_1b0.call(arguments,0):[],a=this._extract_args(a),b=a.opts,b.query=a[0],this._invoke_api("email",b,"person",a.callback);
},a.prototype.domain=function(){
var a,b;
return a=1<=arguments.length?_1b0.call(arguments,0):[],a=this._extract_args(a),b=a.opts,b.query=a[0],this._invoke_api("domain",b,"domain",a.callback);
},a.prototype._invoke_api=function(a,b,c,d){
var e;
return e=this.getVersion(a),_.extend(b,{key:this.key,page:document.location.href,referrer:document.referrer,page_title:document.title,ns:c}),this.reqwest({url:this._api_url(a,e),type:"jsonp",data:b,success:function(a){
if(d!=null){
return d(a[c]);
}
}});
},a.prototype._extract_args=function(a){
var b;
return b={},_.isFunction(a[a.length-1])&&(b.callback=a.pop()),typeof a[a.length-1]=="object"?b.opts=a.pop():b.opts={},_.extend(b,a);
},a.prototype._api_url=function(a,b,c){
var d;
return c==null&&(c=!0),d=c?"callback=?":"",""+this._protocol()+"://"+this._api_host()+"/api/v"+b+"/"+a+".json?"+d;
},a.prototype._protocol=function(){
return "https:"===document.location.protocol?"https":"http";
},a.prototype._api_host=function(){
return this.staging?"ec2-184-73-197-21.compute-1.amazonaws.com":"api.demandbase.com";
},a;
}(),this.DemandbaseClient=_1ae;
})).call(this);
var DemandBaseHandler={DB_DATA_KEY:"dbDataKey",dataCallbacks:[],_getDemandBaseString:function(){
return DemandBaseHandler.getValueFromLocal(DemandBaseHandler.DB_DATA_KEY);
},_putDemandBaseString:function(val){
DemandBaseHandler.putValueToLocal(DemandBaseHandler.DB_DATA_KEY,val);
},getValueFromLocal:function(key){
if(window.sessionStorage){
return sessionStorage.getItem(key);
}else{
return DemandBaseHandler.getCookie(key);
}
},putValueToLocal:function(key,_1cd){
if(window.sessionStorage){
sessionStorage.setItem(key,_1cd);
}else{
document.cookie=key+"="+val;
}
},getCookie:function(Name){
var _1cf=Name+"=";
var _1d0="";
if(document.cookie.length>0){
offset=document.cookie.indexOf(_1cf);
if(offset!=-1){
offset+=_1cf.length;
end=document.cookie.indexOf(";",offset);
if(end==-1){
end=document.cookie.length;
}
_1d0=unescape(document.cookie.substring(offset,end));
}
}
return _1d0;
},_dbCallback:function(data){
var d=new DemandBaseData().fromDbReturn(data);
var s=d.marshall();
DemandBaseHandler._putDemandBaseString(s);
for(var i=0;i<DemandBaseHandler.dataCallbacks.length;i++){
DemandBaseHandler.dataCallbacks[i](d);
}
},init:function(){
if(!DemandBaseHandler._getDemandBaseString()){
var _1d5=new DemandbaseClient("d43c0b2ba3ccd637739e306426ba8a3546a08724");
_1d5.ip(DemandBaseHandler._dbCallback);
}
},getDemandBaseData:function(){
var d=DemandBaseHandler._getDemandBaseString();
if(d){
return new DemandBaseData().unmarshall(d);
}
},addCallback:function(func){
this.dataCallbacks.push(func);
}};
DemandBaseHandler.init();
function DemandBaseData(){
};
DemandBaseData.dbKeys=["audience","marketing_alias","audience_segment","industry","sub_industry","employee_count","annual_sales","street_address","city","state","zip","country","demandbase_sid","primary_sic","ip","registry_area_code","registry_country_code","registry_zip_code"];
DemandBaseData.prototype.marshall=function(){
var s="";
for(var i=0;i<DemandBaseData.dbKeys.length;i++){
var v=this[DemandBaseData.dbKeys[i]];
if(!v){
v="";
}else{
if(typeof v=="string"&&v.indexOf("|")>=0){
v=v.replace("|","_");
}
}
s=s+v;
if(i<DemandBaseData.dbKeys.length-1){
s=s+"|";
}
}
return s;
};
DemandBaseData.prototype.unmarshall=function(str){
var ary=str.split("|");
for(var i=0;i<DemandBaseData.dbKeys.length;i++){
this[DemandBaseData.dbKeys[i]]=ary[i];
}
return this;
};
DemandBaseData.prototype.fromDbReturn=function(obj){
for(var i=0;i<DemandBaseData.dbKeys.length;i++){
var s=DemandBaseData.dbKeys[i];
this[s]=obj[s];
}
return this;
};
var DemandBaseToCoreMetrics={CM_SENT_COOKIE_KEY:"cmAlreadySent",coreMetricsData:["marketing_alias","industry","sub_industry","employee_count","annual_sales","street_address","city","state","zip","country","demandbase_sid","primary_sic","VIDEO_RESERVE","VIDEO_RESERVE","VIDEO_RESERVE","ip","registry_area_code","registry_country_code","registry_zip_code"],init:function(){
if(typeof DemandBaseHandler!=="undefined"){
var d=DemandBaseHandler.getDemandBaseData();
if(d){
DemandBaseToCoreMetrics.sendData(d);
}else{
DemandBaseHandler.addCallback(DemandBaseToCoreMetrics.sendData);
}
}
},sendData:function(data){
if(typeof DemandBaseHandler!=="undefined"){
var v=DemandBaseHandler.getValueFromLocal(DemandBaseToCoreMetrics.CM_SENT_COOKIE_KEY);
if(!v){
data.VIDEO_RESERVE="";
var s="";
for(var i=0;i<DemandBaseToCoreMetrics.coreMetricsData.length;i++){
var v=data[DemandBaseToCoreMetrics.coreMetricsData[i]];
if(typeof v=="string"){
v=v.replace("[_-]"," ");
}
s=s+v;
if(i<DemandBaseToCoreMetrics.coreMetricsData.length-1){
s=s+"-_-";
}
}
if(data.audience_segment==null){
data.audience_segment="Unknown";
}
cmCreateElementTag(data.audience_segment,data.audience,s);
DemandBaseHandler.putValueToLocal(DemandBaseToCoreMetrics.CM_SENT_COOKIE_KEY,"1");
}
}
}};
DemandBaseToCoreMetrics.init();
