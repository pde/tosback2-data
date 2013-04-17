/*
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
(function(window,undefined){var document=window.document,navigator=window.navigator,location=window.location;
var jQuery=(function(){var jQuery=function(selector,context){return new jQuery.fn.init(selector,context,rootjQuery)
},_jQuery=window.jQuery,_$=window.$,rootjQuery,quickExpr=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,rnotwhite=/\S/,trimLeft=/^\s+/,trimRight=/\s+$/,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,rvalidchars=/^[\],:{}\s]*$/,rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,rwebkit=/(webkit)[ \/]([\w.]+)/,ropera=/(opera)(?:.*version)?[ \/]([\w.]+)/,rmsie=/(msie) ([\w.]+)/,rmozilla=/(mozilla)(?:.*? rv:([\w.]+))?/,rdashAlpha=/-([a-z]|[0-9])/ig,rmsPrefix=/^-ms-/,fcamelCase=function(all,letter){return(letter+"").toUpperCase()
},userAgent=navigator.userAgent,browserMatch,readyList,DOMContentLoaded,toString=Object.prototype.toString,hasOwn=Object.prototype.hasOwnProperty,push=Array.prototype.push,slice=Array.prototype.slice,trim=String.prototype.trim,indexOf=Array.prototype.indexOf,class2type={};
jQuery.fn=jQuery.prototype={constructor:jQuery,init:function(selector,context,rootjQuery){var match,elem,ret,doc;
if(!selector){return this
}if(selector.nodeType){this.context=this[0]=selector;
this.length=1;
return this
}if(selector==="body"&&!context&&document.body){this.context=document;
this[0]=document.body;
this.selector=selector;
this.length=1;
return this
}if(typeof selector==="string"){if(selector.charAt(0)==="<"&&selector.charAt(selector.length-1)===">"&&selector.length>=3){match=[null,selector,null]
}else{match=quickExpr.exec(selector)
}if(match&&(match[1]||!context)){if(match[1]){context=context instanceof jQuery?context[0]:context;
doc=(context?context.ownerDocument||context:document);
ret=rsingleTag.exec(selector);
if(ret){if(jQuery.isPlainObject(context)){selector=[document.createElement(ret[1])];
jQuery.fn.attr.call(selector,context,true)
}else{selector=[doc.createElement(ret[1])]
}}else{ret=jQuery.buildFragment([match[1]],[doc]);
selector=(ret.cacheable?jQuery.clone(ret.fragment):ret.fragment).childNodes
}return jQuery.merge(this,selector)
}else{elem=document.getElementById(match[2]);
if(elem&&elem.parentNode){if(elem.id!==match[2]){return rootjQuery.find(selector)
}this.length=1;
this[0]=elem
}this.context=document;
this.selector=selector;
return this
}}else{if(!context||context.jquery){return(context||rootjQuery).find(selector)
}else{return this.constructor(context).find(selector)
}}}else{if(jQuery.isFunction(selector)){return rootjQuery.ready(selector)
}}if(selector.selector!==undefined){this.selector=selector.selector;
this.context=selector.context
}return jQuery.makeArray(selector,this)
},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length
},toArray:function(){return slice.call(this,0)
},get:function(num){return num==null?this.toArray():(num<0?this[this.length+num]:this[num])
},pushStack:function(elems,name,selector){var ret=this.constructor();
if(jQuery.isArray(elems)){push.apply(ret,elems)
}else{jQuery.merge(ret,elems)
}ret.prevObject=this;
ret.context=this.context;
if(name==="find"){ret.selector=this.selector+(this.selector?" ":"")+selector
}else{if(name){ret.selector=this.selector+"."+name+"("+selector+")"
}}return ret
},each:function(callback,args){return jQuery.each(this,callback,args)
},ready:function(fn){jQuery.bindReady();
readyList.add(fn);
return this
},eq:function(i){i=+i;
return i===-1?this.slice(i):this.slice(i,i+1)
},first:function(){return this.eq(0)
},last:function(){return this.eq(-1)
},slice:function(){return this.pushStack(slice.apply(this,arguments),"slice",slice.call(arguments).join(","))
},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)
}))
},end:function(){return this.prevObject||this.constructor(null)
},push:push,sort:[].sort,splice:[].splice};
jQuery.fn.init.prototype=jQuery.fn;
jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;
if(typeof target==="boolean"){deep=target;
target=arguments[1]||{};
i=2
}if(typeof target!=="object"&&!jQuery.isFunction(target)){target={}
}if(length===i){target=this;
--i
}for(;
i<length;
i++){if((options=arguments[i])!=null){for(name in options){src=target[name];
copy=options[name];
if(target===copy){continue
}if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;
clone=src&&jQuery.isArray(src)?src:[]
}else{clone=src&&jQuery.isPlainObject(src)?src:{}
}target[name]=jQuery.extend(deep,clone,copy)
}else{if(copy!==undefined){target[name]=copy
}}}}}return target
};
jQuery.extend({noConflict:function(deep){if(window.$===jQuery){window.$=_$
}if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery
}return jQuery
},isReady:false,readyWait:1,holdReady:function(hold){if(hold){jQuery.readyWait++
}else{jQuery.ready(true)
}},ready:function(wait){if((wait===true&&!--jQuery.readyWait)||(wait!==true&&!jQuery.isReady)){if(!document.body){return setTimeout(jQuery.ready,1)
}jQuery.isReady=true;
if(wait!==true&&--jQuery.readyWait>0){return 
}readyList.fireWith(document,[jQuery]);
if(jQuery.fn.trigger){jQuery(document).trigger("ready").off("ready")
}}},bindReady:function(){if(readyList){return 
}readyList=jQuery.Callbacks("once memory");
if(document.readyState==="complete"){return setTimeout(jQuery.ready,1)
}if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);
window.addEventListener("load",jQuery.ready,false)
}else{if(document.attachEvent){document.attachEvent("onreadystatechange",DOMContentLoaded);
window.attachEvent("onload",jQuery.ready);
var toplevel=false;
try{toplevel=window.frameElement==null
}catch(e){}if(document.documentElement.doScroll&&toplevel){doScrollCheck()
}}}},isFunction:function(obj){return jQuery.type(obj)==="function"
},isArray:Array.isArray||function(obj){return jQuery.type(obj)==="array"
},isWindow:function(obj){return obj!=null&&obj==obj.window
},isNumeric:function(obj){return !isNaN(parseFloat(obj))&&isFinite(obj)
},type:function(obj){return obj==null?String(obj):class2type[toString.call(obj)]||"object"
},isPlainObject:function(obj){if(!obj||jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false
}try{if(obj.constructor&&!hasOwn.call(obj,"constructor")&&!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false
}}catch(e){return false
}var key;
for(key in obj){}return key===undefined||hasOwn.call(obj,key)
},isEmptyObject:function(obj){for(var name in obj){return false
}return true
},error:function(msg){throw new Error(msg)
},parseJSON:function(data){if(typeof data!=="string"||!data){return null
}data=jQuery.trim(data);
if(window.JSON&&window.JSON.parse){return window.JSON.parse(data)
}if(rvalidchars.test(data.replace(rvalidescape,"@").replace(rvalidtokens,"]").replace(rvalidbraces,""))){return(new Function("return "+data))()
}jQuery.error("Invalid JSON: "+data)
},parseXML:function(data){if(typeof data!=="string"||!data){return null
}var xml,tmp;
try{if(window.DOMParser){tmp=new DOMParser();
xml=tmp.parseFromString(data,"text/xml")
}else{xml=new ActiveXObject("Microsoft.XMLDOM");
xml.async="false";
xml.loadXML(data)
}}catch(e){xml=undefined
}if(!xml||!xml.documentElement||xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: "+data)
}return xml
},noop:function(){},globalEval:function(data){if(data&&rnotwhite.test(data)){(window.execScript||function(data){window["eval"].call(window,data)
})(data)
}},camelCase:function(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase)
},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()===name.toUpperCase()
},each:function(object,callback,args){var name,i=0,length=object.length,isObj=length===undefined||jQuery.isFunction(object);
if(args){if(isObj){for(name in object){if(callback.apply(object[name],args)===false){break
}}}else{for(;
i<length;
){if(callback.apply(object[i++],args)===false){break
}}}}else{if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break
}}}else{for(;
i<length;
){if(callback.call(object[i],i,object[i++])===false){break
}}}}return object
},trim:trim?function(text){return text==null?"":trim.call(text)
}:function(text){return text==null?"":text.toString().replace(trimLeft,"").replace(trimRight,"")
},makeArray:function(array,results){var ret=results||[];
if(array!=null){var type=jQuery.type(array);
if(array.length==null||type==="string"||type==="function"||type==="regexp"||jQuery.isWindow(array)){push.call(ret,array)
}else{jQuery.merge(ret,array)
}}return ret
},inArray:function(elem,array,i){var len;
if(array){if(indexOf){return indexOf.call(array,elem,i)
}len=array.length;
i=i?i<0?Math.max(0,len+i):i:0;
for(;
i<len;
i++){if(i in array&&array[i]===elem){return i
}}}return -1
},merge:function(first,second){var i=first.length,j=0;
if(typeof second.length==="number"){for(var l=second.length;
j<l;
j++){first[i++]=second[j]
}}else{while(second[j]!==undefined){first[i++]=second[j++]
}}first.length=i;
return first
},grep:function(elems,callback,inv){var ret=[],retVal;
inv=!!inv;
for(var i=0,length=elems.length;
i<length;
i++){retVal=!!callback(elems[i],i);
if(inv!==retVal){ret.push(elems[i])
}}return ret
},map:function(elems,callback,arg){var value,key,ret=[],i=0,length=elems.length,isArray=elems instanceof jQuery||length!==undefined&&typeof length==="number"&&((length>0&&elems[0]&&elems[length-1])||length===0||jQuery.isArray(elems));
if(isArray){for(;
i<length;
i++){value=callback(elems[i],i,arg);
if(value!=null){ret[ret.length]=value
}}}else{for(key in elems){value=callback(elems[key],key,arg);
if(value!=null){ret[ret.length]=value
}}}return ret.concat.apply([],ret)
},guid:1,proxy:function(fn,context){if(typeof context==="string"){var tmp=fn[context];
context=fn;
fn=tmp
}if(!jQuery.isFunction(fn)){return undefined
}var args=slice.call(arguments,2),proxy=function(){return fn.apply(context,args.concat(slice.call(arguments)))
};
proxy.guid=fn.guid=fn.guid||proxy.guid||jQuery.guid++;
return proxy
},access:function(elems,fn,key,value,chainable,emptyGet,pass){var exec,bulk=key==null,i=0,length=elems.length;
if(key&&typeof key==="object"){for(i in key){jQuery.access(elems,fn,i,key[i],1,emptyGet,value)
}chainable=1
}else{if(value!==undefined){exec=pass===undefined&&jQuery.isFunction(value);
if(bulk){if(exec){exec=fn;
fn=function(elem,key,value){return exec.call(jQuery(elem),value)
}
}else{fn.call(elems,value);
fn=null
}}if(fn){for(;
i<length;
i++){fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass)
}}chainable=1
}}return chainable?elems:bulk?fn.call(elems):length?fn(elems[0],key):emptyGet
},now:function(){return(new Date()).getTime()
},uaMatch:function(ua){ua=ua.toLowerCase();
var match=rwebkit.exec(ua)||ropera.exec(ua)||rmsie.exec(ua)||ua.indexOf("compatible")<0&&rmozilla.exec(ua)||[];
return{browser:match[1]||"",version:match[2]||"0"}
},sub:function(){function jQuerySub(selector,context){return new jQuerySub.fn.init(selector,context)
}jQuery.extend(true,jQuerySub,this);
jQuerySub.superclass=this;
jQuerySub.fn=jQuerySub.prototype=this();
jQuerySub.fn.constructor=jQuerySub;
jQuerySub.sub=this.sub;
jQuerySub.fn.init=function init(selector,context){if(context&&context instanceof jQuery&&!(context instanceof jQuerySub)){context=jQuerySub(context)
}return jQuery.fn.init.call(this,selector,context,rootjQuerySub)
};
jQuerySub.fn.init.prototype=jQuerySub.fn;
var rootjQuerySub=jQuerySub(document);
return jQuerySub
},browser:{}});
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase()
});
browserMatch=jQuery.uaMatch(userAgent);
if(browserMatch.browser){jQuery.browser[browserMatch.browser]=true;
jQuery.browser.version=browserMatch.version
}if(jQuery.browser.webkit){jQuery.browser.safari=true
}if(rnotwhite.test("\xA0")){trimLeft=/^[\s\xA0]+/;
trimRight=/[\s\xA0]+$/
}rootjQuery=jQuery(document);
if(document.addEventListener){DOMContentLoaded=function(){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);
jQuery.ready()
}
}else{if(document.attachEvent){DOMContentLoaded=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);
jQuery.ready()
}}
}}function doScrollCheck(){if(jQuery.isReady){return 
}try{document.documentElement.doScroll("left")
}catch(e){setTimeout(doScrollCheck,1);
return 
}jQuery.ready()
}return jQuery
})();
var flagsCache={};
function createFlags(flags){var object=flagsCache[flags]={},i,length;
flags=flags.split(/\s+/);
for(i=0,length=flags.length;
i<length;
i++){object[flags[i]]=true
}return object
}jQuery.Callbacks=function(flags){flags=flags?(flagsCache[flags]||createFlags(flags)):{};
var list=[],stack=[],memory,fired,firing,firingStart,firingLength,firingIndex,add=function(args){var i,length,elem,type,actual;
for(i=0,length=args.length;
i<length;
i++){elem=args[i];
type=jQuery.type(elem);
if(type==="array"){add(elem)
}else{if(type==="function"){if(!flags.unique||!self.has(elem)){list.push(elem)
}}}}},fire=function(context,args){args=args||[];
memory=!flags.memory||[context,args];
fired=true;
firing=true;
firingIndex=firingStart||0;
firingStart=0;
firingLength=list.length;
for(;
list&&firingIndex<firingLength;
firingIndex++){if(list[firingIndex].apply(context,args)===false&&flags.stopOnFalse){memory=true;
break
}}firing=false;
if(list){if(!flags.once){if(stack&&stack.length){memory=stack.shift();
self.fireWith(memory[0],memory[1])
}}else{if(memory===true){self.disable()
}else{list=[]
}}}},self={add:function(){if(list){var length=list.length;
add(arguments);
if(firing){firingLength=list.length
}else{if(memory&&memory!==true){firingStart=length;
fire(memory[0],memory[1])
}}}return this
},remove:function(){if(list){var args=arguments,argIndex=0,argLength=args.length;
for(;
argIndex<argLength;
argIndex++){for(var i=0;
i<list.length;
i++){if(args[argIndex]===list[i]){if(firing){if(i<=firingLength){firingLength--;
if(i<=firingIndex){firingIndex--
}}}list.splice(i--,1);
if(flags.unique){break
}}}}}return this
},has:function(fn){if(list){var i=0,length=list.length;
for(;
i<length;
i++){if(fn===list[i]){return true
}}}return false
},empty:function(){list=[];
return this
},disable:function(){list=stack=memory=undefined;
return this
},disabled:function(){return !list
},lock:function(){stack=undefined;
if(!memory||memory===true){self.disable()
}return this
},locked:function(){return !stack
},fireWith:function(context,args){if(stack){if(firing){if(!flags.once){stack.push([context,args])
}}else{if(!(flags.once&&memory)){fire(context,args)
}}}return this
},fire:function(){self.fireWith(this,arguments);
return this
},fired:function(){return !!fired
}};
return self
};
var sliceDeferred=[].slice;
jQuery.extend({Deferred:function(func){var doneList=jQuery.Callbacks("once memory"),failList=jQuery.Callbacks("once memory"),progressList=jQuery.Callbacks("memory"),state="pending",lists={resolve:doneList,reject:failList,notify:progressList},promise={done:doneList.add,fail:failList.add,progress:progressList.add,state:function(){return state
},isResolved:doneList.fired,isRejected:failList.fired,then:function(doneCallbacks,failCallbacks,progressCallbacks){deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
return this
},always:function(){deferred.done.apply(deferred,arguments).fail.apply(deferred,arguments);
return this
},pipe:function(fnDone,fnFail,fnProgress){return jQuery.Deferred(function(newDefer){jQuery.each({done:[fnDone,"resolve"],fail:[fnFail,"reject"],progress:[fnProgress,"notify"]},function(handler,data){var fn=data[0],action=data[1],returned;
if(jQuery.isFunction(fn)){deferred[handler](function(){returned=fn.apply(this,arguments);
if(returned&&jQuery.isFunction(returned.promise)){returned.promise().then(newDefer.resolve,newDefer.reject,newDefer.notify)
}else{newDefer[action+"With"](this===deferred?newDefer:this,[returned])
}})
}else{deferred[handler](newDefer[action])
}})
}).promise()
},promise:function(obj){if(obj==null){obj=promise
}else{for(var key in promise){obj[key]=promise[key]
}}return obj
}},deferred=promise.promise({}),key;
for(key in lists){deferred[key]=lists[key].fire;
deferred[key+"With"]=lists[key].fireWith
}deferred.done(function(){state="resolved"
},failList.disable,progressList.lock).fail(function(){state="rejected"
},doneList.disable,progressList.lock);
if(func){func.call(deferred,deferred)
}return deferred
},when:function(firstParam){var args=sliceDeferred.call(arguments,0),i=0,length=args.length,pValues=new Array(length),count=length,pCount=length,deferred=length<=1&&firstParam&&jQuery.isFunction(firstParam.promise)?firstParam:jQuery.Deferred(),promise=deferred.promise();
function resolveFunc(i){return function(value){args[i]=arguments.length>1?sliceDeferred.call(arguments,0):value;
if(!(--count)){deferred.resolveWith(deferred,args)
}}
}function progressFunc(i){return function(value){pValues[i]=arguments.length>1?sliceDeferred.call(arguments,0):value;
deferred.notifyWith(promise,pValues)
}
}if(length>1){for(;
i<length;
i++){if(args[i]&&args[i].promise&&jQuery.isFunction(args[i].promise)){args[i].promise().then(resolveFunc(i),deferred.reject,progressFunc(i))
}else{--count
}}if(!count){deferred.resolveWith(deferred,args)
}}else{if(deferred!==firstParam){deferred.resolveWith(deferred,length?[firstParam]:[])
}}return promise
}});
jQuery.support=(function(){var support,all,a,select,opt,input,fragment,tds,events,eventName,i,isSupported,div=document.createElement("div"),documentElement=document.documentElement;
div.setAttribute("className","t");
div.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
all=div.getElementsByTagName("*");
a=div.getElementsByTagName("a")[0];
if(!all||!all.length||!a){return{}
}select=document.createElement("select");
opt=select.appendChild(document.createElement("option"));
input=div.getElementsByTagName("input")[0];
support={leadingWhitespace:(div.firstChild.nodeType===3),tbody:!div.getElementsByTagName("tbody").length,htmlSerialize:!!div.getElementsByTagName("link").length,style:/top/.test(a.getAttribute("style")),hrefNormalized:(a.getAttribute("href")==="/a"),opacity:/^0.55/.test(a.style.opacity),cssFloat:!!a.style.cssFloat,checkOn:(input.value==="on"),optSelected:opt.selected,getSetAttribute:div.className!=="t",enctype:!!document.createElement("form").enctype,html5Clone:document.createElement("nav").cloneNode(true).outerHTML!=="<:nav></:nav>",submitBubbles:true,changeBubbles:true,focusinBubbles:false,deleteExpando:true,noCloneEvent:true,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableMarginRight:true,pixelMargin:true};
jQuery.boxModel=support.boxModel=(document.compatMode==="CSS1Compat");
input.checked=true;
support.noCloneChecked=input.cloneNode(true).checked;
select.disabled=true;
support.optDisabled=!opt.disabled;
try{delete div.test
}catch(e){support.deleteExpando=false
}if(!div.addEventListener&&div.attachEvent&&div.fireEvent){div.attachEvent("onclick",function(){support.noCloneEvent=false
});
div.cloneNode(true).fireEvent("onclick")
}input=document.createElement("input");
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
if(div.attachEvent){for(i in {submit:1,change:1,focusin:1}){eventName="on"+i;
isSupported=(eventName in div);
if(!isSupported){div.setAttribute(eventName,"return;");
isSupported=(typeof div[eventName]==="function")
}support[i+"Bubbles"]=isSupported
}}fragment.removeChild(div);
fragment=select=opt=div=input=null;
jQuery(function(){var container,outer,inner,table,td,offsetSupport,marginDiv,conMarginTop,style,html,positionTopLeftWidthHeight,paddingMarginBorderVisibility,paddingMarginBorder,body=document.getElementsByTagName("body")[0];
if(!body){return 
}conMarginTop=1;
paddingMarginBorder="padding:0;margin:0;border:";
positionTopLeftWidthHeight="position:absolute;top:0;left:0;width:1px;height:1px;";
paddingMarginBorderVisibility=paddingMarginBorder+"0;visibility:hidden;";
style="style='"+positionTopLeftWidthHeight+paddingMarginBorder+"5px solid #000;";
html="<div "+style+"display:block;'><div style='"+paddingMarginBorder+"0;display:block;overflow:hidden;'></div></div><table "+style+"' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
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
if(window.getComputedStyle){div.innerHTML="";
marginDiv=document.createElement("div");
marginDiv.style.width="0";
marginDiv.style.marginRight="0";
div.style.width="2px";
div.appendChild(marginDiv);
support.reliableMarginRight=(parseInt((window.getComputedStyle(marginDiv,null)||{marginRight:0}).marginRight,10)||0)===0
}if(typeof div.style.zoom!=="undefined"){div.innerHTML="";
div.style.width=div.style.padding="1px";
div.style.border=0;
div.style.overflow="hidden";
div.style.display="inline";
div.style.zoom=1;
support.inlineBlockNeedsLayout=(div.offsetWidth===3);
div.style.display="block";
div.style.overflow="visible";
div.innerHTML="<div style='width:5px;'></div>";
support.shrinkWrapBlocks=(div.offsetWidth!==3)
}div.style.cssText=positionTopLeftWidthHeight+paddingMarginBorderVisibility;
div.innerHTML=html;
outer=div.firstChild;
inner=outer.firstChild;
td=outer.nextSibling.firstChild.firstChild;
offsetSupport={doesNotAddBorder:(inner.offsetTop!==5),doesAddBorderForTableAndCells:(td.offsetTop===5)};
inner.style.position="fixed";
inner.style.top="20px";
offsetSupport.fixedPosition=(inner.offsetTop===20||inner.offsetTop===15);
inner.style.position=inner.style.top="";
outer.style.overflow="hidden";
outer.style.position="relative";
offsetSupport.subtractsBorderForOverflowNotVisible=(inner.offsetTop===-5);
offsetSupport.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==conMarginTop);
if(window.getComputedStyle){div.style.marginTop="1%";
support.pixelMargin=(window.getComputedStyle(div,null)||{marginTop:0}).marginTop!=="1%"
}if(typeof container.style.zoom!=="undefined"){container.style.zoom=1
}body.removeChild(container);
marginDiv=div=container=null;
jQuery.extend(support,offsetSupport)
});
return support
})();
var rbrace=/^(?:\{.*\}|\[.*\])$/,rmultiDash=/([A-Z])/g;
jQuery.extend({cache:{},uuid:0,expando:"jQuery"+(jQuery.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:true},hasData:function(elem){elem=elem.nodeType?jQuery.cache[elem[jQuery.expando]]:elem[jQuery.expando];
return !!elem&&!isEmptyDataObject(elem)
},data:function(elem,name,data,pvt){if(!jQuery.acceptData(elem)){return 
}var privateCache,thisCache,ret,internalKey=jQuery.expando,getByName=typeof name==="string",isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[internalKey]:elem[internalKey]&&internalKey,isEvents=name==="events";
if((!id||!cache[id]||(!isEvents&&!pvt&&!cache[id].data))&&getByName&&data===undefined){return 
}if(!id){if(isNode){elem[internalKey]=id=++jQuery.uuid
}else{id=internalKey
}}if(!cache[id]){cache[id]={};
if(!isNode){cache[id].toJSON=jQuery.noop
}}if(typeof name==="object"||typeof name==="function"){if(pvt){cache[id]=jQuery.extend(cache[id],name)
}else{cache[id].data=jQuery.extend(cache[id].data,name)
}}privateCache=thisCache=cache[id];
if(!pvt){if(!thisCache.data){thisCache.data={}
}thisCache=thisCache.data
}if(data!==undefined){thisCache[jQuery.camelCase(name)]=data
}if(isEvents&&!thisCache[name]){return privateCache.events
}if(getByName){ret=thisCache[name];
if(ret==null){ret=thisCache[jQuery.camelCase(name)]
}}else{ret=thisCache
}return ret
},removeData:function(elem,name,pvt){if(!jQuery.acceptData(elem)){return 
}var thisCache,i,l,internalKey=jQuery.expando,isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[internalKey]:internalKey;
if(!cache[id]){return 
}if(name){thisCache=pvt?cache[id]:cache[id].data;
if(thisCache){if(!jQuery.isArray(name)){if(name in thisCache){name=[name]
}else{name=jQuery.camelCase(name);
if(name in thisCache){name=[name]
}else{name=name.split(" ")
}}}for(i=0,l=name.length;
i<l;
i++){delete thisCache[name[i]]
}if(!(pvt?isEmptyDataObject:jQuery.isEmptyObject)(thisCache)){return 
}}}if(!pvt){delete cache[id].data;
if(!isEmptyDataObject(cache[id])){return 
}}if(jQuery.support.deleteExpando||!cache.setInterval){delete cache[id]
}else{cache[id]=null
}if(isNode){if(jQuery.support.deleteExpando){delete elem[internalKey]
}else{if(elem.removeAttribute){elem.removeAttribute(internalKey)
}else{elem[internalKey]=null
}}}},_data:function(elem,name,data){return jQuery.data(elem,name,data,true)
},acceptData:function(elem){if(elem.nodeName){var match=jQuery.noData[elem.nodeName.toLowerCase()];
if(match){return !(match===true||elem.getAttribute("classid")!==match)
}}return true
}});
jQuery.fn.extend({data:function(key,value){var parts,part,attr,name,l,elem=this[0],i=0,data=null;
if(key===undefined){if(this.length){data=jQuery.data(elem);
if(elem.nodeType===1&&!jQuery._data(elem,"parsedAttrs")){attr=elem.attributes;
for(l=attr.length;
i<l;
i++){name=attr[i].name;
if(name.indexOf("data-")===0){name=jQuery.camelCase(name.substring(5));
dataAttr(elem,name,data[name])
}}jQuery._data(elem,"parsedAttrs",true)
}}return data
}if(typeof key==="object"){return this.each(function(){jQuery.data(this,key)
})
}parts=key.split(".",2);
parts[1]=parts[1]?"."+parts[1]:"";
part=parts[1]+"!";
return jQuery.access(this,function(value){if(value===undefined){data=this.triggerHandler("getData"+part,[parts[0]]);
if(data===undefined&&elem){data=jQuery.data(elem,key);
data=dataAttr(elem,key,data)
}return data===undefined&&parts[1]?this.data(parts[0]):data
}parts[1]=value;
this.each(function(){var self=jQuery(this);
self.triggerHandler("setData"+part,parts);
jQuery.data(this,key,value);
self.triggerHandler("changeData"+part,parts)
})
},null,value,arguments.length>1,null,false)
},removeData:function(key){return this.each(function(){jQuery.removeData(this,key)
})
}});
function dataAttr(elem,key,data){if(data===undefined&&elem.nodeType===1){var name="data-"+key.replace(rmultiDash,"-$1").toLowerCase();
data=elem.getAttribute(name);
if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null:jQuery.isNumeric(data)?+data:rbrace.test(data)?jQuery.parseJSON(data):data
}catch(e){}jQuery.data(elem,key,data)
}else{data=undefined
}}return data
}function isEmptyDataObject(obj){for(var name in obj){if(name==="data"&&jQuery.isEmptyObject(obj[name])){continue
}if(name!=="toJSON"){return false
}}return true
}function handleQueueMarkDefer(elem,type,src){var deferDataKey=type+"defer",queueDataKey=type+"queue",markDataKey=type+"mark",defer=jQuery._data(elem,deferDataKey);
if(defer&&(src==="queue"||!jQuery._data(elem,queueDataKey))&&(src==="mark"||!jQuery._data(elem,markDataKey))){setTimeout(function(){if(!jQuery._data(elem,queueDataKey)&&!jQuery._data(elem,markDataKey)){jQuery.removeData(elem,deferDataKey,true);
defer.fire()
}},0)
}}jQuery.extend({_mark:function(elem,type){if(elem){type=(type||"fx")+"mark";
jQuery._data(elem,type,(jQuery._data(elem,type)||0)+1)
}},_unmark:function(force,elem,type){if(force!==true){type=elem;
elem=force;
force=false
}if(elem){type=type||"fx";
var key=type+"mark",count=force?0:((jQuery._data(elem,key)||1)-1);
if(count){jQuery._data(elem,key,count)
}else{jQuery.removeData(elem,key,true);
handleQueueMarkDefer(elem,type,"mark")
}}},queue:function(elem,type,data){var q;
if(elem){type=(type||"fx")+"queue";
q=jQuery._data(elem,type);
if(data){if(!q||jQuery.isArray(data)){q=jQuery._data(elem,type,jQuery.makeArray(data))
}else{q.push(data)
}}return q||[]
}},dequeue:function(elem,type){type=type||"fx";
var queue=jQuery.queue(elem,type),fn=queue.shift(),hooks={};
if(fn==="inprogress"){fn=queue.shift()
}if(fn){if(type==="fx"){queue.unshift("inprogress")
}jQuery._data(elem,type+".run",hooks);
fn.call(elem,function(){jQuery.dequeue(elem,type)
},hooks)
}if(!queue.length){jQuery.removeData(elem,type+"queue "+type+".run",true);
handleQueueMarkDefer(elem,type,"queue")
}}});
jQuery.fn.extend({queue:function(type,data){var setter=2;
if(typeof type!=="string"){data=type;
type="fx";
setter--
}if(arguments.length<setter){return jQuery.queue(this[0],type)
}return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data);
if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type)
}})
},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type)
})
},delay:function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;
type=type||"fx";
return this.queue(type,function(next,hooks){var timeout=setTimeout(next,time);
hooks.stop=function(){clearTimeout(timeout)
}
})
},clearQueue:function(type){return this.queue(type||"fx",[])
},promise:function(type,object){if(typeof type!=="string"){object=type;
type=undefined
}type=type||"fx";
var defer=jQuery.Deferred(),elements=this,i=elements.length,count=1,deferDataKey=type+"defer",queueDataKey=type+"queue",markDataKey=type+"mark",tmp;
function resolve(){if(!(--count)){defer.resolveWith(elements,[elements])
}}while(i--){if((tmp=jQuery.data(elements[i],deferDataKey,undefined,true)||(jQuery.data(elements[i],queueDataKey,undefined,true)||jQuery.data(elements[i],markDataKey,undefined,true))&&jQuery.data(elements[i],deferDataKey,jQuery.Callbacks("once memory"),true))){count++;
tmp.add(resolve)
}}resolve();
return defer.promise(object)
}});
var rclass=/[\n\t\r]/g,rspace=/\s+/,rreturn=/\r/g,rtype=/^(?:button|input)$/i,rfocusable=/^(?:button|input|object|select|textarea)$/i,rclickable=/^a(?:rea)?$/i,rboolean=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,getSetAttribute=jQuery.support.getSetAttribute,nodeHook,boolHook,fixSpecified;
jQuery.fn.extend({attr:function(name,value){return jQuery.access(this,jQuery.attr,name,value,arguments.length>1)
},removeAttr:function(name){return this.each(function(){jQuery.removeAttr(this,name)
})
},prop:function(name,value){return jQuery.access(this,jQuery.prop,name,value,arguments.length>1)
},removeProp:function(name){name=jQuery.propFix[name]||name;
return this.each(function(){try{this[name]=undefined;
delete this[name]
}catch(e){}})
},addClass:function(value){var classNames,i,l,elem,setClass,c,cl;
if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,this.className))
})
}if(value&&typeof value==="string"){classNames=value.split(rspace);
for(i=0,l=this.length;
i<l;
i++){elem=this[i];
if(elem.nodeType===1){if(!elem.className&&classNames.length===1){elem.className=value
}else{setClass=" "+elem.className+" ";
for(c=0,cl=classNames.length;
c<cl;
c++){if(!~setClass.indexOf(" "+classNames[c]+" ")){setClass+=classNames[c]+" "
}}elem.className=jQuery.trim(setClass)
}}}}return this
},removeClass:function(value){var classNames,i,l,elem,className,c,cl;
if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,this.className))
})
}if((value&&typeof value==="string")||value===undefined){classNames=(value||"").split(rspace);
for(i=0,l=this.length;
i<l;
i++){elem=this[i];
if(elem.nodeType===1&&elem.className){if(value){className=(" "+elem.className+" ").replace(rclass," ");
for(c=0,cl=classNames.length;
c<cl;
c++){className=className.replace(" "+classNames[c]+" "," ")
}elem.className=jQuery.trim(className)
}else{elem.className=""
}}}}return this
},toggleClass:function(value,stateVal){var type=typeof value,isBool=typeof stateVal==="boolean";
if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,this.className,stateVal),stateVal)
})
}return this.each(function(){if(type==="string"){var className,i=0,self=jQuery(this),state=stateVal,classNames=value.split(rspace);
while((className=classNames[i++])){state=isBool?state:!self.hasClass(className);
self[state?"addClass":"removeClass"](className)
}}else{if(type==="undefined"||type==="boolean"){if(this.className){jQuery._data(this,"__className__",this.className)
}this.className=this.className||value===false?"":jQuery._data(this,"__className__")||""
}}})
},hasClass:function(selector){var className=" "+selector+" ",i=0,l=this.length;
for(;
i<l;
i++){if(this[i].nodeType===1&&(" "+this[i].className+" ").replace(rclass," ").indexOf(className)>-1){return true
}}return false
},val:function(value){var hooks,ret,isFunction,elem=this[0];
if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];
if(hooks&&"get" in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret
}ret=elem.value;
return typeof ret==="string"?ret.replace(rreturn,""):ret==null?"":ret
}return 
}isFunction=jQuery.isFunction(value);
return this.each(function(i){var self=jQuery(this),val;
if(this.nodeType!==1){return 
}if(isFunction){val=value.call(this,i,self.val())
}else{val=value
}if(val==null){val=""
}else{if(typeof val==="number"){val+=""
}else{if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+""
})
}}}hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()];
if(!hooks||!("set" in hooks)||hooks.set(this,val,"value")===undefined){this.value=val
}})
}});
jQuery.extend({valHooks:{option:{get:function(elem){var val=elem.attributes.value;
return !val||val.specified?elem.value:elem.text
}},select:{get:function(elem){var value,i,max,option,index=elem.selectedIndex,values=[],options=elem.options,one=elem.type==="select-one";
if(index<0){return null
}i=one?index:0;
max=one?index+1:options.length;
for(;
i<max;
i++){option=options[i];
if(option.selected&&(jQuery.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){value=jQuery(option).val();
if(one){return value
}values.push(value)
}}if(one&&!values.length&&options.length){return jQuery(options[index]).val()
}return values
},set:function(elem,value){var values=jQuery.makeArray(value);
jQuery(elem).find("option").each(function(){this.selected=jQuery.inArray(jQuery(this).val(),values)>=0
});
if(!values.length){elem.selectedIndex=-1
}return values
}}},attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(elem,name,value,pass){var ret,hooks,notxml,nType=elem.nodeType;
if(!elem||nType===3||nType===8||nType===2){return 
}if(pass&&name in jQuery.attrFn){return jQuery(elem)[name](value)
}if(typeof elem.getAttribute==="undefined"){return jQuery.prop(elem,name,value)
}notxml=nType!==1||!jQuery.isXMLDoc(elem);
if(notxml){name=name.toLowerCase();
hooks=jQuery.attrHooks[name]||(rboolean.test(name)?boolHook:nodeHook)
}if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);
return 
}else{if(hooks&&"set" in hooks&&notxml&&(ret=hooks.set(elem,value,name))!==undefined){return ret
}else{elem.setAttribute(name,""+value);
return value
}}}else{if(hooks&&"get" in hooks&&notxml&&(ret=hooks.get(elem,name))!==null){return ret
}else{ret=elem.getAttribute(name);
return ret===null?undefined:ret
}}},removeAttr:function(elem,value){var propName,attrNames,name,l,isBool,i=0;
if(value&&elem.nodeType===1){attrNames=value.toLowerCase().split(rspace);
l=attrNames.length;
for(;
i<l;
i++){name=attrNames[i];
if(name){propName=jQuery.propFix[name]||name;
isBool=rboolean.test(name);
if(!isBool){jQuery.attr(elem,name,"")
}elem.removeAttribute(getSetAttribute?name:propName);
if(isBool&&propName in elem){elem[propName]=false
}}}}},attrHooks:{type:{set:function(elem,value){if(rtype.test(elem.nodeName)&&elem.parentNode){jQuery.error("type property can't be changed")
}else{if(!jQuery.support.radioValue&&value==="radio"&&jQuery.nodeName(elem,"input")){var val=elem.value;
elem.setAttribute("type",value);
if(val){elem.value=val
}return value
}}}},value:{get:function(elem,name){if(nodeHook&&jQuery.nodeName(elem,"button")){return nodeHook.get(elem,name)
}return name in elem?elem.value:null
},set:function(elem,value,name){if(nodeHook&&jQuery.nodeName(elem,"button")){return nodeHook.set(elem,value,name)
}elem.value=value
}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(elem,name,value){var ret,hooks,notxml,nType=elem.nodeType;
if(!elem||nType===3||nType===8||nType===2){return 
}notxml=nType!==1||!jQuery.isXMLDoc(elem);
if(notxml){name=jQuery.propFix[name]||name;
hooks=jQuery.propHooks[name]
}if(value!==undefined){if(hooks&&"set" in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret
}else{return(elem[name]=value)
}}else{if(hooks&&"get" in hooks&&(ret=hooks.get(elem,name))!==null){return ret
}else{return elem[name]
}}},propHooks:{tabIndex:{get:function(elem){var attributeNode=elem.getAttributeNode("tabindex");
return attributeNode&&attributeNode.specified?parseInt(attributeNode.value,10):rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:undefined
}}}});
jQuery.attrHooks.tabindex=jQuery.propHooks.tabIndex;
boolHook={get:function(elem,name){var attrNode,property=jQuery.prop(elem,name);
return property===true||typeof property!=="boolean"&&(attrNode=elem.getAttributeNode(name))&&attrNode.nodeValue!==false?name.toLowerCase():undefined
},set:function(elem,value,name){var propName;
if(value===false){jQuery.removeAttr(elem,name)
}else{propName=jQuery.propFix[name]||name;
if(propName in elem){elem[propName]=true
}elem.setAttribute(name,name.toLowerCase())
}return name
}};
if(!getSetAttribute){fixSpecified={name:true,id:true,coords:true};
nodeHook=jQuery.valHooks.button={get:function(elem,name){var ret;
ret=elem.getAttributeNode(name);
return ret&&(fixSpecified[name]?ret.nodeValue!=="":ret.specified)?ret.nodeValue:undefined
},set:function(elem,value,name){var ret=elem.getAttributeNode(name);
if(!ret){ret=document.createAttribute(name);
elem.setAttributeNode(ret)
}return(ret.nodeValue=value+"")
}};
jQuery.attrHooks.tabindex.set=nodeHook.set;
jQuery.each(["width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{set:function(elem,value){if(value===""){elem.setAttribute(name,"auto");
return value
}}})
});
jQuery.attrHooks.contenteditable={get:nodeHook.get,set:function(elem,value,name){if(value===""){value="false"
}nodeHook.set(elem,value,name)
}}
}if(!jQuery.support.hrefNormalized){jQuery.each(["href","src","width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{get:function(elem){var ret=elem.getAttribute(name,2);
return ret===null?undefined:ret
}})
})
}if(!jQuery.support.style){jQuery.attrHooks.style={get:function(elem){return elem.style.cssText.toLowerCase()||undefined
},set:function(elem,value){return(elem.style.cssText=""+value)
}}
}if(!jQuery.support.optSelected){jQuery.propHooks.selected=jQuery.extend(jQuery.propHooks.selected,{get:function(elem){var parent=elem.parentNode;
if(parent){parent.selectedIndex;
if(parent.parentNode){parent.parentNode.selectedIndex
}}return null
}})
}if(!jQuery.support.enctype){jQuery.propFix.enctype="encoding"
}if(!jQuery.support.checkOn){jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={get:function(elem){return elem.getAttribute("value")===null?"on":elem.value
}}
})
}jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]=jQuery.extend(jQuery.valHooks[this],{set:function(elem,value){if(jQuery.isArray(value)){return(elem.checked=jQuery.inArray(jQuery(elem).val(),value)>=0)
}}})
});
var rformElems=/^(?:textarea|input|select)$/i,rtypenamespace=/^([^\.]*)?(?:\.(.+))?$/,rhoverHack=/(?:^|\s)hover(\.\S+)?\b/,rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|contextmenu)|click/,rfocusMorph=/^(?:focusinfocus|focusoutblur)$/,rquickIs=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,quickParse=function(selector){var quick=rquickIs.exec(selector);
if(quick){quick[1]=(quick[1]||"").toLowerCase();
quick[3]=quick[3]&&new RegExp("(?:^|\\s)"+quick[3]+"(?:\\s|$)")
}return quick
},quickIs=function(elem,m){var attrs=elem.attributes||{};
return((!m[1]||elem.nodeName.toLowerCase()===m[1])&&(!m[2]||(attrs.id||{}).value===m[2])&&(!m[3]||m[3].test((attrs["class"]||{}).value)))
},hoverHack=function(events){return jQuery.event.special.hover?events:events.replace(rhoverHack,"mouseenter$1 mouseleave$1")
};
jQuery.event={add:function(elem,types,handler,data,selector){var elemData,eventHandle,events,t,tns,type,namespaces,handleObj,handleObjIn,quick,handlers,special;
if(elem.nodeType===3||elem.nodeType===8||!types||!handler||!(elemData=jQuery._data(elem))){return 
}if(handler.handler){handleObjIn=handler;
handler=handleObjIn.handler;
selector=handleObjIn.selector
}if(!handler.guid){handler.guid=jQuery.guid++
}events=elemData.events;
if(!events){elemData.events=events={}
}eventHandle=elemData.handle;
if(!eventHandle){elemData.handle=eventHandle=function(e){return typeof jQuery!=="undefined"&&(!e||jQuery.event.triggered!==e.type)?jQuery.event.dispatch.apply(eventHandle.elem,arguments):undefined
};
eventHandle.elem=elem
}types=jQuery.trim(hoverHack(types)).split(" ");
for(t=0;
t<types.length;
t++){tns=rtypenamespace.exec(types[t])||[];
type=tns[1];
namespaces=(tns[2]||"").split(".").sort();
special=jQuery.event.special[type]||{};
type=(selector?special.delegateType:special.bindType)||type;
special=jQuery.event.special[type]||{};
handleObj=jQuery.extend({type:type,origType:tns[1],data:data,handler:handler,guid:handler.guid,selector:selector,quick:selector&&quickParse(selector),namespace:namespaces.join(".")},handleObjIn);
handlers=events[type];
if(!handlers){handlers=events[type]=[];
handlers.delegateCount=0;
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false)
}else{if(elem.attachEvent){elem.attachEvent("on"+type,eventHandle)
}}}}if(special.add){special.add.call(elem,handleObj);
if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid
}}if(selector){handlers.splice(handlers.delegateCount++,0,handleObj)
}else{handlers.push(handleObj)
}jQuery.event.global[type]=true
}elem=null
},global:{},remove:function(elem,types,handler,selector,mappedTypes){var elemData=jQuery.hasData(elem)&&jQuery._data(elem),t,tns,type,origType,namespaces,origCount,j,events,special,handle,eventType,handleObj;
if(!elemData||!(events=elemData.events)){return 
}types=jQuery.trim(hoverHack(types||"")).split(" ");
for(t=0;
t<types.length;
t++){tns=rtypenamespace.exec(types[t])||[];
type=origType=tns[1];
namespaces=tns[2];
if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true)
}continue
}special=jQuery.event.special[type]||{};
type=(selector?special.delegateType:special.bindType)||type;
eventType=events[type]||[];
origCount=eventType.length;
namespaces=namespaces?new RegExp("(^|\\.)"+namespaces.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;
for(j=0;
j<eventType.length;
j++){handleObj=eventType[j];
if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!namespaces||namespaces.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){eventType.splice(j--,1);
if(handleObj.selector){eventType.delegateCount--
}if(special.remove){special.remove.call(elem,handleObj)
}}}if(eventType.length===0&&origCount!==eventType.length){if(!special.teardown||special.teardown.call(elem,namespaces)===false){jQuery.removeEvent(elem,type,elemData.handle)
}delete events[type]
}}if(jQuery.isEmptyObject(events)){handle=elemData.handle;
if(handle){handle.elem=null
}jQuery.removeData(elem,["events","handle"],true)
}},customEvent:{getData:true,setData:true,changeData:true},trigger:function(event,data,elem,onlyHandlers){if(elem&&(elem.nodeType===3||elem.nodeType===8)){return 
}var type=event.type||event,namespaces=[],cache,exclusive,i,cur,old,ontype,special,handle,eventPath,bubbleType;
if(rfocusMorph.test(type+jQuery.event.triggered)){return 
}if(type.indexOf("!")>=0){type=type.slice(0,-1);
exclusive=true
}if(type.indexOf(".")>=0){namespaces=type.split(".");
type=namespaces.shift();
namespaces.sort()
}if((!elem||jQuery.event.customEvent[type])&&!jQuery.event.global[type]){return 
}event=typeof event==="object"?event[jQuery.expando]?event:new jQuery.Event(type,event):new jQuery.Event(type);
event.type=type;
event.isTrigger=true;
event.exclusive=exclusive;
event.namespace=namespaces.join(".");
event.namespace_re=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.)?")+"(\\.|$)"):null;
ontype=type.indexOf(":")<0?"on"+type:"";
if(!elem){cache=jQuery.cache;
for(i in cache){if(cache[i].events&&cache[i].events[type]){jQuery.event.trigger(event,data,cache[i].handle.elem,true)
}}return 
}event.result=undefined;
if(!event.target){event.target=elem
}data=data!=null?jQuery.makeArray(data):[];
data.unshift(event);
special=jQuery.event.special[type]||{};
if(special.trigger&&special.trigger.apply(elem,data)===false){return 
}eventPath=[[elem,special.bindType||type]];
if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){bubbleType=special.delegateType||type;
cur=rfocusMorph.test(bubbleType+type)?elem:elem.parentNode;
old=null;
for(;
cur;
cur=cur.parentNode){eventPath.push([cur,bubbleType]);
old=cur
}if(old&&old===elem.ownerDocument){eventPath.push([old.defaultView||old.parentWindow||window,bubbleType])
}}for(i=0;
i<eventPath.length&&!event.isPropagationStopped();
i++){cur=eventPath[i][0];
event.type=eventPath[i][1];
handle=(jQuery._data(cur,"events")||{})[event.type]&&jQuery._data(cur,"handle");
if(handle){handle.apply(cur,data)
}handle=ontype&&cur[ontype];
if(handle&&jQuery.acceptData(cur)&&handle.apply(cur,data)===false){event.preventDefault()
}}event.type=type;
if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(elem.ownerDocument,data)===false)&&!(type==="click"&&jQuery.nodeName(elem,"a"))&&jQuery.acceptData(elem)){if(ontype&&elem[type]&&((type!=="focus"&&type!=="blur")||event.target.offsetWidth!==0)&&!jQuery.isWindow(elem)){old=elem[ontype];
if(old){elem[ontype]=null
}jQuery.event.triggered=type;
elem[type]();
jQuery.event.triggered=undefined;
if(old){elem[ontype]=old
}}}}return event.result
},dispatch:function(event){event=jQuery.event.fix(event||window.event);
var handlers=((jQuery._data(this,"events")||{})[event.type]||[]),delegateCount=handlers.delegateCount,args=[].slice.call(arguments,0),run_all=!event.exclusive&&!event.namespace,special=jQuery.event.special[event.type]||{},handlerQueue=[],i,j,cur,jqcur,ret,selMatch,matched,matches,handleObj,sel,related;
args[0]=event;
event.delegateTarget=this;
if(special.preDispatch&&special.preDispatch.call(this,event)===false){return 
}if(delegateCount&&!(event.button&&event.type==="click")){jqcur=jQuery(this);
jqcur.context=this.ownerDocument||this;
for(cur=event.target;
cur!=this;
cur=cur.parentNode||this){if(cur.disabled!==true){selMatch={};
matches=[];
jqcur[0]=cur;
for(i=0;
i<delegateCount;
i++){handleObj=handlers[i];
sel=handleObj.selector;
if(selMatch[sel]===undefined){selMatch[sel]=(handleObj.quick?quickIs(cur,handleObj.quick):jqcur.is(sel))
}if(selMatch[sel]){matches.push(handleObj)
}}if(matches.length){handlerQueue.push({elem:cur,matches:matches})
}}}}if(handlers.length>delegateCount){handlerQueue.push({elem:this,matches:handlers.slice(delegateCount)})
}for(i=0;
i<handlerQueue.length&&!event.isPropagationStopped();
i++){matched=handlerQueue[i];
event.currentTarget=matched.elem;
for(j=0;
j<matched.matches.length&&!event.isImmediatePropagationStopped();
j++){handleObj=matched.matches[j];
if(run_all||(!event.namespace&&!handleObj.namespace)||event.namespace_re&&event.namespace_re.test(handleObj.namespace)){event.data=handleObj.data;
event.handleObj=handleObj;
ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);
if(ret!==undefined){event.result=ret;
if(ret===false){event.preventDefault();
event.stopPropagation()
}}}}}if(special.postDispatch){special.postDispatch.call(this,event)
}return event.result
},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(event,original){if(event.which==null){event.which=original.charCode!=null?original.charCode:original.keyCode
}return event
}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(event,original){var eventDoc,doc,body,button=original.button,fromElement=original.fromElement;
if(event.pageX==null&&original.clientX!=null){eventDoc=event.target.ownerDocument||document;
doc=eventDoc.documentElement;
body=eventDoc.body;
event.pageX=original.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);
event.pageY=original.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)
}if(!event.relatedTarget&&fromElement){event.relatedTarget=fromElement===event.target?original.toElement:fromElement
}if(!event.which&&button!==undefined){event.which=(button&1?1:(button&2?3:(button&4?2:0)))
}return event
}},fix:function(event){if(event[jQuery.expando]){return event
}var i,prop,originalEvent=event,fixHook=jQuery.event.fixHooks[event.type]||{},copy=fixHook.props?this.props.concat(fixHook.props):this.props;
event=jQuery.Event(originalEvent);
for(i=copy.length;
i;
){prop=copy[--i];
event[prop]=originalEvent[prop]
}if(!event.target){event.target=originalEvent.srcElement||document
}if(event.target.nodeType===3){event.target=event.target.parentNode
}if(event.metaKey===undefined){event.metaKey=event.ctrlKey
}return fixHook.filter?fixHook.filter(event,originalEvent):event
},special:{ready:{setup:jQuery.bindReady},load:{noBubble:true},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(data,namespaces,eventHandle){if(jQuery.isWindow(this)){this.onbeforeunload=eventHandle
}},teardown:function(namespaces,eventHandle){if(this.onbeforeunload===eventHandle){this.onbeforeunload=null
}}}},simulate:function(type,elem,event,bubble){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true,originalEvent:{}});
if(bubble){jQuery.event.trigger(e,null,elem)
}else{jQuery.event.dispatch.call(elem,e)
}if(e.isDefaultPrevented()){event.preventDefault()
}}};
jQuery.event.handle=jQuery.event.dispatch;
jQuery.removeEvent=document.removeEventListener?function(elem,type,handle){if(elem.removeEventListener){elem.removeEventListener(type,handle,false)
}}:function(elem,type,handle){if(elem.detachEvent){elem.detachEvent("on"+type,handle)
}};
jQuery.Event=function(src,props){if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props)
}if(src&&src.type){this.originalEvent=src;
this.type=src.type;
this.isDefaultPrevented=(src.defaultPrevented||src.returnValue===false||src.getPreventDefault&&src.getPreventDefault())?returnTrue:returnFalse
}else{this.type=src
}if(props){jQuery.extend(this,props)
}this.timeStamp=src&&src.timeStamp||jQuery.now();
this[jQuery.expando]=true
};
function returnFalse(){return false
}function returnTrue(){return true
}jQuery.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;
var e=this.originalEvent;
if(!e){return 
}if(e.preventDefault){e.preventDefault()
}else{e.returnValue=false
}},stopPropagation:function(){this.isPropagationStopped=returnTrue;
var e=this.originalEvent;
if(!e){return 
}if(e.stopPropagation){e.stopPropagation()
}e.cancelBubble=true
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;
this.stopPropagation()
},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function(event){var target=this,related=event.relatedTarget,handleObj=event.handleObj,selector=handleObj.selector,ret;
if(!related||(related!==target&&!jQuery.contains(target,related))){event.type=handleObj.origType;
ret=handleObj.handler.apply(this,arguments);
event.type=fix
}return ret
}}
});
if(!jQuery.support.submitBubbles){jQuery.event.special.submit={setup:function(){if(jQuery.nodeName(this,"form")){return false
}jQuery.event.add(this,"click._submit keypress._submit",function(e){var elem=e.target,form=jQuery.nodeName(elem,"input")||jQuery.nodeName(elem,"button")?elem.form:undefined;
if(form&&!form._submit_attached){jQuery.event.add(form,"submit._submit",function(event){event._submit_bubble=true
});
form._submit_attached=true
}})
},postDispatch:function(event){if(event._submit_bubble){delete event._submit_bubble;
if(this.parentNode&&!event.isTrigger){jQuery.event.simulate("submit",this.parentNode,event,true)
}}},teardown:function(){if(jQuery.nodeName(this,"form")){return false
}jQuery.event.remove(this,"._submit")
}}
}if(!jQuery.support.changeBubbles){jQuery.event.special.change={setup:function(){if(rformElems.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){jQuery.event.add(this,"propertychange._change",function(event){if(event.originalEvent.propertyName==="checked"){this._just_changed=true
}});
jQuery.event.add(this,"click._change",function(event){if(this._just_changed&&!event.isTrigger){this._just_changed=false;
jQuery.event.simulate("change",this,event,true)
}})
}return false
}jQuery.event.add(this,"beforeactivate._change",function(e){var elem=e.target;
if(rformElems.test(elem.nodeName)&&!elem._change_attached){jQuery.event.add(elem,"change._change",function(event){if(this.parentNode&&!event.isSimulated&&!event.isTrigger){jQuery.event.simulate("change",this.parentNode,event,true)
}});
elem._change_attached=true
}})
},handle:function(event){var elem=event.target;
if(this!==elem||event.isSimulated||event.isTrigger||(elem.type!=="radio"&&elem.type!=="checkbox")){return event.handleObj.handler.apply(this,arguments)
}},teardown:function(){jQuery.event.remove(this,"._change");
return rformElems.test(this.nodeName)
}}
}if(!jQuery.support.focusinBubbles){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){var attaches=0,handler=function(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event),true)
};
jQuery.event.special[fix]={setup:function(){if(attaches++===0){document.addEventListener(orig,handler,true)
}},teardown:function(){if(--attaches===0){document.removeEventListener(orig,handler,true)
}}}
})
}jQuery.fn.extend({on:function(types,selector,data,fn,one){var origFn,type;
if(typeof types==="object"){if(typeof selector!=="string"){data=data||selector;
selector=undefined
}for(type in types){this.on(type,selector,data,types[type],one)
}return this
}if(data==null&&fn==null){fn=selector;
data=selector=undefined
}else{if(fn==null){if(typeof selector==="string"){fn=data;
data=undefined
}else{fn=data;
data=selector;
selector=undefined
}}}if(fn===false){fn=returnFalse
}else{if(!fn){return this
}}if(one===1){origFn=fn;
fn=function(event){jQuery().off(event);
return origFn.apply(this,arguments)
};
fn.guid=origFn.guid||(origFn.guid=jQuery.guid++)
}return this.each(function(){jQuery.event.add(this,types,fn,data,selector)
})
},one:function(types,selector,data,fn){return this.on(types,selector,data,fn,1)
},off:function(types,selector,fn){if(types&&types.preventDefault&&types.handleObj){var handleObj=types.handleObj;
jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);
return this
}if(typeof types==="object"){for(var type in types){this.off(type,selector,types[type])
}return this
}if(selector===false||typeof selector==="function"){fn=selector;
selector=undefined
}if(fn===false){fn=returnFalse
}return this.each(function(){jQuery.event.remove(this,types,fn,selector)
})
},bind:function(types,data,fn){return this.on(types,null,data,fn)
},unbind:function(types,fn){return this.off(types,null,fn)
},live:function(types,data,fn){jQuery(this.context).on(types,this.selector,data,fn);
return this
},die:function(types,fn){jQuery(this.context).off(types,this.selector||"**",fn);
return this
},delegate:function(selector,types,data,fn){return this.on(types,selector,data,fn)
},undelegate:function(selector,types,fn){return arguments.length==1?this.off(selector,"**"):this.off(types,selector,fn)
},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this)
})
},triggerHandler:function(type,data){if(this[0]){return jQuery.event.trigger(type,data,this[0],true)
}},toggle:function(fn){var args=arguments,guid=fn.guid||jQuery.guid++,i=0,toggler=function(event){var lastToggle=(jQuery._data(this,"lastToggle"+fn.guid)||0)%i;
jQuery._data(this,"lastToggle"+fn.guid,lastToggle+1);
event.preventDefault();
return args[lastToggle].apply(this,arguments)||false
};
toggler.guid=guid;
while(i<args.length){args[i++].guid=guid
}return this.click(toggler)
},hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver)
}});
jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "),function(i,name){jQuery.fn[name]=function(data,fn){if(fn==null){fn=data;
data=null
}return arguments.length>0?this.on(name,null,data,fn):this.trigger(name)
};
if(jQuery.attrFn){jQuery.attrFn[name]=true
}if(rkeyEvent.test(name)){jQuery.event.fixHooks[name]=jQuery.event.keyHooks
}if(rmouseEvent.test(name)){jQuery.event.fixHooks[name]=jQuery.event.mouseHooks
}});
/*
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,expando="sizcache"+(Math.random()+"").replace(".",""),done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true,rBackslash=/\\/g,rReturn=/\r\n/g,rNonWord=/\W/;
[0,0].sort(function(){baseHasDuplicate=false;
return 0
});
var Sizzle=function(selector,context,results,seed){results=results||[];
context=context||document;
var origContext=context;
if(context.nodeType!==1&&context.nodeType!==9){return[]
}if(!selector||typeof selector!=="string"){return results
}var m,set,checkSet,extra,ret,cur,pop,i,prune=true,contextXML=Sizzle.isXML(context),parts=[],soFar=selector;
do{chunker.exec("");
m=chunker.exec(soFar);
if(m){soFar=m[3];
parts.push(m[1]);
if(m[2]){extra=m[3];
break
}}}while(m);
if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context,seed)
}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);
while(parts.length){selector=parts.shift();
if(Expr.relative[selector]){selector+=parts.shift()
}set=posProcess(selector,set,seed)
}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){ret=Sizzle.find(parts.shift(),context,contextXML);
context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0]
}if(context){ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);
set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;
if(parts.length>0){checkSet=makeArray(set)
}else{prune=false
}while(parts.length){cur=parts.pop();
pop=cur;
if(!Expr.relative[cur]){cur=""
}else{pop=parts.pop()
}if(pop==null){pop=context
}Expr.relative[cur](checkSet,pop,contextXML)
}}else{checkSet=parts=[]
}}if(!checkSet){checkSet=set
}if(!checkSet){Sizzle.error(cur||selector)
}if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet)
}else{if(context&&context.nodeType===1){for(i=0;
checkSet[i]!=null;
i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&Sizzle.contains(context,checkSet[i]))){results.push(set[i])
}}}else{for(i=0;
checkSet[i]!=null;
i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i])
}}}}}else{makeArray(checkSet,results)
}if(extra){Sizzle(extra,origContext,results,seed);
Sizzle.uniqueSort(results)
}return results
};
Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;
results.sort(sortOrder);
if(hasDuplicate){for(var i=1;
i<results.length;
i++){if(results[i]===results[i-1]){results.splice(i--,1)
}}}}return results
};
Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set)
};
Sizzle.matchesSelector=function(node,expr){return Sizzle(expr,null,null,[node]).length>0
};
Sizzle.find=function(expr,context,isXML){var set,i,len,match,type,left;
if(!expr){return[]
}for(i=0,len=Expr.order.length;
i<len;
i++){type=Expr.order[i];
if((match=Expr.leftMatch[type].exec(expr))){left=match[1];
match.splice(1,1);
if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(rBackslash,"");
set=Expr.find[type](match,context,isXML);
if(set!=null){expr=expr.replace(Expr.match[type],"");
break
}}}}if(!set){set=typeof context.getElementsByTagName!=="undefined"?context.getElementsByTagName("*"):[]
}return{set:set,expr:expr}
};
Sizzle.filter=function(expr,set,inplace,not){var match,anyFound,type,found,item,filter,left,i,pass,old=expr,result=[],curLoop=set,isXMLFilter=set&&set[0]&&Sizzle.isXML(set[0]);
while(expr&&set.length){for(type in Expr.filter){if((match=Expr.leftMatch[type].exec(expr))!=null&&match[2]){filter=Expr.filter[type];
left=match[1];
anyFound=false;
match.splice(1,1);
if(left.substr(left.length-1)==="\\"){continue
}if(curLoop===result){result=[]
}if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);
if(!match){anyFound=found=true
}else{if(match===true){continue
}}}if(match){for(i=0;
(item=curLoop[i])!=null;
i++){if(item){found=filter(item,match,i,curLoop);
pass=not^found;
if(inplace&&found!=null){if(pass){anyFound=true
}else{curLoop[i]=false
}}else{if(pass){result.push(item);
anyFound=true
}}}}}if(found!==undefined){if(!inplace){curLoop=result
}expr=expr.replace(Expr.match[type],"");
if(!anyFound){return[]
}break
}}}if(expr===old){if(anyFound==null){Sizzle.error(expr)
}else{break
}}old=expr
}return curLoop
};
Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg)
};
var getText=Sizzle.getText=function(elem){var i,node,nodeType=elem.nodeType,ret="";
if(nodeType){if(nodeType===1||nodeType===9||nodeType===11){if(typeof elem.textContent==="string"){return elem.textContent
}else{if(typeof elem.innerText==="string"){return elem.innerText.replace(rReturn,"")
}else{for(elem=elem.firstChild;
elem;
elem=elem.nextSibling){ret+=getText(elem)
}}}}else{if(nodeType===3||nodeType===4){return elem.nodeValue
}}}else{for(i=0;
(node=elem[i]);
i++){if(node.nodeType!==8){ret+=getText(node)
}}}return ret
};
var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href")
},type:function(elem){return elem.getAttribute("type")
}},relative:{"+":function(checkSet,part){var isPartStr=typeof part==="string",isTag=isPartStr&&!rNonWord.test(part),isPartStrNotTag=isPartStr&&!isTag;
if(isTag){part=part.toLowerCase()
}for(var i=0,l=checkSet.length,elem;
i<l;
i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?elem||false:elem===part
}}if(isPartStrNotTag){Sizzle.filter(part,checkSet,true)
}},">":function(checkSet,part){var elem,isPartStr=typeof part==="string",i=0,l=checkSet.length;
if(isPartStr&&!rNonWord.test(part)){part=part.toLowerCase();
for(;
i<l;
i++){elem=checkSet[i];
if(elem){var parent=elem.parentNode;
checkSet[i]=parent.nodeName.toLowerCase()===part?parent:false
}}}else{for(;
i<l;
i++){elem=checkSet[i];
if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part
}}if(isPartStr){Sizzle.filter(part,checkSet,true)
}}},"":function(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;
if(typeof part==="string"&&!rNonWord.test(part)){part=part.toLowerCase();
nodeCheck=part;
checkFn=dirNodeCheck
}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML)
},"~":function(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;
if(typeof part==="string"&&!rNonWord.test(part)){part=part.toLowerCase();
nodeCheck=part;
checkFn=dirNodeCheck
}checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML)
}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);
return m&&m.parentNode?[m]:[]
}},NAME:function(match,context){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);
for(var i=0,l=results.length;
i<l;
i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i])
}}return ret.length===0?null:ret
}},TAG:function(match,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(match[1])
}}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(rBackslash,"")+" ";
if(isXML){return match
}for(var i=0,elem;
(elem=curLoop[i])!=null;
i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").replace(/[\t\n\r]/g," ").indexOf(match)>=0)){if(!inplace){result.push(elem)
}}else{if(inplace){curLoop[i]=false
}}}}return false
},ID:function(match){return match[1].replace(rBackslash,"")
},TAG:function(match,curLoop){return match[1].replace(rBackslash,"").toLowerCase()
},CHILD:function(match){if(match[1]==="nth"){if(!match[2]){Sizzle.error(match[0])
}match[2]=match[2].replace(/^\+|\s*/g,"");
var test=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);
match[2]=(test[1]+(test[2]||1))-0;
match[3]=test[3]-0
}else{if(match[2]){Sizzle.error(match[0])
}}match[0]=done++;
return match
},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1]=match[1].replace(rBackslash,"");
if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name]
}match[4]=(match[4]||match[5]||"").replace(rBackslash,"");
if(match[2]==="~="){match[4]=" "+match[4]+" "
}return match
},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop)
}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);
if(!inplace){result.push.apply(result,ret)
}return false
}}else{if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true
}}return match
},POS:function(match){match.unshift(true);
return match
}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden"
},disabled:function(elem){return elem.disabled===true
},checked:function(elem){return elem.checked===true
},selected:function(elem){if(elem.parentNode){elem.parentNode.selectedIndex
}return elem.selected===true
},parent:function(elem){return !!elem.firstChild
},empty:function(elem){return !elem.firstChild
},has:function(elem,i,match){return !!Sizzle(match[3],elem).length
},header:function(elem){return(/h\d/i).test(elem.nodeName)
},text:function(elem){var attr=elem.getAttribute("type"),type=elem.type;
return elem.nodeName.toLowerCase()==="input"&&"text"===type&&(attr===type||attr===null)
},radio:function(elem){return elem.nodeName.toLowerCase()==="input"&&"radio"===elem.type
},checkbox:function(elem){return elem.nodeName.toLowerCase()==="input"&&"checkbox"===elem.type
},file:function(elem){return elem.nodeName.toLowerCase()==="input"&&"file"===elem.type
},password:function(elem){return elem.nodeName.toLowerCase()==="input"&&"password"===elem.type
},submit:function(elem){var name=elem.nodeName.toLowerCase();
return(name==="input"||name==="button")&&"submit"===elem.type
},image:function(elem){return elem.nodeName.toLowerCase()==="input"&&"image"===elem.type
},reset:function(elem){var name=elem.nodeName.toLowerCase();
return(name==="input"||name==="button")&&"reset"===elem.type
},button:function(elem){var name=elem.nodeName.toLowerCase();
return name==="input"&&"button"===elem.type||name==="button"
},input:function(elem){return(/input|select|textarea|button/i).test(elem.nodeName)
},focus:function(elem){return elem===elem.ownerDocument.activeElement
}},setFilters:{first:function(elem,i){return i===0
},last:function(elem,i,match,array){return i===array.length-1
},even:function(elem,i){return i%2===0
},odd:function(elem,i){return i%2===1
},lt:function(elem,i,match){return i<match[3]-0
},gt:function(elem,i,match){return i>match[3]-0
},nth:function(elem,i,match){return match[3]-0===i
},eq:function(elem,i,match){return match[3]-0===i
}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];
if(filter){return filter(elem,i,match,array)
}else{if(name==="contains"){return(elem.textContent||elem.innerText||getText([elem])||"").indexOf(match[3])>=0
}else{if(name==="not"){var not=match[3];
for(var j=0,l=not.length;
j<l;
j++){if(not[j]===elem){return false
}}return true
}else{Sizzle.error(name)
}}}},CHILD:function(elem,match){var first,last,doneName,parent,cache,count,diff,type=match[1],node=elem;
switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false
}}if(type==="first"){return true
}node=elem;
case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false
}}return true;
case"nth":first=match[2];
last=match[3];
if(first===1&&last===0){return true
}doneName=match[0];
parent=elem.parentNode;
if(parent&&(parent[expando]!==doneName||!elem.nodeIndex)){count=0;
for(node=parent.firstChild;
node;
node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count
}}parent[expando]=doneName
}diff=elem.nodeIndex-last;
if(first===0){return diff===0
}else{return(diff%first===0&&diff/first>=0)
}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match
},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||!!elem.nodeName&&elem.nodeName.toLowerCase()===match
},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1
},ATTR:function(elem,match){var name=match[1],result=Sizzle.attr?Sizzle.attr(elem,name):Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];
return result==null?type==="!=":!type&&Sizzle.attr?result!=null:type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!==check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false
},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];
if(filter){return filter(elem,i,match,array)
}}}};
var origPOS=Expr.match.POS,fescape=function(all,num){return"\\"+(num-0+1)
};
for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+(/(?![^\[]*\])(?![^\(]*\))/.source));
Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source.replace(/\\(\d+)/g,fescape))
}Expr.match.globalPOS=origPOS;
var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);
if(results){results.push.apply(results,array);
return results
}return array
};
try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType
}catch(e){makeArray=function(array,results){var i=0,ret=results||[];
if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array)
}else{if(typeof array.length==="number"){for(var l=array.length;
i<l;
i++){ret.push(array[i])
}}else{for(;
array[i];
i++){ret.push(array[i])
}}}return ret
}
}var sortOrder,siblingCheck;
if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(a===b){hasDuplicate=true;
return 0
}if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1
}return a.compareDocumentPosition(b)&4?-1:1
}
}else{sortOrder=function(a,b){if(a===b){hasDuplicate=true;
return 0
}else{if(a.sourceIndex&&b.sourceIndex){return a.sourceIndex-b.sourceIndex
}}var al,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;
if(aup===bup){return siblingCheck(a,b)
}else{if(!aup){return -1
}else{if(!bup){return 1
}}}while(cur){ap.unshift(cur);
cur=cur.parentNode
}cur=bup;
while(cur){bp.unshift(cur);
cur=cur.parentNode
}al=ap.length;
bl=bp.length;
for(var i=0;
i<al&&i<bl;
i++){if(ap[i]!==bp[i]){return siblingCheck(ap[i],bp[i])
}}return i===al?siblingCheck(a,bp[i],-1):siblingCheck(ap[i],b,1)
};
siblingCheck=function(a,b,ret){if(a===b){return ret
}var cur=a.nextSibling;
while(cur){if(cur===b){return -1
}cur=cur.nextSibling
}return 1
}
}(function(){var form=document.createElement("div"),id="script"+(new Date()).getTime(),root=document.documentElement;
form.innerHTML="<a name='"+id+"'/>";
root.insertBefore(form,root.firstChild);
if(document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);
return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[]
}};
Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");
return elem.nodeType===1&&node&&node.nodeValue===match
}
}root.removeChild(form);
root=form=null
})();
(function(){var div=document.createElement("div");
div.appendChild(document.createComment(""));
if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);
if(match[1]==="*"){var tmp=[];
for(var i=0;
results[i];
i++){if(results[i].nodeType===1){tmp.push(results[i])
}}results=tmp
}return results
}
}div.innerHTML="<a href='#'></a>";
if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2)
}
}div=null
})();
if(document.querySelectorAll){(function(){var oldSizzle=Sizzle,div=document.createElement("div"),id="__sizzle__";
div.innerHTML="<p class='TEST'></p>";
if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return 
}Sizzle=function(query,context,extra,seed){context=context||document;
if(!seed&&!Sizzle.isXML(context)){var match=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);
if(match&&(context.nodeType===1||context.nodeType===9)){if(match[1]){return makeArray(context.getElementsByTagName(query),extra)
}else{if(match[2]&&Expr.find.CLASS&&context.getElementsByClassName){return makeArray(context.getElementsByClassName(match[2]),extra)
}}}if(context.nodeType===9){if(query==="body"&&context.body){return makeArray([context.body],extra)
}else{if(match&&match[3]){var elem=context.getElementById(match[3]);
if(elem&&elem.parentNode){if(elem.id===match[3]){return makeArray([elem],extra)
}}else{return makeArray([],extra)
}}}try{return makeArray(context.querySelectorAll(query),extra)
}catch(qsaError){}}else{if(context.nodeType===1&&context.nodeName.toLowerCase()!=="object"){var oldContext=context,old=context.getAttribute("id"),nid=old||id,hasParent=context.parentNode,relativeHierarchySelector=/^\s*[+~]/.test(query);
if(!old){context.setAttribute("id",nid)
}else{nid=nid.replace(/'/g,"\\$&")
}if(relativeHierarchySelector&&hasParent){context=context.parentNode
}try{if(!relativeHierarchySelector||hasParent){return makeArray(context.querySelectorAll("[id='"+nid+"'] "+query),extra)
}}catch(pseudoError){}finally{if(!old){oldContext.removeAttribute("id")
}}}}}return oldSizzle(query,context,extra,seed)
};
for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop]
}div=null
})()
}(function(){var html=document.documentElement,matches=html.matchesSelector||html.mozMatchesSelector||html.webkitMatchesSelector||html.msMatchesSelector;
if(matches){var disconnectedMatch=!matches.call(document.createElement("div"),"div"),pseudoWorks=false;
try{matches.call(document.documentElement,"[test!='']:sizzle")
}catch(pseudoError){pseudoWorks=true
}Sizzle.matchesSelector=function(node,expr){expr=expr.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!Sizzle.isXML(node)){try{if(pseudoWorks||!Expr.match.PSEUDO.test(expr)&&!/!=/.test(expr)){var ret=matches.call(node,expr);
if(ret||!disconnectedMatch||node.document&&node.document.nodeType!==11){return ret
}}}catch(e){}}return Sizzle(expr,null,null,[node]).length>0
}
}})();
(function(){var div=document.createElement("div");
div.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){return 
}div.lastChild.className="e";
if(div.getElementsByClassName("e").length===1){return 
}Expr.order.splice(1,0,"CLASS");
Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1])
}};
div=null
})();
function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;
i<l;
i++){var elem=checkSet[i];
if(elem){var match=false;
elem=elem[dir];
while(elem){if(elem[expando]===doneName){match=checkSet[elem.sizset];
break
}if(elem.nodeType===1&&!isXML){elem[expando]=doneName;
elem.sizset=i
}if(elem.nodeName.toLowerCase()===cur){match=elem;
break
}elem=elem[dir]
}checkSet[i]=match
}}}function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;
i<l;
i++){var elem=checkSet[i];
if(elem){var match=false;
elem=elem[dir];
while(elem){if(elem[expando]===doneName){match=checkSet[elem.sizset];
break
}if(elem.nodeType===1){if(!isXML){elem[expando]=doneName;
elem.sizset=i
}if(typeof cur!=="string"){if(elem===cur){match=true;
break
}}else{if(Sizzle.filter(cur,[elem]).length>0){match=elem;
break
}}}elem=elem[dir]
}checkSet[i]=match
}}}if(document.documentElement.contains){Sizzle.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true)
}
}else{if(document.documentElement.compareDocumentPosition){Sizzle.contains=function(a,b){return !!(a.compareDocumentPosition(b)&16)
}
}else{Sizzle.contains=function(){return false
}
}}Sizzle.isXML=function(elem){var documentElement=(elem?elem.ownerDocument||elem:0).documentElement;
return documentElement?documentElement.nodeName!=="HTML":false
};
var posProcess=function(selector,context,seed){var match,tmpSet=[],later="",root=context.nodeType?[context]:context;
while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];
selector=selector.replace(Expr.match.PSEUDO,"")
}selector=Expr.relative[selector]?selector+"*":selector;
for(var i=0,l=root.length;
i<l;
i++){Sizzle(selector,root[i],tmpSet,seed)
}return Sizzle.filter(later,tmpSet)
};
Sizzle.attr=jQuery.attr;
Sizzle.selectors.attrMap={};
jQuery.find=Sizzle;
jQuery.expr=Sizzle.selectors;
jQuery.expr[":"]=jQuery.expr.filters;
jQuery.unique=Sizzle.uniqueSort;
jQuery.text=Sizzle.getText;
jQuery.isXMLDoc=Sizzle.isXML;
jQuery.contains=Sizzle.contains
})();
var runtil=/Until$/,rparentsprev=/^(?:parents|prevUntil|prevAll)/,rmultiselector=/,/,isSimple=/^.[^:#\[\.,]*$/,slice=Array.prototype.slice,POS=jQuery.expr.match.globalPOS,guaranteedUnique={children:true,contents:true,next:true,prev:true};
jQuery.fn.extend({find:function(selector){var self=this,i,l;
if(typeof selector!=="string"){return jQuery(selector).filter(function(){for(i=0,l=self.length;
i<l;
i++){if(jQuery.contains(self[i],this)){return true
}}})
}var ret=this.pushStack("","find",selector),length,n,r;
for(i=0,l=this.length;
i<l;
i++){length=ret.length;
jQuery.find(selector,this[i],ret);
if(i>0){for(n=length;
n<ret.length;
n++){for(r=0;
r<length;
r++){if(ret[r]===ret[n]){ret.splice(n--,1);
break
}}}}}return ret
},has:function(target){var targets=jQuery(target);
return this.filter(function(){for(var i=0,l=targets.length;
i<l;
i++){if(jQuery.contains(this,targets[i])){return true
}}})
},not:function(selector){return this.pushStack(winnow(this,selector,false),"not",selector)
},filter:function(selector){return this.pushStack(winnow(this,selector,true),"filter",selector)
},is:function(selector){return !!selector&&(typeof selector==="string"?POS.test(selector)?jQuery(selector,this.context).index(this[0])>=0:jQuery.filter(selector,this).length>0:this.filter(selector).length>0)
},closest:function(selectors,context){var ret=[],i,l,cur=this[0];
if(jQuery.isArray(selectors)){var level=1;
while(cur&&cur.ownerDocument&&cur!==context){for(i=0;
i<selectors.length;
i++){if(jQuery(cur).is(selectors[i])){ret.push({selector:selectors[i],elem:cur,level:level})
}}cur=cur.parentNode;
level++
}return ret
}var pos=POS.test(selectors)||typeof selectors!=="string"?jQuery(selectors,context||this.context):0;
for(i=0,l=this.length;
i<l;
i++){cur=this[i];
while(cur){if(pos?pos.index(cur)>-1:jQuery.find.matchesSelector(cur,selectors)){ret.push(cur);
break
}else{cur=cur.parentNode;
if(!cur||!cur.ownerDocument||cur===context||cur.nodeType===11){break
}}}}ret=ret.length>1?jQuery.unique(ret):ret;
return this.pushStack(ret,"closest",selectors)
},index:function(elem){if(!elem){return(this[0]&&this[0].parentNode)?this.prevAll().length:-1
}if(typeof elem==="string"){return jQuery.inArray(this[0],jQuery(elem))
}return jQuery.inArray(elem.jquery?elem[0]:elem,this)
},add:function(selector,context){var set=typeof selector==="string"?jQuery(selector,context):jQuery.makeArray(selector&&selector.nodeType?[selector]:selector),all=jQuery.merge(this.get(),set);
return this.pushStack(isDisconnected(set[0])||isDisconnected(all[0])?all:jQuery.unique(all))
},andSelf:function(){return this.add(this.prevObject)
}});
function isDisconnected(node){return !node||!node.parentNode||node.parentNode.nodeType===11
}jQuery.each({parent:function(elem){var parent=elem.parentNode;
return parent&&parent.nodeType!==11?parent:null
},parents:function(elem){return jQuery.dir(elem,"parentNode")
},parentsUntil:function(elem,i,until){return jQuery.dir(elem,"parentNode",until)
},next:function(elem){return jQuery.nth(elem,2,"nextSibling")
},prev:function(elem){return jQuery.nth(elem,2,"previousSibling")
},nextAll:function(elem){return jQuery.dir(elem,"nextSibling")
},prevAll:function(elem){return jQuery.dir(elem,"previousSibling")
},nextUntil:function(elem,i,until){return jQuery.dir(elem,"nextSibling",until)
},prevUntil:function(elem,i,until){return jQuery.dir(elem,"previousSibling",until)
},siblings:function(elem){return jQuery.sibling((elem.parentNode||{}).firstChild,elem)
},children:function(elem){return jQuery.sibling(elem.firstChild)
},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)
}},function(name,fn){jQuery.fn[name]=function(until,selector){var ret=jQuery.map(this,fn,until);
if(!runtil.test(name)){selector=until
}if(selector&&typeof selector==="string"){ret=jQuery.filter(selector,ret)
}ret=this.length>1&&!guaranteedUnique[name]?jQuery.unique(ret):ret;
if((this.length>1||rmultiselector.test(selector))&&rparentsprev.test(name)){ret=ret.reverse()
}return this.pushStack(ret,name,slice.call(arguments).join(","))
}
});
jQuery.extend({filter:function(expr,elems,not){if(not){expr=":not("+expr+")"
}return elems.length===1?jQuery.find.matchesSelector(elems[0],expr)?[elems[0]]:[]:jQuery.find.matches(expr,elems)
},dir:function(elem,dir,until){var matched=[],cur=elem[dir];
while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){if(cur.nodeType===1){matched.push(cur)
}cur=cur[dir]
}return matched
},nth:function(cur,result,dir,elem){result=result||1;
var num=0;
for(;
cur;
cur=cur[dir]){if(cur.nodeType===1&&++num===result){break
}}return cur
},sibling:function(n,elem){var r=[];
for(;
n;
n=n.nextSibling){if(n.nodeType===1&&n!==elem){r.push(n)
}}return r
}});
function winnow(elements,qualifier,keep){qualifier=qualifier||0;
if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){var retVal=!!qualifier.call(elem,i,elem);
return retVal===keep
})
}else{if(qualifier.nodeType){return jQuery.grep(elements,function(elem,i){return(elem===qualifier)===keep
})
}else{if(typeof qualifier==="string"){var filtered=jQuery.grep(elements,function(elem){return elem.nodeType===1
});
if(isSimple.test(qualifier)){return jQuery.filter(qualifier,filtered,!keep)
}else{qualifier=jQuery.filter(qualifier,filtered)
}}}}return jQuery.grep(elements,function(elem,i){return(jQuery.inArray(elem,qualifier)>=0)===keep
})
}function createSafeFragment(document){var list=nodeNames.split("|"),safeFrag=document.createDocumentFragment();
if(safeFrag.createElement){while(list.length){safeFrag.createElement(list.pop())
}}return safeFrag
}var nodeNames="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",rinlinejQuery=/ jQuery\d+="(?:\d+|null)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnoInnerhtml=/<(?:script|style)/i,rnocache=/<(?:script|object|embed|option|style)/i,rnoshimcache=new RegExp("<(?:"+nodeNames+")[\\s/>]","i"),rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptType=/\/(java|ecma)script/i,rcleanScript=/^\s*<!(?:\[CDATA\[|\-\-)/,wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},safeFragment=createSafeFragment(document);
wrapMap.optgroup=wrapMap.option;
wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;
wrapMap.th=wrapMap.td;
if(!jQuery.support.htmlSerialize){wrapMap._default=[1,"div<div>","</div>"]
}jQuery.fn.extend({text:function(value){return jQuery.access(this,function(value){return value===undefined?jQuery.text(this):this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(value))
},null,value,arguments.length)
},wrapAll:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i))
})
}if(this[0]){var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);
if(this[0].parentNode){wrap.insertBefore(this[0])
}wrap.map(function(){var elem=this;
while(elem.firstChild&&elem.firstChild.nodeType===1){elem=elem.firstChild
}return elem
}).append(this)
}return this
},wrapInner:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i))
})
}return this.each(function(){var self=jQuery(this),contents=self.contents();
if(contents.length){contents.wrapAll(html)
}else{self.append(html)
}})
},wrap:function(html){var isFunction=jQuery.isFunction(html);
return this.each(function(i){jQuery(this).wrapAll(isFunction?html.call(this,i):html)
})
},unwrap:function(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes)
}}).end()
},append:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.appendChild(elem)
}})
},prepend:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.insertBefore(elem,this.firstChild)
}})
},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this)
})
}else{if(arguments.length){var set=jQuery.clean(arguments);
set.push.apply(set,this.toArray());
return this.pushStack(set,"before",arguments)
}}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)
})
}else{if(arguments.length){var set=this.pushStack(this,"after",arguments);
set.push.apply(set,jQuery.clean(arguments));
return set
}}},remove:function(selector,keepData){for(var i=0,elem;
(elem=this[i])!=null;
i++){if(!selector||jQuery.filter(selector,[elem]).length){if(!keepData&&elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));
jQuery.cleanData([elem])
}if(elem.parentNode){elem.parentNode.removeChild(elem)
}}}return this
},empty:function(){for(var i=0,elem;
(elem=this[i])!=null;
i++){if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"))
}while(elem.firstChild){elem.removeChild(elem.firstChild)
}}return this
},clone:function(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;
deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;
return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents)
})
},html:function(value){return jQuery.access(this,function(value){var elem=this[0]||{},i=0,l=this.length;
if(value===undefined){return elem.nodeType===1?elem.innerHTML.replace(rinlinejQuery,""):null
}if(typeof value==="string"&&!rnoInnerhtml.test(value)&&(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,"<$1></$2>");
try{for(;
i<l;
i++){elem=this[i]||{};
if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));
elem.innerHTML=value
}}elem=0
}catch(e){}}if(elem){this.empty().append(value)
}},null,value,arguments.length)
},replaceWith:function(value){if(this[0]&&this[0].parentNode){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this),old=self.html();
self.replaceWith(value.call(this,i,old))
})
}if(typeof value!=="string"){value=jQuery(value).detach()
}return this.each(function(){var next=this.nextSibling,parent=this.parentNode;
jQuery(this).remove();
if(next){jQuery(next).before(value)
}else{jQuery(parent).append(value)
}})
}else{return this.length?this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value):this
}},detach:function(selector){return this.remove(selector,true)
},domManip:function(args,table,callback){var results,first,fragment,parent,value=args[0],scripts=[];
if(!jQuery.support.checkClone&&arguments.length===3&&typeof value==="string"&&rchecked.test(value)){return this.each(function(){jQuery(this).domManip(args,table,callback,true)
})
}if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);
args[0]=value.call(this,i,table?self.html():undefined);
self.domManip(args,table,callback)
})
}if(this[0]){parent=value&&value.parentNode;
if(jQuery.support.parentNode&&parent&&parent.nodeType===11&&parent.childNodes.length===this.length){results={fragment:parent}
}else{results=jQuery.buildFragment(args,this,scripts)
}fragment=results.fragment;
if(fragment.childNodes.length===1){first=fragment=fragment.firstChild
}else{first=fragment.firstChild
}if(first){table=table&&jQuery.nodeName(first,"tr");
for(var i=0,l=this.length,lastIndex=l-1;
i<l;
i++){callback.call(table?root(this[i],first):this[i],results.cacheable||(l>1&&i<lastIndex)?jQuery.clone(fragment,true,true):fragment)
}}if(scripts.length){jQuery.each(scripts,function(i,elem){if(elem.src){jQuery.ajax({type:"GET",global:false,url:elem.src,async:false,dataType:"script"})
}else{jQuery.globalEval((elem.text||elem.textContent||elem.innerHTML||"").replace(rcleanScript,"/*$0*/"))
}if(elem.parentNode){elem.parentNode.removeChild(elem)
}})
}}return this
}});
function root(elem,cur){return jQuery.nodeName(elem,"table")?(elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody"))):elem
}function cloneCopyEvent(src,dest){if(dest.nodeType!==1||!jQuery.hasData(src)){return 
}var type,i,l,oldData=jQuery._data(src),curData=jQuery._data(dest,oldData),events=oldData.events;
if(events){delete curData.handle;
curData.events={};
for(type in events){for(i=0,l=events[type].length;
i<l;
i++){jQuery.event.add(dest,type,events[type][i])
}}}if(curData.data){curData.data=jQuery.extend({},curData.data)
}}function cloneFixAttributes(src,dest){var nodeName;
if(dest.nodeType!==1){return 
}if(dest.clearAttributes){dest.clearAttributes()
}if(dest.mergeAttributes){dest.mergeAttributes(src)
}nodeName=dest.nodeName.toLowerCase();
if(nodeName==="object"){dest.outerHTML=src.outerHTML
}else{if(nodeName==="input"&&(src.type==="checkbox"||src.type==="radio")){if(src.checked){dest.defaultChecked=dest.checked=src.checked
}if(dest.value!==src.value){dest.value=src.value
}}else{if(nodeName==="option"){dest.selected=src.defaultSelected
}else{if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue
}else{if(nodeName==="script"&&dest.text!==src.text){dest.text=src.text
}}}}}dest.removeAttribute(jQuery.expando);
dest.removeAttribute("_submit_attached");
dest.removeAttribute("_change_attached")
}jQuery.buildFragment=function(args,nodes,scripts){var fragment,cacheable,cacheresults,doc,first=args[0];
if(nodes&&nodes[0]){doc=nodes[0].ownerDocument||nodes[0]
}if(!doc.createDocumentFragment){doc=document
}if(args.length===1&&typeof first==="string"&&first.length<512&&doc===document&&first.charAt(0)==="<"&&!rnocache.test(first)&&(jQuery.support.checkClone||!rchecked.test(first))&&(jQuery.support.html5Clone||!rnoshimcache.test(first))){cacheable=true;
cacheresults=jQuery.fragments[first];
if(cacheresults&&cacheresults!==1){fragment=cacheresults
}}if(!fragment){fragment=doc.createDocumentFragment();
jQuery.clean(args,doc,fragment,scripts)
}if(cacheable){jQuery.fragments[first]=cacheresults?fragment:1
}return{fragment:fragment,cacheable:cacheable}
};
jQuery.fragments={};
jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var ret=[],insert=jQuery(selector),parent=this.length===1&&this[0].parentNode;
if(parent&&parent.nodeType===11&&parent.childNodes.length===1&&insert.length===1){insert[original](this[0]);
return this
}else{for(var i=0,l=insert.length;
i<l;
i++){var elems=(i>0?this.clone(true):this).get();
jQuery(insert[i])[original](elems);
ret=ret.concat(elems)
}return this.pushStack(ret,name,insert.selector)
}}
});
function getAll(elem){if(typeof elem.getElementsByTagName!=="undefined"){return elem.getElementsByTagName("*")
}else{if(typeof elem.querySelectorAll!=="undefined"){return elem.querySelectorAll("*")
}else{return[]
}}}function fixDefaultChecked(elem){if(elem.type==="checkbox"||elem.type==="radio"){elem.defaultChecked=elem.checked
}}function findInputs(elem){var nodeName=(elem.nodeName||"").toLowerCase();
if(nodeName==="input"){fixDefaultChecked(elem)
}else{if(nodeName!=="script"&&typeof elem.getElementsByTagName!=="undefined"){jQuery.grep(elem.getElementsByTagName("input"),fixDefaultChecked)
}}}function shimCloneNode(elem){var div=document.createElement("div");
safeFragment.appendChild(div);
div.innerHTML=elem.outerHTML;
return div.firstChild
}jQuery.extend({clone:function(elem,dataAndEvents,deepDataAndEvents){var srcElements,destElements,i,clone=jQuery.support.html5Clone||jQuery.isXMLDoc(elem)||!rnoshimcache.test("<"+elem.nodeName+">")?elem.cloneNode(true):shimCloneNode(elem);
if((!jQuery.support.noCloneEvent||!jQuery.support.noCloneChecked)&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){cloneFixAttributes(elem,clone);
srcElements=getAll(elem);
destElements=getAll(clone);
for(i=0;
srcElements[i];
++i){if(destElements[i]){cloneFixAttributes(srcElements[i],destElements[i])
}}}if(dataAndEvents){cloneCopyEvent(elem,clone);
if(deepDataAndEvents){srcElements=getAll(elem);
destElements=getAll(clone);
for(i=0;
srcElements[i];
++i){cloneCopyEvent(srcElements[i],destElements[i])
}}}srcElements=destElements=null;
return clone
},clean:function(elems,context,fragment,scripts){var checkScriptType,script,j,ret=[];
context=context||document;
if(typeof context.createElement==="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document
}for(var i=0,elem;
(elem=elems[i])!=null;
i++){if(typeof elem==="number"){elem+=""
}if(!elem){continue
}if(typeof elem==="string"){if(!rhtml.test(elem)){elem=context.createTextNode(elem)
}else{elem=elem.replace(rxhtmlTag,"<$1></$2>");
var tag=(rtagName.exec(elem)||["",""])[1].toLowerCase(),wrap=wrapMap[tag]||wrapMap._default,depth=wrap[0],div=context.createElement("div"),safeChildNodes=safeFragment.childNodes,remove;
if(context===document){safeFragment.appendChild(div)
}else{createSafeFragment(context).appendChild(div)
}div.innerHTML=wrap[1]+elem+wrap[2];
while(depth--){div=div.lastChild
}if(!jQuery.support.tbody){var hasBody=rtbody.test(elem),tbody=tag==="table"&&!hasBody?div.firstChild&&div.firstChild.childNodes:wrap[1]==="<table>"&&!hasBody?div.childNodes:[];
for(j=tbody.length-1;
j>=0;
--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])
}}}if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild)
}elem=div.childNodes;
if(div){div.parentNode.removeChild(div);
if(safeChildNodes.length>0){remove=safeChildNodes[safeChildNodes.length-1];
if(remove&&remove.parentNode){remove.parentNode.removeChild(remove)
}}}}}var len;
if(!jQuery.support.appendChecked){if(elem[0]&&typeof (len=elem.length)==="number"){for(j=0;
j<len;
j++){findInputs(elem[j])
}}else{findInputs(elem)
}}if(elem.nodeType){ret.push(elem)
}else{ret=jQuery.merge(ret,elem)
}}if(fragment){checkScriptType=function(elem){return !elem.type||rscriptType.test(elem.type)
};
for(i=0;
ret[i];
i++){script=ret[i];
if(scripts&&jQuery.nodeName(script,"script")&&(!script.type||rscriptType.test(script.type))){scripts.push(script.parentNode?script.parentNode.removeChild(script):script)
}else{if(script.nodeType===1){var jsTags=jQuery.grep(script.getElementsByTagName("script"),checkScriptType);
ret.splice.apply(ret,[i+1,0].concat(jsTags))
}fragment.appendChild(script)
}}}return ret
},cleanData:function(elems){var data,id,cache=jQuery.cache,special=jQuery.event.special,deleteExpando=jQuery.support.deleteExpando;
for(var i=0,elem;
(elem=elems[i])!=null;
i++){if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){continue
}id=elem[jQuery.expando];
if(id){data=cache[id];
if(data&&data.events){for(var type in data.events){if(special[type]){jQuery.event.remove(elem,type)
}else{jQuery.removeEvent(elem,type,data.handle)
}}if(data.handle){data.handle.elem=null
}}if(deleteExpando){delete elem[jQuery.expando]
}else{if(elem.removeAttribute){elem.removeAttribute(jQuery.expando)
}}delete cache[id]
}}}});
var ralpha=/alpha\([^)]*\)/i,ropacity=/opacity=([^)]*)/,rupper=/([A-Z]|^ms)/g,rnum=/^[\-+]?(?:\d*\.)?\d+$/i,rnumnonpx=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,rrelNum=/^([\-+])=([\-+.\de]+)/,rmargin=/^margin/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssExpand=["Top","Right","Bottom","Left"],curCSS,getComputedStyle,currentStyle;
jQuery.fn.css=function(name,value){return jQuery.access(this,function(elem,name,value){return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name)
},name,value,arguments.length>1)
};
jQuery.extend({cssHooks:{opacity:{get:function(elem,computed){if(computed){var ret=curCSS(elem,"opacity");
return ret===""?"1":ret
}else{return elem.style.opacity
}}}},cssNumber:{fillOpacity:true,fontWeight:true,lineHeight:true,opacity:true,orphans:true,widows:true,zIndex:true,zoom:true},cssProps:{"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"},style:function(elem,name,value,extra){if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return 
}var ret,type,origName=jQuery.camelCase(name),style=elem.style,hooks=jQuery.cssHooks[origName];
name=jQuery.cssProps[origName]||origName;
if(value!==undefined){type=typeof value;
if(type==="string"&&(ret=rrelNum.exec(value))){value=(+(ret[1]+1)*+ret[2])+parseFloat(jQuery.css(elem,name));
type="number"
}if(value==null||type==="number"&&isNaN(value)){return 
}if(type==="number"&&!jQuery.cssNumber[origName]){value+="px"
}if(!hooks||!("set" in hooks)||(value=hooks.set(elem,value))!==undefined){try{style[name]=value
}catch(e){}}}else{if(hooks&&"get" in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret
}return style[name]
}},css:function(elem,name,extra){var ret,hooks;
name=jQuery.camelCase(name);
hooks=jQuery.cssHooks[name];
name=jQuery.cssProps[name]||name;
if(name==="cssFloat"){name="float"
}if(hooks&&"get" in hooks&&(ret=hooks.get(elem,true,extra))!==undefined){return ret
}else{if(curCSS){return curCSS(elem,name)
}}},swap:function(elem,options,callback){var old={},ret,name;
for(name in options){old[name]=elem.style[name];
elem.style[name]=options[name]
}ret=callback.call(elem);
for(name in options){elem.style[name]=old[name]
}return ret
}});
jQuery.curCSS=jQuery.css;
if(document.defaultView&&document.defaultView.getComputedStyle){getComputedStyle=function(elem,name){var ret,defaultView,computedStyle,width,style=elem.style;
name=name.replace(rupper,"-$1").toLowerCase();
if((defaultView=elem.ownerDocument.defaultView)&&(computedStyle=defaultView.getComputedStyle(elem,null))){ret=computedStyle.getPropertyValue(name);
if(ret===""&&!jQuery.contains(elem.ownerDocument.documentElement,elem)){ret=jQuery.style(elem,name)
}}if(!jQuery.support.pixelMargin&&computedStyle&&rmargin.test(name)&&rnumnonpx.test(ret)){width=style.width;
style.width=ret;
ret=computedStyle.width;
style.width=width
}return ret
}
}if(document.documentElement.currentStyle){currentStyle=function(elem,name){var left,rsLeft,uncomputed,ret=elem.currentStyle&&elem.currentStyle[name],style=elem.style;
if(ret==null&&style&&(uncomputed=style[name])){ret=uncomputed
}if(rnumnonpx.test(ret)){left=style.left;
rsLeft=elem.runtimeStyle&&elem.runtimeStyle.left;
if(rsLeft){elem.runtimeStyle.left=elem.currentStyle.left
}style.left=name==="fontSize"?"1em":ret;
ret=style.pixelLeft+"px";
style.left=left;
if(rsLeft){elem.runtimeStyle.left=rsLeft
}}return ret===""?"auto":ret
}
}curCSS=getComputedStyle||currentStyle;
function getWidthOrHeight(elem,name,extra){var val=name==="width"?elem.offsetWidth:elem.offsetHeight,i=name==="width"?1:0,len=4;
if(val>0){if(extra!=="border"){for(;
i<len;
i+=2){if(!extra){val-=parseFloat(jQuery.css(elem,"padding"+cssExpand[i]))||0
}if(extra==="margin"){val+=parseFloat(jQuery.css(elem,extra+cssExpand[i]))||0
}else{val-=parseFloat(jQuery.css(elem,"border"+cssExpand[i]+"Width"))||0
}}}return val+"px"
}val=curCSS(elem,name);
if(val<0||val==null){val=elem.style[name]
}if(rnumnonpx.test(val)){return val
}val=parseFloat(val)||0;
if(extra){for(;
i<len;
i+=2){val+=parseFloat(jQuery.css(elem,"padding"+cssExpand[i]))||0;
if(extra!=="padding"){val+=parseFloat(jQuery.css(elem,"border"+cssExpand[i]+"Width"))||0
}if(extra==="margin"){val+=parseFloat(jQuery.css(elem,extra+cssExpand[i]))||0
}}}return val+"px"
}jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function(elem,computed,extra){if(computed){if(elem.offsetWidth!==0){return getWidthOrHeight(elem,name,extra)
}else{return jQuery.swap(elem,cssShow,function(){return getWidthOrHeight(elem,name,extra)
})
}}},set:function(elem,value){return rnum.test(value)?value+"px":value
}}
});
if(!jQuery.support.opacity){jQuery.cssHooks.opacity={get:function(elem,computed){return ropacity.test((computed&&elem.currentStyle?elem.currentStyle.filter:elem.style.filter)||"")?(parseFloat(RegExp.$1)/100)+"":computed?"1":""
},set:function(elem,value){var style=elem.style,currentStyle=elem.currentStyle,opacity=jQuery.isNumeric(value)?"alpha(opacity="+value*100+")":"",filter=currentStyle&&currentStyle.filter||style.filter||"";
style.zoom=1;
if(value>=1&&jQuery.trim(filter.replace(ralpha,""))===""){style.removeAttribute("filter");
if(currentStyle&&!currentStyle.filter){return 
}}style.filter=ralpha.test(filter)?filter.replace(ralpha,opacity):filter+" "+opacity
}}
}jQuery(function(){if(!jQuery.support.reliableMarginRight){jQuery.cssHooks.marginRight={get:function(elem,computed){return jQuery.swap(elem,{display:"inline-block"},function(){if(computed){return curCSS(elem,"margin-right")
}else{return elem.style.marginRight
}})
}}
}});
if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.hidden=function(elem){var width=elem.offsetWidth,height=elem.offsetHeight;
return(width===0&&height===0)||(!jQuery.support.reliableHiddenOffsets&&((elem.style&&elem.style.display)||jQuery.css(elem,"display"))==="none")
};
jQuery.expr.filters.visible=function(elem){return !jQuery.expr.filters.hidden(elem)
}
}jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function(value){var i,parts=typeof value==="string"?value.split(" "):[value],expanded={};
for(i=0;
i<4;
i++){expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0]
}return expanded
}}
});
var r20=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rhash=/#.*$/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,rinput=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,rlocalProtocol=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rquery=/\?/,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,rselectTextarea=/^(?:select|textarea)/i,rspacesAjax=/\s+/,rts=/([?&])_=[^&]*/,rurl=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,_load=jQuery.fn.load,prefilters={},transports={},ajaxLocation,ajaxLocParts,allTypes=["*/"]+["*"];
try{ajaxLocation=location.href
}catch(e){ajaxLocation=document.createElement("a");
ajaxLocation.href="";
ajaxLocation=ajaxLocation.href
}ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[];
function addToPrefiltersOrTransports(structure){return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;
dataTypeExpression="*"
}if(jQuery.isFunction(func)){var dataTypes=dataTypeExpression.toLowerCase().split(rspacesAjax),i=0,length=dataTypes.length,dataType,list,placeBefore;
for(;
i<length;
i++){dataType=dataTypes[i];
placeBefore=/^\+/.test(dataType);
if(placeBefore){dataType=dataType.substr(1)||"*"
}list=structure[dataType]=structure[dataType]||[];
list[placeBefore?"unshift":"push"](func)
}}}
}function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,dataType,inspected){dataType=dataType||options.dataTypes[0];
inspected=inspected||{};
inspected[dataType]=true;
var list=structure[dataType],i=0,length=list?list.length:0,executeOnly=(structure===prefilters),selection;
for(;
i<length&&(executeOnly||!selection);
i++){selection=list[i](options,originalOptions,jqXHR);
if(typeof selection==="string"){if(!executeOnly||inspected[selection]){selection=undefined
}else{options.dataTypes.unshift(selection);
selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,selection,inspected)
}}}if((executeOnly||!selection)&&!inspected["*"]){selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,"*",inspected)
}return selection
}function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};
for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:(deep||(deep={})))[key]=src[key]
}}if(deep){jQuery.extend(true,target,deep)
}}jQuery.fn.extend({load:function(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments)
}else{if(!this.length){return this
}}var off=url.indexOf(" ");
if(off>=0){var selector=url.slice(off,url.length);
url=url.slice(0,off)
}var type="GET";
if(params){if(jQuery.isFunction(params)){callback=params;
params=undefined
}else{if(typeof params==="object"){params=jQuery.param(params,jQuery.ajaxSettings.traditional);
type="POST"
}}}var self=this;
jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(jqXHR,status,responseText){responseText=jqXHR.responseText;
if(jqXHR.isResolved()){jqXHR.done(function(r){responseText=r
});
self.html(selector?jQuery("<div>").append(responseText.replace(rscript,"")).find(selector):responseText)
}if(callback){self.each(callback,[responseText,status,jqXHR])
}}});
return this
},serialize:function(){return jQuery.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?jQuery.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type))
}).map(function(i,elem){var val=jQuery(this).val();
return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val,i){return{name:elem.name,value:val.replace(rCRLF,"\r\n")}
}):{name:elem.name,value:val.replace(rCRLF,"\r\n")}
}).get()
}});
jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){jQuery.fn[o]=function(f){return this.on(o,f)
}
});
jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;
callback=data;
data=undefined
}return jQuery.ajax({type:method,url:url,data:data,success:callback,dataType:type})
}
});
jQuery.extend({getScript:function(url,callback){return jQuery.get(url,undefined,callback,"script")
},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")
},ajaxSetup:function(target,settings){if(settings){ajaxExtend(target,jQuery.ajaxSettings)
}else{settings=target;
target=jQuery.ajaxSettings
}ajaxExtend(target,settings);
return target
},ajaxSettings:{url:ajaxLocation,isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:true,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:true,async:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":allTypes},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":window.String,"text html":true,"text json":jQuery.parseJSON,"text xml":jQuery.parseXML},flatOptions:{context:true,url:true}},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),ajax:function(url,options){if(typeof url==="object"){options=url;
url=undefined
}options=options||{};
var s=jQuery.ajaxSetup({},options),callbackContext=s.context||s,globalEventContext=callbackContext!==s&&(callbackContext.nodeType||callbackContext instanceof jQuery)?jQuery(callbackContext):jQuery.event,deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),statusCode=s.statusCode||{},ifModifiedKey,requestHeaders={},requestHeadersNames={},responseHeadersString,responseHeaders,transport,timeoutTimer,parts,state=0,fireGlobals,i,jqXHR={readyState:0,setRequestHeader:function(name,value){if(!state){var lname=name.toLowerCase();
name=requestHeadersNames[lname]=requestHeadersNames[lname]||name;
requestHeaders[name]=value
}return this
},getAllResponseHeaders:function(){return state===2?responseHeadersString:null
},getResponseHeader:function(key){var match;
if(state===2){if(!responseHeaders){responseHeaders={};
while((match=rheaders.exec(responseHeadersString))){responseHeaders[match[1].toLowerCase()]=match[2]
}}match=responseHeaders[key.toLowerCase()]
}return match===undefined?null:match
},overrideMimeType:function(type){if(!state){s.mimeType=type
}return this
},abort:function(statusText){statusText=statusText||"abort";
if(transport){transport.abort(statusText)
}done(0,statusText);
return this
}};
function done(status,nativeStatusText,responses,headers){if(state===2){return 
}state=2;
if(timeoutTimer){clearTimeout(timeoutTimer)
}transport=undefined;
responseHeadersString=headers||"";
jqXHR.readyState=status>0?4:0;
var isSuccess,success,error,statusText=nativeStatusText,response=responses?ajaxHandleResponses(s,jqXHR,responses):undefined,lastModified,etag;
if(status>=200&&status<300||status===304){if(s.ifModified){if((lastModified=jqXHR.getResponseHeader("Last-Modified"))){jQuery.lastModified[ifModifiedKey]=lastModified
}if((etag=jqXHR.getResponseHeader("Etag"))){jQuery.etag[ifModifiedKey]=etag
}}if(status===304){statusText="notmodified";
isSuccess=true
}else{try{success=ajaxConvert(s,response);
statusText="success";
isSuccess=true
}catch(e){statusText="parsererror";
error=e
}}}else{error=statusText;
if(!statusText||status){statusText="error";
if(status<0){status=0
}}}jqXHR.status=status;
jqXHR.statusText=""+(nativeStatusText||statusText);
if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR])
}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error])
}jqXHR.statusCode(statusCode);
statusCode=undefined;
if(fireGlobals){globalEventContext.trigger("ajax"+(isSuccess?"Success":"Error"),[jqXHR,s,isSuccess?success:error])
}completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);
if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);
if(!(--jQuery.active)){jQuery.event.trigger("ajaxStop")
}}}deferred.promise(jqXHR);
jqXHR.success=jqXHR.done;
jqXHR.error=jqXHR.fail;
jqXHR.complete=completeDeferred.add;
jqXHR.statusCode=function(map){if(map){var tmp;
if(state<2){for(tmp in map){statusCode[tmp]=[statusCode[tmp],map[tmp]]
}}else{tmp=map[jqXHR.status];
jqXHR.then(tmp,tmp)
}}return this
};
s.url=((url||s.url)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//");
s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().split(rspacesAjax);
if(s.crossDomain==null){parts=rurl.exec(s.url.toLowerCase());
s.crossDomain=!!(parts&&(parts[1]!=ajaxLocParts[1]||parts[2]!=ajaxLocParts[2]||(parts[3]||(parts[1]==="http:"?80:443))!=(ajaxLocParts[3]||(ajaxLocParts[1]==="http:"?80:443))))
}if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional)
}inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);
if(state===2){return false
}fireGlobals=s.global;
s.type=s.type.toUpperCase();
s.hasContent=!rnoContent.test(s.type);
if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart")
}if(!s.hasContent){if(s.data){s.url+=(rquery.test(s.url)?"&":"?")+s.data;
delete s.data
}ifModifiedKey=s.url;
if(s.cache===false){var ts=jQuery.now(),ret=s.url.replace(rts,"$1_="+ts);
s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+ts:"")
}}if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType)
}if(s.ifModified){ifModifiedKey=ifModifiedKey||s.url;
if(jQuery.lastModified[ifModifiedKey]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[ifModifiedKey])
}if(jQuery.etag[ifModifiedKey]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[ifModifiedKey])
}}jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);
for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i])
}if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){jqXHR.abort();
return false
}for(i in {success:1,error:1,complete:1}){jqXHR[i](s[i])
}transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);
if(!transport){done(-1,"No Transport")
}else{jqXHR.readyState=1;
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s])
}if(s.async&&s.timeout>0){timeoutTimer=setTimeout(function(){jqXHR.abort("timeout")
},s.timeout)
}try{state=1;
transport.send(requestHeaders,done)
}catch(e){if(state<2){done(-1,e)
}else{throw e
}}}return jqXHR
},param:function(a,traditional){var s=[],add=function(key,value){value=jQuery.isFunction(value)?value():value;
s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value)
};
if(traditional===undefined){traditional=jQuery.ajaxSettings.traditional
}if(jQuery.isArray(a)||(a.jquery&&!jQuery.isPlainObject(a))){jQuery.each(a,function(){add(this.name,this.value)
})
}else{for(var prefix in a){buildParams(prefix,a[prefix],traditional,add)
}}return s.join("&").replace(r20,"+")
}});
function buildParams(prefix,obj,traditional,add){if(jQuery.isArray(obj)){jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){add(prefix,v)
}else{buildParams(prefix+"["+(typeof v==="object"?i:"")+"]",v,traditional,add)
}})
}else{if(!traditional&&jQuery.type(obj)==="object"){for(var name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add)
}}else{add(prefix,obj)
}}}jQuery.extend({active:0,lastModified:{},etag:{}});
function ajaxHandleResponses(s,jqXHR,responses){var contents=s.contents,dataTypes=s.dataTypes,responseFields=s.responseFields,ct,type,finalDataType,firstDataType;
for(type in responseFields){if(type in responses){jqXHR[responseFields[type]]=responses[type]
}}while(dataTypes[0]==="*"){dataTypes.shift();
if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("content-type")
}}if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);
break
}}}if(dataTypes[0] in responses){finalDataType=dataTypes[0]
}else{for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;
break
}if(!firstDataType){firstDataType=type
}}finalDataType=finalDataType||firstDataType
}if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType)
}return responses[finalDataType]
}}function ajaxConvert(s,response){if(s.dataFilter){response=s.dataFilter(response,s.dataType)
}var dataTypes=s.dataTypes,converters={},i,key,length=dataTypes.length,tmp,current=dataTypes[0],prev,conversion,conv,conv1,conv2;
for(i=1;
i<length;
i++){if(i===1){for(key in s.converters){if(typeof key==="string"){converters[key.toLowerCase()]=s.converters[key]
}}}prev=current;
current=dataTypes[i];
if(current==="*"){current=prev
}else{if(prev!=="*"&&prev!==current){conversion=prev+" "+current;
conv=converters[conversion]||converters["* "+current];
if(!conv){conv2=undefined;
for(conv1 in converters){tmp=conv1.split(" ");
if(tmp[0]===prev||tmp[0]==="*"){conv2=converters[tmp[1]+" "+current];
if(conv2){conv1=converters[conv1];
if(conv1===true){conv=conv2
}else{if(conv2===true){conv=conv1
}}break
}}}}if(!(conv||conv2)){jQuery.error("No conversion from "+conversion.replace(" "," to "))
}if(conv!==true){response=conv?conv(response):conv2(conv1(response))
}}}}return response
}var jsc=jQuery.now(),jsre=/(\=)\?(&|$)|\?\?/i;
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return jQuery.expando+"_"+(jsc++)
}});
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var inspectData=(typeof s.data==="string")&&/^application\/x\-www\-form\-urlencoded/.test(s.contentType);
if(s.dataTypes[0]==="jsonp"||s.jsonp!==false&&(jsre.test(s.url)||inspectData&&jsre.test(s.data))){var responseContainer,jsonpCallback=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback,previous=window[jsonpCallback],url=s.url,data=s.data,replace="$1"+jsonpCallback+"$2";
if(s.jsonp!==false){url=url.replace(jsre,replace);
if(s.url===url){if(inspectData){data=data.replace(jsre,replace)
}if(s.data===data){url+=(/\?/.test(url)?"&":"?")+s.jsonp+"="+jsonpCallback
}}}s.url=url;
s.data=data;
window[jsonpCallback]=function(response){responseContainer=[response]
};
jqXHR.always(function(){window[jsonpCallback]=previous;
if(responseContainer&&jQuery.isFunction(previous)){window[jsonpCallback](responseContainer[0])
}});
s.converters["script json"]=function(){if(!responseContainer){jQuery.error(jsonpCallback+" was not called")
}return responseContainer[0]
};
s.dataTypes[0]="json";
return"script"
}});
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(text){jQuery.globalEval(text);
return text
}}});
jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false
}if(s.crossDomain){s.type="GET";
s.global=false
}});
jQuery.ajaxTransport("script",function(s){if(s.crossDomain){var script,head=document.head||document.getElementsByTagName("head")[0]||document.documentElement;
return{send:function(_,callback){script=document.createElement("script");
script.async="async";
if(s.scriptCharset){script.charset=s.scriptCharset
}script.src=s.url;
script.onload=script.onreadystatechange=function(_,isAbort){if(isAbort||!script.readyState||/loaded|complete/.test(script.readyState)){script.onload=script.onreadystatechange=null;
if(head&&script.parentNode){head.removeChild(script)
}script=undefined;
if(!isAbort){callback(200,"success")
}}};
head.insertBefore(script,head.firstChild)
},abort:function(){if(script){script.onload(0,1)
}}}
}});
var xhrOnUnloadAbort=window.ActiveXObject?function(){for(var key in xhrCallbacks){xhrCallbacks[key](0,1)
}}:false,xhrId=0,xhrCallbacks;
function createStandardXHR(){try{return new window.XMLHttpRequest()
}catch(e){}}function createActiveXHR(){try{return new window.ActiveXObject("Microsoft.XMLHTTP")
}catch(e){}}jQuery.ajaxSettings.xhr=window.ActiveXObject?function(){return !this.isLocal&&createStandardXHR()||createActiveXHR()
}:createStandardXHR;
(function(xhr){jQuery.extend(jQuery.support,{ajax:!!xhr,cors:!!xhr&&("withCredentials" in xhr)})
})(jQuery.ajaxSettings.xhr());
if(jQuery.support.ajax){jQuery.ajaxTransport(function(s){if(!s.crossDomain||jQuery.support.cors){var callback;
return{send:function(headers,complete){var xhr=s.xhr(),handle,i;
if(s.username){xhr.open(s.type,s.url,s.async,s.username,s.password)
}else{xhr.open(s.type,s.url,s.async)
}if(s.xhrFields){for(i in s.xhrFields){xhr[i]=s.xhrFields[i]
}}if(s.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(s.mimeType)
}if(!s.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest"
}try{for(i in headers){xhr.setRequestHeader(i,headers[i])
}}catch(_){}xhr.send((s.hasContent&&s.data)||null);
callback=function(_,isAbort){var status,statusText,responseHeaders,responses,xml;
try{if(callback&&(isAbort||xhr.readyState===4)){callback=undefined;
if(handle){xhr.onreadystatechange=jQuery.noop;
if(xhrOnUnloadAbort){delete xhrCallbacks[handle]
}}if(isAbort){if(xhr.readyState!==4){xhr.abort()
}}else{status=xhr.status;
responseHeaders=xhr.getAllResponseHeaders();
responses={};
xml=xhr.responseXML;
if(xml&&xml.documentElement){responses.xml=xml
}try{responses.text=xhr.responseText
}catch(_){}try{statusText=xhr.statusText
}catch(e){statusText=""
}if(!status&&s.isLocal&&!s.crossDomain){status=responses.text?200:404
}else{if(status===1223){status=204
}}}}}catch(firefoxAccessException){if(!isAbort){complete(-1,firefoxAccessException)
}}if(responses){complete(status,statusText,responses,responseHeaders)
}};
if(!s.async||xhr.readyState===4){callback()
}else{handle=++xhrId;
if(xhrOnUnloadAbort){if(!xhrCallbacks){xhrCallbacks={};
jQuery(window).unload(xhrOnUnloadAbort)
}xhrCallbacks[handle]=callback
}xhr.onreadystatechange=callback
}},abort:function(){if(callback){callback(0,1)
}}}
}})
}var elemdisplay={},iframe,iframeDoc,rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,timerId,fxAttrs=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],fxNow;
jQuery.fn.extend({show:function(speed,easing,callback){var elem,display;
if(speed||speed===0){return this.animate(genFx("show",3),speed,easing,callback)
}else{for(var i=0,j=this.length;
i<j;
i++){elem=this[i];
if(elem.style){display=elem.style.display;
if(!jQuery._data(elem,"olddisplay")&&display==="none"){display=elem.style.display=""
}if((display===""&&jQuery.css(elem,"display")==="none")||!jQuery.contains(elem.ownerDocument.documentElement,elem)){jQuery._data(elem,"olddisplay",defaultDisplay(elem.nodeName))
}}}for(i=0;
i<j;
i++){elem=this[i];
if(elem.style){display=elem.style.display;
if(display===""||display==="none"){elem.style.display=jQuery._data(elem,"olddisplay")||""
}}}return this
}},hide:function(speed,easing,callback){if(speed||speed===0){return this.animate(genFx("hide",3),speed,easing,callback)
}else{var elem,display,i=0,j=this.length;
for(;
i<j;
i++){elem=this[i];
if(elem.style){display=jQuery.css(elem,"display");
if(display!=="none"&&!jQuery._data(elem,"olddisplay")){jQuery._data(elem,"olddisplay",display)
}}}for(i=0;
i<j;
i++){if(this[i].style){this[i].style.display="none"
}}return this
}},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2,callback){var bool=typeof fn==="boolean";
if(jQuery.isFunction(fn)&&jQuery.isFunction(fn2)){this._toggle.apply(this,arguments)
}else{if(fn==null||bool){this.each(function(){var state=bool?fn:jQuery(this).is(":hidden");
jQuery(this)[state?"show":"hide"]()
})
}else{this.animate(genFx("toggle",3),fn,fn2,callback)
}}return this
},fadeTo:function(speed,to,easing,callback){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:to},speed,easing,callback)
},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);
if(jQuery.isEmptyObject(prop)){return this.each(optall.complete,[false])
}prop=jQuery.extend({},prop);
function doAnimation(){if(optall.queue===false){jQuery._mark(this)
}var opt=jQuery.extend({},optall),isElement=this.nodeType===1,hidden=isElement&&jQuery(this).is(":hidden"),name,val,p,e,hooks,replace,parts,start,end,unit,method;
opt.animatedProperties={};
for(p in prop){name=jQuery.camelCase(p);
if(p!==name){prop[name]=prop[p];
delete prop[p]
}if((hooks=jQuery.cssHooks[name])&&"expand" in hooks){replace=hooks.expand(prop[name]);
delete prop[name];
for(p in replace){if(!(p in prop)){prop[p]=replace[p]
}}}}for(name in prop){val=prop[name];
if(jQuery.isArray(val)){opt.animatedProperties[name]=val[1];
val=prop[name]=val[0]
}else{opt.animatedProperties[name]=opt.specialEasing&&opt.specialEasing[name]||opt.easing||"swing"
}if(val==="hide"&&hidden||val==="show"&&!hidden){return opt.complete.call(this)
}if(isElement&&(name==="height"||name==="width")){opt.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];
if(jQuery.css(this,"display")==="inline"&&jQuery.css(this,"float")==="none"){if(!jQuery.support.inlineBlockNeedsLayout||defaultDisplay(this.nodeName)==="inline"){this.style.display="inline-block"
}else{this.style.zoom=1
}}}}if(opt.overflow!=null){this.style.overflow="hidden"
}for(p in prop){e=new jQuery.fx(this,opt,p);
val=prop[p];
if(rfxtypes.test(val)){method=jQuery._data(this,"toggle"+p)||(val==="toggle"?hidden?"show":"hide":0);
if(method){jQuery._data(this,"toggle"+p,method==="show"?"hide":"show");
e[method]()
}else{e[val]()
}}else{parts=rfxnum.exec(val);
start=e.cur();
if(parts){end=parseFloat(parts[2]);
unit=parts[3]||(jQuery.cssNumber[p]?"":"px");
if(unit!=="px"){jQuery.style(this,p,(end||1)+unit);
start=((end||1)/e.cur())*start;
jQuery.style(this,p,start+unit)
}if(parts[1]){end=((parts[1]==="-="?-1:1)*end)+start
}e.custom(start,end,unit)
}else{e.custom(start,val,"")
}}}return true
}return optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation)
},stop:function(type,clearQueue,gotoEnd){if(typeof type!=="string"){gotoEnd=clearQueue;
clearQueue=type;
type=undefined
}if(clearQueue&&type!==false){this.queue(type||"fx",[])
}return this.each(function(){var index,hadTimers=false,timers=jQuery.timers,data=jQuery._data(this);
if(!gotoEnd){jQuery._unmark(true,this)
}function stopQueue(elem,data,index){var hooks=data[index];
jQuery.removeData(elem,index,true);
hooks.stop(gotoEnd)
}if(type==null){for(index in data){if(data[index]&&data[index].stop&&index.indexOf(".run")===index.length-4){stopQueue(this,data,index)
}}}else{if(data[index=type+".run"]&&data[index].stop){stopQueue(this,data,index)
}}for(index=timers.length;
index--;
){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){if(gotoEnd){timers[index](true)
}else{timers[index].saveState()
}hadTimers=true;
timers.splice(index,1)
}}if(!(gotoEnd&&hadTimers)){jQuery.dequeue(this,type)
}})
}});
function createFxNow(){setTimeout(clearFxNow,0);
return(fxNow=jQuery.now())
}function clearFxNow(){fxNow=undefined
}function genFx(type,num){var obj={};
jQuery.each(fxAttrs.concat.apply([],fxAttrs.slice(0,num)),function(){obj[this]=type
});
return obj
}jQuery.each({slideDown:genFx("show",1),slideUp:genFx("hide",1),slideToggle:genFx("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback)
}
});
jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};
opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;
if(opt.queue==null||opt.queue===true){opt.queue="fx"
}opt.old=opt.complete;
opt.complete=function(noUnmark){if(jQuery.isFunction(opt.old)){opt.old.call(this)
}if(opt.queue){jQuery.dequeue(this,opt.queue)
}else{if(noUnmark!==false){jQuery._unmark(this)
}}};
return opt
},easing:{linear:function(p){return p
},swing:function(p){return(-Math.cos(p*Math.PI)/2)+0.5
}},timers:[],fx:function(elem,options,prop){this.options=options;
this.elem=elem;
this.prop=prop;
options.orig=options.orig||{}
}});
jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)
}(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this)
},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]
}var parsed,r=jQuery.css(this.elem,this.prop);
return isNaN(parsed=parseFloat(r))?!r||r==="auto"?0:r:parsed
},custom:function(from,to,unit){var self=this,fx=jQuery.fx;
this.startTime=fxNow||createFxNow();
this.end=to;
this.now=this.start=from;
this.pos=this.state=0;
this.unit=unit||this.unit||(jQuery.cssNumber[this.prop]?"":"px");
function t(gotoEnd){return self.step(gotoEnd)
}t.queue=this.options.queue;
t.elem=this.elem;
t.saveState=function(){if(jQuery._data(self.elem,"fxshow"+self.prop)===undefined){if(self.options.hide){jQuery._data(self.elem,"fxshow"+self.prop,self.start)
}else{if(self.options.show){jQuery._data(self.elem,"fxshow"+self.prop,self.end)
}}}};
if(t()&&jQuery.timers.push(t)&&!timerId){timerId=setInterval(fx.tick,fx.interval)
}},show:function(){var dataShow=jQuery._data(this.elem,"fxshow"+this.prop);
this.options.orig[this.prop]=dataShow||jQuery.style(this.elem,this.prop);
this.options.show=true;
if(dataShow!==undefined){this.custom(this.cur(),dataShow)
}else{this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur())
}jQuery(this.elem).show()
},hide:function(){this.options.orig[this.prop]=jQuery._data(this.elem,"fxshow"+this.prop)||jQuery.style(this.elem,this.prop);
this.options.hide=true;
this.custom(this.cur(),0)
},step:function(gotoEnd){var p,n,complete,t=fxNow||createFxNow(),done=true,elem=this.elem,options=this.options;
if(gotoEnd||t>=options.duration+this.startTime){this.now=this.end;
this.pos=this.state=1;
this.update();
options.animatedProperties[this.prop]=true;
for(p in options.animatedProperties){if(options.animatedProperties[p]!==true){done=false
}}if(done){if(options.overflow!=null&&!jQuery.support.shrinkWrapBlocks){jQuery.each(["","X","Y"],function(index,value){elem.style["overflow"+value]=options.overflow[index]
})
}if(options.hide){jQuery(elem).hide()
}if(options.hide||options.show){for(p in options.animatedProperties){jQuery.style(elem,p,options.orig[p]);
jQuery.removeData(elem,"fxshow"+p,true);
jQuery.removeData(elem,"toggle"+p,true)
}}complete=options.complete;
if(complete){options.complete=false;
complete.call(elem)
}}return false
}else{if(options.duration==Infinity){this.now=t
}else{n=t-this.startTime;
this.state=n/options.duration;
this.pos=jQuery.easing[options.animatedProperties[this.prop]](this.state,n,0,1,options.duration);
this.now=this.start+((this.end-this.start)*this.pos)
}this.update()
}return true
}};
jQuery.extend(jQuery.fx,{tick:function(){var timer,timers=jQuery.timers,i=0;
for(;
i<timers.length;
i++){timer=timers[i];
if(!timer()&&timers[i]===timer){timers.splice(i--,1)
}}if(!timers.length){jQuery.fx.stop()
}},interval:13,stop:function(){clearInterval(timerId);
timerId=null
},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(fx){jQuery.style(fx.elem,"opacity",fx.now)
},_default:function(fx){if(fx.elem.style&&fx.elem.style[fx.prop]!=null){fx.elem.style[fx.prop]=fx.now+fx.unit
}else{fx.elem[fx.prop]=fx.now
}}}});
jQuery.each(fxAttrs.concat.apply([],fxAttrs),function(i,prop){if(prop.indexOf("margin")){jQuery.fx.step[prop]=function(fx){jQuery.style(fx.elem,prop,Math.max(0,fx.now)+fx.unit)
}
}});
if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem
}).length
}
}function defaultDisplay(nodeName){if(!elemdisplay[nodeName]){var body=document.body,elem=jQuery("<"+nodeName+">").appendTo(body),display=elem.css("display");
elem.remove();
if(display==="none"||display===""){if(!iframe){iframe=document.createElement("iframe");
iframe.frameBorder=iframe.width=iframe.height=0
}body.appendChild(iframe);
if(!iframeDoc||!iframe.createElement){iframeDoc=(iframe.contentWindow||iframe.contentDocument).document;
iframeDoc.write((jQuery.support.boxModel?"<!doctype html>":"")+"<html><body>");
iframeDoc.close()
}elem=iframeDoc.createElement(nodeName);
iframeDoc.body.appendChild(elem);
display=jQuery.css(elem,"display");
body.removeChild(iframe)
}elemdisplay[nodeName]=display
}return elemdisplay[nodeName]
}var getOffset,rtable=/^t(?:able|d|h)$/i,rroot=/^(?:body|html)$/i;
if("getBoundingClientRect" in document.documentElement){getOffset=function(elem,doc,docElem,box){try{box=elem.getBoundingClientRect()
}catch(e){}if(!box||!jQuery.contains(docElem,elem)){return box?{top:box.top,left:box.left}:{top:0,left:0}
}var body=doc.body,win=getWindow(doc),clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,scrollTop=win.pageYOffset||jQuery.support.boxModel&&docElem.scrollTop||body.scrollTop,scrollLeft=win.pageXOffset||jQuery.support.boxModel&&docElem.scrollLeft||body.scrollLeft,top=box.top+scrollTop-clientTop,left=box.left+scrollLeft-clientLeft;
return{top:top,left:left}
}
}else{getOffset=function(elem,doc,docElem){var computedStyle,offsetParent=elem.offsetParent,prevOffsetParent=elem,body=doc.body,defaultView=doc.defaultView,prevComputedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle,top=elem.offsetTop,left=elem.offsetLeft;
while((elem=elem.parentNode)&&elem!==body&&elem!==docElem){if(jQuery.support.fixedPosition&&prevComputedStyle.position==="fixed"){break
}computedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle;
top-=elem.scrollTop;
left-=elem.scrollLeft;
if(elem===offsetParent){top+=elem.offsetTop;
left+=elem.offsetLeft;
if(jQuery.support.doesNotAddBorder&&!(jQuery.support.doesAddBorderForTableAndCells&&rtable.test(elem.nodeName))){top+=parseFloat(computedStyle.borderTopWidth)||0;
left+=parseFloat(computedStyle.borderLeftWidth)||0
}prevOffsetParent=offsetParent;
offsetParent=elem.offsetParent
}if(jQuery.support.subtractsBorderForOverflowNotVisible&&computedStyle.overflow!=="visible"){top+=parseFloat(computedStyle.borderTopWidth)||0;
left+=parseFloat(computedStyle.borderLeftWidth)||0
}prevComputedStyle=computedStyle
}if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){top+=body.offsetTop;
left+=body.offsetLeft
}if(jQuery.support.fixedPosition&&prevComputedStyle.position==="fixed"){top+=Math.max(docElem.scrollTop,body.scrollTop);
left+=Math.max(docElem.scrollLeft,body.scrollLeft)
}return{top:top,left:left}
}
}jQuery.fn.offset=function(options){if(arguments.length){return options===undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i)
})
}var elem=this[0],doc=elem&&elem.ownerDocument;
if(!doc){return null
}if(elem===doc.body){return jQuery.offset.bodyOffset(elem)
}return getOffset(elem,doc,doc.documentElement)
};
jQuery.offset={bodyOffset:function(body){var top=body.offsetTop,left=body.offsetLeft;
if(jQuery.support.doesNotIncludeMarginInBodyOffset){top+=parseFloat(jQuery.css(body,"marginTop"))||0;
left+=parseFloat(jQuery.css(body,"marginLeft"))||0
}return{top:top,left:left}
},setOffset:function(elem,options,i){var position=jQuery.css(elem,"position");
if(position==="static"){elem.style.position="relative"
}var curElem=jQuery(elem),curOffset=curElem.offset(),curCSSTop=jQuery.css(elem,"top"),curCSSLeft=jQuery.css(elem,"left"),calculatePosition=(position==="absolute"||position==="fixed")&&jQuery.inArray("auto",[curCSSTop,curCSSLeft])>-1,props={},curPosition={},curTop,curLeft;
if(calculatePosition){curPosition=curElem.position();
curTop=curPosition.top;
curLeft=curPosition.left
}else{curTop=parseFloat(curCSSTop)||0;
curLeft=parseFloat(curCSSLeft)||0
}if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset)
}if(options.top!=null){props.top=(options.top-curOffset.top)+curTop
}if(options.left!=null){props.left=(options.left-curOffset.left)+curLeft
}if("using" in options){options.using.call(elem,props)
}else{curElem.css(props)
}}};
jQuery.fn.extend({position:function(){if(!this[0]){return null
}var elem=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=rroot.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();
offset.top-=parseFloat(jQuery.css(elem,"marginTop"))||0;
offset.left-=parseFloat(jQuery.css(elem,"marginLeft"))||0;
parentOffset.top+=parseFloat(jQuery.css(offsetParent[0],"borderTopWidth"))||0;
parentOffset.left+=parseFloat(jQuery.css(offsetParent[0],"borderLeftWidth"))||0;
return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}
},offsetParent:function(){return this.map(function(){var offsetParent=this.offsetParent||document.body;
while(offsetParent&&(!rroot.test(offsetParent.nodeName)&&jQuery.css(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent
}return offsetParent
})
}});
jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top=/Y/.test(prop);
jQuery.fn[method]=function(val){return jQuery.access(this,function(elem,method,val){var win=getWindow(elem);
if(val===undefined){return win?(prop in win)?win[prop]:jQuery.support.boxModel&&win.document.documentElement[method]||win.document.body[method]:elem[method]
}if(win){win.scrollTo(!top?val:jQuery(win).scrollLeft(),top?val:jQuery(win).scrollTop())
}else{elem[method]=val
}},method,val,arguments.length,null)
}
});
function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9?elem.defaultView||elem.parentWindow:false
}jQuery.each({Height:"height",Width:"width"},function(name,type){var clientProp="client"+name,scrollProp="scroll"+name,offsetProp="offset"+name;
jQuery.fn["inner"+name]=function(){var elem=this[0];
return elem?elem.style?parseFloat(jQuery.css(elem,type,"padding")):this[type]():null
};
jQuery.fn["outer"+name]=function(margin){var elem=this[0];
return elem?elem.style?parseFloat(jQuery.css(elem,type,margin?"margin":"border")):this[type]():null
};
jQuery.fn[type]=function(value){return jQuery.access(this,function(elem,type,value){var doc,docElemProp,orig,ret;
if(jQuery.isWindow(elem)){doc=elem.document;
docElemProp=doc.documentElement[clientProp];
return jQuery.support.boxModel&&docElemProp||doc.body&&doc.body[clientProp]||docElemProp
}if(elem.nodeType===9){doc=elem.documentElement;
if(doc[clientProp]>=doc[scrollProp]){return doc[clientProp]
}return Math.max(elem.body[scrollProp],doc[scrollProp],elem.body[offsetProp],doc[offsetProp])
}if(value===undefined){orig=jQuery.css(elem,type);
ret=parseFloat(orig);
return jQuery.isNumeric(ret)?ret:orig
}jQuery(elem).css(type,value)
},type,value,arguments.length,null)
}
});
window.jQuery=window.$=jQuery;
if(typeof define==="function"&&define.amd&&define.amd.jQuery){define("jquery",[],function(){return jQuery
})
}})(window);
/*
 * jQuery UI 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(A,D){A.ui=A.ui||{};
if(A.ui.version){return 
}A.extend(A.ui,{version:"1.8.18",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
A.fn.extend({propAttr:A.fn.prop||A.fn.attr,_focus:A.fn.focus,focus:function(E,F){return typeof E==="number"?this.each(function(){var G=this;
setTimeout(function(){A(G).focus();
if(F){F.call(G)
}},E)
}):this._focus.apply(this,arguments)
},scrollParent:function(){var E;
if((A.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){E=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(A.curCSS(this,"position",1))&&(/(auto|scroll)/).test(A.curCSS(this,"overflow",1)+A.curCSS(this,"overflow-y",1)+A.curCSS(this,"overflow-x",1))
}).eq(0)
}else{E=this.parents().filter(function(){return(/(auto|scroll)/).test(A.curCSS(this,"overflow",1)+A.curCSS(this,"overflow-y",1)+A.curCSS(this,"overflow-x",1))
}).eq(0)
}return(/fixed/).test(this.css("position"))||!E.length?A(document):E
},zIndex:function(H){if(H!==D){return this.css("zIndex",H)
}if(this.length){var F=A(this[0]),E,G;
while(F.length&&F[0]!==document){E=F.css("position");
if(E==="absolute"||E==="relative"||E==="fixed"){G=parseInt(F.css("zIndex"),10);
if(!isNaN(G)&&G!==0){return G
}}F=F.parent()
}}return 0
},disableSelection:function(){return this.bind((A.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(E){E.preventDefault()
})
},enableSelection:function(){return this.unbind(".ui-disableSelection")
}});
A.each(["Width","Height"],function(G,E){var F=E==="Width"?["Left","Right"]:["Top","Bottom"],H=E.toLowerCase(),J={innerWidth:A.fn.innerWidth,innerHeight:A.fn.innerHeight,outerWidth:A.fn.outerWidth,outerHeight:A.fn.outerHeight};
function I(M,L,K,N){A.each(F,function(){L-=parseFloat(A.curCSS(M,"padding"+this,true))||0;
if(K){L-=parseFloat(A.curCSS(M,"border"+this+"Width",true))||0
}if(N){L-=parseFloat(A.curCSS(M,"margin"+this,true))||0
}});
return L
}A.fn["inner"+E]=function(K){if(K===D){return J["inner"+E].call(this)
}return this.each(function(){A(this).css(H,I(this,K)+"px")
})
};
A.fn["outer"+E]=function(K,L){if(typeof K!=="number"){return J["outer"+E].call(this,K)
}return this.each(function(){A(this).css(H,I(this,K,true,L)+"px")
})
}
});
function C(G,E){var J=G.nodeName.toLowerCase();
if("area"===J){var I=G.parentNode,H=I.name,F;
if(!G.href||!H||I.nodeName.toLowerCase()!=="map"){return false
}F=A("img[usemap=#"+H+"]")[0];
return !!F&&B(F)
}return(/input|select|textarea|button|object/.test(J)?!G.disabled:"a"==J?G.href||E:E)&&B(G)
}function B(E){return !A(E).parents().andSelf().filter(function(){return A.curCSS(this,"visibility")==="hidden"||A.expr.filters.hidden(this)
}).length
}A.extend(A.expr[":"],{data:function(G,F,E){return !!A.data(G,E[3])
},focusable:function(E){return C(E,!isNaN(A.attr(E,"tabindex")))
},tabbable:function(G){var E=A.attr(G,"tabindex"),F=isNaN(E);
return(F||E>=0)&&C(G,!F)
}});
A(function(){var E=document.body,F=E.appendChild(F=document.createElement("div"));
F.offsetHeight;
A.extend(F.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
A.support.minHeight=F.offsetHeight===100;
A.support.selectstart="onselectstart" in F;
E.removeChild(F).style.display="none"
});
A.extend(A.ui,{plugin:{add:function(F,G,I){var H=A.ui[F].prototype;
for(var E in I){H.plugins[E]=H.plugins[E]||[];
H.plugins[E].push([G,I[E]])
}},call:function(E,G,F){var I=E.plugins[G];
if(!I||!E.element[0].parentNode){return 
}for(var H=0;
H<I.length;
H++){if(E.options[I[H][0]]){I[H][1].apply(E.element,F)
}}}},contains:function(F,E){return document.compareDocumentPosition?F.compareDocumentPosition(E)&16:F!==E&&F.contains(E)
},hasScroll:function(H,F){if(A(H).css("overflow")==="hidden"){return false
}var E=(F&&F==="left")?"scrollLeft":"scrollTop",G=false;
if(H[E]>0){return true
}H[E]=1;
G=(H[E]>0);
H[E]=0;
return G
},isOverAxis:function(F,E,G){return(F>E)&&(F<(E+G))
},isOver:function(J,F,I,H,E,G){return A.ui.isOverAxis(J,I,E)&&A.ui.isOverAxis(F,H,G)
}})
})(jQuery);
/*
 * jQuery UI Widget 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(B,D){if(B.cleanData){var C=B.cleanData;
B.cleanData=function(E){for(var F=0,G;
(G=E[F])!=null;
F++){try{B(G).triggerHandler("remove")
}catch(H){}}C(E)
}
}else{var A=B.fn.remove;
B.fn.remove=function(E,F){return this.each(function(){if(!F){if(!E||B.filter(E,[this]).length){B("*",this).add([this]).each(function(){try{B(this).triggerHandler("remove")
}catch(G){}})
}}return A.call(B(this),E,F)
})
}
}B.widget=function(F,H,E){var G=F.split(".")[0],J;
F=F.split(".")[1];
J=G+"-"+F;
if(!E){E=H;
H=B.Widget
}B.expr[":"][J]=function(K){return !!B.data(K,F)
};
B[G]=B[G]||{};
B[G][F]=function(K,L){if(arguments.length){this._createWidget(K,L)
}};
var I=new H();
I.options=B.extend(true,{},I.options);
B[G][F].prototype=B.extend(true,I,{namespace:G,widgetName:F,widgetEventPrefix:B[G][F].prototype.widgetEventPrefix||F,widgetBaseClass:J},E);
B.widget.bridge(F,B[G][F])
};
B.widget.bridge=function(F,E){B.fn[F]=function(I){var G=typeof I==="string",H=Array.prototype.slice.call(arguments,1),J=this;
I=!G&&H.length?B.extend.apply(null,[true,I].concat(H)):I;
if(G&&I.charAt(0)==="_"){return J
}if(G){this.each(function(){var K=B.data(this,F),L=K&&B.isFunction(K[I])?K[I].apply(K,H):K;
if(L!==K&&L!==D){J=L;
return false
}})
}else{this.each(function(){var K=B.data(this,F);
if(K){K.option(I||{})._init()
}else{B.data(this,F,new E(I,this))
}})
}return J
}
};
B.Widget=function(E,F){if(arguments.length){this._createWidget(E,F)
}};
B.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(F,G){B.data(G,this.widgetName,this);
this.element=B(G);
this.options=B.extend(true,{},this.options,this._getCreateOptions(),F);
var E=this;
this.element.bind("remove."+this.widgetName,function(){E.destroy()
});
this._create();
this._trigger("create");
this._init()
},_getCreateOptions:function(){return B.metadata&&B.metadata.get(this.element[0])[this.widgetName]
},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")
},widget:function(){return this.element
},option:function(F,G){var E=F;
if(arguments.length===0){return B.extend({},this.options)
}if(typeof F==="string"){if(G===D){return this.options[F]
}E={};
E[F]=G
}this._setOptions(E);
return this
},_setOptions:function(F){var E=this;
B.each(F,function(G,H){E._setOption(G,H)
});
return this
},_setOption:function(E,F){this.options[E]=F;
if(E==="disabled"){this.widget()[F?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",F)
}return this
},enable:function(){return this._setOption("disabled",false)
},disable:function(){return this._setOption("disabled",true)
},_trigger:function(E,F,G){var J,I,H=this.options[E];
G=G||{};
F=B.Event(F);
F.type=(E===this.widgetEventPrefix?E:this.widgetEventPrefix+E).toLowerCase();
F.target=this.element[0];
I=F.originalEvent;
if(I){for(J in I){if(!(J in F)){F[J]=I[J]
}}}this.element.trigger(F,G);
return !(B.isFunction(H)&&H.call(this.element[0],F,G)===false||F.isDefaultPrevented())
}}
})(jQuery);
/*
 * jQuery UI Mouse 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(B,C){var A=false;
B(document).mouseup(function(D){A=false
});
B.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var D=this;
this.element.bind("mousedown."+this.widgetName,function(E){return D._mouseDown(E)
}).bind("click."+this.widgetName,function(E){if(true===B.data(E.target,D.widgetName+".preventClickEvent")){B.removeData(E.target,D.widgetName+".preventClickEvent");
E.stopImmediatePropagation();
return false
}});
this.started=false
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)
},_mouseDown:function(F){if(A){return 
}(this._mouseStarted&&this._mouseUp(F));
this._mouseDownEvent=F;
var E=this,G=(F.which==1),D=(typeof this.options.cancel=="string"&&F.target.nodeName?B(F.target).closest(this.options.cancel).length:false);
if(!G||D||!this._mouseCapture(F)){return true
}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){E.mouseDelayMet=true
},this.options.delay)
}if(this._mouseDistanceMet(F)&&this._mouseDelayMet(F)){this._mouseStarted=(this._mouseStart(F)!==false);
if(!this._mouseStarted){F.preventDefault();
return true
}}if(true===B.data(F.target,this.widgetName+".preventClickEvent")){B.removeData(F.target,this.widgetName+".preventClickEvent")
}this._mouseMoveDelegate=function(H){return E._mouseMove(H)
};
this._mouseUpDelegate=function(H){return E._mouseUp(H)
};
B(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
F.preventDefault();
A=true;
return true
},_mouseMove:function(D){if(B.browser.msie&&!(document.documentMode>=9)&&!D.button){return this._mouseUp(D)
}if(this._mouseStarted){this._mouseDrag(D);
return D.preventDefault()
}if(this._mouseDistanceMet(D)&&this._mouseDelayMet(D)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,D)!==false);
(this._mouseStarted?this._mouseDrag(D):this._mouseUp(D))
}return !this._mouseStarted
},_mouseUp:function(D){B(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;
if(D.target==this._mouseDownEvent.target){B.data(D.target,this.widgetName+".preventClickEvent",true)
}this._mouseStop(D)
}return false
},_mouseDistanceMet:function(D){return(Math.max(Math.abs(this._mouseDownEvent.pageX-D.pageX),Math.abs(this._mouseDownEvent.pageY-D.pageY))>=this.options.distance)
},_mouseDelayMet:function(D){return this.mouseDelayMet
},_mouseStart:function(D){},_mouseDrag:function(D){},_mouseStop:function(D){},_mouseCapture:function(D){return true
}})
})(jQuery);
(function(A,B){A.widget("ui.draggable",A.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"
}(this.options.addClasses&&this.element.addClass("ui-draggable"));
(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));
this._mouseInit()
},destroy:function(){if(!this.element.data("draggable")){return 
}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
this._mouseDestroy();
return this
},_mouseCapture:function(C){var D=this.options;
if(this.helper||D.disabled||A(C.target).is(".ui-resizable-handle")){return false
}this.handle=this._getHandle(C);
if(!this.handle){return false
}if(D.iframeFix){A(D.iframeFix===true?"iframe":D.iframeFix).each(function(){A('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(A(this).offset()).appendTo("body")
})
}return true
},_mouseStart:function(C){var D=this.options;
this.helper=this._createHelper(C);
this._cacheHelperProportions();
if(A.ui.ddmanager){A.ui.ddmanager.current=this
}this._cacheMargins();
this.cssPosition=this.helper.css("position");
this.scrollParent=this.helper.scrollParent();
this.offset=this.positionAbs=this.element.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
A.extend(this.offset,{click:{left:C.pageX-this.offset.left,top:C.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this.position=this._generatePosition(C);
this.originalPageX=C.pageX;
this.originalPageY=C.pageY;
(D.cursorAt&&this._adjustOffsetFromHelper(D.cursorAt));
if(D.containment){this._setContainment()
}if(this._trigger("start",C)===false){this._clear();
return false
}this._cacheHelperProportions();
if(A.ui.ddmanager&&!D.dropBehaviour){A.ui.ddmanager.prepareOffsets(this,C)
}this.helper.addClass("ui-draggable-dragging");
this._mouseDrag(C,true);
if(A.ui.ddmanager){A.ui.ddmanager.dragStart(this,C)
}return true
},_mouseDrag:function(C,E){this.position=this._generatePosition(C);
this.positionAbs=this._convertPositionTo("absolute");
if(!E){var D=this._uiHash();
if(this._trigger("drag",C,D)===false){this._mouseUp({});
return false
}this.position=D.position
}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}if(A.ui.ddmanager){A.ui.ddmanager.drag(this,C)
}return false
},_mouseStop:function(D){var E=false;
if(A.ui.ddmanager&&!this.options.dropBehaviour){E=A.ui.ddmanager.drop(this,D)
}if(this.dropped){E=this.dropped;
this.dropped=false
}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original"){return false
}if((this.options.revert=="invalid"&&!E)||(this.options.revert=="valid"&&E)||this.options.revert===true||(A.isFunction(this.options.revert)&&this.options.revert.call(this.element,E))){var C=this;
A(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){if(C._trigger("stop",D)!==false){C._clear()
}})
}else{if(this._trigger("stop",D)!==false){this._clear()
}}return false
},_mouseUp:function(C){if(this.options.iframeFix===true){A("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
})
}if(A.ui.ddmanager){A.ui.ddmanager.dragStop(this,C)
}return A.ui.mouse.prototype._mouseUp.call(this,C)
},cancel:function(){if(this.helper.is(".ui-draggable-dragging")){this._mouseUp({})
}else{this._clear()
}return this
},_getHandle:function(C){var D=!this.options.handle||!A(this.options.handle,this.element).length?true:false;
A(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==C.target){D=true
}});
return D
},_createHelper:function(D){var E=this.options;
var C=A.isFunction(E.helper)?A(E.helper.apply(this.element[0],[D])):(E.helper=="clone"?this.element.clone().removeAttr("id"):this.element);
if(!C.parents("body").length){C.appendTo((E.appendTo=="parent"?this.element[0].parentNode:E.appendTo))
}if(C[0]!=this.element[0]&&!(/(fixed|absolute)/).test(C.css("position"))){C.css("position","absolute")
}return C
},_adjustOffsetFromHelper:function(C){if(typeof C=="string"){C=C.split(" ")
}if(A.isArray(C)){C={left:+C[0],top:+C[1]||0}
}if("left" in C){this.offset.click.left=C.left+this.margins.left
}if("right" in C){this.offset.click.left=this.helperProportions.width-C.right+this.margins.left
}if("top" in C){this.offset.click.top=C.top+this.margins.top
}if("bottom" in C){this.offset.click.top=this.helperProportions.height-C.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var C=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0])){C.left+=this.scrollParent.scrollLeft();
C.top+=this.scrollParent.scrollTop()
}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&A.browser.msie)){C={top:0,left:0}
}return{top:C.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:C.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var C=this.element.position();
return{top:C.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:C.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0),right:(parseInt(this.element.css("marginRight"),10)||0),bottom:(parseInt(this.element.css("marginBottom"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var F=this.options;
if(F.containment=="parent"){F.containment=this.helper[0].parentNode
}if(F.containment=="document"||F.containment=="window"){this.containment=[F.containment=="document"?0:A(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,F.containment=="document"?0:A(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(F.containment=="document"?0:A(window).scrollLeft())+A(F.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(F.containment=="document"?0:A(window).scrollTop())+(A(F.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(F.containment)&&F.containment.constructor!=Array){var G=A(F.containment);
var D=G[0];
if(!D){return 
}var E=G.offset();
var C=(A(D).css("overflow")!="hidden");
this.containment=[(parseInt(A(D).css("borderLeftWidth"),10)||0)+(parseInt(A(D).css("paddingLeft"),10)||0),(parseInt(A(D).css("borderTopWidth"),10)||0)+(parseInt(A(D).css("paddingTop"),10)||0),(C?Math.max(D.scrollWidth,D.offsetWidth):D.offsetWidth)-(parseInt(A(D).css("borderLeftWidth"),10)||0)-(parseInt(A(D).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(C?Math.max(D.scrollHeight,D.offsetHeight):D.offsetHeight)-(parseInt(A(D).css("borderTopWidth"),10)||0)-(parseInt(A(D).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];
this.relative_container=G
}else{if(F.containment.constructor==Array){this.containment=F.containment
}}},_convertPositionTo:function(F,H){if(!H){H=this.position
}var D=F=="absolute"?1:-1;
var E=this.options,C=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,G=(/(html|body)/i).test(C[0].tagName);
return{top:(H.top+this.offset.relative.top*D+this.offset.parent.top*D-(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(G?0:C.scrollTop()))*D)),left:(H.left+this.offset.relative.left*D+this.offset.parent.left*D-(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():G?0:C.scrollLeft())*D))}
},_generatePosition:function(D){var E=this.options,L=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,I=(/(html|body)/i).test(L[0].tagName);
var H=D.pageX;
var G=D.pageY;
if(this.originalPosition){var C;
if(this.containment){if(this.relative_container){var K=this.relative_container.offset();
C=[this.containment[0]+K.left,this.containment[1]+K.top,this.containment[2]+K.left,this.containment[3]+K.top]
}else{C=this.containment
}if(D.pageX-this.offset.click.left<C[0]){H=C[0]+this.offset.click.left
}if(D.pageY-this.offset.click.top<C[1]){G=C[1]+this.offset.click.top
}if(D.pageX-this.offset.click.left>C[2]){H=C[2]+this.offset.click.left
}if(D.pageY-this.offset.click.top>C[3]){G=C[3]+this.offset.click.top
}}if(E.grid){var J=E.grid[1]?this.originalPageY+Math.round((G-this.originalPageY)/E.grid[1])*E.grid[1]:this.originalPageY;
G=C?(!(J-this.offset.click.top<C[1]||J-this.offset.click.top>C[3])?J:(!(J-this.offset.click.top<C[1])?J-E.grid[1]:J+E.grid[1])):J;
var F=E.grid[0]?this.originalPageX+Math.round((H-this.originalPageX)/E.grid[0])*E.grid[0]:this.originalPageX;
H=C?(!(F-this.offset.click.left<C[0]||F-this.offset.click.left>C[2])?F:(!(F-this.offset.click.left<C[0])?F-E.grid[0]:F+E.grid[0])):F
}}return{top:(G-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(I?0:L.scrollTop())))),left:(H-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():I?0:L.scrollLeft())))}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging");
if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()
}this.helper=null;
this.cancelHelperRemoval=false
},_trigger:function(C,D,E){E=E||this._uiHash();
A.ui.plugin.call(this,C,[D,E]);
if(C=="drag"){this.positionAbs=this._convertPositionTo("absolute")
}return A.Widget.prototype._trigger.call(this,C,D,E)
},plugins:{},_uiHash:function(C){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}
}});
A.extend(A.ui.draggable,{version:"1.8.18"});
A.ui.plugin.add("draggable","connectToSortable",{start:function(D,F){var E=A(this).data("draggable"),G=E.options,C=A.extend({},F,{item:E.element});
E.sortables=[];
A(G.connectToSortable).each(function(){var H=A.data(this,"sortable");
if(H&&!H.options.disabled){E.sortables.push({instance:H,shouldRevert:H.options.revert});
H.refreshPositions();
H._trigger("activate",D,C)
}})
},stop:function(D,F){var E=A(this).data("draggable"),C=A.extend({},F,{item:E.element});
A.each(E.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;
E.cancelHelperRemoval=true;
this.instance.cancelHelperRemoval=false;
if(this.shouldRevert){this.instance.options.revert=true
}this.instance._mouseStop(D);
this.instance.options.helper=this.instance.options._helper;
if(E.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})
}}else{this.instance.cancelHelperRemoval=false;
this.instance._trigger("deactivate",D,C)
}})
},drag:function(D,G){var F=A(this).data("draggable"),C=this;
var E=function(J){var O=this.offset.click.top,N=this.offset.click.left;
var H=this.positionAbs.top,L=this.positionAbs.left;
var K=J.height,M=J.width;
var P=J.top,I=J.left;
return A.ui.isOver(H+O,L+N,P,I,K,M)
};
A.each(F.sortables,function(H){this.instance.positionAbs=F.positionAbs;
this.instance.helperProportions=F.helperProportions;
this.instance.offset.click=F.offset.click;
if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;
this.instance.currentItem=A(C).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;
this.instance.options.helper=function(){return G.helper[0]
};
D.target=this.instance.currentItem[0];
this.instance._mouseCapture(D,true);
this.instance._mouseStart(D,true,true);
this.instance.offset.click.top=F.offset.click.top;
this.instance.offset.click.left=F.offset.click.left;
this.instance.offset.parent.left-=F.offset.parent.left-this.instance.offset.parent.left;
this.instance.offset.parent.top-=F.offset.parent.top-this.instance.offset.parent.top;
F._trigger("toSortable",D);
F.dropped=this.instance.element;
F.currentItem=F.element;
this.instance.fromOutside=F
}if(this.instance.currentItem){this.instance._mouseDrag(D)
}}else{if(this.instance.isOver){this.instance.isOver=0;
this.instance.cancelHelperRemoval=true;
this.instance.options.revert=false;
this.instance._trigger("out",D,this.instance._uiHash(this.instance));
this.instance._mouseStop(D,true);
this.instance.options.helper=this.instance.options._helper;
this.instance.currentItem.remove();
if(this.instance.placeholder){this.instance.placeholder.remove()
}F._trigger("fromSortable",D);
F.dropped=false
}}})
}});
A.ui.plugin.add("draggable","cursor",{start:function(D,E){var C=A("body"),F=A(this).data("draggable").options;
if(C.css("cursor")){F._cursor=C.css("cursor")
}C.css("cursor",F.cursor)
},stop:function(C,D){var E=A(this).data("draggable").options;
if(E._cursor){A("body").css("cursor",E._cursor)
}}});
A.ui.plugin.add("draggable","opacity",{start:function(D,E){var C=A(E.helper),F=A(this).data("draggable").options;
if(C.css("opacity")){F._opacity=C.css("opacity")
}C.css("opacity",F.opacity)
},stop:function(C,D){var E=A(this).data("draggable").options;
if(E._opacity){A(D.helper).css("opacity",E._opacity)
}}});
A.ui.plugin.add("draggable","scroll",{start:function(D,E){var C=A(this).data("draggable");
if(C.scrollParent[0]!=document&&C.scrollParent[0].tagName!="HTML"){C.overflowOffset=C.scrollParent.offset()
}},drag:function(E,F){var D=A(this).data("draggable"),G=D.options,C=false;
if(D.scrollParent[0]!=document&&D.scrollParent[0].tagName!="HTML"){if(!G.axis||G.axis!="x"){if((D.overflowOffset.top+D.scrollParent[0].offsetHeight)-E.pageY<G.scrollSensitivity){D.scrollParent[0].scrollTop=C=D.scrollParent[0].scrollTop+G.scrollSpeed
}else{if(E.pageY-D.overflowOffset.top<G.scrollSensitivity){D.scrollParent[0].scrollTop=C=D.scrollParent[0].scrollTop-G.scrollSpeed
}}}if(!G.axis||G.axis!="y"){if((D.overflowOffset.left+D.scrollParent[0].offsetWidth)-E.pageX<G.scrollSensitivity){D.scrollParent[0].scrollLeft=C=D.scrollParent[0].scrollLeft+G.scrollSpeed
}else{if(E.pageX-D.overflowOffset.left<G.scrollSensitivity){D.scrollParent[0].scrollLeft=C=D.scrollParent[0].scrollLeft-G.scrollSpeed
}}}}else{if(!G.axis||G.axis!="x"){if(E.pageY-A(document).scrollTop()<G.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()-G.scrollSpeed)
}else{if(A(window).height()-(E.pageY-A(document).scrollTop())<G.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()+G.scrollSpeed)
}}}if(!G.axis||G.axis!="y"){if(E.pageX-A(document).scrollLeft()<G.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()-G.scrollSpeed)
}else{if(A(window).width()-(E.pageX-A(document).scrollLeft())<G.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()+G.scrollSpeed)
}}}}if(C!==false&&A.ui.ddmanager&&!G.dropBehaviour){A.ui.ddmanager.prepareOffsets(D,E)
}}});
A.ui.plugin.add("draggable","snap",{start:function(D,E){var C=A(this).data("draggable"),F=C.options;
C.snapElements=[];
A(F.snap.constructor!=String?(F.snap.items||":data(draggable)"):F.snap).each(function(){var H=A(this);
var G=H.offset();
if(this!=C.element[0]){C.snapElements.push({item:this,width:H.outerWidth(),height:H.outerHeight(),top:G.top,left:G.left})
}})
},drag:function(O,L){var F=A(this).data("draggable"),M=F.options;
var S=M.snapTolerance;
var R=L.offset.left,Q=R+F.helperProportions.width,E=L.offset.top,D=E+F.helperProportions.height;
for(var P=F.snapElements.length-1;
P>=0;
P--){var N=F.snapElements[P].left,K=N+F.snapElements[P].width,J=F.snapElements[P].top,U=J+F.snapElements[P].height;
if(!((N-S<R&&R<K+S&&J-S<E&&E<U+S)||(N-S<R&&R<K+S&&J-S<D&&D<U+S)||(N-S<Q&&Q<K+S&&J-S<E&&E<U+S)||(N-S<Q&&Q<K+S&&J-S<D&&D<U+S))){if(F.snapElements[P].snapping){(F.options.snap.release&&F.options.snap.release.call(F.element,O,A.extend(F._uiHash(),{snapItem:F.snapElements[P].item})))
}F.snapElements[P].snapping=false;
continue
}if(M.snapMode!="inner"){var C=Math.abs(J-D)<=S;
var T=Math.abs(U-E)<=S;
var H=Math.abs(N-Q)<=S;
var I=Math.abs(K-R)<=S;
if(C){L.position.top=F._convertPositionTo("relative",{top:J-F.helperProportions.height,left:0}).top-F.margins.top
}if(T){L.position.top=F._convertPositionTo("relative",{top:U,left:0}).top-F.margins.top
}if(H){L.position.left=F._convertPositionTo("relative",{top:0,left:N-F.helperProportions.width}).left-F.margins.left
}if(I){L.position.left=F._convertPositionTo("relative",{top:0,left:K}).left-F.margins.left
}}var G=(C||T||H||I);
if(M.snapMode!="outer"){var C=Math.abs(J-E)<=S;
var T=Math.abs(U-D)<=S;
var H=Math.abs(N-R)<=S;
var I=Math.abs(K-Q)<=S;
if(C){L.position.top=F._convertPositionTo("relative",{top:J,left:0}).top-F.margins.top
}if(T){L.position.top=F._convertPositionTo("relative",{top:U-F.helperProportions.height,left:0}).top-F.margins.top
}if(H){L.position.left=F._convertPositionTo("relative",{top:0,left:N}).left-F.margins.left
}if(I){L.position.left=F._convertPositionTo("relative",{top:0,left:K-F.helperProportions.width}).left-F.margins.left
}}if(!F.snapElements[P].snapping&&(C||T||H||I||G)){(F.options.snap.snap&&F.options.snap.snap.call(F.element,O,A.extend(F._uiHash(),{snapItem:F.snapElements[P].item})))
}F.snapElements[P].snapping=(C||T||H||I||G)
}}});
A.ui.plugin.add("draggable","stack",{start:function(D,E){var G=A(this).data("draggable").options;
var F=A.makeArray(A(G.stack)).sort(function(I,H){return(parseInt(A(I).css("zIndex"),10)||0)-(parseInt(A(H).css("zIndex"),10)||0)
});
if(!F.length){return 
}var C=parseInt(F[0].style.zIndex)||0;
A(F).each(function(H){this.style.zIndex=C+H
});
this[0].style.zIndex=C+F.length
}});
A.ui.plugin.add("draggable","zIndex",{start:function(D,E){var C=A(E.helper),F=A(this).data("draggable").options;
if(C.css("zIndex")){F._zIndex=C.css("zIndex")
}C.css("zIndex",F.zIndex)
},stop:function(C,D){var E=A(this).data("draggable").options;
if(E._zIndex){A(D.helper).css("zIndex",E._zIndex)
}}})
})(jQuery);
(function(A,B){A.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var D=this.options,C=D.accept;
this.isover=0;
this.isout=1;
this.accept=A.isFunction(C)?C:function(E){return E.is(C)
};
this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};
A.ui.ddmanager.droppables[D.scope]=A.ui.ddmanager.droppables[D.scope]||[];
A.ui.ddmanager.droppables[D.scope].push(this);
(D.addClasses&&this.element.addClass("ui-droppable"))
},destroy:function(){var C=A.ui.ddmanager.droppables[this.options.scope];
for(var D=0;
D<C.length;
D++){if(C[D]==this){C.splice(D,1)
}}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
return this
},_setOption:function(C,D){if(C=="accept"){this.accept=A.isFunction(D)?D:function(E){return E.is(D)
}
}A.Widget.prototype._setOption.apply(this,arguments)
},_activate:function(D){var C=A.ui.ddmanager.current;
if(this.options.activeClass){this.element.addClass(this.options.activeClass)
}(C&&this._trigger("activate",D,this.ui(C)))
},_deactivate:function(D){var C=A.ui.ddmanager.current;
if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}(C&&this._trigger("deactivate",D,this.ui(C)))
},_over:function(D){var C=A.ui.ddmanager.current;
if(!C||(C.currentItem||C.element)[0]==this.element[0]){return 
}if(this.accept.call(this.element[0],(C.currentItem||C.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)
}this._trigger("over",D,this.ui(C))
}},_out:function(D){var C=A.ui.ddmanager.current;
if(!C||(C.currentItem||C.element)[0]==this.element[0]){return 
}if(this.accept.call(this.element[0],(C.currentItem||C.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("out",D,this.ui(C))
}},_drop:function(D,E){var C=E||A.ui.ddmanager.current;
if(!C||(C.currentItem||C.element)[0]==this.element[0]){return false
}var F=false;
this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var G=A.data(this,"droppable");
if(G.options.greedy&&!G.options.disabled&&G.options.scope==C.options.scope&&G.accept.call(G.element[0],(C.currentItem||C.element))&&A.ui.intersect(C,A.extend(G,{offset:G.element.offset()}),G.options.tolerance)){F=true;
return false
}});
if(F){return false
}if(this.accept.call(this.element[0],(C.currentItem||C.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("drop",D,this.ui(C));
return this.element
}return false
},ui:function(C){return{draggable:(C.currentItem||C.element),helper:C.helper,position:C.position,offset:C.positionAbs}
}});
A.extend(A.ui.droppable,{version:"1.8.18"});
A.ui.intersect=function(P,J,N){if(!J.offset){return false
}var E=(P.positionAbs||P.position.absolute).left,D=E+P.helperProportions.width,M=(P.positionAbs||P.position.absolute).top,L=M+P.helperProportions.height;
var G=J.offset.left,C=G+J.proportions.width,O=J.offset.top,K=O+J.proportions.height;
switch(N){case"fit":return(G<=E&&D<=C&&O<=M&&L<=K);
break;
case"intersect":return(G<E+(P.helperProportions.width/2)&&D-(P.helperProportions.width/2)<C&&O<M+(P.helperProportions.height/2)&&L-(P.helperProportions.height/2)<K);
break;
case"pointer":var H=((P.positionAbs||P.position.absolute).left+(P.clickOffset||P.offset.click).left),I=((P.positionAbs||P.position.absolute).top+(P.clickOffset||P.offset.click).top),F=A.ui.isOver(I,H,O,G,J.proportions.height,J.proportions.width);
return F;
break;
case"touch":return((M>=O&&M<=K)||(L>=O&&L<=K)||(M<O&&L>K))&&((E>=G&&E<=C)||(D>=G&&D<=C)||(E<G&&D>C));
break;
default:return false;
break
}};
A.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(F,H){var C=A.ui.ddmanager.droppables[F.options.scope]||[];
var G=H?H.type:null;
var I=(F.currentItem||F.element).find(":data(droppable)").andSelf();
droppablesLoop:for(var E=0;
E<C.length;
E++){if(C[E].options.disabled||(F&&!C[E].accept.call(C[E].element[0],(F.currentItem||F.element)))){continue
}for(var D=0;
D<I.length;
D++){if(I[D]==C[E].element[0]){C[E].proportions.height=0;
continue droppablesLoop
}}C[E].visible=C[E].element.css("display")!="none";
if(!C[E].visible){continue
}if(G=="mousedown"){C[E]._activate.call(C[E],H)
}C[E].offset=C[E].element.offset();
C[E].proportions={width:C[E].element[0].offsetWidth,height:C[E].element[0].offsetHeight}
}},drop:function(C,D){var E=false;
A.each(A.ui.ddmanager.droppables[C.options.scope]||[],function(){if(!this.options){return 
}if(!this.options.disabled&&this.visible&&A.ui.intersect(C,this,this.options.tolerance)){E=this._drop.call(this,D)||E
}if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],(C.currentItem||C.element))){this.isout=1;
this.isover=0;
this._deactivate.call(this,D)
}});
return E
},dragStart:function(C,D){C.element.parents(":not(body,html)").bind("scroll.droppable",function(){if(!C.options.refreshPositions){A.ui.ddmanager.prepareOffsets(C,D)
}})
},drag:function(C,D){if(C.options.refreshPositions){A.ui.ddmanager.prepareOffsets(C,D)
}A.each(A.ui.ddmanager.droppables[C.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible){return 
}var F=A.ui.intersect(C,this,this.options.tolerance);
var H=!F&&this.isover==1?"isout":(F&&this.isover==0?"isover":null);
if(!H){return 
}var G;
if(this.options.greedy){var E=this.element.parents(":data(droppable):eq(0)");
if(E.length){G=A.data(E[0],"droppable");
G.greedyChild=(H=="isover"?1:0)
}}if(G&&H=="isover"){G.isover=0;
G.isout=1;
G._out.call(G,D)
}this[H]=1;
this[H=="isout"?"isover":"isout"]=0;
this[H=="isover"?"_over":"_out"].call(this,D);
if(G&&H=="isout"){G.isout=0;
G.isover=1;
G._over.call(G,D)
}})
},dragStop:function(C,D){C.element.parents(":not(body,html)").unbind("scroll.droppable");
if(!C.options.refreshPositions){A.ui.ddmanager.prepareOffsets(C,D)
}}}
})(jQuery);
(function(C,D){C.widget("ui.resizable",C.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000},_create:function(){var F=this,J=this.options;
this.element.addClass("ui-resizable");
C.extend(this,{_aspectRatio:!!(J.aspectRatio),aspectRatio:J.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:J.helper||J.ghost||J.animate?J.helper||"ui-resizable-helper":null});
if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){this.element.wrap(C('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));
this.element=this.element.parent().data("resizable",this.element.data("resizable"));
this.elementIsWrapper=true;
this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});
this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});
this.originalResizeStyle=this.originalElement.css("resize");
this.originalElement.css("resize","none");
this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));
this.originalElement.css({margin:this.originalElement.css("margin")});
this._proportionallyResize()
}this.handles=J.handles||(!C(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});
if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"
}var K=this.handles.split(",");
this.handles={};
for(var G=0;
G<K.length;
G++){var I=C.trim(K[G]),E="ui-resizable-"+I;
var H=C('<div class="ui-resizable-handle '+E+'"></div>');
if(/sw|se|ne|nw/.test(I)){H.css({zIndex:++J.zIndex})
}if("se"==I){H.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
}this.handles[I]=".ui-resizable-"+I;
this.element.append(H)
}}this._renderAxis=function(P){P=P||this.element;
for(var M in this.handles){if(this.handles[M].constructor==String){this.handles[M]=C(this.handles[M],this.element).show()
}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var N=C(this.handles[M],this.element),O=0;
O=/sw|ne|nw|se|n|s/.test(M)?N.outerHeight():N.outerWidth();
var L=["padding",/ne|nw|n/.test(M)?"Top":/se|sw|s/.test(M)?"Bottom":/^e$/.test(M)?"Right":"Left"].join("");
P.css(L,O);
this._proportionallyResize()
}if(!C(this.handles[M]).length){continue
}}};
this._renderAxis(this.element);
this._handles=C(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!F.resizing){if(this.className){var L=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
}F.axis=L&&L[1]?L[1]:"se"
}});
if(J.autoHide){this._handles.hide();
C(this.element).addClass("ui-resizable-autohide").hover(function(){if(J.disabled){return 
}C(this).removeClass("ui-resizable-autohide");
F._handles.show()
},function(){if(J.disabled){return 
}if(!F.resizing){C(this).addClass("ui-resizable-autohide");
F._handles.hide()
}})
}this._mouseInit()
},destroy:function(){this._mouseDestroy();
var E=function(G){C(G).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
};
if(this.elementIsWrapper){E(this.element);
var F=this.element;
F.after(this.originalElement.css({position:F.css("position"),width:F.outerWidth(),height:F.outerHeight(),top:F.css("top"),left:F.css("left")})).remove()
}this.originalElement.css("resize",this.originalResizeStyle);
E(this.originalElement);
return this
},_mouseCapture:function(F){var G=false;
for(var E in this.handles){if(C(this.handles[E])[0]==F.target){G=true
}}return !this.options.disabled&&G
},_mouseStart:function(G){var J=this.options,F=this.element.position(),E=this.element;
this.resizing=true;
this.documentScroll={top:C(document).scrollTop(),left:C(document).scrollLeft()};
if(E.is(".ui-draggable")||(/absolute/).test(E.css("position"))){E.css({position:"absolute",top:F.top,left:F.left})
}this._renderProxy();
var K=B(this.helper.css("left")),H=B(this.helper.css("top"));
if(J.containment){K+=C(J.containment).scrollLeft()||0;
H+=C(J.containment).scrollTop()||0
}this.offset=this.helper.offset();
this.position={left:K,top:H};
this.size=this._helper?{width:E.outerWidth(),height:E.outerHeight()}:{width:E.width(),height:E.height()};
this.originalSize=this._helper?{width:E.outerWidth(),height:E.outerHeight()}:{width:E.width(),height:E.height()};
this.originalPosition={left:K,top:H};
this.sizeDiff={width:E.outerWidth()-E.width(),height:E.outerHeight()-E.height()};
this.originalMousePosition={left:G.pageX,top:G.pageY};
this.aspectRatio=(typeof J.aspectRatio=="number")?J.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);
var I=C(".ui-resizable-"+this.axis).css("cursor");
C("body").css("cursor",I=="auto"?this.axis+"-resize":I);
E.addClass("ui-resizable-resizing");
this._propagate("start",G);
return true
},_mouseDrag:function(E){var H=this.helper,G=this.options,M={},P=this,J=this.originalMousePosition,N=this.axis;
var Q=(E.pageX-J.left)||0,O=(E.pageY-J.top)||0;
var I=this._change[N];
if(!I){return false
}var L=I.apply(this,[E,Q,O]),K=C.browser.msie&&C.browser.version<7,F=this.sizeDiff;
this._updateVirtualBoundaries(E.shiftKey);
if(this._aspectRatio||E.shiftKey){L=this._updateRatio(L,E)
}L=this._respectSize(L,E);
this._propagate("resize",E);
H.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});
if(!this._helper&&this._proportionallyResizeElements.length){this._proportionallyResize()
}this._updateCache(L);
this._trigger("resize",E,this.ui());
return false
},_mouseStop:function(H){this.resizing=false;
var I=this.options,M=this;
if(this._helper){var G=this._proportionallyResizeElements,E=G.length&&(/textarea/i).test(G[0].nodeName),F=E&&C.ui.hasScroll(G[0],"left")?0:M.sizeDiff.height,K=E?0:M.sizeDiff.width;
var N={width:(M.helper.width()-K),height:(M.helper.height()-F)},J=(parseInt(M.element.css("left"),10)+(M.position.left-M.originalPosition.left))||null,L=(parseInt(M.element.css("top"),10)+(M.position.top-M.originalPosition.top))||null;
if(!I.animate){this.element.css(C.extend(N,{top:L,left:J}))
}M.helper.height(M.size.height);
M.helper.width(M.size.width);
if(this._helper&&!I.animate){this._proportionallyResize()
}}C("body").css("cursor","auto");
this.element.removeClass("ui-resizable-resizing");
this._propagate("stop",H);
if(this._helper){this.helper.remove()
}return false
},_updateVirtualBoundaries:function(G){var J=this.options,I,H,F,K,E;
E={minWidth:A(J.minWidth)?J.minWidth:0,maxWidth:A(J.maxWidth)?J.maxWidth:Infinity,minHeight:A(J.minHeight)?J.minHeight:0,maxHeight:A(J.maxHeight)?J.maxHeight:Infinity};
if(this._aspectRatio||G){I=E.minHeight*this.aspectRatio;
F=E.minWidth/this.aspectRatio;
H=E.maxHeight*this.aspectRatio;
K=E.maxWidth/this.aspectRatio;
if(I>E.minWidth){E.minWidth=I
}if(F>E.minHeight){E.minHeight=F
}if(H<E.maxWidth){E.maxWidth=H
}if(K<E.maxHeight){E.maxHeight=K
}}this._vBoundaries=E
},_updateCache:function(E){var F=this.options;
this.offset=this.helper.offset();
if(A(E.left)){this.position.left=E.left
}if(A(E.top)){this.position.top=E.top
}if(A(E.height)){this.size.height=E.height
}if(A(E.width)){this.size.width=E.width
}},_updateRatio:function(H,G){var I=this.options,J=this.position,F=this.size,E=this.axis;
if(A(H.height)){H.width=(H.height*this.aspectRatio)
}else{if(A(H.width)){H.height=(H.width/this.aspectRatio)
}}if(E=="sw"){H.left=J.left+(F.width-H.width);
H.top=null
}if(E=="nw"){H.top=J.top+(F.height-H.height);
H.left=J.left+(F.width-H.width)
}return H
},_respectSize:function(L,G){var J=this.helper,I=this._vBoundaries,Q=this._aspectRatio||G.shiftKey,P=this.axis,S=A(L.width)&&I.maxWidth&&(I.maxWidth<L.width),M=A(L.height)&&I.maxHeight&&(I.maxHeight<L.height),H=A(L.width)&&I.minWidth&&(I.minWidth>L.width),R=A(L.height)&&I.minHeight&&(I.minHeight>L.height);
if(H){L.width=I.minWidth
}if(R){L.height=I.minHeight
}if(S){L.width=I.maxWidth
}if(M){L.height=I.maxHeight
}var F=this.originalPosition.left+this.originalSize.width,O=this.position.top+this.size.height;
var K=/sw|nw|w/.test(P),E=/nw|ne|n/.test(P);
if(H&&K){L.left=F-I.minWidth
}if(S&&K){L.left=F-I.maxWidth
}if(R&&E){L.top=O-I.minHeight
}if(M&&E){L.top=O-I.maxHeight
}var N=!L.width&&!L.height;
if(N&&!L.left&&L.top){L.top=null
}else{if(N&&!L.top&&L.left){L.left=null
}}return L
},_proportionallyResize:function(){var J=this.options;
if(!this._proportionallyResizeElements.length){return 
}var G=this.helper||this.element;
for(var F=0;
F<this._proportionallyResizeElements.length;
F++){var H=this._proportionallyResizeElements[F];
if(!this.borderDif){var E=[H.css("borderTopWidth"),H.css("borderRightWidth"),H.css("borderBottomWidth"),H.css("borderLeftWidth")],I=[H.css("paddingTop"),H.css("paddingRight"),H.css("paddingBottom"),H.css("paddingLeft")];
this.borderDif=C.map(E,function(K,M){var L=parseInt(K,10)||0,N=parseInt(I[M],10)||0;
return L+N
})
}if(C.browser.msie&&!(!(C(G).is(":hidden")||C(G).parents(":hidden").length))){continue
}H.css({height:(G.height()-this.borderDif[0]-this.borderDif[2])||0,width:(G.width()-this.borderDif[1]-this.borderDif[3])||0})
}},_renderProxy:function(){var F=this.element,I=this.options;
this.elementOffset=F.offset();
if(this._helper){this.helper=this.helper||C('<div style="overflow:hidden;"></div>');
var E=C.browser.msie&&C.browser.version<7,G=(E?1:0),H=(E?2:-1);
this.helper.addClass(this._helper).css({width:this.element.outerWidth()+H,height:this.element.outerHeight()+H,position:"absolute",left:this.elementOffset.left-G+"px",top:this.elementOffset.top-G+"px",zIndex:++I.zIndex});
this.helper.appendTo("body").disableSelection()
}else{this.helper=this.element
}},_change:{e:function(G,F,E){return{width:this.originalSize.width+F}
},w:function(H,F,E){var J=this.options,G=this.originalSize,I=this.originalPosition;
return{left:I.left+F,width:G.width-F}
},n:function(H,F,E){var J=this.options,G=this.originalSize,I=this.originalPosition;
return{top:I.top+E,height:G.height-E}
},s:function(G,F,E){return{height:this.originalSize.height+E}
},se:function(G,F,E){return C.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[G,F,E]))
},sw:function(G,F,E){return C.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[G,F,E]))
},ne:function(G,F,E){return C.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[G,F,E]))
},nw:function(G,F,E){return C.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[G,F,E]))
}},_propagate:function(F,E){C.ui.plugin.call(this,F,[E,this.ui()]);
(F!="resize"&&this._trigger(F,E,this.ui()))
},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}
}});
C.extend(C.ui.resizable,{version:"1.8.18"});
C.ui.plugin.add("resizable","alsoResize",{start:function(F,G){var E=C(this).data("resizable"),I=E.options;
var H=function(J){C(J).each(function(){var K=C(this);
K.data("resizable-alsoresize",{width:parseInt(K.width(),10),height:parseInt(K.height(),10),left:parseInt(K.css("left"),10),top:parseInt(K.css("top"),10)})
})
};
if(typeof (I.alsoResize)=="object"&&!I.alsoResize.parentNode){if(I.alsoResize.length){I.alsoResize=I.alsoResize[0];
H(I.alsoResize)
}else{C.each(I.alsoResize,function(J){H(J)
})
}}else{H(I.alsoResize)
}},resize:function(G,I){var F=C(this).data("resizable"),J=F.options,H=F.originalSize,L=F.originalPosition;
var K={height:(F.size.height-H.height)||0,width:(F.size.width-H.width)||0,top:(F.position.top-L.top)||0,left:(F.position.left-L.left)||0},E=function(M,N){C(M).each(function(){var Q=C(this),R=C(this).data("resizable-alsoresize"),P={},O=N&&N.length?N:Q.parents(I.originalElement[0]).length?["width","height"]:["width","height","top","left"];
C.each(O,function(S,U){var T=(R[U]||0)+(K[U]||0);
if(T&&T>=0){P[U]=T||null
}});
Q.css(P)
})
};
if(typeof (J.alsoResize)=="object"&&!J.alsoResize.nodeType){C.each(J.alsoResize,function(M,N){E(M,N)
})
}else{E(J.alsoResize)
}},stop:function(E,F){C(this).removeData("resizable-alsoresize")
}});
C.ui.plugin.add("resizable","animate",{stop:function(I,N){var O=C(this).data("resizable"),J=O.options;
var H=O._proportionallyResizeElements,E=H.length&&(/textarea/i).test(H[0].nodeName),F=E&&C.ui.hasScroll(H[0],"left")?0:O.sizeDiff.height,L=E?0:O.sizeDiff.width;
var G={width:(O.size.width-L),height:(O.size.height-F)},K=(parseInt(O.element.css("left"),10)+(O.position.left-O.originalPosition.left))||null,M=(parseInt(O.element.css("top"),10)+(O.position.top-O.originalPosition.top))||null;
O.element.animate(C.extend(G,M&&K?{top:M,left:K}:{}),{duration:J.animateDuration,easing:J.animateEasing,step:function(){var P={width:parseInt(O.element.css("width"),10),height:parseInt(O.element.css("height"),10),top:parseInt(O.element.css("top"),10),left:parseInt(O.element.css("left"),10)};
if(H&&H.length){C(H[0]).css({width:P.width,height:P.height})
}O._updateCache(P);
O._propagate("resize",I)
}})
}});
C.ui.plugin.add("resizable","containment",{start:function(F,P){var R=C(this).data("resizable"),J=R.options,L=R.element;
var G=J.containment,K=(G instanceof C)?G.get(0):(/parent/.test(G))?L.parent().get(0):G;
if(!K){return 
}R.containerElement=C(K);
if(/document/.test(G)||G==document){R.containerOffset={left:0,top:0};
R.containerPosition={left:0,top:0};
R.parentData={element:C(document),left:0,top:0,width:C(document).width(),height:C(document).height()||document.body.parentNode.scrollHeight}
}else{var N=C(K),I=[];
C(["Top","Right","Left","Bottom"]).each(function(T,S){I[T]=B(N.css("padding"+S))
});
R.containerOffset=N.offset();
R.containerPosition=N.position();
R.containerSize={height:(N.innerHeight()-I[3]),width:(N.innerWidth()-I[1])};
var O=R.containerOffset,E=R.containerSize.height,M=R.containerSize.width,H=(C.ui.hasScroll(K,"left")?K.scrollWidth:M),Q=(C.ui.hasScroll(K)?K.scrollHeight:E);
R.parentData={element:K,left:O.left,top:O.top,width:H,height:Q}
}},resize:function(G,P){var S=C(this).data("resizable"),I=S.options,F=S.containerSize,O=S.containerOffset,M=S.size,N=S.position,Q=S._aspectRatio||G.shiftKey,E={top:0,left:0},H=S.containerElement;
if(H[0]!=document&&(/static/).test(H.css("position"))){E=O
}if(N.left<(S._helper?O.left:0)){S.size.width=S.size.width+(S._helper?(S.position.left-O.left):(S.position.left-E.left));
if(Q){S.size.height=S.size.width/I.aspectRatio
}S.position.left=I.helper?O.left:0
}if(N.top<(S._helper?O.top:0)){S.size.height=S.size.height+(S._helper?(S.position.top-O.top):S.position.top);
if(Q){S.size.width=S.size.height*I.aspectRatio
}S.position.top=S._helper?O.top:0
}S.offset.left=S.parentData.left+S.position.left;
S.offset.top=S.parentData.top+S.position.top;
var L=Math.abs((S._helper?S.offset.left-E.left:(S.offset.left-E.left))+S.sizeDiff.width),R=Math.abs((S._helper?S.offset.top-E.top:(S.offset.top-O.top))+S.sizeDiff.height);
var K=S.containerElement.get(0)==S.element.parent().get(0),J=/relative|absolute/.test(S.containerElement.css("position"));
if(K&&J){L-=S.parentData.left
}if(L+S.size.width>=S.parentData.width){S.size.width=S.parentData.width-L;
if(Q){S.size.height=S.size.width/S.aspectRatio
}}if(R+S.size.height>=S.parentData.height){S.size.height=S.parentData.height-R;
if(Q){S.size.width=S.size.height*S.aspectRatio
}}},stop:function(F,M){var O=C(this).data("resizable"),G=O.options,K=O.position,L=O.containerOffset,E=O.containerPosition,H=O.containerElement;
var I=C(O.helper),P=I.offset(),N=I.outerWidth()-O.sizeDiff.width,J=I.outerHeight()-O.sizeDiff.height;
if(O._helper&&!G.animate&&(/relative/).test(H.css("position"))){C(this).css({left:P.left-E.left-L.left,width:N,height:J})
}if(O._helper&&!G.animate&&(/static/).test(H.css("position"))){C(this).css({left:P.left-E.left-L.left,width:N,height:J})
}}});
C.ui.plugin.add("resizable","ghost",{start:function(G,H){var E=C(this).data("resizable"),I=E.options,F=E.size;
E.ghost=E.originalElement.clone();
E.ghost.css({opacity:0.25,display:"block",position:"relative",height:F.height,width:F.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof I.ghost=="string"?I.ghost:"");
E.ghost.appendTo(E.helper)
},resize:function(F,G){var E=C(this).data("resizable"),H=E.options;
if(E.ghost){E.ghost.css({position:"relative",height:E.size.height,width:E.size.width})
}},stop:function(F,G){var E=C(this).data("resizable"),H=E.options;
if(E.ghost&&E.helper){E.helper.get(0).removeChild(E.ghost.get(0))
}}});
C.ui.plugin.add("resizable","grid",{resize:function(E,M){var O=C(this).data("resizable"),H=O.options,K=O.size,I=O.originalSize,J=O.originalPosition,N=O.axis,L=H._aspectRatio||E.shiftKey;
H.grid=typeof H.grid=="number"?[H.grid,H.grid]:H.grid;
var G=Math.round((K.width-I.width)/(H.grid[0]||1))*(H.grid[0]||1),F=Math.round((K.height-I.height)/(H.grid[1]||1))*(H.grid[1]||1);
if(/^(se|s|e)$/.test(N)){O.size.width=I.width+G;
O.size.height=I.height+F
}else{if(/^(ne)$/.test(N)){O.size.width=I.width+G;
O.size.height=I.height+F;
O.position.top=J.top-F
}else{if(/^(sw)$/.test(N)){O.size.width=I.width+G;
O.size.height=I.height+F;
O.position.left=J.left-G
}else{O.size.width=I.width+G;
O.size.height=I.height+F;
O.position.top=J.top-F;
O.position.left=J.left-G
}}}}});
var B=function(E){return parseInt(E,10)||0
};
var A=function(E){return !isNaN(parseInt(E,10))
}
})(jQuery);
(function(A,B){A.widget("ui.selectable",A.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var C=this;
this.element.addClass("ui-selectable");
this.dragged=false;
var D;
this.refresh=function(){D=A(C.options.filter,C.element[0]);
D.addClass("ui-selectee");
D.each(function(){var E=A(this);
var F=E.offset();
A.data(this,"selectable-item",{element:this,$element:E,left:F.left,top:F.top,right:F.left+E.outerWidth(),bottom:F.top+E.outerHeight(),startselected:false,selected:E.hasClass("ui-selected"),selecting:E.hasClass("ui-selecting"),unselecting:E.hasClass("ui-unselecting")})
})
};
this.refresh();
this.selectees=D.addClass("ui-selectee");
this._mouseInit();
this.helper=A("<div class='ui-selectable-helper'></div>")
},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");
this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
this._mouseDestroy();
return this
},_mouseStart:function(E){var C=this;
this.opos=[E.pageX,E.pageY];
if(this.options.disabled){return 
}var D=this.options;
this.selectees=A(D.filter,this.element[0]);
this._trigger("start",E);
A(D.appendTo).append(this.helper);
this.helper.css({left:E.clientX,top:E.clientY,width:0,height:0});
if(D.autoRefresh){this.refresh()
}this.selectees.filter(".ui-selected").each(function(){var F=A.data(this,"selectable-item");
F.startselected=true;
if(!E.metaKey&&!E.ctrlKey){F.$element.removeClass("ui-selected");
F.selected=false;
F.$element.addClass("ui-unselecting");
F.unselecting=true;
C._trigger("unselecting",E,{unselecting:F.element})
}});
A(E.target).parents().andSelf().each(function(){var G=A.data(this,"selectable-item");
if(G){var F=(!E.metaKey&&!E.ctrlKey)||!G.$element.hasClass("ui-selected");
G.$element.removeClass(F?"ui-unselecting":"ui-selected").addClass(F?"ui-selecting":"ui-unselecting");
G.unselecting=!F;
G.selecting=F;
G.selected=F;
if(F){C._trigger("selecting",E,{selecting:G.element})
}else{C._trigger("unselecting",E,{unselecting:G.element})
}return false
}})
},_mouseDrag:function(J){var D=this;
this.dragged=true;
if(this.options.disabled){return 
}var F=this.options;
var E=this.opos[0],I=this.opos[1],C=J.pageX,H=J.pageY;
if(E>C){var G=C;
C=E;
E=G
}if(I>H){var G=H;
H=I;
I=G
}this.helper.css({left:E,top:I,width:C-E,height:H-I});
this.selectees.each(function(){var K=A.data(this,"selectable-item");
if(!K||K.element==D.element[0]){return 
}var L=false;
if(F.tolerance=="touch"){L=(!(K.left>C||K.right<E||K.top>H||K.bottom<I))
}else{if(F.tolerance=="fit"){L=(K.left>E&&K.right<C&&K.top>I&&K.bottom<H)
}}if(L){if(K.selected){K.$element.removeClass("ui-selected");
K.selected=false
}if(K.unselecting){K.$element.removeClass("ui-unselecting");
K.unselecting=false
}if(!K.selecting){K.$element.addClass("ui-selecting");
K.selecting=true;
D._trigger("selecting",J,{selecting:K.element})
}}else{if(K.selecting){if((J.metaKey||J.ctrlKey)&&K.startselected){K.$element.removeClass("ui-selecting");
K.selecting=false;
K.$element.addClass("ui-selected");
K.selected=true
}else{K.$element.removeClass("ui-selecting");
K.selecting=false;
if(K.startselected){K.$element.addClass("ui-unselecting");
K.unselecting=true
}D._trigger("unselecting",J,{unselecting:K.element})
}}if(K.selected){if(!J.metaKey&&!J.ctrlKey&&!K.startselected){K.$element.removeClass("ui-selected");
K.selected=false;
K.$element.addClass("ui-unselecting");
K.unselecting=true;
D._trigger("unselecting",J,{unselecting:K.element})
}}}});
return false
},_mouseStop:function(E){var C=this;
this.dragged=false;
var D=this.options;
A(".ui-unselecting",this.element[0]).each(function(){var F=A.data(this,"selectable-item");
F.$element.removeClass("ui-unselecting");
F.unselecting=false;
F.startselected=false;
C._trigger("unselected",E,{unselected:F.element})
});
A(".ui-selecting",this.element[0]).each(function(){var F=A.data(this,"selectable-item");
F.$element.removeClass("ui-selecting").addClass("ui-selected");
F.selecting=false;
F.selected=true;
F.startselected=true;
C._trigger("selected",E,{selected:F.element})
});
this._trigger("stop",E);
this.helper.remove();
return false
}});
A.extend(A.ui.selectable,{version:"1.8.18"})
})(jQuery);
(function(A,B){A.widget("ui.sortable",A.ui.mouse,{widgetEventPrefix:"sort",ready:false,options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){var C=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?C.axis==="x"||(/left|right/).test(this.items[0].item.css("float"))||(/inline|table-cell/).test(this.items[0].item.css("display")):false;
this.offset=this.element.offset();
this._mouseInit();
this.ready=true
},destroy:function(){A.Widget.prototype.destroy.call(this);
this.element.removeClass("ui-sortable ui-sortable-disabled");
this._mouseDestroy();
for(var C=this.items.length-1;
C>=0;
C--){this.items[C].item.removeData(this.widgetName+"-item")
}return this
},_setOption:function(C,D){if(C==="disabled"){this.options[C]=D;
this.widget()[D?"addClass":"removeClass"]("ui-sortable-disabled")
}else{A.Widget.prototype._setOption.apply(this,arguments)
}},_mouseCapture:function(G,H){var F=this;
if(this.reverting){return false
}if(this.options.disabled||this.options.type=="static"){return false
}this._refreshItems(G);
var E=null,D=this,C=A(G.target).parents().each(function(){if(A.data(this,F.widgetName+"-item")==D){E=A(this);
return false
}});
if(A.data(G.target,F.widgetName+"-item")==D){E=A(G.target)
}if(!E){return false
}if(this.options.handle&&!H){var I=false;
A(this.options.handle,E).find("*").andSelf().each(function(){if(this==G.target){I=true
}});
if(!I){return false
}}this.currentItem=E;
this._removeCurrentsFromItems();
return true
},_mouseStart:function(F,G,C){var H=this.options,D=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(F);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
A.extend(this.offset,{click:{left:F.pageX-this.offset.left,top:F.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(F);
this.originalPageX=F.pageX;
this.originalPageY=F.pageY;
(H.cursorAt&&this._adjustOffsetFromHelper(H.cursorAt));
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
if(this.helper[0]!=this.currentItem[0]){this.currentItem.hide()
}this._createPlaceholder();
if(H.containment){this._setContainment()
}if(H.cursor){if(A("body").css("cursor")){this._storedCursor=A("body").css("cursor")
}A("body").css("cursor",H.cursor)
}if(H.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")
}this.helper.css("opacity",H.opacity)
}if(H.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")
}this.helper.css("zIndex",H.zIndex)
}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()
}this._trigger("start",F,this._uiHash());
if(!this._preserveHelperProportions){this._cacheHelperProportions()
}if(!C){for(var E=this.containers.length-1;
E>=0;
E--){this.containers[E]._trigger("activate",F,D._uiHash(this))
}}if(A.ui.ddmanager){A.ui.ddmanager.current=this
}if(A.ui.ddmanager&&!H.dropBehaviour){A.ui.ddmanager.prepareOffsets(this,F)
}this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(F);
return true
},_mouseDrag:function(G){this.position=this._generatePosition(G);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs
}if(this.options.scroll){var H=this.options,C=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-G.pageY<H.scrollSensitivity){this.scrollParent[0].scrollTop=C=this.scrollParent[0].scrollTop+H.scrollSpeed
}else{if(G.pageY-this.overflowOffset.top<H.scrollSensitivity){this.scrollParent[0].scrollTop=C=this.scrollParent[0].scrollTop-H.scrollSpeed
}}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-G.pageX<H.scrollSensitivity){this.scrollParent[0].scrollLeft=C=this.scrollParent[0].scrollLeft+H.scrollSpeed
}else{if(G.pageX-this.overflowOffset.left<H.scrollSensitivity){this.scrollParent[0].scrollLeft=C=this.scrollParent[0].scrollLeft-H.scrollSpeed
}}}else{if(G.pageY-A(document).scrollTop()<H.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()-H.scrollSpeed)
}else{if(A(window).height()-(G.pageY-A(document).scrollTop())<H.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()+H.scrollSpeed)
}}if(G.pageX-A(document).scrollLeft()<H.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()-H.scrollSpeed)
}else{if(A(window).width()-(G.pageX-A(document).scrollLeft())<H.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()+H.scrollSpeed)
}}}if(C!==false&&A.ui.ddmanager&&!H.dropBehaviour){A.ui.ddmanager.prepareOffsets(this,G)
}}this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}for(var E=this.items.length-1;
E>=0;
E--){var F=this.items[E],D=F.item[0],I=this._intersectsWithPointer(F);
if(!I){continue
}if(D!=this.currentItem[0]&&this.placeholder[I==1?"next":"prev"]()[0]!=D&&!A.ui.contains(this.placeholder[0],D)&&(this.options.type=="semi-dynamic"?!A.ui.contains(this.element[0],D):true)){this.direction=I==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(F)){this._rearrange(G,F)
}else{break
}this._trigger("change",G,this._uiHash());
break
}}this._contactContainers(G);
if(A.ui.ddmanager){A.ui.ddmanager.drag(this,G)
}this._trigger("sort",G,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false
},_mouseStop:function(D,E){if(!D){return 
}if(A.ui.ddmanager&&!this.options.dropBehaviour){A.ui.ddmanager.drop(this,D)
}if(this.options.revert){var C=this;
var F=C.placeholder.offset();
C.reverting=true;
A(this.helper).animate({left:F.left-this.offset.parent.left-C.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:F.top-this.offset.parent.top-C.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){C._clear(D)
})
}else{this._clear(D,E)
}return false
},cancel:function(){var C=this;
if(this.dragging){this._mouseUp({target:null});
if(this.options.helper=="original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}for(var D=this.containers.length-1;
D>=0;
D--){this.containers[D]._trigger("deactivate",null,C._uiHash(this));
if(this.containers[D].containerCache.over){this.containers[D]._trigger("out",null,C._uiHash(this));
this.containers[D].containerCache.over=0
}}}if(this.placeholder){if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0])
}if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove()
}A.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
if(this.domPosition.prev){A(this.domPosition.prev).after(this.currentItem)
}else{A(this.domPosition.parent).prepend(this.currentItem)
}}return this
},serialize:function(E){var C=this._getItemsAsjQuery(E&&E.connected);
var D=[];
E=E||{};
A(C).each(function(){var F=(A(E.item||this).attr(E.attribute||"id")||"").match(E.expression||(/(.+)[-=_](.+)/));
if(F){D.push((E.key||F[1]+"[]")+"="+(E.key&&E.expression?F[1]:F[2]))
}});
if(!D.length&&E.key){D.push(E.key+"=")
}return D.join("&")
},toArray:function(E){var C=this._getItemsAsjQuery(E&&E.connected);
var D=[];
E=E||{};
C.each(function(){D.push(A(E.item||this).attr(E.attribute||"id")||"")
});
return D
},_intersectsWith:function(L){var E=this.positionAbs.left,D=E+this.helperProportions.width,K=this.positionAbs.top,J=K+this.helperProportions.height;
var F=L.left,C=F+L.width,M=L.top,I=M+L.height;
var N=this.offset.click.top,H=this.offset.click.left;
var G=(K+N)>M&&(K+N)<I&&(E+H)>F&&(E+H)<C;
if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>L[this.floating?"width":"height"])){return G
}else{return(F<E+(this.helperProportions.width/2)&&D-(this.helperProportions.width/2)<C&&M<K+(this.helperProportions.height/2)&&J-(this.helperProportions.height/2)<I)
}},_intersectsWithPointer:function(E){var F=A.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,E.top,E.height),D=A.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,E.left,E.width),H=F&&D,C=this._getDragVerticalDirection(),G=this._getDragHorizontalDirection();
if(!H){return false
}return this.floating?(((G&&G=="right")||C=="down")?2:1):(C&&(C=="down"?2:1))
},_intersectsWithSides:function(F){var D=A.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,F.top+(F.height/2),F.height),E=A.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,F.left+(F.width/2),F.width),C=this._getDragVerticalDirection(),G=this._getDragHorizontalDirection();
if(this.floating&&G){return((G=="right"&&E)||(G=="left"&&!E))
}else{return C&&((C=="down"&&D)||(C=="up"&&!D))
}},_getDragVerticalDirection:function(){var C=this.positionAbs.top-this.lastPositionAbs.top;
return C!=0&&(C>0?"down":"up")
},_getDragHorizontalDirection:function(){var C=this.positionAbs.left-this.lastPositionAbs.left;
return C!=0&&(C>0?"right":"left")
},refresh:function(C){this._refreshItems(C);
this.refreshPositions();
return this
},_connectWith:function(){var C=this.options;
return C.connectWith.constructor==String?[C.connectWith]:C.connectWith
},_getItemsAsjQuery:function(C){var K=this;
var H=[];
var F=[];
var I=this._connectWith();
if(I&&C){for(var E=I.length-1;
E>=0;
E--){var J=A(I[E]);
for(var D=J.length-1;
D>=0;
D--){var G=A.data(J[D],this.widgetName);
if(G&&G!=this&&!G.options.disabled){F.push([A.isFunction(G.options.items)?G.options.items.call(G.element):A(G.options.items,G.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),G])
}}}}F.push([A.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):A(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
for(var E=F.length-1;
E>=0;
E--){F[E][0].each(function(){H.push(this)
})
}return A(H)
},_removeCurrentsFromItems:function(){var E=this.currentItem.find(":data("+this.widgetName+"-item)");
for(var D=0;
D<this.items.length;
D++){for(var C=0;
C<E.length;
C++){if(E[C]==this.items[D].item[0]){this.items.splice(D,1)
}}}},_refreshItems:function(C){this.items=[];
this.containers=[this];
var I=this.items;
var O=this;
var G=[[A.isFunction(this.options.items)?this.options.items.call(this.element[0],C,{item:this.currentItem}):A(this.options.items,this.element),this]];
var K=this._connectWith();
if(K&&this.ready){for(var F=K.length-1;
F>=0;
F--){var L=A(K[F]);
for(var E=L.length-1;
E>=0;
E--){var H=A.data(L[E],this.widgetName);
if(H&&H!=this&&!H.options.disabled){G.push([A.isFunction(H.options.items)?H.options.items.call(H.element[0],C,{item:this.currentItem}):A(H.options.items,H.element),H]);
this.containers.push(H)
}}}}for(var F=G.length-1;
F>=0;
F--){var J=G[F][1];
var D=G[F][0];
for(var E=0,M=D.length;
E<M;
E++){var N=A(D[E]);
N.data(this.widgetName+"-item",J);
I.push({item:N,instance:J,width:0,height:0,left:0,top:0})
}}},refreshPositions:function(C){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()
}for(var E=this.items.length-1;
E>=0;
E--){var F=this.items[E];
if(F.instance!=this.currentContainer&&this.currentContainer&&F.item[0]!=this.currentItem[0]){continue
}var D=this.options.toleranceElement?A(this.options.toleranceElement,F.item):F.item;
if(!C){F.width=D.outerWidth();
F.height=D.outerHeight()
}var G=D.offset();
F.left=G.left;
F.top=G.top
}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)
}else{for(var E=this.containers.length-1;
E>=0;
E--){var G=this.containers[E].element.offset();
this.containers[E].containerCache.left=G.left;
this.containers[E].containerCache.top=G.top;
this.containers[E].containerCache.width=this.containers[E].element.outerWidth();
this.containers[E].containerCache.height=this.containers[E].element.outerHeight()
}}return this
},_createPlaceholder:function(E){var C=E||this,F=C.options;
if(!F.placeholder||F.placeholder.constructor==String){var D=F.placeholder;
F.placeholder={element:function(){var G=A(document.createElement(C.currentItem[0].nodeName)).addClass(D||C.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!D){G.style.visibility="hidden"
}return G
},update:function(G,H){if(D&&!F.forcePlaceholderSize){return 
}if(!H.height()){H.height(C.currentItem.innerHeight()-parseInt(C.currentItem.css("paddingTop")||0,10)-parseInt(C.currentItem.css("paddingBottom")||0,10))
}if(!H.width()){H.width(C.currentItem.innerWidth()-parseInt(C.currentItem.css("paddingLeft")||0,10)-parseInt(C.currentItem.css("paddingRight")||0,10))
}}}
}C.placeholder=A(F.placeholder.element.call(C.element,C.currentItem));
C.currentItem.after(C.placeholder);
F.placeholder.update(C,C.placeholder)
},_contactContainers:function(C){var E=null,J=null;
for(var G=this.containers.length-1;
G>=0;
G--){if(A.ui.contains(this.currentItem[0],this.containers[G].element[0])){continue
}if(this._intersectsWith(this.containers[G].containerCache)){if(E&&A.ui.contains(this.containers[G].element[0],E.element[0])){continue
}E=this.containers[G];
J=G
}else{if(this.containers[G].containerCache.over){this.containers[G]._trigger("out",C,this._uiHash(this));
this.containers[G].containerCache.over=0
}}}if(!E){return 
}if(this.containers.length===1){this.containers[J]._trigger("over",C,this._uiHash(this));
this.containers[J].containerCache.over=1
}else{if(this.currentContainer!=this.containers[J]){var I=10000;
var H=null;
var D=this.positionAbs[this.containers[J].floating?"left":"top"];
for(var F=this.items.length-1;
F>=0;
F--){if(!A.ui.contains(this.containers[J].element[0],this.items[F].item[0])){continue
}var K=this.items[F][this.containers[J].floating?"left":"top"];
if(Math.abs(K-D)<I){I=Math.abs(K-D);
H=this.items[F]
}}if(!H&&!this.options.dropOnEmpty){return 
}this.currentContainer=this.containers[J];
H?this._rearrange(C,H,null,true):this._rearrange(C,null,this.containers[J].element,true);
this._trigger("change",C,this._uiHash());
this.containers[J]._trigger("change",C,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder);
this.containers[J]._trigger("over",C,this._uiHash(this));
this.containers[J].containerCache.over=1
}}},_createHelper:function(D){var E=this.options;
var C=A.isFunction(E.helper)?A(E.helper.apply(this.element[0],[D,this.currentItem])):(E.helper=="clone"?this.currentItem.clone():this.currentItem);
if(!C.parents("body").length){A(E.appendTo!="parent"?E.appendTo:this.currentItem[0].parentNode)[0].appendChild(C[0])
}if(C[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}
}if(C[0].style.width==""||E.forceHelperSize){C.width(this.currentItem.width())
}if(C[0].style.height==""||E.forceHelperSize){C.height(this.currentItem.height())
}return C
},_adjustOffsetFromHelper:function(C){if(typeof C=="string"){C=C.split(" ")
}if(A.isArray(C)){C={left:+C[0],top:+C[1]||0}
}if("left" in C){this.offset.click.left=C.left+this.margins.left
}if("right" in C){this.offset.click.left=this.helperProportions.width-C.right+this.margins.left
}if("top" in C){this.offset.click.top=C.top+this.margins.top
}if("bottom" in C){this.offset.click.top=this.helperProportions.height-C.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var C=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0])){C.left+=this.scrollParent.scrollLeft();
C.top+=this.scrollParent.scrollTop()
}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&A.browser.msie)){C={top:0,left:0}
}return{top:C.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:C.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var C=this.currentItem.position();
return{top:C.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:C.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var F=this.options;
if(F.containment=="parent"){F.containment=this.helper[0].parentNode
}if(F.containment=="document"||F.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,A(F.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(A(F.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(F.containment)){var D=A(F.containment)[0];
var E=A(F.containment).offset();
var C=(A(D).css("overflow")!="hidden");
this.containment=[E.left+(parseInt(A(D).css("borderLeftWidth"),10)||0)+(parseInt(A(D).css("paddingLeft"),10)||0)-this.margins.left,E.top+(parseInt(A(D).css("borderTopWidth"),10)||0)+(parseInt(A(D).css("paddingTop"),10)||0)-this.margins.top,E.left+(C?Math.max(D.scrollWidth,D.offsetWidth):D.offsetWidth)-(parseInt(A(D).css("borderLeftWidth"),10)||0)-(parseInt(A(D).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,E.top+(C?Math.max(D.scrollHeight,D.offsetHeight):D.offsetHeight)-(parseInt(A(D).css("borderTopWidth"),10)||0)-(parseInt(A(D).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}},_convertPositionTo:function(F,H){if(!H){H=this.position
}var D=F=="absolute"?1:-1;
var E=this.options,C=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,G=(/(html|body)/i).test(C[0].tagName);
return{top:(H.top+this.offset.relative.top*D+this.offset.parent.top*D-(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(G?0:C.scrollTop()))*D)),left:(H.left+this.offset.relative.left*D+this.offset.parent.left*D-(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():G?0:C.scrollLeft())*D))}
},_generatePosition:function(F){var I=this.options,C=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,J=(/(html|body)/i).test(C[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()
}var E=F.pageX;
var D=F.pageY;
if(this.originalPosition){if(this.containment){if(F.pageX-this.offset.click.left<this.containment[0]){E=this.containment[0]+this.offset.click.left
}if(F.pageY-this.offset.click.top<this.containment[1]){D=this.containment[1]+this.offset.click.top
}if(F.pageX-this.offset.click.left>this.containment[2]){E=this.containment[2]+this.offset.click.left
}if(F.pageY-this.offset.click.top>this.containment[3]){D=this.containment[3]+this.offset.click.top
}}if(I.grid){var H=this.originalPageY+Math.round((D-this.originalPageY)/I.grid[1])*I.grid[1];
D=this.containment?(!(H-this.offset.click.top<this.containment[1]||H-this.offset.click.top>this.containment[3])?H:(!(H-this.offset.click.top<this.containment[1])?H-I.grid[1]:H+I.grid[1])):H;
var G=this.originalPageX+Math.round((E-this.originalPageX)/I.grid[0])*I.grid[0];
E=this.containment?(!(G-this.offset.click.left<this.containment[0]||G-this.offset.click.left>this.containment[2])?G:(!(G-this.offset.click.left<this.containment[0])?G-I.grid[0]:G+I.grid[0])):G
}}return{top:(D-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(J?0:C.scrollTop())))),left:(E-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():J?0:C.scrollLeft())))}
},_rearrange:function(H,G,D,F){D?D[0].appendChild(this.placeholder[0]):G.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?G.item[0]:G.item[0].nextSibling));
this.counter=this.counter?++this.counter:1;
var E=this,C=this.counter;
window.setTimeout(function(){if(C==E.counter){E.refreshPositions(!F)
}},0)
},_clear:function(E,F){this.reverting=false;
var G=[],C=this;
if(!this._noFinalSort&&this.currentItem.parent().length){this.placeholder.before(this.currentItem)
}this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){for(var D in this._storedCSS){if(this._storedCSS[D]=="auto"||this._storedCSS[D]=="static"){this._storedCSS[D]=""
}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}if(this.fromOutside&&!F){G.push(function(H){this._trigger("receive",H,this._uiHash(this.fromOutside))
})
}if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!F){G.push(function(H){this._trigger("update",H,this._uiHash())
})
}if(!A.ui.contains(this.element[0],this.currentItem[0])){if(!F){G.push(function(H){this._trigger("remove",H,this._uiHash())
})
}for(var D=this.containers.length-1;
D>=0;
D--){if(A.ui.contains(this.containers[D].element[0],this.currentItem[0])&&!F){G.push((function(H){return function(I){H._trigger("receive",I,this._uiHash(this))
}
}).call(this,this.containers[D]));
G.push((function(H){return function(I){H._trigger("update",I,this._uiHash(this))
}
}).call(this,this.containers[D]))
}}}for(var D=this.containers.length-1;
D>=0;
D--){if(!F){G.push((function(H){return function(I){H._trigger("deactivate",I,this._uiHash(this))
}
}).call(this,this.containers[D]))
}if(this.containers[D].containerCache.over){G.push((function(H){return function(I){H._trigger("out",I,this._uiHash(this))
}
}).call(this,this.containers[D]));
this.containers[D].containerCache.over=0
}}if(this._storedCursor){A("body").css("cursor",this._storedCursor)
}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity)
}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)
}this.dragging=false;
if(this.cancelHelperRemoval){if(!F){this._trigger("beforeStop",E,this._uiHash());
for(var D=0;
D<G.length;
D++){G[D].call(this,E)
}this._trigger("stop",E,this._uiHash())
}return false
}if(!F){this._trigger("beforeStop",E,this._uiHash())
}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
if(this.helper[0]!=this.currentItem[0]){this.helper.remove()
}this.helper=null;
if(!F){for(var D=0;
D<G.length;
D++){G[D].call(this,E)
}this._trigger("stop",E,this._uiHash())
}this.fromOutside=false;
return true
},_trigger:function(){if(A.Widget.prototype._trigger.apply(this,arguments)===false){this.cancel()
}},_uiHash:function(D){var C=D||this;
return{helper:C.helper,placeholder:C.placeholder||A([]),position:C.position,originalPosition:C.originalPosition,offset:C.positionAbs,item:C.currentItem,sender:D?D.element:null}
}});
A.extend(A.ui.sortable,{version:"1.8.18"})
})(jQuery);
jQuery.effects||(function(H,E){H.effects={};
H.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(N,M){H.fx.step[M]=function(O){if(!O.colorInit){O.start=L(O.elem,M);
O.end=J(O.end);
O.colorInit=true
}O.elem.style[M]="rgb("+Math.max(Math.min(parseInt((O.pos*(O.end[0]-O.start[0]))+O.start[0],10),255),0)+","+Math.max(Math.min(parseInt((O.pos*(O.end[1]-O.start[1]))+O.start[1],10),255),0)+","+Math.max(Math.min(parseInt((O.pos*(O.end[2]-O.start[2]))+O.start[2],10),255),0)+")"
}
});
function J(N){var M;
if(N&&N.constructor==Array&&N.length==3){return N
}if(M=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(N)){return[parseInt(M[1],10),parseInt(M[2],10),parseInt(M[3],10)]
}if(M=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(N)){return[parseFloat(M[1])*2.55,parseFloat(M[2])*2.55,parseFloat(M[3])*2.55]
}if(M=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(N)){return[parseInt(M[1],16),parseInt(M[2],16),parseInt(M[3],16)]
}if(M=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(N)){return[parseInt(M[1]+M[1],16),parseInt(M[2]+M[2],16),parseInt(M[3]+M[3],16)]
}if(M=/rgba\(0, 0, 0, 0\)/.exec(N)){return A.transparent
}return A[H.trim(N).toLowerCase()]
}function L(O,M){var N;
do{N=H.curCSS(O,M);
if(N!=""&&N!="transparent"||H.nodeName(O,"body")){break
}M="backgroundColor"
}while(O=O.parentNode);
return J(N)
}var A={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
var F=["add","remove","toggle"],C={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
function G(){var P=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,Q={},N,O;
if(P&&P.length&&P[0]&&P[P[0]]){var M=P.length;
while(M--){N=P[M];
if(typeof P[N]=="string"){O=N.replace(/\-(\w)/g,function(R,S){return S.toUpperCase()
});
Q[O]=P[N]
}}}else{for(N in P){if(typeof P[N]==="string"){Q[N]=P[N]
}}}return Q
}function B(N){var M,O;
for(M in N){O=N[M];
if(O==null||H.isFunction(O)||M in C||(/scrollbar/).test(M)||(!(/color/i).test(M)&&isNaN(parseFloat(O)))){delete N[M]
}}return N
}function I(M,O){var P={_:0},N;
for(N in O){if(M[N]!=O[N]){P[N]=O[N]
}}return P
}H.effects.animateClass=function(M,N,P,O){if(H.isFunction(P)){O=P;
P=null
}return this.queue(function(){var T=H(this),Q=T.attr("style")||" ",U=B(G.call(this)),S,R=T.attr("class");
H.each(F,function(V,W){if(M[W]){T[W+"Class"](M[W])
}});
S=B(G.call(this));
T.attr("class",R);
T.animate(I(U,S),{queue:false,duration:N,easing:P,complete:function(){H.each(F,function(V,W){if(M[W]){T[W+"Class"](M[W])
}});
if(typeof T.attr("style")=="object"){T.attr("style").cssText="";
T.attr("style").cssText=Q
}else{T.attr("style",Q)
}if(O){O.apply(this,arguments)
}H.dequeue(this)
}})
})
};
H.fn.extend({_addClass:H.fn.addClass,addClass:function(N,M,P,O){return M?H.effects.animateClass.apply(this,[{add:N},M,P,O]):this._addClass(N)
},_removeClass:H.fn.removeClass,removeClass:function(N,M,P,O){return M?H.effects.animateClass.apply(this,[{remove:N},M,P,O]):this._removeClass(N)
},_toggleClass:H.fn.toggleClass,toggleClass:function(O,N,M,Q,P){if(typeof N=="boolean"||N===E){if(!M){return this._toggleClass(O,N)
}else{return H.effects.animateClass.apply(this,[(N?{add:O}:{remove:O}),M,Q,P])
}}else{return H.effects.animateClass.apply(this,[{toggle:O},N,M,Q])
}},switchClass:function(M,O,N,Q,P){return H.effects.animateClass.apply(this,[{add:O,remove:M},N,Q,P])
}});
H.extend(H.effects,{version:"1.8.18",save:function(N,O){for(var M=0;
M<O.length;
M++){if(O[M]!==null){N.data("ec.storage."+O[M],N[0].style[O[M]])
}}},restore:function(N,O){for(var M=0;
M<O.length;
M++){if(O[M]!==null){N.css(O[M],N.data("ec.storage."+O[M]))
}}},setMode:function(M,N){if(N=="toggle"){N=M.is(":hidden")?"show":"hide"
}return N
},getBaseline:function(N,O){var P,M;
switch(N[0]){case"top":P=0;
break;
case"middle":P=0.5;
break;
case"bottom":P=1;
break;
default:P=N[0]/O.height
}switch(N[1]){case"left":M=0;
break;
case"center":M=0.5;
break;
case"right":M=1;
break;
default:M=N[1]/O.width
}return{x:M,y:P}
},createWrapper:function(M){if(M.parent().is(".ui-effects-wrapper")){return M.parent()
}var N={width:M.outerWidth(true),height:M.outerHeight(true),"float":M.css("float")},P=H("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),O=document.activeElement;
M.wrap(P);
if(M[0]===O||H.contains(M[0],O)){H(O).focus()
}P=M.parent();
if(M.css("position")=="static"){P.css({position:"relative"});
M.css({position:"relative"})
}else{H.extend(N,{position:M.css("position"),zIndex:M.css("z-index")});
H.each(["top","left","bottom","right"],function(Q,R){N[R]=M.css(R);
if(isNaN(parseInt(N[R],10))){N[R]="auto"
}});
M.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})
}return P.css(N).show()
},removeWrapper:function(M){var N,O=document.activeElement;
if(M.parent().is(".ui-effects-wrapper")){N=M.parent().replaceWith(M);
if(M[0]===O||H.contains(M[0],O)){H(O).focus()
}return N
}return M
},setTransition:function(N,P,M,O){O=O||{};
H.each(P,function(R,Q){unit=N.cssUnit(Q);
if(unit[0]>0){O[Q]=unit[0]*M+unit[1]
}});
return O
}});
function D(N,M,O,P){if(typeof N=="object"){P=M;
O=null;
M=N;
N=M.effect
}if(H.isFunction(M)){P=M;
O=null;
M={}
}if(typeof M=="number"||H.fx.speeds[M]){P=O;
O=M;
M={}
}if(H.isFunction(O)){P=O;
O=null
}M=M||{};
O=O||M.duration;
O=H.fx.off?0:typeof O=="number"?O:O in H.fx.speeds?H.fx.speeds[O]:H.fx.speeds._default;
P=P||M.complete;
return[N,M,O,P]
}function K(M){if(!M||typeof M==="number"||H.fx.speeds[M]){return true
}if(typeof M==="string"&&!H.effects[M]){return true
}return false
}H.fn.extend({effect:function(P,O,R,T){var N=D.apply(this,arguments),Q={options:N[1],duration:N[2],callback:N[3]},S=Q.options.mode,M=H.effects[P];
if(H.fx.off||!M){if(S){return this[S](Q.duration,Q.callback)
}else{return this.each(function(){if(Q.callback){Q.callback.call(this)
}})
}}return M.call(this,Q)
},_show:H.fn.show,show:function(N){if(K(N)){return this._show.apply(this,arguments)
}else{var M=D.apply(this,arguments);
M[1].mode="show";
return this.effect.apply(this,M)
}},_hide:H.fn.hide,hide:function(N){if(K(N)){return this._hide.apply(this,arguments)
}else{var M=D.apply(this,arguments);
M[1].mode="hide";
return this.effect.apply(this,M)
}},__toggle:H.fn.toggle,toggle:function(N){if(K(N)||typeof N==="boolean"||H.isFunction(N)){return this.__toggle.apply(this,arguments)
}else{var M=D.apply(this,arguments);
M[1].mode="toggle";
return this.effect.apply(this,M)
}},cssUnit:function(M){var N=this.css(M),O=[];
H.each(["em","px","%","pt"],function(P,Q){if(N.indexOf(Q)>0){O=[parseFloat(N),Q]
}});
return O
}});
H.easing.jswing=H.easing.swing;
H.extend(H.easing,{def:"easeOutQuad",swing:function(N,O,M,Q,P){return H.easing[H.easing.def](N,O,M,Q,P)
},easeInQuad:function(N,O,M,Q,P){return Q*(O/=P)*O+M
},easeOutQuad:function(N,O,M,Q,P){return -Q*(O/=P)*(O-2)+M
},easeInOutQuad:function(N,O,M,Q,P){if((O/=P/2)<1){return Q/2*O*O+M
}return -Q/2*((--O)*(O-2)-1)+M
},easeInCubic:function(N,O,M,Q,P){return Q*(O/=P)*O*O+M
},easeOutCubic:function(N,O,M,Q,P){return Q*((O=O/P-1)*O*O+1)+M
},easeInOutCubic:function(N,O,M,Q,P){if((O/=P/2)<1){return Q/2*O*O*O+M
}return Q/2*((O-=2)*O*O+2)+M
},easeInQuart:function(N,O,M,Q,P){return Q*(O/=P)*O*O*O+M
},easeOutQuart:function(N,O,M,Q,P){return -Q*((O=O/P-1)*O*O*O-1)+M
},easeInOutQuart:function(N,O,M,Q,P){if((O/=P/2)<1){return Q/2*O*O*O*O+M
}return -Q/2*((O-=2)*O*O*O-2)+M
},easeInQuint:function(N,O,M,Q,P){return Q*(O/=P)*O*O*O*O+M
},easeOutQuint:function(N,O,M,Q,P){return Q*((O=O/P-1)*O*O*O*O+1)+M
},easeInOutQuint:function(N,O,M,Q,P){if((O/=P/2)<1){return Q/2*O*O*O*O*O+M
}return Q/2*((O-=2)*O*O*O*O+2)+M
},easeInSine:function(N,O,M,Q,P){return -Q*Math.cos(O/P*(Math.PI/2))+Q+M
},easeOutSine:function(N,O,M,Q,P){return Q*Math.sin(O/P*(Math.PI/2))+M
},easeInOutSine:function(N,O,M,Q,P){return -Q/2*(Math.cos(Math.PI*O/P)-1)+M
},easeInExpo:function(N,O,M,Q,P){return(O==0)?M:Q*Math.pow(2,10*(O/P-1))+M
},easeOutExpo:function(N,O,M,Q,P){return(O==P)?M+Q:Q*(-Math.pow(2,-10*O/P)+1)+M
},easeInOutExpo:function(N,O,M,Q,P){if(O==0){return M
}if(O==P){return M+Q
}if((O/=P/2)<1){return Q/2*Math.pow(2,10*(O-1))+M
}return Q/2*(-Math.pow(2,-10*--O)+2)+M
},easeInCirc:function(N,O,M,Q,P){return -Q*(Math.sqrt(1-(O/=P)*O)-1)+M
},easeOutCirc:function(N,O,M,Q,P){return Q*Math.sqrt(1-(O=O/P-1)*O)+M
},easeInOutCirc:function(N,O,M,Q,P){if((O/=P/2)<1){return -Q/2*(Math.sqrt(1-O*O)-1)+M
}return Q/2*(Math.sqrt(1-(O-=2)*O)+1)+M
},easeInElastic:function(N,P,M,T,S){var Q=1.70158;
var R=0;
var O=T;
if(P==0){return M
}if((P/=S)==1){return M+T
}if(!R){R=S*0.3
}if(O<Math.abs(T)){O=T;
var Q=R/4
}else{var Q=R/(2*Math.PI)*Math.asin(T/O)
}return -(O*Math.pow(2,10*(P-=1))*Math.sin((P*S-Q)*(2*Math.PI)/R))+M
},easeOutElastic:function(N,P,M,T,S){var Q=1.70158;
var R=0;
var O=T;
if(P==0){return M
}if((P/=S)==1){return M+T
}if(!R){R=S*0.3
}if(O<Math.abs(T)){O=T;
var Q=R/4
}else{var Q=R/(2*Math.PI)*Math.asin(T/O)
}return O*Math.pow(2,-10*P)*Math.sin((P*S-Q)*(2*Math.PI)/R)+T+M
},easeInOutElastic:function(N,P,M,T,S){var Q=1.70158;
var R=0;
var O=T;
if(P==0){return M
}if((P/=S/2)==2){return M+T
}if(!R){R=S*(0.3*1.5)
}if(O<Math.abs(T)){O=T;
var Q=R/4
}else{var Q=R/(2*Math.PI)*Math.asin(T/O)
}if(P<1){return -0.5*(O*Math.pow(2,10*(P-=1))*Math.sin((P*S-Q)*(2*Math.PI)/R))+M
}return O*Math.pow(2,-10*(P-=1))*Math.sin((P*S-Q)*(2*Math.PI)/R)*0.5+T+M
},easeInBack:function(N,O,M,R,Q,P){if(P==E){P=1.70158
}return R*(O/=Q)*O*((P+1)*O-P)+M
},easeOutBack:function(N,O,M,R,Q,P){if(P==E){P=1.70158
}return R*((O=O/Q-1)*O*((P+1)*O+P)+1)+M
},easeInOutBack:function(N,O,M,R,Q,P){if(P==E){P=1.70158
}if((O/=Q/2)<1){return R/2*(O*O*(((P*=(1.525))+1)*O-P))+M
}return R/2*((O-=2)*O*(((P*=(1.525))+1)*O+P)+2)+M
},easeInBounce:function(N,O,M,Q,P){return Q-H.easing.easeOutBounce(N,P-O,0,Q,P)+M
},easeOutBounce:function(N,O,M,Q,P){if((O/=P)<(1/2.75)){return Q*(7.5625*O*O)+M
}else{if(O<(2/2.75)){return Q*(7.5625*(O-=(1.5/2.75))*O+0.75)+M
}else{if(O<(2.5/2.75)){return Q*(7.5625*(O-=(2.25/2.75))*O+0.9375)+M
}else{return Q*(7.5625*(O-=(2.625/2.75))*O+0.984375)+M
}}}},easeInOutBounce:function(N,O,M,Q,P){if(O<P/2){return H.easing.easeInBounce(N,O*2,0,Q,P)*0.5+M
}return H.easing.easeOutBounce(N,O*2-P,0,Q,P)*0.5+Q*0.5+M
}})
})(jQuery);
(function(A,B){A.effects.blind=function(C){return this.queue(function(){var E=A(this),D=["position","top","bottom","left","right"];
var I=A.effects.setMode(E,C.options.mode||"hide");
var H=C.options.direction||"vertical";
A.effects.save(E,D);
E.show();
var K=A.effects.createWrapper(E).css({overflow:"hidden"});
var F=(H=="vertical")?"height":"width";
var J=(H=="vertical")?K.height():K.width();
if(I=="show"){K.css(F,0)
}var G={};
G[F]=I=="show"?J:0;
K.animate(G,C.duration,C.options.easing,function(){if(I=="hide"){E.hide()
}A.effects.restore(E,D);
A.effects.removeWrapper(E);
if(C.callback){C.callback.apply(E[0],arguments)
}E.dequeue()
})
})
}
})(jQuery);
(function(A,B){A.effects.bounce=function(C){return this.queue(function(){var F=A(this),L=["position","top","bottom","left","right"];
var K=A.effects.setMode(F,C.options.mode||"effect");
var N=C.options.direction||"up";
var D=C.options.distance||20;
var E=C.options.times||5;
var H=C.duration||250;
if(/show|hide/.test(K)){L.push("opacity")
}A.effects.save(F,L);
F.show();
A.effects.createWrapper(F);
var G=(N=="up"||N=="down")?"top":"left";
var P=(N=="up"||N=="left")?"pos":"neg";
var D=C.options.distance||(G=="top"?F.outerHeight({margin:true})/3:F.outerWidth({margin:true})/3);
if(K=="show"){F.css("opacity",0).css(G,P=="pos"?-D:D)
}if(K=="hide"){D=D/(E*2)
}if(K!="hide"){E--
}if(K=="show"){var I={opacity:1};
I[G]=(P=="pos"?"+=":"-=")+D;
F.animate(I,H/2,C.options.easing);
D=D/2;
E--
}for(var J=0;
J<E;
J++){var O={},M={};
O[G]=(P=="pos"?"-=":"+=")+D;
M[G]=(P=="pos"?"+=":"-=")+D;
F.animate(O,H/2,C.options.easing).animate(M,H/2,C.options.easing);
D=(K=="hide")?D*2:D/2
}if(K=="hide"){var I={opacity:0};
I[G]=(P=="pos"?"-=":"+=")+D;
F.animate(I,H/2,C.options.easing,function(){F.hide();
A.effects.restore(F,L);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(this,arguments)
}})
}else{var O={},M={};
O[G]=(P=="pos"?"-=":"+=")+D;
M[G]=(P=="pos"?"+=":"-=")+D;
F.animate(O,H/2,C.options.easing).animate(M,H/2,C.options.easing,function(){A.effects.restore(F,L);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(this,arguments)
}})
}F.queue("fx",function(){F.dequeue()
});
F.dequeue()
})
}
})(jQuery);
(function(A,B){A.effects.clip=function(C){return this.queue(function(){var G=A(this),K=["position","top","bottom","left","right","height","width"];
var J=A.effects.setMode(G,C.options.mode||"hide");
var L=C.options.direction||"vertical";
A.effects.save(G,K);
G.show();
var D=A.effects.createWrapper(G).css({overflow:"hidden"});
var F=G[0].tagName=="IMG"?D:G;
var H={size:(L=="vertical")?"height":"width",position:(L=="vertical")?"top":"left"};
var E=(L=="vertical")?F.height():F.width();
if(J=="show"){F.css(H.size,0);
F.css(H.position,E/2)
}var I={};
I[H.size]=J=="show"?E:0;
I[H.position]=J=="show"?0:E/2;
F.animate(I,{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){if(J=="hide"){G.hide()
}A.effects.restore(G,K);
A.effects.removeWrapper(G);
if(C.callback){C.callback.apply(G[0],arguments)
}G.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.drop=function(C){return this.queue(function(){var F=A(this),E=["position","top","bottom","left","right","opacity"];
var J=A.effects.setMode(F,C.options.mode||"hide");
var I=C.options.direction||"left";
A.effects.save(F,E);
F.show();
A.effects.createWrapper(F);
var G=(I=="up"||I=="down")?"top":"left";
var D=(I=="up"||I=="left")?"pos":"neg";
var K=C.options.distance||(G=="top"?F.outerHeight({margin:true})/2:F.outerWidth({margin:true})/2);
if(J=="show"){F.css("opacity",0).css(G,D=="pos"?-K:K)
}var H={opacity:J=="show"?1:0};
H[G]=(J=="show"?(D=="pos"?"+=":"-="):(D=="pos"?"-=":"+="))+K;
F.animate(H,{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){if(J=="hide"){F.hide()
}A.effects.restore(F,E);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(this,arguments)
}F.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.explode=function(C){return this.queue(function(){var J=C.options.pieces?Math.round(Math.sqrt(C.options.pieces)):3;
var F=C.options.pieces?Math.round(Math.sqrt(C.options.pieces)):3;
C.options.mode=C.options.mode=="toggle"?(A(this).is(":visible")?"hide":"show"):C.options.mode;
var I=A(this).show().css("visibility","hidden");
var K=I.offset();
K.top-=parseInt(I.css("marginTop"),10)||0;
K.left-=parseInt(I.css("marginLeft"),10)||0;
var H=I.outerWidth(true);
var D=I.outerHeight(true);
for(var G=0;
G<J;
G++){for(var E=0;
E<F;
E++){I.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-E*(H/F),top:-G*(D/J)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:H/F,height:D/J,left:K.left+E*(H/F)+(C.options.mode=="show"?(E-Math.floor(F/2))*(H/F):0),top:K.top+G*(D/J)+(C.options.mode=="show"?(G-Math.floor(J/2))*(D/J):0),opacity:C.options.mode=="show"?0:1}).animate({left:K.left+E*(H/F)+(C.options.mode=="show"?0:(E-Math.floor(F/2))*(H/F)),top:K.top+G*(D/J)+(C.options.mode=="show"?0:(G-Math.floor(J/2))*(D/J)),opacity:C.options.mode=="show"?1:0},C.duration||500)
}}setTimeout(function(){C.options.mode=="show"?I.css({visibility:"visible"}):I.css({visibility:"visible"}).hide();
if(C.callback){C.callback.apply(I[0])
}I.dequeue();
A("div.ui-effects-explode").remove()
},C.duration||500)
})
}
})(jQuery);
(function(A,B){A.effects.fade=function(C){return this.queue(function(){var D=A(this),E=A.effects.setMode(D,C.options.mode||"hide");
D.animate({opacity:E},{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){(C.callback&&C.callback.apply(this,arguments));
D.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.fold=function(C){return this.queue(function(){var F=A(this),L=["position","top","bottom","left","right"];
var I=A.effects.setMode(F,C.options.mode||"hide");
var P=C.options.size||15;
var O=!(!C.options.horizFirst);
var H=C.duration?C.duration/2:A.fx.speeds._default/2;
A.effects.save(F,L);
F.show();
var E=A.effects.createWrapper(F).css({overflow:"hidden"});
var J=((I=="show")!=O);
var G=J?["width","height"]:["height","width"];
var D=J?[E.width(),E.height()]:[E.height(),E.width()];
var K=/([0-9]+)%/.exec(P);
if(K){P=parseInt(K[1],10)/100*D[I=="hide"?0:1]
}if(I=="show"){E.css(O?{height:0,width:P}:{height:P,width:0})
}var N={},M={};
N[G[0]]=I=="show"?D[0]:P;
M[G[1]]=I=="show"?D[1]:0;
E.animate(N,H,C.options.easing).animate(M,H,C.options.easing,function(){if(I=="hide"){F.hide()
}A.effects.restore(F,L);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(F[0],arguments)
}F.dequeue()
})
})
}
})(jQuery);
(function(A,B){A.effects.highlight=function(C){return this.queue(function(){var E=A(this),D=["backgroundImage","backgroundColor","opacity"],G=A.effects.setMode(E,C.options.mode||"show"),F={backgroundColor:E.css("backgroundColor")};
if(G=="hide"){F.opacity=0
}A.effects.save(E,D);
E.show().css({backgroundImage:"none",backgroundColor:C.options.color||"#ffff99"}).animate(F,{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){(G=="hide"&&E.hide());
A.effects.restore(E,D);
(G=="show"&&!A.support.opacity&&this.style.removeAttribute("filter"));
(C.callback&&C.callback.apply(this,arguments));
E.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.pulsate=function(C){return this.queue(function(){var E=A(this),F=A.effects.setMode(E,C.options.mode||"show");
times=((C.options.times||5)*2)-1;
duration=C.duration?C.duration/2:A.fx.speeds._default/2,isVisible=E.is(":visible"),animateTo=0;
if(!isVisible){E.css("opacity",0).show();
animateTo=1
}if((F=="hide"&&isVisible)||(F=="show"&&!isVisible)){times--
}for(var D=0;
D<times;
D++){E.animate({opacity:animateTo},duration,C.options.easing);
animateTo=(animateTo+1)%2
}E.animate({opacity:animateTo},duration,C.options.easing,function(){if(animateTo==0){E.hide()
}(C.callback&&C.callback.apply(this,arguments))
});
E.queue("fx",function(){E.dequeue()
}).dequeue()
})
}
})(jQuery);
(function(A,B){A.effects.puff=function(C){return this.queue(function(){var G=A(this),H=A.effects.setMode(G,C.options.mode||"hide"),F=parseInt(C.options.percent,10)||150,E=F/100,D={height:G.height(),width:G.width()};
A.extend(C.options,{fade:true,mode:H,percent:H=="hide"?F:100,from:H=="hide"?D:{height:D.height*E,width:D.width*E}});
G.effect("scale",C.options,C.duration,C.callback);
G.dequeue()
})
};
A.effects.scale=function(C){return this.queue(function(){var H=A(this);
var E=A.extend(true,{},C.options);
var K=A.effects.setMode(H,C.options.mode||"effect");
var I=parseInt(C.options.percent,10)||(parseInt(C.options.percent,10)==0?0:(K=="hide"?0:100));
var J=C.options.direction||"both";
var D=C.options.origin;
if(K!="effect"){E.origin=D||["middle","center"];
E.restore=true
}var G={height:H.height(),width:H.width()};
H.from=C.options.from||(K=="show"?{height:0,width:0}:G);
var F={y:J!="horizontal"?(I/100):1,x:J!="vertical"?(I/100):1};
H.to={height:G.height*F.y,width:G.width*F.x};
if(C.options.fade){if(K=="show"){H.from.opacity=0;
H.to.opacity=1
}if(K=="hide"){H.from.opacity=1;
H.to.opacity=0
}}E.from=H.from;
E.to=H.to;
E.mode=K;
H.effect("size",E,C.duration,C.callback);
H.dequeue()
})
};
A.effects.size=function(C){return this.queue(function(){var D=A(this),O=["position","top","bottom","left","right","width","height","overflow","opacity"];
var N=["position","top","bottom","left","right","overflow","opacity"];
var K=["width","height","overflow"];
var Q=["fontSize"];
var L=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var G=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var H=A.effects.setMode(D,C.options.mode||"effect");
var J=C.options.restore||false;
var F=C.options.scale||"both";
var P=C.options.origin;
var E={height:D.height(),width:D.width()};
D.from=C.options.from||E;
D.to=C.options.to||E;
if(P){var I=A.effects.getBaseline(P,E);
D.from.top=(E.height-D.from.height)*I.y;
D.from.left=(E.width-D.from.width)*I.x;
D.to.top=(E.height-D.to.height)*I.y;
D.to.left=(E.width-D.to.width)*I.x
}var M={from:{y:D.from.height/E.height,x:D.from.width/E.width},to:{y:D.to.height/E.height,x:D.to.width/E.width}};
if(F=="box"||F=="both"){if(M.from.y!=M.to.y){O=O.concat(L);
D.from=A.effects.setTransition(D,L,M.from.y,D.from);
D.to=A.effects.setTransition(D,L,M.to.y,D.to)
}if(M.from.x!=M.to.x){O=O.concat(G);
D.from=A.effects.setTransition(D,G,M.from.x,D.from);
D.to=A.effects.setTransition(D,G,M.to.x,D.to)
}}if(F=="content"||F=="both"){if(M.from.y!=M.to.y){O=O.concat(Q);
D.from=A.effects.setTransition(D,Q,M.from.y,D.from);
D.to=A.effects.setTransition(D,Q,M.to.y,D.to)
}}A.effects.save(D,J?O:N);
D.show();
A.effects.createWrapper(D);
D.css("overflow","hidden").css(D.from);
if(F=="content"||F=="both"){L=L.concat(["marginTop","marginBottom"]).concat(Q);
G=G.concat(["marginLeft","marginRight"]);
K=O.concat(L).concat(G);
D.find("*[width]").each(function(){child=A(this);
if(J){A.effects.save(child,K)
}var R={height:child.height(),width:child.width()};
child.from={height:R.height*M.from.y,width:R.width*M.from.x};
child.to={height:R.height*M.to.y,width:R.width*M.to.x};
if(M.from.y!=M.to.y){child.from=A.effects.setTransition(child,L,M.from.y,child.from);
child.to=A.effects.setTransition(child,L,M.to.y,child.to)
}if(M.from.x!=M.to.x){child.from=A.effects.setTransition(child,G,M.from.x,child.from);
child.to=A.effects.setTransition(child,G,M.to.x,child.to)
}child.css(child.from);
child.animate(child.to,C.duration,C.options.easing,function(){if(J){A.effects.restore(child,K)
}})
})
}D.animate(D.to,{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){if(D.to.opacity===0){D.css("opacity",D.from.opacity)
}if(H=="hide"){D.hide()
}A.effects.restore(D,J?O:N);
A.effects.removeWrapper(D);
if(C.callback){C.callback.apply(this,arguments)
}D.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.shake=function(C){return this.queue(function(){var F=A(this),L=["position","top","bottom","left","right"];
var K=A.effects.setMode(F,C.options.mode||"effect");
var N=C.options.direction||"left";
var D=C.options.distance||20;
var E=C.options.times||3;
var H=C.duration||C.options.duration||140;
A.effects.save(F,L);
F.show();
A.effects.createWrapper(F);
var G=(N=="up"||N=="down")?"top":"left";
var P=(N=="up"||N=="left")?"pos":"neg";
var I={},O={},M={};
I[G]=(P=="pos"?"-=":"+=")+D;
O[G]=(P=="pos"?"+=":"-=")+D*2;
M[G]=(P=="pos"?"-=":"+=")+D*2;
F.animate(I,H,C.options.easing);
for(var J=1;
J<E;
J++){F.animate(O,H,C.options.easing).animate(M,H,C.options.easing)
}F.animate(O,H,C.options.easing).animate(I,H/2,C.options.easing,function(){A.effects.restore(F,L);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(this,arguments)
}});
F.queue("fx",function(){F.dequeue()
});
F.dequeue()
})
}
})(jQuery);
(function(A,B){A.effects.slide=function(C){return this.queue(function(){var F=A(this),E=["position","top","bottom","left","right"];
var J=A.effects.setMode(F,C.options.mode||"show");
var I=C.options.direction||"left";
A.effects.save(F,E);
F.show();
A.effects.createWrapper(F).css({overflow:"hidden"});
var G=(I=="up"||I=="down")?"top":"left";
var D=(I=="up"||I=="left")?"pos":"neg";
var K=C.options.distance||(G=="top"?F.outerHeight({margin:true}):F.outerWidth({margin:true}));
if(J=="show"){F.css(G,D=="pos"?(isNaN(K)?"-"+K:-K):K)
}var H={};
H[G]=(J=="show"?(D=="pos"?"+=":"-="):(D=="pos"?"-=":"+="))+K;
F.animate(H,{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){if(J=="hide"){F.hide()
}A.effects.restore(F,E);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(this,arguments)
}F.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.transfer=function(C){return this.queue(function(){var G=A(this),I=A(C.options.to),F=I.offset(),H={top:F.top,left:F.left,height:I.innerHeight(),width:I.innerWidth()},E=G.offset(),D=A('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(C.options.className).css({top:E.top,left:E.left,height:G.innerHeight(),width:G.innerWidth(),position:"absolute"}).animate(H,C.duration,C.options.easing,function(){D.remove();
(C.callback&&C.callback.apply(G[0],arguments));
G.dequeue()
})
})
}
})(jQuery);
(function(A,B){A.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()
}},_create:function(){var C=this,D=C.options;
C.running=0;
C.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
C.headers=C.element.find(D.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){if(D.disabled){return 
}A(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){if(D.disabled){return 
}A(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){if(D.disabled){return 
}A(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){if(D.disabled){return 
}A(this).removeClass("ui-state-focus")
});
C.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(D.navigation){var E=C.element.find("a").filter(D.navigationFilter).eq(0);
if(E.length){var F=E.closest(".ui-accordion-header");
if(F.length){C.active=F
}else{C.active=E.closest(".ui-accordion-content").prev()
}}}C.active=C._findActive(C.active||D.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
C.active.next().addClass("ui-accordion-content-active");
C._createIcons();
C.resize();
C.element.attr("role","tablist");
C.headers.attr("role","tab").bind("keydown.accordion",function(G){return C._keydown(G)
}).next().attr("role","tabpanel");
C.headers.not(C.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide();
if(!C.active.length){C.headers.eq(0).attr("tabIndex",0)
}else{C.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0})
}if(!A.browser.safari){C.headers.find("a").attr("tabIndex",-1)
}if(D.event){C.headers.bind(D.event.split(" ").join(".accordion ")+".accordion",function(G){C._clickHandler.call(C,G,this);
G.preventDefault()
})
}},_createIcons:function(){var C=this.options;
if(C.icons){A("<span></span>").addClass("ui-icon "+C.icons.header).prependTo(this.headers);
this.active.children(".ui-icon").toggleClass(C.icons.header).toggleClass(C.icons.headerSelected);
this.element.addClass("ui-accordion-icons")
}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();
this.element.removeClass("ui-accordion-icons")
},destroy:function(){var C=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");
this._destroyIcons();
var D=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
if(C.autoHeight||C.fillHeight){D.css("height","")
}return A.Widget.prototype.destroy.call(this)
},_setOption:function(C,D){A.Widget.prototype._setOption.apply(this,arguments);
if(C=="active"){this.activate(D)
}if(C=="icons"){this._destroyIcons();
if(D){this._createIcons()
}}if(C=="disabled"){this.headers.add(this.headers.next())[D?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")
}},_keydown:function(F){if(this.options.disabled||F.altKey||F.ctrlKey){return 
}var G=A.ui.keyCode,E=this.headers.length,C=this.headers.index(F.target),D=false;
switch(F.keyCode){case G.RIGHT:case G.DOWN:D=this.headers[(C+1)%E];
break;
case G.LEFT:case G.UP:D=this.headers[(C-1+E)%E];
break;
case G.SPACE:case G.ENTER:this._clickHandler({target:F.target},F.target);
F.preventDefault()
}if(D){A(F.target).attr("tabIndex",-1);
A(D).attr("tabIndex",0);
D.focus();
return false
}return true
},resize:function(){var C=this.options,E;
if(C.fillSpace){if(A.browser.msie){var D=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}E=this.element.parent().height();
if(A.browser.msie){this.element.parent().css("overflow",D)
}this.headers.each(function(){E-=A(this).outerHeight(true)
});
this.headers.next().each(function(){A(this).height(Math.max(0,E-A(this).innerHeight()+A(this).height()))
}).css("overflow","auto")
}else{if(C.autoHeight){E=0;
this.headers.next().each(function(){E=Math.max(E,A(this).height("").height())
}).height(E)
}}return this
},activate:function(C){this.options.active=C;
var D=this._findActive(C)[0];
this._clickHandler({target:D},D);
return this
},_findActive:function(C){return C?typeof C==="number"?this.headers.filter(":eq("+C+")"):this.headers.not(this.headers.not(C)):C===false?A([]):this.headers.filter(":eq(0)")
},_clickHandler:function(C,G){var L=this.options;
if(L.disabled){return 
}if(!C.target){if(!L.collapsible){return 
}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(L.icons.headerSelected).addClass(L.icons.header);
this.active.next().addClass("ui-accordion-content-active");
var I=this.active.next(),F={options:L,newHeader:A([]),oldHeader:L.active,newContent:A([]),oldContent:I},D=(this.active=A([]));
this._toggle(D,I,F);
return 
}var H=A(C.currentTarget||G),J=H[0]===this.active[0];
L.active=L.collapsible&&J?false:this.headers.index(H);
if(this.running||(!L.collapsible&&J)){return 
}var E=this.active,D=H.next(),I=this.active.next(),F={options:L,newHeader:J&&L.collapsible?A([]):H,oldHeader:this.active,newContent:J&&L.collapsible?A([]):D,oldContent:I},K=this.headers.index(this.active[0])>this.headers.index(H[0]);
this.active=J?A([]):H;
this._toggle(D,I,F,J,K);
E.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(L.icons.headerSelected).addClass(L.icons.header);
if(!J){H.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(L.icons.header).addClass(L.icons.headerSelected);
H.next().addClass("ui-accordion-content-active")
}return 
},_toggle:function(C,I,G,J,K){var M=this,N=M.options;
M.toShow=C;
M.toHide=I;
M.data=G;
var D=function(){if(!M){return 
}return M._completed.apply(M,arguments)
};
M._trigger("changestart",null,M.data);
M.running=I.size()===0?C.size():I.size();
if(N.animated){var F={};
if(N.collapsible&&J){F={toShow:A([]),toHide:I,complete:D,down:K,autoHeight:N.autoHeight||N.fillSpace}
}else{F={toShow:C,toHide:I,complete:D,down:K,autoHeight:N.autoHeight||N.fillSpace}
}if(!N.proxied){N.proxied=N.animated
}if(!N.proxiedDuration){N.proxiedDuration=N.duration
}N.animated=A.isFunction(N.proxied)?N.proxied(F):N.proxied;
N.duration=A.isFunction(N.proxiedDuration)?N.proxiedDuration(F):N.proxiedDuration;
var L=A.ui.accordion.animations,E=N.duration,H=N.animated;
if(H&&!L[H]&&!A.easing[H]){H="slide"
}if(!L[H]){L[H]=function(O){this.slide(O,{easing:H,duration:E||700})
}
}L[H](F)
}else{if(N.collapsible&&J){C.toggle()
}else{I.hide();
C.show()
}D(true)
}I.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur();
C.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()
},_completed:function(C){this.running=C?0:--this.running;
if(this.running){return 
}if(this.options.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})
}this.toHide.removeClass("ui-accordion-content-active");
if(this.toHide.length){this.toHide.parent()[0].className=this.toHide.parent()[0].className
}this._trigger("change",null,this.data)
}});
A.extend(A.ui.accordion,{version:"1.8.18",animations:{slide:function(K,I){K=A.extend({easing:"swing",duration:300},K,I);
if(!K.toHide.size()){K.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},K);
return 
}if(!K.toShow.size()){K.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},K);
return 
}var D=K.toShow.css("overflow"),H=0,E={},G={},F=["height","paddingTop","paddingBottom"],C;
var J=K.toShow;
C=J[0].style.width;
J.width(J.parent().width()-parseFloat(J.css("paddingLeft"))-parseFloat(J.css("paddingRight"))-(parseFloat(J.css("borderLeftWidth"))||0)-(parseFloat(J.css("borderRightWidth"))||0));
A.each(F,function(L,N){G[N]="hide";
var M=(""+A.css(K.toShow[0],N)).match(/^([\d+-.]+)(.*)$/);
E[N]={value:M[1],unit:M[2]||"px"}
});
K.toShow.css({height:0,overflow:"hidden"}).show();
K.toHide.filter(":hidden").each(K.complete).end().filter(":visible").animate(G,{step:function(L,M){if(M.prop=="height"){H=(M.end-M.start===0)?0:(M.now-M.start)/(M.end-M.start)
}K.toShow[0].style[M.prop]=(H*E[M.prop].value)+E[M.prop].unit
},duration:K.duration,easing:K.easing,complete:function(){if(!K.autoHeight){K.toShow.css("height","")
}K.toShow.css({width:C,overflow:D});
K.complete()
}})
},bounceslide:function(C){this.slide(C,{easing:C.down?"easeOutBounce":"swing",duration:C.down?1000:200})
}}})
})(jQuery);
(function(A,B){var C=0;
A.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var D=this,F=this.element[0].ownerDocument,E;
this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(G){if(D.options.disabled||D.element.propAttr("readOnly")){return 
}E=false;
var H=A.ui.keyCode;
switch(G.keyCode){case H.PAGE_UP:D._move("previousPage",G);
break;
case H.PAGE_DOWN:D._move("nextPage",G);
break;
case H.UP:D._move("previous",G);
G.preventDefault();
break;
case H.DOWN:D._move("next",G);
G.preventDefault();
break;
case H.ENTER:case H.NUMPAD_ENTER:if(D.menu.active){E=true;
G.preventDefault()
}case H.TAB:if(!D.menu.active){return 
}D.menu.select(G);
break;
case H.ESCAPE:D.element.val(D.term);
D.close(G);
break;
default:clearTimeout(D.searching);
D.searching=setTimeout(function(){if(D.term!=D.element.val()){D.selectedItem=null;
D.search(null,G)
}},D.options.delay);
break
}}).bind("keypress.autocomplete",function(G){if(E){E=false;
G.preventDefault()
}}).bind("focus.autocomplete",function(){if(D.options.disabled){return 
}D.selectedItem=null;
D.previous=D.element.val()
}).bind("blur.autocomplete",function(G){if(D.options.disabled){return 
}clearTimeout(D.searching);
D.closing=setTimeout(function(){D.close(G);
D._change(G)
},150)
});
this._initSource();
this.response=function(){return D._response.apply(D,arguments)
};
this.menu=A("<ul></ul>").addClass("ui-autocomplete").appendTo(A(this.options.appendTo||"body",F)[0]).mousedown(function(G){var H=D.menu.element[0];
if(!A(G.target).closest(".ui-menu-item").length){setTimeout(function(){A(document).one("mousedown",function(I){if(I.target!==D.element[0]&&I.target!==H&&!A.ui.contains(H,I.target)){D.close()
}})
},1)
}setTimeout(function(){clearTimeout(D.closing)
},13)
}).menu({focus:function(H,I){var G=I.item.data("item.autocomplete");
if(false!==D._trigger("focus",H,{item:G})){if(/^key/.test(H.originalEvent.type)){D.element.val(G.value)
}}},selected:function(I,J){var H=J.item.data("item.autocomplete"),G=D.previous;
if(D.element[0]!==F.activeElement){D.element.focus();
D.previous=G;
setTimeout(function(){D.previous=G;
D.selectedItem=H
},1)
}if(false!==D._trigger("select",I,{item:H})){D.element.val(H.value)
}D.term=D.element.val();
D.close(I);
D.selectedItem=H
},blur:function(G,H){if(D.menu.element.is(":visible")&&(D.element.val()!==D.term)){D.element.val(D.term)
}}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");
if(A.fn.bgiframe){this.menu.element.bgiframe()
}D.beforeunloadHandler=function(){D.element.removeAttr("autocomplete")
};
A(window).bind("beforeunload",D.beforeunloadHandler)
},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
this.menu.element.remove();
A(window).unbind("beforeunload",this.beforeunloadHandler);
A.Widget.prototype.destroy.call(this)
},_setOption:function(D,E){A.Widget.prototype._setOption.apply(this,arguments);
if(D==="source"){this._initSource()
}if(D==="appendTo"){this.menu.element.appendTo(A(E||"body",this.element[0].ownerDocument)[0])
}if(D==="disabled"&&E&&this.xhr){this.xhr.abort()
}},_initSource:function(){var D=this,F,E;
if(A.isArray(this.options.source)){F=this.options.source;
this.source=function(H,G){G(A.ui.autocomplete.filter(F,H.term))
}
}else{if(typeof this.options.source==="string"){E=this.options.source;
this.source=function(H,G){if(D.xhr){D.xhr.abort()
}D.xhr=A.ajax({url:E,data:H,dataType:"json",context:{autocompleteRequest:++C},success:function(J,I){if(this.autocompleteRequest===C){G(J)
}},error:function(){if(this.autocompleteRequest===C){G([])
}}})
}
}else{this.source=this.options.source
}}},search:function(E,D){E=E!=null?E:this.element.val();
this.term=this.element.val();
if(E.length<this.options.minLength){return this.close(D)
}clearTimeout(this.closing);
if(this._trigger("search",D)===false){return 
}return this._search(E)
},_search:function(D){this.pending++;
this.element.addClass("ui-autocomplete-loading");
this.source({term:D},this.response)
},_response:function(D){if(!this.options.disabled&&D&&D.length){D=this._normalize(D);
this._suggest(D);
this._trigger("open")
}else{this.close()
}this.pending--;
if(!this.pending){this.element.removeClass("ui-autocomplete-loading")
}},close:function(D){clearTimeout(this.closing);
if(this.menu.element.is(":visible")){this.menu.element.hide();
this.menu.deactivate();
this._trigger("close",D)
}},_change:function(D){if(this.previous!==this.element.val()){this._trigger("change",D,{item:this.selectedItem})
}},_normalize:function(D){if(D.length&&D[0].label&&D[0].value){return D
}return A.map(D,function(E){if(typeof E==="string"){return{label:E,value:E}
}return A.extend({label:E.label||E.value,value:E.value||E.label},E)
})
},_suggest:function(D){var E=this.menu.element.empty().zIndex(this.element.zIndex()+1);
this._renderMenu(E,D);
this.menu.deactivate();
this.menu.refresh();
E.show();
this._resizeMenu();
E.position(A.extend({of:this.element},this.options.position));
if(this.options.autoFocus){this.menu.next(new A.Event("mouseover"))
}},_resizeMenu:function(){var D=this.menu.element;
D.outerWidth(Math.max(D.width("").outerWidth()+1,this.element.outerWidth()))
},_renderMenu:function(F,E){var D=this;
A.each(E,function(G,H){D._renderItem(F,H)
})
},_renderItem:function(D,E){return A("<li></li>").data("item.autocomplete",E).append(A("<a></a>").text(E.label)).appendTo(D)
},_move:function(E,D){if(!this.menu.element.is(":visible")){this.search(null,D);
return 
}if(this.menu.first()&&/^previous/.test(E)||this.menu.last()&&/^next/.test(E)){this.element.val(this.term);
this.menu.deactivate();
return 
}this.menu[E](D)
},widget:function(){return this.menu.element
}});
A.extend(A.ui.autocomplete,{escapeRegex:function(D){return D.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")
},filter:function(F,D){var E=new RegExp(A.ui.autocomplete.escapeRegex(D),"i");
return A.grep(F,function(G){return E.test(G.label||G.value||G)
})
}})
}(jQuery));
(function(A){A.widget("ui.menu",{_create:function(){var B=this;
this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(C){if(!A(C.target).closest(".ui-menu-item a").length){return 
}C.preventDefault();
B.select(C)
});
this.refresh()
},refresh:function(){var C=this;
var B=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");
B.children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(D){C.activate(D,A(this).parent())
}).mouseleave(function(){C.deactivate()
})
},activate:function(E,D){this.deactivate();
if(this.hasScroll()){var F=D.offset().top-this.element.offset().top,B=this.element.scrollTop(),C=this.element.height();
if(F<0){this.element.scrollTop(B+F)
}else{if(F>=C){this.element.scrollTop(B+F-C+D.height())
}}}this.active=D.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();
this._trigger("focus",E,{item:D})
},deactivate:function(){if(!this.active){return 
}this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
this._trigger("blur");
this.active=null
},next:function(B){this.move("next",".ui-menu-item:first",B)
},previous:function(B){this.move("prev",".ui-menu-item:last",B)
},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length
},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length
},move:function(E,D,C){if(!this.active){this.activate(C,this.element.children(D));
return 
}var B=this.active[E+"All"](".ui-menu-item").eq(0);
if(B.length){this.activate(C,B)
}else{this.activate(C,this.element.children(D))
}},nextPage:function(D){if(this.hasScroll()){if(!this.active||this.last()){this.activate(D,this.element.children(".ui-menu-item:first"));
return 
}var E=this.active.offset().top,C=this.element.height(),B=this.element.children(".ui-menu-item").filter(function(){var F=A(this).offset().top-E-C+A(this).height();
return F<10&&F>-10
});
if(!B.length){B=this.element.children(".ui-menu-item:last")
}this.activate(D,B)
}else{this.activate(D,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))
}},previousPage:function(C){if(this.hasScroll()){if(!this.active||this.first()){this.activate(C,this.element.children(".ui-menu-item:last"));
return 
}var D=this.active.offset().top,B=this.element.height();
result=this.element.children(".ui-menu-item").filter(function(){var E=A(this).offset().top-D+B-A(this).height();
return E<10&&E>-10
});
if(!result.length){result=this.element.children(".ui-menu-item:first")
}this.activate(C,result)
}else{this.activate(C,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))
}},hasScroll:function(){return this.element.height()<this.element[A.fn.prop?"prop":"attr"]("scrollHeight")
},select:function(B){this._trigger("selected",B,{item:this.active})
}})
}(jQuery));
(function(F,B){var K,E,A,H,I="ui-button ui-widget ui-state-default ui-corner-all",C="ui-state-hover ui-state-active ",G="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",J=function(){var L=F(this).find(":ui-button");
setTimeout(function(){L.button("refresh")
},1)
},D=function(M){var L=M.name,N=M.form,O=F([]);
if(L){if(N){O=F(N).find("[name='"+L+"']")
}else{O=F("[name='"+L+"']",M.ownerDocument).filter(function(){return !this.form
})
}}return O
};
F.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",J);
if(typeof this.options.disabled!=="boolean"){this.options.disabled=!!this.element.propAttr("disabled")
}else{this.element.propAttr("disabled",this.options.disabled)
}this._determineButtonType();
this.hasTitle=!!this.buttonElement.attr("title");
var L=this,N=this.options,O=this.type==="checkbox"||this.type==="radio",P="ui-state-hover"+(!O?" ui-state-active":""),M="ui-state-focus";
if(N.label===null){N.label=this.buttonElement.html()
}this.buttonElement.addClass(I).attr("role","button").bind("mouseenter.button",function(){if(N.disabled){return 
}F(this).addClass("ui-state-hover");
if(this===K){F(this).addClass("ui-state-active")
}}).bind("mouseleave.button",function(){if(N.disabled){return 
}F(this).removeClass(P)
}).bind("click.button",function(Q){if(N.disabled){Q.preventDefault();
Q.stopImmediatePropagation()
}});
this.element.bind("focus.button",function(){L.buttonElement.addClass(M)
}).bind("blur.button",function(){L.buttonElement.removeClass(M)
});
if(O){this.element.bind("change.button",function(){if(H){return 
}L.refresh()
});
this.buttonElement.bind("mousedown.button",function(Q){if(N.disabled){return 
}H=false;
E=Q.pageX;
A=Q.pageY
}).bind("mouseup.button",function(Q){if(N.disabled){return 
}if(E!==Q.pageX||A!==Q.pageY){H=true
}})
}if(this.type==="checkbox"){this.buttonElement.bind("click.button",function(){if(N.disabled||H){return false
}F(this).toggleClass("ui-state-active");
L.buttonElement.attr("aria-pressed",L.element[0].checked)
})
}else{if(this.type==="radio"){this.buttonElement.bind("click.button",function(){if(N.disabled||H){return false
}F(this).addClass("ui-state-active");
L.buttonElement.attr("aria-pressed","true");
var Q=L.element[0];
D(Q).not(Q).map(function(){return F(this).button("widget")[0]
}).removeClass("ui-state-active").attr("aria-pressed","false")
})
}else{this.buttonElement.bind("mousedown.button",function(){if(N.disabled){return false
}F(this).addClass("ui-state-active");
K=this;
F(document).one("mouseup",function(){K=null
})
}).bind("mouseup.button",function(){if(N.disabled){return false
}F(this).removeClass("ui-state-active")
}).bind("keydown.button",function(Q){if(N.disabled){return false
}if(Q.keyCode==F.ui.keyCode.SPACE||Q.keyCode==F.ui.keyCode.ENTER){F(this).addClass("ui-state-active")
}}).bind("keyup.button",function(){F(this).removeClass("ui-state-active")
});
if(this.buttonElement.is("a")){this.buttonElement.keyup(function(Q){if(Q.keyCode===F.ui.keyCode.SPACE){F(this).click()
}})
}}}this._setOption("disabled",N.disabled);
this._resetButton()
},_determineButtonType:function(){if(this.element.is(":checkbox")){this.type="checkbox"
}else{if(this.element.is(":radio")){this.type="radio"
}else{if(this.element.is("input")){this.type="input"
}else{this.type="button"
}}}if(this.type==="checkbox"||this.type==="radio"){var L=this.element.parents().filter(":last"),N="label[for='"+this.element.attr("id")+"']";
this.buttonElement=L.find(N);
if(!this.buttonElement.length){L=L.length?L.siblings():this.element.siblings();
this.buttonElement=L.filter(N);
if(!this.buttonElement.length){this.buttonElement=L.find(N)
}}this.element.addClass("ui-helper-hidden-accessible");
var M=this.element.is(":checked");
if(M){this.buttonElement.addClass("ui-state-active")
}this.buttonElement.attr("aria-pressed",M)
}else{this.buttonElement=this.element
}},widget:function(){return this.buttonElement
},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");
this.buttonElement.removeClass(I+" "+C+" "+G).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
if(!this.hasTitle){this.buttonElement.removeAttr("title")
}F.Widget.prototype.destroy.call(this)
},_setOption:function(L,M){F.Widget.prototype._setOption.apply(this,arguments);
if(L==="disabled"){if(M){this.element.propAttr("disabled",true)
}else{this.element.propAttr("disabled",false)
}return 
}this._resetButton()
},refresh:function(){var L=this.element.is(":disabled");
if(L!==this.options.disabled){this._setOption("disabled",L)
}if(this.type==="radio"){D(this.element[0]).each(function(){if(F(this).is(":checked")){F(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true")
}else{F(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")
}})
}else{if(this.type==="checkbox"){if(this.element.is(":checked")){this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true")
}else{this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false")
}}}},_resetButton:function(){if(this.type==="input"){if(this.options.label){this.element.val(this.options.label)
}return 
}var P=this.buttonElement.removeClass(G),N=F("<span></span>",this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(P.empty()).text(),M=this.options.icons,L=M.primary&&M.secondary,O=[];
if(M.primary||M.secondary){if(this.options.text){O.push("ui-button-text-icon"+(L?"s":(M.primary?"-primary":"-secondary")))
}if(M.primary){P.prepend("<span class='ui-button-icon-primary ui-icon "+M.primary+"'></span>")
}if(M.secondary){P.append("<span class='ui-button-icon-secondary ui-icon "+M.secondary+"'></span>")
}if(!this.options.text){O.push(L?"ui-button-icons-only":"ui-button-icon-only");
if(!this.hasTitle){P.attr("title",N)
}}}else{O.push("ui-button-text-only")
}P.addClass(O.join(" "))
}});
F.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")
},_init:function(){this.refresh()
},_setOption:function(L,M){if(L==="disabled"){this.buttons.button("option",L,M)
}F.Widget.prototype._setOption.apply(this,arguments)
},refresh:function(){var L=this.element.css("direction")==="rtl";
this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return F(this).button("widget")[0]
}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(L?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(L?"ui-corner-left":"ui-corner-right").end().end()
},destroy:function(){this.element.removeClass("ui-buttonset");
this.buttons.map(function(){return F(this).button("widget")[0]
}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
F.Widget.prototype.destroy.call(this)
}})
}(jQuery));
(function($,undefined){$.extend($.ui,{datepicker:{version:"1.8.18"}});
var PROP_NAME="datepicker";
var dpuuid=new Date().getTime();
var instActive;
function Datepicker(){this.debug=false;
this._curInst=null;
this._keyEvent=false;
this._disabledInputs=[];
this._datepickerShowing=false;
this._inDialog=false;
this._mainDivId="ui-datepicker-div";
this._inlineClass="ui-datepicker-inline";
this._appendClass="ui-datepicker-append";
this._triggerClass="ui-datepicker-trigger";
this._dialogClass="ui-datepicker-dialog";
this._disableClass="ui-datepicker-disabled";
this._unselectableClass="ui-datepicker-unselectable";
this._currentClass="ui-datepicker-current-day";
this._dayOverClass="ui-datepicker-days-cell-over";
this.regional=[];
this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};
this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false,disabled:false};
$.extend(this._defaults,this.regional[""]);
this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
}$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){if(this.debug){console.log.apply("",arguments)
}},_widgetDatepicker:function(){return this.dpDiv
},setDefaults:function(settings){extendRemove(this._defaults,settings||{});
return this
},_attachDatepicker:function(target,settings){var inlineSettings=null;
for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);
if(attrValue){inlineSettings=inlineSettings||{};
try{inlineSettings[attrName]=eval(attrValue)
}catch(err){inlineSettings[attrName]=attrValue
}}}var nodeName=target.nodeName.toLowerCase();
var inline=(nodeName=="div"||nodeName=="span");
if(!target.id){this.uuid+=1;
target.id="dp"+this.uuid
}var inst=this._newInst($(target),inline);
inst.settings=$.extend({},settings||{},inlineSettings||{});
if(nodeName=="input"){this._connectDatepicker(target,inst)
}else{if(inline){this._inlineDatepicker(target,inst)
}}},_newInst:function(target,inline){var id=target[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");
return{id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline?this.dpDiv:bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))}
},_connectDatepicker:function(target,inst){var input=$(target);
inst.append=$([]);
inst.trigger=$([]);
if(input.hasClass(this.markerClassName)){return 
}this._attachments(input,inst);
input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value
}).bind("getData.datepicker",function(event,key){return this._get(inst,key)
});
this._autoSize(inst);
$.data(target,PROP_NAME,inst);
if(inst.settings.disabled){this._disableDatepicker(target)
}},_attachments:function(input,inst){var appendText=this._get(inst,"appendText");
var isRTL=this._get(inst,"isRTL");
if(inst.append){inst.append.remove()
}if(appendText){inst.append=$('<span class="'+this._appendClass+'">'+appendText+"</span>");
input[isRTL?"before":"after"](inst.append)
}input.unbind("focus",this._showDatepicker);
if(inst.trigger){inst.trigger.remove()
}var showOn=this._get(inst,"showOn");
if(showOn=="focus"||showOn=="both"){input.focus(this._showDatepicker)
}if(showOn=="button"||showOn=="both"){var buttonText=this._get(inst,"buttonText");
var buttonImage=this._get(inst,"buttonImage");
inst.trigger=$(this._get(inst,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage==""?buttonText:$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));
input[isRTL?"before":"after"](inst.trigger);
inst.trigger.click(function(){if($.datepicker._datepickerShowing&&$.datepicker._lastInput==input[0]){$.datepicker._hideDatepicker()
}else{if($.datepicker._datepickerShowing&&$.datepicker._lastInput!=input[0]){$.datepicker._hideDatepicker();
$.datepicker._showDatepicker(input[0])
}else{$.datepicker._showDatepicker(input[0])
}}return false
})
}},_autoSize:function(inst){if(this._get(inst,"autoSize")&&!inst.inline){var date=new Date(2009,12-1,20);
var dateFormat=this._get(inst,"dateFormat");
if(dateFormat.match(/[DM]/)){var findMax=function(names){var max=0;
var maxI=0;
for(var i=0;
i<names.length;
i++){if(names[i].length>max){max=names[i].length;
maxI=i
}}return maxI
};
date.setMonth(findMax(this._get(inst,(dateFormat.match(/MM/)?"monthNames":"monthNamesShort"))));
date.setDate(findMax(this._get(inst,(dateFormat.match(/DD/)?"dayNames":"dayNamesShort")))+20-date.getDay())
}inst.input.attr("size",this._formatDate(inst,date).length)
}},_inlineDatepicker:function(target,inst){var divSpan=$(target);
if(divSpan.hasClass(this.markerClassName)){return 
}divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value
}).bind("getData.datepicker",function(event,key){return this._get(inst,key)
});
$.data(target,PROP_NAME,inst);
this._setDate(inst,this._getDefaultDate(inst),true);
this._updateDatepicker(inst);
this._updateAlternate(inst);
if(inst.settings.disabled){this._disableDatepicker(target)
}inst.dpDiv.css("display","block")
},_dialogDatepicker:function(input,date,onSelect,settings,pos){var inst=this._dialogInst;
if(!inst){this.uuid+=1;
var id="dp"+this.uuid;
this._dialogInput=$('<input type="text" id="'+id+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
this._dialogInput.keydown(this._doKeyDown);
$("body").append(this._dialogInput);
inst=this._dialogInst=this._newInst(this._dialogInput,false);
inst.settings={};
$.data(this._dialogInput[0],PROP_NAME,inst)
}extendRemove(inst.settings,settings||{});
date=(date&&date.constructor==Date?this._formatDate(inst,date):date);
this._dialogInput.val(date);
this._pos=(pos?(pos.length?pos:[pos.pageX,pos.pageY]):null);
if(!this._pos){var browserWidth=document.documentElement.clientWidth;
var browserHeight=document.documentElement.clientHeight;
var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;
var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
this._pos=[(browserWidth/2)-100+scrollX,(browserHeight/2)-150+scrollY]
}this._dialogInput.css("left",(this._pos[0]+20)+"px").css("top",this._pos[1]+"px");
inst.settings.onSelect=onSelect;
this._inDialog=true;
this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);
if($.blockUI){$.blockUI(this.dpDiv)
}$.data(this._dialogInput[0],PROP_NAME,inst);
return this
},_destroyDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
$.removeData(target,PROP_NAME);
if(nodeName=="input"){inst.append.remove();
inst.trigger.remove();
$target.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)
}else{if(nodeName=="div"||nodeName=="span"){$target.removeClass(this.markerClassName).empty()
}}},_enableDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
if(nodeName=="input"){target.disabled=false;
inst.trigger.filter("button").each(function(){this.disabled=false
}).end().filter("img").css({opacity:"1.0",cursor:""})
}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);
inline.children().removeClass("ui-state-disabled");
inline.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)
})
},_disableDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
if(nodeName=="input"){target.disabled=true;
inst.trigger.filter("button").each(function(){this.disabled=true
}).end().filter("img").css({opacity:"0.5",cursor:"default"})
}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);
inline.children().addClass("ui-state-disabled");
inline.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")
}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)
});
this._disabledInputs[this._disabledInputs.length]=target
},_isDisabledDatepicker:function(target){if(!target){return false
}for(var i=0;
i<this._disabledInputs.length;
i++){if(this._disabledInputs[i]==target){return true
}}return false
},_getInst:function(target){try{return $.data(target,PROP_NAME)
}catch(err){throw"Missing instance data for this datepicker"
}},_optionDatepicker:function(target,name,value){var inst=this._getInst(target);
if(arguments.length==2&&typeof name=="string"){return(name=="defaults"?$.extend({},$.datepicker._defaults):(inst?(name=="all"?$.extend({},inst.settings):this._get(inst,name)):null))
}var settings=name||{};
if(typeof name=="string"){settings={};
settings[name]=value
}if(inst){if(this._curInst==inst){this._hideDatepicker()
}var date=this._getDateDatepicker(target,true);
var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
extendRemove(inst.settings,settings);
if(minDate!==null&&settings.dateFormat!==undefined&&settings.minDate===undefined){inst.settings.minDate=this._formatDate(inst,minDate)
}if(maxDate!==null&&settings.dateFormat!==undefined&&settings.maxDate===undefined){inst.settings.maxDate=this._formatDate(inst,maxDate)
}this._attachments($(target),inst);
this._autoSize(inst);
this._setDate(inst,date);
this._updateAlternate(inst);
this._updateDatepicker(inst)
}},_changeDatepicker:function(target,name,value){this._optionDatepicker(target,name,value)
},_refreshDatepicker:function(target){var inst=this._getInst(target);
if(inst){this._updateDatepicker(inst)
}},_setDateDatepicker:function(target,date){var inst=this._getInst(target);
if(inst){this._setDate(inst,date);
this._updateDatepicker(inst);
this._updateAlternate(inst)
}},_getDateDatepicker:function(target,noDefault){var inst=this._getInst(target);
if(inst&&!inst.inline){this._setDateFromField(inst,noDefault)
}return(inst?this._getDate(inst):null)
},_doKeyDown:function(event){var inst=$.datepicker._getInst(event.target);
var handled=true;
var isRTL=inst.dpDiv.is(".ui-datepicker-rtl");
inst._keyEvent=true;
if($.datepicker._datepickerShowing){switch(event.keyCode){case 9:$.datepicker._hideDatepicker();
handled=false;
break;
case 13:var sel=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",inst.dpDiv);
if(sel[0]){$.datepicker._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0])
}var onSelect=$.datepicker._get(inst,"onSelect");
if(onSelect){var dateStr=$.datepicker._formatDate(inst);
onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])
}else{$.datepicker._hideDatepicker()
}return false;
break;
case 27:$.datepicker._hideDatepicker();
break;
case 33:$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M");
break;
case 34:$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M");
break;
case 35:if(event.ctrlKey||event.metaKey){$.datepicker._clearDate(event.target)
}handled=event.ctrlKey||event.metaKey;
break;
case 36:if(event.ctrlKey||event.metaKey){$.datepicker._gotoToday(event.target)
}handled=event.ctrlKey||event.metaKey;
break;
case 37:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?+1:-1),"D")
}handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M")
}break;
case 38:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,-7,"D")
}handled=event.ctrlKey||event.metaKey;
break;
case 39:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?-1:+1),"D")
}handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M")
}break;
case 40:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,+7,"D")
}handled=event.ctrlKey||event.metaKey;
break;
default:handled=false
}}else{if(event.keyCode==36&&event.ctrlKey){$.datepicker._showDatepicker(this)
}else{handled=false
}}if(handled){event.preventDefault();
event.stopPropagation()
}},_doKeyPress:function(event){var inst=$.datepicker._getInst(event.target);
if($.datepicker._get(inst,"constrainInput")){var chars=$.datepicker._possibleChars($.datepicker._get(inst,"dateFormat"));
var chr=String.fromCharCode(event.charCode==undefined?event.keyCode:event.charCode);
return event.ctrlKey||event.metaKey||(chr<" "||!chars||chars.indexOf(chr)>-1)
}},_doKeyUp:function(event){var inst=$.datepicker._getInst(event.target);
if(inst.input.val()!=inst.lastVal){try{var date=$.datepicker.parseDate($.datepicker._get(inst,"dateFormat"),(inst.input?inst.input.val():null),$.datepicker._getFormatConfig(inst));
if(date){$.datepicker._setDateFromField(inst);
$.datepicker._updateAlternate(inst);
$.datepicker._updateDatepicker(inst)
}}catch(event){$.datepicker.log(event)
}}return true
},_showDatepicker:function(input){input=input.target||input;
if(input.nodeName.toLowerCase()!="input"){input=$("input",input.parentNode)[0]
}if($.datepicker._isDisabledDatepicker(input)||$.datepicker._lastInput==input){return 
}var inst=$.datepicker._getInst(input);
if($.datepicker._curInst&&$.datepicker._curInst!=inst){$.datepicker._curInst.dpDiv.stop(true,true);
if(inst&&$.datepicker._datepickerShowing){$.datepicker._hideDatepicker($.datepicker._curInst.input[0])
}}var beforeShow=$.datepicker._get(inst,"beforeShow");
var beforeShowSettings=beforeShow?beforeShow.apply(input,[input,inst]):{};
if(beforeShowSettings===false){return 
}extendRemove(inst.settings,beforeShowSettings);
inst.lastVal=null;
$.datepicker._lastInput=input;
$.datepicker._setDateFromField(inst);
if($.datepicker._inDialog){input.value=""
}if(!$.datepicker._pos){$.datepicker._pos=$.datepicker._findPos(input);
$.datepicker._pos[1]+=input.offsetHeight
}var isFixed=false;
$(input).parents().each(function(){isFixed|=$(this).css("position")=="fixed";
return !isFixed
});
if(isFixed&&$.browser.opera){$.datepicker._pos[0]-=document.documentElement.scrollLeft;
$.datepicker._pos[1]-=document.documentElement.scrollTop
}var offset={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};
$.datepicker._pos=null;
inst.dpDiv.empty();
inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});
$.datepicker._updateDatepicker(inst);
offset=$.datepicker._checkOffset(inst,offset,isFixed);
inst.dpDiv.css({position:($.datepicker._inDialog&&$.blockUI?"static":(isFixed?"fixed":"absolute")),display:"none",left:offset.left+"px",top:offset.top+"px"});
if(!inst.inline){var showAnim=$.datepicker._get(inst,"showAnim");
var duration=$.datepicker._get(inst,"duration");
var postProcess=function(){var cover=inst.dpDiv.find("iframe.ui-datepicker-cover");
if(!!cover.length){var borders=$.datepicker._getBorders(inst.dpDiv);
cover.css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()})
}};
inst.dpDiv.zIndex($(input).zIndex()+1);
$.datepicker._datepickerShowing=true;
if($.effects&&$.effects[showAnim]){inst.dpDiv.show(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)
}else{inst.dpDiv[showAnim||"show"]((showAnim?duration:null),postProcess)
}if(!showAnim||!duration){postProcess()
}if(inst.input.is(":visible")&&!inst.input.is(":disabled")){inst.input.focus()
}$.datepicker._curInst=inst
}},_updateDatepicker:function(inst){var self=this;
self.maxRows=4;
var borders=$.datepicker._getBorders(inst.dpDiv);
instActive=inst;
inst.dpDiv.empty().append(this._generateHTML(inst));
var cover=inst.dpDiv.find("iframe.ui-datepicker-cover");
if(!!cover.length){cover.css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()})
}inst.dpDiv.find("."+this._dayOverClass+" a").mouseover();
var numMonths=this._getNumberOfMonths(inst);
var cols=numMonths[1];
var width=17;
inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
if(cols>1){inst.dpDiv.addClass("ui-datepicker-multi-"+cols).css("width",(width*cols)+"em")
}inst.dpDiv[(numMonths[0]!=1||numMonths[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");
inst.dpDiv[(this._get(inst,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");
if(inst==$.datepicker._curInst&&$.datepicker._datepickerShowing&&inst.input&&inst.input.is(":visible")&&!inst.input.is(":disabled")&&inst.input[0]!=document.activeElement){inst.input.focus()
}if(inst.yearshtml){var origyearshtml=inst.yearshtml;
setTimeout(function(){if(origyearshtml===inst.yearshtml&&inst.yearshtml){inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml)
}origyearshtml=inst.yearshtml=null
},0)
}},_getBorders:function(elem){var convert=function(value){return{thin:1,medium:2,thick:3}[value]||value
};
return[parseFloat(convert(elem.css("border-left-width"))),parseFloat(convert(elem.css("border-top-width")))]
},_checkOffset:function(inst,offset,isFixed){var dpWidth=inst.dpDiv.outerWidth();
var dpHeight=inst.dpDiv.outerHeight();
var inputWidth=inst.input?inst.input.outerWidth():0;
var inputHeight=inst.input?inst.input.outerHeight():0;
var viewWidth=document.documentElement.clientWidth+$(document).scrollLeft();
var viewHeight=document.documentElement.clientHeight+$(document).scrollTop();
offset.left-=(this._get(inst,"isRTL")?(dpWidth-inputWidth):0);
offset.left-=(isFixed&&offset.left==inst.input.offset().left)?$(document).scrollLeft():0;
offset.top-=(isFixed&&offset.top==(inst.input.offset().top+inputHeight))?$(document).scrollTop():0;
offset.left-=Math.min(offset.left,(offset.left+dpWidth>viewWidth&&viewWidth>dpWidth)?Math.abs(offset.left+dpWidth-viewWidth):0);
offset.top-=Math.min(offset.top,(offset.top+dpHeight>viewHeight&&viewHeight>dpHeight)?Math.abs(dpHeight+inputHeight):0);
return offset
},_findPos:function(obj){var inst=this._getInst(obj);
var isRTL=this._get(inst,"isRTL");
while(obj&&(obj.type=="hidden"||obj.nodeType!=1||$.expr.filters.hidden(obj))){obj=obj[isRTL?"previousSibling":"nextSibling"]
}var position=$(obj).offset();
return[position.left,position.top]
},_hideDatepicker:function(input){var inst=this._curInst;
if(!inst||(input&&inst!=$.data(input,PROP_NAME))){return 
}if(this._datepickerShowing){var showAnim=this._get(inst,"showAnim");
var duration=this._get(inst,"duration");
var self=this;
var postProcess=function(){$.datepicker._tidyDialog(inst);
self._curInst=null
};
if($.effects&&$.effects[showAnim]){inst.dpDiv.hide(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)
}else{inst.dpDiv[(showAnim=="slideDown"?"slideUp":(showAnim=="fadeIn"?"fadeOut":"hide"))]((showAnim?duration:null),postProcess)
}if(!showAnim){postProcess()
}this._datepickerShowing=false;
var onClose=this._get(inst,"onClose");
if(onClose){onClose.apply((inst.input?inst.input[0]:null),[(inst.input?inst.input.val():""),inst])
}this._lastInput=null;
if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});
if($.blockUI){$.unblockUI();
$("body").append(this.dpDiv)
}}this._inDialog=false
}},_tidyDialog:function(inst){inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
},_checkExternalClick:function(event){if(!$.datepicker._curInst){return 
}var $target=$(event.target),inst=$.datepicker._getInst($target[0]);
if((($target[0].id!=$.datepicker._mainDivId&&$target.parents("#"+$.datepicker._mainDivId).length==0&&!$target.hasClass($.datepicker.markerClassName)&&!$target.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&!($.datepicker._inDialog&&$.blockUI)))||($target.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=inst)){$.datepicker._hideDatepicker()
}},_adjustDate:function(id,offset,period){var target=$(id);
var inst=this._getInst(target[0]);
if(this._isDisabledDatepicker(target[0])){return 
}this._adjustInstDate(inst,offset+(period=="M"?this._get(inst,"showCurrentAtPos"):0),period);
this._updateDatepicker(inst)
},_gotoToday:function(id){var target=$(id);
var inst=this._getInst(target[0]);
if(this._get(inst,"gotoCurrent")&&inst.currentDay){inst.selectedDay=inst.currentDay;
inst.drawMonth=inst.selectedMonth=inst.currentMonth;
inst.drawYear=inst.selectedYear=inst.currentYear
}else{var date=new Date();
inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear()
}this._notifyChange(inst);
this._adjustDate(target)
},_selectMonthYear:function(id,select,period){var target=$(id);
var inst=this._getInst(target[0]);
inst["selected"+(period=="M"?"Month":"Year")]=inst["draw"+(period=="M"?"Month":"Year")]=parseInt(select.options[select.selectedIndex].value,10);
this._notifyChange(inst);
this._adjustDate(target)
},_selectDay:function(id,month,year,td){var target=$(id);
if($(td).hasClass(this._unselectableClass)||this._isDisabledDatepicker(target[0])){return 
}var inst=this._getInst(target[0]);
inst.selectedDay=inst.currentDay=$("a",td).html();
inst.selectedMonth=inst.currentMonth=month;
inst.selectedYear=inst.currentYear=year;
this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear))
},_clearDate:function(id){var target=$(id);
var inst=this._getInst(target[0]);
this._selectDate(target,"")
},_selectDate:function(id,dateStr){var target=$(id);
var inst=this._getInst(target[0]);
dateStr=(dateStr!=null?dateStr:this._formatDate(inst));
if(inst.input){inst.input.val(dateStr)
}this._updateAlternate(inst);
var onSelect=this._get(inst,"onSelect");
if(onSelect){onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])
}else{if(inst.input){inst.input.trigger("change")
}}if(inst.inline){this._updateDatepicker(inst)
}else{this._hideDatepicker();
this._lastInput=inst.input[0];
if(typeof (inst.input[0])!="object"){inst.input.focus()
}this._lastInput=null
}},_updateAlternate:function(inst){var altField=this._get(inst,"altField");
if(altField){var altFormat=this._get(inst,"altFormat")||this._get(inst,"dateFormat");
var date=this._getDate(inst);
var dateStr=this.formatDate(altFormat,date,this._getFormatConfig(inst));
$(altField).each(function(){$(this).val(dateStr)
})
}},noWeekends:function(date){var day=date.getDay();
return[(day>0&&day<6),""]
},iso8601Week:function(date){var checkDate=new Date(date.getTime());
checkDate.setDate(checkDate.getDate()+4-(checkDate.getDay()||7));
var time=checkDate.getTime();
checkDate.setMonth(0);
checkDate.setDate(1);
return Math.floor(Math.round((time-checkDate)/86400000)/7)+1
},parseDate:function(format,value,settings){if(format==null||value==null){throw"Invalid arguments"
}value=(typeof value=="object"?value.toString():value+"");
if(value==""){return null
}var shortYearCutoff=(settings?settings.shortYearCutoff:null)||this._defaults.shortYearCutoff;
shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));
var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;
var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;
var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;
var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;
var year=-1;
var month=-1;
var day=-1;
var doy=-1;
var literal=false;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++
}return matches
};
var getNumber=function(match){var isDoubled=lookAhead(match);
var size=(match=="@"?14:(match=="!"?20:(match=="y"&&isDoubled?4:(match=="o"?3:2))));
var digits=new RegExp("^\\d{1,"+size+"}");
var num=value.substring(iValue).match(digits);
if(!num){throw"Missing number at position "+iValue
}iValue+=num[0].length;
return parseInt(num[0],10)
};
var getName=function(match,shortNames,longNames){var names=$.map(lookAhead(match)?longNames:shortNames,function(v,k){return[[k,v]]
}).sort(function(a,b){return -(a[1].length-b[1].length)
});
var index=-1;
$.each(names,function(i,pair){var name=pair[1];
if(value.substr(iValue,name.length).toLowerCase()==name.toLowerCase()){index=pair[0];
iValue+=name.length;
return false
}});
if(index!=-1){return index+1
}else{throw"Unknown name at position "+iValue
}};
var checkLiteral=function(){if(value.charAt(iValue)!=format.charAt(iFormat)){throw"Unexpected literal at position "+iValue
}iValue++
};
var iValue=0;
for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{checkLiteral()
}}else{switch(format.charAt(iFormat)){case"d":day=getNumber("d");
break;
case"D":getName("D",dayNamesShort,dayNames);
break;
case"o":doy=getNumber("o");
break;
case"m":month=getNumber("m");
break;
case"M":month=getName("M",monthNamesShort,monthNames);
break;
case"y":year=getNumber("y");
break;
case"@":var date=new Date(getNumber("@"));
year=date.getFullYear();
month=date.getMonth()+1;
day=date.getDate();
break;
case"!":var date=new Date((getNumber("!")-this._ticksTo1970)/10000);
year=date.getFullYear();
month=date.getMonth()+1;
day=date.getDate();
break;
case"'":if(lookAhead("'")){checkLiteral()
}else{literal=true
}break;
default:checkLiteral()
}}}if(iValue<value.length){throw"Extra/unparsed characters found in date: "+value.substring(iValue)
}if(year==-1){year=new Date().getFullYear()
}else{if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+(year<=shortYearCutoff?0:-100)
}}if(doy>-1){month=1;
day=doy;
do{var dim=this._getDaysInMonth(year,month-1);
if(day<=dim){break
}month++;
day-=dim
}while(true)
}var date=this._daylightSavingAdjust(new Date(year,month-1,day));
if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){throw"Invalid date"
}return date
},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(((1970-1)*365+Math.floor(1970/4)-Math.floor(1970/100)+Math.floor(1970/400))*24*60*60*10000000),formatDate:function(format,date,settings){if(!date){return""
}var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;
var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;
var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;
var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++
}return matches
};
var formatNumber=function(match,value,len){var num=""+value;
if(lookAhead(match)){while(num.length<len){num="0"+num
}}return num
};
var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value])
};
var output="";
var literal=false;
if(date){for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{output+=format.charAt(iFormat)
}}else{switch(format.charAt(iFormat)){case"d":output+=formatNumber("d",date.getDate(),2);
break;
case"D":output+=formatName("D",date.getDay(),dayNamesShort,dayNames);
break;
case"o":output+=formatNumber("o",Math.round((new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime()-new Date(date.getFullYear(),0,0).getTime())/86400000),3);
break;
case"m":output+=formatNumber("m",date.getMonth()+1,2);
break;
case"M":output+=formatName("M",date.getMonth(),monthNamesShort,monthNames);
break;
case"y":output+=(lookAhead("y")?date.getFullYear():(date.getYear()%100<10?"0":"")+date.getYear()%100);
break;
case"@":output+=date.getTime();
break;
case"!":output+=date.getTime()*10000+this._ticksTo1970;
break;
case"'":if(lookAhead("'")){output+="'"
}else{literal=true
}break;
default:output+=format.charAt(iFormat)
}}}}return output
},_possibleChars:function(format){var chars="";
var literal=false;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++
}return matches
};
for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{chars+=format.charAt(iFormat)
}}else{switch(format.charAt(iFormat)){case"d":case"m":case"y":case"@":chars+="0123456789";
break;
case"D":case"M":return null;
case"'":if(lookAhead("'")){chars+="'"
}else{literal=true
}break;
default:chars+=format.charAt(iFormat)
}}}return chars
},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]
},_setDateFromField:function(inst,noDefault){if(inst.input.val()==inst.lastVal){return 
}var dateFormat=this._get(inst,"dateFormat");
var dates=inst.lastVal=inst.input?inst.input.val():null;
var date,defaultDate;
date=defaultDate=this._getDefaultDate(inst);
var settings=this._getFormatConfig(inst);
try{date=this.parseDate(dateFormat,dates,settings)||defaultDate
}catch(event){this.log(event);
dates=(noDefault?"":dates)
}inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();
inst.currentDay=(dates?date.getDate():0);
inst.currentMonth=(dates?date.getMonth():0);
inst.currentYear=(dates?date.getFullYear():0);
this._adjustInstDate(inst)
},_getDefaultDate:function(inst){return this._restrictMinMax(inst,this._determineDate(inst,this._get(inst,"defaultDate"),new Date()))
},_determineDate:function(inst,date,defaultDate){var offsetNumeric=function(offset){var date=new Date();
date.setDate(date.getDate()+offset);
return date
};
var offsetString=function(offset){try{return $.datepicker.parseDate($.datepicker._get(inst,"dateFormat"),offset,$.datepicker._getFormatConfig(inst))
}catch(e){}var date=(offset.toLowerCase().match(/^c/)?$.datepicker._getDate(inst):null)||new Date();
var year=date.getFullYear();
var month=date.getMonth();
var day=date.getDate();
var pattern=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
var matches=pattern.exec(offset);
while(matches){switch(matches[2]||"d"){case"d":case"D":day+=parseInt(matches[1],10);
break;
case"w":case"W":day+=parseInt(matches[1],10)*7;
break;
case"m":case"M":month+=parseInt(matches[1],10);
day=Math.min(day,$.datepicker._getDaysInMonth(year,month));
break;
case"y":case"Y":year+=parseInt(matches[1],10);
day=Math.min(day,$.datepicker._getDaysInMonth(year,month));
break
}matches=pattern.exec(offset)
}return new Date(year,month,day)
};
var newDate=(date==null||date===""?defaultDate:(typeof date=="string"?offsetString(date):(typeof date=="number"?(isNaN(date)?defaultDate:offsetNumeric(date)):new Date(date.getTime()))));
newDate=(newDate&&newDate.toString()=="Invalid Date"?defaultDate:newDate);
if(newDate){newDate.setHours(0);
newDate.setMinutes(0);
newDate.setSeconds(0);
newDate.setMilliseconds(0)
}return this._daylightSavingAdjust(newDate)
},_daylightSavingAdjust:function(date){if(!date){return null
}date.setHours(date.getHours()>12?date.getHours()+2:0);
return date
},_setDate:function(inst,date,noChange){var clear=!date;
var origMonth=inst.selectedMonth;
var origYear=inst.selectedYear;
var newDate=this._restrictMinMax(inst,this._determineDate(inst,date,new Date()));
inst.selectedDay=inst.currentDay=newDate.getDate();
inst.drawMonth=inst.selectedMonth=inst.currentMonth=newDate.getMonth();
inst.drawYear=inst.selectedYear=inst.currentYear=newDate.getFullYear();
if((origMonth!=inst.selectedMonth||origYear!=inst.selectedYear)&&!noChange){this._notifyChange(inst)
}this._adjustInstDate(inst);
if(inst.input){inst.input.val(clear?"":this._formatDate(inst))
}},_getDate:function(inst){var startDate=(!inst.currentYear||(inst.input&&inst.input.val()=="")?null:this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
return startDate
},_generateHTML:function(inst){var today=new Date();
today=this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));
var isRTL=this._get(inst,"isRTL");
var showButtonPanel=this._get(inst,"showButtonPanel");
var hideIfNoPrevNext=this._get(inst,"hideIfNoPrevNext");
var navigationAsDateFormat=this._get(inst,"navigationAsDateFormat");
var numMonths=this._getNumberOfMonths(inst);
var showCurrentAtPos=this._get(inst,"showCurrentAtPos");
var stepMonths=this._get(inst,"stepMonths");
var isMultiMonth=(numMonths[0]!=1||numMonths[1]!=1);
var currentDate=this._daylightSavingAdjust((!inst.currentDay?new Date(9999,9,9):new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
var drawMonth=inst.drawMonth-showCurrentAtPos;
var drawYear=inst.drawYear;
if(drawMonth<0){drawMonth+=12;
drawYear--
}if(maxDate){var maxDraw=this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth()-(numMonths[0]*numMonths[1])+1,maxDate.getDate()));
maxDraw=(minDate&&maxDraw<minDate?minDate:maxDraw);
while(this._daylightSavingAdjust(new Date(drawYear,drawMonth,1))>maxDraw){drawMonth--;
if(drawMonth<0){drawMonth=11;
drawYear--
}}}inst.drawMonth=drawMonth;
inst.drawYear=drawYear;
var prevText=this._get(inst,"prevText");
prevText=(!navigationAsDateFormat?prevText:this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth-stepMonths,1)),this._getFormatConfig(inst)));
var prev=(this._canAdjustMonth(inst,-1,drawYear,drawMonth)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+inst.id+"', -"+stepMonths+", 'M');\" title=\""+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>"));
var nextText=this._get(inst,"nextText");
nextText=(!navigationAsDateFormat?nextText:this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth+stepMonths,1)),this._getFormatConfig(inst)));
var next=(this._canAdjustMonth(inst,+1,drawYear,drawMonth)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+inst.id+"', +"+stepMonths+", 'M');\" title=\""+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>"));
var currentText=this._get(inst,"currentText");
var gotoDate=(this._get(inst,"gotoCurrent")&&inst.currentDay?currentDate:today);
currentText=(!navigationAsDateFormat?currentText:this.formatDate(currentText,gotoDate,this._getFormatConfig(inst)));
var controls=(!inst.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+dpuuid+'.datepicker._hideDatepicker();">'+this._get(inst,"closeText")+"</button>":"");
var buttonPanel=(showButtonPanel)?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(isRTL?controls:"")+(this._isInRange(inst,gotoDate)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._gotoToday('#"+inst.id+"');\">"+currentText+"</button>":"")+(isRTL?"":controls)+"</div>":"";
var firstDay=parseInt(this._get(inst,"firstDay"),10);
firstDay=(isNaN(firstDay)?0:firstDay);
var showWeek=this._get(inst,"showWeek");
var dayNames=this._get(inst,"dayNames");
var dayNamesShort=this._get(inst,"dayNamesShort");
var dayNamesMin=this._get(inst,"dayNamesMin");
var monthNames=this._get(inst,"monthNames");
var monthNamesShort=this._get(inst,"monthNamesShort");
var beforeShowDay=this._get(inst,"beforeShowDay");
var showOtherMonths=this._get(inst,"showOtherMonths");
var selectOtherMonths=this._get(inst,"selectOtherMonths");
var calculateWeek=this._get(inst,"calculateWeek")||this.iso8601Week;
var defaultDate=this._getDefaultDate(inst);
var html="";
for(var row=0;
row<numMonths[0];
row++){var group="";
this.maxRows=4;
for(var col=0;
col<numMonths[1];
col++){var selectedDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));
var cornerClass=" ui-corner-all";
var calender="";
if(isMultiMonth){calender+='<div class="ui-datepicker-group';
if(numMonths[1]>1){switch(col){case 0:calender+=" ui-datepicker-group-first";
cornerClass=" ui-corner-"+(isRTL?"right":"left");
break;
case numMonths[1]-1:calender+=" ui-datepicker-group-last";
cornerClass=" ui-corner-"+(isRTL?"left":"right");
break;
default:calender+=" ui-datepicker-group-middle";
cornerClass="";
break
}}calender+='">'
}calender+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+cornerClass+'">'+(/all|left/.test(cornerClass)&&row==0?(isRTL?next:prev):"")+(/all|right/.test(cornerClass)&&row==0?(isRTL?prev:next):"")+this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,row>0||col>0,monthNames,monthNamesShort)+'</div><table class="ui-datepicker-calendar"><thead><tr>';
var thead=(showWeek?'<th class="ui-datepicker-week-col">'+this._get(inst,"weekHeader")+"</th>":"");
for(var dow=0;
dow<7;
dow++){var day=(dow+firstDay)%7;
thead+="<th"+((dow+firstDay+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+dayNames[day]+'">'+dayNamesMin[day]+"</span></th>"
}calender+=thead+"</tr></thead><tbody>";
var daysInMonth=this._getDaysInMonth(drawYear,drawMonth);
if(drawYear==inst.selectedYear&&drawMonth==inst.selectedMonth){inst.selectedDay=Math.min(inst.selectedDay,daysInMonth)
}var leadDays=(this._getFirstDayOfMonth(drawYear,drawMonth)-firstDay+7)%7;
var curRows=Math.ceil((leadDays+daysInMonth)/7);
var numRows=(isMultiMonth?this.maxRows>curRows?this.maxRows:curRows:curRows);
this.maxRows=numRows;
var printDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,1-leadDays));
for(var dRow=0;
dRow<numRows;
dRow++){calender+="<tr>";
var tbody=(!showWeek?"":'<td class="ui-datepicker-week-col">'+this._get(inst,"calculateWeek")(printDate)+"</td>");
for(var dow=0;
dow<7;
dow++){var daySettings=(beforeShowDay?beforeShowDay.apply((inst.input?inst.input[0]:null),[printDate]):[true,""]);
var otherMonth=(printDate.getMonth()!=drawMonth);
var unselectable=(otherMonth&&!selectOtherMonths)||!daySettings[0]||(minDate&&printDate<minDate)||(maxDate&&printDate>maxDate);
tbody+='<td class="'+((dow+firstDay+6)%7>=5?" ui-datepicker-week-end":"")+(otherMonth?" ui-datepicker-other-month":"")+((printDate.getTime()==selectedDate.getTime()&&drawMonth==inst.selectedMonth&&inst._keyEvent)||(defaultDate.getTime()==printDate.getTime()&&defaultDate.getTime()==selectedDate.getTime())?" "+this._dayOverClass:"")+(unselectable?" "+this._unselectableClass+" ui-state-disabled":"")+(otherMonth&&!showOtherMonths?"":" "+daySettings[1]+(printDate.getTime()==currentDate.getTime()?" "+this._currentClass:"")+(printDate.getTime()==today.getTime()?" ui-datepicker-today":""))+'"'+((!otherMonth||showOtherMonths)&&daySettings[2]?' title="'+daySettings[2]+'"':"")+(unselectable?"":' onclick="DP_jQuery_'+dpuuid+".datepicker._selectDay('#"+inst.id+"',"+printDate.getMonth()+","+printDate.getFullYear()+', this);return false;"')+">"+(otherMonth&&!showOtherMonths?"&#xa0;":(unselectable?'<span class="ui-state-default">'+printDate.getDate()+"</span>":'<a class="ui-state-default'+(printDate.getTime()==today.getTime()?" ui-state-highlight":"")+(printDate.getTime()==currentDate.getTime()?" ui-state-active":"")+(otherMonth?" ui-priority-secondary":"")+'" href="#">'+printDate.getDate()+"</a>"))+"</td>";
printDate.setDate(printDate.getDate()+1);
printDate=this._daylightSavingAdjust(printDate)
}calender+=tbody+"</tr>"
}drawMonth++;
if(drawMonth>11){drawMonth=0;
drawYear++
}calender+="</tbody></table>"+(isMultiMonth?"</div>"+((numMonths[0]>0&&col==numMonths[1]-1)?'<div class="ui-datepicker-row-break"></div>':""):"");
group+=calender
}html+=group
}html+=buttonPanel+($.browser.msie&&parseInt($.browser.version,10)<7&&!inst.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");
inst._keyEvent=false;
return html
},_generateMonthYearHeader:function(inst,drawMonth,drawYear,minDate,maxDate,secondary,monthNames,monthNamesShort){var changeMonth=this._get(inst,"changeMonth");
var changeYear=this._get(inst,"changeYear");
var showMonthAfterYear=this._get(inst,"showMonthAfterYear");
var html='<div class="ui-datepicker-title">';
var monthHtml="";
if(secondary||!changeMonth){monthHtml+='<span class="ui-datepicker-month">'+monthNames[drawMonth]+"</span>"
}else{var inMinYear=(minDate&&minDate.getFullYear()==drawYear);
var inMaxYear=(maxDate&&maxDate.getFullYear()==drawYear);
monthHtml+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+inst.id+"', this, 'M');\" >";
for(var month=0;
month<12;
month++){if((!inMinYear||month>=minDate.getMonth())&&(!inMaxYear||month<=maxDate.getMonth())){monthHtml+='<option value="'+month+'"'+(month==drawMonth?' selected="selected"':"")+">"+monthNamesShort[month]+"</option>"
}}monthHtml+="</select>"
}if(!showMonthAfterYear){html+=monthHtml+(secondary||!(changeMonth&&changeYear)?"&#xa0;":"")
}if(!inst.yearshtml){inst.yearshtml="";
if(secondary||!changeYear){html+='<span class="ui-datepicker-year">'+drawYear+"</span>"
}else{var years=this._get(inst,"yearRange").split(":");
var thisYear=new Date().getFullYear();
var determineYear=function(value){var year=(value.match(/c[+-].*/)?drawYear+parseInt(value.substring(1),10):(value.match(/[+-].*/)?thisYear+parseInt(value,10):parseInt(value,10)));
return(isNaN(year)?thisYear:year)
};
var year=determineYear(years[0]);
var endYear=Math.max(year,determineYear(years[1]||""));
year=(minDate?Math.max(year,minDate.getFullYear()):year);
endYear=(maxDate?Math.min(endYear,maxDate.getFullYear()):endYear);
inst.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+inst.id+"', this, 'Y');\" >";
for(;
year<=endYear;
year++){inst.yearshtml+='<option value="'+year+'"'+(year==drawYear?' selected="selected"':"")+">"+year+"</option>"
}inst.yearshtml+="</select>";
html+=inst.yearshtml;
inst.yearshtml=null
}}html+=this._get(inst,"yearSuffix");
if(showMonthAfterYear){html+=(secondary||!(changeMonth&&changeYear)?"&#xa0;":"")+monthHtml
}html+="</div>";
return html
},_adjustInstDate:function(inst,offset,period){var year=inst.drawYear+(period=="Y"?offset:0);
var month=inst.drawMonth+(period=="M"?offset:0);
var day=Math.min(inst.selectedDay,this._getDaysInMonth(year,month))+(period=="D"?offset:0);
var date=this._restrictMinMax(inst,this._daylightSavingAdjust(new Date(year,month,day)));
inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();
if(period=="M"||period=="Y"){this._notifyChange(inst)
}},_restrictMinMax:function(inst,date){var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
var newDate=(minDate&&date<minDate?minDate:date);
newDate=(maxDate&&newDate>maxDate?maxDate:newDate);
return newDate
},_notifyChange:function(inst){var onChange=this._get(inst,"onChangeMonthYear");
if(onChange){onChange.apply((inst.input?inst.input[0]:null),[inst.selectedYear,inst.selectedMonth+1,inst])
}},_getNumberOfMonths:function(inst){var numMonths=this._get(inst,"numberOfMonths");
return(numMonths==null?[1,1]:(typeof numMonths=="number"?[1,numMonths]:numMonths))
},_getMinMaxDate:function(inst,minMax){return this._determineDate(inst,this._get(inst,minMax+"Date"),null)
},_getDaysInMonth:function(year,month){return 32-this._daylightSavingAdjust(new Date(year,month,32)).getDate()
},_getFirstDayOfMonth:function(year,month){return new Date(year,month,1).getDay()
},_canAdjustMonth:function(inst,offset,curYear,curMonth){var numMonths=this._getNumberOfMonths(inst);
var date=this._daylightSavingAdjust(new Date(curYear,curMonth+(offset<0?offset:numMonths[0]*numMonths[1]),1));
if(offset<0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()))
}return this._isInRange(inst,date)
},_isInRange:function(inst,date){var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
return((!minDate||date.getTime()>=minDate.getTime())&&(!maxDate||date.getTime()<=maxDate.getTime()))
},_getFormatConfig:function(inst){var shortYearCutoff=this._get(inst,"shortYearCutoff");
shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));
return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,"dayNamesShort"),dayNames:this._get(inst,"dayNames"),monthNamesShort:this._get(inst,"monthNamesShort"),monthNames:this._get(inst,"monthNames")}
},_formatDate:function(inst,day,month,year){if(!day){inst.currentDay=inst.selectedDay;
inst.currentMonth=inst.selectedMonth;
inst.currentYear=inst.selectedYear
}var date=(day?(typeof day=="object"?day:this._daylightSavingAdjust(new Date(year,month,day))):this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
return this.formatDate(this._get(inst,"dateFormat"),date,this._getFormatConfig(inst))
}});
function bindHover(dpDiv){var selector="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
return dpDiv.bind("mouseout",function(event){var elem=$(event.target).closest(selector);
if(!elem.length){return 
}elem.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
}).bind("mouseover",function(event){var elem=$(event.target).closest(selector);
if($.datepicker._isDisabledDatepicker(instActive.inline?dpDiv.parent()[0]:instActive.input[0])||!elem.length){return 
}elem.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
elem.addClass("ui-state-hover");
if(elem.hasClass("ui-datepicker-prev")){elem.addClass("ui-datepicker-prev-hover")
}if(elem.hasClass("ui-datepicker-next")){elem.addClass("ui-datepicker-next-hover")
}})
}function extendRemove(target,props){$.extend(target,props);
for(var name in props){if(props[name]==null||props[name]==undefined){target[name]=props[name]
}}return target
}function isArray(a){return(a&&(($.browser.safari&&typeof a=="object"&&a.length)||(a.constructor&&a.constructor.toString().match(/\Array\(\)/))))
}$.fn.datepicker=function(options){if(!this.length){return this
}if(!$.datepicker.initialized){$(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
$.datepicker.initialized=true
}var otherArgs=Array.prototype.slice.call(arguments,1);
if(typeof options=="string"&&(options=="isDisabled"||options=="getDate"||options=="widget")){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))
}if(options=="option"&&arguments.length==2&&typeof arguments[1]=="string"){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))
}return this.each(function(){typeof options=="string"?$.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this].concat(otherArgs)):$.datepicker._attachDatepicker(this,options)
})
};
$.datepicker=new Datepicker();
$.datepicker.initialized=false;
$.datepicker.uuid=new Date().getTime();
$.datepicker.version="1.8.18";
window["DP_jQuery_"+dpuuid]=$
})(jQuery);
(function(E,F){var C="ui-dialog ui-widget ui-widget-content ui-corner-all ",B={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},D={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},A=E.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};
E.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(H){var G=E(this).css(H).offset().top;
if(G<0){E(this).css("top",H.top-G)
}}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},_create:function(){this.originalTitle=this.element.attr("title");
if(typeof this.originalTitle!=="string"){this.originalTitle=""
}this.options.title=this.options.title||this.originalTitle;
var O=this,P=O.options,M=P.title||"&#160;",H=E.ui.dialog.getTitleId(O.element),N=(O.uiDialog=E("<div></div>")).appendTo(document.body).hide().addClass(C+P.dialogClass).css({zIndex:P.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(Q){if(P.closeOnEscape&&!Q.isDefaultPrevented()&&Q.keyCode&&Q.keyCode===E.ui.keyCode.ESCAPE){O.close(Q);
Q.preventDefault()
}}).attr({role:"dialog","aria-labelledby":H}).mousedown(function(Q){O.moveToTop(false,Q)
}),J=O.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(N),I=(O.uiDialogTitlebar=E("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(N),L=E('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){L.addClass("ui-state-hover")
},function(){L.removeClass("ui-state-hover")
}).focus(function(){L.addClass("ui-state-focus")
}).blur(function(){L.removeClass("ui-state-focus")
}).click(function(Q){O.close(Q);
return false
}).appendTo(I),K=(O.uiDialogTitlebarCloseText=E("<span></span>")).addClass("ui-icon ui-icon-closethick").text(P.closeText).appendTo(L),G=E("<span></span>").addClass("ui-dialog-title").attr("id",H).html(M).prependTo(I);
if(E.isFunction(P.beforeclose)&&!E.isFunction(P.beforeClose)){P.beforeClose=P.beforeclose
}I.find("*").add(I).disableSelection();
if(P.draggable&&E.fn.draggable){O._makeDraggable()
}if(P.resizable&&E.fn.resizable){O._makeResizable()
}O._createButtons(P.buttons);
O._isOpen=false;
if(E.fn.bgiframe){N.bgiframe()
}},_init:function(){if(this.options.autoOpen){this.open()
}},destroy:function(){var G=this;
if(G.overlay){G.overlay.destroy()
}G.uiDialog.hide();
G.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
G.uiDialog.remove();
if(G.originalTitle){G.element.attr("title",G.originalTitle)
}return G
},widget:function(){return this.uiDialog
},close:function(J){var G=this,I,H;
if(false===G._trigger("beforeClose",J)){return 
}if(G.overlay){G.overlay.destroy()
}G.uiDialog.unbind("keypress.ui-dialog");
G._isOpen=false;
if(G.options.hide){G.uiDialog.hide(G.options.hide,function(){G._trigger("close",J)
})
}else{G.uiDialog.hide();
G._trigger("close",J)
}E.ui.dialog.overlay.resize();
if(G.options.modal){I=0;
E(".ui-dialog").each(function(){if(this!==G.uiDialog[0]){H=E(this).css("z-index");
if(!isNaN(H)){I=Math.max(I,H)
}}});
E.ui.dialog.maxZ=I
}return G
},isOpen:function(){return this._isOpen
},moveToTop:function(K,J){var G=this,I=G.options,H;
if((I.modal&&!K)||(!I.stack&&!I.modal)){return G._trigger("focus",J)
}if(I.zIndex>E.ui.dialog.maxZ){E.ui.dialog.maxZ=I.zIndex
}if(G.overlay){E.ui.dialog.maxZ+=1;
G.overlay.$el.css("z-index",E.ui.dialog.overlay.maxZ=E.ui.dialog.maxZ)
}H={scrollTop:G.element.scrollTop(),scrollLeft:G.element.scrollLeft()};
E.ui.dialog.maxZ+=1;
G.uiDialog.css("z-index",E.ui.dialog.maxZ);
G.element.attr(H);
G._trigger("focus",J);
return G
},open:function(){if(this._isOpen){return 
}var H=this,I=H.options,G=H.uiDialog;
H.overlay=I.modal?new E.ui.dialog.overlay(H):null;
H._size();
H._position(I.position);
G.show(I.show);
H.moveToTop(true);
if(I.modal){G.bind("keydown.ui-dialog",function(L){if(L.keyCode!==E.ui.keyCode.TAB){return 
}var K=E(":tabbable",this),M=K.filter(":first"),J=K.filter(":last");
if(L.target===J[0]&&!L.shiftKey){M.focus(1);
return false
}else{if(L.target===M[0]&&L.shiftKey){J.focus(1);
return false
}}})
}E(H.element.find(":tabbable").get().concat(G.find(".ui-dialog-buttonpane :tabbable").get().concat(G.get()))).eq(0).focus();
H._isOpen=true;
H._trigger("open");
return H
},_createButtons:function(J){var I=this,G=false,H=E("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),K=E("<div></div>").addClass("ui-dialog-buttonset").appendTo(H);
I.uiDialog.find(".ui-dialog-buttonpane").remove();
if(typeof J==="object"&&J!==null){E.each(J,function(){return !(G=true)
})
}if(G){E.each(J,function(L,N){N=E.isFunction(N)?{click:N,text:L}:N;
var M=E('<button type="button"></button>').click(function(){N.click.apply(I.element[0],arguments)
}).appendTo(K);
E.each(N,function(O,P){if(O==="click"){return 
}if(O in A){M[O](P)
}else{M.attr(O,P)
}});
if(E.fn.button){M.button()
}});
H.appendTo(I.uiDialog)
}},_makeDraggable:function(){var G=this,J=G.options,K=E(document),I;
function H(L){return{position:L.position,offset:L.offset}
}G.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(L,M){I=J.height==="auto"?"auto":E(this).height();
E(this).height(E(this).height()).addClass("ui-dialog-dragging");
G._trigger("dragStart",L,H(M))
},drag:function(L,M){G._trigger("drag",L,H(M))
},stop:function(L,M){J.position=[M.position.left-K.scrollLeft(),M.position.top-K.scrollTop()];
E(this).removeClass("ui-dialog-dragging").height(I);
G._trigger("dragStop",L,H(M));
E.ui.dialog.overlay.resize()
}})
},_makeResizable:function(L){L=(L===F?this.options.resizable:L);
var H=this,K=H.options,G=H.uiDialog.css("position"),J=(typeof L==="string"?L:"n,e,s,w,se,sw,ne,nw");
function I(M){return{originalPosition:M.originalPosition,originalSize:M.originalSize,position:M.position,size:M.size}
}H.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:H.element,maxWidth:K.maxWidth,maxHeight:K.maxHeight,minWidth:K.minWidth,minHeight:H._minHeight(),handles:J,start:function(M,N){E(this).addClass("ui-dialog-resizing");
H._trigger("resizeStart",M,I(N))
},resize:function(M,N){H._trigger("resize",M,I(N))
},stop:function(M,N){E(this).removeClass("ui-dialog-resizing");
K.height=E(this).height();
K.width=E(this).width();
H._trigger("resizeStop",M,I(N));
E.ui.dialog.overlay.resize()
}}).css("position",G).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
},_minHeight:function(){var G=this.options;
if(G.height==="auto"){return G.minHeight
}else{return Math.min(G.minHeight,G.height)
}},_position:function(H){var I=[],J=[0,0],G;
if(H){if(typeof H==="string"||(typeof H==="object"&&"0" in H)){I=H.split?H.split(" "):[H[0],H[1]];
if(I.length===1){I[1]=I[0]
}E.each(["left","top"],function(L,K){if(+I[L]===I[L]){J[L]=I[L];
I[L]=K
}});
H={my:I.join(" "),at:I.join(" "),offset:J.join(" ")}
}H=E.extend({},E.ui.dialog.prototype.options.position,H)
}else{H=E.ui.dialog.prototype.options.position
}G=this.uiDialog.is(":visible");
if(!G){this.uiDialog.show()
}this.uiDialog.css({top:0,left:0}).position(E.extend({of:window},H));
if(!G){this.uiDialog.hide()
}},_setOptions:function(J){var H=this,G={},I=false;
E.each(J,function(K,L){H._setOption(K,L);
if(K in B){I=true
}if(K in D){G[K]=L
}});
if(I){this._size()
}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option",G)
}},_setOption:function(J,K){var H=this,G=H.uiDialog;
switch(J){case"beforeclose":J="beforeClose";
break;
case"buttons":H._createButtons(K);
break;
case"closeText":H.uiDialogTitlebarCloseText.text(""+K);
break;
case"dialogClass":G.removeClass(H.options.dialogClass).addClass(C+K);
break;
case"disabled":if(K){G.addClass("ui-dialog-disabled")
}else{G.removeClass("ui-dialog-disabled")
}break;
case"draggable":var I=G.is(":data(draggable)");
if(I&&!K){G.draggable("destroy")
}if(!I&&K){H._makeDraggable()
}break;
case"position":H._position(K);
break;
case"resizable":var L=G.is(":data(resizable)");
if(L&&!K){G.resizable("destroy")
}if(L&&typeof K==="string"){G.resizable("option","handles",K)
}if(!L&&K!==false){H._makeResizable(K)
}break;
case"title":E(".ui-dialog-title",H.uiDialogTitlebar).html(""+(K||"&#160;"));
break
}E.Widget.prototype._setOption.apply(H,arguments)
},_size:function(){var K=this.options,H,J,G=this.uiDialog.is(":visible");
this.element.show().css({width:"auto",minHeight:0,height:0});
if(K.minWidth>K.width){K.width=K.minWidth
}H=this.uiDialog.css({height:"auto",width:K.width}).height();
J=Math.max(0,K.minHeight-H);
if(K.height==="auto"){if(E.support.minHeight){this.element.css({minHeight:J,height:"auto"})
}else{this.uiDialog.show();
var I=this.element.css("height","auto").height();
if(!G){this.uiDialog.hide()
}this.element.height(Math.max(I,J))
}}else{this.element.height(Math.max(K.height-H,0))
}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option","minHeight",this._minHeight())
}}});
E.extend(E.ui.dialog,{version:"1.8.18",uuid:0,maxZ:0,getTitleId:function(G){var H=G.attr("id");
if(!H){this.uuid+=1;
H=this.uuid
}return"ui-dialog-title-"+H
},overlay:function(G){this.$el=E.ui.dialog.overlay.create(G)
}});
E.extend(E.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:E.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(G){return G+".dialog-overlay"
}).join(" "),create:function(H){if(this.instances.length===0){setTimeout(function(){if(E.ui.dialog.overlay.instances.length){E(document).bind(E.ui.dialog.overlay.events,function(I){if(E(I.target).zIndex()<E.ui.dialog.overlay.maxZ){return false
}})
}},1);
E(document).bind("keydown.dialog-overlay",function(I){if(H.options.closeOnEscape&&!I.isDefaultPrevented()&&I.keyCode&&I.keyCode===E.ui.keyCode.ESCAPE){H.close(I);
I.preventDefault()
}});
E(window).bind("resize.dialog-overlay",E.ui.dialog.overlay.resize)
}var G=(this.oldInstances.pop()||E("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});
if(E.fn.bgiframe){G.bgiframe()
}this.instances.push(G);
return G
},destroy:function(G){var H=E.inArray(G,this.instances);
if(H!=-1){this.oldInstances.push(this.instances.splice(H,1)[0])
}if(this.instances.length===0){E([document,window]).unbind(".dialog-overlay")
}G.remove();
var I=0;
E.each(this.instances,function(){I=Math.max(I,this.css("z-index"))
});
this.maxZ=I
},height:function(){var H,G;
if(E.browser.msie&&E.browser.version<7){H=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
G=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);
if(H<G){return E(window).height()+"px"
}else{return H+"px"
}}else{return E(document).height()+"px"
}},width:function(){var G,H;
if(E.browser.msie){G=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
H=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);
if(G<H){return E(window).width()+"px"
}else{return G+"px"
}}else{return E(document).width()+"px"
}},resize:function(){var G=E([]);
E.each(E.ui.dialog.overlay.instances,function(){G=G.add(this)
});
G.css({width:0,height:0}).css({width:E.ui.dialog.overlay.width(),height:E.ui.dialog.overlay.height()})
}});
E.extend(E.ui.dialog.overlay.prototype,{destroy:function(){E.ui.dialog.overlay.destroy(this.$el)
}})
}(jQuery));
(function(G,H){G.ui=G.ui||{};
var D=/left|center|right/,E=/top|center|bottom/,A="center",F={},B=G.fn.position,C=G.fn.offset;
G.fn.position=function(J){if(!J||!J.of){return B.apply(this,arguments)
}J=G.extend({},J);
var N=G(J.of),M=N[0],P=(J.collision||"flip").split(" "),O=J.offset?J.offset.split(" "):[0,0],L,I,K;
if(M.nodeType===9){L=N.width();
I=N.height();
K={top:0,left:0}
}else{if(M.setTimeout){L=N.width();
I=N.height();
K={top:N.scrollTop(),left:N.scrollLeft()}
}else{if(M.preventDefault){J.at="left top";
L=I=0;
K={top:J.of.pageY,left:J.of.pageX}
}else{L=N.outerWidth();
I=N.outerHeight();
K=N.offset()
}}}G.each(["my","at"],function(){var Q=(J[this]||"").split(" ");
if(Q.length===1){Q=D.test(Q[0])?Q.concat([A]):E.test(Q[0])?[A].concat(Q):[A,A]
}Q[0]=D.test(Q[0])?Q[0]:A;
Q[1]=E.test(Q[1])?Q[1]:A;
J[this]=Q
});
if(P.length===1){P[1]=P[0]
}O[0]=parseInt(O[0],10)||0;
if(O.length===1){O[1]=O[0]
}O[1]=parseInt(O[1],10)||0;
if(J.at[0]==="right"){K.left+=L
}else{if(J.at[0]===A){K.left+=L/2
}}if(J.at[1]==="bottom"){K.top+=I
}else{if(J.at[1]===A){K.top+=I/2
}}K.left+=O[0];
K.top+=O[1];
return this.each(function(){var T=G(this),V=T.outerWidth(),S=T.outerHeight(),U=parseInt(G.curCSS(this,"marginLeft",true))||0,R=parseInt(G.curCSS(this,"marginTop",true))||0,X=V+U+(parseInt(G.curCSS(this,"marginRight",true))||0),Y=S+R+(parseInt(G.curCSS(this,"marginBottom",true))||0),W=G.extend({},K),Q;
if(J.my[0]==="right"){W.left-=V
}else{if(J.my[0]===A){W.left-=V/2
}}if(J.my[1]==="bottom"){W.top-=S
}else{if(J.my[1]===A){W.top-=S/2
}}if(!F.fractions){W.left=Math.round(W.left);
W.top=Math.round(W.top)
}Q={left:W.left-U,top:W.top-R};
G.each(["left","top"],function(a,Z){if(G.ui.position[P[a]]){G.ui.position[P[a]][Z](W,{targetWidth:L,targetHeight:I,elemWidth:V,elemHeight:S,collisionPosition:Q,collisionWidth:X,collisionHeight:Y,offset:O,my:J.my,at:J.at})
}});
if(G.fn.bgiframe){T.bgiframe()
}T.offset(G.extend(W,{using:J.using}))
})
};
G.ui.position={fit:{left:function(I,J){var L=G(window),K=J.collisionPosition.left+J.collisionWidth-L.width()-L.scrollLeft();
I.left=K>0?I.left-K:Math.max(I.left-J.collisionPosition.left,I.left)
},top:function(I,J){var L=G(window),K=J.collisionPosition.top+J.collisionHeight-L.height()-L.scrollTop();
I.top=K>0?I.top-K:Math.max(I.top-J.collisionPosition.top,I.top)
}},flip:{left:function(J,L){if(L.at[0]===A){return 
}var N=G(window),M=L.collisionPosition.left+L.collisionWidth-N.width()-N.scrollLeft(),I=L.my[0]==="left"?-L.elemWidth:L.my[0]==="right"?L.elemWidth:0,K=L.at[0]==="left"?L.targetWidth:-L.targetWidth,O=-2*L.offset[0];
J.left+=L.collisionPosition.left<0?I+K+O:M>0?I+K+O:0
},top:function(J,L){if(L.at[1]===A){return 
}var N=G(window),M=L.collisionPosition.top+L.collisionHeight-N.height()-N.scrollTop(),I=L.my[1]==="top"?-L.elemHeight:L.my[1]==="bottom"?L.elemHeight:0,K=L.at[1]==="top"?L.targetHeight:-L.targetHeight,O=-2*L.offset[1];
J.top+=L.collisionPosition.top<0?I+K+O:M>0?I+K+O:0
}}};
if(!G.offset.setOffset){G.offset.setOffset=function(M,J){if(/static/.test(G.curCSS(M,"position"))){M.style.position="relative"
}var L=G(M),O=L.offset(),I=parseInt(G.curCSS(M,"top",true),10)||0,N=parseInt(G.curCSS(M,"left",true),10)||0,K={top:(J.top-O.top)+I,left:(J.left-O.left)+N};
if("using" in J){J.using.call(M,K)
}else{L.css(K)
}};
G.fn.offset=function(I){var J=this[0];
if(!J||!J.ownerDocument){return null
}if(I){return this.each(function(){G.offset.setOffset(this,I)
})
}return C.call(this)
}
}(function(){var I=document.getElementsByTagName("body")[0],P=document.createElement("div"),M,O,J,N,L;
M=document.createElement(I?"div":"body");
J={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};
if(I){G.extend(J,{position:"absolute",left:"-1000px",top:"-1000px"})
}for(var K in J){M.style[K]=J[K]
}M.appendChild(P);
O=I||document.documentElement;
O.insertBefore(M,O.firstChild);
P.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;";
N=G(P).offset(function(Q,R){return R
}).offset();
M.innerHTML="";
O.removeChild(M);
L=N.top+N.left+(I?2000:0);
F.fractions=L>21&&L<22
})()
}(jQuery));
(function(A,B){A.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});
this.valueDiv=A("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
this.oldValue=this._value();
this._refreshValue()
},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();
A.Widget.prototype.destroy.apply(this,arguments)
},value:function(C){if(C===B){return this._value()
}this._setOption("value",C);
return this
},_setOption:function(C,D){if(C==="value"){this.options.value=D;
this._refreshValue();
if(this._value()===this.options.max){this._trigger("complete")
}}A.Widget.prototype._setOption.apply(this,arguments)
},_value:function(){var C=this.options.value;
if(typeof C!=="number"){C=0
}return Math.min(this.options.max,Math.max(this.min,C))
},_percentage:function(){return 100*this._value()/this.options.max
},_refreshValue:function(){var D=this.value();
var C=this._percentage();
if(this.oldValue!==D){this.oldValue=D;
this._trigger("change")
}this.valueDiv.toggle(D>this.min).toggleClass("ui-corner-right",D===this.options.max).width(C.toFixed(0)+"%");
this.element.attr("aria-valuenow",D)
}});
A.extend(A.ui.progressbar,{version:"1.8.18"})
})(jQuery);
(function(B,C){var A=5;
B.widget("ui.slider",B.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var E=this,J=this.options,I=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),H="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",D=(J.values&&J.values.length)||1,G=[];
this._keySliding=false;
this._mouseSliding=false;
this._animateOff=true;
this._handleIndex=null;
this._detectOrientation();
this._mouseInit();
this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(J.disabled?" ui-slider-disabled ui-disabled":""));
this.range=B([]);
if(J.range){if(J.range===true){if(!J.values){J.values=[this._valueMin(),this._valueMin()]
}if(J.values.length&&J.values.length!==2){J.values=[J.values[0],J.values[0]]
}}this.range=B("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+((J.range==="min"||J.range==="max")?" ui-slider-range-"+J.range:""))
}for(var F=I.length;
F<D;
F+=1){G.push(H)
}this.handles=I.add(B(G.join("")).appendTo(E.element));
this.handle=this.handles.eq(0);
this.handles.add(this.range).filter("a").click(function(K){K.preventDefault()
}).hover(function(){if(!J.disabled){B(this).addClass("ui-state-hover")
}},function(){B(this).removeClass("ui-state-hover")
}).focus(function(){if(!J.disabled){B(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
B(this).addClass("ui-state-focus")
}else{B(this).blur()
}}).blur(function(){B(this).removeClass("ui-state-focus")
});
this.handles.each(function(K){B(this).data("index.ui-slider-handle",K)
});
this.handles.keydown(function(O){var L=B(this).data("index.ui-slider-handle"),P,M,K,N;
if(E.options.disabled){return 
}switch(O.keyCode){case B.ui.keyCode.HOME:case B.ui.keyCode.END:case B.ui.keyCode.PAGE_UP:case B.ui.keyCode.PAGE_DOWN:case B.ui.keyCode.UP:case B.ui.keyCode.RIGHT:case B.ui.keyCode.DOWN:case B.ui.keyCode.LEFT:O.preventDefault();
if(!E._keySliding){E._keySliding=true;
B(this).addClass("ui-state-active");
P=E._start(O,L);
if(P===false){return 
}}break
}N=E.options.step;
if(E.options.values&&E.options.values.length){M=K=E.values(L)
}else{M=K=E.value()
}switch(O.keyCode){case B.ui.keyCode.HOME:K=E._valueMin();
break;
case B.ui.keyCode.END:K=E._valueMax();
break;
case B.ui.keyCode.PAGE_UP:K=E._trimAlignValue(M+((E._valueMax()-E._valueMin())/A));
break;
case B.ui.keyCode.PAGE_DOWN:K=E._trimAlignValue(M-((E._valueMax()-E._valueMin())/A));
break;
case B.ui.keyCode.UP:case B.ui.keyCode.RIGHT:if(M===E._valueMax()){return 
}K=E._trimAlignValue(M+N);
break;
case B.ui.keyCode.DOWN:case B.ui.keyCode.LEFT:if(M===E._valueMin()){return 
}K=E._trimAlignValue(M-N);
break
}E._slide(O,L,K)
}).keyup(function(L){var K=B(this).data("index.ui-slider-handle");
if(E._keySliding){E._keySliding=false;
E._stop(L,K);
E._change(L,K);
B(this).removeClass("ui-state-active")
}});
this._refreshValue();
this._animateOff=false
},destroy:function(){this.handles.remove();
this.range.remove();
this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();
return this
},_mouseCapture:function(F){var G=this.options,J,L,E,H,N,K,M,I,D;
if(G.disabled){return false
}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};
this.elementOffset=this.element.offset();
J={x:F.pageX,y:F.pageY};
L=this._normValueFromMouse(J);
E=this._valueMax()-this._valueMin()+1;
N=this;
this.handles.each(function(O){var P=Math.abs(L-N.values(O));
if(E>P){E=P;
H=B(this);
K=O
}});
if(G.range===true&&this.values(1)===G.min){K+=1;
H=B(this.handles[K])
}M=this._start(F,K);
if(M===false){return false
}this._mouseSliding=true;
N._handleIndex=K;
H.addClass("ui-state-active").focus();
I=H.offset();
D=!B(F.target).parents().andSelf().is(".ui-slider-handle");
this._clickOffset=D?{left:0,top:0}:{left:F.pageX-I.left-(H.width()/2),top:F.pageY-I.top-(H.height()/2)-(parseInt(H.css("borderTopWidth"),10)||0)-(parseInt(H.css("borderBottomWidth"),10)||0)+(parseInt(H.css("marginTop"),10)||0)};
if(!this.handles.hasClass("ui-state-hover")){this._slide(F,K,L)
}this._animateOff=true;
return true
},_mouseStart:function(D){return true
},_mouseDrag:function(F){var D={x:F.pageX,y:F.pageY},E=this._normValueFromMouse(D);
this._slide(F,this._handleIndex,E);
return false
},_mouseStop:function(D){this.handles.removeClass("ui-state-active");
this._mouseSliding=false;
this._stop(D,this._handleIndex);
this._change(D,this._handleIndex);
this._handleIndex=null;
this._clickOffset=null;
this._animateOff=false;
return false
},_detectOrientation:function(){this.orientation=(this.options.orientation==="vertical")?"vertical":"horizontal"
},_normValueFromMouse:function(E){var D,H,G,F,I;
if(this.orientation==="horizontal"){D=this.elementSize.width;
H=E.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)
}else{D=this.elementSize.height;
H=E.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)
}G=(H/D);
if(G>1){G=1
}if(G<0){G=0
}if(this.orientation==="vertical"){G=1-G
}F=this._valueMax()-this._valueMin();
I=this._valueMin()+G*F;
return this._trimAlignValue(I)
},_start:function(F,E){var D={handle:this.handles[E],value:this.value()};
if(this.options.values&&this.options.values.length){D.value=this.values(E);
D.values=this.values()
}return this._trigger("start",F,D)
},_slide:function(H,G,F){var D,E,I;
if(this.options.values&&this.options.values.length){D=this.values(G?0:1);
if((this.options.values.length===2&&this.options.range===true)&&((G===0&&F>D)||(G===1&&F<D))){F=D
}if(F!==this.values(G)){E=this.values();
E[G]=F;
I=this._trigger("slide",H,{handle:this.handles[G],value:F,values:E});
D=this.values(G?0:1);
if(I!==false){this.values(G,F,true)
}}}else{if(F!==this.value()){I=this._trigger("slide",H,{handle:this.handles[G],value:F});
if(I!==false){this.value(F)
}}}},_stop:function(F,E){var D={handle:this.handles[E],value:this.value()};
if(this.options.values&&this.options.values.length){D.value=this.values(E);
D.values=this.values()
}this._trigger("stop",F,D)
},_change:function(F,E){if(!this._keySliding&&!this._mouseSliding){var D={handle:this.handles[E],value:this.value()};
if(this.options.values&&this.options.values.length){D.value=this.values(E);
D.values=this.values()
}this._trigger("change",F,D)
}},value:function(D){if(arguments.length){this.options.value=this._trimAlignValue(D);
this._refreshValue();
this._change(null,0);
return 
}return this._value()
},values:function(E,H){var G,D,F;
if(arguments.length>1){this.options.values[E]=this._trimAlignValue(H);
this._refreshValue();
this._change(null,E);
return 
}if(arguments.length){if(B.isArray(arguments[0])){G=this.options.values;
D=arguments[0];
for(F=0;
F<G.length;
F+=1){G[F]=this._trimAlignValue(D[F]);
this._change(null,F)
}this._refreshValue()
}else{if(this.options.values&&this.options.values.length){return this._values(E)
}else{return this.value()
}}}else{return this._values()
}},_setOption:function(E,F){var D,G=0;
if(B.isArray(this.options.values)){G=this.options.values.length
}B.Widget.prototype._setOption.apply(this,arguments);
switch(E){case"disabled":if(F){this.handles.filter(".ui-state-focus").blur();
this.handles.removeClass("ui-state-hover");
this.handles.propAttr("disabled",true);
this.element.addClass("ui-disabled")
}else{this.handles.propAttr("disabled",false);
this.element.removeClass("ui-disabled")
}break;
case"orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);
this._refreshValue();
break;
case"value":this._animateOff=true;
this._refreshValue();
this._change(null,0);
this._animateOff=false;
break;
case"values":this._animateOff=true;
this._refreshValue();
for(D=0;
D<G;
D+=1){this._change(null,D)
}this._animateOff=false;
break
}},_value:function(){var D=this.options.value;
D=this._trimAlignValue(D);
return D
},_values:function(D){var G,F,E;
if(arguments.length){G=this.options.values[D];
G=this._trimAlignValue(G);
return G
}else{F=this.options.values.slice();
for(E=0;
E<F.length;
E+=1){F[E]=this._trimAlignValue(F[E])
}return F
}},_trimAlignValue:function(G){if(G<=this._valueMin()){return this._valueMin()
}if(G>=this._valueMax()){return this._valueMax()
}var D=(this.options.step>0)?this.options.step:1,F=(G-this._valueMin())%D,E=G-F;
if(Math.abs(F)*2>=D){E+=(F>0)?D:(-D)
}return parseFloat(E.toFixed(5))
},_valueMin:function(){return this.options.min
},_valueMax:function(){return this.options.max
},_refreshValue:function(){var G=this.options.range,F=this.options,M=this,E=(!this._animateOff)?F.animate:false,H,D={},I,K,J,L;
if(this.options.values&&this.options.values.length){this.handles.each(function(O,N){H=(M.values(O)-M._valueMin())/(M._valueMax()-M._valueMin())*100;
D[M.orientation==="horizontal"?"left":"bottom"]=H+"%";
B(this).stop(1,1)[E?"animate":"css"](D,F.animate);
if(M.options.range===true){if(M.orientation==="horizontal"){if(O===0){M.range.stop(1,1)[E?"animate":"css"]({left:H+"%"},F.animate)
}if(O===1){M.range[E?"animate":"css"]({width:(H-I)+"%"},{queue:false,duration:F.animate})
}}else{if(O===0){M.range.stop(1,1)[E?"animate":"css"]({bottom:(H)+"%"},F.animate)
}if(O===1){M.range[E?"animate":"css"]({height:(H-I)+"%"},{queue:false,duration:F.animate})
}}}I=H
})
}else{K=this.value();
J=this._valueMin();
L=this._valueMax();
H=(L!==J)?(K-J)/(L-J)*100:0;
D[M.orientation==="horizontal"?"left":"bottom"]=H+"%";
this.handle.stop(1,1)[E?"animate":"css"](D,F.animate);
if(G==="min"&&this.orientation==="horizontal"){this.range.stop(1,1)[E?"animate":"css"]({width:H+"%"},F.animate)
}if(G==="max"&&this.orientation==="horizontal"){this.range[E?"animate":"css"]({width:(100-H)+"%"},{queue:false,duration:F.animate})
}if(G==="min"&&this.orientation==="vertical"){this.range.stop(1,1)[E?"animate":"css"]({height:H+"%"},F.animate)
}if(G==="max"&&this.orientation==="vertical"){this.range[E?"animate":"css"]({height:(100-H)+"%"},{queue:false,duration:F.animate})
}}}});
B.extend(B.ui.slider,{version:"1.8.18"})
}(jQuery));
(function(D,F){var C=0,B=0;
function E(){return ++C
}function A(){return ++B
}D.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)
},_setOption:function(G,H){if(G=="selected"){if(this.options.collapsible&&H==this.options.selected){return 
}this.select(H)
}else{this.options[G]=H;
this._tabify()
}},_tabId:function(G){return G.title&&G.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+E()
},_sanitizeSelector:function(G){return G.replace(/:/g,"\\:")
},_cookie:function(){var G=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+A());
return D.cookie.apply(null,[G].concat(D.makeArray(arguments)))
},_ui:function(H,G){return{tab:H,panel:G,index:this.anchors.index(H)}
},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var G=D(this);
G.html(G.data("label.tabs")).removeData("label.tabs")
})
},_tabify:function(R){var S=this,I=this.options,H=/^#.+/;
this.list=this.element.find("ol,ul").eq(0);
this.lis=D(" > li:has(a[href])",this.list);
this.anchors=this.lis.map(function(){return D("a",this)[0]
});
this.panels=D([]);
this.anchors.each(function(V,T){var U=D(T).attr("href");
var W=U.split("#")[0],X;
if(W&&(W===location.toString().split("#")[0]||(X=D("base")[0])&&W===X.href)){U=T.hash;
T.href=U
}if(H.test(U)){S.panels=S.panels.add(S.element.find(S._sanitizeSelector(U)))
}else{if(U&&U!=="#"){D.data(T,"href.tabs",U);
D.data(T,"load.tabs",U.replace(/#.*$/,""));
var Z=S._tabId(T);
T.href="#"+Z;
var Y=S.element.find("#"+Z);
if(!Y.length){Y=D(I.panelTemplate).attr("id",Z).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(S.panels[V-1]||S.list);
Y.data("destroy.tabs",true)
}S.panels=S.panels.add(Y)
}else{I.disabled.push(V)
}}});
if(R){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.lis.addClass("ui-state-default ui-corner-top");
this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
if(I.selected===F){if(location.hash){this.anchors.each(function(U,T){if(T.hash==location.hash){I.selected=U;
return false
}})
}if(typeof I.selected!=="number"&&I.cookie){I.selected=parseInt(S._cookie(),10)
}if(typeof I.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length){I.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}I.selected=I.selected||(this.lis.length?0:-1)
}else{if(I.selected===null){I.selected=-1
}}I.selected=((I.selected>=0&&this.anchors[I.selected])||I.selected<0)?I.selected:0;
I.disabled=D.unique(I.disabled.concat(D.map(this.lis.filter(".ui-state-disabled"),function(U,T){return S.lis.index(U)
}))).sort();
if(D.inArray(I.selected,I.disabled)!=-1){I.disabled.splice(D.inArray(I.selected,I.disabled),1)
}this.panels.addClass("ui-tabs-hide");
this.lis.removeClass("ui-tabs-selected ui-state-active");
if(I.selected>=0&&this.anchors.length){S.element.find(S._sanitizeSelector(S.anchors[I.selected].hash)).removeClass("ui-tabs-hide");
this.lis.eq(I.selected).addClass("ui-tabs-selected ui-state-active");
S.element.queue("tabs",function(){S._trigger("show",null,S._ui(S.anchors[I.selected],S.element.find(S._sanitizeSelector(S.anchors[I.selected].hash))[0]))
});
this.load(I.selected)
}D(window).bind("unload",function(){S.lis.add(S.anchors).unbind(".tabs");
S.lis=S.anchors=S.panels=null
})
}else{I.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}this.element[I.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");
if(I.cookie){this._cookie(I.selected,I.cookie)
}for(var L=0,Q;
(Q=this.lis[L]);
L++){D(Q)[D.inArray(L,I.disabled)!=-1&&!D(Q).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")
}if(I.cache===false){this.anchors.removeData("cache.tabs")
}this.lis.add(this.anchors).unbind(".tabs");
if(I.event!=="mouseover"){var K=function(U,T){if(T.is(":not(.ui-state-disabled)")){T.addClass("ui-state-"+U)
}};
var N=function(U,T){T.removeClass("ui-state-"+U)
};
this.lis.bind("mouseover.tabs",function(){K("hover",D(this))
});
this.lis.bind("mouseout.tabs",function(){N("hover",D(this))
});
this.anchors.bind("focus.tabs",function(){K("focus",D(this).closest("li"))
});
this.anchors.bind("blur.tabs",function(){N("focus",D(this).closest("li"))
})
}var G,M;
if(I.fx){if(D.isArray(I.fx)){G=I.fx[0];
M=I.fx[1]
}else{G=M=I.fx
}}function J(T,U){T.css("display","");
if(!D.support.opacity&&U.opacity){T[0].style.removeAttribute("filter")
}}var O=M?function(T,U){D(T).closest("li").addClass("ui-tabs-selected ui-state-active");
U.hide().removeClass("ui-tabs-hide").animate(M,M.duration||"normal",function(){J(U,M);
S._trigger("show",null,S._ui(T,U[0]))
})
}:function(T,U){D(T).closest("li").addClass("ui-tabs-selected ui-state-active");
U.removeClass("ui-tabs-hide");
S._trigger("show",null,S._ui(T,U[0]))
};
var P=G?function(U,T){T.animate(G,G.duration||"normal",function(){S.lis.removeClass("ui-tabs-selected ui-state-active");
T.addClass("ui-tabs-hide");
J(T,G);
S.element.dequeue("tabs")
})
}:function(U,T,V){S.lis.removeClass("ui-tabs-selected ui-state-active");
T.addClass("ui-tabs-hide");
S.element.dequeue("tabs")
};
this.anchors.bind(I.event+".tabs",function(){var U=this,W=D(U).closest("li"),T=S.panels.filter(":not(.ui-tabs-hide)"),V=S.element.find(S._sanitizeSelector(U.hash));
if((W.hasClass("ui-tabs-selected")&&!I.collapsible)||W.hasClass("ui-state-disabled")||W.hasClass("ui-state-processing")||S.panels.filter(":animated").length||S._trigger("select",null,S._ui(this,V[0]))===false){this.blur();
return false
}I.selected=S.anchors.index(this);
S.abort();
if(I.collapsible){if(W.hasClass("ui-tabs-selected")){I.selected=-1;
if(I.cookie){S._cookie(I.selected,I.cookie)
}S.element.queue("tabs",function(){P(U,T)
}).dequeue("tabs");
this.blur();
return false
}else{if(!T.length){if(I.cookie){S._cookie(I.selected,I.cookie)
}S.element.queue("tabs",function(){O(U,V)
});
S.load(S.anchors.index(this));
this.blur();
return false
}}}if(I.cookie){S._cookie(I.selected,I.cookie)
}if(V.length){if(T.length){S.element.queue("tabs",function(){P(U,T)
})
}S.element.queue("tabs",function(){O(U,V)
});
S.load(S.anchors.index(this))
}else{throw"jQuery UI Tabs: Mismatching fragment identifier."
}if(D.browser.msie){this.blur()
}});
this.anchors.bind("click.tabs",function(){return false
})
},_getIndex:function(G){if(typeof G=="string"){G=this.anchors.index(this.anchors.filter("[href$="+G+"]"))
}return G
},destroy:function(){var G=this.options;
this.abort();
this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.anchors.each(function(){var H=D.data(this,"href.tabs");
if(H){this.href=H
}var I=D(this).unbind(".tabs");
D.each(["href","load","cache"],function(J,K){I.removeData(K+".tabs")
})
});
this.lis.unbind(".tabs").add(this.panels).each(function(){if(D.data(this,"destroy.tabs")){D(this).remove()
}else{D(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))
}});
if(G.cookie){this._cookie(null,G.cookie)
}return this
},add:function(J,I,H){if(H===F){H=this.anchors.length
}var G=this,L=this.options,N=D(L.tabTemplate.replace(/#\{href\}/g,J).replace(/#\{label\}/g,I)),M=!J.indexOf("#")?J.replace("#",""):this._tabId(D("a",N)[0]);
N.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);
var K=G.element.find("#"+M);
if(!K.length){K=D(L.panelTemplate).attr("id",M).data("destroy.tabs",true)
}K.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
if(H>=this.lis.length){N.appendTo(this.list);
K.appendTo(this.list[0].parentNode)
}else{N.insertBefore(this.lis[H]);
K.insertBefore(this.panels[H])
}L.disabled=D.map(L.disabled,function(P,O){return P>=H?++P:P
});
this._tabify();
if(this.anchors.length==1){L.selected=0;
N.addClass("ui-tabs-selected ui-state-active");
K.removeClass("ui-tabs-hide");
this.element.queue("tabs",function(){G._trigger("show",null,G._ui(G.anchors[0],G.panels[0]))
});
this.load(0)
}this._trigger("add",null,this._ui(this.anchors[H],this.panels[H]));
return this
},remove:function(G){G=this._getIndex(G);
var I=this.options,J=this.lis.eq(G).remove(),H=this.panels.eq(G).remove();
if(J.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(G+(G+1<this.anchors.length?1:-1))
}I.disabled=D.map(D.grep(I.disabled,function(L,K){return L!=G
}),function(L,K){return L>=G?--L:L
});
this._tabify();
this._trigger("remove",null,this._ui(J.find("a")[0],H[0]));
return this
},enable:function(G){G=this._getIndex(G);
var H=this.options;
if(D.inArray(G,H.disabled)==-1){return 
}this.lis.eq(G).removeClass("ui-state-disabled");
H.disabled=D.grep(H.disabled,function(J,I){return J!=G
});
this._trigger("enable",null,this._ui(this.anchors[G],this.panels[G]));
return this
},disable:function(H){H=this._getIndex(H);
var G=this,I=this.options;
if(H!=I.selected){this.lis.eq(H).addClass("ui-state-disabled");
I.disabled.push(H);
I.disabled.sort();
this._trigger("disable",null,this._ui(this.anchors[H],this.panels[H]))
}return this
},select:function(G){G=this._getIndex(G);
if(G==-1){if(this.options.collapsible&&this.options.selected!=-1){G=this.options.selected
}else{return this
}}this.anchors.eq(G).trigger(this.options.event+".tabs");
return this
},load:function(J){J=this._getIndex(J);
var H=this,L=this.options,G=this.anchors.eq(J)[0],I=D.data(G,"load.tabs");
this.abort();
if(!I||this.element.queue("tabs").length!==0&&D.data(G,"cache.tabs")){this.element.dequeue("tabs");
return 
}this.lis.eq(J).addClass("ui-state-processing");
if(L.spinner){var K=D("span",G);
K.data("label.tabs",K.html()).html(L.spinner)
}this.xhr=D.ajax(D.extend({},L.ajaxOptions,{url:I,success:function(N,M){H.element.find(H._sanitizeSelector(G.hash)).html(N);
H._cleanup();
if(L.cache){D.data(G,"cache.tabs",true)
}H._trigger("load",null,H._ui(H.anchors[J],H.panels[J]));
try{L.ajaxOptions.success(N,M)
}catch(O){}},error:function(O,M,N){H._cleanup();
H._trigger("load",null,H._ui(H.anchors[J],H.panels[J]));
try{L.ajaxOptions.error(O,M,J,G)
}catch(N){}}}));
H.element.dequeue("tabs");
return this
},abort:function(){this.element.queue([]);
this.panels.stop(false,true);
this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));
if(this.xhr){this.xhr.abort();
delete this.xhr
}this._cleanup();
return this
},url:function(H,G){this.anchors.eq(H).removeData("cache.tabs").data("load.tabs",G);
return this
},length:function(){return this.anchors.length
}});
D.extend(D.ui.tabs,{version:"1.8.18"});
D.extend(D.ui.tabs.prototype,{rotation:null,rotate:function(I,K){var G=this,L=this.options;
var H=G._rotate||(G._rotate=function(M){clearTimeout(G.rotation);
G.rotation=setTimeout(function(){var N=L.selected;
G.select(++N<G.anchors.length?N:0)
},I);
if(M){M.stopPropagation()
}});
var J=G._unrotate||(G._unrotate=!K?function(M){if(M.clientX){G.rotate(null)
}}:function(M){t=L.selected;
H()
});
if(I){this.element.bind("tabsshow",H);
this.anchors.bind(L.event+".tabs",J);
H()
}else{clearTimeout(G.rotation);
this.element.unbind("tabsshow",H);
this.anchors.unbind(L.event+".tabs",J);
delete this._rotate;
delete this._unrotate
}return this
}})
})(jQuery);
var isMobile={android:function(){return navigator.userAgent.match(/Android/i)
},blackberry:function(){return navigator.userAgent.match(/BlackBerry/i)
},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)
},opera:function(){return navigator.userAgent.match(/Opera Mini/i)
},windows:function(){return navigator.userAgent.match(/IEMobile/i)
},any:function(){return(isMobile.android()||isMobile.blackberry()||isMobile.iOS()||isMobile.opera()||isMobile.windows())
}};
var isAppleDevice=isMobile.iOS();
var isMacWebKit=$.browser.webkit&&(navigator.userAgent.match(/Mac OS/i)!=null);
jQuery.tdburl=function(){var C={};
C.hash={};
var A=window.location.hash;
if(A.length>1){var E=A.substring(1).split(";");
for(var B=0;
B<E.length;
B++){var D=E[B].split("=");
C.hash[D[0]]=D[1]
}}return C
}();
window.sendDebugReport=function(G,C,B){try{if(window.location.hash&&window.location.hash.indexOf("sendDebugReport")>=0){var D=((Math.random()*10000000000000000));
window.location.hash=window.location.hash+";"+D;
var A=document.createElement("img");
var E="http://"+window.location.host+"/etc/clientlibs/dailybeast/img/placeholder/blank.png?sendDebugReport";
E+="&msg="+encodeURIComponent(G);
E+="&url="+encodeURIComponent(C);
E+="&linenumber="+encodeURIComponent(B);
E+="&id="+D;
A.setAttribute("src",E);
A.setAttribute("height","1px");
A.setAttribute("width","1px");
document.body.appendChild(A)
}}catch(F){console.error("Could not send debug report",F)
}return false
};
window.onerror=function(C,B,A){sendDebugReport(C,B,A)
};
window.Modernizr=function(AX,AW,AV){function U(A){AO.cssText=A
}function T(B,A){return U(AK.join(B+";")+(A||""))
}function S(B,A){return typeof B===A
}function R(B,A){return !!~(""+B).indexOf(A)
}function Q(B,A){for(var D in B){var C=B[D];
if(!R(C,"-")&&AO[C]!==AV){return A=="pfx"?C:!0
}}return !1
}function P(B,A,E){for(var D in B){var C=A[B[D]];
if(C!==AV){return E===!1?B[D]:S(C,"function")?C.bind(E||A):C
}}return !1
}function O(B,A,E){var D=B.charAt(0).toUpperCase()+B.slice(1),C=(B+" "+AI.join(D+" ")+D).split(" ");
return S(A,"string")||S(A,"undefined")?Q(C,A):(C=(B+" "+AH.join(D+" ")+D).split(" "),P(C,A,E))
}function N(){AT.input=function(C){for(var B=0,A=C.length;
B<A;
B++){AD[C[B]]=C[B] in AN
}return AD.list&&(AD.list=!!AW.createElement("datalist")&&!!AX.HTMLDataListElement),AD
}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),AT.inputtypes=function(A){for(var F=0,E,D,C,B=A.length;
F<B;
F++){AN.setAttribute("type",D=A[F]),E=AN.type!=="text",E&&(AN.value=AM,AN.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(D)&&AN.style.WebkitAppearance!==AV?(AR.appendChild(AN),C=AW.defaultView,E=C.getComputedStyle&&C.getComputedStyle(AN,null).WebkitAppearance!=="textfield"&&AN.offsetHeight!==0,AR.removeChild(AN)):/^(search|tel)$/.test(D)||(/^(url|email)$/.test(D)?E=AN.checkValidity&&AN.checkValidity()===!1:E=AN.value!=AM)),AE[A[F]]=!!E
}return AE
}("search tel url email datetime date month week time datetime-local number range color".split(" "))
}var AU="2.6.2",AT={},AS=!0,AR=AW.documentElement,AQ="modernizr",AP=AW.createElement(AQ),AO=AP.style,AN=AW.createElement("input"),AM=":)",AL={}.toString,AK=" -webkit- -moz- -o- -ms- ".split(" "),AJ="Webkit Moz O ms",AI=AJ.split(" "),AH=AJ.toLowerCase().split(" "),AG={svg:"http://www.w3.org/2000/svg"},AF={},AE={},AD={},AC=[],AB=AC.slice,AA,Z=function(K,J,I,H){var G,F,E,D,C=AW.createElement("div"),B=AW.body,A=B||AW.createElement("body");
if(parseInt(I,10)){while(I--){E=AW.createElement("div"),E.id=H?H[I]:AQ+(I+1),C.appendChild(E)
}}return G=["&#173;",'<style id="s',AQ,'">',K,"</style>"].join(""),C.id=AQ,(B?C:A).innerHTML+=G,A.appendChild(C),B||(A.style.background="",A.style.overflow="hidden",D=AR.style.overflow,AR.style.overflow="hidden",AR.appendChild(A)),F=J(C,K),B?C.parentNode.removeChild(C):(A.parentNode.removeChild(A),AR.style.overflow=D),!!F
},Y=function(A){var C=AX.matchMedia||AX.msMatchMedia;
if(C){return C(A).matches
}var B;
return Z("@media "+A+" { #"+AQ+" { position: absolute; } }",function(D){B=(AX.getComputedStyle?getComputedStyle(D,null):D.currentStyle)["position"]=="absolute"
}),B
},X=function(){function B(E,D){D=D||AW.createElement(A[E]||"div"),E="on"+E;
var C=E in D;
return C||(D.setAttribute||(D=AW.createElement("div")),D.setAttribute&&D.removeAttribute&&(D.setAttribute(E,""),C=S(D[E],"function"),S(D[E],"undefined")||(D[E]=AV),D.removeAttribute(E))),D=null,C
}var A={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};
return B
}(),W={}.hasOwnProperty,V;
!S(W,"undefined")&&!S(W.call,"undefined")?V=function(B,A){return W.call(B,A)
}:V=function(B,A){return A in B&&S(B.constructor.prototype[A],"undefined")
},Function.prototype.bind||(Function.prototype.bind=function(A){var D=this;
if(typeof D!="function"){throw new TypeError
}var C=AB.call(arguments,1),B=function(){if(this instanceof B){var E=function(){};
E.prototype=D.prototype;
var G=new E,F=D.apply(G,C.concat(AB.call(arguments)));
return Object(F)===F?F:G
}return D.apply(A,C.concat(AB.call(arguments)))
};
return B
}),AF.flexbox=function(){return O("flexWrap")
},AF.flexboxlegacy=function(){return O("boxDirection")
},AF.canvas=function(){var A=AW.createElement("canvas");
return !!A.getContext&&!!A.getContext("2d")
},AF.canvastext=function(){return !!AT.canvas&&!!S(AW.createElement("canvas").getContext("2d").fillText,"function")
},AF.webgl=function(){return !!AX.WebGLRenderingContext
},AF.touch=function(){var A;
return"ontouchstart" in AX||AX.DocumentTouch&&AW instanceof DocumentTouch?A=!0:Z(["@media (",AK.join("touch-enabled),("),AQ,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(B){A=B.offsetTop===9
}),A
},AF.geolocation=function(){return"geolocation" in navigator
},AF.postmessage=function(){return !!AX.postMessage
},AF.websqldatabase=function(){return !!AX.openDatabase
},AF.indexedDB=function(){return !!O("indexedDB",AX)
},AF.hashchange=function(){return X("hashchange",AX)&&(AW.documentMode===AV||AW.documentMode>7)
},AF.history=function(){return !!AX.history&&!!history.pushState
},AF.draganddrop=function(){var A=AW.createElement("div");
return"draggable" in A||"ondragstart" in A&&"ondrop" in A
},AF.websockets=function(){return"WebSocket" in AX||"MozWebSocket" in AX
},AF.rgba=function(){return U("background-color:rgba(150,255,150,.5)"),R(AO.backgroundColor,"rgba")
},AF.hsla=function(){return U("background-color:hsla(120,40%,100%,.5)"),R(AO.backgroundColor,"rgba")||R(AO.backgroundColor,"hsla")
},AF.multiplebgs=function(){return U("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(AO.background)
},AF.backgroundsize=function(){return O("backgroundSize")
},AF.borderimage=function(){return O("borderImage")
},AF.borderradius=function(){return O("borderRadius")
},AF.boxshadow=function(){return O("boxShadow")
},AF.textshadow=function(){return AW.createElement("div").style.textShadow===""
},AF.opacity=function(){return T("opacity:.55"),/^0.55$/.test(AO.opacity)
},AF.cssanimations=function(){return O("animationName")
},AF.csscolumns=function(){return O("columnCount")
},AF.cssgradients=function(){var B="background-image:",A="gradient(linear,left top,right bottom,from(#9f9),to(white));",C="linear-gradient(left top,#9f9, white);";
return U((B+"-webkit- ".split(" ").join(A+B)+AK.join(C+B)).slice(0,-B.length)),R(AO.backgroundImage,"gradient")
},AF.cssreflections=function(){return O("boxReflect")
},AF.csstransforms=function(){return !!O("transform")
},AF.csstransforms3d=function(){var A=!!O("perspective");
return A&&"webkitPerspective" in AR.style&&Z("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(B,C){A=B.offsetLeft===9&&B.offsetHeight===3
}),A
},AF.csstransitions=function(){return O("transition")
},AF.fontface=function(){var A;
return Z('@font-face {font-family:"font";src:url("https://")}',function(F,E){var D=AW.getElementById("smodernizr"),C=D.sheet||D.styleSheet,B=C?C.cssRules&&C.cssRules[0]?C.cssRules[0].cssText:C.cssText||"":"";
A=/src/i.test(B)&&B.indexOf(E.split(" ")[0])===0
}),A
},AF.generatedcontent=function(){var A;
return Z(["#",AQ,"{font:0/0 a}#",AQ,':after{content:"',AM,'";visibility:hidden;font:3px/1 a}'].join(""),function(B){A=B.offsetHeight>=3
}),A
},AF.video=function(){var A=AW.createElement("video"),C=!1;
try{if(C=!!A.canPlayType){C=new Boolean(C),C.ogg=A.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),C.h264=A.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),C.webm=A.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")
}}catch(B){}return C
},AF.audio=function(){var A=AW.createElement("audio"),C=!1;
try{if(C=!!A.canPlayType){C=new Boolean(C),C.ogg=A.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),C.mp3=A.canPlayType("audio/mpeg;").replace(/^no$/,""),C.wav=A.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),C.m4a=(A.canPlayType("audio/x-m4a;")||A.canPlayType("audio/aac;")).replace(/^no$/,"")
}}catch(B){}return C
},AF.localstorage=function(){try{return localStorage.setItem(AQ,AQ),localStorage.removeItem(AQ),!0
}catch(A){return !1
}},AF.sessionstorage=function(){try{return sessionStorage.setItem(AQ,AQ),sessionStorage.removeItem(AQ),!0
}catch(A){return !1
}},AF.webworkers=function(){return !!AX.Worker
},AF.applicationcache=function(){return !!AX.applicationCache
},AF.svg=function(){return !!AW.createElementNS&&!!AW.createElementNS(AG.svg,"svg").createSVGRect
},AF.inlinesvg=function(){var A=AW.createElement("div");
return A.innerHTML="<svg/>",(A.firstChild&&A.firstChild.namespaceURI)==AG.svg
},AF.smil=function(){return !!AW.createElementNS&&/SVGAnimate/.test(AL.call(AW.createElementNS(AG.svg,"animate")))
},AF.svgclippaths=function(){return !!AW.createElementNS&&/SVGClipPath/.test(AL.call(AW.createElementNS(AG.svg,"clipPath")))
};
for(var M in AF){V(AF,M)&&(AA=M.toLowerCase(),AT[AA]=AF[M](),AC.push((AT[AA]?"":"no-")+AA))
}return AT.input||N(),AT.addTest=function(B,A){if(typeof B=="object"){for(var C in B){V(B,C)&&AT.addTest(C,B[C])
}}else{B=B.toLowerCase();
if(AT[B]!==AV){return AT
}A=typeof A=="function"?A():A,typeof AS!="undefined"&&AS&&(AR.className+=" "+(A?"":"no-")+B),AT[B]=A
}return AT
},U(""),AP=AN=null,function(y,x){function H(f,e){var h=f.createElement("p"),g=f.getElementsByTagName("head")[0]||f.documentElement;
return h.innerHTML="x<style>"+e+"</style>",g.insertBefore(h.lastChild,g.firstChild)
}function G(){var b=A.elements;
return typeof b=="string"?b.split(" "):b
}function F(d){var c=J[d[L]];
return c||(c={},K++,d[L]=K,J[K]=c),c
}function E(b,h,e){h||(h=x);
if(I){return h.createElement(b)
}e||(e=F(h));
var d;
return e.cache[b]?d=e.cache[b].cloneNode():u.test(b)?d=(e.cache[b]=e.createElem(b)).cloneNode():d=e.createElem(b),d.canHaveChildren&&!v.test(b)?e.frag.appendChild(d):d
}function D(b,l){b||(b=x);
if(I){return b.createDocumentFragment()
}l=l||F(b);
var k=l.frag.cloneNode(),j=0,i=G(),h=i.length;
for(;
j<h;
j++){k.createElement(i[j])
}return k
}function C(d,c){c.cache||(c.cache={},c.createElem=d.createElement,c.createFrag=d.createDocumentFragment,c.frag=c.createFrag()),d.createElement=function(a){return A.shivMethods?E(a,d,c):c.createElem(a)
},d.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+G().join().replace(/\w+/g,function(b){return c.createElem(b),c.frag.createElement(b),'c("'+b+'")'
})+");return n}")(A,c.frag)
}function B(b){b||(b=x);
var d=F(b);
return A.shivCSS&&!s&&!d.hasCSS&&(d.hasCSS=!!H(b,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),I||C(b,d),b
}var w=y.html5||{},v=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,u=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,s,L="_html5shiv",K=0,J={},I;
(function(){try{var b=x.createElement("a");
b.innerHTML="<xyz></xyz>",s="hidden" in b,I=b.childNodes.length==1||function(){x.createElement("a");
var c=x.createDocumentFragment();
return typeof c.cloneNode=="undefined"||typeof c.createDocumentFragment=="undefined"||typeof c.createElement=="undefined"
}()
}catch(d){s=!0,I=!0
}})();
var A={elements:w.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:w.shivCSS!==!1,supportsUnknownElements:I,shivMethods:w.shivMethods!==!1,type:"default",shivDocument:B,createElement:E,createDocumentFragment:D};
y.html5=A,B(x)
}(this,AW),AT._version=AU,AT._prefixes=AK,AT._domPrefixes=AH,AT._cssomPrefixes=AI,AT.mq=Y,AT.hasEvent=X,AT.testProp=function(A){return Q([A])
},AT.testAllProps=O,AT.testStyles=Z,AR.className=AR.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(AS?" js "+AC.join(" "):""),AT
}(this,this.document),function(AD,AC,AB){function AA(A){return"[object Function]"==P.call(A)
}function Z(A){return"string"==typeof A
}function Y(){}function X(A){return !A||"loaded"==A||"complete"==A||"uninitialized"==A
}function W(){var A=O.shift();
M=1,A?A.t?R(function(){("c"==A.t?L.injectCss:L.injectJs)(A.s,0,A.a,A.x,A.e,1)
},0):(A(),W()):M=0
}function V(v,s,q,p,n,m,h){function g(a){if(!B&&X(b.readyState)&&(w.r=B=1,!M&&W(),b.onload=b.onreadystatechange=null,a)){"img"!=v&&R(function(){I.removeChild(b)
},50);
for(var c in D[s]){D[s].hasOwnProperty(c)&&D[s][c].onload()
}}}var h=h||L.errorTimeout,b=AC.createElement(v),B=0,A=0,w={t:q,s:s,e:n,a:m,x:h};
1===D[s]&&(A=1,D[s]=[]),"object"==v?b.data=s:(b.src=s,b.type=v),b.width=b.height="0",b.onerror=b.onload=b.onreadystatechange=function(){g.call(this,A)
},O.splice(p,0,w),"img"!=v&&(A||2===D[s]?(I.insertBefore(b,J?null:Q),R(g,h)):D[s].push(b))
}function U(B,A,h,g,e){return M=0,A=A||"j",Z(B)?V("c"==A?G:H,B,A,this.i++,h,g,e):(O.splice(this.i++,0,B),1==O.length&&W()),this
}function T(){var A=L;
return A.loader={load:U,i:0},A
}var S=AC.documentElement,R=AD.setTimeout,Q=AC.getElementsByTagName("script")[0],P={}.toString,O=[],M=0,K="MozAppearance" in S.style,J=K&&!!AC.createRange().compareNode,I=J?S:Q.parentNode,S=AD.opera&&"[object Opera]"==P.call(AD.opera),S=!!AC.attachEvent&&!S,H=K?"object":S?"script":"img",G=S?"script":H,F=Array.isArray||function(A){return"[object Array]"==P.call(A)
},E=[],D={},C={timeout:function(B,A){return A.length&&(B.timeout=A[0]),B
}},N,L;
L=function(c){function A(i){var i=i.split("!"),h=E.length,o=i.pop(),n=i.length,o={url:o,origUrl:o,prefixes:i},m,l,j;
for(l=0;
l<n;
l++){j=i[l].split("="),(m=C[j.shift()])&&(o=m(o,j))
}for(l=0;
l<h;
l++){o=E[l](o)
}return o
}function k(b,q,p,o,n){var m=A(b),l=m.autoCallback;
m.url.split(".").pop().split("?").shift(),m.bypass||(q&&(q=AA(q)?q:q[b]||q[o]||q[b.split("/").pop().split("?")[0]]),m.instead?m.instead(b,q,p,o,n):(D[m.url]?m.noexec=!0:D[m.url]=1,p.load(m.url,m.forceCSS||!m.forceJS&&"css"==m.url.split(".").pop().split("?").shift()?"c":AB,m.noexec,m.attrs,m.timeout),(AA(q)||AA(l))&&p.load(function(){T(),q&&q(m.origUrl,n,o),l&&l(m.origUrl,n,o),D[m.url]=2
})))
}function f(x,w){function v(b,h){if(b){if(Z(b)){h||(r=function(){var i=[].slice.call(arguments);
q.apply(this,i),p()
}),k(b,r,w,0,u)
}else{if(Object(b)===b){for(g in o=function(){var a=0,i;
for(i in b){b.hasOwnProperty(i)&&a++
}return a
}(),b){b.hasOwnProperty(g)&&(!h&&!--o&&(AA(r)?r=function(){var i=[].slice.call(arguments);
q.apply(this,i),p()
}:r[g]=function(i){return function(){var a=[].slice.call(arguments);
i&&i.apply(this,a),p()
}
}(q[g])),k(b[g],r,w,g,u))
}}}}else{!h&&p()
}}var u=!!x.test,s=x.load||x.both,r=x.callback||Y,q=r,p=x.complete||Y,o,g;
v(u?x.yep:x.nope,!!s),s&&v(s)
}var e,d,B=this.yepnope.loader;
if(Z(c)){k(c,0,B,0)
}else{if(F(c)){for(e=0;
e<c.length;
e++){d=c[e],Z(d)?k(d,0,B,0):F(d)?L(d):Object(d)===d&&f(d,B)
}}else{Object(c)===c&&f(c,B)
}}},L.addPrefix=function(B,A){C[B]=A
},L.addFilter=function(A){E.push(A)
},L.errorTimeout=10000,null==AC.readyState&&AC.addEventListener&&(AC.readyState="loading",AC.addEventListener("DOMContentLoaded",N=function(){AC.removeEventListener("DOMContentLoaded",N,0),AC.readyState="complete"
},0)),AD.yepnope=T(),AD.yepnope.executeStack=W,AD.yepnope.injectJs=function(p,n,m,h,g,f){var b=AC.createElement("script"),B,A,h=h||L.errorTimeout;
b.src=p;
for(A in m){b.setAttribute(A,m[A])
}n=f?W:n||Y,b.onreadystatechange=b.onload=function(){!B&&X(b.readyState)&&(B=1,n(),b.onload=b.onreadystatechange=null)
},R(function(){B||(B=1,n(1))
},h),g?b.onload():Q.parentNode.insertBefore(b,Q)
},AD.yepnope.injectCss=function(A,l,k,h,f,b){var h=AC.createElement("link"),B,l=b?W:l||Y;
h.href=A,h.rel="stylesheet",h.type="text/css";
for(B in k){h.setAttribute(B,k[B])
}f||(Q.parentNode.insertBefore(h,Q),R(l,0))
}
}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))
};
(function(){var a=this,W=a._,e={},AA=Array.prototype,d=Object.prototype,AC=AA.slice,U=AA.unshift,R=d.toString,g=d.hasOwnProperty,T=AA.forEach,S=AA.map,Q=AA.reduce,O=AA.reduceRight,N=AA.filter,L=AA.every,J=AA.some,c=AA.indexOf,G=AA.lastIndexOf;
d=Array.isArray;
var P=Object.keys,Y=Function.prototype.bind,AD=function(A){return new k(A)
};
typeof module!=="undefined"&&module.exports?(module.exports=AD,AD._=AD):a._=AD;
AD.VERSION="1.1.6";
var AB=AD.each=AD.forEach=function(A,E,D){if(A!=null){if(T&&A.forEach===T){A.forEach(E,D)
}else{if(AD.isNumber(A.length)){for(var C=0,B=A.length;
C<B;
C++){if(E.call(D,A[C],C,A)===e){break
}}}else{for(C in A){if(g.call(A,C)&&E.call(D,A[C],C,A)===e){break
}}}}}};
AD.map=function(B,D,A){var C=[];
if(B==null){return C
}if(S&&B.map===S){return B.map(D,A)
}AB(B,function(E,H,F){C[C.length]=D.call(A,E,H,F)
});
return C
};
AD.reduce=AD.foldl=AD.inject=function(A,E,D,C){var B=D!==void 0;
A==null&&(A=[]);
if(Q&&A.reduce===Q){return C&&(E=AD.bind(E,C)),B?A.reduce(E,D):A.reduce(E)
}AB(A,function(H,F,I){!B&&F===0?(D=H,B=!0):D=E.call(C,D,H,F,I)
});
if(!B){throw new TypeError("Reduce of empty array with no initial value")
}return D
};
AD.reduceRight=AD.foldr=function(A,D,C,B){A==null&&(A=[]);
if(O&&A.reduceRight===O){return B&&(D=AD.bind(D,B)),C!==void 0?A.reduceRight(D,C):A.reduceRight(D)
}A=(AD.isArray(A)?A.slice():AD.toArray(A)).reverse();
return AD.reduce(A,D,C,B)
};
AD.find=AD.detect=function(B,D,A){var C;
Z(B,function(E,F,H){if(D.call(A,E,F,H)){return C=E,!0
}});
return C
};
AD.filter=AD.select=function(B,D,A){var C=[];
if(B==null){return C
}if(N&&B.filter===N){return B.filter(D,A)
}AB(B,function(E,F,H){D.call(A,E,F,H)&&(C[C.length]=E)
});
return C
};
AD.reject=function(B,D,A){var C=[];
if(B==null){return C
}AB(B,function(E,F,H){D.call(A,E,F,H)||(C[C.length]=E)
});
return C
};
AD.every=AD.all=function(B,D,A){var C=!0;
if(B==null){return C
}if(L&&B.every===L){return B.every(D,A)
}AB(B,function(E,F,H){if(!(C=C&&D.call(A,E,F,H))){return e
}});
return C
};
var Z=AD.some=AD.any=function(A,D,C){D||(D=AD.identity);
var B=!1;
if(A==null){return B
}if(J&&A.some===J){return A.some(D,C)
}AB(A,function(F,E,H){if(B=D.call(C,F,E,H)){return e
}});
return B
};
AD.include=AD.contains=function(B,C){var A=!1;
if(B==null){return A
}if(c&&B.indexOf===c){return B.indexOf(C)!=-1
}Z(B,function(D){if(A=D===C){return !0
}});
return A
};
AD.invoke=function(A,C){var B=AC.call(arguments,2);
return AD.map(A,function(D){return(C.call?C||D:D[C]).apply(D,B)
})
};
AD.pluck=function(A,B){return AD.map(A,function(C){return C[B]
})
};
AD.max=function(A,D,C){if(!D&&AD.isArray(A)){return Math.max.apply(Math,A)
}var B={computed:-Infinity};
AB(A,function(F,E,H){E=D?D.call(C,F,E,H):F;
E>=B.computed&&(B={value:F,computed:E})
});
return B.value
};
AD.min=function(A,D,C){if(!D&&AD.isArray(A)){return Math.min.apply(Math,A)
}var B={computed:Infinity};
AB(A,function(F,E,H){E=D?D.call(C,F,E,H):F;
E<B.computed&&(B={value:F,computed:E})
});
return B.value
};
AD.sortBy=function(A,C,B){return AD.pluck(AD.map(A,function(E,D,F){return{value:E,criteria:C.call(B,E,D,F)}
}).sort(function(E,D){var H=E.criteria,F=D.criteria;
return H<F?-1:H>F?1:0
}),"value")
};
AD.sortedIndex=function(A,F,E){E||(E=AD.identity);
for(var D=0,C=A.length;
D<C;
){var B=D+C>>1;
E(A[B])<E(F)?D=B+1:C=B
}return D
};
AD.toArray=function(A){if(!A){return[]
}if(A.toArray){return A.toArray()
}if(AD.isArray(A)){return A
}if(AD.isArguments(A)){return AC.call(A)
}return AD.values(A)
};
AD.size=function(A){return AD.toArray(A).length
};
AD.first=AD.head=function(B,A,C){return A!=null&&!C?AC.call(B,0,A):B[0]
};
AD.rest=AD.tail=function(B,A,C){return AC.call(B,A==null||C?1:A)
};
AD.last=function(A){return A[A.length-1]
};
AD.compact=function(A){return AD.filter(A,function(B){return !!B
})
};
AD.flatten=function(A){return AD.reduce(A,function(B,C){if(AD.isArray(C)){return B.concat(AD.flatten(C))
}B[B.length]=C;
return B
},[])
};
AD.without=function(A){var B=AC.call(arguments,1);
return AD.filter(A,function(C){return !AD.include(B,C)
})
};
AD.uniq=AD.unique=function(A,B){return AD.reduce(A,function(C,E,D){if(0==D||(B===!0?AD.last(C)!=E:!AD.include(C,E))){C[C.length]=E
}return C
},[])
};
AD.intersect=function(A){var B=AC.call(arguments,1);
return AD.filter(AD.uniq(A),function(C){return AD.every(B,function(D){return AD.indexOf(D,C)>=0
})
})
};
AD.zip=function(){for(var A=AC.call(arguments),D=AD.max(AD.pluck(A,"length")),C=Array(D),B=0;
B<D;
B++){C[B]=AD.pluck(A,""+B)
}return C
};
AD.indexOf=function(A,D,C){if(A==null){return -1
}var B;
if(C){return C=AD.sortedIndex(A,D),A[C]===D?C:-1
}if(c&&A.indexOf===c){return A.indexOf(D)
}C=0;
for(B=A.length;
C<B;
C++){if(A[C]===D){return C
}}return -1
};
AD.lastIndexOf=function(B,A){if(B==null){return -1
}if(G&&B.lastIndexOf===G){return B.lastIndexOf(A)
}for(var C=B.length;
C--;
){if(B[C]===A){return C
}}return -1
};
AD.range=function(B,A,F){arguments.length<=1&&(A=B||0,B=0);
F=arguments[2]||1;
for(var E=Math.max(Math.ceil((A-B)/F),0),D=0,C=Array(E);
D<E;
){C[D++]=B,B+=F
}return C
};
AD.bind=function(B,A){if(B.bind===Y&&Y){return Y.apply(B,AC.call(arguments,1))
}var C=AC.call(arguments,2);
return function(){return B.apply(A,C.concat(AC.call(arguments)))
}
};
AD.bindAll=function(A){var B=AC.call(arguments,1);
B.length==0&&(B=AD.functions(A));
AB(B,function(C){A[C]=AD.bind(A[C],A)
});
return A
};
AD.memoize=function(A,C){var B={};
C||(C=AD.identity);
return function(){var D=C.apply(this,arguments);
return g.call(B,D)?B[D]:B[D]=A.apply(this,arguments)
}
};
AD.delay=function(B,A){var C=AC.call(arguments,2);
return setTimeout(function(){return B.apply(B,C)
},A)
};
AD.defer=function(A){return AD.delay.apply(AD,[A,1].concat(AC.call(arguments,1)))
};
var X=function(B,A,D){var C;
return function(){var H=this,F=arguments,E=function(){C=null;
B.apply(H,F)
};
D&&clearTimeout(C);
if(D||!C){C=setTimeout(E,A)
}}
};
AD.throttle=function(B,A){return X(B,A,!1)
};
AD.debounce=function(B,A){return X(B,A,!0)
};
AD.once=function(B){var A=!1,C;
return function(){if(A){return C
}A=!0;
return C=B.apply(this,arguments)
}
};
AD.wrap=function(B,A){return function(){var C=[B].concat(AC.call(arguments));
return A.apply(this,C)
}
};
AD.compose=function(){var A=AC.call(arguments);
return function(){for(var B=AC.call(arguments),C=A.length-1;
C>=0;
C--){B=[A[C].apply(this,B)]
}return B[0]
}
};
AD.after=function(B,A){return function(){if(--B<1){return A.apply(this,arguments)
}}
};
AD.keys=P||function(B){if(B!==Object(B)){throw new TypeError("Invalid object")
}var A=[],C;
for(C in B){g.call(B,C)&&(A[A.length]=C)
}return A
};
AD.values=function(A){return AD.map(A,AD.identity)
};
AD.functions=AD.methods=function(A){return AD.filter(AD.keys(A),function(B){return AD.isFunction(A[B])
}).sort()
};
AD.extend=function(A){AB(AC.call(arguments,1),function(B){for(var C in B){B[C]!==void 0&&(A[C]=B[C])
}});
return A
};
AD.defaults=function(A){AB(AC.call(arguments,1),function(B){for(var C in B){A[C]==null&&(A[C]=B[C])
}});
return A
};
AD.clone=function(A){return AD.isArray(A)?A.slice():AD.extend({},A)
};
AD.tap=function(B,A){A(B);
return B
};
AD.isEqual=function(A,E){if(A===E){return !0
}var D=typeof A;
if(D!=typeof E){return !1
}if(A==E){return !0
}if(!A&&E||A&&!E){return !1
}if(A._chain){A=A._wrapped
}if(E._chain){E=E._wrapped
}if(A.isEqual){return A.isEqual(E)
}if(AD.isDate(A)&&AD.isDate(E)){return A.getTime()===E.getTime()
}if(AD.isNaN(A)&&AD.isNaN(E)){return !1
}if(AD.isRegExp(A)&&AD.isRegExp(E)){return A.source===E.source&&A.global===E.global&&A.ignoreCase===E.ignoreCase&&A.multiline===E.multiline
}if(D!=="object"){return !1
}if(A.length&&A.length!==E.length){return !1
}D=AD.keys(A);
var C=AD.keys(E);
if(D.length!=C.length){return !1
}for(var B in A){if(!(B in E)||!AD.isEqual(A[B],E[B])){return !1
}}return !0
};
AD.isEmpty=function(A){if(AD.isArray(A)||AD.isString(A)){return A.length===0
}for(var B in A){if(g.call(A,B)){return !1
}}return !0
};
AD.isElement=function(A){return !!(A&&A.nodeType==1)
};
AD.isArray=d||function(A){return R.call(A)==="[object Array]"
};
AD.isArguments=function(A){return !(!A||!g.call(A,"callee"))
};
AD.isFunction=function(A){return !(!A||!A.constructor||!A.call||!A.apply)
};
AD.isString=function(A){return !!(A===""||A&&A.charCodeAt&&A.substr)
};
AD.isNumber=function(A){return !!(A===0||A&&A.toExponential&&A.toFixed)
};
AD.isNaN=function(A){return A!==A
};
AD.isBoolean=function(A){return A===!0||A===!1
};
AD.isDate=function(A){return !(!A||!A.getTimezoneOffset||!A.setUTCFullYear)
};
AD.isRegExp=function(A){return !(!A||!A.test||!A.exec||!(A.ignoreCase||A.ignoreCase===!1))
};
AD.isNull=function(A){return A===null
};
AD.isUndefined=function(A){return A===void 0
};
AD.noConflict=function(){a._=W;
return this
};
AD.identity=function(A){return A
};
AD.times=function(B,A,D){for(var C=0;
C<B;
C++){A.call(D,C)
}};
AD.mixin=function(A){AB(AD.functions(A),function(B){M(B,AD[B]=A[B])
})
};
var K=0;
AD.uniqueId=function(B){var A=K++;
return B?B+A:A
};
AD.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g};
AD.template=function(A,C){var B=AD.templateSettings;
B="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+A.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(B.interpolate,function(E,D){return"',"+D.replace(/\\'/g,"'")+",'"
}).replace(B.evaluate||null,function(E,D){return"');"+D.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"
}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');";
B=new Function("obj",B);
return C?B(C):B
};
var k=function(A){this._wrapped=A
};
AD.prototype=k.prototype;
var V=function(A,B){return B?AD(A).chain():A
},M=function(A,B){k.prototype[A]=function(){var C=AC.call(arguments);
U.call(C,this._wrapped);
return V(B.apply(AD,C),this._chain)
}
};
AD.mixin(AD);
AB(["pop","push","reverse","shift","sort","splice","unshift"],function(B){var A=AA[B];
k.prototype[B]=function(){A.apply(this._wrapped,arguments);
return V(this._wrapped,this._chain)
}
});
AB(["concat","join","slice"],function(B){var A=AA[B];
k.prototype[B]=function(){return V(A.apply(this._wrapped,arguments),this._chain)
}
});
k.prototype.chain=function(){this._chain=!0;
return this
};
k.prototype.value=function(){return this._wrapped
}
})();
(function(){function B(D){if(D){return C.escapeRegExp(D)
}return"\\s"
}var A=String.prototype.trim,C;
C=this._s={capitalize:function(D){return D.charAt(0).toUpperCase()+D.substring(1).toLowerCase()
},join:function(D){for(var E="",F=1;
F<arguments.length;
F+=1){E+=String(arguments[F]);
if(F!==arguments.length-1){E+=String(D)
}}return E
},escapeRegExp:function(D){return D.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")
},reverse:function(D){return Array.prototype.reverse.apply(D.split("")).join("")
},contains:function(D,E){return D.indexOf(E)!==-1
},clean:function(D){return C.strip(D.replace(/\s+/g," "))
},trim:function(D,E){if(!E&&A){return A.call(D)
}E=B(E);
return D.replace(new RegExp("^["+E+"]+|["+E+"]+$","g"),"")
},ltrim:function(D,E){E=B(E);
return D.replace(new RegExp("^["+E+"]+","g"),"")
},rtrim:function(D,E){E=B(E);
return D.replace(new RegExp("["+E+"]+$","g"),"")
},startsWith:function(D,E){return D.length>=E.length&&D.substring(0,E.length)===E
},endsWith:function(D,E){return D.length>=E.length&&D.substring(D.length-E.length)===E
},sprintf:function(){for(var D=0,E,J=arguments[D++],G=[],K,I,H;
J;
){if(K=/^[^\x25]+/.exec(J)){G.push(K[0])
}else{if(K=/^\x25{2}/.exec(J)){G.push("%")
}else{if(K=/^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(J)){if((E=arguments[K[1]||D++])==null||E==undefined){throw"Too few arguments."
}if(/[^s]/.test(K[7])&&typeof E!="number"){throw"Expecting number but found "+typeof E
}switch(K[7]){case"b":E=E.toString(2);
break;
case"c":E=String.fromCharCode(E);
break;
case"d":E=parseInt(E);
break;
case"e":E=K[6]?E.toExponential(K[6]):E.toExponential();
break;
case"f":E=K[6]?parseFloat(E).toFixed(K[6]):parseFloat(E);
break;
case"o":E=E.toString(8);
break;
case"s":E=(E=String(E))&&K[6]?E.substring(0,K[6]):E;
break;
case"u":E=Math.abs(E);
break;
case"x":E=E.toString(16);
break;
case"X":E=E.toString(16).toUpperCase();
break
}E=/[def]/.test(K[7])&&K[2]&&E>=0?"+"+E:E;
I=K[3]?K[3]=="0"?"0":K[3].charAt(1):" ";
H=K[5]-String(E).length-0;
if(K[5]){H=H;
for(var F=[];
H>0;
F[--H]=I){}I=F.join("")
}else{I=""
}I=I;
G.push(""+(K[4]?E+I:I+E))
}else{throw"Huh ?!"
}}}J=J.substring(K[0].length)
}return G.join("")
}};
this._s.strip=C.trim;
this._s.lstrip=C.ltrim;
this._s.rstrip=C.rtrim;
this._&&this._.mixin(this._s)
})();
_.mixin({deepClone:function(C){if(C==null||typeof (C)!="object"){return C
}var A=new C.constructor();
for(var B in C){A[B]=_.deepClone(C[B])
}return A
},hasValue:function(A){return(typeof A!="undefined"&&A!=null&&A!="")
},cookie:function(C,F){if(typeof F=="undefined"){var B=document.cookie.split(/[; ]+/);
for(var D=0;
D<B.length;
D++){var G=B[D].substring(0,B[D].indexOf("="));
if(G==C){return B[D].substring(C.length+1)
}}}else{var A=null;
if(F.expires){A=new Date();
A.setDate(A.getDate()+F.expires)
}var E=F.path||"/";
document.cookie=C+"="+escape(F.value)+((A==null)?"":";expires="+A.toUTCString())+";path="+E
}},logMessage:function(A){if(window.console){console.log(A)
}}});
var swfobject=function(){var AQ="undefined",Ac="object",AB="Shockwave Flash",X="ShockwaveFlash.ShockwaveFlash",Ad="application/x-shockwave-flash",AC="SWFObjectExprInst",AW="onreadystatechange",AF=window,Ak=document,Aa=navigator,AA=false,Z=[Am],Af=[],AG=[],AL=[],Ai,AD,AP,AS,AK=false,At=false,Ag,AN,Ah=true,AH=function(){var A=typeof Ak.getElementById!=AQ&&typeof Ak.getElementsByTagName!=AQ&&typeof Ak.createElement!=AQ,E=Aa.userAgent.toLowerCase(),C=Aa.platform.toLowerCase(),H=C?/win/.test(C):/win/.test(E),J=C?/mac/.test(C):/mac/.test(E),G=/webkit/.test(E)?parseFloat(E.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,D=!+"\v1",F=[0,0,0],K=null;
if(typeof Aa.plugins!=AQ&&typeof Aa.plugins[AB]==Ac){K=Aa.plugins[AB].description;
if(K&&!(typeof Aa.mimeTypes!=AQ&&Aa.mimeTypes[Ad]&&!Aa.mimeTypes[Ad].enabledPlugin)){AA=true;
D=false;
K=K.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
F[0]=parseInt(K.replace(/^(.*)\..*$/,"$1"),10);
F[1]=parseInt(K.replace(/^.*\.(.*)\s.*$/,"$1"),10);
F[2]=/[a-zA-Z]/.test(K)?parseInt(K.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
}}else{if(typeof AF.ActiveXObject!=AQ){try{var I=new ActiveXObject(X);
if(I){K=I.GetVariable("$version");
if(K){D=true;
K=K.split(" ")[1].split(",");
F=[parseInt(K[0],10),parseInt(K[1],10),parseInt(K[2],10)]
}}}catch(B){}}}return{w3:A,pv:F,wk:G,ie:D,win:H,mac:J}
}(),Aj=function(){if(!AH.w3){return 
}if((typeof Ak.readyState!=AQ&&Ak.readyState=="complete")||(typeof Ak.readyState==AQ&&(Ak.getElementsByTagName("body")[0]||Ak.body))){Ao()
}if(!AK){if(typeof Ak.addEventListener!=AQ){Ak.addEventListener("DOMContentLoaded",Ao,false)
}if(AH.ie&&AH.win){Ak.attachEvent(AW,function(){if(Ak.readyState=="complete"){Ak.detachEvent(AW,arguments.callee);
Ao()
}});
if(AF==top){(function(){if(AK){return 
}try{Ak.documentElement.doScroll("left")
}catch(A){setTimeout(arguments.callee,0);
return 
}Ao()
})()
}}if(AH.wk){(function(){if(AK){return 
}if(!/loaded|complete/.test(Ak.readyState)){setTimeout(arguments.callee,0);
return 
}Ao()
})()
}Ab(Ao)
}}();
function Ao(){if(AK){return 
}try{var B=Ak.getElementsByTagName("body")[0].appendChild(AR("span"));
B.parentNode.removeChild(B)
}catch(A){return 
}AK=true;
var D=Z.length;
for(var C=0;
C<D;
C++){Z[C]()
}}function AJ(A){if(AK){A()
}else{Z[Z.length]=A
}}function Ab(A){if(typeof AF.addEventListener!=AQ){AF.addEventListener("load",A,false)
}else{if(typeof Ak.addEventListener!=AQ){Ak.addEventListener("load",A,false)
}else{if(typeof AF.attachEvent!=AQ){Al(AF,"onload",A)
}else{if(typeof AF.onload=="function"){var B=AF.onload;
AF.onload=function(){B();
A()
}
}else{AF.onload=A
}}}}}function Am(){if(AA){Y()
}else{AM()
}}function Y(){var D=Ak.getElementsByTagName("body")[0];
var B=AR(Ac);
B.setAttribute("type",Ad);
var A=D.appendChild(B);
if(A){var C=0;
(function(){if(typeof A.GetVariable!=AQ){var E=A.GetVariable("$version");
if(E){E=E.split(" ")[1].split(",");
AH.pv=[parseInt(E[0],10),parseInt(E[1],10),parseInt(E[2],10)]
}}else{if(C<10){C++;
setTimeout(arguments.callee,10);
return 
}}D.removeChild(B);
A=null;
AM()
})()
}else{AM()
}}function AM(){var G=Af.length;
if(G>0){for(var H=0;
H<G;
H++){var C=Af[H].id;
var L=Af[H].callbackFn;
var A={success:false,id:C};
if(AH.pv[0]>0){var I=Ar(C);
if(I){if(AO(Af[H].swfVersion)&&!(AH.wk&&AH.wk<312)){AX(C,true);
if(L){A.success=true;
A.ref=AU(C);
L(A)
}}else{if(Af[H].expressInstall&&AT()){var E={};
E.data=Af[H].expressInstall;
E.width=I.getAttribute("width")||"0";
E.height=I.getAttribute("height")||"0";
if(I.getAttribute("class")){E.styleclass=I.getAttribute("class")
}if(I.getAttribute("align")){E.align=I.getAttribute("align")
}var F={};
var D=I.getElementsByTagName("param");
var K=D.length;
for(var J=0;
J<K;
J++){if(D[J].getAttribute("name").toLowerCase()!="movie"){F[D[J].getAttribute("name")]=D[J].getAttribute("value")
}}AE(E,F,C,L)
}else{Ae(I);
if(L){L(A)
}}}}}else{AX(C,true);
if(L){var B=AU(C);
if(B&&typeof B.SetVariable!=AQ){A.success=true;
A.ref=B
}L(A)
}}}}}function AU(B){var D=null;
var C=Ar(B);
if(C&&C.nodeName=="OBJECT"){if(typeof C.SetVariable!=AQ){D=C
}else{var A=C.getElementsByTagName(Ac)[0];
if(A){D=A
}}}return D
}function AT(){return !At&&AO("6.0.65")&&(AH.win||AH.mac)&&!(AH.wk&&AH.wk<312)
}function AE(F,D,H,E){At=true;
AP=E||null;
AS={success:false,id:H};
var A=Ar(H);
if(A){if(A.nodeName=="OBJECT"){Ai=An(A);
AD=null
}else{Ai=A;
AD=H
}F.id=AC;
if(typeof F.width==AQ||(!/%$/.test(F.width)&&parseInt(F.width,10)<310)){F.width="310"
}if(typeof F.height==AQ||(!/%$/.test(F.height)&&parseInt(F.height,10)<137)){F.height="137"
}Ak.title=Ak.title.slice(0,47)+" - Flash Player Installation";
var B=AH.ie&&AH.win?"ActiveX":"PlugIn",C="MMredirectURL="+AF.location.toString().replace(/&/g,"%26")+"&MMplayerType="+B+"&MMdoctitle="+Ak.title;
if(typeof D.flashvars!=AQ){D.flashvars+="&"+C
}else{D.flashvars=C
}if(AH.ie&&AH.win&&A.readyState!=4){var G=AR("div");
H+="SWFObjectNew";
G.setAttribute("id",H);
A.parentNode.insertBefore(G,A);
A.style.display="none";
(function(){if(A.readyState==4){A.parentNode.removeChild(A)
}else{setTimeout(arguments.callee,10)
}})()
}AZ(F,D,H)
}}function Ae(A){if(AH.ie&&AH.win&&A.readyState!=4){var B=AR("div");
A.parentNode.insertBefore(B,A);
B.parentNode.replaceChild(An(A),B);
A.style.display="none";
(function(){if(A.readyState==4){A.parentNode.removeChild(A)
}else{setTimeout(arguments.callee,10)
}})()
}else{A.parentNode.replaceChild(An(A),A)
}}function An(B){var D=AR("div");
if(AH.win&&AH.ie){D.innerHTML=B.innerHTML
}else{var E=B.getElementsByTagName(Ac)[0];
if(E){var A=E.childNodes;
if(A){var F=A.length;
for(var C=0;
C<F;
C++){if(!(A[C].nodeType==1&&A[C].nodeName=="PARAM")&&!(A[C].nodeType==8)){D.appendChild(A[C].cloneNode(true))
}}}}}return D
}function AZ(E,G,C){var D,A=Ar(C);
if(AH.wk&&AH.wk<312){return D
}if(A){if(typeof E.id==AQ){E.id=C
}if(AH.ie&&AH.win){var F="";
for(var I in E){if(E[I]!=Object.prototype[I]){if(I.toLowerCase()=="data"){G.movie=E[I]
}else{if(I.toLowerCase()=="styleclass"){F+=' class="'+E[I]+'"'
}else{if(I.toLowerCase()!="classid"){F+=" "+I+'="'+E[I]+'"'
}}}}}var H="";
for(var J in G){if(G[J]!=Object.prototype[J]){H+='<param name="'+J+'" value="'+G[J]+'" />'
}}A.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+F+">"+H+"</object>";
AG[AG.length]=E.id;
D=Ar(E.id)
}else{var B=AR(Ac);
B.setAttribute("type",Ad);
for(var K in E){if(E[K]!=Object.prototype[K]){if(K.toLowerCase()=="styleclass"){B.setAttribute("class",E[K])
}else{if(K.toLowerCase()!="classid"){B.setAttribute(K,E[K])
}}}}for(var L in G){if(G[L]!=Object.prototype[L]&&L.toLowerCase()!="movie"){Ap(B,L,G[L])
}}A.parentNode.replaceChild(B,A);
D=B
}}return D
}function Ap(B,D,C){var A=AR("param");
A.setAttribute("name",D);
A.setAttribute("value",C);
B.appendChild(A)
}function AV(A){var B=Ar(A);
if(B&&B.nodeName=="OBJECT"){if(AH.ie&&AH.win){B.style.display="none";
(function(){if(B.readyState==4){As(A)
}else{setTimeout(arguments.callee,10)
}})()
}else{B.parentNode.removeChild(B)
}}}function As(A){var B=Ar(A);
if(B){for(var C in B){if(typeof B[C]=="function"){B[C]=null
}}B.parentNode.removeChild(B)
}}function Ar(A){var C=null;
try{C=Ak.getElementById(A)
}catch(B){}return C
}function AR(A){return Ak.createElement(A)
}function Al(A,C,B){A.attachEvent(C,B);
AL[AL.length]=[A,C,B]
}function AO(A){var B=AH.pv,C=A.split(".");
C[0]=parseInt(C[0],10);
C[1]=parseInt(C[1],10)||0;
C[2]=parseInt(C[2],10)||0;
return(B[0]>C[0]||(B[0]==C[0]&&B[1]>C[1])||(B[0]==C[0]&&B[1]==C[1]&&B[2]>=C[2]))?true:false
}function AY(B,F,A,C){if(AH.ie&&AH.mac){return 
}var E=Ak.getElementsByTagName("head")[0];
if(!E){return 
}var G=(A&&typeof A=="string")?A:"screen";
if(C){Ag=null;
AN=null
}if(!Ag||AN!=G){var D=AR("style");
D.setAttribute("type","text/css");
D.setAttribute("media",G);
Ag=E.appendChild(D);
if(AH.ie&&AH.win&&typeof Ak.styleSheets!=AQ&&Ak.styleSheets.length>0){Ag=Ak.styleSheets[Ak.styleSheets.length-1]
}AN=G
}if(AH.ie&&AH.win){if(Ag&&typeof Ag.addRule==Ac){Ag.addRule(B,F)
}}else{if(Ag&&typeof Ak.createTextNode!=AQ){Ag.appendChild(Ak.createTextNode(B+" {"+F+"}"))
}}}function AX(A,C){if(!Ah){return 
}var B=C?"visible":"hidden";
if(AK&&Ar(A)){Ar(A).style.visibility=B
}else{AY("#"+A,"visibility:"+B)
}}function AI(B){var A=/[\\\"<>\.;]/;
var C=A.exec(B)!=null;
return C&&typeof encodeURIComponent!=AQ?encodeURIComponent(B):B
}var Aq=function(){if(AH.ie&&AH.win){window.attachEvent("onunload",function(){var A=AL.length;
for(var B=0;
B<A;
B++){AL[B][0].detachEvent(AL[B][1],AL[B][2])
}var D=AG.length;
for(var C=0;
C<D;
C++){AV(AG[C])
}for(var E in AH){AH[E]=null
}AH=null;
for(var F in swfobject){swfobject[F]=null
}swfobject=null
})
}}();
return{registerObject:function(A,E,C,B){if(AH.w3&&A&&E){var D={};
D.id=A;
D.swfVersion=E;
D.expressInstall=C;
D.callbackFn=B;
Af[Af.length]=D;
AX(A,false)
}else{if(B){B({success:false,id:A})
}}},getObjectById:function(A){if(AH.w3){return AU(A)
}},embedSWF:function(K,E,H,F,C,A,B,I,G,J){var D={success:false,id:E};
if(AH.w3&&!(AH.wk&&AH.wk<312)&&K&&E&&H&&F&&C){AX(E,false);
AJ(function(){H+="";
F+="";
var Q={};
if(G&&typeof G===Ac){for(var O in G){Q[O]=G[O]
}}Q.data=K;
Q.width=H;
Q.height=F;
var N={};
if(I&&typeof I===Ac){for(var P in I){N[P]=I[P]
}}if(B&&typeof B===Ac){for(var L in B){if(typeof N.flashvars!=AQ){N.flashvars+="&"+L+"="+B[L]
}else{N.flashvars=L+"="+B[L]
}}}if(AO(C)){var M=AZ(Q,N,E);
if(Q.id==E){AX(E,true)
}D.success=true;
D.ref=M
}else{if(A&&AT()){Q.data=A;
AE(Q,N,E,J);
return 
}else{AX(E,true)
}}if(J){J(D)
}})
}else{if(J){J(D)
}}},switchOffAutoHideShow:function(){Ah=false
},ua:AH,getFlashPlayerVersion:function(){return{major:AH.pv[0],minor:AH.pv[1],release:AH.pv[2]}
},hasFlashPlayerVersion:AO,createSWF:function(A,B,C){if(AH.w3){return AZ(A,B,C)
}else{return undefined
}},showExpressInstall:function(B,A,D,C){if(AH.w3&&AT()){AE(B,A,D,C)
}},removeSWF:function(A){if(AH.w3){AV(A)
}},createCSS:function(B,A,C,D){if(AH.w3){AY(B,A,C,D)
}},addDomLoadEvent:AJ,addLoadEvent:Ab,getQueryParamValue:function(B){var A=Ak.location.search||Ak.location.hash;
if(A){if(/\?/.test(A)){A=A.split("?")[1]
}if(B==null){return AI(A)
}var C=A.split("&");
for(var D=0;
D<C.length;
D++){if(C[D].substring(0,C[D].indexOf("="))==B){return AI(C[D].substring((C[D].indexOf("=")+1)))
}}}return""
},expressInstallCallback:function(){if(At){var A=Ar(AC);
if(A&&Ai){A.parentNode.replaceChild(Ai,A);
if(AD){AX(AD,true);
if(AH.ie&&AH.win){Ai.style.display="block"
}}if(AP){AP(AS)
}}At=false
}}}
}();
var UUID;
UUID=(function(B){function C(){}C.generate=function(){var D=C._getRandomInt,E=C._hexAligner;
return E(D(32),8)+"-"+E(D(16),4)+"-"+E(16384|D(12),4)+"-"+E(32768|D(14),4)+"-"+E(D(48),12)
};
C._getRandomInt=function(D){if(D<0){return NaN
}if(D<=30){return(0|Math.random()*(1<<D))
}if(D<=53){return(0|Math.random()*(1<<30))+(0|Math.random()*(1<<D-30))*(1<<30)
}return NaN
};
C._getIntAligner=function(D){return function(E,G){var I=E.toString(D),F=G-I.length,H="0";
for(;
F>0;
F>>>=1,H+=H){if(F&1){I=H+I
}}return I
}
};
C._hexAligner=C._getIntAligner(16);
C.FIELD_NAMES=["timeLow","timeMid","timeHiAndVersion","clockSeqHiAndReserved","clockSeqLow","node"];
C.FIELD_SIZES=[32,16,16,8,8,48];
C.genV4=function(){var D=C._getRandomInt;
return new C()._init(D(32),D(16),16384|D(12),128|D(6),D(8),D(48))
};
C.parse=function(H){var F,G=/^\s*(urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(\})?\s*$/i;
if(F=G.exec(H)){var D=F[1]||"",E=F[8]||"";
if(((D+E)==="")||(D==="{"&&E==="}")||(D.toLowerCase()==="urn:uuid:"&&E==="")){return new C()._init(parseInt(F[2],16),parseInt(F[3],16),parseInt(F[4],16),parseInt(F[5],16),parseInt(F[6],16),parseInt(F[7],16))
}}return null
};
C.prototype._init=function(){var I=C.FIELD_NAMES,H=C.FIELD_SIZES;
var E=C._binAligner,G=C._hexAligner;
this.intFields=new Array(6);
this.bitFields=new Array(6);
this.hexFields=new Array(6);
for(var D=0;
D<6;
D++){var F=parseInt(arguments[D]||0);
this.intFields[D]=this.intFields[I[D]]=F;
this.bitFields[D]=this.bitFields[I[D]]=E(F,H[D]);
this.hexFields[D]=this.hexFields[I[D]]=G(F,H[D]/4)
}this.version=(this.intFields.timeHiAndVersion>>12)&15;
this.bitString=this.bitFields.join("");
this.hexString=this.hexFields[0]+"-"+this.hexFields[1]+"-"+this.hexFields[2]+"-"+this.hexFields[3]+this.hexFields[4]+"-"+this.hexFields[5];
this.urn="urn:uuid:"+this.hexString;
return this
};
C._binAligner=C._getIntAligner(2);
C.prototype.toString=function(){return this.hexString
};
C.prototype.equals=function(E){if(!(E instanceof C)){return false
}for(var D=0;
D<6;
D++){if(this.intFields[D]!==E.intFields[D]){return false
}}return true
};
C.genV1=function(){var H=new Date().getTime(),G=C._state;
if(H!=G.timestamp){if(H<G.timestamp){G.sequence++
}G.timestamp=H;
G.tick=C._getRandomInt(4)
}else{if(Math.random()<C._tsRatio&&G.tick<9984){G.tick+=1+C._getRandomInt(4)
}else{G.sequence++
}}var J=C._getTimeFieldValues(G.timestamp);
var F=J.low+G.tick;
var I=(J.hi&4095)|4096;
G.sequence&=16383;
var E=(G.sequence>>>8)|128;
var D=G.sequence&255;
return new C()._init(F,J.mid,I,E,D,G.node)
};
C.resetState=function(){C._state=new C._state.constructor()
};
C._tsRatio=1/4;
C._state=new function A(){var D=C._getRandomInt;
this.timestamp=0;
this.sequence=D(14);
this.node=(D(8)|1)*1099511627776+D(40);
this.tick=D(4)
};
C._getTimeFieldValues=function(E){var D=E-Date.UTC(1582,9,15);
var F=((D/4294967296)*10000)&268435455;
return{low:((D&268435455)*10000)%4294967296,mid:F&65535,hi:F>>>16,timestamp:D}
};
C.makeBackwardCompatible=function(){var D=C.generate;
C.generate=function(E){return(E&&E.version==1)?C.genV1().hexString:D.call(C)
};
C.makeBackwardCompatible=function(){}
};
C.overwrittenUUID=B;
return C
})(UUID);
(function(G){function O(U,X){var W=(U&65535)+(X&65535),V=(U>>16)+(X>>16)+(W>>16);
return(V<<16)|(W&65535)
}function S(U,V){return(U<<V)|(U>>>(32-V))
}function C(Z,W,V,U,Y,X){return O(S(O(O(W,Z),O(U,X)),Y),V)
}function B(W,V,e,Z,U,Y,X){return C((V&e)|((~V)&Z),W,V,U,Y,X)
}function I(W,V,e,Z,U,Y,X){return C((V&Z)|(e&(~Z)),W,V,U,Y,X)
}function N(W,V,e,Z,U,Y,X){return C(V^e^Z,W,V,U,Y,X)
}function A(W,V,e,Z,U,Y,X){return C(e^(V|(~Z)),W,V,U,Y,X)
}function D(j,Z){j[Z>>5]|=128<<((Z)%32);
j[(((Z+64)>>>9)<<4)+14]=Z;
var W,Y,X,V,U,h=1732584193,g=-271733879,f=-1732584194,e=271733878;
for(W=0;
W<j.length;
W+=16){Y=h;
X=g;
V=f;
U=e;
h=B(h,g,f,e,j[W],7,-680876936);
e=B(e,h,g,f,j[W+1],12,-389564586);
f=B(f,e,h,g,j[W+2],17,606105819);
g=B(g,f,e,h,j[W+3],22,-1044525330);
h=B(h,g,f,e,j[W+4],7,-176418897);
e=B(e,h,g,f,j[W+5],12,1200080426);
f=B(f,e,h,g,j[W+6],17,-1473231341);
g=B(g,f,e,h,j[W+7],22,-45705983);
h=B(h,g,f,e,j[W+8],7,1770035416);
e=B(e,h,g,f,j[W+9],12,-1958414417);
f=B(f,e,h,g,j[W+10],17,-42063);
g=B(g,f,e,h,j[W+11],22,-1990404162);
h=B(h,g,f,e,j[W+12],7,1804603682);
e=B(e,h,g,f,j[W+13],12,-40341101);
f=B(f,e,h,g,j[W+14],17,-1502002290);
g=B(g,f,e,h,j[W+15],22,1236535329);
h=I(h,g,f,e,j[W+1],5,-165796510);
e=I(e,h,g,f,j[W+6],9,-1069501632);
f=I(f,e,h,g,j[W+11],14,643717713);
g=I(g,f,e,h,j[W],20,-373897302);
h=I(h,g,f,e,j[W+5],5,-701558691);
e=I(e,h,g,f,j[W+10],9,38016083);
f=I(f,e,h,g,j[W+15],14,-660478335);
g=I(g,f,e,h,j[W+4],20,-405537848);
h=I(h,g,f,e,j[W+9],5,568446438);
e=I(e,h,g,f,j[W+14],9,-1019803690);
f=I(f,e,h,g,j[W+3],14,-187363961);
g=I(g,f,e,h,j[W+8],20,1163531501);
h=I(h,g,f,e,j[W+13],5,-1444681467);
e=I(e,h,g,f,j[W+2],9,-51403784);
f=I(f,e,h,g,j[W+7],14,1735328473);
g=I(g,f,e,h,j[W+12],20,-1926607734);
h=N(h,g,f,e,j[W+5],4,-378558);
e=N(e,h,g,f,j[W+8],11,-2022574463);
f=N(f,e,h,g,j[W+11],16,1839030562);
g=N(g,f,e,h,j[W+14],23,-35309556);
h=N(h,g,f,e,j[W+1],4,-1530992060);
e=N(e,h,g,f,j[W+4],11,1272893353);
f=N(f,e,h,g,j[W+7],16,-155497632);
g=N(g,f,e,h,j[W+10],23,-1094730640);
h=N(h,g,f,e,j[W+13],4,681279174);
e=N(e,h,g,f,j[W],11,-358537222);
f=N(f,e,h,g,j[W+3],16,-722521979);
g=N(g,f,e,h,j[W+6],23,76029189);
h=N(h,g,f,e,j[W+9],4,-640364487);
e=N(e,h,g,f,j[W+12],11,-421815835);
f=N(f,e,h,g,j[W+15],16,530742520);
g=N(g,f,e,h,j[W+2],23,-995338651);
h=A(h,g,f,e,j[W],6,-198630844);
e=A(e,h,g,f,j[W+7],10,1126891415);
f=A(f,e,h,g,j[W+14],15,-1416354905);
g=A(g,f,e,h,j[W+5],21,-57434055);
h=A(h,g,f,e,j[W+12],6,1700485571);
e=A(e,h,g,f,j[W+3],10,-1894986606);
f=A(f,e,h,g,j[W+10],15,-1051523);
g=A(g,f,e,h,j[W+1],21,-2054922799);
h=A(h,g,f,e,j[W+8],6,1873313359);
e=A(e,h,g,f,j[W+15],10,-30611744);
f=A(f,e,h,g,j[W+6],15,-1560198380);
g=A(g,f,e,h,j[W+13],21,1309151649);
h=A(h,g,f,e,j[W+4],6,-145523070);
e=A(e,h,g,f,j[W+11],10,-1120210379);
f=A(f,e,h,g,j[W+2],15,718787259);
g=A(g,f,e,h,j[W+9],21,-343485551);
h=O(h,Y);
g=O(g,X);
f=O(f,V);
e=O(e,U)
}return[h,g,f,e]
}function P(V){var W,U="";
for(W=0;
W<V.length*32;
W+=8){U+=String.fromCharCode((V[W>>5]>>>(W%32))&255)
}return U
}function J(V){var W,U=[];
U[(V.length>>2)-1]=undefined;
for(W=0;
W<U.length;
W+=1){U[W]=0
}for(W=0;
W<V.length*8;
W+=8){U[W>>5]|=(V.charCodeAt(W/8)&255)<<(W%32)
}return U
}function K(U){return P(D(J(U),U.length*8))
}function E(W,Z){var V,Y=J(W),U=[],X=[],a;
U[15]=X[15]=undefined;
if(Y.length>16){Y=D(Y,W.length*8)
}for(V=0;
V<16;
V+=1){U[V]=Y[V]^909522486;
X[V]=Y[V]^1549556828
}a=D(U.concat(J(Z)),512+Z.length*8);
return P(D(X.concat(a),512+128))
}function T(W){var Y="0123456789abcdef",V="",U,X;
for(X=0;
X<W.length;
X+=1){U=W.charCodeAt(X);
V+=Y.charAt((U>>>4)&15)+Y.charAt(U&15)
}return V
}function M(U){return unescape(encodeURIComponent(U))
}function Q(U){return K(M(U))
}function L(U){return T(Q(U))
}function H(U,V){return E(M(U),M(V))
}function R(U,V){return T(H(U,V))
}function F(V,W,U){if(!W){if(!U){return L(V)
}else{return Q(V)
}}if(!U){return R(W,V)
}else{return H(W,V)
}}if(typeof define==="function"&&define.amd){define(function(){return F
})
}else{G.md5=F
}}(this));
var dailybeast=dailybeast||{};
dailybeast.metatags=function(){var M=[];
var J="";
var H=[];
var G="";
var B="";
var L="";
var E="";
var I="";
var Q=function(){var V=document.getElementsByTagName("meta");
for(var W=0;
W<V.length;
W++){var Z=V[W];
var Y="";
if(_.hasValue(Z.attributes.name)){Y=Z.attributes.name.nodeValue
}else{if(_.hasValue(Z.attributes["http-equiv"])){Y=Z.attributes["http-equiv"].nodeValue
}}if(Y!=null&&_.hasValue(Z.attributes.content)){var X=Z.attributes.content.nodeValue;
if(X.length>0){switch(Y){case"authors":M=X.split(",");
break;
case"section":J=X;
break;
case"tags":H=X.split(",");
break;
case"template":G=X;
break;
case"wrap":B=X;
break;
case"template-title":L=X;
break;
case"contentpath":E=X;
break;
case"platform":I=X;
break
}}}}}();
function P(){return M
}function D(){return H
}function A(){return J
}function C(Y,Z){Y+=":";
var X=[];
if(H){for(var W=0;
W<H.length;
W++){if(H[W].indexOf(Y)>=0&&H[W].length>0){var V=(Z)?H[W].substring(Y.length):H[W];
X.push(V)
}}}return X
}function R(Z,a){var X=[];
if(H){for(var W=0;
W<H.length;
W++){var Y=H[W];
if(Y.substr(0,Z.length)==Z){var V=(a)?H[W].substr(Z.length):H[W];
X.push(V)
}}}return X
}function S(){return G
}function U(){return B
}function O(){return L
}function F(){var V=C("topic");
if(V.length>0){return V[0].replace("topic:","")
}return""
}function N(){var V=C("ad");
return V
}function K(){return E
}function T(){return I
}return{getAuthors:P,getAllTags:D,getSection:A,getTags:C,getTagsByPath:R,getTemplate:S,getWrap:U,getTemplateTitle:O,getTopic:F,getAllAdTags:N,getContentPath:K,getPlatform:T}
}();
var dailybeast=dailybeast||{};
dailybeast.modes=function(){var D=typeof (CQ)!="undefined"?CQ.WCM.isEditMode():false;
var B=typeof (CQ)!="undefined"?CQ.WCM.isDesignMode():false;
var A=typeof (CQ)!="undefined"?CQ.WCM.isPreviewMode():false;
var E=(D||B||A||false);
var C=(window.top.location!=window.location)||false;
return{isEditMode:D,isDesignMode:B,isPreviewMode:A,isAuthorEnvironment:E,isUsingFrames:C}
}();
var dailybeast=dailybeast||{};
dailybeast.interstitial=function(){var E={};
var M=null;
var T=null;
var B=document.all&&!window.opera;
var K={};
var C=null;
var I=null;
var J={"default":"nwswk.misc"};
var L=function(X){var Y,b="",Z="";
var a=X.split("/");
for(Y=0;
Y<a.length;
Y++){b=";s"+(Y+1)+"="+a[Y];
Z=Z+b
}return Z
};
var N=function(){var Z,a="",Y,X;
Z=dailybeast.metatags.getTags("video",true);
if(Z&&Z.length>0){Y=Z[0];
X=Y.indexOf("/");
Y=Y.substring(X+1);
if(Y){a=";show="+Y
}}return a
};
function O(b){D();
var e=Q(b);
var h=dailybeast.metatags.getTags("topic",true);
if(h.length>0){h=h[0]
}var g=b.zone||h;
var l=b.size;
var c=this.extract_S_FromZone(g);
var Z=this.getShowtag();
var f="";
if(E.adKeyword){f=";test="+E.adKeyword
}else{var k=dailybeast.metatags.getTags("ad");
for(var d=0;
d<k.length;
d++){f+=";kw="+k[d].replace("ad:","")
}}var a=Math.random().toString();
C=a.substring(2,a.length);
I=1;
var Y=U();
var j=";template="+dailybeast.metatags.getTemplate();
var X="http://ad.doubleclick.net/adj/"+e+"/"+g+";tile="+I+";dcopt=ist;sz="+l+c+Z+j+Y+f+";ord="+C+"?";
document.write("\n<script src='"+X+"'><\/script>")
}function W(){window.onload=function(){K.creative=creative;
K.creativeBackup=creativeBackupURL;
K.width=creativeWidth;
K.height=creativeHeight;
K.clickTag=clickTag;
K.timer=intLength;
K.opacity=semiOpaque||1;
document.getElementsByTagName("html")[0].style.overflow="hidden";
document.body.style.overflow="hidden";
M=document.getElementById("interstitial");
M.appendChild(S());
M.appendChild(R());
M.appendChild(A());
var X=(K.timer)?K.timer*1000:15000;
setTimeout(function(){V()
},X);
M.style.display="block";
window.scrollTo(0,0)
}
}function P(Y){var X=document.cookie.split(/[; ]+/);
for(var Z=0;
Z<X.length;
Z++){var a=X[Z].substring(0,X[Z].indexOf("="));
if(a==Y){return X[Z].substring(Y.length+1)
}}}function H(Y,Z,a){var X=new Date();
X.setDate(X.getDate()+a);
document.cookie=Y+"="+escape(Z)+((X==null)?"":";expires="+X.toUTCString())
}function Q(a){var Z=J["default"];
if(a.siteID){Z=a.siteID
}else{var X=dailybeast.metatags.getTags("topic",true);
if(X.length>0){Z=J[X[0]]||Z
}else{var Y=dailybeast.metatags.getTemplate();
Z=J[Y]||Z
}}return Z
}function U(){var X="";
return X
}function V(X){M.style.display="none";
document.getElementsByTagName("html")[0].style.overflow="";
document.body.style.overflow="";
return false
}function S(X){X=X||K.opacity;
var Y=document.createElement("div");
Y.className="scrim";
if(X){Y.style.opacity=X;
Y.style.filter="alpha(opacity="+X*100+")"
}return Y
}function R(){var a=document.createElement("div");
a.className="header";
var Z=document.createElement("a");
Z.setAttribute("id","newsweek-logo-mini");
Z.setAttribute("href","#");
var Y=document.createElement("a");
Y.className="skip";
Y.innerHTML="SKIP &#187;";
Y.setAttribute("href","#");
Y.setAttribute("data-track","{'title':'skip interstitial'}");
Y.onmouseup=dailybeast.interstitial.hideInterstitial;
var X=document.createElement("div");
X.className="message";
X.innerHTML="The page you requested will appear shortly<br /><strong>ADVERTISEMENT</strong>";
a.appendChild(Z);
a.appendChild(Y);
a.appendChild(X);
return a
}function A(){var Y=(B)?document.all.clientHeight+"px":window.innerHeight;
var X;
var a="-"+(creativeWidth/2)+"px";
if(K.creative.charAt(0)!="<"){if(K.creative.match(".swf")&&K.creative.match("http")){flaCreative='<div id="flashCreative" style="margin-left: '+a+'"><a href="'+_creative.clickTag+'" target="_blank"><img src="'+K.creativeBackup+'" border="0" /></a></div>';
flaCreative+='<script type="text/javascript">swfobject.embedSWF("'+K.creative+"?"+K.clickTag+'","flashCreative","'+K.width+'","'+K.height+'","8.0.0","http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash",{menu:"false",quality:"high",wmode:"transparent",allowscriptaccess:"always",type:"application/x-shockwave-flash"},{id:"flashCreative",name:"flashCreative"})<\/script>';
X=flaCreative
}else{if((K.creative.match(".jpg")||K.creative.match(".gif")||K.creative.match(".png"))&&K.creative.match("http")){X='<a style="margin-left: '+a+'" href="'+K.clickTag+'" target="_blank"><img src="'+K.creative+'" border="0" /></a>'
}else{if(K.creative.match("http")&&!K.creative.match("<")){X='<iframe style="margin-left: '+a+'" frameborder="0" scrolling="no" width="'+K.width+'" height="'+K.height+'" src="'+K.creative+'"></iframe>'
}}}}var Z=document.createElement("div");
Z.innerHTML=X;
Z.className="creative";
return Z
}function D(){E={};
var Y=window.location.hash;
if(Y.length>1){Y=Y.substring(1);
var a=Y.split(";");
for(var X=0;
X<a.length;
X++){var Z=a[X].split("=");
E[Z[0]]=Z[1]
}}}function G(){return C
}function F(){return I
}return{init:O,render:W,hideInterstitial:V,getOrd:G,getTile:F,extract_S_FromZone:L,getShowtag:N}
}();
dailybeast.retry=dailybeast.retry||function(){var A={};
A.start=function(F){F=F||{};
var M=0;
var E=new Date().getTime();
var D=F.name||"";
var L=F.toRun||function(){return true
};
var N=F.maxAttempts||0;
var H=F.minDelay||100;
var J=H;
var C=F.maxTime||100000;
var G=F.progressive||true;
var K=F.cancelWhen||function(){return false
};
var I=F.onSuccess||function(){};
var B=function(){var P=false;
M++;
J=G?J+=H:H;
if(!K()){try{P=L.call(this)
}catch(O){$.warn("Error running "+D+". Encountered error "+O+". Will try again in "+J+"ms")
}if(P){I()
}else{if((N==0||M<=N)&&(C==0||(new Date().getTime()-E)<=C)){setTimeout(B,J)
}else{$.error("Giving up on trying to run "+D)
}}}};
setTimeout(B,1)
};
return A
}();
dailybeast.priorities=dailybeast.priorities||function(){var A={};
var B=function(C){this.qName=C;
this.theQ=new Array()
};
B.prototype.add=function(C,D,F){var E={name:C,handler:F,priority:D};
if(this.started){this.schedule(E)
}else{this.theQ.push(E)
}};
B.prototype.stop=function(){$.log("Stopping "+this.qName+" queue");
this.started=false
};
B.prototype.start=function(){this.started=true;
var D=this.theQ;
this.theQ=new Array();
D.sort(function(F,E){return F.priority-E.priority
});
$.log("Starting queue "+this.qName+" with "+D.length+" events");
for(var C=0;
C<D.length;
C++){this.schedule(D[C])
}};
B.prototype.schedule=function(C){var D=this;
setTimeout(function(){try{$.log("Running from "+D.qName+":"+C.name+"["+C.priority+"]");
C.handler.call(null)
}catch(E){$.error("Error encountered while running "+C.name+" in "+D.qName+": "+E.message,E)
}},1)
};
A.queues={CRITICAL:10,IMPORTANT:100,NORMAL:1000,SOMETIME:5000,WHENEVER:10000,domReady:new B("DOM Ready Queue"),windowReady:new B("Window Ready Queue")};
$(document).ready(function(){A.queues.domReady.start()
});
$(window).load(function(){A.queues.windowReady.start()
});
return A
}();
(function(){var A=jQuery;
A.priorityQ=dailybeast.priorities.queues
})();
(function(){if(_.cookie("show_mobile")!="false"){var B=["home","article","cheat"];
var C=dailybeast.metatags.getTemplate();
var D=(_(B).indexOf(C)>=0);
if(D){var A="";
if(C=="home"){A=window.location.protocol+"//"+window.location.host+"/content/dailybeast/mobile/home.html"
}else{A=window.location.href.substring(0,window.location.href.indexOf(".html"))+".mobile.html"
}(function(F,E){if(/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop |iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(F)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(F.substr(0,4))){window.location=E
}})(navigator.userAgent||navigator.vendor||window.opera,A)
}}});
(function(AD){function C(){AA||(AA=!0,J(Z,function(A){O(A)
}))
}function D(a,B){var A=AD.createElement("script");
A.type="text/"+(a.type||"javascript"),A.src=a.src||a,A.async=!1,A.onreadystatechange=A.onload=function(){var b=A.readyState;
!B.done&&(!b||/loaded|complete/.test(b))&&(B.done=!0,B())
},(AD.body||AC).appendChild(A)
}function E(B,A){if(B.state==P){return A&&A()
}if(B.state==Q){return T.ready(B.name,A)
}if(B.state==R){return B.onpreload.push(function(){E(B,A)
})
}B.state=Q,D(B.url,function(){B.state=P,A&&A(),J(X[B.name],function(b){O(b)
}),H()&&AA&&J(X.ALL,function(b){O(b)
})
})
}function F(B,A){B.state===undefined&&(B.state=R,B.onpreload=[],D({src:B.url,type:"cache"},function(){G(B)
}))
}function G(A){A.state=S,J(A.onpreload,function(B){B.call()
})
}function H(B){B=B||W;
var A;
for(var d in B){if(B.hasOwnProperty(d)&&B[d].state!=P){return !1
}A=!0
}return A
}function I(A){return Object.prototype.toString.call(A)=="[object Function]"
}function J(B,A){if(!!B){typeof B=="object"&&(B=[].slice.call(B));
for(var d=0;
d<B.length;
d++){A.call(B,B[d],d)
}}}function K(B){var A;
if(typeof B=="object"){for(var f in B){B[f]&&(A={name:f,url:B[f]})
}}else{A={name:M(B),url:B}
}var e=W[A.name];
if(e&&e.url===A.url){return e
}W[A.name]=A;
return A
}function M(B){var A=B.split("/"),f=A[A.length-1],e=f.indexOf("?");
return e!=-1?f.substring(0,e):f
}function O(A){A._done||(A(),A._done=1)
}var AC=AD.documentElement,AB,AA,Z=[],Y=[],X={},W={},V=AD.createElement("script").async===!0||"MozAppearance" in AD.documentElement.style||window.opera,U=window.head_conf&&head_conf.head||"head",T=window[U]=window[U]||function(){T.ready.apply(null,arguments)
},S=1,R=2,Q=3,P=4;
V?T.js=function(){var B=arguments,A=B[B.length-1],d={};
I(A)||(A=null),J(B,function(b,a){b!=A&&(b=K(b),d[b.name]=b,E(b,A&&a==B.length-2?function(){H(d)&&O(A)
}:null))
});
return T
}:T.js=function(){var B=arguments,A=[].slice.call(B,1),c=A[0];
if(!AB){Y.push(function(){T.js.apply(null,B)
});
return T
}c?(J(A,function(b){I(b)||F(K(b))
}),E(K(B[0]),I(c)?c:function(){T.js.apply(null,A)
})):E(K(B[0]));
return T
},T.ready=function(A,d){if(A==AD){AA?O(d):Z.push(d);
return T
}I(A)&&(d=A,A="ALL");
if(typeof A!="string"||!I(d)){return T
}var a=W[A];
if(a&&a.state==P||A=="ALL"&&H()&&AA){O(d);
return T
}var B=X[A];
B?B.push(d):B=X[A]=[d];
return T
},T.ready(AD,function(){H()&&J(X.ALL,function(A){O(A)
}),T.feature&&T.feature("domloaded",!0)
});
if(window.addEventListener){AD.addEventListener("DOMContentLoaded",C,!1),window.addEventListener("load",C,!1)
}else{if(window.attachEvent){AD.attachEvent("onreadystatechange",function(){AD.readyState==="complete"&&C()
});
var N=1;
try{N=window.frameElement
}catch(L){}!N&&AC.doScroll&&function(){try{AC.doScroll("left"),C()
}catch(A){setTimeout(arguments.callee,1);
return 
}}(),window.attachEvent("onload",C)
}}!AD.readyState&&AD.addEventListener&&(AD.readyState="loading",AD.addEventListener("DOMContentLoaded",handler=function(){AD.removeEventListener("DOMContentLoaded",handler,!1),AD.readyState="complete"
},!1)),setTimeout(function(){AB=!0,J(Y,function(A){A()
})
},300)
})(document);
var dust={};
function getGlobal(){return(function(){return this.dust
}).call(null)
}(function(dust){dust.cache={};
dust.register=function(name,tmpl){if(!name){return 
}dust.cache[name]=tmpl
};
dust.render=function(name,context,callback){var chunk=new Stub(callback).head;
dust.load(name,chunk,Context.wrap(context)).end()
};
dust.stream=function(name,context){var stream=new Stream();
dust.nextTick(function(){dust.load(name,stream.head,Context.wrap(context)).end()
});
return stream
};
dust.renderSource=function(source,context,callback){return dust.compileFn(source)(context,callback)
};
dust.compileFn=function(source,name){var tmpl=dust.loadSource(dust.compile(source,name));
return function(context,callback){var master=callback?new Stub(callback):new Stream();
dust.nextTick(function(){tmpl(master.head,Context.wrap(context)).end()
});
return master
}
};
dust.load=function(name,chunk,context){var tmpl=dust.cache[name];
if(tmpl){return tmpl(chunk,context)
}else{if(dust.onLoad){return chunk.map(function(chunk){dust.onLoad(name,function(err,src){if(err){return chunk.setError(err)
}if(!dust.cache[name]){dust.loadSource(dust.compile(src,name))
}dust.cache[name](chunk,context).end()
})
})
}return chunk.setError(new Error("Template Not Found: "+name))
}};
dust.loadSource=function(source,path){return eval(source)
};
if(Array.isArray){dust.isArray=Array.isArray
}else{dust.isArray=function(arr){return Object.prototype.toString.call(arr)=="[object Array]"
}
}dust.nextTick=(function(){if(typeof process!=="undefined"){return process.nextTick
}else{return function(callback){setTimeout(callback,0)
}
}})();
dust.isEmpty=function(value){if(dust.isArray(value)&&!value.length){return true
}if(value===0){return false
}return(!value)
};
dust.filter=function(string,auto,filters){if(filters){for(var i=0,len=filters.length;
i<len;
i++){var name=filters[i];
if(name==="s"){auto=null
}else{if(typeof dust.filters[name]==="function"){string=dust.filters[name](string)
}}}}if(auto){string=dust.filters[auto](string)
}return string
};
dust.filters={h:function(value){return dust.escapeHtml(value)
},j:function(value){return dust.escapeJs(value)
},u:encodeURI,uc:encodeURIComponent,js:function(value){if(!JSON){return value
}return JSON.stringify(value)
},jp:function(value){if(!JSON){return value
}return JSON.parse(value)
}};
function Context(stack,global,blocks){this.stack=stack;
this.global=global;
this.blocks=blocks
}dust.makeBase=function(global){return new Context(new Stack(),global)
};
Context.wrap=function(context){if(context instanceof Context){return context
}return new Context(new Stack(context))
};
Context.prototype.get=function(key){var ctx=this.stack,value;
while(ctx){if(ctx.isObject){value=ctx.head[key];
if(!(value===undefined)){return value
}}ctx=ctx.tail
}return this.global?this.global[key]:undefined
};
Context.prototype.getPath=function(cur,down){var ctx=this.stack,len=down.length;
if(cur&&len===0){return ctx.head
}ctx=ctx.head;
var i=0;
while(ctx&&i<len){ctx=ctx[down[i]];
i++
}return ctx
};
Context.prototype.push=function(head,idx,len){return new Context(new Stack(head,this.stack,idx,len),this.global,this.blocks)
};
Context.prototype.rebase=function(head){return new Context(new Stack(head),this.global,this.blocks)
};
Context.prototype.current=function(){return this.stack.head
};
Context.prototype.getBlock=function(key,chk,ctx){if(typeof key==="function"){key=key(chk,ctx).data;
chk.data=""
}var blocks=this.blocks;
if(!blocks){return 
}var len=blocks.length,fn;
while(len--){fn=blocks[len][key];
if(fn){return fn
}}};
Context.prototype.shiftBlocks=function(locals){var blocks=this.blocks,newBlocks;
if(locals){if(!blocks){newBlocks=[locals]
}else{newBlocks=blocks.concat([locals])
}return new Context(this.stack,this.global,newBlocks)
}return this
};
function Stack(head,tail,idx,len){this.tail=tail;
this.isObject=!dust.isArray(head)&&head&&typeof head==="object";
this.head=head;
this.index=idx;
this.of=len
}function Stub(callback){this.head=new Chunk(this);
this.callback=callback;
this.out=""
}Stub.prototype.flush=function(){var chunk=this.head;
while(chunk){if(chunk.flushable){this.out+=chunk.data
}else{if(chunk.error){this.callback(chunk.error);
this.flush=function(){};
return 
}else{return 
}}chunk=chunk.next;
this.head=chunk
}this.callback(null,this.out)
};
function Stream(){this.head=new Chunk(this)
}Stream.prototype.flush=function(){var chunk=this.head;
while(chunk){if(chunk.flushable){this.emit("data",chunk.data)
}else{if(chunk.error){this.emit("error",chunk.error);
this.flush=function(){};
return 
}else{return 
}}chunk=chunk.next;
this.head=chunk
}this.emit("end")
};
Stream.prototype.emit=function(type,data){if(!this.events){return false
}var handler=this.events[type];
if(!handler){return false
}if(typeof handler=="function"){handler(data)
}else{var listeners=handler.slice(0);
for(var i=0,l=listeners.length;
i<l;
i++){listeners[i](data)
}}};
Stream.prototype.on=function(type,callback){if(!this.events){this.events={}
}if(!this.events[type]){this.events[type]=callback
}else{if(typeof this.events[type]==="function"){this.events[type]=[this.events[type],callback]
}else{this.events[type].push(callback)
}}return this
};
Stream.prototype.pipe=function(stream){this.on("data",function(data){stream.write(data,"utf8")
}).on("end",function(){stream.end()
}).on("error",function(err){stream.error(err)
});
return this
};
function Chunk(root,next,taps){this.root=root;
this.next=next;
this.data="";
this.flushable=false;
this.taps=taps
}Chunk.prototype.write=function(data){var taps=this.taps;
if(taps){data=taps.go(data)
}this.data+=data;
return this
};
Chunk.prototype.end=function(data){if(data){this.write(data)
}this.flushable=true;
this.root.flush();
return this
};
Chunk.prototype.map=function(callback){var cursor=new Chunk(this.root,this.next,this.taps),branch=new Chunk(this.root,cursor,this.taps);
this.next=branch;
this.flushable=true;
callback(branch);
return cursor
};
Chunk.prototype.tap=function(tap){var taps=this.taps;
if(taps){this.taps=taps.push(tap)
}else{this.taps=new Tap(tap)
}return this
};
Chunk.prototype.untap=function(){this.taps=this.taps.tail;
return this
};
Chunk.prototype.render=function(body,context){return body(this,context)
};
Chunk.prototype.reference=function(elem,context,auto,filters){if(typeof elem==="function"){elem.isFunction=true;
elem=elem.apply(context.current(),[this,context,null,{auto:auto,filters:filters}]);
if(elem instanceof Chunk){return elem
}}if(!dust.isEmpty(elem)){return this.write(dust.filter(elem,auto,filters))
}else{return this
}};
Chunk.prototype.section=function(elem,context,bodies,params){if(typeof elem==="function"){elem=elem.apply(context.current(),[this,context,bodies,params]);
if(elem instanceof Chunk){return elem
}}var body=bodies.block,skip=bodies["else"];
if(params){context=context.push(params)
}if(dust.isArray(elem)){if(body){var len=elem.length,chunk=this;
if(len>0){if(context.stack.head){context.stack.head["$len"]=len
}for(var i=0;
i<len;
i++){if(context.stack.head){context.stack.head["$idx"]=i
}chunk=body(chunk,context.push(elem[i],i,len))
}if(context.stack.head){context.stack.head["$idx"]=undefined;
context.stack.head["$len"]=undefined
}return chunk
}else{if(skip){return skip(this,context)
}}}}else{if(elem===true){if(body){return body(this,context)
}}else{if(elem||elem===0){if(body){return body(this,context.push(elem))
}}else{if(skip){return skip(this,context)
}}}}return this
};
Chunk.prototype.exists=function(elem,context,bodies){var body=bodies.block,skip=bodies["else"];
if(!dust.isEmpty(elem)){if(body){return body(this,context)
}}else{if(skip){return skip(this,context)
}}return this
};
Chunk.prototype.notexists=function(elem,context,bodies){var body=bodies.block,skip=bodies["else"];
if(dust.isEmpty(elem)){if(body){return body(this,context)
}}else{if(skip){return skip(this,context)
}}return this
};
Chunk.prototype.block=function(elem,context,bodies){var body=bodies.block;
if(elem){body=elem
}if(body){return body(this,context)
}return this
};
Chunk.prototype.partial=function(elem,context,params){var partialContext;
if(params){partialContext=dust.makeBase(context.global);
partialContext.blocks=context.blocks;
if(context.stack&&context.stack.tail){partialContext.stack=context.stack.tail
}partialContext=partialContext.push(params);
partialContext=partialContext.push(context.stack.head)
}else{partialContext=context
}if(typeof elem==="function"){return this.capture(elem,partialContext,function(name,chunk){dust.load(name,chunk,partialContext).end()
})
}return dust.load(elem,this,partialContext)
};
Chunk.prototype.helper=function(name,context,bodies,params){if(dust.helpers[name]){return dust.helpers[name](this,context,bodies,params)
}};
Chunk.prototype.capture=function(body,context,callback){return this.map(function(chunk){var stub=new Stub(function(err,out){if(err){chunk.setError(err)
}else{callback(out,chunk)
}});
body(stub.head,context).end()
})
};
Chunk.prototype.setError=function(err){this.error=err;
this.root.flush();
return this
};
function Tap(head,tail){this.head=head;
this.tail=tail
}Tap.prototype.push=function(tap){return new Tap(tap,this)
};
Tap.prototype.go=function(value){var tap=this;
while(tap){value=tap.head(value);
tap=tap.tail
}return value
};
var HCHARS=new RegExp(/[&<>\"\']/),AMP=/&/g,LT=/</g,GT=/>/g,QUOT=/\"/g,SQUOT=/\'/g;
dust.escapeHtml=function(s){if(typeof s==="string"){if(!HCHARS.test(s)){return s
}return s.replace(AMP,"&amp;").replace(LT,"&lt;").replace(GT,"&gt;").replace(QUOT,"&quot;").replace(SQUOT,"&#39;")
}return s
};
var BS=/\\/g,CR=/\r/g,LS=/\u2028/g,PS=/\u2029/g,NL=/\n/g,LF=/\f/g,SQ=/'/g,DQ=/"/g,TB=/\t/g;
dust.escapeJs=function(s){if(typeof s==="string"){return s.replace(BS,"\\\\").replace(DQ,'\\"').replace(SQ,"\\'").replace(CR,"\\r").replace(LS,"\\u2028").replace(PS,"\\u2029").replace(NL,"\\n").replace(LF,"\\f").replace(TB,"\\t")
}return s
}
})(dust);
if(typeof exports!=="undefined"){if(typeof process!=="undefined"){require("./server")(dust)
}module.exports=dust
}jQuery.cookie=function(B,I,L){if(typeof I!="undefined"){L=L||{};
if(I===null){I="";
L.expires=-1
}var E="";
if(L.expires&&(typeof L.expires=="number"||L.expires.toUTCString)){var F;
if(typeof L.expires=="number"){F=new Date();
F.setTime(F.getTime()+(L.expires*24*60*60*1000))
}else{F=L.expires
}E="; expires="+F.toUTCString()
}var K=L.path?"; path="+(L.path):"";
var G=L.domain?"; domain="+(L.domain):"";
var A=L.secure?"; secure":"";
document.cookie=[B,"=",encodeURIComponent(I),E,K,G,A].join("")
}else{var D=null;
if(document.cookie&&document.cookie!=""){var J=document.cookie.split(";");
for(var H=0;
H<J.length;
H++){var C=jQuery.trim(J[H]);
if(C.substring(0,B.length+1)==(B+"=")){D=decodeURIComponent(C.substring(B.length+1));
break
}}}return D
}};
var dailybeast=dailybeast||{};
dailybeast.logger=dailybeast.logger||function(){var A={};
A.INFO=10;
A.PERF=15;
A.startTime=new Date().getTime();
A.WARN=20;
A.ERROR=30;
A.NONE=40;
A.console={log:function(){try{if(window.console&&window.console.log&&A.level<=A.INFO){if(typeof window.console.log=="function"){window.console.log.apply(window.console,arguments)
}else{if(arguments){window.console.log([].slice.call(arguments,0).join())
}}}}catch(C){}},perf:function(C){try{if(window.console&&window.console.log&&A.level<=A.PERF){window.console.log(C+":"+(new Date().getTime()-A.startTime)+"ms")
}}catch(D){}},warn:function(){try{if(window.console&&window.console.warn&&A.level<=A.WARN){if(typeof window.console.warn=="function"){window.console.warn.apply(window.console,arguments)
}else{if(arguments){window.console.warn([].slice.call(arguments,0).join())
}}}}catch(C){}},error:function(){try{if(A.level<=A.ERROR){var C=[].slice.call(arguments,0).join();
if(window.console&&window.console.error){if(typeof window.console.error=="function"){window.console.error.apply(window.console,arguments)
}else{if(arguments){window.console.error(C)
}}}sendDebugReport(C,"ERROR")
}}catch(D){console.error("Could not send debug",D)
}}};
var B=$.tdburl.hash.loglevel?$.tdburl.hash.loglevel:$.cookie("loglevel");
if($.tdburl.hash.loglevel){$.cookie("loglevel",null);
$.cookie("loglevel",B,{path:"/"})
}switch(B){case"info":A.level=A.INFO;
break;
case"warn":A.level=A.WARN;
break;
case"error":A.level=A.ERROR;
break;
default:A.level=A.ERROR
}return A
}();
(function(){var A=jQuery;
var B=dailybeast.logger.console;
A.log=B.log;
A.perf=B.perf;
A.warn=B.warn;
A.error=B.error
})();
var dailybeast=dailybeast||{};
dailybeast.cookie=dailybeast.cookie||{};
dailybeast.cookie.UserCookies=dailybeast.cookie.UserCookies||{};
UserCookies=dailybeast.cookie.UserCookies;
UserCookies.userTypes={};
UserCookies.userTypes["www.realclearpolitics.com"]="rcp";
UserCookies.userTypes["realclearpolitics.com"]="rcp";
UserCookies.userTypes["www.reddit.com"]="rdt";
UserCookies.userTypes["www.huffingtonpost.com"]="hfp";
UserCookies.userTypes["www.drudgereport.com"]="drr";
UserCookies.userTypes["drudgereport.com"]="drr";
UserCookies.userTypes["www.ew.com"]="etw";
UserCookies.userTypes["popwatch.ew.com"]="etw";
UserCookies.userTypes["www.fark.com"]="frk";
UserCookies.userTypes["m.fark.com"]="frk";
UserCookies.userTypes["digg.com"]="dig";
UserCookies.userTypes["gofugyourself.com"]="gfy";
UserCookies.userTypes["www.askmen.com"]="akm";
UserCookies.userTypes["www.stylelist.com"]="stl";
UserCookies.userTypes["politicalwire.com"]="plw";
UserCookies.userTypes["gawker.com"]="gkr";
UserCookies.userTypes["jezebel.com"]="jzl";
UserCookies.userTypes["www.facebook.com"]="fbk";
UserCookies.defaultUserType="gnr";
UserCookies.userIdCookieName="uid";
UserCookies.userTypeCookieName="utp";
UserCookies.visitedUrlsCookieName="vul";
UserCookies.visitedUrlsMaxLength=400;
UserCookies.getUserId=function(){userId=$.cookie(UserCookies.userIdCookieName);
return userId
};
UserCookies.updateUserId=function(){userId=$.cookie(UserCookies.userIdCookieName);
if(userId==null){userId=UUID.genV1().hexString
}$.cookie(UserCookies.userIdCookieName,userId,{path:"/",expires:365});
return userId
};
UserCookies.getUserIdForOmniture=function(){userId=UserCookies.updateUserId();
if(userId==null){userId=""
}return userId
};
UserCookies.getUserType=function(){userType=$.cookie(UserCookies.userTypeCookieName);
if(userType==null){userType=UserCookies.defaultUserType
}return userType
};
UserCookies.updateUserType=function(){userType=$.cookie(UserCookies.userTypeCookieName);
if(userType==null){referrer=document.referrer;
if(referrer!=null&&referrer.length>0){referrer=referrer.toLowerCase();
referrerHostname=referrer.split("/")[2].split(":")[0];
userType=UserCookies.userTypes[referrerHostname]
}}if(userType!=null){$.cookie(UserCookies.userTypeCookieName,userType,{path:"/",expires:365})
}return userType
};
UserCookies.getUserTypeForOmniture=function(){userType=UserCookies.updateUserType();
if(userType==null){userType=""
}return userType
};
UserCookies.getVisitedUrls=function(){visitedUrls=$.cookie(UserCookies.visitedUrlsCookieName);
return visitedUrls
};
UserCookies.addVisitedUrl=function(A){A=A.replace(".html","");
urlHashCode=md5(A);
visitedUrls=$.cookie(UserCookies.visitedUrlsCookieName);
if(visitedUrls==null){visitedUrls=urlHashCode
}else{if(visitedUrls.indexOf(urlHashCode)<0){visitedUrls+=","+urlHashCode;
while(visitedUrls.length>UserCookies.visitedUrlsMaxLength){commaIndex=visitedUrls.indexOf(",");
if(commaIndex>=0){visitedUrls=visitedUrls.substring(commaIndex+1)
}}}}$.cookie(UserCookies.visitedUrlsCookieName,visitedUrls,{path:"/",expires:365})
};
UserCookies.updateVisitedUrls=function(){UserCookies.addVisitedUrl(location.pathname)
};
$(function(){UserCookies.updateUserId();
UserCookies.updateUserType();
UserCookies.updateVisitedUrls()
});
if($.browser.msie&&$.browser.version=="7.0"){window.onload=function(){function G(K,I){var J=K.innerHTML;
K.innerHTML="<span style=\"font-family: 'nwdb-icon-font'\">"+I+"</span>"+J
}var E={"icon-view-all":"&#xe000;","icon-twitter":"&#xe001;","icon-search":"&#xe002;","icon-replay":"&#xe003;","icon-print":"&#xe004;","icon-plus-circle":"&#xe005;","icon-plus-circle-filled":"&#xe006;","icon-minus-circle":"&#xe007;","icon-minus-circle-filled":"&#xe008;","icon-google-plus":"&#xe009;","icon-facebook":"&#xe00a;","icon-exit-fullscreen":"&#xe00b;","icon-enter-fullscreen":"&#xe00c;","icon-email":"&#xe00d;","icon-email-square":"&#xe00e;","icon-comments":"&#xe00f;","icon-comments-square":"&#xe010;","icon-close-x":"&#xe011;","icon-close-x-circle":"&#xe012;","icon-close-x-circle-filled":"&#xe013;","icon-caret-up":"&#xe014;","icon-caret-right":"&#xe015;","icon-caret-left":"&#xe016;","icon-caret-down":"&#xe017;","icon-captions":"&#xe018;"},D=document.getElementsByTagName("*"),C,A,B,H,F;
for(C=0;
C<D.length;
C+=1){F=D[C];
A=F.getAttribute("data-icon");
if(A){G(F,A)
}H=F.className;
H=H.match(/icon-[^\s'"]+/);
if(H){G(F,E[H[0]])
}}}
}var dailybeast=dailybeast||{};
dailybeast.jsonSanitizer=function(){function A(D){try{var F=B(D);
return JSON.stringify(F)
}catch(E){return JSON.stringify(E)
}}function C(D){return B(D)
}var B=(function(){var G,E,D={'"':'"',"'":"'","\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"},P,N=function(Q){throw {name:"SyntaxError",message:Q,at:G,text:P}
},J=function(Q){if(Q&&Q!==E){N("Expected '"+Q+"' instead of '"+E+"'")
}E=P.charAt(G);
G+=1;
return E
},I=function(){var R,Q="";
if(E==="-"){Q="-";
J("-")
}while(E>="0"&&E<="9"){Q+=E;
J()
}if(E==="."){Q+=".";
while(J()&&E>="0"&&E<="9"){Q+=E
}}if(E==="e"||E==="E"){Q+=E;
J();
if(E==="-"||E==="+"){Q+=E;
J()
}while(E>="0"&&E<="9"){Q+=E;
J()
}}R=+Q;
if(!isFinite(R)){N("Bad number")
}else{return R
}},K=function(){var U=false,T,S,R="",Q;
if(E==="'"){U=true
}if((E==='"'&&!U)||(E==="'"&&U)){while(J()){if((E==='"'&&!U)||(E==="'"&&U)){J();
return R
}if(E==="\\"){J();
if(E==="u"){Q=0;
for(S=0;
S<4;
S+=1){T=parseInt(J(),16);
if(!isFinite(T)){break
}Q=Q*16+T
}R+=String.fromCharCode(Q)
}else{if(typeof D[E]==="string"){R+=D[E]
}else{break
}}}else{R+=E
}}}N("Bad string")
},M=function(){while(E&&E<=" "){J()
}},F=function(){switch(E){case"t":J("t");
J("r");
J("u");
J("e");
return true;
case"f":J("f");
J("a");
J("l");
J("s");
J("e");
return false;
case"n":J("n");
J("u");
J("l");
J("l");
return null
}N("Unexpected '"+E+"'")
},O,L=function(){var Q=[];
if(E==="["){J("[");
M();
if(E==="]"){J("]");
return Q
}while(E){Q.push(O());
M();
if(E==="]"){J("]");
return Q
}J(",");
M()
}}N("Bad array")
},H=function(){var R,Q={};
if(E==="{"){J("{");
M();
if(E==="}"){J("}");
return Q
}while(E){R=K();
M();
J(":");
if(Object.hasOwnProperty.call(Q,R)){N('Duplicate key "'+R+'"')
}Q[R]=O();
M();
if(E==="}"){J("}");
return Q
}J(",");
M()
}}N("Bad object")
};
O=function(){M();
switch(E){case"{":return H();
case"[":return L();
case'"':case"'":return K();
case"-":return I();
default:return E>="0"&&E<="9"?I():F()
}};
return function(T,R){var Q;
P=T;
G=0;
E=" ";
Q=O();
M();
if(E){N("Syntax error")
}return typeof R==="function"?(function S(X,W){var V,U,Y=X[W];
if(Y&&typeof Y==="object"){for(V in Y){if(Object.prototype.hasOwnProperty.call(Y,V)){U=S(Y,V);
if(U!==undefined){Y[V]=U
}else{delete Y[V]
}}}}return R.call(X,W,Y)
}({"":Q},"")):Q
}
}());
return{parse:C,sanitize:A}
}();