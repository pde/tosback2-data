/* SiteCatalyst code version: H.22.1.
Last modified: Jan 2011 */
// DFA Mapping Table
var waDfaTbl = {intelcorpemea: "1516491", intelcorpapac: "1516492", intelcorpprc: "1516493", intelcorplar: "1516490"};
var waSpotTbl = {intelcorpemea: "2238778", intelcorpapac: "2236808", intelcorpprc: "2218289", intelcorplar: "2220804"};

// event table mapping
var waEventTbl = {se_register: "event1", se_third_party: "event2", se_rich_media: "event3", 
se_buy: "event4", se_points: "event6", se_vid_pct1: "event7", se_vid_pct2: "event8", 
se_search: "event11", se_searchres: "event12", 
se_cust01: "event16", se_cust02: "event17", se_cust03: "event18", se_cust04: "event19", 
se_cust05: "event20", se_cust06: "event21", se_cust07: "event22", se_cust08: "event23", 
se_cust09: "event24", se_cust10: "event25", se_cust11: "event26", se_cust12: "event27", 
se_cust13: "event28", se_cust14: "event29", se_cust15: "event30", se_cust16: "event31", 
se_cust17: "event32", se_cust18: "event33", se_cust19: "event34", se_cust20: "event35", 
se_cust21: "event36", se_cust22: "event37", se_cust23: "event38", se_cust24: "event39", 
se_cust25: "event40", se_cust26: "event41", se_cust27: "event42", se_cust28: "event43", 
se_cust29: "event44", se_cust30: "event45", se_cust31: "event46", se_cust32: "event47", 
se_cust33: "event48", se_cust34: "event49", se_cust35: "event50", se_cust36: "event51", 
se_cust37: "event52", se_cust38: "event53", se_cust39: "event54", se_cust40: "event55", 
se_cust41: "event56", se_cust42: "event57", se_cust43: "event58", se_cust44: "event59", 
se_cust45: "event60", se_vid_mid: "event61", se_dnld: "event69", se_action: "event70",
se_cust71: "event71", se_cust72: "event72", se_cust73: "event73", 
se_cust74: "event74", se_cust75: "event75", se_cust76: "event76", se_cust77: "event77", 
se_cust78: "event78", se_cust79: "event79", se_cust80: "event80", se_cust81: "event81", 
se_cust82: "event82", se_cust83: "event83", se_cust84: "event84", se_cust85: "event85",
prodview: "prodView", scopen: "scOpen", scview: "scView", scadd: "scAdd", 
scremove: "scRemove", sccheckout: "scCheckout", purchase: "purchase"};

var waVarTbl = {wa_pageName: "pageName", wa_org1: "channel", wa_org2: "prop1", 
wa_org3: "prop2", wa_org4: "prop3", wa_geo: "prop4", wa_language: "prop5", wa_iid: "prop6", wa_reportSuites: "prop7", 
wa_url: "prop8", wa_visitId: "prop9", wa_ngipDocId: "prop10", wa_ngipUniqueId: "prop11", wa_profileID: "prop12", 
wa_campaign: "campaign", wa_events: "events", 
wa_prop13: "prop13", wa_prop14: "prop14", wa_prop15: "prop15", wa_prop16: "prop16",
wa_prop17: "prop17", wa_prop18: "prop18", wa_keyword: "prop19", wa_prop20: "prop20", 
wa_custom01: "prop21", wa_custom02: "prop22", wa_custom03: "prop23", wa_custom04: "prop24", wa_custom05: "prop25", 
wa_custom06: "prop26", wa_custom07: "prop27", wa_custom08: "prop28", wa_custom09: "prop29", wa_custom10: "prop30", 
wa_custom11: "prop31", wa_custom12: "prop32", wa_custom13: "prop33", wa_custom14: "prop34", wa_custom15: "prop35", 
wa_custom36: "prop36", wa_custom37: "prop37", wa_custom38: "prop38", wa_custom39: "prop39", wa_custom40: "prop40", 
wa_custom41: "prop41", wa_custom42: "prop42", wa_custom43: "prop43", wa_custom44: "prop44", wa_custom45: "prop45", 
wa_custom46: "prop46", wa_custom47: "prop47", wa_custom48: "prop48", wa_custom49: "prop49", wa_custom50: "prop50", 
wa_custom51: "prop51", wa_action: "prop52", wa_dnld: "prop53", wa_custom54: "prop54", wa_custom55: "prop55", 
wa_custom56: "prop56", wa_custom57: "prop57", wa_custom58: "prop58", wa_custom59: "prop59", wa_custom60: "prop60", 
wa_custom61: "prop61", wa_custom62: "prop62", wa_custom63: "prop63", wa_custom64: "prop64", wa_custom65: "prop65", 
wa_custom66: "prop66", wa_custom67: "prop67", wa_custom68: "prop68", wa_custom69: "prop69", wa_custom70: "prop70", 
wa_custom71: "prop71", wa_custom72: "prop72", wa_custom73: "prop73", wa_custom74: "prop74", wa_custom75: "prop75",
wa_crtvid: "eVar5", 
wa_eCustom06: "eVar6", wa_eCustom07: "eVar7", wa_eCustom08: "eVar8", wa_eCustom09: "eVar9", 
wa_eCustom10: "eVar10", wa_eCustom11: "eVar11", wa_eCustom12: "eVar12", wa_eCustom13: "eVar13", wa_eCustom14: "eVar14", 
wa_eCustom15: "eVar15", wa_eCustom16: "eVar16", wa_eCustom17: "eVar17", wa_eCustom18: "eVar18", wa_eCustom19: "eVar19", 
wa_eCustom20: "eVar20", wa_eCustom21: "eVar21", wa_eCustom22: "eVar22", wa_eCustom23: "eVar23", wa_eCustom24: "eVar24", 
wa_eCustom25: "eVar25", wa_eCustom26: "eVar26", wa_eCustom27: "eVar27", wa_eCustom28: "eVar28", wa_eCustom29: "eVar29", 
wa_eCustom30: "eVar30", wa_eCustom31: "eVar31", wa_eCustom32: "eVar32", wa_eCustom33: "eVar33", wa_eCustom34: "eVar34", 
wa_eCustom35: "eVar35", wa_eCustom36: "eVar36", wa_eCustom37: "eVar37", wa_eCustom38: "eVar38", wa_eCustom39: "eVar39", 
wa_eCustom40: "eVar40", wa_eCustom41: "eVar41", wa_eCustom42: "eVar42", wa_eCustom43: "eVar43", wa_eCustom44: "eVar44", 
wa_eCustom45: "eVar45", wa_eCustom46: "eVar46", wa_eCustom47: "eVar47", wa_eCustom48: "eVar48", wa_eCustom49: "eVar49", 
wa_eCustom50: "eVar50", 
wa_eCustom51: "eVar51", wa_eAction: "eVar52", wa_eDnld: "eVar53", wa_eCustom54: "eVar54", wa_eCustom55: "eVar55", 
wa_eCustom56: "eVar56", wa_eCustom57: "eVar57", wa_eCustom58: "eVar58", wa_eCustom59: "eVar59", wa_eCustom60: "eVar60", 
wa_eCustom61: "eVar61", wa_eCustom62: "eVar62", wa_eCustom63: "eVar63", wa_eCustom64: "eVar64", wa_eCustom65: "eVar65", 
wa_eCustom66: "eVar66", wa_eCustom67: "eVar67", wa_eCustom68: "eVar68", wa_eCustom69: "eVar69", wa_eCustom70: "eVar70", 
wa_eCustom71: "eVar71", wa_eCustom72: "eVar72", wa_eCustom73: "eVar73", wa_eCustom74: "eVar74", wa_eCustom75: "eVar75",
wa_products: "products", wa_purchaseID: "purchaseID"};

/* Specify the Report Suite ID(s) to track here */
//Test
//var s_account = "intelhcodetest";

//Production

if ((typeof wa_trackCorp !== "undefined") && (wa_trackCorp.toLowerCase() === "n")) {
	var s_account = wa_reportSuites;
	}
else {
	var s_account = (wa_reportSuites === "") ? "intelcorp" : "intelcorp," + wa_reportSuites;
}

var sint = s_gi(s_account);

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */

sint.charSet = "UTF-8";
/* Conversion Config */
sint.currencyCode = "USD";
/* Link Tracking Config */

// Check if disable automatic download tracking variable is set
if ((typeof wa_trackDownloads === "undefined") || (wa_trackDownloads === "")) {
	sint.trackDownloadLinks = true;
}
else {
	sint.trackDownloadLinks = false;
}			

sint.trackExternalLinks = true;
sint.trackInlineStats = true;
sint.linkDownloadFileTypes = "exe,dll,com,zip,pdf,arc,bin,sit,tar,gz,z,arj,rpm,rar,doc,docx,mpeg,wav,mp3,mov,mpg,avi,xls,xlsx,txt,msi,tgz,wmv";

/* First Party Cookie Patch */
if (location.hostname.indexOf(".co.") > -1) {
    sint.fpCookieDomainPeriods = "3";
}

sint.linkInternalFilters = "javascript";
if ((typeof wa_intFilters === "undefined") || (wa_intFilters === "")) {
    sint.linkInternalFilters += ":,intel.";
}
else {
    sint.linkInternalFilters += ":,intel.," + wa_intFilters;
}

// new dfa code
if (unescape(wa_queryObj.dfaid) === "1") {
	
	var wa_dfaDelay = "600";

	if ((typeof wa_trackDFA !== "undefined") && (wa_trackDFA.toLowerCase() !== "n")) {
	
	// Set default values based on Intel Corp		 
		var dfa_CSID='1516076';
		var dfa_SPOTID='1873234';
		
		if ((typeof wa_dfaCORP !== "undefined") && (wa_dfaCORP !== "")) {
			wa_dfaDelay=wa_dfaCORP; 
		} 
		
		if (wa_reportSuites !== "") {
	        var waRS = wa_reportSuites.split(",");

	        for (var i = 0; i < waRS.length; i += 1) {
	            waRS[i] = waRS[i].toLowerCase().replace(/^\s*|\s*$/g, '');
	            if (waDfaTbl[waRS[i]]) {
	                var dfa_CSID = waDfaTbl[waRS[i]];
	                var dfa_SPOTID= waSpotTbl[waRS[i]];
	                if ((waRS[i] === 'intelcorpemea') && (typeof wa_dfaEMEA !== "undefined") && (wa_dfaEMEA !== "")) { wa_dfaDelay = wa_dfaEMEA; }
	                if ((waRS[i] === 'intelcorplar') && (typeof wa_dfaLAR !== "undefined") && (wa_dfaLAR !== "")) { wa_dfaDelay = wa_dfaLAR; }
	                if ((waRS[i] === 'intelcorpprc') && (typeof wa_dfaPRC !== "undefined") && (wa_dfaPRC !== "")) { wa_dfaDelay = wa_dfaPRC; }
	                if ((waRS[i] === 'intelcorpapac') && (typeof wa_dfaAPAC !== "undefined") && (wa_dfaAPAC !== "")) { wa_dfaDelay = wa_dfaAPAC; }
	                
	                break;
	            }
	        }
	    }
	
		var dfa_tEvar='eVar1'; // View Through eVar.
		var dfa_errorEvar='eVar9'; // DFA error tracking 
		var dfa_timeoutEvent='event62'; // Tracks timeouts/empty responses 
		var dfa_requestURL="http://fls.doubleclick.net/json?spot=[SPOTID]&src=[CSID]&host=integrate.112.2o7.net%2Fdfa_echo%3Fvar%3D[VAR]%26AQE%3D1%26A2S%3D1&ord=[RAND]"; 
		sint.maxDelay=wa_dfaDelay; // maximum time to wait for DFA, in milliseconds
		var dfa_overrideParam="dfaid"; // A query string parameter that will force the DFA call to occur.		
		
/************************ END DFA Variables ************************/

		sint.loadModule("Integrate");		
		sint.Integrate.onLoad=function(s,m) {
		sint.Integrate.add("DFA");
		sint.Integrate.DFA.tEvar=dfa_tEvar;
		sint.Integrate.DFA.errorEvar=dfa_errorEvar;
		sint.Integrate.DFA.timeoutEvent=dfa_timeoutEvent;
		sint.Integrate.DFA.CSID=dfa_CSID;
		sint.Integrate.DFA.SPOTID=dfa_SPOTID;
		sint.Integrate.DFA.get(dfa_requestURL);
		sint.Integrate.DFA.setVars=function(s,p) {
			if (window[p.VAR]) { // got a response
				if(!p.ec) { // no errors
					sint[p.tEvar]="DFA-"+(p.lis?p.lis:0)+"-"+(p.lip?p.lip:0)+"-"+(p.lastimp?p.lastimp:0)+"-"+(p.lastimptime?p.lastimptime:0)+"-"+(p.lcs?p.lcs:0)+"-"+(p.lcp?p.lcp:0)+"-"+(p.lastclk?p.lastclk:0)+"-"+(p.lastclktime?p.lastclktime:0)
				} else if (p.errorEvar) { // got an error response, track
					sint[p.errorEvar] = p.ec;
				}
			} else if (p.timeoutEvent) { // empty response or timeout
				sint.events = ((!sint.events || sint.events == '') ? '' : (sint.events + ',')) + p.timeoutEvent; // timeout event
			}
		}
	}	
	
	}
}

// end new dfa code

sint.linkLeaveQueryString = false;
sint.linkTrackVars = "none";
sint.linkTrackEvents = "none";

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
sint.dc = 112;
sint.trackingServer = "www91.intel.com";
sint.trackingServerSecure = "www90.intel.com";

/***** Start WAP Custom Code *****/
// Capture querystring vars

if (typeof wa_queryObj.iid !== "undefined") {
	var wa_iid = unescape(wa_queryObj.iid);
	var wa_eCustom51 = unescape(wa_queryObj.iid);
}

if (typeof wa_queryObj.eid !== "undefined") {
	var wa_prop15 = unescape(wa_queryObj.eid);
	var wa_eCustom15 = unescape(wa_queryObj.eid);
}

if (typeof wa_queryObj.wapkw !== "undefined") {
	var wa_prop20 = unescape(wa_queryObj.wapkw);
	var wa_eCustom20 = unescape(wa_queryObj.wapkw);
	if (wa_events === "") {
		wa_events = "se_searchres";
	}
	else {
		wa_events = wa_events + ",se_searchres";
	}
}

// Creative ID for Dblclick ads
var wa_crtvid = (typeof wa_queryObj.crtvid === "undefined") ? "" : unescape(wa_queryObj.crtvid);

// Capture campaign tracking code 
cv1 = (typeof wa_queryObj.cid === "undefined") ? "" : unescape(wa_queryObj.cid);		
cv2 = (typeof wa_queryObj.ppc_cid === "undefined") ? "" : unescape(wa_queryObj.ppc_cid);

if (cv1) {
    wa_campaign = cv1;
}
else if (cv2) {
    wa_campaign = cv2;
}

//Set Content Category eVar if set on page
if (window.p_contentcat) {

	wa_eCustom10 = window.p_contentcat;
	
	if (wa_events === "") {
		wa_events = "se_points";
	}
	else {
		wa_events = wa_events + ",se_points";
	}
}

// Always set wa_org1 
if (wa_org1 === "") {
    wa_org1 = "unassigned";
}
	
//Validate wa_geo
if (isValidGeo(wa_geo) === false) {
    wa_geo = "unassigned";
}	
		
// call Main processing
waProcess();

function waProcess() {
    var queryStr, wa_queryObj2, wa_parseUrl, wa_hier1, wa_orgVars, key;
    // set SC vars to blank
    waInitSCVars();		

    //populate wa_url (prop8)
    wa_urlQueryString = wa_urlQueryString.toLowerCase();

	switch (wa_urlQueryString) {			
	case "all":
	    wa_url = unescape(location.href);
		break;
	case "":
	case "none":
	    wa_url = location.protocol + "//" + location.host + unescape(location.pathname);
	    break;
	default:

	    queryStr = location.search.toLowerCase();
	    wa_queryObj2 = waParseQueryString(queryStr);

	    wa_urlQueryString = wa_urlQueryString.split(",");

	    wa_parseUrl = "";
	    for (i = 0; i < wa_urlQueryString.length; i += 1) {
	        if (wa_queryObj2[wa_urlQueryString[i]]) {
	            if (wa_parseUrl.length > 0) {
	                wa_parseUrl += '&';
	            }
	            wa_parseUrl += wa_urlQueryString[i] + '=' + wa_queryObj2[wa_urlQueryString[i]];
	        }
	    }
	    wa_url = location.protocol + "//" + location.host + unescape(location.pathname);
	    if (wa_parseUrl.length > 0) {
	        wa_url += "?" + unescape(wa_parseUrl);
	    }
	}
	
	// Create hierarchy var hier1 by concatenating org1, org2, org3, org4 and orgX

	wa_hier1 = "";
	wa_orgVars = ['wa_org1', 'wa_org2', 'wa_org3', 'wa_org4', 'wa_orgX'];
	
	for (i = 0; i < wa_orgVars.length; i += 1)
	{
		if (window[wa_orgVars[i]]) {
		
			if ((window[wa_orgVars[i]].indexOf("|") >= 0) && (wa_orgVars[i] !== "wa_orgX"))
			{
			    window[wa_orgVars[i]] = window[wa_orgVars[i]].replace(/\|/g, " ");
			}

			if (wa_hier1.length > 0) {
			    wa_hier1 += "|";
            }
		
			wa_hier1 = wa_hier1 + window[wa_orgVars[i]];
		}
	}
	sint.hier1 = unescape(wa_hier1.toLowerCase());
	
	//call wa_events set/validate function - the 2nd parameter indicates whether to set event5 also
	waProcessEvents(wa_events, 'Y');
		
	// Process pagename and set evars
	wa_org1 = wa_org1.toLowerCase();
	wa_pageName = (wa_pageName === "") ? wa_org1 + ":" + unescape(location.pathname.toLowerCase()) : wa_org1 + ":" + wa_pageName;
	
	// check wa_referrer and set
	if ((typeof wa_referrer !== "undefined") && (wa_referrer !== "")) {
	    sint.referrer = wa_referrer.toLowerCase();
    }
	
	// set 404 error page 
	if ((wa_pageType !== "") && (wa_pageType === 'errorPage')) {
		sint.pageType = "errorPage";
		wa_pageName = "";
	}	

	// set SC vars from wa_ vars and lowercase
    for (key in waVarTbl) {
    
        if (waVarTbl.hasOwnProperty(key) && window[key]) { 
			if ((key === "wa_campaign") || (key === "wa_profileID") || (key === "wa_events") || (key === "wa_crtvid") || (key === "wa_purchaseID")) {
				sint[waVarTbl[key]] = window[key];
			}
			else 
			{
				sint[waVarTbl[key]] = window[key].toLowerCase();
			}	
        }
	}
	
	waProcessVars();
	
	sint.prop75	= "Version 5.0";
	sint.eVar3 = sint.pageName;
	sint.eVar4 = sint.prop8;
	sint.eVar6 = sint.prop1;
	sint.eVar7 = sint.prop2;
	sint.eVar8 = sint.prop3;
	sint.eVar19 = sint.prop19;	
	if (sint.prop14 === "") {
		sint.prop14 = sint.pageName;
	}
	
}

// custom functions
function cleanMarks(value) {
    // lowercase vars and replace registered, copyright and trademark symbols
    return value.replace(/\u00ae/g, "(r) ").replace(/\u00a9/g, "(c) ").replace(/\u2122/g, "(tm) ").toLowerCase();
}

function waProcessVars() {
    var name;
    sint.pageName = cleanMarks(sint.pageName);
    for (i = 14; i <= 75; i += 1) {
        name = "prop" + i;
        if (sint[name]) {
            sint[name] = cleanMarks(sint[name]);
        }
    }
    for (i = 6; i <= 75; i += 1) {
        name = "eVar" + i;
        if (sint[name]) {
            sint[name] = cleanMarks(sint[name]);
        }
    }
}
    
// Check that variable does not contain more than 'max' chars
function isValidLength(string, max) {
    if (string.length > max) {
        return false;
    }
    else {
        return true;
    }
}

//Check length range
function isValidLengthRange(string, min, max) {

    if (string.length < min || string.length > max) {
        return false;
    }
    else {
        return true;
    }
}

// check wa_geo var for valid geo and sets unassigned if not
function isValidGeo(geo) {
	
    geo = geo.toLowerCase();	
     
    switch (geo) {
    case "apac":
    case "asmo-lar":
    case "asmo-na":
    case "emea":
    case "ijkk":
    case "prc":
    case "unassigned":
        return true;
    default: 
        return false;
	}
}

// sets all WAP vars to blank
function waInitWAPVars() {

    wa_pageName = wa_iid = wa_ngipDocId = wa_events = wa_profileID = wa_ngipUniqueId = wa_geo = wa_language =
    wa_referrer = wa_products = wa_purchaseID = wa_org2 = wa_org3 = wa_org4 = wa_orgX = wa_url =
    wa_prop13 = wa_prop14 = wa_prop15 = wa_prop16 = wa_prop17 = wa_prop18 = wa_keyword = wa_prop20 =
    wa_custom01 = wa_custom02 = wa_custom03 = wa_custom04 = wa_custom05 = wa_custom06 = wa_custom07 =
    wa_custom08 = wa_custom09 = wa_custom10 = wa_custom11 = wa_custom12 = wa_custom13 = wa_custom14 =
    wa_custom15 = wa_custom36 = wa_custom37 = wa_custom38 = wa_custom39 = wa_custom40 = wa_custom41 =
    wa_custom42 = wa_custom43 = wa_custom44 = wa_custom45 = wa_custom46 = wa_custom47 = wa_custom48 =
    wa_custom49 = wa_custom50 = wa_pageType = wa_crtvid =
	wa_custom51 = wa_action = wa_dnld = wa_custom54 = wa_custom55 = wa_custom56 = wa_custom57 = 
	wa_custom58 = wa_custom59 = wa_custom60 = wa_custom61 = wa_custom62 = wa_custom63 = wa_custom64 = 
	wa_custom65 = wa_custom66 = wa_custom67 = wa_custom68 = wa_custom69 = wa_custom70 = wa_custom71 = 
	wa_custom72 = wa_custom73 = wa_custom74 = wa_custom75 =
    wa_eCustom06 = wa_eCustom07 = wa_eCustom08 = wa_eCustom09 =
    wa_eCustom10 = wa_eCustom11 = wa_eCustom12 = wa_eCustom13 = wa_eCustom14 =
    wa_eCustom15 = wa_eCustom16 = wa_eCustom17 = wa_eCustom18 = wa_eCustom19 = wa_eCustom20 =
    wa_eCustom21 = wa_eCustom22 = wa_eCustom23 = wa_eCustom24 = wa_eCustom25 = wa_eCustom26 = wa_eCustom27 =
    wa_eCustom28 = wa_eCustom29 = wa_eCustom30 = wa_eCustom31 = wa_eCustom32 = wa_eCustom33 = wa_eCustom34 =
    wa_eCustom35 = wa_eCustom36 = wa_eCustom37 = wa_eCustom38 = wa_eCustom39 = wa_eCustom40 = wa_eCustom41 =
    wa_eCustom42 = wa_eCustom43 = wa_eCustom44 = wa_eCustom45 = wa_eCustom46 = wa_eCustom47 = wa_eCustom48 =
    wa_eCustom49 = wa_eCustom50 = 
	wa_eCustom51 = wa_eAction = wa_eDnld = wa_eCustom54 = wa_eCustom55 = wa_eCustom56 = wa_eCustom57 = 
	wa_eCustom58 = wa_eCustom59 = wa_eCustom60 = wa_eCustom61 = wa_eCustom62 = wa_eCustom63 = wa_eCustom64 = 
	wa_eCustom65 = wa_eCustom66 = wa_eCustom67 = wa_eCustom68 = wa_eCustom69 = wa_eCustom70 = wa_eCustom71 = 
	wa_eCustom72 = wa_eCustom73 = wa_eCustom74 = wa_eCustom75 = "";

}
// sets all Site Catalyst vars to blank
function waInitSCVars() {

	sint.pageName = sint.server = sint.channel = sint.pageType = sint.referrer = 
	sint.prop1 = sint.prop2 = sint.prop3 = sint.prop4 = sint.prop5 = sint.prop6 = sint.prop7 = sint.prop8 = sint.prop9 = sint.prop10 = 
	sint.prop11 = sint.prop12 = sint.prop13 = sint.prop14 = sint.prop15 = sint.prop16 = sint.prop17 = sint.prop18 = sint.prop19 = sint.prop20 = 
	sint.prop21 = sint.prop22 = sint.prop23 = sint.prop24 = sint.prop25 = sint.prop26 = sint.prop27 = sint.prop28 = sint.prop29 = sint.prop30 = 
	sint.prop31 = sint.prop32 = sint.prop33 = sint.prop34 = sint.prop35 = sint.prop36 = sint.prop37 = sint.prop38 = sint.prop39 = sint.prop40 = 
	sint.prop41 = sint.prop42 = sint.prop43 = sint.prop44 = sint.prop45 = sint.prop46 = sint.prop47 = sint.prop48 = sint.prop49 = sint.prop50 = 
	sint.prop51 = sint.prop52 = sint.prop53 = sint.prop54 = sint.prop55 = sint.prop56 = sint.prop57 = sint.prop58 = sint.prop59 = sint.prop60 = 
	sint.prop61 = sint.prop62 = sint.prop63 = sint.prop64 = sint.prop65 = sint.prop66 = sint.prop67 = sint.prop68 = sint.prop69 = sint.prop70 = 
	sint.prop71 = sint.prop72 = sint.prop73 = sint.prop74 = sint.prop75 = 	
	sint.campaign = sint.state = sint.zip = sint.events = sint.products = sint.purchaseID = sint.objectID = 
	sint.eVar1 = sint.eVar2 = sint.eVar3 = sint.eVar4 = sint.eVar5 = sint.eVar6 = sint.eVar7 = sint.eVar8 = sint.eVar9 = sint.eVar10 = 
	sint.eVar11 = sint.eVar12 = sint.eVar13 = sint.eVar14 = sint.eVar15 = sint.eVar16 = sint.eVar17 = sint.eVar18 = sint.eVar19 = sint.eVar20 = 
	sint.eVar21 = sint.eVar22 = sint.eVar23 = sint.eVar24 = sint.eVar25 = sint.eVar26 = sint.eVar27 = sint.eVar28 = sint.eVar29 = sint.eVar30 = 
	sint.eVar31 = sint.eVar32 = sint.eVar33 = sint.eVar34 = sint.eVar35 = sint.eVar36 = sint.eVar37 = sint.eVar38 = sint.eVar39 = sint.eVar40 = 
	sint.eVar41 = sint.eVar42 = sint.eVar43 = sint.eVar44 = sint.eVar45 = sint.eVar46 = sint.eVar47 = sint.eVar48 = sint.eVar49 = sint.eVar50 =
	sint.eVar51 = sint.eVar52 = sint.eVar53 = sint.eVar54 = sint.eVar55 = sint.eVar56 = sint.eVar57 = sint.eVar58 = sint.eVar59 = sint.eVar60 = 
	sint.eVar61 = sint.eVar62 = sint.eVar63 = sint.eVar64 = sint.eVar65 = sint.eVar66 = sint.eVar67 = sint.eVar68 = sint.eVar69 = sint.eVar70 = 
	sint.eVar71 = sint.eVar72 = sint.eVar73 = sint.eVar74 = sint.eVar75 = 	 
	sint.hier1 = sint.hier2 = sint.hier3 = sint.hier4 = sint.hier5 = "";
}

// repopulates wa_event var with the appropriate event number
function waProcessEvents(eventStr, setEvent5) {
    var newEventStr, linkVars, i;
    newEventStr = "";

    // set Event5 on Page Views only	
    if (setEvent5 === "Y") {
        newEventStr = "event5";
    }

    if (eventStr !== "") {

        linkVars = eventStr.split(",");

        for (i = 0; i < linkVars.length; i += 1) {

            linkVars[i] = linkVars[i].toLowerCase();
            eventVar = "";

            if (waEventTbl[linkVars[i]]) {
                eventVar = waEventTbl[linkVars[i]];
            }
            else if ((linkVars[i].indexOf("event") > -1) && (linkVars[i] !== "event5")) {
                eventVar = linkVars[i];
            }

            if (eventVar !== "") {
                if (newEventStr === "") {
                    newEventStr = eventVar;
                }
                else {
                    newEventStr = newEventStr + "," + eventVar;
                }
            }
        }
    }


    if (newEventStr === "") {
        wa_events = "";
    }
    else {
        wa_events = newEventStr;
    }
}

// Function is called using an onClick event on an anchor tag on a page
function waCustomLink(cUrl, cLinkName, cLinkType, cSendVals) {

    if (typeof cLinkName === "undefined") {
        cLinkName = "";
    }

    if (cLinkName !== "") {
        cLinkName = cLinkName.toLowerCase();
    }
    else {
        cLinkName = unescape(cUrl).toLowerCase();
    }

    if ((typeof cLinkType === "undefined") || (cLinkType === "")) {
        cLinkType = "o";
    }

    if ((typeof cSendVals === "undefined") || (cSendVals === "")) {
        cSendVals = "none";
    }


    waProcessLink(cUrl, cLinkName, cLinkType, cSendVals, 'wacustomlink');
}

// Function is used to send link event
function waTrackAsLink(rLinkName, rLinkType, rSendVals, limitExceeded) {

    // set url to blank to pass to waProcessLink function
    url = "";

    if ((typeof rSendVals === "undefined") || (rSendVals === "")) {
        rSendVals = "none";
    }

    if ((typeof rLinkType === "undefined") || (rLinkType === "")) {
        rLinkType = "o";
    }

    if ((typeof rLinkName === "undefined") || (rLinkName === "")) {

        rLinkName = "watrackaslink function";
    }
    else {
        rLinkName = rLinkName.toLowerCase();
    }

    waProcessLink(url, rLinkName, rLinkType, rSendVals, 'watrackaslink');

}


// Main link processing function - called by waCustomLink and waTrackAsLink functions
function waProcessLink(waURL, waLinkName, waLinkType, waSendVals, waCalledBy) {
    var linkVars, i, holdVals;
    // Set SC Vars to blank so no additional values are sent to SC
    waInitSCVars();

    // set linkTrackEvents to blank - will send any vars or events set in the call
    sint.linkTrackVars = 'none';
    sint.linkTrackEvents = '';

    // set link name
    waLinkName = wa_org1 + ":" + waLinkName;

    // Validate link type; default to custom link type    
    waLinkType = waLinkType.toLowerCase();

    switch (waLinkType) {
    case "d":
    case "e":
    case "o":
        break;
    default:
        waLinkType = "o";
    }

    // assign and validate additional variables if any are passed
    // proper format is: name=value&name=value

    if (waSendVals !== "none") {
        linkVars = waSendVals.split("&");

        for (i = 0; i < linkVars.length; i += 1) {

            // Check for equal sign - if not present, then the format is invalid and will not process
            is_valid = linkVars[i].indexOf("=");

            if (is_valid !== -1) {
                holdVals = linkVars[i].split("=");
                holdVals[1] = holdVals[1].toLowerCase();

                if (waVarTbl[holdVals[0]]) {
                    if (holdVals[0] === "wa_events") {
                        waProcessEvents(holdVals[1], 'N');
                        sint.events = wa_events;
                    }
                    else {
                        sint[waVarTbl[holdVals[0]]] = holdVals[1];
                        if (sint.linkTrackVars !== "") {
                            sint.linkTrackVars = sint.linkTrackVars + "," + waVarTbl[holdVals[0]];
                        }
                        else {
                            sint.linkTrackVars = waVarTbl[holdVals[0]];
                        }
                    }
                }
            }
        }

    }


    waProcessVars();

	if (sint.prop19 !== "") {
		sint.eVar19 = sint.prop19;
		sint.linkTrackVars = sint.linkTrackVars + ",eVar19";
	}
	
	if (sint.prop6 !== "") {
		sint.eVar51 = sint.prop6;
		sint.linkTrackVars = sint.linkTrackVars + ",eVar51";
	}

    if (sint.events !== "") {
        //sint.linkTrackEvents = sint.events;
        sint.linkTrackVars = sint.linkTrackVars + ",events";
    }

    if (waCalledBy === 'wacustomlink') {
        sint.tl(waURL, waLinkType, waLinkName);
    }
    else {
        sint.tl(true, waLinkType, waLinkName);
    }

    sint.linkTrackVars = "none";
    sint.linkTrackEvents = "none";
}

function waTrackAsPage(pgName, sendVals, limitExceeded) {
    var pageVals, i, holdVals;
    // Set SC and WAP Variables to blank
    waInitSCVars();
    waInitWAPVars();

    // Check for page name - this is a required field
    if ((pgName === "") || (typeof pgName === "undefined")) {
        wa_pageName = "watrackaspage function: unassigned page name";
    }
    else {
        wa_pageName = pgName;
    }

    // process name/value pair of additional WAP vars
    if (typeof sendVals !== "undefined") {

        if (sendVals !== "") {

            // splits string at the '&' which results in array of name=value
            pageVals = sendVals.split("&");

            for (i = 0; i < pageVals.length; i += 1) {

                // check for valid format (name=value) - if not valid, don't process
                is_valid = pageVals[i].indexOf("=");

                if (is_valid !== -1) {
                    holdVals = pageVals[i].split("=");
                    window[holdVals[0]] = holdVals[1];

                }
            }
        }
    }

    // call main processing function	
    waProcess();
    sint.t();
}


// Tagged Links - used for naming links for Clickmap
function tagLinks(tagName) {
    s_objectID = tagName;
}

/***** End WAP Custom Code *****/

/* Plugin Config */
sint.usePlugins = true;

function s_doPlugins(s) {
    /* Add calls to plugins here */
    // Perform getValOnce function for s.campaign so only track once in a session
    sint.campaign = sint.getValOnce(sint.campaign, "cmp_cookie", 0);
    // capture dartmail tracking code
    sint.eVar50 = sint.getValOnce(sint.getQueryParam('sssdmh'), 'e50_cookie', 0);

    //getDaysSinceLastVisit v1.1
    sint.prop16 = sint.getDaysSinceLastVisit('s_lv');
    sint.eVar16 = sint.getDaysSinceLastVisit('s_lv');

    if (sint.prop16 === "Cookies Not Supported") { }

    else if ((sint.prop16 === "First Visit") || (sint.prop16 === "More than 30 days")) {
        sint.eVar17 = "new";
        sint.prop17 = "new";
    }
    else {
        sint.eVar17 = "repeat";
        sint.prop17 = "repeat";
    }


    //Click Thru Quality
    sint.clickThruQuality('event9', 'event10');

    //stop sending browser plugins
    sint.plugins = "";

    // get previous value for s.pageName variable, set to prop18 on every page	
    sint.prop18 = sint.getPreviousValue(sint.pageName, 'gpv_p18', '');
}

sint.doPlugins = s_doPlugins;

/****************************** MODULES *****************************/
/* Module: Integrate */
sint.m_Integrate_c = "var m=sint.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!sint.wd[o])sint.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p.get"
+ "=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m.l[i]"
+ "];if(p&&!p.disable&&p[f]){if(sint.apv>=5&&(!sint.isopera||sint.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=function"
+ "(p,u){var m=this,s=m.s,x,v,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(sint.ssl)u=sint.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*1000000000000"
+ "0):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;for(x in p)if(x&&x.substring(0,1)!='_'&&(!Object||!Object.prototype||!Object.prototype[x])){v=''+p[x];if(v==p[x]||parseFloat(v)==p[x])u="
+ "sint.rep(u,'['+x+']',sint.rep(escape(v),'+','%2B'))}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule("
+ "'Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<"
+ "m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d["
+ "x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&sint.d.images&&sint.apv>=3&&(!sint.isopera||sint.apv>=7)&&(sint.ns6<0||sint.apv>=6.1)){p._c++;i"
+ "m=sint.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
sint.m_i("Integrate");

/************************** START PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/* Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
sint.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");	
/*
 * Plugin: getQueryParam 2.1 - return query string parameter(s)
 */
sint.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=sint.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=sint.p_gpv(p.substring(0,i),u+'');if(t)v+=v?d+t:t;p=p.subs"
+"tring(i==p.length?i:i+1)}return v");

sint.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");

sint.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");
/*
 * Utility Function: vpr - set the variable vs with value v
 */
sint.vpr=new Function("vs","v",
"if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
sint.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin Utility: Replace v1.0
 */
sint.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
/*
 * Plugin clickThruQuality v1.0
 */
sint.clickThruQuality = function(tcth_ev, cp_ev) {
var s = this;
if (sint.p_fo('clickThruQuality') == 1) {
    var ev = sint.events ? sint.events + "," : "";     
	if (!s.c_r("cf")) {
		s.c_w("cf", 1, 0);
		sint.events = ev + tcth_ev;		
    }
	else {
		if (s.c_r("cf") == 1) {
            s.c_w("cf", 0, 0);
            sint.events = ev + cp_ev;
		}
    }  
  }
}
/*********************************************************************
* Function p_fo(x,y): Ensures the plugin code is fired only on the 
*      first call of do_plugins
* Returns:
*     - 1 if first instance on firing,0 if not first instance on firing
*********************************************************************/
sint.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");
/*
 * Plugin: getValOnce_v1.0
 */
sint.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");
/*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */
sint.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");

/************************** END PLUGINS SECTION *************************/

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/

var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22.1/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047);if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3"
+"&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+']."
+"mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e',"
+"'this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if((!ta||ta=='_self'||ta="
+"='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0"
+" alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl="
+"function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase()"
+";i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.lengt"
+"h>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'"
+"+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].tr"
+"ackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='l"
+"inkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pa"
+"geURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigra"
+"tionServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em="
+"=2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode"
+"')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j"
+"';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp'"
+";else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)"
+"!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t"
+")return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExt"
+"ernalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)"
+"!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t"
+"();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Functi"
+"on(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.inde"
+"xOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'"
+"')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE'"
+")t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p"
+"=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' '"
+",'');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100"
+");o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&"
+"s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,'"
+",','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[u"
+"n]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Ob"
+"ject.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq"
+"[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o"
+".onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie|"
+"|!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=func"
+"tion(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e)"
+")return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.subst"
+"ring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowe"
+"rCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};"
+"s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_"
+"l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Ar"
+"ray('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.le"
+"ngth;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0"
+";if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf("
+"\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl."
+"length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexO"
+"f('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadMo"
+"dule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else "
+"g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],"
+"o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!"
+"o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javas"
+"cript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,"
+"f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]"
+"||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.d"
+"ll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.d"
+"l=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=fun"
+"ction(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate("
+")+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Objec"
+"t;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1'"
+";if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try"
+"{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c="
+"screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWid"
+"th;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp="
+"tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.f"
+"l(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=c"
+"t;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer"
+";if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o)"
+",n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:''"
+";if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName"
+";t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p="
+"s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
+"'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r("
+");s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_link"
+"Name=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o)"
+"{var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().inde"
+"xOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var ap"
+"n=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isope"
+"ra=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv="
+"parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=="
+"'%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLi"
+"fetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,"
+"linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browse"
+"rHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests"
+",mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadF"
+"ileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}
s_code=sint.t();if(s_code)document.write(s_code);