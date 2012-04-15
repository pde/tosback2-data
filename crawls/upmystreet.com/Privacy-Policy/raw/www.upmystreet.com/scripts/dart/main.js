// UMS MAIN AD LIBRARY 

// tile value global per page load ( allows Ad to sync together from 1 advertiser for own a page functionality )
var tile = Math.floor(Math.random()*999999);
var searchCategory = 'undefined';
var searchBusiness = 'undefined';
var searchLocation = 'undefined';
var searchType = 'undefined';
var minPrice = 'undefined';
var maxPrice = 'undefined';
var propertyType = 'undefined';
var bedrooms = 'undefined';
var radius = 'undefined';
var cookieString = '';
var searchString = document.location.search;
searchString = searchString.substring(1); // strip off the leading '?'


function readUrlCookie(){
var nvPairs = searchString.split("&");
	if(nvPairs.length != 1){
		for (i = 0; i < nvPairs.length; i++){
     		var nvPair = nvPairs[i].split("=");
     		var name = nvPair[0];
     		var value = nvPair[1];
	 
	 		switch(name){
	 			case "category":
				searchCategory = value;
				break;
				case "business":
				searchBusiness = value;
				break;
				case "location":
				searchLocation = value;
				break;
				case "domain":
				searchType = value;
				break;
				case "min":
				minPrice = value;
				break;
				case "max":
				maxPrice = value;
				break;
				case "type":
				propertyType = value;
				break;
				case "bedrooms":
				bedrooms = value;
				break;
				case "radius":
				radius = value;
				break;
				default:
				value;
				break;
	 		}
		
			cookieString += name + "=" + value + ";";
		}
		
        // write search values into cookie for session targeting across site
		document.cookie = escape(cookieString);	
	}else{
		//reading and splitting the whole cookie
		var whole_cookie = unescape(document.cookie);
		var each_cookie = whole_cookie.split(";");

		for (i = 0; i < each_cookie.length; i++){
			var nvPair = each_cookie[i].split("=");
     			var name = nvPair[0];
     			var value = nvPair[1];
			if (each_cookie[i].indexOf("category") > -1){searchCategory = nvPair[1];}
			if (each_cookie[i].indexOf("business") > -1){searchBusiness = nvPair[1];}
			if (each_cookie[i].indexOf("location") > -1){searchLocation = nvPair[1];}
			if (each_cookie[i].indexOf("domain") > -1){searchType = nvPair[1];}
			if (each_cookie[i].indexOf("min") > -1){minPrice = nvPair[1];}
			if (each_cookie[i].indexOf("max") > -1){maxPrice = nvPair[1];}
			if (each_cookie[i].indexOf("type") > -1){propertyType = nvPair[1];}
			if (each_cookie[i].indexOf("bedrooms") > -1){bedrooms = nvPair[1];}
			if (each_cookie[i].indexOf("radius") > -1){radius = nvPair[1];}
		}
	}
}

readUrlCookie();


////////////begin debug & dev environment check switch cases ///////////////////////////
function devCheckHTML(){
	switch (dev){
		case 0: var adUrl = adserverBasePathHTML; return adUrl; break;
		case 1: var adUrl = devAdserverBasePathHTML; return adUrl; break;
		default: var adUrl = adserverBasePathHTML; return adUrl; break;
	}
}
function mutliDevCheckHTML(){
	switch (dev){
		case 0: var adUrl = multiAdBasePathHTML; return adUrl; break;
		case 1: var adUrl = devMultiAdBasePathHTML; return adUrl; break;
		default: var adUrl = multiAdBasePathHTML; return adUrl; break;
	}
}
function devCheckJS(){
	switch (dev){
		case 0: var adUrl = adserverBasePathJS; return adUrl; break;
		case 1: var adUrl = devAdserverBasePathJS; return adUrl; break;
		default: var adUrl = adserverBasePathJS; return adUrl; break;
	}
}
function debugCheck(adCallHolder, fullAdCall){
	switch(debug){
		case 0: document.write(fullAdCall); break;
		case 1: document.write('<div style="background:black;color:white;">'+ adCallHolder +'</div>' + fullAdCall); break;
		default: document.write(fullAdCall); break;
	}
}
////////////end debug & dev environment check switch cases ///////////////////////////

// converts all metadata parameters to uppercase, converts special characters to underscores
function convert(value){
    var re = /\$|,| |@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\-|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$|\./g;
	if(value == '' || value == null || value == undefined){return;}
	var valueHolder = value.toUpperCase();
	valueHolder = valueHolder.replace(re, "_");
	return valueHolder;
}

// builds full adcall UrL. Checks for empty metadata parameters and excludes them from the adcall string if empty.
function buildExpandedUrl(adtype, adsize, pos, adUrl, ord){
	var adCallString = adUrl + 'site=' + site;
	if(category != ''){adCallString += '&category=' + convert(category);}
	if(vgncontent != ''){adCallString += '&vgncontent=' + convert(vgncontent);}
	if(subsection != ''){adCallString += '&subsection=' + convert(subsection);}
	if(subsection2 != ''){adCallString += '&subsection2=' + convert(subsection2);}
	if(pca != ''){adCallString += '&pca=' + convert(pca);}
	if(pcd != ''){adCallString += '&pcd=' + convert(pcd);}
	if(pcs != ''){adCallString += '&pcs=' + convert(pcs);}
	if(postcode != ''){adCallString += '&postcode=' + convert(postcode);}
	if(acorn != 0){adCallString += '&acorn=' + convert(acorn);}
	if(topic != ''){adCallString += '&topic=' + convert(topic);}
	if(adkey1 != ''){adCallString += '&adkey1=' + convert(adkey1);}
	if(adkey2 != ''){adCallString += '&adkey2=' + convert(adkey2);}
	adCallString += '&adtype=' + convert(adtype);
	adCallString += '&pagepos=' + pos;
	adCallString += '&uniqueid=' + convert(uniqueId);
	adCallString += '&ord=' + ord;
	adCallString += '&tile=' + tile;
	if(keywords != ''){
	var searchString = '';
	var words = keywords.split(",");
	for(i = 0; i < words.length; i++) { searchString += '&keyword=' + convert(words[i]);}
	adCallString += searchString;
	}
	if(searchCategory != 'undefined'){adCallString += '&searchCat=' + convert(searchCategory);}
	if(searchBusiness != 'undefined'){adCallString += '&searchBus=' + convert(searchBusiness);}
	if(searchLocation != 'undefined' ){adCallString += '&searchLoc=' + convert(searchLocation);}
	if(searchType != 'undefined' ){adCallString += '&searchType=' + convert(searchType);}
	if(minPrice != 'undefined' ){adCallString += '&minPrice=' + convert(minPrice);}
	if(maxPrice != 'undefined' ){adCallString += '&maxPrice=' + convert(maxPrice);}
	if(propertyType != 'undefined' ){adCallString += '&propertyType=' + convert(propertyType);}
	if(bedrooms != 'undefined' ){adCallString += '&bedrooms=' + convert(bedrooms);}
	if(radius != 'undefined' ){adCallString += '&radius=' + convert(radius);}
	return adCallString ;
}

// builds Javascript mark for Multi Logo or Multi Textlinks and doc.write to html page.
function buildMultiUrl(adtype, pos, adUrl){
	var ord = Math.floor(Math.random()*999999);
	var adsize ='';
	var adCallHolder = buildExpandedUrl(adtype, adsize, pos, adUrl, ord);
	var fullAdCall = '<script type="text/javascript" src="'+ adCallHolder + '"></script>';
	switch(debug){
			case 0:
				document.write(fullAdCall);
			break;
			case 1:
				document.write('<div style="background:black;color:white;width:500px;">'+ adCallHolder +'</div>' + fullAdCall);
			break;
			default:
				document.write(fullAdCall);
			break;
		}
}

// builds flat url for Flash Video Player to ingest for preroll, midroll, postroll, & overlays
function buildVideoUrl(adtype, adsize, pos, adUrl){
	var ord = Math.floor(Math.random()*999999);
	return buildExpandedUrl(adtype, adsize, pos, adUrl, ord);
}

// building Ad JavaScript or Iframe html mark up and doc.write to html page
function buildUrl(adtype, adsize, pos, adUrl, width, height){
this.frameborder = 0;
this.marginheight = 0;
this.marginwidth = 0;
this.scrolling = 'no';
var baseString = /html.ng/;
var searchHolder = adUrl.search(baseString);
var ord = Math.floor(Math.random()*999999);
var adCallHolder = buildExpandedUrl(adtype, adsize, pos, adUrl, ord);

if(searchHolder != -1){
	var fullAdCall = '<iframe class="iframeAdvert" src ="'+ adCallHolder + '" align ="'+this.align+'" frameborder ="'+this.frameborder+'" height ="'+ height +'" longdesc ="'+this.longdesc+'" marginheight ="'+this.marginheight+'" marginwidth ="'+this.marginwidth+'" name ="'+ adtype + '_IFRAME" scrolling ="'+this.scrolling+'" width ="'+ width +'"></iframe>';
		debugCheck(adCallHolder, fullAdCall);
	}else{
		var fullAdCall = '<script type="text/javascript" src="'+ adCallHolder + '"></script>';
		debugCheck(adCallHolder, fullAdCall);
	}
}

// master Ad function ( handes iframe & active checks and diverts to iframe / javascript logic branches
function sndAd(adtype, adsize, pos, width, height) {
	if(pos < 0 || pos == undefined) {pos = 1;}
	if(adRestrictionActive(site, adtype, pos, category, vgncontent, subsection, topic, adkey1, adkey2, uniqueId) == false){
		if(adRestrictionIframe(site, adtype, pos, category, vgncontent, subsection, topic, adkey1, adkey2, uniqueId) == true){
			var adUrl = devCheckHTML();
			buildUrl(adtype, adsize, pos, adUrl, width, height);
		}else{
			var adUrl = devCheckJS();
			buildUrl(adtype, adsize, pos, adUrl, width, height);
		}	
	}else{
		return;
	}	
}



////////// begin main display Ad functions ///////////////
function LeaderboardAd(pos) {
	if(pos < 0 || pos == undefined || pos=='') {pos = 1;} sndAd('UK_LEADERBOARD', '',  pos, '728', '90');
}
function LargeLeaderboardAd(pos) {
	if(pos < 0 || pos == undefined || pos=='') {pos = 1;} sndAd('UK_LARGELEADERBOARD', '',  pos, '960', '135');
}
function TowerAd120x600(pos) {
	if(pos < 0 || pos == undefined || pos=='') {pos = 1;} sndAd('UK_TOWER', '',  pos, '120', '600');
}
function MpuAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;} sndAd('UK_BIGBOX', '', pos, '300', '250');
}
function SliverAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;} sndAd('UK_SLIVER', '', pos, '800', '30');
}
function WideIntAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;} sndAd('UK_WIDE_INTEGRATED', '', pos, '', '');
}
function AffiliateAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;} sndAd('UK_AFFILIATE', '', pos, '', '');
}
function PeelAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;} sndAd('UK_PEEL', '', pos, '', '');
}
function FatIntAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;} sndAd('UK_FAT_INTEGRATED', '', pos, '', '');
}
function PixelAd(pos) {
	if(pos < 0 || pos == undefined) {pos = 1;} sndAd('UK_PIXEL', '', pos, '1', '1');
}
///////// end main display Ad functions ////////////////





//Video Ad functions
function VideoPlayerAd(adtype, adsize, pos) {
	if(adRestrictionActive(site, adtype, pos, category, vgncontent, subsection, topic, adkey1, adkey2, uniqueId) == false){
		var adUrl = devCheckHTML();
		var videoUrlHolder = buildVideoUrl(adtype, adsize, pos, adUrl);
		return videoUrlHolder;
	}
}

//Flash Video Player calls this function to pull back preroll, midroll, postroll or overlay XML from Dart 
function getDartEnterpriseUrl(adtype,pos){
   		adtype = adtype.toUpperCase();
   		var strUrl = VideoPlayerAd(adtype,'', pos);
   		return strUrl;
}

//Flash Video Player calls this function to pass sync banner url from XML back to html page
function setDartEnterpriseBanner(adType, sync_banner) {
	if (adType == 'UK_LEADERBOARD') {
	  if($("#leaderboard").length > 0) {
			boxW = 728;
			boxH = 90;
			$("#leaderboard").html("<iframe class='iframeAdvert' src='" + sync_banner + "\' width=\'" + boxW + "\' height=\'" + boxH + "\'" + "frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>");
		}
	} else { // assumes adType == 'BIGBOX' or should
		if($("#bigbox").length > 0) {
			boxW = 300;
			boxH = 250;
			if (sync_banner.indexOf("336x850") > -1) {
				boxW = 336;
				boxH = 850;
			} else if (sync_banner.indexOf("300x600") > -1)	{
				boxW = 300;
				boxH = 600;
			}
			$("#bigbox").html("<iframe class='iframeAdvert' src='" + sync_banner + "\' width=\'" + boxW + "\' height=\'" + boxH + "\'" + "frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>");
		}
	}
	return;
}

// multiple sponsor logo tag
function MultiLogoAd(adtype,logoNum) {
	if (logoNum == undefined || logoNum == '' || logoNum > 4 || logoNum < 1) { logoNum = 4; }
	if (adtype == undefined || adtype == '') { adtype = 'LOGO';	}
	var file = "snDigitalLogoUK" + logoNum + ".html?";
	var pos = 1;
	if(adRestrictionActive(site, adtype, pos, category, vgncontent, subsection, topic, adkey1, adkey2, uniqueId) == false){
			var adUrl = mutliDevCheckHTML();
			adUrl += file;
			buildMultiUrl(adtype, pos, adUrl);
	}else{
		return;
	}	
}

// multiple text link ad tag
function sponsorLinks(adtype,linkNum) {
	if (linkNum == undefined || linkNum == '' || linkNum > 6 || linkNum < 1) { linkNum = 6; }
	if (adtype == undefined || adtype == '') { adtype = 'SPONSORSHIP';	}
	var file = "sndTextlinksUK" + linkNum + ".html?";
	var pos = 1;
	if(adRestrictionActive(site, adtype, pos, category, vgncontent, subsection, topic, adkey1, adkey2, uniqueId) == false){
			var adUrl = mutliDevCheckHTML();
			adUrl += file;
			buildMultiUrl(adtype, pos, adUrl);
	}else{
		return;
	}	
}

function dartTrack(url){
	var container = document.getElementById('dartTrackDiv').innerHTML = "<iframe src=\'" + url + "\' frameborder=\'0\' scrolling=\'no\' width=\'1\' height=\'1\' style=\'display:none;\'><\/iframe>";
	return true ;
}

function dartTrackOpen(url, formUrl){
    var container = document.getElementById('dartTrackDiv').innerHTML = "<iframe src=\'" + url + "\' frameborder=\'0\' scrolling=\'no\' width=\'1\' height=\'1\' style=\'display:none;\'><\/iframe>";
    window.open(formUrl);
    return false ;
}

// end main ad library (written by T.Overstreet 3/27/2009 )
