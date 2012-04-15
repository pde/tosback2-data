//handles firing of page load reporting which resides in codaReportingConfig.js file
//also gets ad config obj for page
try{
	KIDS.reporting.init();
	if($("title").html().indexOf("Error")<0&&$("title").html().indexOf("404")<0&&KIDS.get("uri").indexOf("error")<0) 
		if(KIDS.get("uri").indexOf("/2012/vote")<0) KIDS.reporting.firePageLoad();
	KIDS.ads.getAds();
}catch(e){KIDS.utils.doLog(e);}