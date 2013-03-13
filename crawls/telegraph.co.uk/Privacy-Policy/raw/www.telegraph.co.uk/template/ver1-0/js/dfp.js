// 5.30 - changed dfpjsver to version
//        removed protocol on calls, all calls start //
//        removed the sl (string length) which indicated length of the adtag url, now on DFP Premium not really needed.
// 5.31 - Added support for Do Not Track if set in the DOM - http://ie.microsoft.com/testdrive/browser/donottrack/default.html
//        Cleaned uop some code, Removed pg=null when articleid not set
// 5.32 - Cleaning up code, reducing lines numbers, reducing logic
//        Now only adds the geo KVP if available in page
// 5.33 - removed device orientation as not being set until after the page is loaded
// 5.34 - created new tmgads.about[] object
// 5.40 - restructured the tmgAds object, 
//        cleaned up code, standardised array/obj creation 
//        made all previous arrays into objects
// 5.41 - cleaned up performance data
// 5.42 - cleaning up
// 5.43 - fixed undefined DNT on Safari iDevice
// 5.44 - moved borwser size and urlparams to external function
// 5.45 - moved grapeshot to external func
// 5.46 - moved keywords & asConnect to ext func 
// 5.47 - moved audience science cookie parsing to ext func
// 5.50 - all data creation now performed by external func to the main constructor tmgAdsInitAdsData()
// 5.51 - moved the getMaxSize func external
// 5.52 - cleaned up posX & posY, fixed bug where some null value cookies would break adtags
// 5.53 - moved page data creation to external func
// 5.54 - fix bug with the debug submission, now serialises the tmgAds obj properly
// 5.55 - fixed old video ad calls using adx to force pfadx method
// 5.56 - added quantcast support, changed Wunderloop segmentIds
// 5.57 - fixed for...in loop issue re: Jobs - (http://stackoverflow.com/questions/1529593/javascript-custom-array-prototype-interfering-with-for-in-loops), removed old Wunderloop segment values, refined code for perfomance/render timingso, Added taxonomy fix for Food/Drink
// 5.58 - Fixed bug which was mixing up the video adcalls & adding sz values after the ord=nnn? fixed bug introduced in 5.55 which means no protocol being passed to video ads. this broke Ooyala
// 5.59 - Added support for videosrc metatag
// INITIALISE tmgAds object
var tmgAds = new tmgAdsInitAdsData();
///////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS

function tmgAdsInitAdsData(){
  this.adops            = {};
  this.adops.version    = 5.59;
  this.adops.date       = "2013-01-30";
  this.adops.company    = "Telegraph Media Group";
  this.adops.doNotTrack = tmgAdsGetDoNotTrack();
  this.performance      = {adTotal:0,adAvg:0,adCount:0};
  this.ads              = {};
  this.temp             = {};
  // get page metadata
  this.page             = tmgAdsGetPageData();
  // Fix page taxonomy issues
  if(this.page.section=="ece_frontpage")  this.page.section="portal";
  if(this.page.section=="food_and_drink") this.page.section="foodanddrink";
  if(this.page.section=="food-and-drink") this.page.section="foodanddrink";
  if(this.page.site=="food_and_drink")    this.page.site="foodanddrink";
  if(this.page.site=="food-and-drink")    this.page.site="foodanddrink";
  // create base DFGP tag data
  this.dfp              = {};
  this.dfp.tile         = 0;
  this.dfp.adserver     = "ad.doubleclick.net";
  this.dfp.networkid    = "N6582";
  this.dfp.sitename     = "tmg.telegraph."+this.page.site;
  this.dfp.sitezone     = this.dfp.sitename+"/"+this.page.zone.substr(0,100); // site/zone can not exceed 100chars
  // get bowsers/screen sizes
  this.browser          = tmgAdsGetBrowserSize();
  // Detect Flash
  this.flash = tmgAdsFlashDetect();
  // Add keywods - not currently importing these.dd keywords
  this.page.keywords = tmgAdsGetKeywords();
  // Create cookie object
  this.cookies = {}
  // Add Audience Science Data
  this.page.audienceScienceConnect  = tmgAdsGetAudienceScienceConnect();
  this.cookies.audienceScience      = tmgAdsGetAudienceScienceCookies('tmg');
  this.cookies.audienceScienceOther = tmgAdsGetAudienceScienceCookies('nontmg');
  // Add Grapeshot data
  this.page.grapeshot = tmgAdsGetGrapeshot();
  this.page.quantcast = tmgAdsGetQuantcast();
  // GENERAL telegraph.co.uk COOKIES - only cookienames starting tmgads* passed to DFP via the ck=xnxnxn KVP
  this.cookies.adops = tmgAdsGetTMGCookies('adops');
  this.cookies.tmg   = tmgAdsGetTMGCookies('tmg');
  this.cookies.pp    = tmgAdsGetTMGCookies('pp');
  // Get any relevant url params.
  this.page.urlParams = tmgAdsGetUrlParams();
  // Add 'ord' cachebuster
  this.dfp.ord   = Number(new Date());
}

///////////////////////////////////////////////////////////////////////////////////
// Get page data
function tmgAdsGetPageData(){
  tmp = {};
  tmp.url         = location.protocol+'//'+location.host+location.pathname;
  tmp.referrer    = document.referrer;
  tmp.domain      = location.hostname;
  tmp.protocol    = location.protocol;
  tmp.search      = location.search;
  tmp.environment = "-";
  // capture Mobile traffic
  if(tmgAdsGetMetaTag("DCSext.Platform")=="mobile"){
    tmp.site      = tmgAdsGetMetaTag("DCSext.Channel");
    tmp.zone      = tmgAdsGetMetaTag("DCSext.MLC").substr(1).replace(/\//g, ".");
    tmp.section   = tmgAdsGetMetaTag("DCSext.MLC").substr(1).replace(/\//g, "-");
    tmp.pagetype  = tmgAdsGetMetaTag("DCSext.Content_Type");
    tmp.level     = tmgAdsGetMetaTag("DCSext.Level");
    tmp.articleid = tmgAdsGetMetaTag("DCSext.articleId");
    tmp.otherdata = "";
    tmp.videosrc  = tmgAdsGetMetaTag("tmgads.videosrc");
    tmp.geo       = "";
    tmp.platform  = tmgAdsGetMetaTag("DCSext.Platform");
  } else {
    tmp.site      = tmgAdsGetMetaTag("tmgads.channel");
    tmp.zone      = tmgAdsGetMetaTag("tmgads.zone");
    tmp.section   = tmgAdsGetMetaTag("tmgads.section");
    tmp.pagetype  = tmgAdsGetMetaTag("tmgads.pagetype");
    tmp.level     = tmgAdsGetMetaTag("tmgads.level");
    tmp.articleid = tmgAdsGetMetaTag("tmgads.articleid");
    tmp.otherdata = tmgAdsGetMetaTag("tmgads.otherdata");
    tmp.geo       = tmgAdsGetMetaTag("tmgads.geo");
    tmp.videosrc  = tmgAdsGetMetaTag("tmgads.videosrc");
    tmp.platform  = "desktop";
  }
  return tmp;
}

///////////////////////////////////////////////////////////////////////////////////
// Get usable Telegraph cookies
function tmgAdsGetTMGCookies(type){
  // type is adops, tmg, pp 
  tmp = "";
  tmpArray = document.cookie.split("; ");
  for(var i=0; i<tmpArray.length; i++){
    tmpKey=tmpArray[i].split('=')[0];
    tmpVal=tmpArray[i].split('=')[1];
    switch(type){
      case "adops":
        if(tmpKey.substr(0,7)=="tmgads_" && tmpKey.length>0){
          tmp += ";ck_"+tmpKey.substr(7,tmpKey.length-7)+"="+tmpVal;
        }
      break;
      case "tmg":
        if(tmpKey=="tmg_p13n"){
          tmp += ";ck_pp_sub=null";
        }
      break;
      case "pp":
        if(tmpKey=="tmg_pid"){
          tmp += ";ck_pp_pid="+tmpVal;
        }
      break;
    }
  }
  return tmp;
}
///////////////////////////////////////////////////////////////////////////////////
// Get keywords
function tmgAdsGetAudienceScienceCookies(type){
  // type = 'tmg' or 'nontmg'
  // returns NNNNN for our cookies, Ennnnn_NNNNNN for nonTMG
  var tmp      = "";
  var tmpCount = 0;
  var tmpArray = tmgAdsGetCookie("rsi_segs").split("|");
  switch(type){
    case "tmg":
    for(var i=0;i<=tmpArray.length-1;i++){
      if(tmpArray[i].substr(0,7)=="E06560_" && tmpCount<=19){
        tmp += ";as="+tmpArray[i].substr(7,5);
        tmpCount++;
      } 
    }
    break;
    case "nontmg":
    for(var i=0;i<=tmpArray.length-1;i++){
      if(tmpArray[i].substr(0,7)!="E06560_" && tmpCount<=19){
        tmp += ";aso="+tmpArray[i];
        tmpCount++;
      }
    }
    break;
  }  
  return tmp;
}

///////////////////////////////////////////////////////////////////////////////////
// Get grapeshot values
function tmgAdsGetQuantcast(){
  tmp = "";
  if(typeof window.qcSegs != 'undefined'){
   tmp = qcSegs.toLowerCase();
  }
  return tmp;
}
///////////////////////////////////////////////////////////////////////////////////
// Get AS Connect - these are set per page, only two values per page though so no major impact on only need top pass the 5 digit number though to keep url brevity
function tmgAdsGetAudienceScienceConnect(){
  tmp="";
  var tmpArray = ['wl13399camp','wl13400camp','wl13463camp','wl13464camp'];
  for(i=0;i<=tmpArray.length-1;i++){
    tmpVal = eval("tmpArray"+"["+i+"]");
    // check to se if the var name is set and is not empty/null value
    if(eval("window."+tmpVal) != undefined && eval("window."+tmpVal+".length")>0){
      tmp += ";asc="+tmpArray[i].substring(2,7);
    }
  }
  return tmp;
}
///////////////////////////////////////////////////////////////////////////////////
// Get grapeshot values
function tmgAdsGetGrapeshot(){
  tmp = "";
  if(typeof window.gs_channels != 'undefined'){
    var tmpArray = window.gs_channels.split(",");
    for(var i=0;i<=tmpArray.length-1;i++){
      tmp += ";gs="+tmpArray[i].toLowerCase();
    }
  }
  return tmp;
}
///////////////////////////////////////////////////////////////////////////////////
// Get keywords
function tmgAdsGetKeywords(){
  return "";
}
///////////////////////////////////////////////////////////////////////////////////
// Get page url params
function tmgAdsGetUrlParams(){
  tmp = {};
  tmp['adtest']    = tmgAdsGetURLParam("adtest",window.location.href);
  tmp['adconsole'] = tmgAdsGetURLParam("adconsole",window.location.href);
  tmp['adkill']    = tmgAdsGetURLParam("adkill",window.location.href);
  tmp['adtype']    = tmgAdsGetURLParam("adtype",window.location.href);
  return tmp;
}
///////////////////////////////////////////////////////////////////////////////////
// Get Browser size
function tmgAdsGetBrowserSize(){
  var tmp={};
  if(document.all){
    tmp.biw = document.documentElement.offsetWidth;
    tmp.bih = document.documentElement.offsetHeight;
  } else {
    tmp.biw = window.innerWidth;
    tmp.bih = window.innerHeight;
  }
  return tmp;
}
///////////////////////////////////////////////////////////////////////////////////
// Fash Detect
function tmgAdsFlashDetect(){
  var FlashDetect=new function(){var self=this;self.installed=false;self.raw="";self.major=-1;self.minor=-1;self.revision=-1;self.revisionStr="";var activeXDetectRules=[{"name":"ShockwaveFlash.ShockwaveFlash.7","version":function(obj){return getActiveXVersion(obj);}},{"name":"ShockwaveFlash.ShockwaveFlash.6","version":function(obj){var version="6,0,21";try{obj.AllowScriptAccess="always";version=getActiveXVersion(obj);}catch(err){} return version;}},{"name":"ShockwaveFlash.ShockwaveFlash","version":function(obj){return getActiveXVersion(obj);}}];var getActiveXVersion=function(activeXObj){var version=-1;try{version=activeXObj.GetVariable("$version");}catch(err){}return version;};var getActiveXObject=function(name){var obj=-1;try{obj=new ActiveXObject(name);}catch(err){obj={activeXError:true};} return obj;};var parseActiveXVersion=function(str){var versionArray=str.split(",");return{"raw":str,"major":parseInt(versionArray[0].split(" ")[1],10),"minor":parseInt(versionArray[1],10),"revision":parseInt(versionArray[2],10),"revisionStr":versionArray[2]};};var parseStandardVersion=function(str){var descParts=str.split(/ +/);var majorMinor=descParts[2].split(/\./);var revisionStr=descParts[3];return{"raw":str,"major":parseInt(majorMinor[0],10),"minor":parseInt(majorMinor[1],10),"revisionStr":revisionStr,"revision":parseRevisionStrToInt(revisionStr)};};var parseRevisionStrToInt=function(str){return parseInt(str.replace(/[a-zA-Z]/g,""),10)||self.revision;};self.majorAtLeast=function(version){return self.major>=version;};self.minorAtLeast=function(version){return self.minor>=version;};self.revisionAtLeast=function(version){return self.revision>=version;};self.versionAtLeast=function(major){var properties=[self.major,self.minor,self.revision];var len=Math.min(properties.length,arguments.length);for(i=0;i<len;i++){if(properties[i]>=arguments[i]){if(i+1<len&&properties[i]==arguments[i]){continue;}else{return true;}}else{return false;}}};self.FlashDetect=function(){if(navigator.plugins&&navigator.plugins.length>0){var type='application/x-shockwave-flash';var mimeTypes=navigator.mimeTypes;if(mimeTypes&&mimeTypes[type]&&mimeTypes[type].enabledPlugin&&mimeTypes[type].enabledPlugin.description){var version=mimeTypes[type].enabledPlugin.description;var versionObj=parseStandardVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revisionStr=versionObj.revisionStr;self.revision=versionObj.revision;self.installed=true;}}else if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){var version=-1;for(var i=0;i<activeXDetectRules.length&&version==-1;i++){var obj=getActiveXObject(activeXDetectRules[i].name);if(!obj.activeXError){self.installed=true;version=activeXDetectRules[i].version(obj);if(version!=-1){var versionObj=parseActiveXVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revision=versionObj.revision;self.revisionStr=versionObj.revisionStr;}}}}}();};
  if(FlashDetect.installed){
    //this.flash['versionMaj']=FlashDetect.major; this.flash['versionMin']=FlashDetect.minor; this.flash['versionRev']=FlashDetect.revision; this.flash['versionRaw']=FlashDetect.raw;     	
    var tmp = {versionMaj:FlashDetect.major,versionMin:FlashDetect.minor,versionRev:FlashDetect.revision,versionRaw:FlashDetect.raw};     	
  } else {
    var tmp = {versionMaj:0,versionMin:0,versionRev:0,versionRaw:'none'};
  }
  return tmp;
}
///////////////////////////////////////////////////////////////////////////////////
// Serialize the tmgAds object for debugging.
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsSerializeArray(a){var b=function(a){var b=0,c=0,d=a.length,e="";for(c=0;c<d;c++){e=a.charCodeAt(c);if(e<128){b+=1}else if(e<2048){b+=2}else{b+=3}}return b};var c=function(a){var b=typeof a,c;var d;if(b==="object"&&!a){return"null"}if(b==="object"){if(!a.constructor){return"object"}var e=a.constructor.toString();c=e.match(/(\w+)\(/);if(c){e=c[1].toLowerCase()}var f=["boolean","number","string","array"];for(d in f){if(e==f[d]){b=f[d];break}}}return b};var d=c(a);var e,f="";switch(d){case"function":e="";break;case"boolean":e="b:"+(a?"1":"0");break;case"number":e=(Math.round(a)==a?"i":"d")+":"+a;break;case"string":e="s:"+b(a)+':"'+a+'"';break;case"array":case"object":e="a";var g=0;var h="";var i;var j;for(j in a){if(a.hasOwnProperty(j)){f=c(a[j]);if(f==="function"){continue}i=j.match(/^[0-9]+$/)?parseInt(j,10):j;h+=this.tmgAdsSerializeArray(i)+this.tmgAdsSerializeArray(a[j]);g++}}e+=":"+g+":{"+h+"}";break;case"undefined":default:e="N";break}if(d!=="object"&&d!=="array"){e+=";"}return e;
}
///////////////////////////////////////////////////////////////////////////////////
// Get metatag value
function tmgAdsGetMetaTag(tagname){
  var tmp = "null";
  if(document.getElementsByName(tagname)[0] != null){
    tmp = document.getElementsByName(tagname)[0].content;
  }
  return tmp.toLowerCase();
}
///////////////////////////////////////////////////////////////////////////////////
// get param value from url
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
// retrieve a cookie 
function tmgAdsGetCookie(name){
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++){
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==name){
      tmp = unescape(y);
    }
  }
  return tmp;
}
///////////////////////////////////////////////////////////////////////////////////
// get a cookie
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
// get the current timestamp 
function tmgAdsTimer(){
  var tmp = new Date();
  return Number(tmp);
  delete tmp; 
}
///////////////////////////////////////////////////////////////////////////////////
// Gets the current DoNotTrack value and normalises this 1=on 0=off - http://ie.microsoft.com/testdrive/browser/donottrack/default.html
function tmgAdsGetDoNotTrack(){
  if(navigator.doNotTrack)          tmp = navigator.doNotTrack;   // Standard method
  if(navigator.msDoNotTrack)        tmp = navigator.msDoNotTrack; // MSIE method
  if(typeof(this.dnt)=="undefined") tmp = 0; // Safari on iDevices
  if(tmp=="unspecified")            tmp = 0; // Normalise Firefox
  if(tmp.dnt=="yes")                tmp = 1; // Normalise Firefox
  return tmp;
}
///////////////////////////////////////////////////////////////////////////////////
// Get topLeft position of the ad in the page
function tmgAdsGetAdPos(obj) {
  var curleft = curtop = 0;
  if (obj.offsetParent) {
   curleft = obj.offsetLeft
   curtop = obj.offsetTop
   while (obj = obj.offsetParent) {
     curleft += obj.offsetLeft;
     curtop += obj.offsetTop;
    }
  }
  return {posX:curleft,posY:curtop};
}
///////////////////////////////////////////////////////////////////////////////////
// function returns visibility of unit in page at the moment, futureproofing AdViewability
function tmgGetAdVisibility(i){
  if(((tmgAds.ads[i]['posX']+tmgAds.ads[i]['size']['width']) < tmgAds.browser.biw) && tmgAds.ads[i]['posY'] < tmgAds.browser.bih){
    tmgAds.ads[i]['visibilityW'] = tmgAds.ads[i]['size']['width'];
  } else {
    tmgAds.ads[i]['visibilityW'] = tmgAds.browser.biw - tmgAds.ads[i]['posX'];
  }
  if((tmgAds.ads[i]['posY']+tmgAds.ads[i]['size']['height']) < tmgAds.browser.bih){
    tmgAds.ads[i]['visibilityH'] = tmgAds.ads[i]['szH'];
  } else {
    tmgAds.ads[i]['visibilityH'] = tmgAds.browser.bih - tmgAds.ads[i]['posY'];
  }
  var tmp = (tmgAds.ads[i]['visibilityH']*tmgAds.ads[i]['visibilityW']) / (tmgAds.ads[i]['size']['height']*tmgAds.ads[i]['size']['width']);
  if(tmp<0){
    tmp = 0;
  } else {
    tmp = (tmgAds.ads[i]['visibilityH']*tmgAds.ads[i]['visibilityW']) / (tmgAds.ads[i]['size']['height']*tmgAds.ads[i]['size']['width']);
  }

  return tmp;
}
///////////////////////////////////////////////////////////////////////////////////
// GET MAX SIZE OF SZ VALUES TO CREATE IFRAME IF CALLED - calculate by getting area of the various sizes sent.
function tmgAdsGetMaxAdSize(adSize){
  var tmp = {};
  var tmgAdSizes = adSize.split(",");
  var tmgAdArea=0;
  for(i in tmgAdSizes){
    // fix the for in...loop issues - http://stackoverflow.com/questions/1529593/javascript-custom-array-prototype-interfering-with-for-in-loops
    if(tmgAdSizes.hasOwnProperty(i)){
      tmgAdTmpSize  = tmgAdSizes[i].split("x");
      if(tmgAdTmpSize[0]*tmgAdTmpSize[1]>tmgAdArea){
        tmgAdArea=tmgAdTmpSize[0]*tmgAdTmpSize[1];
        tmgAdDims=i;
      }
    }
  }
  tmp['max']        = tmgAdSizes[tmgAdDims].split("x");
  tmp['width']      = parseInt(tmp['max'][0]);
  tmp['height']     = parseInt(tmp['max'][1]);
  tmp['dimensions'] = tmp['width']+"x"+tmp['height'];
  tmp['area']       = tmp['width']*tmp['height'];
  delete tmp['max'];
  return tmp;
}
///////////////////////////////////////////////////////////////////////////////////
// Build and return an adtag
function tmgAdsBuildAdTag(adType,adSize,adScriptType,adExtraTags,adStyle){
  // create var n to hold the tile value
  var n = ++tmgAds.dfp['tile'];
  // fix old video calls using adx, foce them to pfadx if at=vid
  if(adType==="vid" && adScriptType==="adx"){
    adScriptType="pfadx";
  }
  tmgAds.performance[n] = {}; // create an object to hold render times
  //force an ad invocation type, adi or adj only
  if(tmgAds.page.urlParams['adtype']) adScriptType = tmgAds.urlParams['adtype'];
  // Build out the adtag
  tmgAds.ads[n]          = {}; // create array for this tag
  tmgAds.ads[n]['dfp']   = {adv:'-',aid:'-',buy:'-',cid:'-',sid:'-',pid:'-',rid:'-',site:'-',env:'-',geo:'-'}; // holds the DFP sepcific data for this tag
  tmgAds.ads[n]['func']  = {type:adType,size:adSize,invoc:adScriptType,extra:adExtraTags,style:adStyle}; // records data from the function invocation
  tmgAds.ads[n]['id']        = adType.replace(/\,/g,"").substring(0,3);
  tmgAds.ads[n]['id_iframe'] = "tmgAd_iframe_"+tmgAds.ads[n]['id']+"_"+n;
  tmgAds.ads[n]['id_script'] = "tmgAd_script_"+tmgAds.ads[n]['id']+"_"+n;
  tmgAds.ads[n]['id_div']    = "tmgAd_div_"+tmgAds.ads[n]['id']+"_"+n;

  // Adtypes can be >1, create all needed here.
  tmgAds.ads[n]['kvps']    = "";
  var adTypes = adType.split(",");
  for(var i=0;i<=adTypes.length-1;i++) tmgAds.ads[n]['kvps'] += ";at="+adTypes[i];
  tmgAds.ads[n]['kvps'] += ";sc="  + tmgAds.page.section;
  tmgAds.ads[n]['kvps'] += ";pt="  + tmgAds.page.pagetype;
  tmgAds.ads[n]['kvps'] += ";lvl=" + tmgAds.page.level;
  tmgAds.ads[n]['kvps'] += ";biw=" + tmgAds.browser.biw;
  tmgAds.ads[n]['kvps'] += ";bih=" + tmgAds.browser.bih;
  tmgAds.ads[n]['kvps'] += ";fv="  + tmgAds.flash.versionMaj;
  tmgAds.ads[n]['kvps'] += ";dnt=" + tmgAds.adops.doNotTrack;
  tmgAds.ads[n]['kvps'] += ";pos=" + tmgAds.dfp.tile;  
  tmgAds.ads[n]['kvps'] += tmgAds.page.grapeshot;
  tmgAds.ads[n]['kvps'] += tmgAds.page.keywords;
  tmgAds.ads[n]['kvps'] += tmgAds.page.quantcast;
  tmgAds.ads[n]['kvps'] += tmgAds.page.audienceScienceConnect;
  if(tmgAds.page.videosrc != "null")  tmgAds.ads[n]['kvps'] += ";vidsrc=" + tmgAds.page.videosrc;
  if(tmgAds.page.articleid != "null") tmgAds.ads[n]['kvps'] += ";pg="  + tmgAds.page.articleid;
  if(tmgAds.page.geo != "null")       tmgAds.ads[n]['kvps'] += ";geo=" + tmgAds.page.geo;
  if(tmgAds.page.urlParams['adtest']) tmgAds.ads[n]['kvps'] += ";test="+ tmgAds.page.urlParams['adtest'];
  if(adExtraTags)                     tmgAds.ads[n]['kvps'] += adExtraTags; // add tags opassed to this function call.
  tmgAds.ads[n]['kvps'] += tmgAds.cookies.audienceScience;
  tmgAds.ads[n]['kvps'] += tmgAds.cookies.audienceScienceOther;
  tmgAds.ads[n]['kvps'] += tmgAds.cookies.adops;
  tmgAds.ads[n]['kvps'] += tmgAds.cookies.tmg;
  tmgAds.ads[n]['kvps'] += tmgAds.cookies.pp;
  tmgAds.ads[n]['kvps'] += ";dc_ref=" + encodeURIComponent(tmgAds.page['url']);
  tmgAds.ads[n]['kvps'] += ";div="    + tmgAds.ads[n]['id_div'];
  tmgAds.ads[n]['kvps'] += ";tile="   + n;
  tmgAds.ads[n]['kvps'] += ";sz="     + adSize;
  tmgAds.ads[n]['kvps'] += ";ord="    + tmgAds.dfp.ord;
  // Construct the KeyValuePairs to append to the adtag url string
  tmgAds.ads[n]['url'] = tmgAds.page.protocol+"//"+tmgAds.dfp.adserver+"/"+tmgAds.dfp.networkid+"/"+adScriptType+"/"+tmgAds.dfp.sitezone+tmgAds.ads[n]['kvps']+"?";
  
  // GET MAX SIZE OF SZ VALUES TO CREATE IFRAME IF CALLED - calculate by getting area of the various sizes sent.
  tmgAds.ads[n]['size'] = tmgAdsGetMaxAdSize(adSize);
  // Build the adtag and container div styles if needed.
  switch(adScriptType){
    case "adi":
      tmgAds.ads[n]['tag'] = "<ifr"+"ame id=\""+tmgAds.ads[n]['id_iframe']+"\" src=\""+tmgAds.ads[n]['url']+"\" width=\""+tmgAds.ads[n]['size']['width']+"\" height=\""+tmgAds.ads[n]['size']['height']+"\" marginwidth=\"0\" marginheight=\"0\" hspace=\"0\" vspace=\"0\" frameborder=\"0\" scrolling=\"no\" bordercolor=\"#000000\"><\/ifr"+"ame>"; break
    case "adj":
      tmgAds.ads[n]['tag'] = "<scr"+"ipt type=\"text/javascript\" id=\""+tmgAds.ads[n]['id_script']+"\" src=\""+tmgAds.ads[n]['url']+"\"><\/scr"+"ipt>"; break
    case "adx":
      tmgAds.ads[n]['tag'] = tmgAds.ads[n]['url']; break
    case "pfadx":
      tmgAds.ads[n]['tag'] = tmgAds.ads[n]['url']; break
    default:
      tmgAds.ads[n]['tag'] = tmgAds.ads[n]['url']; break
  }
  // store the base tag for use later
  tmgAds.ads[n]['tagBase'] = tmgAds.ads[n]['tag'];
  switch(adStyle){
    case 0: // URL ONLY
      tmgAds.ads[n]['tag'] = tmgAds.ads[n]['url']; break;
    case 1: // FULL FORMED TAG - NO CONTAINER DIV
      tmgAds.ads[n]['tag'] = tmgAds.ads[n]['tag']; break;
    case 2: // FULL FORMED TAG + DIV
      tmgAds.ads[n]['tag']  = "<div id=\""+tmgAds.ads[n]['id_div']+"\" style=\"margin:auto;padding:0px;width:"+tmgAds.ads[n]['size']['width']+"px\">"+tmgAds.ads[n]['tag']+"</div>"; break;
    case 3: // v2.0 Ooyala player returns url without trailing ?
      tmgAds.ads[n]['tag'] = "<div id=\"tmgAd_"+tmgAds.ads[n]['id_div']+"\">"+tmgAds.ads[n]['tag']+"</div>"; break;
    default: // FULL FORMED TAG + DIV
      tmgAds.ads[n]['tag'] = "<div id=\"tmgAd_"+tmgAds.ads[n]['id_div']+"\">"+tmgAds.ads[n]['tag']+"</div>"; break;
  }
  // Produce Debug info, this is turned on as default - add Firebug console logging for ad executions - ads our adtimer function for reporting/logging slow ads etc.
  tmgAds.ads[n]['tagPreScript']   = "tmgAds.performance["+n+"] = {};";
  tmgAds.ads[n]['tagPreScript']  += "tmgAds.performance["+n+"].begin = tmgAdsTimer();";

  tmgAds.ads[n]['tagPostScript']  = "tmgAds.performance["+n+"].finish= tmgAdsTimer();";  
  tmgAds.ads[n]['tagPostScript'] += "tmgAds.performance["+n+"].time  = tmgAds.performance["+n+"].finish - tmgAds.performance["+n+"].begin;";
  tmgAds.ads[n]['tagPostScript'] += "tmgAds.performance.adTotal     += tmgAds.performance["+n+"].time;";
  tmgAds.ads[n]['tagPostScript'] += "tmgAds.performance.adAvg        = tmgAds.performance.adTotal/"+n+";";
  tmgAds.ads[n]['tagPostScript'] += "tmgAds.performance.adCount      = "+n+";";
  // optional params for debugging & testing
  if(tmgAds.page.urlParams['adconsole']==="on"){
    tmgAds.ads[n]['tagPreScript'] += "console.profile('TMG.AdOps.Firebug.Profile["+adType+"]:');"; 
    tmgAds.ads[n]['tagPostScript'] = tmgAds.ads[n]['tagPostScript']+"console.profileEnd('TMG.AdOps.Firebug.Profile["+adType+"]:');";     
  } 
  // kills ads in page, wraps them in comment tags, used to ascertain if ads are causing problems on page or isiolate other issues without ads confusing debugging.
  if(tmgAds.page.urlParams['adkill']==="on"){
    tmgAds.ads[n]['tag'] = "<!--// Ad ["+adType+"] removed due to killswitch //-->";;
    tmgAds.ads[n]['tagPreScript'] += "console.profile('TMG.AdOps.Kill.Ad["+adType+"]: Ad removed due to killswitch adkill=on');";
  }
  // make this a bit more logical, only write out the script tags if they need to do something
  tmgAds.ads[n]['tagPreScript'] = "<scr"+"ipt type=\"text/javascript\">"+tmgAds.ads[n]['tagPreScript']+"</scr"+"ipt>";
  tmgAds.ads[n]['tagPostScript']= "<scr"+"ipt type=\"text/javascript\">"+tmgAds.ads[n]['tagPostScript']+"</scr"+"ipt>";
  // build the final taga and return this, for adx calls make sure the response is ONLY a url otherwise will break apps
  if(adScriptType==="adx" || adScriptType==="pfadx"){
    tmgAds.ads[n]['tag'] = tmgAds.ads[n]['url'];
  } else {
    // Fix Fashion galleries, only return IFRAME tag, don't wrap with timer tags sc=fashion-galleries and iframe adi call this returns the normal unaltered/unwrapped tag IF fashion galleries using iframes by not wrappign the tag
    if(tmgAds.dfp.section!="fashion-galleries" && adScriptType!="adi"){
      tmgAds.ads[n]['tag'] = tmgAds.ads[n]['tagPreScript'] + tmgAds.ads[n]['tag'] + tmgAds.ads[n]['tagPostScript'];
    }
  } 
  return tmgAds.ads[n]['tag'];
}
///////////////////////////////////////////////////////////////////////////////////
function tmgAdsGetAdSlotInfo(i){
    // some ads don't have this, eg; video adx calls, use else rather than set vars default first as quicker/less steps.
    if((tmgAds.ads[i]['func']['invoc']!="adx" && tmgAds.ads[i]['func']['invoc']!="pfadx") && tmgAds.page.urlParams['adkill']!="on" && tmgAds.page.pagetype!="gallery"){
      tmgAds.ads[i]['divW']   = document.getElementById(tmgAds.ads[i]['id_div']).offsetWidth;    
      tmgAds.ads[i]['divH']   = document.getElementById(tmgAds.ads[i]['id_div']).offsetHeight;   
      tmgAds.ads[i]['pos']    = tmgAdsGetAdPos(document.getElementById(tmgAds.ads[i].id_div));
      //tmgAds.ads[i]['posX']   = tmgAds.ads[i]['pos'][0];
      //tmgAds.ads[i]['posY']   = tmgAds.ads[i]['pos'][1];
      tmgAds.ads[i]['innerHTML']     = unescape(document.getElementById(tmgAds.ads[i].id_div).innerHTML);
    } else {
      tmgAds.ads[i]['divW']   = 0;
      tmgAds.ads[i]['divH']   = 0;
      tmgAds.ads[i]['pos']    = [0,0];
      tmgAds.ads[i]['posX']   = tmgAds.ads[i]['pos'][0];
      tmgAds.ads[i]['posY']   = tmgAds.ads[i]['pos'][1];
      tmgAds.ads[i]['innerHTML'] = "";
      tmgAds.performance[i]['begin']   = "n/a";
      tmgAds.performance[i]['finish']  = "n/a";
      tmgAds.performance[i]['time']    = "n/a";
    }
}
///////////////////////////////////////////////////////////////////////////////////////////
// RUN THESE AFTER PAGE HAS LOADED
// updates the tmgAdss object, 
(function($) {
 $(document).ready(function() {
  tmgAds.adops['jquery'] = $().jquery;
  // amend tmgAds with post window.ready data
  for(var i=1;i<=tmgAds.dfp.tile;i++){
    tmgAdsGetAdSlotInfo(i);
  } 

  // add other required data 
  //tmgAds.browser = {}; 
  for(var property in navigator){ 
    var str = navigator[property];
    if(typeof navigator[property] != "object"){
      tmgAds.browser[property] = str; 
    }
  } 
  // add performance data if available
  if(typeof window.performance != "undefined"){
    for(var property in performance['timing']){ 
      var str = performance['timing'][property];
      if(typeof performance['timing'][property] != "object"){
        tmgAds['performance'][property] = str;
      }
    }  
  }

 });
})(jQuery);
