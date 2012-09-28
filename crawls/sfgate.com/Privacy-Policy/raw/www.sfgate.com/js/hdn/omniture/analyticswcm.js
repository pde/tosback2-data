// Variables used to assign values to Omniture props
var awOmniPagename = "";
var awOmniPagetitle = "";
var awOmniChannel;
var awOmniHier1;
var awOmniServer = document.location.host;
var awOmniSSL1;
var awOmniSSL2;
var awOmniSSL3;
var awOmniSSL4;
var awOmniNumResults;
var awOmniSearchTerms;
var awOmniPrintContent = "online";
var awOmniAuthorTitle = "";
var awOmniPubDate;
var awOmniTitle = "";
var awOmniID = "";
var awOmniContentType = "";
var awOmniAuthor = "";
var awOmniDaysSincePub;
var awOmniQuery = "";
var awOmniDomain;
var awOmniHeadline = "";
var awOmniPageNumber = "";
var awOmniPremiumStatus = "";
var awOmniPremiumEndDate = "";
var awOmniPubSource = "";
var awOmniBoolPremiumEvent = false;
var awOmniFullURL = document.URL.toLowerCase();


// Variables to hold parts of the URL
var awStrRelativePath;
var awStrPageURL = "";
var awStrChannelPath;
var awStrPageFile;
var awStrVertical;
var awControllerName=s.getQueryParam("controllerName").toLowerCase();

// String variable to hold 3rd-party partner's Google Analytics Acct #
var awStrGAAcct2 = "";

// Boolean flag for 404 error pages
var awBoolIs404 = false;

// Fnction to pull the protocol, subdomain and extension from the domain URL
// Used to treat domains other than the main one (for instance "29-95") differently
function awGetDomainName(url) { 
	var arURLPieces =  ((url.match(/:\/\/(.[^/]+)/)[1]).replace('www.','')).split('.'); 
	return arURLPieces[0];
}

// Parse the URL 
function awParseURL() {

	var strFullURL = awOmniFullURL;
	var strAltDomain;
	var boolNoExtension;
	var intQStart = strFullURL.indexOf("?") + 1;
	var intRelPathStart = strFullURL.indexOf('.com') + 5;
	var arrayURLparts = new Array();

	// Get the fully qualified domain
	awOmniDomain = strFullURL.substr(0, intRelPathStart);
	
	// Separate query string from page name
	if (intQStart > 0){
		awOmniQuery = strFullURL.substring(intQStart);
		awStrRelativePath = strFullURL.substring(0,intQStart-1);
	} else {
		awStrRelativePath = strFullURL;
	}
	awStrPageURL = awStrRelativePath;
	
	// Get the path relative to the domain
	awStrRelativePath = awStrRelativePath.substr(intRelPathStart);
	
	// If the domain is not the main one (as in the case of "29-95.com", re-add the domain
	// name as the first part of the path
	strAltDomain = awGetDomainName(awOmniDomain);
	if (strAltDomain !== awGetDomainName(s_mainDomain)){
		awStrRelativePath = strAltDomain + '/' + awStrRelativePath;
	}

	// If there is no "." in the page name, we're assuming it's a channel and the page is the index page
	// If it's the index of the main domain (value assigned in analyticsconfig.js), it's the site's Home Page
	// An exception is "29-95.com", whose page names have no extensions. In this case, channels are distiguished
	// from leaf-node pages by the presence of the object type in the URL ("story", "comic", "gallery" or "photo").
	boolNoExtension = (awStrRelativePath.indexOf('.')==-1);
	if(boolNoExtension){
		if(strAltDomain !== "29-95" || (awStrRelativePath.indexOf('/comic/')==-1 && awStrRelativePath.indexOf('/story/')==-1 && awStrRelativePath.indexOf('/photo/')==-1)){
			if(awStrRelativePath.charAt(awStrRelativePath.length-1)!=='/'){awStrRelativePath+='/';}
			if(awOmniDomain==s_mainDomain && (awStrRelativePath=='home/' || awStrRelativePath.length==1)){
				awStrRelativePath='home';
			} else {
				awStrRelativePath+='index';
			}
		}
	}
	
	// Split up the path and build both a colon-delimited page name
	// and a double-colon-delimited "channel" string that is used
	// later on to assign the section level and hierachy variables
	arrayURLparts = awStrRelativePath.split('/');
	awStrChannelPath = arrayURLparts[0];
	if(awStrChannelPath.indexOf('.')!==-1){awStrChannelPath='home';}
	for(z = 0; z <arrayURLparts.length; z++) {
		if (awOmniPagename != "" ) {
			awOmniPagename = awOmniPagename + ":" + arrayURLparts[z]; 
			if(z <arrayURLparts.length-1){awStrChannelPath = awStrChannelPath + ' :: ' + arrayURLparts[z];}
		}else{
			awOmniPagename = arrayURLparts[z];
		}
	}

	awStrPageFile = arrayURLparts[arrayURLparts.length-1];	
	if(awStrPageFile=='index' && arrayURLparts.length>1){awStrPageFile=arrayURLparts[arrayURLparts.length-2]+':'+awStrPageFile;}
	awOmniPagename = ((awOmniPagename=='home')?'HomePage':awOmniPagename);
	awOmniPagetitle = ((awOmniPagename=='HomePage')?'HomePage':awStrPageFile);
	
	return awOmniPagename;
}

// Function to parse delimited category hiearachy and assign to Omniture variables
function omni_categorize(strDelimitedCats){
	if (typeof(strDelimitedCats)!="undefined"){
		var intWhichCat, intNumCats;
		var awArrayCats = new Array();
		
		strDelimitedCats = strDelimitedCats.toLowerCase();
		awArrayCats = strDelimitedCats.split(' :: ');
		intNumCats=awArrayCats.length;
		awOmniSSL1=awOmniChannel=awOmniSSL2=awOmniSSL3=awOmniSSL4=awArrayCats[0];
		if(intNumCats>1){awOmniSSL2=awOmniSSL3=awOmniSSL4=awOmniSSL1+":"+awArrayCats[1];}
		if(intNumCats>2){awOmniSSL3=awOmniSSL4=awOmniSSL2+":"+awArrayCats[2];}
		if(intNumCats>3){awOmniSSL4=awOmniSSL3+":"+awArrayCats[3];}
		awOmniHier1=awOmniSSL4.replace(/:/g,",");
		if(intNumCats>4){
			for (intWhichCat=4;intWhichCat<intNumCats;intWhichCat++){
				awOmniSSL4=awOmniSSL4+" - "+awArrayCats[intWhichCat];
			}
		}
		
		// Assign values immediately, so call to function from WCM can adjust those values
		s.channel = awOmniChannel; // (Channel)
		s.hier1 = awOmniHier1; // (Hierarchy Level 1)
		s.prop1 = awOmniSSL1; // (Site Section Level 1)
		s.prop2 = awOmniSSL2; // (Site Section Level 2)
		s.prop3 = awOmniSSL3; // (Site Section Level 3)
		s.prop4 = awOmniSSL4; // (Site Section Level 4)
	}
}

// Function to put author name in proper case
function toProperCase(pc)
{	if(pc != "undefined"){
		if(pc.length > 1){
			return pc.toLowerCase().replace(/^(.)|\s(.)/g, 
			  function($1) { return $1.toUpperCase(); });}}}

// Function to remove "BY " prefix from author name
function processByLine(bl)
{	var authorName = bl;

	if(authorName.length > 2){if(authorName.substr(0,3).toUpperCase()=="BY "){authorName=authorName.substr(3);}}
	return toProperCase(authorName);
}

// Function to track link campaigns. "desc" is optional
// example use: <a href="/ipadapp/" onClick="linkTrack(this, 'ipadoverlay', 'iPadpromos')">Click Me</a>
function linkTrack(obj, cid, desc) {
    // Use try block because this is assumes vendor code. 's_hdn' is safer than using 's'
    try {
        s_hdn.linkTrackVars = "campaign";
        s_hdn.campaign = cid;
        if (typeof desc == "undefined"){ // no description
            s_hdn.tl(obj,'o');
        } else { // description given
            s_hdn.tl(obj,'o',desc);
        }
    } catch(err) { // if there is a console (like in Firefox), note the error
        if ( window.console!=undefined ){
            console.log(err);
        }
    }
}

// Parse the URL 
// The function sets a default category structure based on the URL,
// which can be overridden by WCM variables
awParseURL();

// Capture values assgined to javascript variables by WCM code
if(typeof(omni_bizObjectId)!="undefined"){awOmniID=omni_bizObjectId;}
if(typeof(omni_authorName)!="undefined"){awOmniAuthor=processByLine(omni_authorName);}
if(typeof(omni_authorTitle)!="undefined"){awOmniAuthorTitle=(omni_authorTitle.toLowerCase().indexOf("associated press")>-1 ? 'AP' : omni_authorTitle);}
if(typeof(omni_publicationDate)!="undefined"){
	awOmniPubDate=omni_publicationDate;
	
	// Calculate days since publication
	var awDtmToday=new Date();
	var awDtmPubDate = new Date(awOmniPubDate.replace(/-/g, "/"));
	awOmniDaysSincePub = Math.ceil((awDtmToday.getTime() - awDtmPubDate.getTime())/(1000*60*60*24));
}
if(typeof(omni_title)!="undefined"){
	awOmniTitle=omni_title;
} else if(typeof(omni_blogposttitle)!="undefined") {
	awOmniTitle=omni_blogposttitle;
} else if(awOmniPagetitle.length>0) {
	awOmniTitle=awOmniPagetitle;
}
if(typeof(omni_breakingNewsFlag)!="undefined" && typeof(omni_localNewsFlag)!="undefined"){
	if (omni_breakingNewsFlag!="1" && omni_localNewsFlag=="1") {awOmniPrintContent="print";}
}
if(typeof(omni_channelPath)!="undefined"){
	awStrChannelPath=omni_channelPath.toLowerCase();
	// If the ChannelPath indicates the content is from a 3rd-party partner whose
	// Google Analytics account needs to be updated with pageviews, assign to awStrGAAcct2
	if(awStrChannelPath=='local :: sound publishing') {awStrGAAcct2 = "UA-52608-55";} 
}
if(typeof(omni_className)!="undefined"){
	awOmniContentType=omni_className;
}else if(awControllerName.length>0){
	awOmniContentType=awControllerName;
} else if(awOmniTitle.toLowerCase() == 'page not found'){ 	// These last two conditions cover
	awOmniContentType='page not found';	         	// niche blog apps like HMS
} else if(awOmniQuery.substring(0,2)=='s=') {		    	// with regard to searches and
	awOmniContentType='search';				// 404 error pages
} 
if(typeof(omni_premiumStatus)!="undefined"){
	awOmniPremiumStatus = omni_premiumStatus;
	awOmniBoolPremiumEvent = true;
}
if(typeof(omni_premiumEndDate)!="undefined"){awOmniPremiumEndDate = omni_premiumEndDate;}
if(typeof(omni_sourceSite)!="undefined"){awOmniPubSource = omni_sourceSite;}

// Process content type
// Append content type to the end of the category structure where appropriate
switch(awOmniContentType){
	case "article":

 		// Fix for Article Gallery template so 1st photo of slideshow is counted as slideshow view, not article view
 		if(awOmniFullURL.toLowerCase().indexOf('articlegallery')!==-1){
 			awOmniPageNumber = "article slideshow photo:1";
 			awOmniContentType = "article slideshow";
 		}

		awOmniHeadline = awOmniTitle + (awOmniAuthorTitle.length>0 ? ' - ' + awOmniAuthorTitle : '');
		awStrChannelPath = (awStrChannelPath.length>0 ? awStrChannelPath + ' :: ' + awOmniContentType : awOmniContentType);
		break;
	case "slideshow":
		awStrChannelPath = (awStrChannelPath.length>0 ? awStrChannelPath + ' :: ' + awOmniContentType : awOmniContentType);
	break;
	case "collection":
		awStrChannelPath = (awStrChannelPath.length>0 ? awStrChannelPath + ' :: ' + awOmniContentType : awOmniContentType);
	break;
	case "search":
		awOmniNumResults=0; 
		awOmniSearchTerms=s.getQueryParam("query"); 
		// If this is a WCM search, searchterms are in "query"
		// If it's a niche blog app, they're in "s"
		if(!awOmniSearchTerms){awOmniSearchTerms=s.getQueryParam("s");}
		if(awOmniSearchTerms){awOmniSearchTerms="searchbox:kwd:" + awOmniSearchTerms;}
		awStrChannelPath="search";
		if(s.getQueryParam("channel").length>1){
			awStrChannelPath+=(" :: " + ((s.getQueryParam("inlineLink")=="1") ? 'inline' : 'searchbox') + " :: " + s.getQueryParam("channel"));
		}
	break;
	case "video":
		awStrChannelPath = (awStrChannelPath.length>0 ? awStrChannelPath + ' :: ' + awOmniContentType : awOmniContentType);
	break;
	case "page not found":
		awOmniDaysSincePub="";
		awBoolIs404 = true;
	break;
	case "channel":
		awOmniDaysSincePub="";
		if(awOmniPagename=='HomePage'){awOmniContentType='home page';}
	break;
	default:
		awOmniContentType='other';
}

// Process vertical type, based on category structure
// Append vertical type to beginning of category structure where appropriate
awStrVertical=(awStrChannelPath.indexOf(' ::')>-1?awStrChannelPath.substr(0,awStrChannelPath.indexOf(' ::')):awStrChannelPath);
switch(awStrVertical){
	case "homes":
	case "realestate":
	case "real estate":
	case "real_estate":
		awStrChannelPath = awStrChannelPath.replace(awStrVertical, 'classifieds :: realestate');
	break;
	case "auto":
	case "autos":
	case "cars":
		awStrChannelPath = awStrChannelPath.replace(awStrVertical, 'classifieds :: autos');
	break;
	case "jobs":
	case "job":
		awStrChannelPath = awStrChannelPath.replace(awStrVertical, 'classifieds :: jobs');
	break;
	default:
		//
}

//If product token is in the cookies, extract it and copy demographic data over to eVars
if(typeof(edbTokens)!="undefined"&&edbTokens.productToken!=null){
	//These are still being defined by business. Double check latest requirements before implementing.
	//prop46 / eVar46 Membership Type
	//prop47 / eVar47 Member ID
	s.eVar47 = edbTokens.productToken.id;
	s.prop47 = s.eVar47;
	//prop48 / eVar48 Zip
}
// All conent under 29-95 needs to be categorized as under channel/SSL1 'entertainment',
// so add that to the front of the channel path...
if (awStrChannelPath.substr(0,5)=='29-95') {awStrChannelPath = 'entertainment :: ' + awStrChannelPath;}

// Re-assign processed channel path back to original WCM variable
// It is used in code for counting page views of article slideshows
omni_channelPath = awStrChannelPath;

// If "page not found", set Omniture pageType and do nothing else
if (awBoolIs404) {
	s.pageType = 'errorPage' // (Page Type - denotes a 404 error page)
	awOmniPagename=awOmniContentType='404ErrorPage';	// Values to
	awOmniSSL1 = 'Error';					// send with
	awOmniSSL2=awOmniSSL3=awOmniAuthor='';			// JumpTime beacon
} else {

	// Set catgorization variables based on path
	omni_categorize(awStrChannelPath);

	// Assign values to Omniture variables
	s.pageName = awOmniPagename// (Page Name)

	s.server = awOmniServer; // (Server)
	// These assignments are already made by call
	// to omni_categorize
	// s.channel = awOmniChannel; // (Channel)
	// s.hier1 = awOmniHier1; // (Hierarchy Level 1)
	// s.prop1 = awOmniSSL1; // (Site Section Level 1)
	// s.prop2 = awOmniSSL2; // (Site Section Level 2)
	// s.prop3 = awOmniSSL3; // (Site Section Level 3)
	// s.prop4 = awOmniSSL4; // (Site Section Level 4)
	s.prop5 = awOmniNumResults; // (# of Internal Search Results)
	s.prop6 = awOmniSearchTerms; // (Internal Search Terms)
	s.prop16 = awOmniPrintContent; // (Print Content)
	s.prop20 = awOmniAuthorTitle; // (Author Title)
	s.prop21 = awOmniPubDate; // (Content Pub Date)
	s.prop22 = awOmniTitle // (Content Title)
	s.prop23 = awOmniID // (Content ID)
	s.prop24 = awOmniContentType // (Content Type)
	s.prop25 = awOmniAuthor // (Content Creator/Author)
	s.prop26 = awOmniDaysSincePub; // (Days Since Publication)
	s.prop27 = awOmniQuery // (Query string)
	s.prop28 = awOmniDomain // (Domain (currently named URL))
	if(awOmniPageNumber.length>0){
		s.prop33 = awOmniPageNumber;
	}
	s.prop36 = awOmniHeadline // (Headline)
	s.prop42 = awOmniFullURL // (Full URL)
	s.prop43 = awOmniPremiumEndDate // (Premium End Date)
	s.prop44 = awOmniPremiumStatus // (Premium Content Status)
	if(awOmniBoolPremiumEvent){ // (Content Velocity Event)
		if(s.events){
			if(s.events!='event17'){s.events+=',event17';}
		} else {
			s.events='event17';
		}
	}
	s.prop45 = s.eVar45 = awOmniPubSource; // (Publication Source)

	// START Google Analytics Code ****/
	var _gaq = _gaq || [];

	_gaq.push(['_setAccount', ga_account]); // Our account
	_gaq.push(['_trackPageview']);
	
	if(awStrGAAcct2.length>0) {
		_gaq.push(['b._setAccount', awStrGAAcct2]), // 3rd-party partner account
		_gaq.push(['b._trackPageview']);
	}
	
	(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
	// END Google Analytics Code

	// START Nielsen Online SiteCensus V6.0
	// COPYRIGHT 2010 Nielsen Online
	(function () {
		var d = new Image(1, 1);
		d.onerror = d.onload = function () {
		d.onerror = d.onload = null;
		};
		d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-202808h&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
	})();
	// END Nielsen Online SiteCensus V6.0

}

// START Jump Time Beacon Code
var awJumpTimeAddlVars;
var awBoolAddRef=false;

function getakv2() {
	var strAkv2='';

	if (typeof yld_mgr.slots != 'undefined') {
		for(key in yld_mgr.slots) {
			if (yld_mgr.slots[key].cstm_content_cat_list) {
				strAkv2='&akv2='+escape(yld_mgr.slots[key].cstm_content_cat_list[0]);
				break;
			} 
		}
	}

	return strAkv2;
}	

function getCanonicalURL() {
	var strCanonical = "";
	var arrayLinks = document.getElementsByTagName("link");
        
	for (var intWhichLink = 0; intWhichLink < arrayLinks.length; intWhichLink++) {
		if (arrayLinks[intWhichLink].getAttribute("rel") == "canonical") {
			strCanonical = arrayLinks[intWhichLink].getAttribute("href");
			break;
		}
	}

	if (strCanonical.length == 0){strCanonical=awStrPageURL;}

	return strCanonical;
}

function sendJumpTimeBeacon() {
	if (typeof jt_account != "undefined" && typeof jt == 'function') {
		var strAddlVars = awJumpTimeAddlVars;
//		if (awBoolAddRef) {strAddlVars += '&aref='+escape(getCanonicalURL());}
		if (awBoolAddRef) {strAddlVars = strAddlVars.replace('&ct=article&','&ct='+escape('article slideshow')+'&') + '&aref='+escape(getCanonicalURL());}
		jt("http://hearst.jump-time.net/"+jt_account, strAddlVars, true);
		awBoolAddRef=true;
	}
}

function createJumpTimeBeacon() {
	if (typeof jt_account != "undefined") {
		awJumpTimeAddlVars = jt_account;
		awJumpTimeAddlVars += '&sec='+escape(awOmniSSL1);
		if (awOmniSSL1 != awOmniSSL2) {awJumpTimeAddlVars += '&ss='+escape(awOmniSSL2);}
		if (awOmniSSL2 != awOmniSSL3) {awJumpTimeAddlVars += '&sss='+escape(awOmniSSL3);}
		awJumpTimeAddlVars += '&ct='+escape(awOmniContentType);
		if (awOmniAuthor) {awJumpTimeAddlVars += '&tag='+escape(awOmniAuthor);}
		awJumpTimeAddlVars += '&caid='+escape(awOmniPagename);
		if (typeof yld_mgr != "undefined") {
			if (yld_mgr.content_topic_id_list) {awJumpTimeAddlVars += '&akv1='+escape(yld_mgr.content_topic_id_list[0]);}
 //			if (yld_mgr.cstm_content_cat_list) {awJumpTimeAddlVars += '&akv2='+escape(yld_mgr.cstm_content_cat_list[0]);}
			awJumpTimeAddlVars += getakv2();
			if (yld_mgr.cstm_sctn_list) {awJumpTimeAddlVars += '&akv3='+escape(yld_mgr.cstm_sctn_list[0]);}
 //			if (yld_mgr.site_section_name_list) {awJumpTimeAddlVars += '&akv3='+escape(yld_mgr.site_section_name_list[0]);}
		}
		jQuery(function($) {
			$.ajax({
				type: "GET",
				url: "http://beacon.jump-time.net/jt.js",
				dataType: "script",
				cache: true,
				success: function() {sendJumpTimeBeacon();}
			});
		});
	}
}

createJumpTimeBeacon();
// END Jump Time Beacon Code

// Destroy global variables defined in analyticsconfig.js
s_account=null;
s_exitlinks=null;
ga_account=null;

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code=s.t();if(s_code)document.write(s_code)

