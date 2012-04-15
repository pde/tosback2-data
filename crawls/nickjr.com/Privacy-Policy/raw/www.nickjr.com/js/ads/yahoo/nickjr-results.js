$(document).bind("content_match_loaded.", function(response) {
	//KIDS.utils.doLog("Content Match Loaded: " + response.type);
	displaySponsoredLinks(response.ads, "content-match", 0, 3, false);
	KIDS.ads.yahoo.initContentMatchUrls();
});

$(document).bind("link_spots_loaded.", function(response) {
	// suppressing content match until search goes live.
	//return; //not suppressed with comment

	//KIDS.utils.doLog("Link Spots Loaded: " + response.type);
	$("#link-spots").html(getHtmlLinkspots(response.ads, 0, 4, false));
	KIDS.ads.yahoo.initLinkSpotsUrls();
});