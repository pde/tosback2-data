/***************************************************************************
*
* Copyright (C) Telegraph Media Group Ltd.
* All Rights Reserved. No use, copying or distribution of this work may be
* made. This notice must be included on all copies, modifications and
* derivatives of this work.
****************************************************************************
* Author: Luke Dyson  Date: 24/03/2008
*
* Description:
* Renders all slideshow functionality
*
* 11/04/2011 S Gadhiraju	Used SlideShowObj to auto rotate the slideshows	[DIGI-378]
* 20/04/2011 S Gadhiraju	Surprise! IE's setInterval implementation is different from other browsers. So used a different way of calling setInterval.
*
****************************************************************************
* $Id: tmglSlideShow.js,v 1.7 2009/08/13 11:06:55 dysonl Exp $
***************************************************************************/

// Generic slideshow array to save each found slideshow
var ssObj = [];

// Generic slideshow object to save data for each found slideshow
function SlideShowObj() {
	this.delay=3000;
	this.timeoutId=null;
	this.autoFunction=null;
	this.ssType=null;
}

function SlideShowObj(timeout, autoFunction) {
	this.delay=timeout;
	this.timeoutId=null;
	this.autoFunction=autoFunction;
	this.ssType=null;
}

// Slideshow function to show the "next" slide
function ssNext(id) {
	// Retrieve the currently shown slide number
	var indexShown = $(ssObj[id].slideshow).find(".ssImg").index($(ssObj[id].slideshow).find(".ssImg:visible").get(0));

	// to refresh the ad frame on popup slideshows
	var nextImage = 0;

	// hide the currently shown slide
	$(ssObj[id].slideshow).find(".ssImg:eq("+indexShown+")").hide();
	
	// If we have reached the end of the slides, start from the beginning, otherwise show the next slide (update counters if they exist)
	if(indexShown == $(ssObj[id].slideshow).find(".ssImg").length-1) {
		$(ssObj[id].slideshow).find(".ssImg:eq(0)").show();
		if($(ssObj[id].slideshow).find(".tools .index").length>0) {
			$(ssObj[id].slideshow).find(".tools .index").html("1");
		}
		nextImage = 0;
	} else {
		$(ssObj[id].slideshow).find(".ssImg:eq("+(indexShown+1)+")").show();
		if($(ssObj[id].slideshow).find(".tools .index").length>0) {
			$(ssObj[id].slideshow).find(".tools .index").html((indexShown+1)+1);
		}
		nextImage = indexShown+1;
	}
}

// Slideshow function to show the "previous" slide
function ssPrev(id) {
	// Retrieve the currently shown slide number
	var indexShown = $(ssObj[id].slideshow).find(".ssImg").index($(ssObj[id].slideshow).find(".ssImg:visible").get(0));

	// to refresh the ad frame on popup slideshows
	var nextImage = 0;

	// hide the currently shown slide
	$(ssObj[id].slideshow).find(".ssImg:eq("+indexShown+")").hide();

	// If we have reached the beginning of the slides, start from the end, otherwise show the previous slide (update counters if they exist)
	if(indexShown == 0) {
		$(ssObj[id].slideshow).find(".ssImg:eq("+($(ssObj[id].slideshow).find(".ssImg").length-1)+")").show();
		if($(ssObj[id].slideshow).find(".tools .index").length>0) {
			$(ssObj[id].slideshow).find(".tools .index").html($(ssObj[id].slideshow).find(".ssImg").length);
		}
		nextImage = $(ssObj[id].slideshow).find(".ssImg").length-1;
	} else {
		$(ssObj[id].slideshow).find(".ssImg:eq("+(indexShown-1)+")").show();
		if($(ssObj[id].slideshow).find(".tools .index").length>0) {
			$(ssObj[id].slideshow).find(".tools .index").html(indexShown);
		}
		nextImage = indexShown-1;
	}
}

// Slideshow function to so a "random" slide
function randomFrame(id) {
	// Retrieve the currently shown slide number
	var indexShown = $(ssObj[id].slideshow).find(".ssImg").index($(ssObj[id].slideshow).find(".ssImg:visible").get(0));

	// Choose a random slide number
	var randomFrameNo=Math.floor(Math.random() * $(ssObj[id].slideshow).find(".ssImg").length);

	// prevent showing the same frame twice in a row, otherwise show the current slide and show the randomly selected slide
	if(indexShown==randomFrameNo) {
		randomFrame();
	} else {
		$(ssObj[id].slideshow).find(".ssImg:eq("+indexShown+")").hide();
		$(ssObj[id].slideshow).find(".ssImg:eq("+randomFrameNo+")").show();
	}
}

// Initialise all slideshows on this page
function initSS() {
	// Get all the slideshows on the page
	var slideshow = $(".slideshow").get();
	
	// For every slideshow found...
	for(i in slideshow) {
		
		var slideshowRotationSpeedID = $(slideshow[i]).parent().attr("id") + 'rotationSpeed';
		var slideshowRotationSpeed = $("#" + slideshowRotationSpeedID).text();
		var autoFunction = "nextFrame";
		
		if( slideshowRotationSpeed == null || slideshowRotationSpeed =="" || slideshowRotationSpeed == 0)
		{
			slideshowRotationSpeed = null;
			autoFunction = null;
		}

		// Generate a new slideshow object for this slideshow
//		ssObj[i] = new SlideShowObj();

		ssObj[i] = new SlideShowObj(slideshowRotationSpeed, autoFunction);
		
		// Save the slideshow for ready access
		ssObj[i].slideshow = slideshow[i];
		
		// added to make sure we are dealing with a dom object and not a function
		if (typeof(slideshow[i]) != 'object') continue;
		
		/* Retrieve setup data from the DOM */
		/* Get the functional elements from the first comment found in the rotating element, then split it. */
		var ssSetup = $(ssObj[i].slideshow).comments(0) != null?$(ssObj[i].slideshow).comments(0).split(","):null;
		
		if (ssSetup != null) {
			// Get the time delay (if this is set), and save it to this slideshows' object (Generally only used if there is a function also set)
			if(ssSetup[0] != null && ssSetup[0] != ""){
				ssObj[i].delay = ssSetup[0];
			}
			// Get the function required (if this is set), and save it to this slideshows' object
			if(ssSetup[1] != null && ssSetup[1] != ""){
				ssObj[i].autoFunction = ssSetup[1];
			}
		}
		
		// Define the type of this slideshow
		if ($(ssObj[i].slideshow).is(".epic")==true) {
			ssObj[i].ssType = "epic";
		} else {
			ssObj[i].ssType = "image";
		}

		// Setup the slides ready for viewing (Remove "fail gracefully" classes and reset their states)
		$(ssObj[i].slideshow).find(".ssImg").removeClass("hide").hide();
		$(ssObj[i].slideshow).find(".ssImg:first").removeClass("show").show();

		// Find the previous button (if it exists) and bind a click event function to it...
		if($(ssObj[i].slideshow).find(".tools .prev, .tools .prevNoFade").get(0)!=undefined){
			$(ssObj[i].slideshow).find(".tools .prev, .tools .prevNoFade").bind("click",{count:i},function(e){
				// If this slideshow is currently automated, stop the automation
				if (ssObj[e.data.count].timeoutId!=null){
					clearInterval(ssObj[e.data.count].timeoutId);
					ssObj[e.data.count].timeoutId=null;
				}
				// Fire off the call to show the previous slide for this slideshow
				ssPrev(e.data.count);

				// Click reporting
				dcsCleanup();
				dcsMeta();
				// Click report based on slideshow type
				if (ssObj[e.data.count].ssType == "image") {
					// Added WT.dl = 53 parameter to flag that page is not a reload. See DIGI-1114
					dcsMultiTrack('DCSext.embeddedSlideshowImage',$(ssObj[e.data.count].slideshow).find("> .ssImg:visible > img").attr("src"),"WT.dl","53");
					trackGoogle();
				} else if (ssObj[e.data.count].ssType == "epic") {
					dcsMultiTrack('DCSext.epicSlideshow',$(ssObj[e.data.count].slideshow).find("> .ssImg:visible > iframe").attr("src").substring($(ssObj[e.data.count].slideshow).find("> .ssImg:visible > iframe").attr("src").indexOf("=")+1,$(ssObj[e.data.count].slideshow).find("> .ssImg:visible > iframe").attr("src").length));
					trackGoogle();
				}
				
			});
		}

		// Find the next button (if it exists) and bind a click event function to it...
		if($(ssObj[i].slideshow).find(".tools .next, .tools .nextNoFade").get(0)!=undefined){
			$(ssObj[i].slideshow).find(".tools .next, .tools .nextNoFade").bind("click",{count:i},function(e){
				// If this slideshow is currently automated, stop the automation
				if (ssObj[e.data.count].timeoutId!=null){
					clearInterval(ssObj[e.data.count].timeoutId);
					ssObj[e.data.count].timeoutId=null;
				}
				// Fire off the call to show the next slide for this slideshow
				ssNext(e.data.count);

				// Click reporting
				dcsCleanup();
				dcsMeta();
				// Click report based on slideshow type
				if (ssObj[e.data.count].ssType == "image") {
					// Added WT.dl = 53 parameter to flag that page is not a reload. See DIGI-1114
					dcsMultiTrack('DCSext.embeddedSlideshowImage',$(ssObj[e.data.count].slideshow).find("> .ssImg:visible > img").attr("src"),"WT.dl","53");
					trackGoogle();
				} else if (ssObj[e.data.count].ssType == "epic") {
					dcsMultiTrack('DCSext.epicSlideshow',$(ssObj[e.data.count].slideshow).find("> .ssImg:visible > iframe").attr("src").substring($(ssObj[e.data.count].slideshow).find("> .ssImg:visible > iframe").attr("src").indexOf("=")+1,$(ssObj[e.data.count].slideshow).find("> .ssImg:visible > iframe").attr("src").length));
					trackGoogle();
				}
			});
		}

		// if this slideshow shows the current slide count and a total slide count, initialise them
		if($(ssObj[i].slideshow).find(".index").length>0 && $(ssObj[i].slideshow).find(".total").length>0) {
			$(ssObj[i].slideshow).find(".index").html("1");
			$(ssObj[i].slideshow).find(".total").html($(ssObj[i].slideshow).find(".ssImg").length);
		}

		// The nav area is now ready to show.
		$(ssObj[i].slideshow).find(".tools").removeClass("hide").show();

		// from this slideshows object, decide if it is to be automated using the standard slideshow functions
		if(ssObj[i].autoFunction == "randomFrame"){
			ssObj[i].timeoutId = setInterval('randomFrame('+i+')',Number(ssObj[i].delay));
		}else if(ssObj[i].autoFunction == "nextFrame"){
			ssObj[i].timeoutId = setInterval('ssNext('+i+')',Number(ssObj[i].delay));
		}else if(ssObj[i].autoFunction == "prevFrame"){
			ssObj[i].timeoutId = setInterval('ssPrev('+i+')',Number(ssObj[i].delay));
		}
	}
}

$(function() {
	initSS();
});
