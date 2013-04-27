//<!--
//1@@m7

var ebSearchDefaultText="";function ebHelpSearchInit()
{var fe=document.forms["QueryForm"].elements["searchString"];ebSearchDefaultText=fe.value;var vals=ebHelpGetCookieVals();if((vals.length==1)&&(vals[0]!=""))
fe.value=unescape(vals[0]);else if(vals.length==3)
fe.value=unescape(vals[2]);}
function ebHelpSearchFocus(pElem,sblackTxtClass)
{if(pElem.value==ebSearchDefaultText){pElem.value="";pElem.className=sblackTxtClass;}}
function ebHelpSearchWriteCookie(pVal)
{var vals=ebHelpGetCookieVals();var val="";if(vals[0]&&vals[1])
{val=vals[0]+ebHelpCookDelim+vals[1];if(pVal!="")
val+=ebHelpCookDelim;}
val+=pVal;writeCookieletEx(ebHelpContainerName,ebHelpCookName,val,tDomain,"/");}
function ebHelpSearchSubmit()
{ebHelpSearchWriteCookie(this.elements["searchString"].value);}
function ebHelpSearchClear()
{ebHelpSearchWriteCookie("");}
function ebHelpSearchChange(pElem)
{ebHelpSearchEnableButton((pElem.value!=""));}
function ebHelpSearchEnableButton(pEnable)
{var form=document.forms["QueryForm"];form.elements["submitButton"].disabled=!pEnable;if(pEnable)
form.onsubmit=ebHelpSearchSubmit;else
form.onsubmit=new Function("return false;");}

//2@@m13

var ebHelpFeatureRef="1",ebHelpFeatureName=null;var ebHelpCookDelim="||",ebHelpCookName="ebh",ebHelpContainerName="ds2";var eInd=document.domain.indexOf(".ebay."),tDomain;if(eInd!=-1)
tDomain=document.domain.substr(eInd+1);function ebHelpGBTFInit()
{if(typeof(dot)=='undefined'||typeof(ebStr)=='undefined')
return false;var eInd=document.domain.indexOf(dot+ebStr+dot),tDomain;if(eInd!=-1)
tDomain=document.domain.substr(eInd+1);var srch=decodeURIComponent(document.location.search);var ind=srch.indexOf("fromFeature=");if(ind==-1)
{var vals=ebHelpGetCookieVals();if(vals[0]&&vals[1])
ebHelpFeatureName=vals[0];if(vals[1])
ebHelpFeatureRef=vals[1];}
else
{var lInd=srch.indexOf("&",ind+12);if(lInd==-1)
lInd=srch.length;ebHelpFeatureName=srch.substring(ind+12,lInd);ebHelpFeatureRef=(window.history.length-1-((ebay.oGlobals.oClient.bFirefox)?1:0));if(ebHelpFeatureName.hasAny('script','document','alert','javascript','write','window','ript'))
ebHelpFeatureName="";var cv=encodeURIComponent(ebHelpFeatureName)+ebHelpCookDelim+ebHelpFeatureRef;writeCookieletEx(ebHelpContainerName,ebHelpCookName,cv,tDomain,"/");}}
function ebHelpGetCookieVals()
{return readCookieletEx(ebHelpContainerName,ebHelpCookName).split(ebHelpCookDelim);}
function ebHelpSendBackToFeature(pIndex)
{writeCookieletEx(ebHelpContainerName,ebHelpCookName,"",tDomain,"/");if(history.iAnchClickCounts)
{pIndex=pIndex+history.iAnchClickCounts;}
history.go(pIndex);}
window.sendBackToFeature=ebHelpSendBackToFeature;function ebHelpGetBackToFeature()
{var str='&nbsp;';return str;}
window.getBackToFeature=ebHelpGetBackToFeature;window.ebHelpSearchClear=new Function("return true;");ebHelpGBTFInit();
// b=16026031 -->