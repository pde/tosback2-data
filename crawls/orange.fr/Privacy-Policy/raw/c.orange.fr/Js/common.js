var gs_d=new Date,DoW=gs_d.getDay();gs_d.setDate(gs_d.getDate()-(DoW+6)%7+3);var ms=gs_d.valueOf();gs_d.setMonth(0);gs_d.setDate(4);var gs_r=(Math.round((ms-gs_d.valueOf())/6048E5)+1)*gs_d.getFullYear();
var gs_p = (("https:" == document.location.protocol) ? "https://" : "http://");
document.write(unescape("%3Cscript src='" + gs_p + "s.gstat.orange.fr/lib/gs.js?"+gs_r+"' type='text/javascript'%3E%3C/script%3E"));
bLoadTimeTDone = false;
function LoadingTimeTracker(poLoadTimeJalon, pbGetSize){
this.JTYPE=new Array('tavpub','tpubdelay','tfloatation','timehtml', 'timeTotal');
this.loadTimeJalon = poLoadTimeJalon;
this.startTime=this.loadTimeJalon.startTime.oDate;
this.bGetSize = pbGetSize || false;
this.sAcces = this.loadTimeJalon.sAcces || 'NC'; 
this.sAPP = this.loadTimeJalon.sAPP || 'NC'; 
this.sUrlImg = 'http://z.woopic.com/z.gif';
this.getDuration=function (marqueur,marqueurCompare)
{
var duree = 0;
if (marqueurCompare != null  && marqueurCompare != "")
{
duree = marqueur.getTime() - marqueurCompare.getTime();
}else{
duree = marqueur.getTime() - this.startTime.getTime();
}
return duree;
}
this.sendInfos=function()
{
this.loadTimeJalon['timeTotal'] = {"oDate":new Date()};
var queryString = "APP="+this.sAPP+"&acces="+this.sAcces;
for (var i=0;i<this.JTYPE.length;i++){
if(this.loadTimeJalon[this.JTYPE[i]] != null && this.loadTimeJalon[this.JTYPE[i]].oDate)
{
marqueurCompare=this.loadTimeJalon[this.JTYPE[i]].oDateCompare || null;
try { queryString+='&'+this.JTYPE[i]+'='+this.getDuration(this.loadTimeJalon[this.JTYPE[i]].oDate, marqueurCompare); } catch(e) {queryString+='&'+this.JTYPE[i]+'=0';}
}else{
queryString+='&'+this.JTYPE[i]+'=0';
}
}
if(this.bGetSize)
{
if (document.all){
queryString += "&size=|" +parseInt(document.body.clientWidth) + "|" +  parseInt(document.body.clientHeight)+"|M|"+ parseInt(screen.width) + "|" + parseInt(screen.height);
} else {
queryString += "&size=|" + window.innerWidth + "|" + window.innerHeight + "|N|" + window.outerWidth + "|" + window.outerHeight ;
}
}
document.getElementById("timeQOS").innerHTML += "<img src='"+this.sUrlImg+"?"+queryString+ "' width=10 height=10 alt='' title=''><br>";
bLoadTimeTDone = true;
}
}
function chargerJS(fichier){
o_loadJS(fichier);
}
function o_loadJS(fichier){
if(document && document.appendChild && document.getElementsByTagName && document.createElement) { 
var headID = document.getElementsByTagName("head")[0];
var jsNode = document.createElement('script');
jsNode.type = 'text/javascript';   
jsNode.src = fichier;
headID.appendChild(jsNode);  
}
}
function o_getProfile(sOption){
var sOpt = (typeof sOption == "undefined") ? null : sOption;
var bLoadWunderLoop = true;
var bLoadMediation = true;
switch(sOpt){
case 'mediationOnly' :
bLoadWunderLoop = false;
break;
default :
bLoadWunderLoop = true;
bLoadMediation = true;
break;
}
if(bLoadWunderLoop){
o_getWunderloop();
}
if(bLoadMediation){
o_loadJS("http://ap.read.mediation.pns.ap.orangeads.fr/1.0.0/fr/AnonPM/get_ap");
}
}
function o_getWunderloop(){
var wunderloop_doit = 1; 
if (wunderloop_doit){
o_appelWunderloop();
}
}
function o_appelWunderloop(){
ord=Math.random()*10000000000000000;
o_loadJS("http://rc.production.orangeads.fr/Get/orangefr/JS/GetRcmd.js?d="+ord);
}
function o_wousdat(iWousdatZone,sGetUrl){
var sWousdat = "<scr" + "ipt type='text/javascript' src='"+document.location.protocol+"//i5.woopic.com/TB/Js/wousdat.js?12'></scr" + "ipt>";
if (typeof iWousdatZone != "undefined" && document.getElementById(iWousdatZone)) {document.getElementById(iWousdatZone).innerHTML = sWousdat;}
else {o_wousdatIframe(sGetUrl);}
}
function o_wousdatIframe(sGetUrl){
var wousdat_on  = 1;
var wousdat_id = 14;
var wousda_host = 'orange.weborama.fr';
var wous_frame=document.createElement("IFRAME");
wous_frame.setAttribute('id','wousIframe');
wous_frame.style.border='0px';
wous_frame.style.width='0px';
wous_frame.style.height='0px';      
if (wousdat_on)
{
if (document.cookie.indexOf('wousdat_profil=')==-1)
{ 
document.cookie='wbo_ok=1; path=/; ';
if (document.cookie.indexOf('wbo_ok=1')>=0)
{  
wous_frame.src = 'http://'+wousda_host+'/fcgi-bin/wousbounce.fcgi?WOUSDAT_ID='+wousdat_id+'&rnd='+parseInt(1000000000*Math.random())+'&ids=1';
}
if (typeof(sGetUrl)!="undefined")
{
wous_frame.src += '&url=http://'+sGetUrl;
}
if(document && document.appendChild && document.body) { 
IFrameObj =document.body.appendChild(wous_frame);
}
}
}
}
function o_sGetVarPub(bWassup, bWunderloop, bWeborama, bMediation){
var sWassup = "";
var sWunderloop = "";
var sWeborama = "";
var sWassupEx = "";
var sMediation = "";
var sPubExtra = "";
if (bWassup) {
if (typeof o_idzone != "undefined") {
for (var i = 0; i < 4; i++) {
var n = "PUBPERSO_VAR" + (i + 1);
var v = "";
try {
v = o_idzone[n].toString();
} 
catch (e) {
v = null;
}
if (v != null) 
sWassup += "var" + (i + 1) + "=" + v + ";";
else 
sWassup += "var" + (i + 1) + "=;";
}
for (var i = 0; i < 6; i++) {
var n = "USER_OSDAT_VAR" + (i + 1);
var v = "";
try {
v = o_idzone[n].toString();
} 
catch (e) {
v = null;
}
if (v != null) 
sWassupEx += "var" + (i + 21) + "=" + v + ";";
else 
sWassupEx += "var" + (i + 21) + "=;";
}
try {
v = o_idzone["PUBPERSO_VAR5"];
} 
catch (e) {
v = false;
}
if (v != null && !v) {
sWassup = "var1=;var2=;var3=;var4=;";
sWassupEx = "var21=;var22=;var23=;var24=;var25=;var26=;";
}
try {
v = o_idzone["USER_OSDAT_EXTRA"].toString();
} catch (e){
v = null;
}
if(v != null){
sPubExtra = v + ";";
}
}
else {
sWassup = "var1=;var2=;var3=;var4=;";
sWassupEx = "var21=;var22=;var23=;var24=;var25=;var26=;"
}
}
if (bWunderloop) {
var reWunderLoop = /[^\w\d,;]/;
if (typeof wlrcmd != "undefined" && false == reWunderLoop.test(wlrcmd.toString())) {
var aWlrcmd = wlrcmd.split(",");
for (var i = 0; i < aWlrcmd.length; i++) {
sWunderloop += "var7=" + aWlrcmd[i] + ";";
}
}
else 
var sWunderloop = "var7=;";
}
if (bWeborama) {
aValWeborama = o_recupWeborama(4);
sWeborama = "var8=" + aValWeborama[0] + ";var9=" + aValWeborama[1] + ";var10=" + aValWeborama[2] + ";" + aValWeborama[3];
}
else {
sWeborama = "var8=;var9=;var10=;var11=;";
}
var sProfil = "";
if (bMediation) {
if (typeof o_sDataMediation != "undefined"){
var varNstart = 29; 
var aMediation = o_sDataMediation.split(";");
var nMediationMax = aMediation.length;
if(nMediationMax > 0){
sPubApId = aMediation[0];
}
if (nMediationMax > 1) {
for (var i = 1; i < nMediationMax; i++) {
if(aMediation[i] != ""){
var aMediationI = aMediation[i].split(",");
var nMaxMediationI = aMediationI.length;
if(nMaxMediationI > 1){
for(var j = 0; j < nMaxMediationI; j++){
sProfil += ["var", varNstart + i, "=", aMediationI[j], ";"].join("");
}
}else {
sProfil += ["var", varNstart + i, "=", aMediation[i], ";"].join("");
}
}
}
}
}
}
sVarPub = sWassup + sWassupEx + sWeborama + sProfil + sPubExtra + sWunderloop;
if (o_sExtractVar('pubperso') == 'ok') window.status = sVarPub;
return sVarPub;
} 
function o_sCompressVarPub(sVar){
var varValuePattern = /(var\d*)=([a-zA-Z0-9_\-\.,]*)/i;
var aVarPerso = sVar.split(";")
var nMaxPerso = aVarPerso.length;
var sPerso = '';
var oCompress = {};
for(var i = 0; i < nMaxPerso; i++){
if (aVarPerso[i] != '') {
var aNvalue = varValuePattern.exec(aVarPerso[i]);
if(null != aNvalue){
var k = aNvalue[1];
var v = aNvalue[2];
if(v != "" && typeof v != "undefined"){
if(typeof(oCompress[k]) == "undefined"){
oCompress[k] = v;
} else {
oCompress[k] += [",", v].join("");
}
}
}
}
}
for(var j in oCompress){
sPerso += [j.replace("var",""), "=", oCompress[j], "|"].join("");
} 
var nPersoLength = sPerso.length;
if(nPersoLength > 0){
if(sPerso.substring(nPersoLength, (nPersoLength - 1)) == "|"){
sPerso = sPerso.slice(0, -1);
}
}
return sPerso;
} 
var sPubApId = "";
var sPubVar = "";
var sUField = "";
var sPubVarComp = "";
function o_formatVarPub(sGetVarsPub){
sPubVar = sGetVarsPub;
sPubVarComp = o_sCompressVarPub(sPubVar);
sUField = ["u=id=", sPubApId, "|", sPubVarComp, "||;"].join("");
}
$listenerCommon = {};
$listenerCommon.add  = function(objdom,typeofevent,func){ if(objdom.addEventListener){objdom.addEventListener(typeofevent,func,false);} else{objdom['e'+ typeofevent + func] = func;objdom[typeofevent + func] = function(){objdom['e'+ typeofevent + func](window.event);};objdom.attachEvent('on'+ typeofevent, objdom[typeofevent + func]);}}
$listenerCommon.remove = function(objdom,typeofevent,func){ if(objdom.removeEventListener){objdom.removeEventListener(typeofevent,func,false);} else{objdom.detachEvent('on'+ typeofevent, objdom[typeofevent + func]);objdom[typeofevent + func] = null;}}
o_aGenreWeborama = new Array("w","h","f");
o_aGenreOrange  = new Array("0","1","2");
o_aAgeWeborama  = new Array("x","a","b","c","d");
o_aAgeOrange  = new Array("0","1","2","3","4");
o_aCspWeborama  = new Array("y","p","m","e","r");
o_aCspOrange  = new Array("0","1","2","3","4");
o_aInteretWeborama = new Array();
o_aInteretOrange = new Array();
o_aWeborama = new Array(o_aGenreWeborama,o_aAgeWeborama,o_aCspWeborama,o_aInteretWeborama);
o_aOrange = new Array(o_aGenreOrange,o_aAgeOrange,o_aCspOrange,o_aInteretOrange);
function o_changeAllLinks(iBalise,sTarget,bOnChgForm) {
try {
var aElement = new Array();
if (iBalise == null) aElement.push(window.document);
else if (typeof iBalise == "string") aElement.push(iBalise);
else if (typeof iBalise == "object" && typeof iBalise.length != "undefined") aElement = iBalise;
else aElement.push(window.document);
if (typeof sUrlReferrer == 'undefined') window.sUrlReferrer = document.location.host.replace(".orange.fr","");
if (typeof sTarget == "undefined" || sTarget == null) sTarget = "_self";
if (typeof bOnChgForm == "undefined" || bOnChgForm == null) bOnChgForm = false;
if (o_sExtractVar('displayRef') == "ok" ) var bDisplayRef = true;
else var bDisplayRef = false;
for (var i=0; i < aElement.length; i++) {
if (typeof aElement[i] == "string") o_scanTreeForChangeUrls(document.getElementById(aElement[i]), null, sTarget, bOnChgForm,bDisplayRef);
else o_scanTreeForChangeUrls(aElement[i], null, sTarget, bOnChgForm,bDisplayRef);
}
return true;
} catch( e ) {}
}
function o_changeImgForGstat(refGstat) {
if (o_hGetById("ImgForGstat")) {
var rnd = Math.round(Math.random()*10000000000);
document.images.ImgForGstat.src="http://r.orange.fr/r?ref="+refGstat+"&url=http%3A//c.orange.fr/z.gif?"+rnd;
}
return true;  
}
function ref_in_string(str) {
var ind= str.indexOf("o_r_");
if (ind>=0) {
var sub= str.substr((ind+4));
ind= sub.indexOf(" ");
if (ind>=0)
sub= sub.substr(0,ind);
return sub.toLowerCase();
}
else 
return false;
}
function o_scanTreeForChangeUrls(o_rNode, hasAddRef, sTarget, bOnChgForm, bDisplayRef) {
try{
if (typeof sUrlReferrer == 'undefined') window.sUrlReferrer = document.location.host.replace(".orange.fr","");
if (o_rNode == null || typeof(o_rNode) != "object") return;                                               
if (o_rNode.getAttribute) {
if ((o_rNode.className!="") && (ref= ref_in_string(o_rNode.className))){
if (ref==="notchanged") return;
if (hasAddRef != null) hasAddRef += "_" + ref;
else hasAddRef = ref;
} else  
if (o_rNode.getAttribute("addRef")){
if (hasAddRef != null) hasAddRef += "_" + o_rNode.getAttribute("addRef");
else hasAddRef = o_rNode.getAttribute("addRef");
}
}
if ( o_rNode.childNodes ) {  
for(var i=0; i<o_rNode.childNodes.length; i++) 
{ o_scanTreeForChangeUrls( o_rNode.childNodes[i], hasAddRef, sTarget, bOnChgForm, bDisplayRef ); }
}
var goodUrlReferrer = hasAddRef;
if (o_rNode.tagName == null) return;
var sTagName = o_rNode.tagName.toUpperCase();
if (sTagName != "A" && sTagName != "LINK" && o_rNode.getAttribute('href',4)){
$listenerCommon.add(o_rNode,"mouseover", function(e){
this.style.textDecoration = "underline";
this.style.cursor = "pointer";
});
$listenerCommon.add(o_rNode,"mouseout", function(e){
this.style.textDecoration = "none";
});
$listenerCommon.add(o_rNode,"click", function(e){
if (this.getAttribute('target') == "_blank" || bDisplayRef){
window.open(o_changeOneUrl(this.getAttribute('href',4), goodUrlReferrer,this.getAttribute("noWG"), bDisplayRef ));
} else {
top.location.href = o_changeOneUrl(this.getAttribute('href',4), goodUrlReferrer,this.getAttribute("noWG"), bDisplayRef );
}
});
}
if (sTagName == "A" && o_rNode.href) {                                               
if (! o_rNode.getAttribute("notChanged")){
if (!o_rNode.target) o_rNode.target = sTarget;
if (bDisplayRef){
o_rNode.href = o_changeOneUrl( o_rNode.href, goodUrlReferrer,o_rNode.getAttribute("noWG"), bDisplayRef );
} else {
$listenerCommon.add(o_rNode,"mouseup", function(e){
this.href = o_changeOneUrl( this.href, goodUrlReferrer,this.getAttribute("noWG"), bDisplayRef );
});
}
}
} else if (sTagName == "FORM" && o_rNode.action && bOnChgForm) {                                   
if (! o_rNode.getAttribute("notChanged")) o_rNode.action = o_changeOneUrl( o_rNode.action, goodUrlReferrer,o_rNode.getAttribute("noWG"),bDisplayRef);
}
return true;
} catch (e) {}
}
function o_changeOneUrl(sUrl,sUrlRef,bNoWG,bDisplayRef){
if (typeof bDisplayRef == "undefined") {
if (o_sExtractVar('displayRef') == "ok" ) var bDisplayRef = true;
else var bDisplayRef = false;
}
var sOldUrl = sUrl, sRef = "";
if (typeof bNoWG == "undefined") var bNoWG = false;
if (typeof window.o_bNoFrameCGI == "undefined") var o_bNoFrameCGI = false;
else var o_bNoFrameCGI = window.o_bNoFrameCGI;
if (typeof window.o_bNoWalledGarden == "undefined") var o_bNoFrameCGI = false;
else var o_bNoFrameCGI = window.o_bNoWalledGarden;
var o_bNoFrameCGI = false; 
var sFrameCgiUrl = "http://www.orange.fr/bin/frame.cgi"; 
if (!bNoWG && (sUrl.substring(0,sFrameCgiUrl.length) != sFrameCgiUrl) && (sUrl.indexOf("http://r.orange.fr") == -1) && (sUrl.indexOf(".orange.fr") > 0 || sUrl.indexOf(".wanadoo.fr") > 0) && (sUrl.indexOf("http://externe") ==-1) && (sUrl.indexOf("http://www.orange.fr") ==-1) && (sUrl.indexOf(".dev.orange.fr") ==-1) && (sUrl.indexOf("fluxlc.orange.fr") == -1) && (sUrl.indexOf("lr.voyages.orange.fr") == -1) && (sUrl.indexOf("meetic.orange.fr") == -1) && (sUrl.indexOf("ulteem.orange.fr") == -1) && (sUrl.indexOf("lr.voyages.orange.fr") == -1) && (sUrl.indexOf("meetic.orange.fr") == -1) && (sUrl.indexOf("ulteem.orange.fr") == -1)){ 
if (o_bNoFrameCGI) sUrl = sFrameCgiUrl + "?u="+escape(sUrl);
}
var sAddRef = o_sExtractVar('addRef',sUrl);
if (sAddRef != null){
sUrlRef = sAddRef;
nAddRefPos = sUrl.indexOf('addRef');
sUrl = sUrl.substring(0,nAddRefPos-1); 
}
sUrlRef = (sUrlRef == null ? sUrlReferrer : sUrlReferrer + "_" + sUrlRef);              
if (sUrl.substring(0, 20) == "http://r.orange.fr/r") { 
if (sUrl.indexOf('ref=') == -1){
var nPosInterrogation = sUrl.indexOf("?");
if (nPosInterrogation > -1){
sUrl = sUrl.substring(0, nPosInterrogation+1);
if (bDisplayRef) sUrl += "test=ok&";
sUrl += "ref=" + sUrlRef + "&" + sUrl.substring(nPosInterrogation+1, sUrl.length);
} else {
if (bDisplayRef) sUrl += "?test=ok&ref=" + sUrlRef;
else sUrl += "?ref=" + sUrlRef;
}
}
} else if (sUrl.indexOf('wanadooregie') != -1) {
} else if (sUrl.indexOf('externe.shopping.orange.fr') != -1  || sUrl.indexOf('ads-click') != -1 || sUrl.indexOf('doubleclick') != -1 ||  sUrl.indexOf('fluxlc') != -1 ||  sUrl.indexOf('fluxlr') != -1 ||  sUrl.indexOf('mediaplex') != -1) {
var nPosRef = sUrl.indexOf("?ref=");
if (nPosRef > -1) {
var sRef = escape(sUrl.substring(nPosRef+1, sUrl.length));
sUrl = escape(sUrl.substring(0, nPosRef));
if (bDisplayRef) sUrl = "http://r.orange.fr/r?test=ok&ref=" + sRef + "&url=" + sUrl;
else sUrl = "http://r.orange.fr/r?ref=" + sRef + "&url=" + sUrl;
} else {
var sOldUrl = escape( sUrl );
if (bDisplayRef) sUrl = "http://r.orange.fr/r?test=ok&ref=" + sUrlRef + "&url=" + sOldUrl;
else sUrl = "http://r.orange.fr/r?ref=" + sUrlRef + "&url=" + sOldUrl;
}
} else {
var nPosRef = sUrl.indexOf("?ref=");
if (nPosRef > -1) {
var sRef = escape(sUrl.substring(nPosRef+1, sUrl.length));
sUrl = escape(sUrl.substring(0, nPosRef));
} else {
var sOldUrl = escape(sUrl);
if ((sUrl.indexOf("javascript") ==-1)){
if (bDisplayRef) sUrl = "http://r.orange.fr/r?test=ok&ref=" + sUrlRef + "&url=" + sOldUrl;
else sUrl = "http://r.orange.fr/r?ref=" + sUrlRef + "&url=" + sOldUrl;
}
}
}
return sUrl; 
}
function o_scale()  
{  
var resizeList = o_scale.arguments; 
for (i=0;i<resizeList.length;i++) 
{ 
var x = resizeList[i];
var o_sWidthMax = null;
var o_sWidthMin = null;
if (typeof x != 'undefined')  
{
re = /\s*(\w*)\s\:(.*)/;
if( re.test(x))
{
re.exec( x);
element = RegExp.$1;
x = RegExp.$2;
OptionArray = x.split(';');
re = /\s*(\w*)\s*=\s*(.*)\s*/;
for (opt in OptionArray) 
{
var thisone = OptionArray[opt];
if( re.test(thisone))
{
re.exec(thisone);
try { eval("var " + RegExp.$1 + " = '" + RegExp.$2 + "';"); } catch (e){}
}
}
}
else
{
element = x;
}
}
if (document.body != null && document.body.clientWidth >= 999) 
{
if(o_sWidthMax == null)
{
o_sWidthMax = "991px";
}
if((typeof document.getElementById(element) != 'undefined') && o_hGetById(element))
{
document.getElementById(element).style.width = o_sWidthMax;
}
} 
else   
{ 
if(o_sWidthMin == null)
{
o_sWidthMin = "780px";
}
if((typeof document.getElementById(element) != 'undefined') && o_hGetById(element))
{ 
document.getElementById(element).style.width = o_sWidthMin;
} 
} 
} 
}
function o_show()
{  
var sResizeList = o_show.arguments; 
for (i=0; i < sResizeList.length; i++) 
{ 
var sElmt = sResizeList[i]; 
if(document.body != null && document.body.clientWidth>=999)
{   
document.getElementById(sElmt).style.display = 'block'; 
} 
else 
{    
document.getElementById(sElmt).style.display = 'none'; 
} 
} 
} 
var o_aOnLoad = new Array(); 
var o_aOnResize = new Array(); 
var o_aOnUnLoad = new Array(); 
function o_onLoadPush ( o_sFctLst_onLoad )
{
o_aOnLoad.push ( o_sFctLst_onLoad );
}
function o_onResizePush ( o_sFctLst_onResize )
{
o_aOnResize.push ( o_sFctLst_onResize );
}
function o_onUnLoadPush ( o_sFctLst_onUnLoad )
{
o_aOnUnLoad.push ( o_sFctLst_onUnLoad );
}
function o_bodyOnLoad ()  
{
for ( var i = 0 ; i < o_aOnLoad.length ; i++ ) 
{
try { eval( o_aOnLoad[i] ); } catch (e){}
}
} 
function o_bodyOnResize ()  
{ 
for ( var i = 0 ; i < o_aOnResize.length ; i++ ) 
{
try { eval( o_aOnResize[i] ); } catch (e){}
}
}
function o_bodyOnUnLoad ()  
{ 
for ( var i = 0 ; i < o_aOnUnLoad.length ; i++ ) 
{
try { eval( o_aOnUnLoad[i] ); } catch (e){}
}
} 
window.onload = o_bodyOnLoad; 
window.onresize = o_bodyOnResize; 
window.onunload = o_bodyOnUnLoad;
function o_footer(options) 
{ 
var str_footer = ""; 
if ( (typeof options != 'undefined') && (options.indexOf('=') != -1) ) { 
OptionArray = options.split(','); 
re = /\s*(\w*)\s*=\s*(.*)\s*/; 
for (opt in OptionArray) { 
var thisone = OptionArray[opt]; 
re.exec(thisone); 
if (RegExp.$1 && RegExp.$1 != '' && RegExp.$2 && RegExp.$2 != '' && RegExp.$1.indexOf(' ') == -1 ){
try {
eval("var " + RegExp.$1 + " = '" + RegExp.$2 + "';");  
} catch (e){}
}
} 
} 
if ((typeof type == 'undefined') || (type == '')) var type = 'footer';
if ((typeof bgcolor == 'undefined')) var bgcolor = '';
newPays = var_pays();
switch (type) 
{ 
case "footer": 
str_footer += '<script type="text/javascript">';
str_footer += 'if (typeof _gstat != "undefined") _gstat.audience();';
str_footer += '</script>';
str_footer +="<div id='o_footer' class='resize "+bgcolor+"'>";
str_footer += "<ul id='o_footer_lgn1' class='footer'>";
str_footer += "<li id='o_footer_logo' class='logo'>&nbsp;</li>";
str_footer += '<li><a class="withRightBorder" href="http://r.orange.fr/r/Ohome_aproposdorange'+newPays+'" target="_blank" title="Orange en France (nouvelle fen&ecirc;tre)">Orange en France</a></li>';
if(newPays == "_reu"){
str_footer += '<li><a class="withRightBorder" href="http://reunion.orange.fr/publicite" target="_blank" title="publicit&eacute; (nouvelle fen&ecirc;tre)">publicit&eacute;</a></li>';
}else{
str_footer += '<li><a class="withRightBorder" href="http://r.orange.fr/r/Eorangepublicite" target="_blank" title="publicit&eacute; (nouvelle fen&ecirc;tre)">publicit&eacute;</a></li>';
}
str_footer += '<li><a class="withRightBorder" href="http://r.orange.fr/r/Ohome_donneespersonnelles" target="_blank" title="Donn&eacute;es personnelles (nouvelle fen&ecirc;tre)">donn&eacute;es personnelles</a></li>';
str_footer += '<li><a class="withRightBorder" href="http://r.orange.fr/r/Ohome_environnement" target="_blank" title="environnement (nouvelle fen&ecirc;tre)">environnement</a></li>';
if(newPays == "_reu"){
str_footer += '<li><a class="withRightBorder" href="http://reunion.orange.fr/infoslegales" target="_blank" title="informations l&eacute;gales (nouvelle fen&ecirc;tre)">informations l&eacute;gales</a></li>';
}else{
str_footer += '<li><a class="withRightBorder" href="http://r.orange.fr/r/Oinfoslegales_vis'+newPays+'" target="_blank" title="informations l&eacute;gales (nouvelle fen&ecirc;tre)">informations l&eacute;gales</a></li>';
}
str_footer += '<li><a class="withRightBorder" href="http://r.orange.fr/r/Einternetplus" target="_blank" title="internet + (nouvelle fen&ecirc;tre)">internet +</a></li>'
str_footer += '<li><a class="withRightBorder" href="http://r.orange.fr/r/Esignaler" target="_blank" title="signaler un contenu illicite (nouvelle fen&ecirc;tre)">signaler un contenu illicite</a></li>';
str_footer += '<li><a href="http://r.orange.fr/r/Eafa" target="_blank" title="AFA protection de l\'enfance (nouvelle fen&ecirc;tre)">AFA protection de l\'enfance</a></li>';
str_footer += "</ul>";
str_footer += "<div id='o_footer_lgn2' >";
str_footer += "<a href='http://r.orange.fr/r/Enetplussur' target='_blank' title='Net plus s&ucirc;r (nouvelle fen&ecirc;tre)'>";
str_footer += "<img src='"+document.location.protocol+"//c.orange.fr/Icons/Footer/logoNetSur"+bgcolor+".gif' width='28' height='28' alt='Net plus s&ucirc;r' title='Net plus s&ucirc;r' width='3%'/>";
str_footer += "</a>";
str_footer += "</div>";
str_footer += "</div>";
break; 
case "footer_ow": 
str_footer += '<script type="text/javascript">';
str_footer += 'if (typeof _gstat != "undefined") _gstat.audience();';
str_footer += '</script>';
str_footer += "<div id='o_footer_ow' width=106><a href=javascript:window.close();><img src='"+document.location.protocol+"//c.orange.fr/Icons/o_close.gif' width=11 height=11 hspace=4 align=absmiddle border=0>Fermer la fen&ecirc;tre</a></div>"; 
break; 
default: 
break; 
}
if (typeof idfooter != "undefined" && document.getElementById(idfooter)) document.getElementById(idfooter).innerHTML = str_footer;
else document.write(str_footer);
return true;
}
function o_audience( psup, path, hst , iBlocId )
{
return audience( psup, path, hst , iBlocId )
}
function audience( psup, path, hst , iBlocId ) 
{
var rnd = Math.round(Math.random()*10000000000);
var url = document.location.protocol+"//iapref.orange.fr/track?"; 
if(!hst)  { var hst = window.location.hostname; }
url += "sn=" + escape(hst);
if (document.referrer != '') url += '&h=' + escape(document.referrer);
else url += '&h=0';
if (o_sGetCookie("ty")) url += '&ty=' + o_sGetCookie("ty");
else url += '&ty=0';
if (!path) { var path = window.location.href.substring(window.location.protocol.length+2+window.location.hostname.length); }
url += "&pn=" + escape(path);
if(psup) {
url += "&" + psup;
}
url += "&r=" + rnd;
if (window.bOAudience == null){
if (typeof iBlocId != "undefined" && iBlocId != null){
if (o_hGetById(iBlocId)) o_hGetById(iBlocId).innerHTML = '<img src="'+url+'" width="1" height="1">';
} else {
document.write('<img src="'+url+'" width="1" height="1">');
}
}
window.bOAudience = true;
return true;
}
function o_hGetById(id) 
{
hHandler = (document.getElementById(id))?document.getElementById(id):false;
return hHandler;
}
function o_sExtractVar(sVarName,sLocation) 
{
var sLocation = (typeof sLocation != 'undefined' && sLocation != '')?sLocation:document.location.search;
oRegExp = new RegExp(sVarName + '=([^&]*)', '');
if ( oRegExp.test(sLocation) ) 
{
oRegExp.exec(sLocation);
return RegExp.$1;
}
else 
{
return null;
}
}
function o_getSlctVal(iSel) 
{
var hSel = o_hGetById(iSel);
if (hSel) return hSel.options[hSel.selectedIndex].value;
else return null;
}
function o_nArrayLength(aTab) 
{     
var nlength = 0;
for (var oElement in aTab) 
{
nlength++;
}
return nlength;
}
function o_sReplaceChar(sInitChar,aPrevChar,aNewChar)
{ 
var sReturn = sInitChar;
for (var i in aPrevChar) 
{
while (sReturn.indexOf(aPrevChar[i]) > -1) {
sReturn = sReturn.replace(aPrevChar[i], aNewChar[i]);
}
}
return sReturn;
}
function o_bIsMail(sMail) 
{
oRegExp = /^[\w\.-]+@[\w-]+\.\w+$/;
return oRegExp.test(sMail);
}
var aOpts = new Array();
aOpts['channelmode'] = 0; aOpts['directories'] = 0; aOpts['fullscreen'] = 0; aOpts['location'] = 0; aOpts['menubar'] = 0; aOpts['resizable'] = 0; aOpts['scrollbars'] = 0; aOpts['status'] = 0; aOpts['titlebar'] = 0; aOpts['width'] = 480; aOpts['height'] = 360;
var aSpecOpts = new Array('top', 'left');
var def_wname = 'formpopup';  
function o_popup(sWhat, options) 
{
if ( (typeof options != 'undefined') && (options.indexOf('=') != -1) ) { 
aOption = options.split(',');
oRegExp = /\s*(\w*)\s*=\s*(.*)\s*/; 
for (var opt in aOption) 
{
oRegExp.exec(aOption[opt]);
try { eval("var ow_" + RegExp.$1 + " = '" + RegExp.$2 + "';"); }
catch (e){}
}
}
var sMyKind = "page";  
var aMyOpts = new Array(); 
for (var opt in aOpts) 
{
try {
eval('var bOptFind = (typeof(ow_'+opt+')!="undefined")?true:false;');  
aMyOpts[opt] = bOptFind?eval('ow_'+opt):aOpts[opt];
} catch (e){}
}
for (var opt in aSpecOpts)
{
try {
eval('var bOptFind = (typeof(ow_'+opt+')!="undefined")?true:false;'); 
if (bOptFind) { aMyOpts[opt] = eval('ow_'+opt); }
} catch (e){}
}
if (typeof ow_w != 'undefined') { aMyOpts['width'] = ow_w; }
if (typeof ow_h != 'undefined') { aMyOpts['height'] = ow_h; }
if (typeof ow_t != 'undefined') { aMyOpts['top'] = ow_t; }
if (typeof ow_l != 'undefined') { aMyOpts['left'] = ow_l; }
var sOpt = ''; 
for (var opt in aMyOpts) 
{
sOpt += (sOpt != '')?', '+opt+'='+aMyOpts[opt]:opt+'='+aMyOpts[opt];
}
if ((((typeof ow_isForm == 'undefined') || (ow_isForm == 0)) && (sWhat.indexOf('.') < 0)) || ((typeof ow_isForm != 'undefined') && (ow_isForm == 1))) 
{
sMyKind = "form";
}
if (typeof ow_wname == 'undefined') 
{
var ow_wname = (sMyKind == 'page')?'_blank':def_wname; 
}
if (sMyKind == 'form') 
{
if (ow_wname != '_self') { window.open('', ow_wname, sOpt); }
o_hGetById(sWhat).target = ow_wname;
o_hGetById(sWhat).submit();
} else {
if (ow_wname != '_self') { window.open(sWhat, ow_wname, sOpt); }
}
return true;
}
function o_popupInfoLegales(){
return o_popup('http://r.orange.fr/r/Oinfoslegales_abo','wname = Infos, width=500, height=400');
}
var o_aPrevChar = new Array();
var o_aNewChar = new Array();
function sReplaceCharCookie(sInitChar)
{
if (typeof o_aPrevChar != 'undefined' && typeof o_aNewChar != 'undefined')
{
return o_sReplaceChar(sInitChar,o_aPrevChar,o_aNewChar);
}
else return sInitChar;
}
function o_bSetCookie(sName,sVal,options)
{ 
try {
if ((typeof options != 'undefined') && (options.indexOf('=') != -1))
{
aOption = options.split(',');
oRegExp = /\s*(\w*)\s*=\s*(.*)\s*/;
for (var i=0;i<aOption.length;i++){
oRegExp.exec(aOption[i]);
try {
eval("var o_" + RegExp.$1 + " = '" + RegExp.$2 + "';"); 
} catch (e){}
}
}
sCookieVal = escape(sVal);
sCookieVal = sReplaceCharCookie(sCookieVal);
if (typeof o_expires != 'undefined'){ 
var exdate=new Date();
exdate.setDate(exdate.getDate()+parseInt(o_expires));
}
if (typeof o_expiresHour != "undefined" && !isNaN(o_expiresHour)){
if (typeof exdate == 'undefined') var exdate=new Date();
exdate.setHours(o_expiresHour,0,0,0);
}
document.cookie = sName + "=" + sVal + ((typeof o_domain == 'undefined')?"":";domain="+o_domain) +";path=" + ((typeof o_path == 'undefined')?"/":o_path) + ((typeof exdate == 'undefined')?"":";expires="+exdate.toGMTString());
return true;
} catch (e) {return false; }
}
function o_sGetCookie(sName) 
{
if (document.cookie.length>0) 
{
iStartPos = document.cookie.indexOf(sName + "=");
if (iStartPos != -1) 
{
iStartPos = iStartPos + sName.length+1;
iEndPos = document.cookie.indexOf(";",iStartPos);
if (iEndPos == -1) { iEndPos = document.cookie.length; }
return unescape(document.cookie.substring(iStartPos,iEndPos));
}
}
return false;
}
TruncateString = {}
TruncateString.recursive = function(obj,options){for(var fx in options){switch(typeof(options[fx])){case 'object':TruncateString.recursive(obj[fx],options[fx]);break;default:obj[fx] = options[fx];break;}}}
TruncateString.bySize = function(offset,nMaxSize,sStrTmpOrObject,options){
var type = typeof(sStrTmpOrObject);
switch(type){
case 'string' :
var obj = document.createElement('div');
TruncateString.recursive(obj,{'style':{'position':'absolute','visibility':'hidden'}});
var obj2 = document.createElement('div');
TruncateString.recursive(obj2,options);
obj.appendChild(obj2);
obj.firstChild.innerHTML = sStrTmpOrObject;
document.body.appendChild(obj);
break;
default    :var obj = sStrTmpOrObject;sStrTmpOrObject = obj.innerHTML;break;
}
while(obj['offset'+ offset] > nMaxSize){
sStrTmpOrObject = sStrTmpOrObject.substr(0,sStrTmpOrObject.lastIndexOf(" "));
obj.innerHTML = sStrTmpOrObject + ' ...';
}
if(type == 'string'){
sStrTmp = obj.innerHTML;
document.body.removeChild(obj);
return sStrTmp;
}
};
function sBinaire(iVal){
var sRetour = "";
while (iVal>0){
sRetour = (iVal%2) + sRetour;
iVal = parseInt(iVal/2);
}
return sRetour;
}
function sTraductionWeborama(sVarName,sBinVal,iIndexDecalage){
var bTrouve = false;
var sRetour = "";
var iDebut = sBinVal.length;
for (var i=iDebut-1;i>=0;i--){
if (sBinVal.substr(i,1) == "1"){ 
sRetour += sVarName+"="+(iDebut-i+iIndexDecalage)+";";
bTrouve = true;
}
}
return sRetour;
}
function sTraductionWeborama2(sVarName,sBinVal,iIndexDecalage){
var bTrouve = false;
var sRetour = "";
while (sBinVal.length < iIndexDecalage) sBinVal = "0"+sBinVal;
var iDebut = sBinVal.length;
for (var i=0;i<iIndexDecalage;i++){
if (sBinVal.substr(i,1) == "1"){ 
sRetour += sVarName+"="+(i+1)+";";
bTrouve = true;
}
}
return sRetour;
}
function sTraductionWeborama3(sVarName,sBinVal){
var bTrouve = false;
var sRetour = "";
var aClusters = sBinVal.split(".");
for (var i=0;i<aClusters.length;i++){
sRetour += sVarName+"="+aClusters[i]+";";
bTrouve = true;
}
return sRetour;
}
function o_recupWeborama(iLength){
var aApres = new Array(iLength);
for (var i=0; i < aApres.length; i++) aApres[i] = "";
var sCookie = o_sGetCookie("wousdat_profil");
var sCookieForce = o_sExtractVar('cookie');
if (typeof sCookieForce != "undefined" && sCookieForce != null) sCookie = sCookieForce;
if (!sCookie) return aApres;
var aCookie = sCookie.split("_");
if (aCookie.length > 4){
var sBinaireValueVar11 = sBinaire(aCookie[2]);
var sRetourVar11 = sTraductionWeborama("var11",sBinaireValueVar11,0);
var sBinaireValueVar14 = sBinaire(aCookie[3]);
var sRetourVar14 = sTraductionWeborama2("var14",sBinaireValueVar14,31);
var sBinaireValueVar15 = sBinaire(aCookie[4]);
var sRetourVar15 = sTraductionWeborama2("var14",sBinaireValueVar15,62);
if (aCookie.length > 5) {
var sBinaireValueVar16 = sBinaire(aCookie[5]);
var sRetourVar16 = sTraductionWeborama2("var14",sBinaireValueVar16,93);
} 
else {
var sRetourVar16 = "";
}
} else {
var sBinaireValueVar14 = aCookie[1];
var sRetourVar14 = sTraductionWeborama3("var14",sBinaireValueVar14);
var sRetourVar11 = "";
var sRetourVar15 = "";
var sRetourVar16 = "";
}
if (sRetourVar11 == "") sRetourVar11 = "var11=;"; 
if (sRetourVar15 == "" && sRetourVar14 == "") sRetourVar15 = "var14=;";
var aAvant = new Array(sCookie.substr(0,1),sCookie.substr(1,1),sCookie.substr(2,1));
for (var i=0; i < aAvant.length; i++){
var bTrouve = false;
for (var j=0; j < o_aWeborama[i].length && !bTrouve; j++){
if (aAvant[i] == o_aWeborama[i][j]){
bTrouve = true;
aApres[i] = o_aOrange[i][j];
}
}
}
aApres[3] = sRetourVar11+sRetourVar14+sRetourVar15+sRetourVar16;
return aApres;
}
function o_iz_class() {
this.ACCOUNT_MULTIBAL = false;
this.ACCESS_NETWORK = "";
this.ACCOUNT_NETWORK = "";
this.ACCOUNT_OPTION_FFMV3 = false;
this.ACCOUNT_OPTION_OCS = 0;
this.ACCOUNT_OPTION_OO_MAIL = false;
this.ACCOUNT_OPTION_OO_PIM = false;
this.ACCOUNT_OPTION_ORANGE_OFFICE = false;
this.ACCOUNT_OPTION_SPORT = 0;
this.ACCOUNT_PRO = false;
this.COMMON_ZIP_CODE = "";
this.MOBILE_COMMERCIAL_SEGMENT = "";
this.NETWORK_TYPE = "";
this.PUBPERSO_VAR1 = null;
this.PUBPERSO_VAR2 = null;
this.PUBPERSO_VAR3 = null;
this.PUBPERSO_VAR4 = null;
this.PUBPERSO_VAR5 = false;
this.PUBPERSO_VAR6 = null;
this.USER_FULL_NAME = "";
this.USER_IDENT_CONTEXT = null;
this.USER_IDENT_LEVEL = "NONE";
this.USER_IDENT_TYPE = "";
this.USER_MSISDN = "";
this.USER_DEFINED_MSISDN = "";
this.USER_OOPS_APP = "";
this.USER_PRO = false;
this.USER_QMSISDN = "";
this.USER_QUAD = 0;
this.USER_DEFAULT_HOMEPAGE = -1;
this.USER_ISFUT = 0;
this.USER_OPTOUT = false;
this.USER_USAGE_COMFORT_DATA = "";
this.USER_OSDAT_VAR1 = null;
this.USER_OSDAT_VAR2 = null;
this.USER_OSDAT_VAR3 = null;
this.USER_OSDAT_VAR4 = null;
this.USER_OSDAT_VAR5 = null;
this.USER_OSDAT_VAR6 = null;
this.USER_OSDAT_EXTRA = "";
this.USER_MAIL_ADDRESS = null;
this.USER_MAIL_NB = null;
this.USER_MMS_NB = null;
this.USER_SMS_NB = null;
this.USER_FSS_DATA = null;
this.USER_ZIP_CODE = "";
this.IMG_SERVER = "http://i5.woopic.com";
this.FLASH_SERVER = "http://v3.woopic.com";
this.IDENT_FORM_URL = "http://id.orange.fr/auth_user/bin/auth_user.cgi";
} 
o_iz_class.prototype.set=function(o){
try{
for(var f in o){
if(this.hasOwnProperty(f)) this[f]=o[f];
}
} catch(e) { }
};
if(typeof o_idzone != "object") o_idzone=new o_iz_class();
function o_ident(){
var url=o_idzone.IDENT_FORM_URL+"?url="+document.location.href;
window.location.href=url;
return true;
}
function o_putvar(n){
var v="";
try {
v=o_idzone[n].toString();
} catch(e){
v=null;
}
if(v==null) v="<i>null</i>";
else v="<b>"+v+"</b>"
document.write("<tr>");
document.write("<td>" + n + "</td><td>" + v + "&nbsp;</td>");
document.write("</tr>");    
}
function o_bAddWebTrends(sZone,sName,sType,iBloc){
try {
var aElement = new Array();
if (iBloc == null) aElement.push(window.document);
else if (typeof iBloc == "string") aElement.push(iBloc);
else if (typeof iBloc == "object" && typeof iBloc.length != "undefined") aElement = iBloc;
else aElement.push(window.document);
if (typeof sZone == "undefined" || sZone == null) sZone = "";
if (typeof sName == "undefined" || sName == null) sName = "";
if (typeof sType == "undefined" || sType == null) sType = "";
for (var i=0; i < aElement.length; i++) {
if (typeof aElement[i] == "string") o_scanTreeForWebTrends(sZone,sName,sType,document.getElementById(aElement[i]));
else o_scanTreeForWebTrends(sZone,sName,sType,aElement[i]);
}
return true;
} catch( exception ) { }
}
function o_scanTreeForWebTrends(sZone,sName,sType,o_rNode){
try{
if (o_rNode.childNodes){
for(var i=0; i<o_rNode.childNodes.length; i++)
o_scanTreeForWebTrends(sZone,sName,sType,o_rNode.childNodes[i]);
}
if (o_rNode.tagName.toUpperCase() == "A"){
var hasWebTrends = "";
if (o_rNode.addWebTrends) {
o_bWebTrends(sZone,sName,sType,o_rNode,o_rNode.addWebTrends);
} else if (o_rNode.attributes && o_rNode.attributes["addWebTrends"]){
o_bWebTrends(sZone,sName,sType,o_rNode,o_rNode.attributes["addWebTrends"].value);
} else o_bWebTrends(sZone,sName,sType,o_rNode);
}
} catch( exception ) { }
}
function o_bWebTrends(sZone,sName,sType,iLien,sAddWebTrends){
try{
var sAddName = "";
if (sAddWebTrends) sAddName = " "+sAddWebTrends;
if (typeof dcsMultiTrack != "undefined") {
$listenerCommon.add(iLien,"click", function(e){
dcsMultiTrack('DCSext.zone',sZone,'DCSext.name',sName+sAddName,'DCSext.type',sType);
});
}
} catch( exception ) { }
}
function v_getWunderloop() { 
ord=Math.random()*10000000000000000; 
if(typeof(wlrcmd)=="undefined"){var wlrcmd="";} 
var WlNeedRcmd="false"; 
var sAppel = '<scr'+'ipt language="JavaScript" src="http://rc.production.orangeads.fr/Tag/orangefr/JS/Default/Gt.js?d='+ord+'" type="text/javascript"></scr'+'ipt>'; 
document.write(sAppel);
}
function var_pays(){
if(o_idzone["USER_IS_REUNION"] = (o_idzone["NETWORK_TYPE"] == "REUNION") || ((o_idzone["USER_IDENT_TYPE"] ==1  || o_idzone["USER_IDENT_TYPE"] ==3) && o_idzone["COMMON_ZIP_CODE"].substring(0,3) == "974") || (o_idzone["USER_IDENT_TYPE"] ==2 && o_idzone["USER_ZIP_CODE"].substring(0,3) == "974")){
pays="_reu";
}else if(document.domain=="reunion.orange.fr"){
pays="_reu";
}else{
pays="";
}
return(pays); 
}
function dropAccentsSpace(b){
b=b.replace(/[\/&╗"'Т(-_)=}\]^\\|\[{#~<>,;:!з.?*$^ги%╡г]/g, '+');
b=b.replace(new RegExp("[ +]","gi"),"+");
b=b.replace(new RegExp("[\350\351\352\353]","gi"),"e");
b=b.replace(new RegExp("[\340\341\342\343\344\345]","gi"),"a");
b=b.replace(new RegExp("[\347]","gi"),"c");
b=b.replace(new RegExp("[\354\355\356\357]","gi"),"i");
b=b.replace(new RegExp("[\362\363\364\365\366]","gi"),"o");
b=b.replace(new RegExp("[\371\372\373\374]","gi"),"u");
b=b.replace(new RegExp("[\375\377]","gi"),"y");
return b;
}