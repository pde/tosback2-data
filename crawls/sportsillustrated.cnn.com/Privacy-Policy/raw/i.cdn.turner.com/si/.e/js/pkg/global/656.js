
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return!a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS";},searchString:function(data){for(var i=0;i<data.length;i++){var dataString=data[i].string;var dataProp=data[i].prop;this.versionSearchString=data[i].versionSearch||data[i].identity;if(dataString){if(dataString.indexOf(data[i].subString)!=-1)
return data[i].identity;}
else if(dataProp)
return data[i].identity;}},searchVersion:function(dataString){var index=dataString.indexOf(this.versionSearchString);if(index==-1)return;return parseFloat(dataString.substring(index+this.versionSearchString.length+1));},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.userAgent,subString:"iPod",identity:"iPhone/iPod"},{string:navigator.userAgent,subString:"iPad",identity:"iPad"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};BrowserDetect.init();var isIE=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false;var isWin=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:false;var isOpera=(navigator.userAgent.indexOf("Opera")!=-1)?true:false;var flashVersion=0;flashDetect();function flashGetVerIE(){var version=0;var axo;var e;try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");version=axo.GetVariable("$version");}
catch(e){}
if(!version){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");version="WIN 6,0,21,0";axo.AllowScriptAccess="always";version=axo.GetVariable("$version");}
catch(e){}}
if(!version){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");version=axo.GetVariable("$version");}
catch(e){}}
return version;}
function flashGetVer(){var flashVer=-1;if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var swVer2=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";var flashDescription=navigator.plugins["Shockwave Flash"+swVer2].description;var descArray=flashDescription.split(" ");var tempArrayMajor=descArray[2].split(".");var versionMajor=tempArrayMajor[0];var flashVer=versionMajor;}}
else if(isIE&&isWin&&!isOpera){flashVer=flashGetVerIE();}
return flashVer;}
function TryParseInt(str,defaultValue){var retValue=defaultValue;if(str!=null){if(str.length>0){if(!isNaN(str)){retValue=parseInt(str);}}}
return retValue;}
function flashDetect(version){var versionStr=flashGetVer();if(versionStr==-1){return false;}
else if(versionStr!=0){if(isIE&&isWin&&!isOpera){var tempArray=versionStr.split(" ");var tempString=tempArray[1];var versionArray=tempString.split(",");flashVersion=versionArray[0];}else{flashVersion=TryParseInt(versionStr,0);}
if(flashVersion>=version){return true;}
return false;}}
function flashWrite(name,url,width,height,params,flashVars){var flv='';for(var i in flashVars){if(flv!='')flv+='&';flv+=i+'='+flashVars[i];}
var out='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+width+'" height="'+height+'" id="'+name+'">';out+='<param name="movie" value="'+url+'" /><param name="quality" value="high" /><param name="wmode" value="transparent" />';for(var i in params){out+=' <param name="'+i+'" value="'+params[i]+'" />';}
out+='<param name="flashvars" value="'+flv+'" />';out+='<embed src="'+url+'" quality="high" wmode="transparent" width="'+width+'" height="'+height+'" name="'+name+'" ';for(var i in params){out+=' '+i+'="'+params[i]+'" ';}
out+='flashvars="'+flv+'" ';out+='type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';out+='</object>';document.write(out);return out;}
tmp=new Array('toggle','clear','profile','group','groupEnd','time','timeEnd','fatal','trace','traceEnd','error','warn','debug','info','move','resize');var siLog=new Object();for(i=0;i<tmp.length;i++){siLog[tmp[i]]=function(e){};}
if(typeof console!='object'){var console=new Object();for(i=0;i<tmp.length;i++){console[tmp[i]]=function(e){};}}
function $e(id,className,tagName){if(className==null){if(document.getElementById){return document.getElementById(id);}else if(document.all){return document.all[id];}else{return false;}}else{if(tagName==null)tagName='*';var x=$c(className,tagName,document.getElementById(id));if(x){if(x.length>0){return x[0];}}
return false;}}
function $c(className,tagName,node){var classElements=new Array();if(node==null)node=document;if(tagName==null)tagName='*';if(!node.getElementsByTagName)return false;var els=node.getElementsByTagName(tagName);var elsLen=els.length;var pattern=new RegExp('(^|\\s)'+className+'(\\s|$)');for(i=0,j=0;i<elsLen;i++){if(pattern.test(els[i].className)){classElements[j]=els[i];j++;}}
return classElements;}
function cnnInc(file){var host='';if(file.indexOf('http://')==-1){host='http://i.cdn.turner.com/si';}
if(file.indexOf('.css')>0){document.write('<link rel="stylesheet" type="text/css" href="'+host+file+'" media="all" />');}
else{document.write('<scri'+'pt language="JavaScript" src="'+host+file+'"></scr'+'ipt>');}}
function cnnJS(src){siLog.debug('cnnJS: '+src);cnnInc(src);}
function cnnJSrun(js){document.write('<scr'+'ipt type="text/javascript">'+js+'</scr'+'ipt>'+"\n");}
var cnnPage=new Object();cnnPage.url=window.location.href.toString();cnnPage.path=cnnPage.url.replace(/http:\/\/[^\/]*/,'').replace(/[\?\#].*$/,'').replace(/\/[^\/]+\.(html|htm|js|jsp)$/i,'/').replace(/\/$/,'');cnnPage.title=document.title;cnnPage.isHomepage=(cnnPage.path=='/'||cnnPage.path.length=='')?true:false;cnnPage.isStory=(cnnPage.path.match(/^\/20\d\d\/.*\/\d\d\//))?true:false;cnnPage.isVideo=(cnnPage.path.match(/^\/video\/.+\/20\d\d\/\d\d\//))?true:false;cnnPage.isScoreboard=(cnnPage.path.match(/^\/(football|basketball|hockey|baseball).*\/scoreboards/))?true:false;cnnPage.isPhotoGallery=(cnnPage.path.match(/^\/multimedia\/photo_gallery\/\d\d/))?true:false;cnnPage.host=window.location.hostname.toString();cnnPage.isLive=(cnnPage.host.indexOf('cnn.com')>-1)?true:false;cnnPage.debug=(document.cookie.indexOf('siDebug=set')>-1||(getParam('debug')=='y'))?true:false;cnnPage.section='';cnnPage.storySection='';cnnPage.videoSection='';if(cnnPage.isStory){cnnPage.storySection=cnnPage.section=cnnPage.path.match(/^\/20\d\d(\/.*)\/\d\d\/\d\d\//)[1];}
if(cnnPage.isVideo){cnnPage.videoSection=cnnPage.section=cnnPage.path.match(/^(\/video\/.*)\/\d\d\d\d\/\d\d\//)[1];}
function cnnIsScoreboardPage(){return cnnPage.isScoreboard;}
if(cnnPage.debug){cnnJS('/.e/js/4.1/global/lib/log4javascript.js');}
if(!cnnPage.isLive){document.write('<scri'+'pt language="JavaScript" src="/.element/js/4.1/global/omniture.js"></scr'+'ipt>');}
function cnnShow(e){if(e.style)e.style.display="block";}
function cnnHide(e){if(e.style)e.style.display="none";}
function cnnRand(lo,hi){return Math.floor(Math.random()*(hi-lo+1))+lo;}
function getElementsByClass(className,tagName,node){return $c(className,tagName,node);}
function cnnGetObject(id){if($e(id))return $e(id);else return null;}
function cnnIsExternal(link){var url=link;if(link.href){url=link.href;}
if(url.match(/cnn\.com\//i)||url.match(/fannation\.com\//i)||url.match(/golf\.com\//i)||url.match(/sikids\.com\//i)||url.match(/si\.com\//i)||url.match(/turner\.com\:84\//i)){return false;}
else{return true;}}
function cnnIsInternal(link){var url=link;if(link.href){url=link.href;}
if(url.match(/cnn\.com\//i)||url.match(/fannation\.com\//i)||url.match(/golf\.com\//i)||url.match(/sikids\.com\//i)||url.match(/si\.com\//i)||url.match(/turner\.com\:84\//i)){return true;}
else{return false;}}
function cnnAddParam(link,add){if(link.href){if(link.href.toLowerCase().indexOf('javascript')==-1){if(link.href.indexOf(add)>0){return;}
if(link.href.indexOf('?')>0)link.href=link.href+'&'+add;else link.href=link.href+'?'+add;}}else{if(link.href.indexOf(add)>0)return link;if(link.indexOf('?')>0)link=link+'&'+add;else link=link+'?'+add;return link;}}
function getElementByClass(searchClass,tag,node){var x=$c(searchClass,tag,node);if(x){if(x.length>0){return x[0];}}
return false;}
function getParam(name){var regex=new RegExp("[\\?&]"+name+"=*([^&#]*)");var results=regex.exec(window.location.href);if(results==null){return false;}else{return results[1];}}
function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";document.cookie=name+"="+value+expires+"; path=/";}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length).split('&');}
return null;}
function eraseCookie(name){createCookie(name,"",-1);}
function CNN_getCookies(){var hash=new Array;if(document.cookie){var cookies=document.cookie.split('; ');for(var i=0;i<cookies.length;i++){var namevaluePairs=cookies[i].split('=');hash[namevaluePairs[0]]=unescape(namevaluePairs[1])||null;}}
return hash;}
function CNN_parseCookieData(cookieDataString){var cookieValues=new Object();var separatePairs=cookieDataString.split('&');for(var i=0;i<separatePairs.length;i++){var separateValues=separatePairs[i].split(':');cookieValues[separateValues[0]]=separateValues[1]||null;}
return cookieValues;}
function CNN_setCookie(name,value,hours,path,domain,secure){var numHours=0;if(hours){if((typeof(hours)=='string')&&Date.parse(hours)){numHours=hours;}else if(typeof(hours)=='number'){numHours=(new Date((new Date()).getTime()+hours*3600000)).toGMTString();}}
document.cookie=name+'='+escape(value)+((numHours)?(';expires='+numHours):'')+((path)?';path='+path:'')+((domain)?';domain='+domain:'')+((secure&&(secure==true))?'; secure':'');}
function CNN_killCookie(name,path,domain){var allCookies=CNN_getCookies();var theValue=allCookies[name]||null;if(theValue){document.cookie=name+'='+theValue+'; expires=Fri, 13-Apr-1970 00:00:00 GMT'+((path)?';path='+path:'')+((domain)?';domain='+domain:'');}}
function WM_readCookie(name){if(document.cookie==''){return false;}
else{var firstChar,lastChar;var theBigCookie=document.cookie;firstChar=theBigCookie.indexOf(name);var NN2Hack=firstChar+name.length;if((firstChar!=-1)&&(theBigCookie.charAt(NN2Hack)=='=')){firstChar+=name.length+1;lastChar=theBigCookie.indexOf(';',firstChar);if(lastChar==-1)lastChar=theBigCookie.length;return unescape(theBigCookie.substring(firstChar,lastChar));}else{return false;}}}
var allCookies=CNN_getCookies();function cnnToggleSelect(state){var dom=($e)?true:false;var windows=(navigator.userAgent.toLowerCase().indexOf("windows")>-1)?true:false;var ie5=((navigator.userAgent.toLowerCase().indexOf("msie")>-1)&&dom)?true:false;var cnn_selects=document.getElementsByTagName("select");if(windows&&ie5){for(i=0;i<cnn_selects.length;i++){cnn_selects[i].style.visibility=state;}}}
function cnnSubmitSearchSite(input){if(document[input].query.value!="")document[input].submit();}
function CNN_openPopup(url,name,widgets,openerUrl)
{var host=location.hostname;try{window.top.name="opener";}catch(e){}
var popupWin=window.open(url,name,widgets);if(popupWin){cnnHasOpenPopup=1;}
if(popupWin&&popupWin.opener){if(openerUrl)
{popupWin.opener.location=openerUrl;}}
if(popupWin){popupWin.focus();}}
function CNN_launchNFLDotComPlayer(mediaId){CNN_openPopup('http://nfl.cpl.delvenetworks.com/player/si/popup/index.html?mediaId='+mediaId,'liveNFL','toolbar=no,directories=no,location=no,status=no,menubar=no,scrollbars=no,width=850,height=640');}
function cnnVideo(mode,arg,expiration)
{var openURL='/video/player/quickdetect.exclude.html';var cnnVideoArgs='mode='+mode+'&arg='+arg;if(openURL.indexOf('http://')==-1){openURL='http://sportsillustrated.cnn.com/'+openURL;}
CNN_openPopup(openURL+'?'+cnnVideoArgs,'CNNVideoPlayer','scrollbars=no,resizable=no,width=770,height=570');}
function showReply(reply){storeReply(reply);}
var cnnEnableSL=true;function cnnad_createSL(){if(cnnEnableSL){}}
function cnnPageOnload(){}
function cnnStartList(){var toggleCounter=13;for(var x=0;x<=toggleCounter;x++){if($e("cnnDropNav"+x)){navRoot=$e("cnnDropNav"+x).getElementsByTagName("LI");for(i=0;i<navRoot.length;i++){node=navRoot[i];if(node.className=="cnnMenu"){node.onmouseover=function(){this.className='cnnMenuOver';};node.onmouseout=function(){this.className='cnnMenu';};}}}}
var navRoot=$e("cnnBotnav");if(navRoot){for(i=0;i<navRoot.childNodes.length;i++){node=navRoot.childNodes[i];if(node.nodeName=="LI"){node.onmouseover=function(){this.className="cnnOver";};node.onmouseout=function(){this.className="";};}}}
navRoot=$e("cnnCM1");if(navRoot){for(i=0;i<navRoot.childNodes.length;i++){node=navRoot.childNodes[i];if(node.nodeName=="DL"){node.onmouseover=function(){this.className="cnnOver";};node.onmouseout=function(){this.className="";};}}}}
function cnnBrowserFixes(){if(window.cnnPageInfo_pageType=='section'){if(window.devicePixelRatio){document.write('<link rel="stylesheet" type="text/css" href="http://i.cdn.turner.com/si/.element/css/4.1/safari.css"/>');}else if((BrowserDetect.browser=="Firefox")&&(BrowserDetect.version>=3)&&(BrowserDetect.OS=="Mac")){document.write('<link rel="stylesheet" type="text/css" href="http://i.cdn.turner.com/si/.element/css/4.1/mac_ff.css"/>');}else if((BrowserDetect.OS=="Mac")){document.write('<link rel="stylesheet" type="text/css" href="http://i.cdn.turner.com/si/.element/css/4.1/mac.css"/>');}}}
var siCMlinks={"link_id":"cnn_cm_subscribe","init":function(){siLog.info('siCMlinks.init');var cm_id=23;if(cnnPage.isHomepage){cm_id=18;}
if(cnnPage.path.indexOf('/football/nfl/')>=0){cm_id=12;}
if(cnnPage.path.indexOf('/football/ncaa/')>=0){cm_id=13;}
if(cnnPage.path.indexOf('/baseball/mlb/')>=0){cm_id=14;}
if(cnnPage.path.indexOf('/basketball/nba/')>=0){cm_id=15;}
if(cnnPage.path.indexOf('/basketball/ncaa/')>=0){cm_id=16;}
if(cnnPage.path.indexOf('/hockey/nhl/')>=0){cm_id=17;}
this.update(2,'http://subs.timeinc.net/CampaignHandler/si_nb?source_id='+cm_id);},"update":function(id,link,html){var button=$e(this.link_id+id);if(button);else return;if(link){siLog.debug('siCMlinks.update: button '+id+', link='+link);button.href=link;}
if(html){siLog.debug('siCMlinks.update: button '+id+', html='+html);button.innerHTML=html;}}};var siWriters={"isBlank":function(e){if(typeof e=='undefined')return true;if(e)return false;else return true;},"sort_writers":function(a,b){if(a.lname!=''&&b.lname=='')return-1;if(a.lname==''&&b.lname!='')return 1;if(a.lname>b.lname)return 1;if(a.lname<b.lname)return-1;if(a.fname>b.fname)return 1;if(a.fname<b.fname)return-1;if(a.nick>b.nick)return 1;if(a.nick<b.nick)return-1;return 0;},"sort":function(){this.list.sort(this.sort_writers);},"dropdown":function(type,includeNonSI){if(type===null)type=1;this.sort();for(i=0;i<this.list.length;i++){var w=this.list[i];if(!includeNonSI&&!w.si){continue;}
var value='';var text='';if(w.lname&&w.fname)text=w.fname+' '+w.lname;else if(w.lname)text=w.lname;else if(w.nick)text=w.nick;else continue;if(type==1){if(w.archive)value=w.archive;else if(w.path)value='/writers/'+w.path+'/archive/';}else{if(w.path){value=w.path;}
else{continue;}}
document.write('<option value="'+value+'">'+text+'</option>'+"\n");}},"dropdown_si_archives":function(){this.dropdown(1,false);},"dropdown_archives":function(){this.dropdown(1,true);},"dropdown_rss":function(){this.dropdown(2,false);},"end":""};var cnnDocDomain='';if(location.hostname.indexOf('cnn.com')>0){cnnDocDomain='cnn.com';}
if(location.hostname.indexOf('turner.com')>0){if(document.layers){cnnDocDomain='turner.com:'+location.port;}else{cnnDocDomain='turner.com';}}
if(cnnDocDomain&&document.switchDocDomain){document.domain=cnnDocDomain;}

var mysi_ncaaf_team_ids=['air force','airfor','akron','akron','alabama','alabam','arizona','arizon','arizona st','arizst','arkansas','arkans','arkansas st','arkst','army','army','auburn','auburn','ball st','ballst','baylor','baylor','boston coll','bc','bowling green','bgsu','boise st','boise','buffalo','buff','byu','byu','california','calif','cent michigan','centmi','cincinnati','cin','clemson','clemso','colorado','colo','colorado st','colost','duke','duke','east michigan','eastmi','east carolina','ecu','florida atl','flaatl','florida int','flaint','florida st','flast','florida','florid','fresno st','fresno','georgia tech','gatech','georgia','georgi','hawaii','hawaii','houston','houst','idaho','idaho','illinois','illino','indiana','indian','iowa','iowa','iowa st','iowast','kansas','kansas','kent state','kentst','kentucky','kentuc','kansas st','kstate','la tech','latech','louisville','lou','lsu','lsu','marshall','marsh','memphis','memphi','miami','mia_fl','miami-oh','mia_oh','michigan','mich','mid tennessee','middtn','minnesota','minnes','missouri','missou','miss st','missst','maryland','mrylnd','michigan st','msu','navy','navy','nc state','ncstat','nebraska','nebras','nevada','nevada','new mexico','newmex','n illinois','niu','new mexico st','nmst','northwestern','northw','notre dame','notred','north texas','ntexas','ohio','ohio','ohio st','ohiost','oklahoma','okla','oklahoma st','oklast','mississippi','olemis','oregon','oregon','oregon st','oregst','pittsburgh','pitt','penn st','psu','purdue','purdue','rice','rice','rutgers','rutger','san diego st','sdsu','san jose st','sjsu','smu','smu','usf','sofla','s carolina','soucar','southern miss','soumis','stanford','stanfo','syracuse','syracu','tcu','tcu','temple','temple','tennessee','tenn','texas am','texam','texas','texas','toledo','toledo','troy','troy','tulane','tulane','tulsa','tulsa','texas tech','txtech','uab','uab','ucf','ucf','ucla','ucla','connecticut','uconn','ul-lafayette','ul_laf','ul-monroe','ul_mon','unc','unc','unlv','unlv','usc','usc','utah','utah','utah st','utahst','utep','utep','virginia','uva','vanderbilt','vandy','va tech','vatech','wake forest','wakef','washington','wash','washington st','washst','west michigan','westmi','wisconsin','wisc','west virginia','wvu','wyoming','wyomin'];var mysi_ncaab_team_ids=['boston col','bc','clemson','clemso','duke','duke','florida st','flast','georgia tech','gatech','miami-fl','mia_fl','maryland','mrylnd','nc st','ncstat','n carolina','unc','virginia','uva','virginia tech','vatech','wake forest','wakef','albany','albany','binghamton','bing','boston u','bu','hartford','hartfo','maine','maine','stony brook','stnybr','maryland-balt','umbc','new hampshire','unh','vermont','vermon','charlotte','char','dayton','dayton','duquesne','duques','fordham','ford','g washington','geowas','la salle','lasall','richmond','richmo','st bonaven','stbona','st joes-pa','stjo','saint louis','stloui','temple','temple','massachusetts','umass','rhode island','uri','xavier','xavier','belmont','belmnt','campbell','campbe','e tenn st','easttn','gardner-webb','g_webb','jacksonville','jksnvl','kennesaw st','ksawst','lipscomb','lips','mercer','mercer','north florida','nofla','sc upstate','scupst','stetson','stetso','illinois','illino','indiana','indian','iowa','iowa','michigan','mich','minnesota','minnes','michigan st','msu','northwestern','northw','ohio st','ohiost','penn st','psu','purdue','purdue','wisconsin','wisc','baylor','baylor','colorado','colo','iowa state','iowast','kansas','kansas','kansas st','kstate','missouri','missou','nebraska','nebras','oklahoma','okla','oklahoma st','oklast','texas a&m','texam','texas','texas','texas tech','txtech','cincinnati','cin','depaul','depaul','georgetown','gtown','louisville','lou','marquette','marque','notre dame','notred','pittsburgh','pitt','providence','provid','rutgers','rutger','seton hall','setonh','south florida','sofla','st. john\'s','stjohn','syracuse','syracu','connecticut','uconn','villanova','vill','west virginia','wvu','cal poly','calply','uc-riverside','calrv','csu-fullerton','cs_ful','csu-northrdge','cs_nor','long beach st','longbe','pacific','pacifi','uc-irvine','uc_irv','uc-santa barb','uc_sb','e washington','eastwa','idaho st','idast','montana','mont','montana st','montst','northern colo','nco','n arizona','noariz','portland st','portst','sacramento st','sac','weber state','weber','charleston s','chsou','coa carolina','coastc','high point','highpt','liberty','libert','unc-asheville','nc_ash','radford','radfor','va military','vmi','winthrop','winthr','delaware','delawa','drexel','drexel','georgia st','gast','george mason','gmason','hofstra','hofstr','james madison','jmu','unc-wilmingtn','nc_wil','northeastern','northe','old dominion','olddom','towson','towson','va common','vcu','william mary','wilma','east carolina','ecu','houston','houst','marshall','marsh','memphis','memphi','rice','rice','so methodist','smu','southern miss','soumis','tulane','tulane','tulsa','tulsa','uab','uab','ucf','ucf','utep','utep','butler','butler','cleveland st','clevst','detroit','detroi','loyola-il','loy_il','ill-chicago','uic','wis-milwaukee','uw_mil','valparaiso','valpo','wis-green bay','wiscgb','wright state','wright','youngstown st','ysu','uc davis','caldav','chicago st','chist','longwood','longwd','nc central','nccent','njit','njit','presbyterian','presby','savannah st','savan','ut-pan amer','tex_pa','utah valley st','uvsc','win-salem st','w_sal','brown','brown','columbia','colum','cornell','cornel','dartmouth','dart','harvard','harv','pennsylvania','penn','princeton','prince','yale','yale','canisius','canisi','fairfield','fairfi','iona','iona','loyola-md','loy_md','manhattan','manhat','marist','marist','niagara','niagar','rider','rider','siena','siena','st. peter\'s','stpete','beth-cookman','b_c','coppin st','coppin','delaware st','delst','florida a&m','flaam','hampton','hamp','howard','howard','mary-e shore','md_es','morgan st','morgan','nc a&t','ncat','norfolk st','norfol','s carolina st','scst','akron','akron','ball st','ballst','bowling green','bgsu','buffalo','buff','central mich','centmi','e michigan','eastmi','kent st','kentst','miami (oh)','mia_oh','no illinois','niu','ohio','ohio','toledo','toledo','w michigan','westmi','bradley','bradle','creighton','creigh','drake','drake','evansville','evansv','illinois st','illst','indiana st','indst','missouri st','mostu','northern iowa','noiowa','so illinois','siu','wichita st','wichit','air force','airfor','brigham young','byu','colorado st','colost','new mexico','newmex','san diego st','sdsu','tcu','tcu','unlv','unlv','utah','utah','wyoming','wyomin','cent conn st','centct','fairleigh d','fdu','long island','liu','monmouth','monmou','mt st mary\'s','mtstma','quinnipiac','quinni','robert morris','rmorri','sacred heart','sheart','st francis ny','stfrny','st francis pa','stfrpa','wagner','wagner','austin peay','apsu','e illinois','eastil','e kentucky','eastky','jvlle st','jvilst','morehead st','morehe','murray st','murray','samford','samfor','se mo st','semo','tennessee st','tennst','tenn-martin','tn_mar','tenn tech','tntech','arizona','arizon','arizona st','arizst','california','calif','oregon','oregon','oregon st','oregst','stanford','stanfo','ucla','ucla','usc','usc','washington','wash','washington st','washst','american univ','americ','army','army','bucknell','buck','colgate','colgat','holy cross','holycr','lafayette','lafaye','lehigh','lehigh','navy','navy','ark-little r','ark_lr','arkansas st','arkst','denver','denver','fla atlantic','flaatl','florida intnl','flaint','middle tenn','middtn','north texas','ntexas','troy','troy','la-lafayette','ul_laf','la monroe','ul_mon','new orleans','uno','south alabama','usa','w kentucky','westky','alabama','alabam','arkansas','arkans','auburn','auburn','florida','florid','georgia','georgi','kentucky','kentuc','lsu','lsu','miss st','missst','mississippi','olemis','s carolina','soucar','tennessee','tenn','vanderbilt','vandy','central ark','cnak','lamar','lamar','mcneese st','mcnees','nicholls st','nichol','nw st','norwst','sam houston','samhou','se louisiana','sela','sf austin','sfa','tex a&m cc','tamcc','tex-san ant','tex_sa','tex-arlington','tx_arl','texas st','txst','appalchian st','appala','chattanooga','chatta','charleston','chrlst','citadel','citade','davidson','davids','elon','elon','furman','furman','ga southern','geosou','unc-grensboro','nc_gre','w carolina','wcu','wofford','woffor','centenary','centen','ipfw','ipfw','iupui','iupui','n dakota st','ndakst','oakland','oaklan','oral roberts','oralro','s dakota st','sdkst','southern utah','sout','umkc','umkc','w illinois','westil','alabama a&m','alaam','alabama st','alast','alcorn st','alcorn','arkansas-pb','ark_pb','grambling st','grambl','jackson st','jackst','miss val st','missvl','prairie v a&m','pvam','southern univ','southe','tex southern','texsou','boise st','boise','fresno st','fresno','hawaii','hawaii','idaho','idaho','la tech','latech','nevada','nevada','new mexico st','nmst','san jose st','sjsu','utah st','utahst','gonzaga','gonzag','loyola mrymnt','loymnt','pepperdine','pepper','portland','portla','san francisco','sanfr','santa clara','santac','san diego','sdiego','saint mary\'s','stmary'];var mySIcookie=readCookie('mySIcom');var mySITeams=new Array();var mySITeamPages=new Array();mySITeamPages={mlb:'/baseball/mlb/teams/',nfl:'/football/nfl/teams/',nba:'/basketball/nba/teams/',nhl:'/hockey/nhl/teams/',ncaaf:'/football/ncaa/teams/',ncaab:'/basketball/ncaa/men/teams/'}
if(mySIcookie){if(mySIcookie[mySIcookie.length-1]==''){mySIcookie.pop();}
for(var i=0;i<mySIcookie.length;i++){if(mySIcookie[i].indexOf('NHL')>-1){var mySITeam=new Array();mySITeam['sportID']='nhl';mySITeam['team']=mySIcookie[i].replace(/_NHL/,'');mySITeam['teamID']=((mySITeam['team']).toLowerCase()).replace(/\s/g,'_');mySITeam['team_s']='';mySITeams[i]=mySITeam;}
else if(mySIcookie[i].indexOf('NBA')>-1){var mySITeam=new Array();mySITeam['sportID']='nba';mySITeam['team']=mySIcookie[i].replace(/_NBA/,'');mySITeam['teamID']=((mySITeam['team']).toLowerCase()).replace(/\s/g,'_');mySITeam['team_s']='';mySITeams[i]=mySITeam;}
else if(mySIcookie[i].indexOf('NFL')>-1){var mySITeam=new Array();mySITeam['sportID']='nfl';mySITeam['team']=mySIcookie[i].replace(/_NFL/,'');mySITeam['teamID']=((mySITeam['team']).toLowerCase()).replace(/\s/g,'_');mySITeam['team_s']='';mySITeams[i]=mySITeam;}
else if(mySIcookie[i].indexOf('MLB')>-1){var mySITeam=new Array();mySITeam['sportID']='mlb';mySITeam['team']=mySIcookie[i].replace(/_MLB/,'');mySITeam['teamID']=((mySITeam['team']).toLowerCase()).replace(/\s/g,'_');mySITeam['team_s']='';mySITeams[i]=mySITeam;}
else if(mySIcookie[i].indexOf('NCAAF')>-1){var mySITeam=new Array();mySITeam['sportID']='ncaaf';mySITeam['team']=mySIcookie[i].replace(/_NCAAF \(FB\)/,'');for(var entryNo=0;entryNo<mysi_ncaaf_team_ids.length;entryNo+=2){if(mysi_ncaaf_team_ids[entryNo]==(mySITeam['team']).toLowerCase()){mySITeam['teamID']=mysi_ncaaf_team_ids[entryNo+1];}}
mySITeam['teamID']=(mySITeam['teamID']).replace(/\s/g,'_');mySITeam['team_s']=' <span>(FB)</span>';mySITeams[i]=mySITeam;}
else if(mySIcookie[i].indexOf('NCAAB')>-1){var mySITeam=new Array();mySITeam['sportID']='ncaab';mySITeam['team']=mySIcookie[i].replace(/_NCAAB \(BB\)/,'');for(var entryNo=0;entryNo<mysi_ncaab_team_ids.length;entryNo+=2){if(mysi_ncaab_team_ids[entryNo]==(mySITeam['team']).toLowerCase()){mySITeam['teamID']=mysi_ncaab_team_ids[entryNo+1];}}
mySITeam['teamID']=(mySITeam['teamID']).replace(/\s/g,'_');mySITeam['team_s']=' <span>(BB)</span>';mySITeams[i]=mySITeam;}}}
function cnn_writePresonalizeBar(){if(mySITeams.length>0){document.write('<ul><li>');for(var x=0;x<mySITeams.length;x++){document.write(makeMySIBarEntry(mySITeams[x])+'|');}
document.write('<span><a href="/mysi/personalization/">EDIT MY TEAMS</a></span></li></ul>');}else{document.write('<a href="/mysi/personalization/"><img src="http://i.cdn.turner.com/si/.element/img/4.1/global/personalize/mysi_full.png" alt="Personalize SI.com With News and Scores From Your Favorite Pro and College Teams. It\'s Fast and Free!" title="Personalize SI.com With News and Scores From Your Favorite Pro and College Teams. It\'s Fast and Free!"/></a>');}}
function cnn_writePersonalizBarWithSprites(){var pb='';if(mySITeams.length>0){pb+="<span class='mysi_bar_sprite mysi_sprite_shim_med'></span><span class='mysi_bar_sprite mysi_sprite_mysi_logo'></span><span class='mysi_bar_sprite mysi_sprite_shim_small'></span><span class='mysi_bar_sprite mysi_sprite_team_box'><ul><li>";for(var x=0;x<mySITeams.length;x++){pb+=makeMySIBarEntry(mySITeams[x])+'|';}
pb+='<span><a href="/mysi/personalization/">EDIT MY TEAMS</a></span></li></ul>';pb+="</span><span class='mysi_bar_sprite mysi_sprite_shim_med'></span>";}else{pb="<span class='mysi_bar_sprite mysi_sprite_shim_big_l'></span><a href='/mysi/personalization/'><span class='mysi_bar_sprite mysi_sprite_imgtext'></span></a><span class='mysi_bar_sprite mysi_sprite_shim_big_r'></span>";}
document.write(pb);}
function makeMySIBarEntry(team){var retValue='<a href="'+mySITeamPages[team['sportID']]+team['teamID']+'/'+'"><strong>'+team['team']+'</strong>'+team['team_s']+'</a>';return retValue;}
function cnn_writeMySIBar(){if(mySITeams.length>0){document.write('<table border="0" cellpadding="0" cellspacing="0"><tr>');document.write('<td class="col0"><a href="/mysi/personalization/"><img src="http://i.cdn.turner.com/si/.element/img/4.0/global/personalize/myi_logo.gif" alt="mySI" title="mySI"/></a></td>');document.write('<td class="col1"><div><table border="0" cellpadding="0" cellspacing="0"><tr>');for(var x=0;x<mySITeams.length;x++){document.write('<td class="col'+x+'">'+makeMySIBarEntry(mySITeams[x])+'</td>');}
document.write('</tr></table></div></td>');document.write('<td class="col2"><a href="/mysi/personalization/"><img src="http://i.cdn.turner.com/si/.element/img/4.0/global/personalize/mysi_changemyteams.gif" alt="Change My Teams" title="Change My Teams"/></a></td>');document.write('</tr></table>');}else{document.write('<a href="/mysi/personalization/"><img src="http://i.cdn.turner.com/si/.element/img/4.0/global/personalize/personalize_si.gif" alt="Personalize SI.com With Your Favorite Pro and College Teams. It\'s Fast and Free!" title="Personalize SI.com With Your Favorite Pro and College Teams. It\'s Fast and Free!"/></a>');}}
function makeMySIStoryEntry(team){var retValue='<li class="cnn_header"><a href="'+mySITeamPages[team['sportID']]+team['teamID']+'/'+'">'+team['team']+team['team_s']+'</a></li>';var tempHeadlines=mysiHeadlines[team['sportID']];if(tempHeadlines&&tempHeadlines['team_'+team['teamID']]){retValue+='<li>'+tempHeadlines['team_'+team['teamID']]+'</li>';}else{retValue+='<li><a href="'+mySITeamPages[team['sportID']]+team['teamID']+'/'+'">Team Page</a></li>';}
return retValue;}
function cnn_writeMySITopStories(){if(mySITeams.length>0){for(var x=0;x<mySITeams.length;x++){document.write(makeMySIStoryEntry(mySITeams[x]));}}else{document.write('<li><a href="/mysi/personalization/">Select up to six of your favorite teams to get the latest local news from across the web.</a></li>');}}

var rsi_segs=[];var segs_beg=document.cookie.indexOf('rsi_segs=');if(segs_beg>=0){segs_beg=document.cookie.indexOf('=',segs_beg)+1;if(segs_beg>0){var segs_end=document.cookie.indexOf(';',segs_beg);if(segs_end==-1)segs_end=document.cookie.length;rsi_segs=document.cookie.substring(segs_beg,segs_end).split('|');}}
var segLen=20;var segQS="",segArr=new Array();if(rsi_segs.length<segLen){segLen=rsi_segs.length;}
for(var i=0;i<segLen;i++){segArr=rsi_segs[i].split("_");if(segArr.length>1)segQS+=("rsseg"+"="+segArr[1]+";");}
var __pageTimeStamp=new Date().getTime();function cnnad_getPageTimeStamp(){return __pageTimeStamp;}
function cnnad_createRefreshAd(dart_value,parameters,width,height,refresh){return 0;}
function cnnad_createGameflashAd(dart_value,parameters,width,height,multisize,refresh){return 0;}
function cnnad_createGameflashPhotosAd(dart_value,parameters,width,height,multisize,refresh){return 0;}
function cnnad_preamble(){return 0;}
function cnnad_createRefreshAdMultisize(dart_value,parameters,width,height,multisize,refresh){return 0;}
function cnnad_createGameflashPhotosAdMultisize(dart_value,parameters,width,height,multisize,refresh){return 0;}
function cnnad_createAdHTML(dart_value,parameters,width,height,multisize){return 0;}
function cnnad_getDartValue(input){return 0;}
function cnnad_getKeywords(dart_value,input){return 0;}
function cnnad_getPtyp(dart_value,input){return 0;}
function cnnad_getPtypHelper(input,ptyp){return 0;}
function cnnad_isTeamPage(zone){var retValue=false;var teamsIndex=arrayIndexOf("teams",document.cnnAdPathArray);if(teamsIndex>0){if((zone=="football_ncaa")||(zone=="football_nfl")||(zone=="baseball_mlb")||(zone=="basketball_nba")||(zone=="basketball_ncaa")||(zone=="hockey_nhl")){retValue=cnnad_getFile()=="file=index.html;";}}
return retValue;}
function cnnad_isPollPage(){var tempPath=cnnad_getPath();var retValue=false;if(tempPath.indexOf('path=POLLSERVER;')>=0){retValue=true;}
return retValue;}
function cnnad_isSchedulePage(zone){var retValue=false;var teamsIndex=arrayIndexOf("schedules",document.cnnAdPathArray);if(teamsIndex>0){if((zone=="football_ncaa")||(zone=="football_nfl")||(zone=="baseball_mlb")||(zone=="basketball_nba")||(zone=="basketball_ncaa")||(zone=="golf")||(zone=="hockey_nhl")){retValue=cnnad_getFile()=="file=index.html;";}}
return retValue;}
function cnnad_isScoreboardPage(zone){var retValue=false;var teamsIndex=arrayIndexOf("scoreboards",document.cnnAdPathArray);if(teamsIndex>0){if((zone=="football_ncaa")||(zone=="football_nfl")||(zone=="baseball_mlb")||(zone=="basketball_nba")||(zone=="basketball_ncaa")||(zone=="hockey_nhl")){retValue=cnnad_getFile()=="file=index.html;";}}
if((zone=="golf")&&(arrayIndexOf("leaderboards",document.cnnAdPathArray)>0)){retValue=cnnad_getFile()=="file=index.html;";}
return retValue;}
function cnnad_getSlug(input){var retValue="";var adslug_array=input.split(".");for(var x=0;x<adslug_array.length;x++){retValue+='slug='+adslug_array[x]+';';}
return retValue;}
function cnnad_isCMSStory(){var retValue=false;if((document.cnnAdPathArray)[0].match(/^\d{4}/)){retValue=true;}
else if((document.cnnAdPathArray)[0]=="pr"){if(((document.cnnAdPathArray)[1]=="subs")||((document.cnnAdPathArray)[1]=="subs2")){if((document.cnnAdPathArray)[2]=="siexclusive"){retValue=true;}}}
return retValue;}
function cnnad_isWriterPage(){var retValue=false;if((document.cnnAdPathArray)[1]=="writers"){retValue=true;}
else if(((document.cnnAdPathArray)[0]=="writers")&&((document.cnnAdPathArray)[2]=="archive")){retValue=true;}
else if(((document.cnnAdPathArray)[0]=="pr")&&((document.cnnAdPathArray)[4]=="writers")){retValue=true;}
else if((document.cnnAdPathArray)[0]=="si_blogs"){retValue=true;}
else if((document.cnnAdPathArray)[0]=="podcasts"){retValue=true;}
return retValue;}
function cnnad_getWriter(){var retValue="";if((document.cnnAdPathArray)[1]=="writers"){retValue=document.cnnAdPathArray[2];}
else if(((document.cnnAdPathArray)[0]=="writers")&&((document.cnnAdPathArray)[2]=="archive")){retValue=document.cnnAdPathArray[1];}
else if(((document.cnnAdPathArray)[0]=="pr")&&((document.cnnAdPathArray)[4]=="writers")){retValue=document.cnnAdPathArray[5];}
else if(((document.cnnAdPathArray)[0]=="si_blogs")&&((document.cnnAdPathArray)[1]=="riffs_reilly")){retValue="rick_reilly";}
else if(((document.cnnAdPathArray)[0]=="si_blogs")&&((document.cnnAdPathArray)[1]=="ncaa_tourney")){retValue="luke_winn";}
else if(((document.cnnAdPathArray)[0]=="si_blogs")&&((document.cnnAdPathArray)[1]=="basketball")&&((document.cnnAdPathArray)[1]=="ncaa")){retValue="luke_winn";}
else if((document.cnnAdPathArray)[0]=="si_blogs"){retValue=(document.cnnAdPathArray)[1];}
else if((document.cnnAdPathArray)[0]=="podcasts"){retValue=(document.cnnAdPathArray)[1];}
return retValue;}
function cnnad_isBlog(){var retValue=false;if((document.cnnAdPathArray)[0]=="si_blogs"){retValue=true;}
return retValue;}
function cnnad_getPath(){var retValue="";var temp_path="";if((document.location.host).indexOf('secondthought')>-1){temp_path+=document.location.host+"/";}
else if(document.location.host=="games.si.cnn.com"){temp_path+=document.location.host+"/";}
if(document.cnnAdPathArray.length>1){if(document.cnnAdPathArray[0]!="si_adspaces"){temp_path+=document.cnnAdPathArray.slice(0,document.cnnAdPathArray.length-1).join("/");}}
var path_array=temp_path.split("/");for(var x=0;x<path_array.length;x++){retValue+='path='+(path_array[x].replace(/\./g,"_")).replace(/,/g,"_")+';';}
return retValue;}
function cnnad_getFile(){var retValue="";var fileArray=(document.cnnAdPathArray[document.cnnAdPathArray.length-1]).split("#");if(document.cnnAdPathArray[0]!="si_adspaces"){retValue='file='+fileArray[0]+';';}
return retValue.replace(/\./g,"_");}
function arrayIndexOf(searchValue,in_array){var ret_value=-1;for(var x=0;x<in_array.length;x++){if(in_array[x]==searchValue){ret_value=x;}}
return ret_value;}

var cnnad_tileID=cnnad_getID();var cnnad_enabled=true;var cnnad_adIframes=new Array();var cnnad_adVault=new Array();var cnnad_adCache=new Array();var cnnad_interstitialPID=null;var cnnad_interstitialPlaying=false;var cnnad_transactionID=null;document.cnnAdDisplayAds=(document.location.host=='jcmsprod8.turner.com:84')?false:true;var alreadySwappedDETargetImage=false;var cnnDEadDEonCookie=false;var cnnDocDomain=cnnad_getTld(location.hostname);if(cnnDocDomain){document.domain=cnnDocDomain;}
var cnnad_pageMode=1;var cnnad_calledURLs=new Array();var cnnad_successfulSend=0;var cnnad_resultArray=new Array();var cnnad_ADMSizes=new Array();cnnad_ADMSizes=["728x90","300x250","336x280","160x600","336x850","300x600"];function cnnad_setADMSizes(admSizesArray){cnnad_ADMSizes=admSizesArray;}
function cnnad_parseReferrer(url){if(!url){return null;}
var data=url.substring(0,url.indexOf('/',7));if(data.indexOf(':',5)>0)
data=data.substring(0,url.indexOf(':',5));data=data.substring(data.lastIndexOf('/')+1);var datachop=data.split('.');return(datachop[datachop.length-2]+'.'+datachop[datachop.length-1]);}
function cnnad_sendADMData(){var finalExpression="";for(as=0;as<cnnad_ADMSizes.length;as++){var calledURL=cnnad_calledURLs[cnnad_ADMSizes[as]];if(calledURL&&cnnad_successfulSend==0){if(cnnad_pageMode!=3){finalExpression+='<scr'+'ipt> \n ';if(cnnad_pageMode==1){finalExpression+=' A09801.DM_cat("';var site=cnnad_getParamValue(calledURL,"site=","&");var rollup=cnnad_getParamValue(calledURL,"_rollup=","&");var section=cnnad_getParamValue(calledURL,"_section=","&");var subsection=cnnad_getParamValue(calledURL,"_subsection=","&");var referrerTld=cnnad_parseReferrer(document.referrer);finalExpression+=site;if((site!="")&&((rollup!="")||(section!="")||(subsection!=""))){finalExpression+=" > ";}
finalExpression+=rollup;if((rollup!="")&&((section!="")||(subsection!=""))){finalExpression+=" > ";}
finalExpression+=section;if((section!="")&&(subsection!="")){finalExpression+=" > ";}
finalExpression+=subsection;finalExpression+='"); \n ';if(referrerTld)
finalExpression+=' A09801.DM_addEncToLoc("refer", "'+referrerTld+'"); \n ';else
finalExpression+=' A09801.DM_addEncToLoc(); \n ';}
finalExpression+=' A09801.DM_tag(); \n ';finalExpression+='</scr'+'ipt> \n ';document.write(finalExpression);}
cnnad_successfulSend=1;break;}}}
function cnnad_getParamValue(paramString,parameter,endCharacter){if(paramString.match(parameter)){var startOfString=paramString.indexOf(parameter)+parameter.length;var endOfString=paramString.indexOf(endCharacter,startOfString);var parameterValue=paramString.substring(startOfString,endOfString);return parameterValue;}
else{return"";}}
var cnnad_adTileIDGroup=new Array();var cnnad_newTileIDIteration=0;var cnnad_tileExemptions=new Array();function cnnad_addExemptCriteria(){var idx=cnnad_tileExemptions.length;if(arguments.length%2!=0){return;}
cnnad_tileExemptions[idx]=new Array();for(var i=0;i<arguments.length;i+=2){cnnad_tileExemptions[idx][arguments[i]]=arguments[i+1];}}
function cnnad_checkTileExempt(adUrl){var exempt;for(var i=0;i<cnnad_tileExemptions.length;i++){exempt=true;for(adKey in cnnad_tileExemptions[i]){adValue=cnnad_getParamValue(adUrl,adKey+'=','&');if(cnnad_tileExemptions[i][adKey]!=adValue){exempt=false;break;}}
if(exempt){return true;}}
return false;}
function cnnad_newTileIDGroup(newGroupArray){var newTileID=(cnnad_tileID*1+4*(++cnnad_newTileIDIteration));for(var i=0;i<newGroupArray.length;i++){cnnad_adTileIDGroup[cnnad_adTileIDGroup.length]={tileID:newTileID,adName:newGroupArray[i]};}}
function cnnad_getDynamicTileID(adURL){var returnId=cnnad_tileID;if(cnnad_checkTileExempt(adURL)){return returnId;}
if(cnnad_adTileIDGroup.length>0){var ad_position;if(adURL.match("_position=")){ad_position=cnnad_getParamValue(adURL,"_position=","&");}
else if(adURL.match("_pos=")){ad_position=cnnad_getParamValue(adURL,"_pos=","&");}
else{ad_position="";}
for(var i=0;i<cnnad_adTileIDGroup.length;i++){var adName=cnnad_adTileIDGroup[i].adName;if(ad_position==adName){returnId=cnnad_adTileIDGroup[i].tileID;break;}}}
return returnId;}
function cnnad_debug(m)
{if(typeof(console)!='undefined'&&typeof(console.debug)!='undefined')
{console.debug(m);}}
function cnnad_error(m)
{if(typeof(console)!='undefined'&&typeof(console.error)!='undefined')
{console.error(m);}}
function cnnad_reverseString(input)
{input=""+input;var output='';if(input.length)
{var i;for(i=input.length;i>0;i--)
{output+=input.charAt(i-1);}}
return(output);}
function cnnad_getID(){return(cnnad_reverseString(new Date().getTime()));}
function cnnad_renderAd(cnnad_url){if(!document.cnnAdDisplayAds){document.write('<div style="display: block; background: #444; color: #fff; font-size: 10px; text-align: center; ">Ad</div>');return;}
cnnad_url=cnnad_preview(cnnad_url);cnnad_url=cnnad_statusCodeQA(cnnad_url);if(cnnad_enabled==true){document.write("<script type=\"text/javascript\"");document.write(" src=\""+cnnad_url+"&tile="+cnnad_getDynamicTileID(cnnad_url)+"&transactionID="+cnnad_getTransactionID()+"\"></scr");document.write("ipt>");}}
function cnnad_preview(cnnad_adstring){if(location.host.indexOf("turner.com")>-1){cnnad_adstring=cnnad_adstring.replace(new RegExp("ads\..*?\.com","gi"),"ads.turner.com");cnnad_adstring=cnnad_adstring.replace(new RegExp("ads\..*?\.tv","gi"),"ads.turner.com");}
var cnnad_ug=cnnad_readCookie("ug");if(cnnad_ug){cnnad_adstring=cnnad_adstring+"&Params.User.UserID="+cnnad_ug;}else{cnnad_adstring=cnnad_adstring+"&Params.User.UserID=";}
return cnnad_adstring;}
function cnnad_getTransactionID(){if(cnnad_transactionID==null){cnnad_transactionID="";cnnad_transactionID=Math.floor(Math.random()*9007199254740992);}
return cnnad_transactionID;}
function cnnad_isBlocking(id){var blocking=false;if(document.getElementById('ad-'+id)!=null&&document.getElementById('ad-'+id).style.display==='none'){blocking=true;}else if(cnnad_interstitialPlaying===true){blocking=true;}
return blocking;}
function cnnad_createIframe(id,cnnad_url)
{var iframe=document.createElement('iframe');iframe.id=id;iframe.name=id;iframe.width=0;iframe.height=0;iframe.style.position='absolute';iframe.style.top='-20px';iframe.style.left='-20px';iframe.marginWidth=0;iframe.marginHeight=0;iframe.frameBorder=0;iframe.scrolling="no";iframe.allowTransparency='true';iframe.src=cnnad_url;return iframe;}
function cnnad_createAdHelper(adId,cnnad_url,cnnad_height,cnnad_width,target){if(cnnad_isBlocking(adId)){window.setTimeout(function(){cnnad_createAdHelper(adId,cnnad_url,cnnad_height,cnnad_width,target);},1000);}else{if(!document.cnnAdDisplayAds){document.write('<div style="display: block; background: #444; color: #fff; width: '+cnnad_width+'; height: '+cnnad_height+'; font-size: 10px; text-align: center; ">'+cnnad_width+'x'+cnnad_height+' Ad</div>');return;}
var d=document.getElementById('ad-'+adId);if(d){d.appendChild(cnnad_createIframe(adId,cnnad_url));}else{if(!target){document.write('<iframe ALLOWTRANSPARENCY="true" hspace="0" vspace="0" marginHeight="0" marginWidth="0" src="'+cnnad_url+'" border="0" frameBorder="0" height="0" width="0" scrolling="no"  id="'+adId+'" style="position: absolute; top: -20px; left: -20px;" ></iframe>');}else{document.getElementById(target).innerHTML='<iframe ALLOWTRANSPARENCY="true" hspace="0" vspace="0" marginHeight="0" marginWidth="0" src="'+cnnad_url+'" border="0" frameBorder="0" height="0" width="0" scrolling="no"  id="'+adId+'" style="position: absolute; top: -20px; left: -20px;" ></iframe>';}}}}
function cnnad_createAdNoTileId(adId,cnnad_url,cnnad_height,cnnad_width,target){cnnad_url=cnnad_preview(cnnad_url);cnnad_url=cnnad_statusCodeQA(cnnad_url);cnnad_url+="&transactionID="+cnnad_getTransactionID();cnnad_url+='&domId='+adId;cnnad_createAdHelper(adId,cnnad_url,cnnad_height,cnnad_width,target,false);}
function cnnad_createAd(adId,cnnad_url,cnnad_height,cnnad_width,target){cnnad_url=cnnad_preview(cnnad_url);cnnad_url=cnnad_statusCodeQA(cnnad_url);cnnad_url+="&transactionID="+cnnad_getTransactionID();cnnad_url+='&tile='+cnnad_getDynamicTileID(cnnad_url)+'&domId='+adId;cnnad_createAdHelper(adId,cnnad_url,cnnad_height,cnnad_width,target,false);var adSize=new String();if(cnnad_url.match("_position=")){adSize=cnnad_getParamValue(cnnad_url,"_position=","_");}
else if(cnnad_url.match("_pos=")){adSize=cnnad_getParamValue(cnnad_url,"_pos=","_");}
else{adSize="";}
cnnad_calledURLs[adSize]=cnnad_url;}
function cnnad_writeAd(cnnad_callid,cnnad_url){if(cnnad_enabled==true){document.write("<script id=\""+cnnad_callid+"\" type=\"text/javascript\" onload=\"cnnSendData();\"");document.write(" src=\""+cnnad_url+"&tile="+cnnad_getDynamicTileID(cnnad_url)+"\"></scr");document.write("ipt>");}}
function cnnad_showAd(cnnad_id){var e=document.getElementById(cnnad_id);if(e){e.style.position='relative';e.style.left='0px';e.style.top='0px';if(e.style.visibility==='hidden'){e.style.visibility='visible';}
if(e.style.display==='none'){e.style.display='block';}}else{cnnad_error("Could not find element by id: "+cnnad_id);}}
function cnnad_setAdSize(docId,height,width){var i=document.getElementById(docId);if(i){i.height=height;i.width=width;i.className+=' adunit_'+width+'x'+height;}else{cnnad_error("Could not find element by id: "+cnnad_id);}}
function cnnad_readCookie(name){if(document.cookie==''){return null;}else{var ca=document.cookie.split(';');var nameEQ=name+"=";for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}}
function cnnad_getTld(hostname)
{var data=hostname.split(".");if(data.length>=2){return(data[data.length-2]+"."+data[data.length-1]);}
return(null);}
function cnnad_refreshAds(type){if(!cnnad_adIframes){return;}
for(var i=0;i<cnnad_adIframes.length;i++){var targetAd=cnnad_adIframes[i];var newAdLoc=cnnad_findAd(type,targetAd.getWidth(),targetAd.getHeight());cnnad_swapAd(targetAd.getId(),newAdLoc);}}
function cnnad_swapAd(id,newAdLoc)
{var elem=document.getElementById(id);if(elem)
{elem.width=0;elem.height=0;elem.style.display='none';if(cnnad_adCache[newAdLoc])
{for(var j=0;j<window.frames.length;j++){try{if(window.frames[j].location.href.indexOf('domId='+id)>-1){window.frames[j].location.replace(cnnad_adCache[newAdLoc]);}}catch(e){}}
return;}
if((typeof Ajax!='undefined')&&(typeof Ajax.Request!='undefined'))
{var temp=new Ajax.Request(newAdLoc,{method:'get',onSuccess:function(req){var newLoc=cnnad_parseResponse(req.responseText,id);newLoc=cnnad_preview(newLoc);newLoc=cnnad_statusCodeQA(newLoc);newLoc+="&transactionID="+cnnad_getTransactionID();if(newLoc)
{cnnad_adCache[newAdLoc]=newLoc;for(var j=0;j<window.frames.length;j++){try{if(window.frames[j].location.href.indexOf('domId='+id)>-1){window.frames[j].location.replace(newLoc);}}catch(e){}}
return;}}});}
else if(typeof dojo!='undefined')
{if(typeof dojo.io=='undefined')
{dojo.require("dojo.io.*");}
dojo.io.bind({url:newAdLoc,load:function(type,data,evt){var newLoc=cnnad_parseResponse(data,id);newLoc=cnnad_preview(newLoc);newLoc=cnnad_statusCodeQA(newLoc);newLoc+="&transactionID="+cnnad_getTransactionID();if(newLoc)
{cnnad_adCache[newAdLoc]=newLoc;elem.src=newLoc;}}});}
else
{}}}
function cnnad_parseResponse(resp,id)
{var startMarker="<!-- CALLOUT|";var endMarker="|CALLOUT -->";var start=resp.indexOf(startMarker);var end=resp.indexOf(endMarker);var loc=null;if(start>=0&&end>start)
{loc=resp.substring(start+startMarker.length,end);}
if(loc)
{return(loc+"&tile="+cnnad_getDynamicTileID(loc)+"&domId="+id);}
else
{return null;}}
function cnnad_findAd(type,width,height)
{var ret=null;for(var i=0;i<cnnad_adVault.length;i++)
{var ad=cnnad_adVault[i];if(ad.getType()==type&&ad.getHeight()==height&&ad.getWidth()==width)
{ret=ad.getUrl();break;}}
return ret;}
function cnnad_getDEAdHeadCookie(imageRef){if(typeof(cnnad_readCookie)!="undefined"){cnnDEadDEonCookie=cnnad_readCookie('adDEon');}
var newSrc="http://gdyn."+cnnad_getTld(location.hostname)+"/1.1/1.gif?"+new Date().getTime();if(!alreadySwappedDETargetImage&&!cnnDEadDEonCookie){imageRef.src=newSrc;alreadySwappedDETargetImage=true;}}
function cnnad_registerAd(type,width,height,url)
{var ad=new cnnad_AdObject(null,width,height,type,url);cnnad_adVault[cnnad_adVault.length]=ad;}
function cnnad_registerSpace(id,width,height)
{var ad=new cnnad_AdObject(id,width,height,null,null);cnnad_adIframes[cnnad_adIframes.length]=ad;}
function cnnad_endInterstitial(adId)
{var adNode=document.getElementById('interstitial'+adId);if(adNode&&adNode.parentNode)
{adNode.parentNode.removeChild(adNode);}
var styleNode=document.getElementById('interstitialcss'+adId);if(styleNode&&styleNode.parentNode)
{styleNode.parentNode.removeChild(styleNode);}
if(typeof(document.createStyleSheet)!='undefined')
{var cssNode=document.createStyleSheet();cssNode.addRule('table','{display:inline}');}
cnnad_interstitialPlaying=false;}
function cnnad_startInterstitial(adId,cnnad_url,timeout)
{cnnad_interstitialPlaying=true;var adUrl=cnnad_url+'&tile='+cnnad_getDynamicTileID(cnnad_url)+'&domId='+adId;document.write('<div id="interstitial'+adId+'" class="interstitial" align="center"><iframe ALLOWTRANSPARENCY="true" hspace="0" vspace="0" marginHeight="0" marginWidth="0" src="'+adUrl+'" border="0" frameBorder="0" height="0" width="0" scrolling="no" id="'+adId+'"></iframe></div>');if(!timeout){timeout=1500;}
cnnad_interstitialPID=window.setTimeout('cnnad_endInterstitial("'+adId+'");',timeout);}
function cnnad_resetInterstitial(adId,timeout)
{cnnad_interstitialPlaying=true;var elem=document.getElementById(adId);if(null!=elem&&elem.height>20&&elem.width>20)
{if(cnnad_interstitialPID)
{window.clearTimeout(cnnad_interstitialPID);}
if(!timeout){timeout=15000;}
cnnad_interstitialPID=window.setTimeout('cnnad_endInterstitial("'+adId+'");',timeout);}}
function cnnad_getUrlParam(name)
{name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(window.location.href);if(results==null)
return"";else
return results[1];}
function cnnad_statusCodeQA(cnnad_adstring)
{var qaparam=cnnad_getUrlParam("adsqa");if(qaparam){cnnad_adstring=cnnad_adstring+"&"+qaparam.replace("%3D","=");}
return cnnad_adstring;}
function cnnad_updateIframeSource(id,cnnad_url){cnnad_url=cnnad_preview(cnnad_url);cnnad_url=cnnad_statusCodeQA(cnnad_url);cnnad_url+="&transactionID="+cnnad_getTransactionID();document.getElementById(id).contentWindow.location.replace(cnnad_url+'&tile='+cnnad_tileID+'&domId='+id);}
function cnnad_showAdByKey(adKey,iframeId){cnnad_swapAd(iframeId,cnnad_adUrls[adKey]);}
function cnnad_haveCookie(name){return cnnad_readCookie(name);}
function cnnad_ugsync(){if(!cnnad_haveCookie('ugs')){document.write('<scr'+'ipt src="http://www.ugdt'+'urner.com/xd.sjs"></scr'+'ipt>');}}
function cnnad_AdObject(id,width,height,type,url)
{this.id=id;this.width=width;this.height=height;this.type=type;this.url=url;this.getId=function(){return this.id;};this.setId=function(id){this.id=id;};this.getWidth=function(){return this.width;};this.setWidth=function(width){this.width=width;};this.getHeight=function(){return this.height;};this.setHeight=function(height){this.height=height;};this.getType=function(){return this.type;};this.setType=function(type){this.type=type;};this.getUrl=function(){return this.url;};this.setUrl=function(url){this.url=url;};this.toString=function(){return"[AD|ID="+this.id+"|WIDTH="+this.width+"|HEIGHT="+this.height+"]";};}

var cnn_omnitureData=new Array();cnn_omnitureData={path:null,server:null,section:null,pageType:null,branding:null,date:null,slug:null,file:null,referrer:null,redirect:null,pageName:null}
var sectionNameError="unknown section";var eventNameError="unknown event";var videoNameError="unknown video";cnn_omnitureData['server']=window.location.host;cnn_omnitureData['path']=(location.pathname).replace(/http:\/\/([^\/]+)/,"");cnn_omnitureData['path']=(cnn_omnitureData['path']).replace(/\/\//,"/");if(cnn_omnitureData['path'].charAt(cnn_omnitureData['path'].length-1)=="/")cnn_omnitureData['path']+="index.html";if(queryString('eref')!="false"){cnn_omnitureData['referrer']="from ";switch(queryString('eref')){case"facebookapp":cnn_omnitureData['referrer']+="Facebook App";break;case"FromFacebookShare":cnn_omnitureData['referrer']+="Facebook";break;case"google_phpm":cnn_omnitureData['referrer']+="Google";break;case"siwriters_yahoo":cnn_omnitureData['referrer']+="Yahoo";break;case"aolSports":cnn_omnitureData['referrer']+="AOL";break;case"aolSearch":cnn_omnitureData['referrer']+="AOL Search";break;case"yahoo":cnn_omnitureData['referrer']+="Yahoo";break;case"fromFront_yahoo":cnn_omnitureData['referrer']+="Yahoo Front";break;case"fromFront_yahooRss":cnn_omnitureData['referrer']+="Yahoo Front RSS";break;case"cnn":cnn_omnitureData['referrer']+="CNN";break;case"tnt":cnn_omnitureData['referrer']+="TNT Overtime";break;default:cnn_omnitureData['referrer']+=queryString('eref');break;}
if(queryString('xid')!="false"){cnn_omnitureData['referrer']+=", xid "+queryString('xid');}
cnn_omnitureData['referrer']+=" - "+cnn_omnitureData['path'];}else if(queryString('xid')!="false"){cnn_omnitureData['referrer']="xid "+queryString('xid')+" - "+cnn_omnitureData['path'];}
if(queryString('cnn')!="false"){cnn_omnitureData['referrer']="from ";switch(queryString('cnn')){case"yes":cnn_omnitureData['referrer']+="CNN";break;default:cnn_omnitureData['referrer']+="unknown";break;}
cnn_omnitureData['referrer']+=" - "+cnn_omnitureData['path'];}
if(queryString('bcnn')!="false"){cnn_omnitureData['referrer']="from ";switch(queryString('bcnn')){case"yes":cnn_omnitureData['referrer']+="CNN-B";break;default:cnn_omnitureData['referrer']+="unknown";break;}
cnn_omnitureData['referrer']+=" - "+cnn_omnitureData['path'];}
var cnn_pathname=window.location.pathname;cnn_pathname=(cnn_pathname).replace(/\/\//,"/");if(cnn_pathname.charAt(cnn_pathname.length-1)=="/")cnn_pathname+="index.html";var path_array=(cnn_pathname.substr(1)).split("/");if(window.location.host=="games.si.cnn.com"){setGamesHostname();}
else if(window.location.host=="dynamic.si.cnn.com"){setDynamicHostname();}
else if(window.location.host=="sports.si.cnn.com"){setSportsHostname();}
else if((window.location.host).indexOf("secondthought.com")>0){setSecondThoughtHostname();}
else if(path_array[0]=="index.html"){setFronts("Home");}
else if(document.URL=="http://sportsillustrated.cnn.com"){setFronts("Home");}
else if((path_array[0]).match(/^\d{4}/)){setCMSStory();}
else if(path_array[0]=="preview"){setCMSStory();}
else if((path_array[0]=="multimedia")&&(path_array[1]=="photo_gallery")){cnn_omnitureData['path']=cnn_omnitureData['path'].split("?")[0];path_array=(cnn_omnitureData['path'].substr(1)).split("/");setPhotoGallery()}
else if((path_array[0]=="si_online")&&(path_array[1]=="covers")){setGeneric("SI Covers","SI Covers - Cover");}
else if(path_array[0]=="si_blogs"){setBlogs();}
else if(path_array[0]=="writers"){setWriters();}
else if(path_array[0]=="writers_daily"){setWriters();}
else if(path_array[0]=="podcasts"){setPodcasts();}
else if(path_array[0]=="specials"){setSpecials();}
else if(path_array[0]=="advertisers"){setAdvertiser("None","N/A")}
else if(path_array[0]=="goodsports"){setAdvertiser("Goodsports","N/A")}
else if(path_array[0]=="sichampion"){setAdvertiser("SI Champions",path_array[1])}
else if(isPremium()){setCMSStory();}
else if((path_array[0]=="swimsuit")&&(path_array[1]=="collection")){setSwimsuitCollection();}
else if(path_array.length>1){if(((path_array[path_array.length-2]).match(/^\d{4}/))&&elementExist(path_array,"specials")){if(cnn_omnitureData['path'].indexOf("/magazine/specials/sportsman/archive/")==0){setSpecialStories(getSectionName("magazine"),"Archive  "+getEventName("sportsman"));}
else{var event_year=path_array[path_array.length-2];var section=(path_array.slice(0,arrayIndexOf("specials",path_array))).join("/");var event_id=(path_array.slice(arrayIndexOf("specials",path_array)+1,path_array.length-2)).join("/");setSpecialFronts(getSectionName(section),event_year+" "+getEventName(event_id));}}
else{var section=getSectionName(cnn_pathname.substr(1,cnn_pathname.length-12));if(section!=sectionNameError){setFronts(section);}
else{if(cnn_omnitureData['path'].indexOf("/magazine/specials/sportsman/archive/")==0){setSpecialStories(getSectionName("magazine"),"Archive  "+getEventName("sportsman"));}
else if(cnn_omnitureData['path'].indexOf("/fantasy/")==0){setOther("Fantasy");if(cnn_omnitureData['path'].indexOf("/fantasy/football/nfl/player_projections/")==0){cnn_omnitureData['pageType']=cnn_omnitureData['section']+" NFL Player Projections";cnn_omnitureData['pageName']=cnn_omnitureData['section']+" NFL Player Projections - "+cnn_omnitureData['path'].replace('/fantasy/football/nfl/player_projections/','');}}
if((cnn_omnitureData['path'].indexOf("/baseball/mlb/scoreboards/")==0)&&(cnn_omnitureData['path'].indexOf("viewcast")>-1)){setViewcast("MLB");}
else if(cnn_omnitureData['path'].indexOf("/baseball/mlb/scoreboards/")==0){setScores("MLB");}
else if(cnn_omnitureData['path'].indexOf("/baseball/mlb/gameflash/")==0){setGameFlash("MLB");}
else if(cnn_omnitureData['path'].indexOf("/baseball/mlb/viewcast/")==0){setGameFlash("MLB");}
else if(cnn_omnitureData['path'].indexOf("/baseball/mlb/teams/")==0){setTeams("MLB");}
else if(cnn_omnitureData['path'].indexOf("/baseball/mlb/")==0){setOther("MLB");}
else if((cnn_omnitureData['path'].indexOf("/basketball/nba/scoreboards/")==0)&&(cnn_omnitureData['path'].indexOf("viewcast")>-1)){setViewcast("NBA");}
else if(cnn_omnitureData['path'].indexOf("/basketball/nba/scoreboards/")==0){setScores("NBA");}
else if(cnn_omnitureData['path'].indexOf("/basketball/nba/gameflash/")==0){setGameFlash("NBA");}
else if(cnn_omnitureData['path'].indexOf("/basketball/nba/viewcast/")==0){setGameFlash("NBA");}
else if(cnn_omnitureData['path'].indexOf("/basketball/nba/teams/")==0){setTeams("NBA");}
else if((cnn_omnitureData['path'].indexOf("/basketball/nba/")==0)&&(cnn_omnitureData['path'].indexOf("/tracker/")>0)){setTracker();}
else if(cnn_omnitureData['path'].indexOf("/basketball/nba/")==0){setOther("NBA");}
else if((cnn_omnitureData['path'].indexOf("/football/ncaa/scoreboards/")==0)&&(cnn_omnitureData['path'].indexOf("viewcast")>-1)){setViewcast("NCAAF");}
else if(cnn_omnitureData['path'].indexOf("/football/ncaa/scoreboards/")==0){setScores("NCAAF");}
else if(cnn_omnitureData['path'].indexOf("/football/ncaa/gameflash/")==0){setGameFlash("NCAAF");}
else if(cnn_omnitureData['path'].indexOf("/football/ncaa/viewcast/")==0){setGameFlash("NCAAF");}
else if(cnn_omnitureData['path'].indexOf("/football/ncaa/teams/")==0){setTeams("NCAAF");}
else if((cnn_omnitureData['path'].indexOf("/football/ncaa/")==0)&&(elementExist(path_array,"heisman"))){setSpecialFronts(getSectionName("football/ncaa"),path_array[4]+" "+getEventName(path_array[3])+" "+path_array[5]);}
else if((cnn_omnitureData['path'].indexOf("/football/ncaa/")==0)&&(elementExist(path_array,"rivalries"))){setSpecialFronts(getSectionName("football/ncaa"),path_array[4]+" "+getEventName(path_array[3])+" "+path_array[5]);}
else if(cnn_omnitureData['path'].indexOf("/football/ncaa/")==0){setOther("NCAAF");}
else if((cnn_omnitureData['path'].indexOf("/hockey/nhl/scoreboards/")==0)&&(cnn_omnitureData['path'].indexOf("viewcast")>-1)){setViewcast("NHL");}
else if(cnn_omnitureData['path'].indexOf("/hockey/nhl/scoreboards/")==0){setScores("NHL");}
else if(cnn_omnitureData['path'].indexOf("/hockey/nhl/gameflash/")==0){setGameFlash("NHL");}
else if(cnn_omnitureData['path'].indexOf("/hockey/nhl/viewcast/")==0){setGameFlash("NHL");}
else if(cnn_omnitureData['path'].indexOf("/hockey/nhl/teams/")==0){setTeams("NHL");}
else if(cnn_omnitureData['path'].indexOf("/hockey/nhl/")==0){setOther("NHL");}
else if((cnn_omnitureData['path'].indexOf("/basketball/ncaa/men/scoreboards/")==0)&&(cnn_omnitureData['path'].indexOf("viewcast")>-1)){setViewcast("NCAAB");}
else if(cnn_omnitureData['path'].indexOf("/basketball/ncaa/men/scoreboards/")==0){setScores("NCAAB");}
else if(cnn_omnitureData['path'].indexOf("/basketball/ncaa/men/gameflash/")==0){setGameFlash("NCAAB");}
else if(cnn_omnitureData['path'].indexOf("/basketball/ncaa/men/viewcast/")==0){setGameFlash("NCAAB");}
else if(cnn_omnitureData['path'].indexOf("/basketball/ncaa/men/teams/")==0){setTeams("NCAAB");}
else if(cnn_omnitureData['path'].indexOf("/basketball/ncaa/mens-tournament/")==0){setSpecialFronts("NCAAB","NCAA Tourney");}
else if(cnn_omnitureData['path'].indexOf("/basketball/ncaa/womens-tournament/")==0){setSpecialFronts("NCAAB","NCAA Tourney");}
else if(cnn_omnitureData['path'].indexOf("/basketball/ncaa/")==0){setOther("NCAAB");}
else if((cnn_omnitureData['path'].indexOf("/basketball/")==0)&&(cnn_omnitureData['path'].indexOf("/draft/")>0)){setSpecialStories(getSectionName("basketball/nba"),cnn_pathname.substr(12,4)+" "+getEventName("draft"));}
else if((cnn_omnitureData['path'].indexOf("/football/nfl/scoreboards/")==0)&&(cnn_omnitureData['path'].indexOf("viewcast")>-1)){setViewcast("NFL");}
else if(cnn_omnitureData['path'].indexOf("/football/nfl/scoreboards/")==0){setScores("NFL");}
else if(cnn_omnitureData['path'].indexOf("/football/nfl/gameflash/")==0){setGameFlash("NFL");}
else if(cnn_omnitureData['path'].indexOf("/football/nfl/viewcast/")==0){setGameFlash("NFL");}
else if(cnn_omnitureData['path'].indexOf("/football/nfl/teams/")==0){setTeams("NFL");}
else if(cnn_omnitureData['path'].indexOf("/football/nfl/super-bowl/")==0){setSpecialFronts("NFL","Playoffs");}
else if(cnn_omnitureData['path'].indexOf("/football/nfl/draft-2009/")==0){setSpecialFronts("NFL","Draft");}
else if(cnn_omnitureData['path'].indexOf("/football/nfl/draft-2010/")==0){setSpecialFronts("NFL","Draft");}
else if(cnn_omnitureData['path'].indexOf("/football/nfl/")==0){setOther("NFL");}
else if((cnn_omnitureData['path'].indexOf("/football/")==0)&&(cnn_omnitureData['path'].indexOf("/draft/")>0)){if(cnn_omnitureData['path'].indexOf("/tracker/")>-1){setSpecialStories(getSectionName("football/nfl"),cnn_pathname.substr(10,4)+" "+getEventName("draft")+" Tracker");}else{setSpecialStories(getSectionName("football/nfl"),cnn_pathname.substr(10,4)+" "+getEventName("draft"));}}
else if((cnn_omnitureData['path'].indexOf("/golf/pga/")==0)&&(cnn_omnitureData['path'].indexOf("/leaderboards/")>0)){setScores("Golf");}
else if(cnn_omnitureData['path'].indexOf("/golf/pga/")==0){setOther("Golf");}
else if((cnn_omnitureData['path'].indexOf("/golf/ega/")==0)&&(cnn_omnitureData['path'].indexOf("/leaderboards/")>0)){setScores("Golf");}
else if(cnn_omnitureData['path'].indexOf("/golf/ega/")==0){setOther("Golf");}
else if((cnn_omnitureData['path'].indexOf("/golf/sga/")==0)&&(cnn_omnitureData['path'].indexOf("/leaderboards/")>0)){setScores("Golf");}
else if(cnn_omnitureData['path'].indexOf("/golf/sga/")==0){setOther("Golf");}
else if((cnn_omnitureData['path'].indexOf("/golf/lpga/")==0)&&(cnn_omnitureData['path'].indexOf("/leaderboards/")>0)){setScores("Golf");}
else if(cnn_omnitureData['path'].indexOf("/golf/lpga/")==0){setOther("Golf");}
else if((cnn_omnitureData['path'].indexOf("/golf/nationwide/")==0)&&(cnn_omnitureData['path'].indexOf("/leaderboards/")>0)){setScores("Golf");}
else if(cnn_omnitureData['path'].indexOf("/golf/nationwide/")==0){setOther("Golf");}
else if(cnn_omnitureData['path'].indexOf("/golf/players/")==0){setOther("Golf");}
else if(cnn_omnitureData['path'].indexOf("/golf/instruction/")==0){setStories("GolfOnline");}
else if((cnn_omnitureData['path'].indexOf("/golf/")==0)&&(cnn_omnitureData['path'].indexOf("/players/")>0)){setOther("Golf");}
else if(cnn_omnitureData['path'].indexOf("/soccer/worldcup/")==0){setWorldCup(path_array[2]);}
else if(cnn_omnitureData['path'].indexOf("/video/")==0){setVideo();}
else if(cnn_omnitureData['path'].indexOf("/olympics/2006/")==0){setOlympics("2006");}
else if(cnn_omnitureData['path'].indexOf("/olympics/2008/photos/wires/")==0){cnn_omnitureData['section']="2008 Olympics";cnn_omnitureData['pageType']=cnn_omnitureData['section']+" "+path_array[4];cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" "+path_array[5];cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=cnn_omnitureData['branding']+" - "+path_array[6];}
else if(cnn_omnitureData['path'].indexOf("/more/specials/fortunate50/")==0){cnn_omnitureData['section']=getSectionName("more");cnn_omnitureData['pageType']=getSectionName("more")+" Fortunate 50";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" - "+path_array[path_array.length-1];}}}}
function setOlympics(year){cnn_omnitureData['section']=year+" Olympics ";cnn_omnitureData['pageType']=cnn_omnitureData['section']+" "+path_array[2];cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";if(path_array[3]=="index.html"){setFronts(cnn_omnitureData['section']);}else{var fileName="";switch(path_array[2]){case"bios":fileName=(path_array[3]).replace(".html","");break;case"boxscores":fileName=(path_array[4]).replace(".html","");break;case"explainers":fileName=(path_array[3]).replace(".html","");break;case"medals":cnn_omnitureData['pageType']+=" "+path_array[3];fileName=(path_array[4]).replace(".html","");break;case"news":fileName=(path_array[3]);break;case"photos":fileName=(path_array[3]).replace(".html","");break;case"previews":fileName=(path_array[3]);break;case"results":fileName=(path_array[3]).replace(".html","");break;case"schedules":if(path_array[3]=="index.html"){fileName="index";}
else{cnn_omnitureData['pageType']+=" "+path_array[3];fileName=(path_array[4]).replace(".html","");}
break;case"sports":if(path_array[3]=="index.html"){fileName="index";}
else{cnn_omnitureData['pageType']+=" "+path_array[3];fileName=(path_array[4]).replace(".html","");}
break;case"wires":fileName=(path_array[3]).replace(".html","");break;case"writers":fileName=(path_array[3]).replace(".html","");break;default:break;}
cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" "+fileName;}}
function setTracker(){if(cnn_omnitureData['path'].indexOf("/basketball/nba/")==0){cnn_omnitureData['section']="NBA "+path_array[2]+" "+getEventName(path_array[3]);}
else if(cnn_omnitureData['path'].indexOf("/football/nfl/")==0){cnn_omnitureData['section']="NFL "+path_array[2]+" "+getEventName(path_array[3]);}
cnn_omnitureData['pageType']=cnn_omnitureData['section']+" Tracker";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=cnn_omnitureData['pageType'];}
function setWorldCup(year){cnn_omnitureData['section']="World Cup "+year;cnn_omnitureData['pageType']=cnn_omnitureData['section'];cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=cnn_omnitureData['section'];if(cnn_omnitureData['path'].indexOf("/boxscores/")>0){cnn_omnitureData['pageType']+=" Box Scores";cnn_omnitureData['pageName']+=(document.title).replace(/SI(.+) - /," Box Score - ");}
else if(cnn_omnitureData['path'].indexOf("/matchcast/")>0){cnn_omnitureData['pageType']+=" Matchcast";if(cnn_omnitureData['path'].indexOf("teams")>0){cnn_omnitureData['pageName']+=(document.title).replace(/ Matchcast (.+)/," Teams").replace(/SI(.+) - /," Matchcast - ");}else{cnn_omnitureData['pageName']+=(document.title).replace(" Matchcast","").replace(/SI(.+) - /," Matchcast - ");}}
else if(cnn_omnitureData['path'].indexOf("/playbyplay/")>0){cnn_omnitureData['pageType']+=" Play by Play";cnn_omnitureData['pageName']+=(document.title).replace(/SI(.+) - /," Play by Play - ");}
else if(cnn_omnitureData['path'].indexOf("/players/")>0){cnn_omnitureData['pageType']+=" Players";cnn_omnitureData['pageName']+=(document.title).replace("Player Page","").replace(/SI(.+) - /," Player - ");}
else if(cnn_omnitureData['path'].indexOf("/previews/")>0){cnn_omnitureData['pageType']+=" Preview";cnn_omnitureData['pageName']+=" Preview";}
else if(cnn_omnitureData['path'].indexOf("/recaps/")>0){cnn_omnitureData['pageType']+=" Recap";cnn_omnitureData['pageName']+=" Recap";}
else if(cnn_omnitureData['path'].indexOf("/schedules/")>0){cnn_omnitureData['pageType']+=" Schedules";cnn_omnitureData['pageName']+=" Schedules";}
else if(cnn_omnitureData['path'].indexOf("/scoreboards/")>0){setScores(cnn_omnitureData['section'])
if(cnn_omnitureData['path']!="/soccer/worldcup/"+year+"/scoreboards/today/index.html"){cnn_omnitureData['pageName']+=(document.title).replace(/SI(.+) - /," - ");}}
else if(cnn_omnitureData['path'].indexOf("/standings/")>0){cnn_omnitureData['pageType']+=" Standings";cnn_omnitureData['pageName']+=" Standings";}
else if(cnn_omnitureData['path'].indexOf("/stats/")>0){cnn_omnitureData['pageType']+=" Stats";if(cnn_omnitureData['path']=="/soccer/worldcup/"+year+"/stats/index.html"){cnn_omnitureData['pageName']+=" Stats";}else{cnn_omnitureData['pageName']+=(document.title).replace(" Page","").replace(/SI(.+) - /," Stats - ");}}
else if(cnn_omnitureData['path'].indexOf("/teams/")>0){if(cnn_omnitureData['path']=="/soccer/worldcup/"+year+"/teams/index.html"){cnn_omnitureData['pageType']+=" Teams";cnn_omnitureData['pageName']+=" Teams";}else if(cnn_omnitureData['path'].indexOf("index.html")>0){cnn_omnitureData['pageType']+=" Teams";cnn_omnitureData['pageName']+=(document.title).replace(/ Team (.+)/,"").replace(/SI(.+) - /," Teams - ");}else if(cnn_omnitureData['path'].indexOf("schedule.html")>0){cnn_omnitureData['pageType']+=" Schedules";cnn_omnitureData['pageName']+=(document.title).replace(/ Schedule (.+)/,"").replace(/SI(.+) - /," Schedule - ");}else if(cnn_omnitureData['path'].indexOf("roster.html")>0){cnn_omnitureData['pageType']+=" Roster";cnn_omnitureData['pageName']+=(document.title).replace(/ Roster(.+)/,"").replace(/SI(.+) - /," Roster - ");}}
else{setOther(cnn_omnitureData['section']);}}
function setGamesHostname(){switch(path_array[0]){case"baseball":setFantasyGames("Baseball Commissioner");break;case"bbsal":setFantasyGames("Baseball Salary Cap");break;case"fbpick":setFantasyGames("Beat The Experts");break;case"football":setFantasyGames("Football Commissioner");break;case"fbsal":setFantasyGames("Football Salary Cap");break;case"cfbpick":setFantasyGames("College Football Pickoff");break;case"bowlpick":setFantasyGames("College Bowl Pickoff");break;case"madness":setFantasyGames("Hoops Bracket Challenge");break;default:setGeneric("Fantasy Games","Fantasy Games - unknown");break;}}
function setSecondThoughHostname(){var server_array=(cnn_omnitureData['server'].substr(1)).split(".");setAdvertiser("Second Thought - "+server_array[0],"N/A")}
function setDynamicHostname(){if(path_array[0]=="covers"){setGeneric("SI Covers","SI Covers - Cover");}else{setGeneric("Dynamic","Dynamic - unknown");}}
function setSportsHostname(){if(queryString('page').indexOf("auto")>-1){if(queryString('page').indexOf("WINNERS")>-1){setScores("Racing");}
else{setOther("Racing");}}else if(queryString('page').indexOf("bask-w")>-1){if(queryString('page').indexOf("scores")>-1){setScores("WNBA");}
else{setOther("WNBA");}}else if(queryString('page').indexOf("boxing")>-1){if(queryString('page').indexOf("champions")>-1){setScores("Boxing");}
else{setOther("Boxing");}}else if(queryString('page').indexOf("cbase")>-1){if(queryString('page').indexOf("scores")>-1){setScores("Baseball");}
else{setOther("Baseball");}}else if(queryString('page').indexOf("cbask-w")>-1){if(queryString('page').indexOf("scores")>-1){setScores("NCAAB");}
else{setOther("NCAAB");}}else if(queryString('page').indexOf("drf")>-1){if(queryString('page').indexOf("leaders")>-1){setScores("Horse Racing");}
if(queryString('page').indexOf("LEADERS")>-1){setScores("Horse Racing");}
else{setOther("Horse Racing");}}else if(queryString('page').indexOf("formula")>-1){if(queryString('page').indexOf("WINNERS")>-1){setScores("Racing");}
else{setOther("Racing");}}else if(queryString('page').indexOf("golf")>-1){if(queryString('page').indexOf("scores")>-1){setScores("Golf");}
else{setOther("Golf");}}else if(queryString('page').indexOf("horse")>-1){if(queryString('page').indexOf("leaders")>-1){setScores("Horse Racing");}
if(queryString('page').indexOf("LEADERS")>-1){setScores("Horse Racing");}
else{setOther("Horse Racing");}}else if(queryString('page').indexOf("milb")>-1){if(queryString('page').indexOf("scores")>-1){setScores("Baseball");}
else{setOther("Baseball");}}else if(queryString('page').indexOf("minorbase")>-1){if(queryString('page').indexOf("scores")>-1){setScores("Baseball");}
else{setOther("Baseball");}}else if(queryString('page').indexOf("nascar")>-1){if(queryString('page').indexOf("WINNERS")>-1){setScores("Racing");}
else{setOther("Racing");}}else if(queryString('page').indexOf("soc-")>-1){if(queryString('page').indexOf("scores")>-1){setScores("Soccer");}
else{setOther("Soccer");}}else if(queryString('page').indexOf("tennis")>-1){if(queryString('page').indexOf("scores")>-1){setScores("Tennis");}
else{setOther("Tennis");}}else if(queryString('page').indexOf("wbc")>-1){if(queryString('page').indexOf("scores")>-1){setScores("Baseball");}
else{setOther("Baseball");}}else{setOther("TSN");}}
function setUnknown(section,pageType,pageName,branding,date,slug,file){cnn_omnitureData['section']=section;cnn_omnitureData['pageType']=pageType;cnn_omnitureData['branding']=branding;cnn_omnitureData['date']=date;cnn_omnitureData['slug']=slug;cnn_omnitureData['file']=file;cnn_omnitureData['pageName']=pageName;}
function setGeneric(section,pageName){cnn_omnitureData['section']=section;cnn_omnitureData['pageType']=pageName;cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=pageName;}
function setGenericBranding(section,pageName){cnn_omnitureData['section']=section;cnn_omnitureData['pageType']=pageName;cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=pageName;}
function setAdvertiser(campaign,branding){cnn_omnitureData['section']="Advertiser";cnn_omnitureData['pageType']=cnn_omnitureData['section']+" "+campaign;cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" "+branding;}
function setRedirects(campaign){cnn_omnitureData['section']="Redirects";cnn_omnitureData['pageType']=cnn_omnitureData['section']+" "+campaign;cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=cnn_omnitureData['pageType'];}
function setOther(section){cnn_omnitureData['section']=section;cnn_omnitureData['pageType']=section+" Other";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=section+" Other";}
function setTeams(section){cnn_omnitureData['section']=section;cnn_omnitureData['pageType']=section+" Teams";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";if(section=="NCAAB"){cnn_omnitureData['pageName']=section+" Teams - "+path_array[4];}else{cnn_omnitureData['pageName']=section+" Teams - "+path_array[3];}}
function setScores(section){cnn_omnitureData['section']=section;cnn_omnitureData['pageType']=section+" Scores";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=section+" Scores";}
function setViewcast(section){cnn_omnitureData['section']=section;cnn_omnitureData['pageType']=section+" Viewcast";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=section+" Viewcast";}
function setGameFlash(section){cnn_omnitureData['section']=section;cnn_omnitureData['pageType']=section+" Game Flash";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=section+" Game Flash";}
function setFronts(section){cnn_omnitureData['section']=section;cnn_omnitureData['pageType']=section+" Front";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=section+" Front";}
function setSpecialFronts(base,section){cnn_omnitureData['section']=base;cnn_omnitureData['pageType']=base+" "+section+" Front";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=base+" "+section+" Front";}
function setBlogs(){cnn_omnitureData['section']="SI Blogs";cnn_omnitureData['pageType']=cnn_omnitureData['section']+" Other";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=cnn_omnitureData['section']+path_array[1]+path_array[2];}
function setWriters(){cnn_omnitureData['section']="SI Writers";if(path_array[0]=="writers_daily"){cnn_omnitureData['pageType']="SI Writers - Daily Analysis";cnn_omnitureData['branding']="N\A";cnn_omnitureData['date']="N\A";cnn_omnitureData['slug']="N\A";cnn_omnitureData['file']="N\A";cnn_omnitureData['pageName']=cnn_omnitureData['pageType'];}else if((path_array[0]).match(/^\d{4}/)){cnn_omnitureData['pageType']="SI Writers - "+upper(path_array[2].replace(/_/g," "));cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - default";cnn_omnitureData['date']=getStoryDate();cnn_omnitureData['slug']=path_array[path_array.length-2];cnn_omnitureData['file']=path_array[path_array.length-1];cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" - "+cnn_omnitureData['date']+" - "+cnn_omnitureData['slug']+" - "+cnn_omnitureData['file'];}else{cnn_omnitureData['pageType']="SI Writers - "+upper(path_array[1].replace(/_/," "));cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - default";cnn_omnitureData['date']="N\A";cnn_omnitureData['slug']="N\A";cnn_omnitureData['file']="N\A";cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" - Archive";}}
function setPodcasts(){cnn_omnitureData['section']="SI Podcasts";cnn_omnitureData['pageType']="SI Podcasts - "+upper(path_array[1].replace(/_/," "));cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - default";cnn_omnitureData['date']="N\A";cnn_omnitureData['slug']="N\A";cnn_omnitureData['file']="N\A";cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" - "+path_array[2];}
function setSpecials(){cnn_omnitureData['section']="SI Specials";cnn_omnitureData['pageType']="SI Specials - "+upper(path_array[1].replace(/_/," "));cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - "+path_array[2];cnn_omnitureData['date']="N\A";cnn_omnitureData['slug']="N\A";cnn_omnitureData['file']="N\A";cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" - "+path_array[3];}
function setWritersBranding(branding){if((path_array[0]).match(/^\d{4}/)){cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - "+branding;}else{cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - "+branding;}}
function setSCWriters(){cnn_omnitureData['section']="Scorecard Writers";if((path_array[0]).match(/^\d{4}/)){cnn_omnitureData['pageType']="Scorecard Writers - "+upper(path_array[2].replace(/_/," "));cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - default";cnn_omnitureData['date']=getStoryDate();cnn_omnitureData['slug']=path_array[path_array.length-2];cnn_omnitureData['file']=path_array[path_array.length-1];cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" - "+cnn_omnitureData['date']+" - "+cnn_omnitureData['slug']+" - "+cnn_omnitureData['file'];}else{cnn_omnitureData['pageType']="Scorecard Writers - "+upper(path_array[1].replace(/_/," "));cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - default";cnn_omnitureData['date']="N\A";cnn_omnitureData['slug']="N\A";cnn_omnitureData['file']="N\A";cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" - Archive";}}
function setSCWritersBranding(branding){cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - "+branding;}
function setEMWriters(){cnn_omnitureData['section']="Extra Mustard Writers";if((path_array[0]).match(/^\d{4}/)){cnn_omnitureData['pageType']="Extra Mustard Writers - "+upper(path_array[2].replace(/_/," "));cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - default";cnn_omnitureData['date']=getStoryDate();cnn_omnitureData['slug']=path_array[path_array.length-2];cnn_omnitureData['file']=path_array[path_array.length-1];cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" - "+cnn_omnitureData['date']+" - "+cnn_omnitureData['slug']+" - "+cnn_omnitureData['file'];}else{cnn_omnitureData['pageType']="Scorecard Writers - "+upper(path_array[1].replace(/_/," "));cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - default";cnn_omnitureData['date']="N\A";cnn_omnitureData['slug']="N\A";cnn_omnitureData['file']="N\A";cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" - Archive";}}
function setEMWritersBranding(branding){cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - "+branding;}
function setFantasyGames(input){cnn_omnitureData['section']="Fantasy Games";cnn_omnitureData['pageType']=cnn_omnitureData['section']+" - "+input;cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']=cnn_omnitureData['pageType'];}
function setSpecialStories(base,section){cnn_omnitureData['section']=base;cnn_omnitureData['pageType']=base+" "+section;cnn_omnitureData['date']=getStoryDate();cnn_omnitureData['slug']=path_array[path_array.length-2];cnn_omnitureData['file']=path_array[path_array.length-1];cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - default";cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" - "+cnn_omnitureData['date']+" - "+cnn_omnitureData['slug']+" - "+cnn_omnitureData['file'];}
function setStories(section){cnn_omnitureData['section']=section;cnn_omnitureData['pageType']=section+" News";cnn_omnitureData['date']=getStoryDate();cnn_omnitureData['slug']=path_array[path_array.length-2];cnn_omnitureData['file']=path_array[path_array.length-1];if(cnn_omnitureData['section']=="SI Preview"){cnn_omnitureData['file']=cnn_omnitureData['file'].substr(0,cnn_omnitureData['file'].indexOf("?url"));if(cnn_omnitureData['file']=='')cnn_omnitureData['file']="index.html";}
cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - default";cnn_omnitureData['pageName']=cnn_omnitureData['pageType']+" - "+cnn_omnitureData['date']+" - "+cnn_omnitureData['slug']+" - "+cnn_omnitureData['file'];}
function setSpecialStoriesBranding(branding){cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - "+branding;cnn_omnitureData['pageName']=cnn_omnitureData['branding']+" - "+cnn_omnitureData['date']+" - "+cnn_omnitureData['slug']+" - "+cnn_omnitureData['file'];}
function setStoriesBranding(branding){cnn_omnitureData['branding']=cnn_omnitureData['pageType']+" - "+branding;cnn_omnitureData['pageName']=cnn_omnitureData['branding']+" - "+cnn_omnitureData['date']+" - "+cnn_omnitureData['slug']+" - "+cnn_omnitureData['file'];}
function setPhotoGallery(){if(path_array[2]=="index.html"){setFronts("SI Photos");}else{cnn_omnitureData['section']="SI Photos";if(typeof(cnnOmnitureGallery)!="undefined"){cnn_omnitureData['section']+=" - "+cnnOmnitureGallery;}
cnn_omnitureData['date']=path_array[2];cnn_omnitureData['slug']=path_array[3];cnn_omnitureData['file']=path_array[4];cnn_omnitureData['pageType']="SI Photos - ";cnn_omnitureData['pageName']="SI Photos - ";if(typeof(cnnOmnitureGallery)!="undefined"){cnn_omnitureData['pageType']+=cnnOmnitureGallery+" - ";}
if(typeof(cnnOmnitureGallery)!="undefined"){cnn_omnitureData['pageName']+=cnnOmnitureGallery+" - ";}
cnn_omnitureData['pageType']+=cnn_omnitureData['date']+" - "+cnn_omnitureData['slug'];cnn_omnitureData['pageName']+=cnn_omnitureData['date']+" - "+cnn_omnitureData['slug']+" - "+cnn_omnitureData['file'];cnn_omnitureData['branding']=cnn_omnitureData['section']+" - "+path_array[2]+"/"+path_array[3];}}
function setSwimsuitCollection(){if(path_array[2]=="index.html"){setFronts("Swimsuit Collection");}else if(path_array[2]=="issues"){if(path_array[4]=="index.html"){cnn_omnitureData['section']="Swimsuit Collection";cnn_omnitureData['pageType']="Swimsuit Collection - "+path_array[3]+" Issue Index";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']="Swimsuit Collection - "+path_array[3]+" Issue Index";}else{cnn_omnitureData['section']="Swimsuit Collection";cnn_omnitureData['pageType']="Swimsuit Collection - "+path_array[3]+" "+path_array[4].substring(path_array[4].indexOf("_")+1,path_array[4].indexOf("_",5))+" image";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']="Swimsuit Collection - "+path_array[4].substring(path_array[4].indexOf("_")+1,path_array[4].indexOf(".html"))+" in "+path_array[3]+" issue";}}else if(path_array[2]=="video"){if(path_array[3]=="index.html"){cnn_omnitureData['section']="Swimsuit Collection";cnn_omnitureData['pageType']="Swimsuit Collection - Video Index";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']="Swimsuit Collection - Video Index";}else if(path_array[4]=="index.html"){cnn_omnitureData['section']="Swimsuit Collection";cnn_omnitureData['pageType']="Swimsuit Collection - "+path_array[3]+" Video Index";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']="Swimsuit Collection - "+path_array[3]+" Video Index";}else if(path_array[3]=="clips"){cnn_omnitureData['section']="Swimsuit Collection";cnn_omnitureData['pageType']="Swimsuit Collection - old video";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']="Swimsuit Collection - "+path_array[4].substring(0,path_array[4].indexOf(".html"))+" in old video";}else{cnn_omnitureData['section']="Swimsuit Collection";cnn_omnitureData['pageType']="Swimsuit Collection - "+path_array[3]+" "+path_array[4].substring(path_array[4].indexOf("_")+1,path_array[4].indexOf("_",5))+" video";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']="Swimsuit Collection - "+path_array[4].substring(path_array[4].indexOf("_")+1,path_array[4].indexOf(".html"))+" in "+path_array[3]+" video";}}else if(path_array[2]=="vr"){if(path_array[3]=="index.html"){cnn_omnitureData['section']="Swimsuit Collection";cnn_omnitureData['pageType']="Swimsuit Collection - VR Index";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']="Swimsuit Collection - VR Index";}else if(path_array[4]=="index.html"){cnn_omnitureData['section']="Swimsuit Collection";cnn_omnitureData['pageType']="Swimsuit Collection - "+path_array[3]+" VR Index";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']="Swimsuit Collection - "+path_array[3]+" VR Index";}else{cnn_omnitureData['section']="Swimsuit Collection";cnn_omnitureData['pageType']="Swimsuit Collection - "+path_array[3]+" "+path_array[4].substring(path_array[4].indexOf("_")+1,path_array[4].indexOf("_",5))+" vr";cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']="Swimsuit Collection - "+path_array[4].substring(path_array[4].indexOf("_")+1,path_array[4].indexOf(".html"))+" in "+path_array[3]+" vr";}}else{cnn_omnitureData['section']="Swimsuit Collection";cnn_omnitureData['pageType']="Swimsuit Collection - "+path_array[2];cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['file']="N/A";cnn_omnitureData['pageName']="Swimsuit Collection - "+path_array[2]+" "+path_array[3].substring(0,path_array[3].indexOf(".html"));}}
function setCMSStory(){if(elementExist(path_array,"specials")){var event_year=path_array[arrayIndexOf("specials",path_array)+2];var section=path_array.slice(1,arrayIndexOf("specials",path_array)).join("/");var event_id=path_array[arrayIndexOf("specials",path_array)+1];setSpecialStories(getSectionName(section),event_year+" "+getEventName(event_id));}
else if(path_array[3]=="draft-2009"){setSpecialStories("NFL","2009 Draft");}
else if(path_array[3]=="draft-2010"){setSpecialStories("NFL","2010 Draft");}
else if(path_array[3]=="super-bowl"){setSpecialStories("NFL","Playoffs");}
else if(path_array[3]=="mens-tournament"){setSpecialStories("NCAAB","NCAA Tourney");}
else if(path_array[3]=="womens-tournament"){setSpecialStories("NCAAB","NCAA Tourney");}
else if(path_array[0]=="pr"){setStories("SI Extra");}
else if(path_array[0]=="preview"){setStories("SI Preview");}
else if(path_array[1]=="olympics"){setStories("Olympics "+path_array[2]);}
else if(path_array[1]=="writers"){setWriters();}
else if(path_array[1]=="video"){setVideo();}
else if(getStoryDate().indexOf('evergreen')==5){setStories(getSectionName(path_array.slice(1,path_array.length-2).join("/")));}
else{setStories(getSectionName(path_array.slice(1,path_array.length-4).join("/")));}}
function setVideo(){cnn_omnitureData['section']="SI Video";if((path_array[1]=='')||(path_array[1]=='index.html')){setFronts("SI Video");}else if(path_array[1]=='live'){cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['pageType']="SI Video - "+path_array[2]+" Live";cnn_omnitureData['pageName']=cnn_omnitureData['pageType'];}else if(path_array.length==3||path_array[1]=="mostpopular"){var archive_type="";switch(path_array[2]){case"by_week":archive_type="Most Popular - By Week";break;case"by_month":archive_type="Most Popular - By Month";break;case"":archive_type=path_array[1]+" - Archive";break;default:archive_type=path_array[1]+" - Archive";break;}
cnn_omnitureData['date']="N/A";cnn_omnitureData['slug']="N/A";cnn_omnitureData['pageType']="SI Video - "+archive_type;cnn_omnitureData['pageName']=cnn_omnitureData['pageType'];}else{cnn_omnitureData['date']=path_array[2]+"/"+path_array[3]+"/"+path_array[4];cnn_omnitureData['slug']=path_array[path_array.length-1];cnn_omnitureData['pageType']="SI Video - "+path_array[5].slice(7,-18);cnn_omnitureData['pageName']="SI Video - "+cnn_omnitureData['date']+" - "+path_array[5].slice(7,-18)+" - "+cnn_omnitureData['slug'];}}
function getStoryDate(){var returnString="";var year=0;if(path_array[0]=="pr"){year=path_array[3];}
if(path_array[0]=="preview"){year=path_array[2];}
else if(path_array[0]=="video"){year=path_array[2];}
else{year=path_array[0];}
var month=-1;var day=-1;var x=1;var date="";while(x<path_array.length){if((path_array[x]).match(/^\d{2}/)&&!(path_array[x]).match(/^\d{4}/)){month=path_array[x];day=path_array[x+1];break;}
x++;}
if(month>0){returnString=year+"/"+month+"/"+day;}else{returnString=year+" evergreen";}
return returnString;}
function getSectionName(input){var ret_value=sectionNameError;switch(input){case"about_us":ret_value="Other";break;case"baseball/mlb":ret_value="MLB";break;case"baseball/mlb/wires":ret_value="MLB";break;case"baseball/more":ret_value="Baseball";break;case"basketball/more":ret_value="Basketball";break;case"basketball/nba":ret_value="NBA";break;case"basketball/nba/wires":ret_value="NBA";break;case"basketball/ncaa":ret_value="NCAAB";break;case"basketball/ncaa/mens-tournament":ret_value="NCAAB";break;case"basketball/ncaa/wires":ret_value="NCAAB";break;case"basketball/ncaa/women":ret_value="NCAAB";break;case"basketball/ncaa/women/wires":ret_value="NCAAB";break;case"basketball/ncaa/womens-tournament":ret_value="NCAAB";break;case"basketball/wnba":ret_value="NBA";break;case"bowling/wires":ret_value="More Sports";break;case"boxing/wires":ret_value="More Sports";break;case"cricket/wires":ret_value="More Sports";break;case"cycling/wires":ret_value="More Sports";break;case"extramustard":ret_value="Extra Mustard";break;case"extramustard/hotclicks":ret_value="Extra Mustard";break;case"fantasy":ret_value="Fantasy";break;case"football/more":ret_value="Football";break;case"football/ncaa":ret_value="NCAAF";break;case"football/ncaa/wires":ret_value="NCAAF";break;case"football/nfl":ret_value="NFL";break;case"football/nfl/draft-2009":ret_value="NFL";break;case"football/nfl/draft-2010":ret_value="NFL";break;case"football/nfl/super-bowl":ret_value="NFL";break;case"football/nfl/wires":ret_value="NFL";break;case"golf":ret_value="Golf";break;case"golf/wires":ret_value="Golf";break;case"gymnastics/wires":ret_value="More Sports";break;case"highschool":ret_value="High School";break;case"hockey/more":ret_value="Hockey";break;case"hockey/nhl":ret_value="NHL";break;case"hockey/nhl/wires":ret_value="NHL";break;case"horse_racing/wires":ret_value="More Sports";break;case"instruction":ret_value="GolfOnline";break;case"magazine":ret_value="SI Extra";break;case"mma":ret_value="MMA";break;case"mma/boxing":ret_value="MMA";break;case"morning-jolt":ret_value="More Sports";break;case"more":ret_value="More Sports";break;case"more/wires":ret_value="More Sports";break;case"olympics":ret_value="Olympics";break;case"olympics/wires":ret_value="Olympics";break;case"players":ret_value="SI Players";break;case"racing":ret_value="NASCAR";break;case"racing/more":ret_value="Racing";break;case"racing/wires":ret_value="NASCAR";break;case"rugby/wires":ret_value="More Sports";break;case"scorecard":ret_value="Scorecard";break;case"scoreboards":ret_value="Scoreboards";break;case"sioncampus":ret_value="SI On Campus";break;case"sitemap":ret_value="Site Map";break;case"soccer":ret_value="Soccer";break;case"soccer/wires":ret_value="Soccer";break;case"specials":ret_value="Specials";break;case"tennis":ret_value="Tennis";break;case"tennis/wires":ret_value="Tennis";break;case"track_field/wires":ret_value="More Sports";break;case"winter_sports/wires":ret_value="More Sports";break;default:break;}
return ret_value;}
function getEventName(input){var ret_value=input;switch(input){case"all_star":ret_value="All Star";break;case"australian_open":ret_value="Australian Open";break;case"bowls":ret_value="Bowls";break;case"brickyard_400":ret_value="Brickyard 400";break;case"british_open":ret_value="British Open";break;case"daytona500":ret_value="Daytona500";break;case"draft":ret_value="Draft";break;case"french_open":ret_value="French Open";break;case"heisman":ret_value="Heisman";break;case"masters":ret_value="Masters";break;case"ncaa_tourney":ret_value="NCAA Tourney";break;case"pga_championship":ret_value="PGA Championship";break;case"playoffs":ret_value="Playoffs";break;case"player_of_the_year":ret_value="Player of the Year";break;case"postseason":ret_value="Postseason";break;case"presidents_cup":ret_value="President's Cup";break;case"preview":ret_value="Preview";break;case"ryder_cup":ret_value="Ryder Cup";break;case"sports_year":ret_value="Year in Sports";break;case"sportsman":ret_value="Sportsman";break;case"spring_training":ret_value="Spring Training";break;case"tiger":ret_value="Tiger";break;case"tour_de_france":ret_value="Tour de France";break;case"us_open":ret_value="US Open";break;case"wimbledon":ret_value="Wimbledon";break;case"womens_worldcup":ret_value="Women's Worldcup";break;case"world_cup":ret_value="World Cup";break;default:break;}
return ret_value;}
function getVideoName(input){var ret_value=videoNameError;switch(input){case"hbo_costas":ret_value="Costas Now";break;case"hoop_thoughts":ret_value="Hoop Thoughts";break;case"josh_elliott":ret_value="Josh Elliott";break;case"kings_corner":ret_value="King's Corner";break;case"nba_tnt":ret_value="Inside the NBA";break;case"ncaaf_video":ret_value="College Football";break;case"peter_king":ret_value="Kings Corner";break;case"seth_davis":ret_value="Hoop Thoughs";break;case"si_video":ret_value="SI Video";break;case"tom_verducci":ret_value="Tom Verducci";break;case"warner.bros":ret_value="Warner Brothers";break;default:break;}
return ret_value;}
function pageQuery(q){if(q.length>1)this.q=q.substring(1,q.length);else this.q=null;this.keyValuePairs=new Array();if(q){for(var i=0;i<this.q.split("&").length;i++){this.keyValuePairs[i]=this.q.split("&")[i];}}
this.getKeyValuePairs=function(){return this.keyValuePairs;}
this.getValue=function(s){for(var j=0;j<this.keyValuePairs.length;j++){if(this.keyValuePairs[j].split("=")[0]==s)
return this.keyValuePairs[j].split("=")[1];}
return false;}
this.getParameters=function(){var a=new Array(this.getLength());for(var j=0;j<this.keyValuePairs.length;j++){a[j]=this.keyValuePairs[j].split("=")[0];}
return a;}
this.getLength=function(){return this.keyValuePairs.length;}}
function queryString(key){var page=new pageQuery(window.location.search);return unescape(page.getValue(key));}
function elementExist(in_array,in_string){var ret_value=false;for(var x=0;x<in_array.length;x++){if(in_array[x]==in_string){ret_value=true;}}
return ret_value;}
function isPremium(){var ret_value=false;if(path_array[0]=="pr"){if((path_array[1]=="subs")||(path_array[1]=="subs2")){if(path_array[2]=="siexclusive"){ret_value=true;}}}
return ret_value;}
function upper(phrase){phrase=phrase.split(' ')
for(i=0;i<phrase.length;i++){phrase[i]=phrase[i].replace(/^(.)/,phrase[i].charAt(0).toUpperCase())}
return phrase.join(' ');}
function arrayIndexOf(searchValue,in_array){var ret_value=-1;for(var x=0;x<in_array.length;x++){if(in_array[x]==searchValue){ret_value=x;}}
return ret_value;}
function writeData(){document.write('<table border="0" cellpadding="0" cellspacing="0">');document.write('<tr><td>path:</td><td>'+cnn_omnitureData['path']+'</td></tr>');document.write('<tr><td>server:</td><td>'+cnn_omnitureData['server']+'</td></tr>');document.write('<tr><td>section:</td><td>'+cnn_omnitureData['section']+'</td></tr>');document.write('<tr><td>pageType:</td><td>'+cnn_omnitureData['pageType']+'</td></tr>');document.write('<tr><td>branding:</td><td>'+cnn_omnitureData['branding']+'</td></tr>');document.write('<tr><td>date:</td><td>'+cnn_omnitureData['date']+'</td></tr>');document.write('<tr><td>slug:</td><td>'+cnn_omnitureData['slug']+'</td></tr>');document.write('<tr><td>file:</td><td>'+cnn_omnitureData['file']+'</td></tr>');document.write('<tr><td>referrer:</td><td>'+cnn_omnitureData['referrer']+'</td></tr>');document.write('<tr><td>pageName:</td><td>'+cnn_omnitureData['pageName']+'</td></tr>');document.write('</table>');}
function cnnOmniture_writeData(){if(allCookies['cnnad_omniture']=="set"){document.write('<table border="0" cellpadding="0" cellspacing="0" style="background-color:#007;border:1px solid #666;color:#fff;font-size:10px;">');document.write('<tr><td colspan="2" style="background-color:#fff;color:#007;font-size:10px;font-weight:bold;text-align:center;">Omniture Data</td></tr>');for(eachOmnitureData in cnn_omnitureData){document.write('<tr><td>'+eachOmnitureData+':</td><td>'+cnn_omnitureData[eachOmnitureData]+'</td></tr>');}
document.write('</table>');}}
function getData(){var ret_value="";ret_value+='<table border="0" cellpadding="0" cellspacing="0">';ret_value+='<tr><td>path:</td><td>'+cnn_omnitureData['path']+'</td></tr>';ret_value+='<tr><td>server:</td><td>'+cnn_omnitureData['server']+'</td></tr>';ret_value+='<tr><td>section:</td><td>'+cnn_omnitureData['section']+'</td></tr>';ret_value+='<tr><td>pageType:</td><td>'+cnn_omnitureData['pageType']+'</td></tr>';ret_value+='<tr><td>branding:</td><td>'+cnn_omnitureData['branding']+'</td></tr>';ret_value+='<tr><td>date:</td><td>'+cnn_omnitureData['date']+'</td></tr>';ret_value+='<tr><td>slug:</td><td>'+cnn_omnitureData['slug']+'</td></tr>';ret_value+='<tr><td>file:</td><td>'+cnn_omnitureData['file']+'</td></tr>';ret_value+='<tr><td>referrer:</td><td>'+cnn_omnitureData['referrer']+'</td></tr>';ret_value+='<tr><td>pageName:</td><td>'+cnn_omnitureData['pageName']+'</td></tr>';ret_value+='</table>';return ret_value;}
function cnn_omniSearch(searchStr){if((typeof(searchStr)=='string')&&(searchStr!='')){var s=s_gi(s_account);s.linkTrackVars='events,eVar19';s.linkTrackEvents='event22';s.events='event22';s.eVar19=searchStr.toLowerCase();linkName='Search Performed';s.tl(this,'o',linkName);s.linkTrackVars=s.linkTrackEvents='None';s.eVar19=s.events='';}}
function omniExitLink(url){if((typeof(url)!='string')||(typeof(s_account)!='string'))return false;var s_time=s_gi(s_account);s_time.linkTrackVars=s_time.linkTrackEvents='None';s_time.tl(this,'e',url);}

var siSurvey={showFlash:function(){siLog.debug('siSurvery.showFlash: cookie='+cookie);var cookie=readCookie("userChoice");if(cookie!=null)return;if(!$e("survey")){siLog.debug('siSurvery.showFlash: render id:survey');var survey=document.createElement('div');survey.id='survey';survey.innerHTML='<div id="survey_swf"></div>'+"\n"+'<div id="surveyHomeText" class="surveyHomeText" style="visibility: visible !important">'+"\n"+'<form><input id="radioanswer1" type="radio" name="survey" onclick="javascript:siSurvey.storeReply(\'Yes\');">'+"\n"+'<span style="font-size: 11pt;"><b>YES, I WILL TAKE THE SURVEY</b></span><br><br>'+"\n"+'<input id="radioanswer2" type="radio" name="survey" onclick="javascript:siSurvey.storeReply(\'Maybe\');"> MAYBE LATER<br><br>'+"\n"+'<input id="radioanswer3" type="radio" name="survey" onclick="javascript:siSurvey.storeReply(\'No\');"> NO THANKS </form>'+"\n"+'</div>';var body=document.getElementsByTagName("body").item(0);body.appendChild(survey);swfobject.embedSWF("http://i.cdn.turner.com/si/.e/swf/4.0/sect/global/surveyHome.swf","survey_swf","300","250","9.0.115","expressInstall.swf",1,{quality:'high',bgcolor:'#000000',allowFullScreen:'true',allowScriptAccess:'always',wmode:'transparent'});}
$e("survey").style.display="block";},showSurveyHtml:function(){siLog.info('siSurvery.showSurveyHtml');$e('surveyHomeText').style.visibility='visible';},runPopup:function(){var rand=Math.ceil(Math.random()*400);siLog.debug('siSurvery.runPopup: rand='+rand+', '+((rand<399)?'hide':'display'));if(rand<399){return 1;}
var cookie=readCookie("userChoice");siLog.debug('siSurvery.runPopup: cookie='+cookie);if(cnnPage.isHomepage){if($e("surveyHome")&&cookie!==null){$e("hide300x250").style.display="block";}else if($e("surveyHome")&&cookie===null){$e("surveyHome").style.display="block";$e("hide300x250").style.display="none";setTimeout("siSurvey.showSurveyHtml()",2000);}}else{setTimeout("siSurvey.showFlash()",7000);}},storeReply:function(reply){if(reply=="Yes"){createCookie("userChoice",reply,30);var url='http://apps.si.com/survey/?path='+cnnPage.path;siLog.debug('siSurvey.storeReply: opening: '+url);window.open(url,"_blank");siLog.debug(url);}
if(reply=="No"){createCookie("userChoice",reply,30);}
if(reply=="Maybe"||reply=="close"){createCookie("userChoice",reply,10);}
if($e("surveyHome")){$e("surveyHome").style.display="none";$e("hide300x250").style.display="block";$e("hide300x250").getElementsByTagName("table")[0].style.display="block";}
else{$e("survey").style.display="none";}}};if(window.addEventListener){window.addEventListener("load",siSurvey.runPopup,false);}
if(window.attachEvent){window.attachEvent("onload",siSurvey.runPopup);}
function storeReply(reply){siSurvey.storeReply(reply);}

var Tynt=Tynt||[];Tynt.push('s!4');Tynt.s=Tynt.s||{l:"http://asc.tynt.com/si_logo.png",lh:34,lw:50,dd:3,ed:['sports.yahoo.com','foxsports.com','espn.go.com']};var siTracking={init:function(){siLog.time('siTracking');siLog.group('siTracking');siLog.debug('siTracking.init');this.dynamic_logic();this.tynt();this.revsci();cnnJSrun("siLog.groupEnd('siTracking');siLog.timeEnd('siTracking');");if(allCookies['cnnad_tracking']=="set"){document.write('<div class="cnnSiteDebug">Tracking suite in place.</div>');}},dynamic_logic:function(){siLog.info('siTracking:dynamic_logic');cnnJS('http://content.dl-rms.com/rms/mother/901/nodetag.js');},revsci:function(){siLog.info('siTracking:revsci');cnnJS('http://js.revsci.net/gateway/gw.js?csid=A09801');},tynt:function(){if(cnnPage.isLive){siLog.info('siTracking:tynt');document.tyntVariables={"spt":"Get a free NFL Team Jacket and Tee with","spid":2,"ap":"Read More:","sp":"SI Subscription"};cnnJS('http://tcr.tynt.com/javascripts/Tracer.js?user=ccCFqQFFmr3OTvab7jrHcU&s=81');}
if(document.location.protocol=='http:'){siLog.info('siTracking:tyntSS');document.write('<scr'+'ipt src="http://asd.tynt.com/ts.js" type="text/javascript" async=""></scr'+'ipt>');}}};function cnnSendComscoreBeacon(videoId,contentFlag){try{var c1='1';var c2='8586808';var c3='00004';var c4='8586811';var c5='010000';if(contentFlag==1){c5='020000';}
var beaconImage=new Image();beaconImage.src='http://b.scorecardresearch.com/p?c1='+c1+'&c2='+c2+'&c3='+c3+'&c4='+c4+'&c5='+c5+'';}catch(err){}}

function ajaxer(url,callbackFunction){var that=this;this.updating=false;this.abort=function(){if(that.updating){that.updating=false;that.AJAX.abort();that.AJAX=null;}}
this.update=function(passData,postMethod){if(that.updating){return false;}
that.AJAX=null;if(window.XMLHttpRequest){that.AJAX=new XMLHttpRequest();}else{that.AJAX=new ActiveXObject("Microsoft.XMLHTTP");}
if(that.AJAX==null){return false;}else{that.AJAX.onreadystatechange=function(){if(that.AJAX.readyState==4){that.updating=false;that.callback(that.AJAX);that.AJAX=null;}}
that.updating=new Date();if(/post/i.test(postMethod)){var uri=urlCall+'?'+that.updating.getTime();that.AJAX.open("POST",uri,true);that.AJAX.setRequestHeader("Content-type","application/x-www-form-urlencoded");that.AJAX.setRequestHeader("Content-Length",passData.length);that.AJAX.send(passData);}else{var uri=urlCall;var updatedTime=that.updating.getTime();var ifModifiedSince=new Date(0);that.AJAX.open("GET",uri,true);if(navigator.appName=="Microsoft Internet Explorer"){that.AJAX.setRequestHeader("If-Modified-Since",ifModifiedSince);}
that.AJAX.send(null);}
return true;}}
var urlCall=url;this.callback=callbackFunction||function(){};}

function cvpSearchTheClient(theObj,thePath)
{var index=thePath.indexOf("."),objName="",subPath="",childObj;if(theObj===null)
theObj=window;if(index===-1)
{if(thePath.indexOf("(")!==-1&&thePath.indexOf(")")!==-1)
return eval("theObj."+thePath);else
return theObj[thePath];}
objName=thePath.substring(0,index);subPath=thePath.substring(index+1);childObj=theObj[objName];if(objName.indexOf("(")!==-1&&objName.indexOf(")")!==-1)
childObj=eval("theObj."+objName);if(childObj===null)
return"";if(subPath.length<1)
return childObj.toString();return cvpSearchTheClient(childObj,subPath);}
(function(){var CVP={};var CVPconstructor=function(options){return CVP.createPlayer(options);};if('CVP'in window){if(typeof window.console!=='undefined'&&typeof window.console.log==='function'){console.log("WARNING - window.CVP was already defined, adding/overriding functionality");}}
var VERSION="2.7.7";var FLASH_VERSION="10.1.0.0";var HTML5="html5";var FLASH="flash";var MAPPING_PATH="http://i.cdn.turner.com/xslo/cvp/config/{site}/";var MAPPING_FILE="mapping.xml";var OMNITURE_JS_URL="";var AD_MANAGER_URL="http://i.cdn.turner.com/xslo/cvp/ads/freewheel/js/AdManager.js";var AD_DFP_URL="http://www.google.com/uds/api/ima/1.7/9fd415db3bb953707e811e4827fe957b/default.IN.js";var EXPRESS_INSTALL_URL="http://i.cdn.turner.com/xslo/cvp/assets/flash/expressInstall.swf";var debug=/\bdmtdebug\b/.test([this.location.search,this.location.hash].join());var site='cvp';var property='cvp';var Class=(function(){var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\b_super\b/:/.*/;var Class=function(){};Class.extend=function(prop){var _super=this.prototype;initializing=true;var prototype=new this();initializing=false;for(var name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,prop[name]):prop[name];}function Class(){if(!initializing&&this.init)this.init.apply(this,arguments);}Class.prototype=prototype;Class.constructor=Class;Class.extend=arguments.callee;return Class;};return Class;})();function createCallbackHandler(id){var funcName=id+'_callback_handler';if(typeof window[funcName]!=='undefined')
return false;window[funcName]=function(){var ret=CVP.onCallback(id,arguments);if(typeof ret!=='undefined'){return ret;}};return true;}
function validateFlashVersion(embedVersion)
{var f1="",f2="",f1V=0,f2V=0,i=0,endi=0;embedVersion=embedVersion.toString();if(embedVersion===FLASH_VERSION)
return embedVersion;if(typeof embedVersion==="undefined"||embedVersion===null)
return FLASH_VERSION;f1=FLASH_VERSION.split(".");f2=embedVersion.split(".");for(endi=f1.length;i<endi;++i)
{f1V=+f1[i];f2V=+f2[i];if(isNaN(f2V)||f1V>f2V)
return FLASH_VERSION;else if(f2V>f1V)
return embedVersion;}
return FLASH_VERSION;}
function addBeforeUnLoadEvent(func)
{var oldfunc=window.onbeforeunload;if(typeof window.onbeforeunload!=='function')
{window.onbeforeunload=func;}
else
{window.onbeforeunload=function()
{if(oldfunc)
{oldfunc();}
func();};}}
var CVPObject=function(options){this.options=extend({id:'cvp_player',width:'320',height:'240',flashVars:{},playerType:FLASH,freewheelJsUrl:AD_MANAGER_URL,initialize:function(){}},options||{});this.options.embed=extend({containerSwf:'',expressInstallSwf:EXPRESS_INSTALL_URL,flashVersion:FLASH_VERSION},this.options.embed||{});this.options.embed.options=extend({quality:'high',bgcolor:'#000000',allowFullScreen:'true',allowScriptAccess:'always'},this.options.embed.options||{});if(!this.options.embed.containerSwf){log('Invalid containerSwf...exiting');throw new Error("Invalid containerSwf");}
this.options.initialize();var id=this.options.id,width=this.options.width,height=this.options.height,flashVars=this.options.flashVars,embed=this.options.embed;this._playerType=this.options.playerType;var player=null;if(this._playerType===HTML5||CVP.Browser.apple_mobile)
{if(flashVars.site&&flashVars.profile)
{log("instantiating the HTML5 player");this._playerType=HTML5;player=new CVP.Players.HTML5(this.options);}
else
{log("invalid HTML5 params...instantiating null player");this._playerType=false;player=new CVP.Players.NullPlayer(this.options);}
this.getDOMPlayer=function()
{return player;};}
else
{log("instantiating the Flash player");this._playerType=FLASH;}
if(CVP.findInstance(id)||byId(id)){log(id+' is already in use...exiting');throw new Error(id+' is already in use');}
this.getId=function(){return id;};this.getWidth=function(){return width;};this.getHeight=function(){return height;};this.getFlashVars=function(){return flashVars;};this.getEmbed=function(){return embed;};this.getPlayerType=function(){return this._playerType;};if(!createCallbackHandler(id)){log('callback handler for id "'+id+'" could not be created...exiting');throw new Error('callback handler for id "'+id+'" could not be created...exiting');}
this.callbacks={};delete this.options.initialize;var p,pfn;for(p in this.options){if(hasOwn(this.options,p)){pfn=this.options[p];if(isFunc(pfn)){this.callbacks[p]=pfn;}}}
this.handleCallBack=function(){var ret=null;if(arguments.length){var funcName=arguments[0],args=Array.prototype.slice.call(arguments,1),fn;fn=this[funcName];if(isFunc(fn)){try{ret=fn.apply(this,args);}catch(internalCBException){log("Warning - exception on internal CB "+funcName);log("Exception - "+internalCBException.message);}}
fn=this.callbacks[funcName];if(isFunc(fn)){try{ret=fn.apply(this,args);}catch(userCBException){log("Warning - exception on user CB "+funcName);log("Exception - "+userCBException.message);}}}
return ret;};var contentId=this.options.flashVars.contentId||'',contentUrl=this.options.flashVars.contentUrl||'',playlistId=this.options.flashVars.playlistId||'',context=this.options.flashVars.context||'',playerInstance=context,contentWidth=0,contentHeight=0,duration=0,playhead=0,buffering=false,paused=false,fullscreen=false;this.getDOMPlayerInstance=function(){return playerInstance;};this.getContentId=function(){return contentId;};this.getContentUrl=function(){return contentUrl;};this.playlistId=function(){return playlistId;};this.getContext=function(){return context;};this.getContentWidth=function(){return contentWidth;};this.getContentHeight=function(){return contentHeight;};this.getDuration=function(){return duration;};this.getPlayhead=function(){return playhead;};this.isBuffering=function(){return buffering;};this.isPaused=function(){return paused;};this.isFullscreen=function(){return fullscreen;};this.onContentMetadata=function(pPlayerId,pContentId,pDuration,pWidth,pHeight){contentId=pContentId;playhead=0;duration=pDuration;contentWidth=pWidth;contentHeight=pHeight;};this.onContentBegin=function(pPlayerId,pContentId){contentId=pContentId;};this.onContentBuffering=function(pPlayerId,pContentId,pBuffering){buffering=pBuffering;};this.onContentPlayhead=function(pPlayerId,pContentId,pPlayhead,pTotalDuration){playhead=pPlayhead;};this.onContentPause=function(pPlayerId,pContentId,pPaused){paused=pPaused;};this.onContentResize=function(pPlayerId,pWidth,pHeight,pFullscreen){fullscreen=pFullscreen;};this.onPlayerReady=function(){playerInstance=this.getDOMPlayerInstance();};CVP.registerInstance(id,this);return this;};CVPObject.prototype={getDOMPlayer:(navigator.appName.indexOf("Microsoft")!==-1?function(){return window[this.getId()]}:function(){return document[this.getId()]}),getPlayer:function(id){if(this._playerType===HTML5||CVP.Browser.apple_mobile){return this.getDOMPlayer();}
else{this.getDOMPlayer().getPlayerJS(id);return this;}},setDefaultPlayer:function(id){this.getDOMPlayer().setDefaultPlayer(id);return this;},embedSWF:function(containerElementId){return this.embed.apply(this,arguments);},embed:function(containerElementId){var self=this;if(this._playerType===FLASH)
{var flashvars=this.getFlashVars();flashvars.domId=this.getId();flashvars.cvpSessionToken=CVP.getSessionToken();var embed=this.getEmbed();var container=embed.containerSwf;var params=embed.options;var express=embed.expressInstallSwf;var version=validateFlashVersion(embed.flashVersion);var attributes={id:this.getId(),name:this.getId()};if(!CVP.swfobject.hasFlashPlayerVersion("1.0.0"))
this.handleCallBack("onNoFlashDetected");CVP.swfobject.embedSWF(container,containerElementId,this.getWidth(),this.getHeight(),version,express,flashvars,params,attributes);}
else
{if(this.getPlayer().embed)
{CVP.Events.onReady(function(){self.getPlayer().embed(containerElementId);});}}
return this;},removeSWF:function(){return this.remove.apply(this,arguments);},remove:function(){if(this._playerType===FLASH)
{if(CVP.swfobject&&CVP.swfobject.removeSWF){CVP.swfobject.removeSWF(this.getId());}}
else
{if(isFunc(this.getPlayer().remove))
{this.getPlayer().remove();}}
return this;},play:function(id,options){this.getDOMPlayer().playContent(id,options||{});return this;},playFromObject:function(object,options){this.getDOMPlayer().playFromObject(object,options||{});return this;},reportAnalytics:function(eventName,data){this.getDOMPlayer().reportAnalytics(eventName,data);return this;},replay:function(){this.getDOMPlayer().replayContent();return this;},playNextInQueue:function(){this.getDOMPlayer().playNextInQueue();return this;},pause:function(){this.getDOMPlayer().pause();return this;},resume:function(){this.getDOMPlayer().resume();return this;},stop:function(){this.getDOMPlayer().stopContent();return this;},queue:function(id,options,index){if(typeof index==='undefined')
index=-1;this.getDOMPlayer().queue(id,options||{},index);return this;},queueFromObject:function(object,options,index){if(typeof index==='undefined')
index=-1;this.getDOMPlayer().queueFromObject(object,options||{},index);return this;},dequeue:function(id){this.getDOMPlayer().dequeue(id);return this;},emptyQueue:function(){this.getDOMPlayer().emptyQueue();return this;},setQueueAutoplay:function(autoplay){this.getDOMPlayer().setQueueAutoplay(autoplay);return this;},getQueue:function(){return this.getDOMPlayer().getQueue();},seek:function(time){this.getDOMPlayer().seek(time);return this;},mute:function(){this.getDOMPlayer().mute();return this;},unmute:function(){this.getDOMPlayer().unmute();return this;},setVolume:function(volume){this.getDOMPlayer().setVolume(volume);return this;},getVolume:function(){return this.getDOMPlayer().getVolume();},isMuted:function(){return this.getDOMPlayer().isMuted();},getContentEntry:function(id){return this.getDOMPlayer().getContentEntry(id);},goFullscreen:function(){this.getDOMPlayer().goFullscreen();return this;},resize:function(width,height,duration){this.getDOMPlayer().resize(width,height,duration);return this;},setMaxBitrate:function(bitrate){this.getDOMPlayer().setMaxBitrate(bitrate);return this;},switchBitrateId:function(id){this.getDOMPlayer().switchBitrateId(id);return this;},setAutoBitrateSwitch:function(auto){this.getDOMPlayer().setAutoBitrateSwitch(auto);return this;},getAvailableBitrates:function(playMode){return this.getDOMPlayer().getAvailableBitrates(playMode);},getBitrateId:function(){return this.getDOMPlayer().getBitrateId();},setGroupOrder:function(order){this.getDOMPlayer().setGroupOrder(order);return this;},getShareOptions:function(){return this.getDOMPlayer().getShareOptions();},setClosedCaptionsOn:function(on){return this.getDOMPlayer().setClosedCaptionsOn(on);},setAdSection:function(section){this.getDOMPlayer().setAdSection(section);return this;},setAdKeyValue:function(key,value){this.getDOMPlayer().setAdKeyValue(key,value);return this;},setAdVisibility:function(adsObject){this.getDOMPlayer().setAdVisibility(adsObject);return this;},switchAdContext:function(context){this.getDOMPlayer().switchAdContext(context);return this;},switchTrackingContext:function(context){this.getDOMPlayer().switchTrackingContext(context);return this;},setDataSrc:function(src){this.getDOMPlayer().setDataSrc(src);return this;},setFileKey:function(key){this.getDOMPlayer().setFileKey(key);return this;},sendUIMessage:function(message,data){this.getDOMPlayer().sendUIMessage(message,data);return this;}};CVP.HTML5=HTML5;CVP.FLASH=FLASH;CVP.version=VERSION;CVP.VIDEO_NOT_FOUND_ERROR="video not found";CVP.VIDEO_XML_NOT_FOUND_ERROR="cms error";CVP.instances={};CVP.registerInstance=function(id,instance){CVP.instances[id]=instance;};CVP.unregisterInstance=function(id){CVP.instances[id]=null;};CVP.findInstance=function(id){return CVP.instances[id];};CVP.onCallback=function(id,args){var instance=CVP.findInstance(id);if(instance){return instance.handleCallBack.apply(instance,args);}else{log("Error - onCallback - unable to find instance "+id);}};CVP.cleanup=function(){var inst;for(inst in CVP.instances){if(hasOwn(CVP.instances,inst)){window[inst+'_callback_handler']=null;CVP.instances[inst]=null;}}};CVP.createPlayer=function(options){return new CVPObject(options);};CVP.Events={};CVP.Events.onReady=function(handler)
{if(!CVP.swfobject)
throw new Error("swfobject is required for onReady functionality");CVP.swfobject.addDomLoadEvent(handler);};CVP.Events.addListener=function(element,type,handler)
{if(element.addEventListener)
element.addEventListener(type,handler,false);else
{if(!handler.$$guid)handler.$$guid=CVP.Events.addListener.guid++;if(!element.events)element.events={};var handlers=element.events[type];if(!handlers)
{handlers=element.events[type]={};if(element['on'+type])handlers[0]=element['on'+type];element['on'+type]=CVP.Events._handleEvent;}
handlers[handler.$$guid]=handler;}};CVP.Events.addListener.guid=1;CVP.Events.removeListener=function(element,type,handler)
{if(element.removeEventListener)
element.removeEventListener(type,handler,false);else if(element.events&&element.events[type]&&handler.$$guid)
delete element.events[type][handler.$$guid];};CVP.Events._handleEvent=function(event)
{event=event||CVP.Events._fixEvent(window.event);var returnValue=true;var handlers=this.events[event.type];var i;for(i in handlers)
{if(hasOwn(handlers,i))
{this.$$handler=handlers[i];if(this.$$handler(event)===false)returnValue=false;}}
if(this.$$handler)this.$$handler=null;return returnValue;};CVP.Events._fixEvent=function(event)
{event.preventDefault=CVP.Events._fixEvent._preventDefault;event.stopPropagation=CVP.Events._fixEvent._stopPropagation;return event;};CVP.Events._fixEvent._preventDefault=function()
{this.returnValue=false;};CVP.Events._fixEvent._stopPropagation=function()
{this.cancelBubble=true;};CVP.Events.CustomEvent=Class.extend({init:function(type){this._type=type;this._listeners=[];},addListener:function(fn,scope){this._listeners.push({fn:fn,scope:scope});},removeListener:function(fn,scope){var i=0,len=this._listeners.length,o;for(;i<len;i+=1)
{o=this._listeners[i];if(o.fn===fn&&o.scope===scope)
{this._listeners.splice(i,1);break;}}},dispatch:function(){var i=0,len=this._listeners.length,o;for(;i<len;++i)
{o=this._listeners[i];o.fn.apply(o.scope,arguments);}}});CVP.Utils={undef:function(obj){return typeof obj==="undefined";},isNull:function(obj){return CVP.Utils.undef(obj)||obj===null;},empty:function(str){return CVP.Utils.isNull(str)||str==="";},isFunc:function(f){return typeof f==="function";},isObject:function(obj){return typeof obj==="object";},isString:function(obj){return typeof obj==="string";},isFlagActive:function(str,bDefault)
{if(CVP.Utils.empty(str))
return bDefault;switch(str.toLowerCase())
{case"yes":case"true":case"on":return true;default:return false;}},extend:function(target,source){var p;if(!target)target={};for(p in source){target[p]=source[p];}
return target;},byId:function(id){return document.getElementById(id);},slice:function(arr,index){return Array.prototype.slice.call(arr,index||0);},hasOwn:(typeof Object.prototype.hasOwnProperty==="function"?function(object,property){return Object.prototype.hasOwnProperty.call(object,property);}:function(object,property){return object[property]!==Object.prototype[property];}),bind:(typeof Function.prototype.bind==="function"?function(func,scope,argv){return Function.prototype.bind.apply(func,CVP.Utils.slice(arguments,1));}:function(func,scope,argv){var args=CVP.Utils.slice(arguments,2);return function(){var a=args.concat(CVP.Utils.slice(arguments));return func.apply(scope,a);};}),template:function(template,values)
{var matches=template.match(/\{[^{}]*\}/g),i=0,len=0,args=CVP.Utils.slice(arguments,1),argc=args.length;if(!matches)
{log("No {placeholders} present in template: ",template);}
else
{for(i=0,len=matches.length;i<len&&i<argc;++i)
{template=template.replace(matches[i],args[i]);}}
return template;},joinKeys:function(obj,delimiter)
{var arr=[],p;if(nil(delimiter))
delimiter=",";for(p in obj){if(hasOwn(obj,p)){arr.push(p+"="+obj[p]);}}
return arr.join(delimiter);},getQueryParams:function(str){var params={},source=str||location.href,data=[],i=0,endi=0,pair=[];try{data=(source.split("?",2)[1]||"").split("#")[0].split("&")||[];for(endi=data.length;i<endi;++i){pair=data[i].split("=");if(pair[0])
params[pair[0]]=unescape(pair[1]);}}
catch(e){CVP.Utils.log("unable to get url params");}
return params;},getQueryParam:function(key){return CVP.Utils.getQueryParams()[key];},isRelativePath:function(url){if(url&&url.indexOf('://')===-1){return true;}
return false;},log:function(){if(window.console&&window.console.log&&debug){window.console.log(CVP.Utils.slice(arguments).join(" | "));}},print:function(obj,str){var o;if(str!=="nested")
CVP.Utils.log("\nPrint all values for ",str);for(o in obj)
{if(hasOwn(obj,o))
{if(!o)
continue;if(CVP.Utils.isObject(obj[o]))
{CVP.Utils.log("Printing nested object value",o);CVP.Utils.print(obj[o],"nested");}
else
{CVP.Utils.log(str==="nested"?"\t":"","key:",o,"value:",obj[o]);}}}
if(str!=="nested")
{CVP.Utils.log("End Print all values for ",str);CVP.Utils.log("\n");}},now:(typeof Date.now==="function"?Date.now:function(){return(new Date()).getTime();}),getRandomInt:function(min,max)
{return(arguments.length===1?Math.floor(Math.random()*min):Math.floor(Math.random()*(max-min+1))+min);},randomString:function(length)
{var str='';var i;var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');if(!length)
{length=CVP.Utils.getRandomInt(chars.length);}
for(i=0;i<length;i++)
{str+=chars[CVP.Utils.getRandomInt(chars.length)];}
return str;}};CVP.Utils.CommandQueue=Class.extend({init:function()
{this._queue=[];},push:function(fn,scope,args)
{this._queue.push({fn:fn,scope:scope,args:args});},remove:function(index)
{index=typeof index!=='number'?this._queue.length-1:index;this._queue.splice(index,1);},execute:function()
{var i=0,len=this._queue.length,cmd;for(;i<len;++i)
{cmd=this._queue[i];cmd.fn.apply(cmd.scope,cmd.args);}}});CVP.Utils.Asset=Class.extend({init:function(url,type)
{this._firedSuccess=false;this._url=url;this._type=CVP.Utils.empty(type)?this._determineType():type;this.id="cvp_asset_"+Math.round(Math.random()*1000);this.eSuccess=new CVP.Events.CustomEvent();this.eFailure=new CVP.Events.CustomEvent();},_determineType:function()
{var ext=(CVP.Utils.empty(this._url))?"":this._url.substring(this._url.lastIndexOf(".")+1);return ext;},load:function()
{log("Asset","loading type",this._type);switch(this._type)
{case"js":this._loadJs();break;case"css":this._loadCss();break;default:this._failure();}},_success:function()
{log("Asset","successfully loaded asset",this._url);this.eSuccess.dispatch();this._firedSuccess=true;},_failure:function()
{log("Asset","failed to load asset",this._url);this.eFailure.dispatch();},_loadJs:function()
{var head=document.getElementsByTagName("head")[0];if(!head)
{this._failure();return;}
var script=document.createElement('script');script.id=this.id;script.type='text/javascript';var successCB=CVP.Utils.bind(function(){if(this._firedSuccess)
return;this._success();script.onload=script.onreadystatechange=null;head.removeChild(script);},this);script.onload=successCB;script.onerror=CVP.Utils.bind(this._failure,this);script.onreadystatechange=function()
{if(this.readyState==='loaded'||this.readyState==='complete')
{successCB();}};script.src=this._url;head.appendChild(script);},_loadCss:function()
{var node,head=document.getElementsByTagName("head")[0];if(!head)
{this._failure();return;}
node=document.createElement('link');node.type='text/css';node.rel='stylesheet';node.href=src;node.media='screen';head.appendChild(node);this._success();}});CVP.Utils.JsonConverter={ESCAPE_MATCH:/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,ESCAPE_MAPPING:{'\"':'\\"','\\':'\\\\','\/':'\\/','\b':'\\b','\f':'\\f','\n':'\\n','\r':'\\r','\t':'\\t'},ESCAPE_REPLACER:function(a){var map=CVP.Utils.JsonConverter.ESCAPE_MAPPING;return a in map?map[a]:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);},_validateEscape:(/\bdmtdebug\b/.test([window.location.search,window.location.hash].join())&&typeof JSON==='object'&&typeof JSON.parse==='function'),escapeString:function(string){var escaped='',test=null,validate=CVP.Utils.JsonConverter._validateEscape,match=CVP.Utils.JsonConverter.ESCAPE_MATCH,replacer=CVP.Utils.JsonConverter.ESCAPE_REPLACER;match.lastIndex=0;escaped='"'+(match.test(string)?string.replace(match,replacer):string)+'"';if(validate){try{test=JSON.parse('{"test": '+escaped+'}');if(test.test!==string){throw new Error('JsonConverter::escapeString failed to return a value that could be reconstituted into the original string');}}catch(e){throw e;}}
return escaped;},convertNode:function(xml,ident,nodeType)
{var json="",first=false,i=0,endi=0,undef=CVP.Utils.undef,empty=CVP.Utils.empty;if(empty(ident))
ident="";if(empty(nodeType))
nodeType="";json=ident;if(nodeType==="")
json+="{";ident=ident+"\t";first=true;if(!undef(xml.attributes))
{var removeAttributes=[];for(endi=xml.attributes.length;i<endi;++i)
{var attribute=xml.attributes[i];if(!undef(attribute.nodeName)&&attribute.nodeName.indexOf('xmlns')===-1)
{if(first)
{first=false;json+="\n";}
else
{json+=",\n";}
if(nodeType==='array')
json+=ident+"{";else
json+=ident;json+="\""+attribute.nodeName+"\":"+CVP.Utils.JsonConverter.escapeString(attribute.nodeValue);if(nodeType==='array')
json+="}";}else{if(!undef(attribute.nodeName)){removeAttributes.push(attribute.nodeName);}}}
for(i=0,endi=removeAttributes.length;i<endi;++i){xml.removeAttribute(removeAttributes[0]);}}
var type;var name;if(!undef(xml.childNodes))
{for(i=0,endi=xml.childNodes.length;i<endi;++i)
{var node=xml.childNodes[i];if(!undef(node.tagName))
{if(first)
{first=false;json+="\n";}
else
{json+=",\n";}
name=node.tagName;if(empty(name))
{name="text";}
json+=ident;if(nodeType==='array')
json+="{";if((empty(node.childNodes)||node.childNodes.length<=1)&&(empty(node.attributes)||node.attributes.length===0)&&!(node.childNodes.length>0&&node.childNodes[0].nodeType===1))
{if(node.childNodes.length>0)
json+="\""+name+"\":"+CVP.Utils.JsonConverter.escapeString(node.childNodes[0].nodeValue);else
json+="\""+name+"\":"+"\"\"";}
else
{var isArray=CVP.Utils.JsonConverter.isNodeAnArray(node);json+="\""+name+"\":"+(isArray?"[":"{")+"\n";if(node.childNodes.length>0&&!empty(node.childNodes[0].nodeValue))
json+="\"text\":"+CVP.Utils.JsonConverter.escapeString(node.childNodes[0].nodeValue)+",";type=isArray?'array':'object';json+=CVP.Utils.JsonConverter.convertNode(node,ident,type);}
if(nodeType==='array')
json+="}";}}}
ident=ident.substr(0,ident.length-1);json+="\n"+ident;json+=(nodeType==='array')?"]":"}";return json;},isNodeAnArray:function(node)
{var names={},i=0,endi=0,undef=CVP.Utils.undef,empty=CVP.Utils.empty;if(!undef(node.childNodes))
{for(endi=node.childNodes.length;i<endi;++i)
{var element=node.childNodes[i];if(!empty(element.tagName))
{if(!empty(names[element.tagName]))
return true;else
names[element.tagName]="exists";}}}
return false;},encodeXmlObject:function(xmlObj)
{var json=CVP.Utils.JsonConverter.convertNode(xmlObj);return json;}};CVP.Browser=(function(){var
ua=navigator.userAgent.toLowerCase(),chrome=/\bchrome\b/.test(ua),iphone=/\biphone\b/.test(ua),ipod=/\bipod\b/.test(ua),ipad=/\bipad\b/.test(ua),apple_mobile=(iphone||ipod||ipad),matches=null,toVersionNum=function(str){return str?parseInt(str,10):NaN;},version={raw:NaN,major:NaN,minor:NaN,revision:NaN};if(apple_mobile){matches=/ os ((\d+)(?:\D(\d+))?(?:\D(\d+))?)/.exec(ua);if(matches){version.raw=matches[1].replace(/\D/g,'.');version.major=toVersionNum(matches[2]);version.minor=toVersionNum(matches[3]);version.revision=toVersionNum(matches[4]);}else{CVP.Utils.log("Unable to parse apple mobile version");}}
return{version:version,chrome:chrome,iphone:iphone,ipod:ipod,ipad:ipad,apple_mobile:apple_mobile};}());CVP.Players={};CVP.Players.NullPlayer=Class.extend({init:function()
{var functions="play replay playNextInQueue pause resume stop queue dequeue emptyQueue setQueueAutoplay getQueue seek mute unmute setVolume getVolume isMuted getContentEntry goFullscreen resize setMaxBitrate setGroupOrder getShareOptions setAdSection setAdKeyValue switchAdContext switchTrackingContext".split(" "),f=0,endf=functions.length,noop=function(){},fn;for(;f<endf;++f)
{fn=functions[f];if(!this[fn])
this[fn]=noop;}}});CVP.Players.HTML5=CVP.Players.NullPlayer.extend({init:function(options)
{this._super();this._options=options;this._instance=null;this._loadQ=new CVP.Utils.CommandQueue();this._loaded=false;this._load();},_load:function()
{if(CVP.Players._HTML5Player)
{this._onLoaded();}
else
{log("HTML5 player not found");}},_onLoaded:function()
{if(CVP.Players._HTML5Player)
{this._instance=new CVP.Players._HTML5Player(this._options);this._instance.ePlayerLoaded.addListener(this._onPlayerLoaded,this);this._instance.ePlayerLoadError.addListener(this._onPlayerLoadError,this);this._instance.ePlayerReady.addListener(this._onPlayerReady,this);this._instance.ePlayerReady.addListener(this._onCVPReady,this);this._instance.ePlayerReady.addListener(bind(this._onCallBack,this,'onPlayerReady'));this._instance.ePlayerReady.addListener(bind(this._onCallBack,this,'onCVPReady'));this._instance.eContentBegin.addListener(bind(this._onCallBack,this,'onContentBegin'));this._instance.eContentPlay.addListener(bind(this._onCallBack,this,'onContentPlay'));this._instance.eContentPause.addListener(bind(this._onCallBack,this,'onContentPause'));this._instance.eContentEnd.addListener(bind(this._onCallBack,this,'onContentEnd'));this._instance.eContentComplete.addListener(bind(this._onCallBack,this,'onContentComplete'));this._instance.eContentMetadata.addListener(bind(this._onCallBack,this,'onContentMetadata'));this._instance.eContentPlayhead.addListener(bind(this._onCallBack,this,'onContentPlayhead'));this._instance.eContentBuffering.addListener(bind(this._onCallBack,this,'onContentBuffering'));this._instance.eContentResize.addListener(bind(this._onCallBack,this,'onContentResize'));this._instance.eContentVolume.addListener(bind(this._onCallBack,this,'onContentVolume'));this._instance.eContentError.addListener(bind(this._onCallBack,this,'onContentError'));this._instance.eAdPlayhead.addListener(bind(this._onCallBack,this,'onAdPlayhead'));this._instance.eAdPlay.addListener(bind(this._onCallBack,this,'onAdPlay'));this._instance.eAdEnd.addListener(bind(this._onCallBack,this,'onAdEnd'));this._instance.eAdError.addListener(bind(this._onCallBack,this,'onAdError'));this._instance.eTrackingAdStart.addListener(bind(this._onCallBack,this,'onTrackingAdStart'));this._instance.eTrackingAdComplete.addListener(bind(this._onCallBack,this,'onTrackingAdComplete'));this._instance.eTrackingAdCountdown.addListener(bind(this._onCallBack,this,'onTrackingAdCountdown'));this._instance.eTrackingContentPlay.addListener(bind(this._onCallBack,this,'onTrackingContentPlay'));this._instance.eTrackingContentBegin.addListener(bind(this._onCallBack,this,'onTrackingContentBegin'));this._instance.eTrackingContentComplete.addListener(bind(this._onCallBack,this,'onTrackingContentComplete'));this._instance.eTrackingContentSeek.addListener(bind(this._onCallBack,this,'onTrackingContentSeek'));this._instance.eTrackingFullscreen.addListener(bind(this._onCallBack,this,'onTrackingFullscreen'));this._instance.eTrackingMuted.addListener(bind(this._onCallBack,this,'onTrackingMuted'));this._instance.eTrackingPaused.addListener(bind(this._onCallBack,this,'onTrackingPaused'));}
else
{log("HTML5 player not found");}},_onPlayerLoaded:function()
{log("_onPlayerLoaded");this._loaded=true;this._loadQ.execute();},_onPlayerLoadError:function()
{log("HTML5 load error");this._onCallBack('onPlayerLoadError');},_onPlayerReady:function()
{log("_onPlayerReady");},_onCVPReady:function()
{log("_onCVPReady");},embed:function(containerElement)
{if(!this._loaded)
{log("queuing embed");this._loadQ.push(this.embed,this,arguments);return;}
log("executing embed");this._instance.render(containerElement);},remove:function()
{this._instance.remove();},playContent:function(contentId,options)
{this._instance.play(contentId,options);},queue:function(contentId,options)
{this._instance.queue(contentId,options);},pause:function()
{this._instance.pause();},resume:function()
{this._instance.resume();},resize:function(width,height)
{this._instance.resize(width,height);},goFullscreen:function(fullscreen)
{this._instance.goFullscreen(fullscreen);},setVolume:function(v)
{this._instance.setVolume(v);},getVolume:function()
{return this._instance.getVolume();},mute:function()
{this._instance.mute();},unmute:function()
{this._instance.unmute();},getContentEntry:function(id)
{return this._instance.getContentEntry(id);},setAdSection:function(ssid)
{this._instance.setAdSection(ssid);},_onCallBack:function()
{CVP.onCallback(this._options.id,arguments);},instance:function()
{return this._instance;},supported:function()
{return!!document.createElement('video').canPlayType;}});CVP.Ajax={get:function(obj){obj.type="GET";this._request(obj);},getXml:function(obj){obj.dataType="xml";this.get(obj);},getJSONP:function(obj){this.JSONP._request(obj);},post:function(obj){obj.type="POST";this._request(obj);},_request:function(obj)
{var request=new XMLHttpRequest();request.onreadystatechange=function()
{if(request.readyState===4)
{if(request.status<=200&&request.status<400)
{if(obj.success)
obj.success(request.responseText);}
else
{if(obj.error)
obj.error(request);}
request=null;}};request.open(obj.type,obj.url,true);request.send(obj.type==="POST"?obj.data:null);}};CVP.Ajax.JSONP={requestTimeout:5000,maxRetries:0,_externalRoutes:{},requestMap:{},_counter:0,_request:function(obj){var self=this;obj=extend({timeout:this.requestTimeout,maxRetries:this.maxRetries},obj||{});obj.tries=0;log("JSONP - creating request with timeout ",obj.timeout," and maxRetries ",obj.maxRetries);this._sendRequest(obj);},_sendRequest:function(obj){var self=this;var requestId=this._createCallback(obj);var script=this._createScript(requestId);if(!script){log("JSONP - unable to create script for request ",obj.url);throw new Error("JSONP - unable to create script for request "+obj.url);}
script.src=obj.url;if(obj.timeout){setTimeout(function(){self._onError(requestId,obj);},obj.timeout);}},_onSuccess:function(id,obj,data){if(!this.requestMap[id]){return;}
this._destroyRequest(id,obj);if(isString(data)){try{data=JSON.parse(data);}catch(e1){log("JSON.parse failed - falling back to eval");try{data=eval('('+data+')');}catch(e2){log("eval data failed");}}}
if(obj.success){log("JSONP","success");obj.success(data);}},_onError:function(id,obj){if(!this.requestMap[id]){return;}
this._destroyRequest(id,obj);++obj.tries;if(obj.maxRetries&&obj.tries<obj.maxRetries){log("Request failed - resending");this._sendRequest(obj);return;}
if(obj.error){log("JSONP","error");obj.error(obj.url);}},_destroyRequest:function(id,obj){this._deregisterExternalCallback(obj.jsonpCallback,id);delete this.requestMap[id];this._counter--;var script=document.getElementById(this._getScriptName(id));if(script){script.parentNode.removeChild(script);script=null;}},_createScript:function(id){var head,script;head=document.getElementsByTagName("head")[0];if(!head)
return false;script=document.createElement("script");script.type='text/javascript';if(id)
script.id=this._getScriptName(id);head.appendChild(script);return script;},_getScriptName:function(id){return"cvp_jsonp_"+id;},_createCallback:function(obj){var self=this;if(empty(obj.jsonpCallback)){return null;}
++this._counter;var id="request_"+this._counter+"_"+now();this.requestMap[id]=function(data){self._onSuccess(id,obj,data);};var cb=function(data){log("JSONP","Internal CB received for request:",id);if(self.requestMap[id]){self.requestMap[id](data);}else{log("Request response came in after allotted time: ",id);}};this._registerExternalCallback(obj.jsonpCallback,id,cb);return id;},_registerExternalCallback:function(name,id,cb){if(!window[name])
this._createExternalCallback(name,this._routeExternalCallback(name));if(!this._externalRoutes[name])
this._externalRoutes[name]=[];this._externalRoutes[name].push({id:id,cb:cb})},_routeExternalCallback:function(name){var self=this;return function(data){log("JSONP","routing:",name);if(!self._externalRoutes){log("JSONP","error - routes haven't been initialized");return;}
if(!self._externalRoutes[name]){log("JSONP","error - routing hasn't been initialized for:",name);return;}
if(!self._externalRoutes[name].length){log("JSONP","error - no waiting requests for route:",name);return;}
var request=self._externalRoutes[name].shift();log("JSONP","request retrieved - id: ",request.id,"cb:",typeof request.cb);if(request.cb)
request.cb(data);};},_createExternalCallback:function(name,cb){window[name]=cb;},_deregisterExternalCallback:function(name,id){for(var i=0,len=this._externalRoutes[name].length;i<len;i++){var request=this._externalRoutes[name][i];if(request.id===id){log("JSONP","removing request from route:",name,"with id:",id);this._externalRoutes[name].splice(i,1);return;}}}};CVP.swfobject=function(){var UNDEF="undefined",OBJECT="object",SHOCKWAVE_FLASH="Shockwave Flash",SHOCKWAVE_FLASH_AX="ShockwaveFlash.ShockwaveFlash",FLASH_MIME_TYPE="application/x-shockwave-flash",EXPRESS_INSTALL_ID="SWFObjectExprInst",ON_READY_STATE_CHANGE="onreadystatechange",win=window,doc=document,nav=navigator,plugin=false,domLoadFnArr=[main],regObjArr=[],objIdArr=[],listenersArr=[],storedAltContent,storedAltContentId,storedCallbackFn,storedCallbackObj,isDomLoaded=false,isExpressInstallActive=false,dynamicStylesheet,dynamicStylesheetMedia,autoHideShow=true,ua=function(){var w3cdom=typeof doc.getElementById!=UNDEF&&typeof doc.getElementsByTagName!=UNDEF&&typeof doc.createElement!=UNDEF,u=nav.userAgent.toLowerCase(),p=nav.platform.toLowerCase(),windows=p?/win/.test(p):/win/.test(u),mac=p?/mac/.test(p):/mac/.test(u),webkit=/webkit/.test(u)?parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,ie=!+"\v1",playerVersion=[0,0,0],d=null;if(typeof nav.plugins!=UNDEF&&typeof nav.plugins[SHOCKWAVE_FLASH]==OBJECT){d=nav.plugins[SHOCKWAVE_FLASH].description;if(d&&!(typeof nav.mimeTypes!=UNDEF&&nav.mimeTypes[FLASH_MIME_TYPE]&&!nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)){plugin=true;ie=false;d=d.replace(/^.*\s+(\S+\s+\S+$)/,"$1");playerVersion[0]=parseInt(d.replace(/^(.*)\..*$/,"$1"),10);playerVersion[1]=parseInt(d.replace(/^.*\.(.*)\s.*$/,"$1"),10);playerVersion[2]=/[a-zA-Z]/.test(d)?parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0;}}
else if(typeof win.ActiveXObject!=UNDEF){try{var a=new ActiveXObject(SHOCKWAVE_FLASH_AX);if(a){d=a.GetVariable("$version");if(d){ie=true;d=d.split(" ")[1].split(",");playerVersion=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10)];}}}
catch(e){}}
return{w3:w3cdom,pv:playerVersion,wk:webkit,ie:ie,win:windows,mac:mac};}(),onDomLoad=function(){if(!ua.w3){return;}
if((typeof doc.readyState!=UNDEF&&doc.readyState=="complete")||(typeof doc.readyState==UNDEF&&(doc.getElementsByTagName("body")[0]||doc.body))){callDomLoadFunctions();}
if(!isDomLoaded){if(typeof doc.addEventListener!=UNDEF){doc.addEventListener("DOMContentLoaded",callDomLoadFunctions,false);}
if(ua.ie&&ua.win){doc.attachEvent(ON_READY_STATE_CHANGE,function(){if(doc.readyState=="complete"){doc.detachEvent(ON_READY_STATE_CHANGE,arguments.callee);callDomLoadFunctions();}});if(win==top){(function(){if(isDomLoaded){return;}
try{doc.documentElement.doScroll("left");}
catch(e){setTimeout(arguments.callee,0);return;}
callDomLoadFunctions();})();}}
if(ua.wk){(function(){if(isDomLoaded){return;}
if(!/loaded|complete/.test(doc.readyState)){setTimeout(arguments.callee,0);return;}
callDomLoadFunctions();})();}
addLoadEvent(callDomLoadFunctions);}}();function callDomLoadFunctions(){if(isDomLoaded){return;}
try{var t=doc.getElementsByTagName("body")[0].appendChild(createElement("span"));t.parentNode.removeChild(t);}
catch(e){return;}
isDomLoaded=true;var dl=domLoadFnArr.length;for(var i=0;i<dl;i++){domLoadFnArr[i]();}}
function addDomLoadEvent(fn){if(isDomLoaded){fn();}
else{domLoadFnArr[domLoadFnArr.length]=fn;}}
function addLoadEvent(fn){if(typeof win.addEventListener!=UNDEF){win.addEventListener("load",fn,false);}
else if(typeof doc.addEventListener!=UNDEF){doc.addEventListener("load",fn,false);}
else if(typeof win.attachEvent!=UNDEF){addListener(win,"onload",fn);}
else if(typeof win.onload=="function"){var fnOld=win.onload;win.onload=function(){fnOld();fn();};}
else{win.onload=fn;}}
function main(){if(plugin){testPlayerVersion();}
else{matchVersions();}}
function testPlayerVersion(){var b=doc.getElementsByTagName("body")[0];var o=createElement(OBJECT);o.setAttribute("type",FLASH_MIME_TYPE);var t=b.appendChild(o);if(t){var counter=0;(function(){if(typeof t.GetVariable!=UNDEF){var d=t.GetVariable("$version");if(d){d=d.split(" ")[1].split(",");ua.pv=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10)];}}
else if(counter<10){counter++;setTimeout(arguments.callee,10);return;}
b.removeChild(o);t=null;matchVersions();})();}
else{matchVersions();}}
function matchVersions(){var rl=regObjArr.length;if(rl>0){for(var i=0;i<rl;i++){var id=regObjArr[i].id;var cb=regObjArr[i].callbackFn;var cbObj={success:false,id:id};if(ua.pv[0]>0){var obj=getElementById(id);if(obj){if(hasPlayerVersion(regObjArr[i].swfVersion)&&!(ua.wk&&ua.wk<312)){setVisibility(id,true);if(cb){cbObj.success=true;cbObj.ref=getObjectById(id);cb(cbObj);}}
else if(regObjArr[i].expressInstall&&canExpressInstall()){var att={};att.data=regObjArr[i].expressInstall;att.width=obj.getAttribute("width")||"0";att.height=obj.getAttribute("height")||"0";if(obj.getAttribute("class")){att.styleclass=obj.getAttribute("class");}
if(obj.getAttribute("align")){att.align=obj.getAttribute("align");}
var par={};var p=obj.getElementsByTagName("param");var pl=p.length;for(var j=0;j<pl;j++){if(p[j].getAttribute("name").toLowerCase()!="movie"){par[p[j].getAttribute("name")]=p[j].getAttribute("value");}}
showExpressInstall(att,par,id,cb);}
else{displayAltContent(obj);if(cb){cb(cbObj);}}}}
else{setVisibility(id,true);if(cb){var o=getObjectById(id);if(o&&typeof o.SetVariable!=UNDEF){cbObj.success=true;cbObj.ref=o;}
cb(cbObj);}}}}}
function getObjectById(objectIdStr){var r=null;var o=getElementById(objectIdStr);if(o&&o.nodeName=="OBJECT"){if(typeof o.SetVariable!=UNDEF){r=o;}
else{var n=o.getElementsByTagName(OBJECT)[0];if(n){r=n;}}}
return r;}
function canExpressInstall(){return!isExpressInstallActive&&hasPlayerVersion("6.0.65")&&(ua.win||ua.mac)&&!(ua.wk&&ua.wk<312);}
function showExpressInstall(att,par,replaceElemIdStr,callbackFn){isExpressInstallActive=true;storedCallbackFn=callbackFn||null;storedCallbackObj={success:false,id:replaceElemIdStr};var obj=getElementById(replaceElemIdStr);if(obj){if(obj.nodeName=="OBJECT"){storedAltContent=abstractAltContent(obj);storedAltContentId=null;}
else{storedAltContent=obj;storedAltContentId=replaceElemIdStr;}
att.id=EXPRESS_INSTALL_ID;if(typeof att.width==UNDEF||(!/%$/.test(att.width)&&parseInt(att.width,10)<310)){att.width="310";}
if(typeof att.height==UNDEF||(!/%$/.test(att.height)&&parseInt(att.height,10)<137)){att.height="137";}
doc.title=doc.title.slice(0,47)+" - Flash Player Installation";var pt=ua.ie&&ua.win?"ActiveX":"PlugIn",fv="MMredirectURL="+win.location.toString().replace(/&/g,"%26")+"&MMplayerType="+pt+"&MMdoctitle="+doc.title;if(typeof par.flashvars!=UNDEF){par.flashvars+="&"+fv;}
else{par.flashvars=fv;}
if(ua.ie&&ua.win&&obj.readyState!=4){var newObj=createElement("div");replaceElemIdStr+="SWFObjectNew";newObj.setAttribute("id",replaceElemIdStr);obj.parentNode.insertBefore(newObj,obj);obj.style.display="none";(function(){if(obj.readyState==4){obj.parentNode.removeChild(obj);}
else{setTimeout(arguments.callee,10);}})();}
createSWF(att,par,replaceElemIdStr);}}
function displayAltContent(obj){if(ua.ie&&ua.win&&obj.readyState!=4){var el=createElement("div");obj.parentNode.insertBefore(el,obj);el.parentNode.replaceChild(abstractAltContent(obj),el);obj.style.display="none";(function(){if(obj.readyState==4){obj.parentNode.removeChild(obj);}
else{setTimeout(arguments.callee,10);}})();}
else{obj.parentNode.replaceChild(abstractAltContent(obj),obj);}}
function abstractAltContent(obj){var ac=createElement("div");if(ua.win&&ua.ie){ac.innerHTML=obj.innerHTML;}
else{var nestedObj=obj.getElementsByTagName(OBJECT)[0];if(nestedObj){var c=nestedObj.childNodes;if(c){var cl=c.length;for(var i=0;i<cl;i++){if(!(c[i].nodeType==1&&c[i].nodeName=="PARAM")&&!(c[i].nodeType==8)){ac.appendChild(c[i].cloneNode(true));}}}}}
return ac;}
function createSWF(attObj,parObj,id){var r,el=getElementById(id);if(ua.wk&&ua.wk<312){return r;}
if(el){if(typeof attObj.id==UNDEF){attObj.id=id;}
if(ua.ie&&ua.win){var att="";for(var i in attObj){if(attObj[i]!=Object.prototype[i]){if(i.toLowerCase()=="data"){parObj.movie=attObj[i];}
else if(i.toLowerCase()=="styleclass"){att+=' class="'+attObj[i]+'"';}
else if(i.toLowerCase()!="classid"){att+=' '+i+'="'+attObj[i]+'"';}}}
var par="";for(var j in parObj){if(parObj[j]!=Object.prototype[j]){par+='<param name="'+j+'" value="'+parObj[j]+'" />';}}
el.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+att+'>'+par+'</object>';objIdArr[objIdArr.length]=attObj.id;r=getElementById(attObj.id);}
else{var o=createElement(OBJECT);o.setAttribute("type",FLASH_MIME_TYPE);for(var m in attObj){if(attObj[m]!=Object.prototype[m]){if(m.toLowerCase()=="styleclass"){o.setAttribute("class",attObj[m]);}
else if(m.toLowerCase()!="classid"){o.setAttribute(m,attObj[m]);}}}
for(var n in parObj){if(parObj[n]!=Object.prototype[n]&&n.toLowerCase()!="movie"){createObjParam(o,n,parObj[n]);}}
el.parentNode.replaceChild(o,el);r=o;}}
return r;}
function createObjParam(el,pName,pValue){var p=createElement("param");p.setAttribute("name",pName);p.setAttribute("value",pValue);el.appendChild(p);}
function removeSWF(id){var obj=getElementById(id);if(obj&&obj.nodeName=="OBJECT"){if(ua.ie&&ua.win){obj.style.display="none";(function(){if(obj.readyState==4){removeObjectInIE(id);}
else{setTimeout(arguments.callee,10);}})();}
else{obj.parentNode.removeChild(obj);}}}
function removeObjectInIE(id){var obj=getElementById(id);if(obj){for(var i in obj){if(typeof obj[i]=="function"){obj[i]=null;}}
obj.parentNode.removeChild(obj);}}
function getElementById(id){var el=null;try{el=doc.getElementById(id);}
catch(e){}
return el;}
function createElement(el){return doc.createElement(el);}
function addListener(target,eventType,fn){target.attachEvent(eventType,fn);listenersArr[listenersArr.length]=[target,eventType,fn];}
function hasPlayerVersion(rv){var pv=ua.pv,v=rv.split(".");v[0]=parseInt(v[0],10);v[1]=parseInt(v[1],10)||0;v[2]=parseInt(v[2],10)||0;return(pv[0]>v[0]||(pv[0]==v[0]&&pv[1]>v[1])||(pv[0]==v[0]&&pv[1]==v[1]&&pv[2]>=v[2]))?true:false;}
function createCSS(sel,decl,media,newStyle){if(ua.ie&&ua.mac){return;}
var h=doc.getElementsByTagName("head")[0];if(!h){return;}
var m=(media&&typeof media=="string")?media:"screen";if(newStyle){dynamicStylesheet=null;dynamicStylesheetMedia=null;}
if(!dynamicStylesheet||dynamicStylesheetMedia!=m){var s=createElement("style");s.setAttribute("type","text/css");s.setAttribute("media",m);dynamicStylesheet=h.appendChild(s);if(ua.ie&&ua.win&&typeof doc.styleSheets!=UNDEF&&doc.styleSheets.length>0){dynamicStylesheet=doc.styleSheets[doc.styleSheets.length-1];}
dynamicStylesheetMedia=m;}
if(ua.ie&&ua.win){if(dynamicStylesheet&&typeof dynamicStylesheet.addRule==OBJECT){dynamicStylesheet.addRule(sel,decl);}}
else{if(dynamicStylesheet&&typeof doc.createTextNode!=UNDEF){dynamicStylesheet.appendChild(doc.createTextNode(sel+" {"+decl+"}"));}}}
function setVisibility(id,isVisible){if(!autoHideShow){return;}
var v=isVisible?"visible":"hidden";if(isDomLoaded&&getElementById(id)){getElementById(id).style.visibility=v;}
else{createCSS("#"+id,"visibility:"+v);}}
function urlEncodeIfNecessary(s){var regex=/[\\\"<>\.;]/;var hasBadChars=regex.exec(s)!=null;return hasBadChars&&typeof encodeURIComponent!=UNDEF?encodeURIComponent(s):s;}
var cleanup=function(){if(ua.ie&&ua.win){window.attachEvent("onunload",function(){var ll=listenersArr.length;for(var i=0;i<ll;i++){listenersArr[i][0].detachEvent(listenersArr[i][1],listenersArr[i][2]);}
var il=objIdArr.length;for(var j=0;j<il;j++){removeSWF(objIdArr[j]);}
for(var k in ua){ua[k]=null;}
ua=null;for(var l in CVP.swfobject){CVP.swfobject[l]=null;}
CVP.swfobject=null;});}}();return{registerObject:function(objectIdStr,swfVersionStr,xiSwfUrlStr,callbackFn){if(ua.w3&&objectIdStr&&swfVersionStr){var regObj={};regObj.id=objectIdStr;regObj.swfVersion=swfVersionStr;regObj.expressInstall=xiSwfUrlStr;regObj.callbackFn=callbackFn;regObjArr[regObjArr.length]=regObj;setVisibility(objectIdStr,false);}
else if(callbackFn){callbackFn({success:false,id:objectIdStr});}},getObjectById:function(objectIdStr){if(ua.w3){return getObjectById(objectIdStr);}},embedSWF:function(swfUrlStr,replaceElemIdStr,widthStr,heightStr,swfVersionStr,xiSwfUrlStr,flashvarsObj,parObj,attObj,callbackFn){var callbackObj={success:false,id:replaceElemIdStr};if(ua.w3&&!(ua.wk&&ua.wk<312)&&swfUrlStr&&replaceElemIdStr&&widthStr&&heightStr&&swfVersionStr){setVisibility(replaceElemIdStr,false);addDomLoadEvent(function(){widthStr+="";heightStr+="";var att={};if(attObj&&typeof attObj===OBJECT){for(var i in attObj){att[i]=attObj[i];}}
att.data=swfUrlStr;att.width=widthStr;att.height=heightStr;var par={};if(parObj&&typeof parObj===OBJECT){for(var j in parObj){par[j]=parObj[j];}}
if(flashvarsObj&&typeof flashvarsObj===OBJECT){for(var k in flashvarsObj){if(typeof par.flashvars!=UNDEF){par.flashvars+="&"+k+"="+flashvarsObj[k];}
else{par.flashvars=k+"="+flashvarsObj[k];}}}
if(hasPlayerVersion(swfVersionStr)){var obj=createSWF(att,par,replaceElemIdStr);if(att.id==replaceElemIdStr){setVisibility(replaceElemIdStr,true);}
callbackObj.success=true;callbackObj.ref=obj;}
else if(xiSwfUrlStr&&canExpressInstall()){att.data=xiSwfUrlStr;showExpressInstall(att,par,replaceElemIdStr,callbackFn);return;}
else{setVisibility(replaceElemIdStr,true);}
if(callbackFn){callbackFn(callbackObj);}});}
else if(callbackFn){callbackFn(callbackObj);}},switchOffAutoHideShow:function(){autoHideShow=false;},ua:ua,getFlashPlayerVersion:function(){return{major:ua.pv[0],minor:ua.pv[1],release:ua.pv[2]};},hasFlashPlayerVersion:hasPlayerVersion,createSWF:function(attObj,parObj,replaceElemIdStr){if(ua.w3){return createSWF(attObj,parObj,replaceElemIdStr);}
else{return undefined;}},showExpressInstall:function(att,par,replaceElemIdStr,callbackFn){if(ua.w3&&canExpressInstall()){showExpressInstall(att,par,replaceElemIdStr,callbackFn);}},removeSWF:function(objElemIdStr){if(ua.w3){removeSWF(objElemIdStr);}},createCSS:function(selStr,declStr,mediaStr,newStyleBoolean){if(ua.w3){createCSS(selStr,declStr,mediaStr,newStyleBoolean);}},addDomLoadEvent:addDomLoadEvent,addLoadEvent:addLoadEvent,getQueryParamValue:function(param){var q=doc.location.search||doc.location.hash;if(q){if(/\?/.test(q)){q=q.split("?")[1];}
if(param==null){return urlEncodeIfNecessary(q);}
var pairs=q.split("&");for(var i=0;i<pairs.length;i++){if(pairs[i].substring(0,pairs[i].indexOf("="))==param){return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=")+1)));}}}
return"";},expressInstallCallback:function(){if(isExpressInstallActive){var obj=getElementById(EXPRESS_INSTALL_ID);if(obj&&storedAltContent){obj.parentNode.replaceChild(storedAltContent,obj);if(storedAltContentId){setVisibility(storedAltContentId,true);if(ua.ie&&ua.win){storedAltContent.style.display="block";}}
if(storedCallbackFn){storedCallbackFn(storedCallbackObj);}}
isExpressInstallActive=false;}}};}();CVP.authSessionToken="";CVP.getSessionToken=function(){if(typeof Aspen!=="undefined"&&typeof Aspen.initialized!=="undefined"&&Aspen.sessionToken!==""){CVP.authSessionToken=Aspen.sessionToken;}else if(CVP.authSessionToken===""){CVP.authSessionToken=CVP.Utils.randomString(25);}
return CVP.authSessionToken;};var bind=CVP.Utils.bind;var byId=CVP.Utils.byId;var empty=CVP.Utils.empty;var extend=CVP.Utils.extend;var hasOwn=CVP.Utils.hasOwn;var isFlagActive=CVP.Utils.isFlagActive;var isFunc=CVP.Utils.isFunc;var isString=CVP.Utils.isString;var joinKeys=CVP.Utils.joinKeys;var nil=CVP.Utils.isNull;var now=CVP.Utils.now;var print=CVP.Utils.print;var slice=CVP.Utils.slice;var template=CVP.Utils.template;var undef=CVP.Utils.undef;var isRelativePath=CVP.Utils.isRelativePath;var Asset=CVP.Utils.Asset;var CommandQueue=CVP.Utils.CommandQueue;var Event=CVP.Events.CustomEvent;var log=CVP.Utils.log;(function(){var ConditionalTask=function(condition,success,interval){this._interval=nil(interval)?10:interval;this._maxTries=500;this._condition=condition;this._success=success;this._tries=0;this.conditionWrapper=bind(function(){var ret=this._condition();if(ret)
{clearInterval(this._timer);this._success();}
else if(this._tries>this._maxTries)
{log("condition never met!");clearInterval(this._timer);}
++this._tries;},this);this.start=function(){this._timer=setInterval(this.conditionWrapper,this._interval);};};var Utils={replaceExtension:function(str,find,replace){if(empty(str))
return str;return str.replace(new RegExp(find+"$","i"),replace);}};var ConfigUtils={stringReplace:function(str,entry,uriEncode){var patterns=this.getReplacementPatterns(str),i=0,endi=0,pattern,replaceStr="";if(!empty(patterns)){for(endi=patterns.length;i<endi;++i)
{pattern=patterns[i];replaceStr="";replaceStr=this.getReplacementText(pattern,entry);if(empty(replaceStr))
replaceStr="";else if(uriEncode)
replaceStr=encodeURI(replaceStr);str=str.replace(pattern,replaceStr);}}
return str;},getReplacementPatterns:function(str){return(str&&str.match(/[$][{][^}]*[}]/g));},getReplacementText:function(pattern,entry){var replaceStr="",nodeName="",array=[],objName="";switch(pattern)
{case"${page.domain}":if(player)
replaceStr=document.domain;break;case"${page.url}":replaceStr=location.href;break;case"${videoId}":case"${video.id}":if(entry)
replaceStr=entry.getId();break;default:nodeName=pattern.substr(2,pattern.length-3);array=nodeName.split('.');objName=array[0];if(array.length>1)
{nodeName=nodeName.substr(objName.length+1);switch(objName)
{case"video":if(entry)
replaceStr=XMLUtils.getNodeValue(entry._xmlEntry,nodeName);break;case"javascript":if(window.cvpSearchTheClient){replaceStr=window.cvpSearchTheClient(null,nodeName);}
break;default:replaceStr=pattern;break;}}
else
replaceStr=pattern;}
return replaceStr;}};var Loader=Class.extend({init:function(){this.eLoaded=new Event("LoadedEvent");this.eLoadError=new Event("LoadErrorEvent");},load:function(url,options){var self=this;options=extend({ajax:{}},options||{});var success=function(data){log("Loader","success:",url);self.eLoaded.dispatch(data);};var error=function(requestObj,textStatus,errorThrown){log("Loader","error:",url,"text:",textStatus);self.eLoadError.dispatch(requestObj,textStatus,errorThrown);};var ajaxOptions=extend({success:success,error:error},options.ajax);ajaxOptions.url=url;this._sendRequest(ajaxOptions);},_sendRequest:function(ajaxOptions){CVP.Ajax.get(ajaxOptions);}});var JSONPLoader=Loader.extend({init:function(){this._super();},_sendRequest:function(ajaxOptions){CVP.Ajax.getJSONP(ajaxOptions);}});var XMLLoader=Class.extend({init:function(){this._loader=new Loader();this._loader.eLoaded.addListener(this._onLoaded,this);this._loader.eLoadError.addListener(this._onLoadError,this);this.eLoaded=new Event();this.eLoadError=new Event();},load:function(url,options){this._loader.load(url,options);},_onLoaded:function(xmlStr){xmlStr=XMLUtils.clean(xmlStr);var xDoc=XMLUtils.createDoc(xmlStr);log("XMLLoader","XML loaded");this.eLoaded.dispatch(xDoc);},_onLoadError:function(requestObj,textStatus,errorThrown){log("XMLParser","onLoadError:",textStatus);if(textStatus==="parsererror"){log("XMLParser","ParseError...attempting to create an xml doc manually");var xmlStr=requestObj.responseText;xmlStr=XMLUtils.clean(xmlStr);var xDoc=XMLUtils.createDoc(xmlStr);if(xDoc)
this.eLoaded.dispatch(xDoc);else
this.eLoadError.dispatch(requestObj,textStatus,errorThrown);}}});var UberLoader=Class.extend({init:function(){this._loader=null;this.eLoaded=new Event();this.eLoadError=new Event();},load:function(url,options){this._createLoader(url);this._loader.load(url,options);},_createLoader:function(url){if(this._loader)
this._destroyLoader();var ext=this._getFileType(url);switch(ext){case"xml":this._loader=new XMLLoader();break;case"json":this._loader=new JSONPLoader();break;default:this._loader=new Loader();break;}
this._loader.eLoaded.addListener(this._onLoaded,this);this._loader.eLoadError.addListener(this._onLoadError,this);},_getFileType:function(url){var match=String(url).match(/\.([^.?#]+)(?:[?#]|$)/);var ext=match?match[1]:"";return ext;},_destroyLoader:function(){this._loader.eLoaded.removeListener(this._onLoaded,this);this._loader.eLoadError.removeListener(this._onLoadError,this);this._loader=null;},_onLoaded:function(data){this.eLoaded.dispatch(data);},_onLoadError:function(requestObj,textStatus,errorThrown){this.eLoadError.dispatch(requestObj,textStatus,errorThrown);}});var Parser=Class.extend({init:function(){this._loader=this._createLoader();this._loader.eLoaded.addListener(this.onLoaded,this);this._loader.eLoadError.addListener(this.onLoadError,this);this.eParseCompleted=new Event();this.eParseError=new Event();},_createLoader:function(){return new UberLoader();},parse:function(url){log("Parser","Loading the file to parse",url);this.load(url);},load:function(url,options){this._loader.load(url,options);},onLoaded:function(data){log("Parser","Data loaded");this.parseData(data);},onLoadError:function(requestObj,textStatus,errorThrown){log("Parser","onLoadError:",textStatus);this._fireLoadedFailure();},parseData:function(xml){},_fireLoadedSuccess:function()
{log("Parser","successfully Loaded asset");this.eParseCompleted.dispatch();},_fireLoadedFailure:function()
{log("Parser","failed to Load asset");this.eParseError.dispatch();}});var XMLUtils={createDoc:(undef(window.DOMParser)?function(xmlString){if(empty(xmlString))return null;var xDoc=new ActiveXObject("MSXML2.DOMDocument");xDoc.async=false;xDoc.loadXML(xmlString);return xDoc;}:function(xmlString){if(empty(xmlString))return null;var parser=new DOMParser();var xDoc=parser.parseFromString(xmlString,"text/xml");return xDoc;}),clean:function(xmlString){xmlString=xmlString.replace(/>\s+</g,"><");xmlString=xmlString.replace(/\t+/g," ");xmlString=xmlString.replace(/[\r\n]+/g," ");xmlString=xmlString.replace(/<!--(.*?)-->/g,"");xmlString=xmlString.replace(/&/g,"&amp;");while(xmlString.indexOf('xmlns')>-1){var start=xmlString.indexOf('xmlns');var firstQuote=xmlString.indexOf('"',start);var endQuote=xmlString.indexOf('"',firstQuote+1);xmlString=xmlString.slice(0,start)+xmlString.slice(endQuote+1);}
return xmlString;},getNodeValue:function(doc,nodeName){if(doc)
{if(!nodeName)
return(!nil(doc.firstChild)?doc.firstChild.nodeValue:null);var nodes=doc.getElementsByTagName(nodeName);if(nodes.length>0&&nodes[0].firstChild)
return nodes[0].firstChild.nodeValue;}
return null;},getParamValue:function(doc,paramName){var nodes,i=0,endi=0;if(doc)
{if(!paramName)
return null;nodes=doc.getElementsByTagName("param");for(endi=nodes.length;i<endi;++i){if(this.getAttribute(nodes[i],"name")===paramName){return this.getAttribute(nodes[i],"value");}}}
return null;},getAttribute:function(node,attrName){if(node&&node.attributes&&!empty(attrName))
{var attr=node.attributes.getNamedItem(attrName);return attr?attr.nodeValue:null;}},assignAttributes:function(obj,attributes)
{var a=0,end=(attributes&&attributes.length)||0,attr;for(;a<end;++a)
{attr=attributes[a];obj[attr.nodeName]=attr.nodeValue;}},toString:function(xmlDoc){if(undef(window.XMLSerializer))
{this.toString=function(xmlDoc){return xmlDoc.xml;};}
else
{this.toString=function(xmlDoc){return new XMLSerializer().serializeToString(xmlDoc);};}
return this.toString(xmlDoc);}};var DependencyMananger=Class.extend({init:function()
{this._dependencies=[];this._currentDependency=null;this.eSuccess=new Event();this.eFailure=new Event();this.eDependencySuccess=new Event();this.eDependencyFailure=new Event();},addDependency:function(dependency)
{dependency.setManager(this);this._dependencies.push(dependency);},load:function()
{this._currentDependency=this._dependencies.shift();this._currentDependency.eSuccess.addListener(this._onDependencySuccess,this);this._currentDependency.eFailure.addListener(this._onDependencyFailure,this);var self=this;setTimeout(function(){self._currentDependency.load();},10);},_onDependencySuccess:function()
{this.eDependencySuccess.dispatch(this._currentDependency.getDesc());this._next();},_onDependencyFailure:function()
{this.eDependencyFailure.dispatch(this._currentDependency.getDesc());if(this._currentDependency.required)
{this._onFailure(this._currentDependency.getDesc());return;}
this._next();},_next:function()
{if(this._dependencies.length)
this.load();else
this._onSuccess();},_onSuccess:function(desc)
{this.eSuccess.dispatch(desc);},_onFailure:function(desc)
{this.eFailure.dispatch(desc);}});var Dependency=Class.extend({init:function(assetUrl,required)
{this._assetUrl=assetUrl;this.required=required;this._manager=null;this.eSuccess=new Event();this.eFailure=new Event();},load:function()
{log("Dependency","loading asset",this._assetUrl);var assetLoader=new Asset(this._assetUrl);assetLoader.eSuccess.addListener(this._success,this);assetLoader.eFailure.addListener(this._failure,this);assetLoader.load();},_success:function()
{log("Dependency","successfully loaded dependency",this._assetUrl);this.eSuccess.dispatch();},_failure:function()
{log("Dependency","failed to load dependency",this._assetUrl);this.eFailure.dispatch();},setManager:function(manager)
{this._manager=manager;},getDesc:function()
{return this._assetUrl;}});var BootStrapper=(function(){var _params={},_mapping={},_appConfig={},_containerInfo={},_configInfo={omniture:{},share:{},embed:{}},_adPolicy={ads:{attr:{type:"NONE"}}};var MappingParser=Parser.extend({init:function(){this._super();},load:function(url){var options={ajax:{jsonpCallback:"cvp_onMappingReceived"}};this._super(url,options);},parseData:function(data){var mappings,profile,map;if(undef(data)||undef(data.mappings)){this.eParseError.dispatch();return;}
mappings=data.mappings;profile=_params.profile;for(map in mappings){if(mappings[map].profile===profile){break;}}
_mapping=mappings[map];this._fireLoadedSuccess();}});var AppConfigParser=Parser.extend({init:function(){this._super();},load:function(url){var options={ajax:{jsonpCallback:"cvp_onAppConfigReceived"}};this._super(url,options);},parseData:function(data){_appConfig=data.appConfig;this._fireLoadedSuccess();}});var ContainerParser=Parser.extend({init:function(){this._super();},parseData:function(xml){var self=this,i=0,endi=0,docElement=xml.documentElement,contextName=_params.context||"",elementName=_params.element||"",contexts=null,context=null,element=null,node=null,policies=null,adPolicySrc=null,adPolicyContext=null,playerWidth=null,playerHeight=null,playerX=null,playerY=null;defaultNode=docElement.getElementsByTagName("default");policies=(defaultNode.length&&defaultNode[0].getElementsByTagName("policies"))||[];if(policies.length){adPolicySrc=XMLUtils.getParamValue(policies[0],"adPolicySrc");adPolicyContext=XMLUtils.getParamValue(policies[0],"adPolicyContext");}
_containerInfo.elementName=elementName;_containerInfo.adPolicySrc=adPolicySrc;_containerInfo.adPolicyContext=adPolicyContext;contexts=docElement.getElementsByTagName("context");for(endi=contexts.length;i<endi;++i)
{if(XMLUtils.getAttribute(contexts[i],"name")===contextName)
{context=contexts[i];break;}}
if(context)
{var elements=context.getElementsByTagName("element");for(i=0,endi=elements.length;i<endi;++i){if(XMLUtils.getAttribute(elements[i],"id")===elementName){element=elements[i];break;}}
if(!element)element=elements[0];if(element){elementName=XMLUtils.getAttribute(element,"id");policies=element.getElementsByTagName("policies");if(policies.length>0){adPolicySrc=XMLUtils.getParamValue(policies[0],"adPolicySrc");adPolicyContext=XMLUtils.getParamValue(policies[0],"adPolicyContext");}
var players=element.getElementsByTagName("player");var playerName=XMLUtils.getAttribute(players[players.length-1],"playerInstance");if(empty(playerName))
playerName=contextName;_containerInfo.playerInstance=playerName;}}
if(!empty(elementName)){_containerInfo.elementName=elementName;}
if(!empty(adPolicySrc)){_containerInfo.adPolicySrc=adPolicySrc;}
if(!empty(adPolicyContext)){_containerInfo.adPolicyContext=adPolicyContext;}
CVP.Utils.print(_containerInfo,"_containerInfo");this._fireLoadedSuccess();},parseParams:function(obj,name,value){switch(name)
{case"adPolicySrc":obj.adPolicySrc=value;break;case"adPolicyContext":obj.adPolicyContext=value;break;default:obj[name]=value;}}});var ConfigParser=Parser.extend({init:function(){this._super();},parseData:function(xml){var self=this,docElement=xml.documentElement,playerInstanceName=_containerInfo.playerInstance||"",player=null,players=docElement.getElementsByTagName("player"),node,process;while(players.length){node=players[players.length-1];if(XMLUtils.getAttribute(node,"name")===playerInstanceName)
{player=node.cloneNode(true);}
docElement.removeChild(node);}
process=function(xml,objToAssign){if(nil(xml))
return;var childNodes=xml.childNodes,xmlLength=childNodes.length,childNode,obj,i=0;for(;i<xmlLength;++i){childNode=childNodes[i];obj=self.findMapping(childNode.nodeName);if(!nil(obj))
{self.parseAttributes(obj,childNode);if(childNode.childNodes.length)
{process(childNode,obj);}}
else if(childNode.nodeName==="param")
{self.parseParams(objToAssign,XMLUtils.getAttribute(childNode,"name"),XMLUtils.getAttribute(childNode,"value"));}}};defaultNode=docElement.getElementsByTagName("default");if(defaultNode.length>0){process(defaultNode[0],_configInfo);}
if(!nil(player))
{process(player,_configInfo);}
CVP.Utils.print(_configInfo,"_configInfo");players=player=childNodes=childNode=null;this._fireLoadedSuccess();},parseParams:function(obj,name,value){switch(name)
{default:obj[name]=value;}},parseAttributes:function(obj,node)
{if(node.hasAttributes)
{if(!obj.attr)
obj.attr={};XMLUtils.assignAttributes(obj.attr,node.attributes);}},findMapping:function(nodeName){var obj=null;switch(nodeName)
{default:obj=null;}
return obj;}});var AdPolicyParser=Parser.extend({init:function(){this._super();},parseData:function(xml){var self=this,i=0,docElement=xml.documentElement,adContextName=_containerInfo.adPolicyContext||"",context=null,contexts=docElement.getElementsByTagName("context"),endi=contexts.length||0,node,process,defaultNode;for(;i<endi;++i)
{if(XMLUtils.getAttribute(contexts[i],"name")===adContextName)
{context=contexts[i];break;}}
process=function(xml,objToAssign){if(nil(xml))
return;var childNodes=xml.childNodes,xmlLength=childNodes.length,childNode,obj,i=0;for(;i<xmlLength;++i)
{childNode=childNodes[i];obj=self.findMapping(childNode.nodeName);if(!nil(obj))
{self.parseAttributes(obj,childNode);if(childNode.childNodes.length)
{process(childNode,obj);}}
else if(childNode.nodeName==="param")
{self.parseParams(objToAssign,XMLUtils.getAttribute(childNode,"name"),XMLUtils.getAttribute(childNode,"value"));}}};defaultNode=docElement.getElementsByTagName("default");if(defaultNode.length!==0){process(defaultNode[0],_adPolicy);}
if(!nil(context))
{process(context,_adPolicy);}
CVP.Utils.print(_adPolicy,"_adPolicy");contexts=context=childNodes=childNode=null;this._fireLoadedSuccess();},parseParams:function(obj,name,value){switch(name)
{case"adApi":obj.apiUrl=value;break;case"adManRootUrl":obj.adManRootUrl=value;break;case"adServerRootUrl":obj.adServerRootUrl=value;break;case"adVideoRootUrl":obj.adVideoRootUrl=value;break;case"adVideoExtension":obj.adVideoExtension=value;break;case"additionalVideoSegvars":obj.additionalVideoSegVars=value;break;case"additionalSyncSegvars":obj.additionalSyncSegVars=value;break;case"adSection":obj.adSection=value;break;case"adNetworkId":obj.adNetworkId=value;break;case"adVideoNetworkId":obj.adVideoNetworkId=value;break;case"adVideoAssetId":obj.adVideoAssetId=value;break;case"adPlayerProfile":obj.adPlayerProfile=value;break;case"renderersUrl":obj.renderersUrl=value;break;case"externalSlots":obj.externalSlots=isFlagActive(value,obj.externalSlots);break;case"adLiveContentDuration":obj.liveDuration=value;break;default:obj[name]=value;}},parseAttributes:function(obj,node)
{if(node.hasAttributes)
{if(!obj.attr)
obj.attr={};XMLUtils.assignAttributes(obj.attr,node.attributes);}},findMapping:function(nodeName){var obj=null;switch(nodeName)
{case"adServer":obj=_adPolicy.ads;break;}
return obj;}});var MappingDependency=Dependency.extend({init:function()
{this._super.apply(this,arguments);this.required=true;this._parser=new MappingParser();this._parser.eParseCompleted.addListener(this._onParseCompleted,this);this._parser.eParseError.addListener(this._onParseError,this);},load:function()
{log("MappingDependency","loading xml",this._assetUrl);this._parser.parse(this._assetUrl);},_onParseCompleted:function()
{if(!_mapping||empty(_mapping.url)){log("Unable to retrieve the mapping file.");this._failure();return;}
var appConfigUrl=Utils.replaceExtension(_mapping.url,"xml","json");this._manager.addDependency(new AppConfigDependency(appConfigUrl,true));this._success();},_onParseError:function()
{this._failure();},getDesc:function()
{return"MappingDependency: "+this._assetUrl;}});var AppConfigDependency=Dependency.extend({init:function()
{this._super.apply(this,arguments);this.required=true;this._parser=new AppConfigParser();this._parser.eParseCompleted.addListener(this._onParseCompleted,this);this._parser.eParseError.addListener(this._onParseError,this);},load:function()
{log("AppConfigDependency","loading xml",this._assetUrl);this._parser.parse(this._assetUrl);},_onParseCompleted:function()
{if(!_appConfig||empty(_appConfig.containerUrl)||empty(_appConfig.configUrl))
{log("Unable to retrieve the appConfig file.");this._failure();return;}
this._manager.addDependency(new ContainerDependency(_appConfig.containerUrl,true));this._manager.addDependency(new ConfigDependency(_appConfig.configUrl,true));this._success();},_onParseError:function()
{this._failure();},getDesc:function()
{return"AppConfigDependency: "+this._assetUrl;}});var ContainerDependency=Dependency.extend({init:function()
{this._super.apply(this,arguments);this.required=true;this._parser=new ContainerParser();this._parser.eParseCompleted.addListener(this._onParseCompleted,this);this._parser.eParseError.addListener(this._onParseError,this);},load:function()
{log("ContainerDependency","loading xml",this._assetUrl);this._parser.parse(this._assetUrl);},_onParseCompleted:function()
{if(!empty(_containerInfo.adPolicySrc)){this._manager.addDependency(new AdPolicyDependency(_containerInfo.adPolicySrc,true));}
this._success();},_onParseError:function()
{this._failure();},getDesc:function()
{return"ContainerDependency: "+this._assetUrl;}});var ConfigDependency=Dependency.extend({init:function()
{this._super.apply(this,arguments);this.required=true;this._parser=new ConfigParser();this._parser.eParseCompleted.addListener(this._onParseCompleted,this);this._parser.eParseError.addListener(this._onParseError,this);},load:function()
{this._parser.parse(this._assetUrl);},_onParseCompleted:function()
{if(this._manager)
{if(!empty(_configInfo.omniture.omniture_account))
{log("ContainerDependency","adding Omniture dependency");}}
this._success();},_onParseError:function()
{this._failure();},getDesc:function()
{return"ConfigDependency: "+this._assetUrl;}});var AdPolicyDependency=Dependency.extend({init:function()
{this._super.apply(this,arguments);this.required=true;this._parser=new AdPolicyParser();this._parser.eParseCompleted.addListener(this._onParseCompleted,this);this._parser.eParseError.addListener(this._onParseError,this);},load:function()
{log("AdPolicyDependency","loading xml",this._assetUrl);this._parser.parse(this._assetUrl);},_onParseCompleted:function()
{var type=_adPolicy.ads.attr.type.toLowerCase();if(type==="freewheel")
{log("ContainerDependency","adding FW dependency");this._manager.addDependency(new Dependency(_params.freewheelJsUrl,true));}else if(type==="dfp"){log("ContainerDependency","adding DFP dependency");this._manager.addDependency(new Dependency(AD_DFP_URL,true));}
this._success();},_onParseError:function()
{this._failure();},getDesc:function()
{return"AdPolicyDependency: "+this._assetUrl;}});var BootStrapper=Class.extend({init:function(mappingUrl,params){this._mappingUrl=mappingUrl;_params=params||{};this.eSuccess=new Event();this.eFailure=new Event();},load:function(){this._bootStrapper=new DependencyMananger();this._bootStrapper.addDependency(new MappingDependency(this._mappingUrl),true);this._bootStrapper.eSuccess.addListener(this._success,this);this._bootStrapper.eFailure.addListener(this._failure,this);this._bootStrapper.load();},_success:function()
{var event={data:{mapping:_mapping,appConfig:_appConfig,containerInfo:_containerInfo,configInfo:_configInfo,adPolicy:_adPolicy}};this.eSuccess.dispatch(event);},_failure:function(){this.eFailure.dispatch();}});return BootStrapper;})();var CMS=Class.extend({init:function(){this._catalogDataURL="";this._mediaUrl="";this._requestPendingQueue=[];this._videoCatalog=[];this._requests={};this._loader=new XMLLoader();this._loader.eLoaded.addListener(this._onContentIdRequestComplete,this);this._loader.eLoadError.addListener(this._onContentIdRequestIOError,this);this.eRequestCompleted=new Event("CmsRequestCompletedEvent");},addContentId:function(contentId){var entry=this.getContentId(contentId);if(nil(entry))
this._requestPendingQueue.push(contentId);else{var index=contentId.split("|")[1];contentId=contentId.split("|")[0];this._notifyListeners(contentId,contentId,index);}
if(this._requestPendingQueue.length===1)
this._processNextRequest();},getContentId:function(contentId){contentId=contentId.split("|")[0];var i=0,ct=this._videoCatalog.length;for(;i<ct;++i)
{var entry=this._videoCatalog[i];if(entry.getId()===contentId)
return entry;}
return null;},clear:function(){this._videoCatalog=[];},setDataUrl:function(url){this._catalogDataURL=url;},setMediaUrl:function(url){this._mediaUrl=url;},_getRequestUrl:function(contentId){var requestUrl;var start=this._catalogDataURL.substr(0).search(/\$\{/);if(start!==-1)
{var end=this._catalogDataURL.substr(start).search(/\}/);if(end!==-1)
{var pattern=this._catalogDataURL.substr(start,end+1);requestUrl=this._catalogDataURL.replace(pattern,contentId);}}
else
{requestUrl=this._catalogDataURL+"/"+contentId+".xml";}
return requestUrl;},_createContentEntryFromRequestData:function(requestData,contentId){try
{var entry=new ContentCatalogEntry(requestData);entry.setMediaUrl(this._mediaUrl);return entry;}
catch(e)
{alert(this._getRequestUrl(contentId)+": "+e.message);}
return null;},_processNextRequest:function(){if(this._requestPendingQueue.length>0)
{var contentId=this._requestPendingQueue[0].split("|")[0];this._requestVideoWithId(contentId);}},_requestVideoWithId:function(contentId){var url=this._getRequestUrl(contentId);this._loader.load(url);},_onContentIdRequestComplete:function(data){var request=this._requestPendingQueue[0].split("|");var contentId=request[0];var requestIndex=request[1];if(data)
{var entry=this._createContentEntryFromRequestData(data,contentId);if(!entry)
{this._notifyListeners(contentId,contentId,requestIndex,"No URLLoader");}
else
{entry.requestId=contentId;this._videoCatalog.push(entry);this._notifyListeners(entry.getId(),entry.requestId,requestIndex,"");}}
else
{this._notifyListeners(contentId,contentId,requestIndex,"No URLLoader");}
this._requestPendingQueue.shift();this._processNextRequest();},_onContentIdRequestIOError:function(){var request=this._requestPendingQueue[0].split("|");var contentId=request[0];var requestIndex=request[1];this._notifyListeners(contentId,contentId,"IOError : "+event.text);this._requestPendingQueue.shift();this._processNextRequest();},_notifyListeners:function(contentId,requestId,index,errorMsg){this.eRequestCompleted.dispatch(contentId,requestId,index,errorMsg);}});var ContentCatalogEntry=Class.extend({init:function(xml){var anchor,files,f,file,fKey,fFallback,fValue,path,ext,images,image,iWidth,iHeight,iKey,iValue,lastDot,ads,ad,adKey,adValue;anchor=document.createElement('a');this._xmlEntry=xml.documentElement;this._requestId=null;this._mediaUrl="";this._name=XMLUtils.getNodeValue(this._xmlEntry,"slug");this._title=XMLUtils.getNodeValue(this._xmlEntry,"headline");this._category=XMLUtils.getNodeValue(this._xmlEntry,"category");this._trt=+XMLUtils.getNodeValue(this._xmlEntry,"trt");files=this._xmlEntry.getElementsByTagName("files");if(files.length)
{files=files[0].childNodes;this._fileList={};for(f in files)
{file=files[f];if(file.nodeType!==1||file.nodeName!=='file')
continue;fKey=XMLUtils.getAttribute(file,"bitrate");fFallback=XMLUtils.getAttribute(file,"fallback");fValue=XMLUtils.getNodeValue(file);ext="";anchor.href=this.sanitizeUrl(fValue);path=anchor.pathname;lastDot=path.lastIndexOf(".");if(path&&~lastDot){ext=path.substring(lastDot+1);}
anchor.href="javascript:";log("ContentCatalogEntry",fKey,fValue,ext);this._fileList[fKey]={url:fValue,fallback:fFallback,ext:ext};}}
else
{log("ContentCatalogEntry","No file entries found!");}
images=this._xmlEntry.getElementsByTagName("images");if(images.length)
{images=images[0].childNodes;this._imageList={};for(image in images)
{if(images[image].nodeType!==1)
continue;iWidth=XMLUtils.getAttribute(images[image],"width");iHeight=XMLUtils.getAttribute(images[image],"height");iValue=XMLUtils.getNodeValue(images[image]);log("ContentCatalogEntry","images",iWidth,iHeight,iValue);iKey=iWidth+"|"+iHeight;this._imageList[iKey]={url:iValue,width:iWidth,height:iHeight};}}
ads=this._xmlEntry.getElementsByTagName("ads");if(ads.length){ads=ads[0].childNodes;this._adList={};for(ad in ads)
{if(ads[ad].nodeType!==1)
continue;adKey=XMLUtils.getAttribute(ads[ad],"type");adValue=XMLUtils.getNodeValue(ads[ad]);log("ContentCatalogEntry","ad",adKey,adValue);this._adList[adKey]={url:adValue};}}},setMediaUrl:function(url){this._mediaUrl=url;},getId:function()
{var attr=XMLUtils.getAttribute(this._xmlEntry,"id");if(!empty(attr))
return attr;else
return this._requestId;},getName:function()
{return this._name;},getTitle:function()
{return this._title;},getCategory:function()
{return this._category;},getTrt:function()
{return this._trt;},sanitizeUrl:function(url)
{if(url.indexOf("://")===-1)
url=this._mediaUrl+url;return url;},getContentUrl:function(quality)
{var url=null,dbgFound=false,bitrate;for(bitrate in this._fileList)
{if(bitrate===quality)
{url=this.sanitizeUrl(this._fileList[bitrate].url);dbgFound=true;break;}}
if(!dbgFound)
log("Config XML specifies a "+quality+" bitrate entry, but there is no <file> node in video XML where bitrate attribute = "+quality+".");else if(empty(url))
log("text attribute is empty in the video XML for the <file> node whose quality is "+quality+".");return url;},getContentUrlFromFallback:function(fallback){var url=null,file=null,bitrate='';for(bitrate in this._fileList){file=this._fileList[bitrate];if(!(empty(file.fallback))&&fallback===file.fallback){url=this.sanitizeUrl(file.url);break;}}
return url;},getContentUrlFromType:function(ext)
{var url=null,file=null,bitrate;for(bitrate in this._fileList)
{file=this._fileList[bitrate];if(ext===file.ext)
{url=this.sanitizeUrl(file.url);break;}}
return url;},getThumbnailUrl:function(width,height)
{var url=null,key=width+"|"+height,k;for(k in this._imageList)
{if(k===key)
{url=this._imageList[k].url;break;}}
return url;},getAdUrl:function(type){return((this._adList&&this._adList[type]&&this._adList[type].url)||null);;},getXML:function()
{return this._xmlEntry;}});var PlayerInstance=(function(){var _params={},_mapping={},_appConfig={},_containerInfo={},_configInfo={omniture:{},share:{},embed:{}},_adPolicy={ads:{attr:{type:"NONE"}}};var BasePlayer=Class.extend({init:function(options){this.options=extend({containerElement:'',elementId:'',autoplay:true,controls:true,width:0,height:0},options||{});this.containerElement=byId(this.options.containerElement);this.elementId=this.options.elementId;if(empty(this.elementId))
{log("Invalid element id...exiting");throw new Error("Invalid element id");}
this.playerOptions={};this.width=this.options.width;this.height=this.options.height;this.airplay=(!CVP.Browser.apple_mobile&&(undef(_params.iosAirplay)||undef(_configInfo.iosAirplay)))?"":"x-webkit-airplay=\"allow\"";this.perVideoFallbacks=undef(_params.perVideoFallbacks)?[]:_params.perVideoFallbacks;this.element=null;this.rendering=false;this.position={top:null,right:null,bottom:null,left:null};this.eRendered=new Event();this.eContentMetadata=new Event();this.eContentPlay=new Event();this.eContentPause=new Event();this.eContentEnd=new Event();this.eContentPlayhead=new Event();this.eContentBuffering=new Event();this.eContentVolume=new Event();this.eContentError=new Event();this.eContentResize=new Event();this.eTrackingContentSeek=new Event();this.eFullscreenChange=new Event();this.eTrackingFullscreen=new Event();this.eTrackingMuted=new Event();this.eTrackingPaused=new Event();},getMarkup:function(){return"";},render:function(containerElement){log("Player","render");if(!empty(containerElement))
this.containerElement=byId(containerElement);if(nil(this.containerElement))
{log("Container element could not be found...cannot render...exiting");throw new Error("Container could not be found");}
var markup=this.getMarkup();this.rendering=true;this.containerElement.innerHTML=markup;var self=this;new ConditionalTask(function(){if(!nil(byId(self.elementId)))
return true;},function(){self.rendering=false;self.element=byId(self.elementId);self.fireRendered();}).start();},rendered:function(){return this.element&&this.element.parentNode===this.containerElement;},show:function(){if(this.element)
{if(this.position.left)
this.element.style.left=this.position.left;}},hide:function(){if(this.element)
{this.position.left=this.element.style.left;this.element.style.left="-5000px";}},remove:function(){log("Player","remove");if(nil(this.containerElement)){log("Container element could not be found .. cannot remove");throw new Error("Container element could not be found");}
var element=byId(this.elementId);while(element.firstChild){element.removeChild(element.firstChild);}
element.parentNode.removeChild(element);},addPlayerListeners:function(){},removePlayerListeners:function(){},fireRendered:function(){this.eRendered.dispatch();},fireBegin:function(){},firePlay:function(){this.eContentPlay.dispatch(this._catalogEntry.getId());},fireEnded:function(){this.eContentEnd.dispatch(this._catalogEntry.getId());},fireCompleted:function(){}});var VideoPlayer=BasePlayer.extend({init:function(options){this._super(options);this.playerOptions.controls=this.options.controls;this.playerOptions.autoplay=CVP.Browser.apple_mobile?false:this.options.autostart;this._supportedFileTypes=this._determineSupportedFileTypes();this._firePlay=false;this._addedListeners=false;this._loaded=false;this._muted=false;this._paused=false;this._buffering=false;this._fullscreen=false;this._playheadTimer=null;this._playheadThrottling=false;this._mousedown=false;this._waitForMouseUp=false;this._onMouseDown=bind(function(){this._mousedown=true;this._timeAtUserAction=this.element.currentTime;},this);this._onMouseUp=bind(function(){this._mousedown=false;},this);this._setupMouseWatcher=function(){this.element.addEventListener('mousedown',this._onMouseDown);this.element.addEventListener('mouseup',this._onMouseUp);};this._breakdownMouseWatcher=function(){this.element.removeEventListener('mousedown',this._onMouseDown);this.element.removeEventListener('mouseup',this._onMouseUp);};this._onContentSeek=function(){if(this._playheadTimer){window.clearTimeout(this._playheadTimer);this._playheadTimer=null;}
this.element.removeEventListener('mouseup',this._onContentSeekBind);this._playheadThrottling=false;this._waitForMouseUp=false;if(!this._paused){this.fireSeek();this.firePlayhead();this.element.addEventListener('mouseup',this._onContentSeekBind);}else{this.fireSeek();if(!this._waitForMouseUp){this._waitForMouseUp=true;this.element.addEventListener('mouseup',this._onContentSeekBind);}}};this._onContentSeekBind=bind(this._onContentSeek,this);this._onLoadedMetaDataBind=bind(this._onLoadedMetaData,this);this._onContentPlayBind=bind(this._onContentPlay,this);this._onContentEndBind=bind(this._onContentEnd,this);this._onContentPauseBind=bind(this._onContentPause,this);this._onContentPlayingBind=bind(this._onContentPlaying,this);this._onContentErrorBind=bind(this._onContentError,this);this._onContentPlayheadBind=bind(this._onContentPlayhead,this);this._onContentBufferingBind=bind(this._onContentBuffering,this);this._onContentVolumeBind=bind(this._onContentVolume,this);this._onW3FullScreenChangeBind=bind(this._onW3FullScreenChange,this);this._onWebKitFullScreenChangeBind=bind(this._onWebKitFullScreenChange,this);this._onMozFullScreenChangeBind=bind(this._onMozFullScreenChange,this);},render:function(options){this._super(options);this.eRendered.addListener(this._setupMouseWatcher,this);},firePause:function(){this.eTrackingPaused.dispatch({contentId:this._catalogEntry.getId(),paused:this._paused});this.eContentPause.dispatch(this._catalogEntry.getId(),this._paused);},fireBuffering:function(){this.eContentBuffering.dispatch(this._catalogEntry.getId(),this._buffering);},fireMetadata:function(){this.eContentMetadata.dispatch(this._catalogEntry.getId(),this.element.duration||this._catalogEntry.getTrt(),+(this.width),+(this.height));},firePlayhead:function(){this.eContentPlayhead.dispatch(this._catalogEntry.getId(),this.element.currentTime,this.element.duration);},fireSeek:function(){if(Math.abs(this.element.currentTime-this._timeAtUserAction)>1.0){this.eTrackingContentSeek.dispatch({contentId:this._catalogEntry.getId(),previousPlayhead:this._timeAtUserAction,newPlayhead:this.element.currentTime,duration:this.element.duration});}},getMarkup:function(){return template("<video id=\"{0}\" width={1} height={2} controls {3}></video>",this.elementId,this.width,this.height,this.airplay);},play:(CVP.Browser.apple_mobile?function(catalogEntry)
{this._catalogEntry=catalogEntry;var url=this._getFileUrl(catalogEntry);this.setDefaultOptions();this._setThumbnail();if(!url){url='';}
this.element.src=url;this.element.load();this.element.play();this._firePlay=true;}:function(catalogEntry)
{this._catalogEntry=catalogEntry;var url=this._getFileUrl(catalogEntry);if(!this.playerOptions.autoplay)
{this._setThumbnail();}
if(!url){url='';}
this.element.src=url;this.element.load();}),pause:function()
{this.element.pause();},resume:function()
{if(this._paused)
this.element.play();},setVolume:function(v)
{this.element.volume=v;},getVolume:function()
{return this.element.volume;},mute:function()
{this.element.muted=true;},unmute:function()
{this.element.muted=false;},resize:function(width,height)
{this.element.width=width;this.element.height=height;this._onContentResize();},setDefaultOptions:function()
{this.setOptions(this.playerOptions);},setOptions:function(options)
{options=options||{};var option;for(option in options)
{if(hasOwn(options,option)){this.element[option]=options[option];}}},_setThumbnail:function()
{var image=this.getThumbnail();log("VideoPlayer","_setThumbnail",image);if(image)
{this.element.poster=image;}},getThumbnail:function(){return(this._catalogEntry?this._catalogEntry.getThumbnailUrl(this.width,this.height):"");},_onLoadedMetaData:function()
{log("VideoPlayer","_onLoadedMetaData");this._loaded=true;this.fireMetadata();if(!CVP.Browser.apple_mobile){this._onLoaded();}},_onLoaded:function()
{log("VideoPlayer","_onLoaded");this.setDefaultOptions();this._firePlay=true;this.element.play();},_onReadyStateChange:function()
{log("VideoPlayer","_onReadyStateChange");},_onContentBegin:function()
{},_onContentPlay:function()
{log("VideoPlayer","_onContentPlay");if(this._paused){this._paused=false;this.firePause();}
if(this._firePlay)
{this.firePlay();this._firePlay=false;}},_onContentPlaying:function()
{log("VideoPlayer","_onContentPlaying");if(this._buffering)
{this._buffering=false;this.fireBuffering();}},_onContentPause:function()
{log("VideoPlayer","_onContentPause");this._paused=true;if(this.element.currentTime!==this.element.duration){this.firePause();}},_onContentPlayhead:function()
{if(!this._mousedown){this.firePlayhead();}else{if(!this._playheadThrottling){this._playheadThrottling=true;this._playheadTimer=window.setTimeout(this._onContentSeekBind,250);}}},_onContentEnd:function()
{log("VideoPlayer","_onContentEnd");this.fireEnded();},_onContentError:function(event)
{var errorMessage="Unknown error.";if(event.target&&event.target.error){switch(event.target.error.code){case event.target.error.MEDIA_ERR_ABORTED:errorMessage="The fetching process for the media resource was aborted by the user agent at the user's request.";break;case event.target.error.MEDIA_ERR_NETWORK:errorMessage="A network error of some description caused the user agent to stop fetching the media resource, after the resource was established to be usable.";break;case event.target.error.MEDIA_ERR_DECODE:errorMessage="An error of some description occurred while decoding the media resource, after the resource was established to be usable.";break;case event.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:errorMessage="The media resource indicated by the src attribute was not suitable.";break;}}
log("VideoPlayer","_onContentError",errorMessage);this.eContentError.dispatch(this._catalogEntry.getId(),errorMessage);},_onContentBuffering:function()
{log("VideoPlayer","_onContentBuffering");if(!this._rendered){return;}
this._buffering=true;this.fireBuffering();},_onContentVolume:function()
{var muteTransition=this._muted!==this.element.muted;log("VideoPlayer","_onContentVolume");if(muteTransition){this._muted=this.element.muted;this.eTrackingMuted.dispatch({contentId:this._catalogEntry.getId(),muted:this.element.muted});}
this.eContentVolume.dispatch(this.element.muted,this.element.volume);},_onContentResize:function()
{log("VideoPlayer","_onContentResize");this.eContentResize.dispatch(this.element.width,this.element.height,this._fullscreen);},_onFullScreenChange:function(isFullscreen,fullscreenElement)
{var fullscreenTransition=false;if(!isFullscreen||(isFullscreen&&fullscreenElement===this.element)){fullscreenTransition=this._fullscreen!==isFullscreen;if(fullscreenTransition){this._fullscreen=isFullscreen;this.eTrackingFullscreen.dispatch({contentId:this._catalogEntry.getId(),fullscreen:this._fullscreen});this.eContentResize.dispatch(window.screen.width,window.screen.height,this._fullscreen);}}},_onW3FullScreenChange:function()
{log("VideoPlayer","_onW3FullScreenChange",document.fullscreen,document.fullscreenElement);this.eFullscreenChange.dispatch(document.fullscreen,document.fullscreenElement);},_onWebKitFullScreenChange:function()
{log("VideoPlayer","_onWebKitFullScreenChange",document.webkitIsFullScreen,document.webkitFullscreenElement);this.eFullscreenChange.dispatch(document.webkitIsFullScreen,document.webkitFullscreenElement);},_onMozFullScreenChange:function()
{log("VideoPlayer","_onMozFullScreenChange",document.mozFullScreen,document.mozFullScreenElement);this.eFullscreenChange.dispatch(document.mozFullScreen,document.mozFullScreenElement);},addPlayerListeners:function(){if(this.element&&!this._addedListeners)
{log("VideoPlayer","addPlayerListeners");this.element.addEventListener("loadedmetadata",this._onLoadedMetaDataBind,false);this.element.addEventListener("play",this._onContentPlayBind,false);this.element.addEventListener("ended",this._onContentEndBind,false);this.element.addEventListener("playing",this._onContentPlayingBind,false);this.element.addEventListener("pause",this._onContentPauseBind,false);this.element.addEventListener("timeupdate",this._onContentPlayheadBind,false);this.element.addEventListener("error",this._onContentErrorBind,false);this.element.addEventListener("waiting",this._onContentBufferingBind,false);this.element.addEventListener("volumechange",this._onContentVolumeBind,false);this.eFullscreenChange.addListener(this._onFullScreenChange,this);document.addEventListener("fullscreenchange",this._onW3FullScreenChangeBind,false);document.addEventListener("webkitfullscreenchange",this._onWebKitFullScreenChangeBind,false);document.addEventListener("mozfullscreenchange",this._onMozFullScreenChangeBind,false);this._addedListeners=true;}},removePlayerListeners:function(){if(this.element&&this._addedListeners)
{log("VideoPlayer","removePlayerListeners");this.element.removeEventListener("loadedmetadata",this._onLoadedMetaDataBind,false);this.element.removeEventListener("loadeddata",this._onLoadedMetaDataBind,false);this.element.removeEventListener("play",this._onContentPlayBind,false);this.element.removeEventListener("ended",this._onContentEndBind,false);this.element.removeEventListener("playing",this._onContentPlayingBind,false);this.element.removeEventListener("pause",this._onContentPauseBind,false);this.element.removeEventListener("timeupdate",this._onContentPlayheadBind,false);this.element.removeEventListener("error",this._onContentErrorBind,false);this.element.removeEventListener("waiting",this._onContentBufferingBind,false);this.element.removeEventListener("volumechange",this._onContentVolumeBind,false);this.eFullscreenChange.removeListener(this._onFullScreenChange,this);document.removeEventListener("fullscreenchange",this._onW3FullScreenChangeBind,false);document.removeEventListener("webkitfullscreenchange",this._onWebKitFullScreenChangeBind,false);document.removeEventListener("mozfullscreenchange",this._onMozFullScreenChangeBind,false);this._addedListeners=false;}},_getFileUrl:function(catalogEntry)
{var url='';url=this._getFileByParameterFallback(catalogEntry);if(!url)
url=this._getFileByFallback(catalogEntry);if(!url){url=catalogEntry.getContentUrl(_configInfo.lowBitrate);if(!this._isFileSupported(url))
{log("VideoPlayer","File is not supported!",url);log("VideoPlayer","Attempting to find a compatible file");url=this._getFileBySupportedType(catalogEntry);if(empty(url))
url=this._getFileByConfigFallbackParam(catalogEntry);log("VideoPlayer","Found:",url);}}else{log("VideoPlayer","Fallback file found",url);}
if(!url)
log("VideoPlayer","No valid media file found!",catalogEntry.getId());return url;},_getFileByParameterFallback:function(catalogEntry){var i=0,endi=this.perVideoFallbacks.length,dvf,criteria;for(;i<endi;++i){dvf=this.perVideoFallbacks[i];criteria=ConfigUtils.stringReplace(dvf.criteria,catalogEntry,false);if(dvf.evaluate(criteria)){return ConfigUtils.stringReplace(dvf.filter,catalogEntry,false);}}
return null;},_getFileByConfigFallbackParam:function(catalogEntry){var str=_configInfo.fallbackFilenameIOS;if(empty(str))
return str;else
str=ConfigUtils.stringReplace(str,catalogEntry,false);return str;},_getFileByFallback:function(catalogEntry){if(CVP.Browser.apple_mobile){return catalogEntry.getContentUrlFromFallback("iOS");}},_getFileBySupportedType:function(catalogEntry)
{var url=null,i=0,len=this._supportedFileTypes.length;for(;i<len&&empty(url);++i)
{url=catalogEntry.getContentUrlFromType(this._supportedFileTypes[i]);}
return url;},_isFileSupported:function(url)
{if(!empty(url))
{var ext=url.indexOf(".")>-1?url.substring(url.lastIndexOf(".")+1):url,i=0,len=this._supportedFileTypes.length;for(;i<len;++i)
{if(ext===this._supportedFileTypes[i])
{return true;}}}
return false;},_determineSupportedFileTypes:function()
{if(CVP.Browser.apple_mobile)
{return["m3u8","mp4"];}
else
{return["mp4"];}}});var DummyPlayStartStrategy=Class.extend({init:function(element,poster){this.eReady=new Event();this._element=element;this._poster=poster;this._elementSrc='http://z.cdn.turner.com/xslo/cvp/assets/video/blank.mp4';},execute:function(){var self=this,fired=false,events=this._getEventList();var listeners=function(add,cb){var method=add?"addEventListener":"removeEventListener";for(var i=0,len=events.length;i<len;i++){self._element[method](events[i],cb);}};var cb=function(event){log("[StartStrategy] received: ",event.type);listeners(false,arguments.callee);if(!fired){fired=true;self._element.controls=false;self._element.src='';self._fireReady();}};listeners(true,cb);this._element.poster=this._poster;this._element.controls=true;this._element.src=this._elementSrc;this._element.load();this._element.play();},_getEventList:function(){var events=["loadedmetadata"];var version=CVP.Browser.version;if(version.major>4||(version.major===4&&version.minor>1))
{events=events.concat(["play"]);}
return events;},_fireReady:function(){this.eReady.dispatch();}});var AdServerProxy=Class.extend({init:function()
{this.eAdPlay=new Event();this.eAdPlayhead=new Event();this.eAdEnd=new Event();this.eAdError=new Event();this.eTrackingAdStart=new Event();this.eTrackingAdComplete=new Event();this._adServerType=_adPolicy.ads.attr.type.toLowerCase();this._adServer=this._createImpl();if(!this._adServer){log("AdServerProxy","Unable to create ad server impl.");return;}
this._adServer.eAdPlay.addListener(this._onAdPlay,this);this._adServer.eAdPlayhead.addListener(this._onAdPlayhead,this);this._adServer.eAdEnd.addListener(this._onAdEnd,this);this._adServer.eAdError.addListener(this._onAdError,this);this._adServer.eTrackingAdStart.addListener(this._onTrackingAdStart,this);this._adServer.eTrackingAdComplete.addListener(this._onTrackingAdComplete,this);},_createImpl:function(){var type=this._adServerType;if(type==="freewheel"){return new FreeWheelImpl();}else if(type==="dfp"){return new DFPImpl();}else{return null;}},setAdSection:function(adSection)
{if(this._adServer){this._adServer.setAdSection(adSection);}},setVideoDisplayBase:function(videoDisplayBase)
{if(this._adServer){this._adServer.setVideoDisplayBase(videoDisplayBase);}},isEnabled:function(){return this._adServer?this._adServer.enabled:false;},playPreroll:function(catalogEntry){if(this._adServer){this._adServer.playPreroll(catalogEntry);}},playPostroll:function(catalogEntry){if(this._adServer){this._adServer.playPostroll(catalogEntry);}},loadAds:function(catalogEntry)
{if(this._adServer){if(this._adServerType==="dfp")
this._adServer.playPreroll(catalogEntry);else
this._adServer.loadAds(catalogEntry);}},getCurrentAdId:function(){return'';},getCurrentAdDuration:function(){return 0;},getCurrentAdType:function(){return this._convertAdType(this._adServer.currentAdType);},_convertAdType:function(adType){var type='';switch(this._adServerType){case"freewheel":if(adType===FreeWheelImpl.PREROLL){type=AdServerProxy.PREROLL}else if(adType===FreeWheelImpl.POSTOLL){type=AdServerProxy.POSTROLL;}
break;case"dfp":if(adType===DFPImpl.PREROLL){type=AdServerProxy.PREROLL}else if(adType===DFPImpl.POSTROLL){type=AdServerProxy.POSTROLL;}
break;}
return type;},_onAdPlay:function(event){var data={ads:[],token:'',mode:'standard',id:this.getCurrentAdId(),duration:this.getCurrentAdDuration(),blockId:'',adType:this.getCurrentAdType()};this.eAdPlay.dispatch(data);},_onAdPlayhead:function(playhead,duration){this.eAdPlayhead.dispatch.apply(this.eAdPlayhead,arguments);},_onAdEnd:function(event){var data={token:'',mode:'standard',id:this.getCurrentAdId(),blockId:'',adType:this.getCurrentAdType()};log("AdServerProxy","_onAdEnd",data.adType);this.eAdEnd.dispatch(data);},_onAdError:function(event){var data={id:this.getCurrentAdId(),adType:this.getCurrentAdType(),errors:[]};this.eAdError.dispatch(data);},_onTrackingAdStart:function(event){this.eTrackingAdStart.dispatch();},_onTrackingAdComplete:function(event){this.eTrackingAdComplete.dispatch();}});AdServerProxy.PREROLL="preroll";AdServerProxy.POSTROLL="postroll";var AdImplBase=Class.extend({init:function()
{this._adServerInfo=_adPolicy.ads;},getConfigProperty:function(key)
{var value=null;var required=false;switch(key)
{case'adApi':value=this._adServerInfo.apiUrl;required=true;break;case'adServerRootUrl':value=this._adServerInfo.adServerRootUrl;required=true;break;case'adNetworkId':value=this._adServerInfo.adNetworkId;required=true;break;case'adVideoNetworkId':value=this._adServerInfo.adVideoNetworkId;required=true;break;case'adVideoAssetId':value=this._adServerInfo.adVideoAssetId;required=true;break;case'adSection':value=this._adServerInfo.adSection;required=true;break;case'adPlayerProfile':value=this._adServerInfo.adPlayerProfile;required=true;break;case'renderersUrl':value=this._adServerInfo.renderersUrl;required=false;break;case'sensitiveFallbackId':value=this._adServerInfo.sensitiveFallbackId;required=false;break;case'adLiveContentDuration':value=this._adServerInfo.liveDuration;required=false;break;}
if(empty(value))
{if(required)
log("the following required ad server config value is missing:",key);else
log("the following optional ad server config value is missing:",key);}
return value;}});var FreeWheelImpl=AdImplBase.extend({init:function()
{log("FreeWheelImpl","Instantiating");this._super();this._freewheel=null;if(!undef(window.tv)&&window.tv.freewheel)
{if(!FreeWheelImpl.initialized)
{FreeWheelImpl.PREROLL=tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL;FreeWheelImpl.POSTROLL=tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL;FreeWheelImpl.initialized=true;}}
else
{this.enabled=false;}
this.currentAdType='';this.currentAdId='';this.currentAdDuration=0;this._adSection=this.getConfigProperty("adSection");this._adProgress=0;this._adTimer=null;this._adTimerDelay=1000;this._adIncrementor=bind(function(){this._adProgress=Math.floor(this._adProgress+(this._adTimerDelay/1000));if(this._adProgress<=this.currentAdDuration){this.onAdPlayhead(this._adProgress,this.currentAdDuration);}},this);this.eAdPlayhead=new Event();this.eAdPlay=new Event();this.eAdEnd=new Event();this.eAdError=new Event();this.eTrackingAdStart=new Event();this.eTrackingAdComplete=new Event();},setAdSection:function(adSection)
{this._adSection=adSection;},setVideoDisplayBase:function(videoDisplayBase)
{if(!undef(window.tv)&&!undef(window.tv.freewheel))
{this.displayBase=videoDisplayBase;this.enabled=true;}},loadAds:function(catalogEntry)
{this._freewheel=new tv.freewheel.SDK.AdManager();var serverUrl=this.getConfigProperty("adServerRootUrl")+"/ad/g/1?nw="+this.getConfigProperty("adNetworkId")
+"&prof="+this.getConfigProperty("adNetworkId")+":turner_html5"
+"&flag=+sltp+exvt+slcb+unka+unks;";this._freewheel.setServerURL(serverUrl);this._freewheel.registerVideoDisplayBase(this.displayBase);var duration=catalogEntry.getTrt();var adId="";if(empty(this._adServerInfo.adVideoAssetId))
adId=catalogEntry.getId();else
adId=ConfigUtils.stringReplace(this._adServerInfo.adVideoAssetId,catalogEntry,false);this._freewheel.setVideoAsset(adId,duration);this._freewheel.setSiteSection(this._adSection);this._freewheel.submitRequest(bind(this.playPreroll,this),2000);},playPreroll:function(e)
{log("FreeWheelImpl","playPreroll");this.currentAdType=FreeWheelImpl.PREROLL;this._adPlay(FreeWheelImpl.PREROLL,bind(this.onPrerollCompleted,this),e);},onPrerollCompleted:function(e)
{log("FreeWheelImpl","onPrerollCompleted");this._adEnd(e);},playPostroll:function(e)
{log("FreeWheelImpl","playPostroll");this.currentAdType=FreeWheelImpl.POSTROLL;this._adPlay(FreeWheelImpl.POSTROLL,bind(this.onPostrollCompleted,this),e);},onPostrollCompleted:function(e)
{log("FreeWheelImpl","onPostrollCompleted");this._adEnd(e);},_adPlay:function(slot,cb,e)
{var ads=e&&e.success&&e.response&&e.response.ads&&e.response.ads.ads;if(ads&&ads.length!==0){this.currentAdId=ads[0].adId;this.currentAdDuration=+(ads[0].creatives[0].duration);this._adProgress=0;this._adTimer=window.setInterval(this._adIncrementor,this._adTimerDelay);this.eTrackingAdStart.dispatch(e);this.eAdPlay.dispatch(e);}else{this.eAdError.dispatch(e);}
this._freewheel.playSlots(slot,cb);},_adEnd:function(e)
{if(this._adTimer!==null){window.clearInterval(this._adTimer);this._adTimer=null;this.eTrackingAdComplete.dispatch(e);}
this.eAdEnd.dispatch(e);this._freewheel.dispose();this.currentAdId='';},onAdPlayhead:function(playhead,duration)
{this.eAdPlayhead.dispatch.apply(this.eAdPlayhead,arguments);}});FreeWheelImpl.PREROLL=null;FreeWheelImpl.POSTROLL=null;var DFPImpl=AdImplBase.extend({init:function()
{log("DFPImpl","Instantiating");this._super();this.enabled=false;this._loader=new google.ima.AdsLoader();this._loader.addEventListener(google.ima.AdsLoadedEvent.Type.ADS_LOADED,bind(this._onAdsLoaded,this));this._loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,bind(this._onAdLoadError,this));this.currentAdType='';this.currentAdId='';this.currentAdDuration=0;this._adSection=this.getConfigProperty("adSection");this._keyValues={};this.eAdPlayhead=new Event();this.eAdPlay=new Event();this.eAdEnd=new Event();this.eAdError=new Event();this.eTrackingAdStart=new Event();this.eTrackingAdComplete=new Event();},setAdSection:function(adSection)
{this._adSection=adSection;},setVideoDisplayBase:function(videoDisplayBase)
{log("DFP","setVideoDisplayBase",videoDisplayBase);if(!undef(window.google)&&!undef(window.google.ima.AdsLoader))
{this.displayBase=videoDisplayBase;this.enabled=true;log("DFP","setVideoDisplayBase","videoDisplayBase","enabling");}},playPreroll:function(catalogEntry){var preroll=catalogEntry.getAdUrl("preroll");var url=this._constructAdUrl(preroll,catalogEntry);this.currentAdType=DFPImpl.PREROLL;this.loadAds(url);},playPostroll:function(catalogEntry){var postroll=catalogEntry.getAdUrl("postroll");var url=this._constructAdUrl(postroll,catalogEntry);this.currentAdType=DFPImpl.POSTROLL;this.loadAds(url);},loadAds:function(url)
{log("DFP","loadAds - adTag",url);var adsRequest={adTagUrl:url,adType:"video"};this._loader.requestAds(adsRequest);},_constructAdUrl:function(entryAdTag,catalogEntry){var adTag="";var baseUrl=this.getConfigProperty("adServerRootUrl");if(empty(entryAdTag))
adTag=baseUrl;else if(isRelativePath(entryAdTag))
adTag=this._addToTag(baseUrl,entryAdTag);else
adTag=entryAdTag;for(var key in this._keyValues)
{var newPair=key+"="+this._keyValues[key];adTag=addToTag(adTag,newPair);}
adTag=ConfigUtils.stringReplace(adTag,catalogEntry);return adTag;},_addToTag:function(adTag,pair){if(!adTag){return pair;}
var delimiter=";";if(adTag.charAt(adTag.length-1)==";")
delimiter=""
return adTag+delimiter+pair;},_onAdsLoaded:function(event){log("DFP","_onAdsLoaded");var adsManager=event.getAdsManager();adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,bind(this._onAdError,this));adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,bind(this._onPauseRequested,this));adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,bind(this._onResumeRequested,this));try{this.eAdPlay.dispatch();var playSettings={restoreContentState:false};var element=document.getElementById(this.displayBase).getElementsByTagName("video")[0];adsManager.play(element,playSettings);}catch(adError){log("DFP","ad play error",adError.toString());}},_onAdLoadError:function(){log("DFP","_onAdLoadError");this.eAdError.dispatch();},_onPauseRequested:function(){log("DFP","_onPauseRequested");},_onResumeRequested:function(){log("DFP","_onResumeRequested");this.eAdEnd.dispatch();},_onAdError:function(event){log("DFP","_onAdError",event.toString());this.eAdError.dispatch();}});DFPImpl.PREROLL="dfpPreroll";DFPImpl.POSTROLL="dfpPostroll";var PlayerController=Class.extend({init:function()
{this._commandQ=new CommandQueue();this._videoPlayer=new VideoPlayer({containerElement:"player_container",elementId:_params.id||"cvp_videoPlayer_"+now(),width:_params.width,height:_params.height,controls:true,autostart:_params.autostart});this._videoPlayer.eRendered.addListener(this._onRendered,this);this._videoPlayer.eContentMetadata.addListener(this._onContentMetadata,this);this._videoPlayer.eContentPlay.addListener(this._onContentPlay,this);this._videoPlayer.eContentPause.addListener(this._onContentPause,this);this._videoPlayer.eContentEnd.addListener(this._onContentEnd,this);this._videoPlayer.eContentPlayhead.addListener(this._onContentPlayhead,this);this._videoPlayer.eContentBuffering.addListener(this._onContentBuffering,this);this._videoPlayer.eContentVolume.addListener(this._onContentVolume,this);this._videoPlayer.eContentError.addListener(this._onContentError,this);this._videoPlayer.eContentResize.addListener(this._onContentResize,this);this._adProxy=new AdServerProxy();this._adProxy.eAdPlayhead.addListener(this._onAdPlayhead,this);this._adProxy.eAdPlay.addListener(this._onAdPlay,this);this._adProxy.eAdEnd.addListener(this._onAdEnd,this);this._adProxy.eAdError.addListener(this._onAdError,this);this._adProxy.eTrackingAdStart.addListener(this._onTrackingAdStart,this);this._adProxy.eTrackingAdComplete.addListener(this._onTrackingAdComplete,this);this._videoPlayer.eContentPlay.addListener(this._onTrackingContentPlay,this);this._videoPlayer.eContentEnd.addListener(this._onTrackingContentEnd,this);this._videoPlayer.eTrackingContentSeek.addListener(this._onTrackingContentSeek,this);this._videoPlayer.eTrackingFullscreen.addListener(this._onTrackingFullscreen,this);this._videoPlayer.eTrackingMuted.addListener(this._onTrackingMuted,this);this._videoPlayer.eTrackingPaused.addListener(this._onTrackingPaused,this);this._currentContentId='';this._contentQueue=[];this._firstPlay=true;this._delayPlayerControls=false;this._triggeredAd=false;this._currentAdDuration=0;this._currentAdPlayhead=0;this._totalAdPlayTime=0;this._trackingAdStart=0;this._trackingAdTimer=null;this._getElapsedTrackingAdTime=function(){return(this._trackingAdStart===0?0:(now()-this._trackingAdStart)/1000);};this._getTotalTrackingAdTime=function(){return this._totalAdPlayTime+this._getElapsedTrackingAdTime();};this._tallyTotalTrackingAdTime=function(){this._totalAdPlayTime+=this._getElapsedTrackingAdTime();};this._startTrackingAdTimer=function(){if(this._trackingAdTimer!==null){return;}
this._trackingAdStart=now();this._trackingAdTimer=window.setInterval(bind(this._onTrackingAdProgress,this),60000);};this._stopTrackingAdTimer=function(){if(this._trackingAdTimer===null){return;}
this._tallyTotalTrackingAdTime();window.clearInterval(this._trackingAdTimer);this._trackingAdTimer=null;this._trackingAdStart=0;};this._currentContentDuration=0;this._currentContentPlayhead=0;this._totalContentPlayTime=0;this._trackingContentStart=0;this._trackingContentTimer=null;this._getElapsedTrackingContentTime=function(){return(this._trackingContentStart===0?0:(now()-this._trackingContentStart)/1000);};this._getTotalTrackingContentTime=function(){return this._totalContentPlayTime+this._getElapsedTrackingContentTime();};this._tallyTotalTrackingContentTime=function(){this._totalContentPlayTime+=this._getElapsedTrackingContentTime();};this._startTrackingContentTimer=function(){if(this._trackingContentTimer!==null){return;}
this._trackingContentStart=now();this._trackingContentTimer=window.setInterval(bind(this._onTrackingContentProgress,this),60000);};this._stopTrackingContentTimer=function(){if(this._trackingContentTimer===null){return;}
this._tallyTotalTrackingContentTime();window.clearInterval(this._trackingContentTimer);this._trackingContentTimer=null;this._trackingContentStart=0;};this.eRendered=new Event();this.eContentMetadata=new Event();this.eContentBegin=new Event();this.eContentPlay=new Event();this.eContentPause=new Event();this.eContentEnd=new Event();this.eContentComplete=new Event();this.eContentPlayhead=new Event();this.eContentBuffering=new Event();this.eContentVolume=new Event();this.eContentError=new Event();this.eContentResize=new Event();this.eTrackingAdStart=new Event();this.eTrackingAdComplete=new Event();this.eTrackingAdProgress=new Event();this.eTrackingAdCountdown=new Event();this.eTrackingContentPlay=new Event();this.eTrackingContentBegin=new Event();this.eTrackingContentProgress=new Event();this.eTrackingContentComplete=new Event();this.eTrackingContentSeek=new Event();this.eTrackingFullscreen=new Event();this.eTrackingMuted=new Event();this.eTrackingPaused=new Event();this.eAdPlayhead=new Event();this.eAdPlay=new Event();this.eAdEnd=new Event();this.eAdError=new Event();},render:function(containerElement)
{this._adProxy.setVideoDisplayBase(containerElement);this._videoPlayer.render(containerElement);},remove:function()
{this._videoPlayer.remove();},_onRendered:function(type)
{log("_onRendered",type);this._commandQ.execute();this.eRendered.dispatch();},play:function(catalogEntry){log("PlayerController","play",catalogEntry.getId());this._catalogEntry=catalogEntry;if(!this._videoPlayer.rendered())
{this._commandQ.push(this.play,this,arguments);return;}
this._executePlayStrategy(bind(this._playMedia,this));},_executePlayStrategy:function(playFunc){if(CVP.Browser.apple_mobile&&this._firstPlay){this._videoPlayer.removePlayerListeners();this._delayPlayerControls=true;var dummyStrategy=new DummyPlayStartStrategy(this._videoPlayer.element,this._catalogEntry.getThumbnailUrl(this._videoPlayer.width,this._videoPlayer.height));dummyStrategy.eReady.addListener(function(){playFunc();dummyStrategy=null;});dummyStrategy.execute();}else{playFunc();}},_playMedia:function(){this._firstPlay=false;this._onTrackingContentBegin(this._catalogEntry.getId());this._onContentBegin(this._catalogEntry.getId());if(this._adProxy.isEnabled())
this._adProxy.loadAds(this._catalogEntry);else
this._playContent();},_playContent:function()
{log("PlayerController","_playContent");if(this._delayPlayerControls){this._videoPlayer.playerOptions["controls"]=false;}
this._videoPlayer.addPlayerListeners();this._videoPlayer.play(this._catalogEntry);},queue:function(catalogEntry)
{log("PlayerController","queue",catalogEntry.getId());this._contentQueue.push(catalogEntry);},emptyQueue:function()
{this._contentQueue=[];},pause:function()
{this._videoPlayer.pause();},resume:function()
{this._videoPlayer.resume();},resize:function(width,height)
{this._videoPlayer.resize(width,height);},setVolume:function(v)
{this._videoPlayer.setVolume(v);},getVolume:function()
{return this._videoPlayer.getVolume();},mute:function()
{this._videoPlayer.mute();},unmute:function()
{this._videoPlayer.unmute();},setAdSection:function(ssid)
{this._adProxy.setAdSection(ssid);},_onContentMetadata:function(contentId,duration,width,height)
{log("PlayerController","_onContentMetadata");this._currentContentDuration=duration;this.eContentMetadata.dispatch.apply(this.eContentMetadata,arguments);},_onContentBegin:function(contentId)
{log("PlayerController","_onContentBegin");this._currentContentId=contentId;this.eContentBegin.dispatch.apply(this.eContentBegin,arguments);},_onContentPlay:function()
{log("PlayerController","_onContentPlay");if(this._delayPlayerControls){this._videoPlayer.setOptions({controls:true});}
this.eContentPlay.dispatch.apply(this.eContentPlay,arguments);},_onContentPause:function()
{log("PlayerController","_onContentPause");this.eContentPause.dispatch.apply(this.eContentPause,arguments);},_onContentEnd:function()
{log("PlayerController","_onContentEnd");this.eContentEnd.dispatch.apply(this.eContentEnd,arguments);if(this._adProxy.isEnabled()){this._videoPlayer.setOptions({controls:false});this._adProxy.playPostroll(this._catalogEntry);}else{this._onContentComplete.apply(this,arguments);}},_onContentComplete:function()
{log("PlayerController","_onContentComplete");this._onTrackingContentComplete();this.eContentComplete.dispatch.call(this.eContentComplete,this._catalogEntry.getId());if(this._contentQueue.length)
this.play(this._contentQueue.shift());},_onContentPlayhead:function(contentId,playhead,duration)
{this._currentContentPlayhead=playhead;this.eContentPlayhead.dispatch.apply(this.eContentPlayhead,arguments);},_onContentBuffering:function()
{log("PlayerController","_onContentBuffering");this.eContentBuffering.dispatch.apply(this.eContentBuffering,arguments);},_onContentVolume:function()
{log("PlayerController","_onContentVolume");this.eContentVolume.dispatch.apply(this.eContentVolume,arguments);},_onContentError:function()
{log("PlayerController","_onContentError");this.eContentError.dispatch.apply(this.eContentError,arguments);},_onContentResize:function()
{log("PlayerController","_onContentResize");this.eContentResize.dispatch.apply(this.eContentResize,arguments);},_onTrackingAdStart:function()
{log("PlayerController","_onTrackingAdStart",arguments);this._startTrackingAdTimer();this.eTrackingAdStart.dispatch({'adTitle':this._adProxy.currentAdId,'adType':this._adProxy.currentAdType,'adDuration':this._adProxy.currentAdDuration,'adBlock':0,'totalPlayTime':this._getTotalTrackingAdTime()+this._getTotalTrackingContentTime(),'adTotalPlayTime':this._getTotalTrackingAdTime()});},_onTrackingAdComplete:function()
{log("PlayerController","_onTrackingAdComplete",arguments);this._stopTrackingAdTimer();this.eTrackingAdComplete.dispatch({'adTitle':this._adProxy.currentAdId,'adType':this._adProxy.currentAdType,'adBlock':0,'totalPlayTime':this._getTotalTrackingAdTime()+this._getTotalTrackingContentTime(),'adTotalPlayTime':this._getTotalTrackingAdTime()});},_onTrackingAdProgress:function()
{log("PlayerController","_onTrackingAdProgress",arguments);this.eTrackingAdProgress.dispatch({'totalPlayTime':this._getTotalTrackingAdTime()+this._getTotalTrackingContentTime(),'playheadTime':this._currentAdPlayhead,'grossProgressMarker':0,'adType':this._adProxy.currentAdType,'adTotalPlaytime':this._getTotalTrackingAdTime()});},_onTrackingAdCountdown:function(secs)
{log("PlayerController","_onTrackingAdCountdown",arguments);this.eTrackingAdCountdown.dispatch({'adMode':'standard','secs':secs});},_onTrackingContentPlay:function()
{log("PlayerController","_onTrackingContentPlay",arguments);this._startTrackingContentTimer();this.eTrackingContentPlay.dispatch({'contentId':this._catalogEntry.getId(),'length':this._catalogEntry.getTrt(),'grossLength':this._catalogEntry.getTrt(),'totalPlayTime':this._getTotalTrackingAdTime()+this._getTotalTrackingContentTime(),'adTotalPlayTime':this._getTotalTrackingAdTime()});},_onTrackingContentEnd:function()
{log("PlayerController","_onTrackingContentEnd",arguments);this._stopTrackingContentTimer();},_onTrackingContentBegin:function()
{log("PlayerController","_onTrackingContentBegin",arguments);this.eTrackingContentBegin.dispatch({'contentId':this._catalogEntry.getId(),'totalPlayTime':this._getTotalTrackingAdTime()+this._getTotalTrackingContentTime(),'adTotalPlayTime':this._getTotalTrackingAdTime()});},_onTrackingContentProgress:function()
{log("PlayerController","_onTrackingContentProgress",arguments);this.eTrackingContentProgress.dispatch({'contentId':this._catalogEntry.getId(),'percent':Math.floor(this._currentContentDuration/this._currentContentPlayhead*100),'totalPlayTime':this._getTotalTrackingAdTime()+this._getTotalTrackingContentTime(),'playheadTime':this._currentContentPlayhead,'progressMarker':0,'grossProgressMarker':0,'adTotalPlayTime':this._getTotalTrackingAdTime()});},_onTrackingContentComplete:function()
{log("PlayerController","_onTrackingContentComplete",arguments);this.eTrackingContentComplete.dispatch({'contentId':this._catalogEntry.getId(),'percent':100,'totalPlayTime':this._getTotalTrackingAdTime()+this._getTotalTrackingContentTime(),'playheadTime':this._currentContentPlayhead,'progressMarker':0,'grossProgressMarker':0,'adTotalPlayTime':this._getTotalTrackingAdTime()});},_onTrackingContentSeek:function()
{log("PlayerController","_onTrackingContentSeek");this.eTrackingContentSeek.dispatch.apply(this.eTrackingContentSeek,arguments);},_onTrackingFullscreen:function()
{log("PlayerController","_onTrackingFullscreen");this.eTrackingFullscreen.dispatch.apply(this.eTrackingFullscreen,arguments);},_onTrackingMuted:function()
{log("PlayerController","_onTrackingMuted");this.eTrackingMuted.dispatch.apply(this.eTrackingMuted,arguments);},_onTrackingPaused:function(dataObj)
{log("PlayerController","_onTrackingPaused");if(dataObj.paused){this._stopTrackingContentTimer();}else{this._startTrackingContentTimer();}
this.eTrackingPaused.dispatch.apply(this.eTrackingPaused,arguments);},_onAdPlayhead:function(playhead,duration)
{this._currentAdPlayhead=playhead;this._currentAdDuration=duration;this._onTrackingAdCountdown(Math.ceil(duration-playhead));this.eAdPlayhead.dispatch.apply(this.eAdPlayhead,arguments);},_onAdPlay:function(event)
{var
ads=event.ads,token=event.token,mode=event.mode,id=event.id,duration=event.duration,blockId=event.blockId,adType=event.adType;log("PlayerController","_onAdPlay");this._triggeredAd=true;this.eAdPlay.dispatch.call(this.eAdPlay,token,mode,id,duration,blockId,adType);this._videoPlayer.removePlayerListeners();},_onAdEnd:function(event)
{var
token=event.token,mode=event.mode,id=event.id,blockId=event.duration,adType=event.adType;log("PlayerController","_onAdEnd",adType);if(this._triggeredAd){this.eAdEnd.dispatch.call(this.eAdEnd,token,mode,id,blockId,adType);}
this._onAdComplete(adType);},_onAdError:function(event)
{var i=0,endi=0,error=null,adErrors=event.errors,errStack=[],severityLevel={INFO:1,WARN:2,ERROR:3,FATAL:4},adType=event.adType;log("PlayerController","_onAdError");if(undef(event)){errStack.push({severity:'WARN',name:'Received no params to callback, assuming no ad played'});}else{if(!event.success){errStack.push({severity:'ERROR',name:'Did not receive successful response to ad request'});}
if(adErrors&&adErrors.length!==0){errStack.concat(adErrors);}}
for(endi=errStack.length;i<endi;++i){error=errStack[i];severity=(error.severity&&severityLevel[error.severity])||severityLevel.INFO;log("PlayerController","_onAdError",error.severity,error.name);if(severity>severityLevel.WARN){this.eAdError.dispatch.call(this.eAdError,error.name);}}
this._onAdComplete(adType);},_onAdComplete:function(adType){this._triggeredAd=false;if(adType===AdServerProxy.PREROLL)
this._playContent();else
this._onContentComplete(this._currentContentId);}});var PlayerInstance=function(data){var data=data||{},configData=data.configData||{};_params=data.params||_params;_mapping=configData.mapping||_mapping;_appConfig=configData.appConfig||_appConfig;_containerInfo=configData.containerInfo||_containerInfo;_configInfo=configData.configInfo||_configInfo;_adPolicy=configData.adPolicy||_adPolicy;return new PlayerController();};return PlayerInstance;})();var CVPManager=Class.extend({init:function()
{this._configData={};this.ePlayerLoaded=new Event();this.ePlayerLoadError=new Event();this.ePlayerRendered=new Event();this.eContentMetadata=new Event();this.eContentBegin=new Event();this.eContentPlay=new Event();this.eContentPause=new Event();this.eContentEnd=new Event();this.eContentComplete=new Event();this.eContentPlayhead=new Event();this.eContentBuffering=new Event();this.eContentVolume=new Event();this.eContentError=new Event();this.eContentResize=new Event();this.eAdPlayhead=new Event();this.eAdPlay=new Event();this.eAdEnd=new Event();this.eAdError=new Event();this.eTrackingAdStart=new Event();this.eTrackingAdComplete=new Event();this.eTrackingAdProgress=new Event();this.eTrackingAdCountdown=new Event();this.eTrackingContentPlay=new Event();this.eTrackingContentBegin=new Event();this.eTrackingContentProgress=new Event();this.eTrackingContentComplete=new Event();this.eTrackingContentSeek=new Event();this.eTrackingFullscreen=new Event();this.eTrackingMuted=new Event();this.eTrackingPaused=new Event();this._params={};},load:function(options){this._params=this._options=options;this._params.site=this._params.flashVars&&this._params.flashVars.site;this._params.profile=this._params.flashVars&&this._params.flashVars.profile;this._params.context=this._params.flashVars&&this._params.flashVars.context;this._params.contentId=this._params.flashVars&&this._params.flashVars.contentId;this._params.autostart=this._params.flashVars&&isFlagActive(this._params.flashVars.autostart,false);this._params.containerUrl=this._params.flashVars&&this._params.flashVars.containerUrl;this._params.configUrl=this._params.flashVars&&this._params.flashVars.configUrl;this._params.dt=this._params.flashVars&&this._params.flashVars.superduperdevtime;this._params.requestTimeout=this._params.flashVars&&+this._params.flashVars.requestTimeout;if(this._params.requestTimeout){CVP.Ajax.JSONP.requestTimeout=this._params.requestTimeout;}
this._params.requestRetries=this._params.flashVars&&+this._params.flashVars.requestRetries;if(this._params.requestRetries){CVP.Ajax.JSONP.maxRetries=this._params.requestRetries;}
var mappingUrl=this._calculateMappingUrl(this._params.site);if(empty(mappingUrl)){log("Unable to calculate mapping file url. Failing.");this._bootStrapFailure();return;}
this._bootStrapper=new BootStrapper(mappingUrl,this._params);this._bootStrapper.eSuccess.addListener(this._bootStrapSuccess,this);this._bootStrapper.eFailure.addListener(this._bootStrapFailure,this);this._bootStrapper.load();},_calculateMappingUrl:function(site){if(empty(site))
return null;var url=Utils.replaceExtension(MAPPING_FILE,"xml","json");if(!this._params.dt)
url=template(MAPPING_PATH,site)+url;return url;},_bootStrapSuccess:function(event)
{if(!event||!event.data){log("MainController","Unable to retrieve config data - failing.");this._bootStrapFailure();return;}
this._configData=event.data;log("MainController","_bootStrapSuccess");this._playerController=new PlayerInstance({params:this._params,configData:this._configData});this._playerController.eRendered.addListener(this._onRendered,this);this._playerController.eContentMetadata.addListener(this._onContentMetadata,this);this._playerController.eContentBegin.addListener(this._onContentBegin,this);this._playerController.eContentPlay.addListener(this._onContentPlay,this);this._playerController.eContentPause.addListener(this._onContentPause,this);this._playerController.eContentEnd.addListener(this._onContentEnd,this);this._playerController.eContentComplete.addListener(this._onContentComplete,this);this._playerController.eContentPlayhead.addListener(this._onContentPlayhead,this);this._playerController.eContentBuffering.addListener(this._onContentBuffering,this);this._playerController.eContentVolume.addListener(this._onContentVolume,this);this._playerController.eContentError.addListener(this._onContentError,this);this._playerController.eContentResize.addListener(this._onContentResize,this);this._playerController.eAdPlayhead.addListener(this._onAdPlayhead,this);this._playerController.eAdPlay.addListener(this._onAdPlay,this);this._playerController.eAdEnd.addListener(this._onAdEnd,this);this._playerController.eAdError.addListener(this._onAdError,this);this._playerController.eTrackingAdStart.addListener(this._onTrackingAdStart,this);this._playerController.eTrackingAdComplete.addListener(this._onTrackingAdComplete,this);this._playerController.eTrackingAdProgress.addListener(this._onTrackingAdProgress,this);this._playerController.eTrackingAdCountdown.addListener(this._onTrackingAdCountdown,this);this._playerController.eTrackingContentPlay.addListener(this._onTrackingContentPlay,this);this._playerController.eTrackingContentBegin.addListener(this._onTrackingContentBegin,this);this._playerController.eTrackingContentProgress.addListener(this._onTrackingContentProgress,this);this._playerController.eTrackingContentComplete.addListener(this._onTrackingContentComplete,this);this._playerController.eTrackingContentSeek.addListener(this._onTrackingContentSeek,this);this._playerController.eTrackingFullscreen.addListener(this._onTrackingFullscreen,this);this._playerController.eTrackingMuted.addListener(this._onTrackingMuted,this);this._playerController.eTrackingPaused.addListener(this._onTrackingPaused,this);this._cms=new CMS();this._cms.setDataUrl(this._configData.configInfo.dataSrc);this._cms.setMediaUrl(this._configData.configInfo.mediaSrc);this._cms.eRequestCompleted.addListener(this._onCmsRequestCompleted,this);this._loadingEntryQueue={};this.ePlayerLoaded.dispatch();},_bootStrapFailure:function()
{log("MainController","_bootStrapFailure");this.ePlayerLoadError.dispatch();},render:function(containerElement)
{this._playerController.render(containerElement);},remove:function()
{this._playerController.remove();},_onRendered:function()
{if(!nil(this._params.contentId))
{this.playContentWithId(this._params.contentId);}
this.ePlayerRendered.dispatch();},playContentWithId:function(id,options)
{log("MainController","playContentWithId",id);var index=this._getNextIndexForId(id);var key=id+"|"+index;log("MainController","playContentWithId","key",key);this._loadingEntryQueue[key]={play:true,additionalParams:options};this._cms.addContentId(key,options);},queueContentWithId:function(id,options)
{log("MainController","queueContentWithId",id);var index=this._getNextIndexForId(id);var key=id+"|"+index;log("MainController","queueContentWithId","key",key);this._loadingEntryQueue[key]={play:false,additionalParams:options};this._cms.addContentId(key,options);},pause:function()
{this._playerController.pause();},resume:function()
{this._playerController.resume();},resize:function(width,height)
{this._playerController.resize(width,height);},setVolume:function(v)
{this._playerController.setVolume(v);},getVolume:function()
{return this._playerController.getVolume();},mute:function()
{this._playerController.mute();},unmute:function()
{this._playerController.unmute();},getContentEntry:function(id)
{var catalogEntry=this._cms.getContentId(id);return CVP.Utils.JsonConverter.encodeXmlObject(catalogEntry.getXML());},setAdSection:function(ssid)
{this._playerController.setAdSection(ssid);},getCurrentPlayer:function(){return this._configData.containerInfo.elementName;},_onContentMetadata:function()
{this.eContentMetadata.dispatch.apply(this.eContentMetadata,arguments);},_onContentBegin:function()
{this.eContentBegin.dispatch.apply(this.eContentBegin,arguments);},_onContentPlay:function()
{this.eContentPlay.dispatch.apply(this.eContentPlay,arguments);},_onContentPause:function()
{this.eContentPause.dispatch.apply(this.eContentPause,arguments);},_onContentEnd:function()
{this.eContentEnd.dispatch.apply(this.eContentEnd,arguments);},_onContentComplete:function()
{this.eContentComplete.dispatch.apply(this.eContentComplete,arguments);},_onContentPlayhead:function()
{this.eContentPlayhead.dispatch.apply(this.eContentPlayhead,arguments);},_onContentBuffering:function()
{this.eContentBuffering.dispatch.apply(this.eContentBuffering,arguments);},_onContentVolume:function()
{this.eContentVolume.dispatch.apply(this.eContentVolume,arguments);},_onContentError:function()
{this.eContentError.dispatch.apply(this.eContentError,arguments);},_onContentResize:function()
{this.eContentResize.dispatch.apply(this.eContentResize,arguments);},_onAdPlayhead:function()
{this.eAdPlayhead.dispatch.apply(this.eAdPlayhead,arguments);},_onAdPlay:function()
{this.eAdPlay.dispatch.apply(this.eAdPlay,arguments);},_onAdEnd:function()
{this.eAdEnd.dispatch.apply(this.eAdEnd,arguments);},_onAdError:function()
{this.eAdError.dispatch.apply(this.eAdError,arguments);},_onTrackingAdStart:function()
{this.eTrackingAdStart.dispatch.apply(this.eTrackingAdStart,arguments);},_onTrackingAdComplete:function()
{this.eTrackingAdComplete.dispatch.apply(this.eTrackingAdComplete,arguments);},_onTrackingAdProgress:function()
{this.eTrackingAdProgress.dispatch.apply(this.eTrackingAdProgress,arguments);},_onTrackingAdCountdown:function()
{this.eTrackingAdCountdown.dispatch.apply(this.eTrackingAdCountdown,arguments);},_onTrackingContentPlay:function()
{this.eTrackingContentPlay.dispatch.apply(this.eTrackingContentPlay,arguments);},_onTrackingContentBegin:function()
{this.eTrackingContentBegin.dispatch.apply(this.eTrackingContentBegin,arguments);},_onTrackingContentProgress:function()
{this.eTrackingContentProgress.dispatch.apply(this.eTrackingContentProgress,arguments);},_onTrackingContentComplete:function()
{log('MainController','onTrackingContentComplete');this.eTrackingContentComplete.dispatch.apply(this.eTrackingContentComplete,arguments);},_onTrackingContentSeek:function()
{this.eTrackingContentSeek.dispatch.apply(this.eTrackingContentSeek,arguments);},_onTrackingFullscreen:function()
{this.eTrackingFullscreen.dispatch.apply(this.eTrackingFullscreen,arguments);},_onTrackingMuted:function()
{this.eTrackingMuted.dispatch.apply(this.eTrackingMuted,arguments);},_onTrackingPaused:function()
{this.eTrackingPaused.dispatch.apply(this.eTrackingPaused,arguments);},_onCmsRequestCompleted:function(contentId,requestId,index,errorMsg)
{log("_onCmsRequestCompleted",contentId,requestId,index,errorMsg);var key=requestId+"|"+index;var catalogEntry=this._cms.getContentId((contentId+"|"+index));if(this._loadingEntryQueue[key]!==null)
{log("onCmsRequestCompleted",contentId,this._loadingEntryQueue[key].play);if(this._loadingEntryQueue[key].play)
{this._playerController.emptyQueue();this._playerController.play(catalogEntry,this._loadingEntryQueue[key].additionalParams);}
else
{this._playerController.queue(catalogEntry,this._loadingEntryQueue[key].additionalParams);}
delete this._loadingEntryQueue[key];}},_getNextIndexForId:function(contentId)
{var index=0,p,q;for(p in this._loadingEntryQueue)
{q=p.split("|");if(q[0]===contentId&&q[1]>=index)
{index=q[1]+1;}}
return index;}});CVP.Players._HTML5Player=Class.extend({init:function(options)
{this._manager=new CVPManager();this._manager.ePlayerLoaded.addListener(this._onPlayerLoaded,this);this._manager.ePlayerLoadError.addListener(this._onPlayerLoadError,this);this._manager.ePlayerRendered.addListener(this._onPlayerRendered,this);this._manager.eContentMetadata.addListener(this._onContentMetadata,this);this._manager.eContentBegin.addListener(this._onContentBegin,this);this._manager.eContentPlay.addListener(this._onContentPlay,this);this._manager.eContentPause.addListener(this._onContentPause,this);this._manager.eContentEnd.addListener(this._onContentEnd,this);this._manager.eContentComplete.addListener(this._onContentComplete,this);this._manager.eContentPlayhead.addListener(this._onContentPlayhead,this);this._manager.eContentBuffering.addListener(this._onContentBuffering,this);this._manager.eContentVolume.addListener(this._onContentVolume,this);this._manager.eContentError.addListener(this._onContentError,this);this._manager.eContentResize.addListener(this._onContentResize,this);this._manager.eAdPlayhead.addListener(this._onAdPlayhead,this);this._manager.eAdPlay.addListener(this._onAdPlay,this);this._manager.eAdEnd.addListener(this._onAdEnd,this);this._manager.eAdError.addListener(this._onAdError,this);this._manager.eTrackingAdStart.addListener(this._onTrackingAdStart,this);this._manager.eTrackingAdComplete.addListener(this._onTrackingAdComplete,this);this._manager.eTrackingAdProgress.addListener(this._onTrackingAdProgress,this);this._manager.eTrackingAdCountdown.addListener(this._onTrackingAdCountdown,this);this._manager.eTrackingContentPlay.addListener(this._onTrackingContentPlay,this);this._manager.eTrackingContentBegin.addListener(this._onTrackingContentBegin,this);this._manager.eTrackingContentProgress.addListener(this._onTrackingContentProgress,this);this._manager.eTrackingContentComplete.addListener(this._onTrackingContentComplete,this);this._manager.eTrackingContentSeek.addListener(this._onTrackingContentSeek,this);this._manager.eTrackingFullscreen.addListener(this._onTrackingFullscreen,this);this._manager.eTrackingMuted.addListener(this._onTrackingMuted,this);this._manager.eTrackingPaused.addListener(this._onTrackingPaused,this);this.ePlayerLoaded=new Event();this.ePlayerLoadError=new Event();this.ePlayerReady=new Event();this.eContentMetadata=new Event();this.eContentBegin=new Event();this.eContentPlay=new Event();this.eContentPause=new Event();this.eContentEnd=new Event();this.eContentComplete=new Event();this.eContentPlayhead=new Event();this.eContentBuffering=new Event();this.eContentVolume=new Event();this.eContentError=new Event();this.eContentResize=new Event();this.eAdPlayhead=new Event();this.eAdPlay=new Event();this.eAdEnd=new Event();this.eAdError=new Event();this.eTrackingAdStart=new Event();this.eTrackingAdComplete=new Event();this.eTrackingAdProgress=new Event();this.eTrackingAdCountdown=new Event();this.eTrackingContentPlay=new Event();this.eTrackingContentBegin=new Event();this.eTrackingContentProgress=new Event();this.eTrackingContentComplete=new Event();this.eTrackingContentSeek=new Event();this.eTrackingFullscreen=new Event();this.eTrackingMuted=new Event();this.eTrackingPaused=new Event();this._manager.load(options);},render:function(containerElement)
{this._manager.render(containerElement);},remove:function()
{this._manager.remove();},getDefaultPlayer:function(){return this._manager.getCurrentPlayer();},play:function(id,options)
{this._manager.playContentWithId(id,options);},queue:function(id,options)
{this._manager.queueContentWithId(id,options);},pause:function()
{this._manager.pause();},resume:function()
{this._manager.resume();},resize:function(width,height)
{this._manager.resize(width,height);},setVolume:function(v)
{this._manager.setVolume(v);},getVolume:function()
{return this._manager.getVolume();},mute:function()
{this._manager.mute();},unmute:function()
{this._manager.unmute();},getContentEntry:function(id)
{return this._manager.getContentEntry(id);},setAdSection:function(ssid)
{this._manager.setAdSection(ssid);},_mungeArgs:function(argv)
{var args=slice(argv);args.unshift(this.getDefaultPlayer());return args;},_onPlayerLoaded:function()
{this.ePlayerLoaded.dispatch();},_onPlayerLoadError:function()
{this.ePlayerLoadError.dispatch();},_onPlayerRendered:function()
{this.ePlayerReady.dispatch.apply(this.ePlayerReady,this._mungeArgs(arguments));},_onContentMetadata:function()
{this.eContentMetadata.dispatch.apply(this.eContentMetadata,this._mungeArgs(arguments));},_onContentBegin:function()
{this.eContentBegin.dispatch.apply(this.eContentBegin,this._mungeArgs(arguments));},_onContentPlay:function()
{this.eContentPlay.dispatch.apply(this.eContentPlay,this._mungeArgs(arguments));},_onContentPause:function()
{this.eContentPause.dispatch.apply(this.eContentPause,this._mungeArgs(arguments));},_onContentEnd:function()
{this.eContentEnd.dispatch.apply(this.eContentEnd,this._mungeArgs(arguments));},_onContentComplete:function()
{this.eContentComplete.dispatch.apply(this.eContentComplete,this._mungeArgs(arguments));},_onContentPlayhead:function()
{this.eContentPlayhead.dispatch.apply(this.eContentPlayhead,this._mungeArgs(arguments));},_onContentBuffering:function()
{this.eContentBuffering.dispatch.apply(this.eContentBuffering,this._mungeArgs(arguments));},_onContentVolume:function()
{this.eContentVolume.dispatch.apply(this.eContentVolume,this._mungeArgs(arguments));},_onContentError:function()
{this.eContentError.dispatch.apply(this.eContentError,this._mungeArgs(arguments));},_onContentResize:function()
{this.eContentResize.dispatch.apply(this.eContentResize,this._mungeArgs(arguments));},_onAdPlayhead:function()
{this.eAdPlayhead.dispatch.apply(this.eAdPlayhead,this._mungeArgs(arguments));},_onAdPlay:function()
{this.eAdPlay.dispatch.apply(this.eAdPlay,this._mungeArgs(arguments));},_onAdEnd:function()
{this.eAdEnd.dispatch.apply(this.eAdEnd,this._mungeArgs(arguments));},_onAdError:function()
{this.eAdError.dispatch.apply(this.eAdError,this._mungeArgs(arguments));},_onTrackingAdStart:function()
{this.eTrackingAdStart.dispatch.apply(this.eTrackingAdStart,this._mungeArgs(arguments));},_onTrackingAdComplete:function()
{this.eTrackingAdComplete.dispatch.apply(this.eTrackingAdComplete,this._mungeArgs(arguments));},_onTrackingAdProgress:function()
{this.eTrackingAdProgress.dispatch.apply(this.eTrackingAdProgress,this._mungeArgs(arguments));},_onTrackingAdCountdown:function()
{this.eTrackingAdCountdown.dispatch.apply(this.eTrackingAdCountdown,this._mungeArgs(arguments));},_onTrackingContentPlay:function()
{this.eTrackingContentPlay.dispatch.apply(this.eTrackingContentPlay,this._mungeArgs(arguments));},_onTrackingContentBegin:function()
{this.eTrackingContentBegin.dispatch.apply(this.eTrackingContentBegin,this._mungeArgs(arguments));},_onTrackingContentProgress:function()
{this.eTrackingContentProgress.dispatch.apply(this.eTrackingContentProgress,this._mungeArgs(arguments));},_onTrackingContentComplete:function()
{this.eTrackingContentComplete.dispatch.apply(this.eTrackingContentComplete,this._mungeArgs(arguments));},_onTrackingContentSeek:function()
{this.eTrackingContentSeek.dispatch.apply(this.eTrackingContentSeek,this._mungeArgs(arguments));},_onTrackingFullscreen:function()
{this.eTrackingFullscreen.dispatch.apply(this.eTrackingFullscreen,this._mungeArgs(arguments));},_onTrackingMuted:function()
{this.eTrackingMuted.dispatch.apply(this.eTrackingMuted,this._mungeArgs(arguments));},_onTrackingPaused:function()
{this.eTrackingPaused.dispatch.apply(this.eTrackingPaused,this._mungeArgs(arguments));}});}());addBeforeUnLoadEvent(CVP.cleanup);window.CVP=CVP.Utils.extend(CVPconstructor,CVP.Utils.extend(window.CVP||{},CVP));}());(function(){if(window.Aspen){return;}
var VERSION="1.0.0";var debug=[window.location.search,window.location.hash].join().search(/\bdmtdebug\b/)!==-1;var Class=(function(){var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\b_super\b/:/.*/;var Class=function(){};Class.extend=function(prop){var _super=this.prototype;initializing=true;var prototype=new this();initializing=false;for(var name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,prop[name]):prop[name];}function Class(){if(!initializing&&this.init)this.init.apply(this,arguments);}Class.prototype=prototype;Class.constructor=Class;Class.extend=arguments.callee;return Class;};return Class;})();(function(a,b,c){function H(){var a=z;a.loader={load:G,i:0};return a}function G(a,b,c){var e=b=="c"?r:q;i=0,b=b||"j",u(a)?F(e,a,b,this.i++,d,c):(h.splice(this.i++,0,a),h.length==1&&E());return this}function F(a,c,d,g,j,l){function q(){!o&&A(n.readyState)&&(p.r=o=1,!i&&B(),n.onload=n.onreadystatechange=null,e(function(){m.removeChild(n)},0))}var n=b.createElement(a),o=0,p={t:d,s:c,e:l};n.src=n.data=c,!k&&(n.style.display="none"),n.width=n.height="0",a!="object"&&(n.type=d),n.onload=n.onreadystatechange=q,a=="img"?n.onerror=q:a=="script"&&(n.onerror=function(){p.e=p.r=1,E()}),h.splice(g,0,p),m.insertBefore(n,k?null:f),e(function(){o||(m.removeChild(n),p.r=p.e=o=1,B())},z.errorTimeout)}function E(){var a=h.shift();i=1,a?a.t?e(function(){a.t=="c"?D(a):C(a)},0):(a(),B()):i=0}function D(a){var c=b.createElement("link"),d;c.href=a.s,c.rel="stylesheet",c.type="text/css";if(!a.e&&(o||j)){var g=function(a){e(function(){if(!d)try{a.sheet.cssRules.length?(d=1,B()):g(a)}catch(b){b.code==1e3||b.message=="security"||b.message=="denied"?(d=1,e(function(){B()},0)):g(a)}},0)};g(c)}else c.onload=function(){d||(d=1,e(function(){B()},0))},a.e&&c.onload();e(function(){d||(d=1,B())},z.errorTimeout),!a.e&&f.parentNode.insertBefore(c,f)}function C(a){var c=b.createElement("script"),d;c.src=a.s,c.onreadystatechange=c.onload=function(){!d&&A(c.readyState)&&(d=1,B(),c.onload=c.onreadystatechange=null)},e(function(){d||(d=1,B())},z.errorTimeout),a.e?c.onload():f.parentNode.insertBefore(c,f)}function B(){var a=1,b=-1;while(h.length-++b)if(h[b].s&&!(a=h[b].r))break;a&&E()}function A(a){return!a||a=="loaded"||a=="complete"}var d=b.documentElement,e=a.setTimeout,f=b.getElementsByTagName("script")[0],g={}.toString,h=[],i=0,j="MozAppearance"in d.style,k=j&&!!b.createRange().compareNode,l=j&&!k,m=k?d:f.parentNode,n=a.opera&&g.call(a.opera)=="[object Opera]",o="webkitAppearance"in d.style,p=o&&"async"in b.createElement("script"),q=j?"object":n||p?"img":"script",r=o?"img":q,s=Array.isArray||function(a){return g.call(a)=="[object Array]"},t=function(a){return Object(a)===a},u=function(a){return typeof a=="string"},v=function(a){return g.call(a)=="[object Function]"},w=[],x={},y,z;z=function(a){function h(a,b){function i(a){if(u(a))g(a,f,b,0,c);else if(t(a))for(h in a)a.hasOwnProperty(h)&&g(a[h],f,b,h,c)}var c=!!a.test,d=c?a.yep:a.nope,e=a.load||a.both,f=a.callback,h;i(d),i(e),a.complete&&b.load(a.complete)}function g(a,b,d,e,g){var h=f(a),i=h.autoCallback;if(!h.bypass){b&&(b=v(b)?b:b[a]||b[e]||b[a.split("/").pop().split("?")[0]]);if(h.instead)return h.instead(a,b,d,e,g);d.load(h.url,h.forceCSS||!h.forceJS&&/css$/.test(h.url)?"c":c,h.noexec),(v(b)||v(i))&&d.load(function(){H(),b&&b(h.origUrl,g,e),i&&i(h.origUrl,g,e)})}}function f(a){var b=a.split("!"),c=w.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=x[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=w[h](f);return f}var b,d,e=this.yepnope.loader;if(u(a))g(a,0,e,0);else if(s(a))for(b=0;b<a.length;b++)d=a[b],u(d)?g(d,0,e,0):s(d)?z(d):t(d)&&h(d,e);else t(a)&&h(a,e)},z.addPrefix=function(a,b){x[a]=b},z.addFilter=function(a){w.push(a)},z.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",y=function(){b.removeEventListener("DOMContentLoaded",y,0),b.readyState="complete"},0)),a.yepnope=H()})(this,this.document);var Utils=CVP.Utils;var log=function(){var string='';if(window.console&&window.console.log&&debug)
{string=Utils.slice(arguments).join(" | ");window.console.log(string);if(Utils.isFunc(window.logJSAuth))
{window.logJSpAuth(string);}}};var Ajax=CVP.Ajax;var AspenComm=(function(){var
REMOTE="http://aspen-qa.turner.com",xhr,init,inited=false,queue=[],dequeue,request,queue_request,make_request;init=function(remote){REMOTE=remote;xhr=new window.CVP.easyXDM.Rpc({swf:"http://i.cdn.turner.com/xslo/cvp/easyxdm/swf/easyxdm.swf",remote:REMOTE+"/static/xdm_iframe.html"},{remote:{request:{}}});log("[aspen]","[easyXDM]","init AspenComm");inited=true;init=function(){throw new Error("already init'ed - ignored");};dequeue();};request=function(config,succ,fail){if(inited){make_request(config,succ,fail);}else{queue_request(config,succ,fail);}};queue_request=function(){queue.push[arguments];};dequeue=function(){var i=0,endi=queue.length;for(;i<endi;++i){make_request.apply(null,queue[i]);}};make_request=function(options,succ,fail){log("[aspen]","[easyXDM]","make request",options);var config,successFn,errorFn;config=Utils.extend(Utils.extend({method:'POST'},options||{}));successFn=function(response){var json=response.data;if(typeof json==='string'&&json.charAt(0).match(/[{[]/)){try{json=JSON.parse(json);}catch(e){log(e);}}
log("[aspen]","[easyXDM]","request success",response);succ(json,response.status,response.headers);};errorFn=function(response){var json=response.data;if(typeof json==='string'&&json.charAt(0).match(/[{[]/)){try{json=JSON.parse(json);}catch(e){log(e);}}
fail(json,response.status,response.message);};xhr.request(config,successFn,errorFn);};return({init:init,request:request});}());var bootstrap=function(fn){window.CVP=window.CVP||{};yepnope({test:window.CVP.easyXDM!=null,nope:'http://z.cdn.turner.com/xslo/cvp/easyxdm/js/easyXDM.ugly.js',complete:function(){if(!window.easyXDM){throw new Error('failed to install easyXDM');}else{window.CVP.easyXDM=easyXDM.noConflict('CVP');yepnope({test:window.JSON!=null,nope:'http://z.cdn.turner.com/xslo/cvp/easyxdm/js/json2.ugly.js',complete:function(){if(!window.JSON){throw new Error('failed to install JSON polyfill');}},complete:fn});}}});};var DependencyManager=function(){this._dependencies=[];this._loadedCount=0;this._successHandlers=[];this._failureHandlers=[];this.add=function(dependency){this._dependencies.push({dependency:dependency,success:false});var index=this._dependencies.length-1;dependency.onComplete(Utils.bind(this._onDependencyLoaded,this,index,true));dependency.onFailure(Utils.bind(this._onDependencyLoaded,this,index,false));};this.load=function(){for(var i=0,len=this._dependencies.length;i<len;i++){this._dependencies[i].dependency.load();}};this.onComplete=function(func){this._successHandlers.push(func);};this.onFailure=function(func){this._failureHandlers.push(func);};this._onDependencyLoaded=function(index,success){++this._loadedCount;this._dependencies[index].success=success;if(this._loadedCount===this._dependencies.length){this._onAllDependenciesLoaded();}};this._onAllDependenciesLoaded=function(){this._loadedCount=0;var success=true;for(var i=0,len=this._dependencies.length;i<len;i++){if(!this._dependencies[i].success){success=false;break;}}
var handlers=(success)?this._successHandlers:this._failureHandlers;for(i=0,len=handlers.length;i<len;i++){handlers[i]();}};};var Dependency=function(func){this._func=func;this._successHandlers=[];this._failureHandlers=[];this.load=function(){this._func(Utils.bind(this._onSuccess,this),Utils.bind(this._onFailure,this));};this.onComplete=function(func){this._successHandlers.push(func);};this.onFailure=function(func){this._failureHandlers.push(func);};this._onSuccess=function(){for(var i=0,len=this._successHandlers.length;i<len;i++){this._successHandlers[i]();}};this._onFailure=function(){for(var i=0,len=this._failureHandlers.length;i<len;i++){this._failureHandlers[i]();}};};var ANALYTICS_BASE_URL="http://i.cdn.turner.com/xslo/cvp/config/";var BATCH_MODE_TOTAL="total";var BATCH_MODE_TIMER="timer";var BATCH_MODE_NONE="none";var _params={};var _analyticsConfig={};var BatchService=Class.extend({init:function(config)
{this._enabled=false;this._queue=[];this._config=config;this._timer;this._firstPostTimer;},start:function(config){this._config=config;this._enabled=true;if(_analyticsConfig.batchMode==BATCH_MODE_TIMER)
{log("[aspen]","start timer");var _this=this;this._timer=setTimeout(function(){_this._postTimerEvent();},Number(_analyticsConfig.batchModeAmount)*1000);var random=Math.ceil(Math.random()*Number(_analyticsConfig.batchModeAmount));if(random==Number(_analyticsConfig.batchModeAmount))
{random--;if(random<=0)
{random=0.5;}}
log("[aspen]","random time: "+random);this._firstPostTimer=setTimeout(function(){_this._firstPostTimerEvent();},random*1000);}},add:function(message)
{this._addToQueue(message);if(!this._enabled){log("[aspen]","Batch service not enabled. Queuing message.");return;}
if(_analyticsConfig.enabled&&!this._config.batchThrottled)
{if(_analyticsConfig.batchMode==BATCH_MODE_TOTAL)
{if(this._queue.length==_analyticsConfig.batchModeAmount)
{this.post();}}
else if(_analyticsConfig.batchMode==BATCH_MODE_NONE)
{this.post();}
else if(_analyticsConfig.batchMode!=BATCH_MODE_TIMER)
{this.post();}
if(this._queue.length>0)
{if((message["eventType"]=="error")&&(typeof _analyticsConfig.highPriorityErrors!="undefined"))
{this.flushByError(message["eventData"]);}
else if((message["eventType"]!="error")&&(typeof _analyticsConfig.highPriorityEvents!="undefined"))
{this.flushByEvent(message["eventType"]);}}}
else
{if(_analyticsConfig.enabled)
{log("[aspen]","Aspen is diabled via analyticsConfig. Message not added.");}
if(this._config.batchThrottled)
{log("[aspen]","Batching is throttled. Message not added.");}}},_addToQueue:function(message){log("[aspen]","Adding message to batch queue.");this._queue.push(message);},post:function()
{if(!this._config.postThrottled)
{var data={"sessionId":this._config.sessionId,"events":this._queue};log("[aspen]","send batch string");if(!Utils.isNull(this._config.requestMethod)&&(this._config.requestMethod=="easyXDM"))
{AspenComm.request({url:_analyticsConfig.batchApi,data:{aspenJson:JSON.stringify(data)}},Utils.bind(this._postSuccess,this),Utils.bind(this._postFailure,this));}
else
{var jsonData="";var jsonpUrl=_analyticsConfig.servicesUrl+_analyticsConfig.batchApi;if(jsonpUrl.indexOf('.jsonp')===-1){jsonpUrl+='.jsonp';}
if(_analyticsConfig.batchContentEncoding=="gzip")
{var jsonString="?aspenJson="+JSON.stringify(data);var uriEncodedString=encodeURIComponent(jsonString).replace(/%20/g,"+");var gzipEncodedString=uriEncodedString;jsonData=gzipEncodedString;}
else
{jsonData='?aspenJson='+encodeURIComponent(JSON.stringify(data)).replace(/%20/g,'+');}
Ajax.request({jsonpCallback:'aspenPostBatch',url:jsonpUrl+jsonData,error:Utils.bind(this._postFailure,this),success:Utils.bind(this._postSuccess,this)});}
this._queue=[];}
else
{log("[aspen]","Batch posting is throttled. Batch not posted.");}},_postTimerEvent:function()
{log("[aspen]","postTimer - queue.length: "+this._queue.length);if(this._queue.length>0)
{log("[aspen]","posting "+this._queue.length+" messages");this.post();}
else
{log("[aspen]","no messages to post");}
var _this=this;this._timer=setTimeout(function(){_this._postTimerEvent();},Number(_analyticsConfig.batchModeAmount)*1000);},_firstPostTimerEvent:function()
{log("[aspen]","firstPostTimer - queue.length: "+this._queue.length);if(this._queue.length>0)
{log("[aspen]","posting "+this._queue.length+" messages");this.post();}
else
{log("[aspen]","no messages to post");}},_postSuccess:function(data)
{log("[aspen]","post success: "+data);},_postFailure:function(url)
{log("[aspen]","post failed: "+url);},flushByError:function(message)
{if(typeof message.errorCode!="undefined")
{var errorCode=message.errorCode;var errorCodeType=errorCode.substring(0,2);var errorCodeSub=errorCode.substring(2,4);var errorCodeLevel=errorCode.substring(4,6);var errorCodeNumber=errorCode.substring(6);var priorityArray=[];priorityArray=_analyticsConfig.highPriorityErrors.split(",");var typeStr="";var subtypeStr="";var levelStr="";var codeNumberStr="";var types=[];var subtypes=[];var levels=[];var codeNumbers=[];for(var i=0,endi=priorityArray.length;i<endi;++i)
{switch(i)
{case 0:typeStr=String(priorityArray[i]);types=typeStr.split("+");break;case 1:subtypeStr=String(priorityArray[i]);subtypes=subtypeStr.split("+");break;case 2:levelStr=String(priorityArray[i]);levels=levelStr.split("+");break;case 3:codeNumberStr=String(priorityArray[i]);codeNumbers=codeNumberStr.split("+");break;}}
for(i=0,endi=types.length;i<endi;++i)
{var type=String(types[i]);if((errorCodeType==type)||(type=="*"))
{for(var j=0,endj=subtypes.length;j<endj;++j)
{var subtype=String(subtypes[j]);if((errorCodeSub==subtype)||(subtype=="*"))
{for(var k=0,endk=levels.length;k<endk;++k)
{var level=String(levels[k]);if((errorCodeLevel==level)||(level=="*"))
{for(var l=0,endl=codeNumbers.length;l<endl;++l)
{var codeNumber=String(codeNumbers[l]);if((errorCodeNumber==codeNumber)||(codeNumber=="*"))
{log("[aspen","[flushByError] found match, flushing batch");this.post();}}}}}}}}}},flushByEvent:function(messageType)
{var priorityArray=_analyticsConfig.highPriorityEvents.split(",");for(var i=0,endi=priorityArray.length;i<endi;++i)
{var type=String(priorityArray[i]);if(type==messageType)
{log("[aspen]","[flushBatchByEvent] found match, flushing batch");this.post();}}},setSessionId:function(id)
{this._config.sessionId=id;},setBatchThrottled:function(throttle)
{this._config.batchThrottled=throttle;},setPostThrottled:function(throttle)
{this._config.postThrottled=throttle;},disableTimer:function()
{if(_analyticsConfig.batchMode==BATCH_MODE_TIMER)
{clearTimeout(this._timer);}}});var LoadState={WAITING:"loadStateWaiting",LOADING:"loadStateLoading",READY:"loadStateReady",FAILED:"loadStateFailed"};var Aspen=window.Aspen={init:function(options)
{var self=this;if(Utils.undef(this.initialized))
{this.initialized=true;this.ready=false;this.batchService;this.sessionObject={};this.serviceUrlRoot;this.isThrottled=true;this.sessionId=-1;this.timeDifference=0;this._retryTimer;this._retries=0;this._retriesMade=0;this._retryTime=0;this._savedSession={};this._timestampStr="";this.sessionToken="";this._appId="";this._requestMethod="jsonp";this._messageQueue=[];this._loadState=LoadState.WAITING;this._configLoaded=false;this._dependenciesLoaded=false;_params=this._options=options;_params.site=_params&&_params.site;_params.profile=_params&&_params.profile;_params.context=_params&&_params.context;_params.contentId=_params&&_params.contentId;_params.containerUrl=_params&&_params.containerUrl;_params.configUrl=_params&&_params.configUrl;_params.requestMethod=_params&&_params.requestMethod;_params.dt=_params&&_params.superduperdevtime;_params.configBaseUrl=_params&&_params.configBaseUrl;if(!Utils.undef(_params.requestMethod)&&!Utils.empty(_params.requestMethod))
{this._requestMethod=_params.requestMethod;}
log("[aspen]","requestMethod",this._requestMethod);if(Utils.empty(_params.site))
{log("[aspen]","Unable to start Aspen, no site provided");}
else
{this.batchService=new BatchService();this._loadState=LoadState.LOADING;CVP.Events.onReady(function(){var manager=new DependencyManager();manager.add(new Dependency(Utils.bind(self._loadConfigFile,self)));manager.add(new Dependency(Utils.bind(self._loadRequiredJS,self)));manager.onComplete(Utils.bind(self._onDependenciesLoaded,self));manager.onFailure(Utils.bind(self._onDependenciesLoadFailure,self));manager.load();});}}},_loadConfigFile:function(success,failure){var basePath=_params.configBaseUrl||ANALYTICS_BASE_URL+_params.site;log("[aspen]","Using config base path: "+basePath);var analyticsConfigUrl=basePath+"/aspenanalytics.json?_="+Utils.now();Ajax.request({jsonpCallback:'cvp_onAnalyticsConfigReceived',url:analyticsConfigUrl,success:Utils.bind(this._loadConfigSuccess,this,success),error:Utils.bind(this._loadConfigFailure,this,failure)});},_loadConfigSuccess:function(cb,data)
{log("[aspen]","Config loaded successfully");_analyticsConfig=Utils.extend(Utils.extend({},data['default']||{}),data[_params.profile]||{});if(Utils.undef(_analyticsConfig.batchMode))
{_analyticsConfig.batchMode="total";}
if(Utils.undef(_analyticsConfig.batchModeAmount))
{_analyticsConfig.batchModeAmount="10";}
if(Utils.undef(_analyticsConfig.helloRetryCount))
{_analyticsConfig.helloRetryCount="5";}
if(Utils.undef(_analyticsConfig.helloRetryTime))
{_analyticsConfig.helloRetryTime="10000";}
if(Utils.undef(_analyticsConfig.batchContentEncoding))
{_analyticsConfig.batchContentEncoding="json";}
log("[aspen]","batchMode: ",_analyticsConfig.batchMode);log("[aspen]","batchModeAmount: ",_analyticsConfig.batchModeAmount);log("[aspen]","helloRetryCount: ",_analyticsConfig.helloRetryCount);log("[aspen]","helloRetryTime: ",_analyticsConfig.helloRetryTime);cb&&cb();},_loadConfigFailure:function(cb,url)
{log("[aspen]","Config failed to load",url);cb&&cb();},_loadRequiredJS:function(success,failure){var self=this;if(window.JSON!=null){this._loadRequiredJSSuccess(success);}else{yepnope({load:'http://z.cdn.turner.com/xslo/cvp/easyxdm/js/json2.ugly.js',complete:function(){if(!window.JSON){self._loadRequiredJSFailure(failure);return;}
self._loadRequiredJSSuccess(success);}});}},_loadRequiredJSSuccess:function(cb){log("[aspen]","External JS dependencies loaded successfully");cb&&cb();},_loadRequiredJSFailure:function(cb){log("[aspen]","External JS dependencies failed to load");cb&&cb();},_onDependenciesLoaded:function(){this._loadState=LoadState.READY;log("[aspen]","_onDependenciesLoaded - all required dependencies successfully loaded.");if(!Utils.undef(_analyticsConfig.enabled)&&_analyticsConfig.enabled==='true')
{log("[aspen]","analytics enabled via config");if(!Utils.undef(_analyticsConfig.servicesUrl)){this.serviceUrlRoot=_analyticsConfig.servicesUrl;if(this._requestMethod==="easyXDM")
{bootstrap(function(){AspenComm.init(_analyticsConfig.servicesUrl);});}
this._hello();}}
else
{log("[aspen]","analytics disabled via config");this._initFailure();}},_onDependenciesLoadFailure:function(){this._loadState=LoadState.FAILED;log("[aspen]","_onDependenciesLoadFailure - one or more required dependencies failed to load.");},_hello:function()
{var querySessionToken=Utils.getQueryParam("sessionToken");log("[aspen]","check querySessionToken: ",querySessionToken);if(!Utils.empty(querySessionToken))
{this.sessionToken=querySessionToken;this.send({},"authSessionReload");}
else
{if(!Utils.undef(CVP))
{this.sessionToken=CVP.getSessionToken();log("[aspen]","calling get sessionToken: ",this.sessionToken);}}
var data={propertyName:_params.site,pageUrl:document.URL,context:_params.context,protocol:"1.0"};if(!Utils.empty(this.sessionToken))
{data.sessionToken=this.sessionToken;}
if(this._requestMethod==="easyXDM")
{AspenComm.request({url:'/api/hello',data:{aspenJson:JSON.stringify(data)}},Utils.bind(this._helloSuccess,this),Utils.bind(this._helloFailure,this));}
else if(this._requestMethod==="jsonp")
{var jsonpUrl=_analyticsConfig.servicesUrl+_analyticsConfig.helloApi;if(jsonpUrl.indexOf('.jsonp')===-1){jsonpUrl+='.jsonp';}
jsonpUrl+='?aspenJson='+encodeURIComponent(JSON.stringify(data)).replace(/%20/g,'+');Ajax.request({jsonpCallback:'parseCVPServicesInitialization',url:jsonpUrl,error:Utils.bind(this._helloFailure,this),success:Utils.bind(this._helloSuccess,this)});}
this._retryTimer=setTimeout(Utils.bind(this._helloRetry,this),Number(_analyticsConfig.helloRetryTime));this._isRetrying=true;this.hello=function(){};},_helloSuccess:function(config)
{clearTimeout(this._retryTimer);this.isThrottled=(typeof config.throttled!=='undefined')&&(config.throttled!=='no')||this.isThrottled;this.sessionId=(typeof config.sessionId!=='undefined')?config.sessionId:this.sessionId;this._timestampStr=(typeof config.timestamp!=='undefined')?config.timestamp:this.timeDifference;this.timeDifference=Number(this._timestampStr)-Utils.now();if(config.throttled==="no")
{this.isThrottled=false;}
log("[aspen]","_helloSuccess");log("[aspen]","config.throttled: "+config.throttled);log("[aspen]","throttled: "+this.isThrottled);log("[aspen]","sessionId: "+this.sessionId);this._appId="CVP_"+Utils.randomString(25);var batchConfig={};batchConfig.batchThrottled=false;batchConfig.postThrottled=true;batchConfig.sessionId="";batchConfig.requestMethod=this._requestMethod;this.batchService.start(batchConfig);this.batchService.setSessionId(this.sessionId);this.batchService.setPostThrottled(this.isThrottled);this._initSuccess();},_helloFailure:function(url)
{log("[aspen]","_helloFailure url: "+url);},_helloRetry:function()
{if(this._retries==_analyticsConfig.helloRetryCount)
{clearTimeout(this._retryTimer);log("[aspen]","retries exhasted, aspen is disabled");this.isThrottled=true;this.batchService.setBatchThrottled(true);this.batchService.setPostThrottled(true);this.batchService.disableTimer();}
else
{this._retries++;this._retryTime=this._retries*Number(_analyticsConfig.helloRetryTime);this._savedSession.retries=String(this._retries);this._savedSession.retryTime=String(this._retryTime);this._hello();}},isMessageExcluded:function(message)
{if(_analyticsConfig&&_analyticsConfig.messageExcludes)
{if(_analyticsConfig.messageExcludes.indexOf(message)>=0)
{return true;}}
return false;},send:function(message,type)
{if(!this.ready){log("[aspen]","send - Aspen's not ready, queuing message");this._messageQueue.push({message:message,type:type});return;}
if(!this.isThrottled)
{if(this.isMessageExcluded(type))
{log("[aspen]","message excluded by config, not added to batch",type);return;}
message["timestamp"]=Utils.now()+this.timeDifference;message["appId"]=this._appId;log("[aspen]","appId: "+this._appId);var batchObj={};batchObj["eventType"]=type;batchObj["eventData"]=message;log("[aspen]","add to batch json message: "+JSON.stringify(batchObj));this.batchService.add(batchObj);}
else
{log("[aspen]","Add message to batch is throttled! Message not added.");}},setSessionToken:function(token)
{this.sessionToken=token;},_initSuccess:function()
{this.ready=true;for(var i=0,len=this._messageQueue.length;i<len;i++){this.send(this._messageQueue[i].message,this._messageQueue[i].type);}
var message={};message.screenWidth=screen.width;message.screenHeight=screen.height;message.browserName=navigator.appName;message.userAgent=navigator.userAgent;message.platform=navigator.platform;this.send(message,"systemInfo");this._initSuccess=function(){};},_initFailure:function()
{}};}).call(this);

function showTab(tabId,tabNo){var tabCollection=document.getElementById(tabId);tabCollection.className=tabId+tabNo+'Visible';}
var CVPCounter=0;var cnnCVP;var cnnVideoContexts=[];cnnVideoContexts.t1={width:662,height:423,autostart:1};cnnVideoContexts.live_4_1_t1={width:662,height:423,autostart:1};cnnVideoContexts.t1Bullet={width:278,height:152,autostart:0};cnnVideoContexts.hpBox1={width:320,height:180,autostart:0};cnnVideoContexts.teamCarousel={width:320,height:180,autostart:0};cnnVideoContexts.embed={width:400,height:225,autostart:0};cnnVideoContexts.storyEmbed={width:400,height:225,autostart:0};cnnVideoContexts.storyEmbed_4_1={width:400,height:225,autostart:0};cnnVideoContexts.story_4_1={width:640,height:360,autostart:1};cnnVideoContexts.hspotw={width:640,height:360,autostart:1};cnnVideoContexts.videosection_4_1={width:640,height:360,autostart:1};cnnVideoContexts.GotuitStream_4_1={width:640,height:360,autostart:1};cnnVideoContexts.GotuitStreamPreview_4_1={width:640,height:360,autostart:1};cnnVideoContexts.main_4_1={width:640,height:360,autostart:1};cnnVideoContexts.plain={width:640,height:360,autostart:1};cnnVideoContexts.swim11={width:672,height:378,autostart:1};cnnVideoContexts.NCAAvideo={width:640,height:360,autostart:1};cnnVideoContexts.behindthemic={width:576,height:397,autostart:1};cnnVideoContexts.swim11model={width:320,height:180,autostart:1};cnnVideoContexts.swim11modeltest={width:320,height:180,autostart:1};cnnVideoContexts.swim11home={width:704,height:396,autostart:1};cnnVideoContexts.swim11hometest={width:704,height:396,autostart:1};cnnVideoContexts.swim11={width:672,height:378,autostart:1};cnnVideoContexts.cms3T1Wide={width:662,height:423,autostart:0};cnnVideoContexts.cms3T1Bullet={width:278,height:152,autostart:0};cnnVideoContexts.swim12war={width:278,height:152,autostart:0};var cvpPlayers=new Array();function cnnVideoNewPlayer(videoId,vArea,vContext,vReturn,width,height){CVPCounter++;if(typeof vArea=='undefined'){vArea="player"+videoId;}
if(typeof vContext=='undefined'){vContext="main";}
if(typeof vReturn=='undefined'){vReturn=0;}
if(typeof width=='undefined'){width=0;}
if(typeof height=='undefined'){height=0;}
var cvpTmp;var vWidth;var vHeight;var autoStart=1;var noMediaFile=false;if(typeof cnnVideoContexts[vContext]!='undefined'){vWidth=cnnVideoContexts[vContext].width;vHeight=cnnVideoContexts[vContext].height;autoStart=cnnVideoContexts[vContext].autostart;}else if(width!=0&&height!=0){vWidth=width;vHeight=height;}else{vWidth=662;vHeight=373;}
if(window.location.pathname.indexOf('vault/swimsuit')!=-1){var html5Url=cvpHTML5Vault(videoId);if(isAppleMobile()=='true'){if(html5Url=='false'){html5Url='';noMediaFile=true;}}}else if((window.location.pathname.indexOf('/swimsuit/')!=-1)||(window.location.pathname.indexOf('/2012_swimsuit/')!=-1)||(window.location.pathname.indexOf('/2011_swimsuit/')!=-1)){var html5Url=cvpHTML5Swimsuit(videoId);if(isAppleMobile()=='true'){if(html5Url=='false'){html5Url='';noMediaFile=true;}}}
var timestamp=new Date().getTime();cvpTmp=new CVP({id:'cvp_'+CVPCounter,width:vWidth,height:vHeight,perVideoFallbacks:[{criteria:'${video.category}',evaluate:function(criteria){return(criteria.indexOf('swimsuit')!=-1)?true:false;},filter:html5Url}],flashVars:{context:vContext,site:'si',profile:'si_prod',autoplay:'false',contentId:videoId},embed:{containerSwf:'http://z.cdn.turner.com/xslo/cvp/assets/container/2.0.3.0/cvp_main_container.swf',expressInstallSwf:'http://z.cdn.turner.com/xslo/cvp/assets/flash/expressInstall.swf',options:{quality:'high',bgcolor:'#000000',allowFullScreen:'true',allowScriptAccess:'always',wmode:'transparent'}},onCVPReady:function(){siOnVideoPlayerReady();},onContentBegin:function(playerId,contentId){siOnVideoPlayerBegin(contentId);},onAdPlay:function(playerId,token,mode,id,duration,segmentId,adType){siOnAdStarted(token,videoId);},onAdEnd:function(playerId,token,mode,id,segmentId,adType){siOnAdFinished(token,videoId);},onContentPlay:function(playerId,contentId){this.switchTrackingContext(vContext);var vdata=this.getContentEntry(this.getContentId());sendVideoEvent(vdata,"video-start",playerId);siOnVideoPlayerPlay(contentId);document.getElementById('adCountdown').innerHTML='';},onContentPlayhead:function(playerId,contentId,playhead,duration){siOnVideoPlayerPlayHead(contentId,playhead,duration);},onContentPause:function(playerId,contentId,paused){var vdata=this.getContentEntry(this.getContentId());sendVideoEvent(vdata,"video-pause",playerId);siOnVideoPlayerPause(contentId,paused)},onContentBuffering:function(playerId,contentId,buffering){var vdata=this.getContentEntry(this.getContentId());if(buffering===true){sendVideoEvent(vdata,"video-buffer",playerId);}
siLog.debug('onContentBuffering: Complete');},onTrackingContentSeek:function(playerId,contentId){var vdata=this.getContentEntry(this.getContentId());sendVideoEvent(vdata,"video-scrub",playerId);siOnVideoTrackingSeek();siLog.debug('onTrackingContentSeek: Complete');},onTrackingContentProgress:function(playerId,dataObj){var vdata=this.getContentEntry(this.getContentId());if(Math.floor(dataObj.percent)>=50&&Math.floor(dataObj.percent)<=55){sendVideoEvent(vdata,"video-fifty_percent",playerId);}},onContentEnd:function(playerId,contentId){var vdata=this.getContentEntry(this.getContentId());sendVideoEvent(vdata,"video-complete",playerId);siLog.debug('onContentEnd: Complete');},onContentComplete:function(playerId,contentId){siOnVideoPlayerComplete(contentId);},onTrackingAdCountdown:function(playerId,trackingObj){siOnVideoTrackingAdCountdown(trackingObj.secs);},onNoFlashDetected:function(){siOnNoFlashDetected(vArea);},onContentError:function(playerId,contentId,errorMessage){siOnVideoPlayerError(errorMessage);if(errorMessage=='The media resource indicated by the src attribute was not suitable'){noMediaFile=true;}}});if(noMediaFile===true){document.getElementById(vArea).innerHTML='The device in use is not supported for this section of our site.';}else{cnnCVP=cvpTmp;if(vReturn==1||vReturn=='true'){cnnCVP.embedSWF(vArea);return cnnCVP;}else{cnnCVP.embedSWF(vArea);}}}
function cvpHTML5Vault(videoId){var videoXmlUrl='/.element/auto/video/tvp_mdf/swimsuit-vault/'+videoId+'.xml';xmlhttp=new XMLHttpRequest();xmlhttp.open("GET",videoXmlUrl,false);xmlhttp.send();var data=xmlhttp.responseXML;var html5Url;var id=data.getElementsByTagName("video")[0].getAttribute("id");var videoFile=data.getElementsByTagName("file")[0].childNodes[0].nodeValue;if(videoFile.indexOf('2009')!=-1){html5Url='http://ht.cdn.turner.com/si/big/video/swimsuit/2009/'+id+'.mp4';}else if(videoFile.indexOf('2008')!=-1){id=data.getElementsByTagName("file")[0].childNodes[0].nodeValue.replace(".f4v","");id=id.replace("/swimsuit/2008/","");id=id.replace(/%20/g,".");id=id.toLowerCase();if(id.indexOf('will.and.heidi1')!=-1){id=id.replace("1","");}
html5Url='http://ht.cdn.turner.com/si/big/video/swimsuit/2008/'+id+'.mp4';html5Url=html5Url.replace("..",".");}else if(videoFile.indexOf('2007')!=-1){id=data.getElementsByTagName("file")[0].childNodes[0].nodeValue.replace(".f4v","");id=id.replace("/swimsuit/2007/","");id=id.replace(/%20/g,".");id=id.toLowerCase();html5Url='http://ht.cdn.turner.com/si/big/video/swimsuit/2007/'+id+'.mp4';html5Url=html5Url.replace("..",".");}else if(videoFile.indexOf('2006')!=-1){id=data.getElementsByTagName("file")[0].childNodes[0].nodeValue.replace(".flv","");id=id.replace("/swimsuit/2006/","");id=id.toLowerCase();if(id.indexOf('nakashima')!=-1){id=id.replace("04/","11/");}
html5Url='http://ht.cdn.turner.com/si/big/video/swimsuit/2006/'+id+'.mp4';}else if(videoFile.indexOf('2005')!=-1){id=data.getElementsByTagName("file")[0].childNodes[0].nodeValue.replace(".flv","");id=id.replace("/swimsuit/2005/","");id=id.toLowerCase();if(id.indexOf('annev')!=-1){id=id.replace("05_","05.");}
html5Url='http://ht.cdn.turner.com/si/big/video/swimsuit/2005/'+id+'.mp4';}else if(videoFile.indexOf('2004')!=-1){id=data.getElementsByTagName("file")[0].childNodes[0].nodeValue.replace(".flv","");id=id.replace("/swimsuit/2004/","");if(id.indexOf('noemie')!=-1){id=id.replace("noemie","noemi");}
html5Url='http://ht.cdn.turner.com/si/big/video/swimsuit/2004/'+id+'.mp4';}else if(videoFile.indexOf('2003')!=-1){html5Url='false';}
return html5Url;}
function cvpHTML5Swimsuit(videoId){var videoXmlUrl='/.element/auto/video/tvp_mdf/swimsuit/'+videoId+'.xml';xmlhttp=new XMLHttpRequest();xmlhttp.open("GET",videoXmlUrl,false);xmlhttp.send();var data=xmlhttp.responseText;var html5video=false;var matchArr;matchArr=data.match(/<file bitrate="400"[^>]+>([^<]+)<\/file>/);html5video=matchArr[1].replace(/\d+\.f4v/,'mov');html5video=html5video.replace(/f[l4]v$/,'mov');html5video=html5video.replace('_HOME','');html5video=html5video.replace('_MODEL','');html5video=html5video.replace('_VIDEO','');var html5url='http://ht.cdn.turner.com/si/big/video'+html5video;return html5url;}
function cnnVideoPlayer(videoId,vArea,vContext){cnnVideoNewPlayer(videoId,vArea,vContext,0);}
function cnnStoryPlayer(videoId,vArea){cnnVideoNewPlayer(videoId,vArea,"story_4_1",0,640,373);}
function cnnSmallStoryPlayer(videoId,vArea){cnnVideoNewPlayer(videoId,vArea,"storyEmbed",0,400,225);}
function cnnVideoNewPlayerBtm(videoId,vArea,vContext,vReturn){cnnVideoNewPlayer(videoId,vArea,vContext,vReturn);}
function buildCVP(videoId,vContext,playerObjId){var thiscvpplayer=cnnVideoNewPlayer(videoId,'',vContext,1);return thiscvpplayer;}
function cnnSwim11Video(videoId,vArea,vContext){cnnVideoNewPlayer(videoId,vArea,vContext);}
function si_watercooler_vid(videoId){var inc=Math.floor(Math.random()*90000);var dom_id="sivid_"+inc;document.write('<div id="'+dom_id+'"></div>');cnnVideoNewPlayer(videoId,dom_id,"storyEmbed",inc);}
var hasScrubbed=false;var isAuto=false;var isHalf=false;var isBuffering=false;var isPaused=false;var vidObj;var videoPage=(location.pathname.indexOf('/video')===0)?'main':(location.pathname.indexOf('/swimsuit')===0||location.pathname.indexOf('_swimsuit')===5)?'swimsuit':'other';if(typeof console!=="undefined"||typeof console.log!=="undefined"){try{console.log('videoPage: '+videoPage);}catch(e){}}
function isAppleMobile(){var appleDevice='false';if(navigator.userAgent.indexOf('iPad')>-1){appleDevice='true';}
if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))){appleDevice='true';}
return appleDevice;}
function cnnSetVol(){document.getElementById('cnnSound').style.display='none';cnnCVP.setVolume('0.50');}
function siOnVideoTrackingAdCountdown(seconds){try{siVideoTrackingAdCountdown(seconds);}catch(e){siLog.debug('siOnVideoTrackingAdCountdown: '+e);}
siLog.debug('siOnVideoTrackingAdCountdown: Complete');}
function siOnVideoPlayerReady(){try{siSetAdSection();}catch(e){siLog.debug('siOnVideoPlayerReady: '+e);}
siLog.debug('siOnVideoPlayerReady: Complete');}
function siOnVideoPlayerBegin(videoId){try{siVideoBegin(cnnCVP,videoId);}catch(e){siLog.debug('siOnVideoPlayerBegin: '+e);}
siLog.debug('siOnVideoPlayerBegin: Complete');}
function siOnVideoPlayerPlay(videoId){try{siVideoPlay(cnnCVP,videoId);}catch(e){siLog.debug('siOnVideoPlayerPlay: '+e);}
siLog.debug('siOnVideoPlayerPlay: Complete');}
function siOnAdStarted(token,videoId){try{siVideoAdStarted(cnnCVP,videoId);}catch(e){siLog.debug('siOnAdStarted: '+e);}
siLog.debug('siOnAdStarted: Complete');}
function siOnAdFinished(token,videoId){try{siVideoAdFinished(cnnCVP,videoId);}catch(e){siLog.debug('siOnAdFinished: '+e);}
siLog.debug('siOnAdFinished: Complete');}
function siOnVideoPlayerPlayHead(videoId,playheadTime,totalDuration){try{siVideoPlayHead(cnnCVP,playheadTime,totalDuration);}catch(e){siLog.debug('siOnVideoPlayerPlayHead: '+e);}
siLog.debug('siOnVideoPlayerPlayHead: Complete');}
function siOnVideoPlayerComplete(videoId){try{siVideoComplete(cnnCVP,videoId);}catch(e){siLog.debug('siOnVideoPlayerComplete: '+e);}
siLog.debug('siOnVideoPlayerComplete: Complete');}
function siOnVideoPlayerPause(videoId,paused){try{siVideoPause(cnnCVP,videoId,paused);}catch(e){siLog.debug(e);};siLog.debug('siOnVideoPlayerPause: Complete');}
function siOnVideoTrackingSeek(){try{siVideoSeek();}catch(e){siLog.debug(e);};siLog.debug('siOnVideoTrackingSeek: Complete');}
function siOnNoFlashDetected(vArea){try{if(isAppleMobile()=='false'){var msg='<a href="http://get.adobe.com/flashplayer/" target="_blank" class="msg" style="color:#D71921">This video requires a Flash client to play. <br/> Please click here to download the latest version of Flash.</a>';document.getElementById(vArea).innerHTML=msg;}}catch(e){siLog.debug(e);};}
function siOnVideoPlayerError(errorMessage){siLog.debug('CVP error: '+errorMessage);}
var siads_videoTitle='';function siads_getAdsTitle(){var cvpData=cnnCVP.getContentEntry(cnnCVP.getContentId());var cvpObject=window.JSON.parse(cvpData);var siads_videoTitle=String(cvpObject.headline);siads_videoTitle=siads_videoTitle.replace(/[^a-zA-Z 0-9]+/g,'');siads_videoTitle=siads_videoTitle.replace(/ /g,'');if(location.href.indexOf('testads=1')>-1){siads_videoTitle+=";test=1";}
return siads_videoTitle;}
function SIisTableZone(){if(BrowserDetect.OS=="iPhone"||BrowserDetect.OS=="iPad"||BrowserDetect.OS=="iPod"){return true;}
return false;}
function SIgetAdZone(adZone){if(SIisTableZone()){return adZone+'/tablet';}else{return adZone;}}
