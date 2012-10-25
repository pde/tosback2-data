$(document).ready( function () {	
	/**
	 * Elements classed with exposeComments will have comments stripped out.
	 * Anything in the body of the comment will be exposed to the page.
	 */
	$(".exposeComments").each( function(){
			$(this).html( $(this).html().replace( /(<!--)|(-->)/g,"" ) );
	});
	//call to google +1 implementation
	googlePlusOne();
	//init download bar ad
//	initDownloadBarAdOption1();
	// mama bar more link, using jQuery due to conflict
	$(".brand-mamabar-more-link").hover(
		function () {
			$(this).addClass("brand-mamabar-more-link-hover");
			//Display 3rd party ad under mama bar more dropdown
			$('td.adWrap').css('position', 'static');
			$('td.adWrap').find('div').css('z-index', '0');
		},
		function () {
			$(this).removeClass("brand-mamabar-more-link-hover");
		}
	);

	$('.rememberMeWrap label').live('click', function() {
		$(this).toggleClass("active");

		if ( !$('#staticRememberMe').attr('checked') ) {
			btg.Controller.sendLinkEvent('rememberMe_userChecked');
		} else {
			btg.Controller.sendLinkEvent('rememberMe_userUnchecked');
		}
	});

	if(sw.userInfo.signedInStateCode != 'NSI'){
		// add the user's friendlist to the session
		$.post("/member/friends/friendsTabList.jsp" );
	}
});

// these should update in the footer from server info
//var isFacebookConnected = false;
var isFacebookAutoPublish = false;
var contentBaseUrl = 'www.shockwave.com';
var disabledPermissions = new Array();
var facebookUserName = "";
loginRegCallback = null;
var facebookAuthToken = "";

var timeoutID;
var duration;  // may be a repeat variable

// user login functions


showLoginError = function(trigger){
	$(trigger).parents("form").find(".error").show();
	var loginForm = $(trigger).parents("form").attr("id");
};

hideLoginError = function(trigger){
	$(trigger).parents("form").find(".error").hide();
};

$('.loginForm input').live('keyup',function(e) {
	if( e.keyCode == 13  && ! $(this).find(".formSubmit").hasClass("disabled") ) {
		//signIn( $(this).parents("form").find(".btnMyShockwavePlain") );
		// simulate button click so we don't lose the callback function in some cases
		$(this).parents("form").find(".formSubmit").click();
	}
});

showUpgradeOrCancel = function() {
	showAjaxMessage( '/ajax/modalUpgradeOrCancel.jsp', '#upgradeOrCancelDiv', false, '400');
};

showNickMomOverlay = function() {
    showAjaxMessage( '/ajax/modalNickMomOverlay.jsp', '#nickMomOverlayDiv', false, '930');
};

showStaticSignIn = function( successCallbackFunction, cancelCallbackFunction, trackingCode ) {
	// only show sign in form if NSI
	if(userInfo.signedInState != "NotSignedIn"){
		return;
	}
	showAjaxMessage( '/ajax/modalLogin.jsp', '#loginStatic', false, '950', null, null, null, function() {
		if ( typeof trackingCode != 'undefined' ) {
			$("#loginSource").val( trackingCode );
			$("#registerSource").val( trackingCode );
		}
		// Omniture reg/signup tracking
		sendCustomLinkEvent("modalLoginFormOpen", {
			eVar14: 'modalLoginForm',
			events: 'event28',
			prop26: 'modalLoginForm'
		});

		// Re-assign event listeners if callback function is defined, override with fcns as params
		if ( typeof successCallbackFunction != 'undefined' && successCallbackFunction != null || typeof cancelCallbackFunction != 'undefined' && cancelCallbackFunction != null ) {
			$(".staticRegisterLink").bind( 'click', function() {
				showStaticRegister( successCallbackFunction, cancelCallbackFunction );
				return false;
			});
			$(".facebookConnectPopupLink").bind( 'click', function() {
				facebookConnectLink( "fbc_btn_modalLogn", successCallbackFunction );
				hideMessage();
				return false;
			});
		}
		if ( typeof cancelCallbackFunction != 'undefined' && cancelCallbackFunction != null ) {
			$('.dimmerBtnClose').bind( 'click', function() {
				cancelCallbackFunction();
				hideMessage();
				return false;
			});
		}

		$('#modalLogin input.signInFormLogin, .sw_drSignupContainer input.signInFormLogin').focus();
		// prevent default form action in chrome
		$('#modalLoginForm').bind("submit", function(event){
			event.preventDefault();
		});

		/* IE 7 fix - in this function */
		if($.browser.msie){
			$("#modalLoginForm .formSubmit").live( "click", function() {
				if ( typeof successCallbackFunction != 'undefined' && successCallbackFunction != null ) {
					signIn( this, successCallbackFunction );
				} else {
					signIn( this );
				}
					return false;
				});
			} else {
				$("#modalLoginForm .formSubmit").bind( "click", function() {
					if ( typeof successCallbackFunction != 'undefined' && successCallbackFunction != null ) {
						signIn( this, successCallbackFunction );
					} else {
						signIn( this );
					}
					return false;
				});
			}
	});
	/***AUTOMATION:

	// Notify the test suite that login is ready

	// TODO: Put in flag condition here
	notifyTestSuite("LOGIN_READY", {});
	*/
};
<!-- google +1 implementation -->
googlePlusOne = function() {
	//$.getScript("https://apis.google.com/js/plusone.js");
};

showTransitionStaticSignIn = function( successCallbackFunction, cancelCallbackFunction, trackingCode ) {
	showAjaxMessage( '/ajax/modalTransitionLogin.jsp', '#loginStatic', false, '620', null, null, null, function() {
		if ( typeof trackingCode != 'undefined' ) {
			$("#loginSource").val( trackingCode );
			$("#registerSource").val( trackingCode );
		}
		// Re-assign event listeners if callback function is defined, override with fcns as params
		if ( typeof successCallbackFunction != 'undefined' && successCallbackFunction != null ) {
			$(".staticRegisterLink").bind( 'click', function() {
				showStaticRegister( successCallbackFunction, cancelCallbackFunction );
				return false;
			});
			$(".facebookConnectPopupLink").bind( 'click', function() {
				facebookConnectLink( "fbc_btn_modalTransitionLogin", successCallbackFunction );
				hideMessage();
				return false;
			});
		}
		if ( typeof cancelCallbackFunction != 'undefined' && cancelCallbackFunction != null ) {
			$('.dimmerBtnClose').bind( 'click', function() {
				cancelCallbackFunction();
				hideMessage();
				return false;
			});
		}

		$('#modalLogin input.signInFormLogin').focus();
		// prevent default form action in chrome
		$('#modalLoginForm').bind("submit", function(event){
			event.preventDefault();
		});
		$("#modalLoginForm .formSubmit").bind( "click", function() {
			if ( typeof successCallbackFunction != 'undefined' && successCallbackFunction != null ) {
				signIn( this, successCallbackFunction );
			} else {
				signIn( this );
			}
			return false;
		});
		return false;
	});
};

showStaticRegister = function( successCallbackFunction, cancelCallbackFunction, trackingCode ) {
	// Get modal window
	showAjaxMessage( '/ajax/modalRegister.jsp', '#registerStatic', false, '950', null, null, true, function() {
		// Assign Event Listeners
		if ( typeof trackingCode != 'undefined' ) {
			$("#loginSource").val( trackingCode );
			$("#registerSource").val( trackingCode );
		}
		// Omniture reg/signup tracking
		sendCustomLinkEvent("modalRegisterOpen", {
			eVar14: 'modalRegister',
			events: 'event28',
			prop26: 'modalRegister'
		});
		if ( typeof successCallbackFunction != 'undefined' && successCallbackFunction != null || typeof cancelCallbackFunction != 'undefined' && cancelCallbackFunction != null   ) {
			$("#staticSignInLink").bind( 'click', function() {
				showStaticSignIn( successCallbackFunction, cancelCallbackFunction );
				return false;
			});
			$(".facebookConnectPopupLink").bind( 'click', function() {
				facebookConnectLink( "fbc_btn_modalRegister", successCallbackFunction );
				hideMessage();
				return false;
			});
		}
		if ( typeof cancelCallbackFunction != 'undefined' && cancelCallbackFunction != null ) {
			$('.dimmerBtnClose').bind( 'click', function() {
				cancelCallbackFunction();
				hideMessage();
				return false;
			});
		}
		$('#modalRegister #emailAddress').focus();
		$("#modalRegister .formSubmit").bind( 'click', function () {
			submitStaticRegister(successCallbackFunction, this);
		});
		return false;
	});
};

showSetScreenname = function( successCallbackFunction, trackingCode ) {
	// Get modal window
	showAjaxMessage( '/ajax/modalSetScreenname.jsp', '#modalSetScreenname', false, '440', null, null, true, function() {
		$('#screennameForm #screenName').focus();
		$('#screennameForm #screenName').blur(function() {
			$('#hiddenCheckScreenName').click();
		});
		$("#screennameForm .formSubmit").bind( 'click', function () {
			clearFormErrors( $("#screennameForm") );

			$.post( "/account/choose-screenname-submit.jsp",
				{
					screenName: $('#screennameForm #screenName').val(),
					agreeToTerms: $("#screennameForm #agreeToTerms").attr("checked"),
					newsletterSubscription: $("#screennameForm #newsletterSubscription").attr("checked")
				},
				function ( data, textStatus ) {
					showJsonFormErrors( data, $('#screennameForm'), successCallbackFunction );
				}
			);
		});
		return false;
	});
};

signIn = function( trigger, callbackFunction, secondBtn, analyticsFormID ) {
	// try to get an id to use for Omniture tracking
	if( !analyticsFormID ){
		analyticsFormID = $(trigger).parents("form").attr("id");
		if( !analyticsFormID ) {
			analyticsFormID = "idNotSupplied"; // if we see this in eVar14 Omniture reports we need to fix something tthe call to have a form ID
		}
	}

	disableSubmitBtn(trigger);
	if(typeof secondBtn != 'undefined') { disableSubmitBtn(secondBtn); }
	hideLoginError(trigger);

	var rememberMe = 0;
	if ($(trigger).parents("form").find(":checkbox").is(":checked") ) {
		rememberMe = 1;
	}

	// make a post request to login controller
	$.post( "/account/memberLoginAjax.jsp",
		{
			source: "JsonRequest",
			loginSource: $("#loginSource").val(),
			login: $(trigger).parents("form").find(".signInFormLogin").val(),
			password: $(trigger).parents("form").find(".signInFormPassword").val(),
			rememberLogin: rememberMe
		},
		function ( data, textStatus ) {
			// Expecting a JSON response back from login controller
			var results = eval( '(' + data + ')' );
			var success = ( results.status == 'ok');
			if (!success) {
				// Omniture reg/signup tracking
				sendCustomLinkEvent("aLoginFormSubmitError", {
					events: 'event7,event28,event29',
					prop26: analyticsFormID + ':error'
				});
				showLoginError(trigger);
				restoreSubmitBtn(trigger);
				if(typeof secondBtn != 'undefined') { restoreSubmitBtn(secondBtn); }
			} else {
				// Omniture reg/signup tracking
				var prop26 = analyticsFormID + ":success";
				if(rememberMe==1){
					prop26 += "-remember";
				}
				// check to see if it is a facebook linked account form and add events
				var fbLinkedEvents = '';
				if (analyticsFormID == 'signInFacebook'){
					fbLinkedEvents = ',event12,event14';
				}
				sendCustomLinkEvent("aLoginFormSubmitSuccess", {
					events: 'event7,event8,event29,event30' + fbLinkedEvents,
					eVar9: convertSignInState( results.login_state ),
					eVar12: results.member_id,
					eVar21: results.gender,
					eVar22: results.birthDateInDays,
					eVar20: results.creationDateInDays,
					prop13: results.creationDateInDays,
					prop14: results.gender,
					prop16: results.member_id,
					prop18: results.birthDateInDays,
					prop26: prop26
				});
				// on success if there was a callback function passed in, call that and dismiss the login overlay
				if ( typeof callbackFunction == 'function' ){
					hideMessage(true);
					// change some page local variables so any other scripts see the user as signed in too
					updateUserInfo(results);
					callbackFunction( results );
				// otherwise just reload the page
				} else {
					window.location.reload();
				}
			}
		}
	);
};

/**
 * Converts from site standard "SignedIn" state codes to the legacy "LoggedIn" state that Omniture tracks.
 * Returns a loginState code
 * @param signInState
 */
convertSignInState = function( signInState ){
	switch( signInState ) {
	case "SignedInStandard":
		return "LoggedInFree";
		break;
	case "SignedInClub":
		return "LoggedInClub";
		break;
	case "SignedInFreeClub":
		return "LoggedInFree";
		break;
	case "SignedInPremium":
		return "LoggedInUnlimited";
		break;
	default:
		return "notLoggedIn"
	}
};

headerSignOut = function() {
	// use time in the query string to keep IE from caching the logout request
	var time = new Date().getTime();
	// make a post request to the logout controller
	$.get( "/memberLogout.jsp?"+time, null,
		function ( data ) {
			// Expecting a JSON response back from login controller
			var results = eval( '(' + data + ')' );

			// if there is a redirect URL, go there
			if ( "" != results.message ) {
				location.href = results.message;

			// otherwise just reload the page the user was on
			} else {
				window.location.reload(true);

			}
		}
	);
};



headerSignOutNoRedirect = function(callbackFunction) {
	// use time in the query string to keep IE from caching the logout request
	var time = new Date().getTime();
	// make a post request to the logout controller
	$.get( "/memberLogout.jsp", null,
		function ( data ) {
			// Expecting a JSON response back from login controller
			var results = eval( '(' + data + ')' );
			// on success if there was a callback function passed in, call that
			if ( callbackFunction ){
				callbackFunction( results );
			}
		}
	);
};

getRequestParameter = function ( name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
	return "";
  else
	return results[1];
};



var facebookPopupIsOpen = false;
facebookPopupVideoAdCheck = function() {
	if ( facebookPopupIsOpen ) {
		$("object#preplayMovie").attr("style","");
		$("object#preplayMovie").css("visibility","hidden");
		$("object#adLoader_div").attr("style","");
		$("object#adLoader_div").css("visibility","hidden");
	}
};
facebookPopupOpened = function() {
	facebookPopupIsOpen = true;
	hideFlashObjects();
};
facebookPopupClosed = function() {
	facebookPopupIsOpen = false;
	showFlashObjects();
};

var showConfirm = false;

showFacebookConnectConfirmation = function() {
	if( typeof pageLevelLoginCallbackFunction == 'function'){
			clickFacebookConnect( pageLevelLoginCallbackFunction, true );
	}
	btg.Controller.sendLinkEvent('fbc_regoverlay_success');    // post to omniture: facebook account succesfully linked
	showAjaxMessage( '/ajax/facebookLinkAccountsConfirmPod.jsp', '#facebookLinkAccountsConfirm', false, '600', '', '', '', function () {
			$("#fbConfirmContinue").click(function () {
					hideMessage();
					return false;
			});
		});
};

showFacebookError = function(error) {
	alert(error);
};

facebookLinkNewScreenName = function() {
	$("#facebookRegistrationForm .screennameError").hide();
	$('#facebookRegistrationForm .screenName').val('');
	$('#facebookRegistrationForm .screenName').focus()
};
facebookLinkExistingScreenName = function() {
	$("#facebookRegistrationForm .screennameError").hide();
	var existingName = $('#facebookRegistrationForm .screenName').val();
	$('#facebookRegistrationForm .screenName').val('');
	$('#facebookLinkScreenName').val( existingName );
	$('#facebookLinkPassword').focus();
};
facebookLinkNotYou = function() {
}

// end of user login functions

$("#globalSearch input").click(function(){
	$(this).css("color","#000")
});

// extends ut.tabs
// will target tabs panel or, if it exists, inner div with class of tabEqualizer
// sets min-height of all tabEqualizer divs equal to the first shown tab
// doesn't work with IE6
$.extend($.ui.tabs.prototype, {
	equalize: function() {
		var target = this.panels;
		if ( target.find(".tabEqualizer").length > 0) {
			var target = this.panels.find(".tabEqualizer");
		}
		var heights = target.map(function() {
			return $(this).height();
		})
		.get()
		.sort(function(a, b) {
			return b - a;
		});
		// set all panels to highest height
		target.css('min-height', heights[0]);
	}
});

// initialize specific UI tabs
$("#podHotOnlineGames").tabs().tabs("equalize");
$("#podStaffPicks").tabs();
$("#podStaffPicks").show();
$("#podGameIcons").tabs().tabs("equalize");
$("#podClubGames").tabs().tabs("equalize");
//	$("#podAccountSettings").tabs();
$("#podCommSettings").tabs().tabs("equalize");
$("#podHighScores").tabs();
$("#podHighScores").show();
$("#podMyGames > .podContent").tabs();
$("#podMyGames").show();
$("#podGameTrophies").tabs();
$("#podGameTrophies ol").tabs();
$("#podGameTrophies").show();
$("#pokerTabs").tabs();
//	$("#pokerStakes").tabs();
$("#bingoTabs").tabs({ selected: 1 });
$(".bingoTypeTabs").tabs();
$("#podMyActivity").tabs();

// Delay Plugin for jQuery
// - http://www.evanbot.com
// - ? 2008 Evan Byrne
//jQuery.fn.delay = function(time,func){
	//return this.each(function(){
		//setTimeout(func,time);
	//});
//};

/**
 * Formats a number with commas ( 99999 -> 99,999 )
 * @param number
 */
formatNumber = function( number ) {
	if ( isNaN(number) ) return number;
	if ( typeof number != "string" ) {
		number = number.toString();
	}
	for (var i = number.length-2; i>0; i-=3 ) {
		if ( i-1 > 0 ) {
			number = number.substring( 0, i-1 ) + "," + number.substring( i-1 );
		}
	}
	return number;
};

// function to preload images, call with $.preloadImages
jQuery.preloadImages = function() {
  for(var i = 0; i<arguments.length; i++)  {
	 jQuery("<img>").attr("src", arguments[i]);
  }
};

// centers an element vertically/horizontally
// requires parent be position relative or absolute
// positioning for .centerVH is already set in common.css
// Old method didn't work with firefox 3.6 updatd 2.22.2010
centerVH = function() {
	$(".centerVH").each(function(){
		var imgHeight = $(this).height();
		var imgWidth = $(this).width();
		var container = $(this).parent();
		var containerHeight = container.height();
		var containerWidth = container.width();
		var top = Math.floor((containerHeight / 2) - (imgHeight / 2));
		var left = Math.floor((containerWidth / 2) - (imgWidth / 2));
		$(this).css({position : "absolute", "top" : top,"left" : left});
	});
}

jQuery.tab = function(tabNum) {
	$('.selector').tabs({ selected: tabNum });
};


// form submit validation
// disables the button on submit
// add disableSubmitBtn(trigger); at the beginning of a form to disable submit button
// add restoreSubmitBtn(trigger); at the failure at any AJAX form to restore button
disableSubmitBtn = function(trigger) {

	// clone the trigger and disable it
	var disabledButton = $(trigger).clone();
	disabledButton.addClass("disabled").attr("onclick","");

	// inject the cloned, disabled trigger into the dom
	$(trigger).before(disabledButton);

	// and hide the original trigger
	$(trigger).hide();
};
restoreSubmitBtn = function(trigger) {
	$(trigger).prev(".disabled").remove();
	$(trigger).show();
};


/**
 * global function to update the tokens in the header
 * @param newTokenBalance number of the new balance to display in the header
 */
updateTokens = function ( newTokenBalance ) {

	// format or reject the newTokenBalance
	if ( isNaN( newTokenBalance ) ) {
		return false;
	}
	$("#tokenCount span").after("<span style='display:none;'>" + formatNumber( newTokenBalance ) + "</span>");
	$("#tokenCount span").each( function() {
	   $(this).toggle("slow");
	});
	$("#tokenCount span:first").remove();
};

/**
 * global function to update the Shockwave Cash in the header
 * @param newCashBalance number of the new balance to display in the header
 */
updateCash = function ( newCashBalance ) {

	// format or reject the newTokenBalance
	if ( isNaN( newCashBalance ) ) {
		return false;
	}
	$("#headerCashBalance span").after("<span style='display:none;'>" + formatNumber( newCashBalance ) + "</span>");
	$("#headerCashBalance span").each( function() {
	   $(this).toggle("slow");
	});
	$("#headerCashBalance span:first").remove();

	$("#cashBalance span").text( formatNumber( newCashBalance ) );
};

// clear game wall search input on focus
$("#cooliris input").focus(function(){
	$(this).val("").css("color","#333");
});

// detects which search button has been clicked
//TODO: fix site search URL
$("#globalSearch a").click(function(){
	var trigger = $(this).attr("id");
	var queryString = encodeURIComponent( $("#globalSearch :text").attr("value") );
	// check that the default text has changed
	if ( queryString != "Search..." && queryString != "") {
		if ( trigger == "searchWeb" ) {
			document.location.href = "http://search.live.com/results.aspx?q="+queryString+"&mkt=en-us&FORM=VCM019";
		} else {
			document.location.href = "/search.jsp?q="+queryString;
		return false;
		}
	}
});

$("#globalSearch").keyup(function(e) {
	if(e.keyCode == 13) {
		$("#globalSearch #searchSite").click();
		return false;
	}
});

// setup auto complete for site search
if ( $("#globalSearchInput, .searchFilter input").length > 0 ) {
	$("#globalSearchInput, .searchFilter input").autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: "http://search.mtvnservices.com/typeahead/suggest/",
				dataType: "jsonp",
				cache: true,
				jsonpCallback: "typeAhead",
				data: {
					siteName: "shockwave",
					prefix: request.term,
					format: "json"
				},
				success: function(data) {
					response( data )
				}
			})
		},
		open: function ( event, ui ) {
			hideFlashObjects();
			$(this).css({
				"border-bottom-width": "0",
				"padding-bottom": "4px"
			});
			// highlight search terms
			var query = $(this).val();
			$(this).autocomplete("widget").find("a").html( function ( i, text ) {
				return text.replace(query, "<b>" + query + "</b>").toLowerCase();
			});
		},
		close: function(){
			showFlashObjects();
			$(this).css({
				"border-bottom-width": "1px",
				"padding-bottom": "3px"
			});
		},
		select: function(event, ui){
			$("#globalSearchInput").val(ui.item.value);
			$("#globalSearch #searchSite").click();
			return false;
		},
		minLength: 2
	});
}

/**
 * Function to AJAX load a URL into a jQuery UI-Tabs tab with additional configurable options
 * NOTE: responseText, textStatus and XMLHttpRequest are available for use in the callback function
 * @param tab anchor object for which the HREF attribute specifies what element to inject the results into
 * @param url the AJAX URL to load
 * @param runOnce removes the loading functionality (onclick attribute) so it happens only once per page view
 * @param callback an optional function to call when the ajax load is finished, success or not.
 */
ajaxTabLoad = function ( tab, url, runOnce, callback ) {
	// load the data from the server
	if ( typeof tab == "object" ) {
		var targetDiv = $(tab).attr( "href");
	} else {
		var targetDiv = $(tab);
	}
	$( targetDiv ).load( url, {}, function( responseText, textStatus, XMLHttpRequest ) {

		if ( callback ) {
			callback( responseText, textStatus, XMLHttpRequest );
		}
	});

	// if runOnce, prevent it from loading again
	if ( runOnce ) {
		$( tab ).removeAttr( "onclick" );
	}
	return false;
};

/**
 *
 * @param url the AJAX URL to load
 * @param targetElement the target element or a jquery selector string to load the results into
 * @param callback an optional function to call when the ajax load is finished, success or not.
 */
ajaxLoad = function ( url, targetElement, callback ) {
	// determine if the targetElement is indeed an object or a string to load one
	if ( typeof targetElement == "string" ) {
		targetElement = $( targetElement );
	}

	// load the data from the server
	targetElement.load( url, {}, function( responseText, textStatus, XMLHttpRequest ) {
		if ( callback ) {
			callback( responseText, textStatus, XMLHttpRequest );
		}
	});
};

removeShowAllReviewsLink = function() {
	$('#showAllReviewsLink').remove();
};

timedRedirect = function (redirectUrl, delaySeconds){
	var redirectTimer = setTimeout( function() {
		document.location.href = redirectUrl;
	}, delaySeconds * 1000);
};

if (window.FB) {
	// extended permissions hack
	FB.provide('UIServer.Methods', {
	  'permissions.request': {
		size : { width: 575, height: 240 },
		url : 'connect/uiserver.php',
		transform : function(call) {
			if (call.params.display == 'dialog') {
			  call.params.display = 'iframe';
			  call.params.channel = FB.UIServer._xdChannelHandler(
				  call.id,
				  'parent.parent'
				);
			  call.params.cancel = FB.UIServer._xdNextHandler(call.cb, call.id, 'parent.parent', true );
			  call.params.next = FB.UIServer._xdResult(call.cb, call.id, 'parent.parent', false );
			}
			return call;
		  }
	  }
	});
}

createCookie = function(name,value,secs){
	if (secs) {
		var date = new Date();
		date.setTime(date.getTime()+(secs*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
};

readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};

eraseCookie = function(name) {
	createCookie(name,"",-1);
};

// disables text selection
// user jQuery plug in
$(function() {
	 $('.unselectable').disableTextSelect();
});

checkScreenName = function( trigger ) {
	$( trigger ).parent().find( ".screennameError" ).hide();
	$( trigger ).parent().next( ".error" ).hide();
	$( trigger ).parent().find( ".screennameSuccess" ).hide();
	$( trigger ).parent().find( ".screennameInvalid" ).hide();

	var screenname = jQuery.trim( $( trigger ).parent().find( ".screenName" ).val() );
	if ( screenname != "" ) {
		$.post( "/account/check-screenname.jsp",
			{
				screenname: screenname
			},
			function ( data, textStatus ) {
				var response = eval('(' + data + ')');
				if ( response.status == 'ok' ) {
					$( trigger ).parent().find( ".screennameSuccess" ).show();
				} else if ( response.message == 'invalid' ) {
					$( trigger ).parent().find( ".screennameInvalid" ).show();
				} else {
					$( trigger ).parent().find( ".screennameError" ).show();
				}
			}
		);
	}
};
$(".checkScreenNameLink").live( 'click', function() {
	checkScreenName( this );
	return false;
});
$("#fbExistingScreenName").live( 'click', function() {
	facebookLinkExistingScreenName();
	return false;
});
$("#fbLinkScreenName").live( 'click', function() {
	facebookLinkNewScreenName();
	return false;
});
$(".staticRegisterLink").live( 'click', function() {
	showStaticRegister();
	return false;
});
$(".staticSignInLink").live( 'click', function() {
	showStaticSignIn();
	return false;
});
$("#linkMyAccountsBtn").live( 'click', function() {
	signIn(this, linkMyAccountsSigninCallback, $('#btnJoinNow'), 'signInFacebook');
	return false;
});
$(".removeFriendLink").live( 'click', function() {
	var link = $(this).parents(".friendUnhideRemove").find("span").html();
	showMessage('#removeFriend','400', link );
	return false;
});
$(".unhideFriendLink").live( 'click', function() {
	var link = $(this).parents(".friendUnhideRemove").find("span").html();
	showMessage('#unhideFriend','400', link );
	return false;
});
$(".hideMessageBtn").live( 'click', function() {
	hideMessage();
	return false;
});

getWindowUrlBase  = function() {
	var url = window.location.href;
	var pos = url.indexOf("://");
	var slashPos = url.indexOf("/", 8);
	if (slashPos > -1) {
		url = url.substring(0, slashPos);
	}
	return url;
};


// cycles the ticker
tickerCycle = function(){
	var tickerEls = $("#tickerHome").find(".tickerContent li").length - 1; // array of all the ticker elements
	var i = 0;
	moveTicker = function() {
		$("#tickerHome").find(".tickerContent li").eq(i).fadeOut();
		if ( i == tickerEls ) { i = 0; } else { i = i+1; }
		$("#tickerHome").find(".tickerContent li").eq(i).fadeIn();
	};
	var intervalID;
	cycleTicker = function() {
		intervalID = setInterval(moveTicker, 6000);
	};
	moveTicker();
	cycleTicker();
};

// wait until page has loaded before starting tickerCycle
$(window).load(function(){
	tickerCycle();
});

// subnav dropdowns
$('li.dropmenu').hover(function() {
    // ie7 fix for myGames dropdown - increase z-index
    if($.browser.msie && $.browser.version == 7){
        $('#mainNav').css({ 'z-index' : '3' });
    }
	var trigger = $(this);
	//allowDropMenu = true;
	//$(this).delay( 500, function () {
		//if ( allowDropMenu ) {
			$('div', trigger).show();
			$(trigger).addClass("active");
		//}
	//});
},
function() {
	//allowDropMenu = false;
    // ie7 fix for myGames dropdown - decrease z-index
    if($.browser.msie && $.browser.version == 7){
        $('#mainNav').css({ 'z-index' : '0' });
    }
	$('div', this).hide();
	$(this).removeClass("active");
});

$('.dropmenu div ul li').hover(function() {
	$(".dropmenu > a").addClass("active");
	$('ul:first', this).each(function() {
		$(this).css('top', $(this).parent().position().top );
		$(this).css('left', $(this).parent().position().left + $(this).parent().width() );
		$(this).css({ 'z-index' : '1000' });
		$(this).show();
	});
},
function() {
	$('ul:first', this).hide();
});


// 'More' link downdown in sub nav

$("#moreDropDown").click(function(){
	$("#moreDropDown a").blur(); // gets rid of outline around link
	$("#moreDropDown").toggleClass("active");
	if ( $("#moreDropDown").hasClass("active") ) {
		$("#moreDropDown span").attr("class","").addClass("arrowUpRit");
	} else {
		$("#moreDropDown span").attr("class","").addClass("arrowDownRit");
	}
	$("#subNavMore").toggle();
	return false;
});


// toggle the sub token content on Token page

$(".tokenTotalToggle").live("click", function(){
	var el = $(this);
	$(el).parent("td").parent("tr").next("tr.breakdown").toggle();
	$(this).toggleClass("btnExpand").toggleClass("btnCollapse");
	return false;
});

// toggles content below trigger (contained by one element)
$(".toggleNext").live("click", function(){
	var el = $(this);
	$(el).parents("li").eq(0).find(".toggleContent").toggle();
	$(this).toggleClass("btnExpand").toggleClass("btnCollapse");
	buttonHTML = $(this).html();
	if( buttonHTML == "hide") { $(this).html("show"); }
	if( buttonHTML == "show") { $(this).html("hide"); }
	return false;
});


// toggles ID of element defined by 2nd class in trigger link
// class="toggleEl toggle-idOfElementToToggle"
// id cannot have dashes
$(".toggleEl").click(function() {
	var triggerClasses = $(this).attr("class");
	var target = triggerClasses.split(" ")[1];
	var target = target.split("-")[1];
	$("#"+target).toggle();
	$(this).toggleClass("active");

	if ( $(this).find("span").hasClass("arrowDownRit") ) {
		$(this).find("span").removeClass("arrowDownRit")
		$(this).find("span").addClass("arrowUpRit")
	} else {
		$(this).find("span").removeClass("arrowUpRit")
		$(this).find("span").addClass("arrowDownRit")
	}

	var triggerHTML = $(this).find("span").html();
	if (triggerHTML == "View More") {
		$(this).find("span").html("View Less");
	} else if( triggerHTML == "View Less") {
		$(this).find("span").html("View More");
	}
	return false;
});



/**
 *
 */

guestPassFormSubmit = function() {
	// remove any old error messages
	clearFormErrors( $("#guestPassForm") );

	$.post( "/myShockwave/sendGuestPass.jsp",
		{
			friendEmail: $("#guestPassForm #friendEmail").val(),
			friendName: $("#guestPassForm #friendName").val(),
			yourName: $("#guestPassForm #yourName").val(),
			message: $("#guestPassForm #message").val()
		},
		function ( data, textStatus ) {
			showJsonFormErrors( data, $('#guestPassForm') );
		}
	);
	return false;
};

cancelSubscriptionSubmit = function( trigger ) {
	$(trigger).parent().html("Cancelling your subscription...");
	return true;
};

passwordFormSubmit = function() {
	// remove any old error messages
	clearFormErrors( $("#changePasswordForm") );

	// make a post request to login controller
	$.post( "/myShockwave/accountSettings/changePasswordSubmit.jsp",
		{
			oldPassword: $("#changePasswordForm #oldPassword").val(),
			newPassword: $("#changePasswordForm #newPassword").val(),
			newPassword1: $("#changePasswordForm #newPassword1").val()
		},
		function ( data, textStatus ) {
			showJsonFormErrors( data, $('#changePasswordForm') );
		}
	);
	return false;
};

passwordResetFormSubmit = function() {

	// remove any old error messages
	clearFormErrors( $("#changePasswordForm") );

	// make a post request to reset password controller
	$.post( "/member/processResetPassword.jsp",
		{
			newPassword: $("#changePasswordForm #newPassword").val(),
			newPassword1: $("#changePasswordForm #newPassword1").val(),
			memberId: $("#changePasswordForm #memberId").val(),
			isPasswordReset: $("#changePasswordForm #isPasswordReset").val()
		},
		function ( data, textStatus ) {
			showJsonFormErrors( data, $('#changePasswordForm') );
		}
	);
	return false;
};

shareGameFormSubmit = function() {
	// remove any old error messages
	clearFormErrors( $("#shareGameForm") );

	// make a post request to login controller
	$.post( "/games/shareGame.jsp",
		{
			yourName: $("#shareGameForm #yourName").val(),
			yourEmail: $("#shareGameForm #yourEmail").val(),
			recipientEmails: $("#shareGameForm #recipientEmails").val(),
			message: $("#shareGameForm #message").val(),
			keyword: $("#shareGameForm #keyword").val()
		},
		function ( data, textStatus ) {
			showJsonFormErrors( data, $('#shareGameForm'), function(){
				choiceStream.shareGame();
				toggleTool('#gameShareGameTrigger','#gameShareGame');
			});
		}
	);
	return false;
};

// AJAX FORM SUBMISSIONS (TODO: update all above implementations to use this new framework)

$("#guestPassActivationForm").bind('submit', function() {
	clearFormErrors( $("#guestPassActivationForm") );
	$(this).ajaxSubmit( function( data ) {
		showJsonFormErrors( data, $('#guestPassActivationForm') );
	});
	return false;
});
$("#cashCardPinForm").bind('submit', function() {
	clearFormErrors( $("#cashCardPinForm") );
	$(this).ajaxSubmit( function( data ) {
		showJsonFormErrors( data, $('#cashCardPinForm') );
	});
	return false;
});

$("#contactUsForm").bind('submit', function() {
	clearFormErrors( $("#contactUsForm") );
        $(this).ajaxSubmit( function( data ) {
		showJsonFormErrors( data, $('#contactUsForm') );
	});
	return false;
});
$("#contactUsForm.inGameForm").unbind('submit');
$("#contactUsForm.inGameForm").bind('submit', function() {
	if ( $('form #computerBrowser').val() == '' ) {
		alert("Please indicate your browser");
		return false;
	}
	if ( $('form #computerOS').val() == '' ) {
		alert("Please indicate what your computer uses");
		return false;
	}
	if ( $('form #contactNotes').val() == '' ) {
		alert("Please provide a suggestion");
		return false;
	}
	if ( $('form #subject').val() == '' ) {
		alert("Please provide a issue type ");
		return false;
	}

	$(this).ajaxSubmit( function( data ) {
		// just reset the form
		alert( "thank you for your feedback");
		$('form #subject option:first').attr('selected', 'selected');
		$('form #contactNotes').val('');
	});
	return false;
});

$("#registrationForm").bind('submit', function() {
	siteRegister( $(this) );
	return false;
});
$("#photoSubmitForm").bind('submit', function() {
	clearFormErrors( $("#photoSubmitForm") );
	$(this).ajaxSubmit( function( data ) {
		showJsonFormErrors( data, $('#photoSubmitForm') );
	});
	return false;
});
$("#developersForm").bind('submit', function() {
	clearFormErrors( $("#developersForm") );
	$(this).ajaxSubmit( function( data ) {
		showJsonFormErrors( data, $('#developersForm') );
	});
	return false;
});
$("#billingInfoForm").bind('submit', function() {
	clearFormErrors( $("#billingInfoForm") );
	$(this).ajaxSubmit( function( data ) {
		showJsonFormErrors( data, $('#billingInfoForm') );
	});
	return false;
});
$("#friendsSettingForm").bind('submit', function() {
	clearFormErrors( $("#friendsSettingForm") );
	$(this).ajaxSubmit( function( data ) {
		showJsonFormErrors( data, $('#friendsSettingForm') );
	});
	return false;
});
$("#newsletterForm").bind('submit', function() {
	clearFormErrors( $("#newsletterForm") );
	$(this).ajaxSubmit( function( data ) {
		showJsonFormErrors( data, $('#newsletterForm') );
	});
	return false;
});
$("#staffReviewForm").bind('submit', function() {
	clearFormErrors( $("#staffReviewForm") );
	$(this).ajaxSubmit( function( data ) {
		showJsonFormErrors( data, $('#staffReviewForm') );
	});
	return false;
});

$("#personalInfoForm").bind('submit', function() {
	clearFormErrors( $("#personalInfoForm") );
	$(this).ajaxSubmit( function( data ) {
		showJsonFormErrors( data, $('#personalInfoForm') );
	});
	return false;
});

submitGameChallengeForm = function() {
	var recipientEmailAddresses =  $( "#gameChallengeForm" ).find( "#recipientEmails" ).val();
	clearFormErrors( $("#gameChallengeForm") );
	$("#gameChallengeForm").ajaxSubmit( function( data ) {
		showJsonFormErrors( data, $('#gameChallengeForm'), function() {
			showChallengeConfirm( recipientEmailAddresses )
		});
	});
	return false;
};

// tag picker on game landing pages
// uses hidden checkmarks
$(".tagPick3 label").click(function(){
	var target = $(this);

	var n = $(".tagPick3 label.active").length; // get number of active tags

	if ( $(target).hasClass("active") ) {
		$(target).removeClass("active");
		$(".tagPick3label").css("color","#666");
	} else if (n < 3) {
		$(target).addClass("active");
	} else {
		$(".tagPick3label").css("color","red");
		return false; // to prevent checkmark
	}

});

// a helper method to update when a review is tagged as helpful or not
reviewHelpful = function( reviewId, isHelpful, isStaffReview ) {
	$.post( "/helpful.jsp?id=" + reviewId + "&rating=" + isHelpful + "&s=" + isStaffReview );
	var yesVotes = $("#reviewHelpful_" + reviewId + " span:eq(0)").html();
	var totalVotes = $("#reviewHelpful_" + reviewId + " span:eq(1)").html();
	if ( isHelpful ) {
		yesVotes = yesVotes * 1 + 1;
	}
	totalVotes = totalVotes * 1 + 1;
	var results = "<div class='results' style='display:none;'><span>" + yesVotes + "</span> of <span>" + totalVotes + "</span> found this review helpful</div><div class='results'><span>Thank you for voting!</span></div>";
	$("#reviewHelpful_" + reviewId ).html( results );
	$(this).delay( 2000, function () {
		$("#reviewHelpful_" + reviewId + " .results" ).toggle( "slow" );
	});
	return false;
};


// =============================
// Online Game page functions
// =============================

//jump to the user's score in the High Scores Tab
// finds the elements
jumpToScore = function(trigger){
	var targetObj = $(trigger).parents(".podInnerBox").prev("div"); // get container element that scrolls
	var containerHeight = $(targetObj).height(); // get height of container
	var targetTDHeight = $(targetObj).find("td").height(); // get height of td within container
	var finalScrollToPos = (containerHeight/2) - (targetTDHeight/2) - 3; // do the math to get it to center
	$(targetObj).scrollTo('tr.highlight', 500, { offset:-finalScrollToPos }); // make the scrollTo call
	return false;
};


// =============================
// Online Homepage functions
// =============================

/**
 * AJAX loads the tabs in Today's Hottest Games so it only runs once per page view,
 * then re-initializes the hover boxes for the games
 * @param tab the tab to load
 * @param url the ajax url to load into the tab
 */
loadGames = function( tab, url ) {
	ajaxTabLoad ( tab, url, true, function() {
		initHoverBox();
	});
};

// editing profile questions
$("#profileQuestionsEdit").click(function(){
	$(this).hide();
	$("#podProfileQuestions .podInnerBox input, #moreProfileQuestions, #profileQuestionsCancel, #profileQuestionsSave").show();
	$("#podProfileQuestions .podInnerBox p").hide();
	$("#podProfileQuestions .podInnerBox p.nohide, #podProfileQuestions .podInnerBox h3").show();
	$("#podProfileQuestions .toggleEl").hide();
	return false;
});
$("#profileQuestionsSave").click(function(){
	return false;
});
$("#profileQuestionsCancel").click(function(){
	$("#podProfileQuestions .podInnerBox p, #profileQuestionsEdit").show();
	$("#podProfileQuestions .podInnerBox input, #profileQuestionsCancel, #profileQuestionsSave, #podProfileQuestions .podInnerBox h3.titleHide").hide();
	if ( $("#moreProfileQuestions").css("display") == "block") {
		$("#moreProfileQuestions").hide();
	}
	$("#podProfileQuestions .toggleEl").show().html("View More");
	return false;
});


// editing the profile headline
$("#profileHeadlineEdit").click(function(){
	$(this).hide();
	$("#profileHeadline").hide();
	$("#profileHeadlineActionWrap, #profileHeadlineField").show();
	return false;
});
$("#profileHeadlineSave").click(function(){
	return false;
});
$("#profileHeadlineCancel").click(function(){
	$("#profileHeadline, #profileHeadlineEdit").show();
	$("#profileHeadlineActionWrap, #profileHeadlineField").hide();
	return false;
});


// nick-arcade-games transition force user login
if($('body.NotSignedIn').length && document.location.toString().indexOf('nick-arcade-games') > 10) {
	$(".pod img[src*='upsell_26']").attr('src','/i/common/upsells/upsell_familyandkids_314x250.jpg');

	showTransitionStaticSignIn(function(data){
		if(!data.screenname.length) {
			showSetScreenname(function() {
				window.location.reload();
			});
		} else {
			window.location.reload();
		}
	});
}


//token statement month change jump menu.
tokenStatementMonthJump = function( month ) {
	ajaxLoad( '/myShockwave/tokens/tokenData.jsp?mon=' + month, $('#tokensData') );
};

/**
 * Function to launch a daughter window
 * @param url the URL to load into the daughter window
 * @param width the width to open up the window
 * @param height the height to open up the window
 * @param resizable optional "yes/no" of whether or not to make the window resizable
 * @param winName optional predefined name of the window
 */
launchWindow = function( url, width, height, resizable, winName ) {
	// If a window name was not specified, randomly create one
	if ( !winName ) {
		winName = "asw_d" + (Math.floor(Math.random() + 100000));
	}
	var newWin = window.open( url, winName, "width=" + width + ",height=" + height + ",resizable=" + resizable );
	newWin.focus();
	return newWin;
};

// =============================
// Multi Trophy Hover Select
// =============================

/**
 * Adds/removes 'active' state to list items to highlight them
 * Uses the index of the hovered item and show the corresponding content on the left
 */
$('#podGameTrophies .multiTrophy li').mouseover(function() {
	var trigger = $(this);
	var hoverItems = $(this).parent("ul").find("li");
	var triggerIndex =  $(hoverItems).index(trigger);
	var targetItems = $(this).parent("ul").parent("div").find(".podInnerBox");

	$(hoverItems).removeClass("active");
	$(this).addClass("active");

	$(targetItems).hide();
	$(targetItems).eq(triggerIndex).show();
});

// scrollTo function in help section
$(".btt").click(function(){
	$.scrollTo("0",500);
	return false;
});

// expands the container around the chat window
// prevents it from causing the page to be too wide
chatWindow = function(state) {
	if (state == "expand"){
		$("#podChat").addClass("expand");
	} else {
		$(this).delay(400, function(){
			$("#podChat").removeClass("expand");
		});
	}
};

// expands the tools on the game landing pages
toggleTool = function(trigger, target) {
	var triggerArrow = $(trigger).find("span");
	var triggerLi = $(trigger).parent("li");
	if ( $(triggerArrow).hasClass("arrowDownRit") ) {
		$(".toolBar span.arrowUpRit").each(function(i){
			$(this).removeClass("arrowUpRit").addClass("arrowDownRit");
			$(".toolBar li").removeClass("active");
		});
		$(".toolShelf").slideUp();
		$(triggerArrow).removeClass("arrowDownRit").addClass("arrowUpRit");
		$(triggerLi).addClass("active");
	} else {
		$(triggerArrow).removeClass("arrowUpRit").addClass("arrowDownRit");
		$(triggerLi).removeClass("active");
	}
	$(target).slideToggle();
};

// select all the text in the input field for easy copying
$("#copyURL input, #embedGame input").focus(function(){
	this.select();
});

//billing country drop down on cart pages
$("#cart select#billingCountry").change(function(){
	var trigger = $(this);
	var target = $(trigger).parents("li").eq(0).next("li")
	var selectValue = $("#cart select#billingCountry").val();
	var isCartUsingPayPal = ( "paypal" == $("input[name='paymentMethod']:checked").val() );
	if ( isCartUsingPayPal || selectValue != "ca") {
		$(target).hide();
	} else {
		$(target).show();
	}
});

//shipping country drop down on cart pages
$("#cart select#shippingCountry").change(function(){
	var trigger = $(this);
	var target = $(trigger).parents("li").eq(0).next("li")
	var selectValue = $("#cart select#shippingCountry").val();
	if (selectValue == "ca") {
		$(target).show();
	} else {
		$(target).hide();
	}
});

//opens a pop up for club games
showGameHelp = function(destURL) {
	var strWindowFeatures = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=650,height=500';
	window.open(destURL,'mywindow',strWindowFeatures);
};


// this tests to see how far the user has scrolled
// if far enough down will set the active game face to 'fixed'
// so that it scrolls along with the user
setGameFaceLocation = function(windowScrollPos) {
	if ( windowScrollPos > (gameFaceOffset.top - 10) ) {
		$("#podMyGameFace").css({position:"fixed",top:"10px",left:gameFaceOffset.left});
	} else {
		$("#podMyGameFace").css("position","static");
	}
};

// this fires on page load to position the selected game face
if ( $("#podMyGameFace").length > 0 ) {
	gameFaceOffset = $("#podMyGameFace").offset();
	windowScrollPos = $(window).scrollTop();
	setGameFaceLocation(windowScrollPos);

	// fires with any scroll
	$(window).scroll(function () {
		var windowScrollPos = $(window).scrollTop();
		setGameFaceLocation(windowScrollPos);
	});
}

// used on the Game Face page to swap out img, change active state
updateGameFace = function( trigger, avatarId ) {
	$.get( "/myShockwave/gameFace/makePublic.jsp?avatarId=" + avatarId );  // post the updated avatar to the server
	var triggerLink = $(trigger).parent("span").html(); // gets html of the trigger link to pass to the newly active link
	var activeItem = $("#avatars li.active"); // gets currently active element

	// if there is no active item, check to make sure we don't have a voki avatar as active anymore
	if ( activeItem.length <= 0 ) {
		$("#podVokiIcons li.active").removeClass("active");
	}

	var targetListItem = $(trigger).parents("li:eq(0)"); // gets parent li of item being picked
	var targetSource = $(trigger).parents("li:eq(0)").find("img").attr("src"); // find source of img of item being picked

	$(activeItem).removeClass("active").find("span").html(triggerLink); // switches the old active item to an inactive state, sets HTML
	$(targetListItem).addClass("active").find("span").html("My Public Game Face"); // turns on the newly picked item as active, sets HTML

	// replace the image if there's one to replace
	if ( $("#podMyGameFace .vokiWrap img").length > 0 ) {
		$("#podMyGameFace .vokiWrap img").attr("src",targetSource); // sets the source of My Public Game Face img to the item picked

	//otherwise remove the voki and add it
	} else {
		$("#podMyGameFace .vokiWrap").empty();
		$("#podMyGameFace .vokiWrap").append("<img src='" + targetSource + "' alt='' />");
	}
};

//show shipping address on club payment form; spring form tags rewrite and append "1"
$("#shipToSameAddress1").click(function(){
	$("#shippingInputs").toggle();
});

if ( $("#sisUpsell").length ) {
	setTimeout( function() {
		$("#sisUpsell").fadeOut("fast");
	}, 15000);
}

//On free sign up & guest pass form, show state dropdown if country selected is United States
//$("#sendGuestPass #country").change(function() { showHideState( "#country" ); }).attr("onchange", function() { showHideState( "#country" ); });

showHideState = function( countryField ) {
	var countryValue = $("#country").val();
	var stateDropdown = $( countryField ).parents("form").find(".dropdownState");
	if (countryValue == "us") {
		$(stateDropdown).show();
	} else {
		$(stateDropdown).hide();
	}
};




/**
 * Unblock a user's friend's activity from showing in activity feed contents
 * @param unsilenceUserId	the user id to unsilence
 * @param unsilenceUserName	the user name to unsilence. Appears in confirmation dialog.
 */
unsilenceFriend = function ( unsilenceUserId, unsilenceUserName ){
	if( !unsilenceUserId || !unsilenceUserName ){
		return false;
	}
	showAjaxMessage("/html/activityFeed/activityFeedDialogs.html", "#activityFeedUnsilence", false, null, null, null, null, function () {
		$(".unsilenceUserName").text(unsilenceUserName);
		$("#unsilenceUserBtn").unbind();
		$("#unsilenceUserBtn").bind("click", function(){
			$.get("/activityFeed/unSilenceFriendMessages.jsp?friendMemberId=" + unsilenceUserId, null, function() {
				hideMessage();
				$(".member"+ unsilenceUserId).fadeOut("slow", function() {
					$(".member"+ unsilenceUserId).remove();
				});
			});
			return false;
		});
	})
	return false
}

/**
 * Block a user's activity from displaying in Activity Feed
 * @param silenceUserId		the user id to silence
 * @param silenceUserName	the user name to silence. Used in confirmation dialog.
 */
silenceConfirm = function ( silenceUserId, silenceUserName ){
	if( !silenceUserId || !silenceUserName ){
		return false;
	}
	showAjaxMessage("/html/activityFeed/activityFeedDialogs.html", "#activityFeedSilence", false, null, null, null, null, function () {
		$(".silenceUserName").text(silenceUserName);
		$("#silenceUserBtn").unbind();
		$("#silenceUserBtn").bind("click", function(){
			$.get("/activityFeed/silenceFriendMessages.jsp?friendMemberId=" + silenceUserId, null, function() {
				hideMessage();
				$(".member"+ silenceUserId).fadeOut("slow", function() {
					$(".member"+ silenceUserId).remove();
				});
			});
			return false;
		});
	})
	return false;
}

/**
 * Remove a message from activity feed
 * @param messageId	the id of the message to remove
 */
removeConfirm = function ( messageId ) {
	showAjaxMessage("/html/activityFeed/activityFeedDialogs.html", "#activityFeedRemove", false, null, null, null, null, function () {
		$('#removeMessageBtn').unbind();
		$('#removeMessageBtn').bind("click", function(){
			$.get("/activityFeed/removeMessage.jsp?messageId=" + messageId, null, function () {
				hideMessage();
				$(".message"+ messageId).fadeOut("slow", function() {
					$(".message"+ messageId).remove();
				});
			});
			return false
		});
	});
	return false;
}

/**
 * A function to add a comma separated value to a cookie that (with a far future expiry date)
 * only if it doesn't already exist in the cookie.  Basically a long term tracking of values.
 * NOTE: if there's a need to shrink a cookie, add that method later
 * @cookieName the name of the cookie to add to
 * @param stringToAdd the String to add to the cookie
 */
growCookie = function( cookieName, stringToAdd ) {
	var cookieValue = $.cookie( cookieName );
	if ( cookieValue == null || cookieValue == "") {
		cookieValue = stringToAdd;
	} else if ( cookieValue.indexOf( stringToAdd ) == -1 ) {
		cookieValue += "," + stringToAdd;
	} else {
		return; // if the cookie wasn't empty and the value was already in the cookie, no need to add it
	}
	$.cookie( cookieName, cookieValue, {expires: 1000, path: '/', domain: '.shockwave.com'});
}

// global variable for contact us page form as requested by CS
var contactUs = /contact_us.jsp/.test(self.location.href);

clearFormErrors = function ( form ) {
	$( form ).find( "p.error" ).remove();
	$( form ).find( "div.globalError" ).remove();

//  contact us page resolution to long page load as requested by kyle statham at CS
    if (contactUs){
        $('.workingButton').addClass('contactFormSuccess').html('Working...<a class=\'local locality\' onclick=\'location.reload();\' href=\'#\'>Cancel</a>');
	}
};

/**
 * A method for parsing a FormValidationResult JSON
 * @param jsonResponse the validation response containing field and global error messages if any
 * @param form the form element being validated
 * @param successCallbackFunction a function to call upon success instead REGARDLESS of any successURL specified in the JSON
 */
showJsonFormErrors = function ( jsonResponse, form, successCallbackFunction ) {
	// Expecting a JSON response back
	var results = eval( '(' + jsonResponse + ')' );
	if ( results.success == "false" ) {

//       contact us page catch to replace the DOM with original markup
        if (contactUs){
            $('.workingButton').removeClass('contactFormSuccess').html('<a href="#" class="btnOnlinePlain mr10" onclick="$(\'#contactUsForm\').submit();return false;">Submit</a> <a class="local" href="#">Cancel</a>');
        }

		// add global error div
		$( form ).prepend("<div class='globalError'></div>");

		// parse the json for the errors and display them
		for ( globalError in results.formErrors.globalErrors ) {
			$( form ).find( ".globalError" ).prepend("<p class='error'>" + results.formErrors.globalErrors[globalError].error +"</p>")
		}
		for ( fieldError in results.formErrors.fieldErrors ) {
			var fieldName = results.formErrors.fieldErrors[fieldError].fieldName;
			var errorMessage = results.formErrors.fieldErrors[fieldError].error;
			$( form ).find( '#' + fieldName ).parent().after("<p class='error'>" + errorMessage +"</p>");
		}
		if ( ! $( form ).hasClass("noErrorScroll") ) {
			$.scrollTo( $( form ).find( ".globalError" ), 500, { offset:-30 }); // scroll up to the global error
		}
		return false;

	} else {
		// Redirect if user if underage
		if(results.successUrl == '/member/registrationUnderAge.jsp'){
			location.href = results.successUrl;
		}
		if ( typeof successCallbackFunction != "undefined" ) {
			successCallbackFunction( jsonResponse, results.successUrl );
		} else {
			reloadOrRedirect(results.successUrl);
		}
		return true;
	}
};

/**
 * Takes error fields from JSON Form Validation and joins them with a delimiter (:) for Omniture reports
 * @param dataJSON JSON from form validation
 * @param extraFields string to append
 */
var concatErrorFields = function( jsonResponse, extraFields ) {
var results = eval( '(' + jsonResponse + ')' ) ;
	var errorFields="";
	for ( fieldError in results.formErrors.fieldErrors ) {
		errorFields += results.formErrors.fieldErrors[fieldError].fieldName + ":";
	}
	if( extraFields ){
		errorFields += extraFields + ":";
	}
	// remove last delimiter
	errorFields = errorFields.slice(0, -1);
	return errorFields;
}

var reportStaticRegisterSuccess = function() {
	// Omniture reg/signup tracking
	sendCustomLinkEvent("modalRegisterSubmitSuccess", {
		events: 'event9,event11,event29,event30',
		prop26: 'modalRegister:success',
		eVar9: 'LoggedInFree'
	});
};
submitStaticRegister = function(successCallbackFunction, e){
	if ( typeof successCallbackFunction != 'undefined' && successCallbackFunction != null ) {
		// reg then custom callback
		siteRegister( $(e).parents('form'), function( data ) {
			// Success callback on site register
			reportStaticRegisterSuccess();
			hideMessage();
			var results = eval( '(' + data + ')' );
			updateUserInfo( results );
			successCallbackFunction( results );
		});
		return false;
	} else {
		// reg then display default callback and reload page
		siteRegister( $(e).parents('form'), registerDefaultCallback, true);
		return false;
	}
};

siteRegister = function( formSubmitted, callbackFunction  ) {
	clearFormErrors( formSubmitted );
	formSubmitted.ajaxSubmit( function( data ) {
		showJsonFormErrors( data, formSubmitted, callbackFunction );
		// Omniture reg/signup tracking
		var errorFields=concatErrorFields( data );
		sendCustomLinkEvent("modalRegisterSubmitError", {
			eVar14: 'modalRegister',
			events: 'event9,event28,event29',
			prop26: 'modalRegister:error',
			prop27: errorFields
		});
	});
	return false;
};

registerDefaultCallback = function( data, reloadPage) {
	reportStaticRegisterSuccess();
	showAjaxMessage( '/ajax/registrationRecommendations.jsp', '#registrationRecommendationsContainer', false, '700', '', '', '', function () {
		$('.dimmerBtnClose').unbind('click');
		$('.dimmerBtnClose').live('click', function () {
			reloadOrRedirect(reloadPage);
		});
	});
	$('.continue').live('click', function () {
		reloadOrRedirect(reloadPage);
	});
};
reloadOrRedirect = function (reloadPage) {
	hideMessage();
	if ( reloadPage == '' || reloadPage == undefined ) {
		location.reload();
	} else {
		// if we are successful go to the success URL if specified
		location.href = reloadPage;
	}
};

updateUserInfo = function (newUserData) {
	// change some page local variables so any other scripts see the user as signed in too
	userInfo.signedInState = newUserData.login_state;
	userInfo.signedInStateCode = newUserData.login_state_code;
	userInfo.memberId = newUserData.member_id;
	userInfo.memberCookie = newUserData.member_cookie;
	userInfo.screenName = newUserData.screenname;
	userInfo.email = newUserData.member_email;
	userInfo.fbId = newUserData.fbId;
};





/************************************************************************
 * PAGE-SPECIFIC OMNITURE CALLS											*
 /***********************************************************************/
var omni = {
	/**
	 * Capture information about what game link was clicked for the following page to send to Omniture.
	 * @param pod
	 * @param slot
	 */
	cOmniVars: {},
	setCookie: function ( omniVars ){
		//combine any objects we want in the cookie
		jQuery.extend(omni.cOmniVars,omniVars);

		//set a cookie with omniVars to be picked up by the next page then deleted
		btg.Cookie.set( "swOmni", btg.JSON.stringify( omni.cOmniVars ) );
	},
	setDynamicFeatureVars: function ( eVar25Content) {
		var omniVars = {
			eVar25: eVar25Content
		};
		omni.setCookie( omniVars );
	},
	setFindingMethod: function ( pod, slot ) {
		var omniVars = {
			prop22: pod,
			prop23: slot
		};
		omni.setCookie( omniVars );
	},
	setGameOverlayRecommendationTracking: function () {
		var omniVars = {
			"events": "event32",
			"eVar18": "overlay_rec_clicker"
		};
		omni.setCookie( omniVars );
		return true; // fixes an issue where Chrome was not setting the cookie before unloading the page when setting click event handler with jQuery
	}
};

// upsell download sales pod last row no bottom border
$('ul.dsGamesList li:last-child').css({ 'border-bottom' : 'none' });

// ------------------------------------
// Show an upgrade message to FF3.6 and IE6 users
// ------------------------------------
//if the user has not previously closed the upgrade message and a reskin is not active and reskinIsActive is not true and the browser is IE6 or less, show it
// don't show for the FF upgrade bar for the 4 pages below as per Joery's request.
var sw_membershipLevels = /membershipLevels/.test(self.location.href);
var sw_clubShockwave = /clubShockwave/.test(self.location.href);
var sw_unlimited = /unlimited/.test(self.location.href);
var sw_myShockwave = /myShockwave/.test(self.location.href);
var noUpgradeBar = sw_membershipLevels || sw_clubShockwave || sw_unlimited || sw_myShockwave;

/*
if ( (!noUpgradeBar) && ( $.cookie("swHideFFUpgrade") != "true") && ($.browser.mozilla && parseInt($.browser.version) < 7) && ( !reskinIsActive )) {
	$("#FFUpgrade").show();
	$("body").css({backgroundPosition: "center 55px"});
}

//close the ie6upgrade bar
//$("#ie6Upgrade .icon16Close").live("click", function(){
    $(".FFUpgradeClose").live("click", function(){
	$("#FFUpgrade").hide();
	$("body").css({backgroundPosition: "center 190px"});
	//user has clicked the close button, don't show again for 14 days
	var cookieOptions = { path: '/', domain: '.shockwave.com', expires: 14 };
	$.cookie("swHideFFUpgrade", "true", cookieOptions);
	return false;
});
*/

// contact us expand and collapse capability
$('.sw_support a').toggle(function(){
    $('.plainList').show();
    $(this).html('[ HIDE ]');
}, function(){
    $('.plainList').hide();
    $(this).html('[ VIEW ]');
});

// do a delay show of <ol id='podRecommendedGames'> for AB test of game recommendations.
// to prevent our internal recommendation from displaying before choicestream hijacks it.
	setTimeout(function() {
		$("#podRecommendedGames").show();
	},2500);


googlePlusOneCallback = function (callback) {
	plusone_vote = callback.state;
}

$(".trackThis").live("click", function() {
	setTimeout(btg.Controller.sendLinkEvent($(this).attr("rel")), 500);
	return void(0);
});

//99 cents home page check to remove 99 cents promo
var shockwaveHome = /home/.test(self.location.href);
if(shockwaveHome){
    $('#homepageCheck').hide();
}

// hide footer for Nick Jr. Holiday promo
var hideFooter = /nickjrholiday/.test(self.location.href) || /spongebob-super-bouncy-fun-time/.test(self.location.href);
if (hideFooter){
    $('#footer h2, #footer p, .moreCoolGames, .footerLinks').hide();
    $('.footer').addClass('nickjrFooter');
}

// beginning of the ab test for top daily games pod
var topPodGames = $('#podTopGames').hasClass('podDaily');
if(topPodGames){
    $('.topGamesCarousel:eq(1)').hide();
}
// eVar24 tracking for the ACH OL NSI SWU upsell banner
$('#overlayBotFb #upsellGameOverlay').click(function(){
     var omniVars = {
         events: 'event24',
         eVar24: 'swu-upsell-achievementoverlay-nsi'
     };
    btg.Cookie.set( 'swOmni', btg.JSON.stringify( omniVars ) );
    return;
});
// navigation js for nsi/sis rotator and sip my games section
// set variables
var windowsOS = navigator.appVersion.indexOf("Win")!=-1;
// rollover for myGames section when SIS/SIP
$('.gameTime').hover(function(){
  $('li.moreGames').show();
   $(this).css({ 'cursor' : 'pointer' });
}, function(){
   $('li.moreGames').hide();
   $(this).css({ 'cursor' : 'default' });
});
// ie CSS logic for nsi rotator display
if(windowsOS){ // if win7 add moreGamesWinOS class to moreGames class
    $('#mainNav .swTicker ul.tickerList li.gameTime ul li.moreGames').addClass('moreGamesWinOS');
}
// nsi ticker info rotation
// set array for 3 different nsi ticker rotation data
var dataTicker = ["1", "2" , "3"];
// set myData variable to count array length
var myData = Math.floor(Math.random()*dataTicker.length);
if(myData == 0){ // if first in the array show the first div and keep the others hidden
    $('.data1').fadeIn(500);
    $('.data2, .data3').hide();
} else if(myData == 1) { // if second in the array show the second div and keep the others hidden
    $('.data2').fadeIn(500);
    $('.data1, .data3').hide();
} else { // if third in the array show the third div and keep the others hidden
    $('.data3').fadeIn(500);
    $('.data1, .data2').hide();
}

// nickmom pushdown ad

var nickmomPushdownStopDate = new Date('09/15/2012');
var nickmomPushdownToday = new Date();

if (nickmomPushdownToday.getTime() < nickmomPushdownStopDate.getTime() && !$.cookie('suppressNickmomPushdown')) {

	if ( typeof( isAdrenalineGenre ) !== 'undefined' ) {
		if ( isAdrenalineGenre == 'true' ) {
			$('.nickmomPushdownImage').css('background-image', 'url(/i/emails/nm_push_down_v1.jpg)');
		}
	}

	$('.nickmomPushdownImage').click(function() {
		window.location = '/help/faq_nickmom.jsp';
	});

	$('.nickmomPushdownClose').click(function() {
	  $('.nickmomPushdown').slideUp('slow');
	  return false;
	});

	$(document).ready(function() {
		$('.nickmomPushdown').delay(600).slideDown('slow', function() {
//			window.setTimeout(function() {
//				$('.nickmomPushdown').slideUp('slow');
//			}, 10000);
		});
	});
	$.cookie('suppressNickmomPushdown', '1', { expires: 3, path: '/' });
}

// now on nickmom!

KIDS_displayContainers_nowOnNickMom_ShortDateFormat = (function () {
    var month=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    function inRange(value, lowerRange, upperRange) {
        return (value >= lowerRange && value <= upperRange);
    }

    function formatString(unit, offset, value) {
        var offset = Math.round(offset/value);
        var s = offset > 1 ? "S" : "";
        return offset + " " + unit + s + " AGO";
    }
    
    function format(postDate) {
        var postTimestamp = typeof postDate === 'string' ? Date.parse(postDate) : postDate;
        var postDate = new Date(postTimestamp);
        var currentDate = new Date();
        var postOffset = currentDate.getTime() - postTimestamp;
        var formatedTime = "LONG AGO";
        var minute=60000;
        var hour=minute*60;
        var day=hour*24;
        var week=day*7;
        
        if(postOffset < minute){
            formatedTime = "JUST NOW";
        } else if (inRange(postOffset, minute,  hour-1 )) {
            formatedTime = formatString("MINUTE", postOffset, minute);
        } else if (inRange(postOffset, hour,  (day)-1 )) {
            formatedTime = formatString("HOUR", postOffset, hour);
        } else if (inRange(postOffset, day,  week-1)) {
            formatedTime = formatString("DAY", postOffset, day);
        } else if (inRange(postOffset, week,  week*3 )) {
            formatedTime = formatString("WEEK", postOffset, week);
        } else {
            formatedTime = month[postDate.getMonth()] + " " + postDate.getDate() + ", " + postDate.getFullYear();
        }

        return formatedTime;
    }
        
    return {
        format: format
    }
})();

KIDS_displayContainers_nowOnNickMom = function(selector){

	// services
	var jsonFeed = 'http://www.nickmom.com' + "/item-list/?count=4&json=get_recent_posts";
	
	// objects 
	var isNewJsonFeed = true;
	var module = $(selector);
	var postContainer = module.find(".posts");
	
	// functions - private
	
	/*
	 * JavaScript Pretty Date
	 * Copyright (c) 2011 John Resig (ejohn.org)
	 * Licensed under the MIT and GPL licenses.
	 */
	
	// Takes an ISO time and returns a string representing how
	// long ago the date represents.
	var _prettyDate = function(time){
		var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400);
				
		if ( isNaN(day_diff) || day_diff < 0)
			return;
				
		return day_diff == 0 && (
				diff < 60 && "just now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
			day_diff == 1 && "Yesterday" ||
			day_diff < 7 && day_diff + " days ago" ||
			Math.ceil( day_diff / 7 ) + " weeks ago";
	}

	var _buildNewPost = function(data){
		var post = "<li class='post hide' data-url='"+data.rewriteUrl+"'>";
		if(data.Images && data.Images[0].ImageAssetRefs){
			post+= "<img src='"+data.Images[0].ImageAssetRefs[0].URI+"?crop=true&width=63&height=63'>";
		}else{
			post+= "<img width='63' height='63' src=''>";
		}
		post+= "<div class='title'>"+data.Title+"</div>";
		post+= "<div class='time'>Posted "+KIDS_displayContainers_nowOnNickMom_ShortDateFormat.format(data.OriginalPublishDate)+"</div>";
		post+= "</li>";
		return $(post);
	};

	var _buildOldPost = function(data){
		var post = "<li class='post hide' data-url='"+data.url+"'>";
		if(data.attachments.length){
			post+= "<img width='63px' height='63px' src='"+data.attachments[0].images["post-thumbnail"].url+"'>";
		}else{
			post+= "<img width='63px' height='63px' src=''>";
		}
		post+= "<div class='title'>"+data.title+"</div>";
		post+= "<div class='time'>Posted "+_prettyDate(data.date)+"</div>";
		post+= "</li>";
		return $(post);
	};

	var _addPosts = function(posts){
		var i, post;
		for(i=0;i<posts.length;i++){
			if (isNewJsonFeed) {
				post = _buildNewPost(posts[i]);
			} else {
				post = _buildOldPost(posts[i]);
			}
			postContainer.append(post);
			_link(post);
			_fadeIn(post,i*150);
		};
	};
	
	var _link = function(post){
		post.click(function(){
			if (isNewJsonFeed) {
				window.location = 'http://www.nickmom.com' + post.attr("data-url")+"?xid=SWrightrail-nowonnm";
			} else {
				window.location = post.attr("data-url")+"?xid=SWrightrail-nowonnm";
			}
		});
	};
	
	var _fadeIn = function(post,t){
		setTimeout(function(){
			post.fadeIn(300);
		},t);
	};
	
	var _load = function(){

		$.ajax({
			url: jsonFeed,
			dataType: 'jsonp',
			jsonp: 'callback',
			cache: true,
			jsonpCallback:'callback',
			success: function(data){
				if(data.error == '' && data.itemList != null){
					isNewJsonFeed = true;
					posts = data.itemList;
				} else {
					isNewJsonFeed = false;
					posts = data.posts;
				}
				module.find(".loadingGif").fadeOut();
				_addPosts(posts);
			}
		});
	};
	
	_load();

};

$(document).ready(function() {
	var nowOnNickMom = new KIDS_displayContainers_nowOnNickMom("#now-on-nickmom");

	$("#now-on-nickmom .top").click(function() {
		window.location='http://www.nickmom.com/';return false;
	}); 
});
