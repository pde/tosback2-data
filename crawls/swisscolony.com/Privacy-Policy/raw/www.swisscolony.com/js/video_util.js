//TABS AND VIDEO GALLERY SCRIPT STARTS HERE
$(document).ready(function() {
    //Set unique id's on tab viewer containers and run initial setup on tabs and video gallery
    var tabbedViewerIndex = 0;
    $(".tabbed_viewer").each(function() {
        tabbedViewerIndex++
        var tabbedViewerId = 'tabbed_viewer_' + tabbedViewerIndex;
        $(this).attr('id', tabbedViewerId);

        //Tab load
        $(this).find(".tabContent").hide();
        $(this).find("ul.tabs li:first").addClass("active").show();
        $(this).find(".tabContent:first").show();

        //Video gallery load
        $(this).find(".videoContainer .videoItem").hide();
        $(this).find("ul.videoThumbs li a:first").addClass("active");
        $(this).find(".videoContainer .videoItem:first").show();
    });

	//Click events for photo tabs
	$("ul.tabs li.photoTab").click(function() {
		var scope = $(this).parents(".tabbed_viewer");

        scope.find("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		scope.find(".tabContent").hide();

        $(scope).find(".tabContent.photoTab").fadeIn();
		return false;
	});

    //Click events for video tabs
    $("ul.tabs li.videoTab").click(function() {
		var scope = $(this).parents(".tabbed_viewer");

        scope.find("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
		scope.find(".tabContent").hide(); //Hide all tab content

        $(scope).find(".tabContent.videoTab").fadeIn(); //Fade in the active ID content
		return false;
	});

    //Set unique id's on video containers
    var videoIndex = 0;
    $(".videoContainer .videoItem").each(function() {
        videoIndex++
        var videoContainerId = 'video_' + videoIndex;
        $(this).attr('id', videoContainerId);
    });

    // videoIndex(above) and ThumbIndex(below) will always be the same.

    //Build video selector and store in thumbnail link href attribute
    var thumbIndex = 0;
    $("ul.videoThumbs li a").each(function() {
        thumbIndex++
        var thumbHref = '#video_' + thumbIndex;
        $(this).attr('href', thumbHref);
    });

    //Video gallery click
    $("ul.videoThumbs li").click(function() {
        var scope = $(this).parents(".tabContent");
        scope.find("ul.videoThumbs li a").removeClass("active");
        $(this).find("a").addClass("active");
        scope.find(".videoContainer .videoItem").hide();

        var activeVideo = $(this).find("a").attr("href");
        var activeTabScope = $(this).parents(".tabbed_viewer").attr("id");
        $("#" + activeTabScope + " " + activeVideo).fadeIn();
        return false;
    });

    //Loading larger video in layer
    $(".viewLargerBtn a").click(function() {
        //Finding ".largevideo" class relative to currently clicked btn so that we don't have problems on ensemble pages.
        $(this).parent().siblings(".largeVideo").modal();
        return false;
    });

});
//TABS AND VIDEO GALLERY SCRIPT ENDS HERE
