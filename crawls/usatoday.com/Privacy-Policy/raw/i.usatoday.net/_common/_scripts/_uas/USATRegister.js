// USAToday Registration Module
/*
 * Design and initial implementation by Igor Birman
 * minor changes by Raul Miller
 */
var usatAuth;
if (location.hostname.match(/usatin/)) {
	var host = 'http://'+location.hostname+'/';
    	usatAuth= new usatAj(host);
    // usatAuth.uasLocation= location.pathname.replace(/[^/]*$/, '');
} else {
    usatAuth= new usatAj("http://content.usatoday.com/");
}
usatAuth.uasLocation= "asp/uas/";   
  
// location of UAS off of the root url
  
// container for event support
    function ahahEventManager() {}
    usatAuth.em= new ahahEventManager; // event manager object

// state for various state machines
	usatAuth.pageStatus= "initializing";
	usatAuth.appStatus= "initializing";
	usatAuth.regEmail= '';
	
// overrideable pages for logged in/logged out
	usatAuth.urLoggedIn= "urLoggedIn.htm";
	usatAuth.urLoggedOut= "urLoggedOut.htm";
	usatAuth.urStatusXOffset= 205;
	usatAuth.urStatusYOffset= 20;
	
// container for login handlers
	usatAuth.em.loginHandlers= new Object;
	usatAuth.em.logoutHandlers= new Object;
	usatAuth.em.registrationHandlers= new Object;
	usatAuth.em.optionsHandlers= new Object;

// cookie management details
	usatAuth.rememberMeCookie = "USATSession";
	usatAuth.urCookie = "USATINFO";
	usatAuth.zagCookie = "zagCookie";
	usatAuth.rdbCookie = "RDB";

	usatAuth.urExpireTime = 365*24*3600*1000; // 365 days in milliseconds

	// Set cookie domain if current URL is on usat domain.
	usatAuth.cookieDomain= document.URL.match( "\.usatoday\.com" ) ?".usatoday.com" :"";

	// Login timeout in miliseconds
	usatAuth.loginTimeout = 1*60*1000; // 1 minute

	// Flash Shared Object
	usatAuth.isIE = navigator.appName.indexOf("Microsoft") != -1;
	// usatAuth.flashCookieReference = (usatAuth.isIE) ?window['videoPlayer'] :document['videoPlayer'];

// Draggable UAS boxes
	usatAuth.dragEnabled= false;

// Work around overlap problems with rogue flash
	usatAuth.flashTag = new Array("Adv6");
	
	function rogueFlashHack(isOn) {
		for (ii=0; ii<usatAuth.flashTag.length; ii++) {
			var rft= $(usatAuth.flashTag[ii]);
			if (rft) {
				usatAuth.showDebug("rogueFlashTag: "+isOn);
				rft.style.display= isOn ?'block' :'none';
			}
		}
	}
	
// Default UAS client-side validation messages (vm) //
    usatAuth.vm= {};    // create vm object
    
    // registration messages
    usatAuth.vm.regHandleReq        = "Username is required for membership";
    usatAuth.vm.regHandleInvalid    = "Handle cannot contain special characters";
    usatAuth.vm.regHandleSpaces     = "Handle cannot begin or end with a space";
    usatAuth.vm.regEmailReq         = "Email address is required for membership";
    usatAuth.vm.regEmailInvalid     = "Email address is not a valid format";
    usatAuth.vm.regPassMin          = "Passwords must be at least 6 characters in length";
    usatAuth.vm.regPassMatch        = "Passwords do not match";
    usatAuth.vm.regGenderReq        = "Please select Male or Female";
    usatAuth.vm.regYearInvalid      = "Please enter a four digit year";
    usatAuth.vm.regYearAfter1889    = "Please enter a year after 1889";
    usatAuth.vm.regYearBefore       = "Please enter a year before "+((new Date()).getFullYear()-13); 
    usatAuth.vm.regZipReq           = "Please enter your Zip Code";
    usatAuth.vm.regZipInvalid       = "Please enter your five-digit Zip Code";
    usatAuth.vm.regCountryReq       = "Please select your Country";
    usatAuth.vm.regJobReq           = "Please select your Job Title";
    usatAuth.vm.regIndReq           = "Please select your Industry";
    usatAuth.vm.regSizeReq          = "Please select your Company Size";
    // options messages
    usatAuth.vm.optHandleReq        = "Username is invalid";
    usatAuth.vm.optHandleInvalid    = "Handle cannot contain special characters";
    usatAuth.vm.optHandleSpaces     = "Handle cannot begin or end with a space";
    usatAuth.vm.optEmailReq         = "Email Address is invalid";
    usatAuth.vm.optEmailInvalid     = "Email address is not a valid format";
    usatAuth.vm.optOldPassReq       = "Please enter your old password";
    usatAuth.vm.optPassMin          = "Passwords must be at least 6 characters in length";
    usatAuth.vm.optPassMatch        = "Passwords do not match";
    // transition messages
    usatAuth.vm.trnPassReminder     = "Sending reminder...";
    usatAuth.vm.trnLogIn            = "Logging in...";
    usatAuth.vm.trnChangeHandle     = "Changing Username...";
    usatAuth.vm.trnChangeEmail      = "Changing Email...";
    usatAuth.vm.trnChangePass       = "Changing password...";
    usatAuth.vm.trnUnregister       = "Registration being deleted...";
    usatAuth.vm.trnRegister         = "Processing registration...";     
     
 
// additional methods
with (usatAuth) {

    // event tracking
	usatAuth.countEvent = function (code) {
    	// Deprecated
	};
	
	// flookie support
	usatAuth.setFlashCookie= function (val) {
		showDebug('usatAuth.setFlashCookie');
		// usatAuth.flashCookieReference && flashCookieReference.setCookie && flashCookieReference.setCookie(val);
	};
	usatAuth.getFlashCookie= function () {
		showDebug('usatAuth.getFlashCookie');
		return null; // usatAuth.flashCookieReference && flashCookieReference.getCookie && flashCookieReference.getCookie();
	};
	
	// Draggable UAS Dialogs support
	em.uasDrag= function() {
	    // Make USATRegister div draggable
	    if(typeof(Draggable)!= "undefined") {
		    if(dragEnabled ) {
		        em.dragObject= new Draggable('USATRegister',{revert:false});
			    em.loginHandlers["draggableuas"]= function() {
			        em.SetPosition();
			    };
		    }
		}
	};
	em.uasNoDrag= function() {
	    // Make USATRegister div NON-draggable
	    if(typeof(Draggable)!= "undefined") {
		    if(dragEnabled&& em.dragObject) {
		        em.dragObject.destroy();
		        em.removeLoginHandler("draggableuas");
		    }
		}
	};
	
	// application support
	/* handler.toString() is intended to allow only one instance of each distinct handler */
	/* in the typical case, only zero or one handlers will be needed, so this is probably acceptable */
	em.addLoginHandler= function (handler) {
		showDebug('em.addLoginHandler');
		em.loginHandlers[handler.toString()]= handler;
	};

	em.removeLoginHandler= function (handler) {
		showDebug('em.removeLoginHandler');
		em.loginHandlers[handler.toString()]= null;
	};

	em.addLogoutHandler= function (handler) {
		showDebug('em.addLogoutHandler');
		em.logoutHandlers[handler.toString()]= handler;
	};

	em.removeLogoutHandler= function (handler) {
		showDebug('em.removeLogoutHandler');
		em.logoutHandlers[handler.toString()]= null;
	};
	
	em.addRegistrationHandler= function (handler) {
		showDebug('em.addRegistrationHandler');
		em.registrationHandlers[handler.toString()]= handler;
	};

	em.removeRegistrationHandler= function (handler) {
		showDebug('em.removeRegistrationHandler');
		em.registrationHandlers[handler.toString()]= null;
	};

	em.addOptionsHandler= function (handler) {
		showDebug('em.addOptionsHandler');
		em.optionsHandlers[handler.toString()]= handler;
	};

	em.removeOptionsHandler= function (handler) {
		showDebug('em.addOptionsHandler');
		em.optionsHandlers[handler.toString()]= null;
	};

	// events triggered from various forms
	em.showLoginForm= function() {
		showDebug('em.showLoginForm');
		urAhah( "urLogIn.htm", 'USATRegister', null, function() {countEvent("LogSee");} );
		
        em.uasDrag();
	};

	em.showRegisterForm= function(email) {
		showDebug('em.showRegisterForm');
		usatAuth.regEmail= email;
		var prevHTML= $('USATRegister').innerHTML;
		
		$('USATRegister').innerHTML= usatAuth.transitionImage;
		
		gciUsatLoadedCallback= function() {
            urAhah( 'urRegisterZagSN.htm', 'USATRegister', null, function() {countEvent("RegSee");} );
        };
            
        var script= document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', 'http://reg.usatoday.com/registration/zag4/gciUSATv1.js');
        document.getElementsByTagName('head')[0].appendChild(script);
        
        em.uasDrag();
	};
	
	/* Set status to signed out and display login panel */
	em.logOut = function() {
		showDebug('em.logOut ');
		/* delete flash cookie, then attempt to log out via gateway call.. */
		$("USATRegister").innerHTML= transitionImage;
		// setFlashCookie( "" );
		var uu= getCookie( urCookie );
		uuSafeMode= getCookieStringParamValue(uu, "SafeMode" );
		var bailOut= 'Y' == uuSafeMode;
		if ("Signed Out" != appStatus && !bailOut) {
			/* run signed out handlers early so we know who we're doing them for */
			appStatus= 'Signed Out';
			runHandlers(em.logoutHandlers);
		}
		if (bailOut)
			setStatus('Signed Out', null, null, 'N');
		if (uu) {
			urAhah( "urLogOut.ashx?uu="+escape(uu)+"&Rand="+new Date().getTime(), null, null, loginChecked, serverError );
		}
		if (bailOut)
			window.location.reload();
	};
	
	em.changeOptions = function () {
		showDebug('em.changeOptions ');
		/* Change User Options */
		urAhah( "urOptionsTabs.htm", 'USATRegister', null, function(){countEvent("OptSee");} );
		
		em.uasDrag();
	};
	
	em.findPos = function (obj, off, coord) {
		var pos;
		for (pos= 0; obj.offsetParent; obj= obj.offsetParent) pos+= obj[off];
		return pos || obj[coord];
	};
	em.setPos= function () {
		var regAnchor= $('regAnchor');
		var regAnchorSite = $('regAnchorSite');
		
		if (regAnchor) {
			var USATRegister= $('USATRegister');
			USATRegister.style.left= (em.findPos(regAnchor, 'offsetLeft', 'x') - urStatusXOffset)+'px';
			USATRegister.style.top= (em.findPos(regAnchor, 'offsetTop', 'y') + urStatusYOffset)+'px';
		}
		if (regAnchorSite) {
			var USATRegister= $('USATRegister');
			USATRegister.style.left= (em.findPos(regAnchorSite, 'offsetLeft', 'x') - (urStatusXOffset+3))+'px';
			if (navigator.userAgent.indexOf('MSIE') != -1){
				USATRegister.style.top= (em.findPos(regAnchorSite, 'offsetTop', 'y')+ (urStatusYOffset+8))+'px';
			}
			else if (navigator.userAgent.indexOf('Firefox').toString() != -1){
				USATRegister.style.top= (em.findPos(regAnchorSite, 'offsetTop', 'y')+ (urStatusYOffset-7))+'px';
			}
			else if (navigator.userAgent.indexOf('Safari') != -1){
				USATRegister.style.top= (em.findPos(regAnchorSite, 'offsetTop', 'y')+ (urStatusYOffset+1))+'px';
			}
			else {
				USATRegister.style.top= (em.findPos(regAnchorSite, 'offsetTop', 'y')+ (urStatusYOffset-8))+'px';
			}
			
		}
	};
	// prevent IE from going into an infinite loop
	window.urResizeEnabled= 1;
	em.SetPosition= function () {
		if (window.urResizeEnabled) {
			window.urResizeEnabled= 0;
			em.setPos();
			setTimeout("window.urResizeEnabled= 1", 1);
		}
	};

	// =====================================================================
	// Initial setup, show the appropriate panel based on the cookie status
	// =====================================================================
	
	usatAuth.initialSetup= function() {
		$("USATRegister").innerHTML= transitionImage;
		showDebug('usatAuth.initialSetup');
		this.pageStatus= 'initializing';
		showStatusForm("Check");
		rogueFlashHack(1);
		em.SetPosition();
	};
	
	usatAuth.showStatusForm= function(checkServer) {
		showDebug('usatAuth.showStatusForm');
		getAuthStatus();
		if (checkServer && isSignedIn()) {
			if (uuBrowserTimeout < new Date().getTime()) {
				getServerStatus();
			} else showStatusForm();
		} else {
			showDebug('pageStatus: '+pageStatus+', uuStatus: '+uuStatus);
			if (pageStatus != uuStatus) {
				if ( "Signed In" == uuStatus) {
					urAhah( urLoggedIn, 'USATRegister' );
				} else {
					urAhah( urLoggedOut, 'USATRegister' );
				}
				pageStatus= uuStatus;
			}
			if (appStatus != uuStatus) {
				if ("Signed In" == uuStatus) {
					// user is signed in on this page -- notify the application
					runHandlers(em.loginHandlers);
				} else if ("Signed In" != uuStatus) {
					runHandlers(em.logoutHandlers);
				}
				appStatus= uuStatus;
			}
		}
		
		em.uasNoDrag();
	};
	
	// examine cookies to determine what's currently going on
	usatAuth.getAuthStatus= function() {
		showDebug('usatAuth.getAuthStatus');
		var uu= getCookie( urCookie );
/*
		if (!uu) {
			var fc= getFlashCookie();
			if (fc) {
				uu= fc;
				var expireDate = new Date(new Date().getTime()+urExpireTime);
				setCookie( urCookie, uu, expireDate, "/", cookieDomain, "" );
			}
		}
*/
		this.uuStatus= "Signed Out"; // will be "Signed In" or "Signed Out"
		this.uuBrowserTimeout= new Date().getTime()-10000; 
		this.uuRememberMe= "N";
		if (uu) {
			this.uuStatus=         decodeURIComponent(getCookieStringParamValue(uu, "Status" )).replace(/\+/g, ' ');
			this.uuSafeMode=       getCookieStringParamValue(uu, "SafeMode" );
			this.uuEmail=          getCookieStringParamValue(uu, "Email" );
			this.uuRememberMe=     getCookieStringParamValue(uu, "RememberMe" ) || "N";
			this.uuBrowserTimeout= getCookieStringParamValue(uu, "BrowserTimeout" );
			this.uuEventFlag=      getCookieStringParamValue(uu, "EventFlag" );
			if (uuEventFlag) {
				setStatus(null, null, uuEventFlag);
			}
			if (!uuBrowserTimeout) {
				setStatus(null, "Set");
				this.uuBrowserTimeout= getCookieStringParamValue(uu, "BrowserTimeout" );
			}
			var rememberMe= getCookie( rememberMeCookie );
			if (uuRememberMe != "Y" && !rememberMe && uuStatus != "Signed In") {
				this.uuStatus= "Signed Out";
				setStatus( uuStatus );
			}
		} else {
			showDebug("nothing in uu, page status: "+pageStatus);
		}
	};
	
	// trigger downstream events
	usatAuth.runHandlers= function(handlers, arg) {
        showDebug('usatAuth.runHandlers');
        for (var h in handlers) {
			try {
				if (usatAuth.Debug) showDebug(h);
				if (arg) {
					handlers[h] && handlers[h](arg);
				} else {
					handlers[h] && handlers[h]();
				}
			} catch(e) {
				showDebug("error: "+e.message);
			}
		}
	};

	// was user signed in the last time we checked cookies?
	usatAuth.isSignedIn= function() {
		showDebug('usatAuth.isSignedIn');
		return "Signed In" == uuStatus;
	};

	// get server to give us some fresh cookies
	usatAuth.getServerStatus= function() {
		showDebug('usatAuth.getServerStatus');
		var uu= getCookie( urCookie );
		
		if (uu) {
			urAhah( "urCheckLogIn.ashx?uu="+escape(uu)+"&Rand="+new Date().getTime(), null, null, loginChecked, serverError );
		}
	};
	
	// Oops, we're having a problem...
	usatAuth.serverError= function() {
		urAhah( "urError.htm", "USATRegister" );
	};

	// =====================================================================
	// Process after login timeout check occurs 
	// =====================================================================
	usatAuth.loginChecked= function(responseData) {
		showDebug('usatAuth.loginChecked');
		pageStatus= "checking";
		showStatusForm();
/*		
		if (uuRememberMe == "Y") {
			setFlashCookie( getCookie( urCookie ) );
		} else {
			setFlashCookie( "" );
		}
*/
	};
	
	
	// =====================================================================
	// Change user login status and/or browser timeout in cookie
	// =====================================================================
	usatAuth.setStatus= function( newStatus, setTimeout, eventFlag, safeMode ) {
		showDebug('usatAuth.setStatus');
		var uu= getCookie( urCookie );
		if (uu) {
			showDebug("<font color='blue'>in setStatus with uu: "+uu+" new status: "+newStatus+"</font>");
			var now= new Date().getTime();
			if (newStatus) {
				uu = updateValue(uu, "Status", newStatus );
			}
			if (setTimeout) {
				uu = updateValue(uu, "BrowserTimeout", now + loginTimeout);
			}
			if (eventFlag) {
				uu= updateValue(uu, "EventFlag", "");
				countEvent(eventFlag);
			}
			if (safeMode) {
				showDebug("setting safe mode: "+safeMode);
				uu= updateValue(uu, "SafeMode", safeMode);
			}
		
			var expireDate= new Date(new Date().setTime( now + urExpireTime ));
			showDebug("<font color='red'>setStatus setting "+urCookie+": "+uu+"</font>");
			setCookie( urCookie, uu, expireDate, "/", cookieDomain, "" );
		}	
	};
	
	usatAuth.setLogInOutPages= function(login, logout) {
		urLoggedIn= login;
		urLoggedOut= logout;
	};

	// =====================================================================
	// DEBUG: function to show the current status of cookies and such
	// =====================================================================
	usatAuth.showCookie= function () {
		showDebug('usatAuth.showCookie');
		var msg = urCookie + ": " + getCookie( urCookie ) + "\n";
		msg += "RDB: " + getCookie( rdbCookie ) + "\n";
		msg += "Remember Me: " + getCookie( rememberMeCookie ) + "\n";
		msg += "Time out in: " + (new Date().getTime() - uuBrowserTimeout) + "ms\n";
		// msg += "Flash Cookie: " + getFlashCookie();

		alert( msg );
	};
	
	// =====================================================================
	// Change user login status in cookie
	// =====================================================================
	//
	// These are mostly wrappers around the ancient usat object.  These
	// definitions provide a place hold needed workarounds for flaws
	// in the usat methods.
	//
	// Also, because we never use the usat object directly, we might
	// eventually swap out usat for something more efficient and less
	// quirky.
	
	// get value of named cookie
	usatAuth.getCookie= function(name) {
		showDebug('usatAuth.getCookie');
		var v= usat.cookie.get(name);
		if ("undefined" == v || "null" == v || null == v) v= ""; 
		return v;
	};
	
	// set value of named cookie
	usatAuth.setCookie= function(name, value, expirationDate, path, domain, encrypted) {
		showDebug('usatAuth.setCookie');
		usat.cookie.set(name, value, expirationDate, path, domain, encrypted);
	};
	
	// get value from representation of name/value pairs
	usatAuth.extractValue= function(nameValuePairString, name) {
		showDebug('usatAuth.extractValue');
		return getCookieStringParamValue(nameValuePairString, name);
	};
	
	// update representation of name/value pairs with new value for name
	usatAuth.updateValue= function(nameValuePairString, name, value) {
		showDebug('usatAuth.updateValue');
		// work around bugs in setCookieParamValueForCookieString
		var updatedNVPS= setCookieParamValueForCookieString(nameValuePairString, name, value);
		if (!updatedNVPS) { 
			updatedNVPS= nameValuePairString+'&'+name+'='+escape(value);
		}
		return updatedNVPS;
	};

	// remove cookie (though not flookie -- extra work needed for that) from browser
	usatAuth.deleteCookie= function() {
		showDebug('usatAuth.deleteCookie');
		var uu = usat.cookie.get( urCookie );
		if ("undefined" == uu || "null" == uu) uu= null;
		if (uu) {
			showDebug("deleting "+urCookie);
			setCookie( urCookie, uu, new Date(new Date().getTime()-10000), "/", cookieDomain, "" );
		}	
	};
	
    usatAuth.genericErrorResponseHandler= function() {};
    usatAuth.SetGenericErrorResponseHandler= function (h) {
        if (typeof h == 'function')
	        this.genericErrorResponseHandler= h;
    };

	usatAuth.SetGenericErrorResponseHandler(function(This, u, req, pageElement, oldHTML, rH) {
	    if(req != null)
		    var msg= "System is unavailable, please try again later.  Error text:\n" +u+ req ?(req.status + " - " + req.statusText) :"req is unavailable";
		else
		    var msg= "System is unavailable, please try again later.  \n";
		if (pageElement) {
			var msgID= $("userMessage");
			if (!msgID) {
				var tag= $(pageElement);
				tag.innerHTML= oldHTML;
				msgID= $("userMessage");
				if (!msgID) {
					tag.innerHTML= oldHTML+'<div id="userMessage"></div>';
					msgID= $("userMessage");
				}
			}
			msgID.innerHTML= msg;
		}			
	});

    // Wrap calls to old ahah function to use new ajax library - usatAj
    // - USATAJAX.js is now deprecated
    usatAuth.urAhah= function(url, pageElement, callMessage, rH, errH) {
    	url= uasLocation + url;
    	var This= this;
    	var oldHTML= "";
    	var tag= null;
    	showDebug("urAhah url " + url + " elem " + pageElement);
    	
	    // Set transition image or message
	    if (pageElement) {
            tag= $(pageElement);
            oldHTML= tag.innerHTML;
            tag.innerHTML= (callMessage)? callMessage: usatAuth.transitionImage;
        }
        
        // wrap response handler
        var _rH= function(result) {
            if(tag) {
                tag.innerHTML=result;
                This.execJS(tag);
            }
            if (rH) {
			    rH(result);
		    }
        };
        
        // wrap error handler
        var _errH= function(result) {
            This.showDebug("executing wrapped usatAj error handler from request url: " + url + " elem " + pageElement);
	        This.showDebug(result);
	        document.errResult = result;
	        if (This.genericErrorResponseHandler) {
	            var u= This.urlPrefix+url;
		        This.genericErrorResponseHandler(This, u, null, pageElement, oldHTML, rH);
	        }
	        try {
		        errH && errH(This, u, null, pageElement, oldHTML, rH);
	        } catch(e) {
		        This.showDebug("could not run error handler "+errH);
		        This.showError(e);
	        }
        };
        
        ajax(url, _rH, _errH);
    };

    usatAuth.setValue= function(element, text) {
	    if(document.all){ $(element).innerText = text; } 
	    else { $(element).value = text; }
    };

    {
      // uazag support... (migrated from defunct flookie)
      var d= document;
      var C= d.cookie;
      if (C.match(/zagCookie=[13]/))
        if (C.match(/USATINFO=[^ ;]*UserID/))
          if (!C.match(/USATINFO=[^ ;]*%26ZAG%3D/))
            d.write('<img src="http://content.usatoday.com/registration/zagito5/uazag.ashx" width="1px" height="1px" />');
    }
}
