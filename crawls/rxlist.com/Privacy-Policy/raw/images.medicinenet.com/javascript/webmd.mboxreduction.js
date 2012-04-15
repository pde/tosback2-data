/*
 Checks location.pathname and location.hostname
 against the contents of the array mboxr.
 If a match is found, the original contents of 
 webmd.mbox.js will also be added to the page,
 and a cookie (pvcookie) will then be set to retain 
 this regardless of location as users continue to 
 traverse the site.
 -JS 
*/
/* has not been declared */

if (!window.s_channel)
    var s_channel = "";

if (!window.s_asset)
    var s_asset = "";
/* has not been declared */
	
(function() {
  
var mboxArticleID = [

];

var mboxTopicID = [
    
];
		//var mboxlocsplit = location.pathname.split("/");		
		//var mboxa = jQuery.inArray(location.hostname, mboxr);
		//var mboxb = jQuery.inArray(mboxlocsplit[1], mboxr);
        var mboxa = jQuery.inArray(s_asset, mboxArticleID);
        var mboxb = jQuery.inArray(s_channel, mboxTopicID);
        if (webmd.cookie.exists('mboxreduction') || mboxa != '-1' || mboxb != '-1'){	
			webmd.cookie.set('mboxreduction', true, {expires:14});
			var host = location.hostname;
			document.writeln("<script language='javascript' type='text/javascript' src='http://"+ host.replace("www", "images") +"/javascript/webmd.mboxset.js'></script>");
			document.writeln('<div class="mboxDefault"></div>');
			//document.writeln("<script language='javascript' type='text/javascript'>mboxCreate('OOMbox');</script>");
		}
		else {
		}

})();
