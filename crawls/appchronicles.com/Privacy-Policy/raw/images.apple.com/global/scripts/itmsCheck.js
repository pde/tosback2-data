
















var BROWSER_SAFARI=1;

var BROWSER_FIREFOX=2;

var BROWSER_INTERNET_EXPLORER=3;

var BROWSER_OTHER=4;



var ITUNES_INSTALLED_COOKIE_NAME="iTunesPresent";



function iTunesDetected(){





if('true'==getCookie(ITUNES_INSTALLED_COOKIE_NAME))return true;





if(-1!=navigator.userAgent.indexOf("Macintosh"))return true;



if(BROWSER_INTERNET_EXPLORER==detectedBrowser()){

return iTunesActiveXComponentInstalled();

}





return iTunesMozillaPluginDetected();

}



function detectedBrowser(){

if(-1!=navigator.userAgent.indexOf("AppleWebKit"))return BROWSER_SAFARI;

if(-1!=navigator.userAgent.indexOf("Firefox"))return BROWSER_FIREFOX;

if(-1!=navigator.userAgent.indexOf("MSIE "))return BROWSER_INTERNET_EXPLORER;

else return BROWSER_OTHER;

}





function iTunesActiveXComponentInstalled(){

var detectObj=document.getElementById('iTunesDetectorIE');

var returnVal=false;



if((detectObj!=null)&&(typeof(detectObj)!="undefined")){

if(typeof(detectObj.IsITMSHandlerAvailable)!="undefined"){

returnVal=detectObj.IsITMSHandlerAvailable;

dbg(typeof(detectObj.IsITMSHandlerAvailable));

}



if((returnVal==null)||(typeof(returnVal)=="undefined"))returnVal=false;

}

dbg("ActiveX Control result: "+returnVal);

return returnVal;

}





function iTunesMozillaPluginDetected(){

var result=false;

if(navigator.plugins&&navigator.plugins.length>0){

for(var i=0;i<navigator.plugins.length;i++){

var plugin=navigator.plugins[i];

var pluginName=plugin.name;

if(pluginName.indexOf("iTunes Application Detector")>-1){result=true}

}

}

info("FF plugin detected: "+result);

return result;

}





function itmsOpen(url,downloadUrl,overridePanelId,noClose){

if(null!=getCookie('recentlyRedirected'))noClose=true;

setCookie('recentlyRedirected',true,4000);



if(iTunesDetected()){

setCookie(ITUNES_INSTALLED_COOKIE_NAME,true,9999999999);



if(noClose){









setTimeout('window.location.href = "'+url+'"',1);

return true;

}else{

return replaceCurrentPageWithUrl(url);

}

}

else{

if(BROWSER_INTERNET_EXPLORER==detectedBrowser()){





window.location.replace(downloadUrl);

}

else{

document.getElementById(overridePanelId).style.display='block';

}

}

return true;

}





function replaceCurrentPageWithUrl(url){



window.location.href=url;



info("Window History Length: "+window.history.length);

if(window.history.length<2){

setTimeout('window.close()',100);

}else{

setTimeout('window.history.back()',100);

}

return true;

}



function setCookie(cookieName,cookieValue,ttlMillis){

var expire=new Date();

expire.setTime(expire.getTime()+ttlMillis);

var cookie=cookieName+"="+escape(cookieValue)+"; expires="+expire.toGMTString();

info("setCookie(): "+cookie);

document.cookie=cookie;

}



function getCookie(cookieName){

if(null==document.cookie||null==cookieName)return null;

var cookies=document.cookie.split(';');

var result=null;

for(var i=0;i<cookies.length;i++){

var c=cookies[i];

var keyValue=c.split('=');

if(-1<keyValue[0].indexOf(cookieName)){

result=unescape(keyValue[1]);

break;

}

}

info("getCookie("+cookieName+"): "+result);

return result;

}



function dbg(str){



}



function info(str){



}



