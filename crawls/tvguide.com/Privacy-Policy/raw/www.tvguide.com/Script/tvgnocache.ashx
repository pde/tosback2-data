var commentingOffline = false;

/* cookie: ServiceID=80001.0 srvid=80001 */

var tvgServerTimeUTC = new Date(2012,10,28,13,17,38,0);

var dServerET = new Date(2012,10,28,8,17,38,0);
var dSrvrTime = new Date();

dSrvrTime.setUTCFullYear(2012,10,28);
dSrvrTime.setUTCHours(13,17,38,0);

var dLocalTime = new Date(2012,10,28,8,17,38,0);
var dGridStart = new Date(2012,10,28,8,0,0,0);

var snapUserID = "";

var snapIdentityProviderID = "";

var faveTVObjectIDs = "";

var dvrTVObjectIDs = "";

var dvrFreeOnly = "false";


var tvgUserName = "";


var tvgDisplayName = "";

var isLoggedInX = false;

var loggedinUserName = "";

var loggedinUserEmail = "";

var loggedinUserId = "";

var loggedinFirstName = "";
var gigyaApiKey = "2_66INm61ZxQ6_ZyaSsRyTSVO_OSKZqZY2HHXdLti4YhkTsDj2k4j1EMMMvqVgO_kE";
var gigyaCommentCat = "25069624";
var disqus_config = function() { this.page.remote_auth_s3 = 'eyJhdmF0YXIiOm51bGwsImVtYWlsIjpudWxsLCJpZCI6MCwidXJsIjpudWxsLCJ1c2VybmFtZSI6bnVsbH0= c74180a0b0842cc241fdd93a4c05578631b1036b 1354108658';
this.page.api_key = '7q9PYxT0Zrp3AGAihrE22VtKgB9g8UBy6lXSNFSgyvPkZw48znCpTNtkmk5lP7e4';
 }
var disqus_shortname = 'tvguide';
var WWWBaseUrl = "http://www.tvguide.com";
var MoviesBaseUrl = "http://movies.tvguide.com";
var SportsBaseUrl = "http://www.tvguide.com";
var OvgBaseUrl = "http://video.tvguide.com";
var tvg_s_account = "tvgproduction";
var prestitial_active = false;
/* TVGSVC02 11/28/2012 1:15:00 PM GMT */

/* Listings: In-Grid and Close-Up Ads (2012-11-28)*/
var GridAds = true;
var MaxGridAds = 8;
var bTopRowGridAd = false;
var bCloseupAd = false;

/* Listings: Top Channel Promo */
var magicTopImage = "/listings/images/topchan/HGTV_TV_Guide_770x26_TOP_BS.gif";
var magicBotImage = "/listings/images/topchan/HGTV_TV_Guide_770x25_BOTTOM_BS.GIF";
var magicLogo = "/listings/images/topchan/HGTV_TV_Guide_125x41_BS.GIF";
var magicLink = "http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=5793958&PluID=0&ord=%n";
var magicBkgnd = "#FFFFFF";
var magicTextClr = "#FFFFFF";
var magicLeftOffset = 690;
var magicSources = [424];
var magicIDtype = 0;
var magicRepeat = true;
var magicHpImage = "/listings/images/topchan/HGTV_TV_Guide_100x40.gif";
var magicHpBkgnd = "#994500";
var magicTrackingPixel = "http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=5793958&PluID=0&ord=%n&rtu=-1";
var magicChannelLocation = "bottom";

/* New! Franchise Channel Check-Ins */
var franchiseCheckin = new Object();
franchiseCheckin.Enabled = true;
franchiseCheckin.ObjectID = 377339;
franchiseCheckin.ProgramID = 21241147;
franchiseCheckin.CategoryID = 9;
franchiseCheckin.SeriesID = 20871943;
franchiseCheckin.SportsNonEvent = false;
franchiseCheckin.ProgramTitle = "Buying and Selling";
franchiseCheckin.EpisodeTitle = "Kristin & Craig";
franchiseCheckin.ObjectUrl = "http://www.tvguide.com/tvshows/buying-and-selling/377339";
franchiseCheckin.CallLetters = "HGTV";
franchiseCheckin.StartTime = "201211282100";
franchiseCheckin.BadgeUrl = "";
franchiseCheckin.LeftOffset = 530;

//var locationQueryString = location.search.substring(1, location.search.length);
var locationRef = grid_getQueryParam("billboard");
if (locationRef === "") {
	locationRef = grid_getQueryParam("clutterbuster");
}

var adlocation = (locationRef !== "" && locationRef === "true") ? true : 0;

/* Moveable Ads */
var bEnableWallpaperAds = true;
var bEnableRichmediaAds = true;
var slot_banner_top = 0;
var slot_box_300x250 = 0;
var bEnableWallpaperAds_HP = true;
var bEnableRichmediaAds_HP = true;
var slot_banner_top_HP = 0;
var slot_box_300x250_HP = 0;
var bEnableWallpaperAds_LST = true;
var bEnableRichmediaAds_LST = true;
var slot_banner_top_LST = 1;
var slot_banner_top_NT = 0;
var slot_box_300x250_NT = 0;

/* Delayed Ad Loading */
var bEnableDelayedAds = false;
var iDelayedAdSeconds = 2;

if (location.host === "qa.tvguide.com" || location.host === "qa-test.tvguide.com" || location.host === "localhost.tvguide.com:2008"){
	// var locationQueryString = location.search.substring(1, location.search.length);
	slot_banner_top_HP = (locationRef !== "" && locationRef === "true") ? true : 0;
	slot_banner_top_LST = (locationRef !== "" && locationRef === "true") ? true : 0;
}

function grid_getQueryParam(strName) {
	var queryString = document.location.search.replace("?", "");
	var params = queryString.split("&");
	for (i = 0; i < params.length; i++) {
		var param = params[i].split("=");
		if (param[0] == strName) {
			return param[1];
		}
	}
}