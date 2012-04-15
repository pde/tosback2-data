
var cmo=cmo?cmo:{};cmo.ct=cmo.ct?cmo.ct:{};cmo.ct.util=cmo.ct.util?cmo.ct.util:{};cmo.ct.util.js=cmo.ct.util.js?cmo.ct.util.js:{};cmo.ct.util.loaderQueue=cmo.ct.util.loaderQueue?cmo.ct.util.loaderQueue:[];cmo.ct.util.onLoadQueue=cmo.ct.util.onLoadQueue?cmo.ct.util.onLoadQueue:[];cmo.ct.util.linkBuilder=cmo.ct.util.linkBuilder?cmo.ct.util.linkBuilder:{};cmo.ct.analytics=cmo.ct.analytics?cmo.ct.analytics:{};cmo.global=cmo.global?cmo.global:{};cmo.dom=cmo.dom?cmo.dom:{};cmo.ui=cmo.ui?cmo.ui:{};cmo.ct.ads=cmo.ct.ads?cmo.ct.ads:{};cmo.ct.ajax=cmo.ct.ajax?cmo.ct.ajax:{};cmo.ct.history=cmo.ct.history?cmo.ct.history:{};cmo.comp=cmo.comp?cmo.comp:{};cmo.plugin=cmo.plugin?cmo.plugin:{};cmo.ct.util.log=function(){};cmo.ct.util.waitForJQuery=function(func){if(cmo.ct.util.onLoadQueue.length==0&&typeof func!='undefined'){function unloadQueue(){if(typeof $!='undefined'){for(var i=0;i<cmo.ct.util.onLoadQueue.length;i++){cmo.ct.util.onLoadQueue[i].apply();}}
else{setTimeout(function(){unloadQueue();},1000);}}
setTimeout(function(){unloadQueue();},1000);}
cmo.ct.util.onLoadQueue[cmo.ct.util.onLoadQueue.length]=func;};cmo.ct.util.isFunctionAvailable=function(elem){var stack=elem.split('.');var ob=window;var available=false;for(var i=0;i<stack.length;i++){ob=ob[stack[i]];if(typeof ob!='undefined'){available=true;}
else{available=false;break;}}
return available;};cmo.ct.util.findFromString=function(elem){var stack=elem.split('.');var ob=window;for(var i=0;i<stack.length;i++){ob=ob[stack[i]];if(typeof ob=='undefined'){return null;}}
return ob;}
cmo.ct.util.invokeWhenReady=function(elem,func){var stack=elem.split('.');var ob=window;var ready=false;for(var i=0;i<stack.length;i++){ob=ob[stack[i]];if(typeof ob!='undefined'){ready=true;}
else{ready=false;break;}}
if(ready){func.apply();}
else if(!cmo.ct.util.pageLoaded){setTimeout(function(){cmo.ct.util.invokeWhenReady(elem,func);},100);}};cmo.ct.util.invokeWhenElemAvailable=function(id,func){var ready=false;var elem=document.getElementById(id);if(typeof elem!='undefined'&&elem!=null){ready=true;}
if(ready){func.apply();}
else if(!cmo.ct.util.pageLoaded){setTimeout(function(){cmo.ct.util.invokeWhenElemAvailable(id,func);},100);}};cmo.ct.util.invokeFromString=function(func,param){var stack=func.split('.');var ob=window;for(var i=0;i<stack.length;i++){ob=ob[stack[i]];if(typeof ob=='undefined'){throw'Could not find function - '+func;}}
ob.call(ob,param);};cmo.ct.util.addHandler=function(elem,type,func){if(elem.addEventListener){elem.addEventListener(type,func,false);}
else if(elem.attachEvent){elem.attachEvent("on"+type,func);}};cmo.ct.util.loadCssDOM=function(url,onload){var link=document.createElement('link');link.type='text/css';link.rel='stylesheet';link.media='screen';link.href=url;document.getElementsByTagName('head')[0].appendChild(link);};cmo.ct.util.loadScriptDOM=function(url,onload,id,async,defer){var script=document.createElement('script');script.type='text/javascript';if(typeof id!='undefined'){script.id=id;}
if(onload){script.onloadDone=false;script.onload=function(){script.onloadDone=true;onload();};script.onreadystatechange=function(){if(("loaded"===script.readyState||"complete"===script.readyState)&&!script.onloadDone){script.onloadDone=true;script.onload();}};}
script.src=url;if(typeof script.async!='undefined'){script.async=async;}
if(typeof script.defer!='undefined'){script.defer=defer;}
document.getElementsByTagName('head')[0].appendChild(script);};cmo.ct.util.loadScriptDOCWrite=function(url,onload){document.write('<scr'+'ipt src="'+url+'" type="text/javascript"></scr'+'ipt>');if(onload){cmo.ct.util.addHandler(window,"load",onload);}};cmo.ct.util.loadJS=function(scripts,ordered){if(scripts.length>1&&(typeof ordered!='undefined'&&ordered==true)){if(-1!=navigator.userAgent.indexOf('Firefox')||-1!=navigator.userAgent.indexOf('Opera')){for(var x=0;x<scripts.length;x++){cmo.ct.util.loadScriptDOM(scripts[x].url,scripts[x].onload);}}
else{if(!cmo.ct.util.pageLoaded){for(var y=0;y<scripts.length;y++){cmo.ct.util.loadScriptDOCWrite(scripts[y].url,scripts[y].onload);}}
else{var script=null;for(var t=0;t<scripts.length;t++){if(script==null){script=scripts[t];}
if(script!=null){scripts[t]=null;break;}}
if(script!=null){function orderedLoad(ol,scripts,ordered){if(ol){ol.apply();}
if(scripts.length==1){ordered=false;}
cmo.ct.util.loadJS(scripts,ordered);}
var ol=script.onload;script.onload=function(){orderedLoad(ol,scripts,ordered)}
cmo.ct.util.loadScriptDOM(script.url,script.onload);}}}}
else{for(var z=0;z<scripts.length;z++){cmo.ct.util.loadScriptDOM(scripts[z].url,scripts[z].onload,scripts[z].id);}}};cmo.ct.util.emptyLoaderQueue=function(){if(typeof cmo.ct.util.loaderQueue!='undefined'){for(var i=0;i<cmo.ct.util.loaderQueue.length;i++){var item=cmo.ct.util.loaderQueue[i];if(item.type=='single'){cmo.ct.util.loadJS(item.src,item.onload,item.id);}
else{cmo.ct.util.loadMultipleJS(item.arr,item.ordered);}}}}
cmo.ct.util.loadMultipleJS=function(arr,ordered){if(typeof cmo.ct.util.loadMultipleJS!='undefined'){cmo.ct.util.loadJS(arr);}
else{cmo.ct.util.loaderQueue[cmo.ct.util.loaderQueue.length]={type:'multiple',arr:arr,ordered:ordered};}};cmo.ct.util.getCookie=function(name){if(typeof name!=null){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=cookies[i];while(cookie.charAt(0)==' '){cookie=cookie.substring(1,cookie.length);}
if(cookie.indexOf(name)==0){return decodeURIComponent(cookie.substring(name.length+1,cookie.length));}}
return null;}
else{return null;}};cmo.ct.util.setCookie=function(name,value,expires,domain,path,secure){if(typeof expires=='undefined'){expires=0;}
if(typeof domain=='undefined'){domain=".cmates.com";if(location.href.indexOf('memorylane')>-1){domain='.memorylane.com';}
else if(location.href.indexOf('classmates')>-1){domain='.classmates.com';}}
if(typeof path=='undefined'){path="/";}
var cookieString=name+'='+encodeURIComponent(value)+
(expires?';expires='+expires:'')+';path='+path+';domain='+domain+
(secure?'; secure':'');document.cookie=cookieString;};cmo.ct.ads.OAS_version=11;cmo.ct.ads.OAS_sitepage='';cmo.ct.ads.OAS_rn='001234567890';cmo.ct.ads.OAS_rns='1234567890';cmo.ct.ads.OAS_rn=''+Math.random();cmo.ct.ads.OAS_rns=cmo.ct.ads.OAS_rn.substring(2,11);cmo.ct.ads.OAS_query='?'+(document.location.search?document.location.search:'');cmo.ct.ads.pl='';cmo.ct.ads.ms='';cmo.ct.ads.lastLoadTime=null;cmo.ct.ads.PhxTags=null;cmo.ct.ads.DelayTags=null;cmo.ct.ads.positionList;cmo.ct.ads.phxLoopCount=0;cmo.ct.ads.RDB_cookie=cmo.ct.util.getCookie('RDB');cmo.ct.ads.loading=false;cmo.ct.ads.refreshing=false;cmo.ct.ads.blockAdRefresh=false;cmo.ct.ads.loadRepeatableAdsOnly=false;cmo.ct.ads.url=oasUrl;cmo.ct.ads.sPage=sPage;cmo.ct.ads.pName=pName;cmo.ct.ads.positionList=positionList;cmo.ct.ads.pageViewCounterCookieName="PageViewCounter";cmo.ct.ads.incrementPageViewCounter=function(){var pageViewCounterValue=cmo.ct.ads.getPageViewCount()
pageViewCounterValue++;cmo.ct.util.setCookie(cmo.ct.ads.pageViewCounterCookieName,pageViewCounterValue);};cmo.ct.ads.getPageViewCount=function(){var pageViewCounterValue=cmo.ct.util.getCookie(cmo.ct.ads.pageViewCounterCookieName);if(pageViewCounterValue!=null){var counterEnd=pageViewCounterValue.indexOf(";");if(counterEnd>0){pageViewCounterValue=pageViewCounterValue.substring(0,counterEnd);}}else{pageViewCounterValue=0;}
return pageViewCounterValue;};cmo.ct.ads.incrementPageViewCounter();cmo.ct.util.getRDBVersion=function(cookie){var temp='';if(typeof cookie!='undefined'&&cookie!=null&&cookie.length>0){temp=cookie.substring(0,4);while(temp.indexOf(0)=='0'){temp=temp.substring(1,temp.length);}}
return temp;};cmo.ct.ads.prepareOASurl=function(adType){cmo.ct.util.log('cmo.ct.ads.prepareOASurl');if(cmo.ct.ads.pName.indexOf(' ')>-1){cmo.ct.ads.pName=cmo.ct.ads.pName.replace(/\s/g,'_');}
if(cmo.ct.ads.pName==''){cmo.ct.ads.pName=window.location.pathname.substring(1);}
var loc=top.location.href;var communityIdSet=false,startYearSet=false,endYearSet=false;if(location.protocol!='https:'){var OAS_query_str='?';var del='&';if(top.banner_id){OAS_query_str+='regID='+(top.banner_id)+del;}
var banner_pageViewCount;var PageViewCount=cmo.ct.util.getCookie('PageViewCounter');if(typeof PageViewCount!='undefined'){banner_pageViewCount=++PageViewCount;OAS_query_str+='pvc='+banner_pageViewCount+del;}
if(top.banner_mt){OAS_query_str+='pL='+(top.banner_mt.substring(0,1))+del;}
if(top.banner_ms){OAS_query_str+='mS='+top.banner_ms+del;}
if(location.href.indexOf('places')>-1){var queryParams='';var url;if(location.href.indexOf('?')>1){queryParams=location.href.split('?');if(queryParams.length>1){queryParams=queryParams[1].split('&');if(typeof queryParams!='undefined'){for(var z=0;z<queryParams.length;z++){var param=queryParams[z].split('=');if(!communityIdSet&&param[0]=='communityId'){communityIdSet=true;OAS_query_str+='communityId='+param[1]+del;}
if(!startYearSet&&param[0]=='startYear'){OAS_query_str+='startYear='+param[1]+del;}
if(!endYearSet&&param[0]=='endYear'){OAS_query_str+='endYear='+param[1]+del;}}}}}
if(!communityIdSet){url=location.href.split('?')[0].split("/");for(var i=0;i<url.length;i++){if(url[i].length>0&&!isNaN(url[i])){communityIdSet=true;OAS_query_str+='communityId='+url[i]+del;break;}}}}
cmo.ct.ads.OAS_rn=''+Math.random();cmo.ct.ads.OAS_rns=cmo.ct.ads.OAS_rn.substring(2,11);if(typeof cmo.ct.ads.RDB_cookie=='undefined'){cmo.ct.ads.RDB_cookie=cmo.ct.util.getCookie('RDB');}
return cmo.ct.ads.url+'/OASX/RQST/TYPE='+adType+'/RDB='+cmo.ct.ads.RDB_cookie+'/VERSION='+cmo.ct.util.getRDBVersion(cmo.ct.ads.RDB_cookie)+'/ORIGIN=CM//'+cmo.ct.ads.sPage+'/'+cmo.ct.ads.pName+'/1'+cmo.ct.ads.OAS_rns+'@'+cmo.ct.ads.positionList+OAS_query_str;}
else{return null;}};cmo.ct.ads.loadPositionList=function(){var pList='';var posArray=$('div.OAS');if($('div.sticking').length>0){posArray=$('div.stickyOAS');}
for(var i=0;i<posArray.length;i++){if($('#PHX_IFRAME_'+posArray[i].id).css('display')!='none'){pList+=posArray[i].id;if(i!=posArray.length-1){pList+=',';}}}
posArray=$('div.OAS_repeat');if(cmo.ct.ads.loadRepeatableAdsOnly==true){pList='';}
for(var x=0;x<posArray.length;x++){pList+=','+posArray[x].id;}
return pList;};cmo.ct.ads.createIFrameChild=function(PhxAdDiv,Pos,PhxIframeName,url){PhxAdDiv.innerHTML="";var phxFrameElem;var appName=navigator.appName;if(navigator.appName.indexOf("Microsoft")>-1&&navigator.appVersion.indexOf('MSIE 9.0')<0){phxFrameElem=window.parent.document.createElement('<iframe allowtransparency="true" name="'+PhxIframeName+'" id="'+PhxIframeName+'" class="PHX_IFRAME" src="'+url+'" topmargin="0" leftmargin="0" frameBorder="0" marginWidth="0" margintHeight="0" scrolling="no" >');}
else{phxFrameElem=window.parent.document.createElement('iframe');phxFrameElem.name=PhxIframeName;phxFrameElem.id=PhxIframeName;phxFrameElem.src=url;phxFrameElem.className="PHX_IFRAME";phxFrameElem.frameBorder=0;phxFrameElem.marginWidth=0;phxFrameElem.marginHeight=0;phxFrameElem.topMargin=0;phxFrameElem.leftMargin=0;phxFrameElem.allowTransparency="true";phxFrameElem.scrolling="no";}
PhxAdDiv.appendChild(phxFrameElem);};cmo.ct.ads.setJSXAds=function(pList,delayed){cmo.ct.util.log('setJSXAds called '+pList+" delayed = "+delayed);if(typeof(PhxContent)!="undefined"&&PhxContent!=null){if(cmo.ct.ads.PhxTags==null){cmo.ct.ads.DelayTags=PhxContent;}
cmo.ct.ads.PhxTags=PhxContent;var notLoaded='';var posArray;if(typeof pList!='undefined'&&pList!=null){if(pList.substring(pList.length-1)==','){pList=pList.substring(0,pList.length-1);}
posArray=pList.split(',');notLoaded='';}
else if(typeof cmo.ct.ads.positionList!='undefined'&&cmo.ct.ads.positionList!=null){posArray=cmo.ct.ads.positionList.split(',');}
else{posArray=cmo.ct.ads.loadPositionList().split(',');}
cmo.ct.util.log(posArray.length);for(var i=0;i<posArray.length;i++){if(typeof posArray[i]!='undefined'&&posArray[i]!=null&&posArray[i]!=''){var PhxIframeName="PHX_IFRAME_"+posArray[i];var PhxAdDiv=window.parent.document.getElementById(posArray[i]);if(PhxAdDiv!=null&&typeof PhxAdDiv!='undefined'){var classes=PhxAdDiv.attributes['class'].value;if(classes.indexOf('OAS_delay')==-1||delayed){cmo.ct.util.log('creating iframe for '+posArray[i]);cmo.ct.ads.createIFrameChild(PhxAdDiv,posArray[i],PhxIframeName,contextAddress+'/static/jsxAd.html?'+
(typeof delayed!='undefined'?'delayed='+delayed+'&':''));if(i==posArray.length-1){function reset(){cmo.ct.util.log('reseting ad flags');cmo.ct.ads.refreshing=false;cmo.ct.ads.loading=false;}
setTimeout(function(){reset();},500);}}}
else if(!cmo.ct.util.pageLoaded){cmo.ct.util.log(posArray[i]+' not ready');notLoaded+=posArray[i]+',';}}}
if(notLoaded!=''){setTimeout(function(){cmo.ct.ads.setJSXAds(notLoaded);},350);}
if(cmo.ct.ads.refreshing==true){cmo.ct.ads.refreshing=false;}}};cmo.ct.ads.setSrc=function(elemId,url){window.parent.document.getElementById(elemId).src=url;};cmo.ct.ads.loadAds=function(pList,onload){cmo.ct.util.log('cmo.ct.ads.loadAds '+pList);if(location.protocol!='https:'){if(!cmo.ct.ads.loading){cmo.ct.ads.loading=true;if(cmo.ct.ads.refreshing){$('#PhoenixScript').remove();}
if(typeof pList=='undefined'||pList==null){if(typeof cmo.ct.ads.positionList=='undefined'||cmo.ct.ads.positionList==null){cmo.ct.ads.positionList=cmo.ct.ads.loadPositionList();}}
else{cmo.ct.ads.positionList=pList}
if(cmo.ct.ads.positionList.indexOf('=')>-1){var pArray=cmo.ct.ads.positionList.split(',');cmo.ct.ads.positionList='';for(var i=0;i<pArray.length;i++){var pos=pArray[i].split('=')[1];if(pos.indexOf('-')>-1){pos=pos.split('-');for(var x=0;x<pos.length;x++){cmo.ct.ads.positionList+=pos[x];if(x<(pos.length-1)){cmo.ct.ads.positionList+=',';}}}
else{cmo.ct.ads.positionList+=pos;}
if(i<(pArray.length-1)){cmo.ct.ads.positionList+=',';}}}
if(cmo.ct.ads.positionList!=''){var url=cmo.ct.ads.prepareOASurl('jsx');if(url!=null){cmo.ct.util.loadScriptDOM(url,function(){cmo.ct.ads.setJSXAds();},'PhoenixScript',true,true);window.onload=function(){cmo.ct.ads.saveOasParams();if(typeof onload!='undefined'){onload.apply()}};}}}}};cmo.ct.ads.refreshOASAds=function(params,onload){cmo.ct.util.log('calling cmo.ct.ads.refreshOASAds '+params);var pList=document.getElementById('OASpositionList');if(typeof pList!='undefined'&&pList!=null){pList=pList.value;}
if(typeof pList=='undefined'||pList==null){pList=positionList;}
var minLapseTime=4000;if(typeof params!='undefined'&&params!=null){params=params.split(':');for(var i=0;i<params.length;i++){var param=params[i].split('=');if(param[0]=='interval'){if(cmo.ct.ads.loadRepeatableAdsOnly==true){minLapseTime=0;cmo.ct.ads.loadRepeatableAdsOnly=false;}
else{minLapseTime=parseInt(param[1]);}}
if(param[0]=='posList'){pList=param[1];}}}
if(!cmo.ct.ads.loading&&!cmo.ct.ads.refreshing&&!cmo.ct.ads.blockAdRefresh){cmo.ct.util.log('cmo.ct.ads.refreshOASAds actual');cmo.ct.ads.refreshing=true;var now=new Date();var positions=pList.split(',');pList='';for(var t=0;t<positions.length;t++){if(!document.getElementById('PHX_IFRAME_'+positions[t])||document.getElementById('PHX_IFRAME_'+positions[t]).style.visibility!='hidden'){pList+=positions[t]+(t!=positions.length-1?',':'');}}
if(cmo.ct.util.lastLoadTime!=null){var curTime=now.getTime();if((curTime-cmo.ct.util.lastLoadTime<minLapseTime)&&!cmo.ct.ads.loadRepeatableAdsOnly){cmo.ct.ads.refreshing=false;cmo.ct.util.log('interval has not lapsed; return');return;}
cmo.ct.util.lastLoadTime=curTime;}else{cmo.ct.util.lastLoadTime=now.getTime();}
cmo.ct.ads.loadAds(pList,onload);}};cmo.ct.ads.getJSX_Content=function(PosName,delayed){if(cmo.ct.ads.PhxTags!=null||(delayed=='true'&&cmo.ct.ads.DelayTags!=null)){var tagTemp=cmo.ct.ads.PhxTags;if(delayed=='true'){tagTemp=cmo.ct.ads.DelayTags;}
else if(cmo.ct.ads.PhxTags.length==null){tagTemp=top.PhxContent;}
for(var i=tagTemp.length-1;i>=0;i--){if(tagTemp[i].name==PosName){if(tagTemp[i].src.indexOf('empty.gif')>-1){document.getElementById('PHX_IFRAME_'+PosName).style.height=0;if(document.getElementById(PosName).attributes['class'].value.indexOf('OAS_brand')>-1){document.getElementById(PosName).style.height=0;}}
else if(document.getElementById(PosName).attributes['class'].value.indexOf('OAS_brand')>-1){var adDiv=document.getElementById(PosName);adDiv.parentNode.style.height='auto';}
cmo.ct.util.log('getJSX_Content for '+PosName);return tagTemp[i].src;}}
return'';}
return'';};cmo.ct.ads.saveOasParams=function(){var field=document.createElement('input');field.setAttribute('name','pageName');field.setAttribute('id','OASpageName');field.setAttribute('type','hidden');field.setAttribute('value',cmo.ct.ads.pName);document.getElementsByTagName('body')[0].appendChild(field);field=document.createElement('input');field.setAttribute('name','sitePage');field.setAttribute('id','OASsitePage');field.setAttribute('type','hidden');field.setAttribute('value',cmo.ct.ads.sPage);document.getElementsByTagName('body')[0].appendChild(field);field=document.createElement('input');field.setAttribute('name','phoenixUrl');field.setAttribute('id','OASphoenixUrl');field.setAttribute('type','hidden');field.setAttribute('value',cmo.ct.ads.url);document.getElementsByTagName('body')[0].appendChild(field);field=document.createElement('input');field.setAttribute('name','positionList');field.setAttribute('id','OASpositionList');field.setAttribute('type','hidden');field.setAttribute('value',cmo.ct.ads.positionList);document.getElementsByTagName('body')[0].appendChild(field);};cmo.ct.ads.loadAds(top.positionList);if(top.trackTimeToFirstClick==true){document.onmousedown=function(e){if(top.startTime!=null){var endTime=new Date().getTime();var firstClick=endTime-top.startTime;var url=top.graphicsAddress;if(url.substring(url.length-1)!='/'){url+='/';}
url+='spacer.gif?regId='+top.banner_id+'&ttFirstClick='+firstClick+'&pagename='+top.ctPageName+'&-='+endTime;var img=new Image();img.src=url;top.startTime=null;}};}