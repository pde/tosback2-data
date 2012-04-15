//Base url for content match. Each site has a different hostname (hostname + feedpath)
var g_baseOvertureCMUrl = "http://cm.nickjr.overture.com/js_flat_1_0/";

//source paramater for content match. Each site has its own source code (source)
var g_overtureCMSource = 'viacom_nickjr_ctxt';

//Config code for each site (config)
var g_overtureCMConfig = "4578258897";

//** Search IDs
//Base url for partner search. 
var g_baseOvertureSearchUrl = "http://xml.west.viacom.overture.com/d/search/p/viacom/js/v2/";

//partner paramater for search. 
var g_overtureSearchPartner = "viacom_nickjr_ls_search";

// linkspot search url
var linkspotSearchUrl = "http://"+ window.location.hostname +"/home/search.jhtml?ls=true&searchtype=sitewide&searchterm=";

//Base url for the linkspot feed. .This is the same for all sites.
var g_baseOvertureLinkspotUrl = "http://cmls.overture.com/ls_js_1_0/";

//default linkspot id.
var g_defaultLinkspotId = "nickjr_home";

//source paramater for linkspots.  Each site must configure its own.
var g_overtureLinkspotSource = 'viacom_nickjr_ls_kwonly_ctxt';

//Config code for each site.  Each site must configure its own.
var g_overtureLinkspotConfig = "4578258897";

var g_urlFilters = "viacom_master_teen_url";
var g_termFilters = "viacom_master_teen";

var g_bumperUrl = "/kids_common/bumpers/bumperFrameset.jhtml?wBumper=sponsor&advertiser=";

if (typeof g_enableBumpers == null) var g_enableBumpers = false;
var g_outputCharacterEncoding = "latin1";

//This is a mapping of urls to ctxtIds. IDs are to be provided by Yahoo
//pass this into the function getMappingValue to get the value based on the current url.
//order these with the most specific urls first
var g_contextIdMap = new Object();
g_contextIdMap["/games"] = "games";
g_contextIdMap["/shows"] = "shows";
g_contextIdMap["/"] = "general";

//Another map for type used the same way as g_contextIdMap
var g_typeIdMap = new Object();
g_typeIdMap["/shows"] = "shows";
g_typeIdMap["/games"] = "games";
g_typeIdMap["/"] = "general";

//This is a mapping of urls to linkspotIds. IDs are to be provided by Yahoo
var g_linkspotIdMap = new Object();
g_linkspotIdMap["/home"] = "nickjr_home";
g_linkspotIdMap["/food"] = "nickjr_recipes";
g_linkspotIdMap["/recipes"] = "nickjr_recipefinder";
g_linkspotIdMap["/"] = "nickjr_home";


//Default links to use in case we don't get results back.
var zSr_dummy = new Array("Reach 80% of active Internet users with Overture.",
	"","","List your site with Overture","http://www.overture.com/","",
	"See the latest Accord offers at the Honda Official Site.",	"",
	"http://ypn-100.overture.com/d/sr/?xargs=SjGTYHM2WSfAwg8ep-u2ASFl94ZiTOXSU7PrBi34b0dkMRpxIz_DgoDqDHPG_NIidq9XtjihuvhsnU-qzNGWIEpI0WYkcoPdGWF6vHcW_pmyJkWX7VREKmh2o6lFQdzPF1NYiCCDFPBMzTW1E9ywARKkbBHDxtdkScwJOM-imi-fb8Z061AriZIDa1EDdkfqf3QyaFsV2ZtTR7fzb3-6K7zuu9vXH0AppemWRteQ9SJW7Z1IuIHVxAIrOsp7BDr91kty-i4Ghjhbnh_NMBWcNKIHMwuOzg_br8ZdyL97n9w8jcEZNvfaURyWMRn97xi0YtD5kOy-QPA",
	"Honda Vehicles","www.honda.com", "", "Save up to 40% JVC, Pioneer, Clarion, Alpine, Kenwood.", "",
	"http://ypn-100.overture.com/d/sr/?xargs=k-vWdwvJp78awRZ3Qhx-bNIsqKMyFJwxG5e0pmbgOXJ8w7TZD_t_g3yvErHu8Xl4I3_x8ptDV3A0LIMF7OlPTj5IkMVeVfJ7YImiuZU1-p7rVyQOV4pyMgRkXrvbW_C6knIw1bUvr88gdVHsT-HA77YeNJVDGHkfjWgmNwyqxub9CYdDO8qHDr1b2pamYZbeIy8ZdhbSa1DvmkyROP-YJHS26-bDnYiyF5Aqyi-iI6d3UaXPeWNhzBfWVqBbIRd7wn767p7eqywIgT6oNriUfKJKA9YnOYxl9msgYv75FJF4Yrr5i8pEpPbf8orxrGg5OiPTaHCp4Qw",
	"Car Audio/Multimedia SALE", "carsaudio.co.uk", "", "Electronics, Games, Toys, Digital Cameras, and more.", "",
	"http://ypn-100.overture.com/d/sr/?xargs=cc9OZjd2BnLDSEYSO0xFQYOLbyfpbe27TqGUg90i-jKS-gcU8lXMkhuNGMm3DJcx2oriBHlOMItEsUbii_mZooTh1ploLYXV4BBkox4A4Qm4e-UnspwI6DfPw1Y_7s2sDBsD0wcAgFkwVB-VviXebuFDhuCZJseHhCWH6u2I3yH5D1X0OIGIQdhCQIYNL7WVQvzPz69wffyUTyqnItDPX1OFjCZ3Kqnwomn_TFmZeibU291SbvoyNP4mMKIn6VmD3D4rOoid-bTxDP63P19rs3ZAqnClMlJZXOimusbL77w3hK72W7aVtG2VBll-pXPpohzEDJ2nt8A",
	"Hundreds of Products at Low Prices", "www.advancedtechtoys.com", "");

//zSr is the array that is populated by the javacsript call to Overture
var zSr;

//mapkey is the variable yahoo fills in to provide linkspot data
var mapkey;

//dummy data for the mapkey.
var mapkey_dummy=[{title: 'placeholder', keywords: 'fitness equipment, fitness, diet program, weight loss program, home gyms, vitamin, exercise bike, nutrition, healthy diet, fitness program'}];


// legacy functions


//An example function for drawing a set of content match sponsored links with linksposts
function showCMWithLinkspots(linkData, startIndex, endIndex, linkspotData, rowIndex, maxLinks ) {
	if (startIndex == undefined) {
		startIndex = 0;
	}

	var links = linkData.getItems();
	var outString = "<table border=1 NOSHADE cellspacing=3 cellpadding=4  bgcolor=\"lightgrey\">";
	var arrLength = links.length;
	if(endIndex == undefined || endIndex == 0) {
		endIndex = arrLength;
	} else {
		if(endIndex > arrLength) {
			endIndex = arrLength;
		}
	}

	var emptyText = "<table border=1 NOSHADE><tr><td><b>doh! not links to show</b></td></tr></table>";
	if(endIndex <= startIndex) {
		//If there are not links to show, then return an alternative text
		return emptyText;
	}

	var i = startIndex;
	while(i < endIndex) {
		var currItem = links[i];
		outString += "<tr><td><a href=\"" + currItem.getClickUrl() + "\">" + currItem.getTitle() + "</a><br>" + currItem.getDescription() + "<br><a href=\"http://" + currItem.getSitehost() + "\">" + currItem.getSitehost() + "</a></td></tr>\n";
		i++;
	} 
	outString += "<tr><td>" + showLinkspotRow(linkspotData, rowIndex, maxLinks) + "</td></tr>\n";
	outString += "</table>";
	return outString;
}


//An example function for drawing one row of linkspots. pass in the linkData, index of the row you want
//(we will pretty much always be using index 0 for the first row), and the max number of link
//that we want to show.
function showLinkspotRow(linkData, rowIndex, maxLinks) {
	var linkspot = linkData.getItem(rowIndex);
	var outString = "<table width=100% border=0><tr>";
	var isEmpty = false;
	var keywords;

	if(linkspot == undefined) {
		isEmpty = true;
	} else {
		keywords = linkspot.getKeywords();
	}

	var len = keywords.length;

	if(len <= 0) {
		isEmpty = true;
	}

	var emptyText = "<table border=0><tr><td><b>doh! not link spots to show</b></td></tr></table>";
	if(isEmpty) {
		 //If there are not links to show, then return an alternative text
		 return emptyText;
	}

	var endIndex;
	if(len > maxLinks) {
		endIndex = maxLinks;
	} else {
		endIndex = len;
	}

	for(var i=0; i < endIndex; i++) {
		var keyword = keywords[i];
		outString += "<td><a href=\""+ linkspotSearchUrl + urlEncode(keyword) + "\">" + keyword + "</a></td>\n";
	} 
	outString += "</tr></table>";
	return outString;
}
