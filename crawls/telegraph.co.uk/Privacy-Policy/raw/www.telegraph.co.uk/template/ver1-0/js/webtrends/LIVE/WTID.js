var gDomain="webtrends.telegraph.co.uk";
var gDcsId="dcsshgbi400000gscd62rrg43_4o2o";
var gFpcDom=".telegraph.co.uk"

var gFpc="WT_FPC";
var gConvert=true;

if ((typeof(gConvert)!="undefined")&&gConvert&&(document.cookie.indexOf(gFpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){
	document.write("<SCR"+"IPT TYPE='text/javascript' SRC='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+"/"+gDcsId+"/wtid.js"+"'><\/SCR"+"IPT>");
}
