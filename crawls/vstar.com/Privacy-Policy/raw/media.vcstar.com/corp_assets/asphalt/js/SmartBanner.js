

var SmartBannersDetect = { };

// If the user agent is WebKit, returns true. Otherwise, returns false.
SmartBannersDetect.isWebKit = function isWebKit()
{
    return RegExp(" AppleWebKit/").test(navigator.userAgent);
}

SmartBannersDetect.isMobile = function isMobile()
{
    return SmartBannersDetect.isWebKit() && RegExp(" Mobile/").test(navigator.userAgent);
}

SmartBannersDetect.mobileDevice = function mobileDevice()
{
    if (!SmartBannersDetect.isMobile())
        return null;
        
    var fields = RegExp("(Mozilla/5.0 \\()([^;]+)").exec(navigator.userAgent);
    if (!fields || fields.length < 3)
        return null;
    return fields[2];
}

SmartBannersDetect.mobileOS = function mobileOS() {
	
	var ua = navigator.userAgent;
	var uaindex;
	
	var os = undefined;
	 if ( ua.match(/iPad/i) || ua.match(/iPhone/i) || ua.match(/iPod/i) ) {
		os = 'iOS';
	 } else if ( ua.match(/Android/i) ) {
		os = 'Android'
	} else {
		os = undefined;
	}
	
	return os;
}

SmartBannersDetect.OSVersion = function getOSVersion() {
	
	var ua = navigator.userAgent;
	var os = SmartBannersDetect.mobileOS();
	var osversion = undefined;
	if (os == undefined) return undefined;
	
	if (os == 'iOS') {
		var uaindex  = ua.indexOf('OS ');
		if (uaindex > -1) {
			osversion = ua.substr( uaindex + 3, 3 ).replace( '_', '.' );
		}
		
	} else if (os == 'Android') {
		var uaindex = ua.indexOf( 'Android ' );
		if (uaindex > -1) {
			osversion = ua.substr( uaindex + 8, 3 );
		}
	}

	return osversion;
}

SmartBannersDetect.writeMetaTags = function writeMetaTags(iPhoneAppId, iPadAppId, androidAppId) {
	
	if (!SmartBannersDetect.isMobile()) return; // Nothing to see here
	
	var mobileOs = SmartBannersDetect.mobileOS();
	var metaTag = undefined;
	if (mobileOs == 'Android' && androidAppId != undefined) {
		metaTag = '<meta name="google-play-app" content="app-id=' + androidAppId + '">';
	} else if (mobileOs == 'iOS') {
		
		var device = SmartBannersDetect.mobileDevice();
		var osVersion = SmartBannersDetect.mobileOS();
		
		if (device == 'iPad' && iPadAppId != undefined) {
			metaTag = '<meta name="apple-itunes-app" content="app-id=' + iPadAppId + '">';
		} else {
			metaTag = '<meta name="apple-itunes-app" content="app-id=' + iPhoneAppId + '">';
		}
	}
	
	if (metaTag != undefined) {
		document.write(metaTag);
	}
}
