///////////////////////////////////////////////////
// Author: Marcelo Melo                          //
// Date: Aug-04-2010                             //
// Description: Sets the Sabre Analytics Cookie. //
///////////////////////////////////////////////////

//Default settings for Sabre Analytics cookie
var saSourceParam = 'source';
var saSCParam = 'sc';
var saCJPrefix = 'cj';
var saCookieName = 'JetblueCJCookie';
var saPath = '/';
var saDomain = '.jetblue.com';
var saExpirationDate = new Date();
saExpirationDate.setDate(saExpirationDate.getDate() + 7);  // Expiration date will be 7 days after

// This next little bit of code tests whether the user accepts cookies.
var saAcceptsCookies = false;
if (document.cookie == '') {
    document.cookie = 'acceptsCookies=yes'; // Try to set a cookie.
    if (document.cookie.indexOf('acceptsCookies=yes') != -1) {
        saAcceptsCookies = true;
    }
}
else {
    saAcceptsCookies = true;
}

// Get 'source' URL parameter
var saSource = sa_GetUrlParam(saSourceParam);

// If 'source' parameter is received in the URL.
if (saSource != null && saSource.length > saCJPrefix.length) {
    // If source parameter is received in the url from CJ (ex. “&source=cj123456”), create CJ cookie.
    if (saSource.substring(0, saCJPrefix.length) == saCJPrefix)
        sa_SetCookie(saCookieName, saSource, saExpirationDate.toString(), saPath, saDomain);
    else // If source parameter is received in the url but not coming from CJ (ex. “&source=NexTag”), delete CJ cookie.
        sa_DeleteCookie(saCookieName, saPath, saDomain);
}
else {

    // Get 'sc' URL parameter
    var saSC = sa_GetUrlParam(saSCParam);

    // If sc parameter is received in the URL with a value of DIS (ex. “&sc=DIS” from doubleclick) or PPC (ex. “&sc=PPC” from RKG), delete CJ cookie.
    if (saSC == 'DIS' || saSC == 'PPC')
        sa_DeleteCookie(saCookieName, saPath, saDomain);
}

/////////////////////////////////////////////////////////////////
// Function: sa_GetUrlParam                                    //
// Description: Get the value of a URL Query String parameter. //
/////////////////////////////////////////////////////////////////
function sa_GetUrlParam(strParamName) {
    var strReturn = "";
    var strHref = window.location.href;
    if (strHref.indexOf("?") > -1) {
        var strQueryString = strHref.substr(strHref.indexOf("?"));
        var aQueryString = strQueryString.split("&");
        for (var iParam = 0; iParam < aQueryString.length; iParam++) {
            if (aQueryString[iParam].indexOf(strParamName + "=") > -1) {
                var aParam = aQueryString[iParam].split("=");
                strReturn = aParam[1];
                break;
            }
        }
    }
    return strReturn;
}

/////////////////////////////////////////////////////////////////
// Function: sa_SetCookie                                      //
// Description: Create a cookie.                               //
/////////////////////////////////////////////////////////////////
function sa_SetCookie(name, value, hours, path, domain, secure) {

    if (saAcceptsCookies) { 
        var not_NN2 = (navigator && navigator.appName &&
                   (navigator.appName == 'Netscape') &&
                   navigator.appVersion &&
                   (parseInt(navigator.appVersion) == 2)) ? false : true;

        if (hours && not_NN2) {
            if ((typeof (hours) == 'string') && Date.parse(hours))
                var numHours = hours;
            else if (typeof (hours) == 'number')
                var numHours = (new Date((new Date()).getTime() + hours * 3600000)).toGMTString();
        }
        document.cookie = name + '=' + escape(value) + ((numHours) ? (';expires=' + numHours) : '') + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure && (secure == true)) ? '; secure' : ''); // Set the cookie, adding any parameters that were specified.
    }
}

/////////////////////////////////////////////////////////////////
// Function: sa_GetCookie                                      //
// Description: Get the value of cookie.                       //
/////////////////////////////////////////////////////////////////
function sa_GetCookie(name) {
    if (document.cookie == '')
        return false;
    else {
        var firstChar, lastChar;
        var theBigCookie = document.cookie;
        firstChar = theBigCookie.indexOf(name);
        var NN2Hack = firstChar + name.length;
        if ((firstChar != -1) && (theBigCookie.charAt(NN2Hack) == '=')) {
            firstChar += name.length + 1;
            lastChar = theBigCookie.indexOf(';', firstChar);

            if (lastChar == -1)
                lastChar = theBigCookie.length;
            return unescape(theBigCookie.substring(firstChar, lastChar));
        }
        else
            return false;
    }
}

/////////////////////////////////////////////////////////////////
// Function: sa_DeleteCookie                                   //
// Description: Delete a cookie.                               //
/////////////////////////////////////////////////////////////////
function sa_DeleteCookie(name, path, domain) {
    var theValue = sa_GetCookie(name);
    if (theValue)
        document.cookie = name + '=' + theValue + '; expires=Fri, 13-Apr-1970 00:00:00 GMT' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : ''); // set an already-expired cookie
}
