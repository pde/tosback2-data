/**
 * Need to be able to show and hide flash objects and games for video wall ad to function.
 * They must be available before the ad call is made, therefore they must be at the top of the page.
 */
hideGame = function() {
	// For IE we CAN'T toggle the visibility of the game and still access it
	$("#gameCanvas").css("left","-9999px");
};
showGame = function() {
	// For IE we CAN'T toggle the visibility of the game and still access it
	$("#gameCanvas").css("left","");

};

/**
 * Only necessary to add elements here for which we cannot control the WMODE param
 * if we can, then we can set it manually but if the Flash objects are drawn by 3rd parties
 * or not guaranteed to have a wmode, then we should add them here
 */
hideFlashObjects = function() {
	hideGame();
	$(".adWrap").find("*").css("visibility","hidden");		// banner ad
	$(".ad300x250").css("visibility","hidden");		// box ad
	$("object#preplayMovie").attr("style","");
	$("object#preplayMovie").css("visibility","hidden");		// game ad
	$("object#adLoader_div").attr("style","");
	$("object#adLoader_div").css("visibility","hidden");		// new game ad
	$("#adWrap").css("visibility","hidden");		// game ad
	$("object#movieSwf").attr("style","");      // 25K winner page
	$("object#movieSwf").css("visibility","hidden");		// 25K winner page
};
showFlashObjects = function() {
	showGame();
	$(".adWrap").find("*").css("visibility","visible");		// banner ad
	$(".ad300x250").css("visibility","visible");	// box ad
	$("object#preplayMovie").css("visibility","visible");		// game ad
	$("object#adLoader_div").css("visibility","visible");		// new game ad
	$("#adWrap").css("visibility","visible");		// game ad
	$("object#movieSwf").css("visibility","visible");		// 25K winner page
};

// initialize flag that will be set to true if reskin is running
if (typeof reskinIsActive == "undefined"){
	var reskinIsActive = false;
}

// because we have to wait for the document to be fully rendered
// these helper functions delay the firing until functions above are available

playVideoAd = function() {
	$(document).ready(function () { playVideoAd_ready(); });
};
reskinBackground = function( bgImageUrl, bgColor, transparentAd ) {
	reskinIsActive = true;
	$(document).ready(function () { reskinBackground_ready( bgImageUrl, bgColor, transparentAd ); });
};
reskinBackgroundClickable = function( bgImageUrl, bgColor, bgClickthroughUrl, bgClickableHeight, bgClickableWindow, transparentAd ) {
	reskinIsActive = true;
	$(document).ready(function () { reskinBackgroundClickable_ready( bgImageUrl, bgColor, bgClickthroughUrl, bgClickableHeight, bgClickableWindow, transparentAd ); });
};
reskinBackgroundSelectable = function( bgImageUrls, bgColors, selectableImageMapUrl, clickthroughUrls, clickTrackingUrls, transparentAd ) {
	reskinIsActive = true;
	$(document).ready(function () { reskinBackgroundSelectable_ready( bgImageUrls, bgColors, selectableImageMapUrl, clickthroughUrls, clickTrackingUrls, transparentAd ); });
};

// Moved the following here to fix a production issue. They should be moved to jquery-functions-post.js with the next release.

// --------------------------------------------------------------
// Provides methods for showing the 3 different types of reskins
// --------------------------------------------------------------

// Function to make banner ad transparent
var removeBannerAd = function(){
    $('#inBodyAd td.adWrap').addClass('transparentAd');
    $('.bannerWrapper').addClass('transparentAd');
}

reskinSetBackgroundImgAndColor = function(bgImageUrl,bgColor, transparentAd) {
	$("body").css({'background' : 'url("' +bgImageUrl+ '") no-repeat scroll center 190px' , 'background-color' : bgColor });
    if (transparentAd == 'true'){
        removeBannerAd();
    }
};


reskinSetBackgroundLinks = function(bgClickthroughUrl, bgClickableHeight, bgClickableWindow) {

	// gets width of content, will likely not change
	var contentWidth = $("#wrapper").width();
    // inserts links in the gutters
    $("body").prepend('<a href="'+bgClickthroughUrl+'" target="'+ bgClickableWindow +'" class="gutLinks clearLink" id="gutLinkLft">&nbsp;<\/a><a href="'+bgClickthroughUrl+'" target="'+ bgClickableWindow +'" class="gutLinks clearLink" id="gutLinkRit">&nbsp;<\/a>');

	// checks browser width and calculates width of gutter links
	resizeGutterLinks =  function(contentWidth) {
		var browserWidth =  $(window).width();
		var gutterWidth = (browserWidth - contentWidth) / 2;
		$(".gutLinks").width(gutterWidth);
		$(".gutLinks").css("padding-top",bgClickableHeight);
	};
	// if user resizes window call the function again
	$(window).resize(function(){
		resizeGutterLinks(contentWidth);
	});

	// start checking content width
	resizeGutterLinks(contentWidth);
};

reskinBackground_ready = function( bgImageUrl, bgColor, transparentAd  ) {
	reskinSetBackgroundImgAndColor( bgImageUrl, bgColor, transparentAd );
};

reskinBackgroundClickable_ready = function( bgImageUrl, bgColor, bgClickthroughUrl, bgClickableHeight, bgClickableWindow, transparentAd ) {
	reskinSetBackgroundImgAndColor(bgImageUrl, bgColor, transparentAd);
	reskinSetBackgroundLinks(bgClickthroughUrl, bgClickableHeight, bgClickableWindow);
};

reskinBackgroundSelectable_ready = function(bgImageUrls, bgColors, selectableImageMapUrl, clickthroughUrls, clickTrackingUrls, transparentAd ) {
	// get the number of skins
	var numOfSkins = bgImageUrls.length;

    //if transparentAd value is true go to the removeBannerAd function
    if (transparentAd == 'true'){
        removeBannerAd();
    }

	// fix ie6 background image flicker
	if(typeof document.body.style.maxHeight === "undefined"){
		try {
			document.execCommand("BackgroundImageCache",false,true);
		}
		catch(e) {
			//alert(e.message)
		}
	}

	// helper function for onClick event
	selectableSkinLinkOnClick = function (skinNum){
		reskinBackground_ready( bgImageUrls[skinNum], bgColors[skinNum] );
		reskinSelectSprite( "#selectableSkinLink-"+skinNum );
		reskinDynamicTracking( clickthroughUrls[skinNum], clickTrackingUrls[skinNum] );
	};

	// change selected sprite background position
	reskinSelectSprite = function(linkId) {
		$("#reskinContent li a.selected").removeClass("selected");
		$(linkId).addClass("selected");
	};

//    $('.banner').wrapInner('<div />');

	// sets the wrapping reskin div that contains a class to style the template, based on the numOfSkins
	var StringBuffer = function () {
		this.__strings__ = new Array;
	};
	StringBuffer.prototype.append = function (str) {
		this.__strings__.push(str);
	};
	StringBuffer.prototype.toString = function () {
		return this.__strings__.join("");
	};
	var buffer = new StringBuffer();
    buffer.append("<div class='clearfix' id='dynamicSkin'>");
	buffer.append("<div id='reskinContent' class='reskinContent-"+numOfSkins+" clearfix'>")
	buffer.append("<a href='"+clickthroughUrls[0]+"' id='reskinSponsorLink' target='_blank' class='clearLink'>&nbsp;</a>");
	buffer.append("<ul>");
	for(i=0; i<numOfSkins; i++) {
		// have to draw the onclick here, can't attach dynamically because -- suprise -- IE sucks
		buffer.append("<li><a href=\"#\" onclick=\"selectableSkinLinkOnClick("+i+"); return false;\" id=\"selectableSkinLink-"+i+"\" class=\"clearLink\">select skin "+i+"</a></li>");
	}
	buffer.append("</ul>");
	$(".banner").append(buffer.toString());
    var bannerHeight = $('#dynamicSkin').height();
    $('.banner').height(bannerHeight).addClass('dynamicSkin');

	$("#reskinContent ul li a").css("background-image","url("+selectableImageMapUrl+")");

	//call the default (first) skin and set set default sprite to selected position
	reskinBackground_ready(bgImageUrls[0],bgColors[0]);
	reskinSelectSprite("#selectableSkinLink-0");
};

reskinDynamicTracking = function( clickthroughUrl, clickTrackingUrl ) {
	$("#reskinSponsorLink").attr("href", clickthroughUrl);

	// load tracking pixel
	try {
		if ( typeof $("#selectableTracker").attr("src") == "undefined" ){
			$("#reskinContent").append('<img id="selectableTracker" src="' + clickTrackingUrl + '" style="display:none;" />');
		}
		else {
			$("#selectableTracker").attr("src", clickTrackingUrl);
		}
	}
	catch(e) {
		//alert(e.message);
	}
};
