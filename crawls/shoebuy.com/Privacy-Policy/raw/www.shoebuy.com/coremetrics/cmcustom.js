/*
 * cmcustom.js 
 * $Id: cmcustom-IAC-shoebuy-versionC.txt 161061 2010-12-01 20:05:44Z abrink $
 * $Rev: 161061 $
 *
 * Version 4.1.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 * 11/22/10 ABRINK Convert to hosted libraries
 */

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
function cmCreateProductviewTag(productID, productName, categoryID, abTest) {
	if (abTest){
		pageID = "PRODUCT"+abTest+":" + productName + " (" + productID + ")";
	}
	else
	{
		pageID = "PRODUCT: " + productName + " (" + productID + ")";
	}
	cmMakeTag(["tid","5","pi",pageID,"pr",productID,"pm",productName,"cg",categoryID,"pc","Y","cm_vc",cmExtractParameter("cm_vc",document.location.href)]);
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
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl", newsletterName,"sd", subscribe]);
}
