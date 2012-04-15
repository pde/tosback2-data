// Site Specific Omniture Settings
// Desc: This file is used to store site specific settings
// Note: Please enter the site name on the line below to identify the site.
// Site: Kansas City Star
////////////////////////////////////////////////////////////////////////////

// MI Stats Function
function miStatsObject(){} 

// MI Stats Object
var mistats = new miStatsObject();

// Site specific variables
mistats.sitename    = "Kansas City Star";  	      					// Site Name
mistats.account     = "nmkansascity";                 					// Report Suite ID
mistats.bizunit     = "KSC";                          					// Business Unit
mistats.pubname     = "KC";                           					// Publication Code
mistats.regcookie   = "kansascitystar_user_auth";     					// Insite Cookie Name
mistats.segcookie   = "segments";             	      					// Insite Segments Cookie Name
mistats.sitefile    = "http://media.kansascity.com/mistats/sites/ksc/kansascity.js";	// Site Specific File Name

// Third Party
mistats.tacoda	    = "15065";			      					// Tacoda ID
mistats.tyntid      = "user=b0O_yobiOr36gxadbiUzgI&s=122";				// Tynt ID

// Call custom .js file for sites use (uncomment to use)
//document.write("\n<" + "script type='text/javascript' src='http://media.mcclatchyinteractive.com/mistats/custom.js'>" + "</" + "script>");

// Yahoo Site Variables
if(typeof(miyahoo) != 'undefined') {
	miyahoo.ads.live.yahoo.request_type = "ac";
	miyahoo.ads.preview.yahoo.request_type = "ac";
	miyahoo.ads.live.yahoo.enabled = true;
	miyahoo.ads.live.dart.enabled = false;
	miyahoo.ads.preview.yahoo.enabled = true;
	miyahoo.ads.preview.dart.enabled = false;

	misite = {};
	misite.yahoo_pub_id = "22663847118";
	misite.yahoo_site_name = "Kansas City Star";
}

// Load new mitnt code - JG 2011-11-08
mistats.mediahostname = (new String(mistats.sitefile)).match(new RegExp('https*://[^/]+/', 'i'));
document.write('<scr' + 'ipt type="text/javascript" src="' + mistats.mediahostname + 'mistats/mitnt_common.js"></scr' + 'ipt>');

