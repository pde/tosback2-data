var version = "03";
var uid = usat.cookie.get("UID");
var zag = usat.cookie.get("zagCookie");
if (uid != null && zag == "1") {
	var rdb = usat.cookie.get("RDB");
	if (rdb == null || rdb.substr(44, 2) != version) {  // No RDB cookie or version is not current
		var gif = '<img  width="1" height="1" align="absmiddle" src="http://asp.usatoday.com/Registration/CAIP/caip.aspx'
			+ '?cachedefeat=' + (new Date()).getTime() + '">';
		document.write(gif);
	}
}

