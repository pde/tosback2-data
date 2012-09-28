/* Creating DCSext meta tag to track users who are logged in */
if($.cookie("tmg_pid")) {
	$("head").append($("<meta />").attr("name","WT.dcsvid").attr("content",$.cookie("tmg_pid")));
	$("head").append($("<meta />").attr("name","WT.seg_1").attr("content",$.cookie("tmg_pid"))); //added 30 Jun (DIGI-893)
	$("head").append($("<meta />").attr("name","WT.rv").attr("content","1")); //added 30 Jun (DIGI-893)
}

//Track the navigation click on the delivery page (and not in the referrer page)
if($.cookie("tmg_navPos")) {
	$("head").append($("<meta />").attr("name","DCSext.navigation").attr("content",$.cookie("tmg_navPos")));
	$.cookie('tmg_navPos', "", { expires: -1, path: '/',domain:'telegraph.co.uk'});
}

//*NEW - apply a persistent Telegraph.co.uk cookie to user's browsers to indicate they have registered and/or logged in (DIGI-893)
if($.cookie("tmg_regstatus")) {
	$("head").append($("<meta />").attr("name","WT.z_registered").attr("content","Y"));
	$.cookie('tmg_regstatus', "Y", { expires: -1, path: '/' });
}