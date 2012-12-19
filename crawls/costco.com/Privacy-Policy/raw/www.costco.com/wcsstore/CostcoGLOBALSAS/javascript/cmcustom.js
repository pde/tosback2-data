/*
 * cmcustom.js 
 * $Id: cmcustom-MASTER.txt 124620 2009-07-17 17:44:54Z croberts $
 * $Revision: 124620 $
 *
 * Version 4.1.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 *Date          IE            Desc
 *07/16/09		HWHITE		  Update libraries to maketag
 *07/17/2009		CRoberts	  Set track impressions to ""
 *							  Per conversation with Hutch.
 *09/03/09		HWHITE		  Convert to multiclient.  Set client id per whse= argument in querystring
 *10/01/09		HWHITE		  Add cmSetClientID code.  Remove client id variable code.  Client will set information using cmSetClientID function
 *11/04/09		HWHITE		  Add cmvc parameter to productview tag
 *01/27/2010	HWHITE		  Correct issue with automatic productview in shop 5 tag function
 *10/26/2011	HWHITE		  Convert to cmcustom.js for WSC fep 2
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 */

var cm_exAttr=new Array();  
var cm_TrackLink = "A";
var cm_TrackImpressions = "";
var cm_JSFEnabled = false;
var cm_tempHost;
var cm_PartnerDateClientIDs;
var cm_Production_HOST;
var cm_PCAT;
var cmCheckCMEMFlag = true;
var cmSendOSLinkClickTag = true;
var cmAutoCopyAttributesToExtraFields = false;

function cmCreatePageviewTag(pageID,categoryID,searchString,searchResults, store_id, attributes, extraFields) {
	if (pageID == null) { pageID = cmGetDefaultPageID(); }
	
	// still checking to make sure it isn't null incase default pageID is null
	if ((pageID != null && pageID.indexOf("BV^", 0) == 0) || (searchString != null && searchString.indexOf("Bazaarvoice^") == 0)) 
	{
		// Detect if BV tag call (pageID will start with BV^) and if so, compensate for difference in
		// expected parameters by setting categoryID to value passed in searchString and then emptying
		// search string
		categoryID = searchString;
		searchString = null;
	}
	
	cm_PCAT=categoryID;
	if (!cI("cmVCSet") && cmExtractParameter("cm_vc",document.location.href)) {
		document.cookie = "cmVCSet="+cmExtractParameter("cm_vc",document.location.href)+"; path=/";
	}
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"se",searchString,"sr",searchResults,"pc","Y","pv11",store_id,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreateProductviewTag(pageID,productID,productName,categoryID,store_id,pageCount,masterItemCategory,itemNumber,catIDoverride,attributes,cm_vc) {
	if (catIDoverride)	{
		if (catIDoverride != "0") {				// allows client to override WSC auto-catID value if catIDoverride is not null or "0"
			categoryID = catIDoverride;
		}
	}
	
	if (itemNumber != null && itemNumber != "")
	{
		productID=itemNumber;
	}
	if ((pageCount == null) || pageCount == "") {
		pageCount = 'Y';
	}
	if ((pageID == null) || (pageID == "") || (pageCount == "N")) {
		pageID = cG7.cM0[cm_ClientID];
	}
	var groupFlag;
	if (cI("cmEMAILFlag") =="Y") {
		groupFlag=true;
		document.cookie = "cmEMAILFlag='N'; path=/";
	}
	if (( cmExtractParameter("cm_mmc",document.location.href) 
		  && 
		  cmExtractParameter("cm_mmc",document.location.href).toUpperCase().indexOf("EMAIL")>-1) 
		|| 
		groupFlag==true){
		document.cookie = "cmEMAILSet="+productID+"; path=/";
		if (!cm_exAttr){
			var cm_exAttr=new Array();
			cm_exAttr[0]="EMAIL";
		} else {
			cm_exAttr[0]="EMAIL";
		}
	}
	if (cmExtractParameter("cm_mmc",document.location.href) && cmExtractParameter("cm_mmc",document.location.href).toUpperCase().indexOf("DIGBY")>-1) {
		if (!cm_exAttr){
			var cm_exAttr=new Array();
			cm_exAttr[0]="DIGBY";
		} else {
			cm_exAttr[0]="DIGBY";
		}
	}

	if (!cm_vc)	{
		cmvc=categoryID;
	}
	cm_PCAT=categoryID;
	cmMakeTag(["tid","5","pi",pageID,"pr",productID,"pm",productName,"cg",categoryID,"pc",pageCount,"pv11",store_id,"cm_vc",cm_vc ? cm_vc : cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}
function cmCreateShopAction5Tag(__pr,__pm,__qt,__bp,__cg,store_id,currency,masterItemCategory,itemNumber,productName,catIDoverride,attributes,extraFields) {
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	//we need to be able to identify category pages or group pages here so we can determine if the email sent them to a group page instead of a single product detail page
	__pr = itemNumber;
	//var productName = __pm;
	var categoryID = __cg;
	var productQuantity = __qt;
	if (window.location.href.toUpperCase().indexOf("CATEGORY.ASPX")>-1 || window.location.href.toUpperCase().indexOf("PRODUCTGROUP.ASPX") >-1 || window.location.href.toUpperCase().indexOf("PRODUCTSET.ASPX")>-1)	{
		if (cmExtractParameter("cm_mmc",document.location.href) && cmExtractParameter("cm_mmc",document.location.href).toUpperCase().indexOf("EMAIL")>-1){
			document.cookie = "cmEMAILSet="+itemNumber+"; path=/";
			var cm_exAttr= new Array();
			if (attributes){cm_exAttr=attributes.split("-_-");}
			cm_exAttr[0]="EMAIL";
			attributes=cm_exAttr.join("-_-");
            cmAddShop(["pr",__pr,"pm",productName,"qt",__qt,"bp",__bp,"cg",__cg,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"at","5","tid","4","pc","N","sx11",store_id,"cc",currency,"cmAttributes",attributes,"cmExtraFields",extraFields]);
		}
		else {
			cmMakeTag(["tid","5","pi","PRODUCT: "+productName+" ("+itemNumber+")","pr",itemNumber,"pm",productName,"cg",categoryID,"pc","N","cm_vc",cm_PCAT]);

	        cmAddShop(["pr",__pr,"pm",productName,"qt",__qt,"bp",__bp,"cg",__cg,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"at","5","tid","4","pc","N","sx11",store_id,"cc",currency,"cmAttributes",attributes,"cmExtraFields",extraFields]);
		}
	}

	var pattern = /[^\-0-9\.]/gi;
	productPrice = __bp.toString().replace(pattern, "");
	var cm_slotNum;
	if (attributes){
		__ex=attributes.split("-_-");
	} else {
	__ex=new Array();
	}
	if (cmExtractParameter("cm_mmc",document.location.href) && cmExtractParameter("cm_mmc",document.location.href).toUpperCase().indexOf("DIGBY")>-1) {
		__ex[0]="DIGBY";
	}	
	if (cI("cmEMAILSet") ==itemNumber) {
		__ex[0]="EMAIL";
	}	
	cmAddShop(["pr",itemNumber,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"ha1",attributes ? cm_hex_sha1(attributes) : null,"at","5","tid","4","pc","N","cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreateShopAction9Tag(productID,productName,productQuantity,productPrice,customerID,orderID,orderTotal,categoryID,attributes,extraFields, extraFields2, extraFields3, extraFields4, itemNumber, productNameOverride) {
	customerID = cmShopperId;
	var cm_slotNum;
	productName = productNameOverride;
	console.log("extraFields: " + extraFields);
	var pattern = /[^\-0-9\.]/gi;
	var pattern1 = /^\s+|\s+$/gi;
	productPrice = productPrice.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	productID = itemNumber.toString().replace(pattern1, "");
	if (attributes){
		__ex=attributes.split("-_-");
	} else {
	__ex=new Array();
	}
	if (cI("cmEMAILSet") ==productID) {
		__ex[0]="EMAIL";
	}
	if (cmExtractParameter("cm_mmc",document.location.href) && cmExtractParameter("cm_mmc",document.location.href).toUpperCase().indexOf("DIGBY")>-1) {
		__ex[0]="DIGBY";
	}	   
    attributes=__ex.join("-_-");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"ha1",attributes ? cm_hex_sha1(attributes) : null,"cd",customerID,"on",orderID,"tr",orderTotal,"at","9","tid","4","pc","N","cmAttributes",attributes,"cmExtraFields",extraFields]);
	cmCalcSKUString();
}

function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, customerCountry, attributes, extraparm1, extraparm2, extraparm3, extraparm4, extraparm5, extraparm6, extraparm7, extraparm8, extraparm9, extraparm10, shopperId) {
	if (shopperId != null) {
		customerID = shopperId ;
	} 
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cy",customerCountry,"cmAttributes",attributes]);
}

function cmCreateOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP,attributes,extraFields, extraFields1, extraFields2, extraFields3) {
	customerID = cmShopperId;
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    orderShipping = orderShipping.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");	
	cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cc",cm_currencyCode,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}
