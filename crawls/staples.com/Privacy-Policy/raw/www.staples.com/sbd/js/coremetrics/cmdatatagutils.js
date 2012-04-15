<!--
/*
 * cmdatatagutils.js
 * $Revision: 154376 $
 * $Id: cmdatatagutils-Master.txt 154376 2010-08-26 14:31:41Z wbird $
 * Coremetrics Tag v3.1, 2/28/2002
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 * Date			Modifier		Description
 * 23-Mar-2006	Hutch White		Modified cmCreateProductViewTag to inhibit
 *								PageViewTag creation by passing N as the 
 *								fourth parameter.
 * 21-Nov-2006	Eliot Towb		Added Flash Tagging functions:
 *								cmCreateManualImpressionTag
 *								cmCreateManualLinkClickTag
 *								cmCreateManualPageviewTag
 * 18-Jan-2007	Hutch White		Add Conversion Tag.  Add parentSKU,parentSKUcatID and
 *                              parentSKUflag to Shop 5 and Shop 9 tags
 * 12-Jun-2007	Hutch White		Add element tags and custom cmCreateRespondentTag
 * 20-Jun-2007  Hutch White		Add Normalization value
 * 31-Dec-2007	Hutch White		Remove Search Page Normalization
 * 02-Dec-2008	Eliot Towb		Updated to AdTarget
 * 25-Aug-2010	William Bird		added cmCheckCMEM() with unconditional call; added cmExtractParameter
 * 17-May-2011  Infosys   		Added code for Coremetrics removal Support track ST223
 */

// TAG GENERATING FUNCTIONS ---------------------------------------------------

if (cm_ClientID == "99999999") {
	cm_ClientID = "90028341";
}
else {
	cm_ClientID + "";
}
var cm_TrackLink = "A";
var cm_TrackImpressions = "";
var cm_JSFEnabled = false;

// Coremetrics removal Support track ST223 05/17/2011 
var cm_Production_HOST = "www.staples.com";  // or 1st party DCD

var cm_PartnerDataClientIDs = cm_ClientID;   // where 99999999 is the cm_ClientID value
if (typeof cmLoad == 'function') {
	cmLoad();
}

/*
 * Calling this function points tags to the production database
 */
function cmSetProduction(){
	cm_HOST = cm_Production_HOST + "/cm?";
}


var cmGomezKeynoteFlag = "0";


function cmCreatePageElementTag(elementID, elementCategory, pageID, pageCategoryID, elementLocation) {
	var cm=new _cm("tid", "15", "vn2", "e4.0");
	
	cm.eid=elementID;
	cm.ecat=elementCategory;
	cm.pflg=0;
	cm.pid=pageID;
	cm.pcat=pageCategoryID;
	cm.eloc=elementLocation;

	// Coremetrics removal Support track ST223 05/17/2011
	//cm.writeImg();
}

function cmCreateProductElementTag(elementID, elementCategory, productID, productCategoryID, elementLocation) {
	var cm=new _cm("tid", "15", "vn2", "e4.0");

	cm.eid=elementID;
	cm.ecat=elementCategory;
	cm.pflg=1;
	cm.pid=productID;	
	cm.pcat=productCategoryID;
	cm.eloc=elementLocation;
	// Coremetrics removal Support track ST223 05/17/2011
	//cm.writeImg();
}

function cmCreateConversionEventTag(eventID, actionType, categoryID, points) {
	var cm = new _cm("tid", "14", "vn2", "e4.0");
	cm.cid = eventID;
	cm.cat = actionType;
	cm.ccid = categoryID;
	cm.cpt = points;
	// Coremetrics removal Support track ST223 05/17/2011
	//cm.writeImg();
 }

function cmCreateManualImpressionTag(pageID, trackSP, trackRE) {
		var cm = new _cm("tid","9","vn2","e4.0");
		cm.pi = pageID;
		cm.cm_sp = trackSP;
		cm.cm_re = trackRE;
		cm.st = cm_ClientTS;
		// Coremetrics removal Support track ST223 05/17/2011
		//cm.writeImg();
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
	var cm = new _cm("tid","1","vn2","e4.0");
	cm.pi = pageID;
	cm.cg = categoryID;
	cm.ul = DestinationURL;
	cm.rf = ReferringURL;
	// Coremetrics removal Support track ST223 05/17/2011
	//cm.writeImg();
}


function cmIndexOfParameter (parameter) {
	return document.URL.indexOf(parameter);
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

function cmCheckCMEM() {
	if (cmIndexOfParameter("cm_em",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_em",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}
		cmSetProduction();
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
	if (cmIndexOfParameter("cm_lm",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_lm",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}
		cmSetProduction();
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
}

cmCheckCMEM();    // added 8/25/10

/*
 * Creates a Tech Props tag.
 * pageID		: required. Page ID to set on this Pageview tag
 */
function cmCreateTechPropsTag(pageID, categoryID) {
	if (!pageID) {
		pageID = getDefaultPageID();
	}
	var cm=new _cm("tid", "6", "vn2", "e3.1");
	cm.pc="Y";
	cm.pi = pageID;
	cm.cg = categoryID;
	// if available, override the referrer with the frameset referrer
	if (parent.cm_ref != null) {
		cm.rf = myNormalizeURL(parent.cm_ref, false);
		parent.cm_ref = document.URL;
	} else {
		cm.rf = myNormalizeURL(document.referrer);
	}
	cm.addTP();

	if (cmGomezKeynoteFlag == "0")
	{
		// Coremetrics removal Support track ST223 05/17/2011
		//cm.writeImg();
	}

}

/*
 * Creates a Pageview tag with the given Page ID
 *
 * pageID		: required. Page ID to set on this Pageview tag
 * searchString	: optional. Internal search string enterred by user to reach
 *				  this page.
 * categoryID	: optional. Category ID to set on this Pageview tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreatePageviewTag(pageID, searchString, categoryID, searchResults,respondentID) {
	if (pageID == null) {
		pageID = getDefaultPageID();
	}

	var cm = new _cm("tid", "1", "vn2", "e3.1");
	cm.pi = pageID;
	cm.se = searchString;
	cm.sr = searchResults
	cm.cg = categoryID;

	// if available, override the referrer with the frameset referrer
	if (parent.cm_ref != null) {
		cm.rf = myNormalizeURL(parent.cm_ref, false);
		parent.cm_ref = document.URL;
	} else {
		cm.rf = myNormalizeURL(document.referrer);
	}

	if (respondentID){
		cm.li="100003";
		cm.ps1=respondentID;
	}
	if (cmGomezKeynoteFlag == "0")
	{
		// Coremetrics removal Support track ST223 05/17/2011
		//cm.writeImg();
	}}

function cmGetPageViewTagSrc(pageID, categoryID){
	if (pageID) {
		var cm = new _cm("tid", "1", "vn2", "e3.1");
		
		cm.pi = pageID;
		
		if (categoryID) {
			cm.cg = categoryID;
		}
		
		cm.rf = myNormalizeURL(window.location.href, false);
 
		return cm.getImgSrc();
	} else {
		return "";
	}
}

/*
 * Creates a Pageview tag with the default value for Page ID. 
 * Format of Page ID is "x/y/z/MyPage.asp"
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateDefaultPageviewTag() {
	cmCreatePageviewTag(getDefaultPageID(), null, null);
}

/*
 * Creates a Productview Tag
 * Also creates a Pageview Tag by setting pc="Y"
 * Passing an "N" as the fourth parameter disables PageView Tag Generation
 * Format of Page ID is "PRODUCT: <Product Name> (<Product ID>)"
 *
 * productID	: required. Product ID to set on this Productview tag
 * productName	: required. Product Name to set on this Productview tag
 * categoryID	: optional. Category ID to set on this Productview tag 
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateProductviewTag(productID, productName, categoryID,createPageView) {
	var cm = new _cm("tid", "5", "vn2", "e3.1");

	if (productName == null) {
		productName = "";
	}

	// if available, override the referrer with the frameset referrer
	if (parent.cm_ref != null) {
		cm.rf = myNormalizeURL(parent.cm_ref, false);
		parent.cm_ref = document.URL;
	} else {
		cm.rf = myNormalizeURL(document.referrer);
	}

	cm.pr = productID;
	cm.pm = productName;
	cm.cg = categoryID;

	if (createPageView != "N") {
		cm.pc = "Y";
	} else {
		cm.pc = "N";
	}
	cm.pi = "SKU:" + productName + "(" + productID + "):Description";

	if (cmGomezKeynoteFlag == "0")
	{
		// Coremetrics removal Support track ST223 05/17/2011
		//cm.writeImg();
	}}

/*
 * Variables and Arrays to support Lineitem Aggregation
 */

var cmShopProducts = new Array();
var cmShopIds = new Array();
var cmShopCats = new Array();
var cmShopQtys = new Array();
var cmShopPrices = new Array();
var cmShopSKUs = new Array();
var cmShopCounter = 0;
var cmShopOrderIds = new Array();
var cmShopCustomerIds = new Array();
var cmShopOrderPrices = new Array();
var cmParentSKU = new Array();
var cmParentSKUcatID=new Array();
var cmParentSKUflag=new Array();

/* Internal, to support aggregation */
function cmGetProductIndex(id){
	var i =0;
	for (i=0; i<cmShopCounter; i++)
	{
		if (id==cmShopIds[i])
		{
			return i;
		}
	}
	return -1;
}

/*
 * Creates a Shop tag with Action 5 (Shopping Cart)
 *
 * productID	: required. Product ID to set on this Shop tag
 * quantity	: required. Quantity to set on this Shop tag
 * productPrice	: required. Price of one unit of this product
 * categoryID	: optional. Category to set on this Shop tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID,ParentSKU,ParentSKUcatID,ParentSKUflag) {
	var index = cmGetProductIndex(productID);
	if(index!=-1){
		var oldPrice = cmShopPrices[index];
		var oldQty = cmShopQtys[index];
		var newQty = oldQty + parseInt(productQuantity);
		var newPrice = (oldPrice*oldQty + parseInt(productQuantity)*parseFloat(productPrice))/(newQty);

		cmShopPrices[index] = newPrice;
		cmShopQtys[index] = newQty;
		cmParentSKU[index]=ParentSKU;
		cmParentSKUcatID[index]=ParentSKUcatID;
		cmParentSKUflag[index]=ParentSKUflag;				

	} else {
		if (!categoryID) {
			categoryID = "";
		}

		cmShopProducts[cmShopCounter] = productName;
		cmShopIds[cmShopCounter] = productID;
		cmShopCats[cmShopCounter] = categoryID;
		cmShopQtys[cmShopCounter] = parseInt(productQuantity);
		cmShopPrices[cmShopCounter] = parseFloat(productPrice);
		cmParentSKU[cmShopCounter]=ParentSKU;
		cmParentSKUcatID[cmShopCounter]=ParentSKUcatID;
		cmParentSKUflag[cmShopCounter]=ParentSKUflag;				
		cmShopCounter++;
	}
}

/* render the aggregated cart lineitems with Shop 5 tags*/
function cmDisplayShop5s(){
	var i;
	for(i=0; i<cmShopCounter;i++){
		var cm = new _cm("tid", "4", "vn2", "e3.1");
		cm.at = "5";
		cm.pr = cmShopIds[i]; 
		cm.pm = cmShopProducts[i];
		cm.cg = cmShopCats[i];
		cm.qt = cmShopQtys[i] ;
		cm.bp = cmShopPrices[i];
		cm.pc = "N";
		cm.rf = myNormalizeURL(document.referrer, false);
		cm.sx1=cmParentSKU[i];
		cm.sx2=cmParentSKUcatID[i];
		cm.sx3=cmParentSKUflag[i];				
		if (cmGomezKeynoteFlag == "0")
		{
			// Coremetrics removal Support track ST223 05/17/2011
			//cm.writeImg();
		}
	}
	cmShopCounter=0;
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
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateShopAction9Tag(productID, productName, productQuantity,
				productPrice, customerID, orderID,
				orderTotal, categoryID,ParentSKU,ParentSKUcatID,ParentSKUflag) {
	var index = cmGetProductIndex(productID);
	if(index!=-1){
		var oldPrice = cmShopPrices[index];
		var oldQty = cmShopQtys[index];
		var newQty = oldQty + parseInt(productQuantity);
		var newPrice = (oldPrice*oldQty + parseInt(productQuantity)*parseFloat(productPrice))/(newQty);

		cmShopPrices[index] = newPrice;
		cmShopQtys[index] = newQty;
		cmShopSKUs[index] = "|" + productID + "|" + newPrice + "|" + newQty + "|";
		cmParentSKU[index]=ParentSKU;
		cmParentSKUcatID[index]=ParentSKUcatID;
		cmParentSKUflag[index]=ParentSKUflag;	
	} else {
		if (!categoryID) {
			categoryID = "";
		}
		cmShopProducts[cmShopCounter] = productName;
		cmShopIds[cmShopCounter] = productID;			
		cmShopOrderIds[cmShopCounter] = orderID;
		cmShopOrderPrices[cmShopCounter] = orderTotal;
		cmShopCustomerIds[cmShopCounter] = customerID;
		cmShopCats[cmShopCounter] = categoryID;
		cmShopQtys[cmShopCounter] = parseInt(productQuantity);
		cmShopPrices[cmShopCounter] = parseFloat(productPrice);
		cmShopSKUs[cmShopCounter] = "|" + productID + "|" + productPrice + "|" + productQuantity + "|";
		cmParentSKU[cmShopCounter] = ParentSKU;
		cmParentSKUcatID[cmShopCounter] = ParentSKUcatID;
		cmParentSKUflag[cmShopCounter] = ParentSKUflag;				
		cmShopCounter++;
	}
}


/* render the aggregated order lineitems with Shop 9 tags*/
function cmDisplayShop9s(){
	var i;
	for(i=0; i<cmShopCounter;i++){
		var cm = new _cm("tid", "4", "vn2", "e3.1");
		cm.at = "9";
		cm.pr = cmShopIds[i]; 
		cm.pm = cmShopProducts[i];
		cm.cg = cmShopCats[i];
		cm.qt = cmShopQtys[i] ;
		cm.bp = cmShopPrices[i];
		cm.cd = cmShopCustomerIds[i];
		cm.on = cmShopOrderIds[i];
		cm.tr = cmShopOrderPrices[i];
		cm.pc = "N";
		cm.rf = myNormalizeURL(document.referrer, false);
		cm.sx1=cmParentSKU[i];
		cm.sx2=cmParentSKUcatID[i];
		cm.sx3=cmParentSKUflag[i];				
		
		if (cmGomezKeynoteFlag == "0")
		{
			// Coremetrics removal Support track ST223 05/17/2011
			//cm.writeImg();
		}	
	}
	cmShopCounter=0;
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
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateOrderTag(orderID, orderTotal, orderShipping, customerID, 
			  customerCity, customerState, customerZIP) {
	var cm = new _cm("tid", "3", "vn2", "e3.1");
	cm.on = orderID;
	cm.tr = orderTotal;
	cm.osk = getOSK();
	cm.sg = orderShipping;
	cm.cd = customerID;
	cm.sa = customerState;
	cm.ct = customerCity;
	cm.zp = customerZIP;		
	cm.rf = myNormalizeURL(document.referrer, false);
	if (cmGomezKeynoteFlag == "0")
	{
		// Coremetrics removal Support track ST223 05/17/2011
		//cm.writeImg();
	}
}

function getOSK() {
	var i =0;
	var result = "";
	for (i=0; i<cmShopCounter; i++)
	{
		result += cmShopSKUs[i];
	}
	return result;
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
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateRegistrationTag(customerID, customerEmail, customerCity,
				customerState, customerZIP, customerNum, customerType, zone, newsletterName, 
				subscribe) {
	var cm = new _cm("tid", "2", "vn2", "e3.1");
	cm.cd = customerID;
	cm.em = customerEmail;
	cm.sa = customerState;
	cm.ct = customerCity;
	cm.zp = customerZIP;
	cm.rg1 = customerNum;
	cm.rg2 = customerType;
	cm.rg3 = zone;

	if (newsletterName && subscribe) {
		cm.nl = newsletterName;
		cm.sd = subscribe;
	}
	
	if (cmGomezKeynoteFlag == "0")
	{
		// Coremetrics removal Support track ST223 05/17/2011
		//cm.writeImg();
	}
}

/* Creates an Error Tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateErrorTag(pageID) {
	var cm=new _cm("tid", "404", "vn2", "e3.1");  //DO NOT CHANGE THESE PARAMETERS
	
	// get the referrer from the frameset
	if (parent.cm_ref != null) {
		cm.rf = myNormalizeURL(parent.cm_ref, false);
		parent.cm_ref = document.URL;
	} else {
		cm.rf = myNormalizeURL(document.referrer);
	}

	cm.pc = "Y";
	if(pageID) {
		cm.pi = pageID;
	} else {
		cm.pi = getDefaultPageID();
	}
	if (cmGomezKeynoteFlag == "0")
	{
		// Coremetrics removal Support track ST223 05/17/2011
		//cm.writeImg();
	}
}

/* Creates Custom User Error Tag
 *
 * pageID:  	ID for the page where the Error Tag was thrown
 * errorMsg: 	Message displayed to user
 *
 */
function cmCreateUserErrorTag(pageID, errorMsg) {

	var cm = new _cm("tid", "7", "vn2", "e3.1");
	cm.li = "1";
	cm.ps1 = pageID;
	cm.ps2 = errorMsg;
	if (cmGomezKeynoteFlag == "0")
	{
		// Coremetrics removal Support track ST223 05/17/2011
		//cm.writeImg();
	}

}

/* Creates Custom Narrow By Filter tag
 *
 * pageID:  	ID for the page where the Error Tag was thrown
 * errorMsg: 	filters applied to page
 *
 */
function cmCreateNarrowByFilterTag(pageID, filterString) {

	var cm = new _cm("tid", "7", "vn2", "e3.1");
	cm.li = "2";
	cm.ps1 = pageID; 
	cm.ps2 = filterString;
	if (cmGomezKeynoteFlag == "0")
	{
		// Coremetrics removal Support track ST223 05/17/2011
		//cm.writeImg();
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
function getDefaultPageID() { 
	var pageName = window.location.pathname; 
	var stapPrefix = "webapp/wcs/stores/servlet/"

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
		pageName = pageName + "index.html"; /****************** SET TO DEFAULT DOC NAME */
	}

	while (pageName.indexOf("/") == 0) {
		pageName = pageName.substr(1,pageName.length);
	}

	var tempIndex4 = pageName.indexOf(stapPrefix);
	if(tempIndex4 != -1) {
		pageName = pageName.substr(stapPrefix.length);	
	}

	return(pageName); 
} 

if (defaultNormalize == null) { var defaultNormalize = null; }

/* This normalization function takes a list of parameters and parses out
   all url parameters that ARE in that list.  This only handles the simple case of 
   basic url parameters in the query string.  */
function myNormalizeURL(url, isHref) {
    var newURL = url;
	var pageURL=document.URL;

		if ((pageURL.toLowerCase().indexOf("/orderconf")>-1 || pageURL.toLowerCase().indexOf("/orderhistory")>-1 || pageURL.toLowerCase().indexOf("/staplesorderhistorylist")>-1 || pageURL.toLowerCase().indexOf("/staplescheckoutflow")>-1 || pageURL.toLowerCase().indexOf("/yourorder")>-1) && (newURL.toLowerCase().indexOf("/staplesproductdisplay")>-1 ||newURL.toLowerCase().indexOf("/staplesdeletefromcart")>-1 || newURL.toLowerCase().indexOf("/staplesmyorderdetail")>-1 || newURL.toLowerCase().indexOf("/staplesezreorderdetail")>-1) && isHref) {

			var whiteList = ["cm_re=", "cm_re_o=", "cm_sp=", "cm_sp_o=","cm_mmc=","cm_mmc_o="];
			var paramString;
			var paramIndex = newURL.indexOf("?");
			var params;
			var keepParams = new Array();
			
			if (paramIndex > 0) {
				paramString = newURL.substring(paramIndex+1);
				newURL = newURL.substring(0, paramIndex);
				params = paramString.split("&");
				for(var i=0; i<params.length; i++) {
					for(var j=0; j<whiteList.length; j++) {
						if (params[i].toLowerCase().indexOf(whiteList[j].toLowerCase()) == 0) {
							keepParams[keepParams.length] = params[i];
						}
					}
				}
			}
			newURL += "?" + keepParams.join("&");
		}
		else{
			var jsString = "javascript:jsSubmitLink(";
			var jsIndex = newURL.indexOf(jsString);
			if(jsIndex == 0) {
			newURL = newURL.substring(jsIndex+jsString.length+1, newURL.length-2);
			}
			
			var blackList = ["ts=", "krypto=","grb="];
			var paramString;
			var paramIndex = newURL.indexOf("?");
			var params;
			var keepParams = new Array();
			var goodParam;

			if (paramIndex > 0) {
				paramString = newURL.substring(paramIndex+1);
				newURL = newURL.substring(0, paramIndex);
				params = paramString.split("&");

				for(var i=0; i<params.length; i++) {
					goodParam = true;
					for(var j=0; j<blackList.length; j++) {
						if (params[i].indexOf(blackList[j]) == 0) {
							goodParam = false;
						}
					}
					if(goodParam == true) {
						keepParams[keepParams.length] = params[i];
					}
				}
				
				newURL += "?" + keepParams.join("&");

			}	
		}	

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