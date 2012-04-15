/*	- created: 2007-07-18 - scarrillo
	- updated: 2007-11-06 - scarrillo - getUrlPath() - getContextPath()
*/

function doUrl(url) {
	if(!url) return false;

	/*
	if(g_enableBumpers && g_bumperUrl) {
		//url = g_bumperUrl + escape(url);
	}
	window.open(url);
	*/
	KIDS.utils.openBumper("paysite", url, null, null, null, true);
	return false;
}

function doLinkSpotUrl(url) {
	if(!url) return false;
	window.location.href = url;	
	return false;
}

function getFilteredKeywords(keywords, filteredKeywords) {
	if(keywords == null) return "";
	if(filteredKeywords == null) filteredKeywords = new Array();

	KIDS.utils.trimArray(keywords, true);
	KIDS.utils.trimArray(filteredKeywords, true);

	var found = false;
	var keywordsBuffer = "";
	for(var i = 0; i < keywords.length; i++) {
		for(var j = 0; j < filteredKeywords.length; j++) {
			//document.writeln("<br/>Keyword Compare: "+filteredKeywords[j]+" | "+keywords[i]+"<br />");
			if(keywords[i] != "" && keywords[i] == filteredKeywords[j]) {
				//document.writeln("<br/>Keyword Filtered: "+filteredKeywords[j]+"<br />");
				found = true;
			}
		}
		if(!found) keywordsBuffer += ", "+keywords[i];
		found = false;
	}
	return keywordsBuffer;
}

// Second argument is an array. String will be changed into an array of characters.
function getFilteredLinks(linkData, keywords) {
	if(linkData == null || !linkData.getItems) return null;
	if(keywords == null) keywords = new Array();

	KIDS.utils.trimArray(keywords, true);
	var links = linkData.getItems();

	var found = false;
	var filteredLinks = new Array();
	var savedLinks = new Array();
	var title = null;
	var description = null;

	//alert("getFilteredLinks: "+links.length);
	for(var i = 0; i < links.length; i++) {

		title = links[i].getTitle();
		description = links[i].getDescription();

		for(var j = 0; j < keywords.length; j++) {
			if(KIDS.utils.isEmptyString(keywords[j])) continue;

			//alert("Keyword Compare: "+links[i]+" | "+keywords[j]+"<br />");
			if((!KIDS.utils.isEmptyString(title) && title.toLowerCase().indexOf(keywords[j]) >= 0) ||
				(!KIDS.utils.isEmptyString(description) && description.toLowerCase().indexOf(keywords[j]) >= 0)) {
				//alert("Keyword Filtered: "+links[i]+"<br />");
				found = true;
			}
		}

		if(found) savedLinks.push(links[i]);
		else filteredLinks.push(links[i]);

		found = false;
	}

	var filtered = new Object();
	filtered["filtered"] = filteredLinks;
	filtered["forbidden"] = savedLinks;

	return filtered;
}

// keywords is space delimited
// 2007-08-06: added maxResults. Yahoo started limiting results to two by default.
function doSearch(keywords, urlFilters, termFilters, maxResults) {
	var conf = new overtureSearchConf();
	conf.setKeywords(keywords);

	if(maxResults != null && maxResults >= 0) {
		conf.setMaxCount(maxResults);
	}

	if(urlFilters != null) conf.setUrlFilters(urlFilters);
	if(termFilters != null) conf.setTermFilters(termFilters);
	loadOvertureSearchInclude(conf, false);
}

// keywords is space delimited
function doContentMatch(contextId, keywords, maxContentMatch, outputCharacterEncoding, type) {
	var ctxtId = contextId == null ? 'shows' : contextId;
	//var ctxtCat = contextId == null ? 'shows' : contextId;
	var ctxtCat = '';
	var mkt = 'us';
	//var type = KIDS.utils.getContextPath(document.location.href, ctxtId, true, true);
	var loc = document.location.href;
	if(loc.match("/search?term=")) {
		type = "search";
	} else if(type == "gettype" || type === undefined) {
		var d = window.location.hostname;
		var a = d.split('.');
		var re = /(www|local|relaunch|mtvi|com)/;
		var dq = /\-(d|q)/;
		for (var i = a.length - 1; i >= 0; i--) {
			a[i] = a[i].replace(dq, '');
			if (a[i].search(re) !== -1) {
				a.splice(i,1);
			}
		}
		var typeParam = a.join("_");
		KIDS.utils.doLog("Type param: " + typeParam);
		type = typeParam;
		//type = KIDS.utils.getContextPath(document.location.href, ctxtId, true, true);
	}
	var keywordCharEnc = '';
	var outputCharEnc = KIDS.utils.isEmptyString(outputCharacterEncoding) ? "" : outputCharacterEncoding;
	var maxCount = maxContentMatch == null ? '5' : maxContentMatch;

	// where load metakeywords was

	//Create a configuration object and add the keywords to the conf.
	var conf = new overtureContentMatchConf();
	if(keywords != null) conf.setCtxtKeywords(keywords);
	if(!KIDS.utils.isEmptyString(ctxtId)) conf.setCtxtId(ctxtId);
	if(!KIDS.utils.isEmptyString(ctxtCat)) conf.setCtxtCat(ctxtCat);
	if(!KIDS.utils.isEmptyString(mkt)) conf.setMkt(mkt);
	if(!KIDS.utils.isEmptyString(type)) conf.setType(type);
	if(!KIDS.utils.isEmptyString(keywordCharEnc)) conf.setKeywordCharEnc(keywordCharEnc);
	if(!KIDS.utils.isEmptyString(outputCharEnc)) conf.setOutputCharEnc(outputCharEnc);
	if(!KIDS.utils.isEmptyString(maxCount)) conf.setMaxCount(maxCount);

	loadOvertureCMInclude(conf, false);
}

function doLinkSpots(maxLinkSpots) {
	//Create a configuration object for linkspots and load the linkspots in
	var lsConf = new overtureLinkspotConf();
	lsConf.setNGrp(1);
	lsConf.setNKw(maxLinkSpots == null ? 10 : maxLinkSpots);
	//This will use the mapping to determine the linkspot id
	lsConf.setLinkspotIdMap(g_linkspotIdMap);
	loadOvertureLinkspotInclude(lsConf, false);
}

// call after doSearch() or doContentMatch() - in a separate <script> block. or zSr wont be loaded.
function getLinks() {
	var links = zSr ? populateOvertureLinks(zSr) : zSr_dummy;
	links = links == undefined ? zSr_dummy : links;
	return links;
}

function getLinkSpots() {
	var overtureLinkspots = mapkey ? populateOvertureLinkspots(mapkey) : populateOvertureLinkspots(mapkey_dummy);
	return overtureLinkspots;
}

// linkData object or an array of links
function getHtml(linkData, startIndex, endIndex) {
	if(linkData == null) return "";

	var links = !linkData.getItems ? linkData : linkData.getItems();
	if(links == null || links.length <= 0) return "";

	startIndex = startIndex == null ? 0 : startIndex;
	endIndex = endIndex == null || endIndex == 0 || endIndex > links.length ? links.length : endIndex;

	var i = startIndex;
	var outputBuffer = "";
	var link = null;
	var count = 0;

	for(var i = startIndex; i < endIndex; i++) {
		link = links[i];
		if(link == null) continue;

		outputBuffer += "<li><a class=\"sponsor_ad\" href='"+
			link.getClickUrl() +"' target='_blank'>"+
			link.getTitle() +"</a><br>"+
			"<a class=\"sponsor_ad_description\" href='" +
			link.getClickUrl()+ "' target='_blank'>" +
			link.getDescription()+
			"</a><br><a class=\"sponsor_ad_client\" href='"+
			link.getClickUrl()+
			"' target='_blank'>"+
			link.getSitehost() +"</a></li>\n";

		count++;
	}
	if(outputBuffer != "") outputBuffer = "<ul>"+ outputBuffer +"</ul>";

	return outputBuffer;
}

function getHtmlLinkspots(linkData, rowIndex, maxLinks) {
	if(linkData == null) return "";

	var linkspot = linkData.getItem(rowIndex);
	var keywords = linkspot == null ? null : linkspot.getKeywords();
	if(keywords == null || keywords.length <= 0) {
		return "<ul><li>no links</li></ul>";
	}
						
	var outputBuffer = "<ul>";
	
	maxLinks = maxLinks == null || maxLinks > keywords.length ? keywords.length : maxLinks;
	var keyword;
	for (var i = 0; i < maxLinks; i++) {
		keyword = keywords[i];
		if(keyword == null) continue;

		outputBuffer += "<li><a class=\"sponsor_ad_linkspot\" href=\""+
			linkspotSearchUrl + urlEncode(keyword) +"\">" + keyword + "</a></td>\n";
	}
	outputBuffer += "</ul>";
	return outputBuffer;
}

// usage: /home/search/search_results.jhtml
function displaySponsoredLinks(filteredLinks, divName, min, max, toggleVisibility) {
	//alert("Len: "+filteredLinks.filtered.length+" | "+max);
	var contentDiv = divName;
	if(filteredLinks && filteredLinks.filtered && filteredLinks.filtered.length > 0) {
		var di = document.getElementById(divName);
		if(di == null) return;

		min = min == null ? 0 : min;
		max = max == null ? 2 : max;

		var content = getHtml(filteredLinks.filtered, min, max);
		//content += "["+filteredLinks.filtered.length+"]";

		if(toggleVisibility && (content == null || content == "")) {
			toggleDiv(contentDiv, false);
			return;
		}

		toggleDiv(contentDiv, true);
		di.innerHTML = content;
	} else if(toggleVisibility) {
		toggleDiv(contentDiv, false);
	}
}

function toggleDiv(divName, show) {
	var di = document.getElementById(divName);
	if(di == null) return;

	di.style.visibility = show ? "visible" : "hidden";
}

// legacy. do not remove. Possibly in use.
function hideDiv(divName) {
	toggleDiv(divName, false);
}
