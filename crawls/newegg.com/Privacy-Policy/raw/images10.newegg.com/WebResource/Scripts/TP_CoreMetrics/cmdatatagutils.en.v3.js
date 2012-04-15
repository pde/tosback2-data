/*
 * cmdatatagutils.js 
 * $Id: cmcustom-10068177-90172959-032211.txt 167139 2011-03-24 17:22:55Z whbird $
 * $Revision: 167139 $
 *
 * Version 4.1.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 * ----------------------------------------------------------------
 * 03/22/10	WBird		Converted to hosted libs + cmcustom
 */
 
// Set MMC cookie for use by order tags.  Store MMC values from URL in a 30-day cookie.
var MMCValue = cmExtractParameter("cm_mmc",window.location.href);
if (MMCValue) {
	var expDate = new Date();
	expDate.setTime(expDate.getTime() + 2592000000);
	document.cookie = "cm_mmc_ck="+MMCValue+"; domain=newegg.com; path=/; expires="+expDate.toGMTString();
}
  
/* TAG GENERATING FUNCTIONS */

function cmCreatePageviewTag(pageID, categoryID, searchString, searchResults, serverName, attributes, extraFields) {
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"se",searchString,"sr",searchResults,"pv1",serverName,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreateProductviewTag(productID, productName, categoryID, serverName, attributes, cm_vc) {
	cmMakeTag(["tid","5","pi",c1(cm_ClientID) ? c1(cm_ClientID) : "Product: " + productName + " (" + productID + ")","pr",productID,"pm",productName,"cg",categoryID,"pv1",serverName,"pc","Y","cm_vc",cm_vc?cm_vc:cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}

function cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID,manufactureName,extraField,attributes,extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    productPrice = productPrice.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"sx1",manufactureName,"sx2",extraField,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cc",cm_currencyCode,"at","5","tid","4","pc","N"]);
}

function cmCreateShopAction9Tag(productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID,manufactureName,extraField,attributes,extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    productPrice = productPrice.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"sx1",manufactureName,"sx2",extraField,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cd",customerID,"on",orderID,"tr",orderTotal,"cc",cm_currencyCode,"at","9","tid","4","pc","N"]);
}

function cmCreateOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP,paymentType,shippingMethod,attributes,extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
    orderShipping = orderShipping.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");	
	var mmcValue = cI("cm_mmc_ck");
	if (mmcValue) {
		var mmcArray = mmcValue.split("-_-");
		cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cc",cm_currencyCode,"cmAttributes",attributes,"cmExtraFields",extraFields,"or1",paymentType,"or2",shippingMethod,"or3",mmcArray[0],"or4",mmcArray[1],"or5",mmcArray[2],"or6",mmcArray[3]]);
	}
	else {
		cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cc",cm_currencyCode,"cmAttributes",attributes,"cmExtraFields",extraFields,"or1",paymentType,"or2",shippingMethod]);
	}
}

function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, newsletterName, subscribe, attributes, customerCountry) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl",newsletterName,"sd",subscribe,"cy",customerCountry,"cmAttributes",attributes]);
}

if(cm_production_on){cmSetClientID("90172959",false,"cm.newegg.com","newegg.com");}else{cmSetClientID("60172959",false,"testdata.coremetrics.com","newegg.com");};