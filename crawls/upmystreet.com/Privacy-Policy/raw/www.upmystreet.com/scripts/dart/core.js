//set debug to debug=1 to see adcalls in page
var debug = 0;
// set dev to dev=1 to point to Dev Adservers vs. Production Adservers
var dev = 0;

// base url paths for dev & production ( iframe and javascript ) verions
var devAdserverBasePathJS = "http://devadsremote.scrippsnetworks.com/js.ng/";
var devAdserverBasePathHTML = "http://devadsremote.scrippsnetworks.com/html.ng/";
var adserverBasePathJS = "http://adsremote.scrippsnetworks.com/js.ng/";
var adserverBasePathHTML = "http://adsremote.scrippsnetworks.com/html.ng/";
var multiAdBasePathHTML = "http://adsremote.scrippsnetworks.com/";
var devMultiAdBasePathHTML = "http://devadsremote.scrippsnetworks.com/";

//sets defined adtype to render as Iframes
function adRestrictionIframe(site, adtype, pos, category, vgncontent, subsection, topic, uniqueId, adkey1, adkey2, keywords){
	if(adtype == 'UK_LEADERBOARD' || adtype == 'UK_BIGBOX' || adtype == 'UK_TOWER' || adtype == 'UK_SLIVER'){ return true; }
	else{ return false; }
}

// sets defined name value pairs to be inactive and not render on the page based on name value pairs set
function adRestrictionActive(site, adtype, pos, category, vgncontent, subsection, topic, uniqueId, adkey1, adkey2, keywords){
	if(adtype == '' || adtype == null || adtype == undefined ){return true;}
	else{return false;}	
}

