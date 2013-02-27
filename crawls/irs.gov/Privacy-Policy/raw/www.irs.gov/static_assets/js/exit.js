var sites = [
"http://10.0.1.16/",
"http://10.0.1.16:443/",
"http://172.18.8.38/",
"http://172.19.8.38/",
"http://216.12.134.199/",
"http://apps.irs.gov/",
"hhtp://apps.irs.gov.edgesuite-staging.net/",
"http://apps2.irs.gov/",
"http://apps3.irs.gov/",
"http://cms.portal.irs.gov/",
"http://eforms.irs.gov/",
"http://faqs.irs.gov/",
"http://faqs.qai.irs.gov/",
"http://fire.irs.gov/",
"http://forms.irs.gov/",
"http://irs.treasury.gov/",
"http://jobs.irs.gov/",
"http://preview.portal.irs.gov/",
"http://prdpreviewvip.portal.local/",
"http://sa.www4.irs.gov/",
"http://www.addthis.com/",
"http://www.egov.gov/",
"http://www.egrants.irs.gov/",
"http://www.irs.gov/",
"http://www.irs.gov.edgesuite-staging.net/",
"http://www.irs.treasury.gov/",
"http://www.irs.ustreas.gov/",
"http://www.procurement.irs.treas.gov/",
"http://www.search.irs.gov/",
"http://www.stayexempt.irs.gov/",
"http://www.treas.gov/",
"http://www.ustreas.gov/",
"https://excise.irs.gov/",
"https://forms.irs.gov/",
"https://la.www4.irs.gov/",
"https://la1.www4.irs.gov/",
"https://la2.www4.irs.gov/",
"https://rpr.irs.gov/",
"https://sa.www4.irs.gov/",
"https://sa1.www4.irs.gov/",
"https://sa2.www4.irs.gov/",
"http://search.irs.gov/",
"http://search.irs.gov.edgesuite-staging.net/",
"http://server.iad.liveperson.net/",
"https://state-excise.irs.gov/",
"https://forms-uat.irs.gov.edgekey-staging.net/",
"http://forms-uat.irs.gov.edgekey-staging.net/" ];

var existTestSites = false;

jQuery(function ($) {
		
	var languageParam = getLanguageParam();
	appendTestSites();
	
	$("a").attr("href", function(index) {
		
	    var thisUrl = this.href;
	    if (!thisUrl) {
	    	return;
	    }
	    
	    var isValidSite = false;
	    var thisUrlSiteIndex = thisUrl.indexOf("/", 8);
	
	    if (thisUrlSiteIndex > -1) {
	    		    	
	    	for (siteIndex in sites) {
	    		var thisUrlSite = thisUrl.substr(0, thisUrlSiteIndex + 1);
	    		var site = sites[siteIndex];
				
	    		if (site.toString().toLowerCase() == thisUrlSite.toLowerCase()) {
	    			isValidSite = true;
	    			break;
	    		}
	    	}	    
	    } else {
	    	var thisUrlMailToIndex = thisUrl.toLowerCase().indexOf("mailto:");
	    	
	    	if (thisUrlMailToIndex > -1) {
	    		isValidSite = true;
	    	}
	    }
	    
	    if (!isValidSite) {
	    	this.href = "http://apps.irs.gov/app/scripts/exit.jsp?" + languageParam + "dest=" + thisUrl;
	    }
	});
});

function getLanguageParam() {
	var metaData = document.getElementsByTagName("meta");
	
	for (var i in metaData) {
		if (metaData[i].name == "language" && metaData[i].content == "es") {
			return "lang=es&";
		}
	}
	
	return "";
}

function appendTestSites() {
	if (existTestSites == false && typeof testSites != 'undefined') {
		existTestSites = true;
		sites = testSites.concat(sites);
	}
}