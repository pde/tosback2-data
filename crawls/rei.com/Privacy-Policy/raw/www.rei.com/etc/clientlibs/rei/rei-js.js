/* $Id: videobelt.js 1918 2012-03-30 17:55:27Z jowilso $ */

$(document).ready(function(){
	var volVideoSlide = new Object();
	volVideoSlide.slideCount = 0;
	volVideoSlide.indx = 0;
	volVideoSlide.isSliding = false;
	volVideoSlide.width = $('#vidContainer').width() + 10;
	volVideoSlide.init = function(){addClickListeners(); setSlideCount();};
	
	function setSlideCount(){
		var numLi = 0;
		$('#thumbList li').each(function(){
			numLi++;								 
		});
		volVideoSlide.slideCount = (numLi/4) - 1;
	}
	
	function setIndx(direction){
		if (direction == 'up') {
			if (volVideoSlide.indx < volVideoSlide.slideCount) {
				volVideoSlide.indx++;	
			}
		} else if (direction == 'down') {
			if (volVideoSlide.indx > 0) {
				volVideoSlide.indx--;	
			}
		}
		
		doSlide();
	}
	
	function doSlide(){
		volVideoSlide.isSliding = true;
		var xPos = '-' + (volVideoSlide.width * volVideoSlide.indx) + 'px';
		$('#thumbList').animate({left: xPos}, 500, function() { volVideoSlide.isSliding = false; checkBtns()});
	}
	
	function checkBtns(){
		$('#leftBtn img').attr('src','/etc/static/rei-wcm/pix/common/carousel_buttons_brown_left.jpg');
		$('#rightBtn img').attr('src','/etc/static/rei-wcm/pix/common/carousel_buttons_brown_right.jpg');
		
		if (volVideoSlide.indx == 0){
			$('#leftBtn img').attr('src','/etc/static/rei-wcm/pix/common/carousel_buttons_greyed_left.jpg');
		}
		if (volVideoSlide.indx == volVideoSlide.slideCount) {
			$('#rightBtn img').attr('src','/etc/static/rei-wcm/pix/common/carousel_buttons_greyed_right.jpg');
		}
		if (volVideoSlide.indx > volVideoSlide.slideCount) {
			$('#rightBtn img').attr('src','/etc/static/rei-wcm/pix/common/carousel_buttons_greyed_right.jpg');
		}
	}
	
	function addClickListeners(){
		$('img.videoThumb').click(function(){
										   
		});
		$('#leftBtn').click(function(){
			if(!volVideoSlide.isSliding){
				setIndx('down');	
			}
		});
		$('#rightBtn').click(function(){
			if(!volVideoSlide.isSliding){
				setIndx('up');
			}
		});
	}
	
	volVideoSlide.init();
	
	// ----------------------------------------------------------------
	
	var volPhotoSlide = new Object();
	volPhotoSlide.slideCount = 0;
	volPhotoSlide.indx = 0;
	volPhotoSlide.speed = 5000;
	volPhotoSlide.isPlaying;
	volPhotoSlide.activeBtn;
	volPhotoSlide.prevBtn = '#photo0';
	volPhotoSlide.activeSlide;
	volPhotoSlide.activeCaption;
	volPhotoSlide.prevSlide = '#imageSlide0';
	volPhotoSlide.prevCaption = '#caption0';
	volPhotoSlide.init = function(){addPhotoClickListeners();volSlideCount();playSlides();};
	
	var photoTimer = 0;
	
	function volSlideCount(){
		var numLi = 0;
		$('a.photoBtn').each(function(){
			numLi++;								 
		});
		volPhotoSlide.slideCount = (numLi)-1;
	}
	
	function advanceSlide(){
		if(volPhotoSlide.indx < volPhotoSlide.slideCount){
			volPhotoSlide.indx++	
		} else {
			volPhotoSlide.indx = 0;
		}
		
		volPhotoSlide.activeBtn = '#photo' + volPhotoSlide.indx;
		volPhotoSlide.activeSlide = '#imageSlide' + volPhotoSlide.indx;
		volPhotoSlide.activeCaption = '#caption' + volPhotoSlide.indx;
		
		handleTransition();
		
		volPhotoSlide.prevBtn = volPhotoSlide.activeBtn;
		volPhotoSlide.prevSlide = volPhotoSlide.activeSlide;
		volPhotoSlide.prevCaption = volPhotoSlide.activeCaption;
	}
	
	function handleTransition(){
		$(volPhotoSlide.activeBtn).css('text-decoration','underline');
		$(volPhotoSlide.prevBtn).css('text-decoration','none');
		$(volPhotoSlide.activeSlide).fadeIn('fast');
		$(volPhotoSlide.prevSlide).fadeOut('fast');
		$(volPhotoSlide.prevCaption).css('display', 'none');
		$(volPhotoSlide.activeCaption).css('display','block');
	}
	
	function addPhotoClickListeners(){
		$('a.photoBtn').click(function(){
			pause();
			
			volPhotoSlide.indx = (this.id).substring(this.id.length-1, this.id.length);
			
			volPhotoSlide.activeBtn = '#photo' + volPhotoSlide.indx;
			volPhotoSlide.activeSlide = '#imageSlide' + volPhotoSlide.indx;
			volPhotoSlide.activeCaption = '#caption' + volPhotoSlide.indx;
			
			handleTransition();
			
			volPhotoSlide.prevBtn = volPhotoSlide.activeBtn;
			volPhotoSlide.prevSlide = volPhotoSlide.activeSlide;
			volPhotoSlide.prevCaption = volPhotoSlide.activeCaption;
			
		});
		$('#playPause').click(function(){
			togglePlay();
		});
	}
	
	function togglePlay(){
		if(volPhotoSlide.isPlaying){
			$('#playPause').css('background-image','url(../pix/common/playIcon.gif)');
			volPhotoSlide.isPlaying = false;
			clearInterval(photoTimer);
		} else {
			$('#playPause').css('background-image','url(../pix/common/pauseIcon.gif)');
			volPhotoSlide.isPlaying = true;
			advanceSlide();
			playSlides();
		}	
	}
	
	function pause(){
		$('#playPause').css('background-image','url(../pix/common/playIcon.gif)');
		volPhotoSlide.isPlaying = false;
		clearInterval(photoTimer);
	}
	
	function playSlides(){
		volPhotoSlide.isPlaying = true;
		photoTimer = setInterval(advanceSlide, volPhotoSlide.speed);	
	}
	
	volPhotoSlide.init();
	
	// ------------------------------------------------------------------------
	
	$('a.vidPopA').fancybox({
		'height': 380,
		'padding': 0,
		'width': 592,
		'scrolling':'no',
		'autoScale': false,
		'titlePosition' : 'inside',
		'type': 'iframe'
	});
	
	$('a.vidPopB').fancybox({
		'height': 470,
		'padding': 0,
		'width': 592,
		'scrolling':'no',
		'autoScale': false,
		'titlePosition' : 'inside',
		'type': 'iframe'
	});
	
	$('a.vidPopC').fancybox({
		'height': 430,
		'padding': 0,
		'width': 592,
		'scrolling':'no',
		'autoScale': false,
		'titlePosition' : 'inside',
		'type': 'iframe'
	});
	
});
/* $Id: versiona.js 1918 2012-03-30 17:55:27Z jowilso $ */

$(document).ready(function() {
	// Tab Control
	$('.tabs li').click(function() {
		// Tabs
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
		//used for authoring experience; check rel tag on li, if not undefined; reload page with current location plus rel attribute 
		if ($(this).attr('rel') !== undefined) {
			window.location = window.location.pathname + $(this).attr('rel');
		}
		
		// Panels
		var target = $(this).attr('target');
		$('.'+target).siblings().removeClass('active');
		$('.'+target).addClass('active');
	});
});
$( document ).ready( function() {

    var hash = window.location.hash;
    if ( hash.charAt( 0 ) == '#' ) hash = hash.substring( 1 );
    $.userprofile.showSection( hash );
    $.userprofile.setUpSectionLinks();
} );

$.userprofile = {};

$.userprofile.showSection = function( hash ) {
    if ( hash == "photos" ) {
        $.userprofile.activateProfileSection( "userProfile_photos" );
    } else if ( hash == "reviews" ) {
        $.userprofile.activateProfileSection( "userProfile_productReviews" );
    } else if ( hash == "activity" ) {
        $.userprofile.activateProfileSection( "userProfile_recentActivity" );
    } else {
        $.userprofile.activateProfileSection( "userProfile_profileDetails" );
    }
}

$.userprofile.activateProfileSection = function( tabId ) {
    $( "#userProfile_photos" ).css( "display", "none" );
    $( "#userProfile_productReviews" ).css( "display", "none" );
    $( "#userProfile_recentActivity" ).css( "display", "none" );
    $( "#userProfile_profileDetails" ).css( "display", "none" );
    $( "#" + tabId ).css( "display", "block" );
    var current = $.userprofile.currentTab;
    if ( current !== undefined ) {
        var handle = $( "#" + current + "_link span" );
        handle.wrap( '<a href="#"></a>' );
    }
    var handle = $( "#" + tabId + "_link a span" );
    handle.unwrap();
    $.userprofile.currentTab = tabId;
}

$.userprofile.setUpSectionLinks = function() {
    $( "#userProfile_photos_link" ).click( function() {
        $.userprofile.activateProfileSection( "userProfile_photos" )
    } );
    $( "#userProfile_productReviews_link" ).click( function() {
        $.userprofile.activateProfileSection( "userProfile_productReviews" )
    } );
    $( "#userProfile_recentActivity_link" ).click( function() {
        $.userprofile.activateProfileSection( "userProfile_recentActivity" )
    } );
    $( "#userProfile_profileDetails_link" ).click( function() {
        $.userprofile.activateProfileSection( "userProfile_profileDetails" )
    } );
}
/* $Id: rssfeed.js 1918 2012-03-30 17:55:27Z jowilso $ */
/* $Id: questionsummary.js 1918 2012-03-30 17:55:27Z jowilso $ */
/* $Id: questionprompt.js 1918 2012-03-30 17:55:27Z jowilso $ */

$(document).ready(function() {
	
	// Activate Ask a Question Button
	$('#questionprompt-button').click(function(event) {
		event.preventDefault();
		// Decide which interface to display
		if (loggedIn) {
			$('#questionprompt-form-section').toggle();
		} else {
			$('#questionprompt-login-section').toggle();
		}
	});
	
});
/* $Id: questionform.js 1956 2012-04-02 21:21:34Z rray $ */

/**
 * @(#)questionform.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 * 
 * TODO - client-side form validation
 */
$(document).ready(function() {
	
	if (loggedIn) {
		var REI_SESSION_ID = Get_Cookie("REI_SESSION_ID");
		if (REI_SESSION_ID) {
			var userId = REI_SESSION_ID.split(',')[0];
			var userScreenName = getUserInfoCookie('userName');
			var userProfileHref = '/share/socialprofile/profile.html/' + userId;
			var userImgSrc = '/socialprofile.socialprofileimage.jpg/' + userId;
			$('#questionform-user-img-link').attr('href', userProfileHref);
			$('#questionform-user-name-link').attr('href', userProfileHref);
			$('#questionform-user-name-link').text(userScreenName);
			$('#questionform-user-img').attr('src', userImgSrc);
			$('#questionform-user-img').attr('title', userScreenName);
			$('#questionform-user-img').attr('alt', userScreenName);
		}
	}
	
	// Activate Submit button
	$('#questionform-submit').click(function(event) {
		event.preventDefault();
		$('#questionform-form').submit();
	});
	
	$('#questionform-form').submit(function() {
		// submit the form 
	    $(this).ajaxSubmit({
	    	'dataType': 'json',
	    	'success': function(responseObj, statusText, xhr, elem) {
	    		if (responseObj.response == 'success') {
	    			window.location.href = responseObj.targetURL;
	    		} else {
	    			if (responseObj.message == 'missing_category') {
	    				$('#questionform-errormessage').text($('#questionform-missing-category-error-msg').attr('value'));
	    			} else if (responseObj.message == 'missing_question') {
	    				$('#questionform-errormessage').text($('#questionform-missing-question-error-msg').attr('value'));
	    			} else if (responseObj.message == 'question_too_long') {
	    				$('#questionform-errormessage').text($('#questionform-question-too-long-error-msg').attr('value'));
	    			} else if (responseObj.message == 'general_error') {
	    				$('#questionform-errormessage').text($('#questionform-general-error-msg').attr('value'));
	    			}
	    			$('#questionform-errormessage').show();
	    		}
	    	},
		    'error': function() {
		    	$('#questionform-errormessage').text($('#questionform-general-error-msg').attr('value'));
	    		$('#questionform-errormessage').show();
	    	}
	    }); 
	    // return false to prevent normal browser submit and page navigation 
	    return false;
	});	
	
	// Activate Add Photo Button
	$('#questionform-add-photo-button').click(function(event) {
		event.preventDefault();
		$('.uploadPhoto').toggle();
	});
	
	// Activate Add Video Button
//	$('#questionform-add-video-button').click(function(event) {
//		event.preventDefault();
//		$('.uploadVideo').toggle();
//	});
	
});
/* $Id: postedquestion.js 1956 2012-04-02 21:21:34Z rray $ */

/**
 * @(#)postedquestion.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 * 
 * TODO - client-side form validation
 */
$(document).ready(function() {
	
	if (loggedIn) {
		var REI_SESSION_ID = Get_Cookie("REI_SESSION_ID");
		if (REI_SESSION_ID) {
			var userId = REI_SESSION_ID.split(',')[0];
			var userScreenName = getUserInfoCookie('userName');
			var userProfileHref = '/share/socialprofile/profile.html/' + userId;
			var userImgSrc = '/socialprofile.socialprofileimage.jpg/' + userId;
			$('#postedquestion-user-img-link').attr('href', userProfileHref);
			$('#postedquestion-user-name-link').attr('href', userProfileHref);
			$('#postedquestion-user-name-link').text(userScreenName);
			$('#postedquestion-user-img').attr('src', userImgSrc);
			$('#postedquestion-user-img').attr('title', userScreenName);
			$('#postedquestion-user-img').attr('alt', userScreenName);
		}
	}
	
	// Activate Submit button
	$('#postedquestion-submit').click(function(event) {
		event.preventDefault();
		$('#postedquestion-form').submit();
	});
	
	// Activate Add Photo Button
	$('#postedquestion-add-photo-button').click(function(event) {
		event.preventDefault();
		$('.uploadPhoto').toggle();
	});
	
	$('#postedquestion-form').submit(function() {
		// submit the form 
	    $(this).ajaxSubmit({
	    	'dataType': 'json',
	    	'success': function(responseObj, statusText, xhr, elem) {
	    		if (responseObj.response == 'success') {
	    			window.location.href = window.location.href;
	    		} else {
	    			if (responseObj.message == 'general_error') {
	    				$('#postedquestion-errormessage').text($('#postedquestion-general-error-msg').attr('value'));
	    			} else if (responseObj.message == 'missing_answer') {
	    				$('#postedquestion-errormessage').text($('#postedquestion-no-answer-error-msg').attr('value'));
	    			}
			    	$('#postedquestion-errormessage').show();
	    		}
	    	},
		    'error': function() {
		    	$('#postedquestion-errormessage').text($('#postedquestion-general-error-msg').attr('value'));
		    	$('#postedquestion-errormessage').show();
	    	}
	    }); 
	    // return false to prevent normal browser submit and page navigation 
	    return false;
	});
	
	// Activate Answer It Button
	$('#postedquestion-answer-it-button').click(function(event) {
		event.preventDefault();
		// Decide which interface to display
		if (loggedIn) {
			$('#postedquestion-form-section').toggle();
		} else {
			$('#postedquestion-login-section').toggle();
			
		}
	});
	
	// Activate Add Video Button
//	$('#postedquestion-add-video-button').click(function(event) {
//		event.preventDefault();
//		$('.uploadVideo').toggle();
//	});
	
});
/* $Id: listing.js 1918 2012-03-30 17:55:27Z jowilso $ */
$(document).ready(function() {
	// Tab Control
	$('.tabs li').click(function() {
		// Tabs
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
		// Panels
		var target = $(this).attr('target');
		$('.'+target).siblings().removeClass('active');
		$('.'+target).addClass('active');
	});
});
/* $Id: featuredqa.js 1918 2012-03-30 17:55:27Z jowilso $ */
/* $Id: categoryaccordion.js 1918 2012-03-30 17:55:27Z jowilso $ */

// Yes, that's right, this file does nothing and can safely be removed. 
// It's init() function was conflicting with helpShared.js.

//$(document).ready(function(){
//	helpAccordion.init();
//	var openByDefault = $('#qacategoryaccordion-openByDefault').attr('value');
//	if (openByDefault) {
//		helpAccordion.openAllSections();
//	}
//});
/* $Id: answerdetail.js 1918 2012-03-30 17:55:27Z jowilso $ */

$(document).ready(function() {
	// Tab Control
	$('.tabs li').click(function() {
		// Tabs
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
		// Panels
		var target = $(this).attr('target');
		$('.'+target).siblings().removeClass('active');
		$('.'+target).addClass('active');
	});
});
/* $Id: login.js 1918 2012-03-30 17:55:27Z jowilso $ */
/* $Id: flag.js 1918 2012-03-30 17:55:27Z jowilso $ */

/**
 * @(#)flag.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 */
$(document).ready(function() {
	
	// Decide which interface to display
	if (loggedIn) {
		$('#flag-authenticated-link').show();		
	} else {
		$('#flag-unauthenticated-link').show();
	}
});
/* $Id: roll.js 1918 2012-03-30 17:55:27Z jowilso $ */
/* $Id: postlist.js 1918 2012-03-30 17:55:27Z jowilso $ */

function blogSearchTrackPageClick(blogPageNumber) {

CQ_Analytics.record({event: 'blogPageClicked', 
     values: {
        'blogSearchKeyword': '<%= xssAPI.encodeForJSString(query) %>',
        'blogSearchResults': '<%= blogSearchResults %>',
        'blogPageNumber': blogPageNumber},
    componentPath: '<%=resource.getResourceType()%>'
    });
    return false;
}
/* $Id: ratings.js 1918 2012-03-30 17:55:27Z jowilso $ */

$( document ).ready( function() {

    if ( $.blogRating === undefined ) return;

    $.blogRating.processResults = function( data ) {
        var response = $.parseJSON( data );

        var hasUserVoted = response[ "user_vote" ];
        hasUserVoted = ( hasUserVoted === "true" );
        var thumbsUpCount = response[ "total_up" ];
        var thumbsDownCount = response[ "total_down" ];

        $( "#thumbs_1" ).html( "(" + thumbsUpCount + ")" );
        $( "#thumbs_0" ).html( "(" + thumbsDownCount + ")" );

        if ( hasUserVoted ) {
            $( "#rating_alreadyVoted" ).css( "display", "block" );
            $( "#rating_notVoted" ).css( "display", "none" );
        } else {
            $( "#rating_alreadyVoted" ).css( "display", "none" );
            $( "#rating_notVoted" ).css( "display", "inline" );
        }
    }

    $.ajax( {
        url: $.blogRating.getUrl,
        type: "GET",
        data: {
            _charset_: $.blogRating.charset,
            userIdentifier: $.blogRating.userId
        },
        success: function( data ) {
            $.blogRating.processResults( data );
        }
    } );

    $( "#rating_thumbsUp" ).click( function() {
        $.ajax( {
            url: $.blogRating.postUrl,
            type: "POST",
            data: {
                _charset_: $.blogRating.charset,
                userIdentifier: $.blogRating.userId,
                rating: 100
            },
            success: function( data ) {
                $.blogRating.processResults( data );
            }
        } );
    } );

    $( "#rating_thumbsDown" ).click( function() {
        $.ajax( {
            url: $.blogRating.postUrl,
            type: "POST",
            data: {
                _charset_: $.blogRating.charset,
                userIdentifier: $.blogRating.userId,
                rating: 50
            },
            success: function( data ) {
                $.blogRating.processResults( data );
            }
        } );
    } );
} );
/* $Id: featuredpost.js 1918 2012-03-30 17:55:27Z jowilso $ */
 $(document).ready(function() {
	if (/commentSortOrder=oldest/.exec(location.href)) {
		$('#commentSortOrder').val('oldest');
	}
	else {
		$('#commentSortOrder').val('newest');	
	};
 });
 
 $('#commentSortOrder').change(function(e) {
	if ($('#commentSortOrder').val() == 'newest') {
		
		var href2 = location.href.replace(/\?commentSortOrder=.*\&/, '');
		if (/&/.exec(href2))
			href2= href2.replace(/\&/, '?');
		
		location.href=href2;
    }
	else{
		var href1 = location.href.replace(/#.*/, '');
		var afterPound ="";
		if (/#/.exec(location.href))
			afterPound =location.href.replace(/.*#/, '#');
		if (/\?/.exec(location.href)) {
			location.href = href1.replace(/\?/, '?commentSortOrder=oldest&') + afterPound;
		}
		else {
				location.href = href1 + '?commentSortOrder=oldest&' + afterPound;
		}
	}
	
	e.stopPropagation();
 });
$( document ).ready( function() {
    if ( $.popuptemplate === undefined ) return;

    try {
        var width = parseInt( $.popuptemplate.width );
        var height = parseInt( $.popuptemplate.height );
    } catch ( e ) {
        return;
    }

    if (
        width === undefined || height === undefined ||
        width <= 0 || height <= 0 ) {
        return;
    }

    window.resizeTo( width, height );
} );
/* $Id: videottt.js 1918 2012-03-30 17:55:27Z jowilso $ */

$(document).ready(function() {
	$('.videos').fancybox({
	'height': 330,
	'padding': 0,
	'width': 570,
	'scrolling':'no',
	'autoScale': false,
	'titlePosition' : 'inside',
	'type': 'iframe'
	});
});
/* $Id: loginarea.js 1918 2012-03-30 17:55:27Z jowilso $ */

	ReiUserLogin = {
    	helloUserNameLabel  : "Hello ",
        welcomeUserLabel    : "Welcome to REI!",
        notUserLabel        : "Not "
	};
/* $Id: ticker.js 1918 2012-03-30 17:55:27Z jowilso $ */

$(document).ready(function() {
	$('.tickerContainer').each(function() {
		$(this).ticker();
	});
});
$( document ).ready( function() {
    $( "#container a.popupLink" ).click( function() {

        var href = $( this ).attr( "href" );

        try {
            var width = parseInt( $( this ).attr( "popup_width" ) );
            var height = parseInt( $( this ).attr( "popup_height" ) );
            var addScroll = $( this ).attr( "popup_scroll" ) == 1 ? true : false;
        } catch ( e ) {
            var width = 700;
            var height = 460;
        }
        if ( width === undefined || isNaN( width ) || width <= 0 ) width = 700;
        if ( height === undefined || isNaN( height )|| height <= 0 ) height = 460;
        var scroll = addScroll ? 'auto' : 'no';

        var name = "REI";
        var options = "width=" + width + ",height=" + height + ",titlebar=no,resizable=1,scrollbars=" + scroll;

        window.open( href, name, options );
        return false;
    } );

    $( "#container a.fancybox" ).each( function() {

        try {
            var width = parseInt( $( this ).attr( "popup_width" ) );
            var height = parseInt( $( this ).attr( "popup_height" ) );
            var addScroll = $( this ).attr( "popup_scroll" ) == 1 ? true : false;
        } catch ( e ) {
            var width = 700;
            var height = 460;
        }
        if ( width === undefined || isNaN( width ) || width <= 0 ) width = 700;
        if ( height === undefined || isNaN( height )|| height <= 0 ) height = 460;
        var scroll = addScroll ? 'auto' : 'no';

        $( this ).fancybox( {
            'height': height,
            'width': width,
            'padding': 25,
            'type': 'iframe',
            'scrolling': scroll
        } );
    } );
} );

/* $Id: script.js 1958 2012-04-02 21:29:19Z mgraham $ */
	$(document).ready(function(){
		$("#Lookup").validate();
	});

/* $Id: basicmarquee.js 1918 2012-03-30 17:55:27Z jowilso $ */

$(document).ready(function() {
	$('.marqueeImage').each(function(index) {
		//Initiate slideshow if more than one image
		var componentId = $(this).attr('id');		
		var imgCount = $(this).find('.slides').length;	//get the total count of images
		if (imgCount > 1) {	
			var displaySpeedMs = 3000;
			var customDisplaySpeedS = $('#' + componentId + '-displaySpeedS').attr('value');
			if (customDisplaySpeedS) {
				displaySpeedMs = customDisplaySpeedS * 1000;
			}
			//initialize the slide show	
			initMarqueeImageSlideShow(componentId, imgCount, displaySpeedMs);
			//display pagination
			$('#' + componentId + '-thumbs').show();
		}
	});
});
/* $Id: accordion.js 1918 2012-03-30 17:55:27Z jowilso $ */

$(document).ready(function(){
	helpAccordion.init();
	var openByDefault = $('#accordion-openByDefault').attr('value');
	if (openByDefault) {
		helpAccordion.openAllSections();
	}
});
$(document).ready(function() {
	$('.sizechart').fancybox({
	'padding': 0,
	'scrolling':'auto',
	'autoScale': false,
	'titlePosition' : 'inside',
	'type': 'iframe'
	});
});
/* $Id: shippingtimelinetable.js 1918 2012-03-30 17:55:27Z jowilso $ */

$( document ).ready( function() {
    $( "#rspuSelector" ).change( function() {
        var selection = $( this ).find( "option:selected" );

        var earliest = $( selection ).attr( "earliestDate" );
        var latest = $( selection ).attr( "latestDate" );

        var isUndefined = ( earliest === undefined && latest === undefined );
        var isNull = ( earliest == null && latest == null );
        var isEmpty = ( earliest == "" && latest == "" );

        var dateDisplay = $( "#rspuSelectorDatesDisplay" );

        if ( isUndefined || isNull || isEmpty ) {
            dateDisplay.slideUp( "fast" );
            return;
        }

        $( "#rspuDisplay1" ).text( earliest );
        $( "#rspuDisplay2" ).text( latest );

        var areDatesVisible = $( dateDisplay ).is( ":visible" );
        if ( !areDatesVisible ) dateDisplay.slideDown( "fast" );
    } );
} );


function scrollToPoint( pixelPt ){
    document.location.href = '#freeShipWithRSPU';
}
