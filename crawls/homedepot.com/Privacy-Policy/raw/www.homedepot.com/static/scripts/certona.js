	/** Return wc user id based on cookies WC_SESSION_ESTABLISHED, WC_USERSESSION_{userid}, and WC_PERSISTENT */
	function getWCUserIdFromCookies() {
		var hasSessionEstablished = hasBrowserCookie('WC_SESSION_ESTABLISHED');
		var userIdUSC = getUserIdFromUserActivityCookie();
		var userIdPC = getUserIdFromPersistentCookie();
		var wcUserId = '';
		
		if ((hasSessionEstablished && userIdPC == '')) {
			wcUserId = '';	
		} else if (hasSessionEstablished && userIdUSC == '-1002' ) {
			wcUserId = '';			
		} else if (userIdUSC != null) {
			wcUserId = userIdUSC;
		} else if (userIdPC != null) {
			wcUserId = userIdPC;
		}		
		return wcUserId;
	}
	/** Return wc user id based on cookie WC_USERACTIVITY_{userid} */	
	function getUserIdFromUserActivityCookie() {
		var startsWithName = "WC_USERACTIVITY_";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++){
			var c = trim(ca[i]);
			if (c.indexOf(startsWithName) == 0){
				return c.substring(16, c.indexOf('='));
			}
		}
		return "";
	}	

	/** Return wc user id based on cookie WC_USERSESSION_{userid} */	
	function getUserIdFromUserSessionCookie() {
		var startsWithName = "WC_USERSESSION_";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++){
			var c = trim(ca[i]);
			if (c.indexOf(startsWithName) == 0){
				return c.substring(15, c.indexOf('='));
			}
		}
		return "";
	}	
	
	/**
	 * Return wc user id based on cookie WC_PERSISTENT and check if cookie is expired
	 * format: {digest};{timestamp}_{uuid}_{storeid}_{userid},{langid},{currencyid}_{storeid}
	 */
	function getUserIdFromPersistentCookie() {
		var cookieValue = trim(readBrowserCookie('WC_PERSISTENT'));
		if (cookieValue.length != 0) {
			var tokens1 = cookieValue.split(';');
			if (tokens1.length == 2) {
				var temp2 = trim(tokens1[1]);
				var tokens2 = temp2.split("_");
				if (tokens2.length >= 4) {
					if (isPersistentCookieExpired(tokens2[0])) {
						return '';
					}
					var tokens3 = tokens2[3].split(",");
					if (tokens3.length >= 3) {
						return tokens3[0];
					}
				}
			}
		}
		return '';
	}		
	
	/** Trim string of whitespaces */		
	function trim(stringToTrim) {
		return stringToTrim.replace(/^\s+|\s+$/g,"");
	}
	
	/** Check if the given timestamp is not expired */
	function isPersistentCookieExpired(timestamp) {
		var currentdate = new Date();
		var currentdateL = currentdate.getTime();
		var cookiedateL = getDateFromTimestamp(timestamp);
		var cookieexpireL = cookiedateL+persistentCookieExpireL;
		if (cookieexpireL > cookiedateL) 
			return false;
		else
			return true;
	}
	
	/** Return the long value of a given timestamp in a specific format (eg. 2011-06-02+16:53:53.698)*/
	function getDateFromTimestamp(timestamp) {
		var timestamp = trim(timestamp).replace("+"," ");
		var tokens1 = timestamp.split(" ");
		var tokens2 = tokens1[0].split("-");
		var tokens3 = tokens1[1].split(".");
		// change to format MM/dd/yyyy hh:mm:ss
		var newStr = tokens2[1]+'/'+tokens2[2]+'/'+tokens2[0]+' '+tokens3[0];
		var newDate = new Date(newStr);
		return newDate.getTime();
	}