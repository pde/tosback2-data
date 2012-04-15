/*
 * Author:      Nick Ramsey
 * Date:        August 18, 2008
 * Description: Defines 4 classes:
 *                  - KeyValuePair: represents a key + value pair, has a function to parse a source string into an array
 *                  - KeyValuePairCollection: a collection of KeyValuePairs, with searching by key functions added.
 *                  - QueryStringManager: parses the QueryString into an array of KeyValuePairs and provides methods to access those values
 *                  - CookieManager: parses the cookies into an array of KeyValuePairs and provides methods to access those values
 */
// *** BEGIN KeyValuePair *** //
function KeyValuePair(key, value) 
{
	this.Key = key;
	this.Value = value;
}

KeyValuePair.parseToArray = function (sourceString, pairSeparator, keyValueSeparator, targetArray, decodeFunction, defaultValue)
{
	if (sourceString == null)
		sourceString = "";

	if (pairSeparator == null)
		pairSeparator = "";

	if (keyValueSeparator == null)
		keyValueSeparator = "";

	if (targetArray == null)
		targetArray = new Array();

	if (decodeFunction == null)
		decodeFunction = function (value) { return value; }

	var split = sourceString.split(pairSeparator);
	var item = null;
	var i = 0;
	var key = null;
	var value = null;

	while (i < split.length) 
	{
		// loop through the name-value pairs.
		item = split[i];
		idx = item.indexOf(keyValueSeparator);
		
		if (idx == -1) 
		{
			key = decodeFunction(item);
			value = defaultValue;
		}
		else 
		{
			key = decodeFunction(item.substring(0, idx));
			value = decodeFunction(item.substring(idx + keyValueSeparator.length));	
		}		

		// add the new item to the array of items.
		targetArray.push(new KeyValuePair(key, value));
		i  = i  + 1;
	}	
}
// *** END KeyValuePair *** //

// *** BEGIN KeyValuePairCollection *** //
function KeyValuePairCollection()
{
	this.Items = new Array();
}

KeyValuePairCollection.prototype.load = function (sourceString, pairSeparator, keyValueSeparator, decodeFunction, defaultValue)
{
	this.Items = new Array();
	KeyValuePair.parseToArray(sourceString, pairSeparator, keyValueSeparator, this.Items, decodeFunction, defaultValue);
}

KeyValuePairCollection.prototype.indexOfKey = function (key, startIndex)
{
	var rtrn = -1;
	
	if (key != null)
	{
	    var i = 0;
	    if (startIndex != null) 
		    i = startIndex;
	    var item = null;
		
    	while ((i < this.Items.length) && (rtrn == -1))
	    {
    		item = this.Items[i];	
	    	if (item.Key == key)
		    	rtrn = i;
		    i = i + 1;
	    }	
    }
    return rtrn;
}

KeyValuePairCollection.prototype.containsKey = function (key)
{
	var idx = this.indexOfKey(key, 0);
	return (idx != -1);
}		

KeyValuePairCollection.prototype.getItemByKey = function (key)
{
	var idx = this.indexOfKey(key, 0);		
	return (idx != -1)? this.Items[idx] : null;
}

KeyValuePairCollection.prototype.getValue = function (key, default_)
{
	var item = this.getItemByKey(key);
	return (item != null)? item.Value : default_;
}

KeyValuePairCollection.prototype.indexOfKeyIgnoreCase = function (key, startIndex)
{
	var rtrn = -1;
	
	if (key != null)
	{
		var i = 0;
		if (startIndex != null) 
			i = startIndex;
		var item = null;
		var uKey = key.toUpperCase();
		
		while ((i < this.Items.length) && (rtrn == -1))
		{
			item = this.Items[i];	
			if (item.Key.toUpperCase() == uKey)
			rtrn = i;
			i = i + 1;
		}	
	}
	return rtrn;
}

KeyValuePairCollection.prototype.containsKeyIgnoreCase = function (key)
{
	var idx = this.indexOfKeyIgnoreCase(key, 0);
	return (idx != -1);
}		

KeyValuePairCollection.prototype.getItemByKeyIgnoreCase = function (key)
{
	var idx = this.indexOfKeyIgnoreCase(key, 0);		
	return (idx != -1)? this.Items[idx] : null;
}

KeyValuePairCollection.prototype.getValueIgnoreCase = function (key, default_)
{
	var item = this.getItemByKeyIgnoreCase(key);
	return (item != null)? item.Value : default_;
}
// *** END KeyValuePairCollection *** //

// *** BEGIN QueryStringManager *** //
function QueryStringManager() 
{
	this.loadQueryString();
}

QueryStringManager.prototype = new KeyValuePairCollection;

QueryStringManager.prototype.loadQueryString = function()
{
	var requestUrl = location.href;

	// parse the items from the url.
	if ((requestUrl != null) && (requestUrl.length > 0))
	{
		requestUrl = requestUrl.replace('+', ' ');
		var idx = requestUrl.indexOf('?');

		if (idx != -1)
		{
			var qs = requestUrl.substring(idx + 1);
			this.load(qs, '&', '=', decodeURIComponent, null);	
		}
	}
}
// *** END QueryStringManager *** //

// *** BEGIN CookieManager *** //
function CookieManager()
{
	this.loadCookies();
}

CookieManager.prototype = new KeyValuePairCollection;

CookieManager.prototype.loadCookies = function ()
{
	var cookies = document.cookie;
	if ((cookies != null) && (cookies.length > 0))
		this.load(cookies, '; ', '=', null, null);
}

CookieManager.prototype.setCookie = function (key, value, days, domain)
{
	if ((key != null) && (value != null))
	{
		if (days == null)
			days = 1;
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		document.cookie = key + '=' + value + '; expires=' + date.toGMTString() + '; path=/;' + ((domain)? ' domain=' + domain + ';': '');
	}
}

CookieManager.prototype.setSessionCookie = function (key, value, domain)
{
    if ((key != null) && (value != null))
	{
		document.cookie = key + '=' + value + '; path=/;' + ((domain)? ' domain=' + domain + ';': '');
	}
}

CookieManager.prototype.clearCookie = function (key, domain)
{
	if (key != null)
		this.setCookie(key, "", -1, domain);
}

CookieManager.prototype.clearValue = function (key, domain)
{
	this.clearCookie(key, domain);
	this.loadCookies();
}

CookieManager.prototype.setValue = function (key, value, days, domain)
{
	this.setCookie(key, value, days, domain);
	this.loadCookies();
}
// *** END CookieManager *** //