var localInfo = "/" + $('#locale').val();
var DynamicContent = function () {

    var category_id = null,
		flash_div_container = null,
		carousel_items_container = null,
		flash_ajax_url = null,
		carousel_ajax_url = null,
        brand_name = null,
        video_id = null;
    embed_container = null;
    carousel_Text = null;

    init = function (params) {

        category_id = params.category_id,
		flash_div_container = params.flash_div_container,
		carousel_items_container = params.carousel_item_container,
		flash_ajax_url = params.flash_ajax_url,
		carousel_ajax_url = params.carousel_ajax_url;
        video_id = params.video_id;
        brand_name = params.brand_name;
        embed_container = params.embed_container;
        carousel_Text = params.carousel_Text;

    },
	carousel_content = function () {

	    if (carousel_items_container != null && carousel_ajax_url != null && category_id != null && brand_name != null) {

	        //Clear previous data
	        $(carousel_items_container).html("");

	        //Code for adding loader symbol
	        $(carousel_items_container).append('<img src="/Resources/Images/ajax-loader.gif" id="loader-symbol" width="220" height="19" border="0"/>');

	        //Make ajax call to get carousel items HTML
	        $.ajax({
	            url: carousel_ajax_url,
	            type: "POST",
	            data: { categoryCode: category_id, brandName: brand_name, carouselText: carousel_Text },
	            dataType: "json",
	            success: function (output) {
	                //Remove load item image
	                $(carousel_items_container).remove('#loader-symbol');

	                if (output.Result.ArrowRequired == "0") {

	                    //Hide class="items"
	                    // $('#blogsVideoCarosel div.items').css('visibility', 'hidden');

	                    $('#blogsVideoCarosel div.items').css('top', '0');

	                    //No data - Hide Prev & Next buttons
	                    $('.blogs-next').css('visibility', 'hidden');
	                    $('.blogs-prev').css('visibility', 'hidden');

	                    //Show div with id room-to-bloom-no-result
	                    // $('div#room-to-bloom-no-result').css('visibility', 'visible');


	                }
	                else {

	                    //Carousel Data is present in AJAX response

	                    //Hide div with id room-to-bloom-no-result
	                    //$('div#room-to-bloom-no-result').css('visibility', 'hidden');

	                    //Show class="items"
	                    // $('#blogsVideoCarosel div.items').css('visibility', 'visible');

	                    //Data - Show Prev & Next buttons
	                    $('.blogs-next').css('visibility', 'visible');
	                    $('.blogs-prev').css('visibility', 'visible');
	                }

	                //Populate div items
	                $(carousel_items_container).html(output.Result.Data);
	            }
	        });
	    }
	},

	flash_content = function () {

	    if (flash_div_container != null && flash_ajax_url != null && video_id != null) {

	        //Clear previous data
	        $(flash_div_container).html("");

	        //Code for adding loader symbol
	        $(flash_div_container).append('<img src="/Resources/Images/ajax-loader.gif" id="loader-symbol" width="220" height="19" border="0"/>');

	        //Make ajax call to get carousel items HTML
	        $.ajax({
	            url: flash_ajax_url,
	            type: "POST",
	            data: { vId: video_id },
	            dataType: "json",
	            success: function (output) {
	                //Remove load item image
	                $(flash_div_container).remove('#loader-symbol');

	                //Populate div items
	                $(flash_div_container).html(output.Result.Data);

	                //Embed Content
	                $(embed_container).text(output.Result.Data);
	            }
	        });
	    }
	};

    return {
        init: init,
        carousel_content: carousel_content,
        flash_content: flash_content
    };

} ();

//Room to bloom blogs & videos
var is_room_to_bloom_blog = ($(".blogsVideoPlayer").length > 0) ? 1 : 0;

if (is_room_to_bloom_blog) {

    var _locale = $('#VideoLocale').attr('value');

    var params = {
        category_id: $("#category_code").attr('value'),
        brand_name: $("#brand_name").attr('value'),
        video_id: $("#video_id").attr('value'),
        flash_div_container: ".blogsVideoPlayer",
        carousel_item_container: "#blogsVideoCarosel div.items",
        flash_ajax_url: "/"+_locale+"/RTBVideoBlog/GetVideoForBrands",
        carousel_ajax_url: "/" + _locale + "/RTBVideoBlog/GetCarouselForBrands",
        embed_container: "#blogsVideosPage .embed-content",
        carousel_Text: $("#carouselText").attr("value")
    };

    DynamicContent.init(params);

    //Call these functions
    DynamicContent.carousel_content();
    DynamicContent.flash_content();
}

//Button click event
$('.blog_videos_btn').live('click', function (event) {
    event.preventDefault();

    var option_values = $(this).attr('rel');
    option_values = option_values.split("|");

    var _locale = $('#VideoLocale').attr('value');

    var params = {
        category_id: option_values[1],
        brand_name: option_values[2],
        video_id: option_values[0],
        flash_div_container: ".blogsVideoPlayer",
        carousel_item_container: "#blogsVideoCarosel div.items",
        flash_ajax_url: "/" + _locale + "/RTBVideoBlog/GetVideoForBrands",
        carousel_ajax_url: "/" + _locale + "/RTBVideoBlog/GetCarouselForBrands",
        embed_container: "#blogsVideosPage .embed-content",
        carousel_Text: option_values[3]
    };

    DynamicContent.init(params);

    //Call these functions
    DynamicContent.carousel_content();
    DynamicContent.flash_content();
    $(document).scrollTop(0);
});

/* Google Analytics Page Load Tracking Starts */
function pageLoadGAtracking(params) {

	// Fix the Campaign and Channel - Try to use tracker XML parameters (from tracker.mattel.com) as possible
	trackCampain = (params.campaign.indexOf(" ") < 0) ? "CAMPAIGN." + params.campaign.replace(/-/g, "").toUpperCase() : "\'" + params.campaign + "\'";
	trackChannel = (params.channel.indexOf(" ") < 0) ? "CHANNEL." + params.channel.replace(/-/g, "").toUpperCase() : "\'" + params.channel + "\'";
	trackContentType = (params.contenttype.indexOf(" ") < 0) ? "CONTENTTYPE." + params.contenttype.replace(/-/g, "").toUpperCase() : "\'" + getTrackValue[3] + "\'";
	trackAction = (params.action.indexOf(" ") < 0) ? "ACTION." + params.action.replace(/-/g, "").toUpperCase() : "\'" + params.action + "\'";

	var scriptCall = 'Tracker.track(' + '{name:\'' + params.name +
						'\',campaign:' + trackCampain +
						',channel:' + trackChannel +
						',contenttype:' + trackContentType +
						',action:' + trackAction + '})';
	if (typeof (MATTEL) != "undefined") {
		MATTEL.tracker.Tracker.enableShortCuts();
		eval(scriptCall);
	}

}
/* Google Analytics Page Load Tracking Ends */

//checks if flash is installed/enabled on the browser
function isFlashEnabled() {
    var hasFlash = false;
    try {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (fo) hasFlash = true;
    }
    catch (e) {
        if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
            if (navigator.plugins && navigator.plugins["Shockwave Flash"]) {
                hasFlash = true;
            }
        }
    }
    return hasFlash;
}

/* FP Home page flash overlay flash animation display */
function loadOverlayFlash() {
	//Set the block visible
	$('#flashContent').css('display', 'block');

	//Call the function to check flash is enabled/disabled
	var isFlashPresent = isFlashEnabled();

	if(isFlashPresent) {
		//Add an overlay div to disable background click
		$('body').append("<div class='pageOverLay'/>");
		if ($.browser.msie && (parseInt($.browser.version, 10) == 7)) {
			$('.fp_landing').css({'z-index':'10001'});
		}
		setTimeout(function () {
			$('.fp_landing .banner, .banner-carousel-right').css('visibility', 'visible');
		}, 10000);
	}
};

/* FP Home page flash "Close" button/Unload flash event */
function UnloadFlash(type) {
    //Hide the display area
	if(type == 'end') {
		$('#flashContent').css('overflow', 'hidden').css('width', '0px').css('height', '0px');
	}
	else {
		$('#flashContent').css('display', 'none').html(''); //- Causes Flash music to stop prematurely
	}
    //Remove the overlay
    $('.pageOverLay').remove();
	
    $('.fp_landing .banner, .banner-carousel-right').css('visibility', 'visible');
    // play the carousal only if we have more than one image
    if ($(".landing-scrollable div.items a").length > 1) {
        $(".landing-scrollable").data("scrollable").play();
    } 
    if ($.browser.msie && (parseInt($.browser.version, 10) == 7)) {
        $('.fp_landing').css({ 'z-index': 'auto' });
        $('.subOverLay').remove();
    }
};

function shoshBeGone(type) {
    UnloadFlash(type);
    //Get the reference of the overlay div
//    var overlay = $("#flashContent");
//    return closeOverLay(overlay);
};

// All Carousel Scripts
$(function () {
    //Links for Product Registration, Instructions, Replacement Parts - Bug ID:1542371
    $(".brand-site-babygear div.area-bottom li#registration").hover(
      function () {
          $('ul.registration-details').slideDown("slow");
      },
      function () {
          $('ul.registration-details').slideUp("slow"); ;
      }
    );

    //Product Details Page - Max Weight 
    $('img.ageWeightGraphics').bind("load", function () {
        var ageGroupTop = $('ul.age-group-top');
        var weight_scale_width = $(this).width();

        if (weight_scale_width == 85) {
            ageGroupTop.css('width', '60%');
        }
        else if (weight_scale_width == 180) {
            ageGroupTop.css('width', '50%');
        }
        else if (weight_scale_width > 180) {
            ageGroupTop.css('width', '100%');
        }
    });
    ///little people en espanol video
    var videoId = $('#tvVideo').attr('videoId');
    var embedObj = '<object width="480" height="360" data="' + videoId + '"' +
            ' type="application/x-shockwave-flash">' +
            '<param value="' + videoId + '"' +
            '" name="movie">' +
            '<param value="high" name="quality">' +
            '<param value="#000000" name="bgcolor">' +
            '<param value="true" name="play">' +
            '<param value="true" name="loop">' +
            '<param value="opaque" name="wmode">' +
            '<param value="showall" name="scale">' +
            '<param value="true" name="menu">' +
            '<param value="false" name="devicefont">' +
            '<param value="always" name="allowScriptAccess">' +
		'</object>';

    $('#tvVideo').append(embedObj);

});

//Function gets called for Shared : Embed : Email Copy functionality
function shareEmbedEmail(selector_to_unbind_event) {
    videoShareFlashTest();
}

jQuery.cachedScript = function (url, options) {

    // allow user to set any option except for dataType, cache, and url
    options = $.extend(options || {}, {
        dataType: "script",
        cache: false,
        url: url
    });

    // Use $.ajax() since it is more flexible than $.getScript
    // Return the jqXHR object so we can chain callbacks
    return jQuery.ajax(options);
};


//Created an array to hold onto the desired info.
var windowSizeArray = ["width=1500,height=1000,scrollbars=yes,toolbar=yes,menubar=yes"];
//Links that has the ".newWindow" class will call this script.
$('.newWindow').live("click", function (event) {

    // Gets the URL from the clicked link.
    var url = $(this).attr("href");

    /*Gets the name from the clicked link. Currently I commented out the
    jquery script and just put "popUp" for a default name because I didn't
    include the name in the links.*/
    var windowName = "popUp"; //$(this).attr("name");

    /*Places the string from the array into the windowSize variable.
    The array slot is determined by the "rel" number on the link.*/
    var windowSize = windowSizeArray[$(this).attr("rel")];

    //This method opens a new browser window.
    window.open(url, windowName, windowSize);

    /*Prevents the browser from executing the default action and
    allows us to use the "window.open" within our script.*/
    event.preventDefault();

});

function CallAdjustDate(suffix) {
    var objday = eval('document.RegistrationForm.ddlDay' + suffix + ';');
    var objmonth = eval('document.RegistrationForm.ddlMonth' + suffix + ';');
    var objyear = eval('document.RegistrationForm.ddlYear' + suffix + ';');

    vmonth = objmonth.options[objmonth.selectedIndex].value;
    vyear = objyear.options[objyear.selectedIndex].value;
    vday = objday.selectedIndex;

    if (vmonth == '2') { //February
        if (vyear.length > 0) {
            if (!checkYear(vyear)) {
                j = 28; 	//not a leap year
            } else {
                j = 29; 	//it is a leap year
            }
        }
        else {
            j = 28;
        }
    }
    else if (vmonth == '4' || vmonth == '6' || vmonth == '9' || vmonth == '11') { //these months have 30 days
        j = 30;
    }
    else {
        j = 31; 	//all other months have 31 days
    }

    //erase the day select box and append j number of rows
    objday.length = 0;
    iLength = objday.length;
    objday[iLength] = new Option('--', '');
    objday.selectedIndex = 0;
    for (i = 1; i <= j; i++) {
        iLength = objday.length;
        objday[iLength] = new Option(i, i);
        if (i == vday) {
            objday.selectedIndex = iLength;
        }
    }
};

function removeChildFromForm(suffix) {
    var objChildId = eval('document.SaveCustomerForm.hfChildId' + suffix + ';');
    var objGender = eval('document.SaveCustomerForm.ddlGender' + suffix + '.options;');
    var objDay = eval('document.SaveCustomerForm.ddlDay' + suffix + '.options;');
    var objMonth = eval('document.SaveCustomerForm.ddlMonth' + suffix + '.options;');
    var objYear = eval('document.SaveCustomerForm.ddlYear' + suffix + '.options;');

    objChildId.value = "0";
    objGender.selectedIndex = 0;
    objDay.selectedIndex = 0;
    objMonth.selectedIndex = 0;
    objYear.selectedIndex = 0;
};

function checkYear(year) {
    //check to see if the year is not a leap year
    return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 1 : 0;
};

function videoShareFlashTest() {
    var tranSpeed = 200;

    // -- The Share button function --
    function shareBtns(box, unbox) {
        $("#" + unbox + "-box").appendTo("#universal-player").slideUp(tranSpeed);
        $("#" + box + "-box").slideDown(tranSpeed);

        //clear "content copied"
        $("#" + box + "-box .copied").html("");

        $("#" + box + "-box .copy-button").zclip({
            path: "/Resources/images/ZeroClipboard.swf",
            copy: $("." + box + "-content").text(),
            afterCopy: function () {
                $("#" + box + "-box .copied").html("Content Copied");
                $('.persist-copied').text(box + ' code copied');
                $("#" + box + "-box").addClass("copied-content");
                $("#" + unbox + "-box .copied").html("");
                $("#" + unbox + "-box").removeClass("copied-content");
            }
        });
    };

    // -- The Share button triggers --
    $(".share-embed").live('click', function () { shareBtns("embed", "email"); });
    $(".share-email").live('click', function () { shareBtns("email", "embed"); });

    // -- The Copy button function --
    function copyBtn(copied, uncopied) {
        var value = $("." + copied + "-content").text();

        // for IE only
        if (window.clipboardData) {
            window.clipboardData.setData("text", value);
            $("#" + copied + "-box .copied").html("Content Copied");
            $("#" + uncopied + "-box .copied").html("");
        }
    };

    // -- The Copy button triggers --
    $("#embed-box .copy-button").click(function (event) { copyBtn("embed", "email"); });
    $("#email-box .copy-button").click(function (event) { copyBtn("email", "embed"); });

    // -- The Close button trigger --
    $(".share-box .close-button").live('click', function () {
        $(this).parents(".share-box").stop(true, true).slideUp(tranSpeed);
        $(this).parents(".share-box").find(".copied").html("");
        //$(this).parents(".share-box").parent().find(".persist-copied").html("");
    });
}; // videoShareFlashTest ends

// Add rounded corners to experts images, curvyCorners doesn't work on IMG tag
function addRoundExperts() {
     if (!Modernizr.borderradius) {
        $('#meet-experts a.experts').prepend('<div class="tl-re"></div><div class="tr-re"></div><div class="bl-re"></div><div class="br-re"></div>');
     }
};

$(document).ready(function () {
    videoShareFlashTest();
    addRoundExperts();
});

var onlineGamesSetupGames = function () {
    if (document.getElementById("gameName").value=="BubbleMowerGame") {
        $("#contentPlaceholder")
        .append('<form name="mowerFrm"><font face="" color="#0080FF" size="2"><b>Score:</b> </font><input type="text" name="display" size="3" style="width:23px; height:18px; size:14px; border:0px" value="0" onFocus="this.blur"><input type="hidden" style="width:50px" name="score" value="0"><center><a href="#game" onclick="startGame();"><img src="http://www.fisher-price.com/us/fun/games/bubblemower/img/startbtn.gif" border="0" height="30" width="67"></a></form></center>');

        //Define legacy variables and functions
        window.InternetExplorer = navigator.appName.indexOf("Microsoft") != -1;
        window.bubmow = InternetExplorer ? window.bubblepop : window.document.bubblepop;
        gameon = false;
    }
}
function startGame() {
    var InternetExplorer = navigator.appName.indexOf("Microsoft") != -1;
    var bubmow = InternetExplorer ? window.bubblepop : window.document.bubblepop;

    document.mowerFrm.display.value = 0;
    document.mowerFrm.score.value = 0;

    count = 0;
    if (gameon != true) {
        gameon = true;
        bubmow.Play();
    }
    else {
        gameon = false;
        bubmow.Rewind();
        document.mowerFrm.display.value = 0;
        document.mowerFrm.score.value = 0;
    }
}

function reStartGame() {
    var InternetExplorer = navigator.appName.indexOf("Microsoft") != -1;
    var bubmow = InternetExplorer ? window.bubblepop : window.document.bubblepop;

    document.mowerFrm.display.value = 0;
    document.mowerFrm.score.value = 0;

    count = 0;
    numPercentLoaded = bubmow.PercentLoaded();
    if (numPercentLoaded == 100) {
        gameon = true;
        bubmow.Play();
    }
}

function endGame() {
    var InternetExplorer = navigator.appName.indexOf("Microsoft") != -1;
    var bubmow = InternetExplorer ? window.bubblepop : window.document.bubblepop;

    gameon = false;
    count = 0;
    scoreVal = document.mowerFrm.score.value;

    bubmow.StopPlay();
    if (scoreVal < 101) {
        bubmow.GotoFrame(220);
        bubmow.Play();
    }
    if (scoreVal < 301 && scoreVal > 100) {
        bubmow.GotoFrame(230);
        bubmow.Play();
    }
    if (scoreVal < 430 && scoreVal > 300) {
        bubmow.GotoFrame(240);
        bubmow.Play();
    }
    if (scoreVal == 435) {
        bubmow.GotoFrame(250);
        bubmow.Play();
    }
}

function bubblepop_DoFSCommand(command, args) {
    //  Handle special cases where we need different code for Internet Explorer vs. Netscape Navigator
    if (command == "score")
        score(args);
    if (command == "endGame")
        endGame();
    if (command == "count")
        adcount();
    if (command == "startGame") {
        gameon = false;
        reStartGame();
    }
}

function score(numIn) {
    document.mowerFrm.score.value = parseInt(document.mowerFrm.score.value) + parseInt(numIn);
    document.mowerFrm.display.value = document.mowerFrm.score.value;
}

function adcount() {
    count++;
    if (count == 3)
        endGame();
}

//Script to track FB like in Google analytics

function facebookInit() {
	FB.Event.subscribe('edge.create',
				function (response) {			    

					MATTEL.tracker.Tracker.enableShortCuts();
					Tracker.pagetrack = true;

					Tracker.name = document.title;
					Tracker.campaign = CAMPAIGN.NONE;
					Tracker.channel = CHANNEL.FACEBOOK_LIKE;
					Tracker.contenttype = CONTENTTYPE.BUTTON;
					Tracker.action = ACTION.CLICK;

					MATTEL.tracker.Tracker.track();
				});
}

//Script to print parenting article detail page

$('.article_print').live('click', function (event) {
	event.preventDefault();
	window.print();
});

//Script for Power wheels compare tool

$('#addVehicles, .addVehicles').live('click', function (event) {
    event.preventDefault();
    var selectedProducts = $('#selected-products').val();
    var popupurl = $(this).attr("rel") + "&selprods=" + selectedProducts;

    $('.displayCompareOverlay').jOverlay({ center: false, color: '#8c8c8c', opacity: 0.9, zindex: '9999', css: { position: 'absolute', top: '10%', left: '14.5%'} });
    $('#loader-img').show();
    $.ajax({
        url: popupurl,
        success: function (data) {
            $('.compareToolProductContainer').html(data);
            $('.functional').die('click');

            var lastimage = $('.productListed').last().children('img');
            lastimage.bind('load', function () {
                $('.functional').live('click', SelectProduct);
                $('#loader-img').hide();                
            });
        }
    });
});


/* Videos Display - Videos Landing Page Starts */
var html5video = '';
var output_value = '';

function displayVideos(video_id, _path, _flashVarValue, _width, _height, _vw, _vh) {

    //Call the function to check flash is enabled/disabled
   var isFlashPresent = isFlashEnabled();
  
    if (isFlashPresent) {
        output_value = objectString(_width, _height, _path, _flashVarValue);

        $('#video-player').html(output_value);
    }
    else {

        //$.getScript("http://mediaportal.mirror-image.com/api/script", function () {
            /*
            This code getVideoPlayer is defined in the Mirror Image API Script.  The script variable ends up with a "<script include="" item which is then 
            written to dom to have the script loaded. Unfortunately, there is no callback of when this scripts loads.  So the code then loops in a timeout 
            to check for the html5video variable becoming non-empty.  The HTML in that html5video variable is a <video /> tag string that Mirror Image generates 
            for that video id, knowing what the non-flash client can support.   Once it is non-empty it writes the value of the variable to the dom and 
            voila you have HTML 5 Video.
            */
           // output_value = getVideoViewer(video_id, { server_detection: true, width: _vw, height: _vh, jsonp_variable: "html5video", video_format_name: "FP_web_high" });

           
           
           // loadHTML5Video();
       // });
       //  $("#nonFlashVid").html("<a href='http://mediaservice.mirror-image.com/videos/b565716f3d92b/formats/FP_mobile_high/play.mp4'>Watch Video</a>");
    }
}

function loadHTML5Video() {
   
    if (html5video != "") {
        $("#nonFlashVid").innerhtml("<video src='http://mediaservice.mirror-image.com/videos/b565716f3d92b/formats/FP_mobile_high/play.mp4'></video>");
        
    } else {
        setTimeout(loadHTML5Video, 1000);
    };
};

/* Videos Display - Videos Landing Page Ends */

/* Following function returns Object string for Flash with width, height & swf path */
function objectString(_width, _height, _path, _flashVarValue) {
    var obj_str = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="' + _width + '" height="' + _height + '">' +
                    '<param name="movie" value="' + _path + '"/>' +
                    '<param name="quality" value="high" />' +
                    '<param name="bgcolor" value="#cccccc" />' +
                    '<param name="play" value="true" />' +
                    '<param name="loop" value="false" />' +
                    '<param name="wmode" value="transparent" />' +
                    '<param name="scale" value="noscale" />' +
                    '<param name="menu" value="false" />' +
                    '<param name="devicefont" value="false" />' +
                    '<param name="salign" value="" />' +
                    '<param name="allowScriptAccess" value="always" />' +
                    '<param name="allowfullscreen" value="true"/>' +
                    '<param name="FlashVars" value="' + _flashVarValue + '" />' +
                        '<!--[if !IE]>-->' +
                        '<object type="application/x-shockwave-flash" data="' + _path + '" width="' + _width + '" height="' + _height + '">' +
                        '<param name="movie" value="' + _path + '"/>' +
                        '<param name="quality" value="high" />' +
                        '<param name="bgcolor" value="#cccccc" />' +
                        '<param name="play" value="true" />' +
                        '<param name="loop" value="false" />' +
                        '<param name="wmode" value="transparent" />' +
                        '<param name="scale" value="noscale" />' +
                        '<param name="menu" value="false" />' +
                        '<param name="devicefont" value="false" />' +
                        '<param name="salign" value="" />' +
                        '<param name="allowScriptAccess" value="always" />' +
                        '<param name="allowfullscreen" value="true"/>' +
                        '<param name="FlashVars" value="' + _flashVarValue + '" />' +
                        '<!--<![endif]-->' +
                    '<a href="http://www.adobe.com/go/getflash"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a>' +
                    '<!--[if !IE]>-->' +
                '</object>' +
                '<!--<![endif]-->' +
            '</object>';

    return obj_str;
};

/* Scripts for JOL_landing_FINAL carousel image click which will change the video */
$('#jol-landing-carousel a.videoId').live('click', function (event) {
    event.preventDefault();

    var url = location.href;

    //Get the Video Id
    var videoId = $(this).attr('href');
    var subTitle = $(this).attr('rel');

    /* Path of Universal Video Player */
    var _path = '/Resources/Images/video_shell.swf';
    var _flashVarValue = "v0=mi&v2=" + subTitle + "&v3=none&v4=http://mediaservice.mirror-image.com/videos/" + videoId + "/formats/FP_web_high/file.mp4";

    displayVideos(videoId, _path, _flashVarValue, "561", "356", "561", "356")

    $(".embed-content").text(output_value);
    $(".email-content").html(url);
    $(".persist-copied").html("");
});

$('.popup-close-button.compare-tool').live('click', function (event) {
    //Stop default anchor event
    event.preventDefault();
    $('.functional').die('click');
    
    var selProducts = "";
    $('.selected').each(function () {
        selProducts = selProducts + $(this).parent().attr('rel') + ",";
    });
    selProducts = selProducts.substring(0, selProducts.length - 1);

    var divWidth;
    var selProds = selProducts.split(',');
    if (selProds == "") { $('.power-wheel-compare-inner').empty(); divWidth = 0; }
    else { divWidth = selProds.length * 166; }
    $('.power-wheel-compare-inner').css('width', divWidth);

    $('#selected-products').attr('value', selProducts);
    var compUrl = $('#compare-url').val();
    $.ajax({
        type: 'POST',
        url: compUrl + selProducts,
        success: function (data) {
            $('.power-wheel-compare-inner').empty();
            $('.power-wheel-compare-inner').html(data);
            
            $('.row_terrain').each(function () {
                var currentObj = $(this);
                if ($(currentObj).css('height') > $(currentObj).css('min-height')) {
                    var height = $(currentObj).css('height');
                    $('.row_terrain').css('height', height);
                }
            });

            $('.row_vehicle_type').each(function () {
                var currentObj = $(this);
                if ($(currentObj).css('height') > $(currentObj).css('min-height')) {
                    var height = $(currentObj).css('height');
                    $('.row_vehicle_type').css('height', height);
                }
            });
           
            $('.scroll-power').jScrollPane({ showArrows: false });
        }
    });

    //Call the function to hide the popup 
    $.closeOverlay();
});

function SelectProduct() {
    var currentObj = $(this);
    if ($(currentObj).hasClass('selected')) {
        $(currentObj).attr('src', '/Resources/Images/plus.png');
        $(currentObj).removeClass('selected');
    }
    else {
        $(currentObj).attr('src', '/Resources/Images/cross.png');
        $(currentObj).addClass('selected');
    }
}
//$('.functional').live('click', SelectProduct);


$('.compared-product').live('click', function () {
    $(this).parents('.propertiesCol').remove();
    var selProducts = "";
    var prod_count = 0;
    $('.compared-product').each(function () {
        selProducts = selProducts + $(this).parent().attr('rel') + ",";
        prod_count++;
    });

    var divWidth = prod_count * 166;
    $('.power-wheel-compare-inner').css('width', divWidth);

    selProducts = selProducts.substring(0, selProducts.length - 1);
    $('#selected-products').val(selProducts);
});

//Thomas CheckList Code Here


function ValidateEmailCheckListFormInput() {
    var hasError = false;
    $(".pop-up-error").hide();
    $(".green-info").hide();
    //Validate your email field
    var yourEmailFieldValue = document.getElementById('youremail').value;
    var yourEmailFieldCode;
    var yourEmailFieldMsg;

    yourEmailFieldCode = ValidateIfFieldEmpty(yourEmailFieldValue);
    if (yourEmailFieldCode != 19999) {
        yourEmailFieldMsg = GetMessage(20003);
        $("#your-email-empty").show();
        $("#your-email-empty").html(yourEmailFieldMsg);
        hasError = true;
    }
    else {
        yourEmailFieldCode = ValidateEmail(yourEmailFieldValue);
        if (yourEmailFieldCode != 19999) {
            yourEmailFieldMsg = GetMessage(20036);
            $("#your-invalid-email").show();
            $("#your-invalid-email").html(yourEmailFieldMsg);
            hasError = true;
        }

    }

    //Validate recipient email field
    var recipientEmailFieldValue = document.getElementById('toaddress').value;
    var recipientEmailFieldCode;
    var recipientEmailFieldMsg;

    recipientEmailFieldCode = ValidateIfFieldEmpty(recipientEmailFieldValue);
    if (recipientEmailFieldCode != 19999) {
        recipientEmailFieldMsg = GetMessage(20034);
        $("#recipient-email-empty").show();
        $("#recipient-email-empty").html(recipientEmailFieldMsg);
        hasError = true;
    }
    else {
        recipientEmailFieldCode = ValidateEmail(recipientEmailFieldValue);
        if (recipientEmailFieldCode != 19999) {
            recipientEmailFieldMsg = GetMessage(20035);
            $("#recipient-invalid-email").show();
            $("#recipient-invalid-email").html(recipientEmailFieldMsg);
            hasError = true;
        }

    }

    //Validate your first name field
    var yourNameFieldValue = document.getElementById('yourname').value;
    var yourNameFieldCode;
    var yourNameFieldMsg;

    yourNameFieldCode = ValidateIfFieldEmpty(yourNameFieldValue);
    if (yourNameFieldCode != 19999) {
        yourNameFieldMsg = GetMessage(20038);
        $("#your-name-empty").show();
        $("#your-name-empty").html(yourNameFieldMsg);
        hasError = true;
    }

    //Validate recipient first name field
    var recipientNameFieldValue = document.getElementById('recipientsname').value;
    var recipientNameFieldCode;
    var recipientNameFieldMsg;

    recipientNameFieldCode = ValidateIfFieldEmpty(recipientNameFieldValue);
    if (recipientNameFieldCode != 19999) {
        recipientNameFieldMsg = GetMessage(20037);
        $("#recipient-name-empty").show();
        $("#recipient-name-empty").html(recipientNameFieldMsg);
        hasError = true;
    }

    if (hasError == true) {
        return false;
    }
    else {
        return true;
    }

}

function ValidateLoginRegisterFormInput() {
    var hasError = false;
    $(".pop-up-error").hide();
    $(".green-info").hide();    

    //Validate email field
    var emailFieldValue = document.getElementById('email').value;
    var emailFieldCode;
    var emailFieldMsg;

    emailFieldCode = ValidateIfFieldEmpty(emailFieldValue);
    if (emailFieldCode != 19999) {
        emailFieldMsg = GetMessage(20003);
        $("#email-empty").show();
        $("#email-empty").html(emailFieldMsg);
        hasError = true;
    }
    else {
        emailFieldCode = ValidateEmail(emailFieldValue);
        if (emailFieldCode != 19999) {
            //emailFieldMsg = GetMessage(emailFieldCode);
            $("#email-invalid").show();
            hasError = true;
        }

    }

    //Validate password field
    var passwordFieldValue = document.getElementById('password').value;
    var passwordFieldCode;
    var emailFieldMsg;

    passwordFieldCode = ValidateIfFieldEmpty(passwordFieldValue);
    if (passwordFieldCode != 19999) {
        //emailFieldMsg = GetMessage(20003);
        $("#password-empty").show();
        hasError = true;
    }
    else {
        passwordFieldCode = ValidateForMaxLength(passwordFieldValue, 8, 15);
        if (passwordFieldCode != 19999) {
            //captionMsg = GetMessage(20013);
            $("#password-length").show();
            hasError = true;
        }
    }

    if (hasError == true) {
        return false;
    }
    else {
        return true;
    }

}
function ValidateThomasForwardPhotoFormInput() {
    var hasError = false;
    $(".msg").hide();
    $(".successMessage").hide();
    //Validate your email field
    var yourEmailFieldValue = document.getElementById('youremail').value;
    var yourEmailFieldCode;
    var yourEmailFieldMsg;

    yourEmailFieldCode = ValidateIfFieldEmpty(yourEmailFieldValue);
    if (yourEmailFieldCode != 19999) {
        yourEmailFieldMsg = GetMessage(20003);
        $("#your-email-empty").show();
        $("#your-email-empty").html(yourEmailFieldMsg);
        hasError = true;
    }
    else {
        yourEmailFieldCode = ValidateEmail(yourEmailFieldValue);
        if (yourEmailFieldCode != 19999) {
            yourEmailFieldMsg = GetMessage(20036);
            $("#your-invalid-email").show();
            $("#your-invalid-email").html(yourEmailFieldMsg);
            hasError = true;
        }

    }

    //Validate your first name field
    var yourNameFieldValue = document.getElementById('yourname').value;
    var yourNameFieldCode;
    var yourNameFieldMsg;

    yourNameFieldCode = ValidateIfFieldEmpty(yourNameFieldValue);
    if (yourNameFieldCode != 19999) {
        yourNameFieldMsg = GetMessage(20038);
        $("#your-name-empty").show();
        $("#your-name-empty").html(yourNameFieldMsg);
        hasError = true;
    }

    // Validate To-email addresses, atleast one out of 3 is mandatory
    var friendEmailFieldValue = [3];
    friendEmailFieldValue[0] = document.getElementById('txtFriendEmail1').value;
    friendEmailFieldValue[1] = document.getElementById('txtFriendEmail2').value;
    friendEmailFieldValue[2] = document.getElementById('txtFriendEmail3').value;
    var friendEmailCode;
    var friendEmailMsg;
    var e = [3];
    for (var i = 0; i <= 2; i++) {
        if (friendEmailFieldValue[i] == '') {
            e[i] = 0;
        }
        else {
            friendEmailCode = ValidateEmail(friendEmailFieldValue[i])
            if (friendEmailCode != 19999) {
                e[i] = 2;
            }
            else {
                e[i] = 1;
            }
        }
    }

    if (e[0] + e[1] + e[2] == 0) {
        friendEmailMsg = GetMessage('19810');
        $("#recipient-invalid-email").show();
        $("#recipient-invalid-email").html(friendEmailMsg);
        hasError = true;
    }
    else {
        if (e[0] == 2 || e[1] == 2 || e[2] == 2) {
            friendEmailMsg = GetMessage('20042');
            $("#recipient-invalid-email").show();
            $("#recipient-invalid-email").html(friendEmailMsg);
            hasError = true;
        }
        else {
        }
    }

    if (hasError == true) {
        return false;
    }
    else {
        return true;
    }

}
function ValidateThomasUploadPhotoFormInput() {
    var hasError = false;
    $(".successMessage").hide();
    $(".errorMessage").hide();
    //Validate Email Id field
    var EmailFieldValue = document.getElementById('email').value;
    var EmailCode;
    var EmailMsg;
    EmailCode = ValidateIfFieldEmpty(EmailFieldValue);
    if (EmailCode != 19999) {
        EmailMsg = GetMessage(20003);
        $("#inValidEmail").show();
        $("#inValidEmail").html(EmailMsg);
        hasError = true;
    }
    else {
        EmailCode = ValidateEmail(EmailFieldValue);
        if (EmailCode != 19999) {
            EmailMsg = GetMessage(EmailCode);
            $("#inValidEmail").show();
            $("#inValidEmail").html(EmailMsg);
            hasError = true;
        }
        else {
        }
    }


    //Validate image file 

    var imageField = document.getElementById('loadfile');
    var imageFieldCode;
    var imageFieldMsg;

    if (imageField == null && imageField.value == '') {
        imageFieldMsg = GetMessage(19820);
        $("#inValidFile").show();
        $("#inValidFile").html(imageFieldMsg);
        hasError = true;
    }
    else {
        var img = imageField.value;
        var imageFieldValueCode = ValidateForImageExtension(img);
        if (imageFieldValueCode != 19999) {
            imageFieldMsg = GetMessage(imageFieldValueCode);
            $("#inValidFile").show();
            $("#inValidFile").html(imageFieldMsg);
            hasError = true;
        }
    }

    //Validate caption field for max number of characters
    var CaptionFieldValue = document.getElementById('caption').value;
    var CaptionCode;
    var CaptionMsg;

    if (CaptionFieldValue != '') {
        CaptionCode = ValidateForMaxLength(CaptionFieldValue, 0, 100);
        if (CaptionCode != 19999) {
            CaptionMsg = GetMessage(CaptionCode);
            $("#inValidCaption").show();
            $("#inValidCaption").html(CaptionMsg);
            hasError = true;
        }
    }

    //Validate Name field
    var NameFieldValue = document.getElementById('yourname').value;
    var NameCode;
    var NameMsg;

    NameCode = ValidateIfFieldEmpty(NameFieldValue);
    if (NameCode != 19999) {
        NameMsg = GetMessage(19823);
        $("#inValidname").show();
        $("#inValidname").html(NameMsg);
        hasError = true;
    }
    else {
        NameCode = ValidateName(NameFieldValue);
        if (NameCode != 19999) {
            NameMsg = GetMessage(NameCode);
            $("#inValidname").show();
            $("#inValidname").html(NameMsg);
            hasError = true;
        }
        else {
        }
    }


    //ValidateCheckBox
    var CheckCode;
    var CheckMsg;

    CheckCode = ValidateCheckBoxOrRadioButton('check');
    if (CheckCode != 19999) {
        CheckMsg = GetMessage(CheckCode);
        $("#inValidcheck").show();
        $("#inValidcheck").html(CheckMsg);
        hasError = true;
    }
    else {
    }
    if (hasError == true) {
        return false;
    }
    else {
        return true;
    }
}
 
function ValidateRequestPasswordFormInput() {
    var hasError = false;
    $(".pop-up-error").hide();
    $(".green-info").hide();
    
    //Validate email field
    var emailFieldValue = document.getElementById('email').value;
    var emailFieldCode;
    var emailFieldMsg;

    emailFieldCode = ValidateIfFieldEmpty(emailFieldValue);
    if (emailFieldCode != 19999) {
        emailFieldMsg = GetMessage(20003);
        $("#email-empty").show();
        $("#email-empty").html(emailFieldMsg);
        hasError = true;
    }
    else {
        emailFieldCode = ValidateEmail(emailFieldValue);
        if (emailFieldCode != 19999) {
            emailFieldMsg = GetMessage(emailFieldCode);
            $("#email-invalid").show();
            $("#email-invalid").html(emailFieldMsg);
            hasError = true;
        }

    }

    if (hasError == true) {
        return false;
    }
    else {
        return true;
    }

}
    var isFirstLoad = true;
    function ThomasRequestPassword() {
        if (ValidateRequestPasswordFormInput()) {
            $("#ThomasfrmUpload").submit();
        }
        else {
            return false;
        }
    }
    function ThomasLoginRegister() {
        if (ValidateLoginRegisterFormInput()) {
            $("#ThomasfrmUpload").submit();
        }
        else {
            return false;
        }
    }
    function ThomasEmailCheckList() {
        if (ValidateEmailCheckListFormInput()) {
            $("#ThomasfrmUpload").submit();
        }
        else {
            return false;
        }
    }

    function ThomasUploadPhoto() {
        if (ValidateThomasUploadPhotoFormInput()) {
            $("#ThomasfrmUpload").submit();
            return false;
        }
        else {
            return false;
        }
    }
    function ThomasUploadPhoto() {
        if (ValidateThomasForwardPhotoFormInput()) {
            $("#ThomasfrmUpload").submit();
            return false;
        }
        else {
            return false;
        }
    }
    function ThomasForwardPhoto() {
        if (ValidateThomasForwardPhotoFormInput()) {
            $("#ThomasfrmUpload").submit();
            return false;
        }
        else {
            return false;
        }
    }
    
    function Thomas_UploadImage_Complete() {

        var emailNotExist;
        var passwordSent;
        var emailSent;
        var invalidUser;
        var userExists;
        var loadingData;
        //Check to see if this is the first load of the iFrame     
        if (isFirstLoad == true) {
            isFirstLoad = false;
            return;
        }
        //Reset the image form so the file won't get uploaded again     
        //document.getElementById("ImgForm").reset();
        //Grab the content of the textarea we named jsonResult .  This shold be loaded into      
        //the hidden iFrame.     
        var Registration = $.parseJSON($("#ThomasUploadTarget").contents().find("#jsonResult")[0].innerHTML);
        //If there was an error, display it to the user
        if (Registration.IsValid == false) {
            if (Registration.Message == "notexist") {
                emailNotExist = GetMessage(20030);
                $("#email-notexist").show();
                $("#email-notexist").html(emailNotExist);
            }
            if (Registration.Message == "InvalidUser") {
                invalidUser = GetMessage(20031);
                $("#failed-login").show();
                $("#failed-login").html(invalidUser);
               
            }
            if (Registration.Message == "UserExists") {
                userExists = GetMessage(20031);
                $("#failed-login").show();
                $("#failed-login").html(userExists);
            }
            return;
        }
        if (Registration.IsValid == true) {
            if (Registration.RedirectUrl != "") {
                loadingData = GetMessage(20040);
                $(".green-info").show();
                $(".green-info").html(loadingData);
                window.location = Registration.RedirectUrl;
            }
            else {
                if (Registration.Message == "passwordsent") {
                    passwordSent = GetMessage(20029);
                    $(".green-info").show();
                    $(".green-info").html(passwordSent);

                }
                if (Registration.Message == "Email sent.") {
                    emailSent = GetMessage(20039);
                    $(".green-info").show();
                    $(".green-info").html(emailSent);
                }             
            }            
        }
    }

    $('a.checkLogout').live('click', function (event) {

        ajaxURL = localInfo + "/CheckList/LogOut";
        $.ajax({
            type: 'POST',
            cache: 'false',
            url: ajaxURL,
            success: function (data) {
                window.location.reload();
            },
            error: function (data) {

            }
        });
    });

    //Print Checklist link in My Thomas & Friends Checklist
    $('a.print-checklist').live('click', function (event) {

        //Remove anchor tag href attribute for print
        $('.brand-site-thomas .productHolder a').removeAttr("href");

        window.print();
    });

    $('.out-of').html($('.out-of-text').html());
    $('.votes-voted').html($('.votes-text').html());
    $('.view-all-text').html($('.prod-view-all').html());
    $('.items-per-page').html($('.prod-items-perpage').html());
    function GetMessage(errCode) {

        if (errCode == '19801')
            return 'Please enter a valid Email Address';

        if (errCode == '19802')
            return 'Please enter a valid Name';

        if (errCode == '19803')
            return 'Please enter a valid User Name';

        if (errCode == '19804')
            return 'Please enter a valid text';

        if (errCode == '19805')
            return 'Please enter a valid number';

        if (errCode == '19806')
            return 'The Password must be 6-20 characters long';

        if (errCode == '19807')
            return 'The selected file format is not supported';

        if (errCode == '19808')
            return 'Please agree to the Terms and conditions';

        if (errCode == '19809')
            return 'Field cannot be empty';

        if (errCode == '19810')
            return 'At least one Email Address is mandatory';

        if (errCode == '19811')
            return 'Caption should not exceed 20 words';

        if (errCode == '19812')
            return 'The Email Addresses do not match';

        if (errCode == '19813')
            return 'The Passwords do not match';

        if (errCode == '19820')
            return 'Please choose a file';

        if (errCode == '19821')
            return 'File size should be less than 5MB';

        if (errCode == '19822')
            return 'Please upload an image file';

        if (errCode == '19823')
            return 'Please enter your name';

        if (errCode == '20000')
            return 'Please provide information about at least one child';

        if (errCode == '20001')
            return 'There were errors processing your information. Please check all required fields and try to submit again. We apologize for any inconvenience.';

        if (errCode == '20002')
            return 'Please accept the Terms and Conditions';

        if (errCode == '20003')
            return 'Please enter your Email Address';

        if (errCode == '20004')
            return 'The Confirm Email Address is required';

        if (errCode == '20005')
            return 'The Password field is required';

        if (errCode == '20006')
            return 'The Confirm Password is required';

        if (errCode == '20007')
            return 'The First Name is required';

        if (errCode == '20008')
            return 'The Last Name is required';

        if (errCode == '20009')
            return 'The Address is required';

        if (errCode == '20010')
            return 'The City is required';

        if (errCode == '20011')
            return 'The State is required';

        if (errCode == '20012')
            return 'The Zip Code is required';

        if (errCode == '20013')
            return 'Description should not exceed 20 words';

        if (errCode == '20014')
            return 'Please enter your review';

        if (errCode == '20015')
            return 'Please enter your play tip';

        if (errCode == '20016')
            return 'Please enter your name and relationship to child';

        if (errCode == '20017')
            return 'Please enter a valid name and relationship';

        if (errCode == '20018')
            return 'Please enter valid age';

        if (errCode == '20019')
            return 'Email Address not provided for the Name';

        if (errCode == '20020')
            return 'Content should not exceed 150 words';

        if (errCode == '20021')
            return 'The specified Zip Code is invalid';

        if (errCode == '20022')
            return 'The Password should be at least 6 characters';

        if (errCode == '20023')
            return 'Please provide at least one Email Address and Name';

        if (errCode == '20024')
            return 'Name not provided for the Email Address';

        if (errCode == '20025')
            return 'Please enter a valid First Name';

        if (errCode == '20026')
            return 'Please enter a valid Last Name';

        if (errCode == '20027')
            return 'Please enter all mandatory data for child';

        if (errCode == '20028')
            return 'Please select at least one Enrollment';

        if (errCode == '20029')
            return 'Your password has been sent.';

        if (errCode == '20030')
            return 'Your e-mail address is not in our records. Please check your e-mail address and resubmit any corrections.';

        if (errCode == '20031')
            return 'Username and password do not match';

        if (errCode == '20032')
            return 'The username you have selected already exists in our records.';

        if (errCode == '20034')
            return "Please enter recipient's email address";

        if (errCode == '20035')
            return 'Please enter a valid recipient email address';

        if (errCode == '20036')
            return 'Please enter your valid email address';

        if (errCode == '20037')
            return "Please enter recpient's first name";

        if (errCode == '20038')
            return "Please enter your first name";

        if (errCode == '20039')
            return "Your email has been sent.";
        if (errCode == '20040')
            return "Login success! loading data, please wait.";
        if (errCode == '20041')
            return "Your photo has been sent.";
        if (errCode == '20042')
            return "Please enter recipient's valid email address";

    }


    var msg_EmptyEmail = "Please enter Email Address";
    var msg_ValidEmail = "Please enter a valid Email Address";
    var msg_EqualValue = "The fields do not match";
    var msg_EmptyPwd = "Please enter a password";
    var msg_PwdLength = "Password should be at least 6 characters long";
    var msg_EmptyCPwd = "The passwords do not match";
    var msg_EqualPwd = "The passwords do not match";
    var msg_FName = " Please mention your First Name";
    var msg_LName = " Please mention your Last Name";
    var msg_ValidName = "The name contains invalid characters";
    var msg_Address = "Please enter Address";
    var msg_City = "Please enter City ";
    var msg_State = "Please select a State";
    var msg_EmptyState = "Please enter a State";
    var msg_EmptyFilePath = "Please select a file";
    var msg_BigFile = "Please select the file less than 5 MB";
    var msg_EmptyChkBox = "Please check the checkbox";
    var msg_Emptychild = "Please provide child details";
    var msg_UserThoughts = "Please enter your thoughts";
    var msg_NameRelation = "Please provide your name and relationship with child";




    // NOTE: Before you use/assign an error code, please check the messages.js file to see if that code is already used.
    //       Some error code numbers which havent been used here are used for custom messages.


    // validateFormInput.js code start
    function ValidateEmail(input) {
        //debugger; 
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(input) == false) {
            //return the error code for invalid email
            return 19801;
        }
        return 19999;
    }

    function ValidateName(input) {
        //debugger;

        var reg =  /^[A-Za-z ]{2,20}$/; // 2 is the min length, 20 is the max length, includes white space

        if (localInfo.toLowerCase() != 'en_us') {
            reg = /^((?![0-9\~\!\@\#\$\%\^\&\*\(\)\_\+\=\-\[\]\{\}\;\:\"\\\/\<\>\?]{2,20}).)+$/;
        }
        
        if (reg.test(input) == false) {

            //return the error code for invalid Name
            return 19802;
        }

        return 19999;

    }

    function ValidateUserId(input) {
        //debugger;

        var reg = /^[A-Za-z0-9 ]{3,20}$/; // 3 is the min length, 20 is the max length, includes white space
        if (reg.test(input) == false) {

            //return the error code for invalid User Id
            return 19803;
        }

        return 19999;

    }

    function ValidateForAlphabet(input) {
        //debugger;

        var reg = /^[A-Za-z]$/;
        if (reg.test(input) == false) {

            //return the error code for invalid Alphabet
            return 19804;
        }

        return 19999;

    }

    function ValidateForMaxLength(input, minLength, maxLength) {
        //debugger;

        var lenOfInput = input.length;
        if (!(lenOfInput >= minLength && lenOfInput <= maxLength)) {

            //return the error code for Incorrect text length
            return 19811;
        }
        return 19999;
    }

    function ValidateInteger(input) {
        //debugger;

        var reg = /^[0-9]*$/;
        if (reg.test(input) == false) {

            //return the error code for invalid Integer
            return 19805;
        }

        return 19999;

    }


    function ValidatePassword(input) {
        //debugger;

        var reg = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/; // 6 is the min length, 20 is the max length
        if (reg.test(input) == false) {

            //return the error code for invalid Password
            return 19806;
        }

        return 19999;

    }


    function ValidateCheckBoxOrRadioButton(checkBoxOrRadionButtonName) {
        cboxArray = document.getElementsByName(checkBoxOrRadionButtonName);
        counterFlag = 0;

        for (i = 0; i < cboxArray.length; i++) {
            if (cboxArray[i].checked)
            { counterFlag = 1; }
        }
        if (counterFlag) {
            return 19999;
        }
        return 19808;
    }

    function ValidateIfFieldEmpty(input) {
        //debugger;

        var reg = /^[\s\t\r\n]*\S+/;
        if (reg.test(input) == false) {

            //return the error code for invalid image file format
            return 19809;
        }

        return 19999;

    }


    function ValidateForImageSize(fileDetail, MaxSize) {
        var maxMemorySize = (MaxSize * 1024 * 1024);
        if (fileDetail.value == '') {
            return 19820;
        }
        else {
            return 19999;
        }
        //    else {
        //        var img = new Image();
        //        img.src = fileDetail.value;
        //        var memorySize = img.fileSize;
        //        alert(memorySize);
        //        //var memorySize = fileDetail.files[0].size;
        //        if (memorySize > maxMemorySize) {
        //            return 19821;
        //        }
        //        else {
        //            return 19999;
        //        }
        //    }
    }

    function ValidateForImageExtension(input) {
        var ext = input.substring(input.lastIndexOf('.') + 1);
        if (ext == "gif" || ext == "GIF" || ext == "JPEG" || ext == "jpeg" || ext == "jpg" || ext == "JPG" || ext == "png" || ext == "PNG") {
            return 19999;
        }
        else {
            return 19822;
        }
    }

    //This accepts comma also.
    function ValidateForNameRelationship(input) {
        var reg = /^[A-Za-z ,]{3,20}$/; // 3 is the min length, 20 is the max length, includes white space
        if (reg.test(input) == false) {

            //return the error code for invalid Name
            return 19802;
        }

        return 19999;
    }

    //function ValidateZipCode(input) {
        //debugger;

       // var reg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        //if (reg.test(input) == false) {

            //return the error code for invalid Integer
           // return 20021;
        //}

       // return 19999;
    // }
    $("#LaunchMusic").live('click', function (event) {
        event.preventDefault();
        var popupurl = $(this).attr("rel");

        //Make the AJAX call to fetch the data & then call overlay to display popup
        $.ajax({
            url: popupurl,
            success: function (data) {
                $('.webisodeComponentOverlay').html(data);
                $('.webisodeComponentOverlay').jOverlay({ center: false, color: '#8c8c8c', opacity: 0.9, zindex: '9999', css: { position: 'absolute', top: '20%', left: '20%' }, bgClickToClose: false });
                $(document).scrollTop(0);
            }
        });

        //Call this function to load jquery.zclip.js, main.js and unbinding the click event
        shareEmbedEmail("#Launch-Webisode");
    });

	// Call this in the Ajax success callback function to initialize addthis in lightbox
    function ReinitializeAddThis() {
       	
       	var script_url = 'http://s7.addthis.com/js/250/addthis_widget.js#domready=1';
       	if (window.addthis) {
			window.addthis = null;
			window._adr = null;
			window._atc = null;
			window._atd = null;
			window._ate = null;
			window._atr = null;
			window._atw = null;
		}
		$("#at20mc").remove();
		$.getScript(script_url, function () {
			addthis.init();
		});
	 }

  