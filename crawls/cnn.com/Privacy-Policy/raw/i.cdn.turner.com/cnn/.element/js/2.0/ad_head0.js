function CNN_getCookies() {
	var hash = new Array;
	if ( document.cookie ) {
		var cookies = document.cookie.split( '; ' );
		for ( var i = 0; i < cookies.length; i++ ) {
			var namevaluePairs = cookies[i].split( '=' );
			hash[namevaluePairs[0]] = unescape( namevaluePairs[1] ) || null;
		}
	}
	return hash;
}

function CNN_parseCookieData( cookieDataString ) {
	var cookieValues = new Object();
	var separatePairs = cookieDataString.split( '&' );
	for ( var i = 0; i < separatePairs.length; i++  ) {
		var separateValues = separatePairs[i].split( ':' );
		cookieValues[separateValues[0]] = separateValues[1] || null;
	}
	return cookieValues;
}

// default values
var adHeadOffset = 0;
var adHeadClass = "us.low";

var allCookies = CNN_getCookies();
var adHeadCookie = allCookies[ "Target" ] || null;
var isClassAndOffsetValid = false;
var alreadySwappedTargetImage = false;
var alreadySwappedCookieCrumb = false;

if ( adHeadCookie ) {	// got milk?
	var adHeadHash = CNN_parseCookieData( adHeadCookie );
	//alert("o=" +  adHeadHash[ "o" ] + "\nclass=" + adHeadHash[ "class"]);
	if ( adHeadHash[ "o" ] && adHeadHash[ "class" ] ) {
		var validClassesAndOffsets = [ 'us.low', 0, 'us.high', 1, 'intl', 2, 'intl', 3, 'us.edu', 0, 'us.gov', 0, 'us.mil', 0, 'us.org', 0 ];
		for ( var i = 0; i < validClassesAndOffsets.length; i+=2 ) {
			if ( validClassesAndOffsets[i] == adHeadHash[ "class" ] && validClassesAndOffsets[i+1] == adHeadHash[ "o" ] ) {
				isClassAndOffsetValid = true;
				break;
			}
		}
	}
	if ( isClassAndOffsetValid ) {
		adHeadOffset = adHeadHash[ "o" ];
		adHeadClass = adHeadHash[ "class" ];
	}
}

function getCookieCrumb( imageRef ) {
	var cnnCookie = allCookies[ "CNNid" ];
	if ( cnnCookie && cnnCookie.charAt( 0 ) === 'G' ) {
		// it's all good, you already got a cookie
	} else if ( !alreadySwappedCookieCrumb ) {
		imageRef.src = "http://cnn.dyn.cnn.com/cookie.crumb";
		alreadySwappedCookieCrumb = true;
	}
}

document.adoffset = adHeadOffset;

//alert( "GLOBAL\nalreadySwappedTargetImage=" + alreadySwappedTargetImage + "\nisClassAndOffsetValid=" + isClassAndOffsetValid );

function getAdHeadCookie( imageRef ) {
	//alert( "isClassAndOffsetValid=" + isClassAndOffsetValid + "\nadHeadOffset=" + adHeadOffset + "\nadHeadClass=" + adHeadClass);
	var newSrc = "http://cnn.dyn.cnn.com/1.gif?" + new Date().getTime();
	if ( !alreadySwappedTargetImage && !isClassAndOffsetValid && (typeof WM_browserAcceptsCookies != "undefined") && WM_browserAcceptsCookies() ) {
		//alert( "getAdHeadCookie\nalreadySwappedTargetImage=" + alreadySwappedTargetImage + "\nisClassAndOffsetValid=" + isClassAndOffsetValid );
		imageRef.src = newSrc;
		alreadySwappedTargetImage = true;
	}
}

var alreadySwappedDETargetImage = false;
var cnnDEadDEonCookie = false;
var cnnU_Country = '';
var cnnAdDE_UVal = 'R00';

function WM_readCookie( name ) {
	if ( document.cookie == '' ) { // there's no cookie, so go no further
	    return false;
	} else { // there is a cookie
	    var firstChar, lastChar;
		var theBigCookie = document.cookie;
		firstChar = theBigCookie.indexOf(name);	// find the start of 'name'
		var NN2Hack = firstChar + name.length;
		if ( (firstChar != -1) && (theBigCookie.charAt(NN2Hack) == '=') ) { // if you found the cookie
			firstChar += name.length + 1; // skip 'name' and '='
			lastChar = theBigCookie.indexOf(';', firstChar); // Find the end of the value string (i.e. the next ';').
			if (lastChar == -1) lastChar = theBigCookie.length;
			return unescape( theBigCookie.substring(firstChar, lastChar) );
		} else { // If there was no cookie of that name, return false.
			return false;
		}
	}	
} // WM_readCookie

function getDEAdHeadCookie( imageRef ) {
	//if (typeof(WM_readCookie) != "undefined") {
		cnnDEadDEonCookie = allCookies['adDEon'];
	//}
	var newSrc = "http://gdyn.cnn.com/1.1/1.gif?" + new Date().getTime();
	if ( !alreadySwappedDETargetImage && !cnnDEadDEonCookie) {
		imageRef.src = newSrc;
		alreadySwappedDETargetImage = true;
	}
	//else if((alreadySwappedDETargetImage || WM_readCookie('adDEmas')) && !cnnUserEd_Pref) {

		//if(WM_readCookie('adDEmas')) { cnnU_Country = WM_readCookie('adDEmas').split('&')[0]; }

		//if(cnnU_Country && (cnnU_Country != cnnAdDE_UVal) && (cnnU_Country != '-')) {
			//CNN_setCookie('SelectedEdition', 'edition', 854400, '/', '.cnn.com');
		//}
		//else {
			//CNN_setCookie('SelectedEdition', 'www', 854400, '/', '.cnn.com');
		//}
		
	//}

}
