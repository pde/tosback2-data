/*
 ** Copyright Â© 2013 Apple Inc.
 ** All rights reserved.
 */

window.its || (window.its = {}), its.currentTime = function() {
	return (new Date)
		.getTime()
}, its.isDefined = function(t) {
	return typeof t != "undefined"
}, its.isDefinedNonNull = function(t) {
	return its.isDefined(t) && t != null
}, its.isDefinedNonNullNonEmpty = function(t) {
	return its.isDefined(t) && t != null && t != ""
}, its.isFunction = function(t) {
	return typeof t == "function"
}, its.isNumber = function(t) {
	return typeof t == "number"
}, its.isString = function(t) {
	return typeof t == "string" || t instanceof String
}, its.isElement = function(t) {
	return t && t.nodeType == 1
}, its.isArray = function(t) {
	return t && t.constructor === Array
}, its.toArray = function(t) {
	var n = [];
	if (its.isDefinedNonNull(t.length)) for (var r = 0;
	r < t.length;
	r++) n[r] = t[r];
	return n
}, its.toBoolean = function(t) {
	return t ? t == "0" || t == "false" ? !1 : !0 : !1
}, its.isEmpty = function(t) {
	var n = !0;
	if (its.isDefinedNonNull(t)) if (its.isString(t) && t != "") n = !1;
	else if (its.isArray(t) && t.length > 0) n = !1;
	else for (var r in t) if (t.hasOwnProperty(r)) {
		n = !1;
		break
	}
	return n
}, its.contains = function(t, n) {
	var r = !1;
	return its.isDefinedNonNull(t) && its.isDefinedNonNull(n) && (its.isString(t) && its.isString(n) && t.indexOf(n) != -1 || its.isArray(t) && t.indexOf(n) != -1 || its.isDefinedNonNull(t[n])) && (r = !0), r
}, its.webkitVersion = function() {
	var t = navigator.userAgent,
		n = /AppleWebKit\/([\d.]+)/,
		r = n.exec(t),
		i;
	if (r) i = r[1];
	else {
		var s = /^iTunes\/10\.4 \(Windows;.+AppleWebKit\/$/;
		s.exec(t) ? i = "533.21.1" : (window.console && console.warn("Unable to determine WebKit version from user agent: " + t), i = "0")
	}
	return i
}, its.webkitVersionCompare = function(t, n) {
	var r = 0,
		i = 0,
		s = t.split("."),
		o = n.split(".");
	while ((s[i] || o[i]) && r == 0) {
		var u = s[i] ? its.string.toInt(s[i]) : 0,
			a = o[i] ? its.string.toInt(o[i]) : 0;
		u < a ? r = -1 : u > a && (r = 1), i++
	}
	return r
}, its.poseAs = function(e, t, n) {
	var r = e[t];
	e[t] = function() {
		var e = [r, arguments];
		return n.apply(this, e)
	}
}, its.emptyFunction = function() {}, window.its.element || (window.its.element = {}), its.element.createDocumentFragmentFromString = function(t) {
	var n = document.createElement("div");
	n.innerHTML = t;
	var r = n.children,
		i = document.createDocumentFragment(),
		s = r.length;
	for (var o = 0;
	o < s;
	o++) i.appendChild(r[0]);
	return i
}, its.element.createElementFromString = function(t) {
	var n = its.element.createDocumentFragmentFromString(t),
		r = n.childNodes;
	return r.length > 0 ? (r.length > 1 && window.console && console.warn("its.element.createElementFromString: multiple elements were created, but only the first will be returned"), r[0]) : null
}, its.element.setAttributes = function(t, n) {
	if (n) for (var r in n) n.hasOwnProperty(r) && t.setAttribute(r, n[r])
}, its.element.getScrollTop = function(e) {
	return e == window ? window.scrollY : e.scrollTop
}, its.element.getScrollLeft = function(e) {
	return e == window ? window.scrollX : e.scrollLeft
}, its.element.getClientHeight = function(e) {
	return e == window ? window.innerHeight : e.clientHeight
}, its.element.getClientWidth = function(e) {
	return e == window ? window.innerWidth : e.clientWidth
}, its.element.getScrollHeight = function(e) {
	return e == window ? window.pageYOffset : e.scrollHeight
}, its.element.getScrollWidth = function(e) {
	return e == window ? window.pageXOffset : e.scrollWidth
}, its.element.getOffsetHeight = function(e) {
	return e == window ? document.body.offsetHeight : e.offsetHeight
}, its.element.getOffsetWidth = function(e) {
	return e == window ? document.body.offsetWidth : e.offsetWidth
}, window.its.geometry || (window.its.geometry = {}), its.geometry.doesRectIntersectRect = function(t, n) {
	var r = !0;
	return t.right < n.left ? r = !1 : t.left > n.right ? r = !1 : t.bottom < n.top ? r = !1 : t.top > n.bottom && (r = !1), r
}, its.geometry.Orientation = {
	VERTICAL: 1,
	HORIZONTAL: 2
}, window.its.array || (window.its.array = {}), its.array.arrayOfPrimitivesAsSet = function(t) {
	if (t == null) return null;
	var n = {};
	for (var r = 0;
	r < t.length;
	r++) {
		var i = t[r];
		switch (typeof i) {
		case "boolean":
		case "number":
		case "string":
			n[i] = !0;
			break;
		default:
			throw "its.array.asSet: array contains non primitive element"
		}
	}
	return n
}, its.array.pushAll = function(t, n) {
	t.push.apply(t, n)
}, its.array.insertArray = function(e, t, n, r) {
	var i = e[n];
	return e[n] = "temp", e[n] = i, r && e.splice(n, t.length), e.splice.apply(e, [n, 0].concat(t)), e
}, window.its.string || (window.its.string = {}), its.string.startsWith = function(t, n, r) {
	var i = !1;
	return t && n && (t = t.substr(0, n.length), r && (t = t.toLowerCase(), n = n.toLowerCase()), i = t.indexOf(n) === 0), i
}, its.string.endsWith = function(t, n, r) {
	var i = !1;
	if (t) {
		r && (t = t.toLowerCase(), n = n.toLowerCase());
		var s = t.length - n.length;
		i = s >= 0 && t.lastIndexOf(n) === s
	}
	return i
}, its.string.pad = function(t, n, r) {
	var i = t += "";
	r = r || "0";
	if (i.length < n) {
		var s = n - i.length,
			o = [];
		for (var u = s;
		u > 0;
		u--) o.push(r);
		i = o.join("") + i
	}
	return i
}, its.string.replaceAll = function(t, n, r, i) {
	n = n.replace(/([.?*+^$[\]\\(){}-])/g, "\\$1");
	var s = "g";
	i && (s += "i");
	var o = new RegExp(n, s);
	return t.replace(o, r)
}, its.string.whitespace = "	\n\f\r Â â€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šã€€\u2028\u2029â€‹", its.string._whitespaceTrimStartRegex = new RegExp("^[" + its.string.whitespace + "]+"), its.string._whitespaceTrimEndRegex = new RegExp("[" + its.string.whitespace + "]+$"), its.string.trim = function(t, n, r) {
	var i = null;
	if (t) if (!r && (!n || n == its.string.whitespace) && t.trim) i = t.trim();
	else {
		var s = null,
			o = null,
			u = null;
		its.isDefinedNonNull(n) ? (s = "[" + n + "]", o = new RegExp("^" + s + "+"), u = new RegExp(s + "+$")) : (s = its.string.whitespace, o = its.string._whitespaceTrimStartRegex, u = its.string._whitespaceTrimEndRegex);
		var a = t.replace(o, "");
		i = a.replace(u, "")
	}
	return i
}, its.string.splitTrimmed = function(t, n, r) {
	var i = t.split(n);
	if (i) for (var s = 0;
	s < i.length;
	s++) i[s] = its.string.trim(i[s], r);
	return i
}, its.string._xmlEscapeMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;"
}, its.string.xmlEscape = function(e) {
	var t = e;
	if (typeof t != "undefined" && t != null) {
		typeof t != "string" && (t = t.toString());
		var n = its.string._xmlEscapeMap;
		t = t.replace(/[&<>"']/g, function(e) {
			return n[e]
		})
	}
	return t
}, its.string.xmlUnescape = function(t) {
	return t.replace(/&apos;/g, String.fromCharCode(39))
		.replace(/&quot;/g, '"')
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&")
}, its.string.htmlUnescape = function(t) {
	var n = document.createElement("textarea");
	n.innerHTML = t.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
	var r = n.value;
	return n.remove(), r
}, its.string.urlDecode = function(t) {
	var n = t;
	return t && (n = t.replace(/\+/g, " "), n = decodeURIComponent(n)), n
};
var _dateExpression = new RegExp("^([0-9]{4}/[0-9]{2}/[0-9]{2})/(.*)");
its.string.compare = function(t, n, r, i) {
	var s = null,
		o = 1;
	r && (o = -1);
	var u = _dateExpression.exec(t),
		a = _dateExpression.exec(n);
	u && a && (u[1] == a[1] ? (t = u[2], n = a[2]) : (s = u[1] > a[1] ? 1 : -1, i && (o = -1)));
	if (!s) {
		var f = parseFloat(t),
			l = parseFloat(n);
		if (!isNaN(f) && !isNaN(l) && f != l) s = f - l;
		else {
			var c = t.toLowerCase(),
				h = n.toLowerCase();
			if (c < h) s = -1;
			else if (c > h) s = 1;
			else {
				s = 0;
				for (var p = 0; !s && p < t.length;
				p++) {
					var d = t.charAt(p),
						v = n.charAt(p);
					d < v ? s = 1 : d > v && (s = -1)
				}
			}
		}
	}
	return s *= o, s
}, its.string.compareNumerically = function(e, t) {
	if (!e && !t) return 0;
	if (!e) return -1;
	if (!t) return 1;
	var n = "0123456789",
		r = 0,
		i = 0;
	while (r < e.length || i < t.length) {
		var s = e[r],
			o = t[i];
		if (!o) return 1;
		if (!s) return -1;
		var u = n.indexOf(s) >= 0,
			a = n.indexOf(o) >= 0;
		if (u && a) {
			var f = its.string._getNumberFromBeginningOfString(e, r),
				l = its.string._getNumberFromBeginningOfString(t, i);
			if (parseInt(f, 10) < parseInt(l, 10)) return -1;
			if (parseInt(f, 10) > parseInt(l, 10)) return 1;
			r += f.length, i += l.length
		} else {
			if (s < o) return -1;
			if (s > o) return 1;
			r++, i++
		}
	}
	return 0
}, its.string._getNumberFromBeginningOfString = function(e, t) {
	var n = "0123456789";
	for (var r = t;
	r < e.length;
	r++) if (n.indexOf(e[r]) < 0) break;
	return e.substring(t, r)
}, its.string.toInt = function(t) {
	return parseInt(t, 10)
}, its.string.isJson = function(t) {
	var n = !1;
	if (!its.isEmpty(t)) {
		var r = t.replace(/\\./g, "@")
			.replace(/"[^"\\\n\r]*"/g, "");
		n = /^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(r)
	}
	return n
}, its.string.evalJson = function itsStringEvalJson(aString) {
	try {
		if (its.string.isJson(aString)) return eval("(" + aString + ")")
	} catch (e) {}
	throw new SyntaxError("Badly formed JSON string: " + aString)
}, its.string.allAlphaNumerics = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", its.string.randomAlphaNumericString = function(t) {
	var n = "";
	for (var r = 0;
	r < t;
	r++) n += its.string.allAlphaNumerics[Math.floor(its.string.allAlphaNumerics.length * Math.random())];
	return n
}, its.string.generateUuid = function(t, n) {
	var r = null,
		i = (new Date)
			.getTime() + "";
	n || (n = 6), t || (t = i.length + n);
	if (n > t) throw new Error("its.string.generateUuid cannot generate a string with more random numbers than the max requested string length");
	var s = t - n;
	return s < i.length && (i = i.substring(i.length - s)), r = i + its.string.randomAlphaNumericString(n), r
}, its.string.UUIDv4 = function b(e) {
	return e ? (e ^ Math.random() * 16 >> e / 4)
		.toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
		.replace(/[018]/g, b)
}, its.string.unstringify = function(t) {
	var n = t;
	return n == "false" ? n = !1 : n == "true" ? n = !0 : /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/.test(n) && (isFinite(parsedNumber = parseFloat(n)) ? n = parsedNumber : isFinite(parsedNumber = parseInt(n, 10)) && (n = parsedNumber)), n
}, window.its.reflect || (window.its.reflect = {}), its.reflect.keys = function keys(e) {
	var keys = [];
	for (var t in e) e.hasOwnProperty(t) && !its.isFunction(e[t]) && keys.push(t);
	return keys
}, its.reflect.hasAnyKeys = function(t) {
	for (var n in t) if (t.hasOwnProperty(n)) return !0
}, its.reflect.hasAnyNonNullKeys = function(t) {
	for (var n in t) if (t.hasOwnProperty(n) && t[n]) return !0
}, its.reflect.values = function values(e) {
	var values = [];
	for (var t in e) {
		var n = e[t];
		e.hasOwnProperty(t) && !its.isFunction(n) && values.push(n)
	}
	return values
}, its.reflect.methods = function methods(e) {
	var methods = [];
	for (var t in e) {
		var n = e[t];
		e.hasOwnProperty(t) && its.isFunction(n) && methods.push(n)
	}
	return methods
}, its.reflect.copyKeysAndValues = function(t, n) {
	for (var r in t) {
		var i = t[r];
		t.hasOwnProperty(r) && !its.isFunction(i) && (n[r] = i)
	}
}, its.reflect.invert = function(e) {
	var t = {};
	for (var n in e) e.hasOwnProperty(n) && !its.isFunction(e[n]) && (t[e[n]] = n);
	return t
}, window.its.url || (window.its.url = {}), its.url.parentDomainWithNumComponents = function(t, n) {
	var r = t;
	if (t && t != "") {
		var i = t.split("."),
			s = i.length;
		if (s >= n) {
			r = "";
			while (n) r += i[s - n], n--, n && (r += ".")
		}
	}
	return r
}, its.url.queryParamsDict = function(t) {
	var n = null,
		r = null;
	if (!t) r = window.location.search;
	else {
		var i = t.indexOf("?");
		i >= 0 && (r = t.substring(i))
	}
	return r ? n = its.url.parseQueryParams(r) : n = {}, n
}, its.url.queryParamValue = function(t, n) {
	var r = its.url.queryParamsDict(n);
	return r[t]
}, its.url.parseQueryParams = function(t, n) {
	var r = {};
	if (t != null && t.length > 0) {
		t.charAt(0) === "?" && (t = t.substr(1));
		var i = t.indexOf("#");
		i !== -1 && (t = t.substr(0, i));
		var s = t.split("&");
		for (var o = 0;
		o < s.length;
		o++) {
			var u = s[o].split("=");
			if (u.length == 2) {
				var a = u[1];
				n || (a = its.string.urlDecode(a)), r[u[0]] = a
			}
		}
	}
	return r
}, its.url.parseHashAnchorParams = function(t) {
	var n = {};
	t || (t = window.location.hash);
	if (t != null && t.length > 0) {
		t.charAt(0) === "#" && (t = t.substr(1));
		var r = t.split(";");
		for (var i = 0;
		i < r.length;
		i++) {
			var s = r[i].split("=");
			if (s.length == 2) {
				var o = its.string.urlDecode(s[1]);
				n[s[0]] = o
			} else n[r[i]] = ""
		}
	}
	return n
}, its.url.parseHostname = function(t) {
	var n = "";
	if (t) {
		t = t.toString();
		if (t && t.indexOf("://") > 0) {
			var r = t.indexOf("://") + 3,
				i = t.indexOf("/", r);
			i === -1 && (i = t.length), n = t.substring(r, i)
		}
	}
	return n
}, its.url.finalPathComponent = function(t) {
	var n = "";
	if (t) {
		t = t.toString();
		if (t && t != "") {
			var r = t.lastIndexOf("/");
			if (r == t.length - 1 && r > 0) var r = t.lastIndexOf(r - 1);
			r != t.length - 1 && (n = t.substring(r + 1)), (r = n.lastIndexOf("/")) != -1 && (n = n.substring(0, r)), (r = n.lastIndexOf("?")) != -1 && (n = n.substring(0, r))
		}
	}
	return n
}, its.url.buildUrlFromMap = function(e) {
	var t = [];
	for (var n in e) if (e.hasOwnProperty(n)) {
		var r = e[n];
		typeof r != "undefined" && r != null && t.push(n + "=" + encodeURIComponent(r))
	}
	return t.join("&")
}, its.url.appendUrlParameter = function(t, n, r) {
	var i = {};
	return i[n] = r, its.url.appendUrlParameters(t, i)
}, its.url.appendUrlParameters = function(t, n) {
	if (!n) return t;
	var r = its.url.buildUrlFromMap(n);
	return its.url.appendUrlParametersString(t, r)
}, its.url.appendUrlParametersString = function(t, n) {
	if (!n) return t;
	var r = t.indexOf("?") === -1 ? "?" : "&";
	return t += r + n, t
}, its.url.baseUrl = function(t) {
	var n = t.indexOf("?");
	if (n === -1) {
		n = t.indexOf("#");
		if (n === -1) return t
	}
	return t.substring(0, n)
}, its.url.originalLocationQueryParams = its.url.queryParamsDict(), its.url.originalLocationHashAnchorParams = its.url.parseHashAnchorParams(), its.url.formRedirect = function(t, n, r) {
	var i = document.createElement("form");
	i.method = r ? "post" : "get", i.target = t, i.action = n, document.body.appendChild(i), i.submit()
}, its.url.openExternalUrl = function(t, n) {
	var r = document.createElement("a");
	r.setAttribute("href", t), n == "main" ? r.setAttribute("target", n) : r.setAttribute("target", "_blank");
	var i = document.createEvent("MouseEvents");
	i.initMouseEvent("click", !0, !0, document.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), r.dispatchEvent(i)
}, window.its.cookies || (window.its.cookies = {}), its.cookies.EXPIRE_NOW = -1, its.cookies.EXPIRE_SESSION = null, its.cookies.EXPIRE_ONE_SECOND = 1, its.cookies.EXPIRE_ONE_MINUTE = its.cookies.EXPIRE_ONE_SECOND * 60, its.cookies.EXPIRE_ONE_HOUR = its.cookies.EXPIRE_ONE_MINUTE * 60, its.cookies.EXPIRE_ONE_DAY = its.cookies.EXPIRE_ONE_HOUR * 24, its.cookies.EXPIRE_ONE_WEEK = its.cookies.EXPIRE_ONE_DAY * 7, its.cookies.EXPIRE_ONE_MONTH = its.cookies.EXPIRE_ONE_DAY * 31, its.cookies.EXPIRE_ONE_YEAR = its.cookies.EXPIRE_ONE_DAY * 365, its.cookies.EXPIRE_ONE_SIDEREAL_YEAR = its.cookies.EXPIRE_ONE_DAY * 365.25, its.cookies.EXPIRE_SIX_MONTHS = its.cookies.EXPIRE_ONE_DAY * 180, its.cookies.set = function(t, n, r, i, s) {
	return n && (n = escape(n)), its.cookies.setUnescaped(t, n, r, i, s)
}, its.cookies.get = function(t) {
	var n = its.cookies.getUnescaped(t);
	return n && (n = unescape(n)), n
}, its.cookies.setUnescaped = function(t, n, r, i, s) {
	var o = "",
		u = "";
	if (r) {
		var a = new Date;
		a.setTime(a.getTime() + r * 1e3), o = a.toUTCString()
	}
	i || (i = "/"), s && (u = " domain=" + s);
	var f = t + "=" + n + "; expires=" + o + "; path=" + i + ";" + u;
	its.cookies._debugAndUnitTestLastRawSetCookieString = f;
	var l = r == void 0 || r == its.cookies.EXPIRE_SESSION || r == 0,
		c = "sf6" in its && "Platform" in its.sf6 && its.sf6.Platform.device();
	if (c && (l || r < 0)) {
		var h = document.cookie = f;
		if (l) return h
	}
	return its.cookies._setRaw(f)
}, its.cookies.getUnescaped = function(t) {
	var n = its.cookies._debugAndUnitTestCookieGetterWithRawCookieStringOverride || its.cookies._getRaw();
	if (n && t) {
		its.cookies._debugAndUnitTestCookieGetterWithRawCookieStringOverride = null;
		var r = n.split(";"),
			i = null;
		for (var s = r.length - 1; !i && s >= 0;
		s--) {
			var o = r[s],
				u = o.indexOf("=");
			if (u > 0) if (u + 1 == o.length) i = "";
			else {
				var a = its.string.trim(o.substring(0, u));
				a == t && (its.cookies._debugAndUnitTestLastRawGetCookieString = o, i = its.string.trim(o.substring(u + 1)))
			}
		}
	}
	return i
}, its.cookies.remove = function(t, n) {
	return its.cookies.setUnescaped(t, "", its.cookies.EXPIRE_NOW, null, n)
}, its.cookies._cookieOwner = "iTunes" in window && "cookie" in iTunes ? "iTunes" : "document", its.cookies._setRaw = function(e) {
	return window[this._cookieOwner].cookie = e
}, its.cookies._getRaw = function() {
	return window[this._cookieOwner].cookie || ""
}, typeof iTSLocalization == "undefined" && (iTSLocalization = new Object), iTSLocalization._lookup = function(e) {
	var t = iTSLocalization._strings;
	for (var n in t) if (t.hasOwnProperty(n)) {
		var r = t[n];
		if (r.hasOwnProperty(e)) return r[e]
	}
}, iTSLocalization.hasLocalizedValue = function(t) {
	var n = iTSLocalization._lookup(t);
	return its.isDefined(n)
}, iTSLocalization.localize = function(e, t) {
	var n = iTSLocalization._lookup(e);
	return typeof n == "undefined" && (n = e), t && (n = iTSLocalization.replaceTokens(n, t)), n
}, iTSLocalization._lookup("_showLocKeys") && (iTSLocalization.localize = function(e) {
	return "+" + e + "+"
}), its.loc = iTSLocalization.localize, iTSLocalization.localizeWithParameter = function(t, n, r) {
	var i = {};
	return i[n] = r, iTSLocalization.localize(t, i)
}, its.locWithParam = iTSLocalization.localizeWithParameter, its.locWithCount = function(e, t, n) {
	return e === 1 ? its.loc(t) : its.loc(n, {
		count: e
	})
}, iTSLocalization.replaceTokens = function(t, n) {
	if (n) for (var r in n) if (n.hasOwnProperty(r)) {
		var i = "@@" + r + "@@";
		t = t.replace(new RegExp(i, "g"), n[r])
	}
	return t
}, iTSLocalization.localizedResourceUrlForPathKey = function(t, n) {
	n === undefined && (n = /https:/.test(window.location.protocol));
	var r = n ? "https://s.mzstatic.com" : "http://r.mzstatic.com";
	return r + iTSLocalization.localize(t)
}, its.formatNumber = function(e, t) {
	if (typeof iTSLocalization.decimalSeparator == "undefined") {
		var n = iTSLocalization._lookup("_decimalSeparator");
		typeof n == "undefined" && (n = "."), iTSLocalization.decimalSeparator = n, n = iTSLocalization._lookup("_thousandsSeparator"), typeof n == "undefined" && (n = ","), iTSLocalization.thousandsSeparator = n
	}
	var r = !0;
	t && t.hasOwnProperty("useGrouping") && (r = t.useGrouping);
	var i = e.toString()
		.split(".");
	if (r) {
		var s = iTSLocalization.thousandsSeparator,
			o = i[0].split("");
		for (var u = o.length - 3;
		u > 0;
		u -= 3) o.splice(u, 0, s);
		i[0] = o.join("")
	}
	var a = i.join(iTSLocalization.decimalSeparator);
	return a
}, its.isXMLResponse = function(e) {
	return e && its.string.startsWith(e.getResponseHeader("content-type"), "text/xml")
}, its.notifications = {
	_listeners: {},
	subscribe: function(e, t) {
		var n = this._listeners[e];
		n || (this._listeners[e] = n = []), n.push(t)
	},
	unsubscribe: function(e, t) {
		var n = this._listeners[e];
		if (!n) return;
		var r = n.indexOf(t);
		r >= 0 && n.splice(r, 1)
	},
	publish: function(e, t) {
		this._sendNotification(this._listeners[e], t)
	},
	remove: function(e) {
		var t = this._listeners[e];
		if (!t) return;
		delete this._listeners[e]
	},
	hasListeners: function(e) {
		return this._listeners[e] ? !0 : !1
	},
	_sendNotification: function(e, t) {
		if (!e) return;
		for (var n = 0, r = e.length;
		n < r;
		n++) e[n] && e[n](t)
	}
}, its.plistDictGetValue = function(t, n) {
	if (!t) return;
	var r = t.childNodes.length,
		i = null;
	for (var s = 0;
	s < r;
	s++) {
		var o = t.childNodes[s];
		if (o.nodeType === Node.ELEMENT_NODE) {
			if (i) return o.nodeName === "array" || o.nodeName === "dict" ? o : o.textContent;
			o.nodeName === "key" && o.textContent === n && (i = o)
		}
	}
}, its.plistDictRemoveValue = function(t, n) {
	if (!t) return;
	var r = t.childNodes.length,
		i = null,
		s = null;
	for (var o = 0;
	o < r;
	o++) {
		var u = t.childNodes[o];
		if (u.nodeType === Node.ELEMENT_NODE) {
			if (i) {
				s = u;
				break
			}
			u.nodeName === "key" && u.textContent === n && (i = u)
		}
	}
	i && s && (t.removeChild(i), t.removeChild(s))
};
var _dataCache = {};
its.property = function(e, t) {
	var n = its.dataOverride(e);
	return n == undefined && window.its && window.its.serverData && window.its.serverData.properties && (n = window.its.serverData.properties[e]), !t && its.isDefined(e) && its.isDefined(n) && (_dataCache[e] = n), n
},
its.pageData = function(e, t) {
	return its.dataValue(e, !0, t)
},
its.dataOverride = function(e) {
	var t = its.url.originalLocationQueryParams[e];
	return t == undefined && (t = its.string.unstringify(sessionStorage[e])), t == undefined && (t = its.string.unstringify(localStorage[e])), t == undefined && (t = window[e]), t == undefined && window.its && (t = window.its[e]), t
},
its.dataValue = function(e, t, n) {
	var r, i = e.split(".");
	t && (r = its.dataOverride(i[i.length - 1]));
	if (r == undefined) {
		var s = window;
		for (var o = 0;
		s && o < i.length;
		o++) {
			var u = i[o];
			o != 0 && u == window && (s = s[u])
		}
		s && s != window && (r = s)
	}
	return !n && its.isDefined(e) && its.isDefined(r) && (_dataCache[e] = r), r
},
its.setProperty = function(e, t, n) {
	its.setDataValue(e, t, n)
},
its.setPageData = function(e, t, n) {
	its.setDataValue(e, t, n)
},
its.setDataValue = function(e, t, n) {
	var r = null;
	if (e) {
		its.removeProperty(e);
		var i = null;
		n ? i = localStorage : i = sessionStorage, i[e] = t, r = i[e]
	} else console.log("Invalid key. Usage: setProperty(key, value, usePermanentStorage)");
	return r
},
its.removeProperty = function(e) {
	return sessionStorage.removeItem(e), localStorage.removeItem(e), e
}