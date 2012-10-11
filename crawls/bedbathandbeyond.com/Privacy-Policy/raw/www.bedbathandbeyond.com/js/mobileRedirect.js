var bStopMobileRedirect = false;
var queryString = location.search;
var sCookieval = readCookie("stop_mobi");

if ( ( location.search.length > 0 && location.search.toLowerCase().indexOf( "stop_mobi=yes" ) > -1 ) || sCookieval == "yes" )
{
	bStopMobileRedirect = true;
	if ( sCookieval == "" || sCookieval == null )
	{
		createCookie( "stop_mobi", "yes", 0 );
	}
}

var sPath = window.location.pathname;
var sPage = sPath.substring( sPath.lastIndexOf('/') + 1 ).toLowerCase();

if ( isMobile() && !bStopMobileRedirect )
{
	if ( sPage == "reghome.asp" || sPage == "rdreghome.asp" )
		window.location = "https://m.bedbathandbeyond.com/bedbathbeyond/registry/registryForward.do";
	else if ( sPage == "btshome.asp" || sPage == "rdbtshome.asp" || sPage == "btspracticalsolutionshome.asp" )
		window.location = "http://bbby.apps.netbiscuits.com";
	else if ( sPage == "trackorders.asp" || sPage == "rdtrackorders.asp" )
		window.location = "https://m.bedbathandbeyond.com/bedbathbeyond/foot/trackorder.do";
	else if ( sPage == "giftcardhome.asp" || sPage == "rdgiftcardhome.asp" )
		window.location = "https://m.bedbathandbeyond.com/bedbathbeyond/catalog.do?cid=1489872";
	else if ( sPage == "rdstoreloc.asp" || sPage == "storeLocator.asp" )
		window.location = "https://m.bedbathandbeyond.com/bedbathbeyond/store/locator.do";
	else if ( sPage== "policyprivacy.asp" || sPage == "rdpolicyprivacy.asp" )
		window.location = "https://m.bedbathandbeyond.com:443/bedbathbeyond/foot/footPrivacy.do";
	else if ( sPage== "contactus.asp" || sPage == "rdcontactus.asp" )
		window.location = "https://m.bedbathandbeyond.com:443/bedbathbeyond/foot/contractus.do";	
	else if ( sPage == "product.asp" || sPage == "stylepage.asp" || sPage == "nodepage.asp" )
		window.location = "http://m.bedbathandbeyond.com/redirect/bedbathbeyond?op=" + encodeURI( window.location.href );
	else
		window.location = "http://m.bedbathandbeyond.com/bedbathbeyond/";
}

function isMobile()
{
	var bIsMobileDevice = false;
	var uagent = "";
	if (navigator && navigator.userAgent)
		agt = navigator.userAgent.toLowerCase();

	if ( agt.indexOf( "android" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "au-mic" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "audiovox-" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "alcatel" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "blackberry" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "blazer" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "danger\ hiptop" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "docomo/" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "ericsson" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "googlebot-mobile" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "msn\ mobile\ proxy" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "handheld" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "iphone" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "ipod" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "klondike" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "lg-" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "lge-" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "\ lge\ " ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "mot-" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "netfront" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "nokia" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "novarra-vision" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "opera\ mini" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "palmsource" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "panasonic-" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "sagem-" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "samsung" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "sgh-" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "sharp-" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "sie-" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "samsung-" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "smartphone" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "sony" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "symbian\ os" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "webos" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "windows\ ce" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "windows\ mobile" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "nokia" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "portalmmm" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "profile/midp-" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "up.link" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "up.browser" ) >= 0 ) bIsMobileDevice = true;
	else if ( agt.indexOf( "xv6875" ) >= 0 ) bIsMobileDevice = true;

	return bIsMobileDevice;
}

function readCookie( name ) 
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while( c.charAt(0) == ' ' )
			c = c.substring( 1, c.length );
		if ( c.indexOf( nameEQ ) == 0 )
			return c.substring( nameEQ.length, c.length );
	}
	return null;
}

function createCookie( name, value, days ) 
{
	if ( days )
	{
		var date = new Date();
		date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
		var expires = "; expires=" + date.toGMTString();
	}
	else 
		var expires = ";";
		
	document.cookie = name + "=" + value + expires + "; path=/";
}