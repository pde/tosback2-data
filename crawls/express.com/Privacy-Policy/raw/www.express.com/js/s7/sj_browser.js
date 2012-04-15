/*
ADOBE CONFIDENTIAL
Copyright 2005 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  All information contained herein is, and remains the property of Adobe Systems Incorporated and its suppliers,
if any.  The intellectual and technical concepts contained herein are proprietary to Adobe Systems Incorporated and its
suppliers and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or 
copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior 
written permission is obtained from Adobe Systems Incorporated.
*/

function SjDetectBrowser() {
   var ua = navigator.userAgent.toLowerCase(); 

   // browser engine name
   this.isGecko       = (ua.indexOf('gecko') != -1 && ua.indexOf('safari') == -1);
   this.isAppleWebKit = (ua.indexOf('applewebkit') != -1);

   // browser name
   this.isKonqueror   = (ua.indexOf('konqueror') != -1); 
   this.isWebTV       = (ua.indexOf('webtv') != -1); 
   this.isSafari      = (ua.indexOf('safari') != - 1);
   this.isOmniweb     = (ua.indexOf('omniweb') != - 1);
   this.isOpera       = (ua.indexOf('opera') != -1); 
   this.isIcab        = (ua.indexOf('icab') != -1); 
   this.isAol         = (ua.indexOf('aol') != -1); 
   this.isIE          = (ua.indexOf('msie') != -1 && !this.isOpera && (ua.indexOf('webtv') == -1) ); 
   this.isMozilla     = (this.isGecko && ua.indexOf('gecko/') + 14 == ua.length);
   this.isFirebird    = (ua.indexOf('firebird/') != -1);
   this.isNS          = ( (this.isGecko) ? (ua.indexOf('netscape') != -1) : 
                        ( (ua.indexOf('mozilla') != -1) && 
				!this.isOpera && 
				!this.isSafari && 
				(ua.indexOf('spoofer') == -1) 
				&& (ua.indexOf('compatible') == -1) 
				&& (ua.indexOf('webtv') == -1) 
				&& (ua.indexOf('hotjava') == -1) ) );
   
   // spoofing and compatible browsers
   this.isIECompatible = ( (ua.indexOf('msie') != -1) && !this.isIE);
   this.isNSCompatible = ( (ua.indexOf('mozilla') != -1) && !this.isNS && !this.isMozilla);
   
   // rendering engine versions
   this.geckoVersion = ( (this.isGecko) ? ua.substring( (ua.lastIndexOf('gecko/') + 6), (ua.lastIndexOf('gecko/') + 14) ) : -1 );
   this.equivalentMozilla = ( (this.isGecko) ? parseFloat( ua.substring( ua.indexOf('rv:') + 3 ) ) : -1 );
   this.appleWebKitVersion = ( (this.isAppleWebKit) ? parseFloat( ua.substring( ua.indexOf('applewebkit/') + 12) ) : -1 );
   
   // browser version
   this.versionMinor = parseFloat(navigator.appVersion); 
   
   // correct version number
   if (this.isGecko && !this.isMozilla) {
      this.versionMinor = parseFloat( ua.substring( ua.indexOf('/', ua.indexOf('gecko/') + 6) + 1 ) );
   }
   else if (this.isMozilla) {
      this.versionMinor = parseFloat( ua.substring( ua.indexOf('rv:') + 3 ) );
   }
   else if (this.isIE && this.versionMinor >= 4) {
      this.versionMinor = parseFloat( ua.substring( ua.indexOf('msie ') + 5 ) );
   }
   else if (this.isKonqueror) {
      this.versionMinor = parseFloat( ua.substring( ua.indexOf('konqueror/') + 10 ) );
   }
   else if (this.isSafari) {
      this.versionMinor = parseFloat( ua.substring( ua.lastIndexOf('safari/') + 7 ) );
   }
   else if (this.isOmniweb) {
      this.versionMinor = parseFloat( ua.substring( ua.lastIndexOf('omniweb/') + 8 ) );
   }
   else if (this.isOpera) {
      this.versionMinor = parseFloat( ua.substring( ua.indexOf('opera') + 6 ) );
   }
   else if (this.isIcab) {
      this.versionMinor = parseFloat( ua.substring( ua.indexOf('icab') + 5 ) );
   }
   
   this.versionMajor = parseInt(this.versionMinor); 
   
   // dom support
   this.isDOM1 = (document.getElementById);
   this.isDOM2Event = (document.addEventListener && document.removeEventListener);
   
   // css compatibility mode
   this.mode = document.compatMode ? document.compatMode : 'BackCompat';

   // platform
   this.isWin    = (ua.indexOf('win') != -1);
   this.isWin32  = (this.isWin && ( ua.indexOf('95') != -1 || ua.indexOf('98') != -1 || ua.indexOf('nt') != -1 || ua.indexOf('win32') != -1 || ua.indexOf('32bit') != -1 || ua.indexOf('xp') != -1) );
   this.isMac    = (ua.indexOf('mac') != -1);
   this.isUnix   = (ua.indexOf('unix') != -1 || ua.indexOf('sunos') != -1 || ua.indexOf('bsd') != -1 || ua.indexOf('x11') != -1)
   this.isLinux  = (ua.indexOf('linux') != -1);
   
   // specific browser shortcuts
   this.isNS4x = (this.isNS && this.versionMajor == 4);
   this.isNS40x = (this.isNS4x && this.versionMinor < 4.5);
   this.isNS47x = (this.isNS4x && this.versionMinor >= 4.7);
   this.isNS4up = (this.isNS && this.versionMinor >= 4);
   this.isNS6x = (this.isNS && this.versionMajor == 6);
   this.isNS6up = (this.isNS && this.versionMajor >= 6);
   this.isNS7x = (this.isNS && this.versionMajor == 7);
   this.isNS7up = (this.isNS && this.versionMajor >= 7);
   
   this.isIE4x = (this.isIE && this.versionMajor == 4);
   this.isIE4up = (this.isIE && this.versionMajor >= 4);
   this.isIE5x = (this.isIE && this.versionMajor == 5);
   this.isIE55 = (this.isIE && this.versionMinor == 5.5);
   this.isIE5up = (this.isIE && this.versionMajor >= 5);
   this.isIE6x = (this.isIE && this.versionMajor == 6);
   this.isIE6up = (this.isIE && this.versionMajor >= 6);
   
   this.isIE4xMac = (this.isIE4x && this.isMac);

   this.hasAll					= (document.all)		     ? true : false;	// document.all
   this.hasAnchors				= (document.anchors)		 ? true : false;	// document.anchors
   this.hasCookies				= (document.cookie)			 ? true : false;	// cookies enabled
   this.hasDocumentElement		= (document.documentElement) ? true : false;	// document.documentElement
   this.hasForms				= (document.forms)			 ? true : false;	// document.forms
   this.hasFrames	   			= (window.frames)			 ? true : false;	// window.frames
   this.hasGetElementById  		= (document.getElementById)	 ? true : false;	// document.getElementById
   this.hasGetElementsByTagName	= (document.getElementsByTagName) ? true : false;	// document.getElementsByTagName
   this.hasImages	   			= (document.images)			 ? true : false;	// document.images
   this.hasJava		   			= navigator.javaEnabled();						// Java enabled
   this.hasLayers	   			= (document.layers)			 ? true : false;	// document.layers
   this.hasLinks	   			= (document.links)		     ? true : false;	// document.links
   this.hasOption	   			= (window.Option)		     ? true : false;	// window.Option
   this.hasRegexp	   			= (window.RegExp)		     ? true : false;	// window.RegExp
   this.hasScreen	   			= (window.screen)		     ? true : false;	// window.screen
   
}

// utility function called by getCookie( )
SjDetectBrowser.prototype.getCookieVal=function(offset){
   var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}

SjDetectBrowser.prototype.fixCookieDate=function(date){
   var base=new Date(0);
   var skew=base.getTime();
   if(skew>0)date.setTime(date.getTime()-skew);
}

// primary function to retrieve cookie by name
SjDetectBrowser.prototype.getCookie=function(name){
  var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return this.getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break; 
    }
    return "";
}

// store cookie value with optional details as needed
SjDetectBrowser.prototype.setCookie=function (name,value,expires,path,domain,secure){
   document.cookie = name + "=" + escape (value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

// remove the cookie by setting ancient expiration date
SjDetectBrowser.prototype.deleteCookie=function (name,path,domain){
    if (this.getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

var sjIS = new SjDetectBrowser();
var sjDetectBrowserIncluded = true;
