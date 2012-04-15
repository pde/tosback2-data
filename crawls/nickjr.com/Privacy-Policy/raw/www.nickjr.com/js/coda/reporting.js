//handles firing of page load reporting which resides in codaReportingConfig.js file
//also gets ad config obj for page
try{
	KIDS.reporting.init();
	KIDS.reporting.firePageLoad();
	KIDS.ads.getAds();
}catch(e){KIDS.utils.doLog(e);}