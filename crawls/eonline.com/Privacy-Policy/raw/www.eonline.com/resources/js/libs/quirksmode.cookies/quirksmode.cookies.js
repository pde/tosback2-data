// Compliments of: http://www.quirksmode.org/js/cookies.html
function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = '; expires=' + date.toGMTString();
	}
	else var expires = '';
	document.cookie = name + '=' + value + expires + '; path=/';
}

function readCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i=0, j=ca.length; i<j; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1,c.length);
		}
		if (c.indexOf(nameEQ) === 0) {
			return c.substring(nameEQ.length,c.length);
		}
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,'',-1);
}

/* Old EOL Code from Uberblog. http://www.eonline.com/uberblog/includes/js/eol-blog/global1.js
 * Please try to use the function names above if possible. 
 * If domain restrictions are needed, then turn on the code below.
 * Note: SetSessionCookie() is still used by the new global header/footer code.
 */

//Cookie Stuff
/*function Get_Cookie( name ) {
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ){
		return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
		return unescape( document.cookie.substring( len, end ) );
}*/

// this deletes the cookie when called
/*function Delete_Cookie( name, path, domain ) {
	if ( Get_Cookie( name ) ) document.cookie = name + "=" + ( ( path ) ? ";path=" + path : "") + ( ( domain ) ? ";domain=" + domain : "" ) + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}*/

/*function Set_Cookie(cookieName,cookieValue,nDays, path, domain) {
 	var today = new Date();
 	var expire = new Date();
 	if (nDays==null || nDays==0) nDays=1;
 		expire.setTime(today.getTime() + 3600000*24*nDays);
 		document.cookie = cookieName+"="+escape(cookieValue) + ";expires="+expire.toGMTString()+";path="+path+";domain="+domain;
}*/

function SetSessionCookie(cookieName, cookieValue, path, domain) {
    document.cookie = cookieName+"="+escape(cookieValue) + ";path="+path+";domain="+domain;
}

//End Cookie Stuff