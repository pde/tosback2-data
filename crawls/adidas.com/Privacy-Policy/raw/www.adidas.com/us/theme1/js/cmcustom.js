/*
 * cmdatatagutils.js 
 * $Id: $
 * $Revision: 144380 $
 *
 * Version 4.1.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 *==========
 *Amendments
 *==========
 * 2010-04-20	A STOCKTON	10016532 - Added var cm_UseUTF8=true
 * 2010-10-04	A BRINK		10036234 - Configure for new test database
 * 2010-10-19	A BRINK		10039835 - Move to hosted; move custom functions/parameter order to cmcustom
 */
 
 var cm_UseUTF8=true;

 function cmSetCurrencyCode(currencyCode) { cm_currencyCode = currencyCode;}


/*
 * Creates a Pageview Tag; pc="Y"
 */
function cmCreateProductviewTag(productID, productName, categoryID,attributes) {
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","5","pi","PRODUCT: "+productName+" ("+productID+")","pr",productID,"pm",productName,"cg",categoryID,"pc","Y","cm_vc",cmExtractParameter("cm_vc",document.location.href),"cm_exAttr",cm_exAttr]);
}


/*
	Amendment 1  - added "currency" to list of parameters; added '"cc",currency' to values passed to addshop
*/
function cmCreateShopAction5Tag(productID,productName,productQuantity,productPrice,categoryID,currency,attributes) { 
	var pattern = /[^\-0-9\.]/gi;
    productPrice = productPrice.toString().replace(pattern, "");
	var cm_slotNum;
	if (attributes){
		__ex=attributes.split("-_-");
	} else {
	__ex=new Array();
	}	

	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cc",currency,"cm_exAttr",__ex,"ha1",attributes ? cm_hex_sha1(attributes) : null,"at","5","tid","4","pc","N"]); 
}

/*
	Amendment 1  - added "currency" to list of parameters; added '"cc",currency' to values passed to addshop
*/
function cmCreateShopAction9Tag(productID,productName,productQuantity,productPrice,customerID,orderID,orderTotal,categoryID,currency,attributes) { 
	var cm_slotNum;
	var pattern = /[^\-0-9\.]/gi;
	var pattern1 = /^\s+|\s+$/gi;
    productPrice = productPrice.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	productID = productID.toString().replace(pattern1, "");
	if (attributes){
		__ex=attributes.split("-_-");
	} else {
	__ex=new Array();
	}
	
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cc",currency,"cm_exAttr",__ex,"ha1",attributes ? cm_hex_sha1(attributes) : null,"cd",customerID,"on",orderID,"tr",orderTotal,"at","9","tid","4","pc","N"]);
	cmCalcSKUString();
}

/*
	Amendment 1  - added "currency" to list of parameters; added '"cc",currency' to values passed to maketag
*/
function cmCreateOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP,currency,attributes) { 
	var pattern = /[^\-0-9\.]/gi;
    orderShipping = orderShipping.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}	
	cmMakeTag(["tid","3","osk",__skuString,"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cc",currency,"cm_exAttr",cm_exAttr]);
	__skuString = "";
}

function myNormalizeURL(url, isHref) {

    var newURL = url;
    
    if (isHref) {
	    //var blackList = ["param1=", "param2=", "param3=", "param4="];
		var blackList = ["jsessionid="];
	    
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
			//This match is case insensitive.  Remove .toLowerCase() to add case sensitivity
				if (params[i].toLowerCase().indexOf(blackList[j].toLowerCase()) == 0) {
					goodParam = false;
				}
			}
			if(goodParam == true) {
				keepParams[keepParams.length] = params[i];
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

