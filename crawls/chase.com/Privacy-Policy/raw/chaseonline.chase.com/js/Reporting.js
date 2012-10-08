
var CHASE=CHASE||{};CHASE.analytics=(function(){var analyticsConfig=new(function Config(){this.Enabled=true;this.PageDotPathSet=false;this.Initialized=false;this.DelayTag=false;this.DebugMode=false;this.FormFieldsOpted=[];this.PageDotParameterMap={};this.UrlPieces=/http(s|):\/\/([^\/]*)\.([^\.\/]+\.[^\/]+){1}\/.*/;this.Environments=/((q(f|)\d)|(i\d))/;this.EnvNum=/(\d)/;this.LinkClick=/^(a$|span|button|input)/i;this.WTParameter=/^(WT\.|DCS\.)/;this.FormField=/(input|select|button)/i;this.EmptyAds=/^;*$/;this.ScenarioNames=null;this.ScenarioSteps=null;this.ScenarioParams=null;this.PageTitle="";this.PageUrl=document.location+"";this.PageReferrer=document.referrer;this.PageDotUrl="https://www.chase.com/online/Home/images/wa01.gif?log=1";this.PageDotDomain="https://www.chase.com";this.PageDotImagePath="/online/Home/images/wa01.gif?log=1";this.ScreenResolution=((typeof(screen)==="object")?screen.width+"x"+screen.height:"NA");this.BrowserSize="Unknown";this.FlashVersion=(function(){var i,flash;if(window.ActiveXObject){for(i=10;i>0;i--){try{flash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);return i+".0";}
catch(e){}}}
else if(navigator.plugins&&navigator.plugins.length){for(i=0;i<navigator.plugins.length;i++){if(navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){return navigator.plugins[i].description.split(" ")[2];}}}
return"Not enabled";})();this.CacheBuster=(new Date()).getTime()+"."+Math.floor(Math.random()*1000000);this.TrackingType={"wa_lnk":"1","wa_dcdl":"2","wa_exlnk":"3","4":"4","FlashAdImp":"5","FlashAdClick":"7","wa_fl_n":"6","FormField":"8","Modal":"9","FlashExitLink":"10","Tab":"11","Hover":"12","AdClick":"13"};this.Environment="";this.SegmentGroup="";this.PersonID="";this.PageDepth="";this.MostRecentElementQueue=[];this.ChaseAdParams={"wt.ac":"WT.ad","jp_aid":"DCSext.jp_aid","wt.mc_id":"WT.mc_id","jp_mep":"DCSext.jp_mep","jp_con":"DCSext.jp_con","jp_lid":"DCSext.jp_lid","jp_aoc":"DCSext.jp_aoc","jp_avt":"DCSext.jp_avt","wt.pn_sku":"WT.pn_sku","jp_mc":"DCSext.jp_mc"};this.ClickedAdId="";this.ConversionAdId="";})();function setDebugMode(debugMode){if(typeof(debugMode)==="boolean"){analyticsConfig.DebugMode=debugMode;}}
function setPageDotUrl(url){if(analyticsConfig.Enabled){if(!analyticsConfig.PageDotPathSet){if(typeof url!="undefined"&&url.indexOf("http")===0){var urlPieces=/(http(s|):\/\/[^\/]*)(.*)/.f(url);analyticsConfig.PageDotDomain=urlPieces[1];analyticsConfig.PageDotImagePath=urlPieces[3];}else{var newPageDotDomain=parseEnvironment(analyticsConfig.PageUrl.toLowerCase());if(newPageDotDomain!==null){analyticsConfig.PageDotDomain=newPageDotDomain;analyticsConfig.PageDotImagePath="/commonui/images/wa01.gif?log=1";}else{var scriptElements=document.getElementsByTagName("script"),scriptElementsLength=scriptElements.length,currentElementSrc;for(var i=0;i<scriptElementsLength&&newPageDotDomain===null;i++){if(scriptElements[i].getAttribute){if(scriptElements[i].getAttribute('src')!=null){currentElementSrc=scriptElements[i].getAttribute('src').toLowerCase();}}else{currentElementSrc=scriptElements[i].src.toLowerCase();}
if(currentElementSrc){if((currentElementSrc.indexOf("reporting.js")>-1||currentElementSrc.indexOf("global.js")>-1)&&currentElementSrc.indexOf("http")===0){var srcParts=currentElementSrc.split('//');if(srcParts.length>=2){newPageDotDomain=parseEnvironment(currentElementSrc.toLowerCase());if(newPageDotDomain!==null){analyticsConfig.PageDotDomain=newPageDotDomain;analyticsConfig.PageDotImagePath="/commonui/images/wa01.gif?log=1";}else{if(analyticsConfig.PageUrl.toLowerCase().indexOf("cardmemberservices")>-1){analyticsConfig.PageDotDomain="https://www.cardmemberservices.com";}
else{analyticsConfig.PageDotDomain="https://www.chase.com";}}}}
else{if(analyticsConfig.PageUrl.toLowerCase().indexOf("cardmemberservices")>-1){analyticsConfig.PageDotDomain="https://www.cardmemberservices.com";}
else{analyticsConfig.PageDotDomain="https://www.chase.com";}}}}}}
analyticsConfig.PageDotPathSet=true;}}}
function parseEnvironment(url){if(url.indexOf("http")===0){if(url.indexOf("load-")>-1){return"https://load-chaseonline.chase.com";}
else if((url.indexOf("espanolqa")>-1)||(url.indexOf("espanol.devweb")>-1)){return"https://chaseonlineq7.chase.com";}
else{var urlPieces=analyticsConfig.UrlPieces.exec(url);var urlEnvironment=(urlPieces!==null)?analyticsConfig.Environments.exec(urlPieces[2]):null;if(urlEnvironment){var envNum;if(urlEnvironment[2]){envNum=analyticsConfig.EnvNum.exec(urlEnvironment[2]);if(url.indexOf("cardmemberservices")>-1){return"https://onlineq"+envNum[1]+".cardmemberservices.com";}
return"https://chaseonlineq"+envNum[1]+".chase.com";}else if(urlEnvironment[4]){envNum=analyticsConfig.EnvNum.exec(urlEnvironment[4]);return"https://chaseonlinei"+envNum[1]+".devweb.chase.com";}else{return null;}}}}
return null;}
function getParameterValue(parameter){if(typeof analyticsConfig.PageDotParameterMap[parameter]!=="undefined"){return analyticsConfig.PageDotParameterMap[parameter];}else{return null;}}
function nodeListToArray(nodeList,nodeFilterPredicate){if(!nodeList){throw("Need a nodelist to convert");}
var a=[];if(typeof nodeFilterPredicate!=="function"){nodeFilterPredicate=function(elem){return true;}}
for(var i=0,len=nodeList.length;i<len;i++){if(nodeFilterPredicate(nodeList[i])){a[a.length]=nodeList[i];}}
return a;}
function getElementsByClassSubstring(classString,tagName,startingElement){if(typeof startingElement!=="object"){startingElement=document;}
var matches=[];if(document.getElementsByClassName){matches=nodeListToArray(startingElement.getElementsByClassName(classString),function(elem){return elem.nodeName.toLowerCase()==tagName;});}else{matches=nodeListToArray(startingElement.getElementsByTagName(tagName||'a'),function(elem){var classes=elem.className;return(classes&&classes.indexOf(classString)>=0);});}
return matches;}
function init(){if(!analyticsConfig.Initialized&&analyticsConfig.Enabled){setDebugMode(false);analyticsConfig.PageTitle=document.title;setBrowserSize();mapConfigValuesToOmnitureTags(true);buildAdImpressionList();buildLinkImpressionList();initLinkAndFormFieldTracking();setPageDotUrl();analyticsConfig.Initialized=true;if(!analyticsConfig.DelayTag){buildPageDotUrl();requestPageDot();}}}
function reInit(startingElement){if(analyticsConfig.Initialized){if(startingElement){initLinkAndFormFieldTracking(startingElement);}else{debugMessage("Not reinitializing because no startingElement was provided to limit the scope");}}}
var forUnitTestingOnly=new(function(){return{reinitializeAnalytics:function(){this.unBindAll(document.body,"click",logLinkClick);allFormFields=document.getElementsByTagName("input");this.unBindAll(getElementsByType(allFormFields,"radio;checkbox;submit;image;button"),"click",logFormField);this.unBindAll(getElementsByType(allFormFields,"text;password;dropdown;select"),"change",logFormField);this.unBindAll(document.getElementsByTagName("select"),"change",logFormField);analyticsConfig.Initialized=false;init();},unBindAll:function(elements,event,func){for(var i=0;i<elements.length;i++){if(elements[i].removeEventListener){elements[i].removeEventListener(event,func,false);}else if(elements[i].detachEvent){elements[i].detachEvent("on"+event,func);}}}}})();function setBrowserSize(){analyticsConfig.BrowserSize=(document.all)?document.body.offsetWidth+"x"+document.body.offsetHeight:window.innerWidth+"x"+window.innerHeight;}
function buildPageUrl(){if(analyticsConfig.ScenarioParams!==null){addCustomVariables("wa_uri",getParameterValue("wa_uri")+encodeURIComponent(((analyticsConfig.PageUrl.indexOf('?')===-1)?"?":"&")+analyticsConfig.ScenarioParams));}}
function mapConfigValuesToOmnitureTags(isPageLoad){addCustomVariables("wa_cb",(new Date()).getTime()+"."+Math.floor(Math.random()*1000000),"wa_uri",encodeURIComponent(analyticsConfig.PageUrl),"wa_rf",(analyticsConfig.PageReferrer!=="")?encodeURIComponent(analyticsConfig.PageReferrer):null,"wa_pt",encodeURIComponent(analyticsConfig.PageTitle));if(isPageLoad){addCustomVariables("wa_sr",analyticsConfig.ScreenResolution,"wa_br",analyticsConfig.BrowserSize,"wa_fv",analyticsConfig.FlashVersion,"wa_pgsn",analyticsConfig.ScenarioNames,"wa_pgss",analyticsConfig.ScenarioSteps);}}
function buildPageDotUrl(){if(analyticsConfig.PageDotImagePath.indexOf('http')>-1){analyticsConfig.PageDotImagePath="/online/Home/images/wa01.gif?log=1";}
analyticsConfig.PageDotUrl=analyticsConfig.PageDotDomain+analyticsConfig.PageDotImagePath+
((analyticsConfig.PageDotImagePath.indexOf('?')===-1)?"?":"");buildPageUrl();var paramVal;for(var i in analyticsConfig.PageDotParameterMap){if(i!=="wa_lnk_i"&&i.indexOf("toJSON")===-1){paramVal=getParameterValue(i);analyticsConfig.PageDotUrl+=(paramVal!==null&&!analyticsConfig.EmptyAds.test(paramVal))?"&"+i+"="+paramVal:"";}}
analyticsConfig.PageDotUrl+=(getParameterValue("wa_lnk_i")!==null)?"&wa_lnk_i="+getParameterValue("wa_lnk_i"):"";}
function requestPageDot(){if(document.images){pageDot=new Image();pageDot.src=analyticsConfig.PageDotUrl;}
else{document.write('<IMG ALT="" BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+analyticsConfig.PageDotUrl+'">');}
clearPageTagParameters();}
function clearPageTagParameters(){analyticsConfig.PageDotParameterMap={};analyticsConfig.ScenarioParams=null;mapConfigValuesToOmnitureTags(false);}
function publicRequestPageDot(){if(analyticsConfig.Enabled&&analyticsConfig.Initialized){buildPageDotUrl();requestPageDot();}}
function buildAdImpressionList(){var aid_i=new Array(),avt_i=new Array(),mc_i=new Array(),mep_i=new Array(),aoc_i=new Array(),con_i=new Array(),lid_i=new Array(),prd_i=new Array(),links=((document.links)?document.links:document.getElementsByTagName("a")),linksLength=links.length,currentLinkHref;for(var i=0;i<linksLength;i++){currentLinkHref=links[i].href;var anchorCheckChar=currentLinkHref.indexOf('#');if(typeof currentLinkHref!=="undefined"&&anchorCheckChar<0&&currentLinkHref.match(/(jp_aid|jp_avt|jp_mc|WT.mc_id|jp_mep|jp_aoc|jp_con|jp_lid|WT.pn_sku)/)){aid_i.push(findParameter(currentLinkHref,"jp_aid"));avt_i.push(findParameter(currentLinkHref,"jp_avt"));mc_i.push(findParameter(currentLinkHref,"jp_mc")||findParameter(currentLinkHref,"WT.mc_id"));mep_i.push(findParameter(currentLinkHref,"jp_mep"));aoc_i.push(findParameter(currentLinkHref,"jp_aoc"));con_i.push(findParameter(currentLinkHref,"jp_con"));lid_i.push(findParameter(currentLinkHref,"jp_lid"));prd_i.push(findParameter(currentLinkHref,"WT.pn_sku"));}}
addCustomVariables("wa_aid_i",((aid_i.length>0)?aid_i.join(';'):null),"wa_avt_i",((avt_i.length>0)?avt_i.join(';'):null),"wa_mc_i",((mc_i.length>0)?mc_i.join(';'):null),"wa_mep_i",((mep_i.length>0)?mep_i.join(';'):null),"wa_aoc_i",((aoc_i.length>0)?aoc_i.join(';'):null),"wa_con_i",((con_i.length>0)?con_i.join(';'):null),"wa_lid_i",((lid_i.length>0)?lid_i.join(';'):null),"wa_prd_i",((prd_i.length>0)?prd_i.join(';'):null));}
function trackAdImpressions(campainIdList){addCustomVariables("wa_aid_i",((campainIdList.length>0)?campainIdList.join(';'):null));publicRequestPageDot();}
function trackAsyncAdImpressions(campainIdList){addCustomVariables("wa_aid_i",((campainIdList.length>0)?campainIdList.join(';'):null),("wa_tp",analyticsConfig.TrackingType["AdClick"]));publicRequestPageDot();pauseBrowser(200);}
function findParameter(link,param){var linkPieces=link.split('?');if(linkPieces.length>=2){linkPieces.shift();var queryString=linkPieces.join('?');var paramLocation=queryString.indexOf(param+"=");if(paramLocation>-1){temp=queryString.substring(paramLocation),tempAmpIndex=temp.indexOf('&'),tempAposIndex=temp.indexOf("'"),tempIndex=temp.length;if(tempAposIndex>-1){if(tempAmpIndex>-1){tempIndex=(tempAposIndex<tempAmpIndex)?tempAposIndex:tempAmpIndex;}else{tempIndex=tempAposIndex;}}else if(tempAmpIndex>-1){tempIndex=tempAmpIndex;}
return temp.substring(param.length+1,tempIndex);}}
return"";}
function buildLinkImpressionList(){var lnk_i=new Array(),optInLinks=getElementsByClassSubstring("chaseanalytics-opt-link-imp"),numOptInLinks=optInLinks.length,currentLink;for(var i=0;i<numOptInLinks;i++){currentLink=optInLinks[i];if(currentLink!==null){lnk_i.push(parseLinkName(currentLink));}}
addCustomVariables("wa_lnk_i",((lnk_i.length>0)?lnk_i.join(';'):null));}
function getAttributeValue(element,attributeName){if(element&&element.attributes){var elementAttribute=element.attributes[attributeName];if(elementAttribute){return elementAttribute.nodeValue;}}
return null;}
function parseLinkName(link,maxNameLength){var data_pt_name=getAttributeValue(link,"data-pt-name");if(data_pt_name){if(data_pt_name.indexOf('&amp;')>0)
{data_pt_name=data_pt_name.replace('&amp;','and');}
if(data_pt_name.indexOf('&')>0)
{data_pt_name=data_pt_name.replace('&','and');}
return data_pt_name.substring(0,maxNameLength||30);}else{var linkChildren=link.childNodes,numLinkChildren=linkChildren.length,defaultName=link.name||link.title||link.alt||link.id;if(numLinkChildren>0){var currentChild;for(var i=0;i<numLinkChildren;i++){currentChild=linkChildren[i];if(currentChild.tagName==="IMG"){return(currentChild.alt||defaultName).substring(0,maxNameLength||30);}else if(currentChild.tagName==="SPAN"){return(currentChild.innerHTML||defaultName).substring(0,maxNameLength||30);}}}
return(link.innerHTML||defaultName).substring(0,maxNameLength||30);}}
function trackCustomVariables(argumentObject){if(analyticsConfig.Enabled){if(typeof argumentObject!=="undefined"&&argumentObject!==null){var argumentObjectLength=argumentObject.length;if(argumentObjectLength>0&&argumentObjectLength%2===0){for(var i=0;i<argumentObjectLength;i+=2){analyticsConfig.PageDotParameterMap[argumentObject[i].replace(analyticsConfig.WTParameter,"wa_")]=argumentObject[i+1];}}}}}
function addCustomVariables(){var argumentsLength=arguments.length;if(argumentsLength>0&&argumentsLength%2===0){for(var i=0;i<argumentsLength;i+=2){if(arguments[i+1]!==null){analyticsConfig.PageDotParameterMap[arguments[i]]=arguments[i+1];}}}}
function setScenario(scenarioNames,scenarioSteps,scenarioParams){if(analyticsConfig.Enabled){if(scenarioParams&&(scenarioParams.indexOf("WT.dl=6")>-1||scenarioParams.indexOf("wa_tp=6")>-1)){trackFlashBrochureInteraction(scenarioNames,scenarioSteps);}else{if(scenarioNames&&(scenarioNames!=="unassigned")&&scenarioSteps){var scenarioNameArray=scenarioNames.split(';'),scenarioStepArray=scenarioSteps.split(';'),difference=scenarioNameArray.length-scenarioStepArray.length;if(difference>0){for(var i=0;i<difference;i++){scenarioSteps+=";"+scenarioStepArray[0];}}
analyticsConfig.ScenarioNames=removeIllegalChars(scenarioNames);analyticsConfig.ScenarioSteps=removeIllegalChars(scenarioSteps);if(typeof scenarioParams!=="undefined"){analyticsConfig.ScenarioParams=scenarioParams;}}}}}
function logLinkClick(clickEvent){clickEvent=clickEvent||(window.event||"");if(clickEvent&&((typeof clickEvent.which!="number")||(clickEvent.which==1))){var clickElement=climbDOMFromEvent(clickEvent,analyticsConfig.LinkClick);if(typeof clickElement==='undefined'||clickElement===null){return;}
var anchorElement=clickElement;if(anchorElement.tagName==='BUTTON'||anchorElement.tagName==='INPUT'){if(classNameContainsSubstring(anchorElement.className,"chaseanalytics-opt-exlnk")){processClick(anchorElement,"wa_exlnk");}
if(classNameContainsSubstring(anchorElement.className,"chaseanalytics-track-link")){processClick(anchorElement,"wa_lnk",false,25);}}
if(!clickElement.href){anchorElement=findAncestorElement(clickElement,function(elem){return elem.nodeName.toLowerCase()=="a";});}
if(anchorElement){var targetHostname=anchorElement.hostname?(anchorElement.hostname.split(":")[0]):"",targetProtocol=anchorElement.protocol||"";var elementClassName=anchorElement.className;if(classNameContainsSubstring(elementClassName,"chaseanalytics-opt-doc-dnld")){processClick(anchorElement,"wa_dcdl");}else{var hrefName=anchorElement.href.toLowerCase();if((targetHostname.length>0)||(hrefName.indexOf("javascript")>-1)||(hrefName.indexOf("mailto:")>-1)||(hrefName.indexOf("tel:")>-1)){if(classNameContainsSubstring(elementClassName,"chaseanalytics-opt-exlnk")){processClick(anchorElement,"wa_exlnk");}else if(classNameContainsSubstring(elementClassName,"chaseanalytics-track-link")){processClick(anchorElement,"wa_lnk",false,25);}
else if(classNameContainsSubstring(elementClassName,"chaseanalytics-track-ad-link")){processAdClick(anchorElement);}
else if(classNameContainsSubstring(elementClassName,"chaseanalytics-opt-link-v2")||(typeof _linkTrackingVersion!=="undefined"&&_linkTrackingVersion===2)||typeof anchorElement.attributes["pcg"]!=="undefined"){processClick(anchorElement,"wa_lnk","id,name,title,alt",25);}else{debugMessage("Not tracking click event.  Anchor element did not have any matching opt-in css classes");}}else{debugMessage("Not tracking click event.  Anchor is a relative link.  Use page views to track hits, not clicks for on-site traffic.");}}}else{debugMessage("Not tracking click event.  Could not find an ancestor anchor element for the clickElement ("+clickElement.nodeName+")");}}}
function classNameContainsSubstring(elementClassName,classString){return(elementClassName.indexOf(classString)>-1);}
function processAdClick(element){var wa_aid_lnk=findParameter(String(element),"jp_aid");if(wa_aid_lnk){wa_aid_lnk=htmlEncode(wa_aid_lnk);}
else{wa_aid_lnk="Not Set";}
addCustomVariables("wa_aid_lnk",wa_aid_lnk,"wa_tp",analyticsConfig.TrackingType["AdClick"]);publicRequestPageDot();pauseBrowser(200);}
function processClick(element,typeParameter,forceAttribute,maxNameLength){var linkName="Not Set";if(typeof forceAttribute==="string"){var attributes=forceAttribute.split(','),numAttributes=attributes.length,currentElementAttribute;for(var i=0;i<numAttributes&&linkName==="Not Set";i++){currentElementAttribute=element[attributes[i]];if(typeof currentElementAttribute!=="undefined"&&currentElementAttribute!==""){linkName=currentElementAttribute;}}
if(linkName==="Not Set"){return;}}else{linkName=parseLinkName(element,maxNameLength||30);}
if(linkName.indexOf('&amp;')>0)
{linkName=linkName.replace('&amp;','and');}
linkName=htmlEncode(linkName);addCustomVariables(typeParameter,linkName,"wa_tp",analyticsConfig.TrackingType[typeParameter]);publicRequestPageDot();pauseBrowser(200);}
function pauseBrowser(milliseconds){var oldDate=new Date(),currentDate;do{currentDate=new Date();}
while(currentDate-oldDate<milliseconds);}
function climbDOMFromEvent(clickEvent,tagExpression){var element=clickEvent.target||clickEvent.srcElement;if(typeof element==='undefined'||element===null||element.nodeName.toLowerCase()==='li'){return null;}
while(element&&element.tagName&&(!element.tagName.toLowerCase().match(tagExpression))){element=element.parentElement||element.parentNode;}
return element;}
function findAncestorElement(element,matchPredicate){if(typeof matchPredicate!=="function"){throw"matchPredicate is required to know which ancestor element to return";}
if(element==undefined){throw"element is required to know which ancestor element to return";}
var ancestor=element.parentNode;while(ancestor){if(matchPredicate(ancestor)){return ancestor;}
ancestor=ancestor.parentNode;}
return null;}
function trackFlashAd(url,isImpression){if(analyticsConfig.Enabled){var impressionString=(isImpression)?"_i":"";addCustomVariables("wa_aid"+impressionString,findParameter(url,"jp_aid"),"wa_avt"+impressionString,findParameter(url,"jp_avt"),"wa_mc"+impressionString,(findParameter(url,"jp_mc")||findParameter(url,"WT.mc_id")),"wa_mep"+impressionString,findParameter(url,"jp_mep"),"wa_aoc"+impressionString,findParameter(url,"jp_aoc"),"wa_con"+impressionString,findParameter(url,"jp_con"),"wa_lid"+impressionString,findParameter(url,"jp_lid"),"wa_prd"+impressionString,findParameter(url,"WT.pn_sku"),"wa_tp",analyticsConfig.TrackingType["FlashAd"+((isImpression)?"Imp":"Click")]);publicRequestPageDot();pauseBrowser(200);}}
function trackFlashBrochureInteraction(brochureName,userInteraction){addCustomVariables("wa_fl_n",brochureName,"wa_fl_a",userInteraction,"wa_tp",analyticsConfig.TrackingType["wa_fl_n"]);}
function trackModalLoad(modalName,modalDescription){addCustomVariables("wa_dyn_n",modalName,"wa_dyn_d",modalDescription,"wa_tp",analyticsConfig.TrackingType["Modal"]);publicRequestPageDot();}
function trackTabSelect(tabName,tabContainerName){addCustomVariables("wa_tab_n",tabName,"wa_tab_d",tabContainerName,"wa_tp",analyticsConfig.TrackingType["Tab"]);publicRequestPageDot();}
function trackHoverLoad(hoverName,hoverGenerator){addCustomVariables("wa_hov_n",hoverName,"wa_hov_d",hoverGenerator,"wa_tp",analyticsConfig.TrackingType["Hover"]);publicRequestPageDot();}
function trackCustomLink(linkName){addCustomVariables("wa_lnk",linkName,"wa_tp",analyticsConfig.TrackingType["wa_lnk"]);publicRequestPageDot();}
function trackFlashExitLink(linkValue){addCustomVariables("wa_flexlnk",linkValue,"wa_tp",analyticsConfig.TrackingType["FlashExitLink"]);publicRequestPageDot();}
function initLinkAndFormFieldTracking(startingElement){if(typeof startingElement!=="object"){startingElement=document;bind(document.body,"click",logLinkClick);}
if(analyticsConfig.ScenarioNames!==null){var allFormFields=startingElement.getElementsByTagName("input");bindAll(getElementsByType(allFormFields,"radio;checkbox;submit;image;button"),"click",logFormField);bindAll(getElementsByType(allFormFields,"text;password;dropdown;select"),"change",logFormField);bindAll(startingElement.getElementsByTagName("select"),"change",logFormField);}else{analyticsConfig.FormFieldsOpted=getElementsByClassSubstring("chaseanalytics-track-element","input")||[];var nonInputElements=getElementsByClassSubstring("chaseanalytics-track-element","button");var selectElements=getElementsByClassSubstring("chaseanalytics-track-element","select");if(nonInputElements){for(var i=0,len=nonInputElements.length;i<len;i++){analyticsConfig.FormFieldsOpted.push(nonInputElements[i]);}}
if(selectElements){for(var i=0,len=selectElements.length;i<len;i++){analyticsConfig.FormFieldsOpted.push(selectElements[i]);}}
if(analyticsConfig.FormFieldsOpted.length>0){bindAll(getElementsByType(analyticsConfig.FormFieldsOpted,"radio;checkbox;submit;image;button"),"click",logFormField);bindAll(getElementsByType(analyticsConfig.FormFieldsOpted,"text;password"),"change",logFormField);bindAll(getElementsByClassSubstring("chaseanalytics-track-element","select"),"change",logFormField);}}}
function getElementsByType(elements,typeList){var types=typeList.split(';'),numTypes=types.length,numElements=elements.length,returnElements=[],currentElement,currentElementType;for(var i=0;i<numElements;i++){currentElement=elements[i];currentElementType=currentElement.getAttribute("type");for(var j=0;j<numTypes;j++){if(typeof currentElementType!=="undefined"&&currentElementType===types[j]){returnElements.push(currentElement);}}}
return returnElements;}
function logFormField(formEvent){formEvent=formEvent||(window.formEvent||"");if(formEvent&&((typeof formEvent.which!="number")||(formEvent.which==1))){var changeElement=climbDOMFromEvent(formEvent,analyticsConfig.FormField);if(changeElement){var formElement=findAncestorElement(changeElement,function(elem){return elem.nodeName.toLowerCase()=="form";});var formName=getAttributeValue(formElement,"data-pt-name")||analyticsConfig.ScenarioSteps||analyticsConfig.PageTitle||"unknown",elementName=getAttributeValue(changeElement,"data-pt-name")||changeElement.id||changeElement.name;if(elementName){addCustomVariables("wa_frm_n",encodeURIComponent(formName),"wa_frm_s",encodeURIComponent(elementName),"wa_tp",analyticsConfig.TrackingType["FormField"]);publicRequestPageDot();}else{debugMessage("Not logging form field usage because the element did not have a name.  Tried data-pt-name, the id, and the name attributes.");}}else{debugMessage("Not logging form field usage because could not find the element that triggered the event");}}}
function isOffsite(url){if(url.length>0){url=url.toLowerCase();if(url===window.location.hostname.toLowerCase()){return false;}}
return true;}
function bind(element,event,func){if((typeof func=="function")&&element){if(element.addEventListener){element.addEventListener(event,func,false);}else if(element.attachEvent){element.attachEvent("on"+event,func);}}}
bind(window,"load",init);function bindAll(elements,event,func){if(elements){var elementsLength=elements.length;for(var i=0;i<elementsLength;i++){bind(elements[i],event,func);}}}
function htmlEncode(str){var div=document.createElement('div');var text=document.createTextNode(str);div.appendChild(text);return div.innerHTML;}
function removeIllegalChars(a){var b=new Array(">","<","'","`","^","[","]","{","}","\\","|","~");for(var c=0;c<b.length;c++){a=(a.split(b[c])).join("");}
return a;}
function debugMessage(message){if(analyticsConfig.DebugMode){if(typeof(console)!=="undefined"&&console.log){console.log(message);}else{alert(message);}}}
var privateFunctions=function exposePrivateFunctionsForUnitTesting(){return{findAncestorElement:findAncestorElement,nodeListToArray:nodeListToArray,getElementsByClassSubstring:getElementsByClassSubstring}}
return{config:analyticsConfig,debugMessage:debugMessage,setDebugMode:setDebugMode,setPageDotUrl:setPageDotUrl,trackCustomVariables:trackCustomVariables,trackFlashAd:trackFlashAd,trackAdImpressions:trackAdImpressions,trackAsyncAdImpressions:trackAsyncAdImpressions,setScenario:setScenario,requestPageDot:publicRequestPageDot,trackModalLoad:trackModalLoad,trackHoverLoad:trackHoverLoad,trackTabSelect:trackTabSelect,trackCustomLink:trackCustomLink,trackFlashExitLink:trackFlashExitLink,parseEnvironment:parseEnvironment,processAdClick:processAdClick,reInitialize:reInit,forUnitTestingOnly:forUnitTestingOnly,privateFunctionsForUnitTestingOnly:privateFunctions()};})();function _Bind(element,event,func){var f=window[func];if((typeof(f)=="function")&&element){if(element.addEventListener){element.addEventListener(event,f,false);}else if(element.attachEvent){element.attachEvent("on"+event,f);}}}
function _GetCookie(name){var cookieValRegex=new RegExp(name+"s*=s*(.*?)(?:;|$)");var cookies=document.cookie.toString();var value=cookies.match(cookieValRegex);return value?unescape(value[1]):null;}
chase_getElementsByClassName=function(cl){if(typeof document.getElementsByClassName==='function'){return document.getElementsByClassName(cl);}
var retnode=[];var elem=document.getElementsByTagName('a');for(var i=0;i<elem.length;i++){var classes=elem[i].className;if(classes&&classes.indexOf(cl)>=0)retnode.push(elem[i]);}
return retnode;};var DebugMode=0;var _ScenarioName=null;var _StepName=null;var _ScenarioParams=null;var _SegmentGroup=null;var _AdCookie="RPT_Conv";var _RoutableTestTargetCookie="RLTTC";var _SetRoutableLogin=false;var _Delim="|CP|";var RPT_Enabled=true;var _PageTitle;function RPT_Init(pageName){}
function RPT_SetPersonId(personId){}
function RPT_ErrorPage(code){}
function RPT_ScenarioPage(scenarioNames,stepName,scenarioParams){CHASE.analytics.setScenario(scenarioNames,stepName,scenarioParams);}
RPT_ScenerioPage=RPT_ScenarioPage;function RPT_RecordEvent(){CHASE.analytics.requestPageDot();}
function RPT_Impression(url){CHASE.analytics.trackFlashAd(url,true);}
function RPT_Click(url){RPT_ClickNoRedirect(url);document.location=url;}
function RPT_ClickNoRedirect(url){CHASE.analytics.trackFlashAd(url,false);}
function RPT_AddVariables(){CHASE.analytics.trackCustomVariables(arguments);}
function clickthrough(flashFile){var t=document.getElementById(flashFile);if(t){RPT_Click(t.href);}}
function AdParam(jpVal,wtVal){this.JpVal=jpVal;this.WtVal=wtVal;}
var _AdParams=new Array(new AdParam("wt.ac","WT.ad"),new AdParam("jp_aid","DCSext.jp_aid"),new AdParam("wt.mc_id","WT.mc_id"),new AdParam("jp_mep","DCSext.jp_mep"),new AdParam("jp_con","DCSext.jp_con"),new AdParam("jp_lid","DCSext.jp_lid"),new AdParam("jp_aoc","DCSext.jp_aoc"),new AdParam("jp_avt","DCSext.jp_avt"),new AdParam("wt.pn_sku","WT.pn_sku"),new AdParam("jp_mc","DCSext.jp_mc"));_Bind(window,"load","_Init");function _Show(m){if(DebugMode===3&&console&&console.log){console.log(m);return;}
if(DebugMode>0){alert(m);}}
function _Debug(query){var usingTestHarnass=(typeof(WriteWebTrendsCall)!="undefined");if((DebugMode>0)||(usingTestHarnass)){var delim=(DebugMode==1)?"<br/>":"\n";var parts=query.split("?");var buffer=query+"\n\n"+"Domain: "+parts[0]+delim+"Length: "+query.length+delim;parts=parts[1].split("&");buffer+="Param Count: "+(parts.length-1)+delim;parts=parts.sort(function(x,y){var a=String(x).toUpperCase();var b=String(y).toUpperCase();if(a>b)return 1;if(a<b)return-1;return 0;});buffer+=parts.join(delim);if(DebugMode==1){var w=window.open("");w.document.write(buffer);}
else{_Show(buffer);}
if(usingTestHarnass){WriteWebTrendsCall(parts);}}}
function InitializeFPC(){}
var _Initialized=false;var _InitStageCompleted=0;function _Init(){}
function _Init2(){}
function _Clear(){}
function _GetTarget(evt,tag,recurse){tag=tag.toUpperCase();var e=evt.target||evt.srcElement;if((!recurse)&&(e.tagName.toUpperCase()!=tag)){return null;}
else{while(e.tagName){if(e.tagName.toUpperCase()!=tag){e=e.parentElement||e.parentNode;}
else{return e;}}}
return null;}
function _GetTargetName(elem){var name=null;if(elem){if(elem.className.indexOf("chaseanalytics-opt-elem-namefromdata")>-1){name=elem.getAttribute('data-pt-name');}
if(!name){if(elem.id&&elem.id.length>0){name=elem.id;}
else if(elem.name&&elem.name.length>0){name=elem.name;}
else if(elem.title&&elem.title.length>0){name=elem.title;}
else if(elem.alt&&elem.alt.length>0){name=elem.alt;}}}
return name;}
function _TrackElement(target){}
function _OnChange(evt){var target=_GetTarget(evt,"input",false);if(target){var type=target.type.toLowerCase();if(type=="button"||type=="image"||type=="submit"||type=="radio"||type=="checkbox"){return true;}}
if(!target){target=_GetTarget(evt,"select",false);}
if(!target){target=_GetTarget(evt,"textarea",false);}
_TrackElement(target);return true;}
var _thirdParyHost,_thirdPartyPath,_isThirdParty=false;function _ParseThirdPartyUrl(url){var i=url.indexOf("//");var test=url.substring(i+2,url.length);i=test.indexOf("/");_thirdPartyHost=test.substring(0,i);_thirdPartyPath=test.substring(i+1,test.length);_Show("Third Party\n\n"+url+"\n\n"+_thirdPartyHost+"\n\n"+_thirdPartyPath);}
function _IsTaggedOffSite(url){var implicitUrl=_GetParmVal("jp_offsite",url);if(implicitUrl){_Show("3rd Party Tagged");_isThirdParty=true;_ParseThirdPartyUrl(implicitUrl);}
return _isThirdParty;}
function _IsImpliedOffSite(url){if(url.indexOf("viewad.aspx")!=-1){return _isThirdParty;}
else if(url.indexOf("ultimaterewards")!=-1){_Show("3rd Pary Ultimate Rewards Implied");_isThirdParty=true;_ParseThirdPartyUrl(url);}
else if((url.indexOf(".chase.")==-1)&&(url.indexOf(".cardmemberservices.")==-1)){_Show("3rd Pary Implied");_isThirdParty=true;_ParseThirdPartyUrl(url);}
return _isThirdParty;}
function _OnClick(evt){}
function _SetConversionInfo(targetUrl,propagateClick){}
var _clickedAd;var _conversionAd;function _CheckConversion(){}
function _BindAll(elems,event,func){if(typeof(elems)!="undefined"){for(var i=0;i<elems.length;i++){_Bind(elems[i],event,func);}}}
function _OnLoadError(evt){_Show('_OnLoadError');return false;}
function _OnLoad(evt){if(gHref.length>0){window.location=gHref;gHref="";return true;}}
function _ParamSearch(){if(document.links){for(var i=0;i<document.links.length;i++){_AdSearchUpdateObj(document.links[i]);}}}
function _AdSearchUpdateObj(link){var r=_AdSearch(link.href,true);if(r!=link.href){r=r.replace("@","%40");link.href=r;_Show("subbing:"+r+" for "+link.href);}}
function _AdSearch(url,convertClickToImpression){}
function _GetParmVal(param,link){param=param.toLowerCase();link=link.toLowerCase();var pos=link.indexOf(param+"=");var rv=null;if(pos!=-1){var start=pos+param.length+1;var end=link.indexOf("&",start);rv=link.substring(start,(end!=-1)?end:link.length);if((end=rv.indexOf("'"))>-1){rv=rv.substring(0,end);}}
return rv;}
var _Environment;function _Configure(){}
function ApplyWebTrends(dcsLookupDomain){}
function _GetDcsId(domain){}
var _ResolvedDomain;function _Replace(source,test,replace){if(source.match(test)){_ResolvedDomain=source.replace(test,replace);return true;}
return false;}
function _GetDomain(domain){return _ResolvedDomain;}
function _IsNumeric(text){var digits="0123456789";for(i=0;i<text.length;i++){if(digits.indexOf(text.charAt(i))==-1){return false;}}
return true;}
function _SetCookie(name,value){var secure=window.location.protocol.indexOf('https:')===0?";secure":"";document.cookie=name+"="+escape(value)+";domain="+_wt.fpcdom;+";path=/"+secure;}
function PT_BuildLinkImpressionList(){var links="";var linksCol=chase_getElementsByClassName('chaseanalytics-opt-link-imp');for(var i=0;i<linksCol.length;i++){links+=(links!=="")?";"+_GetTargetName(linksCol[i]):_GetTargetName(linksCol[i]);}
return links;}
function updatePersonaCookie(lang){var pCookie=new PersonalizationCookie();pCookie.SetLocale(lang+"_us");pCookie.Persist();}
if(!document.getElementById('personalizationScript')){var domain="https://chaseonline.chase.com";var pageUrl=this.document.location.toString();var newDomain=CHASE.analytics.parseEnvironment(pageUrl);if(newDomain){domain=newDomain;}
var personalizationScriptElem=document.createElement('script');personalizationScriptElem.type="text/javascript";personalizationScriptElem.id="personalizationScript";personalizationScriptElem.src=domain+'/commonUI/javascripts/Personalization.js';var head=document.getElementsByTagName('head')[0];if(head){head.appendChild(personalizationScriptElem);}
else{document.getElementsByTagName('body')[0].appendChild(personalizationScriptElem);}}
/*Begin Source: _shared-analytics.js */
function PT_GetQueryStringForReporting(scenarioParams,otherQryParams){var queryString=(arguments&&arguments.length==3)?arguments[2]:document.location.search;var moreParams=[scenarioParams,otherQryParams];for(var i=0;i<moreParams.length;i++){if(typeof(moreParams[i])!=='undefined'&&moreParams[i]!==null&&moreParams[i]!==""){if(queryString.indexOf('?')===0){queryString+="&";}else{queryString+="?";}
queryString+=moreParams[i];}}
return queryString;}
function PT_AppendValue(name,value){var current,dot;dot=name.indexOf(".");switch(name.substring(0,dot)){case"WT":current=_wt.WT[name.substring(dot+1)];break;case"DCS":current=_wt.DCS[name.substring(dot+1)];break;case"DCSext":current=_wt.DCSext[name.substring(dot+1)];break;default:break;}
if(typeof(value)==='undefined'||value===null){value="";}
if(typeof(current)!=='undefined'&&current!==null){value=current+";"+value;}
_wt.dcsSetProps([name,value]);}
function PT_ClearVars(strArray){var clrArray=[];if(typeof(strArray)!='undefined'){var i=strArray.length;while(i--){clrArray.push(strArray[i],undefined);}}
_wt.dcsSetProps(clrArray);}
function PT_GetUrlParamValue(param,url){var getValueRegEx=new RegExp(param+'=([^#&?\']*)',"i");var match=getValueRegEx.exec(url);return match===null?null:match[1];}
CHASE.TagManager=(function(){var tagServer=window['tagManagerConfig']!=undefined?window.tagManagerConfig.tagServer:null,env="prod",defaultServer="https://www.chase.com";if(tagServer!=null){if(tagServer.indexOf("wwwq")!=-1){env="qa";}
else if(tagServer.indexOf("wwwi")!=-1){env="ist";}
else if(tagServer.indexOf("wwwd")!=-1){env="dev";}
else if(tagServer.indexOf("load")!=-1){env="load";}
else{env="unknown";}}
else{tagServer=defaultServer;}
var TM={serverUrl:tagServer,env:env,setServerUrl:function(arg){TM.serverUrl=arg;},getServerUrl:function(){return TM.serverUrl;},getXHRObject:function(){var xhrObj;try{xhrObj=new XMLHttpRequest();return xhrObj;}catch(e){var aTypes=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];var len=aTypes.length;for(var i=0;i<len;i++){try{xhrObj=new ActiveXObject(aTypes[i]);}catch(e){continue;}
break;}}
return xhrObj;},requestPixel:function(strURL){if(document.images){var pixel=new Image();pixel.src=strURL;}
else{document.write('<IMG ALT="" BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+strURL+'">');}},extend:function(something,morethings){if(!morethings)
return something;if(!something)
return morethings;for(var name in morethings){something[name]=morethings[name];}
return something;},xmlhttpGet:function(strURL){var xmlHttpReq=TM.getXHRObject();xmlHttpReq.onreadystatechange=function(){if(xmlHttpReq.readyState!=4){return;}};xmlHttpReq.open('GET',strURL,true);xmlHttpReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');xmlHttpReq.send();},processTags:function(data,tryCount){if(!CHASE.TagManager.ExtensionsLoaded||typeof PersonalizationCookie!='function'){tryCount=tryCount||0;if(tryCount>10){CHASE.analytics.debugMessage("[Tag manager] Dependencies not loaded after 10 tries. Aborting.");return;}
CHASE.analytics.debugMessage("[Tag manager] Dependencies not loaded. Retry # "+tryCount);setTimeout(function(){TM.processTags(data,tryCount+1);},200);return;}
TM.initClientVars(true);var scripts=new Array();var script;if(data!=null&&data.jsonScriptArray!=null){for(var k=0;k<data.jsonScriptArray.length;k++){var urlvalue=data.jsonScriptArray[k].url;var scriptvalue=data.jsonScriptArray[k].script;if(urlvalue!=null&&urlvalue!=undefined){TM.invokePixelTag(urlvalue);}
if(scriptvalue!=null&&scriptvalue!=undefined){script=TM.replacePlaceholder(scriptvalue,true);scripts.push(script);}}
TM.processScripts(scripts);}},processScripts:function(scripts){for(var i=0;i<scripts.length;i++){var scriptName="CHASE.TagManager."+scripts[i];eval(scriptName);}},invokePixelTag:function(url,params){url=TM.replacePlaceholder(url,params);TM.requestPixel(url);},getTags:function(){var source;if(window.overridePageLocation===undefined){source=document.URL;}else{source=window.overridePageLocation;}
var resolvedUrl=TM.getServerUrl()+"/apps/services/tags";source=source.split("?")[0];source=source.replace("://","/");TM.loadTagScript(resolvedUrl+"/"+source);},loadTagScript:function(url){var script=document.createElement('script'),head=document.getElementsByTagName('head')[0]||document.documentElement;script.src=url;head.appendChild(script);},initClientVars:function(force){if(!force&&TM.clientVars)
return;var runtimeVars=(function(){var p={env:TM.env,query:(function(a){if(a=="")return{};var b={};for(var i=0;i<a.length;++i){var p=a[i].split('=');if(p.length!=2)continue;b[p[0]]=decodeURIComponent(p[1].replace(/\+/g," "));}
return b;})(window.location.search.substr(1).split('&')),persona:(function(undefined){if(typeof PersonalizationCookie!='function'){return{};}else{var pc=new PersonalizationCookie();return pc.Table;}})(),v1st:_GetCookie('v1st'),userAgent:encodeURIComponent(navigator.userAgent),referrer:encodeURIComponent(document.referrer),random:(Math.floor(Math.random()*900000000)+100000000)};return p;})();TM.clientVars=TM.extend(window.jpmcPageVar,runtimeVars);},replacePlaceholder:function(source,params){TM.initClientVars(false);var clientVars;if(params)
clientVars=TM.extend(params,TM.clientVars);else
clientVars=TM.clientVars;var regexp=/\{(.+?)\}/g;var matches_array=source.match(regexp);var toReturn=source;if(matches_array){try{for(var i=0;i<matches_array.length;i++){var match=matches_array[i].substring(1,matches_array[i].length-1);var json="clientVars."+match;var replacement=eval(json)||"";toReturn=toReturn.replace(matches_array[i],replacement);}}catch(e){CHASE.analytics.debugMessage('Unable to render json object. '+e);}}
return toReturn;},getJSONP:function(url,success){var ud='_'+(+new Date()),script=document.createElement('script'),head=document.getElementsByTagName('head')[0]||document.documentElement;window[ud]=function(data){head.removeChild(script);success&&success(data);};script.src=url.replace('callback=?','callback='+ud);head.appendChild(script);}};return TM;})();function _runPixelTracker(){if(window.TagManagerWait)
return;if(!document.getElementById('pixelTagExtensionScript')){var personalizationScriptElem=document.createElement('script');personalizationScriptElem.type="text/javascript";personalizationScriptElem.id="pixelTagExtensionScript";personalizationScriptElem.src=CHASE.TagManager.getServerUrl()+"/apps/chase/clientlibs/foundation/tagmanagerextensions.js";var head=document.getElementsByTagName('head')[0];if(head){head.appendChild(personalizationScriptElem);}
else{document.getElementsByTagName('body')[0].appendChild(personalizationScriptElem);}}
CHASE.TagManager.getTags();}
_Bind(window,"load","_runPixelTracker");