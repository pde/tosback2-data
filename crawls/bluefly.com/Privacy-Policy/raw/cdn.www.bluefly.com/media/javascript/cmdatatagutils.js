<!--
/*
 * cmdatatagutils.js 
 * $Id: cmdatatagutils-9422567-90039438-071709.js.txt 124651 2009-07-17 21:53:43Z knaquin $
 * $Revision: 124651 $
 *
 * Version 4.1.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *KNAQUIN	7/17/2009	Updated for AdTarget. Added variables cm_Production_HOST and cm_PartnerDataClientIDs.
 */
 
var cm_ClientID = "90039438";
var cm_TrackLink = "A";
var cm_TrackImpressions = "";
var cm_JSFEnabled = false;
var cm_Production_HOST = "core.bluefly.com";  // or 1st party DCD
var cm_PartnerDataClientIDs = "90039438";   // cm_ClientID value
	if (typeof cmLoad == 'function') {
		cmLoad();
	}

var cmJv = "1.0";
if (typeof(isNaN) == "function") cmJv = "1.1";
if (typeof(isFinite) == "function") cmJv = "1.2";
if (typeof(NaN) == "number") cmJv = "1.3";
if (typeof(decodeURI) == "function") cmJv = "1.5";
if (typeof(Array.forEach) == "function") cmJv = "1.6";
if (typeof(Iterator) == "object") cmJv = "1.7";

var cmCheckCMEMFlag = true;
  
/* TAG GENERATING FUNCTIONS */

/*
 * Calling this function points tags to the production database
 */
function cmSetProduction(){
	cm_HOST = cm_Production_HOST + "/cm?";
//	cm_JSFPCookieDomain = "somedomain.com";
}

function cmCreateManualImpressionTag(pageID, trackSP, trackRE) {
		// insert code to get pageID from cmTagControl if pageID is null
		cmMakeTag(["tid","9","pi",pageID,"cm_sp",trackSP,"cm_re",trackRE,"st",cm_ClientTS]);
}

function cmCreateManualLinkClickTag(href,name,pageID) {	
	if (cmCreateLinkTag == null && cM != null) {
		var cmCreateLinkTag = cM;
	}
	if (cmCreateLinkTag != null) {		
		var dt = new Date();
		cmLnkT3 = dt.getTime();
		cmCreateLinkTag(cm_ClientTS, cmLnkT3, name, href, false, pageID);
	}
}

/* manual PageviewTag for off site page tagging.  Allows client to supply URL and Referring URL
*/
function cmCreateManualPageviewTag(pageID, categoryID,DestinationURL,ReferringURL) {
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"ul",DestinationURL,"rf",ReferringURL]);
}

function cmCreatePageElementTag(elementID, elementCategory, pageID, pageCategoryID, elementLocation) {
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"pflg","0","pid",pageID,"pcat",pageCategoryID,"eloc",elementLocation]);
}

function cmCreateProductElementTag(elementID, elementCategory, productID, productCategoryID, elementLocation) {
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"pflg","1","pid",productID,"pcat",productCategoryID,"eloc",elementLocation]);
}

/*
 * Creates a Tech Props tag.
 * pageID		: required. Page ID to set on this Pageview tag
 */
function cmCreateTechPropsTag(pageID, categoryID) {
	if(pageID == null) { pageID = cmGetDefaultPageID(); }
	cmMakeTag(["tid","6","pi",pageID,"cg",categoryID,"pc","Y"]);
}

/*
 * Creates a Pageview tag with the given Page ID
 *
 * pageID	: required. Page ID to set on this Pageview tag
 * categoryID	: optional. Category ID to set on this Pageview tag
 * searchString	: optional. Internal search string enterred by user to reach
 *				  this page.
 *
 * 
 */
function cmCreatePageviewTag(pageID, categoryID, searchString, searchResults) {
	if (pageID == null) { pageID = cmGetDefaultPageID(); }
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"se",searchString,"sr",searchResults]);
}

/*
 * Creates a Pageview tag with the default value for Page ID. 
 * Format of Page ID is "x/y/z/MyPage.asp"
 *
 * 
 */
function cmCreateDefaultPageviewTag(categoryID) {
	cmCreatePageviewTag(cmGetDefaultPageID(), categoryID);
}

/*
 * Creates a Productview Tag
 * Also creates a Pageview Tag by setting pc="Y"
 * Format of Page ID is "PRODUCT: <Product Name> (<Product ID>)"
 *
 * productID	: required. Product ID to set on this Productview tag
 * productName	: required. Product Name to set on this Productview tag
 * categoryID	: optional. Category ID to set on this Productview tag 
 *
 * 
 */
function cmCreateProductviewTag(productID, productName, categoryID) {
	cmMakeTag(["tid","5","pi","PRODUCT: "+productName+" ("+productID+")","pr",productID,"pm",productName,"cg",categoryID,"pc","Y"]);
}

/*
 * Variables and Arrays to support Lineitem Aggregation
 */
var __sArray = new Array();
var __skuString = "";

function __cmGetPI(__id){
	var __pI;
	for (__pI = 0; __pI < __sArray.length; ++__pI) {
		if (__id == __sArray[__pI][1]) return __pI;
	}
	return -1;
}

function __cmGetPIPC(__pr,__cg) {
	var __pI;
	for (__pI = 0; __pI < __sArray.length; ++__pI) {
		if (__pr == __sArray[__pI][1] && __cg == __sArray[__pI][9]) return __pI;
	}
	return -1;
}

function cmAddShop(__v) {
	//var __i = __cmGetPIPC(__v[1],__v[9]); /* uncomment for productID-categoryID aggregation */
	var __i = __cmGetPI(__v[1]); /* uncomment for productID aggregation */
	if (__i == -1) {
		__sArray[__sArray.length] = __v;
	}
	else {
		var __oQ = __sArray[__i][5];
		var __oP = __sArray[__i][7];
		__sArray[__i][5] = parseInt(__sArray[__i][5]) + parseInt(__v[5]);
		__sArray[__i][7] = (((__v[7]*__v[5])+(__oP*__oQ))/__sArray[__i][5]);
	}
}

/*
 * Creates a Shop tag with Action 5 (Shopping Cart)
 *
 * productID	: required. Product ID to set on this Shop tag
 * quantity	: required. Quantity to set on this Shop tag
 * productPrice	: required. Price of one unit of this product
 * categoryID	: optional. Category to set on this Shop tag
 *
 * 
 */
function cmCreateShopAction5Tag(productID,productName,productQuantity,productPrice,categoryID) {
	var pattern = /[^0-9\.]/gi;
    productPrice = productPrice.toString().replace(pattern, "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"at","5","tid","4","pc","N"]);
}

/*
 * Creates a Shop tag with Action 9 (Order Receipt / Confirmed)
 *
 * productID	: required. Product ID to set on this Shop tag
 * productName	: required. Product Name to set on this Shop tag
 * quantity	: required. Quantity to set on this Shop tag
 * productPrice	: required. Price of one unit of this product
 * customerID	: required. ID of customer making the purchase
 * orderID	: required. ID of order this lineitem belongs to
 * orderTotal	: required. Total price of order this lineitem belongs to
 * categoryID	: optional. Category to set on this Shop tag
 *
 */
function cmCreateShopAction9Tag(productID,productName,productQuantity,productPrice,customerID,orderID,orderTotal,categoryID) {
	var pattern = /[^0-9\.]/gi;
    productPrice = productPrice.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cd",customerID,"on",orderID,"tr",orderTotal,"at","9","tid","4","pc","N"]);
	cmCalcSKUString();
}

function cmDisplayShop5s() {
	cmDisplayShops();
}

function cmDisplayShop9s() {
	cmCalcSKUString();
	cmDisplayShops();
}

function cmCalcSKUString() {
	__skuString = "";
	var __skuStringArray = new Array();
	for (i = 0; i < __sArray.length; ++i) {
		// aggregate
		var __skuStringArrayIndex = -1;
		for (y = 0; y < __skuStringArray.length; ++y) {
			if (__sArray[i][1] == __skuStringArray[y][0] ) {
				__skuStringArrayIndex = y;
			}
		}
		if (__skuStringArrayIndex == -1) {
			// it doesn't exist, so add it
			var newArrayIndex = __skuStringArray.length;
			__skuStringArray[newArrayIndex] = new Array();
			__skuStringArray[newArrayIndex][0] = __sArray[i][1];
			__skuStringArray[newArrayIndex][1] = __sArray[i][7];
			__skuStringArray[newArrayIndex][2] = __sArray[i][5];
		}
		else {
			// it exists, so update it
			var __oP = __skuStringArray[__skuStringArrayIndex][1];
			var __oQ = __skuStringArray[__skuStringArrayIndex][2];
			__skuStringArray[__skuStringArrayIndex][2] = parseInt(__sArray[i][5]) + __oQ;
			__skuStringArray[__skuStringArrayIndex][1] = (((__sArray[i][7]*__sArray[i][5])+(__oP*__oQ))/__sArray[i][5]);		
		}
	}
	for (x = 0; x < __skuStringArray.length; ++x) {
		__skuString += "|"+__skuStringArray[x][0]+"|"+__skuStringArray[x][1]+"|"+__skuStringArray[x][2]+"|";
	}
}

function cmDisplayShops() {
	var i;
	for (i = 0; i < __sArray.length; ++i) {
		cmMakeTag(__sArray[i]);
	}
	__sArray = new Array();
}

/*
 * Creates an Order tag
 *
 * orderID			: required. Order ID of this order
 * orderTotal		: required. Total of this order (minus tax and shipping)
 * orderShipping	: required. Shipping charge for this order
 * customerID		: required. Customer ID that placed this order
 * customerCity		: optional. City of Customer that placed this order
 * customerState	: optional. State of Customer that placed this order
 * customerZIP		: optional. Zipcode of Customer that placed this order
 *
 */
function cmCreateOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP) {
	var pattern = /[^0-9\.]/gi;
    orderShipping = orderShipping.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	cmMakeTag(["tid","3","osk",__skuString,"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP]);
	__skuString = "";
}

/*
 * Creates a Conversion Event tag
 *
 * eventID			: required. Conversion event ID
 * actionType		: required. 1=conversion initiation, 2=conversion completion
 * categoryID		: optional. Category for the event
 * points			: optional. Point value to assign to conversion.
 */
 function cmCreateConversionEventTag(eventID, actionType, categoryID, points) {
	cmMakeTag(["tid","14","cid",eventID,"cat",actionType,"ccid",categoryID,"cpt",points]);
 }

/*
 * Creates a Registration tag and/or a Newsletter tag
 *
 * customerID		: required for Registration. ID of Customer to register.
 * customerEmail	: required for Newsletters. Optional for Registration.
 * customerCity		: optional. City of Customer that placed this order
 * customerState	: optional. State of Customer that placed this order
 * customerZIP		: optional. Zipcode of Customer that placed this order
 * newsletterName	: required for Newsletters. The name of the Newsletter.
 * subscribe		: required for Newsletters. Either "Y" or "N"
 *
 */
function cmCreateRegistrationTag(customerID, customerEmail, customerCity,
				customerState, customerZIP, newsletterName, 
				subscribe) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl",newsletterName,"sd",subscribe]);
}

/* Creates an Error Tag
 *
 */
function cmCreateErrorTag(pageID, categoryID) {
	if(pageID == null) {
		pageID = cmGetDefaultPageID();
	}
	cmMakeTag(["tid","404","pi",pageID,"cg",categoryID,"pc","Y"]);
}

function cmMakeTag(__v) {
	var cm = new _cm("vn2", "e4.0");
	var i;
	for (i = 0; i < __v.length; i += 2) {
		var _n = __v[i];
		var _v = __v[i + 1];
		cm[_n] = _v;
	}

	if (cm.tid == "6") {
		cm.addTP();
	}

	if (cm.tid == "1") {
		if (cI("cmTPSet") != 'Y') {
			cm.tid = "6";
			cm.addTP();
			document.cookie = "cmTPSet=Y";
		}
	}

	if ((cm.pi == null) && (cm.pc == "Y")) {
		cm.pi = cmGetDefaultPageID();
	}

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

	if (cm.ul == null) {
		cm.ul = window.location.href;
	}

	//check for zero price and zero quantity
	cmSafeZero(cm,["qt","bp","tr","sg"]);

	//check for manual_cm_mmc parameter;
	if (this.manual_cm_mmc != null) {
		cm.ul = cm.ul + ((cm.ul.indexOf("&") == -1) ? ((cm.ul.indexOf("?") == -1) ? "?" : "&") : "&") + "cm_mmc=" + this.manual_cm_mmc;
	}

	// convert MMC parameters to lowercase;
	cm.ul = cm.ul.replace(/cm_mmc/gi,"cm_mmc");
	cm.ul = cm.ul.replace(/cm_ven/gi,"cm_ven");
	cm.ul = cm.ul.replace(/cm_cat/gi,"cm_cat");
	cm.ul = cm.ul.replace(/cm_pla/gi,"cm_pla");
	cm.ul = cm.ul.replace(/cm_ite/gi,"cm_ite");

    cm.writeImg();
	if (cmCheckCMEMFlag) {
		cmCheckCMEMFlag = false;
		cmCheckCMEM();
	}
	
}

// HELPER FUNCTIONS -----------------------------------------------------------
/* These functions are used by the tag-generating functions and/or may be used
 * in in general as convenience functions
 */

/*
 * Creates an acceptable default Page ID value to use for Pageview tags.
 * The default Page ID is based on the URL, and consists of the path and
 * filename (without the protocol, domain and query string).
 * 
 * example:
 * returns "x/y/MyPage.asp" for the URL http://www.mysite.com/x/y/MyPage.asp
 */
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
		pageName = pageName + "default.asp"; /****************** SET TO DEFAULT DOC NAME */
	}

	while (pageName.indexOf("/") == 0) {
		pageName = pageName.substr(1,pageName.length);
	}

	return(pageName); 
} 

function cmIndexOfParameter (parameter, inString) {
	return inString.indexOf(parameter);
}

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
	return s.substring(middle + 1, end);
}

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

function cmCheckCMEM() {
	if (cmIndexOfParameter("cm_em",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_em",document.location.href);
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
	if (cmIndexOfParameter("cm_lm",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_lm",document.location.href);
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
}

function cmSafeZero(cm, checkArray) {
	// put logic here to convert number 0 to string "0"
	for (i = 0; i < checkArray.length; ++i) {
		if ((cm[checkArray[i]] != null) && (cm[checkArray[i]] == 0)) {
			cm[checkArray[i]] = "0";
		}
	}
}

if (defaultNormalize == null) { var defaultNormalize = null; }

function myNormalizeURL(url, isHref) {
    var newURL = url;
    // ... transform newURL here ...
    if (defaultNormalize != null) {
        newURL = defaultNormalize(newURL, isHref);
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

//-->
