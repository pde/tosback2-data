function populateVars()
{
// prop3 through prop6 were removed in QS26 as they reflected values which were not
// currently relevant.
// ABTests
// Value is a comma dilimited list of TestName:TestValue pairs

if (typeof(abTestValues) != 'undefined' && abTestValues != null)
{

s.prop1 = abTestValues;
s.eVar1 = abTestValues;

}

else
{
s.prop1 = "none";
}
// UserID for Registered Users
s.prop4 = userID;

if (typeof(userID) != 'undefined' && userID != null)
{

s.eVar4 = userID;

}

else
{
s.eVar4 = "Unavailable";
}
// PartnerID (e.g. 1 = Homestead, 2 = VistaPrint, 3 = Intuit, etc.)
// partnerID is a string.

if (typeof(partnerID) != 'undefined' && partnerID != null)
{

s.prop8 = partnerID;
s.eVar8 = partnerID;

}

else
{
s.prop8 = "undefined";
}
if (!bIsSBPlus)
{
// Has logged in

if (typeof(bIsReturnUser) != 'undefined' && bIsReturnUser != null)
{

s.prop2 = bIsReturnUser ? "Registered" : "Not Registered";
s.eVar2 = bIsReturnUser ? "Registered" : "Not Registered";

}

else
{
s.prop2 = "undefined";
}
// Customer S(ervice|ales) Rep
// Contains name of the agent
// NOTE: If eVar7 is defined the internal ip filter will be bypassed
var csrName = GetCookie('CSRNAME');

if (typeof(csrName) != 'undefined' && csrName != null)
{

s.prop7 = csrName;
s.eVar7 = csrName;

}

// PVID (phsViewerID) for an omniture user identifier
// Must have ViewerIDFilter on site to work
var visitorID = getTrackCookie("vid");
if (visitorID != "")
{
s.prop9 = visitorID;
s.eVar9 = visitorID;
}
else if (phsViewerID != "")
{
s.prop9 = phsViewerID;
s.eVar9 = phsViewerID;
}
else
{
var d = new Date();
visitorID = "sc" + d.getTime() + "-" + Math.floor(Math.random() * 1000);
setTrackCookie("vid", visitorID);
s.prop9 = visitorID;
s.eVar9 = visitorID;
}
/*
We are putting PageName into an prop/evar in addition to using the built in
pagename variable to gain more freedom of breakdowns in SiteCatalyst. Some
examples of when this may be useful include breaking down events by the
pages they occured on or tying AJAX javascript events to particular pages without
inflating pageviews.
*/
s.eVar10 = s.pageName;
s.prop10 = s.pageName;
/* Check if login status has changed */
var lastState = getTrackCookie("LIStatus");
if (lastState == "")
{
lastState = bIsLoggedIn ? "in" : "out";
setTrackCookie("LIStatus", lastState);
}
// Determin if a user logged in
// bIsLoggedIn is defined in s_code.ffhtml since it requires formfilling
// bWasLoggedIn is true if the user was logged in during the last request
var bWasLoggedIn = lastState == "in";
if (bIsLoggedIn != bWasLoggedIn)
{
/* Check for login event */
if (bIsLoggedIn && !bWasLoggedIn)
{
// append login event to events list
s.events=s.apl(s.events,"event7",",",1);
}
// update login status
setTrackCookie("LIStatus", bIsLoggedIn ? "in" : "out");
}
}
}
function handleTrackError(err)
{
if (bShowErrors)
{
throw err;
}
}
function setMilestone(pageCode)
{
var mileStonesCookie = GetCookie("mlstn");
var mileStones = new Array();
if (mileStonesCookie)
{
var mileStones = mileStonesCookie.split(">");
for (var i = 0; i < mileStones.length; i++)
{
if (mileStones[i] == pageCode)
{
// Remove this and all the succeeding page codes.
mileStones.splice(i, mileStones.length - i);
}
}
}
// Add the page to the array, collapse, reset cookie, and send to Omniture
mileStones.push(pageCode);
mileStonesCookie = mileStones.join(">");
SetCookie("mlstn", mileStonesCookie);
s.eVar5 = mileStonesCookie;
s.prop5 = mileStonesCookie;
}
function setTrackCookie(key, value)
{
// Check that the key and value are valid
if (key.match(/(#|;)/) || value.match(/(#|;)/))
{
throw new Error("setTrackCookie: " + "you may not use '#' or ';' in the tracking cookie. Those characters are used as delimiters.");
}
// Get the omniture tracking cookie
var cookie_val = GetCookie("otc");
if (cookie_val == "" || cookie_val == null)
{
// First setting of tracking cookie
cookie_val = key + "#" + value + ";";
}
else
{
// Create the regular expression that will match
// individual cookies in the combined cookie
var r = new RegExp(key + "#(.*?);");
if (res = cookie_val.match(r))
{
// Key exists, change value
cookie_val = cookie_val.replace(r,key + "#" +value + ";");
}
else
{
// New cookie... append key value pair
cookie_val += key + "#" + value + ";";
}
}
SetCookie("otc",cookie_val);
}
function getTrackCookie(key)
{
var cookie_val = GetCookie("otc");
if (cookie_val != "" && cookie_val != null)
{
var r = new RegExp(key + "#(.*?);");
if(res = cookie_val.match(r))
{
return res[1];
}
}
return "";
}
function addEvent(event)
{
try
{	
if (s.events == null || s.events == "")
{
s.events = event;
}
else
{
s.events += "," + event;
}
}
catch(err)
{
handleTrackError(err);
}
}
function trackLink(linkID)
{
try
{
var s=s_gi(s_account);
// By default, SiteCatalyst will track try to track "external links" which are determined by filtering out
// internal links with s.linkInternalFilters. If this function is called on an external link, it will end up
// getting tracked twice unless we temporarily disable external link tracking.
s.trackExternalLinks = false;
s.linkTrackVars='eVar11,prop11,eVar10,prop10,events';
s.linkTrackEvents='event8';
s.eVar11=linkID;
s.prop11=linkID;
s.eVar10 = s.pageName;
s.prop10 = s.pageName;
s.events="event8";
s.tl();
}
catch(err)
{
handleTrackError(err);
}
return true;
}
// Sets up the SiteCatalyst tracking for the CMT links, where both sProp and eVar is tracked. 
// To use this, add a call
// to this function to the onclick event handler of the link to be tracked, and
// pass in the unique linkID
function trackCMTLink(linkID)
{

try
{	
// By default, SiteCatalyst will track try to track "external links" which are determined by filtering out
// internal links with s.linkInternalFilters. If this function is called on an external link, it will end up
// getting tracked twice unless we temporarily disable external link tracking.
s2.trackExternalLinks = false;
s2.linkTrackVars='prop6,eVar6';
s2.linkTrackEvents='';
s2.eVar6=linkID;
s2.prop6=linkID;
s2.events=
s2.tl();
}
catch(err)
{
handleTrackError(err);
}
return true;

}
// Sets up the SiteCatalyst tracking for the CMT links, where only clicks are tracked (sProp only). 
// To use this, add a call
// to this function to the onclick event handler of the link to be tracked, and
// pass in the unique linkID
function trackCMTLinkClickOnly(linkID)
{

try
{	
// By default, SiteCatalyst will track try to track "external links" which are determined by filtering out
// internal links with s.linkInternalFilters. If this function is called on an external link, it will end up
// getting tracked twice unless we temporarily disable external link tracking.
s2.trackExternalLinks = false;
s2.linkTrackVars='prop6';
s2.linkTrackEvents='';

s2.prop6=linkID;
s2.events=
s2.tl();
}
catch(err)
{
handleTrackError(err);
}
return true;

}
// Appends an event identifier in the form of ":unique_id" to particular events. An
// event with a unique identifier (e.g. event2:93945) can only be triggered once for
// every identifier.
// 
// Note that an Omniture representative must turn on or off event serialization.
// There is no way to do it in SiteCatalyst.
function serializeEvents(events)
{
var eventsArray = events.split(",");
for (var i = 0; i < eventsArray.length; i++)
{
var event = eventsArray[i];
if (event.match(/[\d]*$/) <= 5)
{
eventsArray[i] += ":" + generateUniqueEventID(s.pageName, phsViewerID);
}	
if (event == "")
{
eventsArray[i] = event + ":" + generateUniqueEventID(s.pageName, phsViewerID);
}
else if (event == "event8")
{
eventsArray[i] = event + ":" + generateUniqueEventID(s.pageName, phsViewerID);
}
}
return eventsArray.join(",");
}
// Remaps the original HS custom events to the corresponding event number
// in Intuit's SiteCatalyst account.
// events = comma delimited list of events (e.g. "event2,event5,purchase")
function remapHSEvents(events)
{
var remapping = new Object();
// Define mappings
remapping["event7"] = "event7"; // Login event remains the same
remapping["event11"] = "event10"; // Remap signup event
remapping["event20"] = "event20"; // Page view event stays the same
remapping["event10"] = "event19"; // Remap design change event
// Remap the generic funnel events
remapping["event1"] = "event11";
remapping["event2"] = "event12";
remapping["event3"] = "event13";
remapping["event4"] = "event14";
remapping["event5"] = "event15";
remapping["event16"] = "event14"; // Remap Upgrade event from (event17 on Homestead -> event15 on Intuit)
remapping["event17"] = "event15"; // Rempap Add-on event (event17 on Homestead -> event15 on Intuit)
// Get original events from HS account
var origEvents = events.split(",");
var mappedEvents = new Array();
for (var i = 0; i < origEvents.length; i++)
{
// only remap custom events, not built in ones (e.g. "purchase")
if (origEvents[i].match(/event[\d]*$/))
{	
// NOTE: if no mapping is defined, the event does not carry over
if (typeof(remapping[origEvents[i]]) != "undefined")
{
mappedEvents.push(remapping[origEvents[i]]);
}
}
else
{
mappedEvents.push(origEvents[i]);
}
}
return mappedEvents.join(",");
}
function generateUniqueEventID(pagename, viewerID)
{
var uniqueID = pagename;
uniqueID = uniqueID.replace(/\..*/,"");
uniqueID = uniqueID.replace(/index/,"");
uniqueID = uniqueID.substr(uniqueID.length - 10, 10);
uniqueID += viewerID.substr(viewerID.length - 10, 10);
uniqueID = uniqueID.replace(/[\W]/g,"X");
return uniqueID;
}
function isSiteHostname(host)
{
// Check to see if there is a tilda in the url (that doesn't appear after a '?')
var hostnameParts = host.split(".");
var subdomain=hostnameParts[0];
if ((hostnameParts.length == 1) || (subdomain.search(/(www|websites)$/) == 0))
{
return true
}
return false;
}
// QS46.1 Form Analysis Plugin:
// This function manually fires a "success" event to SiteCatalyst for the Form Analysis prop variable
function submitFormAnalysisSuccess(formname) 
{
if (navigator.userAgent.indexOf("MSIE") == -1)
{
setTimeout("s.sendFormEvent('s','','" + formname + "');s2.sendFormEvent('s2','','" + formname + "')", 0);
}
else
{
s.sendFormEvent('s','', formname);
s2.sendFormEvent('s2','', formname);
}
}
// Translates a given name is the HS page naming scheme i.e. /path/to/file.ext (Detail)
// to an Intuit Global framework compatible scheme i.e. "siteCode:Detail:group:function"
//
// NOTE: 1. The "function" part is being phased out and will always be set to "convince"
// 2. If no "Detail" is specified in the original HS name, detail will be set
// to "parentDir-fileName" (no extension).
function translateName(siteCode, group, pageName, filePath)
{
var newName = siteCode + ":";
if (pageName != "")
{
// If we have a pagename, use it
newName += pageName + ":";
}
else
{
// Otherwise, construct one from the file path
var results = filePath.match(/\/([^\/]*)\/([^\/]*)$/);
if (results && results.length == 3)
{
// Gather the parts of the name and do some cleanup
var parentDir = results[1].replace(/Scripts_/,"");
var fileName = results[2].replace(/\.[^\.]*/,"");
newName += parentDir + "-" + fileName + ":";
}
else
{
newName += filePath.replace(/\//g, "") + ":";
}
}
newName += group + ":" + "convince";
return newName;
}
function getATGShopperID()
{
// The SHOPPER_USER_ID cookie is set on the ATG platform
var atgShopperId = GetCookie("SHOPPER_USER_ID");
if (atgShopperId)
{
return "|" + atgShopperId + "|";
}
return "";
}
function getFirstVisitDate()
{
var vis1Date = getTrackCookie("vis1Date");
if (vis1Date == "")
{
// Logic from calculateDate() @ http://www.intuit.com/sbweb/common/components/site_catalyst/header/sc_header_common.js
var REPORTING_OFFSET = "-8";
// create Date object for current location
clientDate = new Date();
// convert to milliseconds and add local timezone offset to get UTC time in milliseconds
utcDate = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
// create new Date object accounting for offset
serverDate = new Date(utcDate + (3600000*(REPORTING_OFFSET)));
var mm = serverDate.getMonth() + 1;
var dd = serverDate.getDate();
// Add zero padding if necessary
if (mm < 10)
{
mm = "0" + mm;
}
if (dd < 10)
{
dd = "0" + dd;
}
vis1Date = serverDate.getFullYear() + "|" + mm + "|" + dd; // e.g. "2010|03|05"
setTrackCookie("vis1Date",vis1Date);
}
return vis1Date;
}
// 
function getReferringURLs()
{
// Set the referring URL on the first visit
try {
var scReferURL = top.document.referrer.split("?")[0];
scReferURL = scReferURL.split(";")[0];
if (scReferURL.indexOf(top.document.location.hostname) != -1) {
scReferURL = "";
}
} 
catch (error) {
scReferURL = "Error";
}
return scReferURL;
}
// 
function getReferringDomains()
{
var scReferDomain = "", referrer = top.document.referrer;
if (referrer == "")
{
return "";
}
// Set the referring domain on the first visit
try
{
scReferDomain = referrer.match(/https?:\/\/(.*?)\//)[1];
if (scReferDomain.indexOf(top.document.location.hostname) != -1)
{
return "";
}
}
catch(error) {
scReferDomain = "Error";
}
return scReferDomain;
}
// 
function getacid(scObject)
{
var acid = "";
//URS Logic..., WR 9090, using s.campaign to set up eVar28. If there is no campaign, then eVar28 is the referring domain.
if (scObject.campaign)
{
return scObject.campaign;
}
else if(scObject.eVar18 != undefined)
{
// Get referring domain then strip of the "http://", "https://", "www." and .com
acid = scObject.eVar18;
acid = acid.replace("www.", "");
//Then check to see if it matches the Array to see if its from organic search
var searchDomains = new Array("google", "yahoo", "msn", "googlesyndication", "bing", "a9", "abacho", "ah-ha", "alexa", "allesklar", "alltheweb", "altavista", "aol", "arianna", "asiaco", "ask", "atlas", "austronaut", "auyantepui", "bluewin", "centrum", "club-internet", "dino-online", "dircom", "dmoz", "dogpile", "eniro", "euroseek", "exalead", "excite", "findlink", "findwhat", "fireball", "freeserve", "gigablast", "go2net", "goeureka", "greekspider", "hotbot", "ilor", "iltrovatore", "indexnanacoil", "infoseek", "infospace", "intuitsearch", "iwon", "ixquick", "jubii", "jyxo", "kanoodle", "kataweb", "kvasir", "live", "looksmart", "lycos", "mamma", "metacrawler", "mywebsearch", "mysearch", "netex", "netscape", "netster", "keywords", "nettavisen", "ninemsn", "nlsearch", "qr", "nomade", "northernlight", "oozap", "overture", "ozu", "passagen", "savvy", "scrubtheweb", "wwwsearchcom", "searchalot", "searchhippo", "sensis", "seznam", "soneraplaza", "splatsearch", "sprinks", "spray", "srch", "supereva", "teoma", "thunderstone", "tiscalich", "tjohoo", "track", "truesearch", "tygo", "vinden", "virgilio", "vivisimo", "voila", "walla", "wanadoo", "web", "webcrawler", "webwatch", "wepa", "wisenut", "xpsn", "ya", "ynet", "zerx");
for (i = 0; i <= searchDomains.length; i++)
{
if (acid.indexOf(searchDomains[i]) != -1)
{
return acid + " Organic";	
}
}
}
return "";
}
/**
* Introduced in QS66 for the FTU flow. Determines the prop9 value based on the
* page and FTU test cell.
* @param {String} ABTestCookieValues has the format
* "TESTNAME1:TESTVALUE1|TESTNAME2:TESTVALUE2|TESTNAME3:TESTVALUE3"
* @param {String} funnelStep of the page. "event<step#>" is used in the CPP
* stack. The JWS stack uses the global variable S_PROP9_FUNNELSTEP
* defined participating JSPs.
* @returns {String} the prop9 value for relevant pages or ''
*/
function getProp9Value(abTestCookieValues, funnelStep)
{	
if (!abTestCookieValues || !funnelStep) {
return '';
}
var values = {
event1 : {
A : 'ai_ctrla_step2',
B : 'ai_testb_step5',
C : 'ai_testc_step5'
},
event2 : {
A : 'bi_ctrla_step3',
B : 'bi_testb_step6',
C : 'bi_testc_step6'
},
smartRecommender : {
A : 'sr_ctrla_step4',
B : 'sr_testb_step7',
C : 'sr_testc_step7'
},
templateGallery : {
A : '',
B : 'tg_testb_step2',
C : 'tg_testc_step2'	
},
selectedTemplate : {
A : '',
B : 'st_testb_step3',
C : 'st_testc_step3'
},
sbPlus : {
A : '',
B : 'sbp_testb_step4',
C : 'sbp_testc_step4'
}
}
var testCell = getSpecificABTestValue(abTestCookieValues, 'FTUPHASEONETESTQS66');
if (values[funnelStep]) {
return values[funnelStep][testCell] || '';
}
return '';
}
// ABTestCookieValues: The format for this cookie is "TESTNAME1:TESTVALUE1|TESTNAME2:TESTVALUE2|TESTNAME3:TESTVALUE3" etc.
// Returns the TESTVALUE based on the TESTNAME passsed in
function getSpecificABTestValue(ABTestCookieValues, testName)
{
try
{
var cookieNameValuePairs = ABTestCookieValues.split('|');
for (var i = 0; i < cookieNameValuePairs.length; i++)
{
var cookieNameValue = cookieNameValuePairs[i].split(':');
if (cookieNameValue.length < 2) continue;
if (cookieNameValue[0] == testName) return cookieNameValue[1];
}
}
catch(err)
{
handleTrackError(err);
}
return "";
}	