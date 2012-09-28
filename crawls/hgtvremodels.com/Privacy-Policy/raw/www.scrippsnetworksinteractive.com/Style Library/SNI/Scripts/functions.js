$(document).ready(function(){
	_spBodyOnLoadWrapper();
	
	prepareForVideo();	
	// NOTE: horizontalCarousel() has been moved to and called from Ironworks_SP2010_Base_functions.js before wpTabs() to circumvent the outerWidth issue  
	// that occurs when the carousel appears within tabs.  When the script is called after wpTabs 'outerWidth()' returns just the width, not width + padding
	//horizontalCarousel();
	careersImageHover();
	careersContentToggle();
	brandExpandCollapse();
	adjustSearchResultsSpacing(); 
	adjustNavToContentSpacing(); //  When the secondary nav ("tabNavigation") is empty, turn off the margin-bottom on that ID.
	
	//handleVideoPosition();	// Called from prepareForVideo when necessary
	
	ourPeopleCarousel();
	
	footerSelectMenu();
	
	styleSocialMediaTabs();
	gridList();
	readMore();
	brandSorter();

});

/* ------------------------------------------------- Miscellaneous Scripts -------------------------------------------------- */
// Grid List View
function gridList(){
	$(function() {
	var cc = $.cookie('list_grid');
	if (cc == 'l') {
		$('ul.searchResults').addClass('list');
		$('.buttons a.grid').removeClass('active');
		$('.buttons a.list').addClass('active');	
	} else {
		$('ul.searchResults').removeClass('list');
		$('.buttons a.list').removeClass('active');
	}
}); 
		$('ul.searchResults').addClass('grid');
		$('.buttons a').click(function(e) {
		    if ($(this).hasClass('grid')) {
		        $('ul.searchResults').removeClass('list').addClass('grid');
				$('.buttons a').removeClass('active');
				$(this).addClass('active');
				$.cookie('list_grid', null);
		    }
		    else if($(this).hasClass('list')) {
		        $('ul.searchResults').removeClass('grid').addClass('list');
				$('.buttons a').removeClass('active');
				$(this).addClass('active');
				$.cookie('list_grid', 'l', { expires: 7 });
		    }
		});

}

// read more is a simple show hide script.
function readMore(){
	$('a.readMore').click(function(event) {
		$(".hideShow").toggle();
	});
}
// Function detects a) tabs in the right rail, b) gets the text of the anchor link of the tab and c) 
// applies a class of the same name to the li/tab.

function styleSocialMediaTabs() {
	var hasRightRailTabs = (($("#narrowColumnRight").find(".wpzTabbed")).length > 0) ? true : false;
	if(hasRightRailTabs) {
		var rightRailTabs = $("#narrowColumnRight > .wpzTabbed > ul.tabStrip").find("li");
		rightRailTabs.each(function(index) {
			var currentTabText = $(this).find("a").text(); //("tab HTML: " + $(this).html());
			$(this).addClass(currentTabText);
		});
	}	
}

// Function determines if a) secondary nav, b) super bg, and/or c) a background video is present then sets the proper styles
// on the proper divs to create the necessary spacing between the top nav and content area.
function adjustNavToContentSpacing() {
	var hasSecondaryNav = ($('#tabNavigation > span').html()) != "" ? true : false;
	var hasSuperBg = (($("html").find(".superBg")).length > 0) ? true : false;
	var hasSuperBgVideo = (($("html").find("#backgroundVideo")).length > 0) ? true : false;

	//alert("nav: " + hasSecondaryNav + "\nsuperBg: " + hasSuperBg + "\nsuperBgVideo: " + hasSuperBgVideo);
	if(hasSuperBg) {
		$("#pageWell").addClass("hasSuperBg");
		if(hasSecondaryNav) {
			$('#panelContainer').addClass('tabNavAndSuperBg');
		}
	}
	if(hasSuperBgVideo) {
		$("#pageWell").addClass("hasSuperBgVideo");
		if(hasSecondaryNav) {
			$('#panelContainer').addClass('tabNavAndSuperVideo');
		}
	}	
}

// Function detects if: 
// 1) An 'inPageVideoPlayerContainer' class is present (this class should be applied to the parent container of the <video> tag),
// and if so, prepares the html/js controls for that player, or
// 2) An 'backgroundVideo ID is present (this class should be applied to the <video> tag of the superBgVideo) and if so,
// displays video controls
function prepareForVideo () {
	
	var hasInPageVideoObjects = ($("html").find(".inPageVideoPlayerContainer").length > 0) ? true : false;
	// Video is supported (detected by way of modenizr)and in-page player is present
	if(($("html").hasClass("video")) && hasInPageVideoObjects) {
		//alert("in page vid, so show .inPageVideoPlayerContainer #videoControls");
		var inPageVideoObj = document.getElementById("inPageVideoPlayer");
		$(".inPageVideoPlayerContainer #videoControls").show();
		handleVideoControls(inPageVideoObj);
	}
	// Video is supported and there is a background video
	else if(($("html").hasClass("video")) && (document.getElementById("backgroundVideo"))) {
		//alert("has a div#backgroundVideo, so show .s4-bodyContainer > #videoControls");
		var bgVideoObj = document.getElementById("backgroundVideo");
		$("#videoControls").show();
		handleVideoPosition();
		handleVideoControls(bgVideoObj);
	}	
	else if($('body').hasClass('editMode')) {
		//alert("in edit mode,so show #videoControls");
		$("#videoControls").show();
	}
	else {
		// Need to a) hide video controls if there's no video and b) hide left column on 
		// SNI_PeopleDetail.aspx if no WP, Img or video is present
		var hasWebPartInLeftCol = ($('#careerDetailVideoContainer').find('table.wpz').length > 0) ? true : false;
		var hasImageInLeftCol = ($('#careerDetailVideoContainer').find('img').length > 0 ) ? true : false;
		var hasVideoInLeftCol = ($('#careerDetailVideoContainer').find('video').length > 0 ) ? true : false;
		var hasColumnForInPageVideo = ($("body").find('#careerDetailVideoContainer').length > 0 ) ? true : false;
		//alert("hasWebPartInLeftCol: " + hasWebPartInLeftCol + "\nhasImageInLeftCol: " + hasImageInLeftCol + "\nhasVideoInLeftCol: " + hasVideoInLeftCol); 
		if(!hasWebPartInLeftCol && !hasImageInLeftCol && !hasVideoInLeftCol && hasColumnForInPageVideo) {
			$("body").addClass("noCareerDetailVideoOrImage");
		}
		$("#videoControls").hide();

	}
}

// Function is responsible for opening new window and setting URL location when user changes
// activates the 'Our Brands' select menu in the footer
function footerSelectMenu() {
	$('.selectBrand .dropDown').hover(
		function() {
			$('.selectBrand ul').css('display','inline-block');
			$('.selectBrand ul').css( 'marginTop',-($('.selectBrand ul').height() + $('.selectBrand .dropDown').outerHeight()) );
		},
		function() {
			var tOut = setTimeout(function() {
				$('.selectBrand ul').css('display','none');
			}, 50);
			$('.selectBrand ul').hover(
				function() {
					// prevents options from being hidden
					clearTimeout(tOut);
				},
				function() {
					// hides options and removes hover state
					$('.selectBrand ul').css('display','none');
				}
			)
		}
	);
}

// Function is called from ourPeopleCarousel, reads the text of the 'discipline' page field, then
// then compares it to each title on all the little people.  When it finds a match, it passes the
// index of the little person back.
// Example URL: http://staff.dev.sni.com/careers/life-at-sni/our-people/Pages/administration.aspx
function selectCurrentLittlePeople() {
	var currentPersonIndex = 0;
	var hasPeopleCarousel = ($("#peopleCarousel").html()) != null ? true : false;
	if(hasPeopleCarousel) {
		var disciplineString = $("#disciplineName > span").text();
		var littlePeopleObj = $("#peopleCarousel").find("h3>a");
		littlePeopleObj.each(function(index) {
			//alert("h3 > a.html(): ~" + $(this).html() + "~\ndiscipline text: " + disciplineString);
			var headerDisciplineText = ($(this).html()).split(":");
			if(headerDisciplineText[0] == disciplineString) {
				currentPersonIndex = index;
			};
		});
		return currentPersonIndex
	}
}

// Function is used on the 'Our People' detail page to handle highlighting the applicable
// little person.  Also handles the hovers on the other little people.
function ourPeopleCarousel() {
	var peopleCarouselItems = $("#peopleCarousel").find('li');
	var personIndex = selectCurrentLittlePeople();
	peopleCarouselItems.each(function(index) {
		$(this).prepend('<img src="/Style Library/SNI/Images/career_carousel_sml_person_cover.png" class="personCover"/>');
		if(index == personIndex) {
			$(this).find('img.personCover').hide();
			$(this).addClass('active');
			$(this).find('h3').show();
		}
	});
	$("#peopleCarousel ul li").hover(function() {
		if(!($(this).hasClass('active'))) {
			$(this).find('img.personCover').hide();
			$(this).find('h3').show();
			$("#peopleCarousel li.active img.personCover").show();
			$("#peopleCarousel li.active h3").hide();
		}
	},
	function() {
		if(!($(this).hasClass('active'))) {
			$(this).find('img.personCover').show();
			$(this).find('h3').hide();
			$("#peopleCarousel li.active img.personCover").hide();
			$("#peopleCarousel li.active h3").show();
		}
	});
}

function adjustSearchResultsSpacing() {
	var searchResultItems = $('.searchResults').find('li');
	searchResultItems.each(function(index) {
		if(index%4 == 0) {
			$(this).addClass("firstResultInRow");
		}
	});

}

function brandExpandCollapse() {
	$(".expandControl").click( function(){
		var currProdsExps = $(this).parent().find('.articleProdsExps');
		if(currProdsExps.is(":hidden")){
			currProdsExps.slideDown();
			$(this).addClass("open");
		}
		else {
			$(this).removeClass("open");
			currProdsExps.slideUp();
		}
	});
}
/* ------------------------------------------------- End Miscellaneous Scripts -------------------------------------------------- */


/* ------------------------------------------------- Home Page Scripts ---------------------------------------------------------- */
// brand rotater interval and animation variables
var rotate;
var animationSpeed = 1000;
var animationPause = 4000;
var animationEasing = 'easeOutExpo';

// Initiates homepage functions
function initHomepage() {
	// remove body borders
	$('body').css('border','none');
	
	// disable overflow scrolling
	$('html').css('overflow','hidden');
	
	// remove styling from content wrapping divs
	$('#pageWellWrapper, #pageWell').removeAttr('id');
	
	// position logo brand train initial view
	if ($('#superBgContent').find('.active').hasClass('onRight')) {
		$('#logoControl').css({
			left: ($('#topHomepageZone').outerWidth() - $('#logoControl').width())
		});
	}
	
	// make logo brand train visible after positioning
	if ($.browser.msie && ($.browser.version <= 8)) {
		$('#logoControl').css({
			display: 'inline'
		});
	} else {
		$('#logoControl').css({
			display: 'inline-block'
		});
	}
	
	loadSuperImages(true);
	initFooterSlider();
	initBrandChange();
}
function initFooterSlider() {
	// detect browser/os
	var uA = navigator.userAgent.toLowerCase();
	if ( (uA.indexOf('ipad') > -1) || (uA.indexOf('iphone') > -1) || (uA.indexOf('android') > -1) ) { //iOS & android device support
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
	}
	
	$('#sliderToggle').click(function() {
		// stop rotater
		clearInterval(rotate);
		
		// set slider height
		var sliderHeight;
		if ( ($(window).height() - $('#s4-ribbonrow').outerHeight() - parseInt($('#footerSlider').css('marginBottom')) -20) < 493 ) {
			sliderHeight = ( $(window).height() - $('#s4-ribbonrow').outerHeight() - parseInt($('#footerSlider').css('marginBottom')) -20 );
		} else {
			sliderHeight = 493;
		}
		
		// opens/closes the footer slider
		if ($(this).parent().height() <= 30) {
			$(this).parent().animate({
				height: sliderHeight
				}, animationSpeed, animationEasing, function() {
					// track google event
					_gaq.push(['_trackEvent', 'Whats New Flyout', 'Click']);
					
					// toggles the control arrow
					$('#sliderToggle').css('backgroundPosition', 'right bottom');
					
					// add custom scrollbar
					$('#footerSlider .footerSliderInner .scrollInnerWrapper').height( $('#footerSlider .footerSliderInner .footerSliderLeftCol').outerHeight(true) );
					if ( (uA.indexOf('ipad') > -1) || (uA.indexOf('iphone') > -1) || (uA.indexOf('android') > -1) ) { //iOS & android device support
						var myScroll = new iScroll('ipadScrollWrapper', { hScrollbar: false, vScrollbar: true, scrollbarClass: 'customScroll', hideScrollbar: false });
					} else { //desktop support
						$('#footerSlider .footerSliderInner').jScrollPane();
					}
			});
		} else {
			$(this).parent().animate({
				height: 30
				}, animationSpeed, animationEasing, function() {
					// toggles the control arrow
					$('#sliderToggle').css('backgroundPosition', 'right top');
			});
		}
	});
}
/* --------------------------------------- End Home Page Scripts -------------------------------------------------------- */


/* --------------------------------------- Brand Overview Page Scripts -------------------------------------------------------- */
function initBrandOverview() {
	// detect browser/os
	var uA = navigator.userAgent.toLowerCase();
	
	// sets scrollbars on first active screen
	if ( (uA.indexOf('ipad') > -1) || (uA.indexOf('iphone') > -1) || (uA.indexOf('android') > -1) ) { //iOS & android device support
		$('#brandContent').find('.brandOverContainer').filter('.active').find('.brandOverScroll').height( $('#brandContent').find('.brandOverContainer').filter('.active').find('.brandOverScroll').find('.articleDescription').outerHeight(true) );
		var tmpScrollId = $('#brandContent').find('.brandOverContainer').filter('.active').attr('id').toString();
		var myScroll = new iScroll(tmpScrollId, { hScrollbar: false, vScrollbar: true, scrollbarClass: 'customScroll', hideScrollbar: false });
	} else {
		$('#brandContent').find('.active').jScrollPane();
	}

	loadSuperImages(false);
	initBrandChange();
}
/* --------------------------------------- End Brand Overview Page Scripts -------------------------------------------------------- */


/* --------------------------------------- Full Sized Background Helpers -------------------------------------------------------- */
function loadSuperImages(fixIEBG) {
	// applye z-index to force IE8 to show correct image
	if ( ($.browser.msie && ($.browser.version <= 8))) {
		$('#fullBgImages').find('.active').css('z-index',$('#fullBgImages').children('span').length+1);
	}

	var zCnt = $('#fullBgImages').children('span').length;
	$('#fullBgImages').children('span').each(function() {
		// remove bg filter styke for all but IE7 $ IE8
		if ( !($.browser.msie && ($.browser.version <= 8))) {
			$('#fullBgImages').find('.active').css('filter','');
		}
		
		// IE7 & IE8 full bg sizing
		if (fixIEBG && $.browser.msie && ($.browser.version <= 8)) {
			$('#fullBgImages').append('<div class="fullBg" style="z-index: ' + zCnt + ';filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + $(this).text() + ',sizingMethod=scale);left: -' + $('.fullBg').width() + 'px;">&nbsp;</div>');
		} else {
			$('#fullBgImages').append('<div class="fullBg" style="background-image: url(' + $(this).text() + ');">&nbsp;</div>');
		}
		$(this).remove();
		zCnt--;
	});
	
	// IE7 & IE8 full bg sizing
	if (fixIEBG && $.browser.msie && ($.browser.version <= 8)) {
		$(window).resize(function() {
			initFullBGFallBack();
		});
	}
}

function initFullBGFallBack() {
	//Define image ratio
	var ratio = 1046/1700;
	
	//Gather browser dimensions
	var browserwidth = $(window).width();
	var browserheight = $(window).height();
	
	//Resize image to proper ratio
	if ((browserheight/browserwidth) > ratio) {
		$('.fullBg').height(browserheight);
		$('.fullBg').width(browserheight / ratio);
	} else {
		$('.fullBg').width(browserwidth);
		$('.fullBg').height(browserwidth * ratio);
	}
	
	//Make sure the image stays center in the window
	$('#fullBgImages').find('.fullBg').each(function() {
		if ($(this).hasClass('active')) {
			$(this).css('left', ($(window).width() - $('.fullBg').width())/2);
		} else {
			$(this).css('left',-$('.fullBg').width());
		}
	});
}
/* --------------------------------------- End Full Sized Background Helpers -------------------------------------------------------- */


/* --------------------------------------- Brand Rotator Helpers -------------------------------------------------------- */
function initBrandChange() {
	// attached brand movement to logos
	$('#logoControl').children('a').each(function() {
		$(this).click(function() {
			if (!$(this).hasClass('active')) {
				moveBrands('direct',($(this).index()-1));
				clearInterval(rotate);
			}
		});
	});
	
	// attached brand movement to previous arrow
	$('#logoControl #ltPrev').click(function() {
		moveBrands('prev',null);
		clearInterval(rotate);
	});
	
	// attached brand movement to next arrow
	$('#logoControl #ltNext').click(function() {
		moveBrands('next',null);
		clearInterval(rotate);
	});
	
	// timer to auto change brands
	rotate = setInterval(brandRotate,(animationSpeed+animationPause));

}

function brandRotate() {
	moveBrands('next',null);
}

function moveBrands(dir,toIndex) {
	// show next
	if (dir == 'next') {
		// if on last screen, transition into first element in list
		if ($('#fullBgImages').find('.active').next().length == 0) {
			changeBrand(
				$('#fullBgImages').children().first(),
				$('#superBgContent').children().first(),
				$('#logoControl').children('a').first(),
				$('#brandContent').children().first()
			);
		} else {
			changeBrand(
				$('#fullBgImages').find('.active').next(),
				$('#superBgContent').find('.active').next(),
				$('#logoControl').find('.active').next(),
				$('#brandContent').find('.active').next()
			);
		}
	}
	
	// show previous
	if (dir == 'prev') {
		// if on first screen, transition into last element in list
		if ($('#fullBgImages').find('.active').prev().length == 0) {
			changeBrand(
				$('#fullBgImages').children().last(),
				$('#superBgContent').children().last(),
				$('#logoControl').children('a').last(),
				$('#brandContent').children().last()
			);
		} else {
			changeBrand(
				$('#fullBgImages').find('.active').prev(),
				$('#superBgContent').find('.active').prev(),
				$('#logoControl').find('.active').prev(),
				$('#brandContent').find('.active').prev()
			);
		}
	}
	
	// move directly to brand
	if (dir == 'direct') {
		changeBrand(
			$('#fullBgImages').children().eq(toIndex),
			$('#superBgContent').children().eq(toIndex),
			$('#logoControl').children('a').eq(toIndex),
			$('#brandContent').children().eq(toIndex)
		);
	}
}

function changeBrand(fullBGImg,fullBGContent,brandLogo,brandContent) {
	// prevent interaction while animation in process
	if (!$('#logoControl').is(':animated') && !$('#fullBgImages').find('.active').is(':animated') && !$('#superBgContent').find('.active').is(':animated')) {
		// move current background image out
		$('#fullBgImages').find('.active').animate({
			left: -$('#fullBgImages').find('.active').width()
			}, animationSpeed+100, animationEasing, function() {
				$(this).removeClass('active');
				$(this).css({ backgroundPosition: '-9999px -9999px' })
			}
		);

		// show & move next image in
		fullBGImg.css({ left: $('#fullBgImages').width(), backgroundPosition: 'top center' });
		fullBGImg.animate({
			left: ($('#fullBgImages').width() - fullBGImg.width())/2
			}, animationSpeed, animationEasing, function() {
				fullBGImg.addClass('active');
			}
		);

		// move current logo/tagline/button out
		$('#superBgContent').find('.active').animate({
			left: -($('#fullBgImages').find('.active').outerWidth())
			}, animationSpeed, animationEasing, function() {
				$(this).removeClass('active');
				$(this).css({ display: 'none' });
			}
		);

		// show & move next logo/tagline/button in
		fullBGContent.css({
			display: 'inline-block',
			left: $(window).width() + fullBGContent.width()
		});
		if (fullBGContent.hasClass('onRight')) {
			fullBGContent.animate({
				left: ($('#topHomepageZone').outerWidth() - fullBGContent.width())
				}, animationSpeed, animationEasing, function() {
					$(this).addClass('active');
				}
			);
		} else {
			fullBGContent.animate({
				left: 0
				}, animationSpeed, animationEasing, function() {
					$(this).addClass('active');
				}
			);
		}
	
		// highlight brand logo
		$('#logoControl').find('.active').removeClass('active');
		brandLogo.addClass('active');
		 
		// move logo brand train (if needed)
		if (!$('#logoControl').is(':animated') && $('#logoControl').position().left <= ($('#topHomepageZone').outerWidth() - $('#logoControl').width()) && fullBGContent.hasClass('onRight')) {
			$('#logoControl').animate({
				left: ($('#topHomepageZone').outerWidth() - $('#logoControl').width())
				}, animationSpeed, animationEasing, function() {
				}
			);
		} else if (!$('#logoControl').is(':animated') && $('#logoControl').position().left >= ($('#topHomepageZone').outerWidth() - $('#logoControl').width()) && fullBGContent.hasClass('onLeft')) {
			$('#logoControl').animate({
				left: 0
				}, animationSpeed, animationEasing, function() {
				}
			);
		}
		
		// show new/hide old brand content
		$('#brandContent').find('.active').removeClass('active');
		brandContent.addClass('active');
		
		if ($('#brandContent').length > 0) {
			// detect browser/os
			var uA = navigator.userAgent.toLowerCase();
			
			// sets scrollbars active content
			if ( (uA.indexOf('ipad') > -1) || (uA.indexOf('iphone') > -1) || (uA.indexOf('android') > -1) ) { //iOS & android device support
				$('#brandContent').find('.brandOverContainer').filter('.active').find('.brandOverScroll').height( $('#brandContent').find('.brandOverContainer').filter('.active').find('.brandOverScroll').find('.articleDescription').outerHeight(true) );
				var tmpScrollId = $('#brandContent').find('.brandOverContainer').filter('.active').attr('id').toString();
				var myScroll = new iScroll(tmpScrollId, { hScrollbar: false, vScrollbar: true, scrollbarClass: 'customScroll', hideScrollbar: false });
			} else {
				$('#brandContent').find('.active').jScrollPane();
			}
		}
	}
}
/* --------------------------------------- End Brand Rotator Helpers -------------------------------------------------------- */


/* --------------------------------------- Custom HTML5 Video Controls Scripts ------------------------------------------ */
function handleVideoPosition() {
	var hasSuperBgVideo = (($("html").find("#backgroundVideo")).length > 0) ? true : false;
	if(hasSuperBgVideo) {
		$("#backgroundVideo").wrap("<div id=\"backgroundVideoWrapper\"/>");
		$(window).scroll(function() {
			var scrollOffset = ($(window).scrollTop()) * -1;
			$("#backgroundVideoWrapper").css("top",scrollOffset);
		});
	}
}


function formatTime(time, hours) {
    if (hours) {
        var hours = Math.floor(time / 3600);
        time = time - hours * 3600;

        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);

        return hours.lead0(2)  + ":" + minutes.lead0(2) + ":" + seconds.lead0(2);
    } 
	else {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);

        return minutes.lead0(2) + ":" + seconds.lead0(2);
    }
}

function handlePlayPause () {
	if (globalVideoObj.paused == false) {
		$("#playBtn").removeClass('showPause');	
		globalVideoObj.pause();
	}
	else {
		$(".videoPosterOverlay").hide();
		$("#playBtn").addClass('showPause');
		globalVideoObj.play();
	}
}

// Global reference to the video object
var globalVideoObj;

function handleVideoControls(videoObj) {
	
		// Video Controls
		globalVideoObj = videoObj;
		var isPoster = false; 
		var isAutoPlay = false;
		
		var controls = {
		    total: $("#total"),
		    buffered: $("#buffered"),
		    progress: $("#current"),
		    duration: $("#duration"),
		    currentTime: $("#currenttime"),
		    hasHours: false		    
		};
		
		
		Number.prototype.lead0 = function(n) {
		    var nz = "" + this;
		    while (nz.length < n) {
		        nz = "0" + nz;
		    }
		    return nz;
		};
		
		// Because IE9 won't show poster unless preload = none, and Safari won't consistently display poster when preload = none, 
		// take poster url and overlay an image over the video con
		function handlePoster() {
			var posterUrl = $(globalVideoObj).attr('poster');
			isAutoPlay = $(globalVideoObj).attr('autoplay');
			if(posterUrl != null && !(isAutoPlay)) {
				isPoster = true;
				var posterImgHtml = "<div class=\"videoPosterOverlay\"><img src=\"" + posterUrl + "\"/></div>";
				$(globalVideoObj).before(posterImgHtml);
			}
		}
		
		function updateProgress() {
			//alert("does updateProgress get called repeatedly?");
		    controls.currentTime.text(formatTime(globalVideoObj.currentTime, controls.hasHours));
		    var progress = Math.floor(globalVideoObj.currentTime) / Math.floor(globalVideoObj.duration);
		    controls.progress[0].style.width = (Math.floor(progress * controls.total.width())) + "px";
			$("#time").css('left',(Math.floor(progress * controls.total.width()) + 25) + "px");   //,(Math.floor(progress * controls.total.width()) + "px"))
		}
		if(globalVideoObj) {
			//alert("globalVideoObj: " + globalVideoObj);
			
			// Because of inconsistent handling of the poster image, this function will get that value and impose the image over the video element
			handlePoster();
			if(isAutoPlay) {
				$("#playBtn").addClass('showPause');
			}
			$("#playBtn").click(function(){
				handlePlayPause();
			});
	
			/* when video reahes the end, update the play/pause button */		
			globalVideoObj.addEventListener('ended',function(e) {
				handlePlayPause();
			}, true);
	
			
			globalVideoObj.addEventListener('timeupdate',function(e) {
				updateProgress();
			}, true);

		}		// Allows for clicking the progress bar to change location in video(?)
		controls.total.click(function(e) {
		    var x = (e.pageX - this.offsetLeft)/$(this).width();
		    videoObj.currentTime = x * globalVideoObj.duration;
		});
		
		function handleBuffering() {
			var buffered = Math.floor(globalVideoObj.buffered.end(0)) / Math.floor(globalVideoObj.duration);
		    controls.buffered[0].style.width = Math.floor(buffered * controls.total.width()) + "px";
		}
	
		
} // end handleVideoControls()
/* --------------------------------------- End Custom HTML5 Video Controls Scripts ------------------------------------------ */
function getLeftItemToFade(newPosition,carouselItemWidth) {
	leftItemIndexToFade = (newPosition/carouselItemWidth)*-1;
	leftItemToFade = $('.carouselSlider .carouselItem').eq(leftItemIndexToFade);
	$(leftItemToFade).animate({opacity: .3}, function(){
		$(this).addClass('faded');
	});
}
function getRightItemToFade(newPosition, maskWidth, carouselItemWidth) {
	rightItemIndexToFade = Math.ceil((-1* (newPosition/carouselItemWidth)) + ((maskWidth/carouselItemWidth) - 1));
	rightItemToFade = $('.carouselSlider .carouselItem').eq(rightItemIndexToFade);
	$(rightItemToFade).animate({opacity: .3}, function(){
		$(this).addClass('faded');
	});
}
function setOpacityOnItem(isCareersCarousel,newPosition, carouselItemWidth, sliderWidth, maskWidth) {
	if(isCareersCarousel) {
		var careerCarouselItems = $('#careersCarouselLarge').find('.carouselItem');
		// Update selected item idx var in case we set it from static html
		careerCarouselItems.each(function(index) {
			if($(this).css('opacity') < 1) {
				$(this).animate({opacity: 1}, function() {
					$(this).removeClass('faded');
				});
			}
		});

		if(newPosition < carouselItemWidth) {
			// Fade the image on the left
			getLeftItemToFade(newPosition, carouselItemWidth);
		}
		if((sliderWidth + newPosition) > maskWidth) {
			// Fade item on the right
			getRightItemToFade(newPosition,maskWidth,carouselItemWidth);
		}
		
	}
}
function careersImageHover() {
	$('#careersCarouselLarge .carouselItem').hover( function() {
		if(!($(this).hasClass('selected')) && !($(this).hasClass('faded'))) {
			$(this).addClass('active');
		}
	}, function() {
		if(!($(this).hasClass('selected'))) {
			$(this).removeClass('active');
		}
	});
}

// Function is used on the Careers Landing page
function careersContentToggle() {
	var selectedCarouselItemIndex = 0;
	var careerCarouselItems = $('#careersCarouselLarge').find('.carouselItem');
	var careerContentItems = $('#careersCarouselContent').find('.careersCarouselContentItem');
	
	// Update selected item idx var in case we set it from static html
	careerCarouselItems.each(function(index) {
		if($(this).hasClass('selected')) {
			selectedCarouselItemIndex = index;
		}
	});
	// Handle carousel item clicks
	careerCarouselItems.each(function(index) {
		// Update superBg based on index
		
		$(this).click(function() {
			selectedCarouselItemIndex = index;
			updateCarouselAndContent();
		});
	});	
	updateCarouselAndContent();
	// Hide all content items
	function hideAllCarouselContent() {
		careerContentItems.each(function() {
			$(this).css('display','none');
		});
	}
	// 'Unselect' all carousel items
	function disableAllCarouselItems() {
		careerCarouselItems.each(function() {
			$(this).removeClass('selected');
		});
	}
	// Display content and select carousel item based on 'selectedCarouselItemIndex'
	function updateCarouselAndContent() {
		if(!($(careerCarouselItems[selectedCarouselItemIndex]).hasClass('faded'))) {
			hideAllCarouselContent();
			disableAllCarouselItems();
			$(careerContentItems[selectedCarouselItemIndex]).css('display','block');
			$(careerCarouselItems[selectedCarouselItemIndex]).addClass('selected');
			if($(careerCarouselItems[selectedCarouselItemIndex]).hasClass('active')) {
				$(careerCarouselItems[selectedCarouselItemIndex]).removeClass('active');
			}
		}
	}
} // end careersContentToggle
/* --------------------------------------- End Carousel Scripts ------------------------------------------------------------ */

function brandSorter(){
		$('ul.brandSorterNav li span').click(function() {
			$('div.prodExpItem').fadeOut(0);
			$('ul.brandSorterNav li').removeClass('active');
		});
		$('ul.brandSorterNav li.products span').click(function() {
			$('ul.brandSorterNav li.products').addClass('active');
			$("div.prodExpItem span:contains('Products')").closest('div.prodExpItem').fadeIn(500);	
		});
		$('ul.brandSorterNav li.websitesApps span').click(function() {
			$('ul.brandSorterNav li.websitesApps').addClass('active');
			$("div.prodExpItem span:contains('Websites')").closest('div.prodExpItem').fadeIn(500);	
		});
		$('ul.brandSorterNav li.experiences span').click(function() {
			$('ul.brandSorterNav li.experiences').addClass('active');
			$("div.prodExpItem span:contains('Experiences')").closest('div.prodExpItem').fadeIn(500);	
		});
		$('ul.brandSorterNav li.all span').click(function() {
			$('ul.brandSorterNav li.all').addClass('active');
			$('div.prodExpItem').fadeIn(500);

		});
}
/* ##### end CUSTOM FUNCTIONS ##### */