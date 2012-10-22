/*** Graceful degrade for non-javascript users & some event capture for livesearch ***/

window.onload = addscript; // Graceful degrade stuff for non-javascript users
document.onclick = hidelivesearch; // Onclick capturing for closing live search box
(function($){$.fn.jTruncate=function(h){var i={length:300,minTrail:20,moreText:"more",lessText:"less",ellipsisText:"...",moreAni:"",lessAni:""};var h=$.extend(i,h);return this.each(function(){obj=$(this);var a=obj.html();if(a.length>h.length+h.minTrail){var b=a.indexOf(' ',h.length);if(b!=-1){var b=a.indexOf(' ',h.length);var c=a.substring(0,b);var d=a.substring(b,a.length-1);obj.html(c+'<span class="truncate_ellipsis">'+h.ellipsisText+'</span>'+'<span class="truncate_more">'+d+'</span>');obj.find('.truncate_more').css("display","none");obj.append('<div class="clearboth">'+'<a href="#" class="truncate_more_link">'+h.moreText+'</a>'+'</div>');var e=$('.truncate_more_link',obj);var f=$('.truncate_more',obj);var g=$('.truncate_ellipsis',obj);e.click(function(){if(e.text()==h.moreText){f.show(h.moreAni);e.text(h.lessText);g.css("display","none")}else{f.hide(h.lessAni);e.text(h.moreText);g.css("display","inline")}return false})}}})}})(jQuery);

if (searchfieldlabel === undefined) { var searchfieldlabel = " Search"; }
if (suggestionsfilelocal === undefined) { var suggestionsfilelocal = ""; }
var ccode = "";
var lcode = "";
var lccode = "";
var jsdevice = "desktop";

function addscript() {
	// check to see that the browser supports the getElementById method
	if (!document.getElementById) {
		return false; 
	} else {
		if (document.getElementById('searchfield')) { if (document.getElementById('searchfield').value == "") { document.getElementById('searchfield').value= searchfieldlabel; } }
		if (document.getElementById('countriesanchor')) { document.getElementById('countriesanchor').href = "#"; }
		if (document.getElementById('intllink')) {
		if (document.getElementById('intllayer')) { document.getElementById('intllink').href = "#"; }
		}
		if (document.getElementById('intllayer')) { document.getElementById('intllayer').innerHTML = "<h2>Commonly visited PwC sites</h2><table id='countriestable' border='0'><tbody><tr><td><ul class='countrylist'><li><a href='http://www.pwc.com/gx/en/index.jhtml?ld=no'>Global</a></li><li><a href='http://www.pwc.com.au'>Australia</a></li> <li><a href='http://www.pwc.com/br/pt'>Brazil</a></li> <li><a href='http://www.pwc.com/ca/en'>Canada</a></li> <li><a href='http://www.pwccn.com'>China</a>&nbsp;/&nbsp;<a href='http://www.pwchk.com'>Hong Kong</a></li> <li><a href='http://www.pwc.fr'>France</a></li> <li><a href='http://www.pwc.de'>Germany</a></li> <li><a href='http://www.pwc.com/in/en'>India</a></li></ul></td><td><ul class='countrylist'><li><a href='http://www.pwc.com/it/it'>Italy</a></li> <li><a href='http://www.pwc.com/jp/ja/index.jhtml'>Japan</a></li> <li><a href='http://www.pwc.com/mx/es'>Mexico</a></li><li><a href='http://www.pwc.com/m1/en'>Middle East</a></li> <li><a href='http://www.pwc.com/nl/nl'>Netherlands</a></li> <li><a href='http://www.pwc.com/ru/ru'>Russia</a></li> <li><a href='http://www.pwc.com/sg/en'>Singapore</a></li> <li><a href='http://www.pwc.com/za/en'>South Africa</a></li></ul></td><td valign='top'><ul class='countrylist'><li><a href='http://www.pwc.com/kr/ko'>South Korea</a></li> <li><a href='http://www.pwc.com/es/es'>Spain</a></li> <li><a href='http://www.pwc.com/se/sv'>Sweden</a></li> <li><a href='http://www.pwc.ch'>Switzerland</a></li> <li><a href='http://www.pwc.co.uk'>United Kingdom</a></li> <li><a href='http://www.pwc.com/us/en'>United States</a></li> </ul> </td></tr></tbody></table><div class='clearer'></div><p style='text-align: right; padding-right: 20px;'><a href='http://www.pwc.com/gx/en/site-index.jhtml'>Complete list of PwC territory sites</a></p><a href='#' onclick='intlhide(); return false;'><img src='/en_GX/webadmin/assets/image/icon_close.gif' alt='Close' id='intllayerclose'></a>"; /* 2011 Intl Sites */ }
		if (document.getElementById('popupclose')) { document.getElementById('popupclose').innerHTML = "<a href='#' target='_self' onclick='window.close();'>close window <img src='/en_GX/webadmin/assets/image/icon_close.gif' border='0' alt='close window' /></a>"; } //Add close window link for popup template
	}
	if (((BrowserDetect.browser)=="Firefox")&((BrowserDetect.version)=="3.5")) { document.getElementById('searchsubmit').style.marginBottom = "-10px"; }
	if (((BrowserDetect.browser)=="Firefox")&((BrowserDetect.version)=="3.6")&(BrowserDetect.OS)=="Mac") { document.getElementById('searchsubmit').style.marginBottom = "-8px"; }
}

/* ALL jquery.document ready loaded here */

$(document).ready(function(){
	$('#intllink').click(function() {
		$("#intllayer").toggle();
		if (document.getElementById('intllink').href == "#") { return false; }
	});
	if ($('meta[name=pwcCountry]').attr("content") == 'rm') {
		if ($('meta[name=pwcDB]').attr("content") == 'homepage' || $('meta[name=pwcDB]').attr("content") == 'home') {
			if (typeof followbar == 'undefined') { $('body').append(followbarhtml); }
			$('#followhide').click(function() { $('#followbar').fadeOut(500); });
		};
	};

	$('#morecontactsbutton').click(function() { 
		$("#morecontacts").slideDown("medium");
		$("#lesscontactsbutton").show();
		$("#morecontactsbutton").hide();
		return false;
	});
	$('#lesscontactsbutton').click(function() { 
		$("#morecontacts").slideUp("medium");
		$("#morecontactsbutton").show();
		$("#lesscontactsbutton").hide();
		return false;
	});
	$('#showlocalbutton').click(function() {
		$("#localcontacts").slideDown("medium");
		$("#hidelocalbutton").show();
		$("#showlocalbutton").hide();
		return false;
	});
	$('#hidelocalbutton').click(function() {
		$("#localcontacts").slideUp("medium");
		$("#showlocalbutton").show();
		$("#hidelocalbutton").hide();
		return false;
	});
	
	$("#pwcslider .feature").css("width", ($('#pwcslider').width()-40));
	$("#pwcslider .feature").css("height", ($('#pwcslider').height()-27));
	//$("#pwcslider").scrollable({ circular: true, size: 1, speed: 400, easing: 'swing', touch: false }).navigator({navi: ".navi",naviItem: 'a'}).autoscroll({ autoplay: true, autopause: true, interval: 5000 }).handleSwipes();
	//$("#pwcslider").scrollable({ circular: true, size: 1, speed: 400, easing: 'swing', touch: false }).navigator().autoscroll({ autoplay: true, autopause: true, interval: 5000 }).handleSwipes();
	$("#pwcslider").scrollable({ circular: true, size: 1, speed: 400, easing: 'swing', touch: false }).navigator({navi: ".navi",naviItem: 'a'}).handleSwipes();

	var contacttooltipoffset = 0
	if (((BrowserDetect.browser)=="Explorer")&((BrowserDetect.version)==8)) { contacttooltipoffset = -225; }
	$(".contacttooltip").tooltip({ position: "bottom left", relative: "true", offset: [-27,contacttooltipoffset]});

	$('.expander h3').click(function() {
		$(this).parent('div').slideToggle('fast', function() {});
		$(this).parent().siblings('div').slideToggle('fast', function() {});
	});
	
	//$("#accordion").tabs("#accordion div.pane", {tabs: 'h2', effect: 'slide', initialIndex: null});
	$("#accordion > h2").click(function(){
	     if (this.className == "current") {
	         $(this).removeClass("current");
	         $(this).next("div.pane").slideToggle("slow", function(){ $("#accordion h2").css("overflow","hidden")});
	     } else {
	         $(this).parent().children("h2").removeClass("current");
	         $(this).parent().children("div.pane").slideUp("slow");
	         $(this).toggleClass("current");
	         $(this).next("div.pane").slideToggle("slow", function(){ $("#accordion h2").css("overflow","hidden")});
	     }
	});
	$(".accordion > h2").click(function(){
	     if (this.className == "current") {
	         $(this).removeClass("current");
	         $(this).next("div.pane").slideToggle("slow", function(){ $(".accordion h2").css("overflow","hidden")});
	     } else {
	         $(this).parent().children("h2").removeClass("current");
	         $(this).parent().children("div.pane").slideUp("slow");
	         $(this).toggleClass("current");
	         $(this).next("div.pane").slideToggle("slow", function(){ $(".accordion h2").css("overflow","hidden")});
	     }
	});
	
	$("#promofeatures").scrollable().navigator({navi: "#flowtabs",naviItem: 'a'});
	$(".promostaticnav").tabs("#promostatic > .item", {effect: 'fade', rotate: 'true', fadeOutSpeed: 'fast'}).slideshow({autoplay: 'true', interval: '9000'});

	$('.tooltipgeneral[title]').tooltip({
		tipClass: 'tipgeneral',
		position: 'top right',
		offset: [-2,-18]
	});
	
});

$.fn.handleSwipes = function() {
	return this.each(function() {
		var api = $(this).data("scrollable");
		api.getRoot().addSwipeEvents()
		.bind('swipeleft', function() {
				api.next();
		})
		.bind('swiperight', function() {
				api.prev();
		});
	});
};
/*
function openpopup() {
	window.open('popup.html','popup','width=500,height=500');
}
*/


/*** START Primary nav hover function for IE ***/

sfHover = function() {
	var sfEls = document.getElementById("nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);

/*** START Countries selector ***/

// Preload the AJAX loading gif
ajaxgif=new Image();
ajaxgif.src="/en_GX/webadmin/assets/image/ajaxload.gif";

function countriesreveal() { // Show, hide or add to territory selector box
	document.getElementById('countriesbox').style.visibility = 'visible';
	
  // Set the static lists (no longer ajax)
	document.getElementById('countriesboxhead').innerHTML = "";
	var countriesheader="<div id='countriestitle'>Commonly visited PwC sites</div><br clear='all' />";

	document.getElementById('countriescontents').innerHTML = "";
  var countriesoutput="<table id='countriestable' border='0'><tbody><tr><td><ul class='countrylist'><li><a href='http://www.pwc.com/gx/en/index.jhtml?ld=no'>Global</a></li><li><a href='http://www.pwc.com.au'>Australia</a></li> <li><a href='http://www.pwc.com/br/pt'>Brazil</a></li> <li><a href='http://www.pwc.com/ca/en'>Canada</a></li> <li><a href='http://www.pwccn.com'>China</a>&nbsp;/&nbsp;<a href='http://www.pwchk.com'>Hong Kong</a></li> <li><a href='http://www.pwc.fr'>France</a></li> <li><a href='http://www.pwc.de'>Germany</a></li> <li><a href='http://www.pwc.com/in/en'>India</a></li></ul></td><td><ul class='countrylist'><li><a href='http://www.pwc.com/it/it'>Italy</a></li> <li><a href='http://www.pwc.com/jp/ja/index.jhtml'>Japan</a></li> <li><a href='http://www.pwc.com/mx/es'>Mexico</a></li><li><a href='http://www.pwc.com/m1/en'>Middle East</a></li> <li><a href='http://www.pwc.com/nl/nl'>Netherlands</a></li> <li><a href='http://www.pwc.com/ru/ru'>Russia</a></li> <li><a href='http://www.pwc.com/sg/en'>Singapore</a></li> <li><a href='http://www.pwc.com/za/en'>South Africa</a></li></ul></td><td valign='top'><ul class='countrylist'><li><a href='http://www.pwc.com/kr/ko'>South Korea</a></li> <li><a href='http://www.pwc.com/es/es'>Spain</a></li> <li><a href='http://www.pwc.com/se/sv'>Sweden</a></li> <li><a href='http://www.pwc.ch'>Switzerland</a></li> <li><a href='http://www.pwc.co.uk'>United Kingdom</a></li> <li><a href='http://www.pwc.com/us/en'>United States</a></li> </ul> </td></tr></tbody></table><br clear='all'> <p style='text-align: right; font-weight: bold;'><a href='http://www.pwc.com/gx/en/site-index.jhtml'>Complete list of PwC territory sites</a></p><br clear='all' />";
	
	// Finally write the output; close button, header & contents.
	document.getElementById('countriesboxclose').innerHTML = "<a href='#' onClick='countrieshide(); return false;'><img src='/en_GX/webadmin/assets/image/icon_close.gif' alt='Close' border='0' id='countriesclosebutton' /></a>"
	document.getElementById('countriesboxhead').innerHTML = countriesheader;
	document.getElementById('countriescontents').innerHTML = countriesoutput;
}


function countrieshide() { 	// Clear the contents of the box and hide the div
	document.getElementById('countriescontents').innerHTML = "";  
	document.getElementById('countriesbox').style.visibility = 'hidden';  
}
function intlhide() { document.getElementById('intllayer').style.display = 'none'; }

/*** START Live search ***/

var xmlHttp, metacnt
	
function showResult(str) {
	// Clear the suggestions box when no chars
	if (str.length<=minchars) {
		document.getElementById("livesearch").innerHTML="";
		document.getElementById("livesearch").style.visibility="hidden";
		return
	}
	if (livesearchon!="true") {
		return
	}
	
	// Place the AJAX loading gif. Replaced with the clear icon after the request is complete (below)
	document.getElementById("livesearchbutton").src="/en_GX/webadmin/assets/image/ajaxload.gif";
	document.getElementById("livesearchbutton").className="";
	
	xmlhttp=null;

	var metas = document.getElementsByTagName('META');
	for (metacnt = 0; metacnt < metas.length; metacnt++) {
		if (metas[metacnt].getAttribute('NAME') == "pwcCountry") {
			ccode = metas[metacnt].getAttribute('CONTENT');
		} else if (metas[metacnt].getAttribute('NAME') == "pwcLang") {
			lcode = metas[metacnt].getAttribute('CONTENT');
		} else if (metas[metacnt].getAttribute('NAME') == "pwcLocale") {
			lccode = metas[metacnt].getAttribute('CONTENT');
		}
		if ((ccode != "")&&(lcode != "")&&(lccode != "")) break;
	}
	if (ccode == "") { ccode = "gx"; }
	if (lcode == "") { lcode = "en";}
	if (lccode == "") { lccode = "en_GX";}
	
	if (suggestionsfilelocal == "") {
		var url = "/en_GX/webadmin/search/liveresults.xml?pwcGeo=" + ccode + "&pwcLang=" + lcode + "&q=" + str + "*";
	} else {
		var url = suggestionsfilelocal + "&q=" + str + "*";
	}
	//$("#footerlinks").append(url);

	if (window.XMLHttpRequest) {// code for IE7, Firefox, Mozilla, etc.
		xmlhttp=new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {// code for IE5, IE6
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp!=null) {
		xmlhttp.onreadystatechange=processsearch;
		xmlhttp.open("GET",url,true);
		xmlhttp.send(null);
	}
	else {
		//alert("Your browser does not support XMLHTTP.");
		clearlivesearch();
		return;
	}
}

function processsearch() { // Check if file is valid & if so do something with its contents

	// Take the current search string
	var str = document.getElementById("searchfield").value.toLowerCase();

	// Break the loop when http call is complete or there's an error
	if(xmlhttp.readyState!=4) return;
	if(xmlhttp.status!=200) {
		/*
			alert("Problem retrieving XML data");
			alert(xmlhttp.readyState);
			alert(xmlhttp.status);
		*/
		clearlivesearch();
		return;
	}

	// Locate the link element to traverse
	x=xmlhttp.responseXML.documentElement.getElementsByTagName("link");
	var searchoutput = "";
	
	if (livesearchheader === undefined) { var livesearchheader = "Recommended results"; }
	if (livesearchlink === undefined) { var livesearchlink = "View all results"; }
	if (livesearchurl === undefined) { var livesearchurl = "/en_GX/webadmin/search/search.jhtml?pwcGeo=" + ccode + "&pwcLang=" + lcode + "&localeOverride=" + lccode + "&pwcHideLevel=0&q="; }

	var searchoutputheader = "<div id='livesearchheader'>" + livesearchheader + "</div>";
	var searchoutputfooter = "<div id='livesearchfooter'><a href='" + livesearchurl + str + "'>" + livesearchlink + " >></a></div>"; 
	
	if (str.length > minchars) {

		// Loop through all link elements
		for (i=0;i<x.length;i++) {
			if (i==5) { break; }
			xtitles=x[i].getElementsByTagName("title");
			xkeywords=x[i].getElementsByTagName("keyword");
			xurls=x[i].getElementsByTagName("url"); {
			try {
				var testquery = xkeywords[0].firstChild.nodeValue.toLowerCase();
				if (testquery.indexOf(str) !=-1) {
					searchoutput = searchoutput + "<a href='" + xurls[0].firstChild.nodeValue + "?query=" + str + "&live=1" + "'>" + xtitles[0].firstChild.nodeValue + "</a><br />";
				} else {
					searchoutput = searchoutput + "";
				}
			}
				catch (er) { searchoutput = searchoutput + ""; }
			}				
		}

	}

	if (searchoutput=="") { 
		// Collapse the suggestions box when no matches & halt the ajax loading gif
		document.getElementById("livesearch").style.visibility="hidden";
		document.getElementById("livesearchbutton").src="/en_GX/webadmin/assets/image/tran.gif";
		document.getElementById("livesearchbutton").className="";
	} else {
		// Return the response, only when xml http call is done. Show the close button, replacing the ajax gif
		if (xmlhttp.readyState==4 || xmlhttp.readyState=="complete") { 
			document.getElementById("livesearch").style.visibility="visible";
			document.getElementById("livesearch").innerHTML=searchoutputheader + searchoutput + searchoutputfooter;
			document.getElementById("livesearchbutton").src="/en_GX/webadmin/assets/image/tran.gif";
			document.getElementById("livesearchbutton").className="";
		} 
	}

}

function clearsearch() { //Clear from initial focus
	document.getElementById("searchfield").value="";
}

function clearlivesearch() { // Clear from the button & also hide the button
	document.getElementById("searchfield").value=" Search";
	document.getElementById("livesearch").innerHTML="";
	document.getElementById("livesearch").style.visibility="hidden";
	document.getElementById("livesearchbutton").src="/en_GX/webadmin/assets/image/tran.gif";
	document.getElementById("livesearchbutton").className="";
}

// Hide the livesearch box on a click outside its div
function hidelivesearch(evt) {
    evt = evt || window.event;
    var targ = evt.target || evt.srcElement;

	// If the livesearch box is open, clear it
	if (targ.id=="livesearch" || targ.id=="livesearchheader" || targ.id=="livesearchfooter" || targ.id=="searchsubmit") {
		return;
	} else {
		if (document.getElementById("livesearch")) {
			if (document.getElementById("livesearch").style.visibility=="visible") {
				clearlivesearch();
			}
		}
	}

}

/* Homepage Follow bar */
var followbarhtml = "<div id='followbar'><div id='followinner'><span>Follow us:</span>";

if ($('meta[name=pwcCountry]').attr("content") == 'rm') {

	if (arr_follow [0] === undefined) {
		// Twitter
		arr_follow [0] = new Array()
		arr_follow [0][0] = "/en_GX/webadmin/assets/image/follow-twitter.jpg";
		arr_follow [0][1] = "https://twitter.com/PwC_LLP/"
		arr_follow [0][2] = "";  // E.G. arr_ss [0][2] = "&param=something";
		arr_follow [0][3] = "Follow us on Twitter";
		arr_follow [0][4] = "";
		arr_follow [0][5] = "_new";
	}
	if (arr_follow [1] === undefined) {
		// LinkedIn
		arr_follow [1] = new Array()
		arr_follow [1][0] = "/en_GX/webadmin/assets/image/follow-linkedin.jpg";
		arr_follow [1][1] = "http://www.linkedin.com/company/pwc"
		arr_follow [1][2] = "";
		arr_follow [1][3] = "Follow us on Linked In";
		arr_follow [1][4] = "";
		arr_follow [1][5] = "_new";
	}
	if (arr_follow [2] === undefined) {
		// Youtube
		arr_follow [2] = new Array()
		arr_follow [2][0] = "/en_GX/webadmin/assets/image/follow-youtube.jpg";
		arr_follow [2][1] = "http://www.linkedin.com/company/pwc"
		arr_follow [2][2] = "";
		arr_follow [2][3] = "Follow us on Youtube";
		arr_follow [2][4] = "";
		arr_follow [2][5] = "_new";
	}
	if (arr_follow [3] === undefined) {
		// Facebook
		arr_follow [3] = new Array()
		arr_follow [3][0] = "/en_GX/webadmin/assets/image/follow-facebook.jpg";
		arr_follow [3][1] = "https://www.facebook.com/pwcfanpage"
		arr_follow [3][2] = "";
		arr_follow [3][3] = "Follow us on Facebook";
		arr_follow [3][4] = "";
		arr_follow [3][5] = "_new";
	}
	if (arr_follow [4] === undefined) {
		// RSS
		arr_follow [4] = new Array()
		arr_follow [4][0] = "/en_GX/webadmin/assets/image/follow-rss.jpg";
		arr_follow [4][1] = "#"
		arr_follow [4][2] = "";
		arr_follow [4][3] = "Our RSS feed";
		arr_follow [4][4] = "";
		arr_follow [4][5] = "_new";
	}
	/*
	if (arr_follow [5] === undefined) {
		// Subscribe
		arr_follow [5] = new Array()
		arr_follow [5][0] = "/en_GX/webadmin/assets/image/follow-subscribe.jpg";
		arr_follow [5][1] = "#"
		arr_follow [5][2] = "";
		arr_follow [5][3] = "Subscribe";
		arr_follow [5][4] = "";
		arr_follow [5][5] = "_new";
	}
	*/
		
	for (i=0;i<arr_follow.length; i++) {
		 followbarhtml += "<a href='" + arr_follow[i][1] + "&title=" + arr_follow[i][2] + "' onclick='" + arr_follow[i][4] + "' target='_blank'><img src='" + arr_follow[i][0] + "' border='0' alt='" + arr_follow[i][3] + "' /></a>";
	}
}
	followbarhtml += "<a id='followhide'>Hide</a></div></div>"

/*** START Send & share global defaults ***/

  if (sharetitle === undefined) { var sharetitle = "Share"; }

	function writesharelink() {
		document.write("<li id='ptshare'><a href='#' target='_self' class='shareicon' onclick='shareboxreveal(); return false;'>" + sharetitle + "</a></li>");
	}

	// Icon, Pre-URL, Post-URL, Description/alt tag, Onlick, A Target. Only declare them if they don't already exist from local.js

	if (arr_ss [0] === undefined) {
		// Twitter
		arr_ss [0] = new Array()
		arr_ss [0][0] = "/en_GX/webadmin/assets/image/share_twitter.gif";
		arr_ss [0][1] = "http://twitter.com/home?status=" + escape(window.location);
		arr_ss [0][2] = "";  // E.G. arr_ss [0][2] = "&param=something";
		arr_ss [0][3] = "Twitter";
		arr_ss [0][4] = "";
		arr_ss [0][5] = "_new";
	}

	if (arr_ss [1] === undefined) {
		// Facebook
		arr_ss [1] = new Array()
		arr_ss [1][0] = "/en_GX/webadmin/assets/image/share_facebook.gif";
		arr_ss [1][1] = "http://www.facebook.com/share.php?u=" + escape(window.location);
		arr_ss [1][2] = "";
		arr_ss [1][3] = "Facebook";
		arr_ss [1][4] = "";
		arr_ss [1][5] = "_new";
	}
	
	if (arr_ss [2] === undefined) {
		// Linkedin
		arr_ss [2] = new Array()
		arr_ss [2][0] = "/en_GX/webadmin/assets/image/share_linked.gif";
		arr_ss [2][1] = "http://www.linkedin.com/shareArticle?mini=true&url=" + escape(window.location);
		arr_ss [2][2] = "";
		arr_ss [2][3] = "Linkedin";
		arr_ss [2][4] = "";
		arr_ss [2][5] = "_new";
	}
	
	if (arr_ss [3] === undefined) {
		// Google+
		arr_ss [3] = new Array()
		arr_ss [3][0] = "/en_GX/webadmin/assets/image/share_googleplus2.gif";
		arr_ss [3][1] = "https://plus.google.com/share?url=" + escape(window.location);
		arr_ss [3][2] = "";
		arr_ss [3][3] = "Google+";
		arr_ss [3][4] = "";
		arr_ss [3][5] = "_new";
	}

/*
	if (arr_ss [4] === undefined) {
		// Mixx
		arr_ss [4] = new Array()
		arr_ss [4][0] = "/en_GX/webadmin/assets/image/share_mixx.gif";
		arr_ss [4][1] = "http://www.mixx.com/submit?page_url=" + escape(window.location);
		arr_ss [4][2] = "";
		arr_ss [4][3] = "Mixx";
		arr_ss [4][4] = "";
		arr_ss [4][5] = "_new";
	}

	if (arr_ss [5] === undefined) {
		// Digg
		arr_ss [5] = new Array()
		arr_ss [5][0] = "/en_GX/webadmin/assets/image/share_digg.gif";
		arr_ss [5][1] = "http://digg.com/submit?phase=2&url=" + escape(window.location);
		arr_ss [5][2] = "";
		arr_ss [5][3] = "Digg";
		arr_ss [5][4] = "";
		arr_ss [5][5] = "_new";
	}
*/

	function shareboxreveal() { // Show, hide or add to territory selector box
		document.getElementById('sharebox').style.display = 'block';
	}

	function shareboxhide() { 	// Clear the contents of the box and hide the div
		document.getElementById('sharebox').style.display = 'none';  
	}

function writesharebox() { // Taken from HTML for 3rd party templates
	var sendshare = "<div id='sharebox'><ul id='shareicons'><div id='shareboxclose'><a href='#' onClick='shareboxhide(); return false;'><img src='/en_GX/webadmin/assets/image/icon_close.gif' alt='Close' border='0' /></a></div>"	
	if (window.sendsharetitle === undefined) { window.sendsharetitle = escape("Page title here"); }
	for (i=0;i<arr_ss.length; i++) {
	    sendshare = sendshare + "<li id='share" + i + "'><a href='" + arr_ss[i][1] + "&title=" + sendsharetitle + arr_ss[i][2] + "' onclick='" + arr_ss[i][4] + "' target='_blank' class='shareicon'><img src='" + arr_ss[i][0] + "' border='0' alt='" + arr_ss[i][3] + "' />&nbsp;" + arr_ss[i][3] + "</a></li>";	
	}
	sendshare = sendshare + "</ul></div>";
	document.write(sendshare);
}

function writesharelinks() {
	var sharelinks = ""
	for (i=0;i<arr_ss.length; i++) {
		sharelinks = sharelinks + "<li id='share" + i + "'><a href='" + arr_ss[i][1] + arr_ss[i][2] + "' onclick='" + arr_ss[i][4] + "' target='" + arr_ss[i][5] + "' class='shareitem'><img src='" + arr_ss[i][0] + "' border='0' alt='" + arr_ss[i][3] + "' /></a></li>";	
	}
}

  // Default R2 forms validation message (translatable))
  if (formvalidationmsg === undefined) { var formvalidationmsg = "Please complete the highlighted fields"; }
  
/*** START Lightweight browser detection ***/

//alert(BrowserDetect.browser + ' ' + BrowserDetect.version + ' on ' + BrowserDetect.OS);

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();


//RELEASE 4.1
var documentForm

function getXMLObject()  //XML OBJECT
{
   var xmlHttp = false;
   try {
     xmlHttp = new ActiveXObject("Msxml2.XMLHTTP")  // For Old Microsoft Browsers
   }
   catch (e) {
     try {
       xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")  // For Microsoft IE 6.0+
     }
     catch (e2) {
       xmlHttp = false   // No Browser accepts the XMLHTTP Object then false
     }
   }
   if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
     xmlHttp = new XMLHttpRequest();        //For Mozilla, Opera Browsers
   }
   return xmlHttp;  // Mandatory Statement returning the ajax object created
}

function ajaxFunction() {
	xmlhttp = new getXMLObject();
  if(xmlhttp) { 
  	var recaptcha_challenge_field = document.getElementById("recaptcha_challenge_field").value;
	var recaptcha_response_field = document.getElementById("recaptcha_response_field").value;
    xmlhttp.open("GET","/reCaptcha?recaptcha_challenge_field="+recaptcha_challenge_field+"&recaptcha_response_field="+recaptcha_response_field,true); 
    xmlhttp.onreadystatechange  = handleServerResponse;
    //xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(); 
  }
}

function handleServerResponse() {
   if (xmlhttp.readyState == 4) {
     if(xmlhttp.status == 200) {
		if(xmlhttp.responseText == "valid"){			
			var note = document.getElementById('note').value;
			var yourRealEmail = document.getElementById('yourRealEmail').value;
			document.getElementById('note').value = yourRealEmail + " recommends this page. " + "\n\n" + note;					
			documentForm.action = document.getElementsByName('LotusURL')[0].value; 						
			documentForm.submit();
			return;
		}else if(xmlhttp.responseText == "invalid"){
			document.getElementById("errormessage").innerHTML = "<span style='color:#FF0000'><b>* CAPTCHA validation failed.</b></span>";
			Recaptcha.reload();
			return;
		}

     }
     else {
        alert("Error during AJAX call. Please try again");
     }
   }
}


// ############### START EMAIL A COLLEAGE FUNCTIONS #######################
// Name -- emailpage
//Author: Roger Darus/E Solutions
//Additional Editors: Roger Darus/E Solutions
//Additional Editors: Sirnjeet Kalwan
// Description of code -- Form input validation and window opener

//RELEASE 4.1
function inputValidation(form){	
	documentForm = form;
	var errorText;
	document.getElementById("errormessage").innerHTML = "";
	// Valid friends email
	errorText = form.ValidationField1.value;
	 if ( !validEmailMulti( form.friendsEmail.value ) ){
		alert(errorText);
		form.friendsEmail.focus();
		return;
	}
	//Validate name
	errorText = form.ValidationField2.value;
	if (form.name.value == ""){
		alert(errorText);
		form.name.focus();
		return;
	}
	//Validate users email address	
	errorText = form.ValidationField3.value;
	if (!validEmailMulti( form.yourEmail.value )){
		alert(errorText);
		form.yourEmail.focus();
		return;
	}
	ajaxFunction();

}

function validEmail( email ){
	var reg1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/; // not valid
	var reg2 = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/; // valid
	return ( !reg1.test( email )  && reg2.test( email ));
}
function removeSpaces(string) {
	var tstring = "";
	string = '' + string;
	splitstring = string.split(" ");
	for(i = 0; i < splitstring.length; i++)
	tstring += splitstring[i];
	return tstring;
}
function validEmailMulti( email ){
	email = removeSpaces(email);
	var final = 0;
	while (final == 0) {
		comma = email.indexOf(",");
		if (comma == -1) {
			final = 1;
			currentemail = email
		} else {
			currentemail = email.substring(0, comma);
			email = email.substring(comma + 1, email.length);
		}
		returncode = validEmail( currentemail );
		if (!returncode) {
			return false;
		}
		if (final == 1) {
			return true;
		}
	}
}

// read meta tag for value
function readMetaTag(tagName)
{
  
  var content = "";
   
  // check for various browsers and versions  
 
  if (document.getElementById)   {  
        if (document.getElementById(tagName))  content = document.getElementById(tagName).content; 
     }
 else if (document.all) { 
        if (document.all[tagName])  content = document.all[tagName].content; 
     }  
 else if (document.layers) { 
        if (document.layers[tagName])  content = document.layers[tagName].content; 
     }
  
  return content;
  
}
//form validation
function ValidateandSubmit(){

var msgtxt = "";
var frmName = "";
var frm;

  if (document.getElementById)   {  
        frm = document.getElementById("_Notes");
     }
 else if (document.all) { 
         frm = document.all["_Notes"];
     }  
 else if (document.layers) { 
        frm = document.layers["_Notes"];
     }

if (frm != null)
{
	frmName = "_Notes";
}
else
{
	frmName = "_onlineForm";
}

var reqflds = document[frmName].ReqFields.value;
reqflds = reqflds.split(";");

var valType = document[frmName].ValidationType.value;
valType = valType.split(";");

var alrtVals = document[frmName].AlertValue.value;
alrtVals = alrtVals.split("@@");

var firstFocus;
var success = true;
var focusSet = 0;
var noOfLines = 0;
var fldval = "";


for(i=0;i<reqflds.length;i++)
{
  reqflds[i] = "document." + frmName + "." + reqflds[i];
}

for(i=0;i<reqflds.length;i++){
     
	if (valType[i] == "Text"){
		
		var fldval = eval(reqflds[i]).value;
		if(fldval == ""){
			msgtxt = msgtxt+"\n"+alrtVals[i];
			if (focusSet == 0) {firstFocus = eval(reqflds[i]); focusSet = 1; success = false;}
			}
	}

	else if(valType[i] == "Email"){
		var reg1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/; // not valid
		var reg2 = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/; // valid
		var fldval = eval(reqflds[i]).value;
		
		 if ( !reg1.test( fldval )  && reg2.test( fldval )) {
			}
		else{msgtxt = msgtxt+"\n"+alrtVals[i];}
									if (focusSet == 0) {firstFocus = eval(reqflds[i]); focusSet = 1; success = false};
	}

	else if(valType[i] == "Check/Radio"){
		var x = "";
		
		if (isNaN(eval(reqflds[i]).length)) {
		// Checkbox contains only one choice.
		if (eval(reqflds[i]).checked) {
			x = "pass";
		}
		}
		else{
		for (var r=0; r < eval(reqflds[i]).length; r++){
			if ( eval(reqflds[i])[r].checked){
				x = "pass";
			}
		}
		}
		if(x==""){
			msgtxt = msgtxt+"\n"+alrtVals[i];
			if (focusSet == 0) {firstFocus = eval(reqflds[i])[0]; focusSet = 1; success = false};
			}
	}

	else if(valType[i] == "Option"){
	
		var selection = "";
		var list = eval(reqflds[i]);
		selection = list.selectedIndex;
		
		if(selection ==0){
			msgtxt = msgtxt+"\n"+alrtVals[i];
			if (focusSet == 0) {firstFocus = eval(reqflds[i]); focusSet = 1; success = false};
			}
	}

	else if(valType[i] == "Option-Multi"){
	
		var selection = "";
		var list = eval(reqflds[i]);
		selection = list.selectedIndex;
		
		if(selection ==-1){
			msgtxt = msgtxt+"\n"+alrtVals[i];
			if (focusSet == 0) {firstFocus = eval(reqflds[i]); focusSet = 1; success = false};
			}
	}
}

if( msgtxt == ""){
document[frmName].submit();
}
else{
	alert(msgtxt);
	if(focusSet == 1) {
		firstFocus.focus();
	}
	}
}

// -----------------------------------------------------
// SAVE FORM FIELD SELECTIONS IN COOKIES                         
// @author: nerlijman001                           
// -----------------------------------------------------

var ONLINE_FORM_FIELD_SEPARATOR = '!@@';
var ONLINE_FORM_SEPARATOR = '\|@\|';
var ONLINE_FORM_MULTIVALUED_SEPARATOR = ';@';

//var ONLINE_FORM_FIELD_SEPARATOR = ';';
//var ONLINE_FORM_SEPARATOR = '\|';
//var ONLINE_FORM_MULTIVALUED_SEPARATOR = ',';

var EXPIRATION_DAYS = 365;
var MULTI_PREFIX = "_m_";

String.prototype.startsWith = function(s) {
	return (this.match("^"+s)==s);
}

//----------------------------
//TCS-R2
function getLotusForm() {
	var frmName = "";
	var frm;

	if (document._Notes) {
		frm = document._Notes;
	}
	if (document.forms) {
		frm = document.forms["_Notes"];
	}
	
	if (!frm) {
		if (document.all) { 
			frm = document.all["_Notes"];
		}
	}
	
	if (!frm) {	
		if (document.layers) {
			frm = document.layers["_Notes"];
		}	
	}

	if (!frm) {		
		if (document.getElementById) {
			frm = document.getElementById("_Notes");
		}
	}
	 
	if (frm != null) {
		return frm;
	}
	return document.getElementById('_onlineForm');
}

//TCS-R2
function getOnlineForm() {
    return getLotusForm();
}

//----------------------------
/*function getOnlineForm() {
	var o = document.getElementById('_onlineForm');
	return o;
}*/

function saveOnlineFormSelections() {
	var f = getOnlineForm();
	if (f) {
		saveSelections(f);
	}

}

function loadOnlineFormSelections() {
	var f = getOnlineForm();
	if (f) {
		if (f.name = '_Notes') {
			f.id = f.name;
		}
		loadSelections(f);
	}
}

function getExpirationDate() {
	var today = new Date();
	return new Date(today.getTime()+EXPIRATION_DAYS*24*60*60*1000);
}

// input1,value2
function saveSelections(frm) {
	var setvalue;
	var fieldType;
	var formname = frm.name;
	var items = new Array();

	var exp   = getExpirationDate();

	//var string = "formname=" + formname + ONLINE_FORM_SEPARATOR;
	var string = "";
	var cookieName = formname;

	var n = frm.length;
	for (i = 0; i < n; i++) {
		if (frm[i].name != '' && !items[frm[i].name]) {
			string+= getFieldStringValue(frm, frm[i].name, frm[i].type);
			items[frm[i].name] = frm[i].name;
		}
	}
	string=string.substring(0, string.length-ONLINE_FORM_SEPARATOR.length);
	setCookie(cookieName, string, exp); 
}

function removeLastSeparator(r, sep) {
	
}

function getFieldStringValue(frm, e, fieldType) {
    var index;
	var string = "";
	
	// RADIO BUTTON
	if (fieldType == "radio") {
		for (x=0; x < frm.elements[e].length; x++) {
			if (frm.elements[e][x].checked) {
				index = x;
			}
		}
		string+= e + ONLINE_FORM_FIELD_SEPARATOR + index + ONLINE_FORM_SEPARATOR;
	}

	// TEXT, TEXTAREA, and DROPDOWN
	if ((fieldType == "text") ||
		(fieldType == "textarea") ||
		(fieldType == "select-one")) {
		string+= e + ONLINE_FORM_FIELD_SEPARATOR + frm.elements[e].value + ONLINE_FORM_SEPARATOR;
	}

	// CHECKBOX o LIST
	if (fieldType == "checkbox" || fieldType == "select-multiple") {
		var setvalue = '';	
		if (frm.elements[e].length) {
			// is an array, save as multi valuated
			for (x=0; x < frm.elements[e].length; x++) {
				if (frm.elements[e][x].checked || frm.elements[e][x].selected) {
					setvalue+= "1"+ONLINE_FORM_MULTIVALUED_SEPARATOR;
				} else {
					setvalue+= "0"+ONLINE_FORM_MULTIVALUED_SEPARATOR;
				}
			}
			setvalue=setvalue.substring(0, setvalue.length-ONLINE_FORM_MULTIVALUED_SEPARATOR.length);
			string+=MULTI_PREFIX+e+ONLINE_FORM_FIELD_SEPARATOR+ setvalue + ONLINE_FORM_SEPARATOR;		
		} else {
			// Is not an array
			if (frm.elements[e].checked) {
				setvalue = "1";
			}
			if (!frm.elements[e].checked) {
				setvalue = "0";
			}
			string+= e + ONLINE_FORM_FIELD_SEPARATOR + setvalue + ONLINE_FORM_SEPARATOR;
		}
	}

	// HIDDEN field
	if (fieldType == "hidden") {
		string+= e + ONLINE_FORM_FIELD_SEPARATOR + frm.elements[e].value + ONLINE_FORM_SEPARATOR;
	}
	return string;
}

function saveField(o) {
	var cookieString = "";
	var frm = getOnlineForm();
	var e;
	var x;
	var cookieName;
	var fieldValues;

	var formname = frm.id;
	cookieName  = formname;
	fieldValues = getCookie(cookieName);

	if (!fieldValues) {
		cookieString+=getFieldStringValue(frm, o.name, o.type);
	} else {
		var fieldArray  = fieldValues.split(ONLINE_FORM_SEPARATOR);

		for (i = 0; i < fieldArray.length; i++) {
			var f = fieldArray[i];
			var values = f.split(ONLINE_FORM_FIELD_SEPARATOR);
			var fieldName  = values[0];
			var fieldValue = values[1];
			if (fieldName != o.name) {
				cookieString+=f+ONLINE_FORM_SEPARATOR;
			}
		}
		cookieString+=getFieldStringValue(frm, o.name, o.type);
	}
	cookieString=cookieString.substring(0, cookieString.length-ONLINE_FORM_SEPARATOR.length);	
	var exp   = getExpirationDate();
	setCookie(cookieName, cookieString, exp); 
}

//
// LOAD FORM FIELD SELECTIONS FROM SAVED COOKIES
//
function loadSelections(frm) {
	var e;
	var x;
	var cookieName;
	var fieldArray;
	var fieldValues;
	var fieldValue;

	var formname = frm.id;
	cookieName  = formname;
	fieldValues = getCookie(cookieName);

	if (!fieldValues) return;

	fieldArray  = fieldValues.split(ONLINE_FORM_SEPARATOR);

        var n = frm.length;
        for (i = 0; i < n; i++) {
            e = frm[i].name;
            var fieldType  = frm[i].type;
			
			if (e == '' || fieldType == "reset") continue;
		
			var fieldObject;
			var fieldValue = '';
			multivalued = false;
			
			// Search for the value
			for (j=0; j<fieldArray.length; j++) {
				var f = fieldArray[j];
				var values = f.split(ONLINE_FORM_FIELD_SEPARATOR);
				fieldName = values[0];
				if (fieldName == e) {
					fieldValue = values[1];				
					break;
				} else {
					if (fieldName.startsWith(MULTI_PREFIX+e)) {
						multivalued = true;
						fieldValue = values[1];
						var arrayValues = fieldValue.split(ONLINE_FORM_MULTIVALUED_SEPARATOR);
						for (k=0; k<arrayValues.length; k++) {
							var arrayValue = arrayValues[k];
							if (frm[i].multiple) {
								frm.elements[e][k].selected = (arrayValue=='1');
							} else {
								frm.elements[e][k].checked = (arrayValue=='1');
							}
							
						}
						break;
					}
				}
			}
			
			if (multivalued) {
				continue;
			}

            //
            // TEXT, TEXTAREA, and DROPDOWN
            if ((fieldType == "text") ||
                (fieldType == "textarea") ||
                (fieldType == "select-one")) {
                frm.elements[e].value = fieldValue;
            }

            // CHECKBOX
            if (fieldType == "checkbox") {
                fld_checkbox = fieldValue;
                if (fld_checkbox == "1") {
                    frm.elements[e].checked = true;
                }
            }

            // RADIO BUTTON
            //
            if (fieldType == "radio") {
                x = fieldValue;
                frm.elements[e][x].checked = true;
            }

            //
            // HIDDEN field
            //
            if (fieldType == "hidden") {
                frm.elements[e].value = fieldValue;
            }
        }
}

function setCookie(name, value, expires, path, domain, secure) {
	var c = name + "=" + escape(value) +
((expires) ? "; expires=" + expires.toGMTString() : "") +
((path) ? "; path=" + path : "") +
((domain) ? "; domain=" + domain : "") +
((secure) ? "; secure" : "");
 document.cookie = c;
}

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) 
			return null;
	} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

function resetOnlineFormSelections() {
	var frm = getOnlineForm();
	var formname = frm.name;
	var exp   = getExpirationDate();
	var string = "";
	var cookieName = formname;
	setCookie(cookieName, string, exp); 
}
//END COOKIES SUPPORT

/* 2010 Contacts */

function loadxmlcontacts() {
	var str = document.getElementById("countrycontactsddl").value.toLowerCase();
	if (str == "#") { return false; }
	var failmsg = "<h4>Sorry, there are no contacts for this selection</h4>";
	var headtxt = "<div class='contacts-modal-content'><h1>Contacts</h1>";
	var countrytxt = ""
	var contacttxt = "";                
               
	if (window.XMLHttpRequest) { xmlhttp=new XMLHttpRequest(); }
	else { xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); }
   
	xmlhttp.onreadystatechange=function() {
		 if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			x=xmlhttp.responseXML.documentElement.getElementsByTagName("card");
			for (i=0;i<x.length;i++) {
                                                 
				xcc=x[i].getElementsByTagName("language_code");
				xcname=x[i].getElementsByTagName("country_name");
				xfname=x[i].getElementsByTagName("pwcc_first_name");
				xlname=x[i].getElementsByTagName("pwcc_last_name");
				xrole=x[i].getElementsByTagName("pwcc_title");
				xnumber=x[i].getElementsByTagName("pwcc_telephone");
				xfax=x[i].getElementsByTagName("pwcc_fax");
				xemail=x[i].getElementsByTagName("pwcc_email");
				

				contacttxt=contacttxt + "<dl>";
				if ((xfname[0].firstChild!=null)&(xlname[0].firstChild!=null)) { contacttxt=contacttxt + "<dt>" + xfname[0].firstChild.nodeValue + " " + xlname[0].firstChild.nodeValue + "</dt>"; }
				if (xrole[0].firstChild!=null) { contacttxt=contacttxt + "<dd>" + xrole[0].firstChild.nodeValue + "</dd>"; }
				if (xnumber[0].firstChild!=null) { contacttxt=contacttxt + "<dd>Tel: " + xnumber[0].firstChild.nodeValue + "</dd>"; }
				if (xfax[0].firstChild!=null) { contacttxt=contacttxt + "<dd>Fax: " + xfax[0].firstChild.nodeValue + "</dd>"; }
				if (xemail[0].firstChild!=null) { contacttxt=contacttxt + "<dd><a href='" + xemail[0].firstChild.nodeValue + "'>Email</a></dd>"; }
				contacttxt=contacttxt + "</dl>";
				if (xcname[0].firstChild!=null) { countrytxt = "<h2>" + xcname[0].firstChild.nodeValue + "</h2>"; }

			}
			if (contacttxt !="") { 
				document.getElementById('contactsmodal').innerHTML=headtxt + countrytxt + contacttxt + '</div>';
				$("#contactsmodalwrapper").data("overlay").load();
			} else {
				document.getElementById('contactsmodal').innerHTML=headtxt + failmsg + '</div>'; 
				$("#contactsmodalwrapper").data("overlay").load();
			}
		 } else if (xmlhttp.status!=200) {
			document.getElementById('contactsmodal').innerHTML=headtxt + failmsg + '</div>';
			$("#contactsmodalwrapper").data("overlay").load();
		}
	}
	var xmlurl = "/contacts/BusinessCardServlet?tags=" + str;
	//var xmlurl = "http://pwcstg-wip.pwcinternal.com/gx/en/test/testcontacts.xml";
	xmlhttp.open("GET",xmlurl,true);
	xmlhttp.send();	           
}

(function($) {
  
  var defaults = {
    'swipeTolerance': 40
  };
  
  var touchStatus = function(target, touch) {
    this.target    = $(target);
    this.touch     = touch;
    this.startX    = this.currentX = touch.screenX;
    this.startY    = this.currentY = touch.screenY;
    this.eventType = null;
  }
  touchStatus.options = {};
  touchStatus.latestTap = null;

  touchStatus.prototype.move = function(touch) {
    this.currentX = touch.screenX;
    this.currentY = touch.screenY;
  }

  touchStatus.prototype.process = function() {
    var offsetX = this.currentX - this.startX;
    var offsetY = this.currentY - this.startY;
    if(offsetX == 0 && offsetY == 0) {
      this.checkForDoubleTap();
    } else if(Math.abs(offsetY) > touchStatus.options.swipeTolerance && Math.abs(offsetY) > Math.abs(offsetX)) {
      this.eventType = offsetY > 0 ? 'swipedown' : 'swipeup';
      this.target.trigger('swipe', [this])
    } else if(Math.abs(offsetX) > touchStatus.options.swipeTolerance) {
      this.eventType = offsetX > 0 ? 'swiperight' : 'swipeleft';
      this.target.trigger('swipe', [this])
    }
    if(this.eventType) this.target.trigger(this.eventType, [this])
    this.target.trigger('touch',        [this])
  }

  touchStatus.prototype.checkForDoubleTap = function() {
    if(touchStatus.latestTap) {
      if((new Date() - touchStatus.latestTap) < 400) 
        this.eventType = 'doubletap'
    }
    if(!this.eventType) this.eventType = 'tap'
    touchStatus.latestTap = new Date()
  }

  var swipeEvents = function(elements, options) {
    touchStatus.options = $.extend(defaults, options);
    elements.bind('touchstart',  this.touchStart);
    elements.bind('touchmove',   this.touchMove);
    elements.bind('touchcancel', this.touchCancel);
    elements.bind('touchend',    this.touchEnd);
  }

  swipeEvents.prototype.touchStart = function(evt) {
    var target = this;
    swipeEvents.eachTouch(evt, function(touch) {
      swipeEvents.touches[touch.identifier] = new touchStatus(target, touch);
    })
  }

  swipeEvents.prototype.touchMove = function(evt) {
    swipeEvents.eachTouch(evt, function(touch) {
      var loc = swipeEvents.touches[touch.identifier]
      if(loc) loc.move(touch)
    })
  }

  swipeEvents.prototype.touchCancel = function(evt) {
    swipeEvents.eachTouch(evt, function(touch) {
      swipeEvents.purge(touch, true)
    })
  }

  swipeEvents.prototype.touchEnd = function(evt) {
    swipeEvents.eachTouch(evt, function(touch) {
      swipeEvents.purge(touch)
    })
  }

  swipeEvents.touches = {}
  swipeEvents.purge = function(touch, cancelled) {
    if(!cancelled) {
      var loc = swipeEvents.touches[touch.identifier]
      if(loc) loc.process()
    }
    delete swipeEvents.touches[touch.identifier]
  }

  swipeEvents.eachTouch = function(evt, callback) {
    var evt = evt.originalEvent;
    var num = evt.changedTouches.length;
    for(var i = 0; i < num; i++) {
      callback(evt.changedTouches[i])
    }
  }

  // adds custom events:
  //   touch      // all events
  //   swipe      // only swipe* events
  //   swipeleft
  //   swiperight
  //   swipeup
  //   swipedown
  //   tap
  //   doubletap
  $.fn.addSwipeEvents = function(options, callback) { 
    if (!callback && jQuery.isFunction(options)) {
      callback = options;
      options = null;
    }
    new swipeEvents(this, options);
    if(callback) this.bind('touch', callback);
    return this;
  }
})(jQuery);