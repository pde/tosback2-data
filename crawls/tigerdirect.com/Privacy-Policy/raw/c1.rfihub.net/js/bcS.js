if(!window._rfiPagePre){window._rfiPagePre="ppre";window._rfiAServer="a.rfihub.com";}
if(!window.rfiAddEvent)
{function rfiAddEvent(obj,type,fn)
{if(obj.addEventListener)
{obj.addEventListener(type,fn,false);}
else if(obj.attachEvent)
{obj["e"+type+fn]=fn;obj[type+fn]=function()
{obj["e"+type+fn](window.event);};obj.attachEvent("on"+type,obj[type+fn]);}}
function rfiRemoveEvent(obj,type,fn)
{if(obj.removeEventListener)
{obj.removeEventListener(type,fn,false);}
else if(obj.detachEvent)
{obj.detachEvent("on"+type,obj[type+fn]);obj[type+fn]=null;obj["e"+type+fn]=null;}}
function rfiFindFlashVersion()
{try
{var i,n=navigator,pins=n.plugins;var val="";if(pins&&pins.length)
{for(i=0;i<pins.length;i++)
if(pins[i].name.indexOf('Shockwave Flash')!=-1)
{val=pins[i].description.split('Shockwave Flash ')[1].split(" ")[0];break;}}
else
{var suff=new Array(".7","");for(i=0;i<suff.length;i++)
{try
{var movie=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"+suff[i]);var arr=movie.GetVariable("$version").split(" ")[1].split(",");val=arr[0]+"."+arr[1];break;}
catch(e)
{}}}
return val;}
catch(e)
{return"";}}
function rfiDef(o)
{return o!==null&&o!==undefined;}
function rfiCommaTextEscape(s,limit)
{if(s===null||s===undefined||!s.length)
{return"";}
s=s.replace(/\s+/g,' ');if(limit&&s.length>250)
{s=s.substring(0,250);}
s=s.replace(/\\/g,"\\\\");s=s.replace(/\"/g,"\\\"");if(s.indexOf(",")!=-1)
s="\""+s+"\"";return s;}
function rfiEscape(s)
{return s===null||s===undefined?"":encodeURIComponent?encodeURIComponent(s):escape(s);}
function rfiReportClick(adID,debug,adStr)
{var pageID=window._rfiPageID;if(!pageID)
{return;}
var fEsc=rfiEscape;if(debug)
{alert("Ad "+(adID+1)+" was clicked.");}
var img=new Image(1,1);img.src=rfiURLPrefix()+window._rfiAServer+"/ck.gif?"+"ra="+Math.random()+
(debug?"&noLog":"")+"&pa="+fEsc(pageID)+"&aa="+adStr+"&ct="+new Date().getTime();}
function rfiURLPrefix()
{var p=document.location.protocol;return p&&p==="https:"?"https://":"http://";}
function rfiAddClickTrack(elem,adID,debug,clickTrackValue,toAppendToRedirects,adStr)
{var ct=clickTrackValue=='disabled'?'disabled':clickTrackValue=='redirect'?'redirect':'handler';if(ct=='disabled')
{return;}
if(ct=='redirect')
{if(elem.tagName=='A')
{var oldHref=elem.href;if(oldHref!='#'&&oldHref.indexOf("javascript:")!=0)
{var fEsc=rfiEscape;if(toAppendToRedirects.length>0)
oldHref+=((oldHref.indexOf("?")==-1)?"?":"&")+toAppendToRedirects;var prefix=oldHref.length>6&&oldHref.substring(0,6)=="https:"?"https":"http";elem.href=prefix+"://"+window._rfiAServer+"/ck?"+"rt="+fEsc(oldHref)+"&ra="+Math.random()+
(debug?"&noLog":"")+"&pa="+fEsc(window._rfiPageID)+"&aa="+adStr+"&ct="+new Date().getTime();if(debug)
{rfiAddEvent(elem,"click",function()
{alert("Ad "+(adID+1)+" was clicked, using redirect for navigation.");});}
return;}}}
if(ct=='handler')
{rfiAddEvent(elem,elem.tagName=='OBJECT'?"mousedown":"click",function()
{rfiReportClick(adID,debug,adStr);return true;});}}
function rfibeac(p,adData)
{rfiBOrA(p,adData,null,null);}
function rfiConv(p)
{rfiBOrA(p,null,null,1);}
function rfiAdServe(p,adRequestData)
{rfiBOrA(p,null,adRequestData,null);}
function rfiCSTrack(str)
{var img=new Image(1,1);var currentTime=new Date().getTime();var rStr=(currentTime%1000000000)+""+Math.random();img.src=rfiURLPrefix()+window._rfiAServer+"/tk.gif?"+str+"&ra="+rStr+"&ct="+currentTime;}
function rfiBOrA(p,adData,adRequestData,isConversion)
{var i,a;var fEsc=rfiEscape;if(!p||!p.publisher)
{return;}
if(!window._rfiPagePre)
{return;}
if(!window._rfiPageID)
{window._rfiPageID=window._rfiPagePre+(new Date().getTime()%1000000000)+Math.floor(Math.random()*10000);}
var url=location&&location.href?location.href:"";var debug=p.debug||url.indexOf("rfiDebug123XYZ")!=-1;var toAppendToRedirects="";if(p.propagateDebug)
{if(url.indexOf("rfiDebug123XYZ")!=-1)
toAppendToRedirects+="rfiDebug123XYZ";var idsStr=rfiParseDebugAdStringFromURL();if(idsStr!=null)
toAppendToRedirects+="rfiAdIds:"+idsStr+":endIds";}
var aStr="";var numAds=0;if(adData&&adData.length)
{var cEsc=rfiCommaTextEscape;if(!rfiDef(window.rfiAdCount))
{window.rfiAdCount=0;}
for(i=0;i<adData.length;i++)
{a=adData[i];var adsToAppend=new Array();var domAnchorsToModify=new Array();adsToAppend[adsToAppend.length]=a;domAnchorsToModify[domAnchorsToModify.length]=null;for(var k=0;k<adsToAppend.length;k++)
{a=adsToAppend[k];var adNumber=window.rfiAdCount;var arr=[cEsc(window._rfiPageID+"_"+adNumber),cEsc(a.title,true),cEsc(a.text,true),cEsc(a.lURL),cEsc(a.iURL),cEsc(a.size),cEsc(a.location),cEsc(a.isHidden),cEsc(a.fURL),cEsc(a.adID)];var adStr=fEsc(arr.join(","));var toMod=domAnchorsToModify[k];if(toMod!=null)
for(var m=0;m<toMod.length;m++)
{rfiAddClickTrack(toMod[m],window.rfiAdCount,debug,a.clickTrack,toAppendToRedirects,adStr);}
aStr+="&aa="+adStr;window.rfiAdCount++;numAds++;}}}
var flash=rfiFindFlashVersion();var ref=document&&document.referrer?document.referrer:"";if(p.extendedTracking){rfiDoBeforeAdSelect(p,adRequestData);}
var clientTime=new Date().getTime();var rStr=(clientTime%1000000000)+""+Math.random();var suffix="ra="+rStr+"&rb="+fEsc(p.publisher)+"&ca="+fEsc(p.conversionID)+"&rc="+fEsc(flash)+"&rd="+fEsc(adRequestData?adRequestData.clickPrefix:null)+
(debug?"&noLog":"")+"&ua="+fEsc(p.userID)+"&ub="+fEsc(p.ageRange)+"&uc="+fEsc(p.gender)+"&ud="+fEsc(adRequestData?adRequestData.userTags:null)+"&ue="+fEsc(p.userTagsFromUser)+"&pa="+fEsc(window._rfiPageID)+"&pb="+fEsc(p.pageCategory)+"&pc="+fEsc(adRequestData?adRequestData.pageTags:null)+"&pd="+fEsc(p.pageTagsFromUser)+"&pg="+fEsc(p.clientSideAdContext)+"&ct="+clientTime+""+aStr+"";var truncatables="&pe="+fEsc(url)+"&pf="+fEsc(ref);var dd=document;if(adRequestData)
{if(typeof adRequestData.placement=="string"&&(adRequestData.placement.indexOf("placementId")>=0||adRequestData.placement.replace(" ","").length==0)){adRequestData.placement="audit";}
if(adRequestData.width>0&&adRequestData.height>0&&adRequestData.width<=1000&&adRequestData.height<=1000&&(adRequestData.placement==="audit"||adRequestData.placement>0))
{var newWinStr=adRequestData.landInNewWindow?"&newWin=1":"";var placementStr="&re="+fEsc(adRequestData.placement+"");var siteIDStr=adRequestData.externalSiteID===null||adRequestData.externalSiteID===undefined?"":("&ug="+fEsc(adRequestData.externalSiteID));var isPreviewStr="&pv="+(adRequestData.isPreview?adRequestData.isPreview:"0");var bidData=(adRequestData.bidData===null||adRequestData.bidData===undefined)?"":adRequestData.bidData;var bidDataArray=bidData.split(";");var bidDataStr="";var publisherStr="&rb="+fEsc(p.publisher);var beaconBidder=null;var bidderUrl;var scoreMicroClicks;var bidTimeStamp;var isSej=null;if(bidDataArray.length===7){var j=0;var paramAndValue;for(j=0;j<6;j++){paramAndValue=bidDataArray[j].split("=");if(paramAndValue.length===2){if(paramAndValue[0]==="creativeOptimization"){bidDataStr+="&co=";paramPairs=paramAndValue[1].split(",");var k=0;var pairNameAndValue;for(k=0;k<paramPairs.length;k++){pairNameAndValue=paramPairs[k].split(":");if(pairNameAndValue.length===2){if(pairNameAndValue[0]==="url")
bidderUrl=pairNameAndValue[1];else if(pairNameAndValue[0]==="bB")
beaconBidder=pairNameAndValue[1];else if(pairNameAndValue[0]==="bt")
bidTimeStamp=pairNameAndValue[1];else if(pairNameAndValue[0]==="sej")
isSej=pairNameAndValue[1];}}}
else if(paramAndValue[0]==="price")
bidDataStr+="&ep=";else if(paramAndValue[0]==="requestId")
bidDataStr+="&ri=";else if(paramAndValue[0]==="site")
bidDataStr+="&rs=";else if(paramAndValue[0]==="adId")
bidDataStr+="&ai=";else if(paramAndValue[0]==="tacticId")
bidDataStr+="&rt=";else
continue;bidDataStr+=paramAndValue[1];}}}
if(isSej==="true"){dd.writeln("<scr"+"ipt type=\"text/javascript\""+"src=\""+rfiURLPrefix()+window._rfiAServer+"/sej?w="+adRequestData.width+"&h="+adRequestData.height+newWinStr+placementStr+
siteIDStr+isPreviewStr+"&"+suffix+bidDataStr+truncatables+"\" "+"></script>");}else{dd.writeln("<ifr"+"ame src=\""+rfiURLPrefix()+window._rfiAServer+"/sed?w="+adRequestData.width+"&h="+adRequestData.height+newWinStr+placementStr+siteIDStr+isPreviewStr+"&"+
suffix+bidDataStr+truncatables+"\" border=0 frameborder=0 vspace=0 hspace=0 scrolling='no' marginheight='0' marginwidth='0' style='padding:0;margin:0' width='"+adRequestData.width+"' height='"+adRequestData.height+"'></iframe>");}
if(beaconBidder==="true"){new Image().src=rfiURLPrefix()+bidderUrl+"/bn/bk.gif?bt="+bidTimeStamp+placementStr+publisherStr+bidDataStr+"&zt=1";}}}
else if(p.noIframeBeacon)
{var img=new Image(1,1);img.src=(isConversion)?rfiURLPrefix()+window._rfiAServer+"/ca.gif?"+suffix:img.src=rfiURLPrefix()+window._rfiAServer+"/bk.gif?"+suffix;}
else
{if(isConversion)
dd.writeln("<ifr"+"ame src=\""+rfiURLPrefix()+window._rfiAServer+"/ca.html?"+
suffix+"\" border=0 frameborder=0 vspace=0 hspace=0 scrolling='no' marginheight='0' marginwidth='0' style='display:none;padding:0;margin:0' width='0'"+" height='0'></iframe>");else
dd.writeln("<ifr"+"ame src=\""+rfiURLPrefix()+window._rfiAServer+"/bk.html?"+
suffix+"\" border=0 frameborder=0 vspace=0 hspace=0 scrolling='no' marginheight='0' marginwidth='0' style='display:none;padding:0;margin:0' width='0'"+" height='0'></iframe>");}
if(debug)
{var rfiWin=window.open("http://"+window._rfiAServer+"/debugTrack.html?"+suffix,"rfiDebugWindow","location=1,status=1,scrollbars=1,width=800,height=600");if(rfiWin==null)
alert("Allow popups to view the rocket fuel debug page.");}}
function rfiParseDebugAdStringFromURL()
{var url=location&&location.href?location.href:"";var first="rfiAdIds:";var index=url.indexOf(first);if(index==-1)
return null;var endIndex=url.indexOf(":endIds",first);if(endIndex==-1)
endIndex=url.length;return url.substring(index+first.length,endIndex);}
var rfiDoBeforeAdSelect,rfiDoOnAdSelectCallback;var __rfiVisibilityCode={FULL:1,PARTIAL:2,OFF_SCREEN:3,UNKNOWN:4};var __rfiBeaconInterval=5000;var __rfiBeaconLimit=121000;var __rfiBeaconUrl=window.RFI_BEACON_HOST;var __rfiVisibilityCheckInterval=500;var rfiDebug=function(str){return;if(console&&console.debug){console.debug(str);}};var rfiGetAdUnitEl=function(containerId){var c=document.getElementById(containerId);if(!c){return null;}
var ifr=c.getElementsByTagName("IFRAME")[0];return ifr;};var rfiFindElementPos=function(elem){var left=0,top=0;if(elem.offsetParent){while(elem.offsetParent){left+=elem.offsetLeft;top+=elem.offsetTop;elem=elem.offsetParent;}}
return{left:left,top:top};};var rfiFindScrollOffsets=function(){var offsetX=0;var offsetY=0;if(document.getElementById&&!document.all){offsetY=window.pageYOffset;offsetX=window.pageXOffset;}else{offsetY=document.documentElement.scrollTop;offsetX=document.documentElement.scrollLeft;}
return{x:offsetX,y:offsetY};};var rfiFindClientDimensions=function(){var width=0;var height=0;if(typeof(window.innerWidth)=='number'){width=window.innerWidth;height=window.innerHeight;}else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){width=document.documentElement.clientWidth;height=document.documentElement.clientHeight;}else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){width=document.body.clientWidth;height=document.body.clientHeight;}
return{width:width,height:height};};var rfiGetElementVisibility=function(elemX,elemY,elemHeight,elemWidth,ignoreScroll){var viewport=rfiFindClientDimensions();var scroll=ignoreScroll?{x:0,y:0}:rfiFindScrollOffsets();var unitTop=elemY;var unitLeft=elemX;var unitBottom=elemY+elemHeight;var unitRight=elemX+elemWidth;var viewTop=scroll.y;var viewLeft=scroll.x;var viewBottom=scroll.y+viewport.height;var viewRight=scroll.x+viewport.width;if(unitTop>=viewTop&&unitLeft>=viewLeft&&unitBottom<=viewBottom&&unitRight<=viewRight){return __rfiVisibilityCode.FULL;}
if(unitLeft>viewRight||unitRight<viewLeft||unitTop>viewBottom||unitBottom<viewTop){return __rfiVisibilityCode.OFF_SCREEN;}
return __rfiVisibilityCode.PARTIAL;};var rfiSetCookie=function(name,value,days){var expires;if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));expires="; expires="+date.toGMTString();}else{expires="";}
document.cookie=name+"="+value+expires+"; path=/";};var rfiGetCookie=function(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' '){c=c.substring(1,c.length);}
if(c.indexOf(nameEQ)==0){return c.substring(nameEQ.length,c.length);}}
return null;};var rfiDeleteCookie=function(name){rfiSetCookie(name,"",-1);};(function(){var unitWidth=0;var unitHeight=0;var p={};var rfiBeforeServe={detectScreenSettings:function(){p.sw=window.screen.availWidth;p.sh=window.screen.availHeight;p.kd=window.screen.colorDepth;p.pd=window.screen.pixelDepth;},detectVisibility:function(){var dimensions=rfiFindClientDimensions();p.pu="0";if(window.self!=window.top){p.pu="1";}
p.cw=dimensions.width;p.ch=dimensions.height;document.write('<div id="rfi-location-test"></div>');var testDiv=document.getElementById('rfi-location-test');var pos=rfiFindElementPos(testDiv);p.px=pos.left;p.py=pos.top;p.pv=rfiGetElementVisibility(p.positionX,p.positionY,unitHeight,unitWidth);p.hc="0";var current=testDiv.parentNode;while(current&&current.style){var v=current.style.visibility.toLowerCase();var d=current.style.display.toLowerCase();if(v=="hidden"||v=="collapse"||d=="none"){p.hc=1;break;}
current=current.parentNode;}
testDiv.style.display="none";},detectCookiesDisabled:function(){rfiSetCookie('rfiCookieTest',1);if(!rfiGetCookie('rfiCookieTest')){p.cd=1;}else{p.cd="0";rfiDeleteCookie('rfiCookieTest');}},detectTabDepth:function(){p.td=history.length;}};rfiDoBeforeAdSelect=function(pub,adReq){unitWidth=adReq.width;unitHeight=adReq.height;for(var fn in rfiBeforeServe){if(rfiBeforeServe[fn]){try{rfiBeforeServe[fn]();}catch(e){rfiDebug(e);}}}
pub.clientSideAdContext=JSON.stringify(p);rfiDebug(pub.clientSideAdContext);};})();(function(){var elem,adInstanceId;var canDetectVisibility=false;var totalTimeFullyVisible=0;var totalTimePartiallyVisible=0;var mouseOverStartTime=0;var mouseOvers=0;var mouseOuts=0;var totalMouseOverTime=0;var unitLoadTime=0;var unitWidth,unitHeight;var rfiAfterServe={recordUnitLoadTime:function(){unitLoadTime=new Date().getTime();},detectDimensions:function(){unitHeight=parseInt(elem.getAttribute('height')?elem.getAttribute('height'):elem.style.height);unitWidth=parseInt(elem.getAttribute('width')?elem.getAttribute('width'):elem.style.width);if(window.self!=window.top){return;}
canDetectVisibility=true;},initMouseovers:function(){rfiAddEvent(elem,'mouseover',function(){mouseOvers++;mouseOverStartTime=new Date().getTime();rfiDebug('Mouseovers: '+mouseOvers);});rfiAddEvent(elem,'mouseout',function(){mouseOuts++;totalMouseOverTime+=new Date().getTime()-mouseOverStartTime;mouseOverStartTime=0;rfiDebug('Mouseouts: '+mouseOuts);rfiDebug('Time spent hovering (seconds): '+(totalMouseOverTime/1000));});},initVisibilityCheck:function(){if(!canDetectVisibility){return;}
window.setInterval(function(){var p=rfiFindElementPos(elem);positionX=p.left;positionY=p.top;var status=rfiGetElementVisibility(positionX,positionY,unitHeight,unitWidth);if(status==__rfiVisibilityCode.FULL){totalTimeFullyVisible+=__rfiVisibilityCheckInterval;}else if(status==__rfiVisibilityCode.PARTIAL){totalTimePartiallyVisible+=__rfiVisibilityCheckInterval;}},__rfiVisibilityCheckInterval);},initBeacon:function(){var intervalId=window.setInterval(function(){var t=totalMouseOverTime;if(mouseOvers>mouseOuts){t+=(new Date().getTime()-mouseOverStartTime);}
var params={ai:adInstanceId,pu:(canDetectVisibility?"0":"1"),mo:mouseOvers.toString(),mt:(t/1000).toString(),tt:((new Date().getTime()-unitLoadTime)/1000).toString(),tf:(totalTimeFullyVisible/1000).toString(),tp:(totalTimePartiallyVisible/1000).toString()};var pJson=JSON.stringify(params);rfiDebug(pJson);var img=new Image(1,1);img.src=__rfiBeaconUrl+'p='+pJson;},__rfiBeaconInterval);window.setTimeout(function(){window.clearInterval(intervalId);},__rfiBeaconLimit);}};rfiDoOnAdSelectCallback=function(aid){if(__rfiBeaconUrl){adInstanceId=aid;elem=rfiGetAdUnitEl('__rfi');rfiAddEvent(elem,'load',function(){for(var fn in rfiAfterServe){if(rfiAfterServe[fn]){try{rfiAfterServe[fn]();}catch(e){rfiDebug(e);}}}});}};})();}
try{
if (rfiAdReq!==undefined){
try{if(rfiTrackParameters==undefined){
rfiAdServe(rfiPub, rfiAdReq);}
}catch(err){
rfiAdServe(rfiPub,rfiAdReq);}}
}catch(err){}
try{
if(rfiTrackParameters!==undefined){rfiCSTrack(rfiTrackParameters);}
}catch(err){};