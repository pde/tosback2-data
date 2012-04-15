/*
 * cmdatatagutils.js
 * $Id: cmdatatagutils.js,v 1.48 2011/06/15 22:13:25 kchilders Exp $
 * $Revision: 1.48 $
 *
 * Version 4.2.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC.
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 * Update History
 * Date          Engineer      Changes Made
 * 28-Feb-2006   Hutch White   Update Client Library to Latest 4.0.23-1 Version.
 *                             Library Source from Client.
 *                             Added cm_ClientID="30000102", cm_Tracklink="A"
 * 01-Mar-2006   Jim Diggins   Added conditions to check for www, qa, dev, and
 *                             set the proper cm_ClientID and cm_host depending on the
 *                             environment.
 * 02-Mar-2006   Hutch White   Update Client Library to add referringURL parameter to
 *                             all tags.
 * 07-Mar-2006   Jim Diggins   Removed 'PRODUCT:' within the page id (cm.pi) for
 *                             cmCreateProductviewTag per Tim Kent.
 * 10-Mar-2006   Jim Diggins   Defined var cm within cmCreateShopAction5Tag.
 * 10-Mar-2006   Jim Diggins   Change cm.ps2 to be the same as cm.pi for
 *                             cmCreateProductviewTag per Tim Kent.
 * 05-Apr-2006	 Hutch White   Add Manual Link Click Code
 * 11-Aug-2006   Hutch White   Corrects a problem with the referring url being
 *			       passed through the shop 5 aggregation process
 * 30-Aug-2006   Jim Diggins   Problem ticket 317102. Change order when determining
 *			       which site is used.
 * 07-May-2009   LHibbard      Removed window.opener from tech props tag
 * 09/14/2010	 HWHITE		Convert to Maketag for new test system.
 * 12/29/2010    AAB         Remove "PRODUCT:" prefix from product view tag params
 * 01/07/2011	 AAB		Added rf parameter to product view maketag call
 * 01/07/2011 	 AAB		added se param to page view maketag call
 */

var cm_ClientID="60000102";
var cm_HOST="testdata.coremetrics.com/cm?";

var cm_TrackLink = "A";
var cm_TrackImpressions = "RS";
var cm_JSFEnabled = false;
var cmCheckCMEMFlag = true;
var cm_tempHost;
var cm_tempCookieDomain;
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
// IO V4 Configuration
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

/*
	clientID : REQUIRED: client id for particular site
	firstPartyCM : REQUIRED: true for Javascript First Party, false for 3rd party and 1st Party Subdomain
	hostDomain : REQUIRED for 1st PARTY:
			if firstPartyCM=true, set to site domain. 
			if firstPartyCM=false and site uses 1st party subdomain set to first party subdomain
			if firstPartyCM=false and hostDomain=null, automatically set to data.coremetrics.com
			cookieDomain : REQUIRED only for Delegated 1st party w/AdTarget - sets CoreAt in specified domain
*/
function cmSetClientID(clientID,firstPartyCM,dataCollectionDomain,cookieDomain){
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

// AdTarget case
	if (typeof cmLoad == 'function') {
		cmLoad();
	}
} 

/* TAG GENERATING FUNCTIONS */

/*
 * Calling this function points tags to the production database
 */
function cmSetProduction(){
	cm_ClientID="30000102";
	cm_HOST="data.coremetrics.com/cm?";
}

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
function cmCreateManualPageviewTag(pageID, categoryID,DestinationURL,ReferringURL, attributes, searchString, searchResults, cmExtraFields) {
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"ul",DestinationURL,"rf",ReferringURL,"se",searchString,"sr",searchResults,"cmAttributes",attributes,"cmExtraFields",cmExtraFields]);
}

function cmCreateElementTag(elementID, elementCategory, attributes) {
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"cmAttributes",attributes]);
}

function cmCreatePageElementTag(elementID, elementCategory, pageID, pageCategoryID, elementLocation,attributes) {
	cmCreateElementTag(elementID,elementCategory,attributes);
}

function cmCreateProductElementTag(elementID, elementCategory, productID, productCategoryID, elementLocation,attributes) {
	cmCreateElementTag(elementID,elementCategory,attributes);
}

function getCatParamFromDocumentForCM(formObj, fieldObj, cmPi, suffix, prefix) {
	var tempCmPi = cmPi;
	if (formObj) {
		if (fieldObj && fieldObj.value != '') {
			if (tempCmPi != '') {
				tempCmPi = tempCmPi + suffix;
			}
			tempCmPi = tempCmPi + prefix + fieldObj.value;
		}
	}
	return tempCmPi;
}

function getCmCgAsCategoryPathFromDocument(formObj) {
	var cmCg = '';
	cmCg = getCatParamFromDocumentForCM(formObj, YAHOO.util.Dom.get("ebCM_ggpCategoryId"), cmCg, '', 'C');
	cmCg = getCatParamFromDocumentForCM(formObj, YAHOO.util.Dom.get("ebCM_gpCategoryId"), cmCg, '', 'C');
	cmCg = getCatParamFromDocumentForCM(formObj, YAHOO.util.Dom.get("ebCM_pCategoryId"), cmCg, '', 'C');
	cmCg = getCatParamFromDocumentForCM(formObj, YAHOO.util.Dom.get("ebCM_categoryId"), cmCg, '', 'C');

	return cmCg;
}

function getCmPiAsCategoryPathFromDocument(formObj) {
	var cmPi = '';
	cmPi = getCatParamFromDocumentForCM(formObj, YAHOO.util.Dom.get("ebCM_ggpCategoryName"), cmPi, ':', '');
	cmPi = getCatParamFromDocumentForCM(formObj, YAHOO.util.Dom.get("ebCM_gpCategoryName"), cmPi, ':', '');
	cmPi = getCatParamFromDocumentForCM(formObj, YAHOO.util.Dom.get("ebCM_pCategoryName"), cmPi, ':', '');
	cmPi = getCatParamFromDocumentForCM(formObj, YAHOO.util.Dom.get("ebCM_categoryName"), cmPi, ':', '');

	return cmPi;
}

// Creates a Conversion Event tag
//
// eventID			: required. Conversion event ID
// actionType		: required. 1=conversion initiation, 2=conversion completion
// categoryID		: optional. Category for the event
// points			: optional. Point value to assign to conversion.
// attibutes		: optional. Explore attributes
function cmCreateConversionEventTag(eventID, actionType, categoryID, points,attributes, cmExtraFields) {
	cmMakeTag(["tid","14","cid",eventID,"cat",actionType,"ccid",categoryID,"cpt",points,"cmAttributes",attributes,"cmExtraFields",cmExtraFields]);
}


// Creates a Tech Props tag.
// pageID		: required. Page ID to set on this Pageview tag
function cmCreateTechPropsTag(pageID, categoryID, lineNum, ps1var, ps2var, referringURL,attributes, cmExtraFields) {
    var newCategoryID = categoryID;
    if (typeof(YAHOO)!="undefined"){
	    var ebCM = YAHOO.util.Dom.get("ebCM");

	    var thisPageID = '';

	    if (ebCM && (!YAHOO.ebauer.layerbox || YAHOO.ebauer.layerbox.getLayerboxState() == '')) {

		//pageID
		thisPageID = getCmPiAsCategoryPathFromDocument(ebCM);

		//ps2var
		if (thisPageID != '' && (ps2var == null || ps2var == '')) {
		    ps2var = thisPageID;
		}

		//categoryID
		newCategoryID = getNewCategoryID(categoryID,ebCM);
	    }
    }
    if (thisPageID == null || thisPageID == '') {
        thisPageID = pageID;
    }

    if (thisPageID == null || thisPageID == '') {
        thisPageID = cmGetDefaultPageID();
    }
    var pi = thisPageID;

    if (newCategoryID) {
        var cg = newCategoryID;
    }

	var li = lineNum;
	var ps1 = ps1var;
	var ps2 = ps2var;

	if (referringURL) {
		var rf = referringURL;
	} else {
		var rf = document.referrer;
	}
	cmMakeTag(["tid","6","pi",pi,"cg",cg,"pc","Y","li",li,"ps1",ps1,"ps2",ps2,"rf",rf,"cmAttributes",attributes,"cmExtraFields",cmExtraFields]);


}

/*
 * Common method to create a category ID (cg) for Coremetric tags.
 *
 * categoryID	 : required. category ID to set on this  tag
 * ebCM     	 : required. formObj to set on this  tag
 *
 * returns a new category ID
 */
function getNewCategoryID(categoryID,ebCM){
    var cIndex = -1;
    var eIndex = -1;
    var newCategoryID = categoryID;

    if (categoryID) {
        cIndex = categoryID.indexOf("C");
        eIndex = categoryID.indexOf("E");
        if (cIndex < 0) {
            var cmCGValue = getCmCgAsCategoryPathFromDocument(ebCM);
            // locate the place to insert.
            if (eIndex < 0) {
                // append
                newCategoryID = categoryID + cmCGValue;
            } else {
                // insert
                var firstPart = categoryID.substring(0, eIndex);
                var secondPart = categoryID.substring(eIndex);
                newCategoryID = firstPart + cmCGValue + secondPart;
            }
        }
    } else {
        var cmCGValue = getCmCgAsCategoryPathFromDocument(ebCM);
        newCategoryID = cmCGValue;
    }

    return newCategoryID;
}

// Creates a Pageview tag with the given Page ID
//
// pageID	: required. Page ID to set on this Pageview tag
// categoryID	: optional. Category ID to set on this Pageview tag
// searchString	: optional. Internal search string entered by user to reach this page.
// searchResults : optional.  Total numeric search results count.
function cmCreatePageviewTag(pageID, categoryID, lineNum, ps1var, ps2var, searchString, searchResults, referringURL, attributes,cmExtraFields) {
	if (pageID == null) { pageID = cmGetDefaultPageID(); }	
	var newCategoryID = categoryID;
    if (typeof(YAHOO)!="undefined"){
	    var ebCM = YAHOO.util.Dom.get("ebCM");
	    var thisPageID = '';
	    if (ebCM && (!YAHOO.ebauer.layerbox || YAHOO.ebauer.layerbox.getLayerboxState() == '')) {

		//pageID
		thisPageID = getCmPiAsCategoryPathFromDocument(ebCM);

		//ps2var
		if (thisPageID != '' && (ps2var == null || ps2var == '')) {
		    ps2var = thisPageID;
		}

		//categoryID
		newCategoryID = getNewCategoryID(categoryID,ebCM);
	    }
    }
    if (thisPageID == null || thisPageID == '') {
        thisPageID = pageID;
    }

    if (thisPageID == null || thisPageID == '') {
        thisPageID = cmGetDefaultPageID();
    }

	var cm = new _cm("tid", "1", "vn2", "e4.0");
	var pi = thisPageID;

	if (newCategoryID) {
		var cg = newCategoryID;
	}

	var li = lineNum;
	var ps1 = ps1var;
	var ps2 = ps2var;

	if (referringURL) {
		var rf = unescape(referringURL);
	} else {
		var rf = unescape(document.referrer);
	}
cmMakeTag(["tid","1","pi",pi,"cg",cg,"pc","Y","li",li,"ps1",ps1,"ps2",ps2,"rf",rf,"se",searchString,"sr",searchResults,"cmAttributes",attributes,"cmExtraFields",cmExtraFields]);
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

function cmCreateCategoryPageviewTag(categoryID, categoryName, pageNo) {
	var pageID = "CATEGORY: " + categoryName + " (" + categoryID + ")";
	if (pageNo) {
		if ((pageNo != "") && (pageNo != "1")) {
			pageID = pageID + " PG: " + pageNo;
		}
	}
	cmCreatePageviewTag(pageID,categoryID);
}

function cmCreateManualLinkClickTag2(pageID) {
	cmCreatePageviewTag(pageID);
}

/*
 * Creates a Productview Tag
 * Also creates a Pageview Tag by setting pc="Y"
 * Format of Page ID is "PRODUCT: <Product Name> (<Product ID>)"
 *
 * productID	: required. Product ID to set on this Productview tag
 * productName	: required. Product Name to set on this Productview tag
 * categoryID	: optional. Category ID to set on this Productview tag
 * searchString	: optional. Internal search string entered by user to reach
 *				  this Product Detail page. Only usable if pc="Y".
 * searchResults : optional.  Total numeric search results count. Only usable
 *				   if pc="Y".
 */
function cmCreateProductviewTag(productID, productName, categoryID, pa1var, lineNum, ps1var, ps2var, referringURL,searchString,searchResults,attributes,cm_vc) {
	if (referringURL) {
		var rf = unescape(referringURL);
	} else {
		var rf = unescape(document.referrer);
	}
	var pa1 = pa1var;
	var li = lineNum;
	var ps1 = ps1var;
	var ps2 = productName + " (" + productID + ")";
	cmMakeTag(["tid","5","pi",productName+" ("+productID+")","pr",productID,"pm",productName,"cg",categoryID,"se",searchString,"sr",searchResults,"pa1",pa1var,"li",lineNum,"ps1",ps1var,"ps2",ps2,"rf",rf,"pc","N","cm_vc",cm_vc?cm_vc:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
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
function cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, pa1var, categoryID, referringURL, attributes, cmExtraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
 productPrice = productPrice.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (cmExtraFields ? "extra" + cmExtraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",cmExtraFields,"ha1",cm_hex_sha1(hashValue),"cc",cm_currencyCode,"at","5","tid","4","pc","N","pa1",pa1var,"rf",referringURL]);
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
function cmCreateShopAction9Tag(productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, pa1var, categoryID, referringURL,attributes, cmExtraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
 productPrice = productPrice.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (cmExtraFields ? "extra" + cmExtraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",cmExtraFields,"ha1",cm_hex_sha1(hashValue),"cd",customerID,"on",orderID,"tr",orderTotal,"cc",cm_currencyCode,"at","9","tid","4","pc","N","pa1",pa1var,"rf",referringURL]);
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
function cmCreateOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP,attributes,cmExtraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    orderShipping = orderShipping.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");	
	cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cc",cm_currencyCode,"cmAttributes",attributes,"cmExtraFields",cmExtraFields]);
}

// Creates a Registration tag and/or a Newsletter tag
//
// customerID		: required for Registration. ID of Customer to register.
// customerEmail	: required for Newsletters. Optional for Registration.
// customerCity		: optional. City of Customer that placed this order
// customerState	: optional. State of Customer that placed this order
// customerZIP		: optional. Zipcode of Customer that placed this order
function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, newsletterName, subscribe, customerName,customerCountry,attributes) {
    cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cy",customerCountry,"nl",newsletterName,"sd",subscribe,"fn",customerName,"cmAttributes",attributes]);
}

/* Creates an Error Tag
 *
 */
function cmCreateErrorTag(pageID, categoryID) {
	cmMakeTag(["tid","404","pi",pageID,"cg",categoryID,"pc","Y"]);
}

// creates a custom tag
function cmCreateCustomTag(lineNumber, cmExtraFields) {
	cmMakeTag(["tid","7","li",lineNumber,"cmExtraFields",cmExtraFields]);
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
	
	var datestamp = new Date();	
	var stamp = (Math.floor(Math.random() * 11111111)) + datestamp.valueOf();	
	cm.rnd = stamp;
	
	if (cm.tid == "6") {
		cm.addTP();
		document.cookie = "cmTPSet=Y; path=/";
	}

	if (cm.tid == "1") {
		if (cI("cmTPSet") != 'Y') {
			cm.tid = "6";
			cm.pc = "Y";
			cm.addTP();
			document.cookie = "cmTPSet=Y; path=/";
		}
	}

	// for backwards compatibility with clients using cmCustom libraries and the old cm_exAttr variable.
	if (cm.cm_exAttr) {
		cm.cmAttributes = cm.cm_exAttr.join("-_-");
		cm.cm_exAttr=null;
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

	try{
	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
			if (cm.pc == "Y") {
				parent.cm_ref = document.URL;
			}
	}

	// if parent had mmc variables and this is the first pageview, add mmc to this url
	if (parent.cm_set_mmc) {
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
// IO V4 call
	if (typeof cm_ted_io == 'function') {
		cm_ted_io(cm);
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
		pageName = pageName + "default";
	}

	while (pageName.indexOf("/") == 0) {
		pageName = pageName.substr(1, pageName.length);
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
	return s.substring(middle + 1, end).split("#",1).join("");
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
		cmCreateRegistrationTag(rot13(emailAddress),rot13(emailAddress));							
	}
}

var rot13map;

function rot13init()
{
	var map = new Array();
	var s = "abcdefghijklmnopqrstuvwxyz";

	for (i = 0; i < s.length; i++)
		map[s.charAt(i)] = s.charAt((i + 13) % 26);
	for (i = 0; i < s.length; i++)
		map[s.charAt(i).toUpperCase()] = s.charAt((i + 13) % 26).toUpperCase();
	return map;
}

function rot13(a)
{
	if (!rot13map)
		rot13map = rot13init();
	s = "";
	for (i = 0; i < a.length; i++)
	{
		var b = a.charAt(i);

		s += (b >= 'A' && b <= 'Z' || b >= 'a' && b <= 'z' ? rot13map[b] : b);
	}
	return s;
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