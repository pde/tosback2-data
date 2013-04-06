/*
 * cmcustom.js
 * $Id: cmcustom-10332964-90040260-032913.txt 215591 2013-04-01 14:47:19Z whbird $
 * $Revision: 215591 $
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions override those defined in the Coremetrics-hosted eluminate.js
 *
 * Date			Modifier			Description
 * 20-Oct-2010	Josh Bowser		Initial version of cmcustom.js. Customizations based off of previously provided 12-Jul-2010 version of cmdatatagutils.js
 * 20130218     SWEHRUNG		removed function cM to allow new link click functonality
 * 20130312			ispkke - I copied the cmAddShop() method from eluminate and modified to use order number when calculating Shop9 tags to throw
 * 20130329	SWEHRUNG		Added cm_IOEnabled statement to make IO work with the test ID
 */

var cm_IOEnabled = true;
var cm_TrackImpressions = "";
var cmCheckCMEMFlag = false;

/*
 * This function checks the URL for the argument cm_ref or cmrf in the query string.
 * If it exists, the referring url is parsed out and returned in the function.
 */
var cm_Referrer;
function ParseRef (url) {
	var newURL=url;
	if (newURL.toLowerCase().indexOf("cm_ref=")>0 || newURL.toLowerCase().indexOf("cmrf")>0){
		var paramString;
		var params;
		var goodParam;
		var keepParams = new Array();
		var paramIndex = newURL.indexOf("?");
		if (paramIndex > 0) {
			paramString = newURL.substring(paramIndex+1);
			params = paramString.split("&");
			for(var i=0; i<params.length; i++) {
				if (params[i].toLowerCase().indexOf("cm_ref")>-1) {
					goodParam = unescape(params[i]);
					if (goodParam.toLowerCase().indexOf("cm_ref=")>-1){
						goodParam=goodParam.substring(goodParam.toLowerCase().indexOf("cm_ref=")+7);
					}
				}
			}	
		}
	}
	return goodParam;
}

function cmCreateProductviewTag(productID, productName, categoryID, soldoutInc, __vc, __br, __onair, searchString, searchResults, attributes) {
	/*  Added soldOutInc so we can deploy this since the old cmdatatagutils had this parm in the method */
	/*  This arg should be removed and changes made to bean and jsps  */

	attributes=__vc+"-_-"+__br+"-_-"+__onair+"-_-"+attributes;
	if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","5","pi","PRODUCT: "+productName+" ("+productID+")","pr",productID,"pm",productName,"cg",categoryID,"se",searchString,"sr",searchResults,"pc","Y","pr1",__vc,"pr2",__br,"pr3",__onair,"li","3","ps1",productID,"ps2","PRODUCT: "+productName+" ("+productID+")","ps3",productName,"ps4",categoryID,"ps5",__vc,"ps6",__br,"ps7",__onair,"cm_exAttr",cm_exAttr]);
}

function cmCreateShopAction5Tag(productID,productName,productQuantity,productPrice,categoryID,__vc,__br,__onair,attributes,extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
	attributes=__vc+"-_-"+__br+"-_-"+__onair+"-_-"+attributes;
	productPrice = productPrice.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cc",cm_currencyCode,"at","5","tid","4","pc","N","sx1",__vc,"sx2",__br,"sx3",__onair]);
}

function cmCreateShopAction9Tag(productID,productName,productQuantity,productPrice,customerID,orderID,orderTotal,categoryID,__vc,__br,__onair,attributes,extraFields) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
	attributes=__vc+"-_-"+__br+"-_-"+__onair+"-_-"+attributes;
	productPrice = productPrice.toString().replace(cmPricePattern, "");
	orderTotal = orderTotal.toString().replace(cmPricePattern, "");
	productID = productID.toString().replace(cmSpacePattern, "");
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"cd",customerID,"on",orderID,"tr",orderTotal,"cc",cm_currencyCode,"at","9","tid","4","pc","N","sx1",__vc,"sx2",__br,"sx3",__onair]);
}


function cmCreateRegistrationTag(customerID,customerEmail,customerCity,customerState,customerZIP,newsletter,subscribed,attributes) {
 	if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl",newsletter,"sd",subscribed,"cm_exAttr",cm_exAttr]);
}


function cmAddShop(d) {
    var e = d.concat();
    /**  QVC added d[19] to the following line of code so that the order number (d[19]) is used in
    		 determining what constitutes a unique product for a shop9 tag.  Only do this for shop9 tags  **/
    if (d[19] == 5) {
    	var a = __sRefArray[d[1] + "|" + d[9] + "|" + d[11] + "|" + d[13]];
    } else {
    	var a = __sRefArray[d[1] + "|" + d[9] + "|" + d[11] + "|" + d[13] + "|" + d[19]];
    }
    
    if (typeof (a) !== "undefined") {
        var i = __sArray[a];
        if (i) {
            var f = i[5];
            var h = i[7];
            var b = d[5];
            d[5] = parseInt(f) + parseInt(d[5]);
            d[7] = (((d[7] * b) + (h * f)) / d[5]);
            __sArray[a] = d
        }
    } else {
        /**  QVC added d[19] to the following line of code so that the order number (d[19]) is used in
    		 determining what constitutes a unique product for a shop9 tag.  Only do this for shop9 tags  **/
    		 if (d[19] == 5) {
    		 	__sRefArray[d[1] + "|" + d[9] + "|" + d[11] + "|" + d[13]] = __sArray.length;
    		 } else {
    		 	__sRefArray[d[1] + "|" + d[9] + "|" + d[11] + "|" + d[13] + "|" + d[19]] = __sArray.length;
    		 }
        
        __sArray[__sArray.length] = d
    }
    var g = __sRefSkuArray[e[1]];
    if (typeof (g) !== "undefined") {
        var c = __sSkuArray[g];
        if (c) {
            var f = c[5];
            var h = c[7];
            var b = e[5];
            e[5] = parseInt(f) + parseInt(e[5]);
            e[7] = (((e[7] * b) + (h * f)) / e[5]);
            __sSkuArray[g] = e
        }
    } else {
        __sRefSkuArray[e[1]] = __sSkuArray.length;
        __sSkuArray[__sSkuArray.length] = e
    }
}


function myNormalizeURL(url, isHref) { 
	var newURL = url; 
	var jsOne = newURL.indexOf("javascript:goTo(%");
	var jsTwo = newURL.indexOf("javascript:navigateLink(");
	var jsThree = newURL.indexOf("javascript:open_video_hp(");
	if (jsOne >= 0)
	{	 
		newURL = newURL.split("javascript:goTo(%").join("/");
		var lastComma = newURL.lastIndexOf(",");
		var subURL = newURL.substr(lastComma, newURL.length);
		subURL = subURL.split(",").join("www.qvc.com?cm_re=").split("'").join("").split("%20").join("");
		newURL = subURL;
	}
	if (jsTwo >= 0)
	{	 
		newURL = newURL.split("javascript:navigateLink(").join("");
		var indexParam = newURL.indexOf("&cm_");
		var endStr = newURL.substr(indexParam + 1, newURL.length);
		var ampParam = endStr.indexOf("&");
		var commaParam = endStr.indexOf(",");
		var cmParam;
		if (ampParam >= 0)
		{
			cmParam = endStr.substr(0, ampParam - 1);
		}
		if (commaParam >= 0)
		{
			cmParam = endStr.substr(0, commaParam - 1);
		}
		newURL = cmParam.split("cm_").join("www.qvc.com?cm_");
	}
	if (jsThree >= 0)
	{
		newURL = newURL.split("javascript:open_video_hp(").join("").split(");");
	}
	var pageURL=document.URL;
	if (isHref) {
		if ((pageURL.toLowerCase().indexOf("shoppingcart")>-1 || pageURL.toLowerCase().indexOf("cs_order_history")>-1 || pageURL.toLowerCase().indexOf("cs_order_view")>-1 || pageURL.toLowerCase().indexOf("cs_order_detail")>-1) && (newURL.toLowerCase().indexOf("app.detail")>-1 || newURL.toLowerCase().indexOf("updategiftwrap")>-1 || newURL.toLowerCase().indexOf("command.delete")>-1 || newURL.toLowerCase().indexOf("servetolist")>-1 || newURL.toLowerCase().indexOf(".membernum")>-1)) {
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
			if (newURL.toLowerCase().indexOf("app.detail")>-1){
				newURL=newURL.substring(0,newURL.toLowerCase().indexOf("app.detail")+10);
			}
			if (newURL.toLowerCase().indexOf("cs_redirect_orders,asp")>-1){
				newURL=newURL.substring(0,newURL.toLowerCase().indexOf(",asp")+4);
			}
			if (newURL.toLowerCase().indexOf("cs_order_detail,asp")>-1){
				newURL=newURL.substring(0,newURL.toLowerCase().indexOf(",asp")+4);
			}
			if (newURL.toLowerCase().indexOf("shoppingcart,plex")>-1){
				newURL=newURL.substring(0,newURL.toLowerCase().indexOf(",asp")+4);
			}
			newURL += "?" + keepParams.join("&");
		}
	}
	if (defaultNormalize != null) {
		newURL = defaultNormalize(newURL, isHref);
	}
	return newURL;
} 