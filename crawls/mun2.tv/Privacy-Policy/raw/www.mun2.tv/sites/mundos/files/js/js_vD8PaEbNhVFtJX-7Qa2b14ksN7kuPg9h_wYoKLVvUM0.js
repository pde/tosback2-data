
if(brightcove==undefined){var brightcove={};brightcove.getExperience=function(){alert("Please import APIModules_all.js in order to use the API.");};}
if(brightcove.experiences==undefined){brightcove.servicesURL='http://c.brightcove.com/services';brightcove.cdnURL='http://admin.brightcove.com';brightcove.secureCDNURL='https://sadmin.brightcove.com';brightcove.secureServicesURL='https://secure.brightcove.com/services';brightcove.pubHost='c.$pubcode$.$zoneprefix$$zone$';brightcove.pubSecureHost='secure.$pubcode$.$zoneprefix$$zone$';brightcove.pubSubdomain='ariessaucetown.local';brightcove.experiences={};brightcove.experienceObjects={};brightcove.timeouts={};brightcove.flashTimeoutInterval=10000;brightcove.htmlTimeoutInterval=10000;brightcove.experienceNum=0;brightcove.majorVersion=9;brightcove.majorRevision=0;brightcove.minorRevision=28;brightcove.servlet={AS3:"federated_f9",HTML:"htmlFederated"};brightcove.playerType={FLASH:"flash",HTML:"html",FLASH_IFRAME:"flashIFrame",INSTALLER:"installer",NO_SUPPORT:"nosupport"};brightcove.errorCodes={UNKNOWN:0,DOMAIN_RESTRICTED:1,GEO_RESTRICTED:2,INVALID_ID:3,NO_CONTENT:4,UNAVAILABLE_CONTENT:5,UPGRADE_REQUIRED_FOR_VIDEO:6,UPGRADE_REQUIRED_FOR_PLAYER:7,SERVICE_UNAVAILABLE:8};brightcove.defaultParam={};brightcove.defaultParam.width='100%';brightcove.defaultParam.height='100%';brightcove.defaultFlashParam={};brightcove.defaultFlashParam.allowScriptAccess='always';brightcove.defaultFlashParam.allowFullScreen='true';brightcove.defaultFlashParam.seamlessTabbing=false;brightcove.defaultFlashParam.swliveconnect=true;brightcove.defaultFlashParam.wmode='window';brightcove.defaultFlashParam.quality='high';brightcove.defaultFlashParam.bgcolor='#999999';brightcove.hasActiveX=brightcove.isIE=(window.ActiveXObject!=undefined);brightcove.userAgent=navigator.userAgent;brightcove._queuedAPICalls=[];var brightcoveJS=brightcove;brightcove.createExperiences=function(pEvent,pElementID){var experiences=[];var params;var experience;var flashSupport=brightcove.checkFlashSupport();var htmlSupport=brightcove.checkHtmlSupport();if(pElementID!=null){experiences.push(document.getElementById(pElementID));}else{experiences=brightcove.collectExperiences();}
if(brightcove.hasActiveX){params=document.getElementsByTagName('param');}
var urlParams=brightcove.cacheUrlParams();var numExperiences=experiences.length;for(var i=0;i<numExperiences;i++){experience=experiences[i];experience=brightcove.copyDefaultParams(experience);experience=brightcove.copySnippetParams(experience,params);experience=brightcove.copyUrlParams(experience,urlParams,numExperiences);var playerType=brightcove.determinePlayerType(experience,flashSupport,htmlSupport);var secureConnections=(experience.params.secureConnections=="true");if(playerType==brightcove.playerType.HTML){secureConnections=false;}
if(playerType==brightcove.playerType.NO_SUPPORT){brightcove.renderInstallGif(experience,secureConnections);brightcove.reportUpgradeRequired(experience);continue;}
if(playerType==brightcove.playerType.HTML){delete experience.params.linkBaseURL;}else{if(experience.params.includeAPI&&experience.params.templateReadyHandler!=null){experience.params.originalTemplateReadyHandler=experience.params.templateReadyHandler;var handlerName="templateReadyHandler"+experience.id;brightcove[handlerName]=(function(id){return function(event){if(brightcove.internal!=null&&brightcove.internal._instances[id]!=null){brightcove._addModuleToEvent(id,event);}
var player=brightcove.experienceObjects[id];brightcove.callHandlerForPlayer(player,"originalTemplateReadyHandler",event);};})(experience.id);experience.params.templateReadyHandler="brightcove."+handlerName;}}
var file=brightcove.generateRequestUrl(experience,playerType,secureConnections);if(document.location.protocol=="http:"){var event='http://goku.brightcove.com/1pix.gif?';var gokuParams=["dcsuri=/viewer/player_load_req","playerType="+playerType,"playerURL="+encodeURIComponent(document.location||"")];var image=brightcove.createElement('image');for(var j in experience.params){gokuParams.push([encodeURIComponent(j)+"="+encodeURIComponent(experience.params[j])]);}
event+=gokuParams.join('&');image.src=event;}
brightcove.renderExperience(experience,file,playerType,secureConnections);}};brightcove.collectExperiences=function(){var experiences=[];var allObjects=document.getElementsByTagName('object');var numObjects=allObjects.length;for(var i=0;i<numObjects;i++){if(/\bBrightcoveExperience\b/.test(allObjects[i].className)){if(allObjects[i].type!='application/x-shockwave-flash'){experiences.push(allObjects[i]);}}}
return experiences;};brightcove.cacheUrlParams=function(){var urlParams={};urlParams.playerKey=decodeURIComponent(brightcove.getParameter("bckey"));urlParams.playerID=brightcove.getParameter("bcpid");urlParams.titleID=brightcove.getParameter("bctid");urlParams.lineupID=brightcove.getParameter("bclid");urlParams.autoStart=brightcove.getParameter("autoStart");urlParams.debuggerID=brightcove.getParameter("debuggerID");urlParams.forceHTML=brightcove.getParameter("forceHTML");urlParams.forceFlashIFrame=brightcove.getParameter("forceFlashIFrame");urlParams.debug=brightcove.getParameter("debug");urlParams.showNoContentMessage=brightcove.getParameter("showNoContentMessage");return urlParams;};brightcove.copyDefaultParams=function(experience){if(!experience.params)experience.params={};if(!experience.flashParams)experience.flashParams={};for(var i in brightcove.defaultParam){experience.params[i]=brightcove.defaultParam[i];}
for(var j in brightcove.defaultFlashParam){experience.flashParams[j]=brightcove.defaultFlashParam[j];}
if(experience.id.length>0){experience.params.flashID=experience.id;}else{experience.id=experience.params.flashID='bcExperienceObj'+(brightcove.experienceNum++);}
return experience;};brightcove.copySnippetParams=function(experience,params){if(!brightcove.hasActiveX){params=experience.getElementsByTagName('param');}
var numParams=params.length;var param;for(var j=0;j<numParams;j++){param=params[j];if(brightcove.hasActiveX&&param.parentNode.id!=experience.id){continue;}
experience.params[param.name]=param.value;}
if(experience.params.bgcolor!=undefined)experience.flashParams.bgcolor=experience.params.bgcolor;if(experience.params.wmode!=undefined)experience.flashParams.wmode=experience.params.wmode;if(experience.params.seamlessTabbing!=undefined)experience.flashParams.seamlessTabbing=experience.params.seamlessTabbing;return experience;};brightcove.copyUrlParams=function(experience,urlParams){if(experience.params.autoStart==undefined&&urlParams.autoStart!=undefined){experience.params.autoStart=urlParams.autoStart;}
if(urlParams.debuggerID!=undefined){experience.params.debuggerID=urlParams.debuggerID;}
if(urlParams.forceHTML!=undefined&&urlParams.forceHTML!==''){experience.params.forceHTML=urlParams.forceHTML;}
if(urlParams.forceFlashIFrame!=undefined&&urlParams.forceFlashIFrame!==''){experience.params.forceFlashIFrame=urlParams.forceFlashIFrame;}
if(urlParams.debug!=undefined&&urlParams.debug!==''){experience.params.debug=urlParams.debug;}
if(urlParams.showNoContentMessage!=undefined&&urlParams.showNoContentMessage!=''){experience.params.showNoContentMessage=urlParams.showNoContentMessage;}
var overrideContent=(urlParams.playerID.length<1&&urlParams.playerKey.length<1)||(urlParams.playerID==experience.params.playerID)||(urlParams.playerKey==experience.params.playerKey);if(overrideContent){if(urlParams.titleID.length>0){experience.params.videoID=urlParams.titleID;experience.params["@videoPlayer"]=urlParams.titleID;experience.params.autoStart=(experience.params.autoStart!="false"&&urlParams.autoStart!="false");}
if(urlParams.lineupID.length>0){experience.params.lineupID=urlParams.lineupID;}}
return experience;};brightcove.determinePlayerType=function(experience,flashSupport,htmlSupport){if(flashSupport==null&&htmlSupport==false){return brightcove.playerType.NO_SUPPORT;}
if(experience.params.forceHTML){if(window.console){var message="The forceHTML parameter was used for the Brightcove player. This value should ONLY be used for";message+=" development and testing purposes and is not supported in production environments.";console.log(message);}
return brightcove.playerType.HTML;}
if(experience.params.forceFlashIFrame||(brightcove.isMetroIE()&&flashSupport==null)){return brightcove.playerType.FLASH_IFRAME;}
if(flashSupport!=null){if(brightcove.isFlashVersionSufficient(experience,flashSupport)){return brightcove.playerType.FLASH;}else{return brightcove.playerType.INSTALLER;}}
if(htmlSupport){if(brightcove.isSupportedHTMLDevice()||experience.params.htmlFallback){return brightcove.playerType.HTML;}}
return brightcove.playerType.NO_SUPPORT;};brightcove.isFlashVersionSufficient=function(experience,flashSupport){if(flashSupport==null)return false;var setMajorVersion=false;var requestedMajorVersion;var requestedMajorRevision;var requestedMinorRevision;if(experience.params.majorVersion!=undefined){requestedMajorVersion=parseInt(experience.params.majorVersion,10);setMajorVersion=true;}else{requestedMajorVersion=brightcove.majorVersion;}
if(experience.params.majorRevision!=undefined){requestedMajorRevision=parseInt(experience.params.majorRevision,10);}else{if(setMajorVersion){requestedMajorRevision=0;}else{requestedMajorRevision=brightcove.majorRevision;}}
if(experience.params.minorRevision!=undefined){requestedMinorRevision=parseInt(experience.params.minorRevision,10);}else{if(setMajorVersion){requestedMinorRevision=0;}else{requestedMinorRevision=brightcove.minorRevision;}}
return(flashSupport.majorVersion>requestedMajorVersion||(flashSupport.majorVersion==requestedMajorVersion&&flashSupport.majorRevision>requestedMajorRevision)||(flashSupport.majorVersion==requestedMajorVersion&&flashSupport.majorRevision==requestedMajorRevision&&flashSupport.minorRevision>=requestedMinorRevision));};brightcove.generateRequestUrl=function(experience,playerType,secureConnections){var file;if(playerType==brightcove.playerType.INSTALLER){file=brightcove.cdnURL+"/viewer/playerProductInstall.swf";var MMPlayerType=brightcove.hasActiveX?"ActiveX":"PlugIn";document.title=document.title.slice(0,47)+" - Flash Player Installation";var MMdoctitle=document.title;file+="?&MMredirectURL="+window.location+'&MMplayerType='+MMPlayerType+'&MMdoctitle='+MMdoctitle;brightcove.reportUpgradeRequired(experience);}else{if(secureConnections){file=brightcove.getPubURL(brightcove.secureServicesURL,brightcove.pubSecureHost,experience.params.pubCode);}else{file=brightcove.getPubURL(brightcove.servicesURL,brightcove.pubHost,experience.params.pubCode);}
var servlet=(playerType==brightcove.playerType.HTML)?brightcove.servlet.HTML:brightcove.servlet.AS3;file+='/viewer/'+servlet+'?'+brightcove.getOverrides();for(var config in experience.params){file+='&'+encodeURIComponent(config)+'='+encodeURIComponent(experience.params[config]);}}
return file;};brightcove.renderInstallGif=function(experience,secureConnections){var containerID='_container'+experience.id;var container=brightcove.createElement('span');if(experience.params.height.charAt(experience.params.height.length-1)=="%"){container.style.display='block';}else{container.style.display='inline-block';}
container.id=containerID;var cdnURL=secureConnections?brightcove.secureCDNURL:brightcove.cdnURL;var upgradeFlashImage=cdnURL.indexOf('.co.jp')>0?"upgrade_flash_player_kk.gif":"upgrade_flash_player2.gif";var linkHTML="<a href='http://www.adobe.com/go/getflash/' target='_blank'><img src='"+cdnURL+"/viewer/"+upgradeFlashImage+"' alt='Get Flash Player' width='314' height='200' border='0'></a>";experience.parentNode.replaceChild(container,experience);document.getElementById(containerID).innerHTML=linkHTML;};brightcove.renderExperience=function(experience,file,playerType,secureConnections){var experienceElement;var experienceID=experience.id;var container;var timeout=brightcove.flashTimeoutInterval;if(!(experience.params.playerKey||experience.params.playerID||experience.params.playerId||experience.params.playerid)){if(window.console){console.log("No playerID or playerKey was found for the Brightcove player, so it can not be rendered.");}
return;}
brightcove.experienceObjects[experienceID]=experience;var unminified=(brightcove.getParameter("unminified")=="true")||(experience.params.unminified==="true");if(experience.params.includeAPI==="true"&&!(brightcove._apiRequested||brightcove.api)){var source="/js/api/";if(unminified){source+="unminified/";}
source+="SmartPlayerAPI.js";var apiInclude=brightcove.createElement('script');apiInclude.type="text/javascript";var cdnURL=secureConnections?brightcove.secureCDNURL:brightcove.cdnURL;apiInclude.src=cdnURL+source;experience.parentNode.appendChild(apiInclude);brightcove._apiRequested=true;}
file+="&startTime="+new Date().getTime();if(playerType===brightcove.playerType.HTML){timeout=brightcove.htmlTimeoutInterval;file+="&refURL="+(window.document.referrer?window.document.referrer:'not available');if(unminified){file+="&unminified=true";}
experienceElement=brightcove.createIFrame(experience);experience.parentNode.replaceChild(experienceElement,experience);brightcove.experiences[experienceID]=experienceElement;experience.element=experienceElement;if(experience.params.videoID||experience.params.videoId){file+="&"+encodeURIComponent("@videoPlayer")+"="+encodeURIComponent(experience.params.videoID||experience.params.videoId);}
experienceElement.src=file;}else if(playerType===brightcove.playerType.FLASH_IFRAME){var currentCDN=secureConnections?brightcove.secureCDNURL:brightcove.cdnURL;var iframeURL=currentCDN+"/js/flash_iframe.html?parentPage="+window.location.toString().split("?")[0];iframeURL+='&currentCDN='+currentCDN;if(unminified){iframeURL+='&unminified='+unminified;}
experienceElement=brightcove.createIFrame(experience);experience.parentNode.replaceChild(experienceElement,experience);brightcove.experiences[experienceID]=experienceElement;experience.element=experienceElement;experienceElement.src=iframeURL;window.addEventListener('message',function(event){if(event.origin.split("/")[2]!==currentCDN.split("/")[2])return;var data=JSON.parse(event.data);if(data!="bcIframeInitialized"){return;}
var playerConfig;if(brightcove.hasActiveX){experience.flashParams.movie=file;var flashEmbedStr=brightcove.getFlashEmbedString(experience,secureConnections);playerConfig={activeX:flashEmbedStr,height:experience.params.height,id:'_container'+experience.id,file:file};}else{playerConfig=brightcove.getFlashObjectParams(experience,file);}
var playerConfigStr=JSON.stringify(playerConfig);experienceElement.contentWindow.postMessage(playerConfigStr,currentCDN);},false);window.addEventListener('message',function(event){if(event.origin.split("/")[2]!==currentCDN.split("/")[2])return;var data=JSON.parse(event.data);if(data.api&&brightcove.internal&&brightcove.internal._setAPICallback){if(data.api=="apiCallback"){brightcove.internal._setAPICallback(data.pid,data.callback,iframeURL);}else if(data.api=="loadEvent"){window[data.callback](data.event);}else if(data.api=="onTemplateReadyEvent"){brightcove[data.callback](data.event);}}},false);}else{if(brightcove.hasActiveX){experience.flashParams.movie=file;var flashEmbedStr=brightcove.getFlashEmbedString(experience,secureConnections);var containerID='_container'+experience.id;container=brightcove.createFlashEmbed(containerID,experience.params.height);experience.parentNode.replaceChild(container,experience);document.getElementById(containerID).innerHTML=flashEmbedStr;brightcove.experiences[experienceID]=container;}else{var flashObjectParams=brightcove.getFlashObjectParams(experience,file);experienceElement=brightcove.createFlashObject(flashObjectParams);experience.parentNode.replaceChild(experienceElement,experience);brightcove.experiences[experienceID]=experienceElement;}}
brightcove.timeouts[experience.id]=setTimeout(function(){brightcove.handleExperienceTimeout(experienceID);},timeout);};brightcove.createIFrame=function(experience){var iframeElement=brightcove.createElement('iframe');iframeElement.id=experience.id;iframeElement.width=experience.params.width;iframeElement.height=experience.params.height;iframeElement.className=experience.className;iframeElement.frameborder=0;iframeElement.scrolling="no";iframeElement.style.borderStyle="none";return iframeElement;};brightcove.getFlashEmbedString=function(experience,secureConnections){var options='';var flashParams=experience.flashParams;for(var pOption in flashParams){options+='<param name="'+pOption+'" value="'+experience.flashParams[pOption]+'" />';}
var protocol=secureConnections?"https":"http";return'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
+' codebase="'+protocol+'://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+brightcove.majorVersion+','+brightcove.majorRevision+','+brightcove.minorRevision+',0"'
+' id="'+experience.id+'"'
+' width="'+experience.params.width+'"'
+' height="'+experience.params.height+'"'
+' type="application/x-shockwave-flash"'
+' class="BrightcoveExperience">'
+options
+'</object>';};brightcove.getFlashObjectParams=function(experience,file){var experienceObject={};experienceObject.type='application/x-shockwave-flash';experienceObject.data=file;experienceObject.id=experience.params.flashID;experienceObject.width=experience.params.width;experienceObject.height=experience.params.height;experienceObject.className=experience.className;experienceObject.seamlesstabbing=experience.flashParams.seamlessTabbing;for(var config in experience.flashParams){experienceObject["flashParam_"+config]=experience.flashParams[config];}
return experienceObject;};brightcove.createFlashEmbed=function(experienceId,height){var container=brightcove.createElement('span');if(height.charAt(height.length-1)=="%"){container.style.display='block';}else{container.style.display='inline-block';}
container.id=experienceId;return container;};brightcove.createFlashObject=function(playerConfig){var experienceElement=brightcove.createElement('object');experienceElement.type=playerConfig.type;experienceElement.data=playerConfig.data;experienceElement.id=playerConfig.id;experienceElement.width=playerConfig.width;experienceElement.height=playerConfig.height;experienceElement.className=playerConfig.className;experienceElement.setAttribute("seamlesstabbing",playerConfig.seamlessTabbing);var tempParam;var flashParamPrefix="flashParam_";for(var config in playerConfig){var flashParamInd=config.indexOf(flashParamPrefix);if(flashParamInd==0){tempParam=brightcove.createElement('param');tempParam.name=config.substring(flashParamPrefix.length);tempParam.value=playerConfig[config];experienceElement.appendChild(tempParam);}}
return experienceElement;};brightcove.handleExperienceTimeout=function(pID){brightcove.executeErrorHandlerForExperience(brightcove.experienceObjects[pID],{type:"templateError",errorType:"serviceUnavailable",code:brightcove.errorCodes.SERVICE_UNAVAILABLE,info:pID});};brightcove.reportPlayerLoad=function(pID){var timeout=brightcove.timeouts[pID];if(timeout){clearTimeout(timeout);}};brightcove.reportUpgradeRequired=function(pExperience){brightcove.executeErrorHandlerForExperience(pExperience,{type:"templateError",errorType:"upgradeRequiredForPlayer",code:brightcove.errorCodes.UPGRADE_REQUIRED_FOR_PLAYER,info:pExperience.id});};brightcove.checkFlashSupport=function(){var hasActiveX=(window.ActiveXObject!=undefined);return(hasActiveX)?brightcove.checkFlashSupportIE():brightcove.checkFlashSupportStandard();};brightcove.checkFlashSupportIE=function(){var versions;try{var flash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");var version=flash.GetVariable('$version');versions=/ ([0-9]+),([0-9]+),([0-9]+),/.exec(version);}catch(exception){return null;}
return{majorVersion:versions[1],majorRevision:versions[2],minorRevision:versions[3]};};brightcove.isMetroIE=function(){var version=0;if(navigator.appVersion.indexOf("MSIE")!=-1){var appSplit=navigator.appVersion.split("MSIE");if(appSplit.length>1){version=parseFloat(appSplit[1]);}}
if(version<10||isNaN(version)){return false;}
var activeXSupport=false;try{activeXSupport=!!new ActiveXObject("htmlfile");}catch(e){activeXSupport=false;}
return!activeXSupport;};brightcove.checkFlashSupportStandard=function(){var versions;var majorVersion;var majorRevision;var minorRevision;try{if(typeof navigator.plugins!='undefined'&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var swfVersion=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";var description=navigator.plugins["Shockwave Flash"+swfVersion].description;var filename=navigator.plugins["Shockwave Flash"+swfVersion].filename;if(filename.match){if(filename.toLowerCase().match(/lite/)){throw new Error();}}
versions=description.split(" ");majorVersion=versions[2].split(".")[0];majorRevision=versions[2].split(".")[1];minorRevision=versions[3];if(minorRevision==""){minorRevision=versions[4];}
if(minorRevision[0]=="d"){minorRevision=minorRevision.substring(1);}else if(minorRevision[0]=="r"){minorRevision=minorRevision.substring(1);if(minorRevision.indexOf("d")>0){minorRevision=minorRevision.substring(0,minorRevision.indexOf("d"));}}}else{throw new Error();}}else{return null;}}catch(exception){return null;}
return{majorVersion:majorVersion,majorRevision:majorRevision,minorRevision:minorRevision};};brightcove.checkHtmlSupport=function(){var v=brightcove.createElement('video');var videoSupport=true;if(!brightcove.userAgent.match(new RegExp("android","i"))){videoSupport=!!(v.canPlayType&&v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/,''));}
if(brightcove.userAgent.match(/BlackBerry.*Version\/6\.0/)){return false;}
var canvasSupport=!!brightcove.createElement('canvas').getContext;return videoSupport&&canvasSupport;};brightcove.isSupportedHTMLDevice=function(pUAString){var types=["iPad","iPhone","iPod","android","Silk"];var numTypes=types.length;var uaString=pUAString||brightcove.userAgent;for(var i=0;i<numTypes;i++){if(uaString.match(new RegExp(types[i],"i"))){return true;}}
return false;};brightcove.getTechnology=function(pExperienceId){for(var id in brightcove.experiences){if(pExperienceId==id){return(brightcove.experiences[id].tagName=="object")?brightcove.playerType.FLASH:brightcove.playerType.HTML;}}
return brightcove.playerType.NO_SUPPORT;};brightcove.respondToMessages=function(pMessage){if(brightcove.verifyMessage(pMessage)){var messageData=pMessage.data;if(messageData.charAt(0)=="\""){if(window.JSON){messageData=window.JSON.parse(messageData);}else{messageData=brightcove.json_parse(messageData);}}
var messageParts=messageData.split("::");var type=messageParts[1];var messageJson=messageParts[2].split("\n").join(" ");var messageDataObject;if(window.JSON){messageDataObject=window.JSON.parse(messageJson);}else{messageDataObject=brightcove.json_parse(messageJson);}
switch(type){case"error":brightcove.executeMessageCallback(messageDataObject,brightcove.executeErrorHandlerForExperience);break;case"api":brightcove.handleAPICallForHTML(messageDataObject);break;case"handler":var event=brightcove.internal._convertDates(messageDataObject.event);try{brightcove.internal._handlers[messageDataObject.handler](event);}catch(e){}
break;case"asyncGetter":var data=brightcove.internal._convertDates(messageDataObject.data);brightcove.internal._handlers[messageDataObject.handler](data);break;}}};brightcove.verifyMessage=function(pMessage){return pMessage.data.match(/brightcove.player/);};brightcove.handleAPICallForHTML=function(pMessageObject){var experience=brightcove.experienceObjects[pMessageObject.id];if(experience==null){return;}
var id=experience.id;var method=pMessageObject.method;switch(method){case"initializeBridge":brightcove.reportPlayerLoad(id);if(pMessageObject.arguments[0]){if(brightcove.internal!=null){brightcove.internal._setAPICallback(id,null,pMessageObject.arguments[1]);brightcove.callHandlerForPlayer(experience,"templateLoadHandler",id);}else if(brightcove._apiRequested){brightcove._queuedAPICalls.push(pMessageObject);}}
break;case"callTemplateReady":if(brightcove._apiRequested&&!brightcove.internal){brightcove._queuedAPICalls.push(pMessageObject);}else{var event=pMessageObject.arguments;brightcove._addModuleToEvent(id,event);brightcove.callHandlerForPlayer(experience,"templateReadyHandler",event);}
break;}};brightcove._addModuleToEvent=function(pID,pEvent){if(pEvent.type!=null&&brightcove.api){var experience=brightcove.api.getExperience(pID);if(experience){pEvent.target=experience.getModule("experience");}}};brightcove.callHandlerForPlayer=function(pExperience,pHandler,pArgument){if(pExperience&&pExperience.params&&pExperience.params[pHandler]){var namespaceArray=pExperience.params[pHandler].split(".");var namespaces;if((namespaces=namespaceArray.length)>1){var trace=window;for(var i=0;i<namespaces;i++){trace=trace[namespaceArray[i]];}
if(typeof trace==="function"){trace(pArgument);}}else{window[pExperience.params[pHandler]](pArgument);}}};brightcove.executeErrorHandlerForExperience=function(pExperience,pErrorObject){brightcove.callHandlerForPlayer(pExperience,"templateErrorHandler",pErrorObject);};brightcove.executeMessageCallback=function(pMessageDataObject,pCallback){var experience;for(var experienceKey in brightcove.experienceObjects){experience=brightcove.experienceObjects[experienceKey];if(experience.element.src===pMessageDataObject.__srcUrl){delete pMessageDataObject.__srcUrl;pCallback(experience,pMessageDataObject);break;}}};brightcove.createExperience=function(pElement,pParentOrSibling,pAppend){if(!pElement.id||pElement.id.length<1){pElement.id='bcExperienceObj'+(brightcove.experienceNum++);}
if(pAppend){pParentOrSibling.appendChild(pElement);}else{pParentOrSibling.parentNode.insertBefore(pElement,pParentOrSibling);}
brightcove.createExperiences(null,pElement.id);};brightcove.removeExperience=function(pID){if(brightcove.experiences[pID]!=null){brightcove.experiences[pID].parentNode.removeChild(brightcove.experiences[pID]);}};brightcove.getURL=function(){var url;if(typeof window.location.search!='undefined'){url=window.location.search;}else{url=/(\?.*)$/.exec(document.location.href);}
return url;};brightcove.getOverrides=function(){var url=brightcove.getURL();var query=new RegExp('@[\\w\\.]+=[^&]+','g');var value=query.exec(url);var overrides="";while(value!=null){overrides+="&"+value;value=query.exec(url);}
return overrides;};brightcove.getParameter=function(pName,pDefaultValue){if(pDefaultValue==null)pDefaultValue="";var url=brightcove.getURL();var query=new RegExp(pName+'=([^&]*)');var value=query.exec(url);if(value!=null){return value[1];}else{return pDefaultValue;}};brightcove.createElement=function(el){if(document.createElementNS){return document.createElementNS('http://www.w3.org/1999/xhtml',el);}else{return document.createElement(el);}};brightcove.i18n={'BROWSER_TOO_OLD':'The browser you are using is too old. Please upgrade to the latest version of your browser.'};brightcove.removeListeners=function(){if(/KHTML/i.test(navigator.userAgent)){clearInterval(checkLoad);document.removeEventListener('load',brightcove.createExperiences,false);}
if(typeof document.addEventListener!='undefined'){document.removeEventListener('DOMContentLoaded',brightcove.createExperiences,false);document.removeEventListener('load',brightcove.createExperiences,false);}else if(typeof window.attachEvent!='undefined'){window.detachEvent('onload',brightcove.createExperiences);}};brightcove.getPubURL=function(source,host,pubCode){if(!pubCode||pubCode=="")return source;var re=/^([htps]{4,5}\:\/\/)([^\/\:]+)/i;host=host.replace("$pubcode$",pubCode).replace("$zoneprefix$$zone$",brightcove.pubSubdomain);return source.replace(re,"$1"+host);};brightcove.createExperiencesPostLoad=function(){brightcove.removeListeners();brightcove.createExperiences();};brightcove.encode=function(string){string=escape(string);string=string.replace(/\+/g,"%2B");string=string.replace(/\-/g,"%2D");string=string.replace(/\*/g,"%2A");string=string.replace(/\//g,"%2F");string=string.replace(/\./g,"%2E");string=string.replace(/_/g,"%5F");string=string.replace(/@/g,"%40");return string;};if(/KHTML/i.test(navigator.userAgent)){var checkLoad=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(checkLoad);brightcove.createExperiencesPostLoad();}},70);document.addEventListener('load',brightcove.createExperiencesPostLoad,false);}
if(typeof document.addEventListener!='undefined'){document.addEventListener('DOMContentLoaded',brightcove.createExperiencesPostLoad,false);document.addEventListener('load',brightcove.createExperiencesPostLoad,false);window.addEventListener("message",brightcove.respondToMessages,false);}else if(typeof window.attachEvent!='undefined'){window.attachEvent('onload',brightcove.createExperiencesPostLoad);}else{alert(brightcove.i18n.BROWSER_TOO_OLD);}}
brightcove.json_parse=(function(){"use strict";var state,stack,container,key,value,escapes={'\\':'\\','"':'"','/':'/','t':'\t','n':'\n','r':'\r','f':'\f','b':'\b'},string={go:function(){state='ok';},firstokey:function(){key=value;state='colon';},okey:function(){key=value;state='colon';},ovalue:function(){state='ocomma';},firstavalue:function(){state='acomma';},avalue:function(){state='acomma';}},number={go:function(){state='ok';},ovalue:function(){state='ocomma';},firstavalue:function(){state='acomma';},avalue:function(){state='acomma';}},action={'{':{go:function(){stack.push({state:'ok'});container={};state='firstokey';},ovalue:function(){stack.push({container:container,state:'ocomma',key:key});container={};state='firstokey';},firstavalue:function(){stack.push({container:container,state:'acomma'});container={};state='firstokey';},avalue:function(){stack.push({container:container,state:'acomma'});container={};state='firstokey';}},'}':{firstokey:function(){var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},ocomma:function(){var pop=stack.pop();container[key]=value;value=container;container=pop.container;key=pop.key;state=pop.state;}},'[':{go:function(){stack.push({state:'ok'});container=[];state='firstavalue';},ovalue:function(){stack.push({container:container,state:'ocomma',key:key});container=[];state='firstavalue';},firstavalue:function(){stack.push({container:container,state:'acomma'});container=[];state='firstavalue';},avalue:function(){stack.push({container:container,state:'acomma'});container=[];state='firstavalue';}},']':{firstavalue:function(){var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},acomma:function(){var pop=stack.pop();container.push(value);value=container;container=pop.container;key=pop.key;state=pop.state;}},':':{colon:function(){if(Object.hasOwnProperty.call(container,key)){throw new SyntaxError('Duplicate key "'+key+'"');}
state='ovalue';}},',':{ocomma:function(){container[key]=value;state='okey';},acomma:function(){container.push(value);state='avalue';}},'true':{go:function(){value=true;state='ok';},ovalue:function(){value=true;state='ocomma';},firstavalue:function(){value=true;state='acomma';},avalue:function(){value=true;state='acomma';}},'false':{go:function(){value=false;state='ok';},ovalue:function(){value=false;state='ocomma';},firstavalue:function(){value=false;state='acomma';},avalue:function(){value=false;state='acomma';}},'null':{go:function(){value=null;state='ok';},ovalue:function(){value=null;state='ocomma';},firstavalue:function(){value=null;state='acomma';},avalue:function(){value=null;state='acomma';}}};function debackslashify(text){return text.replace(/\\(?:u(.{4})|([^u]))/g,function(a,b,c){return b?String.fromCharCode(parseInt(b,16)):escapes[c];});}
return function(source,reviver){var r,tx=/^[\x20\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;state='go';stack=[];try{for(;;){r=tx.exec(source);if(!r){break;}
if(r[1]){action[r[1]][state]();}else if(r[2]){value=+r[2];number[state]();}else{value=debackslashify(r[3]);string[state]();}
source=source.slice(r[0].length);}}catch(e){state=e;}
if(state!=='ok'||(/[^\x20\t\n\r]/).test(source)){throw state instanceof SyntaxError?state:new SyntaxError('JSON');}
return typeof reviver==='function'?(function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}({'':value},'')):value;};}());;
Drupal.brightcove_field = {};

Drupal.brightcove_field.player;
Drupal.brightcove_field.modVP;
Drupal.brightcove_field.modExp;
Drupal.brightcove_field.modCon;

Drupal.brightcove_field.templateLoader = function(experienceID) {
  Drupal.brightcove_field.player = brightcove.api.getExperience(experienceID);
  Drupal.brightcove_field.modVP = Drupal.brightcove_field.player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
  Drupal.brightcove_field.modExp = Drupal.brightcove_field.player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
  Drupal.brightcove_field.modCon = Drupal.brightcove_field.player.getModule(brightcove.api.modules.APIModules.CONTENT);
  if (typeof Drupal.brightcove_field.listeners != 'undefined') {
    for (var listener_id in Drupal.brightcove_field.listeners) {
      var callback = Drupal.brightcove_field.listeners[listener_id];
      Drupal.brightcove_field.modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, callback);
    }
  }
}

// Listeners should be created by:
// Drupal.brightcove_field.listeners.push(myFunction);
Drupal.brightcove_field.listeners = Drupal.brightcove_field.listeners || [];
;
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-borderradius-boxshadow-opacity-cssanimations-generatedcontent-cssgradients-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-draganddrop-hashchange-history-audio-video-localstorage-sessionstorage-websqldatabase-geolocation-svg-touch-shiv-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.websqldatabase=function(){return!!a.openDatabase},s.hashchange=function(){return z("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.borderradius=function(){return I("borderRadius")},s.boxshadow=function(){return I("boxShadow")},s.opacity=function(){return D("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return I("animationName")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return C((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),F(j.backgroundImage,"gradient")},s.csstransforms=function(){return!!I("transform")},s.csstransforms3d=function(){var a=!!I("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return I("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect};for(var J in s)B(s,J)&&(x=J.toLowerCase(),e[x]=s[J](),v.push((e[x]?"":"no-")+x));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;
(function($) {

/**
 * Late load tags
 */
$(document).ready(function() {
	if (typeof Drupal.DART != 'undefined') {
      setInterval(Drupal.DART.display_ads, 100000);
    }
  }
);

$(document).bind('dart_tag_render', function(event, tag){
    // modify tag however you see fit and then return it.
    // example:
    
    //remove margins for iframe with no margins attributes
    if(tag.indexOf('iframe') !== -1 && tag.indexOf('marginwidth') === -1){
        tag = tag.replace('<iframe', '<iframe marginwidth="0" marginheight="0"');
    }
    var ad = Drupal.DART.settings.loadLastTags.hasOwnProperty('mobile_1') ? jQuery.parseJSON(Drupal.DART.settings.loadLastTags.mobile_1) : '';
    var re = new RegExp(ad.zone, "g");
    var ua = UASniff();
    var zone = (ua.platform) ?  ad.zone + '_' + ua.platform : ad.zone;
    tag.replace(re,zone);
    if (ua.device) {
       var re = new RegExp("pos=","g");
       tag.replace(re, "dev=" + ua.device + ';pos=');
    }
    switch(ua.platform) {
      case 'tablet':
        //unset
        var re = new RegExp('pos=2', "g");
        var re2 = new RegExp('pos=3', "g");
        if (re.test(tag) || re2.test(tag)) {
          var re3 = new RegExp('m2mob=true', "g");
          if (!re3.test(tag)) {
            tag = null;
          }
        }
        break;
      case 'mobile':
        var re = new RegExp('pos=2', "g");
        var re2 = new RegExp('pos=3', "g");
        var re3 = new RegExp('pos=1', "g");
        if (re.test(tag) || re2.test(tag) || re3.test(tag)) {
          var re4 = new RegExp('m2mob=true', "g");
          if (!re4.test(tag)) {
            tag = null;
          }
        }
        break;
      default:
        var re = new RegExp('m2mob=true', "g");
        if (re.test(tag)) {
          tag = null;
        }     
        break;
    }

    //http://ad.doubleclick.net/adj/nbcu.holamun2/home;pos=1;sz=728x90,970x66;site=mundos;sect=home;sub=;!c=mundos;!c=home;!c=;tandomad=none;pm=1;tile=1;ord=1162751278
    return tag;
  });
})(jQuery);



function UASniff() {
  var ua = new Object;
  if(navigator.userAgent.match(/iPad/i)) {
    ua.platform = 'tablet';
    ua.device = 'ipad';
  } else if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    ua.platform = 'mobile';
    ua.device = 'iphone';
  } else if(navigator.userAgent.match(/android/i))  {
    // if it also says mobile, it's mobile android, otherwise, tablet.
    if(navigator.userAgent.match(/mobile/i))  {
      ua.platform = 'mobile';
      ua.device = 'android';
    } else {
      ua.platform = 'tablet';
      ua.device = 'androidtab';
    }
  } else {
    ua.platform = null;
    ua.device = null;
  }
  return ua;
};
;
/* SiteCatalyst code version: H.23.8.
Copyright 1996-2011 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */
/* UPDATED March 19, 2012  B.Roden*/

//var s_account="nbcumun2dev"
var s_account="nbcuglobal,nbcutelemundod,nbcumun2bu";

var s=s_gi(s_account,1)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="UTF-8"
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,mun2,holamun2"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {

	s.server=window.location.host.toLowerCase();
	if(!s.pageName) {s.pageName=document.title;}
	s.campaign=s.getQueryParam('cid,__source',':');           
		if(s.campaign){s.c_w('campaignname', s.campaign, 0);}

	//props
	s.prop6 = unescape(unescape(window.location.href));
	s.prop7=s.getQueryParam('s',':'); //Internal Search Keyword
	s.prop8 ="Telemundo";
	s.prop9 ="Telemundo.com";
	s.prop11=s.prop10 + " | " + s.pageName;
	s.prop12=s.prop9 + " | " + s.prop10;
	s.prop13=s.getNewRepeat();
	if(s.c_r('campaignname')){s.prop14=s.c_r('campaignname') + ":";s.prop14=s.prop14 + s.prop9;}
	

	s.prop21 = s.getQueryParam("nlcid");
	s.prop22=s.getQueryParam('search_web',':'); 
 			if(s.prop22=='1') {s.prop22='Site';}
 			if(s.prop22=='0') {s.prop22='Web';}
	s.prop24 = s.getQueryParam("vty"); 
	s.prop30 = s.getQueryParam("ice");

	//eVars
	s.eVar6=s.prop7;   
	s.eVar18 = s.getQueryParam("sky"); 
		if(s.eVar18){s.c_w('evareightteen', s.eVar18, 0);}
		if(s.c_r('evareightteen')){s.eVar18=s.c_r('evareightteen')}
	s.eVar20 = s.getQueryParam("dst"); 
	s.eVar22=s.prop22;
	s.eVar23 = s.getQueryParam("par"); 
	s.eVar24 = s.getQueryParam("o"); 
	
	s.eVar19 = s.getQueryParam("WT.srch"); 
	s.eVar16 = s.getQueryParam("hcoref");

	//Events
	s.events=s.apl(s.events,'event6',',',1);

 	//Props to evars
 	if(s.prop10) {s.eVar36=s.prop10;}
 	if(s.prop3)  {s.eVar32=s.prop3;}
 	if(s.prop4)  {s.eVar37=s.prop4;}
 	if(s.prop6)  {s.eVar43=s.prop6;}
	if(s.prop9)  {s.eVar45=s.prop9;}
 		

 	//Hier
	if ((typeof(s.prop2) == 'undefined')||(s.prop2 == '')) {sprop2 = 'miscellaneous'} else { sprop2=s.prop2 }
	if ((typeof(s.prop3) == 'undefined')||(s.prop3 == '')) {sprop3 = 'miscellaneous'} else { sprop3=s.prop3 }
	if ((typeof(s.prop4) == 'undefined')||(s.prop4 == '')) {sprop4 = 'miscellaneous'} else { sprop4=s.prop4 }
	if ((typeof(s.prop10) == 'undefined')||(s.prop10 == '')) {sprop10 = 'miscellaneous'} else { sprop10=s.prop10 }
	s.hier1 = s.prop8 + '|' + s.prop9 +  '|' + s.prop10;
	s.hier2=sprop2+'|'+sprop10+'|'+sprop3+'|'+sprop4;
	s.hier3=set_h3();	

}
s.doPlugins=s_doPlugins


/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+"n 'Repeat';");


/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");


/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");

/*
 * Utility Function: Determine If A Particular Value Exists Within An Array
 */
s.ia=new Function("ar","v",""
+"for(var i=0;i<ar.length;i++){if(ar[i]==v)return i}return -1");

/*
 * Plugin: Dynamically Build s.hier3 value
 */
function set_h3() {
h3 = new String(document.location.host + document.location.pathname);
if(h3.charAt(h3.length-1)=="/") {var temp = new String();for(var i=0;i<h3.length-1;i++){temp += h3.charAt(i);}h3 = temp;}
var intIndexOfMatch = h3.indexOf("/");while (intIndexOfMatch != -1) {h3 = h3.replace("/","|");intIndexOfMatch = h3.indexOf("/");}return h3;}


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="nbcuniversal"
s.trackingServer="oimg.nbcuni.com"
s.trackingServerSecure="osimg.nbcuni.com"
s.dc=122

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.24.3';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl"
+"(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im."
+"s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if"
+"(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.na"
+"me&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg"
+"=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s"
+"=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCas"
+"e();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l"
+"=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.su"
+"bstring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f"
+"){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)"
+"&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)"
+"sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(s"
+"v)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk="
+"='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring("
+"0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv"
+"+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].tra"
+"ckEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.sub"
+"string(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';"
+"else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigra"
+"tionServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUp"
+"perCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='varia"
+"bleProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDep"
+"th')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connec"
+"tionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('"
+"c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else "
+"if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b="
+"='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=funct"
+"ion(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?"
+"t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=li"
+"f?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef'"
+",h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true"
+"');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||"
+"s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if"
+"(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.subs"
+"tring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toU"
+"pperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c"
+",n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),"
+"\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.s"
+"rc;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf('"
+",'+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&'"
+",'rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=functi"
+"on(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x i"
+"n s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q"
+"||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.leng"
+"th;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s"
+"=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'o"
+"nload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*="
+"100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,"
+"x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccoun"
+"tMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0"
+"?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substrin"
+"g(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in"
+"++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r"
+"._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._"
+"in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m."
+"_i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_"
+"l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if"
+"(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.lengt"
+"h;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+"
+"1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;"
+"b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.m"
+"axDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\""
+");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}r"
+"eturn o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};"
+"s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k]"
+"[x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)f"
+"or(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.d"
+"lt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250"
+";s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.ge"
+"tYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='"
+"',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&Str"
+"ing.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Funct"
+"ion('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'"
+"Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.doc"
+"umentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}cat"
+"ch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl"
+".length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight"
+"=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pag"
+"eURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,o"
+"c;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.ind"
+"exOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s."
+"linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o."
+"sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}"
+"else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s"
+".retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd"
+".s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.l"
+"ightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&"
+"&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s["
+"x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if"
+"(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLow"
+"erCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netsca"
+"pe6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netsc"
+"ape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s"
+".ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%"
+"C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,v"
+"isitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,"
+"retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s."
+"vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s."
+"vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaE"
+"nabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCo"
+"okieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlin"
+"eStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg="
+"pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=functio"
+"n(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
;
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['tweet'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <li>\n    <a class=\"tweet_avatar\" href=\"http://twitter.com/";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.screen_name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n      <img src=\"";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.profile_image_url;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" height=\"48\" width=\"48\" alt=\"";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.screen_name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "'s avatar\" title=\"";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.screen_name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "'s avatar\" border=\"0\">\n    </a>\n    <span class=\"tweet_time\">\n      <a href=\"http://twitter.com/mun2/status/";
  foundHelper = helpers.id_str;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id_str; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" title=\"view tweet on twitter\">";
  foundHelper = helpers.time_ago;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.time_ago; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n    </span>\n    <span class=\"tweet_text\">\n      ";
  foundHelper = helpers.text;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n    </span>\n  </li>\n  ";
  return buffer;}

  buffer += "<ul class=\"tweet_list\">\n  ";
  stack1 = depth0.items;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;});
})();;
(function($){  
  var Mun2Tweet = Backbone.View.extend({
    el: '#mun2-tweet', // el attaches to existing element  
    replaceURLWithHTMLLinks: function(text) {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(exp,"<a href='$1' target='_new'>$1</a>"); 
    },
    postRender: function() {
      var t = this;
      
      this.jqEl.find('.tweet_text').each(function () {
        var processedHTML = t.replaceURLWithHTMLLinks($(this).text());
        $(this).html(processedHTML);
      });
    },
    processResponse: function() {
      var data = arguments[0], nLength = data.length, i = 0;

      for (; i < nLength; i++) {
        data[i].time_ago = $.timeago(data[i].created_at);
      }
      this.data = { items: data };
      this.render();
    },
    requestData: function(path) {
      $.getJSON(path, this.processResponse.bind(this));
    },
    render: function(){
      // Precompiled Handlebars tmpl (handlebars.tweet.js)
      this.jqEl.html(Handlebars.templates.tweet(this.data));
      this.postRender();
    },
    initialize: function(){
      this.data = this.requestData('/tweets/json');
      this.jqEl = $(this.el);
      this.update = this.render.bind(this);
    }
  });
  
  // Init/bind to object
  $(function () { 
    Drupal.settings.mun2_tweet = new Mun2Tweet();
  });
})(jQuery);;
jQuery(document).ready(function() {    
    var searchField = jQuery("form#search-block-form input.form-search");
    var label = "Search";
    //special backup functionality for IE 8
    if(jQuery.browser.msie == true && jQuery.browser.version == '8.0'){
        if(searchField.val() === '') {
            searchField.val(label);
        }
        searchField.focus(function() {
          if(searchField.val() === label) {
              searchField.val('');
          }
        });
        searchField.blur(function() {
          if(searchField.val() === '') {
              searchField.val(label);
          }
        });
    }else{
        searchField.example(label);
        
    }
    
});
;
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);;
/* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.2
 */
(function(a){a.fn.bgiframe=(a.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(d){d=a.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:"javascript:false;"},d);var c='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+d.src+'"style="display:block;position:absolute;z-index:-1;'+(d.opacity!==false?"filter:Alpha(Opacity='0');":"")+"top:"+(d.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')":b(d.top))+";left:"+(d.left=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')":b(d.left))+";width:"+(d.width=="auto"?"expression(this.parentNode.offsetWidth+'px')":b(d.width))+";height:"+(d.height=="auto"?"expression(this.parentNode.offsetHeight+'px')":b(d.height))+';"/>';return this.each(function(){if(a(this).children("iframe.bgiframe").length===0){this.insertBefore(document.createElement(c),this.firstChild)}})}:function(){return this});a.fn.bgIframe=a.fn.bgiframe;function b(c){return c&&c.constructor===Number?c+"px":c}})(jQuery);;
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
/*
 * This is not the original jQuery Supersubs plugin.
 * Please refer to the README for more information.
 */

(function($){
  $.fn.superfish = function(op){
    var sf = $.fn.superfish,
      c = sf.c,
      $arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
      over = function(){
        var $$ = $(this), menu = getMenu($$);
        clearTimeout(menu.sfTimer);
        $$.showSuperfishUl().siblings().hideSuperfishUl();
      },
      out = function(){
        var $$ = $(this), menu = getMenu($$), o = sf.op;
        clearTimeout(menu.sfTimer);
        menu.sfTimer=setTimeout(function(){
          o.retainPath=($.inArray($$[0],o.$path)>-1);
          $$.hideSuperfishUl();
          if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
        },o.delay);
      },
      getMenu = function($menu){
        var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
        sf.op = sf.o[menu.serial];
        return menu;
      },
      addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };

    return this.each(function() {
      var s = this.serial = sf.o.length;
      var o = $.extend({},sf.defaults,op);
      o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
        $(this).addClass([o.hoverClass,c.bcClass].join(' '))
          .filter('li:has(ul)').removeClass(o.pathClass);
      });
      sf.o[s] = sf.op = o;

      $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
        if (o.autoArrows) addArrow( $('>a:first-child',this) );
      })
      .not('.'+c.bcClass)
        .hideSuperfishUl();

      var $a = $('a',this);
      $a.each(function(i){
        var $li = $a.eq(i).parents('li');
        $a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
      });
      o.onInit.call(this);

    }).each(function() {
      var menuClasses = [c.menuClass];
      if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
      $(this).addClass(menuClasses.join(' '));
    });
  };

  var sf = $.fn.superfish;
  sf.o = [];
  sf.op = {};
  sf.IE7fix = function(){
    var o = sf.op;
    if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
      this.toggleClass(sf.c.shadowClass+'-off');
    };
  sf.c = {
    bcClass: 'sf-breadcrumb',
    menuClass: 'sf-js-enabled',
    anchorClass: 'sf-with-ul',
    arrowClass: 'sf-sub-indicator',
    shadowClass: 'sf-shadow'
  };
  sf.defaults = {
    hoverClass: 'sfHover',
    pathClass: 'overideThisToUse',
    pathLevels: 1,
    delay: 800,
    animation: {opacity:'show'},
    speed: 'normal',
    autoArrows: true,
    dropShadows: true,
    disableHI: false, // true disables hoverIntent detection
    onInit: function(){}, // callback functions
    onBeforeShow: function(){},
    onShow: function(){},
    onHide: function(){}
  };
  $.fn.extend({
    hideSuperfishUl : function(){
      var o = sf.op,
        not = (o.retainPath===true) ? o.$path : '';
      o.retainPath = false;
      var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
          .find('>ul').css({top: '-99999em'}).addClass('sf-hidden');
      o.onHide.call($ul);
      return this;
    },
    showSuperfishUl : function(){
      var o = sf.op,
        sh = sf.c.shadowClass+'-off',
        $ul = this.addClass(o.hoverClass)
          .find('>ul.sf-hidden').css({display: 'none', top: ''}).removeClass('sf-hidden');
      sf.IE7fix.call($ul);
      o.onBeforeShow.call($ul);
      $ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
      return this;
    }
  });
})(jQuery);;
/*
 * Supersubs v0.2b - jQuery plugin
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */
/*
 * This is not the original jQuery Supersubs plugin.
 * Please refer to the README for more information.
 */

(function($){ // $ will refer to jQuery within this closure
  $.fn.supersubs = function(options){
    var opts = $.extend({}, $.fn.supersubs.defaults, options);
    // return original object to support chaining
    return this.each(function() {
      // cache selections
      var $$ = $(this);
      // support metadata
      var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
      // get the font size of menu.
      // .css('fontSize') returns various results cross-browser, so measure an em dash instead
      var fontsize = $('<li id="menu-fontsize">&#8212;</li>').css({
        'padding' : 0,
        'position' : 'absolute',
        'top' : '-99999em',
        'width' : 'auto'
      }).appendTo($$).width(); //clientWidth is faster, but was incorrect here
      // remove em dash
      $('#menu-fontsize').remove();

      // Jump on level if it's a "NavBar"
      if ($$.hasClass('sf-navbar')) {
        $$ = $('li > ul', $$);
      }
      // cache all ul elements 
      $ULs = $$.find('ul:not(.sf-megamenu)');
      // loop through each ul in menu
      $ULs.each(function(i) {
        // cache this ul
        var $ul = $ULs.eq(i);
        // get all (li) children of this ul
        var $LIs = $ul.children();
        // get all anchor grand-children
        var $As = $LIs.children('a');
        // force content to one line and save current float property
        var liFloat = $LIs.css('white-space','nowrap').css('float');
        // remove width restrictions and floats so elements remain vertically stacked
        var emWidth = $ul.add($LIs).add($As).css({
          'float' : 'none',
          'width'  : 'auto'
        })
        // this ul will now be shrink-wrapped to longest li due to position:absolute
        // so save its width as ems. Clientwidth is 2 times faster than .width() - thanks Dan Switzer
        .end().end()[0].clientWidth / fontsize;
        // add more width to ensure lines don't turn over at certain sizes in various browsers
        emWidth += o.extraWidth;
        // restrict to at least minWidth and at most maxWidth
        if (emWidth > o.maxWidth)    { emWidth = o.maxWidth; }
        else if (emWidth < o.minWidth)  { emWidth = o.minWidth; }
        emWidth += 'em';
        // set ul to width in ems
        $ul.css('width',emWidth);
        // restore li floats to avoid IE bugs
        // set li width to full width of this ul
        // revert white-space to normal
        $LIs.css({
          'float' : liFloat,
          'width' : '100%',
          'white-space' : 'normal'
        })
        // update offset position of descendant ul to reflect new width of parent
        .each(function(){
          var $childUl = $('>ul',this);
          var offsetDirection = $childUl.css('left')!==undefined ? 'left' : 'right';
          $childUl.css(offsetDirection,emWidth);
        });
      });
    });
  };
  // expose defaults
  $.fn.supersubs.defaults = {
    minWidth: 9, // requires em unit.
    maxWidth: 25, // requires em unit.
    extraWidth: 0 // extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
  };
})(jQuery); // plugin code ends;
/*
 * Supposition v0.2 - an optional enhancer for Superfish jQuery menu widget.
 *
 * Copyright (c) 2008 Joel Birch - based mostly on work by Jesse Klaasse and credit goes largely to him.
 * Special thanks to Karl Swedberg for valuable input.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */
/*
 * This is not the original jQuery Supersubs plugin.
 * Please refer to the README for more information.
 */

(function($){
  $.fn.supposition = function(){
    var $w = $(window), /*do this once instead of every onBeforeShow call*/
    _offset = function(dir) {
      return window[dir == 'y' ? 'pageYOffset' : 'pageXOffset']
      || document.documentElement && document.documentElement[dir=='y' ? 'scrollTop' : 'scrollLeft']
      || document.body[dir=='y' ? 'scrollTop' : 'scrollLeft'];
    },
    onHide = function(){
      this.css({bottom:''});
    },
    onBeforeShow = function(){
      this.each(function(){
        var $u = $(this);
        $u.css('display','block');
        var menuWidth = $u.width(),
        menuParentWidth = $u.closest('li').outerWidth(true),
        menuParentLeft = $u.closest('li').offset().left,
        totalRight = $w.width() + _offset('x'),
        menuRight = $u.offset().left + menuWidth,
        exactMenuWidth = (menuRight > (menuParentWidth + menuParentLeft)) ? menuWidth - (menuRight - (menuParentWidth + menuParentLeft)) : menuWidth;  
        if ($u.parents('.sf-js-enabled').hasClass('rtl')) {
          if (menuParentLeft < exactMenuWidth) {
            $u.css('left', menuParentWidth + 'px');
            $u.css('right', 'auto');
          }
        }
        else {
          if (menuRight > totalRight && menuParentLeft > menuWidth) {
            $u.css('right', menuParentWidth + 'px');
            $u.css('left', 'auto');
          }
        }
        var windowHeight = $w.height(),
        offsetTop = $u.offset().top,
        menuParentShadow = ($u.closest('.sf-menu').hasClass('sf-shadow') && $u.css('padding-bottom').length > 0) ? parseInt($u.css('padding-bottom').slice(0,-2)) : 0,
        menuParentHeight = ($u.closest('.sf-menu').hasClass('sf-vertical')) ? '-' + menuParentShadow : $u.parent().outerHeight(true) - menuParentShadow,
        menuHeight = $u.height(),
        baseline = windowHeight + _offset('y');
        var expandUp = ((offsetTop + menuHeight > baseline) && (offsetTop > menuHeight));
        if (expandUp) {
          $u.css('bottom', menuParentHeight + 'px');
          $u.css('top', 'auto');
        }
        $u.css('display','none');
      });
    };

    return this.each(function() {
      var o = $.fn.superfish.o[this.serial]; /* get this menu's options */

      /* if callbacks already set, store them */
      var _onBeforeShow = o.onBeforeShow,
      _onHide = o.onHide;

      $.extend($.fn.superfish.o[this.serial],{
        onBeforeShow: function() {
          onBeforeShow.call(this); /* fire our Supposition callback */
          _onBeforeShow.call(this); /* fire stored callbacks */
        },
        onHide: function() {
          onHide.call(this); /* fire our Supposition callback */
          _onHide.call(this); /* fire stored callbacks */
        }
      });
    });
  };
})(jQuery);;
/*
 * sf-Touchscreen v1.0b - Provides touchscreen compatibility for the jQuery Superfish plugin.
 *
 * Developer's note:
 * Built as a part of the Superfish project for Drupal (http://drupal.org/project/superfish) 
 * Found any bug? have any cool ideas? contact me right away! http://drupal.org/user/619294/contact
 *
 * jQuery version: 1.3.x or higher.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */

(function($){
  $.fn.sftouchscreen = function() {
    // Return original object to support chaining.
    return this.each( function() {
      // Select hyperlinks from parent menu items.
      $(this).find('li > ul').closest('li').children('a').each( function() {
        var $item = $(this);
        // No .toggle() here as it's not possible to reset it.
        $item.click( function(event){
          // Already clicked? proceed to the URI.
          if ($item.hasClass('sf-clicked')) {
            var $uri = $item.attr('href');
            window.location = $uri;
          }
          else {
            event.preventDefault();
            $item.addClass('sf-clicked');
          }
        }).closest('li').mouseleave( function(){
          // So, we reset everything.
          $item.removeClass('sf-clicked');
        });
      });
    });
  };
})(jQuery);;
(function ($) {

  /**
   * @todo Undocumented Code!
   */
  $.extend({
    getUrlVars: function () {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    },
    getUrlVar: function (name) {
      return $.getUrlVars()[name];
    }
  });

  Drupal.gigya = Drupal.gigya || {};

  /**
   * @todo Undocumented Code!
   */
  Drupal.gigya.logoutResponse = function (response) {
    if (response['status'] == 'OK') {
      document.getElementById('logoutMessage').innerHTML = "Successfully logged out, redirecting";
      window.location = Drupal.settings.gigya.logoutLocation;
    }
  };

  /**
   * @todo Undocumented Code!
   */
  Drupal.gigya.loginCallback = function (response) {
    urlObj = {'signature':response['UIDSignature'], 'timestamp':response['signatureTimestamp'], 'UID':response['UID'], 'email': response.user.email};
    if(response['provider'] != 'site' && Drupal.settings.gigya.loginDestination != undefined){
      var query = $.param(urlObj, true);
      window.location = Drupal.settings.gigya.loginDestination + '?' + query;
    }
  };

  /**
   * Callback for the getUserInfo function.
   *
   * Takes the getUserInfo object and renders the HTML to display an array
   * of the user object
   *
   * TODO: probably should be removed in production, since its just for dumping
   * user output.
   */
  Drupal.gigya.getUserInfoCallback = function (response) {
    if (response.status == 'OK') {
      var user = response['user'];
      // Variable which will hold property values.
      var str="<pre>";
      for (prop in user) {
        if (prop == 'birthYear' && user[prop] == 2009) {
          user[prop] = '';
        }
        if (prop == 'identities') {
          for (ident in user[prop]) {
            for (provide in user[prop][ident]) {
             str+=provide + " SUBvalue :"+ user[prop][ident][provide]+"\n";
            }
          }
        }
        // Concate prop and its value from object.
        str+=prop + " value :"+ user[prop]+"\n";
      }
      str+="</pre>";

      document.getElementById('userinfo').innerHTML = str;
    }
  };

  /**
   * @todo Undocumented Code!
   */
  Drupal.gigya.showAddConnectionsUI = function (connectUIParams) {
    gigya.services.socialize.showAddConnectionsUI(connectUIParams);
  };

  /**
   * @todo Undocumented Code!
   */
  Drupal.gigya.notifyLoginCallback = function (response) {
    if (response['status'] == 'OK') {
      setTimeout("$.get(Drupal.settings.basePath + 'socialize-ajax/notify-login')", 1000);
    }
  };


  /**
   * @todo Undocumented Code!
   */
  Drupal.gigya.initResponse = function (response) {
    if (null != response.user) {
      if (response.user.UID != Drupal.settings.gigya.notifyLoginParams.siteUID || !response.user.isLoggedIn) {
        gigya.services.socialize.notifyLogin(Drupal.settings.gigya.notifyLoginParams);
      }
    }
  }

})(jQuery);

;
(function ($) {
/**
 * @todo Undocumented Code!
 */
Drupal.behaviors.gigyaNotifyFriends = {
  attach: function(context, settings) {
    $('.friends-ui:not(.gigyaNotifyFriends-processed)', context).addClass('gigyaNotifyFriends-processed').each(
      function () {
        gigya.services.socialize.getUserInfo({callback:Drupal.gigya.notifyFriendsCallback});
        gigya.services.socialize.addEventHandlers({ onConnect:Drupal.gigya.notifyFriendsCallback, onDisconnect:Drupal.gigya.notifyFriendsCallback});
      }
    );
  }
};

/**
 * @todo Undocumented Code!
 */
Drupal.behaviors.gigyaInit = {
  attach: function(context, settings) {
    if (typeof Drupal.settings.gigya.notifyLoginParams !== 'undefined') {
      Drupal.settings.gigya.notifyLoginParams.callback = Drupal.gigya.notifyLoginCallback;
      gigya.services.socialize.getUserInfo({callback: Drupal.gigya.initResponse});
    }

    // Attach event handlers.
    gigya.services.socialize.addEventHandlers({onLogin:Drupal.gigya.loginCallback});

    // Display LoginUI if necessary.
    if (typeof Drupal.settings.gigya.loginUIParams !== 'undefined') {
      $.each(Drupal.settings.gigya.loginUIParams, function (index, value) {
        gigya.services.socialize.showLoginUI(value);
      });
    }

    // Display ConnectUI if necessary.
    if (typeof Drupal.settings.gigya.connectUIParams !== 'undefined') {
      gigya.services.socialize.showAddConnectionsUI(Drupal.settings.gigya.connectUIParams);
    }

    // Call ShareUI if it exists.
      if (typeof Drupal.settings.gigya.shareUIParams !== 'undefined') {
      //build a media object
      var mediaObj = {type: 'image', href: Drupal.settings.gigya.shareUIParams.linkBack};
      if ((Drupal.settings.gigya.shareUIParams.imageBhev === 'url') && (Drupal.settings.gigya.shareUIParams.imageUrl !== '')) {
         mediaObj.src = Drupal.settings.gigya.shareUIParams.imageUrl;
      }
      else if (Drupal.settings.gigya.shareUIParams.imageBhev === 'default') {
        if ($('meta[property=og:image]').length > 0) {
          mediaObj.src = $('meta[property=og:image]').attr('content');
        }
        else {
          mediaObj.src = $('#block-system-main img').eq(0).attr('src') || $('img').eq(0).attr('src');
        }
      }
      else {
        mediaObj.src = $('#block-system-main img').eq(0).attr('src') || $('img').eq(0).attr('src');
      }
      // Step 1: Construct a UserAction object and fill it with data.
      var ua = new gigya.services.socialize.UserAction();
      ua.setLinkBack(Drupal.settings.gigya.shareUIParams.linkBack);
      ua.setTitle(Drupal.settings.gigya.shareUIParams.title);
      ua.setDescription(Drupal.settings.gigya.shareUIParams.description);
      ua.addMediaItem(mediaObj);
      var params = {};
      if (typeof Drupal.settings.gigya.shareUIParams.extraParams !== 'undefined') {
        params = Drupal.settings.gigya.shareUIParams.extraParams;
      }
      params.userAction = ua;
      gigya.services.socialize.showShareUI(params);
      }
  }
};

/**
 * @todo Undocumented Code!
 */
Drupal.gigya.logout = function () {
  document.location.href = Drupal.settings.gigya.gigyaLogOutDest;
};

/**
 * @todo Undocumented Code!
 */
Drupal.behaviors.gigyaLogut = {
  attach: function (context, settings) {
    if (Drupal.settings.gigya.gigyaLogOutDest !== undefined) {
      gigya.services.socialize.logout({callback: Drupal.gigya.logout()});
      }
    }
};

})(jQuery);

;
(function ($) {

$(document).ready(function() {

  // Expression to check for absolute internal links.
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");

  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      var ga = Drupal.settings.googleanalytics;
      // Expression to check for special links like gotwo.module /go/* links.
      var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
      // Expression to check for download links.
      var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox')) {
          // Do nothing here. The custom event will handle all tracking.
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (ga.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (ga.trackDomainMode == 2 && isCrossDomain($(this).attr('hostname'), ga.trackCrossDomains)) {
            // Top-level cross domain clicked. document.location is handled by _link internally.
            event.preventDefault();
            _gaq.push(["_link", this.href]);
          }
          else {
            // External link clicked.
            _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
          }
        }
      }
    });
  });

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  $(document).bind("cbox_complete", function() {
    var href = $.colorbox.element().attr("href");
    if (href) {
      _gaq.push(["_trackPageview", href.replace(isInternal, '')]);
    }
  });

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
function isCrossDomain(hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
}

})(jQuery);
;
/**
 * writeCapture.js v1.0.5
 *
 * @author noah <noah.sloan@gmail.com>
 * 
 */
(function($,global) {
	var doc = global.document;
	function doEvil(code) {
		var div = doc.createElement('div');
		doc.body.insertBefore(div,null);
		$.replaceWith(div,'<script type="text/javascript">'+code+'</script>');
	}
	// ensure we have our support functions
	$ = $ || (function(jQuery) {
		/**
		 * @name writeCaptureSupport
		 *
		 * The support functions writeCapture needs.
		 */		
		return {
			/**
			 * Takes an options parameter that must support the following:
			 * {
			 * 	url: url,
			 * 	type: 'GET', // all requests are GET
			 * 	dataType: "script", // it this is set to script, script tag injection is expected, otherwise, treat as plain text
			 * 	async: true/false, // local scripts are loaded synchronously by default
			 * 	success: callback(text,status), // must not pass a truthy 3rd parameter
			 * 	error: callback(xhr,status,error) // must pass truthy 3rd parameter to indicate error
			 * }
			 */
			ajax: jQuery.ajax,
			/**
			 * @param {String Element} selector an Element or selector
			 * @return {Element} the first element matching selector
			 */
			$: function(s) { return jQuery(s)[0]; },
			/**
			 * @param {String jQuery Element} selector the element to replace.
			 * writeCapture only needs the first matched element to be replaced.
			 * @param {String} content the content to replace 
			 * the matched element with. script tags must be evaluated/loaded 
			 * and executed if present.
			 */
			replaceWith: function(selector,content) {
				// jQuery 1.4? has a bug in replaceWith so we can't use it directly
				var el = jQuery(selector)[0];
				var next = el.nextSibling, parent = el.parentNode;

				jQuery(el).remove();

				if ( next ) {
					jQuery(next).before( content );
				} else {
					jQuery(parent).append( content );
				}
			},

			onLoad: function(fn) {
				jQuery(fn);
			},
			
			copyAttrs: function(src,dest) {
				var el = jQuery(dest), attrs = src.attributes;
				for (var i = 0, len = attrs.length; i < len; i++) {
					if(attrs[i] && attrs[i].value) {
						try {
							el.attr(attrs[i].name,attrs[i].value);
						} catch(e) { }
					}
				}
			}
		};
	})(global.jQuery);

	$.copyAttrs = $.copyAttrs || function() {};
	$.onLoad = $.onLoad || function() {
		throw "error: autoAsync cannot be used without jQuery " +
			"or defining writeCaptureSupport.onLoad";
	};

	// utilities
	function each(array,fn) {
		for(var i =0, len = array.length; i < len; i++) { 
			if( fn(array[i]) === false) return; 
		}
	}	
	function isFunction(o) {
		return Object.prototype.toString.call(o) === "[object Function]";
	}
	function isString(o) {
		return Object.prototype.toString.call(o) === "[object String]";
	}	
	function slice(array,start,end) {
		return Array.prototype.slice.call(array,start || 0,end || array && array.length);		
	}
	function any(array,fn) {
		var result = false;
		each(array,check);
		function check(it) {
			return !(result = fn(it));
		}
		return result;
	}
	
	function SubQ(parent) {
		this._queue = [];
		this._children = [];
		this._parent = parent;
		if(parent) parent._addChild(this);
	}
	
	SubQ.prototype = {
		_addChild: function(q) {
			this._children.push(q);
		},
		push: function (task) {
			this._queue.push(task);
			this._bubble('_doRun');
		},
		pause: function() {
			this._bubble('_doPause');
		},
		resume: function() {
			this._bubble('_doResume');
		},
		_bubble: function(name) {
			var root = this;
			while(!root[name]) {
				root = root._parent;
			}
			return root[name]();
		},
		_next: function() {
			if(any(this._children,runNext)) return true;
			function runNext(c) {
				return c._next();
			}
			var task = this._queue.shift();
			if(task) {
				task();
			}
			return !!task;
		}
	};
	
	/**
	 * Provides a task queue for ensuring that scripts are run in order.
	 *
	 * The only public methods are push, pause and resume.
	 */
	function Q(parent) {
		if(parent) {
			return new SubQ(parent);
		}
		SubQ.call(this);
		this.paused = 0;
	}
	
	Q.prototype = (function() {
		function f() {}
		f.prototype = SubQ.prototype;
		return new f();
	})();
	
	Q.prototype._doRun = function() {
		if(!this.running) {
			this.running = true;
			try {
				// just in case there is a bug, always resume 
				// if paused is less than 1
				while(this.paused < 1 && this._next()){}
			} finally {
				this.running = false;
			}
		}
	};
	Q.prototype._doPause= function() {
		this.paused++;
	};
	Q.prototype._doResume = function() {
		this.paused--;
		this._doRun();
	};
	
	// TODO unit tests...
	function MockDocument() { }
	MockDocument.prototype = {
		_html: '',
		open: function( ) { 
			this._opened = true;
			if(this._delegate) {
				this._delegate.open();
			}
		},
		write: function(s) { 
			if(this._closed) return; 
			this._written = true;
			if(this._delegate) {
				this._delegate.write(s);
			} else {
				this._html += s;
			}
		}, 
		writeln: function(s) { 
			this.write(s + '\n');
		}, 
		close: function( ) { 
			this._closed = true;
			if(this._delegate) {
				this._delegate.close();
			}
		}, 
		copyTo: function(d) { 
			this._delegate = d;
			d.foobar = true;
			if(this._opened) {
				d.open();
			}
			if(this._written) {
				d.write(this._html); 
			}
			if(this._closed) {
				d.close();
			}
		}
	};
	
	// test for IE 6/7 issue (issue 6) that prevents us from using call
	var canCall = (function() {
		var f = { f: doc.getElementById };
		try {
			f.f.call(doc,'abc');
			return true;
		} catch(e) {
			return false;
		}
	})();
	
	function unProxy(elements) {
		each(elements,function(it) {
			var real = doc.getElementById(it.id);
			if(!real) {
				logError('<proxyGetElementById - finish>',
					'no element in writen markup with id ' + it.id);
				return;
			}

			each(it.el.childNodes,function(it) {
				real.appendChild(it);
			});

			if(real.contentWindow) {
				// TODO why is the setTimeout necessary?
				global.setTimeout(function() {
					it.el.contentWindow.document.
						copyTo(real.contentWindow.document);
				},1);
			}
			$.copyAttrs(it.el,real);
		});
	}
	
	function getOption(name,options) {
		if(options && options[name] === false) {
			return false;
		}
		return options && options[name] || self[name];
	}
	
	function capture(context,options) {
		var tempEls = [],
			proxy = getOption('proxyGetElementById',options),
			forceLast = getOption('forceLastScriptTag',options),
			writeOnGet = getOption('writeOnGetElementById',options),
			immediate = getOption('immediateWrites', options),
			state = {
				write: doc.write,
				writeln: doc.writeln,
				finish: function() {},
				out: ''
			};
		context.state = state;
		doc.write = immediate ? immediateWrite : replacementWrite;
		doc.writeln = immediate ? immediateWriteln : replacementWriteln;
		if(proxy || writeOnGet) {
			state.getEl = doc.getElementById;
			doc.getElementById = getEl;
			if(writeOnGet) {
				findEl = writeThenGet;
			} else {
				findEl = makeTemp;
				state.finish = function() {
					unProxy(tempEls);
				};
			}
		}
		if(forceLast) {
			state.getByTag = doc.getElementsByTagName;
			doc.getElementsByTagName = function(name) {
				var result = slice(canCall ? state.getByTag.call(doc,name) :
					state.getByTag(name));				
				if(name === 'script') {
					result.push( $.$(context.target) );
				}
				return result;
			};
			var f = state.finish;
			state.finish = function() {
				f();
				doc.getElementsByTagName = state.getByTag;
			};
		}
		function replacementWrite(s) {
			state.out +=  s;
		}
		function replacementWriteln(s) {
			state.out +=  s + '\n';
		}
		function immediateWrite(s) {
			var target = $.$(context.target);
			var div = doc.createElement('div');
			target.parentNode.insertBefore(div,target);
			$.replaceWith(div,sanitize(s));
		}
		function immediateWriteln(s) {
			var target = $.$(context.target);
			var div = doc.createElement('div');
			target.parentNode.insertBefore(div,target);
			$.replaceWith(div,sanitize(s) + '\n');
		}
		function makeTemp(id) {
			var t = doc.createElement('div');
			tempEls.push({id:id,el:t});
			// mock contentWindow in case it's supposed to be an iframe
			t.contentWindow = { document: new MockDocument() };
			return t;
		}
		function writeThenGet(id) {
			var target = $.$(context.target);
			var div = doc.createElement('div');
			target.parentNode.insertBefore(div,target);
			$.replaceWith(div,state.out);
			state.out = '';
			return canCall ? state.getEl.call(doc,id) : 
				state.getEl(id);
		}
		function getEl(id) {
			var result = canCall ? state.getEl.call(doc,id) : 
				state.getEl(id);
			return result || findEl(id);
		}
		return state;
	}
	function uncapture(state) {
		doc.write = state.write;
		doc.writeln = state.writeln;
		if(state.getEl) {
			doc.getElementById = state.getEl;
		}
		return state.out;
	}
	
	function clean(code) {
		// IE will execute inline scripts with <!-- (uncommented) on the first
		// line, but will not eval() them happily
		return code && code.replace(/^\s*<!(\[CDATA\[|--)/,'').replace(/(\]\]|--)>\s*$/,'');
	}
	
	function ignore() {}
	function doLog(code,error) {
		console.error("Error",error,"executing code:",code);
	}
	
	var logError = isFunction(global.console && console.error) ? 
			doLog : ignore;
	
	function captureWrite(code,context,options) {
		var state = capture(context,options);
		try {
			doEvil(clean(code));
		} catch(e) {
			logError(code,e);
		} finally {
			uncapture(state);
		}
		return state;
	}
	
	// copied from jQuery
	function isXDomain(src) {
		var parts = /^(\w+:)?\/\/([^\/?#]+)/.exec(src);
		return parts && ( parts[1] && parts[1] != location.protocol || parts[2] != location.host );
	}
	
	function attrPattern(name) {
		return new RegExp('\\b'+name+'[\\s\\r\\n]*=[\\s\\r\\n]*(?:(["\'])([\\s\\S]*?)\\1|([^\\s>]+))','i');
	}
	
	function matchAttr(name) {
		var regex = attrPattern(name);
		return function(tag) {
			var match = regex.exec(tag) || [];
			return match[2] || match[3];
		};
	}

	var SCRIPT_TAGS = /(<script[^>]*>)([\s\S]*?)<\/script>/ig, 
		SCRIPT_2 = /<script[^>]*\/>/ig,
		SRC_REGEX = attrPattern('src'),
		SRC_ATTR = matchAttr('src'),
		TYPE_ATTR = matchAttr('type'),
		LANG_ATTR = matchAttr('language'),
		GLOBAL = "__document_write_ajax_callbacks__",
		DIV_PREFIX = "__document_write_ajax_div-",
		TEMPLATE = "window['"+GLOBAL+"']['%d']();",
		callbacks = global[GLOBAL] = {},
		TEMPLATE_TAG = '<script type="text/javascript">' + TEMPLATE + '</script>',
		global_id = 0;
	function nextId() {
		return (++global_id).toString();
	}
	
	function normalizeOptions(options,callback) {
		var done;
		if(isFunction(options)) {
			done = options;
			options = null;
		}
		options = options || {};
		done = done || options && options.done;
		options.done = callback ? function() {
			callback(done);
		} : done;
		return options;
	}
	
	// The global Q synchronizes all sanitize operations. 
	// The only time this synchronization is really necessary is when two or 
	// more consecutive sanitize operations make async requests. e.g.,
	// sanitize call A requests foo, then sanitize B is called and bar is 
	// requested. document.write was replaced by B, so if A returns first, the 
	// content will be captured by B, then when B returns, document.write will
	// be the original document.write, probably messing up the page. At the 
	// very least, A will get nothing and B will get the wrong content.
	var GLOBAL_Q = new Q();
	
	var debug = [];
	var logDebug = window._debugWriteCapture ? function() {} :
		function (type,src,data) {
		    debug.push({type:type,src:src,data:data});
		};

	var logString = window._debugWriteCapture ? function() {} :
		function () {
			debug.push(arguments);
		};

	function newCallback(fn) {
		var id = nextId();
		callbacks[id] = function() {
			fn();
			delete callbacks[id];
		};
		return id;
	}
	
	function newCallbackTag(fn) {			
		return TEMPLATE_TAG.replace(/%d/,newCallback(fn));
	}	

	/**
	 * Sanitize the given HTML so that the scripts will execute with a modified
	 * document.write that will capture the output and append it in the 
	 * appropriate location.  
	 * 
	 * @param {String} html
	 * @param {Object Function} [options]
	 * @param {Function} [options.done] Called when all the scripts in the 
	 * sanitized HTML have run.
	 * @param {boolean} [options.asyncAll] If true, scripts loaded from the
	 * same domain will be loaded asynchronously. This can improve UI 
	 * responsiveness, but will delay completion of the scripts and may
	 * cause problems with some scripts, so it defaults to false.
	 */
	function sanitize(html,options,parentQ,parentContext) {
		// each HTML fragment has it's own queue
		var queue = parentQ && new Q(parentQ) || GLOBAL_Q;
		options = normalizeOptions(options);
		var done = getOption('done',options);
		var doneHtml = '';
		
		var fixUrls = getOption('fixUrls',options);
		if(!isFunction(fixUrls)) {
			fixUrls = function(src) { return src; };
		}
		
		// if a done callback is passed, append a script to call it
		if(isFunction(done)) {
			// no need to proxy the call to done, so we can append this to the 
			// filtered HTML
			doneHtml = newCallbackTag(function() {
				queue.push(done);
			});
		}
		// for each tag, generate a function to load and eval the code and queue
		// themselves
		return html.replace(SCRIPT_TAGS,proxyTag).replace(SCRIPT_2,proxyBodyless) + doneHtml;
		function proxyBodyless(tag) {
			// hack in a bodyless tag...
			return proxyTag(tag,tag.substring(0,tag.length-2)+'>','');
		}
		function proxyTag(element,openTag,code) {
			var src = SRC_ATTR(openTag),
				type = TYPE_ATTR(openTag) || '',
				lang = LANG_ATTR(openTag) || '',
				isJs = (!type && !lang) || // no type or lang assumes JS
					type.toLowerCase().indexOf('javascript') !== -1 || 
					lang.toLowerCase().indexOf('javascript') !== -1;
			
			logDebug('replace',src,element);
			
			if(!isJs) {
			    return element;
			}
			
			var id = newCallback(queueScript), divId = DIV_PREFIX + id,
				run, context = { target: '#' + divId, parent: parentContext };
			
			function queueScript() {
				queue.push(run);
			}
			
			if(src) {
				// fix for the inline script that writes a script tag with encoded 
				// ampersands hack (more comon than you'd think)
				src = fixUrls(src);
								
				openTag = openTag.replace(SRC_REGEX,'');
				if(isXDomain(src)) {
					// will load async via script tag injection (eval()'d on
					// it's own)
					run = loadXDomain;
				} else {
					// can be loaded then eval()d
					if(getOption('asyncAll',options)) {
						run = loadAsync();
					} else {
						run = loadSync;
					}
				}
			} else {
				// just eval code and be done
				run = runInline;
				                  
			}
			function runInline() {
				captureHtml(code);
			}
			function loadSync() {
				$.ajax({
					url: src,
					type: 'GET',
					dataType: 'text',
					async: false,
					success: function(html) {
						captureHtml(html);
					}	
				});
			}
			function logAjaxError(xhr,status,error) {
				logError("<XHR for "+src+">",error);
				queue.resume();
			}
			function setupResume() {
				return newCallbackTag(function() {
					queue.resume();
				});
			}
			function loadAsync() {
				var ready, scriptText;
				function captureAndResume(script,status) {
					if(!ready) {
						// loaded before queue run, cache text
						scriptText = script;
						return;
					}
					try {
						captureHtml(script, setupResume());
					} catch(e) {
						logError(script,e);
					}
				}
				// start loading the text
				$.ajax({
					url: src,
					type: 'GET',
					dataType: 'text',
					async: true,
					success: captureAndResume,
					error: logAjaxError
				});				
				return function() {
					ready = true;
					if(scriptText) {
						// already loaded, so don't pause the queue and don't resume!
						captureHtml(scriptText);
					} else {
						queue.pause();	
					}
				};
			}
			function loadXDomain(cb) {
				var state = capture(context,options);
				queue.pause(); // pause the queue while the script loads
				logDebug('pause',src);
				
				doXDomainLoad(context.target,src,captureAndResume);		

				function captureAndResume(xhr,st,error) {
					logDebug('out', src, state.out);
					html(uncapture(state), 
						newCallbackTag(state.finish) + setupResume());
					logDebug('resume',src);
				}
			}
			function captureHtml(script, cb) {
				var state = captureWrite(script,context,options);
				cb = newCallbackTag(state.finish) + (cb || '');
				html(state.out,cb);
			}
			function safeOpts(options) {
				var copy = {};
				for(var i in options) {
					if(options.hasOwnProperty(i)) {
						copy[i] = options[i];
					}
				}
				delete copy.done;
				return copy;
			}
			function html(markup,cb) {
			 	$.replaceWith(context.target,sanitize(markup,safeOpts(options),queue,context) + (cb || ''));
			} 
			return '<div style="display: none" id="'+divId+'"></div>' + openTag +
				TEMPLATE.replace(/%d/,id) + '</script>';
		}
	}
    
    function doXDomainLoad(target,url,success) {
    	// TODO what about scripts that fail to load? bad url, etc.?
		var script = document.createElement("script");
		script.src = url;

		target = $.$(target);

		var done = false, parent = target.parentNode;

		// Attach handlers for all browsers
		script.onload = script.onreadystatechange = function(){
			if ( !done && (!this.readyState ||
					this.readyState == "loaded" || this.readyState == "complete") ) {
				done = true;
				success();

				// Handle memory leak in IE
				script.onload = script.onreadystatechange = null;
				parent.removeChild( script );
			}
		};		
		
		parent.insertBefore(script,target);        
    }	
	
	/**
	 * Sanitizes all the given fragments and calls action with the HTML.
	 * The next fragment is not started until the previous fragment
	 * has executed completely.
	 * 
	 * @param {Array} fragments array of objects like this:
	 * {
	 *   html: '<p>My html with a <script...',
	 *   action: function(safeHtml,frag) { doSomethingToInject(safeHtml); },
	 *   options: {} // optional, see #sanitize
	 * }
	 * Where frag is the object.
	 * 
	 * @param {Function} [done] Optional. Called when all fragments are done.
	 */
	function sanitizeSerial(fragments,done) {
		// create a queue for these fragments and make it the parent of each 
		// sanitize call
		var queue = GLOBAL_Q;
		each(fragments, function (f) {
			queue.push(run);
			function run() {
				f.action(sanitize(f.html,f.options,queue),f);
			}
		});
		if(done) {
			queue.push(done);		
		}
	}
	
	function findLastChild(el) {
		var n = el;
		while(n && n.nodeType === 1) {
			el = n;
			n = n.lastChild;
			// last child may not be an element
			while(n && n.nodeType !== 1) {
				n = n.previousSibling;
			}
		}
		return el;
	}
		
	/**
	  * Experimental - automatically captures document.write calls and 
	  * defers them untill after page load.
	  * @param {Function} [done] optional callback for when all the 
	  * captured content has been loaded.
	  */
	function autoCapture(done) {
		var write = doc.write, 
			writeln = doc.writeln,
			currentScript,
			autoQ = [];
		doc.writeln = function(s) {
			doc.write(s+'\n');
		};
		var state;
		doc.write = function(s) {
			var scriptEl = findLastChild(doc.body);
			if(scriptEl !== currentScript) {
				currentScript = scriptEl;
				autoQ.push(state = {
					el: scriptEl,
					out: []
				});					
			}
			state.out.push(s);
		};
		$.onLoad(function() {			
			// for each script, append a div immediately after it, 
			// then replace the div with the sanitized output
			var el, div, out, safe, doneFn;
			done = normalizeOptions(done);
			doneFn = done.done;
			done.done = function() {
				doc.write = write;
				doc.writeln = writeln;
				if(doneFn) doneFn();				
			};
			for(var i = 0, len = autoQ.length; i < len; i++ ) {
				el = autoQ[i].el;
				div = doc.createElement('div');
				el.parentNode.insertBefore( div, el.nextSibling );
				out = autoQ[i].out.join('');
				// only the last snippet gets passed the callback
				safe = len - i === 1 ? sanitize(out,done) : sanitize(out);
				$.replaceWith(div,safe);
			}
		});
	}
	
	function extsrc(cb) {
		var scripts = document.getElementsByTagName('script'),
			s,o, html, q, ext, async, doneCount = 0,
			done = cb ? newCallbackTag(function() {
				if(++doneCount >= exts.length) {
					cb();
				}
			}) : '',
			exts = [];
			
		for(var i = 0, len = scripts.length; i < len; i++) {
			s = scripts[i];
			ext = s.getAttribute('extsrc');
			async = s.getAttribute('asyncsrc');
			if(ext || async) {
				exts.push({ext:ext,async:async,s:s});
			}
		}

		for(i = 0, len = exts.length; i < len; i++) {
			o = exts[i];
			if(o.ext) {
				html = '<script type="text/javascript" src="'+o.ext+'"> </script>';
				$.replaceWith(o.s,sanitize(html) + done);				
			} else if(o.async) {
				html = '<script type="text/javascript" src="'+o.async+'"> </script>';
				$.replaceWith(o.s,sanitize(html,{asyncAll:true}, new Q()) + done);
			}
		}
	}
	
	var name = 'writeCapture';
	var self = global[name] = {
		_original: global[name],
		support: $,
		/**
		 */
		fixUrls: function(src) {
		    return src.replace(/&amp;/g,'&');
		},
		noConflict: function() {
			global[name] = this._original;
			return this;
		},
		debug: debug,
		/**
		 * Enables a fun little hack that replaces document.getElementById and
		 * creates temporary elements for the calling code to use.
		 */
		proxyGetElementById: false,
		// this is only for testing, please don't use these
		_forTest: {
			Q: Q,
			GLOBAL_Q: GLOBAL_Q,
			$: $,
			matchAttr: matchAttr,
			slice: slice,
			capture: capture,
			uncapture: uncapture,
			captureWrite: captureWrite
		},
		replaceWith: function(selector,content,options) {
			$.replaceWith(selector,sanitize(content,options));
		},
		html: function(selector,content,options) {
			var el = $.$(selector);
			el.innerHTML ='<span/>';
			$.replaceWith(el.firstChild,sanitize(content,options));
		},	
		load: function(selector,url,options) {
			$.ajax({
				url: url,
				dataType: 'text',
				type: "GET",
				success: function(content) {
					self.html(selector,content,options);
				}
			});
		},
		extsrc: extsrc,
		autoAsync: autoCapture,
		sanitize: sanitize,
		sanitizeSerial: sanitizeSerial
	};
	
})(this.writeCaptureSupport,this);;
/**
 * jquery.writeCapture.js 
 * 
 * Note that this file only provides the jQuery plugin functionality, you still
 * need writeCapture.js. The compressed version will contain both as as single
 * file.
 *
 * @author noah <noah.sloan@gmail.com>
 * 
 */
(function($,wc,noop) {
	// methods that take HTML content (according to API)
	var methods = {
		html: html
	};
	// TODO wrap domManip instead?
	$.each(['append', 'prepend', 'after', 'before', 'wrap', 'wrapAll', 'replaceWith',
		'wrapInner'],function() { methods[this] = makeMethod(this); });
	
	function isString(s) {
		return Object.prototype.toString.call(s) == "[object String]";
	}
	
	function executeMethod(method,content,options,cb) {
		if(arguments.length == 0) return proxyMethods.call(this);
		
		var m = methods[method];
		if(method == 'load') {
			return load.call(this,content,options,cb);
		}
		if(!m) error(method);
		return doEach.call(this,content,options,m);
	}
	
	$.fn.writeCapture = executeMethod;
	
	var PROXIED = '__writeCaptureJsProxied-fghebd__';
	// inherit from the jQuery instance, proxying the HTML injection methods
	// so that the HTML is sanitized
	function proxyMethods() {
		if(this[PROXIED]) return this;
		
		var jq = this;
		function F() {
			var _this = this, sanitizing = false;
			this[PROXIED] = true;
			$.each(methods,function(method) {
				var _super = jq[method];
				if(!_super) return;
				_this[method] = function(content,options,cb) {
					// if it's unsanitized HTML, proxy it
					if(!sanitizing && isString(content)) {
						try {
							sanitizing = true;
							return executeMethod.call(_this,method,content,
								options,cb);
						} finally {
							sanitizing = false;
						}
					} 
					return _super.apply(_this,arguments); // else delegate
				};
			});
			// wrap pushStack so that the new jQuery instance is also wrapped
			this.pushStack = function() {
				return proxyMethods.call(jq.pushStack.apply(_this,arguments));
			};
			this.endCapture = function() { return jq; };
		}
		F.prototype = jq;
		return new F();
	}
	
	function doEach(content,options,action) {
		var done, self = this;
		if(options && options.done) {
			done = options.done;
			delete options.done;
		} else if($.isFunction(options)) {
			done = options;
			options = null;
		}
		wc.sanitizeSerial($.map(this,function(el) {
			return {
				html: content,
				options: options,
				action: function(text) {
					action.call(el,text);
				}
			};
		}),done && function() { done.call(self); } || done);
		return this;
	}
	
	
	function html(safe) {
		$(this).html(safe);
	}
	
	function makeMethod(method) {
		return function(safe) {
			$(this)[method](safe);
		};
	}
	
	function load(url,options,callback) {
		var self = this,  selector, off = url.indexOf(' ');
		if ( off >= 0 ) {
			selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}
		if($.isFunction(callback)) {
			options = options || {};
			options.done = callback;
		}
		return $.ajax({
			url: url,
			type:  options && options.type || "GET",
			dataType: "html",
			data: options && options.params,
			complete: loadCallback(self,options,selector)
		});
	}
	
	function loadCallback(self,options,selector) {
		return function(res,status) {
			if ( status == "success" || status == "notmodified" ) {
				var text = getText(res.responseText,selector);
				doEach.call(self,text,options,html);
			}
		};
	}
	
	var PLACEHOLDER = /jquery-writeCapture-script-placeholder-(\d+)-wc/g;
	function getText(text,selector) {
		if(!selector || !text) return text;
		
		var id = 0, scripts = {};			
		return $('<div/>').append(
			text.replace(/<script(.|\s)*?\/script>/g, function(s) {
				scripts[id] = s;
				return "jquery-writeCapture-script-placeholder-"+(id++)+'-wc';
			})
		).find(selector).html().replace(PLACEHOLDER,function(all,id) {
			return scripts[id];
		});
	}
	
	function error(method) {
		throw "invalid method parameter "+method;
	}
	
	// expose core
	$.writeCapture = wc;
})(jQuery,writeCapture.noConflict());;
(function($) {

/**
 * Create a DART object to handle tagging functionality
 */
Drupal.DART = {};

/**
 * Overridable settings.
 */
Drupal.DART.settings = {
  "writeTags": true
};

/**
 * Using document.write, add a DART tag to the page
 */
Drupal.DART.tag = function(tag) {
  tag = typeof(tag) == 'string' ? eval('(' + tag + ')') : tag;

  var tagname = tag.settings.options.method == 'adj' ? 'script' : 'iframe';
  var options = tag.settings.options.method == 'adj' ? 'type="text/javascript"' : 'frameborder="0" scrolling="no" width="' + tag.sz.split("x")[0] + '" height="' + tag.sz.split("x")[1] + '"';

  ad = '<' + tagname + ' ' + options + ' src="';
  ad += dart_url + "/";
  ad += tag.settings.options.method + "/";
  ad += tag.prefix + '.' + tag.site + "/" + tag.zone + ";";
  ad += this.keyVals(tag.key_vals);

  // Allow other modules to include js that can manipulate each key|val.
  rendered_ad = ($ !== undefined) ? $(document).triggerHandler('dart_tag_render', [ad]) : undefined;
  ad = rendered_ad !== undefined ? rendered_ad : ad;
  ad = (ad) ? ad += '"></' + tagname + '>' : '';

  if (Drupal.DART.settings.writeTags) {
    document.write(ad);
  }

  // console.log('-----------------'+tag.pos+'------------------');
  // console.log(tag);

  return ad;
};

/**
 * Format a key|val pair into a dart tag key|val pair.
 */
Drupal.DART.keyVal = function(key, val, useEval) {
  if (key != "<none>") {
    kvp  = key + "=";
    kvp += useEval ? eval(val) : val;
    kvp += key == "ord" ? "?" : ";";
  }
  else {
    kvp = useEval ? eval(val) : val;
  }

  return(kvp);
};

/**
 * Loop through an object and create kay|val pairs.
 *
 * @param vals
 *   an object in this form:
 *   {
 *     key1 : {{val:'foo', eval:true}, {val:'foo2', eval:false}}
 *     key2 : {{val:'bar', eval:false}},
 *     key3 : {{val:'foobar', eval:true}}
 *   }
 */
Drupal.DART.keyVals = function(vals) {
  var ad = '';
  for(var key in vals) {
    value = vals[key];
    for(var val in value) {
      v = value[val];
      ad += this.keyVal(key, v['val'], v['eval']);
    }
  }
  return ad;
};

/**
 * If there are tags in the loadLastTags, then load them where they belong.
 */
Drupal.DART.display_ads = function () {
  ord = Math.round(Math.random()*1000000000000);
  if (typeof(Drupal.DART.settings.loadLastTags) == 'object') {
    $('.dart-tag.dart-processed').each(function () {
      $(this).removeClass('dart-processed');
      $(this).html('');
    });
    for (var tag in Drupal.DART.settings.loadLastTags) {
      if (Drupal.DART.settings.loadLastTags.hasOwnProperty(tag) && tag != null) {
        var name = tag;
        var scriptTag = Drupal.DART.tag(Drupal.DART.settings.loadLastTags[name]);
        $('.dart-name-' + name).writeCapture().append(scriptTag).addClass('dart-processed');   
      }     
    }
  }
}

/**
 * Late load tags
 */
Drupal.behaviors.DART = {
  attach: function(context) {
    Drupal.DART.display_ads();
  }
};

})(jQuery);

;
