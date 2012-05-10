/*** AJAX & JS Configuration parameters for territories ***/

/* Live search */
	
	var livesearchon = ""; //Enable or disable live search. "true" for on. blank or any other value for off.
	var minchars = 2; //Min number of characters input before suggestions are triggered
	
	// Change to location of custom live search xml file
	var suggestionsfile = "/en_GX/webadmin/ajax/livesearch/livesearch.xml";

	var livesearchheader = "Recommended results";
	var livesearchlink = "View all results >>";
	if (document.getElementById("searchfield")) {
		var livesearchtarget = "/en_GX/webadmin/forms/searchresults.jhtml?searchfield=" + document.getElementById("searchfield").value;
	} else {
		var livesearchtarget = "#";
	}

/* Send & share links */

	// NB! This is required for all cc-ll.js files regardless
	var arr_ss = new Array();

		// Icon, Pre-URL, Post-URL, Description/alt tag, Onlick, A Target. Only declare them if they don't already exist from local.js

	// EMAIL
	arr_ss [0] = new Array()
	arr_ss [0][0] = "/en_GX/webadmin/assets/image/share_email.gif";
	arr_ss [0][1] = "javascript:emailpage();";
	arr_ss [0][2] = ""
	arr_ss [0][3] = "Email this page";
	arr_ss [0][4] = "";
	arr_ss [0][5] = "";
	
	// Linkedin local
	arr_ss [1] = new Array()
	arr_ss [1][0] = "/en_GX/webadmin/assets/image/share_linked.gif";
	arr_ss [1][1] = "http://www.linkedin.com/shareArticle?mini=true&url=" + escape(window.location);
	arr_ss [1][2] = "?WT.mc_id=sharebookmark_linkedin";
	arr_ss [1][3] = "Linkedin";
	arr_ss [1][4] = "wrs_trackclick(\"DCS.dcsuri=http://www.linkedin.com_sharebookmark\",\"WT.ti=Offsite: http://www.linkedin.com_sharebookmark\",\"WT.dl=24\")";
	arr_ss [1][5] = "_new";

	// Facebook
	arr_ss [2] = new Array()
	arr_ss [2][0] = "/en_GX/webadmin/assets/image/share_facebook.gif";
	arr_ss [2][1] = "http://www.facebook.com/share.php?u=" + escape(window.location);
	arr_ss [2][2] = "?WT.mc_id=sharebookmark_facebook";
	arr_ss [2][3] = "Facebook";
	arr_ss [2][4] = "wrs_trackclick(\"DCS.dcsuri=http://www.facebook.com_sharebookmark\",\"WT.ti=Offsite: http://www.facebook.com_sharebookmark\",\"WT.dl=24\")";
	arr_ss [2][5] = "_new";

	// Mixx
	arr_ss [3] = new Array()
	arr_ss [3][0] = "/en_GX/webadmin/assets/image/share_mixx.gif";
	arr_ss [3][1] = "http://www.mixx.com/submit?page_url=" + escape(window.location);
	arr_ss [3][2] = "?WT.mc_id=sharebookmark_mixx";
	arr_ss [3][3] = "Mixx";
	arr_ss [3][4] = "wrs_trackclick(\"DCS.dcsuri=http://www.mixx.com_sharebookmark\",\"WT.ti=Offsite: http://www.mixx.com_sharebookmark\",\"WT.dl=24\")";
	arr_ss [3][5] = "_new";

	// Digg
	arr_ss [4] = new Array()
	arr_ss [4][0] = "/en_GX/webadmin/assets/image/share_digg.gif";
	arr_ss [4][1] = "http://digg.com/submit?phase=2&url=" + escape(window.location);
	arr_ss [4][2] = "?WT.mc_id=sharebookmark_digg";
	arr_ss [4][3] = "Digg";
	arr_ss [4][4] = "wrs_trackclick(\"DCS.dcsuri=http://www.digg.com_sharebookmark\",\"WT.ti=Offsite: http://www.digg.com_sharebookmark\",\"WT.dl=24\")";
	arr_ss [4][5] = "_new";

	// Google buzz
	arr_ss [5] = new Array()
	arr_ss [5][0] = "/en_GX/webadmin/assets/image/share_googlebuzz.gif";
	arr_ss [5][1] = "http://www.google.com/reader/link?url=" + escape(window.location);
	arr_ss [5][2] = "?WT.mc_id=sharebookmark_googlebuzz";
	arr_ss [5][3] = "Google buzz";
	arr_ss [5][4] = "wrs_trackclick(\"DCS.dcsuri=http://www.google.com_sharebookmark\",\"WT.ti=Offsite: http://www.google.com_sharebookmark\",\"WT.dl=24\")";
	arr_ss [5][5] = "_new";

	// Delicious
	arr_ss [6] = new Array()
	arr_ss [6][0] = "/en_GX/webadmin/assets/image/share_delicious.gif";
	arr_ss [6][1] = "http://del.icio.us/post?url=" + escape(window.location);
	arr_ss [6][2] = "?WT.mc_id=sharebookmark_delicious";
	arr_ss [6][3] = "Delicious";
	arr_ss [6][4] = "wrs_trackclick(\"DCS.dcsuri=http://www.delicious.com_sharebookmark\",\"WT.ti=Offsite: http://www.delicious.com_sharebookmark\",\"WT.dl=24\")";
	arr_ss [6][5] = "_new";

	// Twitter
	arr_ss [7] = new Array()
	arr_ss [7][0] = "/en_GX/webadmin/assets/image/share_twitter.gif";
	arr_ss [7][1] = "http://twitter.com/home?status=Currently%20reading%20" + escape(window.location);
	arr_ss [7][2] = "?WT.mc_id=sharebookmark_twitter";
	arr_ss [7][3] = "Twitter";
	arr_ss [7][4] = "wrs_trackclick(\"DCS.dcsuri=http://www.twitter.com_sharebookmark\",\"WT.ti=Offsite: http://www.twitter.com_sharebookmark\",\"WT.dl=24\")";
	arr_ss [7][5] = "_new";

/* Placeholder */

