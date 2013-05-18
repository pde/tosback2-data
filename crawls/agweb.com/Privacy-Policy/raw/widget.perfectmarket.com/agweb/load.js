var _pmep = 'http://widget.perfectmarket.com/';var _pmep_geo = 'http://geo.perfectmarket.com/';var _pmpmk = 'agweb/pmk-1.14.js';var _pmsb = false;var bbVer = getBBVersion();
if (bbVer == null || parseInt(bbVer) > 5) {
var pm_ppy="agweb";
var pmk,pmglb,pmfa,pmad,pmdebug_c;pmglb=pmglb||null;pmfa=pmfa||null;pmad=pmad||null;pmdebug_c=pmdebug_c||null;pmk=pmk||null;
var _pmenv = getUrlParameter('pmenv');
if(_pmenv && _pmenv == 'sandbox' && !_pmsb) {_pmep=_pmep.replace('http://widget.perfectmarket.com', 'http://widget.sandbox.perfectmarket.com');_pmep_geo=_pmep_geo.replace('http://geo.perfectmarket.com', 'http://geo.sandbox.perfectmarket.com');var d = new Date();var rand = d.getTime();_pmpmk=pm_ppy+"/load.js?"+rand;}

(function(){
  var sc='script',doc=document;
  doc.writeln('<'+sc+' src='+_pmep+_pmpmk+'></'+sc+'>');
})();

function pmws_request_done(){
  var sc="script",doc=document;
  if (doc.all && !window.opera){doc.write('<'+sc+' type="text/javascript" id="pm_contentloadtag" defer="defer" src="javascript:void(0)"><\/'+sc+'>');var pm_contentloadtag = doc.getElementById("pm_contentloadtag");if(pm_contentloadtag)pm_contentloadtag.onreadystatechange = function() { if (this.readyState=="complete") return; } }
  pmglb.loadFile(_pmep+_pmpmk);
}
}
function getBBVersion() {
    var ua = navigator.userAgent,ver=null,vp,splitUA;
    if (ua.indexOf("BlackBerry") >= 0) {if (ua.indexOf("Version/") >= 0) {vp = ua.indexOf("Version/") + 8;ver = ua.substring(vp, vp + 3);}else {splitUA = ua.split("/"); ver = splitUA[1].substring(0, 3);}}
    return ver;
}
function getUrlParameter(name) {var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);return match && decodeURIComponent(match[1].replace(/\+/g, ' '));}


