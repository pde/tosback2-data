// 5.00 - 2012-08-31 - BUG: Fixed the reg bar not showing when adkill is activated
// 5.01 - 2012-08-31 - Cleaned up code 
// 5.02 - fix bug - Uncaught ReferenceError: $ is not defined - in Wordpress as it doesn;t like the $ jquery declaration
//        added suppot for pfadx as well as adx calls
// 5.03 - Added dc_ref= instead of the old dom value, removed dom= from urls 
//        added geo=XX taken from tmgads.geo metatag, fixes bug with Ooyala HTNL5 video player
//        added support for pfadx
// 5.04 - Added fix for embeded videos hcih still call the adx method, changes this to pfadx if adtype = vid
// INITIALISE tmgAds object
var tmgAds = new tmgAdsInitAdsData();
///////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
function tmgAdsInitAdsData(){
  this.dfpjsver = 5.01;
  this.ads      = new Array();
  this.renderTime = new Array();
  this.renderTime['total'] = 0;
  this.renderTime['avg']   = 0;
  this.page             = new Array();
  this.page['url']      = window.location.href;
  this.page['referrer'] = document.referrer;
  this.page['domain']   = window.location.hostname;
  this.page['search']   = window.location.search;
  this.protocol = window.location.protocol+"//";
  this.adserver = "ad-emea.doubleclick.net";
  this.site     = tmgAdsGetMetaTag("tmgads.channel");
  this.sitename = "tmg.telegraph."+this.site;
  this.zonename = tmgAdsGetMetaTag("tmgads.zone");
  this.sitezone = this.sitename+"/"+this.zonename;
  // site/zone string can not exceed 64 chars, so truncate from the zone name if need be
  this.sitezone = this.sitezone.substr(0,64);
  this.section  = tmgAdsGetMetaTag("tmgads.section");
  this.pagetype = tmgAdsGetMetaTag("tmgads.pagetype");
  this.level    = tmgAdsGetMetaTag("tmgads.level");
  this.articleid= tmgAdsGetMetaTag("tmgads.articleid");
  this.geo      = tmgAdsGetMetaTag("tmgads.geo");
  this.tile     = 0;
  if(document.all){
    this.biw = document.documentElement.offsetWidth;
    this.bih = document.documentElement.offsetHeight;
  } else {
    this.biw = window.innerWidth;
    this.bih = window.innerHeight;
  }
  // Add Flash info, create and add emtpy vars first, in case Flash not installed, fixeds bug in Opera
  // DETECT FLASH VERSION http://www.featureblend.com/flash_detect_1-0-4 - http://www.featureblend.com/license.txt
  var FlashDetect=new function(){var self=this;self.installed=false;self.raw="";self.major=-1;self.minor=-1;self.revision=-1;self.revisionStr="";var activeXDetectRules=[{"name":"ShockwaveFlash.ShockwaveFlash.7","version":function(obj){return getActiveXVersion(obj);}},{"name":"ShockwaveFlash.ShockwaveFlash.6","version":function(obj){var version="6,0,21";try{obj.AllowScriptAccess="always";version=getActiveXVersion(obj);}catch(err){} return version;}},{"name":"ShockwaveFlash.ShockwaveFlash","version":function(obj){return getActiveXVersion(obj);}}];var getActiveXVersion=function(activeXObj){var version=-1;try{version=activeXObj.GetVariable("$version");}catch(err){}return version;};var getActiveXObject=function(name){var obj=-1;try{obj=new ActiveXObject(name);}catch(err){obj={activeXError:true};} return obj;};var parseActiveXVersion=function(str){var versionArray=str.split(",");return{"raw":str,"major":parseInt(versionArray[0].split(" ")[1],10),"minor":parseInt(versionArray[1],10),"revision":parseInt(versionArray[2],10),"revisionStr":versionArray[2]};};var parseStandardVersion=function(str){var descParts=str.split(/ +/);var majorMinor=descParts[2].split(/\./);var revisionStr=descParts[3];return{"raw":str,"major":parseInt(majorMinor[0],10),"minor":parseInt(majorMinor[1],10),"revisionStr":revisionStr,"revision":parseRevisionStrToInt(revisionStr)};};var parseRevisionStrToInt=function(str){return parseInt(str.replace(/[a-zA-Z]/g,""),10)||self.revision;};self.majorAtLeast=function(version){return self.major>=version;};self.minorAtLeast=function(version){return self.minor>=version;};self.revisionAtLeast=function(version){return self.revision>=version;};self.versionAtLeast=function(major){var properties=[self.major,self.minor,self.revision];var len=Math.min(properties.length,arguments.length);for(i=0;i<len;i++){if(properties[i]>=arguments[i]){if(i+1<len&&properties[i]==arguments[i]){continue;}else{return true;}}else{return false;}}};self.FlashDetect=function(){if(navigator.plugins&&navigator.plugins.length>0){var type='application/x-shockwave-flash';var mimeTypes=navigator.mimeTypes;if(mimeTypes&&mimeTypes[type]&&mimeTypes[type].enabledPlugin&&mimeTypes[type].enabledPlugin.description){var version=mimeTypes[type].enabledPlugin.description;var versionObj=parseStandardVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revisionStr=versionObj.revisionStr;self.revision=versionObj.revision;self.installed=true;}}else if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){var version=-1;for(var i=0;i<activeXDetectRules.length&&version==-1;i++){var obj=getActiveXObject(activeXDetectRules[i].name);if(!obj.activeXError){self.installed=true;version=activeXDetectRules[i].version(obj);if(version!=-1){var versionObj=parseActiveXVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revision=versionObj.revision;self.revisionStr=versionObj.revisionStr;}}}}}();};
  this.flash = new Array();
  this.flash['versionMaj'] = 0;
  this.flash['versionMin'] = 0;
  this.flash['versionRev'] = 0;
  this.flash['versionRaw'] = "none";
  if(FlashDetect.installed){
    this.flash['versionMaj'] = FlashDetect.major;     	
    this.flash['versionMin'] = FlashDetect.minor;     	
    this.flash['versionRev'] = FlashDetect.revision;     	
    this.flash['versionRaw'] = FlashDetect.raw;     	
  }     	
  // KEYWORDS - not currentl importing these.
  this.keywords = "";
  // ADD AudienceScience, TMG cookies -  naming convention XYYYYY_NNNNN only pass NNNNN to tags
  this.asCookies  = "";
  this.asoCookies = "";
  if(tmgAdsGetCookie("rsi_segs")){
    this.asCount    = 0;
    this.asoCount   = 0;
    var asCookiesArray = tmgAdsGetCookie("rsi_segs").split("|");

    for(var i=0;i<=asCookiesArray.length-1;i++){
      // Do this if TMG segment 'as'
      if(asCookiesArray[i].substr(0,7)=="E06560_" && this.asCount<=19){
    	  this.asCookies += ";as="+asCookiesArray[i].substr(7,5);
        this.asCount++; 
      } else {
        // Do this if Non-TMG segment 'aso'
        if(asCookiesArray[i].substr(0,7)!="E06560_" && this.asoCount<=19){
          this.asoCookies += ";aso="+asCookiesArray[i];
          this.asoCount++;
        }
      }
    }
  }
  // AUDIENCE SCIENCE CONNECT DATA
  // These are set per page, only two values per page though so no major impact on only need top pass the 5 digit number though to keep url brevity
  this.asConnect="";
  var asConnectArray = new Array("wl10202camp","wl10203camp","wl10085camp","wl10086camp","wl10192camp","wl10193camp","wl10194camp","wl10195camp","wl10196camp","wl10197camp","wl10198camp","wl10199camp","wl10200camp","wl10201camp","wl10851camp","wl10852camp","wl10849camp","wl10850camp","wl10847camp","wl10848camp");
  for(i=0;i<=asConnectArray.length-1;i++){
    asConnectVar = eval("asConnectArray"+"["+i+"]");
    // check to se if the var name is set and is not empty/null value
    if(eval("window."+asConnectVar) != undefined && eval("window."+asConnectVar+".length")>0){
      this.asConnect += ";asc="+asConnectArray[i].substring(2,7);
    }
  }
  // ADD GRAPESHOT DATA
  this.gsSegments = "";
  if(typeof window.gs_channels != 'undefined'){
    var gsTagArray = window.gs_channels.split(",");
    for(var i=0;i<=gsTagArray.length-1;i++){
      this.gsSegments += ";gs="+gsTagArray[i].toLowerCase();
    }
    //this.gsSegments = ";gs="+window.gs_channels.toLowerCase();
  }
  // GENERAL telegraph.co.uk COOKIES - only cookienames starting tmgads* passed to DFP via the ck=xnxnxn KVP
  this.tmgCookies= "";
  this.ppCookies = "";
  cookieArray = document.cookie.split("; "); 
  for(var i=0; i<cookieArray.length; i++){
    cookieKey=cookieArray[i].split('=')[0];
    cookieVal=cookieArray[i].split('=')[1];
    if(cookieKey.substr(0,7)=="tmgads_" && cookieKey.length>0){
      this.tmgCookies += ";ck_"+cookieKey.substr(7,cookieKey.length-7)+"="+cookieVal;
    }
    // Pick up any ProjP cookies
    if(cookieKey=="tmg_pid"){
      this.ppCookies += ";ck_pp_pid="+cookieVal;
    }
    if(cookieKey=="tmg_p13n"){
      // add subscriber status
      // currently the JSON object returned is not a valid JSON object
      this.ppCookies += ";ck_pp_sub=null";
    }
  }
  // Get any relevant url params and populate the array with them, this means jot having to look them up on every ad call.
  this.urlParams = new Array();
  this.urlParams['adtest']    = tmgAdsGetURLParam("adtest",window.location.href);
  this.urlParams['addebug']   = tmgAdsGetURLParam("addebug",window.location.href);
  this.urlParams['adconsole'] = tmgAdsGetURLParam("adconsole",window.location.href);
  this.urlParams['adkill']    = tmgAdsGetURLParam("adkill",window.location.href);
  this.urlParams['adstyle']   = tmgAdsGetURLParam("adstyle",window.location.href);
  // Add adtest url param if present
  //if(typeof this.URLparams['adtest'] != 'undefined'){
  //  this.URLTestVar = ";test="+this.URLparams['adtest'];
  //}
  // add oreitnation if it exists
  if(typeof window.orientation=="number"){
    this.orientation = Math.abs(window.orientation);
  }
  // Add 'ord' cachebuster
  this.ord   = Number(new Date());
}
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsSerializeArray(a){var b=function(a){var b=0,c=0,d=a.length,e="";for(c=0;c<d;c++){e=a.charCodeAt(c);if(e<128){b+=1}else if(e<2048){b+=2}else{b+=3}}return b};var c=function(a){var b=typeof a,c;var d;if(b==="object"&&!a){return"null"}if(b==="object"){if(!a.constructor){return"object"}var e=a.constructor.toString();c=e.match(/(\w+)\(/);if(c){e=c[1].toLowerCase()}var f=["boolean","number","string","array"];for(d in f){if(e==f[d]){b=f[d];break}}}return b};var d=c(a);var e,f="";switch(d){case"function":e="";break;case"boolean":e="b:"+(a?"1":"0");break;case"number":e=(Math.round(a)==a?"i":"d")+":"+a;break;case"string":e="s:"+b(a)+':"'+a+'"';break;case"array":case"object":e="a";var g=0;var h="";var i;var j;for(j in a){if(a.hasOwnProperty(j)){f=c(a[j]);if(f==="function"){continue}i=j.match(/^[0-9]+$/)?parseInt(j,10):j;h+=this.tmgAdsSerializeArray(i)+this.tmgAdsSerializeArray(a[j]);g++}}e+=":"+g+":{"+h+"}";break;case"undefined":default:e="N";break}if(d!=="object"&&d!=="array"){e+=";"}return e;
}
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsGetMetaTag(tagname){
  var output = "null";
  if(document.getElementsByName(tagname)[0] != null){
    output = document.getElementsByName(tagname)[0].content;
  }
  return output.toLowerCase();
}
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsGetURLParam(strParamName,URL){
  var strReturn = "";
  var strHref = URL;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  } else {
    strReturn = "";
  }
  return unescape(strReturn);
}
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsGetCookie(name){
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++){
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==name){
      return unescape(y);
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsSetCookie(name,val,ttlhrs,dom){
  var data = name+"="+escape(val);
  if(ttlhrs){
    var now = new Date();
    var time = now.getTime();
    time += ttlhrs * 3600 * 1000;
    now.setTime(time);
    expires = ";expires=" + now.toGMTString();
  } else {
    expires = "";
  }
  var path=";path=/"; 
  if(typeof dom == 'undefined'){
    var domain="";
  } else {
    var domain = ";domain=" + dom;
  }
  var cookiestr = data+expires+path+domain;
  document.cookie = cookiestr;
}
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsTimer(){
  var tmgAdsTime = new Date();
  //return tmgAdsTime.getMilliseconds();
  return Number(tmgAdsTime);
}
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsGetAdPos(obj) {
  var curleft = curtop = 0;
  if (obj.offsetParent) {
   curleft = obj.offsetLeft
   curtop = obj.offsetTop
   while (obj = obj.offsetParent) {
     curleft += obj.offsetLeft
     curtop += obj.offsetTop
    }
  }
  return [curleft,curtop];
}
///////////////////////////////////////////////////////////////////////////////////
function tmgGetAdVisibility(i){
  if(((tmgAds.ads[i]['posX']+tmgAds.ads[i]['szW']) < tmgAds.biw) && tmgAds.ads[i]['posY'] < tmgAds.bih){
    tmgAds.ads[i]['visibilityW'] = tmgAds.ads[i]['szW'];
  } else {
    tmgAds.ads[i]['visibilityW'] = tmgAds.biw - tmgAds.ads[i]['posX'];
  }
  if((tmgAds.ads[i]['posY']+tmgAds.ads[i]['szH']) < tmgAds.bih){
    tmgAds.ads[i]['visibilityH'] = tmgAds.ads[i]['szH'];
  } else {
    tmgAds.ads[i]['visibilityH'] = tmgAds.bih - tmgAds.ads[i]['posY'];
  }
  var tmp = (tmgAds.ads[i]['visibilityH']*tmgAds.ads[i]['visibilityW']) / (tmgAds.ads[i]['szH']*tmgAds.ads[i]['szW']);
  if(tmp<0){
    return 0;
  } else {
    return (tmgAds.ads[i]['visibilityH']*tmgAds.ads[i]['visibilityW']) / (tmgAds.ads[i]['szH']*tmgAds.ads[i]['szW']);
  }
}
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsBuildAdTag(adType,adSize,adScriptType,adExtraTags,adStyle){
  // fix the issue with the old embedded videos still having adx calls
  if(adType==="vid" && adScriptType==="adx"){
    adScriptType="pfadx";
  }
  ++tmgAds.tile;
  tmgAds.renderTime[tmgAds.tile]      = new Array(); // hold details of ad renderingtimes etc
  //force an ad invocation type, adi or adj only
  if(tmgAds.urlParams['adstyle'].length >0){
    adScriptType = tmgAds.urlParams['adstyle'];
  }
  tmgAds.ads[tmgAds.tile]             = new Array(); // create array for this tag
  tmgAds.ads[tmgAds.tile]['dfp']      = new Array(); // holds the DFP sepcific data for this tag
  tmgAds.ads[tmgAds.tile]['dfp']['adv']  = "-";
  tmgAds.ads[tmgAds.tile]['dfp']['aid']  = "-";
  tmgAds.ads[tmgAds.tile]['dfp']['buy']  = "-";
  tmgAds.ads[tmgAds.tile]['dfp']['cid']  = "-";
  tmgAds.ads[tmgAds.tile]['dfp']['sid']  = "-";
  tmgAds.ads[tmgAds.tile]['dfp']['pid']  = "-";
  tmgAds.ads[tmgAds.tile]['dfp']['rid']  = "-";
  tmgAds.ads[tmgAds.tile]['dfp']['site'] = "-";
  tmgAds.ads[tmgAds.tile]['dfp']['env']  = "-";
  tmgAds.ads[tmgAds.tile]['dfp']['geo']  = "-";
  tmgAds.ads[tmgAds.tile]['func']        = new Array(); // records data from the function invocation
  tmgAds.ads[tmgAds.tile]['func']['type']  = adType;
  tmgAds.ads[tmgAds.tile]['func']['size']  = adSize;
  tmgAds.ads[tmgAds.tile]['func']['invoc'] = adScriptType;
  tmgAds.ads[tmgAds.tile]['func']['extra'] = adExtraTags;
  tmgAds.ads[tmgAds.tile]['func']['style'] = adStyle;
  tmgAds.ads[tmgAds.tile]['id']        = adType.replace(/\,/g,"").substring(0,3);
  tmgAds.ads[tmgAds.tile]['id_iframe'] = "tmgAd_iframe_"+tmgAds.ads[tmgAds.tile]['id']+"_"+tmgAds.tile;
  tmgAds.ads[tmgAds.tile]['id_script'] = "tmgAd_script_"+tmgAds.ads[tmgAds.tile]['id']+"_"+tmgAds.tile;
  tmgAds.ads[tmgAds.tile]['id_div']    = "tmgAd_div_"+tmgAds.ads[tmgAds.tile]['id']+"_"+tmgAds.tile;
  // Adtypes can be >1, create all needed here.
  tmgAds.ads[tmgAds.tile]['dfp']['kvps']    = "";
  tmgAds.ads[tmgAds.tile]['dfp']['logging'] = "at=";
  var adTypes = adType.split(",");
  for(var i=0;i<=adTypes.length-1;i++){
    tmgAds.ads[tmgAds.tile]['dfp']['kvps']       += ";at="+adTypes[i];
    tmgAds.ads[tmgAds.tile]['dfp']['logging'] += adTypes[i]+",";
  }
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";pos=" + tmgAds.tile;  
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";sc="  + tmgAds.section;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";pt="  + tmgAds.pagetype;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";pg="  + tmgAds.articleid;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";lvl=" + tmgAds.level;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";geo=" + tmgAds.geo;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";biw=" + tmgAds.biw;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";bih=" + tmgAds.bih;
  if(typeof tmgAds.orientation === "number"){
    tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";orn=" + tmgAds.orientation;
  }
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";fv="  + tmgAds.flash['versionMaj'];
  // Add dynamic data eg;  AudienceScience, Cookies, Grapeshot, domain
  if(adExtraTags.length>0){
    tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += adExtraTags;
  }
  if(typeof tmgAds.urlParams['adtest'] != 'undefined'){
    tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";test="+tmgAds.urlParams['adtest'];
  }
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += tmgAds.asCookies;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += tmgAds.asoCookies;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += tmgAds.asConnect;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += tmgAds.tmgCookies;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += tmgAds.gsSegments;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += tmgAds.keywords;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += tmgAds.ppCookies;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";dc_ref=" + encodeURIComponent(tmgAds.page['url']);
  //tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";dom=" + tmgAds.page['domain'];
  // Add Yeidlex u= targeting here; NB: the adtype has already been ascertained at the top of this function
  tmgAds.ads[tmgAds.tile]['dfp']['logging'] = tmgAds.ads[tmgAds.tile]['dfp']['logging'].substr(0,tmgAds.ads[tmgAds.tile]['dfp']['logging'].length-1);
  tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|sz="  + adSize;
  tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|sc="  + tmgAds.section;
  tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|pt="  + tmgAds.pagetype;
  if(tmgAds.articleid != "null"){
    tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|pg="  + tmgAds.articleid;
  }
  tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|lvl=" + tmgAds.level;
  tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|biw=" + tmgAds.biw;
  tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|bih=" + tmgAds.bih;
  if(typeof tmgAds.orientation === "number"){
    tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|orn=" + tmgAds.orientation;
  }
  tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|fv="  + tmgAds.flash['versionMaj'];
  if(tmgAds.asCookies.length>0){
    tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|as="  + tmgAds.asCookies.substr(1).replace(/\;/g,",").replace(/as\=/g,"");
  }
  if(tmgAds.asoCookies.length>0){
    tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|aso=" + tmgAds.asoCookies.substr(1).replace(/\;/g,",").replace(/aso\=/g,"");
  }
  if(tmgAds.asConnect.length>0){
    tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|asc=" + tmgAds.asConnect.substr(1).replace(/\;/g,",").replace(/asc\=/g,"");
  }
  if(tmgAds.ppCookies.length>0){
    tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|"     + tmgAds.ppCookies.replace(/\;/g,"");   
  }
  if(tmgAds.gsSegments.length>0){
    tmgAds.ads[tmgAds.tile]['dfp']['logging'] += "|"     + tmgAds.gsSegments.replace(/\;/g,"");   
  }
  // add logging lien to adtag
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";u=" + tmgAds.ads[tmgAds.tile]['dfp']['logging'];  
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";sz="  + adSize;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";tile="+ tmgAds.tile;
  // sets the stringlength +19 for the ord=...
  tmgAds.ads[tmgAds.tile]['dfp']['urllen'] = tmgAds.ads[tmgAds.tile]['dfp']['kvps'].length+1;
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";sl="  + tmgAds.ads[tmgAds.tile]['dfp']['urllen'];
  tmgAds.ads[tmgAds.tile]['dfp']['kvps'] += ";ord=" + tmgAds.ord;
  // Add this to the window.tmgAds.tags array
  tmgAds.ads[tmgAds.tile]['url'] = tmgAds.protocol + tmgAds.adserver + "/"+adScriptType+"/" + tmgAds.sitezone + tmgAds.ads[tmgAds.tile]['dfp']['kvps'] + "?";
  // GET MAX SIZE OF SZ VALUES TO CREATE IFRAME IF CALLED - calculate by getting area of the various sizes sent.
  var tmgAdSizes = adSize.split(",");
  var tmgAdArea=0;
  for(i in tmgAdSizes){
    tmgAdTmpSize  = tmgAdSizes[i].split("x");
    if(tmgAdTmpSize[0]*tmgAdTmpSize[1]>tmgAdArea){
      tmgAdArea=tmgAdTmpSize[0]*tmgAdTmpSize[1];
      tmgAdDims=i;
    }
  }
  tmgAds.ads[tmgAds.tile]['tmgAdMaxSize'] = tmgAdSizes[tmgAdDims].split("x");
  tmgAds.ads[tmgAds.tile]['szW'] = parseInt(tmgAds.ads[tmgAds.tile]['tmgAdMaxSize'][0]);
  tmgAds.ads[tmgAds.tile]['szH'] = parseInt(tmgAds.ads[tmgAds.tile]['tmgAdMaxSize'][1]);
  tmgAds.ads[tmgAds.tile]['sz']  = tmgAds.ads[tmgAds.tile]['tmgAdMaxSize'][0]+"x"+tmgAds.ads[tmgAds.tile]['tmgAdMaxSize'][1];
  // Build the adtag and container div styles if needed.
  switch(adScriptType){
    case "adi":
      tmgAds.ads[tmgAds.tile]['tag'] = "<ifr"+"ame id=\""+tmgAds.ads[tmgAds.tile]['id_iframe']+"\" src=\""+tmgAds.ads[tmgAds.tile]['url']+"\" width=\""+tmgAds.ads[tmgAds.tile]['szW']+"\" height=\""+tmgAds.ads[tmgAds.tile]['szH']+"\" marginwidth=\"0\" marginheight=\"0\" hspace=\"0\" vspace=\"0\" frameborder=\"0\" scrolling=\"no\" bordercolor=\"#000000\"><\/ifr"+"ame>"; 
      break
    case "adj":
      tmgAds.ads[tmgAds.tile]['tag'] = "<scr"+"ipt type=\"text/javascript\" id=\""+tmgAds.ads[tmgAds.tile]['id_script']+"\" src=\""+tmgAds.ads[tmgAds.tile]['url']+"\"><\/scr"+"ipt>"; 
      break
    case "adx":
      tmgAds.ads[tmgAds.tile]['tag'] = tmgAds.ads[tmgAds.tile]['url'];
      break
    case "pfadx":
      tmgAds.ads[tmgAds.tile]['tag'] = tmgAds.ads[tmgAds.tile]['url'];
      break
    default:
      tmgAds.ads[tmgAds.tile]['tag'] = tmgAds.ads[tmgAds.tile]['url']; 
      break
  }
  // store the base tag for use later
  tmgAds.ads[tmgAds.tile]['tagBase'] = tmgAds.ads[tmgAds.tile]['tag'];
  switch(adStyle){
    case 0: // URL ONLY
      tmgAds.ads[tmgAds.tile]['tag'] = tmgAds.ads[tmgAds.tile]['url']; 
      break;
    case 1: // FULL FORMED TAG - NO CONTAINER DIV
      tmgAds.ads[tmgAds.tile]['tag'] = tmgAds.ads[tmgAds.tile]['tag']; 
      break;
    case 2: // FULL FORMED TAG + DIV
      tmgAds.ads[tmgAds.tile]['tag']  = "<div id=\""+tmgAds.ads[tmgAds.tile]['id_div']+"\" style=\"width:"+tmgAds.ads[tmgAds.tile]['szW']+"px\">"+tmgAds.ads[tmgAds.tile]['tag']+"</div>"; 
      break;
    case 3: // v2.0 Ooyala player returns url without trailing ?
      tmgAds.ads[tmgAds.tile]['tag'] = "<div id=\"tmgAd_"+tmgAds.ads[tmgAds.tile]['id_div']+"\">"+tmgAds.ads[tmgAds.tile]['tag']+"</div>";
      break;
    default: // FULL FORMED TAG + DIV
      tmgAds.ads[tmgAds.tile]['tag'] = "<div id=\"tmgAd_"+tmgAds.ads[tmgAds.tile]['id_div']+"\">"+tmgAds.ads[tmgAds.tile]['tag']+"</div>";
      break;
  }
  // Produce Debug info, this is turned on as default - add Firebug console logging for ad executions - ads our adtimer function for reporting/logging slow ads etc.
  tmgAds.ads[tmgAds.tile]['tagPreScript']   = "tmgAds.renderTime["+tmgAds.tile+"]['start'] = tmgAdsTimer();";
  tmgAds.ads[tmgAds.tile]['tagPostScript']  = "tmgAds.renderTime["+tmgAds.tile+"]['end']   = tmgAdsTimer();";  
  tmgAds.ads[tmgAds.tile]['tagPostScript'] += "tmgAds.renderTime["+tmgAds.tile+"]['time']  = tmgAds.renderTime["+tmgAds.tile+"]['end'] - tmgAds.renderTime["+tmgAds.tile+"]['start'];";
  tmgAds.ads[tmgAds.tile]['tagPostScript'] += "tmgAds.renderTime['total']                 += tmgAds.renderTime["+tmgAds.tile+"]['time'];";
  tmgAds.ads[tmgAds.tile]['tagPostScript'] += "tmgAds.renderTime['avg']                    = tmgAds.renderTime['total']/"+tmgAds.tile+";";
  // optional params for debugging & testing
  if(tmgAds.urlParams['adconsole']==="on"){
    tmgAds.ads[tmgAds.tile]['tagPreScript'] += "console.profile('TMG.AdOps.Firebug.Profile["+adType+"]:');"; 
    tmgAds.ads[tmgAds.tile]['tagPostScript'] = tmgAds.ads[tmgAds.tile]['tagPostScript']+"console.profileEnd('TMG.AdOps.Firebug.Profile["+adType+"]:');";     
  } 
  // kills ads in page, wraps them in comment tags, used to ascertain if ads are causing problems on page or isiolate other issues without ads confusing debugging.
  if(tmgAds.urlParams['adkill']==="on"){
    tmgAds.ads[tmgAds.tile]['tag'] = "<!--// Ad ["+adType+"] removed due to killswitch //-->";;
    tmgAds.ads[tmgAds.tile]['tagPreScript'] += "console.profile('TMG.AdOps.Kill.Ad["+adType+"]: Ad removed due to killswitch adkill=on');";
  }
  // make this a bit more logical, only write out the script tags if they need to do something
  tmgAds.ads[tmgAds.tile]['tagPreScript'] = "<scr"+"ipt type=\"text/javascript\">" + tmgAds.ads[tmgAds.tile]['tagPreScript'] + "</scr"+"ipt>";
  tmgAds.ads[tmgAds.tile]['tagPostScript']= "<scr"+"ipt type=\"text/javascript\">" + tmgAds.ads[tmgAds.tile]['tagPostScript']+ "</scr"+"ipt>";
  // build the final taga and return this, for adx calls make sure the response is ONLY a url otherwise will break apps
  if(adScriptType==="adx" || adScriptType==="pfadx"){
    tmgAds.ads[tmgAds.tile]['tag'] = tmgAds.ads[tmgAds.tile]['url'];
  } else {
    // Fix Fashion gallries, only return IFRAME tag, don't wrap with timer tags sc=fashion-galleries and iframe adi call
    // this returns the normal unaltered/unwrapped tag IF fashion galleries using iframes by not wrappign the tag
    if(tmgAds.section!="fashion-galleries" && adScriptType!="adi"){
      tmgAds.ads[tmgAds.tile]['tag'] = tmgAds.ads[tmgAds.tile]['tagPreScript'] + tmgAds.ads[tmgAds.tile]['tag'] + tmgAds.ads[tmgAds.tile]['tagPostScript'];
    }
  } 
  return tmgAds.ads[tmgAds.tile]['tag'];
}
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsGetAdSlotInfo(i){
    // some ads don't have this, eg; video adx calls, use else rather than set vars default first as quicker/less steps.
    if((tmgAds.ads[i]['func']['invoc']!="adx" && tmgAds.ads[i]['func']['invoc']!="pfadx") && tmgAds.urlParams['adkill']!="on" && tmgAds.pagetype!="gallery"){
      tmgAds.ads[i]['divW']   = document.getElementById(tmgAds.ads[i]['id_div']).offsetWidth;    
      tmgAds.ads[i]['divH']   = document.getElementById(tmgAds.ads[i]['id_div']).offsetHeight;   
      tmgAds.ads[i]['pos']    = tmgAdsGetAdPos(document.getElementById(tmgAds.ads[i]['id_div']));
      tmgAds.ads[i]['posX']   = tmgAds.ads[i]['pos'][0];
      tmgAds.ads[i]['posY']   = tmgAds.ads[i]['pos'][1];
      tmgAds.ads[i]['innerHTML']     = unescape(document.getElementById(tmgAds.ads[i]['id_div']).innerHTML);
    } else {
      tmgAds.ads[i]['divW']   = 0;
      tmgAds.ads[i]['divH']   = 0;
      tmgAds.ads[i]['pos']    = [0,0];
      tmgAds.ads[i]['posX']   = tmgAds.ads[i]['pos'][0];
      tmgAds.ads[i]['posY']   = tmgAds.ads[i]['pos'][1];
      tmgAds.ads[i]['innerHTML']     = "";
      tmgAds.renderTime[i]['start']  = "N/A";
      tmgAds.renderTime[i]['end']    = "N/A";
      tmgAds.renderTime[i]['time']   = "N/A";
    }
}
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsDebugShowWindow(){
  // easily add this as a bookmarklet: javascript:tmgAdsDebugShowWindow();
  // if the url param has been set fire up the debugging console automatically
  var tmgAdsDebugRequest = $.ajax({
    type: "POST",
    url: "http://adtools.telegraph.co.uk/tmg/debug/submit.php",
    data: {tmgAds:tmgAdsSerializeArray(tmgAds)}
  }).done(function(data){
    // data is the url of the results window
    tmgAdsDebugDisplay = window.open(data,'tmgAdsDebugWindow','location=1,status=1,scrollbars=1,resizable=1,width=800,height=600');
    tmgAdsDebugDisplay.focus();
    tmgAds['debugUrl'] = data;
  });
}
///////////////////////////////////////////////////////////////////////////////////////////
// DEBUG ads, do these after page has loaded so add to the window.ready event.
(function($) {
 $(document).ready(function() {
  tmgAds['jquery'] = $().jquery;
  // amend tmgAds with post window.ready data
  for(var i=1;i<=tmgAds.ads.length-1;i++){
    tmgAdsGetAdSlotInfo(i);
  } 

  // add other required data 
  tmgAds['navigator']    = new Array(); 
  for(var property in navigator){ 
    var str = navigator[property];
    if(typeof navigator[property] != "object"){
      tmgAds['navigator'][property] = str; 
    }
  } 
  if(typeof window.performance != "undefined"){
    tmgAds['performance']  = new Array();
    for(var property in performance['timing']){ 
      var str = performance['timing'][property];
      if(typeof performance['timing'][property] != "object"){
        tmgAds['performance'][property] = str;
      }
    }  
  }
 });
})(jQuery);
