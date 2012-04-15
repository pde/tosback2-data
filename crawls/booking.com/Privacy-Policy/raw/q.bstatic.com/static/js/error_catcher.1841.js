/* PPK's cookie scripts: http://www.quirksmode.org/js/cookies.html */
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function scriptsTrackingString() {

	var page,
	    page_data,
	    str = '{', 
	    scripts_tracking = booking.env.scripts_tracking;

	for ( page in scripts_tracking ) if( scripts_tracking.hasOwnProperty( page ) ) {

		page_data = scripts_tracking[page];

		str += '"' + page + '":{"loaded":' + !!page_data.loaded + ',"run":' + !!page_data.run + '},'; 	

	}

	str = str.slice( 0, str.length - 1 ) + '}';

	return '&scripts=' + encodeURIComponent( str ); 

}

window.onerror = function (msg, url, lno) {
	// Cookie check
	var cookie = readCookie('error_catcher');
	if (cookie == 'kill' || (typeof document.kill != "undefined" && document.kill == true)) return false;
	var count = 0;
	if (cookie) {
		var cookie_details = cookie.split('%2C');
		count = cookie_details[1];
	}
	if (cookie && cookie.indexOf(booking.env.pageview_id) != -1 && count > 5) return false;
	var ajax;
	if (window.XMLHttpRequest) {
		try {
			ajax = new window.XMLHttpRequest(); // XMLHttpRequest (Mozilla, Opera, Safari, etc.)
		} catch (e) {
			ajax = false;
		}
	} else {
		var msXML = new Array( // XMLHttpRequest (IE with ActiveX)
			"Msxml2.XMLHTTP.5.0",
			"Msxml2.XMLHTTP.4.0",
			"Msxml2.XMLHTTP.3.0",
			"Msxml2.XMLHTTP",
			"Microsoft.XMLHTTP"
		);
		for (var i = 0; i < msXML.length; i++) { // We want to get the best we can
			try {
				ajax = new ActiveXObject(msXML[i]);
				window.status = i;
				break;
			} catch (e) {
				ajax = false;
			}
		}
	}
	if (ajax) {
		var data = 'error=' + encodeURIComponent(msg) + '&pid=' + encodeURIComponent(booking.env.pageview_id);
		
		if ( url !== '' && typeof url !== 'undefined' ) {
			data += '&url=' + encodeURIComponent(url);
		}
		
		if ( booking.env.enable_scripts_tracking ) {
			data += scriptsTrackingString(); 
		}
		
		ajax.open('PUT', '/js_errors', true);
		ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		ajax.setRequestHeader('Content-length', data.length);
		ajax.setRequestHeader('Connection', 'close');
		ajax.onreadystatechange = function () {
			if (ajax.readyState == 4 && (ajax.status == 503 || ajax.responseText == 'shut up')) {
				document.kill = true;
				createCookie('error_catcher', 'kill', 30);
			}
		}
		ajax.send(data);
		count = (cookie && cookie_details[0] == booking.env.pageview_id) ? parseInt(cookie_details[1]) + 1 : 1;
		createCookie('error_catcher', booking.env.pageview_id + '%2C' + count, 1);
	}
	return false; // Don't suppress default browser onerror handler
}
