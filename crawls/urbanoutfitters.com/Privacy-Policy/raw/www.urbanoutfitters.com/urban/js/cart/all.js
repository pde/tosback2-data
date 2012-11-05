/* session management */
function checkSessionStatus(response) {
	// check for business logic error
	if (response["businessLogicViolation"]) {
		// if yes, did session expire
		if ((response["businessLogicViolationMessage"].indexOf("needs to be fully logged in") > 0) || (response["businessLogicViolationMessage"].indexOf("session") > 0)) {
			// if yes, redirect to login page
			location.href = "/urban/user/checkout_login.jsp";				
		}
	}
}

/* general utility functions */

// check if value is an integer
function is_int(val){
	if ((val != null) && (val.length > 0)) {
		// replace whitespace
		val = val.replace(/\s/g,"a");
	}
	if (val != null && !val.toString().match(/^[-]?\d*\.?\d*$/)) {
    	return false;
  	} else {
    	return true;
  	}
}

// check for closeness qualifier
function checkClosenessQualifier() {
	if ($("qualifier")) {
		// strip html
		//$("qualifier").innerHTML = $("qualifier").innerHTML.replace(/<.*?>/, "");
		// check for content
		if ($("qualifier").innerHTML.length > 0) {
			$("qualifier").style.display = "block";
		}
	}
}

// highlight input field's pre-populated value
function selectTextFieldValue() {
	// assign to all text fields
	var allTxtFields = $$("input[type=text]");	
	if (allTxtFields && allTxtFields.length > 0) {
		allTxtFields.each(function(t) {
			t.onfocus = function() {
				t.removeClassName("defaultOption");
			}
			t.onblur = function() {
				t.addClassName("defaultOption");
			}
			t.onclick = function() {
				t.select();
			}
		});
	}
	var allSelectFields = $$("select");	
	if (allSelectFields && allSelectFields.length > 0) {
		allSelectFields.each(function(s) {
			s.onfocus = function() {
				s.removeClassName("defaultOption");
			}
			s.onblur = function() {
				s.addClassName("defaultOption");
			}
		});
	}
}

// blur anchor link clicked
function blurLink(id) {
	var linkObj = $(id);
	if (linkObj) {
		linkObj.blur();
	}
}

// encode uri
function URIEncode(uri) {
	return encodeURIComponent(uri);
}

// decode uri
function URIDecode(uri) {
	return decodeURIComponent(uri);
}

// strip unwanted punctuation and quotes from json fields
function stripPunc(str) {
	// strip punctuation
	var punctuationless = str.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	// strip quotes
	punctuationless = punctuationless.replace("'","");
	punctuationless = punctuationless.replace("\"","");
	// remove any excess whitespace
	var finalString = punctuationless.replace(/\s{2,100}/g," ");
	return finalString;
}

// strip unwanted html from json fields
function stripHTML(str) {
	return str.replace(/<\/?[^>]+(>|$)/g, "");
}

// format number to currency
function toCurrency(num) {
	var cur = num.toString();
	var suffix = ".00";
	if (cur.indexOf(".") > 0) {
		var temp = cur.split(".");
		if (temp[1].length < 2) {
			cur = cur + "0";
		}
	} else {
		cur = cur + suffix;
	}
	// check length
	if (cur == suffix) {
		cur = "0" + suffix;
	}
	// check if negative number
	if (cur.indexOf("-") == 0) {
		cur = cur.replace("-","-$");
	} else {
		cur = "$" + cur;
	}
	return cur;
}

// format phone number
function formatPhoneNum(country, phoneNum) {
	var output = "";
	if (phoneNum != null && phoneNum.length > 0) {
		if (country == "0000") {
			// format: (xxx) xxx-xxxx
			var part1 = "";
			var part2 = "";
			var part3 = "";
			// first check for hyphens
			if (phoneNum.indexOf("-") >= 0) {
				part1 = phoneNum.substr(0,phoneNum.indexOf("-"));
				part2 = phoneNum.substr(phoneNum.indexOf("-")+1);
				output = "(" + part1 + ") " + part2;
			} else {
				part1 = phoneNum.substr(0,3);
				part2 = phoneNum.substr(3,3);
				part3 = phoneNum.substr(6);
				output = "(" + part1 + ") " + part2 + "-" + part3;
			}			
		} else {
			output = phoneNum;
		}
	}
	return output;
}

// add options to drop down menu
function addMenuOptions(val, txt, menuID, selected) {
	var menuObj = $(menuID);
	if (menuObj) {
	  	var opt = document.createElement("option");
	   	opt.text = txt;
	    opt.value = val;
	    if (selected != null) {
		    if ((opt.value == selected) || (opt.text == selected)) {
		    	opt.setAttribute('selected','selected');
	   	 	}
	   	}	
	    try {
	    	menuObj.add(opt, null); // standards compliant; doesn't work in IE
	    } catch(e) {
	    	menuObj.add(opt); // IE only
	    }
	} 
}

// reset color options for drop down
function resetSelectOptions(menuID, stop) {
	try {
		var menuObj = $(menuID);
		if (stop == null) {
			stop = 0;
		}
		if (menuObj) {
			while(menuObj.length > stop) {
				menuObj.options[menuObj.length-1] = null;
			}
		}
	} catch (e) {
		// DEBUG
		alert("resetSelectOptions: " + e);
	}
}

// format credit card
function formatCreditCard(ccNum, ccType) {
	if (ccNum.length <= 4) {
		if (ccType == "AmericanExpress") {
			ccNum = "XXX-XXXX-XXXX-" + ccNum;
		} else {
			ccNum = "XXXX-XXXX-XXXX-" + ccNum;
		}
	}
	return ccNum;
}

// limit cid field max length
function setCidMaxLength(obj) {
	var cidField = $("billingForm").elements["payment_cidnew"];
	var cidFieldSaved = $("payment_cidsaved");
	var cidExpress = $("cidExpress");
	var cardType = "";
	if (obj != null) {
		//var cidField = $("payment_cidnew");
		cardType = obj.options[obj.options.selectedIndex].value;
		// make sure value is selected or in order object
		if ((cardType == "") && (typeof(curCheckout["data"]["paymentGroups"][0]["creditCardType"]) != "undefined")) {
			cardType = curCheckout["data"]["paymentGroups"][0]["creditCardType"];
		}
		if (cardType == "AmericanExpress") {
			cidField.maxLength = 4;
			if (cidExpress) {
				cidExpress.maxLength = 4;
			}
			if (cidFieldSaved) {
				cidFieldSaved.maxLength = 4;
			}
		} else {
			cidField.maxLength = 3;
			if (cidExpress) {
				cidExpress.maxLength = 3;
			}
			if (cidFieldSaved) {
				cidFieldSaved.maxLength = 3;
			}
		}
	} else {
		// check for saved credit cards
		if ($("savedCreditCard") && $("savedCreditCard").style.display != "none") {
			var savedCreditCardKey = $("savedCreditCard").value;
			cardType = savedCreditCardColl["data"]["creditCards"][savedCreditCardKey]["creditCardType"];
			if (typeof(cardType) != "undefined") {
				if (cardType == "AmericanExpress") {
					cidField.maxLength = 4;
					if (cidExpress) {
						cidExpress.maxLength = 4;
					}
					if (cidFieldSaved) {
						cidFieldSaved.maxLength = 4;
					}
				} else {
					cidField.maxLength = 3;
					if (cidExpress) {
						cidExpress.maxLength = 3;
					}
					if (cidFieldSaved) {
						cidFieldSaved.maxLength = 3;
					}
				}				
			}
		}
	}
}

/* 
	reformat scene7 image url format
*/
function reformatScene7Url(url) {
	var output = url;
	var oldDomain = "http://s7ondemand1.scene7.com";
	var newDomain = "http://images.urbanoutfitters.com";
	if (document.location.protocol == "https:") {
		newDomain = newDomain.replace("http:","https:");
	}
	if (output.indexOf("s7ondemand1.scene7") > 0) {
		// swap domains
		output = output.replace(oldDomain, newDomain);
		// add ? prior to scene7 suffix
		output = output.replace("_b", "_b?");
	}
	return output;
}


/* profile utility functions */

/* verify user status */
function setUserAccess() {
	if (numCartItems > 0) {
		// get user status
		if (userStatus == "loggedin") {
			// set permissions
			if (userType != "guest") {
				$("saveShipAddressCheckBox").style.display = "block";
				$("defaultShippingCheckbox").style.display = "block";
				$("defaultBillingCheckbox").style.display = "block";
				$("saveNewCreditCardCheckBox").style.display = "block";
			} else {
				$("saveShipAddressCheckBox").style.display = "none";
				$("defaultShippingCheckbox").style.display = "none";
				$("defaultBillingCheckbox").style.display = "none";
				$("saveNewCreditCardCheckBox").style.display = "none";
			}
		}
	}
}

/* cart utility functions */

// initial call when user arrives at cart
function initCart() {
	// loading message
	cartLoading("Loading ...");
	// get cart
	getCart();
	// get saved for later
	getSavedForLater();
	// attach tool tip events
	showCartToolTip();
	// check for closeness qualifier
	checkClosenessQualifier();
	// timeout function to set CSS positioning of checkout button
	lockCartBtn();
	// endless page startup script
	//updatePage();
}

// initial call when user arrives at checkout
function initCheckout() {
	// check referrer; do not allow user to return from co_thankyou.jsp
	if (document.referrer.indexOf("co_thankyou.jsp") > 0) {
		// redirect user to cart page
		location.href = "/urban/checkout/cart.jsp";
	} 
	// loading message
	cartLoading("Loading ...");
	// get user profile info
	//getUserProfileInfo(false);
	// check for closeness qualifier
	checkClosenessQualifier();
	// add focus event to all text input fields
	selectTextFieldValue();
	// check user type
	if (userType == "existing") {
		// load express checkout cart
		checkExpressCheckoutStatus();
	} else {
		// load cart
		getCheckout();
	}
	// timeout function to set CSS positioning of place order button
	lockCheckoutBtn();
	// endless page startup script
	//updatePage();
}

// toggle between cart and saved for later list
function showCartSaved(divID) {
	try {
		var obj = $(divID);
		var linkObj = $(divID+"Link");
		var prevObj = $(curCartSaved);
		var prevLinkObj = $(curCartSaved+"Link");
		// blur link
		blurLink(divID+"Link");
		// hide previously selected div
		prevObj.style.display = "none";
		// update previously selected class
		prevLinkObj.removeClassName("active");
		// show currently selected div
		obj.style.display = "block";
		// update currently selected link style
		linkObj.addClassName("active");
		// throw coremetrics element tag
		if (divID == "cartContainer") {
			cmCreatePageElementTag("CART HEADER","CART");
		} else {
			// saved for later
			cmCreatePageElementTag("SFL CART HEADER","CART");
		}
		// update curCartSaved
		curCartSaved = divID;
	} catch (e) {
		// DEBUG
		alert("showCartSaved: " + e);
	}
}

// get inventory status
function getInventoryStatus(code, dt, preorder) {
	// set default inventory message in case code is not valid
	var output = "Unavailable";
	// check if exists
	if (inventoryCodes["_"+code]) {
		// get inventory status string based on code
		output = inventoryCodes["_"+code];
		// check if product can be pre-ordered
		if ((preorder != null) && (preorder) && (code == 1003)) {
			// preorder
			output = "Pre-order";
		}
		// show date available for pre-ordered and backordered products
		if ((code == 1003) && (dt.length > 0)) {
			output += " - Available " + dt;
		}
	}
	return output;
}

// open modal window
function openModalWindow(divID, keepOpen) {
	try {
		// reset opac var
		ajaxCartOpac = 100;
		// check if previously opened modal window
		if ((curModalWinID != "") && (!keepOpen)) {
			closeModalWindow(curModalWinID);
		}
		// display background
		var wrapperObj = $(divID+"Wrapper");
		if ((window.innerHeight) && (!ie) && (window.scrollMaxY >= 0)) // Firefox
		{
			pageWidth = window.innerWidth + window.scrollMaxX;
			pageHeight = window.innerHeight + window.scrollMaxY;
		}
		else if ((document.body.scrollHeight > document.body.offsetHeight)) // all but Explorer Mac
		{
			pageWidth = document.body.scrollWidth;
			pageHeight = document.body.scrollHeight;
		}
		else // works in Explorer 6 Strict, Mozilla (not FF) and Safari
		{
			pageWidth = document.body.offsetWidth + document.body.offsetLeft;
			pageHeight = document.body.offsetHeight + document.body.offsetTop;
		}
		wrapperObj.style.height = pageHeight + "px";
		// get the user's screen dimensions and calculate center point
		var screenWidth = getBrowserWidth();
		var screenHeight = getBrowserHeight();
		var modalWin = $(divID);
		if (ie) {
			wrapperObj.style.width = screenWidth + "px";	
		}
		// msg dimensions
		var modalWinWidth = parseInt(modalWin.style.width);
		var modalWinHeight = 0;
		if (modalWin.style.height.length != 0) {
			modalWinHeight = parseInt(modalWin.style.height);
		}
		// scrolling offset
		var scrollY = getOffsetY();
		// set snapshot coordinates
		var x = Math.floor(screenWidth/2) - Math.floor(modalWinWidth/2);
		// for center of browser viewable area
		var y = Math.floor(screenHeight/2) - Math.floor(modalWinHeight/2) + scrollY;
		// set coordinates
		modalWin.style.top = y + "px";
		modalWin.style.left = x + "px";
		// set display
		wrapperObj.style.display = "block";
		modalWin.style.display = "block";
		// track open window
		curModalWinID = divID;
	} catch (e) {
		// DEBUG
		alert("openModalWindow: " + e);
	}
}

// close modal window
function closeModalWindow(divID) {
	try {
		// check if billing modal window and close gift card error message if applicable
		if (divID == "billingPanel") {
			closePromoGiftCardErr('giftCardErr');
		}
		var wrapperObj = $(divID+"Wrapper");
		var winObj = $(divID);
		wrapperObj.style.display = "none";
		winObj.style.display = "none";
	} catch (e) {
		// DEBUG
		alert("closeModalWindow: " + e);
	}
}

/* tool tip for cart */
function showCartToolTip() {
	// check if objects exist
	if ($("cartToolTipDiv")) {
		xOffset = 250;
		yOffset = 80;
	}
}
function showStockToolTip(e) {
	// check if objects exist
	if (($("cartToolTipDiv")) && ($("cartCheckoutBtn")) && (hasOutOfStockItem)) {
		xOffset = 250;
		yOffset = 80;
		cartToolTipDisplay = "block";
		cartToolTipMsg = "Please remove any out of stock items before proceeding to checkout.";
		createCartToolTipDiv(Event.pointerX(e), Event.pointerY(e));
		// apply denied class
		$("cartCheckoutBtn").addClassName("disabled");
		$("cartCheckoutBtn").href = "javascript:void(0)";
	} else {
		$("cartCheckoutBtn").removeClassName("disabled");
		$("cartCheckoutBtn").href = "/urban/checkout/eco_confirm.jsp?checkout=true";
	}
}
function cartToolTip(e) {
	checkCartState();
	createCartToolTipDiv(Event.pointerX(e), Event.pointerY(e));
}
function internationalToolTip(msg, e) {
	cartToolTipMsg = msg;
	cartToolTipDisplay = "block";
	xOffset = 120;
	yOffset = 65;
	createCartToolTipDiv(Event.pointerX(e), Event.pointerY(e));
}
function hazMatToolTip(msg, e) {
	cartToolTipMsg = msg;
	cartToolTipDisplay = "block";
	xOffset = 150;
	yOffset = 130;
	createCartToolTipDiv(Event.pointerX(e), Event.pointerY(e));
}
function createCidDiv(txt, x, y) {
	cidDiv = document.createElement('div');
	document.body.appendChild(cidDiv);
	//set the inner styling of the div tag 
	cidDiv.style.position = "absolute";       
	cidDiv.style.left = (x-200) + "px";
	cidDiv.style.top = (y-130) + "px";
	cidDiv.style.zIndex = 9999;
	cidDiv.style.width = "200px";
	cidDiv.style.height = "90px"
	cidDiv.style.overflow = "hidden";
	cidDiv.style.padding = "4px";
	cidDiv.style.margin = "8px";
	cidDiv.style.background = "#ffffff";
	cidDiv.style.border = "solid 1px #999999";
	cidDiv.style.color = "#000000";
	cidDiv.style.fontSize = "11px";
	cidDiv.style.lineHeight = "14px";
	//set the html content inside the div tag
	cidDiv.innerHTML = txt;
}
function cidToolTip(e) {
	var content = '<div id="cidContent" style="position:relative;">';
	content += '<iframe src="" border="0" frameborder="0" height="80" width="260" class="selectBlocker"></iframe>';
	content += '<div style="position:absolute; top:0px; left:0px; z-index:2">This is the 3 or 4 digit code found on the back of your credit card or front of an American Express card. It helps protect your card from unauthorized use.';
	content += '<br/><img src="/urban/images/2007_holiday/cid.jpg" style="padding-top:3px;" /></div></div>';
	createCidDiv(content, Event.pointerX(e), Event.pointerY(e));
}
function removeCidToolTip() {
	if (cidDiv != null) {
		document.body.removeChild(cidDiv);
		cidDiv = null;
	}
}
function cartFeatureToolTip(e) {
	// set tool tip message based on user status
	if (userStatus == "recognized") {
		cartToolTipMsg = "Your session has expired and you must sign back into your account to use this feature";
	} else {
		cartToolTipMsg = "You must have an account and be logged in to use this feature";
	}
	cartToolTipDisplay = "block";
	xOffset = 100;
	yOffset = 65;
	createCartToolTipDiv(Event.pointerX(e), Event.pointerY(e));
}
function createCartToolTipDiv(x, y) {
	try {
		cartToolTipDiv = document.createElement('div');
		document.body.appendChild(cartToolTipDiv);
		//set the inner styling of the div tag 
		cartToolTipDiv.style.position = "absolute";       
		cartToolTipDiv.style.left = (x-xOffset) + "px";
		cartToolTipDiv.style.top = (y-yOffset) + "px";
		cartToolTipDiv.style.zIndex = 9999;
		cartToolTipDiv.style.width = "230px";
		cartToolTipDiv.style.overflow = "hidden";
		cartToolTipDiv.style.padding = "4px";
		cartToolTipDiv.style.margin = "8px";
		cartToolTipDiv.style.background = "#ffffff";
		cartToolTipDiv.style.border = "solid 2px #c1c1c1";
		cartToolTipDiv.style.color = "#000000";
		cartToolTipDiv.style.fontSize = "11px";
		cartToolTipDiv.style.lineHeight = "14px";
		// dynamically need to set display property
		cartToolTipDiv.style.display = cartToolTipDisplay;
		//set the html content inside the div tag
		cartToolTipDiv.innerHTML = cartToolTipMsg;
	} catch (e) {
		alert("createCartToolTipDiv: " + e);
	}
}
function removeCartToolTip() {
	if (cartToolTipDiv != null) {
		document.body.removeChild(cartToolTipDiv);
		cartToolTipDiv = null;
	}
}

// attach mouseover event to all elements with classname 'denied' and 'hazmat'
function limitFeatures() {
	// check user status
	if ((userStatus != "loggedin") || (userType == "guest")) {
		try {
			// find all elements with classname 'denied'
			var coll = $$(".denied");
			// loop through collection
			coll.each(function(c){
				// set tool tip message based on user status
				if (userStatus == "recognized") {
					cartToolTipMsg = "Your session has expired and you must sign back into your account to use this feature";
				} else {
					cartToolTipMsg = "You must have an account and be logged in to use this feature";
				}
				// add mouseover and mouseout events
				Event.observe(c, 'mouseover', cartFeatureToolTip);
				Event.observe(c, 'mouseout', removeCartToolTip);
				c.onclick = function() { c.blur() };
			});
		} catch (e) {
			// DEBUG
			alert("setFeaturePermissions: " + e);
		}
	}
}	

/*
	functions to display messaging for processing, errors, etc.
*/

// display processing message
function displayCartProcessing() {
	try {
		// set flag
		cartProcessing = true;
		ajaxCartTimer = 500;
		if ($('ajaxMsgContent')) {
			$('ajaxMsgContent').style.background = "#000000";
			$('ajaxMsgContent').innerHTML = "Processing ...";
		}
		// display msg window + wrapper 
		// DO NOT allow modal window to close until processing is complete
		openModalWindow('ajaxMsg', true);	
	} catch (e) {
		alert("displayCartProcessing: " + e);
	}
}

// wait x number of secs before fading out message
function fadeCartMsg() {
	// fade message out
	ajaxCartMsgTimer = setTimeout("cartMsgFadeAway()",ajaxCartTimer);
}

// decrements opacity by 1 until reaches 0
function cartMsgFadeAway() {
	try {
		clearTimeout(ajaxCartMsgTimer);
		ajaxCartMsgTimer = null;
		var msgObj = $('ajaxMsg');
		if (ajaxCartOpac > 0) {
			ajaxCartOpac = ajaxCartOpac - 2;
			// update styles
			if (ie) {
				msgObj.style.filter = "alpha(opacity=" + ajaxCartOpac + ")";
			} else {
				msgObj.style.opacity = ajaxCartOpac/100;
			}
			// set timer
			ajaxCartFadeTimer = setTimeout("cartMsgFadeAway()",10);	
		} else {
			// check for unavailable quantity message
			/*
			if ($("ajaxMsg").innerHTML.indexOf("more items than our available stock") > 0) {
				if (location.href.indexOf("eco_confirm.jsp") > 0) {
					reloadCart('ajaxMsg');
				} else {
					initCart();
				}
			}
			*/
			// reset timer
			resetCartTimer();
			// re-enable other event processing
			cartProcessing = false;
			// allow window to close
			msgObj.onclick = function() {
				closeModalWindow('ajaxMsg');
			}
		}
	} catch(e) {
		// DEBUG
		alert("cartMsgFadeAway: " + e);
	}
}

// resets msg styles + fade timers + global var
function resetCartTimer() {
	try {
		clearTimeout(ajaxCartFadeTimer);
		ajaxCartFadeTimer = null;
		var msgObj = $('ajaxMsg');
		var msgWrapperObj = $('ajaxMsgWrapper');
		// reset display
		msgObj.style.display = "none";
		msgWrapperObj.style.display = "none";
		// reset opacity
		if (ie) {
			msgObj.style.filter = "alpha(opacity=100)";
		} else {
			msgObj.style.opacity = 1.0;
		}
	} catch (e) {
		// DEBUG
		alert("resetCartTimer: " + e);
	}
}

// cart loading
function cartLoading(msg) {
	try {
		// set flag
		cartProcessing = true;
		// update message
		if ($('ajaxMsgContent')) {
			if (msg == null) {
				$('ajaxMsgContent').innerHTML = "Loading ...";
			} else {
				$('ajaxMsgContent').innerHTML = msg;
			}
			// display msg window + wrapper 
			// DO NOT allow modal window to close until processing is complete
			openModalWindow('ajaxMsg', true);
			// change the background just for loading
			$('ajaxMsgContent').style.background = "#000000";
			$('ajaxMsgWrapper').style.background = "transparent";
		}		
	} catch (e) {
		// DEBUG
		alert("cartLoading: " + e);
	}	
}	

//TRAC 5050: Modifed the below function for displaying the paypal error codes as dynamically where it is displaying as static 
//msg = payPalErrMsg;
// show message
function showMsg(msg, responseObj, panel) {
	try {
		// check diagnostic messages
		if (responseObj != null) {
			if ((responseObj["exceptions"]) && (responseObj["exceptions"][0]["message"] != null)) {
    			msg = responseObj["exceptions"][0]["message"];
    		} else if (responseObj["errorMessage"] != null) {
    			msg = responseObj["errorMessage"];
    		} else if (responseObj["data"]["userMessage"]) {
				msg = responseObj["data"]["userMessage"];
			}
		}
		// replace encoded apostrophe
		msg = msg.replace(/\u0092/g,"'");
		// check if paypal error
		if (msg.indexOf("PayPal")>=0) {
			//commenting the below line for TRAC 5050
			//	msg = payPalErrMsg;
			// launch billing panel 
			launchBilling();
		}
		// show error message
		if (panel == null) {
			panel = "ajaxMsgContent";
		}
		//Start : Added for trac 5050
		if(msg != "PayPalErrorMsg"){
		 $(panel).innerHTML = msg;
		}
		//End:Added for trac 5050
		if (panel == "ajaxMsgContent") {
			// fade cart processing message
			if (msg.length > 50) {
				ajaxCartTimer = 3500;
			} else {
				ajaxCartTimer = 2500;
			}
		} else {
			ajaxCartTimer = 50;
			// display error message
			$(panel).style.display = "block";
		}
		fadeCartMsg();
	} catch (e) {
		// DEBUG
		alert("showMsg: " + e);
	}	
}

// show error message
function showErrorMsg(msg, responseObj, panel) {
	if ((panel == null) || (panel == "")) {
		$('ajaxMsgContent').style.background = "#ff0000";
	}
	// display message
	showMsg(msg, responseObj, panel);
}

function showSubmitError(msg, lineItem) {
	// replace encoded apostrophe
	
	var errorContainer = $(lineItem).getElementsByClassName('placeOrderError')[0];
	var errorMessage = $(lineItem).getElementsByClassName('placeOrderErrorContent')[0];
	msg = msg.replace(/\u0092/g,"'");
	errorMessage.innerHTML = msg;
	errorContainer.style.display = "block";
	ajaxCartTimer = 50;
	fadeCartMsg();
}

// reload cart
function reloadCart(modalWinID) {
	try {
		// show cart loading
		cartLoading("Loading ...");
		// reload cart + pricing
		getCheckout();
		// close currently open modal window
	 	if (modalWinID == null) {
		 	closeModalWindow(curModalWinID);
		} else {
			closeModalWindow(modalWinID);
		}
	} catch (e) {
		// DEBUG
		alert("reloadCart: " + e);
	}	
}

// form validation for shipping and billing panel
function validateForm(frm) {
	try {
		// start saving message
		cartLoading("Saving ...");
		// set submit variables							  
		var success = true;
		var curCheckName = "";
		var checkCounter = 0;
		var msg = 'Please complete all required fields.';
		var requiredFields = $(frm).elements;
		// loop through all form elements
		for (var i=0; i<requiredFields.length; i++) {
			var f = $(requiredFields[i]);
			// remove error classname if applicable
			f.removeClassName("err");
			// required fields have .required class; ignore when shipping to gift list address
			if ((f.hasClassName("requiredField")) && (!shippingToGiftList)) {
				// check required text, password, hidden, and textarea fields
				if (f.type == "text" || f.type == "password" || f.tagName.toLowerCase() == "textarea" || f.type == "file" || f.type == "hidden") {
					if (f.value.length <= 0) {
						f.addClassName("err");
						success = false;
					} else if (f.id.indexOf("mail")>=0) {
						// validate email address
						if ((f.value.indexOf("@") < 0) || (f.value.indexOf(".") < 0)) {
							f.addClassName("err");
							success = false;
						}
					} else if (f.id.indexOf("cid")>=0) {
						// validate cid field; check if value is an integer
						var isNum = is_int(f.value);
						if (!isNum) {
							// update err message
							msg = "Please use numbers only when entering your credit card CID / security code.";
							f.addClassName("err");
							success = false;
						} else {
							// verify that cid is proper length
							if (f.value.length < 4 && $("payment_cardtype") && $("payment_cardtype").value == "AmericanExpress") {
								// update err message
								msg = "American Express requires a 4 digit credit card CID / security code.";
								f.addClassName("err");
								success = false;
							} else if (f.value.length != 3 && $("payment_cardtype") && $("payment_cardtype").value != "AmericanExpress") {
								// update err message
								msg = "Please enter a 3 digit credit card CID / security code.";
								f.addClassName("err");
								success = false;
							} 
						}
					// make sure default labels are not still in form fields
					} else if (f.value == "First Name") {
						f.addClassName("err");
						success = false;
					} else if (f.value == "Last Name") {
						f.addClassName("err");
						success = false;
					} else if (f.value == "Street Address") {
						f.addClassName("err");
						success = false;
					} else if (f.value == "City") {
						f.addClassName("err");
						success = false;
					} else if (f.value == "Postal Code") {
						f.addClassName("err");
						success = false;
					} else if (f.value == "Phone") {
						f.addClassName("err");
						success = false;
					} else if (f.value == "CID") {
						f.addClassName("err");
						success = false;
					} else if (f.value == "Card Number") {
						f.addClassName("err");
						success = false;
					}
					
					else if ((f.id.indexOf("FirstName")>=0 || f.id.indexOf("LastName")>=0 || f.id.indexOf("City")>=0 || f.id.indexOf("Address")>=0) && f.type == "text") {
				
						var isClean = checkSpecialChar(f);
						if(!isClean) {
							msg = 'One or more fields has special characters. Please remove them and try again.';
							f.addClassName("err");
							success = false;
						}
					}
					
					
					
				}
				
				// check required checkboxes
				else if (f.type == "checkbox") {
					if ((curCheckName != f.id) && (!f.checked)) {
						// check counter
						if (checkCounter == 0) {
							f.addClassName("err");
							success = false;
						}
						// reset counter
						checkCounter = 0;
					}
					if (f.checked) {
						checkCounter++;
					}
					curCheckName = name;
				}
				// check required radio
				else if (f.type == "radio") {
					// loop through all elements with this name
					radioCounter = 0;
					var radioCollection = "input[name='" + name + "']";
					$$(radioCollection).each(function(r) {
						if (r.checked) {
							radioCounter++;
						}
					});
					if (radioCounter == 0) {
						f.addClassName("err");
						success = false;
					}
				}
				// check required drop down menus
				else if (f.tagName.toLowerCase() == "select") {
					if (f.value == "") {
						f.addClassName("err");
						success = false;
					}
				}
			} else if (f.id.indexOf("PostalCode")>=0 && f.value != "Postal Code") {
				// check postal code if entered
				var zipMsg = checkZip(f, frm);
				if (zipMsg.length > 0) {
					f.addClassName("err");
					msg = zipMsg;
					success = false;
				}
			} else if ((f.id.indexOf("States")>=0 || f.id.indexOf("Address")>=0) && f.type == "text") {
				
				var isClean = checkSpecialChar(f);
				if(!isClean) {
					msg = 'One or more fields has special characters. Please remove them and try again.';
					f.addClassName("err");
					success = false;
				}
			}
		}	
		if (success) {
			if (frm == 'shippingForm') {
				submitShippingInfo();
			} else {
				submitBillingInfo();
			}
			return success;
		} else {
			var panel = "billingErr";
			var saveBtnId = "billingSave";
			if (frm == "shippingForm") {
				panel = "shippingErr";
				saveBtnId = "shippingSave";
			}
			// blur save button
			$(saveBtnId).blur();
			// show error message
			showErrorMsg(msg, null, panel);
			return false;
		}		
	} catch (e) {
		alert("validateForm: " + e);
	}
}

// check if field has special characters
function checkSpecialChar(obj) {
	var iChars = "!@#$%^&*+=[]{}|<>?";
	
		if(obj.id.indexOf("Address") >= 0) {
			iChars = "!@$%^&*+=[]{}|<>?";
		}
	  
	  for (var i = 0; i < obj.value.length; i++) {
		  if (iChars.indexOf(obj.value.charAt(i)) != -1) {
			  return false;
		  }
	  }
	  return true;
}

// validates zip code format
function checkZip(obj, frm) {
	var msg = "";
	var panel = "billingErr";
	var saveBtnId = "billingSave";
	var countryCode = $("billingCountries").value;
	if (frm == "shippingForm") {
		countryCode = $("shippingCountries").value;
		panel = "shippingErr";
		saveBtnId = "shippingSave";
	}
	// rest of the countries
	var pattern1 = /^[a-zA-Z0-9]+$/;
	// (1022)Brazil: XXXXX-XXX
	var pattern2 = /([\w\d]){5}\-{1}([\w\d]){3}/;
	var val = obj.value;
	// check length of submission
	if (val.length > 0) {
		// check country if Brazil
		if (countryCode == 1022) {
			// test brazil pattern
			if (val.match(pattern2) != null && val.length == 9) {
				// good Brazilian postal code pattern");
			} else {
				msg = "Please enter text in the following format: XXXXX-XXX.";
				obj.addClassName("err");
			}
		} else {
			// test other country patterns
			if (val.match(pattern1) != null) {
				// good postal code pattern
			} else {
				msg = "Please enter letters or numbers only.";
				obj.addClassName("err");
			}
		}
	} else {
		// use default postal code error
		msg = "Please enter a valid postal code.";
		// update err message
		obj.addClassName("err");
	}
	// return array
	return msg;
}

// check for user input in field for onkeyup event
function checkFieldValue(obj) {
	if ($(obj)) {
		if ($(obj).value.length > 0) {
			// check if cid field
			if ($(obj).id.indexOf("cid")>=0) {
				// check if cid value is a number
				if (is_int($(obj).value)) {
					// verify that cid is proper length
					if ($(obj).value.length < 4 && curCheckout && curCheckout["data"] && curCheckout["data"]["paymentGroups"] && 
						curCheckout["data"]["paymentGroups"][0] && curCheckout["data"]["paymentGroups"][0]["creditCardType"] == "AmericanExpress") {
						// amex incorrect length
						$(obj).addClassName("err");
					} else if ($(obj).value.length != 3 && curCheckout && curCheckout["data"] && curCheckout["data"]["paymentGroups"] && 
						curCheckout["data"]["paymentGroups"][0] && curCheckout["data"]["paymentGroups"][0]["creditCardType"] != "AmericanExpress") {
						// less than 3 digits
						$(obj).addClassName("err");
					} else {
						// swap style
						$(obj).removeClassName("err");
					}					
				} else {
					$(obj).addClassName("err");
				}
			} else {
				// swap style
				$(obj).removeClassName("err");
			}
		} else {
			$(obj).addClassName("err");
		}
	}
}

// format line item gift option
function displayLineItemGiftOption(key) {
	var giftOption = "";
	key = "_" + key;
	if (giftOptionChoices[key]) {
		giftOption = giftOptionChoices[key];
	} else {
		giftOption = giftOptionChoices["_0"];
	}
	return giftOption;
}

// get radio button checked value
function getRadioBtnValue(radioGrp) {
	try {
		var radioValue = "";
		for(i=0; i < radioGrp.length; i++){
		    if (radioGrp[i].checked == true) {
		        radioValue = radioGrp[i].value;
		    }
		}
		return radioValue;
	} catch(e) {
		alert("getRadioBtnValue(): " + e);
	}
}

// allow enter key to activate
function submitUsingEnter(submitBtnId, e) {
	var keycode = (e.keyCode) ? e.keyCode : e.charCode;
	if (keycode == 13) {
   		// execute
   		if ($(submitBtnId)) {
   			$(submitBtnId).focus();
   		}
   	}
}
function submitOrderUsingEnter(e) {
	var keycode = (e.keyCode) ? e.keyCode : e.charCode;
	if (keycode == 13) {
   		// submit order
   		try {
	   		var cid = $("cidExpress").value;
   			// validate cid data before submitting
	   		var cidValid = false;
   			if (is_int(cid)) {
   				if (cid.length < 4 && curCheckout && curCheckout["data"] && curCheckout["data"]["paymentGroups"] && 
					curCheckout["data"]["paymentGroups"][0] && curCheckout["data"]["paymentGroups"][0]["creditCardType"] == "AmericanExpress") {
					cidValid = false;
				} else if (cid.length != 3 && curCheckout && curCheckout["data"] && curCheckout["data"]["paymentGroups"] && 
					curCheckout["data"]["paymentGroups"][0] && curCheckout["data"]["paymentGroups"][0]["creditCardType"] != "AmericanExpress") {
					// less than 3 digits
					cidValid = false;
				} else {
					cidValid = true;
				}
			}
			// cid data is valid, submit order
   			if (cidValid && !hasOutOfStockItem) {
   				submitOrder(cid);
   			}
   		} catch(ex) {
   			alert("submitOrderUsingEnter: " + ex);
   		}	
   	}
}

/* endless page utility functions */
function getPageHeight(){
	var y;
  	var test1 = document.body.scrollHeight;
  	var test2 = document.body.offsetHeight
  	if (test1 > test2) {
  		y = document.body.scrollHeight;
  	} else {
		y = document.body.offsetHeight;
  	}
  	return parseInt(y);
}

function _getWindowHeight(){
	if (self.innerWidth) {
		frameWidth = self.innerWidth;
		frameHeight = self.innerHeight;
  	} else if (document.documentElement && document.documentElement.clientWidth) {
    	frameWidth = document.documentElement.clientWidth;
    	frameHeight = document.documentElement.clientHeight; 
  	} else if (document.body) {
    	frameWidth = document.body.clientWidth;
    	frameHeight = document.body.clientHeight;
  	}
  	return parseInt(frameHeight);
}

function getScrollHeight(){
  	var y;
  	// all except Explorer
  	if (self.pageYOffset) {
  		y = self.pageYOffset;
  	} else if (document.documentElement && document.documentElement.scrollTop) {
    	y = document.documentElement.scrollTop;
  	} else if (document.body)	{
    	y = document.body.scrollTop;
  	}
  	return parseInt(y)+_getWindowHeight();
}


/*
	coremetrics functions
*/
// set cookie value
function setCookie(name, value) {
	//If name is the empty string, it places a ; at the beginning
    //of document.cookie, causing clearCookies() to malfunction.
    if (name != '') {
		// date for cookie expiration
		var exdate = new Date();
		// set to 1 year; cookie will be cleared before then when customer checks out
		var days = 360;
		// expires N days from now
		exdate.setDate(exdate.getDate() + days);
		// expiration date format: Fri, 3 Aug 2001 20:47:11 UTC
		var expiration = exdate.toUTCString();
		// set cookie
		document.cookie = name + '=' + value + "; expires=" + expiration + "; path=/";
	}
}

// return cookie value
function getCookie(name) {
	//Without this, it will return the first value 
    //in document.cookie when name is the empty string.
    if (name == '') {
    	return('');
    }     
    var name_index = document.cookie.indexOf(name + '=');
    if (name_index == -1) {
    	return('');
    }     
    var cookie_value = document.cookie.substr(name_index + name.length + 1, document.cookie.length);
    // all cookie name-value pairs end with a semi-colon, except the last one.
    var end_of_cookie = cookie_value.indexOf(';');
    if (end_of_cookie != -1) {
    	cookie_value = cookie_value.substr(0, end_of_cookie);
	}
    // Restores all the blank spaces.
    var space = cookie_value.indexOf('+');
    while(space != -1) { 
		cookie_value = cookie_value.substr(0, space) + ' ' + cookie_value.substr(space + 1, cookie_value.length);
		space = cookie_value.indexOf('+');
    }
	return(cookie_value);
}

// clear cookies
function clearCookie(name) {                  
	expires = new Date();
    expires.setYear(expires.getYear() - 1);
	document.cookie = name + "=null; expires=" + expires + "; path=/"; 		 
}

// set persistant categories/product combinations added to cart
function setPersistantCat() {
	try {
		// clear all old cookies
		clearCookie("persitantCatValues");	
		// delete persistant cookie values
		clearCookie(cookieName);
	} catch(e) {
		// debug
		alert("setPersistantCat(): " + e);
	}
}

function logEvent(jsComponent, logLevel, message) {
	var ajaxUrl = "/urban/checkout/log.jsp?jsComponent=" + jsComponent + "&logLevel=" + logLevel + "&message=" + message;
   
   new Ajax.Request(ajaxUrl, {
	   method: 'get'
	});
}


// call on page load
Event.observe(window,"load",setPersistantCat);


(function($) {
	
	$(document).ready(function() {

		// check if on a thank you page;  if so, generate RKG analytics images
		if ( window.location.href.search("co_thankyou.jsp") > -1 ) {
			
			// pull sessionStorage info on order
			var counter = sessionStorage.getItem( 'totalNumberofItems' );
			var html = "";
			var prodName = "";
			var orderNo = "";
			var lid = 0;

			while ( counter > -1 ) {
				// console.log (JSON.parse( sessionStorage.getItem( 'arr_' + counter ) ) );

				obj = JSON.parse( sessionStorage.getItem( 'arr_' + counter ) );
				
				// remove HTML from prodName
				prodName = obj.name;
				
				if (prodName != null && prodName.indexOf("<") > 0) {
	   				prodName = prodName.substring(0, prodName.indexOf("<"));
	   			}


				//grab order number out of HTML, chop off first 7 characters
				orderNo = $("div.orderNum strong").html();
				orderNo = orderNo.substring(7);
				
				// convert price to # of pennies for RKG
				obj.price = Math.round( obj.price * 100 );
				
				// remove spaces from the name so it doesn't break the query string
				obj.name = obj.name.replace(/ /g, "%20");

				// increment lid so there's no 0 value
				lid = obj.index + 1;

				html += "<img src=\"https://www.rkdms.com/order.gif?mid=urbanoutfitters&oid=";
				html += orderNo;
				html += "&lid="
				html += lid;
				html += "&iid=" + obj.sku;
				html += "&icent=";
				html += obj.price;
				html += "&iqty=" + obj.quantity;
				html += "&iname=" + prodName;

				html += "\" height=\"1\" width=\"1\" />";

				counter --;
			}

			// console.log ("html is " + html )
			$("#footer").append(html);

		}  // end RKG image generation


		// store cart information in sessionStorage for analytics on Thank You page
		$("#placeOrder").click( function() {
			
			// instantiate variables
			var arr = [];
			var counter = -1;
			
			// loop through each item in the commerceItems object
			$.each( curCheckout.data.commerceItems, function( i, val ) {
				
				// increment counter;  if it =-1, then the array is empty
				counter++;

				// grab all necessary properties, assign them to a temporary object
				var obj = {
					name: val.productCatalogInformationCustomProperty.value.description,
					sku: val.productCatalogInformationCustomProperty.value.id,
					price: val.priceInfo.value.amount,
					quantity: val.quantity,
					index: counter
				};

				obj.price = obj.price / obj.quantity;
				
				// push that object to sessionStorage
				sessionStorage.setItem( 'arr_' + counter, JSON.stringify(obj) );
				
			});			

			// set total number of items to sessionStorage;  need it for next page
			sessionStorage.setItem( 'totalNumberofItems', counter );

			// return false;
		});	
	});

})(jQuery);