try{
    var pageTracker = _gat._getTracker(webPropertyId);
    pageTracker._setDomainName(getDomainForGA());
	pageTracker._setAllowHash(false);
    pageTracker._setAllowLinker(true);
/*Forcing campaign cookies to expire at a specific time
pageTracker._setCookieTimeout("seconds")*/
    pageTracker._trackPageview();
	pageTracker._trackPageLoadTime();
    var vptracker = pageTracker._createEventTracker("ValuePropositions");
}
catch (e) { }


function getDomainForGA() {
    var url = window.location.hostname;
    var urlparts = url.split('.');
    var i = urlparts.length;
    var domainName = "";
    if (i >= 2)
        domainName = "." + urlparts[i - 2] + "." + urlparts[i - 1];
    else
        domainName = ".progressive.com";

    return domainName;
}

function GA_Event(labelName) {
    if (typeof (labelName) != "string" || labelName.length < 1) return;
    var categoryName = "Static";
    var eventName = document.domain + window.location.pathname;
    if(typeof pageTracker == "object") {
        pageTracker._trackEvent(categoryName, eventName, labelName);
    }
}