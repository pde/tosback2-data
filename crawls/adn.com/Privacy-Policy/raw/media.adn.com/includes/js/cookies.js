//PULLS IN INSITE STUFF
//PULLS IN INSITE STUFF (unless this is a registration page)

/*var insite_host = window.location.hostname;
var insite_location = window.location.toString();

if ( 
		(!insite_location.match('registration.adn.com')) && 
		(insite_location != 'http://www.adn.com/')  &&
                (document.referrer.search(/yahoo.com/i) < 0) &&
		(insite_host.match('www.adn.com'))
	) {
		document.writeln('<script type="text/javascript" language="Javascript" src="http://registration.adn.com/static/insite52/insite_conf.js"></script>');
		document.writeln('<script type="text/javascript" language="Javascript" src="http://registration.adn.com/reg_js/verify_access.js"></script>');
}*/

// GENERIC COOKIE FUNCTIONS
function getCookieVal(offset) {
 var endstr=document.cookie.indexOf(";",offset);
 if (endstr==-1)
 endstr=document.cookie.length;
 return unescape(document.cookie.substring(offset,endstr));
}
function GetCookie(cname) {
 var arg=cname+"="; var alen=arg.length;
 var clen=document.cookie.length; var i=0;
 while (i<clen) {
        var j=i+alen;
        if (document.cookie.substring(i,j)==arg) return getCookieVal (j); i=document.cookie.indexOf("",i)+ 1;
        if (i==0) break;
 } return null;
}
function SaveCookie(cname,cvalue,cdays,cpath) {
        ex = new Date; ex.setTime(ex.getTime() + (cdays*86400000));
        if (cpath == null) { cpath = "/" } else { cpath = "; path=" + cpath }
        sitedom=location.hostname.replace(/www\./,"");
        document.cookie=cname + '=' + cvalue + '; expires=' + ex.toGMTString() + cpath + "; domain="+sitedom;
}


//Preloads the OAS_query var with InSite segments, preserving the query string if also present
if (GetCookie("segments")) {
	var OAS_query="segment=debugcookie&";
	var isegments = GetCookie("segments").split(" ");
	for (ss in isegments) { OAS_query+="segment="+isegments[ss]+"&"}
	if (location.search)  { OAS_query+="&"+location.search+"&"} 
}
else {
	var OAS_query="";
	OAS_query+="segment=debugnocookie&";
	if (location.search)  { OAS_query+="&"+location.search + "&" } 
}
