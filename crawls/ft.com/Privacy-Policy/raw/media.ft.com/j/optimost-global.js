
var opModulesArray=new Array();var opContentUrls=new Array();if(opSecureDomain&&opNormalDomain)
{function opGetCookie(cName){if(typeof optimost=='object'){for(n in optimost.C)if(n==cName)return optimost.C[n];}return null;}
function opSetCookie(n,v,d){document.cookie=n+"="+escape(v)+";path=/"+((d==null)?"":(";domain="+d));}
var opCookieDomain='.ft.com';if(document.domain.toString().indexOf('.ft.com')==-1){opCookieDomain=document.domain.toString();}
var opLiveURL='/es/553/c/31/u/FT_live.js';var opQaURL='/es/553/c/31/u/FT_staging.js';var opThisURL=document.location.toString();var opURLArray=opThisURL.split('//');var opProtocol=opURLArray[0];if(opProtocol=='https:'){opLiveURL=opSecureDomain+opLiveURL;opQaURL=opSecureDomain+opQaURL;}
else{opLiveURL=opNormalDomain+opLiveURL;opQaURL=opNormalDomain+opQaURL;}
var opJsURL=opLiveURL;if(opThisURL.indexOf('opglobalqa=true')!=-1){opSetCookie('opglobalqa','true',opCookieDomain);var opGlobalQa=true;}else if(opThisURL.indexOf('opglobalqa=false')!=-1){opSetCookie('opglobalqa','false',opCookieDomain);var opGlobalQa=false;}else var opGlobalQa=(opGetCookie('opglobalqa')=='true');if(opGlobalQa)opJsURL=opQaURL;document.write('<'+'script type="text/javascript" src="'+opJsURL+'"></'+'script>\n');}