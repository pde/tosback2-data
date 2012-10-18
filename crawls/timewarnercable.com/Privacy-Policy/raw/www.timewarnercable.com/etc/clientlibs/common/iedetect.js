// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
function getIEVersion() {
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer')	{

		// first look at document mode to discern what standard IE is going to use.
		rv = document.documentMode;
		/* as document mode is only in IE>=8, for older IEs or when document mode doesn't
		 * happen to be set yet, we need to fall back to using the User Agent. */
		if (rv == undefined || rv == 0) {
			// see http://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx#ParsingUA
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat(RegExp.$1);
		}
	}
	return rv;
}
// apply the version of IE to the html tag
function applyIEVersionToHTML() {
	var ieVer = getIEVersion();
	if (ieVer > -1) {
		// determine what to add - bottom out at 6
		var ieClass = "ie" + Math.max(Math.floor(ieVer), 6);
		// versions < 9 get the "oldie" look
		if (ieVer < 9)
			ieClass += " oldie";

		// now add it to the html tag
		document.getElementsByTagName("html")[0].className += " " + ieClass;
	}
}
applyIEVersionToHTML();
