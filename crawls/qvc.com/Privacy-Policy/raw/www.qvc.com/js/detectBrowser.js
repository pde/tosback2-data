
function detectBrowser() {
	var browserName;
	var browserVer;

	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ //test for MSIE x.x;
		browserName="MSIE";
 		browserVer=new Number(RegExp.$1) // capture x.x portion and store as a number
 		 } else {
 			browserName=navigator.appName;
			browserVer=parseInt(navigator.appVersion);
		}

	if ((browserName=="Netscape" && browserVer>=5) || (browserName=="MSIE" && browserVer>=6) || (browserName=="Firefox" && browserVer>=2) || (browserName=="Safari" && browserVer>=2) )
		{
		return;
		}
	else
	{
		var currentLocation = "http://www.qvc.com";
		if (document.location) {
			currentLocation = document.location;
		} else if (window.location && window.location.href) {
			currentLocation = window.location.href;
		}
  		window.location = "../asp/browser.asp?originURL=" + encodeURI(currentLocation).replace(/&/g, "%26").replace(/'/g, "%27");
	}
}

function setCookie() {
	var expireDate = new Date();
	expireDate.setMonth(expireDate.getMonth()+360);

	var name = "optOut";
	document.cookie = "browserCk=" + name + ";expires=" + expireDate.toGMTString() + ";path=" + "/" + ";domain=" + "qvc.com";
}

function referRedirect(redirectURL) {
	window.location = decodeURI(redirectURL).replace(/%26/g, "&").replace(/%27/g, "'");
	}