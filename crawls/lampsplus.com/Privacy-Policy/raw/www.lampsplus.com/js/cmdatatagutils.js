<!--
/*
 * cmdatatagutils.js 
 * $Id: cmdatatagutils -10029890 -90065468 -20100907.txt 154981 2010-09-07 20:16:22Z croberts $
 * $Revision: 154981 $
 *
 * Version 4.1.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 * Date			Imp. Eng.			Desc
 * 021208		MOCHOA				Library migration from 4.0 to 4.1.0
 * 071409		YHUNT				Added logic for AdTarget
 * 09302009		CROBERTS			removed "/eluminate?" 
 *							from cm_Production_HOST
 * 09072010		CROBERTS			Updated to add extrafield1 to shop 
 * 08312010		CROBERTS			Added Extra fields so shop action
 *							5 tag can have cartID as extrafield1.
 *
 */


var coremetrics = { 
	"cmConfigMapping": {"io":"cm_IOEnabled",
						"ia":"cm_OffsiteImpressionsEnabled",
						"at":"cm_ATEnabled"},
	"cmUpdateConfig" : function cmUpdateConfig(newConfigMap) {
		for (var i in newConfigMap) {
			window[coremetrics.cmConfigMapping[i]] = newConfigMap[i];
		}
	},
	"cmVersion":"e5.0.1",
	"cmLoad":cmLoad
};
 
var cm_exAttr=new Array();  
var cmCheckCMEMFlag = true;
var cmAutoCopyAttributesToExtraFields = false;

var cmJv = "1.0";
if (typeof(isNaN) == "function") { cmJv = "1.1";}
if (typeof(isFinite) == "function") { cmJv = "1.2";}
if (typeof(NaN) == "number") { cmJv = "1.3";}
if (typeof(decodeURI) == "function") { cmJv = "1.5";}
if (typeof(Array.forEach) == "function") { cmJv = "1.6";}
if (typeof(Iterator) == "object") {cmJv = "1.7";}

var cmPricePattern = /[^\-0-9\.]/gi;
var cmSpacePattern = /^\s+|\s+$/gi;
var cmMMCPattern = /cm_(?:mmc|ven|cat|pla|ite)/gi;


 //Professionals Check
 
 function Get_Cookie( name ) 
{
		
var start = document.cookie.indexOf( name + "=" );
var len = start + name.length + 1;
	if ( ( !start ) &&
	( name != document.cookie.substring( 0, name.length ) ) )
	{
	return null;
	}
	if ( start == -1 ) return null;
var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
 }
	
 var strLP_PageID="";
 var strLP_CategoryID="";
 if(Get_Cookie('professionalsonlineid')!=null )
 {
	strLP_PageID="LPPro-"; 
	strLP_CategoryID="LPP";
 }
 
 function LP_PageID(strPageID)
 {
	if (strPageID!=null && strPageID!="") 
	{
		strPageID = strLP_PageID + strPageID
	}
	
	return strPageID
 }
 
 function LP_CategoryID(strCategoryID)
 {
	if (strCategoryID!=null && strCategoryID!="") 
	{
		if (strCategoryID.toLowerCase().indexOf("lpp") == -1) { // Don't double LPPs
			strCategoryID = strLP_CategoryID + strCategoryID
		}
	}
	
	return strCategoryID
 }
 //end professionals check

function cmLoadIOConfig() {
	if (typeof(IORequest) == "function") {
	   IORequest.client_id           = cm_ClientID;
	   IORequest.encrypt_cats        = true;
	   IORequest.encrypt_prds        = true; 
	   IORequest.conflict_resolution = true;
	   IORequest.max_prd_length      = 25;
	   IORequest.max_cat_length      = 25;
	   IORequest.timeout             = [8000, 4000];
	   IORequest.use_site_category   = false;
	   if ((IORequest.ie_version() !== null) && (IORequest.ie_version() < 7.0)) {
		  IORequest.a_max_elements = [3,3,5,3,3,3,3];
	   }
	   else {
		  IORequest.a_max_elements = [3,3,5,3,3,7,7];
	   }
	   IORequest.required_attributes  = [0,0,0,0,0];
	   IORequest.access_method			= 'json remote';
	   IORequest.default_product_file = undefined;
	}
}

function cmSetClientID(clientID,firstPartyCM,dataCollectionDomain,cookieDomain,autoLoad) {
	cm_PartnerDataClientIDs = cm_ClientID = clientID;
	if (typeof(IORequest) == "function"){
		IORequest.client_id = cm_ClientID;
	}

	if(firstPartyCM===true) {
		cm_JSFEnabled = true;
	}

	if(dataCollectionDomain) {
		cm_HOST = cm_Production_HOST = dataCollectionDomain;
		if ((dataCollectionDomain === "test.coremetrics.com") || (dataCollectionDomain === "testdata.coremetrics.com")) {
			cm_Production_HOST = "data.coremetrics.com";
		}
		cm_HOST += "/cm?";
	}

	if (cookieDomain) {
		cm_JSFPCookieDomain=cookieDomain;
	}
	document.write('<script language="javascript1.2" src="//libs.coremetrics.com/configs/' + cm_ClientID.split(";",1) + '.js"></script>');
}

function cmSetupCookieMigration(JSFPmigration, forceVisitorOverwrite, domainWhitelist, domainBlacklist, pathWhitelist, otherCookies, otherCookiesExpireTimes) {
	if(JSFPmigration) { cm_JSFPCookieMigrate = JSFPmigration; }
	if(forceVisitorOverwrite) { cm_JSFPForceMigrateCookies = forceVisitorOverwrite; }
	if(domainWhitelist) { cm_JSFPMigrationDomainWhitelist = domainWhitelist; }
	if(domainBlacklist) { cm_JSFPMigrationDomainBlacklist = domainBlacklist; }
	if(pathWhitelist) { cm_JSFPMigrationPathWhitelist = pathWhitelist; }
	if(otherCookies) { cm_JSFPMigrationOtherCookies = otherCookies; }
	if(otherCookiesExpireTimes) { cm_JSFPMigrationOtherCookiesExpireTimes = otherCookiesExpireTimes; }

	if (cm_JSFPCookieMigrate) {
		var tempClientIDList = cm_ClientID.split(";");
		var tempSessionID = {};
		for (var i = 0; i < tempClientIDList.length; ++i) {
			var tempValue = cmExtractParameter(cm_JSFPCookieMigrateSessionID + "_" + tempClientIDList[i], window.location.href);
				if (tempValue) {
					tempSessionID[tempClientIDList[i]] = tempValue;
				}
		}
		var otherCookies = {};
		if (cm_JSFPMigrationOtherCookies) {
			var tempOtherCookieList = cm_JSFPMigrationOtherCookies.split(",");
			for (var j = 0; j < tempOtherCookieList.length; ++j ) {
				var tempValue = cmExtractParameter("cm_mc_" + tempOtherCookieList[j], window.location.href);
				if (tempValue) {
					otherCookies[tempOtherCookieList[j]] = tempValue;
				}
			}
		}
		cmJSFPMigrateCookies(cmExtractParameter(cm_JSFPCookieMigrateVisitorID, window.location.href), tempSessionID, otherCookies);
	}
}

var cmNormalizeBlackList, cmNormalizeWhiteList = null;

function cmSetupNormalization(blacklist, whitelist, altFunction) {
	if (blacklist) {
		cmNormalizeBlackList = blacklist.split(",");
	}
	if (whitelist) {
		cmNormalizeWhiteList = whitelist.split(",");
	}
	if (altFunction) {
		if (document.cmTagCtl != null) {
			document.cmTagCtl.normalizeURL = altFunction;
		}
	}
}

function cmSetupOther(configObject) {
	for (var x in configObject) {
		window[x] = configObject[x];
	}
}

// Set the currency code value to be used by shop5, shop9, and order tags
function cmSetCurrencyCode(currencyCode) {
	cm_currencyCode = currencyCode;
}

function cmSetFirstPartyIDs(permID, sessionID) {
	cm_JSFPCookieMigrate = true;
	cm_JSFPForceMigrateCookies = true;
	var tempClientIDList = cm_ClientID.split(";");
	var tempSessionID = {};
	for (var i = 0; i < tempClientIDList.length; ++i) {
		tempSessionID[tempClientIDList[i]] = sessionID;
	}

	cmJSFPMigrateCookies(permID, tempSessionID, null);
}
// TAG GENERATING FUNCTIONS


function cmCreateManualImpressionTag(pageID, trackSP, trackRE, trackCR, trackME) {
		if (!pageID) {
			pageID = c1(cm_ClientID);
		}
		cmMakeTag(["tid","9","pi",pageID,"cm_sp",trackSP,"cm_re",trackRE,"cm_cr",trackCR,"cm_me",trackME,"st",cm_ClientTS]);
}

function cmCreateManualLinkClickTag(href,name,pageID) {	
	if (window.cmCreateLinkTag == null && window.cM !== null) {
		var cmCreateLinkTag = cM;
	}
	if (cmCreateLinkTag != null) {		
		var dt = new Date();
		cmLnkT3 = dt.getTime();
		href=cG7.normalizeURL(href,true);
		cmCreateLinkTag(cm_ClientTS, cmLnkT3, name, href, false, pageID);
	}
}

// manual PageviewTag for off site page tagging.  Allows client to supply URL and Referring URL
function cmCreateManualPageviewTag(pageID, categoryID,DestinationURL,ReferringURL, attributes, searchString, searchResults, extraFields) {
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"ul",DestinationURL,"rf",ReferringURL,"se",searchString,"sr",searchResults,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreateElementTag(elementID, elementCategory, attributes) {
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"cmAttributes",attributes]);
}

// included for backwards compatibility
function cmCreatePageElementTag(elementID, elementCategory, pageID, pageCategoryID, elementLocation, attributes) {
	cmCreateElementTag(elementID,elementCategory,attributes);
}

// included for backwards compatibility
var cmCreateProductElementTag = cmCreatePageElementTag;

// Creates a Conversion Event tag
//
// eventID			: required. Conversion event ID
// actionType		: required. 1=conversion initiation, 2=conversion completion
// categoryID		: optional. Category for the event
// points			: optional. Point value to assign to conversion.
// attibutes		: optional. Explore attributes
function cmCreateConversionEventTag(eventID, actionType, categoryID, points,attributes, extraFields) {
	cmMakeTag(["tid","14","cid",eventID,"cat",actionType,"ccid",categoryID,"cpt",points,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}


// Creates a Tech Props tag.
// pageID		: required. Page ID to set on this Pageview tag
function cmCreateTechPropsTag(pageID, categoryID, attributes, extraFields) {
	cmMakeTag(["tid","6","pi",pageID,"cg",LP_CategoryID(categoryID),"pc","Y","cmAttributes",attributes,"cmExtraFields",extraFields]);
}


// Creates a Pageview tag with the given Page ID
//
// pageID	: required. Page ID to set on this Pageview tag
// categoryID	: optional. Category ID to set on this Pageview tag
// searchString	: optional. Internal search string entered by user to reach this page.
// searchResults : optional.  Total numeric search results count.
function cmCreatePageviewTag(pageID, categoryID, searchString, searchResults, attributes, extraFields) {	
	cmMakeTag(["tid","1","pi",pageID,"cg",LP_CategoryID(categoryID),"se",searchString,"sr",searchResults,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

// Creates a Pageview tag with the default value for Page ID. 
function cmCreateDefaultPageviewTag(categoryID) {
	cmCreatePageviewTag(cmGetDefaultPageID(), categoryID);
}

// Creates a Productview Tag
// Also creates a Pageview Tag by setting pc="Y"
// Format of Page ID is "PRODUCT: <Product Name> (<Product ID>)"
//
// productID	: required. Product ID to set on this Productview tag
// productName	: required. Product Name to set on this Productview tag
// categoryID	: optional. Category ID to set on this Productview tag 
// searchString	: optional. Internal search string entered by user to reach this Product Detail page. Only usable if pc="Y".
// searchResults : optional.  Total numeric search results count. Only usable if pc="Y".
function cmCreateProductviewTag(productID, productName, categoryID, attributes, cm_vc) {
	cmMakeTag(["tid","5","pi",c1(cm_ClientID) ? c1(cm_ClientID) : "Product: " + productName + " (" + productID + ")","pr",productID,"pm",productName,"cg",LP_CategoryID(categoryID),"pc","Y","cm_vc",cm_vc?cm_vc:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}

// Variables and Arrays to support Lineitem Aggregation
var __sArray = [];
var __sRefArray = [];
var __sSkuArray = [];
var __sRefSkuArray = [];
var __skuString = "";

// Internal shop aggregation function.  Do not call this function directly
function cmAddShop(__v) {
	var __v2 = __v.concat();

	var tempArrayIndex = __sRefArray[__v[1] + "|" + __v[9]+ "|" + __v[11] + "|" + __v[13]];
	if (typeof(tempArrayIndex) !== "undefined") {
		var tempArrayPosition = __sArray[tempArrayIndex];
		if (tempArrayPosition) {
			var __oQ = tempArrayPosition[5];
			var __oP = tempArrayPosition[7];
			var tempNewQuantity = __v[5];
			__v[5] = parseInt(__oQ) + parseInt(__v[5]);
			__v[7] = (((__v[7]*tempNewQuantity)+(__oP*__oQ))/__v[5]);
			__sArray[tempArrayIndex] = __v;
		}
	} 
	else {
		__sRefArray[__v[1] + "|" + __v[9]+ "|" + __v[11] + "|" + __v[13]] = __sArray.length;
		__sArray[__sArray.length] = __v;
	}

	var tempArrayIndex2 = __sRefSkuArray[__v2[1]];
	if (typeof(tempArrayIndex2) !== "undefined") {
		var tempArrayPosition2 = __sSkuArray[tempArrayIndex2];
		if (tempArrayPosition2) {
			var __oQ = tempArrayPosition2[5];
			var __oP = tempArrayPosition2[7];
			var tempNewQuantity = __v2[5];
			__v2[5] = parseInt(__oQ) + parseInt(__v2[5]);
			__v2[7] = (((__v2[7]*tempNewQuantity)+(__oP*__oQ))/__v2[5]);
			__sSkuArray[tempArrayIndex2] = __v2;
		}
	}
	else {
		__sRefSkuArray[__v2[1]] = __sSkuArray.length;
		__sSkuArray[__sSkuArray.length] = __v2;
	}
}

function cmDisplayShops() {
	var i;
	for (i = 0; i < __sArray.length; ++i) {
		cmMakeTag(__sArray[i]);
	}
	__sArray = [];
	__sRefArray = [];
	__skuString = cmCalcSKUString();
}

//include for legacy purposes
var cmDisplayShop5s = cmDisplayShop9s = cmDisplayShops;

// needed to calculate OSK string for Order tag
function cmCalcSKUString() {
	var skuString = "";
	for(var i = 0;i < __sSkuArray.length; i++) {
		var temp = __sSkuArray[i];
		skuString += "|" + temp[1] + "|" + temp[7] + "|" + temp[5] + "|";
	}
	__sSkuArray = [];
	__sRefSkuArray = [];
	return skuString;
}


// Creates a Shop tag with Action 5 (Shopping Cart)
//
// productID	: required. Product ID to set on this Shop tag
// quantity	: required. Quantity to set on this Shop tag
// productPrice	: required. Price of one unit of this product
// categoryID	: optional. Category to set on this Shop tag
function cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID, attributes, extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    productPrice = productPrice.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cc",cm_currencyCode,"at","5","tid","4","pc","N"]);
}

// Creates a Shop tag with Action 9 (Order Receipt / Confirmed)
//
// productID	: required. Product ID to set on this Shop tag
// productName	: required. Product Name to set on this Shop tag
// quantity	: required. Quantity to set on this Shop tag
// productPrice	: required. Price of one unit of this product
// customerID	: required. ID of customer making the purchase
// orderID	: required. ID of order this lineitem belongs to
// orderTotal	: required. Total price of order this lineitem belongs to
// categoryID	: optional. Category to set on this Shop tag
function cmCreateShopAction9Tag(productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID, attributes, extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    productPrice = productPrice.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cd",customerID,"on",orderID,"tr",orderTotal,"cc",cm_currencyCode,"at","9","tid","4","pc","N"]);
}

// Creates an Order tag
//
// orderID			: required. Order ID of this order
// orderTotal		: required. Total of this order (minus tax and shipping)
// orderShipping	: required. Shipping charge for this order
// customerID		: required. Customer ID that placed this order
// customerCity		: optional. City of Customer that placed this order
// customerState	: optional. State of Customer that placed this order
// customerZIP		: optional. Zipcode of Customer that placed this order
function cmCreateOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP,attributes,extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    orderShipping = orderShipping.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");	
	cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cc",cm_currencyCode,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

// Creates a Registration tag and/or a Newsletter tag
//
// customerID		: required for Registration. ID of Customer to register.
// customerEmail	: required for Newsletters. Optional for Registration.
// customerCity		: optional. City of Customer that placed this order
// customerState	: optional. State of Customer that placed this order
// customerZIP		: optional. Zipcode of Customer that placed this order
function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, customerCountry, attributes) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cy",customerCountry,"cmAttributes",attributes]);
}

// DEPRECATED - Creates an error tag
function cmCreateErrorTag(pageID, categoryID) {
	cmMakeTag(["tid","404","pi",pageID,"cg",categoryID,"pc","Y"]);
}

// creates a custom tag
function cmCreateCustomTag(lineNumber, extraFields) {
	cmMakeTag(["tid","7","li",lineNumber,"cmExtraFields",extraFields]);
}

// Internal tag function, DO NOT CALL DIRECTLY
function cmMakeTag(__v) {
	var cm = new _cm("vn2", "e4.0");
	var i;
	for (i = 0; i < __v.length; i += 2) {
		var _n = __v[i];
		var _v = __v[i + 1];
		cm[_n] = _v;
	}
	
	// add a random number for cache-busting
	var datestamp = new Date();	
	var stamp = (Math.floor(Math.random() * 11111111)) + datestamp.valueOf();	
	cm.rnd = stamp;
	
	// if this is a TechProps tag, call addTP
	if (cm.tid == "6") {
		cm.addTP();
		//UPDATE: use cmSetCookie function instead
		document.cookie = "cmTPSet=Y; path=/";
	}

	// if this is the first pageview in the session, convert it to a TechProps tag
	if (cm.tid == "1") {
		if (cI("cmTPSet") != 'Y') {
			cm.tid = "6";
			cm.pc = "Y";
			cm.addTP();
			//UPDATE: use cmSetCookie function instead
			document.cookie = "cmTPSet=Y; path=/";
		}
	}

	// for backwards compatibility with clients using cmCustom libraries and the old cm_exAttr variable.
	if (cm.cm_exAttr) {
		cm.cmAttributes = cm.cm_exAttr.join("-_-");
		cm.cm_exAttr = null;
	}

	// process attribute and extrafield strings into correct tag parameters
	var cmAttributesMap = {"1": "pv_a","2":"rg","3":"o_a","4":"s_a","5":"pr_a","6":"pv_a","14":"c_a","15":"e_a"};
	var cmExtraFieldsMap = {"1": "pv","2":"rg","3":"or","4":"sx","5":"pr","6":"pv","7":"ps","14":"cx"};
	if (cm.cmAttributes) {
		var tempArray = cm.cmAttributes.split("-_-");
		var name = cmAttributesMap[cm.tid];
		for (i=0;i<tempArray.length;++i){
			cm[name + (i + 1)] = tempArray[i];
		}
		cm.cmAttributes = null;
	}
	if (cm.cmExtraFields) {
		var tempArray = cm.cmExtraFields.split("-_-");
		var name = cmExtraFieldsMap[cm.tid];
		for (i=0;i<tempArray.length;++i){
			cm[name + (i + 1)] = tempArray[i];
		}
		cm.cmExtraFields = null;
	}

	if (cmAutoCopyAttributesToExtraFields) {
		if ((cm.tid != '2') && (cm.tid != '15')) {
		    for (var i = 1; i <= 15; ++i) {
				if (!(cm[cmExtraFieldsMap[cm.tid] + "" + i])) {
					cm[cmExtraFieldsMap[cm.tid] + "" + i] = cm[cmAttributesMap[cm.tid] + "" + i];
				}
		    }
		}
	}
	
	// make sure we have a pageID value for pageview or tags that count as pageview
	if ((cm.pi == null) && ((cm.pc == "Y") || (cm.tid == "1"))) {
		cm.pi = cmGetDefaultPageID();
	}

	// try to get referrer from parent frameset
	try{
		if (parent.cm_ref != null) {
			cm.rf = parent.cm_ref;
			if (cm.pc == "Y") {
				parent.cm_ref = document.URL;
			}
		}
	
		// if parent had mmc variables and this is the first pageview, add mmc to this url
		if(parent.cm_set_mmc) {
			cm.ul = document.location.href + 
					((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
					parent.cm_mmc_params; 
			if (cm.pc == "Y") {
				parent.cm_ref = cm.ul;
				parent.cm_set_mmc = false;
			}
		}
	}
	catch(err){
		// most likely failed due to browser security restrictions, so do nothing
	}

	// Set the destination and referring URL parameters if not already set
	if (cm.ul == null) {
		cm.ul = window.location.href;
	}
	if (cm.rf == null) {
		cm.rf = document.referrer;
	}

	// convert MMC parameters to lowercase
	cm.ul = cm.ul.replace(cmMMCPattern,function(p){return p.toLowerCase();});
	cm.rf = cm.rf.replace(cmMMCPattern,function(p){return p.toLowerCase();});

	//check for manual_cm_mmc parameter and attach to URL if mmc parameter not already in URL
	if ((this.manual_cm_mmc) && (cm.ul.indexOf("cm_mmc") == -1) && (cm.ul.indexOf("cm_ven") == -1)) {
		cm.ul = cm.ul + ((cm.ul.indexOf("&") == -1) ? ((cm.ul.indexOf("?") == -1) ? "?" : "&") : "&") + "cm_mmc=" + this.manual_cm_mmc;
	}

	// check for cm_em or cm_lm parameter and add registration tag to tagset if necessary
	if (cmCheckCMEMFlag){
		cmStartTagSet();
	}
    cm.writeImg();
	if (cmCheckCMEMFlag) {
		cmCheckCMEMFlag = false;	
		cmCheckCMEM();
		cmSendTagSet();		
	}

	// call IO function if IO enabled
	if (typeof cm_ted_io == 'function') {
		cm_ted_io(cm);
	}
}

// HELPER FUNCTIONS -----------------------------------------------------------


// Creates an acceptable default Page ID value to use for Pageview tags.
// The default Page ID is based on the URL, and consists of the path and
// filename (without the protocol, domain and query string).
// 
// example:
// returns "x/y/MyPage.asp" for the URL http://www.mysite.com/x/y/MyPage.asp
function cmGetDefaultPageID() { 
	var pageName = window.location.pathname; 

	// eliminates everything after "?" (for Opera browswers)
	var tempIndex1 = pageName.indexOf("?");
	if (tempIndex1 != -1) {
		pageName = pageName.substr(0, tempIndex1);
	}
	// eliminates everything after "#" (for Opera browswers)
	var tempIndex2 = pageName.indexOf("#");
	if (tempIndex2 != -1) {
		pageName = pageName.substr(0, tempIndex2);
	}
	// eliminates everything after ";"
	var tempIndex3 = pageName.indexOf(";");
	if (tempIndex3 != -1) {
		pageName = pageName.substr(0, tempIndex3);
	}

	var slashPos = pageName.lastIndexOf("/");
	if (slashPos == pageName.length - 1) {
		pageName = pageName + "default";
	}

	while (pageName.indexOf("/") == 0) {
		pageName = pageName.substr(1,pageName.length);
	}

	return(pageName); 
} 

// returns the index of paramter within inString or -1 if not found
function cmIndexOfParameter (parameter, inString) {
	return inString.indexOf(parameter);
}


// expects inString to be a correctly formatted URI, returns value of parameter or null if parameter is not present
function cmExtractParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return null;
    }
	var s = inString;
	var begin = s.indexOf(parameter);
	var end = s.indexOf("&", begin);
	if (end == -1) {
		end = s.length;
	}
	var middle = s.indexOf("=", begin);
	return s.substring(middle + 1, end).split("#",1).join("");
}

// expects inString to be a correctly formatted URI, returns URI with parameter name and value removed
function cmRemoveParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return inString;
    }
	var s = inString;
	var begin = s.indexOf(parameter);
	var start = (begin - 1);
	var end = s.indexOf("&", begin);
	if (end == -1) {
		end = s.length;
	}
	if (s.substring(start, begin) == "?") {    // retain leading "?"
		start = (start + 1);
		end = (end + 1);
	}
	return s.substring(0, start) + s.substring(end, s.length);
}

// returns meta tag value or null if not present
function cmGetMetaTag(mn){ 
  //UPDATE: store meta tags in array and lookup in Array just in case this function gets called more than once
  var m = document.getElementsBytagName('meta'); 
  for(var i in m){ 
   if(m[i].name == mn){ 
     return m[i].content; 
   } 
  }
  return null;
}

// checks for cm_em or cm_lm parameter and creates registration tag if present
function cmCheckCMEM() {
	if (cmIndexOfParameter("cm_em",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_em",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
	if (cmIndexOfParameter("cm_lm",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_lm",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}		
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
}

if (defaultNormalize == null) { var defaultNormalize = null; }

function myNormalizeURL(url, isHref) {
	var newURL = url;
    
	if (isHref) {
		var paramString, params;
		var paramIndex = newURL.indexOf("?");
		var keepParams = new Array();
	
		if ((paramIndex > 0) && (cmNormalizeBlackList || cmNormalizeWhiteList)) {
			paramString = newURL.substring(paramIndex+1);
			newURL = newURL.substring(0, paramIndex);
			params = paramString.split("&");

			if (cmNormalizeBlackList) {
				for(var i=0; i<params.length; i++) {
					goodParam = true;
					for(var j=0; j<cmNormalizeBlackList.length; j++) {
						if (params[i].toLowerCase().indexOf(cmNormalizeBlackList[j].toLowerCase() + "=") == 0) {
							goodParam = false;
						}
					}
					if(goodParam == true) {
						keepParams[keepParams.length] = params[i];
					}
				}
			}

			if (cmNormalizeWhiteList) {
				for(var i=0; i<params.length; i++) {
					goodParam = false;
					for(var j=0; j<cmNormalizeWhiteList.length; j++) {
						if (params[i].toLowerCase().indexOf(cmNormalizeWhiteList[j].toLowerCase() + "=") == 0) {
							goodParam = true;
						}
					}
					if(goodParam == true) {
						keepParams[keepParams.length] = params[i];
					}
				}
			}
		
			newURL += "?" + keepParams.join("&");
		}
	 
		if (defaultNormalize != null) {
			newURL = defaultNormalize(newURL, isHref);
		}
	}
	return newURL;
}

// install normalization
if (document.cmTagCtl != null) {
    var func = "" + document.cmTagCtl.normalizeURL;
    if (func.indexOf('myNormalizeURL') == -1) {
        defaultNormalize = document.cmTagCtl.normalizeURL;
        document.cmTagCtl.normalizeURL = myNormalizeURL;
    }
}

// hash function to support shop aggregation with attributes
function cm_hex_sha1(s)    { if(s) {return cm_rstr2hex(cm_rstr_sha1(cm_str2rstr_utf8(s))); } else { return null; }}

// internal support functions for hashing, do not call directly
function cm_rstr_sha1(s)
{
  return cm_binb2rstr(cm_binb_sha1(cm_rstr2binb(s), s.length * 8));
}

function cm_rstr2hex(input)
{
  var hex_tab = 0 ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

function cm_str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    // Decode utf-16 surrogate pairs
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    // Encode output as utf-8
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

function cm_rstr2binb(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  return output;
}

function cm_binb2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
  return output;
}

function cm_binb_sha1(x, len)
{
  // append padding
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = cm_bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = cm_safe_add(cm_safe_add(cm_bit_rol(a, 5), cm_sha1_ft(j, b, c, d)),
                       cm_safe_add(cm_safe_add(e, w[j]), cm_sha1_kt(j)));
      e = d;
      d = c;
      c = cm_bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = cm_safe_add(a, olda);
    b = cm_safe_add(b, oldb);
    c = cm_safe_add(c, oldc);
    d = cm_safe_add(d, oldd);
    e = cm_safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

function cm_sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

function cm_sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

function cm_safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function cm_bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

// asyncronous tag queue
function cmExecuteTagQueue() {
	var i = window.cmTagQueue;
	if (i) {
		var f = (i.constructor == Array);
		if (!f) { return };
		for (var x = 0; x < i.length; ++x) {
			window[i[x][0]].apply(window,i[x].slice(1));
		}
	}
	return true;
}

cmExecuteTagQueue();