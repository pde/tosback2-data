/**
 * This file contains utility methods for accessing, setting and modifying Cookies.
 **/
/* namspace gmds */
var gmds = gmds || 
{ 

};

/**
	sets a cookie to a value
	name: the name of the cookie
	value: the value to store within the cookie
	validity: (optional) the duration of validity for this cookie (in ms)
	path: (optional) the path for which the cookie is valid
	domain: (optional) the domain for which the cookie is valid
*/
gmds.setCookie = function(/*String*/name, /*String*/value, /*int*/validity, /*String*/path, /*String*/domain, /*boolean*/secure )
{
	var cookie_string = name + "=" + escape (value);
	if (validity) {
		var curDate = new Date();
		var expiry = new Date(curDate.getTime() + validity);
		cookie_string += "; expires=" + expiry.toGMTString();
	}
	if (path) {
		cookie_string += "; path=" + escape (path);
	}
	if (domain) {
		cookie_string += "; domain=" + escape (domain);
	}
	if (secure) {
		cookie_string += "; secure";
	}
	document.cookie = cookie_string;
};


/**
	deletes a cookie
	name: the name of the cookie to delete
*/
gmds.deleteCookie = function(/*String*/name)
{
	var cookie_date = new Date ( );  // current date & time
	cookie_date.setTime ( cookie_date.getTime() - 1 );
	document.cookie = name += "=; expires=" + cookie_date.toGMTString();
};

/**
	gets a cookie value
	name: the name of the cookie whose value should be retrieved
*/
/*String*/ gmds.getCookie = function(/*String*/name)
{
	var results = document.cookie.match(name + '=(.*?)(;|$)');
	
	if (results)  {
		return (unescape(results[1]));
	}
	else {
		return null;
	}
};