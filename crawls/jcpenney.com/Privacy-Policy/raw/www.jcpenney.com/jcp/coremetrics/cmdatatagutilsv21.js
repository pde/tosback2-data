/*
 * cmdatatagutils.js
 * $Id: cmdatatagutilsv16.txt 124371 2009-07-15 20:34:55Z etowb $
 *
 * Coremetrics Tag v3.1, 2/28/2002
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 * Change History
 * 5/2/2008	Eliot Towb	Added Bazaarvoice and Quickview tags to file version without client-side category logic.
 * 6/8/2009	Eliot Towb	Added code to capture cmAMS_C, cmAMS_T, and cmAMS_V in pageview attributes 1 - 3
 * 9/30/2009	Eliot Towb	Added code to capture cmAMS_Z in pageview attribute 4
 *				Added code to capture refinement dimensions
 *				Added code to propagate attributes from productviews to shop5s and shop9s
 * 5/21/2010	Eliot Towb	Added cmCreateAegonCustomTag function
 *				Updated logic in cmCreateProductviewTag function to handle RichRelevance alternate categorization
 * 8/6/2010	Eliot Towb	Updated logic that classifies container as Global Nav
 * 1/11/2011	Eliot Towb	Changed production data collection domain to www88.jcpenney.com
 * 10/20/2011	Eliot Towb	Updated cookie length for atribute storage to be only 1024 characters
 */

var cmTestIDMapping = "";
var cmSSClientID = "";
var cmCSClientID = "";

var cmKioskClientID = "";
var cmPOSClientID = "";

var cmOldC9 = C9;
C9 = cmCustomC9;

/* Added 5/2/2008 */
function cmCreateQuickviewCustomTag(pageID, productID, productName, categoryID) {
	var cm = new _cm("tid", "7", "vn2", "e4.0");
	cm.li="9000";
	cm.ps1=pageID;
	cm.ps2=productID;
	cm.ps3=productName;
	cm.ps4=categoryID;
	cm.writeImg();
}

/* Added 5/21/2010 */
function cmCreateAegonCustomTag(offerCode,offerDesc,programCode,programDesc,pageId,orderNumber,totalPrice,shippingPrice) {
	var cm = new _cm("tid", "7", "vn2", "e4.0");
	cm.li="8000";
	cm.ps1=offerCode;
	cm.ps2=offerDesc;
	cm.ps3=programCode;
	cm.ps4=programDesc;
	cm.ps5=pageId;
	cm.ps6=orderNumber;
	cm.ps7=totalPrice;
	cm.ps8=shippingPrice;
	cm.writeImg();
}

function cmCreateBazaarVoiceTag(productID, productName, catID,totalReviewCount,avgRating,ratingsOnlyRV,buyAgainPerc) {

    	var originalCategory = catID;

        var cm = new _cm("tid", "7", "vn2", "e4.0");
		cm.li=10300;
		if (productName == null) {
			productName = "";
		}
		if (productName == null) {
			productName = "";
		}
		cm.ps1 = productID;
		cm.ps2 = productName;
		if (totalReviewCount){
			cm.ps4=totalReviewCount;      
		}
		if (avgRating){
			cm.ps5=avgRating;      
		}
		if (ratingsOnlyRV){
			cm.ps6=ratingsOnlyRV;
		}
		if (buyAgainPerc){
			cm.ps7=buyAgainPerc;
		}

	var t_value = cmExtractParameter("cmAMS_T");
	var c_value = cmExtractParameter("cmAMS_C");
	if ((cmIndexOfParameter("CatNum") > 0) && (cmIndexOfParameter("JSEnabled") > 0)) {
		cm.ps3 = cmCalculateCategory("EOB",1);
	}
	else if ((cmIndexOfParameter("CatNum") > 0) && (cmIndexOfParameter("JSEnabled") == -1)) {
		cm.ps3 = cmCalculateCategory("Bag Lookup",1);
	}
	else if ((cmIndexOfParameter("cmBagLookup") > 0)) {
		cm.ps3 = cmCalculateCategory("Bag Lookup",1);
	}
	else if ((cmIndexOfParameter("RefPage=NetPerceptions2.inc") > 0) && (document.referrer.toUpperCase().indexOf("/JCP/BAG") > 0 )){
		cm.ps3 = cmCalculateCategory("BAG",1);
	}
	else if ((t_value) && (c_value)) {
		if (cmExtractParameter("GrpTyp") == "ENS") {
			cm.ps3 = cmCalculateCategory(t_value + "_" + c_value + "_" + productID);
		}
		else {
			cm.ps3 = cmCalculateCategory(t_value + "_" + c_value);
		}
	}
	else {
		// code to handle coming in from an external link
		var externalCat = cmExtractParameter("cmCat");
		var existingCat = cI("cmCat");
		if (!(existingCat) && (document.referrer.toLowerCase().indexOf(homePageString) == -1)) {
			if (externalCat) {
				categoryID = "EXTERNAL|" + externalCat;
			}
			else {
				categoryID = "EXTERNAL";
			}
			cm.ps3 = cmCalculateCategory(categoryID);
		}
		else {
			cm.ps3 = cmCalculateCategory(null);
		}
	}

	if (cm.ps3) {
		if (cm.ps3.indexOf("null") > -1) { cm.ps3 = "NullValue"; }
		if (cm.ps3.indexOf("||") > -1) { cm.ps3 = "DoublePipe"; }
		if (cm.ps3.charAt(0) == "|") { cm.ps3 = "LeadingPipe"; }
		if (cm.ps3.indexOf("RESET") > -1) {cm.ps3 = "Reset"; }
		if (countOf(cm.ps3, "|") > 14) {cm.ps3 = "TooLong"; }
		if (cm.ps3.length > 100) {cm.ps3 = "TooLong";}

		//additional filters to remove invalid categories
		cm.ps3 = cm.ps3.toUpperCase();

		if (cm.ps3.indexOf("BAG|") > -1) {
			if ((cm.ps3 != "BAG|CROSSSELL") && (cm.ps3.indexOf("BAG|0") != 1)) {
				cm.ps3 = "BAG|INVALID";
			}
		}
		if (cm.ps3.indexOf("BAG LOOKUP|") > -1) {
			if (cm.ps3 != "BAG LOOKUP|CROSSSELL") {
				cm.ps3 = "BAG LOOKUP|INVALID";
			}
		}
		if (cm.ps3 == "BAG LOOKUP") {
			cmCreatePageviewTag("BAG LOOKUP","BAG LOOKUP");
			return;
		}
	}

	if (cmCSClientID && (cm_ClientID != cmPOSClientID)) {
		cm.ci = cmCSClientID;
		cm.writeImg();
	}
	if (cm_ClientID == cmPOSClientID) {
		cm.ci = cm_ClientID;
		if (cmSSClientID) {
			cm.ps3 = originalCategory;
		}
		cm.writeImg();
	}
	if (cmSSClientID && (cm_ClientID != cmPOSClientID)) {
		cm.ci = cmSSClientID;
		if (cmCheckKiosk()) {
			cm.ci = cm.ci + ";" + cmKioskClientID;
		}
		cm.ps3 = originalCategory;
		cm.writeImg();
	}
}

function cmCustomC9(e) {
	var tempC = cmExtractParameter("cmAMS_C", e.href);
	var tempT = cmExtractParameter("cmAMS_T", e.href);
	var tempRE = "";
	if (tempC && tempT) {
		var tempTestID = cmTestIDMapping[tempT + tempC];
		if (tempTestID) {
			tempRE = "cm_re=" + tempTestID + "-_-" + tempT + "-_-" + tempC;
			e.href = e.href + "&" + tempRE;
		}
	}
	var type = e.tagName.toUpperCase();
	if (type == "A") {
		if ((cmTestIDMapping != "") && (tempC == null)) {
			var cmTestID = cmTestIDMapping;
			var cmClass = e.className.toUpperCase();
			var cmURLcat = cmExtractParameter("catid",e.href.toLowerCase());
			var cmText = e.text == undefined ? e.innerText : e.text;
			if ((cmText == undefined) || (cmText == null) || (cmText == "")) {
				cmText = cmURLcat;
			}
			tempRE = "cm_re=" + cmTestID + "-_-" + cmClass + "-_-" + cmText;	
			e.href = e.href + "&" + tempRE;
		}
	}

	cmOldC9(e);
}

function cmSetProduction(serverSwitch, ssClientID, csClientID, kioskClientID, POSClientID, UATesting) {
	
	var AssocNum = cmPadString(cI("JCPSession","AssociateNumber",""));
	cmKioskClientID = kioskClientID;
	cmPOSClientID = POSClientID;

	if (serverSwitch) {
		if ((AssocNum < 9900 || AssocNum == "") || UATesting) {
			cm_HOST="www88.jcpenney.com/cm?"; 
		}
		else {
			cm_HOST="test.coremetrics.com/cm?";
		}
	}
	else {
		cm_HOST="test.coremetrics.com/cm?";
	}

	if (ssClientID && csClientID) {
		cmSetClientID(ssClientID + ";" + csClientID);
	}
	if (ssClientID && !(csClientID)) {
		cmSetClientID(ssClientID);
	}
	if (csClientID && !(ssClientID)) {
		cmSetClientID(csClientID);
	}

	cmSSClientID = ssClientID;
	cmCSClientID = csClientID;

}

/* code to check for cmPOSCookie and set clientID appropriately */
// no longer needed since we are checking another cookie set by the POS system
//if (cI("cmPOSCookie") == "Y") {
//	cmSetClientID("90046288");
//}

function cmSetClientID(client_id) {
	cm_ClientID = client_id;
	if (cmCheckKiosk()) {
		cm_ClientID = cm_ClientID + ";" + cmKioskClientID;
	}
	if (cmCheckPOS()) {
		cm_ClientID = cmPOSClientID;
	}
}


function cmCreateImpressionTag(pageID,re_params) {
            var cm = new _cm("tid","9","vn2","4.0");
            cm.pi = pageID;
            cm.cm_re = re_params;
			var tempArray = re_params.split("-_-");
			cmTestIDMapping = tempArray[0];
            cm.writeImg();
}

function cmSetPOSCookie() {
	var posID = cmExtractParameter("cmPOSLocation",window.location.href);
	if (posID != null) {
		// no longer needed since we are checking another cookie set by the POS system
		//document.cookie = "cmPOSCookie=Y";
		//cmSetClientID("90046288");
		if (window.location.href.indexOf("?") > -1) {
			return window.location.href + "&cm_ven=POS&cm_ite=" + posID;
		}
		else {
			return window.location.href + "?cm_ven=POS&cm_ite=" + posID;
		}
	}
	else {
		return window.location.href;
	}
}

function cmFormatPrice(price) {
	var tempPrice;
	tempPrice = price;
	while (tempPrice.indexOf(",") != -1)
	{
		tempPrice = tempPrice.replace(",", "");
	}
	return tempPrice;
}


/* built in reset for jcpenney.com/jcp/default.aspx */
//var homePageString = "localhost/cm/cat_test1.html";
var homePageString = "jcpenney.com/jcp/default.aspx";
var bagPageString = "jcpenney.com/jcp/bag.aspx";

function cmGetCategory() {
	var tempCat = cI("cmCat");
	var indexLastReset = tempCat.lastIndexOf("RESET|");
	if (indexLastReset == -1) {
		indexLastReset = 0; 
	}
	else {
		indexLastReset += 6;
	}
	return tempCat.substring(indexLastReset);
}

function cmCalculateCategory(catID, forceReset) {
	// determine current cat string value
	var tempCat = cI("cmCat");
	if (!(tempCat)) { tempCat = ""; }
	var indexLastReset = tempCat.lastIndexOf("RESET|");
	if (indexLastReset == -1) {
		indexLastReset = 0; 
	}
	else {
		indexLastReset += 6;
	}
	// determine whether we came from reset page
	var resetFlag = cI("cmResetFlag");
	if (!(resetFlag)) {
		resetFlag = 'N';
	}
	if (((catID) && (catID != "")) || (resetFlag == 'Y')) {

		var returnValue = "";

		// determine if we are on a reset page
		var onResetPage = 0;
		var tempLocation = window.location.href.toLowerCase();
		if ((cmIndexOfParameter("cmResetCat") > -1) || forceReset == 1 
			|| (tempLocation.indexOf(homePageString) > -1) 
			|| (tempLocation.indexOf(bagPageString) > -1) 
			|| ((document.referrer.toLowerCase().indexOf(homePageString) > -1) 
				&& (cmIndexOfParameter("cmAMS_T") == -1))) {
			onResetPage = 1;
		}
		// determine whether we came forward from reset page
		var cameFromResetPage = 0;
		tempLocation = document.referrer.toLowerCase();
		if ((document.referrer.indexOf("cmResetCat") > -1) || 
			(tempLocation.indexOf(homePageString) > -1) || 
			(tempLocation.indexOf(bagPageString) > -1) ||
			(tempLocation.indexOf("searchdepartment.aspx") > -1) ||
			(tempLocation.indexOf("searchproducts.aspx") > -1) ||
			(tempCat.substring(indexLastReset) == "BAG") ||
			((tempLocation.indexOf("CatNum") > -1) && (tempLocation.indexOf("jsenabled") == -1))) {
			cameFromResetPage = 1;
		}
		//determine cat level
		var catLevel = cmExtractParameter("cmCatLevel");

		//determine whether to add on to or delete from catString
		if (onResetPage) {
			// set cmResetFlag cookie
			document.cookie = "cmResetFlag=Y";
			var tempCatID = "|RESET|" + catID;
			if (cmIsLastValue(tempCat, tempCatID)) {
				returnValue = catID;
			}
			var testIndex1 = tempCat.lastIndexOf(tempCatID);
			var testIndex2 = tempCat.lastIndexOf("|");
			if ((testIndex1 + tempCatID.length) == testIndex2) {
				tempCat = tempCat.substring(0, testIndex2);
				document.cookie = "cmCat=" + tempCat;
				returnValue = catID;
			}
			else {
				tempCat += tempCatID;
				document.cookie = "cmCat=" + tempCat;
				returnValue = catID;
			}
		}		
		else if ((resetFlag == 'Y') && (cameFromResetPage == 0)) {
			// hit back from a reset page
			var tempIndex = tempCat.lastIndexOf("|RESET|");
			tempCat = tempCat.substring(0, tempIndex);
			document.cookie = "cmCat=" + tempCat;
			document.cookie = "cmResetFlag=N";

			// find new index of last Reset
			var newIndexLastReset = tempCat.lastIndexOf("RESET|");
			if (newIndexLastReset == -1) { newIndexLastReset = 0; }
			returnValue = tempCat.substring(newIndexLastReset + 6);
		}
		else if (catLevel) {
				document.cookie = "cmResetFlag=N";
				if (catLevel == '3') {
					var tempDept = cmExtractParameter("deptid",document.URL.toLowerCase());

					if (!tempDept && (document.referrer.toLowerCase().indexOf("customerservice") > -1)) {
						tempDept = "CustomerService";
					}

					var newCat =  tempDept + "|" + catID;
					
					if (indexLastReset == 0) {
						tempCat = newCat;
					}
					else {
						indexLastReset = tempCat.length + 7;
						tempCat = tempCat + "|RESET|" + newCat;
					}
					returnValue = newCat;
					document.cookie = "cmCat=" + tempCat;
				}
				else if (document.location.href.toLowerCase().indexOf('productlist.aspx') > -1) {
					if (document.referrer.toLowerCase().indexOf('productlist.aspx') > -1) {
						tempCat = tempCat.substring(0,tempCat.lastIndexOf("|") + 1) + catID;
						returnValue = tempCat.substring(indexLastReset);
						document.cookie = "cmCat=" + tempCat;
					}
					else {
						if (tempCat && (tempCat != "")) {
							tempCat = tempCat + "|" + catID;
						}
						else {
							tempCat = catID;
						}
						returnValue = tempCat.substring(indexLastReset);
						document.cookie = "cmCat=" + tempCat;
						// does not handle moving backwards (is last value/is prev value)
					}
				}
				else {
					//trim tempCatID and add catID
					var cLevel = containerLevel(tempCat.substring(indexLastReset));
					newCatLevel = catLevel + cLevel;
					var trimmedCat = tempCat.substring(indexLastReset);
					trimmedCat = trimmedCat.substring(0,nIndexOf(trimmedCat,"|",newCatLevel - 1)) + "|" + catID;
					if (indexLastReset == 0) {
						tempCat = trimmedCat;
					}
					else {
						tempCat = tempCat.substring(0, indexLastReset) + trimmedCat;
					}
					returnValue = tempCat.substring(indexLastReset);
					document.cookie = "cmCat=" + tempCat;
				}
		}
		else if (!(catLevel)) {
				document.cookie = "cmResetFlag=N";
				if (document.location.href.toLowerCase().indexOf('productlist.aspx') > -1) {
					if (document.referrer.toLowerCase().indexOf('productlist.aspx') > -1) {
						tempCat = tempCat.substring(0,tempCat.lastIndexOf("|") + 1) + catID;
						returnValue = tempCat.substring(indexLastReset);
						document.cookie = "cmCat=" + tempCat;
					}
					else {
						if (tempCat && (tempCat != "")) {
							tempCat = tempCat + "|" + catID;
						}
						else {
							tempCat = catID;
						}
						returnValue = tempCat.substring(indexLastReset);
						document.cookie = "cmCat=" + tempCat;
					}
				}
				else if (((document.referrer.toLowerCase().indexOf("products.asp") > -1) ||
						(document.referrer.toLowerCase().indexOf("productshom.asp") > -1)) &&
						(document.referrer.toLowerCase().indexOf("grptyp=ens") > -1)) {
						// if curr page is ensemble
						if (((document.location.href.toLowerCase().indexOf("products.asp") > -1) ||
							(document.location.href.toLowerCase().indexOf("productshom.asp") > -1)) &&
							(document.location.href.toLowerCase().indexOf("grptyp=ens") > -1)) {
							// remove one level then add
							tempCat = tempCat.substring(0,tempCat.lastIndexOf("|") + 1) + catID;
							returnValue = tempCat.substring(indexLastReset);
							document.cookie = "cmCat=" + tempCat;
						}
						// if curr page is regular product
						else if (((document.location.href.toLowerCase().indexOf("products.asp") > -1) ||
							(document.location.href.toLowerCase().indexOf("productshom.asp") > -1)) &&
							(document.location.href.toLowerCase().indexOf("grptyp=ens") == -1)) {
							// remove one level
							tempCat = tempCat.substring(0,tempCat.lastIndexOf("|"));
							returnValue = tempCat.substring(indexLastReset);
							document.cookie = "cmCat=" + tempCat;
						}
						else {
							tempCat = tempCat + "|" + catID;
							returnValue = tempCat.substring(indexLastReset);
							document.cookie = "cmCat=" + tempCat;
						}
				}
				else {
					if (tempCat && (tempCat != "")) {
						if (catID) {
							tempCat = tempCat + "|" + catID;
						}
						else {
							// this is for the catalog product pages
							// do nothing to the tempCat
						}
					}
					else {
						tempCat = catID;
					}
					returnValue = tempCat.substring(indexLastReset);
					document.cookie = "cmCat=" + tempCat;
				}

		}
		else {
			
			var isLastValue = cmIsLastValue(tempCat,catID);
			var isPrevValue = cmIsPrevValue(tempCat,catID, indexLastReset);
			if (isLastValue) {
				// do nothing
			}
			else if (isPrevValue) {
				tempCat = tempCat.substring(0, (tempCat.lastIndexOf(catID + "|") + catID.length + 1));
			}
			else {
				if (tempCat == "") { tempCat = catID; }
				else { tempCat = tempCat + "|" + catID; }
			}

			returnValue = tempCat.substring(indexLastReset);
			document.cookie = "cmCat=" + tempCat;
		}

		// check to see if current value is previous value and if so, trim down ID
		// takes care of back and reload conditions
		if (cmIsPrevValue(tempCat,catID, indexLastReset)) {
			returnValue = returnValue.substring(0, returnValue.indexOf(catID + "|") + catID.length);
			//returnValue = returnValue = tempCat.substring(indexLastReset);
			if (indexLastReset == 0) {
				tempCat = returnValue;
			}
			else {
				tempCat = tempCat.substring(0, indexLastReset) + returnValue;
			}
			document.cookie = "cmCat=" + tempCat;
		}

		// trim down catString
		while (tempCat.length > 200) {
			//remove the first catID in the string
			var firstReset = tempCat.indexOf("RESET|");
			tempCat = tempCat.substring(firstReset + 6);
		}

		//logic to put "external" on the front of the catID
		return returnValue;
	}
	else { // just retrieve the exisiting cookie value

		if ((((document.referrer.toLowerCase().indexOf("products.asp") > -1) ||
			(document.referrer.toLowerCase().indexOf("productshom.asp") > -1)) &&
			(document.referrer.toLowerCase().indexOf("grptyp=ens") > -1)) && 
		   (((document.location.href.toLowerCase().indexOf("products.asp") > -1) ||
			(document.location.href.toLowerCase().indexOf("productshom.asp") > -1)) &&
			(document.location.href.toLowerCase().indexOf("grptyp=ens") == -1) &&
			(document.location.href.toLowerCase().indexOf("cmorigid") == -1))) {
			// remove one level
			tempCat = tempCat.substring(0,tempCat.lastIndexOf("|"));
			document.cookie = "cmCat=" + tempCat;
			return tempCat.substring(indexLastReset);
		}
		
		return tempCat.substring(indexLastReset);
	}
}

function nIndexOf(inString,inSubString,num) {
	var i = 0;
	if (num < 0) return -1;
	while (num != 0) {
		i = inString.indexOf(inSubString, i);
		num -= 1;
	}
	return i;
}

function countOf(inString, inSubString) {
	var i = 0;
	var count = 0;
	while (i != -1) {
		i = inString.indexOf(inSubString, i + 1);
		if (i != -1) {
			++count;
		}
	}
	return count;
}

function containerLevel(inString) {
	var a = inString.split("|");
	var count = 0;
	for (i = 0; i < a.length; ++i) {
		if (a[0].indexOf("_") > -1) {
			++count;
		}
	}
	return count;
}

function cmIsLastValue(catString, catID) {
	if (!(catString)) { return false; }
	var tempIndex = catString.lastIndexOf(catID);
	if (tempIndex == -1) {
		return false;
	}
	if ((tempIndex >= 0) && (tempIndex + catID.length == catString.length)) {
		return true;
	}
	else {
		return false;
	}
}

function cmIsPrevValue(catString,catID, lastResetIndex) {
	if (!(catString)) { return false; }
	var tempIndex = catString.lastIndexOf(catID + "|");
	if (tempIndex == -1) {
		return false;
	}
	else if (tempIndex > lastResetIndex) {
		return true;
	}
	else {
		return false;
	}
}


function cmCreateTechPropsTag(pageID, catID, testConceptIDList) {
	var originalCategory = catID;
	var cm=new _cm("tid", "6", "vn2", "e4.0");
	cm.pc="Y";
	cm.pi = pageID;
	cm.cg = cmCalculateCategory(catID, 1);
	cm.addTP();
	
	if (testConceptIDList) {
		cm.li = "333";
		cm.ps1 = testConceptIDList;
	}
	if (cmIndexOfParameter("cmTestID") > -1) {
		cm.li = "333";
		cm.ps2 = cmExtractParameter("cmTestID");
	}
	cm.pv15 = cmExtractParameter("jcpvid",cI("JCPSession"));
	
	cm.ul = cmSetPOSCookie();

	cm.pv5 = cmPadString(cI("JCPSession","StoreNumber",""));
	cm.pv6 = cI("JCPSession","TerminalNumber","");
	cm.pv7 = cmPadString(cI("JCPSession","AssociateNumber",""));
	cm.pv8 = cI("JCPSession","StoreZipCode","");
	cm.pv9 = cI("JCPSession","DeviceType","");
	
	if (cmCSClientID && (cm_ClientID != cmPOSClientID)) {
		cm.ci = cmCSClientID;
		cm.writeImg();
	}
	if (cm_ClientID == cmPOSClientID) {
		cm.ci = cm_ClientID;
		if (cmSSClientID) {
			cm.cg = originalCategory;
		}
		cm.writeImg();
	}
	if (cmSSClientID && (cm_ClientID != cmPOSClientID)) {
		cm.ci = cmSSClientID;
		if (cmCheckKiosk()) {
			cm.ci = cm.ci + ";" + cmKioskClientID;
		}
		cm.cg = originalCategory;
		cm.writeImg();
	}
}

function cmCreatePageviewTag(pageID, categoryID, pageNumber, searchString, testConceptIDList, numSearchResults, searchRefineResults, suffix, solutionSiteFlag, filterType, filterValue, sortType, topDimension, topDimensionValue, dimensionCombo, dimensionComboValue, currentDimension, currentDimensionValue ) {
	var originalCategory = categoryID;
	var lastPipeIndex = categoryID.lastIndexOf('|');
	if (lastPipeIndex < 0) { 
		lastPipeIndex = 0; 
	}
	else {
		lastPipeIndex = lastPipeIndex + 1; 
	}

	categoryID = categoryID.substring(lastPipeIndex,categoryID.length);
	
	var pageName = pageID.toUpperCase();
	if (pageID == null) {
		pageID = getDefaultPageID();
	}

	categoryID = categoryID.split("_").join();

	var cm = new _cm("tid", "1", "vn2", "e4.0");

	cm.pv2 = solutionSiteFlag;

	if (filterType || filterValue) {
		var filterTypeArray = filterType.split("|");
		var filterValueArray = filterValue.split("|");
		for (var z = 0; z < filterTypeArray.length; ++z) {
			var ccm = new _cm("tid", "7", "vn2", "e4.0");
			ccm.li = "409";
			ccm.ps1 = pageID;
			ccm.ps2 = originalCategory;
			ccm.ps3 = filterTypeArray[z];
			ccm.ps4 = filterValueArray[z];
			ccm.ps5 = window.location.href;
			ccm.ps6 = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1); // template value
			ccm.writeImg();
		}
	}

	if (searchRefineResults) {
		var cm2 = new _cm("tid", "7", "vn2", "e4.0");
		cm2.li = "500";
		cm2.ps1 = pageID;
		cm2.ps2 = originalCategory;
		cm2.ps4 = searchString;
		cm2.ps5 = numSearchResults;
		cm2.ps6 = searchRefineResults;
		cm2.writeImg();
	}

	cm.pv4 = sortType;

	cm.pi = pageID;

	if (suffix) {
		cm.pi = cm.pi + suffix;
	}

	if (searchString) {
		cm.se = searchString;
	}
	if (pageID == "SearchResults") {
		cm.cg = cmCalculateCategory(categoryID,1);
	}
	if (categoryID) {
		cm.cg = categoryID;
	}
	if (pageName.indexOf("GR2") > -1) {
		cm.cg = cmCalculateCategory(categoryID);		
	}
	if (pageName.indexOf("CATALOGS") > -1) {
		cm.cg = cmCalculateCategory(categoryID);		
	}
	if (categoryID == "MP") {
		cm.cg = cmCalculateCategory(categoryID);
		cm.cl = pageID;
	}
	if (pageNumber) {
		if ((pageNumber != "1") && (pageNumber != "")) {
			cm.pi = cm.pi + " - PG " + pageNumber;
		}
	}

	if (testConceptIDList) {
		cm.li = "333";
		cm.ps1 = testConceptIDList;
	}
	if (cmIndexOfParameter("cmTestID") > -1) {
		cm.li = "333";
		cm.ps2 = cmExtractParameter("cmTestID");
	}
	cm.pv15 = cmExtractParameter("jcpvid",cI("JCPSession"));
	cm.ul = cmSetPOSCookie();

	cm.sr = numSearchResults;

	cm.pv5 = cmPadString(cI("JCPSession","StoreNumber",""));
	cm.pv6 = cI("JCPSession","TerminalNumber","");
	cm.pv7 = cmPadString(cI("JCPSession","AssociateNumber",""));
	cm.pv8 = cI("JCPSession","StoreZipCode","");
	cm.pv9 = cI("JCPSession","DeviceType","");

	//add Guided Navigation attributes
	cm.pv_a5 = topDimension;
	cm.pv_a6 = topDimensionValue;
	cm.pv_a7 = dimensionCombo;
	cm.pv_a8 = dimensionComboValue;
	cm.pv_a9 = currentDimension;
	cm.pv_a10 = currentDimensionValue;

	if (cmCSClientID && (cm_ClientID != cmPOSClientID)) {
		cm.ci = cmCSClientID;
		cm.writeImg();
	}
	if (cm_ClientID == cmPOSClientID) {
		cm.ci = cm_ClientID;
		if (cmSSClientID) {
			cm.cg = originalCategory;
		}
		cm.writeImg();
	}
	if (cmSSClientID && (cm_ClientID != cmPOSClientID)) {
		cm.ci = cmSSClientID;
		if (cmCheckKiosk()) {
			cm.ci = cm.ci + ";" + cmKioskClientID;
		}
		cm.cg = originalCategory;
		cm.writeImg();
	}
}

function cmCreateDefaultPageviewTag() {
	cmCreatePageviewTag(getDefaultPageID());
}


function cmCreateCategoryPageviewTag(prefix, categoryName, categoryID, pageNumber, testConceptIDList, suffix, solutionSiteFlag, filterType, filterValue, sortType, topDimension, topDimensionValue, dimensionCombo, dimensionComboValue, currentDimension, currentDimensionValue ) {

	var originalCategory = categoryID;
	var lastPipeIndex = categoryID.lastIndexOf('|');
	if (lastPipeIndex < 0) { 
		lastPipeIndex = 0; 
	}
	else {
		lastPipeIndex = lastPipeIndex + 1; 
	}
	categoryID = categoryID.substring(lastPipeIndex,categoryID.length);

	categoryID = categoryID.split("_").join();
	var catID = categoryID.toUpperCase();
	var catName = categoryName.toUpperCase();
	var pageIDcategoryID = categoryID;
	var cm = new _cm("tid", "1", "vn2", "e4.0");

	if ((catID.indexOf("ORDER") > -1) ||
		(catID.indexOf("LOGIN") > -1) || (catID.indexOf("ACCOUNT") > -1) ||
		(catID.indexOf("BILLING") > -1) || (catID.indexOf("SHIPPING") > -1) ||
		(catID.indexOf("PAYMENT") > -1) || (catID.indexOf("SIGNOUT") > -1) ||
		(catID.indexOf("EXPRESS") > -1) || (catID.indexOf("REVIEW") > -1) ||
		(catID.indexOf("STORELOCATOR") > -1) || (catID.indexOf("GIFTWIZ") > -1) ||
		(catID.indexOf("CUSTOMERSERVICE") > -1) || (catID.indexOf("REGISTRY") > -1) ||
		(catID == "BAG") || (catID.indexOf("GR2") > -1) ||
		(catID == "PARTNERSITES") || (catID.indexOf("CATALOGS") > -1) ||
		(catName.indexOf("CUSTOMERSERVICE") > -1)) {
			if ((catName.indexOf("CUSTOMERSERVICE") > -1) && (catName != "CUSTOMERSERVICE.ASPX")){
				if (document.referrer.toLowerCase().indexOf("customerservice") > -1) {
					cmCreatePageviewTag(categoryName, "CustomerService|" + categoryID);
				}
				else {			
					cmCreatePageviewTag(categoryName, categoryID);
				}
			}
			else {
				cmCreatePageviewTag(categoryName, categoryID);
			}
			return;
			
	}

	cm.pv2 = solutionSiteFlag;

	var t_value = cmExtractParameter("cmAMS_T");
	var c_value = cmExtractParameter("cmAMS_C");
	if ((t_value) && (c_value)) {
		categoryID = t_value + "_" + c_value + "_" + categoryID;
		cm.pv10 = t_value;
		cm.pv11 = c_value;
		cm.pv12 = originalCategory;
		var globalNavPattern = /D[0-9]/;
		if (globalNavPattern.test(c_value)) {
			cm.pv13 = "GLOBALNAV";
		} else {
			cm.pv13 = cmExtractParameter("cmcatid",window.location.href.toLowerCase());
		}
		cm.pv_a1 = cm.pv10;
		cm.pv_a2 = cm.pv11;
		cm.pv_a3 = cmExtractParameter("cmAMS_V");
		cm.pv_a4 = cmExtractParameter("cmAMS_Z");

	}
	
	cm.pi = "";

	if (prefix) {
		cm.pi = prefix + ": ";
	}
	
	cm.pi = cm.pi + categoryName + " (" + pageIDcategoryID + ")";

	
	if (suffix) {
		cm.pi = cm.pi + suffix;
	}


	if (pageNumber) {
		if ((pageNumber != "1") && (pageNumber != "")) {
			cm.pi = cm.pi + " - PG " + pageNumber;
		}
	}

	if (filterType || filterValue) {
		var filterTypeArray = filterType.split("|");
		var filterValueArray = filterValue.split("|");
		for (var z = 0; z < filterTypeArray.length; ++z) {
			var ccm = new _cm("tid", "7", "vn2", "e4.0");
			ccm.li = "409";
			ccm.ps1 = cm.pi;
			ccm.ps2 = originalCategory;
			ccm.ps3 = filterTypeArray[z];
			ccm.ps4 = filterValueArray[z];
			ccm.ps5 = window.location.href;
			ccm.ps6 = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1); // template value
			ccm.writeImg();
		}
	}

	cm.pv4 = sortType;

	// code to handle coming in from an external link
	var externalCat = cmExtractParameter("cmCat");
	var existingCat = cI("cmCat");

	if (!(existingCat) && (document.referrer.toLowerCase().indexOf(homePageString) == -1)) {
		if (externalCat) {
			categoryID = "EXTERNAL|" + externalCat + "|" + categoryID;
		}
		else {
			categoryID = "EXTERNAL|" + categoryID;
		}
	}

	if (cmIndexOfParameter("cmOrigID") > -1) {
		cm.cg = cmCalculateCategory(null) + "|Crosssell";
		cm.cl = "Crosssell";
	}
	else {
		cm.cg = cmCalculateCategory(categoryID);
		cm.cl = categoryName;
	}

	if (testConceptIDList) {
		cm.li = "333";
		cm.ps1 = testConceptIDList;
	}
	if (cmIndexOfParameter("cmTestID") > -1) {
		cm.li = "333";
		cm.ps2 = cmExtractParameter("cmTestID");
	}

	if (cm.cg.indexOf("null") > -1) { cm.pv14 = cm.cg; cm.cg = "NullValue"; }
	if (cm.cg.indexOf("||") > -1) { cm.pv14 = cm.cg; cm.cg = "DoublePipe"; }
	if (cm.cg.charAt(0) == "|") {  cm.pv14 = cm.cg; cm.cg = "LeadingPipe"; }
	if (countOf(cm.cg, "|") > 14) { cm.pv14 = cm.cg; cm.cg = "TooLong"; }
	if (cm.cg.indexOf("RESET") > -1) { cm.pv14 = cm.cg; cm.cg = "Reset"; }
	if (cm.cg.length > 100) { cm.pv14 = cm.cg.substring(0,100); cm.cg = "TooLong";}

	//additional filters to remove invalid categories
	cm.cg = cm.cg.toUpperCase();

	if (cm.cg.indexOf("BAG|") > -1) {
		if ((cm.cg != "BAG|CROSSSELL") && (cm.cg.indexOf("BAG|0") != 1)) {
			cm.cg = "BAG|INVALID";
		}
	}
	if (cm.cg.indexOf("BAG LOOKUP|") > -1) {
		if (cm.cg != "BAG LOOKUP|CROSSSELL") {
			cm.cg = "BAG LOOKUP|INVALID";
		}
	}
	if (cm.cg == "BAG LOOKUP") {
		cmCreatePageviewTag("BAG LOOKUP","BAG LOOKUP");
		return;
	}
	cm.pv15 = cmExtractParameter("jcpvid",cI("JCPSession"));
	cm.ul = cmSetPOSCookie();

	cm.pv5 = cmPadString(cI("JCPSession","StoreNumber",""));
	cm.pv6 = cI("JCPSession","TerminalNumber","");
	cm.pv7 = cmPadString(cI("JCPSession","AssociateNumber","")); 
	cm.pv8 = cI("JCPSession","StoreZipCode","");
	cm.pv9 = cI("JCPSession","DeviceType","");

	//add Guided Navigation attributes
	cm.pv_a5 = topDimension;
	cm.pv_a6 = topDimensionValue;
	cm.pv_a7 = dimensionCombo;
	cm.pv_a8 = dimensionComboValue;
	cm.pv_a9 = currentDimension;
	cm.pv_a10 = currentDimensionValue;

	if (cmCSClientID && (cm_ClientID != cmPOSClientID)) {
		cm.ci = cmCSClientID;
		cm.writeImg();
	}
	if (cm_ClientID == cmPOSClientID) {
		cm.ci = cm_ClientID;
		if (cmSSClientID) {
			cm.cg = originalCategory;
		}
		cm.writeImg();
	}
	if (cmSSClientID && (cm_ClientID != cmPOSClientID)) {
		cm.ci = cmSSClientID;
		if (cmCheckKiosk()) {
			cm.ci = cm.ci + ";" + cmKioskClientID;
		}
		cm.cg = originalCategory;
		cm.writeImg();
	}
}

function cmCreateProductviewTag(productID, productName, origID, typeFlag, posID, pageCount, catID, storeItemFlag, searchString, solutionSiteFlag, numSearchResults, searchRefineResults, topDimension, topDimensionValue, dimensionCombo, dimensionComboValue, currentDimension, currentDimensionValue ) {
	var originalCategory = catID;
	var cm = new _cm("tid", "5", "vn2", "e4.0");

	cm.pv1 = storeItemFlag;
	cm.pv2 = solutionSiteFlag;
	if (searchString) {
		cm.se = searchString;
		cm.sr = numSearchResults;
	}

	if (productName == null) {
		productName = "";
	}

	cm.pr = productID;
	cm.pm = productName;

	var t_value = cmExtractParameter("cmAMS_T");
	var c_value = cmExtractParameter("cmAMS_C");
	if ((cmIndexOfParameter("CatNum") > 0) && (cmIndexOfParameter("JSEnabled") > 0)) {
		cm.cg = cmCalculateCategory("EOB",1);
		cm.cl = "EOB";
	}
	else if ((cmIndexOfParameter("CatNum") > 0) && (cmIndexOfParameter("JSEnabled") == -1)) {
		cm.cg = cmCalculateCategory("Bag Lookup",1);
		cm.cl = "Bag Lookup";
	}
	else if ((cmIndexOfParameter("cmBagLookup") > 0)) {
		cm.cg = cmCalculateCategory("Bag Lookup",1);
		cm.cl = "Bag Lookup";
	}
	else if ((cmIndexOfParameter("RefPage=NetPerceptions2.inc") > 0) && (document.referrer.toUpperCase().indexOf("/JCP/BAG") > 0 )){
		cm.cg = cmCalculateCategory("BAG",1);
		cm.cl = "BAG";
	}
	else if ((t_value) && (c_value)) {
		if (cmExtractParameter("GrpTyp") == "ENS") {
			cm.cg = cmCalculateCategory(t_value + "_" + c_value + "_" + productID);
		}
		else {
			cm.cg = cmCalculateCategory(t_value + "_" + c_value);
			cm.cl = "Container: " + t_value + "_" + c_value;
		}
		cm.pv10 = t_value;
		cm.pv11 = c_value;
		cm.pv12 = catID;
		var globalNavPattern = /D[0-9]/;
		if (globalNavPattern.test(c_value)) {
			cm.pv13 = "GLOBALNAV";
		} else {
			cm.pv13 = cmExtractParameter("cmcatid",window.location.href.toLowerCase());
		}
		cm.pv_a1 = cm.pv10;
		cm.pv_a2 = cm.pv11;
		cm.pv_a3 = cmExtractParameter("cmAMS_V");
		cm.pv_a4 = cmExtractParameter("cmAMS_Z");

	}
	else {
		// code to handle coming in from an external link
		var externalCat = cmExtractParameter("cmCat");
		var existingCat = cI("cmCat");
		if (!(existingCat) && (document.referrer.toLowerCase().indexOf(homePageString) == -1)) {
			if (externalCat) {
				categoryID = "EXTERNAL|" + externalCat;
			}
			else {
				categoryID = "EXTERNAL";
			}
			cm.cg = cmCalculateCategory(categoryID);
		}
		else {
			cm.cg = cmCalculateCategory(null);
		}
	}

	if (pageCount && (pageCount == "N")) {
		cm.pc = "N"
	}
	else {
		cm.pc = "Y";
	}

	if (origID) { 
		cm.li = 50;
		cm.ps1 = origID;
		cm.ps4 = productID;
		// originating catID
		cm.ps5 = cm.cg;
		if (typeFlag && typeFlag.toLowerCase() == 'richrel') {
			cm.cg += "|RichRel";
			cm.cl = "RichRelevance";
		}
		else {
			cm.cg += "|Crosssell";
			cm.cl = "Crosssell";
		}
		cm.ps6 = cmExtractParameter("ItemID");
	}
	if (typeFlag) { 
		cm.ps2 = typeFlag;
	}
	if (posID) { 
		cm.ps3 = posID; 
	}
	
	cm.pi = "PRODUCT: " + productName + " (" + productID + ")";

	if (cm.cg) {
		if (cm.cg.indexOf("null") > -1) { cm.pv14 = cm.cg; cm.cg = "NullValue"; }
		if (cm.cg.indexOf("||") > -1) { cm.pv14 = cm.cg; cm.cg = "DoublePipe"; }
		if (cm.cg.charAt(0) == "|") {  cm.pv14 = cm.cg; cm.cg = "LeadingPipe"; }
		if (cm.cg.indexOf("RESET") > -1) { cm.pv14 = cm.cg; cm.cg = "Reset"; }
		if (countOf(cm.cg, "|") > 14) { cm.pv14 = cm.cg; cm.cg = "TooLong"; }
		if (cm.cg.length > 100) { cm.pv14 = cm.cg.substring(0,100); cm.cg = "TooLong";}

		//additional filters to remove invalid categories
		cm.cg = cm.cg.toUpperCase();

		if (cm.cg.indexOf("BAG|") > -1) {
			if ((cm.cg != "BAG|CROSSSELL") && (cm.cg.indexOf("BAG|0") != 1)) {
				cm.cg = "BAG|INVALID";
			}
		}
		if (cm.cg.indexOf("BAG LOOKUP|") > -1) {
			if (cm.cg != "BAG LOOKUP|CROSSSELL") {
				cm.cg = "BAG LOOKUP|INVALID";
			}
		}
		if (cm.cg == "BAG LOOKUP") {
			cmCreatePageviewTag("BAG LOOKUP","BAG LOOKUP");
			return;
		}
	}
	cm.pv15 = cmExtractParameter("jcpvid",cI("JCPSession"));
	cm.ul = cmSetPOSCookie();

	cm.pv5 = cmPadString(cI("JCPSession","StoreNumber",""));
	cm.pv6 = cI("JCPSession","TerminalNumber","");
	cm.pv7 = cmPadString(cI("JCPSession","AssociateNumber",""));
	cm.pv8 = cI("JCPSession","StoreZipCode","");
	cm.pv9 = cI("JCPSession","DeviceType","");

	//add Guided Navigation attributes
	var attributes = new Array;
	attributes[0] = attributes[1] = attributes[2] = attributes[3] = "";
	cm.pv_a5 = cm.pr_a5 = attributes[4] = topDimension;
	cm.pv_a6 = cm.pr_a6 = attributes[5] = topDimensionValue;
	cm.pv_a7 = cm.pr_a7 = attributes[6] = dimensionCombo;
	cm.pv_a8 = cm.pr_a8 = attributes[7] = dimensionComboValue;
	cm.pv_a9 = cm.pr_a9 = attributes[8] = currentDimension;
	cm.pv_a10 = cm.pr_a10 = attributes[9] = currentDimensionValue;

	attributes = attributes.join("-_-");

	cmStoreProductAttributes("pr", cm.pr, null, attributes);

	if (cmIndexOfParameter("cmTestID") > -1) {
		cm.li = "333";
		cm.ps2 = cmExtractParameter("cmTestID");
	}

	var tempRef = cmExtractParameter("cmRef", window.location.href);
	if (tempRef != null) {
		cm.rf = tempRef;
	}

	if (cmCSClientID && (cm_ClientID != cmPOSClientID)) {
		cm.ci = cmCSClientID;
		cm.writeImg();
	}
	if (cm_ClientID == cmPOSClientID) {
		cm.ci = cm_ClientID;
		if (cmSSClientID) {
			cm.cg = originalCategory;
		}
		cm.writeImg();
	}
	if (cmSSClientID && (cm_ClientID != cmPOSClientID)) {
		cm.ci = cmSSClientID;
		if (cmCheckKiosk()) {
			cm.ci = cm.ci + ";" + cmKioskClientID;
		}
		cm.cg = originalCategory;
		cm.writeImg();
	}

	if (searchRefineResults) {
		var cm2 = new _cm("tid", "7", "vn2", "e4.0");
		cm2.li = "501";
		cm2.ps1 = cm.pi;
		cm2.ps2 = originalCategory;
		cm2.ps3 = productID;
		cm2.ps4 = searchString;
		cm2.ps5 = numSearchResults;
		cm2.ps6 = searchRefineResults;
		cm2.writeImg();
	}
}




var cmProductID = new Array();
var cmProductQuantity = new Array(); 
var cmProductPrice = new Array();
var cmCategoryID = new Array();
var cmLotNumber = new Array();
var cmPromocode = new Array();
var cmInventoryStatus = new Array();
var cmProductName = new Array();
var cmCustomerID = "";
var cmOrderID = "";
var cmOrderTotal = "";
var cmShopCounter = 0;
var cmOrderSKUString = "";

function cmGetProductIndex(prodID){
	var i =0;
	for (i=0; i<cmShopCounter; i++)
	{
		if (prodID==cmProductID[i])
		{
			return i;
		}
	}
	return -1;
}

function cmCreateShopAction5Tag(productID, productQuantity, productPrice, 
				lot_number, promocode, inventory_status, productName) {

	var cmTempProductPrice = cmFormatPrice(productPrice);

	if (productID == "") {
		productID = lot_number;
	}
	productID = productID.toUpperCase();
	if (inventory_status == "NA") {
		return;
	}
	var index = cmGetProductIndex(productID);
	if(index!=-1){
		var oldPrice = cmProductPrice[index];
		var oldQty = cmProductQuantity[index];
		var newQty = oldQty + parseInt(productQuantity);
		var newPrice = (oldPrice*oldQty + parseInt(productQuantity)*parseFloat(cmTempProductPrice))/(newQty);

		cmProductPrice[index] = newPrice;
		cmProductQuantity[index] = newQty;
		cmLotNumber[index] += "|" + lot_number + "|" + parseInt(productQuantity) + "|";

	} else {

		cmProductID[cmShopCounter] = productID;
		cmProductQuantity[cmShopCounter] = parseInt(productQuantity);
		cmProductPrice[cmShopCounter] = parseFloat(cmTempProductPrice);
		cmLotNumber[cmShopCounter] = "|" + lot_number + "|" + parseInt(productQuantity) + "|";
		cmPromocode[cmShopCounter] = promocode;
		cmInventoryStatus[cmShopCounter] = inventory_status;
		cmProductName[cmShopCounter] = productName;
		cmShopCounter++;
	}
}

function cmDisplayShop5s(){
	var i;
	for(i=0; i<cmShopCounter;i++){
		var cm = new _cm("tid", "4", "vn2", "e4.0");
		cm.at = "5";
		cm.pr = cmProductID[i]; 
		cm.pm = cmProductName[i];
		cm.cg = cmCategoryID[i];
		cm.qt = cmProductQuantity[i] ;
		cm.bp = cmProductPrice[i];
		cm.sx1 = cmLotNumber[i];
		cm.sx2 = cmPromocode[i];
		cm.sx3 = cmInventoryStatus[i];
		cm.pc = "N";
		cm.sx10 = cmPadString(cI("JCPSession","StoreNumber",""));
		cm.sx11 = cI("JCPSession","TerminalNumber","");
		cm.sx12 = cmPadString(cI("JCPSession","AssociateNumber",""));
		cm.sx13 = cI("JCPSession","StoreZipCode","");
		cm.sx14 = cI("JCPSession","DeviceType","");
		cmSetProductAttributes("s5", cm);
		cmStoreProductAttributes("s5", cm.pr, null, cI("cmProdAtt", cm.pr));
		cm.writeImg();
	}
}

function cmCreateShopAction9Tag(productID, productQuantity, productPrice, 
				lot_number, orderID, customerID, orderTotal,
				promocode, inventory_status, productName) {
    var cmTempProductPrice = cmFormatPrice(productPrice);
    var cmTempOrderTotal = cmFormatPrice(orderTotal);

    if (productID == "") {
		productID = lot_number;
	}
	productID = productID.toUpperCase();
	if (inventory_status == "NA") {
		return;
	}
	var index = cmGetProductIndex(productID);
	if(index!=-1){
		var oldPrice = cmProductPrice[index];
		var oldQty = cmProductQuantity[index];
		var newQty = oldQty + parseInt(productQuantity);
		var newPrice = (oldPrice*oldQty + parseInt(productQuantity)*parseFloat(cmTempProductPrice))/(newQty);

		cmProductPrice[index] = newPrice;
		cmProductQuantity[index] = newQty;
		cmLotNumber[index] += "|" + lot_number + "|" + parseInt(productQuantity) + "|";
	} else {
		cmProductID[cmShopCounter] = productID;			
		cmOrderID = orderID;
		cmOrderTotal = cmTempOrderTotal;
		cmCustomerID = customerID;
		cmProductQuantity[cmShopCounter] = parseInt(productQuantity);
		cmProductPrice[cmShopCounter] = parseFloat(cmTempProductPrice);
		cmLotNumber[cmShopCounter] = "|" + lot_number + "|" + parseInt(productQuantity) + "|";
		cmPromocode[cmShopCounter] = promocode;
		cmInventoryStatus[cmShopCounter] = inventory_status;
		cmProductName[cmShopCounter] = productName;
		cmShopCounter++;
	}
}

function cmDisplayShop9s(){
	var i;
	for(i=0; i<cmShopCounter;i++){
		var cm = new _cm("tid", "4", "vn2", "e4.0");
		cm.at = "9";
		cm.pr = cmProductID[i]; 
		cm.pm = cmProductName[i];
		cm.cg = cmCategoryID[i];
		cm.qt = cmProductQuantity[i] ;
		cm.bp = cmProductPrice[i];
		cm.cd = cmCustomerID;
		cm.on = cmOrderID;
		cm.tr = cmOrderTotal;
		cm.sx1 = cmLotNumber[i];
		cm.sx2 = cmPromocode[i];
		cm.sx3 = cmInventoryStatus[i];

		cmOrderSKUString += "|" + cm.pr + "|" + cm.bp + "|" + cm.qt + "|";

		cm.sx10 = cmPadString(cI("JCPSession","StoreNumber",""));
		cm.sx11 = cI("JCPSession","TerminalNumber","");
		cm.sx12 = cmPadString(cI("JCPSession","AssociateNumber",""));
		cm.sx13 = cI("JCPSession","StoreZipCode","");
		cm.sx14 = cI("JCPSession","DeviceType","");

		cm.pc = "N";
		cmSetProductAttributes("s9", cm);
		cm.writeImg();
	}
}

function cmCreateOrderTag(orderID, customerID, orderTotal, orderShipping) {
		var cmTempOrderTotal = cmFormatPrice(orderTotal);
		var cm = new _cm("tid", "3", "vn2", "e4.0");
		cm.on = orderID;
		cm.tr = cmTempOrderTotal;
		cm.osk = cmOrderSKUString;
		cm.sg = orderShipping;
		cm.cd = customerID;

		cm.writeImg();
}

function cmCreateRegistrationTag(customerID, emailAddress, newsletterName, subscribed) {

	var cm = new _cm("tid", "2", "vn2", "e4.0");
	cm.cd = customerID;
	cm.em = emailAddress;

	if (newsletterName && subscribed) {
		cm.nl = newsletterName;
		cm.sd = subscribed;
	}
	
	cm.writeImg();
}

function cmCreateErrorTag(errorType) {
	var cm=new _cm("tid", "404", "vn2", "e4.0");  //DO NOT CHANGE THESE PARAMETERS

	if (errorType) { cm.ul = errorType; }
	cm.writeImg();
}

function getDefaultPageID() { 
	var pageName = window.location.pathname; 

	// eliminates everything after "?" (for Opera browswers)
	var tempIndex1 = pageName.indexOf("?");
	if (tempIndex1 != -1) {
		pageName = pageName.substring(0, tempIndex1);
	}
	// eliminates everything after "#" (for Opera browswers)
	var tempIndex2 = pageName.indexOf("#");
	if (tempIndex2 != -1) {
		pageName = pageName.substring(0, tempIndex2);
	}
	// eliminates everything after ";"
	var tempIndex3 = pageName.indexOf(";");
	if (tempIndex3 != -1) {
		pageName = pageName.substring(0, tempIndex3);
	}

	var slashPos = pageName.lastIndexOf("/");
	if (slashPos == pageName.length - 1) {
		pageName = pageName + "default.aspx"; /****************** SET TO DEFAULT DOC NAME */
	}

	while (pageName.indexOf("/") == 0) {
		pageName = pageName.substring(1,pageName.length);
	}

	return(pageName); 
} 

function cmIndexOfParameter (parameter, inString) {
	if (inString) return inString.toLowerCase().indexOf(parameter.toLowerCase());
	return document.URL.toLowerCase().indexOf(parameter.toLowerCase());
}

function cmExtractParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return null;
    }
	var s = location.search;
	if (inString) s = inString;
	var begin = s.indexOf(parameter) + 1;
	var end = s.indexOf("&", begin);
	if (end == -1) {
		end = s.length;
	}
	var middle = s.indexOf("=", begin);
	return s.substring(middle + 1, end).split("#",1).join("");
}

if (defaultNormalize == null) { var defaultNormalize = null; }

/* This normalization function takes a list of parameters and parses out
   all url parameters that ARE in that list.  This only handles the simple case of 
   basic url parameters in the query string.  */
function myNormalizeURL(url, isHref) {

    var newURL = url;
    
    if (isHref) {
	    var blackList = ["mscssid=", "iia=", "IIA=", "MSCSSID="];
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
	 
	    if (defaultNormalize != null) {
	        newURL = defaultNormalize(newURL, isHref);
	    }
	}	
    return newURL;
}

function cmCreateKioskPageviewTag(pageID, categoryID, storeItemFlag, priceCheckFoundFlag, lotnumber, kioskID, storeID) {


	if (cm_ClientID.toString().indexOf(cmKioskClientID.toString()) == -1) {
		cm_ClientID = cm_ClientID + ";" + cmKioskClientID;
	}

	var cm = new _cm("tid", "1", "vn2", "e3.1");

	cm.pi = pageID;
	cm.cg = categoryID;
	cm.pv1 = storeItemFlag;
	cm.pv3 = priceCheckFoundFlag;
	cm.pv4 = lotnumber;
	cm.pv5 = cmPadString(storeID);
	cm.pv6 = kioskID;
	cm.writeImg();

}

// install normalization
if (document.cmTagCtl != null) {
    var func = "" + document.cmTagCtl.normalizeURL;
    if (func.indexOf('myNormalizeURL') == -1) {
        defaultNormalize = document.cmTagCtl.normalizeURL;
        document.cmTagCtl.normalizeURL = myNormalizeURL;
    }
}

function cmCheckKiosk() {
	var tempValue = cI("JCPSession","DeviceType","");
	if (tempValue.toUpperCase().indexOf("K") > -1) {
		return true;
	}
	return false;
}

function cmCheckPOS() {
	var tempValue = cI("JCPSession","DeviceType","");
	if (tempValue.toUpperCase().indexOf("P") > -1) {
		return true;
	}
	return false;
}

function cmPadString(sNumber) {
	
	var InLength = sNumber.length;
	var OutLength = 4;

	if (InLength > 0 && InLength < OutLength)
	{
		for (i=InLength;i<OutLength;i++)
		{
			sNumber = "0" + sNumber;
		}
	}
	return sNumber;
}

function cmStoreProductAttributes(type, productID, categoryID, attributes) {
	productID = productID.toUpperCase();
	// set cookienames for where we store values
	var typeMap = {"pr" : "cmProdAtt", "s5" : "cmShop5Att"};

	if (type && productID && attributes && attributes !== "null") {
		//check if we will exceed max cookie lenght of 1024, if so, trim off leading value
		var tempValue = cI(typeMap[type]);

		if (!tempValue) { tempValue = ""; }

		if ((productID.length + attributes.length + 10 + tempValue.length) < 1024 ) {
			cmSetSubCookie(typeMap[type], productID, attributes);
		}
		else {
			while ((productID.length + attributes.length + 10 + tempValue.length) >= 1024 ) {
				tempValue = tempValue.substring(tempValue.indexOf("&") + 1);
			}
			var newCookieVal = tempValue + "&" + productID + "=" + attributes;
			CB(typeMap[type], newCookieVal);
		}
	}
}


function cmSetProductAttributes(type, tag) {
	// set cookienames for where we retrieve values
	var typeMap = {"s5" : "cmProdAtt", "s9" : "cmShop5Att"};
	var prefixMap = {"5" : "pr_a","4" : "s_a"};

	var tempValue = cI(typeMap[type], tag.pr.toUpperCase());

	if (tempValue) {
		tempValue = tempValue.split("-_-");
		var attrNum=tempValue.length;
		if (attrNum>15){
			attrNum=15;
		}
		for (i=0;i<attrNum;++i){
			tag[prefixMap[tag.tid] + (i + 1)]=tempValue[i];
		}
	}
}