/*
 * jQuery JavaScript Library v1.4.4
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
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */
(function(window,undefined){var document=window.document;
var jQuery=(function(){var jQuery=function(selector,context){return new jQuery.fn.init(selector,context)
},_jQuery=window.jQuery,_$=window.$,rootjQuery,quickExpr=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,isSimple=/^.[^:#\[\.,]*$/,rnotwhite=/\S/,rwhite=/\s/,trimLeft=/^\s+/,trimRight=/\s+$/,rnonword=/\W/,rdigit=/\d/,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,rvalidchars=/^[\],:{}\s]*$/,rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,rwebkit=/(webkit)[ \/]([\w.]+)/,ropera=/(opera)(?:.*version)?[ \/]([\w.]+)/,rmsie=/(msie) ([\w.]+)/,rmozilla=/(mozilla)(?:.*? rv:([\w.]+))?/,userAgent=navigator.userAgent,browserMatch,readyBound=false,readyList=[],DOMContentLoaded,toString=Object.prototype.toString,hasOwn=Object.prototype.hasOwnProperty,push=Array.prototype.push,slice=Array.prototype.slice,trim=String.prototype.trim,indexOf=Array.prototype.indexOf,class2type={};
jQuery.fn=jQuery.prototype={init:function(selector,context){var match,elem,ret,doc;
if(!selector){return this
}if(selector.nodeType){this.context=this[0]=selector;
this.length=1;
return this
}if(selector==="body"&&!context&&document.body){this.context=document;
this[0]=document.body;
this.selector="body";
this.length=1;
return this
}if(typeof selector==="string"){match=quickExpr.exec(selector);
if(match&&(match[1]||!context)){if(match[1]){doc=(context?context.ownerDocument||context:document);
ret=rsingleTag.exec(selector);
if(ret){if(jQuery.isPlainObject(context)){selector=[document.createElement(ret[1])];
jQuery.fn.attr.call(selector,context,true)
}else{selector=[doc.createElement(ret[1])]
}}else{ret=jQuery.buildFragment([match[1]],[doc]);
selector=(ret.cacheable?ret.fragment.cloneNode(true):ret.fragment).childNodes
}return jQuery.merge(this,selector)
}else{elem=document.getElementById(match[2]);
if(elem&&elem.parentNode){if(elem.id!==match[2]){return rootjQuery.find(selector)
}this.length=1;
this[0]=elem
}this.context=document;
this.selector=selector;
return this
}}else{if(!context&&!rnonword.test(selector)){this.selector=selector;
this.context=document;
selector=document.getElementsByTagName(selector);
return jQuery.merge(this,selector)
}else{if(!context||context.jquery){return(context||rootjQuery).find(selector)
}else{return jQuery(context).find(selector)
}}}}else{if(jQuery.isFunction(selector)){return rootjQuery.ready(selector)
}}if(selector.selector!==undefined){this.selector=selector.selector;
this.context=selector.context
}return jQuery.makeArray(selector,this)
},selector:"",jquery:"1.4.4",length:0,size:function(){return this.length
},toArray:function(){return slice.call(this,0)
},get:function(num){return num==null?this.toArray():(num<0?this.slice(num)[0]:this[num])
},pushStack:function(elems,name,selector){var ret=jQuery();
if(jQuery.isArray(elems)){push.apply(ret,elems)
}else{jQuery.merge(ret,elems)
}ret.prevObject=this;
ret.context=this.context;
if(name==="find"){ret.selector=this.selector+(this.selector?" ":"")+selector
}else{if(name){ret.selector=this.selector+"."+name+"("+selector+")"
}}return ret
},each:function(callback,args){return jQuery.each(this,callback,args)
},ready:function(fn){jQuery.bindReady();
if(jQuery.isReady){fn.call(document,jQuery)
}else{if(readyList){readyList.push(fn)
}}return this
},eq:function(i){return i===-1?this.slice(i):this.slice(i,+i+1)
},first:function(){return this.eq(0)
},last:function(){return this.eq(-1)
},slice:function(){return this.pushStack(slice.apply(this,arguments),"slice",slice.call(arguments).join(","))
},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)
}))
},end:function(){return this.prevObject||jQuery(null)
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
jQuery.extend({noConflict:function(deep){window.$=_$;
if(deep){window.jQuery=_jQuery
}return jQuery
},isReady:false,readyWait:1,ready:function(wait){if(wait===true){jQuery.readyWait--
}if(!jQuery.readyWait||(wait!==true&&!jQuery.isReady)){if(!document.body){return setTimeout(jQuery.ready,1)
}jQuery.isReady=true;
if(wait!==true&&--jQuery.readyWait>0){return 
}if(readyList){var fn,i=0,ready=readyList;
readyList=null;
while((fn=ready[i++])){fn.call(document,jQuery)
}if(jQuery.fn.trigger){jQuery(document).trigger("ready").unbind("ready")
}}}},bindReady:function(){if(readyBound){return 
}readyBound=true;
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
},isWindow:function(obj){return obj&&typeof obj==="object"&&"setInterval" in obj
},isNaN:function(obj){return obj==null||!rdigit.test(obj)||isNaN(obj)
},type:function(obj){return obj==null?String(obj):class2type[toString.call(obj)]||"object"
},isPlainObject:function(obj){if(!obj||jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false
}if(obj.constructor&&!hasOwn.call(obj,"constructor")&&!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false
}var key;
for(key in obj){}return key===undefined||hasOwn.call(obj,key)
},isEmptyObject:function(obj){for(var name in obj){return false
}return true
},error:function(msg){throw msg
},parseJSON:function(data){if(typeof data!=="string"||!data){return null
}data=jQuery.trim(data);
if(rvalidchars.test(data.replace(rvalidescape,"@").replace(rvalidtokens,"]").replace(rvalidbraces,""))){return window.JSON&&window.JSON.parse?window.JSON.parse(data):(new Function("return "+data))()
}else{jQuery.error("Invalid JSON: "+data)
}},noop:function(){},globalEval:function(data){if(data&&rnotwhite.test(data)){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");
script.type="text/javascript";
if(jQuery.support.scriptEval){script.appendChild(document.createTextNode(data))
}else{script.text=data
}head.insertBefore(script,head.firstChild);
head.removeChild(script)
}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()===name.toUpperCase()
},each:function(object,callback,args){var name,i=0,length=object.length,isObj=length===undefined||jQuery.isFunction(object);
if(args){if(isObj){for(name in object){if(callback.apply(object[name],args)===false){break
}}}else{for(;
i<length;
){if(callback.apply(object[i++],args)===false){break
}}}}else{if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break
}}}else{for(var value=object[0];
i<length&&callback.call(value,i,value)!==false;
value=object[++i]){}}}return object
},trim:trim?function(text){return text==null?"":trim.call(text)
}:function(text){return text==null?"":text.toString().replace(trimLeft,"").replace(trimRight,"")
},makeArray:function(array,results){var ret=results||[];
if(array!=null){var type=jQuery.type(array);
if(array.length==null||type==="string"||type==="function"||type==="regexp"||jQuery.isWindow(array)){push.call(ret,array)
}else{jQuery.merge(ret,array)
}}return ret
},inArray:function(elem,array){if(array.indexOf){return array.indexOf(elem)
}for(var i=0,length=array.length;
i<length;
i++){if(array[i]===elem){return i
}}return -1
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
},map:function(elems,callback,arg){var ret=[],value;
for(var i=0,length=elems.length;
i<length;
i++){value=callback(elems[i],i,arg);
if(value!=null){ret[ret.length]=value
}}return ret.concat.apply([],ret)
},guid:1,proxy:function(fn,proxy,thisObject){if(arguments.length===2){if(typeof proxy==="string"){thisObject=fn;
fn=thisObject[proxy];
proxy=undefined
}else{if(proxy&&!jQuery.isFunction(proxy)){thisObject=proxy;
proxy=undefined
}}}if(!proxy&&fn){proxy=function(){return fn.apply(thisObject||this,arguments)
}
}if(fn){proxy.guid=fn.guid=fn.guid||proxy.guid||jQuery.guid++
}return proxy
},access:function(elems,key,value,exec,fn,pass){var length=elems.length;
if(typeof key==="object"){for(var k in key){jQuery.access(elems,k,key[k],exec,fn,value)
}return elems
}if(value!==undefined){exec=!pass&&exec&&jQuery.isFunction(value);
for(var i=0;
i<length;
i++){fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass)
}return elems
}return length?fn(elems[0],key):undefined
},now:function(){return(new Date()).getTime()
},uaMatch:function(ua){ua=ua.toLowerCase();
var match=rwebkit.exec(ua)||ropera.exec(ua)||rmsie.exec(ua)||ua.indexOf("compatible")<0&&rmozilla.exec(ua)||[];
return{browser:match[1]||"",version:match[2]||"0"}
},browser:{}});
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase()
});
browserMatch=jQuery.uaMatch(userAgent);
if(browserMatch.browser){jQuery.browser[browserMatch.browser]=true;
jQuery.browser.version=browserMatch.version
}if(jQuery.browser.webkit){jQuery.browser.safari=true
}if(indexOf){jQuery.inArray=function(elem,array){return indexOf.call(array,elem)
}
}if(!rwhite.test("\xA0")){trimLeft=/^[\s\xA0]+/;
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
}return(window.jQuery=window.$=jQuery)
})();
(function(){jQuery.support={};
var root=document.documentElement,script=document.createElement("script"),div=document.createElement("div"),id="script"+jQuery.now();
div.style.display="none";
div.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var all=div.getElementsByTagName("*"),a=div.getElementsByTagName("a")[0],select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));
if(!all||!all.length||!a){return 
}jQuery.support={leadingWhitespace:div.firstChild.nodeType===3,tbody:!div.getElementsByTagName("tbody").length,htmlSerialize:!!div.getElementsByTagName("link").length,style:/red/.test(a.getAttribute("style")),hrefNormalized:a.getAttribute("href")==="/a",opacity:/^0.55$/.test(a.style.opacity),cssFloat:!!a.style.cssFloat,checkOn:div.getElementsByTagName("input")[0].value==="on",optSelected:opt.selected,deleteExpando:true,optDisabled:false,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableHiddenOffsets:true};
select.disabled=true;
jQuery.support.optDisabled=!opt.disabled;
script.type="text/javascript";
try{script.appendChild(document.createTextNode("window."+id+"=1;"))
}catch(e){}root.insertBefore(script,root.firstChild);
if(window[id]){jQuery.support.scriptEval=true;
delete window[id]
}try{delete script.test
}catch(e){jQuery.support.deleteExpando=false
}root.removeChild(script);
if(div.attachEvent&&div.fireEvent){div.attachEvent("onclick",function click(){jQuery.support.noCloneEvent=false;
div.detachEvent("onclick",click)
});
div.cloneNode(true).fireEvent("onclick")
}div=document.createElement("div");
div.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";
var fragment=document.createDocumentFragment();
fragment.appendChild(div.firstChild);
jQuery.support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;
jQuery(function(){var div=document.createElement("div");
div.style.width=div.style.paddingLeft="1px";
document.body.appendChild(div);
jQuery.boxModel=jQuery.support.boxModel=div.offsetWidth===2;
if("zoom" in div.style){div.style.display="inline";
div.style.zoom=1;
jQuery.support.inlineBlockNeedsLayout=div.offsetWidth===2;
div.style.display="";
div.innerHTML="<div style='width:4px;'></div>";
jQuery.support.shrinkWrapBlocks=div.offsetWidth!==2
}div.innerHTML="<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
var tds=div.getElementsByTagName("td");
jQuery.support.reliableHiddenOffsets=tds[0].offsetHeight===0;
tds[0].style.display="";
tds[1].style.display="none";
jQuery.support.reliableHiddenOffsets=jQuery.support.reliableHiddenOffsets&&tds[0].offsetHeight===0;
div.innerHTML="";
document.body.removeChild(div).style.display="none";
div=tds=null
});
var eventSupported=function(eventName){var el=document.createElement("div");
eventName="on"+eventName;
var isSupported=(eventName in el);
if(!isSupported){el.setAttribute(eventName,"return;");
isSupported=typeof el[eventName]==="function"
}el=null;
return isSupported
};
jQuery.support.submitBubbles=eventSupported("submit");
jQuery.support.changeBubbles=eventSupported("change");
root=script=div=all=a=null
})();
var windowData={},rbrace=/^(?:\{.*\}|\[.*\])$/;
jQuery.extend({cache:{},uuid:0,expando:"jQuery"+jQuery.now(),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:true},data:function(elem,name,data){if(!jQuery.acceptData(elem)){return 
}elem=elem==window?windowData:elem;
var isNode=elem.nodeType,id=isNode?elem[jQuery.expando]:null,cache=jQuery.cache,thisCache;
if(isNode&&!id&&typeof name==="string"&&data===undefined){return 
}if(!isNode){cache=elem
}else{if(!id){elem[jQuery.expando]=id=++jQuery.uuid
}}if(typeof name==="object"){if(isNode){cache[id]=jQuery.extend(cache[id],name)
}else{jQuery.extend(cache,name)
}}else{if(isNode&&!cache[id]){cache[id]={}
}}thisCache=isNode?cache[id]:cache;
if(data!==undefined){thisCache[name]=data
}return typeof name==="string"?thisCache[name]:thisCache
},removeData:function(elem,name){if(!jQuery.acceptData(elem)){return 
}elem=elem==window?windowData:elem;
var isNode=elem.nodeType,id=isNode?elem[jQuery.expando]:elem,cache=jQuery.cache,thisCache=isNode?cache[id]:id;
if(name){if(thisCache){delete thisCache[name];
if(isNode&&jQuery.isEmptyObject(thisCache)){jQuery.removeData(elem)
}}}else{if(isNode&&jQuery.support.deleteExpando){delete elem[jQuery.expando]
}else{if(elem.removeAttribute){elem.removeAttribute(jQuery.expando)
}else{if(isNode){delete cache[id]
}else{for(var n in elem){delete elem[n]
}}}}}},acceptData:function(elem){if(elem.nodeName){var match=jQuery.noData[elem.nodeName.toLowerCase()];
if(match){return !(match===true||elem.getAttribute("classid")!==match)
}}return true
}});
jQuery.fn.extend({data:function(key,value){var data=null;
if(typeof key==="undefined"){if(this.length){var attr=this[0].attributes,name;
data=jQuery.data(this[0]);
for(var i=0,l=attr.length;
i<l;
i++){name=attr[i].name;
if(name.indexOf("data-")===0){name=name.substr(5);
dataAttr(this[0],name,data[name])
}}}return data
}else{if(typeof key==="object"){return this.each(function(){jQuery.data(this,key)
})
}}var parts=key.split(".");
parts[1]=parts[1]?"."+parts[1]:"";
if(value===undefined){data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);
if(data===undefined&&this.length){data=jQuery.data(this[0],key);
data=dataAttr(this[0],key,data)
}return data===undefined&&parts[1]?this.data(parts[0]):data
}else{return this.each(function(){var $this=jQuery(this),args=[parts[0],value];
$this.triggerHandler("setData"+parts[1]+"!",args);
jQuery.data(this,key,value);
$this.triggerHandler("changeData"+parts[1]+"!",args)
})
}},removeData:function(key){return this.each(function(){jQuery.removeData(this,key)
})
}});
function dataAttr(elem,key,data){if(data===undefined&&elem.nodeType===1){data=elem.getAttribute("data-"+key);
if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null:!jQuery.isNaN(data)?parseFloat(data):rbrace.test(data)?jQuery.parseJSON(data):data
}catch(e){}jQuery.data(elem,key,data)
}else{data=undefined
}}return data
}jQuery.extend({queue:function(elem,type,data){if(!elem){return 
}type=(type||"fx")+"queue";
var q=jQuery.data(elem,type);
if(!data){return q||[]
}if(!q||jQuery.isArray(data)){q=jQuery.data(elem,type,jQuery.makeArray(data))
}else{q.push(data)
}return q
},dequeue:function(elem,type){type=type||"fx";
var queue=jQuery.queue(elem,type),fn=queue.shift();
if(fn==="inprogress"){fn=queue.shift()
}if(fn){if(type==="fx"){queue.unshift("inprogress")
}fn.call(elem,function(){jQuery.dequeue(elem,type)
})
}}});
jQuery.fn.extend({queue:function(type,data){if(typeof type!=="string"){data=type;
type="fx"
}if(data===undefined){return jQuery.queue(this[0],type)
}return this.each(function(i){var queue=jQuery.queue(this,type,data);
if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type)
}})
},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type)
})
},delay:function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;
type=type||"fx";
return this.queue(type,function(){var elem=this;
setTimeout(function(){jQuery.dequeue(elem,type)
},time)
})
},clearQueue:function(type){return this.queue(type||"fx",[])
}});
var rclass=/[\n\t]/g,rspaces=/\s+/,rreturn=/\r/g,rspecialurl=/^(?:href|src|style)$/,rtype=/^(?:button|input)$/i,rfocusable=/^(?:button|input|object|select|textarea)$/i,rclickable=/^a(?:rea)?$/i,rradiocheck=/^(?:radio|checkbox)$/i;
jQuery.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};
jQuery.fn.extend({attr:function(name,value){return jQuery.access(this,name,value,true,jQuery.attr)
},removeAttr:function(name,fn){return this.each(function(){jQuery.attr(this,name,"");
if(this.nodeType===1){this.removeAttribute(name)
}})
},addClass:function(value){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);
self.addClass(value.call(this,i,self.attr("class")))
})
}if(value&&typeof value==="string"){var classNames=(value||"").split(rspaces);
for(var i=0,l=this.length;
i<l;
i++){var elem=this[i];
if(elem.nodeType===1){if(!elem.className){elem.className=value
}else{var className=" "+elem.className+" ",setClass=elem.className;
for(var c=0,cl=classNames.length;
c<cl;
c++){if(className.indexOf(" "+classNames[c]+" ")<0){setClass+=" "+classNames[c]
}}elem.className=jQuery.trim(setClass)
}}}}return this
},removeClass:function(value){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);
self.removeClass(value.call(this,i,self.attr("class")))
})
}if((value&&typeof value==="string")||value===undefined){var classNames=(value||"").split(rspaces);
for(var i=0,l=this.length;
i<l;
i++){var elem=this[i];
if(elem.nodeType===1&&elem.className){if(value){var className=(" "+elem.className+" ").replace(rclass," ");
for(var c=0,cl=classNames.length;
c<cl;
c++){className=className.replace(" "+classNames[c]+" "," ")
}elem.className=jQuery.trim(className)
}else{elem.className=""
}}}}return this
},toggleClass:function(value,stateVal){var type=typeof value,isBool=typeof stateVal==="boolean";
if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);
self.toggleClass(value.call(this,i,self.attr("class"),stateVal),stateVal)
})
}return this.each(function(){if(type==="string"){var className,i=0,self=jQuery(this),state=stateVal,classNames=value.split(rspaces);
while((className=classNames[i++])){state=isBool?state:!self.hasClass(className);
self[state?"addClass":"removeClass"](className)
}}else{if(type==="undefined"||type==="boolean"){if(this.className){jQuery.data(this,"__className__",this.className)
}this.className=this.className||value===false?"":jQuery.data(this,"__className__")||""
}}})
},hasClass:function(selector){var className=" "+selector+" ";
for(var i=0,l=this.length;
i<l;
i++){if((" "+this[i].className+" ").replace(rclass," ").indexOf(className)>-1){return true
}}return false
},val:function(value){if(!arguments.length){var elem=this[0];
if(elem){if(jQuery.nodeName(elem,"option")){var val=elem.attributes.value;
return !val||val.specified?elem.value:elem.text
}if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type==="select-one";
if(index<0){return null
}for(var i=one?index:0,max=one?index+1:options.length;
i<max;
i++){var option=options[i];
if(option.selected&&(jQuery.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){value=jQuery(option).val();
if(one){return value
}values.push(value)
}}return values
}if(rradiocheck.test(elem.type)&&!jQuery.support.checkOn){return elem.getAttribute("value")===null?"on":elem.value
}return(elem.value||"").replace(rreturn,"")
}return undefined
}var isFunction=jQuery.isFunction(value);
return this.each(function(i){var self=jQuery(this),val=value;
if(this.nodeType!==1){return 
}if(isFunction){val=value.call(this,i,self.val())
}if(val==null){val=""
}else{if(typeof val==="number"){val+=""
}else{if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+""
})
}}}if(jQuery.isArray(val)&&rradiocheck.test(this.type)){this.checked=jQuery.inArray(self.val(),val)>=0
}else{if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(val);
jQuery("option",this).each(function(){this.selected=jQuery.inArray(jQuery(this).val(),values)>=0
});
if(!values.length){this.selectedIndex=-1
}}else{this.value=val
}}})
}});
jQuery.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(elem,name,value,pass){if(!elem||elem.nodeType===3||elem.nodeType===8){return undefined
}if(pass&&name in jQuery.attrFn){return jQuery(elem)[name](value)
}var notxml=elem.nodeType!==1||!jQuery.isXMLDoc(elem),set=value!==undefined;
name=notxml&&jQuery.props[name]||name;
var special=rspecialurl.test(name);
if(name==="selected"&&!jQuery.support.optSelected){var parent=elem.parentNode;
if(parent){parent.selectedIndex;
if(parent.parentNode){parent.parentNode.selectedIndex
}}}if((name in elem||elem[name]!==undefined)&&notxml&&!special){if(set){if(name==="type"&&rtype.test(elem.nodeName)&&elem.parentNode){jQuery.error("type property can't be changed")
}if(value===null){if(elem.nodeType===1){elem.removeAttribute(name)
}}else{elem[name]=value
}}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name)){return elem.getAttributeNode(name).nodeValue
}if(name==="tabIndex"){var attributeNode=elem.getAttributeNode("tabIndex");
return attributeNode&&attributeNode.specified?attributeNode.value:rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:undefined
}return elem[name]
}if(!jQuery.support.style&&notxml&&name==="style"){if(set){elem.style.cssText=""+value
}return elem.style.cssText
}if(set){elem.setAttribute(name,""+value)
}if(!elem.attributes[name]&&(elem.hasAttribute&&!elem.hasAttribute(name))){return undefined
}var attr=!jQuery.support.hrefNormalized&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);
return attr===null?undefined:attr
}});
var rnamespaces=/\.(.*)$/,rformElems=/^(?:textarea|input|select)$/i,rperiod=/\./g,rspace=/ /g,rescape=/[^\w\s.|`]/g,fcleanup=function(nm){return nm.replace(rescape,"\\$&")
},focusCounts={focusin:0,focusout:0};
jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType===3||elem.nodeType===8){return 
}if(jQuery.isWindow(elem)&&(elem!==window&&!elem.frameElement)){elem=window
}if(handler===false){handler=returnFalse
}else{if(!handler){return 
}}var handleObjIn,handleObj;
if(handler.handler){handleObjIn=handler;
handler=handleObjIn.handler
}if(!handler.guid){handler.guid=jQuery.guid++
}var elemData=jQuery.data(elem);
if(!elemData){return 
}var eventKey=elem.nodeType?"events":"__events__",events=elemData[eventKey],eventHandle=elemData.handle;
if(typeof events==="function"){eventHandle=events.handle;
events=events.events
}else{if(!events){if(!elem.nodeType){elemData[eventKey]=elemData=function(){}
}elemData.events=events={}
}}if(!eventHandle){elemData.handle=eventHandle=function(){return typeof jQuery!=="undefined"&&!jQuery.event.triggered?jQuery.event.handle.apply(eventHandle.elem,arguments):undefined
}
}eventHandle.elem=elem;
types=types.split(" ");
var type,i=0,namespaces;
while((type=types[i++])){handleObj=handleObjIn?jQuery.extend({},handleObjIn):{handler:handler,data:data};
if(type.indexOf(".")>-1){namespaces=type.split(".");
type=namespaces.shift();
handleObj.namespace=namespaces.slice(0).sort().join(".")
}else{namespaces=[];
handleObj.namespace=""
}handleObj.type=type;
if(!handleObj.guid){handleObj.guid=handler.guid
}var handlers=events[type],special=jQuery.event.special[type]||{};
if(!handlers){handlers=events[type]=[];
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false)
}else{if(elem.attachEvent){elem.attachEvent("on"+type,eventHandle)
}}}}if(special.add){special.add.call(elem,handleObj);
if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid
}}handlers.push(handleObj);
jQuery.event.global[type]=true
}elem=null
},global:{},remove:function(elem,types,handler,pos){if(elem.nodeType===3||elem.nodeType===8){return 
}if(handler===false){handler=returnFalse
}var ret,type,fn,j,i=0,all,namespaces,namespace,special,eventType,handleObj,origType,eventKey=elem.nodeType?"events":"__events__",elemData=jQuery.data(elem),events=elemData&&elemData[eventKey];
if(!elemData||!events){return 
}if(typeof events==="function"){elemData=events;
events=events.events
}if(types&&types.type){handler=types.handler;
types=types.type
}if(!types||typeof types==="string"&&types.charAt(0)==="."){types=types||"";
for(type in events){jQuery.event.remove(elem,type+types)
}return 
}types=types.split(" ");
while((type=types[i++])){origType=type;
handleObj=null;
all=type.indexOf(".")<0;
namespaces=[];
if(!all){namespaces=type.split(".");
type=namespaces.shift();
namespace=new RegExp("(^|\\.)"+jQuery.map(namespaces.slice(0).sort(),fcleanup).join("\\.(?:.*\\.)?")+"(\\.|$)")
}eventType=events[type];
if(!eventType){continue
}if(!handler){for(j=0;
j<eventType.length;
j++){handleObj=eventType[j];
if(all||namespace.test(handleObj.namespace)){jQuery.event.remove(elem,origType,handleObj.handler,j);
eventType.splice(j--,1)
}}continue
}special=jQuery.event.special[type]||{};
for(j=pos||0;
j<eventType.length;
j++){handleObj=eventType[j];
if(handler.guid===handleObj.guid){if(all||namespace.test(handleObj.namespace)){if(pos==null){eventType.splice(j--,1)
}if(special.remove){special.remove.call(elem,handleObj)
}}if(pos!=null){break
}}}if(eventType.length===0||pos!=null&&eventType.length===1){if(!special.teardown||special.teardown.call(elem,namespaces)===false){jQuery.removeEvent(elem,type,elemData.handle)
}ret=null;
delete events[type]
}}if(jQuery.isEmptyObject(events)){var handle=elemData.handle;
if(handle){handle.elem=null
}delete elemData.events;
delete elemData.handle;
if(typeof elemData==="function"){jQuery.removeData(elem,eventKey)
}else{if(jQuery.isEmptyObject(elemData)){jQuery.removeData(elem)
}}}},trigger:function(event,data,elem){var type=event.type||event,bubbling=arguments[3];
if(!bubbling){event=typeof event==="object"?event[jQuery.expando]?event:jQuery.extend(jQuery.Event(type),event):jQuery.Event(type);
if(type.indexOf("!")>=0){event.type=type=type.slice(0,-1);
event.exclusive=true
}if(!elem){event.stopPropagation();
if(jQuery.event.global[type]){jQuery.each(jQuery.cache,function(){if(this.events&&this.events[type]){jQuery.event.trigger(event,data,this.handle.elem)
}})
}}if(!elem||elem.nodeType===3||elem.nodeType===8){return undefined
}event.result=undefined;
event.target=elem;
data=jQuery.makeArray(data);
data.unshift(event)
}event.currentTarget=elem;
var handle=elem.nodeType?jQuery.data(elem,"handle"):(jQuery.data(elem,"__events__")||{}).handle;
if(handle){handle.apply(elem,data)
}var parent=elem.parentNode||elem.ownerDocument;
try{if(!(elem&&elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()])){if(elem["on"+type]&&elem["on"+type].apply(elem,data)===false){event.result=false;
event.preventDefault()
}}}catch(inlineError){}if(!event.isPropagationStopped()&&parent){jQuery.event.trigger(event,data,parent,true)
}else{if(!event.isDefaultPrevented()){var old,target=event.target,targetType=type.replace(rnamespaces,""),isClick=jQuery.nodeName(target,"a")&&targetType==="click",special=jQuery.event.special[targetType]||{};
if((!special._default||special._default.call(elem,event)===false)&&!isClick&&!(target&&target.nodeName&&jQuery.noData[target.nodeName.toLowerCase()])){try{if(target[targetType]){old=target["on"+targetType];
if(old){target["on"+targetType]=null
}jQuery.event.triggered=true;
target[targetType]()
}}catch(triggerError){}if(old){target["on"+targetType]=old
}jQuery.event.triggered=false
}}}},handle:function(event){var all,handlers,namespaces,namespace_re,events,namespace_sort=[],args=jQuery.makeArray(arguments);
event=args[0]=jQuery.event.fix(event||window.event);
event.currentTarget=this;
all=event.type.indexOf(".")<0&&!event.exclusive;
if(!all){namespaces=event.type.split(".");
event.type=namespaces.shift();
namespace_sort=namespaces.slice(0).sort();
namespace_re=new RegExp("(^|\\.)"+namespace_sort.join("\\.(?:.*\\.)?")+"(\\.|$)")
}event.namespace=event.namespace||namespace_sort.join(".");
events=jQuery.data(this,this.nodeType?"events":"__events__");
if(typeof events==="function"){events=events.events
}handlers=(events||{})[event.type];
if(events&&handlers){handlers=handlers.slice(0);
for(var j=0,l=handlers.length;
j<l;
j++){var handleObj=handlers[j];
if(all||namespace_re.test(handleObj.namespace)){event.handler=handleObj.handler;
event.data=handleObj.data;
event.handleObj=handleObj;
var ret=handleObj.handler.apply(this,args);
if(ret!==undefined){event.result=ret;
if(ret===false){event.preventDefault();
event.stopPropagation()
}}if(event.isImmediatePropagationStopped()){break
}}}}return event.result
},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(event){if(event[jQuery.expando]){return event
}var originalEvent=event;
event=jQuery.Event(originalEvent);
for(var i=this.props.length,prop;
i;
){prop=this.props[--i];
event[prop]=originalEvent[prop]
}if(!event.target){event.target=event.srcElement||document
}if(event.target.nodeType===3){event.target=event.target.parentNode
}if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement===event.target?event.toElement:event.fromElement
}if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;
event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);
event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)
}if(event.which==null&&(event.charCode!=null||event.keyCode!=null)){event.which=event.charCode!=null?event.charCode:event.keyCode
}if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey
}if(!event.which&&event.button!==undefined){event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)))
}return event
},guid:100000000,proxy:jQuery.proxy,special:{ready:{setup:jQuery.bindReady,teardown:jQuery.noop},live:{add:function(handleObj){jQuery.event.add(this,liveConvert(handleObj.origType,handleObj.selector),jQuery.extend({},handleObj,{handler:liveHandler,guid:handleObj.handler.guid}))
},remove:function(handleObj){jQuery.event.remove(this,liveConvert(handleObj.origType,handleObj.selector),handleObj)
}},beforeunload:{setup:function(data,namespaces,eventHandle){if(jQuery.isWindow(this)){this.onbeforeunload=eventHandle
}},teardown:function(namespaces,eventHandle){if(this.onbeforeunload===eventHandle){this.onbeforeunload=null
}}}}};
jQuery.removeEvent=document.removeEventListener?function(elem,type,handle){if(elem.removeEventListener){elem.removeEventListener(type,handle,false)
}}:function(elem,type,handle){if(elem.detachEvent){elem.detachEvent("on"+type,handle)
}};
jQuery.Event=function(src){if(!this.preventDefault){return new jQuery.Event(src)
}if(src&&src.type){this.originalEvent=src;
this.type=src.type
}else{this.type=src
}this.timeStamp=jQuery.now();
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
var withinElement=function(event){var parent=event.relatedTarget;
try{while(parent&&parent!==this){parent=parent.parentNode
}if(parent!==this){event.type=event.data;
jQuery.event.handle.apply(this,arguments)
}}catch(e){}},delegate=function(event){event.type=event.data;
jQuery.event.handle.apply(this,arguments)
};
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(orig,fix){jQuery.event.special[orig]={setup:function(data){jQuery.event.add(this,fix,data&&data.selector?delegate:withinElement,orig)
},teardown:function(data){jQuery.event.remove(this,fix,data&&data.selector?delegate:withinElement)
}}
});
if(!jQuery.support.submitBubbles){jQuery.event.special.submit={setup:function(data,namespaces){if(this.nodeName.toLowerCase()!=="form"){jQuery.event.add(this,"click.specialSubmit",function(e){var elem=e.target,type=elem.type;
if((type==="submit"||type==="image")&&jQuery(elem).closest("form").length){e.liveFired=undefined;
return trigger("submit",this,arguments)
}});
jQuery.event.add(this,"keypress.specialSubmit",function(e){var elem=e.target,type=elem.type;
if((type==="text"||type==="password")&&jQuery(elem).closest("form").length&&e.keyCode===13){e.liveFired=undefined;
return trigger("submit",this,arguments)
}})
}else{return false
}},teardown:function(namespaces){jQuery.event.remove(this,".specialSubmit")
}}
}if(!jQuery.support.changeBubbles){var changeFilters,getVal=function(elem){var type=elem.type,val=elem.value;
if(type==="radio"||type==="checkbox"){val=elem.checked
}else{if(type==="select-multiple"){val=elem.selectedIndex>-1?jQuery.map(elem.options,function(elem){return elem.selected
}).join("-"):""
}else{if(elem.nodeName.toLowerCase()==="select"){val=elem.selectedIndex
}}}return val
},testChange=function testChange(e){var elem=e.target,data,val;
if(!rformElems.test(elem.nodeName)||elem.readOnly){return 
}data=jQuery.data(elem,"_change_data");
val=getVal(elem);
if(e.type!=="focusout"||elem.type!=="radio"){jQuery.data(elem,"_change_data",val)
}if(data===undefined||val===data){return 
}if(data!=null||val){e.type="change";
e.liveFired=undefined;
return jQuery.event.trigger(e,arguments[1],elem)
}};
jQuery.event.special.change={filters:{focusout:testChange,beforedeactivate:testChange,click:function(e){var elem=e.target,type=elem.type;
if(type==="radio"||type==="checkbox"||elem.nodeName.toLowerCase()==="select"){return testChange.call(this,e)
}},keydown:function(e){var elem=e.target,type=elem.type;
if((e.keyCode===13&&elem.nodeName.toLowerCase()!=="textarea")||(e.keyCode===32&&(type==="checkbox"||type==="radio"))||type==="select-multiple"){return testChange.call(this,e)
}},beforeactivate:function(e){var elem=e.target;
jQuery.data(elem,"_change_data",getVal(elem))
}},setup:function(data,namespaces){if(this.type==="file"){return false
}for(var type in changeFilters){jQuery.event.add(this,type+".specialChange",changeFilters[type])
}return rformElems.test(this.nodeName)
},teardown:function(namespaces){jQuery.event.remove(this,".specialChange");
return rformElems.test(this.nodeName)
}};
changeFilters=jQuery.event.special.change.filters;
changeFilters.focus=changeFilters.beforeactivate
}function trigger(type,elem,args){args[0].type=type;
return jQuery.event.handle.apply(elem,args)
}if(document.addEventListener){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){jQuery.event.special[fix]={setup:function(){if(focusCounts[fix]++===0){document.addEventListener(orig,handler,true)
}},teardown:function(){if(--focusCounts[fix]===0){document.removeEventListener(orig,handler,true)
}}};
function handler(e){e=jQuery.event.fix(e);
e.type=fix;
return jQuery.event.trigger(e,null,e.target)
}})
}jQuery.each(["bind","one"],function(i,name){jQuery.fn[name]=function(type,data,fn){if(typeof type==="object"){for(var key in type){this[name](key,data,type[key],fn)
}return this
}if(jQuery.isFunction(data)||data===false){fn=data;
data=undefined
}var handler=name==="one"?jQuery.proxy(fn,function(event){jQuery(this).unbind(event,handler);
return fn.apply(this,arguments)
}):fn;
if(type==="unload"&&name!=="one"){this.one(type,data,fn)
}else{for(var i=0,l=this.length;
i<l;
i++){jQuery.event.add(this[i],type,handler,data)
}}return this
}
});
jQuery.fn.extend({unbind:function(type,fn){if(typeof type==="object"&&!type.preventDefault){for(var key in type){this.unbind(key,type[key])
}}else{for(var i=0,l=this.length;
i<l;
i++){jQuery.event.remove(this[i],type,fn)
}}return this
},delegate:function(selector,types,data,fn){return this.live(types,data,fn,selector)
},undelegate:function(selector,types,fn){if(arguments.length===0){return this.unbind("live")
}else{return this.die(types,null,fn,selector)
}},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this)
})
},triggerHandler:function(type,data){if(this[0]){var event=jQuery.Event(type);
event.preventDefault();
event.stopPropagation();
jQuery.event.trigger(event,data,this[0]);
return event.result
}},toggle:function(fn){var args=arguments,i=1;
while(i<args.length){jQuery.proxy(fn,args[i++])
}return this.click(jQuery.proxy(fn,function(event){var lastToggle=(jQuery.data(this,"lastToggle"+fn.guid)||0)%i;
jQuery.data(this,"lastToggle"+fn.guid,lastToggle+1);
event.preventDefault();
return args[lastToggle].apply(this,arguments)||false
}))
},hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver)
}});
var liveMap={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};
jQuery.each(["live","die"],function(i,name){jQuery.fn[name]=function(types,data,fn,origSelector){var type,i=0,match,namespaces,preType,selector=origSelector||this.selector,context=origSelector?this:jQuery(this.context);
if(typeof types==="object"&&!types.preventDefault){for(var key in types){context[name](key,data,types[key],selector)
}return this
}if(jQuery.isFunction(data)){fn=data;
data=undefined
}types=(types||"").split(" ");
while((type=types[i++])!=null){match=rnamespaces.exec(type);
namespaces="";
if(match){namespaces=match[0];
type=type.replace(rnamespaces,"")
}if(type==="hover"){types.push("mouseenter"+namespaces,"mouseleave"+namespaces);
continue
}preType=type;
if(type==="focus"||type==="blur"){types.push(liveMap[type]+namespaces);
type=type+namespaces
}else{type=(liveMap[type]||type)+namespaces
}if(name==="live"){for(var j=0,l=context.length;
j<l;
j++){jQuery.event.add(context[j],"live."+liveConvert(type,selector),{data:data,selector:selector,handler:fn,origType:type,origHandler:fn,preType:preType})
}}else{context.unbind("live."+liveConvert(type,selector),fn)
}}return this
}
});
function liveHandler(event){var stop,maxLevel,related,match,handleObj,elem,j,i,l,data,close,namespace,ret,elems=[],selectors=[],events=jQuery.data(this,this.nodeType?"events":"__events__");
if(typeof events==="function"){events=events.events
}if(event.liveFired===this||!events||!events.live||event.button&&event.type==="click"){return 
}if(event.namespace){namespace=new RegExp("(^|\\.)"+event.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")
}event.liveFired=this;
var live=events.live.slice(0);
for(j=0;
j<live.length;
j++){handleObj=live[j];
if(handleObj.origType.replace(rnamespaces,"")===event.type){selectors.push(handleObj.selector)
}else{live.splice(j--,1)
}}match=jQuery(event.target).closest(selectors,event.currentTarget);
for(i=0,l=match.length;
i<l;
i++){close=match[i];
for(j=0;
j<live.length;
j++){handleObj=live[j];
if(close.selector===handleObj.selector&&(!namespace||namespace.test(handleObj.namespace))){elem=close.elem;
related=null;
if(handleObj.preType==="mouseenter"||handleObj.preType==="mouseleave"){event.type=handleObj.preType;
related=jQuery(event.relatedTarget).closest(handleObj.selector)[0]
}if(!related||related!==elem){elems.push({elem:elem,handleObj:handleObj,level:close.level})
}}}}for(i=0,l=elems.length;
i<l;
i++){match=elems[i];
if(maxLevel&&match.level>maxLevel){break
}event.currentTarget=match.elem;
event.data=match.handleObj.data;
event.handleObj=match.handleObj;
ret=match.handleObj.origHandler.apply(match.elem,arguments);
if(ret===false||event.isPropagationStopped()){maxLevel=match.level;
if(ret===false){stop=false
}if(event.isImmediatePropagationStopped()){break
}}}return stop
}function liveConvert(type,selector){return(type&&type!=="*"?type+".":"")+selector.replace(rperiod,"`").replace(rspace,"&")
}jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error").split(" "),function(i,name){jQuery.fn[name]=function(data,fn){if(fn==null){fn=data;
data=null
}return arguments.length>0?this.bind(name,data,fn):this.trigger(name)
};
if(jQuery.attrFn){jQuery.attrFn[name]=true
}});
if(window.attachEvent&&!window.addEventListener){jQuery(window).bind("unload",function(){for(var id in jQuery.cache){if(jQuery.cache[id].handle){try{jQuery.event.remove(jQuery.cache[id].handle.elem)
}catch(e){}}}});
/*
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
}(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;
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
if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context)
}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);
while(parts.length){selector=parts.shift();
if(Expr.relative[selector]){selector+=parts.shift()
}set=posProcess(selector,set)
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
Sizzle.find=function(expr,context,isXML){var set;
if(!expr){return[]
}for(var i=0,l=Expr.order.length;
i<l;
i++){var match,type=Expr.order[i];
if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];
match.splice(1,1);
if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");
set=Expr.find[type](match,context,isXML);
if(set!=null){expr=expr.replace(Expr.match[type],"");
break
}}}}if(!set){set=context.getElementsByTagName("*")
}return{set:set,expr:expr}
};
Sizzle.filter=function(expr,set,inplace,not){var match,anyFound,old=expr,result=[],curLoop=set,isXMLFilter=set&&set[0]&&Sizzle.isXML(set[0]);
while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.leftMatch[type].exec(expr))!=null&&match[2]){var found,item,filter=Expr.filter[type],left=match[1];
anyFound=false;
match.splice(1,1);
if(left.substr(left.length-1)==="\\"){continue
}if(curLoop===result){result=[]
}if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);
if(!match){anyFound=found=true
}else{if(match===true){continue
}}}if(match){for(var i=0;
(item=curLoop[i])!=null;
i++){if(item){found=filter(item,match,i,curLoop);
var pass=not^!!found;
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
Sizzle.error=function(msg){throw"Syntax error, unrecognized expression: "+msg
};
var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href")
}},relative:{"+":function(checkSet,part){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;
if(isTag){part=part.toLowerCase()
}for(var i=0,l=checkSet.length,elem;
i<l;
i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?elem||false:elem===part
}}if(isPartStrNotTag){Sizzle.filter(part,checkSet,true)
}},">":function(checkSet,part){var elem,isPartStr=typeof part==="string",i=0,l=checkSet.length;
if(isPartStr&&!/\W/.test(part)){part=part.toLowerCase();
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
if(typeof part==="string"&&!/\W/.test(part)){part=part.toLowerCase();
nodeCheck=part;
checkFn=dirNodeCheck
}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML)
},"~":function(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;
if(typeof part==="string"&&!/\W/.test(part)){part=part.toLowerCase();
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
}},TAG:function(match,context){return context.getElementsByTagName(match[1])
}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";
if(isXML){return match
}for(var i=0,elem;
(elem=curLoop[i])!=null;
i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").replace(/[\t\n]/g," ").indexOf(match)>=0)){if(!inplace){result.push(elem)
}}else{if(inplace){curLoop[i]=false
}}}}return false
},ID:function(match){return match[1].replace(/\\/g,"")
},TAG:function(match,curLoop){return match[1].toLowerCase()
},CHILD:function(match){if(match[1]==="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);
match[2]=(test[1]+(test[2]||1))-0;
match[3]=test[3]-0
}match[0]=done++;
return match
},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");
if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name]
}if(match[2]==="~="){match[4]=" "+match[4]+" "
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
},selected:function(elem){elem.parentNode.selectedIndex;
return elem.selected===true
},parent:function(elem){return !!elem.firstChild
},empty:function(elem){return !elem.firstChild
},has:function(elem,i,match){return !!Sizzle(match[3],elem).length
},header:function(elem){return(/h\d/i).test(elem.nodeName)
},text:function(elem){return"text"===elem.type
},radio:function(elem){return"radio"===elem.type
},checkbox:function(elem){return"checkbox"===elem.type
},file:function(elem){return"file"===elem.type
},password:function(elem){return"password"===elem.type
},submit:function(elem){return"submit"===elem.type
},image:function(elem){return"image"===elem.type
},reset:function(elem){return"reset"===elem.type
},button:function(elem){return"button"===elem.type||elem.nodeName.toLowerCase()==="button"
},input:function(elem){return(/input|select|textarea|button/i).test(elem.nodeName)
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
}else{if(name==="contains"){return(elem.textContent||elem.innerText||Sizzle.getText([elem])||"").indexOf(match[3])>=0
}else{if(name==="not"){var not=match[3];
for(var j=0,l=not.length;
j<l;
j++){if(not[j]===elem){return false
}}return true
}else{Sizzle.error("Syntax error, unrecognized expression: "+name)
}}}},CHILD:function(elem,match){var type=match[1],node=elem;
switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false
}}if(type==="first"){return true
}node=elem;
case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false
}}return true;
case"nth":var first=match[2],last=match[3];
if(first===1&&last===0){return true
}var doneName=match[0],parent=elem.parentNode;
if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;
for(node=parent.firstChild;
node;
node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count
}}parent.sizcache=doneName
}var diff=elem.nodeIndex-last;
if(first===0){return diff===0
}else{return(diff%first===0&&diff/first>=0)
}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match
},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName.toLowerCase()===match
},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1
},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];
return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!==check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false
},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];
if(filter){return filter(elem,i,match,array)
}}}};
var origPOS=Expr.match.POS,fescape=function(all,num){return"\\"+(num-0+1)
};
for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+(/(?![^\[]*\])(?![^\(]*\))/.source));
Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source.replace(/\\(\d+)/g,fescape))
}var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);
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
}else{sortOrder=function(a,b){var al,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;
if(a===b){hasDuplicate=true;
return 0
}else{if(aup===bup){return siblingCheck(a,b)
}else{if(!aup){return -1
}else{if(!bup){return 1
}}}}while(cur){ap.unshift(cur);
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
}Sizzle.getText=function(elems){var ret="",elem;
for(var i=0;
elems[i];
i++){elem=elems[i];
if(elem.nodeType===3||elem.nodeType===4){ret+=elem.nodeValue
}else{if(elem.nodeType!==8){ret+=Sizzle.getText(elem.childNodes)
}}}return ret
};
(function(){var form=document.createElement("div"),id="script"+(new Date()).getTime(),root=document.documentElement;
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
query=query.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!seed&&!Sizzle.isXML(context)){if(context.nodeType===9){try{return makeArray(context.querySelectorAll(query),extra)
}catch(qsaError){}}else{if(context.nodeType===1&&context.nodeName.toLowerCase()!=="object"){var old=context.getAttribute("id"),nid=old||id;
if(!old){context.setAttribute("id",nid)
}try{return makeArray(context.querySelectorAll("#"+nid+" "+query),extra)
}catch(pseudoError){}finally{if(!old){context.removeAttribute("id")
}}}}}return oldSizzle(query,context,extra,seed)
};
for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop]
}div=null
})()
}(function(){var html=document.documentElement,matches=html.matchesSelector||html.mozMatchesSelector||html.webkitMatchesSelector||html.msMatchesSelector,pseudoWorks=false;
try{matches.call(document.documentElement,"[test!='']:sizzle")
}catch(pseudoError){pseudoWorks=true
}if(matches){Sizzle.matchesSelector=function(node,expr){expr=expr.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!Sizzle.isXML(node)){try{if(pseudoWorks||!Expr.match.PSEUDO.test(expr)&&!/!=/.test(expr)){return matches.call(node,expr)
}}catch(e){}}return Sizzle(expr,null,null,[node]).length>0
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
while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];
break
}if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;
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
while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];
break
}if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;
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
var posProcess=function(selector,context){var match,tmpSet=[],later="",root=context.nodeType?[context]:context;
while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];
selector=selector.replace(Expr.match.PSEUDO,"")
}selector=Expr.relative[selector]?selector+"*":selector;
for(var i=0,l=root.length;
i<l;
i++){Sizzle(selector,root[i],tmpSet)
}return Sizzle.filter(later,tmpSet)
};
jQuery.find=Sizzle;
jQuery.expr=Sizzle.selectors;
jQuery.expr[":"]=jQuery.expr.filters;
jQuery.unique=Sizzle.uniqueSort;
jQuery.text=Sizzle.getText;
jQuery.isXMLDoc=Sizzle.isXML;
jQuery.contains=Sizzle.contains
})();
var runtil=/Until$/,rparentsprev=/^(?:parents|prevUntil|prevAll)/,rmultiselector=/,/,isSimple=/^.[^:#\[\.,]*$/,slice=Array.prototype.slice,POS=jQuery.expr.match.POS;
jQuery.fn.extend({find:function(selector){var ret=this.pushStack("","find",selector),length=0;
for(var i=0,l=this.length;
i<l;
i++){length=ret.length;
jQuery.find(selector,this[i],ret);
if(i>0){for(var n=length;
n<ret.length;
n++){for(var r=0;
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
},is:function(selector){return !!selector&&jQuery.filter(selector,this).length>0
},closest:function(selectors,context){var ret=[],i,l,cur=this[0];
if(jQuery.isArray(selectors)){var match,selector,matches={},level=1;
if(cur&&selectors.length){for(i=0,l=selectors.length;
i<l;
i++){selector=selectors[i];
if(!matches[selector]){matches[selector]=jQuery.expr.match.POS.test(selector)?jQuery(selector,context||this.context):selector
}}while(cur&&cur.ownerDocument&&cur!==context){for(selector in matches){match=matches[selector];
if(match.jquery?match.index(cur)>-1:jQuery(cur).is(match)){ret.push({selector:selector,elem:cur,level:level})
}}cur=cur.parentNode;
level++
}}return ret
}var pos=POS.test(selectors)?jQuery(selectors,context||this.context):null;
for(i=0,l=this.length;
i<l;
i++){cur=this[i];
while(cur){if(pos?pos.index(cur)>-1:jQuery.find.matchesSelector(cur,selectors)){ret.push(cur);
break
}else{cur=cur.parentNode;
if(!cur||!cur.ownerDocument||cur===context){break
}}}}ret=ret.length>1?jQuery.unique(ret):ret;
return this.pushStack(ret,"closest",selectors)
},index:function(elem){if(!elem||typeof elem==="string"){return jQuery.inArray(this[0],elem?jQuery(elem):this.parent().children())
}return jQuery.inArray(elem.jquery?elem[0]:elem,this)
},add:function(selector,context){var set=typeof selector==="string"?jQuery(selector,context||this.context):jQuery.makeArray(selector),all=jQuery.merge(this.get(),set);
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
},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem)
},children:function(elem){return jQuery.sibling(elem.firstChild)
},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)
}},function(name,fn){jQuery.fn[name]=function(until,selector){var ret=jQuery.map(this,fn,until);
if(!runtil.test(name)){selector=until
}if(selector&&typeof selector==="string"){ret=jQuery.filter(selector,ret)
}ret=this.length>1?jQuery.unique(ret):ret;
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
function winnow(elements,qualifier,keep){if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){var retVal=!!qualifier.call(elem,i,elem);
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
}var rinlinejQuery=/ jQuery\d+="(?:\d+|null)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnocache=/<(?:script|object|embed|option|style)/i,rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,raction=/\=([^="'>\s]+\/)>/g,wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};
wrapMap.optgroup=wrapMap.option;
wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;
wrapMap.th=wrapMap.td;
if(!jQuery.support.htmlSerialize){wrapMap._default=[1,"div<div>","</div>"]
}jQuery.fn.extend({text:function(text){if(jQuery.isFunction(text)){return this.each(function(i){var self=jQuery(this);
self.text(text.call(this,i,self.text()))
})
}if(typeof text!=="object"&&text!==undefined){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text))
}return jQuery.text(this)
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
},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html)
})
},unwrap:function(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes)
}}).end()
},append:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.appendChild(elem)
}})
},prepend:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.insertBefore(elem,this.firstChild)
}})
},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this)
})
}else{if(arguments.length){var set=jQuery(arguments[0]);
set.push.apply(set,this.toArray());
return this.pushStack(set,"before",arguments)
}}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)
})
}else{if(arguments.length){var set=this.pushStack(this,"after",arguments);
set.push.apply(set,jQuery(arguments[0]).toArray());
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
},clone:function(events){var ret=this.map(function(){if(!jQuery.support.noCloneEvent&&!jQuery.isXMLDoc(this)){var html=this.outerHTML,ownerDocument=this.ownerDocument;
if(!html){var div=ownerDocument.createElement("div");
div.appendChild(this.cloneNode(true));
html=div.innerHTML
}return jQuery.clean([html.replace(rinlinejQuery,"").replace(raction,'="$1">').replace(rleadingWhitespace,"")],ownerDocument)[0]
}else{return this.cloneNode(true)
}});
if(events===true){cloneCopyEvent(this,ret);
cloneCopyEvent(this.find("*"),ret.find("*"))
}return ret
},html:function(value){if(value===undefined){return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(rinlinejQuery,""):null
}else{if(typeof value==="string"&&!rnocache.test(value)&&(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,"<$1></$2>");
try{for(var i=0,l=this.length;
i<l;
i++){if(this[i].nodeType===1){jQuery.cleanData(this[i].getElementsByTagName("*"));
this[i].innerHTML=value
}}}catch(e){this.empty().append(value)
}}else{if(jQuery.isFunction(value)){this.each(function(i){var self=jQuery(this);
self.html(value.call(this,i,self.html()))
})
}else{this.empty().append(value)
}}}return this
},replaceWith:function(value){if(this[0]&&this[0].parentNode){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this),old=self.html();
self.replaceWith(value.call(this,i,old))
})
}if(typeof value!=="string"){value=jQuery(value).detach()
}return this.each(function(){var next=this.nextSibling,parent=this.parentNode;
jQuery(this).remove();
if(next){jQuery(next).before(value)
}else{jQuery(parent).append(value)
}})
}else{return this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value)
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
for(var i=0,l=this.length;
i<l;
i++){callback.call(table?root(this[i],first):this[i],i>0||results.cacheable||this.length>1?fragment.cloneNode(true):fragment)
}}if(scripts.length){jQuery.each(scripts,evalScript)
}}return this
}});
function root(elem,cur){return jQuery.nodeName(elem,"table")?(elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody"))):elem
}function cloneCopyEvent(orig,ret){var i=0;
ret.each(function(){if(this.nodeName!==(orig[i]&&orig[i].nodeName)){return 
}var oldData=jQuery.data(orig[i++]),curData=jQuery.data(this,oldData),events=oldData&&oldData.events;
if(events){delete curData.handle;
curData.events={};
for(var type in events){for(var handler in events[type]){jQuery.event.add(this,type,events[type][handler],events[type][handler].data)
}}}})
}jQuery.buildFragment=function(args,nodes,scripts){var fragment,cacheable,cacheresults,doc=(nodes&&nodes[0]?nodes[0].ownerDocument||nodes[0]:document);
if(args.length===1&&typeof args[0]==="string"&&args[0].length<512&&doc===document&&!rnocache.test(args[0])&&(jQuery.support.checkClone||!rchecked.test(args[0]))){cacheable=true;
cacheresults=jQuery.fragments[args[0]];
if(cacheresults){if(cacheresults!==1){fragment=cacheresults
}}}if(!fragment){fragment=doc.createDocumentFragment();
jQuery.clean(args,doc,fragment,scripts)
}if(cacheable){jQuery.fragments[args[0]]=cacheresults?fragment:1
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
jQuery.extend({clean:function(elems,context,fragment,scripts){context=context||document;
if(typeof context.createElement==="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document
}var ret=[];
for(var i=0,elem;
(elem=elems[i])!=null;
i++){if(typeof elem==="number"){elem+=""
}if(!elem){continue
}if(typeof elem==="string"&&!rhtml.test(elem)){elem=context.createTextNode(elem)
}else{if(typeof elem==="string"){elem=elem.replace(rxhtmlTag,"<$1></$2>");
var tag=(rtagName.exec(elem)||["",""])[1].toLowerCase(),wrap=wrapMap[tag]||wrapMap._default,depth=wrap[0],div=context.createElement("div");
div.innerHTML=wrap[1]+elem+wrap[2];
while(depth--){div=div.lastChild
}if(!jQuery.support.tbody){var hasBody=rtbody.test(elem),tbody=tag==="table"&&!hasBody?div.firstChild&&div.firstChild.childNodes:wrap[1]==="<table>"&&!hasBody?div.childNodes:[];
for(var j=tbody.length-1;
j>=0;
--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])
}}}if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild)
}elem=div.childNodes
}}if(elem.nodeType){ret.push(elem)
}else{ret=jQuery.merge(ret,elem)
}}if(fragment){for(i=0;
ret[i];
i++){if(scripts&&jQuery.nodeName(ret[i],"script")&&(!ret[i].type||ret[i].type.toLowerCase()==="text/javascript")){scripts.push(ret[i].parentNode?ret[i].parentNode.removeChild(ret[i]):ret[i])
}else{if(ret[i].nodeType===1){ret.splice.apply(ret,[i+1,0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))))
}fragment.appendChild(ret[i])
}}}return ret
},cleanData:function(elems){var data,id,cache=jQuery.cache,special=jQuery.event.special,deleteExpando=jQuery.support.deleteExpando;
for(var i=0,elem;
(elem=elems[i])!=null;
i++){if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){continue
}id=elem[jQuery.expando];
if(id){data=cache[id];
if(data&&data.events){for(var type in data.events){if(special[type]){jQuery.event.remove(elem,type)
}else{jQuery.removeEvent(elem,type,data.handle)
}}}if(deleteExpando){delete elem[jQuery.expando]
}else{if(elem.removeAttribute){elem.removeAttribute(jQuery.expando)
}}delete cache[id]
}}}});
function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"})
}else{jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"")
}if(elem.parentNode){elem.parentNode.removeChild(elem)
}}var ralpha=/alpha\([^)]*\)/i,ropacity=/opacity=([^)]*)/,rdashAlpha=/-([a-z])/ig,rupper=/([A-Z])/g,rnumpx=/^-?\d+(?:px)?$/i,rnum=/^-?\d/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssWidth=["Left","Right"],cssHeight=["Top","Bottom"],curCSS,getComputedStyle,currentStyle,fcamelCase=function(all,letter){return letter.toUpperCase()
};
jQuery.fn.css=function(name,value){if(arguments.length===2&&value===undefined){return this
}return jQuery.access(this,name,value,true,function(elem,name,value){return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name)
})
};
jQuery.extend({cssHooks:{opacity:{get:function(elem,computed){if(computed){var ret=curCSS(elem,"opacity","opacity");
return ret===""?"1":ret
}else{return elem.style.opacity
}}}},cssNumber:{zIndex:true,fontWeight:true,opacity:true,zoom:true,lineHeight:true},cssProps:{"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"},style:function(elem,name,value,extra){if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return 
}var ret,origName=jQuery.camelCase(name),style=elem.style,hooks=jQuery.cssHooks[origName];
name=jQuery.cssProps[origName]||origName;
if(value!==undefined){if(typeof value==="number"&&isNaN(value)||value==null){return 
}if(typeof value==="number"&&!jQuery.cssNumber[origName]){value+="px"
}if(!hooks||!("set" in hooks)||(value=hooks.set(elem,value))!==undefined){try{style[name]=value
}catch(e){}}}else{if(hooks&&"get" in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret
}return style[name]
}},css:function(elem,name,extra){var ret,origName=jQuery.camelCase(name),hooks=jQuery.cssHooks[origName];
name=jQuery.cssProps[origName]||origName;
if(hooks&&"get" in hooks&&(ret=hooks.get(elem,true,extra))!==undefined){return ret
}else{if(curCSS){return curCSS(elem,name,origName)
}}},swap:function(elem,options,callback){var old={};
for(var name in options){old[name]=elem.style[name];
elem.style[name]=options[name]
}callback.call(elem);
for(name in options){elem.style[name]=old[name]
}},camelCase:function(string){return string.replace(rdashAlpha,fcamelCase)
}});
jQuery.curCSS=jQuery.css;
jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function(elem,computed,extra){var val;
if(computed){if(elem.offsetWidth!==0){val=getWH(elem,name,extra)
}else{jQuery.swap(elem,cssShow,function(){val=getWH(elem,name,extra)
})
}if(val<=0){val=curCSS(elem,name,name);
if(val==="0px"&&currentStyle){val=currentStyle(elem,name,name)
}if(val!=null){return val===""||val==="auto"?"0px":val
}}if(val<0||val==null){val=elem.style[name];
return val===""||val==="auto"?"0px":val
}return typeof val==="string"?val:val+"px"
}},set:function(elem,value){if(rnumpx.test(value)){value=parseFloat(value);
if(value>=0){return value+"px"
}}else{return value
}}}
});
if(!jQuery.support.opacity){jQuery.cssHooks.opacity={get:function(elem,computed){return ropacity.test((computed&&elem.currentStyle?elem.currentStyle.filter:elem.style.filter)||"")?(parseFloat(RegExp.$1)/100)+"":computed?"1":""
},set:function(elem,value){var style=elem.style;
style.zoom=1;
var opacity=jQuery.isNaN(value)?"":"alpha(opacity="+value*100+")",filter=style.filter||"";
style.filter=ralpha.test(filter)?filter.replace(ralpha,opacity):style.filter+" "+opacity
}}
}if(document.defaultView&&document.defaultView.getComputedStyle){getComputedStyle=function(elem,newName,name){var ret,defaultView,computedStyle;
name=name.replace(rupper,"-$1").toLowerCase();
if(!(defaultView=elem.ownerDocument.defaultView)){return undefined
}if((computedStyle=defaultView.getComputedStyle(elem,null))){ret=computedStyle.getPropertyValue(name);
if(ret===""&&!jQuery.contains(elem.ownerDocument.documentElement,elem)){ret=jQuery.style(elem,name)
}}return ret
}
}if(document.documentElement.currentStyle){currentStyle=function(elem,name){var left,rsLeft,ret=elem.currentStyle&&elem.currentStyle[name],style=elem.style;
if(!rnumpx.test(ret)&&rnum.test(ret)){left=style.left;
rsLeft=elem.runtimeStyle.left;
elem.runtimeStyle.left=elem.currentStyle.left;
style.left=name==="fontSize"?"1em":(ret||0);
ret=style.pixelLeft+"px";
style.left=left;
elem.runtimeStyle.left=rsLeft
}return ret===""?"auto":ret
}
}curCSS=getComputedStyle||currentStyle;
function getWH(elem,name,extra){var which=name==="width"?cssWidth:cssHeight,val=name==="width"?elem.offsetWidth:elem.offsetHeight;
if(extra==="border"){return val
}jQuery.each(which,function(){if(!extra){val-=parseFloat(jQuery.css(elem,"padding"+this))||0
}if(extra==="margin"){val+=parseFloat(jQuery.css(elem,"margin"+this))||0
}else{val-=parseFloat(jQuery.css(elem,"border"+this+"Width"))||0
}});
return val
}if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.hidden=function(elem){var width=elem.offsetWidth,height=elem.offsetHeight;
return(width===0&&height===0)||(!jQuery.support.reliableHiddenOffsets&&(elem.style.display||jQuery.css(elem,"display"))==="none")
};
jQuery.expr.filters.visible=function(elem){return !jQuery.expr.filters.hidden(elem)
}
}var jsc=jQuery.now(),rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,rselectTextarea=/^(?:select|textarea)/i,rinput=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,rnoContent=/^(?:GET|HEAD)$/,rbracket=/\[\]$/,jsre=/\=\?(&|$)/,rquery=/\?/,rts=/([?&])_=[^&]*/,rurl=/^(\w+:)?\/\/([^\/?#]+)/,r20=/%20/g,rhash=/#.*$/,_load=jQuery.fn.load;
jQuery.fn.extend({load:function(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments)
}else{if(!this.length){return this
}}var off=url.indexOf(" ");
if(off>=0){var selector=url.slice(off,url.length);
url=url.slice(0,off)
}var type="GET";
if(params){if(jQuery.isFunction(params)){callback=params;
params=null
}else{if(typeof params==="object"){params=jQuery.param(params,jQuery.ajaxSettings.traditional);
type="POST"
}}}var self=this;
jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status==="success"||status==="notmodified"){self.html(selector?jQuery("<div>").append(res.responseText.replace(rscript,"")).find(selector):res.responseText)
}if(callback){self.each(callback,[res.responseText,status,res])
}}});
return this
},serialize:function(){return jQuery.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?jQuery.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type))
}).map(function(i,elem){var val=jQuery(this).val();
return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val,i){return{name:elem.name,value:val}
}):{name:elem.name,value:val}
}).get()
}});
jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f)
}
});
jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;
callback=data;
data=null
}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type})
},getScript:function(url,callback){return jQuery.get(url,null,callback,"script")
},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")
},post:function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;
callback=data;
data={}
}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type})
},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings)
},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return new window.XMLHttpRequest()
},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},ajax:function(origSettings){var s=jQuery.extend(true,{},jQuery.ajaxSettings,origSettings),jsonp,status,data,type=s.type.toUpperCase(),noContent=rnoContent.test(type);
s.url=s.url.replace(rhash,"");
s.context=origSettings&&origSettings.context!=null?origSettings.context:s;
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional)
}if(s.dataType==="jsonp"){if(type==="GET"){if(!jsre.test(s.url)){s.url+=(rquery.test(s.url)?"&":"?")+(s.jsonp||"callback")+"=?"
}}else{if(!s.data||!jsre.test(s.data)){s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?"
}}s.dataType="json"
}if(s.dataType==="json"&&(s.data&&jsre.test(s.data)||jsre.test(s.url))){jsonp=s.jsonpCallback||("jsonp"+jsc++);
if(s.data){s.data=(s.data+"").replace(jsre,"="+jsonp+"$1")
}s.url=s.url.replace(jsre,"="+jsonp+"$1");
s.dataType="script";
var customJsonp=window[jsonp];
window[jsonp]=function(tmp){if(jQuery.isFunction(customJsonp)){customJsonp(tmp)
}else{window[jsonp]=undefined;
try{delete window[jsonp]
}catch(jsonpError){}}data=tmp;
jQuery.handleSuccess(s,xhr,status,data);
jQuery.handleComplete(s,xhr,status,data);
if(head){head.removeChild(script)
}}
}if(s.dataType==="script"&&s.cache===null){s.cache=false
}if(s.cache===false&&noContent){var ts=jQuery.now();
var ret=s.url.replace(rts,"$1_="+ts);
s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+ts:"")
}if(s.data&&noContent){s.url+=(rquery.test(s.url)?"&":"?")+s.data
}if(s.global&&jQuery.active++===0){jQuery.event.trigger("ajaxStart")
}var parts=rurl.exec(s.url),remote=parts&&(parts[1]&&parts[1].toLowerCase()!==location.protocol||parts[2].toLowerCase()!==location.host);
if(s.dataType==="script"&&type==="GET"&&remote){var head=document.getElementsByTagName("head")[0]||document.documentElement;
var script=document.createElement("script");
if(s.scriptCharset){script.charset=s.scriptCharset
}script.src=s.url;
if(!jsonp){var done=false;
script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){done=true;
jQuery.handleSuccess(s,xhr,status,data);
jQuery.handleComplete(s,xhr,status,data);
script.onload=script.onreadystatechange=null;
if(head&&script.parentNode){head.removeChild(script)
}}}
}head.insertBefore(script,head.firstChild);
return undefined
}var requestDone=false;
var xhr=s.xhr();
if(!xhr){return 
}if(s.username){xhr.open(type,s.url,s.async,s.username,s.password)
}else{xhr.open(type,s.url,s.async)
}try{if((s.data!=null&&!noContent)||(origSettings&&origSettings.contentType)){xhr.setRequestHeader("Content-Type",s.contentType)
}if(s.ifModified){if(jQuery.lastModified[s.url]){xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url])
}if(jQuery.etag[s.url]){xhr.setRequestHeader("If-None-Match",jQuery.etag[s.url])
}}if(!remote){xhr.setRequestHeader("X-Requested-With","XMLHttpRequest")
}xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*; q=0.01":s.accepts._default)
}catch(headerError){}if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){if(s.global&&jQuery.active--===1){jQuery.event.trigger("ajaxStop")
}xhr.abort();
return false
}if(s.global){jQuery.triggerGlobal(s,"ajaxSend",[xhr,s])
}var onreadystatechange=xhr.onreadystatechange=function(isTimeout){if(!xhr||xhr.readyState===0||isTimeout==="abort"){if(!requestDone){jQuery.handleComplete(s,xhr,status,data)
}requestDone=true;
if(xhr){xhr.onreadystatechange=jQuery.noop
}}else{if(!requestDone&&xhr&&(xhr.readyState===4||isTimeout==="timeout")){requestDone=true;
xhr.onreadystatechange=jQuery.noop;
status=isTimeout==="timeout"?"timeout":!jQuery.httpSuccess(xhr)?"error":s.ifModified&&jQuery.httpNotModified(xhr,s.url)?"notmodified":"success";
var errMsg;
if(status==="success"){try{data=jQuery.httpData(xhr,s.dataType,s)
}catch(parserError){status="parsererror";
errMsg=parserError
}}if(status==="success"||status==="notmodified"){if(!jsonp){jQuery.handleSuccess(s,xhr,status,data)
}}else{jQuery.handleError(s,xhr,status,errMsg)
}if(!jsonp){jQuery.handleComplete(s,xhr,status,data)
}if(isTimeout==="timeout"){xhr.abort()
}if(s.async){xhr=null
}}}};
try{var oldAbort=xhr.abort;
xhr.abort=function(){if(xhr){Function.prototype.call.call(oldAbort,xhr)
}onreadystatechange("abort")
}
}catch(abortError){}if(s.async&&s.timeout>0){setTimeout(function(){if(xhr&&!requestDone){onreadystatechange("timeout")
}},s.timeout)
}try{xhr.send(noContent||s.data==null?null:s.data)
}catch(sendError){jQuery.handleError(s,xhr,null,sendError);
jQuery.handleComplete(s,xhr,status,data)
}if(!s.async){onreadystatechange()
}return xhr
},param:function(a,traditional){var s=[],add=function(key,value){value=jQuery.isFunction(value)?value():value;
s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value)
};
if(traditional===undefined){traditional=jQuery.ajaxSettings.traditional
}if(jQuery.isArray(a)||a.jquery){jQuery.each(a,function(){add(this.name,this.value)
})
}else{for(var prefix in a){buildParams(prefix,a[prefix],traditional,add)
}}return s.join("&").replace(r20,"+")
}});
function buildParams(prefix,obj,traditional,add){if(jQuery.isArray(obj)&&obj.length){jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){add(prefix,v)
}else{buildParams(prefix+"["+(typeof v==="object"||jQuery.isArray(v)?i:"")+"]",v,traditional,add)
}})
}else{if(!traditional&&obj!=null&&typeof obj==="object"){if(jQuery.isEmptyObject(obj)){add(prefix,"")
}else{jQuery.each(obj,function(k,v){buildParams(prefix+"["+k+"]",v,traditional,add)
})
}}else{add(prefix,obj)
}}}jQuery.extend({active:0,lastModified:{},etag:{},handleError:function(s,xhr,status,e){if(s.error){s.error.call(s.context,xhr,status,e)
}if(s.global){jQuery.triggerGlobal(s,"ajaxError",[xhr,s,e])
}},handleSuccess:function(s,xhr,status,data){if(s.success){s.success.call(s.context,data,status,xhr)
}if(s.global){jQuery.triggerGlobal(s,"ajaxSuccess",[xhr,s])
}},handleComplete:function(s,xhr,status){if(s.complete){s.complete.call(s.context,xhr,status)
}if(s.global){jQuery.triggerGlobal(s,"ajaxComplete",[xhr,s])
}if(s.global&&jQuery.active--===1){jQuery.event.trigger("ajaxStop")
}},triggerGlobal:function(s,type,args){(s.context&&s.context.url==null?jQuery(s.context):jQuery.event).trigger(type,args)
},httpSuccess:function(xhr){try{return !xhr.status&&location.protocol==="file:"||xhr.status>=200&&xhr.status<300||xhr.status===304||xhr.status===1223
}catch(e){}return false
},httpNotModified:function(xhr,url){var lastModified=xhr.getResponseHeader("Last-Modified"),etag=xhr.getResponseHeader("Etag");
if(lastModified){jQuery.lastModified[url]=lastModified
}if(etag){jQuery.etag[url]=etag
}return xhr.status===304
},httpData:function(xhr,type,s){var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){jQuery.error("parsererror")
}if(s&&s.dataFilter){data=s.dataFilter(data,type)
}if(typeof data==="string"){if(type==="json"||!type&&ct.indexOf("json")>=0){data=jQuery.parseJSON(data)
}else{if(type==="script"||!type&&ct.indexOf("javascript")>=0){jQuery.globalEval(data)
}}}return data
}});
if(window.ActiveXObject){jQuery.ajaxSettings.xhr=function(){if(window.location.protocol!=="file:"){try{return new window.XMLHttpRequest()
}catch(xhrError){}}try{return new window.ActiveXObject("Microsoft.XMLHTTP")
}catch(activeError){}}
}jQuery.support.ajax=!!jQuery.ajaxSettings.xhr();
var elemdisplay={},rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=/^([+\-]=)?([\d+.\-]+)(.*)$/,timerId,fxAttrs=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];
jQuery.fn.extend({show:function(speed,easing,callback){var elem,display;
if(speed||speed===0){return this.animate(genFx("show",3),speed,easing,callback)
}else{for(var i=0,j=this.length;
i<j;
i++){elem=this[i];
display=elem.style.display;
if(!jQuery.data(elem,"olddisplay")&&display==="none"){display=elem.style.display=""
}if(display===""&&jQuery.css(elem,"display")==="none"){jQuery.data(elem,"olddisplay",defaultDisplay(elem.nodeName))
}}for(i=0;
i<j;
i++){elem=this[i];
display=elem.style.display;
if(display===""||display==="none"){elem.style.display=jQuery.data(elem,"olddisplay")||""
}}return this
}},hide:function(speed,easing,callback){if(speed||speed===0){return this.animate(genFx("hide",3),speed,easing,callback)
}else{for(var i=0,j=this.length;
i<j;
i++){var display=jQuery.css(this[i],"display");
if(display!=="none"){jQuery.data(this[i],"olddisplay",display)
}}for(i=0;
i<j;
i++){this[i].style.display="none"
}return this
}},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2,callback){var bool=typeof fn==="boolean";
if(jQuery.isFunction(fn)&&jQuery.isFunction(fn2)){this._toggle.apply(this,arguments)
}else{if(fn==null||bool){this.each(function(){var state=bool?fn:jQuery(this).is(":hidden");
jQuery(this)[state?"show":"hide"]()
})
}else{this.animate(genFx("toggle",3),fn,fn2,callback)
}}return this
},fadeTo:function(speed,to,easing,callback){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:to},speed,easing,callback)
},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);
if(jQuery.isEmptyObject(prop)){return this.each(optall.complete)
}return this[optall.queue===false?"each":"queue"](function(){var opt=jQuery.extend({},optall),p,isElement=this.nodeType===1,hidden=isElement&&jQuery(this).is(":hidden"),self=this;
for(p in prop){var name=jQuery.camelCase(p);
if(p!==name){prop[name]=prop[p];
delete prop[p];
p=name
}if(prop[p]==="hide"&&hidden||prop[p]==="show"&&!hidden){return opt.complete.call(this)
}if(isElement&&(p==="height"||p==="width")){opt.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];
if(jQuery.css(this,"display")==="inline"&&jQuery.css(this,"float")==="none"){if(!jQuery.support.inlineBlockNeedsLayout){this.style.display="inline-block"
}else{var display=defaultDisplay(this.nodeName);
if(display==="inline"){this.style.display="inline-block"
}else{this.style.display="inline";
this.style.zoom=1
}}}}if(jQuery.isArray(prop[p])){(opt.specialEasing=opt.specialEasing||{})[p]=prop[p][1];
prop[p]=prop[p][0]
}}if(opt.overflow!=null){this.style.overflow="hidden"
}opt.curAnim=jQuery.extend({},prop);
jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);
if(rfxtypes.test(val)){e[val==="toggle"?hidden?"show":"hide":val](prop)
}else{var parts=rfxnum.exec(val),start=e.cur()||0;
if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";
if(unit!=="px"){jQuery.style(self,name,(end||1)+unit);
start=((end||1)/e.cur())*start;
jQuery.style(self,name,start+unit)
}if(parts[1]){end=((parts[1]==="-="?-1:1)*end)+start
}e.custom(start,end,unit)
}else{e.custom(start,val,"")
}}});
return true
})
},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;
if(clearQueue){this.queue([])
}this.each(function(){for(var i=timers.length-1;
i>=0;
i--){if(timers[i].elem===this){if(gotoEnd){timers[i](true)
}timers.splice(i,1)
}}});
if(!gotoEnd){this.dequeue()
}return this
}});
function genFx(type,num){var obj={};
jQuery.each(fxAttrs.concat.apply([],fxAttrs.slice(0,num)),function(){obj[this]=type
});
return obj
}jQuery.each({slideDown:genFx("show",1),slideUp:genFx("hide",1),slideToggle:genFx("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback)
}
});
jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};
opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;
opt.old=opt.complete;
opt.complete=function(){if(opt.queue!==false){jQuery(this).dequeue()
}if(jQuery.isFunction(opt.old)){opt.old.call(this)
}};
return opt
},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p
},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum
}},timers:[],fx:function(elem,options,prop){this.options=options;
this.elem=elem;
this.prop=prop;
if(!options.orig){options.orig={}
}}});
jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)
}(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this)
},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]
}var r=parseFloat(jQuery.css(this.elem,this.prop));
return r&&r>-10000?r:0
},custom:function(from,to,unit){var self=this,fx=jQuery.fx;
this.startTime=jQuery.now();
this.start=from;
this.end=to;
this.unit=unit||this.unit||"px";
this.now=this.start;
this.pos=this.state=0;
function t(gotoEnd){return self.step(gotoEnd)
}t.elem=this.elem;
if(t()&&jQuery.timers.push(t)&&!timerId){timerId=setInterval(fx.tick,fx.interval)
}},show:function(){this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);
this.options.show=true;
this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());
jQuery(this.elem).show()
},hide:function(){this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);
this.options.hide=true;
this.custom(this.cur(),0)
},step:function(gotoEnd){var t=jQuery.now(),done=true;
if(gotoEnd||t>=this.options.duration+this.startTime){this.now=this.end;
this.pos=this.state=1;
this.update();
this.options.curAnim[this.prop]=true;
for(var i in this.options.curAnim){if(this.options.curAnim[i]!==true){done=false
}}if(done){if(this.options.overflow!=null&&!jQuery.support.shrinkWrapBlocks){var elem=this.elem,options=this.options;
jQuery.each(["","X","Y"],function(index,value){elem.style["overflow"+value]=options.overflow[index]
})
}if(this.options.hide){jQuery(this.elem).hide()
}if(this.options.hide||this.options.show){for(var p in this.options.curAnim){jQuery.style(this.elem,p,this.options.orig[p])
}}this.options.complete.call(this.elem)
}return false
}else{var n=t-this.startTime;
this.state=n/this.options.duration;
var specialEasing=this.options.specialEasing&&this.options.specialEasing[this.prop];
var defaultEasing=this.options.easing||(jQuery.easing.swing?"swing":"linear");
this.pos=jQuery.easing[specialEasing||defaultEasing](this.state,n,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);
this.update()
}return true
}};
jQuery.extend(jQuery.fx,{tick:function(){var timers=jQuery.timers;
for(var i=0;
i<timers.length;
i++){if(!timers[i]()){timers.splice(i--,1)
}}if(!timers.length){jQuery.fx.stop()
}},interval:13,stop:function(){clearInterval(timerId);
timerId=null
},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(fx){jQuery.style(fx.elem,"opacity",fx.now)
},_default:function(fx){if(fx.elem.style&&fx.elem.style[fx.prop]!=null){fx.elem.style[fx.prop]=(fx.prop==="width"||fx.prop==="height"?Math.max(0,fx.now):fx.now)+fx.unit
}else{fx.elem[fx.prop]=fx.now
}}}});
if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem
}).length
}
}function defaultDisplay(nodeName){if(!elemdisplay[nodeName]){var elem=jQuery("<"+nodeName+">").appendTo("body"),display=elem.css("display");
elem.remove();
if(display==="none"||display===""){display="block"
}elemdisplay[nodeName]=display
}return elemdisplay[nodeName]
}var rtable=/^t(?:able|d|h)$/i,rroot=/^(?:body|html)$/i;
if("getBoundingClientRect" in document.documentElement){jQuery.fn.offset=function(options){var elem=this[0],box;
if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i)
})
}if(!elem||!elem.ownerDocument){return null
}if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem)
}try{box=elem.getBoundingClientRect()
}catch(e){}var doc=elem.ownerDocument,docElem=doc.documentElement;
if(!box||!jQuery.contains(docElem,elem)){return box||{top:0,left:0}
}var body=doc.body,win=getWindow(doc),clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,scrollTop=(win.pageYOffset||jQuery.support.boxModel&&docElem.scrollTop||body.scrollTop),scrollLeft=(win.pageXOffset||jQuery.support.boxModel&&docElem.scrollLeft||body.scrollLeft),top=box.top+scrollTop-clientTop,left=box.left+scrollLeft-clientLeft;
return{top:top,left:left}
}
}else{jQuery.fn.offset=function(options){var elem=this[0];
if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i)
})
}if(!elem||!elem.ownerDocument){return null
}if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem)
}jQuery.offset.initialize();
var computedStyle,offsetParent=elem.offsetParent,prevOffsetParent=elem,doc=elem.ownerDocument,docElem=doc.documentElement,body=doc.body,defaultView=doc.defaultView,prevComputedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle,top=elem.offsetTop,left=elem.offsetLeft;
while((elem=elem.parentNode)&&elem!==body&&elem!==docElem){if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){break
}computedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle;
top-=elem.scrollTop;
left-=elem.scrollLeft;
if(elem===offsetParent){top+=elem.offsetTop;
left+=elem.offsetLeft;
if(jQuery.offset.doesNotAddBorder&&!(jQuery.offset.doesAddBorderForTableAndCells&&rtable.test(elem.nodeName))){top+=parseFloat(computedStyle.borderTopWidth)||0;
left+=parseFloat(computedStyle.borderLeftWidth)||0
}prevOffsetParent=offsetParent;
offsetParent=elem.offsetParent
}if(jQuery.offset.subtractsBorderForOverflowNotVisible&&computedStyle.overflow!=="visible"){top+=parseFloat(computedStyle.borderTopWidth)||0;
left+=parseFloat(computedStyle.borderLeftWidth)||0
}prevComputedStyle=computedStyle
}if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){top+=body.offsetTop;
left+=body.offsetLeft
}if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){top+=Math.max(docElem.scrollTop,body.scrollTop);
left+=Math.max(docElem.scrollLeft,body.scrollLeft)
}return{top:top,left:left}
}
}jQuery.offset={initialize:function(){var body=document.body,container=document.createElement("div"),innerDiv,checkDiv,table,td,bodyMarginTop=parseFloat(jQuery.css(body,"marginTop"))||0,html="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
jQuery.extend(container.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});
container.innerHTML=html;
body.insertBefore(container,body.firstChild);
innerDiv=container.firstChild;
checkDiv=innerDiv.firstChild;
td=innerDiv.nextSibling.firstChild.firstChild;
this.doesNotAddBorder=(checkDiv.offsetTop!==5);
this.doesAddBorderForTableAndCells=(td.offsetTop===5);
checkDiv.style.position="fixed";
checkDiv.style.top="20px";
this.supportsFixedPosition=(checkDiv.offsetTop===20||checkDiv.offsetTop===15);
checkDiv.style.position=checkDiv.style.top="";
innerDiv.style.overflow="hidden";
innerDiv.style.position="relative";
this.subtractsBorderForOverflowNotVisible=(checkDiv.offsetTop===-5);
this.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==bodyMarginTop);
body.removeChild(container);
body=container=innerDiv=checkDiv=table=td=null;
jQuery.offset.initialize=jQuery.noop
},bodyOffset:function(body){var top=body.offsetTop,left=body.offsetLeft;
jQuery.offset.initialize();
if(jQuery.offset.doesNotIncludeMarginInBodyOffset){top+=parseFloat(jQuery.css(body,"marginTop"))||0;
left+=parseFloat(jQuery.css(body,"marginLeft"))||0
}return{top:top,left:left}
},setOffset:function(elem,options,i){var position=jQuery.css(elem,"position");
if(position==="static"){elem.style.position="relative"
}var curElem=jQuery(elem),curOffset=curElem.offset(),curCSSTop=jQuery.css(elem,"top"),curCSSLeft=jQuery.css(elem,"left"),calculatePosition=(position==="absolute"&&jQuery.inArray("auto",[curCSSTop,curCSSLeft])>-1),props={},curPosition={},curTop,curLeft;
if(calculatePosition){curPosition=curElem.position()
}curTop=calculatePosition?curPosition.top:parseInt(curCSSTop,10)||0;
curLeft=calculatePosition?curPosition.left:parseInt(curCSSLeft,10)||0;
if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset)
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
jQuery.each(["Left","Top"],function(i,name){var method="scroll"+name;
jQuery.fn[method]=function(val){var elem=this[0],win;
if(!elem){return null
}if(val!==undefined){return this.each(function(){win=getWindow(this);
if(win){win.scrollTo(!i?val:jQuery(win).scrollLeft(),i?val:jQuery(win).scrollTop())
}else{this[method]=val
}})
}else{win=getWindow(elem);
return win?("pageXOffset" in win)?win[i?"pageYOffset":"pageXOffset"]:jQuery.support.boxModel&&win.document.documentElement[method]||win.document.body[method]:elem[method]
}}
});
function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9?elem.defaultView||elem.parentWindow:false
}jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();
jQuery.fn["inner"+name]=function(){return this[0]?parseFloat(jQuery.css(this[0],type,"padding")):null
};
jQuery.fn["outer"+name]=function(margin){return this[0]?parseFloat(jQuery.css(this[0],type,margin?"margin":"border")):null
};
jQuery.fn[type]=function(size){var elem=this[0];
if(!elem){return size==null?null:this
}if(jQuery.isFunction(size)){return this.each(function(i){var self=jQuery(this);
self[type](size.call(this,i,self[type]()))
})
}if(jQuery.isWindow(elem)){return elem.document.compatMode==="CSS1Compat"&&elem.document.documentElement["client"+name]||elem.document.body["client"+name]
}else{if(elem.nodeType===9){return Math.max(elem.documentElement["client"+name],elem.body["scroll"+name],elem.documentElement["scroll"+name],elem.body["offset"+name],elem.documentElement["offset"+name])
}else{if(size===undefined){var orig=jQuery.css(elem,type),ret=parseFloat(orig);
return jQuery.isNaN(ret)?orig:ret
}else{return this.css(type,typeof size==="string"?size:size+"px")
}}}}
})
})(window);
window.$CQ=$.noConflict();
if(typeof CQClientLibraryManager=="undefined"){CQClientLibraryManager={debug:false,scripts:{},initialInclude:true,windowLoaded:false,contextPath:null,hook:null,channelCB:function(){return""
},setChannelCB:function(A){this.channelCB=A
},isDebug:function(B){var A=document.location.href;
return(typeof console!="undefined")&&(B||this.debug)&&A.indexOf("debugConsole=true")!=-1
},write:function(A,C){C=this.isDebug(C);
var E=this.channelCB();
if(!E){E="default"
}if(C){console.log("LibraryManager: detected channel: "+E)
}for(var D=0;
D<A.length;
D++){var B=A[D];
if(!this.scripts[B.p]){this.scripts[B.p]=B;
if(C){console.log("LibraryManager: processing script",B.p,B)
}if(this.isIncluded(E,B.c,C)){this.includeScript(B.p,C)
}}}},isIncluded:function(G,A,B){if(A.length==0){if(B){console.log("LibraryManager: ...accepted. no channels defined")
}return true
}var F="!"+G;
var E=false;
var D=0;
for(var C=0;
C<A.length;
C++){var H=A[C];
if(H.charAt(0)=="!"){if(H==F){if(B){console.log("LibraryManager: ...rejected. channel excluded: ",H)
}return false
}}else{if(H==G){if(B){console.log("LibraryManager: ...accepted. channel included: ",H)
}E=true
}D++
}}if(D==0){if(B){console.log("LibraryManager: ...accepted. no more channels after exclusion ")
}E=true
}if(!E&&B){console.log("LibraryManager: ...rejected.")
}return E
},includeScript:function(path,debug){var ext=path;
var idx=ext.indexOf("?");
if(idx>0){ext=ext.substring(0,idx)
}ext=ext.substring(ext.lastIndexOf(".")+1);
if(this.initialInclude){this.initialInclude=false;
if(typeof CQ_XHR_HOOK!="undefined"&&Object.prototype.toString.call(CQ_XHR_HOOK)==="[object Function]"){this.hook=CQ_XHR_HOOK
}this.contextPath=this.detectContextPath();
var man=this;
if(window.addEventListener){window.addEventListener("load",function(){man.windowLoaded=true
},false)
}else{if(window.attachEvent){window.attachEvent("onload",function(){man.windowLoaded=true
})
}}}if(this.hook){var p={url:path,method:"GET"};
try{var out=CQ_XHR_HOOK(p);
if(out){path=out.url
}}catch(e){if(debug){console.log("LibraryManager: error during CQ_XHR_HOOK call: ",e.message)
}}}if(this.contextPath){if(path.indexOf("/")==0&&path.indexOf(this.contextPath+"/")!=0){path=this.contextPath+path
}}if(ext=="js"){if(debug){console.log("LibraryManager: --> writing js include: ",path)
}if(this.windowLoaded){try{var request=document.all?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
request.open("GET",path,false);
request.send(null);
if(window.execScript){window.execScript(request.responseText)
}else{eval.call(null,request.responseText)
}}catch(err){if(debug){console.log("LibraryManager: --> evaluating js include failed: ",path)
}}}else{document.writeln('<script src="'+path+'" type="text/javascript"><\/script>')
}}else{if(ext=="css"){var head=document.getElementsByTagName("head")||document.getElementsByTagName("*");
head=head[0];
var n=document.createElement("link");
n.type="text/css";
n.rel="stylesheet";
n.href=path;
head.appendChild(n);
if(debug){console.log("LibraryManager: --> writing css include: ",path)
}}else{if(debug){console.log("LibraryManager: --> unsupported extension: ",path)
}}}},detectContextPath:function(){var A=document.getElementsByTagName("script");
var C=/\/etc\/clientlibs\/foundation\/librarymanager\/*\.js$/;
for(var B=0;
B<A.length;
B++){var D=A[B].src;
if(D.indexOf("?")>=0){D=D.substring(0,D.indexOf("?"))
}if(D.match(C)){D=D.replace(/.*\:[\/][\/]/,"");
D=D.substring(D.indexOf("/"));
D=D.replace(C,"");
this.contextPath=D;
break
}}}}
}CQClientLibraryManager.setChannelCB(function(){var A=[{channel:"ie6",match:"MSIE 6."},{channel:"touch",match:"iPhone"},{channel:"touch",match:"iPad"}];
var C=navigator.userAgent;
for(var B=0;
B<A.length;
B++){var D=A[B];
if(C.indexOf(D.match)>=0){return D.channel
}}return""
});
if(!window.CQ_Analytics){window.CQ_Analytics={}
}CQ_Analytics.Operator=(function(){return function(){}
})();
CQ_Analytics.Operator.IS="is";
CQ_Analytics.Operator.EQUALS="equals";
CQ_Analytics.Operator.NOT_EQUAL="notequal";
CQ_Analytics.Operator.GREATER="greater";
CQ_Analytics.Operator.GREATER_OR_EQUAL="greaterorequal";
CQ_Analytics.Operator.OLDER="older";
CQ_Analytics.Operator.OLDER_OR_EQUAL="olderorequal";
CQ_Analytics.Operator.LESS="less";
CQ_Analytics.Operator.LESS_OR_EQUAL="lessorequal";
CQ_Analytics.Operator.YOUNGER="younger";
CQ_Analytics.Operator.YOUNGER_OR_EQUAL="youngerorequal";
CQ_Analytics.Operator.CONTAINS="contains";
CQ_Analytics.Operator.BEGINS_WITH="beginswith";
CQ_Analytics.OperatorActions=function(){var mapping={};
var addOperator=function(name,text,operation){mapping[name]=[text,operation]
};
addOperator(CQ_Analytics.Operator.EQUALS,"equals","==");
addOperator(CQ_Analytics.Operator.IS,"is","==");
addOperator(CQ_Analytics.Operator.NOT_EQUAL,"is not equal to","!=");
addOperator(CQ_Analytics.Operator.GREATER,"is greater than",">");
addOperator(CQ_Analytics.Operator.GREATER_OR_EQUAL,"is equal to or greater than",">=");
addOperator(CQ_Analytics.Operator.OLDER,"is older than",">");
addOperator(CQ_Analytics.Operator.OLDER_OR_EQUAL,"is equal to or older than",">=");
addOperator(CQ_Analytics.Operator.LESS,"is less than","<");
addOperator(CQ_Analytics.Operator.LESS_OR_EQUAL,"is equal to or less than","<=");
addOperator(CQ_Analytics.Operator.YOUNGER,"is younger than","<");
addOperator(CQ_Analytics.Operator.YOUNGER_OR_EQUAL,"is equal to or younger than","<=");
addOperator(CQ_Analytics.Operator.CONTAINS,"contains",function(s1,s2){if(s1){if(s2){s1=""+s1;
s2=""+s2;
return s1.toLowerCase().indexOf(s2.toLowerCase())!=-1
}return true
}return false
});
addOperator(CQ_Analytics.Operator.BEGINS_WITH,"begins with",function(s1,s2){if(s1){if(s2){s1=""+s1;
s2=""+s2;
return s1.toLowerCase().indexOf(s2.toLowerCase())==0
}return true
}return false
});
var getByIndex=function(op,index){if(mapping[op]&&mapping[op][index]){return mapping[op][index]
}return""
};
var escapeQuote=function(str){if(str){str=str.replace(new RegExp("\\'","ig"),str)
}return str
};
return{getText:function(operator){return getByIndex(operator,0)
},getOperation:function(operator){return getByIndex(operator,1)
},operate:function(object,property,operator,value,valueFormat){try{if(object&&object[property]){var toEval="";
var op=this.getOperation(operator);
op=op?op:operator;
var objectValue=CQ.shared.XSS.getXSSTablePropertyValue(object,property);
if(typeof op=="function"){return op.call(this,objectValue,value,valueFormat)
}else{if(valueFormat){toEval=valueFormat+"("+objectValue+") "+op+" "+valueFormat+"("+value+")"
}else{var s1=escapeQuote(objectValue);
var s2=escapeQuote(value);
toEval="'"+s1+"' "+op+" '"+s2+"'"
}var b=eval(toEval);
return b
}}}catch(e){}return false
}}
}();
var RUZEE=window.RUZEE||{};
RUZEE.ShadedBorder={create:function(Q){var M=/msie/i.test(navigator.userAgent)&&!window.opera;
var a=M&&!window.XMLHttpRequest;
function S(n,b){for(k in b){if(/ie_/.test(k)){if(M){n.style[k.substr(3)]=b[k]
}}else{n.style[k]=b[k]
}}}function V(n){var b=document.createElement("div");
b.className="sb-gen";
S(b,n);
return b
}function T(b){b=b<0?0:b;
if(b>0.99999){return""
}return M?" filter:alpha(opacity="+(b*100)+");":" opacity:"+b+";"
}var I=Q.shadow||0;
var c=Q.corner||0;
var G=0;
var F=Q.border||0;
var H=Q.borderOpacity||1;
var X=I!=0;
var P=c>I?c:I;
var R=P;
var B=P;
var j=P;
if(F>0){G=c;
c=c-F
}var L=c!=0&&X?Math.round(P/3):0;
var K=L;
var O=Math.round(L/2);
var N=c>0?"sb-inner":"sb-shadow";
var U="sb-shadow";
var f="sb-border";
var J=Q.edges||"trlb";
if(!/t/i.test(J)){B=0
}if(!/b/i.test(J)){j=0
}if(!/l/i.test(J)){P=0
}if(!/r/i.test(J)){R=0
}var e={position:"absolute",left:"0",top:"0",width:P+"px",height:B+"px",ie_fontSize:"1px",overflow:"hidden",margin:"0",padding:"0"};
var A=V(e);
delete e.left;
e.right="0";
e.width=R+"px";
var l=V(e);
delete e.top;
e.bottom="0";
e.height=j+"px";
var d=V(e);
delete e.right;
e.left="0";
e.width=P+"px";
var g=V(e);
var h=V({position:"absolute",width:"100%",height:B+"px",ie_fontSize:"1px",top:"0",left:"0",overflow:"hidden",margin:"0",padding:"0"});
var Z=V({position:"relative",height:B+"px",ie_fontSize:"1px",margin:"0 "+R+"px 0 "+P+"px",overflow:"hidden",padding:"0"});
h.appendChild(Z);
var Y=V({position:"absolute",left:"0",bottom:"0",width:"100%",height:j+"px",ie_fontSize:"1px",overflow:"hidden",margin:"0",padding:"0"});
var m=V({position:"relative",height:j+"px",ie_fontSize:"1px",margin:"0 "+R+"px 0 "+P+"px",overflow:"hidden",padding:"0"});
Y.appendChild(m);
var E=V({position:"absolute",top:(-j)+"px",left:"0",width:"100%",height:"100%",overflow:"hidden",ie_fontSize:"1px",padding:"0",margin:"0"});
function W(p,AD,AH){var AA=AH?P:R;
var AK=AD?B:j;
var AE=AD?O:-O;
var u=[];
var q=[];
var b=[];
var AB=0;
var AI=1;
if(AH){AB=AA-1;
AI=-1
}for(var z=0;
z<AA;
++z){var AL=AK-1;
var n=-1;
if(AD){AL=0;
n=1
}var r=false;
for(var v=AK-1;
v>=0&&!r;
--v){var AF='<div style="position:absolute; top:'+AL+"px; left:"+AB+"px; width:1px; height:1px; overflow:hidden; margin:0; padding:0;";
var AJ=z-L;
var o=v-K-AE;
var AM=Math.sqrt(AJ*AJ+o*o);
var AC=false;
if(c>0){if(AJ<0&&o<G&&o>=c||o<0&&AJ<G&&AJ>=c){u.push(AF+T(H)+'" class="'+f+'"></div>')
}else{if(AM<G&&AM>=c-1&&AJ>=0&&o>=0){var AN=AF;
if(AM>=G-1){AN+=T((G-AM)*H);
AC=true
}else{AN+=T(H)
}u.push(AN+'" class="'+f+'"></div>')
}}var AN=AF+" z-index:2;"+(AD?"background-position:0 -"+(c-o-1)+"px;":"background-image:none;");
var AG=function(){if(!AD){AN=AN.replace(/top\:\d+px/,"top:0px")
}AN=AN.replace(/height\:1px/,"height:"+(v+1)+"px");
q.push(AN+'" class="'+N+'"></div>');
r=true
};
if(AJ<0&&o<c||o<0&&AJ<c){AG()
}else{if(AM<c&&AJ>=0&&o>=0){if(AM>=c-1){AN+=T(c-AM);
AC=true;
q.push(AN+'" class="'+N+'"></div>')
}else{AG()
}}else{AC=true
}}}else{AC=true
}if(I>0&&AC){AM=Math.sqrt(z*z+v*v);
if(AM<I){b.push(AF+" z-index:0; "+T(1-(AM/I))+'" class="'+U+'"></div>')
}}AL+=n
}AB+=AI
}p.innerHTML=b.concat(u.concat(q)).join("")
}function C(q){var p=[];
p.push('<div style="position:relative; top:'+(B+j)+"px; height:2048px;  margin:0 "+(R-c-L)+"px 0 "+(P-c-L)+"px;  padding:0; overflow:hidden; background-position:0 "+(B>0?-(c+K+O):"0")+'px;" class="'+N+'"></div>');
var n='<div style="position:absolute; width:1px; top:'+(B+j)+"px; height:2048px; padding:0; margin:0;";
if(I>0){for(var b=0;
b<P-c-L;
++b){p.push(n+" left:"+b+"px;"+T((b+1)/P)+'" class="'+U+'"></div>')
}for(var b=0;
b<R-c-L;
++b){p.push(n+" right:"+b+"px;"+T((b+1)/R)+'" class="'+U+'"></div>')
}}if(F>0){var o=" width:"+F+"px;"+T(H)+'" class="'+f+'"></div>';
p.push(n+" left:"+(P-G-L)+"px;"+o);
p.push(n+" right:"+(R-G-L)+"px;"+o)
}q.innerHTML=p.join("")
}function D(q,n){var r=[];
var p=n?B:j;
var b='<div style="height:1px; overflow:hidden; position:absolute; margin:0; padding:0; width:100%; left:0px; ';
var o=n?O:-O;
for(var u=0;
u<p-o-K-c;
++u){if(I>0){r.push(b+(n?"top:":"bottom:")+u+"px;"+T((u+1)*1/p)+'" class="'+U+'"></div>')
}}if(u>=F){r.push(b+(n?"top:":"bottom:")+(u-F)+"px;"+T(H)+" height:"+F+'px;" class="'+f+'"></div>')
}r.push(b+(n?"background-position-y:0; top:":"background-image:none; bottom:")+u+"px; height:"+(c+K+o)+'px;" class="'+N+'"></div>');
q.innerHTML=r.join("")
}W(A,true,true);
W(l,true,false);
W(g,false,true);
W(d,false,false);
C(E);
D(Z,true);
D(m,false);
return{render:function(n){if(typeof n=="string"){n=document.getElementById(n)
}if(n.length!=undefined){for(var q=0;
q<n.length;
++q){this.render(n[q])
}return 
}n.className+=" sb";
S(n,{position:"relative",background:"transparent"});
var o=n.firstChild;
while(o){var p=o.nextSibling;
if(o.nodeType==1&&o.className=="sb-gen"){n.removeChild(o)
}o=p
}var u=n.firstChild;
var r=h.cloneNode(true);
var t=E.cloneNode(true);
var s=Y.cloneNode(true);
n.insertBefore(A.cloneNode(true),u);
n.insertBefore(l.cloneNode(true),u);
n.insertBefore(g.cloneNode(true),u);
n.insertBefore(d.cloneNode(true),u);
n.insertBefore(r,u);
n.insertBefore(t,u);
n.insertBefore(s,u);
if(a){n.onmouseover=function(){this.className+=" hover"
};
n.onmouseout=function(){this.className=this.className.replace(/ hover/,"")
};
window.setTimeout(function(){n.className+=" hover";
n.className=n.className.replace(/ hover/,"")
},100)
}if(M){function b(){r.style.width=s.style.width=t.style.width=n.offsetWidth+"px";
t.firstChild.style.height=n.offsetHeight+"px"
}n.onresize=b;
b()
}}}
}};
CQ_Analytics.Utils=new function(){return{registerDocumentEventHandler:function(C,B){var A=window.document[C];
if(typeof window.document[C]!="function"){window.document[C]=B
}else{window.document[C]=function(D){if(A){A(D)
}B(D)
}
}},eventWrapper:function(A){return function(D){var C,B;
if(document.all){C=window.event.keyCode;
B=window.event
}else{C=(typeof (D.which)!="undefined")?D.which:0;
B=D
}if(B){A(B,C)
}}
},loadElement:function(A,B){CQ_Analytics.Utils.load(A,function(E,C,D){$CQ("#"+B).html(D.responseText)
})
},clearElement:function(A){if(A){$CQ("#"+A).html("")
}},indexOf:function(D,C){for(var B=0,A=D.length;
B<A;
B++){if(D[B]==C){return B
}}return -1
},load:function(A,C,B){return CQ.shared.HTTP.get(A,C,B)
},post:function(A,D,C,B){return CQ.shared.HTTP.post(A,D,C,B)
},getPagePath:function(){return CQ.shared.HTTP.getPath()
},getPath:function(A){return CQ.shared.HTTP.getPath(A)
},addParameter:function(B,A,C){return CQ.shared.HTTP.addParameter(B,A,C)
},removeParameters:function(A){return CQ.shared.HTTP.removeParameters(A)
},removeAnchor:function(A){return CQ.shared.HTTP.removeAnchor(A)
},getSchemeAndAuthority:function(A){return CQ.shared.HTTP.getSchemeAndAuthority(A)
},internalize:function(A,B){return CQ.shared.HTTP.internalize(B)
},externalize:function(A,B){return CQ.shared.HTTP.externalize(A,B)
},encodePathOfURI:function(A){return CQ.shared.HTTP.encodePathOfURI(A)
},encodePath:function(A){return CQ.shared.HTTP.encodePath(A)
},getContextPath:function(){return CQ.shared.HTTP.getContextPath()
},detectContextPath:function(){return CQ.shared.HTTP.detectContextPath()
},urlEncode:function(H){if(!H){return""
}if(typeof H=="string"){return H
}var C=[];
for(var F in H){var E=H[F],B=encodeURIComponent(F);
var G=typeof E;
if(G=="undefined"){C.push(B,"=&")
}else{if(G!="function"&&G!="object"){C.push(B,"=",encodeURIComponent(E),"&")
}else{if(typeof E=="array"){if(E.length){for(var D=0,A=E.length;
D<A;
D++){C.push(B,"=",encodeURIComponent(E[D]===undefined?"":E[D]),"&")
}}else{C.push(B,"=&")
}}}}}C.pop();
return C.join("")
},getUID:function(){var A=Math.floor(Math.random()*(Math.pow(2,42)-1));
return this.getTimestamp().toString(16)+A.toString(16)
},getTimestamp:function(){var A=new Date();
return A.getTime()
},insert:function(D,C,B){if(!D||isNaN(C)||!B){return D
}var A="";
var F=0;
var E=C;
while(E<D.length){A+=D.substring(F,E)+B;
F+=C;
E+=C
}if(F<D.length){A+=D.substring(F)
}return A
},addListener:function(){if(window.addEventListener){return function(D,B,C,A){D.addEventListener(B,C,(A))
}
}else{if(window.attachEvent){return function(D,B,C,A){D.attachEvent("on"+B,C)
}
}else{return function(){}
}}},removeListener:function(){if(window.removeEventListener){return function(D,B,C,A){D.removeEventListener(B,C,(A))
}
}else{if(window.detachEvent){return function(C,A,B){C.detachEvent("on"+A,B)
}
}else{return function(){}
}}}}
};
CQ_Analytics.ClickstreamcloudRenderingUtils=new function(){return{createLink:function(F,D,B,A){var C=document.createElement("a");
C.href=A;
C.onclick=D;
C.innerHTML=F;
if(B){for(var E in B){if(B.hasOwnProperty(E)){C[E]=B[E]
}}}return C
},createStaticLink:function(D,A,C){var B=document.createElement("a");
B.href=A;
B.innerHTML=D;
B.title=C;
B.alt=C;
return B
},createNameValue:function(B,D,A,E){var C=document.createElement("span");
C.className=A||"ccl-data";
C.innerHTML=B+" = "+D;
C.title=E;
C.alt=E;
return C
},createText:function(D,A,C){var B=document.createElement("span");
B.className=A||"ccl-data";
if(D&&D.indexOf&&((D.indexOf("/home")!=-1&&D.indexOf("/image")!=-1)||(D.indexOf("/")!=-1&&D.indexOf(".png")!=-1))){B.innerHTML='<img src="'+D+'.prof.thumbnail.png" border="0">'
}else{if(D&&D.indexOf&&D.indexOf("www.gravatar.com")!=-1){B.innerHTML='<img src="'+D+'">'
}else{B.innerHTML=D
}}B.title=C;
B.alt=C;
return B
},createEditablePropertySpan:function(B,D){var A="var editSpan = this.nextSibling; this.style.display = 'none'; editSpan.style.display = 'block';";
var E="var editSpan = this.parentNode; var readSpan = this.parentNode.previousSibling;var newValue = this.value;editSpan.style.display = 'none'; readSpan.innerHTML = '"+B+" = '+value; readSpan.style.display = 'block';";
var C=document.createElement("span");
C.innerHTML='<span class="ccl-data" onclick="'+A+'">'+B+" = "+D+"</span>";
C.innerHTML+='<span class="ccl-data" style="display: none;">'+B+' = <input class="ccl-input" type="text" value="'+D+'" onblur="'+E+'"></span>';
C.className="ccl-data";
return C
}}
};
CQ_Analytics.Cookie={set:function(C,D,E){var A="";
if(E){var B=new Date();
B.setTime(B.getTime()+(E*24*60*60*1000));
A="; expires="+B.toGMTString()
}document.cookie=C+"="+D+A+"; path=/"
},read:function(B){var D=B+"=";
var A=document.cookie.split(";");
for(var C=0;
C<A.length;
C++){var E=A[C];
while(E.charAt(0)==" "){E=E.substring(1,E.length)
}if(E.indexOf(D)==0){return E.substring(D.length,E.length)
}}return null
},erase:function(A){CQ_Analytics.Cookie.set(A,"",-1)
}};
CQ_Analytics.SessionPersistence=function(){return{COOKIE_NAME:"SessionPersistence",set:function(C,D){D=D||"";
var F=this.getMap();
if(!F){F=""
}var B=F.indexOf(C+":=");
if(B==-1){F+=C+":="+D+"|"
}else{var E=F.substring(0,B);
var A=F.substring(F.indexOf("|",B+2)+1);
F=E+C+":="+D+"|"+A
}this.setMap(F)
},get:function(B){var D=this.getMap();
var C="";
if(D){var A=D.indexOf(B+":=");
if(A!=-1){C=D.substring(A+(B+":=").length,D.indexOf("|",A+2))
}}C=(C=="null"?"":(C||""));
return C
},getMap:function(){var A=CQ_Analytics.Cookie.read(this.COOKIE_NAME);
if(A){return decodeURIComponent(A)
}return null
},setMap:function(A){CQ_Analytics.Cookie.set(this.COOKIE_NAME,encodeURIComponent(A),365)
},clearMap:function(){CQ_Analytics.Cookie.erase(this.COOKIE_NAME)
},remove:function(C){var E=this.getMap();
if(!E){E=""
}var B=E.indexOf(C+":=");
if(B!=-1){var D=E.substring(0,B);
var A=E.substring(E.indexOf("|",B+2)+1);
E=D+A
}this.setMap(E)
}}
};
CQ_Analytics.Observable=function(){this.fireEvent=function(D){if(D&&this.listeners){D=D.toLowerCase();
var B=Array.prototype.slice.call(arguments,0);
for(var C=0;
C<this.listeners.length;
C++){var A=this.listeners[C];
if(D==A.event){if(A.fireFn.apply(A.scope||this||window,B)===false){return false
}}}}return true
}
};
CQ_Analytics.Observable.prototype.addListener=function(C,A,B){this.listeners=this.listeners||new Array();
if(C&&A){this.listeners.push({event:C.toLowerCase(),fireFn:A,scope:B})
}};
CQ_Analytics.Observable.prototype.removeListener=function(C,A){this.listeners=this.listeners||new Array();
if(C&&A){for(var B=0;
B<this.listeners.length;
B++){if(this.listeners[B].event==C&&this.listeners[B].fireFn==A){this.listeners.splice(B,1)
}}}};
CQ_Analytics.Observable.prototype.listeners=null;
CQ_Analytics.SessionStore=function(){};
CQ_Analytics.SessionStore.prototype=new CQ_Analytics.Observable();
CQ_Analytics.SessionStore.prototype.setProperty=function(A,B){if(this.data==null){this.init()
}this.data[A]=B;
this.fireEvent("update",A)
};
CQ_Analytics.SessionStore.prototype.init=function(){};
CQ_Analytics.SessionStore.prototype.getLabel=function(A){return A
};
CQ_Analytics.SessionStore.prototype.getLink=function(A){return A
};
CQ_Analytics.SessionStore.prototype.removeProperty=function(A){if(this.data==null){this.init()
}if(this.data[A]){delete this.data[A]
}var B=CQ.shared.XSS.getXSSPropertyName(A);
if(this.data[B]){delete this.data[B]
}this.fireEvent("update",A)
};
CQ_Analytics.SessionStore.prototype.getPropertyNames=function(A){if(this.data==null){this.init()
}A=A?A:[];
var B=new Array();
for(var C in this.data){if(CQ_Analytics.Utils.indexOf(A,C)==-1){B.push(C)
}}return B
};
CQ_Analytics.SessionStore.prototype.getSessionStore=function(){return this
};
CQ_Analytics.SessionStore.prototype.clear=function(){this.data=null
};
CQ_Analytics.SessionStore.prototype.getData=function(B){if(this.data==null){this.init()
}if(B){var A={};
for(var C in this.data){if(CQ_Analytics.Utils.indexOf(B,C)==-1){A[C]=this.data[C]
}}return A
}else{return this.data
}};
CQ_Analytics.SessionStore.prototype.reset=function(){if(this.data!=null){this.data=null;
this.fireEvent("update")
}};
CQ_Analytics.SessionStore.prototype.getProperty=function(B,A){if(this.data==null){this.init()
}if(!A){var C=CQ.shared.XSS.getXSSPropertyName(B);
if(this.data[C]){return this.data[C]
}}return this.data[B]
};
CQ_Analytics.SessionStore.prototype.getName=function(){return this.STORENAME
};
CQ_Analytics.SessionStore.prototype.addInitProperty=function(A,B){if(!this.initProperty){this.initProperty={}
}this.initProperty[A]=B
};
CQ_Analytics.SessionStore.prototype.loadInitProperties=function(B){if(B){for(var A in B){this.addInitProperty(A,B[A])
}}};
CQ_Analytics.PersistedSessionStore=function(){};
CQ_Analytics.PersistedSessionStore.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.PersistedSessionStore.prototype.STOREKEY="key";
CQ_Analytics.PersistedSessionStore.prototype.setNonPersisted=function(A){if(!this.nonPersisted){this.nonPersisted={}
}this.nonPersisted[A]=true
};
CQ_Analytics.PersistedSessionStore.prototype.isPersisted=function(A){if(!this.nonPersisted){this.nonPersisted={}
}return this.nonPersisted[A]!==true
};
CQ_Analytics.PersistedSessionStore.prototype.getStoreKey=function(){return this.STOREKEY
};
CQ_Analytics.PersistedSessionStore.prototype.persist=function(){if(this.fireEvent("beforepersist")!==false){var A=new CQ_Analytics.SessionPersistence();
A.set(this.getStoreKey(),this.toString());
this.fireEvent("persist")
}};
CQ_Analytics.PersistedSessionStore.prototype.setProperty=function(A,B){if(this.data==null){this.init()
}this.data[A]=B;
if(this.isPersisted(A)){this.persist()
}this.fireEvent("update",A)
};
CQ_Analytics.PersistedSessionStore.prototype.toString=function(){var A=null;
if(this.data){for(var B in this.data){if(this.isPersisted(B)&&this.data.hasOwnProperty(B)){A=(A===null?"":A+",");
A+=(B+"="+this.data[B])
}}}return A
};
CQ_Analytics.PersistedSessionStore.prototype.parse=function(D){var C={};
var E=D.split(",");
for(var A in E){if(E.hasOwnProperty(A)){var B=E[A].split("=");
if(B.length==2){C[B[0]]=B[1]
}}}return C
};
CQ_Analytics.PersistedSessionStore.prototype.reset=function(A){if(this.data!=null){this.data={};
this.persist();
this.data=null;
if(!A){this.fireEvent("update")
}}};
CQ_Analytics.PersistedSessionStore.prototype.removeProperty=function(A){if(this.data==null){this.init()
}if(this.data[A]){delete this.data[A];
if(this.isPersisted(A)){this.persist()
}}this.fireEvent("update",A)
};
CQ_Analytics.PersistedSessionStore.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.data=null
};
if(!CQ_Analytics.ClickstreamcloudMgr){CQ_Analytics.ClickstreamcloudMgr=function(){this.clickstreamcloud=null;
this.clickstreamcloudToServer=null;
this.stores={};
this.data=null;
this.config=null;
this.isConfigLoaded=false;
this.areStoresLoaded=false;
this.posting=false
};
CQ_Analytics.ClickstreamcloudMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.ClickstreamcloudMgr.prototype.STOREKEY="CLICKSTREAMCLOUD";
CQ_Analytics.ClickstreamcloudMgr.prototype.STORENAME="clickstreamcloud";
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE_PAGELOAD=1;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE_TIMER=2;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE_DATAUPDATE=4;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_TIMER=600;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_PROCESS_TIMER=60;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE=6;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_PATH="/var/statistics/";
CQ_Analytics.ClickstreamcloudMgr.prototype.CONFIG_PATH=CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/clickstreamcloud/content/config.json",true);
CQ_Analytics.ClickstreamcloudMgr.prototype.init=function(){this.clickstreamcloud={};
this.clickstreamcloudToServer={};
var B=new CQ_Analytics.SessionPersistence();
var D=B.get(this.getStoreKey());
if(D){this.data=this.parse(D)
}else{this.data={}
}if(CQ_Analytics.CCM&&this.isMode(CQ_Analytics.CCM.POST_MODE_TIMER)){var A=this;
var C=function(){A.timer=window.setInterval(function(){try{var F=parseInt(A.data.lastPost);
var H=false;
if(isNaN(F)){H=true
}else{var G=new Date().getTime();
if(G>F+CQ_Analytics.CCM.POST_TIMER*1000){H=true
}}}catch(E){}if(H){A.post()
}},CQ_Analytics.POST_PROCESS_TIMER*1000)
};
if(this.areStoresLoaded){C.call(this)
}else{this.addListener("storesloaded",C,this)
}}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getSessionId=function(){if(!this.data.sessionId){this.setSessionId(CQ_Analytics.Utils.getUID())
}return this.data.sessionId
};
CQ_Analytics.ClickstreamcloudMgr.prototype.setSessionId=function(A){if(A){this.setProperty("sessionId",A)
}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getVisitorId=function(){return this.data.visitorId
};
CQ_Analytics.ClickstreamcloudMgr.prototype.setVisitorId=function(A){this.setProperty("visitorId",A)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getId=function(){var A=this.getVisitorId();
if(!A){return this.getSessionId()
}return A
};
CQ_Analytics.ClickstreamcloudMgr.prototype.isAnonymous=function(){var A=this.getVisitorId();
return(!A)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.isMode=function(A){return(CQ_Analytics.CCM.POST_MODE&A)>0
};
CQ_Analytics.ClickstreamcloudMgr.prototype.get=function(A){if(this.clickstreamcloud==null){this.init()
}if(A){return this.clickstreamcloudToServer
}return this.clickstreamcloud
};
CQ_Analytics.ClickstreamcloudMgr.prototype.register=function(C){if(this.clickstreamcloud==null){this.init()
}var A=this;
this.clickstreamcloud[C.getName()]=C.getData();
this.stores[C.getName()]=C;
var B=this.getStoreConfig(C.getName());
if(B.stats!==false&&B.stats!="false"){this.clickstreamcloudToServer[C.getName()]=C.getData(B.excludedFromStats)
}C.addListener("update",function(){A.update(C)
});
if(this.isMode(CQ_Analytics.CCM.POST_MODE_DATAUPDATE)){C.addListener("persist",function(){if(A.areStoresLoaded){A.post(C)
}})
}this.addListener("clear",function(){C.clear()
});
this.fireEvent("storeupdate",C)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.update=function(B){if(this.clickstreamcloud==null){this.init()
}this.clickstreamcloud[B.getName()]=B.getData();
var A=this.getStoreConfig(B.getName());
if(A.stats!==false&&A.stats!="false"){this.clickstreamcloudToServer[B.getName()]=B.getData(A.excludedFromStats)
}this.fireEvent("storeupdate",B)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.startPosting=function(){this.posting=true
};
CQ_Analytics.ClickstreamcloudMgr.prototype.stopPosting=function(){this.posting=false
};
CQ_Analytics.ClickstreamcloudMgr.prototype.post=function(){if(this.posting){try{var E=this.getCCMToJCR();
var D=CQ_Analytics.Utils.getTimestamp();
E["./jcr:primaryType"]="nt:unstructured";
E["./sessionId"]=this.getSessionId();
var C=this.POST_PATH+this.getName()+"/";
if(this.isAnonymous()){var A=CQ_Analytics.Utils.insert(this.getId(),2,"/");
C+="anonymous/"+A+"/"+D
}else{C+="users/"+this.getId()+"/"+D
}CQ_Analytics.Utils.post(C,null,E);
this.setProperty("lastPost",D)
}catch(B){}}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getCCMToJCR=function(){var G=this.get(true);
var H={};
for(var D in G){var C=G[D],B=encodeURIComponent(D);
var E=typeof C;
if(E=="object"){for(var F in C){var A=C[F];
F=F.replace(":","/");
H["./"+D+"/./"+F]=A
}}else{H["./"+D]=C
}}return H
},CQ_Analytics.ClickstreamcloudMgr.prototype.getName=function(){return this.STORENAME
};
CQ_Analytics.ClickstreamcloudMgr.prototype.clear=function(){this.clickstreamcloud=null;
this.clickstreamcloudToServer=null;
this.fireEvent("clear")
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getRegisteredStore=function(A){return this.stores&&this.stores[A]?this.stores[A]:null
};
CQ_Analytics.ClickstreamcloudMgr.prototype.loadConfig=function(c){var setConfig=function(ccm,config){ccm.config=config;
ccm.isConfigLoaded=true;
ccm.fireEvent("configloaded");
ccm.fireEvent("storesloaded");
ccm.areStoresLoaded=true;
if(ccm.isMode(CQ_Analytics.CCM.POST_MODE_PAGELOAD)){ccm.post()
}};
if(c){setConfig(this,c)
}else{var params={};
params.path=CQ_Analytics.Utils.getPagePath();
params.cq_ck=new Date().valueOf();
var url=this.CONFIG_PATH;
url+="?"+CQ_Analytics.Utils.urlEncode(params);
CQ_Analytics.Utils.load(url,function(data,status,response){var config={};
try{config=eval("config = "+response.responseText)
}catch(error){}setConfig(this,config)
},this)
}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getConfig=function(){return this.config
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getStoreConfig=function(A){if(this.config&&this.config.configs&&this.config.configs[A]&&this.config.configs[A]["store"]){return this.config.configs[A]["store"]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getEditConfig=function(A){if(this.config&&this.config.configs&&this.config.configs[A]&&this.config.configs[A]["edit"]){return this.config.configs[A]["edit"]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getUIConfig=function(A){if(this.config&&this.config.configs&&this.config.configs[A]&&this.config.configs[A]["ui"]){return this.config.configs[A]["ui"]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getInitialData=function(A){if(this.config&&this.config.data&&this.config.data[A]){return this.config.data[A]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr=CQ_Analytics.CCM=new CQ_Analytics.ClickstreamcloudMgr();
$CQ(function(){CQ_Analytics.ClickstreamcloudMgr.loadConfig()
});
window.setTimeout(function(){CQ_Analytics.CCM.init()
},1);
CQ_Analytics.Utils.addListener(window,"unload",function(){try{for(var B in CQ_Analytics.ClickstreamcloudMgr){delete CQ_Analytics.ClickstreamcloudMgr[B]
}CQ_Analytics.ClickstreamcloudMgr=null
}catch(A){}CQ_Analytics.CCM=null
})
}if(!CQ_Analytics.SegmentMgr){CQ_Analytics.SegmentMgr=function(){this.SEGMENTATION_ROOT="/etc/segmentation";
this.SEGMENT_SELECTOR=".segment.js";
this.SEGMENTATION_SCRIPT_LOADER="cq-segmentation-loader";
this.segments={};
this.boosts={};
var A=this;
this.fireUpdate=function(){A.fireEvent("update")
}
};
CQ_Analytics.SegmentMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.SegmentMgr.prototype.STORENAME="segments";
CQ_Analytics.SegmentMgr.prototype.register=function(A,C,B){this.segments[A]=C;
this.boosts[A]=!isNaN(B)?parseInt(B):0;
this.fireUpdate()
};
CQ_Analytics.SegmentMgr.prototype.resolveArray=function(E,G,B){G=G||CQ_Analytics.ClickstreamcloudMgr.get();
if(!(E instanceof Array)){return this.resolve(E,G)
}B=(B=="AND"?"AND":"OR");
var A=(B=="AND");
for(var D=0;
D<E.length;
D++){var F=E[D];
var C=this.resolve(F,G);
if(B=="AND"){if(C!==true){return C
}}else{if(C===true){return true
}}}return A
};
CQ_Analytics.SegmentMgr.prototype.resolve=function(segmentPath,clickstreamcloud){clickstreamcloud=clickstreamcloud||CQ_Analytics.ClickstreamcloudMgr.get();
if(!segmentPath){return false
}if(segmentPath instanceof Array){return this.resolveArray(segmentPath,clickstreamcloud)
}if(segmentPath.indexOf(this.SEGMENTATION_ROOT)!=0){return false
}if(segmentPath==this.SEGMENTATION_ROOT){return true
}if(!this.segments[segmentPath]){return true
}var parent=segmentPath.substring(0,segmentPath.lastIndexOf("/"));
if(parent.indexOf(this.SEGMENTATION_ROOT)==0){var pres=this.resolve(parent,clickstreamcloud);
if(pres!==true){return pres
}}var rules="function(clickstreamcloud) { return true ";
rules+=" && ( "+this.segments[segmentPath]+" ) ";
rules+=";}";
var res=true;
try{var f=null;
eval("f = "+rules+"");
var e=(f==null||f(clickstreamcloud));
res=res&&(e===true)
}catch(error){return"Unresolved - Error while evaluating segment "+segmentPath+" : "+error.message
}return res
};
CQ_Analytics.SegmentMgr.prototype.getResolved=function(C){C=C||CQ_Analytics.ClickstreamcloudMgr.get();
var A=new Array();
for(var B in this.segments){if(this.resolve(B,C)===true){A.push(B)
}}return A
};
CQ_Analytics.SegmentMgr.prototype.getMaxBoost=function(D,F){if(!(D instanceof Array)){return this.getBoost(D)
}var B=0;
for(var C=0;
C<D.length;
C++){var E=D[C];
if(this.resolve(E,F)===true){var A=this.boosts[E]||0;
if(A>B){B=A
}}}return B
};
CQ_Analytics.SegmentMgr.prototype.getBoost=function(A){if(!(A instanceof Array)){A=[A]
}return this.boosts[A]||0
};
CQ_Analytics.SegmentMgr.prototype.reload=function(path){var url=path;
if(!url){url=this.SEGMENTATION_ROOT
}if(url){if(url.indexOf(this.SEGMENT_SELECTOR)==-1){url+=this.SEGMENT_SELECTOR
}try{CQ_Analytics.Utils.load(url,function(config,status,response){if(response&&response.responseText){eval(response.responseText)
}},this);
var response=CQ.HTTP.get(scripts[i].src)
}catch(err){}}};
CQ_Analytics.SegmentMgr.prototype.getSessionStore=function(){return this
};
CQ_Analytics.SegmentMgr.prototype.getProperty=function(A){return A
};
CQ_Analytics.SegmentMgr.prototype.getLink=function(A){return A+".html"
};
CQ_Analytics.SegmentMgr.prototype.getLabel=function(C){if(C){var B=C;
var A=B.lastIndexOf("/");
if(A!=-1){B=B.substring(A+1,B.length)
}var D=this.resolve(C);
if(D===true){return B
}else{if(D!==true){return'<span class="invalid" title="'+D+'" alt="'+D+'">'+B+"</span>"
}}}return C
};
CQ_Analytics.SegmentMgr.prototype.getPropertyNames=function(){return this.getResolved()
};
CQ_Analytics.SegmentMgr=new CQ_Analytics.SegmentMgr();
CQ_Analytics.ClickstreamcloudMgr.addListener("storeupdate",CQ_Analytics.SegmentMgr.fireUpdate);
CQ_Analytics.Utils.addListener(window,"unload",function(){try{for(var B in CQ_Analytics.SegmentMgr){delete CQ_Analytics.SegmentMgr[B]
}}catch(A){}CQ_Analytics.SegmentMgr=null
})
}if(!CQ_Analytics.StrategyMgr){CQ_Analytics.StrategyMgr=function(){this.strategies={}
};
CQ_Analytics.StrategyMgr.prototype={};
CQ_Analytics.StrategyMgr.prototype.isRegistered=function(A){return !!this.strategies[A]
};
CQ_Analytics.StrategyMgr.prototype.register=function(B,A){if(typeof A=="function"){this.strategies[B]=A
}};
CQ_Analytics.StrategyMgr.prototype.choose=function(B,A){if(A.length==1){return A[0]
}if(this.strategies[B]){return this.strategies[B].call(this,A)
}};
CQ_Analytics.StrategyMgr=new CQ_Analytics.StrategyMgr()
}CQ_Analytics.StrategyMgr.register("clickstream-score",function(H){if(H.length==1){return H[0]
}var A=[];
if(CQ_Analytics.TagCloudMgr){var K=CQ_Analytics.TagCloudMgr.getTags();
K=K||{};
var J=-1;
for(var E=0;
E<H.length;
E++){var G=0;
var I=H[E].tags;
if(I){for(var D=0;
D<I.length;
D++){var F=I[D].tagID;
G+=parseInt(K[F])||0
}}if(G==J){A.push(H[E])
}else{if(G>J){A=[];
A.push(H[E]);
J=G
}}}}else{A=H
}if(A.length==1){return A[0]
}var B=null;
if(CQ_Analytics.PageDataMgr){B=CQ_Analytics.PageDataMgr.getProperty("random")
}if(!B){B=window.CQ_StrategyRandom
}if(!B){B=window.CQ_StrategyRandom=Math.random()
}if(parseFloat(B)>1){B=1/B
}if(parseFloat(B)==1){B=0
}var C=Math.floor(B*A.length);
return A[C]
});
CQ_Analytics.StrategyMgr.register("first",function(A){return A[0]
});
CQ_Analytics.StrategyMgr.register("random",function(C){var A=null;
if(CQ_Analytics.PageDataMgr){A=CQ_Analytics.PageDataMgr.getProperty("random")
}if(!A){A=window.CQ_StrategyRandom
}if(!A){A=window.CQ_StrategyRandom=Math.random()
}if(parseFloat(A)>1){A=1/A
}if(parseFloat(A)==1){A=0
}var B=Math.floor(A*C.length);
return C[B]
});
if(!CQ_Analytics.ClickstreamcloudUI){CQ_Analytics.ClickstreamcloudUI=function(){this.SHOW_BOX_COOKIE="show-clickstreamcloud";
this.BOX_ID="clickstreamcloud";
this.box=null;
this.top=null;
this.sections=null;
this.bottom=null;
this.nbSection=0;
this.isRendered=false
};
CQ_Analytics.ClickstreamcloudUI.prototype=new CQ_Analytics.Observable();
CQ_Analytics.ClickstreamcloudUI.prototype.createBox=function(C){var A=this;
this.box=document.createElement("div");
this.box.id=this.BOX_ID;
this.box.style.display="none";
var D=document.createElement("div");
this.box.appendChild(D);
this.top=document.createElement("div");
this.top.className="ccl-header ccl-header-close";
this.addListener("close",function(){A.onVisibilityChange()
});
this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createStaticLink("","#ccl",""));
this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink("Close",function(){A.box.style.display="none";
A.fireEvent("close")
},{className:"ccl-close"},"#ccl"));
if(this.hideLoadLink===false){this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink("Load",function(){A.fireEvent("loadclick")
},{className:"ccl-load"},"#ccl"))
}if(this.hideEditLink===false){this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink("Edit",function(){A.fireEvent("editclick")
},{className:"ccl-edit"},"#ccl"))
}D.appendChild(this.top);
this.sections=document.createElement("div");
D.appendChild(this.sections);
this.bottom=document.createElement("div");
this.bottom.className="ccl-spacer";
D.appendChild(this.bottom);
var B=RUZEE.ShadedBorder.create({corner:10,border:2,shadow:21});
B.render(D);
C.appendChild(this.box);
if(D.onresize){this.addListener("show",D.onresize,D)
}};
CQ_Analytics.ClickstreamcloudUI.prototype.init=function(B){B=B||{};
this.parentId=B.target;
var C=document.getElementById(this.parentId);
if(C){this.version=B.version||CQ_Analytics.ClickstreamcloudUI.VERSION_FULL;
this.hideEditLink=B.hideEditLink!==false;
this.hideLoadLink=B.hideLoadLink!==false;
this.disableKeyShortcut=B.disableKeyShortcut!==false;
if(CQ_Analytics.Cookie.read(this.SHOW_BOX_COOKIE)=="true"){this.show()
}if(!this.disableKeyShortcut){var A=this;
CQ_Analytics.Utils.registerDocumentEventHandler("onkeydown",CQ_Analytics.Utils.eventWrapper(function(D,E){if(D.ctrlKey&&D.altKey&&E=="C".charCodeAt(0)){A.toggle()
}}))
}}};
CQ_Analytics.ClickstreamcloudUI.prototype.onVisibilityChange=function(){CQ_Analytics.Cookie.set(this.SHOW_BOX_COOKIE,this.isVisible()?"true":"false",365)
};
CQ_Analytics.ClickstreamcloudUI.prototype.isVisible=function(){return(this.box!=null&&this.box.style.display!="none")
};
CQ_Analytics.ClickstreamcloudUI.prototype.toggle=function(){if(this.isVisible()){this.hide()
}else{this.show()
}};
CQ_Analytics.ClickstreamcloudUI.prototype.register=function(D,A,C){var B=function(){var E=new CQ_Analytics.ClickstreamcloudUI.Section(D,this.version,A||{},C);
this.addSection(E);
D.addListener("update",E.reset,E)
};
if(this.isRendered){B.call(this)
}else{this.addListener("render",B,this)
}};
CQ_Analytics.ClickstreamcloudUI.prototype.addSection=function(C,A){if(A<this.nbSection&&this.nbSection>0){var B=this.nbSection;
var D=this.sections.lastChild;
while(B>A+1){B--;
D=D.previousSibling
}this.sections.insertBefore(C.get(),D)
}else{this.sections.appendChild(C.get())
}this.nbSection++
};
CQ_Analytics.ClickstreamcloudUI.prototype.removeSection=function(A){this.sections.removeChild(A);
this.nbSection--
};
CQ_Analytics.ClickstreamcloudUI.prototype.show=function(){if(!this.isRendered){var A=document.getElementById(this.parentId);
if(A){this.createBox(A);
this.isRendered=true;
this.fireEvent("render")
}}this.box.style.display="block";
this.onVisibilityChange();
this.fireEvent("show")
};
CQ_Analytics.ClickstreamcloudUI.prototype.hide=function(){if(this.box!=null){this.box.style.display="none"
}this.onVisibilityChange()
};
CQ_Analytics.ClickstreamcloudUI.prototype.MODE_TEXTFIELD="textfield";
CQ_Analytics.ClickstreamcloudUI.prototype.MODE_LINK="link";
CQ_Analytics.ClickstreamcloudUI.prototype.MODE_STATIC="static";
CQ_Analytics.ClickstreamcloudUI.prototype.VERSION_FULL="full";
CQ_Analytics.ClickstreamcloudUI.prototype.VERSION_LIGHT="light";
CQ_Analytics.ClickstreamcloudUI.prototype.Section=function(D,A,B,C){this.contentbox=null;
this.section=null;
this.sessionStore=D;
this.version=A;
this.title=B.title;
this.mode=B.mode||CQ_Analytics.ClickstreamcloudUI.MODE_TEXTFIELD;
this.renderer=C;
this.buildContentBox=function(){if(this.renderer){this.contentbox=this.renderer.call(this.sessionStore)
}else{this.contentbox=document.createElement("p");
this.contentbox.className="ccl-sectioncontent";
var G=CQ_Analytics.CCM.getStoreConfig(this.sessionStore.getName());
var K=this.sessionStore.getPropertyNames(G.invisible);
var I=this.sessionStore.getData();
if(this.version==CQ_Analytics.ClickstreamcloudUI.VERSION_LIGHT){var H=new Array();
var M=new Array();
for(var J=0;
J<K.length;
J++){var F=K[J];
var P=this.sessionStore.getProperty(F);
if(P==F){H.push(F);
M.push(F)
}else{var O=CQ.shared.XSS.getXSSTablePropertyValue(I,F);
if(CQ_Analytics.Utils.indexOf(H,O)==-1){H.push(O);
F=CQ.shared.XSS.KEY_REGEXP.test(F)?F.substring(0,F.length-4):F;
M.push(F)
}}}for(var J=0,E=0;
J<H.length;
J++){var F=M[J];
var N=H[J];
if(this.mode==CQ_Analytics.ClickstreamcloudUI.MODE_LINK){var L=CQ_Analytics.Utils.externalize(this.sessionStore.getLink(F),true);
this.addLink(this.sessionStore.getLabel(F),L,"ccl-data-light",F)
}else{this.addStaticText(N,"ccl-data-light",F)
}E++;
if(E>3){E=0;
this.addLineBreak()
}}}else{for(var J=0;
J<K.length;
J++){var F=K[J];
var O=CQ.shared.XSS.getXSSTablePropertyValue(I,F);
F=CQ.shared.XSS.KEY_REGEXP.test(F)?F.substring(0,F.length-4):F;
if(this.mode==CQ_Analytics.ClickstreamcloudUI.MODE_TEXTFIELD){this.addNameValueField(this.sessionStore.getLabel(F),O,F,"ccl-data",F)
}else{if(this.mode==CQ_Analytics.ClickstreamcloudUI.MODE_LINK){var L=CQ_Analytics.Utils.externalize(this.sessionStore.getLink(F),true);
this.addLink(this.sessionStore.getLabel(F),L,"ccl-data",F)
}else{this.addStaticText(this.sessionStore.getLabel(F),"ccl-data",F)
}}this.contentbox.appendChild(document.createTextNode(" "))
}}}};
this.buildSection=function(){if(this.contentbox==null){this.buildContentBox()
}if(this.section==null){this.section=document.createElement("div")
}var F=document.createElement("div");
F.className="ccl-header";
this.section.appendChild(F);
var E=document.createElement("div");
E.innerHTML=this.title;
E.className="ccl-title";
F.appendChild(E);
this.section.appendChild(this.contentbox)
}
};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype=new CQ_Analytics.Observable();
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.get=function(){if(this.section==null){this.buildSection()
}return this.section
};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.reset=function(){if(!this.isReseting){this.isReseting=true;
if(this.section!=null){while(this.section.hasChildNodes()){this.section.removeChild(this.section.firstChild)
}this.contentbox=null
}this.buildSection();
this.isReseting=false
}};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addNameValueField=function(C,D,B,A,E){this.contentbox.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createNameValue(B,D,A,E))
};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addLink=function(E,C,A,D){if(C){var B=document.createElement("span");
B.className=A||"ccl-data";
B.title=D;
B.alt=D;
B.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createStaticLink(E,C,D));
this.contentbox.appendChild(B)
}else{this.addStaticText(E)
}};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addStaticText=function(C,A,B){if(C){this.contentbox.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createText(C,A,B))
}};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addLineBreak=function(){this.contentbox.appendChild(document.createElement("br"))
};
CQ_Analytics.ClickstreamcloudUI=new CQ_Analytics.ClickstreamcloudUI();
CQ_Analytics.CCM.addListener("configloaded",function(){CQ_Analytics.ClickstreamcloudUI.init(CQ_Analytics.CCM.getConfig()["ui"])
})
}if(!CQ_Analytics.ProfileDataMgr){CQ_Analytics.ProfileDataMgr=function(){this.addListener("beforepersist",function(){this.checkAuthorizableId()
},this)
};
CQ_Analytics.ProfileDataMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.ProfileDataMgr.prototype.STOREKEY="PROFILEDATA";
CQ_Analytics.ProfileDataMgr.prototype.STORENAME="profile";
CQ_Analytics.ProfileDataMgr.prototype.LOADER_PATH=CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/profileloader/content/load.js",true);
CQ_Analytics.ProfileDataMgr.prototype.PROFILE_LOADER=CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/profileloader/content/load.json",true);
CQ_Analytics.ProfileDataMgr.prototype.init=function(){var A=new CQ_Analytics.SessionPersistence();
var B=A.get(this.getStoreKey());
if(!B||B==""){this.data={};
for(var C in this.initProperty){this.data[C]=this.initProperty[C]
}}else{this.data=this.parse(B)
}this.persist();
this.fireEvent("update")
};
CQ_Analytics.ProfileDataMgr.prototype.checkAuthorizableId=function(){if(!this.data){this.init()
}if(this.data.authorizableId){CQ_Analytics.CCM.setVisitorId(this.data.authorizableId)
}else{CQ_Analytics.CCM.setVisitorId("")
}};
CQ_Analytics.ProfileDataMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.ProfileDataMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.ProfileDataMgr.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.data=null;
this.initProperty={}
};
CQ_Analytics.ProfileDataMgr.prototype.loadProfile=function(authorizableId){var url=this.PROFILE_LOADER;
url=CQ_Analytics.Utils.addParameter(url,"authorizableId",authorizableId);
try{var object=CQ.shared.HTTP.eval(url);
if(object){CQ_Analytics.ProfileDataMgr.clear();
for(var p in object){this.initProperty[p]=object[p]
}CQ_Analytics.ProfileDataMgr.reset();
CQ_Analytics.ProfileDataMgr.init();
if(CQ_Analytics.ClickstreamcloudEditor){CQ_Analytics.ClickstreamcloudEditor.reload()
}return true
}}catch(error){if(console&&console.log){console.log("error",error)
}}return false
};
CQ_Analytics.ProfileDataMgr=new CQ_Analytics.ProfileDataMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
this.checkAuthorizableId();
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.ProfileDataMgr)
}if(!CQ_Analytics.TagCloudMgr){CQ_Analytics.TagCloudMgr=function(){this.data=null;
this.addedTags={};
this.frequencies=null;
this.initialTags=null;
this.initialAddedTags={};
this.copyObject=function(C){var B={};
for(var A in C){B[A]=C[A]
}return B
}
};
CQ_Analytics.TagCloudMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.TagCloudMgr.prototype.STOREKEY="TAGCLOUD";
CQ_Analytics.TagCloudMgr.prototype.STORENAME="tagcloud";
CQ_Analytics.TagCloudMgr.prototype.parseTagList=function(A){var C={};
var B=A.split(",");
for(var D in B){if(B.hasOwnProperty(D)){var E=B[D].split("=");
if(E.length==2){C[E[0]]=parseInt(E[1])
}}}return C
};
CQ_Analytics.TagCloudMgr.prototype.parseString=function(A){this.data=this.parseTagList(A);
return this
};
CQ_Analytics.TagCloudMgr.prototype.add=function(A){this.addedTags[A]=true;
this.data[A]=(this.data[A]||0)+1
};
CQ_Analytics.TagCloudMgr.prototype.each=function(B){for(var A in this.data){if(this.data.hasOwnProperty(A)){B(A,this.data[A])
}}};
CQ_Analytics.TagCloudMgr.prototype.calculateFrequencies=function(){var C={};
var A=[];
this.each(function(D,E){if(!C[E]){A.push(E)
}C[E]=true
});
A.sort(function B(E,D){if(E>D){return 1
}if(E<D){return -1
}return 0
});
return A
};
CQ_Analytics.TagCloudMgr.prototype.calculateNtile=function(B,C){if(this.frequencies===null){this.frequencies=this.calculateFrequencies()
}var A=0;
while(true){if((A>=(this.frequencies.length-1))||(this.frequencies[A]>=B)){return Math.ceil((A+1)/this.frequencies.length*C)
}A++
}};
CQ_Analytics.TagCloudMgr.prototype.getTags=function(){return this.data
};
CQ_Analytics.TagCloudMgr.prototype.getData=function(A){return this.getTags()
};
CQ_Analytics.TagCloudMgr.prototype.getTag=function(A){return this.data[A]>0?this.data[A]:0
};
CQ_Analytics.TagCloudMgr.prototype.init=function(A){var B=new CQ_Analytics.SessionPersistence();
var D=B.get(this.getStoreKey());
D=D===null?"":new String(D);
this.data=this.parseTagList(D);
if(A){for(var C in A){if(A.hasOwnProperty(C)){this.add(A[C])
}}}this.initialTags=this.copyObject(this.data);
this.initialAddedTags=this.copyObject(this.addedTags);
this.persist();
this.fireEvent("update")
};
CQ_Analytics.TagCloudMgr.prototype.setProperty=function(A,B){if(this.data==null){this.init()
}if(B>0){this.addedTags[A]=true;
this.data[A]=B>0?B:0
}else{delete this.addedTags[A];
delete this.data[A]
}this.persist();
this.fireEvent("update")
};
CQ_Analytics.TagCloudMgr.prototype.reset=function(){this.clear();
this.fireEvent("update")
};
CQ_Analytics.TagCloudMgr.prototype.getProperty=function(A){if(this.data==null){this.init()
}return this.data[A]>0?this.data[A]:0
};
CQ_Analytics.TagCloudMgr.prototype.removeProperty=function(A){if(this.data==null){this.init()
}this.setProperty(A,0)
};
CQ_Analytics.TagCloudMgr.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.addedTags={};
this.data={}
};
CQ_Analytics.TagCloudMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.TagCloudMgr.prototype.getLabel=function(B){if(B){var C=B.split(":");
var A=C[C.length-1].split("/");
B=A[A.length-1]
}return B
};
CQ_Analytics.TagCloudMgr.prototype.createHTMLElement=function(){var C=document.createElement("div");
var B=document.createElement("p");
var A=this;
B.className="cloud";
this.each(function(E,H){var D=document.createElement("span");
var G=A.calculateNtile(H,10);
var I=E.split(":");
var F=I[I.length-1].split("/");
D.innerHTML=F[F.length-1]+"<span class='count tag"+G+"'>&nbsp;("+H+")</span>";
D.className="tag";
if(A.addedTags[E]){D.className+=" new"
}D.className+=" tag"+G;
D.title=E+" ("+H+")";
B.appendChild(D);
B.appendChild(document.createTextNode(" "))
});
C.appendChild(B);
return C
};
CQ_Analytics.TagCloudMgr=new CQ_Analytics.TagCloudMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){var A=CQ_Analytics.CCM.getInitialData(this.getName());
if(A&&A.tags){this.init(A.tags)
}CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()),this.createHTMLElement);
CQ_Analytics.CCM.register(this)
},CQ_Analytics.TagCloudMgr)
}if(!CQ_Analytics.PageDataMgr){CQ_Analytics.PageDataMgr=function(){};
CQ_Analytics.PageDataMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.PageDataMgr.prototype.STORENAME="pagedata";
CQ_Analytics.PageDataMgr.prototype.init=function(){this.data={};
for(var A in this.initProperty){this.data[A]=this.initProperty[A]
}this.fireEvent("update")
};
CQ_Analytics.PageDataMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.PageDataMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.PageDataMgr=new CQ_Analytics.PageDataMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
this.init();
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.PageDataMgr)
}CQ_Analytics.BrowserInfo=function(){var N=navigator.userAgent.toLowerCase();
var Q=function(U){return U.test(N)
};
this.browserName="Unresolved";
var S=Q(/opera/);
this.browserName=S?"Opera":this.browserName;
var O=Q(/webkit/);
this.browserName=O?"WebKit":this.browserName;
var F=Q(/chrome/);
this.browserName=F?"Chrome":this.browserName;
var P=!F&&Q(/safari/);
if(P){var D=P&&Q(/applewebkit\/4/);
this.browserName=D?"Safari 2":this.browserName;
var A=P&&Q(/version\/3/);
this.browserName=A?"Safari 3":this.browserName;
var T=P&&Q(/version\/4/);
this.browserName=T?"Safari 4":this.browserName
}var M=!S&&Q(/msie/);
if(M){var K=M&&Q(/msie 7/);
this.browserName=K?"IE 7":this.browserName;
var J=M&&Q(/msie 8/);
this.browserName=J?"IE 8":this.browserName;
var L=M&&!K&&!J;
this.browserName=L?"IE 6":this.browserName
}var I=!O&&Q(/gecko/);
if(I){var E=I&&Q(/rv:1\.8/);
this.browserName=E?"Firefox 2":this.browserName;
var B=I&&Q(/rv:1\.9/);
this.browserName=B?"Firefox 3":this.browserName
}this.OSName="Unresolved";
var R=Q(/windows|win32/);
if(R){this.OSName=R?"Windows":this.OSName;
this.OSName=Q(/windows 98|win98/)?"Windows 98":this.OSName;
this.OSName=Q(/windows nt 5.0|windows 2000/)?"Windows 2000":this.OSName;
this.OSName=Q(/windows nt 5.1|windows xp/)?"Windows XP":this.OSName;
this.OSName=Q(/windows nt 5.2/)?"Windows Server 2003":this.OSName;
this.OSName=Q(/windows nt 6.0/)?"Windows Vista":this.OSName;
this.OSName=Q(/windows nt 7.0/)?"Windows 7":this.OSName;
this.OSName=Q(/windows nt 4.0|winnt4.0|winnt/)?"Windows NT 4.0":this.OSName;
this.OSName=Q(/windows me/)?"Windows ME":this.OSName
}var G=Q(/macintosh|mac os/);
this.OSName=G?"Mac OS":this.OSName;
var G=Q(/mac os x/);
this.OSName=G?"Mac OS X":this.OSName;
var H=Q(/linux/);
this.OSName=H?"Linux":this.OSName;
var C=/^https/i.test(window.location.protocol);
this.screenResolution=screen.width+"x"+screen.height
};
CQ_Analytics.BrowserInfo.prototype={getBrowserName:function(){return this.browserName
},getOSName:function(){return this.OSName
},getScreenResolution:function(){return this.screenResolution
}};
if(!CQ_Analytics.SurferInfoMgr){CQ_Analytics.SurferInfoMgr=function(){};
CQ_Analytics.SurferInfoMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.SurferInfoMgr.prototype.STOREKEY="SURFERINFO";
CQ_Analytics.SurferInfoMgr.prototype.STORENAME="surferinfo";
CQ_Analytics.SurferInfoMgr.prototype.init=function(){var A=new CQ_Analytics.SessionPersistence();
var B=A.get(this.getStoreKey());
if(!B||B==""){this.data={};
for(var C in this.initProperty){this.data[C]=this.initProperty[C]
}}else{this.data=this.parse(B);
if(this.data.keywords!=this.initProperty.keywords){this.data.keywords=this.initProperty.keywords
}}this.persist();
this.fireEvent("update")
};
CQ_Analytics.SurferInfoMgr.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.data=null;
this.initProperty={}
};
CQ_Analytics.SurferInfoMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.SurferInfoMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.SurferInfoMgr=new CQ_Analytics.SurferInfoMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
var A=new CQ_Analytics.BrowserInfo();
this.addInitProperty("browser",A.getBrowserName());
this.addInitProperty("OS",A.getOSName());
this.addInitProperty("resolution",A.getScreenResolution());
this.setNonPersisted("mouse X");
this.setNonPersisted("mouse Y");
if(CQ_Analytics.MousePositionMgr){CQ_Analytics.MousePositionMgr.addListener("update",function(){this.setProperty("mouse X",CQ_Analytics.MousePositionMgr.getProperty("x"));
this.setProperty("mouse Y",CQ_Analytics.MousePositionMgr.getProperty("y"))
},this)
}CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.SurferInfoMgr)
}if(!CQ_Analytics.MousePositionMgr){CQ_Analytics.MousePositionMgr=function(){this.position={x:0,y:0};
this.getPageX=function(C){var B=C.pageX;
if(!B&&0!==B){B=C.clientX||0
}return B
};
this.getPageY=function(B){var C=B.pageY;
if(!C&&0!==C){C=B.clientY||0
}return C
};
var A=this;
this.timer=null;
$CQ(document).bind("mousemove",function(E,D,C,H){var F=E||window.event;
if(F){if(!A.timer){var B=A.getPageX(F);
var G=A.getPageY(F);
A.timer=setTimeout(function(){A.setPosition(B,G);
A.timer=null
},500)
}}})
};
CQ_Analytics.MousePositionMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.MousePositionMgr.prototype.STORENAME="mouseposition";
CQ_Analytics.MousePositionMgr.prototype.setPosition=function(A,B){this.position.x=A;
this.position.y=B;
this.fireEvent("update")
};
CQ_Analytics.MousePositionMgr.prototype.getProperty=function(A){return this.position[A]
};
CQ_Analytics.MousePositionMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.MousePositionMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.MousePositionMgr.prototype.getPropertyNames=function(){var A=new Array();
for(var B in this.position){A.push(B)
}return A
};
CQ_Analytics.MousePositionMgr.prototype.getSessionStore=function(){return this
};
CQ_Analytics.MousePositionMgr.prototype.getData=function(A){return this.position
};
CQ_Analytics.MousePositionMgr.prototype.clear=function(){this.position={}
};
CQ_Analytics.MousePositionMgr=new CQ_Analytics.MousePositionMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){CQ_Analytics.CCM.register(this)
},CQ_Analytics.MousePositionMgr)
}if(!CQ_Analytics.EventDataMgr){CQ_Analytics.EventDataMgr=function(){};
CQ_Analytics.EventDataMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.EventDataMgr.prototype.STORENAME="eventdata";
CQ_Analytics.EventDataMgr.prototype.init=function(){this.data={};
for(var A in this.initProperty){this.data[A]=this.initProperty[A]
}this.fireEvent("update")
};
CQ_Analytics.EventDataMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.EventDataMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.EventDataMgr=new CQ_Analytics.EventDataMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
this.init();
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.EventDataMgr)
}if(CQ_Analytics.SegmentMgr&&!CQ_Analytics.SegmentMgr.isResolvedRegistered){CQ_Analytics.SegmentMgr.isResolvedRegistered=true;
CQ_Analytics.CCM.addListener("configloaded",function(){CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()))
},CQ_Analytics.SegmentMgr)
}if(!window.CQ_Context){window.CQ_Context=function(){};
window.CQ_Context.prototype=new CQ_Analytics.Observable();
window.CQ_Context.prototype.getProfile=function(){return(function(){return{getUserId:function(){return this.getProperty("authorizableId")
},getDisplayName:function(){var A=this.getProperty("formattedName");
if(A){return A
}A=this.getProperty("displayName");
if(A){return A
}return this.getUserId()
},getFirstname:function(){return this.getProperty("givenName")
},getLastname:function(){return this.getProperty("familyName")
},getEmail:function(){return this.getProperty("email")
},getProperty:function(A){if(CQ_Analytics&&CQ_Analytics.ProfileDataMgr){return CQ_Analytics.ProfileDataMgr.getProperty(A)
}return""
},getProperties:function(){if(CQ_Analytics&&CQ_Analytics.ProfileDataMgr){return CQ_Analytics.ProfileDataMgr.getData()
}return{}
},getAvatar:function(){return this.getProperty("avatar")
},onUpdate:function(A,B){if(A&&CQ_Analytics&&CQ_Analytics.ProfileDataMgr){CQ_Analytics.ProfileDataMgr.addListener("update",A,B||this)
}}}
})()
};
window.CQ_Context=new window.CQ_Context()
}function initializeTeaserLoader(D,H,G,F,B,I,A,C){F=CQ.Ext&&(F=="true"||F===true);
if(window.CQ_Analytics){var E=function(){var O="/_jcr_content/par.html";
var N=function(Q){var S="";
var U=new Array();
if(CQ_Analytics.SegmentMgr){var T=0;
for(var R=0;
R<D.length;
R++){if(!D[R]["segments"]||D[R]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(D[R]["segments"])===true){var P=CQ_Analytics.SegmentMgr.getMaxBoost(D[R]["segments"]);
if(Q==D[R].path){S+=CQ.I18n.getMessage("<b>Teaser {0} is resolved ( boost = {1} )</b><br>",[D[R]["name"],P])
}else{S+=CQ.I18n.getMessage("Teaser {0} is resolved with ( boost = {1} )<br>",[D[R]["name"],P])
}if(P==T){U.push(D[R])
}else{if(P>T){U=new Array();
U.push(D[R]);
T=P
}}}else{S+=CQ.I18n.getMessage("Teaser {0} is not resolved<br>",D[R]["name"])
}}}S+=CQ.I18n.getMessage("<br>Strategy <b>{0}</b> selected current teaser.<br>",H);
return S
};
var L=null;
var J=null;
var K=function(){var W=new Array();
if(CQ_Analytics.SegmentMgr){var U=0;
for(var R=0;
R<D.length;
R++){if(!D[R]["segments"]||D[R]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(D[R]["segments"])===true){var Q=CQ_Analytics.SegmentMgr.getMaxBoost(D[R]["segments"]);
if(Q==U){W.push(D[R])
}else{if(Q>U){W=new Array();
W.push(D[R]);
U=Q
}}}}}if(W.length>0){var V=W[0];
if(CQ_Analytics.StrategyMgr){var T=CQ_Analytics.StrategyMgr.choose(H,W);
if(T!=null){V=T
}}if(!L||L.path!=V.path){L=V;
M(V.path+O,G);
if(window.CQ_trackTeasersStats&&B){if(!CQ_Analytics.loadedTeasersStack){CQ_Analytics.loadedTeasersStack=[];
$CQ(window).unload(function(){try{var X=CQ_Analytics.loadedTeasersStack;
if(X){delete CQ_Analytics.loadedTeasersStack;
var Z=B;
for(var a=0;
a<X.length;
a++){Z=CQ.shared.HTTP.addParameter(Z,"path",X[a])
}CQ.shared.HTTP.get(Z,function(){})
}}catch(Y){}})
}CQ_Analytics.loadedTeasersStack.push(V.path)
}if(F){if(P){P.remove()
}var S=CQ.Ext.get(G);
if(S){var P=new CQ.Ext.ToolTip({target:S,html:N(L.path),title:CQ.I18n.getMessage("Selection decision"),width:420})
}}}}else{if(F&&P){P.remove()
}CQ_Analytics.Utils.clearElement(G);
L=null
}};
var M=function(R,S){var P=function(T){C("#"+S).html(T);
A.init(C("#"+S))
};
var Q=function(T){C("#"+S).html("")
};
I.load(R,P,Q,2,10000)
};
K.call()
};
if(CQ_Analytics.ClickstreamcloudMgr){if(CQ_Analytics.ClickstreamcloudMgr.areStoresLoaded){E.call(this)
}else{CQ_Analytics.ClickstreamcloudMgr.addListener("storesloaded",E)
}}}};