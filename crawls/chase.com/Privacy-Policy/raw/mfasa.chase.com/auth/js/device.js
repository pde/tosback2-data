var movieLoadAttempt = 0;
var arcotIsInitDone = 0;
var flashObjVal;
var maxAttempt = 100;
var retryIntvl = 10;
var cName1;
var cValue1;
var callBackFunctionNameGlobal;

function setVariable(myVar){
	arcotIsInitDone = myVar;	
	return;
}

function getDocumentDomain() {
	try {	
		var d = document.domain;
		if (d.indexOf(".") > -1) {
			var end = d.substring(d.lastIndexOf("."), d.length);
			d = d.substring(0, d.lastIndexOf("."));
			d = d.substring(d.lastIndexOf(".") + 1, d.length);
			d = d + end;
		}
		return d;
	} catch(e) {
		return null;
	}
}

function getFlashMovieObject(movieName) {
	if (window.document[movieName])
		return window.document[movieName];
	if (navigator.appName.indexOf("Microsoft Internet")==-1) {
		if (document.embeds && document.embeds[movieName])
		  	return document.embeds[movieName];
	}
	else
		return document.getElementById(movieName);
}

function getFlashCookie(cookieName) {
	try {
		var cookiemanager = getFlashMovieObject("cookiemanager");
		cookiemanager.SetVariable("/_level0:CookieName", cookieName);
		cookiemanager.SetVariable("/_level0:call", "GetCookie");
		flashObjVal = cookiemanager.GetVariable("/_level0:CookieValue");
		return flashObjVal;
	} catch (e) {
		return null;
	}
}

function setFCookie(cookieName, cookieValue) {
	try {
		var cookiemanager = getFlashMovieObject("cookiemanager");
		cookiemanager.SetVariable("/_level0:CookieName", cookieName);
		cookiemanager.SetVariable("/_level0:CookieValue", cookieValue);
		cookiemanager.SetVariable("/_level0:call", "SetCookie");
		var scRes = cookiemanager.GetVariable("/_level0:setCookieRes");
		if(scRes=="false")
			return false;
		else if(scRes=="pending")
			return false;
		else if(scRes=="true")
			return true;
		else
			return false;
	} catch (e) {
		return false;
	}
}

function getDocumentCookie(name) {
	try {
		var dcookie = document.cookie;
		var cname = name + "=";
		var clen = dcookie.length;
		var cbegin = 0;
		var hasempty = 0;
		while(cbegin < clen) {
			var vbegin = cbegin + cname.length;
			if(dcookie.substring(cbegin, vbegin) == cname) {
				var vend = dcookie.indexOf(";", vbegin);
				if(vend == -1) vend = clen;
				if(vbegin == vend) ++hasempty;
				else return unescape(dcookie.substring(vbegin, vend));
			}
			cbegin = dcookie.indexOf(" ", cbegin) + 1;
			if(cbegin == 0) break;
		}
		if(hasempty > 0) return "";
		else return null;
	} catch(e) {
		return null;
	}
}

function deviceCookie() {
	return "adtoken";
}

function deviceSignature() {
	return jsonSignature();
}

function deviceId() {
	var cname = deviceCookie();
	var cvalue = getFlashCookie(cname);
	if (cvalue == null || cvalue == "" || cvalue == "undefined") cvalue = "";
	return cvalue;
}

function setDeviceId(did, callBackFunctionName) {
	try {
		var cname = deviceCookie();
		var cvalue = "";
		if (arcotIsInitDone != 1 && movieLoadAttempt < maxAttempt) {
			movieLoadAttempt++;
			var recall = function() { setDeviceId(did, callBackFunctionName); };
			setTimeout(recall, retryIntvl);
		}
		else if (arcotIsInitDone == 1) {
			if (cvalue == null || cvalue == "" || cvalue == "undefined") cvalue = getFlashCookie(cname);
			if (cvalue == null || cvalue == "" || cvalue == "undefined") cvalue = "";
			did.value = cvalue;
			callBackFunctionName();
		}
		else {
			if (cvalue == null || cvalue == "" || cvalue == "undefined") cvalue = "";
			did.value = cvalue;
			callBackFunctionName();
		}
		return;
	} catch(e) {
		cvalue = "";
		return;
	}
}

function setFlashCookie(cookieName,cookieValue) {
	setFlashCookie(cookieName, cookieValue, callBackFunctionDefault);
}

function setFlashCookie(cookieName,cookieValue, callBackFunctionName) { 
	cName1 = cookieName;
	cValue1 = cookieValue;
	callBackFunctionNameGlobal = callBackFunctionName;
	waitForMovieToLoad();
}

function waitForMovieToLoad() {
	if (arcotIsInitDone != 1 && movieLoadAttempt < maxAttempt) {
		movieLoadAttempt++;
		setTimeout("waitForMovieToLoad()", retryIntvl);
	}
	else if (arcotIsInitDone == 1) {
		setFCookie(cName1, cValue1);
		callBackFunctionNameGlobal();
	} 
	else
		callBackFunctionNameGlobal();
}

function callBackFunctionDefault() {}
