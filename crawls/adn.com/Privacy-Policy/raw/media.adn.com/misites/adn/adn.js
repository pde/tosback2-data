// Site Specific Omniture Settings
// Desc: This file is used to store site specific settings
// Note: Please enter the site name on the line below to identify the site.
// Site: ADN
////////////////////////////////////////////////////////////////////////////

// MI Stats Function 
function miStatsObject(){} 

// MI Stats Object
var mistats = new miStatsObject();

// Site specific variables
mistats.sitename    = "Anchorage Daily News";  					// Site Name
mistats.account     = "nmanchorage";   	       					// Report Suite ID
mistats.bizunit     = "ADN";                   					// Business Unit
mistats.pubname     = "ADN";                   					// Publication Code
mistats.regcookie   = "adn_user_auth";         					// Insite Cookie Name
mistats.segcookie   = "segments";              					// Insite Segments Cookie Name
mistats.sitefile    = "http://media.adn.com/misites/adn/adn.js";	       	// Site File Name

// Third Party 
mistats.tacoda      = "11700";		       					// Tacoda ID
mistats.tyntid      = "user=bEaj-KbiCr37wJadbiUzgI&s=121"; 			// Tynt ID

// Call custom .js file for sites use (uncomment to use)
//document.write("\n<" + "script type='text/javascript' src='http://media.mcclatchyinteractive.com/mistats/custom.js'>" + "</" + "script>");

// Yahoo Site Variables
if( typeof(miyahoo) != 'undefined' ) {
        miyahoo.ads.live.yahoo.request_type = "fc";
        miyahoo.ads.preview.yahoo.request_type = "ac";
        miyahoo.ads.live.yahoo.enabled = true;
        miyahoo.ads.live.dart.enabled = true;
        miyahoo.ads.preview.yahoo.enabled = false;
        miyahoo.ads.preview.dart.enabled = true;

        misite = {};
        misite.yahoo_pub_id = "22629112451";
        misite.yahoo_site_name = "Anchorage Daily News";
}

