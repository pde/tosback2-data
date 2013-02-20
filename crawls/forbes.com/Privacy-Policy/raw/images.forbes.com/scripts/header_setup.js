//Tania - 10/27/2006
//David Dunlop - 10/27/2006
//Robert Lin - 01/19/2007
//Danny H - 03/13/2007
//Alex S - 03/19/2007
//Dave Krunal - 05/11/2007
//Bradford Campeau-Laurion - 08/31/2007
//Shabana Abrez - 12/16/2009
//Alexander Shnayderman - 11/26/2007
//Andrew Dokko - 01/22/2008
//Soby Surendran 02/06/2008
//Amita Singh - 08/22/2008
//Amit Sazawal - 09/23/2008
//Sheeba B - 11/25/08
//Emil Isaakov - 02/11/2009
//Sheeba B - 03/20/09
//Ryan Huang - 05/03/2010
//Nina Gould - 01/23/2011
//Nina Gould - 01/28/2011
//Nina Gould - 2/24/2012 - REMOVED SECTIONS FROM NAV
//Madhavi Sawant - 02/19/2013

var forbes_dart = (function() {
  var ord = Math.floor(Math.random() * 1E10),
    conf, tile = 3, specialslotwithyear = /^(specialslot=.*)-\d{2}$/;

  function sitezone() {
    var sitezone = conf.site;
    if( conf.hasOwnProperty('zone') ) sitezone += "/" + conf.zone;
    return sitezone;
  }

  function keyvalues(additional) {
    var myTile;
    if('top' == additional.pos) myTile = 1;
    else if('rec' == additional.pos) myTile = 2;
    else myTile = tile++;

    var keyvalues = [];
    for(var key in additional) {
      keyvalues.push(key+'='+additional[key]);
    }

    return ";" + conf.keyvalues.concat(keyvalues,["tile="+myTile,"ord="+ord]).join(';');
  }

  return {
    ad: function(pos,sz) {
      var docwrite = true;
      if( arguments.length >= 3) docwrite = arguments[2];
      var tag = '<script type="text/javascript" src="http://ad.doubleclick.net/N7175/adj/' + sitezone() + keyvalues({pos:pos,sz:sz}) + '?"></script>';
      if( docwrite ) document.write(tag);
      else return tag;
    },
    config: function(config) {
      if( ! config.hasOwnProperty( 'site' ) ) config.site = 'fdc.forbes';
      if( ! config.hasOwnProperty( 'keyvalues' ) ) config.keyvalues = [];
      conf = config;
      for(var i=0;i<config.keyvalues.length;i++) {
        config.keyvalues[i] = config.keyvalues[i].replace(specialslotwithyear, "$1");
      }
    }
  };
})();

if(!document.referrer.match(/http:\/\/[^\/]*forbes.com/i)) {
	document.cookie = "wg_originalReferrer=" + document.referrer + ";path=/;domain=.forbes.com";
	document.cookie = "wg_originalDomain=;domain=.forbes.com; path=/;expires=Thu, 01-Jan-70 00:00:01 GMT";
}

document.write('<script src="http://images.forbes.com/scripts/util/CookieCutter.js" type="text/javascript"></script>');
var cssPre = "style_";
//icon
document.write('<link rel="SHORTCUT ICON" href="http://images.forbes.com/icon/favicon.ico">');

var slideshowExprForCenter =/(-slide|_slide).?\d*_?\d*_?\d*\.html/;
var slideshowExprSpecialForCenter = /_slideshow.?\d*_?\d*_?\d*\.html/;
var pageTypeForSlide = false;
if ((this.location.href).match(slideshowExprForCenter) || (this.location.href).match(slideshowExprSpecialForCenter)) {
pageTypeForSlide = true;
}

var storyExprForCenter = /\d{4}\/\d{2}\/\d{2}\//;
var pageTypeForStory = false;
if ((this.location.href).match(storyExprForCenter) ) {
pageTypeForStory = true;
}


var channelArr = new Array('home','business','investing','technology','entrepreneurs','opinions','leadership','lifestyle','lists');
var longChannelArr = new Array('Home','Business','Investing','Technology','Entrepreneurs','Op/Ed','Leadership','Lifestyle','Lists');

var searchTab = 0;
var noSearch = 0;

if(typeof hpType != "undefined") {
	var hpCookie = "home_usa";
	if(hpType=="europe") hpCookie = "home_europe";
	if(hpType=="asia") hpCookie = "home_asia";

	var hpCookieExpire = new Date();
	hpCookieExpire.setTime( hpCookieExpire.getTime() + (2*24*60*60*1000) );
	document.cookie='forbes_international='+hpCookie+';expires='+hpCookieExpire.toGMTString()+';path=/;domain=.forbes.com';
}

//Start Highlight home link
function findCookie(NameOfCookie) {  
	if( document.cookie.length > 0 ) { 
		begin = document.cookie.indexOf( NameOfCookie+"=" ); 
		if( begin != -1 ) { 
			begin += NameOfCookie.length + 1; 
			end = document.cookie.indexOf( ";", begin );
			if( end == -1 ) end = document.cookie.length;
			return unescape( document.cookie.substring( begin, end ));
		} 
	}
	return null; 
}
InternationalCookie = findCookie('forbes_international');

//Channel URL
if (!InternationalCookie){var channelURLArr = new Array('/','/business/','/investing/','/technology/','/entrepreneurs/','/opinions/','/leadership/','/lifestyle/','/lists/');
	}
else if (InternationalCookie == "home_usa"){	var channelURLArr = new Array('/home_usa','/business/','/investing/','/technology/','/entrepreneurs/','/opinions/','/leadership/','/lifestyle/','/lists/');
	}
else if (InternationalCookie == "home_europe"){ var channelURLArr = new Array('/home_europe','/business/','/investing/','/technology/','/entrepreneurs/','/opinions/','/leadership/','/lifestyle/','/lists/');
	}
else if (InternationalCookie == "home_asia"){	var channelURLArr = new Array('/home_asia','/business/','/investing/','/technology/','/entrepreneurs/','/opinions/','/leadership/','/lifestyle/','/lists/');
	}

function lightHomepagelink(page){
	var contain = ['<td id="intlhomepagelink" class="intlhomepagelink" nowrap>', "</td>"],
	separator = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
	links = {
		home_usa: {
			text: "U.S.",
			url: "home_usa/"
		},
		home_europe: {
			text: "EUROPE",
			url: "home_europe/"
		},
		home_asia: {
			text: "ASIA",
			url: "home_asia/"
		}
	},
	linkshtml = [];
	for (var link in links) {
		if (InternationalCookie == link)
			linkshtml.push('<font color="#000000">' + links[link].text + "</font>")
		else
			linkshtml.push('<a href="http://www.forbes.com/' + links[link].url + '" class="intlhomepagelink">' + links[link].text + "</a>")
	}
	contain.splice(1, 0, linkshtml.join(separator));
	document.write(contain.join(""))
}

//Set Forbes Logo URL
function setLogoURL(page){	
	if (!InternationalCookie) { 
		if (page == "isNotSlide")
			document.write('<a href="http://www.forbes.com"><img id="forbesLogo" src="http://images.forbes.com/media/assets/forbes_home_logo.gif" vspace="0" hspace="0" width="150" height="49" border="0"><\/a>');
		else
			document.write('<a href="http://www.forbes.com"><img id="forbesLogo" src="http://images.forbes.com/media/assets/forbes_home_logo.gif" vspace="3" width="150" height="49" border="0" hspace="30"><\/a>');	
	}
	else if (InternationalCookie == "home_usa"){
		if (page == "isNotSlide")
			document.write('<a href="http://www.forbes.com/home_usa/"><img id="forbesLogo" src="http://images.forbes.com/media/assets/forbes_home_logo.gif" vspace="0" hspace="0" width="150" height="49" border="0"><\/a>');
		else		
			document.write('<a href="http://www.forbes.com/home_usa"><img id="forbesLogo" src="http://images.forbes.com/media/assets/forbes_home_logo.gif" vspace="3" width="150" height="49" border="0" hspace="30"><\/a>');
	}
	else if (InternationalCookie == "home_europe"){
		if (page == "isNotSlide")
			document.write('<a href="http://www.forbes.com/home_europe/"><img id="forbesLogo" src="http://images.forbes.com/media/assets/forbes_home_logo.gif" vspace="0" hspace="0" width="150" height="49" border="0"><\/a>');
		else
			document.write('<a href="http://www.forbes.com/home_europe"><img id="forbesLogo" src="http://images.forbes.com/media/assets/forbes_home_logo.gif" vspace="3" width="150" height="49" border="0" hspace="30"><\/a>');
	}
	else if (InternationalCookie == "home_asia"){
		if (page == "isNotSlide")
			document.write('<a href="http://www.forbes.com/home_asia/"><img id="forbesLogo" src="http://images.forbes.com/media/assets/forbes_home_logo.gif" vspace="0" hspace="0" width="150" height="49" border="0"><\/a>');
		else
			document.write('<a href="http://www.forbes.com/home_asia"><img id="forbesLogo" src="http://images.forbes.com/media/assets/forbes_home_logo.gif" vspace="3" width="150" height="49" border="0" hspace="30"><\/a>');	
	}
	else
		if (page == "isNotSlide")
			document.write('<a href="http://www.forbes.com"><img id="forbesLogo" src="http://images.forbes.com/media/assets/forbes_home_logo.gif" vspace="0" hspace="0" width="150" height="49" border="0"><\/a>');
		else
			document.write('<a href="http://www.forbes.com"><img id="forbesLogo" src="http://images.forbes.com/media/assets/forbes_home_logo.gif" vspace="3" width="150" height="49" border="0" hspace="30"><\/a>');	
}
//End Highlight home link

//pagetype
thisURL = this.location.href;
if ( typeof displayedSection != "undefined" && displayedSection == "searchhome" && ( thisURL.indexOf( "/find" ) != -1 || thisURL.indexOf( "/web" ) != - 1 || thisURL.indexOf( "/blogs" ) != -1 )) {
	 pageType = "search";
}
else if (thisURL.indexOf('beta.forbes.com')>-1) {
	if (thisURL.indexOf('http://')>-1) thisPreURL = 'http://beta.forbes.com';
	else  thisPreURL = 'beta.forbes.com';
	thisURL = thisURL.substr(thisPreURL.length);
}
else if (thisURL.indexOf('www.forbes.com')>-1) {
	if (thisURL.indexOf('http://')>-1) thisPreURL = 'http://www.forbes.com';
	else  thisPreURL = 'www.forbes.com';
	thisURL = thisURL.substr(thisPreURL.length);
}
else if (thisURL.indexOf('clipmarks.forbes.com')>-1) {
	if (thisURL.indexOf('http://')>-1) thisPreURL = 'http://clipmarks.forbes.com';
	else  thisPreURL = 'clipmarks.forbes.com';
	thisURL = thisURL.substr(thisPreURL.length);
	pageType = "clipmarks";
}
else if (thisURL.indexOf('qa.forbes.com/cms/template')>-1) {
	if (thisURL.indexOf('http://')>-1) thisPreURL = 'http://qa.forbes.com/cms/template';
	else  thisPreURL = 'qa.forbes.com/cms/template';
	thisURL = thisURL.substr(thisPreURL.length);
}
else if (thisURL.indexOf('qa.forbes.com')>-1) {
	if (thisURL.indexOf('http://')>-1) thisPreURL = 'http://qa.forbes.com';
	else  thisPreURL = 'qa.forbes.com';
	thisURL = thisURL.substr(thisPreURL.length);
}
else if (thisURL.indexOf('members.forbes.com')>-1) {
         if (thisURL.indexOf('http://')>-1) thisPreURL = 'http://members.forbes.com';
         else  thisPreURL = 'members.forbes.com';
         thisURL = thisURL.substr(thisPreURL.length);
}
if (thisURL.indexOf('index.html')>-1) thisURL = thisURL.substr(0,thisURL.indexOf('index.html'));
if (thisURL.indexOf('index.shtml')>-1) thisURL = thisURL.substr(0,thisURL.indexOf('index.shtml'));
if (thisURL.indexOf('index.jhtml')>-1) thisURL = thisURL.substr(0,thisURL.indexOf('index.jhtml'));
if (thisURL.indexOf('index.jsp')>-1) thisURL = thisURL.substr(0,thisURL.indexOf('index.jsp'));
if (thisURL.indexOf('?')>-1) thisURL = thisURL.substr(0,thisURL.indexOf('?'));
var storyExpr = /\d{4}\/\d{2}\/\d{2}\//;
var magExpr = /(forbes|forbesglobal|global|asap|best|fyi)\/\d{4}\/\d{4}\//;
var listExpr = /lists\/\d{4}\/\d+\//;
var sectionExpr = /\/[a-z]+\/[a-z]+/;
var channelExpr = /\/[a-z]+/;

if (document.referrer.indexOf("/cionetwork") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {

        OAS_sitepage = "forbes.com/specialslot/cionetwork";

} else if (document.referrer.indexOf("/businessvisionaries") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {

        OAS_sitepage = "forbes.com/specialslot/bizviz";

} else if (document.referrer.indexOf("/promising-companies") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {

        OAS_sitepage = "forbes.com/specialslot/promising-companies-09";

} else if (document.referrer.indexOf("/breakthroughs") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {

        OAS_sitepage = "forbes.com/technology/breakthroughs/index.jhtml";

} else if (((this.location.href.indexOf("Financial+Adviser+Network") != -1) || document.referrer.indexOf("/advisernetwork") != -1) && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {

    OAS_sitepage = "forbes.com/specialslot/financialaunch08";

} else if (this.location.href.indexOf("forbes-woman-power-women") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
	OAS_sitepage = "forbes.com/forbeswoman/power-women/story";
} else if ((this.location.href.indexOf("forbes-woman-leadership") != -1 || this.location.href.indexOf("forbes-woman-careers") != -1) && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
	OAS_sitepage = "forbes.com/forbeswoman/leadership/story";
} else if (this.location.href.indexOf("forbes-woman-entrepreneurs") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
	OAS_sitepage = "forbes.com/forbeswoman/entrepreneurs/story";
} else if (this.location.href.indexOf("forbes-woman-style") != -1 && this.location.href.indexOf("2009/07/15/engagement-weddings-diamonds-forbes-woman-style-retail_slide.html") == -1 && this.location.href.indexOf("2009/07/15/fashion-designer-french-forbes-woman-style_slide.html") == -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
	OAS_sitepage = "forbes.com/forbeswoman/style/story";
} else if ((this.location.href.indexOf("forbes-woman-health") != -1 || this.location.href.indexOf("forbes-woman-well-being") != -1) && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
	OAS_sitepage = "forbes.com/forbeswoman/well-being/story";
} else if (this.location.href.indexOf("forbes-woman-net-worth") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
	OAS_sitepage = "forbes.com/forbeswoman/net-worth/story";
} else if (this.location.href.indexOf("forbes-woman-time") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
	OAS_sitepage = "forbes.com/forbeswoman/time/story";
} else if (document.referrer.indexOf("/business-aviation") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
        OAS_sitepage = "forbes.com/business/aviation/story";
} 
// Added for SAP Business Channel Take-Over 2010-10-05 - REMOVE ONCE DONE (MCD)
else if (document.referrer.indexOf("/business") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
        OAS_sitepage = "forbes.com/business";
} else if (document.referrer.indexOf("/autos") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
        OAS_sitepage = "forbes.com/business";
} else if (document.referrer.indexOf("/business/billionaires") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
        OAS_sitepage = "forbes.com/business";
} else if (document.referrer.indexOf("/energy") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
        OAS_sitepage = "forbes.com/business";
} else if (document.referrer.indexOf("/logistics") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
        OAS_sitepage = "forbes.com/business";
} else if (document.referrer.indexOf("/entertainment") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
        OAS_sitepage = "forbes.com/business";
} else if (document.referrer.indexOf("/healthcare") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
        OAS_sitepage = "forbes.com/business";
} else if (document.referrer.indexOf("/business/sportsmoney") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
        OAS_sitepage = "forbes.com/business";
} else if (document.referrer.indexOf("/wallstreet") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
        OAS_sitepage = "forbes.com/business";
} else if (document.referrer.indexOf("/beltway") != -1 && (thisURL.match(storyExpr) || thisURL.match(magExpr))) {
        OAS_sitepage = "forbes.com/business";
}

// 2008-06-26 - Added to force top tech story on tech channel page to have SAP ads - NO LONGER NEEDED
// document.write("<scr" + "ipt language='JavaScri" + "pt' src='http://images.forbes.com/scripts/top_tech_story.js'></scr" + "ipt>");

//2010-02-11 - Added to force topstories on the Fact And Comment page to have the proper sitepage for ad targeting
document.write("<scr" + "ipt language='JavaScri" + "pt' src='http://images.forbes.com/scripts/topFCstories.js'></scr" + "ipt>");

// 2009-02-06 - Added to force topstories on the homepage to have the proper sitepage for ad targeting
document.write("<scr" + "ipt language='JavaScri" + "pt' src='http://images.forbes.com/scripts/topstories.js'></scr" + "ipt>");

// 2010-05-03 - Added to force topratedstories on the homepage to have the proper sitepage for ad targeting
//document.write("<scr" + "ipt language='JavaScri" + "pt' src='http://images.forbes.com/scripts/topRatedStories.js'></scr" + "ipt>");

//For sales leadership we are overriding as a fix  02 Nov 2010
if (thisURL.indexOf("2010/10/21/public-speaking-selling-leadership-sales-rein.html") != -1) {
	OAS_sitepage = "forbes.com/salesleadership/story/id3116417481";
}

if((thisURL.indexOf(".com") == -1) && (thisURL.indexOf(".net") == -1) && (thisURL.indexOf(".org") == -1)) {
	if ((thisURL.indexOf("/home") > -1) && (thisURL.indexOf("html")==-1)) pageType = "home";
	
	if((typeof pageType == "undefined") || (!pageType)) {
		if (thisURL.match(storyExpr)) pageType = "story";
		else if (thisURL.match(magExpr)) pageType = "magstory";
		else if (thisURL.indexOf("_land.html")!=-1) pageType = "lander";
		else if (thisURL.indexOf("/richlist")!=-1) pageType = "lander";
		else if (thisURL.indexOf("/rich400")!=-1) pageType = "lander";
		else if (thisURL.indexOf("/400richest")!=-1) pageType = "lander";
		else if (thisURL.indexOf("/worldsrichest")!=-1) pageType = "lander";
		else if (thisURL.indexOf("thought-leaders")!=-1 && !thisURL.match(magExpr) && !thisURL.match(storyExpr) && !thisURL.match(listExpr)) { pageType = "thought-leaders"; }
		else if (thisURL.match(listExpr)) pageType = "list";
		else if (thisURL.match(sectionExpr) && thisURL.indexOf("html")==-1) pageType = "section";
		else if (thisURL.match(channelExpr) && thisURL.indexOf("html")==-1) {
			if (thisURL.lastIndexOf("/")==thisURL.length-1) thisURL = thisURL.substr(0,thisURL.length-2);
			thisURL = thisURL.substr(0,thisURL.lastIndexOf("/"));
			if (thisURL.length == 0) pageType = "channel";
			else pageType = "generic";
		}
		else  if (thisURL.length<2) pageType = "home";
		else if (typeof wincol_generic_layout != "undefined") {
			if (wincol_generic_layout == "window") pageType = "generic window";
			else if (wincol_generic_layout == "column") pageType = "generic column";
			else pageType = "generic";
		}
		else pageType = "generic";
	}
} else if (typeof wincol_generic_layout != "undefined") {
	if (wincol_generic_layout == "window") pageType = "generic window";
	else if (wincol_generic_layout == "column") pageType = "generic column";
	else pageType = "generic";
} else pageType = "generic";

// css for centering
if(typeof fdc_nocss == 'undefined') {
	if (navigator.appName.indexOf("Netscape") != -1) { 
		
		if ((typeof pageType != 'undefined' && pageType == "home") || typeof fdc_center != "undefined"){
			document.write ('<LINK REL="STYLESHEET" TYPE="text/css" HREF="http://images.forbes.com/css/'+ cssPre + 'ns_home.css">');
		} else {
			document.write ('<LINK REL="STYLESHEET" TYPE="text/css" HREF="http://images.forbes.com/css/'+ cssPre + 'ns.css">');
		}
	} else {
			if((typeof pageType != 'undefined' && pageType == "home") || typeof fdc_center != "undefined") {
			document.write ('<LINK REL="STYLESHEET" TYPE="text/css" HREF="http://images.forbes.com/css/'+ cssPre + 'ie_home.css">');
		} else {
			document.write ('<LINK REL="STYLESHEET" TYPE="text/css" HREF="http://images.forbes.com/css/'+ cssPre + 'ie.css">');
		}
		
	}
}

var centBan = "CenterBanner";

//l0g1kh4k t0 0v3rr1d3 g3n3r1c
if ( typeof displayedSection != "undefined" && displayedSection == "searchhome" && ( thisURL.indexOf( "/find" ) != -1 || thisURL.indexOf( "/web" ) != -1 || thisURL.indexOf( "/blogs" ) != -1 )) {
         pageType = "search";
}

if (pageType == "home") {
	cssPre = "";
	centBan = "CenterBannerHome";
	OAS_listpos = "AdController,BigBanner,Block,x5,RightUndQuotes,x88,x89,AutosModule,SponsorLogo,x1";
} else if (pageType == "search") {
	OAS_listpos = "AdController,BigBanner,Block,x102,RightUndQuotes,StoryLogo,x88,x89,x5,x113,x112,Loge,x1";
} else if (pageType == "channel") {
	//this actually covers channel AND section setup (some sections follow channel url structure), also includes rightmiddle for nonresolving friendlies
	var channelListposWincol = "Block";
	if ( this.location.href.indexOf('http://bfn.forbes.com') != -1 || this.location.href.indexOf('http://www.forbes.com/static_html/econ_calendars/economic_calendar.html') != -1 || this.location.href.indexOf('http://www.forbes.com/businessvisionaries') != -1 || this.location.href.indexOf('http://www.forbes.com/fdc/sitemap.html') != -1 || this.location.href.indexOf('http://www.forbes.com/fdc/help.html') != -1 || this.location.href.indexOf('http://www.forbes.com/fdc/contact.html') != -1 || this.location.href.indexOf('http://www.forbes.com/magazines') != -1 || this.location.href.indexOf('http://www.forbes.com/mobile') != -1 || this.location.href.indexOf('http://www.forbes.com/fdc/rss.html') != -1 || this.location.href.indexOf('http://www.forbes.com/fdc/reprints/Reprints.jhtml') != -1 || this.location.href.indexOf('http://www.forbes.com/fdc/subservices.html') != -1 || (this.location.href.indexOf('http://www.forbes.com/forbes') != -1 && this.location.href.indexOf('forbeswoman') == -1 && this.location.href.indexOf('forbesinvestorteam') == -1) || this.location.href.indexOf('http://www.forbes.com/forbesglobal') != -1 || this.location.href.indexOf('http://www.forbes.com/fdc/privacy.html') != -1 || this.location.href.indexOf('http://www.forbes.com/fdc/terms.html') != -1) { channelListposWincol = "RightMiddle"; }
	OAS_listpos = "AdController,BigBanner," + channelListposWincol + ",AlertsLogo,AutosModule,x98,x99,RightUndQuotes,StoryLogo,SponsorLogo,x88,x5,Loge,x1";
} else if (pageType == "section") {
    OAS_listpos = "AdController,BigBanner,Block,AlertsLogo,AutosModule,x98,x99,LeftBottom3,LeftBottom4,RightUndQuotes,StoryLogo,SponsorLogo,x88,x5,Loge,x1";
} else if (pageType == "list") {

        if ((typeof sponsor=="undefined") || (sponsor.length==0)) {
            sponsor = "";
        } else {
            sponsor = "/" + sponsor;
        }
if (typeof listId == "undefined") listId = thisURL.substr(12,3);
if(listId.indexOf('/')>-1) listId = listId.substr(0,2);
	
        OAS_sitepage = "forbes.com/lists/ListID" + listId + "/results" + sponsor;

                if ((thisURL.indexOf("lists/2008/86") != -1 && thisURL.indexOf("The-Philippines-40") == -1) || (thisURL.indexOf("lists/2008/53") != -1 && thisURL.indexOf("The-Celebrity-100") == -1) || (thisURL.indexOf("lists/2008/74") != -1 && thisURL.indexOf("The-400-Richest-Chinese") == -1) || (thisURL.indexOf("lists/2008/56") != -1 && thisURL.indexOf("Asian-Altruists") == -1) || (thisURL.indexOf("lists/2008/78") != -1 && thisURL.indexOf("Australia-and-New-Zealands-40-Richest") == -1) || (thisURL.indexOf("lists/2008/87") != -1 && thisURL.indexOf("Taiwans-Richest") == -1) || (thisURL.indexOf("lists/2008/82") != -1 && thisURL.indexOf("Hong-Kongs-40-Richest") == -1) || (thisURL.indexOf("lists/2007/77") != -1 && thisURL.indexOf("Indias-Richest") == -1) || (thisURL.indexOf("lists/2008/77") != -1 && thisURL.indexOf("Indias-Richest") == -1) || (thisURL.indexOf("lists/2008/73") != -1 && thisURL.indexOf("Japans-Richest") == -1) || (thisURL.indexOf("lists/2008/83") != -1 && thisURL.indexOf("Koreas-Richest") == -1) || (thisURL.indexOf("lists/2008/84") != -1 && thisURL.indexOf("Malaysias-Richest") == -1) || (thisURL.indexOf("lists/2008/6") != -1 && thisURL.indexOf("Best-Countries-for-Business") == -1)) {

                OAS_listpos = "AdController,BigBanner,Block,StoryLogo,x1,x100";
        } else {
                OAS_listpos = "AdController,BigBanner,RightMiddle,StoryLogo,x1,x100";
        }


} else if (pageType == "lander") {
        //lander_setup.js

                OAS_listpos = "AdController,BigBanner,RightMiddle,x5,StoryLogo,x1,x100";
	//end lander_setup.js
} else if ((pageType == "magstory") || (pageType == "story")) {
	// wincol.js
	var fdcQuotesURL = "/cms/components/wincol/quotes_js.jhtml";
	var fdcWincolThreshhold;
	var fdcWincolResult;
	var fdcWincolStyle;
		//  Set this to the % of frequency templates
		//  will be rendered as columns.
		//  eg. 30 = 30% column (and 70% windows).
	var fdcWincolDefault = 5;
	var OAS_listpos = "";
	var fdcDisableCallbacks = 1;

	fdcWincolDecideTargetting();

} else if(pageType == "generic window") {
	OAS_listpos = "AdController,Block,BigBanner,AutosModule,x83,x1,x100";
} else if(pageType == "generic column") {
	OAS_listpos = "AdController,RightMiddle,BigBanner,x106,x1,x100";
} else if(pageType == "clipmarks") {
	OAS_listpos = "AdController,BigBanner,x1,x100";
} else if(pageType == "thought-leaders") {
	OAS_listpos = "AdController,BigBanner,Block,RightMiddle,SponsorLogo,x5";
}

function fdcWincolComputeListpos(template) {
	if(template) {
		if(template == 'wide') {
			OAS_listpos = "AdController,BigBanner,RightMiddle,x5,"+
				"Loge,x89,StoryLogo,AlertsLogo,LeftBottom,LeftBottom2,LeftBottom3,LeftBottom4,"+
				"x85,x91,x92,x1,x100";
        	} else if(template == 'xWide') {
        	        OAS_listpos = "AdController,BigBanner,x5,StoryLogo,Loge,x89,x1,x100";
        	} else {
			var largeLeft = "Block";
        	        if(fdcWincolStyle == "column") largeLeft = "RightMiddle";
        	        OAS_listpos = "AdController,BigBanner,"+largeLeft+",x5,StoryLogo,"+
				"x88,x89,AlertsLogo,LeftBottom,LeftBottom2,LeftBottom3,LeftBottom4,Loge,AutosModule,x83,x85,x91,x92,x1,x100,x70,x112,x87";
        	}
	} else {
		if ((pageType == "magstory") || (pageType == "story")) {
			url = '' + window.location;
			if(fdcWincolStyle=="window") {
				// DO NOT CHANGE WITHOUT APPROVAL
				OAS_listpos = "AdController,Block,BigBanner,x5,LeftBottom,LeftBottom2,x102,StoryLogo,x88,x89,LeftBottom3,LeftBottom4,AlertsLogo,AutosModule,StoryBotLogo,x83,Loge,x85,x91,x92,x1,x100";
			}
			else {
				// DO NOT CHANGE WITHOUT APPROVAL
				OAS_listpos = "AdController,RightMiddle,BigBanner,x5,LeftBottom,LeftBottom2,x102,x106,StoryLogo,x88,x89,LeftBottom3,LeftBottom4,AlertsLogo,StoryBotLogo,x83,Loge,x85,x91,x92,x1,x100";
			}
		}
	}
}
function fdcWincolAlert(){
	testStr = "";
	if(typeof pageType != "undefined") testStr = testStr + "pagetype: " + pageType  + "\n";
	if(typeof OAS_sitepage != "undefined") testStr = testStr + "OAS_sitepage: " + OAS_sitepage  + "\n";
	if(typeof OAS_listpos != "undefined") testStr = testStr + "OAS_listpos: " + OAS_listpos  + "\n";
	if(typeof OAS_query != "undefined") testStr = testStr + "OAS_query: " + OAS_query  + "\n";
	if(typeof fdcWincolThreshhold != "undefined") testStr = testStr + "minimum for window: " + fdcWincolThreshhold  + "\n";
	if(typeof fdcWincolResult!= "undefined") testStr = testStr + "result: " + fdcWincolResult  + "\n";
	if(typeof fdcWincolStyle != "undefined") testStr = testStr + "style: " + fdcWincolStyle  + "\n";
	alert(testStr);
}

	function fdcWincolDecideTargetting() {
        var url = window.location + "";
        // use URL for OAS_sitepage value if URL matches following
        if ( url.indexOf("/topstories/") != -1 ) { fdcWincolComputeSitepage(); }
        else { var OAS_sitepage = ""; }
	}
	function fdcWincolComputeSitepage(path){
		url = '' + window.location;
		start = url.indexOf('//') + 2;
		start = url.indexOf('/',start) + 1;
		end = url.indexOf('?'); if(end==-1){end=url.length}
		if(typeof path != "undefined") { OAS_sitepage = 'forbes.com/' + path + url.substring(start, end); }
		else { OAS_sitepage = 'forbes.com/' + url.substring(start, end); }
	}
	function fdcWincolComputeStyle() {
		var url = window.location + "";
		 // 100 = all columns
		// 0 = all windows
		if (url.indexOf("/column/") != -1 )             { fdcWincolThreshhold = 100; }
		else if (url.indexOf("/window/") != -1 )        { fdcWincolThreshhold = 0; }
		else if (typeof storyTemplateType != 'undefined'){ if (storyTemplateType=='iivideo') fdcWincolThreshhold = 100; }
		
		// Wincol overrides for stories by channel/section
                else if (displayedSection == "claytonchristensen" || (document.referrer.indexOf("/claytonchristensen") != -1 && document.referrer.indexOf(".html") == -1))       { fdcWincolThreshhold = 0; }
                else if (displayedSection == "business intelligence" || (document.referrer.indexOf("/business-intelligence") != -1 && document.referrer.indexOf(".html") == -1))       { fdcWincolThreshhold = 0; }
                else if (displayedSection == "fact and comment" || (document.referrer.indexOf("/fact-and-comment") != -1 && document.referrer.indexOf(".html") == -1))       { fdcWincolThreshhold = 0; }
		else if (displayedSection == "logistics" || (document.referrer.indexOf("/logistics") != -1 && document.referrer.indexOf(".html") == -1))       { fdcWincolThreshhold = 10; }
                else if (displayedSection == "thought leaders" || (document.referrer.indexOf("/thought-leaders") != -1 && document.referrer.indexOf(".html") == -1))   { fdcWincolThreshhold = 50; }
                else if (displayedSection == "cmonetwork") { fdcWincolThreshhold = 0; }
                else if (displayedSection == "intelligentinvesting") { fdcWincolThreshhold = 0; }
                else if (displayedSection == "salesleadership") { fdcWincolThreshhold = 0; }
                else if (displayedSection == "intelligenttech") { fdcWincolThreshhold = 0; }
                
                else if (displayedChannel == "personalFinance" || (document.referrer.indexOf("/investing") != -1 && document.referrer.indexOf(".html") == -1))       { fdcWincolThreshhold = 10; }
                else if (displayedChannel == "markets" || (document.referrer.indexOf("/investing") != -1 && document.referrer.indexOf(".html") == -1))       { fdcWincolThreshhold = 0; }
                else if (displayedSection == "washington" || (document.referrer.indexOf("/beltway") != -1 && document.referrer.indexOf(".html") == -1))       { fdcWincolThreshhold = 50; }
		else if (displayedChannel == "business" || (displayedChannel == "entrepreneurs" && displayedSection != "ampc")) { fdcWincolThreshhold = 30;  }
		else if (displayedChannel == "entrepreneurs" && displayedSection == "ampc") { fdcWincolThreshhold = 90;  }
                else if (displayedChannel == "technology" && displayedSection == "security"){fdcWincolThreshhold = 40; }
                else if (displayedChannel == "technology" ) { fdcWincolThreshhold = 10;  }


		// Wincol overrides for stories by referrer

		// Wincol overrides by author
		else if (fdcWincolCheckByMeta("author", "Ken Fisher")) { fdcWincolThreshhold = 0; }

		// Wincol overrides for stories by URL
		else if (url.indexOf("women-style") != -1 || url.indexOf("woman-style") != -1 || url.indexOf("flew") != -1 || url.indexOf("2009/03/31/travel-perks-executives-women-leadership-trips_slide") != -1)        { fdcWincolThreshhold = 0; }
		else if (url.indexOf("power-09") != -1) { fdcWincolThreshhold = 0; }

		else                                            { fdcWincolThreshhold = fdcWincolDefault; }
	
                // Master override for medical tech special report
                if (url.indexOf("medical-tech-09") != -1 || url.indexOf("2009/09/24/sohaib-abbasi-data-intelligent-technology-informatica.html") != -1 || url.indexOf("global/2009/0921/entrepreneurs-meiloo-china-helping-with-heath-care.html") != -1 || url.indexOf("2009/09/17/robots-health-care-technology-breakthroughs-telehealth.html") != -1 || url.indexOf("2009/07/30/health-wellness-internet-lifestyle-health-online-facebook.html") != -1 || url.indexOf("2009/04/23/health-internet-records-technology-personal-tech-health.html") != -1 || url.indexOf("forbes/2009/1019/forbes-400-rich-list-09-soon-shiong-health-cancer-man.html") != -1) {
                        fdcWincolThreshhold = 0;
                }

                // Master override for Money for Life special report
                if ((url.indexOf("money-life-10") != -1 || (url.indexOf("2010/01/25/retirement-college-planning-mortgage-personal-finance-moneylife_land.html") != -1 )||( url.indexOf("2010/01/25/tips-first-time-homebuyer-personal-finance-mortgage.html") != -1 )|| (url.indexOf("2010/01/25/expecting-parents-money-personal-finance-new-parents.html") != -1) || (url.indexOf("2010/01/25/child-credit-childcare-college-irs-personal-finance-tax-breaks-for-kids.html") != -1) || (url.indexOf("2010/01/25/starting-first-business-personal-finance-first-business.html") != -1 )|| (url.indexOf("2010/01/25/college-savings-529-personal-finance-529.html") != -1)) || url.indexOf("2010/01/25/asset-allocation-retirement-personal-finance-retire.html") != -1||url.indexOf("2009/07/21/freelance-taxes-jobs-personal-finance-freelancers.html") != -1) {
                        fdcWincolThreshhold = 0;
                }
    // Master override for Money life tax
                if (url.indexOf("money-life-tax-10") != -1 || (url.indexOf("2010/02/16/tax-credits-planning-1040-irs-personal-finance-money-life-tax_land.html") != -1 )||( url.indexOf("2010/02/16/credit-cards-roth-rebates-personal-finance-tax-free-income.html") != -1 )|| (url.indexOf("2010/02/16/tax-deduction-mba-education-personal-finance-robert-wood.html") != -1) || (url.indexOf("2010/02/16/tax-credits-windows-solar-power-personal-finance-green-tax-breaks.html") != -1) || (url.indexOf("2010/02/16/tax-cancelled-debt-income-mortgage-personal-finance-robert-wood.html") != -1 )|| (url.indexOf("2010/02/16/irs-1040-tax-preparers-personal-finance-bad-tax-pros.html") != -1) || url.indexOf("2010/01/25/child-credit-childcare-college-irs-personal-finance-tax-breaks-for-kids.html") != -1|| url.indexOf("2010/02/16/custody-exemption-alimony-401k-personal-finance-divorce-tax-tips.html") != -1|| url.indexOf("2010/02/16/taxes-adult-children-gifts-credits-personal-finance-boomerang-kids.html") != -1|| url.indexOf("2010/02/16/vacation-primary-home-capital-gains-personal-finance-second-home-taxes.html") != -1|| url.indexOf("2010/02/16/irs-high-income-millionaire-audits-personal-finance-pwc-tonkovic.html") != -1|| url.indexOf("2010/02/16/taxes-traditional-roth-ira-rmd-personal-finance-roth-conversions-2010.html") != -1|| url.indexOf("2010/02/16/tax-credits-stimulus-seniors-personal-finance-2009-1040-traps") != -1|| url.indexOf("2009/11/03/audit-proof-tax-return-irs-personal-finance-wood.html") != -1|| url.indexOf("2010/01/27/irs-1099-computer-matching-audits-personal-finance-robert-wood.html") != -1) {
                        fdcWincolThreshhold = 0;
                }

                // Master override for best small companies special report
		if (url.indexOf("americas-best-company-10") != -1) { fdcWincolThreshhold = 0; }
                if (url.indexOf("small-companies-09") != -1) {
                        fdcWincolThreshhold = 0;
                }
		if ((url.indexOf("/2009/10/15/ten-best-retirement-havens-personal-finance-retire-abroad.html") != -1) ||(url.indexOf("/2009/10/15/retirement-havens-taxes-medicare-roth-retirement-09_land.html") != -1) || (url.indexOf("/2009/10/15/ten-best-retirement-havens-personal-finance-retire-abroad_slide_2.html") != -1) || (url.indexOf("/2009/10/15/retire-abroad-medicare-insurance-personal-finance-healthcare.html") != -1) || (url.indexOf("/forbes/2009/1102/foreign-retirement-france-italy-best-places-to-retire.html") != -1) || (url.indexOf("/2009/10/15/power-attorney-astor-estate-planning-personal-finance-seven-steps.html") != -1) || (url.indexOf("/2009/10/15/tax-deferred-roth-ira-retirement-personal-finance-bernicke.html1") != -1) || (url.indexOf("/2009/10/01/net-worth-wealth-assets-rank-personal-finance-net-worth-calculator.html") != -1) || (url.indexOf("/2009/10/15/social-security-benefit-personal-finance-2009-benefits.html") != -1) || (url.indexOf("/2009/10/15/social-security-benefit-personal-finance-2009-benefits.html") != -1) || (url.indexOf("/2009/09/14/retirement-moves-happiness-personal-finance-happiness.html") != -1) || (url.indexOf("/2009/10/06/home-equity-seniors-fha-personal-finance-reverse-mortgage.html") != -1))
		{
			fdcWincolThreshhold = 0;
		}

                //Special slot meetings-10
                if(typeof displayedSpecialSlot != "undefined" && (displayedSpecialSlot == "meetings-10" || displayedSpecialSlot == "meetings-09" || displayedSpecialSlot == "money-life-tax-10" || displayedSpecialSlot == "pf-money-milestones-10" ||displayedSpecialSlot =="fw-money-milestones-10" || displayedSpecialSlot =="virtualization-10" || displayedSpecialSlot =="travel-guide-10" || displayedSpecialSlot == "human-capital-10" || displayedSpecialSlot == "fictional-15-10" || displayedSpecialSlot == "global-2000-10" || displayedSpecialSlot == "human-capital-10"  || displayedSpecialSlot == "platinum-brands-bbs-10" || displayedSpecialSlot == "business-aviation-10" ||  displayedSpecialSlot == "retirement-10" || displayedSpecialSlot == "sustainable-tech-10" || displayedSpecialSlot == "cloud-computing-10" || displayedSpecialSlot == "serial-startups-10" || displayedSpecialSlot == "money-life-retirement-10" || displayedSpecialSlot == "innovators-10" || displayedSpecialSlot == "data-companies-10" || displayedSpecialSlot == "human-capital-2-10" || displayedSpecialSlot == "self-made-10" || displayedSpecialSlot == "powerful-people-10" || displayedSpecialSlot == "beyond-balance-10" || displayedSpecialSlot == "gift-guide-10" || displayedSpecialSlot == "on-road-11" || displayedSpecialSlot == "heroes-11" || displayedSpecialSlot == "growth-lessons-11" || displayedSpecialSlot == "retirement-income-11" || displayedSpecialSlot == "money-guide-11" || displayedSpecialSlot == "cmo-network" || displayedSpecialSlot == "intelligent-investing-11"))  {
                        fdcWincolThreshhold = 0;
                }
                
                if(typeof displayedSpecialSlot != "undefined" && displayedSpecialSlot == "small-biz-toolkit-10"){
                        fdcWincolThreshhold = 90;
                }
                
                if(typeof displayedSpecialSlot != "undefined" && (displayedSpecialSlot == "business-survival-10" || displayedSpecialSlot == "future-design-10" || displayedSpecialSlot == "Game-changers-10" || displayedSpecialSlot == "career-change-10")){
                        fdcWincolThreshhold = 30;
                }
                
                if(typeof displayedSpecialSlot != "undefined" && (displayedSpecialSlot == "best-under-billion-09"|| displayedSpecialSlot == "asia-under-billion-10" || displayedSpecialSlot == "international-investing-10")){
                        fdcWincolThreshhold = 50;
                }
                
                if(typeof displayedSpecialSlot != "undefined" && (displayedSpecialSlot == "best-life-10" || displayedSpecialSlot == "smart-luxury-10")){
                        fdcWincolThreshhold = 20;
                }
                
                if(typeof displayedSpecialSlot != "undefined" && (displayedSpecialSlot == "small-biz-toolkit-10")){
                        fdcWincolThreshhold = 5;
                }
                
                if(typeof displayedSpecialSlot != "undefined" && (displayedSpecialSlot == "private-companies-10" || displayedSpecialSlot == "personal-best-10" )){
                        fdcWincolThreshhold = 25;
                }
                
                if(typeof displayedSpecialSlot != "undefined" && displayedSpecialSlot == "money-for-life-2011-1"){
                        fdcWincolThreshhold = 70;
                }
             
		fdcWincolResult = Math.round( Math.random() * 99 );
		fdcWincolStyle = "window";
	}
	function fdcWincolCheckByMeta(name, content) {
	  var metas = document.getElementsByTagName('META');
	  var i;
	  for (i = 0; i < metas.length; i++) {
	    if (metas[i].getAttribute('NAME') == name) { break; }
	  }
	  if (typeof(metas[i]) != "undefined" && metas[i].getAttribute('CONTENT') == content) {
		return true;
	  } else {
	 	return false;
	  }
	}
	function fdcWincolStart(){
		if (fdcWincolStyle=="window") {
  	   		_startWindow();
		}
		else {
		    	_startColumn();
		}
	}
	function fdcWincolAd(){
		if (fdcWincolStyle=="window"){_adWindow();}
		else{_adColumn();}
	}
	function fdcWincolEnd(){
		if (fdcWincolStyle=="window")	{_endWindow();}
		else				{_endColumn();}
	}
	function fdcWincolSwap(orig, repl){
		var span = document.getElementById(orig);
		if(span==null){return;}
		var newspan = document.getElementById(repl);
		if(newspan==null){return;}
		while(span.childNodes[0]) { span.removeChild(span.childNodes[0]); }
		span.parentNode.replaceChild(newspan,span);
	}
	function _getBuster(){
		var date = new Date();
		var buster =  "" + date.getYear() + date.getMonth() + date.getDate() + 
				date.getHours() + date.getMinutes() + date.getSeconds();
		return buster;
	}
	function _startWindow(){
		document.write("<CENTER><span class=\"smallgreytxt\">ADVERTISEMENT</span>");
	}
	function _adWindow(){
		document.write('<div class="dynamicadlocation" id="dynamicAdWinDiv">'+forbes_dart.ad('rec', '300x250,336x600,336x850,336x280', false)+'</div>');
	}
	function _endWindow(){
		document.write("</CENTER>");
		//document.write("<FONT COLOR=white>end ad</FONT><BR>");
		var ver = navigator.appName;
		var num = parseInt(navigator.appVersion);
		var myagent = navigator.userAgent.toLowerCase();
		if ((ver == "Microsoft Internet Explorer")&&(num >= 4)&&(myagent.indexOf('mac') < 0)) {
			_doBookmarkWindow();
		}
                forbes_dart.ad('text', '300x250,300x600,336x850,336x280');
		document.write("<BR>");
	}
	function escapeSingleQuote(myline) {
      	  if ((myline != null) && (myline.length>0)) {
                var index = myline.indexOf("'");
                while (index != -1) {
                        var firstpart = myline.substring(0,index);
                        var secondpart = myline.substring(index,myline.length);
                        myline=firstpart + "\\" + secondpart;
                        if ( (index+2)<myline.length) {
                                index = myline.indexOf("'",index+2);
                        }
                        else {
                                return myline;
                        }
                }
        	}
        	return myline;
	}
	function _doBookmarkWindow() {
		document.write("<table cellspacing=\"0\" cellpadding=\"2\" border=\"0\" width=\"336\"><tr><td bgcolor =\"dece00\" colspan=\"3\"><img src=\"http://images.forbes.com/media/assets/spacer.gif\" width=\"1\" height=\"2\"></td></tr>");
		document.write("<tr><td valign=\"middle\"><a href=\"#\" onClick=\"doOmnitureTracking(\'winMakeHome\', this, \'forbescom\'); this.style.behavior='url(#default#homepage)';this.setHomePage('http://www.forbes.com');\">Make Forbes.com My Home Page</a></td><td><br>&nbsp;<br></td><td align=\"right\" valign=\"middle\"><a onClick=\"doOmnitureTracking(\'winBookThis\', this, \'forbescom\');window.external.AddFavorite('" + this.location + "','" + escapeSingleQuote(document.title) + "');\" href=\"#\">Bookmark This Page</a></td></tr><tr><td bgcolor=\"dece00\" colspan=\"3\"><img src=\"http://images.forbes.com/media/assets/spacer.gif\" width=\"1\" height=\"2\"></td></tr></table>");
	}
	function _startColumn(){
		document.write("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"328\"><TR><TD WIDTH=168 VALIGN=TOP>");
		_doAlertsColumn();
		var ver = navigator.appName;
		var num = parseInt(navigator.appVersion);
		var myagent = navigator.userAgent.toLowerCase();
		if ((ver == "Microsoft Internet Explorer")&&(num >= 4)&&(myagent.indexOf('mac') < 0)) {
			_doBookmarkColumn();
		}
		document.write("</td>");
		document.write("<td width=\"10\">&nbsp;&nbsp;</td>");
		document.write("<td width=\"150\" valign=top>");
	}
	function _doBookmarkColumn() {
		document.write("<BR><table cellspacing=\"0\" cellpadding=\"2\" border=\"0\" width=\"168\"><tr><td bgcolor=\"dece00\" colspan=\"3\"><img src=\"http://images.forbes.com/media/assets/spacer.gif\" width=\"1\" height=\"2\"></td></tr>");
		document.write("<tr><td><img src=\"http://images.forbes.com/media/assets/spacer.gif\" width=\"1\" height=\"25\"></td><td valign=\"middle\" align=\"center\"><a href=\"#\" onClick=\"doOmnitureTracking(\'colMakeHome\', this, \'forbescom\');this.style.behavior='url(#default#homepage)';this.setHomePage('http://www.forbes.com');\">Make Forbes.com My Home Page</a></td><td><img src=\"http://images.forbes.com/media/assets/spacer.gif\" width=\"1\" height=\"25\"></td></tr><tr><td><img src=\"http://images.forbes.com/media/assets/spacer.gif\" width=\"1\" height=\"25\"></td><td valign=\"middle\" align=\"center\"><a onClick=\"doOmnitureTracking(\'colBookThis\',this, \'forbescom\');window.external.AddFavorite('" + this.location + "','" + escapeSingleQuote(document.title) + "');\" href=\"#\">Bookmark This Page</a></td><td><img src=\"http://images.forbes.com/media/assets/spacer.gif\" width=\"1\" height=\"25\"></td></tr><tr><td bgcolor=\"dece00\" colspan=\"3\"><img src=\"http://images.forbes.com/media/assets/spacer.gif\" width=\"1\" height=\"2\"></td></tr></table><br clear=\"all\">");
	}
	function _adColumn(){
		document.write('<div class="dynamicadlocation" id="dynamicAdColDiv">');
 		document.write('</div>');
	}
	function _endColumn(){
		document.write("</CENTER></TD></TR></TABLE>");
	}
        function _checkAlertForm(){
                if (!isMember()) {
                        if (checkAlertForm()) {
	                        setCLevelAlertsCookie();
				return true;
			}
			return false;
                } else {
                        var isOneChecked = verifyOneChecked(document.alertForm);
                        if (!isOneChecked)
                                alert('Please select at least one alert.');
                        return isOneChecked;
                }
        }
        function getTitleDropDown(){
                var titleArray = new Array("President", "Chairman", "Owner/Partner", "CEO", "CFO", "CIO/CTO", "CMO", "COO", "Vice President", "General Manager", "Middle Management", "Technical Staff", "Clerical/Support Staff", "Professional", "Homemaker", "Student", "Retired", "Not Employed", "Other");
                var titleDropDown = '';

                var alertsTitle = "Select Your Title";

                titleDropDown += '<option value=""  selected="selected">Select Your Title</option>';

                for (var i=0; i < titleArray.length; i++) {
                        titleDropDown += '<option value="' + titleArray[i] + '"';
                        titleDropDown += '>' + titleArray[i] + '</option>';
                }

                return titleDropDown;
        }
        function setCLevelAlertsCookie(){
                // Change theDomain to: '192.168.0.164' for testing 
                var theDomain = '.forbes.com';

                var cLevelTitleMap = new Object();
                cLevelTitleMap["President"] = "President";
                cLevelTitleMap["Chairman"] = "Chairman";
                cLevelTitleMap["Owner/Partner"] = "Owner%2FPartner";
                cLevelTitleMap["CEO"] = "CEO";
                cLevelTitleMap["CFO"] = "CFO";
                cLevelTitleMap["CIO/CTO"] = "CIO%2FCTO";
                cLevelTitleMap["CMO"] = "CMO";
                cLevelTitleMap["COO"] = "COO";
		cLevelTitleMap["General Manager"] = escape("General Manager");
                cLevelTitleMap["Vice President"] = escape("Vice President");
                cLevelTitleMap["Technical Staff"] = escape("Technical Staff");

                var aTitle=document.getElementById("alerts_title");
                // Title is not a mandatory field.
                if (aTitle != null){
                        var clevel_title = cLevelTitleMap[aTitle.value];
                        if (clevel_title != null) {
                                var theDate = new Date();
                                var fiveYearsLater = new Date( theDate.getTime() + 153792000000 );
                                var expiryDate = fiveYearsLater.toGMTString();

                                document.cookie='ceotitle=' + escape('Officer Alerts') + ';expires=' + expiryDate + ';path=/;domain=' + theDomain;
                        } else if (aTitle.value != "Select Your Title") {
                                // The user is not clevel.  Remove the cookie if present.
                                var results = document.cookie.match ( 'ceotitle=' );

                                // remove the cookie
                                if ( results ){
                                        var cookie_date = new Date ( );  // current date & time
                                        cookie_date.setTime ( cookie_date.getTime() - 1 );
                                        document.cookie = "ceotitle=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/;domain=" + theDomain;
                                }
                        } // else no title select; therefore do nothing with cookies.
                }
        }
        function tableForEach(keyArray, valueHash, numColumns, header) {

                // Used to prepend a prefix to the alert parameters for differentiation purposes.
                var headerAlertMap = new Object();
                headerAlertMap["Companies"] = "tickers";
                headerAlertMap["People"] = "persons";
                headerAlertMap["Topics"] = "keywords";

                if (keyArray.length==0) return;

                document.write('<tr height="22"><td style="padding-top: 5px; border-top: thin dotted" colspan="' +
                                numColumns*2 + '" height="22" ><b>' + header + '</b>  </td></tr>');


                for (var i=0; i<keyArray.length/numColumns; i++) {
                        document.write('<tr valign="top">');
                        for (var j=0; j<numColumns; j++) {
                                if ((i*numColumns+j) < keyArray.length) {
                                        var element = keyArray[i*numColumns+j];
                                        document.write('<td valign="middle" width="20"><input type="checkbox" name="' +
                                                headerAlertMap[header] + '.' + element + '" value="' + valueHash[element] +
                                                '"></td>' + '<td valign="middle" width="134">' + valueHash[element] + '</td>');
                                }
                        }
                        document.write('</tr>');
                }
        }
        function _doAlertsWindow(){
                if((typeof tickerKeyList == "undefined") && (typeof personKeyList == "undefined") && (typeof keywordKeyList == "undefined")){return;}

                document.write('<style type="text/css" media="screen"><!--#alertsbox td {font-size: 11px;}--></style><form action="http://members.forbes.com/alertSignup" method="post" name="alertForm" onSubmit="return _checkAlertForm();"><input type="hidden" name="action" value="alerts_signup"><input type="hidden" name="comingFrom" value="alerts"><input type="hidden" name="service" value="key_membership"><input type="hidden" name="gotoURL" value="' + window.location.href + '"><div id="alertsbox"><table bgcolor="#cccccc" border="0" cellpadding="1" cellspacing="0" width="336"><tbody><tr><td><table bgcolor="#ffffff" border="0" cellpadding="2" cellspacing="0" width="100%"><tbody><tr><td rowspan="100"></td><td colspan="4"></td><td rowspan="100"></td></tr><tr><td  colspan="4"  style="font-size: 12px; font-weight: bold;"><span style=" color: 990000;">News by E-mail </span>Get stories by E-Mail on this topic <span style=" color: 990000;">FREE</span></td></tr><tr><td colspan="3">');
                document.write('<span style="color: #369; font-size: 12px; font-weight: bold; margin-bottom: 6px;"></span></td><td style=" padding-bottom: 7px; padding-top: 7px;" width="134"><a href="http://members.forbes.com/membership/signup.do?comingFrom=alerts"><b></b></td></tr>');

                if((typeof tickerKeyList != "undefined") && (typeof tickerHash != "undefined")){
                        tableForEach(tickerKeyList, tickerHash, 2, "Companies");
                }
                if((typeof personKeyList != "undefined") && (typeof personHash != "undefined")){
                        tableForEach(personKeyList, personHash, 2, "People");
                }
                if((typeof keywordKeyList != "undefined") && (typeof keywordHash != "undefined")){
                        tableForEach(keywordKeyList, keywordHash, 2, "Topics");
                }

        if (!isMember()) {
                document.write('<tr><td  colspan="4"  style="font-size: 12px; font-weight: bold; padding-bottom: 5px; border-bottom: thin dotted"></td></tr><tr><td colspan="2"><span style="color: #369; font-size: 12px; font-weight: bold; margin-bottom: 6px;">Become a member FREE </span></td><td style=" padding-bottom: 7px; padding-top: 7px;" width="134" colspan="2">Already a Member? <a href="http://members.forbes.com/membership/signup.do?comingFrom=alerts&gotoURL=' + window.location.href + '"><b>Log In</b></td></tr>');
		document.write('<tr valign="top" height="5"><td style="padding-top: 9px; padding-bottom: 5px; border-top: thin dotted"  colspan="4" align="left" valign="middle" height="5"><table width="291" border="0" cellspacing="0" cellpadding="0"><tr><td width="166"><input style="font-size: 11px;" type="text" name="login" ONFOCUS="clearText(this)" id="login" value="Enter Username" class="alertemail" size="21" ></td><td width="166"><input style="font-size: 11px;" type="text" name="email" ONFOCUS="clearText(this)" id="email" value="Enter E-Mail Address" class="alertemail" size="21" ></td></tr><tr><td style="padding-top: 6px;" width="166"><select style="font-size: 11px;" name="title" size="1" tabindex="1" id="alerts_title">' + getTitleDropDown() + '</select></td><td>Receive Special Offers?&nbsp;<input type="checkbox" name="special_offers" checked></td></tr><tr></td><td style="padding-top: 6px;"><input style="font-size: 11px;" class="alertsignup" value="Sign Me Up!" name="submit" type="submit"></td> </tr></table></td></tr>');
        } else {
                document.write('<tr valign="top" height="5"><td style="padding-top: 9px; padding-bottom: 5px; border-top: thin dotted"  colspan="4" align="left" valign="middle" height="5"><input type="hidden" name="email" id="email" value="fdc@fdc.com"><input type="hidden" name="title" id="alerts_title" value="title"><input style="font-size: 11px;" class="alertsignup" value="Sign Me Up!" name="submit" type="submit"><table width="281" border="0" cellspacing="0" cellpadding="0"><tr><td width="166"></td><td></td></tr><tr><td style="padding-top: 6px;" width="166"><table width="141" border="0" cellspacing="0" cellpadding="0"><tr><td></td><td></td></tr></table></td><td style="padding-top: 6px;"></td> </tr></table></td></tr>');
        }


                document.write('<tr height="22"> <td style="padding-top: 0px;" colspan="4" align="left" height="22"><span style="float: left;"><a href="javascript:popup(\'faq\')">FAQ</a> | <a href="javascript:popup(\'terms\')">Terms, Conditions and Notices</a> | <a href="javascript:popup(\'privacy\')">Privacy Policy</a></span></td> </tr><tr height="22"> <td style="padding-top: 5px; border-top: thin dotted"   colspan="4" align="left" height="22"><b>Also available: </b><a href="http://members.forbes.com/membership/editprofile.do">E-Mail Newsletters</a>');

	if( thisURL.indexOf("CIAtAGlance.jsp") > 0)  {
	document.write('&nbsp;|&nbsp;</td> </tr> <tr> <td class="linkset" align="left"></td> <td class="linkset" align="left" width="141"></td> </tr> </tbody> </table></td></tr></tbody></table></div>');
	} else {
                document.write('</td> </tr> <tr> <td class="linkset" align="left"></td> <td class="linkset" align="left" width="141"></td> </tr> </tbody> </table></td></tr></tbody></table></div>');
}     

}
        function _doAlertsColumn(){
                if((typeof tickerKeyList == "undefined") && (typeof personKeyList == "undefined") && (typeof keywordKeyList == "undefined")){return;}

                document.write('<style type="text/css" media="screen"><!--#alertsbox td {font-size: 11px;}--></style><form action="http://members.forbes.com/alertSignup" method="post" name="alertForm" onSubmit="return _checkAlertForm();"><input type="hidden" name="action" value="alerts_signup"><input type="hidden" name="comingFrom" value="alerts"><input type="hidden" name="service" value="key_membership"><input type="hidden" name="gotoURL" value="' + window.location.href + '"><div id="alertsbox"><table bgcolor="#cccccc" border="0" cellpadding="1" cellspacing="0" width="166"><tbody><tr><td><table bgcolor="#ffffff" border="0" cellpadding="2" cellspacing="0" width="100%"><tbody><tr><td rowspan="100"></td><td></td><td width="141"></td><td rowspan="100"></td></tr><tr><td colspan="2"  style=" font-size: 12px; font-weight: bold; padding-bottom: 5px;"><span style=" color: 990000;">News by E-mail</span><br>Get stories by E-Mail on this topic <span style=" color: 990000;">FREE</span></td></tr><tr><td colspan="2"><br>');
                document.write('<span style="color: #369; font-size: 12px; font-weight: bold; margin-bottom: 6px;"></span><a href="http://members.forbes.com/membership/signup.do?comingFrom=alerts"><b></b></td></tr>');

                if((typeof tickerKeyList != "undefined") && (typeof tickerHash != "undefined")){
                        tableForEach(tickerKeyList, tickerHash, 1, "Companies");
                }
                if((typeof personKeyList != "undefined") && (typeof personHash != "undefined")){
                        tableForEach(personKeyList, personHash, 1, "People");
                }
                if((typeof keywordKeyList != "undefined") && (typeof keywordHash != "undefined")){
                        tableForEach(keywordKeyList, keywordHash, 1, "Topics");
                }

        if (!isMember()) {
                document.write('<tr><td style="border-top: thin dotted;" colspan="2"></td></tr><tr><td colspan="2"><span style="color: #369; font-size: 12px; font-weight: bold; margin-bottom: 6px;">Become a member FREE </span>Already a Member? <a href="http://members.forbes.com/membership/signup.do?comingFrom=alerts"><b>Log In</b></td></tr>');
		document.write('<tr valign="top" height="24"> <td style="padding-top: 5px; border-top: thin dotted"  colspan="2" valign="middle" height="24"><input style="font-size: 11px;" type="text" name="login" ONFOCUS="clearText(this)" id="login" value="Enter Username" class="alertemail" size="21" ></td></tr> <tr valign="top" height="24"> <td style="padding-top: 5px;"  colspan="2" valign="middle" height="24"><input style="font-size: 11px;" type="text" name="email" ONFOCUS="clearText(this)" id="email" value="Enter E-Mail Address" class="alertemail" size="21" ></td></tr> <tr><td  colspan="2"><select style="font-size: 11px;" name="title" size="1" id="alerts_title"> ' + getTitleDropDown() + '</select></td> </tr><tr> <td colspan="2"><table width="141" border="0" cellspacing="0" cellpadding="0"><tr><td>Receive Special Offers?</td><td><input type="checkbox" name="special_offers" checked></td></tr></table></td></tr> <tr> <td style="padding-bottom: 5px;" colspan="2"><input style="font-size: 11px;" class="alertsignup" value="Sign Me Up!" name="submit" type="submit"><br> </td> </tr></form>');
        } else {
                document.write('<tr valign="top" height="24"> <td style="padding-top: 5px; border-top: thin dotted"  colspan="2" valign="middle" height="24"><input type="hidden" name="email" id="email" value="fdc@fdc.com"><input type="hidden" name="title" id="alerts_title" value="title"><input style="font-size: 11px;" class="alertsignup" value="Sign Me Up!" name="submit" type="submit"></td></tr> <tr><td  colspan="2"></td> </tr><tr> <td colspan="2"><table width="141" border="0" cellspacing="0" cellpadding="0"><tr><td></td><td></td></tr></table></td></tr> <tr> <td style="padding-bottom: 5px;" colspan="2"><br> </td> </tr></form>');
        }
                // FAQ, Privacy policy, newsletters signup link and closing tags
                document.write('<tr height="22"> <td style="padding-bottom: 5px; "  colspan="2" height="22"><span style="float: left;"><a href="javascript:popup(\'faq\')">FAQ</a> |  <a href="javascript:popup(\'privacy\')">Privacy Policy</a></span><br><span style="float: left;"><a href="javascript:popup(\'terms\')">Terms, Conditions and Notices</a> </span></td></tr> <tr height="22"> <td style="padding-top: 5px; border-top: thin dotted" colspan="2" align="left" height="22"><b>Also available:</b><br> </td> </tr> <tr> <td  colspan="2" align="left"><a href="http://members.forbes.com/membership/editprofile.do">E-Mail Newsletters</a> </td> </tr> <tr> <td class="linkset" align="left"></td> <td class="linkset" align="left" width="141"></td> </tr> </tbody> </table></td></tr></tbody></table></div>');
           //document.write('</td> </tr> <tr> <td class="linkset" align="left"></td> <td class="linkset" align="left" width="141"></td> </tr> </tbody> </table></td></tr></tbody></table></div>');

   }

//cookie
var exp = new Date();
exp.setTime(exp.getTime() + (2*24*60*60*1000));
function WriteNew (name, value, exp, path, secure, domain) {
	var argv = WriteNew.arguments;
	var argc = WriteNew.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var secure = (argc > 4) ? argv[4] : false;
	var domain = (argc > 5) ? argv[5] : null;
	document.cookie = name + "=" + escape (value) +
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	((path == null) ? "" : ("; path=" + path)) +
	((domain == null) ? "" : ("; domain=" + domain)) +
	((secure == true) ? "; secure" : "");
}

//jumpNav
function jumpNav (form) {
	if (form.jumpSelect.options[form.jumpSelect.selectedIndex].value != "") {
		this.location = form.jumpSelect.options[form.jumpSelect.selectedIndex].value;
	}
}
//popit
function popit(url, popWidth, popHeight) {
	if (popWidth < 760) {
		popWidth = 760;
	}
	slideWin = window.open(url, 'popup', "width=" + popWidth + ",height=" + popHeight + ",toolbar=0,resizable=1,scrollbars=1");
	slideWin.focus();
}
//go
function go(url) {
	if (opener && !opener.closed) {
		opener.location = url;
		opener.focus();
	} else {
		fakeWin = window.open(url, 'fake');
		fakeWin.focus();
	}
}
//closeWindow
function closeWindow() {
window.close()
}

//channel
if ((typeof fdcchannel == "undefined") || (fdcchannel == "")) {
	if ((typeof displayedChannel != "undefined") && (displayedChannel != "")) {
		if ((displayedChannel == 'home_asia') || (displayedChannel == 'home_europe')) displayedChannel = 'home';
		fdcchannel = displayedChannel;
	}
	else {
		var channelIndex = this.location.href.indexOf('fdcchannel=');
		if (channelIndex == -1) fdcchannel = 'home';
		else {
			fdcchannel =  this.location.href.substr(channelIndex+8);
			var channelEnd = fdcchannel.indexOf('&');
			if (channelEnd>-1) fdcchannel = fdcchannel.substr(0,channelEnd);
		}
	}
}
//if (fdcchannel == 'leadership') fdcchannel = 'work';
if (fdcchannel == 'forbeslife') fdcchannel = 'lifestyle';
if (fdcchannel == 'personalfinance') fdcchannel = 'investing';
if (fdcchannel == 'personalFinance') fdcchannel = 'investing';
if (fdcchannel == 'finance') fdcchannel = 'investing';
if (fdcchannel == 'markets') fdcchannel = 'investing';

count=0;
for (i=0;i<channelArr.length;i++) {
	if(channelArr[i] == fdcchannel) {
		break;
	}
	count++;
}

if (count==channelArr.length) fdcchannel = "home";

if( typeof displayedChannel == "undefined" || displayedChannel != "experian" ){
	var displayedChannel = fdcchannel;
}

if (typeof fdcsponsor == "undefined") {
	var sponsorIndex = this.location.href.indexOf('fdcsponsor=');
	if (sponsorIndex == -1) fdcsponsor = '';
	else {
		fdcsponsor =  this.location.href.substr(sponsorIndex+8);
		var sponsorEnd = fdcsponsor.indexOf('&');
		if (sponsorEnd>-1) fdcsponsor = fdcsponsor.substr(0,sponsorEnd);
	}
}

document.write('<\/head>');
if(this.location.href.indexOf("/comments/most")!=-1)
	document.write('<body id="comments_xxl" bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" marginheight="0" marginwidth="0" link="#003399" alink="#0080ff" vlink="#6699cc">');
else
	document.write('<body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" marginheight="0" marginwidth="0" link="#003399" alink="#0080ff" vlink="#6699cc">');

//video ad frame
if(displayedSection == 'Video' || (displayedSection == 'intelligentinvesting' && pageType =='story')) {
	//document.write('<iframe name="dummy" width="0" height="0" style="height:0px;" scrolling="no" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0"></iframe>');
	noSearch = 1;
}

//for thought leaders video page  when you click on advanced in search box
if((typeof storyTemplateType != "undefined") && (displayedSection =="thought leaders")){
if( storyTemplateType == 'iivideo'){
noSearch = 1;
}
}
//partners
var partner = '';
var isForbesPartner = false;
var query = this.location.search.substring(1);
if( query.length > 0 ) {
	var params=query.split("&");
	for (var i = 0 ; i < params.length ; i++) {
		var pos = params[i].indexOf("=");
		var name = params[i].substring(0, pos);
		var value = params[i].substring(pos + 1);
		if( name == "partner" ) {
			partner = value;
			if(typeof OAS_query_addition != 'undefined' && OAS_query_addition.length>0) {
				OAS_query_addition  += "&partner="+value;
			} else {
				OAS_query_addition  = "partner="+value;
			}
			// Homepage ad targeting for embeddable homepage
			if (partner=="embed" && pageType == "home" && hpType == "us") { OAS_sitepage = "homepage.forbes.com/embed/index.jhtml"; }
		}
		// Yahoo! Buzz Testing for query params
		if( name == "ybf1" ) {
			if(typeof OAS_query_addition != 'undefined' && OAS_query_addition.length>0) {
				OAS_query_addition  += "&ybf1="+value;
			} else {
				OAS_query_addition = "ybf1="+value;
			}
		}
	}
}
var url = window.document.URL.toString();
if(url.indexOf("archive") != -1 ) {
	var partner = "keepmedia";
}

var partner_cookie = "partner_session=" + partner;
if (document.cookie.indexOf(partner_cookie) < 0) {
	document.cookie=partner_cookie + ';path=/; domain=.forbes.com';
}
else {
	//the new value of partner is checked and if it is a different, then cookie is set
	var existing_cookie_value = findCookie("partner_session");
	if(partner != existing_cookie_value && partner != ""){
		document.cookie=partner_cookie + ';path=/; domain=.forbes.com';
	}
}

var _rsCG='0';
//adfixxxxx
function docdowrite(s) {
   document.write(s);
}
//end adfix

/* rollover 18APRIL2006 Version 1.0
 * Tania Puell, April 2006
 * Copyright (c) 2006 Forbes.com
 */

var homeArr = new Array();
var businessArr = new Array();
var investingArr = new Array();
var technologyArr = new Array();
var entrepreneursArr = new Array();
var opinionsArr = new Array();
var leadershipArr = new Array();
var lifestyleArr = new Array();
var listsArr = new Array();

var hTimer;
var thisSection;
var htimer = 0;
var lastSection;
var thisAdDiv;
var vSection;

var hiColor = '#990000';
var loColor = '#996666';
var lastColor;
var userIni = 0;
var displayedSectionVar;
var searchBoxTopIsSet = false;


function getPosTop(theObj)
{
	var theTop,thePar;
	theTop = theObj.offsetTop;
	while(theObj.offsetParent!=null)
	{
		thePar = theObj.offsetParent;
		theTop += thePar.offsetTop;
		theObj = thePar;
	}
	return theTop;
}

function showHMenu(channel) 
{
	if (fdcsponsor == 'noad') 
	{
		if (document.getElementById('searchbox')) 
		{
			document.getElementById('bigBannerDiv').style.height = 0;
		}
	}
	if (document.getElementById('panel1')) {
			if( is_searchtabs==true) {
		document.getElementById('panel1').style.display = "block";
			}
	}
	
	if(document.getElementById('column')) document.getElementById('column').style.display = "block";
	keepMenu();
	hover(channel);
	if ((typeof curChannel == 'undefined') || (channel != curChannel) || (channel == fdcchannel)) {
		curChannel = channel;
		thisChannStr = "";
		var pinknav = false;
		if("home" == channel && window.pinkpzn) {
			pinknav = true;
			thisChannArr = pinkpzn;
			var notPersonilized = [
				{name:'Video',url:'http://www.forbes.com/video/'},
				{name:'E-mail Newsletters',url:'http://www.forbes.com/membership/signup.jhtml'},
				{name:'ForbesWoman',url:'http://www.forbes.com/forbeswoman/'}];
			for(var i=0;i<notPersonilized.length;i++) {
				thisChannStr += '<span id="pinknav'+i+'" class="horizItem" onmouseup="javascript:homenvg(this,\''
					+notPersonilized[i].url+'\',true)" onmouseout="hideMenu()" onmouseover="showVMenu(\'pinknav'+i+'\')">'
					+notPersonilized[i].name+'</span>';
			}
			thisChannStr += '<span class="fastOne">|</span><span class="fastOne">My Sections</span><span class="fastTwo">&gt;</span>';
		} else {
			thisChannArr = eval(channel+'Arr');
		}
		thisWidth = 0;
		thisChannX = document.getElementById(channel+'S').offsetParent.offsetLeft;
		thisChannWidth = document.getElementById(channel+'S').offsetWidth;
		if (navigator.appName == 'Microsoft Internet Explorer') thisChannWidth += 8;
		for(i=0;i<thisChannArr.length;i++) {
			if ((typeof displayedSectionVar != "undefined") && (channel + i == displayedSectionVar)) thisHC = "hirizItem";
			else thisHC = "horizItem";
			thisChannStr += '<span id="'+channel+i+'"onMouseOver="showVMenu(\''+channel+i+'\')" onMouseOut="hideMenu()" class="' + thisHC + '" onMouseUp="javascript:';
			if("home"==pageType && "home"==channel) {
				thisChannStr += 'homenvg(this,\''+thisChannArr[i][1]+'\','+pinknav+')';
			} else {
				thisChannStr += 'nvg(\''+thisChannArr[i][1]+'\')';
			}
			thisChannStr += '">'+thisChannArr[i][0]+'<\/span>';
		}
	
		//document.getElementById('hRO').innerHTML = thisChannStr;
	
		for(i=0;i<thisChannArr.length;i++) {
			thisWidth += document.getElementById(channel+i).offsetWidth;
		}
		thisPadding = (790 - thisWidth)/2;
		if (790-thisChannX>=thisWidth) thisPadding = thisChannX;
		else if (thisChannX+thisChannWidth>=thisWidth) thisPadding = thisChannX + thisChannWidth - thisWidth -6;
		if (thisPadding<0) thisPadding = 0;
	
	
// 		document.getElementById('hRO').style.width = "790px";
// 		document.getElementById('hRO').style.paddingLeft = thisPadding+"px";
// 		if (document.getElementById('hRO').offsetWidth > 790) {
// 			document.getElementById('hRO').style.width = (790 - thisPadding)+"px";
// 		}

		if(channel != fdcchannel) {
			for(i=0;i<channelArr.length;i++) {
				thisChannel = channelArr[i];
				if(thisChannel != fdcchannel) {
					document.getElementById(thisChannel+'S').style.backgroundColor = 'transparent';
					document.getElementById(thisChannel+'S').style.color = '#336699';
				}
			}
			document.getElementById(channel+'S').style.backgroundColor = '#ffffff';
			document.getElementById(channel+'S').style.color = '#000000';
			document.getElementById(fdcchannel+'S').style.backgroundColor = 'transparent';
			document.getElementById(fdcchannel+'S').style.color = loColor;
			lastColor = loColor;
			
		} else {
			for(i=0;i<channelArr.length;i++) {
				thisChannel = channelArr[i];
				if(thisChannel != fdcchannel) {
					document.getElementById(thisChannel+'S').style.backgroundColor = 'transparent';
				}
			}
			document.getElementById(fdcchannel+'S').style.backgroundColor = '#ffffff';
			if (!userIni) document.getElementById(fdcchannel+'S').style.color = hiColor;
			lastColor = hiColor;
			//showSection();
		}
	}
	userIni=0;
}

function nvg(URL) {
	this.location.href=URL;
}
function homenvg(el,url,pinknav) {
	var tracking = "navbarHome_Clk";
	if(pinknav) tracking = "navbarHome_Clk_FAST";
	doOmnitureTracking(tracking,el,'forbescom');
	this.location.href=url;
}
function hover(channel) {
	document.getElementById(channel+'S').style.color = "#000000";
}
// function hideHMenu() {
// 	document.getElementById('hRO').innerHTML = "";
// 	document.getElementById('hRO').style.width = 790+"px";
// 	showHMenu(fdcchannel);
// 	showAd();
// }
function hideMenu() {
	if ((typeof thisSection != "undefined") && (document.getElementById(thisSection))) {
		if((typeof displayedSectionVar != "undefined") && (displayedSectionVar == thisSection)) document.getElementById(thisSection).style.color = hiColor;
		else document.getElementById(thisSection).style.color = "#336699";
	}
	for(i=0;i<channelArr.length;i++) {
		thisChannel = channelArr[i];
		if (thisChannel != fdcchannel) document.getElementById(thisChannel+'S').style.color = '#336699';
		else document.getElementById(thisChannel+'S').style.color = lastColor;
	}
	hTimer = setTimeout('hideHMenu()',1000);
}
function showVMenu(section) {
	keepMenu();
	document.getElementById(section).style.color ="#000000";
	thisSection = section;
}
function keepMenu() {
	if (hTimer) clearTimeout(hTimer);
}

// function showSection() {
// 	if ((typeof displayedSection != "undefined") && (displayedSection != "") ) {
// 	   var tca_varname = displayedChannel + 'Arr';
// 	   eval( 'thisChannelArr = typeof ' + tca_varname + ' == "undefined" ? [] : ' + tca_varname );
// 	   count = 0;
// 	   for(i=0;i<thisChannelArr.length;i++) {
// 		displayedSectionLnk = thisChannelArr[i][0].toLowerCase();
// 	   	displayedSectionLnk = displayedSectionLnk.replace(/ \& /g,"");
// 	   	displayedSectionLnk = displayedSectionLnk.replace(/ /g,"");
// 	   	if (displayedSectionLnk == displayedSection.toLowerCase()) {
// 			displayedSectionVar = displayedChannel + i;
// 			break;
// 		}
// 		count++;
// 	   }
// 	   if(count==thisChannelArr.length) {
// 	        displayedSectionLnk = displayedSection;
// 	        displayedSectionLnk = displayedSectionLnk.substr(displayedSection.indexOf(" ")+1,displayedSectionLnk.length);
// 	   	for(i=0;i<thisChannelArr.length;i++) {
// 			checkSection = thisChannelArr[i][0].toLowerCase();
// 	   		if (checkSection.indexOf(displayedSectionLnk)>-1) {
// 				displayedSectionVar = displayedChannel + i;
// 				break;
// 			}
// 		}
// 	   }
// //stoopid failsafe
// 
// 		switch (displayedSection) {
// 		case "wallstreet":
// 		displayedSectionVar = "business5";
// 		break;
// 
// 		case "beltway":
// 		displayedSectionVar = "business6";
// 		break;
// 
// 		case "enterprisetech":
// 		displayedSectionVar = "technology0";
// 		break;
// 
// 		case "breakthroughs":
// 		displayedSectionVar = "technology4";
// 		break;
// 
// 		case "wireless":
// 		displayedSectionVar = "technology6";
// 		break;
// 
// 		case "personaltech":
// 		displayedSectionVar = "technology9";
// 		break;
// 
// 		case "infoimaging":
// 		displayedSectionVar = "technology5";
// 		break;
// 
// 		case "ebusiness":
// 		displayedSectionVar = "technology7";
// 		break;
// 
// 		case "entrefinance":
// 		displayedSectionVar = "entrepreneurs1";
// 		break;
// 
// 		case "entrehr":
// 		displayedSectionVar = "entrepreneurs2";
// 		break;
// 
// 		case "entrelaw":
// 		displayedSectionVar = "entrepreneurs5";
// 		break;
// 
// 		case "ampc":
//                 displayedSectionVar = "entrepreneurs3";
// 		break;
// 
// 		case "entresales":
// 		displayedSectionVar = "entrepreneurs4";
// 		break;
// 
// 		case "entremgmt":
// 		displayedSectionVar = "entrepreneurs2";
// 		break;
// 
// 		case "entretech":
// 		displayedSectionVar = "entrepreneurs3";
// 		break;
// 
// 		case "boostyourbusiness":
// 		displayedSectionVar = "entrepreneurs3";
// 		break;
// 
// 		case "estate_planning":
// 		displayedSectionVar = "investing9";
// 		break;
// 
// 		case "guruinsights":
// 		displayedSectionVar = "investing2";
// 		break;
// 
// 		case "advisernetwork":
// 		displayedSectionVar = "investing0";
// 		break;
// 	        
// 		case "funds":
// 		displayedSectionVar = "investing5";
// 		break;
// 	        
// 		case "billionaires":
// 		displayedSectionVar = "lists5";
// 		break;
// 	        
// //		case "fact and comment":
// //		displayedSectionVar = "opinions2";
// //		break;
// 	        
// 		case "citizenship":
// 		displayedSectionVar = "leadership3";
// 		break;
// 	        
// 		case "thoughtleaders":
// 		displayedSectionVar = "leadership6";
// 		break;
// 	        
// 		case "realestate":
// 		displayedSectionVar = "lifestyle1";
// 		break;
// 
// 		case "starcurrency":
// 		displayedSectionVar = "business2";
// 		break;
// 		case "firewallblog":
// 		displayedSectionVar = "technology8";
// 		break;
// 		case "facetofaceblog":
// 		displayedSectionVar = "home0";
// 		break;
// 		case "workinprogressblog":
// 		displayedSectionVar = "leadership5";
// 		break;
// 		case "forbeswoman/style":
// 		displayedSectionVar = "leadership5";
// 		case "forbeswoman/powerwomen":
// 		displayedSectionVar = "leadership5";
// 		case "forbeswoman/leadership":
// 		displayedSectionVar = "leadership5";
// 		case "forbeswoman/entrepreneurs":
// 		displayedSectionVar = "leadership5";
// 		case "forbeswoman/well-being":
// 		displayedSectionVar = "leadership5";
// 		case "forbeswoman/time":
// 		displayedSectionVar = "leadership5";
// 		case "forbeswoman/networth":
// 		displayedSectionVar = "leadership5";
// 		break;
// 	   }
// 	   if (fdcsponsor == "economic_calendar") { displayedSectionVar="markets3"; }
// 	   if (document.getElementById(displayedSectionVar)) document.getElementById(displayedSectionVar).style.color=hiColor;
// 
// 	}
// }
// function hoverAct(section,on) {
// 	if (lastSection) {
// 		document.getElementById(lastSection+'L').style.color = '#369';
// 	}
// 	document.getElementById(section+'L').style.color = '#000000';
// 	lastSection = section;
// }
function showAd() {
	if (searchTab == 0) {
		if(document.getElementById(thisAdDiv) != null) document.getElementById(thisAdDiv).style.display = 'block';
  	}
}
function hideAd() {
 	if(document.getElementById(thisAdDiv)) {
		document.getElementById(thisAdDiv).style.display = 'none';
	} 
}

// attache and members

//var maintenance=1;

// american dream
// var amrdrm = window.location + "";
// if ( amrdrm.indexOf("dream0307") != -1 ) { var noattache=1; }

var phatcatId = '35415301490';
function isMember() {
        forbes0 = document.cookie.indexOf('forbesmemb=');
        forbes1 = document.cookie.indexOf('forbesmemb_confirm=');
        if (forbes0 != -1 && forbes1 != -1 && getCookieValue('forbesmemb') != phatcatId)
                return true;
        else 
                return false;
}
function getCookieValue(NameOfCookie) {
    if( document.cookie.length > 0 ) {
        begin = document.cookie.indexOf( NameOfCookie+"=" );
        if( begin != -1 ) {
            begin += NameOfCookie.length + 1;
            end = document.cookie.indexOf( ";", begin );
            if( end == -1 ) end = document.cookie.length;
            return unescape( document.cookie.substring( begin, end ));
        }
    }
    return null;
}
function hasOASAdPos(pos) {
       if (typeof OAS_listpos != undefined) {
               if (OAS_listpos.indexOf(pos) != -1) {
                       return true;
               }
       }
       return false;
}

function get_tnt_cookie(check_cookie){
		//alert("In get_tnt_cookie");

		var tnt_cookie_mix;
		var cookie_name = '';
		var cookie_value = '';
		var a_temp_cookie;
		var check_cookie_found = false;

		var index_tnt_cookie_mix = document.cookie.indexOf("tntcookiemix");
		
		//alert("header - index_tnt_cookie_mix = " + index_tnt_cookie_mix);

		if(index_tnt_cookie_mix > -1){

			var a_all_cookies = document.cookie.split( ';' );
			for( i = 0; i < a_all_cookies.length; i++ ){
				
				// now we'll split apart each name=value pair
				a_temp_cookie = a_all_cookies[i].split( '=' );
				
				// and trim left/right whitespace while we're at it
				cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
				
				if ( cookie_name == 'tntcookiemix' ){
					tnt_cookie_mix  = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
					break;
				}
			}


			var all_tnt_cookies = tnt_cookie_mix.split( ':' );

			for( i = 0; i < all_tnt_cookies.length; i++ ){
				// now we'll split apart each name=value pair
				a_temp_cookie = all_tnt_cookies[i].split( '\/' );

				// and trim left/right whitespace while we're at it
				cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
			
				if(cookie_name == check_cookie){
					check_cookie_found = true;
					cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
					//alert("cookie_value = " + cookie_value);
					return cookie_value;
				}
			}

			if(!check_cookie_found){
				// If the cookie doesnot exist in the cookie mix then you can create it as below.
				// tnt_cookie_mix = tnt_cookie_mix + ":" + check_cookie + "\/" + "test1";
				// document.cookie = "tntcookiemix=" + tnt_cookie_mix;
				return null;
			}
		} /*else{
			var fdc_global_attache_value;
			if(Math.floor(Math.random() * 10) != 0){
				//it is in 90%
				fdc_global_attache_value = "fail";
			}else{
				fdc_global_attache_value = "pass";

			}

			//set expiry to 2 yrs
			var expire = new Date();
			expire.setTime(expire.getTime() + (2 * 365 * 24 * 3600 * 1000));

			// to add more than one cookie
			//document.cookie = "tntcookiemix=fdc_global_attache\/" + fdc_global_attache_value + ":tnt_test1\/test1:tnt_test2\/test2";
			document.cookie = "tntcookiemix=fdc_global_attache\/" + fdc_global_attache_value + "; path=/; domain=.forbes.com; expires="+expire.toUTCString();

			return null;
		}*/


}

function loadHeaderStyle(){
        document.write('<link rel="stylesheet" type="text/css" href="http://images.forbes.com/css/newrollover-xhtml.css">');

        if (navigator.appName.indexOf("Netscape") != -1)
                document.write('<link rel="stylesheet" type="text/css" href="http://images.forbes.com/css/suggest_ns.css">');
        else
                document.write('<link rel="stylesheet" type="text/css" href="http://images.forbes.com/css/suggest_ie-xhtml.css">');

        document.write('<link rel="stylesheet" type="text/css" href="http://images.forbes.com/css/search/search-dark.css">');
}

// gets canonical url, if canonical url doesnot exists then it returns location url - this function is used by login redirect url
function getRedirectUrl(){
	linkElements = document.getElementsByTagName("link");
    canonicalUrl = this.location.href;
    for (i = 0; i < linkElements.length; i++) {
        if((typeof linkElements[i].attributes['rel'] != "undefined") && (linkElements[i].attributes['rel'].nodeValue == "canonical")){
			canonicalUrl = linkElements[i].attributes['href'].nodeValue;
			break;
		}
    }
	return canonicalUrl;
}

function loadMakeHomePage(){
        //To Make Home Page
        var ver = navigator.appName;
        var num = parseInt(navigator.appVersion);
		var addPosition = false;
		var position = '';
		if (isForbesPartner) {
			var agt = navigator.userAgent.toLowerCase();
			if(typeof hpType != "undefined" 
					|| (this.location.href.indexOf('http://www.forbes.com/entertainment/') == 0 && agt.indexOf("msie") != 0)) {
				position = 'absolute';
				addPosition = true;
			} else if (this.location.href.indexOf('http://www.forbes.com/finance/retirementcollege/') == 0
						|| this.location.href.indexOf('http://bfn.forbes.com/') == 0
						|| this.location.href.indexOf('forbes-answer-network-land') != -1
						|| this.location.href.indexOf('/bow/b2c/') != -1
						|| this.location.href.indexOf('http://www.forbes.com/static_html/opinions/columnists') == 0
						|| this.location.href.indexOf('http://www.forbes.com/microsoft/events/businessviz/') == 0
						|| this.location.href.indexOf('http://www.forbes.com/fdc/reprints/Reprints.jhtml') == 0) {
				position = 'static';
				addPosition = true;
			}
		}
        if ( thisURL.match(slideshowExpr)|| typeof fdc_center != 'undefined') {
                document.write('<div class="newlogin" id="theLogin"><div id="utilities" style="position: static;">');
        } else {
                document.write('<div class="newlogin" id="theLogin" ' + (addPosition ? 'style="position: '+position+' !important;"' : '') + '><div id="utilities" ' + (addPosition ? 'style="position: '+position+' !important; top:-13px"' : '') + '>');
        }
        if ((typeof maintenance == "undefined") || !maintenance) {
            if ((typeof forbes != "undefined") && (typeof forbes.user_meta != "undefined") && (typeof forbes.user_meta.username != "undefined")) {
					var mName = forbes.user_meta.username;
                    if((typeof mName == 'undefined') || !mName) { mName = ''; }
                    //modified for ad served link
                    doMembersHeader('<h3>Welcome <span id="userName">'+mName+'</span>! | <a id="logOutLink" href="http://blogs.forbes.com/wp-login.php?action=logout&redirect_to=' + getRedirectUrl() +'" style="color:#fff;font-size:13px;">Log Out</a></h3>\n', '<a href="http://www.forbes.com/membership/editprofile.jhtml" class="whitelink">Profile</a>');

                } else {
                    //modified for ad served link
                    doMembersHeader('<h3><a href="http://blogs.forbes.com/help/">Help</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="login" href="http://blogs.forbes.com/wp-login.php?redirect_to=' + getRedirectUrl() + '">Login</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="signup" href="http://blogs.forbes.com/wp-signup.php?redirect_to=' + getRedirectUrl() +'">Signup</a></h3>\n', '');
                }
        }
}

function loadNavBg(){
        document.write('<div class="navbg">');
        document.write('<table  cellspacing="1" cellpadding="0" border="0" width="790"><tr align="center">');
        for (i=0;i<channelArr.length;i++) {
                thisChannel = channelArr[i];
                thisLongChannel = longChannelArr[i];
                thisChannelURL = channelURLArr[i];
                document.write('<td bgcolor="#e2ebf4"><div class="navitem" id="'+thisChannel+'S" onMouseOut="hideMenu();" onMouseOver="showHMenu(\''+thisChannel+'\');" onMouseUp="javascript:nvg(\'http://www.forbes.com'+thisChannelURL+'\')">&nbsp;'+thisLongChannel+'&nbsp;</div></td>');

        }
        document.write('</tr></table></div>');
        //document.write('<div class="horizRO" id="hRO" style="position:relative;"></div>');
        //document.write('<div class="vertRO" id="vRO" onMouseOut="hideMenu();" onMouseOver="keepMenu();"></div>');
}

function showSearchBox(){
var main_srch;
var main_tab;

        if( typeof CookieMix != 'undefined' && CookieMix) {
                if(getCookie('search_term')!=null && getCookie('search_term')!= 'undefined' )
                        main_srch=getCookie('search_term');

                if(getCookie('tab_val')!=null && getCookie('tab_val')!= 'undefined' )
                        main_tab=getCookie('tab_val');

                deleteCookie('search_term');
                deleteCookie('tab_val');
        }

        document.write('<tr>');
        document.write('<td>');
        document.write('<form id="searchbox_global" method="get" name="SearchMain" action="http://www.forbes.com/search/" target="_top" onsubmit="javascript:formSubmitted();"/>');
        //document.write('<input name="tab" value="searchtabgeneraldark" type="hidden" />');

        if (pageTypeForSlide)
                document.write('<input id="search_panel1" class="textbox" name="q" type="text" autocomplete="off" onBlur="termChanged(this.value,\'panel1\');"  onChange="termChanged(this.value,\'panel1\');" onkeyup ="termChanged(this.value,\'panel1\');" onkeypress ="termChanged(this.value,\'panel1\');" onfocus="stopSlideshow();"/>');
        else
                 document.write('<input id="search_panel1" class="textbox" name="q" type="text" autocomplete="off" onBlur="termChanged(this.value,\'panel1\');"  onChange="termChanged(this.value,\'panel1\');" onkeyup ="termChanged(this.value,\'panel1\');" onkeypress ="termChanged(this.value,\'panel1\');" />');


        if (main_tab == 'panel1' && main_srch!=null && main_srch!= 'undefined')
                document.SearchMain.q.value = main_srch;

        document.write('<span class="searchbutton"><a href="javascript:document.SearchMain.submit()" onclick="javascript:formSubmitted()">Search</a></span>');
        document.write('<div style="clear:both;"></div>');
        document.write('</form>');
        document.write('</td>');        
        document.write('</tr>');
}

document.write('<script language="JavaScript" src="http://images.forbes.com/scripts/js_options.js"></script>'); // include js_options.js 
var frequency;
function firstHTML() {
        document.write('<div style="display:none;">');
		
			(function (){
			
				if(typeof forbes !== "undefined" && typeof forbes.js_options !== "undefined" && !forbes.js_options.welcome_ad_disable ){
				
					var midnight = new Date();
					
					if(midnight.getUTCHours() > 6) //Keeping the EDT (-4) as it covers many cases and Time set is 1 am
					midnight.setUTCDate(midnight.getUTCDate()+1);
					
					midnight.setUTCHours(06); // set UTC 6:00  that is EST 1 am and EDT 12 am
					midnight.setUTCMinutes(00);
					midnight.setUTCSeconds(00);
				
				
				//Whatever is the current date in any time zone
				var current_local_date = new Date();
				var diff_in_ms = Math.abs(midnight-current_local_date);  // difference in milliseconds
				var set_expiry_date = new Date();
				set_expiry_date.setTime(set_expiry_date.getTime()+(diff_in_ms));
				
				var tomorrow = new Date();
				var month = tomorrow.getMonth();
				var day = tomorrow.getDate();
				
				var welcomeCookie = "welcomeAd=sessionCookie";			
				var dailyWelcomeCookie = 'dailyWelcomeCookie=dailyCookie';
				var expire  = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()+1, 0, 0, 0);

					if((document.cookie.indexOf(welcomeCookie)==-1 || document.cookie.indexOf(dailyWelcomeCookie) == -1)
						&& (window.navigator.userAgent.indexOf("Mozilla")>-1)
						&& (window.location.host.indexOf("forbes.com")!=-1)
						&& (window.navigator.userAgent.indexOf("iPad;")==-1)
						&& (window.document.referrer.indexOf("digg.com")==-1)
						&& (window.location.search.indexOf("partner=compuserve")==-1)
						&& (window.location.search.indexOf("partner=netscape")==-1)
						&& (window.location.search.indexOf("partner=Experian-RMX")==-1)
						&& (window.location.search.indexOf("partner=acurapower")==-1)
						&& (window.location.search.indexOf("partner=rolex400")==-1)
						&& (window.location.search.indexOf("partner=powercouples")==-1)
						&& (window.location.search.indexOf("partner=yahoo")==-1)
						&& (window.location.search.indexOf("partner=msn")==-1)
						&& (window.location.search.indexOf("partner=aol")==-1)
						&& (window.location.search.indexOf("partner=omg")==-1)
						&& (window.location.search.indexOf("partner=huffpo")==-1)
						&& (window.location.search.indexOf('nowelcome')==-1)) {

						if(document.cookie.indexOf(welcomeCookie) == -1 ){
							document.cookie = welcomeCookie +'__welcome'+(month+1)+day+'; path=/; domain=.forbes.com';
						}

						if(document.cookie.indexOf(dailyWelcomeCookie) == -1){
							document.cookie = dailyWelcomeCookie+'_forDate'+(month+1)+day+'; path=/; domain=.forbes.com; expires=' + set_expiry_date.toGMTString();
						}

						if (document.cookie.indexOf(welcomeCookie) != -1 || document.cookie.indexOf(dailyWelcomeCookie) != -1){
							document.cookie="toURL"+ "=" +escape(document.URL)+";path=/; domain=.forbes.com";
							document.cookie="refURL"+ "=" +escape(document.referrer)+";path=/; domain=.forbes.com";
							this.location='http://www.forbes.com/fdc/welcome_mjx.shtml';
						}
					}
				}
			})();
		
        document.write('</div>');

        doOmniture();
		document.write('<script language="JavaScript" src="http://images.forbes.com/scripts/tracking_pixels.js"></script>');
        loadHeaderStyle();
        document.write('<table  border="0" cellpadding="0" cellspacing="0" width="100%" style="top: -20px;" bgcolor="#336699">');
        document.write('<tobody>');
        document.write('<tr>');
        document.write('<td colspan="2" height="15">');
        document.write('&nbsp;');
        document.write('<\/td>');
        document.write('<\/tr>');
        document.write('<tr>');
        if (this.location.href.indexOf("/video") >= 0 || ( typeof pageType != "undefined" && pageType == "search" )||this.location.host.indexOf("video.forbes.com")) {
                document.write('<td bgcolor="#336699"><div id ="bigBannerDiv">');
        } else {
                document.write('<td bgcolor="#336699"><div id ="bigBannerDiv" style="height: 90px">');
        }
        document.write('<table border="0" cellpadding="0" cellspacing="0" width="780" >');
        document.write('<tr>');
        document.write('<td align="center">');
}

function secondHTML(){
        document.write('</td>');
        document.write('</tr>');
        document.write('</tbody></table></div>');

        document.write('<table border="0" cellpadding="0" cellspacing="0" width="780">');
        document.write('<tbody>');
        document.write('<tr>');
        document.write('<td colspan="5" height="15">&nbsp;</td>');
        document.write('</tr>');
        document.write('<tr>');
        document.write('<!-- Modified table structure for search -->');
        document.write('<td rowspan="3" width="10"> </td>');
        document.write('<td rowspan="2" width="160">');
        document.write('<a href="http://www.forbes.com"><img id="forbesLogo" src="http://images.forbes.com/media/assets/forbes_home_logo.gif" border="0" vspace="0" width="150" height="49" hspace="0"></a>');
        document.write('</td>');
        document.write('<td rowspan="3" width="30"> </td>');
        document.write('<td class="newtagline" style="font:bold 13px Arial,Helvetica,sans-serif; color:#cde;">Home Page for the World\'s Business Leaders</td>');


        document.write('<td style="font:bold 13px Arial,Helvetica,sans-serif; color:#fff;" align="right">');
        document.write('<a id="trialText" href="https://w1.buysub.com/servlet/OrdersGateway?cds_mag_code=FRB&amp;cds_response_key=IMHFT012" class="whitelink">Free Trial Issue</a>&nbsp;');
        document.write('<td rowspan="3" width="30"> </td>');
        document.write('</tr>');

        showSearchBox();

        document.write('<tr valign="top">');
        lightHomepagelink("isNotSlide"); //highlight homaepage link;

        document.write('</tr>');
        document.write('</tbody>');
        document.write('</table>');
        document.write('</td>');

        if (thisURL.match(slideshowExpr) && typeof fdc_slidenew != undefined) {
                document.write('<td width="100%" valign="top">');
        } else if (thisURL.match(slideshowExpr)) {
                document.write('<td width="100%" valign="bottom">');
        } else {
                document.write('<td width="100%" valign="top">');
        }

		isForbesPartner = (window.partner && ((partner.indexOf("aol")>-1) || (partner.indexOf("msn")>-1) || (partner.indexOf("b365")>-1)));
        
		loadMakeHomePage();

        document.write('</tr>');
        document.write('</tbody>');
        document.write('</table>');
        document.write('</tbody>');
        document.write('</table>');
        document.write('</td>');
        document.write('</tr>');
        document.write('</table>');

        loadNavBg();
		
        document.write('<br>');
        document.write('<div id="removeCentAds">');
}

function thirdHTML() {
        document.write('</div>');

        var centAds = document.getElementById('removeCentAds');
        if (centAds != null && centAds != 'undefined'){
                var centAds_parent = centAds.parentNode;
                if (centAds_parent != null && centAds_parent != 'undefined')
                        centAds_parent.removeChild(centAds);
        }
}

function doMembersHeader(member, links) {
	document.write(''+member+'<div id="utilityLinks">\n'+links+'</div>\n');
	if(navigator.appName == "Microsoft Internet Explorer")
		document.write('<h4 id="homePage"><a href="#" onClick="doOmnitureTracking(\'topMakeHome\',this, \'forbescom\');this.style.behavior=\'url(#default#homepage)\';this.setHomePage(\'http://www.forbes.com\');" >Make Forbes.com My Home Page</a></h4>\n<h4 id="bookmarkPage"><a onClick=\"doOmnitureTracking(\'topBookThis\',this, \'forbescom\');window.external.AddFavorite(\'http://www.forbes.com/\',\'Business News and Financial News at Forbes.com\');\" href=\"#\">Bookmark This Page</a></h4>\n');
       	
       document.write('</div>');
}

function doOmniture() {
	document.write('<div style="display:none;">');

	//if(this.location.hostname != 'orgchart.forbes.com') {
		//omniture
		document.write('<span id="omniture" style="height:1px"><script language="JavaScript" src="http://images.forbes.com/scripts/omniture/s_code_forbescom.js"><' + '\/script><\/span>');
		//Omniture Code for Northwestern Mutual for Fact and Comments Pages
		if ( typeof displayedSection != "undefined" && displayedSection == "fact and comment" && typeof displayedChannel != "undefined" && displayedChannel == "opinions") {
		   document.write("<scr" + "ipt language='JavaScri" + "pt' src='http://images.forbes.com/northwesternmutual/s_code.js'></scr" + "ipt>");
		   document.write("<scr" + "ipt language='JavaScri" + "pt' src='http://images.forbes.com/northwesternmutual/sc_custom.js'></scr" + "ipt>");
		}
		//Omniture Code for Northwestern Mutual - Till here
	//}
	document.write('<\/div><\/div>');
}


var isSlidePage = false;
function doSlide1() {
        document.write('<script type="text/javascript" src="http://images.forbes.com/scripts/jquery/jquery.js"></script>');
        document.write('<script src="http://images.forbes.com/scripts/acs/thickbox.js" type="text/javascript"></script>');
        document.write('<link rel="stylesheet" href="http://images.forbes.com/css/story/storyStyle_center.css" type="text/css"/>');
        document.write('<link rel="stylesheet" href="http://images.forbes.com/css/story/thickbox.css" type="text/css" media="screen"/>');
	firstHTML();
}
function doSlide2() {
	secondHTML();
	thirdHTML();
	document.write('<div class="sponsorSlide">'+forbes_dart.ad('logo', '120x40', false)+'<\/div>');
}
var partners = 0;
function adjustSlide() {
	if (nonav) {
		if (!partners) {
			if(document.getElementById('createAlerts')) document.getElementById('createAlerts').style.top = '147px';
			if(document.getElementById('dynamicAdWinDiv')) document.getElementById('dynamicAdWinDiv').style.top = '109px';
                        if(document.getElementById('dynamicAdColDiv')) document.getElementById('dynamicAdColDiv').style.top = '109px';
		} else {
			if(document.getElementById('createAlerts')) document.getElementById('createAlerts').style.top = '187px';
			if(document.getElementById('dynamicAdWinDiv')) document.getElementById('dynamicAdWinDiv').style.top = '149px';
			if(document.getElementById('dynamicAdColDiv')) document.getElementById('dynamicAdColDiv').style.top = '149px';
		}
	} else {
		if (!partners) {
			if(document.getElementById('createAlerts')) document.getElementById('createAlerts').style.top = '201px';
			if(document.getElementById('dynamicAdWinDiv')) document.getElementById('dynamicAdWinDiv').style.top = '292px';
			if(document.getElementById('dynamicAdColDiv')) document.getElementById('dynamicAdColDiv').style.top = '292px';
		} else {
			if(document.getElementById('createAlerts')) document.getElementById('createAlerts').style.top = '241px';
			if(document.getElementById('dynamicAdWinDiv')) document.getElementById('dynamicAdWinDiv').style.top = '332px';
			if(document.getElementById('dynamicAdColDiv')) document.getElementById('dynamicAdColDiv').style.top = '332px';
		}
	}
}


function deleteCookie( name, path, domain ) {
	if (document.cookie.indexOf( name ) ) document.cookie = name + "=" +
	( ( path ) ? ";path=" + path : "") +
	( ( domain ) ? ";domain=" + domain : "" ) +
	";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
//var slideshowExpr =/_slide\d*_?\d*\.html/;
var slideshowExpr =/(-slide|_slide).?\d*_?\d*_?\d*\.html/;
var slideshowExprSpecial = /_slideshow.?\d*_?\d*_?\d*\.html/;
var globeStoryType = "non-slide";

if (thisURL.match(slideshowExpr)) {
		globeStoryType = "slide";
	}else{
		if (pageType !="home" && displayedSection !="Video"){
		deleteCookie('slideGov','\/','.forbes.com');
	}
}

function doOmnitureTracking(trackee, obj,account){
	s_linkTrackVars='prop18';s_linkType='o';s_linkName=trackee;if(typeof(globalPageName)!='undefined')s_prop18=globalPageName;s_lnk=s_co(obj);s_gs(account);
}

var typeahead_main_keys = [];

function formSubmitted() {
	if (thisURL.indexOf("blogs.forbes.com") > -1) {
		if (getCookie('search_term') == null)
			setCookieBlogs('search_term',main_srch);
		if (getCookie('tab_val') == null)
			setCookieBlogs('tab_val',main_tab);
	}
	else {
		setCookie('search_term',main_srch);
		setCookie('tab_val',main_tab);
	}
	return ;
}


function callJQuery(name) {
	// called from searchtabs-xhtml
}

function fdcComputeGlobalPageName(path){
        url = '' + window.location;
        start = url.indexOf('//') + 2;
        start = url.indexOf('/',start) + 1;
        end = url.indexOf('?'); if(end==-1){end=url.length}
        if(typeof path != "undefined") { globalPageName = path + url.substring(start, end); }
        else { globalPageName = url.substring(start, end); }
        globalPageName = globalPageName.replace(/\//g,":");
}

function termChanged(element,tabSelect) {
        main_srch=element ;
        main_tab=tabSelect;

        search_panel = document.getElementById('search_' + tabSelect);
        if(main_tab=='panel2') {
                is_quote=true;
        }else {
                is_quote=false;
        }
        return;
}