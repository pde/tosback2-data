// APPID START

var mlHost = (("https:" == document.location.protocol) ? "https://" : "http://");
var mlHost = mlHost + "www.mlstat.com";
document.write(unescape("%3Cscript src='" + mlHost + "/scripts/appid.V2.js' type='text/javascript'%3E%3C/script%3E"));

var appIdValue = null;

appidLoaded = function()
{
	appidObj.init(1, mlHost);
	appidObj.track('hit');
	appIdValue = appidObj.getAppID();
}

// APPID ENDS


var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));

if (typeof readCookie != 'function')
{
	function readCookie(name) 
	{
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) 
		{
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return false;
	}
}

function callGA(utValue, gaAccount, lang)
{
	var isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
	var isDownloadAction = ((utValue) && (utValue.indexOf("/download/") > -1));

	if (isDownloadAction && isChrome)
	{
		setTimeout(function(){trackStatEvents(utValue, gaAccount, lang)}, 1500)
	}
	else
	{
		trackStatEvents(utValue, gaAccount, lang);
	}
}
function trackStatEvents(utValue, gaAccount, lang)
{
	// APPID START
	
	if ((utValue) && (utValue.indexOf("/download/") > -1))
	{
		if (!lang)
		{
			lang = utValue.split("/");
		
			if (lang.length >= 3 && lang[2].length == 2)
			{
				lang = lang[2];
			}
			else
			{
				lang = "";
			}
		}
		try{appidObj.track('download', lang);}catch(e){}
	}
	
	try
	{
		if (!appIdValue)
			appidLoaded();
	}catch(e){}

	// APPID ENDS

	if (!utValue)
		utValue = "";
	if (utValue == "")
	{			
		var subdmnCountry = document.location.hostname.substring(0,document.location.hostname.indexOf("."));
		if (subdmnCountry != "www")
			utValue = "/" + subdmnCountry;
		utValue += document.location.pathname;	
	}
	
	var appIdString = "";
	if (appIdValue)
	{
		appIdString = "appid[" + appIdValue + "]";
		if (utValue.length > 0 && utValue.substring(utValue.length-1) == "/")
			appIdString += "/";
		else
			appIdString = "/" + appIdString;
	}
	
	try
	{
		if (!gaAccount)
			gaAccount = "UA-151840-1";
		var pageTracker = _gat._getTracker(gaAccount);
		pageTracker._initData();
		pageTracker._trackPageview(utValue + appIdString);
	}
	catch(e)
	{
	}
}