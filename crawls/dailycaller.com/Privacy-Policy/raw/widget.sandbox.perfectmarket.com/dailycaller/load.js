var pmep = 'http://widget.sandbox.perfectmarket.com/';var bbVer = getBBVersion();
if (bbVer == null || parseInt(bbVer) > 5) {
var pm_ppy="dailycaller";
var pmk,pmglb,pmfa,pmad,pmdebug_c;pmglb=pmglb||null;pmfa=pmfa||null;pmad=pmad||null;pmdebug_c=pmdebug_c||null;pmk=pmk||null;

(function(){
  var sc='script',doc=document;
  doc.writeln('<'+sc+' src="http://widget.sandbox.perfectmarket.com/dailycaller/pmk-1.4.js"></'+sc+'>');
})();

function pmws_request_done(){
  var sc="script",doc=document;
  if (doc.all && !window.opera){doc.write('<'+sc+' type="text/javascript" id="pm_contentloadtag" defer="defer" src="javascript:void(0)"><\/'+sc+'>');var pm_contentloadtag = doc.getElementById("pm_contentloadtag");if(pm_contentloadtag)pm_contentloadtag.onreadystatechange = function() { if (this.readyState=="complete") return; } }
  doc.writeln('<'+sc+' src="http://widget.sandbox.perfectmarket.com/dailycaller/pmk-1.4.js"></'+sc+'>');
}

}
function getBBVersion() {
    var ua = navigator.userAgent,ver=null,vp,splitUA;
    if (ua.indexOf("BlackBerry") >= 0) {if (ua.indexOf("Version/") >= 0) {vp = ua.indexOf("Version/") + 8;ver = ua.substring(vp, vp + 3);}else {splitUA = ua.split("/"); ver = splitUA[1].substring(0, 3);}}
    return ver;
}
