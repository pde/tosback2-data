if (!this.NIT) this.NIT = {}; // Ensure namespace exists if running as stand-alone script
if (!NIT.Launch) NIT.Launch = {};

//////////////////////////////////////
// Event Extensions
//////////////////////////////////////
NIT.addListener = function (obj, evt, cb) // Cross-browser event attaching ex: (obj, "onload", Init)
{
	if (obj.attachEvent)
	{
		obj.attachEvent(evt, cb); //"onload", Init );
	}
	else if (obj.addEventListener)
	{
		evt = (evt.toLowerCase().indexOf("on") == 0) ? evt.substr(2) : evt;
		obj.addEventListener(evt, cb, false); //"load", Init, false );
	}
};

// Detect url of this script to make our service relative to the script and not the page Agent is running from (required for Embedded)
NIT.scriptSource = '';

(function () {
	try // Must be in a try-catch, or intellisense breaks (since this errors during that processing)
	{
		var scriptTags = document.getElementsByTagName('script');
		var script = scriptTags[scriptTags.length - 1];
		NIT.scriptSource = script.getAttribute('src', -1);
	}
	catch (e) { }
} ());

NIT.agentURL = NIT.scriptSource.substr(0, NIT.scriptSource.lastIndexOf('/includes/') + 1) + 'Agent.aspx';

NIT.getErrorMessage = function(e)
{
	// NOTE:  Permission Denied does not throw exception for: Safari 3 (Mac and PC), Chrome 1.0
	if (e.message) // IE6, IE7, FF3
		return e.message;
	else // FF1, FF1.5, FF2, FF3
		return e.toString();
};

NIT.Launch.repositionWindow = function(win, width, height, top, left)
{
	try
	{
		win.resizeTo(width, height); // Must resize before the move to make sure we can fit, otherwise the window doesn't move all the way (if moving off edge of screen)
		// The following line works best to successfully reposition, but is sometimes too much moving to look nice for smaller windows during the transition
		win.moveTo(0, 0); // This helps it work better when changing sizes, due to some OS's clipping to the visible screen.
		win.resizeTo(width, height);
		win.moveTo(left, top);
	}
	catch (e) // Permission denied? Happens if we change out of our domain, we should make sure it doesn't happen in any other situation, or comment out throw below
	{
		// if not permission denied, throw the error
		if (NIT.getErrorMessage(e).indexOf('denied') == -1)
		{
			throw e;
		}
	}
};

NIT.Launch.openWindow = function(url, windowName, align, width, height, top, left, layoutParent, parentWidth, parentHeight, options)
{
	align = (!align || align.toLowerCase() != 'left') ? 'right' : 'left'; // Default to right if not 'left'
	width = (width) ? width : 250; // Default width: 250px
	height = (height) ? height : screen.availHeight; // Default height: 100%
	top = (top) ? top : 0; // Default top: 0px
	left = (left) ? left : 0; // Default left: 0px
	layoutParent = (layoutParent) ? true : false;
	parentWidth = (parentWidth && parentWidth > 0) ? parentWidth : screen.availWidth; // Default height: 100%
	parentHeight = (parentHeight && parentHeight > 0) ? parentHeight : screen.availHeight; // Default height: 100%
	options = (options) ? options : 'scrollbars=no,menubar=no,resizable=yes,location=no,status=yes,titlebar=no,toolbar=no';

	var parentLeft = (align == 'left') ? width : 0;

	// Parent width not specified or not enough space for parent window and need to shrink to fit
	if (parentWidth + width > screen.availWidth)
	{
		parentWidth = screen.availWidth - width; // Must also make parent window fit
	}
	// If Agent height is taller than it can fit within the screenheight
	if (height + top > screen.availHeight)
	{
		height = screen.availHeight - top; // Must also make agent window fit
	}
	// Parent height not specified or taller than can fit
	if (parentHeight + top > screen.availHeight)
	{
		parentHeight = screen.availHeight - top; // Must also make parent window fit
	}

	if (align == 'right') // Detect "left" and ignore setting
	{
		if (parentWidth + self.width > screen.availWidth) // If not enough space, align on the right screen edge
		{
			left = screen.availWidth - self.width;
			//parentWidth = left; // Adjust parent width too so it sizes correctly if we do LayoutParent?
		}
		else // Align to the right of the parent window
		{
			left = parentWidth;
		}
	}

	var allOptions = 'width=' + width + 'px,height=' + height + 'px,left=' + left + ',top=' + top + ',' + options;

	var win = window.open('', windowName, allOptions);

	if (win)
	{
		var isNew = false;
		try
		{
			isNew = (win.location.href.indexOf(url) < 0);
		}
		catch (e) { }

		if (isNew)
		{
			win.location.href = url;

			try
			{
				// The popup size is for content only, we need to resize to get the size perfect
				win.resizeTo(width, height);
				win.moveTo(left, top);

				if (layoutParent)
					NIT.Launch.repositionWindow(self, parentWidth, parentHeight, 0, parentLeft);
			}
			catch (e) { }
		}
		
		win.focus(); //JIRA:AGNT-1017
	}
	return win; // Return window reference in case we need to use it
};

NIT.Launch.openAgentWindow = function (launchPointName, Question)
{
	var agentURL = NIT.agentURL;
	var saveCookie = false;

	// JIRA: CHART-1850
	NIT.InfoCookie.question = '';
	NIT.InfoCookie.launchPointName = '';

	if (launchPointName)
	{
		NIT.InfoCookie.launchPointName = launchPointName;
		saveCookie = true;
	}

	if (Question)
	{
		NIT.InfoCookie.question = Question;
		saveCookie = true;
	}

	if (saveCookie)
		NIT.InfoCookie.save();

	NIT.Launch.openWindow(agentURL, 'Agent', 'right', 470, 610, 0, 0, true);
};

//////////////////////////////////////
// Begin: NIT.Cookie.js
//////////////////////////////////////
NIT.Cookie = function (name, sVals, exp)
{
	var me = this;
	this.name = name;
	this.value = null;
	this.values = new Object();
	// These three are for saving cookies
	this.expires = (exp) ? exp : null; // Leave null for session cookie (or if updating cookie)
	this.path = '/';
	this.secure = (window.location.protocol == "https:");
	this.domain = NIT.CookieUtil.getDomain();

	if (sVals != null) // Parse specified value(s) 
	{
		var nvc = (typeof (sVals) == "string") ? sVals.split('&') : null; // Get the name-value collection from the cookie
		if (nvc != null && nvc.length > 0 && sVals.indexOf('=') > -1)
		{
			for (var i = 0; i < nvc.length; i++)
			{
				var nv = nvc[i].split('='); // Get the name and value of this entry
				if (nv.length > 1)
					me.values[nv[0]] = nvc[i].substr(nv[0].length + 1); //nv[1]; // Add property to our Values (remove the name, since the content may also have '=' characters)
				else if (i == 0)
					me.value = nv[0]; // If no equal sign and the first entry, it is the main property

			}
		}
		else // Single value cookie
			me.value = sVals;
	}

	// Methods
	this.save = function ()
	{
		var v = (me.value != null) ? me.value : '';
		for (var n in me.values)
		{
			var val = (me.values[n] != null) ? me.values[n] : '';
			v += '&' + n + '=' + val; //escape(val); // No longer escaped, now matching how .NET does it
		}
		if (v[0] == '&')
			v = v.substr(1);

		var c = this.name + '=' + v +
			((me.expires == null) ? "" : (";expires=" + me.expires.toGMTString())) +
			";path=" + this.path +
			((me.domain == null) ? "" : (";domain=" + me.domain)) +
			((me.secure) ? ";secure;" : ";");
		document.cookie = c;
	};

	this.remove = function ()
	{
		me.expires = new Date(1970, 1, 2); // "Fri, 02-Jan-1970 00:00:00 GMT" );
		me.save();
	};
};

NIT.CookieUtil = new function ()
{
	var me = this;
	this.getCookies = function () // Parses all available cookies
	{
		var all = new Object();
		if (document.cookie != "")
		{
			var cookies = document.cookie.split("; ");
			for (i = 0; i < cookies.length; i++)
			{
				var c = cookies[i];
				var idx = c.indexOf('=');
				var N = c.substr(0, idx);
				var V = '';
				if (c.length > idx + 1) // Not an empty value (just in case)
					V = c.substring(idx + 1, c.length); //unescape( c.substring(idx+1, c.length) ); // No longer escaped, now matching how .NET does it
				all[N] = new NIT.Cookie(N, V);
			}
		}
		return all;
	};

	this.getCookie = function (name) // Selects a cookie by name
	{
		return me.getCookies()[name];
	};

	this.showCookies = function ()
	{
		var cookies = me.getCookies();
		var sCookie = '';
		for (var crumb in cookies)
		{
			sCookie += 'Name: ' + cookies[crumb].name + '\n';
			sCookie += 'Value: ' + cookies[crumb].value + '\n';
			// now show Values array for the current crumb
			for (var values in cookies[crumb].values)
			{
				sCookie += "    " + values + ": ";
				sCookie += cookies[crumb].values[values] + "\n";
			}
		}
		//alert(sCookie);
		return sCookie;
	};

	this.getDomain = function ()
	{
		var url = document.domain;
		var end = "";

		if (url.indexOf('.') > -1)
		{
			end = url.substr(url.lastIndexOf('.'));
			url = url.substring(0, url.lastIndexOf('.'));
		}
		if (url.indexOf('.') > -1)
		{
			url = url.substr(url.lastIndexOf('.') + 1);
		}
		url = url + end;
		if (url.indexOf('.') == -1)
		{
			url = null;
		}

		if (url && (/^[0-9]+.[0-9]+$/g).test(url)) // Fix for when we're referencing by IP address
			return null;

		return url;
	};

	this.isCookiesEnabled = function ()
	{
		// set a cookie then test to see if it was set properly
		var n = "Test";
		var c = new NIT.Cookie(n, n);
		c.save(); // Save in cookie collection
		c = me.getCookie(n); // Check that we can retrieve it
		if (c) c.remove(); // Cleanup

		return (c != null && c.value == n) ? true : false;
	};
};
//////////////////////////////////////
// End: NIT.Cookie.js
//////////////////////////////////////

//////////////////////////////////////
// Begin: CookieCommand Section (this section is shared between multiple files)
//////////////////////////////////////
NIT.CookieCommand = new function ()
{
	var me = this;
	var COOKIE_NAME = "NIT_CMD";

	this.navigateUrl;
	this.isNavigating = false;
	this.pageChanged = false; // New, for the agent side

	this.write = function ()
	{
		var c = new NIT.Cookie(COOKIE_NAME);
		if (me.navigateUrl)
		{
			// Avoid null string concatenation
			c.values.navigateUrl = encodeURIComponent(me.navigateUrl);
		}

		c.values.isNavigating = me.isNavigating;
		c.values.pageChanged = me.pageChanged;
		c.save();
	};

	this.read = function ()
	{
		me.navigateUrl = null;

		var c = NIT.CookieUtil.getCookie(COOKIE_NAME);
		if (c && c.values)
		{
			if (c.values.navigateUrl)
			{
				me.navigateUrl = decodeURIComponent(c.values.navigateUrl);
			}

			me.isNavigating = (c.values.isNavigating == "true");
			me.pageChanged = (c.values.pageChanged == "true");
		}
	};
};
//////////////////////////////////////
// End: CookieCommand Section
//////////////////////////////////////

//////////////////////////////////////
// Begin: InfoCookie Section 
//////////////////////////////////////
NIT.InfoCookie = new function ()
{
	var me = this;
	var COOKIE_NAME = "NIT_INFO";

	this.pageName = '';
	this.launchPointName = '';
	this.question = '';

	this.save = function ()
	{
		var c = new NIT.Cookie(COOKIE_NAME);

		// grab current page info from omniture variables
		//        if (typeof s_exp != 'undefined' && typeof s_exp.pageName != 'undefined')
		//            me.pageName = s_exp.pageName;
		//        if (me.pageName == '' && typeof s_pageName != 'undefined')
		//            me.pageName = s_pageName;

		c.values.pageName = me.pageName;
		c.values.launchPointName = me.launchPointName;
		c.values.question = me.question;
		c.save();
	};

	this.read = function ()
	{
		me.pageName = '';
		me.launchPointName = '';
		me.question = '';

		var c = NIT.CookieUtil.getCookie(COOKIE_NAME);
		if (c && c.values)
		{
			if (c.values.pageName)
			{
				me.pageName = c.values.pageName;
			}
			if (c.values.launchPointName)
			{
				me.launchPointName = c.values.launchPointName;
			}
			if (c.values.question)
			{
				me.question = c.values.question;
			}
		}
	};
};
//////////////////////////////////////
// End: InfoCookie Section
//////////////////////////////////////

NIT.Launch.Integration = new function ()
{
	var me = this;


	NIT.CookieCommand.read();
	if (NIT.CookieCommand.isNavigating)
	{
		NIT.CookieCommand.isNavigating = false;
		NIT.CookieCommand.write();
	}
	else // Page changed, not navigated by agent
	{
		NIT.CookieCommand.pageChanged = true;
		NIT.CookieCommand.write();
	}

	// Setup cookie polling for two-way commands
	this.checkCommandCookie = function ()
	{
		NIT.CookieCommand.read();
		if (NIT.CookieCommand.navigateUrl)
		{
			var url = NIT.CookieCommand.navigateUrl;

			location.href = url;

			NIT.CookieCommand.navigateUrl = null;
			NIT.CookieCommand.write();
		}
		setTimeout(me.checkCommandCookie, 500);
	};
	this.checkCommandCookie();

	this.onPageLoad = function ()
	{
		//NIT.InfoCookie.save();
	};

	this.onUnload = function ()
	{
		// do page unload stuff
	};

	//add window onload listener
	NIT.addListener(window, "onload", this.onPageLoad);

	//add window onunload listener
	NIT.addListener(window, "onunload", this.onUnload);
};



