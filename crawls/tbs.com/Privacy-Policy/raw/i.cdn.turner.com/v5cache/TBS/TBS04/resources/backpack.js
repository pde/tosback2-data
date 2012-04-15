function setCookie(name,value,seconds,domain) 
{
	var expires = '';
	if (domain == null) 
	{
		domain = cookieDomain();
	}
	if (seconds != 0) 
	{
		var date = new Date();
		date.setTime(date.getTime() + seconds*1000);
		expires = '; expires=' + date.toGMTString();
	}
	document.cookie = name + '=' + escape(value) + expires + '; path=/; domain=.' + domain;
}

function getCookies() 
{
	var hash = new Array;
	if (document.cookie != null) 
	{
		var a = document.cookie.split('; ');
		for (var i=0; i < a.length; i++) 
		{
			var nv = a[i].split('=');
			if (nv[1] != null) 
			{
				hash[nv[0]] = unescape(nv[1]);
			}
		}
	}
	return hash;
}

function deleteCookie(name) 
{
	setCookie(name, 'x', -1);
}

function cookieDomain() 
{
	var d;
	var parts = window.location.hostname.split('.');
	if (parts[parts.length-1].length == 2) 
	{
		// Domains like cnn.co.jp should retain 3 parts
		d =	parts[parts.length-3] + '.' +
			parts[parts.length-2] + '.' +
			parts[parts.length-1];
	}
	else 
	{
		// Other domains like cnn.com should retain 2 parts
		d =	parts[parts.length-2] + '.' +
			parts[parts.length-1];
	}
	return d;
}

// Account Status
function AccountStatusCode(cookieVal) 
{
	var now = new Date();
	var fields = cookieVal.split('-');

	this.status = fields[0];
	this.expiry = new Date(fields[1]-0);
	this.points = fields[2];
	this.expired = fields[1] < now.getTime();
}


// status: active | inactive | nonmember | unknown | forbidden
var cookies = getCookies();
var debug = "ok";

function refreshCookie() 
{
	if (!location.search)
	{
		location.href = "http://audience.nascar.com/services/nascar/NascarMiles?action=getPoints&url=" + escape(location.href + "?a=b");
	}

	cookies = getCookies();
	return cookies;
}

function getStatus() 
{
	if (cookies["nmpoints"] == null || cookies["nmpoints"] == "") 
	{
		refreshCookie();
		if (cookies["nmpoints"] == null || cookies["nmpoints"] == "") 
		{
			debug = "No trackPoints cookie was found.  After an attempted refresh, it still wasn't";
			return null;
		}
		else 
		{
			var a = new AccountStatusCode(cookies["nmpoints"]);
			if (a.expired) 
			{
				debug = "No trackPoints cookie was found.  After an attempted refresh, it was expired";
				return null;
			}
			else 
			{
				return a;
			}
		}
	}

	var a = new AccountStatusCode(cookies["nmpoints"]);

	if (a.expired) 
	{
		refreshCookie();
		if (cookies["nmpoints"] == null || cookies["nmpoints"] == "") 
		{
			debug = "The trackPoints cookie was expired. After an attempted refresh, it was deleted";
			return null;
		}

		a = new AccountStatusCode(cookies["nmpoints"]);

		if (a.expired) 
		{
			debug = "The trackPoints cookie was expired. After an attempted refresh, it still was";
			return null;
		}
		else 
		{
			return a;
		}
	}
	else 
	{
		return a;
	}
}
