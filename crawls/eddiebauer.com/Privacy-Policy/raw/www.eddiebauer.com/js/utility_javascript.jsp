
/*
 * Calling this function points tags to the production database
 */

var cm_ClientID="30000102";
cm_TrackLink        = "A";
var dtmSrc = "";

function isKioskMode(){
    var isKioskMode = 'false';
    return isKioskMode;
}

function createDTMAbandonPageTag(promoId, userId, categoryId, imgURL, prodId)  {
  
}

function createDTMTransactionPageTag(transId, userId, convValue, dtmitems)  {
  
}

function timeOutDotomi() { document.getElementById("dtmdiv").innerHTML = "";}

function cmSetProduction(){
	cm_HOST="data.coremetrics.com/eluminate?";
	// cm_HOST="testdata.coremetrics.com/eluminate?";
}

var pageURL = location.href.toLowerCase();
   if ('true' == 'true')
   {
   	cm_ClientID = "30000102";
   	cmSetProduction();
   }
   else if ('false'  == 'true')
   {
   	cm_ClientID = "30000102";
   	cm_HOST="testdata.coremetrics.com/eluminate?";
   }
  /* else if  ('false'  == 'true')
   {
   	cm_ClientID = "60000102";
   	cm_HOST="testdata.coremetrics.com/eluminate?";
   }
	else if  ('false'  == 'true')
   {
   	cm_ClientID = "90082045";
   	cm_HOST="testdata.coremetrics.com/eluminate?";
   }
	else if  ('false'  == 'true')
   {
   	cm_ClientID = "90062043";
   	cm_HOST="testdata.coremetrics.com/eluminate?";
   }
	else if  ('false'  == 'true')
   {
   	cm_ClientID = "90062180";
   	cm_HOST="testdata.coremetrics.com/eluminate?";
   }
   else if  ('false'  == 'true')
   {
   	cm_ClientID = "90062043";
   	cm_HOST="testdata.coremetrics.com/eluminate?";
   }  */
	else
   {
   	cm_ClientID = "60000102";
   	cm_HOST="testdata.coremetrics.com/eluminate?";
   }

function GetCMToolID(){
	var cmToolID = "";
	return cmToolID;
}

function GetCMInitCat(){
	var cmInitCat = "";
	return cmInitCat;
}

function GetCMCatID(){
	var cmCatID = "";
	return cmCatID;
}


function CMTrackingEnsemble(url){
	var cmToolID = GetCMToolID();
	var cmInitCat = GetCMInitCat();
	var cmCatID = GetCMCatID();
	var CM_ReferringURL;
	CM_ReferringURL = window.location.href;
	CM_ReferringURL = CM_ReferringURL.split("&referringurl=");
   CM_ReferringURL = CM_ReferringURL[0].split("?referringurl=");

	/*if (((cmToolID!='') && (cmInitCat!='')) || (cmCatID!='')){
		//Get Tool ID and intial category for tracking
		if ((cmCatID!='') && (cmInitCat=='') && (cmToolID=='')) {
			if (cmCatID.indexOf('T')>-1){
				arrCMTemp = cmCatID.split('C');
				if (arrCMTemp.length>1) {
					cmToolID = arrCMTemp[0];
					cmToolID = cmToolID.substring(1,cmToolID.length);
					cmInitCat = arrCMTemp[1];
				}
			}
		}
		//Update Link

		if (url.indexOf('?')>-1){
			url = url + '&tid=' +  cmToolID + '&c=' + cmInitCat + '&referringurl=' + escape(CM_ReferringURL);
//alert('1');
		}
		else{
			url = url + '?tid=' + cmToolID + '&c=' + cmInitCat + '&referringurl=' + escape(CM_ReferringURL);
//alert('2');
		}
	}
	else
	{
		if (url.indexOf('?')>-1){
			url = url + '&referringurl=' + escape(CM_ReferringURL);
		}
		else{
		url = url + '?referringurl=' + escape(CM_ReferringURL);
		}
	}*/
	//Redirect
//alert(url);
//	document.location.href=url;
}

function CMTracking(url){
	CMTrackingEnsemble(url);
	document.location.href=url;
}

function CMTrackingURL(url){
	var cmToolID = GetCMToolID();
	var cmInitCat = GetCMInitCat();
	var cmCatID = GetCMCatID();
	var CM_ReferringURL;
	CM_ReferringURL = window.location.href;
	CM_ReferringURL = CM_ReferringURL.split("&referringurl=");
   CM_ReferringURL = CM_ReferringURL[0].split("?referringurl=");

	if (((cmToolID!='') && (cmInitCat!='')) || (cmCatID!='')){
		//Get Tool ID and intial category for tracking
		if ((cmCatID!='') && (cmInitCat=='') && (cmToolID=='')) {
			if (cmCatID.indexOf('T')>-1){
				arrCMTemp = cmCatID.split('C');
				if (arrCMTemp.length>1) {
					cmToolID = arrCMTemp[0];
					cmToolID = cmToolID.substring(1,cmToolID.length);
					cmInitCat = arrCMTemp[1];
				}
			}
		}
		//Update Link
		if (url.indexOf('?')>-1){
			url = url + '&tid=' +  cmToolID + '&c=' + cmInitCat + '&referringurl=' + escape(CM_ReferringURL);
		}
		else{
			url = url + '?tid=' + cmToolID + '&c=' + cmInitCat + '&referringurl=' + escape(CM_ReferringURL);
		}
	}
	return url;
}

function SetCookie (name,value,expires,path,domain,secure) {
    var contextPathString = '/';
    if (path == null && contextPathString) {
        path = contextPathString;
    }

   // set time, it's in milliseconds
   	var today = new Date();
   	today.setTime( today.getTime() );

   	/*
   	if the expires variable is set, make the correct
   	expires time, the current script below will set
   	it for x number of days, to make it for hours,
   	delete * 24, for minutes, delete * 60 * 24
   	*/
   	if ( expires )
   	{
   	expires = expires * 1000 * 60 * 60 * 24;
   	}
   	var expires_date = new Date( today.getTime() + (expires) );

  		document.cookie = name + "=" + value +
		 ((expires) ? "; expires=" + expires_date.toGMTString() : "") +
		 ((path) ? "; path=" + path : "") +
		 ((domain) ? "; domain=" + domain : "") +
		 ((secure) ? "; secure" : "");
}

function GetCookie( name ) {
    var start = document.cookie.indexOf( name + "=" );
    var len = start + name.length + 1;
    if (!start && name != document.cookie.substring( 0, name.length ) ) {
        return null;
    }
    if ( start == -1 ) return null;
    var end = document.cookie.indexOf( ";", len );
    if ( end == -1 ) end = document.cookie.length;
    return unescape( document.cookie.substring( len, end ) );
}

function DelCookie (name, path, domain) {
    var contextPathString = '/';
    if (path == null && contextPathString) {
        path = contextPathString;
    }

// The function simply checks to see if the cookie is set.
// If so, the expiration date is set to Jan. 1st 1970.
	if ( GetCookie( name ) ){
	 document.cookie = name + "=" +
( ( path ) ? ";path=" + path : "") +
( ( domain ) ? ";domain=" + domain : "" ) +
";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
}

function showTabCom(objComDivId) {
     var imgPath = "/assets/images/shopping/";
     var objComDivArr = new Array("tab-more-info","tab-files","tab-email-friend","tab-products");
     for (i = 0; i < objComDivArr.length; i++) {
          if (document.getElementById(objComDivArr[i] + "-img")) {
               document.getElementById(objComDivArr[i] + "-img").src = imgPath + objComDivArr[i] + "-off.gif";
               document.getElementById(objComDivArr[i]).style.display = "none";
          }
     }
     document.getElementById(objComDivId + "-img").src = imgPath + objComDivId + ".gif";
     document.getElementById(objComDivId).style.display = "block";
}

utilityBrowserVer = parseInt(navigator.appVersion);

function imgOn(imgName) {
  	if (utilityBrowserVer >= 3) {
		imgOnString = eval(imgName + "_on.src");
		document.images[imgName].src = imgOnString;
	}
}

function imgOff(imgName) {
	if (utilityBrowserVer >= 3) {
		imgOffString = eval(imgName + "_off.src");
		document.images[imgName].src = imgOffString;
	}
}

function goToLink(address) {
	var linkURL = address.options[address.selectedIndex].value;
	window.top.location.href = linkURL;
	address.selectedIndex=0;
}

function changeLocation(newLoc) {
	window.location.href =newLoc;
}

/*
 * This function launches a new web browser window to a specified width, height and features.
 * Features string is a comma separated window's feature needed for this new window. For Instance
 * If a new window needs a toolbar the feature string must be "toolbar" like needs scroll bar and
 * and toolbar then it must be "toolbar,scrollbar". Note that the order of the feature is not required.
 * Also it's case insensitive. Therefore, "scrollbar,toolbar" is identical to "Toolbar,ScrollBar".
 *
 * If the features string is ommitted then all the features are turned off. To turn all the features on
 * use the word "all" for features instead of specifying each feature.
 */

function openWindow(address, width, height,features)
{
	/* Find out what features need to be enable
	 *
   */
	if(features)
		features = features.toLowerCase();
	else
		features = "";

	var toolbar = (features == "all" ? 1 : 0);
	var menubar = (features == "all" ? 1 : 0);
	var location = (features == "all" ? 1 : 0);
	var directories = (features == "all" ? 1 : 0);
	var status = (features == "all" ? 1 : 0);
	var scrollbars = (features == "all" ? 1 : 0);
	var resizable = (features == "all" ? 1 : 0);


	if(features != "all")
	{
		//split features
		var feature = features.split(",");
		for(i = 0; i < feature.length; i++)
		{
		 	if(feature[i] == "toolbar")
			   toolbar = 1;
			else if(feature[i] == "menubar")
			   menubar = 1;
			else if(feature[i] == "location")
			   location = 1;
			else if(feature[i] == "directories")
			   directories = 1;
			else if(feature[i] == "status")
			   status = 1;
			else if(feature[i] == "scrollbars")
			   scrollbars = 1;
			else if(feature[i] == "resizable")
			   resizable = 1;
		}

	}
	features = "toolbar=" + toolbar + ",";
	features += "menubar=" + menubar + ",";
	features += "location=" + location + ",";
	features += "directories=" + directories + ",";
	features += "status=" + status + ",";
	features += "scrollbars=" + scrollbars + ",";
	features += "resizable=" + resizable;

	var newWindow = window.open(address, 'Popup_Window', 'width=' + width + ',height=' + height + ',"' + features + '"');
	newWindow.focus();
}

function confirmWindow(url, text) {

	if (confirm(text)) {
		window.go = url;
		window.location = url;
	}
}

function setAddTo(addToType) {
	document.productForm.addTo.value = addToType;
}

// This is an example of sending product data from the server
// to the client, then formatting the variants on the client-side
// based on certain criteria.
function cbFormatter(list, attribute, opt)
{
	// Get the price for this variant.. If this is the primary list, get all related
	// variants from the group and get their prices as well so we can build a range.
	var pvds = list.productVariantDropdownSupport;

	// Get all of the product variants for this attribute
	var variantGroup = attribute.getVariant().getProductVariantGroup();
	var groupVariants = variantGroup.getAllVariants();

	// Are all of the prices the same within the group?
	var lowGroupPrice = 999999.00;
	var highGroupPrice = -1.00;

	for (var idx = 0; idx < groupVariants.length; idx++)
	{
      lowGroupPrice = groupVariants[idx].numericPrice < lowGroupPrice ? groupVariants[idx].numericPrice : lowGroupPrice;
		highGroupPrice = groupVariants[idx].numericPrice > highGroupPrice ? groupVariants[idx].numericPrice : highGroupPrice;
   }

	// Are all of the prices the same within the variant?
	var variants = variantGroup.getVariantsMatching(attribute.name, attribute.value);
	var lowVariantPrice = 999999.00;
	var highVariantPrice = -1.00;

	var lowVariantDisplay = variants[0].displayPrice;
	var highVariantDisplay = variants[0].displayPrice;

   for (var idx = 0; idx < variants.length; idx++)
   {
		// Display really needs to be done before the re-assignment...
      lowVariantDisplay = variants[idx].numericPrice < lowVariantPrice ? variants[idx].displayPrice : lowVariantDisplay;
      lowVariantPrice = variants[idx].numericPrice < lowVariantPrice ? variants[idx].numericPrice : lowVariantPrice;
      highVariantDisplay = variants[idx].numericPrice > highVariantPrice ? variants[idx].displayPrice : highVariantDisplay;
		highVariantPrice = variants[idx].numericPrice > highVariantPrice ? variants[idx].numericPrice : highVariantPrice;
   }

	if (lowGroupPrice != highGroupPrice)
	{
		// Primary list should display a range
		if (pvds.isPrimary)
			if (lowVariantPrice != highVariantPrice)
				opt.text = opt.text + " " + lowVariantDisplay + " - " + highVariantDisplay;
			else
				opt.text = opt.text + " " + attribute.getVariant().displayPrice;
		else  // Secondary lists should show exact price
			opt.text = opt.text + " " + attribute.getVariant().displayPrice;
	}

   return opt;
}

/* This function is called when a subject is changed so that actual subject text can be
* stored in to a hidden subject field. Since value of the subject list is a keyword define
* in the command configuration file to identify it's email address.
*/
function setSubject(thisRef)
{
    var formRef = document.forms["contactUsForm"];
    //set subject value
    formRef.elements["subject"].value = (thisRef.options[thisRef.selectedIndex]).text;
}

/* Purpose:endeca search redirect, function used in header, left nav, no results page etc
*/
function search(formName,keywordFieldName,catdimensionFieldName){
    var keywords = document.forms[formName].elements[keywordFieldName].value;
    var deptSelector = document.forms[formName].elements[catdimensionFieldName];
    var department='0'; //default
    var name = 'All';

    var deptFlag = "";
    if ((deptSelector!==null) && (deptSelector.length>0)){
        department = deptSelector[deptSelector.options.selectedIndex].value;
        name = deptSelector[deptSelector.options.selectedIndex].text;
        deptFlag = "&sel=1";
    }
    
    var noResultsCatIdParam = "";
    var noResultsCatIdFld = document.forms[formName].elements['noResultsCatId'] ; 
    if (noResultsCatIdFld !== null){
    	var noResultsCatIdParamValue = noResultsCatIdFld.value ;
	    if ((noResultsCatIdParamValue!==null) && (noResultsCatIdParamValue.length>0)){
    	   	noResultsCatIdParam = "&noResultsCatId=" + noResultsCatIdParamValue ;
    	}
	}
    
    var url = "";
    resetCookie('srch_cmp_products','',1);
    if (keywords != "") {
    	  sku = detectSkuPattern(keywords);
    	  if(sku != ""){
    	    resetCookie('EOB_Search',keywords, 1);
    	  	processEOBSKU(sku);
    	  	return false;
		  } else {
			  keywords = encodeURIComponent(keywords);

			  url = "catalog/search.jsp?N=" + department + "&Ntk=IALL&Ntt=" + keywords + "&Nr=REG%3aY" + "&Nty=1&Ntx=mode+matchpartialmax&D=" + keywords + "&Dx=mode+matchpartialmax&cm_se=" + keywords + "_" + name + "&init=1" + deptFlag + noResultsCatIdParam;
			  if (!isNaN(keywords)) url += "&skuSearch=Y";
			  location.href = "http://www.eddiebauer.com/" + url + "";
			  return false;
		 }
    }else{
        if (keywords==''){
            alert('Please enter a keyword.');
        }
        return false;
    }
}

function searchEndeca(formName,keywordFieldName,catdimensionFieldName, path){
	var keywords = document.forms[formName].elements[keywordFieldName].value;
	var deptSelector = document.forms[formName].elements[catdimensionFieldName];
	var department='0'; //default
	var name = 'All';
	var deptFlag = "";
	if ((deptSelector!==null) && (deptSelector.length>0)){
		department = deptSelector[deptSelector.options.selectedIndex].value;
		name = deptSelector[deptSelector.options.selectedIndex].text;
		deptFlag = "&sel=1";
	}
	var url = "";
	resetCookie('srch_cmp_products','',1);
	if (keywords != "") {
		sku = detectSkuPattern(keywords);
		if(sku != ""){
			processEOBSKU(sku);
			return false;
		} else {
			keywords = encodeURIComponent(keywords);
			url = "catalog/search.jsp";
			//path = path + "?dest=EndecaSearch&N=" + department + "&Ntk=IALL&Ntt=" + keywords + "&Nr=REG%3aY" + "&Nty=1&Ntx=mode+matchpartialmax&D=" + keywords + "&Dx=mode+matchpartialmax&cm_se=" + keywords + "_" + name + "&init=1" + deptFlag;
			url = url + "?N=" + department + "&Ntk=IALL&Ntt=" + keywords + "&Nr=REG%3aY" + "&Nty=1&Ntx=mode+matchpartialmax&D=" + keywords + "&Dx=mode+matchpartialmax&cm_se=" + keywords + "_" + name + "&init=1" + deptFlag;

			if (!isNaN(keywords))
				url += "&skuSearch=Y";

			path += "?env=unsecure&dest=" + encodeURIComponent(url);
			document.endecaSearchForm.action = path;
			document.endecaSearchForm.method = "POST";
			return true;
		 }
	} else {
		if (keywords==''){
			 alert('Please enter a keyword.');
		}
		return false;
	}
}

function detectSkuPattern(keyword){
		var cleanedKeyword =  replace(keyword, " ", "");
		cleanedKeyword = replace(cleanedKeyword, "#", "");
		cleanedKeyword = replace(cleanedKeyword, "-", "") ;

		var reg = new RegExp("\\w{1,}\\d{2,}\\d{3,}\\w{4,}");
		if (reg.test(cleanedKeyword)){
		  return cleanedKeyword;
		}else{
  			return "";
  		}

}

function processEOBSKU(sku){
	if (sku != "" && sku.length > 9) {
		dept = sku.slice(0, 3);
		effort = sku.slice(3, 6);
		item = sku.slice(6, 10);
		var formatErrorsKey = validateSkuFormatClient(dept, effort, item);
		sendEOBToPage(dept, effort, item, formatErrorsKey, "Previous Page");
	}
}


/* read cookies
*/
function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
	}
	return null;
}

/* Create Cookie
*/
function createCookie(name,value,days) {
    var path = '/';

	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else expires = "";
	document.cookie = name+"="+value+expires+"; path=" + path;
}

/* Clear Cookie
*/
function resetCookie(cookieName,cookieValue,duration){
    createCookie(cookieName,cookieValue,duration);
}

/*
 * Modifies the Country dropdown box, based on value
 * selected in the state dropdown box.
 */
function ChangeCountryByState(stateCode, countryFieldId) {
    var optionValue = "";

    if (stateCode == "AB" || stateCode == "BC" || stateCode == "MB"
             || stateCode == "NB" || stateCode == "NL" || stateCode == "NS"
             || stateCode == "NT" || stateCode == "NU" || stateCode == "ON"
             || stateCode == "PE" || stateCode == "QC" || stateCode == "SK"
             || stateCode == "YT") {
        optionValue = "CAN";
    } else if (stateCode == "C1" || stateCode == "C2" || stateCode == "C3"
             || stateCode == "C4" || stateCode == "C5" || stateCode == "C6"
             || stateCode == "") {
        optionValue = "";
    } else {
        optionValue = "USA";
    }

    if (document.getElementById) {
        var element = document.getElementById(countryFieldId);

        if (element) {
            element.value = optionValue;
        }
    } else if (document.all) {
        var element = document.all[countryFieldId];

        if (element) {
            element.value = optionValue;
        }
    } else if (document.layers) {
        var element = document.layers[countryFieldId];

        if (element) {
            element.value = optionValue;
        }
    }

	if (stateCode == "AA" || stateCode == "AE" || stateCode == "AP") {
		// Enable the div.
		// Print the Text "United States is the appropriate choice for military addresses."
		textDivElement = document.getElementById("millitary_address_text");
		textDivElement.style.display = "block";
	} else {
		// Disable the div
		// Remove the Text.
		textDivElement = document.getElementById("millitary_address_text");
		textDivElement.style.display = "none";
	}
}

/*
 * Modifies the State dropdown box, based on value
 * selected in the Country dropdown box.
 */
function ChangeStateByCountry(countryCode, stateFieldId) {
    var optionValue = "";

    if (countryCode == "CAN" || countryCode == "USA" || countryCode == "") {
       optionValue = "";
    } else {
        optionValue = "C6";
    }

    if (document.getElementById) {
        var element = document.getElementById(stateFieldId);

        if (element) {
            element.value = optionValue;
        }
    } else if (document.all) {
        var element = document.all[stateFieldId];

        if (element) {
            element.value = optionValue;
        }
    } else if (document.layers) {
        var element = document.layers[stateFieldId];

        if (element) {
            element.value = optionValue;
        }
    }
}

/*
 * Set the Country dropdown box, value as United States
 * if its value is "click to select" when page is loaded.
 */
function loadCountry(countryFieldId) {
    if (document.getElementById) {
        var element = document.getElementById(countryFieldId);

        if (element && (element.value == "" || element.value == null)) {
            element.value = "";
        }
    } else if (document.all) {
        var element = document.all[countryFieldId];

        if (element && (element.value == "" || element.value == null)) {
            element.value = "";
        }
    } else if (document.layers) {
        var element = document.layers[countryFieldId];

        if (element && (element.value == "" || element.value == null)) {
            element.value = "";
        }
    }
}

/*
* autotab feature used by all eob entry forms
*/
function eobAutotab(originalFld,destinationFld,num){
    var original=document.getElementById(originalFld);
    var destination=document.getElementById(destinationFld);
    if (original.value.length==num){
        document.getElementById(originalFld).value = original.value.toUpperCase();
        destination.focus();
        destination.select();
    }
}

function getBaseURL() {
	var isSecure = 'false';
	if(isSecure == "true"){
		return 'https://www.eddiebauer.com';
	} else {
		return 'http://www.eddiebauer.com';
	}
}

function getSecureBaseURL() {
	return 'https://www.eddiebauer.com';
}

function getImageBaseURL(){
    return 'http://s7d2.scene7.com/is/image/EddieBauer/';
}

function getShoppingBagUrl() {
	var isSecure = 'false';

if(isSecure == "true"){
		return 'https://www.eddiebauer.com/checkout/bag.jsp';
	} else {
	  return 'https://www.eddiebauer.com/checkout/bag.jsp';
   }
}

function getWishListPageUrl() {
	var isSecure = 'false';

	if(isSecure == "true"){
		return 'https://www.eddiebauer.com/user/wishlist.jsp';
	} else {
	  return 'https://www.eddiebauer.com/user/wishlist.jsp';
	}
}

function getModalsdir(){
var isSecure = 'false';

if(isSecure == "true"){
	return 'https://www.eddiebauer.com/ajax/';
} else {
	return 'http://www.eddiebauer.com/ajax/';
}
}

/*
 * popup a FAQ window and jump to the designated section
 */
function PopUpFAQ (section) {		
	var faqId = section.replace('#','');
	fb.start('/assets/html/modalContent/faq/faq_'+faqId+'.html', 'width:500');
}
/*
 * popup a window and jump to the designated section for emailing a wishlist
 */
function PopUpEmailWishlist(){
	 var url = 'https://www.eddiebauer.com/user/wishlist_email.jsp';
	 cmCreateManualLinkClickTag(url ,'Share your Wish List');
    openWindow(url, 600, 500, 'status,scrollbars,resizable');
}

/** On return key down, click the specified button...not the first button on page */
function returnKeyHandler(event, buttonId) {
    if (event) {
        // process only the Enter key
        if (event.keyCode == 13) {
            var buttonToClick = undefined;

            if (document.getElementById) {
                buttonToClick = document.getElementById(buttonId);
            } else if (document.all) {
                buttonToClick = document.all[buttonId];
            } else if (document.layers) {
                buttonToClick = document.layers[buttonId];
            }

            if (buttonToClick) {
                // cancel the default submit
                event.returnValue=false;
                event.cancel = true;
                // submit the form by programmatically clicking the specified button
                buttonToClick.click();
                return false;
            }
        }
    }

    return true;
}

function setFriendsAnchor()
{
	document.DeliveryExtrasForm.action= 'https://www.eddiebauer.com/checkout/delivery.cmd#friends';
	return true;
}

function setFormActions(form, formURI)
{
	var baseURI = '/';
	form.action = baseURI + formURI;
	return true;
}

function createCMPageTag(pageName, refUrl) {
}

function openWindow(address, width, height,features)
{
	/* Find out what features need to be enable
	 *
   */
	if(features)
		features = features.toLowerCase();
	else
		features = "";

	var toolbar = (features == "all" ? 1 : 0);
	var menubar = (features == "all" ? 1 : 0);
	var location = (features == "all" ? 1 : 0);
	var directories = (features == "all" ? 1 : 0);
	var status = (features == "all" ? 1 : 0);
	var scrollbars = (features == "all" ? 1 : 0);
	var resizable = (features == "all" ? 1 : 0);


	if(features != "all")
	{
		//split features
		var feature = features.split(",");
		for(i = 0; i < feature.length; i++)
		{
		 	if(feature[i] == "toolbar")
			   toolbar = 1;
			else if(feature[i] == "menubar")
			   menubar = 1;
			else if(feature[i] == "location")
			   location = 1;
			else if(feature[i] == "directories")
			   directories = 1;
			else if(feature[i] == "status")
			   status = 1;
			else if(feature[i] == "scrollbars")
			   scrollbars = 1;
			else if(feature[i] == "resizable")
			   resizable = 1;
		}

	}
	features = "toolbar=" + toolbar + ",";
	features += "menubar=" + menubar + ",";
	features += "location=" + location + ",";
	features += "directories=" + directories + ",";
	features += "status=" + status + ",";
	features += "scrollbars=" + scrollbars + ",";
	features += "resizable=" + resizable;

	var newWindow = window.open(address, 'Popup_Window', 'width=' + width + ',height=' + height + ',"' + features + '"');
	newWindow.focus();
}

/**
 * Given a text area "Object" it makes sure it is not longer than "MaxLen".  If it is, then
 * it will put "errorMessageText" in "errorMessageElementId"
 */
function imposeMaxLength(Object, MaxLen, errorMessageElementId, errorMessageText) {
    var errorDD = document.getElementById(errorMessageElementId);

    if (errorDD != null && errorDD != undefined) {
		 if ((Object.value.length <= MaxLen) && errorDD.childNodes && (errorDD.childNodes.length > 0)) {
			  errorDD.removeChild(errorDD.childNodes[0]);
		 } else if ((Object.value.length > MaxLen)) {
			  Object.value = Object.value.substring(0, MaxLen);

			  if (errorDD.childNodes && (errorDD.childNodes.length <= 0)) {
					var errorText = document.createTextNode(errorMessageText);
					errorDD.appendChild(errorText);
			  }
		 }
	} else {
		Object.value = Object.value.substring(0, MaxLen);
	}
}

/**
 * Launch Cheetah mail popup window
 */
function DIPage() {
   	openWindow('https://reg.cheetahmail.com/regp?aid=225355676&n=1&cm_shopid=&cm_clientid=30000102&cm_server=data.coremetrics.com/eluminate?', 488, 605, 'scrollbars,resizable');
    //openWindow('https://reg.cheetahmail.com/regp?aid=225355676&n=1&cm_shopid=&cm_clientid=60000102&cm_server=testdata.coremetrics.com', 488, 605, 'scrollbars,resizable');
}


function getStatusDescription(status, availQty){
var statusDescription = '';
if(status == 'IN'){
 var thresholdQty = '10';
 if(availQty < thresholdQty)
 statusDescription = 'Only a few left';
 else
 statusDescription = 'In Stock';

}
else if(status == 'SOLDOUT')
statusDescription = 'Sold Out';
else if(status == 'BO')
statusDescription = 'Ships by';

return statusDescription;
}


/** getInventoryMessaging(sttatus) is a provides the inventory description on the item added to cart layer page. */


function getInventoryMessaging(invStatus){
  var message = '';
   if(invStatus =='Only a few left'){
    message = 'We have low quantities of this item left in stock. Hurry! It won\'t be reserved until you complete the checkout process.';
  }else if(invStatus.indexOf('Ships by') >= 0){
     message = 'Due to popular demand, this item is on back order. Checkout with this item to reserve yours today - you won\'t be charged until it ships.';
  }
  return message;
}



function getSoldOutDescription(){
 return 'Sold Out';
}


function getBODescription(){
 return 'Ships by';
}

function getInStockDescription(){
 return 'In Stock';
}

function getInStockWithFewDescription(){
 return 'Only a few left';
 }

  function getMonogramErrorMessage(errorKey){
    if(errorKey == 'monogram.validationError.textColorNotSelected'){
    	return 'Please select a text color';
	}
	if(errorKey == 'monogram.validationError.initialNotEntered'){
    	return 'Please enter initial';
	}
   	if(errorKey == 'monogram.validationError.initialsNotEntered'){
		return 'Please enter all initials';
	}
   	if(errorKey == 'monogram.validationError.invalidMonogram'){
		return 'Please enter valid monogram.';
	}
}

function openPromoDisclaimer(promoId, width, height, features) {
    openWindow('/catalog/promo_disclaimer.jsp?promoId=' + promoId, width, height, features);
}


function getHemStyleCMSSectionId(){
  var retVal = '103';
  return retVal;
}


function getHemStyleCMSSectionName(){
  var retVal = 'HemStyles';
  return retVal;
}


function getHowToMeasureSectionName(){
  var retVal = 'HowtoMeasure';
  return retVal;
}


function getSizeChartCMSSectionName(){
  var retVal = 'AboutExtendedSizes';
  return retVal;
}

function getAboutExtendedSizes(){
  var retVal = 'AboutExtendedSizes';
  return retVal;
}

function getMonogramCMSSectionId(){
var retVal = '102';
return retVal;
}


function getMonogramCMSSectionName(){
var retVal = 'Monogram';
return retVal;
}

function getPlasticGiftCardDepartment(){
var retVal = '99';
return retVal;
}

function getPlasticGiftCardItem(){
var retVal = '0023';
return retVal;
}

/* goes to the Intl Shipping page in Customer Service from the links in bag/checkout */
function navigateToDeliveryInformation(deliveryURI) {
	var baseURI = '/';
	window.location.href = baseURI + deliveryURI;
	window.document.submit();
}

/*
// Strip a URL down to its location info
function stripUrl(url) {
    var workUrl = url;
    // Chop off the head
    var head = workUrl.indexOf(":");
    if (head > -1) {
        if (workUrl.length > head)
            workUrl = workUrl.substring(head + 1);
        else
            workUrl = "";
    }

    // Chop off the site name
    var head = workUrl.indexOf("eddiebauer/");
    if (head > -1) {
        var startChop = head + "eddiebauer/".length;
        if (workUrl.length >= startChop)
            workUrl = workUrl.substring(startChop);
        else
            workUrl = "";
    }

    // Chop off the tail
    var tail = workUrl.indexOf("?");
    if (tail > -1) {
        if (tail < workUrl.length)
            workUrl = workUrl.substring(0, tail);
        else
            workUrl = "";
    }
    return workUrl;
}

// Display list of anchor tags on this page to the firebug console.
function displayAnchors() {
    var myUrl = stripUrl(document.URL);
	var anchorTags = document.getElementsByTagName("a");
	myUrl.indexOf("?");
	console.log("Anchors for " + myUrl);
	for (var i = 0; i < anchorTags.length ; i++)
	{
		hrefVal = stripUrl(anchorTags[i].href);
		name = anchorTags[i].name;
		if (name != undefined && name != null && name.length > 0)
    		console.log("anchor " + i + " -  name  = (" + name + "), ref = (" + hrefVal + ")");
	}
	for (var i = 0; i < anchorTags.length ; i++)
	{
		hrefVal = stripUrl(anchorTags[i].href);
		name = anchorTags[i].name;
		if (name == undefined || name == null || name.length > 0)
    		console.log("anchor " + i + " -  name  = ( NONE ), ref = (" + hrefVal + ")");
	}
}
*/
function replace(string,text,by) {
// Replaces text with by in string
    var strLength = string.length, txtLength = text.length;
    if ((strLength == 0) || (txtLength == 0)) return string;

    var i = string.indexOf(text);
    if ((!i) && (text != string.substring(0,txtLength))) return string;
    if (i == -1) return string;

    var newstr = string.substring(0,i) + by;

    if (i+txtLength < strLength)
        newstr += replace(string.substring(i+txtLength,strLength),text,by);

    return newstr;
}

function setSOACookie(itemCount){
		var soaCookieString = GetCookie('ebpc');
		var cartEmpty = 'false';
		if(soaCookieString && soaCookieString.indexOf('cartempty=true') > -1) {
			cartEmpty = 'true';
		}
		var actionType = determineCartActionType(itemCount, cartEmpty);
		takeAction(actionType, soaCookieString);
}

function determineCartActionType(itemCount, cartEmpty){
 			var actionType="";

        if (cartEmpty == 'true'){
            if (itemCount>0){
                actionType='a';
            }else{
                actionType='b';
            }
        }else{
             if (itemCount<1){
                actionType='d';
            }else{
                actionType='b';
            }
        }
        return actionType;
}
function takeAction(actionType, soaCookieString){
	if (actionType == 'a') {
		if(soaCookieString.indexOf('cartempty=false') == -1) {
			if(soaCookieString.indexOf('firstorderofsession=true') > -1){
				soaCookieString = replaceSEOString(soaCookieString, 'oessoanow', 'oessoacart=' );
				soaCookieString = changeSEOString(soaCookieString, 'oessoacarttm', '12/12/2012 07:58:01 EST');
				soaCookieString = replaceSEOString(soaCookieString, 'cmmmcnow', 'cmmmccart=');
				soaCookieString = replaceSEOString(soaCookieString, 'cmvennow', 'cmvencart=');
				soaCookieString = replaceSEOString(soaCookieString, 'cmcatnow', 'cmcatcart=');
				soaCookieString = replaceSEOString(soaCookieString, 'cmplanow', 'cmplacart=');
				soaCookieString = replaceSEOString(soaCookieString, 'cmitenow', 'cmitecart=');
				soaCookieString = changeSEOString(soaCookieString, 'cartempty', 'false');
			}else {
				soaCookieString = replaceSEOString(soaCookieString, 'oessoacartbak', 'oessoacart=');
			   soaCookieString = changeSEOString(soaCookieString, 'oessoacarttm', '12/12/2012 07:58:01 EST');
				soaCookieString = replaceSEOString(soaCookieString, 'cmmmccartbak', 'cmmmccart=');
				soaCookieString = replaceSEOString(soaCookieString, 'cmvencartbak', 'cmvencart=');
				soaCookieString = replaceSEOString(soaCookieString, 'cmcatcartbak', 'cmcatcart=');
				soaCookieString = replaceSEOString(soaCookieString, 'cmplacartbak', 'cmplacart=');
				soaCookieString = replaceSEOString(soaCookieString, 'cmitecartbak', 'cmitecart=');
				soaCookieString = changeSEOString(soaCookieString, 'cartempty', 'false');
			}
			soaCookieString = browseSOAUpdates(soaCookieString);
		}
	} else if (actionType == 'd'){
		soaCookieString = deleteCartSOAUpdates(soaCookieString);
	} else if (actionType== 'b'){
		soaCookieString = browseSOAUpdates(soaCookieString);
	}
	SetCookie ('ebpc',escape(soaCookieString),'24855');
}

function browseSOAUpdates(soaCookieString) {
	soaCookieString = changeSEOString(soaCookieString, 'clearinitonnextsess', 'false');
	return soaCookieString;
}

function deleteCartSOAUpdates(soaCookieString) {
	soaCookieString = updateSEOString(soaCookieString, 'DOM', 'www.eddiebauer.com');
	soaCookieString = updateSEOString(soaCookieString, 'cartempty', 'true');
   	soaCookieString = updateSEOString(soaCookieString, 'clearinitonnextsess', 'true');
   	soaCookieString = updateSEOString(soaCookieString, 'oessoacart', '');
   	soaCookieString = updateSEOString(soaCookieString, 'oessoacarttm', '');
	soaCookieString = updateSEOString(soaCookieString, 'cmmmccart', '');
	soaCookieString = updateSEOString(soaCookieString, 'cmvencart', '');
	soaCookieString = updateSEOString(soaCookieString, 'cmcatcart', '');
	soaCookieString = updateSEOString(soaCookieString, 'cmplacart', '');
   return soaCookieString;
}

function replaceSEOString(soaCookieString, name, newName) {
	start = soaCookieString.indexOf( name + "=" );
	if(start != -1){
		len = start + name.length + 1;
		end = soaCookieString.indexOf( ";", len );
		newStart = soaCookieString.indexOf(newName);
		newLen = newStart + newName.length;
		newEnd = soaCookieString.indexOf( ";", newLen);
		if(!newStart || newStart == -1) {
			soaCookieString += newName + soaCookieString.substring(len, end) + ";";
		} else {
			soaCookieString = replace(soaCookieString, soaCookieString.substring(newLen, newEnd), soaCookieString.substring(len, end));
		}
	}
	return soaCookieString;
}

function changeSEOString(soaCookieString, name, value) {
	start = -1;
	if (soaCookieString != null) {
	   start = soaCookieString.indexOf( name + "=" );
    }

	if(start != -1) {
	    len = start + name.length + 1;
	    end = soaCookieString.indexOf( ";", len );
		soaCookieString = replace(soaCookieString, soaCookieString.substring(len, end), value);
	}else{
		if (soaCookieString != null) {
		    soaCookieString += name + "=" + value + ";";
	    } else {
	       soaCookieString = name + "=" + value + ";";
	    }
    }

	return soaCookieString;
}

function updateSEOString(soaCookieString, name, value) {
	start = -1;
	if (soaCookieString != null) {
	    start = soaCookieString.indexOf( name + "=" );
        len = start + name.length + 1;
        end = soaCookieString.indexOf( ";", len );
        soaCookieString = replace(soaCookieString, soaCookieString.substring(len, end), value);
    }

	return soaCookieString;
}

function highlight(myObject) {
	for(i=0; i < myObject.parentNode.parentNode.childNodes.length; i++) {
	   if(myObject.parentNode.parentNode.childNodes[i].nodeName == "LI"){
 			myObject.parentNode.parentNode.childNodes[i].className="not";
		}
	}
 	myObject.parentNode.className="hot";
}

function selectSub() {
	var url = window.location.href;
	myObject = document.getElementById("subSub");
	if(myObject){
		for(i=0; i < myObject.childNodes.length; i++) {
			if(myObject.childNodes[i].nodeName == "LI"){
				liObject = myObject.childNodes[i];
				for(j=0; j < liObject.childNodes.length; j++){
					if(liObject.childNodes[j]  && liObject.childNodes[j].nodeName == "A") {
						var myAltURL = liObject.childNodes[j].href;
						if(url==myAltURL ){
							return highlight(liObject.childNodes[j]);
						}
					}
				}
			}
		}
	}
	return "";
}

function createPageViewTagForLayer(pageName, refUrl) {
}

function CMPopupTracking(hrefUrl) {
   if (hrefUrl.indexOf('?') != -1) {
		hrefUrl = hrefUrl + "&refPopupUrl=" + encodeURIComponent(document.location.href);
   } else {
      hrefUrl = hrefUrl + "?refPopupUrl="+ encodeURIComponent(document.location.href);
   }
   return hrefUrl;
}

function StripUrlParam(url, paramKey) {

  if (paramKey.indexOf("=") == -1) {
     paramKey = paramKey + "=";
  }

  var strippedUrl = url;
  var startIndex = url.toString().indexOf(paramKey);
  var endIndex = -1;
  if (startIndex != -1) {
 	  var tempParamStr = url.toString().substring(startIndex);
		if (tempParamStr.indexOf("&") != -1 ) {
			endIndex = startIndex + tempParamStr.indexOf("&") + 1;
		} else if(tempParamStr.indexOf("#") != -1 ) {
			endIndex = startIndex + tempParamStr.indexOf("#") ;
			strippedUrl = url.toString().replace(url.toString().substring(startIndex, endIndex), '');
		}

		if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
			if (url.indexOf("&"+paramKey) != -1) {
				startIndex = startIndex - 1;
			}
			strippedUrl = url.toString().replace(url.toString().substring(startIndex, endIndex), '');
		} else {
		   if (url.indexOf("&"+paramKey) != -1) {
				tempParamStr = "&" + tempParamStr;
			} else if (url.indexOf("?"+paramKey) != -1) {
				tempParamStr = "?" + tempParamStr;
			}
		   strippedUrl = url.toString().replace(tempParamStr, '');
		}
	}
	return strippedUrl;
}

function appendJsonValue(var1, var2Key, var2Value) {
	var passedStr = '{"'+var2Key+'":"' + var2Value +'"';
	if (var1 != null && var1 != undefined) {
		var jsonStr = json.stringify(var1);
		passedStr =  passedStr + ',';
		jsonStr = jsonStr.replace("{", "");
		passedStr = passedStr.concat(jsonStr);
	} else {
		passedStr = passedStr + "}";
   }
	return passedStr;
}

function getRequestParameter(href, paramName) {
	var paramValue = '';
	if (href.indexOf(paramName+'=') > -1) {
		var tempStr = href.substring(href.indexOf(paramName+"=") + (paramName+"=").length);
		var paramIndex = tempStr.indexOf("&");

		if (paramIndex != -1) {
			paramValue = tempStr.substring(0, paramIndex);
		} else {
			paramValue = tempStr;
		}
  }
  return paramValue;
}

function validateEmailAddress(emailAddress) {
	 var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	 if (filter.test(emailAddress)) {
		return true;
	 } else {
		return false;
	}
}

function suppressHtmlTag(catName) {
     catName = catName.replace("<sup>","");
     catName = catName.replace("</sup>","");
     catName = catName.replace("'","&#39;");
	return catName;
}

function buildDOMInputFieldWithDLStructure(tabindex, name, labelText, type,maxLength,value,eventName, eventFn)
{
   if (value == undefined) {
     value = '';
   }
	var input = createDOM('input', {'type':type,'class':'textinput','name':name,'id':name,'value':value,'tabindex':tabindex});
	input.maxLength = maxLength;
	if (eventName && eventFn && eventFn.call) {
	    YAHOO.util.Event.addListener(input,eventName,eventFn);
	}
	var dl = createDOM('dl', {'class':'required'});
	var dt = createDOM('dt', null);
	var dd = createDOM('dd', null);
	var label1 = createDOM('label', {'for':name});
	label1.innerHTML = labelText;
	dt.appendChild(label1);
	dl.appendChild(dt);
	dd.appendChild(input);
	dl.appendChild(dd);
	var div = createDOM('div', {'class':'errorHide','id':'err_'+name});
	dl.appendChild(div);
	return dl;
}

function stringToParams (url, justParams) {
       var b = {};
       var params = null ;
       
       if (justParams) {
       	params = url ;
       } else {
       	if (url.indexOf ('?') != -1) {
       		params = url.split ('?')[1] ;
       	}
       }
       if (params) {
       	var a = params.split('&') ;
        for (var i = 0; i < a.length; ++i) {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            var val = decodeURIComponent(p[1].replace(/\+/g, " "));
            if (val) {
            	b[p[0]] = val ;			            	
            }
        }
       }
       return b;
}

function paramsToString (prefixUrl, params) {
	var paramString = "" ;
	var first = true ;
	for (p in params) {
		var val = params[p] ;
		if (val) {
			paramString = paramString + (first ? "" : "&") + p + "=" + encodeURIComponent(val) ;
			first = false ;
		}
	}
	if (prefixUrl) {
		paramString = prefixUrl + (paramString ? ("?"+paramString) : "") ;
	}
	return paramString;
}


// these vars are used to call secure pages from site manager content
var secureBaseURL = 'https://www.eddiebauer.com';
var unsecureBaseURL = 'http://www.eddiebauer.com';

// these vars are used for the ajax timeouts

var ajaxCallBackOutfitModuleTimeOut=24000;
var ajaxCallBackOutfitTimeOut=12000;
var ajaxCallBackRelatedOutfitTimeOut=24000;
var ajaxCallBackCopyTextTimeOut=24000;
var ajaxCallBackColorTimeOut=30000;
var ajaxCallBackSizeTimeOut=30000;
var ajaxCallBackInseamLengthTimeOut=24000;
var ajaxCallBackItemCountTimeOut=30000;
var ajaxCallBackValidateSKUTimeOut=24000;
var ajaxCallBackPromoContentTimeOut=24000;
var ajaxCallBackInterstitialContentTimeOut=24000;
var ajaxCallBackProductInfoTimeOut=24000;
var ajaxCallBackPromoGroupDescriptionTimeOut=24000;
var ajaxCallBackLoadBuyAnotherItemForEditTimeOut=24000;
var ajaxCallBackEnsemblePricesTimeOut=24000;
var ajaxCallBackAddItemToCartTimeOut=24000;
var ajaxCallBackRemoveItemFromCartTimeOut=24000;
var ajaxCallBackAddedItemToCartTimeOut=24000;
var ajaxCallBackGiftBoxTimeOut=24000;
var ajaxCallBackShowCheckoutPageTimeOut=24000;
var ajaxCallBackLoadItemForEditTimeOut=24000;
var ajaxCallBackLoadItemForAddOnEditTimeOut=24000;
var ajaxCallBackMonogramTimeOut=24000;
var ajaxCallBackRemoveMonogramArgTimeOut=24000;
var ajaxCallBackRemoveMonogramByPassArgTimeOut=24000;
var ajaxCallBackRemoveGiftBoxArgTimeOut=24000;
var ajaxCallBackRemoveGiftBoxByPassArgTimeOut=24000;
var ajaxCallBackMonogramStylesTimeOut=24000;
var ajaxCallBackMonogramFontsTimeOut=24000;
var ajaxCallBackMonogramColorsTimeOut=24000;
var ajaxCallBackLoadGiftBoxTimeOut=24000;
var ajaxCallBackLoadMonogramTimeOut=24000;
var ajaxCallBackLoadMonogramModalTimeOut=24000;

var utag_data = {};