/*
 * cmcustom.js
 * $Id: cmcustom - MASTER.txt 100000 2011-03-15 hwhite $
 * $Revision: 100000 $
 *
 * Version 4.2.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 * Date		Imp Eng		Desc
 * 03/15/11	Hutch White	convert to hosted, extraFields removed until html tags are revised
 * 
 */

var cm_TrackImpressions = "";

function cmStripIllegals(s){
	if (typeof(s)=="undefined" || !s){return null;}
	s = s.replace('\xAE', '').replace('\xA9', '').replace('\xF4', ''); //use hexadecimal index for special characters.
	var amparray = s.split(/&[^;]*;/);
    	s = amparray.join("");  
 	var retStr="";
	var bad="\t\r\n\"'$&*^,%";
    	for (var i=0;i<s.length;i++){
       	   var c=s.charAt(i);
	   if (bad.indexOf(c)<0)
		retStr+=c;
    }
    return retStr;  
}

function cmCreateForeseeTag(respondentID, surveyName) {
        cmMakeTag(["tid","7","li","100003","ps1",respondentID,"ps2",surveyName]);
}

function cmCreateCustomTag(lineNumber,pageID, productID, productName, productQuantity, categoryID, activityType,ctlgCde) {
    cmMakeTag(["tid","7","li",lineNumber,"pi",pageID,"ps1",productID,"ps2",cmStripIllegals(productName),"ps3",productQuantity,"ps6",cmStripIllegals(categoryID),"ps8",activityType,"ps9",pageID,"ps10",cmStripIllegals(ctlgCde)]);
}	  

function cmCreateManualPageviewTag(pageID, categoryID,DestinationURL,ReferringURL,searchString,searchResults,attributes,extraFields) {
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"ul",DestinationURL,"rf",ReferringURL,"se",searchString,"sr",searchResults,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreatePageviewTag(pageID, searchString, categoryID, numSearchResults, respondentID,attributes) {
	cmMakeTag(["tid","1","pi",cmStripIllegals(pageID),"cg",cmStripIllegals(categoryID),"se",cmStripIllegals(searchString),"sr",numSearchResults,"pv1",respondentID,"cmAttributes",attributes]);
}

function cmCreateProductviewTag(productID, productName, categoryID, index, attributes, cm_vc) {
	cmMakeTag(["tid","5","pi","PRODUCT: "+productName+" ("+productID+")","pr",productID,"pm",cmStripIllegals(productName),"cg",cmStripIllegals(categoryID),"pc","N","cm_vc",cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}

function cmCreateShopAction5Tag(productID,productName,productQuantity,productPrice,categoryID, backOrdered,attributes) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
	productPrice = productPrice.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var extraFields;
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"ha1",cm_hex_sha1(hashValue),"cc",cm_currencyCode,"at","5","tid","4","pc","N","sx2", backOrdered]);
}

function cmCreateShopAction9Tag(productID,productName,productQuantity,productPrice,customerID,orderID,orderTotal,categoryID, backOrdered,attributes) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
	productPrice = productPrice.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var extraFields;
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"ha1",cm_hex_sha1(hashValue),"cd",customerID,"on",orderID,"tr",orderTotal,"cc",cm_currencyCode,"at","9","tid","4","pc","N","sx1", backOrdered]);
}

function cmCreateOrderTag(orderID, orderTotal, orderShipping, customerID,customerCity, customerState, customerZIP, orderCoupon, orderTax, shippingDescription, customerCountry, attributes) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
	orderShipping = orderShipping.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");	
	cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"or1",orderCoupon,"or2",orderTax,"or3",shippingDescription,"cy",customerCountry,"cc",cm_currencyCode,"cmAttributes",attributes]);
}

function cmCreateRegistrationTag(customerID, customerEmail, customerCity,customerState, customerZIP, attributes, customerCountry) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cy",customerCountry,"cmAttributes",attributes]);
}

function cmCreateNewsletterTag(customerEmail,newsletterName,subscriptionFlag, customerCity, customerState, customerZIP,gender, customerID,attributes) {
cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl",newsletterName,"sd",subscriptionFlag,"gd",gender,"cmAttributes",attributes]);
}

