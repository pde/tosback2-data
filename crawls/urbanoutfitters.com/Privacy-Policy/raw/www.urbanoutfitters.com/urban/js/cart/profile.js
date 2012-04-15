/* 
	global variables 
*/


/*
	AJAX call to login registered user
*/
function logIn() {
	/*
		arg1 : username : String
		arg2 : password : String
	*/	
	try {
		// remove err class if applicable
		removeLoginErrClasses();
		// processing message
		displayCartProcessing();
		// get input parameters
		var username = $("signInEmail").value;
		var password = $("signInPassword").value;
		if ((username.length > 0) && (password.length > 0)) {
			var params = "arg1=" + username + "&arg2=" + password;
			// prevent ajax request from being cached
			var timestamp = "&timestamp=" + new Date().getTime();
			// AJAX call
			var url = "http://" + window.location.host + "/rest/bean/uo/commerce/integrations/ProfileIntegrationService/handleLogin?atg-rest-depth=7"+timestamp;
			new Ajax.Request(url, {
				method: 'post',
				parameters: params,
				onSuccess: function(transport) {
			    	// get JSON response object and store in local variable
			    	var responseObj = transport.responseText.evalJSON();
			    	// check if error condition exists
			    	if (responseObj["errorConditionExists"]) {
			    		var msg = "Please enter a valid username and password";
				    	showErrorMsg(msg, responseObj);
				    	$("signInEmail").addClassName("err");
				    	$("signInPassword").addClassName("err");
			    	} else {
			    		// update user status and type
			    		userStatus = "loggedin";
			    		userType = "existing";
			    		// display order review panel info
			    		$('content_ordersummary').style.display = "block";
			    		// hide login panel
			    		$('loginPanel').style.display = "none";
			    		// show promo + gift card fields
			    		$('promoCodeGiftCard').style.display = "block";
			    		// load express checkout cart
		    			loadExpressCheckoutCart();
						// coremetrics
			    		getUserProfileInfo(true);
			    		/*
			    		if (userStatus == "recognized") {
			    			cmCreatePageElementTag("SIGN-IN","CHECKOUT AUTOLOGGED");
			    		} else {
			    			cmCreatePageElementTag("SIGN-IN","CHECKOUT LOGIN");
			    		}
			    		*/
			    	}
			    },
			    onFailure: function(transport) {
			    	showErrorMsg(transport.responseText, null);
			    }
			});
		} else {
			var msg = "Please enter a valid username and password";
			showErrorMsg(msg, null);
			$("signInEmail").addClassName("err");
			$("signInPassword").addClassName("err");
		}
	} catch (e) {
		// DEBUG
		alert("logIn: " + e);
	}
}	

/*
	AJAX call to create a registered user
*/
function createUser() {
	/*
		arg1 : username : String
		arg2 : password : String
		arg3 : confirm password : String
	*/	
	try {
		// remove err class if applicable
		removeLoginErrClasses();
		// processing message
		displayCartProcessing();
		// get input parameters
		var username = $("signUpEmail").value;
		var password = $("signUpPassword").value;
		var confirmPassword = $("signUpConfirmPassword").value;
		if ((username.length > 0) && (password.length > 0) && (confirmPassword.length > 0)) {
			var params = "arg1=" + username + "&arg2=" + password + "&arg3=" + confirmPassword;
			// prevent ajax request from being cached
			var timestamp = "&timestamp=" + new Date().getTime();
			// AJAX call
			var url = "http://" + window.location.host + "/rest/bean/uo/commerce/integrations/ProfileIntegrationService/handleCreateRegisteredUser?atg-rest-depth=7"+timestamp;
			new Ajax.Request(url, {
				method: 'post',
				parameters: params,
				onSuccess: function(transport) {
					// get JSON response object and store in local variable
			    	var responseObj = transport.responseText.evalJSON();
			    	// check if error condition exists
			    	if (responseObj["errorConditionExists"]) {
			    		var msg = "Please enter a username, password, and confirmation password.";
				    	showErrorMsg(msg, responseObj);
				    	$("signUpEmail").addClassName("err");
						$("signUpPassword").addClassName("err");
						$("signUpConfirmPassword").addClassName("err");
			    	} else {
			    		// update user status and type
			    		userStatus = "loggedin";
			    		userType = "new";	    	
			    		// successfully created user and logged in
		    			reloadCart('ajaxMsg');
						// display order review panel info
			    		$('content_ordersummary').style.display = "block";
			    		// hide login panel
			    		$('loginPanel').style.display = "none";	
			    		// show promo + gift card fields
			    		$('promoCodeGiftCard').style.display = "block";
			    		// coremetrics
			    		getUserProfileInfo(true);
			    		//cmCreatePageElementTag("SIGN-UP","CHECKOUT LOGIN");
			    	}
			    },
			    onFailure: function(transport) {
			    	showErrorMsg(transport.responseText, null);
			    }
			});
		} else {
			var msg = "Please enter a username, password, and confirmation password. Be sure that the password and confirmation password match.";
			showErrorMsg(msg, null);
			$("signUpEmail").addClassName("err");
			$("signUpPassword").addClassName("err");
			$("signUpConfirmPassword").addClassName("err");
		}
	} catch (e) {
		// DEBUG
		alert("createUser: " + e);
	}
}

/*
	AJAX call to checkout as a guest
*/
function createGuest() {
	/*
		arg1 : username : String
	*/	
	try {
		// remove err class if applicable
		removeLoginErrClasses();
		// processing message
		displayCartProcessing();
		// get input parameters
		var username = $("guestEmail").value;
		if (username.length > 0) {
			var params = "arg1=" + username;
			// prevent ajax request from being cached
			var timestamp = "&timestamp=" + new Date().getTime();
			// AJAX call
			var url = "http://" + window.location.host + "/rest/bean/uo/commerce/integrations/ProfileIntegrationService/handleCreateGuestUser?atg-rest-depth=7"+timestamp;
			new Ajax.Request(url, {
				method: 'post',
				parameters: params,
				onSuccess: function(transport) {
			    	// get JSON response object and store in local variable
			    	var responseObj = transport.responseText.evalJSON();
			    	// check if error condition exists
			    	if (responseObj["errorConditionExists"]) {
			    		var msg = "Please enter a valid email address";
			    		showErrorMsg(msg, responseObj);
			    		$("guestEmail").addClassName("err");
			    	} else {
			    		// update user status and type
			    		userStatus = "loggedin";
			    		userType = "guest";
			    		// successfully created user and logged in
		    			reloadCart('ajaxMsg');
						// display order review panel info
			    		$('content_ordersummary').style.display = "block";
			    		// hide login panel
			    		$('loginPanel').style.display = "none";
			    		// show promo + gift card fields
			    		$('promoCodeGiftCard').style.display = "block";
			    		// coremetrics
			    		getUserProfileInfo(true);
			    		//cmCreatePageElementTag("GUEST","CHECKOUT LOGIN");
			    	}
			    },
			    onFailure: function(transport) {
			    	showErrorMsg(transport.responseText, null);
			    }
			});
		} else {
			var msg = "Please enter an email address";
			showErrorMsg(msg, null);
			$("guestEmail").addClassName("err");
		}
	} catch (e) {
		// DEBUG
		alert("createGuest: " + e);
	}
}

// AJAX call to reload utility nav to show correct user logged in status
function reloadUtilityNav() {
	try {
		// prevent ajax request from being cached
		var timestamp = "?timestamp=" + new Date().getTime();
		// AJAX call
		var url = "http://" + window.location.host + "/urban/common/utilityNav.jsp"+timestamp;
		new Ajax.Request(url, {
			method: 'post',
			evalScripts: true,
			onSuccess: function(transport) {
				// get response and render it to the screen
		    	$("utility").innerHTML = transport.responseText;
		    },
		    onFailure: function(transport) {
		    	var responseObj = transport.responseText.evalJSON();
		    	// DEBUG
				alert(responseObj["errorMessage"]);
		    }
		});
	} catch (e) {
		// DEBUG
		alert("reloadUtilityNav: " + e);
	}
}

// logout registered user
function apiLogOut() {
	try {
		// prevent ajax request from being cached
		var timestamp = "&timestamp=" + new Date().getTime();
		// AJAX call
		var url = "http://" + window.location.host + "/rest/bean/uo/commerce/integrations/ProfileIntegrationService/handleRegisteredUserLogout?atg-rest-depth=7" + timestamp;
		new Ajax.Request(url, {
			method: 'post',
			onSuccess: function(transport) {
				// take user to login page
				window.location.href = '/urban/user/checkout_login.jsp';
			},
		    onFailure: function(transport) {
		    	// DEBUG
		    	alert(transport.responseText);
		    }
		});
	} catch (e) {
		alert("logOut: " + e);
	}
}

/*
	forgot password functions
*/
//Event.observe(window,"load",checkForEmail);

// check if user entered email address
function checkForEmail(e) {
	try {
		var emailAddress = $("signInEmail");
		var forgotPasswordLink = $("forgotPasswordLink");
		if (emailAddress) {
			Event.observe(emailAddress,"keyup",validateForgotPassword);
		}	
	} catch (ex) {
		// DEBUG
		alert("checkForEmail: " + ex);
	}
}	

function validateForgotPassword(e) {
	try {
		var emailAddress = $("signInEmail");
		var forgotPasswordLink = $("forgotPasswordLink");
		if ((emailAddress) && (emailAddress.value.length > 0)) {
			hasEmail = true;
		} else {
			hasEmail = false;
		}
		Event.stopObserving(forgotPasswordLink, 'mouseover', passwordToolTip);
		Event.stopObserving(forgotPasswordLink, 'mouseout', removeCartToolTip);
		if ((forgotPasswordLink) && (hasEmail != false)) {
			// submit forgot password
			forgotPasswordLink.onclick = function() { forgotPasswordLink.blur(); forgotPassword() };
		} else {
			Event.observe(forgotPasswordLink, 'mouseover', passwordToolTip);
			Event.observe(forgotPasswordLink, 'mouseout', removeCartToolTip);
			forgotPasswordLink.onclick = function() { forgotPasswordLink.blur(); }
		}
	} catch (ex) {
		// DEBUG
		alert("validateForgotPassword: " + ex);
	}	
}

// forgot password AJAX call
function forgotPassword() {
	try {
		// start processing
		displayCartProcessing();
		// check if email is present; if not, alert user to enter email before submitting forgot password
		var emailAddress = $("signInEmail");
		// prevent ajax request from being cached
		var timestamp = "&timestamp=" + new Date().getTime();
		var params = "arg1=" + emailAddress.value;
		// AJAX call
		var url = "http://" + window.location.host + "/rest/bean/uo/commerce/integrations/ProfileIntegrationService/handleForgotPassword?atg-rest-depth=7" + timestamp;
		new Ajax.Request(url, {
			method: 'post',
			parameters: params,
			onSuccess: function(transport) {
				var response = transport.responseText.evalJSON();
				if (!response["errorConditionExists"]) {
					// update message to user
				    var successMsg = "An email has been sent to your account.";
				    // fade message
				    showSuccessMsg(successMsg, response);
				    // throw coremetrics element tag
				    //cmCreatePageElementTag("FORGOT PSWD CART","CART");
			    } else {
				    var errMsg = "Please enter a valid email address";
				    // check for diagnostic errors as well as 
			    	showErrorMsg(errMsg, response);
		    	}
			},
		    onFailure: function(transport) {
		    	// DEBUG
		    	alert(transport.responseText);
		    }
		});		
	} catch (e) {
		// DEBUG
		alert("forgotPassword: " + e);
	}
}

// remove error classes from all login fields
function removeLoginErrClasses() {
	var arr = new Array("signInEmail", "guestEmail", "signUpEmail", "signUpPassword", "signUpConfirmPassword", "signInEmail", "signInPassword");
	for (var i=0; i<arr.length; i++) {
		var cur = $(arr[i]);
		if (cur) {
			cur.removeClassName("err");
		}
	}
}

// get user profile info
function getUserProfileInfo(loggingIn) {
	try {
		if (userID == "") {
			// prevent ajax request from being cached
			var timestamp = "?timestamp=" + new Date().getTime();
			// AJAX call
			var url = "http://" + window.location.host + "/urban/checkout/single/profile.jsp" + timestamp;
			new Ajax.Request(url, {
				method: 'post',
				onSuccess: function(transport) {
					var response = transport.responseText.evalJSON();
					userID = response["profileId"];
					userEmail = response["profileEmail"];
					profileLocation = response["profileLocation"];
					if (loggingIn) {
						// Coremetrics
						// cmCreateRegistrationTag(userID, userEmail);	
					}				
				},
			    onFailure: function(transport) {
			    	// DEBUG
			    	alert("getUserProfileInfo: " + transport.responseText);
			    }
			});	
		} else {
			if (loggingIn) {
				// Coremetrics
				// cmCreateRegistrationTag(userID, userEmail);	
			}
		}
	} catch (e) {
		// DEBUG
		alert("getUserProfileInfo: " + e);
	}
}