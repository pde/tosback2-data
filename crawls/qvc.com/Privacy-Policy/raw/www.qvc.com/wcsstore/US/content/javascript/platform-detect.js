var platform = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "unknown browser";
		this.browser = this.browser.toLowerCase();
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "unknown version";
		this.OS = this.searchString(this.dataOS) || "unknown OS";
		this.OS = this.OS.toLowerCase();
		this.device = this.searchString(this.dataDevice) || false;
		if (this.device != false) {
			this.device = this.device.toLowerCase();
			this.mobile = this.searchString(this.dataMobile) || false;
			var bodyClass = "";
			if (this.mobile != false) bodyClass +="isMobile ";
			this.addBodyClass(bodyClass+"is"+this.device);
		}
	},
	addBodyClass: function(d){
		window.addEvent('domready', function(){document.body.addClass(d);});
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
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
			identity: "MSIE",
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
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	],
	dataDevice : [
		{
			string: navigator.userAgent,
			subString: "Silk",
			identity: "Silk"
		},
		{
			string: navigator.userAgent,
			subString: "Kindle",
			identity: "Kindle"
		},
		{
			string: navigator.userAgent,
			subString: "iPod",
			identity: "iPod"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone"
		},
		{
			string: navigator.userAgent,
			subString: "iPad",
			identity: "iPad"
	    },
		{
			string: navigator.userAgent,
			subString: "Android",
			identity: "Android"
		},
		{
			string: navigator.userAgent,
			subString: "GoogleTV",
			identity: "Android"
		},
		{
			string: navigator.userAgent,
			subString: "BlackBerry",
			identity: "BlackBerry"
		},
		{
			string: navigator.userAgent,
			subString: "wOS",
			identity: "webOS"
		},
		{
			string: navigator.userAgent,
			subString: "webOS",
			identity: "webOS"
		}
	],
	dataMobile : [
		{
			string: navigator.userAgent,
			subString: "iPod",
			identity: "iPod"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone"
		},
		{
			string: navigator.userAgent,
			subString: "iPad",
			identity: "iPad"
	    },
		{
			string: navigator.userAgent,
			subString: "Android",
			identity: "Android"
		}
	]

};
platform.init();