/* Copyright (c) 2007-2012 SPIL GAMES.  DO NOT COPY THIS CODE. */
;(function(doc){var head=doc.documentElement,isHeadReady,isDomReady,domWaiters=[],queue=[],handlers={},scripts={},isAsync=doc.createElement("script").async===true||"MozAppearance"in doc.documentElement.style||window.opera;var head_var=window.head_conf&&head_conf.head||"head",api=window[head_var]=(window[head_var]||function(){api.ready.apply(null,arguments);});var PRELOADED=1,PRELOADING=2,LOADING=3,LOADED=4;if(isAsync){api.js=function(){var args=arguments,fn=args[args.length-1],els={},async=false;if(!isFunc(fn)){fn=null;}
if(fn&&args.length===2||!fn&&args.length===1){async=true;}
each(args,function(el,i){if(el!=fn){el=getScript(el);els[el.name]=el;load(el,fn&&i==args.length-2?function(){if(allLoaded(els)){one(fn);}}:null,async);}});return api;};}else{api.js=function(){var args=arguments,rest=[].slice.call(args,1),next=rest[0];if(!isHeadReady){queue.push(function(){api.js.apply(null,args);});return api;}
if(next){each(rest,function(el){if(!isFunc(el)){preload(getScript(el));}});load(getScript(args[0]),isFunc(next)?next:function(){api.js.apply(null,rest);});}else{load(getScript(args[0]));}
return api;};}
api.ready=function(key,fn){if(key==doc){if(isDomReady){one(fn);}
else{domWaiters.push(fn);}
return api;}
if(isFunc(key)){fn=key;key="ALL";}
if(typeof key!='string'||!isFunc(fn)){return api;}
var script=scripts[key];if(script&&script.state==LOADED||key=='ALL'&&allLoaded()&&isDomReady){one(fn);return api;}
var arr=handlers[key];if(!arr){arr=handlers[key]=[fn];}
else{arr.push(fn);}
return api;};api.ready(doc,function(){if(allLoaded()){each(handlers.ALL,function(fn){one(fn);});}
if(api.feature){api.feature("domloaded",true);}});function one(fn){if(fn._done){return;}
fn();fn._done=1;}
function toLabel(url){var els=url.split("/"),name=els[els.length-1],i=name.indexOf("?");return i!=-1?name.substring(0,i):name;}
function getScript(url){var script;if(typeof url=='object'){for(var key in url){if(url[key]){script={name:key,url:url[key]};}}}else{script={name:toLabel(url),url:url};}
var existing=scripts[script.name];if(existing&&existing.url===script.url){return existing;}
scripts[script.name]=script;return script;}
function each(arr,fn){if(!arr){return;}
if(typeof arr=='object'){arr=[].slice.call(arr);}
for(var i=0;i<arr.length;i++){fn.call(arr,arr[i],i);}}
function isFunc(el){return Object.prototype.toString.call(el)=='[object Function]';}
function allLoaded(els){els=els||scripts;var loaded;for(var name in els){if(els.hasOwnProperty(name)&&els[name].state!=LOADED){return false;}
loaded=true;}
return loaded;}
function onPreload(script){script.state=PRELOADED;each(script.onpreload,function(el){el.call();});}
function preload(script,callback){if(script.state===undefined){script.state=PRELOADING;script.onpreload=[];scriptTag({src:script.url,type:'cache'},function(){onPreload(script);});}}
function load(script,callback,async){if(script.state==LOADED){return callback&&callback();}
if(script.state==LOADING){return api.ready(script.name,callback);}
if(script.state==PRELOADING){return script.onpreload.push(function(){load(script,callback);});}
script.state=LOADING;scriptTag(script.url,function(){script.state=LOADED;if(callback){callback();}
each(handlers[script.name],function(fn){one(fn);});if(allLoaded()&&isDomReady){each(handlers.ALL,function(fn){one(fn);});}},async);}
function scriptTag(src,callback,async){var s=doc.createElement('script');s.type='text/'+(src.type||'javascript');s.src=src.src||src;s.async=(async?async:false);s.onreadystatechange=s.onload=function(){var state=s.readyState;if(!callback.done&&(!state||(isAsync?/complete/:/loaded|complete/).test(state))){callback.done=true;callback();}};(doc.body||head).appendChild(s);}
function fireReady(){if(!isDomReady){isDomReady=true;each(domWaiters,function(fn){one(fn);});}}
if(window.addEventListener){doc.addEventListener("DOMContentLoaded",fireReady,false);window.addEventListener("load",fireReady,false);}else if(window.attachEvent){doc.attachEvent("onreadystatechange",function(){if(doc.readyState==="complete"){fireReady();}});var frameElement=1;try{frameElement=window.frameElement;}catch(e){}
if(!frameElement&&head.doScroll){(function(){try{head.doScroll("left");fireReady();}catch(e){setTimeout(arguments.callee,1);return;}})();}
window.attachEvent("onload",fireReady);}
if(!doc.readyState&&doc.addEventListener){doc.readyState="loading";doc.addEventListener("DOMContentLoaded",handler=function(){doc.removeEventListener("DOMContentLoaded",handler,false);doc.readyState="complete";},false);}
setTimeout(function(){isHeadReady=true;each(queue,function(fn){fn();});},300);})(document);
