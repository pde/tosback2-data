function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

var consentCookie = '2';
if(readCookie('notice_preferences')){
consentCookie = readCookie('notice_preferences').split(':');	
}

function tryConsent(){
if ( $("#consent a img").length > 0 ) {
truste.eu.clickListener();
}
else{setTimeout(tryConsent, 100);}	
}
