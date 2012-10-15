var commentingOffline = false;

/* cookie: ServiceID=80001.0 srvid=80001 */

var tvgServerTimeUTC = new Date(2012,9,15,12,14,7,0);

var dServerET = new Date(2012,9,15,8,14,7,0);
var dSrvrTime = new Date();

dSrvrTime.setUTCFullYear(2012,9,15);
dSrvrTime.setUTCHours(12,14,7,0);

var dLocalTime = new Date(2012,9,15,8,14,7,0);
var dGridStart = new Date(2012,9,15,8,0,0,0);

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
var disqus_config = function() { this.page.remote_auth_s3 = 'eyJhdmF0YXIiOm51bGwsImVtYWlsIjpudWxsLCJpZCI6MCwidXJsIjpudWxsLCJ1c2VybmFtZSI6bnVsbH0= c23a24d682430c485bfd6b3fdce17a24a07984bc 1350303247';
this.page.api_key = '7q9PYxT0Zrp3AGAihrE22VtKgB9g8UBy6lXSNFSgyvPkZw48znCpTNtkmk5lP7e4';
 }
var disqus_shortname = 'tvguide';
var WWWBaseUrl = "http://www.tvguide.com";
var MoviesBaseUrl = "http://movies.tvguide.com";
var SportsBaseUrl = "http://www.tvguide.com";
var OvgBaseUrl = "http://video.tvguide.com";
var tvg_s_account = "tvgproduction";
var prestitial_active = false;
/* TVGSVC02 10/15/2012 12:00:00 PM GMT */

/* Listings: In-Grid and Close-Up Ads (2012-10-15)*/
var GridAds = true;
var MaxGridAds = 3;
var bTopRowGridAd = false;
var bCloseupAd = false;

/* Listings: Top Channel Promo */
var magicTopImage = "/listings/images/topchan/HHI_tvguide_triptych_770x25_Top.jpg";
var magicBotImage = "/listings/images/topchan/HHI_tvguide_triptych_770x25_Bottom.jpg";
var magicLogo = "/listings/images/topchan/HHI_revised_125x41_10.12_v2.jpg";
var magicLink = "http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=5475491&PluID=0&ord=%n";
var magicBkgnd = "#FFFFFF";
var magicTextClr = "#FFFFFF";
var magicLeftOffset = 700;
var magicSources = [424];
var magicIDtype = 0;
var magicRepeat = true;
var magicHpImage = "/listings/images/topchan/HHI_tvguide_triptych_100x40.jpg";
var magicHpBkgnd = "#5E85C8";
var magicTrackingPixel = "http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=5475491&PluID=0&ord=%n&rtu=-1";
var magicChannelLocation = "bottom";

/* New! Franchise Channel Check-Ins */
var franchiseCheckin = new Object();
franchiseCheckin.Enabled = true;
franchiseCheckin.ObjectID = 308182;
franchiseCheckin.ProgramID = 21102442;
franchiseCheckin.CategoryID = 9;
franchiseCheckin.SeriesID = 5546185;
franchiseCheckin.SportsNonEvent = false;
franchiseCheckin.ProgramTitle = "House Hunters International";
franchiseCheckin.EpisodeTitle = "Down by the Seaside in Hoi An, Vietnam";
franchiseCheckin.ObjectUrl = "http://www.tvguide.com/tvshows/house-hunters-international/308182";
franchiseCheckin.CallLetters = "HGTV";
franchiseCheckin.StartTime = "201210151030";
franchiseCheckin.BadgeUrl = "http://static.tvguide.com/MediaBin/Galleries/Shows/G_L/Hi_Hp/House_Hunters_International/house-hunters-international_badge.gif";
franchiseCheckin.LeftOffset = 500;

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
var slot_box_300x250_HP = 1;
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