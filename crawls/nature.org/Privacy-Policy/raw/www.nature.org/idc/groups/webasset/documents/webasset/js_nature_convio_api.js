ConvioApiClient=function(apiKey,receiverUrl,responseFormat){this._apiKey=apiKey;this._receiverUrl=receiverUrl;if(responseFormat){this._responseFormat=responseFormat;}
this.fullSecureXipServerUrl=this._secureServerAddress+'/site/../'+this._server_html;this.fullInsecureXipServerUrl=this._insecureServerAddress+'/site/../'+this._server_html;var clientUrl=window.location.href;var slashIndex=clientUrl.indexOf("/",9);if(slashIndex>-1)
this._clientDomain=clientUrl.substring(0,slashIndex);else
this._clientDomain=clientUrl;}
ConvioApiClient.prototype={_responseFormat:"xml",_apiKey:null,_receiverUrl:null,_secureServerAddress:"https://support.nature.org",_insecureServerAddress:"http://support.nature.org",_facade:null,_version:"1.0",_authToken:null,_server_html:"/api/api_server.html",_clientDomain:null,_XMLHTTP_PROGIDS:['Msxml2.XMLHTTP','Microsoft.XMLHTTP','Msxml2.XMLHTTP.4.0'],getAuthToken:function(callback){var stashAuthToken=cnv_hitch(this,this._stashAuthToken);var cb;if(this._responseFormat=="xml"){cb=function(facade){callback(facade.responseXML,facade.status);};var cb1=function(facade){var status=facade.status;if(status==200){var token=facade.responseXML.getElementsByTagName("token").item(0).firstChild.nodeValue;stashAuthToken(token);}
cb(facade);};this._getAuthenticationUrl(cb1);}
else{cb=function(facade){callback(JSON.parse(facade.responseText),facade.status);};var cb1=function(facade){var status=facade.status;if(status==200){var response=JSON.parse(facade.responseText);var token=response.getLoginUrlResponse.token;stashAuthToken(token);}
cb(facade);};this._getAuthenticationUrlJson(cb1);}},doSingleSignon:function(username,password,callback,remember){var processLoginResponseXml=cnv_hitch(this,this._processLoginResponseXml);var processLoginResponseJson=cnv_hitch(this,this._processLoginResponseJson);var authenticateForSingleSignon=cnv_hitch(this,this._authenticateForSingleSignon);var cb2;if(this._responseFormat=="xml"){cb2=function(facade){processLoginResponseXml(facade.responseXML,facade.status);callback(facade.responseXML,facade.status);};}
else{cb2=function(facade){processLoginResponseJson(JSON.parse(facade.responseText),facade.status);callback(JSON.parse(facade.responseText),facade.status);};}
var cb1=function(facade){var status=facade.status;if(status==200){var url=facade.responseXML.getElementsByTagName("url").item(0).firstChild.nodeValue;var token=facade.responseXML.getElementsByTagName("token").item(0).firstChild.nodeValue;authenticateForSingleSignon(url,username,password,token,cb2,remember);}};this._getAuthenticationUrl(cb1);},getLoggedInConsId:function(callback){var checkUserLoggedIn=cnv_hitch(this,this._checkUserLoggedIn);var cb;if(this._responseFormat=="xml"){cb=function(facade){callback(facade.responseXML,facade.status);};}
else{cb=function(facade){callback(JSON.parse(facade.responseText),facade.status);};}
var cb1=function(facade){var status=facade.status;if(status==200){var url=facade.responseXML.getElementsByTagName("url").item(0).firstChild.nodeValue;var token=facade.responseXML.getElementsByTagName("token").item(0).firstChild.nodeValue;checkUserLoggedIn(url,token,cb);}};this._getAuthenticationUrl(cb1);},callConsAPI:function(method,callback,arguments){this._callRestMethod('POST','CRConsAPI',method,callback,arguments);},callDonationAPI:function(method,callback,arguments){this._callRestMethod('POST','CRDonationAPI',method,callback,arguments);},callTeamraiserAPI:function(method,callback,arguments){this._callRestMethod('POST','CRTeamraiserAPI',method,callback,arguments);},callOrgEventAPI:function(method,callback,arguments){this._callRestMethod('POST','CROrgEventAPI',method,callback,arguments);},_callRestMethod:function(httpmethod,servlet,method,callback,map){var url=this._secureServerAddress+"/site/"+servlet;var body="method="+method;body=body+"&response_format="+this._responseFormat;body=body+"&v="+this._version;body=body+"&api_key="+this._apiKey;var auth_token=this._fetchAuthToken();if(auth_token){body=body+"&auth="+auth_token;}
if(map){var addl_args;if(typeof map=="string"){addl_args=map;}
else if(map.tagName&&map.tagName=="FORM"){addl_args=this._formToQuery(map);}
else{addl_args=this._objectToQuery(map);}
if(addl_args&&addl_args.length>0){body=body+"&"+addl_args;}}
var cb;if(this._responseFormat=="xml"){cb=function(facade){callback(facade.responseXML,facade.status);};}
else{cb=function(facade){callback(JSON.parse(facade.responseText),facade.status);};}
this._secureRestCall(httpmethod,url,cb,body);},_getAuthenticationUrl:function(callback){var httpmethod='POST';var url=this._insecureServerAddress+"/site/CRConnectAPI";url=url+"?method=getLoginUrl";url=url+"&v="+this._version;url=url+"&api_key="+this._apiKey;url=url+"&response_format=xml";this._insecureRestCall(httpmethod,url,callback);},_getAuthenticationUrlJson:function(callback){var httpmethod='POST';var url=this._insecureServerAddress+"/site/CRConnectAPI";url=url+"?method=getLoginUrl";url=url+"&v="+this._version;url=url+"&api_key="+this._apiKey;url=url+"&response_format=json";this._insecureRestCall(httpmethod,url,callback);},_authenticateForSingleSignon:function(url,username,password,token,callback,remember){var httpmethod='POST';var body="method=login";body=body+"&v="+this._version;body=body+"&api_key="+this._apiKey;body=body+"&response_format="+this._responseFormat;body=body+"&user_name="+username;body=body+"&password="+password;if(remember!=null&&remember)
body=body+"&remember_me=true";body=body+"&auth="+token;this._secureRestCall(httpmethod,url,callback,body);},_checkUserLoggedIn:function(url,token,callback){var httpmethod='POST';var body="method=getUser";body=body+"&v="+this._version;body=body+"&api_key="+this._apiKey;body=body+"&response_format="+this._responseFormat;body=body+"&fields=cons_id";body=body+"&auth="+token;this._stashAuthToken(token);this._secureRestCall(httpmethod,url,callback,body);},_processLoginResponseXml:function(responseXml,status){if(status==200){var token=responseXml.getElementsByTagName("token").item(0).firstChild.nodeValue;this._stashAuthToken(token);}},_processLoginResponseJson:function(responseObject,status){if(status==200){var token=responseObject.loginResponse.token;this._stashAuthToken(token);}},_stashAuthToken:function(value){var name='cnv_sso_auth_token';var date=new Date();date.setTime(date.getTime()+(24*3600*1000));var expires="; expires="+date.toGMTString();document.cookie=name+"="+value+expires+"; path=/";},_fetchAuthToken:function(){var name='cnv_sso_auth_token=';var carray=document.cookie.split(';');for(var i=0;i<carray.length;i++){var c=carray[i];while(c.charAt(0)==' ')
c=c.substring(1,c.length);if(c.indexOf(name)==0)
return c.substring(name.length,c.length);}
return null;},_secureRestCall:function(httpmethod,url,callback,body){if(this._clientDomain==this._secureServerAddress){this._localRestCall(httpmethod,url,callback,body);}
else{convio_xip.xipClientUrl=this._receiverUrl;var facade=convio_xip.createFacade(this.fullSecureXipServerUrl);this._doRestCall(facade,httpmethod,url,callback,body);}},_insecureRestCall:function(httpmethod,url,callback,body){if(this._clientDomain==this._insecureServerAddress){this._localRestCall(httpmethod,url,callback,body);}
else{convio_xip.xipClientUrl=this._receiverUrl;facade=convio_xip.createFacade(this.fullInsecureXipServerUrl);this._doRestCall(facade,httpmethod,url,callback,body);}},_doRestCall:function(facade,httpmethod,url,callback,body){facade.open(httpmethod,url,callback);if(httpmethod=='POST'&&body&&body.length>0){facade.setRequestHeader("Content-type","application/x-www-form-urlencoded");facade.setRequestHeader("Content-length",body.length);facade.setRequestHeader("Connection","close");}
facade.send(body);},_localRestCall:function(httpmethod,url,callback,body){var xhr=this._getXmlhttpObject();var xhrIntervalId=setInterval(function(){if(xhr.readyState==4){clearInterval(xhrIntervalId);callback(xhr);}},10);xhr.open(httpmethod,url,true);this._setRequestHeader(xhr,"Content-type","application/x-www-form-urlencoded");this._setRequestHeader(xhr,"Connection","close");if(body)
this._setRequestHeader(xhr,"Content-length",body.length);try{xhr.send(body);}
catch(e){if(typeof xhr.abort=="function"){xhr.abort();callback({status:404,statusText:"error: "+e});}}},_getXmlhttpObject:function(){var http=null;var last_e=null;try{http=new XMLHttpRequest();}
catch(e){}
if(!http){for(var i=0;i<3;++i){var progid=this._XMLHTTP_PROGIDS[i];try{http=new ActiveXObject(progid);}
catch(e){last_e=e;}
if(http){this._XMLHTTP_PROGIDS=[progid];break;}}}
if(!http){throw"XMLHTTP not available: "+last_e;}
return http;},_setRequestHeader:function(http,header,headerValue){if(header&&headerValue){http.setRequestHeader(header,headerValue);}},_formToQuery:function(fobj){var str="";var ft="";var fv="";var fn="";var els="";for(var i=0;i<fobj.elements.length;i++){els=fobj.elements[i];ft=els.title;fv=els.value;fn=els.name;if(fn!='redirect'&&fn!='success_redirect'&&fn!='error_redirect'&&fn!='api_key'&&fn!='method'&&fn!='v'&&fn!='api_key'&&fn!='response_format'&&fn!='auth_token')
{switch(els.type){case"text":case"hidden":case"password":case"textarea":str+=encodeURIComponent(fn)+"="+encodeURIComponent(fv)+"&";break;case"checkbox":case"radio":if(els.checked)str+=encodeURIComponent(fn)+"="+encodeURIComponent(fv)+"&";break;case"select-one":str+=encodeURIComponent(fn)+"="+
encodeURIComponent(els.options[els.selectedIndex].value)+"&";break;}}}
str=str.substr(0,(str.length-1));return str;},_objectToQuery:function(map){var pairs=[];var backstop={};for(var name in map){if(name!='redirect'&&name!='success_redirect'&&name!='error_redirect'&&name!='api_key'&&name!='method'&&name!='v'&&name!='api_key'&&name!='response_format'&&name!='auth_token')
{var value=map[name];if(value!=backstop[name]){var assign=encodeURIComponent(name)+"=";if(value instanceof Array||typeof value=="array"){for(var i=0;i<value.length;i++){pairs.push(assign+encodeURIComponent(value[i]));}}
else{pairs.push(assign+encodeURIComponent(value));}}}}
return pairs.join("&");}}
convio_xip={xipClientUrl:"/xip/xip_client.html",urlLimit:4000,_callbackName:"convio_xip.fragmentReceived",_state:{},_stateIdCounter:0,_isWebKit:navigator.userAgent.indexOf("WebKit")!=-1,_isOpera:navigator.userAgent.indexOf("Opera")!=-1,send:function(facade){var url=this.xipClientUrl;if(url.split(":")[0].match(/javascript/i)||facade._ifpServerUrl.split(":")[0].match(/javascript/i)){return;}
var colonIndex=url.indexOf(":");var slashIndex=url.indexOf("/");if(colonIndex==-1||slashIndex<colonIndex){var loc=window.location.href;if(slashIndex==0){url=loc.substring(0,loc.indexOf("/",9))+url;}
else{url=loc.substring(0,(loc.lastIndexOf("/")+1))+url;}}
this.fullXipClientUrl=url;if(typeof window.postMessage!="undefined"){if(window.addEventListener){window.addEventListener("message",cnv_hitch(this,this.fragmentReceivedEvent),false);}
else if(window.attachEvent){window.attachEvent("onmessage",cnv_hitch(this,this.fragmentReceivedEvent));}}
this.send=this._realSend;return this._realSend(facade);},_realSend:function(facade){var stateId="XhrIframeProxy"+(this._stateIdCounter++);facade._stateId=stateId;var frameUrl=facade._ifpServerUrl+"#0:init:id="+stateId+"&client="
+encodeURIComponent(this.fullXipClientUrl)+"&callback="+encodeURIComponent(this._callbackName);this._state[stateId]={facade:facade,stateId:stateId,clientFrame:this.createHiddenIframe(stateId,frameUrl),isSending:false,serverUrl:facade._ifpServerUrl,requestData:null,responseMessage:"",requestParts:[],idCounter:1,partIndex:0,serverWindow:null};return stateId;},receive:function(stateId,urlEncodedData){var response={};var nvPairs=urlEncodedData.split("&");for(var i=0;i<nvPairs.length;i++){if(nvPairs[i]){var nameValue=nvPairs[i].split("=");response[decodeURIComponent(nameValue[0])]=decodeURIComponent(nameValue[1]);}}
var state=this._state[stateId];var facade=state.facade;facade._setResponseHeaders(response.responseHeaders);if(response.status==0||response.status){facade.status=parseInt(response.status,10);}
if(response.statusText){facade.statusText=response.statusText;}
if(response.responseText){facade.responseText=response.responseText;var contentType=facade.getResponseHeader("Content-Type");if(contentType){var mimeType=contentType.split(";")[0];if(mimeType.indexOf("application/xml")==0||mimeType.indexOf("text/xml")==0){facade.responseXML=this.createXMLDocument(response.responseText);}}}
facade.readyState=4;this.destroyState(stateId);facade._callback(facade);},frameLoaded:function(stateId){var state=this._state[stateId];var facade=state.facade;var reqHeaders=[];for(var param in facade._requestHeaders){reqHeaders.push(param+": "+facade._requestHeaders[param]);}
var requestData={uri:facade._uri};if(reqHeaders.length>0){requestData.requestHeaders=reqHeaders.join("\r\n");}
if(facade._method){requestData.method=facade._method;}
if(facade._bodyData){requestData.data=facade._bodyData;}
this.sendRequest(stateId,this._objectToQuery(requestData));},destroyState:function(stateId){var state=this._state[stateId];if(state){delete this._state[stateId];var parentNode=state.clientFrame.parentNode;parentNode.removeChild(state.clientFrame);state.clientFrame=null;state=null;}},createFacade:function(proxyUrl){return new convio_XhrIframeFacade(proxyUrl);},sendRequest:function(stateId,encodedData){var state=this._state[stateId];if(!state.isSending){state.isSending=true;state.requestData=encodedData||"";state.serverWindow=frames[state.stateId];if(!state.serverWindow){state.serverWindow=document.getElementById(state.stateId).contentWindow;}
if(typeof state.serverWindow.postMessage=="undefined"){if(state.serverWindow.contentWindow){state.serverWindow=state.serverWindow.contentWindow;}}
this.sendRequestStart(stateId);}},sendRequestStart:function(stateId){var state=this._state[stateId];state.requestParts=[];var reqData=state.requestData;var urlLength=state.serverUrl.length;var partLength=this.urlLimit-urlLength;var reqIndex=0;while((reqData.length-reqIndex)+urlLength>this.urlLimit){var part=reqData.substring(reqIndex,reqIndex+partLength);var percentIndex=part.lastIndexOf("%");if(percentIndex==part.length-1||percentIndex==part.length-2){part=part.substring(0,percentIndex);}
state.requestParts.push(part);reqIndex+=part.length;}
state.requestParts.push(reqData.substring(reqIndex,reqData.length));state.partIndex=0;this.sendRequestPart(stateId);},sendRequestPart:function(stateId){var state=this._state[stateId];if(state.partIndex<state.requestParts.length){var partData=state.requestParts[state.partIndex];var cmd="part";if(state.partIndex+1==state.requestParts.length){cmd="end";}
else if(state.partIndex==0){cmd="start";}
this.setServerUrl(stateId,cmd,partData);state.partIndex++;}},setServerUrl:function(stateId,cmd,message){var serverUrl=this.makeServerUrl(stateId,cmd,message);var state=this._state[stateId];if(typeof window.postMessage!="undefined"){state.serverWindow.postMessage(serverUrl.split('#')[1],'*');}
else{if(this._isWebKit){state.serverWindow.location=serverUrl;}
else{state.serverWindow.location.replace(serverUrl);}}},makeServerUrl:function(stateId,cmd,message){var state=this._state[stateId];var serverUrl=state.serverUrl+"#"+(state.idCounter++)+":"+cmd;if(message){serverUrl+=":"+message;}
return serverUrl;},fragmentReceivedEvent:function(evt){var slashIndex=this.fullXipClientUrl.indexOf("/",9);var clientDomain=this.fullXipClientUrl.substring(0,slashIndex);if(evt.origin.split("#")[0]==clientDomain){this.fragmentReceived(evt.data);}},fragmentReceived:function(frag){var index=frag.indexOf("#");var stateId=frag.substring(0,index);var encodedData=frag.substring(index+1,frag.length);var msg=this.unpackMessage(encodedData);var state=this._state[stateId];switch(msg.command){case"loaded":this.frameLoaded(stateId);break;case"ok":this.sendRequestPart(stateId);break;case"start":state.responseMessage=""+msg.message;this.setServerUrl(stateId,"ok");break;case"part":state.responseMessage+=msg.message;this.setServerUrl(stateId,"ok");break;case"end":this.setServerUrl(stateId,"ok");state.responseMessage+=msg.message;this.receive(stateId,state.responseMessage);break;}},unpackMessage:function(encodedMessage){var parts=encodedMessage.split(":");var command=parts[1];encodedMessage=parts[2]||"";var config=null;if(command=="init"){var configParts=encodedMessage.split("&");config={};for(var i=0;i<configParts.length;i++){var nameValue=configParts[i].split("=");config[decodeURIComponent(nameValue[0])]=decodeURIComponent(nameValue[1]);}}
return{command:command,message:encodedMessage,config:config};},createXMLDocument:function(xmlString){var doc;if(document.implementation.createDocument){var parser=new DOMParser()
doc=parser.parseFromString(xmlString,"text/xml")}
else if(window.ActiveXObject){doc=new ActiveXObject("Microsoft.XMLDOM")
doc.async="false"
doc.loadXML(xmlString)}
return doc;},createHiddenIframe:function(fname,uri){if(window[fname]){return window[fname];}
if(window.frames[fname]){return window.frames[fname];}
var cframe;if(document.all){document.body.insertAdjacentHTML('beforeEnd','<iframe src="'+uri+'" id="'+fname+'" name="'+fname+'" ><\/iframe>');cframe=document.getElementById(fname);}
else{cframe=document.createElement("iframe");}
cframe.style.position="absolute";cframe.style.visibility="hidden";cframe.style.top=cframe.style.left="0";cframe.style.width=cframe.style.height="0";cframe.name=fname;cframe.id=fname;cframe.src=uri;document.body.appendChild(cframe);window[fname]=cframe;return cframe;},_objectToQuery:function(map){var pairs=[];var backstop={};for(var name in map){var value=map[name];if(value!=backstop[name]){var assign=encodeURIComponent(name)+"=";if(value instanceof Array||typeof value=="array"){for(var i=0;i<value.length;i++){pairs.push(assign+encodeURIComponent(value[i]));}}
else{pairs.push(assign+encodeURIComponent(value));}}}
return pairs.join("&");}}
convio_XhrIframeFacade=function(ifpServerUrl){this._requestHeaders={};this._allResponseHeaders=null;this._responseHeaders={};this._method=null;this._uri=null;this._bodyData=null;this.responseText=null;this.responseXML=null;this.status=null;this.statusText=null;this.readyState=0;this._ifpServerUrl=ifpServerUrl;this._stateId=null;this._callback=null;}
convio_XhrIframeFacade.prototype={open:function(method,uri,callback){this._method=method;this._uri=uri;this._callback=callback;this.readyState=1;},setRequestHeader:function(header,value){this._requestHeaders[header]=value;},send:function(stringData){this._bodyData=stringData;this._stateId=convio_xip.send(this);this.readyState=2;},abort:function(){convio_xip.destroyState(this._stateId);},getAllResponseHeaders:function(){return this._allResponseHeaders;},getResponseHeader:function(header){return this._responseHeaders[header];},_setResponseHeaders:function(allHeaders){if(allHeaders){this._allResponseHeaders=allHeaders;allHeaders=allHeaders.replace(/\r/g,"");var nvPairs=allHeaders.split("\n");for(var i=0;i<nvPairs.length;i++){if(nvPairs[i]){var nameValue=nvPairs[i].split(": ");this._responseHeaders[nameValue[0]]=nameValue[1];}}}}}
function cnv_hitch(scope,method){return function(){return method.apply(scope,arguments||[]);};}
if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};var cx=new RegExp('/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g'),escapeable=new RegExp('/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g'),gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapeable.lastIndex=0;return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
return'\\u'+('0000'+
(+(a.charCodeAt(0))).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
return{stringify:function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});},parse:function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+
(+(a.charCodeAt(0))).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');}};}();}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
			while (c.charAt(0)==' ') 
				c = c.substring(1,c.length);
		if(c.indexOf(nameEQ)==0)
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function setCookie(name,val,days,min) {
	var exp = new Date();
	if( days!=null )
		exp.setDate( exp.getDate()+days );
	if( min!=null )
		exp.setTime( exp.getTime()+(min*60*1000) );
	exp.toUTCString();
	document.cookie = name + "=" + val + ";expires=" + exp.toUTCString() + ";path=/";
}

function delCookie( name ) {
	document.cookie = name + "=;expires=Thu, 01-Jan-70 00:00:01 GMT;path=/";
}

$(document).ready( function(){
	var apiKey = "796f756b696c6973";
	var format = "json";
	var clientChannel = "/idc/groups/webcontent/documents/webcontent/api_client.html";
	var login = "https://support.nature.org/site/SPageServer?pagename=login_xx&s_NEXTURL=" + window.location;
	var c_cookie = {'c_id':null,'c_greeting':null,'c_first':null,'c_last':null,'c_email':null,'c_emailStatus':null,'c_isSubscribed':null};

	$("#log-out-item").click(function(){
		
			api.callConsAPI('logout',getLogout,null);
		})
	$("#log-in a").click(function(){
		if ($(this).text()=="Log Out") {
			var api = new ConvioApiClient(apiKey, clientChannel, format);
			function getLogout(responseObject, status) {
				if (status == 200) {
					// $("#log-in").text("Log In");
					$("#pixelServer").remove();
					// $("p.welcome").text(" ");
					// $("#newsletterSignUpBox").show();
					// $("#newsletterArchiveBox").hide();
					// $("#newsletterUpdateBox").hide();
					for (c in c_cookie)
						delCookie(c);
				}
			}
			api.callConsAPI('logout',getLogout,null);
		} else {
			var c_id = readCookie("c_id");	
			if ((readCookie("c_first"))== "null") {
				var c_first = "";
			} else {
				var c_first = readCookie("c_first");
			}
	        if ((readCookie("c_last"))== "null") {
				var c_last = "";
			} else {
				var c_last = readCookie("c_last");
			}		
	        if ((readCookie("c_greeting"))== "undefined") {
				var c_greeting = c_first + " " + c_last;
			} else { 
				var c_greeting = readCookie("c_greeting");
			}
	        var welcomeMsg = "Welcome " + c_greeting;
			var c_isSubscribed = readCookie("c_isSubscribed");
			var c_emailStatus = readCookie("c_emailStatus");
			if (c_id==null) {
				$(this).attr("href",login);
			} else {
				$("p.welcome").html(welcomeMsg);
				$("#log-in").text("Log Out").attr("href","javascript:void(0);");
				if (c_isSubscribed == "true" && c_emailStatus == "GOOD") {
					$("#newsletterSignUpBox").hide();
					$("#newsletterArchiveBox").show();
					$("#newsletterUpdateBox").hide();
					$("#leftSignUp").hide();
				}
				if (c_isSubscribed == "true" && c_emailStatus != "GOOD"){
					$("#newsletterSignUpBox").hide();
					$("#newsletterUpdateBox").show();
					$("#newsletterArchiveBox").hide();
					$("#leftSignUp").hide();
				}	
				$("body").append("<img id=\"pixelServer\" src=\"http://support.nature.org/site/PixelServer\">");
			}
		}
	});
	
	$("#log-out-item a").click(function(){
		
			var api = new ConvioApiClient(apiKey, clientChannel, format);
			function getLogout(responseObject, status) {
				if (status == 200) {
					$("#log-in").html("<a href='javascript:void();'>Log In</a> or use your:");
					$("#pixelServer").remove();
					$("p.welcome").text(" ");
					$("#newsletterSignUpBox").show();
					$("#componentDiv").show();
					$("#log-out-item").hide();
					$("#newsletterUpdateBox").hide();
					for (c in c_cookie)
						delCookie(c);
				}
			}
			api.callConsAPI('logout',getLogout,null);
		
	});
		
	function checkCookie() {
		var c_id = readCookie("c_id");
		var c_isSubscribed = readCookie("c_isSubscribed");
		if ( c_id != null ) {
			$("#log-in a").click();
		} else {		
			var api = new ConvioApiClient(apiKey, clientChannel, format);
			
			function getConvioUser(responseObject, status) {
				if (status == 200) {
					var params = {
						'IdcService':'GET_CONVIO_USER',
						'cons_id':responseObject.loginResponse.cons_id,
						'timestamp':responseObject.loginResponse.timestamp,
						'signature':responseObject.loginResponse.signature,
						//'fields':'custom.string,email.primary_address,email.status,name.title,name.first,name.last',
						'isUserInterested':'1061',
						'getUserInterests':'false' };
					$.ajax({
						type: "POST",
						url: "/idc/idcplg",
						datatype: "html",
						data: params,
						complete: function(data){
							try {
			    				var res = JSON.parse(data.responseText.replace(/[()]/g,""));
			    				c_cookie['c_id'] = res.getConsResponse.cons_id;
			    				c_cookie['c_greeting'] = res.getConsResponse.custom.string[2].content;
			    				c_cookie['c_first'] = res.getConsResponse.name.first;
			    				c_cookie['c_last'] = res.getConsResponse.name.last;
			    				c_cookie['c_email'] = res.getConsResponse.email.primary_address;
			    				c_cookie['c_emailStatus'] = res.getConsResponse.email.status;
			    				c_cookie['c_isSubscribed'] = res.isConsInterestedResponse.interested;  							    				    							    							    							    				
								for ( c in c_cookie )
									setCookie(c,c_cookie[c],null,15);
								checkCookie();
							} catch(error) {
								// do othing;
							}
						}
					});
				}
			}
			api.callConsAPI('loginTest', getConvioUser, null);
		}
	}
	checkCookie();                        
});