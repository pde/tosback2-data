if(typeof window.BBECML=="undefined"){window.BBECML=new (function(){function Util(){}Util.prototype=(function(){function isInstanceOf(obj,type){return(obj&&((typeof obj).toUpperCase()=="OBJECT")&&(obj instanceof type))
}return{isDefined:function(arg){if(typeof(arg)=="undefined"){return false
}else{return true
}},isUndefined:function(arg){return !this.isDefined(arg)
},createObjectIfUndefined:function(obj){return this.getValueOrDefaultIfUndefined(obj,{})
},getValueOrDefaultIfUndefined:function(obj,dfault){if(this.isUndefined(obj)){obj=dfault
}return obj
},addMissingProperties:function(objectToBeCompleted,completeProperties){var propertiesToComplete;
objectToBeCompleted=objectToBeCompleted||{};
for(var i=1;
i<arguments.length;
i++){propertiesToComplete=arguments[i];
for(var property in propertiesToComplete){if(this.canNestIntoObject(completeProperties[property])){if(objectToBeCompleted[property]==undefined){objectToBeCompleted[property]={}
}objectToBeCompleted[property]=this.addMissingProperties(objectToBeCompleted[property],propertiesToComplete[property])
}else{if(this.isUndefined(objectToBeCompleted[property])){objectToBeCompleted[property]=propertiesToComplete[property]
}}}}return objectToBeCompleted
},canNestIntoObject:function(obj){var canNest=true;
if((typeof obj).toUpperCase()!="OBJECT"){canNest=false
}else{if(obj===window){canNest=false
}else{if(this.isDefined(obj.nodeType)&&obj.nodeType!=0){canNest=false
}}}return canNest
},initializeDependencies:function(injectedDependency,requiredType){if(this.isUndefined(requiredType)){throw"Util: required type must be defined!"
}var finalDependency=null;
if(isInstanceOf(injectedDependency,requiredType)){finalDependency=injectedDependency
}else{finalDependency=new requiredType()
}return finalDependency
},keyExists:function(object,keys){for(var i=0;
i<keys.length;
i++){if(this.isUndefined(object[keys[i]])){return false
}else{object=object[keys[i]]
}}return true
},getPropertyValueOrInitializeItIfNotSet:function(obj,propertyKeylist,initialValue){var propertyValue=this.getPropertyValue(obj,propertyKeylist);
if(this.isDefined(propertyValue)){return propertyValue
}else{this.initializePropertyValue(obj,propertyKeylist,initialValue);
return initialValue
}},getPropertyValue:function(obj,propertyKeylist){var propertyValue=obj;
for(var i=0;
i<propertyKeylist.length;
i++){propertyValue=propertyValue[propertyKeylist[i]];
if(this.isUndefined(propertyValue)){return
}}return propertyValue
},initializePropertyValue:function(obj,propertyKeylist,initialValue){var keyCount=propertyKeylist.length;
for(var i=0;
i<propertyKeylist.length;
i++){keyCount--;
if(this.isUndefined(obj[propertyKeylist[i]])){if(keyCount==0){obj[propertyKeylist[i]]=initialValue
}else{obj[propertyKeylist[i]]={}
}}obj=obj[propertyKeylist[i]]
}},getFunctionWithScopeAndParams:function(fn,scope,paramArray){if(!(paramArray instanceof Array)){paramArray=paramArray?[paramArray]:[]
}return function(){var args=[];
for(var i=0;
i<paramArray.length;
i++){args.push(paramArray[i])
}for(var i=0;
i<arguments.length;
i++){args.push(arguments[i])
}return fn.apply(scope,args)
}
},mixIn:function(objToBeExtended){var mixIn,state;
for(var i=1;
i<arguments.length;
i++){mixIn=arguments[i].prototype;
state=arguments[i]();
for(var publicStuff in mixIn){objToBeExtended[publicStuff]=mixIn[publicStuff]
}for(var stateProperty in state){objToBeExtended[stateProperty]=state[stateProperty]
}}},apply:function(target,source){for(property in source){target[property]=source[property]
}return target
},getPathWithTrailingSlash:function(path){return((this.lastCharOf(path)!="/")&&(path.length>0))?path+"/":path
},lastCharOf:function(str){return str.charAt(str.length-1)
},repeat:function(o){var interval=o.duration/o.steps;
var remainingSteps=o.steps;
var repeater=function(){if(remainingSteps>0){o.fn.call(o.scope,o)
}else{clearInterval(o.scope[o.timer]);
if(o.thenCall){o.thenCall.call(o.scope,o)
}}remainingSteps--
};
o.scope[o.timer]=setInterval(repeater,interval)
},runDelayed:function(o){return setTimeout(this.getFunctionWithScopeAndParams(o.fn,o.scope,o.data),o.delay)
},makeCallback:function(o,fn){if(!o.scope){o.scope=this
}return function(){if(o.thenCall){o.thenCall.call(o.scope,o.data)
}if(fn){fn.call(this)
}}
}}
})();
BBCookie={callbackFunction:null,runGetUserId:function(){this.callbackFunction()
},runServerCookieValue:function(cookieValue){this.callbackFunction(cookieValue)
}};
function Cookie(dependencies){var utils=new Util();
dependencies=utils.createObjectIfUndefined(dependencies);
var dom=utils.initializeDependencies(dependencies.DOM,DOM);
var flash=utils.initializeDependencies(dependencies.Flash,Flash);
var that=this;
var sharedCookieManager=null;
var sharedCookieOptions=null;
var serverCookieOptions=null;
var LOCAL_COOKIE_EXPIRATION_YEARS=2;
this.getDefaultOptions=function(){return{sharedCookie:{baseUrl:"http://localhost:8080/CommonJsLib/flash/",fileName:"bbnaut.swf",id:"bbnaut",flashVersion:8,name:"test_value",width:0,height:0},localCookie:{name:"test_value"},serverCookie:{baseUrl:"http://localhost:8080/CommonJsLib",scriptPath:"/",getScript:"getCookie.jsp",setScript:"setCookie.jsp",name:"test_value"},value:""}
};
this.getLocalCookie=function(options){var nameEQ=options.localCookie.name+"=";
var cookies=document.cookie.split(";");
for(var i=0;
i<cookies.length;
i++){var c=cookies[i];
while(c.charAt(0)==" "){c=c.substring(1,c.length)
}if(c.indexOf(nameEQ)==0){return c.substring(nameEQ.length,c.length)
}}return null
};
this.setLocalCookie=function(options){var expirationDate=new Date();
expirationDate.setFullYear(expirationDate.getFullYear()+LOCAL_COOKIE_EXPIRATION_YEARS);
document.cookie=options.localCookie.name+"="+options.value+"; path=/; expires="+expirationDate.toUTCString()
};
this.getServerCookieAsync=function(options){if(!options.callback){throw"Cookie: callback must be specified for server cookies called asynchronously"
}BBCookie.callbackFunction=that.adviseServerCookieIsReady;
serverCookieOptions=options;
if(options.serverCookie){with(options.serverCookie){dom.addJavaScript(baseUrl+scriptPath+getScript+"?name="+escape(name))
}}};
this.setServerCookie=function(options){if(options.serverCookie){with(options.serverCookie){dom.addJavaScript(baseUrl+scriptPath+setScript+"?name="+escape(name)+"&value="+escape(options.value))
}}};
function createSharedCookieManager(options){options=utils.addMissingProperties(options,that.getDefaultOptions());
sharedCookieOptions=options;
BBCookie.callbackFunction=that.adviseSharedManagerIsReady;
var managerCode=flash.getFlashCode(options.sharedCookie);
if(dom.isLoaded()){flash.addFlashObjectIntoDom(options.sharedCookie.placement,managerCode)
}else{BbSingleton.getEventDispatcher().registerListener("DOM",BbSingleton.getEventDispatcher().events.DOMLOADED,function(){flash.addFlashObjectIntoDom(options.sharedCookie.placement,managerCode)
})
}}this.getSharedCookie=function(options){if(!sharedCookieManager){throw"Cookie: sharedCookieManager has not been set yet, call getSharedCookieAsync instead"
}else{return sharedCookieManager.getFlashCookieUserId()
}};
this.getSharedCookieAsync=function(options){options.internalCallback=arguments.callee;
if(!options.callback){throw"Cookie: callback must be specified for server cookies called asynchronously"
}if(!sharedCookieManager){createSharedCookieManager(options)
}else{options.callback(sharedCookieManager.getFlashCookieUserId())
}};
this.setSharedCookie=function(options){options.internalCallback=arguments.callee;
if(!sharedCookieManager){createSharedCookieManager(options)
}else{sharedCookieManager.setFlashCookieUserId(options.value)
}};
this.adviseSharedManagerIsReady=function(){if(!sharedCookieOptions){throw"Cookie: missing callbackOptions for current asynchronous call"
}else{var options=sharedCookieOptions;
var flashName=flash.getFlashName(options.sharedCookie);
sharedCookieManager=flash.getReferenceTo(flashName);
sharedCookieOptions=null;
BBCookie.callbackFunction=null;
options.internalCallback(options)
}};
this.adviseServerCookieIsReady=function(cookieValue){if(!serverCookieOptions){throw"Cookie: missing callbackOptions for current asynchronous call"
}else{var options=serverCookieOptions;
serverCookieOptions=null;
BBCookie.callbackFunction=null;
options.callback(cookieValue)
}}
}Cookie.prototype=Cookie.prototype;
function Communication(dependencies){var utils=new Util();
dependencies=utils.createObjectIfUndefined(dependencies);
var dom=utils.initializeDependencies(dependencies.DOM,DOM);
var browser=utils.initializeDependencies(dependencies.Browser,Browser);
var stringUtils=utils.initializeDependencies(dependencies.StringUtils,StringUtils);
this.setBrowser=function(givenBrowser){browser=givenBrowser
};
function checkRequestAttributes(requestAttributes){if(requestAttributes.url==""){throw"Communication: Missing url in request attributes"
}}this.getDefaultPostIframePlacement=function(){return{parentElementIdentification:dom.getDefaultContainerPlacement().elementAttributes.id,elementType:"IFRAME",elementAttributes:{id:"bbPostFrame",style:stringUtils.convertParamListIntoSingleString(this.getDefaultPostIframeStyle(),", ",": ")}}
};
this.getDefaultPostIframeStyle=function(){return{position:"absolute",border:"0px",width:"0px",height:"0px",left:"-1000px",top:"-1000px",visibility:"hidden"}
};
this.getDefaultPostFormPlacement=function(){return{elementType:"FORM",elementAttributes:{id:"bbPostForm",method:"POST"}}
};
this.doPostRequest=function(requestAttributes){checkRequestAttributes(requestAttributes);
var postStructure=this.buildPostStructure(requestAttributes);
postStructure.postForm.submit()
};
this.buildPostStructure=function(requestAttributes){var postStructure={};
postStructure.postIframe=createPostIframe(this.getDefaultPostIframePlacement(),this.getDefaultPostIframeStyle());
var postFormPlacement=this.getDefaultPostFormPlacement();
postFormPlacement.elementAttributes.action=requestAttributes.url;
postStructure.postForm=createPostForm(postFormPlacement,postStructure.postIframe);
applyRequestParamsToPostForm(requestAttributes.params,postStructure.postForm);
return postStructure
};
function createPostIframe(postIframePlacement,postIframeStyle){var container=dom.createDefaultContainerIfNotExists();
var postIframe=dom.createElementIfNotExists(postIframePlacement,container);
dom.applyStyleToElement(postIframe,postIframeStyle);
return postIframe
}function createPostForm(postFormPlacement,postIframe){var iframeBody=dom.createElementIfNotExists({elementType:"BODY"},postIframe.contentDocument);
return dom.createElementIfNotExists(postFormPlacement,iframeBody)
}function applyRequestParamsToPostForm(requestParams,postForm){var inputPlacement={elementType:"INPUT",elementAttributes:{type:"hidden"}};
for(var paramName in requestParams){inputPlacement.elementAttributes.name=paramName;
inputPlacement.elementAttributes.value=requestParams[paramName];
dom.createElement(inputPlacement,postForm)
}}this.doGetRequest=function(requestAttributes){var request=this.buildGetRequest(requestAttributes);
dom.addJavaScript(request)
};
this.buildGetRequest=function(requestAttributes){checkRequestAttributes(requestAttributes);
var queryString=buildQueryString(requestAttributes);
return requestAttributes.url+queryString
};
function buildQueryString(requestAttributes){var queryString=stringUtils.convertParamListIntoSingleString(requestAttributes.params,"&","=");
if(queryString==""){return queryString
}queryString="?"+queryString;
var maxLength=browser.maxGetRequestLength-requestAttributes.url.length;
queryString=stringUtils.clipStringIfOverflows(queryString,maxLength,requestAttributes.longQueryStringClippingMethod);
if(queryString.length>maxLength){throw"Communication: max available queryString length overflow"
}return queryString
}}Communication.prototype.toString=function(){return"Communication object"
};
if((typeof BbSingleton).toLowerCase()!="object"){BbSingleton={eventDispatcher:null,getEventDispatcher:function(){if(!this.eventDispatcher){this.eventDispatcher=new EventDispatcher()
}return this.eventDispatcher
},onLoadHandler:function(){DOM.prototype.loaded=true;
BbSingleton.getEventDispatcher().dispatchEvent("DOM",BbSingleton.getEventDispatcher().events.DOMLOADED);
if(oldOnload){oldOnload()
}}}
}function EventDispatcher(dependencies){var utils=new Util();
dependencies=utils.createObjectIfUndefined(dependencies);
var registeredListeners={};
var dispatchedRetroactiveEvents={};
this.events={DOMLOADED:{type:"domloaded",retroactive:true}};
initializeListeners();
this.registerListener=function(eventSource,evnt,listener){listeners=getListeners(eventSource,evnt.type);
if(!isListenerRegisteredForEvent(listener,listeners)){listeners.push(listener)
}if(evnt.retroactive){redispatchRetroactiveEvent(eventSource,evnt.type,listener)
}};
this.dispatchEvent=function(eventSource,evnt){if(evnt.retroactive){registerDispatchedRetroactiveEvent(eventSource,evnt.type)
}var listeners=getListeners(eventSource,evnt.type);
for(var i=0;
i<listeners.length;
i++){listeners[i]()
}};
function isListenerRegisteredForEvent(listener,listeners){for(var i=0;
i<listeners.length;
i++){if(listener.toString()===listeners[i].toString()){return true
}}return false
}function initializeListeners(){for(var evnt in this.events){registeredListeners[evnt.type]={}
}}function redispatchRetroactiveEvent(eventSource,eventType,listener){var evnt=getDispatchedRetroactiveEvent(eventSource,eventType);
if(evnt.dispatched){listener()
}}function registerDispatchedRetroactiveEvent(eventSource,eventType){var evnt=getDispatchedRetroactiveEvent(eventSource,eventType);
evnt.dispatched=true
}function getListeners(eventSource,eventType){return utils.getPropertyValueOrInitializeItIfNotSet(registeredListeners,[eventSource,eventType],[])
}function getDispatchedRetroactiveEvent(eventSource,eventType){return utils.getPropertyValueOrInitializeItIfNotSet(dispatchedRetroactiveEvents,[eventSource,eventType],{dispatched:false})
}}function Browser(){var that=this;
if(!(that instanceof Browser)){that={}
}return that
}Browser.prototype=(function(){var userAgent=navigator.userAgent.toLowerCase();
var browser={browserVersion:(userAgent.match(/.+(?:rv|it|sion|ie|ome|pera)[\/: ]([\d.]+)/)||[])[1],isChrome:/chrome(?!frame)/.test(userAgent),isSafari:/webkit/.test(userAgent)&&!/chrome/.test(userAgent),isOpera:/opera/.test(userAgent),isMsie:/msie/.test(userAgent)&&!/opera/.test(userAgent),isMozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};
browser.majorVersion=parseInt(browser.browserVersion,10);
if(browser.isChrome){browser.maxGetRequestLength=2048
}else{if(browser.isSafari){browser.maxGetRequestLength=2048
}else{if(browser.isOpera){browser.maxGetRequestLength=8192
}else{if(browser.isMsie){browser.maxGetRequestLength=2048
}else{if(browser.isMozilla){browser.maxGetRequestLength=8192
}else{browser.maxGetRequestLength=2048
}}}}}return browser
})();
function DOM(){var that=this;
if(!(that instanceof DOM)){that={}
}return that
}DOM.prototype=(function(){function prepareScriptObject(scriptUrl){var js=document.createElement("script");
js.setAttribute("language","javascript");
js.setAttribute("type","text/javascript");
js.setAttribute("src",scriptUrl);
return js
}function addWhenReadyCallbackToScript(script,callbackFunction){if(callbackFunction&&(typeof callbackFunction).toUpperCase()=="FUNCTION"){if(script.readyState){script.onreadystatechange=function(){if(window.event.srcElement.readyState.toUpperCase()=="COMPLETE"){callbackFunction(script)
}}
}else{script.onload=function(){callbackFunction(script)
}
}}return script
}function setStyle(el,styles){for(var styleProperty in styles){el.style[styleProperty]=styles[styleProperty]
}}return{isLoaded:function(){return this.loaded
},getReferenceTo:function(objectId,searchingScope){var objectReference=null;
if(!searchingScope){searchingScope=document
}if(searchingScope.getElementById&&searchingScope.getElementById(objectId)!=null){objectReference=searchingScope.getElementById(objectId)
}else{if(searchingScope.layers&&searchingScope.layers[objectId]!=null){objectReference=searchingScope.layers[objectId]
}else{if(searchingScope.all){objectReference=searchingScope.all[objectId]
}}}if(objectReference==null){objectReference=searchingScope.getElementsByTagName(objectId).item(0)
}return objectReference
},setStylesTo:function(el,styles){setStyle(el,styles)
},setStyles:function(styles){for(var i=0;
i<arguments.length;
i++){setStyle(this,arguments[i])
}},handleEvent:function(options){var element=options.eventSource||this,scope=options.scope||this,handler=this.getFunctionWithScopeAndParams(options.handler,scope);
if(element.addEventListener){return element.addEventListener(options.event,handler,false)
}else{if(element.attachEvent){return element.attachEvent("on"+options.event,handler)
}else{return false
}}},unhandleEvent:function(options){var element=options.eventSource||this,scope=options.scope||this,handler=this.getFunctionWithScopeAndParams(options.handler,scope);
if(element.removeEventListener){return element.removeEventListener(options.event,handler,false)
}else{if(element.detachEvent){return element.detachEvent("on"+options.event,handler)
}else{return false
}}},addJavaScript:function(scriptUrl,callbackFunction){var head=document.getElementsByTagName("head").item(0);
var js=prepareScriptObject(scriptUrl);
js=addWhenReadyCallbackToScript(js,callbackFunction);
head.appendChild(js)
},getDefaultFlashPlacement:function(){return{parentElementIdentification:"bbContainer",elementType:"SPAN",elementAttributes:{id:"bbFlash",style:"z-index: -10; position: absolute;"}}
},getDefaultContainerPlacement:function(){return{parentElementIdentification:document.body,elementType:"SPAN",elementAttributes:{id:"bbContainer"}}
},createDefaultContainerIfNotExists:function(){return this.createElementIfNotExists(this.getDefaultContainerPlacement())
},createElementIfNotExists:function(placement,parentElement){if(typeof placement.elementAttributes!="undefined"&&typeof placement.elementAttributes.id!="undefined"){var elementIdentification=placement.elementAttributes.id
}else{if(typeof placement.elementType!="undefined"){var elementIdentification=placement.elementType
}else{throw ("Dom: Cannot create undefined element")
}}var element=this.getReferenceTo(elementIdentification,parentElement);
if(element!=null){return element
}return this.createElement(placement,parentElement)
},createElement:function(placement,parentElement){var element=document.createElement(placement.elementType);
for(var attribute in placement.elementAttributes){element.setAttribute(attribute,placement.elementAttributes[attribute])
}if(parentElement==null){if(typeof placement.parentElementIdentification=="object"){parentElement=placement.parentElementIdentification
}else{parentElement=this.getReferenceTo(placement.parentElementIdentification)
}if(parentElement==null){throw"Dom: Parent object does not exist"
}}return parentElement.appendChild(element)
},applyStyleToElement:function(element,styleDefinition){for(var styleName in styleDefinition){eval("element.style."+styleName+"='"+styleDefinition[styleName]+"'")
}}}
})();
DOM.prototype.loaded=false;
DOM.prototype.checked=false;
(function(){var browser=new Browser();
var dom=new DOM();
if(dom.checked==true){return
}DOM.prototype.checked=true;
if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){DOM.prototype.loaded=true;
BbSingleton.getEventDispatcher().dispatchEvent("DOM",BbSingleton.getEventDispatcher().events.DOMLOADED)
},false)
}else{if(browser.isMsie){(function(){try{document.documentElement.doScroll("left");
if(window.parent&&document.readyState&&document.readyState!="complete"){throw ("dom not loaded yet")
}}catch(error){setTimeout(arguments.callee,50);
return
}DOM.prototype.loaded=true;
BbSingleton.getEventDispatcher().dispatchEvent("DOM",BbSingleton.getEventDispatcher().events.DOMLOADED);
return
})()
}else{oldOnload=window.onload;
if(oldOnload!==Bb.Singleton.onLoadHandler){window.onload=Bb.Singleton.onLoadHandler
}}}})();
Util.prototype.mixIn(DOM.prototype,Util);
function Html(){var that=this;
if(!(that instanceof Html)){that={}
}return that
}Html.prototype=(function(){function getCommonParameterString(options,idSuffix){var commonString="",id=makeId(options.id,idSuffix);
commonString+=" id='"+id+"' ";
commonString+=" name='"+id+"' ";
commonString+=" width='"+options.width+"' height='"+options.height+"' ";
return commonString
}function makeId(id,suffix){return id+(suffix||"")
}function getAttribute(name,value){var attr="";
if(value){attr=" "+name+"='"+value+"'"
}return attr
}return{getClickableImg:function(options){return code=this.getAnchor({href:options.clickUrl,target:options.target,content:this.getImg(options)})
},getImg:function(options){var code="",imgSource=options.url||options.fileName;
code+="<IMG id='"+options.id+"Img' ";
code+="SRC='"+imgSource+"' width='"+options.width+"' height='"+options.height+"'";
code+="ALT='"+(options.altTxt||imgSource)+"'>";
return code
},getDiv:function(options){var code="";
code+=this.getDivOpening(options);
code+=options.content;
code+=this.getDivClosing(options);
return code
},getDivOpening:function(options){return"<DIV id='"+options.id+"' style='"+options.styleAttribute+"'>"
},getDivClosing:function(){return"</DIV>"
},getAnchor:function(options){var code="<A";
code+=getAttribute("href",options.href);
code+=getAttribute("target",options.target);
code+=">"+options.content+"</A>";
return code
},getIEFlashCode:function(options,idSuffix){var flashcode="<OBJECT classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' ";
flashcode+=getCommonParameterString(options,idSuffix)+">";
flashcode+="<PARAM name='movie' value='"+this.getPathWithTrailingSlash(options.baseUrl)+options.fileName+"'>";
for(var param in options.params){flashcode+="<PARAM name='"+param+"' value='"+options.params[param]+"'>"
}flashcode+="</OBJECT>";
var fscommandSupport="";
fscommandSupport+="<SCRIPT LANGUAGE='VBScript'>";
fscommandSupport+="Sub "+makeId(options.id,idSuffix)+"_FSCommand(ByVal command, ByVal args)\n";
fscommandSupport+="call "+makeId(options.id,idSuffix)+"_DoFSCommand(command, args)\n";
fscommandSupport+="end sub\n";
fscommandSupport+="</SCRIPT>";
return fscommandSupport+flashcode
},getNonIEFlashCode:function(options,idSuffix){var flashcode="<EMBED type='application/x-shockwave-flash' ";
flashcode+="src='"+this.getPathWithTrailingSlash(options.baseUrl)+options.fileName+"' ";
flashcode+=getCommonParameterString(options,idSuffix);
for(param in options.params){flashcode+=param+"='"+options.params[param]+"' "
}flashcode+=" swLifeConnect='true'";
return flashcode+">"
},getMadeId:function(id,idSuffix){return makeId(id,idSuffix)
}}
})();
Util.prototype.mixIn(DOM.prototype,Util);
function Flash(){var that=this;
if(!(that instanceof Flash)){that={}
}return that
}Flash.prototype=(function(){var flashNamePrefix="flash_",IDSUFFIX="Flash";
return{isRequiredFlashVersionAvailable:function(options){options=this.addMissingProperties(options,{requiredVersion:1000});
return(options.requiredVersion<=this.getInstalledFlashVersion())
},getInstalledFlashVersion:function(){var flVer=0,x,axo;
if(this.isDefined(navigator.plugins)&&(navigator.mimeTypes.length>0)){x=navigator.plugins["Shockwave Flash"];
if(x&&x.description){flVer=parseInt(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split(".")[0])
}}else{if(this.isDefined(ActiveXObject)){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
}catch(e){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
flVer=6
}catch(e){}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
}catch(e){}}if(axo!=null){flVer=parseInt(axo.GetVariable("$version").split(" ")[1].split(",")[0])
}}}return flVer
},getDefaultOptions:function(){return{baseUrl:"",fileName:"flash.swf",id:"myFlash",width:0,height:0,versionRequired:6,vars:{clickTarget:"_blank"},params:{allowScriptAccess:"always",wmode:"window",quality:"high",flashVars:""}}
},addVarsForClicks:function(options){var vars={};
if(options.clickVar){addClickVar(options.clickVar)
}else{addClickVar("clickthru","clickTag","clickTAG")
}options.vars=this.addMissingProperties(options.vars,vars);
return options;
function addClickVar(){for(var i=0;
i<arguments.length;
i++){vars[arguments[i]]=options.clickUrl
}}},getEnhancedOptions:function(options){options=this.addMissingProperties(options,this.getDefaultOptions());
if(options.clickUrl){options=this.addVarsForClicks(options)
}addVarsToFlashVars();
return options;
function addVarsToFlashVars(){for(var vr in options.vars){options.params.flashVars+="&"+vr+"="+encodeURIComponent(options.vars[vr])
}}},getFlashCode:function(options){var flashcode="";
options=this.getEnhancedOptions(options);
if(this.isMsie){flashcode=this.getIEFlashCode(options,IDSUFFIX)
}else{flashcode=this.getNonIEFlashCode(options,IDSUFFIX)
}return flashcode
},getFlashName:function(options){return this.getMadeId(options.id,IDSUFFIX)
},getReferenceTo:function(flashId){if(window.document[flashId]){return window.document[flashId]
}if(!browser.isMsie){if(document.embeds&&document.embeds[flashId]){return document.embeds[flashId]
}}return document.getElementById(flashId)
},addFsCommandHandler:function(options,handler){var flashName=this.getFlashName(options);
window[flashName+"_DoFSCommand"]=handler
},addFlashObjectIntoDom:function(placement,flashCode){placement=this.addMissingProperties(placement,this.getDefaultFlashPlacement());
if(placement.parentElementIdentification==this.getDefaultContainerPlacement().elementAttributes.id){var container=this.createDefaultContainerIfNotExists();
var bbFlash=this.createElementIfNotExists(placement,container)
}else{var bbFlash=this.createElementIfNotExists(placement)
}bbFlash.innerHTML=flashCode
}}
})();
Util.prototype.mixIn(Flash.prototype,Util,Browser,Html,DOM);
function Client(dependencies){var utils=new Util();
dependencies=utils.createObjectIfUndefined(dependencies);
var browser=utils.initializeDependencies(dependencies.browser,Browser);
var nav=utils.getValueOrDefaultIfUndefined(dependencies.navigator,navigator);
var win=utils.getValueOrDefaultIfUndefined(dependencies.window,window);
var data={dataString:"",add:function(key,value){data.dataString+=key+":"+value+";";
return this
},toString:function(){return data.dataString
}};
function getOtherNavigatorData(){data.add("language",nav.language)
}function getNavigatorMimeTypesData(){data.add("navigator.mimeTypes.length",nav.mimeTypes.length);
for(i=0;
i<nav.mimeTypes.length;
i++){mimeObject=nav.mimeTypes[i];
if(mimeObject.enabledPlugin){if(mimeObject.description!=""){data.add("description",mimeObject.description)
}}}}function getNavigatorPluginsData(){data.add("pluginsCount",nav.plugins.length);
data.add("plugins","");
for(i=0;
i<nav.plugins.length;
i++){data.add("puginName",nav.plugins[i].name).add("filename",nav.plugins[i].filename).add("description",nav.plugins[i].description)
}}function collectNavigatorData(){getOtherNavigatorData();
getNavigatorMimeTypesData();
getNavigatorPluginsData()
}function collectExplorerData(){data.add("appMinorVersion",nav.appMinorVersion).add("cpuClass",nav.cpuClass).add("browserLanguage",nav.browserLanguage).add("userLanguage",nav.userLanguage).add("systemLanguage",nav.systemLanguage).add("onLine",nav.onLine).add("numberOfMimeTypes",nav.mimeTypes.length).add("numberOfPlugins",nav.plugins.length).add("userProfile",nav.userProfile)
}function collectOperaData(){data.add("language",nav.language)
}function collectAllOtherBrowserData(){data.add("screenWidth",win.screen.width).add("screenHeight",win.screen.height).add("cookieEnabled",win.cookieEnabled).add("userAgent",nav.userAgent).add("platform",nav.platform).add("appName",nav.appName).add("appVersion",nav.appVersion).add("appCodeName",nav.appCodeName).add("colorDepth",win.screen.colorDepth).add("screenAvailWidth",win.screen.availWidth).add("screenAvailHeight",win.screen.availHeight).add("windowPageXOffset",win.pageXOffset).add("windowPageYOffset",win.pageYOffset)
}this.getData=function(){if(browser.isOpera){collectOperaData()
}else{if(browser.isMsie){collectExplorerData()
}else{collectNavigatorData()
}}collectAllOtherBrowserData();
return data.toString()
}
}function StringUtils(){this.convertParamListIntoSingleString=function(paramList,paramDelimiter,valueAssigner){var paramString="";
for(var paramName in paramList){if(paramString!=""){paramString+=paramDelimiter
}paramString+=paramName+valueAssigner+paramList[paramName]
}return paramString
};
this.clipStringIfOverflows=function(stringToClip,maxLength,clippingMethod){if(stringToClip.length<=maxLength){return stringToClip
}if(clippingMethod=="MIDDLE"){var halfLength=maxLength/2;
var firstPart=stringToClip.substring(0,halfLength);
var secondPart=stringToClip.substring(stringToClip.length-halfLength);
return firstPart.concat(secondPart)
}if(clippingMethod=="TAIL"){return stringToClip.substring(0,maxLength)
}return stringToClip
}
}StringUtils.prototype.toString=function(){return"StringUtils object"
};
function Security(dependencies){var hexcase=0;
var b64pad="";
this.hex_md5=function(s){return rstr2hex(rstr_md5(str2rstr_utf8(s)))
};
this.b64_md5=function(s){return rstr2b64(rstr_md5(str2rstr_utf8(s)))
};
this.any_md5=function(s,e){return rstr2any(rstr_md5(str2rstr_utf8(s)),e)
};
this.hex_hmac_md5=function(k,d){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)))
};
this.b64_hmac_md5=function(k,d){return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)))
};
this.any_hmac_md5=function(k,d,e){return rstr2any(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)),e)
};
this.md5_vm_test=function(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"
};
function rstr_md5(s){return binl2rstr(binl_md5(rstr2binl(s),s.length*8))
}function rstr_hmac_md5(key,data){var bkey=rstr2binl(key);
if(bkey.length>16){bkey=binl_md5(bkey,key.length*8)
}var ipad=Array(16),opad=Array(16);
for(var i=0;
i<16;
i++){ipad[i]=bkey[i]^909522486;
opad[i]=bkey[i]^1549556828
}var hash=binl_md5(ipad.concat(rstr2binl(data)),512+data.length*8);
return binl2rstr(binl_md5(opad.concat(hash),512+128))
}function rstr2hex(input){try{hexcase
}catch(e){hexcase=0
}var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";
var output="";
var x;
for(var i=0;
i<input.length;
i++){x=input.charCodeAt(i);
output+=hex_tab.charAt((x>>>4)&15)+hex_tab.charAt(x&15)
}return output
}function rstr2b64(input){try{b64pad
}catch(e){b64pad=""
}var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var output="";
var len=input.length;
for(var i=0;
i<len;
i+=3){var triplet=(input.charCodeAt(i)<<16)|(i+1<len?input.charCodeAt(i+1)<<8:0)|(i+2<len?input.charCodeAt(i+2):0);
for(var j=0;
j<4;
j++){if(i*8+j*6>input.length*8){output+=b64pad
}else{output+=tab.charAt((triplet>>>6*(3-j))&63)
}}}return output
}function rstr2any(input,encoding){var divisor=encoding.length;
var i,j,q,x,quotient;
var dividend=Array(Math.ceil(input.length/2));
for(i=0;
i<dividend.length;
i++){dividend[i]=(input.charCodeAt(i*2)<<8)|input.charCodeAt(i*2+1)
}var full_length=Math.ceil(input.length*8/(Math.log(encoding.length)/Math.log(2)));
var remainders=Array(full_length);
for(j=0;
j<full_length;
j++){quotient=Array();
x=0;
for(i=0;
i<dividend.length;
i++){x=(x<<16)+dividend[i];
q=Math.floor(x/divisor);
x-=q*divisor;
if(quotient.length>0||q>0){quotient[quotient.length]=q
}}remainders[j]=x;
dividend=quotient
}var output="";
for(i=remainders.length-1;
i>=0;
i--){output+=encoding.charAt(remainders[i])
}return output
}function str2rstr_utf8(input){var output="";
var i=-1;
var x,y;
while(++i<input.length){x=input.charCodeAt(i);
y=i+1<input.length?input.charCodeAt(i+1):0;
if(55296<=x&&x<=56319&&56320<=y&&y<=57343){x=65536+((x&1023)<<10)+(y&1023);
i++
}if(x<=127){output+=String.fromCharCode(x)
}else{if(x<=2047){output+=String.fromCharCode(192|((x>>>6)&31),128|(x&63))
}else{if(x<=65535){output+=String.fromCharCode(224|((x>>>12)&15),128|((x>>>6)&63),128|(x&63))
}else{if(x<=2097151){output+=String.fromCharCode(240|((x>>>18)&7),128|((x>>>12)&63),128|((x>>>6)&63),128|(x&63))
}}}}}return output
}function str2rstr_utf16le(input){var output="";
for(var i=0;
i<input.length;
i++){output+=String.fromCharCode(input.charCodeAt(i)&255,(input.charCodeAt(i)>>>8)&255)
}return output
}function str2rstr_utf16be(input){var output="";
for(var i=0;
i<input.length;
i++){output+=String.fromCharCode((input.charCodeAt(i)>>>8)&255,input.charCodeAt(i)&255)
}return output
}function rstr2binl(input){var output=Array(input.length>>2);
for(var i=0;
i<output.length;
i++){output[i]=0
}for(var i=0;
i<input.length*8;
i+=8){output[i>>5]|=(input.charCodeAt(i/8)&255)<<(i%32)
}return output
}function binl2rstr(input){var output="";
for(var i=0;
i<input.length*32;
i+=8){output+=String.fromCharCode((input[i>>5]>>>(i%32))&255)
}return output
}function binl_md5(x,len){x[len>>5]|=128<<((len)%32);
x[(((len+64)>>>9)<<4)+14]=len;
var a=1732584193;
var b=-271733879;
var c=-1732584194;
var d=271733878;
for(var i=0;
i<x.length;
i+=16){var olda=a;
var oldb=b;
var oldc=c;
var oldd=d;
a=md5_ff(a,b,c,d,x[i+0],7,-680876936);
d=md5_ff(d,a,b,c,x[i+1],12,-389564586);
c=md5_ff(c,d,a,b,x[i+2],17,606105819);
b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);
a=md5_ff(a,b,c,d,x[i+4],7,-176418897);
d=md5_ff(d,a,b,c,x[i+5],12,1200080426);
c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);
b=md5_ff(b,c,d,a,x[i+7],22,-45705983);
a=md5_ff(a,b,c,d,x[i+8],7,1770035416);
d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);
c=md5_ff(c,d,a,b,x[i+10],17,-42063);
b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);
a=md5_ff(a,b,c,d,x[i+12],7,1804603682);
d=md5_ff(d,a,b,c,x[i+13],12,-40341101);
c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);
b=md5_ff(b,c,d,a,x[i+15],22,1236535329);
a=md5_gg(a,b,c,d,x[i+1],5,-165796510);
d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);
c=md5_gg(c,d,a,b,x[i+11],14,643717713);
b=md5_gg(b,c,d,a,x[i+0],20,-373897302);
a=md5_gg(a,b,c,d,x[i+5],5,-701558691);
d=md5_gg(d,a,b,c,x[i+10],9,38016083);
c=md5_gg(c,d,a,b,x[i+15],14,-660478335);
b=md5_gg(b,c,d,a,x[i+4],20,-405537848);
a=md5_gg(a,b,c,d,x[i+9],5,568446438);
d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);
c=md5_gg(c,d,a,b,x[i+3],14,-187363961);
b=md5_gg(b,c,d,a,x[i+8],20,1163531501);
a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);
d=md5_gg(d,a,b,c,x[i+2],9,-51403784);
c=md5_gg(c,d,a,b,x[i+7],14,1735328473);
b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);
a=md5_hh(a,b,c,d,x[i+5],4,-378558);
d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);
c=md5_hh(c,d,a,b,x[i+11],16,1839030562);
b=md5_hh(b,c,d,a,x[i+14],23,-35309556);
a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);
d=md5_hh(d,a,b,c,x[i+4],11,1272893353);
c=md5_hh(c,d,a,b,x[i+7],16,-155497632);
b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);
a=md5_hh(a,b,c,d,x[i+13],4,681279174);
d=md5_hh(d,a,b,c,x[i+0],11,-358537222);
c=md5_hh(c,d,a,b,x[i+3],16,-722521979);
b=md5_hh(b,c,d,a,x[i+6],23,76029189);
a=md5_hh(a,b,c,d,x[i+9],4,-640364487);
d=md5_hh(d,a,b,c,x[i+12],11,-421815835);
c=md5_hh(c,d,a,b,x[i+15],16,530742520);
b=md5_hh(b,c,d,a,x[i+2],23,-995338651);
a=md5_ii(a,b,c,d,x[i+0],6,-198630844);
d=md5_ii(d,a,b,c,x[i+7],10,1126891415);
c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);
b=md5_ii(b,c,d,a,x[i+5],21,-57434055);
a=md5_ii(a,b,c,d,x[i+12],6,1700485571);
d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);
c=md5_ii(c,d,a,b,x[i+10],15,-1051523);
b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);
a=md5_ii(a,b,c,d,x[i+8],6,1873313359);
d=md5_ii(d,a,b,c,x[i+15],10,-30611744);
c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);
b=md5_ii(b,c,d,a,x[i+13],21,1309151649);
a=md5_ii(a,b,c,d,x[i+4],6,-145523070);
d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);
c=md5_ii(c,d,a,b,x[i+2],15,718787259);
b=md5_ii(b,c,d,a,x[i+9],21,-343485551);
a=safe_add(a,olda);
b=safe_add(b,oldb);
c=safe_add(c,oldc);
d=safe_add(d,oldd)
}return Array(a,b,c,d)
}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b)
}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t)
}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t)
}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t)
}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t)
}function safe_add(x,y){var lsw=(x&65535)+(y&65535);
var msw=(x>>16)+(y>>16)+(lsw>>16);
return(msw<<16)|(lsw&65535)
}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt))
}}Security.prototype.toString=function(){return"Security object"
};
this.Util=Util;
this.Browser=Browser;
this.Cookie=Cookie;
this.DOM=DOM;
this.Flash=Flash;
this.Html=Html;
if(typeof StringUtils!=="undefined"){this.StringUtils=StringUtils
}if(typeof Client!=="undefined"){this.Client=Client
}if(typeof Communication!=="undefined"){this.Communication=Communication
}if(typeof Security!=="undefined"){this.Security=Security
}})
}if(typeof window.BBEBNL=="undefined"){window.BBEBNL=new (function(){var f="https:"==document.location.protocol?"https:":"http:";
var d={sharedObject:{flashBaseUrl:f+"//go.eu.bbelements.com/flash"},serverCookie:{serviceUrl:f+"//go.eu.bbelements.com/bbnaut/getBbnaut"}};
function c(w,p){var t=new BBECML.Util();
p=t.createObjectIfUndefined(p);
var r=t.initializeDependencies(p.Cookie,BBECML.Cookie);
var k=t.initializeDependencies(p.DOM,BBECML.DOM);
var u=t.initializeDependencies(p.Client,BBECML.Client);
var h=t.initializeDependencies(p.Communication,BBECML.Communication);
var s=t.initializeDependencies(p.Security,BBECML.Security);
var j=16;
this.getDefaultOptions=function(){return{cookieName:"bbnaut",sharedObject:{flashBaseUrl:"http://localhost/Bbnaut"},serverCookie:{serviceUrl:"http://localhost/Bbnaut/getBbnaut"}}
};
var w=t.createObjectIfUndefined(w);
t.addMissingProperties(w,this.getDefaultOptions());
this.getBbnautFromLocalCookie=function(){var x=r.getLocalCookie({localCookie:{name:w.cookieName}});
if(v(x)){x=0;
this.setBbnautToLocalCookie(x)
}return x
};
this.setBbnautToLocalCookie=function(x){r.setLocalCookie({localCookie:{name:w.cookieName},value:x})
};
this.setBbnautToSharedObject=function(x){r.setSharedCookie({value:x})
};
this.setBbnautToLocalCookieAndSharedObject=function(x){this.setBbnautToLocalCookie(x);
this.setBbnautToSharedObject(x)
};
function q(x){return x.replace(/\s/g,"")
}function o(){var x=u.getData();
return q(x)
}this.propagateServerCookie=function(){var z=this;
BBCookie.serverCookieBbnautCallback=function(B){z.setBbnautToLocalCookie(B);
z.setBbnautToSharedObject(B)
};
var x={url:w.serverCookie.serviceUrl,params:{},longQueryStringClippingMethod:"MIDDLE"};
var y=o();
var A=this.generateBbnaut(y);
if((typeof A).toUpperCase()=="STRING"&&A!=""&&A!="0"){x.params.newBbnaut=A
}else{x.params.techPrint=y
}h.doGetRequest(x)
};
function n(y,x){if(v(x)){x=0;
this.setBbnautToSharedObject(x)
}if(x!=null&&x!=0){this.setBbnautToLocalCookie(x)
}else{if(y!=null&&y!=0){this.setBbnautToSharedObject(y)
}else{this.propagateServerCookie()
}}}function m(x){var y=this;
r.getSharedCookieAsync({sharedCookie:{baseUrl:w.sharedObject.flashBaseUrl},callback:function(z){n.call(y,x,z)
}})
}function l(x){var y=this;
setTimeout(function(){m.call(y,x)
},0)
}this.getBbnaut=function(){var x=this.getBbnautFromLocalCookie();
l.call(this,x);
return x
};
function v(x){if((typeof x).toUpperCase()=="UNDEFINED"||x==null||x==""||x=="0"){return false
}return x.length!=j
}this.generateBbnaut=function(x){if((typeof x).toUpperCase()=="UNDEFINED"){x=o()
}if(x.length==0){return""
}var y=s.hex_md5(x);
return y.substring(y.length-j)
}
}c.prototype.toString=function(){return"BbnautService object"
};
var g,e=new c(d),b=e.getBbnaut(),a=!b?e.generateBbnaut():null;
if(b){g="bbnaut="+b
}else{if(a){g="bbnautg="+a
}}if(g){if((typeof bburlparam).toUpperCase()=="STRING"&&bburlparam!=""){bburlparam+="&"+g
}else{bburlparam=g
}}this.bbnaut=b;
this.bbnautUrlParam=g;
this.BbnautService=c
})
}BmOne2n=function(d){var b=new BBECML.Util();
d=b.createObjectIfUndefined(d);
this.dom=b.initializeDependencies(d.DOM,BBECML.DOM);
this.browser=b.initializeDependencies(d.Browser,BBECML.Browser);
this.positions=new Object();
this.adRepository=new Object();
var a=null;
this.blockErrors=function(){if(typeof _bbdebug=="undefined"){if(!this.oldErrHandler){this.oldErrHandler=window.onerror
}window.onerror=this.failGracefully
}};
this.unblockErrors=function(){if(typeof _bbdebug=="undefined"){window.onerror=this.oldErrHandler
}};
this.failGracefully=function(){return true
};
this.addPosition=function(f,h,g,l,k,m,n){this.blockErrors();
var j=this.dom.getReferenceTo("bmone2n-"+f);
if(j&&(j.style.visibility.toUpperCase()!="HIDDEN")&&(j.style.display.toUpperCase()!="NONE")){this.positions[f]=new Object();
this.positions[f]["codeParams"]=typeof(h)!="string"?"":h;
this.positions[f]["objIDsS"]=g=="this"||g==""?"bmone2n-"+f:g;
this.positions[f]["objStylesS"]=l;
this.positions[f]["objIDsF"]=k=="this"||k==""?"bmone2n-"+f:k;
this.positions[f]["objStylesF"]=m;
this.positions[f]["callback"]=n
}this.unblockErrors()
};
this.addAd=function(g,h,f){this.blockErrors();
this.adRepository[g]=new Object();
this.adRepository[g]["adCode"]=h;
this.adRepository[g]["beacon"]=f?true:false;
this.unblockErrors()
};
this.makeAd=function(r){this.blockErrors();
var m,f,j="",h=true,l=this,g=true,p=false,k,f;
if(o(r)){p=true;
if(this.adRepository[r]["beacon"]){j="BBMEDIA ONE2MANY WARNING: INVISIBLE BEACON CODE TO BE PLACED HERE. IF YOU SEE THIS MESSAGE IT IS WRONG!"
}m=this.dom.getReferenceTo("bmone2n-"+r);
if(n(r)){f=this.dom.getReferenceTo("bmone2t-"+r);
if(!(this.browser.isMsie&&this.browser.majorVersion<=8)&&!(this.browser.isOpera&&this.browser.majorVersion<11)){this.moveSourceToTargetNow(f,m);
document.write(q(r))
}else{document.write(q(r));
if(h){this.adRepository[r]["tomove"]=true
}setTimeout(function(){l.waitForScripts(f,r)
},0);
g=false
}}else{if(m){m.innerHTML=q(r)
}else{g=false
}}}if(g){this.callCallback(r,p)
}this.unblockErrors();
function o(s){return l.adRepository[s]&&l.adRepository[s]["adCode"]
}function n(s){var t=l.adRepository[s]["adCode"].toUpperCase();
return(t.indexOf("<SC")!=-1)||(t.indexOf("SCRIPT")!=-1)
}function q(s){return l.adRepository[s]["adCode"]+j
}};
this.moveSourceToTargetNow=function(f,g){f=f.parentNode.removeChild(f);
f.style.display="block";
g.insertBefore(f,null)
};
var e={};
var c={};
this.waitForScripts=function(j,g){var k=this;
var f=j.getElementsByTagName("SCRIPT");
c[g]=e[g]=f.length;
if(f[0]&&!f[0].readyState){this.move1Ad(g,true)
}for(var h=0;
h<f.length;
h++){if(f[h].readyState=="complete"||(this.browser.isOpera&&f[h].readyState=="loaded")){this.checkReadiness(g,j)
}else{if(this.browser.isOpera){f[h].onload=function(){k.checkReadiness(g,j)
}
}else{f[h].onreadystatechange=function(){if(this.readyState=="complete"){k.checkReadiness(g,j)
}}
}}}};
this.checkReadiness=function(f,g){var h=this;
c[f]--;
if(c[f]<1){if(g.getElementsByTagName("SCRIPT").length==e[f]){BbSingleton.getEventDispatcher().registerListener("DOM",BbSingleton.getEventDispatcher().events.DOMLOADED,function(){h.move1Ad(f)
})
}else{setTimeout(function(){h.waitForScripts(g,f)
},0)
}}};
this.callCallback=function(f,g){if(this.positions[f]){if(typeof this.positions[f]["callback"]!="function"){this.changeStyles(f,g)
}else{this.positions[f]["callback"](f,g)
}}};
this.move1Ad=function(o,m){var h;
var g=null;
var n=null;
if(this.adRepository[o]["tomove"]){var l=this.dom.getReferenceTo("bmone2n-"+o);
if(l){var f=this.dom.getReferenceTo("bmone2t-"+o);
if(f){f.style.display="block";
if(this.browser.isMsie&&this.browser.majorVersion<=8){var j=f.getElementsByTagName("SCRIPT");
for(var k=0;
k<j.length;
k++){if(j[k].src!=""){j[k].src=""
}}}l.insertBefore(f,null);
this.callCallback(o,true)
}}this.adRepository[o]["tomove"]=false
}};
this.moveAd=function(){this.blockErrors();
var g=this;
if(!this.dom.isLoaded()){BbSingleton.getEventDispatcher().registerListener("DOM",BbSingleton.getEventDispatcher().events.DOMLOADED,function(){g.moveAd()
});
return
}for(var f in this.adRepository){this.move1Ad(f)
}this.unblockErrors()
};
this.getMoveAdCall=function(f){that=this;
return function(){that.move1Ad(f)
}
};
this.getAd=function(l,n,m,h){this.blockErrors();
var p=this,k=0,s="",f="";
if(t(l)){return
}var o=(location.protocol.substring(0,2)!="ht")?"http:":location.protocol;
if(o!="https:"){l=this.correctDomain(l)
}for(var u in this.positions){k++;
s+="&one2n"+k+"=/"+u.replace(/\./g,"/")+"/;"+u+";"+escape(this.positions[u]["codeParams"])
}if(k>0){s+="&one2n="+k;
var g=screen,j=navigator,q;
q="&ubl="+j.browserLanguage+"&ucc="+j.cpuClass+"&ucd="+g.colorDepth+"&uce="+j.cookieEnabled+"&udx="+g.deviceXDPI+"&udy="+g.deviceYDPI+"&usl="+j.systemLanguage+"&uje="+j.javaEnabled()+"&uah="+g.availHeight+"&uaw="+g.availWidth+"&ubd="+g.bufferDepth+"&uhe="+g.height+"&ulx="+g.logicalXDPI+"&uly="+g.logicalYDPI+"&use="+g.fontSmoothingEnabled+"&uto="+(new Date()).getTimezoneOffset()+"&uti="+(new Date()).getTime()+"&uui="+g.updateInterval+"&uul="+j.userLanguage+"&uwi="+g.width;
q=s+q;
if(typeof n=="string"&&n!=""){q+="&keywords="+escape(n)
}f=this.getSearchEngineKeywords();
if(f!=""){q+="&sekeywords="+escape(f)
}if(typeof m=="string"&&m!=""){q+=m
}if(q.indexOf("bbnaut")==-1&&(typeof window.BBEBNL).toLowerCase()=="object"&&(typeof window.BBEBNL.bbnautUrlParam).toLowerCase()=="string"){q+="&"+window.BBEBNL.bbnautUrlParam
}if(typeof h!="string"){h="windows-1250"
}document.write("<script type='text/javascript' charset='"+h+"' src='"+o+"//"+l+"/please/showit/0/0/0/1/?typkodu=js"+q+"&alttext=0&border=0&bust="+Math.random()+"&target=_top'><\/script>")
}function t(B){var z=0;
var A="go.gba.bbelements.com";
var x=100;
var w=0;
var y={5688:{domain:"go.cz.bbelements.com",dropRate:100}};
if(typeof bb_dropDomain=="string"){A=bb_dropDomain
}if(typeof bb_dropRate=="number"){if(bb_dropRate<w){x=w
}else{x=bb_dropRate
}}if(typeof bb_dropForServerId=="string"){y[bb_dropForServerId]={};
y[bb_dropForServerId]["domain"]=A;
y[bb_dropForServerId]["dropRate"]=x
}for(var v in p.positions){serverId=v.split(".")[z];
if(y[serverId]&&y[serverId]["domain"]==B){return r(y[serverId]["dropRate"])
}}return false
}function r(v){return Math.random()*100<v
}this.unblockErrors()
};
this.getSearchEngineKeywords=function(){var g="",f=["q","szukaj","qt"],k=document.referrer||"",j=";",l;
l=k.split("?")[1];
if(l){g=h(l,f)
}return g;
function h(n,v){var o,x,s,r,t=[],m="([^w]|^)",w="([^&]+)",p=/['"]/g,u=/[+ ]+/;
for(var q=0;
q<v.length;
q++){x="";
o=new RegExp(m+v[q]+"="+w,"gi");
s=o.exec(n);
if(s){x=s[2]
}if(x){x=decodeURIComponent(x);
x=x.replace(p,"");
r=x.split(u);
t=t.concat(r)
}}return t.join(j)
}};
this.correctDomain=function(g){var f={};
f["adarbo2.bbmedia.cz"]="go.arbo.bbelements.com";
f["adidnes2.bbmedia.cz"]="go.idnes.bbelements.com";
f["ad2.pl.mediainter.net"]="go.arbopl.bbelements.com";
f["ad2.bbmedia.cz"]="go.cz.bbelements.com";
if(f[g]){return f[g]
}else{return g
}};
this.changeStyles=function(p,o){this.blockErrors();
finalL=o?"S":"F";
var f="",n,q,r,m;
if(typeof(this.positions[p])!="undefined"&&this.positions[p]["objIDs"+finalL]){var j=(this.positions[p]["objIDs"+finalL]).split(",");
var l=(this.positions[p]["objStyles"+finalL]).split(",");
for(var k in j){if(!l[k]){if(f){l[k]=f
}else{return
}}var g=l[k];
f=g;
var h=this.dom.getReferenceTo(j[k]);
if(h){if(g.indexOf("class=")==0){h.className=g.substr(6)
}else{while(g){n=g.indexOf(":");
if(n==-1){return
}q=g.indexOf(";");
if(q==-1){q=g.length
}m=g.substr(0,n);
r=g.substr(n+1,q-n-1);
h.style[m]=r;
g=g.substr(q+1)
}}}}}this.unblockErrors()
};
this.rotateAd=function(h){if(typeof bb_rotation=="function"){bb_rotation(h)
}else{for(var g=0;
g<h.length;
g++){if(h[g].gId!=0&&h[g].poss.length>1){for(var f=0;
f<h[g].poss.length-1;
f++){sourceIdx=Math.floor(Math.random()*h[g].poss.length);
destIdx=Math.floor(Math.random()*h[g].poss.length);
if(sourceIdx!=destIdx){source=document.getElementById("bmone2n-"+h[g].poss[sourceIdx]);
dest=document.getElementById("bmone2n-"+h[g].poss[destIdx]);
placeHolder=document.createElement("SPAN");
if(source&&dest){sourcePar=source.parentNode;
destPar=dest.parentNode;
source=sourcePar.replaceChild(placeHolder,source);
dest=destPar.replaceChild(source,dest);
sourcePar.replaceChild(dest,placeHolder)
}}}}}}};
this.iniDivRotation=function(h){var f=new Object();
var j=[];
var k=h.split(";");
for(var g=0;
g<k.length;
g++){groupInfo=k[g].split("#");
groupId="grp"+groupInfo[1];
if(typeof f[groupId]!="undefined"){f[groupId].push(groupInfo[0])
}else{f[groupId]=[groupInfo[0]]
}}for(group in f){gid=group.substr(3);
j.push({gId:gid,poss:f[group]})
}this.rotateAd(j)
}
};
bmone2n=new BmOne2n();