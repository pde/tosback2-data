// LATEST AMENDS
// 1.01 - moved sz & tile to end of each tag for best performance - http://www.google.com/support/dfp/bin/answer.py?hl=en&answer=165714
// 1.02 - fixed bug: only sz and kw can take comma delimited lists of values
// 1.03 - fixed bug: comma delimited vars - 'at'
// 1.04 - fixed bug: 'as' tags now unique per value max 20 values
// 1.05 - added support for; adj,adi,adx responses
// 1.06 - fix bug: 55 char limit on values of KVPs, amended thos that would exceed this.
// 1.07 - added id tags to iframe, script and enclsoing div tags naming convention - tmgAd_adType_tilevalue
// 1.10 - Main UAT 20011-03
// 1.11 - 2011-04-04 - keyword removal, fix AS cookies
// 2.00 - 2011-05-20 - adds Audience Science non TMG Segment
// 3.00 - 2011-07-11 - adds Audience Science Connect support        
// 4.00 - 2011-10-13 - added grapeshot code
// 4.01 - 2011-10-13 - Removed any if statements when building each tag KVP, these checked if vars existed, we now declare  all vars first
// 4.02 - 2011-10-13 - Cleaned up some logic on reading/writign cookies 
// 4.03 - 2011-10-13 - added dom= domainname of where ad is served
// 4.04 - 2011-10-19 - added ability to deal with multiple Grapehsot values of gs_channels eg gs_channels=var1,var2,var3
// 4.05 - 2012-01-25 - added Yieldex logging to 'u' KVP // bugfix - not passing 'aso' cookie data // added KVP 'sl' to monitor string length of the tag
// 4.10 - 2012-01-26 - added all non TMG AS values to Yieldex tag (asc aso) // bugfix - gs value extra '|' 
// 4.11 - 2012-02-03 - bugfix - cleaned up 'u' Yieldex logging param, removed empty values, reduced ad-url-string length
// 4.12 - 2012-02-20 - added cookie function tmgAdsSetCookie
// 4.13 - 2012-02-22 - bugfix - fix extra sz values on Yieldex u= tag
////////////////////////////////////////////////////////////////////////////////////
// DETECT FLASH VERSION http://www.featureblend.com/flash_detect_1-0-4 - http://www.featureblend.com/license.txt
var FlashDetect=new function(){var self=this;self.installed=false;self.raw="";self.major=-1;self.minor=-1;self.revision=-1;self.revisionStr="";var activeXDetectRules=[{"name":"ShockwaveFlash.ShockwaveFlash.7","version":function(obj){return getActiveXVersion(obj);}},{"name":"ShockwaveFlash.ShockwaveFlash.6","version":function(obj){var version="6,0,21";try{obj.AllowScriptAccess="always";version=getActiveXVersion(obj);}catch(err){}
return version;}},{"name":"ShockwaveFlash.ShockwaveFlash","version":function(obj){return getActiveXVersion(obj);}}];var getActiveXVersion=function(activeXObj){var version=-1;try{version=activeXObj.GetVariable("$version");}catch(err){}
return version;};var getActiveXObject=function(name){var obj=-1;try{obj=new ActiveXObject(name);}catch(err){obj={activeXError:true};}
return obj;};var parseActiveXVersion=function(str){var versionArray=str.split(",");return{"raw":str,"major":parseInt(versionArray[0].split(" ")[1],10),"minor":parseInt(versionArray[1],10),"revision":parseInt(versionArray[2],10),"revisionStr":versionArray[2]};};var parseStandardVersion=function(str){var descParts=str.split(/ +/);var majorMinor=descParts[2].split(/\./);var revisionStr=descParts[3];return{"raw":str,"major":parseInt(majorMinor[0],10),"minor":parseInt(majorMinor[1],10),"revisionStr":revisionStr,"revision":parseRevisionStrToInt(revisionStr)};};var parseRevisionStrToInt=function(str){return parseInt(str.replace(/[a-zA-Z]/g,""),10)||self.revision;};self.majorAtLeast=function(version){return self.major>=version;};self.minorAtLeast=function(version){return self.minor>=version;};self.revisionAtLeast=function(version){return self.revision>=version;};self.versionAtLeast=function(major){var properties=[self.major,self.minor,self.revision];var len=Math.min(properties.length,arguments.length);for(i=0;i<len;i++){if(properties[i]>=arguments[i]){if(i+1<len&&properties[i]==arguments[i]){continue;}else{return true;}}else{return false;}}};self.FlashDetect=function(){if(navigator.plugins&&navigator.plugins.length>0){var type='application/x-shockwave-flash';var mimeTypes=navigator.mimeTypes;if(mimeTypes&&mimeTypes[type]&&mimeTypes[type].enabledPlugin&&mimeTypes[type].enabledPlugin.description){var version=mimeTypes[type].enabledPlugin.description;var versionObj=parseStandardVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revisionStr=versionObj.revisionStr;self.revision=versionObj.revision;self.installed=true;}}else if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){var version=-1;for(var i=0;i<activeXDetectRules.length&&version==-1;i++){var obj=getActiveXObject(activeXDetectRules[i].name);if(!obj.activeXError){self.installed=true;version=activeXDetectRules[i].version(obj);if(version!=-1){var versionObj=parseActiveXVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revision=versionObj.revision;self.revisionStr=versionObj.revisionStr;}}}}}();};


////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
function tmgAdsInitAdsData(){
  this.tags     = new Array();
  this.domain   = window.location.hostname;
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
  this.tile     = 0;
  if(document.all){
    this.biw = document.documentElement.offsetWidth;
    this.bih = document.documentElement.offsetHeight;
  } else {
    this.biw = window.innerWidth;
    this.bih = window.innerHeight;
  }
  if(FlashDetect.installed){
    this.flashversion = FlashDetect.major;     	
  }
  this.articleid   = tmgAdsGetMetaTag("tmgads.articleid");
  // KEYWORDS
  this.keywords = "";
  // GET SEARCH ENGINE KEYWORDS
  // removed for brevity

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

  // Add adtest url param if present
  this.tmgURLTestVar = tmgAdsGetURLParam("adtest",window.location.href);
  // Add 'ord' cachebuster
  this.ord   = Number(new Date());
}

function tmgAdsGetMetaTag(tagname){
  var output = "null";
  if(document.getElementsByName(tagname)[0] != null){
    output = document.getElementsByName(tagname)[0].content;
  }
  return output.toLowerCase();
}

function tmgAdsGetURLParam(strParamName,URL){
  var strReturn = "";
  var strHref = URL;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = ";test="+aParam[1];
        break;
      }
    }
  } else {
    strReturn = "";
  }
  return unescape(strReturn);
}

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

function tmgAdsBuildAdTag(adType,adSize,adScriptType,adExtraTags,adStyle){
  ++tmgAds.tile;
  // Adtypes can be >1, create all needed here.
  this.kvps = "";
  this.dfpLogging = "at=";
  var adTypes = adType.split(",");
  for(var i=0;i<=adTypes.length-1;i++){
    this.kvps       += ";at="+adTypes[i];
    this.dfpLogging += adTypes[i]+",";
  }
  this.dfpLogging = this.dfpLogging.substr(0,this.dfpLogging.length-1);
  //
  this.kvps += ";pos=" + tmgAds.tile;  
  this.kvps += ";sc="  + tmgAds.section;
  this.kvps += ";pt="  + tmgAds.pagetype;
  this.kvps += ";pg="  + tmgAds.articleid;
  this.kvps += ";lvl=" + tmgAds.level;
  this.kvps += ";biw=" + tmgAds.biw;
  this.kvps += ";bih=" + tmgAds.bih;
  this.kvps += ";fv="  + tmgAds.flashversion;
  // Add dynamic data eg;  AudienceScience, Cookies, Grapeshot, domain
  this.kvps += adExtraTags;
  this.kvps += tmgAds.tmgURLTestVar;
  this.kvps += tmgAds.asCookies;
  this.kvps += tmgAds.asoCookies;
  this.kvps += tmgAds.asConnect;
  this.kvps += tmgAds.tmgCookies;
  this.kvps += tmgAds.gsSegments;
  this.kvps += tmgAds.keywords;
  this.kvps += tmgAds.ppCookies;
  this.kvps += ";dom=" + tmgAds.domain;
  // Add Yeidlex u= targeting here; NB: the adtype has already been ascertained at the top of this function
    this.dfpLogging += "|sz="  + adSize;
    this.dfpLogging += "|sc="  + tmgAds.section;
    this.dfpLogging += "|pt="  + tmgAds.pagetype;
    if(tmgAds.articleid != "null"){
      this.dfpLogging += "|pg="  + tmgAds.articleid;
    }
    this.dfpLogging += "|lvl=" + tmgAds.level;
    this.dfpLogging += "|biw=" + tmgAds.biw;
    this.dfpLogging += "|bih=" + tmgAds.bih;
    this.dfpLogging += "|fv="  + tmgAds.flashversion;
    if(tmgAds.asCookies.length>0){
      this.dfpLogging += "|as="  + tmgAds.asCookies.substr(1).replace(/\;/g,",").replace(/as\=/g,"");
    }
    if(tmgAds.asoCookies.length>0){
      this.dfpLogging += "|aso=" + tmgAds.asoCookies.substr(1).replace(/\;/g,",").replace(/aso\=/g,"");
    }
    if(tmgAds.asConnect.length>0){
      this.dfpLogging += "|asc=" + tmgAds.asConnect.substr(1).replace(/\;/g,",").replace(/asc\=/g,"");
    }
    if(tmgAds.ppCookies.length>0){
      this.dfpLogging += "|"     + tmgAds.ppCookies.replace(/\;/g,"");   
    }
    if(tmgAds.gsSegments.length>0){
      this.dfpLogging += "|"     + tmgAds.gsSegments.replace(/\;/g,"");   
    }
  this.kvps += ";u=" + this.dfpLogging;  
  // Best practice/performance to place these values at end of url.
  this.kvps += ";sz="  + adSize;
  this.kvps += ";tile="+ tmgAds.tile;
  this.kvps += ";sl="  + (this.kvps.length+1);  // sets the length of string includes +19 for the ord=...
  this.kvps += ";ord=" + tmgAds.ord + "?";
  // Add this to the window.tmgAds.tags array
  tmgAds.tags[tmgAds.tile] = tmgAds.protocol+tmgAds.adserver+"/"+adScriptType+"/"+tmgAds.sitezone+this.kvps;
  // BUILD THE TAG TYPE
  switch(adScriptType){
    case "adi":
      // GET MAX SIZE OF SZ VALUES TO CREATE IFRAME IF CALLED
      var tmgAdSizes = adSize.split(",");
      if(tmgAdSizes.length>=2){
        tmgAdHeight = 0;
        tmgAdWidth  = 0;
      } else {
        tmgAdWidth  = adSize.split("x")[0];
        tmgAdHeight = adSize.split("x")[1];
      }
      tmgAds.output = "<ifr"+"ame id=\"tmgAd_iframe_"+adType.replace(/\,/g,"")+"_"+tmgAds.tile+"\" src=\""+tmgAds.tags[tmgAds.tile]+"\" width=\""+tmgAdWidth+"\" height=\""+tmgAdHeight+"\" marginwidth=\"0\" marginheight=\"0\" hspace=\"0\" vspace=\"0\" frameborder=\"0\" scrolling=\"no\" bordercolor=\"#000000\"><\/ifr"+"ame>"; 
      break
    case "adj":
      tmgAds.output = "<scr"+"ipt type=\"text/javascript\" id=\"tmgAd_script_"+adType.replace(/\,/g,"")+"_"+tmgAds.tile+"\" src=\""+tmgAds.tags[tmgAds.tile]+"\"><\/scr"+"ipt>"; 
      break
    case "adx":
      tmgAds.output = tmgAds.tags[tmgAds.tile]; 
      break
  }
  switch(adStyle){
    case 0: // URL ONLY
      tmgAds.output = tmgAds.tags[tmgAds.tile]; 
      break;
    case 1: // FULL FORMED TAG
      tmgAds.output = tmgAds.output; 
      break;
    case 2: // FULL FORMED TAG + DIV
      tmgAds.output = "<div id=\"tmgAd_"+adType.replace(/\,/g,"")+"_"+tmgAds.tile+"\">"+tmgAds.output+"</div>"; 
      break;
    case 3: // v2.0 Ooyala player returns url without trailing ?
        tmgAds.output = tmgAds.tags[tmgAds.tile].substring(0,tmgAds.tags[tmgAds.tile].length-1);
        break;
    default: // FULL FORMED TAG + DIV
      tmgAds.output = "<div id=\"tmgAd_"+adType.replace(/\,/g,"")+"_"+tmgAds.tile+"\">"+tmgAds.output+"</div>"; 
      break;
  }
  // return the output
  return tmgAds.output
}
////////////////////////////////////////////////////////////////////////////////////////////
// INITIALISE tmgAds object
var tmgAds = new tmgAdsInitAdsData();

