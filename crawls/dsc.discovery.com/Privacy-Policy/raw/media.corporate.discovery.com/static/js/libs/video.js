/*
HTML 5 video with swf fallback
Version 3
March 15, 2012
by Gregory Johnson
HTML5 support in Chrome, Safari, iPhone, iPad
Flash support in Firefox, Internet Explorer, Opera

*/

$(document).ready(function(){
    var vidNum = 0,
		vidOverlay,
		vidWrapper,
        ua = navigator.userAgent,
        hasHTML5 = true,
        appleMobile = false;
    if (ua.indexOf("Firefox") >= 0 || ua.indexOf("Opera") >= 0 || ua.indexOf("MSIE") >= 0){
        hasHTML5 = false;
    }
    if (ua.indexOf("iPad") >= 0 || ua.indexOf("iPhone") >= 0){
        appleMobile = true;
    }
    vidInit = function(vidObj){
        vidNum++;
        // DETECT FIREFOX, OPERA AND USE FLASH FALLBACK FOR VIDEO
        var divID = "#"+vidObj.divID;
        $(divID).addClass('vid-container')
        if (hasHTML5 == false){
            // insert flash video before 
            initFlashVideo();
        };
        // SET VIDEO DISPLAY FUNCTIONALITY
        if (hasHTML5){
            // insert video tag into target div
            var videoHTML = '<video width="'+vidObj.width+'" height="'+vidObj.height+'" controls="controls" poster="'+vidObj.startPhotoSource+'"><source src="'+vidObj.videoURL+'" type="video/mp4" /></video>';
            $(divID).html(videoHTML);
            playVid();
        }
        $(divID+' video').mouseup(function(e){
            currentVideo = $(this);
        })
        $(divID+' span').on("click", function(e){
            if (!appleMobile){
                playVid();
            }else{
                $(divID+" span").hide();
            }
        })
        function playVid(){
            // animations to activate video
            var htmlVid = $(divID+' span').parent().find('video');
            $(divID+' span').hide();
            htmlVid.show();
            if (hasHTML5){
                // HTML5
                // play video
                targetVid = $(divID + ' video')[0];
                targetVid.play();
//                console.log(targetVid)
                currentVideo = htmlVid;
            }
        };
    
        function initFlashVideo(){
            var flashID = "flashVid"+vidNum;
            var videoHTML = '<div id="'+flashID+'"></div>'

            $(divID).html(videoHTML);
            // trigger swfobject
            var flashvars = {
                autoPlay: "true",
                autoHide: "true",
                fullScreenButton: "false",
                timeBar: "false",
                offsetY: "25",
                scaleMode: "exactFit",
                highlightColor: vidObj.highlightColor,
                videoURL: vidObj.videoURL,
                startPhotoSource: vidObj.startPhotoSource
            };
            var params = {
                wmode: "transparent",
                scale: "exactFit",
                salign: "TL"
            };
            var attributes = {};
            attributes.id = flashID;
            var flashHeight = Number(vidObj.height);
            
            swfobject.embedSWF(vidObj.swfPlayer, flashID, vidObj.width, flashHeight, "9.0.0", false, flashvars, params, attributes);
        }
        
    }

    // video button click
    linkInit = function(target){
		if (!appleMobile){
	        target.click(function(e){
	            e.preventDefault();
	            showOverlay($(this));
	        })
		}
    }

    function showOverlay(target){
        var vidHTML = '<div id="video-overlay"></div><section id="video-wrapper"><h1></h1><div id="video-content"></div><div class="btn-close">close</div></section>';
        $('#container').after(vidHTML);
        vidOverlay = $('#video-overlay');
        vidWrapper = $('#video-wrapper');
        centerVideo();
        // hide the video overlay
        vidOverlay.mouseup(hideOverlay);
        $('.btn-close').click(hideOverlay);
        $(window).resize(centerVideo);
        
        // grab video path
        var getTitle = target.attr('title');
        var getVideo = target.attr('href');
            // set video attributes
        var videoObj = {
            // global attr
            divID: "video-content",
            videoURL: getVideo,
            width: "640",
            height: "360",
            // flash attr
            autoPlay: "false",
            highlightColor: "0x1DB2D1",
            swfPlayer: "/static/swf/jcplayer.swf",
            startPhotoSource: ""
        }
        vidInit(videoObj);
        // push into video player
        vidOverlay.fadeIn(500);
        vidWrapper.fadeIn(500);
        $('#video-wrapper h1').html(getTitle);
    }

    function hideOverlay(){
        vidOverlay.fadeOut(500);
        vidWrapper.fadeOut(500, function() {
            stopVideo();
        });
    }
    function stopVideo(){
        $('#video-overlay').detach();
        $('#video-wrapper').detach();
    };
    
    function centerVideo(){
        vidOverlay.width($(window).innerWidth());
        vidOverlay.height($(window).innerHeight());
        vidWrapper.css('left', $(document).width()/2 - vidWrapper.width()/2);
//        console.log(vidWrapper.css(vidWrapper.height()))

    }
});