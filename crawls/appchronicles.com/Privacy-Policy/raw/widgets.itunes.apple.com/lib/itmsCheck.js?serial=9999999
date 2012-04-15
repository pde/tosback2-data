//
// iTunes Client Detection code
//
// THIS FILE IS NO LONGER USED AS OF 4D AND WILL BE DELETED.
// IT'S FUNCTIONALITY HAS MOVED TO itunesdetect.js
//

var BROWSER_SAFARI = 1;
var BROWSER_FIREFOX = 2;
var BROWSER_INTERNET_EXPLORER = 3;
var BROWSER_CHROME = 4;
var BROWSER_OTHER = 5;

var EFFICIENT_AFFILIATE_COOKIE_KEY = "a";
var ITUNES_INSTALLED_COOKIE_NAME="iTunesPresent";

function iTunesDetected() {
  return (its.cookies.get(ITUNES_INSTALLED_COOKIE_NAME)                                          // if we've already figured out that iTunes is present, rely on that data:
      || (navigator.userAgent.indexOf("Macintosh") != -1)                                        // or if we're on a Mac
      || ((detectedBrowser() == BROWSER_INTERNET_EXPLORER) && iTunesActiveXComponentInstalled()) // or IE with iTunes ActiveX
      || ((detectedBrowser() == BROWSER_FIREFOX) && iTunesMozillaPluginDetected()));             // or FireFox with iTunes pluging
}

function detectedBrowser() {
  if (-1 != navigator.userAgent.indexOf("Chrome")) return BROWSER_CHROME;
  if (-1 != navigator.userAgent.indexOf("AppleWebKit")) return BROWSER_SAFARI;
  if (-1 != navigator.userAgent.indexOf("Firefox")) return BROWSER_FIREFOX;
  if (-1 != navigator.userAgent.indexOf("MSIE ")) return BROWSER_INTERNET_EXPLORER;
  else return BROWSER_OTHER;
}

/**
 * We interpret the presence of the iTunes ActiveX Component to mean that iTunes itself has been installed.
 * @return true if the iTunes ActiveX Component was successfully loaded.
 */
function iTunesActiveXComponentInstalled() {
  var detectObj = document.getElementById('iTunesDetectorIE');
  var returnVal = false; // If we can't load the ActiveX control, assume we do not have ITMS

  if ((detectObj != null) && (typeof(detectObj) != "undefined")) {
    if (typeof(detectObj.IsITMSHandlerAvailable) != "undefined") {
      returnVal = detectObj.IsITMSHandlerAvailable;
      dbg(typeof(detectObj.IsITMSHandlerAvailable));
    }

    if ((returnVal == null) || (typeof (returnVal) == "undefined")) returnVal = false;
  }
  dbg("ActiveX Control result: " + returnVal);
  return returnVal;
}

/**
 * We interpret the presence of the iTunes Firefox plugin to mean that iTunes itself has been installed.
 * @return true if the iTunes Firefox plugin was successfully loaded.
 */
function iTunesMozillaPluginDetected() {
  var result = false;
  if (navigator.plugins && navigator.plugins.length > 0) {
    for (var i=0; i < navigator.plugins.length; i++ ) {
      var plugin = navigator.plugins[i];
      var pluginName = plugin.name;
      if (pluginName.indexOf("iTunes Application Detector") > -1) { result = true }
    }
  }
  info("FF plugin detected: " + result);
  return result;
}

/**
 * This is the main entry point from WebObjects code.  See MHBrowserRedirect.java
 *
 * @param url the url to open if iTunes is installed
 * @param downloadUrl the url to go to to download iTunes
 * @param overridePanelId the id to unhide if the browser is firefox/opera.
 * @param noClose if true, don't close the browser window after opening iTunes.
 */
function itmsOpen(url, downloadUrl, overridePanelId, noClose){
    url = url.replace(/^http/, "itms");
    // remove the trailing anchor indicator if necessary
    var hashIndex = url.indexOf("#");
    if (hashIndex > -1) {
        url = url.substring(0, hashIndex)
    }
    var affCookie = its.cookies.get(EFFICIENT_AFFILIATE_COOKIE_KEY); // <rdar://problem/7174153>
    if (affCookie) {
        var separator = (url.indexOf("?") === -1) ? "?" : "&";
        var qpValue = encodeURIComponent(affCookie);
        // <rdar://problem/7366555> SEO: IE mangles referrer string
        // <rdar://problem/8145509> Invalid characters appearing in affiliate tokens
        if (BROWSER_INTERNET_EXPLORER == detectedBrowser())
            qpValue = encodeURIComponent(qpValue); // encode again if IE
        url += separator + "affC=" + qpValue;
    }

    info("Trying to open " + url);

    var b = detectedBrowser();

    if (iTunesDetected()) {
        its.cookies.set(ITUNES_INSTALLED_COOKIE_NAME, true, 20 * its.cookies.EXPIRE_ONE_YEAR);
        if (BROWSER_CHROME == b) {
            // Chrome converts + to %2B. We are going to sanitize this by converting + to %20
            url = url.replace(/\+/g, "%20");
        }
        // we can't set window.location.href directly because the current page will not
        // be rendered (at least in Safari 416.12).  The odd thing is that even a window.alert()
        // hides this bug, if it is a bug.
        // [2009-08 mjm: not sure this still applies, but it shouldn't hurt]
        setTimeout(function(){
            window.location.href = url;
        }, 1);
    } else {
        if (BROWSER_INTERNET_EXPLORER == b || BROWSER_FIREFOX == b || BROWSER_SAFARI == b) {
            // take IE users straight to the download page because we're sure they don't
            // have iTunes installed (they would have had the ActiveX component show up)
            window.location.replace(downloadUrl);
        } else { // for all other browsers, let the user tell us if iTunes is installed:
            document.getElementById(overridePanelId).style.display = 'block';
        }
    }
    return false;
}


/***********   THE FOLLOWING METHODS ARE FROM its-base-util.js AND ARE COPIED HERE ONLY SO THIS FILE CAN BE SELF-SUFFICIENT ***********/

if (!window['its']) { window['its'] = {}; }

/**
 * Returns true if the specified obj is not undefined
 * NOTE: Does not work for global variables (because the variable gets defined by virtue of passing it in)... use "typeof()" directly
 */
its.isDefined = function isDefined(anObject) {
  return typeof(anObject) != 'undefined';
};

/**
 * Returns true if the specified obj is not undefined and not null
 * NOTE: Does not work for global variables... in that case, use "typeof()" directly, because the act of passing them to here will make them appear to be defined
 */
its.isDefinedNonNull = function isDefinedNonNull(anObject) {
  return (its.isDefined(anObject) && (anObject != null));
};

if (!window.its['string']) { window.its['string'] = {}; }


its.string.whitespace = "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u3000\u2028\u2029\u200B";
its.string._whitespaceTrimStartRegex = new RegExp('^['+its.string.whitespace+']+'); // No need to create a new one of these objects on each call!
its.string._whitespaceTrimEndRegex = new RegExp('['+its.string.whitespace+']+$'); // No need to create a new one of these objects on each call!
its.string.trim = function itsStringTrim(baseString, charString, forceNonNativeTrim) {
    var returnValue = null;
    
    if (baseString) {
        if (!forceNonNativeTrim && (!charString || (charString == its.string.whitespace)) && baseString.trim){
            // Use browser-built-in trim, if it exists...
            returnValue = baseString.trim();
        } else {
            var trimChars = null;
            var startRegex = null;
            var endRegex = null;
            
            if (its.isDefinedNonNull(charString)) {
                trimChars = "[" + charString + "]";
                startRegex = new RegExp('^' + trimChars + '+');
                endRegex = new RegExp(trimChars + '+$');
            }
            else {
                trimChars = its.string.whitespace;
                startRegex = its.string._whitespaceTrimStartRegex;
                endRegex = its.string._whitespaceTrimEndRegex;
            }
            var str = baseString.replace(startRegex, '');
            returnValue = str.replace(endRegex, '');
        }
    }
    return returnValue;
};

if (!window.its['cookies']) { window.its['cookies'] = {}; }

its.cookies.EXPIRE_NOW = -1;
its.cookies.EXPIRE_ONE_SECOND = 1;
its.cookies.EXPIRE_ONE_MINUTE = its.cookies.EXPIRE_ONE_SECOND * 60;
its.cookies.EXPIRE_ONE_HOUR = its.cookies.EXPIRE_ONE_MINUTE * 60;
its.cookies.EXPIRE_ONE_DAY = its.cookies.EXPIRE_ONE_HOUR * 24;
its.cookies.EXPIRE_ONE_WEEK = its.cookies.EXPIRE_ONE_DAY * 7;
its.cookies.EXPIRE_ONE_MONTH = its.cookies.EXPIRE_ONE_DAY * 31;
its.cookies.EXPIRE_ONE_YEAR = its.cookies.EXPIRE_ONE_DAY * 365;
its.cookies.EXPIRE_ONE_SIDEREAL_YEAR = its.cookies.EXPIRE_ONE_DAY * 365.25; // (31556926279 or so)... For those who want decades long accuracy :-( ... of course we could also make special day times since a day is really 24 hours and 2 milliseconds long :-)

its.cookies.set = function itsCookiesSet(cookieName, cookieValue, lifespanInSeconds, path, domain) {
    if (cookieValue) cookieValue = escape(cookieValue);
    return its.cookies.setUnescaped(cookieName,cookieValue,lifespanInSeconds,path,domain);
};


its.cookies.get = function itsCookiesGet(cookieName) {
    var returnValue = its.cookies.getUnescaped(cookieName);
    if (returnValue) returnValue = unescape(returnValue);
    return returnValue;
};

its.cookies.setUnescaped = function itsCookiesSetUnescaped(cookieName, cookieValue, lifespanInSeconds, path, domain) {
    // NOTE: IF YOU MODIFY THIS METHOD, COPY AND TEST THE MODIFICATION TO itmsCheck.js WHICH HAS A COPY/PASTED VERSION (SANS COMMENTS)
    var expireDate = "";
    var domainString = "";

    if (lifespanInSeconds) {
        var expire = new Date();
        expire.setTime(expire.getTime() + (lifespanInSeconds * 1000));
        expireDate = expire.toUTCString();
    }
    if (!path)
        path = "/";
    if (domain)
        domainString = " domain=" + domain;
    var cookieString = cookieName + "=" + cookieValue + "; expires=" + expireDate + "; path=" + path + ";" + domainString;
    its.cookies._debugAndUnitTestLastRawSetCookieString = cookieString; // Used for debugging and unit tests
    document.cookie = cookieString;
};


its.cookies.getUnescaped = function itsCookiesGetUnescaped(cookieName) {
    if ((its.cookies._debugAndUnitTestCookieGetterWithRawCookieStringOverride || document.cookie) && cookieName) {
        var cookieString = its.cookies._debugAndUnitTestCookieGetterWithRawCookieStringOverride || document.cookie;
        its.cookies._debugAndUnitTestCookieGetterWithRawCookieStringOverride = null; // this is only valid for one call
        var cookies = cookieString.split(';');
        var result = null;

        for (var i = (cookies.length -1); !result && (i >= 0); i--) {
            var aCookie = cookies[i];
            var separatorIndex = aCookie.indexOf("=");

            if (separatorIndex > 0) {
                if (separatorIndex + 1 == aCookie.length) {
                    result = ""; // there *is* a cookie key, but there is nothing to the right of the "="
                }
                else {
                    // Trim all leading and trailing whitespace from key...
                    var cookieKey = its.string.trim(aCookie.substring(0, separatorIndex));

                    if (cookieKey == cookieName) {
                        its.cookies._debugAndUnitTestLastRawGetCookieString = aCookie; // Used for debugging and unit tests
                        // Trim all leading and trailing whitespace from the value as well, since there may be whitespace to the right of the "=" sign
                        result = its.string.trim(aCookie.substring(separatorIndex + 1));
                    }
                }
            }
        }
    }
    return result;
};

its.cookies.remove = function itsCookiesRemove(cookieName) {
    return its.cookies.setUnescaped(cookieName, "", its.cookies.EXPIRE_NOW);
};


function dbg(str) { /* try { return console.debug(str) } catch(e) { }; /**/ }

function info(str) { /* try { return console.info(str) } catch(e) { }; /**/ }

