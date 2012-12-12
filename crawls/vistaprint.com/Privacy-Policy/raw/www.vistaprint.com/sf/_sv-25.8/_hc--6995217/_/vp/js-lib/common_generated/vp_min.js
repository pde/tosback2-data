                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}



var isIE=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false;
var isWin=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:false;
var isOpera=(navigator.userAgent.indexOf("Opera")!=-1)?true:false;

function ControlVersion()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var version;
var axo;
var e;



try{

axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
version=axo.GetVariable("$version");
}catch(e){
}

if(!version)
{
try{

axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");






version="WIN 6,0,21,0";


axo.AllowScriptAccess="always";


version=axo.GetVariable("$version");

}catch(e){
}
}

if(!version)
{
try{

axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
version=axo.GetVariable("$version");
}catch(e){
}
}

if(!version)
{
try{

axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
version="WIN 3,0,18,0";
}catch(e){
}
}

if(!version)
{
try{

axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
version="WIN 2,0,0,11";
}catch(e){
version=-1;
}
}

return version;
}ControlVersion._vpfn='$vpfn_zpWe7dsHzvwB8IUPLmEDxQ9$0';


function GetSwfVer(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var flashVer=-1;

if(navigator.plugins!=null&&navigator.plugins.length>0){
if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){
var swVer2=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";
var flashDescription=navigator.plugins["Shockwave Flash"+swVer2].description;
var descArray=flashDescription.split(" ");
var tempArrayMajor=descArray[2].split(".");
var versionMajor=tempArrayMajor[0];
var versionMinor=tempArrayMajor[1];
if(descArray[3]!=""){
tempArrayMinor=descArray[3].split("r");
}else{
tempArrayMinor=descArray[4].split("r");
}
var versionRevision=tempArrayMinor[1]>0?tempArrayMinor[1]:0;
var flashVer=versionMajor+"."+versionMinor+"."+versionRevision;
}
}

else if(navigator.userAgent.toLowerCase().indexOf("webtv/2.6")!=-1)flashVer=4;

else if(navigator.userAgent.toLowerCase().indexOf("webtv/2.5")!=-1)flashVer=3;

else if(navigator.userAgent.toLowerCase().indexOf("webtv")!=-1)flashVer=2;
else if(isIE&&isWin&&!isOpera){
flashVer=ControlVersion();
}
return flashVer;
}GetSwfVer._vpfn='$vpfn_nLJ7gIeF37nZ5hFsmtltmA82$0';


function DetectFlashVer(reqMajorVer,reqMinorVer,reqRevision)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
versionStr=GetSwfVer();
if(versionStr==-1){
return false;
}else if(versionStr!=0){
if(isIE&&isWin&&!isOpera){

tempArray=versionStr.split(" ");
tempString=tempArray[1];
versionArray=tempString.split(",");
}else{
versionArray=versionStr.split(".");
}
var versionMajor=versionArray[0];
var versionMinor=versionArray[1];
var versionRevision=versionArray[2];


if(versionMajor>parseFloat(reqMajorVer)){
return true;
}else if(versionMajor==parseFloat(reqMajorVer)){
if(versionMinor>parseFloat(reqMinorVer))
return true;
else if(versionMinor==parseFloat(reqMinorVer)){
if(versionRevision>=parseFloat(reqRevision))
return true;
}
}
return false;
}
}DetectFlashVer._vpfn='$vpfn_EMj2mMY$loDuQX9UP2aGGg116$0';

function AC_AddExtension(src,ext)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(src.indexOf('?')!=-1)
return src.replace(/\?/,ext+'?');
else
return src+ext;
}AC_AddExtension._vpfn='$vpfn_J6cgD3xc2jXHR9OxHzgWlQ149$0';

function AC_Generateobj(objAttrs,params,embedAttrs,hidden,afterload)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var str='';
if(hidden==true){
str+='<div style="overflow: hidden; width: 1px; height: 1px;">';
}

if(isIE&&isWin&&!isOpera)
{
str+='<object ';
for(var i in objAttrs)
str+=i+'="'+objAttrs[i]+'" ';
str+='>';
for(var i in params)
str+='<param name="'+i+'" value="'+params[i]+'" /> ';
str+='</object>';
}else{
str+='<embed ';
for(var i in embedAttrs)
str+=i+'="'+embedAttrs[i]+'" ';
str+='> </embed>';
}

if(hidden){
str+='</div>';
}

if(afterload)
{

var elem=document.createElement("DIV");
elem.innerHTML=str;
var innerElem=elem.firstChild;
elem.removeChild(innerElem);


document.body.appendChild(innerElem);
}
else
{
document.write(str);
}
}AC_Generateobj._vpfn='$vpfn_W9GqMGpSvLbEwJFguMLrmg157$0';

function AC_FL_RunContent(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var ret=AC_GetArgs(0,arguments,".swf","movie","clsid:d27cdb6e-ae6d-11cf-96b8-444553540000","application/x-shockwave-flash");
AC_Generateobj(ret.objAttrs,ret.params,ret.embedAttrs,false,false);
}AC_FL_RunContent._vpfn='$vpfn_3qFj8LzMg3uopI$pweZLww201$0';


function AC_FL_RunContentH(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var ret=AC_GetArgs(0,arguments,".swf","movie","clsid:d27cdb6e-ae6d-11cf-96b8-444553540000","application/x-shockwave-flash");
AC_Generateobj(ret.objAttrs,ret.params,ret.embedAttrs,true,false);
}AC_FL_RunContentH._vpfn='$vpfn_dLcyntq8aoeHljsTT1fumg207$0';

function AC_FL_RunContentEx(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var ret=AC_GetArgs(2,arguments,".swf","movie","clsid:d27cdb6e-ae6d-11cf-96b8-444553540000","application/x-shockwave-flash");
AC_Generateobj(ret.objAttrs,ret.params,ret.embedAttrs,ret.hidden,ret.afterload);
}AC_FL_RunContentEx._vpfn='$vpfn_XIHoZtUagylbh5h8KY3JqA212$0';

function AC_GetArgs(start,args,ext,srcParamName,classid,mimeType){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var ret=new Object();
ret.embedAttrs=new Object();
ret.params=new Object();
ret.objAttrs=new Object();
if(start==2){
ret.hidden=args[0];
ret.afterload=args[1];
}
for(var i=start;i<args.length;i=i+2){
var currArg=args[i].toLowerCase();

switch(currArg){
case"classid":
break;
case"pluginspage":
ret.embedAttrs[args[i]]=args[i+1];
break;
case"src":
case"movie":
args[i+1]=AC_AddExtension(args[i+1],ext);
ret.embedAttrs["src"]=args[i+1];
ret.params[srcParamName]=args[i+1];
break;
case"onafterupdate":
case"onbeforeupdate":
case"onblur":
case"oncellchange":
case"onclick":
case"ondblClick":
case"ondrag":
case"ondragend":
case"ondragenter":
case"ondragleave":
case"ondragover":
case"ondrop":
case"onfinish":
case"onfocus":
case"onhelp":
case"onmousedown":
case"onmouseup":
case"onmouseover":
case"onmousemove":
case"onmouseout":
case"onkeypress":
case"onkeydown":
case"onkeyup":
case"onload":
case"onlosecapture":
case"onpropertychange":
case"onreadystatechange":
case"onrowsdelete":
case"onrowenter":
case"onrowexit":
case"onrowsinserted":
case"onstart":
case"onscroll":
case"onbeforeeditfocus":
case"onactivate":
case"onbeforedeactivate":
case"ondeactivate":
case"type":
case"codebase":
ret.objAttrs[args[i]]=args[i+1];
break;
case"id":
case"width":
case"height":
case"align":
case"vspace":
case"hspace":
case"class":
case"title":
case"accesskey":
case"name":
case"tabindex":
ret.embedAttrs[args[i]]=ret.objAttrs[args[i]]=args[i+1];
break;
default:
ret.embedAttrs[args[i]]=ret.params[args[i]]=args[i+1];
}
}
ret.objAttrs["classid"]=classid;
if(mimeType)ret.embedAttrs["type"]=mimeType;
return ret;
}AC_GetArgs._vpfn='$vpfn_PK7KT7D1$ShCYyNcEmdyEg217$0';



var BROWSER_CLASS_Unknown='Unknown';
var BROWSER_CLASS_InternetExplorer='InternetExplorer';
var BROWSER_CLASS_Gecko='Gecko';
var BROWSER_CLASS_Webkit='Webkit';
var BROWSER_CLASS_Opera='Opera';

var BROWSER_NAME_Unknown='Unknown';
var BROWSER_NAME_InternetExplorer='InternetExplorer';
var BROWSER_NAME_Firefox='Firefox';
var BROWSER_NAME_Mozilla='Mozilla';
var BROWSER_NAME_Safari='Safari';
var BROWSER_NAME_GoogleChrome='GoogleChrome';
var BROWSER_NAME_Opera='Opera';
var BROWSER_NAME_MobileSafari='MobileSafari';
var BROWSER_NAME_Android='Android';
var BROWSER_NAME_Blackberry='Blackberry';
var BROWSER_NAME_Camino='Camino';
var BROWSER_NAME_Dolfin='Dolfin';
var BROWSER_NAME_KindleSilk='KindleSilk';
var BROWSER_NAME_MobileChrome='MobileChrome';

var BROWSER_OS_Unknown='Unknown';
var BROWSER_OS_Windows='Windows';
var BROWSER_OS_Macintosh='Macintosh';
var BROWSER_OS_Linux='Linux';
var BROWSER_OS_Other='Other';
var BROWSER_OS_IOs='IOs';
var BROWSER_OS_Android='Android';
var BROWSER_OS_Blackberry='Blackberry';
var BROWSER_OS_WindowsPhone='WindowsPhone';
var BROWSER_OS_WebOs='WebOs';
var BROWSER_OS_Symbian='Symbian';
var BROWSER_OS_Bada='Bada';
var BROWSER_OS_BlackberryTabletOs='BlackberryTabletOs';




/*!
 * jQuery JavaScript Library v1.7.2
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
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */

(function(window,undefined){


var document=window.document,
navigator=window.navigator,
location=window.location;
var jQuery=(function(){


var jQuery=function(selector,context){

return new jQuery.fn.init(selector,context,rootjQuery);
},


_jQuery=window.jQuery,


_$=window.$,


rootjQuery,



quickExpr=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,


rnotwhite=/\S/,


trimLeft=/^\s+/,
trimRight=/\s+$/,


rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,


rvalidchars=/^[\],:{}\s]*$/,
rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,


rwebkit=/(webkit)[ \/]([\w.]+)/,
ropera=/(opera)(?:.*version)?[ \/]([\w.]+)/,
rmsie=/(msie) ([\w.]+)/,
rmozilla=/(mozilla)(?:.*? rv:([\w.]+))?/,


rdashAlpha=/-([a-z]|[0-9])/ig,
rmsPrefix=/^-ms-/,


fcamelCase=function(all,letter){
return(letter+"").toUpperCase();
},


userAgent=navigator.userAgent,


browserMatch,


readyList,


DOMContentLoaded,


toString=Object.prototype.toString,
hasOwn=Object.prototype.hasOwnProperty,
push=Array.prototype.push,
slice=Array.prototype.slice,
trim=String.prototype.trim,
indexOf=Array.prototype.indexOf,


class2type={};

jQuery.fn=jQuery.prototype={
constructor:jQuery,
init:function(selector,context,rootjQuery){
var match,elem,ret,doc;


if(!selector){
return this;
}


if(selector.nodeType){
this.context=this[0]=selector;
this.length=1;
return this;
}


if(selector==="body"&&!context&&document.body){
this.context=document;
this[0]=document.body;
this.selector=selector;
this.length=1;
return this;
}


if(typeof selector==="string"){

if(selector.charAt(0)==="<"&&selector.charAt(selector.length-1)===">"&&selector.length>=3){

match=[null,selector,null];

}else{
match=quickExpr.exec(selector);
}


if(match&&(match[1]||!context)){


if(match[1]){
context=context instanceof jQuery?context[0]:context;
doc=(context?context.ownerDocument||context:document);



ret=rsingleTag.exec(selector);

if(ret){
if(jQuery.isPlainObject(context)){
selector=[document.createElement(ret[1])];
jQuery.fn.attr.call(selector,context,true);

}else{
selector=[doc.createElement(ret[1])];
}

}else{
ret=jQuery.buildFragment([match[1]],[doc]);
selector=(ret.cacheable?jQuery.clone(ret.fragment):ret.fragment).childNodes;
}

return jQuery.merge(this,selector);


}else{
elem=document.getElementById(match[2]);



if(elem&&elem.parentNode){


if(elem.id!==match[2]){
return rootjQuery.find(selector);
}


this.length=1;
this[0]=elem;
}

this.context=document;
this.selector=selector;
return this;
}


}else if(!context||context.jquery){
return(context||rootjQuery).find(selector);



}else{
return this.constructor(context).find(selector);
}



}else if(jQuery.isFunction(selector)){
return rootjQuery.ready(selector);
}

if(selector.selector!==undefined){
this.selector=selector.selector;
this.context=selector.context;
}

return jQuery.makeArray(selector,this);
},


selector:"",


jquery:"1.7.2",


length:0,


size:function(){
return this.length;
},

toArray:function(){
return slice.call(this,0);
},



get:function(num){
return num==null?


this.toArray():


(num<0?this[this.length+num]:this[num]);
},



pushStack:function(elems,name,selector){

var ret=this.constructor();

if(jQuery.isArray(elems)){
push.apply(ret,elems);

}else{
jQuery.merge(ret,elems);
}


ret.prevObject=this;

ret.context=this.context;

if(name==="find"){
ret.selector=this.selector+(this.selector?" ":"")+selector;
}else if(name){
ret.selector=this.selector+"."+name+"("+selector+")";
}


return ret;
},




each:function(callback,args){
return jQuery.each(this,callback,args);
},

ready:function(fn){

jQuery.bindReady();


readyList.add(fn);

return this;
},

eq:function(i){
i=+i;
return i===-1?
this.slice(i):
this.slice(i,i+1);
},

first:function(){
return this.eq(0);
},

last:function(){
return this.eq(-1);
},

slice:function(){
return this.pushStack(slice.apply(this,arguments),
"slice",slice.call(arguments).join(","));
},

map:function(callback){
return this.pushStack(jQuery.map(this,function(elem,i){
return callback.call(elem,i,elem);
}));
},

end:function(){
return this.prevObject||this.constructor(null);
},



push:push,
sort:[].sort,
splice:[].splice
};


jQuery.fn.init.prototype=jQuery.fn;

jQuery.extend=jQuery.fn.extend=function(){
var options,name,src,copy,copyIsArray,clone,
target=arguments[0]||{},
i=1,
length=arguments.length,
deep=false;


if(typeof target==="boolean"){
deep=target;
target=arguments[1]||{};

i=2;
}


if(typeof target!=="object"&&!jQuery.isFunction(target)){
target={};
}


if(length===i){
target=this;
--i;
}

for(;i<length;i++){

if((options=arguments[i])!=null){

for(name in options){
src=target[name];
copy=options[name];


if(target===copy){
continue;
}


if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){
if(copyIsArray){
copyIsArray=false;
clone=src&&jQuery.isArray(src)?src:[];

}else{
clone=src&&jQuery.isPlainObject(src)?src:{};
}


target[name]=jQuery.extend(deep,clone,copy);


}else if(copy!==undefined){
target[name]=copy;
}
}
}
}


return target;
};

jQuery.extend({
noConflict:function(deep){
if(window.$===jQuery){
window.$=_$;
}

if(deep&&window.jQuery===jQuery){
window.jQuery=_jQuery;
}

return jQuery;
},


isReady:false,



readyWait:1,


holdReady:function(hold){
if(hold){
jQuery.readyWait++;
}else{
jQuery.ready(true);
}
},


ready:function(wait){

if((wait===true&&!--jQuery.readyWait)||(wait!==true&&!jQuery.isReady)){

if(!document.body){
return setTimeout(jQuery.ready,1);
}


jQuery.isReady=true;


if(wait!==true&&--jQuery.readyWait>0){
return;
}


readyList.fireWith(document,[jQuery]);


if(jQuery.fn.trigger){
jQuery(document).trigger("ready").off("ready");
}
}
},

bindReady:function(){
if(readyList){
return;
}

readyList=jQuery.Callbacks("once memory");



if(document.readyState==="complete"){

return setTimeout(jQuery.ready,1);
}


if(document.addEventListener){

document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);


window.addEventListener("load",jQuery.ready,false);


}else if(document.attachEvent){


document.attachEvent("onreadystatechange",DOMContentLoaded);


window.attachEvent("onload",jQuery.ready);



var toplevel=false;

try{
toplevel=window.frameElement==null;
}catch(e){}

if(document.documentElement.doScroll&&toplevel){
doScrollCheck();
}
}
},




isFunction:function(obj){
return jQuery.type(obj)==="function";
},

isArray:Array.isArray||function(obj){
return jQuery.type(obj)==="array";
},

isWindow:function(obj){
return obj!=null&&obj==obj.window;
},

isNumeric:function(obj){
return!isNaN(parseFloat(obj))&&isFinite(obj);
},

type:function(obj){
return obj==null?
String(obj):
class2type[toString.call(obj)]||"object";
},

isPlainObject:function(obj){



if(!obj||jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){
return false;
}

try{

if(obj.constructor&&
!hasOwn.call(obj,"constructor")&&
!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){
return false;
}
}catch(e){

return false;
}




var key;
for(key in obj){}

return key===undefined||hasOwn.call(obj,key);
},

isEmptyObject:function(obj){
for(var name in obj){
return false;
}
return true;
},

error:function(msg){
throw new Error(msg);
},

parseJSON:function(data){
if(typeof data!=="string"||!data){
return null;
}


data=jQuery.trim(data);


if(window.JSON&&window.JSON.parse){
return window.JSON.parse(data);
}



if(rvalidchars.test(data.replace(rvalidescape,"@")
.replace(rvalidtokens,"]")
.replace(rvalidbraces,""))){

return(new Function("return "+data))();

}
jQuery.error("Invalid JSON: "+data);
},


parseXML:function(data){
if(typeof data!=="string"||!data){
return null;
}
var xml,tmp;
try{
if(window.DOMParser){
tmp=new DOMParser();
xml=tmp.parseFromString(data,"text/xml");
}else{
xml=new ActiveXObject("Microsoft.XMLDOM");
xml.async="false";
xml.loadXML(data);
}
}catch(e){
xml=undefined;
}
if(!xml||!xml.documentElement||xml.getElementsByTagName("parsererror").length){
jQuery.error("Invalid XML: "+data);
}
return xml;
},

noop:function(){},




globalEval:function(data){
if(data&&rnotwhite.test(data)){



(window.execScript||function(data){
window["eval"].call(window,data);
})(data);
}
},



camelCase:function(string){
return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);
},

nodeName:function(elem,name){
return elem.nodeName&&elem.nodeName.toUpperCase()===name.toUpperCase();
},


each:function(object,callback,args){
var name,i=0,
length=object.length,
isObj=length===undefined||jQuery.isFunction(object);

if(args){
if(isObj){
for(name in object){
if(callback.apply(object[name],args)===false){
break;
}
}
}else{
for(;i<length;){
if(callback.apply(object[i++],args)===false){
break;
}
}
}


}else{
if(isObj){
for(name in object){
if(callback.call(object[name],name,object[name])===false){
break;
}
}
}else{
for(;i<length;){
if(callback.call(object[i],i,object[i++])===false){
break;
}
}
}
}

return object;
},


trim:trim?
function(text){
return text==null?
"":
trim.call(text);
}:


function(text){
return text==null?
"":
text.toString().replace(trimLeft,"").replace(trimRight,"");
},


makeArray:function(array,results){
var ret=results||[];

if(array!=null){


var type=jQuery.type(array);

if(array.length==null||type==="string"||type==="function"||type==="regexp"||jQuery.isWindow(array)){
push.call(ret,array);
}else{
jQuery.merge(ret,array);
}
}

return ret;
},

inArray:function(elem,array,i){
var len;

if(array){
if(indexOf){
return indexOf.call(array,elem,i);
}

len=array.length;
i=i?i<0?Math.max(0,len+i):i:0;

for(;i<len;i++){

if(i in array&&array[i]===elem){
return i;
}
}
}

return-1;
},

merge:function(first,second){
var i=first.length,
j=0;

if(typeof second.length==="number"){
for(var l=second.length;j<l;j++){
first[i++]=second[j];
}

}else{
while(second[j]!==undefined){
first[i++]=second[j++];
}
}

first.length=i;

return first;
},

grep:function(elems,callback,inv){
var ret=[],retVal;
inv=!!inv;



for(var i=0,length=elems.length;i<length;i++){
retVal=!!callback(elems[i],i);
if(inv!==retVal){
ret.push(elems[i]);
}
}

return ret;
},


map:function(elems,callback,arg){
var value,key,ret=[],
i=0,
length=elems.length,

isArray=elems instanceof jQuery||length!==undefined&&typeof length==="number"&&((length>0&&elems[0]&&elems[length-1])||length===0||jQuery.isArray(elems));


if(isArray){
for(;i<length;i++){
value=callback(elems[i],i,arg);

if(value!=null){
ret[ret.length]=value;
}
}


}else{
for(key in elems){
value=callback(elems[key],key,arg);

if(value!=null){
ret[ret.length]=value;
}
}
}


return ret.concat.apply([],ret);
},


guid:1,



proxy:function(fn,context){
if(typeof context==="string"){
var tmp=fn[context];
context=fn;
fn=tmp;
}



if(!jQuery.isFunction(fn)){
return undefined;
}


var args=slice.call(arguments,2),
proxy=function(){
return fn.apply(context,args.concat(slice.call(arguments)));
};


proxy.guid=fn.guid=fn.guid||proxy.guid||jQuery.guid++;

return proxy;
},



access:function(elems,fn,key,value,chainable,emptyGet,pass){
var exec,
bulk=key==null,
i=0,
length=elems.length;


if(key&&typeof key==="object"){
for(i in key){
jQuery.access(elems,fn,i,key[i],1,emptyGet,value);
}
chainable=1;


}else if(value!==undefined){

exec=pass===undefined&&jQuery.isFunction(value);

if(bulk){

if(exec){
exec=fn;
fn=function(elem,key,value){
return exec.call(jQuery(elem),value);
};


}else{
fn.call(elems,value);
fn=null;
}
}

if(fn){
for(;i<length;i++){
fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass);
}
}

chainable=1;
}

return chainable?
elems:


bulk?
fn.call(elems):
length?fn(elems[0],key):emptyGet;
},

now:function(){
return(new Date()).getTime();
},



uaMatch:function(ua){
ua=ua.toLowerCase();

var match=rwebkit.exec(ua)||
ropera.exec(ua)||
rmsie.exec(ua)||
ua.indexOf("compatible")<0&&rmozilla.exec(ua)||
[];

return{browser:match[1]||"",version:match[2]||"0"};
},

sub:function(){
function jQuerySub(selector,context){
return new jQuerySub.fn.init(selector,context);
}
jQuery.extend(true,jQuerySub,this);
jQuerySub.superclass=this;
jQuerySub.fn=jQuerySub.prototype=this();
jQuerySub.fn.constructor=jQuerySub;
jQuerySub.sub=this.sub;
jQuerySub.fn.init=function init(selector,context){
if(context&&context instanceof jQuery&&!(context instanceof jQuerySub)){
context=jQuerySub(context);
}

return jQuery.fn.init.call(this,selector,context,rootjQuerySub);
};
jQuerySub.fn.init.prototype=jQuerySub.fn;
var rootjQuerySub=jQuerySub(document);
return jQuerySub;
},

browser:{}
});


jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(i,name){
class2type["[object "+name+"]"]=name.toLowerCase();
});

browserMatch=jQuery.uaMatch(userAgent);
if(browserMatch.browser){
jQuery.browser[browserMatch.browser]=true;
jQuery.browser.version=browserMatch.version;
}


if(jQuery.browser.webkit){
jQuery.browser.safari=true;
}


if(rnotwhite.test("\xA0")){
trimLeft=/^[\s\xA0]+/;
trimRight=/[\s\xA0]+$/;
}


rootjQuery=jQuery(document);


if(document.addEventListener){
DOMContentLoaded=function(){
document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);
jQuery.ready();
};

}else if(document.attachEvent){
DOMContentLoaded=function(){

if(document.readyState==="complete"){
document.detachEvent("onreadystatechange",DOMContentLoaded);
jQuery.ready();
}
};
}


function doScrollCheck(){
if(jQuery.isReady){
return;
}

try{


document.documentElement.doScroll("left");
}catch(e){
setTimeout(doScrollCheck,1);
return;
}


jQuery.ready();
}

return jQuery;

})();



var flagsCache={};


function createFlags(flags){
var object=flagsCache[flags]={},
i,length;
flags=flags.split(/\s+/);
for(i=0,length=flags.length;i<length;i++){
object[flags[i]]=true;
}
return object;
}























jQuery.Callbacks=function(flags){



flags=flags?(flagsCache[flags]||createFlags(flags)):{};

var
list=[],

stack=[],

memory,

fired,

firing,

firingStart,

firingLength,

firingIndex,

add=function(args){
var i,
length,
elem,
type,
actual;
for(i=0,length=args.length;i<length;i++){
elem=args[i];
type=jQuery.type(elem);
if(type==="array"){

add(elem);
}else if(type==="function"){

if(!flags.unique||!self.has(elem)){
list.push(elem);
}
}
}
},

fire=function(context,args){
args=args||[];
memory=!flags.memory||[context,args];
fired=true;
firing=true;
firingIndex=firingStart||0;
firingStart=0;
firingLength=list.length;
for(;list&&firingIndex<firingLength;firingIndex++){
if(list[firingIndex].apply(context,args)===false&&flags.stopOnFalse){
memory=true;
break;
}
}
firing=false;
if(list){
if(!flags.once){
if(stack&&stack.length){
memory=stack.shift();
self.fireWith(memory[0],memory[1]);
}
}else if(memory===true){
self.disable();
}else{
list=[];
}
}
},

self={

add:function(){
if(list){
var length=list.length;
add(arguments);


if(firing){
firingLength=list.length;



}else if(memory&&memory!==true){
firingStart=length;
fire(memory[0],memory[1]);
}
}
return this;
},

remove:function(){
if(list){
var args=arguments,
argIndex=0,
argLength=args.length;
for(;argIndex<argLength;argIndex++){
for(var i=0;i<list.length;i++){
if(args[argIndex]===list[i]){

if(firing){
if(i<=firingLength){
firingLength--;
if(i<=firingIndex){
firingIndex--;
}
}
}

list.splice(i--,1);


if(flags.unique){
break;
}
}
}
}
}
return this;
},

has:function(fn){
if(list){
var i=0,
length=list.length;
for(;i<length;i++){
if(fn===list[i]){
return true;
}
}
}
return false;
},

empty:function(){
list=[];
return this;
},

disable:function(){
list=stack=memory=undefined;
return this;
},

disabled:function(){
return!list;
},

lock:function(){
stack=undefined;
if(!memory||memory===true){
self.disable();
}
return this;
},

locked:function(){
return!stack;
},

fireWith:function(context,args){
if(stack){
if(firing){
if(!flags.once){
stack.push([context,args]);
}
}else if(!(flags.once&&memory)){
fire(context,args);
}
}
return this;
},

fire:function(){
self.fireWith(this,arguments);
return this;
},

fired:function(){
return!!fired;
}
};

return self;
};




var
sliceDeferred=[].slice;

jQuery.extend({

Deferred:function(func){
var doneList=jQuery.Callbacks("once memory"),
failList=jQuery.Callbacks("once memory"),
progressList=jQuery.Callbacks("memory"),
state="pending",
lists={
resolve:doneList,
reject:failList,
notify:progressList
},
promise={
done:doneList.add,
fail:failList.add,
progress:progressList.add,

state:function(){
return state;
},


isResolved:doneList.fired,
isRejected:failList.fired,

then:function(doneCallbacks,failCallbacks,progressCallbacks){
deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
return this;
},
always:function(){
deferred.done.apply(deferred,arguments).fail.apply(deferred,arguments);
return this;
},
pipe:function(fnDone,fnFail,fnProgress){
return jQuery.Deferred(function(newDefer){
jQuery.each({
done:[fnDone,"resolve"],
fail:[fnFail,"reject"],
progress:[fnProgress,"notify"]
},function(handler,data){
var fn=data[0],
action=data[1],
returned;
if(jQuery.isFunction(fn)){
deferred[handler](function(){
returned=fn.apply(this,arguments);
if(returned&&jQuery.isFunction(returned.promise)){
returned.promise().then(newDefer.resolve,newDefer.reject,newDefer.notify);
}else{
newDefer[action+"With"](this===deferred?newDefer:this,[returned]);
}
});
}else{
deferred[handler](newDefer[action]);
}
});
}).promise();
},


promise:function(obj){
if(obj==null){
obj=promise;
}else{
for(var key in promise){
obj[key]=promise[key];
}
}
return obj;
}
},
deferred=promise.promise({}),
key;

for(key in lists){
deferred[key]=lists[key].fire;
deferred[key+"With"]=lists[key].fireWith;
}


deferred.done(function(){
state="resolved";
},failList.disable,progressList.lock).fail(function(){
state="rejected";
},doneList.disable,progressList.lock);


if(func){
func.call(deferred,deferred);
}


return deferred;
},


when:function(firstParam){
var args=sliceDeferred.call(arguments,0),
i=0,
length=args.length,
pValues=new Array(length),
count=length,
pCount=length,
deferred=length<=1&&firstParam&&jQuery.isFunction(firstParam.promise)?
firstParam:
jQuery.Deferred(),
promise=deferred.promise();
function resolveFunc(i){
return function(value){
args[i]=arguments.length>1?sliceDeferred.call(arguments,0):value;
if(!(--count)){
deferred.resolveWith(deferred,args);
}
};
}
function progressFunc(i){
return function(value){
pValues[i]=arguments.length>1?sliceDeferred.call(arguments,0):value;
deferred.notifyWith(promise,pValues);
};
}
if(length>1){
for(;i<length;i++){
if(args[i]&&args[i].promise&&jQuery.isFunction(args[i].promise)){
args[i].promise().then(resolveFunc(i),deferred.reject,progressFunc(i));
}else{
--count;
}
}
if(!count){
deferred.resolveWith(deferred,args);
}
}else if(deferred!==firstParam){
deferred.resolveWith(deferred,length?[firstParam]:[]);
}
return promise;
}
});




jQuery.support=(function(){

var support,
all,
a,
select,
opt,
input,
fragment,
tds,
events,
eventName,
i,
isSupported,
div=document.createElement("div"),
documentElement=document.documentElement;


div.setAttribute("className","t");
div.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

all=div.getElementsByTagName("*");
a=div.getElementsByTagName("a")[0];


if(!all||!all.length||!a){
return{};
}


select=document.createElement("select");
opt=select.appendChild(document.createElement("option"));
input=div.getElementsByTagName("input")[0];

support={

leadingWhitespace:(div.firstChild.nodeType===3),



tbody:!div.getElementsByTagName("tbody").length,



htmlSerialize:!!div.getElementsByTagName("link").length,



style:/top/.test(a.getAttribute("style")),



hrefNormalized:(a.getAttribute("href")==="/a"),




opacity:/^0.55/.test(a.style.opacity),



cssFloat:!!a.style.cssFloat,




checkOn:(input.value==="on"),



optSelected:opt.selected,


getSetAttribute:div.className!=="t",


enctype:!!document.createElement("form").enctype,



html5Clone:document.createElement("nav").cloneNode(true).outerHTML!=="<:nav></:nav>",


submitBubbles:true,
changeBubbles:true,
focusinBubbles:false,
deleteExpando:true,
noCloneEvent:true,
inlineBlockNeedsLayout:false,
shrinkWrapBlocks:false,
reliableMarginRight:true,
pixelMargin:true
};


jQuery.boxModel=support.boxModel=(document.compatMode==="CSS1Compat");


input.checked=true;
support.noCloneChecked=input.cloneNode(true).checked;



select.disabled=true;
support.optDisabled=!opt.disabled;



try{
delete div.test;
}catch(e){
support.deleteExpando=false;
}

if(!div.addEventListener&&div.attachEvent&&div.fireEvent){
div.attachEvent("onclick",function(){


support.noCloneEvent=false;
});
div.cloneNode(true).fireEvent("onclick");
}



input=document.createElement("input");
input.value="t";
input.setAttribute("type","radio");
support.radioValue=input.value==="t";

input.setAttribute("checked","checked");


input.setAttribute("name","t");

div.appendChild(input);
fragment=document.createDocumentFragment();
fragment.appendChild(div.lastChild);


support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;



support.appendChecked=input.checked;

fragment.removeChild(input);
fragment.appendChild(div);







if(div.attachEvent){
for(i in{
submit:1,
change:1,
focusin:1
}){
eventName="on"+i;
isSupported=(eventName in div);
if(!isSupported){
div.setAttribute(eventName,"return;");
isSupported=(typeof div[eventName]==="function");
}
support[i+"Bubbles"]=isSupported;
}
}

fragment.removeChild(div);


fragment=select=opt=div=input=null;


jQuery(function(){
var container,outer,inner,table,td,offsetSupport,
marginDiv,conMarginTop,style,html,positionTopLeftWidthHeight,
paddingMarginBorderVisibility,paddingMarginBorder,
body=document.getElementsByTagName("body")[0];

if(!body){

return;
}

conMarginTop=1;
paddingMarginBorder="padding:0;margin:0;border:";
positionTopLeftWidthHeight="position:absolute;top:0;left:0;width:1px;height:1px;";
paddingMarginBorderVisibility=paddingMarginBorder+"0;visibility:hidden;";
style="style='"+positionTopLeftWidthHeight+paddingMarginBorder+"5px solid #000;";
html="<div "+style+"display:block;'><div style='"+paddingMarginBorder+"0;display:block;overflow:hidden;'></div></div>"+
"<table "+style+"' cellpadding='0' cellspacing='0'>"+
"<tr><td></td></tr></table>";

container=document.createElement("div");
container.style.cssText=paddingMarginBorderVisibility+"width:0;height:0;position:static;top:0;margin-top:"+conMarginTop+"px";
body.insertBefore(container,body.firstChild);


div=document.createElement("div");
container.appendChild(div);








div.innerHTML="<table><tr><td style='"+paddingMarginBorder+"0;display:none'></td><td>t</td></tr></table>";
tds=div.getElementsByTagName("td");
isSupported=(tds[0].offsetHeight===0);

tds[0].style.display="";
tds[1].style.display="none";



support.reliableHiddenOffsets=isSupported&&(tds[0].offsetHeight===0);






if(window.getComputedStyle){
div.innerHTML="";
marginDiv=document.createElement("div");
marginDiv.style.width="0";
marginDiv.style.marginRight="0";
div.style.width="2px";
div.appendChild(marginDiv);
support.reliableMarginRight=
(parseInt((window.getComputedStyle(marginDiv,null)||{marginRight:0}).marginRight,10)||0)===0;
}

if(typeof div.style.zoom!=="undefined"){




div.innerHTML="";
div.style.width=div.style.padding="1px";
div.style.border=0;
div.style.overflow="hidden";
div.style.display="inline";
div.style.zoom=1;
support.inlineBlockNeedsLayout=(div.offsetWidth===3);



div.style.display="block";
div.style.overflow="visible";
div.innerHTML="<div style='width:5px;'></div>";
support.shrinkWrapBlocks=(div.offsetWidth!==3);
}

div.style.cssText=positionTopLeftWidthHeight+paddingMarginBorderVisibility;
div.innerHTML=html;

outer=div.firstChild;
inner=outer.firstChild;
td=outer.nextSibling.firstChild.firstChild;

offsetSupport={
doesNotAddBorder:(inner.offsetTop!==5),
doesAddBorderForTableAndCells:(td.offsetTop===5)
};

inner.style.position="fixed";
inner.style.top="20px";


offsetSupport.fixedPosition=(inner.offsetTop===20||inner.offsetTop===15);
inner.style.position=inner.style.top="";

outer.style.overflow="hidden";
outer.style.position="relative";

offsetSupport.subtractsBorderForOverflowNotVisible=(inner.offsetTop===-5);
offsetSupport.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==conMarginTop);

if(window.getComputedStyle){
div.style.marginTop="1%";
support.pixelMargin=(window.getComputedStyle(div,null)||{marginTop:0}).marginTop!=="1%";
}

if(typeof container.style.zoom!=="undefined"){
container.style.zoom=1;
}

body.removeChild(container);
marginDiv=div=container=null;

jQuery.extend(support,offsetSupport);
});

return support;
})();




var rbrace=/^(?:\{.*\}|\[.*\])$/,
rmultiDash=/([A-Z])/g;

jQuery.extend({
cache:{},


uuid:0,



expando:"jQuery"+(jQuery.fn.jquery+Math.random()).replace(/\D/g,""),



noData:{
"embed":true,

"object":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
"applet":true
},

hasData:function(elem){
elem=elem.nodeType?jQuery.cache[elem[jQuery.expando]]:elem[jQuery.expando];
return!!elem&&!isEmptyDataObject(elem);
},

data:function(elem,name,data,pvt){
if(!jQuery.acceptData(elem)){
return;
}

var privateCache,thisCache,ret,
internalKey=jQuery.expando,
getByName=typeof name==="string",



isNode=elem.nodeType,



cache=isNode?jQuery.cache:elem,



id=isNode?elem[internalKey]:elem[internalKey]&&internalKey,
isEvents=name==="events";



if((!id||!cache[id]||(!isEvents&&!pvt&&!cache[id].data))&&getByName&&data===undefined){
return;
}

if(!id){


if(isNode){
elem[internalKey]=id=++jQuery.uuid;
}else{
id=internalKey;
}
}

if(!cache[id]){
cache[id]={};



if(!isNode){
cache[id].toJSON=jQuery.noop;
}
}



if(typeof name==="object"||typeof name==="function"){
if(pvt){
cache[id]=jQuery.extend(cache[id],name);
}else{
cache[id].data=jQuery.extend(cache[id].data,name);
}
}

privateCache=thisCache=cache[id];




if(!pvt){
if(!thisCache.data){
thisCache.data={};
}

thisCache=thisCache.data;
}

if(data!==undefined){
thisCache[jQuery.camelCase(name)]=data;
}



if(isEvents&&!thisCache[name]){
return privateCache.events;
}



if(getByName){


ret=thisCache[name];


if(ret==null){


ret=thisCache[jQuery.camelCase(name)];
}
}else{
ret=thisCache;
}

return ret;
},

removeData:function(elem,name,pvt){
if(!jQuery.acceptData(elem)){
return;
}

var thisCache,i,l,


internalKey=jQuery.expando,

isNode=elem.nodeType,


cache=isNode?jQuery.cache:elem,


id=isNode?elem[internalKey]:internalKey;



if(!cache[id]){
return;
}

if(name){

thisCache=pvt?cache[id]:cache[id].data;

if(thisCache){


if(!jQuery.isArray(name)){


if(name in thisCache){
name=[name];
}else{


name=jQuery.camelCase(name);
if(name in thisCache){
name=[name];
}else{
name=name.split(" ");
}
}
}

for(i=0,l=name.length;i<l;i++){
delete thisCache[name[i]];
}



if(!(pvt?isEmptyDataObject:jQuery.isEmptyObject)(thisCache)){
return;
}
}
}


if(!pvt){
delete cache[id].data;



if(!isEmptyDataObject(cache[id])){
return;
}
}





if(jQuery.support.deleteExpando||!cache.setInterval){
delete cache[id];
}else{
cache[id]=null;
}



if(isNode){



if(jQuery.support.deleteExpando){
delete elem[internalKey];
}else if(elem.removeAttribute){
elem.removeAttribute(internalKey);
}else{
elem[internalKey]=null;
}
}
},


_data:function(elem,name,data){
return jQuery.data(elem,name,data,true);
},


acceptData:function(elem){
if(elem.nodeName){
var match=jQuery.noData[elem.nodeName.toLowerCase()];

if(match){
return!(match===true||elem.getAttribute("classid")!==match);
}
}

return true;
}
});

jQuery.fn.extend({
data:function(key,value){
var parts,part,attr,name,l,
elem=this[0],
i=0,
data=null;


if(key===undefined){
if(this.length){
data=jQuery.data(elem);

if(elem.nodeType===1&&!jQuery._data(elem,"parsedAttrs")){
attr=elem.attributes;
for(l=attr.length;i<l;i++){
name=attr[i].name;

if(name.indexOf("data-")===0){
name=jQuery.camelCase(name.substring(5));

dataAttr(elem,name,data[name]);
}
}
jQuery._data(elem,"parsedAttrs",true);
}
}

return data;
}


if(typeof key==="object"){
return this.each(function(){
jQuery.data(this,key);
});
}

parts=key.split(".",2);
parts[1]=parts[1]?"."+parts[1]:"";
part=parts[1]+"!";

return jQuery.access(this,function(value){

if(value===undefined){
data=this.triggerHandler("getData"+part,[parts[0]]);


if(data===undefined&&elem){
data=jQuery.data(elem,key);
data=dataAttr(elem,key,data);
}

return data===undefined&&parts[1]?
this.data(parts[0]):
data;
}

parts[1]=value;
this.each(function(){
var self=jQuery(this);

self.triggerHandler("setData"+part,parts);
jQuery.data(this,key,value);
self.triggerHandler("changeData"+part,parts);
});
},null,value,arguments.length>1,null,false);
},

removeData:function(key){
return this.each(function(){
jQuery.removeData(this,key);
});
}
});

function dataAttr(elem,key,data){


if(data===undefined&&elem.nodeType===1){

var name="data-"+key.replace(rmultiDash,"-$1").toLowerCase();

data=elem.getAttribute(name);

if(typeof data==="string"){
try{
data=data==="true"?true:
data==="false"?false:
data==="null"?null:
jQuery.isNumeric(data)?+data:
rbrace.test(data)?jQuery.parseJSON(data):
data;
}catch(e){}


jQuery.data(elem,key,data);

}else{
data=undefined;
}
}

return data;
}


function isEmptyDataObject(obj){
for(var name in obj){


if(name==="data"&&jQuery.isEmptyObject(obj[name])){
continue;
}
if(name!=="toJSON"){
return false;
}
}

return true;
}




function handleQueueMarkDefer(elem,type,src){
var deferDataKey=type+"defer",
queueDataKey=type+"queue",
markDataKey=type+"mark",
defer=jQuery._data(elem,deferDataKey);
if(defer&&
(src==="queue"||!jQuery._data(elem,queueDataKey))&&
(src==="mark"||!jQuery._data(elem,markDataKey))){


setTimeout(function(){
if(!jQuery._data(elem,queueDataKey)&&
!jQuery._data(elem,markDataKey)){
jQuery.removeData(elem,deferDataKey,true);
defer.fire();
}
},0);
}
}

jQuery.extend({

_mark:function(elem,type){
if(elem){
type=(type||"fx")+"mark";
jQuery._data(elem,type,(jQuery._data(elem,type)||0)+1);
}
},

_unmark:function(force,elem,type){
if(force!==true){
type=elem;
elem=force;
force=false;
}
if(elem){
type=type||"fx";
var key=type+"mark",
count=force?0:((jQuery._data(elem,key)||1)-1);
if(count){
jQuery._data(elem,key,count);
}else{
jQuery.removeData(elem,key,true);
handleQueueMarkDefer(elem,type,"mark");
}
}
},

queue:function(elem,type,data){
var q;
if(elem){
type=(type||"fx")+"queue";
q=jQuery._data(elem,type);


if(data){
if(!q||jQuery.isArray(data)){
q=jQuery._data(elem,type,jQuery.makeArray(data));
}else{
q.push(data);
}
}
return q||[];
}
},

dequeue:function(elem,type){
type=type||"fx";

var queue=jQuery.queue(elem,type),
fn=queue.shift(),
hooks={};


if(fn==="inprogress"){
fn=queue.shift();
}

if(fn){


if(type==="fx"){
queue.unshift("inprogress");
}

jQuery._data(elem,type+".run",hooks);
fn.call(elem,function(){
jQuery.dequeue(elem,type);
},hooks);
}

if(!queue.length){
jQuery.removeData(elem,type+"queue "+type+".run",true);
handleQueueMarkDefer(elem,type,"queue");
}
}
});

jQuery.fn.extend({
queue:function(type,data){
var setter=2;

if(typeof type!=="string"){
data=type;
type="fx";
setter--;
}

if(arguments.length<setter){
return jQuery.queue(this[0],type);
}

return data===undefined?
this:
this.each(function(){
var queue=jQuery.queue(this,type,data);

if(type==="fx"&&queue[0]!=="inprogress"){
jQuery.dequeue(this,type);
}
});
},
dequeue:function(type){
return this.each(function(){
jQuery.dequeue(this,type);
});
},


delay:function(time,type){
time=jQuery.fx?jQuery.fx.speeds[time]||time:time;
type=type||"fx";

return this.queue(type,function(next,hooks){
var timeout=setTimeout(next,time);
hooks.stop=function(){
clearTimeout(timeout);
};
});
},
clearQueue:function(type){
return this.queue(type||"fx",[]);
},


promise:function(type,object){
if(typeof type!=="string"){
object=type;
type=undefined;
}
type=type||"fx";
var defer=jQuery.Deferred(),
elements=this,
i=elements.length,
count=1,
deferDataKey=type+"defer",
queueDataKey=type+"queue",
markDataKey=type+"mark",
tmp;
function resolve(){
if(!(--count)){
defer.resolveWith(elements,[elements]);
}
}
while(i--){
if((tmp=jQuery.data(elements[i],deferDataKey,undefined,true)||
(jQuery.data(elements[i],queueDataKey,undefined,true)||
jQuery.data(elements[i],markDataKey,undefined,true))&&
jQuery.data(elements[i],deferDataKey,jQuery.Callbacks("once memory"),true))){
count++;
tmp.add(resolve);
}
}
resolve();
return defer.promise(object);
}
});




var rclass=/[\n\t\r]/g,
rspace=/\s+/,
rreturn=/\r/g,
rtype=/^(?:button|input)$/i,
rfocusable=/^(?:button|input|object|select|textarea)$/i,
rclickable=/^a(?:rea)?$/i,
rboolean=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
getSetAttribute=jQuery.support.getSetAttribute,
nodeHook,boolHook,fixSpecified;

jQuery.fn.extend({
attr:function(name,value){
return jQuery.access(this,jQuery.attr,name,value,arguments.length>1);
},

removeAttr:function(name){
return this.each(function(){
jQuery.removeAttr(this,name);
});
},

prop:function(name,value){
return jQuery.access(this,jQuery.prop,name,value,arguments.length>1);
},

removeProp:function(name){
name=jQuery.propFix[name]||name;
return this.each(function(){

try{
this[name]=undefined;
delete this[name];
}catch(e){}
});
},

addClass:function(value){
var classNames,i,l,elem,
setClass,c,cl;

if(jQuery.isFunction(value)){
return this.each(function(j){
jQuery(this).addClass(value.call(this,j,this.className));
});
}

if(value&&typeof value==="string"){
classNames=value.split(rspace);

for(i=0,l=this.length;i<l;i++){
elem=this[i];

if(elem.nodeType===1){
if(!elem.className&&classNames.length===1){
elem.className=value;

}else{
setClass=" "+elem.className+" ";

for(c=0,cl=classNames.length;c<cl;c++){
if(!~setClass.indexOf(" "+classNames[c]+" ")){
setClass+=classNames[c]+" ";
}
}
elem.className=jQuery.trim(setClass);
}
}
}
}

return this;
},

removeClass:function(value){
var classNames,i,l,elem,className,c,cl;

if(jQuery.isFunction(value)){
return this.each(function(j){
jQuery(this).removeClass(value.call(this,j,this.className));
});
}

if((value&&typeof value==="string")||value===undefined){
classNames=(value||"").split(rspace);

for(i=0,l=this.length;i<l;i++){
elem=this[i];

if(elem.nodeType===1&&elem.className){
if(value){
className=(" "+elem.className+" ").replace(rclass," ");
for(c=0,cl=classNames.length;c<cl;c++){
className=className.replace(" "+classNames[c]+" "," ");
}
elem.className=jQuery.trim(className);

}else{
elem.className="";
}
}
}
}

return this;
},

toggleClass:function(value,stateVal){
var type=typeof value,
isBool=typeof stateVal==="boolean";

if(jQuery.isFunction(value)){
return this.each(function(i){
jQuery(this).toggleClass(value.call(this,i,this.className,stateVal),stateVal);
});
}

return this.each(function(){
if(type==="string"){

var className,
i=0,
self=jQuery(this),
state=stateVal,
classNames=value.split(rspace);

while((className=classNames[i++])){

state=isBool?state:!self.hasClass(className);
self[state?"addClass":"removeClass"](className);
}

}else if(type==="undefined"||type==="boolean"){
if(this.className){

jQuery._data(this,"__className__",this.className);
}


this.className=this.className||value===false?"":jQuery._data(this,"__className__")||"";
}
});
},

hasClass:function(selector){
var className=" "+selector+" ",
i=0,
l=this.length;
for(;i<l;i++){
if(this[i].nodeType===1&&(" "+this[i].className+" ").replace(rclass," ").indexOf(className)>-1){
return true;
}
}

return false;
},

val:function(value){
var hooks,ret,isFunction,
elem=this[0];

if(!arguments.length){
if(elem){
hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];

if(hooks&&"get"in hooks&&(ret=hooks.get(elem,"value"))!==undefined){
return ret;
}

ret=elem.value;

return typeof ret==="string"?

ret.replace(rreturn,""):

ret==null?"":ret;
}

return;
}

isFunction=jQuery.isFunction(value);

return this.each(function(i){
var self=jQuery(this),val;

if(this.nodeType!==1){
return;
}

if(isFunction){
val=value.call(this,i,self.val());
}else{
val=value;
}


if(val==null){
val="";
}else if(typeof val==="number"){
val+="";
}else if(jQuery.isArray(val)){
val=jQuery.map(val,function(value){
return value==null?"":value+"";
});
}

hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()];


if(!hooks||!("set"in hooks)||hooks.set(this,val,"value")===undefined){
this.value=val;
}
});
}
});

jQuery.extend({
valHooks:{
option:{
get:function(elem){


var val=elem.attributes.value;
return!val||val.specified?elem.value:elem.text;
}
},
select:{
get:function(elem){
var value,i,max,option,
index=elem.selectedIndex,
values=[],
options=elem.options,
one=elem.type==="select-one";


if(index<0){
return null;
}


i=one?index:0;
max=one?index+1:options.length;
for(;i<max;i++){
option=options[i];


if(option.selected&&(jQuery.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&
(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){


value=jQuery(option).val();


if(one){
return value;
}


values.push(value);
}
}


if(one&&!values.length&&options.length){
return jQuery(options[index]).val();
}

return values;
},

set:function(elem,value){
var values=jQuery.makeArray(value);

jQuery(elem).find("option").each(function(){
this.selected=jQuery.inArray(jQuery(this).val(),values)>=0;
});

if(!values.length){
elem.selectedIndex=-1;
}
return values;
}
}
},

attrFn:{
val:true,
css:true,
html:true,
text:true,
data:true,
width:true,
height:true,
offset:true
},

attr:function(elem,name,value,pass){
var ret,hooks,notxml,
nType=elem.nodeType;


if(!elem||nType===3||nType===8||nType===2){
return;
}

if(pass&&name in jQuery.attrFn){
return jQuery(elem)[name](value);
}


if(typeof elem.getAttribute==="undefined"){
return jQuery.prop(elem,name,value);
}

notxml=nType!==1||!jQuery.isXMLDoc(elem);



if(notxml){
name=name.toLowerCase();
hooks=jQuery.attrHooks[name]||(rboolean.test(name)?boolHook:nodeHook);
}

if(value!==undefined){

if(value===null){
jQuery.removeAttr(elem,name);
return;

}else if(hooks&&"set"in hooks&&notxml&&(ret=hooks.set(elem,value,name))!==undefined){
return ret;

}else{
elem.setAttribute(name,""+value);
return value;
}

}else if(hooks&&"get"in hooks&&notxml&&(ret=hooks.get(elem,name))!==null){
return ret;

}else{

ret=elem.getAttribute(name);


return ret===null?
undefined:
ret;
}
},

removeAttr:function(elem,value){
var propName,attrNames,name,l,isBool,
i=0;

if(value&&elem.nodeType===1){
attrNames=value.toLowerCase().split(rspace);
l=attrNames.length;

for(;i<l;i++){
name=attrNames[i];

if(name){
propName=jQuery.propFix[name]||name;
isBool=rboolean.test(name);



if(!isBool){
jQuery.attr(elem,name,"");
}
elem.removeAttribute(getSetAttribute?name:propName);


if(isBool&&propName in elem){
elem[propName]=false;
}
}
}
}
},

attrHooks:{
type:{
set:function(elem,value){

if(rtype.test(elem.nodeName)&&elem.parentNode){
jQuery.error("type property can't be changed");
}else if(!jQuery.support.radioValue&&value==="radio"&&jQuery.nodeName(elem,"input")){



var val=elem.value;
elem.setAttribute("type",value);
if(val){
elem.value=val;
}
return value;
}
}
},


value:{
get:function(elem,name){
if(nodeHook&&jQuery.nodeName(elem,"button")){
return nodeHook.get(elem,name);
}
return name in elem?
elem.value:
null;
},
set:function(elem,value,name){
if(nodeHook&&jQuery.nodeName(elem,"button")){
return nodeHook.set(elem,value,name);
}

elem.value=value;
}
}
},

propFix:{
tabindex:"tabIndex",
readonly:"readOnly",
"for":"htmlFor",
"class":"className",
maxlength:"maxLength",
cellspacing:"cellSpacing",
cellpadding:"cellPadding",
rowspan:"rowSpan",
colspan:"colSpan",
usemap:"useMap",
frameborder:"frameBorder",
contenteditable:"contentEditable"
},

prop:function(elem,name,value){
var ret,hooks,notxml,
nType=elem.nodeType;


if(!elem||nType===3||nType===8||nType===2){
return;
}

notxml=nType!==1||!jQuery.isXMLDoc(elem);

if(notxml){

name=jQuery.propFix[name]||name;
hooks=jQuery.propHooks[name];
}

if(value!==undefined){
if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){
return ret;

}else{
return(elem[name]=value);
}

}else{
if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){
return ret;

}else{
return elem[name];
}
}
},

propHooks:{
tabIndex:{
get:function(elem){


var attributeNode=elem.getAttributeNode("tabindex");

return attributeNode&&attributeNode.specified?
parseInt(attributeNode.value,10):
rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?
0:
undefined;
}
}
}
});


jQuery.attrHooks.tabindex=jQuery.propHooks.tabIndex;


boolHook={
get:function(elem,name){


var attrNode,
property=jQuery.prop(elem,name);
return property===true||typeof property!=="boolean"&&(attrNode=elem.getAttributeNode(name))&&attrNode.nodeValue!==false?
name.toLowerCase():
undefined;
},
set:function(elem,value,name){
var propName;
if(value===false){

jQuery.removeAttr(elem,name);
}else{


propName=jQuery.propFix[name]||name;
if(propName in elem){

elem[propName]=true;
}

elem.setAttribute(name,name.toLowerCase());
}
return name;
}
};


if(!getSetAttribute){

fixSpecified={
name:true,
id:true,
coords:true
};



nodeHook=jQuery.valHooks.button={
get:function(elem,name){
var ret;
ret=elem.getAttributeNode(name);
return ret&&(fixSpecified[name]?ret.nodeValue!=="":ret.specified)?
ret.nodeValue:
undefined;
},
set:function(elem,value,name){

var ret=elem.getAttributeNode(name);
if(!ret){
ret=document.createAttribute(name);
elem.setAttributeNode(ret);
}
return(ret.nodeValue=value+"");
}
};


jQuery.attrHooks.tabindex.set=nodeHook.set;



jQuery.each(["width","height"],function(i,name){
jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{
set:function(elem,value){
if(value===""){
elem.setAttribute(name,"auto");
return value;
}
}
});
});



jQuery.attrHooks.contenteditable={
get:nodeHook.get,
set:function(elem,value,name){
if(value===""){
value="false";
}
nodeHook.set(elem,value,name);
}
};
}



if(!jQuery.support.hrefNormalized){
jQuery.each(["href","src","width","height"],function(i,name){
jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{
get:function(elem){
var ret=elem.getAttribute(name,2);
return ret===null?undefined:ret;
}
});
});
}

if(!jQuery.support.style){
jQuery.attrHooks.style={
get:function(elem){


return elem.style.cssText.toLowerCase()||undefined;
},
set:function(elem,value){
return(elem.style.cssText=""+value);
}
};
}



if(!jQuery.support.optSelected){
jQuery.propHooks.selected=jQuery.extend(jQuery.propHooks.selected,{
get:function(elem){
var parent=elem.parentNode;

if(parent){
parent.selectedIndex;


if(parent.parentNode){
parent.parentNode.selectedIndex;
}
}
return null;
}
});
}


if(!jQuery.support.enctype){
jQuery.propFix.enctype="encoding";
}


if(!jQuery.support.checkOn){
jQuery.each(["radio","checkbox"],function(){
jQuery.valHooks[this]={
get:function(elem){

return elem.getAttribute("value")===null?"on":elem.value;
}
};
});
}
jQuery.each(["radio","checkbox"],function(){
jQuery.valHooks[this]=jQuery.extend(jQuery.valHooks[this],{
set:function(elem,value){
if(jQuery.isArray(value)){
return(elem.checked=jQuery.inArray(jQuery(elem).val(),value)>=0);
}
}
});
});




var rformElems=/^(?:textarea|input|select)$/i,
rtypenamespace=/^([^\.]*)?(?:\.(.+))?$/,
rhoverHack=/(?:^|\s)hover(\.\S+)?\b/,
rkeyEvent=/^key/,
rmouseEvent=/^(?:mouse|contextmenu)|click/,
rfocusMorph=/^(?:focusinfocus|focusoutblur)$/,
rquickIs=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
quickParse=function(selector){
var quick=rquickIs.exec(selector);
if(quick){


quick[1]=(quick[1]||"").toLowerCase();
quick[3]=quick[3]&&new RegExp("(?:^|\\s)"+quick[3]+"(?:\\s|$)");
}
return quick;
},
quickIs=function(elem,m){
var attrs=elem.attributes||{};
return(
(!m[1]||elem.nodeName.toLowerCase()===m[1])&&
(!m[2]||(attrs.id||{}).value===m[2])&&
(!m[3]||m[3].test((attrs["class"]||{}).value))
);
},
hoverHack=function(events){
return jQuery.event.special.hover?events:events.replace(rhoverHack,"mouseenter$1 mouseleave$1");
};





jQuery.event={

add:function(elem,types,handler,data,selector){

var elemData,eventHandle,events,
t,tns,type,namespaces,handleObj,
handleObjIn,quick,handlers,special;


if(elem.nodeType===3||elem.nodeType===8||!types||!handler||!(elemData=jQuery._data(elem))){
return;
}


if(handler.handler){
handleObjIn=handler;
handler=handleObjIn.handler;
selector=handleObjIn.selector;
}


if(!handler.guid){
handler.guid=jQuery.guid++;
}


events=elemData.events;
if(!events){
elemData.events=events={};
}
eventHandle=elemData.handle;
if(!eventHandle){
elemData.handle=eventHandle=function(e){


return typeof jQuery!=="undefined"&&(!e||jQuery.event.triggered!==e.type)?
jQuery.event.dispatch.apply(eventHandle.elem,arguments):
undefined;
};

eventHandle.elem=elem;
}



types=jQuery.trim(hoverHack(types)).split(" ");
for(t=0;t<types.length;t++){

tns=rtypenamespace.exec(types[t])||[];
type=tns[1];
namespaces=(tns[2]||"").split(".").sort();


special=jQuery.event.special[type]||{};


type=(selector?special.delegateType:special.bindType)||type;


special=jQuery.event.special[type]||{};


handleObj=jQuery.extend({
type:type,
origType:tns[1],
data:data,
handler:handler,
guid:handler.guid,
selector:selector,
quick:selector&&quickParse(selector),
namespace:namespaces.join(".")
},handleObjIn);


handlers=events[type];
if(!handlers){
handlers=events[type]=[];
handlers.delegateCount=0;


if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){

if(elem.addEventListener){
elem.addEventListener(type,eventHandle,false);

}else if(elem.attachEvent){
elem.attachEvent("on"+type,eventHandle);
}
}
}

if(special.add){
special.add.call(elem,handleObj);

if(!handleObj.handler.guid){
handleObj.handler.guid=handler.guid;
}
}


if(selector){
handlers.splice(handlers.delegateCount++,0,handleObj);
}else{
handlers.push(handleObj);
}


jQuery.event.global[type]=true;
}


elem=null;
},

global:{},


remove:function(elem,types,handler,selector,mappedTypes){

var elemData=jQuery.hasData(elem)&&jQuery._data(elem),
t,tns,type,origType,namespaces,origCount,
j,events,special,handle,eventType,handleObj;

if(!elemData||!(events=elemData.events)){
return;
}


types=jQuery.trim(hoverHack(types||"")).split(" ");
for(t=0;t<types.length;t++){
tns=rtypenamespace.exec(types[t])||[];
type=origType=tns[1];
namespaces=tns[2];


if(!type){
for(type in events){
jQuery.event.remove(elem,type+types[t],handler,selector,true);
}
continue;
}

special=jQuery.event.special[type]||{};
type=(selector?special.delegateType:special.bindType)||type;
eventType=events[type]||[];
origCount=eventType.length;
namespaces=namespaces?new RegExp("(^|\\.)"+namespaces.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;


for(j=0;j<eventType.length;j++){
handleObj=eventType[j];

if((mappedTypes||origType===handleObj.origType)&&
(!handler||handler.guid===handleObj.guid)&&
(!namespaces||namespaces.test(handleObj.namespace))&&
(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){
eventType.splice(j--,1);

if(handleObj.selector){
eventType.delegateCount--;
}
if(special.remove){
special.remove.call(elem,handleObj);
}
}
}



if(eventType.length===0&&origCount!==eventType.length){
if(!special.teardown||special.teardown.call(elem,namespaces)===false){
jQuery.removeEvent(elem,type,elemData.handle);
}

delete events[type];
}
}


if(jQuery.isEmptyObject(events)){
handle=elemData.handle;
if(handle){
handle.elem=null;
}



jQuery.removeData(elem,["events","handle"],true);
}
},



customEvent:{
"getData":true,
"setData":true,
"changeData":true
},

trigger:function(event,data,elem,onlyHandlers){

if(elem&&(elem.nodeType===3||elem.nodeType===8)){
return;
}


var type=event.type||event,
namespaces=[],
cache,exclusive,i,cur,old,ontype,special,handle,eventPath,bubbleType;


if(rfocusMorph.test(type+jQuery.event.triggered)){
return;
}

if(type.indexOf("!")>=0){

type=type.slice(0,-1);
exclusive=true;
}

if(type.indexOf(".")>=0){

namespaces=type.split(".");
type=namespaces.shift();
namespaces.sort();
}

if((!elem||jQuery.event.customEvent[type])&&!jQuery.event.global[type]){

return;
}


event=typeof event==="object"?

event[jQuery.expando]?event:

new jQuery.Event(type,event):

new jQuery.Event(type);

event.type=type;
event.isTrigger=true;
event.exclusive=exclusive;
event.namespace=namespaces.join(".");
event.namespace_re=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.)?")+"(\\.|$)"):null;
ontype=type.indexOf(":")<0?"on"+type:"";


if(!elem){


cache=jQuery.cache;
for(i in cache){
if(cache[i].events&&cache[i].events[type]){
jQuery.event.trigger(event,data,cache[i].handle.elem,true);
}
}
return;
}


event.result=undefined;
if(!event.target){
event.target=elem;
}


data=data!=null?jQuery.makeArray(data):[];
data.unshift(event);


special=jQuery.event.special[type]||{};
if(special.trigger&&special.trigger.apply(elem,data)===false){
return;
}



eventPath=[[elem,special.bindType||type]];
if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){

bubbleType=special.delegateType||type;
cur=rfocusMorph.test(bubbleType+type)?elem:elem.parentNode;
old=null;
for(;cur;cur=cur.parentNode){
eventPath.push([cur,bubbleType]);
old=cur;
}


if(old&&old===elem.ownerDocument){
eventPath.push([old.defaultView||old.parentWindow||window,bubbleType]);
}
}


for(i=0;i<eventPath.length&&!event.isPropagationStopped();i++){

cur=eventPath[i][0];
event.type=eventPath[i][1];

handle=(jQuery._data(cur,"events")||{})[event.type]&&jQuery._data(cur,"handle");
if(handle){
handle.apply(cur,data);
}

handle=ontype&&cur[ontype];
if(handle&&jQuery.acceptData(cur)&&handle.apply(cur,data)===false){
event.preventDefault();
}
}
event.type=type;


if(!onlyHandlers&&!event.isDefaultPrevented()){

if((!special._default||special._default.apply(elem.ownerDocument,data)===false)&&
!(type==="click"&&jQuery.nodeName(elem,"a"))&&jQuery.acceptData(elem)){





if(ontype&&elem[type]&&((type!=="focus"&&type!=="blur")||event.target.offsetWidth!==0)&&!jQuery.isWindow(elem)){


old=elem[ontype];

if(old){
elem[ontype]=null;
}


jQuery.event.triggered=type;
elem[type]();
jQuery.event.triggered=undefined;

if(old){
elem[ontype]=old;
}
}
}
}

return event.result;
},

dispatch:function(event){


event=jQuery.event.fix(event||window.event);

var handlers=((jQuery._data(this,"events")||{})[event.type]||[]),
delegateCount=handlers.delegateCount,
args=[].slice.call(arguments,0),
run_all=!event.exclusive&&!event.namespace,
special=jQuery.event.special[event.type]||{},
handlerQueue=[],
i,j,cur,jqcur,ret,selMatch,matched,matches,handleObj,sel,related;


args[0]=event;
event.delegateTarget=this;


if(special.preDispatch&&special.preDispatch.call(this,event)===false){
return;
}



if(delegateCount&&!(event.button&&event.type==="click")){


jqcur=jQuery(this);
jqcur.context=this.ownerDocument||this;

for(cur=event.target;cur!=this;cur=cur.parentNode||this){


if(cur.disabled!==true){
selMatch={};
matches=[];
jqcur[0]=cur;
for(i=0;i<delegateCount;i++){
handleObj=handlers[i];
sel=handleObj.selector;

if(selMatch[sel]===undefined){
selMatch[sel]=(
handleObj.quick?quickIs(cur,handleObj.quick):jqcur.is(sel)
);
}
if(selMatch[sel]){
matches.push(handleObj);
}
}
if(matches.length){
handlerQueue.push({elem:cur,matches:matches});
}
}
}
}


if(handlers.length>delegateCount){
handlerQueue.push({elem:this,matches:handlers.slice(delegateCount)});
}


for(i=0;i<handlerQueue.length&&!event.isPropagationStopped();i++){
matched=handlerQueue[i];
event.currentTarget=matched.elem;

for(j=0;j<matched.matches.length&&!event.isImmediatePropagationStopped();j++){
handleObj=matched.matches[j];



if(run_all||(!event.namespace&&!handleObj.namespace)||event.namespace_re&&event.namespace_re.test(handleObj.namespace)){

event.data=handleObj.data;
event.handleObj=handleObj;

ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler)
.apply(matched.elem,args);

if(ret!==undefined){
event.result=ret;
if(ret===false){
event.preventDefault();
event.stopPropagation();
}
}
}
}
}


if(special.postDispatch){
special.postDispatch.call(this,event);
}

return event.result;
},



props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

fixHooks:{},

keyHooks:{
props:"char charCode key keyCode".split(" "),
filter:function(event,original){


if(event.which==null){
event.which=original.charCode!=null?original.charCode:original.keyCode;
}

return event;
}
},

mouseHooks:{
props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
filter:function(event,original){
var eventDoc,doc,body,
button=original.button,
fromElement=original.fromElement;


if(event.pageX==null&&original.clientX!=null){
eventDoc=event.target.ownerDocument||document;
doc=eventDoc.documentElement;
body=eventDoc.body;

event.pageX=original.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);
event.pageY=original.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0);
}


if(!event.relatedTarget&&fromElement){
event.relatedTarget=fromElement===event.target?original.toElement:fromElement;
}



if(!event.which&&button!==undefined){
event.which=(button&1?1:(button&2?3:(button&4?2:0)));
}

return event;
}
},

fix:function(event){
if(event[jQuery.expando]){
return event;
}


var i,prop,
originalEvent=event,
fixHook=jQuery.event.fixHooks[event.type]||{},
copy=fixHook.props?this.props.concat(fixHook.props):this.props;

event=jQuery.Event(originalEvent);

for(i=copy.length;i;){
prop=copy[--i];
event[prop]=originalEvent[prop];
}


if(!event.target){
event.target=originalEvent.srcElement||document;
}


if(event.target.nodeType===3){
event.target=event.target.parentNode;
}


if(event.metaKey===undefined){
event.metaKey=event.ctrlKey;
}

return fixHook.filter?fixHook.filter(event,originalEvent):event;
},

special:{
ready:{

setup:jQuery.bindReady
},

load:{

noBubble:true
},

focus:{
delegateType:"focusin"
},
blur:{
delegateType:"focusout"
},

beforeunload:{
setup:function(data,namespaces,eventHandle){

if(jQuery.isWindow(this)){
this.onbeforeunload=eventHandle;
}
},

teardown:function(namespaces,eventHandle){
if(this.onbeforeunload===eventHandle){
this.onbeforeunload=null;
}
}
}
},

simulate:function(type,elem,event,bubble){



var e=jQuery.extend(
new jQuery.Event(),
event,
{type:type,
isSimulated:true,
originalEvent:{}
}
);
if(bubble){
jQuery.event.trigger(e,null,elem);
}else{
jQuery.event.dispatch.call(elem,e);
}
if(e.isDefaultPrevented()){
event.preventDefault();
}
}
};



jQuery.event.handle=jQuery.event.dispatch;

jQuery.removeEvent=document.removeEventListener?
function(elem,type,handle){
if(elem.removeEventListener){
elem.removeEventListener(type,handle,false);
}
}:
function(elem,type,handle){
if(elem.detachEvent){
elem.detachEvent("on"+type,handle);
}
};

jQuery.Event=function(src,props){

if(!(this instanceof jQuery.Event)){
return new jQuery.Event(src,props);
}


if(src&&src.type){
this.originalEvent=src;
this.type=src.type;



this.isDefaultPrevented=(src.defaultPrevented||src.returnValue===false||
src.getPreventDefault&&src.getPreventDefault())?returnTrue:returnFalse;


}else{
this.type=src;
}


if(props){
jQuery.extend(this,props);
}


this.timeStamp=src&&src.timeStamp||jQuery.now();


this[jQuery.expando]=true;
};

function returnFalse(){
return false;
}
function returnTrue(){
return true;
}



jQuery.Event.prototype={
preventDefault:function(){
this.isDefaultPrevented=returnTrue;

var e=this.originalEvent;
if(!e){
return;
}


if(e.preventDefault){
e.preventDefault();


}else{
e.returnValue=false;
}
},
stopPropagation:function(){
this.isPropagationStopped=returnTrue;

var e=this.originalEvent;
if(!e){
return;
}

if(e.stopPropagation){
e.stopPropagation();
}

e.cancelBubble=true;
},
stopImmediatePropagation:function(){
this.isImmediatePropagationStopped=returnTrue;
this.stopPropagation();
},
isDefaultPrevented:returnFalse,
isPropagationStopped:returnFalse,
isImmediatePropagationStopped:returnFalse
};


jQuery.each({
mouseenter:"mouseover",
mouseleave:"mouseout"
},function(orig,fix){
jQuery.event.special[orig]={
delegateType:fix,
bindType:fix,

handle:function(event){
var target=this,
related=event.relatedTarget,
handleObj=event.handleObj,
selector=handleObj.selector,
ret;



if(!related||(related!==target&&!jQuery.contains(target,related))){
event.type=handleObj.origType;
ret=handleObj.handler.apply(this,arguments);
event.type=fix;
}
return ret;
}
};
});


if(!jQuery.support.submitBubbles){

jQuery.event.special.submit={
setup:function(){

if(jQuery.nodeName(this,"form")){
return false;
}


jQuery.event.add(this,"click._submit keypress._submit",function(e){

var elem=e.target,
form=jQuery.nodeName(elem,"input")||jQuery.nodeName(elem,"button")?elem.form:undefined;
if(form&&!form._submit_attached){
jQuery.event.add(form,"submit._submit",function(event){
event._submit_bubble=true;
});
form._submit_attached=true;
}
});

},

postDispatch:function(event){

if(event._submit_bubble){
delete event._submit_bubble;
if(this.parentNode&&!event.isTrigger){
jQuery.event.simulate("submit",this.parentNode,event,true);
}
}
},

teardown:function(){

if(jQuery.nodeName(this,"form")){
return false;
}


jQuery.event.remove(this,"._submit");
}
};
}


if(!jQuery.support.changeBubbles){

jQuery.event.special.change={

setup:function(){

if(rformElems.test(this.nodeName)){



if(this.type==="checkbox"||this.type==="radio"){
jQuery.event.add(this,"propertychange._change",function(event){
if(event.originalEvent.propertyName==="checked"){
this._just_changed=true;
}
});
jQuery.event.add(this,"click._change",function(event){
if(this._just_changed&&!event.isTrigger){
this._just_changed=false;
jQuery.event.simulate("change",this,event,true);
}
});
}
return false;
}

jQuery.event.add(this,"beforeactivate._change",function(e){
var elem=e.target;

if(rformElems.test(elem.nodeName)&&!elem._change_attached){
jQuery.event.add(elem,"change._change",function(event){
if(this.parentNode&&!event.isSimulated&&!event.isTrigger){
jQuery.event.simulate("change",this.parentNode,event,true);
}
});
elem._change_attached=true;
}
});
},

handle:function(event){
var elem=event.target;


if(this!==elem||event.isSimulated||event.isTrigger||(elem.type!=="radio"&&elem.type!=="checkbox")){
return event.handleObj.handler.apply(this,arguments);
}
},

teardown:function(){
jQuery.event.remove(this,"._change");

return rformElems.test(this.nodeName);
}
};
}


if(!jQuery.support.focusinBubbles){
jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){


var attaches=0,
handler=function(event){
jQuery.event.simulate(fix,event.target,jQuery.event.fix(event),true);
};

jQuery.event.special[fix]={
setup:function(){
if(attaches++===0){
document.addEventListener(orig,handler,true);
}
},
teardown:function(){
if(--attaches===0){
document.removeEventListener(orig,handler,true);
}
}
};
});
}

jQuery.fn.extend({

on:function(types,selector,data,fn,one){
var origFn,type;


if(typeof types==="object"){

if(typeof selector!=="string"){

data=data||selector;
selector=undefined;
}
for(type in types){
this.on(type,selector,data,types[type],one);
}
return this;
}

if(data==null&&fn==null){

fn=selector;
data=selector=undefined;
}else if(fn==null){
if(typeof selector==="string"){

fn=data;
data=undefined;
}else{

fn=data;
data=selector;
selector=undefined;
}
}
if(fn===false){
fn=returnFalse;
}else if(!fn){
return this;
}

if(one===1){
origFn=fn;
fn=function(event){

jQuery().off(event);
return origFn.apply(this,arguments);
};

fn.guid=origFn.guid||(origFn.guid=jQuery.guid++);
}
return this.each(function(){
jQuery.event.add(this,types,fn,data,selector);
});
},
one:function(types,selector,data,fn){
return this.on(types,selector,data,fn,1);
},
off:function(types,selector,fn){
if(types&&types.preventDefault&&types.handleObj){

var handleObj=types.handleObj;
jQuery(types.delegateTarget).off(
handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,
handleObj.selector,
handleObj.handler
);
return this;
}
if(typeof types==="object"){

for(var type in types){
this.off(type,selector,types[type]);
}
return this;
}
if(selector===false||typeof selector==="function"){

fn=selector;
selector=undefined;
}
if(fn===false){
fn=returnFalse;
}
return this.each(function(){
jQuery.event.remove(this,types,fn,selector);
});
},

bind:function(types,data,fn){
return this.on(types,null,data,fn);
},
unbind:function(types,fn){
return this.off(types,null,fn);
},

live:function(types,data,fn){
jQuery(this.context).on(types,this.selector,data,fn);
return this;
},
die:function(types,fn){
jQuery(this.context).off(types,this.selector||"**",fn);
return this;
},

delegate:function(selector,types,data,fn){
return this.on(types,selector,data,fn);
},
undelegate:function(selector,types,fn){

return arguments.length==1?this.off(selector,"**"):this.off(types,selector,fn);
},

trigger:function(type,data){
return this.each(function(){
jQuery.event.trigger(type,data,this);
});
},
triggerHandler:function(type,data){
if(this[0]){
return jQuery.event.trigger(type,data,this[0],true);
}
},

toggle:function(fn){

var args=arguments,
guid=fn.guid||jQuery.guid++,
i=0,
toggler=function(event){

var lastToggle=(jQuery._data(this,"lastToggle"+fn.guid)||0)%i;
jQuery._data(this,"lastToggle"+fn.guid,lastToggle+1);


event.preventDefault();


return args[lastToggle].apply(this,arguments)||false;
};


toggler.guid=guid;
while(i<args.length){
args[i++].guid=guid;
}

return this.click(toggler);
},

hover:function(fnOver,fnOut){
return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);
}
});

jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick "+
"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+
"change select submit keydown keypress keyup error contextmenu").split(" "),function(i,name){


jQuery.fn[name]=function(data,fn){
if(fn==null){
fn=data;
data=null;
}

return arguments.length>0?
this.on(name,null,data,fn):
this.trigger(name);
};

if(jQuery.attrFn){
jQuery.attrFn[name]=true;
}

if(rkeyEvent.test(name)){
jQuery.event.fixHooks[name]=jQuery.event.keyHooks;
}

if(rmouseEvent.test(name)){
jQuery.event.fixHooks[name]=jQuery.event.mouseHooks;
}
});


/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */

(function(){

var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
expando="sizcache"+(Math.random()+'').replace('.',''),
done=0,
toString=Object.prototype.toString,
hasDuplicate=false,
baseHasDuplicate=true,
rBackslash=/\\/g,
rReturn=/\r\n/g,
rNonWord=/\W/;





[0,0].sort(function(){
baseHasDuplicate=false;
return 0;
});

var Sizzle=function(selector,context,results,seed){
results=results||[];
context=context||document;

var origContext=context;

if(context.nodeType!==1&&context.nodeType!==9){
return[];
}

if(!selector||typeof selector!=="string"){
return results;
}

var m,set,checkSet,extra,ret,cur,pop,i,
prune=true,
contextXML=Sizzle.isXML(context),
parts=[],
soFar=selector;


do{
chunker.exec("");
m=chunker.exec(soFar);

if(m){
soFar=m[3];

parts.push(m[1]);

if(m[2]){
extra=m[3];
break;
}
}
}while(m);

if(parts.length>1&&origPOS.exec(selector)){

if(parts.length===2&&Expr.relative[parts[0]]){
set=posProcess(parts[0]+parts[1],context,seed);

}else{
set=Expr.relative[parts[0]]?
[context]:
Sizzle(parts.shift(),context);

while(parts.length){
selector=parts.shift();

if(Expr.relative[selector]){
selector+=parts.shift();
}

set=posProcess(selector,set,seed);
}
}

}else{


if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&
Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){

ret=Sizzle.find(parts.shift(),context,contextXML);
context=ret.expr?
Sizzle.filter(ret.expr,ret.set)[0]:
ret.set[0];
}

if(context){
ret=seed?
{expr:parts.pop(),set:makeArray(seed)}:
Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);

set=ret.expr?
Sizzle.filter(ret.expr,ret.set):
ret.set;

if(parts.length>0){
checkSet=makeArray(set);

}else{
prune=false;
}

while(parts.length){
cur=parts.pop();
pop=cur;

if(!Expr.relative[cur]){
cur="";
}else{
pop=parts.pop();
}

if(pop==null){
pop=context;
}

Expr.relative[cur](checkSet,pop,contextXML);
}

}else{
checkSet=parts=[];
}
}

if(!checkSet){
checkSet=set;
}

if(!checkSet){
Sizzle.error(cur||selector);
}

if(toString.call(checkSet)==="[object Array]"){
if(!prune){
results.push.apply(results,checkSet);

}else if(context&&context.nodeType===1){
for(i=0;checkSet[i]!=null;i++){
if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&Sizzle.contains(context,checkSet[i]))){
results.push(set[i]);
}
}

}else{
for(i=0;checkSet[i]!=null;i++){
if(checkSet[i]&&checkSet[i].nodeType===1){
results.push(set[i]);
}
}
}

}else{
makeArray(checkSet,results);
}

if(extra){
Sizzle(extra,origContext,results,seed);
Sizzle.uniqueSort(results);
}

return results;
};

Sizzle.uniqueSort=function(results){
if(sortOrder){
hasDuplicate=baseHasDuplicate;
results.sort(sortOrder);

if(hasDuplicate){
for(var i=1;i<results.length;i++){
if(results[i]===results[i-1]){
results.splice(i--,1);
}
}
}
}

return results;
};

Sizzle.matches=function(expr,set){
return Sizzle(expr,null,null,set);
};

Sizzle.matchesSelector=function(node,expr){
return Sizzle(expr,null,null,[node]).length>0;
};

Sizzle.find=function(expr,context,isXML){
var set,i,len,match,type,left;

if(!expr){
return[];
}

for(i=0,len=Expr.order.length;i<len;i++){
type=Expr.order[i];

if((match=Expr.leftMatch[type].exec(expr))){
left=match[1];
match.splice(1,1);

if(left.substr(left.length-1)!=="\\"){
match[1]=(match[1]||"").replace(rBackslash,"");
set=Expr.find[type](match,context,isXML);

if(set!=null){
expr=expr.replace(Expr.match[type],"");
break;
}
}
}
}

if(!set){
set=typeof context.getElementsByTagName!=="undefined"?
context.getElementsByTagName("*"):
[];
}

return{set:set,expr:expr};
};

Sizzle.filter=function(expr,set,inplace,not){
var match,anyFound,
type,found,item,filter,left,
i,pass,
old=expr,
result=[],
curLoop=set,
isXMLFilter=set&&set[0]&&Sizzle.isXML(set[0]);

while(expr&&set.length){
for(type in Expr.filter){
if((match=Expr.leftMatch[type].exec(expr))!=null&&match[2]){
filter=Expr.filter[type];
left=match[1];

anyFound=false;

match.splice(1,1);

if(left.substr(left.length-1)==="\\"){
continue;
}

if(curLoop===result){
result=[];
}

if(Expr.preFilter[type]){
match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);

if(!match){
anyFound=found=true;

}else if(match===true){
continue;
}
}

if(match){
for(i=0;(item=curLoop[i])!=null;i++){
if(item){
found=filter(item,match,i,curLoop);
pass=not^found;

if(inplace&&found!=null){
if(pass){
anyFound=true;

}else{
curLoop[i]=false;
}

}else if(pass){
result.push(item);
anyFound=true;
}
}
}
}

if(found!==undefined){
if(!inplace){
curLoop=result;
}

expr=expr.replace(Expr.match[type],"");

if(!anyFound){
return[];
}

break;
}
}
}


if(expr===old){
if(anyFound==null){
Sizzle.error(expr);

}else{
break;
}
}

old=expr;
}

return curLoop;
};

Sizzle.error=function(msg){
throw new Error("Syntax error, unrecognized expression: "+msg);
};





var getText=Sizzle.getText=function(elem){
var i,node,
nodeType=elem.nodeType,
ret="";

if(nodeType){
if(nodeType===1||nodeType===9||nodeType===11){

if(typeof elem.textContent==='string'){
return elem.textContent;
}else if(typeof elem.innerText==='string'){

return elem.innerText.replace(rReturn,'');
}else{

for(elem=elem.firstChild;elem;elem=elem.nextSibling){
ret+=getText(elem);
}
}
}else if(nodeType===3||nodeType===4){
return elem.nodeValue;
}
}else{


for(i=0;(node=elem[i]);i++){

if(node.nodeType!==8){
ret+=getText(node);
}
}
}
return ret;
};

var Expr=Sizzle.selectors={
order:["ID","NAME","TAG"],

match:{
ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
},

leftMatch:{},

attrMap:{
"class":"className",
"for":"htmlFor"
},

attrHandle:{
href:function(elem){
return elem.getAttribute("href");
},
type:function(elem){
return elem.getAttribute("type");
}
},

relative:{
"+":function(checkSet,part){
var isPartStr=typeof part==="string",
isTag=isPartStr&&!rNonWord.test(part),
isPartStrNotTag=isPartStr&&!isTag;

if(isTag){
part=part.toLowerCase();
}

for(var i=0,l=checkSet.length,elem;i<l;i++){
if((elem=checkSet[i])){
while((elem=elem.previousSibling)&&elem.nodeType!==1){}

checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?
elem||false:
elem===part;
}
}

if(isPartStrNotTag){
Sizzle.filter(part,checkSet,true);
}
},

">":function(checkSet,part){
var elem,
isPartStr=typeof part==="string",
i=0,
l=checkSet.length;

if(isPartStr&&!rNonWord.test(part)){
part=part.toLowerCase();

for(;i<l;i++){
elem=checkSet[i];

if(elem){
var parent=elem.parentNode;
checkSet[i]=parent.nodeName.toLowerCase()===part?parent:false;
}
}

}else{
for(;i<l;i++){
elem=checkSet[i];

if(elem){
checkSet[i]=isPartStr?
elem.parentNode:
elem.parentNode===part;
}
}

if(isPartStr){
Sizzle.filter(part,checkSet,true);
}
}
},

"":function(checkSet,part,isXML){
var nodeCheck,
doneName=done++,
checkFn=dirCheck;

if(typeof part==="string"&&!rNonWord.test(part)){
part=part.toLowerCase();
nodeCheck=part;
checkFn=dirNodeCheck;
}

checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);
},

"~":function(checkSet,part,isXML){
var nodeCheck,
doneName=done++,
checkFn=dirCheck;

if(typeof part==="string"&&!rNonWord.test(part)){
part=part.toLowerCase();
nodeCheck=part;
checkFn=dirNodeCheck;
}

checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);
}
},

find:{
ID:function(match,context,isXML){
if(typeof context.getElementById!=="undefined"&&!isXML){
var m=context.getElementById(match[1]);


return m&&m.parentNode?[m]:[];
}
},

NAME:function(match,context){
if(typeof context.getElementsByName!=="undefined"){
var ret=[],
results=context.getElementsByName(match[1]);

for(var i=0,l=results.length;i<l;i++){
if(results[i].getAttribute("name")===match[1]){
ret.push(results[i]);
}
}

return ret.length===0?null:ret;
}
},

TAG:function(match,context){
if(typeof context.getElementsByTagName!=="undefined"){
return context.getElementsByTagName(match[1]);
}
}
},
preFilter:{
CLASS:function(match,curLoop,inplace,result,not,isXML){
match=" "+match[1].replace(rBackslash,"")+" ";

if(isXML){
return match;
}

for(var i=0,elem;(elem=curLoop[i])!=null;i++){
if(elem){
if(not^(elem.className&&(" "+elem.className+" ").replace(/[\t\n\r]/g," ").indexOf(match)>=0)){
if(!inplace){
result.push(elem);
}

}else if(inplace){
curLoop[i]=false;
}
}
}

return false;
},

ID:function(match){
return match[1].replace(rBackslash,"");
},

TAG:function(match,curLoop){
return match[1].replace(rBackslash,"").toLowerCase();
},

CHILD:function(match){
if(match[1]==="nth"){
if(!match[2]){
Sizzle.error(match[0]);
}

match[2]=match[2].replace(/^\+|\s*/g,'');


var test=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||
!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);


match[2]=(test[1]+(test[2]||1))-0;
match[3]=test[3]-0;
}
else if(match[2]){
Sizzle.error(match[0]);
}


match[0]=done++;

return match;
},

ATTR:function(match,curLoop,inplace,result,not,isXML){
var name=match[1]=match[1].replace(rBackslash,"");

if(!isXML&&Expr.attrMap[name]){
match[1]=Expr.attrMap[name];
}


match[4]=(match[4]||match[5]||"").replace(rBackslash,"");

if(match[2]==="~="){
match[4]=" "+match[4]+" ";
}

return match;
},

PSEUDO:function(match,curLoop,inplace,result,not){
if(match[1]==="not"){

if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){
match[3]=Sizzle(match[3],null,null,curLoop);

}else{
var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);

if(!inplace){
result.push.apply(result,ret);
}

return false;
}

}else if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){
return true;
}

return match;
},

POS:function(match){
match.unshift(true);

return match;
}
},

filters:{
enabled:function(elem){
return elem.disabled===false&&elem.type!=="hidden";
},

disabled:function(elem){
return elem.disabled===true;
},

checked:function(elem){
return elem.checked===true;
},

selected:function(elem){


if(elem.parentNode){
elem.parentNode.selectedIndex;
}

return elem.selected===true;
},

parent:function(elem){
return!!elem.firstChild;
},

empty:function(elem){
return!elem.firstChild;
},

has:function(elem,i,match){
return!!Sizzle(match[3],elem).length;
},

header:function(elem){
return(/h\d/i).test(elem.nodeName);
},

text:function(elem){
var attr=elem.getAttribute("type"),type=elem.type;


return elem.nodeName.toLowerCase()==="input"&&"text"===type&&(attr===type||attr===null);
},

radio:function(elem){
return elem.nodeName.toLowerCase()==="input"&&"radio"===elem.type;
},

checkbox:function(elem){
return elem.nodeName.toLowerCase()==="input"&&"checkbox"===elem.type;
},

file:function(elem){
return elem.nodeName.toLowerCase()==="input"&&"file"===elem.type;
},

password:function(elem){
return elem.nodeName.toLowerCase()==="input"&&"password"===elem.type;
},

submit:function(elem){
var name=elem.nodeName.toLowerCase();
return(name==="input"||name==="button")&&"submit"===elem.type;
},

image:function(elem){
return elem.nodeName.toLowerCase()==="input"&&"image"===elem.type;
},

reset:function(elem){
var name=elem.nodeName.toLowerCase();
return(name==="input"||name==="button")&&"reset"===elem.type;
},

button:function(elem){
var name=elem.nodeName.toLowerCase();
return name==="input"&&"button"===elem.type||name==="button";
},

input:function(elem){
return(/input|select|textarea|button/i).test(elem.nodeName);
},

focus:function(elem){
return elem===elem.ownerDocument.activeElement;
}
},
setFilters:{
first:function(elem,i){
return i===0;
},

last:function(elem,i,match,array){
return i===array.length-1;
},

even:function(elem,i){
return i%2===0;
},

odd:function(elem,i){
return i%2===1;
},

lt:function(elem,i,match){
return i<match[3]-0;
},

gt:function(elem,i,match){
return i>match[3]-0;
},

nth:function(elem,i,match){
return match[3]-0===i;
},

eq:function(elem,i,match){
return match[3]-0===i;
}
},
filter:{
PSEUDO:function(elem,match,i,array){
var name=match[1],
filter=Expr.filters[name];

if(filter){
return filter(elem,i,match,array);

}else if(name==="contains"){
return(elem.textContent||elem.innerText||getText([elem])||"").indexOf(match[3])>=0;

}else if(name==="not"){
var not=match[3];

for(var j=0,l=not.length;j<l;j++){
if(not[j]===elem){
return false;
}
}

return true;

}else{
Sizzle.error(name);
}
},

CHILD:function(elem,match){
var first,last,
doneName,parent,cache,
count,diff,
type=match[1],
node=elem;

switch(type){
case"only":
case"first":
while((node=node.previousSibling)){
if(node.nodeType===1){
return false;
}
}

if(type==="first"){
return true;
}

node=elem;


case"last":
while((node=node.nextSibling)){
if(node.nodeType===1){
return false;
}
}

return true;

case"nth":
first=match[2];
last=match[3];

if(first===1&&last===0){
return true;
}

doneName=match[0];
parent=elem.parentNode;

if(parent&&(parent[expando]!==doneName||!elem.nodeIndex)){
count=0;

for(node=parent.firstChild;node;node=node.nextSibling){
if(node.nodeType===1){
node.nodeIndex=++count;
}
}

parent[expando]=doneName;
}

diff=elem.nodeIndex-last;

if(first===0){
return diff===0;

}else{
return(diff%first===0&&diff/first>=0);
}
}
},

ID:function(elem,match){
return elem.nodeType===1&&elem.getAttribute("id")===match;
},

TAG:function(elem,match){
return(match==="*"&&elem.nodeType===1)||!!elem.nodeName&&elem.nodeName.toLowerCase()===match;
},

CLASS:function(elem,match){
return(" "+(elem.className||elem.getAttribute("class"))+" ")
.indexOf(match)>-1;
},

ATTR:function(elem,match){
var name=match[1],
result=Sizzle.attr?
Sizzle.attr(elem,name):
Expr.attrHandle[name]?
Expr.attrHandle[name](elem):
elem[name]!=null?
elem[name]:
elem.getAttribute(name),
value=result+"",
type=match[2],
check=match[4];

return result==null?
type==="!=":
!type&&Sizzle.attr?
result!=null:
type==="="?
value===check:
type==="*="?
value.indexOf(check)>=0:
type==="~="?
(" "+value+" ").indexOf(check)>=0:
!check?
value&&result!==false:
type==="!="?
value!==check:
type==="^="?
value.indexOf(check)===0:
type==="$="?
value.substr(value.length-check.length)===check:
type==="|="?
value===check||value.substr(0,check.length+1)===check+"-":
false;
},

POS:function(elem,match,i,array){
var name=match[2],
filter=Expr.setFilters[name];

if(filter){
return filter(elem,i,match,array);
}
}
}
};

var origPOS=Expr.match.POS,
fescape=function(all,num){
return"\\"+(num-0+1);
};

for(var type in Expr.match){
Expr.match[type]=new RegExp(Expr.match[type].source+(/(?![^\[]*\])(?![^\(]*\))/.source));
Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source.replace(/\\(\d+)/g,fescape));
}


Expr.match.globalPOS=origPOS;

var makeArray=function(array,results){
array=Array.prototype.slice.call(array,0);

if(results){
results.push.apply(results,array);
return results;
}

return array;
};





try{
Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;


}catch(e){
makeArray=function(array,results){
var i=0,
ret=results||[];

if(toString.call(array)==="[object Array]"){
Array.prototype.push.apply(ret,array);

}else{
if(typeof array.length==="number"){
for(var l=array.length;i<l;i++){
ret.push(array[i]);
}

}else{
for(;array[i];i++){
ret.push(array[i]);
}
}
}

return ret;
};
}

var sortOrder,siblingCheck;

if(document.documentElement.compareDocumentPosition){
sortOrder=function(a,b){
if(a===b){
hasDuplicate=true;
return 0;
}

if(!a.compareDocumentPosition||!b.compareDocumentPosition){
return a.compareDocumentPosition?-1:1;
}

return a.compareDocumentPosition(b)&4?-1:1;
};

}else{
sortOrder=function(a,b){

if(a===b){
hasDuplicate=true;
return 0;


}else if(a.sourceIndex&&b.sourceIndex){
return a.sourceIndex-b.sourceIndex;
}

var al,bl,
ap=[],
bp=[],
aup=a.parentNode,
bup=b.parentNode,
cur=aup;


if(aup===bup){
return siblingCheck(a,b);


}else if(!aup){
return-1;

}else if(!bup){
return 1;
}



while(cur){
ap.unshift(cur);
cur=cur.parentNode;
}

cur=bup;

while(cur){
bp.unshift(cur);
cur=cur.parentNode;
}

al=ap.length;
bl=bp.length;


for(var i=0;i<al&&i<bl;i++){
if(ap[i]!==bp[i]){
return siblingCheck(ap[i],bp[i]);
}
}


return i===al?
siblingCheck(a,bp[i],-1):
siblingCheck(ap[i],b,1);
};

siblingCheck=function(a,b,ret){
if(a===b){
return ret;
}

var cur=a.nextSibling;

while(cur){
if(cur===b){
return-1;
}

cur=cur.nextSibling;
}

return 1;
};
}



(function(){

var form=document.createElement("div"),
id="script"+(new Date()).getTime(),
root=document.documentElement;

form.innerHTML="<a name='"+id+"'/>";


root.insertBefore(form,root.firstChild);



if(document.getElementById(id)){
Expr.find.ID=function(match,context,isXML){
if(typeof context.getElementById!=="undefined"&&!isXML){
var m=context.getElementById(match[1]);

return m?
m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?
[m]:
undefined:
[];
}
};

Expr.filter.ID=function(elem,match){
var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");

return elem.nodeType===1&&node&&node.nodeValue===match;
};
}

root.removeChild(form);


root=form=null;
})();

(function(){




var div=document.createElement("div");
div.appendChild(document.createComment(""));


if(div.getElementsByTagName("*").length>0){
Expr.find.TAG=function(match,context){
var results=context.getElementsByTagName(match[1]);


if(match[1]==="*"){
var tmp=[];

for(var i=0;results[i];i++){
if(results[i].nodeType===1){
tmp.push(results[i]);
}
}

results=tmp;
}

return results;
};
}


div.innerHTML="<a href='#'></a>";

if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&
div.firstChild.getAttribute("href")!=="#"){

Expr.attrHandle.href=function(elem){
return elem.getAttribute("href",2);
};
}


div=null;
})();

if(document.querySelectorAll){
(function(){
var oldSizzle=Sizzle,
div=document.createElement("div"),
id="__sizzle__";

div.innerHTML="<p class='TEST'></p>";



if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){
return;
}

Sizzle=function(query,context,extra,seed){
context=context||document;



if(!seed&&!Sizzle.isXML(context)){

var match=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);

if(match&&(context.nodeType===1||context.nodeType===9)){

if(match[1]){
return makeArray(context.getElementsByTagName(query),extra);


}else if(match[2]&&Expr.find.CLASS&&context.getElementsByClassName){
return makeArray(context.getElementsByClassName(match[2]),extra);
}
}

if(context.nodeType===9){


if(query==="body"&&context.body){
return makeArray([context.body],extra);


}else if(match&&match[3]){
var elem=context.getElementById(match[3]);



if(elem&&elem.parentNode){


if(elem.id===match[3]){
return makeArray([elem],extra);
}

}else{
return makeArray([],extra);
}
}

try{
return makeArray(context.querySelectorAll(query),extra);
}catch(qsaError){}





}else if(context.nodeType===1&&context.nodeName.toLowerCase()!=="object"){
var oldContext=context,
old=context.getAttribute("id"),
nid=old||id,
hasParent=context.parentNode,
relativeHierarchySelector=/^\s*[+~]/.test(query);

if(!old){
context.setAttribute("id",nid);
}else{
nid=nid.replace(/'/g,"\\$&");
}
if(relativeHierarchySelector&&hasParent){
context=context.parentNode;
}

try{
if(!relativeHierarchySelector||hasParent){
return makeArray(context.querySelectorAll("[id='"+nid+"'] "+query),extra);
}

}catch(pseudoError){
}finally{
if(!old){
oldContext.removeAttribute("id");
}
}
}
}

return oldSizzle(query,context,extra,seed);
};

for(var prop in oldSizzle){
Sizzle[prop]=oldSizzle[prop];
}


div=null;
})();
}

(function(){
var html=document.documentElement,
matches=html.matchesSelector||html.mozMatchesSelector||html.webkitMatchesSelector||html.msMatchesSelector;

if(matches){


var disconnectedMatch=!matches.call(document.createElement("div"),"div"),
pseudoWorks=false;

try{


matches.call(document.documentElement,"[test!='']:sizzle");

}catch(pseudoError){
pseudoWorks=true;
}

Sizzle.matchesSelector=function(node,expr){

expr=expr.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");

if(!Sizzle.isXML(node)){
try{
if(pseudoWorks||!Expr.match.PSEUDO.test(expr)&&!/!=/.test(expr)){
var ret=matches.call(node,expr);


if(ret||!disconnectedMatch||


node.document&&node.document.nodeType!==11){
return ret;
}
}
}catch(e){}
}

return Sizzle(expr,null,null,[node]).length>0;
};
}
})();

(function(){
var div=document.createElement("div");

div.innerHTML="<div class='test e'></div><div class='test'></div>";



if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){
return;
}


div.lastChild.className="e";

if(div.getElementsByClassName("e").length===1){
return;
}

Expr.order.splice(1,0,"CLASS");
Expr.find.CLASS=function(match,context,isXML){
if(typeof context.getElementsByClassName!=="undefined"&&!isXML){
return context.getElementsByClassName(match[1]);
}
};


div=null;
})();

function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){
for(var i=0,l=checkSet.length;i<l;i++){
var elem=checkSet[i];

if(elem){
var match=false;

elem=elem[dir];

while(elem){
if(elem[expando]===doneName){
match=checkSet[elem.sizset];
break;
}

if(elem.nodeType===1&&!isXML){
elem[expando]=doneName;
elem.sizset=i;
}

if(elem.nodeName.toLowerCase()===cur){
match=elem;
break;
}

elem=elem[dir];
}

checkSet[i]=match;
}
}
}

function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){
for(var i=0,l=checkSet.length;i<l;i++){
var elem=checkSet[i];

if(elem){
var match=false;

elem=elem[dir];

while(elem){
if(elem[expando]===doneName){
match=checkSet[elem.sizset];
break;
}

if(elem.nodeType===1){
if(!isXML){
elem[expando]=doneName;
elem.sizset=i;
}

if(typeof cur!=="string"){
if(elem===cur){
match=true;
break;
}

}else if(Sizzle.filter(cur,[elem]).length>0){
match=elem;
break;
}
}

elem=elem[dir];
}

checkSet[i]=match;
}
}
}

if(document.documentElement.contains){
Sizzle.contains=function(a,b){
return a!==b&&(a.contains?a.contains(b):true);
};

}else if(document.documentElement.compareDocumentPosition){
Sizzle.contains=function(a,b){
return!!(a.compareDocumentPosition(b)&16);
};

}else{
Sizzle.contains=function(){
return false;
};
}

Sizzle.isXML=function(elem){


var documentElement=(elem?elem.ownerDocument||elem:0).documentElement;

return documentElement?documentElement.nodeName!=="HTML":false;
};

var posProcess=function(selector,context,seed){
var match,
tmpSet=[],
later="",
root=context.nodeType?[context]:context;



while((match=Expr.match.PSEUDO.exec(selector))){
later+=match[0];
selector=selector.replace(Expr.match.PSEUDO,"");
}

selector=Expr.relative[selector]?selector+"*":selector;

for(var i=0,l=root.length;i<l;i++){
Sizzle(selector,root[i],tmpSet,seed);
}

return Sizzle.filter(later,tmpSet);
};



Sizzle.attr=jQuery.attr;
Sizzle.selectors.attrMap={};
jQuery.find=Sizzle;
jQuery.expr=Sizzle.selectors;
jQuery.expr[":"]=jQuery.expr.filters;
jQuery.unique=Sizzle.uniqueSort;
jQuery.text=Sizzle.getText;
jQuery.isXMLDoc=Sizzle.isXML;
jQuery.contains=Sizzle.contains;


})();


var runtil=/Until$/,
rparentsprev=/^(?:parents|prevUntil|prevAll)/,

rmultiselector=/,/,
isSimple=/^.[^:#\[\.,]*$/,
slice=Array.prototype.slice,
POS=jQuery.expr.match.globalPOS,

guaranteedUnique={
children:true,
contents:true,
next:true,
prev:true
};

jQuery.fn.extend({
find:function(selector){
var self=this,
i,l;

if(typeof selector!=="string"){
return jQuery(selector).filter(function(){
for(i=0,l=self.length;i<l;i++){
if(jQuery.contains(self[i],this)){
return true;
}
}
});
}

var ret=this.pushStack("","find",selector),
length,n,r;

for(i=0,l=this.length;i<l;i++){
length=ret.length;
jQuery.find(selector,this[i],ret);

if(i>0){

for(n=length;n<ret.length;n++){
for(r=0;r<length;r++){
if(ret[r]===ret[n]){
ret.splice(n--,1);
break;
}
}
}
}
}

return ret;
},

has:function(target){
var targets=jQuery(target);
return this.filter(function(){
for(var i=0,l=targets.length;i<l;i++){
if(jQuery.contains(this,targets[i])){
return true;
}
}
});
},

not:function(selector){
return this.pushStack(winnow(this,selector,false),"not",selector);
},

filter:function(selector){
return this.pushStack(winnow(this,selector,true),"filter",selector);
},

is:function(selector){
return!!selector&&(
typeof selector==="string"?


POS.test(selector)?
jQuery(selector,this.context).index(this[0])>=0:
jQuery.filter(selector,this).length>0:
this.filter(selector).length>0);
},

closest:function(selectors,context){
var ret=[],i,l,cur=this[0];


if(jQuery.isArray(selectors)){
var level=1;

while(cur&&cur.ownerDocument&&cur!==context){
for(i=0;i<selectors.length;i++){

if(jQuery(cur).is(selectors[i])){
ret.push({selector:selectors[i],elem:cur,level:level});
}
}

cur=cur.parentNode;
level++;
}

return ret;
}


var pos=POS.test(selectors)||typeof selectors!=="string"?
jQuery(selectors,context||this.context):
0;

for(i=0,l=this.length;i<l;i++){
cur=this[i];

while(cur){
if(pos?pos.index(cur)>-1:jQuery.find.matchesSelector(cur,selectors)){
ret.push(cur);
break;

}else{
cur=cur.parentNode;
if(!cur||!cur.ownerDocument||cur===context||cur.nodeType===11){
break;
}
}
}
}

ret=ret.length>1?jQuery.unique(ret):ret;

return this.pushStack(ret,"closest",selectors);
},



index:function(elem){


if(!elem){
return(this[0]&&this[0].parentNode)?this.prevAll().length:-1;
}


if(typeof elem==="string"){
return jQuery.inArray(this[0],jQuery(elem));
}


return jQuery.inArray(

elem.jquery?elem[0]:elem,this);
},

add:function(selector,context){
var set=typeof selector==="string"?
jQuery(selector,context):
jQuery.makeArray(selector&&selector.nodeType?[selector]:selector),
all=jQuery.merge(this.get(),set);

return this.pushStack(isDisconnected(set[0])||isDisconnected(all[0])?
all:
jQuery.unique(all));
},

andSelf:function(){
return this.add(this.prevObject);
}
});



function isDisconnected(node){
return!node||!node.parentNode||node.parentNode.nodeType===11;
}

jQuery.each({
parent:function(elem){
var parent=elem.parentNode;
return parent&&parent.nodeType!==11?parent:null;
},
parents:function(elem){
return jQuery.dir(elem,"parentNode");
},
parentsUntil:function(elem,i,until){
return jQuery.dir(elem,"parentNode",until);
},
next:function(elem){
return jQuery.nth(elem,2,"nextSibling");
},
prev:function(elem){
return jQuery.nth(elem,2,"previousSibling");
},
nextAll:function(elem){
return jQuery.dir(elem,"nextSibling");
},
prevAll:function(elem){
return jQuery.dir(elem,"previousSibling");
},
nextUntil:function(elem,i,until){
return jQuery.dir(elem,"nextSibling",until);
},
prevUntil:function(elem,i,until){
return jQuery.dir(elem,"previousSibling",until);
},
siblings:function(elem){
return jQuery.sibling((elem.parentNode||{}).firstChild,elem);
},
children:function(elem){
return jQuery.sibling(elem.firstChild);
},
contents:function(elem){
return jQuery.nodeName(elem,"iframe")?
elem.contentDocument||elem.contentWindow.document:
jQuery.makeArray(elem.childNodes);
}
},function(name,fn){
jQuery.fn[name]=function(until,selector){
var ret=jQuery.map(this,fn,until);

if(!runtil.test(name)){
selector=until;
}

if(selector&&typeof selector==="string"){
ret=jQuery.filter(selector,ret);
}

ret=this.length>1&&!guaranteedUnique[name]?jQuery.unique(ret):ret;

if((this.length>1||rmultiselector.test(selector))&&rparentsprev.test(name)){
ret=ret.reverse();
}

return this.pushStack(ret,name,slice.call(arguments).join(","));
};
});

jQuery.extend({
filter:function(expr,elems,not){
if(not){
expr=":not("+expr+")";
}

return elems.length===1?
jQuery.find.matchesSelector(elems[0],expr)?[elems[0]]:[]:
jQuery.find.matches(expr,elems);
},

dir:function(elem,dir,until){
var matched=[],
cur=elem[dir];

while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){
if(cur.nodeType===1){
matched.push(cur);
}
cur=cur[dir];
}
return matched;
},

nth:function(cur,result,dir,elem){
result=result||1;
var num=0;

for(;cur;cur=cur[dir]){
if(cur.nodeType===1&&++num===result){
break;
}
}

return cur;
},

sibling:function(n,elem){
var r=[];

for(;n;n=n.nextSibling){
if(n.nodeType===1&&n!==elem){
r.push(n);
}
}

return r;
}
});


function winnow(elements,qualifier,keep){



qualifier=qualifier||0;

if(jQuery.isFunction(qualifier)){
return jQuery.grep(elements,function(elem,i){
var retVal=!!qualifier.call(elem,i,elem);
return retVal===keep;
});

}else if(qualifier.nodeType){
return jQuery.grep(elements,function(elem,i){
return(elem===qualifier)===keep;
});

}else if(typeof qualifier==="string"){
var filtered=jQuery.grep(elements,function(elem){
return elem.nodeType===1;
});

if(isSimple.test(qualifier)){
return jQuery.filter(qualifier,filtered,!keep);
}else{
qualifier=jQuery.filter(qualifier,filtered);
}
}

return jQuery.grep(elements,function(elem,i){
return(jQuery.inArray(elem,qualifier)>=0)===keep;
});
}




function createSafeFragment(document){
var list=nodeNames.split("|"),
safeFrag=document.createDocumentFragment();

if(safeFrag.createElement){
while(list.length){
safeFrag.createElement(
list.pop()
);
}
}
return safeFrag;
}

var nodeNames="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|"+
"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
rinlinejQuery=/ jQuery\d+="(?:\d+|null)"/g,
rleadingWhitespace=/^\s+/,
rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
rtagName=/<([\w:]+)/,
rtbody=/<tbody/i,
rhtml=/<|&#?\w+;/,
rnoInnerhtml=/<(?:script|style)/i,
rnocache=/<(?:script|object|embed|option|style)/i,
rnoshimcache=new RegExp("<(?:"+nodeNames+")[\\s/>]","i"),

rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,
rscriptType=/\/(java|ecma)script/i,
rcleanScript=/^\s*<!(?:\[CDATA\[|\-\-)/,
wrapMap={
option:[1,"<select multiple='multiple'>","</select>"],
legend:[1,"<fieldset>","</fieldset>"],
thead:[1,"<table>","</table>"],
tr:[2,"<table><tbody>","</tbody></table>"],
td:[3,"<table><tbody><tr>","</tr></tbody></table>"],
col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],
area:[1,"<map>","</map>"],
_default:[0,"",""]
},
safeFragment=createSafeFragment(document);

wrapMap.optgroup=wrapMap.option;
wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;
wrapMap.th=wrapMap.td;


if(!jQuery.support.htmlSerialize){
wrapMap._default=[1,"div<div>","</div>"];
}

jQuery.fn.extend({
text:function(value){
return jQuery.access(this,function(value){
return value===undefined?
jQuery.text(this):
this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(value));
},null,value,arguments.length);
},

wrapAll:function(html){
if(jQuery.isFunction(html)){
return this.each(function(i){
jQuery(this).wrapAll(html.call(this,i));
});
}

if(this[0]){

var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);

if(this[0].parentNode){
wrap.insertBefore(this[0]);
}

wrap.map(function(){
var elem=this;

while(elem.firstChild&&elem.firstChild.nodeType===1){
elem=elem.firstChild;
}

return elem;
}).append(this);
}

return this;
},

wrapInner:function(html){
if(jQuery.isFunction(html)){
return this.each(function(i){
jQuery(this).wrapInner(html.call(this,i));
});
}

return this.each(function(){
var self=jQuery(this),
contents=self.contents();

if(contents.length){
contents.wrapAll(html);

}else{
self.append(html);
}
});
},

wrap:function(html){
var isFunction=jQuery.isFunction(html);

return this.each(function(i){
jQuery(this).wrapAll(isFunction?html.call(this,i):html);
});
},

unwrap:function(){
return this.parent().each(function(){
if(!jQuery.nodeName(this,"body")){
jQuery(this).replaceWith(this.childNodes);
}
}).end();
},

append:function(){
return this.domManip(arguments,true,function(elem){
if(this.nodeType===1){
this.appendChild(elem);
}
});
},

prepend:function(){
return this.domManip(arguments,true,function(elem){
if(this.nodeType===1){
this.insertBefore(elem,this.firstChild);
}
});
},

before:function(){
if(this[0]&&this[0].parentNode){
return this.domManip(arguments,false,function(elem){
this.parentNode.insertBefore(elem,this);
});
}else if(arguments.length){
var set=jQuery.clean(arguments);
set.push.apply(set,this.toArray());
return this.pushStack(set,"before",arguments);
}
},

after:function(){
if(this[0]&&this[0].parentNode){
return this.domManip(arguments,false,function(elem){
this.parentNode.insertBefore(elem,this.nextSibling);
});
}else if(arguments.length){
var set=this.pushStack(this,"after",arguments);
set.push.apply(set,jQuery.clean(arguments));
return set;
}
},


remove:function(selector,keepData){
for(var i=0,elem;(elem=this[i])!=null;i++){
if(!selector||jQuery.filter(selector,[elem]).length){
if(!keepData&&elem.nodeType===1){
jQuery.cleanData(elem.getElementsByTagName("*"));
jQuery.cleanData([elem]);
}

if(elem.parentNode){
elem.parentNode.removeChild(elem);
}
}
}

return this;
},

empty:function(){
for(var i=0,elem;(elem=this[i])!=null;i++){

if(elem.nodeType===1){
jQuery.cleanData(elem.getElementsByTagName("*"));
}


while(elem.firstChild){
elem.removeChild(elem.firstChild);
}
}

return this;
},

clone:function(dataAndEvents,deepDataAndEvents){
dataAndEvents=dataAndEvents==null?false:dataAndEvents;
deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;

return this.map(function(){
return jQuery.clone(this,dataAndEvents,deepDataAndEvents);
});
},

html:function(value){
return jQuery.access(this,function(value){
var elem=this[0]||{},
i=0,
l=this.length;

if(value===undefined){
return elem.nodeType===1?
elem.innerHTML.replace(rinlinejQuery,""):
null;
}


if(typeof value==="string"&&!rnoInnerhtml.test(value)&&
(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&
!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){

value=value.replace(rxhtmlTag,"<$1></$2>");

try{
for(;i<l;i++){

elem=this[i]||{};
if(elem.nodeType===1){
jQuery.cleanData(elem.getElementsByTagName("*"));
elem.innerHTML=value;
}
}

elem=0;


}catch(e){}
}

if(elem){
this.empty().append(value);
}
},null,value,arguments.length);
},

replaceWith:function(value){
if(this[0]&&this[0].parentNode){


if(jQuery.isFunction(value)){
return this.each(function(i){
var self=jQuery(this),old=self.html();
self.replaceWith(value.call(this,i,old));
});
}

if(typeof value!=="string"){
value=jQuery(value).detach();
}

return this.each(function(){
var next=this.nextSibling,
parent=this.parentNode;

jQuery(this).remove();

if(next){
jQuery(next).before(value);
}else{
jQuery(parent).append(value);
}
});
}else{
return this.length?
this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value):
this;
}
},

detach:function(selector){
return this.remove(selector,true);
},

domManip:function(args,table,callback){
var results,first,fragment,parent,
value=args[0],
scripts=[];


if(!jQuery.support.checkClone&&arguments.length===3&&typeof value==="string"&&rchecked.test(value)){
return this.each(function(){
jQuery(this).domManip(args,table,callback,true);
});
}

if(jQuery.isFunction(value)){
return this.each(function(i){
var self=jQuery(this);
args[0]=value.call(this,i,table?self.html():undefined);
self.domManip(args,table,callback);
});
}

if(this[0]){
parent=value&&value.parentNode;


if(jQuery.support.parentNode&&parent&&parent.nodeType===11&&parent.childNodes.length===this.length){
results={fragment:parent};

}else{
results=jQuery.buildFragment(args,this,scripts);
}

fragment=results.fragment;

if(fragment.childNodes.length===1){
first=fragment=fragment.firstChild;
}else{
first=fragment.firstChild;
}

if(first){
table=table&&jQuery.nodeName(first,"tr");

for(var i=0,l=this.length,lastIndex=l-1;i<l;i++){
callback.call(
table?
root(this[i],first):
this[i],







results.cacheable||(l>1&&i<lastIndex)?
jQuery.clone(fragment,true,true):
fragment
);
}
}

if(scripts.length){
jQuery.each(scripts,function(i,elem){
if(elem.src){
jQuery.ajax({
type:"GET",
global:false,
url:elem.src,
async:false,
dataType:"script"
});
}else{
jQuery.globalEval((elem.text||elem.textContent||elem.innerHTML||"").replace(rcleanScript,"/*$0*/"));
}

if(elem.parentNode){
elem.parentNode.removeChild(elem);
}
});
}
}

return this;
}
});

function root(elem,cur){
return jQuery.nodeName(elem,"table")?
(elem.getElementsByTagName("tbody")[0]||
elem.appendChild(elem.ownerDocument.createElement("tbody"))):
elem;
}

function cloneCopyEvent(src,dest){

if(dest.nodeType!==1||!jQuery.hasData(src)){
return;
}

var type,i,l,
oldData=jQuery._data(src),
curData=jQuery._data(dest,oldData),
events=oldData.events;

if(events){
delete curData.handle;
curData.events={};

for(type in events){
for(i=0,l=events[type].length;i<l;i++){
jQuery.event.add(dest,type,events[type][i]);
}
}
}


if(curData.data){
curData.data=jQuery.extend({},curData.data);
}
}

function cloneFixAttributes(src,dest){
var nodeName;


if(dest.nodeType!==1){
return;
}



if(dest.clearAttributes){
dest.clearAttributes();
}



if(dest.mergeAttributes){
dest.mergeAttributes(src);
}

nodeName=dest.nodeName.toLowerCase();




if(nodeName==="object"){
dest.outerHTML=src.outerHTML;

}else if(nodeName==="input"&&(src.type==="checkbox"||src.type==="radio")){



if(src.checked){
dest.defaultChecked=dest.checked=src.checked;
}



if(dest.value!==src.value){
dest.value=src.value;
}



}else if(nodeName==="option"){
dest.selected=src.defaultSelected;



}else if(nodeName==="input"||nodeName==="textarea"){
dest.defaultValue=src.defaultValue;


}else if(nodeName==="script"&&dest.text!==src.text){
dest.text=src.text;
}



dest.removeAttribute(jQuery.expando);



dest.removeAttribute("_submit_attached");
dest.removeAttribute("_change_attached");
}

jQuery.buildFragment=function(args,nodes,scripts){
var fragment,cacheable,cacheresults,doc,
first=args[0];




if(nodes&&nodes[0]){
doc=nodes[0].ownerDocument||nodes[0];
}




if(!doc.createDocumentFragment){
doc=document;
}






if(args.length===1&&typeof first==="string"&&first.length<512&&doc===document&&
first.charAt(0)==="<"&&!rnocache.test(first)&&
(jQuery.support.checkClone||!rchecked.test(first))&&
(jQuery.support.html5Clone||!rnoshimcache.test(first))){

cacheable=true;

cacheresults=jQuery.fragments[first];
if(cacheresults&&cacheresults!==1){
fragment=cacheresults;
}
}

if(!fragment){
fragment=doc.createDocumentFragment();
jQuery.clean(args,doc,fragment,scripts);
}

if(cacheable){
jQuery.fragments[first]=cacheresults?fragment:1;
}

return{fragment:fragment,cacheable:cacheable};
};

jQuery.fragments={};

jQuery.each({
appendTo:"append",
prependTo:"prepend",
insertBefore:"before",
insertAfter:"after",
replaceAll:"replaceWith"
},function(name,original){
jQuery.fn[name]=function(selector){
var ret=[],
insert=jQuery(selector),
parent=this.length===1&&this[0].parentNode;

if(parent&&parent.nodeType===11&&parent.childNodes.length===1&&insert.length===1){
insert[original](this[0]);
return this;

}else{
for(var i=0,l=insert.length;i<l;i++){
var elems=(i>0?this.clone(true):this).get();
jQuery(insert[i])[original](elems);
ret=ret.concat(elems);
}

return this.pushStack(ret,name,insert.selector);
}
};
});

function getAll(elem){
if(typeof elem.getElementsByTagName!=="undefined"){
return elem.getElementsByTagName("*");

}else if(typeof elem.querySelectorAll!=="undefined"){
return elem.querySelectorAll("*");

}else{
return[];
}
}


function fixDefaultChecked(elem){
if(elem.type==="checkbox"||elem.type==="radio"){
elem.defaultChecked=elem.checked;
}
}

function findInputs(elem){
var nodeName=(elem.nodeName||"").toLowerCase();
if(nodeName==="input"){
fixDefaultChecked(elem);

}else if(nodeName!=="script"&&typeof elem.getElementsByTagName!=="undefined"){
jQuery.grep(elem.getElementsByTagName("input"),fixDefaultChecked);
}
}


function shimCloneNode(elem){
var div=document.createElement("div");
safeFragment.appendChild(div);

div.innerHTML=elem.outerHTML;
return div.firstChild;
}

jQuery.extend({
clone:function(elem,dataAndEvents,deepDataAndEvents){
var srcElements,
destElements,
i,

clone=jQuery.support.html5Clone||jQuery.isXMLDoc(elem)||!rnoshimcache.test("<"+elem.nodeName+">")?
elem.cloneNode(true):
shimCloneNode(elem);

if((!jQuery.support.noCloneEvent||!jQuery.support.noCloneChecked)&&
(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){






cloneFixAttributes(elem,clone);


srcElements=getAll(elem);
destElements=getAll(clone);




for(i=0;srcElements[i];++i){

if(destElements[i]){
cloneFixAttributes(srcElements[i],destElements[i]);
}
}
}


if(dataAndEvents){
cloneCopyEvent(elem,clone);

if(deepDataAndEvents){
srcElements=getAll(elem);
destElements=getAll(clone);

for(i=0;srcElements[i];++i){
cloneCopyEvent(srcElements[i],destElements[i]);
}
}
}

srcElements=destElements=null;


return clone;
},

clean:function(elems,context,fragment,scripts){
var checkScriptType,script,j,
ret=[];

context=context||document;


if(typeof context.createElement==="undefined"){
context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;
}

for(var i=0,elem;(elem=elems[i])!=null;i++){
if(typeof elem==="number"){
elem+="";
}

if(!elem){
continue;
}


if(typeof elem==="string"){
if(!rhtml.test(elem)){
elem=context.createTextNode(elem);
}else{

elem=elem.replace(rxhtmlTag,"<$1></$2>");


var tag=(rtagName.exec(elem)||["",""])[1].toLowerCase(),
wrap=wrapMap[tag]||wrapMap._default,
depth=wrap[0],
div=context.createElement("div"),
safeChildNodes=safeFragment.childNodes,
remove;


if(context===document){

safeFragment.appendChild(div);
}else{

createSafeFragment(context).appendChild(div);
}


div.innerHTML=wrap[1]+elem+wrap[2];


while(depth--){
div=div.lastChild;
}


if(!jQuery.support.tbody){


var hasBody=rtbody.test(elem),
tbody=tag==="table"&&!hasBody?
div.firstChild&&div.firstChild.childNodes:


wrap[1]==="<table>"&&!hasBody?
div.childNodes:
[];

for(j=tbody.length-1;j>=0;--j){
if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){
tbody[j].parentNode.removeChild(tbody[j]);
}
}
}


if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){
div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild);
}

elem=div.childNodes;



if(div){
div.parentNode.removeChild(div);


if(safeChildNodes.length>0){
remove=safeChildNodes[safeChildNodes.length-1];

if(remove&&remove.parentNode){
remove.parentNode.removeChild(remove);
}
}
}
}
}



var len;
if(!jQuery.support.appendChecked){
if(elem[0]&&typeof(len=elem.length)==="number"){
for(j=0;j<len;j++){
findInputs(elem[j]);
}
}else{
findInputs(elem);
}
}

if(elem.nodeType){
ret.push(elem);
}else{
ret=jQuery.merge(ret,elem);
}
}

if(fragment){
checkScriptType=function(elem){
return!elem.type||rscriptType.test(elem.type);
};
for(i=0;ret[i];i++){
script=ret[i];
if(scripts&&jQuery.nodeName(script,"script")&&(!script.type||rscriptType.test(script.type))){
scripts.push(script.parentNode?script.parentNode.removeChild(script):script);

}else{
if(script.nodeType===1){
var jsTags=jQuery.grep(script.getElementsByTagName("script"),checkScriptType);

ret.splice.apply(ret,[i+1,0].concat(jsTags));
}
fragment.appendChild(script);
}
}
}

return ret;
},

cleanData:function(elems){
var data,id,
cache=jQuery.cache,
special=jQuery.event.special,
deleteExpando=jQuery.support.deleteExpando;

for(var i=0,elem;(elem=elems[i])!=null;i++){
if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){
continue;
}

id=elem[jQuery.expando];

if(id){
data=cache[id];

if(data&&data.events){
for(var type in data.events){
if(special[type]){
jQuery.event.remove(elem,type);


}else{
jQuery.removeEvent(elem,type,data.handle);
}
}


if(data.handle){
data.handle.elem=null;
}
}

if(deleteExpando){
delete elem[jQuery.expando];

}else if(elem.removeAttribute){
elem.removeAttribute(jQuery.expando);
}

delete cache[id];
}
}
}
});




var ralpha=/alpha\([^)]*\)/i,
ropacity=/opacity=([^)]*)/,

rupper=/([A-Z]|^ms)/g,
rnum=/^[\-+]?(?:\d*\.)?\d+$/i,
rnumnonpx=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
rrelNum=/^([\-+])=([\-+.\de]+)/,
rmargin=/^margin/,

cssShow={position:"absolute",visibility:"hidden",display:"block"},


cssExpand=["Top","Right","Bottom","Left"],

curCSS,

getComputedStyle,
currentStyle;

jQuery.fn.css=function(name,value){
return jQuery.access(this,function(elem,name,value){
return value!==undefined?
jQuery.style(elem,name,value):
jQuery.css(elem,name);
},name,value,arguments.length>1);
};

jQuery.extend({


cssHooks:{
opacity:{
get:function(elem,computed){
if(computed){

var ret=curCSS(elem,"opacity");
return ret===""?"1":ret;

}else{
return elem.style.opacity;
}
}
}
},


cssNumber:{
"fillOpacity":true,
"fontWeight":true,
"lineHeight":true,
"opacity":true,
"orphans":true,
"widows":true,
"zIndex":true,
"zoom":true
},



cssProps:{

"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"
},


style:function(elem,name,value,extra){

if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){
return;
}


var ret,type,origName=jQuery.camelCase(name),
style=elem.style,hooks=jQuery.cssHooks[origName];

name=jQuery.cssProps[origName]||origName;


if(value!==undefined){
type=typeof value;


if(type==="string"&&(ret=rrelNum.exec(value))){
value=(+(ret[1]+1)*+ret[2])+parseFloat(jQuery.css(elem,name));

type="number";
}


if(value==null||type==="number"&&isNaN(value)){
return;
}


if(type==="number"&&!jQuery.cssNumber[origName]){
value+="px";
}


if(!hooks||!("set"in hooks)||(value=hooks.set(elem,value))!==undefined){


try{
style[name]=value;
}catch(e){}
}

}else{

if(hooks&&"get"in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){
return ret;
}


return style[name];
}
},

css:function(elem,name,extra){
var ret,hooks;


name=jQuery.camelCase(name);
hooks=jQuery.cssHooks[name];
name=jQuery.cssProps[name]||name;


if(name==="cssFloat"){
name="float";
}


if(hooks&&"get"in hooks&&(ret=hooks.get(elem,true,extra))!==undefined){
return ret;


}else if(curCSS){
return curCSS(elem,name);
}
},


swap:function(elem,options,callback){
var old={},
ret,name;


for(name in options){
old[name]=elem.style[name];
elem.style[name]=options[name];
}

ret=callback.call(elem);


for(name in options){
elem.style[name]=old[name];
}

return ret;
}
});


jQuery.curCSS=jQuery.css;

if(document.defaultView&&document.defaultView.getComputedStyle){
getComputedStyle=function(elem,name){
var ret,defaultView,computedStyle,width,
style=elem.style;

name=name.replace(rupper,"-$1").toLowerCase();

if((defaultView=elem.ownerDocument.defaultView)&&
(computedStyle=defaultView.getComputedStyle(elem,null))){

ret=computedStyle.getPropertyValue(name);
if(ret===""&&!jQuery.contains(elem.ownerDocument.documentElement,elem)){
ret=jQuery.style(elem,name);
}
}




if(!jQuery.support.pixelMargin&&computedStyle&&rmargin.test(name)&&rnumnonpx.test(ret)){
width=style.width;
style.width=ret;
ret=computedStyle.width;
style.width=width;
}

return ret;
};
}

if(document.documentElement.currentStyle){
currentStyle=function(elem,name){
var left,rsLeft,uncomputed,
ret=elem.currentStyle&&elem.currentStyle[name],
style=elem.style;



if(ret==null&&style&&(uncomputed=style[name])){
ret=uncomputed;
}






if(rnumnonpx.test(ret)){


left=style.left;
rsLeft=elem.runtimeStyle&&elem.runtimeStyle.left;


if(rsLeft){
elem.runtimeStyle.left=elem.currentStyle.left;
}
style.left=name==="fontSize"?"1em":ret;
ret=style.pixelLeft+"px";


style.left=left;
if(rsLeft){
elem.runtimeStyle.left=rsLeft;
}
}

return ret===""?"auto":ret;
};
}

curCSS=getComputedStyle||currentStyle;

function getWidthOrHeight(elem,name,extra){


var val=name==="width"?elem.offsetWidth:elem.offsetHeight,
i=name==="width"?1:0,
len=4;

if(val>0){
if(extra!=="border"){
for(;i<len;i+=2){
if(!extra){
val-=parseFloat(jQuery.css(elem,"padding"+cssExpand[i]))||0;
}
if(extra==="margin"){
val+=parseFloat(jQuery.css(elem,extra+cssExpand[i]))||0;
}else{
val-=parseFloat(jQuery.css(elem,"border"+cssExpand[i]+"Width"))||0;
}
}
}

return val+"px";
}


val=curCSS(elem,name);
if(val<0||val==null){
val=elem.style[name];
}


if(rnumnonpx.test(val)){
return val;
}


val=parseFloat(val)||0;


if(extra){
for(;i<len;i+=2){
val+=parseFloat(jQuery.css(elem,"padding"+cssExpand[i]))||0;
if(extra!=="padding"){
val+=parseFloat(jQuery.css(elem,"border"+cssExpand[i]+"Width"))||0;
}
if(extra==="margin"){
val+=parseFloat(jQuery.css(elem,extra+cssExpand[i]))||0;
}
}
}

return val+"px";
}

jQuery.each(["height","width"],function(i,name){
jQuery.cssHooks[name]={
get:function(elem,computed,extra){
if(computed){
if(elem.offsetWidth!==0){
return getWidthOrHeight(elem,name,extra);
}else{
return jQuery.swap(elem,cssShow,function(){
return getWidthOrHeight(elem,name,extra);
});
}
}
},

set:function(elem,value){
return rnum.test(value)?
value+"px":
value;
}
};
});

if(!jQuery.support.opacity){
jQuery.cssHooks.opacity={
get:function(elem,computed){

return ropacity.test((computed&&elem.currentStyle?elem.currentStyle.filter:elem.style.filter)||"")?
(parseFloat(RegExp.$1)/100)+"":
computed?"1":"";
},

set:function(elem,value){
var style=elem.style,
currentStyle=elem.currentStyle,
opacity=jQuery.isNumeric(value)?"alpha(opacity="+value*100+")":"",
filter=currentStyle&&currentStyle.filter||style.filter||"";



style.zoom=1;


if(value>=1&&jQuery.trim(filter.replace(ralpha,""))===""){




style.removeAttribute("filter");


if(currentStyle&&!currentStyle.filter){
return;
}
}


style.filter=ralpha.test(filter)?
filter.replace(ralpha,opacity):
filter+" "+opacity;
}
};
}

jQuery(function(){


if(!jQuery.support.reliableMarginRight){
jQuery.cssHooks.marginRight={
get:function(elem,computed){


return jQuery.swap(elem,{"display":"inline-block"},function(){
if(computed){
return curCSS(elem,"margin-right");
}else{
return elem.style.marginRight;
}
});
}
};
}
});

if(jQuery.expr&&jQuery.expr.filters){
jQuery.expr.filters.hidden=function(elem){
var width=elem.offsetWidth,
height=elem.offsetHeight;

return(width===0&&height===0)||(!jQuery.support.reliableHiddenOffsets&&((elem.style&&elem.style.display)||jQuery.css(elem,"display"))==="none");
};

jQuery.expr.filters.visible=function(elem){
return!jQuery.expr.filters.hidden(elem);
};
}


jQuery.each({
margin:"",
padding:"",
border:"Width"
},function(prefix,suffix){

jQuery.cssHooks[prefix+suffix]={
expand:function(value){
var i,


parts=typeof value==="string"?value.split(" "):[value],
expanded={};

for(i=0;i<4;i++){
expanded[prefix+cssExpand[i]+suffix]=
parts[i]||parts[i-2]||parts[0];
}

return expanded;
}
};
});




var r20=/%20/g,
rbracket=/\[\]$/,
rCRLF=/\r?\n/g,
rhash=/#.*$/,
rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
rinput=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,

rlocalProtocol=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
rnoContent=/^(?:GET|HEAD)$/,
rprotocol=/^\/\//,
rquery=/\?/,
rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
rselectTextarea=/^(?:select|textarea)/i,
rspacesAjax=/\s+/,
rts=/([?&])_=[^&]*/,
rurl=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,


_load=jQuery.fn.load,










prefilters={},






transports={},


ajaxLocation,


ajaxLocParts,


allTypes=["*/"]+["*"];



try{
ajaxLocation=location.href;
}catch(e){


ajaxLocation=document.createElement("a");
ajaxLocation.href="";
ajaxLocation=ajaxLocation.href;
}


ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[];


function addToPrefiltersOrTransports(structure){


return function(dataTypeExpression,func){

if(typeof dataTypeExpression!=="string"){
func=dataTypeExpression;
dataTypeExpression="*";
}

if(jQuery.isFunction(func)){
var dataTypes=dataTypeExpression.toLowerCase().split(rspacesAjax),
i=0,
length=dataTypes.length,
dataType,
list,
placeBefore;


for(;i<length;i++){
dataType=dataTypes[i];


placeBefore=/^\+/.test(dataType);
if(placeBefore){
dataType=dataType.substr(1)||"*";
}
list=structure[dataType]=structure[dataType]||[];

list[placeBefore?"unshift":"push"](func);
}
}
};
}


function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,
dataType,inspected){

dataType=dataType||options.dataTypes[0];
inspected=inspected||{};

inspected[dataType]=true;

var list=structure[dataType],
i=0,
length=list?list.length:0,
executeOnly=(structure===prefilters),
selection;

for(;i<length&&(executeOnly||!selection);i++){
selection=list[i](options,originalOptions,jqXHR);


if(typeof selection==="string"){
if(!executeOnly||inspected[selection]){
selection=undefined;
}else{
options.dataTypes.unshift(selection);
selection=inspectPrefiltersOrTransports(
structure,options,originalOptions,jqXHR,selection,inspected);
}
}
}


if((executeOnly||!selection)&&!inspected["*"]){
selection=inspectPrefiltersOrTransports(
structure,options,originalOptions,jqXHR,"*",inspected);
}


return selection;
}




function ajaxExtend(target,src){
var key,deep,
flatOptions=jQuery.ajaxSettings.flatOptions||{};
for(key in src){
if(src[key]!==undefined){
(flatOptions[key]?target:(deep||(deep={})))[key]=src[key];
}
}
if(deep){
jQuery.extend(true,target,deep);
}
}

jQuery.fn.extend({
load:function(url,params,callback){
if(typeof url!=="string"&&_load){
return _load.apply(this,arguments);


}else if(!this.length){
return this;
}

var off=url.indexOf(" ");
if(off>=0){
var selector=url.slice(off,url.length);
url=url.slice(0,off);
}


var type="GET";


if(params){

if(jQuery.isFunction(params)){

callback=params;
params=undefined;


}else if(typeof params==="object"){
params=jQuery.param(params,jQuery.ajaxSettings.traditional);
type="POST";
}
}

var self=this;


jQuery.ajax({
url:url,
type:type,
dataType:"html",
data:params,

complete:function(jqXHR,status,responseText){

responseText=jqXHR.responseText;

if(jqXHR.isResolved()){


jqXHR.done(function(r){
responseText=r;
});

self.html(selector?

jQuery("<div>")


.append(responseText.replace(rscript,""))


.find(selector):


responseText);
}

if(callback){
self.each(callback,[responseText,status,jqXHR]);
}
}
});

return this;
},

serialize:function(){
return jQuery.param(this.serializeArray());
},

serializeArray:function(){
return this.map(function(){
return this.elements?jQuery.makeArray(this.elements):this;
})
.filter(function(){
return this.name&&!this.disabled&&
(this.checked||rselectTextarea.test(this.nodeName)||
rinput.test(this.type));
})
.map(function(i,elem){
var val=jQuery(this).val();

return val==null?
null:
jQuery.isArray(val)?
jQuery.map(val,function(val,i){
return{name:elem.name,value:val.replace(rCRLF,"\r\n")};
}):
{name:elem.name,value:val.replace(rCRLF,"\r\n")};
}).get();
}
});


jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){
jQuery.fn[o]=function(f){
return this.on(o,f);
};
});

jQuery.each(["get","post"],function(i,method){
jQuery[method]=function(url,data,callback,type){

if(jQuery.isFunction(data)){
type=type||callback;
callback=data;
data=undefined;
}

return jQuery.ajax({
type:method,
url:url,
data:data,
success:callback,
dataType:type
});
};
});

jQuery.extend({

getScript:function(url,callback){
return jQuery.get(url,undefined,callback,"script");
},

getJSON:function(url,data,callback){
return jQuery.get(url,data,callback,"json");
},




ajaxSetup:function(target,settings){
if(settings){

ajaxExtend(target,jQuery.ajaxSettings);
}else{

settings=target;
target=jQuery.ajaxSettings;
}
ajaxExtend(target,settings);
return target;
},

ajaxSettings:{
url:ajaxLocation,
isLocal:rlocalProtocol.test(ajaxLocParts[1]),
global:true,
type:"GET",
contentType:"application/x-www-form-urlencoded; charset=UTF-8",
processData:true,
async:true,











accepts:{
xml:"application/xml, text/xml",
html:"text/html",
text:"text/plain",
json:"application/json, text/javascript",
"*":allTypes
},

contents:{
xml:/xml/,
html:/html/,
json:/json/
},

responseFields:{
xml:"responseXML",
text:"responseText"
},




converters:{


"* text":window.String,


"text html":true,


"text json":jQuery.parseJSON,


"text xml":jQuery.parseXML
},





flatOptions:{
context:true,
url:true
}
},

ajaxPrefilter:addToPrefiltersOrTransports(prefilters),
ajaxTransport:addToPrefiltersOrTransports(transports),


ajax:function(url,options){


if(typeof url==="object"){
options=url;
url=undefined;
}


options=options||{};

var
s=jQuery.ajaxSetup({},options),

callbackContext=s.context||s,



globalEventContext=callbackContext!==s&&
(callbackContext.nodeType||callbackContext instanceof jQuery)?
jQuery(callbackContext):jQuery.event,

deferred=jQuery.Deferred(),
completeDeferred=jQuery.Callbacks("once memory"),

statusCode=s.statusCode||{},

ifModifiedKey,

requestHeaders={},
requestHeadersNames={},

responseHeadersString,
responseHeaders,

transport,

timeoutTimer,

parts,

state=0,

fireGlobals,

i,

jqXHR={

readyState:0,


setRequestHeader:function(name,value){
if(!state){
var lname=name.toLowerCase();
name=requestHeadersNames[lname]=requestHeadersNames[lname]||name;
requestHeaders[name]=value;
}
return this;
},


getAllResponseHeaders:function(){
return state===2?responseHeadersString:null;
},


getResponseHeader:function(key){
var match;
if(state===2){
if(!responseHeaders){
responseHeaders={};
while((match=rheaders.exec(responseHeadersString))){
responseHeaders[match[1].toLowerCase()]=match[2];
}
}
match=responseHeaders[key.toLowerCase()];
}
return match===undefined?null:match;
},


overrideMimeType:function(type){
if(!state){
s.mimeType=type;
}
return this;
},


abort:function(statusText){
statusText=statusText||"abort";
if(transport){
transport.abort(statusText);
}
done(0,statusText);
return this;
}
};




function done(status,nativeStatusText,responses,headers){


if(state===2){
return;
}


state=2;


if(timeoutTimer){
clearTimeout(timeoutTimer);
}



transport=undefined;


responseHeadersString=headers||"";


jqXHR.readyState=status>0?4:0;

var isSuccess,
success,
error,
statusText=nativeStatusText,
response=responses?ajaxHandleResponses(s,jqXHR,responses):undefined,
lastModified,
etag;


if(status>=200&&status<300||status===304){


if(s.ifModified){

if((lastModified=jqXHR.getResponseHeader("Last-Modified"))){
jQuery.lastModified[ifModifiedKey]=lastModified;
}
if((etag=jqXHR.getResponseHeader("Etag"))){
jQuery.etag[ifModifiedKey]=etag;
}
}


if(status===304){

statusText="notmodified";
isSuccess=true;


}else{

try{
success=ajaxConvert(s,response);
statusText="success";
isSuccess=true;
}catch(e){

statusText="parsererror";
error=e;
}
}
}else{


error=statusText;
if(!statusText||status){
statusText="error";
if(status<0){
status=0;
}
}
}


jqXHR.status=status;
jqXHR.statusText=""+(nativeStatusText||statusText);


if(isSuccess){
deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);
}else{
deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);
}


jqXHR.statusCode(statusCode);
statusCode=undefined;

if(fireGlobals){
globalEventContext.trigger("ajax"+(isSuccess?"Success":"Error"),
[jqXHR,s,isSuccess?success:error]);
}


completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);

if(fireGlobals){
globalEventContext.trigger("ajaxComplete",[jqXHR,s]);

if(!(--jQuery.active)){
jQuery.event.trigger("ajaxStop");
}
}
}


deferred.promise(jqXHR);
jqXHR.success=jqXHR.done;
jqXHR.error=jqXHR.fail;
jqXHR.complete=completeDeferred.add;


jqXHR.statusCode=function(map){
if(map){
var tmp;
if(state<2){
for(tmp in map){
statusCode[tmp]=[statusCode[tmp],map[tmp]];
}
}else{
tmp=map[jqXHR.status];
jqXHR.then(tmp,tmp);
}
}
return this;
};




s.url=((url||s.url)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//");


s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().split(rspacesAjax);


if(s.crossDomain==null){
parts=rurl.exec(s.url.toLowerCase());
s.crossDomain=!!(parts&&
(parts[1]!=ajaxLocParts[1]||parts[2]!=ajaxLocParts[2]||
(parts[3]||(parts[1]==="http:"?80:443))!=
(ajaxLocParts[3]||(ajaxLocParts[1]==="http:"?80:443)))
);
}


if(s.data&&s.processData&&typeof s.data!=="string"){
s.data=jQuery.param(s.data,s.traditional);
}


inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);


if(state===2){
return false;
}


fireGlobals=s.global;


s.type=s.type.toUpperCase();


s.hasContent=!rnoContent.test(s.type);


if(fireGlobals&&jQuery.active++===0){
jQuery.event.trigger("ajaxStart");
}


if(!s.hasContent){


if(s.data){
s.url+=(rquery.test(s.url)?"&":"?")+s.data;

delete s.data;
}


ifModifiedKey=s.url;


if(s.cache===false){

var ts=jQuery.now(),

ret=s.url.replace(rts,"$1_="+ts);


s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+ts:"");
}
}


if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){
jqXHR.setRequestHeader("Content-Type",s.contentType);
}


if(s.ifModified){
ifModifiedKey=ifModifiedKey||s.url;
if(jQuery.lastModified[ifModifiedKey]){
jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[ifModifiedKey]);
}
if(jQuery.etag[ifModifiedKey]){
jqXHR.setRequestHeader("If-None-Match",jQuery.etag[ifModifiedKey]);
}
}


jqXHR.setRequestHeader(
"Accept",
s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?
s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):
s.accepts["*"]
);


for(i in s.headers){
jqXHR.setRequestHeader(i,s.headers[i]);
}


if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){

jqXHR.abort();
return false;

}


for(i in{success:1,error:1,complete:1}){
jqXHR[i](s[i]);
}


transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);


if(!transport){
done(-1,"No Transport");
}else{
jqXHR.readyState=1;

if(fireGlobals){
globalEventContext.trigger("ajaxSend",[jqXHR,s]);
}

if(s.async&&s.timeout>0){
timeoutTimer=setTimeout(function(){
jqXHR.abort("timeout");
},s.timeout);
}

try{
state=1;
transport.send(requestHeaders,done);
}catch(e){

if(state<2){
done(-1,e);

}else{
throw e;
}
}
}

return jqXHR;
},



param:function(a,traditional){
var s=[],
add=function(key,value){

value=jQuery.isFunction(value)?value():value;
s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value);
};


if(traditional===undefined){
traditional=jQuery.ajaxSettings.traditional;
}


if(jQuery.isArray(a)||(a.jquery&&!jQuery.isPlainObject(a))){

jQuery.each(a,function(){
add(this.name,this.value);
});

}else{


for(var prefix in a){
buildParams(prefix,a[prefix],traditional,add);
}
}


return s.join("&").replace(r20,"+");
}
});

function buildParams(prefix,obj,traditional,add){
if(jQuery.isArray(obj)){

jQuery.each(obj,function(i,v){
if(traditional||rbracket.test(prefix)){

add(prefix,v);

}else{







buildParams(prefix+"["+(typeof v==="object"?i:"")+"]",v,traditional,add);
}
});

}else if(!traditional&&jQuery.type(obj)==="object"){

for(var name in obj){
buildParams(prefix+"["+name+"]",obj[name],traditional,add);
}

}else{

add(prefix,obj);
}
}



jQuery.extend({


active:0,


lastModified:{},
etag:{}

});






function ajaxHandleResponses(s,jqXHR,responses){

var contents=s.contents,
dataTypes=s.dataTypes,
responseFields=s.responseFields,
ct,
type,
finalDataType,
firstDataType;


for(type in responseFields){
if(type in responses){
jqXHR[responseFields[type]]=responses[type];
}
}


while(dataTypes[0]==="*"){
dataTypes.shift();
if(ct===undefined){
ct=s.mimeType||jqXHR.getResponseHeader("content-type");
}
}


if(ct){
for(type in contents){
if(contents[type]&&contents[type].test(ct)){
dataTypes.unshift(type);
break;
}
}
}


if(dataTypes[0]in responses){
finalDataType=dataTypes[0];
}else{

for(type in responses){
if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){
finalDataType=type;
break;
}
if(!firstDataType){
firstDataType=type;
}
}

finalDataType=finalDataType||firstDataType;
}




if(finalDataType){
if(finalDataType!==dataTypes[0]){
dataTypes.unshift(finalDataType);
}
return responses[finalDataType];
}
}


function ajaxConvert(s,response){


if(s.dataFilter){
response=s.dataFilter(response,s.dataType);
}

var dataTypes=s.dataTypes,
converters={},
i,
key,
length=dataTypes.length,
tmp,

current=dataTypes[0],
prev,

conversion,

conv,

conv1,
conv2;


for(i=1;i<length;i++){



if(i===1){
for(key in s.converters){
if(typeof key==="string"){
converters[key.toLowerCase()]=s.converters[key];
}
}
}


prev=current;
current=dataTypes[i];


if(current==="*"){
current=prev;

}else if(prev!=="*"&&prev!==current){


conversion=prev+" "+current;
conv=converters[conversion]||converters["* "+current];


if(!conv){
conv2=undefined;
for(conv1 in converters){
tmp=conv1.split(" ");
if(tmp[0]===prev||tmp[0]==="*"){
conv2=converters[tmp[1]+" "+current];
if(conv2){
conv1=converters[conv1];
if(conv1===true){
conv=conv2;
}else if(conv2===true){
conv=conv1;
}
break;
}
}
}
}

if(!(conv||conv2)){
jQuery.error("No conversion from "+conversion.replace(" "," to "));
}

if(conv!==true){

response=conv?conv(response):conv2(conv1(response));
}
}
}
return response;
}




var jsc=jQuery.now(),
jsre=/(\=)\?(&|$)|\?\?/i;


jQuery.ajaxSetup({
jsonp:"callback",
jsonpCallback:function(){
return jQuery.expando+"_"+(jsc++);
}
});


jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){

var inspectData=(typeof s.data==="string")&&/^application\/x\-www\-form\-urlencoded/.test(s.contentType);

if(s.dataTypes[0]==="jsonp"||
s.jsonp!==false&&(jsre.test(s.url)||
inspectData&&jsre.test(s.data))){

var responseContainer,
jsonpCallback=s.jsonpCallback=
jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback,
previous=window[jsonpCallback],
url=s.url,
data=s.data,
replace="$1"+jsonpCallback+"$2";

if(s.jsonp!==false){
url=url.replace(jsre,replace);
if(s.url===url){
if(inspectData){
data=data.replace(jsre,replace);
}
if(s.data===data){

url+=(/\?/.test(url)?"&":"?")+s.jsonp+"="+jsonpCallback;
}
}
}

s.url=url;
s.data=data;


window[jsonpCallback]=function(response){
responseContainer=[response];
};


jqXHR.always(function(){

window[jsonpCallback]=previous;

if(responseContainer&&jQuery.isFunction(previous)){
window[jsonpCallback](responseContainer[0]);
}
});


s.converters["script json"]=function(){
if(!responseContainer){
jQuery.error(jsonpCallback+" was not called");
}
return responseContainer[0];
};


s.dataTypes[0]="json";


return"script";
}
});





jQuery.ajaxSetup({
accepts:{
script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
},
contents:{
script:/javascript|ecmascript/
},
converters:{
"text script":function(text){
jQuery.globalEval(text);
return text;
}
}
});


jQuery.ajaxPrefilter("script",function(s){
if(s.cache===undefined){
s.cache=false;
}
if(s.crossDomain){
s.type="GET";
s.global=false;
}
});


jQuery.ajaxTransport("script",function(s){


if(s.crossDomain){

var script,
head=document.head||document.getElementsByTagName("head")[0]||document.documentElement;

return{

send:function(_,callback){

script=document.createElement("script");

script.async="async";

if(s.scriptCharset){
script.charset=s.scriptCharset;
}

script.src=s.url;


script.onload=script.onreadystatechange=function(_,isAbort){

if(isAbort||!script.readyState||/loaded|complete/.test(script.readyState)){


script.onload=script.onreadystatechange=null;


if(head&&script.parentNode){
head.removeChild(script);
}


script=undefined;


if(!isAbort){
callback(200,"success");
}
}
};


head.insertBefore(script,head.firstChild);
},

abort:function(){
if(script){
script.onload(0,1);
}
}
};
}
});




var
xhrOnUnloadAbort=window.ActiveXObject?function(){

for(var key in xhrCallbacks){
xhrCallbacks[key](0,1);
}
}:false,
xhrId=0,
xhrCallbacks;


function createStandardXHR(){
try{
return new window.XMLHttpRequest();
}catch(e){}
}

function createActiveXHR(){
try{
return new window.ActiveXObject("Microsoft.XMLHTTP");
}catch(e){}
}



jQuery.ajaxSettings.xhr=window.ActiveXObject?






function(){
return!this.isLocal&&createStandardXHR()||createActiveXHR();
}:

createStandardXHR;


(function(xhr){
jQuery.extend(jQuery.support,{
ajax:!!xhr,
cors:!!xhr&&("withCredentials"in xhr)
});
})(jQuery.ajaxSettings.xhr());


if(jQuery.support.ajax){

jQuery.ajaxTransport(function(s){

if(!s.crossDomain||jQuery.support.cors){

var callback;

return{
send:function(headers,complete){


var xhr=s.xhr(),
handle,
i;



if(s.username){
xhr.open(s.type,s.url,s.async,s.username,s.password);
}else{
xhr.open(s.type,s.url,s.async);
}


if(s.xhrFields){
for(i in s.xhrFields){
xhr[i]=s.xhrFields[i];
}
}


if(s.mimeType&&xhr.overrideMimeType){
xhr.overrideMimeType(s.mimeType);
}






if(!s.crossDomain&&!headers["X-Requested-With"]){
headers["X-Requested-With"]="XMLHttpRequest";
}


try{
for(i in headers){
xhr.setRequestHeader(i,headers[i]);
}
}catch(_){}




xhr.send((s.hasContent&&s.data)||null);


callback=function(_,isAbort){

var status,
statusText,
responseHeaders,
responses,
xml;




try{


if(callback&&(isAbort||xhr.readyState===4)){


callback=undefined;


if(handle){
xhr.onreadystatechange=jQuery.noop;
if(xhrOnUnloadAbort){
delete xhrCallbacks[handle];
}
}


if(isAbort){

if(xhr.readyState!==4){
xhr.abort();
}
}else{
status=xhr.status;
responseHeaders=xhr.getAllResponseHeaders();
responses={};
xml=xhr.responseXML;


if(xml&&xml.documentElement){
responses.xml=xml;
}



try{
responses.text=xhr.responseText;
}catch(_){
}



try{
statusText=xhr.statusText;
}catch(e){

statusText="";
}






if(!status&&s.isLocal&&!s.crossDomain){
status=responses.text?200:404;

}else if(status===1223){
status=204;
}
}
}
}catch(firefoxAccessException){
if(!isAbort){
complete(-1,firefoxAccessException);
}
}


if(responses){
complete(status,statusText,responses,responseHeaders);
}
};




if(!s.async||xhr.readyState===4){
callback();
}else{
handle=++xhrId;
if(xhrOnUnloadAbort){


if(!xhrCallbacks){
xhrCallbacks={};
jQuery(window).unload(xhrOnUnloadAbort);
}

xhrCallbacks[handle]=callback;
}
xhr.onreadystatechange=callback;
}
},

abort:function(){
if(callback){
callback(0,1);
}
}
};
}
});
}




var elemdisplay={},
iframe,iframeDoc,
rfxtypes=/^(?:toggle|show|hide)$/,
rfxnum=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
timerId,
fxAttrs=[

["height","marginTop","marginBottom","paddingTop","paddingBottom"],

["width","marginLeft","marginRight","paddingLeft","paddingRight"],

["opacity"]
],
fxNow;

jQuery.fn.extend({
show:function(speed,easing,callback){
var elem,display;

if(speed||speed===0){
return this.animate(genFx("show",3),speed,easing,callback);

}else{
for(var i=0,j=this.length;i<j;i++){
elem=this[i];

if(elem.style){
display=elem.style.display;



if(!jQuery._data(elem,"olddisplay")&&display==="none"){
display=elem.style.display="";
}




if((display===""&&jQuery.css(elem,"display")==="none")||
!jQuery.contains(elem.ownerDocument.documentElement,elem)){
jQuery._data(elem,"olddisplay",defaultDisplay(elem.nodeName));
}
}
}



for(i=0;i<j;i++){
elem=this[i];

if(elem.style){
display=elem.style.display;

if(display===""||display==="none"){
elem.style.display=jQuery._data(elem,"olddisplay")||"";
}
}
}

return this;
}
},

hide:function(speed,easing,callback){
if(speed||speed===0){
return this.animate(genFx("hide",3),speed,easing,callback);

}else{
var elem,display,
i=0,
j=this.length;

for(;i<j;i++){
elem=this[i];
if(elem.style){
display=jQuery.css(elem,"display");

if(display!=="none"&&!jQuery._data(elem,"olddisplay")){
jQuery._data(elem,"olddisplay",display);
}
}
}



for(i=0;i<j;i++){
if(this[i].style){
this[i].style.display="none";
}
}

return this;
}
},


_toggle:jQuery.fn.toggle,

toggle:function(fn,fn2,callback){
var bool=typeof fn==="boolean";

if(jQuery.isFunction(fn)&&jQuery.isFunction(fn2)){
this._toggle.apply(this,arguments);

}else if(fn==null||bool){
this.each(function(){
var state=bool?fn:jQuery(this).is(":hidden");
jQuery(this)[state?"show":"hide"]();
});

}else{
this.animate(genFx("toggle",3),fn,fn2,callback);
}

return this;
},

fadeTo:function(speed,to,easing,callback){
return this.filter(":hidden").css("opacity",0).show().end()
.animate({opacity:to},speed,easing,callback);
},

animate:function(prop,speed,easing,callback){
var optall=jQuery.speed(speed,easing,callback);

if(jQuery.isEmptyObject(prop)){
return this.each(optall.complete,[false]);
}


prop=jQuery.extend({},prop);

function doAnimation(){



if(optall.queue===false){
jQuery._mark(this);
}

var opt=jQuery.extend({},optall),
isElement=this.nodeType===1,
hidden=isElement&&jQuery(this).is(":hidden"),
name,val,p,e,hooks,replace,
parts,start,end,unit,
method;


opt.animatedProperties={};


for(p in prop){
name=jQuery.camelCase(p);
if(p!==name){
prop[name]=prop[p];
delete prop[p];
}

if((hooks=jQuery.cssHooks[name])&&"expand"in hooks){
replace=hooks.expand(prop[name]);
delete prop[name];



for(p in replace){
if(!(p in prop)){
prop[p]=replace[p];
}
}
}
}

for(name in prop){
val=prop[name];

if(jQuery.isArray(val)){
opt.animatedProperties[name]=val[1];
val=prop[name]=val[0];
}else{
opt.animatedProperties[name]=opt.specialEasing&&opt.specialEasing[name]||opt.easing||'swing';
}

if(val==="hide"&&hidden||val==="show"&&!hidden){
return opt.complete.call(this);
}

if(isElement&&(name==="height"||name==="width")){




opt.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];



if(jQuery.css(this,"display")==="inline"&&
jQuery.css(this,"float")==="none"){



if(!jQuery.support.inlineBlockNeedsLayout||defaultDisplay(this.nodeName)==="inline"){
this.style.display="inline-block";

}else{
this.style.zoom=1;
}
}
}
}

if(opt.overflow!=null){
this.style.overflow="hidden";
}

for(p in prop){
e=new jQuery.fx(this,opt,p);
val=prop[p];

if(rfxtypes.test(val)){



method=jQuery._data(this,"toggle"+p)||(val==="toggle"?hidden?"show":"hide":0);
if(method){
jQuery._data(this,"toggle"+p,method==="show"?"hide":"show");
e[method]();
}else{
e[val]();
}

}else{
parts=rfxnum.exec(val);
start=e.cur();

if(parts){
end=parseFloat(parts[2]);
unit=parts[3]||(jQuery.cssNumber[p]?"":"px");


if(unit!=="px"){
jQuery.style(this,p,(end||1)+unit);
start=((end||1)/e.cur())*start;
jQuery.style(this,p,start+unit);
}


if(parts[1]){
end=((parts[1]==="-="?-1:1)*end)+start;
}

e.custom(start,end,unit);

}else{
e.custom(start,val,"");
}
}
}


return true;
}

return optall.queue===false?
this.each(doAnimation):
this.queue(optall.queue,doAnimation);
},

stop:function(type,clearQueue,gotoEnd){
if(typeof type!=="string"){
gotoEnd=clearQueue;
clearQueue=type;
type=undefined;
}
if(clearQueue&&type!==false){
this.queue(type||"fx",[]);
}

return this.each(function(){
var index,
hadTimers=false,
timers=jQuery.timers,
data=jQuery._data(this);


if(!gotoEnd){
jQuery._unmark(true,this);
}

function stopQueue(elem,data,index){
var hooks=data[index];
jQuery.removeData(elem,index,true);
hooks.stop(gotoEnd);
}

if(type==null){
for(index in data){
if(data[index]&&data[index].stop&&index.indexOf(".run")===index.length-4){
stopQueue(this,data,index);
}
}
}else if(data[index=type+".run"]&&data[index].stop){
stopQueue(this,data,index);
}

for(index=timers.length;index--;){
if(timers[index].elem===this&&(type==null||timers[index].queue===type)){
if(gotoEnd){


timers[index](true);
}else{
timers[index].saveState();
}
hadTimers=true;
timers.splice(index,1);
}
}




if(!(gotoEnd&&hadTimers)){
jQuery.dequeue(this,type);
}
});
}

});


function createFxNow(){
setTimeout(clearFxNow,0);
return(fxNow=jQuery.now());
}

function clearFxNow(){
fxNow=undefined;
}


function genFx(type,num){
var obj={};

jQuery.each(fxAttrs.concat.apply([],fxAttrs.slice(0,num)),function(){
obj[this]=type;
});

return obj;
}


jQuery.each({
slideDown:genFx("show",1),
slideUp:genFx("hide",1),
slideToggle:genFx("toggle",1),
fadeIn:{opacity:"show"},
fadeOut:{opacity:"hide"},
fadeToggle:{opacity:"toggle"}
},function(name,props){
jQuery.fn[name]=function(speed,easing,callback){
return this.animate(props,speed,easing,callback);
};
});

jQuery.extend({
speed:function(speed,easing,fn){
var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{
complete:fn||!fn&&easing||
jQuery.isFunction(speed)&&speed,
duration:speed,
easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing
};

opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:
opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;


if(opt.queue==null||opt.queue===true){
opt.queue="fx";
}


opt.old=opt.complete;

opt.complete=function(noUnmark){
if(jQuery.isFunction(opt.old)){
opt.old.call(this);
}

if(opt.queue){
jQuery.dequeue(this,opt.queue);
}else if(noUnmark!==false){
jQuery._unmark(this);
}
};

return opt;
},

easing:{
linear:function(p){
return p;
},
swing:function(p){
return(-Math.cos(p*Math.PI)/2)+0.5;
}
},

timers:[],

fx:function(elem,options,prop){
this.options=options;
this.elem=elem;
this.prop=prop;

options.orig=options.orig||{};
}

});

jQuery.fx.prototype={

update:function(){
if(this.options.step){
this.options.step.call(this.elem,this.now,this);
}

(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);
},


cur:function(){
if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){
return this.elem[this.prop];
}

var parsed,
r=jQuery.css(this.elem,this.prop);



return isNaN(parsed=parseFloat(r))?!r||r==="auto"?0:r:parsed;
},


custom:function(from,to,unit){
var self=this,
fx=jQuery.fx;

this.startTime=fxNow||createFxNow();
this.end=to;
this.now=this.start=from;
this.pos=this.state=0;
this.unit=unit||this.unit||(jQuery.cssNumber[this.prop]?"":"px");

function t(gotoEnd){
return self.step(gotoEnd);
}

t.queue=this.options.queue;
t.elem=this.elem;
t.saveState=function(){
if(jQuery._data(self.elem,"fxshow"+self.prop)===undefined){
if(self.options.hide){
jQuery._data(self.elem,"fxshow"+self.prop,self.start);
}else if(self.options.show){
jQuery._data(self.elem,"fxshow"+self.prop,self.end);
}
}
};

if(t()&&jQuery.timers.push(t)&&!timerId){
timerId=setInterval(fx.tick,fx.interval);
}
},


show:function(){
var dataShow=jQuery._data(this.elem,"fxshow"+this.prop);


this.options.orig[this.prop]=dataShow||jQuery.style(this.elem,this.prop);
this.options.show=true;



if(dataShow!==undefined){

this.custom(this.cur(),dataShow);
}else{
this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());
}


jQuery(this.elem).show();
},


hide:function(){

this.options.orig[this.prop]=jQuery._data(this.elem,"fxshow"+this.prop)||jQuery.style(this.elem,this.prop);
this.options.hide=true;


this.custom(this.cur(),0);
},


step:function(gotoEnd){
var p,n,complete,
t=fxNow||createFxNow(),
done=true,
elem=this.elem,
options=this.options;

if(gotoEnd||t>=options.duration+this.startTime){
this.now=this.end;
this.pos=this.state=1;
this.update();

options.animatedProperties[this.prop]=true;

for(p in options.animatedProperties){
if(options.animatedProperties[p]!==true){
done=false;
}
}

if(done){

if(options.overflow!=null&&!jQuery.support.shrinkWrapBlocks){

jQuery.each(["","X","Y"],function(index,value){
elem.style["overflow"+value]=options.overflow[index];
});
}


if(options.hide){
jQuery(elem).hide();
}


if(options.hide||options.show){
for(p in options.animatedProperties){
jQuery.style(elem,p,options.orig[p]);
jQuery.removeData(elem,"fxshow"+p,true);

jQuery.removeData(elem,"toggle"+p,true);
}
}





complete=options.complete;
if(complete){

options.complete=false;
complete.call(elem);
}
}

return false;

}else{

if(options.duration==Infinity){
this.now=t;
}else{
n=t-this.startTime;
this.state=n/options.duration;


this.pos=jQuery.easing[options.animatedProperties[this.prop]](this.state,n,0,1,options.duration);
this.now=this.start+((this.end-this.start)*this.pos);
}

this.update();
}

return true;
}
};

jQuery.extend(jQuery.fx,{
tick:function(){
var timer,
timers=jQuery.timers,
i=0;

for(;i<timers.length;i++){
timer=timers[i];

if(!timer()&&timers[i]===timer){
timers.splice(i--,1);
}
}

if(!timers.length){
jQuery.fx.stop();
}
},

interval:13,

stop:function(){
clearInterval(timerId);
timerId=null;
},

speeds:{
slow:600,
fast:200,

_default:400
},

step:{
opacity:function(fx){
jQuery.style(fx.elem,"opacity",fx.now);
},

_default:function(fx){
if(fx.elem.style&&fx.elem.style[fx.prop]!=null){
fx.elem.style[fx.prop]=fx.now+fx.unit;
}else{
fx.elem[fx.prop]=fx.now;
}
}
}
});


jQuery.each(fxAttrs.concat.apply([],fxAttrs),function(i,prop){

if(prop.indexOf("margin")){
jQuery.fx.step[prop]=function(fx){
jQuery.style(fx.elem,prop,Math.max(0,fx.now)+fx.unit);
};
}
});

if(jQuery.expr&&jQuery.expr.filters){
jQuery.expr.filters.animated=function(elem){
return jQuery.grep(jQuery.timers,function(fn){
return elem===fn.elem;
}).length;
};
}


function defaultDisplay(nodeName){

if(!elemdisplay[nodeName]){

var body=document.body,
elem=jQuery("<"+nodeName+">").appendTo(body),
display=elem.css("display");
elem.remove();



if(display==="none"||display===""){

if(!iframe){
iframe=document.createElement("iframe");
iframe.frameBorder=iframe.width=iframe.height=0;
}

body.appendChild(iframe);




if(!iframeDoc||!iframe.createElement){
iframeDoc=(iframe.contentWindow||iframe.contentDocument).document;
iframeDoc.write((jQuery.support.boxModel?"<!doctype html>":"")+"<html><body>");
iframeDoc.close();
}

elem=iframeDoc.createElement(nodeName);

iframeDoc.body.appendChild(elem);

display=jQuery.css(elem,"display");
body.removeChild(iframe);
}


elemdisplay[nodeName]=display;
}

return elemdisplay[nodeName];
}




var getOffset,
rtable=/^t(?:able|d|h)$/i,
rroot=/^(?:body|html)$/i;

if("getBoundingClientRect"in document.documentElement){
getOffset=function(elem,doc,docElem,box){
try{
box=elem.getBoundingClientRect();
}catch(e){}


if(!box||!jQuery.contains(docElem,elem)){
return box?{top:box.top,left:box.left}:{top:0,left:0};
}

var body=doc.body,
win=getWindow(doc),
clientTop=docElem.clientTop||body.clientTop||0,
clientLeft=docElem.clientLeft||body.clientLeft||0,
scrollTop=win.pageYOffset||jQuery.support.boxModel&&docElem.scrollTop||body.scrollTop,
scrollLeft=win.pageXOffset||jQuery.support.boxModel&&docElem.scrollLeft||body.scrollLeft,
top=box.top+scrollTop-clientTop,
left=box.left+scrollLeft-clientLeft;

return{top:top,left:left};
};

}else{
getOffset=function(elem,doc,docElem){
var computedStyle,
offsetParent=elem.offsetParent,
prevOffsetParent=elem,
body=doc.body,
defaultView=doc.defaultView,
prevComputedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle,
top=elem.offsetTop,
left=elem.offsetLeft;

while((elem=elem.parentNode)&&elem!==body&&elem!==docElem){
if(jQuery.support.fixedPosition&&prevComputedStyle.position==="fixed"){
break;
}

computedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle;
top-=elem.scrollTop;
left-=elem.scrollLeft;

if(elem===offsetParent){
top+=elem.offsetTop;
left+=elem.offsetLeft;

if(jQuery.support.doesNotAddBorder&&!(jQuery.support.doesAddBorderForTableAndCells&&rtable.test(elem.nodeName))){
top+=parseFloat(computedStyle.borderTopWidth)||0;
left+=parseFloat(computedStyle.borderLeftWidth)||0;
}

prevOffsetParent=offsetParent;
offsetParent=elem.offsetParent;
}

if(jQuery.support.subtractsBorderForOverflowNotVisible&&computedStyle.overflow!=="visible"){
top+=parseFloat(computedStyle.borderTopWidth)||0;
left+=parseFloat(computedStyle.borderLeftWidth)||0;
}

prevComputedStyle=computedStyle;
}

if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){
top+=body.offsetTop;
left+=body.offsetLeft;
}

if(jQuery.support.fixedPosition&&prevComputedStyle.position==="fixed"){
top+=Math.max(docElem.scrollTop,body.scrollTop);
left+=Math.max(docElem.scrollLeft,body.scrollLeft);
}

return{top:top,left:left};
};
}

jQuery.fn.offset=function(options){
if(arguments.length){
return options===undefined?
this:
this.each(function(i){
jQuery.offset.setOffset(this,options,i);
});
}

var elem=this[0],
doc=elem&&elem.ownerDocument;

if(!doc){
return null;
}

if(elem===doc.body){
return jQuery.offset.bodyOffset(elem);
}

return getOffset(elem,doc,doc.documentElement);
};

jQuery.offset={

bodyOffset:function(body){
var top=body.offsetTop,
left=body.offsetLeft;

if(jQuery.support.doesNotIncludeMarginInBodyOffset){
top+=parseFloat(jQuery.css(body,"marginTop"))||0;
left+=parseFloat(jQuery.css(body,"marginLeft"))||0;
}

return{top:top,left:left};
},

setOffset:function(elem,options,i){
var position=jQuery.css(elem,"position");


if(position==="static"){
elem.style.position="relative";
}

var curElem=jQuery(elem),
curOffset=curElem.offset(),
curCSSTop=jQuery.css(elem,"top"),
curCSSLeft=jQuery.css(elem,"left"),
calculatePosition=(position==="absolute"||position==="fixed")&&jQuery.inArray("auto",[curCSSTop,curCSSLeft])>-1,
props={},curPosition={},curTop,curLeft;


if(calculatePosition){
curPosition=curElem.position();
curTop=curPosition.top;
curLeft=curPosition.left;
}else{
curTop=parseFloat(curCSSTop)||0;
curLeft=parseFloat(curCSSLeft)||0;
}

if(jQuery.isFunction(options)){
options=options.call(elem,i,curOffset);
}

if(options.top!=null){
props.top=(options.top-curOffset.top)+curTop;
}
if(options.left!=null){
props.left=(options.left-curOffset.left)+curLeft;
}

if("using"in options){
options.using.call(elem,props);
}else{
curElem.css(props);
}
}
};


jQuery.fn.extend({

position:function(){
if(!this[0]){
return null;
}

var elem=this[0],


offsetParent=this.offsetParent(),


offset=this.offset(),
parentOffset=rroot.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();




offset.top-=parseFloat(jQuery.css(elem,"marginTop"))||0;
offset.left-=parseFloat(jQuery.css(elem,"marginLeft"))||0;


parentOffset.top+=parseFloat(jQuery.css(offsetParent[0],"borderTopWidth"))||0;
parentOffset.left+=parseFloat(jQuery.css(offsetParent[0],"borderLeftWidth"))||0;


return{
top:offset.top-parentOffset.top,
left:offset.left-parentOffset.left
};
},

offsetParent:function(){
return this.map(function(){
var offsetParent=this.offsetParent||document.body;
while(offsetParent&&(!rroot.test(offsetParent.nodeName)&&jQuery.css(offsetParent,"position")==="static")){
offsetParent=offsetParent.offsetParent;
}
return offsetParent;
});
}
});



jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){
var top=/Y/.test(prop);

jQuery.fn[method]=function(val){
return jQuery.access(this,function(elem,method,val){
var win=getWindow(elem);

if(val===undefined){
return win?(prop in win)?win[prop]:
jQuery.support.boxModel&&win.document.documentElement[method]||
win.document.body[method]:
elem[method];
}

if(win){
win.scrollTo(
!top?val:jQuery(win).scrollLeft(),
top?val:jQuery(win).scrollTop()
);

}else{
elem[method]=val;
}
},method,val,arguments.length,null);
};
});

function getWindow(elem){
return jQuery.isWindow(elem)?
elem:
elem.nodeType===9?
elem.defaultView||elem.parentWindow:
false;
}





jQuery.each({Height:"height",Width:"width"},function(name,type){
var clientProp="client"+name,
scrollProp="scroll"+name,
offsetProp="offset"+name;


jQuery.fn["inner"+name]=function(){
var elem=this[0];
return elem?
elem.style?
parseFloat(jQuery.css(elem,type,"padding")):
this[type]():
null;
};


jQuery.fn["outer"+name]=function(margin){
var elem=this[0];
return elem?
elem.style?
parseFloat(jQuery.css(elem,type,margin?"margin":"border")):
this[type]():
null;
};

jQuery.fn[type]=function(value){
return jQuery.access(this,function(elem,type,value){
var doc,docElemProp,orig,ret;

if(jQuery.isWindow(elem)){

doc=elem.document;
docElemProp=doc.documentElement[clientProp];
return jQuery.support.boxModel&&docElemProp||
doc.body&&doc.body[clientProp]||docElemProp;
}


if(elem.nodeType===9){

doc=elem.documentElement;





if(doc[clientProp]>=doc[scrollProp]){
return doc[clientProp];
}

return Math.max(
elem.body[scrollProp],doc[scrollProp],
elem.body[offsetProp],doc[offsetProp]
);
}


if(value===undefined){
orig=jQuery.css(elem,type);
ret=parseFloat(orig);
return jQuery.isNumeric(ret)?ret:orig;
}


jQuery(elem).css(type,value);
},type,value,arguments.length,null);
};
});





window.jQuery=window.$=jQuery;













if(typeof define==="function"&&define.amd&&define.amd.jQuery){
define("jquery",[],function(){return jQuery;});
}



})(window);




































































































































































var JSON;
if(!JSON){
JSON={};
}

(function(){
'use strict';

function f(n){

return n<10?'0'+n:n;
}

if(typeof Date.prototype.toJSON!=='function'){

Date.prototype.toJSON=function(key){

return isFinite(this.valueOf())
?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z'
:null;
};

String.prototype.toJSON=
Number.prototype.toJSON=
Boolean.prototype.toJSON=function(key){
return this.valueOf();
};
}

var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
gap,
indent,
meta={
'\b':'\\b',
'\t':'\\t',
'\n':'\\n',
'\f':'\\f',
'\r':'\\r',
'"':'\\"',
'\\':'\\\\'
},
rep;


function quote(string){






escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){
var c=meta[a];
return typeof c==='string'
?c
:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);
})+'"':'"'+string+'"';
}


function str(key,holder){



var i,
k,
v,
length,
mind=gap,
partial,
value=holder[key];



if(value&&typeof value==='object'&&
typeof value.toJSON==='function'){
value=value.toJSON(key);
}




if(typeof rep==='function'){
value=rep.call(holder,key,value);
}



switch(typeof value){
case'string':
return quote(value);

case'number':



return isFinite(value)?String(value):'null';

case'boolean':
case'null':





return String(value);




case'object':




if(!value){
return'null';
}



gap+=indent;
partial=[];



if(Object.prototype.toString.apply(value)==='[object Array]'){




length=value.length;
for(i=0;i<length;i+=1){
partial[i]=str(i,value)||'null';
}




v=partial.length===0
?'[]'
:gap
?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']'
:'['+partial.join(',')+']';
gap=mind;
return v;
}



if(rep&&typeof rep==='object'){
length=rep.length;
for(i=0;i<length;i+=1){
if(typeof rep[i]==='string'){
k=rep[i];
v=str(k,value);
if(v){
partial.push(quote(k)+(gap?': ':':')+v);
}
}
}
}else{



for(k in value){
if(Object.prototype.hasOwnProperty.call(value,k)){
v=str(k,value);
if(v){
partial.push(quote(k)+(gap?': ':':')+v);
}
}
}
}




v=partial.length===0
?'{}'
:gap
?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}'
:'{'+partial.join(',')+'}';
gap=mind;
return v;
}
}



if(typeof JSON.stringify!=='function'){
JSON.stringify=function(value,replacer,space){







var i;
gap='';
indent='';




if(typeof space==='number'){
for(i=0;i<space;i+=1){
indent+=' ';
}



}else if(typeof space==='string'){
indent=space;
}




rep=replacer;
if(replacer&&typeof replacer!=='function'&&
(typeof replacer!=='object'||
typeof replacer.length!=='number')){
throw new Error('JSON.stringify');
}




return str('',{'':value});
};
}




if(typeof JSON.parse!=='function'){
JSON.parse=function(text,reviver){




var j;

function walk(holder,key){




var k,v,value=holder[key];
if(value&&typeof value==='object'){
for(k in value){
if(Object.prototype.hasOwnProperty.call(value,k)){
v=walk(value,k);
if(v!==undefined){
value[k]=v;
}else{
delete value[k];
}
}
}
}
return reviver.call(holder,key,value);
}






text=String(text);
cx.lastIndex=0;
if(cx.test(text)){
text=text.replace(cx,function(a){
return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);
});
}














if(/^[\],:{}\s]*$/
.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@')
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']')
.replace(/(?:^|:|,)(?:\s*\[)+/g,''))){






j=eval('('+text+')');




return typeof reviver==='function'
?walk({'':j},'')
:j;
}



throw new SyntaxError('JSON.parse');
};
}
}());











(function(Date,undefined)
{
var origParse=Date.parse,numericKeys=[1,4,5,6,7,10,11];






Date.parseISO8601=function(date,bStrict)
{
var struct,minutesOffset=0;

var bStrict=bStrict?bStrict:false;







if(!bStrict)
{

struct=/^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(date);
}
else
{

struct=/^(\d{4}|[+\-]\d{6})\-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})(?:(Z)|([+\-]))(\d{2}):(\d{2})$/.exec(date);
}

if(struct)
{

for(var i=0,k;(k=numericKeys[i]);++i)
{
struct[k]=+struct[k]||0;
}


struct[2]=(+struct[2]||1)-1;
struct[3]=+struct[3]||1;

if(struct[8]!=='Z'&&struct[9]!==undefined)
{
minutesOffset=struct[10]*60+struct[11];

if(struct[9]==='+')
{
minutesOffset=0-minutesOffset;
}
}

return Date.UTC(struct[1],struct[2],struct[3],struct[4],struct[5]+minutesOffset,struct[6],struct[7]);
}

return NaN;
};

Date.parseMsDate=function(date)
{
var struct;

if((struct=/^\/Date\((d|-|.*)\)[\/|\\]$/.exec(date)))
{
var v=struct[1].split(/[-+,.]/);
return new Date(v[0]?+v[0]:0-+v[1]);
}

return NaN;
};

Date.parse=function(date)
{
var timestamp;

timestamp=Date.parseISO8601(date);

if(!isNaN(timestamp))
{
return timestamp;
}

timestamp=Date.parseMsDate(date);

if(!isNaN(timestamp))
{
return timestamp;
}

return origParse?origParse(date):NaN;
};

}(Date));
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}
















(function $vpfn_6w$Fl2UmjT5WwmZUHo63Lw18$1(window,$)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var cacheBuster=1;



var browserSupportsPostMessage=window.postMessage&&!$.browser.opera;






var getDomainFromUrl=function $vpfn_AnvjUdhZQxCg0n6gVZdvbQ31$27(url)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return url.replace(/([^:]+:\/\/[^\/]+).*/,'$1');
};







var isOriginMatch=function $vpfn_Se1OEDqkpAzTrhTu00bRkQ42$24(originPatternOrFunction,sourceOrigin)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(originPatternOrFunction)=="string"&&
sourceOrigin!==originPatternOrFunction&&
originPatternOrFunction!=="*")
{
return false;
}

if($.isFunction(originPatternOrFunction)&&!originPatternOrFunction(sourceOrigin))
{
return false;
}

return true;
};










var getWindowPathToken=function $vpfn__1gDC7AS91yTrKp$ar9dCA68$29(parentWindow,childWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aFrameIndexes=[];
var tempTarget=childWindow;
var found=false;

while(tempTarget.parent&&tempTarget!==tempTarget.parent)
{
var index=0;
while(!found&&index<tempTarget.parent.frames.length)
{
if(tempTarget.parent.frames[index]==tempTarget)
{
found=true;
break;
}
index++;
}

aFrameIndexes.push(index);

if(tempTarget.parent===parentWindow)
{
break;
}

tempTarget=tempTarget.parent;
}

return found?aFrameIndexes.join(","):null;
};

var WINDOW_REF_TYPE_IFRAME_UP=0;
var WINDOW_REF_TYPE_IFRAME_DOWN=1;
var WINDOW_REF_TYPE_WINDOW_NAME=2;
var WINDOW_REF_TYPE_WINDOW_OPENER=3;














var serializeWindowReference=function $vpfn_PYURi0ayg3kZYlZprGPyhw118$35(currentWindow,targetWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var ref=null;




if(typeof(targetWindow)=="string")
{
ref=WINDOW_REF_TYPE_WINDOW_NAME+","+targetWindow;
}



if(!ref&&targetWindow.parent&&targetWindow.parent!==targetWindow)
{
ref=getWindowPathToken(currentWindow,targetWindow);
if(ref)
{
ref=WINDOW_REF_TYPE_IFRAME_UP+","+ref;
}
}




if(!ref&&targetWindow.frames.length>0)
{
ref=getWindowPathToken(targetWindow,currentWindow);
if(ref)
{
ref=WINDOW_REF_TYPE_IFRAME_DOWN+","+ref;
}
}




if(!ref&&currentWindow.opener&&currentWindow.opener!==currentWindow)
{
var tempWin=currentWindow;
var count=0;
while(tempWin.opener&&tempWin.opener!==tempWin)
{
count++;
tempWin=tempWin.opener;
}

ref=WINDOW_REF_TYPE_WINDOW_OPENER+","+count;
}

if(!ref)
{
throw new Error("Couldn't serialize window reference");
}

return ref;
};










$.postMessage=function $vpfn_VBFglmWPrM0uk5NHAd0wig186$20(message,targetOrigin,targetWindow,targetWindowName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!targetOrigin)
{
throw new Error("targetOrigin argument was not supplied to jQuery.postMessage");
}

if(!targetWindow)
{
throw new Error("No targetWindow specified");
}

if(browserSupportsPostMessage)
{


try
{
targetWindow.postMessage(message,getDomainFromUrl(targetOrigin));

return;
}
catch(ex)
{






if(ex.number!=-2147467262)
{
throw ex;
}
}
}

if(!targetOrigin)
{
throw new Error("Target origin must be specified");
}






var serializedWindowRef=serializeWindowReference(window,targetWindowName||targetWindow);

targetOrigin=getDomainFromUrl(targetOrigin);
var thisDomain=getDomainFromUrl(document.location.href);

var serverSideCacheBuster="";

var iframe=document.createElement("iframe");
iframe.style.display="none";

iframe.src=targetOrigin+'/vp/JS-Lib/jQuery/plugins/postmessage.htm?d='+
serverSideCacheBuster+'#'+
new Date().valueOf().toString()+cacheBuster+'&'+
serializedWindowRef+'&'+thisDomain+'&'+encodeURIComponent(message);

if(window.document.body!==null)
{
window.document.body.appendChild(iframe);
}
else
{
window.document.appendChild(iframe);
}

cacheBuster++;
};








$.receiveMessage=function $vpfn_aXFOy9Mi1gFa62slRJoEJw267$23(callback,allowedOriginOrFunction)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!callback)
{
throw new Error("No callback function specified");
}

if(!allowedOriginOrFunction)
{
throw new Error("No allowedOriginOrFunction specified");
}



var callbackWrapper=function $vpfn_1ak3IWAv9p5zQaIbwONH$Q281$30(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!isOriginMatch(allowedOriginOrFunction,e.origin))
{
return false;
}

callback(e);

return true;
};



if(browserSupportsPostMessage)
{
if(window.addEventListener)
{
window.addEventListener('message',callbackWrapper,false);
}
else
{
window.attachEvent('onmessage',callbackWrapper);
}
}





if(!browserSupportsPostMessage||$.browser.msie)
{



if(!window.__receiveMessageHook)
{


window.__receiveMessageHook=function $vpfn_lY7_s$K0gglGeOkmGBL7ew320$46(message,origin)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

for(var i=0;i<window.__receiveMessageHook.callbacks.length;i++)
{
window.__receiveMessageHook.callbacks[i]({"data":decodeURIComponent(message),"origin":origin});
}
};

window.__receiveMessageHook.callbacks=[];
}

window.__receiveMessageHook.callbacks.push(callbackWrapper);
}
};

})(window,jQuery);


if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}









(function $vpfn_MofcQ5YImpIlD3kkXrlNuQ11$1(window,$)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}







$(document).ajaxError(function $vpfn_MofcQ5YImpIlD3kkXrlNuQ20$26(e,xhr,settings,ex)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!settings.error)
{

throw new Error(ex+" from $.ajax(): "+settings.url);
}
});





var msJsonSanitizer=function $vpfn_NcMvDRnXG0ZrquBuyCiPJQ33$26(key,value)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(value)=="string")
{
return msJsonDateOnlySanitizer(key,value);
}
else if(typeof(value)=="object")
{
if(value&&value.__type)
{
delete value.__type;
}
}

return value;
};

var msJsonDateOnlySanitizer=function $vpfn_Q0ESjfRPB0Mqrp3GDQwGQw50$34(key,value)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(value)=="string")
{




var date=Date.parseISO8601(value,true);
if(!isNaN(date))
{
return date;
}

date=Date.parseMsDate(value);
if(!isNaN(date))
{
return date;
}
}

return value;
};




$.parseMsJSON=function $vpfn_pHkQgbZslaCFRPacvrLkKA77$20(text,preserveType)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!text)
{
return{};
}

var json=JSON.parse(text,preserveType?msJsonDateOnlySanitizer:msJsonSanitizer);

if(!json)
{
return{};
}



return typeof json.d!="undefined"?json.d:json;
};

var recurseJSON=function $vpfn_q_igoP4iQADLtsI3yI$j3A96$22(holder,key,reviver)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var k,v,value=holder[key];
if(value&&typeof value=="object")
{
for(k in value)
{
if(Object.prototype.hasOwnProperty.call(value,k))
{
v=recurseJSON(value,k,reviver);
if(v!==undefined)
{
value[k]=v;
}
else
{
delete value[k];
}
}
}
}

return reviver.call(holder,key,value);
};


$.recurseJSON=function $vpfn_iyM4yb$WoKl0Cf4swmaymA122$20(json,reviver)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return recurseJSON({"":json},"",reviver);
};


$.reviveMsJSON=function $vpfn_cUw$K5kyUGOavqmRuomu4A128$21(json,datesOnly)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return $.recurseJSON(json,datesOnly?msJsonDateOnlySanitizer:msJsonSanitizer);
};

var AJAX_SETTINGS_DEFAULTS={
dataType:"json",
type:"post",
contentType:"application/json; charset=utf-8",
converters:{"text json":$.parseMsJSON}
};

var validateSetting=function $vpfn_2vtUpQMojQdBfI7HbO1afA140$26(settings,arg,methodName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!settings[arg])
{
throw new Error(methodName+": "+arg+" not specified");
}
};

var reISO=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;

$.stringifyMsDate=function $vpfn_d2JUfQI__N7cLL9TQXwETQ150$24(key,value)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof value=="string")
{
var a=reISO.exec(value);
if(a){
var val='/Date('+new Date(Date.UTC(+a[1],+a[2]-1,+a[3],+a[4],+a[5],+a[6])).getTime()+'-0000)/';

this[key]=val;
return val;
}
}
return value;
};








$.fn.partialLoad=function $vpfn_mHBRNKkfmEWv25nHoEjQKA172$23(url,target,params,callback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var type="GET";


if(params)
{

if(jQuery.isFunction(params))
{

callback=params;
params=undefined;


}
else if(typeof params==="object")
{
params=jQuery.param(params,jQuery.ajaxSettings.traditional);
type="POST";
}
}

var self=this;


jQuery.ajax({
url:url,
type:type,
dataType:"html",
data:params,

complete:function $vpfn_MofcQ5YImpIlD3kkXrlNuQ205$22(jqXHR,status,responseText){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

responseText=jqXHR.responseText;

if(jqXHR.isResolved()){


jqXHR.done(function $vpfn_MofcQ5YImpIlD3kkXrlNuQ212$31(r){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
responseText=r;
});

var scripts=[];
var fragment=getFragmentAndScripts(responseText,target,self,scripts);


try
{

self.html(fragment);

if(scripts.length)
{
jQuery.each(scripts,function $vpfn_MofcQ5YImpIlD3kkXrlNuQ227$49(i,elem)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(elem.src)
{

execScriptUnique(elem.src);
}
else
{

jQuery.globalEval((elem.text||elem.textContent||elem.innerHTML||"").replace(rcleanScript,"/*$0*/"));
}
});
}
}
catch(e){

}
}

if(callback)
{
self.each(callback,[responseText,status,jqXHR]);
}
}
});

return this;
};

var execScriptUnique=function $vpfn_VtIqp1A3X5pGKTfALpWy$g257$27(src)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var srcLower=src.toLowerCase();




if(!window.__currentScripts)
{
window.__currentScripts={};

var currentScripts=document.getElementsByTagName("SCRIPT");
for(var i=0;i<currentScripts.length;i++)
{
if(currentScripts[i].src)
{
window.__currentScripts[currentScripts[i].src.toLowerCase()]=true;
}
}
}


if(window.__currentScripts[srcLower])
{
return;
}

window.__currentScripts[srcLower]=true;

jQuery.ajax({
type:"GET",
global:false,
url:src,
async:false,
dataType:"script"
});
};

var rcleanScript=/^\s*<!(?:\[CDATA\[|\-\-)/;

var getFragmentAndScripts=function $vpfn_O0MOZZcumPgnISRtZA6dbA297$32(responseText,selector,context,scripts)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var temp=jQuery("<div>");

if(selector)
{


temp[0].innerHTML=responseText;
return temp.find(selector);
}
else
{


var fragment=jQuery.buildFragment([responseText],context,scripts);

if(scripts.length)
{
jQuery.each(scripts,function $vpfn_MofcQ5YImpIlD3kkXrlNuQ316$37(i,elem)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(elem.parentNode)
{
elem.parentNode.removeChild(elem);
}
});
}

return fragment.fragment;
}
};






$.ajaxMs=function $vpfn_tVnXW6NTB9tGr_pmjq_94g334$15(url,settings)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!settings)
{
settings={};
}

if(typeof url=="object")
{
settings=url;
}
else if(typeof url=="string")
{
settings.url=url;
}



validateSetting(settings,"url","$.ajaxAsmx");



if(settings.data)
{
settings.data=JSON.stringify(settings.data,$.stringifyMsDate);
}



if(settings.methodName)
{
settings.url+="/"+settings.methodName;
}

var coalescedSettings={};
$.extend(true,coalescedSettings,AJAX_SETTINGS_DEFAULTS,settings);









if(coalescedSettings.async===false)
{
var xhr=$.ajax(coalescedSettings);
return $.parseMsJSON(xhr.responseText,coalescedSettings.preserveType);
}

return $.ajax(coalescedSettings);
};

$.ajaxAsmx=$.ajaxMs;
$.ajaxWcf=$.ajaxMs;

})(window,jQuery);




var amplify;
/*!
 * Amplify Store - Persistent Client-Side Storage 1.0.0
 * 
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 * 
 * http://amplifyjs.com
 */

(function(amplify,undefined){

var store=amplify.store=function(key,value,options,type){
var type=store.type;
if(options&&options.type&&options.type in store.types){
type=options.type;
}
return store.types[type](key,value,options||{});
};

store.types={};
store.type=null;
store.addType=function(type,storage){
if(!store.type){
store.type=type;
}

store.types[type]=storage;
store[type]=function(key,value,options){
options=options||{};
options.type=type;
return store(key,value,options);
};
}
store.error=function(){
return"amplify.store quota exceeded";
};

var rprefix=/^__amplify__/;
function createFromStorageInterface(storageType,storage){
store.addType(storageType,function(key,value,options){
var storedValue,parsed,i,remove,
ret=value,
now=(new Date()).getTime();

if(!key){
ret={};
remove=[];
i=0;
try{





key=storage.length;

while(key=storage.key(i++)){
if(rprefix.test(key)){
parsed=JSON.parse(storage.getItem(key));
if(parsed.expires&&parsed.expires<=now){
remove.push(key);
}else{
ret[key.replace(rprefix,"")]=parsed.data;
}
}
}
while(key=remove.pop()){
storage.removeItem(key);
}
}catch(error){}
return ret;
}


key="__amplify__"+key;

if(value===undefined){
storedValue=storage.getItem(key);
parsed=storedValue?JSON.parse(storedValue):{expires:-1};
if(parsed.expires&&parsed.expires<=now){
storage.removeItem(key);
}else{
return parsed.data;
}
}else{
if(value===null){
storage.removeItem(key);
}else{
parsed=JSON.stringify({
data:value,
expires:options.expires?now+options.expires:null
});
try{
storage.setItem(key,parsed);

}catch(error){

store[storageType]();
try{
storage.setItem(key,parsed);
}catch(error){
throw store.error();
}
}
}
}

return ret;
});
}



for(var webStorageType in{localStorage:1,sessionStorage:1}){

try{
if(window[webStorageType].getItem){
createFromStorageInterface(webStorageType,window[webStorageType]);
}
}catch(e){}
}




if(window.globalStorage){

try{
createFromStorageInterface("globalStorage",
window.globalStorage[window.location.hostname]);



if(store.type==="sessionStorage"){
store.type="globalStorage";
}
}catch(e){}
}




(function(){



if(store.types.localStorage){
return;
}


var div=document.createElement("div"),
attrKey="amplify";
div.style.display="none";
document.getElementsByTagName("head")[0].appendChild(div);
if(div.addBehavior){
try
{
div.addBehavior("#default#userdata");
}
catch(ex)
{

return;
}

store.addType("userData",function(key,value,options){
div.load(attrKey);
var attr,parsed,prevValue,i,remove,
ret=value,
now=(new Date()).getTime();

if(!key){
ret={};
remove=[];
i=0;
while(attr=div.XMLDocument.documentElement.attributes[i++]){
parsed=JSON.parse(attr.value);
if(parsed.expires&&parsed.expires<=now){
remove.push(attr.name);
}else{
ret[attr.name]=parsed.data;
}
}
while(key=remove.pop()){
div.removeAttribute(key);
}
div.save(attrKey);
return ret;
}





key=key.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,"-");

if(value===undefined){
attr=div.getAttribute(key);
parsed=attr?JSON.parse(attr):{expires:-1};
if(parsed.expires&&parsed.expires<=now){
div.removeAttribute(key);
}else{
return parsed.data;
}
}else{
if(value===null){
div.removeAttribute(key);
}else{

prevValue=div.getAttribute(key);
parsed=JSON.stringify({
data:value,
expires:(options.expires?(now+options.expires):null)
});
div.setAttribute(key,parsed);
}
}

try{
div.save(attrKey);

}catch(error){

if(prevValue===null){
div.removeAttribute(key);
}else{
div.setAttribute(key,prevValue);
}


store.userData();
try{
div.setAttribute(key,parsed);
div.save(attrKey);
}catch(error){

if(prevValue===null){
div.removeAttribute(key);
}else{
div.setAttribute(key,prevValue);
}
throw store.error();
}
}
return ret;
});
}
}());



(function(){
var memory={};

function copy(obj){
return obj===undefined?undefined:JSON.parse(JSON.stringify(obj));
}

store.addType("memory",function(key,value,options){
if(!key){
return copy(memory);
}

if(value===undefined){
return copy(memory[key]);
}

if(value===null){
delete memory[key];
return null;
}

memory[key]=value;
if(options.expires){
setTimeout(function(){
delete memory[key];
},options.expires);
}

return value;
});
}());

}(this.amplify=this.amplify||{}));



if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}




if(typeof vp=="undefined"){
var vp={};
}





vp.define=function $vpfn_2Tai2SeBQRe0hYi42Dgnpg16$12(namespace)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var parts=namespace.split(".");

var last=window;
for(var i=0;i<parts.length;i++)
{
var obj=last[parts[i]];
if(!obj)
{
obj={};
last[parts[i]]=obj;
}
last=obj;
}
};






vp.define("vp.core");






vp.core.isArray=function $vpfn_nDaAASQ_QznXzpOurgK3Aw45$18(v)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return v&&typeof v=="object"&&v.constructor==Array;
};










vp.core.applyProperties=function $vpfn_aeBI0B3js0WZCOFW$emckA59$26(oObj1,oObj2,aProps,bIgnoreNulls)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(aProps)
{
for(var i=0;i<aProps.length;i++)
{
var oOriginalValue=oObj1[aProps[i]];
if(!bIgnoreNulls||oOriginalValue!==null)
{
oObj2[aProps[i]]=oOriginalValue;
}
}
}
else
{
for(var sProp in oObj1)
{
oObj2[sProp]=oObj1[sProp];
}
}

return oObj2;
};








vp.core.getNestedProperty=function $vpfn_3owS5ixrVa5f$iO4nka$rA90$28(oObj,sProp)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sNestedProp=sProp;
var oNestedTarget=oObj;
var iDotPos=sNestedProp.indexOf(".");

while(iDotPos>=0)
{
var sCurrentProp=sNestedProp.substr(0,iDotPos);
sNestedProp=sNestedProp.substr(iDotPos+1);

if(!oNestedTarget[sCurrentProp])
{
return undefined;
}
oNestedTarget=oNestedTarget[sCurrentProp];

iDotPos=sNestedProp.indexOf(".");
}

return oNestedTarget[sNestedProp];
};









vp.core.setNestedProperty=function $vpfn_Ob9WtSOglD4Ja4HV6C5KqQ121$28(oObj,sProp,vValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sNestedProp=sProp;
var oNestedTarget=oObj;
var iDotPos=sNestedProp.indexOf(".");

while(iDotPos>=0)
{
var sCurrentProp=sNestedProp.substr(0,iDotPos);
sNestedProp=sNestedProp.substr(iDotPos+1);

if(!oNestedTarget[sCurrentProp])
{
throw new Error("The property "+sCurrentProp+" could not be found in "+sProp);
}

oNestedTarget=oNestedTarget[sCurrentProp];

iDotPos=sNestedProp.indexOf(".");
}

oNestedTarget[sNestedProp]=vValue;
};








vp.core.applyPropertyMap=function $vpfn_E8cc2Vg9yaI2tC_tTqE7Vw152$27(oTarget,oMap)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var sProp in oMap)
{
vp.core.setNestedProperty(oTarget,sProp,oMap[sProp]);
}
};






vp.core.shallowCopy=function $vpfn_na53atwyVABP0SDPfduJDg165$22(oObj)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oNew={};
for(var sProp in oObj)
{
oNew[sProp]=oObj[sProp];
}
return oNew;
};







vp.core.shallowIsEqual=function $vpfn_NC_u$68aj0F0gVa3Sfkrmw181$25(oObj1,oObj2)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sProp;
var iObj2PropCount=0;
var iObj1PropCount=0;
for(sProp in oObj2)
{
iObj2PropCount++;
}

for(sProp in oObj1)
{
iObj1PropCount++;
if(typeof(oObj2[sProp])=="undefined")
{
return false;
}
else if(oObj2[sProp]!==oObj1[sProp])
{
return false;
}
}

if(iObj1PropCount!=iObj2PropCount)
{
return false;
}

return true;
};







vp.core.initProperty=function $vpfn_q1L$9miAHWZz$ysxzdcvqA218$23(oObject,sPropertyName,vValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(oObject[sPropertyName])=="undefined")
{
oObject[sPropertyName]=vValue;
}
};






vp.core.requireArg=function $vpfn_ffai1lhQ64aF$agFhVFh5g231$21(sName,vValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(vValue)=="undefined")
{
throw new Error("The argument '"+sName+"' is required.");
}

return vValue;
};







vp.core.getBoolean=function $vpfn_57KBDCwnz4_LxKcH_1f1Xg247$21(v,bDefault)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(bDefault)=="undefined")
{
bDefault=false;
}

if(typeof(v)=="boolean")
{
return v;
}

if(!v)
{
return bDefault;
}

switch(v.toString().toLowerCase())
{
case"yes":
case"true":
case"ok":
case"1":
return true;
default:
return false;
}
};







vp.core.getNumber=function $vpfn_BKb7u6LGvnbr$MQwc_D4QA282$20(v,nDefault)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(nDefault)=="undefined")
{
nDefault=0;
}

if(typeof(v)=="boolean")
{
return v?1:0;
}
else if(typeof(v)=="undefined"||v===null||v==="")
{
return nDefault;
}

var nNum=new Number(v);

if(!isNaN(nNum.valueOf()))
{
return nNum.valueOf();
}
else
{
return nDefault;
}
};







vp.core.setObjectReference=function $vpfn_cC9xHv5TmgOjA$7eDnJKSg316$29(oObj,oRef,sName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(!window.__ObjRefs)
{
window.__ObjRefs=[];
}

var iRef=parseInt(vp.core.getAttribute(oObj,"__objrefid",-1));


if(iRef<=-1)
{
iRef=window.__ObjRefs.length;
oObj.setAttribute("__objrefid",iRef.toString());
window.__ObjRefs[iRef]={};
}

window.__ObjRefs[iRef][sName]=oRef;
};








vp.core.getObjectReference=function $vpfn_zPlnj$DbDzjRKq78evasfA344$29(oObj,sName,oWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oTargetWindow=oWindow||window;

if(!oTargetWindow.__ObjRefs)
{
return null;
}

var iRef=parseInt(vp.core.getAttribute(oObj,"__objrefid",-1));
if(iRef<=-1)
{
return null;
}

if(!oTargetWindow.__ObjRefs[iRef])
{
return null;
}

return oTargetWindow.__ObjRefs[iRef][sName];
};







vp.core.removeObjectReferenceAttribute=function $vpfn_YpePt1ySOCQbIFOPTF78HQ373$41(oObj,oWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oTargetWindow=oWindow||window;

if(!oTargetWindow.__ObjRefs)
{
return;
}

oObj.removeAttribute("__objrefid");
};




vp.core.clearClosures=function $vpfn_GGO6gMy3NRy$iTvWTWWdGw388$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var i=0;i<window.__objs.length;i++)
{
window.__objs[i]=null;
window.__funs[i]=null;
}
};








Function.prototype.getClosure=function $vpfn_e8fIIhosPST2_gOwv24Gpg404$32(oScope)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(!window.__objs)
{
window.__objs=[];
window.__funs=[];
}


var oFunction=this;


var objId=oScope.__objId;
if(!objId)
{
window.__objs[objId=oScope.__objId=window.__objs.length]=oScope;
}


var funId=oFunction.__funId;
if(!funId)
{
window.__funs[funId=oFunction.__funId=window.__funs.length]=oFunction;
}


if(!oScope.__closures)
{
oScope.__closures=[];
}


var closure=oScope.__closures["f"+funId];
if(!closure)
{

oScope=null;
oFunction=null;


closure=window.__objs[objId].__closures["f"+funId]=function $vpfn_3diauXzpCKnT4GhpCcUO_A445$65()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return window.__funs[funId].apply(window.__objs[objId],arguments);
};

closure.__isClosure=true;
closure.__funId=funId;
closure.__objId=objId;
}

return closure;
};













vp.core.getDelayedFunction=function $vpfn_4eDOnkK_bmDMso6QEtUgzQ470$29(fnFunction,iMinTimeBetweenCalls)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var bCanCallFunction=true;



var bWaitingToBeCalled=false;




var aWaitingArguments=arguments;

return function $vpfn_EbpfGNwJUF1T6d1WoFl52g484$11()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(bCanCallFunction&&!bWaitingToBeCalled)
{


fnFunction.apply(this,arguments);
bCanCallFunction=false;

window.setTimeout(function $vpfn_EbpfGNwJUF1T6d1WoFl52g493$30()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
bCanCallFunction=true;
},
iMinTimeBetweenCalls);
}

if(!bCanCallFunction&&!bWaitingToBeCalled)
{


bWaitingToBeCalled=true;

window.setTimeout(function $vpfn_EbpfGNwJUF1T6d1WoFl52g506$30()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
bWaitingToBeCalled=false;
fnFunction.apply(this,aWaitingArguments);
},
iMinTimeBetweenCalls);
}
};
};

vp.core.markAsClosure=function $vpfn_f6iF6DAn4PUei5iK8S$ncA516$24(fnFunction)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
fnFunction.__isClosure=true;
};









vp.core.getAttribute=function $vpfn_jUGXAyB1ZX_OvqfwU794Ig529$23(oNode,sAttrName,vDefaultValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oNode.parsed&&!oNode.getAttribute)
{
return vDefaultValue;
}

var vValue=oNode.getAttribute(sAttrName);

if(vValue===null||typeof(vValue)=="undefined")
{
vValue=oNode[sAttrName];
}

if(vValue===null||typeof(vValue)=="undefined")
{
return vDefaultValue;
}
else
{
return vValue;
}
};









vp.core.getElement=function $vpfn_egyH4HNytGr2uKqmwmLkjg561$21(vElement,sFunc)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof vElement=="string")
{
var oElement=vp.ui.get(vElement);

if(!oElement)
{
throw new Error(sFunc+": No element with the ID '"+vElement+"' exists.");
}

vElement=oElement;
}


if(!vElement)
{
throw new Error("Call to "+sFunc+"() with a null element reference.");
}


return vElement;
};








vp.core.filterListByProperties=function $vpfn_C1p76_6TE1qEq_cKt$Opgw593$33(aList,oFilterProperties)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aMatchedItems=[];
for(var i=0,l=aList.length;i<l;i++)
{
var oItem=aList[i];
var bIsMatch=true;
for(var sKey in oFilterProperties)
{
if(oItem[sKey]!==oFilterProperties[sKey])
{
bIsMatch=false;
break;
}
}
if(bIsMatch)
{
aMatchedItems.push(oItem);
}
}

return aMatchedItems;
};
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}





vp.define("vp.browser");





vp.browser.hasSpyware=false;





vp.browser.supportsPng=true;

(function $vpfn_3AcUOjqMK3SaPWYQT2WSNw23$1()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var BROWSER_SPYWARE_TOKENS={
"funwebproducts":{
name:"FunWebProducts",
url:"http://www.adwarealert.com/glossary_details.php?ID=133616"
},
"simbar":{
name:"Simbar",
url:"http://spywaredetector.net/spyware_encyclopedia/ToolBar.Simbar.htm"
}
};


if(window._browserData)
{
vp.core.applyProperties(window._browserData,this);
}

this.isIE=this.className==BROWSER_CLASS_InternetExplorer;
this.isGecko=this.className==BROWSER_CLASS_Gecko;
this.isWebKit=this.className==BROWSER_CLASS_Webkit;
this.isFirefox=this.name==BROWSER_NAME_Firefox;
this.isSafari=this.name==BROWSER_NAME_Safari;
this.isMobileSafari=this.name==BROWSER_NAME_MobileSafari;
this.isAndroid=this.name==BROWSER_NAME_Android;
this.isGoogleChrome=this.name==BROWSER_NAME_GoogleChrome;
this.isOpera=this.name==BROWSER_NAME_Opera;

this.ver=this.version.major;

this.OS={
isMac:this.operatingSystem==BROWSER_OS_Macintosh,
isWin:this.operatingSystem==BROWSER_OS_Windows,
isLinux:this.operatingSystem==BROWSER_OS_Linux,
isIOs:this.operatingSystem==BROWSER_OS_IOs,
isAndroid:this.operatingSystem==BROWSER_OS_Android,
isBlackberry:this.operatingSystem==BROWSER_OS_Blackberry,
isWindowsPhone:this.operatingSystem==BROWSER_OS_WindowsPhone,
name:this.operatingSystem
};

delete this.operatingSystem;

var sUA=navigator.userAgent.toLowerCase();
for(var sToken in BROWSER_SPYWARE_TOKENS)
{
if(sUA.indexOf(sToken)!=-1)
{
this.hasSpyware=true;
if(!this.spyware)
{
this.spyware=[];
}

this.spyware.push(BROWSER_SPYWARE_TOKENS[sToken]);
}
}
}).call(vp.browser);
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}





if(typeof(vp)=="undefined")
{
var vp=function(){};
}





vp.comparer=function(){};







vp.comparer.caseSensitive=function $vpfn_ICupwaaOu7WvXZHkfoF7DA26$28(o1,o2)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(o1>o2)
{
return 1;
}
else if(o1<o2)
{
return-1;
}
else if(o1==o2)
{
return 0;
}
};







vp.comparer.caseInsensitive=function $vpfn_MD7DGi2q15OyUoTkL1kbxg48$30(o1,o2)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.comparer.caseSensitive(o1.toLowerCase(),o2.toLowerCase());
};







vp.comparer.prefixSearchComparer=function $vpfn_VW5n8vlvjhRottasdU4dPg59$35(o1,o2)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sCompareTo=o1.toLowerCase();
var sSubject=o2.toLowerCase();
if(sSubject.startsWith&&sSubject.startsWith(sCompareTo,true))
{
return 0;
}
return vp.comparer.caseInsensitive(sCompareTo,sSubject);
};






vp.comparer.__getComparer=function $vpfn_Cmq1A_RKPSEIwE4ryNrq4A75$28(bCaseSensitiveOrCompareFunction)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(bCaseSensitiveOrCompareFunction)=="undefined"||bCaseSensitiveOrCompareFunction===null)
{
return vp.comparer.caseSensitive;
}
else if(typeof(bCaseSensitiveOrCompareFunction)=="function")
{
return bCaseSensitiveOrCompareFunction;
}
else if(!bCaseSensitiveOrCompareFunction)
{
return vp.comparer.caseInsensitive;
}
else if(bCaseSensitiveOrCompareFunction)
{
return vp.comparer.caseSensitive;
}
};






Array.prototype.clone=function $vpfn_K4ynVAlp5kUmtOFXlpQFLA100$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


var aNew=[];

for(var i=0;i<this.length;i++)
{
aNew[i]=this[i];
}

return aNew;
};












Array.prototype.indexOf=function $vpfn_YOrqrpXljlWNvWbo$Uo3ag125$26(vValue,bCaseSensitiveOrCompareFunction)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fnCompare=vp.comparer.__getComparer(bCaseSensitiveOrCompareFunction);
var iLen=this.length;

for(var i=0;i<iLen;i++)
{
if(fnCompare(this[i],vValue)===0)
{
return i;
}
}
return-1;
};











Array.prototype.contains=function $vpfn_PCAbLyw4AOFrQJEAsGoBAg150$27(vValue,bCaseSensitiveOrCompareFunction)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.indexOf(vValue,bCaseSensitiveOrCompareFunction)!=-1;
};






Array.prototype.add=function $vpfn_KTTqGEnRpLM3BwmnJuYnrQ160$22(vValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.push(vValue);
};






Array.prototype.append=function $vpfn_8geFUU_oAjY_oaCmP7lJxw170$25(aArr)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iLen=aArr.length;
for(var i=0;i<iLen;i++)
{
this.push(aArr[i]);
}
};







Array.prototype.insert=function $vpfn_4OWLGV7OUkVhgi3JD3s7UQ185$25(vValue,iIndex)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var i=this.length;i>iIndex;i--)
{
this[i]=this[i-1];
}

this[iIndex]=vValue;
};






Array.prototype.remove=function $vpfn_hcvFyb3o9m$XzoQtv9f0SA200$25(iIndex)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(iIndex)!="number")
{
throw new Error("Array.remove requires an integer argument");
}

this.splice(iIndex,1);
};





Array.prototype.removeAll=function $vpfn_YRf48erdyyn8peCZmKKCLA214$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
while(this.length>0)
{
this.remove(0);
}
};






Array.prototype.removeValue=function $vpfn_rMm9OZEgE$r9pGsCrOmFrA227$30(vValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iIndex=this.indexOf(vValue);
if(iIndex!=-1)
{
this.remove(iIndex);
}
};













Array.prototype.binarySearch=function $vpfn_7XL3kVGp1GNPw3LyyPhkeg248$31(vValue,bCaseSensitiveOrCompareFunction)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fnCompare=vp.comparer.__getComparer(bCaseSensitiveOrCompareFunction);

var iLow,iHigh,iMid,iRound;
iLow=0;
iHigh=this.length-1;
iRound=0;

while(iLow<=iHigh){
iRound++;
iMid=Math.floor((iLow+iHigh)/2);

var iCompare=fnCompare(vValue,this[iMid]);

if(iCompare<0)
{
iHigh=iMid-1;
}
else if(iCompare>0)
{
iLow=iMid+1;
}
else
{
return iMid;
}
}

return-1;
};













Array.prototype.insertSorted=function $vpfn_bz$CD1H_QAwnr4gri4pgcA292$31(vValue,bCaseSensitiveOrCompareFunction)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


if(this.length===0)
{
this.push(vValue);
return;
}

var fnCompare=vp.comparer.__getComparer(bCaseSensitiveOrCompareFunction);

var iLow,iHigh,iMid,iRound;
iLow=0;
iHigh=this.length-1;
iRound=0;

while(iLow<=iHigh){
iRound++;
iMid=Math.floor((iLow+iHigh)/2);

var iCompare=fnCompare(vValue,this[iMid]);

if(iCompare<0)
{
iHigh=iMid-1;
}
else if(iCompare>0)
{
iLow=iMid+1;
}
else
{
break;
}
}

if(fnCompare(vValue,this[iMid])>0){
this.insert(vValue,iMid+1);
}else{
this.insert(vValue,iMid);
}
};








Array.prototype.findAllStartsWith=function $vpfn_yiRDNl4jPJY56vOScZLOHw343$36(sPrefix)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var index=this.binarySearch(sPrefix,vp.comparer.prefixSearchComparer);

if(index<0)
{
return new Array();
}

var startIndex=index;
do
{
startIndex--;
}while(startIndex>=0&&this[startIndex].startsWith(sPrefix,true));

startIndex++;

var endIndex=index+1;
while(endIndex<this.length&&this[endIndex].startsWith(sPrefix,true))
{
endIndex++;
}
endIndex--;

var results=new Array();
index=startIndex;
for(index=startIndex;index<=endIndex;index++)
{
results.push(this[index]);
}

return results;
};












Array.prototype.appendSorted=function $vpfn_9NEcHCHV7ZkJk7ZyHWlOfg389$31(arr,bCaseSensitiveOrCompareFunction,bRemoveDuplicates){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fnCompare=vp.comparer.__getComparer(bCaseSensitiveOrCompareFunction);

var arr1=this;
var arr2=arr;
var i=0;
var j=0;
var aOut=[];

while(i<arr1.length||j<arr2.length)
{
if(i>=arr1.length)
{
aOut.add(arr2[j]);
j++;
continue;
}

if(j>=arr2.length)
{
aOut.add(arr2[i]);
i++;
continue;
}

var iCompare=fnCompare(arr1[i],arr2[j]);

if(iCompare<0)
{
aOut.add(arr1[i]);
i++;
}
else if(iCompare>0)
{
aOut.add(arr2[j]);
j++;
}
else
{
aOut.add(arr1[i]);

if(!bRemoveDuplicates)
{
aOut.add(arr2[j]);
}
i++;
j++;
}
}

this.removeAll();
this.append(aOut);
};







Array.prototype.equals=function $vpfn_6TJwAuU$klFhrNKzHn5i9g449$25(aCompare)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(this.length!=aCompare.length)
{
return false;
}

for(var i=0;i<this.length;i++)
{
if(this[i]!==aCompare[i])
{
return false;
}
}

return true;
};

if(!Array.prototype.map)
{








Array.prototype.map=function $vpfn_bXM9$FTaQqpHINyVEKKYrA477$26(fnAction,oThis)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof fnAction!="function")
{
throw new Error("fnAction is not a Function");
}

var iLen=this.length;
var aOut=new Array(iLen);

for(var i=0;i<iLen;i++)
{
if(i in this)
{
aOut[i]=fnAction.call(oThis,this[i],i,this);
}
}

return aOut;
};
}

if(!Array.prototype.some)
{








Array.prototype.some=function $vpfn_cPSZikao4e0Y5PBvzJBzZQ509$27(fnAction,oThis)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof fnAction!="function")
{
throw new Error("fnAction is not a Function");
}

var iLen=this.length;
for(var i=0;i<iLen;i++)
{
if(i in this&&fnAction.call(oThis,this[i],i,this))
{
return true;
}
}

return false;
};
}

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}




if(typeof vp=="undefined"){
var vp={};
}





vp.instrumentation={};

var LOGGING_MAX_LEN=65535;












if(!window.__MT)
{
var __MT=100;


var __ti=0;


var __td=[];
__td.length=__MT;
}

(function $vpfn_zphtohCKsH0LMBoPRVeViw43$1($)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}






vp.instrumentation.getTrace=function $vpfn_0IGZnGrOEn2PV0cnfKSCQA51$34()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var MAX_SIZE=__MT;


var iFirstSlot=__ti+1;
if(iFirstSlot>=MAX_SIZE||!__td[iFirstSlot])
{
iFirstSlot=0;
}

var aOut=[];
aOut.push("<trace>");
var i=iFirstSlot;
var bLoopFinished=false;
var sLastFnName=null;


while(__td[i]&&(i<iFirstSlot||!bLoopFinished))
{
var args=__td[i];
var fn=__td[i].callee;
var sFnName=vp.instrumentation.getFunctionName(fn);

if(!fn.isVpEventsWrapper)
{
aOut.push("<f n=\"");
aOut.push(sFnName);
aOut.push("\"");

if(typeof(fn._eventHandlerId)!="undefined"&&sLastFnName=="vpEventHandlerWrapper")
{
var sEventType="unknown";
if(args&&args[0]&&args[0].type)
{
sEventType=args[0].type;
}
aOut.push(" eventhandler=\""+sEventType+"\" ");
}




if(fn._isErrorHandler)
{
aOut.push(" errorhandler=\"1\" ");
}

if(fn._isInstrumentationMethod)
{
aOut.push(" instrumentationmethod=\"1\" ");
}

sLastFnName=sFnName;

if(__td[i].length===0)
{
aOut.push("/>");
}
else
{
aOut.push(">");

for(var j=0;j<__td[i].length;j++)
{
aOut.push("<a>");
aOut.push(vp.instrumentation._basicXmlEncode(vp.instrumentation.objToString(__td[i][j],0).substr(0,255)));
aOut.push("</a>");
}

aOut.push("</f>");
}
}

sLastFnName=sFnName;

i++;
if(i>=MAX_SIZE)
{
i=0;
bLoopFinished=true;
}
}

aOut.push("</trace>");
return aOut.join("");
};





vp.instrumentation.objToString=function $vpfn_jARcZ714$IkyzyWerhj8Vw143$37(oObj,iRecurseLevel)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(iRecurseLevel)=="undefined")
{
iRecurseLevel=2;
}

if(typeof(oObj)=="object")
{
if(oObj===null)
{
return"{null}";
}
else if(iRecurseLevel===0)
{
return"{obj}";
}
else
{
var aValues=[];
for(var sProp in oObj)
{
var sValue=sProp+":";

try
{
sValue+=arguments.callee(oObj[sProp],iRecurseLevel-1);
}
catch(ex)
{
}

aValues.push(sValue);
}
return"{"+aValues.join(",")+"}";
}
}
if(typeof(oObj)=="function")
{
return vp.instrumentation.getFunctionName(oObj);
}
else if(typeof(oObj)=="string")
{
return'"'+oObj.replace(/\"/gi,"\\\"")+'"';
}
else if(typeof(oObj)=="undefined")
{
return"{undefined}";
}
else
{
return oObj+"";
}
};






vp.instrumentation.getFunctionName=function $vpfn_q6oRuQ0U0JzjBjSac3ou2Q203$41(fn)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(fn._vpfn)
{
return fn._vpfn;
}

var sName=fn.toString();
sName=sName.substr("function ".length);
sName=sName.substr(0,sName.indexOf('('));
return sName;
};

vp.instrumentation._basicXmlEncode=function $vpfn_Kbm6EtlgMb1T6THqIp$Kmw216$41(sStr)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(sStr)=="undefined"||sStr===null)
{
return"";
}
else
{
return sStr.replace(/\</gi,"&lt;").replace(/\>/gi,"&gt;").replace(/\&/gi,"&amp;");
}
};






vp.instrumentation.logError=function $vpfn_cfSgoyLWHAea6u3XRW8eUg233$34(sMessage,iLineNum)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.instrumentation._currentErrorHandler(sMessage,document.location.href,iLineNum||0);
};

vp.instrumentation.logError._isInstrumentationMethod=true;





vp.instrumentation.wrapFunctionWithInstrumentation=function $vpfn_miA8TbMj4$crDe6xOsC1Mw244$57(fn)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof(fn)!="function")
{
return fn;
}


if(fn._isVpInstrumentedFunction===true)
{
return fn;
}

var fnWrapped=function $vpfn_zLcsYGn1RTxwfdyNH$7Yvw258$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
try
{
fn.apply(this,arguments);
}
catch(ex)
{
vp.instrumentation.logException(ex);


throw new Error(ex.message+" "+VP_INSTRUMENTATION_ALREADY_LOGGED_MESSAGE,ex.fileName,ex.lineNumber);
}
};

fnWrapped._isVpInstrumentedFunction=true;

return fnWrapped;
};





vp.instrumentation.logException=function $vpfn_ChbJuXWHxjwb_FTCjMB$Bg282$38(oException)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oException._wasLogged)
{
return;
}

oException._wasLogged=true;

if(vp.instrumentation._currentErrorHandler)
{

if(!oException.fileName)
{
var oFileInfo=vp.instrumentation._extractLineAndFileFromStack(oException);
oException.fileName=oFileInfo.fileName;
oException.lineNumber=oFileInfo.lineNumber;
}


if(!oException.fileName)
{
oException.fileName=oException.sourceURL;
}


if(!oException.lineNumber)
{
oException.lineNumber=oException.line;
}

vp.instrumentation._currentErrorHandler(oException.message,oException.fileName,oException.lineNumber);
}
};





vp.instrumentation._extractLineAndFileFromStack=function $vpfn_yIrN39i3R4yqDtooocjvsg321$54(oException)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oFileInfo={};

if(oException&&oException.stack)
{
try
{
var urlRegex=/((?:https?\:)?\/\/.*?):([0-9]*)/i;
var matches=urlRegex.exec(oException.stack);
if(matches&&matches.length>2)
{
oFileInfo.fileName=matches[1];
oFileInfo.lineNumber=matches[2];
}
}
catch(ex)
{
}
}
return oFileInfo;
};

vp.instrumentation.logException._isInstrumentationMethod=true;

vp.instrumentation.numberOfErrors=0;
vp.instrumentation.lastLoggedError=null;









vp.instrumentation.errorHandler=function $vpfn_j_0P3CC2G$jEQ3ozgbgTrQ357$38(sMsg,sErrorUrl,iLineNum)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

window.__noTrace=true;

try
{
var oErrData=vp.instrumentation.getErrorDataQueryString(sMsg,sErrorUrl,iLineNum);


if(oErrData)
{

if($!==jQuery)
{
oErrData.form.trace="<trace><f n='jQueryBonk3' /><f n='jQueryBonk2'><a>"+vp.instrumentation.objToString($,10)+"</a></f><f n='jQueryBonk1' errorhandler='true'/></trace>";
}

var sTrackingUrl="/vp/tracking/client-event-logger.aspx?"+$.param(oErrData.queryString);
var sPostData=vp.instrumentation.serializeLogData(oErrData.form);

$.post(sTrackingUrl,sPostData);
}
}
catch(ex)
{
}

window.__noTrace=false;
return true;
};

vp.instrumentation.serializeLogData=function $vpfn_2UnvXOKEJJcbY7bhgwnc3A389$42(oPostData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sPostData=$.param(oPostData);

if(sPostData.length>LOGGING_MAX_LEN)
{
oPostData.trace="<trace><fn n=\"Trace too long\" /></trace>";
sPostData=$.param(oPostData);
}

return sPostData;
};

var VP_INSTRUMENTATION_ALREADY_LOGGED_MESSAGE="7389BF32-F154-444B-9FDA-8A6C61D10041";

vp.instrumentation.getErrorDataQueryString=function $vpfn_h7Kjk5F2OvglQNA4dhoCng404$49(sMsg,sErrorUrl,iLineNum)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



var iNow=new Date().valueOf();
var lastErr=vp.instrumentation.lastLoggedError;

if(lastErr)
{




var isMeaninglessError=!sErrorUrl&&iLineNum===0;



var isRethrown=sMsg&&sMsg.indexOf(VP_INSTRUMENTATION_ALREADY_LOGGED_MESSAGE)>0;

if(isMeaninglessError||isRethrown||(sMsg==lastErr.message&&sErrorUrl==lastErr.errorUrl))
{
vp.instrumentation.lastLoggedError=null;
return null;
}
}

vp.instrumentation.lastLoggedError=
{
dateTime:iNow,
message:sMsg,
errorUrl:sErrorUrl,
lineNumber:iLineNum
};

var LOGGING_NUM_ERRORS_MAX=50;

vp.instrumentation.numberOfErrors++;
if(vp.instrumentation.numberOfErrors>LOGGING_NUM_ERRORS_MAX)
{
return null;
}

var oPostData={};
oPostData.message=sMsg;
oPostData.line=iLineNum;


if(!vp.instrumentation._populateErrorLogData(sMsg,sErrorUrl,iLineNum,oPostData))
{
return null;
}

var sQs=document.location.search;
if(sQs.length>1)
{
sQs=sQs.substring(1);
}

var oGetData={
d:new Date().formatDotNet(),
g:window._vp_page_guid,
s:window._vp_session_id,
e:window.VP_CLIENT_EVENT_TYPE_Error,
p:document.location.pathname,
b:navigator.userAgent,
q:sQs,
err:true,
u:sErrorUrl||""
};

if(window._vp_logical_page)
{
oGetData.lp=window._vp_logical_page;
}

return{
queryString:oGetData,
form:oPostData
};
};






vp.instrumentation.setErrorHandler=function $vpfn_Sd_$FWEPjpHoFplCi8cCRA491$41(fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
fnHandler._isErrorHandler=true;
vp.instrumentation._currentErrorHandler=fnHandler;
window.onerror=fnHandler;
};









vp.instrumentation._populateErrorLogData=function $vpfn_mc$ptyRi9WrIoDXQsLhpMQ506$47(sMessage,sErrorUrl,iLineNum,oData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oData.trace=vp.instrumentation.getTrace();
return true;
};





vp.instrumentation.testError=function $vpfn_TbB_7crxE3QJQTd3Y2UL9w516$35(sMethodName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!sMethodName)
{
sMethodName="testErrorUndefinedMethod";
}

var fn=vp.instrumentation.wrapFunctionWithInstrumentation(function $vpfn_zphtohCKsH0LMBoPRVeViw523$68()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
eval(sMethodName+"();");
});

fn();
};

if(!window.isDebug&&window._vp_log_client_errors)
{
vp.instrumentation.setErrorHandler(vp.instrumentation.errorHandler);
}

})(jQuery);


function showTrace()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
window.__noTrace=true;
alert(vp.instrumentation.getTrace());
window.__noTrace=false;
}showTrace._vpfn='$vpfn_YcRATQ$Ku7D_yxkEGkta1w539$0';


if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}






vp.define("vp.events");






vp.events.cancelEvent=function $vpfn_gcqUaR5FU58JVCZiTC6Gxw17$24(oEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oEvent=oEvent||window.event;

if(!oEvent)
{
throw new Error("No event argument was passed into vp.events.cancelEvent()");
}

oEvent.returnValue=false;
if(oEvent.preventDefault)
{
oEvent.preventDefault();
}
};






vp.events.cancelBubble=function $vpfn_GqzalFwO4Y7fyE_liCebPg38$25(oEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oEvent=oEvent||window.event;
if(!oEvent)
{
throw new Error("No event argument was passed into vp.events.cancelBubble()");
}

if(oEvent.stopPropagation)
{
oEvent.stopPropagation();
oEvent.bubbleCanceled=true;
}
else
{
oEvent.cancelBubble=true;
}
};






vp.events.cancel=function $vpfn_FQXFjxubWfAYn3Ft8chCLw62$19(oEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.events.cancelEvent(oEvent);
vp.events.cancelBubble(oEvent);
};






vp.events._callHandlers=function $vpfn_iQRBBRnXhucQJTGSPFSBzQ73$26(oEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

oEvent=window.event||oEvent;


if(this.handlers[oEvent.type])
{
for(var i=0;i<this.handlers[oEvent.type].length;i++)
{
this.handlers[oEvent.type](oEvent);
}
}
};





vp.events._fireOnDOMLoad=function $vpfn_jLrQr2GTaCj4Enjjaq_QMA92$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.events.isDOMLoadComplete)
{
return;
}

vp.events.isDOMLoadComplete=true;








var e;

if(document.createEvent)
{


e=document.createEvent("UIEvents");
e.initEvent("FakeDOMContentReady",false,false);
document.dispatchEvent(e);
}
else if(document.documentElement.attachEvent)
{




e=document.createEventObject();
e.eventType="ondataavailable";
e.eventName="FakeDOMContentReady";

document.fireEvent(e.eventType,e);
}
};







vp.events._getHandlerWrapper=function $vpfn_euCYbxJWVfvqC7H0L$gy$w138$31(fnHandler,sType)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


if(!fnHandler._eventHandlerId)
{
if(!window._lastEventHandlerId)
{
window._lastEventHandlerId=0;
}

fnHandler._eventHandlerId="eh"+window._lastEventHandlerId.toString();

window._lastEventHandlerId++;
}



if(!window._eventHandlerMap)
{
window._eventHandlerMap={};
}



var fnWrapper=window._eventHandlerMap[fnHandler._eventHandlerId];
if(!fnWrapper)
{
var fnEnsureDOMLoadCalled=sType=="load"?vp.events._fireOnDOMLoad:function(){};






if(document.all||window.isDebug)
{



fnWrapper=function $vpfn_nKl4pUaEqbDeKlhdxbDd0Q178$24(oEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
fnEnsureDOMLoadCalled();
fnHandler(oEvent);
};
}
else
{







fnWrapper=vp.instrumentation.wrapFunctionWithInstrumentation(function $vpfn_0vij3rsKG_z8Eo$BbgQw1A193$75(oEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
fnEnsureDOMLoadCalled();
fnHandler(oEvent);
});

}

fnWrapper.isVpEventsWrapper=true;

window._eventHandlerMap[fnHandler._eventHandlerId]=fnWrapper;
}

return fnWrapper;
};









vp.events.add=function $vpfn_LEczmOrQaQg4JCESMWQDuQ217$16(vTarget,sEvent,fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var oTarget=vp.core.getElement(vTarget,"vp.events.add");





var fnHandlerWrapper=vp.events._getHandlerWrapper(fnHandler,sEvent);

var oEventMap=vp.events._initializeBoundObject(oTarget,sEvent);

if(!oEventMap.enableInProgress)
{
oEventMap.handlers.push(fnHandlerWrapper);
}

if(oEventMap.enabled)
{

if(oTarget.addEventListener)
{
oTarget.addEventListener(sEvent,fnHandlerWrapper,false);
}
else if(oTarget.attachEvent)
{




oTarget.detachEvent("on"+sEvent,fnHandlerWrapper);
oTarget.attachEvent("on"+sEvent,fnHandlerWrapper);
}
else
{
if(!oTarget.handlers)
{
oTarget.handlers={};
}

if(!oTarget.handlers[sEvent])
{
oTarget.handlers[sEvent]=[];
}

oTarget.handlers[sEvent][oTarget.handlers[sEvent].length]=fnHandlerWrapper;
oTarget["on"+sEvent]=vp.events._callHandlers;
}
}
};








vp.events.remove=function $vpfn_dG68GXRSvWkggUa$K3_pSA276$19(vTarget,sEvent,fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var oTarget=vp.core.getElement(vTarget,"vp.events.remove");

var fnHandlerWrapper=vp.events._getHandlerWrapper(fnHandler,sEvent);

var bDoRemove=true;

try
{
var oEventMap=vp.events._initializeBoundObject(oTarget,sEvent);

if(!oEventMap.enableInProgress)
{
oEventMap.handlers.removeValue(fnHandlerWrapper);
}

if(!oEventMap.enabled&&!oEventMap.enableInProgress)
{
bDoRemove=false;
}
}
catch(ex)
{

}

if(bDoRemove)
{
try
{
if(oTarget.closed)
{
return;
}
}
catch(ex)
{
return;
}


if(oTarget.removeEventListener)
{
oTarget.removeEventListener(sEvent,fnHandlerWrapper,false);
}
else if(oTarget.detachEvent)
{
oTarget.detachEvent("on"+sEvent,fnHandlerWrapper);
}
else
{
if(!oTarget.handlers)
{
oTarget.handlers={};
}

if(!oTarget.handlers[sEvent])
{
oTarget.handlers[sEvent]=[];
}

var aHandlers=oTarget.handlers[sEvent];
var iLen=aHandlers.length;


for(var i=0;i<iLen;i++)
{
if(aHandlers[i]==fnHandlerWrapper)
{
aHandlers[i]=new Function();
}
}

aHandlers[aHandlers.length]=fnHandlerWrapper;
oTarget["on"+sEvent]=vp.events._callHandlers;
}
}
};




vp.events.removeAll=function $vpfn_OvTQryjDYtIRoANTUny$JA360$22()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var sElemId in vp.events._boundObjects)
{
try
{
var sTemp=vp.events._boundObjects[sElemId].target._eventId;
}
catch(ex)
{
continue;
}

for(var sEvent in vp.events._boundObjects[sElemId].events)
{
var aHandlers=vp.events._boundObjects[sElemId].events[sEvent].handlers;
if(aHandlers)
{

var iLen=aHandlers.length;
for(var i=iLen-1;i>=0;i--)
{
var fnAction=function $vpfn_zVVe6FcwLQMx4qWE3O2GZQ382$35()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.events.remove(
vp.events._boundObjects[sElemId].target,
sEvent,
aHandlers[i]);
};

if(window.isDebug)
{
fnAction();
}
else
{
try
{
fnAction();
}
catch(ex)
{
}
}
}
}
}
}
};








vp.events._boundObjects={};







vp.events._eventIdCounter=0;








vp.events._initializeBoundObject=function $vpfn_4pepP8QXqMKbxbn8ynwhwQ434$35(oElement,sEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oElement._eventId)
{
oElement._eventId="evt"+vp.events._eventIdCounter;
vp.events._eventIdCounter++;
}

var oMap=vp.events._boundObjects[oElement._eventId];
if(!oMap)
{
oMap={
target:oElement,
events:{}
};

vp.events._boundObjects[oElement._eventId]=oMap;
}

if(!oMap.events[sEvent])
{
oMap.events[sEvent]={
handlers:[],
enabled:true
};
}

return oMap.events[sEvent];
};








vp.events.enable=function $vpfn_Z_svU388i6IyzVVVaKjB5w471$19(vElement,sEvent,bEnable)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof(bEnable)=="undefined")
{
bEnable=true;
}

var oElement=vp.core.getElement(vElement,"vp.events.enableEvents");

var oEventMap=vp.events._initializeBoundObject(oElement,sEvent);

if(oEventMap.enabled==bEnable)
{
return;
}

oEventMap.enabled=bEnable;

var sSourceProp="on"+sEvent+(bEnable?"_disabled":"");
var sTargetProp="on"+sEvent+(!bEnable?"_disabled":"");



if(oElement[sSourceProp])
{

oElement[sTargetProp]=oElement[sSourceProp];
oElement[sSourceProp]=null;
}



else
{


oEventMap.enableInProgress=true;

var fnChange=bEnable?vp.events.add:vp.events.remove;

for(var i=0;i<oEventMap.handlers.length;i++)
{
fnChange(oElement,sEvent,oEventMap.handlers[i]);
}

oEventMap.enableInProgress=false;
}
};








vp.events.addRecursive=function $vpfn_E3Gr$FrAqQG6ai_Y9U5Vyw528$25(oElement,sEvent,fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.events.add(oElement,sEvent,fnHandler);

for(var i=0;i<oElement.childNodes.length;i++)
{
var oChild=oElement.childNodes[i];
if(oChild.nodeType==1)
{
arguments.callee(oChild,sEvent,fnHandler);
}
}
};






vp.events.addToOnLoad=function $vpfn_18y1gmdXFs1nu72qvPFFXg547$24(fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.events.add(window,"load",fnHandler);
};






vp.events.addToOnUnload=function $vpfn_isog3W_U9xrvYEnXUnwmLg557$26(fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.events.add(window,"unload",fnHandler);
};

vp.events.addToOnLoad(function $vpfn_0vij3rsKG_z8Eo$BbgQw1A562$22(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}vp.events.isLoadComplete=true;});








vp.events.runAfterLoadComplete=function $vpfn_LTV$8KJ$yB7HcxDe8MKZfA571$33(fnHandler,iDelay)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fnWrapper=fnHandler;

if(typeof(iDelay)=="number"&&iDelay>=0)
{
fnWrapper=function $vpfn_nKl4pUaEqbDeKlhdxbDd0Q577$20(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}setTimeout(fnHandler,iDelay);};
}

if(vp.events.isLoadComplete)
{
fnWrapper();
}
else
{
vp.events.addToOnLoad(fnWrapper);
}
};







vp.events.getEvent=function $vpfn_HwRgN_kuZ0VWSg7V$5gj_w596$21(oEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

oEvent=oEvent||window.event;


if(typeof oEvent.target!="object"&&oEvent.srcElement)
{
oEvent.target=oEvent.srcElement;
}


oEvent.realTarget=oEvent.target;
if(oEvent.target&&oEvent.target.nodeType==3)
{
oEvent.realTarget=oEvent.target.parentNode;
}


if(typeof oEvent.charCode!="number"&&oEvent.keyCode)
{
oEvent.charCode=oEvent.keyCode;
}


if(typeof oEvent.pageX!="number"&&oEvent.offsetX)
{
oEvent.pageX=oEvent.offsetX;
oEvent.pageY=oEvent.offsetY;
}


if(oEvent.type=="mouseout"&&typeof oEvent.toElement!="undefined"&&!oEvent.relatedTarget)
{
oEvent.relatedTarget=oEvent.toElement;
}
if(oEvent.type=="mouseover"&&typeof oEvent.fromElement!="undefined"&&!oEvent.relatedTarget)
{
oEvent.relatedTarget=oEvent.fromElement;
}


return oEvent;
};






vp.events.isRightClick=function $vpfn_A91OE0I7b8btFYWeQ6bGnQ646$25(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(e.button==2||e.type=="contextmenu")
{
return true;
}
};







vp.events.isVisibleKeyCode=function $vpfn_fuHKl38Ro5qfXMOM_O6H6w660$29(iKeyCode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(iKeyCode>=112&&iKeyCode<=123)
{
return false;
}

if(iKeyCode>=33&&iKeyCode<=40)
{
return false;
}

if(iKeyCode>=14&&iKeyCode<=31)
{
return false;
}

switch(iKeyCode)
{
case 9:
case 45:
case 91:
case 145:
return false;
break;
default:
return true;
}
return true;
};







vp.events.isFreedFunction=function $vpfn_GwjpJjtInqi$aMKQCz6fog698$28(fnPointer)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
try
{
var oTemp=fnPointer.valueOf();
}
catch(ex)
{
return true;
}

return false;
};










vp.events.CustomEvent=function $vpfn_tosjteHfKa4K1YE1lIfqoQ721$24(oObj,sEventName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var _aHandlers=[];
var _oObj=oObj;
var _sEventName=sEventName;

var me=this;

this.useUnsafeClosures=false;





this.addHandler=function $vpfn_e_iG77sRRXaI4BDZ_Iukig735$22(fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fn;
if(me.useUnsafeClosures)
{
fn=fnHandler;
}
else
{
fn=fnHandler.__isClosure?fnHandler:fnHandler.getClosure(_oObj);
}

fn.__freedCheck=true;
_aHandlers.push(fn);

};




var removeFreedHandlers=function $vpfn_wDgv78h769TJPKxpRrGo8g755$30()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var i=0;i<_aHandlers.length;i++)
{
if(vp.events.isFreedFunction(_aHandlers[i]))
{
_aHandlers.splice(i,1);
i--;
}
}
};





this.removeHandler=function $vpfn_YFNFBK2_F$QIzuTEEvdGug771$25(fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
removeFreedHandlers();

for(var i=0;i<_aHandlers.length;i++)
{
var bRemove=false;

if(me.useUnsafeClosures&&_aHandlers[i]==fnHandler)
{
bRemove=true;
}
else if(_aHandlers[i].__funId==fnHandler.__funId)
{
bRemove=true;
}

if(bRemove)
{
_aHandlers.splice(i,1);
return;
}
}
};




this.removeAll=function $vpfn_IIlmsSWH7_NqhSxtn0X5jQ799$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_aHandlers=[];
};





this.fire=function $vpfn_NmXaAzeeVV_uaKiio4ejgA808$16(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!e)
{
e={};
}




if(!e.target&&!e.srcElement)
{
e.target=_oObj;
}

if(!e.type)
{
e.type=_sEventName;
}

removeFreedHandlers();

for(var i=0;i<_aHandlers.length;i++)
{


_aHandlers[i](e);
}

return e.cancelCustomEvent?false:true;
};
};

vp.events.CustomAggregatedEvent=function $vpfn_PdX2qmP07JP18PH05ZcGZg841$34(oObj,sEventName,iAggregationDelay)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

this.inheritFrom=vp.events.CustomEvent;
this.inheritFrom(oObj,sEventName);

this.aggregationDelay=iAggregationDelay||350;

var _iTimer=null;

var fire_base=this.fire;

this.fire=function $vpfn_NmXaAzeeVV_uaKiio4ejgA854$16(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_iTimer!==null)
{
clearTimeout(_iTimer);
_iTimer=null;
}

setTimeout(function $vpfn_0vij3rsKG_z8Eo$BbgQw1A862$19(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}fire_base(e);},me.aggregationDelay);
};
};

vp.events._globalEvents={};




vp.events._getGlobalEvent=function $vpfn_EEJyK4pvA_6$9QWQiyGEXA871$28(sNamespace,sEventName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var namespacedEvents=vp.events._globalEvents[sNamespace];

if(!namespacedEvents)
{
vp.events._globalEvents[sNamespace]=namespacedEvents={};
}

if(!namespacedEvents[sEventName])
{
namespacedEvents[sEventName]=new vp.events.CustomEvent(vp.events._globalEvents,sEventName);
}

return namespacedEvents[sEventName];
};





vp.events.fireGlobalEvent=function $vpfn_q1SuEWY$qnJUKMxBlJBvvQ892$28(sNamespace,sEventName,oEventData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oCustomEvent=vp.events._getGlobalEvent(sNamespace,sEventName);
oCustomEvent.fire(oEventData);
};




vp.events.addGlobalEventHandler=function $vpfn_UcahzIeitnI5txNcw$L19Q901$34(sNamespace,sEventName,fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oCustomEvent=vp.events._getGlobalEvent(sNamespace,sEventName);
oCustomEvent.addHandler(fnHandler);
};





vp.events.addOnDOMLoadHandler=function $vpfn_RpXkwTacAkfP_CAXjwYkbg911$32(fnCallback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fnCallbackWrapperInner=vp.events._getHandlerWrapper(fnCallback,"DOMContentLoaded");

var fnCallbackWrapper=function $vpfn_9bUZlh2AUJZbbPJFBbPQdA915$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(arguments.callee.done)
{
return;
}


arguments.callee.done=true;

fnCallbackWrapperInner({type:"DOMContentLoaded"});
};





if(!vp.events._domReadyEventInitialized)
{
vp.events._domReadyEventInitialized=true;






jQuery(document).ready(vp.events._fireOnDOMLoad);
}




if(document.addEventListener)
{
document.addEventListener("FakeDOMContentReady",fnCallbackWrapper,false);
}
else if(document.documentElement.attachEvent)
{




document.attachEvent(
"ondataavailable",
function $vpfn_0vij3rsKG_z8Eo$BbgQw1A960$12(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(e.eventName=="FakeDOMContentReady")
{
fnCallbackWrapper();
}
});
}
};


vp.events.addOnDOMLoadHandler(function(){});






vp.events.runAfterDOMLoadComplete=function $vpfn_$y_tx3AzlsxBuswoHFXfxQ978$36(fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.events.isDOMLoadComplete)
{
fnHandler();
}
else
{
vp.events.addOnDOMLoadHandler(fnHandler);
}
};






vp.events._eventHashProps=[
"type",
"altKey",
"altLeft",
"button",
"clientX",
"clientY",
"ctrlKey",
"ctrlLeft",
"dataFld",
"offsetX",
"offsetY",
"propertyName",
"qualifier",
"reason",
"repeat",
"screenX",
"screenY",
"shiftKey",
"shiftLeft",
"srcUrn",
"x",
"y"];





vp.events._getEventSignature=function $vpfn_QC35Rut3Z$_rx_qzP3i9rA1023$31(oEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aHash=[];
var iLen=vp.events._eventHashProps.length;

for(var i=0;i<iLen;i++)
{
var sProp=vp.events._eventHashProps[i];
var sVal="o";
switch(typeof(oEvent[sProp]))
{
case"string":
case"number":
sVal=oEvent[sProp];
break;
case"boolean":
sVal=oEvent[sProp]?1:0;
break;
default:
break;
}

aHash.push(sVal);
}

return aHash.join("");
};





vp.events._ieEventsPropertyCache=[];






vp.events._getIEEventsPropertyFromCache=function $vpfn_HBwc49t3wYA84x9zJCvKsw1062$42(sID)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var i=vp.events._ieEventsPropertyCache.length-1;i>=0;i--)
{
if(vp.events._ieEventsPropertyCache[i].id==sID)
{
return vp.events._ieEventsPropertyCache[i];
}
}

return null;
};







vp.events.setEventData=function $vpfn_SYUGkMfct7FQMo4Z6tNtSw1081$25(oEvent,sKey,vValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(document.all)
{

var sID=vp.events._getEventSignature(oEvent);
var oCachedProps=vp.events._getIEEventsPropertyFromCache(sID);

if(!oCachedProps)
{
oCachedProps={
"id":sID,
"customAttributes":{}
};

oCachedProps.customAttributes[sKey]=vValue;

vp.events._ieEventsPropertyCache.push(oCachedProps);
}
else
{
oCachedProps.customAttributes[sKey]=vValue;
}
}
else
{
if(!oEvent.customAttributes)
{
oEvent.customAttributes={};
}

oEvent.customAttributes[sKey]=vValue;
}
};








vp.events.getEventData=function $vpfn_1nLsMlVRKFRYM8g2bDrZNw1123$25(oEvent,sKey)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(document.all)
{
var aCache=vp.events._ieEventsPropertyCache;


var iLen=vp.events._ieEventsPropertyCache.length;
if(iLen>100)
{
vp.events._ieEventsPropertyCache=
vp.events._ieEventsPropertyCache.slice(iLen-100);
}

var sID=vp.events._getEventSignature(oEvent);
var oCachedProps=vp.events._getIEEventsPropertyFromCache(sID);

if(oCachedProps)
{
return oCachedProps.customAttributes[sKey];
}
}
else
{
if(oEvent.customAttributes&&typeof(oEvent.customAttributes[sKey])!="undefined")
{
return oEvent.customAttributes[sKey];
}
}

return null;
};









vp.events.fireEvent=function $vpfn_2ys8WgHXvtry9jsDRZPHOw1164$22(oTarget,sEvent,oSrcEvent,oCustomArgs)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oEventArgs=
{
bubbles:true,
cancelable:true,
ctrlKey:false,
altKey:false,
shiftKey:false,
metaKey:false,
keyCode:0,
charCode:0,
button:0,
detail:1,
screenX:1,
screenY:1,
clientX:1,
clientY:1,
relatedTarget:oTarget
};

if(oSrcEvent)
{
for(var sProp in oEventArgs)
{
oEventArgs[sProp]=oSrcEvent[sProp];
}
}


if(document.createEvent)
{
var oEvent=null;
if(sEvent.indexOf("key")!=-1)
{
oEvent=document.createEvent("KeyboardEvent");
(oEvent.initKeyEvent||oEvent.initKeyboardEvent).call(oEvent,
sEvent,
oEventArgs.bubbles,
oEventArgs.cancelable,
window,
oEventArgs.ctrlKey,
oEventArgs.altKey,
oEventArgs.shiftKey,
oEventArgs.metaKey,
oEventArgs.keyCode,
oEventArgs.charCode);
}
else
{
oEvent=document.createEvent("MouseEvents");

oEvent.initMouseEvent(
sEvent,
oEventArgs.bubbles,
oEventArgs.cancelable,
window,
oEventArgs.detail,
oEventArgs.screenX,
oEventArgs.screenY,
oEventArgs.clientX,
oEventArgs.clientY,
oEventArgs.ctrlKey,
oEventArgs.altKey,
oEventArgs.shiftKey,
oEventArgs.metaKey,
oEventArgs.button,
oEventArgs.relatedTarget);
}

if(oCustomArgs)
{
for(var sCustomProp in oCustomArgs)
{
oEvent[sCustomProp]=oCustomArgs[sCustomProp];
}
}

oTarget.dispatchEvent(oEvent);
}

else
{
oTarget.fireEvent("on"+sEvent);
}
};





vp.events.isModifierKey=function $vpfn_oShNwR9CZ6GUZYuG401F2Q1255$26(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.browser.OS.isMac?e.metaKey:e.ctrlKey;
};







vp.events.EventManager=function $vpfn_Eo3Ag9GEfJn$S_YP9EeRgQ1266$25()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var _aEvents=[];








this.add=function $vpfn_h09qlWV1JOycGuPN$Fz4cQ1277$15(oElement,sEvent,fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.events.add(oElement,sEvent,fnHandler);
_aEvents.add([oElement,sEvent,fnHandler]);
};








this.remove=function $vpfn_YTg_qrM1px4WLL6gMvIe7g1290$18(oElement,sEvent,fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var i=0;i<_aEvents.length;i++)
{
if(oElement==_aEvents[i][0]&&
sEvent==_aEvents[i][1]&&
fnHandler==_aEvents[i][2])
{
_aEvents.remove(i);
vp.events.remove(oElement,sEvent,fnHandler);
break;
}
}
};




this.removeAll=function $vpfn_IIlmsSWH7_NqhSxtn0X5jQ1308$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var i=0;i<_aEvents.length;i++)
{
vp.events.remove(_aEvents[i][0],_aEvents[i][1],_aEvents[i][2]);
}
_aEvents=[];
};
};
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}




if(typeof vp=="undefined"){
var vp={};
}





vp.date=function(){};


vp.date.Months=["January","February","March",
"April","May","June","July",
"August","September","October",
"November","December"];

vp.date.Days=["Sunday","Monday","Tuesday",
"Wednesday","Thursday",
"Friday","Saturday"];



































Date.prototype.format=function $vpfn_BtV30JjVz_nqQfdXJb_Uew62$24(sFormat){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sDate=sFormat;


sDate=sDate.replace(/yyyy/gi,this.getFullYear());


sDate=sDate.replace(/yy/gi,this.getFullYear().toString().substring(2,4));


sDate=sDate.replace(/month/gi,vp.date.Months[this.getMonth()]);


sDate=sDate.replace(/mon/gi,vp.date.Months[this.getMonth()].substring(0,3));


sDate=sDate.replace(/mmm/gi,this.getMonth()+1);


sDate=sDate.replace(/hh24/gi,this.getHours());


sDate=sDate.replace(/hh/gi,this.getHours()>12?this.getHours()-12:this.getHours());


var mm=this.getMinutes().toString();
if(mm.length==1){
mm="0"+mm;
}
sDate=sDate.replace(/mm/gi,mm);


var ss=this.getSeconds().toString();
if(ss.length==1)
{
ss="0"+ss;
}
sDate=sDate.replace(/ss/gi,ss);


var ms=this.getMilliseconds().toString();
while(ms.length<4)
{
ms="0"+ms;
}
sDate=sDate.replace(/ms/gi,ms);


sDate=sDate.replace(/ddd/gi,vp.date.Days[this.getDay()].substring(0,3));


sDate=sDate.replace(/dd/gi,this.getDate());


sDate=sDate.replace(/day/gi,vp.date.Days[this.getDay()]);


var meridian=this.getHours()<12?'AM':'PM';
sDate=sDate.replace(/meridian/gi,meridian);


var d=new Date();
var tz=d.getTimezoneOffset();
var timezone="";
if(tz<0)
{
timezone="GMT-"+tz/60;
}
else if(tz===0)
{
timezone="GMT";
}
else
{
timezone="GMT+"+tz/60;
}
sDate=sDate.replace(/timezone/gi,timezone);


var minutes=this.getMinutes().toString();


if(minutes.length==1)
{
minutes="0"+minutes;
}
var time24=this.getHours()+":"+minutes;
sDate=sDate.replace(/time24/gi,time24);


var time=this.getHours()+":"+minutes+meridian;
sDate=sDate.replace(/time/gi,time);

return sDate;
};






Date.prototype.toShortDateString=function $vpfn_XPcfYyG1$c5TeEyTvvUuGg163$35()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.format('mmm/dd/yyyy');
};






Date.prototype.toShortTimeString=function $vpfn_q0rycWDPZrtE9kY5xQVBWw173$35()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.format('hh:mm meridian');
};


var DateInterval={
Day:'d',
DayOfYear:'y',
Hour:'h',
Minute:'n',
Month:'m',
Quarter:'q',
Second:'s',
Weekday:'w',
WeekOfYear:'ww',
Year:'yyyy',
Millisecond:'ss'
};








Date.prototype.addInterval=function $vpfn_8MtecfaM9d2AfwfpyZDylg200$29(iValue,sInterval)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iYears=0,iMonths=0,iDays=0,iHours=0,iMinutes=0,iSeconds=0,nMilliseconds=0;

switch(sInterval)
{
case DateInterval.Year:
iYears=iValue;
break;
case DateInterval.Month:
iMonths=iValue;
break;
case DateInterval.Day:
iDays=iValue;
break;
case DateInterval.Hour:
iHours=iValue;
break;
case DateInterval.Minute:
iMinutes=iValue;
break;
case DateInterval.Second:
iSeconds=iValue;
break;
case DateInterval.Millisecond:
nMilliseconds=iValue;
break;
default:
break;
}

return new Date(this.getFullYear()+iYears,this.getMonth()+iMonths,this.getDate()+iDays,this.getHours()+iHours,this.getMinutes()+iMinutes,this.getSeconds()+iSeconds,this.getMilliseconds()+nMilliseconds);
};







Date.prototype.addMilliseconds=function $vpfn_oi5kW2DugDXtXGa5n8ivtg240$33(iValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.addInterval(iValue,DateInterval.Millisecond);
};







Date.prototype.addSeconds=function $vpfn_sq$NCM43cXp5PJlAwWOl9A251$28(iValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.addInterval(iValue,DateInterval.Second);
};







Date.prototype.addMinutes=function $vpfn_o7ve7Rui9utFD5hQ$EyUvA262$28(iValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.addInterval(iValue,DateInterval.Minute);
};







Date.prototype.addHours=function $vpfn_zvUn4b4g$o39y7v7RXOPDg273$26(iValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.addInterval(iValue,DateInterval.Hour);
};







Date.prototype.addDays=function $vpfn_rEASraTkt8bx_6F4jbfKsg284$25(iValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.addInterval(iValue,DateInterval.Day);
};







Date.prototype.addMonths=function $vpfn_v3tgQr9m$AE5S0v6WqgjDw295$27(iValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.addInterval(iValue,DateInterval.Month);
};







Date.prototype.addYears=function $vpfn_OabLU61VBB7n7LsdUIQzUw306$26(iValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.addInterval(iValue,DateInterval.Year);
};










Date.prototype.formatDotNet=function $vpfn_bDFsEryOGgKO$QbsbgOfzg320$30(sFormat)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(sFormat)=="undefined")
{
return this.toUTCString().replace("UTC","GMT");
}

var sDate=sFormat;


var dd=this.getDate().toString();
if(dd.length==1)
{
dd="0"+dd;
}
sDate=sDate.replace(/dd/,dd);


sDate=sDate.replace(/d/,this.getDate());


var MM=(this.getMonth()+1).toString();
if(MM.length==1)
{
MM="0"+MM;
}
sDate=sDate.replace(/MM/,MM);


sDate=sDate.replace(/M/,this.getMonth()+1);


sDate=sDate.replace(/yyyy/,this.getFullYear());


sDate=sDate.replace(/HH/,this.getHours());


sDate=sDate.replace(/h/,this.getHours()>12?this.getHours()-12:this.getHours());


var mm=this.getMinutes().toString();
if(mm.length==1)
{
mm="0"+mm;
}
sDate=sDate.replace(/mm/,mm);


var meridian=this.getHours()<12?'AM':'PM';
sDate=sDate.replace(/tt/,meridian);

return sDate;
};








Date.prototype.toLocalFormattedString=function $vpfn_urayDFTA1dBj40SUBGWBAQ382$40(sFormat)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDate=this.addMinutes(-this.getTimezoneOffset());
return oDate.formatDotNet(sFormat);
};
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}






if(typeof vp=="undefined"){
var vp={};
}





vp.forms=function(){};








vp.forms.check=function $vpfn_fcRvOMfmlFPrqslPvckmsA27$17(vElement){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.toggleCheck(vElement,true);
};







vp.forms.disable=function $vpfn_iYdb5bzI8vWpwVWapQVdNA37$19(vElement){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.toggleEnabled(vElement,false);
};







vp.forms.enable=function $vpfn_C41Bm0h93$BTwn$OAjZyxA47$18(vElement){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.toggleEnabled(vElement,true);
};










vp.forms.selectOption=function $vpfn_xciQ8snL$ZMPvEO8V1aOdA60$24(vElement,vOptionId){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.toggleOption(vElement,vOptionId,true);
};











vp.forms.toggleCheck=function $vpfn_wTxBxGeTKGLGPY8XOTD0jw74$23(vElement,bOverride){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


vElement=vp.core.getElement(vElement,"vp.forms.toggleCheck");


if(vElement.tagName=="INPUT"&&(vElement.type=="checkbox"||vElement.type=="radio")){
if(bOverride!==null){
vElement.checked=bOverride;
}else{
vElement.checked=!vElement.checked;
}
}else{
throw new Error("vp.forms.toggleCheck(): Failed because the element (ID "+vElement.id+") is not an <input> tag.");
}
};









vp.forms.toggleEnabled=function $vpfn_s4gzRsPvbVARKqzvBGo1Ow99$25(vElement,bOverride){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


vElement=vp.core.getElement(vElement,"vp.forms.toggleEnabled");


if(bOverride!==null){
vElement.disabled=!bOverride;
}else{
vElement.disabled=!vElement.disabled;
}
};












vp.forms.toggleOption=function $vpfn_VyBmfRjDZcPXYTlXkpTrcQ123$24(vElement,vOptionId,bOverride){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


vElement=vp.core.getElement(vElement,"vp.forms.selectOption");


if(vElement.tagName=="SELECT"){


var oOption=null;
if(typeof vOptionId=="string"){
oOption=vp.ui.get(vOptionId);
}else if(typeof vOptionId=="number"){
oOption=vElement.options[vOptionId];
}


if(!oOption){
throw new Error("vp.forms.toggleOption(): Failed because the option (ID "+vOptionId+") does not exist.");
}


if(bOverride!==null){
oOption.selected=bOverride;
}else{
oOption.selected=!oOption.selected;
}
}else{
throw new Error("vp.forms.toggleOption(): Failed because the element (ID "+vElement.id+") is not a &lt;select&gt; tag.");
}
};








vp.forms.uncheck=function $vpfn_uCBja4NAmSeCD6xBjMzF3A162$19(vElement){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.toggleCheck(vElement,false);
};










vp.forms.unselectOption=function $vpfn_nUBHxzDRIaJqR23mkRJCnw175$26(vElement,vOptionId){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.toggleOption(vElement,vOptionId,false);
};











vp.forms.getFormElement=function $vpfn_tbeJ2eWqCNZImcyG0gj$4w189$26(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElement=vp.core.getElement(vElement,"vp.forms.getFormElement");

if(typeof(vElement)=="string"&&
oElement&&oElement.type&&
oElement.type.toLowerCase()=="radio")
{
oElement=vp.forms.getRadioGroup(vElement);

if(!oElement)
{
throw new Error("No form element was found with the name: "+vElement);
}
}

return oElement;
};












vp.forms.getValue=function $vpfn_9YNe5lymTlEGNFdCtqn$hQ219$20(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.forms.getFormElement(vElement);
var i;


if(vElement[0]&&vElement[0].type&&vElement[0].type.toLowerCase()=="radio")
{
for(i=0;i<vElement.length;i++)
{
if(vElement[i].checked)
{
return vElement[i].value;
}
}

return null;
}

else if((vElement[0]&&vElement[0].type&&vElement[0].type.toLowerCase()=="radio")||(vElement.type&&vElement.type.toLowerCase()=="checkbox"))
{
return vElement.checked?vElement.value:null;
}

else if(vElement.tagName&&vElement.tagName.toLowerCase()=="select")
{

if(vElement.multiple)
{
var arrRet=[];

for(i=0;i<vElement.options.length;i++)
{
if(vElement.options[i].selected)
{
arrRet.push(vElement.options[i].value);
}
}

return arrRet;
}

else
{
return vElement.options[vElement.selectedIndex].value;
}
}

else
{
return vElement.value;
}
};









vp.forms.setValue=function $vpfn_ZxL6kpg0DqM9j7DL1Yn6hw282$20(vElement,vValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.forms.getFormElement(vElement);
var i;


if(vElement[0]&&vElement[0].type&&vElement[0].type.toLowerCase()=="radio")
{
for(i=0;i<vElement.length;i++)
{
if(vElement[i].value==vValue)
{
vElement[i].checked=true;
return;
}
}
}

else if((vElement[0]&&vElement[0].type&&vElement[0].type.toLowerCase()=="radio")||(vElement.type&&vElement.type.toLowerCase()=="checkbox"))
{
throw Error("vp.forms.setValue() has no meaning on an individual radio button or checkbox. Use the 'checked' property instead.");
}

else if(vElement.tagName.toLowerCase()=="select")
{

if(vElement.multiple)
{
var arrVals=vValue.length?vValue:[vValue];

for(i=0;i<vElement.options.length;i++)
{
vElement.options[i].selected=false;

for(var j=0;j<arrVals.length;j++)
{
if(vElement.options[i].value==arrVals[j])
{
vElement.options[i].selected=true;
break;
}
}
}
}

else
{
for(i=0;i<vElement.options.length;i++)
{
if(vElement.options[i].value==vValue)
{
vElement.selectedIndex=i;
break;
}
}
}
}

else
{
vElement.value=vValue;
}
};








vp.forms.addElement=function $vpfn_OQpp1JcuaVAY61_KVc9CFQ354$22(oForm,sType,sName,sValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oInput=document.createElement("INPUT");

oInput.type=sType;
oInput.name=sName;
oInput.value=sValue;

oForm.appendChild(oInput);
};







vp.forms.getRadioGroup=function $vpfn_BUUUq6W2eOB1IWkACh$7qg371$25(sName,vForm)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aGroup=null;
if(vForm)
{
vForm=vp.core.getElement(vForm,"vp.forms.getRadioGroup");
aGroup=vForm[sName];
}
else
{
aGroup=document.getElementsByName(sName);
}

if(aGroup&&aGroup.length>0&&aGroup[0].type&&aGroup[0].type.toLowerCase()=="radio")
{
return aGroup;
}
return null;
};











vp.forms.insertOption=function $vpfn_0o0g26yqQw3A0PvZiEYyCg401$24(oSelect,oOption,iIndex)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(iIndex)=="undefined")
{
iIndex=oSelect.options.length;
}

if(typeof(oOption)=="string")
{
var oNewOption=document.createElement("OPTION");
oNewOption.text=oOption;
oNewOption.value=oOption;
oOption=oNewOption;
}

if(oSelect.options.add)
{
oSelect.options.add(oOption,iIndex);
}
else
{
for(var i=oSelect.options.length;i>=iIndex;i--)
{
var oTemp=oSelect.options[i];
oSelect.options[i]=document.createElement("OPTION");
oSelect.options[i+1]=oTemp;
}

oSelect.options[iIndex]=oOption;
}
};






vp.forms.removeOption=function $vpfn_lYxxlTFEsbYEQniPDEUK8w438$24(oSelect,iIndex)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oSelect.options[iIndex]=null;
};





vp.forms.removeAllOptions=function $vpfn_kwAjHfBdF02Zvf2CEFtywA447$28(oSelect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
while(oSelect.options.length>0)
{
oSelect.options[0]=null;
}
};







vp.forms.isTextBox=function $vpfn_4t$N6sm00_hn1d35Qh5YKQ461$21(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.forms.isTextBox");

var result=false;

if(vElement&&vElement.nodeName)
{
var tagName=vElement.nodeName.toLowerCase();
if((tagName=='input'&&vElement.type&&vElement.type.toLowerCase()=='text')||
(tagName=='textarea'))
{
result=true;
}
}

return result;
};






vp.forms.getSelectedOptionObjects=function $vpfn_20hj4rREK9IGm$TN1CJNUw486$36(oSelect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aRet=[];
if(oSelect.tagName=="SELECT")
{
for(var i=0;i<oSelect.options.length;i++)
{
if(oSelect.options[i].selected)
{
aRet.push(oSelect.options[i]);
}
}
return aRet;
}
};






vp.forms.moveSelectedOptionObjects=function $vpfn_ae9XyzDT1defRbPFIlrbLA507$37(oSelectSource,oSelectTarget)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var i=oSelectSource.options.length-1;i>=0;i--)
{
if(oSelectSource.options[i].selected)
{
vp.forms.insertOption(oSelectTarget,new Option(oSelectSource.options[i].text,oSelectSource.options[i].value,false,false));
vp.forms.removeOption(oSelectSource,i);
}
}
};





vp.forms.clearAllOptions=function $vpfn_oQOOUC14N3QsfhWa5WppxQ523$27(oSelect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
while(oSelect.options.length>0)
{
oSelect.options[0]=null;
}
};





vp.forms._sortOptionsDefaultComparer=function $vpfn_1BfXYyDLeAtJPHINneeD2Q535$39(a,b)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.comparer.caseInsensitive(a.value,b.value);
};








vp.forms.sortOptions=function $vpfn_iiPBCM5SD$KCX5Q6B7ixPQ547$23(oSelect,fnComparer)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aOptions=[];
var i;


for(i=0;i<oSelect.length;i++)
{
aOptions[i]={
text:oSelect.options[i].text,
value:oSelect.options[i].value,
selected:oSelect.options[i].selected
};
}

if(!fnComparer)
{
fnComparer=vp.forms._sortOptionsDefaultComparer;
}

aOptions.sort(fnComparer);

for(i=0;i<oSelect.length;i++)
{
oSelect.options[i].text=aOptions[i].text;
oSelect.options[i].value=aOptions[i].value;
oSelect.options[i].selected=aOptions[i].selected;
}
};





vp.forms.selectAllOptions=function $vpfn_DNzCncHMnO2rKglmt8F40w581$28(oSelect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var i=0;i<oSelect.options.length;i++)
{
oSelect.options[i].selected=true;
}
};







vp.forms.buildQueryStringFromForm=function $vpfn_d3hkD5KDimRR17pxKNSKYw595$36(vParentElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oParentElement=vp.core.getElement(vParentElement,"buildQueryStringFromForm");
var oFieldMap={};


var fnRecurse=function $vpfn_Pug6avyAFemVnsi6CSKspQ601$20(oElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(oElement.nodeType==1)
{

if(oElement.tagName=="INPUT"||
oElement.tagName=="TEXTAREA"||
oElement.tagName=="SELECT")
{

if(oElement.name)
{


if(oElement.type=="radio")
{
if(oElement.checked)
{
oFieldMap[oElement.name]=oElement.value;
}
}
else
{

var sValue=vp.forms.getValue(oElement);
if(sValue!==null)
{
oFieldMap[oElement.name]=sValue;
}
}
}
}


for(var i=0;i<oElement.childNodes.length;i++)
{
fnRecurse(oElement.childNodes[i]);
}
}
};

fnRecurse(oParentElement);

var oQS=new vp.web.QueryString();
oQS.items=oFieldMap;
return oQS;
};








vp.forms.checkUrlLengthAndSubmitForm=function $vpfn_oyxxOzxrHfDjJfk0noirCg657$39(sFormName,fnLogError)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.forms.logErrorIfFormUrlIsTooLong(sFormName,fnLogError);
document[sFormName].submit();
};

vp.forms.MAXIMUM_URL_LENGTH_FOR_GET=2000;






vp.forms.logErrorIfFormUrlIsTooLong=function $vpfn_M0r7pWc5BJSATPN9zKN_2w670$38(sFormName,fnLogError)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
try
{
var oQS=vp.forms.buildQueryStringFromForm(sFormName);
var strErrorMessage=null;
var intQSLength=0;
if(oQS)
{
intQSLength=oQS.toString().length;
var oUrl=new vp.web.URL(window.location);




intQSLength=intQSLength+oUrl.toString().length-oUrl.queryString.length+1;
}

if(intQSLength>vp.forms.MAXIMUM_URL_LENGTH_FOR_GET)
{
var frmObject=vp.ui.get(sFormName);
var oActionUrl=new vp.web.URL(frmObject.action);
frmObject.action=oActionUrl.pathname;
frmObject.method='post';

if(vp.forms.MAXIMUM_URL_LENGTH_FOR_GET>0&&fnLogError)
{


fnLogError();
}
}
}
catch(ex)
{
}

return true;
};


if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}







if(typeof vp=="undefined"){
var vp={};
}





vp.http=function(){};


vp.http.lastResponseHeader=null;

var USE_JQUERY_FOR_AJAX=false;









vp.http._checkForValidStatus=function $vpfn_Wk2fE6ABtUo7d0dR7tfI1g34$31(oHttp,sUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iStatus=0;

try
{
iStatus=oHttp.status;
}
catch(e)
{


throw new Error("Error trying to contact the URL ("+sUrl+"). This is usually caused by cross-window AJAX calls.");
}

if(iStatus!=200&&iStatus!==0)
{
if(iStatus==304)
{
throw new Error("The URL ("+sUrl+") was cached by the browser. Set no-cache headers on the URL and try again.");
}
else
{
var oErr;



if(oHttp.responseText.indexOf("{")===0)
{
try
{
var oJson=vp.http.parseJSON(oHttp.responseText);
if(oJson.Message)
{
oErr=new Error("Web service error: "+oJson.Message);
oErr.noRetry=true;
}
}
catch(ex)
{
}
}



if(!oErr)
{
oErr=new Error("Received status code "+iStatus+" trying to contact the URL ("+sUrl+").");
}

oErr.httpStatus=iStatus;
throw oErr;
}
}
};







vp.http.createRequest=function $vpfn_9yBoR2AZbTm6gEIiakkSlQ96$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof XMLHttpRequest!="undefined")
{
return new XMLHttpRequest();
}
else if(typeof ActiveXObject!="undefined")
{
try
{
return new ActiveXObject("MSXML2.XmlHttp");
}
catch(ex)
{
throw new Error("vp.http.createRequest() failed: Could not create ActiveX object.");
}
}
else
{
throw new Error("vp.http.createRequest() failed: No XMLHttp implementation available.");
}
};






vp.http.enabled=function $vpfn_0ssiqtoBRAErow9ljn5UEA124$18()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof XMLHttpRequest!="undefined")
{
return true;
}
else if(typeof ActiveXObject!="undefined")
{
try
{
var oHttp=vp.http.createRequest();
return true;
}
catch(ex)
{
return false;
}
}
else
{
return false;
}
};

vp.http._readResponseHeaders=function $vpfn_tY5eucXXtSSQ5RzpVXRp$Q148$31(xhr,url)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oResponseHeader;

try
{
oResponseHeader=new vp.web.ResponseHeader(xhr.getAllResponseHeaders());
}
catch(ex)
{
if(window.isDebug)
{
throw new Error("Failed to get response headers: "+ex.message+" for url: "+url);
}

vp.instrumentation.logError("vp.http._syncRequest: Failed to load response headers for request. url = "+url);
}

return oResponseHeader.items;
};











vp.http._asyncRequest=function $vpfn_csCcUyyyhybk8wX9rladSw179$24(sUrl,sMethod,oRequestHeaders,sData,fnCallback,fnErrorHandler,iAttemptCount)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(USE_JQUERY_FOR_AJAX)
{
var callbackWrapper;
if(fnCallback)
{
callbackWrapper=function $vpfn_QSGel5nEl5aDqbnWogwqRw186$30(data,textStatus,xhr)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
fnCallback(data,vp.http._readResponseHeaders(xhr,sUrl));
};
}

$.ajax({
url:sUrl,
type:sMethod,
headers:oRequestHeaders,
data:sData,
success:callbackWrapper,
error:fnErrorHandler,
dataType:"text"
});
}

if(typeof(iAttemptCount)=="undefined")
{
iAttemptCount=3;
}

var oHttp=this.createRequest();

oHttp.open(sMethod,sUrl,true);

var sContentType;
if(typeof(oRequestHeaders)=="string")
{
sContentType=oRequestHeaders;
}
else if(oRequestHeaders&&(typeof(oRequestHeaders)=="object"))
{
for(var sHeaderName in oRequestHeaders)
{
oHttp.setRequestHeader(sHeaderName,oRequestHeaders[sHeaderName]);
}
}

if(sContentType)
{
oHttp.setRequestHeader("Content-Type",sContentType);
}

if(sData)
{

if(!vp.browser.isWebKit)
{
oHttp.setRequestHeader("Content-Length",sData.toString().length.toString());
}
}
else
{
sData=null;
}

if(fnCallback)
{
var fnCheckForValidStatus=vp.http._checkForValidStatus;
oHttp.onreadystatechange=function $vpfn_XBfKwbaqjIhHQoqjXO6Riw246$35()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(oHttp.readyState==4)
{

try
{
fnCheckForValidStatus(oHttp,sUrl);
}
catch(ex)
{
if(ex.httpStatus>=400&&!ex.noRetry)
{

if(iAttemptCount>0)
{
var fnRepost=function $vpfn_9giJFP$7TxQKxSzKTU1qwg263$43()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.http._asyncRequest(sUrl,sMethod,sContentType,sData,fnCallback,fnErrorHandler,iAttemptCount-1);
};
setTimeout(fnRepost,1000);

return;
}
}

if(fnErrorHandler)
{
fnErrorHandler(ex);
return;
}
else
{
throw new Error(ex.message+" in vp.http._asyncRequest(): "+sUrl);
}
}




var fnCallbackWrapper=function $vpfn_U9MtI3f03mUxD_eN$Eepbw287$40()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!fnCallback)
{
return;
}


var responseHeaders=vp.http._readResponseHeaders(oHttp,sUrl);
var responseText=null;

try
{
responseText=oHttp.responseText;
}
catch(ex)
{


}

fnCallback(responseText,responseHeaders);
};

setTimeout(fnCallbackWrapper,1);


oHttp.onreadystatechange=function(){};
}
};
}

try
{
oHttp.send(sData);
}
catch(oError)
{
throw new Error("Error occurred while requesting URL ("+sUrl+"):"+oError.message);
}
};










vp.http._syncRequest=function $vpfn_G0ixTtDXLlkp4969zglkqQ338$23(sUrl,sMethod,sContentType,sData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oHttp=this.createRequest();
oHttp.open(sMethod,sUrl,false);

if(sContentType)
{
oHttp.setRequestHeader("Content-Type",sContentType);
}

if(sData)
{

if(!(vp.browser.isWebKit))
{
oHttp.setRequestHeader("Content-Length",sData.toString().length.toString());
}
}
else
{
sData=null;
}

try
{
oHttp.send(sData);
}
catch(oError)
{
throw new Error("Error occurred while requesting URL ("+sUrl+"):"+oError.message);
}


this._checkForValidStatus(oHttp,sUrl);


var responseText=null;

try
{
responseText=oHttp.responseText;
}
catch(ex)
{


}

return responseText;
};







vp.http.get=function $vpfn_Bn5Fgfy2tU$lPSDVXUhgJA395$14(sUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.http._syncRequest(sUrl,"GET");
};










vp.http.getAsync=function $vpfn_d731gNCADaGD8LmYacEV8Q409$19(sUrl,fnCallback,fnErrorHandler,iAttemptCount)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.http._asyncRequest(sUrl,"GET",null,null,fnCallback,fnErrorHandler,iAttemptCount);
};







vp.http.imagePing=function $vpfn_cBMLsR8v4XmZD57j6yy_eg420$20(sUrl,callback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oImage=new Image();

if(callback)
{
oImage.onload=callback;
}

oImage.src=sUrl;
};









vp.http.post=function $vpfn_$i9JwrGwfCxS$JzY4MlAqA440$15(sUrl,sData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.http._syncRequest(sUrl,"POST","application/x-www-form-urlencoded",sData);
};











vp.http.postAsync=function $vpfn_l5QGMpDZ7RsFsH0wMnFgqw455$20(sUrl,sData,fnCallback,fnErrorHandler,iAttemptCount)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.http._asyncRequest(sUrl,"POST","application/x-www-form-urlencoded",sData,fnCallback,fnErrorHandler);
};








vp.http.postJson=function $vpfn_iMhZSEqgCvef9DV2ufyn3g467$19(sUrl,oData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sData=vp.http.serializeJSON(oData);
var sResponse=vp.http._syncRequest(sUrl,"POST","application/json",sData);
return vp.http.parseJSON(sResponse);
};











vp.http.callAsmxAsync=function $vpfn_4DFIWc8zlsdzYWpW3HpfbA484$24(sUrl,sMethodName,oData,fnCallback,fnErrorHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return $.ajaxAsmx(
{
url:sUrl,
methodName:sMethodName,
data:oData,
success:fnCallback,
error:fnErrorHandler
});
};







vp.http.populateNodeWithHTML=function $vpfn_xEjIvmxrtkWK9vKDRBsRiA502$31(vNodeOrId,sHTML)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oNode=vp.core.getElement(vNodeOrId,"vp.http.populateNodeWithHTML");

oNode.innerHTML=sHTML;


var aScripts=oNode.getElementsByTagName("SCRIPT");
for(var i=0;i<aScripts.length;i++)
{
eval(aScripts[i].innerHTML);
}
};





vp.http.getBrowserMaxURLSize=function $vpfn_qi8E1Rra2tAOKKvUbNKjzw520$31()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

return vp.ui.browserSupportsPNG()?1900:760;
};













vp.http.getURLSizedForGET=function $vpfn_1EG5PYnpFla16eoeGvkKCw538$28(vUrl,vPotentiallyLargeParams,fnCallback,bForceSafeUrl,bSamePath)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sUrl=vUrl.toString();

if(sUrl.length<vp.http.getBrowserMaxURLSize()&&!bForceSafeUrl)
{
if(fnCallback)
{
fnCallback(sUrl);
return false;
}
else
{
return sUrl;
}
}

var oUrl=new vp.web.URL(sUrl);
var sQueryString;


if(!vPotentiallyLargeParams)
{
sQueryString=oUrl.queryString;
oUrl.queryString="";
}
else
{
var aParams;
if(typeof(vPotentiallyLargeParams)=="string")
{
aParams=[];
aParams.add(vPotentiallyLargeParams);
}
else
{
aParams=vPotentiallyLargeParams;
}

var oData={};
for(var i=0;i<aParams.length;i++)
{
var sValue=oUrl.getItem(aParams[i]);

if(sValue)
{
oData[aParams[i]]=sValue;
oUrl.removeItem(aParams[i]);
}
}

sQueryString=vp.web.createQueryString(oData);
}

var oPostData=new vp.web.QueryString();
oPostData.setItem("long_url_storage_data",sQueryString);

var fnCallbackWrapper=function $vpfn_U9MtI3f03mUxD_eN$Eepbw595$28(sResponse)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oResponse=vp.http.parseJSON(sResponse);
if(oResponse.isError)
{
throw new Error("Couldn't store text data: "+oResponse.message);
}

oUrl.setItem(vp.http._longURLStorageDataQueryString,oResponse.id);

var sUrl=oUrl.toString();

if(sUrl.length>vp.http.getBrowserMaxURLSize())
{
throw new Error("URL too long for GET");
}

if(fnCallback)
{
fnCallback(oUrl.toString());
return false;
}
else
{
return oUrl.toString();
}
};

var sPath=bSamePath?oUrl.pathname:vp.http._urlDataStorageWebServiceURL;
if(fnCallback)
{
vp.http.postAsync(sPath,oPostData.toString(),fnCallbackWrapper);
return false;
}
else
{
return fnCallbackWrapper(vp.http.post(sPath,oPostData.toString()));
}
};

vp.http._longURLStorageDataQueryString="long_url_storage_id";


vp.http._urlDataStorageWebServiceURL="/services/long-url-storage-service.aspx";

vp.http.serializeJSON=JSON.stringify;






vp.http.parseJSON=function $vpfn_Rv6FC2J3bNggvB8qgUsHdQ647$20(sData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(sData)==="undefined")
{
return null;
}

try
{
return eval("("+sData+")");
}
catch(ex)
{
throw new Error("Invalid JSON:"+sData);
}
};

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;


}




if(typeof vp=="undefined"){
var vp={};
}





if(!vp.text)
{
vp.text=function(){};
}




vp.text.htmlPattern=/<(?:.|\s)*?>/g;








vp.text.hasRtlText=function $vpfn_B71gJiWCMfcyJLGOXIlmgw34$21(sText){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


if(typeof sText!="string")
{
throw new Error("vp.text.hasRtlText(): Text is null.");
}

var iLen=sText.length;
for(var i=0;i<iLen;i++)
{
if(vp.text.isRtlCode(sText.charCodeAt(i)))
{
return true;
}
}

return false;
};








vp.text.isRtlCode=function $vpfn_p2_UZiIIAYev4BCDBGEnOg61$20(iCode){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(iCode<0x0590){
return false;
}else if(iCode<=0x074f){
return true;
}else if(iCode<0x0780){
return false;
}else if(iCode<=0x07bf){
return true;
}else if(iCode<0xfb1d){
return false;
}else if(iCode<=0xfefc){
return true;
}else{
return false;
}
};







vp.text.stripHtml=function $vpfn_ssWis6FiB9t2CtYdYeWF$w85$20(sText){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof sText!="string"){
throw new Error("vp.text.stripHtml(): Text is null.");
}


return sText.replace(this.htmlPattern,"");
};







vp.text.stripRtlText=function $vpfn_JZq9SY3GOq0DbhOY$PieQw101$23(sText){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof sText!="string")
{
throw new Error("vp.text.stripRtlText(): Text is null.");
}

var aOut=[];
var iLen=sText.length;
for(var i=0;i<iLen;i++)
{
if(!vp.text.isRtlCode(sText.charCodeAt(i)))
{
aOut.push(sText.charAt(i));
}
}

return aOut.join("");
};




RegExp.escape=function $vpfn_6gdv$OIx_4gcxA6ziZUPFA124$16(text)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!arguments.callee.sRE)
{
var specials=[
'/','.','*','+','?','|',
'(',')','[',']','{','}','\\',
'$','#','@',' ','%'
];

arguments.callee.sRE=new RegExp('(\\'+specials.join('|\\')+')','g');
}

return text.replace(arguments.callee.sRE,'\\$1');
};










vp.text.replace=function $vpfn_aNKp6CveyrmFDv2jV1W53g149$18(sText,sFind,sReplace,bCaseInsensitive)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sRegExp=RegExp.escape(sFind);
var sOptions=bCaseInsensitive?"gi":"g";
var oRegExp=new RegExp(sRegExp,sOptions);
return sText.replace(oRegExp,sReplace);
};






vp.text.trim=function $vpfn_53hS90WrhRqW5jbK6V6d6g162$15(sText){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

try
{
sText=sText.toString();
}
catch(e)
{
throw new Error("vp.text.trim(): Argument could not be converted to a string.");
}


return sText.replace(/^\s*(.*?)\s*$/,"$1");
};




String.prototype.trim=function $vpfn_HjimzNhihOAINUiP_aAPdQ180$24(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.text.trim(this);
};








vp.text.truncate=function $vpfn_jQIXagyDYBwxF7qLMyNFfg191$19(sStr,iLen)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(sStr.length-3>iLen)
{
return sStr.substr(0,iLen)+"...";
}
else
{
return sStr;
}
};







String.prototype.startsWith=function $vpfn_w29kKAPjHEllt3FxrM8DMQ209$30(sPrefix,bCaseInsensitive)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!sPrefix)
{
return false;
}
if(sPrefix.length>this.length)
{
return false;
}
var sSubject=bCaseInsensitive?this.toLowerCase():this;
var sCompareTo=bCaseInsensitive?sPrefix.toLowerCase():sPrefix;
return sSubject.substring(0,sPrefix.length)===sCompareTo;
};







String.prototype.endsWith=function $vpfn_6zpVmK7MjFlb8zI6bubWAA230$28(sSuffix,bCaseInsensitive)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!sSuffix)
{
return false;
}
if(sSuffix.length>this.length)
{
return false;
}
var sSubject=bCaseInsensitive?this.toLowerCase():this;
var sCompareTo=bCaseInsensitive?sSuffix.toLowerCase():sSuffix;
return sSubject.substring(sSubject.length-sSuffix.length,sSubject.length)===sCompareTo;
};




String.prototype.truncate=function $vpfn_nQj8h8k1aqEkgWxBLNghwg248$28(iLen){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.text.truncate(this,iLen);
};





String.prototype.format=function $vpfn_aGam4r8eqh9y4uMjWClWoA256$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sStr=this;
for(var i=0;i<arguments.length;i++)
{
var oRe=new RegExp('\\{'+(i)+'\\}','gm');
sStr=sStr.replace(oRe,arguments[i]);
}
return sStr;
};

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}





vp.define("vp.ui");






vp.ui.expand=function $vpfn_9ZH6dR6J0I2MePHHqGLsWg16$15(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.expand");


vElement.style.display="";
};








vp.ui.expandToBlock=function $vpfn_4nUMo8A_krsu7P6$PT6_iw32$22(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.expandToBlock");


vElement.style.display="block";
};






vp.ui.collapse=function $vpfn_1yWFcqRCPeuKgv4tKyrXcg46$17(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.collapse");


vElement.style.display="none";
};






vp.ui.toggleDisplay=function $vpfn_Rr4saFGdn9pKJdGtXdnNcg60$22(vElement,bDisplayBlock)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var objElem=vp.core.getElement(vElement,"vp.ui.toggleDisplay");
if(objElem)
{
if(objElem.style.display=="none")
{
if(bDisplayBlock)
{
objElem.style.display="block";
}
else
{
objElem.style.display="";
}
}
else
{
objElem.style.display="none";
}
}
};







vp.ui.expandAndCollapse=function $vpfn_WrtVsPAlBDlVylP2UsiQ4g90$26(vElementToExpand,vElementToCollapse)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.ui.collapse(vElementToCollapse);
vp.ui.expand(vElementToExpand);
};







vp.ui.expandToBlockAndCollapse=function $vpfn_ApnK9$XfaF5qY4kj1aPU_g102$33(vElementToExpand,vElementToCollapse)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.ui.collapse(vElementToCollapse);
vp.ui.expandToBlock(vElementToExpand);
};






vp.ui.show=function $vpfn_6YncxKvNQ3gjRi9UtAqZ4Q113$13(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"show");


vElement.style.visibility="visible";
vElement.style.display="";
};






vp.ui.hide=function $vpfn_rOKNp3VoMOskSb3whTENYg128$13(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


vElement=vp.core.getElement(vElement,"vp.ui.hide");


vElement.style.visibility="hidden";
};







vp.ui.isVisible=function $vpfn_xtOzAOzm40jXcPmK2PEEWg144$18(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.isVisible");


return vp.ui.getCurrentStyle(vElement,"visibility")!="hidden";
};







vp.ui.isCollapsed=function $vpfn_piw6bw1$EtNg4Oyx3s8eIg159$20(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.isCollapsed");


return vp.ui.getCurrentStyle(vElement,"display")=="none";
};

vp.ui.ensureMaxHeight=function $vpfn_Elhg9loU$cfKixzWdw2_bg168$24(vElement,iMaxHeight)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vElement=vp.core.getElement(vElement,"vp.ui.ensureMaxHeight");

if(typeof(vElement.style.maxHeight)!="undefined")
{
return;
}

if(typeof(iMaxHeight)=="undefined")
{
iMaxHeight=parseInt(new vp.web.CssString(vElement.style.cssText).getItem("max-height"));
}
else
{
vElement.style.maxHeight=iMaxHeight+"px";
}

if(vElement.offsetHeight>iMaxHeight)
{
vElement.style.height=iMaxHeight+"px";
}
};








vp.ui.get=function $vpfn_J6V0iuyaxPutPRd9pHFs7w199$12(sId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof sId!="string")
{
throw new Error("Call to vp.ui.get() with a non-string identifier.");
}


var oElem=document.getElementById?document.getElementById(sId):document.all[sId];


if(!oElem&&sId.indexOf(".")===0)
{
var aItems=vp.ui.getChildrenBySelector(document,sId);
if(aItems.length>0)
{
oElem=aItems[0];
}
}

return oElem;
};








vp.ui.getChildrenBySelector=function $vpfn_2NF9twd9U9p88Gx0cUTZ8g230$30(vElement,sSelector)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.getChildrenBySelector");

var aFound=[];
var iFoundCount=0;


var aTokens=sSelector.split(' ');
var aCurrentContext=new Array(vElement);
var iCurrentContextIndex=0;
for(var i=0;i<aTokens.length;i++)
{
var oToken=aTokens[i].replace(/^\s+/,'').replace(/\s+$/,'');;
if(oToken.indexOf('#')>-1)
{

var aIdBits=oToken.split('#');
var sTagName=aIdBits[0];
var sId=aIdBits[1];
var oElement=vp.ui.get(sId);
if(sTagName&&oElement.nodeName.toLowerCase()!=sTagName)
{

return[];
}

aCurrentContext=new Array(oElement);
continue;
}
if(oToken.indexOf('.')>-1)
{

var aClassBits=oToken.split('.');
var sClassTagName=aClassBits[0];
var sClassName=aClassBits[1];
if(!sClassTagName)
{
sClassTagName='*';
}

aFound=[];
iFoundCount=0;
for(var h=0;h<aCurrentContext.length;h++)
{
var aTagElements;
if(sClassTagName=='*')
{
aTagElements=vp.ui.getAllChildren(aCurrentContext[h]);
}
else
{
aTagElements=aCurrentContext[h].getElementsByTagName(sClassTagName);
}
for(var j=0;j<aTagElements.length;j++)
{
aFound[iFoundCount]=aTagElements[j];
iFoundCount++;
}
}
aCurrentContext=[];
iCurrentContextIndex=0;
for(var k=0;k<aFound.length;k++)
{



var oClassName=aFound[k].className;

if(oClassName)
{
if(typeof oClassName.baseVal!="undefined")
{
oClassName=oClassName.baseVal;
}

if(oClassName.match(new RegExp('(?:^|\\s)'+sClassName+'(?:\\s|$)')))
{
aCurrentContext[iCurrentContextIndex]=aFound[k];
iCurrentContextIndex++;
}
}
}
continue;
}

if(oToken.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/))
{
var sAttrSelectorTagName=RegExp.$1;
var sAttrName=RegExp.$2;
var sAttrOperator=RegExp.$3;
var sAttrValue=RegExp.$4;
if(!sAttrSelectorTagName)
{
sAttrSelectorTagName='*';
}

aFound=[];
iFoundCount=0;
for(var q=0;q<aCurrentContext.length;q++)
{
var aElements;
if(sAttrSelectorTagName=='*')
{
aElements=vp.ui.getAllChildren(aCurrentContext[q]);
}
else
{
aElements=aCurrentContext[q].getElementsByTagName(sAttrSelectorTagName);
}
for(var p=0;p<aElements.length;p++)
{
aFound[iFoundCount]=aElements[p];
iFoundCount++;
}
}
aCurrentContext=[];
iCurrentContextIndex=0;
var fCheckFunction;
switch(sAttrOperator)
{
case'=':
fCheckFunction=function $vpfn_h8HFWf1hlF5LUT1bXE6UTg353$37(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}return(e.getAttribute(sAttrName)==sAttrValue);};
break;
case'~':
fCheckFunction=function $vpfn_h8HFWf1hlF5LUT1bXE6UTg356$37(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}return(e.getAttribute(sAttrName).match(new RegExp('\\b'+sAttrValue+'\\b')));};
break;
case'|':
fCheckFunction=function $vpfn_h8HFWf1hlF5LUT1bXE6UTg359$37(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}return(e.getAttribute(sAttrName).match(new RegExp('^'+sAttrValue+'-?')));};
break;
case'^':
fCheckFunction=function $vpfn_h8HFWf1hlF5LUT1bXE6UTg362$37(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}return(e.getAttribute(sAttrName).indexOf(sAttrValue)===0);};
break;
case'$':
fCheckFunction=function $vpfn_h8HFWf1hlF5LUT1bXE6UTg365$37(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}return(e.getAttribute(sAttrName).lastIndexOf(sAttrValue)===e.getAttribute(sAttrName).length-sAttrValue.length);};
break;
case'*':
fCheckFunction=function $vpfn_h8HFWf1hlF5LUT1bXE6UTg368$37(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}return(e.getAttribute(sAttrName).indexOf(sAttrValue)>-1);};
break;
default:

fCheckFunction=function $vpfn_h8HFWf1hlF5LUT1bXE6UTg372$37(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}return e.getAttribute(sAttrName);};
break;
}
aCurrentContext=[];
iCurrentContextIndex=0;
for(var l=0;l<aFound.length;l++)
{
if(fCheckFunction(aFound[l]))
{
aCurrentContext[iCurrentContextIndex]=aFound[l];
iCurrentContextIndex++;
}
}
continue;
}

if(!aCurrentContext[0])
{
return[];
}


sTagName=oToken;
aFound=[];
iFoundCount=0;
for(var m=0;m<aCurrentContext.length;m++)
{
var aTagOnlyElements=aCurrentContext[m].getElementsByTagName(sTagName);
for(var n=0;n<aTagOnlyElements.length;n++)
{
aFound[iFoundCount]=aTagOnlyElements[n];
iFoundCount++;
}
}
aCurrentContext=aFound;
}
return aCurrentContext;
};






vp.ui.getBySelector=function $vpfn_EunNm$DNSf83oJo39WAeOw416$22(sSelector)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(document.querySelectorAll)
{
return document.querySelectorAll(sSelector);
}


if(!document.getElementsByTagName)
{
return[];
}

return vp.ui.getChildrenBySelector(document,sSelector);
};










vp.ui.createElement=function $vpfn_hb20yq8VtBQoGBoPcMp95A441$22(sTagName,oAttributes,vCssStringOrPropertyMap,oDocument)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oDocument=oDocument||document;

var oElem=oDocument.createElement(sTagName);

if(oAttributes)
{
for(var sAttr in oAttributes)
{



if(typeof(oElem[sAttr])=="undefined")
{
oElem.setAttribute(sAttr,oAttributes[sAttr]);
}
else if(sAttr=="style"&&!vCssStringOrPropertyMap)
{
vCssStringOrPropertyMap=oAttributes[sAttr];
}
else if(sAttr=="class")
{
oElem.className=oAttributes[sAttr];
}
else
{
oElem[sAttr]=oAttributes[sAttr];
}
}
}

if(vCssStringOrPropertyMap)
{
vp.ui.setStyle(oElem,vCssStringOrPropertyMap);
}

return oElem;
};









vp.ui.createNamedElement=function $vpfn_n3xinF3CmvdSxmCon3N3YQ489$27(sTagName,sName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElement;
try{

oElement=document.createElement('<'+sTagName+' name="'+sName+'"/>');

if(!oElement||oElement.tagName!=sTagName.toUpperCase()||oElement.name!=sName)
{
throw new Error("not IE, bomb out and use W3C standard");
}
}
catch(ex)
{

oElement=document.createElement(sTagName);
oElement.name=sName;
}

return oElement;
};






vp.ui.createElementFromHTML=function $vpfn_DFwwkSDOWBwhV6Ue7RGVxQ516$30(sHTML)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oTemp=document.createElement("DIV");
oTemp.innerHTML=sHTML;
var oInner=oTemp.firstChild;
vp.ui.removeFromDOM(oInner);
return oInner;
};









vp.ui.getElementByAttribute=function $vpfn_wA0X8wRmYWX2H4DvCUQGOg533$30(sAttribute,sValue,oRootNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oRootNode)
{
oRootNode=vp.ui.getRootElement();
}

if(oRootNode.nodeType==1)
{
if(oRootNode.getAttribute(sAttribute)==sValue)
{
return oRootNode;
}

for(var i=0;i<oRootNode.childNodes.length;i++)
{
var oRet=vp.ui.getElementByAttribute(sAttribute,sValue,oRootNode.childNodes[i]);
if(oRet)
{
return oRet;
}
}
}

return null;
};









vp.ui.collectElementsByAttribute=function $vpfn_rCYgjApwxfHAEzb88aEPeg568$35(oRootElement,sAttribute)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oCollection={};

var fnRecurse=function $vpfn_reJ1aX$y610YAQtG8V3dpQ572$20(oElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oElement.nodeType==1)
{
var sAttrVal=oElement.getAttribute(sAttribute);
if(sAttrVal)
{
oCollection[sAttrVal]=oElement;
}

for(var i=0;i<oElement.childNodes.length;i++)
{
fnRecurse(oElement.childNodes[i]);
}
}
};

fnRecurse(oRootElement);

return oCollection;
};

vp.ui.forAllChildren=function $vpfn_xjpTjAlj59KnNk02gkTqBg594$23(oNode,fnAction)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
fnAction(oNode);

var iLen=oNode.childNodes.length;
for(var i=0;i<iLen;i++)
{
vp.ui.forAllChildren(oNode.childNodes[i],fnAction);
}
};






vp.ui.getSpecifiedAttributes=function $vpfn_OgnlwbYrnSWow5ycYM4bPA610$31(oNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aAttributes=[];
for(var i=0;i<oNode.attributes.length;i++)
{
if(oNode.attributes[i].specified)
{
aAttributes.add(oNode.attributes[i]);
}
}

return aAttributes;
};






vp.ui.addClass=function $vpfn_tYwCo2p_Atrfhl1wx5wlew629$17(vElement,sClass){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


vElement=vp.core.getElement(vElement,"addClass");


if(!vp.ui.hasClass(vElement,sClass))
{

var aClasses=vElement.className.split(/\s+/g);


aClasses[aClasses.length]=sClass;


vElement.className=aClasses.join(" ");
}
};







vp.ui.hasClass=function $vpfn_k_Ds3rVe5cGxyakLsjkTqg654$17(vElement,sClass){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


vElement=vp.core.getElement(vElement,"vp.ui.hasClass");


if(!vElement.className)
{
return false;
}


var aClasses=vElement.className.split(/\s+/g);;


for(var i=0;i<aClasses.length;i++)
{
if(aClasses[i]==sClass)
{
return true;
}
}


return false;
};






vp.ui.removeClass=function $vpfn_Z8cgjzBb0iiFfd1RAtGVgg686$20(vElement,sClass)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.removeClass");


var aClasses=vElement.className.split(/\s+/g);;


for(var i=0;i<aClasses.length;i++)
{
if(aClasses[i]==sClass)
{
aClasses[i]="";
}
}


vElement.className=aClasses.join(" ");
};








vp.ui.setStyle=function $vpfn_Jk6lZmECr8g$Yu5QMBLejg714$17(vElement,vCssStringOrPropertyMap,bClearExistingStyles)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var oElement=vp.core.getElement(vElement,"vp.ui.setStyle");

if(!vCssStringOrPropertyMap)
{
vElement.cssText="";
return;
}

var oPropertyMap;

if(typeof(vCssStringOrPropertyMap)=="string")
{
var oCss=new vp.web.CssString(vCssStringOrPropertyMap);
oPropertyMap=oCss.items;
}
else if(typeof(vCssStringOrPropertyMap)=="object")
{
oPropertyMap=vCssStringOrPropertyMap;
}

if(bClearExistingStyles)
{
oElement.cssText="";
}

for(var sProp in oPropertyMap)
{
vp.ui.setStyleValue(oElement,sProp,oPropertyMap[sProp]);
}
};










vp.ui.setStyleValue=function $vpfn_Nc3HMqzBYXvrXmDU0KqoUQ757$22(vElement,sProperty,sValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.setStyleValue");

sProperty=vp.ui.convertCssPropertyToCssFormat(sProperty);

switch(sProperty.toLowerCase())
{
case"float":
case"cssfloat":
case"stylefloat":
vElement.style.cssFloat=sValue;
vElement.style.styleFloat=sValue;
break;
case"opacity":
vp.ui.setOpacity(vElement,sValue);
break;
case"boxShadow":

vElement.style["box-shadow"]=sValue;
vElement.style["-moz-box-shadow"]=sValue;
vElement.style["-webkit-box-shadow"]=sValue;
break;
case"borderRadius":

vElement.style["border-radius"]=sValue;
vElement.style["-moz-border-radius"]=sValue;
vElement.style["-webkit-border-radius"]=sValue;
break;
case"borderTopRightRadius":

vElement.style["border-top-right-radius"]=sValue;
vElement.style["-moz-border-radius-topright"]=sValue;
vElement.style["-webkit-border-top-right-radius"]=sValue;
break;
case"borderBottomRightRadius":

vElement.style["border-bottom-right-radius"]=sValue;
vElement.style["-moz-border-radius-bottomright"]=sValue;
vElement.style["-webkit-border-bottom-right-radius"]=sValue;
break;
case"borderTopLeftRadius":

vElement.style["border-top-left-radius"]=sValue;
vElement.style["-moz-border-radius-topleft"]=sValue;
vElement.style["-webkit-border-top-left-radius"]=sValue;
break;
case"borderBottomLeftRadius":

vElement.style["border-bottom-left-radius"]=sValue;
vElement.style["-moz-border-radius-bottomleft"]=sValue;
vElement.style["-webkit-border-bottom-left-radius"]=sValue;
break;
case"cursor":
var sParsedValue=sValue?sValue.toLowerCase():"";
if(sParsedValue=="pointer"||sParsedValue=="hand")
{
vElement.style.cursor=document.all?"hand":"pointer";
}
else
{
vElement.style.cursor=sValue;
}
break;
case"width":
case"height":
case"left":
case"top":
case"right":
case"bottom":
case"margin":
case"margintop":
case"marginleft":
case"marginright":
case"marginbottom":
case"padding":
case"paddingtop":
case"paddingleft":
case"paddingright":
case"paddingbottom":
case"border":
case"bordertopwidth":
case"borderleftwidth":
case"borderrightwidth":
case"borderbottomwidth":
if(/^[-]*[\d\.]+$/.test(sValue))
{
sValue+="px";
}
vElement.style[sProperty]=sValue;
break;
default:
vElement.style[sProperty]=sValue;
break;
}
};







vp.ui.removeStyle=function $vpfn_68k7AQ9z9oTCeXn8r0xdmg861$20(vElement,vStyles)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElement=vp.core.getElement(vElement,"vp.ui.removeStyle");

if(vp.core.isArray(vStyles))
{
for(var i=0;i<vStyles.length;i++)
{
vp.ui.removeStyleValue(oElement,vStyles[i]);
}
}
else
{
vp.ui.removeStyleValue(oElement,vStyles);
}
};





vp.ui.clearStyle=function $vpfn_BIIK5KsqoaIlXEigtTu_hw882$19(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElement=vp.core.getElement(vElement,"vp.ui.removeStyle");
oElement.cssText="";
};







vp.ui.removeStyleValue=function $vpfn_wzLXTFJNa9Nr$0wtvrni0A894$25(vElement,sStyle)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElement=vp.core.getElement(vElement,"vp.ui.removeStyle");

var oCss=new vp.web.CssString(oElement.style.cssText);

var sCssStyle=vp.ui.convertCssPropertyToStringFormat(sStyle);

oCss.removeItem(sCssStyle);
oCss.removeItem(sCssStyle.toUpperCase());

var sVal=oCss.toString();

if(sVal.length===0)
{
oElement.removeAttribute("style");
}
else
{
oElement.style.cssText=oCss.toString();
}
};






vp.ui.removeStyleRecursive=function $vpfn_zaIYfq9T$d9E0YsSBPxHSQ922$29(oNode,sStyle)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oNode.nodeType==1)
{
vp.ui.removeStyleValue(oNode,sStyle);

var oChildren=oNode.childNodes;
var iLen=oChildren.length;
for(var i=0;i<iLen;i++)
{
vp.ui.removeStyleRecursive(oChildren[i],sStyle);
}
}
};










vp.ui.getCurrentStyle=function $vpfn_ZJ7RI38o3veO1vbyaLjnjw946$24(vElement,sProperty)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.getCurrentStyle");

var oDocument=vElement.ownerDocument;

var value=null;

if(document.all&&sProperty=="opacity"&&vElement.filters)
{
value=1;
try
{
value=vElement.filters.item("DXImageTransform.Microsoft.Alpha").opacity/100;
}
catch(e)
{
try
{
value=vElement.filters.item("alpha").opacity/100;
}
catch(e){}
}
}
else if(vElement.style[sProperty])
{
value=vElement.style[sProperty];
}
else if(vElement.currentStyle&&vElement.currentStyle[sProperty])
{
value=vElement.currentStyle[sProperty];
}
else if(oDocument.defaultView&&oDocument.defaultView.getComputedStyle)
{

var oComputedStyle=oDocument.defaultView.getComputedStyle(vElement,"");
if(oComputedStyle)
{

value=oComputedStyle.getPropertyValue(vp.ui.convertCssPropertyToStringFormat(sProperty))||null;
}
}


if(sProperty=="fontWeight")
{
if(value==400)
{
value="normal";
}
else if(value==700)
{
value="bold";
}
}

if(value&&!document.all&&sProperty=="textAlign")
{
value=value.replace("-moz-","");
}

return value;
};

(function $vpfn_D3kxkFA8aMLDUZJzGUeo1w1011$1()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var _map={};






vp.ui.convertCssPropertyToStringFormat=function $vpfn_JkHX872cVlxvNbJUHmfBFg1020$45(sProperty)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(!_map[sProperty])
{
_map[sProperty]=sProperty.replace(/([A-Z])/g,"-$1").toLowerCase();
}

return _map[sProperty];
};
})();

(function $vpfn_D3kxkFA8aMLDUZJzGUeo1w1032$1()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var _map={};






vp.ui.convertCssPropertyToCssFormat=function $vpfn_dCLxkEek7DJh4bT_gnanXg1041$42(sProperty)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(!_map[sProperty])
{
if(sProperty.indexOf("-")!=-1)
{

var aOut=[];
for(var i=0,len=sProperty.length;i<len;++i)
{
var sChar=sProperty.charAt(i);
if(sChar=="-")
{
i++;
sChar=sProperty.charAt(i).toUpperCase();
aOut.push(sChar);
}
else
{
aOut.push(sChar);
}
}

_map[sProperty]=aOut.join("");
}
else
{
_map[sProperty]=sProperty;
}
}

return _map[sProperty];
};
})();






vp.ui.getCssRule=function $vpfn_b2cCERdUjvx3PO_Xk$MguA1082$19(sSelectorText,oDocument)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oDocument)
{
oDocument=document;
}

if(!oDocument.styleSheets)
{
return null;
}

sSelectorText=sSelectorText.toLowerCase();

for(var i=0;i<oDocument.styleSheets.length;i++)
{


try
{
var aRules=document.all?oDocument.styleSheets[i].rules:oDocument.styleSheets[i].cssRules;
if(aRules&&aRules.length)
{
for(var j=0;j<aRules.length;j++)
{
if(aRules[j]&&aRules[j].selectorText&&aRules[j].selectorText.toLowerCase()==sSelectorText)
{
return aRules[j];
}
}
}
}
catch(ex)
{
}
}

return null;
};









vp.ui.getRect=function $vpfn_wuJ5uIKC26EXrc$Ou2rZ1Q1130$16(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.getRect");

if(vElement.nodeType!=1)
{
throw new Error("vp.ui.getRect doesn't support nodes with type "+vElement.nodeType);
}

var oDocument=vElement.ownerDocument;

var oRect={};
oRect.top=0;
oRect.left=0;
oRect.bottom=0;
oRect.right=0;

var oBox;

if(vElement.getBoundingClientRect)
{
try
{
oBox=vElement.getBoundingClientRect();
}
catch(ex)
{


if(ex.number==-2147467259)
{
throw new Error("vp.ui.getRect cannot get a rectangle for the specified element because it has not been rendered.");
}

throw ex;
}


var iScrollTop=Math.max(oDocument.documentElement.scrollTop,oDocument.body.scrollTop);
var iScrollLeft=Math.max(oDocument.documentElement.scrollLeft,oDocument.body.scrollLeft);



var ieHack=0;
if(document.all)
{
ieHack=oDocument.documentElement.clientTop+oDocument.body.clientTop;
}

oRect.top=(oBox.top+iScrollTop)-ieHack;
oRect.left=(oBox.left+iScrollLeft)-ieHack;

oRect.bottom=oRect.top-(oBox.top-oBox.bottom);
oRect.right=oRect.left+(oBox.right-oBox.left);
}
else if(oDocument.getBoxObjectFor)
{
oBox=oDocument.getBoxObjectFor(vElement);

var iBorderLeft=parseInt(vp.ui.getCurrentStyle(vElement,'borderLeftWidth'));
var iBorderTop=parseInt(vp.ui.getCurrentStyle(vElement,'borderTopWidth'));

oRect.left=oBox.x-iBorderLeft;
oRect.top=oBox.y-iBorderTop;



var oParent=vElement.offsetParent;
while(oParent&&oParent.tagName!="BODY")
{
var sOverflowY=vp.ui.getCurrentStyle(oParent,"overflowY");
if(sOverflowY=="auto"||sOverflowY=="scroll")
{
oRect.top-=oParent.scrollTop;
}

var sOverflowX=vp.ui.getCurrentStyle(oParent,"overflowX");
if(sOverflowX=="auto"||sOverflowX=="scroll")
{
oRect.left-=oParent.scrollLeft;
}

oParent=oParent.parentNode;
}

oRect.bottom=oRect.top+oBox.height;
oRect.right=oRect.left+oBox.width;
}
else
{
var oTemp=vElement;
var fZoom;


while(oTemp!==null)
{
fZoom=vp.ui._getZoom(oTemp);
oRect.top*=fZoom;
oRect.left*=fZoom;

oRect.top+=oTemp.offsetTop;
oRect.left+=oTemp.offsetLeft;

if(oTemp.tagName!="BODY"&&
oTemp!=vElement)
{
oRect.top-=oTemp.scrollTop;
oRect.left-=oTemp.scrollLeft;
}

oTemp=oTemp.offsetParent;
}

fZoom=vp.ui._getZoom(vElement);

oRect.right=Math.round(vElement.offsetWidth*fZoom)+oRect.left;
oRect.bottom=Math.round(vElement.offsetHeight*fZoom)+oRect.top;
}

oRect.width=oRect.right-oRect.left;
oRect.height=oRect.bottom-oRect.top;

return oRect;
};

vp.ui._getZoom=function $vpfn_xSis9tEJl8YFY8zDVYaHTQ1256$17(oObj)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var val=parseFloat(oObj.style.zoom);
return isNaN(val)?1:val;
};







vp.ui.getTop=function $vpfn_O0AgjrEjAmRWG1OL6eUScw1268$15(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.getTop");

return vp.ui.getRect(vElement).top;
};







vp.ui.getLeft=function $vpfn_PTLHnXnjLvtXeUS64yMiXQ1282$16(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.getLeft");

return vp.ui.getRect(vElement).left;
};







vp.ui.getHeight=function $vpfn_J4jzmJWW4eeeaU7$jVgiQw1296$18(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.getHeight");


return vElement.offsetHeight;
};







vp.ui.getWidth=function $vpfn_HktsGqxE4RcSLWSlgKSwhw1311$17(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.getWidth");


return vElement.offsetWidth;
};







vp.ui.getScrollRect=function $vpfn_ZtXxnVLngxyMBkATxTG8wg1326$22(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vElement=vp.core.getElement(vElement,"vp.ui.getScrollRect");

var oRet=vp.ui.getRect(vElement);
var oScrollOffset=vp.ui.getScrollOffset();
oRet.width+=oScrollOffset.width;
oRet.height+=oScrollOffset.height;

return oRet;
};









vp.ui.isPointInRect=function $vpfn_JNd8A$RJg1gM5S15FIQSaw1346$22(iX,iY,oRect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof iX!="number")
{
throw new Error("vp.ui.isPointInRect(): The x-coordinate must be a number.");
}
else if(typeof iY!="number")
{
throw new Error("vp.ui.isPointInRect(): The y-coordinate must be a number.");
}
else if(!oRect||typeof oRect.left!="number"||typeof oRect.top!="number")
{
throw new Error("vp.ui.isPointInRect(): Invalid rectangle passed in.");
}


return((iX>=oRect.left)&&(iX<=oRect.left+oRect.width)&&(iY>=oRect.top)&&(iY<=oRect.top+oRect.height));
};








vp.ui.expandRect=function $vpfn_TAjqAbd2AR4oBVnY$pd0VQ1373$19(oRect,iExpandBy)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oNewRect={
left:oRect.left-iExpandBy,
top:oRect.top-iExpandBy,
width:oRect.width+(iExpandBy*2),
height:oRect.height+(iExpandBy*2)
};

oNewRect.right=oNewRect.left+oNewRect.width;
oNewRect.bottom=oNewRect.top+oNewRect.height;

return oNewRect;
};








vp.ui.moveTo=function $vpfn_i87sABWkCq70sxjiEIjHTw1395$15(vElement,iLeft,iTop)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.moveTo");


if(typeof iLeft!="number")
{
throw new Error("Call to vp.ui.moveTo() with an invalid X coordinate.");
}
else if(typeof iTop!="number")
{
throw new Error("Call to vp.ui.moveTo() with an invalid Y coordinate.");
}


if(vp.ui.getCurrentStyle(vElement,"position")!="absolute"){
throw new Error("vp.ui.moveTo(): Can't move an element that isn't absolutely positioned.");
}


vElement.style.top=iTop+"px";
vElement.style.left=iLeft+"px";
};








vp.ui.resizeTo=function $vpfn_xjhDyAK4dNXXMVseaUIvJw1427$17(vElement,iWidth,iHeight)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.resizeTo");


if(typeof iWidth!="number")
{
throw new Error("Call to vp.ui.resizeTo() with an invalid width.");
}
else if(typeof iHeight!="number")
{
throw new Error("Call to vp.ui.resizeTo() with an invalid height/");
}


vElement.style.width=iWidth+"px";
vElement.style.height=iHeight+"px";
};







vp.ui.setHeight=function $vpfn_vdjiFVxEdSVfiIvWNeYqcg1453$18(vElement,iHeight)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.setHeight");


if(typeof iHeight!="number")
{
throw new Error("Call to vp.ui.setHeight() with an invalid height parameter.");
}


vElement.style.height=iHeight+"px";
};







vp.ui.setMinHeight=function $vpfn_RSn$KJKGOS2i47FTaGPumg1474$21(vElement,iHeight)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.setMinHeight");


if(typeof iHeight!="number")
{
throw new Error("Call to vp.ui.setHeight() with an invalid height parameter.");
}


vElement.style.minHeight=iHeight+"px";
};







vp.ui.setWidth=function $vpfn_ZzavzXaTtdWODNy3hrsEuA1495$17(vElement,iWidth)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"setWidth");


if(typeof iWidth!="number")
{
throw new Error("Call to vp.ui.setWidth() with an invalid width parameter.");
}


vElement.style.width=iWidth+"px";
};






vp.ui.insertFirstElement=function $vpfn_eTysjCxfjfP0DCTJm_J$yA1515$27(oTarget,oElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oFirstElement=oTarget.childNodes.length>=1?oTarget.childNodes[0]:null;
oTarget.insertBefore(oElement,oFirstElement);
};






vp.ui.insertAfter=function $vpfn_p0AetRQu17a8$Eg9u0DKvQ1526$20(oNode,oTarget)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oTarget.nextSibling)
{
oTarget.parentNode.insertBefore(oNode,oTarget.nextSibling);
}
else
{
oTarget.parentNode.appendChild(oNode);
}
};









vp.ui.moveToRoot=function $vpfn_O7GBG3m0H0cUdF5MwLS6mg1546$19(vElement,bAddToDocumentStart)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.moveToRoot");

if(vElement.parentNode!=document.body)
{
var oParent=vElement.parentNode;
oParent.removeChild(vElement);

if(bAddToDocumentStart)
{
vp.ui.insertFirstElement(top.document.body,vElement);
}
else
{
document.body.appendChild(vElement);
}
}
};






vp.ui.scrollTo=function $vpfn_6Z7W96fjl9yeDkRhWr4O$Q1572$18(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.scrollTo");

var oRec=vp.ui.getRect(vElement);

var iTopDif=oRec.top-document.body.scrollTop;
if(iTopDif<0)
{
if(window.scrollBy)
{
window.scrollBy(0,iTopDif);
}
else
{
vElement.scrollIntoView();
}
}

var iBottomDif=oRec.bottom-(document.body.scrollTop+vp.ui.getClientHeight());

if(iBottomDif>0)
{
if(window.scrollBy)
{
window.scrollBy(0,iBottomDif);
}
else
{
vElement.scrollIntoView();
}
}
};





vp.ui.scrollToCenterElement=function $vpfn__iGGHimYOIcYwkIsAQxfrw1611$30(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vElement=vp.core.getElement(vElement,"vp.ui.scrollToCenterElement");

var oRect=vp.ui.getRect(vElement);
var viewport=vp.ui.getViewportSize();
var scroll=vp.ui.getScrollOffset();

var dy=oRect.top+((oRect.height-viewport.height)/2)-scroll.top;
var dx=oRect.left+((oRect.width-viewport.width)/2)-scroll.left;

window.scrollBy(dx,dy);
};





































vp.ui.setCoord=function $vpfn_OOwLUuDItHE78PH84zy28A1661$17(oObj,sCoord,iValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oObj=oObj.style?oObj.style:oObj;

if(sCoord=="top"||sCoord=="left"||sCoord=="width"||sCoord=="height")
{
oObj[sCoord]=iValue;
}
else if(sCoord=="right")
{
oObj.left=oObj.left+oObj.width+iValue;
}
else if(sCoord=="bottom")
{
oObj.top=oObj.top+oObj.height+iValue;
}
};








vp.ui.getCoord=function $vpfn_XEbNuapqRjJRgDnLgNrtnA1686$17(oObj,sCoord)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oObj=oObj.style?oObj.style:oObj;

if(sCoord=="top"||sCoord=="left")
{
return parseInt(oObj[sCoord]);
}
else if(sCoord=="right")
{
return parseInt(oObj.left)+parseInt(oObj.width);
}
else if(sCoord=="bottom")
{
return parseInt(oObj.top)+parseInt(oObj.height);
}
};






vp.ui.getLocalRect=function $vpfn_VF9gIX5fzLyhDJc5HEa1jA1709$21(oObj)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oRect={};
vp.ui.applyPosition(oObj,oRect);
oRect.right=oRect.left+oRect.width;
oRect.bottom=oRect.top+oRect.height;

return oRect;
};







vp.ui.setPositionGlobal=function $vpfn_8TodklDMzyVVC4cg$whanQ1725$26(oElement,oPosition)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oElement.style.top=oPosition.top+"px";
oElement.style.left=oPosition.left+"px";


var oRect=vp.ui.getRect(oElement);



if(oRect.top!=oPosition.top||oRect.left!=oPosition.left)
{
oElement.style.top=(oPosition.top-(oRect.top-oPosition.top))+"px";
oElement.style.left=(oPosition.left-(oRect.left-oPosition.left))+"px";
}
};







vp.ui.applyPosition=function $vpfn_G$o9Op1hcfqINL9st9Y3Lg1748$22(oObj1,oObj2)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oObj1=oObj1.style?oObj1.style:oObj1;
oObj2=oObj2.style?oObj2.style:oObj2;

var suffix=0;

if(oObj2.zIndex)
{
suffix="px";
}

oObj2.top=parseInt(oObj1.top)+suffix;
oObj2.left=parseInt(oObj1.left)+suffix;
oObj2.width=parseInt(oObj1.width)+suffix;
oObj2.height=parseInt(oObj1.height)+suffix;
};







vp.ui.getStyleRect=function $vpfn_lnkaKNJo8FGCpX1pnGf68A1772$21(oObj)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var rect={};
rect.top=(oObj.style)?parseInt(oObj.style.top):oObj.top;
rect.left=(oObj.style)?parseInt(oObj.style.left):oObj.left;
rect.width=(oObj.style)?parseInt(oObj.style.width):oObj.width;
rect.height=(oObj.style)?parseInt(oObj.style.height):oObj.height;
rect.right=rect.left+rect.width;
rect.bottom=rect.top+rect.height;
return rect;
};







vp.ui.applyStyleRect=function $vpfn_Y5MnqlDIsN3rsu0YJE4aCA1790$23(oObj1,oObj2)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var styleRect=vp.ui.getStyleRect(oObj1);
vp.ui.setStyleValue(oObj2,"top",styleRect.top);
vp.ui.setStyleValue(oObj2,"left",styleRect.left);
vp.ui.setStyleValue(oObj2,"width",styleRect.width);
vp.ui.setStyleValue(oObj2,"height",styleRect.height);
};





vp.ui.disableTextButton=function $vpfn_VU1hC0Led8nFx7mNkAfHpg1803$26(vButton)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.ui._enableTextButton(vButton,false,"vp.ui.disableTextButton");
};





vp.ui.enableTextButton=function $vpfn_oY6iwbsXDPHetaClDiCbgA1812$25(vButton)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.ui._enableTextButton(vButton,true,"vp.ui.enableTextButton");
};




vp.ui._enableTextButton=function $vpfn_4$cU7EArtsabL$ZdSrl5Ug1820$26(vButton,bEnable,sMethodName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oButton=vp.core.getElement(vButton,sMethodName);
var sLinkId=oButton.id+"_link";
var sDisabledId=oButton.id+"_disabled";

document.getElementById(sLinkId).style.display=bEnable?"":"none";
document.getElementById(sDisabledId).style.display=bEnable?"none":"";
};






vp.ui.setOpacity=function $vpfn_aiAZHS_i9q2vgtXBJ4zOaQ1835$19(vElement,fOpacity)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oObj=vp.core.getElement(vElement,"vp.ui.setOpacity");

if(typeof oObj.style.opacity!="undefined")
{
if(fOpacity==1)
{
oObj.style.opacity="";
return;
}
oObj.style.opacity=fOpacity;
}
else
{
var oFilter=new vp.ui._IEFilterString(oObj.style.filter);

if(fOpacity==1)
{
oFilter.removeItem("Alpha");
}
else
{
try
{


if(!oObj.currentStyle.hasLayout)
{
if(!oObj.style.zoom)
{
oObj.style.zoom=1;
}
}
}catch(e){}

var iOpacity=fOpacity*100;

oFilter.setItem("Alpha",{enabled:1,opacity:iOpacity});
}

oObj.style.filter=oFilter.toString();
}
};

vp.ui._IEFilterString=function $vpfn_ynQKYecEapiGDzPcExkX2Q1880$24(sFilters)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var _oFilters={};

var init=function $vpfn_u9iFWTPzlCQSDbtc9lQz0Q1884$15()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
sFilters=sFilters.replace(/\s/gi,"");
var aFilters=sFilters.split("progid:DXImageTransform.Microsoft.");

for(var i=0;i<aFilters.length;i++)
{
if(aFilters[i].length>1)
{
var iParamListStart=aFilters[i].indexOf("(");
var sFilterName=aFilters[i].substring(0,iParamListStart);
var sSubParams=aFilters[i].substring(iParamListStart+1,aFilters[i].indexOf(")"));
var aSubParams=sSubParams.split(",");
var oFilterObj={};
for(var j=0;j<aSubParams.length;j++)
{
var iEqualsPos=aSubParams[j].indexOf("=");
var aPair=[];
aPair.add(aSubParams[j].substr(0,iEqualsPos));
aPair.add(aSubParams[j].substr(iEqualsPos+1));

oFilterObj[aPair[0]]=aPair[1];
}

_oFilters[sFilterName]=oFilterObj;
}
}
};

this.setItem=function $vpfn_Dz8zST_PlRBSkiOVRwptBg1913$19(sFilterName,oParams)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_oFilters[sFilterName]=oParams;
};

this.removeItem=function $vpfn_p4n3egn2A4$O06K9qYkYKQ1918$22(sFilterName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_oFilters[sFilterName])
{
delete _oFilters[sFilterName];
}
};

this.toString=function $vpfn_STuIVemEYvDclkzRKLzvLQ1926$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aOut=[];
var sSpace="";
for(var sProp in _oFilters)
{
aOut.add(sSpace+"progid:DXImageTransform.Microsoft."+sProp);
aOut.add("(");

var sComma="";
for(var sSubProp in _oFilters[sProp])
{
aOut.add(sComma+sSubProp+"="+_oFilters[sProp][sSubProp]);
sComma=",";
}
aOut.add(")");

sSpace=" ";
}

return aOut.join("");
};

init();
};





vp.ui.reactivateClickableButton=function $vpfn_kVJi6M0jiY6zni0qUEPxGw1956$34(sElementNamespaceId){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.ui.expandAndCollapse('imgEnabledButton'+sElementNamespaceId,'imgDisabledButton'+sElementNamespaceId);
};





vp.ui.getClientHeight=function $vpfn_FSXVr7VHAz9LmW3xDgKyaQ1964$24(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


if(typeof window.innerHeight!="undefined"){
return window.innerHeight;


}else if(document.documentElement&&
typeof document.documentElement.clientHeight!="undefined"&&
document.documentElement.clientHeight>0){

return document.documentElement.clientHeight;


}else if(document.body&&typeof document.body.clientHeight!="undefined"){
return document.body.clientHeight;
}else{
return-1;
}
};





vp.ui.getClientWidth=function $vpfn_9xWG59hRNDBJ_EG1iz4MwA1989$23(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


if(typeof window.innerWidth!="undefined"){
return window.innerWidth;


}else if(document.documentElement&&typeof document.documentElement.clientWidth!="undefined"&&document.documentElement.clientWidth!==0){
return document.documentElement.clientWidth;


}else if(document.body&&typeof document.body.clientWidth!="undefined"){
return document.body.clientWidth;
}else{
return-1;
}
};







vp.ui.getViewportSize=function $vpfn_hd7wiTnBRuhF5MzR$TfyHw2013$24(oWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oSize={};
oWindow=oWindow||window;

if(self.innerHeight)
{
oSize.width=oWindow.innerWidth;
oSize.height=oWindow.innerHeight;
}
else if(oWindow.document.documentElement&&oWindow.document.documentElement.clientHeight)

{
oSize.width=oWindow.document.documentElement.clientWidth;
oSize.height=oWindow.document.documentElement.clientHeight;
}
else
{
oSize.width=oWindow.document.body.clientWidth;
oSize.height=oWindow.document.body.clientHeight;
}

return oSize;
};





vp.ui.getScrollOffset=function $vpfn_mWRhU_jxmkzUgIMuYMp11Q2042$24(oWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oPos={};
oWindow=oWindow||window;

if(oWindow.pageYOffset)
{
oPos.left=oWindow.pageXOffset;
oPos.top=oWindow.pageYOffset;
}
else if(oWindow.document.documentElement&&oWindow.document.documentElement.scrollTop)

{
oPos.left=oWindow.document.documentElement.scrollLeft;
oPos.top=oWindow.document.documentElement.scrollTop;
}
else
{
oPos.left=oWindow.document.body.scrollLeft;
oPos.top=oWindow.document.body.scrollTop;
}

return oPos;
};





vp.ui.getPageSize=function $vpfn_DuFEn9Y1d26MLjJ3t1KHYw2071$20(oWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oWindow=oWindow||window;
var oRootElement=vp.ui.getRootElement(oWindow.document);

if(!oRootElement||oRootElement.scrollHeight<oWindow.document.body.scrollHeight)
{
oRootElement=oWindow.document.body;
}

var oRet={width:oRootElement.scrollWidth,height:oRootElement.scrollHeight};

if(oRootElement.clientWidth>oRootElement.scrollWidth)
{
oRet.width=oRootElement.clientWidth;
}

if(oRootElement.clientHeight>oRootElement.scrollHeight)
{
oRet.height=oRootElement.clientHeight;
}

return oRet;
};







vp.ui.getContentSize=function $vpfn_GK_Fq2Z3pSswvt5QIbMcZQ2102$23(oWindow,bExcludeScrollbars)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oWindow=oWindow||window;




var sOverflow;
if(bExcludeScrollbars)
{
sOverflow=oWindow.document.documentElement.style.overflow;
oWindow.document.documentElement.style.overflow="hidden";
}

var oSize={width:0,height:0};

var addMargin=function $vpfn_RFmM0zqqIh3KdVh1FDpNww2118$20(oNode,sStyle,sRectProp,oRect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iMargin=parseInt(vp.ui.getCurrentStyle(oNode,sStyle));
if(iMargin)
{
oRect[sRectProp]+=iMargin;
}
};

var bIsQuirksMode=vp.ui.isQuirksMode();

var gatherSize=function $vpfn_kyFfRuva2XN7gQQ77TP2tA2129$21(oNode,bIncludeWidth,bIncludeHeight)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oNode.nodeType!=1)
{
return;
}

var bIsBody=oNode.tagName=="BODY";




if(!bIsQuirksMode||!bIsBody)
{
try
{
var oRect=vp.ui.getRect(oNode);
}
catch(ex)
{
return;
}


if(oRect.height===0&&oRect.width===0)
{
return;
}

if(bIsBody)
{
addMargin(oNode,"marginRight","right",oRect);
addMargin(oNode,"marginBottom","bottom",oRect);
}

if(bIncludeHeight)
{
oSize.height=Math.max(oRect.bottom,oSize.height);
}

if(bIncludeWidth)
{
oSize.width=Math.max(oRect.right,oSize.width);
}


if(vp.ui.getCurrentStyle(oNode,"overflowX")!="visible"&&
(vp.ui.getCurrentStyle(oNode,"height")!="auto"||vp.ui.getCurrentStyle(oNode,"maxHeight")!="none"))
{
bIncludeHeight=false;
}


if(vp.ui.getCurrentStyle(oNode,"overflowY")!="visible"&&
(vp.ui.getCurrentStyle(oNode,"width")!="auto"||vp.ui.getCurrentStyle(oNode,"maxWidth")!="none"))
{
bIncludeWidth=false;
}


if(!bIncludeHeight&&!bIncludeWidth)
{
return;
}
}


if(oNode.tagName!=="OBJECT")
{
var iLen=oNode.childNodes.length;
for(var i=0;i<iLen;i++)
{
gatherSize(oNode.childNodes[i],bIncludeWidth,bIncludeHeight);
}
}
};

gatherSize(oWindow.document.body,true,true);

if(bExcludeScrollbars)
{
oWindow.document.documentElement.style.overflow=sOverflow;
}

return oSize;
};





vp.ui.centerElement=function $vpfn_jbY6u39TNUlVk$0WCbCoLA2220$22(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vElement=vp.core.getElement(vElement,"vp.ui.centerElement");

var viewport=vp.ui.getViewportSize();
var scroll=vp.ui.getScrollOffset();

vp.ui.moveTo(vElement,
(viewport.width-vp.ui.getWidth(vElement))/2+scroll.left,
(viewport.height-vp.ui.getHeight(vElement))/2+scroll.top);
};





vp.ui.preloadImages=function $vpfn_hfeQDV3l7NW$ua5M4PjcdA2236$22(aImages)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
try
{
var iLen=aImages.length;
for(var i=0;i<iLen;i++)
{
var oImg=document.createElement("IMG");

if(window.isDebug)
{
var sSrc=aImages[i];
oImg.onerror=function $vpfn_C6vJsKRXA3OJ$sXY2idvDg2248$31(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}throw new Error("Debug only error: An attempt to preload "+sSrc+" was made, but the image couldn't be found.");};
}

oImg.src=aImages[i];
}
}
catch(ex)
{
if(window.isDebug)
{
throw ex;
}
}
};








vp.ui.preloadImageAndGetSize=function $vpfn_5XZEoU1eKExUPaFebCCJng2270$31(sImageSrc,fnCallback,fnErrorHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oImg=document.createElement("IMG");
oImg.style.visibility="hidden";
oImg.style.zIndex=-1;
document.body.appendChild(oImg);

vp.ui._traceImageSrc(sImageSrc,"vp.ui.preloadImageAndGetSize");

var fnPreloadHandler=function $vpfn_lj6WoKvgSJbjlOoNU7uuYg2279$27(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}





var fnWrapper=function $vpfn_woGwTQmr$alT72Uro1xCAA2286$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oSize={width:oImg.offsetWidth,height:oImg.offsetHeight};

vp.events.remove(oImg,"load",fnPreloadHandler);
document.body.removeChild(oImg);
oImg=null;
fnCallback(oSize);
};

window.setTimeout(fnWrapper,0);
};

vp.events.add(oImg,"load",fnPreloadHandler);

if(fnErrorHandler)
{
vp.events.add(oImg,"error",function $vpfn_D3kxkFA8aMLDUZJzGUeo1w2303$37(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}fnErrorHandler(e,sImageSrc);});
}

oImg.src=sImageSrc;
};











vp.ui.showAnimated=function $vpfn_ErXtQCTtbZuG9eIqmbUV$Q2319$21(oElement,iStartWidth,iStartHeight,iEndWidth,iEndHeight,bIgnoreOverflow,bBottomUp)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oElement._isBeingAnimated)
{
return;
}

oElement._isBeingAnimated=true;

var sInitialWidthStyle=oElement.style.width;
var sInitialHeightStyle=oElement.style.height;

oElement.style.width=iStartWidth;
oElement.style.height=iStartHeight;
oElement.style.visibility="visible";

if(!bIgnoreOverflow)
{
var sOldOverflow=oElement.style.overflow;
oElement.style.overflow="hidden";
}

var dPercent=0;
var iMaxPercent=100;
var iDelay=10;

if(!vp.browser.isIE)
{
iDelay=20;
}

var iDuration=80;
var dStep=iMaxPercent*iDelay/iDuration;
var initialTop=parseInt(oElement.style.top);

var fnShowAni=function $vpfn_IBUkGP0cnErViR4YNwu5Zw2354$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var newHeight=iStartHeight+(iEndHeight-iStartHeight)*dPercent/iMaxPercent;
var newWidth=iStartWidth+(iEndWidth-iStartWidth)*dPercent/iMaxPercent;
if(dPercent<=iMaxPercent)
{
oElement.style.height=newHeight+"px";
oElement.style.width=newWidth+"px";
if(bBottomUp)
{
oElement.style.top=(initialTop+iEndHeight-newHeight)+"px";
}
dPercent+=dStep;
setTimeout(fnShowAni,iDelay);
}
else
{
oElement.style.height=iEndHeight+"px";
oElement.style.width=iEndWidth+"px";
if(!bIgnoreOverflow)
{
oElement.style.overflow=sOldOverflow;
}

oElement.style.width=sInitialWidthStyle;
oElement.style.height=sInitialHeightStyle;

oElement._isBeingAnimated=false;
}
};
fnShowAni();
};





vp.ui.getRootElement=function $vpfn_qBbgOpImER2xMdeJmguFJg2391$23(oDoc)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oDoc)
{
oDoc=document;
}

return oDoc.documentElement?oDoc.documentElement:oDoc.body;
};




vp.ui.getAllChildren=function $vpfn_TLNa1$aTnxvjDuDSluAKkw2404$23(oElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oElement)
{
return[];
}
return oElement.all?oElement.all:oElement.getElementsByTagName('*');
};





vp.ui.isScrollBarClickEvent=function $vpfn_AvPBZ2aEylVOLNKRQ$t2vw2417$30(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);

if(e.target&&(e.target.tagName.toLowerCase()=="body"||e.target.tagName.toLowerCase()=="html"))
{
var oViewRect=vp.ui.getViewportSize();
var oScrollRect=vp.ui.getPageSize();


if(oScrollRect.height>oViewRect.height)
{

if(e.pageX+20>oViewRect.width)
{
return true;
}
}


if(oScrollRect.width>oViewRect.width)
{

if(e.pageY+20>oViewRect.height)
{
return true;
}
}
}

return false;
};

vp.ui.isVerticalScrollbarVisible=function $vpfn_2QJJhSGAuky20MarF9$pZw2450$35(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElement=vElement?vp.core.getElement(vElement,"vp.ui.isVerticalScrollbarVisible"):vp.ui.getRootElement();
return oElement.scrollHeight>oElement.offsetHeight;
};

vp.ui.isHorizontalScrollbarVisible=function $vpfn_J_5XaUZDGHwzionnUwXAXQ2456$37(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElement=vElement?vp.core.getElement(vElement,"vp.ui.isHorizontalScrollbarVisible"):vp.ui.getRootElement();
return oElement.scrollWidth>oElement.offsetWidth;
};







vp.ui.getMaxProperty=function $vpfn_UF$joP_KQdQKoOaeDGq99g2468$23(objs,propertyString)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var propertyArray=propertyString.split('.');

var maxValue=0;
for(var i=0;i<objs.length;i++)
{
var iArray=0;
var value=objs[i];
while(value&&propertyArray[iArray])
{
value=value[propertyArray[iArray]];
iArray=iArray+1;
}
value=parseInt(value);
if(value>maxValue)
{
maxValue=value;
}
}
return maxValue;
};

vp.ui._mouseTrackingHandler=function $vpfn_tpLUA9CPSFHDm4yVoXQaLQ2491$30(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);
window.__mouseTrackingTarget=e.target;
};






vp.ui.startTrackMouseTarget=function $vpfn_9_0NmUw14Ocf$FWwNxIn8A2502$30(oWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oWindow)
{
oWindow=window;
}

vp.events.add(vp.ui.getRootElement(oWindow.document),"mouseover",vp.ui._mouseTrackingHandler);

for(var i=0;i<oWindow.frames.length;i++)
{
vp.ui.startTrackMouseTarget(oWindow.frames[i]);
}
};





vp.ui.stopTrackMouseTarget=function $vpfn_1vpuotHBoqvohNXVOdeZnQ2521$29(oWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oWindow)
{
oWindow=window;
}

vp.events.remove(vp.ui.getRootElement(oWindow.document),"mouseover",vp.ui._mouseTrackingHandler);

for(var i=0;i<oWindow.frames.length;i++)
{
vp.ui.stopTrackMouseTarget(oWindow.frames[i]);
}
};






vp.ui.getMouseTarget=function $vpfn_Sg8zAY79mX1i_q5Va4ghLA2541$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return window.__mouseTrackingTarget?window.__mouseTrackingTarget:null;
};









vp.ui.makeUnselectable=function $vpfn_a5VS3FRgySNNaFVkzXd$NQ2554$25(vElement,aUnselectables)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var unselectables=[];
if(aUnselectables)
{
unselectables=aUnselectables;
}
var oElement=vp.core.getElement(vElement);

if(oElement.nodeType==1&&!(oElement.contentEditable=="true"))
{
oElement.setAttribute("unselectable","on");
vp.ui.preventDragging(oElement);
unselectables.push(oElement);

for(var i=0;i<oElement.childNodes.length;i++)
{
vp.ui.makeUnselectable(oElement.childNodes[i],unselectables);
}
}

return unselectables;
};

vp.ui.makeSelectable=function $vpfn__bE0fqN5VYRH8n2RxZb24g2578$23(unselectables)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var len=unselectables.length;
for(var i=0;i<len;i++)
{
var oElement=unselectables[i];
oElement.removeAttribute("unselectable");
}
};






vp.ui.preventDragging=function $vpfn_s962i1pr1lH8GwLUVTlcxQ2593$24(oNode,bRecurse)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oNode.nodeType==1)
{
if(oNode.tagName=="IMG")
{
if(document.all)
{
vp.events.add(oNode,"drag",vp.events.cancelEvent);
}
else
{
vp.events.add(oNode,"mousedown",vp.events.cancelEvent);
}
}

if(bRecurse)
{
for(var i=0;i<oNode.childNodes.length;i++)
{
vp.ui.preventDragging(oNode.childNodes[i],bRecurse);
}
}
}
};





vp.ui.browserSupportsPNG=function $vpfn_lFwb9nNIVGGEgyx$gabDyA2623$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.browser.supportsPng;
};

var IE6_PNG_TOKEN='_ie6.png';







vp.ui.imageUrl=function $vpfn_9XxGC3fsT67hvKunp4Zc9Q2636$17(sUrl,bIsLocalized)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


if(!vp.browser.supportsPng&&sUrl.indexOf(IE6_PNG_TOKEN)<0)
{
sUrl=sUrl.replace((/\.png/i),IE6_PNG_TOKEN);
}



if(window.imageHost&&sUrl.indexOf("http")!==0)
{
sUrl=window.imageHost+sUrl;
}



if(bIsLocalized)
{
sUrl=vp.ui.ensureLanguageIdParameter(sUrl);
}

return sUrl;
};

var VP_UI_BLANK_IMAGE=vp.ui.imageUrl("/vp/JS-Lib/common/spacer.gif");








vp.ui.setSrcPNG=function $vpfn_0u5oS66Zr1htITu6Tsf2_w2671$18(oImg,sSrc,fnCallback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(vp.core.getBoolean(vp.web.getQueryString("admin")))
{
var oAdminURL=new vp.web.URL(sSrc,"vp.ui.setSrcPNG");
oAdminURL.setItem("admin",1);
sSrc=oAdminURL.toString();
}

vp.ui._traceImageSrc(sSrc);

$(oImg).srcPng(sSrc,fnCallback);
};








vp.ui.setSrcPNGSimple=function $vpfn_Oe0ZJ2fvPts9Wf0w2mFOqQ2693$24(oImg,sSrc)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.ui._traceImageSrc(sSrc,"vp.ui.setSrcPNGSimple");

$(oImg).srcPngSimple(sSrc);
};

vp.ui._traceImageSrc=function $vpfn_5fpIOyxXnfzRR6DCy4sJZQ2700$23(sSrc,sMessage)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(vp.core.getBoolean(vp.web.getQueryString("debugimg")))
{
if(sMessage)
{
sMessage="<font color=red>"+sMessage+"</font>: ";
}

var oDebugURL=new vp.web.URL(sSrc);
oDebugURL.setItem("showerr",1);
var sDebugSrc=oDebugURL.toString();
vp.debug.trace("<a href=\""+vp.web.htmlAttributeEncode(sDebugSrc)+"\" target='png_preview'><IMG border=0 src=\""+vp.web.htmlAttributeEncode(sSrc)+"\"></a>");
sMessage=sMessage||"";
vp.debug.trace(sMessage+sSrc);
vp.debug.trace("");
}
};







vp.ui.pngHackTrackMouseEvents=function $vpfn_wzEkb50sompFyI$rr09G$Q2726$32()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!vp.browser.supportsPng&&!document._pngHackMouseEventsAdded)
{
vp.events.add(document.body,"mousemove",vp.ui._pngHackMouseMoveHandler);
document._pngHackMouseEventsAdded=true;
}
};






vp.ui._pngHackMouseMoveHandler=function $vpfn_TMLYgB75c2K$4h_SBuvXKw2740$33(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElem=document.elementFromPoint(e.clientX,e.clientY);


if(document._pngHackCurrentMouseOverElement&&oElem!=document._pngHackCurrentMouseOverElement)
{
try
{
vp.events.fireEvent(document._pngHackCurrentMouseOverElement,"mouseout");
}
catch(ex){}
}


if(oElem&&oElem.pngSrc&&oElem!=document._pngHackCurrentMouseOverElement)
{
try
{
vp.events.fireEvent(oElem,"mouseover");
}
catch(ex){}

vp.events.add(oElem,"mouseout",vp.ui._pngHackMouseOutHandler);
document._pngHackCurrentMouseOverElement=oElem;
}
};






vp.ui._pngHackMouseOutHandler=function $vpfn_wxpAZT8E1U6OdlB35dU$jg2773$32(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(e.srcElement==document._pngHackCurrentMouseOverElement)
{
vp.events.remove(document._pngHackCurrentMouseOverElement,"mouseout",vp.ui._pngHackMouseOutHandler);
document._pngHackCurrentMouseOverElement=null;
}
};






vp.ui.getRelativeURL=function $vpfn_441vcoHnr$S_qPzmqtDjiA2787$23(sURL)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(sURL.indexOf("http://")===0||
sURL.indexOf("https://")===0)
{
sURL=sURL.substr(8);
sURL=sURL.substr(sURL.indexOf("/"));
}


if(sURL.substr(0,1)!="/")
{
return sURL;
}

var sCurrentURL=document.location.pathname;
var aCurrent=sCurrentURL.substr(1).split("/");

var aTarget=sURL.substr(1).split("/");
var aNew=[];


while(aCurrent.length>0&&aTarget.length>0)
{
if(aCurrent[0].toLowerCase()==aTarget[0].toLowerCase())
{
aCurrent.remove(0);
aTarget.remove(0);
}
else
{
break;
}
}


for(var i=0;i<aCurrent.length-1;i++)
{
aNew.add("..");
}


for(i=0;i<aTarget.length;i++)
{
aNew.add(aTarget[i]);
}

return aNew.join("/");
};







vp.ui.isElementInDOM=function $vpfn_$JvhSYpvoYq4R35RpUdWWQ2843$23(oElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

return oElement.parentNode&&
oElement.parentNode!=oElement.ownerDocument&&
oElement.parentNode.nodeType==1;
};





vp.ui.removeFromDOM=function $vpfn_XT9E0eFmqD8Sh$4E99NnsA2855$23(oElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oElement.parentNode.removeChild(oElement);
};





vp.ui.removeChildren=function $vpfn_71TVkwvD5yR3GtOFi8$xPw2864$23(oContainer)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oContainer&&oContainer.hasChildNodes())
{
while(oContainer.childNodes.length>=1)
{
oContainer.removeChild(oContainer.firstChild);
}
}
};





vp.ui.replaceNodeWithContents=function $vpfn_HaohJyE6lh$781F8KLMa8w2879$32(oNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oParent=oNode.parentNode;
var iLen=oNode.childNodes.length;
for(var i=0;i<iLen;i++)
{
var oChild=oNode.childNodes[i];
oChild.parentNode.removeChild(oChild);
oParent.insertBefore(oChild,oNode);
}

oParent.removeChild(oNode);
oParent.normalize();
};








vp.ui.getFirstElementChild=function $vpfn_7_99K4Km_gVRcBsVxBIbNQ2901$29(oElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
for(var i=0;i<oElement.childNodes.length;i++)
{
if(oElement.childNodes[i].nodeType==1)
{
return oElement.childNodes[i];
}
}

return null;
};






vp.ui.getParentByTagName=function $vpfn_PVgWkHCi8h18AskZO0lUnw2919$27(vElement,tagName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vElement=vp.core.getElement(vElement).parentNode;

while(vElement&&vElement.tagName!=tagName)
{
vElement=vElement.parentNode;
}

return vElement;
};







vp.ui.isChildOf=function $vpfn_DD2j0f4NlcpsQXRCrgK0wg2937$18(oChild,oParent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oTemp;
if(typeof(oChild.parentNode)!="undefined")
{
oTemp=oChild.parentNode;
}
else if(oChild.parentElement)
{
oTemp=oChild.parentElement();
}
else if(oChild.length)
{
oTemp=oChild[0];
}

while(oTemp)
{
if(oTemp==oParent)
{
return true;
}

if(oTemp.tagName&&oTemp.tagName.toLowerCase()=="body")
{
return false;
}
oTemp=oTemp.parentNode;
}

return false;
};








vp.ui.getRectWithAspectRatio=function $vpfn_auNmqsFkKuznj4fPFBdyiw2977$31(oContainerRect,fAspectRatio)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oRect={
top:0,
left:0,
width:oContainerRect.width,
height:oContainerRect.height
};

var fContainerAspectRatio=oContainerRect.width/oContainerRect.height;

if(fContainerAspectRatio<fAspectRatio)
{
oRect.height=Math.round(oRect.width/fAspectRatio);
}
else
{
oRect.width=Math.round(oRect.height*fAspectRatio);
}

oRect.left=(oContainerRect.width-oRect.width)/2;
oRect.top=(oContainerRect.height-oRect.height)/2;
oRect.right=oRect.left+oRect.width;
oRect.bottom=oRect.top+oRect.height;

return oRect;
};







vp.ui.doRectsIntersect=function $vpfn_SuyJl9zaJo$jof$TRKroQw3011$25(oRect1,oRect2)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return!(oRect1.left>(oRect2.left+oRect2.width)||
(oRect1.left+oRect1.width)<oRect2.left||
oRect1.top>(oRect2.top+oRect2.height)||
(oRect1.top+oRect1.height)<oRect2.top);
};







vp.ui.isPointInsideRect=function $vpfn_CInvodKrukBuq1hI16dz6g3025$26(oPoint,oRect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oPoint.top>=oRect.top&&oPoint.top<=oRect.top+oRect.height)
{
if(oPoint.left>=oRect.left&&oPoint.left<=oRect.left+oRect.width)
{
return true;
}
}

return false;
};







vp.ui.getDistance=function $vpfn_PKXdETtpF6KAkHLIza$8xg3044$20(oPoint1,oPoint2)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

return Math.sqrt(Math.pow(oPoint1.top-oPoint2.top,2)+Math.pow(oPoint1.left-oPoint2.left,2));
};









vp.ui.makeElementOpaqueInIE6=function $vpfn_lh57GgZfcXJJRdc88oLChw3058$31(oElement,bEnable,oTarget)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.browser.isIE&&vp.browser.ver<7)
{
var sID=oElement.id+"_iframe_block";
var oIFrameLayer=oElement.ownerDocument.getElementById(sID);

if(!oIFrameLayer)
{
oIFrameLayer=oElement.ownerDocument.createElement("IFRAME");


vp.ui.ensureIFrameSrc(oIFrameLayer);
oIFrameLayer.style.position="absolute";
if(!oTarget)
{
oElement.appendChild(oIFrameLayer);
}
else
{
oTarget.appendChild(oIFrameLayer);
oIFrameLayer.style.left=0;
oIFrameLayer.style.top=0;
}
}

oIFrameLayer.style.width="100%";
oIFrameLayer.style.height="100%";

oIFrameLayer.style.display=bEnable?"block":"none";

oIFrameLayer.style.filter="mask()";


}
};

vp.ui.dummyIFrames={};








vp.ui.showIE6IFrame=function $vpfn_QDakt4nQ_f2y4L76$eAa$g3104$22(oElement,bShow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!vp.browser.isIE||vp.browser.ver>=7)
{

return;
}
var dummyIFrame=vp.ui.dummyIFrames[oElement.id];
if(!dummyIFrame)
{
dummyIFrame=document.createElement("IFRAME");
dummyIFrame.setAttribute("src","");


vp.ui.ensureIFrameSrc(dummyIFrame);
vp.ui.dummyIFrames[oElement.id]=dummyIFrame;
}

if(!bShow)
{
try
{
oElement.parentElement.removeChild(dummyIFrame);
}
catch(e){}
return;
}


dummyIFrame.style.zIndex=oElement.style.zIndex;
oElement.style.zIndex=oElement.style.zIndex+1;


dummyIFrame.style.position="absolute";
dummyIFrame.style.left=oElement.offsetLeft+"px";
dummyIFrame.style.top=oElement.offsetTop+"px";
dummyIFrame.style.width=oElement.offsetWidth+"px";
dummyIFrame.style.height=oElement.offsetHeight+"px";

oElement.parentElement.appendChild(dummyIFrame);
};





vp.ui.preloadScripts=function $vpfn_MDZnPaeKsojti7KOnvsiuA3150$23(preloadList)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(preloadList.length>0)
{
setTimeout(function $vpfn_D3kxkFA8aMLDUZJzGUeo1w3154$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(preloadList[0])!=="undefined")
{
if(vp.browser.isIE||vp.browser.isOpera)
{
var img=new Image();
$(img).load(function $vpfn_D3kxkFA8aMLDUZJzGUeo1w3161$36(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}vp.ui.preloadScripts(preloadList);});
img.onerror=function $vpfn_xtk7siEpqA6EN0v1MOqRqw3162$38(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}vp.ui.preloadScripts(preloadList);};
img.src=preloadList[0];
}
else
{
var o=document.createElement("object");
o.data=preloadList[0];
o.width=o.height=0;
var tempName=preloadList[0];
o.onload=function $vpfn_Z1CikjW7AIzUex2Vz4Lkpw3171$35(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}vp.ui.preloadScripts(preloadList);};
document.body.appendChild(o);
}
preloadList.remove(0);
}
},1);
}
};

var DEPRIORITIZE_DELAY=10;








vp.ui.loadScriptAfterPageLoad=function $vpfn_eLxhHbSq6TkX8K9wZWpGyg3189$32(sUrl,fnCallback,fnError)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fnCallbackWrapper=vp.instrumentation.wrapFunctionWithInstrumentation(fnCallback);
var fnErrorWrapper=vp.instrumentation.wrapFunctionWithInstrumentation(fnError);

if(vp.web.getQueryString("debugpixels",false))
{
vp.debug.trace('script: '+sUrl);
}

vp.events.runAfterLoadComplete(
function $vpfn_D3kxkFA8aMLDUZJzGUeo1w3200$8()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
jQuery.ajax({
url:sUrl,
dataType:"script",
cache:true,
success:fnCallbackWrapper,
error:fnErrorWrapper
});
},
DEPRIORITIZE_DELAY);
};






vp.ui.preloadScriptAfterPageLoad=function $vpfn_RaNEG_rgKSexTPgQ_1C9KQ3218$35(preloadList)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.events.runAfterLoadComplete(function $vpfn_D3kxkFA8aMLDUZJzGUeo1w3220$35(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}vp.ui.preloadScripts(preloadList);},DEPRIORITIZE_DELAY);
};








vp.ui.loadImageAfterPageLoad=function $vpfn_Ir6kzxXZaQfzodu3tQcUpw3230$31(sUrl,fnOnLoad,fnOnError)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.web.getQueryString("debugpixels",false))
{
vp.debug.trace('image: '+sUrl);
}

var fnLoader=function $vpfn_5XFfVX56NDM9dNSnoF2w_Q3237$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oImg=document.createElement("IMG");
oImg.src=sUrl;
oImg.style.display="none";

if(fnOnLoad)
{
vp.events.add(oImg,"load",fnOnLoad);
}

if(fnOnError)
{
vp.events.add(oImg,"error",fnOnError);
}

document.body.appendChild(oImg);
};

vp.events.runAfterLoadComplete(fnLoader,DEPRIORITIZE_DELAY);
};






vp.ui.loadIFrameAfterPageLoad=function $vpfn_vMv0wtEd9xBPzAvDyeXj4A3264$32(sUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.web.getQueryString("debugpixels",false))
{
vp.debug.trace('iframe: '+sUrl);
}
var fnLoader=function $vpfn_5XFfVX56NDM9dNSnoF2w_Q3270$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oIframe=document.createElement("IFRAME");
oIframe.src=sUrl;
oIframe.style.display="none";
document.body.appendChild(oIframe);
};

vp.events.runAfterLoadComplete(fnLoader,DEPRIORITIZE_DELAY);
};






vp.ui.isQuirksMode=function $vpfn_6qYMZqsfgiNAqB4XSSwkzA3286$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!document.all)
{
return false;
}

return document.compatMode!="CSS1Compat";
};






vp.ui.includeCssQuirksMode=function $vpfn_FKeA$TP3waW6pLJwPiWD5w3301$29(sPath)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.ui.isQuirksMode())
{
if(!window._quirksModeCssFiles)
{
window._quirksModeCssFiles={};
}

if(!window._quirksModeCssFiles[sPath])
{
vp.events.runAfterDOMLoadComplete(function $vpfn_D3kxkFA8aMLDUZJzGUeo1w3312$46()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oLink=document.createElement("LINK");
oLink.href=sPath;
oLink.rel="stylesheet";
oLink.type="text/css";
var documentElement=document.documentElement?document.documentElement:document.body;
documentElement.appendChild(oLink);
});
}

window._quirksModeCssFiles[sPath]=true;
}
};






vp.ui.getIFrameForDocument=function $vpfn_BGNugddsBl2PT1B48ogeWg3332$29(oIFrameDocument)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oWin=oIFrameDocument.defaultView?oIFrameDocument.defaultView:oIFrameDocument.parentWindow;
try
{
if(oWin&&oWin.frameElement)
{
return oWin.frameElement;
}
}
catch(e)
{

}

return null;
};









vp.ui.getRootRect=function $vpfn_Zb7ggtPfs0NhBOPqH_I6bA3358$20(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vElement=vp.core.getElement(vElement,"vp.ui.getRootRect");


var oRect=vp.ui.getRect(vElement);


do
{
try
{

vElement=vp.ui.getIFrameForDocument(vElement.ownerDocument);
}
catch(ex)
{


vElement=null;
}

if(vElement)
{
try
{
var oFrameRect=vp.ui.getRect(vElement);


oRect.top+=oFrameRect.top;
oRect.left+=oFrameRect.left;
oRect.right+=oFrameRect.left;
oRect.bottom+=oFrameRect.top;
}
catch(ex)
{


}
}
}
while(vElement);

return oRect;
};









vp.ui.ensureIFrameSrc=function $vpfn_4MUGWRE8KwD1mTm0s3IWAQ3413$24(oIFrame)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oIFrame.src&&
vp.browser.isIE&&
window.location.protocol=="https:")
{
oIFrame.src=VP_UI_BLANK_IMAGE;
}
};






vp.ui.ensureLanguageIdParameter=function $vpfn_jY07X$3iMpo1khHu6DQ5pA3428$34(sSrc)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(sSrc.indexOf("langid")<=0)
{
var iLangId=typeof(window.languageId)=="undefined"?1:window.languageId;
var oURL=new vp.web.URL(sSrc);
oURL.setItem("langid",iLangId);
return oURL.toString();
}

return sSrc;
};







vp.ui.stripEmbeddedUrlParameters=function $vpfn_dkLyjbFr8z6Sbx2ZYWKDLw3447$35(sUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return sUrl.replace(/\/sf\/(.*)?\/\_/,"");
};









vp.ui.setImageSrcSprite=function $vpfn_g$3zJ8U0qTfvyK30y7$cHA3460$26(vImage,sSrc,bFailoverToNonSprite)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oImage=vp.core.getElement(vImage,"vp.ui.setImageSrcSprite");

if(!sSrc)
{
throw new Error("The specified image source was null or empty");
}

var fnFallback=function $vpfn_37HwYGHI2MioK2I5klwrJA3469$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vp.ui.setSrcPNGSimple(oImage,vp.ui.ensureLanguageIdParameter(sSrc));
oImage.style.backgroundImage="";
};


if(window.cssSpritesDisabled)
{
fnFallback();
return;
}


var oSpriteImage;
var sSpriteSrc;

try
{
if(!window._cssSprites)
{
throw new Error("No sprite data loaded");
}




var oUrl=new vp.web.URL(sSrc.toLowerCase());
var sSpriteKey=vp.ui.stripEmbeddedUrlParameters(oUrl.pathname);




sSpriteKey=vp.text.replace(sSpriteKey,"/","_");


var oSpriteData=window._cssSprites[sSpriteKey];
if(!oSpriteData)
{
throw new Error("Sprite data not found for image: "+sSrc);
}





oSpriteImage=window._cssSpriteImages[oSpriteData[4]];
sSpriteSrc=oSpriteImage.src;
}
catch(ex)
{
if(!bFailoverToNonSprite&&window.isDebug)
{
throw ex;
}

fnFallback();
return;
}


if(!vp.browser.supportsPng)
{
if(oSpriteImage.isSemiTransparent)
{

fnFallback();
return;
}
else if(oSpriteImage.hasGif)
{

sSpriteSrc=sSpriteSrc.replace(".png",".gif");
}
}

oImage.src=vp.ui.imageUrl("/vp/images/clearpixel.gif");
oImage.style.backgroundImage="url("+sSpriteSrc+")";
oImage.style.backgroundPosition="-"+oSpriteData[0]+"px "+"-"+oSpriteData[1]+"px";
oImage.style.width=oSpriteData[2]+"px";
oImage.style.height=oSpriteData[3]+"px";
};









vp.ui.scaleImageToFit=function $vpfn_Alm2ANRyXoAlcxN$xUO76Q3561$24(vImage,iMaxWidth,iMaxHeight)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var oImage=vp.core.getElement(vImage,"vp.ui.scaleImageToFit");


var fnCallback=function $vpfn__en78WlPMe8Z9brlv_vosg3567$21(oSize){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var iWidth=oSize.width;
var iHeight=oSize.height;


if(iWidth>iMaxWidth)
{
iHeight=parseInt(iHeight*iMaxWidth/iWidth);
iWidth=iMaxWidth;
}


if(iHeight>iMaxHeight)
{
iWidth=parseInt(iWidth*iMaxHeight/iHeight);
iHeight=iMaxHeight;
}


oImage.style.width=iWidth+"px";
oImage.style.height=iHeight+"px";
};

vp.ui.getNaturalSize(oImage,fnCallback);
};








vp.ui.getNaturalSize=function $vpfn_qVbtB3DfDBRJ88PJnwvPwQ3601$23(vImage,fnCallback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var oImage=vp.core.getElement(vImage,"vp.ui.getNaturalSize");


var iWidth=oImage.naturalWidth;
var iHeight=oImage.naturalHeight;


if(!iWidth||!iHeight)
{
var cachedImage=new Image();


if(fnCallback)
{
var fnCallbackWrapper=function $vpfn_HlcpRXhlkYnjo4OEZ4JYFg3618$36(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
fnCallback({
width:cachedImage.width,
height:cachedImage.height
});
};



vp.events.add(cachedImage,"load",fnCallbackWrapper);
cachedImage.src=oImage.src;
if(cachedImage.complete)
{
fnCallbackWrapper();
vp.events.remove(cachedImage,"load",fnCallbackWrapper);
}
}
else
{


cachedImage.src=oImage.src;
iWidth=cachedImage.width;
iHeight=cachedImage.height;
}
}
else
{

if(fnCallback)
{
fnCallback({
width:iWidth,
height:iHeight
});
}
}

return{width:iWidth,height:iHeight};
};






vp.ui.setDelayedImageSrc=function $vpfn_lNCR57SYxbRbW0sjMBzikw3664$27(vImage,sSrc)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fnAction=function $vpfn_23VseBDKaRwkb5$OyRPqGw3666$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oImage=vp.core.getElement(vImage,"vp.ui.setDelayedImageSrc");

var onLoadHandler=function $vpfn_8XkbyDDEsel3sQyMXVviJA3670$28(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oNaturalSize=vp.ui.getNaturalSize(oCachedImage);

oImage.style.width=oNaturalSize.width;
oImage.style.height=oNaturalSize.height;
oImage.src=sSrc;
};

var oCachedImage=new Image();
oCachedImage.onload=onLoadHandler;
oCachedImage.src=sSrc;
};

setTimeout(fnAction,1);
};
















vp.ui.isVisuallyAbove=function $vpfn_GDxOIXxhx5rEXKUZs_dpVQ3702$24(vElement1,vElement2)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vElement1=vp.core.getElement(vElement1,"vp.ui.isVisuallyOnTop");
vElement2=vp.core.getElement(vElement2,"vp.ui.isVisuallyOnTop");


if(vElement1===vElement2)
{
return false;
}




var fnGetStack=function $vpfn_o8WqcJGj3CPz5qkL3rubPA3716$21(vElement,aStack)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oParent=vElement;
while(oParent&&oParent.nodeType===1)
{
aStack.unshift(oParent);
oParent=oParent.parentNode;
}
};
var aParentStack1=[];
var aParentStack2=[];
fnGetStack(vElement1,aParentStack1);
fnGetStack(vElement2,aParentStack2);


while(aParentStack1[0]===aParentStack2[0])
{
aParentStack1.shift();
aParentStack2.shift();
}

if(aParentStack1.length===0)
{
return false;
}
if(aParentStack2.length===0)
{
return true;
}



var fnGetZindex=function $vpfn_4hucHBiQ3qCGQecr7WD29g3748$22(aStack)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var zIndex;
var stackIndex=0;
while(typeof(zIndex)=="undefined"&&aStack[stackIndex])
{



var z=vp.ui.getCurrentStyle(aStack[stackIndex],"zIndex");
var p=vp.ui.getCurrentStyle(aStack[stackIndex],"position");


if(p!="static"&&z!="auto")
{

zIndex=parseInt(z)||0;
}
stackIndex++;
}
return zIndex;
};
var izIndex1=fnGetZindex(aParentStack1);
var izIndex2=fnGetZindex(aParentStack2);

if(izIndex1==izIndex2)
{

var oParent1=aParentStack1[0];
var oParent2=aParentStack2[0];
while(oParent1)
{
if(oParent1.nextSibling===oParent2)
{
return false;
}
oParent1=oParent1.nextSibling;
}
return true;
}
else
{


return(izIndex1||0)>(izIndex2||0);
}
};




$(document).ready(
function $vpfn_D3kxkFA8aMLDUZJzGUeo1w3800$4()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.browser.isIE)
{
var ieVer=vp.browser.ver;

if(!(jQuery("body").hasClass("ie"+ieVer)))
{
jQuery("body").addClass("ie"+ieVer);
}

if(ieVer<9&&ieVer>5)
{
if(!(jQuery("body").hasClass("ie6to8")))
{
jQuery("body").addClass("ie6to8");
}
}
}
});




$(document).ready(
function $vpfn_D3kxkFA8aMLDUZJzGUeo1w3825$4()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.browser.isMobile&&vp.browser.isWebKit)
{



$("body")
.children("div,form,p")
.bind("mouseup mousedown click",function $vpfn_D3kxkFA8aMLDUZJzGUeo1w3834$49(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}return;});
}
});






vp.ui.enableDisabledOptions=function $vpfn_WegwCXfFOGu_QTf5VTU_3w3843$30(sSelectId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!vp.browser.isIE||vp.browser.ver>6)
{

return;
}

var oSelector=vp.ui.get(sSelectId);
var bHasDisabled=false;


for(var j=0;j<oSelector.options.length;j++)
{
if(oSelector.options[j].disabled)
{
oSelector.options[j].style.color='#CCC';
bHasDisabled=true;
}
}

if(!bHasDisabled)
{

return;
}


var fnOldChange=oSelector.onchange;


var fnNewChange=function $vpfn_I5C1UCxCzcexzOgKWltzTw3874$22(bFireRealChangeEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oSelector.options[oSelector.selectedIndex].disabled)
{
if(oSelector.options.length<=1)
{
this.selectedIndex=-1;
}
else
{

var newIndex=oSelector.selectedIndex;
var bFound=false;
for(var i=1;i<oSelector.options.length;i++)
{
if((oSelector.selectedIndex+i<oSelector.options.length-1)
&&!oSelector.options[oSelector.selectedIndex+i].disabled)
{
oSelector.selectedIndex+=i;
bFound=true;
break;
}
else if((oSelector.selectedIndex-i>=0)
&&!oSelector.options[oSelector.selectedIndex-i].disabled)
{
oSelector.selectedIndex-=i;
bFound=true;
break;
}
}
if(!bFound)
{
this.selectedIndex=-1;
}
}
}
else if(bFireRealChangeEvent)
{
fnOldChange();
}
};

oSelector.onchange=function $vpfn_3UFOY1gc1YGHFtuOomF$Zg3916$25()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
fnNewChange(true);
};

if(oSelector.options[oSelector.selectedIndex].disabled)
{
fnNewChange(false);
}
};
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}






vp.define("vp.web");






vp.web.xmlEncode=function $vpfn_wqDNkjCUBowSVPxZnNHnzQ17$19(sText,aAdditionalEncoders)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(sText===null||typeof(sText)=="undefined")
{
return null;
}
else if(typeof(sText)!="string")
{
sText=sText.toString();
}

var aBuilder=[];
var i;
var aEncoders=[vp.web._xmlCharEncoder];

if(aAdditionalEncoders)
{
for(i=0;i<aAdditionalEncoders.length;i++)
{
aEncoders.push(aAdditionalEncoders[i]);
}
}

for(i=0;i<sText.length;i++)
{
var sChar=sText.charAt(i);
var sEntity=null;
for(var j=0;j<aEncoders.length;j++)
{
sEntity=aEncoders[j](sChar);
if(sEntity)
{
break;
}
}

if(sEntity)
{
aBuilder.push(sEntity);
}
else
{
aBuilder.push(sChar);
}
}

return aBuilder.join("");
};






vp.web.xmlDecode=function $vpfn_vUPnasaRxD_N4Kq2xq6Jng71$19(sText,aAdditionalDecoders)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(sText===null||typeof(sText)=="undefined")
{
return null;
}
else if(typeof(sText)!="string")
{
sText=sText.toString();
}

var i;
var aDecoders=[vp.web._xmlEntityDecoder];
if(aAdditionalDecoders)
{
for(i=0;i<aAdditionalDecoders.length;i++)
{
aDecoders.push(aAdditionalDecoders[i]);
}
}

var aCurrentEntity=null;
var aBuilder=[];


for(i=0;i<sText.length;i++)
{
var sChar=sText.charAt(i);


if(aCurrentEntity===null)
{
if(sChar=="&")
{
aCurrentEntity=[];
}
else
{
aBuilder.push(sChar);
}
}
else
{
if(sChar==";")
{
var sVal=null;
var sCurrentEntity=aCurrentEntity.join("").toLowerCase();


for(var j=0;j<aDecoders.length;j++)
{
sVal=aDecoders[j](sCurrentEntity);
if(sVal)
{
break;
}
}

if(sVal)
{
aBuilder.push(sVal);
}
else
{

aBuilder.push("&");
aBuilder.push(sCurrentEntity);
aBuilder.push(";");
}

aCurrentEntity=null;
}
else
{
aCurrentEntity.push(sChar);



if(aCurrentEntity.length>7||(!VP_WEB_ENTITY_REGEX.test(sChar))||sChar=="_")
{
aBuilder.push("&");
aBuilder.push(aCurrentEntity.join(""));

aCurrentEntity=null;
}
}
}
}


if(aCurrentEntity!==null)
{
aBuilder.push("&");
aBuilder.push(aCurrentEntity.join(""));
}

return aBuilder.join("");
};






vp.web.xmlAttributeEncode=function $vpfn_lPJNdLnUL2l2Pv3aQUAscw175$28(sText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.web.xmlEncode(sText,[vp.web._xmlAttributeCharEncoder]);
};






vp.web.htmlEncode=function $vpfn_1rTw5oOe569SIwga96EPnA185$20(sText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.web.xmlEncode(sText,[vp.web._htmlCharEncoder]);
};






vp.web.htmlDecode=function $vpfn_63IJurGxV2g10RlzRu7lPg195$20(sText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.web.xmlDecode(sText,[vp.web._htmlEntityDecoder]);
};






vp.web.htmlAttributeEncode=function $vpfn_iGSecnKdBqBv9dFufDqicg205$29(sText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.web.xmlEncode(sText,[vp.web._xmlAttributeCharEncoder,vp.web._htmlAttributeCharEncoder]);
};






vp.web.xmlEncodeDoubleByteUnicodeToAscii=function $vpfn_l1MokT4vRmA4cpSrg1dPIQ215$43(sText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.web.xmlEncode(sText,[vp.web._xmlDoubleByteUnicodeToAsciiEncoder]);
};





vp.web._xmlCharEncoder=function $vpfn_iMxE3g6dTLIMruDODVXs4w224$25(sChar)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(sChar<=">"&&sChar>="\"")
{
switch(sChar)
{
case"<":
return"&lt;";
case">":
return"&gt;";
case"&":
return"&amp;";
default:
break;
}
}












return null;
};




vp.web._xmlAttributeCharEncoder=function $vpfn_zG$AtXdiZ_vGGWr2n6UrLg259$34(sChar)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(sChar<="\"")
{
switch(sChar)
{
case"\n":
return"&#xA;";
case"\f":
return"&#xC;";
case"\r":
return"&#xD;";
case"\"":
return"&quot;";
default:
break;
}
}

return null;
};




vp.web._htmlAttributeCharEncoder=function $vpfn_lQY7bZWjXX2NvA3ZtfHxkg285$35(sChar)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(sChar=="'")
{
return"&#39;";
}

return null;
};




vp.web._htmlCharEncoder=function $vpfn_cFfNCGaEVRBxSslLNyDJBg298$26(sChar)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

switch(sChar)
{
case"\u00A0":
return"&#160;";
case"\"":
return"&quot;";
default:
return null;
}
};




vp.web._xmlDoubleByteUnicodeToAsciiEncoder=function $vpfn_T8FuudP3mHkxYbJgOnPHvg315$45(sChar)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iCharCode=sChar.charCodeAt();
if(iCharCode>255)
{
var sCharCode=iCharCode.toString();
if(sCharCode.length<5)
{
sCharCode="00000".substr(0,5-sCharCode.length)+sCharCode;
}

return"&#"+sCharCode+";";
}
};




vp.web._xmlEntityDecoder=function $vpfn_ELNYlKQ7b4UzAv8GmVXu9A333$27(sEntity)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
switch(sEntity)
{
case"lt":
return"<";
case"gt":
return">";
case"amp":
return"&";
case"quot":
return"\"";
case"apos":
return"'";
default:
if(sEntity.charAt(0)=="#")
{
var iVal=NaN;
if(sEntity.charAt(1)=="x")
{

iVal=parseInt(sEntity.substring(2),16);
}
else
{



iVal=parseInt(sEntity.substring(1),10);
}

if(!isNaN(iVal))
{
return String.fromCharCode(iVal);
}
}
break;
}

return null;
};




vp.web._htmlEntityDecoder=function $vpfn_KEpg5D1RezTqeUhtRmVghg378$28(sEntity)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sEntityLower=sEntity.toLowerCase();
if(VP_WEB_HTML_ENTITY_MAP[sEntityLower])
{
return String.fromCharCode(VP_WEB_HTML_ENTITY_MAP[sEntityLower]);
}

return null;
};

var VP_WEB_ENTITY_REGEX=/[\w\&\#]/;

var VP_WEB_HTML_ENTITY_MAP={
"nbsp":160,
"iexcl":161,
"cent":162,
"pound":163,
"curren":164,
"yen":165,
"brvbar":166,
"sect":167,
"uml":168,
"copy":169,
"ordf":170,
"laquo":171,
"not":172,
"shy":173,
"reg":174,
"macr":175,
"deg":176,
"plusmn":177,
"sup2":178,
"sup3":179,
"acute":180,
"micro":181,
"para":182,
"middot":183,
"cedil":184,
"sup1":185,
"ordm":186,
"raquo":187,
"frac14":188,
"frac12":189,
"frac34":190,
"iquest":191,
"times":215,
"divide":247,
"agrave":192,
"aacute":193,
"acirc":194,
"atilde":195,
"auml":196,
"aring":197,
"aelig":198,
"ccedil":199,
"egrave":200,
"eacute":201,
"ecirc":202,
"euml":203,
"igrave":204,
"iacute":205,
"icirc":206,
"iuml":207,
"eth":208,
"ntilde":209,
"ograve":210,
"oacute":211,
"ocirc":212,
"otilde":213,
"ouml":214,
"oslash":216,
"ugrave":217,
"uacute":218,
"ucirc":219,
"uuml":220,
"yacute":221,
"thorn":222,
"szlig":223,
"agrave":224,
"aacute":225,
"acirc":226,
"atilde":227,
"auml":228,
"aring":229,
"aelig":230,
"ccedil":231,
"egrave":232,
"eacute":233,
"ecirc":234,
"euml":235,
"igrave":236,
"iacute":237,
"icirc":238,
"iuml":239,
"eth":240,
"ntilde":241,
"ograve":242,
"oacute":243,
"ocirc":244,
"otilde":245,
"ouml":246,
"oslash":248,
"ugrave":249,
"uacute":250,
"ucirc":251,
"uuml":252,
"yacute":253,
"thorn":254,
"yuml":255
};






vp.web.urlDecode=function $vpfn_RDa3woJNRduvtS5pz_6K5g495$19(sText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!sText)
{
sText="";
}
else
{
sText=sText.toString();
}

if(typeof decodeURIComponent!="undefined")
{
try
{
return decodeURIComponent(sText);
}
catch(e){}
}

return unescape(sText);
};






vp.web.urlEncode=function $vpfn_JeThDqcIPa5Z_SRSkJe0cA523$19(sText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!sText)
{
sText="";
}
else
{
sText=sText.toString();
}

if(typeof encodeURIComponent!="undefined")
{
var sOut=encodeURIComponent(sText);
sOut=sOut.replace(/\(/gi,"%28");
sOut=sOut.replace(/\)/gi,"%29");
return sOut.replace(/'/gi,"%27");
}
else
{
return escape(sText);
}
};







vp.web.cookieDecode=function $vpfn_B70IAKP91Q1H3u11Wnpo8w553$22(sText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!sText)
{
return"";
}
else
{
sText=sText.toString();
}


sText=sText.replace(/\+/gi,"%20").replace(/\%2B/gi,"+");


return this.urlDecode(sText);
};








vp.web.cookieEncode=function $vpfn_aGo2hf15UlJgWkV7HTirAg578$22(sText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!sText)
{
return"";
}
else
{
sText=sText.toString();
}


sText=this.urlEncode(sText);


sText=sText.replace(/\+/gi,"%2B").replace(/\%20/gi,"+");


return sText;
};





vp.cookies=function(){};





vp.cookies.currentDomain=(function $vpfn_Vk6_nELnADuZ9xSNKXbpFw609$28(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(location.host=="localhost"){
return"";
}else{
if(location.host.indexOf("www.")===0||location.host.indexOf("secure.")===0){
return location.host.substring(location.host.indexOf("."));
}else{
return location.host;
}
}

})();





vp.cookies.isEnabled=function $vpfn_dBxrBMabAD2ZEb5Q2vepaA627$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.cookies.setValue("test","value");
if(vp.cookies.getValue("test")=="value")
{
vp.cookies.remove("test");
return true;
}
else
{
return false;
}
};





vp.cookies.ERROR_MAX_COOKIE_LENGTH_EXCEEDED=1;






vp.cookies.getValue=function $vpfn_U70pu00ArqFes7hYsCm1YA652$22(sName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oCookies=new vp.cookies.Cookies();
if(oCookies[sName]&&!oCookies[sName].subCookies)
{
return oCookies[sName].value;
}

return"";
};







vp.cookies.getSubValue=function $vpfn_U7dx5kO9T1YQDBLncrvXLg669$25(sName,sSubCookie)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oCookies=new vp.cookies.Cookies();
if(oCookies[sName]&&oCookies[sName].subCookies)
{
return oCookies[sName].subCookies[sSubCookie];
}

return"";
};








vp.cookies._ensureDomain=function $vpfn_RerFsRlmdAfwyZ2FmOHA0g687$27(sDomain)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!sDomain&&window.vpCookieDomain)
{
sDomain=window.vpCookieDomain;
}
return sDomain;
};








vp.cookies.setValue=function $vpfn_Cj1GSDMXBkID4fdQn38GUg703$22(sName,sValue,sDomain,bIsPermanent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oCookie=new vp.cookies.Cookie();
oCookie.name=sName;
oCookie.value=sValue;
oCookie.domain=vp.cookies._ensureDomain(sDomain);
oCookie.isPermanent=bIsPermanent;
oCookie.save();
};









vp.cookies.setSubValue=function $vpfn_TpRWtlU3pboNrl5TqYgoCw721$25(sName,sSubCookie,sValue,sDomain,bIsPermanent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oCookies=new vp.cookies.Cookies();
var oCookie=oCookies[sName];

if(oCookie)
{
if(oCookie.value)
{
oCookie.value=null;
}
if(!oCookie.subCookies)
{
oCookie.subCookies={};
}
oCookie.subCookies[sSubCookie]=sValue;
}
else
{
oCookie=new vp.cookies.Cookie();
oCookie.name=sName;
oCookie.subCookies={};
oCookie.subCookies[sSubCookie]=sValue;
}

oCookie.domain=vp.cookies._ensureDomain(sDomain);
oCookie.isPermanent=bIsPermanent;

oCookie.save();
};





vp.cookies.remove=function $vpfn_mCEK0fxGkP6bH6SSwWqlIw756$20(sName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sCookie=vp.web.cookieEncode(sName)+"=a; path=/; expires=Wed, 17 Jan 1979 07:01:00 GMT";
if(vp.cookies.currentDomain!=="")
{
sCookie+="; domain="+vp.cookies.currentDomain;
}
document.cookie=sCookie;
};





vp.cookies.Cookies=function $vpfn_OzOHWQW_ozL2E8bZNvobjQ770$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;
var sCookie=document.cookie.toString();
var aCookieValues=sCookie.split(";");

var iLen=aCookieValues.length;
for(var i=0;i<iLen;i++)
{
var oCookie=new vp.cookies.Cookie();
oCookie.parse(aCookieValues[i]);
if(oCookie.name)
{
me[oCookie.name]=oCookie;
}
}
};





vp.cookies.Cookie=function $vpfn_tkGRUFrzOheGR9C1KJngng792$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;





this.name=null;





this.subCookies=null;





this.value=null;





this.domain=null;





this.isPermanent=false;

var validateName=function $vpfn_ugqSaBfKt8Oaw$Vf$AMQcQ826$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.name)
{
throw new Error("vp.cookies.Cookie: Cookie name is null.");
}
};





this.serialize=function $vpfn_PEQPDMD0hEtj0a_yWGs$5Q838$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
validateName();

var sCookie=vp.web.cookieEncode(me.name)+"="+getEncodedValue();

sCookie+="; path=/";

var sDomain=me.domain?me.domain:vp.cookies.currentDomain;
if(sDomain)
{
sCookie+="; domain="+sDomain;
}

if(me.isPermanent)
{

var dDate=new Date();
dDate.setFullYear(dDate.getFullYear()+1);

sCookie+="; expires="+dDate.toUTCString();
}

return sCookie;
};




this.save=function $vpfn_I2rpprFYfOCq1F1VqhIz1w867$16()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
validateName();



var aFullCookie=[];
var oCookies=new vp.cookies.Cookies();


delete oCookies[me.name];

for(var sCookie in oCookies)
{
aFullCookie.push(oCookies[sCookie].serialize());
}
var sAllCookies=aFullCookie.join("; ");

var sThisCookie=me.serialize();











document.cookie=sThisCookie;
};





this.parse=function $vpfn_JTZEnH57FXcQjDyIqWRnSQ904$17(sUnparsedValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!sUnparsedValue)
{
return;
}


sUnparsedValue=sUnparsedValue.replace(/^\s*(.*?)\s*$/,"$1");


var iPosEquals=sUnparsedValue.indexOf("=");
if(iPosEquals<=0)
{
return;
}

me.name=vp.web.cookieDecode(sUnparsedValue.substr(0,iPosEquals));

var sValue=sUnparsedValue.substr(iPosEquals+1);
if(sValue.indexOf("=")==-1)
{
me.value=vp.web.cookieDecode(sValue);
return;
}

me.subCookies={};

var aSubCookies=sValue.split("&");
var iLen=aSubCookies.length;
for(var i=0;i<iLen;i++)
{
var aSubCookie=aSubCookies[i].split("=");
if(aSubCookie.length!=2)
{
me.subCookies=null;
return;
}
else
{
me.subCookies[vp.web.cookieDecode(aSubCookie[0])]=vp.web.cookieDecode(aSubCookie[1]);
}
}
};




var getEncodedValue=function $vpfn_9k5fUj$eThxHAOeWv$Xtmw952$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.subCookies)
{
var aOut=[];
for(var sSub in me.subCookies)
{
aOut.push(vp.web.cookieEncode(sSub)+"="+vp.web.cookieEncode(me.subCookies[sSub]));
}
return aOut.join("&");
}
else
{
return vp.web.cookieEncode(me.value);
}
};
};










vp.web.URL=function $vpfn_PMlYCaT$N2jvDQ2Lqprjog979$13(sUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var _sUrl=sUrl.toString();
var me=this;





this.hash="";





this.protocol="";





this.hostname="";






this.host="";





this.port="";





this.queryString="";





this.search="";





this.pathname="";

var load=function $vpfn_mFzhkDZz3BMqkq8yunSu9A1033$15()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var nTemp;

var iNextPart;
var sTemp=_sUrl;


if(sTemp.search(/https\:\/\/+/i)===0)
{
me.protocol="https:";
sTemp=_sUrl.substr(8);
}
else if(sTemp.search(/http\:\/\/+/i)===0)
{
me.protocol="http:";
sTemp=_sUrl.substr(7);
}

if(sTemp.length===0)
{
return;
}


if(me.protocol!=="")
{

iNextPart=sTemp.search(/[\/\?\#]/i);
if(iNextPart==-1)
{
me.host=sTemp;
return;
}

me.host=sTemp.substring(0,iNextPart);
sTemp=sTemp.substr(iNextPart);
}


if(me.host&&me.host!=="")
{
var iColon=me.host.indexOf(':');
if(iColon!=-1)
{
me.hostname=me.host.substr(0,iColon);
me.port=me.host.substr(iColon+1,me.host.length);
}
else
{
me.hostname=me.host;
}
}

if(sTemp.length===0)
{
return;
}

iNextPart=sTemp.search(/[\?\#]/i);


if(iNextPart!==0)
{
if(iNextPart==-1)
{
me.pathname=sTemp;
return;
}

me.pathname=sTemp.substr(0,iNextPart);
sTemp=sTemp.substr(iNextPart);
}

if(sTemp.length===0)
{
return;
}



if(sTemp.indexOf('?')===0)
{
iNextPart=sTemp.indexOf("#");

if(iNextPart==-1)
{
me.queryString=sTemp.substr(1);
sTemp="";
}
else
{
me.queryString=sTemp.substring(1,iNextPart);
sTemp=sTemp.substr(iNextPart);
}

updateSearch();
}

if(sTemp.length===0)
{
return;
}


if(sTemp.indexOf("#")===0)
{
me.hash=sTemp;
}
};

var updateSearch=function $vpfn_apnareGGp1FpeoZ8JwxmCw1144$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.search="";
if(me.queryString&&me.queryString!=="")
{
me.search="?"+me.queryString;
}
};





this.toString=function $vpfn_ZB60O7jjn$qotoOhZvSJFw1157$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sPort=me.port;
var sProtocol=me.protocol;

if(sPort&&sPort!=="")
{
sPort=':'+sPort;
}
if(sProtocol&&sProtocol!=="")
{
sProtocol=sProtocol+"//";
}
return sProtocol+me.hostname+sPort+me.pathname+me.search+me.hash;
};





this.getItem=function $vpfn_Fn9YIdi1tEkRJ99rZNvl7A1177$19(sKey,vDefaultValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oHash=new vp.web.QueryString(me.queryString);
return oHash.getItem(sKey,vDefaultValue);
};

this.getItemOrDefault=this.getItem;




this.setItem=function $vpfn_sJZNPFkNCgEyIrkauyRWww1188$19(sKey,sValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oHash=new vp.web.QueryString(me.queryString);
oHash.setItem(sKey,sValue);
me.queryString=oHash.toString();

updateSearch();
};




this.removeItem=function $vpfn_RsrctSLeFoQ82YVe1IYLpQ1200$22(sKey)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oHash=new vp.web.QueryString(me.queryString);
oHash.removeItem(sKey);
me.queryString=oHash.toString();

me.search="";
if((me.queryString)!=="")
{
me.search='?'+me.queryString;
}
};

load();
};














vp.web.DelimitedString=function $vpfn_XYNiakCK0KSJxIrVA4RF7w1229$25(vData,sItemDelimiter,sPairDelimiter,fnEncoder,fnDecoder,bCaseInsensitiveKeys)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}




this.items={};

var _oCaseInsensitiveItems={};





this.count=0;






this.itemDelimiter=sItemDelimiter;






this.pairDelimiter=sPairDelimiter;

this.caseSensitiveKeys=bCaseInsensitiveKeys?false:true;





this.fnEncoder=fnEncoder?fnEncoder:function $vpfn_Vk6_nELnADuZ9xSNKXbpFw1265$45(sStr){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}return sStr;};





this.fnDecoder=fnDecoder?fnDecoder:function $vpfn_Vk6_nELnADuZ9xSNKXbpFw1271$45(sStr){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}return sStr;};

var me=this;






this.setItem=function $vpfn_sJZNPFkNCgEyIrkauyRWww1280$19(sKey,sValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(sKey)!="string")
{
sKey=sKey.toString();
}

if(typeof(me.getItem(sKey))=="undefined")
{
me.count++;
}

me.items[sKey]=sValue;

if(!me.caseSensitiveKeys)
{
_oCaseInsensitiveItems[sKey.toLowerCase()]=sValue;
}
};






this.getItem=function $vpfn_Fn9YIdi1tEkRJ99rZNvl7A1305$19(sKey,defaultValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!sKey&&sKey!==0)
{
throw new Error("DelimitedString.getItem(): sKey must be supplied");
}

if(typeof(sKey)!="string")
{
sKey=sKey.toString();
}

var type=typeof(defaultValue);

var value=me.caseSensitiveKeys?me.items[sKey]:_oCaseInsensitiveItems[sKey.toLowerCase()];

switch(type)
{
case"undefined":
return value||defaultValue;
case"boolean":
return vp.core.getBoolean(value,defaultValue);
case"number":
return vp.core.getNumber(value,defaultValue);
default:
return value||defaultValue;
}

return value;
};







this.getItemOrDefault=this.getItem;





this.removeItem=function $vpfn_RsrctSLeFoQ82YVe1IYLpQ1348$22(sKey)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(me.getItem(sKey))!="undefined")
{
me.count--;
}

var oHash=me.items;
delete oHash[sKey];

if(!me.caseSensitiveKeys)
{
var oHashCI=_oCaseInsensitiveItems;
delete oHashCI[sKey.toLowerCase()];
}
};






this.load=function $vpfn_O13ttvTZvJXmpFavXnm2Cw1370$16(vData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.items={};
me.append(vData);
};






this.append=function $vpfn_Svd4$JoVyW9Wdl8R71vHNA1381$18(vData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(vData)=="string")
{
if(vData&&vData!=="")
{
var arrPairs=vData.split(me.itemDelimiter);
var iLen=arrPairs.length;
for(var i=0;i<iLen;i++)
{
if(arrPairs[i].length>0)
{
var arrPair=arrPairs[i];
var delimIndex=arrPair.indexOf(me.pairDelimiter);

if(delimIndex>0&&delimIndex<arrPair.length-1){
var key=arrPair.substring(0,delimIndex);
var value=arrPair.substring(delimIndex+1);
me.setItem(fnDecoder(key),fnDecoder(value));
}
}
}
}
}
else if(typeof(vData)=="object")
{
for(var sProp in vData)
{
me.items[sProp]=vData[sProp];
}
}
else
{
throw new Error("vData must be a delimited string or a dictionary of key/value pairs");
}
};





this.toString=function $vpfn_ZB60O7jjn$qotoOhZvSJFw1422$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var arrTemp=[];
for(var sKey in me.items)
{
arrTemp.push(me.fnEncoder(sKey)+me.pairDelimiter+me.fnEncoder(me.items[sKey]));
}
return arrTemp.join(me.itemDelimiter);
};

if(vData)
{
this.load(vData);
}
};









vp.web.CssString=function $vpfn_p$7SVvtPnZmHcvTyTnuRnQ1446$19(vCss)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fnDecoder=vp.text.trim;




this.inheritFrom=vp.web.DelimitedString;
this.inheritFrom(vCss,";",":",null,fnDecoder);

var me=this;

var base_getItem=this.getItem;






this.getItem=function $vpfn_Fn9YIdi1tEkRJ99rZNvl7A1465$19(sKey)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sRet=base_getItem(sKey);
if(typeof(sRet)!="undefined"&&sRet!==null)
{
return sRet;
}

var sNewKey=vp.ui.convertCssPropertyToStringFormat(sKey);

return base_getItem(sKey);
};





this.getPropertyMap=function $vpfn__wb0$_DZYbJ2e7AlTE3gvg1482$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oMap={};

for(var sProp in me.items)
{
oMap[vp.ui.convertCssPropertyToCssFormat(sProp)]=me.items[sProp];
}

return oMap;
};
};











vp.web.QueryString=function $vpfn_$ocA4UHvXdNlzVxB$SZFgw1505$21(vQueryString)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(vQueryString&&vQueryString.indexOf&&vQueryString.indexOf("?")===0)
{
vQueryString=vQueryString.substr(1);
}




this.inheritFrom=vp.web.DelimitedString;
this.inheritFrom(vQueryString,"&","=",encodeURIComponent,vp.web.urlDecode,true);
};

vp.web.ResponseHeader=function $vpfn_lOUJhri8KWo_LLgrmffF3Q1520$24(sResponseHeader)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fnDecoder=vp.text.trim;



this.inheritFrom=vp.web.DelimitedString;
this.inheritFrom(sResponseHeader,"\n",":",null,fnDecoder,true);

};






vp.web.createQueryString=function $vpfn_6LabJjZmIsyqymw2i0GMpQ1536$27(oData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sQueryString="";

for(var sParam in oData)
{
if(sQueryString)
{
sQueryString+="&";
}

sQueryString+=vp.web.urlEncode(sParam)+"="+vp.web.urlEncode(oData[sParam]);
}

return sQueryString;
};







vp.web.getQueryString=function $vpfn_XnnIK20skejtMHRVLP93sg1559$24(sKey,oDoc,defaultValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(oDoc)!="object")
{
defaultValue=oDoc;
oDoc=null;
}

oDoc=oDoc||document;


if(!oDoc._CachedQueryString)
{
oDoc._CachedQueryString=new vp.web.QueryString(oDoc.location.search);
}

var sRet=oDoc._CachedQueryString.getItem(sKey,defaultValue);

return typeof(sRet)=="undefined"?"":sRet;
};






vp.web.refreshImage=function $vpfn_fIdqo0tvm7Qb9AveSj0EVg1585$22(vImage)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oImage=vp.core.getElement(vImage,"vp.web.refreshImage");

var oUrl=new vp.web.URL(oImage.src);
oUrl.setItem("imgversion",(new Date()).valueOf());

oImage.src=oUrl.toString();
};









vp.web.setUrlHashData=function $vpfn_7Xi05h8cJq2bZ7xWCR98tA1603$24(sKey,sValue,oDoc)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oQS=vp.web.getUrlHash(oDoc);
oQS.setItem(sKey,sValue);
vp.web.setUrlHash(oQS,oDoc);
};









vp.web.getUrlHashData=function $vpfn_5896CGodoNx2HwPJy$TBwQ1618$24(sKey,oDoc)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oQS=vp.web.getUrlHash(oDoc);
return oQS.getItem(sKey);
};








vp.web.setUrlHash=function $vpfn_jDjKp107phczDoCU3VrYLA1631$20(oHash,oDoc)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oDoc=oDoc||document;
oDoc.location.hash="#"+oHash.toString();
};








vp.web.getUrlHash=function $vpfn_cDwJ4fRxy402cv8jE5OriA1644$20(oDoc)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oDoc=oDoc||document;
var sHash=document.location.hash;

if(sHash.indexOf("#")===0)
{
sHash=sHash.substr(1);
}

return new vp.web.QueryString(sHash);
};






vp.web.getInnerText=function $vpfn_4erxV1Yt$vrpRBBWPnxJhQ1662$22(oElem)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
try
{
if(typeof(oElem.innerText)!="undefined")
{
return oElem.innerText;
}
else if(oElem.textContent)
{
return(oElem.textContent);
}
}
catch(ex){}

var r=oElem.ownerDocument.createRange();
r.selectNodeContents(oElem);
return r.toString();
};







vp.web.getOuterHTML=function $vpfn_pj2tW0FE9GgOsphXuqO1cw1688$22(oElem)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oElem.outerHTML)
{
return oElem.outerHTML;
}

var aTag=[];

aTag.push("<"+oElem.tagName);
var oAttr=oElem.attributes;
var iLen=oAttr.length;
for(var i=0;i<iLen;i++)
{
aTag.push(" "+oAttr[i].nodeName+"=\""+vp.web.xmlAttributeEncode(oAttr[i].nodeValue)+"\"");
}
aTag.push(">"+oElem.innerHTML+"</"+oElem.tagName+">");

return aTag.join("");
};

var XML_ACTIVE_X_IDS=[
"MSXML2.DOMDocument.6.0",
"MSXML2.DOMDocument.3.0",
"MSXML2.DOMDocument",
"Microsoft.XMLDOM"
];







vp.web.getXMLDocument=function $vpfn_AcPIQKWmKVPH8I_MsvPU0g1722$24(sXML)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oXMLDoc;

if(typeof(ActiveXObject)!="undefined")
{
var oObj;
for(var i=0;i<XML_ACTIVE_X_IDS.length;i++)
{
try
{




oObj=new ActiveXObject(XML_ACTIVE_X_IDS[i]);

if(oObj)
{
oXMLDoc=oObj;
break;
}
}
catch(ex){}
}

if(!oXMLDoc)
{
throw new Error("Could not create XML DOM document.");
}

if(sXML)
{
oXMLDoc.async=false;
oXMLDoc.loadXML(sXML);
}
}
else if(document.implementation&&document.implementation.createDocument)
{
if(sXML)
{
var oParser=new window.DOMParser();
oXMLDoc=oParser.parseFromString(sXML,"text/xml");
}
else
{
oXMLDoc=document.implementation.createDocument("","",null);
}
}

return oXMLDoc;
};






vp.web.getInnerXML=function $vpfn_AS_6EqQX2EflUnF22aPHQQ1780$21(oXmlNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


if(oXmlNode.nodeType==1)
{
var aStringBuilder=[];

var oChildNodes=oXmlNode.childNodes;
var iLen=oChildNodes.length;
for(var i=0;i<iLen;i++)
{
aStringBuilder.push(vp.web.getOuterXML(oChildNodes[i]));
}

return aStringBuilder.join("");
}
else
{
return vp.web.xmlEncode(oXmlNode.nodeValue);
}
};






vp.web.getOuterXML=function $vpfn_jjQZivDAp_vwP79gLelXgQ1808$21(oXmlNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}





if(oXmlNode.nodeType==1)
{
if(!vp.browser.isIE&&window.XMLSerializer)
{
if(!window._XMLSerializerInstance)
{
window._XMLSerializerInstance=new window.XMLSerializer();
}
return window._XMLSerializerInstance.serializeToString(oXmlNode);
}
else
{
return oXmlNode.xml;
}
}
else
{
return vp.web.xmlEncode(oXmlNode.nodeValue);
}
};





vp.web.getOwnerDocument=function $vpfn_SVZvw9pGdy0JEgWhZPY7TA1840$26(oNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

return oNode.ownerDocument||oNode;
};


vp.web.forceIE8=function $vpfn_6nrp2ZTN$WR6c2BkHtbYYA1847$18(bForceIE8)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.cookies.setValue("forceIE8",bForceIE8.toString());
};

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;


}




if(typeof vp=="undefined"){
var vp={};
}





vp.win=function(){};





vp.win.childWindows=[];








vp.win._checkForWindow=function $vpfn_guggC0pYd8$ZXf0bJnvnYw32$25(oWindow,sFunc){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(!oWindow){
throw new Error("Call to vp.win."+sFunc+"() with a null window reference.");
}

if(!oWindow.resizeTo||!oWindow.moveTo){
throw new Error("Call to vp.win."+sFunc+"() with a non-window argument.");
}
};







vp.win.verifyWindow=function $vpfn_$VuzvTTOfWH62ohHb57JGg49$22(oWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oWindow)
{
return false;
}
try
{
if(oWindow.closed)
{
return false;
}

if(!oWindow.resizeTo||!oWindow.moveTo)
{
return false;
}

var sUrl=oWindow.document.location.href;

return true;

}
catch(ex)
{
return false;
}
};







vp.win.center=function $vpfn_R3vUXFKCaje16RrjmSamgg84$16(oWindow){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

oWindow=oWindow||window;


this._checkForWindow(oWindow);


var iWidth=0,iHeight=0;

if(oWindow.dialogWidth){
iWidth=parseInt(oWindow.dialogWidth);
iHeight=parseInt(oWindow.dialogHeight);
}else if(typeof oWindow.innerWidth=="number"){
iWidth=oWindow.innerWidth;
iHeight=oWindow.innerHeight;
}else if(document.documentElement){
iWidth=document.documentElement.offsetWidth;
iHeight=document.documentElement.offsetHeight;
}else if(document.body){
iWidth=document.body.clientWidth;
iHeight=document.body.clientHeight;
}


if(oWindow.dialogWidth){
oWindow.dialogLeft=((screen.availWidth/2)-(iWidth/2))+"px";
oWindow.dialogTop=((screen.availHeight/2)-(iHeight/2))+"px";
}else{
oWindow.moveTo((screen.availWidth/2)-(iWidth/2),(screen.availHeight/2)-(iHeight/2));
}

};









vp.win.close=function $vpfn_cENH8fMeHyG9upJj61j36Q126$15(oWindow){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


oWindow=oWindow||window;


this._checkForWindow(oWindow,"close");


oWindow.top.close();
};





vp.win.closeChildWindows=function $vpfn_faYaQT99fkjhVvBxe1va3Q142$27(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


for(var i=0,c=this.childWindows.length;i<c;i++){
try{this.childWindows[i].close();}
catch(ex){}
}

};







vp.win.isPopup=function $vpfn_$hZUyYZDF$W7Zh1gicWwfA158$17(oWindow){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


oWindow=oWindow||window;


this._checkForWindow(oWindow,"isPopup");


return!!oWindow.top.opener;
};












vp.win.open=function $vpfn__6h$HJDGH3bR8eNkE0eOtQ181$14(sUrl,sName,sFeatures,bDisablePopupBlockingWarning,bIsCrossDomain){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

try
{

var oWin=window.open(sUrl,sName,sFeatures);


if(!oWin)
{
if(!bDisablePopupBlockingWarning)
{
alert(vp.LangMap["PopupBlockerWarning"]);
}

return null;
}


if(!bIsCrossDomain)
{
var oTemp=oWin.document;
}


this.childWindows[this.childWindows.length]=oWin;

oWin.focus();


return oWin;

}
catch(ex)
{
return null;
}
};















vp.win.openCentered=function $vpfn_7VEPIbiqmQfCFyZnJGbtgg234$22(sUrl,sName,iWidth,iHeight,bResizable,bScrolling,bIsCrossDomain){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

iWidth=Math.min(iWidth,screen.width);
iHeight=Math.min(iHeight,screen.height);


var sFeatures="width="+iWidth+",height="+iHeight;


var iLeft=screen.width/2-iWidth/2;
var iTop=screen.height/2-iHeight/2;


sFeatures+=",left="+iLeft+",top="+iTop;


sFeatures+=",resizable="+(bResizable?"yes":"no")+",scrollbars="+(bScrolling?"yes":"no");


return vp.win.open(sUrl,sName,sFeatures,bIsCrossDomain);

};












vp.win.resizeAndCenter=function $vpfn_K1fzvLlscPxP_ThHTsWsow268$25(iWidth,iHeight,oWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oWindow)
{
oWindow=window;
}

var bBodyAvailable=(oWindow&&oWindow.document&&oWindow.document.body)?true:false;

if(!iHeight&&bBodyAvailable)
{
iHeight=oWindow.document.body.scrollHeight+5;
}
else if(!iHeight)
{
throw new Error("vp.win.resizeAndCenter(): document.body not available- call resize window from vp.events.addToOnLoad()");
}

if(!iWidth)
{
iWidth=oWindow.document.body.scrollWidth;
}
else if(!iWidth)
{
throw new Error("vp.win.resizeAndCenter(): document.body not available- call resize window from vp.events.addToOnLoad()");
}

var MAX_HEIGHT=600;
var MAX_WIDTH=800;

if(iWidth>MAX_WIDTH)
{
iWidth=MAX_WIDTH;
}

if(iHeight>MAX_HEIGHT)
{
iHeight=MAX_HEIGHT;
}

if(oWindow.dialogHeight)
{
oWindow.dialogHeight=iHeight+"px";
oWindow.dialogWidth=iWidth+"px";


if(oWindow.document.body.offsetHeight<iHeight)
{
oWindow.dialogHeight=(parseInt(oWindow.dialogHeight)+(iHeight-oWindow.document.body.offsetHeight))+"px";
}

vp.win.center(oWindow);
return;
}

var fnTimeout=function $vpfn_c5kHLwyFbZHnSTnf2tZkZg323$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
try
{
oWindow.resizeTo(iWidth,iHeight);
}
catch(err)
{

}

if(bBodyAvailable)
{
var oBody=oWindow.document.body;

if(oBody.scrollHeight>oBody.clientHeight||oBody.scrollWidth>oBody.clientWidth){
oWindow.resizeBy(0,(oBody.scrollHeight-oBody.clientHeight)+20);
}
}

vp.win.center(oWindow);
};


setTimeout(fnTimeout,10);
};









vp.win.getCallbackHandler=function $vpfn_SMLumYBx1y1K4Ns_NPt_aw358$28(iCallbackID,oWin)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oWin)
{
if(window.parent&&window.parent!=window)
{

oWin=window.parent;
}
else if(window.opener)
{

oWin=window.opener;
}
else
{
throw new Error("vp.win.getCallbackHandler: unable to reach parent window.");
}
}


if(!oWin||!oWin.__callbackHandlers)
{
return null;
}
return oWin.__callbackHandlers[iCallbackID];
};








vp.win.createCallbackHandler=function $vpfn_5HM8$8AzUrTMPv93Jl1jVA393$31(fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!window.__callbackHandlers)
{
window.__callbackHandlers=[];
}

var iIndex=-1;
for(var i=0;i<window.__callbackHandlers.length;i++)
{
try
{
if(window.__callbackHandlers[i]==fnHandler)
{
iIndex=i;
break;
}
}
catch(e)
{
window.__callbackHandlers.remove(i);
i--;
}
}

if(iIndex!=-1)
{
return iIndex;
}

window.__callbackHandlers.add(fnHandler);

return window.__callbackHandlers.length-1;
};










vp.win.resizeIFrameToContent=function $vpfn_a5yFH82Y4BTl6G2VFrkCGg437$31(vIFrame,bHeight,bWidth)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(vIFrame)=="string")
{
vIFrame=parent.document.getElementById(vIFrame);
}

if(vIFrame)
{
var frameDoc=vIFrame.contentDocument||vIFrame.contentWindow.document;


var x,y;
var scroll=frameDoc.body.scrollHeight;
var offset=frameDoc.body.offsetHeight;
if(scroll>offset)
{
x=frameDoc.body.scrollWidth;
y=frameDoc.body.scrollHeight;
}
else

{
x=frameDoc.body.offsetWidth;
y=frameDoc.body.offsetHeight;
}

if(bHeight)
{
vIFrame.style.height=y+'px';
}

if(bWidth)
{
vIFrame.style.width=x+'px';
}
}
};







vp.win.waitForLoadAndNavigate=function $vpfn_9MrJoC05Oq9lPI5a9l9BSg482$32(oWin,sURL)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oWin)
{
return;
}
else if(!oWin.document)
{
var fnRetry=function $vpfn_WBcM33Ow3rVphBR_FdgDOQ490$22()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.win.waitForLoadAndNavigate(oWin,sURL);
};
setTimeout(fnRetry,500);
}
else
{
oWin.document.location.replace(sURL);
}
};

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}








(function $vpfn_0bVm4I4bNyZ8fag7ZzxdRg10$1(window,$)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$.bool=vp.core.getBoolean;
$.number=vp.core.getNumber;
$.urlEncode=vp.web.urlEncode;
$.urlDecode=vp.web.urlDecode;
$.htmlEncode=vp.web.htmlEncode;
$.htmlDecode=vp.web.htmlDecode;
$.queryString=vp.web.getQueryString;

var verifyCount=function $vpfn_B4y5U0yVAdlouA0oHJ4C$Q20$22($elem,callerName,expectedCount)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if($elem.length!=expectedCount)
{
throw new Error("Expected "+expectedCount+" element(s), but got "+$elem.length+" in jquery.getElement(): "+callerName);
}

return $elem;
};

$.getElement=function $vpfn_aFlNMK8caT4R4eYjwWYriw30$19(vElement,callerName,expectedCount)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!vElement)
{
throw new Error("No element or ID passed to jquery.getElement(): "+callerName);
}

if(typeof(expectedCount)=="undefined")
{
expectedCount=1;
}



if(vElement.jquery)
{
verifyCount(vElement,callerName,expectedCount);

return vElement;
}

if(typeof(vElement)=="string")
{
var c=vElement.charAt(0);
if(c=="."||c=="#"||c==":"||c=="[")
{
return verifyCount($(vElement),callerName,expectedCount);
}
else
{
return verifyCount($("#"+vElement));
}
}
else if(typeof(vElement)=="object")
{
return $(vElement);
}

throw new Error("Invalid argument passed to jquery.getElement(): "+callerName);
};

})(window,jQuery);

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}













(function $vpfn_2SbJsmeL5S_lEI9h4o39Pg15$1(window,$)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var PNG_SRC_ATTR="pngSrc";

$.fn.srcPngSimple=function $vpfn_dsT4rFapeKS8YPTC9SzuFQ19$24(pngPath)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(pngPath)
{
return this.each(function $vpfn_2SbJsmeL5S_lEI9h4o39Pg23$29(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}setPngSimple(this,pngPath);});
}
else
{
return this[0].attr(PNG_SRC_ATTR);
}
};

$.fn.srcPng=function $vpfn_$pIE3Ka09TugZ7RvSi5XzA31$18(pngPath,fnCallback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(pngPath)
{
return this.each(function $vpfn_2SbJsmeL5S_lEI9h4o39Pg35$29(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}setPng(this,pngPath,fnCallback);});
}
else
{
return this[0].attr(PNG_SRC_ATTR);
}
};

$.fn.clearSize=function $vpfn_Kts6rl10AtGCnh76tz2q2Q43$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

this.removeAttr("width");
this.removeAttr("height");
this.css("width","");
this.css("height","");

return this;
};

var setPngSimple=function $vpfn_uXBY0Ujuq_ShL46b0$0pbg54$23(oImg,pngPath)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(vp.browser.supportsPng)
{
oImg.src=pngPath;
return;
}

oImg.src=VP_UI_BLANK_IMAGE;
oImg.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+$.urlEncode(vp.ui.getRelativeURL(pngPath))+"',sizingMethod='scale')";
oImg.setAttribute(PNG_SRC_ATTR,pngPath);
};

var setPng=function $vpfn_bPevClTr2VtX1ZF7XB5huQ68$17(oImg,pngPath,fnCallback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var $img=$(oImg);

if(!vp.browser.supportsPng)
{




var $loader=$img.data("PNGloader");

if(!$loader)
{
$loader=$("<img />").css({visibility:"hidden",display:"none",position:"absolute",top:0,left:0}).prop("id",oImg.id+"_PNGLoader");

$img.data("PNGloader",$loader);

var fnOnLoadTempImg=function $vpfn_BvfMfngGdigVfLXg$D4S2g86$38(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oImg.src.indexOf(VP_UI_BLANK_IMAGE)==-1)
{
oImg.src=VP_UI_BLANK_IMAGE;
}

$img.clearSize();

$loader.show();
$img.css({width:$loader.width(),height:$loader.height()});
$loader.hide();

oImg.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+$.urlEncode($loader.data("newSrc"))+"',sizingMethod='scale')";

if(fnCallback)
{
fnCallback(e);
}
};


var fnTimerWrapper=function $vpfn_TjV7YDFXwQzn7zhrAnRzRA108$37()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
window.setTimeout(fnOnLoadTempImg,10);
};

$loader.bind("load",fnTimerWrapper);

var fnLoadLoader=function $vpfn_gvVkEMcnHyt76Wm7cMSgQg115$35()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$loader.appendTo(document.body);
};




if(document.readyState!="complete")
{
$(window).bind("load",fnLoadLoader);
}
else
{
fnLoadLoader();
}
}


$loader.clearSize();


var sRelativePath=vp.ui.getRelativeURL(pngPath);
$loader.data("newSrc",sRelativePath);
$loader.attr("src",sRelativePath);
$img.attr(PNG_SRC_ATTR,pngPath);
}
else
{

var fnOnLoadHandler=function $vpfn_$Gry__MuGXIlLuhi5CXfsQ145$34()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$img.clearSize();

if(fnCallback)
{


window.setTimeout(fnCallback,0);
}

$img.unbind("load",fnOnLoadHandler);
};

$img.bind("load",fnOnLoadHandler);

$img.attr("src",pngPath);
$img.attr(PNG_SRC_ATTR,pngPath);
}
};

})(window,jQuery);


if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}




if(typeof(vp)=="undefined")
{
var vp={};
}

if(!vp.widget)
{




vp.widget=function(){};
}











vp.widget.setDefaultText=function $vpfn_7Qf9uz_Ls0BGoL8EHpmSxg32$27(oField,sInitialText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oField===null)
{
return;
}

var INITIAL_COLOR="#777777";

oField.defaultText=sInitialText;
oField.initialColor=oField.style.color;
if(oField.value.length===0)
{
oField.value=sInitialText;
oField.style.color=INITIAL_COLOR;
}

var onFocusHandler=function $vpfn_Ze4LK9ej5rxu89Nok$bdvw49$22()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oField.value==oField.defaultText)
{
oField.value="";
oField.style.color=oField.initialColor;
}
};

var onBlurHandler=function $vpfn_4YZlB9fUq5PthZ8zzwEi7Q58$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oField.value.length===0)
{
oField.value=oField.defaultText;
oField.style.color=INITIAL_COLOR;
}
};

vp.events.add(oField,"focus",onFocusHandler);
vp.events.add(oField,"click",onFocusHandler);
vp.events.add(oField,"blur",onBlurHandler);

var clearDefaultText=function $vpfn_gMr3VQYKoR6iERIk7WgHww71$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.widget.clearDefaultText(oField);
};


if(oField.form)
{
vp.events.add(oField.form,"submit",clearDefaultText);
}
};






vp.widget.clearDefaultText=function $vpfn_6EJ1Qlmn$jokJZRVsWWn9w88$29(oField)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oField.value==oField.defaultText)
{
oField.value="";
}

oField.defaultText="";
};

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}





if(typeof(vp)=="undefined")
{
var vp={};
}

if(!vp.widget)
{




vp.widget=function(){};
}





var LOADING_BOX_IMAGE_SRC=vp.ui.imageUrl("/vp/images/B11/common/spinners/spinning-clock.gif");
vp.ui.preloadScriptAfterPageLoad([LOADING_BOX_IMAGE_SRC]);







vp.widget.showLoadingBox=function $vpfn_U0aacFKhptNHa4IMMowReg36$27(sMessage)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!window.__loadingBox)
{
window.__loadingBox=new vp.widget.LoadingBox();
}
window.__loadingBox.show(sMessage);
};






vp.widget.hideLoadingBox=function $vpfn_rpQ97z41plzxhEme3W4$EQ50$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(window.__loadingBox)
{
window.__loadingBox.hide();
}
};







vp.widget.LoadingBox=function $vpfn_sgmmvjv5w1bJeqVbxZhxkg64$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;





this.message="";





this.width=300;





this.height=100;





this.top=-1;





this.left=-1;





this.delay=300;





this.manualHide=false;





this.veilColor="#000";






this.veilOpacity=0;

var _oLoadingBoxElement=null;
var _oLoadingBoxIframe=null;
var _oBackgroundBlock=null;

var _sWaitImageSrc=LOADING_BOX_IMAGE_SRC;

var _iShowTimer=null;

var _visible=false;






this.show=function $vpfn_M0HOsdCTBL6UPBOQ6FPL7w138$16(sMessage,iWidth)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_iShowTimer)
{
window.clearTimeout(_iShowTimer);
}

_visible=true;

var fnShow=function $vpfn_wkdAlLBT8LFCZEvDJE2XvQ147$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_show(sMessage,iWidth);
};

if(this.delay<=0)
{
fnShow();
}
else
{
_iShowTimer=setTimeout(fnShow,this.delay);
}
};


var init=function $vpfn_hJotiTdT$NULhgoGzjFSVw163$15()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!_oLoadingBoxElement)
{

_oLoadingBoxElement=document.createElement("DIV");
_oLoadingBoxElement.innerHTML=
'<div class="loading-box-wrapper">'+
'<div class="loading-box-inner">'+
'<img name="progressBarImage" id="progressBarImage" src="'+_sWaitImageSrc+'" width="49" height="50" alt="...">'+
'<br><br>'+
'<span id="progressBarMessage" class="fwProgressBarMessage"></span>'+
'</div>';
'</div>';

_oLoadingBoxElement.style.position="absolute";
_oLoadingBoxElement.style.left="0px";
_oLoadingBoxElement.style.top="0px";
_oLoadingBoxElement.style.height=me.height+"px";
_oLoadingBoxElement.style.zIndex=200000;

document.body.appendChild(_oLoadingBoxElement);



_oBackgroundBlock=vp.ui.createElement("DIV",
{
unselectable:"on"
},
{
zIndex:199998,
position:"absolute",
width:"100%",
height:"100%",
top:"0px",
left:"0px",
backgroundColor:me.veilColor,
opacity:me.veilOpacity
});


vp.events.add(_oBackgroundBlock,"mousedown",vp.events.cancel);
vp.events.add(_oBackgroundBlock,"mouseup",vp.events.cancel);
vp.events.add(_oBackgroundBlock,"click",vp.events.cancel);

document.body.appendChild(_oBackgroundBlock);




if(vp.browser.isIE&&vp.browser.ver<9)
{
_oLoadingBoxIframe=document.createElement("DIV");
_oLoadingBoxIframe.innerHTML=
'<iframe width="'+me.width+'" height="'+me.height+'" src="about:blank"></iframe>';

_oLoadingBoxIframe.style.left="0px";
_oLoadingBoxIframe.style.top="0px";
_oLoadingBoxIframe.zIndex=199999;
_oLoadingBoxIframe.style.position="absolute";

document.body.appendChild(_oLoadingBoxIframe);
}
}
};


var _show=function $vpfn_hUOhBe0ERD1lPjqZSourXw230$16(sMessage,iWidth)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(!_visible)
{
return;
}


init();




if(sMessage)
{
me.message=sMessage;
}
if(iWidth)
{
me.width=iWidth;
}

var textArea=document.getElementById('progressBarMessage');
if(textArea)
{
textArea.innerHTML=me.message;
}

_oLoadingBoxElement.style.width=me.width+"px";




showElement(_oLoadingBoxElement,true);

if(_oLoadingBoxIframe)
{
showElement(_oLoadingBoxIframe,true);
}
showElement(_oBackgroundBlock,true);

vp.events.add(window,"resize",me.redraw);
vp.events.add(window,"scroll",me.redraw);

if(!me.manualHide)
{
vp.events.add(document,"stop",me.hide);


vp.events.addToOnUnload(me.hide);
}

document.body.style.cursor='progress';

me.redraw();
setTimeout(function $vpfn_E5tjSnIxJq69ftIlATX2bw286$19(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}document.getElementById("progressBarImage").src=_sWaitImageSrc;},100);
};




this.hide=function $vpfn_Dnl1RgUwLvpj21JJuiK7dw292$16()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_iShowTimer)
{
window.clearTimeout(_iShowTimer);
}

if(_visible)
{
_visible=false;
}

if(_oLoadingBoxElement)
{
showElement(_oLoadingBoxElement,false);

if(_oLoadingBoxIframe)
{
showElement(_oLoadingBoxIframe,false);
}
showElement(_oBackgroundBlock,false);

vp.events.remove(document,"stop",me.hide);
vp.events.remove(document,"resize",me.redraw);
vp.events.remove(document,"scroll",me.redraw);

document.body.style.cursor='auto';
}
};

var showElement=function $vpfn_jaZ68IfCCJrWJRYf__5z1g322$22(oElem,bShow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oElem.style.visibility=bShow?"visible":"hidden";
oElem.style.display=bShow?"block":"none";
};





this.redraw=function $vpfn_3YgaYIEfQNHX$FN13_h8bg332$18()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oViewport=vp.ui.getViewportSize();
var oScroll=vp.ui.getScrollOffset();

var iTop=Math.floor((oViewport.height-me.height)/2)+oScroll.top;
var iLeft=Math.floor((oViewport.width-me.width)/2)+oScroll.left;

vp.ui.setStyleValue(_oLoadingBoxElement,"top",iTop);
vp.ui.setStyleValue(_oLoadingBoxElement,"left",iLeft);

if(_oLoadingBoxIframe)
{
_oLoadingBoxIframe.style.top=_oLoadingBoxElement.offsetTop;
_oLoadingBoxIframe.style.left=_oLoadingBoxElement.offsetLeft;
_oLoadingBoxIframe.style.width=_oLoadingBoxElement.offsetWidth;
_oLoadingBoxIframe.style.height=_oLoadingBoxElement.offsetHeight;
}
};
};

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}




vp.define("vp.controls");




vp.controls.StylizedContainer={};





vp.controls.StylizedContainer.renderAll=function $vpfn_fzh5rwRYOlD2u5nZwY2noA17$42()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aElements=vp.ui.getBySelector(".vp-stylized-container");
for(var i=0;i<aElements.length;i++)
{
vp.controls.StylizedContainer.render(aElements[i]);
}
};





vp.controls.StylizedContainer.render=function $vpfn_LEYEvyHnJs8J2tFY0mczlg30$39(vElement,oSkin)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElement=vp.core.getElement(vElement,"vp.controls.StylizedContainer.render");

if(oElement.stylizedContainerRendered)
{
return;
}

if(!oSkin)
{
oSkin=vp.http.parseJSON(oElement.getAttribute("skin-data"));
}



var isCssSkin=!!oSkin.cssClass;




if(!oSkin.minHeight)
{
oSkin.minHeight=oSkin.top+oSkin.bottom+1;
}

if(!oSkin.minWidth)
{
oSkin.minWidth=oSkin.left+oSkin.right+1;
}

var oContentNode;
var oPadding;

if(!isCssSkin)
{


if(document.location.protocol=="https:"&&oSkin.imageDirectory.indexOf("/")===0)
{
oSkin.imageDirectory=document.location.protocol+"//"+document.location.hostname+oSkin.imageDirectory;
}
else if(oSkin.imageDirectory)
{


oSkin.imageDirectory=vp.ui.imageUrl(oSkin.imageDirectory);
}





var bIsIE6=vp.browser.isIE&&vp.browser.ver<7;
var sTreeHtml;


var sExtension=(bIsIE6||!oSkin.hasPngTiles)?".gif":".png";

if(window.vpSiteVersion)
{
sExtension+=("?sv="+window.vpSiteVersion);
}

if(!oSkin.valign)
{
oSkin.valign="top";
}

var oSpriteStyles={
topLeft:"background-image:url("+oSkin.imageDirectory+"/sprite_corners"+sExtension+");width:"+oSkin.left+"px;height:"+oSkin.top+"px;",
topMiddle:"background-image:url("+oSkin.imageDirectory+"/sprite_corners"+sExtension+");background-position:0px -"+(oSkin.top+oSkin.bottom)+"px;left:"+oSkin.left+"px;right:"+oSkin.right+"px;height:"+oSkin.top+"px;background-repeat:repeat-x;",
topRight:"background-image:url("+oSkin.imageDirectory+"/sprite_corners"+sExtension+");background-position:"+oSkin.right+"px 0px;width:"+oSkin.right+"px;height:"+oSkin.top+"px;",
middleLeft:"background-image:url("+oSkin.imageDirectory+"/sprite_left_right"+sExtension+");background-position:0px 0px;",
middleRight:"background-image:url("+oSkin.imageDirectory+"/sprite_left_right"+sExtension+");background-position:"+oSkin.right+"px 0px;",
bottomLeft:"background-image:url("+oSkin.imageDirectory+"/sprite_corners"+sExtension+");background-position:0px -"+oSkin.top+"px;width:"+oSkin.left+"px;height:"+oSkin.bottom+"px;",
bottomMiddle:"background-image:url("+oSkin.imageDirectory+"/sprite_corners"+sExtension+");background-position:0px -"+((oSkin.top*2)+oSkin.bottom)+"px; background-repeat:repeat-x;",
bottomRight:"background-image:url("+oSkin.imageDirectory+"/sprite_corners"+sExtension+");background-position:"+oSkin.right+"px -"+oSkin.top+"px;width:"+oSkin.right+"px;height:"+oSkin.bottom+"px;"
};


if(!vp.ui.isQuirksMode()&&!bIsIE6&&!vp.browser.isOpera)
{
sTreeHtml=

"<div style=\"position:absolute; z-index:1; bottom:0px; top:0px; width:100%; float:left;\">"+

"<div style=\"position:absolute;left:0px;"+oSpriteStyles.topLeft+"\"></div>"+

"<div style=\"position:absolute;"+oSpriteStyles.topMiddle+"\"></div>"+

"<div style=\"position:absolute;right:0px;"+oSpriteStyles.topRight+"\"></div>"+

"<div style=\"position:absolute;left:0px;top:"+oSkin.top+"px;width:"+oSkin.left+"px;bottom:"+oSkin.bottom+"px;"+oSpriteStyles.middleLeft+"\"></div>"+

"<div style=\"position:absolute;left:"+oSkin.left+"px;right:"+oSkin.right+"px;top:"+oSkin.top+"px;bottom:"+oSkin.bottom+"px;background-color:"+oSkin.backgroundColor+";\"></div>"+

"<div style=\"position:absolute;right:0px;top:"+oSkin.top+"px;bottom:"+oSkin.bottom+"px;width:"+oSkin.right+"px;"+oSpriteStyles.middleRight+"\"></div>"+

"<div style=\"position:absolute;left:0px;bottom:0px;"+oSpriteStyles.bottomLeft+"\"></div>"+

"<div style=\"position:absolute;bottom:0px;left:"+oSkin.left+"px;right:"+oSkin.right+"px;height:"+oSkin.bottom+"px;"+oSpriteStyles.bottomMiddle+"\"></div>"+

"<div style=\"position:absolute;right:0px;bottom:0px;"+oSpriteStyles.bottomRight+"\"></div>"+
"</div>";

}

else
{










var sTableHeight=bIsIE6&&!vp.ui.isQuirksMode()?
"expression(this.parentNode.offsetHeight + 'px')":
"100%";

var sMiddleRowHeight=bIsIE6&&!vp.ui.isQuirksMode()?
"height:expression((this.parentNode.parentNode.offsetHeight - "+((oSkin.top+oSkin.bottom)+1)+") + 'px');":
"";

var sSpacer="<div style=\"width:1px;height:1px;overflow:hidden;\"></div>";

sTreeHtml=

"<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"border-collapse:collapse;width:100%;top:0px;left:0px;height:"+sTableHeight+";position:absolute;\">"+
"<tr>"+
"<td style=\""+oSpriteStyles.topLeft+"\">"+sSpacer+"</td>"+
"<td style=\""+oSpriteStyles.topMiddle+"\"></td>"+
"<td style=\""+oSpriteStyles.topRight+"\">"+sSpacer+"</td>"+
"</tr>"+
"<tr>"+
"<td style=\""+oSpriteStyles.middleLeft+sMiddleRowHeight+"\"></td>"+
"<td style=\"background-color:"+oSkin.backgroundColor+";\">"+sSpacer+"</td>"+
"<td style=\""+oSpriteStyles.middleRight+"\">"+sSpacer+"</td>"+
"</tr>"+
"<tr>"+
"<td style=\""+oSpriteStyles.bottomLeft+"\">"+sSpacer+"</td>"+
"<td style=\""+oSpriteStyles.bottomMiddle+"\"></td>"+
"<td style=\""+oSpriteStyles.bottomRight+"\">"+sSpacer+"</td>"+
"</tr>"+
"</table>";
}







var sAlignHeight="";
if(oSkin.valign=="middle"||oSkin.valign=="bottom")
{
sAlignHeight="height:100%;";
}





oPadding=new vp.controls.StylizedContainer.Padding(oSkin.padding);
oPadding.left=Math.max(0,oPadding.left-1);
oPadding.top=Math.max(0,oPadding.top-1);

sTreeHtml+=
"<div style=\"position:relative;z-index:2;"+sAlignHeight+"\">"+
"<table cellpadding=\"0\" cellspacing=\"0\" style=\"position:relative;width:100%;"+sAlignHeight+"\">"+
"<tr>"+
"<td style=\"height:1px;width:1px;\">"+
"<div style=\"width:1px;height:1px;overflow:hidden;\"></div>"+
"</td>"+

"<td style=\"height:1px;\">"+
"<div style=\"width:"+(oSkin.minWidth-1)+"px;height:1px;overflow:hidden;\"></div>"+
"</td>"+
"</tr>"+
"<tr>"+

"<td style=\"width:1px;\">"+
"<div style=\"height:"+(oSkin.minHeight-1)+"px;width:1px;overflow:hidden;\"></div>"+
"</td>"+
"<td class=\"stylized-container-content\" style=\"padding:"+oPadding.toString()+";\" valign=\""+oSkin.valign+"\">"+

"</td>"+
"</tr>"+
"</table>"+
"</div>";


var oInnerNode=document.createElement("DIV");
oInnerNode.innerHTML=sTreeHtml;




oContentNode=vp.controls.StylizedContainer.getContentNodeFromInnerNode(oElement,oInnerNode);


vp.controls.StylizedContainer._swapContent(oElement,oContentNode);


oInnerNode.style.position="relative";


oInnerNode.style.height=document.all?"100%":"inherit";
oInnerNode.style.minHeight=oSkin.minHeight+"px";

oElement.style.minHeight=oSkin.minHeight+"px";

oElement.appendChild(oInnerNode);


vp.controls.StylizedContainer.renderFinish(oElement,oSkin,oInnerNode,oContentNode);
}
else
{

var $elem=$(oElement);

$elem.addClass("vp-stylized-container");
$elem.addClass(oSkin.cssClass);

oContentNode=document.createElement("DIV");
var $contentNode=$(oContentNode);
$contentNode.addClass("stylized-container-content");
$contentNode.addClass(oSkin.cssClass+"-content");



if(oSkin.padding)
{
oPadding=new vp.controls.StylizedContainer.Padding(oSkin.padding);
oContentNode.style.padding=oPadding.toString();
}

vp.controls.StylizedContainer._swapContent(oElement,oContentNode);
oElement.appendChild(oContentNode);

oElement.stylizedContainerRendered=true;
}

if(oSkin.additionalCssClasses)
{
$(oElement).addClass(oSkin.additionalCssClasses);
}
};

vp.controls.StylizedContainer._swapContent=function $vpfn_XlF_7JmClZRZHceCAxsSVg284$45(oElement,oContentNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var oChild;
var iLen=oElement.childNodes.length;

while(iLen>0)
{
oChild=oElement.childNodes[0];
oChild.parentNode.removeChild(oChild);
oContentNode.appendChild(oChild);
iLen--;
}
};

vp.controls.StylizedContainer.Padding=function $vpfn_FRpgEXBmJ6ranhg0EIDhfQ299$40(sPadding)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

var init=function $vpfn_4EiiaR9lIU1giezzTgcy$Q303$15(sPadding)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aPadding=sPadding.replace("px","").split(" ");
me.top=parseInt(aPadding[0]);
me.right=parseInt(aPadding[1]);
me.bottom=parseInt(aPadding[2]);
me.left=parseInt(aPadding[3]);
};

init(sPadding);

this.toString=function $vpfn_HNxarImxaZ_tTnoE7cnoEA314$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return me.top+"px "+me.right+"px "+me.bottom+"px "+me.left+"px";
};
};

vp.controls.StylizedContainer.getContentNodeFromInnerNode=function $vpfn_rJhXzFYBNU9BQ4Z9tpIy3Q320$60(oElement,oInnerNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



return oInnerNode.childNodes[1].firstChild.firstChild.childNodes[1].childNodes[1];
};

vp.controls.StylizedContainer.renderFinish=function $vpfn_Gla3_UqlyEHBFYiIdVfWRg328$45(vElement,oSkin,oInnerNode,oContentNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElement=vp.core.getElement(vElement,"vp.controls.StylizedContainer.renderFinish");

if(!oInnerNode)
{
oInnerNode=oElement.firstChild;
}

if(!oContentNode)
{
oContentNode=vp.controls.StylizedContainer.getContentNodeFromInnerNode(oElement,oInnerNode);
}

if(!oSkin)
{
oSkin=vp.http.parseJSON(oElement.getAttribute("skin-data"));
}









if(vp.ui.isQuirksMode()&&vp.ui.getCurrentStyle(oElement,"height")=="auto")
{
oElement.style.height=oSkin.minHeight+"px";
}



if(!parseInt(vp.ui.getCurrentStyle(oElement,"minWidth")))
{
oElement.style.minWidth=oSkin.minWidth+"px";
}


var aFontStyles=[
"fontWeight",
"fontFamily",
"color",
"fontSize",
"fontStyle",
"textDecoration",
"textAlign"
];

aFontStyles.map(function $vpfn_MLA9zn0SZYWgD8MBwhGeeQ378$20(sStyle)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oElement.style[sStyle])
{
oContentNode.style[sStyle]=oElement.style[sStyle];
}
});


oElement.stylizedContainerRendered=true;
};





vp.controls.StylizedContainer.unrender=function $vpfn_CsEq3autbKHsKQjfWeJivg394$41(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElement=vp.core.getElement(vElement,"vp.controls.StylizedContainer.unrender");



var oContentNode=vp.controls.StylizedContainer.getContentNodeFromInnerNode(oElement,oElement.firstChild);


while(oElement.childNodes.length>0)
{
oElement.removeChild(oElement.childNodes[0]);
}


var oChild;
while(oContentNode.childNodes.length>0)
{
oChild=oContentNode.childNodes[0];
oContentNode.removeChild(oChild);
oElement.appendChild(oChild);
}

oElement.stylizedContainerRendered=false;
};





vp.controls.StylizedContainer.rerender=function $vpfn_TESX47eywUTtGQiAwF39LA424$41(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.controls.StylizedContainer.unrender(vElement);
vp.controls.StylizedContainer.render(vElement);
};
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;


}









vp.define("vp.dialog");






var VP_DIALOG_DEFAULT_HEIGHT=400;


var VP_DIALOG_DEFAULT_WIDTH=400;

var DIALOG_SCROLL_TYPE_NO="NO";
var DIALOG_SCROLL_TYPE_VERTICAL="VERTICAL";
var DIALOG_SCROLL_TYPE_HORIZONTAL="HORIZONTAL";
var DIALOG_SCROLL_TYPE_BOTH="BOTH";

var DIALOG_TYPE_IFRAME="IFrame";
var DIALOG_TYPE_POPUP="Popup";
var DIALOG_TYPE_NODE="Node";











vp.dialog.Dialog=function $vpfn_x_2eJHTVPrCeIoWePQ2cYg45$19(sID,oRect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;





this.id=vp.core.requireArg("sID",sID);

if(!this.id)
{
throw new Error("No ID specified for this dialog");
}


window.__vp_dialog_map[sID]=me;





this.openerWindow=window;





this.rect=oRect||{};

vp.core.initProperty(this.rect,"top",-1);
vp.core.initProperty(this.rect,"left",-1);
vp.core.initProperty(this.rect,"width",VP_DIALOG_DEFAULT_WIDTH);
vp.core.initProperty(this.rect,"height",VP_DIALOG_DEFAULT_HEIGHT);




this.hasInitialPosition=!(me.rect.top==-1&&me.rect.left==-1);





this.onopen=new vp.events.CustomEvent(me,"onopen");





this.onclose=new vp.events.CustomEvent(me,"onclose");






this.onbeforeclose=new vp.events.CustomEvent(me,"onbeforeclose");





this.onresize=new vp.events.CustomEvent(me,"onresize");
this.onresize.useUnsafeClosures=true;




this.open=function $vpfn_Dccp2xSqhcUKhqTAZ5mbrg114$16()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var e={};
e.args=[];
for(var i=0;i<arguments.length;i++)
{
e.args.push(arguments[i]);
}
me.onopen.fire(e);
vp.dialog.Dialog.onopen.fire(e);
};






this._beginClose=function $vpfn_MvHR02SNnV1xhQLXCxJIdg131$23(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=e||{};
e.dialog=me;

me.onbeforeclose.fire(e);

return e.cancelClose?false:true;
};




this.close=function $vpfn_wQkMiqEoDbOz7jzo8VXCyg144$17(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=e||{};
e.dialog=me;

me.onclose.fire(e);
vp.dialog.Dialog.onclose.fire(e);

return true;
};
};





vp.dialog.Dialog.onopen=new vp.events.CustomEvent(vp.dialog.Dialog,"onopen");





vp.dialog.Dialog.onclose=new vp.events.CustomEvent(vp.dialog.Dialog,"onclose");


vp.dialog.Dialog.onbeforefirstresize=new vp.events.CustomEvent(vp.dialog.Dialog,"onbeforefirstresize");









vp.dialog.NodeDialog=function $vpfn_fRU8XOby3y8j$9SHyGRjjA179$23(sId,oRect,vContentNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



this.inheritFrom=vp.dialog.Dialog;
this.inheritFrom(sId,oRect);

var me=this;





this.dialogType=DIALOG_TYPE_NODE;






this.rootWindow=vp.dialog._getRootWindow();





this.chrome=null;





this.options={
iconUrl:null,
isDraggable:true,
veilColor:"#000",
veilOpacity:0.25,
resizeWidthToContent:oRect&&oRect.width&&oRect.width>0?false:true,
resizeHeightToContent:oRect&&oRect.height&&oRect.height>0?false:true,
closeOnClickOutside:false,
maximumHeight:0,
maximumWidth:0,
contentLeftMargin:-1,
contentRightMargin:-1,
contentTopMargin:-1,
contentBottomMargin:-1,
parentNode:null,
preventMouseEventBubbling:true
};






this.onmovestart=new vp.events.CustomEvent(this,"onmovestart");





this.onmoveend=new vp.events.CustomEvent(this,"onmoveend");





this.onmove=new vp.events.CustomEvent(this,"onmove");





this.onveilevent=new vp.events.CustomEvent(this,"onmove");





this.onpositionchanged=new vp.events.CustomEvent(this,"onpositionchanged");


this.preventDismissal=false;

var _iLevel=0;







this.getLevel=function $vpfn_Z2OsKDz$K0kn44Y8_GYEww272$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return _iLevel;
};

var _oContentNode=vp.core.requireArg("oContentNode",vContentNode);
var _oChromeNode=null;



var BASE_Z_INDEX=100011;
var DIALOG_Z_INDEX_OFFSET=10;






this.resize=function $vpfn_7zCFbpEsr6iNfSM9oVcsBQ290$18(width,height,bCenter)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(width>0)
{
me.rect.width=width;
}
if(height>0)
{
me.rect.height=height;
}

ensureMinimumHeightForChrome();


adjustForMaximumBounds();

if(bCenter)
{
resetCoordsToCenter();
}

positionDialog();
};

this.getContentContainer=function $vpfn_vOKu8$x0VPq4LMOQr4lFzA315$31()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof _oContentNode=="string")
{
_oContentNode=vp.ui.get(_oContentNode);
}

return _oContentNode;
};

this.getContentNode=function $vpfn_MOXanhMZKxKWKjkNx6ZIuA325$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.getContentContainer();
};






this.resizeBy=function $vpfn_B1QELRmFT16EL5Blpnnn5Q335$20(iIncreaseWidthBy,iIncreaseHeightBy,bCenter)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.rect.width+=iIncreaseWidthBy;
me.rect.height+=iIncreaseHeightBy;


adjustForMaximumBounds();

if(bCenter)
{
resetCoordsToCenter();
}

positionDialog();
};




this.center=function $vpfn_CHrAF_1XyyRO_bKxh9Tw5w354$18()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.resizeBy(0,0,true);
};






this.resizeByContentSize=function $vpfn_kxIatbd9lhiBfL6Xn7WBJw364$31(contentWidth,contentHeight,bCenter)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

setRectByContentSize({width:contentWidth,height:contentHeight});


adjustForMaximumBounds();

if(bCenter)
{
resetCoordsToCenter();
}

positionDialog();
};

this.onbeforeresize=new vp.events.CustomEvent(me,"onbeforeresize");




this.resizeToFitContent=function $vpfn_e9hC0VQqKLyhRNbwbKjurg385$30(bCenter)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.onbeforeresize.fire();

var oContentRect=me.getContentSize();

me.resizeByContentSize(oContentRect.width,oContentRect.height,bCenter);
};

this.getContentSize=function $vpfn_Gj7kLSxNOSXo4SBucoUNqg394$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oRect=vp.ui.getRect(_oContentNode);




var oContainerRect=vp.ui.getRect(_oElements.contentContainer);
oRect.top=oContainerRect.top;
oRect.left=oContainerRect.left;
oRect.height=oRect.bottom-oRect.top;
oRect.width=oRect.right-oRect.left;

return oRect;
};

var ensureStyleCompensation=function $vpfn_$ErZ2q9k8yn2Cv7KU1aVpA410$34()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var vals=["top","left","right","bottom"];

if(!me.chrome.styleCompensation)
{
me.chrome.styleCompensation={};
}

for(var i=0;i<vals.length;i++)
{
me.chrome.styleCompensation[vals[i]]=me.chrome.styleCompensation[vals[i]]||0;
}
};

var getContentRectFromOuterRect=function $vpfn_aLebdGrr7wJvfWykXfV88w425$38()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
ensureStyleCompensation();

return{
width:me.rect.width-(me.options.contentLeftMargin+me.options.contentRightMargin+me.chrome.styleCompensation.left+me.chrome.styleCompensation.right),
height:me.rect.height-(me.options.contentTopMargin+me.options.contentBottomMargin+me.chrome.styleCompensation.top+me.chrome.styleCompensation.bottom)-me.chrome.titleBarHeight
};
};

var getOuterRectFromContentRect=function $vpfn_CRBg$sPHdlALzL$vGzpZqw435$38(oContentRect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
ensureStyleCompensation();

return{
width:oContentRect.width+me.options.contentLeftMargin+me.options.contentRightMargin+me.chrome.styleCompensation.left+me.chrome.styleCompensation.right,
height:oContentRect.height+me.options.contentTopMargin+me.options.contentBottomMargin+me.chrome.styleCompensation.top+me.chrome.styleCompensation.bottom+me.chrome.titleBarHeight
};
};

var setRectByContentSize=function $vpfn_xpiu$8dyXG2Al5YBVVmJgw445$31(oRect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oOuterRect=getOuterRectFromContentRect(oRect);

if(oRect.width>0)
{
me.rect.width=oOuterRect.width;
}

if(oRect.height>0)
{
me.rect.height=oOuterRect.height;
}

ensureMaximumHeightForWindow();

ensureMinimumHeightForChrome();
};

var getMaximumSizeForWindow=function $vpfn_XhA5zzmhv75uIhQx_x6GDQ464$34()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oMaxSize=vp.ui.getViewportSize(me.rootWindow);

oMaxSize.width=Math.max(oMaxSize.width,1024);
oMaxSize.height=Math.max(oMaxSize.height,768);

oMaxSize.width-=10;
oMaxSize.height-=10;

return oMaxSize;
};

var ensureMaximumHeightForWindow=function $vpfn_1fwfMIIi7JW9EyaHQ7V4KQ477$39()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oMaxSize=getMaximumSizeForWindow();

if(me.rect.height>oMaxSize.height)
{
me.rect.height=oMaxSize.height;
}

if(me.rect.width>oMaxSize.width)
{
me.rect.width=oMaxSize.width;
}
};

var ensureMinimumHeightForChrome=function $vpfn_qv2w0rshIzWbBd43w3y3Og492$39()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iMinHeight=me.chrome.top+me.chrome.bottom;
if(me.rect.height<iMinHeight)
{
me.rect.height=iMinHeight;
}
};

var getContentMargin=function $vpfn_F0nmWrA2EbX_x5k7r14GwA501$27(iOptionsMargin,iChromeMargin)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(iOptionsMargin)!="undefined"&&iOptionsMargin>=0)
{
return iOptionsMargin;
}

return iChromeMargin;
};

var initializeSize=function $vpfn_AnJpWfRyutG2MNleqdQrBw511$25()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof _oContentNode=="string")
{
_oContentNode=vp.ui.get(_oContentNode);
}

if(_oContentNode.style.display=="none")
{
_oContentNode.style.display="";
}



me.options.contentLeftMargin=getContentMargin(me.options.contentLeftMargin,me.chrome.contentLeftMargin);
me.options.contentRightMargin=getContentMargin(me.options.contentRightMargin,me.chrome.contentRightMargin);
me.options.contentTopMargin=getContentMargin(me.options.contentTopMargin,me.chrome.contentTopMargin);
me.options.contentBottomMargin=getContentMargin(me.options.contentBottomMargin,me.chrome.contentBottomMargin);

if(me.options.resizeWidthToContent||me.options.resizeHeightToContent)
{
var oContentRect=vp.ui.getRect(_oContentNode);

if(oContentRect.width===0)
{
throw new Error("No size was specified, and the size could not be "+
"determined from the specified content because it has not been rendered. "+
"The node or one of its ancestor containers probably has display:none set.");
}

var oRect=me.rect||{};

oRect.width=me.options.resizeWidthToContent?oContentRect.width:oRect.width;



if(!me.options.resizeWidthToContent&&oRect.width>0)
{
var sOriginalWidth=_oContentNode.style.width;
_oContentNode.style.width=oRect.width+"px";
oContentRect=vp.ui.getRect(_oContentNode);
_oContentNode.style.width=sOriginalWidth;
}

oRect.height=me.options.resizeHeightToContent?oContentRect.height:oRect.height;

setRectByContentSize(oRect);
}

ensureMaximumHeightForWindow();
ensureMinimumHeightForChrome();
};

var getBaseZIndex=function $vpfn_Txf$FBG7IQtdMxUN8C479A564$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return BASE_Z_INDEX+(_iLevel*DIALOG_Z_INDEX_OFFSET);
};

var getBackgroundId=function $vpfn_yt0MiuQzh4rqgIdA0dIaow569$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


var oParentNode=getParentNode();

if(!oParentNode.id)
{
oParentNode.id=oParentNode.tagName+"_"+(new Date()).valueOf();
}

return"__vp_dialog_background"+_iLevel+"_"+oParentNode.id;
};

var getParentNodePositionWithoutScroll=function $vpfn_dq7ghxV2WGsEDRovUlmDfw583$45()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oParentNode=getParentNode();
var oParentRect=vp.ui.getRect(oParentNode);

oParentRect.top-=oParentNode.scrollTop;
oParentRect.left-=oParentNode.scrollLeft;

oParentRect.top=Math.max(oParentRect.top,0);
oParentRect.left=Math.max(oParentRect.left,0);

return oParentRect;
};

var showBackgroundBlock=function $vpfn_AgP_e$D0r0Ji6dOmVW065w597$30(bShow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sBackgroundId=getBackgroundId();
var oBlock=me.rootWindow[sBackgroundId];

if(!oBlock)
{
oBlock=me.rootWindow.vp.ui.createElement(
"DIV",
{
unselectable:"on"
},
{
zIndex:getBaseZIndex(),
position:"absolute",
width:"100%",
height:"100%",
backgroundColor:me.options.veilColor,
opacity:me.options.veilOpacity
});

if(me.options.preventMouseEventBubbling)
{
preventBubblingMouseEvents(oBlock);
}

getParentNode().appendChild(oBlock);

vp.ui.makeElementOpaqueInIE6(oBlock,true);

me.rootWindow[sBackgroundId]=oBlock;
}

var oParentRect=getParentNodePositionWithoutScroll();

vp.ui.setStyle(oBlock,{top:-oParentRect.top,left:-oParentRect.left});

if(!vp.ui.isQuirksMode())
{
var iBodyMarginLeft=parseInt(vp.ui.getCurrentStyle(getParentNode(),"marginLeft"));
var iBodyMarginTop=parseInt(vp.ui.getCurrentStyle(getParentNode(),"marginTop"));

if(iBodyMarginLeft&&iBodyMarginTop)
{
vp.ui.setStyle(oBlock,{top:-iBodyMarginTop,left:-iBodyMarginLeft});
}
}

if(me.options.veilOpacity===0)
{
hideBackgroundBlock();
}
else
{
me.rootWindow[sBackgroundId].style.display="";
}
};

var hideBackgroundBlock=function $vpfn_u8BCAr7H4Xh9LkpLEM3Rcw655$30()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var sBackgroundId=getBackgroundId();
if(me.rootWindow[sBackgroundId])
{
me.rootWindow[sBackgroundId].style.display="none";
}
};

var preventBubblingMouseEvents=function $vpfn_aW4XW2zGg_KYFehGlcCkpg664$37(oElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.events.add(oElement,"mousedown",cancelBubbleIfNotDragging);
vp.events.add(oElement,"mouseup",cancelBubbleIfNotDragging);
vp.events.add(oElement,"click",cancelBubbleIfNotDragging);
};

var cancelBubbleIfNotDragging=function $vpfn_Xgl5dx$cYhmBvxrN9NUjHg671$36(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.onveilevent.fire(e);

if(!_bIsDragging)
{
vp.events.cancelBubble(e);
}
};





this.replaceContentNode=function $vpfn_e4x8jvv33ew8IsaHLZL21w685$30(oContentNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_oChromeNode)
{
while(_oElements.contentContainer.childNodes.length>0)
{
vp.ui.removeFromDOM(_oElements.contentContainer.firstChild);
}
_oElements.contentContainer.appendChild(oContentNode);
}

_oContentNode=oContentNode;
};

var _bIsVisible=false;
var _sOriginalNodeTop=null;




this.isVisible=function $vpfn_ALIY_eKGra7TFj3WBBZS8Q705$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return _bIsVisible;
};

var setVisibility=function $vpfn_FotCVhpOoN0Tt4gdgKJP_g710$24(bVisible)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(bVisible)
{
if(_bIsVisible)
{
return;
}

if(!me.rootWindow.__vp_dialog_stack)
{
me.rootWindow.__vp_dialog_stack=[];
}

if(me.rootWindow.__vp_dialog_stack.length>0)
{
_iLevel=me.rootWindow.__vp_dialog_stack[me.rootWindow.__vp_dialog_stack.length-1].getLevel()+1;
}
else
{
_iLevel=0;
}

me.rootWindow.__vp_dialog_stack.push(me);

vp.ui.setStyle(
_oChromeNode,
{
zIndex:getBaseZIndex()+1,
display:"",
visibility:""
});

if(_sOriginalNodeTop)
{
_oChromeNode.style.top=_sOriginalNodeTop;
_sOriginalNodeTop=null;
}

vp.ui.setStyle(_oContentNode,{display:"",visibility:""});


showBackgroundBlock();

vp.events.add(me.rootWindow,"resize",resizeHandler);

_bIsVisible=true;
}
else
{
if(!_bIsVisible)
{
return;
}



vp.events.remove(me.rootWindow,"resize",resizeHandler);

me.rootWindow.__vp_dialog_stack.pop();


_oChromeNode.style.visibility="hidden";
_sOriginalNodeTop=_oChromeNode.style.top;

_oChromeNode.style.top=-1000+"px";
_oContentNode.style.visibility="hidden";


_bIsVisible=false;
}
};

var _oLastWindowSize=null;

var resizeHandler=function $vpfn_1ywkBCxF8rgzgpYTU6vnWQ785$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}







var oWindowSize=vp.ui.getViewportSize();
if(_oLastWindowSize)
{
if(_oLastWindowSize.width==oWindowSize.width&&
_oLastWindowSize.height==oWindowSize.height)
{
return;
}
}

hideBackgroundBlock();
resetCoordsToCenter();
positionDialog();
showBackgroundBlock();

_oLastWindowSize=oWindowSize;
};


var base_open=this.open;




this.open=function $vpfn_Dccp2xSqhcUKhqTAZ5mbrg818$16()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
buildChrome();

setVisibility(true);
vp.ui.makeElementOpaqueInIE6(_oElements.outerContainer,true,_oChromeNode);

if(!me.hasInitialPosition)
{
resetCoordsToCenter();
}
positionDialog();

base_open();

if(me.options.closeOnClickOutside)
{
vp.events.add(me.rootWindow[getBackgroundId()],"mousedown",closeMeOnClickOutside);
}
};

var base_close=this.close;




this.close=function $vpfn_wQkMiqEoDbOz7jzo8VXCyg844$17(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me._beginClose(e))
{
return false;
}

setVisibility(false);

var veil=me.rootWindow[getBackgroundId()];
veil.style.display="none";

vp.events.remove(veil,"mousedown",closeMeOnClickOutside);

return base_close(e);
};




var closeMeOnClickOutside=function $vpfn_zC6kPmevKwJsk12jAN7VYg864$32(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(!vp.ui.isScrollBarClickEvent(e))
{
me.close();
}
};

var _oContentContainer;

var _oElements={};

var collectElementsFromChrome=function $vpfn_Jzzi9dToMsrWEgYGB17M6g877$36(oRootNode)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oRootNode.nodeType==1)
{
var sName=oRootNode.getAttribute("vp-dialog-type");
if(sName)
{
_oElements[sName]=oRootNode;
}

for(var i=0;i<oRootNode.childNodes.length;i++)
{
collectElementsFromChrome(oRootNode.childNodes[i]);
}
}
};

this._getUniqueElementId=function $vpfn_bQsNX5Lk6UbhONYNsfQz5Q894$31(sBaseId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var i=1;
var sProcessedId=sBaseId;

while(document.getElementById(sProcessedId))
{
sProcessedId=sBaseId+i;
i++;
}

return sProcessedId;
};

var buildChrome=function $vpfn_PirA0yrsK32W2Nw8QEB4AQ908$22()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!_oChromeNode)
{
initializeSize();


_oChromeNode=me.rootWindow.vp.ui.createElement(
"DIV",
{id:me._getUniqueElementId(sId)},
{
position:"absolute",
display:"none"
});

if(!me.chrome)
{
throw new Error("No chrome defined");
}

buildChromeDOM();

if(_oElements.iconContainer&&me.options.iconUrl)
{
var oIconNode=me.rootWindow.document.createElement("IMG");
oIconNode.src=me.options.iconUrl;
oIconNode.className="pngfix";

oIconNode.removeAttribute("width");
oIconNode.removeAttribute("height");

while(_oElements.iconContainer.firstChild)
{
vp.ui.removeFromDOM(_oElements.iconContainer.firstChild);
}
_oElements.iconContainer.appendChild(oIconNode);
}
else
{
_oElements.iconContainer.style.width="1px";
}


if(_oElements.titleContainer&&me.options.title)
{
_oElements.titleContainer.innerHTML=me.options.title;
}


setUpCloseButton(_oElements.closeButton);
setUpCloseButton(_oElements.closeButtonLabel);

vp.ui.makeUnselectable(_oChromeNode);

me.replaceContentNode(_oContentNode);


if(me.options.isDraggable)
{
addEvent(_oElements.titleBar,"mousedown",startDrag);
}

getParentNode().appendChild(_oChromeNode);


if(me.options.preventMouseEventBubbling)
{
preventBubblingMouseEvents(_oChromeNode);
}



copyHandler("onclose");
copyHandler("onbeforeclose");
copyHandler("onopen");
copyHandler("onmovestart");
copyHandler("onmoveend");
copyHandler("onmove");
}
};

var setUpCloseButton=function $vpfn_KYd6sXtQ5ZMvwUA2Qwf_Bg989$27(elem)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(elem)
{
vp.ui.setStyleValue(elem,"cursor","pointer");

vp.events.add(elem,"click",function $vpfn_PRMsntChkc9ieRChWxi1mg995$41(ev)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.events.cancel(ev);

var e={};
e.isCancelButton=true;
me.close(e);
});

if(vp.browser.isMobile)
{




vp.events.add(elem,"touchstart",vp.events.cancelBubble);
}
}
};


var copyHandler=function $vpfn_qx8F8cAK_oDZ6hqt8UAWcA1016$22(sEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.options[sEvent])
{
me[sEvent].addHandler(me.options[sEvent]);
delete(me.options)[sEvent];
}
};

var getParentNode=function $vpfn_QtTfJoLgz63mzA2eG0l0zQ1025$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


if(me.options.parentNode)
{




if(me.options.parentNode.ownerDocument===me.rootWindow.document)
{



if(me.dialogType!=DIALOG_TYPE_IFRAME)
{
return me.options.parentNode;
}
}
}

return me.rootWindow.document.body;
};

var buildChromeDOM=function $vpfn_kHnM$8kTZbBCIlFtGVgWYw1050$25()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_oElements.outerContainer=me.rootWindow.vp.ui.createElement("DIV",null,{zIndex:1,position:"relative"});
_oElements.titleBar=me.rootWindow.vp.ui.createElement("DIV",null,{height:me.chrome.titleBarHeight});
_oElements.titleBar.className="vp-dialog-header";

_oElements.contentContainer=me.rootWindow.vp.ui.createElement(
"DIV",
null,
{
margin:me.options.contentTopMargin+"px "+
me.options.contentRightMargin+"px "+
me.options.contentBottomMargin+"px "+
me.options.contentLeftMargin+"px",
overflow:"hidden"
});


_oChromeNode.appendChild(_oElements.outerContainer);
_oElements.outerContainer.appendChild(_oElements.titleBar);
_oElements.outerContainer.appendChild(_oElements.contentContainer);


var oSkin={
imageDirectory:me.chrome.imagesDirectory,
cssClass:me.chrome.cssClass,
top:me.chrome.top,
left:me.chrome.left,
right:me.chrome.right,
bottom:me.chrome.bottom,
backgroundColor:me.chrome.backgroundColor,
padding:"0px",
headerHeight:0,
hasPngTiles:me.chrome.hasPngTiles?true:false
};


me.rootWindow.vp.controls.StylizedContainer.render(_oElements.outerContainer,oSkin);

vp.ui.setStyleValue(_oChromeNode.firstChild,"box-shadow","5px 5px 5px rgba(50,50,50,.5)");

var closeButtonHtml='<img vp-dialog-type="closeButton" src="'+me.chrome.closeButton+'" />';



if(vp.browser.isMobile)
{
closeButtonHtml+='<div vp-dialog-type="closeButtonLabel" style="display:block;position:absolute; right:28px; top:10px;'+me.chrome.titleStyle+'">'+vp.LangMap.CloseWindowButtonText+'</div>';
}

if(me.preventDismissal)
{
closeButtonHtml='';
}

_oElements.titleBar.innerHTML=
'<table style="width:100%; height:'+me.chrome.titleBarHeight+'px;" cellpadding="0" cellspacing="0">'+
'<tr>'+
'<td style="width:36px; padding-left:4px;" valign="middle" vp-dialog-type="iconContainer">'+
'</td>'+
'<td style="text-align:left; '+me.chrome.titleStyle+' padding-left:4px; cursor:default;" vp-dialog-type="titleContainer">'+
'</td>'+
'<td style="width:10%; text-align:right; font-size:1px; padding-right:5px;">'+closeButtonHtml+'</td>'+
'</tr>'+
'</table>';

collectElementsFromChrome(_oElements.titleBar);
};

var resetCoordsToCenter=function $vpfn_Maw28g8x8YRTvG090n6zYw1119$30(bOffsetForLevel)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oViewport=vp.ui.getViewportSize(me.rootWindow);
var oScroll=vp.ui.getScrollOffset(me.rootWindow);

me.rect.top=Math.floor((oViewport.height-me.rect.height)/2)+oScroll.top;
me.rect.left=Math.floor((oViewport.width-me.rect.width)/2)+oScroll.left;



if(bOffsetForLevel&&me.getLevel()>0)
{
var oUnderneathDialog=me.rootWindow.__vp_dialog_stack[me.getLevel()-1];
if(oUnderneathDialog.rect.width==me.rect.width)
{
me.rect.top+=me.getLevel()*8;
me.rect.left+=me.getLevel()*8;
}
}
};

var _oLastRenderedCoords=null;




var adjustForMaximumBounds=function $vpfn_k4wQ4CMiF$CtyeKqo$Nw2w1145$33()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!_oContentNode||(me.options.maximumHeight===0&&me.options.maximumWidth===0))
{
return;
}

var oRect=getContentRectFromOuterRect();
var oOuterRect=me.rect;

var addedYScroll=false;

var maxHeight=me.options.maximumHeight;
var maxWidth=me.options.maximumWidth;

if(maxHeight<0)
{

maxHeight+=vp.ui.getClientHeight();
}

if(maxWidth<0)
{

maxWidth+=vp.ui.getClientWidth();
}

if(maxHeight>0&&maxHeight<oOuterRect.height)
{

oRect.height-=Math.max(0,oOuterRect.height-maxHeight);
oRect.width+=20;
_oElements.contentContainer.style.overflowY="auto";
addedYScroll=true;
}
else
{

_oElements.contentContainer.style.overflowY="hidden";
}

if(maxWidth>0&&maxWidth<oOuterRect.width)
{

oRect.width-=Math.max(0,oOuterRect.width-maxWidth);
oRect.height+=20;
if(!addedYScroll)
{
oRect.width+=20;
}
_oElements.contentContainer.style.overflowX="auto";
}
else
{

_oElements.contentContainer.style.overflowX="hidden";
}

setRectByContentSize(oRect);
};

var positionDialog=function $vpfn_MgYmyVglVF1K1j7uSzmtDA1206$25()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.rect.top==-1&&me.rect.left==-1)
{
resetCoordsToCenter(true);
}


var bIsResize=false;
if(_oLastRenderedCoords)
{
if(_oLastRenderedCoords.width!=me.rect.width||
_oLastRenderedCoords.height!=me.rect.height)
{
bIsResize=true;
}
}

_oLastRenderedCoords={
width:me.rect.width,
height:me.rect.height
};


var oParentRect=getParentNodePositionWithoutScroll();

_oChromeNode.style.top=(Math.max(0,me.rect.top)-oParentRect.top)+"px";
_oChromeNode.style.left=(Math.max(0,me.rect.left)-oParentRect.left)+"px";

_oChromeNode.style.width=me.rect.width+"px";
_oChromeNode.style.height=me.rect.height+"px";

var oContentRect=getContentRectFromOuterRect();



oContentRect.width=Math.min(vp.ui.getWidth(_oElements.contentContainer.parentNode),oContentRect.width);

_oElements.contentContainer.style.width=oContentRect.width+"px";
_oElements.contentContainer.style.height=oContentRect.height+"px";


var oPageSize=vp.ui.getPageSize(me.rootWindow);
me.rootWindow[getBackgroundId()].style.width=oPageSize.width+"px";
me.rootWindow[getBackgroundId()].style.height=oPageSize.height+"px";

_oContentNode.style.display="block";
_oContentNode.style.visibility="visible";

if(bIsResize)
{
if(!_currentlyResizing)
{
_currentlyResizing=true;
me.onresize.fire();
_currentlyResizing=false;
}
}

me.onpositionchanged.fire();
};

var _currentlyResizing=false;

this.setTitle=function $vpfn_SzBBro2fN7urRjTBrv1W4A1270$20(sTitle)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_oElements.titleContainer.innerHTML=sTitle;
};

this.getTitle=function $vpfn_D_K$c6BlQYVdaJ$56R9YBA1275$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return _oElements.titleContainer.innerHTML;
};






var getMousePos=function $vpfn_lp95ynMwswO6AmsDL1ojgw1285$22(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);

if(e.touches&&e.touches.length>=0)
{
e=e.touches.item(0);
}

var oMousePos={
left:e.clientX,
top:e.clientY
};


if(e.target.ownerDocument!=me.rootWindow.document)
{
var oIFrame=vp.ui.getIFrameForDocument(e.target.ownerDocument);
var oRect=vp.ui.getRect(oIFrame);
oMousePos.top+=oRect.top;
oMousePos.left+=oRect.left;
}

return oMousePos;
};

var _bIsDragging=false;
var _oInitialMousePos=null;
var _oInitialDialogPos=null;

var _touchEventMap={
"mousemove":"touchmove",
"mouseup":"touchend",
"mousedown":"touchstart"
};

var addEvent=function $vpfn_vr_zAaIUHja7aAX1KVbJrw1321$19(element,type,handler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.browser.isMobile)
{
type=_touchEventMap[type]||type;
}

vp.events.add(element,type,handler);
};

var removeEvent=function $vpfn_3PioM_Kav21yUrK1kDqijw1331$22(element,type,handler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.browser.isMobile)
{
type=_touchEventMap[type]||type;
}

vp.events.remove(element,type,handler);
};

var startDrag=function $vpfn_IN1Z5476PU0LNQqAhJa_JQ1341$20(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);


if(e.target==_oElements.closeButton)
{
return;
}

me.onmovestart.fire(e);

if(e.cancel)
{
return;
}


if(e.target==_oContentNode||vp.ui.isChildOf(e.target,_oContentNode))
{
return;
}

vp.events.cancel(e);

_oInitialMousePos=getMousePos(e);
_oInitialDialogPos={top:_oChromeNode.offsetTop,left:_oChromeNode.offsetLeft};

var oRootElement=vp.ui.getRootElement(me.rootWindow.document);

addEvent(oRootElement,"mousemove",drag);
addEvent(oRootElement,"mouseup",stopDrag);

addEvent(_oChromeNode,"mouseup",stopDrag);

var aFrames=_oChromeNode.getElementsByTagName("IFRAME");
for(var i=0;i<aFrames.length;i++)
{
try
{
oRootElement=vp.ui.getRootElement(aFrames[i].contentWindow.document);

addEvent(oRootElement,"mousemove",drag);
addEvent(oRootElement,"mouseup",stopDrag);
}
catch(ex){}
}

_oParentRect=vp.ui.getRect(getParentNode());

_bIsDragging=true;
};

var _oParentRect;

var drag=function $vpfn_jtaVXMnAS7XgVXGVLKHrNw1396$15(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.events.cancel(e);





if(vp.browser.isIE&&vp.browser.ver<9&&e.button===0)
{

stopDrag(e);
return;
}

var oMousePos=getMousePos(e);

var iDeltaTop=oMousePos.top-_oInitialMousePos.top;
var iDeltaLeft=oMousePos.left-_oInitialMousePos.left;

me.rect.top=Math.max(_oInitialDialogPos.top+iDeltaTop,-_oParentRect.top);
me.rect.left=Math.max(_oInitialDialogPos.left+iDeltaLeft,-_oParentRect.left);

_oChromeNode.style.top=me.rect.top+"px";
_oChromeNode.style.left=me.rect.left+"px";

me.onmove.fire(e);








if(document.all&&me._oIFrame)
{

try
{
var temp=me._oIFrame.contentWindow.document.body.offsetTop;
}


catch(e)
{}
}
};

var stopDrag=function $vpfn__UKI_2bpWycLpWnfSQoqdQ1445$19(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_oInitialMousePos=null;
_oInitialDialogPos=null;

vp.events.cancel(e);

var rootElement=vp.ui.getRootElement(me.rootWindow.document);

removeEvent(rootElement,"mousemove",drag);
removeEvent(rootElement,"mouseup",stopDrag);
removeEvent(_oChromeNode,"mouseup",stopDrag);

var aFrames=_oChromeNode.getElementsByTagName("IFRAME");
for(var i=0;i<aFrames.length;i++)
{
try
{
rootElement=vp.ui.getRootElement(aFrames[i].contentWindow.document);

removeEvent(rootElement,"mousemove",drag);
removeEvent(rootElement,"mouseup",stopDrag);
}
catch(ex){}
}

_bIsDragging=false;

me.onmoveend.fire(e);
};
};

vp.dialog._setupOptions=function $vpfn_R3LnoMAQ7$2nmneWIMD2FQ1477$26(oDialog,sTitle,oChrome,oOptions)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

oDialog.options.title=sTitle||"";


for(var sProp in oOptions)
{
if(typeof(oDialog.options[sProp])=="undefined")
{
throw new Error("Unknown option: "+sProp);
}

oDialog.options[sProp]=oOptions[sProp];
}

oDialog.chrome=oChrome||vp.dialog.chrome.Primary;
};



















vp.dialog.NodeDialog.create=function $vpfn_FpoI$d8LPeMN3rJZBazT$A1514$30(sName,sTitle,vElementOrID,oChrome,iWidth,iHeight,oOptions)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog=new vp.dialog.NodeDialog(sName,{width:iWidth,height:iHeight},vElementOrID);

vp.dialog._setupOptions(oDialog,sTitle,oChrome,oOptions);

return oDialog;
};



















vp.dialog.NodeDialog.open=function $vpfn_Lz_nDOyJwLVSJoufAMyyBw1541$28(sName,sTitle,vElementOrID,oChrome,iWidth,iHeight,oOptions)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog=vp.dialog.NodeDialog.create(sName,sTitle,vElementOrID,oChrome,iWidth,iHeight,oOptions);
oDialog.open();
return oDialog;
};









vp.dialog.IFrameDialog=function $vpfn_wP74J6qHxRiMqvtYECWxlA1556$25(sId,oRect,sUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



this.inheritFrom=vp.dialog.NodeDialog;

this.inheritFrom(sId,oRect,vp.dialog._getRootWindow().document.createElement("DIV"));

var me=this;





this.dialogType=DIALOG_TYPE_IFRAME;




this._oIFrame=null;





this.url=vp.core.requireArg("sUrl",sUrl);





this.scrollType=DIALOG_SCROLL_TYPE_NO;





this.onload=new vp.events.CustomEvent(this,"onload");





this.onunload=new vp.events.CustomEvent(this,"onunload");





this.onbeforeunload=new vp.events.CustomEvent(this,"onbeforeunload");


this.resetScrollType=function $vpfn__rdAUd0RSKJZO3iwAGc5dg1609$27(oIFrame)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oIFrame=oIFrame||me._oIFrame;
switch(me.scrollType)
{
case DIALOG_SCROLL_TYPE_VERTICAL:
oIFrame.style.overflowX="hidden";
oIFrame.style.overflowY="auto";
break;
case DIALOG_SCROLL_TYPE_HORIZONTAL:
oIFrame.style.overflowX="auto";
oIFrame.style.overflowY="hidden";
break;
case DIALOG_SCROLL_TYPE_BOTH:
break;
default:
oIFrame.scrolling="no";
break;
}
};

var getNewIFrame=function $vpfn_sutMubCb3WERlzjzyLpcug1630$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var oIFrame=me.rootWindow.document.createElement("IFRAME");
oIFrame.id=me._getUniqueElementId(sId+"_iframe");
oIFrame.name=oIFrame.id;

oIFrame.frameBorder="0";
oIFrame.allowTransparency="true";
oIFrame.style.backgroundColor="transparent";
oIFrame.style.border="0px";
oIFrame.style.margin="0px";
oIFrame.style.padding="0px";

me.resetScrollType(oIFrame);

oIFrame.style.position="relative";
oIFrame.style.top="0";
oIFrame.style.left="0";
oIFrame.style.width="100%";
oIFrame.style.height="100%";

oIFrame.isModalDialog=true;


me.rootWindow.vp.core.setObjectReference(oIFrame,me,"dialog");

return oIFrame;
};




var buildUrl=function $vpfn_aDFt47XEBOs2zWvJ8ZNTyw1663$19(sUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oUrl=new vp.web.URL(sUrl);
oUrl.setItem("ts",new Date().valueOf());





oUrl.setItem("dop",getDomainFromUrl(me.rootWindow.document.location.href));

return oUrl.toString();
};

var getDomainFromUrl=function $vpfn_IxWSi05WyEADj6vgduAdLA1677$27(url)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return url.replace(/([^:]+:\/\/[^\/]+).*/,'$1');
};

var base_open=this.open;





this.open=function $vpfn_Dccp2xSqhcUKhqTAZ5mbrg1688$16(sUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!sUrl)
{
sUrl=me.url;
}
me.url=buildUrl(sUrl);


me._oIFrame=getNewIFrame();



vp.ui.ensureIFrameSrc(me._oIFrame);

me.replaceContentNode(me._oIFrame);

base_open();




me._oIFrame.src=me.url;
};




this.navigate=function $vpfn_TeauG$$5SWatC_djawxpjA1716$20(sUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me._oIFrame)
{

me.url=buildUrl(sUrl);
me._oIFrame.src=me.url;
}
else
{

me.open(sUrl);
}
};

var base_close=this.close;

this.close=function $vpfn_wQkMiqEoDbOz7jzo8VXCyg1733$17(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!base_close(e))
{
return false;
}




if(document.all)
{
try
{
me._oIFrame.contentWindow.document.write("");
me._oIFrame.contentWindow.document.close();
}
catch(accessDenied)
{

}
}

vp.ui.removeFromDOM(me._oIFrame);

return true;
};

this.reload=function $vpfn_Gl8muoKaBKTbA$BqU2iSZw1761$18()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.getInnerDocument().location.reload();
};

this.getInnerDocument=function $vpfn_mKXyEFeTJ9TzR0XYQOHT8g1766$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

return me._oIFrame.contentDocument||me._oIFrame.contentWindow.document;
};

this.getContentSize=function $vpfn_Gj7kLSxNOSXo4SBucoUNqg1772$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.ui.getContentSize(me._oIFrame.contentWindow,true);
};

this.getContentNode=function $vpfn_MOXanhMZKxKWKjkNx6ZIuA1777$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return this.getInnerDocument().body;
};
};


vp.dialog.IFrameDialog._onbeforeresizecurrent=new vp.events.CustomEvent(vp.dialog.IFrameDialog,"onbeforeresizecurrent");




















vp.dialog.IFrameDialog.create=function $vpfn_stsur6Add7un4F0p5gHDxg1805$32(sName,sTitle,sURL,oChrome,iWidth,iHeight,oOptions)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog=new vp.dialog.IFrameDialog(sName,{width:iWidth,height:iHeight},sURL);





oDialog.scrollType=oOptions&&oOptions.scrollType?oOptions.scrollType:DIALOG_SCROLL_TYPE_VERTICAL;
if(oOptions&&oOptions.scrollType)
{
delete oOptions.scrollType;
}

vp.dialog._setupOptions(oDialog,sTitle,oChrome,oOptions);

return oDialog;
};




















vp.dialog.IFrameDialog.open=function $vpfn_FiC$sQ0ltrBOFTX_iTHxZQ1843$30(sName,sTitle,sURL,oChrome,iWidth,iHeight,oOptions)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog=vp.dialog.IFrameDialog.create(sName,sTitle,sURL,oChrome,iWidth,iHeight,oOptions);
oDialog.open();
return oDialog;
};




vp.dialog.IFrameDialog.openAndReplace=function $vpfn_Wpx1GyPycabfHKKX3K8GDA1853$40(sName,sTitle,sURL,oChrome,iWidth,iHeight,oOptions)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var dialog=vp.dialog.getCurrent();
var args=arguments;

if(dialog)
{
var thisParent=vp.dialog.getParent();
dialog.onclose.addHandler(
function $vpfn_PRMsntChkc9ieRChWxi1mg1862$12()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
thisParent.vp.dialog.IFrameDialog._openAndReplaceCallback.apply(thisParent,args);
});

vp.dialog.closeCurrent();
}
else
{
vp.dialog.IFrameDialog.open(sName,sTitle,sURL,oChrome,iWidth,iHeight,oOptions);
}

};

vp.dialog.IFrameDialog._openAndReplaceCallback=function $vpfn_cBk_hnvdVFUV9rEQp4$jvA1876$49()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var args=arguments;
setTimeout(
function $vpfn_PRMsntChkc9ieRChWxi1mg1880$8()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.dialog.IFrameDialog.open.apply(this,args);
},
0);
};









vp.dialog.PopupDialog=function $vpfn_cAyhQQZhSwbvEhJcBnczEQ1895$24(sId,oRect,sUrl,bIsCrossDomain)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



this.inheritFrom=vp.dialog.Dialog;
this.inheritFrom(sId,oRect);

var me=this;





this.dialogType=DIALOG_TYPE_POPUP;





this.window=null;





this.scrollable=false;





this.resizable=false;





this.url=sUrl;





this.isCrossDomain=bIsCrossDomain;

var base_open=this.open;





this.open=function $vpfn_Dccp2xSqhcUKhqTAZ5mbrg1947$16(sUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
sUrl=sUrl||me.url;


me.window=vp.win.openCentered(sUrl,sId,me.rect.width,me.rect.height,me.resizable,me.scrollable,me.isCrossDomain);

if(!me.window)
{
return;
}





me.window.resizeTo(me.rect.width,me.rect.height);

vp.events.add(me.window,"load",initializeWindow);



base_open();
};

var _oChromeSize=null;

var initializeWindow=function $vpfn_UnmnL_r3TpohjMqu3x38jw1974$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!_oChromeSize)
{
var oInnerSize=vp.ui.getViewportSize(me.window);

_oChromeSize={
width:me.rect.width-oInnerSize.width,
height:me.rect.height-oInnerSize.height
};
}
};

var base_close=this.close;



this.close=function $vpfn_wQkMiqEoDbOz7jzo8VXCyg1991$17(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me._beginClose(e))
{
return false;
}

me.window.close();
return base_close(e);
};

this.resizeToFitContent=function $vpfn_e9hC0VQqKLyhRNbwbKjurg2002$30()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
initializeWindow();
var oContentSize=me.getContentSize();
me.window.resizeTo(oContentSize.width+_oChromeSize.width,oContentSize.height+_oChromeSize.height);
};

this.getContentSize=function $vpfn_Gj7kLSxNOSXo4SBucoUNqg2009$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.ui.getPageSize(me.window);
};

this.resizeByContentSize=function $vpfn_kxIatbd9lhiBfL6Xn7WBJw2014$31(iWidth,iHeight,bCenter)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
initializeWindow();



me.window.resizeTo(iWidth+_oChromeSize.width,iHeight+_oChromeSize.height);

if(bCenter)
{
vp.win.center(me.window);
}
};

this.setTitle=function $vpfn_SzBBro2fN7urRjTBrv1W4A2028$20(sTitle)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.window.document.title=sTitle;
};

this.getTitle=function $vpfn_D_K$c6BlQYVdaJ$56R9YBA2033$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return me.window.document.title;
};
};






vp.dialog.getDialogById=function $vpfn_rieP3c3IKwCbBfbpcPD9fw2044$26(sID)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(window.__vp_dialog_map[sID])
{
return window.__vp_dialog_map[sID];
}

return null;
};






vp.dialog.get=vp.dialog.getDialogById;






var VP_DIALOG_CMD_PREFIX="vpdialogcmd";
var VP_DIALOG_MSG_PREFIX="vpdialogmsg";
var VP_DIALOG_XDOMAIN_ERR="Cross domain error: access denied";

vp.dialog._escapeMessageData=function $vpfn_RCURTm54amcNETuTE8Xyig2070$31(sData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(sData)=="string")
{
return sData.replace(",",";comma;");
}
else if(typeof(sData)=="undefined")
{
return"undefined";
}
else if(sData===null)
{
return"null";
}

return sData.toString();
};

vp.dialog._unescapeMessageData=function $vpfn_yhTeBu9tzjsaHTTUj8QIeg2088$33(sData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(sData)=="string")
{
return sData.replace(";comma;",",");
}

return sData;
};





vp.dialog._execCommandOnRoot=function $vpfn_8$o5D7IoBbHJvpEJhBmyuQ2102$31(sCommand)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}




var aMsg=[];
aMsg.push(VP_DIALOG_CMD_PREFIX);
aMsg.push(sCommand);

for(var i=1;i<arguments.length;i++)
{
var sArg=arguments[i];
if(typeof(sArg)=="string")
{
sArg='"'+sArg+'"';
}
else if(typeof(sArg)=="undefined")
{
sArg="undefined";
}
aMsg.push(sArg);
}

if(!vp.dialog._ensureOpenerLocation())
{
return;
}

jQuery.postMessage(aMsg.join(","),vp.dialog._openerLocation,parent);
};




jQuery.receiveMessage(
function $vpfn_PRMsntChkc9ieRChWxi1mg2138$4(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(e.data.indexOf(VP_DIALOG_CMD_PREFIX)===0)
{


var aCmd=e.data.split(",");
var sCmd="vp.dialog."+aCmd[1]+"(";
var sDelim="";
for(var i=2;i<aCmd.length;i++)
{
sCmd+=sDelim+aCmd[i];
sDelim=",";
}
sCmd+=");";


var undefined;
window.eval(sCmd);
}
else if(e.data.indexOf(VP_DIALOG_MSG_PREFIX)===0)
{


var aMsg=e.data.split(",");
aMsg=aMsg.map(vp.dialog._unescapeMessageData);


aMsg.remove(0);

var oEventArgs={type:"receivemessage"};


oEventArgs.message=aMsg[0];
aMsg.remove(0);

oEventArgs.data=aMsg;



vp.dialog.IFrameDialog.onreceivemessage.fire(oEventArgs);
}
},
"*");


vp.dialog.IFrameDialog.onreceivemessage=new vp.events.CustomEvent(vp.dialog.IFrameDialog,"onreceivemessage");







vp.dialog.IFrameDialog.sendMessageToRoot=function $vpfn_2C35TYdWp4n$U2IxayuyPw2192$43(sMessage)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aMsg=[];
aMsg.add(VP_DIALOG_MSG_PREFIX);
aMsg.append(arguments);

aMsg=aMsg.map(vp.dialog._escapeMessageData);


if(!vp.dialog._ensureOpenerLocation())
{
return;
}

jQuery.postMessage(aMsg.join(","),vp.dialog._openerLocation,parent);
};

vp.dialog._ensureOpenerLocation=function $vpfn_L6lEnKO0lIUnefayEWGNRA2209$34()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!vp.dialog._openerLocation)
{
if(window.isDebug)
{
throw new Error("The dialog cannot communicate with it's parent cross-domain because it's source document was redirected to without preserving querystring parameters.");
}

return false;
}

return true;
};








vp.dialog.getCurrent=function $vpfn_QlVL9AjemSa3CxfkTWOYtw2231$23(oWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog;
var oWin=oWindow||window;

try
{



if(oWin.parent&&
oWin.parent!=oWin)
{
if(oWin.parent.vp&&oWin.parent.vp.dialog)
{

var oIframe=vp.ui.getIFrameForDocument(oWin.document);
if(!oIframe)
{
return null;
}



var oNestedDialog=vp.dialog._getDialogOnTopOfStack(oWin);
if(oNestedDialog)
{

return oNestedDialog;
}
else
{

return vp.dialog._getRootWindow().vp.core.getObjectReference(oIframe,"dialog",oWin.parent);
}
}
else if(!oWin.parent.location.href)
{





throw new Error(VP_DIALOG_XDOMAIN_ERR);
}
}
}
catch(ex)
{
try
{












var oNodeDialog=vp.dialog._getDialogOnTopOfStack(oWin);
if(oNodeDialog)
{
return oNodeDialog;
}
}
catch(ex2)
{
}



throw new Error(VP_DIALOG_XDOMAIN_ERR);
}



if(oWin.opener)
{
try
{
var oMap=oWin.opener.__vp_dialog_map;

if(oMap)
{
for(var sID in oMap)
{
if(oMap[sID].window==oWin)
{
return oMap[sID];
}
}
}
}
catch(ex)
{

}
}



if(oWindow)
{
return null;
}



return vp.dialog._getDialogOnTopOfStack(oWin);
};






vp.dialog._getDialogOnTopOfStack=function $vpfn_RN1_fT22UOJXzTd21Y4y2Q2351$35(oWindow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oWin=oWindow||window;


if(oWin.__vp_dialog_stack&&oWin.__vp_dialog_stack.length>0)
{
return oWin.__vp_dialog_stack[oWin.__vp_dialog_stack.length-1];
}

return null;
};






vp.dialog.closeCurrent=function $vpfn_SdDOXO_kz1ygM32f1q4VCw2369$25(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog;

try
{
oDialog=vp.dialog.getCurrent();
}
catch(ex)
{
if(ex.message==VP_DIALOG_XDOMAIN_ERR)
{
vp.dialog._execCommandOnRoot("closeCurrent");
return;
}

throw ex;
}

if(oDialog)
{
oDialog.close(e);
}

else if(window.opener&&!window.opener.closed)
{
window.close();
}
else
{
throw new Error("No dialog found to close");
}
};





vp.dialog.setTitleInCurrent=function $vpfn_gD8RX_DC7SuJ1CbgfjeksA2407$30(sTitle)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog;

try
{
oDialog=vp.dialog.getCurrent();
}
catch(ex)
{
if(ex.message==VP_DIALOG_XDOMAIN_ERR)
{
vp.dialog._execCommandOnRoot("setTitleInCurrent",sTitle);
return;
}

throw ex;
}

if(!oDialog)
{
return;
}

oDialog.setTitle(sTitle);
};






vp.dialog.getTitleInCurrent=function $vpfn_szX8K75QZlZ0HR$gZSy7rg2439$30()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog=vp.dialog.getCurrent();

if(!oDialog)
{
return document.title;
}

return oDialog.getTitle();
};









vp.dialog.cancelCurrent=function $vpfn_SI$17POkxLCArtGXLBZgCA2459$26(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=e||{};
e.isCancelButton=true;
try
{
vp.dialog.closeCurrent(e);
}
catch(ex)
{
}
};






vp.dialog.getParent=function $vpfn_0NUCciM882ENYOr3NrbPnw2477$22()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog=vp.dialog.getCurrent();
if(oDialog)
{
return oDialog?oDialog.openerWindow:null;
}

else if(window.opener&&!window.opener.closed)
{
return window.opener;
}

return null;
};

vp.dialog._ensureOnBeforeFirstResize=function $vpfn_fyPrw8K8YHYpHmtAcUQHEQ2493$39()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(arguments.callee._wasCalled)
{
return;
}

arguments.callee._wasCalled=true;

vp.dialog.Dialog.onbeforefirstresize.fire();
};






vp.dialog.resizeCurrent=function $vpfn_mA1h7SMV1j84hUsehLKfZg2510$26(iWidth,iHeight,bCenter)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.dialog._ensureOnBeforeFirstResize();

var oDialog;

try
{
oDialog=vp.dialog.getCurrent();
}
catch(ex)
{
if(ex.message==VP_DIALOG_XDOMAIN_ERR)
{
vp.dialog.IFrameDialog._suspendResizeEvents=true;
vp.dialog.IFrameDialog._onbeforeresizecurrent.fire();
vp.dialog.IFrameDialog._suspendResizeEvents=false;

vp.dialog._execCommandOnRoot("resizeCurrent",iWidth,iHeight,bCenter);
return;
}

throw ex;
}

if(oDialog&&oDialog.dialogType!=DIALOG_TYPE_POPUP)
{
oDialog.resize(iWidth,iHeight,bCenter);
}
else
{


if(bCenter)
{
vp.win.resizeAndCenter(iWidth,iHeight);
}
else
{
window.resizeTo(iWidth,iHeight);
}
}
};




vp.dialog.centerCurrent=function $vpfn_n3pJ754OLibMrpR_rlunhg2557$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.dialog.resizeCurrentBy(0,0,true);
};






vp.dialog.resizeCurrentBy=function $vpfn_aAbw_1vd1905_UtRVcLA3A2567$28(iIncreaseWidthBy,iIncreaseHeightBy,bCenter)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.dialog._ensureOnBeforeFirstResize();

var oDialog;
try
{
oDialog=vp.dialog.getCurrent();
}
catch(ex)
{
if(ex.message==VP_DIALOG_XDOMAIN_ERR)
{
vp.dialog.IFrameDialog._suspendResizeEvents=true;
vp.dialog.IFrameDialog._onbeforeresizecurrent.fire();
vp.dialog.IFrameDialog._suspendResizeEvents=false;

vp.dialog._execCommandOnRoot("resizeCurrentBy",iIncreaseWidthBy,iIncreaseHeightBy,bCenter);
return;
}

throw ex;
}

if(oDialog)
{
oDialog.resizeBy(iIncreaseWidthBy,iIncreaseHeightBy,bCenter);
}

else
{
window.resizeBy(iIncreaseWidthBy,iIncreaseHeightBy);

if(bCenter)
{
vp.win.center();
}
}
};






vp.dialog.resizeCurrentToContent=function $vpfn_U8W9_yY6k0nq91lSyqNORw2612$35(bCenter)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.dialog._ensureOnBeforeFirstResize();

var oSize;
var oDialog;

try
{
oDialog=vp.dialog.getCurrent();
}
catch(ex)
{
if(ex.message==VP_DIALOG_XDOMAIN_ERR)
{






vp.dialog.IFrameDialog._suspendResizeEvents=true;

vp.dialog.IFrameDialog._onbeforeresizecurrent.fire();
oSize=vp.dialog.getContentSizeOfCurrent();

vp.dialog.IFrameDialog._suspendResizeEvents=false;

vp.dialog._execCommandOnRoot("resizeCurrentToContentSize",oSize.width,oSize.height,bCenter);
return;
}

throw ex;
}

if(oDialog)
{
oDialog.resizeToFitContent(bCenter);
}

else
{
oSize=vp.ui.getPageSize(window);
window.resizeTo(oSize.width,oSize.height);

if(bCenter)
{
vp.win.center(window);
}
}
};








vp.dialog.resizeCurrentToContentSize=function $vpfn_s8iZwpi4phwHtjlnlpu8mg2671$39(iWidth,iHeight,bCenter)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.dialog._ensureOnBeforeFirstResize();

var oDialog;

try
{
oDialog=vp.dialog.getCurrent();
}
catch(ex)
{
if(ex.message==VP_DIALOG_XDOMAIN_ERR)
{
vp.dialog.IFrameDialog._suspendResizeEvents=true;
vp.dialog.IFrameDialog._onbeforeresizecurrent.fire();
vp.dialog.IFrameDialog._suspendResizeEvents=false;

vp.dialog._execCommandOnRoot("resizeCurrentToContentSize",iWidth,iHeight,bCenter);
return;
}

throw ex;
}

if(oDialog)
{
oDialog.resizeByContentSize(iWidth,iHeight,bCenter);
}

else
{
window.resizeTo(iWidth+10,iHeight+70);
if(bCenter)
{
vp.win.center();
}
}
};




vp.dialog.getContentSizeOfCurrent=function $vpfn_cfttwONaM7Y22zwLE6fXvQ2714$36()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog;

try
{
oDialog=vp.dialog.getCurrent();
}
catch(ex)
{
if(ex.message==VP_DIALOG_XDOMAIN_ERR)
{
return vp.ui.getContentSize(window,true);
}

throw ex;
}

if(oDialog)
{
return oDialog.getContentSize();
}

return null;
};





vp.dialog.addOnResizeHandlerToCurrent=function $vpfn_bD3Z8lsZSoPVh$lrcqWyug2744$40(fnHandler,sEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
sEvent=sEvent||"resize";
var oDialog;

try
{
oDialog=vp.dialog.getCurrent();
}
catch(ex)
{
if(ex.message!=VP_DIALOG_XDOMAIN_ERR)
{
throw ex;
}
}

if(oDialog)
{
oDialog["on"+sEvent].addHandler(fnHandler);



vp.events.add(window,"unload",function $vpfn_PRMsntChkc9ieRChWxi1mg2767$40()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oDialog["on"+sEvent].removeHandler(fnHandler);
});
}
else if(sEvent=="resize")
{

vp.events.add(
window,
sEvent,
function $vpfn_PRMsntChkc9ieRChWxi1mg2778$12(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.dialog.IFrameDialog._suspendResizeEvents)
{
return;
}



var oSize=vp.ui.getViewportSize();

if(vp.dialog._lastDialogWindowSize)
{
if(vp.dialog._lastDialogWindowSize.width==oSize.width&&
vp.dialog._lastDialogWindowSize.height==oSize.height)
{
return;
}
}

vp.dialog._lastDialogWindowSize=oSize;

fnHandler(e);
});
}
else if(sEvent=="beforeresize")
{
vp.dialog.IFrameDialog._onbeforeresizecurrent.addHandler(fnHandler);
}
};

vp.dialog.addOnBeforeResizeHandlerToCurrent=function $vpfn_TcoZAKRgNUql4RPkSzrapg2809$46(fnHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.dialog.addOnResizeHandlerToCurrent(fnHandler,"beforeresize");
};





vp.dialog._getRootWindow=function $vpfn_Dz9ykvDvot6Z6EgcwIDZPg2818$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oRootWindow=window;
while(oRootWindow!=oRootWindow.parent)
{
var oIFrame;
try
{
oIFrame=vp.ui.getIFrameForDocument(oRootWindow.document);



if(!oIFrame||!oIFrame.isModalDialog)
{
break;
}
}
catch(ex)
{

break;
}

oRootWindow=oRootWindow.parent;
}

return oRootWindow;
};



if(!window.__vp_dialog_map)
{
window.__vp_dialog_map={};
}





vp.dialog._openerLocation=vp.web.getQueryString("dop");
if(vp.dialog._openerLocation)
{
window.name="dop:"+vp.dialog._openerLocation;
}
else
{
if(window.name.indexOf("dop:")===0)
{
vp.dialog._openerLocation=window.name.substr(4);
}
}

vp.dialog.IFrameDialog.isChildWindow=function $vpfn_qQfa8kcD3dzwRd22j3NPqw2871$39()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return!!vp.dialog._openerLocation;
};

vp.dialog.IFrameDialog._addParentHandler=function $vpfn_D8laWWWiTQDNtXPvC$Ag6A2876$43(sEvent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog;

try
{
oDialog=vp.dialog.getCurrent(window);
}
catch(ex)
{
}

if(!oDialog)
{
return;
}

vp.events.add(
window,
sEvent,
function $vpfn_PRMsntChkc9ieRChWxi1mg2896$8(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oDialog)
{
return true;
}



if(sEvent=="unload"&&!vp.dialog.IFrameDialog._onbeforeunloadFired)
{
vp.dialog.IFrameDialog._onbeforeunloadFired=true;
oDialog.onbeforeunload.fire(e);
}
else if(sEvent=="beforeunload")
{
if(vp.dialog.IFrameDialog._onbeforeunloadFired)
{
return true;
}

vp.dialog.IFrameDialog._onbeforeunloadFired=true;
}

try
{



var oTemp=e.target||e.srcElement;
}
catch(ex)
{
e={type:sEvent};
}

oDialog["on"+sEvent].fire(e);

return true;
});
};

vp.dialog.IFrameDialog._initEvents=function $vpfn_TjWHzZdOmVwOTU1nhVXfyQ2938$37()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.dialog.IFrameDialog._addParentHandler("load");
vp.dialog.IFrameDialog._addParentHandler("beforeunload");
vp.dialog.IFrameDialog._addParentHandler("unload");
};

vp.dialog.IFrameDialog._initEvents();
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;


}








vp.dialog.chrome={};






vp.dialog.chrome._LayeredChromeBase=function $vpfn_YTqIXFOWwE2gPaSRc$s9IA20$38(sImagesDir)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

this.imagesDirectory=sImagesDir;

this.titleBarHeight=37;
this.titleStyle="color:black; font-weight:bold; font-size:13px; font-family:Arial;";
this.closeButton=vp.ui.imageUrl("/vp/images/b09/common/button/graphical/orange_close_button.png");

this.contentTopMargin=0;
this.contentLeftMargin=10;
this.contentRightMargin=10;
this.contentBottomMargin=10;

var _bPreloaded=false;

this.preloadImages=function $vpfn_lmcpQE0eIZr7QyHEG_Qsxw37$25()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!_bPreloaded)
{
var sExtension=this.hasPngTiles&&vp.ui.browserSupportsPNG()?"png":"gif";

var aImages=[
vp.ui.imageUrl(me.imagesDirectory+"/sprite_corners."+sExtension),
vp.ui.imageUrl(me.imagesDirectory+"/sprite_left_right."+sExtension)
];

vp.ui.preloadImages(aImages);

_bPreloaded=true;
}
};
};

vp.dialog.chrome._VistaPrintBase=function $vpfn_z1CMsAUUlA3hK9DImK03ig55$35(sImagesDir)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
this.inheritFrom=vp.dialog.chrome._LayeredChromeBase;
this.inheritFrom(sImagesDir);

this.left=26;
this.right=26;
this.top=38;
this.bottom=146;
this.backgroundColor="#FFFFFF";
this.hasPngTiles=true;
};

vp.dialog.chrome._CssChromeBase=function $vpfn_JuvkwatKoQujJGUGrH4sZA68$34(cssClass)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

this.cssClass=cssClass;
this.closeButton=vp.ui.imageUrl("/vp/images/b09/common/button/graphical/orange_close_button.png");

this.contentTopMargin=0;
this.contentLeftMargin=10;
this.contentRightMargin=10;
this.contentBottomMargin=10;

this.preloadImages=function(){};
};


vp.dialog.chrome.Primary=new vp.dialog.chrome._CssChromeBase("dialog-primary");
vp.dialog.chrome.Primary.titleBarHeight=33;
vp.dialog.chrome.Primary.contentTopMargin=5;
vp.dialog.chrome.Primary.titleStyle="color:white; font-weight:bold; font-size:13px;";



vp.dialog.chrome.Primary.styleCompensation={top:2,left:2,bottom:2,right:2};

vp.dialog.chrome.Message=vp.dialog.chrome.Primary;
vp.dialog.chrome.Announcement=vp.dialog.chrome.Primary;
vp.dialog.chrome.PrimaryLite=vp.dialog.chrome.Primary;

vp.dialog.chrome.Tabbed=vp.core.shallowCopy(vp.dialog.chrome.Primary);
vp.dialog.chrome.Tabbed.cssClass="dialog-primary-tabbed";
vp.dialog.chrome.Tabbed.contentTopMargin=0;
vp.dialog.chrome.Tabbed.contentLeftMargin=0;
vp.dialog.chrome.Tabbed.contentRightMargin=0;
vp.dialog.chrome.Tabbed.contentBottomMargin=10;
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}




if(typeof vp=="undefined"){
var vp={};
}





if(!vp.controls)
{
vp.controls={};
}




vp.controls.ExpandingContainer={};

vp.controls.ExpandingContainer.positionDefault=function $vpfn_Kzoew5xjIp77ei3EN5liEw24$49(oCollapsedRect,oExpandedRect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return{
top:oCollapsedRect.top-(oExpandedRect.height-oCollapsedRect.height),
left:oCollapsedRect.left
};
};

vp.controls.ExpandingContainer.init=function $vpfn_EIWpFTcB6XHYuqXLeN0$dA32$38(
vCollapsedElement,
vExpandedElement,
fnPositionElement,
sExpandButtonId,
sCollapseButtonId,
sTrackingIdRoot,
bHideCollapsedElement,
bDisplaceWhenExpanded,
bIsExpanded,
bCollapseOnBlur,
fnExpandCollapsedHandler
)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var oCollapsedElement=vp.core.getElement(vCollapsedElement,"vp.controls.ExpandingContainer.init");
var oExpandedElement=vp.core.getElement(vExpandedElement,"vp.controls.ExpandingContainer.init");
var oExpandButton=document.getElementById(sExpandButtonId)||oCollapsedElement;
var oCollapseButton=document.getElementById(sCollapseButtonId)||oExpandedElement;

oCollapsedElement.parentNode.style.position="relative";
if(!fnPositionElement)
{
fnPositionElement=vp.controls.ExpandingContainer.positionDefault;
}
else if(typeof(fnPositionElement)=="string")
{
try
{
fnPositionElement=eval(fnPositionElement);
}
catch(ex)
{
throw new Error("Invalid positioning function passed to ExpandingContainer: "+ex.message);
}
}

vp.ui.setStyle(oExpandButton,{cursor:"pointer"});

var fnExpand=function $vpfn_Km6kgKbEKgqHm1geFOeuUQ71$19(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!bDisplaceWhenExpanded)
{
vp.ui.moveToRoot(oExpandedElement);
}

var oNewStyle=
{
zIndex:10000,
width:parseInt(oExpandedElement.style.width)||oCollapsedElement.offsetWidth,
visibility:"hidden",
display:"block"
};
if(!bDisplaceWhenExpanded)
{
oNewStyle["position"]="absolute";
oNewStyle["top"]=0;
oNewStyle["left"]=0;
}

vp.ui.setStyle(oExpandedElement,oNewStyle);

var oNewRect=fnPositionElement(vp.ui.getRect(oCollapsedElement),vp.ui.getRect(oExpandedElement));

if(bHideCollapsedElement)
{
oCollapsedElement.style.visibility="hidden";
if(bDisplaceWhenExpanded)
{
oCollapsedElement.style.display="none";
}
}

vp.ui.setStyle(oExpandedElement,oNewRect);
vp.ui.setStyle(oExpandedElement,{visibility:"visible"});

if(sTrackingIdRoot)
{
var page=new vp.web.URL(document.location);
VS_logEvent(sTrackingIdRoot,"{0}:{1}:Open".format(page.pathname,oExpandButton.id));
}

if(fnExpandCollapsedHandler)
{
fnExpandCollapsedHandler(e);
}

if(e)
{
vp.events.cancelEvent(e);
}
};

var fnCollapse=function $vpfn_ndI2cgnE45J$0YAcSYPqaA125$21(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
oCollapsedElement.style.visibility="visible";
if(bDisplaceWhenExpanded)
{
oCollapsedElement.style.display="block";
}
oExpandedElement.style.display="none";

e=vp.events.getEvent(e);



if(sTrackingIdRoot&&e.target==oCollapseButton||vp.ui.isChildOf(e.target,oCollapseButton))
{
var page=new vp.web.URL(document.location);


VS_logEvent(sTrackingIdRoot,"{0}:{1}:Closed".format(page.pathname,oExpandButton.id));
}

if(fnExpandCollapsedHandler)
{
fnExpandCollapsedHandler(e);
}
};

vp.events.add(oExpandButton,"mousedown",fnExpand);

vp.ui.setStyle(oCollapseButton,{cursor:"pointer"});
vp.events.add(oCollapseButton,"mousedown",fnCollapse);

if(bCollapseOnBlur)
{
vp.events.add(vp.ui.getRootElement(),"mousedown",function $vpfn_lGGxSYwvdJUvpfs4zShenQ159$59(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);

if(e.target==oExpandedElement||vp.ui.isChildOf(e.target,oExpandedElement))
{
return;
}

if(e.target==oExpandButton||vp.ui.isChildOf(e.target,oExpandButton))
{
return;
}

fnCollapse(e);
});
}

if(bIsExpanded)
{
fnExpand(null);
}
};
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}


if(typeof(vp)=="undefined")
{
var vp={};
}





if(typeof(vp.widget)=="undefined")
{
vp.widget=function(){};
}

var WIDGET_PAGINATOR_ELLIPSIS_VAL=-1;










vp.widget.PagedList=function $vpfn_$yHU1K4T6hMSZSv85$Cl2A29$22(aItems,iItemsPerPage)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;





this.items=aItems||[];





this.itemsPerPage=iItemsPerPage||10;





this.currentPageNumber=1;





this.isMorePages=function $vpfn_y2hcI7KH3CXiPc$zb$UDRg55$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return me.currentPageNumber<me.getNumberOfPages();
};





this.isPreviousPages=function $vpfn_lxVSpe4b0BavCvCWD4XimQ64$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return me.currentPageNumber>1;
};






this.getPage=function $vpfn_FGI0vw5uy5VNKwy_D4pLMA74$19(iPageNumber)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return new vp.widget.PagedListPage(me,iPageNumber);
};





this.getCurrentPage=function $vpfn_Rfz5CoO_12JuQ9fcTRRHAQ83$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return me.getPage(me.currentPageNumber);
};




this.moveNextPage=function $vpfn_89Ml$cXL3o6ZOO0kK9HBYg91$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.isMorePages())
{
me.currentPageNumber++;
return true;
}

return false;
};




this.movePreviousPage=function $vpfn_rtEw25Azph45O1UBjwOSrA105$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.isPreviousPages())
{
me.currentPageNumber--;
return true;
}

return false;
};





this.moveToPage=function $vpfn_3ijIxtR1fHKP2i2tzN9wNw120$22(iPageNumber)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(iPageNumber>me.getNumberOfPages())
{
throw new Error("Too high");
}
else if(iPageNumber<1)
{
throw new Error("Too low");
}

me.currentPageNumber=iPageNumber;
};





this.getNumberOfPages=function $vpfn_$b5GTZQKg_mHdPSpi2dulQ138$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return Math.ceil(me.items.length/me.itemsPerPage);
};
};








vp.widget.PagedListPage=function $vpfn_q8iYdB0kLp$pZ14lnJ7vjg151$26(oPagedList,iPageNumber)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;
var _oList=oPagedList;
var _iPageNumber=iPageNumber;

var _iEnumerator=-1;





this.isValid=true;
this.startIndex=-1;
this.endIndex=-1;


var init=function $vpfn_XJUo_B49h9NIV6I1C5qxVA168$15()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_iPageNumber<0)
{
me.isValid=false;
return;
}





me.startIndex=(_iPageNumber*_oList.itemsPerPage)-_oList.itemsPerPage;
if(me.startIndex>=_oList.items.length)
{
me.isValid=false;
return;
}





me.endIndex=(me.startIndex+_oList.itemsPerPage)-1;
if(me.endIndex>=_oList.items.length)
{
me.endIndex=_oList.items.length-1;
}

if(me.startIndex<0||me.endIndex<0)
{
me.isValid=false;
}
};





this.getCurrentItem=function $vpfn_S07scfmHdZIn7t3PZrpt1w207$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_iEnumerator<=me.endIndex&&_iEnumerator>=me.startIndex)
{
return _oList.items[_iEnumerator];
}

return null;
};




this.moveNext=function $vpfn_Dk9xsTyEmeNCFQBKRLZgOA220$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.isValid)
{
if(_iEnumerator==-1)
{
_iEnumerator=me.startIndex-1;
}

if(_iEnumerator<me.endIndex)
{
_iEnumerator++;
return true;
}
}

return false;
};

init();
};








vp.widget.Paginator=function $vpfn_aUbNXfTermbKI7U00l$adw249$22(vElement,iNumberOfPages,fnPageChangeHandler,bUseCallbackBeforePageMove)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

var _fnPageChangeHandler=fnPageChangeHandler;

var _bUseCallbackBeforePageMove=bUseCallbackBeforePageMove;





this.element=vp.core.getElement(vElement,"vp.widget.Paginator()");






this.pagesPerScreen=9;





this.selectedPageNumber=1;

this.numberOfPages=iNumberOfPages;


this.showIndexedPages=true;

var _oElements;




var initSkin=function $vpfn_IvMhibRo3PsEce20LkMpBA286$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!_oElements)
{
_oElements=vp.ui.collectElementsByAttribute(me.element,"vp-widget-paginator-item");

clearElement();
}
};




this.setPageChangeCallback=function $vpfn_cfWHE$XMNTNLKfz4VwtAfQ299$33(fnNewCallback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_fnPageChangeHandler=fnNewCallback;
};




var clearElement=function $vpfn_kw38GLBQXi45zDRFtmgDWQ307$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
while(me.element.firstChild)
{
vp.ui.removeFromDOM(me.element.firstChild);
}
};




var getCurrentScreen=function $vpfn_nmFksQkNHoSZ68OSPxVE0w318$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aCurrentScreen=[];

var createEllipsis=me.numberOfPages>me.pagesPerScreen;
var makeLeftEllipsis=me.selectedPageNumber>parseInt(me.pagesPerScreen/2)+1&&createEllipsis?2:0;
var makeRightEllipsis=me.selectedPageNumber<=me.numberOfPages-parseInt(me.pagesPerScreen/2)-1&&createEllipsis?2:0;

var firstVisiblePage=Math.min(
Math.max(1,me.selectedPageNumber-parseInt(me.pagesPerScreen/2)+makeLeftEllipsis),
Math.max(1,me.numberOfPages-me.pagesPerScreen+makeLeftEllipsis+1));
var lastVisiblePage=Math.min(firstVisiblePage+me.pagesPerScreen-makeLeftEllipsis-makeRightEllipsis-1,me.numberOfPages);

if(makeLeftEllipsis>0)
{
aCurrentScreen.add(1);
aCurrentScreen.add(WIDGET_PAGINATOR_ELLIPSIS_VAL);
}

var i;
for(i=firstVisiblePage;i<=lastVisiblePage;i++)
{
aCurrentScreen.add(i);
}

if(makeRightEllipsis>0)
{
aCurrentScreen.add(WIDGET_PAGINATOR_ELLIPSIS_VAL);
aCurrentScreen.add(me.numberOfPages);
}

return aCurrentScreen;
};




this.render=function $vpfn_DOu2B3ztdAFVyS4uKdmaGw355$18()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
initSkin();

var aCurrentScreen=getCurrentScreen();

if(!aCurrentScreen&&me.numberOfPages>0)
{
throw new Error("BAD");
}

clearElement();

if(me.numberOfPages!==0)
{
var oTable=document.createElement("TABLE");
oTable.cellSpacing=0;
oTable.cellPadding=0;
oTable.border=0;
oTable.className="vp-widget-paginator-container";
var buttonRow=oTable.insertRow(0);

var oPreviousButtonCell=buttonRow.insertCell(buttonRow.childNodes.length);

oPreviousButtonCell.appendChild(
createPageButton(
me.selectedPageNumber-1,
false,
"<",
me.selectedPageNumber==1));

if(me.showIndexedPages)
{
for(var i=0;i<aCurrentScreen.length;i++)
{
var oButtonCell=buttonRow.insertCell(buttonRow.childNodes.length);

oButtonCell.appendChild(
createPageButton(
aCurrentScreen[i],
aCurrentScreen[i]==me.selectedPageNumber,
aCurrentScreen[i],
false));
}
}

var oNextButtonCell=buttonRow.insertCell(buttonRow.childNodes.length);

oNextButtonCell.appendChild(
createPageButton(
me.selectedPageNumber+1,
false,
">",
me.selectedPageNumber==me.numberOfPages));

me.element.appendChild(oTable);
}

vp.ui.expand(me.element);
};




var createPageButton=function $vpfn_eGlme_KQfaPzqOPsUnN25g419$27(iPageNumber,bIsSelected,sText,bDisabled)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var bIsEllipsis=iPageNumber==WIDGET_PAGINATOR_ELLIPSIS_VAL;
if(bIsEllipsis)
{
sText="...";
}
else if(!sText)
{
sText=iPageNumber.toString();
}

var oButton;

if(bDisabled&&sText=="<")
{
oButton=_oElements.leftArrowDisabled.cloneNode(true);
}
else if(bDisabled&&sText==">")
{
oButton=_oElements.rightArrowDisabled.cloneNode(true);
}
else if(sText=="<")
{
oButton=_oElements.leftArrow.cloneNode(true);
}
else if(sText==">")
{
oButton=_oElements.rightArrow.cloneNode(true);
}
else if(bIsEllipsis)
{
oButton=_oElements.ellipsis.cloneNode(true);
oButton.innerHTML="...";
}
else
{
if(bIsSelected)
{
oButton=_oElements.selected.cloneNode(true);
}
else if(bDisabled)
{
oButton=_oElements.disabled.cloneNode(true);
}
else
{
oButton=_oElements.normal.cloneNode(true);
}
oButton.innerHTML=sText;
}

oButton.setAttribute("is-disabled",bDisabled?"true":"false");
oButton.setAttribute("is-selected",bIsSelected?"true":"false");

if(!bDisabled&&!bIsEllipsis)
{
oButton.onclick=function $vpfn_8jV08BvW39vBhVmD2_LlcQ476$30(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fnUpdatePaginator=function $vpfn_zPX3POgxuxJ2zNrpdws95w478$40()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.selectedPageNumber=iPageNumber;
me.render();
};

if(_bUseCallbackBeforePageMove)
{
fnPageChangeHandler(iPageNumber,fnUpdatePaginator);
}
else
{
fnPageChangeHandler(iPageNumber);
fnUpdatePaginator();
}

vp.events.cancelEvent(e);
};
}

return oButton;
};
};




vp.widget.Paginator.rollover=function $vpfn_SQqot7hEmN64DXwFZkebAw505$31(oButton)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oButton.getAttribute("rollover-class")&&
!vp.core.getBoolean(oButton.getAttribute("is-selected"))&&
!vp.core.getBoolean(oButton.getAttribute("is-disabled")))
{
oButton.className=oButton.getAttribute("rollover-class");
}
};




vp.widget.Paginator.rollout=function $vpfn_uVO75zBcQKTaymDUazGQsg518$30(oButton)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oButton.getAttribute("is-selected")==="true"&&oButton.getAttribute("selected-class"))
{
oButton.className=oButton.getAttribute("selected-class");
}
else if(oButton.getAttribute("is-disabled")==="true"&&oButton.getAttribute("disabled-class"))
{
oButton.className=oButton.getAttribute("disabled-class");
}
else if(oButton.getAttribute("basic-class"))
{
oButton.className=oButton.getAttribute("basic-class");
}
};

vp.widget.Paginator.initAll=function $vpfn_boDkTUrhSRna3ad1R4nDZQ534$30()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(arguments.callee._called)
{
return;
}

arguments.callee._called=true;

$(".vp-widget-paginator-container").each(
function $vpfn_uPR1aGFXzUzXn4uysRpT8g544$8()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$(this)
.delegate("a","mouseover",function $vpfn_uPR1aGFXzUzXn4uysRpT8g547$44(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}vp.widget.Paginator.rollover(this);})
.delegate("a","mouseout",function $vpfn_uPR1aGFXzUzXn4uysRpT8g548$43(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}vp.widget.Paginator.rollout(this);});
});
};

vp.widget.PageGroupPaginator=function $vpfn_bhrZOjQpxUZ4L$QGu45xVQ552$31(vElement,iNumberOfPages,iNumberOfPagesPerGroup,fnGroupChangeHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

var _fnGroupChangeHandler=fnGroupChangeHandler;





this.element=vp.core.getElement(vElement,"vp.widget.PageGroupPaginator()");






this.groupsPerScreen=9;





this.selectedGroupNumber=1;

this.numberOfPages=iNumberOfPages;

this.numberOfPagesPerGroup=iNumberOfPagesPerGroup;

this.displayFirstPageAlone=false;

this.firstPageDisplayName=1;

this.numberOfGroups;

var _oElements;




var initSkin=function $vpfn_IvMhibRo3PsEce20LkMpBA592$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!_oElements)
{
_oElements=vp.ui.collectElementsByAttribute(me.element,"vp-widget-paginator-item");

clearElement();
}
};

this.getGroupNumber=function $vpfn_SDXJRjNPcx02giGy447GuA602$26(iPageNumber)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.displayFirstPageAlone)
{
if(iPageNumber==1)
{
return iPageNumber;
}
else
{
if(me.numberOfPagesPerGroup==1)
{
return iPageNumber;
}
else
{
return Math.floor(iPageNumber/me.numberOfPagesPerGroup)+1;
}
}
}
else
{
return Math.ceil(iPageNumber/me.numberOfPagesPerGroup);
}

};




this.setGroupChangeCallback=function $vpfn_foGtUsgX6U$nOwSy3sjFbA632$34(fnNewCallback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_fnGroupChangeHandler=fnNewCallback;
};




var clearElement=function $vpfn_kw38GLBQXi45zDRFtmgDWQ640$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
while(me.element.firstChild)
{
vp.ui.removeFromDOM(me.element.firstChild);
}
};




var getCurrentScreen=function $vpfn_nmFksQkNHoSZ68OSPxVE0w651$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var aCurrentScreen=[];

var createEllipsis=me.numberOfGroups>me.groupsPerScreen;
var makeLeftEllipsis=me.selectedGroupNumber>parseInt(me.groupsPerScreen/2)+1&&createEllipsis?2:0;
var makeRightEllipsis=me.selectedGroupNumber<=me.numberOfGroups-parseInt(me.groupsPerScreen/2)-1&&createEllipsis?2:0;



var firstVisibleGroup=Math.min(
Math.max(1,me.selectedGroupNumber-parseInt(me.groupsPerScreen/2)+makeLeftEllipsis),
Math.max(1,me.numberOfGroups-me.groupsPerScreen+makeLeftEllipsis+1)
);

var lastVisibleGroup=Math.min(firstVisibleGroup+me.groupsPerScreen-makeLeftEllipsis-makeRightEllipsis-1,me.numberOfGroups);

if(makeLeftEllipsis>0)
{
aCurrentScreen.add(1);
aCurrentScreen.add(WIDGET_PAGINATOR_ELLIPSIS_VAL);
}

var i;
for(i=firstVisibleGroup;i<=lastVisibleGroup;i++)
{
aCurrentScreen.add(i);
}

if(makeRightEllipsis>0)
{
aCurrentScreen.add(WIDGET_PAGINATOR_ELLIPSIS_VAL);
aCurrentScreen.add(me.numberOfGroups);
}

return aCurrentScreen;
};




this.render=function $vpfn_DOu2B3ztdAFVyS4uKdmaGw692$18()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
initSkin();

if(me.numberOfPagesPerGroup==1)
{
me.numberOfGroups=this.numberOfPages;
}
else
{
me.numberOfGroups=parseInt(this.numberOfPages/me.numberOfPagesPerGroup)+1*me.displayFirstPageAlone;
}

var aCurrentScreen=getCurrentScreen();

if(!aCurrentScreen&&me.numberOfGroups>0)
{
throw new Error("BAD");
}

clearElement();

if(me.numberOfGroups!==0)
{
var oTable=document.createElement("TABLE");
oTable.cellSpacing=0;
oTable.cellPadding=0;
oTable.border=0;
oTable.className="vp-widget-paginator-container";
var buttonRow=oTable.insertRow(0);

var oPreviousButtonCell=buttonRow.insertCell(buttonRow.childNodes.length);

oPreviousButtonCell.appendChild(
createGroupButton(
me.selectedGroupNumber-1,
false,
"<",
me.selectedGroupNumber==1));

for(var i=0;i<aCurrentScreen.length;i++)
{
var oButtonCell=buttonRow.insertCell(buttonRow.childNodes.length);

oButtonCell.appendChild(
createGroupButton(
aCurrentScreen[i],
aCurrentScreen[i]==me.selectedGroupNumber,
"",
false));
}

var oNextButtonCell=buttonRow.insertCell(buttonRow.childNodes.length);

oNextButtonCell.appendChild(
createGroupButton(
me.selectedGroupNumber+1,
false,
">",
me.selectedGroupNumber==me.numberOfGroups));

me.element.appendChild(oTable);
}

vp.ui.expand(me.element);
};




var createGroupButton=function $vpfn_105cSecABFYrmRr6ToaPKw762$28(iGroupNumber,bIsSelected,sText,bDisabled)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var bIsEllipsis=iGroupNumber==WIDGET_PAGINATOR_ELLIPSIS_VAL;
if(bIsEllipsis)
{
sText="...";
}
else if(!sText&&iGroupNumber>0&&iGroupNumber<=me.numberOfGroups)
{
if(iGroupNumber==1&&me.displayFirstPageAlone)
{
sText=me.firstPageDisplayName;
}
else if(me.numberOfPagesPerGroup==1)
{
sText=iGroupNumber.toString();
}
else
{
var iStartingPage;

if(me.numberOfPagesPerGroup==1)
{
iStartingPage=iGroupNumber;
}
else
{
iStartingPage=iGroupNumber*me.numberOfPagesPerGroup-(me.displayFirstPageAlone?me.numberOfPagesPerGroup:1);
}

var iEndingPage=iStartingPage+me.numberOfPagesPerGroup-1;

if(iStartingPage==me.numberOfPages)
{
sText=iStartingPage.toString();
}
else if(iEndingPage>me.numberOfPages)
{
sText=iStartingPage.toString()+" - "+me.numberOfPages.toString();
}
else
{
sText=iStartingPage.toString()+" - "+iEndingPage.toString();
}
}
}

var oButton;

if(bDisabled&&sText=="<")
{
oButton=_oElements.leftArrowDisabled.cloneNode(true);
}
else if(bDisabled&&sText==">")
{
oButton=_oElements.rightArrowDisabled.cloneNode(true);
}
else if(sText=="<")
{
oButton=_oElements.leftArrow.cloneNode(true);
}
else if(sText==">")
{
oButton=_oElements.rightArrow.cloneNode(true);
}
else if(bIsEllipsis)
{
oButton=_oElements.ellipsis.cloneNode(true);
oButton.innerHTML="...";
}
else
{
if(bIsSelected)
{
oButton=_oElements.selected.cloneNode(true);
}
else if(bDisabled)
{
oButton=_oElements.disabled.cloneNode(true);
}
else
{
oButton=_oElements.normal.cloneNode(true);
}
oButton.innerHTML=sText;
}

oButton.setAttribute("is-disabled",bDisabled?"true":"false");
oButton.setAttribute("is-selected",bIsSelected?"true":"false");

if(!bDisabled&&!bIsEllipsis)
{
oButton.onclick=function $vpfn_8jV08BvW39vBhVmD2_LlcQ854$30(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iPageNumber;

if(me.numberOfPagesPerGroup==1)
{
iPageNumber=iGroupNumber;
}
else
{
iPageNumber=iGroupNumber*me.numberOfPagesPerGroup-(me.displayFirstPageAlone?me.numberOfPagesPerGroup:1);
}

_fnGroupChangeHandler(iPageNumber);
me.selectedGroupNumber=iGroupNumber;
me.render();
vp.events.cancelEvent(e);
};
}

return oButton;
};
};


vp.widget.PageGroupPaginator.rollover=vp.widget.Paginator.rollover;
vp.widget.PageGroupPaginator.rollout=vp.widget.Paginator.rollout;













vp.widget.PaginatorTableHeader=function $vpfn_qNYhxfTGJXg05peV6E657A894$33(
vElement,
iSelectedPageNumber,
iNumberOfItems,
iItemsPerPage,
iPagesPerScreen,
aItemsPerPageOptions)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

this.element=vp.core.getElement(vElement,"vp.widget.PaginatorTableHeader()");
this.selectedPageNumber=iSelectedPageNumber;
this.numberOfItems=iNumberOfItems;
this.itemsPerPage=iItemsPerPage;
this.pagesPerScreen=iPagesPerScreen;
this.itemsPerPageOptions=aItemsPerPageOptions;
this.onchange=new vp.events.CustomEvent(this,"onchange");


var _oElements=vp.ui.collectElementsByAttribute(this.element,"paginator-table-header-item");

var getNumberOfPages=function $vpfn_$1LaEVDPXmbkfmJ3RKIXgA915$27(iNumberOfItems,iItemsPerPage)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return parseInt(Math.ceil(iNumberOfItems/iItemsPerPage));
};

var onPageChangeHandler=function $vpfn_wn_wn8N2h6JqCjADLwxB8Q920$30(iPageNumber)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.selectedPageNumber=iPageNumber;
me.onchange.fire();
me.render();
};

var onItemPerPageSelectorChangeHandler=function $vpfn_meHDaDD54haIRImWCYE$tg927$45(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.itemsPerPage=parseInt(vp.forms.getValue(_oElements.selector));
me.selectedPageNumber=1;
me.onchange.fire();
me.render();
};

this.paginator=new vp.widget.Paginator(
_oElements.paginator,
getNumberOfPages(iNumberOfItems,iItemsPerPage),
onPageChangeHandler);

vp.events.add(_oElements.selector,"change",onItemPerPageSelectorChangeHandler);

this.getFirstItemNumber=function $vpfn_nkr0vcIT6Va5Gz_o28FgfA942$30()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iRealSelectedPageNumber=Math.min(
me.selectedPageNumber,
parseInt(Math.ceil(me.numberOfItems/me.itemsPerPage)));

return(me.itemsPerPage*iRealSelectedPageNumber)-(me.itemsPerPage-1);
};

this.getLastItemNumber=function $vpfn_A6NZOmUNHB6er_5wozvB_A951$29()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return Math.min(me.getFirstItemNumber()+(me.itemsPerPage-1),me.numberOfItems);
};

this.render=function $vpfn_DOu2B3ztdAFVyS4uKdmaGw956$18()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.paginator.numberOfPages=getNumberOfPages(me.numberOfItems,me.itemsPerPage);
me.paginator.selectedPageNumber=me.selectedPageNumber;
me.paginator.pagesPerScreen=me.pagesPerScreen;
me.paginator.render();

if(me.paginator.numberOfPages<=1)
{
_oElements.paginator.style.visibility="hidden";
}
else
{
_oElements.paginator.style.visibility="visible";
}

if(!_oElements.selector.isInitialized)
{
while(_oElements.selector.firstChild)
{
_oElements.selector.removeChild(_oElements.selector.firstChild);
}

for(var i=0;i<me.itemsPerPageOptions.length;i++)
{
var oOption=document.createElement("OPTION");
oOption.value=me.itemsPerPageOptions[i];
oOption.text=me.itemsPerPageOptions[i];
_oElements.selector.options.add(oOption);
}

_oElements.selector.isInitialized=true;
}

_oElements.statusLabel.innerHTML=_oElements.statusLabel.getAttribute("format-string").format(
me.getFirstItemNumber(),
me.getLastItemNumber(),
me.numberOfItems);
};
};

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}






if(typeof vp=="undefined"){
var vp={};
}





vp.spot=function(){};






vp.spot.SPOT_URL="/vp/spot.aspx";







vp.spot.track=function $vpfn_4TJHOij9mPQYFfkT2Jo7xg33$16(sCode,callback){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof sCode!="string"||sCode.length===0){
throw new Error("vp.spot.track(): The code to track is either null or an empty string.");
}


var oData={
"Log":1,
"vsref":sCode,
"xref":sCode,


"u":new Date().valueOf(),
"qs":new vp.web.QueryString(window.location.search).toString()
};


var sQueryString=vp.web.createQueryString(oData);


vp.http.imagePing(vp.spot.SPOT_URL+"?"+sQueryString,callback);
};








vp.spot.trackWithQueryString=function $vpfn_PV2Bu$o0wAjL99yuOiJ$jw64$31(sCode,sQueryString){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof sCode!="string"||sCode.length===0){
throw new Error("vp.spot.track(): The code to track is either null or an empty string.");
}


var oData={
"Log":1,
"vsref":sCode,
"xref":sCode,


"u":new Date().valueOf(),
"qs":sQueryString
};


var sQs=vp.web.createQueryString(oData);


vp.http.imagePing(vp.spot.SPOT_URL+"?"+sQs);
};







vp.spot.trackAbsolute=function $vpfn_5jBrcbay_0h0FZI_sSlUNA94$24(sCode,bAbsolute){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof sCode!="string"||sCode.length===0){
throw new Error("vp.spot.trackAbsolute(): The code to track is either null or an empty string.");
}
if(typeof bAbsolute!="boolean"&&typeof bAbsolute!="number"){
throw new Error("vp.spot.trackAbsolute(): The second argument must be either true (for absolute) or false (for relative).");
}


var oData={
"abs":bAbsolute?1:0,
"xref":sCode
};


var sQueryString=vp.web.createQueryString(oData);


vp.http.imagePing(vp.spot.SPOT_URL+"?"+sQueryString);
};





vp.vaportest=function(){};






vp.vaportest.VAPOR_TEST_URL="/vp/vapor_test_recorder.aspx";






vp.vaportest.recordOfferAsAccepted=function $vpfn_gEQm8_KZMBWiAn0R3Mrg_Q134$37(offerId){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


var oData={
"accepted_offer_id":offerId
};


var sQueryString=vp.web.createQueryString(oData);


vp.http.imagePing(vp.vaportest.VAPOR_TEST_URL+"?"+sQueryString);
};

vp.spot.testLatency=function $vpfn_T0$JqxdnHVzZz0$pYXi7wA148$22(sUrl,iSessionId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
window.setTimeout(function $vpfn_7aWX88R_l106kbjN9DJHwQ150$22()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iStart=new Date().valueOf();
var fnCallback=function $vpfn_8fIwM2aOoC4qX_6_Ew1d2w153$25()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iEnd=new Date().valueOf();
var iLatency=(iEnd-iStart);
vp.http.getAsync("/Sales/InternalTools/LatencyTesterService.aspx?t="+iLatency+"&s="+iSessionId);
};

vp.http._asyncRequest(sUrl,"GET",{"cache-control":"no-cache"},null,fnCallback,null,1);
},
3000);
};
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}



vp.define("vp.analytics");




vp.analytics.logAction=function $vpfn_AaZ_H4Opo0nbKpsb7wxGqw10$25(action)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!vp.analytics.Logger.exists("action"))
{
vp.analytics.Logger.configure("action");
}

vp.analytics.Logger.add("action",action);
};




vp.analytics.click=
{
add:function $vpfn_bpQrIAJIjudtxYcsh3oEgA25$10(action)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!vp.analytics.Logger.exists("click"))
{
vp.analytics.Logger.configure("click",{param:"click"});
}
vp.analytics.Logger.add("click",action);
}
};

vp.analytics.Logger=new(function $vpfn_bpQrIAJIjudtxYcsh3oEgA35$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;






var TIMEOUT=10000;






var timeoutId;





var loggerKey=window._vp_page_guid;






var MAX_DEPTH=5;







var useSessionStorage=vp.browser.isWebKit;





var addedToSessionStorage=false;






var flushOnUnload=!vp.browser.isWebKit;





var DEFAULT_OPTIONS=
{




url:"/analytics-logger.aspx",






param:"actions"
};






var info={};





var activeLogs={};







var awaitingHover={};






this.configure=function $vpfn_eZXb5VMGtYdRy1IOUg0jXA133$21(logName,options)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
options=jQuery.extend({data:[]},DEFAULT_OPTIONS,options);
activeLogs[logName]=options;
};






this.write=function $vpfn_7XDXBUJiYFcKlKBfKI3gdw144$17(logs,writableInfo)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var urls={};

for(var logName in logs)
{
if(logs.hasOwnProperty(logName))
{
var log=logs[logName];

if(log.data.length===0)
{
continue;
}

if(!urls[log.url])
{
urls[log.url]=new vp.web.QueryString();
}


var qs=urls[log.url];
qs.setItem(log.param,log.data.join(","));
qs.setItem("info",vp.http.serializeJSON(writableInfo));


log.data=[];
}
}


for(var url in urls)
{
if(urls.hasOwnProperty(url))
{
vp.http.postAsync(url,urls[url].toString());
}
}
};




this.flush=function $vpfn_ooqsjxEDyiDEeV1k5H5IYw188$17()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(timeoutId)
{
clearTimeout(timeoutId);
timeoutId=null;
}

me.write(activeLogs,info);


if(addedToSessionStorage)
{
store("_logs_"+loggerKey,null);
store("_info_"+loggerKey,null);
}
};




var onUnload=function $vpfn_Av0GFhpYjN_0CHcvdtR3uw209$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

for(var applicationType in awaitingHover)
{
if(awaitingHover.hasOwnProperty(applicationType))
{
for(var loadAction in awaitingHover[applicationType])
{
if(awaitingHover[applicationType].hasOwnProperty(loadAction))
{
me.add(applicationType,loadAction);
}
}
}
}


if(flushOnUnload)
{
me.flush();
}


if(addedToSessionStorage)
{
var hasPendingData=false;


for(var logName in activeLogs)
{
if(activeLogs.hasOwnProperty(logName))
{
var log=activeLogs[logName];
hasPendingData|=log.data.length>0;
}
}

var keys=retrieve("_log_keys");



if(hasPendingData)
{
keys[loggerKey]=false;
store("_log_keys",keys);
}

else
{
delete keys[loggerKey];
store("_logs_"+loggerKey,null);
store("_info_"+loggerKey,null);
store("_log_keys",keys);
}
}
};





this.exists=function $vpfn_fFYB8zkeL1Kt7BV$59lWGQ271$18(logName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return activeLogs.hasOwnProperty(logName);
};






this.add=function $vpfn_pk7oSk198JjJ9D2C4OzYoA281$15(logName,action)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(useSessionStorage&&!timeoutId)
{
timeoutId=setTimeout(me.flush,TIMEOUT);
}

if(activeLogs[logName])
{
activeLogs[logName].data.push(action);
me.sync();
}
};







this.setInfo=function $vpfn_S96TvDDytxpGvixpqmeDNQ301$19(key,value)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
info[key]=value;
me.sync();
};





this.sync=function $vpfn_$t0V$9CLEBQ1CyDI05S2ng311$16()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(useSessionStorage)
{
if(!addedToSessionStorage)
{


var keys=retrieve("_log_keys")||{};
keys[loggerKey]=true;
store("_log_keys",keys);
addedToSessionStorage=true;
}

store("_logs_"+loggerKey,activeLogs);
store("_info_"+loggerKey,info);
}
};

var getBestParentIdentifier=function $vpfn_E6A9hA7wlzO0JTiCqzBnVg330$34(element,depth)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!element)
{
return null;
}

var identifier=element.getAttribute("data-item")||element.id;
if(identifier)
{
return identifier;
}
else
{
var parent=element.parentNode;
if(depth<MAX_DEPTH&&parent&&parent.tagName!=='BODY')
{
return getBestParentIdentifier(parent,depth+1);
}
else
{
return null;
}
}
};









var getElementName=function $vpfn_LiY5QNhtjkaUgrM9BeII8w364$25(eventOrElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var element=eventOrElement.srcElement||eventOrElement.target||eventOrElement;

if(!element)
{
return null;
}

var itemAttribute=element.getAttribute("data-item");
if(itemAttribute)
{
return itemAttribute;
}
else if(element.id)
{
return element.tagName+'#'+element.id;
}
else
{
var identifier=getBestParentIdentifier(element.parentNode,0);
if(identifier)
{
return element.tagName+':'+identifier;
}
else if(element.className)
{
return element.tagName+'.'+element.className;
}
else
{
return element.tagName;
}
}
};









this.enableClickTracking=function $vpfn_CV$kRFS0$CumOY_I7mIx6g408$31(applicationType,prefix,selector)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.exists(applicationType))
{
me.configure(applicationType,{param:applicationType});
}

$(selector).click(function $vpfn_bpQrIAJIjudtxYcsh3oEgA415$26(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var name=getElementName(e);
if(name)
{
me.add(applicationType,prefix+"|click|"+name);
}
});
};










this.enableHoverTrackingOnElements=function $vpfn_fVzkW$9ZwS7BRksqK34Osw434$41(applicationType,prefix,elements){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.exists(applicationType)){
me.configure(applicationType,{param:applicationType});
}

if(!awaitingHover[applicationType]){
awaitingHover[applicationType]={};
}

elements.each(function $vpfn_bpQrIAJIjudtxYcsh3oEgA443$22(i,e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var name=getElementName(e);
if(name)
{
awaitingHover[applicationType][prefix+"|load|"+name]=true;
}
});

elements.one("mouseover",function $vpfn_bpQrIAJIjudtxYcsh3oEgA452$34(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var name=getElementName(e);
if(name){
delete awaitingHover[applicationType][prefix+"|load|"+name];
me.add(applicationType,prefix+"|mouseover|"+name);
}
});
};










this.enableHoverTracking=function $vpfn_bLek3_5bzCOcgfwCAAV6FQ470$31(applicationType,prefix,selector,loadId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me.exists(applicationType))
{
me.configure(applicationType,{param:applicationType});
}

if(!awaitingHover[applicationType])
{
awaitingHover[applicationType]={};
}

awaitingHover[applicationType][prefix+"|load|"+loadId]=true;

$(selector).one("mouseover",function $vpfn_bpQrIAJIjudtxYcsh3oEgA484$37(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var name=getElementName($(selector).get(0));
if(name)
{
delete awaitingHover[applicationType][prefix+"|load|"+loadId];
me.add(applicationType,prefix+"|mouseover|"+name);
}
});
};




var store=function $vpfn_4aAqQ5xLOQVmhbNr2kIsNA498$16(key,value)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
try
{
amplify.store.sessionStorage(key,value);
}
catch(e){}
};




var retrieve=function $vpfn_6Em75Xqpas$F3AUl_hHS4A510$19(key)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return amplify.store.sessionStorage(key);
};

var init=function $vpfn_2jQhFvXupDKJfsf4GGx7Pw515$15()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



if((window===window.parent)&&useSessionStorage)
{
var keys=retrieve("_log_keys");
for(var k in keys)
{
if(keys.hasOwnProperty(k))
{


if(!keys[k])
{
var storedLogs=retrieve("_logs_"+k);
var storedInfo=retrieve("_info_"+k);

if(storedLogs)
{
me.write(storedLogs,storedInfo);
}


store("_logs_"+k,null);
store("_info_"+k,null);
delete keys[k];
store("_log_keys",keys);
}
}
}
}


me.setInfo("page",window.location.pathname);

vp.events.add(window,"unload",onUnload);
};

init();

})();
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}




vp.define("vp.controls");




vp.controls.StylizedTable={};

vp.controls.StylizedTable.render=function(){};

vp.controls.StylizedTable.renderAll=function $vpfn_BdSiQMsCoxq_T2gDzhSmtQ15$38()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(vp.browser.isIE){
if(vp.browser.ver<9){
$(".stylized-table tr:first-child").addClass("first-child");
$(".stylized-table tbody").each(function $vpfn_M8ejvl8lJ84t5u79Nh0XZw21$44(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

$(this).children("tr:even").addClass("nth-child-odd");
});
$(".stylized-table td:first-child").addClass("first-child");
$(".stylized-table th:first-child").addClass("first-child");

$(".stylized-table tr").each(function $vpfn_M8ejvl8lJ84t5u79Nh0XZw28$41(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$(this).children("td:last").addClass("last-child");
$(this).children("th:last").addClass("last-child");
});
}
}

};

vp.events.addOnDOMLoadHandler(vp.controls.StylizedTable.renderAll);








(function(){





var root=this;


var previousUnderscore=root._;


var breaker={};


var ArrayProto=Array.prototype,ObjProto=Object.prototype,FuncProto=Function.prototype;


var slice=ArrayProto.slice,
unshift=ArrayProto.unshift,
toString=ObjProto.toString,
hasOwnProperty=ObjProto.hasOwnProperty;



var
nativeForEach=ArrayProto.forEach,
nativeMap=ArrayProto.map,
nativeReduce=ArrayProto.reduce,
nativeReduceRight=ArrayProto.reduceRight,
nativeFilter=ArrayProto.filter,
nativeEvery=ArrayProto.every,
nativeSome=ArrayProto.some,
nativeIndexOf=ArrayProto.indexOf,
nativeLastIndexOf=ArrayProto.lastIndexOf,
nativeIsArray=Array.isArray,
nativeKeys=Object.keys,
nativeBind=FuncProto.bind;


var _=function(obj){return new wrapper(obj);};





if(typeof exports!=='undefined'){
if(typeof module!=='undefined'&&module.exports){
exports=module.exports=_;
}
exports._=_;
}else{
root['_']=_;
}


_.VERSION='1.3.3';







var each=_.each=_.forEach=function(obj,iterator,context){
if(obj==null)return;
if(nativeForEach&&obj.forEach===nativeForEach){
obj.forEach(iterator,context);
}else if(obj.length===+obj.length){
for(var i=0,l=obj.length;i<l;i++){
if(i in obj&&iterator.call(context,obj[i],i,obj)===breaker)return;
}
}else{
for(var key in obj){
if(_.has(obj,key)){
if(iterator.call(context,obj[key],key,obj)===breaker)return;
}
}
}
};



_.map=_.collect=function(obj,iterator,context){
var results=[];
if(obj==null)return results;
if(nativeMap&&obj.map===nativeMap)return obj.map(iterator,context);
each(obj,function(value,index,list){
results[results.length]=iterator.call(context,value,index,list);
});
if(obj.length===+obj.length)results.length=obj.length;
return results;
};



_.reduce=_.foldl=_.inject=function(obj,iterator,memo,context){
var initial=arguments.length>2;
if(obj==null)obj=[];
if(nativeReduce&&obj.reduce===nativeReduce){
if(context)iterator=_.bind(iterator,context);
return initial?obj.reduce(iterator,memo):obj.reduce(iterator);
}
each(obj,function(value,index,list){
if(!initial){
memo=value;
initial=true;
}else{
memo=iterator.call(context,memo,value,index,list);
}
});
if(!initial)throw new TypeError('Reduce of empty array with no initial value');
return memo;
};



_.reduceRight=_.foldr=function(obj,iterator,memo,context){
var initial=arguments.length>2;
if(obj==null)obj=[];
if(nativeReduceRight&&obj.reduceRight===nativeReduceRight){
if(context)iterator=_.bind(iterator,context);
return initial?obj.reduceRight(iterator,memo):obj.reduceRight(iterator);
}
var reversed=_.toArray(obj).reverse();
if(context&&!initial)iterator=_.bind(iterator,context);
return initial?_.reduce(reversed,iterator,memo,context):_.reduce(reversed,iterator);
};


_.find=_.detect=function(obj,iterator,context){
var result;
any(obj,function(value,index,list){
if(iterator.call(context,value,index,list)){
result=value;
return true;
}
});
return result;
};




_.filter=_.select=function(obj,iterator,context){
var results=[];
if(obj==null)return results;
if(nativeFilter&&obj.filter===nativeFilter)return obj.filter(iterator,context);
each(obj,function(value,index,list){
if(iterator.call(context,value,index,list))results[results.length]=value;
});
return results;
};


_.reject=function(obj,iterator,context){
var results=[];
if(obj==null)return results;
each(obj,function(value,index,list){
if(!iterator.call(context,value,index,list))results[results.length]=value;
});
return results;
};




_.every=_.all=function(obj,iterator,context){
var result=true;
if(obj==null)return result;
if(nativeEvery&&obj.every===nativeEvery)return obj.every(iterator,context);
each(obj,function(value,index,list){
if(!(result=result&&iterator.call(context,value,index,list)))return breaker;
});
return!!result;
};




var any=_.some=_.any=function(obj,iterator,context){
iterator||(iterator=_.identity);
var result=false;
if(obj==null)return result;
if(nativeSome&&obj.some===nativeSome)return obj.some(iterator,context);
each(obj,function(value,index,list){
if(result||(result=iterator.call(context,value,index,list)))return breaker;
});
return!!result;
};



_.include=_.contains=function(obj,target){
var found=false;
if(obj==null)return found;
if(nativeIndexOf&&obj.indexOf===nativeIndexOf)return obj.indexOf(target)!=-1;
found=any(obj,function(value){
return value===target;
});
return found;
};


_.invoke=function(obj,method){
var args=slice.call(arguments,2);
return _.map(obj,function(value){
return(_.isFunction(method)?method||value:value[method]).apply(value,args);
});
};


_.pluck=function(obj,key){
return _.map(obj,function(value){return value[key];});
};


_.max=function(obj,iterator,context){
if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0])return Math.max.apply(Math,obj);
if(!iterator&&_.isEmpty(obj))return-Infinity;
var result={computed:-Infinity};
each(obj,function(value,index,list){
var computed=iterator?iterator.call(context,value,index,list):value;
computed>=result.computed&&(result={value:value,computed:computed});
});
return result.value;
};


_.min=function(obj,iterator,context){
if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0])return Math.min.apply(Math,obj);
if(!iterator&&_.isEmpty(obj))return Infinity;
var result={computed:Infinity};
each(obj,function(value,index,list){
var computed=iterator?iterator.call(context,value,index,list):value;
computed<result.computed&&(result={value:value,computed:computed});
});
return result.value;
};


_.shuffle=function(obj){
var shuffled=[],rand;
each(obj,function(value,index,list){
rand=Math.floor(Math.random()*(index+1));
shuffled[index]=shuffled[rand];
shuffled[rand]=value;
});
return shuffled;
};


_.sortBy=function(obj,val,context){
var iterator=_.isFunction(val)?val:function(obj){return obj[val];};
return _.pluck(_.map(obj,function(value,index,list){
return{
value:value,
criteria:iterator.call(context,value,index,list)
};
}).sort(function(left,right){
var a=left.criteria,b=right.criteria;
if(a===void 0)return 1;
if(b===void 0)return-1;
return a<b?-1:a>b?1:0;
}),'value');
};



_.groupBy=function(obj,val){
var result={};
var iterator=_.isFunction(val)?val:function(obj){return obj[val];};
each(obj,function(value,index){
var key=iterator(value,index);
(result[key]||(result[key]=[])).push(value);
});
return result;
};



_.sortedIndex=function(array,obj,iterator){
iterator||(iterator=_.identity);
var low=0,high=array.length;
while(low<high){
var mid=(low+high)>>1;
iterator(array[mid])<iterator(obj)?low=mid+1:high=mid;
}
return low;
};


_.toArray=function(obj){
if(!obj)return[];
if(_.isArray(obj))return slice.call(obj);
if(_.isArguments(obj))return slice.call(obj);
if(obj.toArray&&_.isFunction(obj.toArray))return obj.toArray();
return _.values(obj);
};


_.size=function(obj){
return _.isArray(obj)?obj.length:_.keys(obj).length;
};







_.first=_.head=_.take=function(array,n,guard){
return(n!=null)&&!guard?slice.call(array,0,n):array[0];
};





_.initial=function(array,n,guard){
return slice.call(array,0,array.length-((n==null)||guard?1:n));
};



_.last=function(array,n,guard){
if((n!=null)&&!guard){
return slice.call(array,Math.max(array.length-n,0));
}else{
return array[array.length-1];
}
};





_.rest=_.tail=function(array,index,guard){
return slice.call(array,(index==null)||guard?1:index);
};


_.compact=function(array){
return _.filter(array,function(value){return!!value;});
};


_.flatten=function(array,shallow){
return _.reduce(array,function(memo,value){
if(_.isArray(value))return memo.concat(shallow?value:_.flatten(value));
memo[memo.length]=value;
return memo;
},[]);
};


_.without=function(array){
return _.difference(array,slice.call(arguments,1));
};




_.uniq=_.unique=function(array,isSorted,iterator){
var initial=iterator?_.map(array,iterator):array;
var results=[];

if(array.length<3)isSorted=true;
_.reduce(initial,function(memo,value,index){
if(isSorted?_.last(memo)!==value||!memo.length:!_.include(memo,value)){
memo.push(value);
results.push(array[index]);
}
return memo;
},[]);
return results;
};



_.union=function(){
return _.uniq(_.flatten(arguments,true));
};



_.intersection=_.intersect=function(array){
var rest=slice.call(arguments,1);
return _.filter(_.uniq(array),function(item){
return _.every(rest,function(other){
return _.indexOf(other,item)>=0;
});
});
};



_.difference=function(array){
var rest=_.flatten(slice.call(arguments,1),true);
return _.filter(array,function(value){return!_.include(rest,value);});
};



_.zip=function(){
var args=slice.call(arguments);
var length=_.max(_.pluck(args,'length'));
var results=new Array(length);
for(var i=0;i<length;i++)results[i]=_.pluck(args,""+i);
return results;
};







_.indexOf=function(array,item,isSorted){
if(array==null)return-1;
var i,l;
if(isSorted){
i=_.sortedIndex(array,item);
return array[i]===item?i:-1;
}
if(nativeIndexOf&&array.indexOf===nativeIndexOf)return array.indexOf(item);
for(i=0,l=array.length;i<l;i++)if(i in array&&array[i]===item)return i;
return-1;
};


_.lastIndexOf=function(array,item){
if(array==null)return-1;
if(nativeLastIndexOf&&array.lastIndexOf===nativeLastIndexOf)return array.lastIndexOf(item);
var i=array.length;
while(i--)if(i in array&&array[i]===item)return i;
return-1;
};




_.range=function(start,stop,step){
if(arguments.length<=1){
stop=start||0;
start=0;
}
step=arguments[2]||1;

var len=Math.max(Math.ceil((stop-start)/step),0);
var idx=0;
var range=new Array(len);

while(idx<len){
range[idx++]=start;
start+=step;
}

return range;
};





var ctor=function(){};





_.bind=function bind(func,context){
var bound,args;
if(func.bind===nativeBind&&nativeBind)return nativeBind.apply(func,slice.call(arguments,1));
if(!_.isFunction(func))throw new TypeError;
args=slice.call(arguments,2);
return bound=function(){
if(!(this instanceof bound))return func.apply(context,args.concat(slice.call(arguments)));
ctor.prototype=func.prototype;
var self=new ctor;
var result=func.apply(self,args.concat(slice.call(arguments)));
if(Object(result)===result)return result;
return self;
};
};



_.bindAll=function(obj){
var funcs=slice.call(arguments,1);
if(funcs.length==0)funcs=_.functions(obj);
each(funcs,function(f){obj[f]=_.bind(obj[f],obj);});
return obj;
};


_.memoize=function(func,hasher){
var memo={};
hasher||(hasher=_.identity);
return function(){
var key=hasher.apply(this,arguments);
return _.has(memo,key)?memo[key]:(memo[key]=func.apply(this,arguments));
};
};



_.delay=function(func,wait){
var args=slice.call(arguments,2);
return setTimeout(function(){return func.apply(null,args);},wait);
};



_.defer=function(func){
return _.delay.apply(_,[func,1].concat(slice.call(arguments,1)));
};



_.throttle=function(func,wait){
var context,args,timeout,throttling,more,result;
var whenDone=_.debounce(function(){more=throttling=false;},wait);
return function(){
context=this;args=arguments;
var later=function(){
timeout=null;
if(more)func.apply(context,args);
whenDone();
};
if(!timeout)timeout=setTimeout(later,wait);
if(throttling){
more=true;
}else{
result=func.apply(context,args);
}
whenDone();
throttling=true;
return result;
};
};





_.debounce=function(func,wait,immediate){
var timeout;
return function(){
var context=this,args=arguments;
var later=function(){
timeout=null;
if(!immediate)func.apply(context,args);
};
if(immediate&&!timeout)func.apply(context,args);
clearTimeout(timeout);
timeout=setTimeout(later,wait);
};
};



_.once=function(func){
var ran=false,memo;
return function(){
if(ran)return memo;
ran=true;
return memo=func.apply(this,arguments);
};
};




_.wrap=function(func,wrapper){
return function(){
var args=[func].concat(slice.call(arguments,0));
return wrapper.apply(this,args);
};
};



_.compose=function(){
var funcs=arguments;
return function(){
var args=arguments;
for(var i=funcs.length-1;i>=0;i--){
args=[funcs[i].apply(this,args)];
}
return args[0];
};
};


_.after=function(times,func){
if(times<=0)return func();
return function(){
if(--times<1){return func.apply(this,arguments);}
};
};






_.keys=nativeKeys||function(obj){
if(obj!==Object(obj))throw new TypeError('Invalid object');
var keys=[];
for(var key in obj)if(_.has(obj,key))keys[keys.length]=key;
return keys;
};


_.values=function(obj){
return _.map(obj,_.identity);
};



_.functions=_.methods=function(obj){
var names=[];
for(var key in obj){
if(_.isFunction(obj[key]))names.push(key);
}
return names.sort();
};


_.extend=function(obj){
each(slice.call(arguments,1),function(source){
for(var prop in source){
obj[prop]=source[prop];
}
});
return obj;
};


_.pick=function(obj){
var result={};
each(_.flatten(slice.call(arguments,1)),function(key){
if(key in obj)result[key]=obj[key];
});
return result;
};


_.defaults=function(obj){
each(slice.call(arguments,1),function(source){
for(var prop in source){
if(obj[prop]==null)obj[prop]=source[prop];
}
});
return obj;
};


_.clone=function(obj){
if(!_.isObject(obj))return obj;
return _.isArray(obj)?obj.slice():_.extend({},obj);
};




_.tap=function(obj,interceptor){
interceptor(obj);
return obj;
};


function eq(a,b,stack){


if(a===b)return a!==0||1/a==1/b;

if(a==null||b==null)return a===b;

if(a._chain)a=a._wrapped;
if(b._chain)b=b._wrapped;

if(a.isEqual&&_.isFunction(a.isEqual))return a.isEqual(b);
if(b.isEqual&&_.isFunction(b.isEqual))return b.isEqual(a);

var className=toString.call(a);
if(className!=toString.call(b))return false;
switch(className){

case'[object String]':


return a==String(b);
case'[object Number]':


return a!=+a?b!=+b:(a==0?1/a==1/b:a==+b);
case'[object Date]':
case'[object Boolean]':



return+a==+b;

case'[object RegExp]':
return a.source==b.source&&
a.global==b.global&&
a.multiline==b.multiline&&
a.ignoreCase==b.ignoreCase;
}
if(typeof a!='object'||typeof b!='object')return false;


var length=stack.length;
while(length--){


if(stack[length]==a)return true;
}

stack.push(a);
var size=0,result=true;

if(className=='[object Array]'){

size=a.length;
result=size==b.length;
if(result){

while(size--){

if(!(result=size in a==size in b&&eq(a[size],b[size],stack)))break;
}
}
}else{

if('constructor'in a!='constructor'in b||a.constructor!=b.constructor)return false;

for(var key in a){
if(_.has(a,key)){

size++;

if(!(result=_.has(b,key)&&eq(a[key],b[key],stack)))break;
}
}

if(result){
for(key in b){
if(_.has(b,key)&&!(size--))break;
}
result=!size;
}
}

stack.pop();
return result;
}


_.isEqual=function(a,b){
return eq(a,b,[]);
};



_.isEmpty=function(obj){
if(obj==null)return true;
if(_.isArray(obj)||_.isString(obj))return obj.length===0;
for(var key in obj)if(_.has(obj,key))return false;
return true;
};


_.isElement=function(obj){
return!!(obj&&obj.nodeType==1);
};



_.isArray=nativeIsArray||function(obj){
return toString.call(obj)=='[object Array]';
};


_.isObject=function(obj){
return obj===Object(obj);
};


_.isArguments=function(obj){
return toString.call(obj)=='[object Arguments]';
};
if(!_.isArguments(arguments)){
_.isArguments=function(obj){
return!!(obj&&_.has(obj,'callee'));
};
}


_.isFunction=function(obj){
return toString.call(obj)=='[object Function]';
};


_.isString=function(obj){
return toString.call(obj)=='[object String]';
};


_.isNumber=function(obj){
return toString.call(obj)=='[object Number]';
};


_.isFinite=function(obj){
return _.isNumber(obj)&&isFinite(obj);
};


_.isNaN=function(obj){

return obj!==obj;
};


_.isBoolean=function(obj){
return obj===true||obj===false||toString.call(obj)=='[object Boolean]';
};


_.isDate=function(obj){
return toString.call(obj)=='[object Date]';
};


_.isRegExp=function(obj){
return toString.call(obj)=='[object RegExp]';
};


_.isNull=function(obj){
return obj===null;
};


_.isUndefined=function(obj){
return obj===void 0;
};


_.has=function(obj,key){
return hasOwnProperty.call(obj,key);
};






_.noConflict=function(){
root._=previousUnderscore;
return this;
};


_.identity=function(value){
return value;
};


_.times=function(n,iterator,context){
for(var i=0;i<n;i++)iterator.call(context,i);
};


_.escape=function(string){
return(''+string).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;').replace(/\//g,'&#x2F;');
};



_.result=function(object,property){
if(object==null)return null;
var value=object[property];
return _.isFunction(value)?value.call(object):value;
};



_.mixin=function(obj){
each(_.functions(obj),function(name){
addToWrapper(name,_[name]=obj[name]);
});
};



var idCounter=0;
_.uniqueId=function(prefix){
var id=idCounter++;
return prefix?prefix+id:id;
};



_.templateSettings={
evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g
};




var noMatch=/.^/;



var escapes={
'\\':'\\',
"'":"'",
'r':'\r',
'n':'\n',
't':'\t',
'u2028':'\u2028',
'u2029':'\u2029'
};

for(var p in escapes)escapes[escapes[p]]=p;
var escaper=/\\|'|\r|\n|\t|\u2028|\u2029/g;
var unescaper=/\\(\\|'|r|n|t|u2028|u2029)/g;



var unescape=function(code){
return code.replace(unescaper,function(match,escape){
return escapes[escape];
});
};




_.template=function(text,data,settings){
settings=_.defaults(settings||{},_.templateSettings);




var source="__p+='"+text
.replace(escaper,function(match){
return'\\'+escapes[match];
})
.replace(settings.escape||noMatch,function(match,code){
return"'+\n_.escape("+unescape(code)+")+\n'";
})
.replace(settings.interpolate||noMatch,function(match,code){
return"'+\n("+unescape(code)+")+\n'";
})
.replace(settings.evaluate||noMatch,function(match,code){
return"';\n"+unescape(code)+"\n;__p+='";
})+"';\n";


if(!settings.variable)source='with(obj||{}){\n'+source+'}\n';

source="var __p='';"+
"var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+
source+"return __p;\n";

var render=new Function(settings.variable||'obj','_',source);
if(data)return render(data,_);
var template=function(data){
return render.call(this,data,_);
};



template.source='function('+(settings.variable||'obj')+'){\n'+
source+'}';

return template;
};


_.chain=function(obj){
return _(obj).chain();
};







var wrapper=function(obj){this._wrapped=obj;};


_.prototype=wrapper.prototype;


var result=function(obj,chain){
return chain?_(obj).chain():obj;
};


var addToWrapper=function(name,func){
wrapper.prototype[name]=function(){
var args=slice.call(arguments);
unshift.call(args,this._wrapped);
return result(func.apply(_,args),this._chain);
};
};


_.mixin(_);


each(['pop','push','reverse','shift','sort','splice','unshift'],function(name){
var method=ArrayProto[name];
wrapper.prototype[name]=function(){
var wrapped=this._wrapped;
method.apply(wrapped,arguments);
var length=wrapped.length;
if((name=='shift'||name=='splice')&&length===0)delete wrapped[0];
return result(wrapped,this._chain);
};
});


each(['concat','join','slice'],function(name){
var method=ArrayProto[name];
wrapper.prototype[name]=function(){
return result(method.apply(this._wrapped,arguments),this._chain);
};
});


wrapper.prototype.chain=function(){
this._chain=true;
return this;
};


wrapper.prototype.value=function(){
return this._wrapped;
};

}).call(this);






(function()
{
var applyToPrototype=function(prototype,methods)
{
for(var i=0;i<methods.length;i++)
{
(function(method)
{
if(!prototype[method])
{
prototype[method]=function()
{
var wrapped=_(this);
return wrapped[method].apply(wrapped,arguments);
};
}
})(methods[i]);
}
};

applyToPrototype(Function.prototype,["bind"]);
applyToPrototype(Array.prototype,["forEach","map","reduce","reduceRight","filter","every","some","indexOf"]);

})();




_.mixin({



extract:function(obj,props)
{
var o={};
_.each(props,function(key){
o[key]=obj[key];
});

return o;
},


pluck:function(arr,prop)
{
var o=[];
var extra=Array.prototype.slice.call(arguments,2);

_.each(arr,function(obj){
var res=obj[prop];
_.each(extra,function(extraProp){
res=res[extraProp];
});
o.push(res);
});

return o;
}

});


if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}








vp.define("vp.widget");

var TOOLTIP_BEHAVIOR_SHOW_ON_MOUSEOVER="mouseover";
var TOOLTIP_BEHAVIOR_SHOW_ON_CLICK="click";
var TOOLTIP_BEHAVIOR_SHOW_CUSTOM="custom";
var TOOLTIP_BEHAVIOR_HIDE_ON_MOUSEOVER="mouseoverhide";
var TOOLTIP_BEHAVIOR_HIDE_ON_CLICK="clickhide";
var TOOLTIP_BEHAVIOR_HIDE_CUSTOM="customhide";









vp.widget.RichTooltip=function $vpfn_70X_649SUlkVNzgycp28Gw29$24(vElement,vTooltipContent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;





this.element=vp.core.getElement(vElement,"vp.widget.RichTooltip.constructor");





this.width=250;





this.leftOffset=0;





this.topOffset=0;




this.delay=600;




this.fadetime=500;




var _bEnableContentEditableSupport=false;

this.contentEditableUnselectables=[];

this.contentEditableElement=null;

this.getHeight=function $vpfn_R0cAGrF7LorJpCuQ5qi1Tw76$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me._outerContainer)
{
return me._outerContainer.offsetHeight;
}
else
{
return getMinSize().height;
}
};




var _bManagedSelectability=false;

this.setContentEditableSupport=function $vpfn__OWi5OJYMGoq0mozEtDOWg93$37(bEnabled)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_bEnableContentEditableSupport=bEnabled;

_bManagedSelectability=vp.browser.isFirefox&&_bEnableContentEditableSupport;
};







this.skin=vp.widget.RichTooltip.skins.Message;

var _vTooltipContent=vTooltipContent;
var _sBehavior=null;
var _oContentNode=null;
var _iActionTimer=null;
var _oTooltipInner;
var _oContentContainer;
var _oCloseButton;
var _bSingular=true;





this._outerContainer=null;





this._arrow=null;

this.onresize=new vp.events.CustomEvent(this,"onresize");

this.onmove=new vp.events.CustomEvent(this,"onmove");

this.onbeforehide=new vp.events.CustomEvent(this,"onbeforehide");

this.onshow=new vp.events.CustomEvent(this,"onshow");

this.onhide=new vp.events.CustomEvent(this,"onhide");

this._isEnabled=true;





this.cacheOuterContainerEnabled=true;

this.setContentEditableElement=function $vpfn_p1PjcWkMrVr2Z6$q5rAZFA147$37(oElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.contentEditableElement=oElement;
};





this.setBehavior=function $vpfn_lQKnQOMAsUfvtY8U8yMAZA156$23(sBehavior)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(sBehavior!=_sBehavior)
{
if(sBehavior==TOOLTIP_BEHAVIOR_SHOW_ON_MOUSEOVER)
{
vp.events.add(me.element,"mouseover",me.show);
vp.events.add(me.element,"mouseout",hideWithDelay);
}
else
{
vp.events.remove(me.element,"mouseover",me.show);
vp.events.remove(me.element,"mouseout",hideWithDelay);
}

if(sBehavior==TOOLTIP_BEHAVIOR_HIDE_ON_MOUSEOVER)
{
vp.events.add(me.element,"mouseover",me.hide);
}
else
{
vp.events.remove(me.element,"mouseover",me.hide);
}

if(sBehavior==TOOLTIP_BEHAVIOR_SHOW_ON_CLICK)
{
vp.events.add(me.element,"click",me.show);
}
else
{
vp.events.remove(me.element,"click",me.show);
}

if(sBehavior==TOOLTIP_BEHAVIOR_HIDE_ON_CLICK)
{
vp.events.add(me.element,"click",me.hide);
}
else
{
vp.events.remove(me.element,"click",me.hide);
}

_sBehavior=sBehavior;
}
};






this.setSingularTooltip=function $vpfn_o06hSJkZ$Q6_kcm$qSj4tA207$30(value)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_bSingular=value;
};





this.setContent=function $vpfn_4DiLjH9nXPW9vh0pM3iItQ216$22(vTooltipContent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me._outerContainer)
{
_vTooltipContent=vTooltipContent;
return;
}

if(_oContentNode!=vTooltipContent)
{
if(_oContentNode)
{
vp.ui.removeFromDOM(_oContentNode);
}

if(typeof(vTooltipContent)=="string")
{
var oElement=document.getElementById(vTooltipContent);
if(oElement)
{
_oContentNode=oElement;
}
else
{
_oContentNode=document.createElement("DIV");
_oContentNode.innerHTML=vTooltipContent;
}
}
else
{
_oContentNode=vTooltipContent;
}

_oContentContainer.appendChild(_oContentNode);
}


if(_oContentContainer.children.length===0&&_oContentNode)
{
_oContentContainer.appendChild(_oContentNode);
}

if((_oContentNode!==undefined)&&_oContentNode.style.display=="none")
{
_oContentNode.style.display="";
}
};

var isSameOrChild=function $vpfn_nY_jwpX7egL7agBCsPOpHw264$24(item,itemOrChild)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return item==itemOrChild||vp.ui.isChildOf(item,itemOrChild);
};

var dialogMouseDownHandler=function $vpfn_WvZIejoIMzLCVCNzVUOD1g269$33(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);
if(e.type=="mousedown")
{
documentMouseDownHandler(e);
}
};

var documentMouseDownHandler=function $vpfn_7wlbZDQVrHodKBUOhWL30g278$35(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);

if(e.target!=_oCloseButton)
{
if(isSameOrChild(e.target,me.element))
{
return;
}

if(isSameOrChild(e.target,me._outerContainer))
{
if(_bManagedSelectability)
{
me.disableSelection();
}
return;
}
}

me.onbeforehide.fire(e);

if(e.cancelHide)
{
return;
}

me.hide();
};

this._initTooltip=function $vpfn_zlFLXf0kWGZUPG_Ixp5Bgw309$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(!me.cacheOuterContainerEnabled&&me._outerContainer)
{
document.body.removeChild(me._outerContainer);
me._outerContainer=null;
}
if(!me._outerContainer)
{
me._outerContainer=document.createElement("DIV");
me._outerContainer.id="divToolTip"+Math.random();
me._outerContainer.style.position="absolute";
me._outerContainer.style.display="none";
me._outerContainer.style.zIndex=4;
$(me._outerContainer).addClass("richtooltip");
if(me.skin)
{
$(me._outerContainer).addClass("richtooltip-skin-"+me.skin.name.toLowerCase());
}
document.body.appendChild(me._outerContainer);

vp.events.add(me._outerContainer,"mousedown",mousedownHandler);

_oTooltipInner=document.createElement("DIV");
me._outerContainer.appendChild(_oTooltipInner);
$(_oTooltipInner).addClass("richtooltip-content");

_oContentContainer=document.createElement("DIV");
_oTooltipInner.appendChild(_oContentContainer);

me._arrow=document.createElement("DIV");
$(me._arrow).addClass("richtooltip-arrow");
me._outerContainer.appendChild(me._arrow);

_oCloseButton=document.createElement("DIV");
$(_oTooltipInner).prepend($(_oCloseButton));
$(_oCloseButton).addClass("richtooltip-close");

vp.events.add(_oCloseButton,"click",documentMouseDownHandler);


if(_sBehavior==TOOLTIP_BEHAVIOR_SHOW_ON_MOUSEOVER)
{
vp.events.add(me._outerContainer,"mouseover",clearActionTimer);
vp.events.add(me._outerContainer,"mouseout",hideWithDelay);
}

if(_bManagedSelectability)
{
me.disableSelection();
}

_sOriginalBodyCursor=me._outerContainer.ownerDocument.body.style.cursor;
}

me.setContent(_vTooltipContent);

};

this.visible=false;





this.show=function $vpfn_lddWeUEPo9B4Nv27hpCpbA375$16(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!me._isEnabled)
{
return;
}

if(me.visible)
{
return;
}

if(!$(me.element).is(":visible"))
{
return;
}

me.visible=true;

if(e)
{
e=vp.events.getEvent(e);
}
else
{

e={clientY:0,clientX:0};
}

me._initTooltip();

clearActionTimer();

if(_bSingular)
{
if(window._currentRichTooltip&&window._currentRichTooltip!==me)
{
window._currentRichTooltip.hide();
}
window._currentRichTooltip=me;
}

me._renderOuterContainer(e);



var target=me.element;
var maxZIndex=0;

while(target&&target!=document.body)
{

if(target.nodeType==1)
{
var z=vp.core.getNumber(parseInt(vp.ui.getCurrentStyle(target,"zIndex")),0);
maxZIndex=Math.max(maxZIndex,z);
}


target=target.parentNode;
}

vp.ui.setStyleValue(me._outerContainer,"zIndex",maxZIndex+10);

me._outerContainer.style.display="none";
me._outerContainer.style.visibility="visible";


if(vp.browser.isIE&&vp.browser.ver<9)
{
$(me._outerContainer).show();
}
else
{
$(me._outerContainer).fadeIn(me.fadetime);
}

if(_sBehavior!=TOOLTIP_BEHAVIOR_HIDE_CUSTOM)
{
vp.events.add(me._outerContainer,"mousemove",mouseMoveHandler);

vp.events.add(vp.ui.getRootElement(),"mousedown",documentMouseDownHandler);




var dialog=vp.dialog?vp.dialog.getCurrent():null;
if(dialog)
{
dialog.onveilevent.addHandler(dialogMouseDownHandler);
_currentDialog=dialog;
}
}

me.onshow.fire(e);
};

this.refresh=function()
{

};

var positionCloseButton=function()
{

};





this._renderOuterContainer=function $vpfn_ZyoOC9gvjt_goRWlFJG$wA486$33(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


me._outerContainer.style.display="block";
me._outerContainer.style.visibility="hidden";


me.renderingStrategy.position(me,{top:e.clientY,left:e.clientX});
};




this.hide=function $vpfn_czai3$M0Zj18emwUAcTeaQ500$16(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me._outerContainer)
{
me.visible=false;

if(vp.browser.isIE&&vp.browser.ver<9)
{
$(me._outerContainer).hide();
}
else
{
$(me._outerContainer).fadeOut(me.fadetime);
}

if(window._currentRichTooltip===me)
{
window._currentRichTooltip=null;
}

vp.events.remove(vp.ui.getRootElement(),"mousedown",documentMouseDownHandler);



if(_currentDialog)
{
_currentDialog.onveilevent.addHandler(dialogMouseDownHandler);
_currentDialog=null;
}

me.onhide.fire(e);
}
};

var _currentDialog;

var clearActionTimer=function $vpfn__uWw_3EPVTN70FJhpQlFjA536$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_iActionTimer)
{
clearTimeout(_iActionTimer);
_iActionTimer=null;
}
};




this.hideAfterDelay=function $vpfn_pLlK3hZIuqi$JmX$GRiR_w548$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
hideWithDelay();
};

var hideWithDelay=function $vpfn_Aqw5vjhwnM456VYi7D$D$w553$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
clearActionTimer();

_iActionTimer=setTimeout(me.hide,me.delay);
};

this._getSkinImage=function(sTileName)
{


};

this.disableSelection=function $vpfn_Tg2TxJd5ClBCRjWuRedE9A566$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.contentEditableUnselectables=vp.ui.makeUnselectable(me._outerContainer);
};

this.enableSelection=function $vpfn_lJ$8aqe$2ua3ltYVTdXlmg571$27()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_bManagedSelectability)
{
vp.ui.makeSelectable(me.contentEditableUnselectables);
}
};

var _oInitialMousePos=null;
var _oInitialPos=null;
var _sResizeDirection=null;

var _sOriginalBodyCursor;
var _bDraggingOrResizing=false;

var mousedownHandler=function $vpfn_EATq08XlGBPR$SkvoU2vpg586$27(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);
if(_bManagedSelectability&&(e.target==me.contentEditableElement||vp.ui.isChildOf(e.target,me.contentEditableElement)))
{
me.enableSelection();
vp.events.cancelBubble(e);
}
else if(_bManagedSelectability&&(e.target==me._outerContainer||vp.ui.isChildOf(e.target,me._outerContainer)))
{
me.disableSelection();
}

if(!_bEnableContentEditableSupport)
{
vp.events.cancel(e);
}

if(!me.skin.resizeRect)
{
return;
}

_oInitialMousePos=getMousePos(e);
_oInitialPos={
top:me._outerContainer.offsetTop,
left:me._outerContainer.offsetLeft,
width:me._outerContainer.offsetWidth,
height:me._outerContainer.offsetHeight
};

_sResizeDirection=getResizeDirection(e);

if(_sResizeDirection)
{
vp.ui.setStyleValue(me._outerContainer.ownerDocument.body,"cursor",_sResizeDirection+"-resize");
}
else if(_oDragHandleElement)
{
e=vp.events.getEvent(e);
if(e.target!=_oDragHandleElement&&!vp.ui.isChildOf(e.target,_oDragHandleElement))
{
return;
}
}

_bDraggingOrResizing=true;

vp.events.add(me._outerContainer.ownerDocument,"mousemove",documentMouseMoveHandler);
vp.events.add(me._outerContainer.ownerDocument,"mouseup",mouseupHandler);
};

var mouseupHandler=function $vpfn_c4BCR2kDMP3I_PvIrT7u2g638$25(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_bDraggingOrResizing)
{
vp.events.remove(me._outerContainer.ownerDocument,"mousemove",documentMouseMoveHandler);
vp.events.remove(me._outerContainer.ownerDocument,"mouseup",mouseupHandler);
}


vp.ui.setStyleValue(me._outerContainer.ownerDocument.body,"cursor",_sOriginalBodyCursor);
_sResizeDirection=null;
};

var getMousePos=function $vpfn_pzYyAbbzY2g0tbqY9lX$$g651$22(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);

return{
left:e.clientX,
top:e.clientY
};
};





var getResizeDirection=function $vpfn_HaRZbl9I1kfOavojr$Egmg665$29(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.skin.resizeRect)
{
var mousePos=getMousePos(e);

var body=document.body,docElem=document.documentElement;
var scrollTop=(docElem&&docElem.scrollTop)?docElem.scrollTop:body.scrollTop;
var scrollLeft=(docElem&&docElem.scrollLeft)?docElem.scrollTop:body.scrollLeft;

mousePos.top+=scrollTop;
mousePos.left+=scrollLeft;


var oRect=vp.ui.getRect(me._outerContainer);


var oResizeRect={
top:me.skin.resizeRect.top+oRect.top,
left:me.skin.resizeRect.left+oRect.left,
bottom:oRect.bottom-me.skin.resizeRect.bottom,
right:oRect.right-me.skin.resizeRect.right
};

var sDirection="";
if(mousePos.top<oResizeRect.top)
{
sDirection+="N";
}
else if(mousePos.top>oResizeRect.bottom)
{
sDirection+="S";
}

if(mousePos.left<oResizeRect.left)
{
sDirection+="W";
}
else if(mousePos.left>oResizeRect.right)
{
sDirection+="E";
}

return sDirection;
}

return null;
};

var _sLastResizeCursor;

var mouseMoveHandler=function $vpfn_PwQGhyAuYKKmLrpCfIVWIA716$27(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_sResizeDirection)
{
return;
}
var sCursor="";
var sDirection=getResizeDirection(e);
if(sDirection)
{
sCursor=sDirection+"-resize";
}

if(sCursor!=_sLastResizeCursor)
{
vp.ui.setStyleValue(me._outerContainer,"cursor",sCursor);
_sLastResizeCursor=sCursor;
}
};

var documentMouseMoveHandler=function $vpfn_kB0_LQMYoe1D2qIiuNNBkA736$35(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);

var oMousePos=getMousePos(e);
var oDiff={
top:_oInitialMousePos.top-oMousePos.top,
left:_oInitialMousePos.left-oMousePos.left
};

if(_sResizeDirection)
{
var iNewHeight,iNewWidth;

if(_sResizeDirection.indexOf("N")>=0)
{
iNewHeight=_oInitialPos.height+oDiff.top;

if(iNewHeight>getMinSize().height)
{
me._outerContainer.style.top=(_oInitialPos.top-oDiff.top)+"px";
me._outerContainer.style.height=iNewHeight+"px";
}
}

if(_sResizeDirection.indexOf("S")>=0)
{
iNewHeight=_oInitialPos.height-oDiff.top;

if(iNewHeight>getMinSize().height)
{
me._outerContainer.style.height=iNewHeight+"px";
}
}

if(_sResizeDirection.indexOf("W")>=0)
{
iNewWidth=_oInitialPos.width+oDiff.left;

if(iNewWidth>getMinSize().width)
{
me._outerContainer.style.left=(_oInitialPos.left-oDiff.left)+"px";
me._outerContainer.style.width=iNewWidth+"px";
}
}

if(_sResizeDirection.indexOf("E")>=0)
{
iNewWidth=_oInitialPos.width-oDiff.left;

if(iNewWidth>getMinSize().width)
{
me._outerContainer.style.width=iNewWidth+"px";
}
}

_oTooltipInner.style.height=me._outerContainer.style.height;

if(me.renderingStrategy.resize)
{
me.renderingStrategy.resize(me);
}

me.width=me._outerContainer.offsetWidth;

positionCloseButton();



if(vp.browser.isWebKit)
{
_oTooltipInner.firstChild.style.height=_oTooltipInner.firstChild.style.height;
}

me.onresize.fire(e);
}
else
{
me._outerContainer.style.top=(_oInitialPos.top-oDiff.top)+"px";
me._outerContainer.style.left=(_oInitialPos.left-oDiff.left)+"px";

if(me.renderingStrategy.move)
{
me.renderingStrategy.move(me);
}

me.onmove.fire(e);
}
};

var getMinSize=function $vpfn_jNSQfIZhlAY4HUPSRJ$6BQ826$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(me.minSize)
{
return me.minSize;
}
else if(me.skin.minSize)
{
return me.skin.minSize;
}
else
{
return{width:50,height:50};
}
};

var _oDragHandleElement=null;






this.setDragHandleElement=function $vpfn_wmY3ETUH$rQ8XCGIfIGATA849$32(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_oDragHandleElement=vp.core.getElement(vElement);
vp.ui.setStyleValue(_oDragHandleElement,"cursor","default");
vp.ui.makeUnselectable(_oDragHandleElement);
};

this.setEnabled=function $vpfn_$M82Hmg7yNCvH4rFXVO$Qw856$22(bIsEnabled)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!bIsEnabled)
{
me.hide();
}
me._isEnabled=bIsEnabled;
};





this.minSize=null;





this.renderingStrategy=vp.widget.RichTooltip.renderingStrategies.Basic;

me.setBehavior(TOOLTIP_BEHAVIOR_SHOW_ON_MOUSEOVER);
};













vp.widget.showNotification=function $vpfn_Zujksa31KBUKG9TO31z7Dw892$29(oMessage,oElement,iLeftOffset,iTopOffset,iWidth,iTimeout,oSkin,oStrategy){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oTooltip=new vp.widget.RichTooltip(oElement,oMessage);

if(iLeftOffset)
{
oTooltip.leftOffset=iLeftOffset;
}

if(iTopOffset)
{
oTooltip.topOffset=iTopOffset;
}

if(iWidth)
{
oTooltip.width=iWidth;
}

if(iTimeout)
{
oTooltip.delay=iTimeout;
}

if(!oSkin)
{

oSkin=vp.widget.RichTooltip.skins.Message;
}

oTooltip.skin=oSkin;

if(oStrategy)
{
oTooltip.renderingStrategy=oStrategy;
}

oTooltip.setBehavior(TOOLTIP_BEHAVIOR_HIDE_ON_CLICK);
oTooltip.show();

return oTooltip;
};





vp.widget.RichTooltip.renderingStrategies={};






vp.widget.RichTooltip.renderingStrategies.IRenderingStrategy=function $vpfn_FdWl$6IDWgtYKJtMzEJkWA945$63()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}





this.position=function(oTooltip,oMousePos){};
};







vp.widget.RichTooltip.renderingStrategies.Basic={};






vp.widget.RichTooltip.renderingStrategies.Basic.position=function $vpfn_gg_IMKx4rrGom3vGXUe0YQ968$59(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=5;

oTooltip._outerContainer.style.width=oTooltip.width+"px";
oTooltip._outerContainer.style.top=(oElementRect.top-10+oTooltip.topOffset)+"px";
oTooltip._outerContainer.style.left=(oElementRect.right+oTooltip.leftOffset+DIST_FROM_ELEMENT_TO_ARROW+(oTooltip.skin.leftArrowWidth-oTooltip.skin.leftArrowOffset))+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-left");
oTooltip._arrow.style.top="20px";
};







vp.widget.RichTooltip.renderingStrategies.Right={};






vp.widget.RichTooltip.renderingStrategies.Right.position=function $vpfn_I42MfGrbZ72ZLh8cJqtpIA995$59(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=3;

var ARROW_TOP_OFFSET=10;

oTooltip._outerContainer.style.width=oTooltip.width+"px";
oTooltip._outerContainer.style.top=(oElementRect.top-ARROW_TOP_OFFSET+oTooltip.topOffset)+"px";
oTooltip._outerContainer.style.left=(oElementRect.left+oTooltip.leftOffset+oElementRect.width+oTooltip.skin.leftArrowWidth-oTooltip.skin.leftArrowOffset)+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-left");
oTooltip._arrow.style.top=ARROW_TOP_OFFSET+"px";
};





vp.widget.RichTooltip.renderingStrategies.Right.move=function $vpfn_PMLrU5YYtWKbJqSpEJK7Bw1015$55(oTooltip)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



oTooltip._arrow.src=VP_UI_BLANK_IMAGE;
};

vp.widget.RichTooltip.renderingStrategies.Right.resize=vp.widget.RichTooltip.renderingStrategies.Right.move;







vp.widget.RichTooltip.renderingStrategies.RightMiddle={};






vp.widget.RichTooltip.renderingStrategies.RightMiddle.position=function $vpfn_CiOg5sqDGT288JDfHCpqXg1038$65(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=3;

var ARROW_TOP_OFFSET=10;

oTooltip._outerContainer.style.width=oTooltip.width+"px";
oTooltip._outerContainer.style.top=(oElementRect.top+(oElementRect.height/2)+oTooltip.topOffset)-ARROW_TOP_OFFSET+"px";
oTooltip._outerContainer.style.left=(oElementRect.left+oTooltip.leftOffset+oElementRect.width+oTooltip.skin.leftArrowWidth-oTooltip.skin.leftArrowOffset)+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-left");
oTooltip._arrow.style.top=ARROW_TOP_OFFSET+"px";
};





vp.widget.RichTooltip.renderingStrategies.RightMiddle.move=function $vpfn_0qAtDTwJtP3qizbm_BAoYQ1058$61(oTooltip)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



oTooltip._arrow.src=VP_UI_BLANK_IMAGE;
};

vp.widget.RichTooltip.renderingStrategies.RightMiddle.resize=vp.widget.RichTooltip.renderingStrategies.RightMiddle.move;







vp.widget.RichTooltip.renderingStrategies.LeftAndOffsetBelow={};






vp.widget.RichTooltip.renderingStrategies.LeftAndOffsetBelow.position=function $vpfn_E5YlFBbRtsdeGc9R2WjBDA1081$72(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=0;

oTooltip._outerContainer.style.width=oTooltip.width+"px";

oTooltip._outerContainer.style.top=(oElementRect.top+(oElementRect.height)+50+oTooltip.topOffset)+"px";
oTooltip._outerContainer.style.left=(oElementRect.left+oTooltip.leftOffset-oTooltip.width-(oTooltip.skin.rightArrowWidth||oTooltip.skin.leftArrowWidth)-(oTooltip.skin.rightArrowOffset||oTooltip.skin.leftArrowOffset))+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-right");
oTooltip._arrow.style.top="10px";
};







vp.widget.RichTooltip.renderingStrategies.RightAbove={};






vp.widget.RichTooltip.renderingStrategies.RightAbove.position=function $vpfn_pd9_fvdh2oy4RpyayhrdTg1109$64(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=0;

oTooltip._outerContainer.style.width=oTooltip.width+"px";
oTooltip._outerContainer.style.top=(oElementRect.top-150+oTooltip.topOffset)+"px";
oTooltip._outerContainer.style.left=(oElementRect.left+oTooltip.leftOffset+oElementRect.width+oTooltip.skin.leftArrowWidth+oTooltip.skin.leftArrowOffset)+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-left");
oTooltip._arrow.style.top="160px";
};







vp.widget.RichTooltip.renderingStrategies.Left={};






vp.widget.RichTooltip.renderingStrategies.Left.position=function $vpfn_XledBCHUoE35pT_Utli1GQ1136$58(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=3;

var ARROW_TOP_OFFSET=10;

oTooltip._outerContainer.style.width=oTooltip.width+"px";
oTooltip._outerContainer.style.top=(oElementRect.top+oTooltip.topOffset)-ARROW_TOP_OFFSET+"px";
oTooltip._outerContainer.style.left=(oElementRect.left+oTooltip.leftOffset-oTooltip.width-(oTooltip.skin.rightArrowWidth||oTooltip.skin.leftArrowWidth)+(oTooltip.skin.rightArrowOffset||oTooltip.skin.leftArrowOffset))+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-right");
oTooltip._arrow.style.top=ARROW_TOP_OFFSET+"px";
};







vp.widget.RichTooltip.renderingStrategies.LeftMiddle={};






vp.widget.RichTooltip.renderingStrategies.LeftMiddle.position=function $vpfn_w36zfv0Kasql_VgsfcFOyA1165$64(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=3;

var ARROW_TOP_OFFSET=10;

oTooltip._outerContainer.style.width=oTooltip.width+"px";
oTooltip._outerContainer.style.top=(oElementRect.top+(oElementRect.height/2)+oTooltip.topOffset)-ARROW_TOP_OFFSET+"px";
oTooltip._outerContainer.style.left=(oElementRect.left+oTooltip.leftOffset-oTooltip.width-(oTooltip.skin.rightArrowWidth||oTooltip.skin.leftArrowWidth)+(oTooltip.skin.rightArrowOffset||oTooltip.skin.leftArrowOffset))+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-right");
oTooltip._arrow.style.top=ARROW_TOP_OFFSET+"px";
};







vp.widget.RichTooltip.renderingStrategies.Below={};






vp.widget.RichTooltip.renderingStrategies.Below.position=function $vpfn_oRsnMPU_MeYk9pFR9rGtXg1194$59(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=5;

oTooltip._outerContainer.style.width=oTooltip.width+"px";
oTooltip._outerContainer.style.top=(oElementRect.bottom+oTooltip.topOffset+oTooltip.skin.topArrowHeight+DIST_FROM_ELEMENT_TO_ARROW)+"px";
oTooltip._outerContainer.style.left=(oElementRect.left+10+oTooltip.leftOffset)+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-top");
oTooltip._arrow.style.left="20px";
};





vp.widget.RichTooltip.renderingStrategies.Below.move=function $vpfn_0iC7jKumMTX1B45EbTdhuQ1212$55(oTooltip)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



oTooltip._arrow.src=VP_UI_BLANK_IMAGE;
};







vp.widget.RichTooltip.renderingStrategies.BelowCenter={};






vp.widget.RichTooltip.renderingStrategies.BelowCenter.position=function $vpfn_Bsk8MVFaGsIXhC4U6yRHWg1233$65(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=5;

oTooltip._outerContainer.style.width=oTooltip.width+"px";
oTooltip._outerContainer.style.top=(oElementRect.bottom+oTooltip.topOffset+oTooltip.skin.topArrowHeight+DIST_FROM_ELEMENT_TO_ARROW)+"px";
oTooltip._outerContainer.style.left=(oElementRect.left+oTooltip.leftOffset+(oElementRect.width-oTooltip.width)/2)+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-top");
oTooltip._arrow.style.left=(oTooltip.width/2)+"px";
};







vp.widget.RichTooltip.renderingStrategies.BelowLeft={};






vp.widget.RichTooltip.renderingStrategies.BelowLeft.position=function $vpfn_YOZiv25zRYvXQ1R3cTCUPg1260$63(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=5;
var ARROW_RIGHT_OFFSET=23;

oTooltip._outerContainer.style.width=oTooltip.width+"px";
oTooltip._outerContainer.style.top=(oElementRect.bottom+oTooltip.topOffset+oTooltip.skin.topArrowHeight+DIST_FROM_ELEMENT_TO_ARROW)+"px";
oTooltip._outerContainer.style.left=(oElementRect.left+oTooltip.leftOffset+(oElementRect.width-oTooltip.width))+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-top");
oTooltip._arrow.style.left=(oTooltip.width-ARROW_RIGHT_OFFSET)+"px";
};







vp.widget.RichTooltip.renderingStrategies.Above={};






vp.widget.RichTooltip.renderingStrategies.Above.position=function $vpfn_naKg0qhOxOs2NlJuLyFi6w1288$59(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=5;

oTooltip._outerContainer.style.width=oTooltip.width+"px";


var oTooltipContainerRect=vp.ui.getRect(oTooltip._outerContainer);
oTooltip._outerContainer.style.top=(oElementRect.top+oTooltip.topOffset-oTooltipContainerRect.height-oTooltip.skin.topArrowHeight-DIST_FROM_ELEMENT_TO_ARROW)+"px";
oTooltip._outerContainer.style.left=(oElementRect.left+10+oTooltip.leftOffset)+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-bottom");
oTooltip._arrow.style.left="20px";
};







vp.widget.RichTooltip.renderingStrategies.LeftAbove={};






vp.widget.RichTooltip.renderingStrategies.LeftAbove.position=function $vpfn_ywTqpcPuJAd6GcisVQoWNw1318$63(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=5;

oTooltip._outerContainer.style.width=oTooltip.width+"px";


var oTooltipContainerRect=vp.ui.getRect(oTooltip._outerContainer);
oTooltip._outerContainer.style.top=(oElementRect.top+oTooltip.topOffset-oTooltipContainerRect.height-oTooltip.skin.topArrowHeight-DIST_FROM_ELEMENT_TO_ARROW)+"px";
oTooltip._outerContainer.style.left=(oElementRect.right-oTooltip.width)+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-bottom");
oTooltip._arrow.style.left=(oTooltip.width-40)+"px";
};







vp.widget.RichTooltip.renderingStrategies.AboveCenter={};






vp.widget.RichTooltip.renderingStrategies.AboveCenter.position=function $vpfn_QNAexTPdVUau9qw$Y40Pyw1348$65(oTooltip,oMousePos)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oElementRect=vp.ui.getRect(oTooltip.element);

var DIST_FROM_ELEMENT_TO_ARROW=5;

oTooltip._outerContainer.style.width=oTooltip.width+"px";


var oTooltipContainerRect=vp.ui.getRect(oTooltip._outerContainer);
oTooltip._outerContainer.style.top=(oElementRect.top+oTooltip.topOffset-oTooltipContainerRect.height-oTooltip.skin.topArrowHeight-DIST_FROM_ELEMENT_TO_ARROW)+"px";
oTooltip._outerContainer.style.left=(oElementRect.left+oTooltip.leftOffset+(oElementRect.width-oTooltip.width)/2)+"px";

$(oTooltip._arrow).addClass("richtooltip-arrow-bottom");
oTooltip._arrow.style.left=(oTooltip.width/2)+"px";
};






vp.widget.RichTooltip.skins={};






vp.widget.RichTooltip.skins.ISkin={
hasPngTiles:false,
imageDirectory:"",
leftArrowWidth:0,
leftArrowOffset:0,
topArrowHeight:0,
topArrowOffset:0,
rightArrowWidth:0,
rightArrowOffset:0,
resizeRect:{top:0,left:0,right:0,bottom:0},
minSize:{width:0,height:0}
};







vp.widget.RichTooltip.skins.Message={
name:"Message",
hasPngTiles:true,
imageDirectory:"/vp/images/b09/common/rich-tooltip/message",
leftArrowWidth:29,
leftArrowOffset:12,
topArrowHeight:32,
topArrowOffset:10
};







vp.widget.RichTooltip.skins.Subtle=vp.core.shallowCopy(vp.widget.RichTooltip.skins.Message);
vp.widget.RichTooltip.skins.Subtle.name="Subtle";







vp.widget.RichTooltip.skins.Resize={
name:"Resize",
hasPngTiles:true,
imageDirectory:"/vp/images/b09/common/rich-tooltip/resize",
leftArrowWidth:29,
leftArrowOffset:5,
topArrowHeight:25,
topArrowOffset:3,
rightArrowWidth:29,
rightArrowOffset:5,
resizeRect:{top:10,left:10,right:15,bottom:15},
minSize:{width:100,height:66}
};







vp.widget.RichTooltip.skins.CompactMessage={
name:"CompactMessage",
hasPngTiles:true,
imageDirectory:"/vp/images/b09/common/rich-tooltip/compact-message",
leftArrowWidth:7,
leftArrowOffset:12,
topArrowHeight:7,
topArrowOffset:12
};


if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}


if(typeof(vp)=="undefined")
{
var vp={};
}

if(!vp.widget)
{
vp.widget={};
}

vp.widget.dialogButtons={};



var VP_WIDGET_DIALOG_BUTTON_ID_OK="okButton";
var VP_WIDGET_DIALOG_BUTTON_ID_CANCEL="cancelButton";
var VP_WIDGET_DIALOG_BUTTON_ID_NEXT="nextButton";
var VP_WIDGET_DIALOG_BUTTON_ID_BACK="backButton";
var VP_WIDGET_DIALOG_BUTTON_ID_DONE="doneButton";






vp.widget.dialogButtons.enable=function $vpfn_Fda8MvDoBMzPp4lca82a1w29$33(vButton,bEnable)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oContainer=vp.widget.dialogButtons.getButtonContainer(vButton);

if(oContainer._isDisabled==!bEnable)
{
return;
}

oContainer._isDisabled=!bEnable;


jQuery(oContainer).find("[dialog-button-type='link']").toggle(bEnable);


jQuery(oContainer).find("[dialog-button-type='disabled']").toggle(!bEnable);
};

vp.widget.dialogButtons.toggle=function $vpfn_K0bNk_bLlkqn9E9mMWZZ9g47$33(vButton)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oContainer=vp.widget.dialogButtons.getButtonContainer(vButton);
vp.widget.dialogButtons.enable(oContainer,oContainer._isDisabled);
};

vp.widget.dialogButtons.swapButtons=function $vpfn_F_6Mu0O_E6l$EJPyW$Hq0Q53$38(vButtonToHide,vButtonToShow)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oButtonToHide=vp.widget.dialogButtons.getButtonContainer(vButtonToHide);
var oButtonToShow=vp.widget.dialogButtons.getButtonContainer(vButtonToShow);
oButtonToHide.style.display="none";
oButtonToShow.style.display="";
};

vp.widget.dialogButtons.get=function $vpfn_tIIHVY4YBU7uH2g6iFkjaQ61$30(vButtonOrID)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oContainer=vp.widget.dialogButtons.getButtonContainer(vButtonOrID);
if(!oContainer)
{
return null;
}

return jQuery(oContainer).find("[dialog-button-type='link']")[0];
};

vp.widget.dialogButtons.getButtonContainer=function $vpfn_rh5_N1ErQNOk23lA0Tcz7w72$45(vButtonOrID)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(vButtonOrID&&vButtonOrID.tagName)
{
return vButtonOrID;
}


var oDialog;
var isIFrameDialog=false;

try
{
oDialog=vp.dialog.getCurrent();
isIFrameDialog=oDialog.dialogType==DIALOG_TYPE_IFRAME;
}
catch(ex)
{
if(ex.message==VP_DIALOG_XDOMAIN_ERR)
{
isIFrameDialog=true;
}
else
{
throw ex;
}
}

var oButtons;
if(isIFrameDialog)
{
oButtons=vp.widget.dialogButtons.getButtonsForIFrameDialog();
}
else
{
if(!oDialog)
{
throw new Error("The button "+vButtonOrID+" could not be found because there was no current active dialog.");
}

oButtons=vp.widget.dialogButtons.getButtonsForNodeDialog(oDialog);
}

return oButtons.buttons[vButtonOrID]||null;
};

vp.widget.dialogButtons.getButtonsParentElement=function $vpfn_aOrINJFRcGrM9pITlnpB6g119$50(oDialog)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oContentNode=document.body;
var bIsIFrameDialog=true;
if(oDialog)
{
oContentNode=oDialog.getContentNode();
if(oDialog.dialogType==DIALOG_TYPE_NODE)
{
bIsIFrameDialog=false;
}
}

var $candidate=jQuery(oContentNode).find("div.dialogButtons");

if(bIsIFrameDialog)
{
$candidate=$candidate.filter(":not([dialogid])");
}
else
{
$candidate=$candidate.filter("[dialogid='"+oDialog.id.replace("_dialog","")+"']");
}

return $candidate[0];
};

vp.widget.dialogButtons._resetIFrameFooter=function $vpfn_POr9AmaEF6alfK$mxeX_2A146$45(oFooter)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oBody=oFooter.ownerDocument.body;


if(oFooter.parentNode!=oBody)
{
oFooter.parentNode.removeChild(oFooter);
oBody.appendChild(oFooter);
}

vp.ui.setStyle(oFooter,{top:0,left:0,display:"block",position:"relative"});
};

vp.widget.dialogButtons._iframePositioningCount=0;

vp.widget.dialogButtons._inPositioningMethod=false;

vp.widget.dialogButtons.positionDialogButtonsForIFrame=function $vpfn__Xs91CQQmBmdVGrTyOn1mw164$57()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



if(vp.widget.dialogButtons._inPositioningMethod)
{
return;
}





if(vp.widget.dialogButtons._iframePositioningCount>=4)
{
if(vp.widget.dialogButtons._iframePositioningCount==4)
{
setTimeout(function $vpfn_TAiwzWTD5KaENIi69flJTQ182$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.widget.dialogButtons._iframePositioningCount=0;
},
2000);
}

return;
}

vp.widget.dialogButtons._iframePositioningCount++;

vp.widget.dialogButtons._inPositioningMethod=true;

try
{

jQuery(".dialog-content-container").each(function $vpfn_TAiwzWTD5KaENIi69flJTQ199$49(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}vp.ui.ensureMaxHeight(this);});


var oFooter=vp.widget.dialogButtons.getButtonsParentElement();
vp.widget.dialogButtons._resetIFrameFooter(oFooter);




var sOverflow=window.document.documentElement.style.overflow;
window.document.documentElement.style.overflow="hidden";






var oBodyRect=vp.ui.getContentSize(window);
var oSize=vp.ui.getViewportSize(window,true);


window.document.documentElement.style.overflow=sOverflow;



oSize.top=0;
oSize.left=0;
oSize.bottom=oSize.height;
oSize.right=oSize.width;




oSize.bottom=Math.max(oSize.bottom,oBodyRect.height);
oSize.right=Math.max(oSize.right,oBodyRect.width);




if(vp.ui.getCurrentStyle(window.document.body,"position")=="relative")
{
var oBodyPos=vp.ui.getRect(document.body);
oSize.bottom-=oBodyPos.top;
oSize.right-=oBodyPos.left;
}



oSize.height=oSize.bottom-oSize.top;
oSize.width=oSize.right-oSize.left;

var iBottomMargin=0;

vp.ui.setStyle(oFooter,
{
left:0,
top:(oSize.bottom-(oFooter.offsetHeight))-iBottomMargin,
visibility:"visible",
position:"absolute"
});

vp.widget.dialogButtons.compensateForDialogContentMargins(oFooter,oSize);



var footerBottom=vp.ui.getRect(oFooter).bottom;
var viewportHeight=vp.ui.getViewportSize(window).height;

if(vp.browser.isMobileSafari||vp.browser.isAndroid)
{





try
{
var iFrame=vp.ui.getIFrameForDocument(document);
viewportHeight=$(iFrame.parentNode).height();
}
catch(ex)
{
}
}

if(footerBottom>viewportHeight)
{
vp.dialog.resizeCurrentToContentSize(0,footerBottom,true);
}
}
finally
{
vp.widget.dialogButtons._inPositioningMethod=false;
}
};

vp.widget.dialogButtons.compensateForDialogContentMargins=function $vpfn_UuItsAFawwHeRVFYK17vUQ295$60(oFooter,oSize)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



var oDialog;

try
{
oDialog=vp.dialog.getCurrent();
}
catch(ex)
{
if(ex.message!=VP_DIALOG_XDOMAIN_ERR)
{
throw ex;
}
}

if(!oDialog)
{
return;
}

var MARGIN=10;

var iDiffLeft=MARGIN-oDialog.options.contentLeftMargin;
var iDiffRight=MARGIN-oDialog.options.contentRightMargin;
if(iDiffLeft>0||iDiffRight>0)
{
oFooter.style.marginLeft=iDiffLeft+"px";
oFooter.style.marginRight=iDiffRight+"px";
oFooter.style.width=(oSize.width-(iDiffLeft+iDiffRight))+"px";
}
};




vp.core.markAsClosure(vp.widget.dialogButtons.positionDialogButtonsForIFrame);

vp.widget.dialogButtons.initForIFrameDialog=function $vpfn_ZR6ohJ802O3_w0flbvPKaQ336$46()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog;

try
{
oDialog=vp.dialog.getCurrent();
}
catch(ex)
{
if(ex.message!=VP_DIALOG_XDOMAIN_ERR)
{
throw ex;
}
}

var onBeforeResizeHandler=function $vpfn_$$440YrZVfDF031OVfzSig352$32()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(vp.widget.dialogButtons._inPositioningMethod)
{
return;
}

var oButtonGroup=vp.widget.dialogButtons.getButtonsParentElement(oDialog);
if(oButtonGroup)
{
vp.widget.dialogButtons._resetIFrameFooter(oButtonGroup);
}
};

vp.core.markAsClosure(onBeforeResizeHandler);

vp.events.addOnDOMLoadHandler(vp.widget.dialogButtons.positionDialogButtonsForIFrame);

var ensureInited=function $vpfn_Hia6wFlUAXfnouqSeSMUyw370$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(arguments.callee._wasCalled)
{
return;
}

arguments.callee._wasCalled=true;

vp.widget.dialogButtons.positionDialogButtonsForIFrame();

vp.dialog.addOnBeforeResizeHandlerToCurrent(onBeforeResizeHandler);
vp.dialog.addOnResizeHandlerToCurrent(vp.widget.dialogButtons.positionDialogButtonsForIFrame);
};

vp.dialog.Dialog.onbeforefirstresize.addHandler(ensureInited);

vp.events.add(window,"load",ensureInited);
};

vp.widget.dialogButtons._getDialog=function $vpfn_ZCLlr1QljPwTkO_ZDjj7Og390$37(vDialogOrId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog=vDialogOrId;
if(typeof(vDialogOrId)=="string")
{
oDialog=vp.dialog.get(vDialogOrId);
}

return oDialog;
};

vp.widget.dialogButtons._collectButtonElements=function $vpfn_q1kHuNhdhmBpJMvyIPYUhQ401$49(oContainer)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oButtonElements={};

oButtonElements.buttons=oContainer?vp.ui.collectElementsByAttribute(oContainer,"dialog-button-id"):{};
oButtonElements.buttonElements=oContainer?vp.ui.collectElementsByAttribute(oContainer,"dialog-button-node"):{};
oButtonElements.document=document;

return oButtonElements;
};






vp.widget.dialogButtons.getButtonsForNodeDialog=function $vpfn_qbaTMLotAjHvzdmPysLx8Q417$50(oDialog)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oDialog._buttons||oDialog._buttons.document!==document)
{
var oButtonContainer=vp.widget.dialogButtons.getButtonsParentElement(oDialog);

var oDialogNode=oDialog.getContentNode();
vp.widget.dialogButtons._ensureButtonContainerInCorrectParent(oButtonContainer,oDialogNode);

oDialog._buttons=vp.widget.dialogButtons._collectButtonElements(oButtonContainer);
}

return oDialog._buttons;
};

vp.widget.dialogButtons.getButtonsForIFrameDialog=function $vpfn_9cPbf6uYfBz4m4x$3BWikA432$52()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!window._dialogButtonElements)
{
window._dialogButtonElements={};

var oButtonContainer=vp.widget.dialogButtons.getButtonsParentElement();

vp.widget.dialogButtons._ensureButtonContainerInCorrectParent(oButtonContainer,document.body);

window._dialogButtonElements=vp.widget.dialogButtons._collectButtonElements(document.body);
}

return window._dialogButtonElements;
};

vp.widget.dialogButtons._ensureButtonContainerInCorrectParent=function $vpfn_0Bu86GKbh8CJHQlRQwipYg448$64(oButtonContainer,oParent)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oButtonContainer||!oParent)
{
return;
}

if(oButtonContainer.parentNode!=oParent)
{
oButtonContainer.parentNode.removeChild(oButtonContainer);
oParent.appendChild(oButtonContainer);
}
};

vp.widget.dialogButtons.resetButtonsForNodeDialog=function $vpfn_6O$orRSXK7KBSCGyfEkADw462$52(oDialog)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oButtons=vp.widget.dialogButtons.getButtonsForNodeDialog(oDialog);
var oFooter=oButtons.buttonElements.container;
oFooter.style.marginTop=0;
};

vp.widget.dialogButtons.initForNodeDialog=function $vpfn_x0exBeMJ40_NsvmdGe7G5A469$44(sDialogID)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDialog=vp.widget.dialogButtons._getDialog(sDialogID);
if(oDialog)
{
var oButtons=vp.widget.dialogButtons.getButtonsForNodeDialog(oDialog);

var fnPositionButtons=function $vpfn_WIA1ax_Bw_lAvR71emJYEQ476$32(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.widget.dialogButtons.positionDialogButtonsForNodeDialog(oDialog,oButtons);
};

oDialog.onopen.addHandler(fnPositionButtons);
}
};

vp.widget.dialogButtons.positionDialogButtonsForNodeDialog=function $vpfn_tkHaVeXzgc9gIsrNUw0mCg485$61(oDialog,oButtons)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(oDialog)=="string")
{
oDialog=vp.widget.dialogButtons._getDialog(oDialog);
}

if(!oDialog)
{
throw new Error("No dialog specified");
}

if(!oButtons)
{
oButtons=vp.widget.dialogButtons.getButtonsForNodeDialog(oDialog);
}

var oFooter=oButtons.buttonElements.container;
vp.widget.dialogButtons.resetButtonsForNodeDialog(oDialog);

var oContentNode=oDialog.getContentContainer();

var oButtonsRect=vp.ui.getRect(oFooter);
var oDialogRect=vp.ui.getRect(oContentNode.parentNode);
var oContentRect=vp.ui.getRect(oContentNode);

var oIdealRect=vp.core.shallowCopy(oDialogRect);

oIdealRect.bottom=Math.max(oDialogRect.bottom,oContentRect.bottom);
oIdealRect.right=Math.max(oDialogRect.right,oContentRect.right);
oIdealRect.height=oDialogRect.bottom-oDialogRect.top;
oIdealRect.width=oDialogRect.right-oDialogRect.left;


var iDiff=oIdealRect.bottom-oButtonsRect.bottom;
if(iDiff>0)
{
oFooter.style.marginTop=iDiff+"px";
}

oButtonsRect=vp.ui.getRect(oFooter);
iDiff=oDialogRect.bottom-oButtonsRect.bottom;
if(iDiff<0)
{
oDialog.resizeToFitContent(false);
}

vp.widget.dialogButtons.compensateForDialogContentMargins(oFooter,oDialogRect);
};

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}


if(typeof vp=="undefined"){
var vp={};
}





if(!vp.dialog)
{
vp.dialog=function(){};
}









vp.dialog.prompt=function $vpfn_pNDeF6LWreXGv_zGjc4mWA25$19(sTitle,sMessage,sInitialVal,fnSuccess,additionalCallbackArgs)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(window!=vp.dialog._getRootWindow())
{
var val=prompt(sMessage,sInitialVal);
if(val)
{
fnSuccess(val);
}
return;
}

var oDialog=vp.dialog.get("promptDialog");
oDialog.open();
oDialog.setTitle(sTitle);

$("#divPromptMessage").html(sMessage);

var oInput=$("#divPromptInput");
oInput.keydown(vp.dialog.prompt.onKeyDown);
oInput.val(sInitialVal);
oInput.focus();

oDialog.resizeToFitContent();

vp.dialog.prompt._current.callback=fnSuccess;
vp.dialog.prompt._current.dialog=oDialog;


if(!(additionalCallbackArgs==undefined))
{
vp.dialog.prompt._current.additionalArgs=additionalCallbackArgs;
}
};

vp.dialog.prompt.onKeyDown=function $vpfn_4JVhpN0lgUd513jaFACHXw61$29(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(e.keyCode==13)
{
vp.dialog.prompt.OK();
return false;
}
else if(e.keyCode==27)
{
vp.dialog.prompt.Cancel();
return false;
}

};

vp.dialog.prompt._current={};
vp.dialog.prompt._current.additionalArgs;

vp.dialog.prompt.OK=function $vpfn_dO4jbc1gQGalqJ8kCAugew79$22()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$("#divPromptInput").unbind("keydown");
vp.dialog.prompt._current.dialog.close();

if(vp.dialog.prompt._current.additionalArgs)
{
vp.dialog.prompt._current.callback($("#divPromptInput").val(),vp.dialog.prompt._current.additionalArgs);
}
else
{
vp.dialog.prompt._current.callback($("#divPromptInput").val());
}
};

vp.dialog.prompt.Cancel=function $vpfn_PJzH9xO9cw2nBu5GOmklkw94$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$("#divPromptInput").unbind("keydown");
vp.dialog.prompt._current.dialog.close();
};
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}






if(typeof vp=="undefined"){
var vp={};
}





vp.logger=function(){};






vp.logger.LOG_URL="/vp/ls/errorlogger.aspx";








vp.logger.logError=function $vpfn_uiE0CymOqTTB3IKzPfmmcA34$21(iNumber,sSource,sDesc,iSeverity){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


var oData={};


if(typeof iNumber=="number"){
oData.number=iNumber;
}


if(typeof sSource=="string"){
oData.source=sSource;
}


if(typeof sDesc=="string"){
oData.description=sDesc;
}


if(typeof iSeverity=="number"){
if(iSeverity<1||iSeverity>4){
throw new Error("vp.logger.logError(): Invalid severity: "+iSeverity);
}
oData.severity=iSeverity;
}


var sQueryString=vp.web.createQueryString(oData);


vp.http.imagePing(vp.logger.LOG_URL+"?"+sQueryString);
};

vp.logger.Severity={
Debug:1,
Information:2,
Warning:3,
Error:4
};





vp.logger.logMessage=function $vpfn_$p1MEb5JmXxjBYnN_0nNNg80$23(sMessage){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof sMessage!="string"||sMessage.length===0){
throw new Error("vp.logger.logMessage(): Invalid or empty string cannot be logged.");
}


var sQueryString=vp.web.createQueryString({"description":sMessage});


vp.http.imagePing(vp.logger.LOG_URL+"?"+sQueryString);
};







vp.logger.loadTrackingPixel=function $vpfn_NHcM6SqNoVypm87wqp2kUg99$30(sUrl,iPixelPartnerId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iStartMs=new Date().getTime();




var fnOnLoad=function $vpfn_oAVygemnQmLx4csbPZvu6Q106$19(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



var iElapsedMs=(new Date()).getTime()-iStartMs;

e=vp.events.getEvent(e);

var sLogUrl="/pixel-response-logger.aspx?ppid="+iPixelPartnerId+"&t="+iElapsedMs+"&sid="+window._vp_session_id||0;
if(e.type=="error")
{

sLogUrl+="&err=1";
}

vp.http.getAsync(
sLogUrl,
null,
function(){},
0);
};

vp.ui.loadImageAfterPageLoad(
sUrl,
fnOnLoad,
fnOnLoad);
};
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;


}






if(typeof vp=="undefined"){
var vp={};
}





vp.uilib=function(){};






vp.uilib.imagePopup=null;


vp.uilib.divPopup=null;






vp.uilib.shadow=null;





vp.uilib.createShadow=function $vpfn_nR51X3Isu4ZPd0jyIbhZZQ42$24(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!this.shadow){
this.shadow=document.createElement("div");
this.shadow.id="divUtilShadow";
this.shadow.style.position="absolute";
this.shadow.style.filter="alpha(opacity=65)";
this.shadow.style.MozOpacity=0.65;
this.shadow.style.backgroundColor="#000000";
document.body.appendChild(this.shadow);
vp.ui.hide(this.shadow);
}
};




vp.uilib.hideShadow=function $vpfn_xlNMHYZQHSww2tseVanvMA58$22(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.ui.hide(this.shadow);
};







vp.uilib.showShadow=function $vpfn_t78uSaJI499kDVqgzhH6Dw68$22(vElement,iOffsetX,iOffsetY){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


vElement=vp.core.getElement(vElement,"vp.uilib.showShadow");


this.createShadow();


if(typeof iOffsetX!="number"){
iOffsetX=2;
}
if(typeof iOffsetY!="number"){
iOffsetY=2;
}


if(this.shadow.parentNode!=vElement.parentNode){
vElement.parentNode.appendChild(this.shadow);
}


var iZIndex=vp.ui.getCurrentStyle(vElement,"zIndex");

if(iZIndex=="auto"||iZIndex===0){
iZIndex=2;
vElement.style.zIndex=2;
}else{

this.shadow.style.zIndex=iZIndex-1;
}

var oRect=vp.ui.getRect(vElement);
var iLeft=oRect.left;
var iTop=oRect.top;


vp.ui.resizeTo(this.shadow,vp.ui.getWidth(vElement),vp.ui.getHeight(vElement));


vp.ui.moveTo(this.shadow,iLeft+iOffsetX,iTop+iOffsetY);


vp.ui.show(this.shadow);
};




vp.uilib.hideImagePopup=function $vpfn_i1divuNs4CSNbSSyVryNwA117$26(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.ui.hide(vp.uilib.imagePopup);
vp.ui.hide(vp.uilib.shadow);
};




vp.uilib.hideDivPopup=function $vpfn_5gkNmaGTDV5eYgKZBe9iBw125$24(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.ui.hide(vp.uilib.divPopup);
vp.uilib.hideShadow();
};












vp.uilib.showImagePopup=function $vpfn_UkWdOmvaR1Hxq$CbFojy1g141$26(sImgSrc,iX,iY,iWidth,iHeight,sUrl){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(!this.imagePopup){


this.imagePopup=document.createElement("div");
vp.ui.setStyle(this.imagePopup,"position: absolute; background-color: white; border: 1px solid black; padding: 10px; text-align: center; z-index: 32767");
vp.ui.hide(this.imagePopup);


this.imagePopup.closeImage=document.createElement("img");
this.imagePopup.closeImage.src="/vp/images/nns/common/buttons/close_popup.gif";
this.imagePopup.closeImage.id="imgPopupClose";
vp.ui.setStyle(this.imagePopup.closeImage,"position: absolute; right: 3px; top: 3px");
vp.ui.addClass(this.imagePopup.closeImage,"cursor-pointer");
vp.events.add(this.imagePopup.closeImage,"click",vp.uilib.hideImagePopup);
this.imagePopup.appendChild(this.imagePopup.closeImage);


this.imagePopup.loadingImage=document.createElement("img");
this.imagePopup.loadingImage.id="imgPopupLoading";
this.imagePopup.loadingImage.src=vp.ui.imageUrl("/vp/images/nns/common/spinners/magenta_snake.gif");
this.imagePopup.appendChild(this.imagePopup.loadingImage);


this.imagePopup.mainImage=document.createElement("img");
this.imagePopup.mainImage.id="imgPopupMain";
vp.ui.collapse(this.imagePopup.mainImage);
this.imagePopup.appendChild(this.imagePopup.mainImage);





document.body.appendChild(this.imagePopup);

}


var oClockImage=this.imagePopup.loadingImage;
var oMainImage=this.imagePopup.mainImage;


vp.ui.expandAndCollapse(oClockImage,oMainImage);


oMainImage.onload=function $vpfn_7fb548EVgidgVBeDFms7MA187$24(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.ui.expandAndCollapse(this,oClockImage);
vp.uilib.imagePopup.style.width="auto";


if(vp.ui.isVisible(vp.uilib.imagePopup)){
vp.uilib.showShadow(vp.uilib.imagePopup,null,null);
}else{
vp.uilib.hideShadow();
}
};
oMainImage.src=sImgSrc;


if(typeof sUrl=="string"){
oMainImage.onclick=function $vpfn_3SkOZnMXTfsMr47Zpwvp$A202$29(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}top.location.href=sUrl;};
vp.ui.addClass(oMainImage,"cursor-pointer");
}else{
oMainImage.onclick=null;
vp.ui.removeClass(oMainImage,"cursor-pointer");
}


vp.ui.moveTo(this.imagePopup,iX,iY);


vp.ui.setWidth(this.imagePopup,iWidth+22);
if(typeof iHeight=="number"){
vp.ui.setHeight(this.imagePopup,iHeight+22);
}


vp.ui.show(this.imagePopup);


vp.uilib.showShadow(this.imagePopup,null,null);

};

vp.uilib.showDivPopup=function $vpfn_ycJcpWEBjLiAFeULl4Fs6w226$24(oDivPopup,iX,iY){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

vp.ui.moveTo(oDivPopup,iX,iY);
oDivPopup.style.visibility="visible";
vp.uilib.showShadow(oDivPopup,null,null);
};









vp.uilib.createDivPopup=function $vpfn_0nZQrJ1rPUvOkpT52$AlDQ241$26(vDiv){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oDiv=vp.core.getElement(vDiv,"showDivPopup");


if(!this.divPopup){

this.divPopup=document.createElement("div");
vp.ui.setStyle(this.divPopup,"position: absolute; background-color: white; border: 1px solid black; padding: 10px; text-align: center; z-index: 32767");
vp.ui.hide(this.divPopup);


this.divPopup.closeImage=document.createElement("img");
this.divPopup.closeImage.src="/vp/images/nns/common/buttons/close_popup.gif";
this.divPopup.closeImage.id="divPopupClose";
vp.ui.setStyle(this.divPopup.closeImage,"position: absolute; right: 3px; top: 3px");
vp.ui.addClass(this.divPopup.closeImage,"cursor-pointer");
vp.events.add(this.divPopup.closeImage,"click",vp.uilib.hideDivPopup);
this.divPopup.appendChild(this.divPopup.closeImage);


this.divPopup.mainDiv=document.createElement("div");
this.divPopup.appendChild(this.divPopup.mainDiv);


document.getElementById("divPage").appendChild(this.divPopup);
}

var oMainDiv=this.divPopup.mainDiv;

if(oMainDiv.hasChildNodes())
{
oMainDiv.replaceChild(oDiv,oMainDiv.firstChild);
}
else
{
oMainDiv.appendChild(oDiv);
}

oMainDiv.onload=function $vpfn_IWHmAEMHUbeYnRSBkUZqLw279$22(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(vp.ui.isVisible(vp.uilib.divPopup)){
vp.uilib.showShadow(vp.uilib.divPopup);
}else{
vp.uilib.hideShadow();
}
};


vp.ui.setWidth(oDiv,155);


this.divPopup.style.visibility="hidden";
vp.ui.show(this.divPopup);

return vp.uilib.divPopup;
};


if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}




if(typeof vp=="undefined"){
var vp={};
}





if(!vp.controls)
{
vp.controls={};
}

if(typeof vp.controls.TabStrip=="undefined")
{




vp.controls.TabStrip=function $vpfn_f8fnNhSG76nVaA6k5p6Lkg25$27(vElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;


var _aTabs=[];


this._selectedTabSkinData=null;


this._unselectedTabSkinData=null;


this._selectedTabStyle=null;


this._unselectedTabStyle=null;





this.element=vp.ui.get(vElement);





this.ontabchange=new vp.events.CustomEvent(this,"ontabchange");





this.onbeforetabchange=new vp.events.CustomEvent(this,"onbeforetabchange");





this.getTabs=function $vpfn_RPegRsqI1x3vPGV2m$ULAA66$23()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return _aTabs;
};





this.getSelectedTab=function $vpfn_y4wOWud4JUJpwVdaYrrNsQ75$30()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return _oSelectedTab;
};

this.setSelectedTab=function $vpfn_x3KEuJC9J_T9tT6zRQ6cvQ80$30(iIndex)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_aTabs.length<=iIndex)
{
throw new Error(me.element.id+" does not contain "+iIndex+" tabs");
}
_aTabs[iIndex].setSelected(true);
};

var _oSelectedTab=null;

var tabBeforeSelectHandler=function $vpfn_cmI$Z8KW4IXR1NR3cuD59Q91$37(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e.selectedTab=this;
e.previousTab=_oSelectedTab;

me.onbeforetabchange.fire(e);
};

var tabSelectHandler=function $vpfn_K0DHs5XDw_8_Qc4c93_CEg99$31(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oPreviousTab=_oSelectedTab;
var oNewTab=this;

e.selectedTab=this;
e.previousTab=_oSelectedTab;

oPreviousTab.setSelected(false);

_oSelectedTab=this;
storeSelectedIndexForPostback(_oSelectedTab.tabStripIndex);

me.ontabchange.fire(e);
};




var storeSelectedIndexForPostback=function $vpfn_xf8qYIdxEetMAPC1anBwEQ118$44(iValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}




var sId=me.element.getAttribute("selected-index-element-id");
if(!sId)
{
return;
}

var oElem=document.getElementById(sId);
if(oElem)
{
oElem.value=iValue;
}
};

var ensureConsistentTabHeights=function $vpfn_nAviWlAa4rGbmLdVgNHcEg137$41(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iMaxHeight=0;
var i;


for(i=0;i<_aTabs.length;i++)
{
iMaxHeight=Math.max(_aTabs[i].element.offsetHeight,iMaxHeight);
}


for(i=0;i<_aTabs.length;i++)
{
if(_aTabs[i].element.offsetHeight<iMaxHeight)
{
_aTabs[i].element.style.height=iMaxHeight+"px";
}
}
};

var init=function $vpfn_ku40lhdbFwQcrpz0xCijUQ158$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oTabElements=vp.ui.collectElementsByAttribute(me.element,"tab-item");

for(var oTabElement in oTabElements)
{
var oTab=new vp.controls.Tab(oTabElement,me);
_aTabs.push(oTab);
oTab.onbeforeselect.addHandler(tabBeforeSelectHandler);
oTab.onselect.addHandler(tabSelectHandler);

if(oTab.isSelected())
{
_oSelectedTab=oTab;
}
}

me._selectedTabSkinData=me.element.getAttribute("selected-tab-skin-data");
me._unselectedTabSkinData=me.element.getAttribute("unselected-tab-skin-data");

me._selectedTabStyle=new vp.web.CssString(me.element.getAttribute("selected-tab-style"));
me._unselectedTabStyle=new vp.web.CssString(me.element.getAttribute("unselected-tab-style"));
me._disabledTabStyle=new vp.web.CssString(me.element.getAttribute("disabled-tab-style"));

vp.events.addOnDOMLoadHandler(ensureConsistentTabHeights);
};

init();

vp.controls.TabStrip._tabStripDictionary[me.element.id]=this;
};





vp.controls.TabStrip._tabStripDictionary={};






vp.controls.TabStrip.get=function $vpfn_y6nkEpB2mViL8U8$aW$bbQ201$31(sElementId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.controls.TabStrip._tabStripDictionary[sElementId];
};

}

if(typeof vp.controls.Tab=="undefined")
{




vp.controls.Tab=function $vpfn_opR0wWim4owDMUDYO9GnFw214$22(vElement,oParentTabStrip)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;


var _selected=false;

var _disabled=false;



var _iFrameElementInitialized=false;





this.element=vp.ui.get(vElement);

vp.controls.Tab._tabInstances[this.element.getAttribute("tab-content-id")]=this;

this.onselect=new vp.events.CustomEvent(this,"onselect");

this.onbeforeselect=new vp.events.CustomEvent(this,"onbeforeselect");




this.tabStripIndex=null;




this.parentTabStrip=oParentTabStrip;

this.isDisabled=function $vpfn_H6QtV6_bNJTtC8fUlxms9Q249$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return _disabled;
};

this.setDisabled=function $vpfn_vsg7a6J6JMqzy8416uWeNg254$27(bValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


if(bValue==_disabled)
{
return;
}

_disabled=(bValue===undefined)?true:bValue;

me.element.setAttribute("tab-disabled",_disabled);

vp.ui.setStyle(
me.element,
_disabled?me.parentTabStrip._disabledTabStyle.items:me.parentTabStrip._unselectedTabStyle.items);

vp.controls.StylizedContainer.rerender(me.element);
};





this.isSelected=function $vpfn_OH$2dApnFTmH0O42p1XaLg278$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return _selected;
};





this.setSelected=function $vpfn_xiZEZ0vJxHfNLU7A7UrMyw287$27(bValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(bValue==_selected)
{
return;
}

var e={};

if(bValue)
{
me.onbeforeselect.fire(e);

if(e.cancelTabSelect)
{
return;
}
}

_selected=bValue;
me.element.setAttribute("selected",_selected);


if(!_iFrameElementInitialized)
{
var iFrameSrc=me.element.getAttribute("iframe-src");
if(iFrameSrc)
{
var iFrameElement=vp.ui.get(me.element.getAttribute("iframe-id"));
iFrameElement.src=iFrameSrc;
vp.ui.setStyleValue(iFrameElement,"display","block");
}

_iFrameElementInitialized=true;
}


var oStylizedContainer=getStylizedContainer();

if(!oStylizedContainer)
{
throw new Error("Unable to find stylized container for tab");
}





var oOldSkin=vp.http.parseJSON(oStylizedContainer.getAttribute("skin-data"));
var oNewSkin=vp.http.parseJSON(
_selected?
me.parentTabStrip._selectedTabSkinData:
me.parentTabStrip._unselectedTabSkinData);

oNewSkin.minWidth=oOldSkin.minWidth;


oStylizedContainer.setAttribute(
"skin-data",
vp.http.serializeJSON(oNewSkin));


vp.ui.setStyle(
me.element,
_selected?me.parentTabStrip._selectedTabStyle.items:me.parentTabStrip._unselectedTabStyle.items);


vp.controls.StylizedContainer.rerender(oStylizedContainer);

if(bValue)
{
me.onselect.fire(e);
}
};

var _content=null;



this.getContent=function $vpfn_tK4w8naNV_9BHv3EM3D94Q366$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!_content)
{
_content=vp.ui.get(this.element.getAttribute("tab-content-id"));
}
return _content;
};


var getStylizedContainer=function $vpfn_joc6InrNw3VWyobTWSs8FA376$35()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return me.element;
};

var init=function $vpfn_ku40lhdbFwQcrpz0xCijUQ381$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_selected=vp.core.getBoolean(me.element.getAttribute("selected"));
_disabled=vp.core.getBoolean(me.element.getAttribute("tab-disabled"));
me.tabStripIndex=parseInt(me.element.getAttribute("tab-index"));

vp.events.add(me.element,"click",function $vpfn_HCpM7PEeLAyhn7gwx$NLZQ387$47()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_disabled)
{
return;
}

if(!me.isSelected())
{
me.setSelected(true);
}
});
};

init();
};

vp.controls.Tab._tabInstances={};

vp.controls.Tab.get=function $vpfn_Tpc1nuto1YtzPnnQPnmu5w406$26(sElementId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return vp.controls.Tab._tabInstances[sElementId];
};









vp.controls.Tab._createHandler=function $vpfn_azFImH69bKA7J8m4PItvEg419$37(sTabID,sEventName,vHandler)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var fnHandler=vHandler;
if(typeof(vHandler)=="string")
{
fnHandler=new Function("e",vHandler);
}

var oTab=vp.controls.Tab.get(sTabID);
oTab[sEventName].addHandler(fnHandler);
};

vp.controls.Tab._validateTab=function $vpfn_rAJYktH_Zg2pj2UxmMD2rQ431$35(oTab)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!oTab||!(oTab instanceof vp.controls.Tab))
{
throw new Error("object of type vp.controls.Tab expected");
}
};

}

if(typeof vp.controls.TabContainer=="undefined")
{


vp.controls.TabContainer={};





vp.controls.TabContainer._changeTabContents=function $vpfn_9qrJuTvEpzMxsxv9bvtQuQ451$50(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oTab=e.selectedTab;

vp.controls.Tab._validateTab(oTab);

var aTabs=oTab.parentTabStrip.getTabs();

for(var i=0;i<aTabs.length;i++)
{
if(aTabs[i]==oTab)
{
aTabs[i].getContent().style.display="block";
}
else
{
aTabs[i].getContent().style.display="none";
}
}
};






vp.controls.TabContainer.get=function $vpfn_UYfibEp7OTQ7qbjj1KENNQ477$35(sTabContainerId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oTabContainer=document.getElementById(sTabContainerId);

if(!oTabContainer)
{
return null;
}



for(var i=0;i<oTabContainer.childNodes.length;i++)
{
var oNode=oTabContainer.childNodes[i];
if(oNode.nodeType==1&&oNode.tagName=="DIV")
{
var oTabStrip=vp.controls.TabStrip.get(oNode.id);
if(oTabStrip)
{
return oTabStrip;
}
}
}

return null;
};
}
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}




function hideElement(elementID)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
try
{
var element;
if(document.getElementById)
{
element=document.getElementById(elementID);
}
else if(document.all)
{
element=document.all[elementID];
}
element.style.display='none';
}
catch(e)
{

}
return false;
}hideElement._vpfn='$vpfn__GSjw1Tu2E9vwQ2Ov_pusA6$0';


function displayElementBlock(elementID)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
displayElementBlockSpecifyStyle(elementID,'block');
}displayElementBlock._vpfn='$vpfn_Hvj7Fzw6s3RR2HDlj$$i2g29$0';

function displayElementBlockSpecifyStyle(elementID,displayStyle)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
try
{
var element;
if(document.getElementById)
{
element=document.getElementById(elementID);
}
else if(document.all)
{
element=document.all[elementID];
}
element.style.display=displayStyle;
}
catch(e)
{

}
return false;


}displayElementBlockSpecifyStyle._vpfn='$vpfn_GDf3oqP5Cmo6K8$hw1Y40Q34$0';


function hideAndDisplayElementBlock(hideMeElementID,displayMeElementID)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
try
{
var hideMeElement;
var displayMeElement;
if(document.getElementById)
{
hideMeElement=document.getElementById(hideMeElementID);
displayMeElement=document.getElementById(displayMeElementID);
}
else if(document.all)
{
hideMeElement=document.all[hideMeElementID];
displayMeElement=document.all[displayMeElementID];
}
hideMeElement.style.display='none';
displayMeElement.style.display='block';
}
catch(e)
{

}
return false;
}hideAndDisplayElementBlock._vpfn='$vpfn_gbeUtMS0jHQuvyy6iJCj7Q59$0';

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}


var formHasBeenReported=false;

function f_clientWidth(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return f_filterResults(
window.innerWidth?window.innerWidth:0,
document.documentElement?document.documentElement.clientWidth:0,
document.body?document.body.clientWidth:0);
}f_clientWidth._vpfn='$vpfn_x6HQBaamtOVm6HU75OowVQ6$0';
function f_clientHeight(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return f_filterResults(
window.innerHeight?window.innerHeight:0,
document.documentElement?document.documentElement.clientHeight:0,
document.body?document.body.clientHeight:0);
}f_clientHeight._vpfn='$vpfn__SKIruz8E1U7UHPuva1KCw12$0';
function f_filterResults(n_win,n_docel,n_body){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var n_result=n_win?n_win:0;
if(n_docel&&(!n_result||(n_result>n_docel)))
{
n_result=n_docel;
}
return n_body&&(!n_result||(n_result>n_body))?n_body:n_result;
}f_filterResults._vpfn='$vpfn_YD$_OINWItqSPCXivBBTsA18$0';



function formInteraction(formName){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
try{
if(!formHasBeenReported){
var ran_number=Math.round(Math.random()*10000);
var fc=new Image;
fc.src='/vp/vissci.aspx?Log=1&form='+formName+'&cliWid='+f_clientWidth()+'&cliHei='+f_clientHeight()+
'&rand='+ran_number;
formHasBeenReported=true;
}
}catch(ex){

}
return true;
}formInteraction._vpfn='$vpfn_gVcWi71durNBP8Sv7rLP9Q29$0';

function VS_logEvent(eventName,eventValue){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var ran_number=Math.round(Math.random()*10000);
var fc=new Image;
fc.src='/vp/vissci.aspx?Log=1&'+eventName+'='+eventValue+'&rand='+ran_number;
}VS_logEvent._vpfn='$vpfn_lrLYbQSg8TZssJqm$EEUXg44$0';

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}
function ToggleFooterMenu(menuName)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var ele=document.getElementById(menuName);
var displayVal=ele.style.display;
if(displayVal=="none")
{
ele.style.display="block";
}
else
{
ele.style.display="none";
}
}ToggleFooterMenu._vpfn='$vpfn_MNmiK3jvKGbMM4pJ5bbucA2$0';




function toggleCountrySubLink(sId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var selectedElem=vp.ui.get(sId);

var countryElems=vp.ui.getBySelector("div.country-sub-item");

for(i=0;i<countryElems.length;i++)
{

if(!vp.ui.isCollapsed(countryElems[i])&&countryElems[i]!=selectedElem)
{
vp.ui.collapse(countryElems[i]);
}
}

vp.ui.toggleDisplay(selectedElem,true);

return false;
}toggleCountrySubLink._vpfn='$vpfn_m9aYFRZwrj6n3jUiaxYI$Q19$0';
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}
if(typeof vp=="undefined"){
var vp={};
}





vp.hoverpop=function(){};





vp.hoverpop.show=function $vpfn_MOmg3ToQFVcwpnfwHqmEdA16$19(popUpId,centerOnPage)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.hoverpop.showSpecified(popUpId,centerOnPage,true);
};

vp.hoverpop.showSpecified=function $vpfn_qGEsKfYePtKnVZA1yFcRZA21$28(popUpId,centerOnPage,appendPopElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

var oMask=vp.ui.get(".page-mask");
if(oMask)
{









var htmlHeight=(document.documentElement&&document.documentElement.scrollHeight)?document.documentElement.scrollHeight:0;
var bodyHeight=Math.max(document.body.scrollHeight,document.body.offsetHeight);
var height=Math.max(htmlHeight,bodyHeight);


vp.ui.setHeight(oMask,height);


vp.ui.show(oMask);
}

var oLayer=document.getElementById(popUpId);
if(oLayer){
if(appendPopElement)
{
document.body.appendChild(oLayer);
}
vp.ui.show(oLayer);
oLayer.style.display='block';
}


var divPageOuter=vp.ui.get(".page-outer-container");
var cSelects=divPageOuter?divPageOuter.getElementsByTagName("select"):document.getElementsByTagName("select");
for(var i=0;i<cSelects.length;i++){
vp.ui.hide(cSelects[i]);
}



if(!appendPopElement)
{
vp.ui.moveTo(popUpId,0,0);
}
else if(centerOnPage)
{
vp.ui.centerElement(popUpId);
}
};


vp.hoverpop.hide=function $vpfn_Z6zAWDLArC3_0RyguwBRDw77$19(popUpId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.hoverpop.hideSpecified(popUpId,true);
};






vp.hoverpop.hideSpecified=function $vpfn_Le2VK$WO_Cqad3hl0$Ix3g87$28(popUpId,appendPopElement){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


var oLayer=document.getElementById(popUpId);
if(oLayer){
vp.ui.hide(oLayer);
if(appendPopElement)
{
document.body.appendChild(oLayer);
}
oLayer=document.getElementById(popUpId);
vp.ui.hide(oLayer);
}



var iFrame=vp.ui.get('iFramePopUp');
if(iFrame)
{
iFrame.style.display='none';
}


var oMask=vp.ui.get(".page-mask");


if(oMask){
vp.ui.hide(oMask);
}


var divPageOuter=vp.ui.get(".page-outer-container");
var cSelects=divPageOuter?divPageOuter.getElementsByTagName("select"):document.getElementsByTagName("select");
for(var i=0;i<cSelects.length;i++){
vp.ui.show(cSelects[i]);
}
};

vp.livepreviewpop=function(){};

vp.livepreviewpop.loadImage=function $vpfn_SAzApDagSsCfqxxrPKLQ_g127$30(url,width,imageId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oImage=document.getElementById(imageId);
var oUrl=new vp.web.URL(url);
oUrl.setItem('width',width);
oImage.width=width;
oImage.src=oUrl.toString();
};

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}function OnloadFlash(msg,altMsg,langId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(langId==-1)
{
langId=null;
}

if(SetBoxSize(msg,altMsg,langId))
{
window.setInterval(function $vpfn_t4lSWjsPHRczCBxFpIP6Cw10$27(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}ZoomText(msg,altMsg,langId);},3000);
}
}OnloadFlash._vpfn='$vpfn_zr$Db28H9uXHLVm$LjkFvg1$0';

function SetBoxSize(msg,altMsg,langId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var unboxed=false;
var i=GetNumberOfTokensInAString(msg,"<br");
var j=GetNumberOfTokensInAString(msg,"<li>");
var k=GetNumberOfTokensInAString(altMsg,"<br");
var l=GetNumberOfTokensInAString(altMsg,"<li>");

var id="tblBoxedMsg";
if(langId)
{
id=id+'_'+langId;
}

var box=document.getElementById(id);
if(!box)
{
box=document.getElementById("tblUnBoxedMsg");
unboxed=true;
}

if(box===null)
{
return true;
}
if(i===0&&j===0&k===0&l===0)
{
var a=parseInt(msg.toString().length/70);
var b=parseInt(altMsg.toString().length/70);
if(a===0&&b===0)
{
if(!unboxed)
{
box.className="oneLine";
}
else
{
box.className="oneLineU";
}
}
else if((a==1&&b<2)||(b==1&&a<2))
{
if(!unboxed)
{
box.className="twoLines";
}
else
{
box.className="twoLinesU";
}
}
else if((a==2&&b<3)||(b==2&&a<3))
{
if(!unboxed)
{
box.className="threeLines";
}
else
{
box.className="threeLinesU";
}
}
else if(a>2||b>2)
{
if(!unboxed)
{
box.className="moreThanThreeLines";
}
else
{
box.className="moreThanThreeLinesU";
}
}
return true;
}
else if(i<=2&&j<=2&&k<=2&&l<=2)
{
if(!unboxed)
{
box.className="breakSmall";
}
else
{
box.className="breakSmallU";
}
return true;
}
else if((i>2||j>2||k>2||l>2)&&i<5&&j<5&&k<5&&l<5)
{
if(!unboxed)
{
box.className="breakMedium";
}
else
{
box.className="breakMediumU";
}

return true;
}

else if((i>=5||j>=5||k>=5||l>=5)&&i<10&&j<10&&k<10&&l<10)
{
if(!unboxed)
{
box.className="breakLarge";
}
else
{
box.className="breakLargeU";
}
return true;
}

else if(i>=10||j>=10||k>=10||l>=10)
{
alert("Please limit your dynamic text to less than 10 lines");
return false;
}
}SetBoxSize._vpfn='$vpfn_JBegr0kkPvlYpPyJCAZlJw14$0';

function GetNumberOfTokensInAString(inStr,token)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var ss;
ss=inStr.toString().split(token);
var i=ss.length-1;
return i;
}GetNumberOfTokensInAString._vpfn='$vpfn_j5E0lRxcBal6Fu0PTI9KSw135$0';

function ZoomText(defaultText,altText,langId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var clsName;

var id="tdBlink";
if(langId)
{
id=id+'_'+langId;
}

var msg=document.getElementById(id);
if(msg)
{
clsName=msg.className;
if(clsName=="blinkMsgSmall")
{
msg.className="blinkMsgLarge";
msg.innerHTML=altText;
}
else
{
msg.className="blinkMsgSmall";
msg.innerHTML=defaultText;
}
}
var unbmsg=document.getElementById("unboxedMsg");
if(unbmsg)
{
clsName=unbmsg.className;
if(clsName=="blackSmallHome")
{
unbmsg.className="redLargeHome";
unbmsg.innerHTML=altText;
}
else
{
unbmsg.className="blackSmallHome";
unbmsg.innerHTML=defaultText;
}
}
}ZoomText._vpfn='$vpfn_0hy_tGhAWdSQ6GVj1N5BLg143$0';

function showStudio(pfid)
{

}
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}


if(!vp.emailSignup)
{
vp.emailSignup={};
}

vp.emailSignup.navEmailPopup=function $vpfn_1p9N43sVCTnrr91t7Dso7Q9$31(url,inputId,popupMode,msourceUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
window.open(url+'&signupsourceurl='+msourceUrl+'%2Fdefault%2Easpx&email='+document.getElementById(inputId).value+'&pop='+popupMode,'pcsignup','toolbar=no,status=no,menubar=no,scrollbars=no,width=500,height=700,resizable=no');
return false;
};

vp.emailSignup.focusHandler=function $vpfn_qxYCTJyf0kvlLG$icIFKdA15$30(id)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var el=document.getElementById(id);

if(el.value.toLowerCase()==el.getAttribute("default-text").toLowerCase())
{
el.value="";
}
};

vp.emailSignup.blurHandler=function $vpfn__P0Xp$sZpNpT6ohfSKuIgw25$29(id)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var el=document.getElementById(id);

if(!el.value)
{
el.value=el.getAttribute("default-text");
}
};

vp.emailSignup.navEmailOnEnterPress=function $vpfn_P_4SVkw3BwazDfzPrQlGqA35$38(e,url,inputId,popupMode,msourceUrl)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var keynum;
if(window.event)
{
keynum=e.keyCode;
}
else if(e.which)
{
keynum=e.which;
}
if(keynum==13)
{
vp.emailSignup.navEmailPopup(url,inputId,popupMode,msourceUrl);
return false;
}
return true;
};

vp.emailSignup.emailOptInPop=function $vpfn_xnIOVpcrcZJJf_1Doe8o8g54$31()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if((document.getElementById('aem')&&document.getElementById('aem').value.length>0)||(document.getElementById('email')&&document.getElementById('email').value.length>0))
{
var email;

if(document.getElementById('aem')&&document.getElementById('aem').value.length>0)
{
email=document.getElementById('aem').value;
}

if(document.getElementById('email')&&document.getElementById('email').value.length>0)
{
email=document.getElementById('email').value;
}

vp.dialog.IFrameDialog.open(
"optin",
"",
"/vp/ns/mini_sign_in.aspx?dialog=1&noguest=1&returnURL=/exclusive-offer-opt-in.aspx?op=1&aem="+email,
vp.dialog.chrome.Primary,
450,
360);
}

return false;
};
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}








vp.define("vp.controls");




if(vp.events&&vp.browser.isSafari&&vp.browser.OS.isMac)
{
vp.events.add(window,"unload",function(){});
}

vp.controls.DropDownMenu=function(){};

vp.controls.DropDownMenu.setPosition=function $vpfn_kaNE_VM2mXLbkyAhpW9Y9w24$39(element,direction,alignment)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!direction)
{
direction=$(element).attr("direction");
}

if(direction=="down")
{
if(!alignment)
{
alignment="left";
}

$(".dropdownWrapper",element).css("left","");
if(alignment==="right")
{
$(".dropdownWrapper",element).css({"right":"0px","left":"auto"});
}
$(".dropdownWrapper",element).css("top",$(element).innerHeight()+"px");
$(".dropdownWrapper",element).css("z-index","100");


if($(element).parents().hasClass("nav-main-menu-bar-left"))
{
var menuOffsetLeft=$(element).offset().left;
var navbarOffsetLeft=$(".nav-main-menu-bar-left").offset().left;
$(".dropdownWrapper",element).css("left","-"+(menuOffsetLeft-navbarOffsetLeft)+"px");
}
}
else
{
if(!alignment)
{
alignment="top";
}


var menuHeight=$(".dropdownWrapper",element).height();
var menuOffsetTop=$(element).offset().top;

var topOfPage=$(window).scrollTop();
var bottomOfPage=topOfPage+$(window).height()-5;

var menuBottom=menuOffsetTop+menuHeight;

var newTopOffset=0;
if(menuBottom>bottomOfPage)
{
newTopOffset=((menuBottom-bottomOfPage)+5);

if(newTopOffset>menuOffsetTop-topOfPage)
{
newTopOffset=menuOffsetTop-topOfPage;
}

newTopOffset=newTopOffset*-1;
}

$(".dropdownWrapper",element).css("top",newTopOffset+"px");
$(".dropdownWrapper",element).css("left",$(element).innerWidth()+"px");
$(".dropdownWrapper",element).css("z-index","100");
}

this.delay=200;
};

vp.controls.DropDownMenu.showRight=function $vpfn_zxSMSkrjcaJaPeHdFv3NJA91$37(element,useHover)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

this.setPosition(element,"right","top");
element.onmouseover=null;
element.onmouseout=null;

if(!useHover)
{
$(element).mouseenter(function $vpfn_H912sIEHxbrkilX$bLEsHQ101$30(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}me.show(element);});
$(element).mouseleave(function $vpfn_H912sIEHxbrkilX$bLEsHQ102$30(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}me.hide(element);});
}
else
{
$(element).onmouseover=null;
$(element).onmouseout=null;
$(element).hoverIntent(
{
over:me.show,
timeout:me.delay,
out:me.hide
});
}

this.show(element);
};

vp.controls.DropDownMenu.showDown=function $vpfn_9XRjtUTwjV_zHCmU$OV$0g119$36(element,useHover,alignment)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

if(!alignment)
{
alignment="left";
}

this.setPosition(element,"down",alignment);
element.onmouseover=null;
element.onmouseout=null;

if(!useHover)
{
$(element).mouseenter(function $vpfn_H912sIEHxbrkilX$bLEsHQ134$30(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}me.show(element);});
$(element).mouseleave(function $vpfn_H912sIEHxbrkilX$bLEsHQ135$30(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}me.hide(element);});
}
else
{
$(element).onmouseover=null;
$(element).onmouseout=null;
$(element).hoverIntent(
{
over:me.show,
timeout:me.delay,
out:me.hide
});
}
this.show(element);
};

vp.controls.DropDownMenu.hide=function $vpfn_rdAukjD6tCps017TeWjUKQ151$32(element)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var dropdown=$(".dropdownWrapper",element);

if(dropdown.length===0)
{
dropdown=$(".dropdownWrapper",this);
element=this;
}


if(dropdown.css("display")==="none")
{
return;
}

var link=$($("a",element)[0]);
if(link.attr("active"))
{
link.removeClass(link.attr("active"));
}

if($(element).parents("#tdMarqueeAndNav").length>0)
{
$("#tdMarqueeAndNav").css("zIndex","");
}

dropdown.hide();
};

vp.controls.DropDownMenu.showClick=function $vpfn_f9BO4UDLZtfd9Kqnyb0aSg181$37(element,direction)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if($(".dropdownWrapper",element).css("display")=="none")
{
this.show(element);

var hideClick=function $vpfn_nbhDkRYe1T540FvH1lNZyQ187$24(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(e.target!=element&&!vp.ui.isChildOf(e.target,element))
{
vp.controls.DropDownMenu.hide(element);
$(document).unbind("mouseup",hideClick);
}
};

$(document).bind("mouseup",hideClick);
}
else
{
this.hide(element);
}
};

vp.controls.DropDownMenu.show=function $vpfn_RkBeegNgpMSWfJizwse0Xw204$32(element){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

$(".dropdownWrapper:visible").each(function $vpfn_H912sIEHxbrkilX$bLEsHQ206$39(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}vp.controls.DropDownMenu.hide($(this).parent(".dropdown-menu")[0]);});

var dropdown=$(".dropdownWrapper",element);
if(dropdown.length===0){
dropdown=$(".dropdownWrapper",this);
element=this;
}

if($(dropdown[0]).css("zIndex")!="100"){
vp.controls.DropDownMenu.setPosition(element);
}

element.hoverIntent_s=1;

var link=$("a",element).first();
if(link.attr("active")!==null){
link.addClass(link.attr("active"));
}


if($(element).parents().hasClass("nav-main-menu-bar-left")){
var maxHeight=$(window).height()
-($(element).offset().top+$(element).height())
-$(window).scrollTop()
-parseInt($(element).find(".dropdownWrapper").css("paddingTop"))
-parseInt($(element).find(".dropdownWrapper").css("paddingBottom"))
-parseInt($(element).find(".dropdownWrapperInner").css("paddingTop"))
-parseInt($(element).find(".dropdownWrapperInner").css("paddingBottom"))
-10;

var wrapperHeight=$(element).find(".dropdownWrapper").height();

if(wrapperHeight>maxHeight){
$(element).find(".dropdownWrapperInner").css('height',maxHeight);
}

if(vp.controls.DropDownMenu.EnableLogging){

if(!vp.controls.DropDownMenu.Tracked){
vp.controls.DropDownMenu.Tracked=$();
}

if(!vp.controls.DropDownMenu.Tracked.is(dropdown)){

dropdown.find('a').each(function $vpfn_H912sIEHxbrkilX$bLEsHQ250$40(index,element){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var prefix=$(element).attr("data-version-id")+"|"+$(element).attr("data-control-id");
vp.analytics.Logger.enableHoverTrackingOnElements(1,prefix,$(element));
vp.analytics.Logger.enableClickTracking(1,prefix,$(element));
});

vp.controls.DropDownMenu.Tracked.add(dropdown);
}


}

}

dropdown.show();

if($(element).parents("#tdMarqueeAndNav").length>0){
$("#tdMarqueeAndNav").css("zIndex",10001);
}
};

vp.controls.DropDownMenu.initializeColumns=function $vpfn_FXZGjpt4J_XKJY4MXNzH4Q271$45(headElementId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var columns=$('#'+headElementId+' .nav-flyout-new-column,#'+headElementId+' .nav-flyout-new-column-large');
var container=columns.first().parents('.expanded-level-two-outer-mega');

if(container)
{
var containerContent=columns.first().parents(".stylized-container-content");
container.css('width',190*columns.size()+parseInt(containerContent.css("padding-left"))+parseInt(containerContent.css("padding-right")+'px')+2);

var createColumn=function $vpfn_9FXDrnDlosUtAFv0GKU$$g281$21()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var firstElement=$(this);
var columnElements=firstElement.nextUntil('.nav-flyout-new-column, .nav-flyout-new-column-large, .shop-products-footer');

firstElement.wrap('<div class="nav-flyout-column" />');

columnElements.insertAfter(firstElement);
};

columns.each(createColumn);

var shadowSize=(new vp.web.URL(document.location)).getItem('add_shadow');
if(shadowSize){
container.html(container.html()+"<div class='flyout-shadow' style='width:100%;height:100%;top:"+shadowSize+"px;left:"+shadowSize+"px;z-index:-1'></div>");
}
}
};


/*!
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
* 
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* hoverIntent is currently available for use in all personal or commercial 
* projects under both MIT and GPL licenses. This means that you can choose 
* the license that best suits your project, and use it accordingly.
* 
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
* 
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
* sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
* interval: 100,   // number = milliseconds of polling interval
* over: showNav,  // function = onMouseOver callback (required)
* timeout: 0,   // number = milliseconds delay before onMouseOut function call
* out: hideNav    // function = onMouseOut callback (required)
* });
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/

(function($){
$.fn.hoverIntent=function(f,g){

var cfg={
sensitivity:7,
interval:100,
timeout:0
};

cfg=$.extend(cfg,g?{over:f,out:g}:f);




var cX,cY,pX,pY;


var track=function(ev){
cX=ev.pageX;
cY=ev.pageY;
};


var compare=function(ev,ob){
ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);

if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){
$(ob).unbind("mousemove",track);

ob.hoverIntent_s=1;
return cfg.over.apply(ob,[ev]);
}else{

pX=cX;pY=cY;

ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);
}
};


var delay=function(ev,ob){
ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);
ob.hoverIntent_s=0;
return cfg.out.apply(ob,[ev]);
};


var handleHover=function(e){

var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;
while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}
if(p==this){return false;}


var ev=jQuery.extend({},e);
var ob=this;


if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}


if(e.type=="mouseover"){

pX=ev.pageX;pY=ev.pageY;

$(ob).bind("mousemove",track);

if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}


}else{

$(ob).unbind("mousemove",track);

if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}
}
};


return this.mouseover(handleHover).mouseout(handleHover);
};
})(jQuery);
if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}
if(typeof(vp)=="undefined")
{
var vp={};
}

if(!vp.search)
{
vp.search={};
}

vp.search={};





vp.search.menus={};




vp.search.typeAheadCache={};




vp.search.searchUrlBase="/search/";


vp.search.searchSite=function $vpfn_fczpl6IWxdvnhtak4yEB3A31$23(searchBoxId,bIsTypeAhead)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oSiteSearchBox=document.getElementById(searchBoxId);

if(oSiteSearchBox&&oSiteSearchBox.value!=="")
{
var searchKeywords=vp.search.cleanUpSearchKeywords(oSiteSearchBox.value);

var qs=new vp.web.QueryString();


if(bIsTypeAhead)
{
qs.setItem("ta","1");
}


if(vp.search.pageTrackingType&&vp.search.pageTrackingType>0)
{
qs.setItem("rt",vp.search.pageTrackingType);
}


if(vp.search.preserveQueryParams)
{
vp.search.preserveQueryParams(qs);
}

var sQuery=qs.toString();
if(sQuery.length>0)
{
sQuery="?"+sQuery;
}

var sLocation=vp.search.searchUrlBase+searchKeywords+".aspx"+sQuery;

window.location=sLocation;
}
return false;
};


vp.search.cleanUpSearchKeywords=function $vpfn_0O_O9Mv$Ruy5S4sCXfusqg73$34(searchKeywords)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


searchKeywords=searchKeywords.replace(/\s+/g," ");

var re=new RegExp("[/&!\\?@#\\$%\\^\\*\\(\\){}\[\\]\+=,\\.`~\\\\\\|/:;'\\\"\\<\\>\\s]+","g");
searchKeywords=searchKeywords.replace(re," ");


searchKeywords=searchKeywords.replace(/(^\s*)|(\s*$)/gi,"");


searchKeywords=searchKeywords.replace(/ /gi,"-");


searchKeywords=searchKeywords.replace(/-+/gi,"-");

return searchKeywords;
};


vp.search.processSearchBoxKeyDown=function $vpfn_QUSyzB6Vx00x9TNri$QoIQ95$36(e,searchBoxId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);

if(e.keyCode==13)
{
vp.search.searchSite(searchBoxId);
vp.events.cancel(e);
}
};






vp.search.initTypeAhead=function $vpfn_1SPRcjpPwBdVkCChF_AmsA111$26(sTextFieldId,fnOnMenuItemSelect)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var oMenu=new vp.widget.AutoSuggestMenu(sTextFieldId);



vp.search.menus[sTextFieldId]=oMenu;


var fnPopulate=function $vpfn_SlIwW9f61reH0ezoUiehlA120$21(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.search.populateMenu(e,sTextFieldId);
};
oMenu.ondelaychange.addHandler(fnPopulate);


var fnSelect=function $vpfn_AOD_YArEuDx80iuYeeu_GQ127$19(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
document.getElementById(sTextFieldId).value=e.elementText;
fnOnMenuItemSelect(sTextFieldId,true);
};
oMenu.onselectsuggestion.addHandler(fnSelect);

oMenu.prefillTextBoxOnKeyActions=true;
oMenu.dropDownDelay=200;
oMenu.maxHeight=212;



oMenu.menuWidth=vp.ui.getRect(document.getElementById(sTextFieldId)).width;


oMenu.itemStyle={
textAlign:"left",
fontSize:"12px",
fontWeight:"bold"
};


oMenu.prefixStyle={
fontWeight:"normal"
};
};






vp.search.populateMenu=function $vpfn_KwQ9dRiJ8GH4c2USYONV0Q160$25(e,sTextFieldId)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(window.location.protocol.startsWith("https"))
{

return;
}



var sSearchTerm=e.value;


if(sSearchTerm==='')
{
return;
}

var oMenu=vp.search.menus[sTextFieldId];


if(vp.search.typeAheadCache[sSearchTerm])
{
oMenu.setData(vp.search.typeAheadCache[sSearchTerm],sSearchTerm);
return;
}

var fnSuccessHandler=function $vpfn_lHCQHr88RwLaXRMfsC5$fA187$27(oSuggestions)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.search.typeAheadCache[sSearchTerm]=oSuggestions;
oMenu.setData(oSuggestions,sSearchTerm);
};


try
{

$.ajaxAsmx({
url:'/Sales/SiteSearch/TypeAheadWebService.asmx',
methodName:'KeywordSuggestionList',
success:fnSuccessHandler,
error:function(){},
data:{sequenceOfCharacters:sSearchTerm}
});
}
catch(ex){}
};

if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}


if(typeof(vp)=="undefined")
{
var vp={};
}


if(!vp.widget)
{
vp.widget={};
}






vp.widget.AutoSuggestMenu=function $vpfn_b24DxlAOVwErxVPdHMCJGQ20$28(vTextField)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

var KEYCODE_UP=38;
var KEYCODE_DOWN=40;
var KEYCODE_ENTER=13;
var KEYCODE_ESCAPE=27;

var _oHighlightedItem;
var _oMenu;
var _bIsMenuVisible=false;
var _bMenuDirty=true;
var _iTimer;






this.maxHeight=0;






this.menuWidth=0;




this.itemStyle=null;




this.prefixStyle=null;

this.itemMouseOverStyle=null;




this.prefillTextBoxOnKeyActions=true;




this.dropDownDelay=350;





this.onchange=new vp.events.CustomEvent(this,"onchange");







this.ondelaychange=new vp.events.CustomEvent(this,"ondelaychange");











this.onselectsuggestion=new vp.events.CustomEvent(this,"onselectsuggestion");





this.textField=vp.core.getElement(vTextField,"vp.widget.AutoSuggestMenu");







this.setData=function $vpfn_zdvVK9epiEkjCmo827GGnA109$19(aData,sPrefix)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
initMenu();

_oMenu.innerHTML="";
_oHighlightedItem=null;
var iRealHeight=0;

for(var i=0;i<aData.length;i++)
{
var oItem=document.createElement("DIV");

oItem.style.height="17px";
oItem.style.width="500px";
oItem.style.overflow="hidden";
oItem.style.textAlign="left";
oItem.style.padding="2px";
oItem.style.paddingLeft="5px";
oItem.style.fontSize="12px";
oItem.style.fontFamily="Arial";
oItem.style.zIndex=100001;

vp.ui.setStyleValue(oItem,"cursor","pointer");

applyStyles(me.itemStyle,oItem);



if(vp.ui.isQuirksMode())
{
if(iRealHeight===0)
{
iRealHeight=parseInt(oItem.style.height);
var iPaddingBottom=parseInt(vp.ui.getCurrentStyle(oItem,"paddingBottom"));
var iPaddingTop=parseInt(vp.ui.getCurrentStyle(oItem,"paddingTop"));
iRealHeight+=iPaddingBottom+iPaddingTop;
}

oItem.style.height=iRealHeight+"px";
}

oItem.isAutosuggestItem=true;

if(typeof(aData[i])=="string")
{
applyFormattedText(aData[i],sPrefix,oItem);
}
else
{
oItem.appendChild(aData[i]);
}

vp.events.add(oItem,"mouseover",onItemMouseOver);
vp.events.add(oItem,"mousedown",onItemMouseDown);

_oMenu.appendChild(oItem);
}

vp.ui.makeUnselectable(_oMenu);

menuHasSuggestions()?showMenu():hideMenu();

_bMenuDirty=false;
};







var applyFormattedText=function $vpfn_NBA$PlayYbaJROi56l4myw180$29(sText,sPrefix,oItem)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var iStartIndex=sText.indexOf(sPrefix);
if(sPrefix&&me.prefixStyle&&iStartIndex>=0)
{
var oPrefix=document.createElement("SPAN");
applyStyles(me.prefixStyle,oPrefix);
oPrefix.innerHTML=sPrefix;


if(iStartIndex>0)
{
var oBeforePrefix=document.createElement("SPAN");
var sBeforePrefix=sText.substring(0,iStartIndex);
oBeforePrefix.innerHTML=sBeforePrefix;
oItem.appendChild(oBeforePrefix);
if(sPrefix.indexOf(" ")===0)
{
oItem.appendChild(document.createTextNode(" "));
}
}


oItem.appendChild(oPrefix);


if(iStartIndex+sPrefix.length<sText.length)
{
var oAfterPrefix=document.createElement("SPAN");
var sAfterPrefix=sText.substring(iStartIndex+sPrefix.length,sText.length);
oAfterPrefix.innerHTML=sAfterPrefix;

if(sAfterPrefix.indexOf(" ")===0)
{
oItem.appendChild(document.createTextNode(" "));
}
oItem.appendChild(oAfterPrefix);
}
}
else
{
oItem.innerHTML=sText;
}
};

var applyStyles=function $vpfn_oYqP806yu_9BRLPXkK__dg225$22(oStyles,oDomItem)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oStyles)
{
for(var sProp in oStyles)
{
oDomItem.style[sProp]=oStyles[sProp];
}
}
};




this.hide=function $vpfn_vrSjsDT_af0eJJGo2xOARQ239$16()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
hideMenu();
};

var onItemMouseOver=function $vpfn_Uy5CBejN4Lj8FBY7cMZ3iA244$26(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);
highlightItem(getItemFromTarget(e.target),false);
};

var onItemMouseDown=function $vpfn_kOCyaUosEJB37peoZ7YN9Q250$26(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);

selectItem(getItemFromTarget(e.target));
hideMenu();
};

var getItemFromTarget=function $vpfn_xvBBtHertYNd2hI4G928IA258$28(oTarget)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
while(!oTarget.isAutosuggestItem)
{
oTarget=oTarget.parentNode;
}
return oTarget;
};

var _oItemOriginalStyle=null;

var highlightItem=function $vpfn_mo0PcNXyebfc_LcpynqC9Q269$24(oItem,bPrefill)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
removeHighlight();
var sProp;

if(me.itemMouseOverStyle)
{
if(!_oItemOriginalStyle)
{
_oItemOriginalStyle={};

for(sProp in me.itemMouseOverStyle)
{
_oItemOriginalStyle[sProp]=vp.ui.getCurrentStyle(oItem,sProp);
}
}

for(sProp in me.itemMouseOverStyle)
{
oItem.style[sProp]=me.itemMouseOverStyle[sProp];
}
}
else
{
oItem.className="auto-suggest-menu-item-selected";
}

_oHighlightedItem=oItem;
if(bPrefill)
{
setTextFieldValue(vp.web.getInnerText(oItem));
}
};

var removeHighlight=function $vpfn_7pwS9akdrbi6yp9uUrkEJw303$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_oHighlightedItem)
{
if(_oItemOriginalStyle)
{
for(var sProp in _oItemOriginalStyle)
{
_oHighlightedItem.style[sProp]=_oItemOriginalStyle[sProp];
}
}
else
{
_oHighlightedItem.className="auto-suggest-menu-item";
}

_oHighlightedItem=null;
}
};




var selectItem=function $vpfn_J9zxU$MB9mo37_0mo2Lf0g326$21(oItem)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var e={};
if(oItem.firstChild.nodeType==1)
{
e.element=oItem;
}

e.elementText=vp.web.getInnerText(oItem);

me.onselectsuggestion.fire(e);

if(typeof(e.returnValue)!="undefined")
{
setTextFieldValue(e.returnValue);
}
else
{
setTextFieldValue(vp.web.getInnerText(oItem));
}
};

var setTextFieldValue=function $vpfn_1EOrm4yxcleZTeWXSHIW$A348$28(sValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(isITextArea(me.textField))
{
me.textField.setValue(sValue);
}
else
{
me.textField.value=sValue;
}
};

var getTextFieldValue=function $vpfn_7AGuJUdE1wdRIQSWIs0qNg360$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(isITextArea(me.textField))
{
return me.textField.getValue();
}
else
{
return me.textField.value;
}
};

var initMenu=function $vpfn_HvcwlzUneeH8ryYzAm1XdQ372$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!_oMenu)
{
_oMenu=document.createElement("DIV");
if(me.textField&&me.textField.id)
{
_oMenu.id=me.textField.id+"-suggest-menu";
}
_oMenu.style.position="absolute";
_oMenu.style.width=((me.menuWidth>0)?me.menuWidth:getElementRect().width)+"px";
_oMenu.style.overflowX="hidden";
_oMenu.style.zIndex=200013;
_oMenu.style.display="none";

_oMenu.style.border="1px black solid";
_oMenu.style.backgroundColor="white";

vp.events.add(_oMenu,"mousedown",onMenuMouseDown);

document.body.appendChild(_oMenu);
}
};

var onMenuMouseDown=function $vpfn_AxR0yh5$rBpDtVdO5S2AGg396$26(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



vp.events.cancelBubble(e);
};

var menuHasSuggestions=function $vpfn_CMKBRUgVfAWhD9OncVbuyw404$29()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
initMenu();

return _oMenu.childNodes.length!==0&&
getTextFieldValue().trim()!=="";
};

var getElementRect=function $vpfn_zQlVirQqScx3eqeasKSJaw412$25()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(isITextArea(me.textField))
{
return me.textField.getBoundingRect();
}
else
{
return vp.ui.getRect(me.textField);
}
};




this.position=function $vpfn_YNa4aXKPsuHmBoPQU$oX6w427$20()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(!_oMenu||!_oMenu.style)
{
return;
}
var oRect=getElementRect();
_oMenu.style.left=oRect.left+"px";
_oMenu.style.top=oRect.bottom+"px";
};

var showMenu=function $vpfn__ff8U4EovENumpvSGU1PsQ438$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
initMenu();
if(!menuHasSuggestions())
{
return;
}

me.position();

_oMenu.style.width=((me.menuWidth>0)?me.menuWidth:getElementRect().width)+"px";
_oMenu.style.height="auto";

if(me.maxHeight&&_oMenu.offsetHeight>me.maxHeight)
{
_oMenu.style.height=me.maxHeight+"px";
_oMenu.style.overflowY="scroll";
}
else
{
_oMenu.style.overflowY="hidden";
}

_oMenu.style.display="block";

vp.ui.showIE6IFrame(_oMenu,true);

vp.events.add(vp.ui.getRootElement(),"mousedown",onDocumentClickHandler);

_bIsMenuVisible=true;
};

var hideMenu=function $vpfn_YRtCdOmpUzR3spYZ5h5zMA470$19()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
initMenu();
vp.ui.showIE6IFrame(_oMenu,false);

_oMenu.style.display="none";
removeHighlight();

vp.events.remove(vp.ui.getRootElement(),"mousedown",onDocumentClickHandler);

_bIsMenuVisible=false;
};

var onKeyUpHandler=function $vpfn_F661Hk8JP_xbGjpFbTbIxg483$25(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);

if(!vp.events.isVisibleKeyCode(e.keyCode))
{
return;
}

if(_iTimer)
{
clearTimeout(_iTimer);
}

if(e.keyCode!=KEYCODE_ENTER)
{
_iTimer=setTimeout(fireDelayChange,me.dropDownDelay);
}

if(!menuHasSuggestions())
{
hideMenu();
}

me.onchange.fire({value:getTextFieldValue()});
_bMenuDirty=true;
};

var fireDelayChange=function $vpfn_s3Q$cS_JQmdZ41ksQOxdRA511$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.ondelaychange.fire({value:getTextFieldValue()});
};

var onKeyDownHandler=function $vpfn_HsF0IO2g1IR4_iXLLWGjRQ516$27(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
e=vp.events.getEvent(e);

if(e.cancelBubble)
{
hideMenu();

return;
}

if(e.keyCode==KEYCODE_DOWN||e.keyCode==KEYCODE_UP)
{
if(!_bIsMenuVisible)
{
if(_bMenuDirty)
{
fireDelayChange();
return;
}
else
{
if(!menuHasSuggestions())
{
return;
}

showMenu();
}
}

var oNextItem;

if(_oHighlightedItem)
{
oNextItem=e.keyCode==KEYCODE_DOWN?
_oHighlightedItem.nextSibling:
_oHighlightedItem.previousSibling;
}

if(!oNextItem)
{
oNextItem=e.keyCode==KEYCODE_DOWN?
_oMenu.firstChild:
_oMenu.lastChild;
}

highlightItem(oNextItem,me.prefillTextBoxOnKeyActions);
scrollToHighlightedItem();
}
else if(e.keyCode==KEYCODE_ENTER)
{
if(_oHighlightedItem)
{
selectItem(_oHighlightedItem);
hideMenu();
vp.events.cancelEvent(e);
vp.events.cancelBubble(e);
}
}
else if(e.keyCode==KEYCODE_ESCAPE)
{
hideMenu();
}
};

var scrollToHighlightedItem=function $vpfn_44HJNG8DtXlqpODmeuCF6A582$34()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(_oMenu.style.overflowY=="scroll")
{
var oItemRect=vp.ui.getRect(_oHighlightedItem);
var oMenuRect=vp.ui.getRect(_oMenu);

var iDiff=oItemRect.bottom-oMenuRect.bottom;
if(iDiff>0)
{
_oMenu.scrollTop+=iDiff;
}

var iDiff2=oMenuRect.top-oItemRect.top;
if(iDiff2>0)
{
_oMenu.scrollTop-=iDiff2;
}
}
};

var onDocumentClickHandler=function $vpfn_GPfrzrm4I1_qWOm$qwrPow604$33(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
OnTextFieldBlurHandler(e);
};

var OnTextFieldBlurHandler=function $vpfn_J_klpfCwmbl8Mz86PA8_dA609$33(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_iTimer)
{
clearTimeout(_iTimer);
}

hideMenu();
};

var isITextArea=function $vpfn_lYoAOJkw1GdjlbsieqnFSQ619$22(oTextField)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(oTextField.pasteInto)
{
return true;
}
return false;
};

var init=function $vpfn_nLlV9lomTRWMY4jwOkiUKQ628$15()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(isITextArea(me.textField))
{
me.textField.onkeyup.addHandler(onKeyUpHandler);
me.textField.onkeydown.addHandler(onKeyDownHandler);
me.textField.onblur.addHandler(OnTextFieldBlurHandler);
}
else
{
vp.events.add(me.textField,"keyup",onKeyUpHandler);
vp.events.add(me.textField,"keydown",onKeyDownHandler);
vp.events.add(me.textField,"blur",OnTextFieldBlurHandler);
}

if(isITextArea(me.textField))
{
me.textField.turnOffBrowserAutoComplete();
}
else
{
me.textField.setAttribute("autocomplete","off");
}
};

init();
};




vp.widget.LookupList=function $vpfn_oRMk0gn_2xlxSviRrt4w5Q659$23(aData)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var _iMaxLength=0;
var fnLowerCaseAndGetMax=function $vpfn_w8hqVpmAGb$MamhPjzcSfg662$31(sStr)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(sStr.length>_iMaxLength)
{
_iMaxLength=sStr.length;
}
return sStr.toLowerCase();
};

var _aData=aData||[];
var _aCasedData=_aData.map(fnLowerCaseAndGetMax);

this.findBeginsWith=function $vpfn_9wwvww4oOLbNE$m043jcxw674$26(sText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(sText.length>_iMaxLength)
{
return[];
}

var sLowerCasedText=sText.toLowerCase();
var iIndex=_aCasedData.binarySearch(sLowerCasedText,beginsWith);

if(iIndex==-1)
{
return[];
}

var iHighest=iIndex;
while(iHighest<_aCasedData.length-1&&
beginsWith(sLowerCasedText,_aCasedData[iHighest+1])===0)
{
iHighest++;
}

var iLowest=iIndex;
while(iLowest>0&&
beginsWith(sLowerCasedText,_aCasedData[iLowest-1])===0)
{
iLowest--;
}

var aRet=[];
for(var i=iLowest;i<=iHighest;i++)
{
aRet.push(_aData[i]);
}

return aRet;
};

var beginsWith=function $vpfn_sLtewJr1_eE5USNgTeqnfA712$21(sFindStr,sText)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(sText.toLowerCase().indexOf(sFindStr)===0)
{
return 0;
}
else
{
return sText>sFindStr?-1:1;
}
};
};

