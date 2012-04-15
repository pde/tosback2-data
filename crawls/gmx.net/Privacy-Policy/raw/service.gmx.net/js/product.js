/* 	id: tab to switch "on"
tabs: tab count */
function switchTab (id, tabs) {
	var listItem = document.getElementById("tab"+id);
	if (listItem.className != "active" || listItem.className != "") {
		listItem.className = "active";
		listItem.blur();
	}
	else {
		listItem.className = "";
	}
	for (var i = 0, len = (tabs-1); i <= len; i++) {
		if ( i != id )
			document.getElementById("tab"+i).className = "";
	}

	var listItem2 = document.getElementById("navi"+id);
	if (listItem2.className != "active" || listItem2.className != "") {
		listItem2.className = "active";
		listItem2.blur();
	}
	else {
		listItem2.className = "";
	}
	for (var i = 0, len = (tabs-1); i <= len; i++) {
		if ( i != id )
			document.getElementById("navi"+i).className = "";
	}
	return false;
}

/* Ein- und Ausklappen von Tabellen (Bsp. Tarifvergleich auf MailProduktseiten) */
function toggleTable (tableName) {

	var activeItem = document.getElementById(tableName+"-active");
	var inactiveItem = document.getElementById(tableName+"-inactive");
	
	if (activeItem.className == "off") {
		inactiveItem.className = "off";
		activeItem.className = "";
		
	}
	else {
		activeItem.className = "off";
		inactiveItem.className = "";
	}
	
}

/* UIM Clicktracking für Browserdownloads */
function browserDownloadClicktrack(node, href){
	var img=new Image(1,1), ms=250, tc=new Date()*1+ms, section=location.pathname;
	section = section.substring((section.indexOf('/g.fcgi/')+7)).replace(/\//g, '.');
	img.src='//wa.ui-portal.de/gmx/gmx/s?produkte.browserdownload.download'+section+'&bd_name='+(/\/([^/]+)$/.test(node.href) && RegExp.$1).toLowerCase()+'&ns__t='+(+new Date());
	img.onload=function(){tc-=ms;return;};
	while (+new Date() < tc) {};

	if ((node.target || '_self') == '_self') {
		var link = node.href;
		if(href == undefined) {
			window.setTimeout(function(){ location.href = link; }, 100);
		}
		return false;
	}
}

$(document).ready(function() {

	/* MailProduktübersicht Detailboxen */

	$("div.small-box-header-free p, div.small-box-header-pro p, div.small-box-header-top p").css("cursor","pointer");
	$("div.small-box-header-free p").children("img").attr("src","net/products/mail/v2/open.gif").attr("alt","mehr");
	$("div.small-box-header-pro p").children("img").attr("src","net/products/mail/v2/open.gif").attr("alt","mehr");
	$("div.small-box-header-top p").children("img").attr("src","net/products/mail/v2/open.gif").attr("alt","mehr");
	$("div.freemailpart li").slice(4, 9).hide();
	$("div.promailpart li").slice(4, 13).hide();
	$("div.topmailpart li").slice(4, 15).hide();
	
	$("div.small-box-header-free p").toggle(
		function () {
			$(this).children("img").attr("src","net/products/mail/v2/close.gif").attr("alt","weniger");
			$("div.freemailpart li").slice(4, 9).slideDown("slow");
		},
		function () {
			$(this).children("img").attr("src","net/products/mail/v2/open.gif").attr("alt","mehr");
			$("div.freemailpart li").slice(4, 9).slideUp("slow");
		}
	);
	$("div.small-box-header-pro p").toggle(
		function () {
			$(this).children("img").attr("src","net/products/mail/v2/close.gif").attr("alt","weniger");
			$("div.promailpart li").slice(4, 13).slideDown("slow");
		},
		function () {
			$(this).children("img").attr("src","net/products/mail/v2/open.gif").attr("alt","mehr");
			$("div.promailpart li").slice(4, 13).slideUp("slow");
		}
	);
	$("div.small-box-header-top p").toggle(
		function () {
			$(this).children("img").attr("src","net/products/mail/v2/close.gif").attr("alt","weniger");
			$("div.topmailpart li").slice(4, 15).slideDown("slow");
		},
		function () {
			$(this).children("img").attr("src","net/products/mail/v2/open.gif").attr("alt","mehr");
			$("div.topmailpart li").slice(4, 15).slideUp("slow");
		}
	);
	
	/* Ende MailProduktübersicht Detailboxen */

	/*  Ein- und Ausklappen von TabellenTeilen */
	
	$("tr.headline").css("cursor","pointer");
	$("tr.headline").toggle(
		function() {
			$(this).nextUntil('tr.headline').hide();
			$(this).children("th").children("img").attr("src","net/products/mail/v2/open.gif").attr("alt","mehr");
		},
		function() {
			$(this).nextUntil('tr.headline').show();
			$(this).children("th").children("img").attr("src","net/products/mail/v2/close.gif").attr("alt","weniger");
	});
	
	
});

/*--------------------------------*/







