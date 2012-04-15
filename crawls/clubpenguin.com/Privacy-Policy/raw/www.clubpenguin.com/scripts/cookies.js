/**
 * Sets a cookie in the user's browser
 * 
 * @param name of the cookie
 * @param value of the cookie
 * @param expiry_days from now, null for a session cookie
 */
function setCookie(name, value, expiry_days)
{
	expiry_str = '';
	path_str = '; path=/';
	domain_str = '; domain=clubpenguin.com';
	if(expiry_days) {
		var d = new Date();
		d.setDate(d.getDate() + expiry_days);
		expiry_str = ';expires=' + d.toGMTString();
	}
	
	document.cookie = name + '=' + escape(value) + expiry_str + path_str + domain_str;
}

/**
 * Gets the value of the cookie from the user's browser
 * 
 * @param name of the cookie
 * @return value of the cookie, null if the cookie isn't found
 */
function getCookie(name)
{
	var s = document.cookie.indexOf(name + "=");
	if(s == -1) {
		return null;
	}
	s += name.length + 1;
	var e = document.cookie.indexOf(";", s);
	if(e == -1) {
		e = document.cookie.length;
	}
	return unescape(document.cookie.substring(s, e));
}

/* 
The following checks for and records if a visitor is new or is a return visitor -- for A/B testing T&T
*/

if (!getCookie ('cpvisitor')) { 
	setCookie('cpvisitorsession', 'true', ''); 
	setCookie ('cpvisitor', 'new', 2400); 
} else { 
	if (!getCookie ('cpvisitorsession')) { 
		if ((getCookie ('cpvisitor')) == 'new') {
			setCookie ('cpvisitor', 'new', -1); 
			setCookie ('cpvisitor', 'return', 2400); 
		}			
	}
}

/* 
The following checks for and records the OAST source code present in a URL clicked on from a creative asset on an external site
*/

var qsParm = new Array();
function qs() {
var query = window.location.search.substring(1);
var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
	var pos = parms[i].indexOf('=');
		if (pos > 0) {
		var key = parms[i].substring(0,pos);
		var val = parms[i].substring(pos+1);
		qsParm[key] = val;
		}
	}
} 

qsParm['oast'] = null;
qs();

if (qsParm['oast'] != null) {
	if (getCookie ('oast')) { 
		setCookie ('oast', '', -1);
		setCookie ('oast', qsParm['oast'], 2400);
	} else {
		setCookie ('oast', qsParm['oast'], 2400);
	}
}