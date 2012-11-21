// Helper function for adding time to the current date
var addTimeToDate = function(msec) {

    // Get the current date
    var exdate = new Date();

    // Add time to the date
    exdate.setTime(exdate.getTime() + msec);

    //Return the new Date
    return exdate;
};

// Helper function for getting a value from a parameter in the querystring
var getQueryValue = function(param) {

    if (!param) {
        return;
    }
    var querystring = document.location.search,
        queryStringArray = querystring && querystring.substring(1).split("&"),
        i = 0,
        length = queryStringArray.length;
    for (; i < length; i++) {
        var token = queryStringArray[i],
            firstPart = token && token.substring(0, token.indexOf("="));
        if (firstPart === param ) {
            return token.substring(token.indexOf("=") + 1, token.length);
        }
    }
};


redirection_param = "fs";
// value for the parameter passed in the URL to avoid the redirection
queryValue = getQueryValue(redirection_param),


// Expiry hours for cookie
cookie_hours = 1,


// Check if the UA is a mobile or tablet with width lessthan 1000
//isUAMobile = ((screen.width < 1000) && (navigator.userAgent.match(/iPad/i) == null))?"true":"false";
isUAMobile = navigator.userAgent.match(/(iPhone)|(iPod)|(android)|(webOS)/i) ? true: false;

// Check if the referrer was a mobile page (probably the user clicked "Go to full site") or in the
// querystring there is a parameter to avoid the redirection such as "?mobile_redirect=false"
// (in that case we need to set a variable in the sessionStorage or in the cookie)
if (document.referrer.indexOf("mobile") >= 0 || queryValue === "Y" ) {

    if (window.sessionStorage) {
        window.sessionStorage.setItem(redirection_param, true);
    } else {
        document.cookie = redirection_param + "=" + true + ";expires="+
            addTimeToDate(3600*1000*cookie_hours).toUTCString();
    }
}

// Check if the sessionStorage contain the parameter
var isSessionStorage = (window.sessionStorage) ?
    (window.sessionStorage.getItem(redirection_param) === "true") :
    false,

// Check if the Cookie has been set up
isCookieSet = document.cookie ?
    (document.cookie.indexOf(redirection_param) >= 0) :
    false;

// Check that User Agent is mobile, cookie is not set or value in the sessionStorage not present

if (isUAMobile && !(isCookieSet || isSessionStorage)) {
	var path = location.pathname.split("/");
	while(path.length && !path[0].length ) path.shift();
	var search = location.search;

    if (path.indexOf("index.cat") > -1) {
        path = ["mobile", "catalog", "browse.jsp"];
    } else if (path.indexOf("custserv.jsp") > -1) {
        path = ["mobile", "custserv" ,"custserv.jsp"];
    } else {
        path = ["mobile", "home.jsp"];
    }
	
	if(path[path.length-1].search(/\./) == -1){
		path.push("");
	}
	var m = "";
	location = location.protocol+"//"+m+location.host.replace("www.", "").replace("m.", "") +"/"+path.join("/")+search;
}
