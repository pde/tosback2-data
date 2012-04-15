function Cookie() {}

Cookie.isEnabled = function() {
	return window.navigator.cookieEnabled;
}

Cookie.getCookie = function(name) {
    var cs = document.cookie;
	var start = cs.indexOf(name + "=");
	var len = start + name.length + 1;
	if ((!start ) && (name != cs.substring(0, name.length ))) {
		return null;
	}
	if (start == -1) {
		return null;
	}
	var end = cs.indexOf(";", len);
	if (end == -1) {
		end = cs.length;
	}
	return unescape(cs.substring(len, end));
}

Cookie.deleteCookie = function(name, path, domain) {
    if (Cookie.getCookie(name)) {
        document.cookie = name + "=" +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

Cookie.setCookie = function(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}
