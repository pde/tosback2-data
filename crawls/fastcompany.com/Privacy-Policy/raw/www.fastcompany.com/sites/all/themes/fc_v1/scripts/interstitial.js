/* New Interstitial Ad Code*/

var overlayAdOpen = new Boolean();
var triggerAd = false;
var fadeSpeed = "slow";

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');

	for(var i=0;i < ca.length;i++) {
		var c = ca[i];

		while (c.charAt(0)==' ')
			c = c.substring(1,c.length);

		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function overlay_ad(){
		// Check to see if cookie exists/url is a partner page
		var cookieExists = readCookie('interstitial');
		var current_url =  this.location.href;
		var partner_page = current_url.indexOf("?partner=");

		// If cookie exists/it's a partner page, do nothing; otherwise set cookie and show welcome ad
		if(partner_page>0){
			return;
		}else if(cookieExists){
			return;
		}else{
			var tomorrow = new Date();
		    var nowPlus =  tomorrow.getTime() + (48*60*60*1000);
		    tomorrow.setTime(nowPlus);

			var currentloc=this.location.href;
		    document.cookie = 'interstitial=welcomead; path=/; domain=.fastcompany.com; expires=' + tomorrow.toGMTString();

			triggerAd = true;
		}
}

$(document).ready(function() {

	if(triggerAd){
		overlayAdOpen = false; // Set the overlay box state

		// Write iFrame with Ad Code
		var build_ad = "<div class='bgCover'></div><div class='overlayBox'><p class='countdown'> Your page in <span id='sec_count'>15</span> seconds. | <a href='#' class='closeLink'>Skip this ad [X]</a></p><p align='center' class='adv'> ADVERTISEMENT<br><br><iframe id='ad_frame' name='ad_frame' src='http://images.fastcompany.com/welcome/ad_code.html' scrolling='no' frameborder='0'><\/iframe></p></div>";
		$("#interstitial_ad").html(build_ad);

		$(".bgCover").css({opacity:0.8}); // Redefine opacity for non CSS3 browsers
		$("a.closeLink").click(hideAdOverlay); // Set close ad overlay event
		$(".bgCover").click(hideAdOverlay); // Set close ad overlay event

		// if window is resized then reposition the overlay and ad box
		$(window).bind("resize", positionAdOverlay);

		//showAdOverlay();
		setTimeout(showAdOverlay,1000);
	}

});



function positionAdOverlay() {
	if( (overlayAdOpen == false) || (triggerAd == false) ) return;

	var adBoxLeft_raw = ( $(window).width() - $(".overlayBox").width() )/2;
	var adBoxTop_raw = ( $(window).height() - $(".overlayBox").height() )/2;

	if(adBoxTop_raw < 0){
		adBoxTop_raw = 15;
	}

	var adBoxLeft = adBoxLeft_raw + 'px';
	var adBoxTop = adBoxTop_raw + 'px';

	if ($.browser.msie && $.browser.version <= 6 ){
		$(".overlayBox").css({
			left: adBoxLeft,
			top: adBoxTop,
			position: "absolute"
		});

		window.setInterval(function() {
			var adBoxTop_adjusted = (document.documentElement.scrollTop + adBoxTop_raw) + 'px';
			$(".overlayBox").css({
				top: adBoxTop_adjusted
			});
		}, 100);
	}else{
		$(".overlayBox").css({
		left: adBoxLeft,
		top: adBoxTop,
		position: "fixed"
		});
	}


	// Set overlay position
	var doc_width = document.body.clientWidth + "px";
	var doc_height = document.body.clientHeight + "px";

	$(".bgCover").css({
		width: doc_width,
		height: doc_height
	});

	$(".overlayBox").css({
		visibility: "visible"
	});

}



function showAdOverlay() {

	overlayAdOpen = true;

	//positionAdOverlay();
	setTimeout(positionAdOverlay,1000);

	$(".bgCover").fadeIn(fadeSpeed, countdown());
}

function hideAdOverlay() {
	triggerAd = false;

	// Fade out the background
	$(".bgCover").fadeOut(fadeSpeed);

	$(".overlayBox").css({
		visibility:"hidden"
	});
}

//var target = new Date();
//var target_time = Date.parse(target)/1000;
var counter = 16;
// Display 15 second countdown, then redirects
function countdown(){
	//var current = new Date();
	//current_time = Date.parse(current)/1000;

	var x = counter - 1;
	counter = x;

	$("#sec_count").html(x);

	if(x > 0){
		setTimeout(countdown, 1000);
	} else {
		hideAdOverlay();
	}
}