//<!--
//1@@m3

var BNInfo=new Object();BNInfo.cd="default";var BNOC=new Object();BNOC.alt=false;BNOC.dt=60;BNOC.so=true;function simpleHash(str)
{if(!str)return 0;var h=0;for(var i=0;i<str.length;i++)
{h+=str.charAt(i).charCodeAt();}
h=Math.abs(h)%1000000;return h;}
function BNU(){var cookieName="lucky9";var cookieValue=document.cookie;var cookieStartsAt=cookieValue.indexOf(" "+cookieName+"=");if(cookieStartsAt==-1)
cookieStartsAt=cookieValue.indexOf(cookieName+"=");if(cookieStartsAt==-1)
cookieValue=null;else
{cookieStartsAt=cookieValue.indexOf("=",cookieStartsAt)+1;var cookieEndsAt=cookieValue.indexOf(";",cookieStartsAt);if(cookieEndsAt==-1)
cookieEndsAt=cookieValue.length;cookieValue=unescape(cookieValue.substring(cookieStartsAt,cookieEndsAt));}
var uIdStr=""+cookieValue+simpleHash(navigator.userAgent);return uIdStr;}
function BNSystem(){this.testServer=null;}
BNSystem.prototype.getURLParam=function(name,url){if(!url)var url=window.location.href;var regex=new RegExp("[\\?&]"+name+"=([^&#]*)");var match=regex.exec(url);if(!match)return null;else return match[1];}
BNSystem.prototype.getTestServer=function(){if(this.testServer!=null)return this.testServer;var testServer=this.getURLParam("bn_test");if(!testServer){testServer="";}
this.testServer=testServer;return testServer;}
if(typeof(bnSystem)=="undefined"){var bnSystem=new BNSystem();}
function BNTag(previousTag){if(previousTag){this.id=previousTag.id+1;this.server=previousTag.server;this.customerId=previousTag.customerId;this.code=previousTag.code;}
else this.id=0;this.attrs=new Object();this.css=new Object();}
BNTag.prototype.show=function(){window["bn_tags"][this.id]=this;var testServer=bnSystem.getTestServer();if(testServer)this.server=testServer;bnTagManager.show(this.id);baynote_tag=new BNTag(this);}
BNTag.prototype.noshow=function(){window["bn_tags"][this.id]=this;baynote_tag=new BNTag(this);}
BNTag.prototype.getParam=function(name,defaultValue){var value=this[name];if(typeof(value)=="undefined"||value==null)return defaultValue;else return value;}
if(typeof(baynote_tag)=="undefined"){window["bn_tags"]=new Array();var baynote_tag=new BNTag(null);}
bnConstants=new Object();bnConstants.BN_PARAM_PREFIX="bn_";bnConstants.META_PAGE_TITLE="baynote_title";bnConstants.META_PAGE_SUBTITLE="baynote_subtitle";bnConstants.JSON_CHARS={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};bnIsOpera=(navigator.userAgent.indexOf("Opera")>=0);bnIsSafari=(navigator.userAgent.indexOf("AppleWebKit")>=0);bnIsKonqueror=(navigator.userAgent.indexOf("Konqueror")>=0);bnIsKHTML=(bnIsSafari||bnIsKonqueror||navigator.userAgent.indexOf("KHTML")>=0);bnIsIE=(navigator.userAgent.indexOf("compatible")>=0&&navigator.userAgent.indexOf("MSIE")>=0&&!bnIsOpera);bnIsMozilla=(navigator.userAgent.indexOf("Gecko")>=0&&!bnIsKHTML);function StringBuffer(){this.buffer=[];}
StringBuffer.prototype.append=function append(string){this.buffer.push(string);return this;};StringBuffer.prototype.toString=function toString(){return this.buffer.join("");};function BNCommon(){}
BNCommon.prototype.stringToBoolean=function(str){if(!str)return false;str=str.toLowerCase();if(str==""||str=="false"||str=="f"||str=="0"||str=="no"||str=="n")return false;return true;}
BNCommon.prototype.dumpObj=function(obj,name,indent,depth,asHTML){if(asHTML){var ind="&nbsp;&nbsp;";var ret="<br>";}else{var ind="\t";var ret="\n";}
var MAX_DUMP_DEPTH=10;if(depth>MAX_DUMP_DEPTH){return indent+name+": -Maximum Depth Reached-"+ret;}
if(typeof obj=="object"){var child=null;var output=name?(indent+name+ret):"";indent+=ind;var numFunctions=0;for(var item in obj){try{child=obj[item];}catch(e){child="-Unable to Evaluate-";}
if(child==null)output+=indent+item+": <null>"+ret;else if(typeof child=="function")++numFunctions;else if(typeof child=="object")output+=this.dumpObj(child,item,indent,depth+1,asHTML);else output+=indent+item+": "+child+ret;}
if(numFunctions>0)output+=indent+"<"+numFunctions+" function(s)>"+ret;return output;}
else return obj;}
BNCommon.prototype.dump=function(obj){return this.dumpObj(obj,"","  ",5,false);}
BNCommon.prototype.dumpHTML=function(obj){return this.dumpObj(obj,"","  ",5,true);}
BNCommon.prototype.getURLParams=function(url){if(!url)var url=window.location.href;var urlParams=new Object();var tmp=url.split("?");if(tmp.length>1&&tmp[1]!=""){tmp=tmp[1];tmp=tmp.split("#");tmp=tmp[0];var params=tmp.split("&");var nameValuePair;for(var i=0;i<params.length;i++){nameValuePair=params[i].split("=");urlParams[nameValuePair[0]]=nameValuePair[1];}}
return urlParams;}
BNCommon.prototype.addURLParam=function(url,paramName,value){if(!url)return url;var urlLength=url.length;var newUrl=new StringBuffer();var insertedChar;var baseUrl=url;var baseUrlLength=urlLength;var anchor=null;var anchorIndex=url.indexOf('#');if(anchorIndex>=0){baseUrl=url.substring(0,anchorIndex);if(baseUrl=="")return url;baseUrlLength=baseUrl.length;anchor=url.substring(anchorIndex,urlLength);}
var lastChar=baseUrl.charAt(baseUrlLength-1);if(lastChar=='?'||lastChar=='&'){insertedChar=null;}else if(baseUrl.indexOf('?')>=0){insertedChar='&';}else{insertedChar='?';}
newUrl.append(baseUrl);if(insertedChar)newUrl.append(insertedChar);newUrl.append(paramName);newUrl.append('=');newUrl.append(value);if(anchor)newUrl.append(anchor);return newUrl.toString();}
BNCommon.prototype.addURLMetaKeys=function(url,metaKeyList){if(!metaKeyList)return url;var newUrl=url;var metaKeys=metaKeyList.split(",");for(var i=0;i<metaKeys.length;i++){var key=metaKeys[i];var metas=document.getElementsByName(key);if(metas&&metas.length==1){newUrl=bnCommon.addURLParam(newUrl,"bn_"+key,metas[0].content);}}
return newUrl;}
BNCommon.prototype.arrayToJSON=function(arr){var a=['['],b,i,l=arr.length,v;function p(s){if(b){a.push(',');}
a.push(s);b=true;}
for(i=0;i<l;i+=1){v=arr[i];if(v){var json=bnCommon.valueToJSON(v);if(json)p(json);}
else p("null");}
a.push(']');return a.join('');}
BNCommon.prototype.booleanToJSON=function(bool){return String(bool);}
BNCommon.prototype.numberToJSON=function(num){return isFinite(num)?String(num):"null";}
BNCommon.prototype.objectToJSON=function(obj){var a=['{'],b,i,v;function p(s){if(b){a.push(',');}
a.push(bnCommon.valueToJSON(i),':',s);b=true;}
for(i in obj){if(obj.hasOwnProperty(i)){var json=bnCommon.valueToJSON(obj[i]);if(json)p(json);else p("null");}}
a.push('}');return a.join('');};BNCommon.prototype.stringToJSON=function(str){var specialRE=new RegExp("[\"\\\x00-\x1f]","g");if(specialRE.test(str)){return'"'+str.replace(specialRE,function(b){var c=bnConstants.JSON_CHARS[b];if(c)return c;c=b.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+str+'"';}
BNCommon.prototype.valueToJSON=function(val){switch(typeof val){case'number':return this.numberToJSON(val);case'string':return this.stringToJSON(val);case'boolean':return this.booleanToJSON(val);case'object':if(val==null){return"null";}else if(val instanceof Array){return this.arrayToJSON(val);}else{return this.objectToJSON(val);}
case'unknown':case'function':case'undefined':break;default:alert("Unrecognized type: "+typeof val);}
return undefined;}
BNCommon.prototype.parseJSON=function(str){try{var legalRE=new RegExp("^(\"(\\.|[^\"\\\n\r])*?\"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$");if(legalRE.test(str)){return eval('('+str+')');}}catch(e){}
throw new SyntaxError("parseJSON");}
BNCommon.prototype.trim=function(str){if(!str)return str;while(str.charAt(0)==" "||str.charAt(0)=="\n"||str.charAt(0)=="\t")
str=str.substring(1);while(str.charAt(str.length-1)==" "||str.charAt(str.length-1)=="\n"||str.charAt(str.length-1)=="\t")
str=str.substring(0,str.length-1);return str;}
BNCommon.prototype.getInnerText=function(obj){if(obj.innerText)return obj.innerText;else{var text="";switch(obj.nodeType){case 1:for(var i=0;i<obj.childNodes.length;i++)
text+=this.getInnerText(obj.childNodes.item(i));break;case 3:text+=obj.nodeValue;break;}
return this.trim(text);}}
var bnCommon=new BNCommon();function BNPageInfo(){this.fullUrl=window.location.href.split("#")[0];this.urlParams=new Object();this.bnParams=new Object();var params=bnCommon.getURLParams(this.fullUrl);for(paramName in params){if(paramName.indexOf(bnConstants.BN_PARAM_PREFIX)==0){this.bnParams[paramName]=params[paramName];}else{this.urlParams[paramName]=params[paramName];}}
this.url=this.fullUrl.split("?")[0];var isFirst=true;for(paramName in this.urlParams){if(isFirst)this.url+="?";else this.url+="&";isFirst=false;this.url+=paramName+"=";var value=params[paramName];if(value)this.url+=value;}
this.title="";this.wordCount=0;this.linkCount=0;}
BNPageInfo.prototype.processPageDetails=function(){this.checkTitle();this.checkWordCount();this.checkLinkCount();}
BNPageInfo.prototype.checkTitle=function(){var title=null;var metas=document.getElementsByName(bnConstants.META_PAGE_SUBTITLE);if(metas&&metas.length==1)title=metas[0].content;if(!title){var metas=document.getElementsByName(bnConstants.META_PAGE_TITLE);if(metas&&metas.length>0)title=metas[0].content;if(!title)title=document.title;}
this.title=title?title:"";}
BNPageInfo.prototype.checkWordCount=function(){this.wordCount=null;var bodyTags=document.getElementsByTagName("body");if(bodyTags.length==0)return;var bodyText=bnCommon.getInnerText(bodyTags[0]);var wordCountRE=new RegExp("\S+/","g");var words=bodyText.match(wordCountRE);if(!words)this.wordCount=0;else this.wordCount=words.length;}
BNPageInfo.prototype.checkLinkCount=function(){this.linkCount=null;var linkTags=document.getElementsByTagName("a");if(!linkTags)this.linkCount=0;else this.linkCount=linkTags.length;}
BNPageInfo.prototype.getWordCount=function(){return this.wordCount;}
BNPageInfo.prototype.getLinkCount=function(){return this.linkCount;}
BNPageInfo.prototype.getTitle=function(){return this.title;}
BNPageInfo.prototype.getURL=function(){return this.url;}
BNPageInfo.prototype.getBNParam=function(paramName){return this.bnParams[paramName];}
var bnPageInfo=new BNPageInfo();function BNPolicy(){this.data=new Object();this.disableAll=false;}
BNPolicy.prototype.get=function(pId,param){if(!pId)return this.data;if(!this.data)return null;if(!param)return this.data[pId];if(!this.data[pId])return null;return this.data[pId][param];}
BNPolicy.prototype.allowTag=function(tag){if(this.disableAll)return false;var pTag=this.get(tag.type);if(!pTag)return true;if(typeof(pTag.ok)=="undefined")return true;return pTag.ok;}
BNPolicy.prototype.init=function(){this.data.inf=BNInfo;this.data.baynoteObserver=BNOC;this.disableAll=bnPageInfo.getBNParam("bn_disable");var overrides;var bn_ov=bnPageInfo.getBNParam("bn_ov");if(bn_ov){overrides=new Object();var categories=bn_ov.split(";");for(var i=0;i<categories.length;i++){var c=categories[i].split(":");var cName=c[0];var cValue=c[1];overrides[cName]=new Object();var params=cValue.split(",");for(var j=0;j<params.length;j++){var p=params[j].split("~");this.setPolicyData(overrides,cName,p[0],decodeURIComponent(p[1]));}}}
if(overrides){for(var cat in overrides){for(var key in overrides[cat]){this.setPolicyData(this.data,cat,key,overrides[cat][key]);}}}
var testServer=bnSystem.getTestServer();if(testServer){this.setPolicyData(overrides,"inf","server",testServer);}}
BNPolicy.prototype.setPolicyData=function(policyData,cat,key,value){if(!policyData[cat])policyData[cat]=new Object();policyData[cat][key]=value;}
if(typeof(bnPolicy)=="undefined"){var bnPolicy=new BNPolicy();bnPolicy.init();}
function BNTagManager(){this.tags=new Array();this.tagHandlers=new Object();}
BNTagManager.prototype.getHandlerForTag=function(tId){var tag=this.getTag(tId);return this.tagHandlers[tag.type];}
BNTagManager.prototype.registerTagHandler=function(tType,handlerObj){this.tagHandlers[tType]=handlerObj;}
BNTagManager.prototype.getTag=function(tId){return window["bn_tags"][tId];}
BNTagManager.prototype.show=function(tId){var tag=this.getTag(tId);if(!tag)return;if(!bnPolicy.get()){return;}
if(!bnPolicy.allowTag(tag)){return;}
var tHandler=this.getHandlerForTag(tId);if(!tHandler){return;}
tHandler.show(tag);}
if(typeof(bnTagManager)=="undefined"){var bnTagManager=new BNTagManager();}
function BNEvent(){}
BNEvent.prototype.addHandler=function(target,type,handler){if(target.addEventListener)target.addEventListener(type,handler,false);else if(target.attachEvent)target.attachEvent("on"+type,handler);else target["on"+type]=handler;};BNEvent.prototype.removeHandler=function(target,type,handler){if(target.removeEventListener)target.removeEventListener(type,handler,false);else if(target.detachEvent)target.detachEvent("on"+type,handler);else target["on"+type]=null;}
BNEvent.prototype.getEvent=function(){if(!window.event)return bnEvent.getEvent.caller.arguments[0];var event=window.event;if(!bnIsIE)return event;event.charCode=(event.type=="keypress")?event.keyCode:0;event.eventPhase=2;event.isChar=(event.charCode>0);event.pageX=event.clientX+document.body.scrollLeft;event.pageY=event.clientY+document.body.scrollTop;event.target=event.srcElement;event.time=(new Date).getTime();if(event.type=="mouseout")event.relatedTarget=event.toElement;else if(event.type=="mouseover")event.relatedTarget=event.fromElement;event.preventDefault=function(){this.returnValue=false;}
event.stopPropagation=function(){this.cancelBubble=true;}
return event;}
var bnEvent=new BNEvent();function BNMessenger(){this.server=null;this.messageNum=0;this.msgLimit=2000;this.initialized=false;this.debug=false;}
BNMessenger.prototype.initialize=function(serverAddr,handlerAddr,customer,code,debug){this.server=serverAddr;this.customer=customer;this.code=code;this.handler=handlerAddr;if(this.handler.charAt(0)!="/")this.handler="/"+this.handler;this.debug=debug;this.initialized=true;}
BNMessenger.prototype.sendMessage=function(msg){var debugArg=(this.debug)?"&debug=true":"";var msgPrefix=this.server+"/baynote"+this.handler+"?customerId="+this.customer+"&code="+this.code+"&msgId="+this.messageNum+debugArg+"&fmt=1&len="+msg.length+"&msg=";var fullMsg=msgPrefix+encodeURIComponent(msg);var spaceLeft=this.msgLimit-fullMsg.length;if(spaceLeft>=0){var img=new Image();img.src=fullMsg;this.messageNum++;}
return spaceLeft;}
var bnMessenger=new BNMessenger();function BNObserver(){this.myType="baynoteObserver";this.myTag=null;this.startTime=new Date().getTime();}
BNObserver.prototype.sendEvent=function(evJSON){if(!bnPolicy.get("baynoteObserver","so"))return;if(!bnMessenger.initialized){return;}
var result=bnMessenger.sendMessage(evJSON);if(result<0){var newEv=bnCommon.parseJSON(evJSON);if(newEv.de){delete newEv.de;evJSON=bnCommon.objectToJSON(newEv);result=bnMessenger.sendMessage(evJSON);}}}
BNObserver.prototype.makeEvent=function(action){var ev=new Object();ev.a=action;ev.c=bnPolicy.get("inf","cd");ev.d=this.url;ev.r=document.referrer;ev.t=new Date().getTime();ev.u=BNU();return ev;}
BNObserver.prototype.makeDetails=function(){var de=new Object();de.ti=bnPageInfo.getTitle();de.nw=bnPageInfo.getWordCount();de.nl=bnPageInfo.getLinkCount();return de;}
BNObserver.prototype.clickOccurred=function(target,clicked){var ev=this.makeEvent("c");ev.dd=target.href;var gt=target.getAttribute("baynote_guide");if(typeof(gt)!="undefined"&&gt)ev.gt=gt;var bn=target.getAttribute("baynote_bnrank");if(typeof(bn)!="undefined"&&bn)ev.rb=bn;var ir=target.getAttribute("baynote_irrank");if(typeof(ir)!="undefined"&&ir)ev.ri=ir;var lt=bnCommon.getInnerText(target);if(!lt&&bnPolicy.get("baynoteObserver","alt")){if(clicked&&clicked.tagName=="IMG"){lt=clicked.getAttribute("ALT");var src=clicked.getAttribute("SRC");if(lt&&(src.indexOf(lt)==(src.length-lt.length)))lt=null;}}
if(lt)ev.l=lt;var details=this.makeDetails();if(details!=null)ev.de=details;this.sendEvent(bnCommon.objectToJSON(ev));}
BNObserver.prototype.lingerOccurred=function(ds){var ev=this.makeEvent("l");ev.du=ds;var details=this.makeDetails();if(details!=null)ev.de=details;this.sendEvent(bnCommon.objectToJSON(ev));}
BNObserver.prototype.visitOccurred=function(){if(!this.myTag.getParam("fireVisit")&&!bnPolicy.get("baynoteObserver","sv"))return;var ev=this.makeEvent("v");if(this.myTag.attrs){for(attrName in this.myTag.attrs){if(this.myTag.attrs.hasOwnProperty(attrName)){var t=typeof this.myTag.attrs[attrName];if(t!='function'&&t!='undefined'){ev.at=this.myTag.attrs;break;}}}}
this.sendEvent(bnCommon.objectToJSON(ev));}
BNObserver.prototype.instrumentLinks=function(){if(!document.body){setTimeout("bnObserver.instrumentLinks()",200);return;}
bnEvent.addHandler(document.body,"click",function(){var evt=bnEvent.getEvent();var target=evt.target;var clicked=evt.target;while(target){if(target.tagName=="A")break;target=target.parentNode;}
if(target)bnObserver.clickOccurred(target,clicked);});}
BNObserver.prototype.show=function(obsTag){this.myTag=obsTag;this.debug=bnPolicy.get(this.myType,"debug");var obsHandler="/tags2/baynoteObserver/listener2";bnMessenger.initialize(this.myTag.server,obsHandler,this.myTag.customerId,this.myTag.code,this.debug);this.url=this.myTag.getParam("url",bnPageInfo.getURL());this.url=bnCommon.addURLMetaKeys(this.url,this.myTag.metaKeys);this.visitOccurred();var dwellTime=bnPolicy.get(this.myType,"dt");var dwellMSec=dwellTime*1000;setTimeout("bnObserver.lingerOccurred("+dwellTime+")",dwellMSec);this.instrumentLinks();}
if(typeof(bnObserver)=="undefined"){var bnObserver=new BNObserver();}
bnTagManager.registerTagHandler(bnObserver.myType,bnObserver);bnEvent.addHandler(window,"load",function(){bnPageInfo.processPageDetails();});

//2@@m2

function isSearchPage(){var current_url=window.location.href;if(current_url.indexOf('searchString=')>0)
baynote_tag.fireVisit="true";}
baynote_tag.server="http://ebay-help.baynote.net";baynote_tag.customerId="ebay";baynote_tag.code="help";baynote_tag.type="baynoteObserver";isSearchPage();baynote_tag.show();
// b=16014018 -->