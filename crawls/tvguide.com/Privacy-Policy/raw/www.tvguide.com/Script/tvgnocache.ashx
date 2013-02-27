var commentingOffline = false;

/* cookie: ServiceID=80001.0 srvid=80001 */

var tvgServerTimeUTC = new Date(2013,1,27,13,15,34,0);

var dServerET = new Date(2013,1,27,8,15,34,0);
var dSrvrTime = new Date();

dSrvrTime.setUTCFullYear(2013,1,27);
dSrvrTime.setUTCHours(13,15,34,0);

var dLocalTime = new Date(2013,1,27,8,15,34,0);
var dGridStart = new Date(2013,1,27,8,0,0,0);

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
var disqus_config = function() { this.page.remote_auth_s3 = 'eyJhdmF0YXIiOm51bGwsImVtYWlsIjpudWxsLCJpZCI6MCwidXJsIjpudWxsLCJ1c2VybmFtZSI6bnVsbH0= ba53f49af9242f376c3e42243e28070be73b935b 1361970934';
this.page.api_key = '7q9PYxT0Zrp3AGAihrE22VtKgB9g8UBy6lXSNFSgyvPkZw48znCpTNtkmk5lP7e4';
 }
var disqus_shortname = 'tvguide';
var WWWBaseUrl = "http://www.tvguide.com";
var MoviesBaseUrl = "http://movies.tvguide.com";
var SportsBaseUrl = "http://www.tvguide.com";
var OvgBaseUrl = "http://video.tvguide.com";
var tvg_s_account = "tvgproduction";
var prestitial_active = false;
/* TVGSVC02 2/27/2013 1:00:00 PM GMT */

/* Listings: In-Grid and Close-Up Ads (2013-02-27)*/
var GridAds = true;
var MaxGridAds = 8;
var bTopRowGridAd = false;
var bCloseupAd = false;

/* Listings: Top Channel Promo */
var magicTopImage = "/listings/images/topchan/tnt_bf_tvg_listings_770x26_01.jpg";
var magicBotImage = "/listings/images/topchan/tnt_bf_tvg_listings_770x26_02_2.22.jpg";
var magicLogo = "/listings/images/topchan/tnt_bf_tvg_listings_125x41.jpg";
var magicLink = "http://ad.doubleclick.net/clk;268770869;94866009;i";
var magicBkgnd = "#FFFFFF";
var magicTextClr = "#FFFFFF";
var magicLeftOffset = 680;
var magicSources = [427];
var magicIDtype = 0;
var magicRepeat = true;
var magicHpImage = "";
var magicHpBkgnd = "#FFFFFF";
var magicTrackingPixel = "http://ad.doubleclick.net/ad/N6305.6478.TVGUIDEONLINE/B7379872.4;sz=1x1;ord=[timestamp]?";
var magicChannelLocation = "bottom";

/* New! Franchise Channel Check-Ins */
var franchiseCheckin = new Object();
franchiseCheckin.Enabled = true;
franchiseCheckin.ObjectID = 533055;
franchiseCheckin.ProgramID = 21661357;
franchiseCheckin.CategoryID = 5;
franchiseCheckin.SeriesID = 21659438;
franchiseCheckin.SportsNonEvent = false;
franchiseCheckin.ProgramTitle = "Boston's Finest";
franchiseCheckin.EpisodeTitle = "Everything Is Personal";
franchiseCheckin.ObjectUrl = "http://www.tvguide.com/tvshows/bostons-finest/533055";
franchiseCheckin.CallLetters = "TNT";
franchiseCheckin.StartTime = "201302272100";
franchiseCheckin.BadgeUrl = "http://static.tvguide.com/MediaBin/Galleries/Shows/A_F/Bi_Bp/Bostons_Finest/boston-finest-badge.jpg";
franchiseCheckin.LeftOffset = 625;

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
var slot_banner_top_HP = 1;
var slot_box_300x250_HP = 0;
var bEnableWallpaperAds_LST = true;
var bEnableRichmediaAds_LST = true;
var slot_banner_top_LST = 0;
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