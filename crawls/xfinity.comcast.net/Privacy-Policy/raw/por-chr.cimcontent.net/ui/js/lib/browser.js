var agt = navigator.userAgent.toLowerCase();
var is_ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
var is_safari = (navigator.appVersion.indexOf("Safari") > -1);

// Based on cookie scripts from http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
  var expires = '';
	if (days) {
    var date;
    if (typeof days == "object") {
      date = days;
    } else {
       date = new Date();
		  date.setTime(date.getTime()+days*86400000); // Convert to milleseconds
    }
		expires = "; expires="+date.toGMTString();
	}
	document.cookie = name+"="+value+expires+"; path=/; domain=.comcast.net";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
  	var re = /\s*(.*)/;
	for(var i=0, l=ca.length; i<l; i++) {
		var c = ca[i].match(re)[1];
		if (c.indexOf(nameEQ) === 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}
	return null;
}

function deleteCookie(name) {
	createCookie(name, '', -1);
}

function encodeCookie(data) {
	var _escape = function(value) {
		return value
			.replace(/%/g, '%25')
			.replace(/;/g, '%3B')
			.replace(/=/g, '%3D')
			.replace(/&/g, '%26');
	};

	var results = [];
	for (var i in data) {
		var v = data[i];
		results.push([i, _escape(v)].join('='));
	}
	return results.join('&');
}

function decodeCookie(data) {
	var _unescape = function(value) {
		return unescape(value);
	};

	if (!data) {
		return {};
	}

	var results = {}, pairs = data.split('&');
	for (var i=0, l=pairs.length; i<l; i++) {
		var nv = pairs[i].split('=');
		results[nv[0]] = _unescape(nv[1]);
	}
	return results;
}

// Snagged from http://www.quirksmode.org/js/detect.html
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1) {
					return data[i].identity;
				}
			} else if (dataProp) {
				return data[i].identity;
			}
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) {
			return;
		}
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{ // ad crawler
			string: navigator.userAgent,
			subString: "visualrevenue",
			identity: "VisualRevenue"
		},
		{   string: navigator.userAgent,
            subString: "Chrome",
            versionSearch: "Chrome",
            identity: "Chrome"
        },
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone"
		},
		{
			string: navigator.userAgent,
			subString: "iPod",
			identity: "iPod"
		},
		{
			string: navigator.userAgent,
			subString: "Android",
			identity: "Android"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		},
		{	// google bots/preview
			string: navigator.userAgent,
			subString: "Google",
			identity: "Googlebots"
		},
		{	// google bots/preview
			string: navigator.userAgent,
			subString: "google",
			identity: "Googlebots"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

function upgradeRedirect() {
	var redirectUrl = "/browserupgrade/",
        redirectIE6UpgradeUrl = "/ieupgrade/",
        ie6cookie_val = readCookie('iesix'),
        cur_pathname = document.location.pathname,
        redirecting = true;
		
    if (BrowserDetect.OS != "Windows" && BrowserDetect.OS != "Mac" && BrowserDetect.OS != "Linux") {
        redirecting = false;
    }
	if (BrowserDetect.browser == "iPod") {
        redirecting = false;
    }
	if (BrowserDetect.browser == "iPhone") {
        redirecting = false;
    }
	if (BrowserDetect.browser == "Android") {
        redirecting = false;
    }
	if (BrowserDetect.browser == "Chrome") {
        redirecting = false;
    }
	if (BrowserDetect.browser == "Explorer" && BrowserDetect.version >= 7) {
        redirecting = false;
    }
	if (BrowserDetect.browser == "Firefox" && BrowserDetect.version >= 3) {
        redirecting = false;
    }
	if (BrowserDetect.browser == "Safari" && BrowserDetect.version >= 530) {
        redirecting = false;
    }
	if (BrowserDetect.browser == "Opera" && BrowserDetect.version >= 9) {
        redirecting = false;
    }
	if (BrowserDetect.browser == "Googlebots") {
		redirecting = false;	
	}
	if (BrowserDetect.browser == "VisualRevenue") {
		redirecting = false;	
	}
	
	if (redirecting) {
	    if (BrowserDetect.browser == "Explorer" && BrowserDetect.version < 7) {
	    	if (ie6cookie_val !== "dontupgrade" && cur_pathname != "/ieupgrade/") {
	    		document.location = redirectIE6UpgradeUrl;
	        }
	    } else {
	    	document.location = redirectUrl;
	    }
	}
}
