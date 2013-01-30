function AXZAuthenticator(rawCookie) {
	var debug = function(key, value) {
		// console.log(key + ' ' + value);
	}

	function trim(str, chars) {
		return ltrim(rtrim(str, chars), chars);
	}

	function ltrim(str, chars) {
		chars = chars || "\\s";
		return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
	}

	function rtrim(str, chars) {
		chars = chars || "\\s";
		return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
	}

	/*
	 * Provides a convenient way to override the cookie for test cases
	 */
	if (!rawCookie) {
		rawCookie = document.cookie;
	}

	var AUTHENTICATION_COOKIE_NAME = "AXZAuthCookie";
	var getAllCookies = function() {
		var allCookies = new Object();

		var ca = rawCookie.split(';');
		for ( var i = 0; i < ca.length; i++) {
			var c = ca[i];

			var cookieName = trim(c.substring(0, c.indexOf("=")));
			var cookieValue = trim(c.substring(c.indexOf("=") + 1, c.length));
			cookieValue = cookieValue.replace(/\"/g, "");
			debug(cookieName, cookieValue);
			allCookies[cookieName] = cookieValue;
		}
		return allCookies;
	};

	var authCookie = (function() {
		var cookie = getAllCookies()[AUTHENTICATION_COOKIE_NAME];
		if (cookie && cookie.length > 20) {
			return cookie;
		}
	})();

	debug('authCookie', authCookie);

	var AZ_PLAN = "AZ";
	var FNX_PLAN = "FNX";
	var PRX_PLAN = "PRX";
	var SPX_PLAN = "SPX";
	var MSRP = "MSRP";
	var INVALID_PLAN = "Invalid Plan Identifier";

	/**
	 * Constants for various plan types
	 */
	this.AZ_PLAN = AZ_PLAN;
	this.FNX_PLAN = FNX_PLAN;
	this.PRX_PLAN = PRX_PLAN;
	this.SPX_PLAN = SPX_PLAN;
	this.MSRP = MSRP;
	this.INVALID_PLAN = INVALID_PLAN;

	/*
	 * This function get the Plan Identifier
	 */
	this.getPlanTypeForServices = function() {
		if (authCookie) {
			var planIdentifier = authCookie.substr(0, 10);
			var arrPlanIdentifier = planIdentifier.split("");
			var planCharIndex = parseInt(arrPlanIdentifier[0]);
			if (!this.validateCheckSum(arrPlanIdentifier, planCharIndex)) {
				return this.INVALID_PLAN;
			}
			if (arrPlanIdentifier[planCharIndex] === '1') {
				return this.AZ_PLAN;
			} else if (arrPlanIdentifier[planCharIndex] === '2') {
				return this.FNX_PLAN;
			} else if (arrPlanIdentifier[planCharIndex] === '3') {
				return this.PRX_PLAN;
			} else if (arrPlanIdentifier[planCharIndex] === '4') {
				return this.SPX_PLAN;
			} else {
				return MSRP;
			}
		} else {
			return MSRP;
		}
	}

	this.validateCheckSum = function(arrPlanIdentifier, planCharIndex) {
		var palnNum = parseInt(arrPlanIdentifier[planCharIndex]);
		var sum = 0;
		for (i = 0; i < arrPlanIdentifier.length; i++) {
			if (0 == i || planCharIndex == i)
				continue;
			sum += parseInt(arrPlanIdentifier[i])
		}
		var mod = sum % 10;
		var expectedMod = (planCharIndex + palnNum) % 10;
		if (expectedMod != mod) {
			return false;
		}

		return true;
	}

	/*
	 * This is the only public method exposed by this object. The planType
	 * parameter can be passed AS-IS to the services.
	 */
	this.getPlanType = function() {
		return this.getPlanTypeForServices();
	}

	this.getPlanTypeForDisplay = function() {
		var planType = this.getPlanTypeForServices();
		if (planType === this.AZ_PLAN) {
			return 'A/Z Plan';
		} else if (planType === this.FNX_PLAN || planType === this.PRX_PLAN
				|| planType === this.SPX_PLAN) {
			return 'X Plan';
		} else if (planType == this.INVALID_PLAN) {
			return 'Invalid Plan';
		} else {
			return 'MSRP';
		}
	};
}

function ThirdPartyAuthenticator() {
	// Save and Share js
	var CDR_PROFILE_COOKIE_NAME = "cdrProfile";
	var ACCESSTOKEN_COOKIE_NAME = "accessToken";
	var PROFILE_ID_COOKIE_NAME = "cdrprofileid";
	var PROVIDER_COOKIE_NAME = "cdrprofileprovider";
	var CREATION_STATUS_COOKIE_NAME = "profilecreationstatus";
	var CONSUMER_ID_COOKIE_NAME = "consumerId";
	var TIMESTAMP_COOKIE_NAME = "timestamp";
	var DOMAIN_NAME = ".ford.com";
	var COOKIE_PATH = "/";
	var POPUP_FEATURES = "height=250,width=400,status=no,location=no,toolbar=no,directories=no,menubar=no";
	var POPUP_NAME = "versataPopUp";

	this.getAuthWindow = function(redirectUrl) {
		url = '/debug/thirdparty.jsp?redirectUrl=' + redirectUrl/*
																 * document.location.host +
																 * '/debug/redirect.jsp'
																 */;
		features = POPUP_FEATURES;
		window[POPUP_NAME] = open(url, '', features);
	};
	this.popupCallback = function() {
		window[POPUP_NAME].close();
	};
	this.logoutUser = function() {
		deleteCookie(CDR_PROFILE_COOKIE_NAME, COOKIE_PATH, getDomainName());
		//deleteCookie(PROFILE_ID_COOKIE_NAME, COOKIE_PATH, getDomainName());
		//deleteCookie(PROVIDER_COOKIE_NAME, COOKIE_PATH, getDomainName());
		//deleteCookie(CREATION_STATUS_COOKIE_NAME, COOKIE_PATH, getDomainName());
	};
	
	function getCDRProfileCookie() {
		var start = document.cookie.indexOf(CDR_PROFILE_COOKIE_NAME + "=");
		var len = start + CDR_PROFILE_COOKIE_NAME.length + 1;
		if ((!start) && (CDR_PROFILE_COOKIE_NAME != document.cookie.substring(0, CDR_PROFILE_COOKIE_NAME.length))) {
			return null;
		}
		
		if (start == -1)
			return null;
		
		var end = document.cookie.indexOf(";", len);
		if (end == -1)
			end = document.cookie.length;
		
		return(unescape(document.cookie.substring(len, end)));
	}

	function getCookie(name) {
		//Get the cdrProfile cookie
		var cdrProfileCookieValue = getCDRProfileCookie();
		
		if(cdrProfileCookieValue == null || cdrProfileCookieValue == "" || cdrProfileCookieValue == "null") {
			return null;
		}
		if(name == CDR_PROFILE_COOKIE_NAME) {
			return unescape(cdrProfileCookieValue);
		}
		var start1 = cdrProfileCookieValue.indexOf(name + "=");
		var len1 = start1 + name.length + 1;
		if ((!start1) && (name != cdrProfileCookieValue.substring(0, name.length))) {
			return null;
		}
		if (start1 == -1)
			return null;
		var end1 = cdrProfileCookieValue.indexOf("|", len1);
		if (end1 == -1)
			end1 = cdrProfileCookieValue.length;
		return unescape(cdrProfileCookieValue.substring(len1, end1));
	}
	
	function deleteCookie(name, path, domain) {
		if (getCookie(name))
			document.cookie = name + "=" + ((path) ? ";path=" + path : "")
					+ ((domain) ? ";domain=" + domain : "")
					+ ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
	function getDomainName() {
		var domainName = document.location.host;
		var urlParts;
		if (domainName.indexOf(".", 0) > 0) {
			domainName = domainName.split(":")[0];
			urlParts = domainName.split(".");
			domainName = "." + urlParts[urlParts.length - 2] + "."
					+ urlParts[urlParts.length - 1];
		} else {
			domainName = ".ford.com";
		}
		return domainName;
	}
	this.getUserId = function() {
		return getCookie(PROFILE_ID_COOKIE_NAME);
	};
	this.getAccessToken = function() {
		return getCookie(ACCESSTOKEN_COOKIE_NAME);
	};
	this.getProvider = function() {
		return getCookie(PROVIDER_COOKIE_NAME);
	};
	this.getProfileStatus = function() {
		return getCookie(CREATION_STATUS_COOKIE_NAME);
	};
	this.getConsumerId = function() {
		return getCookie(CONSUMER_ID_COOKIE_NAME);
	};
	this.getTimestamp = function() {
		return getCookie(TIMESTAMP_COOKIE_NAME);
	};
}