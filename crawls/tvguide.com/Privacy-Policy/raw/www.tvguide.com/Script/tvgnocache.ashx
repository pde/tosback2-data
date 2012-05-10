var commentingOffline = false;

/* cookie: ServiceID=80001.0 srvid=80001 */

var tvgServerTimeUTC = new Date(2012,4,10,12,11,21,0);

var dServerET = new Date(2012,4,10,8,11,21,0);
var dSrvrTime = new Date();

dSrvrTime.setUTCFullYear(2012,4,10);
dSrvrTime.setUTCHours(12,11,21,0);

var dLocalTime = new Date(2012,4,10,8,11,21,0);
var dGridStart = new Date(2012,4,10,8,0,0,0);

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
var disqus_config = function() { this.page.remote_auth_s3 = 'eyJhdmF0YXIiOm51bGwsImVtYWlsIjpudWxsLCJpZCI6MCwidXJsIjpudWxsLCJ1c2VybmFtZSI6bnVsbH0= eaf7bf7e51ec48bcd6324c5b7a84bf57a5d1932b 1336651881';
this.page.api_key = '7q9PYxT0Zrp3AGAihrE22VtKgB9g8UBy6lXSNFSgyvPkZw48znCpTNtkmk5lP7e4';
 }
var disqus_shortname = 'tvguide';
var WWWBaseUrl = "http://www.tvguide.com";
var MoviesBaseUrl = "http://movies.tvguide.com";
var SportsBaseUrl = "http://www.tvguide.com";
var OvgBaseUrl = "http://video.tvguide.com";
var tvg_s_account = "tvgproduction";
var prestitial_active = false;
/* TVGSVC02 5/10/2012 12:00:00 PM GMT */

/* Listings: In-Grid and Close-Up Ads */
var GridAds = true;
var MaxGridAds = 3;
var bTopRowGridAd = false;
var bCloseupAd = false;

/* Listings: Top Channel Promo */
var magicTopImage = "/listings/images/topchan/WP_Top_new.jpg";
var magicBotImage = "/listings/images/topchan/WP_Bottom_SUN.jpg";
var magicLogo = "/listings/images/topchan/WP_Middle.jpg";
var magicLink = "http://www.facebook.com/TVGuideNetwork#!/TVGuideNetwork/app_153855648022942";
var magicBkgnd = "#FFFFFF";
var magicTextClr = "#FFFFFF";
var magicLeftOffset = 640;
var magicSources = [4678,12013];
var magicIDtype = 0;
var magicRepeat = true;
var magicHpImage = "/listings/images/topchan/TVGuide-Network-100x40.jpg";
var magicHpBkgnd = "#CD2833";
var magicTrackingPixel = "";
var magicChannelLocation = "top";

/* New! Franchise Channel Check-Ins */
var franchiseCheckin = new Object();
franchiseCheckin.Enabled = false;
franchiseCheckin.ObjectID = 0;
franchiseCheckin.ProgramID = 0;
franchiseCheckin.CategoryID = 0;
franchiseCheckin.SeriesID = 0;
franchiseCheckin.SportsNonEvent = false;
franchiseCheckin.ProgramTitle = "";
franchiseCheckin.EpisodeTitle = "";
franchiseCheckin.ObjectUrl = "";
franchiseCheckin.CallLetters = "";
franchiseCheckin.StartTime = "198001011200";
franchiseCheckin.BadgeUrl = "";
franchiseCheckin.LeftOffset = 0;

var locationQueryString = location.search.substring(1, location.search.length);
var locationRef = locationQueryString.substring(14, locationQueryString.length);
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

/* Delayed Ad Loading */
var bEnableDelayedAds = false;
var iDelayedAdSeconds = 2;

if (location.host === "qa.tvguide.com" || location.host === "qa-test.tvguide.com"){
var locationQueryString = location.search.substring(1, location.search.length);
var locationRef = locationQueryString.substring(14, locationQueryString.length);
slot_banner_top_HP = (locationRef !== "" && locationRef === "true") ? true : 0;
slot_banner_top_LST = (locationRef !== "" && locationRef === "true") ? true : 0;}
