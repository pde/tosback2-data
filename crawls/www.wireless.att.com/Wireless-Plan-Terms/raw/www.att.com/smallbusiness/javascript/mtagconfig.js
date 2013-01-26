var lpMTagConfig=lpMTagConfig||{};lpMTagConfig.vars=lpMTagConfig.vars||[];lpMTagConfig.dynButton=lpMTagConfig.dynButton||[];lpMTagConfig.lpProtocol=document.location.toString().indexOf("https:")==0?"https":"http";lpMTagConfig.pageStartTime=(new Date).getTime();if(!lpMTagConfig.pluginsLoaded)lpMTagConfig.pluginsLoaded=!1;
lpMTagConfig.loadTag=function(){for(var a=document.cookie.split(";"),b={},c=0;c<a.length;c++){var d=a[c].substring(0,a[c].indexOf("="));b[d.replace(/^\s+|\s+$/g,"")]=a[c].substring(a[c].indexOf("=")+1)}for(var a=b.HumanClickRedirectOrgSite,b=b.HumanClickRedirectDestSite,c=["lpTagSrv","lpServer","lpNumber","deploymentID"],d=!0,e=0;e<c.length;e++)lpMTagConfig[c[e]]||(d=!1,typeof console!="undefined"&&console.log&&console.log("LivePerson : lpMTagConfig."+c[e]+" is required and has not been defined before lpMTagConfig.load()."));
if(!lpMTagConfig.pluginsLoaded&&d)lpMTagConfig.pageLoadTime=(new Date).getTime()-lpMTagConfig.pageStartTime,a="?site="+(a==lpMTagConfig.lpNumber?b:lpMTagConfig.lpNumber)+"&d_id="+lpMTagConfig.deploymentID+"&default=simpleDeploy",lpAddMonitorTag(lpMTagConfig.deploymentConfigPath!=null?lpMTagConfig.lpProtocol+"://"+lpMTagConfig.deploymentConfigPath+a:lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpTagSrv+"/visitor/addons/deploy2.asp"+a),lpMTagConfig.pluginsLoaded=!0};
function lpAddMonitorTag(a){if(!lpMTagConfig.lpTagLoaded){if(typeof a=="undefined"||typeof a=="object")a=lpMTagConfig.lpMTagSrc?lpMTagConfig.lpMTagSrc:lpMTagConfig.lpTagSrv?lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpTagSrv+"/hcp/html/mTag.js":"/hcp/html/mTag.js";a.indexOf("http")!=0?a=lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpServer+a+"?site="+lpMTagConfig.lpNumber:a.indexOf("site=")<0&&(a+=a.indexOf("?")<0?"?":"&",a=a+"site="+lpMTagConfig.lpNumber);var b=document.createElement("script");b.setAttribute("type",
"text/javascript");b.setAttribute("charset","iso-8859-1");b.setAttribute("src",a);document.getElementsByTagName("head").item(0).appendChild(b)}}window.attachEvent?window.attachEvent("onload",lpMTagConfig.loadTag):window.addEventListener("load",lpMTagConfig.loadTag,!1);
function lpSendData(a,b,c){if(arguments.length>0)lpMTagConfig.vars=lpMTagConfig.vars||[],lpMTagConfig.vars.push([a,b,c]);if(typeof lpMTag!="undefined"&&typeof lpMTagConfig.pluginCode!="undefined"&&typeof lpMTagConfig.pluginCode.simpleDeploy!="undefined"){var d=lpMTagConfig.pluginCode.simpleDeploy.processVars();lpMTag.lpSendData(d,!0)}}function lpAddVars(a,b,c){lpMTagConfig.vars=lpMTagConfig.vars||[];lpMTagConfig.vars.push([a,b,c])};
function didLiveChat()
{ try
    {
        var holdStr = document.location.href;
        holdStr = holdStr.substring(holdStr.length, holdStr.lastIndexOf('/') + 1); 
        holdStr = (holdStr.lastIndexOf('?') > 0) ? holdStr.substring(0, holdStr.lastIndexOf('?')) : holdStr; 
        holdStr = (holdStr.lastIndexOf('#') > 0) ? holdStr.substring(0, holdStr.lastIndexOf('#')) : holdStr;
        createCookie("clickToChatPage",holdStr,"3");
   }
    catch(e){}
}
;