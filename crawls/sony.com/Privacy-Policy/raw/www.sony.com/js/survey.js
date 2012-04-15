function checkCookie(href, whichSurvey, USpercent, ROWpercent) {	
	var whichSurvey, USpercent, ROWpercent;
	var rnd = Math.floor(Math.random() * 100);
	
	/***********************************************************
		Which regions should the survey should be offered to? 
	************************************************************/
	// United States
	var bSurveyUS = true;
	// Rest of World (ROW)
	var bSurveyROW = true;
	/***********************************************************
		End of region configuration
	************************************************************/
	
	if (bSurveyUS || bSurveyROW) {
		// make sure we're offering the survey to some portion			
		if(getCookie('SCA') == "true") {		
			//found the survey cookie, so redirect user to the original URL they clicked
			window.location = href;			
		} else if(getCookie('SCA') != "true") {			
			
			if(getCookie('sony_cc') == "US" && rnd <= USpercent) {
				// no survey cookie found, so drop it
				setCookie('SCA', "true", "14");
				
				// user is from US & they meet the percentage
				if(bSurveyUS) {
					//we're surveying US users, so present the survey
					document.location = '/research/index.shtml?href=' + href + '&surveyURL=' + whichSurvey;
				} else {
					// not surveying US users, so send them to the original URL requested
					window.location = href;
				};
			} else if (getCookie('sony_cc') != "US" && rnd <= ROWpercent) {
				// no survey cookie found, so drop it
				setCookie('SCA', "true", "14");
				
				// user is from outside US & they meet the percentage
				if(bSurveyROW) {
					//we're surveying ROW users, so present the survey
					document.location = '/research/index_intl.shtml?href=' + href + '&surveyURL=' + whichSurvey;
				} else {
					// not surveying ROW users, so send them to the original URL requested
					window.location = href;
				};
			} else {
				// no match, so send them to the original URL requested
				window.location = href;
			};
		} else {
			// no survey regions active (US or ROW) so send them to original URL requested
			window.location = href;
		};
	};
};

function setCookie(NameOfCookie, value, expiredays) {
	var ExpireDate = new Date ();
	ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));
	document.cookie = NameOfCookie + "=" + escape(value) +
	((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}


function getCookie(NameOfCookie) {
	if (document.cookie.length > 0)	{
		begin = document.cookie.indexOf(NameOfCookie+"=");
		
		if (begin != -1) {
			begin += NameOfCookie.length+1;
			end = document.cookie.indexOf(";", begin);
			
			if (end == -1) {
				end = document.cookie.length;			
			};
			return unescape(document.cookie.substring(begin, end)); 
		}		
	}
	return null;
}