//This is a general library for working with Overture Content Match links
//Version: 1.0 
//Last Modified: 6-14-2007
//Author: Michael Stenzler

//This is a Javascript object to encapsulate one row of overture data
var overtureItem = function(pdescription, punused, pclickUrl, ptitle, psitehost, pbidded) {
   var description = pdescription;
   var unused   = punused;
   var clickUrl = pclickUrl;
   var title    = ptitle;
   var sitehost = psitehost;
   var bidded   = pbidded;

   this.setDescription = function(ldescription) { description = ldescription; }
   this.setUnused = function(lunused) { unused = lunused; }
   this.setClickUrl = function(lclickUrl) { clickUrl = lclickUrl; }
   this.setTitle = function(ltitle) { title = ltitle; }
   this.setSitehost = function(lsitehost) { sitehost = lsitehost; }
   this.setBidded = function(lbidded) { bidded = lbidded; }

   this.getDescription = function() { return  description; }
   this.getUnused = function() { return unused; }
   this.getClickUrl = function() { return clickUrl; }
   this.getTitle = function() { return title; }
   this.getSitehost = function() { return sitehost; }
   this.getBidded = function() { return bidded; }

   this.printItem = function() {
     var printString = "<p>description = " + description + "<br>" +
                       "unused = " +  unused + "<br>" +
                       "clickUrl = " + clickUrl + "<br>" +
                       "title = " +    title + "<br>" +
                       "sitehost = " + sitehost + "<br>" +
                       "bidded = " +   bidded + "</p>";
    document.writeln(printString);
   }
}

var overtureLinkSpotItem = function(ptitle, pkeywords) {

   var title = ptitle;
   var keywords = pkeywords.split(", ");

   this.setTitle = function(ltitle) { title = ltitle; }
   this.setKeywords = function(lkweywords) { keywords = lkeywords; }
   this.setKeywordsFromString = function (lstring) { keywords = lstring.split(", "); }

   this.getTitle = function() { return title; }
   this.getKeywords = function() { return keywords; }
   this.getKeyword = function(i) { return keywords[i]; }

   this.printItem = function() {
     var printString = "<p>title = " + title + "<br>" +
                       "keywords = ";
     for(i=0; i<keywords.length; i++) {
       if(i>0) { printString += ", " }
       printString += keywords[i];
     }
    document.writeln(printString);
   }

}


//This is a Javascript object to encapsulate an array of Overture Items 
var overtureLinks = function() {
  var listItems = new Array();
  this.addItem = function(item) {
     var i = listItems.length;
     listItems[i] = item;
  }

  this.getItems = function() { return listItems; }
  this.getItem = function(i) { return listItems[i]; }
  this.length = function() { return listItems.length; }

  this.printItems = function() {
     var i = 0;
     while (i < listItems.length) {
        var currItem = listItems[i];
        currItem.printItem();
        i++;
     }
  }
  
}

//This is a Javascript object to hold configuration data for the creation of an
//Overture Search link
var overtureSearchConf = function() {
    var baseUrl = g_baseOvertureSearchUrl;
    var partner = g_overtureSearchPartner;
    var keywords;
    var type;
    var keywordCharEnc;
    var outputCharEnc;
    var urlFilters;
    var termFilters;
    var serveUrl;
    var maxCount;

    this.setBaseUrl = function(lbaseUrl) { baseUrl = lbaseUrl; }
    this.setPartner = function(lpartner) { partner = lpartner; }
    this.setKeywords = function(lkeywords) { keywords = lkeywords; }
    this.setType = function(ltype) { type = ltype; }
    this.setKeywordCharEnc = function(lkeywordCharEnc) { keywordCharEnc = lkeywordCharEnc; } 
    this.setOutputCharEnc = function(loutputCharEnc) { outputCharEnc = loutputCharEnc; } 
    this.setUrlFilters = function(lurlFilters) { urlFilters = lurlFilters; }
    this.setTermFilters = function(ltermFilters) { termFilters = ltermFilters; }
    this.setServeUrl = function(lserveUrl) { serveUrl = lserveUrl; }
    this.setMaxCount = function(lmaxCount) { maxCount = lmaxCount; }

    this.getBaseUrl = function() { return baseUrl; }
    this.getPartner = function() { return partner; }
    this.getKeywords = function() { return keywords; }
    this.getType = function() { return type; }
    this.getKeywordCharEnc = function() { return keywordCharEnc; }
    this.getOutputCharEnc = function() { return outputCharEnc; }
    this.getUrlFilters = function() { return urlFilters; }
    this.getTermFilters = function() { return termFilters; }
    this.getServeUrl = function() { return serveUrl; }
    this.getMaxCount = function() { return maxCount; }
}

//This is a Javascript object to hold configuration data for the creation of a content
//match link
var overtureContentMatchConf = function() {
    var baseUrl = g_baseOvertureCMUrl;
    var source = g_overtureCMSource;
    var config = g_overtureCMConfig;
    var ctxtId;
    var ctxtIdMap;
    var ctxtUrl;
    var ctxtCat;
    var ctxtCatMap;
    var ctxtKeywords;
    var mkt;
    var type;
    var typeMap;
    var keywordCharEnc;
    var outputCharEnc;
    var maxCount;


    this.setBaseUrl = function(lbaseUrl) { baseUrl = lbaseUrl; }
    this.setSource = function(lsource) { partner = lsource; }
    this.setCtxtId = function(lctxtId) { ctxtId = lctxtId; }
    this.setCtxtIdMap = function(lctxtIdMap) { ctxtIdMap = lctxtIdMap; }
    this.setCtxtUrl = function(lctxtUrl) { ctxtUrl = lctxtUrl; }
    this.setCtxtCat = function(lctxtCat) { ctxtCat = lctxtCat; }
    this.setCtxtCatMap = function(lctxtCatMap) { ctxtCatMap = lctxtCatMap; }
    this.setCtxtKeywords = function(lctxtKeywords) { ctxtKeywords = lctxtKeywords; }
    this.setMkt = function(lmkt) { mkt = lmkt; }
    this.setType = function(ltype) { type = ltype; }
    this.setTypeMap = function(ltypeMap) { typeMap = ltypeMap; }
    this.setKeywordCharEnc = function(lkeywordCharEnc) {keywordCharEnc = lkeywordCharEnc; }
    this.setOutputCharEnc = function(loutputCharEnc) { outputCharEnc = loutputCharEnc; }
    this.setConfig = function(lconfig) { config = lconfig; }
    this.setMaxCount = function(lmaxCount) { maxCount = lmaxCount; }

    this.getBaseUrl = function() { return baseUrl; }
    this.getSource = function() { return source; }
    this.getCtxtId = function() { return ctxtId; }
    this.getCtxtIdMap = function() { return ctxtIdMap; }
    this.getCtxtUrl = function() { return ctxtUrl; }
    this.getCtxtCat = function() { return ctxtCat; }
    this.getCtxtCatMap = function() { return ctxtCatMap; }
    this.getCtxtKeywords = function() { return ctxtKeywords; }
    this.getMkt = function() { return mkt; }
    this.getType = function() { return type; }
    this.getTypeMap = function() { return typeMap; }
    this.getKeywordCharEnc = function() { return keywordCharEnc; }
    this.getOutputCharEnc = function() { return outputCharEnc; }
    this.getConfig = function() { return config; }
    this.getMaxCount = function() { return maxCount; }
} 

//This is a Javascript object to hold configuration data for the creation of an
//Overture Linkspot link
var overtureLinkspotConf = function() {
    var baseUrl =  g_baseOvertureLinkspotUrl;
    var source = g_overtureLinkspotSource;
    var config = g_overtureLinkspotConfig;
    var linkspotId;
    var linkspotIdMap;
    var nGrp;
    var nKw;

    this.setBaseUrl = function(lbaseUrl) { baseUrl = lbaseUrl; }
    this.setSource = function(lsource) { source = lsource; }
    this.setLinkspotId = function(llinkspotId) { linkspotId = llinkspotId; }
    this.setLinkspotIdMap = function(llinkspotIdMap) { linkspotIdMap = llinkspotIdMap; }
    this.setConfig = function(lconfig) { config = lconfig; }
    this.setNGrp = function(lnGrp) { nGrp = lnGrp; } 
    this.setNKw = function(lnKw) { nKw = lnKw; } 

    this.getBaseUrl = function() { return baseUrl; }
    this.getSource = function() { return source; }
    this.getLinkspotId = function() { return linkspotId; }
    this.getLinkspotIdMap = function() { return linkspotIdMap; }
    this.getConfig = function() { return config; }
    this.getNGrp = function() { return nGrp; }
    this.getNKw = function() { return nKw; }
}

//This function creates an overtureLinks object from the linkData passed in
//note linkData will normally be the zSr array populated by Overture
function populateOvertureLinks (linkData) {
   var i = 0;
   var rank = 0;
   var ret = new overtureLinks();

   while (i < linkData.length) {
      rank++;
      var description  = linkData[i++];
      var unused   = linkData[i++];
      var clickUrl = linkData[i++];
      var title    = linkData[i++];
      var sitehost = linkData[i++];
      var bidded   = linkData[i++];

      //skip the first returned add
      if (rank > 1) {
         var currItem = new overtureItem(description, unused, clickUrl, title, sitehost, bidded);
         ret.addItem(currItem);
      }
   }

   return ret;
}

//This function creates an overtureLinks object from the linkData passed in for linksSpots
//note linkData will normally be the mapKey array populated by Overture
function populateOvertureLinkspots (linkData) {
   var ret = new overtureLinks();

   for (var i=0; i<linkData.length; i++) {
      var currItem = new overtureLinkSpotItem(linkData[i].title, linkData[i].keywords);
      ret.addItem(currItem);
   }

   return ret;
}

//function to show all the links
function showLinkData(linkData, startIndex, endIndex) {
  if (startIndex == undefined) {
	startIndex = 0;
  }
  var links = linkData.getItems();
  var outString = "<table border=1><tr><th>Description</th><th>Unused</th><th>ClickUrl</th><th>Title</th><th>SiteHost</th><th>Bidded</th></tr>";
  var arrLength = links.length;
  if (endIndex == undefined || endIndex == 0) {
    endIndex = arrLength;
  }
  else {
    if (endIndex > arrLength) {
	endIndex = arrLength;
    }
  }
  var i = startIndex;
  while ( i < endIndex) {
   var currItem = links[i];
   outString += "<tr><td>" + checkEmpty(currItem.getDescription()) + "</td><td>" + checkEmpty(currItem.getUnused()) + "</td><td>" + checkEmpty(currItem.getClickUrl()) + "</td><td>" + checkEmpty(currItem.getTitle()) + "</td><td>" + checkEmpty(currItem.getSitehost()) +  "</td><td>" + checkEmpty(currItem.getBidded()) + "</td></tr>\n";
   i++;
  } 

  outString += "</table>";
  return outString;
}

//returns a nbsp character if a string is empty
function checkEmpty(str) {
   if ( (str == undefined) || (str == "")) {
	return "&nbsp;";
   }
   else { 
       return str;
   }
}

//This function creates a link to fetch the Content Match data from Overture
function createOvertureSearchLink(conf) {
   var baseLink = conf.getBaseUrl();
   var partner = conf.getPartner();
   var keywords = conf.getKeywords();
   var type = conf.getType();
   var keywordCharEnc = conf.getKeywordCharEnc();
   var outputCharEnc= conf.getOutputCharEnc();
   var urlFilters = conf.getUrlFilters();
   var termFilters = conf.getTermFilters();
   var serveUrl = conf.getServeUrl();
   var maxCount = conf.getMaxCount();  

   if ( isEmpty(baseLink)) {
	baseLink = g_baseOvertureSearchUrl;
   }
   if ( isEmpty(partner)) {
	partner = g_overtureSearchPartner;
   }
   
   if ( isEmpty(serveUrl)) {
	serveUrl = window.location.href;
   }
      
   var retString = baseLink + "?Partner=" + urlEncode(partner);

   if ( !isEmpty(keywordCharEnc) ) {
      retString += "&keywordCharEnc=" + urlEncode(keywordCharEnc);
   }

   if ( !isEmpty(outputCharEnc) ) {
      retString += "&outputCharEnc=" + urlEncode(outputCharEnc);
   }

   if ( !isEmpty(keywords) ) {
      retString += "&Keywords=" + urlEncode(keywords);
   }

   if ( !isEmpty(type) ) {
      retString += "&type=" + urlEncode(type);
   }

   if ( !isEmpty(urlFilters)) {
      retString += "&urlFilters=" + urlFilters;
   }

   if ( !isEmpty(termFilters)) {
      retString += "&termFilters=" + termFilters;
   }
   
   if ( !isEmpty(serveUrl)) {
      retString += "&serveUrl=" + urlEncode(serveUrl);
   }

   if ( !isEmpty(maxCount)) {
      retString += "&maxCount=" + urlEncode(maxCount);
   }

   return retString;
}

//This function creates a link to fetch the Content Match data from Overture
function createOvertureCMLink(conf) {
   var baseLink = conf.getBaseUrl();
   var source = conf.getSource();
   var ctxtUrl = conf.getCtxtUrl();
   var ctxtId = conf.getCtxtId();
   var ctxtIdMap = conf.getCtxtIdMap();
   var ctxtCat = conf.getCtxtCat();
   var ctxtCatMap = conf.getCtxtCatMap();
   var ctxtKeywords = conf.getCtxtKeywords();
   var mkt = conf.getMkt();
   var type = conf.getType();
   var typeMap = conf.getTypeMap();
   var keywordCharEnc = conf.getKeywordCharEnc();
   var outputCharEnc= conf.getOutputCharEnc();
   var config = conf.getConfig();
   var maxCount = conf.getMaxCount();

   //cb is cache buster. its a random number to prevent caching
   var cb = randomnumber=Math.floor(Math.random()*100000);

   if (ctxtUrl == undefined) {
      ctxtUrl = "http://" + window.location.hostname +  window.location.pathname;
   }

   if (isEmpty(ctxtId) && !isEmpty(ctxtIdMap)) {
        //get the ctxtId from the specified map based on the current uri
	ctxtId = getMappingValue(ctxtIdMap);
   }

   if (isEmpty(ctxtCat) && !isEmpty(ctxtCatMap)) {
        //get the ctxtCat from the specified map based on the current uri
	ctxtCat = getMappingValue(ctxtCatMap);
   }

   if (isEmpty(type) && !isEmpty(typeMap)) {
        //get the type from the specified map based on the current uri
	type = getMappingValue(typeMap);
   }

   if (isEmpty(baseLink)) {
	baseLink = g_baseOvertureCMUrl;
   }
   if (isEmpty(source)) {
       source = g_overtureCMSource;
   }

   var retString = baseLink + "?source=" + urlEncode(source);

   if (!isEmpty(keywordCharEnc)) {
      retString += "&keywordCharEnc=" + urlEncode(keywordCharEnc);
   }

   if ( !isEmpty(outputCharEnc) ) {
      retString += "&outputCharEnc=" + urlEncode(outputCharEnc);
   }

   if ( !isEmpty(ctxtId) ) {
      retString += "&ctxtId=" + urlEncode(ctxtId);
   }

   if ( !isEmpty(ctxtCat) ) {
      retString += "&ctxtCat=" + urlEncode(ctxtCat);
   }

   if ( !isEmpty(ctxtKeywords) ) {
      retString += "&ctxtKeywords=" + urlEncode(ctxtKeywords);
   }

   if (!isEmpty(ctxtUrl)) {
      retString += "&ctxtUrl=" + urlEncode(ctxtUrl);
   }

   if ( !isEmpty(type) ) {
      retString += "&type=" + urlEncode(type);
   }

   if ( !isEmpty(cb) ) {
      retString += "&cb=" + urlEncode(cb);
   }

   if ( !isEmpty(config) ) {
      retString += "&config=" + urlEncode(config);
   }

   if (!isEmpty(maxCount) ) {
      retString += "&maxCount=" + urlEncode(maxCount);
   }

   if (!isEmpty(mkt) ) {
      retString += "&mkt=" + urlEncode(mkt);
   }

   return retString;

}

//This function creates a link to fetch the linkspot data from Overture
function createOvertureLinkspotLink(conf) {
   var baseLink = conf.getBaseUrl();
   var source = conf.getSource();
   var linkspotId = conf.getLinkspotId();
   var linkspotIdMap = conf.getLinkspotIdMap();
   var config = conf.getConfig();
   var nGrp = conf.getNGrp();
   var nKw= conf.getNKw();

   if ( (baseLink == undefined) || (baseLink == "")) {
	baseLink = g_baseOvertureLinkspotUrl;
   }
   if ( (source == undefined) || (source == "")) {
	source = g_overtureLinkspotSource;
   }

   if (isEmpty(linkspotId) && !isEmpty(linkspotIdMap)) {
        //get the linkspotId from the specified map based on the current uri
	linkspotId = getMappingValue(linkspotIdMap);
   }

   var retString = baseLink + "?config=" + urlEncode(config);

   if ( !isEmpty(linkspotId) ) {
      retString += "&linkspotId=" + urlEncode(linkspotId);
   }

   if ( !isEmpty(nKw) ) {
      retString += "&NKw=" + urlEncode(nKw);
   }

   if ( !isEmpty(nGrp) ) {
      retString += "&NGrp=" + urlEncode(nGrp);
   }

   if ( !isEmpty(source) ) {
      retString += "&source=" + urlEncode(source);
   }
   return retString;
}

//load in the array
function loadOvertureLinks() {
  this.overturLinks;
  if(zSr != undefined) {
     this.overturLinks = populateOvertureLinks(zSr);
     //if (this.overturLinks == undefined) {
     //   document.writeln("<P>!!! links is undefined !!!<br>");
     //}
  }
}


//load in the array for linkspots
function loadOvertureLinkspots() {
  if(!isEmpty(mapkey)) {
     overturLinkspots = populateOvertureLinkspots(mapkey);
     //if (this.overturLinkspots == undefined) {
     //   document.writeln("<P>!!! spot links is undefined !!!<br>");
     //}
  }
}


//This function gets the first 10 keywords from the page metatag
function getMetaTagKeywords () {
   var keywords = "";
   //try to get the keywords from the metatags
   if (document.getElementsByName) {
      var metaArray = document.getElementsByName('keywords');
      var maxLength = metaArray.length;
      if (maxLength > 10) { maxLength = 10; }
      for (var i=0; i<maxLength; i++) {
         if (i>0) { keywords += " "; }
         keywords += metaArray[i].content; 
      }
   }
  return keywords;
}

//Creates and prints the javascript src= code to include the 
//Content Match links
function loadOvertureCMInclude(conf) {
  var url = createOvertureCMLink(conf);
  printSrcInclude(url);
}

//Creates and prints the javascript src= code to include the 
//Search links
function loadOvertureSearchInclude(conf) {
  var url = createOvertureSearchLink(conf);
  printSrcInclude(url)
}

//Creates and prints the javascript src= code to include the 
//Links spots
function loadOvertureLinkspotInclude(conf) {
  var url = createOvertureLinkspotLink(conf);
  printSrcInclude(url)
}

//Prints the javascript src= code to include the zSr array with the links
function printSrcInclude(url) {
  document.write("<script language=\"Javascript\" src=\"" + url + "\"></script>");
}

//Checks to see if a string is empty
function isEmpty(str) {
  if ( (str == undefined) || (str == "")) {
    return true;
  }
  else {
    return false;
  }
}

//HTTP Encode a url
function urlEncode(sStr) {
    return escape(sStr)
       .replace(/\+/g, '%2B')
          .replace(/\"/g,'%22')
		  	.replace(/\//g, '%2F')
             .replace(/\'/g, '%27');
  }

//This function takes a map (a hashtable) and a string. If the string is omitted the current uri is
//used. Each key of the map is compared to the string and if the key matches the begining of the 
//String (i.e. key /music would match /music/foobar/index.jhtml), then the value for the key is
//returned as the result. Used for mapping ids to sections of the site
function getMappingValue(map, str) {
  if (str == undefined) {
    //if no match string is given then use the document uri
    str = window.location.pathname;
  }

  for (var key in map) {
    var exp = "^" + key;
    var re = new RegExp(exp, "i");
    if(re.test(str)) {
      return map[key];
    }
  }
  return undefined;
}