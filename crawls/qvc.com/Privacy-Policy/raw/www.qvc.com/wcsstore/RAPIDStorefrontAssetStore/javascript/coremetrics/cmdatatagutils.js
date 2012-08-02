/*
 * cmdatatagutils.js
 * $Revision: 152050 $
 * $Id: cmdatatagutils - MASTER.txt 152050 2010-07-16 15:53:58Z jbowser $
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 * Date			Modifier		    Description
 * 21-Nov-2006 Eliot Towb      Added optimostSessionID and optimostCreativeNumber
 *                             arguments to pageview and productview functions
 * 15-Dec-2006 Hutch White     Add extendedAssortment parameter to productview tag
 * 09-Jan-2007 Hutch White     Add Ensemble parameters to shop tags
 * 27-Mar-2007 Hutch White     Add Bazaar Voice Tagging
 * 23-Aug-2007 Hutch White     Add postNumber parameter to pageview and registration tag.
 *                             set in rg11 so can be added to segmentation criteria
 * 08-Oct-2007 Eliot Towb      Added conversion event and element tag function.  
 *                             Added auto-Tech Props tag functionality
 * 09-Nov-2007 Mary Ochoa      Added referring URL parameter to pageview Tag.
 * 11-Dec-2007 Hutch White     Add ParseRef function
 * 15-JUL-2008 Leslie Hibbard  Removed product element tag
 * 25-Aug-2008 Hutch White     Add Explore Attributes.  Added extrafields to attribute string
 * 10-Dec-2008 Hutch White     Replace page element tag, reposition tags for readability and support
 * 17-Sep-2009 Josh Bowser     Moved client settings to cmdatatagutils from eluminate
 * 09-Dec-2009 Josh Bowser     Apply updates for AdTarget
 * 12-Jul-2010 Josh Bowser     Remove certain QVC customizations (approved by Mike Ross)
 
 */
 
var cm_exAttr=new Array();  
var cm_ClientID = "90040260";
var cm_TrackLink = "A";
var cm_TrackImpressions = "";
var cm_JSFEnabled = false;
var cmCheckCMEMFlag = false;

var cmJv = "1.0";
if (typeof(isNaN) == "function") { cmJv = "1.1";}
if (typeof(isFinite) == "function") { cmJv = "1.2";}
if (typeof(NaN) == "number") { cmJv = "1.3";}
if (typeof(decodeURI) == "function") { cmJv = "1.5";}
if (typeof(Array.forEach) == "function") { cmJv = "1.6";}
if (typeof(Iterator) == "object") {cmJv = "1.7";}

var cm_Production_HOST = "data.qvc.com";
var cm_PartnerDataClientIDs = "90040260";
if (typeof cmLoad == 'function') {
	cmLoad();
}

function cmSetProduction(){ 
	cm_HOST = cm_Production_HOST + "/cm?";
    cm_JSFPCookieDomain = "qvc.com";
}

/* This function checks the URL for the argument cm_ref or cmrf in the query string.
   If it exists, the referring url is parsed out and returned in the function. */
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

function cmCreateManualImpressionTag(pageID, trackSP, trackRE) {
		// insert code to get pageID from cmTagControl if pageID is null
		cmMakeTag(["tid","9","pi",pageID,"cm_sp",trackSP,"cm_re",trackRE,"st",cm_ClientTS]);
}

function cmCreateManualLinkClickTag(href,name,pageID,categoryID) {	
	if (cmCreateLinkTag == null && cM != null) {
		var cmCreateLinkTag = cM;
	}
	if (cmCreateLinkTag != null) {		
		var dt = new Date();
		cmLnkT3 = dt.getTime();
		href=cG7.normalizeURL(href,true);
		cmCreateLinkTag(cm_ClientTS, cmLnkT3, name, href, false, pageID,categoryID);
	}
}

function cmCreateManualPageviewTag(pageID, categoryID, DestinationURL, ReferringURL, attributes) {
	if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"ul",DestinationURL,"rf",ReferringURL,"cm_exAttr",cm_exAttr]);
}

function cmCreateElementTag(elementID, elementCategory, attributes) {
	if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"cm_exAttr",cm_exAttr]);
}

function cmCreatePageElementTag(elementID, elementCategory, pageID, pageCategoryID, elementLocation,attributes) {
	cmCreateElementTag(elementID,elementCategory,attributes);
}

function cmCreateProductElementTag(elementID, elementCategory, productID, productCategoryID, elementLocation,attributes) {
	cmCreateElementTag(elementID,elementCategory,attributes);
}

function cmCreateConversionEventTag(eventID, actionType, categoryID, points, attributes) {
	if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","14","cid",eventID,"cat",actionType,"ccid",categoryID,"cpt",points,"cm_exAttr",cm_exAttr]);
}

function cmCreateTechPropsTag(pageID, categoryID, attributes) {
	if(pageID == null) { pageID = cmGetDefaultPageID(); }
	if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}	
	cmMakeTag(["tid","6","pi",pageID,"cg",categoryID,"pc","Y","cm_exAttr",cm_exAttr]);
}

function cmCreatePageviewTag(pageID, categoryID, searchString, searchResults, attributes) {
	if (pageID == null) { pageID = cmGetDefaultPageID(); }
	if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"se",searchString,"sr",searchResults,"cm_exAttr",cm_exAttr]);
}

function cmCreateDefaultPageviewTag(categoryID) {
	cmCreatePageviewTag(cmGetDefaultPageID(),categoryID);
}

function cmCreateProductviewTag(productID, productName, categoryID,soldoutInc, __vc, __br, __onair, searchString, searchResults, attributes) {
	/*For Defect 14255 Starts*/
	attributes=__vc+"-_-"+__br+"-_-"+__onair+"-_-"+attributes;
	/*For Defect 14255 Ends*/
	if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}
	var pageIDnew;
	if(soldoutInc == "true" && soldoutInc!= null){
	pageIDnew="PRODUCT: "+productName+" ("+productID+")- Not Available";
	}
	else{
	pageIDnew="PRODUCT: "+productName+" ("+productID+")";
	}
	cmMakeTag(["tid","5","pi",pageIDnew,"pr",productID,"pm",productName,"cg",categoryID,"se",searchString,"sr",searchResults,"pc","Y","pr1",__vc,"pr2",__br,"pr3",__onair,"ps1",productID,"ps2","PRODUCT: "+productName+" ("+productID+")","ps3",productName,"ps4",categoryID,"ps5",__vc,"ps6",__br,"ps7",__onair,"cm_exAttr",cm_exAttr]);
}


var __sArray = new Array();
var __skuString = "";
var __ex=new Array();

function __cmGetPIPC(__pr,__cg) {
	var __pI, i;
	var cmAttr1=new Array();
	var cmAttr2=new Array();
	for (i=0;i<__ex.length;++i){
		cmAttr1=cmAttr1+__ex[i];
	}		
	for (__pI = 0; __pI < __sArray.length; ++__pI) {
		if (__ex.length>0){
			cmAttr2=new Array();		
			for (i=__sArray[__pI].length-__ex.length*2+1;i<__sArray[__pI].length;i=i+2){
				cmAttr2=cmAttr2+__sArray[__pI][i];
			}
	
			if (__pr == __sArray[__pI][1] && __cg == __sArray[__pI][9] && cmAttr1==cmAttr2){
				return __pI;
			}
		} else {
		if (__pr == __sArray[__pI][1] && __cg == __sArray[__pI][9]) return __pI;
	}
	}
	return -1;
}

function cmAddShop(__v) {

	var __i = __cmGetPIPC(__v[1],__v[9]);
	if (__i == -1) {
		if (__ex.length>0){
			for (var i=0; i<__ex.length; ++i){
				__v[__v.length]="s_a"+(i+1);
				__v[__v.length]=__ex[i];
			}
		}
		__sArray[__sArray.length] = __v;
	}
	else {
		var __oQ = __sArray[__i][5];
		var __oP = __sArray[__i][7];
		__sArray[__i][5] = parseInt(__sArray[__i][5]) + parseInt(__v[5]);
		__sArray[__i][7] = (((__v[7]*__v[5])+(__oP*__oQ))/__sArray[__i][5]);
	}
}

function cmCreateShopAction5Tag(productID,productName,productQuantity,productPrice,categoryID,__vc) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
	var pattern = /[^\-0-9\.]/gi;
   productPrice = productPrice.toString().replace(pattern, "");
	attributes=__vc;
	if (attributes){
		__ex=attributes.split("-_-");
	} else {
		__ex=new Array();
	}	
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"ha1",attributes ? cm_hex_sha1(attributes) : null,"cc",cm_currencyCode,"at","5","tid","4","pc","N"]);
}

function cmCreateShopAction9Tag(productID,productName,productQuantity,productPrice,customerID,orderID,orderTotal,categoryID,__vc,__br,__onair,attributes) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
	var pattern = /[^\-0-9\.]/gi;
	var pattern1 = /^\s+|\s+$/gi;
   productPrice = productPrice.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	productID = productID.toString().replace(pattern1, "");
	attributes=__vc+"-_-"+__br+"-_-"+__onair+"-_-"+attributes;	
	if (attributes){
		__ex=attributes.split("-_-");
	} else {
		__ex=new Array();
	}
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"ha1",attributes ? cm_hex_sha1(attributes) : null,"cd",customerID,"on",orderID,"tr",orderTotal,"cc",cm_currencyCode,"at","9","tid","4","pc","N","sx1",__vc,"sx2",__br,"sx3",__onair]);
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
	for (var i = 0; i < __sArray.length; ++i) {
		// aggregate
		var __skuStringArrayIndex = -1;
		for (var y = 0; y < __skuStringArray.length; ++y) {
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
			__skuStringArray[__skuStringArrayIndex][1] = (__oP*__oQ+__sArray[i][7]*__sArray[i][5])/(parseInt(__sArray[i][5])+parseInt(__oQ));
		}
	}
	for (var x = 0; x < __skuStringArray.length; ++x) {
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

function cmCreateOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP,attributes) {
	if ((typeof(cm_currencyCode) == "undefined") || (!cm_currencyCode)) {
		cm_currencyCode = "";
	}
	var pattern = /[^\-0-9\.]/gi;
   orderShipping = orderShipping.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","3","osk",__skuString,"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cc",cm_currencyCode,"cm_exAttr",cm_exAttr]);
	__skuString = "";
}

function cmCreateRegistrationTag(customerID,customerEmail,customerCity,customerState,customerZIP,newsletter,subscribed,attributes) {
 	if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl",newsletter,"sd",subscribed,"cm_exAttr",cm_exAttr]);
}

function cmCreateErrorTag(pageID,categoryID) {
	if(pageID == null) {
		pageID = cmGetDefaultPageID();
	}
	cmMakeTag(["tid","404","pi",pageID,"cg",categoryID,"pc","Y"]);
}


function cM(t1,ti,name,href,resent,pi,cg){
	var cm=new _cm("tid","8");
	href = href.split("javascript:navigateLink(").join("").split(");").join("");
	cm.pi=(pi==null)?c1(cm.ci):pi;
	cm.cg=cg;
	cm.st=t1;
	cm.ti=ti;
	cm.nm=name;
	cm.hr=href;
	if(resent)cm.rs="Y";
	cm.write(1);
}

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

	if (cm.tid != "4" && typeof(cm.cm_exAttr)!="undefined"){
		switch(cm.tid){
			case "6":
				prefix="pv";
				break;
			case "1":
				prefix="pv";
				break;
			case "2":
				prefix="rg";
				break;
			case "5":
				prefix="pr";
				break;
			case "3":
				prefix="o";
				break;
			case "14":
				prefix="c";
				break;
			case "15":
				prefix="e";
				break;
			default:
				break;
		}		
		var attrNum=cm.cm_exAttr.length;
		if (attrNum>15){
			attrNum=15;
		}
		for (i=0;i<attrNum;i++){
			if (cm.tid=="2"){
				Attval=prefix+(i+1);
			} else {
				Attval=prefix+"_a"+(i+1);
			}
			cm[Attval]=cm.cm_exAttr[i];
		}
		cm.cm_exAttr=null;
	}	
	if ((cm.pi == null) && (cm.pc == "Y")) {
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
	catch(err){}

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
	if (cmCheckCMEMFlag){cmStartTagSet();}
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
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
}

function cmSafeZero(cm, checkArray) {
	// put logic here to convert number 0 to string "0"
	for (var i = 0; i < checkArray.length; ++i) {
		if ((cm[checkArray[i]] != null) && (cm[checkArray[i]] == 0)) {
			cm[checkArray[i]] = "0";
		}
	}
}

if (defaultNormalize == null) { var defaultNormalize = null; }

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


// install normalization
if (document.cmTagCtl != null) {
    var func = "" + document.cmTagCtl.normalizeURL;
    if (func.indexOf('myNormalizeURL') == -1) {
        defaultNormalize = document.cmTagCtl.normalizeURL;
        document.cmTagCtl.normalizeURL = myNormalizeURL;
    }
}

function cmSetCurrencyCode(currencyCode) {
	cm_currencyCode = currencyCode;
}

function cmSafeFormSubmit(id) {
            CI();
            cO(id,"S");
            CA(1);
            CJ(1);
            CE();
			return true;
}

function cP(e){
            CI();
            if (typeof e == typeof e123_x) {
                        var e = this;
            }
            else {
                        var e=CG(e);
            }
            cO(e?e.cM1:-1,"S");
            CA(1);
            CJ(1);
            CE();
}

/*  hash functions that support shop aggregation with attributes */
function cm_hex_sha1(s)    { return cm_rstr2hex(cm_rstr_sha1(cm_str2rstr_utf8(s))); }

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
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
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
  /* append padding */
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