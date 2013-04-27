var cy={};
cy.control={};
cy._version='3.6.15/335';

cy.documentdomain=window.document.domain;
cy.locationpathname=window.location.pathname;
cy.documentreferrer=window.document.referrer;

cy.control.defaults={};
cy.control.defaults.PageName="";
cy.control.defaults.FunnelLevel="0";
cy.control.defaults.Section="";
cy.control.defaults.UserId="";
cy.control.defaults.Product="";
cy.control.defaults.Quantity=0;
cy.control.defaults.Value=0.0;
cy.control.defaults.OrderNumber="";
cy.control.defaults.ReturnToLink="";
cy.control.defaults.Custom1="";
cy.control.defaults.Custom2="";
cy.control.defaults.Custom3="";
cy.control.defaults.Custom4="";
cy.control.defaults.Custom5="";
cy.control.defaults.Custom6="";
cy.control.defaults.Custom7="";
cy.control.defaults.Custom8="";
cy.control.defaults.Custom9="";
cy.control.defaults.Custom10="";
cy.control.defaults.Custom11="0";
cy.control.defaults.Custom12="0";
cy.control.defaults.Custom13="0";
cy.control.defaults.Custom14="0";
cy.control.defaults.Custom15="0";
cy.control.defaults.Custom16="0";
cy.control.defaults.Custom17="0";
cy.control.defaults.Custom18="0";
cy.control.defaults.Custom19="0";
cy.control.defaults.Custom20="0";
cy.control.defaults.BusinessUnitCode="";

cy.control.WAIT_DURATION=100;
cy.control.UPPER_LIMIT_WAIT_DURATION=2000;

cy.control.CSSR=0.0;
cy.control.CSM=0;
cy.CSSID='';
cy.control.CSSESSIONFLAG=-1;

cy.CUSTOMERCODE='AB49612334';
cy.BASKETAPPEND='1';

cy.control.misc_data_keys = new Array();
cy.control.misc_data_vals = new Array();
cy.control.misc_data_map = new Array();
cy.control.misc_data_count = 0;

cy.control.cookieinfo={domain:null,path:"/",secure:false};

var cyPageBasket="";
var cyCurrLineNumber="";

cy.control._cyImages={};

cy.control._cyGetUniqueId = (function() {
	var id=0; 
	return function(){ return "_" + id++; };
})();

cy.control.cySessionIdDetails=null;
cy.control.cyGenerateSessionId=true;

function cyResetCYToDefaults()
{
	cy.documentdomain=window.document.domain;
	cy.locationpathname=window.location.pathname;
	cy.documentreferrer=window.document.referrer;

	cy.control.defaults.PageName="";
	cy.control.defaults.FunnelLevel="0";
	cy.control.defaults.Section="";
	cy.control.defaults.UserId="";
	cy.control.defaults.Product="";
	cy.control.defaults.Quantity=0;
	cy.control.defaults.OrderNumber="";
	cy.control.defaults.Value=0.0;
	cy.control.defaults.ReturnToLink="";
	cy.control.defaults.Custom1="";
	cy.control.defaults.Custom2="";
	cy.control.defaults.Custom3="";
	cy.control.defaults.Custom4="";
	cy.control.defaults.Custom5="";
	cy.control.defaults.Custom6="";
	cy.control.defaults.Custom7="";
	cy.control.defaults.Custom8="";
	cy.control.defaults.Custom9="";
	cy.control.defaults.Custom10="";
	cy.control.defaults.Custom11="0";
	cy.control.defaults.Custom12="0";
	cy.control.defaults.Custom13="0";
	cy.control.defaults.Custom14="0";
	cy.control.defaults.Custom15="0";
	cy.control.defaults.Custom16="0";
	cy.control.defaults.Custom17="0";
	cy.control.defaults.Custom18="0";
	cy.control.defaults.Custom19="0";
	cy.control.defaults.Custom20="0";
	cy.control.defaults.BusinessUnitCode="";
}

cy.control._cyBrowser = {
isMicrosoft: navigator.appName.indexOf("Microsoft") != -1
};

// On all versions of Internet Explorer, setting the document.location to load a new page results in the document.referrer on the
// new page not being set. This function provides a workaround to that problem.
cy.control._cyNavigate = function(url)
{
	if (cy.control._cyBrowser.isMicrosoft === true)
	{
		var referLink = document.createElement('a');
		referLink.href = url;
		document.body.appendChild(referLink);
		referLink.click();
	}
	else
	{
		window.location=url;
	}
}

function _cyGetCookie(c_name, suffix_allowed)
{
	// Search case-insensitive

	var c_start;
	var c_end;
	
	if (document.cookie.length>0)
	{
		if (suffix_allowed === false)
		{
			// Look for a complete word match
			c_start = document.cookie.toLowerCase().indexOf(c_name.toLowerCase() + "=");

			if (c_start != -1)
			{
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);

				if (c_end == -1)
				{
					c_end = document.cookie.length;
				}

				return decodeURIComponent(document.cookie.substring(c_start, c_end));
			}
		}
		else
		{
			// Look for a partial word match
			var regexp = c_name.toLowerCase() + "(.*)=";

			c_start = document.cookie.toLowerCase().search(regexp);

			if (c_start != -1)
			{
				// create new string with our search criteria at the beginning
				var s1 = document.cookie.slice(c_start);

				// Search from the beginning of this new string for "="
				c_start = s1.indexOf("=") +1;

				if (c_start != -1)	// overkill
				{
					c_end = s1.indexOf(";");

					if (c_end == -1)
					{
						c_end = s1.length;
					}

					return decodeURIComponent(s1.substring(c_start, c_end));
				}
			}
		}

	}

	return "";
}

cy.control._cyConvertCYPropertyNamesToUpperCase = function()
{
	var propertyValue = "";
	for (var propertyName in cy)
	{
		if (propertyName != "control")
		{
			propertyValue = cy[propertyName];
			delete cy[propertyName];
			cy[propertyName.toUpperCase()] = propertyValue;
		}
	}
	return "";
}

cy.control._cyGetWaitDuration = function()
{
	return cy.control.WAIT_DURATION;
}

function cySetWaitDuration(millis)
{
	cy.control.WAIT_DURATION = millis;
}

cy.control._cyGetUpperLimitWaitDuration = function()
{
	return cy.control.UPPER_LIMIT_WAIT_DURATION;
}

function cySetUpperLimitWaitDuration(millis)
{
	cy.control.UPPER_LIMIT_WAIT_DURATION = millis;
}

cy.control._cyOnImageLoad = function(elementId)
{
	cy.control._cyImages[elementId].loadingComplete = true;
}

cy.control._cyGetLoaded = function(elementId)
{
	return cy.control._cyImages[elementId].loadingComplete;
}

cy.control._cyOnImageAbort = function(elementId)
{
	cy.control._cyImages[elementId].loadingComplete = false;
}

// The doCreateHandlers parameter is an optional boolean value that, if true, means that an onLoad and onAbort handler should be
// added to the created image. In general, a value of true will be passed when an actual image is being requested and we are to
// wait on the image being loaded before carrying out the action in question.
cy.control._cyCreateImage = function(doCreateHandlers)
{
	// Note - images are not removed from the document when they are no longer required. There will be only one image
	// created in most circumstances, and never enough in a realistic scenario to cause a problem.
	var cy_image = document.createElement("img");

	cy_image.id = cy.control._cyGetUniqueId();

	var createHandlers = false;
	if (doCreateHandlers && typeof(doCreateHandlers) == "boolean")
	{
		createHandlers = doCreateHandlers;
	}
	
	if (createHandlers === true)
	{
		cy_image.onload = function(){cy.control._cyOnImageLoad(cy_image.id);};
		cy_image.onabort = function(){cy.control._cyOnImageAbort(cy_image.id);};
	}
	
	cy_image.width = 1;
	cy_image.height = 1;
	cy_image.border = 0;
	
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(cy_image, s);

	return cy_image;
}

cy.control._cySetCYProperties = function(/* optional */ ocy, /* optional */ cysetter)
{
	if (ocy)
	{
		for (var p in ocy)
		{
			cy[p] = ocy[p];
		}
		cy.control._cyConvertCYPropertyNamesToUpperCase();
	}
	
	if (cysetter && typeof(cysetter) == "function")
	{
		cysetter();
		cy.control._cyConvertCYPropertyNamesToUpperCase();
	}
}

cy.control._cyTimeoutSubmit = function(thisForm, elementId, resetTimeout)
{
	if (resetTimeout === true && cy.control._cyIsImageLoadedOrTimedOut(elementId) === false)
	{
		// If resetTimeout = true, then we have to wait for the image to be returned from our server before
		// submitting the form. So if we haven't yet loaded the image from our server, reset the timeout function
		// so that we come back in here to check in a little while.
		
		setTimeout(function(){cy.control._cyTimeoutSubmit(thisForm, elementId, true);}, cy.control._cyGetWaitDuration());
		cy.control._cyImages[elementId].totalWaitTime += cy.control._cyGetWaitDuration();
	}
	else
	{
		// If resetTimeout is false, then we are not required to wait for the image to be returned from our server (in
		// fact, in that case, no image is actually returned). So in this case, submit the form.
		// Also, it may be that we are required to wait for the image to be loaded from our server, and that image has
		// now loaded. In this case, submit the form.
		
		thisForm.submit();
	}
}

// thisForm - the form to be submitted
// wait - boolean. If true, send our request, return actual image, wait for image to come back, wait in increments up to max duration
//                 if false, send our request (do not return an image), wait for 100ms (or whatever is configured), submit the form
cy.control._cyOnSubmit = function(thisForm, wait)
{
	try
	{
		var cy_image = cy.control._cyCreateImage(wait);

		if (wait === true)
		{
			// Set a property of the _cyImages object. The property name is cy_image.id. The value of the property is an
			// object. That object has two properties, totalWaitTime and loadingComplete. These are given initial values
			// of 0 and false respectively.
			cy.control._cyImages[cy_image.id] = {totalWaitTime:0, loadingComplete:false};
		
			cy_image.src = cy.control._cyGetElementSrc("seewhy.gif");
		}
		else
		{
			cy_image.src = cy.control._cyGetElementSrc("seewhy.nogif");
		}
	
		setTimeout(function(){cy.control._cyTimeoutSubmit(thisForm, cy_image.id, wait);}, cy.control._cyGetWaitDuration());
	}
	catch(err){}
	
	return false;
}

function cyOnSubmit(thisForm, /* optional */ doWait, /* optional */ ocy, /* optional */ cysetter)
{
	var waitOnImage = false;
	try
	{
		cy.control._cySetCYProperties(ocy, cysetter);

		if (doWait && typeof(doWait) == "boolean")
		{
			waitOnImage = doWait;
		}
	}
	catch(err){}
	
	return cy.control._cyOnSubmit(thisForm, waitOnImage);
}

cy.control._cyIsImageLoadedOrTimedOut = function(elementId)
{
	if ((cy.control._cyImages[elementId].totalWaitTime > cy.control._cyGetUpperLimitWaitDuration()) ||
	    (document.getElementById(elementId).complete === true && cy.control._cyGetLoaded(elementId) === true))
	{
		return true;
	}

	return false;
}

// This function should not be used with impunity
cy.control._cyWait = function(millis)
{
	var start = new Date().getTime();
	while(new Date().getTime() < (start+millis)) {
	}
}

function cyOnPageLoad(/* optional */ isBlocking, /* optional */ doDelay, /* optional */ ocy, /* optional */ cysetter)
{
	var block = false;
	if (isBlocking && typeof(isBlocking) == "boolean")
	{
		block = isBlocking;
	}

	try
	{
		cy.control._cySetCYProperties(ocy, cysetter);
		
		if (block === true)
		{
			src = cy.control._cyGetElementSrc("seewhy.js");

			// Doing a document.write requires that it be done before the page has finished loading (otherwise we will completely
			// overwrite the page with the output of the document.write call).

			if (document.readyState)
			{
				if (document.readyState != "complete")
				{
					document.write('<script type="text/javascript" src="',src,'"><\/script>');
				}
			}
			else
			{
				document.write('<script type="text/javascript" src="',src,'"><\/script>');
			}
		}
		else
		{
			var cy_image = cy.control._cyCreateImage(false);

			cy_image.src = cy.control._cyGetElementSrc("seewhy.nogif");
		}

		var delay = false;
		if (doDelay && typeof(doDelay) == "boolean")
		{
			delay = doDelay;
		}

		if (delay === true)
		{
			cy.control._cyWait(cy.control._cyGetWaitDuration());
		}
	}
	catch(err){}
}

cy.control._cyTimeoutLink = function(anchor, elementId, resetTimeout)
{
	if (resetTimeout === true && cy.control._cyIsImageLoadedOrTimedOut(elementId) === false)
	{
		setTimeout(function(){cy.control._cyTimeoutLink(anchor, elementId, true);}, cy.control._cyGetWaitDuration());
		cy.control._cyImages[elementId].totalWaitTime += cy.control._cyGetWaitDuration();
	}
	else
	{
		if (anchor && anchor.href)
		{
			cy.control._cyNavigate(anchor.href);
		}
	}
}

function cyOnLink(anchor, /* optional */doWait, /* optional */ ocy, /* optional */ cysetter)
{
	var wait = false;
	if (doWait && typeof(doWait) == "boolean")
	{
		wait = doWait;
	}
	
	try
	{
		cy.control._cySetCYProperties(ocy, cysetter);
		
		var cy_image = cy.control._cyCreateImage(wait);

		if (wait)
		{
			cy.control._cyImages[cy_image.id] = {totalWaitTime:0, loadingComplete:false};
			cy_image.src = cy.control._cyGetElementSrc("seewhy.gif");
		}
		else
		{
			cy_image.src = cy.control._cyGetElementSrc("seewhy.nogif");
		}
		
		setTimeout(function(){cy.control._cyTimeoutLink(anchor, cy_image.id, wait);}, cy.control._cyGetWaitDuration());
	}
	catch(err){}
	
	// Returning false stops the browser from following the link as a consequence of the user clicking the link. The link will
	// be followed when the timeout code is invoked.
	return false;
}

function cyOnClick(/* optional */ doDelay, /* optional */ ocy, /* optional */ cysetter)
{
	try
	{
		cy.control._cySetCYProperties(ocy, cysetter);
		
		var cy_image = cy.control._cyCreateImage(false);

		cy_image.src = cy.control._cyGetElementSrc("seewhy.nogif");

		var delay = false;
		if (doDelay && typeof(doDelay) == "boolean")
		{
			delay = doDelay;
		}
		
		if (delay)
		{
			cy.control._cyWait(cy.control._cyGetWaitDuration());
		}
	}
	catch(err){}
}

function cyOnChange(/* optional */ doDelay, /* optional */ ocy, /* optional */ cysetter)
{
	try
	{
		cy.control._cySetCYProperties(ocy, cysetter);

		var cy_image = cy.control._cyCreateImage(false);

		cy_image.src = cy.control._cyGetElementSrc("seewhy.nogif");

		var delay = false;
		if (doDelay && typeof(doDelay) == "boolean")
		{
			delay = doDelay;
		}
		
		if (delay)
		{
			cy.control._cyWait(cy.control._cyGetWaitDuration());
		}
	}
	catch(err){}
}

cy.control._cyGetDT = function()
{
	var d = new Date();
	var t = d.getTime();
	var tz = d.getTimezoneOffset();
	
	return t+"~"+tz;
}

cy.control._getBaseURL = function(/* optional */ res)
{
	var resource="seewhy.gif";
	if (res)
	{
		resource = res;
	}

	var protocol;
	var port;
	var swd='abandonment4.saas.seewhy.com';
	var path='/abandonment2/WE/' +resource;
	var ssl = window.location.protocol.toLowerCase().indexOf('https') >= 0;
	if (ssl)
	{
		protocol='https';
		port=443;
	}
	else
	{
		protocol='http';
		port=80;
	}
	var swi = protocol+'://'+swd+':'+port+path;
	var rn = Math.random();
	
	return swi+"/"+rn;
}

cy.control._cyGetElementSrc = function(res)
{
	cy.control._cyConvertCYPropertyNamesToUpperCase();
	var baseURL = cy.control._getBaseURL(res);
	
	var sessionId = cy.control._cyGetSessionId();
	
	var csData='';
	if (cy.control._cyIsCSSession() == true)
	{
		if (cy.control.CSM == 0)
		{
			csData = "&ClickstreamFlag=2&ClickstreamSessionID=" +cy.CSSID;
		}
	}
	else
	{
		csData = "&ClickstreamFlag=0";
	}
	
	var queryString="?Event=WebEvent"+
			"&CustomerCode=" +cy.CUSTOMERCODE+
			"&Server=" +cy.DOCUMENTDOMAIN+
			"&DefaultPageName=" +encodeURIComponent(cy.LOCATIONPATHNAME)+
			"&Referrer=" +encodeURIComponent(cy.DOCUMENTREFERRER)+
			"&SessionID=" +encodeURIComponent(sessionId)+
			"&FunnelLevel=" +encodeURIComponent((cy.FUNNELLEVEL==undefined) ? cy.control.defaults.FunnelLevel : cy.FUNNELLEVEL)+
			"&Section=" +encodeURIComponent((cy.SECTION==undefined) ? cy.control.defaults.Section : cy.SECTION)+
			"&UserID=" +encodeURIComponent((cy.USERID==undefined) ? cy.control.defaults.UserId : cy.USERID)+
			"&Product=" +encodeURIComponent((cy.PRODUCT==undefined) ? cy.control.defaults.Product : cy.PRODUCT)+
			"&Quantity=" +encodeURIComponent((cy.QUANTITY==undefined) ? cy.control.defaults.Quantity : cy.QUANTITY)+
			"&OrderNumber=" +encodeURIComponent((cy.ORDERNUMBER==undefined) ? cy.control.defaults.OrderNumber : cy.ORDERNUMBER)+
			"&Value=" +encodeURIComponent((cy.VALUE==undefined) ? cy.control.defaults.Value : cy.VALUE)+
			"&PageName=" +encodeURIComponent((cy.PAGENAME==undefined) ? cy.control.defaults.PageName : cy.PAGENAME)+
			"&ReturnToLink=" +encodeURIComponent((cy.RETURNTOLINK==undefined) ? cy.control.defaults.ReturnToLink : cy.RETURNTOLINK)+
			"&Custom1=" +encodeURIComponent((cy.CUSTOM1==undefined) ? cy.control.defaults.Custom1 : cy.CUSTOM1)+
			"&Custom2=" +encodeURIComponent((cy.CUSTOM2==undefined) ? cy.control.defaults.Custom2 : cy.CUSTOM2)+
			"&Custom3=" +encodeURIComponent((cy.CUSTOM3==undefined) ? cy.control.defaults.Custom3 : cy.CUSTOM3)+
			"&Custom4=" +encodeURIComponent((cy.CUSTOM4==undefined) ? cy.control.defaults.Custom4 : cy.CUSTOM4)+
			"&Custom5=" +encodeURIComponent((cy.CUSTOM5==undefined) ? cy.control.defaults.Custom5 : cy.CUSTOM5)+
			"&Custom6=" +encodeURIComponent((cy.CUSTOM6==undefined) ? cy.control.defaults.Custom6 : cy.CUSTOM6)+
			"&Custom7=" +encodeURIComponent((cy.CUSTOM7==undefined) ? cy.control.defaults.Custom7 : cy.CUSTOM7)+
			"&Custom8=" +encodeURIComponent((cy.CUSTOM8==undefined) ? cy.control.defaults.Custom8 : cy.CUSTOM8)+
			"&Custom9=" +encodeURIComponent((cy.CUSTOM9==undefined) ? cy.control.defaults.Custom9 : cy.CUSTOM9)+
			"&Custom10=" +encodeURIComponent((cy.CUSTOM10==undefined) ? cy.control.defaults.Custom10 : cy.CUSTOM10)+
			"&Custom11=" +encodeURIComponent((cy.CUSTOM11==undefined) ? cy.control.defaults.Custom11 : cy.CUSTOM11)+
			"&Custom12=" +encodeURIComponent((cy.CUSTOM12==undefined) ? cy.control.defaults.Custom12 : cy.CUSTOM12)+
			"&Custom13=" +encodeURIComponent((cy.CUSTOM13==undefined) ? cy.control.defaults.Custom13 : cy.CUSTOM13)+
			"&Custom14=" +encodeURIComponent((cy.CUSTOM14==undefined) ? cy.control.defaults.Custom14 : cy.CUSTOM14)+
			"&Custom15=" +encodeURIComponent((cy.CUSTOM15==undefined) ? cy.control.defaults.Custom15 : cy.CUSTOM15)+
			"&Custom16=" +encodeURIComponent((cy.CUSTOM16==undefined) ? cy.control.defaults.Custom16 : cy.CUSTOM16)+
			"&Custom17=" +encodeURIComponent((cy.CUSTOM17==undefined) ? cy.control.defaults.Custom17 : cy.CUSTOM17)+
			"&Custom18=" +encodeURIComponent((cy.CUSTOM18==undefined) ? cy.control.defaults.Custom18 : cy.CUSTOM18)+
			"&Custom19=" +encodeURIComponent((cy.CUSTOM19==undefined) ? cy.control.defaults.Custom19 : cy.CUSTOM19)+
			"&Custom20=" +encodeURIComponent((cy.CUSTOM20==undefined) ? cy.control.defaults.Custom20 : cy.CUSTOM20)+
			"&BizUnit=" +encodeURIComponent((cy.BUSINESSUNITCODE==undefined) ? cy.control.defaults.BusinessUnitCode : cy.BUSINESSUNITCODE)+
			csData+
			"&ClientTimeAndTZ=" +cy.control._cyGetDT()+
			"&Version=" +cy._VERSION + 
			_cyGetBasketLinesQueryString() + 
			"&BasketAppend=" + cy.BASKETAPPEND +
			cy.control.cyGetUserDefinedQueryString();

	var src = baseURL+queryString;
	
	return src;
}

function cySetSessionDetails(sessionIdName, /* optional */ suffixAllowed)
{
	var isSuffixAllowed = false;
	if (suffixAllowed && typeof(suffixAllowed) == "boolean")
	{
		isSuffixAllowed = suffixAllowed;
	}
	cy.control.cySessionIdDetails = {sessionKeyName:sessionIdName, sessionKeySuffixAllowed:isSuffixAllowed};
}

cy.control._cyGetSessionId = function()
{
	var sessionId;

	if (cy.SESSIONID != null)
	{
		sessionId = cy.SESSIONID;
	}
	else
	{
		if (cy.control.cyGenerateSessionId === true)
		{
			sessionId = cy.control._cyGetGeneratedSessionId();
		}
		else
		{
			if (cy.control.cySessionIdDetails && cy.control.cySessionIdDetails.sessionKeyName)
			{
				sessionId = _cyGetCookie(cy.control.cySessionIdDetails.sessionKeyName, cy.control.cySessionIdDetails.sessionKeySuffixAllowed);
			}
			else
			{
				var sessionId = _cyGetCookie("JSESSIONID", false);
				if (sessionId == "")
				{
					sessionId = _cyGetCookie("ASPSESSIONID", true);
				}
				if (sessionId == "")
				{
					sessionId = _cyGetCookie("PHPSESSID", false);
				}
				if (sessionId == "")
				{
					sessionId = _cyGetCookie("ASP.NET_SessionId", false);
				}
				if (sessionId == "")
				{
					sessionId = _cyGetCookie("sid", false);
				}
				if (sessionId == "")
				{
					sessionId = _cyGetCookie("SESS", true);
				}
			}
		}
	}
	
	return sessionId;
}

cy.control._cyGetGeneratedSessionId = function()
{
	var cyd;
	
	cyd = _cyGetCookie("__cy_d", false);
	
	if (cyd == "")
	{
		cyd = _cyGenerateUUID();
	}
	
	_cyCreateClientCookie("__cy_d", cyd, (60*60*24*365*2));
	
	return cyd;
}

function cySetCookieInfo(domain, /* optional */ path, /* optional */ secure)
{
	cy.control.cookieinfo.domain=domain;
	if (path) {
		cy.control.cookieinfo.path=path;
	}
	if (secure) {
		cy.control.cookieinfo.secure=secure;
	}
}


function _cyGenerateUUID()
{
	// Generate an RFC 4122 compliant version 4 UUID
	return 'NNNNNNNN-NNNN-4NNN-XNNN-NNNNNNNNNNNN'.replace(/[NX]/g,
							      function(c) {
									var rn = Math.floor(Math.random()*16);
									if (c == 'N')
									{
										v = rn;
									}
									else
									{
										// 0 <= rn < 16, but RFC 4122 requires that the 2 most sig bits be 1 and 0
										v = (rn&0x3|0x8);
									}
									return v.toString(16);
								}).toUpperCase();
}

// maxage in seconds
function _cyCreateClientCookie(cookieName, cookieValue, /* optional */ maxage, /*optional */ domain, /* optional */ path, /* optional */secure)
{

	// Cookie values may not include semi-colons, commas, or whitespace. For this reason we encode the value here.
	// Because we have encoded the cookie value, when we read it we will have to use the corresponding decodeURIComponent method.
	var value = encodeURIComponent(cookieValue);

	var maxageString="";
	var domainString="";
	var pathString = "; path=/";
	var secureString="";

	if (maxage != null && maxage != "")
	{
		// Although 'expires' is obsolete, no IE version supports max-age. 'expires' could be used for all browsers,
		// but we'll use 'expires' for IE, and 'max-age' for all other browsers.
		if (cy.control._cyBrowser.isMicrosoft === true) {
			var date = new Date();
			date.setTime(date.getTime()+(maxage*1000));
			maxageString = "; expires=" +date.toUTCString();
		}
		else
		{
			maxageString = "; max-age="+maxage;
		}
    }
    else
    {
		maxageString = "";
	}

	if (domain) {
		domainString=";domain=" +domain;
	}
	else if (cy.control.cookieinfo.domain) {
		domainString=";domain=" +cy.control.cookieinfo.domain;
	}

	if (path) {
		pathString=";path=" +path;
	}
	else if (cy.control.cookieinfo.path) {
		pathString=";path=" +cy.control.cookieinfo.path;
	}

	if (secure && secure === true) {
		secureString=";secure";
	}
	else if (cy.control.cookieinfo.secure && cy.control.cookieinfo.secure === true) {
		secureString=";secure";
	}

	document.cookie = cookieName+"="+value+domainString+maxageString+pathString+secureString;
}

// Backwards compatibility. The cy_getImageSrc function is used for Page Load events. Page Load events do not require an image event
// handler, and therefore there is no need to add one dynamically here.
function cy_getImageSrc()
{
	// Non-blocking, non-waiting call used in the backwards compatibility version
	cyOnPageLoad(false, false);
}

cy.control._getCSSampleRate = function()
{
	return cy.control.CSSR;
}

cy.control._cyCreateClickStreamCookie = function(isCS)
{
	var css_c_val;
	if (isCS)
	{
		var css_id = _cyGenerateUUID();
		cy.cssid = css_id;
		css_c_val = "1:" + css_id;
	}
	else
	{
		css_c_val = "0:";
	}
	_cyCreateClientCookie("__cy_e", css_c_val);
}

cy.control._cyIsCSSession = function()
{
	if (cy.control.CSSESSIONFLAG == -1)
	{
		cy.control.CSSESSIONFLAG = cy.control._cyCSSession() == true ? 1 : 0;
	}
	return cy.control.CSSESSIONFLAG == 1 ? true : false;
}

cy.control._cyCSSession = function()
{
	var sr = cy.control._getCSSampleRate();
	
	if (sr <= 0) {
		return false;
	}

	var css = false;
	var cssid = _cyGetCookie("__cy_e", false);
	
	if (cssid != "")
	{
		var cssid_details = [];
		cssid_details = cssid.split(':');
		if (cssid_details.length > 0)
		{
			var is_css = cssid_details[0];
			if (is_css == 1)
			{
				css = true;
				if (cssid_details.length > 1) {
					cy.cssid = cssid_details[1];
				}
				else {
					css = cy.control._cyClickStreamCookie();
				}
			}
		}
		else {
			css = cy.control._cyClickStreamCookie();
		}
	}
	else
	{
		var rn = Math.random();
		if (rn < sr)
		{
			cy.control._cyCreateClickStreamCookie(true);
			css = true;
		}
		else {
			cy.control._cyCreateClickStreamCookie(false);
		}
	}

	return css;
}

cy.control._cyClickStreamCookie = function()
{
	var css = false;
	var rn = Math.random();
	if (rn < sr)
	{
		cy.control._cyCreateClickStreamCookie(true);
		css = true;
	}
	else {
		cy.control._cyCreateClickStreamCookie(false);
	}
	
	return css;
}

cy.control._cyCS = function()
{
	if (cy.control._cyIsCSSession() == true)
	{
		cy.control.CSM == 1 ? cy.control._cyCS1() : cy.control._cyCS0();
	}
}

cy.control._cyCS0 = function()
{
	cy.control._cyConvertCYPropertyNamesToUpperCase();
	
	var baseURL = cy.control._getBaseURL();
	var ref = encodeURIComponent(cy.DOCUMENTREFERRER);

	var queryString="?Event=WebEvent"+
			"&CustomerCode=" +cy.CUSTOMERCODE+
			"&DefaultPageName=" +encodeURIComponent(cy.LOCATIONPATHNAME)+
			"&Referrer=" +encodeURIComponent(cy.DOCUMENTREFERRER)+
			"&ClickstreamSessionID=" +cy.CSSID+
			"&ClientTimeAndTZ=" +cy.control._cyGetDT()+
			"&FunnelLevel=0"+
			"&ClickstreamFlag=1"+
			"&Version=" +cy._VERSION;

	var src = baseURL+queryString;
	
	var cy_image = cy.control._cyCreateImage(false);
	cy_image.src = src;
}

cy.control._cyCS1 = function()
{
}

function _cyFormatLineNumber(iLineNumber)
{
  var strLineNumber;
  iLineNumber < 10?(strLineNumber = '00' + iLineNumber):iLineNumber < 100?(strLineNumber = '0' + iLineNumber):(strLineNumber = '' + iLineNumber);
  return strLineNumber;
}

function _cyGetBasketDetailNameFromKeyStartingAt(strValue, iStartPosition)
{
  var iEqualsStartPosition, iLineNameStartPosition, strLineName;
  iLineNameStartPosition = iStartPosition + 7;
  iEqualsStartPosition = strValue.indexOf(':', iStartPosition);
  strLineName = strValue.substr(iLineNameStartPosition, iEqualsStartPosition - iLineNameStartPosition);
  return strLineName;
}

function _cyGetBasketDetailValueFromKeyStartingAt(strValue, iStartPosition)
{
  var iKVDelimiterStartPosition, iPairDelimiterStartPosition, strLineValue;
  iKVDelimiterStartPosition = strValue.indexOf(':', iStartPosition);
  iPairDelimiterStartPosition = strValue.indexOf('&', iStartPosition);
  iPairDelimiterStartPosition == -1?(strLineValue = strValue.substr(iKVDelimiterStartPosition + 1, strValue.length - (iKVDelimiterStartPosition + 1))):(strLineValue = strValue.substr(iKVDelimiterStartPosition + 1, iPairDelimiterStartPosition - (iKVDelimiterStartPosition + 1)));
  return strLineValue;
}

function _cyGetNextBasketLineNumber()
{
  var iCurrentLineNumber, iHighestLineNumber, iNextStartPosition, iPos, strBasketLineCookieValue, strLineNumber, iLineNumberStartPosition;
  iNextStartPosition = 0;
  iHighestLineNumber = 0;
  strBasketLineCookieValue = _cyGetBasketLineCookieValue();
  while ((iPos = strBasketLineCookieValue.indexOf('CYBK', iNextStartPosition)) != -1)
  {
    strLineNumber = (iLineNumberStartPosition = iPos + 4 , strBasketLineCookieValue.substr(iLineNumberStartPosition, iLineNumberStartPosition + 3 - iLineNumberStartPosition));
    iCurrentLineNumber = parseInt(strLineNumber, 10);
    iCurrentLineNumber > iHighestLineNumber && (iHighestLineNumber = iCurrentLineNumber);
    iNextStartPosition = iPos + 1;
  }
  return _cyFormatLineNumber(iHighestLineNumber + 1);
}

function _cyGetNextBasketLineNumberInt()
{
  var strNextLineNumber;
  var iNextLineNumber;

  strNextLineNumber = _cyGetNextBasketLineNumber();
  iNextLineNumber = parseInt(strNextLineNumber, 10);

  return iNextLineNumber;
}

function _cyInsertBasketLineValue(strBeforeLineNumber, strInsertionName, strInsertionValue)
{
  var blnFirst, iCurrentLineNumber, iInsertionPointLineNumber, iNextStartPosition, iPos, strBasketLineCookieValue, strDetailsToKeep, strLineNumber, strName, strValue, iLineNumberStartPosition;
  iNextStartPosition = 0;
  strDetailsToKeep = '';
  blnFirst = true;
  strBasketLineCookieValue = _cyGetBasketLineCookieValue();
  if (strBasketLineCookieValue != null)
  {
    iInsertionPointLineNumber = parseInt(strBeforeLineNumber, 10);
    while ((iPos = strBasketLineCookieValue.indexOf('CYBK', iNextStartPosition)) != -1)
    {
      strLineNumber = (iLineNumberStartPosition = iPos + 4 , strBasketLineCookieValue.substr(iLineNumberStartPosition, iLineNumberStartPosition + 3 - iLineNumberStartPosition));
      strName = _cyGetBasketDetailNameFromKeyStartingAt(strBasketLineCookieValue, iPos);
      strValue = _cyGetBasketDetailValueFromKeyStartingAt(strBasketLineCookieValue, iPos);
      iNextStartPosition = iPos + 1;
      iCurrentLineNumber = parseInt(strLineNumber, 10);
      iCurrentLineNumber >= iInsertionPointLineNumber && ++iCurrentLineNumber;
      blnFirst || (strDetailsToKeep = strDetailsToKeep + '&');
      strDetailsToKeep = strDetailsToKeep + 'CYBK';
      strDetailsToKeep = strDetailsToKeep + _cyFormatLineNumber(iCurrentLineNumber);
      strDetailsToKeep = strDetailsToKeep + strName;
      strDetailsToKeep = strDetailsToKeep + ':';
      strDetailsToKeep = strDetailsToKeep + strValue;
      blnFirst = false;
    }
    _cySetBasketLineCookieValue(strDetailsToKeep);
  }
  _cyUpdateBasketLineValue(strBeforeLineNumber, strInsertionName, strInsertionValue);
}

function _cyInsertBasketLineValueInt(iBeforeLineNumber, strInsertionName, strInsertionValue)
{
  _cyInsertBasketLineValue(_cyFormatLineNumber(iBeforeLineNumber), strInsertionName, strInsertionValue);
}

function _cyRemoveBasketLine(strLineNumberToRemove)
{
  var blnFirst, iCurrentLineNumber, iLineNumberToRemove, iNextStartPosition, iPos, strBasketLineCookieValue, strDetailsToKeep, strLineNumber, strName, strValue, iLineNumberStartPosition;
  iNextStartPosition = 0;
  strDetailsToKeep = '';
  blnFirst = true;
  strBasketLineCookieValue = _cyGetBasketLineCookieValue();
  if (strBasketLineCookieValue != null)
  {
    iLineNumberToRemove = parseInt(strLineNumberToRemove, 10);
    while ((iPos = strBasketLineCookieValue.indexOf('CYBK', iNextStartPosition)) != -1)
    {
      strLineNumber = (iLineNumberStartPosition = iPos + 4 , strBasketLineCookieValue.substr(iLineNumberStartPosition, iLineNumberStartPosition + 3 - iLineNumberStartPosition));
      strName = _cyGetBasketDetailNameFromKeyStartingAt(strBasketLineCookieValue, iPos);
      strValue = _cyGetBasketDetailValueFromKeyStartingAt(strBasketLineCookieValue, iPos);
      iNextStartPosition = iPos + 1;
      iCurrentLineNumber = parseInt(strLineNumber, 10);
      if (iLineNumberToRemove != iCurrentLineNumber)
      {
        iCurrentLineNumber > iLineNumberToRemove && --iCurrentLineNumber;
        blnFirst || (strDetailsToKeep = strDetailsToKeep + '&');
        strDetailsToKeep = strDetailsToKeep + 'CYBK';
        strDetailsToKeep = strDetailsToKeep + _cyFormatLineNumber(iCurrentLineNumber);
        strDetailsToKeep = strDetailsToKeep + strName;
        strDetailsToKeep = strDetailsToKeep + ':';
        strDetailsToKeep = strDetailsToKeep + strValue;
        blnFirst = false;
      }
    }
    _cySetBasketLineCookieValue(strDetailsToKeep);
  }
}

function _cyRemoveBasketLineInt(iLineNumberToRemove)
{
  _cyRemoveBasketLine(_cyFormatLineNumber(iLineNumberToRemove));
}

function _cyRemoveBasketLineValue(strLineNumberOfValue, strNameOfValue)
{
  var blnDetailsStillExistForLine, blnFirst, iNextStartPosition, iPos, strBasketLineCookieValue, strDetailsToKeep, strLineNumber, strName, strValue, iLineNumberStartPosition;
  iNextStartPosition = 0;
  strDetailsToKeep = '';
  blnFirst = true;
  blnDetailsStillExistForLine = false;
  strBasketLineCookieValue = _cyGetBasketLineCookieValue();
  if (strBasketLineCookieValue != null) 
  {
    while ((iPos = strBasketLineCookieValue.indexOf('CYBK', iNextStartPosition)) != -1) 
    {
      strLineNumber = (iLineNumberStartPosition = iPos + 4 , strBasketLineCookieValue.substr(iLineNumberStartPosition, iLineNumberStartPosition + 3 - iLineNumberStartPosition));
      strName = _cyGetBasketDetailNameFromKeyStartingAt(strBasketLineCookieValue, iPos);
      strValue = _cyGetBasketDetailValueFromKeyStartingAt(strBasketLineCookieValue, iPos);
      iNextStartPosition = iPos + 1;
      if (compareTo(strLineNumber, strLineNumberOfValue) != 0 || compareTo(strName, strNameOfValue) != 0) 
      {
        compareTo(strLineNumber, strLineNumberOfValue) == 0 && (blnDetailsStillExistForLine = true);
        blnFirst || (strDetailsToKeep = strDetailsToKeep + '&');
        strDetailsToKeep = strDetailsToKeep + 'CYBK';
        strDetailsToKeep = strDetailsToKeep + strLineNumber;
        strDetailsToKeep = strDetailsToKeep + strName;
        strDetailsToKeep = strDetailsToKeep + ':';
        strDetailsToKeep = strDetailsToKeep + strValue;
        blnFirst = false;
      }
    }
    _cySetBasketLineCookieValue(strDetailsToKeep);
    blnDetailsStillExistForLine || _cyRemoveBasketLine(strLineNumberOfValue);
  }
  
  return !blnDetailsStillExistForLine;
}

function _cyRemoveBasketLineValueInt(iLineNumberOfValue, strNameOfValue)
{
  return _cyRemoveBasketLineValue(_cyFormatLineNumber(iLineNumberOfValue), strNameOfValue);
}

function _cyUpdateBasketLineValue(strLineNumber, strKey, strValue)
{
  var blnLineRemoved = false;
  var strBasketLineCookieValue, strDetailsToKeep;
  strBasketLineCookieValue = _cyGetBasketLineCookieValue();

  if (strBasketLineCookieValue.indexOf('CYBK000') != -1)
  {
    _cyRemoveBasketLine('000');
    strBasketLineCookieValue = _cyGetBasketLineCookieValue();
  }

  if (strBasketLineCookieValue.indexOf('CYBK' + strLineNumber + strKey) != -1)
  {
    blnLineRemoved = _cyRemoveBasketLineValue(strLineNumber, strKey);
  }

  if( blnLineRemoved == true )
  {
    _cyInsertBasketLineValue(strLineNumber, strKey, strValue);
  }
  else
  {
    strBasketLineCookieValue = _cyGetBasketLineCookieValue();

    strBasketLineCookieValue == null && (strBasketLineCookieValue = '');
    
    strDetailsToKeep = '' + strBasketLineCookieValue;
    compareTo(strBasketLineCookieValue, '') != 0 && (strDetailsToKeep = strDetailsToKeep + '&');
    strDetailsToKeep = strDetailsToKeep + 'CYBK';
    strDetailsToKeep = strDetailsToKeep + strLineNumber;
    strDetailsToKeep = strDetailsToKeep + strKey;
    strDetailsToKeep = strDetailsToKeep + ':';
    strDetailsToKeep = strDetailsToKeep + encodeURIComponent(strValue);
    _cySetBasketLineCookieValue(strDetailsToKeep);
  }
}

function _cyUpdateBasketLineValueInt(iLineNumber, strKey, strValue)
{
  _cyUpdateBasketLineValue(_cyFormatLineNumber(iLineNumber), strKey, strValue);
}


function _cyEmptyTheServerBasket()
{
  _cyUpdateBasketLineValue('000', 'Empty', 'TheBasket');
}

function _cyEmptyTheClientBasket()
{
  _cySetBasketLineCookieValue('');
}

function _cySetBasketLineCookieValue(strValue)
{
  cyPageBasket = strValue;
  _cyCreateClientCookie('_cybskt', strValue);
}

function _cyGetBasketLineCookieValue()
{
  var strValue = '';

  if( cyPageBasket == '' )
  {
    strValue = _cyGetCookie('_cybskt', false);
  }
  else
  {
    strValue = cyPageBasket;
  }

  return strValue;
}

function _cyGetBasketLinesQueryString()
{
  var strValue = '';
  
  strValue = _cyGetBasketLineCookieValue();
  _cySetBasketLineCookieValue('');
  _cySetCurrentLineNumberCookieValue('');

  if( strValue != undefined && strValue != null && strValue != '' )
  {
    strValue = $replaceAll(strValue, ':', '=');
    strValue = "&" + strValue;
  }

  return strValue;
}

function $replaceAll(strValue, regex, replace)
{
  replace = __translateReplaceString(replace);
  return strValue.replace(RegExp(regex, 'g'), replace);
}

function __translateReplaceString(replaceStr)
{
  var pos;
  pos = 0;
  while (0 <= (pos = replaceStr.indexOf('\\', pos)))
  {
    replaceStr.charCodeAt(pos + 1) == 36?(replaceStr = replaceStr.substr(0, pos - 0) + '$' + $substring(replaceStr, ++pos)):(replaceStr = replaceStr.substr(0, pos - 0) + $substring(replaceStr, ++pos));
  }
  return replaceStr;
}

function compareTo(thisStr, otherStr)
{
  thisStr = String(thisStr);
  if (thisStr == otherStr)
  {
    return 0;
  }
  return thisStr < otherStr?-1:1;
}

function _cySetCurrentLineNumberCookieValue(strValue)
{
  cyCurrLineNumber = strValue;
  _cyCreateClientCookie('_cycurrln', strValue);
}

function _cyGetCurrentLineNumberCookieValue()
{
  var strValue = '';

  if( cyCurrLineNumber == '' )
  {
    strValue = _cyGetCookie('_cycurrln', false);
  }
  else
  {
    strValue = cyCurrLineNumber;
  }

  return strValue;
}

function cyNewBasketLine()
{
  var strLineNumber = '';

  strLineNumber = _cyGetNextBasketLineNumber();

  _cySetCurrentLineNumberCookieValue(strLineNumber);
}

function cyAddBasketLineDetail(strKey, strValue)
{
  var strLineNumber = '';

  strLineNumber = _cyGetCurrentLineNumberCookieValue();

  if( strLineNumber == undefined || strLineNumber == null || strLineNumber == '' )
  {
  	cyNewBasketLine();
  	strLineNumber = _cyGetCurrentLineNumberCookieValue();
  }

  _cyUpdateBasketLineValue(strLineNumber, strKey, strValue);
}

function cyRemoveCurrentBasketLine()
{
  var strLineNumber = '';

  strLineNumber = _cyGetCurrentLineNumberCookieValue();

  if( strLineNumber != undefined && strLineNumber != null && strLineNumber != '' )
  {
    _cyRemoveBasketLine(strLineNumberToRemove)
  }
}

function cyClientSideBasketReset()
{
  _cySetCurrentLineNumberCookieValue('');
  _cyEmptyTheClientBasket();
}

function cyServerSideBasketReset()
{
  _cyEmptyTheServerBasket();
}

cy.control.cySetUserDefined = function( strKey, strValue )
{
	if( strKey != undefined && strKey != null && strKey != 'HasDiscount' )
	{
		if( strKey == "length" )
		{
			strKey = "Length";
		}

		var strMappedKeyIndex;

		strMappedKeyIndex = cy.control.misc_data_map[strKey];



		if( strMappedKeyIndex == undefined || strMappedKeyIndex == null )
		{
			strMappedKeyIndex = cy.control.misc_data_count;
			cy.control.misc_data_count = cy.control.misc_data_count + 1;
		}
		else
		{
		}

		cy.control.misc_data_keys[strMappedKeyIndex] = strKey;
		cy.control.misc_data_vals[strMappedKeyIndex] = strValue;
		cy.control.misc_data_map[strKey] = strMappedKeyIndex;
	}
	else
	{
		cy.CUSTOM10 = strValue;
	}
}

cy.control.cyGetUserDefined = function()
{
	var strUserDefined = "";


	for( var count = 0; count < cy.control.misc_data_keys.length; count++ )
	{
		if( count != 0 )
		{
			strUserDefined = strUserDefined + "&";
		}

		strUserDefined = strUserDefined + encodeURIComponent( cy.control.misc_data_keys[count] ) + "=" + encodeURIComponent (cy.control.misc_data_vals[count] );
	}


	cy.control.misc_data_keys = new Array();
	cy.control.misc_data_vals = new Array();
	cy.control.misc_data_map = new Array();
	cy.control.misc_data_count = 0;

	return strUserDefined;
}

cy.control.cyGetUserDefinedQueryString = function()
{
	var strUserDefinedQueryString = "";
	var strUserDefinedData = "";

	strUserDefinedData = cy.control.cyGetUserDefined();

	if( strUserDefinedData != undefined && strUserDefinedData != null && strUserDefinedData != '' )
	{
		strUserDefinedQueryString = "&" + strUserDefinedData;
	}

	return strUserDefinedQueryString;
}

//cy.control._cyCS();
