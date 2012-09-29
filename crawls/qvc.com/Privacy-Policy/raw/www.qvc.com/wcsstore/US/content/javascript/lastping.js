var lastPingRequest = null;
var lastPingURL = footerHost + 'www.qvc.com/webapp/wcs/stores/servlet/OriginPingView?storeId=10251';
function setLastPing() {
	var c = 'lastping';
	var ex = 30;
	var exdate = new Date();
	v = exdate.getTime();
	exdate.setMinutes(exdate.getMinutes() + ex);
	var cv = escape(v) + ((ex==null) ? '' : '; expires='+exdate.toUTCString());
	document.cookie = c + '=' + cv + '; path=/';
}
function getLastPing() {
	var c = 'lastping';
	var i,x,y,ARRcookies = document.cookie.split(';');
	for ( i = 0 ; i < ARRcookies.length ; i++ ) {
		x = ARRcookies[i].substr(0,ARRcookies[i].indexOf('='));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
		x = x.replace(/^\s+|\s+$/g,'');
		if (x==c) {
			var yx = unescape(y);
			return parseInt(yx);
		}
	}
	return null;
}
function getPingHTTP() {
	var xhr = false;
	if (window.ActiveXObject) {
		try {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				xhr = false;
			}
		}
	} else if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	return xhr;
}
function parsePing(request) {
	if (request.readyState == 4) {
		if (request.status == 200 || request.status == 304) {
			var pingData = request.responseText;
		}
	}
}
function lastPing() {
	lastPingRequest = getPingHTTP();
	if (lastPingRequest) {
		lastPingRequest.onreadystatechange = function() {
			parsePing(lastPingRequest);
		};
		lastPingRequest.open("GET", lastPingURL, true);
		lastPingRequest.send(null);
	}
}
if (getLastPing() == null) {
	setLastPing();
	lastPing();
} else {
	var lpDate = new Date().getTime();
	if ( (lpDate-getLastPing()) >= 600000) {
		setLastPing();
		lastPing();
	}
}