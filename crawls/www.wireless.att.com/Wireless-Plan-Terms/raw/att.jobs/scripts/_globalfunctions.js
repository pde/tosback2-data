    /* Add common JS functions here */

$(document).ready(function () {
    //Settign focus on the first enabled text box
    //$("input[type='text']:enabled:first").focus();

    var isiPad = navigator.userAgent.match(/iPad/i) != null;

    if (isiPad) {


    }


    //For keybord access	
    $("#primarynav > li > a").focus(function () {

        $('.snav').css("left", "-5999px");
        $('#primarynav h2').hide();
        $(this).parent().find("ul").css("left", "auto");
        $(this).parent().find("h2").show();

    });

    //For keybord access	
    $("#skip-to-content").focus(function () {
        $(this).removeClass("wai");
        //alert("a");
    }).focusout(function (){
        $(this).addClass("wai");
    });




    if ($.browser.msie && $.browser.version == "6.0") {
        $('#default #article').append('<a href="http://www.browserupgrade.info/ie6/" target="_blank"><img src="/images/old-vers-browser-msg.gif" width="528" height="38" alt="You do not have access to the full version of our site due to using an older browser. Please upgrade your browser by clicking here." /></a>');
    }

    //Initialize Linked in Popup

    if ($('#linkedin-att').length > 0) {
        try {
            new LinkedIn.CompanyInsiderPopup("linkedin-att", "at&t");
        }
        catch (err) {
            //Handle errors here
        }
    }



    //Testimonials
    $("#wraper-testimonials a").hover(
          function () {

              var position = $("#" + this.id).position();
              $("#tooltip").css("left", (position.left - 30) + "px");
              $("#tooltip").css("top", (position.top - 51) + "px");
              var AltText = $("#" + this.id + " img").attr("alt");

              var titleAlign = "one-line";
              if (AltText.length > 17)
                  titleAlign = "two-line";
              //alert(titleAlign);
              $("#tooltip").html($("<p class=" + titleAlign + ">" + AltText + "</p>"));
              $("#tooltip").show();
          },
          function () {
              $("#tooltip").hide();
          }
    );


    $('.external').click(function (e) {
        e.preventDefault();
        window.open($(this).attr("href"));
    });

    /*Home page */
    $('#btn-slide, #btn-slideclose').click(function (e) {
        $('#slider').css("z-index", "999999");
        if ($("#sd-facebook").html().length == 0) {
            _gaq.push(['_trackEvent', 'SOCIAL_ICON', "FaceBook", '']);

            $("#sd-facebook").html('<iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FATTCareers&amp;width=421&amp;height=480&amp;colorscheme=light&amp;show_faces=true&amp;border_color&amp;stream=true&amp;header=true&amp;appId=234912696553094" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:421px; height:480px;" allowTransparency="true"></iframe>');
        }

        var sRight = -500;
        if ($("#slider").css("right") == "-500px")
            sRight = 0;
        e.preventDefault();
        $("#slider").animate({
            right: sRight
        }, 500, 'easeInQuart', function () { });

    });


    //Lightbox setup

    $("#various1").fancybox({
        'titlePosition': 'inside',
        'transitionIn': 'none',
        'transitionOut': 'none'
    });

    $(".modal-iframe").fancybox({
        'width': 438,
        'height': 363,
        'overlayOpacity': 0.7,
        'overlayColor': '#000',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $(".modal-iframe-video").fancybox({
        'width': 438,
        'height': 463,
        'overlayOpacity': 0.7,
        'overlayColor': '#000',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $(".modal-iframe-testimonials").fancybox({
        'width': 441,
        'height': 371,
        'overlayOpacity': 0.7,
        'overlayColor': '#000',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'overflow': 'hidden',
        'type': 'iframe'
    });

    $(".modal-iframe-big").fancybox({
        'width': 680,
        'height': 480,
        'overlayOpacity': 0.7,
        'overlayColor': '#000',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $(".modal-iframe-full").fancybox({
        'width': 880,
        'height': 690,
        'overlayOpacity': 0.7,
        'overlayColor': '#000',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });



    $(".modal-iframe-admin").fancybox({
        'width': 750,
        'height': 700,
        'overlayOpacity': 0.7,
        'overlayColor': '#000',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $(".modal-iframe-skill").fancybox({
        'width': 740,
        'height': 510,
        'overlayOpacity': 0.7,
        'overlayColor': '#000',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });



    $(".modal-iframe-admin-small").fancybox({
        'width': 750,
        'height': 300,
        'overlayOpacity': 0.7,
        'overlayColor': '#000',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $(".modal-swf").fancybox({
        'padding': 0,
        'overlayOpacity': 0.7,
        'overlayColor': '#000',
        'width': 786,
        'height': 545,
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none'
    });

    //Accordian Setup
    if ($('#military').length > 0) {

        $(".accordion").accordion({ autoHeight: false, active: 0 });
    }
    else if ($('#careercenter-default').length > 0) {
        $(".accordion").accordion({ autoHeight: false, active: 2 });
    }
    else
        $(".accordion").accordion({ autoHeight: false, active: 0 });

    //SearchJobs
    $('#ctl00_ctl07_btnSearchJobGo').click(function (e) {

        var SearchATS = "http://www.connect.att.jobs/search/";
        var CurrentATS = $('#pnav-jobsearch').attr("href");
        if (CurrentATS.indexOf("connect.att.jobs") != -1)
            SearchATS = CurrentATS + "?lang=en&keyword=";
        //alert(SearchATS);
        e.preventDefault(); //Prevent non-javascript action
        var SEOSearchURL = SearchATS + $('#ctl00_ctl07_txtSearchJobKeyword').val();
        openPopup(SEOSearchURL);
    });

    //LocalSearch Go

    $('#ctl00_ctl08_btnSearchJobGo').click(function (e) {

        var SearchATS = "http://www.connect.att.jobs/search/";
        var CurrentATS = $('#pnav-jobsearch').attr("href");
        if (CurrentATS.indexOf("connect.att.jobs") != -1)
            SearchATS = CurrentATS + "?lang=en&keyword=";
        //alert(SearchATS);
        e.preventDefault(); //Prevent non-javascript action
        var SEOSearchURL = SearchATS + $('#ctl00_ctl08_txtSearchJobZip').val();
        openPopup(SEOSearchURL);
    });


    $(".ddl-position-int ul").addClass("left");

    $(".ddl-position-int").click(function (e) {

        $(".ddl-position-int ul").removeClass("left");
        $(".ddl-position-int ul").addClass("position-menu");
        $(".ddl-position").append("<span class='interest-close'>X</span>");
        $(".interest-close").click(function (e) {

            $(".ddl-position-int ul").addClass("left");
            $(".ddl-position-int ul").removeClass("position-menu");
            $(".interest-close").hide();
        });
    });


    /* GA Event Tracking */
    $(".btn-go").click(function (e) {
        var vKeyWord = $("#ctl00_txtSearchWebsite").val();
        _gaq.push(['_trackEvent', 'SITE-SEARCH-KEYWORDS', vKeyWord, '']);
        //alert("added");
    });

    $("#careerarea li").click(function (e) {
        vCA = this.id;
        _gaq.push(['_trackEvent', 'CAREER-AREA-ICON', vCA, '']);
    });

    $("#careerarea-big li").click(function (e) {
        vCA = this.id;
        _gaq.push(['_trackEvent', 'CAREER-AREA-ICON-BIG', vCA, '']);
        //alert(vCA);
    });

    /*Sub Navigation Menu Expand-Collapse*/

    $('.secondarynav h3').click(function (i) {
        var bgImage = $(this).css("backgroundImage");

        var parentElement = $(this).parent().attr("id");

        if (bgImage.indexOf("-on") == -1) {
            var newBG = "url(/images/ico-secondarynav-arrow-on.gif)";
            $(this).css("backgroundImage", newBG);
            $("#" + parentElement + " ul").animate({
                opacity: 1,
                left: '+=50',
                height: 'toggle'
            }, 500, function () {
                // Animation complete.
            }); ;
        }
        else {
            var newBG = "url(/images/ico-secondarynav-arrow-off.gif)";
            $(this).css("backgroundImage", newBG);
            $("#" + parentElement + " ul").animate({
                opacity: 0.25,
                left: '+=50',
                height: 'toggle'
            }, 500, function () {
                // Animation complete.
            });
        }



    });


    /* Animations */
    $("#article-bg").animate({ opacity: 1.0 }, 2000);
    //$("h1").animate({ opacity: 1.0 }, 1500);

    //$(".career-area-fade").animate({ opacity: 1.0 }, 500);

    /* Social Slider Icons */

    $("#ico-selected").css("left", 56);

    $("#sd-facebook").show();

    $("#social-icons li a").click(function (e) {

        $("#social-icons li a").removeClass("active");
        $(".sframe").hide();
        e.preventDefault(); //Prevent non-javascript action
        var selID = this.id;
        $("#" + selID).addClass("active");
        selID = selID.replace("si", "sd");
        if (selID == "sd-twitter") {
            _gaq.push(['_trackEvent', 'SOCIAL_ICON', "Twitter", '']);
            $("#sd-twitter").html('<iframe frameborder="0" src="/widget/twitter.aspx" id="frm-twitter"></iframe>');
        }
        else if (selID == "sd-linkedin") {
            _gaq.push(['_trackEvent', 'SOCIAL_ICON', "Linkedin", '']);
            //$("#sd-linkedin").html('<iframe frameborder="0" src="http://www.linkedin.com/companies/at%26t?" id="frm-linkedin"></iframe>');
        }
        else if (selID == "sd-youtube") {
            _gaq.push(['_trackEvent', 'SOCIAL_ICON', "YouTube", '']);
            //$("#sd-youtube").html('<iframe frameborder="0" src="http://feedaggregator.att.centralcast.net/youtubedisplay.aspx?feedid=2&amp;count=10&amp;feedListName=none " id="frm-youtube"></iframe>');
        }
        else if (selID == "sd-facebook") {
            _gaq.push(['_trackEvent', 'SOCIAL_ICON', "FaceBook", '']);
            $("#sd-facebook").html('<iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FATTCareers&amp;width=421&amp;height=480&amp;colorscheme=light&amp;show_faces=true&amp;border_color&amp;stream=true&amp;header=true&amp;appId=234912696553094" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:421px; height:480px;" allowTransparency="true"></iframe>');
        }

        else if (selID == "sd-jobipedia") {
            _gaq.push(['_trackEvent', 'SOCIAL_ICON', "Jobipedia", '']);

            $("#sd-jobipedia").html('<iframe src="http://www.jobipedia.org/social/att-social.aspx" style="height:480px;width:440px;" title="JOBipedia" scrolling="yes" frameborder="0" id="frm-jobipedia" ></iframe>');
        }

        $("#" + selID).show();
    });

    //Special treatment for IPAD
    if ($("body#videos").length) {


        if (isiPad) {
            $('.ddl-select-category').click(function () {
                $(this).find("ul").css("left", 0);
            });

            $('.ddl-select-category li a').click(function () {

                $(this).parent().parent().css("left", -999);
            });
        }
    }



    var timeoutPlayVideo = null;
    //Video
    $("#videos .level1 a").hover(function () {

        $(this).css({ 'z-index': '11' }); /*Add a higher z-index value so this image stays on top*/
        //$(this).animate({ opacity: 1.0 }, 300);

        var CrrentTitle = $(this).find("img").attr("title");
        //alert(CrrentTitle);

        $(".video-tooltip").empty().append(CrrentTitle);

        //Get current position
        var posX = $(this).position().left;
        var posY = $(this).position().top;
        $(".video-tooltip").css("left", posX);
        $(".video-tooltip").css("top", posY - 48);
        $(".video-tooltip").fadeIn(200);

        ActiveVideoThump = $(this).attr("id");
        //alert(isiPad);



        if (isiPad) {

            clearTimeout(timeoutPlayVideo);
            timeoutPlayVideo = setTimeout("playVideo('" + $(this).attr("id") + "')", 3000);
        }


        $(this).addClass("hover").stop() /* Add class of "hover", then stop animation queue buildup*/
		.animate({
		    marginTop: '-15px', /* The next 4 lines will vertically align this image */
		    marginLeft: '-15px',
		    width: '144px', /* Set new width */
		    height: '100px', /* Set new height */
		    padding: '0px'
		}, 200); /* this value of "200" is the speed of how fast/slow this hover animates */

    }, function () {
        $(this).css({ 'z-index': '10' }); /* Set z-index back to 0 */
        $(this).removeClass("hover").stop()  /* Remove the "hover" class , then stop animation queue buildup*/
		.animate({
		    marginTop: '0', /* Set alignment back to default */
		    marginLeft: '0',
		    width: '124px', /* Set width back to default */
		    height: '80px', /* Set height back to default */
		    padding: '0px'
		}, 400);
        $(".video-tooltip").hide();
    });

});

var ActiveVideoThump = "";



/* Talent Network */
function backButton() {
    document.forms[0].reset();
    $('#contact_form').css('display', 'block');
    $('#phonethankyou').css('display', 'none');

}

function openPopup(vURL) {
    
    window.open(vURL, "popup");
}

function changeParentUrl(url) {
    parent.document.location = url;
}

function openPopup(vURL, vWidth, vHeight) {
    window.open(vURL, "popup", "menubar=1,resizable=1,top=120,width=" + vWidth + ",height=" + vHeight + ",scrollbars=yes");
}

function openPopup(vURL, vWidth, vHeight, vLeft, vTop) {
    window.open(vURL, "popup", "menubar=1,resizable=1,left=" + vLeft + ",top=" + vTop + ",width=" + vWidth + ",height=" + vHeight + ",scrollbars=yes");
}


$.extend({
getUrlVars: function(vURL) {
        var vars = [], hash;
        var hashes = vURL.slice(vURL.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(vName,vURL) {
    return $.getUrlVars(vURL)[vName];
    }
});


function createFlash(vWidth, vHeight, vSWF) {
    //   alert(vSWF);
    var flashvars = false;
    var params = {
        codebase: "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0'",
        quality: "high",
        menu: "false",
        align: "middle",
        scale: "noScale",
        wmode: "opaque",
        bgcolor: "#ffffff",
        flashvars: ""
    };
    var attributes = {};
    swfobject.embedSWF(vSWF, "flashcontent", vWidth, vHeight, "8", "/flash/app_expressinstall.swf", flashvars, params, attributes);
}

function createFlashVideo(vWidth, vHeight, vFLV, vImage) {

    var flashvars = false;
    var params = {
        codebase: "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0'",
        quality: "high",
        menu: "false",
        align: "middle",
        wmode: "opaque",
        scale: "noScale",
        bgcolor: "#EBBE0D",
        salign: "TL",
        flashvars: "videoURL=/media/" + vFLV + "&autoPlay=false&startPhotoSource=/images/video/" + vImage + "&hideControls=false&backgroundColor1=0x333333&backgroundColor2=0x222222"
    };
    var attributes = {};
    swfobject.embedSWF("/flash/Player.swf", "flashcontent", vWidth, vHeight, "8", "media/app_expressinstall.swf", flashvars, params, attributes);
}

function createFlashSWFmtvU(vWidth, vHeight, vSWF) {
    var flashvars = false;
    var params = {
        codebase: "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0'",
        quality: "high",
        menu: "false",
        align: "left",
        wmode: "transparent",
        bgcolor: "transparent",
        flashvars: "CONFIG_URL=http://www.mtvu.com/player/embed/configuration.jhtml%3fid%3D1572002%26vid%3D181946"
    };
    var attributes = {};
    swfobject.embedSWF(vSWF, "flashcontent", vWidth, vHeight, "8", "media/app_expressinstall.swf", flashvars, params, attributes);
}



function createFlashCA(vWidth, vHeight, vSWF, vProfile) {
    //   alert(vSWF);
    var flashvars = { imagepath: vProfile };
    var params = {
        codebase: "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0'",
        quality: "high",
        menu: "false",
        align: "middle",
        scale: "noScale",
        wmode: "opaque",
        bgcolor: "#ffffff",
        base: "."
    };
    var attributes = {};
    swfobject.embedSWF(vSWF, "flashcontent", vWidth, vHeight, "9", "/flash/app_expressinstall.swf", flashvars, params, attributes);
}

function clickButton(e, buttonid) {
    var evt = e ? e : window.event;
    var bt = document.getElementById(buttonid);
    if (bt) {
        if (evt.keyCode == 13) {
            bt.click();
            return false;
        }
    }
}



function openPopup(vURL, vWidth, vHeight) {
    window.open(vURL, "popup", "menubar=1,resizable=1,top=120,width=" + vWidth + ",height=" + vHeight + ",scrollbars=yes");
}

function openPopup(vURL, vWidth, vHeight, vLeft, vTop) {
    window.open(vURL, "popup", "menubar=1,resizable=1,left=" + vLeft + ",top=" + vTop + ",width=" + vWidth + ",height=" + vHeight + ",scrollbars=yes");
}


$.extend({
    getUrlVars: function(vURL) {
        var vars = [], hash;
        var hashes = vURL.slice(vURL.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(vName, vURL) {
        return $.getUrlVars(vURL)[vName];
    }
});


// Military Read Maore
function switchMenu(obj,obj2) {
	var el = document.getElementById(obj);
	var rm = document.getElementById(obj2);
	if ( el.style.display != "none" ) {
		el.style.display = 'none';
		rm.style.display = '';
	}
	else {
		el.style.display = '';
		rm.style.display = 'none';
	}
}


// Resources for Career Centers page funtion for change class of inputs

function changeClass(val){
    if(val == 1)
    {
        document.getElementById("ctl00_CphContent_tbxemailTo").setAttribute("class", "form-input-dark toemail");
    }
    else if(val == 2)
    {
        document.getElementById("ctl00_CphContent_tbxemailFrom").setAttribute("class", "form-input-dark");
    }
    
   else if(val == 3)
    {
        document.getElementById("ctl00_CphContent_tbxPersonalMsg").setAttribute("class", "form-textarea-dark");
    }
}


function reverseclass(val){
    if(val == 1)
    {
        document.getElementById("ctl00_CphContent_tbxemailTo").setAttribute("class", "form-input1 toemail");
    }
    else if(val == 2)
    {
        document.getElementById("ctl00_CphContent_tbxemailFrom").setAttribute("class", "form-input1");
    }
    
   else if(val == 3)
    {
        document.getElementById("ctl00_CphContent_tbxPersonalMsg").setAttribute("class", "form-textarea");
    }
}





// You tube social widget

 $(document).ready(function () {

     var playListURL = 'https://gdata.youtube.com/feeds/api/playlists/PL7FEF61DA1F5293A0?v=2&alt=json&callback=?';
				var videoURL= 'https://www.youtube.com/watch?v=';
				$.getJSON(playListURL, function(data) {
				var list_data="";
				$.each(data.feed.entry, function(i, item) {
					var feedTitle = item.title.$t;
					var feedURL = item.link[1].href;
					var fragments = feedURL.split("/");
					var videoID = fragments[fragments.length - 2];
					var url = videoURL + videoID;
					var thumb = "https://img.youtube.com/vi/"+ videoID +"/default.jpg";
					list_data += '<li><a id="'+videoID+'" href="'+ url +'" title="'+ feedTitle +'"><img alt="'+ feedTitle+'" src="'+ thumb +'" </img></a><br/>'+ feedTitle+'</li>';
					if(i==0)
					{
						//load the 1st video
						loadPlayer(videoID);
					}
				});
				$('#playlist').html(list_data);
				$('#playlist a').click(function(e)
				{
					//var VID = $(this).attr("id");
//					e.preventDefault();
//					loadVideo(VID);
					this.target = "_blank";
				});
			
				$('#playlist').jcarousel();
			});
			
				
			});
			
			
			
			/*
				   * Change out the video that is playing
				   */
				  
				  // Update a particular HTML element with a new value
				  function updateHTML(elmId, value) {
					document.getElementById(elmId).innerHTML = value;
				  }
				  
				  // Loads the selected video into the player.
				  function loadVideo(videoID) {
					 
					if(ytplayer) {
					  ytplayer.loadVideoById(videoID);
					}
				  }
				  
				  // This function is called when an error is thrown by the player
				  function onPlayerError(errorCode) {
					alert("An error occured of type:" + errorCode);
				  }
				  
				  // This function is automatically called by the player once it loads
				  function onYouTubePlayerReady(playerId) {
					ytplayer = document.getElementById("ytPlayer");
					ytplayer.addEventListener("onError", "onPlayerError");
				  }
				  
				  // The "main method" of this sample. Called when someone clicks "Run".
				  function loadPlayer(videoID) {
					// The video to load
				  
					// Lets Flash from another domain call JavaScript
					var params = { allowScriptAccess: "always" };
					// The element id of the Flash embed
					var atts = { id: "ytPlayer" };
					// All of the magic handled by SWFObject (https://code.google.com/p/swfobject/)
					swfobject.embedSWF("https://www.youtube.com/v/" + videoID +
									   "&enablejsapi=1&showinfo=0;playerapiid=ytplayer&version=3",
									   "player", "365", "220", "8", null, null, params, atts);
				  }
			
				  var addthis_config = {
					  services_compact: "bitly, blogger, digg, facebook, linkedin, myspace, twitter",
				 ui_click: "false"
			}