
!function($){
	var navTestGroup = 75;  // percent of users to include in test
	var callTnT = true;
	
	var navCookie = readCookie('dtvtopnav');

	if (navCookie == "old-hp" || navCookie == "old-dtv" || navCookie == "old-dtv-30") {
		callTnT = true;
	} else if (navCookie != null) {
		callTnT = false;
		return false;
	}

	/*
	// throttle cookie
	if (!$('body').hasClass('home-page')) {
		mboxCreate("topnav_throttle","entry=other");
	} else {
		mboxCreate("topnav_throttle","entry=home");
	}

	// if user not on home-page, set cookie to OLD
	if (!$('body').hasClass('home-page')) {
		setTopnavCookie('old-hp');
		callTnT = false;
	}
	*/
	
	if (callTnT) {
		// generating random number from 0-99.
		var iRandom = readCookie('JSESSIONID');
		if (iRandom != null) {
			iRandom = parseInt(iRandom.substr(-2,2));
		} else {
			iRandom = Math.floor(Math.random() * 100);
		}
		
		// decide whether in the threshold
		if (iRandom <= navTestGroup) {
			makeTnTCall();
		} else {
			setTopnavCookie('old-dtv-75');
		}
	}
	
}(jQuery);

function makeTnTCall() {
	//console.log("topnav: mbox called");
	if (typeof Dtv.Profile != "undefined") {			
		mboxCreate('topnav','type='+Dtv.Profile.type,'visit='+Dtv.Profile.visit,'profile.language='+Dtv.Profile.language,'profile.market='+Dtv.Profile.market,'profile.zip='+Dtv.Profile.zipCode);
	} else {
		mboxCreate("topnav");
	}
}

function setTopnavCookie(v){
	createCookie('dtvtopnav', v, 30);
	if (v == "new"){
		document.write('<link rel="stylesheet" type="text/css" href="/images/dlab/ab_test/topnav/topnav_throttle_redirect.css" media="all" />');
		Event.observe(window, 'load', function(){
			setTimeout(function(){location.reload();},500);
		});
	}
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	//document.cookie = name+"="+value+expires+"; path=/; domain=.directv.com";
	document.cookie = name+"="+value+expires+"; path=/";
}

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

function eraseCookie(name) {
	createCookie(name,"",-1);
}
