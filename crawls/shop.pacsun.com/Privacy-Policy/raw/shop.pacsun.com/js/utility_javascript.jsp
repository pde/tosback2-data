
var nameCookieDelimiter = ":#:";

function showTabCom(objComDivId) {
     var imgPath = "/assets/images/shopping/"
     var objComDivArr = new Array("tab-more-info","tab-files","tab-review","tab-email-friend","tab-products");
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
	window.location = newLoc;
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

/*
 * This function will load the specified URL into the original window from where the current popup was launched.
 * The second parameter will set focus on the opener window. It is optional and will default to false.
 * The third parameter will close the popup window. It is optional and will default to false. If this parameter
 * is passed, then the setOpenerFocus will be required.
 */
function redirectOpener(url, setOpenerFocus, closeWindow) {
	window.opener.location = url;
	if ((setOpenerFocus != null) && (setOpenerFocus)) {
		window.opener.focus();
	}
	if ((closeWindow != null) && (closeWindow)) {
		window.close();
	}
}

function confirmWindow(url, text) {

	if (confirm(text)) {
		window.go = url;
		window.location = url;
	}
}

function setOperation(opType, addressIndex) {
	if (opType == 2) {
		window.location="/user/add_edit_address_book.jsp?addressIndex=" + addressIndex + "&mode=2";
	} else if (opType == 1) {
		window.location="/user/add_edit_address_book.jsp?mode=" + "1";
	} else if (opType == 3 ||
				opType == 0) {
		document.addUpdateDeleteAddressForm.operation.value = opType;
		document.addUpdateDeleteAddressForm.selectedAddressIndex.value = addressIndex;
		document.addUpdateDeleteAddressForm.submit();
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
	var groupVariants = variantGroup.getAllVariants()

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


// Returns the number of allowed characters remaining for a field.
// If the length of the field exceeds the total number of allowed
// characters the value will be truncated to the total allowed.

function getCharactersRemaining(field, totalCharacters) {
     var len = field.value.length;
     if (len > totalCharacters) {
       field.value = field.value.substring(0, totalCharacters);
       len = totalCharacters;
     }
     return (totalCharacters - len);
}

function updateRemainingCharacters(field, displayElement, totalCharacters) {
	var remainingCharacters = getCharactersRemaining(field, totalCharacters);
	displayElement.innerHTML = remainingCharacters;

	return remainingCharacters;
}


// Used to show or hide an element when a checkbox is checked or unchecked

function showHideFromCheckbox(checkBoxId, showHideElementId) {
	var checkBoxElement = document.getElementById(checkBoxId);
	var showHideElement = document.getElementById(showHideElementId);
	var checkedSetting = checkBoxElement.checked;
	if (checkedSetting) {
		showHideElement.style.display = "block";
	} else {
		showHideElement.style.display = "none";
	}
}


/*
This function opens a new window.
*/
function openNewWindow(URL, winWidth, winHeight, popUpWin, windowName, leftPos, topPos, hideScrollBars) {
	// Default window width and height, if not passed in.
	var w = 800, h = 600;

	//Check browser is IE.
	if (document.documentElement) {
			w = document.documentElement.clientWidth;
			h = document.documentElement.clientHeight;
	}
	else {
			w = window.innerWidth;
			h = window.innerHeight;
	}

	//Check if window width was passed. If so, use that width.
	if (winWidth != null) {
		var popW = winWidth;
	}
	else {
		var popW = (w - 100);
	}

	//Check if window height was passed. If so, use that height.
	if (winHeight != null) {
		var popH=winHeight;
	} else {
		var popH=(h-100);
	}

	//Check if window should be opened as popup.
	if (popUpWin != null) {
		var noPopUp = 'yes';
		if (popUpWin.toLowerCase() == 'y' || popUpWin.toLowerCase() == 'yes') {
			noPopUp = 'no';
		}
	} else {
		var noPopUp = 'yes';
	}

	var scrollbars = "yes";
	//Check if scroll bars should be hidden.
	if (hideScrollBars != null) {
		if (hideScrollBars.toLowerCase() == 'y' || hideScrollBars.toLowerCase() == 'yes') {
			scrollbars = 'no';
		}
	}

	// Create the window name, if not passed in.
	if (windowName != null) {
		// Use the window name passed in.
		var winName = windowName;
	} else {
		//Generate window name with random number (ie 'win274').
		var winName = 'win'+Math.floor(Math.random()*1000);
	}

	// Set the window positions.
	if ((leftPos == null) || (leftPos == "undefined")) {
		leftPos = (w - popW) / 2;
	}
	if ((topPos == null) || (topPos == "undefined")) {
		topPos = (h - popH) / 2;
	}

	// Open the new window.
	newWindow = window.open(URL,winName,'width='+popW+', height='+popH+', top='+topPos+', left='+leftPos+', menubar='+noPopUp+', location='+noPopUp+', directories='+noPopUp+', fullscreen=no, resizable='+noPopUp+', scrollbars='+scrollbars+', status=no,titlebar=yes, toolbar='+noPopUp);

	return newWindow;
}

/**
 * Utility method to build the breadcrumbs.
 */
function buildBreadCrumb(breadCrumbName1, breadCrumbURL1, breadCrumbName2, breadCrumbURL2, breadCrumbName3, breadCrumbURL3, breadCrumbName4) {
	// Open the breadcrumb container.
	var breadCrumb = "<div id='breadcrumb'>";

	// Build site level breadcrumb.
	breadCrumb += "<a href='http://shop.pacsun.com/home.jsp'>Home</a>";

	// Build first level breadcrumb.
	if (breadCrumbName1 != null && breadCrumbName1 != "") {
		if (breadCrumbURL1 != null && breadCrumbURL1 != "") {
			breadCrumb += " &gt; <a href='" + breadCrumbURL1 + "'>" + breadCrumbName1 + "</a>";
		} else {
			breadCrumb += " &gt; <span class='this_page'>" + breadCrumbName1 + "</span>";
		}
	}

	// Build second level breadcrumb.
	if (breadCrumbName2 != null && breadCrumbName2 != "") {
		if (breadCrumbURL2 != null && breadCrumbURL2 != "") {
			breadCrumb += " &gt; <a href='" + breadCrumbURL2 + "'>" + breadCrumbName2 + "</a>";
		} else {
			breadCrumb += " &gt; <span class='this_page'>" + breadCrumbName2 + "</span>";
		}
	}

	// Build third level breadcrumb.
	if (breadCrumbName3 != null && breadCrumbName3 != "") {
		if (breadCrumbURL3 != null && breadCrumbURL3 != "") {
			breadCrumb += " &gt; <a href='" + breadCrumbURL3 + "'>" + breadCrumbName3 + "</a>";
		} else {
			breadCrumb += " &gt; <span class='this_page'>" + breadCrumbName3 + "</span>";
		}
	}

	// Build fourth level breadcrumb.
	if (breadCrumbName4 != null && breadCrumbName4 != "") {
		breadCrumb += " &gt; <span class='this_page'>" + breadCrumbName4 + "</span>";
	}

	// Close the breadcrumb container.
	breadCrumb += "</div>";

	document.write(breadCrumb);
}

/**
 * Utility function to remove beginning and trailing spaces from a string.
 */
function trim(s) {
	var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	return (m == null) ? "" : m[1];
}

/**
 * Utility function to clear the field when focus is set. If the
 * field is empty it will be reset to the default text.
 */
function setDefaultText(textField, defaultText, clearDefault) {
	if (clearDefault) {
		if (textField.value == defaultText) {
			textField.value = "";
		} else {
			textField.value = trim(textField.value);
		}
	} else {
		if (trim(textField.value) == "") {
			textField.value = defaultText;
		} else {
			textField.value = trim(textField.value);
		}
	}
}

function setFocusDefaultText(textField, defaultText) {
	setDefaultText(textField, defaultText, true);
}

function setBlurDefaultText(textField, defaultText) {
	setDefaultText(textField, defaultText, false);
}

function getJSCookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return getJSCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}

function getJSCookieVal(offset) {
	var endstr = document.cookie.indexOf(";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function setJSCookie(name, value, seconds, path, domain, secure) {
	var expires = "";
	if (typeof(seconds) != 'undefined') {
		var date = new Date();
		date.setTime(date.getTime() + (seconds * 1000));
		expires = date.toGMTString();
	}
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function items() {
	var noItems = "";
	var itemsCount = getJSCookie("ITEMS_COUNT_COOKIE");

   if (itemsCount == null || trim(itemsCount) == "" || isNaN(itemsCount)) {
      return noItems;
	} else {
		return itemsCount;
	}
}

function setMyBagHdrImage() {
	var bagImage = '<img id="bagImage" src="https://images3.pacsun.com/is/image/pacsun/btn_myBag_v3?$img_png-alpha$&$txt=-*-&$ext=.png" alt="My Bag"/>';
	var itemCountText = "";
	if (items() != "") {
		itemCountText = items() + " ITEM" + ((items() == "1") ? "" : "S");
	}
	if (bagImage.indexOf("$txt") > -1) {
		itemCountText = stringReplace(itemCountText, " ", "+");
      var colValue= "";
      if(itemCountText == ""){
          colValue="&$col=";
      }
      bagImage = stringReplace(bagImage, "-*-", escape(itemCountText) + colValue);
   } else {
		bagImage = stringReplace(bagImage, "-*-", stringReplace(itemCountText, " ", "_"));
   }
	document.getElementById("myBagContainer").innerHTML = bagImage;
}

function setMyBagHdrImageToCount(count) {
	var bagImage = '<img id="bagImage" src="https://images3.pacsun.com/is/image/pacsun/btn_myBag_v3?$img_png-alpha$&$txt=-*-&$ext=.png" alt="My Bag"/>';
	var itemCountText = "";
	if (count != "" && !isNaN(count)) {
		itemCountText = count + " ITEM" + ((count == "1") ? "" : "S");
	}
	if (bagImage.indexOf("$txt") > -1) {
		itemCountText = stringReplace(itemCountText, " ", "+");
		bagImage = stringReplace(bagImage, "-*-", escape(itemCountText));
	} else {
		bagImage = stringReplace(bagImage, "-*-", stringReplace(itemCountText, " ", "_"));
	}
	document.getElementById("myBagContainer").innerHTML = bagImage;
   context = '';
   if(context == null || context == ''){
      context = '/';
   }
   var age = 45 * 24 * 60 * 60;
   setJSCookie('ITEMS_COUNT_COOKIE', count, age, context);
}

function welcome() {
	var welcomeName = getJSCookie("WELCOME_COOKIE");
	var returnMemberName = "";
	if (welcomeName == null || trim(welcomeName) == "") {
		returnMemberName = "";
	} else {
		if (welcomeName.indexOf(nameCookieDelimiter) > 0) {
			var tokens = welcomeName.split(nameCookieDelimiter);
			if (tokens != undefined && tokens.length > 1) {
				returnMemberName = tokens[0];
				if(returnMemberName == "null"){
					returnMemberName = tokens[1];
				}
			} else {
				returnMemberName = "";
			}
		} else {
			returnMemberName = welcomeName;
		}
	} // else ends

	return returnMemberName;
}

/*
This function replaces all instances of a value in a string with the following parms.
	NOTE: Special characters such as ' and / will need to be passed in as \' and \/.
	string = The value to be searched on. (required)
	match = The value to find in the string. (required)
	replacement = The to replace the match with. (required)
*/
function stringReplace(string, match, replacement) {
	var result = '';
	var index = 0;
	var lastIndex = index;
	while (string.length > lastIndex) {
		index = string.indexOf(match, lastIndex);
		if (index == -1) { break }
			result += string.substring(lastIndex, index) + replacement;
			lastIndex = index + match.length;
	}
	result += string.substring(lastIndex, string.length);
	return result;
}
