		 
		function readCookie(cookieName) {
			 var theCookie=""+document.cookie;
			 var ind=theCookie.indexOf(cookieName);
			 if (ind==-1 || cookieName=="") return ""; 
			 var ind1=theCookie.indexOf(';',ind);
			 if (ind1==-1) ind1=theCookie.length; 
			 return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
			}
			

	
function setCookie(name,value,seconds,domain) {
    var expires = '';
    if (domain == null) {
        domain = cookieDomain();
    }
    if (seconds != 0) {
        var date = new Date();
        date.setTime(date.getTime() + seconds*1000);
        expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + escape(value) + expires + '; path=/; domain=.' + domain; 
}
	

    function getCookies() {
    var hash = new Array;
    if (document.cookie != null) {
        var a = document.cookie.split('; ');
        for (var i=0; i < a.length; i++) {
            var nv = a[i].split('=');
            if (nv[1] != null) {
                hash[nv[0]] = unescape(nv[1]);
            }
        }
    }
    return hash;
}

    function deleteCookie(name) {
        setCookie(name, 'x', -1);
    }
    function cookieDomain() {
        var d;
        var parts = window.location.hostname.split('.');
        if (parts[parts.length-1].length == 2) {
            // Domains like cnn.co.jp should retain 3 parts
            d = parts[parts.length-3] + '.' +
                parts[parts.length-2] + '.' +
                parts[parts.length-1];
        }
        else {
            // Other domains like cnn.com should retain 2 parts
            d = parts[parts.length-2] + '.' +
            parts[parts.length-1];
        }
        return d;
    }

// detect login state
/// Dash board functionality
loginStatus = new Object();

var hostUrl = "http://www.cartoonnetwork.com";

loginStatus.init=function(){ 

	this.textcolor = "000000";
	this.linkcolor = "0000ff";
	this.linkrollcolor = "0000ff";
	this.fbgcolor = "ffffff";
	this.COOKIE_DOMAIN="cartoonnetwork.com";
	this.COOKIE_STATIC=" expires=Sunday, 21-Mar-2020 23:59:59 GMT;";
	this.COOKIE_DELETE=" expires=Fri, 02-Jan-1970 00:00:00 GMT;";
	this.lHref = window.location.href;
	
	if(this.isLoggedIn()){
		this.fvUsername = this.getCookie("dname");
		this.fvLoggedin = "true";
	}else{
		this.fvUsername = "null";
		this.fvLoggedin = "null";
	}
	
}

/// ----- cookie code -----------
loginStatus.getPropVal=function(sString,sProp,cDelim,cEnd){
	var match = (sString == null) ? null : sString.match(sProp + cDelim + "[^" +cEnd + "]*");
	return (match == null) ? null :match[0].split(cDelim)[1];
}
loginStatus.getCookie=function(sCookie){
	return this.getPropVal(document.cookie,sCookie,"=",";");
}
loginStatus.setCookie=function(sCookieName, sVal, sCookieType){
	sCookieType = (sCookieType == null) ? "" : sCookieType;
	document.cookie = sCookieName+"="+sVal+ ";" + sCookieType+" path=/; domain=."+this.COOKIE_DOMAIN;
}
loginStatus.deleteCookie=function(sCookieName){
	this.setCookie(sCookieName, "", this.COOKIE_DELETE);
}

/// ------- various functions --------------
loginStatus.isLoggedIn=function(){
	return (this.getCookie("authid") != null); 
}
loginStatus.logOut=function(){ 
	this.deleteCookie("authid");
	this.deleteCookie("authpass");
	this.deleteCookie("displayname");
	this.deleteCookie("LiSESSIONID");
	this.deleteCookie("dname");

	if(this.lHref.indexOf("cartoonnetwork")!= -1 || this.lHref.indexOf("cartoonnetwork")!= -1 || this.lHref.indexOf("audience.cartoonnetwork")!= -1 || this.lHref.indexOf("aud-ite.cartoonnetwork")!= -1 || this.lHref.indexOf("otis.turner")!= -1 || this.lHref.indexOf("redesign.cartoonnetwork")!= -1){
		window.location.reload();
	}else{
		window.location.reload();
	}

}









loginStatus.init(); 