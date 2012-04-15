var BaynoteJSVersion="Revision: 3.22 ";var BaynoteIgnored=false;var BN_READY_SIGNAL="ReadySignal";var Strategy={"ScriptDOMInject":2,"OnLoadInject":3};if(typeof(baynote_globals)=="undefined")var baynote_globals=new Object();baynote_globals.CommonResourceURL="/baynote/tags3/common";baynote_globals.CommonResourceID="Common";baynote_globals.PolicyResourceID="Policy";baynote_globals.CustomerStatus="/baynote/customerstatus2";baynote_globals.CommonScriptId="commonScriptId";if(typeof(baynote_inject_strategy)!="undefined"){baynote_globals.DefaultInjectStrategy=baynote_inject_strategy;}else{baynote_globals.DefaultInjectStrategy=Strategy.ScriptDOMInject;}
if(typeof(baynote_server_timeout)!="undefined"){baynote_globals.ServerTimeout=baynote_server_timeout;}else{baynote_globals.ServerTimeout=undefined;}
if(typeof(baynote_use_window_name)!="undefined"){baynote_globals.UseWindowName=baynote_use_window_name;}else{baynote_globals.UseWindowName=false;}
baynote_globals.waitForReady=false;baynote_globals.checkStatus=false;baynote_globals.keepTrail=false;baynote_globals.trailLength=5;bnIsOpera=(navigator.userAgent.indexOf("Opera")>=0);bnIsSafari=(navigator.userAgent.indexOf("AppleWebKit")>=0);bnIsKonqueror=(navigator.userAgent.indexOf("Konqueror")>=0);bnIsKHTML=(bnIsSafari||bnIsKonqueror||navigator.userAgent.indexOf("KHTML")>=0);bnIsIE=(navigator.userAgent.indexOf("compatible")>=0&&navigator.userAgent.indexOf("MSIE")>=0&&!bnIsOpera);bnIsMozilla=(navigator.userAgent.indexOf("Gecko")>=0&&!bnIsKHTML);function BNLog(){this.timeBase=new Date().getTime();this.lines=new Array();this.lastLine="";this.repCount=0;}
BNLog.prototype.log=function(str){if(str==this.lastLine){++this.repCount;return;}
if(this.repCount>0){this.lines.push("___ ABOVE REPEATED "+this.repCount+" TIME"+((this.repCount>1)?"S":""));}
this.lastLine=str;this.repCount=0;var elapsed=new Date().getTime()-this.timeBase;this.lines.push(elapsed+": "+str);};BNLog.prototype.toString=function(){if(this.repCount>0){this.lines.push("___ ABOVE REPEATED "+this.repCount+" TIME"+((this.repCount>1)?"S":""));this.lastLine="";this.repCount=0;}
return this.lines.join("\n");};if(typeof(bnLog)=="undefined"){var bnLog=new BNLog();}
function BNCriticalSectionQueue(){this.waitList=new Object();this.lastId=0;}
BNCriticalSectionQueue.prototype.issueId=function(){return++this.lastId;};BNCriticalSectionQueue.prototype.enqueue=function(id,item){this.waitList[id]=item;};BNCriticalSectionQueue.prototype.getWaiter=function(id){return(id==null)?null:this.waitList[id];};BNCriticalSectionQueue.prototype.firstWaiter=function(){return this.getWaiter(this.nextWaiterKeyAfter(null));};BNCriticalSectionQueue.prototype.nextWaiterAfter=function(id){return this.getWaiter(this.nextWaiterKeyAfter(id));};BNCriticalSectionQueue.prototype.nextWaiterKeyAfter=function(id){for(var currKey in this.waitList){if(typeof(this.waitList[currKey])!="object")continue;if(id==null)return currKey;if(id==currKey)id=null;}
return null;};BNCriticalSectionQueue.prototype.nextPredecessor=function(target,start){for(var currWaiter=start;currWaiter!=null;currWaiter=this.nextWaiterAfter(currWaiter.id)){if(currWaiter.enter||(currWaiter.number!=0&&(currWaiter.number<target.number||(currWaiter.number==target.number&&currWaiter.id<target.id)))){return currWaiter;}}
return null;};function BNCriticalSection(csQueue){this.csQueue=csQueue;this.debug=1;}
BNCriticalSection.prototype.enter=function(enterFunc){this.enterFunc=enterFunc;this.id=this.csQueue.issueId();this.csQueue.enqueue(this.id,this);this.enter=true;this.number=(new Date()).getTime();this.enter=false;this.attempt(this.csQueue.firstWaiter());};BNCriticalSection.prototype.leave=function(){if(this.debug)bnLog.log("LEAVE "+this.id);this.number=0;};BNCriticalSection.prototype.attempt=function(start){var nextReady=this.csQueue.nextPredecessor(this,start);if(nextReady!=null){if(this.debug)bnLog.log("WAIT "+this.id);var me=this;return setTimeout(function(){me.attempt(nextReady);},50);}
if(this.debug)bnLog.log("ENTER "+this.id);this.enterFunc();};function BNResourceManager(s){this.csQueue=new BNCriticalSectionQueue();this.critSec=null;this.debug=1;this.resources=new Object();this.waiting=new Object();this.onloadInjected=false;if(typeof(s)!="undefined"){this.strategy=s;}else{this.strategy=Strategy.ScriptDOMInject;}}
BNResourceManager.prototype.getResource=function(rId){return this.resources[rId];};BNResourceManager.prototype.loadResource=function(rId,rAddress,rType,timeout,failureFunc){if(typeof(this.resources[rId])!="undefined")return;this.resources[rId]=null;var critSec=new BNCriticalSection(this.csQueue);critSec.enter(function(){bnResourceManager.inject(rId,rAddress,rType,critSec,timeout,failureFunc);});};BNResourceManager.prototype.inject=function(rId,rAddress,rType,critSec,timeout,failureFunc){this.critSec=critSec;if(this.debug)bnLog.log("INJECT "+this.critSec.id+" ("+rId+")");if(typeof(rType)!="undefined"&&rType!="script"&&rType!="img"){bnLog.log("Unexpected resource type to loadResource: "+rType);return;}
this.defaultInject(rId,rAddress,rType,timeout,failureFunc);};BNResourceManager.prototype.defaultInject=function(rId,rAddress,rType,timeout,failureFunc){if(BaynoteIgnored)return;if(!rType||rType=="script"){if(this.strategy==Strategy.OnLoadInject){if(rId==baynote_globals.CommonResourceID||rId==baynote_globals.PolicyResourceID){if(!this.onloadInjected){var localInjectHandler=function(){bnResourceManager.injectHandler(rId,rAddress,timeout,failureFunc);};if(window.addEventListener)window.addEventListener("load",localInjectHandler,false);else if(window.attachEvent)window.attachEvent("onload",localInjectHandler);else window["onload"]=localInjectHandler;this.onloadInjected=true;return;}}}
this.injectHandler(rId,rAddress,timeout,failureFunc);}else if(rType=="img"){var img=document.createElement("IMG");var handler=function(){bnResourceManager.registerAndAddResource(rId,img);};if(img.addEventListener)img.addEventListener("load",handler,false);else if(img.attachEvent)img.attachEvent("onload",handler);else img["onload"]=handler;img.src=rAddress;img.style.display="none";var bodyElement=document.getElementsByTagName('body');var ph=bodyElement[0];setTimeout(function(){if(ph!=null)ph.appendChild(img);},5);}};BNResourceManager.prototype.injectHandler=function(rId,rAddress,timeout,failureFunc,scriptTag){if(!this.resources[rId]){if(typeof scriptTag!='undefined'){scriptTag.src='';if(typeof failureFunc=='function')failureFunc();BaynoteIgnored=true;bnLog.log('FATAL: Treating Baynote as down. Resource \''+rId+'\' took more than '+timeout+' mSec');return;}
var scriptTag1=document.createElement("script");setTimeout(function(){var head=document.getElementsByTagName("head");scriptTag1.language="javascript";scriptTag1.src=rAddress;head[0].appendChild(scriptTag1);},50);if(timeout===undefined||timeout===null){timeout=baynote_globals.ServerTimeout;}
if(typeof timeout!='undefined'){setTimeout(function(){bnResourceManager.injectHandler(rId,rAddress,timeout,failureFunc,scriptTag1);},timeout);}}};BNResourceManager.prototype.waitForResource=function(rId,callbackCode,rAddress,rType,timeout,failureFunc){with(this){if(getResource(rId)){this.runCallback(callbackCode);}else{if(typeof(waiting[rId])=="undefined")waiting[rId]=new Array();var waitingList=waiting[rId];waitingList[waitingList.length]=callbackCode;if(rAddress)this.loadResource(rId,rAddress,rType,timeout,failureFunc);}}};BNResourceManager.prototype.wakeUpWaiting=function(rId){with(this){var waitingList=waiting[rId];if(!waitingList)return;for(var i=0;i<waitingList.length;i++){if(waitingList[i]){var codeToEval=waitingList[i];waitingList[i]=null;if(this.debug&&codeToEval)bnLog.log("CALLBACK "+rId+": "+codeToEval);this.runCallback(codeToEval);}}}};BNResourceManager.prototype.registerAndAddResource=function(rId,resource){if(this.debug)bnLog.log("REGISTER "+(this.critSec?this.critSec.id:"")+" ("+rId+")");this.resources[rId]=resource;this.wakeUpWaiting(rId);if(this.critSec)this.critSec.leave();setTimeout("bnResourceManager.wakeUpWaiting('"+rId+"')",5000);};BNResourceManager.prototype.registerResource=function(rId){this.registerAndAddResource(rId,true);};BNResourceManager.prototype.removeResource=function(rId){this.resources[rId]=null;delete(this.resources[rId]);};BNResourceManager.prototype.runCallback=function(callback){if(typeof(callback)=="function")callback();else alert("Invalid callback, type="+typeof(callback));};if(typeof(bnResourceManager)=="undefined"){var bnResourceManager=new BNResourceManager(baynote_globals.DefaultInjectStrategy);}
function BNSystem(){this.testServer=null;}
BNSystem.prototype.getCookieValue=function(cookieName,cookieSubDomain){if(!cookieSubDomain)cookieSubDomain=baynote_globals.cookieSubDomain;if(cookieSubDomain)cookieName+=("-"+cookieSubDomain);var sRE="(?:; )?"+cookieName+"=([^;]*);?";var oRE=new RegExp(sRE);if(oRE.test(document.cookie)){return decodeURIComponent(RegExp["$1"]);}else{return null;}};BNSystem.prototype.setCookie=function(cookieName,cookieValue,cookiePath,cookieExpires,cookieDomain,cookieSubDomain){cookieValue=encodeURIComponent(cookieValue);if(cookieExpires=="NEVER"){var nowDate=new Date();nowDate.setFullYear(nowDate.getFullYear()+500);cookieExpires=nowDate.toGMTString();}
else if(cookieExpires=="SESSION")cookieExpires="";if(cookiePath!="")cookiePath=";Path="+cookiePath;if(cookieExpires!="")cookieExpires=";expires="+cookieExpires;if(!cookieDomain)cookieDomain=(baynote_globals.cookieDomain)?baynote_globals.cookieDomain:"";if(cookieDomain!="")cookieDomain=";domain="+cookieDomain;if(!cookieSubDomain)cookieSubDomain=baynote_globals.cookieSubDomain;if(cookieSubDomain)cookieName+=("-"+cookieSubDomain);var cookieStr=cookieName+"="+cookieValue+cookieExpires+cookiePath+cookieDomain;if(cookieStr.length>4096)return false;document.cookie=cookieStr;return true;};BNSystem.prototype.removeCookie=function(cookieName,cookieDomain){this.setCookie(cookieName,"","/","Mon, 1 Jan 1990 00:00:00",cookieDomain);};BNSystem.prototype.getURLParam=function(name,url){if(!url)var url=window.location.href;var regex=new RegExp("[\\?&]"+name+"=([^&#]*)");var match=regex.exec(url);if(!match)return null;else return match[1];};BNSystem.prototype.getTestServer=function(){if(this.testServer!=null)return this.testServer;var testServer=this.getCookieValue("bn_test");if(!testServer)testServer="";this.testServer=testServer;return testServer;};if(typeof(bnSystem)=="undefined"){var bnSystem=new BNSystem();}
function BNTag(previousTag){if(previousTag){this.id=previousTag.id+1;this.server=previousTag.server;this.customerId=previousTag.customerId;this.code=previousTag.code;}else this.id=0;this.attrs=new Object();this.docAttrs=new Object();this.css=new Object();}
BNTag.prototype.getCommonResourceId=function(){return baynote_globals.CommonResourceID;};BNTag.prototype.getCommonResourceAddress=function(obj){var urlParams='?';for(var i in obj){if(i!='server'){urlParams+=i+'='+encodeURIComponent(obj[i])+'&';}}
var cutLastAmp=urlParams.substring(0,urlParams.length-1);var commonURL=this.server+baynote_globals.CommonResourceURL+cutLastAmp;return commonURL;};BNTag.prototype.getFailsafeResourceId=function(){return"Failsafe";};BNTag.prototype.getFailsafeResourceAddress=function(){var v=BaynoteJSVersion.split(" ")[1];var u=bnSystem.getCookieValue("bn_u");return(this.server+baynote_globals.CustomerStatus+"?customerId="+this.customerId+"&code="+this.code+"&v="+v+"&u="+u);};BNTag.prototype.getParam=function(name,defaultValue){var value=this[name];if(typeof(value)=="undefined"||value==null)return defaultValue;else return value;};if(typeof(baynote_tag)=="undefined"){window["bn_tags"]=new Array();var baynote_tag=new BNTag(null);}
function bnReadySignal(){bnResourceManager.registerResource(BN_READY_SIGNAL);}
function bnCall(resName,methodName,methodArg){var resource=bnResourceManager.getResource(resName);if(!resource){bnResourceManager.waitForResource(resName,function(){bnCall(resName,methodName,methodArg);});return;}
if(typeof(resource)!="object"){return;}
var method=resource[methodName];if(typeof(method)!="function"){return;}
method.call(resource,methodArg);}
function bnWaitForCustomerStatus(callBack){if(!bnCheckCustomerStatus()){var failsafeId=baynote_tag.getFailsafeResourceId();bnResourceManager.waitForResource(failsafeId,function(){bnWaitForCustomerStatus(callBack);},baynote_tag.getFailsafeResourceAddress(),"img");return;}
bnResourceManager.runCallback(callBack);}
function bnCheckCustomerStatus(){var failsafeId=baynote_tag.getFailsafeResourceId();if(bnResourceManager.getResource(failsafeId))return true;else return false;}
var BaynoteAPI={};BaynoteAPI.getURLParam=function(paramName,url){return bnSystem.getURLParam(paramName,url);};BaynoteAPI.init=function(params){if(!params||!params.server||!params.customerId||!params.code){bnLog.log("ERROR: init called with insufficient arguments - needs server, customerId, code");return;}
if(!params.timeout){params.timeout=baynote_globals.ServerTimeout;}
if(!params.onFailure){params.onFailure=baynote_globals.onFailure;}
var testServer=bnSystem.getTestServer();if(testServer){var reValidTestServer=new RegExp("^https?://[^/]*\\.baynote\\.(com|net):?\\d*(/.*)?$");if(reValidTestServer.test(testServer))params.server=testServer;else bnLog.log("Ignoring invalid test server \""+testServer+"\"");}
if(params.server)baynote_tag.server=params.server;if(params.customerId)baynote_tag.customerId=params.customerId;if(params.code)baynote_tag.code=params.code;var commonId=baynote_tag.getCommonResourceId();if(!bnResourceManager.getResource(commonId)){bnResourceManager.waitForResource(commonId,function(){BaynoteAPI.init(params)},baynote_tag.getCommonResourceAddress(params),"script",params.timeout,params.onFailure);}else{if(!BaynoteIgnored){bnCommon.completePreload(params);}}};BaynoteAPI.execute=function(handlerName,handlerparams){var commonId=baynote_tag.getCommonResourceId();if(typeof(bnResourceManager.getResource(commonId))=='undefined'){bnLog.log("WARN: common not loaded - exiting execute; consider calling init first");return;}else if(typeof bnCommon=='undefined'){bnResourceManager.waitForResource(commonId,function(){BaynoteAPI.execute(handlerName,handlerparams);});return;}
bnCommon.waitAndExecute(handlerName,handlerparams);};BaynoteAPI.executeAll=function(handlerparams){var commonId=baynote_tag.getCommonResourceId();if(typeof(bnResourceManager.getResource(commonId))=='undefined'){bnLog.log("WARN: common not loaded - exiting executeAll; consider calling init first");return;}else if(typeof bnCommon=='undefined'){bnResourceManager.waitForResource(commonId,function(){BaynoteAPI.executeAll(handlerparams);});return;}
bnCommon.waitAndExecuteAll(handlerparams);};BaynoteAPI.call=function(handlerName,method,methodArgs,scopeObj){var commonId=baynote_tag.getCommonResourceId();if(typeof(bnResourceManager.getResource(commonId))=='undefined'){bnLog.log("WARN: common not loaded - exiting call; consider calling init first");return;}else if(typeof bnCommon=='undefined'){bnResourceManager.waitForResource(commonId,function(){BaynoteAPI.call(handlerName,method,methodArgs,scopeObj);});return;}
bnCommon.finishCall(handlerName,method,methodArgs,scopeObj);};BaynoteAPI.isBaynoteIgnored=function(){return BaynoteIgnored;};BaynoteAPI.getCookieDomain=function(){var cDomain="";var bn_locHref=window.location.href;var i=bn_locHref.indexOf('//');var s1=bn_locHref.substring(i+2);var j=s1.indexOf('/');if(j<0)
var s2=s1;else
var s2=s1.substring(0,j);var k=s2.indexOf('.');var s3=s2.substring(k+1);s3;return cDomain=s3;}

 




	
	
	

		
		

baynote_globals.TagsURLPrefix="/baynote/tags3/";baynote_globals.CustomScript="customScript";baynote_globals.GuideSet="GuideSet";baynote_globals.ScriptWebapp="r";baynote_globals.ScriptResourceId="Custom";baynote_globals.guideContainerId="baynote_guides";baynote_globals.DefaultCookieAge=10*365*24*60*60*1000;baynote_globals.WindowNameDelimBegin="bAyNoTe>-";baynote_globals.WindowNameDelimEnd="-<EtOnYaB";baynote_globals.ExternalUserIdCookieName="bn_ext_u";baynote_globals.onBeforeTagShow=new Array();baynote_globals.onTagShow=new Array();bnConstants=new Object();bnConstants.ANONYMOUS_USER_ID="ANONYMOUS";bnConstants.UNASSIGNED_USER_ID="UNASSIGNED";bnConstants.DEMO_USER_ID="DEMO";bnConstants.BN_PARAM_PREFIX="bn_";bnConstants.META_PAGE_STATUS="baynote_page_status";bnConstants.META_PAGE_TITLE="baynote_title";bnConstants.META_PAGE_SUBTITLE="baynote_subtitle";bnConstants.POLICY_RESOURCE_ID=baynote_globals.PolicyResourceID;bnConstants.OBSERVER_TAG="baynoteObserver";bnConstants.OBSERVER_RESOURCE_ID=bnConstants.OBSERVER_TAG;bnConstants.GUIDE_TAG="guide";bnConstants.GUIDE_RESOURCE_PREFIX=bnConstants.GUIDE_TAG;bnConstants.SOCIAL_TAG="baynoteSocial";bnConstants.SOCIAL_RESOURCE_ID=bnConstants.SOCIAL_TAG;bnConstants.AJAX_TAG="ajax";bnConstants.MAX_INT=2147483647;bnConstants.JSON_CHARS={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};bnConstants.NETWORK_ID_RADIX=64;bnConstants.MAX_URL_LENGTH=2000;StringBuffer=function(){this.buffer=[];}
StringBuffer.prototype.append=function append(string){this.buffer.push(string);return this;};StringBuffer.prototype.toString=function toString(){return this.buffer.join("");};BNTag.prototype.injectNoload=function(comment,ph){if(!ph){ph=document.getElementById(this.placeHolderId);}
if(!ph)return;if(this.noload)ph.innerHTML=this.noload;else if(comment)ph.innerHTML='<div comment="'+comment+'"/>';};BNTag.prototype.getTotalPurchases=function(){if(typeof(bnOrderId)!="undefined"&&bnCommon.isNotEmpty(bnOrderId))
this.attrs.purchaseId=bnOrderId;if(typeof(bnOrderTotal)!="undefined"&&bnCommon.isNotEmpty(bnOrderTotal))
this.attrs.totalPurchases=parseFloat(bnOrderTotal);if(typeof(bnOrderDetails)!="undefined"&&bnCommon.isNotEmpty(bnOrderDetails))
this.attrs.purchaseDetails=bnOrderDetails;};BNCommon=function(){};BNCommon.prototype.stringToBoolean=function(str){if(!str)return false;str=str.toLowerCase();if(str==""||str=="false"||str=="f"||str=="0"||str=="no"||str=="n")return false;return true;};BNCommon.prototype.copyObj=function(obj,props){var newObj=new Object();for(var prop in obj){var child=obj[prop];if(typeof(child)=="undefined"||typeof(child)=="function")continue;if(child!=null)newObj[prop]=child;}
return newObj;};BNCommon.prototype.copyProperties=function(src,dst,props){for(var i=0;i<props.length;++i){var name=props[i];var value=src[name];if(typeof(value)=="undefined"||value==null)continue;dst[name]=value;}};BNCommon.prototype.dumpObj=function(obj,name,indent,depth,asHTML){if(asHTML){var ind="&nbsp;&nbsp;";var ret="<br>";}else{var ind="\t";var ret="\n";}
var MAX_DUMP_DEPTH=10;if(depth>MAX_DUMP_DEPTH){return indent+name+": -Maximum Depth Reached-"+ret;}
if(typeof obj=="object"){var child=null;var output=name?(indent+name+ret):"";indent+=ind;var numFunctions=0;for(var item in obj){try{child=obj[item];}catch(e){child="-Unable to Evaluate-";}
if(child==null)output+=indent+item+": <null>"+ret;else if(typeof child=="function")++numFunctions;else if(typeof child=="object")output+=this.dumpObj(child,item,indent,depth+1,asHTML);else output+=indent+item+": "+child+ret;}
if(numFunctions>0)output+=indent+"<"+numFunctions+" function(s)>"+ret;return output;}else return obj;};BNCommon.prototype.dump=function(obj){return this.dumpObj(obj,"","  ",5,false);};BNCommon.prototype.dumpHTML=function(obj){return this.dumpObj(obj,"","  ",5,true);};BNCommon.prototype.getURLParams=function(url){if(!url)var url=window.location.href;var urlParams=new Object();var tmp=url.split("?");if(tmp.length>1&&tmp[1]!=""){tmp=tmp[1];tmp=tmp.split("#");tmp=tmp[0];var params=tmp.split("&");var nameValuePair;for(var i=0;i<params.length;i++){nameValuePair=params[i].split("=");urlParams[nameValuePair[0]]=nameValuePair[1];}}
return urlParams;};BNCommon.prototype.addURLParam=function(url,paramName,value){if(!url)return url;var urlLength=url.length;var newUrl=new StringBuffer();var insertedChar;var baseUrl=url;var baseUrlLength=urlLength;var anchor=null;var anchorIndex=url.indexOf('#');if(anchorIndex>=0){baseUrl=url.substring(0,anchorIndex);if(baseUrl=="")return url;baseUrlLength=baseUrl.length;anchor=url.substring(anchorIndex,urlLength);}
var lastChar=baseUrl.charAt(baseUrlLength-1);if(lastChar=='?'||lastChar=='&'){insertedChar=null;}else if(baseUrl.indexOf('?')>=0){insertedChar='&';}else{insertedChar='?';}
newUrl.append(baseUrl);if(insertedChar)newUrl.append(insertedChar);newUrl.append(paramName);newUrl.append('=');newUrl.append(value);if(anchor)newUrl.append(anchor);return newUrl.toString();};BNCommon.prototype.addURLMetaKeys=function(url,metaKeyList){if(!metaKeyList)return url;var newUrl=url;var metaKeys=metaKeyList.split(",");for(var i=0;i<metaKeys.length;i++){var key=metaKeys[i];var metas=document.getElementsByName(key);for(var j=0;j<metas.length;j++){if(metas[j].tagName.toUpperCase()=="META"){newUrl=bnCommon.addURLParam(newUrl,"bn_"+key,encodeURIComponent(metas[j].content));break;}}}
return newUrl;};BNCommon.prototype.getCookieValue=function(cookieName){return bnSystem.getCookieValue(cookieName);};BNCommon.prototype.setCookie=function(cookieName,cookieValue,cookiePath,cookieExpires){return bnSystem.setCookie(cookieName,cookieValue,cookiePath,cookieExpires);};BNCommon.prototype.removeCookie=function(cookieName){return bnSystem.removeCookie(cookieName);};BNCommon.prototype.normalizeUrl=function(tag,url){if(typeof(tag.bnProxyPrefix)!="undefined"&&tag.bnProxyPrefix&&url.indexOf(tag.bnProxyPrefix)==0&&url.length>tag.bnProxyPrefix.length){return url.substring(tag.bnProxyPrefix.length,url.length);}
return url;};BNCommon.prototype.arrayToJSON=function(arr){var a=['['],b,i,l=arr.length,v;function p(s){if(b){a.push(',');}
a.push(s);b=true;}
for(i=0;i<l;i+=1){v=arr[i];switch(typeof v){case'undefined':case'function':case'unknown':break;default:var json=bnCommon.valueToJSON(v);if(json)p(json);}}
a.push(']');return a.join('');};BNCommon.prototype.booleanToJSON=function(bool){return String(bool);};BNCommon.prototype.numberToJSON=function(num){return isFinite(num)?String(num):"null";};BNCommon.prototype.objectToJSON=function(obj){var a=['{'],b,i,v;function p(s){if(b){a.push(',');}
a.push(bnCommon.valueToJSON(i),':',s);b=true;}
for(i in obj){if(obj.hasOwnProperty(i)){var json=bnCommon.valueToJSON(obj[i]);if(json)p(json);else p("null");}}
a.push('}');return a.join('');};BNCommon.prototype.stringToJSON=function(str){var specialRE=new RegExp("[\\\"\\\\\\x00-\\x1f]","g");if(specialRE.test(str)){return'"'+str.replace(specialRE,function(b){var c=bnConstants.JSON_CHARS[b];if(c)return c;c=b.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+str+'"';};BNCommon.prototype.valueToJSON=function(val){switch(typeof val){case'number':return this.numberToJSON(val);case'string':return this.stringToJSON(val);case'boolean':return this.booleanToJSON(val);case'object':if(val==null){return"null";}else if(val instanceof Array){return this.arrayToJSON(val);}else{return this.objectToJSON(val);}
case'unknown':case'function':case'undefined':break;default:alert("Unrecognized type: "+typeof val);}
return undefined;};BNCommon.prototype.parseJSON=(function(){"use strict";var at,ch,escapee={'"':'"','\\':'\\','/':'/',b:'\b',f:'\f',n:'\n',r:'\r',t:'\t'},text,error=function(m){throw{name:'SyntaxError',message:m,at:at,text:text};},next=function(c){if(c&&c!==ch){error("Expected '"+c+"' instead of '"+ch+"'");}
ch=text.charAt(at);at+=1;return ch;},number=function(){var number,string='';if(ch==='-'){string='-';next('-');}
while(ch>='0'&&ch<='9'){string+=ch;next();}
if(ch==='.'){string+='.';while(next()&&ch>='0'&&ch<='9'){string+=ch;}}
if(ch==='e'||ch==='E'){string+=ch;next();if(ch==='-'||ch==='+'){string+=ch;next();}
while(ch>='0'&&ch<='9'){string+=ch;next();}}
number=+string;if(!isFinite(number)){error("Bad number");}else{return number;}},string=function(){var hex,i,string='',uffff;if(ch==='"'){while(next()){if(ch==='"'){next();return string;}else if(ch==='\\'){next();if(ch==='u'){uffff=0;for(i=0;i<4;i+=1){hex=parseInt(next(),16);if(!isFinite(hex)){break;}
uffff=uffff*16+hex;}
string+=String.fromCharCode(uffff);}else if(typeof escapee[ch]==='string'){string+=escapee[ch];}else{break;}}else{string+=ch;}}}
error("Bad string");},white=function(){while(ch&&ch<=' '){next();}},word=function(){switch(ch){case't':next('t');next('r');next('u');next('e');return true;case'f':next('f');next('a');next('l');next('s');next('e');return false;case'n':next('n');next('u');next('l');next('l');return null;}
error("Unexpected '"+ch+"'");},value,array=function(){var array=[];if(ch==='['){next('[');white();if(ch===']'){next(']');return array;}
while(ch){array.push(value());white();if(ch===']'){next(']');return array;}
next(',');white();}}
error("Bad array");},object=function(){var key,object={};if(ch==='{'){next('{');white();if(ch==='}'){next('}');return object;}
while(ch){key=string();white();next(':');if(Object.hasOwnProperty.call(object,key)){error('Duplicate key "'+key+'"');}
object[key]=value();white();if(ch==='}'){next('}');return object;}
next(',');white();}}
error("Bad object");};value=function(){white();switch(ch){case'{':return object();case'[':return array();case'"':return string();case'-':return number();default:return ch>='0'&&ch<='9'?number():word();}};return function(source,reviver){var result;text=source;at=0;ch=' ';result=value();white();if(ch){error("Syntax error");}
return typeof reviver==='function'?(function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}({'':result},'')):result;};}());BNCommon.prototype.trim=function(str){if(!str)return str;while(str.charAt(0)==" "||str.charAt(0)=="\n"||str.charAt(0)=="\t")
str=str.substring(1);while(str.charAt(str.length-1)==" "||str.charAt(str.length-1)=="\n"||str.charAt(str.length-1)=="\t")
str=str.substring(0,str.length-1);return str;};BNCommon.prototype.stripExtraQuotes=function(s){var t=s.length;if(s.charAt(0)=='"'){s=s.substring(1,t--);}
if(s.charAt(--t)=='"'){s=s.substring(0,t);}
return s;};BNCommon.prototype.getInnerText=function(obj){if(obj.innerText)return obj.innerText;else{var text="";switch(obj.nodeType){case 1:for(var i=0;i<obj.childNodes.length;i++)
text+=this.getInnerText(obj.childNodes.item(i));break;case 3:text+=obj.nodeValue;break;}
return this.trim(text);}};BNCommon.prototype.hasAnyProperty=function(obj){if(obj&&(typeof(obj)!="undefined")){for(var attrName in obj){if(obj.hasOwnProperty(attrName)){var t=typeof obj[attrName];if(t!='function'&&t!='undefined'){return true;}}}}
return false;};BNCommon.prototype.containsKey=function(obj,key){if(typeof(obj["hasOwnProperty"])=="function"){return obj.hasOwnProperty(key);}
else
{return!(typeof(obj[key])=="undefined"||typeof(obj[key])=="function");}};BNCommon.prototype.getURL=function(fullUrl,urlParams,bnParams){if(!urlParams)urlParams=new Object();if(!bnParams)bnParams=new Object();var params=bnCommon.getURLParams(fullUrl);for(var paramName in params){if(typeof(params[paramName])=="function")continue;if(paramName.indexOf(bnConstants.BN_PARAM_PREFIX)==0){bnParams[paramName]=params[paramName];}else{urlParams[paramName]=params[paramName];}}
var url=fullUrl.split("?")[0];var isFirst=true;for(var paramName in urlParams){if(typeof(params[paramName])=="function")continue;if(isFirst)url+="?";else url+="&";isFirst=false;url+=paramName+"=";var value=params[paramName];if(value)url+=value;}
return url;};BNCommon.prototype.isGuideContainerPresent=function(){var present=false;var eids=bnPolicy.getGuideElementIds();for(var i=0;i<eids.length;i++){if(document.getElementById(eids[i])!=null){present=true;break;}}
return present;};BNCommon.prototype.getAllGuideContainersPresent=function(){var containers=new Array();var eids=bnPolicy.getGuideElementIds();for(var i=0;i<eids.length;i++){if(document.getElementById(eids[i])!=null){containers.push(eids[i]);}}
return containers;};BNCommon.prototype.isNotEmpty=function(name){return(name!=null)&&(name!="");};BNCommon.prototype.lookupMeta=function(name){return this.lookupMetaAttrib(name,'name');};BNCommon.prototype.lookupMetaAttrib=function(metaName,attrib){var metas=document.getElementsByTagName("meta");if(!metas)return null;for(var i in metas){if(metas[i]&&metas[i][attrib]&&metas[i][attrib].toLowerCase()==metaName.toLowerCase()){return metas[i].content;}}
return null;};BNCommon.prototype.completePreload=function(params){if(!params||!params.server||!params.customerId||!params.code){bnLog.log("ERROR: completePreload called with insufficient arguments - needs server, customerId, code");return;}
if(typeof baynoteGetTagServer=='function'){params.server=baynoteGetTagServer();baynote_tag.server=baynoteGetTagServer();}
if(typeof baynoteGetCustomerId=='function'){params.customerId=baynoteGetCustomerId();baynote_tag.customerId=baynoteGetCustomerId();}
if(typeof baynoteGetCustomerCode=='function'){params.code=baynoteGetCustomerCode();baynote_tag.code=baynoteGetCustomerCode();}
if(!bnPolicy.get()){bnResourceManager.waitForResource(bnConstants.POLICY_RESOURCE_ID,function(){bnCommon.completePreload(params);});if(params.policyFormat){bnPolicy.load(params.server,params.customerId,params.code,bnUser.getUserId(),params.policyFormat);}else{bnPolicy.load(params.server,params.customerId,params.code,bnUser.getUserId());}
return;}
var loadCustom=true;var loadObs=true;var loadGuide=true;var loadAjax=false;if(typeof(params.preload)=="object"&&params.preload.length!=undefined){loadCustom=false;loadObs=false;loadGuide=false;loadAjax=false;for(var i=0;i<params.preload.length;i++){switch(params.preload[i]){case'custom':loadCustom=true;break;case'observer':loadObs=true;break;case'recommendation':loadGuide=true;break;case'ajax':loadAjax=true;break;}}}
if(loadCustom&&bnPolicy.customScriptPresent){if(!bnResourceManager.getResource(baynote_globals.ScriptResourceId)){bnResourceManager.waitForResource(baynote_globals.ScriptResourceId,function(){bnCommon.completePreload(params);});bnResourceManager.loadResource(baynote_globals.ScriptResourceId,bnPolicy.getCustomScriptAddress(params));return;}}
var observerResId=bnTagManager.getHandlerResourceId(bnConstants.OBSERVER_TAG);if(loadObs&&!bnResourceManager.getResource(observerResId)){bnResourceManager.waitForResource(observerResId,function(){bnCommon.completePreload(params);});bnResourceManager.loadResource(observerResId,bnTagManager.getHdlrResAddress(bnConstants.OBSERVER_TAG,params.server));return;}
var guideResId=bnTagManager.getHandlerResourceId(bnConstants.GUIDE_TAG);if(loadGuide&&!bnResourceManager.getResource(guideResId)){bnResourceManager.waitForResource(guideResId,function(){bnCommon.completePreload(params);});bnResourceManager.loadResource(guideResId,bnTagManager.getHdlrResAddress(bnConstants.GUIDE_TAG,params.server));return;}
var ajaxResId=bnTagManager.getHandlerResourceId(bnConstants.AJAX_TAG);if(loadAjax&&!bnResourceManager.getResource(ajaxResId)){bnResourceManager.waitForResource(ajaxResId,function(){bnCommon.completePreload(params);});bnResourceManager.loadResource(ajaxResId,bnTagManager.getHdlrResAddress(bnConstants.AJAX_TAG,params.server));return;}};BNCommon.prototype.prepareTag=function(tagName,tag,params){if(tag&&params&&typeof params=='object'){for(var p in params){tag[p]=params[p];}}
switch(tagName){case'observer':tag.type=bnConstants.OBSERVER_TAG;break;case'recommendation':tag.type=bnConstants.GUIDE_TAG;break;case'ajax':tag.type=bnConstants.AJAX_TAG;break;}
return tag;};BNCommon.prototype.getResourceName=function(handlerName){switch(handlerName){case'observer':var type=bnTagManager.getHandlerResourceId(bnConstants.OBSERVER_TAG);break;case'recommendation':var type=bnTagManager.getHandlerResourceId(bnConstants.GUIDE_TAG);break;case'ajax':var type=bnTagManager.getHandlerResourceId(bnConstants.AJAX_TAG);break;case'custom':var type=baynote_globals.ScriptResourceId;break;default:return;}
return type;};BNCommon.prototype.getLoadedHandler=function(handlerName){switch(handlerName){case'observer':var type=bnConstants.OBSERVER_TAG;break;case'recommendation':var type=bnConstants.GUIDE_TAG;break;case'ajax':var type=bnConstants.AJAX_TAG;break;case'custom':return bnResourceManager.getResource(baynote_globals.ScriptResourceId);}
return bnTagManager.getHandlerByType(type);};BNCommon.prototype.waitAndExecute=function(handlerName,handlerparams){var resName=this.getResourceName(handlerName);var resId=bnResourceManager.getResource(resName);if(typeof resId!='undefined'){var theHandler=this.getLoadedHandler(handlerName);if(theHandler){if(typeof theHandler=='object'){this.prepareTag(handlerName,baynote_tag,handlerparams);window["bn_tags"][baynote_tag.id]=baynote_tag;bnTagManager.show(baynote_tag.id);baynote_tag=new BNTag(baynote_tag);}}}else{bnResourceManager.waitForResource(resName,function(){bnCommon.waitAndExecute(handlerName,handlerparams);});}};BNCommon.prototype.waitAndExecuteAll=function(handlerparams){var knownHandlers=['observer','recommendation'];for(var i=0;i<knownHandlers.length;i++){this.waitAndExecute(knownHandlers[i],handlerparams);}};BNCommon.prototype.finishCall=function(handlerName,method,methodArgs,scopeObj){var resName=this.getResourceName(handlerName);var resId=bnResourceManager.getResource(resName);if(typeof resId!='undefined'){var bnObject=window;if(scopeObj){bnObject=window[scopeObj];}
if(bnObject&&typeof bnObject=='object'){var methodObj=bnObject[method];if(typeof methodObj=='function'){methodObj.apply(bnObject,methodArgs);}}}else{this.completePreload({server:baynote_tag.server,customerId:baynote_tag.customerId,code:baynote_tag.code,preload:[handlerName]});bnResourceManager.waitForResource(resName,function(){bnCommon.finishCall(handlerName,method,methodArgs,scopeObj);});return;}};BNCommon.prototype.isArray=function(obj){return this.checkType(obj,'Array');};BNCommon.prototype.checkType=function(obj,type){return obj.constructor.toString().indexOf(type)!=-1;};bnCommon=new BNCommon();BNReferrer=function(url){this.url=url;};BNPageInfo=function(){this.fullUrl=window.location.href.split("#")[0];this.urlParams=new Object();this.bnParams=new Object();this.url=bnCommon.getURL(this.fullUrl,this.urlParams,this.bnParams);if(!window.name){var date=new Date();window.name=date.getTime();}
this.checkWindowAttributes();var that=this;var processPageDetailsProxyFn=function(){that.processPageDetails();};bnResourceManager.waitForResource(bnConstants.POLICY_RESOURCE_ID,processPageDetailsProxyFn);};BNPageInfo.prototype.checkWindowAttributes=function(){if(!document.body)
{setTimeout("bnPageInfo.checkWindowAttributes()",200);return;}
this.windowWidth=document.body.scrollWidth;this.windowHeight=document.body.scrollHeight;if(bnIsIE)this.windowHeight=document.body.offsetHeight;};BNPageInfo.prototype.processPageDetails=function(){bnLog.log("INFO: bnPageInfo.processPageDetails is called.");this.checkReferrer();this.checkTitle();this.checkIf404();this.checkWordCount();this.checkLinkCount();};BNPageInfo.prototype.checkReferrer=function(){var referrer;var bn_referdata=bnCommon.getCookieValue("bn_referdata");if(bn_referdata){var parts=bn_referdata.split("|");if(url==parts[1])
referrer=parts[0];bnCommon.removeCookie("bn_referdata");}else referrer=document.referrer;if(!referrer)this.referrer=null;else this.referrer=new BNReferrer(referrer);};BNPageInfo.prototype.checkTitle=function(){var title=null;var metas=document.getElementsByName(bnConstants.META_PAGE_SUBTITLE);if(metas&&metas.length==1)title=metas[0].content;if(!title){var metas=document.getElementsByName(bnConstants.META_PAGE_TITLE);if(metas&&metas.length>0)title=metas[0].content;if(!title)title=document.title;}
this.title=title?title:"";};BNPageInfo.prototype.checkIf404=function(){this.iAm404=false;var metas=document.getElementsByName(bnConstants.META_PAGE_STATUS);if(metas&&metas.length>0){var status=parseInt(metas[0].content);if(status==404)this.iAm404=true;}};BNPageInfo.prototype.checkWordCount=function(){if(typeof(baynote_globals)!="undefined"&&baynote_globals.skipWordCount){this.wordCount=-1;return;}
if(!document.body){this.wordCount=-1;this.linkCount=-1;setTimeout("bnPageInfo.checkWordCount()",200);return;}
this.wordCount=null;var bodyTags=document.getElementsByTagName("body");if(bodyTags.length==0)return;var bodyText=bnCommon.getInnerText(bodyTags[0]);var wordCountRE=new RegExp("\\S+","g");var words=bodyText.match(wordCountRE);if(!words)this.wordCount=0;else this.wordCount=words.length;};BNPageInfo.prototype.checkLinkCount=function(){if(typeof(baynote_globals)!="undefined"&&baynote_globals.skipLinkCount){this.linkCount=-1;return;}
this.linkCount=null;var linkTags=document.getElementsByTagName("a");if(!linkTags)this.linkCount=0;else this.linkCount=linkTags.length;};BNPageInfo.prototype.getWindowName=function(){return window.name;};BNPageInfo.prototype.getWordCount=function(){return this.wordCount;};BNPageInfo.prototype.getLinkCount=function(){return this.linkCount;};BNPageInfo.prototype.getTitle=function(){return this.title;};BNPageInfo.prototype.is404=function(){return this.iAm404;};BNPageInfo.prototype.cookiesAreEnabled=function(){if(typeof(baynote_globals)!="undefined"&&baynote_globals.cookiesDisabled)return false;else return true;};BNPageInfo.prototype.getURL=function(){return this.url;};BNPageInfo.prototype.getFullURL=function(){return this.fullUrl;};BNPageInfo.prototype.getURLParams=function(){return this.urlParams;};BNPageInfo.prototype.getURLParam=function(paramName){return this.urlParams[paramName];};BNPageInfo.prototype.getBNParams=function(){return this.bnParams;};BNPageInfo.prototype.getBNParam=function(paramName){return this.bnParams[paramName];};BNPageInfo.prototype.getReferrerURL=function(){if(!this.referrer)return null;return this.referrer.url;};BNPageInfo.prototype.isBinary=function(url){if(!url)return false;if(url.match(/^[^?]*\.(pdf|doc|xls|ppt)(\?.*)?$/i))return true;if(url.match(/^.*\/m?getfile\?.*$/i))return true;return false;};bnPageInfo=new BNPageInfo();BNUser=function(){this.userId=null;this.extUserId=null;var extUserId=bnCommon.getCookieValue(baynote_globals.ExternalUserIdCookieName);var userFromURL=this.getUserFromURL();if(userFromURL){this.setUserId(userFromURL);return;}
var oldUserId=bnCommon.getCookieValue("_baynote_anon_user");if(oldUserId){this.setUserId(oldUserId);bnCommon.removeCookie("_baynote_anon_user");return;}
var userId;if(baynote_globals.UseWindowName){userId=this.readUserCookieFromWindowName();}
if(!userId){userId=bnCommon.getCookieValue("bn_u");if(baynote_globals.UseWindowName&&userId){this.writeUserCookieToWindowName(userId);}}
if(userId){this.setUserId(userId,true);return;}
this.setUserId(bnConstants.UNASSIGNED_USER_ID);userId=bnCommon.getCookieValue("bn_u");if(!userId)this.setUserId(bnConstants.ANONYMOUS_USER_ID,true);};BNUser.prototype.getUserFromURL=function(){var userParam=bnPageInfo.getBNParam("bn_u");var user=null;if(userParam!=null){if(userParam=="")user=bnConstants.UNASSIGNED_USER_ID;else user=userParam;}
return user;};BNUser.prototype.getUserId=function(tag){if(tag&&tag.userId)return tag.userId;return this.userId;};BNUser.prototype.getExtUserId=function(){return this.extUserId;};BNUser.prototype.setUserId=function(userId,skipWrite){if(bnPageInfo.cookiesAreEnabled()&&!skipWrite){if(baynote_globals.UseWindowName){this.writeUserCookieToWindowName(userId);}
this.writeUserCookie(userId);}
this.userId=userId;};BNUser.prototype.setExtUserId=function(extUserId){if(bnPageInfo.cookiesAreEnabled()){this.writeExtUserCookie(extUserId);}
this.extUserId=extUserId;};BNUser.prototype.resetExtUserId=function(){if(bnPageInfo.cookiesAreEnabled()){bnCommon.removeCookie(baynote_globals.ExternalUserIdCookieName);}
this.extUserId=null;};BNUser.prototype.readUserCookieFromWindowName=function(){var cky;var re=new RegExp(baynote_globals.WindowNameDelimBegin+"({.*})"+
baynote_globals.WindowNameDelimEnd);var m=re.exec(window.name);var custCodeKey=baynote_tag.customerId+'_'+baynote_tag.code;if(m!=null){var mapStr=RegExp.$1;var ckObj=bnCommon.parseJSON(mapStr);var currCkMap=ckObj[custCodeKey];if(currCkMap){cky=currCkMap["bn_u"];}}
return cky;};BNUser.prototype.writeUserCookieToWindowName=function(userId){var re=new RegExp(baynote_globals.WindowNameDelimBegin+"({.*})"+
baynote_globals.WindowNameDelimEnd);var m=re.exec(window.name);var custCodeKey=baynote_tag.customerId+'_'+baynote_tag.code;var ckObj,remaining="";if(m!=null){var mapStr=RegExp.$1;ckObj=bnCommon.parseJSON(mapStr);var currCkMap=ckObj[custCodeKey]||{};currCkMap["bn_u"]=userId;ckObj[custCodeKey]=currCkMap;remaining=window.name.replace(re,'');}else{ckObj={};ckObj[custCodeKey]={"bn_u":userId};remaining=window.name;}
var newCookieStr=baynote_globals.WindowNameDelimBegin
+bnCommon.objectToJSON(ckObj)
+baynote_globals.WindowNameDelimEnd;window.name=newCookieStr+remaining;};BNUser.prototype.reWriteUserCookie=function(){this.writeUserCookie(this.userId);};BNUser.prototype.writeUserCookie=function(userId){this.writeCookie("bn_u",userId);};BNUser.prototype.writeExtUserCookie=function(userId){this.writeCookie(baynote_globals.ExternalUserIdCookieName,userId);};BNUser.prototype.writeCookie=function(name,val){var cookieExpires=this.getDefaultCookieExpiry();bnCommon.setCookie(name,val,"/",cookieExpires);};BNUser.prototype.getDefaultCookieExpiry=function(){var age=baynote_globals.DefaultCookieAge;if(typeof bnPolicy!='undefined'){age=parseFloat(bnPolicy.userCookieAge)*1;}
var currTimestamp=new Date();var currTime=currTimestamp.getTime();currTimestamp.setTime(currTime+age);return currTimestamp.toGMTString();};bnUser=new BNUser();BNPolicy=function(){this.data=null;this.overrides=null;this.userId=null;this.disableAll=bnPageInfo.getBNParam("bn_disable");this.customScriptPresent=false;this.elementIds=null;this.userCookieAge=null;};BNPolicy.prototype.get=function(pId,param){if(!pId)return this.data;if(!this.data)return null;if(!param)return this.data[pId];if(!this.data[pId])return null;return this.data[pId][param];};BNPolicy.prototype.getCondition=function(tag){var origCondition=this.get("inf","cd");if(tag&&tag.conditionName){return origCondition.replace(/^([0-9]+)[.]([A-Z]+)(.*)/,"$1."+tag.conditionName+"$3");}
return origCondition;};BNPolicy.prototype.getOverride=function(pId){if(!pId)return this.overrides;if(!this.overrides)return null;return this.overrides[pId];};BNPolicy.prototype.allowTag=function(tag){if(this.disableAll)return false;var pTag=this.get(tag.type);if(!pTag)return true;if(typeof(pTag.ok)=="undefined")return true;if(!pTag.ok){if(typeof(pTag.load)=="undefined")return false;else return pTag.load;}
return pTag.ok;};BNPolicy.prototype.showTag=function(tag){if(this.disableAll)return false;var pTag=this.get(tag.type);if(!pTag)return true;if(typeof(pTag.ok)=="undefined")return true;return pTag.ok;};BNPolicy.prototype.isNew=function(){return this.isNewPolicy;};BNPolicy.prototype.getGuideElementIds=function(){return this.elementIds;};BNPolicy.prototype.load=function(server,custName,custCode,userId,policyFormat){this.userId=userId;var needUserPolicy=true;bnResourceManager.loadResource(bnConstants.POLICY_RESOURCE_ID,this.getPolicyResourceAddress(server,custName,custCode,userId,needUserPolicy,policyFormat));};BNPolicy.prototype.useExternalId=function(externalId,remove){var needUserPolicy=true;var s=baynote_tag.server;var cn=baynote_tag.customerId;var cc=baynote_tag.code;var u=bnUser.getUserId();var extId=remove?null:externalId;bnResourceManager.removeResource(bnConstants.POLICY_RESOURCE_ID);bnResourceManager.loadResource(bnConstants.POLICY_RESOURCE_ID,this.getPolicyAddressForExtUserId(s,cn,cc,u,needUserPolicy,extId));};BNPolicy.prototype.initJsonPolicy=function(jsonPolicy){var policiesObj=bnCommon.parseJSON(jsonPolicy);if(policiesObj){var basePolicy=policiesObj.basePolicyJSON;var userPolicy=policiesObj.userPolicyJSON;this.registerPolicyObjects(basePolicy,userPolicy);}else{this.registerPolicyObjects(new Object(),null);}}
BNPolicy.prototype.registerPolicy=function(basePolicyJsonStr,userPolicyJsonStr){var basePolicy=bnCommon.parseJSON(basePolicyJsonStr);var userPolicy=bnCommon.parseJSON(userPolicyJsonStr);this.registerPolicyObjects(basePolicy,userPolicy);}
BNPolicy.prototype.registerPolicyObjects=function(basePolicy,userPolicy){this.data=(basePolicy)?basePolicy:new Object();if(userPolicy){for(var category in userPolicy){if(typeof(userPolicy[category])=="function")continue;for(var paramName in userPolicy[category]){if(typeof(userPolicy[category][paramName])=="function")continue;this.setPolicyData(this.data,category,paramName,userPolicy[category][paramName]);}}}
this.overrides=this.computeOverrides();this.applyOverrides(this.overrides);this.userCookieAge=this.get(bnConstants.OBSERVER_TAG,"uca");this.applyDirectives();this.customScriptPresent=this.get(baynote_globals.CustomScript,"hn")!=null;this.elementIds=this.get(baynote_globals.GuideSet,"eids");bnResourceManager.registerResource(bnConstants.POLICY_RESOURCE_ID);}
BNPolicy.prototype.getPolicyResourceAddress=function(server,custName,custCode,userId,needUserPolicy,policyFormat){var subDomain=(typeof(baynote_globals)!="undefined"&&baynote_globals.cookieSubDomain)?baynote_globals.cookieSubDomain:"";var dataFormat=(policyFormat)?policyFormat:"script";return(server+baynote_globals.TagsURLPrefix+"policy?customerId="+custName+"&code="+custCode
+"&subdomain="+subDomain+"&userId="+userId+"&userPolicyRequested="+needUserPolicy
+"&dataFormat="+dataFormat);};BNPolicy.prototype.getPolicyAddressForExtUserId=function(server,custName,custCode,userId,needUserPolicy,extUId){var subDomain="";if(typeof(baynote_globals)!="undefined"&&baynote_globals.cookieSubDomain)
subDomain=baynote_globals.cookieSubDomain;if(extUId){return(server+baynote_globals.TagsURLPrefix+"policy?customerId="
+custName+"&code="+custCode+"&subdomain="+subDomain
+"&userId="+userId
+"&extUserId="+extUId
+"&ts="+(new Date().getTime())
+"&userPolicyRequested="+needUserPolicy);}
return(server+baynote_globals.TagsURLPrefix+"policy?customerId="
+custName+"&code="+custCode+"&subdomain="+subDomain
+"&userId="+bnConstants.UNASSIGNED_USER_ID
+"&ts="+(new Date().getTime())
+"&userPolicyRequested="+needUserPolicy);};BNPolicy.prototype.importData=function(jsonStr){var data=bnCommon.parseJSON(jsonStr);if(!data)data=new Object();return data;};BNPolicy.prototype.applyOverrides=function(overrideData){if(!overrideData)return;for(var cat in overrideData){if(typeof(overrideData[cat])=="function")continue;for(var key in overrideData[cat]){if(typeof(overrideData[cat][key])=="function")continue;this.setPolicyData(this.data,cat,key,overrideData[cat][key]);}}
var testServer=bnSystem.getTestServer();if(testServer){this.setPolicyData(overrideData,"inf","server",testServer);}};BNPolicy.prototype.computeTagOverrides=function(){var tagOverrides=new Object();var bn_ov=typeof(baynote_globals)!="undefined"?baynote_globals.bn_ov:null;if(bn_ov){var categories=bn_ov.split(";");for(var i=0;i<categories.length;i++){var c=categories[i].split(":");var cName=c[0];var cValue=c[1];tagOverrides[cName]=new Object();var params=cValue.split(",");for(var j=0;j<params.length;j++){var p=params[j].split("~");var pStripped=bnCommon.stripExtraQuotes(p[1]);this.setPolicyData(tagOverrides,cName,p[0],pStripped);}}}
return tagOverrides;};BNPolicy.prototype.computeOverrides=function(){var overrides=new Object();var tagOverrides=this.computeTagOverrides();bn_ov=bnPageInfo.getBNParam("bn_ov");if(bn_ov){var categories=bn_ov.split(";");var haveValidOv=false;for(var i=0;i<categories.length;i++){var c=categories[i].split(":");var cName=c[0];var cValue=c[1];if(baynote_globals.CustomScript==cName)continue;haveValidOv=true;if(!overrides[cName])overrides[cName]=new Object();var params=cValue.split(",");for(var j=0;j<params.length;j++){var p=params[j].split("~");var pStripped=bnCommon.stripExtraQuotes(decodeURIComponent(p[1]));this.setPolicyData(overrides,cName,p[0],pStripped);}}
if(haveValidOv){this.writeOverrideCookie(bnCommon.valueToJSON(overrides));}}else if(bn_ov==""){this.writeOverrideCookie("{}");}else{var cookieValue=this.readOverrideCookie();if(cookieValue)overrides=this.importData(cookieValue);else overrides=new Object();}
if(overrides){for(var cat in overrides){if(typeof(overrides[cat])=="function")continue;for(var key in overrides[cat]){if(typeof(overrides[cat][key])=="function")continue;this.setPolicyData(tagOverrides,cat,key,overrides[cat][key]);}}}
if(this.isSUCookieSet()){this.setSpecialUser();}else if(this.matchSUUrl()){this.setSpecialUser();this.setSUCookie();}
return tagOverrides;};BNPolicy.prototype.matchSUUrl=function(){oTag=this.get(bnConstants.OBSERVER_TAG);if(!oTag||(typeof(oTag.sup)=="undefined"))return false;if(bnPageInfo.getURLParam(oTag.sup))return true;return false;};BNPolicy.prototype.setSpecialUser=function(){this.setPolicyData(this.data,bnConstants.OBSERVER_TAG,"specialUser",true);};BNPolicy.prototype.isSpecialUser=function(){var oTag=this.get(bnConstants.OBSERVER_TAG);if(!oTag||(typeof(oTag.specialUser)=="undefined"))return false;return oTag.specialUser;};BNPolicy.prototype.setSUCookie=function(){var myDate=new Date();oTag=this.get(bnConstants.OBSERVER_TAG);if(!oTag||(typeof(oTag.sue)=="undefined"))expires=48
else expires=oTag.sue;myDate.setTime(myDate.getTime()+expires*1000*60*60);bnCommon.setCookie("bn_su","true","/",myDate.toGMTString());};BNPolicy.prototype.isSUCookieSet=function(){if(bnCommon.getCookieValue("bn_su")=="true")return true;return false;};BNPolicy.prototype.removePolicyData=function(policyData,cat,key){if(policyData&&policyData[cat])delete policyData[cat][key];};BNPolicy.prototype.setPolicyData=function(policyData,cat,key,value){if(!policyData[cat])policyData[cat]=new Object();policyData[cat][key]=value;};BNPolicy.prototype.readOverrideCookie=function(){return bnCommon.getCookieValue("bn_ov");};BNPolicy.prototype.writeOverrideCookie=function(jsonStr){if(!jsonStr||jsonStr=="{}")bnCommon.removeCookie("bn_ov");else bnCommon.setCookie("bn_ov",jsonStr,"/","NEVER");};BNPolicy.prototype.getCustomScriptAddress=function(tag){var basename=this.get(baynote_globals.CustomScript,"hn");if(basename!=null){if(basename.substring(0,4)=='http'){return basename;}else{return tag.server+'/'+baynote_globals.ScriptWebapp
+'/'+tag.customerId+'-'+tag.code+'/'+basename;}}
return null;};BNPolicy.prototype.applyDirectives=function(){var directives=this.get("dir");if(!directives)return;if(directives.au)bnUser.setUserId(this.get("inf","u"));if(directives.au){if(this.get("inf","extUid")){bnUser.setExtUserId(this.get("inf","extUid"));}else{bnUser.resetExtUserId();}}};bnPolicy=new BNPolicy();BNTagManager=function(){this.tags=new Array();this.tagHandlers=new Object();};BNTagManager.prototype.getHandlerForTag=function(tId){var tag=this.getTag(tId);return this.tagHandlers[tag.type];};BNTagManager.prototype.getHandlerByType=function(type){return this.tagHandlers[type];};BNTagManager.prototype.registerTagHandler=function(tType,handlerObj){this.tagHandlers[tType]=handlerObj;bnResourceManager.registerResource(this.getHandlerResourceId(tType));};BNTagManager.prototype.loadHandler=function(tId){var tag=this.getTag(tId);bnResourceManager.loadResource(this.getHandlerResourceId(tag.type),this.getHandlerResourceAddress(tag));};BNTagManager.prototype.getHandlerResourceId=function(tType){return(tType+"_handler");};BNTagManager.prototype.getHandlerResourceAddress=function(tag){var handlerName=tag.getParam("handler",bnPolicy.get(tag.type,"hn"));return this.getHdlrResAddress(tag.type,tag.server,handlerName);};BNTagManager.prototype.getHdlrResAddress=function(type,server,handlerName){if(!handlerName){handlerName=bnPolicy.get(type,"hn");}
if(!handlerName)handlerName="handler.js";var handlerPath=bnPolicy.get("handler",type);if(handlerPath)return handlerPath;return(server+baynote_globals.TagsURLPrefix+type+"/"+handlerName);};BNTagManager.prototype.getTag=function(tId){return window["bn_tags"][tId];};BNTagManager.prototype.getTags=function(type){var tags=window["bn_tags"];var matchingTags=new Array();for(var i=0;i<tags.length;i++){if(tags[i].type==type)matchingTags.push(tags[i]);}
return matchingTags;};BNTagManager.prototype.show=function(tId){with(this){var tag=getTag(tId);if(!tag)return;if(tag.cookie_domain&&typeof(baynote_globals)!="undefined"&&baynote_globals&&!baynote_globals.cookieDomain)
baynote_globals.cookieDomain=tag.cookie_domain;var showProxyFn=function(){bnTagManager.show(tId);};if(!bnPolicy.get()){if(typeof preLoadObj!=='undefined'&&preLoadObj&&preLoadObj.policyFormat=='POLICY_JSONP'){bnResourceManager.waitForResource(bnConstants.POLICY_RESOURCE_ID,showProxyFn);bnPolicy.load(tag.server,tag.customerId,tag.code,bnUser.getUserId(tag),'POLICY_JSONP');}else{bnResourceManager.waitForResource(bnConstants.POLICY_RESOURCE_ID,showProxyFn);bnPolicy.load(tag.server,tag.customerId,tag.code,bnUser.getUserId(tag));}
return;}
if(!bnPolicy.allowTag(tag)){tag.injectNoload("tag was rejected by policy");return;}
if(bnPolicy.customScriptPresent&&!bnResourceManager.getResource(baynote_globals.ScriptResourceId)){bnResourceManager.waitForResource(baynote_globals.ScriptResourceId,showProxyFn);bnResourceManager.loadResource(baynote_globals.ScriptResourceId,bnPolicy.getCustomScriptAddress(tag));return;}
if(typeof(baynote_onBeforeTagShow)=="function"){if(!baynote_onBeforeTagShow(tag))return;}
for(var i=0;i<baynote_globals.onBeforeTagShow.length;i++){if(typeof(baynote_globals.onBeforeTagShow[i])=="function"){if(!baynote_globals.onBeforeTagShow[i](tag))return;}}
tag.getTotalPurchases();var tHandler=getHandlerForTag(tId);if(tHandler){tHandler.show(tag);}else{bnResourceManager.waitForResource(getHandlerResourceId(tag.type),showProxyFn);loadHandler(tId);}}};BNTagManager.prototype.invokeCallBack=function(resId,tag){bnResourceManager.waitForResource(resId,function(){if(typeof(baynote_onTagShow)=="function"){baynote_onTagShow(tag);}
for(var i=0;i<baynote_globals.onTagShow.length;i++){if(typeof(baynote_globals.onTagShow[i])=="function"){baynote_globals.onTagShow[i](tag);}}});};if(typeof(bnTagManager)=="undefined"){bnTagManager=new BNTagManager();};BNEvent=function(){};BNEvent.prototype.addHandler=function(target,type,handler){if(target.addEventListener)target.addEventListener(type,handler,false);else if(target.attachEvent)target.attachEvent("on"+type,handler);else target["on"+type]=handler;};BNEvent.prototype.removeHandler=function(target,type,handler){if(target.removeEventListener)target.removeEventListener(type,handler,false);else if(target.detachEvent)target.detachEvent("on"+type,handler);else target["on"+type]=null;};BNEvent.prototype.getEvent=function(){if(!window.event)return bnEvent.getEvent.caller.arguments[0];var event=window.event;if(!bnIsIE)return event;event.charCode=(event.type=="keypress")?event.keyCode:0;event.eventPhase=2;event.isChar=(event.charCode>0);event.pageX=event.clientX+document.body.scrollLeft;event.pageY=event.clientY+document.body.scrollTop;event.target=event.srcElement;event.time=(new Date).getTime();if(event.type=="mouseout")event.relatedTarget=event.toElement;else if(event.type=="mouseover")event.relatedTarget=event.fromElement;event.preventDefault=function(){this.returnValue=false;}
event.stopPropagation=function(){this.cancelBubble=true;}
return event;};bnEvent=new BNEvent();BNTrail=function(){this.data=new Array();this.initialized=false;};BNTrail.prototype.initialize=function(maxLength){this.maxLength=maxLength;this.load();this.initialized=true;};BNTrail.prototype.getUrls=function(maxLength){if(!this.initialized)this.initialize(maxLength);return this.data;};BNTrail.prototype.addUrl=function(url,maxLength,sessionOnly){if(!this.initialized)this.initialize(maxLength);var index=this.getIndex(url);if(index!=-1&&this.data.length>0){if(index==(this.data.length-1))return;if(index!=-1)this.data.splice(index,1);}
if(typeof baynote_globals.canAddTrailUrl==='function'){if(!baynote_globals.canAddTrailUrl(url)){return;}}
this.data.push(url);this.crop();this.save(sessionOnly);};BNTrail.prototype.crop=function(){if(this.data.length>this.maxLength){var numSplice=this.data.length-this.maxLength;this.data.splice(0,numSplice);}};BNTrail.prototype.getIndex=function(url){for(i=0;i<this.data.length;i++){if(this.data[i]==url)return i;}
return-1;};BNTrail.prototype.save=function(sessionOnly){if(this.data.length<=0)return;var cookieExpires=sessionOnly?"SESSION":"NEVER";var cookieValue=bnCommon.arrayToJSON(this.data);bnSystem.setCookie("bnTrail",cookieValue,"/",cookieExpires,"","");};BNTrail.prototype.load=function(){var cookieValue=bnSystem.getCookieValue("bnTrail","");if(cookieValue==null||cookieValue=="")return;this.data=bnCommon.parseJSON(cookieValue);this.crop();};bnTrail=new BNTrail();if(bnResourceManager.removeResource===undefined){BNResourceManager.prototype.removeResource=bnResourceManager.removeResource=function(rId){this.resources[rId]=null;delete(this.resources[rId]);}};BaynoteAPI.getWindowName=function(){return bnPageInfo.getWindowName();};BaynoteAPI.getWordCount=function(){return bnPageInfo.getWordCount();};BaynoteAPI.getLinkCount=function(){return bnPageInfo.getLinkCount();};BaynoteAPI.getTitle=function(){return bnPageInfo.getTitle();};BaynoteAPI.is404=function(){return bnPageInfo.is404();};BaynoteAPI.cookiesAreEnabled=function(){return bnPageInfo.cookiesAreEnabled();};BaynoteAPI.getURL=function(){return bnPageInfo.getURL();};BaynoteAPI.getFullURL=function(){return bnPageInfo.getFullURL();};BaynoteAPI.getURLParams=function(){return bnPageInfo.getURLParams();};BaynoteAPI.getURLParam=function(paramName){return bnPageInfo.getURLParam(paramName);};BaynoteAPI.getBNParams=function(){return bnPageInfo.getBNParams();};BaynoteAPI.getBNParam=function(paramName){return bnPageInfo.getBNParam(paramName);};BaynoteAPI.getReferrerURL=function(){return bnPageInfo.getReferrerURL();};BaynoteAPI.isBinary=function(url){return bnPageInfo.isBinary(url);};BaynoteAPI.getWindowHeight=function(){return bnPageInfo.windowHeight;};BaynoteAPI.getWindowWidth=function(){return bnPageInfo.windowWidth;};BaynoteAPI.stringToBoolean=function(str){return bnCommon.stringToBoolean(str);};BaynoteAPI.copyObj=function(obj,props){return bnCommon.copyObj(obj,props);};BaynoteAPI.copyProperties=function(src,dst,props){return bnCommon.copyProperties(src,dst,props);};BaynoteAPI.dumpObj=function(obj,name,indent,depth,asHTML){return bnCommon.dumpObj(obj,name,indent,depth,asHTML);};BaynoteAPI.dump=function(obj){return bnCommon.dump(obj);};BaynoteAPI.dumpHTML=function(obj){return bnCommon.dumpHTML(obj);};BaynoteAPI.getURLParams=function(url){return bnCommon.getURLParams(url);};BaynoteAPI.addURLParam=function(url,paramName,value){return bnCommon.addURLParam(url,paramName,value);};BaynoteAPI.addURLMetaKeys=function(url,metaKeyList){return bnCommon.addURLMetaKeys(url,metaKeyList);};BaynoteAPI.getCookieValue=function(cookieName){return bnCommon.getCookieValue(cookieName);};BaynoteAPI.setCookie=function(cookieName,cookieValue,cookiePath,cookieExpires,cookieDomain,cookieSubDomain){return bnSystem.setCookie(cookieName,cookieValue,cookiePath,cookieExpires,cookieDomain,cookieSubDomain);};BaynoteAPI.removeCookie=function(cookieName){return bnCommon.removeCookie(cookieName);};BaynoteAPI.normalizeUrl=function(tag,url){return bnCommon.normalizeUrl(tag,url);};BaynoteAPI.arrayToJSON=function(arr){return bnCommon.arrayToJSON(arr);};BaynoteAPI.booleanToJSON=function(bool){return bnCommon.booleanToJSON(bool);};BaynoteAPI.numberToJSON=function(num){return bnCommon.numberToJSON(num);};BaynoteAPI.objectToJSON=function(obj){return bnCommon.objectToJSON(obj);};BaynoteAPI.stringToJSON=function(str){return bnCommon.stringToJSON(str);};BaynoteAPI.valueToJSON=function(val){return bnCommon.valueToJSON(val);};BaynoteAPI.parseJSON=function(str){return bnCommon.parseJSON(str);};BaynoteAPI.trim=function(str){return bnCommon.trim(str);};BaynoteAPI.getInnerText=function(obj){return bnCommon.getInnerText(obj);};BaynoteAPI.hasAnyProperty=function(obj){return bnCommon.hasAnyProperty(obj);};BaynoteAPI.getURL=function(fullUrl,urlParams,bnParams){return bnCommon.getURL(fullUrl,urlParams,bnParams);};BaynoteAPI.isGuideContainerPresent=function(){return bnCommon.isGuideContainerPresent();};BaynoteAPI.isNotEmpty=function(name){return bnCommon.isNotEmpty(name);};BaynoteAPI.lookupMeta=function(name){return bnCommon.lookupMeta(name);};BaynoteAPI.lookupMetaAttrib=function(name,attrib){return bnCommon.lookupMetaAttrib(name,attrib);};BaynoteAPI.isCustomScriptPresent=function(){return bnPolicy.customScriptPresent;};BaynoteAPI.policyOverrides=function(){return bnPolicy.overrides;};BaynoteAPI.userId=function(){return bnPolicy.userId;};BaynoteAPI.getPolicy=function(cat,key){return bnPolicy.get(cat,key);};BaynoteAPI.getCondition=function(tag){return bnPolicy.getCondition(tag);};BaynoteAPI.isSpecialUser=function(){return bnPolicy.isSpecialUser();};BaynoteAPI.getGuideElementIds=function(){return bnPolicy.getGuideElementIds();};BaynoteAPI.getAjaxTag=function(){return bnAjaxHandler;};BaynoteAPI.getTotalPurchases=function(){return baynote_tag.getTotalPurchases();};BaynoteAPI.sendVisitEvent=function(param){if(typeof param!='undefined'){param.action="visit";BaynoteAPI.call("observer","actionOccurred",[param],"bnObserver");}};BaynoteAPI.sendExitEvent=function(param){if(typeof param!='undefined'){param.action="exit";BaynoteAPI.call("observer","actionOccurred",[param],"bnObserver");}};BaynoteAPI.sendPageEvent=function(param){if(typeof param!='undefined'){param.action="page";if(bnObserver&&bnObserver.name=="defaultHandler"){bnObserver.pageAction(param);}else{BaynoteAPI.call("observer","actionOccurred",[param],"bnObserver");}}};BaynoteAPI.setUserId=function(userId,skipWrite){bnUser.setUserId(userId,skipWrite);};BaynoteAPI.writeUserCookieToWindowName=function(userId){bnUser.writeUserCookieToWindowName(userId);};BaynoteAPI.readUserCookieFromWindowName=function(){return bnUser.readUserCookieFromWindowName();};BaynoteAPI.canItFit=function(msg){return bnMessenger.canItFit(msg);};BaynoteAPI.sendRecImpression=function(flag){if(!bnObserver)return;bnObserver.sendRecImpression=flag;};BaynoteAPI.cancelLinger=function(){if(!bnObserver)return;bnObserver.cancelLinger();};BaynoteAPI.clearObserverAttributes=function(attrsList){if(!bnObserver)return;bnObserver.clearObserverAttributes(attrsList);};BaynoteAPI.implicitQueryOccured=function(query,profileUrl,isSpecial){if(!bnObserver)return;bnObserver.isSpecial=isSpecial;bnObserver.queryExitOccurred(query,profileUrl);if(isSpecial)
bnObserver.isSpecial=false;};BaynoteAPI.isArray=function(obj){return bnCommon.isArray(obj);};BaynoteAPI.checkType=function(obj,type){return bnCommon.checkType(obj,type);};BaynoteAPI.useExternalId=function(externalId){var remove=false;bnPolicy.useExternalId(externalId,remove);};BaynoteAPI.detachExternalId=function(externalId){var remove=true;bnPolicy.useExternalId(externalId,remove);};BaynoteAPI.getTrailURLs=function(){if(bnTrail)return bnTrail.data;return null;};BaynoteAPI.persistTrailURLs=function(){if(bnTrail){bnTrail.save(bnPolicy.get("trail","so"));return true;}
return false;};bnResourceManager.registerResource(baynote_tag.getCommonResourceId());
		
			
			

function BNMessenger(){this.server=null;this.messageNum=0;this.msgLimit=2000;this.eventDetailsLimit=1500;this.initialized=false;this.debug=false;}
BNMessenger.prototype.initialize=function(serverAddr,handlerAddr,customer,code,key,debug){this.server=serverAddr;this.customer=customer;this.code=code;this.key=key;this.handler=handlerAddr;if(this.handler.charAt(0)!="/")this.handler="/"+this.handler;this.debug=debug;this.initialized=true;}
BNMessenger.prototype.sendMessage=function(msg){var debugArg=(this.debug)?"&debug=true":"";var msgPrefix=this.server+"/baynote"+this.handler+"?customerId="+this.customer+"&code="+this.code;if(this.key)msgPrefix+="&key="+this.key;msgPrefix+="&msgId="+this.messageNum+debugArg+"&fmt=1&len="+msg.length+"&msg=";var fullMsg=msgPrefix+encodeURIComponent(msg);var spaceLeft=this.msgLimit-fullMsg.length;if(spaceLeft>=0){this.resultResourceId="Message"+this.messageNum;bnResourceManager.loadResource(this.resultResourceId,fullMsg,"img");this.messageNum++;bnTagManager.invokeCallBack(this.resultResourceId,this.myTag);}
return spaceLeft;}
BNMessenger.prototype.canItFit=function(msg){var msgStr=bnCommon.valueToJSON(msg);var msgStrTobeSent=encodeURIComponent(msgStr);return this.eventDetailsLimit-msgStrTobeSent.length>=0;}
var bnMessenger=new BNMessenger();function BNBehavior()
{this.numSamples=0;this.numMouseMoves=0;this.numScrolls=0;this.lastMousePos=new Object();this.lastMousePos.x=this.lastMousePos.y=0;this.curMousePos=new Object();this.curMousePos.x=this.curMousePos.y=0;this.lastScroll=new Object();this.lastScroll.x=this.lastScroll.y=0;this.curScroll=new Object();this.curScroll.x=this.curScroll.y=0;this.maxScrollPercent=0;}
BNBehavior.prototype.activityCheck=function()
{this.numSamples++;if(this.lastMousePos.x&&this.lastMousePos.x!=this.curMousePos.x)this.numMouseMoves++;else if(this.lastMousePos.y&&this.lastMousePos.y!=this.curMousePos.y)this.numMouseMoves++;this.lastMousePos.x=this.curMousePos.x;this.lastMousePos.y=this.curMousePos.y;if(bnIsIE)this.curScroll.y=document.body.scrollTop;else this.curScroll.y=window.pageYOffset;if(this.lastScroll.y&&this.lastScroll.y!=this.curScroll.y)this.numScrolls++;this.lastScroll.y=this.curScroll.y;var curScrollPercent=this.getScrollScope();if(curScrollPercent>this.maxScrollPercent)
this.maxScrollPercent=curScrollPercent;setTimeout("bnBehavior.activityCheck()",500);}
BNBehavior.prototype.getScrollTop=function()
{if(document.documentElement&&document.documentElement.scrollTop)
return document.documentElement.scrollTop;if(document.body)return document.body.scrollTop;return window.pageYOffset;}
BNBehavior.prototype.getScrollHeight=function()
{if(document.documentElement&&document.documentElement.scrollHeight)
return Math.max(document.documentElement.offsetHeight,document.documentElement.scrollHeight,document.body.scrollHeight);return document.body.scrollHeight;}
BNBehavior.prototype.getClientHeight=function()
{if(typeof(window.innerWidth)=='number')
return window.innerHeight;else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight))
return document.documentElement.clientHeight;else if(document.body&&(document.body.clientWidth||document.body.clientHeight))
return document.body.clientHeight;}
BNBehavior.prototype.getScrollScope=function()
{return Math.round((this.getScrollTop()+this.getClientHeight())*100/this.getScrollHeight());}
BNBehavior.prototype.mouseHandler=function(e)
{this.curMousePos.x=e.pageX;this.curMousePos.y=e.pageY;}
var bnBehavior=new BNBehavior();function BNObserver(){this.lingerCancelled=false;this.sendRecImpression=false;this.myType="baynoteObserver";this.myTag=null;this.startTime=new Date().getTime();this.networkInfo=null;this.pageEvent=true;this.sendVisitEvent=true;this.sendExitEvent=true;this.name="defaultHandler";}
BNObserver.prototype.createSearchBox=function(){var actionUrl=this.myTag.server+"/search/query2";var searchButtonHTML;var searchButtonImg=this.myTag.getParam("searchButtonImg",null);if(searchButtonImg){searchButtonHTML='<input type="image" alt="Search" id="bn_search_button" src="'+searchButtonImg+'">';searchImgParam='<input type="hidden" name="sbi" value='+searchButtonImg+'>';}
else{searchButtonHTML='<input type="submit" value="Search" id="bn_search_button" class="bn_sb_button">';searchImgParam='';}
var key=this.myTag.key?this.myTag.key:"";var searchboxHtml='<table width="100%" class="bn_sb_table"><tr>'
+'<td width="33%"></td>'
+'<td width="34%" align="center" class="bn_sb_cell">'
+'<form action="'+actionUrl+'" style="margin: 0" id="bn_search_form" class="bn_sb_form">'
+'<input type="hidden" name="cn" value="'+this.myTag.customerId+'">'
+'<input type="hidden" name="cc" value="'+this.myTag.code+'">'
+'<input type="hidden" name="key" value="'+key+'">'
+'<input type="hidden" name="u" value="'+bnUser.getUserId(this.myTag)+'">'
+'<input type="hidden" name="e" value="1">'
+searchImgParam+'<input type="text"   name="q" size="15" maxlength="255" id="bn_search_query" class="bn_sb_query">'
+searchButtonHTML+'</form>'
+'</td>'
+'<td width="33%"></td>'
+'</tr></table>';var searchboxDiv=document.createElement("div");searchboxDiv.innerHTML=searchboxHtml;return searchboxDiv;}
BNObserver.prototype.shouldSendEvent=function(){if(this.soEnabled)return true;if(this.stEnabled&&this.isSpecial)return true;if(this.isSpecialUser)return true;return false;}
BNObserver.prototype.sendEvent=function(evJSON,force){if(!this.shouldSendEvent()&&(typeof(force)=="undefined"||!force))return;if(!bnMessenger.initialized){setTimeout("bnObserver.sendEvent('"+evJSON+"')",100);return;}
var result=bnMessenger.sendMessage(evJSON);while(result<0){var newEv=bnCommon.parseJSON(evJSON);if(newEv.de){delete newEv.de;evJSON=bnCommon.valueToJSON(newEv);result=bnMessenger.sendMessage(evJSON);}else if(newEv.at&&newEv.at.rt){delete newEv.at.rt;evJSON=bnCommon.valueToJSON(newEv);result=bnMessenger.sendMessage(evJSON);}else{if(typeof baynote_globals.messageDropped=='function'){baynote_globals.messageDropped({result:result,msg:evJSON});}
result=0;}}}
BNObserver.prototype.makeEvent=function(action){var ev=new Object();ev.a=action;if(typeof(bnPolicy.getCondition)!="undefined"){ev.c=bnPolicy.getCondition(this.myTag);}
else{ev.c=bnPolicy.get("inf","cd");}
ev.d=this.url;if(this.myTag.iFrame){ev.r=parent.document.referrer;ev.p=parent.location.href.split("#")[0];ev.p=bnCommon.getURL(ev.p);}else{ev.r=document.referrer;}
if(this.myTag.referrer){ev.r=this.myTag.referrer;}
ev.t=new Date().getTime();ev.u=bnUser.getUserId(this.myTag);if(bnCommon.hasAnyProperty(this.myTag.attrs))ev.at=this.myTag.attrs;this.checkForSpecialTarget(ev);if(!this.soEnabled&&this.stEnabled&&this.isSpecial){if(!ev.at)ev.at=new Object();ev.at.st="true";}
if(this.isSpecialUser){if(!ev.at)ev.at=new Object();ev.at.su="true";}
if(typeof(this.networkInfo)!="undefined"&&this.networkInfo){if(!this.networkInfo.userIds.isEmpty()){ev.at.networkUserIds=this.networkInfo.userIds.toString();if(!this.networkInfo.groupIds.isEmpty())ev.at.networkGroupIds=this.networkInfo.groupIds.toString();}}
if(action=='c'||action=='C'){if(baynote_globals.RecImpressionList&&baynote_globals.RecImpressionList.length>0&&this.sendRecImpression){ev.at=ev.at||{};ev.at.rt=baynote_globals.RecImpressionList;}}
var extUid=bnUser.getExtUserId();if(extUid){if(!ev.at)ev.at=new Object();ev.at.extUid=extUid;}
if(typeof baynote_globals.verifyEvent==='function'){baynote_globals.verifyEvent(ev);}
return ev;}
BNObserver.prototype.makeDetails=function(){var de=new Object();if(bnPolicy.get("baynoteObserver","cds")){var summary=this.myTag.getParam("summary",null);if(summary&&summary.length>0)de.su=summary;}
if(bnPolicy.get("baynoteObserver","cdt")){var title=this.myTag.getParam("title",bnPageInfo.getTitle());if(title&&title.length>0)de.ti=title;}
de.nw=bnPageInfo.getWordCount();de.nl=bnPageInfo.getLinkCount();return de;}
BNObserver.prototype.makeBehavior=function(){var bi=new Object();if(typeof(bnBehavior)=="object"){bi.ps=bnBehavior.maxScrollPercent;bi.ma=bnBehavior.numMouseMoves;bi.sa=bnBehavior.numScrolls;}
else{return null;}
return bi;}
BNObserver.prototype.networkLogin=function(networkInfo){this.networkInfo=networkInfo;}
BNObserver.prototype.networkLogout=function(networkInfo){this.networkInfo=networkInfo;}
BNObserver.prototype.cancelLinger=function(){this.lingerCancelled=true;}
BNObserver.prototype.clickOccurred=function(clicked){var exitInfo=new Object();var result=false;if(typeof(this.myTag.exitConfirmation)=="function"){result=this.myTag.exitConfirmation(clicked,exitInfo);}else{result=this.defaultExitConfirmation(clicked,exitInfo);}
if(result)this.exitOccurred(exitInfo);}
BNObserver.prototype.defaultExitConfirmation=function(clicked,exitInfo){var target=clicked;while(target){if(target.tagName=="A")break;target=target.parentNode;}
if(!target)return false;exitInfo.dest=target.href;var gt=target.getAttribute("baynote_guide");if(typeof(gt)!="undefined"&&gt)exitInfo.baynote_guide=gt;var gr=target.getAttribute("baynote_req");if(typeof(gr)!="undefined"&&gr)exitInfo.baynote_req=gr;var bn=target.getAttribute("baynote_bnrank");if(typeof(bn)!="undefined"&&bn)exitInfo.baynote_bnrank=bn;var ir=target.getAttribute("baynote_irrank");if(typeof(ir)!="undefined"&&ir)exitInfo.baynote_irrank=ir;var lt=bnCommon.getInnerText(target);if(!lt&&bnPolicy.get("baynoteObserver","alt")){if(clicked&&clicked.tagName=="IMG"){lt=clicked.getAttribute("ALT");var src=clicked.getAttribute("SRC");if(lt&&(src.indexOf(lt)==(src.length-lt.length)))lt=null;}}
if(lt)exitInfo.link=lt;var attrs=this.myTag.attrs;if(typeof(attrs)=="object"&&bnCommon.hasAnyProperty(attrs)){exitInfo.attrs=bnCommon.copyObj(attrs);}
return true;}
BNObserver.prototype.exitOccurred=function(exitInfo){if(!this.sendExitEvent){bnLog.log('WARN: Exit Observervation is turned off');return;}
var ev=this.makeEvent("c");var dd=exitInfo.dest;if(typeof(dd)!="undefined"&&dd)ev.dd=dd;else ev.dd="bn_ignore=t";var lt=exitInfo.link;if(typeof(lt)!="undefined"&&lt)ev.l=lt;var ea=exitInfo.attrs;if(typeof(ea)=="object"){ev.at=ea;}
var gt=exitInfo.baynote_guide;if(typeof(gt)!="undefined"&&gt)ev.gt=gt;var gr=exitInfo.baynote_req;if(typeof(gr)!="undefined"&&gr)ev.gr=gr;var bn=exitInfo.baynote_bnrank;if(typeof(bn)!="undefined"&&bn){ev.rb=bn;if(!this.soEnabled&&this.stEnabled){this.isSpecial=true;if(!ev.at)ev.at=new Object();ev.at.st="true";}
if(this.isSpecialUser){if(!ev.at)ev.at=new Object();ev.at.su="true";}}
var ir=exitInfo.baynote_irrank;if(typeof(ir)!="undefined"&&ir)ev.ri=ir;var gat=exitInfo.baynote_guide_target;if(typeof(gat)!="undefined"&&gat)ev.gat=gat;var iq=exitInfo.implicitQuery;if(typeof(iq)!="undefined"&&iq){if(!ev.at)ev.at=new Object();ev.at.implicitQuery=iq;}
if(!this.myTag.iFrame){var details=this.makeDetails();if(details!=null)ev.de=details;}
if(bnPolicy.get("baynoteObserver","ub")){var bi=this.makeBehavior();if(bi!=null)ev.bi=bi;}
if(!this.shouldSendEvent())return;var u=bnCommon.getCookieValue("bn_u");var sEvt=bnCommon.valueToJSON(ev);var fCookie=false;if(bnPolicy.get("baynoteObserver","ec")&&(typeof(u)!="undefined"&&u)&&bnPageInfo.cookiesAreEnabled){var msgStrTobeSet=encodeURIComponent(sEvt);var lenDiff=bnMessenger.eventDetailsLimit-msgStrTobeSet.length;if(lenDiff>=0){bnCommon.setCookie("bn_ec",sEvt,"/","SESSION");fCookie=true;}else{if(typeof baynote_globals.messageDropped=='function'){baynote_globals.messageDropped({result:lenDiff,msg:sEvt});}}}
if(!fCookie||(bnPolicy.get("baynoteObserver","eec"))){this.sendEvent(sEvt);this.exitPause();}}
BNObserver.prototype.lingerOccurred=function(ds){if(!this.shouldFireLinger())return;var ev=this.makeEvent("l");ev.du=ds;if(bnPolicy.get("baynoteObserver","sdl")){var details=this.makeDetails();if(details!=null)ev.de=details;}
this.sendEvent(bnCommon.valueToJSON(ev));if(bnTrail&&bnPolicy.get("trail","ok"))bnTrail.addUrl(this.url,bnPolicy.get("trail","tl"),bnPolicy.get("trail","so"));}
BNObserver.prototype.visitOccurred=function(){if(bnPolicy.get("baynoteObserver","ec")){var sEvt=bnCommon.getCookieValue("bn_ec");if(typeof(sEvt)!="undefined"&&sEvt&&sEvt.length>0){this.sendEvent(sEvt,true);}
bnCommon.removeCookie("bn_ec");}
if(!this.shouldFireVisit())return;var ev=this.makeEvent("v");this.sendEvent(bnCommon.valueToJSON(ev));}
BNObserver.prototype.shouldFireLinger=function(){if(this.lingerCancelled)return false;if(this.myTag.iFrame)return false;return true;}
BNObserver.prototype.shouldFireVisit=function(){if(!this.sendVisitEvent){bnLog.log('WARN: Visit Observervation is turned off');return false;}
if(this.myTag.iFrame)return false;if(bnPolicy.get("baynoteObserver","sv"))return true;if(this.myTag.getParam("fireVisit"))return true;if(!this.myTag.attrs)return false;if(this.myTag.attrs.totalPurchases)return true;if(this.myTag.attrs.query)return true;if(this.myTag.attrs.pageStatus)return true;return false;}
BNObserver.prototype.openMedia=function(mediaURL,linkText){this.cancelLinger();var ev=this.makeEvent("c");ev.dd=mediaURL;if(linkText)ev.l=linkText;this.sendEvent(bnCommon.valueToJSON(ev));}
BNObserver.prototype.closeMedia=function(mediaURL){var ev=this.makeEvent("c");ev.r=ev.d;ev.dd=ev.d;ev.d=mediaURL;this.sendEvent(bnCommon.valueToJSON(ev));}
BNObserver.prototype.queryExitOccurred=function(query,dest){var ev=this.makeEvent("c");ev.dd=dest;var details=this.makeDetails();if(details!=null)ev.de=details;if(!ev.at)ev.at=new Object();ev.at.implicitQuery=query;this.sendEvent(bnCommon.valueToJSON(ev));this.exitPause();}
BNObserver.prototype.exitPause=function(){var delayMS=bnPolicy.get(this.myType,"ep");if(delayMS==null||delayMS<=0)return;var maxIter=bnPolicy.get(this.myType,"epmi");if(maxIter==null)maxIter=1000000;var startTime=new Date().getTime();var nowTime=new Date().getTime();var iterations=0;while(nowTime-startTime<delayMS){nowTime=new Date().getTime();++iterations;if(iterations>maxIter)break;}}
BNObserver.prototype.actionOccurred=function(obj){}
BNObserver.prototype.instrumentLinks=function(){bnEvent.addHandler(document.body,"click",function(){var evt=bnEvent.getEvent();if(evt.target)bnObserver.clickOccurred(evt.target);});bnLog.log("onclick handler installed");}
BNObserver.prototype.instrumentBehavior=function(){if(typeof(bnBehavior)=="object"&&bnBehavior!=null){bnEvent.addHandler(document,"mousemove",function(){var evt=bnEvent.getEvent();bnBehavior.mouseHandler(evt);});setTimeout("bnBehavior.activityCheck()",500);}}
BNObserver.prototype.captureValue=function(cap){var result;if(cap.st=="dp"){if(cap.sn.indexOf(bnConstants.BN_PARAM_PREFIX)==0)result=bnPageInfo.getBNParam(cap.sn);else result=bnPageInfo.getURLParam(cap.sn);}else if(cap.st=="mt"){var metas=document.getElementsByName(cap.sn);if(metas){for(var i=0;i<metas.length;++i){if(metas[i].tagName.toUpperCase()=="META"){result=metas[i].content;break;}}}}else if(cap.st=="tp"){result=this.myTag.getParam(cap.sn);}else if(this.debug){alert("Invalid capture source type "+cap.st);}
return result;}
BNObserver.prototype.storeCapturedValue=function(cap,value){if(cap.dt=="ea"){if(!this.myTag.attrs)this.myTag.attrs=new Object();if(this.myTag.attrs[cap.dn]&&this.myTag.attrs[cap.dn].length>0)return;this.myTag.attrs[cap.dn]=value;}else if(cap.dt=="da"){if(!this.myTag.docAttrs)this.myTag.docAttrs=new Object();if(this.myTag.docAttrs[cap.dn]&&this.myTag.docAttrs[cap.dn].length>0)return
this.myTag.docAttrs[cap.dn]=value;}else if(this.debug){alert("Invalid capture destination type "+cap.dt);}}
BNObserver.prototype.show=function(obsTag){this.lingerCancelled=false;this.myTag=obsTag;this.debug=bnPolicy.get(this.myType,"debug");this.soEnabled=bnPolicy.get(this.myType,"so");this.stEnabled=bnPolicy.get(this.myType,"st");if(this.myTag.searchbox){var ph=document.getElementById(this.myTag.placeHolderId);if(bnPolicy.get("search","ok"))ph.appendChild(this.createSearchBox());else if(this.myTag.noload)ph.innerHTML=this.myTag.noload;}
var obsHandler="/tags3/baynoteObserver/listener2";bnMessenger.initialize(this.myTag.server,obsHandler,this.myTag.customerId,this.myTag.code,this.myTag.key,this.debug);this.url=this.myTag.getParam("url",bnPageInfo.getURL());this.url=bnCommon.addURLMetaKeys(this.url,this.myTag.metaKeys);var oldPS=this.myTag.getParam("page_status");if(!oldPS&&bnPageInfo.is404())oldPS=404;var oldTP=this.myTag.getParam("totalPurchases");var oldQ=this.myTag.getParam("query");if(oldTP||oldQ||oldPS){if(!this.myTag.attrs)this.myTag.attrs=new Object();if(!this.myTag.attrs.totalPurchases&&oldTP)this.myTag.attrs.totalPurchases=oldTP;if(!this.myTag.attrs.query&&oldQ)this.myTag.attrs.query=oldQ;if(!this.myTag.attrs.pageStatus&&oldPS)this.myTag.attrs.pageStatus=oldPS;}
var caps=bnPolicy.get(this.myType,"cap");if(caps!=null&&caps instanceof Array){for(var i=0;i<caps.length;++i){var cap=caps[i];var value=this.captureValue(cap);if(!value||value.length<1)continue;this.storeCapturedValue(cap,value);}}
if(bnCommon.hasAnyProperty(this.myTag.docAttrs)){if(!this.myTag.attrs)this.myTag.attrs=new Object();this.myTag.attrs.docAttrs=bnCommon.objectToJSON(this.myTag.docAttrs);}
this.isSpecial=false;if(typeof(this.myTag.specialTarget)!="undefined"&&this.myTag.specialTarget)this.isSpecial=true;if(this.myTag.attrs&&this.myTag.attrs.totalPurchases)this.isSpecial=true;this.isSpecialUser=false;if(typeof(bnPolicy.isSpecialUser)=="function")
this.isSpecialUser=bnPolicy.isSpecialUser();if(this.isSpecialUser)this.isSpecial=true;this.visitOccurred();var dwellTime=bnPolicy.get(this.myType,"dt");var dlThreshold=bnPolicy.get(this.myType,"ddt");if(this.myTag.attrs&&this.myTag.attrs.expectedDuration&&typeof(dlThreshold)!='undefined'&&dlThreshold>0){dwellTime=this.myTag.attrs.expectedDuration*dlThreshold;}
var dwellMSec=dwellTime*1000;setTimeout("bnObserver.lingerOccurred("+dwellTime+")",dwellMSec);this.instrumentLinks();if(bnPolicy.get("baynoteObserver","ub")){this.instrumentBehavior();}
if(bnPolicy.get("baynoteObserver","bpe"))this.pageEvent=false;bnResourceManager.registerAndAddResource(this.myType,bnObserver);return true;}
BNObserver.prototype.pageAction=function(param){if(typeof param=='undefined')return;if(this.debug)bnLog.log("pageAction invoked with param:\n"+bnCommon.dump(param));var attrs=param.attrs;if(typeof(attrs)=="undefined"||!attrs){if(this.debug)bnLog.log("No attribute 'attrs' was specified");return;}
var evType=attrs.evType;if(typeof(evType)=="undefined"||!evType){if(this.debug)bnLog.log("No event type 'evType' was specified in 'attrs'");return;}
var evTarget=attrs.evTarget;if(typeof(evTarget)=="undefined"||!evTarget){if(this.debug)bnLog.log("No event target 'evTarget' was specified in 'attrs'");return;}
var doc=param.d;if(typeof(doc)=="undefined"||!doc){if(this.debug)bnLog.log("No document was specified");return;}
var ev=this.makeEvent("p");this.checkIsSpecial(param);this.setEventAttrs(ev,param);ev.d=doc;this.firePageEvent(ev);}
BNObserver.prototype.firePageEvent=function(ev){if(!this.pageEvent)return;this.sendEvent(bnCommon.valueToJSON(ev));}
BNObserver.prototype.checkIsSpecial=function(param){var specialTarget=param.specialTarget;if(typeof(specialTarget)!="undefined"&&specialTarget){this.isSpecial=true;delete param.specialTarget;}else{this.isSpecial=false;}}
BNObserver.prototype.setEventAttrs=function(ev,param){if(param==null)return;if(!bnCommon.hasAnyProperty(param.attrs))return;if(!ev.at)ev.at=new Object();for(var prop in param.attrs){var child=param.attrs[prop];if(typeof(child)=="undefined"||typeof(child)=="function")continue;if(child!=null)ev.at[prop]=child;}}
BNObserver.prototype.clearObserverAttributes=function(attrList){if(!this.myTag||!this.myTag.attrs)return;for(var i in attrList){var theEvtAttr=attrList[i];if(typeof this.myTag.attrs[theEvtAttr]!='undefined'){delete this.myTag.attrs[theEvtAttr];}}};BNObserver.prototype.checkForSpecialTarget=function(ev){this.setSpecialTarget(baynote_globals.ReferrerPatterns,ev.r);this.setSpecialTarget(baynote_globals.DocumentPatterns,ev.d);this.setSpecialTarget(baynote_globals.DocDestinationPatterns,ev.dd);};BNObserver.prototype.setSpecialTarget=function(arrayOfPatterns,url){if(!url||!bnCommon.isNotEmpty(url))return;if(arrayOfPatterns&&bnCommon.isArray(arrayOfPatterns)){for(var i in arrayOfPatterns){var rxPattern=arrayOfPatterns[i];if(bnCommon.checkType(rxPattern,'RegExp')){if(rxPattern.test(url)){this.isSpecial=true;break;}}}}};var bnObserver=new BNObserver();BaynoteAPI.enableVisitEvent=function(flag){bnObserver.sendVisitEvent=flag;};BaynoteAPI.enableLingerEvent=function(flag){bnObserver.lingerCancelled=!flag;};BaynoteAPI.enableExitEvent=function(flag){bnObserver.sendExitEvent=flag;};bnTagManager.registerTagHandler(bnObserver.myType,bnObserver);
			
		

function BNGuideLiteHandler(){this.myType="guide";this.myTag=null;this.guide=null;this.socialGuide=null;this.socialShow=false;this.socialLoggedIn=false;this.networkInfo=null;}
bnConstants.GUIDE_RESULTS_RESOURCE_PREFIX="GLResults";bnConstants.GUIDE_SOCIAL_SHOW_LOGIN="showLogin";bnConstants.GUIDE_SOCIAL_HIDE_LOGIN="hideLogin";bnConstants.GUIDE_SOCIAL_SHOW_GUIDE="showGuide";BNGuideLiteHandler.prototype.gotoPage=function(tagId,guideRank,gotoURL){with(this){if(typeof(bnTrailMgr)!="undefined"&&bnTrailMgr){var guideType=bnTagManager.getTag(tagId).guide;bnTrailMgr.guideResultClick(guideType,guideRank,gotoURL);}
if(gotoURL)
{if(bnIsIE)window.event.returnValue=false;window.location.href=gotoURL;}}}
BNGuideLiteHandler.prototype.getResultsHandlerAddress=function(guideTag){var resultsFormat=guideTag.getParam("format",bnPolicy.get(this.myType,"fmt"));if(!resultsFormat){resultsFormat="results-xsl";};var srcPreamble=guideTag.server+baynote_globals.TagsURLPrefix+this.myType+"/"+resultsFormat+"/"+guideTag.customerId+"-"+guideTag.code;var guideScriptSrc="";guideScriptSrc+=srcPreamble;guideScriptSrc+="?userId="+bnUser.getUserId(guideTag);guideScriptSrc+="&customerId="+guideTag.customerId;guideScriptSrc+="&code="+guideTag.code;if(guideTag.key)guideScriptSrc+="&key="+guideTag.key;guideScriptSrc+="&id="+guideTag.id;if(this.socialShow&&this.socialGuide){guideScriptSrc+="&guide="+encodeURIComponent(this.socialGuide);}
if(guideTag.listSize)guideScriptSrc+="&resultsPerPage="+guideTag.listSize;if(guideTag.startingDocNum)guideScriptSrc+="&startingDocNum="+guideTag.startingDocNum;var query=bnPageInfo.getBNParams()["bn_q"];if(!query)query=guideTag.query;if(!query){guideTag.referrer=bnPageInfo.getReferrerURL();}
if(query){guideScriptSrc+="&query="+encodeURIComponent(query);guideTag.query=query;}
var referrer=guideTag.referrer;if(referrer){guideScriptSrc+="&referrer="+encodeURIComponent(referrer);}
guideTag.isFallback=false;var fallback=guideTag.fallback;if(fallback){guideScriptSrc+="&fallback="+encodeURIComponent(fallback);}
var pageURL=guideTag.getParam("url",bnPageInfo.getURL());var listUrls=guideTag.getParam("listUrls",null);if(listUrls&&listUrls.length>0){for(var ixUrl=0;ixUrl<listUrls.length;ixUrl++)
guideScriptSrc+="&url="+encodeURIComponent(listUrls[ixUrl]);}
else if(bnTrail&&bnPolicy.get("trail","ok")){guideScriptSrc+="&url="+encodeURIComponent(pageURL);var listUrls=bnTrail.getUrls(bnPolicy.get("trail","tl"));if(listUrls.length>0){for(ixTrail=listUrls.length-1;ixTrail>=0;ixTrail--){var trailUrl=listUrls[ixTrail];if(trailUrl==pageURL)continue;guideScriptSrc+="&url="+encodeURIComponent(trailUrl);}}}
else{pageURL=bnCommon.addURLMetaKeys(pageURL,guideTag.metaKeys);guideScriptSrc+="&url="+encodeURIComponent(pageURL);}
guideScriptSrc+="&appendParams="+encodeURIComponent(guideTag.getParam("appendParams",""));guideScriptSrc+="&rankParam="+encodeURIComponent(guideTag.getParam("rankParam",""));if(guideTag.urlFilter)guideScriptSrc+="&urlFilter="+encodeURIComponent(guideTag.urlFilter);if(guideTag.attrFilter)guideScriptSrc+="&attrFilter="+encodeURIComponent(guideTag.attrFilter);if(guideTag.ctxAttrList)guideScriptSrc+="&ctxAttrList="+encodeURIComponent(guideTag.ctxAttrList);if(guideTag.attrSort)guideScriptSrc+="&attrSort="+encodeURIComponent(guideTag.attrSort);if(guideTag.sortSize)guideScriptSrc+="&sortSize="+guideTag.sortSize;if(guideTag.days)guideScriptSrc+="&days="+guideTag.days;if(guideTag.oe)guideScriptSrc+="&oe="+guideTag.oe;if(bnCommon.hasAnyProperty(guideTag.attrs))
{guideScriptSrc+="&contextAttrs="+bnCommon.objectToJSON(guideTag.attrs);}
var cond=bnPolicy.get("inf","cd");if(cond)guideScriptSrc+="&condition="+encodeURIComponent(cond);if(this.socialGuide){guideScriptSrc+="&social=";if(this.socialShow){if(this.socialLoggedIn)guideScriptSrc+=bnConstants.GUIDE_SOCIAL_SHOW_GUIDE;else guideScriptSrc+=bnConstants.GUIDE_SOCIAL_SHOW_LOGIN;}
else{guideScriptSrc+=bnConstants.GUIDE_SOCIAL_HIDE_LOGIN;}}
if(this.socialShow){if(this.networkInfo){networkInfo=this.networkInfo;if(networkInfo.groupIds&&!networkInfo.groupIds.isEmpty()){var param="&groupIds=";var limit=bnConstants.MAX_URL_LENGTH-guideScriptSrc.length-param.length-4;if(limit<0)limit=0;var value=networkInfo.groupIds.toString(limit);if(value&&value!=""){guideScriptSrc+=param;guideScriptSrc+=value;}}
if(networkInfo.friendIds&&!networkInfo.friendIds.isEmpty()){var param="&friendIds=";var limit=bnConstants.MAX_URL_LENGTH-guideScriptSrc.length-param.length-4;if(limit<0)limit=0;var value=networkInfo.friendIds.toString(limit);if(value&&value!=""){guideScriptSrc+=param;guideScriptSrc+=value;}}}}
var eids=bnCommon.getAllGuideContainersPresent();if(eids.length>0){var eidstr='';for(var i=0;i<eids.length;i++){eidstr+=eids[i];if(i!=(eids.length-1)){eidstr+=',';}}
guideScriptSrc+="&elementIds="+eidstr;}
if(guideTag.extraParams&&typeof guideTag.extraParams=='object'){for(var attr in guideTag.extraParams){guideScriptSrc+='&'+attr+'='+encodeURIComponent(guideTag.extraParams[attr]);}}
guideScriptSrc+="&v=1";return guideScriptSrc;}
BNGuideLiteHandler.prototype.show=function(guideTag){if(!bnCommon.isGuideContainerPresent()){return;}
this.myTag=guideTag;this.guide=this.myTag.guide;this.socialGuide=this.myTag.socialGuide;this.id=guideTag.id;this.resultResourceId=bnConstants.GUIDE_RESULTS_RESOURCE_PREFIX+guideTag.id;if(typeof(guideTag.socialShow)!="undefined"){this.socialShow=guideTag.socialShow;}
listTags=bnTagManager.getTags(bnConstants.SOCIAL_TAG);if(listTags.length>0)
{guide=this;bnResourceManager.waitForResource(bnConstants.SOCIAL_RESOURCE_ID,function(){guide.showComplete();});return;}
this.showComplete();bnTagManager.invokeCallBack(this.resultResourceId,this.myTag);}
BNGuideLiteHandler.prototype.showComplete=function(){if(typeof(bnSocial)!="undefined"&&bnSocial){if(bnSocial.isLoggedIn("facebook")){this.socialLoggedIn=true;}}
this.loadResults();bnResourceManager.registerAndAddResource(this.myType+this.myTag.id,this);}
BNGuideLiteHandler.prototype.loadResults=function(){var thatId=this.id;var resultsAreInProxyFn=function(){bnGuideLiteHandler.resultsAreIn(bnTagManager.getTag(thatId));};bnResourceManager.waitForResource(this.resultResourceId,resultsAreInProxyFn,this.getResultsHandlerAddress(this.myTag));}
BNGuideLiteHandler.prototype.injectWelcomeText=function(guideTag){var welcome;var welcomeElem=document.getElementById("bn_guidewelcome"+guideTag.id);if(!welcomeElem)return;if(welcomeElem.innerHTML)return;if(guideTag.isFallback)welcome=guideTag.fallbackWelcome;else welcome=guideTag.welcome;if(welcome&&welcome.indexOf("BN_QUERY")!=-1){if(guideTag.query)welcome=welcome.replace("BN_QUERY",guideTag.query);else welcome=guideTag.fallbackWelcome;}
if(welcome){welcomeElem.innerHTML=welcome;}}
BNGuideLiteHandler.prototype.resultsAreIn=function(guideTag){if(!guideTag)return;if(!guideTag.results)return;if(typeof guideTag.results=='string'){var ph;if(bnCommon.isNotEmpty(guideTag.divId)){ph=document.getElementById(guideTag.divId);if(!bnCommon.isNotEmpty(ph)){ph=document.getElementById(guideTag.placeHolderId);}}else{ph=document.getElementById(guideTag.placeHolderId);}
if(ph){this.resultIsIn(guideTag,ph,guideTag.results);}}else{var resultArray=guideTag.results;baynote_globals.RecImpressionMap=baynote_globals.RecImpressionMap||{};baynote_globals.RecImpressionList=baynote_globals.RecImpressionList||[];for(var idx in resultArray){var divName=resultArray[idx].ei;var recImp=resultArray[idx].ri;var result=resultArray[idx].r;if(typeof(result)!='string')continue;var ph=document.getElementById(divName);if(!ph)continue;this.resultIsIn(guideTag,ph,result);baynote_globals.RecImpressionMap.divName=recImp;baynote_globals.RecImpressionList.push(recImp);}}}
BNGuideLiteHandler.prototype.resultIsIn=function(guideTag,ph,resultStr){if(resultStr){if(typeof(bnPolicy.showTag)=='function'){if(!bnPolicy.showTag(guideTag))ph.style.display="none";}
if(guideTag.css){for(className in guideTag.css){if(typeof(guideTag.css[className])=='function')continue;resultStr=resultStr.replace("class='"+className+"'","class='"+className+"' style='"+guideTag.css[className]+"'");}}
ph.innerHTML=resultStr;this.injectWelcomeText(guideTag);var listStyleUpdate=ph.getElementsByTagName("style");this.updateHead("style",listStyleUpdate);}
else if(resultStr==""){guideTag.injectNoload("no results",ph);}
else{guideTag.injectNoload("error occurred",ph);}}
BNGuideLiteHandler.prototype.updateHead=function(tagName,listElemUpdate){var listFinalUpdate=new Array();var mapElemUpdate=new Object();var idPrefix=this.myType+this.id+"-"+tagName+"-";var autoElemNum=0;for(var i=0;i<listElemUpdate.length;i++){var elemUpdate=listElemUpdate.item(i);var idBase=null;if((typeof(elemUpdate.id)=="string")&&(elemUpdate.id))idBase=elemUpdate.id;else{idBase="auto"+autoElemNum;autoElemNum++;}
var idUpdate=idPrefix+idBase;elemUpdate.parentNode.removeChild(elemUpdate);elemUpdate.id=idUpdate;mapElemUpdate[idUpdate]=elemUpdate;}
var elemHead=document.getElementsByTagName("head")[0];var listElemOld=elemHead.getElementsByTagName(tagName);for(var i=0;i<listElemOld.length;i++){var elemOld=listElemOld.item(i);if(typeof(elemOld.id)!="string"||!elemOld.id)continue;var idElem=elemOld.id;if(idElem.indexOf(idPrefix)!=0)continue;var elemUpdate=mapElemUpdate[idElem];if(elemUpdate){elemHead.replaceChild(elemUpdate,elemOld);mapElemUpdate[idElem]=null;delete(mapElemUpdate[idElem]);listFinalUpdate.push(elemUpdate);}
else elemHead.removeChild(elemOld);}
for(var idStyle in mapElemUpdate){if(!bnCommon.containsKey(mapElemUpdate,idStyle))continue;var elemUpdate=mapElemUpdate[idStyle];elemHead.appendChild(elemUpdate);listFinalUpdate.push(elemUpdate);}
return listFinalUpdate;}
BNGuideLiteHandler.prototype.evalGlobal=function(strScript){}
BNGuideLiteHandler.prototype.sessionReady=function(networkInfo){this.socialLoggedIn=true;this.networkInfo=networkInfo;}
BNGuideLiteHandler.prototype.networkLogin=function(networkInfo){this.socialLoggedIn=true;this.networkInfo=networkInfo;if(this.socialShow)this.reloadGuide();}
BNGuideLiteHandler.prototype.networkLogout=function(networkInfo){this.socialLoggedIn=false;this.networkInfo=networkInfo;if(this.socialShow)this.reloadGuide();}
BNGuideLiteHandler.prototype.loadGeneralGuide=function(){this.socialShow=false;this.reloadGuide();}
BNGuideLiteHandler.prototype.loadSocialGuide=function(args){this.socialShow=true;if(!this.socialLoggedIn&&args.cbNotLoggedIn){args.cbNotLoggedIn();return;}
this.reloadGuide();}
BNGuideLiteHandler.prototype.reloadGuide=function(){bnResourceManager.removeResource(this.resultResourceId);this.loadResults();}
BNGuideLiteHandler.prototype.setSocialShow=function(show){this.socialShow=show;}
var bnGuideLiteHandler=new BNGuideLiteHandler();bnTagManager.registerTagHandler(bnGuideLiteHandler.myType,bnGuideLiteHandler);

bnConstants.AJAX_RESOURCE_PREFIX='Ajax_';bnConstants.AJAX_URL='/.ajax';function BNAjaxHandler(){this.myType="ajax";this.myTag=null;this.myRegistry=null;this.lastReqId=0;}
BNAjaxHandler.prototype.getHandlerAddress=function(rtObj){var bnURL=this.myTag.server;bnURL+=rtObj.bnURL;var l=rtObj.bnURL.length;if(l>0){if(rtObj.bnURL.substr(l-6)!=bnConstants.AJAX_URL){bnURL+=bnConstants.AJAX_URL;}}
bnURL+="?reqID="+this.ajaxResourceId;bnURL+="&userId="+bnUser.getUserId(this.myTag);bnURL+="&customerId="+this.myTag.customerId;bnURL+="&code="+this.myTag.code;var referrer=bnPageInfo.getReferrerURL();if(referrer)bnURL+="&referrer="+encodeURIComponent(referrer);var cond=bnPolicy.get("inf","cd");if(cond)bnURL+="&condition="+encodeURIComponent(cond);for(var attr in rtObj.params){bnURL+="&"+attr+"="+encodeURIComponent(rtObj.params[attr]);}
bnURL+="&v=1";return bnURL;}
BNAjaxHandler.prototype.show=function(theTag){this.myTag=theTag;this.myRegistry=new Object();this.initialized=true;}
BNAjaxHandler.prototype.send=function(rtObj){if(!this.initialized){bnLog.log("WARN: ajax handler is not initialized - call execute on it");return;}
this.lastReqId++;this.ajaxResourceId=bnConstants.AJAX_RESOURCE_PREFIX+this.lastReqId;this.myRegistry[this.ajaxResourceId]=rtObj;var thisAjaxResourceId=this.ajaxResourceId;var resultsAreInProxyFn=function(){bnAjaxHandler.resultsAreIn(thisAjaxResourceId);};bnResourceManager.waitForResource(this.ajaxResourceId,resultsAreInProxyFn,this.getHandlerAddress(rtObj));bnTagManager.invokeCallBack(this.ajaxResourceId,this.myTag);}
BNAjaxHandler.prototype.resultsAreIn=function(reqId){var rtObj=this.getRTObject(reqId);if(!rtObj){bnLog.log('AJAX RESULTS HANDLER - empty runtime object');return;}
if(rtObj.isSuccess){rtObj.onSuccess(rtObj.responseText);}else{rtObj.onFailure(rtObj.responseText);}}
BNAjaxHandler.prototype.getRTObject=function(reqId){return this.myRegistry[reqId];}
var bnAjaxHandler=new BNAjaxHandler();bnTagManager.registerTagHandler(bnAjaxHandler.myType,bnAjaxHandler);
	

// div id for total search injection
bn_searchwrapper_id = 'searchPageWrapper';

// custom script constants (let's pollute the global namespace less)
bncs_constants = {
		// facet filters to be added to our search call. will be assembled into url param form at call time
		customFacetFilters: {}
};

/**
 * get js search params from the bnExtraSearchParams variable if it exists
 * @return
 */
function bn_getExtraSearchParams() {
	if ( window.bnExtraSearchParams ) {
		return bnExtraSearchParams;
	} else {
		return {};
	}
}

/**
 * get facet filters from the js variable bnFacetFilters
 * @return
 */
function bn_getJSFacetFilters() {
	if ( window.bnFacetFilters ) {
		return bnFacetFilters;
	} else {
		return {};
	}
}

/**
 * get facet filters from the url param bn_facetFilter
 * 
 * warning! this function assumes commas are reliable separators! This may not always be the case
 * @return
 */
function bn_getUrlFacetFilters() {
	var filterString = BaynoteAPI.getBNParam('bn_facetFilter');
	if ( filterString && filterString.indexOf(':') > -1 ) {
		var splitFilters = filterString.split(',');
		
		var filterObj = {};
		for ( var i = 0 ; i < splitFilters.length ; i++ ) {
			var filter = splitFilters[i];
			var key = bn_substringBefore(filter,':');
			var value = bn_substringAfter(filter,':');
			
			filterObj[key] = value;
		}
		
		return filterObj;
	} else {
		return {};
	}
}

/**
 * Add a set of facet filters to our master set
 * @param facetFilters
 * @return
 */
function bn_addFacetFilters(facetFilters) {
	for ( var facet in facetFilters ) {
		bncs_constants.customFacetFilters[facet] = facetFilters[facet];
	}
}

/**
 * roll all the facet filters we can find into the master set
 * @return
 */
function bn_gatherFacetFilters() {
	bn_addFacetFilters(bn_getUrlFacetFilters());
	bn_addFacetFilters(bn_getJSFacetFilters());
}

/**
 * get a string of the facet filters in bncs_constants.customFacetFilters
 * @return
 */
function bn_getFacetFilterString() {
	var wipFiltersArray = [];
	for ( var key in bncs_constants.customFacetFilters ) {
		var value = bncs_constants.customFacetFilters[key];
		
		wipFiltersArray.push(key + ':' + value);
	}
	
	return wipFiltersArray.join(',');
}

/**
 * automatic search injection logic
 * @return
 */
function bn_autoInjectSearch() {
	if ( BaynoteAPI.getURLParam('bnInjectSearch') == 'true' || window.bnAutoInjectSearch ) {
		bn_forceInjectSearch();
	}
}

/**
 * forced search injection logic
 * @return
 */
function bn_forceInjectSearch() {
	var query = decodeURIComponent(BaynoteAPI.getURLParam('searchStr'));
	if ( !query ) {
		query = '*';
	}
	bn_gatherFacetFilters();
	
	if ( typeof query != 'undefined' ) {
		bn_injectSearch(query);
	}
}

/**
 * search success function
 * @param elementId
 * @param responseText
 * @return
 */
function gotSearchAjax(elementId, responseText) {
	var searchDiv = document.getElementById(elementId);

	if ( searchDiv ) {
		searchDiv.innerHTML = responseText;
	}
	
	if ( typeof baynotePostSearchInjection == 'function' ) {
		baynotePostSearchInjection(elementId);
	}
}

/**
 * search error function
 * @param responseText
 * @return
 */
function gotSearchError(responseText) {
	if ( typeof baynoteSearchInjectionFailed == 'function' ) {
		baynoteSearchInjectionFailed();
	}
}


/**
 * inject main search pane and side search pane based on query
 * @param query
 * @return
 */
function bn_injectSearch(query) {
	if ( bncs_constants.ajax_shown ) {
		bn_callSearchAjax(bn_searchwrapper_id, 'injected', query);
	} else {
		bnAutoInjectSearch = true;
	}
}

/**
 * fire the actual ajax call for search for query; on return, inject search into elementId
 * @param elementId
 * @param searchMode
 * @param query
 * @return
 */
function bn_callSearchAjax(elementId, searchMode, query) {
	var gotSearchAjax_proxy = function(responseText) {
		gotSearchAjax(elementId, responseText);
	}

	// populate basic search params
	var searchParams = {
		mode: searchMode,
		query: bn_decodeQuery(query)
	};

	// add facetFilter param if we have filters
	var facetFilter = bn_getFacetFilterString();
	if ( facetFilter ) {
		searchParams.facetFilter = facetFilter;
	}

	// add custom params to search params
	var extraParams = bn_getExtraSearchParams();
	for ( key in extraParams ) {
		searchParams[key] = extraParams[key];
	}
	
	BaynoteAPI.getAjaxTag().send({
		bnURL: '/baynote/socialsearch',
		onSuccess: gotSearchAjax_proxy,
		onFailure: gotSearchError,
		params: searchParams
	});
}

function bn_setABTest(){
	if(BaynoteAPI.getPolicy("guide","ok")){
		BaynoteAPI.setCookie("bn_recs","baynoteON","/","NEVER");
	}
	else {
		BaynoteAPI.setCookie("bn_recs","baynoteOFF","/","NEVER");
	}
} 

function bn_setUrl(tag) {
	var pagetype, genreid, venueid, eventid;
	if (typeof bn_pageType != "undefined")
		pagetype = bn_pageType;
	if (typeof bn_genreId != "undefined")
		var genreid = bn_genreId;
	if (typeof bn_venueId != "undefined")
		var venueid = bn_venueId;
	if (typeof bn_eventId != "undefined")
		var eventid = bn_eventId;
	if (BaynoteAPI.isNotEmpty(eventid) && (pagetype == "EventPage" || pagetype == "BrowseTicketDetail")){
		tag.url = "http://www.stubhub.com/EventPage/" + eventid;
	}
	else if (BaynoteAPI.isNotEmpty(venueid) && pagetype == "VenuePage"){
		tag.url = "http://www.stubhub.com/VenuePage/" + venueid;
	}
	else if (BaynoteAPI.isNotEmpty(genreid) && pagetype == "GenrePage"){
		tag.url = "http://www.stubhub.com/GenrePage/" + genreid;
	}
}

function myPreHandler(tag) { 

	if (typeof tag != 'undefined' &&  tag.type != 'undefined' && tag.type==bnConstants.OBSERVER_TAG)   {	
		
		bn_setUrl(tag);
		bn_setABTest();
		
	} // code that runs before the observer fires

	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.GUIDE_TAG)   {	
		
		bn_setUrl(tag);
	
		//do stuff before recs have loaded
	}

	if (typeof tag != 'undefined' &&  typeof tag.type != 'undefined' && tag.type==bnConstants.AJAX_TAG) {
		BNAjaxHandler.prototype.show = function(theTag) {
	        //store the reference of the tag
	        this.myTag = theTag;

	        //arrange for a registry
	        this.myRegistry = new Object();

	        //this is initialized
	        this.initialized = true;
	        
	        //invoke ajax posthandler
	        bn_ajaxPostHandler(this.myTag);
		};
	}

    return true;      
} 

function bn_ajaxPostHandler(tag) {
	if (typeof tag != 'undefined' &&  tag.type && tag.type==bnConstants.AJAX_TAG ) {
		bncs_constants.ajax_shown = true;

		bn_autoInjectSearch();
	}
	
	return true;
}

function myPostHandler(tag) {
	/*
	if (typeof tag != 'undefined' &&  tag.type && tag.type==bnConstants.AJAX_TAG && !bn_ajax_shown) {
		bn_autoInjectSearch();
		bn_ajax_shown = true;
	}
	*/

	return true;
}

/**
 * substringBefore utility function
 * @param string
 * @param beforeChar
 * @return
 */
function bn_substringBefore(string, beforeChar) {
	var idx = string.indexOf(beforeChar);
	return string.substring(0, idx);
}

/**
 * substringAfter utility function
 * @param string
 * @param afterChar
 * @return
 */
function bn_substringAfter(string, afterChar) {
	var idx = string.indexOf(afterChar);
	return string.substring(idx + 1);
}

/**
 * workaround. The ajax call seems to be mangling making '+' characters in the search query
 * go through literally. Here we translate '+' to ' ' as a workaround.
 * @param query
 * @return
 */
function bn_decodeQuery(query) {
	return query.split('+').join(' ');
}

// register the event handler
baynote_globals.onBeforeTagShow.push(myPreHandler);
baynote_globals.onTagShow.push(myPostHandler); 
bnResourceManager.registerResource(baynote_globals.ScriptResourceId); 

baynote_globals.cookieDomain=BaynoteAPI.getCookieDomain();var preLoadObj={};var bn_locHref=window.location.href;if(bn_locHref.indexOf("https://")==0){preLoadObj.server="https://stubhub-www.baynote.net";}else{preLoadObj.server="http://stubhub-www.baynote.net";}
preLoadObj.customerId="stubhub";preLoadObj.code="www";preLoadObj.policyFormat='POLICY_JSONP';BaynoteAPI.init(preLoadObj);if(typeof(baynoteObserver)=="undefined"||typeof(baynoteObserver)!="boolean"||baynoteObserver){BaynoteAPI.execute("observer");}
if(typeof(baynoteGuide)=="undefined"||typeof(baynoteGuide)!="boolean"||baynoteGuide){BaynoteAPI.execute("recommendation");}
if(typeof(baynoteDisableAjax)!="undefined"&&typeof(baynoteDisableAjax)=="boolean"&&!baynoteDisableAjax){BaynoteAPI.execute("ajax");}
