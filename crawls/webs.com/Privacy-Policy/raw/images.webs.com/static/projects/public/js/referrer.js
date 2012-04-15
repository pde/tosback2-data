(function() {
	function setCookie(name,value,days) {
		var expires;
		if(typeof(days) === 'undefined') days = 30;
		if(days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toGMTString();
		}
		else expires = "";
		document.cookie = name+"="+value+expires+"; domain=.webs.com; path=/";
	}

	function getCookie(name) {
		var nameEQ = name + "=",
			ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while(c.charAt(0)==' ') c = c.substring(1,c.length);
			if(c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	var updateReferer = false;


    // Get referer from cookie if it exists, otherwise get referer header
	var referer = getCookie("w_referer"),
		queryString = location.search || '?';

	if(!referer && typeof(document.referrer) === 'string') {
		newReferer = document.referrer;
		updateReferer = true;
	}

	// Get referer param
	var newReferer = null;
	var start = queryString.indexOf('referer=');
	if(start > 0) {
		var end = queryString.indexOf('&', start);
		if(end < 0) end = queryString.length;
		newReferer = queryString.substring(start + 8, end);
	}

	var forceRefererUpdate = queryString.indexOf('referer_f=') > 0;

	if (newReferer) {
		if (!referer || forceRefererUpdate) {
			// Update referer if forced or referer is null
			referer = newReferer;
			updateReferer = true;
		} else {

			// Replace old referer with properly sourced referer if it is not currently properly sourced
			if (referer.indexOf("cpc_") < 0 || referer.indexOf("cpm_") < 0 || referer.indexOf("ppc_") < 0) {
				if (newReferer.indexOf("cpc_") >= 0 || newReferer.indexOf("cpm_") >= 0 || newReferer.indexOf("ppc_") >= 0) {
					referer = newReferer;
					updateReferer = true;
				}
			}
		}
	}

	if(updateReferer && referer && referer.indexOf("http://www.webs.com/") !== 0 && referer.indexOf("http://members.webs.com") !== 0) {
		setCookie('w_referer', referer);
	}
})();