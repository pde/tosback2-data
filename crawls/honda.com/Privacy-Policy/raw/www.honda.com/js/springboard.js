function springBoard(oTag,sLinkIdentifier,sAltText) {
    alert("use of depricated springBoardMethod.  Please log an issue with the step to reproduce.");
    springBoard2009(sLinkIdentifier,sAltText);
}
function springBoard2009(sLinkIdentifier,sTrackingText) {	
	// OMT Call
	//var s=s_gi(s_account);
	var sLinkName = "";
	
	// Sample Values
	// --------
	//s.prop26="HOME"
    //s.prop27="DEFAULT"
    //s.channel="PORTAL"
    //s.pageName = "PORTAL HOME";

    //alert(sLinkIdentifier);
	
	if(sLinkIdentifier==="brand_division") {
		sLinkName =  "EXIT LINK FROM TOP NAV TO "+sTrackingText.toUpperCase();
	}

	if(sLinkIdentifier==="products") {
		sLinkName =  "EXIT LINK FROM PRODUCTS SECTION TO "+sTrackingText;
	}
	
	if(sLinkIdentifier==="services") {
		sLinkName =  "EXIT LINK FROM SERVICES SECTION TO "+sTrackingText;
	}
	if(sLinkIdentifier==="dealerlocator") {
		sLinkName =  "EXIT LINK FROM LOCATE A DEALER POP UP TO "+sTrackingText;
	}
	if(sLinkIdentifier==="bodyshoplocator") {
		sLinkName =  "EXIT LINK FROM LOCATE A BODY SHOP POP UP TO "+sTrackingText;
	}
	if(sLinkIdentifier==="inspiration") {
		sLinkName =  "EXIT LINK FROM INSPIRATION SECTION TO "+sTrackingText;
	}
	if(sLinkIdentifier==="about" && sTrackingText.toLowerCase()!="donottrack") {
		sLinkName =  "EXIT LINK FROM ABOUT SECTION TO "+sTrackingText;
	}
	if(sLinkIdentifier==="promotion") {
		sLinkName =  "EXIT LINK FROM HONDA NEWS SECTION TO "+sTrackingText;
	}
	if(sLinkIdentifier==="contact") {
		sLinkName =  "EXIT LINK FROM CONTACT US PAGE TO "+sTrackingText;
	}
	if(sLinkIdentifier==="search") {
		sLinkName =  "EXIT LINK FROM SEARCH RESULTS TO "+sTrackingText;
	}
	if(sLinkIdentifier==="sitemap") {
		sLinkName =  "EXIT LINK FROM SITE MAP PAGE TO "+sTrackingText;
	}
	 
	sLinkName = sLinkName.toUpperCase();

	if(sLinkName) {
	    sLinkName = s.channel+":"+s.prop26+":"+s.prop27+":"+sLinkName
		s.linkTrackVars = "prop26,prop27,prop37,eVar26,eVar27";
		s.tl(true,'E',sLinkName);
		//alert(s_account);
	}
	
	
	return true;
}

function springBoardBanners(sLinkIdentifier,sTrackingText) {	

    sLinkName =  "EXIT LINK FROM "+sLinkIdentifier+" BANNER TO "+sTrackingText;
	
	sLinkName = sLinkName.toUpperCase();

	if(sLinkName) {
	    sLinkName = s.channel+":"+s.prop26+":"+s.prop27+":"+sLinkName
		s.linkTrackVars = "prop26,prop27,prop37,eVar26,eVar27";
		s.tl(true,'E',sLinkName);
		//alert(s_account);
	}

}