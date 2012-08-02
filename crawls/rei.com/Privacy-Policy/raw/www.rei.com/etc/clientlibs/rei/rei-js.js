$(document).ready(function(){
	$('.bikeBrandsModal').fancybox({
		'height': 400,
		'padding': 10,
		'width': 200,
		'scrolling':'no',
		'autoScale': false,
		'titleShow': false,
		'type': 'iframe'
	});
});
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
/* $Id: posterprofile.js 2270 2012-04-12 19:27:33Z rray $ */

/**
 * @(#)posterprofile.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 */
$( document ).ready( function() {

    $( "#gridViewLink" ).click( function( e ) {
        $( "#photoListView" ).hide();
        $( "#photoGridView" ).show();
        var listItem = $('#photoListView .tabs li.active'); 
        var listItemLI = $( "#photoGridView .tabs li");
        var listItemIndex = $('#photoListView .tabs li').index(listItem);
        listItemLI.removeClass("active");
        listItemLI.eq(listItemIndex).attr("class","active");
        e.stopPropagation();
        return false;
    } );

    $( "#listViewLink" ).click( function( e ) {
        $( "#photoGridView" ).hide();
        $( "#photoListView" ).show();
        var listItem = $('#photoGridView .tabs li.active'); 
        var listItemLI = $( "#photoListView .tabs li");
        var listItemIndex = $('#photoGridView .tabs li').index(listItem);
        listItemLI.removeClass("active");
        listItemLI.eq(listItemIndex).attr("class","active");
        e.stopPropagation();
        return false;
    } );

} );
$( document ).ready( function() {

    var hash = window.location.hash;
    if ( hash.charAt( 0 ) == '#' ) hash = hash.substring( 1 );
    $.userprofile.showSection( hash );
    $.userprofile.setUpSectionLinks();

    $( "#seeAllCommentsLink" ).click( $.userprofile.showAllComments );

} );

$.userprofile = {};

$.userprofile.showAllComments = function() {
    $( "#comments_short" ).css( "display", "none" );
    $( "#comments_long" ).css( "display", "block" );

    var handle = $( "#userProfile_recentActivity_link" );
    handle.wrap( '<a href="#"></a>' );
}

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
    if ( tabId == "userProfile_recentActivity" ) {
        $( "#comments_long" ).css( "display", "none" );
        $( "#comments_short" ).css( "display", "block" );
    }
    $( "#" + tabId ).css( "display", "block" );
    var current = $.userprofile.currentTab;
    if ( current !== undefined ) {
        var handle = $( "#" + current + "_link" );
        if ( !$( handle ).parent().is( "a" ) ) {
            $( handle ).wrap( '<a href="#"></a>' );
        }
    }
    var handle = $( "#" + tabId + "_link" );
    if ( $( handle ).parent().is( "a" ) ) {
        handle.unwrap();
    }
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

$.userprofile.paginatePopularList = function( pageSize ) {
    if ( pageSize === undefined || pageSize == null || pageSize == "" ) {
        pageSize = 15;
    }

    $( '#popularListView' ).pajinate( {
        items_per_page: pageSize,
        item_container_id: '.popularListContent',
        num_page_links_to_display: 4,
        nav_panel_id: '.pagination',
        nav_label_prev : '',
        nav_label_next : ''
    } );
}

$.userprofile.paginateNewestList = function( pageSize ) {
    if ( pageSize === undefined || pageSize == null || pageSize == "" ) {
        pageSize = 15;
    }

    $( '#newestListView' ).pajinate( {
        items_per_page: pageSize,
        item_container_id: '.newestListContent',
        num_page_links_to_display: 4,
        nav_panel_id: '.pagination',
        nav_label_prev : '',
        nav_label_next : ''
    } );
}

$.userprofile.paginatePopularGrid = function( pageSize ) {
    if ( pageSize === undefined || pageSize == null || pageSize == "" ) {
        pageSize = 15;
    }

    $( '#popularGridView' ).pajinate( {
        items_per_page: pageSize,
        item_container_id: '.popularGridContent',
        num_page_links_to_display: 4,
        nav_panel_id: '.pagination',
        nav_label_prev : '',
        nav_label_next : ''
    } );
}

$.userprofile.paginateNewestGrid = function( pageSize ) {
    if ( pageSize === undefined || pageSize == null || pageSize == "" ) {
        pageSize = 15;
    }

    $( '#newestGridView' ).pajinate( {
        items_per_page: pageSize,
        item_container_id: '.newestGridContent',
        num_page_links_to_display: 4,
        nav_panel_id: '.pagination',
        nav_label_prev : '',
        nav_label_next : ''
    } );
}
/* $Id: sharethis.js 1918 2012-03-30 17:55:27Z jowilso $ */
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
/* $Id: questionform.js 2527 2012-04-25 16:09:54Z rray $ */

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
	    			if (responseObj.errorCode == 'missing_category') {
	    				$('#questionform-errormessage').text($('#questionform-missing-category-error-msg').attr('value'));
	    			} else if (responseObj.errorCode == 'missing_question') {
	    				$('#questionform-errormessage').text($('#questionform-missing-question-error-msg').attr('value'));
	    			} else if (responseObj.errorCode == 'question_too_long') {
	    				$('#questionform-errormessage').text($('#questionform-question-too-long-error-msg').attr('value'));
	    			} else if (responseObj.errorCode == 'general_error') {
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
/* $Id: postedquestion.js 2527 2012-04-25 16:09:54Z rray $ */

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
	    			if (responseObj.errorCode== 'general_error') {
	    				$('#postedquestion-errormessage').text($('#postedquestion-general-error-msg').attr('value'));
	    			} else if (responseObj.errorCode== 'missing_answer') {
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
/* $Id: listing.js 2609 2012-04-27 21:00:47Z rthatch $ */
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
/* $Id: helpratings.js 1918 2012-03-30 17:55:27Z jowilso $ */

$( document ).ready( function() {

    if ( $.helpfulRating === undefined ) {
    	$.helpfulRating = {};
    }

    $.helpfulRating.processResults = function( data , percentHelpfulId) {
    	if (data && data['response'] === 'true') {
	        var hasUserVoted = data[ "user_vote" ];
	        hasUserVoted = ( hasUserVoted === "true" );
	        var thumbsUpCount = new Number(data[ "total_up" ]);
	        var thumbsDownCount = new Number(data[ "total_down" ]);
	        var totalVoteCount = new Number(thumbsDownCount + thumbsUpCount);
	        totalVoteCount = totalVoteCount;
	        var percentThumbsUp = thumbsUpCount.toFixed(2) / totalVoteCount.toFixed(2);
	        percentThumbsUp = percentThumbsUp.toFixed(2);
	        percentThumbsUp *= 100;
	
	        if (!isNaN(percentThumbsUp)) {
		        $('#' + percentHelpfulId).text(percentThumbsUp + '%');  
	        }
	        var notVotedId = percentHelpfulId.replace('percentHelpful', 'rating_notVoted');
	        var alreadyVotedId = percentHelpfulId.replace('percentHelpful', 'rating_alreadyVoted');
	        if ( hasUserVoted ) {
	            $( '#' + alreadyVotedId ).css( "display", "block" );
	            $( '#' + notVotedId ).css( "display", "none" );
	        } else {
	            $( '#' + alreadyVotedId ).css( "display", "none" );
	            $( '#' + notVotedId ).css( "display", "inline" );
	        }
    	}
    }
    
    $('.helpfulratings-helpfulButton').each(function (i, elem) {
    	var buttonId = $(elem).attr('id');
    	var getURLId = buttonId.replace('helpfulButton', 'getURL');
    	var percentHelpfulId = buttonId.replace('helpfulButton', 'percentHelpful');
    	var getURL = $('#' + getURLId).val();
    	$.ajax( {
            url: getURL,
            type: "GET",
            data: {
            	
            },
            success: function( data ) {
                $.helpfulRating.processResults(data, percentHelpfulId);
            }
        } );
    });

    $( ".helpfulratings-helpfulButton" ).click( function(event) {
    	event.preventDefault();
    	var buttonId = $(this).attr('id');
    	var postURLId = buttonId.replace('helpfulButton', 'postURL');
    	var percentHelpfulId = buttonId.replace('helpfulButton', 'percentHelpful');
    	var postURL = $('#' + postURLId).val();
        $.ajax( {
            url: postURL,
            type: "POST",
            data: {
                rating: 100
            },
            success: function( data ) {
                $.helpfulRating.processResults( data, percentHelpfulId );
            }
        } );
    } );

    $( ".helpfulratings-noHelpButton" ).click( function(event) {
    	event.preventDefault();
    	var buttonId = $(this).attr('id');
    	var postURLId = buttonId.replace('noHelpButton', 'postURL');
    	var percentHelpfulId = buttonId.replace('noHelpButton', 'percentHelpful');
    	var postURL = $('#' + postURLId).val();
        $.ajax( {
            url: postURL,
            type: "POST",
            data: {
                rating: 50
            },
            success: function( data ) {
                $.helpfulRating.processResults( data, percentHelpfulId );
            }
        } );
    } );
} );
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
/* $Id: answeritem.js 2270 2012-04-12 19:27:33Z rray $ */

$(document).ready(function() {
	// Decide which interface to display
	if (loggedIn) {
		$('.rating-box-question-authenticated').show();	
	} else {
		$('.rating-box-question-unauthenticated').show();
	}
	
	// Activate Reply Button
	$('.answeritem-replybutton').click(function(event) {
		event.preventDefault();
		var buttonId = $(this).attr('id');
		if (buttonId) {
			var formId = buttonId.replace('replybutton', 'replyform');
			$('#' + formId).toggle();
		}
	});
	
	// Activate Submit button
	$('.replyform-submitbutton').click(function(event) {
		event.preventDefault();
		var buttonId = $(this).attr('id');
		if (buttonId) {
			var formId = buttonId.replace('-submitbutton', '');
			var errorMsgElemId = formId + '-errormessage';
			// submit the form 
			$('#' + formId).ajaxSubmit({
		    	'dataType': 'json',
		    	'success': function(responseObj, statusText, xhr, elem) {
		    		if (responseObj.response == 'success') {
		    			// Reload page
		    			window.location.href = window.location.href;
		    		} else {
		    			// Display error message
		    			if (responseObj.errorCode == 'general_error') {
		    				$('#' + errorMsgElemId).text($('#postedquestion-general-error-msg').attr('value'));
		    			} else if (responseObj.errorCode== 'missing_answer') {
		    				// TODO
		    				$('#' + errorMsgElemId).text($('#postedquestion-no-answer-error-msg').attr('value'));
		    			}
				    	$('#' + errorMsgElemId).show();
		    		}
		    	},
			    'error': function() {
			    	// Display error message
			    	$('#' + errorMsgElemId).text($('#postedquestion-general-error-msg').attr('value'));
			    	$('#' + errorMsgElemId).show();
		    	}
		    }); 
		}
	});
	
});
/* $Id: answerform.js 2270 2012-04-12 19:27:33Z rray $ */
/* $Id: answerdetail.js 2274 2012-04-12 21:16:58Z rray $ */

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
/* $Id: posterprofile.js 2270 2012-04-12 19:27:33Z rray $ */

/**
 * @(#)posterprofile.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 */
$(document).ready(function(){
	$('#rei-galleryShowMe').click(function(){
		if(document.getElementById('popular').checked) {
			$("#rei-galleryHomeLink-popular").show();
			$("#rei-galleryHomeLink-newest").hide();
		}else if(document.getElementById('newest').checked) {
			$("#rei-galleryHomeLink-popular").hide();
			$("#rei-galleryHomeLink-newest").show();
		}
	});
});
/* $Id: sharewizard.js 2270 2012-04-12 19:27:33Z rray $ */

/**
 * @(#)sharewizard.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 */
$(document).ready(function() {
	
	// Initialize modal
	$('#sharewizard-share-button').fancybox({
		'height': 600,
		'padding': 0,
		'width': 810,
		'scrolling':'no',
		'autoScale': false,
		'titleShow': false,
		'type': 'iframe',
		'href': $('#sharewizard-modal-href').attr('value'),
		'modal': true
	});
	
	// Decide which interface to display
	if (loggedIn) {
		$('#sharewizard-authenticated').show();		
	} else {
		$('#sharewizard-unauthenticated').show();
	}

});
/* $Id: photolocation.js 2270 2012-04-12 19:27:33Z rray $ */

$(document).ready(function() {
	if (document.getElementById("photoMap")) {
		var lat = $("#photolocation-latitude").attr('value');
		var long = $("#photolocation-longitude").attr('value');
		var myOptions = {
		  center: new google.maps.LatLng(lat, long),
		  zoom: 8,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("photoMap"), myOptions);
		var marker = new google.maps.Marker({
			map: map,
			position: map.getCenter()
		}); 
	}
});
/* $Id: photogallery.js 2270 2012-04-12 19:27:33Z rray $ */
$(document).ready(function() {
	$('#chooseTheme').change(function() {
		var newLoc = $(this).val();
		if (newLoc) {
			window.location = $(this).val();
		}
		return false;
	});
});
/* $Id: login.js 1918 2012-03-30 17:55:27Z jowilso $ */
/**
 * @(#)flag.js
 *
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 *
 * @author Sachita Chetan
 * @author Scott Flesher
 */
$( document ).ready( function () {

    $( ".flagAsInappropriate" ).each( function() {
        $( this ).click( function ( e ) {
            var postUrl = $( this ).data( "postUrl" );
            var formSubmitLink = $( "#flag_submit a" );
            formSubmitLink.data( "postUrl", postUrl );
            var originalLinkId = $( this ).attr( "id" );
            formSubmitLink.data( "originalLinkId", originalLinkId );
            $( this ).fancybox( {
                'height': 300,
                'width': 300,
                'onClosed': function() {
                    $( "#flagPopupForm" ).clearForm();
                }
            } );
            if ( $( this ).data( "click" ) == undefined ) {
                $( this ).data( "click", "clicked" );
                $( this ).click();
            }
            e.stopPropagation();
            return false;
        } );
    } );

    $( "#flag_submit a" ).click( function( e ) {
        var formData = $( "#flagPopupForm" ).serialize();
        var originalLinkId = $( this ).data( "originalLinkId" );
        $.ajax( {
            url: $( this ).data( "postUrl" ),
            type: "POST",
            data: formData,
            success: function( data ) {
                $( "#" + originalLinkId ).replaceWith( "<span>comment flagged</span>" );
                $.fancybox.close();
            }
        } );
        e.stopPropagation();
        return false;
    } );

} );
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
/* $Id: ratings.js 3443 2012-06-18 20:00:00Z sfleshe $ */

function reiRatingProcessResults( data, isLoggedIn ) {
    var response = data;
    if ( typeof( data ) == "string" ) {
        response = $.parseJSON( data );
    }

    var hasUserVoted = response[ "user_vote" ];
    hasUserVoted = ( hasUserVoted === "true" );
    var thumbsUpCount = response[ "total_up" ];
    var thumbsDownCount = response[ "total_down" ];

    $( "#thumbs_1" ).html( "(" + thumbsUpCount + ")" );
    $( "#thumbs_0" ).html( "(" + thumbsDownCount + ")" );

    if ( isLoggedIn ) {
        if ( hasUserVoted ) {
            $( "#rating_alreadyVoted" ).css( "display", "block" );
            $( "#rating_notVoted" ).css( "display", "none" );
        } else {
            $( "#rating_alreadyVoted" ).css( "display", "none" );
            $( "#rating_notVoted" ).css( "display", "inline" );
        }
    }
}

$( document ).ready( function() {

    if ( $.isEmptyObject( $.reishare ) ) return;
    var isLoggedIn = $.reishare( "loggedIn" );

    if ( $.isEmptyObject( $.blogRating ) ) {
        $.blogRating = {};
    }

    $.ajax( {
        url: $.blogRating.getUrl,
        type: "GET",
        data: {
            _charset_: $.blogRating.charset
        },
        success: function( data ) {
            reiRatingProcessResults( data, isLoggedIn );
        }
    } );

    if ( !isLoggedIn ) {
        $( "#rating_alreadyVoted" ).css( "display", "none" );
        $( "#rating_notVoted" ).css( "display", "none" );
    }

    if ( isLoggedIn ) {
        $( "#rating_thumbsUp" ).click( function() {
            var postUrl = $( this ).data( "postUrl" );
            $.ajax( {
                url: postUrl,
                type: "POST",
                data: { rating: 100 },
                success: function( data ) {
                    reiRatingProcessResults( data, isLoggedIn );
                }
            } );
        } );

        $( "#rating_thumbsDown" ).click( function() {
            var postUrl = $( this ).data( "postUrl" );
            $.ajax( {
                url: postUrl,
                type: "POST",
                data: { rating: 50 },
                success: function( data ) {
                    reiRatingProcessResults( data, isLoggedIn );
                }
            } );
        } );
    }

} );

/* $Id: featuredpost.js 1918 2012-03-30 17:55:27Z jowilso $ */
$( document ).ready( function() {

    $( ".commentNav" ).loggedInScan( {
        loggedInSelector: ".rei-loggedIn",
        notLoggedInSelector: ".rei-notLoggedIn",
        isLoggedInFn: function() {
            return Boolean( loggedIn );
        }
    } );

    if ( /commentSortOrder=oldest/.exec( location.href ) ) {
        $('#commentSortOrder').val('oldest');
    } else {
        $('#commentSortOrder').val('newest');
    }

    $( "#comments a.btnWriteComment" ).toggle( function( e ) {
        e.preventDefault();
        var commentSection = $( "#rei-commentForm" );
        var formOrPrompt = $( commentSection ).children( ".rei-postcommentform, .rei-loginprompt" );
        $( formOrPrompt ).show();
        return false;
    }, function( e ) {
        e.preventDefault();
        var commentSection = $( "#rei-commentForm" );
        var formOrPrompt = $( commentSection ).children( ".rei-postcommentform, .rei-loginprompt" );
        $( formOrPrompt ).hide();
        return false;
    } );
} );
 
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

 function toggleReplyForm( buttonId, formId, url ) {
     var form = document.getElementById( formId );
     var button = document.getElementById( buttonId );
     if ( $( form ).is(":visible") ) {
         $( form ).hide();
         $( button ).text( "Reply" );
     } else {
         form.style.display = "block";
         $( form ).find( ".rei-postcommentform" ).show();
         $( button ).text( "Cancel" );
     }
 }

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

/* $Id:  $ */
/* $Id: popupgameteaser.js 1958 2012-04-02 21:29:19Z rray $ */
$(document).ready(function(){
	$("#Lookup").validate();
});

$(document).ready(function() {
	$('#EACategories.tabs li').click(function() {
		// Tabs
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
		// Panels
		var target = $(this).attr('target');
		$('.'+target).siblings().removeClass('active');
		$('.'+target).addClass('active');
	});
	
	$('.seeAll').click(function() {
		var $table = $(this).parent("div").find("table");
		var seeAllText = $('div.active .seeAll').text();
		var currTabText = $('li.active').text();
		if (seeAllText.indexOf('All') > -1) {
	    	$table.find("tr[id = 'hidden']").removeClass("hide");
			$('div.active .seeAll').text('See First 10 ' + currTabText + ' Articles');
		} else {
	    	$table.find("tr[id = 'hidden']").addClass("hide");
			$('div.active .seeAll').text('See All ' + currTabText + ' Articles');
		}
		$table.find("tr:visible")
	    .filter(':even')
	    .removeClass('even').addClass('odd')
	    .end().filter(':odd')
	    .removeClass('odd').addClass('even');
		return false;
	});
	
	$(function() {
        $("div.sortableEACategories").each(function() {
            var $table = $(this).find("table");
            $table.tablesorter({widthFixed: true, widgets: ['zebra']});
            $table.find("th#initialSort").trigger('click');
        });

	});
});
$(document).ready(function(){
	$('.authorBio').fancybox({
		'height': 235,
		'padding': 10,
		'width': 540,
		'scrolling':'no',
		'autoScale': false,
		'titleShow': false,
		'type': 'iframe'
	});
	
		// Tab Control
	$('#EACategories.tabs li').click(function() {
		// Tabs
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		
		// Panels
		var target = $(this).attr('target');
		$('.'+target).siblings().removeClass('active');
		$('.'+target).addClass('active');
	});
	
	$('.seeAll').click(function() {
		var $table = $(this).parent("div").find("table");
		var seeAllText = $('div.active .seeAll').text();
		var currTabText = $('li.active').text();
		if (seeAllText.indexOf('All') > -1) {
        	$table.find("tr[id = 'hidden']").removeClass("hide");
			$('div.active .seeAll').text('See First 10 ' + currTabText + ' Articles');
		} else {
        	$table.find("tr[id = 'hidden']").addClass("hide");
			$('div.active .seeAll').text('See All ' + currTabText + ' Articles');
		}
		$table.find("tr:visible")
        .filter(':even')
        .removeClass('even').addClass('odd')
        .end().filter(':odd')
        .removeClass('odd').addClass('even');
		return false;
	});

	$(function() {
        $("div.sortableEACategories").each(function() {
            var $table = $(this).find("table");
            $table.tablesorter({widthFixed: true, widgets: ['zebra']});
            $table.find("th#initialSort").trigger('click');
        });

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
$( function() {

    // Set up click event on "go" button.
    $( "#storeDropdown-button" ).click( function( e ) {

        e.preventDefault();

        var form = $( "#selectMenu" );
        if ( form == null ) return;

        var url = $( form ).val();
        if ( url != null && url != "" ) window.location = url;

        return false;
    } );

    if (
        typeof STORE_DATA_XML_FEED == 'undefined' ||
        STORE_DATA_XML_FEED == null ||
        STORE_DATA_XML_FEED == "" ) return;

    $.get( STORE_DATA_XML_FEED, {}, function( reiStores ) {

        var stores = [];

        // Locate all 'item' elements and collect store data
        $( reiStores ).find( 'item' ).each( function() {
            stores.push( {
                link:  $( this ).find( 'link'  ).text(),
                state: $( this ).find( 'state' ).text(),
                title: $( this ).find( 'title' ).text()
            } )
        } );

        // Build an <option> element for every store
        $( stores ).each( function() {
            var link  = this.link;
            var text = this.state + " - " + this.title;
            var option = "<option value=" + link + ">" + text + "</option>";
            $( "#selectMenu" ).append( option );
        } );
    } );
} );
$( document ).ready( function() {
    console.log( "difference popup" );
    jQuery( '.reiDifference-popupLauncher' ).fancybox( {
        'height': 600,
        'padding': 10,
        'width': 690,
        'scrolling':'no',
        'autoScale': false,
        'titleShow': false,
        'type': 'iframe'
    } );
} );
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
rei.hover = {
		showHoverText: function($src){
			$('.js-hover',$src).removeClass('is-hidden').css({left:$src.offset().left});
		},
		hideHoverText: function($src){
			$('.js-hover',$src).addClass('is-hidden');
		}
};

/* $Id: script.js 1958 2012-04-02 21:29:19Z mgraham $ */
	$(document).ready(function(){
		$("#Lookup").validate();
	});

/* $Id: posterprofile.js 2270 2012-04-12 19:27:33Z rray $ */

/**
 * @(#)posterprofile.js
 * 
 * COPYRIGHT (c) 2012 by Recreational Equipment Incorporated. All rights reserved.
 * 
 * @author rray
 */
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
jQuery('#wlSearch').click(function(){
		$("#wlSearch").validate({
				rules: {
					firstName: {
						required: true,
						minlength: 2
					},
					lastName: {
						required: true,
						minlength: 2
					}
				},
				messages: {
					firstName: {
						required: "This field is required.",
							minlength: "Please enter at least 2 characters."
					},
					lastName: {
						required: "This field is required.",
							minlength: "Please enter at least 2 characters."
					}
				},
					 submitHandler: function(form) {
					    form.submit();
					}
		});
	});
function chkMandatory(objControl,strMessage,setFocusOnError){
var lbSetFocus    = new Boolean(true);
 var strVal        = objControl.value;
var strType        = objControl.type;

if (typeof(setFocusOnError) == 'boolean')
    lbSetFocus    = setFocusOnError;

if (strType=='select-multiple' || strType=='select-one')
{
    if (objControl.options.selectedIndex<=0)
    {
        alert(strMessage);
        if (lbSetFocus)
            objControl.focus();
        return false;
    }
}
else if (objControl.type=='radio' || objControl.type=='checkbox')
{
    if (objControl.checked == false)
    {
        alert(strMessage);
        if (lbSetFocus)
            objControl.focus();
        return false;
    }
}
else if (objControl.length > 1 && objControl[0].type=='radio')
{
    var rvalue = 0;
    for(var i=0; i<objControl.length; i++)
    {
        if (objControl[i].checked == true)
        {
             rvalue = 1;
            break
        }
    }
    if (rvalue == 0)
    {
        alert(strMessage);
        if (lbSetFocus)
            objControl[0].focus();
        return false;
    }
}
else
{
    var outStr = "";

    for (var n = 1 ; n <= strVal.length ; n++) 
    {
        if (strVal.substring(n-1,n) == " ") 
        { 
            outStr+=""; 
        }
        else 
        { 
            outStr+=strVal.substring(n-1,n); 
        }
    }

    if (outStr == "")
    {
        objControl.value=outStr;
        alert(strMessage);
        if (lbSetFocus)
            objControl.focus();
        return false;
    }
}
return true;
}

        
function ValidateForm1()
{    
var zip = document.frmPickLoc.txtZipCode;

       if (zip.value.length == 0) {
   
	if(!chkMandatory(document.frmPickLoc.selStateID,"Please select a state")) {
		return false;	
	} else {	
	 return true;		 
	 }
       } else {
    
       return ValidateForm2();
       }
	
}

	
function LinkSubmit()
{
	if(document.frmPickLoc.onsubmit())
	{
		document.frmPickLoc.submit();
	}
}

function ValidateForm2()
{	
	var zip = document.frmPickLoc.txtZipCode;
	
	if (zip.value.length > 0) {			
		if (zip.value.length < 5 || zip.value.length > 7) {
			alert('ZIP or Postal Code must be between 5 and 7 characters.');
			zip.focus();
			return false;
		}
		if (zip.value.length == 5) {
			// US ZIP
			if (! _CF_checkinteger(zip.value)) {
				alert('5-digit (US) ZIP codes must be numeric.');
				return false;
			}
		}
		else {
			// Canadian Postal Code
			if (zip.value.length == 6) {
				zip.value = zip.value.substr(0,3) + ' ' + zip.value.substr(3);
			}
			var regExpPattern = /[A-Za-z]{1,1}[0-9]{1,1}[A-Za-z]{1,1} [0-9]{1,1}[A-Za-z]{1,1}[0-9]{1,1}/;
			if (! regExpPattern.test(zip.value)) {
				alert('US ZIP Codes must contain 5 digits.\\nCanadian Postal Codes must be in the form A9A 9A9, where A is a letter and 9 is a number.');
				return false;
			}
		}
	}
	
	return true;
}

	function _CF_checknumber(object_value) {
	if (object_value.length == 0)
		return true;

	var start_format = " .+-0123456789";
	var number_format = " .0123456789";
	var check_char;
	var decimal = false;
	var trailing_blank = false;
	var digits = false;

	check_char = start_format.indexOf(object_value.charAt(0));

	if (check_char == 1)
		decimal = true;
	else if (check_char < 1)
		return false;

	for (var i = 1; i < object_value.length; i++)
	{
		check_char = number_format.indexOf(object_value.charAt(i));
		if (check_char < 0)
			return false;
		else if (check_char == 1)
		{
			if (decimal)
				return false;
			else
				decimal = true;
		}
		else if (check_char == 0)
		{
			if (decimal || digits)	
				trailing_blank = true;
		}
		else if (trailing_blank)
			return false;
		else
			digits = true;
	}	

	return true;
}	
function _CF_checkinteger(object_value) {
	if (object_value.length == 0)
		return true;

	var decimal_format = ".";
	var check_char = object_value.indexOf(decimal_format);

	if (check_char == -1)
		return _CF_checknumber(object_value);
	else
		return false;
}

/* ajax for search
required: jquery
*/
// allows you to remove an item from an array based on its index, thanks to Jeff Walden whereswalden.com, ejohn.org/blog/javascript-array-remove/#postcomment
Array.prototype.remove = function (from, to) {
    this.splice(from, !to || 1 + to - from + (!(to < 0 ^ from >= 0) && (to < 0 || -1) * this.length));
    return this.length;
};
$(function () {
    $('div.titleStyle').click(function () {
        var toggler = $(this).children('span');
        if (toggler.attr('class') == 'bigTogglerDown') {
            $(this).nextAll("ul").slideUp("fast");
            $(this).nextAll("a.facetReset").slideUp("fast");
            toggler.removeClass('bigTogglerDown').addClass('bigTogglerRight');
            return false;
        } else {
            $(this).nextAll("ul").slideDown("fast");
            $(this).nextAll("a.facetReset").slideDown("fast");
            toggler.removeClass('bigTogglerRight').addClass('bigTogglerDown');
            return false;
        }
    });
    $("span[class *= 'smallToggler']").click(function () {
        var toggler = $(this);
        if (toggler.attr('class') == 'smallTogglerRight') {
            $(this).nextAll("ul").slideDown("fast");
            toggler.removeClass('smallTogglerRight').addClass('smallTogglerDown');
            return false;
        } else {
            $(this).nextAll("ul").slideUp("fast");
            toggler.removeClass('smallTogglerDown').addClass('smallTogglerRight');
            return false;
        }
    });
    // switch out product image with click on color swatch below image
    $('ul.productTile li.productColors .prodColorBlock').click(function (event) {
        event.preventDefault();
        var $e = $(event.target);
        if ($e.attr('sku')) {
            var sku = $e.attr('sku');
            $e.siblings('.selected').removeClass('selected').end().addClass('selected');
			$e.parents('.productColors').siblings('.productImage').find('img').attr('src', 'http://www.rei.com/zoom/' + sku + '/230');
        }
    });
    //switch out product image with click on color swatch below image
    $('ul.productTile li a div.prodColors').click(function (event) {
        event.preventDefault();
        var $e = $(event.target);
        if ($e.attr('sku')) {
            var sku = $e.attr('sku');
            $e.siblings('.selected').removeClass('selected').end().addClass('selected').closest('.prodColors').prev('img').attr('src', '/zoom/' + sku + '/150');
        }
    });
    // fancy hover functionality for ratings in sidebar
    var currentStarClass = $('#stars').attr('class');
    $('a.available').live({
        mouseover: function () {
            var starNum = $(this).children('img').attr('alt');
            var newClass = 'star' + starNum;
            $('#stars').attr('class', newClass);
            return false;
        },
        mouseout: function () {
            $('#stars').attr('class', currentStarClass);
            return false;
        }
    });
});
rei.searchTiles = {
    ready: function () {
        try {
            if ($('.productRating').length > 0) {
                $('.searchResults').addClass('newTiles');
            }
        } catch (err) {}
        rei.searchTiles.groupProductTiles();
        try {
            if ($('.productTile').length > 0) {
                $('#sortShowTop, #sortShowBottom').css({
                    visibility: 'visible'
                });
            }
        } catch (err) {}
        try {
            if ($('.onlyOnline').length > 0) {
                $('.onlyOnline').eq(0).show();
            }
            if ($('.onlyInStore').length > 1) {
                $('.onlyInStore').eq(1).show();
            }
        } catch (err) {}
    },
    load: function () {
        rei.searchTiles.alignProductTiles();
    },
    groupProductTiles: function () {
        var offsetIndex = 0;
        if ($('#bannerZone3').length > 0) {
            $('.productTile').eq(0).addClass('productGroup0');
            $('.productTile').eq(1).addClass('productGroup0');
            offsetIndex = 2;
        }
        for (var i = 0; i <= Math.ceil($('.productTile').length / 3); i++) {
            var startIndex = i * 3 + offsetIndex - 1;
            var $productsNo1 = $('.productTile').eq(startIndex + 1);
            var $productsNo2 = $('.productTile').eq(startIndex + 2);
            var $productsNo3 = $('.productTile').eq(startIndex + 3);
            $productsNo1.addClass('productGroup' + (i + 1));
            $productsNo2.addClass('productGroup' + (i + 1));
            $productsNo3.addClass('productGroup' + (i + 1));
        }
    },
    alignProductTiles: function () {
        for (var i = 0; i <= Math.ceil($('.productTile').length / 3); i++) {
            var $productGroup = $('.productGroup' + i);
            var maxColorHeight = 0;
            var maxPriceHeight = 0;
            var maxDescHeight = 0;
            var maxRatingHeight = 0;
            var maxPromoHeight = 0;
            var maxBadgeHeight = 0;
            var maxSizeHeight = 0;
            $productGroup.each(function (index) {
                maxColorHeight = rei.searchTiles.getMaxHeight($('.productColors', $(this)), maxColorHeight);
                maxPriceHeight = rei.searchTiles.getMaxHeight($('.productPrice', $(this)), maxPriceHeight);
                maxDescHeight = rei.searchTiles.getMaxHeight($('.productDescription', $(this)), maxDescHeight);
                maxRatingHeight = rei.searchTiles.getMaxHeight($('.productRating', $(this)), maxRatingHeight);
                maxPromoHeight = rei.searchTiles.getMaxHeight($('.productPromo', $(this)), maxPromoHeight);
                maxBadgeHeight = rei.searchTiles.getMaxHeight($('.productBadge', $(this)), maxBadgeHeight);
                maxSizeHeight = rei.searchTiles.getMaxHeight($('.productSize', $(this)), maxSizeHeight);
            });
            rei.searchTiles.adjustHeights($('.productColors', $productGroup), maxColorHeight);
            rei.searchTiles.adjustHeights($('.productPrice', $productGroup), maxPriceHeight);
            rei.searchTiles.adjustHeights($('.productDescription', $productGroup), maxDescHeight);
            rei.searchTiles.adjustHeights($('.productRating', $productGroup), maxRatingHeight);
            rei.searchTiles.adjustHeights($('.productPromo', $productGroup), maxPromoHeight);
            if (maxBadgeHeight > 0) {
                if ($.browser.msie == false) {
                    maxBadgeHeight += 10;
                }
            }
            rei.searchTiles.adjustHeights($('.productBadge', $productGroup), maxBadgeHeight);
            rei.searchTiles.adjustHeights($('.productSize', $productGroup), maxSizeHeight);
            $('.productSize', $productGroup).attr({
                maxSizeHeight: maxSizeHeight
            });
        }
    },
    getMaxHeight: function ($element, maxHeight) {
        if ($element.html() != '') {
            var elementHeight = $element.height();
            if (elementHeight > maxHeight) {
                maxHeight = elementHeight;
            }
        }
        return maxHeight;
    },
    adjustHeights: function ($elements, height) {
        if (height > 0) {
            $elements.css({
                height: height
            });
        } else {
            try {
                if ($.browser.msie && $.browser.version <= 7) {
                    $elements.hide().css({
                        display: 'none'
                    }).addClass('hidden');
                }
            } catch (err) {}
        }
    }
};
rei.searchLocation = {
    ready: function () {
        $('.notAvailable').bind('click', function (e) {
            try {
                e.preventDefault();
                e.stopPropagation();
            } catch (err) {}
        });
        if (rei.siv != null) {
            rei.siv.pageNameA = 'search_retail';
            rei.siv.hideCallBack = window.parent.hideMyStores;
            rei.siv.initialize(rei.searchLocation.reformatStoreDisplay);
            rei.siv.showMyStoresCallback = function (noStoresWithin50miles) {
                rei.searchLocation.reformatStoreDisplay();
                if (noStoresWithin50miles != null && noStoresWithin50miles == true) {
                    $('#showing').text('No');
                } else {
                    $('#showing').text('Showing');
                    rei.searchLocation.filterResults();
                }
            };
            rei.siv.saveSelectionCallback = function () {
                rei.searchLocation.filterResults();
            };
            if ($.browser.mozilla == true || $.browser.msie == true) {
                $('.d4').css({
                    'margin-top': 0
                });
                $('#zipCode, #city').css({
                    padding: $.browser.mozilla == true ? 4 : 3
                });
                if ($.browser.mozilla == true) {
                    $('.d5').css({
                        margin: '0 0 0 7px'
                    });
                }
            }
            var pageNameA = 'pagecontent-_-search_retail-_-change location_';
            $('#updateStores').bind('click', function () {
                rei.analytics.sendSpEvent(pageNameA + 'update');
            });
            rei.siv.locationFoundCallback = function (zipCode) {
                var location = $('#zipCode').val();
                if (location == '' || location.toLowerCase() == 'zip code') {
                    location = $('#city').val().concat(' ', $('#cfState').val());
                }
                var s = s_gi(s_account);
                s.linkTrackVars = 'eVar38,eVar59,eVar39';
                s.eVar38 = pageNameA + 'go_' + location;
                s.eVar39 = rei.analytics.options.page_name;
                rei.analytics.push(function () {
                    try {
                        s.tl(true, 'o', 'SP Event');
                    } catch (err) {}
                });
                s.linkTrackEvents = s.events = '';
                s.linkTrackVars = '';
                //end analytics
            }
        }
    },
    reformatStoreDisplay: function () {
        $('ul.stores').remove();
        $('#zipCode').val('Zip code');
        $('#city').val('City');
        $('#cfState').val('');
        $('li.st-cc').each(function (index) {
            var parentIndex = Math.ceil((index + 1) / 4);
            if ($('#ulSC' + parentIndex).length == 0) {
                $('#storesList').append('<ul id="ulSC' + parentIndex + '" class="fl width60 stores"></ul>');
            }
            $('#ulSC' + parentIndex).append($(this));
        });
        $('#ulSC li').remove();
        $('#ulSC').hide();
    },
    filterResults: function () {
        if ($('div.onlyInStore').length > 0 && (typeof rei.siv.currentStores != 'undefined' && rei.siv.currentStores != null)) {
            $('div.onlyInStore').each(function () {
                var $productBadge = $(this).parent();
                var $productBox = $productBadge.parents('.productTile');
                var styleNumber = $(this).attr('styleno');
                var storesWhereAvailable = inStore[styleNumber];
                var isAvailableInThisLocation = false;
                $.each(rei.siv.currentStores, function (index, value) {
                    var storeNumber = value.store.storeNumber;
                    var storeNumberF = ',' + storeNumber + ',';
                    if (storesWhereAvailable.indexOf(storeNumberF) > -1) {
                        isAvailableInThisLocation = true;
                        return false;
                    }
                });
                var isAvailVisibility = isAvailableInThisLocation == true ? 'hidden' : 'visible';
                $('.notAvailable', $productBadge).css({
                    visibility: isAvailVisibility
                }).css({
                    height: $productBox.height()
                });
            });
        }
    }
};
$(document).ready(rei.searchTiles.ready);
$(window).load(rei.searchTiles.load);
$(document).ready(rei.searchLocation.ready);
$(window).load(rei.searchLocation.filterResults);
/**
 * This function is for updating the Compare bucket with the items in cookie. It
 * is called on load of the search result page ( i.e. when ever search result
 * page refreshes/reloads)
 *
 * @returns {Boolean}
 */

/*$(document).ready(function(){
    var compareBucketCookie = readCookie("compareBucket");

    if ($('.abTest').css('display') != 'none'){
        if (compareBucketCookie == 'on'){
            $('li.compare ').show();
            $('#compareWrapper').show();
            $('#compareTab').css('border-top', 'none');
            $('#compareTab b').removeClass('compareDownArrow');
            $('#compareTab b').addClass('compareUpArrow');
        } else {
            $('li.compare ').hide();
            $('#compareWrapper').hide();
            $('#compareTab').css('border-top', '1px solid #CCC');
            $('#compareTab b').removeClass('compareUpArrow');
            $('#compareTab b').addClass('compareDownArrow');
        }
    }

    $('#compareTab').click(function() {
        $('li.compare').toggle();
        $('#compareWrapper').animate({
            height: 'toggle'
            }, 200);
        if ($('#compareWrapper').css('height') == '1px') {
            Set_Cookie("compareBucket", "on");
            $('#compareTab b').removeClass('compareDownArrow');
            $('#compareTab b').addClass('compareUpArrow');
            $('#compareTab').css('border-top', 'none');
        } else {
            Set_Cookie("compareBucket", "off");
            $('#compareTab b').removeClass('compareUpArrow');
            $('#compareTab b').addClass('compareDownArrow');
            $('#compareTab').css('border-top', '1px solid #CCC');
        }

    });
});*/

function updateCompBucketOnLoad() {

	var href= window.location.href;
	Set_Cookie("searchURL",href);

	var cookieValue = readCookie("userproduct");
	if (cookieValue != null) {
		var valuePieces = new Array();
		valuePieces = cookieValue.split('%2C');
		if (valuePieces && valuePieces != "" && valuePieces.length > 0) {
			var style;
			// Updating bucket with only the first four items in cookie ( this
			// is for existing users who may have more than 4 items)
			Delete_Cookie('userproduct','/');
			Delete_Cookie('compExtAccess','/');
			Delete_Cookie('removeuserproduct','/');
			for ( var x = 0; x < 4; x++) {
				if (valuePieces[x]) {
					style = valuePieces[x];
					// Adding item to compare bucket and back into the cookie
					toggleCompButton(style, 'add');
				}
			}
		}
	}
	return false;
}
function isStyleInCompareCookie(cookieName, Style) {
	var isInCompList = false;
	var cookieValue = readCookie(cookieName);
	if (cookieValue != null) {
		var SetSize = cookieValue.length;
		var valuePieces = new Array();
		valuePieces = cookieValue.split('%2C');
		for (var x = 0; ((x < SetSize) && (!isInCompList)); x++) {
			if (valuePieces[x] == Style) {
				isInCompList = true;
			}
		}
	}
	return isInCompList;
}

/*function findParamInQuerySt(name)
{
	var url = window.location.search.substring(1);
	var keyValues = url.split("&amp;");
	var key;
	for (i=0;i < keyValues.length;i++)
	{
		key = keyValues[i].split("=");
		if (key[0] == name) {
			return key[1];
		}
	}
}

function remove(){
	var mode = findParamInQuerySt('styles');
	var styles ='%20';
	if(mode)
	{
		Set_Cookie("compExtAccess","true");
	}
	if(readCookie("compExtAccess") == 'true' && mode)
	{
		document.userProductUpdate.action = document.userProductUpdate.action + '&styles='+styles ;
		document.userProductUpdate.method = 'post';
	}
	else
	{
		//Delete_Cookie('userproduct','/');
		Set_Cookie('userproduct',"");
		Delete_Cookie('removeuserproduct','/');
	}
	document.userProductUpdate.submit();
}*/

function removeFromCompareCookie(cookieName, style) {
	var cookieValue = readCookie(cookieName);
	if (cookieValue != null) {
		cookieValue = cookieValue.replace('%2C' + style, '');
		cookieValue = cookieValue.replace(style, '');
		if (cookieValue.length == 9) {
			cookieValue = cookieValue.replace('%2C', '');
		}
	}
	cookieValue = unescape(cookieValue);
	Set_Cookie(cookieName,cookieValue,'21');
}

function addToCompareCookie(cookieName, style)
{
	var cookieValue = readCookie(cookieName);
	var cookieLength;
	if (cookieValue != null) {
		cookieLength = cookieValue.length;
	} else {
		cookieLength = 0;
	}

	if (isStyleInCompareCookie(cookieName, style) == false)
	{
		var updatedList="";
		if (cookieLength == 0) {
			 updatedList = style;
		} else if (cookieLength > 0
				&& (cookieValue.substring(cookieLength - 3, cookieLength) == '%2C')) {
			//var updatedList = cookieValue + style;
			 updatedList = style;
		} else if (cookieLength > 0) {
			 updatedList = cookieValue + ',' + style;
		}
		//Cookie expires after 21 days, the items added to bucket will be there for 21 days only
		updatedList = unescape(updatedList);
		Set_Cookie(cookieName,updatedList,'21');
	}
}

function addStyle(style) {
	addToCompareCookie("userproduct", style);
	removeFromCompareCookie("removeuserproduct",style);
}


function removeStyle(style) {
	if (isStyleInCompareCookie('userproduct',style) == true) {
		removeFromCompareCookie('userproduct',style);
	}
	addToCompareCookie("removeuserproduct", style);
}

function removeStyleFromList(style, styleList) {
	var styleArray = styleList.value.split(",");
	var styleCount = 0;
	styleList.value = "";
	while (styleCount < styleArray.length) {
		if (styleArray[styleCount] != "" && style != styleArray[styleCount]) {
			styleList.value = styleList.value + "," + styleArray[styleCount];
		}
		styleCount++;
	}
}

/**
 * This function is getting the comparison results. It is called on click of
 * Compare button that exists as part of Compare bucket
 */
function compare() {
	document.getElementById('userProductUpdate').submit();
}

/**
 * This function is for toggling Compare button from 'Add' to 'Remove' state and vice-versa.
 * It also updates the Compare bucket accordingly.
 * @param style - required parameter, it is the sku value.
 * @param inMode - optional parameter and is used to handle the case where items in
 * cookie don't exist on search result page. Ex: User adds 'shoes' to compare
 * bucket and then searches for 'shirt', so the 'shoe' items in cookie would not
 * exist on 'shirt' search result page.
 */
function toggleCompButton(style, inMode) {
	if (style != null && style != '' && style.match(/[0-9]/) != null) {
		var buttonElem = $('#'.concat(style, 'Compare'));
		if (buttonElem && buttonElem.attr('mode')) {
			var mode = buttonElem.attr('mode');
			// Add item to cookie and change add button to remove
			if (mode == 'add') {
				var cookieValue = readCookie("userproduct");
				if (cookieValue != null && cookieValue != "") {
					var cookieArray = new Array();
					cookieArray = cookieValue.split('%2C');
					if (cookieArray[0] == "") {
						cookieArray.splice(0, 1);
					}
					else if (cookieArray[cookieArray.length -1] == "")
					{
							cookieArray.splice(cookieArray.length -1, 1);

					}
					var cookieLength = cookieArray.length;
					if (cookieLength > 3) {
						$
								.fancybox({
									content : '<p></p><p class="compareMsg compareMsgTitle"><b>You can compare up to four items at a time.</b></p><p class="compareMsg">Remove one or more items before adding another item to compare.</p><p class="compareMsg"><a href="javascript:$.fancybox.close();">Close</a></p>',
									autoScale : false,
									autoDimensions : false,
									width : 210,
									height : 145
								});
						return;
					}
				}
				// Add item to cookie
				addStyle(style);
				// Change add button to remove
				buttonElem.unbind('mouseover');
				buttonElem.unbind('mouseout');
				buttonElem.unbind('mousedown');
				buttonElem.attr('src', '/etc/static/rei-wcm/pix/common/CompareRemove_ON.gif');
				buttonElem.attr('class', 'compareBtnRem');
				buttonElem.attr('mode', 'remove');
				buttonElem.attr('title', 'Remove item from compare list.');
				buttonElem.bind('mouseover',function(event)
						{
								updateCompAddBtn(event);
						}
				);
				buttonElem.bind('mouseout',function(event)
						{
								updateCompAddBtn(event);
						}
				);
				buttonElem.bind('mousedown',function(event)
						{
								updateCompAddBtn(event);
						}
				);
			}
			// Remove item from cookie and change remove button to add
			else if (mode == 'remove') {
				// Remove item from cookie
				removeStyle(style);
				// Change remove button to add
				// Change add button to remove
				buttonElem.unbind('mouseover');
				buttonElem.unbind('mouseout');
				buttonElem.unbind('mousedown');
				buttonElem.attr('src', '/etc/static/rei-wcm/pix/common/Compare_ON.gif');
				buttonElem.attr('class', 'compareBtnAdd');
				buttonElem.attr('mode', 'add');
				buttonElem.attr('title', 'Add item to compare list.');
				buttonElem.bind('mouseover',function(event)
						{
								updateCompRemBtn(event);
						}
				);
				buttonElem.bind('mouseout',function(event)
						{
								updateCompRemBtn(event);
						}
				);
				buttonElem.bind('mousedown',function(event)
						{
								updateCompRemBtn(event);
						}
				);

			}
			// Update compare bucket for the item
			updateCompBucket(style, mode);
		}
		else if (inMode) {
			if (inMode == 'add') {
				// Add item to cookie
				addStyle(style);
				// Update compare bucket for the item
				updateCompBucket(style, 'add', true);
			} else if (inMode == 'remove') {
				// Add item to cookie
				removeStyle(style);
				// Update compare bucket for the item
				updateCompBucket(style, 'remove', true);
			}
		}
		//window.scrollTo(0, 0);
	}

}

/**
 * This function adds/removes items to/from Compare bucket.
 * @param inStyle - required param, it is the sku value.
 * @param inMode -  required param, allowed values are 'add' and 'remove'.
 * @param prodNotOnCurrPage - optional parameter and is used to handle the case where items in
 * cookie don't exist on search result page. Ex: User adds 'shoes' to compare
 * bucket and then searches for 'shirt', so the 'shoe' items in cookie would not
 * exist on 'shirt' search result page.
 */
function updateCompBucket(inStyle, inMode, prodNotOnCurrPage) {
	var cookieValue = readCookie("userproduct");

	if (cookieValue != null) {
		var cookieLength = cookieValue.split('%2C').length;
		// Enable compare button if 2 or more items have been added to bucket.
		if (cookieLength > 1) {
			/*$('#compareBucket').attr('src', '/etc/static/rei-wcm/pix/common/compare_items.gif');*/
			$('#compareBucket').attr('disabled', false);
			$('#compareBucket').removeClass('disabled');
		} else {
			/*$('#compareBucket').attr('src',
					'/etc/static/rei-wcm/pix/common/compare_items_disabled.gif');*/
			$('#compareBucket').attr('disabled', true);
			$('#compareBucket').addClass('disabled');
		}
	}
	if (inStyle && inMode && inStyle != '' && inMode != '') {
		// Adding/removing items to/from compare bucket
		// Looping through all the place holders for thumb nails in bucket to,
		// 1> find an empty spot in case of adding item to bucket
		// 2> shift items to left in case of removal of an item from bucket
		for ( var i = 1; i < 5; i++) {
			var parentThumbnail = $('#compareThumbnail_'.concat(i));
			var thumbnail = $('#thumbnail_'.concat(i));
			var closeElem = $('#thumbnail_close_'.concat(i));
			if (inMode == 'add' && thumbnail.attr('available') == 'yes') {
				// Get the image for adding to compare bucket thumb nail
				var img = 'url(http://www.rei.com/zoom/' + inStyle + '/40)';
				var alt = $('#'.concat(inStyle, 'Image')).attr('alt');
				if (img) {
					parentThumbnail.attr('closeId', inStyle);
					parentThumbnail.bind('click', function(event) {
						removeItemFromBucket(event);
					});
					if (prodNotOnCurrPage) {
						/*closeElem.attr('prodNotOnCurrPage', prodNotOnCurrPage);*/
						parentThumbnail.attr('prodNotOnCurrPage', prodNotOnCurrPage);
					}
					parentThumbnail.attr('hoverId', i);
					parentThumbnail.bind('mouseover',function(event)
							{
									updateHover(event);
							}
					);
					parentThumbnail.bind('mouseout',function(event)
							{
									updateHover(event);
							}
					);
					// Add image to thumb nail
					thumbnail.css('background-image', img);
					thumbnail.attr('title', alt);
					thumbnail.attr('available', 'no');
					thumbnail.attr('removeId', inStyle);

					// Show the close image on thumb nail
					closeElem.css('display', 'block');
					closeElem.css('background','url(/etc/static/rei-wcm/pix/common/remove_x.png)');
				}
				break; // out of outer for loop
			} else if (inMode == 'remove'
					&& thumbnail.attr('removeId') == inStyle) {
				var j;
				// Left shift all the items that exist to the right of target(item
				// to be removed)
				for (j = i; j < 5; j++) {
					var k = j + 1;
					var currParElem = $('#compareThumbnail_'.concat(j));
					var nextParElem = $('#compareThumbnail_'.concat(k));
					var currElem = $('#thumbnail_'.concat(j));
					var nextElem = $('#thumbnail_'.concat(k));
					var currCloseElem = $('#thumbnail_close_'.concat(j));
					//var nextCloseElem = $('#thumbnail_close_'.concat(k));
					if (currElem) {
						if (nextElem && nextElem.attr('removeId') != null
								&& nextElem.attr('removeId') != '') {
							currParElem.unbind('click');
							currParElem.unbind('mouseover');
							currParElem.unbind('mouseout');
							currParElem.attr('closeId', nextParElem
									.attr('closeId'));
							currParElem.attr('prodNotOnCurrPage',
									nextParElem.attr('prodNotOnCurrPage'));
							currParElem.bind('click', function(event) {
								removeItemFromBucket(event);
							});
							currParElem.bind('mouseover',function(event)
									{
											updateHover(event);
									}
							);
							currParElem.bind('mouseout',function(event)
									{
											updateHover(event);
									}
							);
							currElem.css('background-image', nextElem
									.css('background-image'));
							currElem.attr('title', nextElem.attr('title'));
							currElem.attr('available', 'no');
							currElem.attr('removeId', nextElem.attr('removeId'));
						} else {
							currParElem.unbind('click');
							currParElem.unbind('mouseover');
							currParElem.unbind('mouseout');
							currParElem.attr('closeId', '');
							currParElem.attr('hoverId', '');
							currParElem.attr('prodNotOnCurrPage', '');
							currElem.css('background-image', 'none');
							currElem.attr('title', '');
							currElem.attr('available', 'yes');
							currElem.attr('removeId', '');
							currCloseElem.css('display', 'none');
							currCloseElem.css('background','')
							break;// out of "j" for loop
						}
					}
				}
				break; // out of outer for loop
			}
		}
	}
}

/**
 * This function handles the click of 'x' present on thumbnail
 * @param event
 */
function removeItemFromBucket(event) {
	var id="";
	if (event.srcElment)
		id = event.srcElement.id;
	else if (event.currentTarget) // For firefox
		id = event.currentTarget.id;

	var closeElemId = $('#'.concat(id)).attr('closeId');
	var prodNotExists = $('#'.concat(id)).attr('prodNotOnCurrPage');
	if (prodNotExists) {
		toggleCompButton(closeElemId, 'remove');
	} else {
		toggleCompButton(closeElemId);
	}
}
/**
 * This function is for updating the Add state of Compare button present on Search result page.
 * @param event
 */
function updateCompAddBtn(event)
{
	var id="";
	if (event.srcElment)
		id = event.srcElement.id;
	else if (event.target) // For firefox
		id = event.target.id;
	if(event.type == 'mouseover')
	{
		$('#'.concat(id)).attr('src','/etc/static/rei-wcm/pix/common/CompareRemove_OVER.gif');
	}
	else if(event.type == 'mouseout')
	{
		$('#'.concat(id)).attr('src','/etc/static/rei-wcm/pix/common/CompareRemove_ON.gif');
	}
	else if(event.type == 'mousedown')
	{
		$('#'.concat(id)).attr('src','/etc/static/rei-wcm/pix/common/CompareRemove_OnCLICK.gif');
	}
}
/**
 * This function is for updating the Remove state of Compare button present on Search result page.
 * @param event
 */
function updateCompRemBtn(event)
{
	var id="";
	if (event.srcElment)
		id = event.srcElement.id;
	else if (event.target) // For firefox
		id = event.target.id;
	if(event.type == 'mouseover')
	{
		$('#'.concat(id)).attr('src','/etc/static/rei-wcm/pix/common/CompareOVER.gif');
	}
	else if(event.type == 'mouseout')
	{
		$('#'.concat(id)).attr('src','/etc/static/rei-wcm/pix/common/Compare_ON.gif');
	}
	else if(event.type == 'mousedown')
	{
		$('#'.concat(id)).attr('src','/etc/static/rei-wcm/pix/common/Compare_OnCLICK.gif');
	}
}

/**
 * This function is for changing the state of x button in compare bucket on hovering over the image
 * @param event
 */

function updateHover(event)
{
	var id="";
	if (event.srcElment)
		id = event.srcElement.id;
	else if (event.currentTarget) // For firefox
		id = event.currentTarget.id;

	id = $('#'.concat(id)).attr('hoverId');
	var closeElemId = $('#thumbnail_close_'.concat(id));

	if(event.type == "mouseover")
	{
		closeElemId.css('background','url(/etc/static/rei-wcm/pix/common/remove_x.png) no-repeat 0 -28px');
	}

	if(event.type == "mouseout")
	{
		closeElemId.css('background','url(/etc/static/rei-wcm/pix/common/remove_x.png)');
	}
}

$(window).load(function() {
    updateCompBucketOnLoad();
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
/*
 * jQuery UI Datepicker
 *
 * Copyright (c) 2006, 2007, 2008 Marc Grabanski
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	ui.core.js
 *
 * Marc Grabanski (m@marcgrabanski.com) and Keith Wood (kbwood@virginbroadband.com.au).
 */
   
(function($) { // hide the namespace

var PROP_NAME = 'datepicker';

/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this.debug = false; // Change this to true to start debugging
	this._curInst = null; // The current instance in use
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
	this._appendClass = 'ui-datepicker-append'; // The name of the append marker class
	this._triggerClass = 'ui-datepicker-trigger'; // The name of the trigger marker class
	this._dialogClass = 'ui-datepicker-dialog'; // The name of the dialog marker class
	this._promptClass = 'ui-datepicker-prompt'; // The name of the dialog prompt marker class
	this._unselectableClass = 'ui-datepicker-unselectable'; // The name of the unselectable cell marker class
	this._currentClass = 'ui-datepicker-current-day'; // The name of the current day marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		clearText: 'Clear', // Display text for clear link
		clearStatus: 'Erase the current date', // Status text for clear link
		closeText: 'Close', // Display text for close link
		closeStatus: 'Close without change', // Status text for close link
		prevText: '&#x3c;&#x3c;&#x00A0;Prev', // Display text for previous month link
		prevStatus: 'Show the previous month', // Status text for previous month link
		nextText: 'Next&#x00A0;&#x3e;&#x3e;', // Display text for next month link
		nextStatus: 'Show the next month', // Status text for next month link
		currentText: 'Today', // Display text for current month link
		currentStatus: 'Show the current month', // Status text for current month link
		monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'], // Names of months for drop-down and formatting
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
		monthStatus: 'Show a different month', // Status text for selecting a month
		yearStatus: 'Show a different year', // Status text for selecting a year
		weekHeader: 'Wk', // Header for the week of the year column
		weekStatus: 'Week of the year', // Status text for the week of the year column
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
		dayStatus: 'Set DD as first week day', // Status text for the day of the week selection
		dateStatus: 'Select DD, M d', // Status text for the date selection
		dateFormat: 'mm/dd/yy', // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		initStatus: 'Select a date', // Initial Status text on opening
		isRTL: false // True if right-to-left language, false if left-to-right
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
		showAnim: 'show', // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: '', // Display text following the input box, e.g. showing the format
		buttonText: '...', // Text for trigger button
		buttonImage: '', // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		closeAtTop: true, // True to have the clear/close at the top,
			// false to have them at the bottom
		mandatory: false, // True to hide the Clear link, false to include it
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: true, // True if month can be selected directly, false if only prev/next
		changeYear: true, // True if year can be selected directly, false if only prev/next
		yearRange: '-1:+10', // Range of years to display in drop-down,
			// either relative to current year (-nn:+nn) or absolute (nnnn:nnnn)
		changeFirstDay: true, // True to click on day name to change, false to remain as set
		highlightWeek: false, // True to highlight the selected week
		showOtherMonths: true, // True to show dates in other months, false to leave blank
		showWeeks: false, // True to show week of the year, false to omit
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: '+10', // Short year values < this are in the current century,
			// > this are in the previous century, 
			// string value starting with '+' for current year + value
		showStatus: true, // True to show status bar at bottom, false to not show it
		statusForDate: this.dateStatus, // Function to provide status text for a date -
			// takes date and instance as parameters, returns display text
		minDate: 0, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: 'normal', // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '', 
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 2, // Number of months to show at a time
		stepMonths: 1, // Number of months to step back/forward
		rangeSelect: false, // Allows for selecting a date range on one date picker
		rangeSeparator: ' - ', // Text between two dates in a range
		altField: '', // Selector for an alternate field to store selected dates into
		altFormat: '' // The date format to use for the alternate field
	};
	$.extend(this._defaults, this.regional['']);
	this.dpDiv = $('<div id="' + this._mainDivId + '" style="display: none;"></div>');
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: 'hasDatepicker',

	/* Debug logging (if enabled). */
	log: function () {
		if (this.debug)
			console.log.apply('', arguments);
	},
	
	/* Override the default settings for all instances of the date picker. 
	   @param  settings  object - the new settings to use as defaults (anonymous object)
	   @return the manager object */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span
	   @param  settings  object - the new settings to use for this date picker instance (anonymous) */
	_attachDatepicker: function(target, settings) {
		// check for settings on the control itself - in namespace 'date:'
		var inlineSettings = null;
		for (attrName in this._defaults) {
			var attrValue = target.getAttribute('date:' + attrName);
			if (attrValue) {
				inlineSettings = inlineSettings || {};
				try {
					inlineSettings[attrName] = eval(attrValue);
				} catch (err) {
					inlineSettings[attrName] = attrValue;
				}
			}
		}
		var nodeName = target.nodeName.toLowerCase();
		var inline = (nodeName == 'div' || nodeName == 'span');
		if (!target.id)
			target.id = 'dp' + new Date().getTime();
		var inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {}, inlineSettings || {}); 
		if (nodeName == 'input') {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		return {id: target[0].id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			$('<div class="ui-datepicker-inline"></div>'))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		if (input.hasClass(this.markerClassName))
			return;
		var appendText = this._get(inst, 'appendText');
		var isRTL = this._get(inst, 'isRTL');
		if (appendText)
			input[isRTL ? 'before' : 'after']('<span class="' + this._appendClass + '">' + appendText + '</span>');
		var showOn = this._get(inst, 'showOn');
		if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
			var buttonText = this._get(inst, 'buttonText');
			var buttonImage = this._get(inst, 'buttonImage');
			var trigger = $(this._get(inst, 'buttonImageOnly') ? 
				$('<img/>').addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$('<button type="button"></button>').addClass(this._triggerClass).
					html(buttonImage == '' ? buttonText : $('<img/>').attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? 'before' : 'after'](trigger);
			trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target)
					$.datepicker._hideDatepicker();
				else
					$.datepicker._showDatepicker(target);
				return false;
			});
		}
		input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).
			bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var input = $(target);
		if (input.hasClass(this.markerClassName))
			return;
		input.addClass(this.markerClassName).append(inst.dpDiv).
			bind("setData.datepicker", function(event, key, value){
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key){
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
		this._setDate(inst, this._getDefaultDate(inst));
		this._updateDatepicker(inst);
	},

	/* Tidy up after displaying the date picker. */
	_inlineShow: function(inst) {
		var numMonths = this._getNumberOfMonths(inst); // fix width for dynamic number of date pickers
		inst.dpDiv.width(numMonths[1] * $('.ui-datepicker', inst.dpDiv[0]).width());
	}, 

	/* Pop-up the date picker in a "dialog" box.
	   @param  input     element - ignored
	   @param  dateText  string - the initial date to display (in the current format)
	   @param  onSelect  function - the function(dateText) to call when a date is selected
	   @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	   @param  pos       int[2] - coordinates for the dialog's position within the screen or
	                     event - with x/y coordinates or
	                     leave empty for default (screen centre)
	   @return the manager object */
	_dialogDatepicker: function(input, dateText, onSelect, settings, pos) {
		var inst = this._dialogInst; // internal instance
		if (!inst) {
			var id = 'dp' + new Date().getTime();
			this._dialogInput = $('<input type="text" id="' + id +
				'" size="1" style="position: absolute; top: -100px;"/>');
			this._dialogInput.keydown(this._doKeyDown);
			$('body').append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		this._dialogInput.val(dateText);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			var browserWidth = window.innerWidth || document.documentElement.clientWidth ||	document.body.clientWidth;
			var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css('left', this._pos[0] + 'px').css('top', this._pos[1] + 'px');
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI)
			$.blockUI(this.dpDiv);
		$.data(this._dialogInput[0], PROP_NAME, inst);
		return this;
	},

	/* Detach a datepicker from its control.
	   @param  target    element - the target input field or division or span */
	_destroyDatepicker: function(target) {
		var nodeName = target.nodeName.toLowerCase();
		var $target = $(target);
		$.removeData(target, PROP_NAME);
		if (nodeName == 'input') {
			$target.siblings('.' + this._appendClass).remove().end().
				siblings('.' + this._triggerClass).remove().end().
				removeClass(this.markerClassName).
				unbind('focus', this._showDatepicker).
				unbind('keydown', this._doKeyDown).
				unbind('keypress', this._doKeyPress);
		} else if (nodeName == 'div' || nodeName == 'span')
			$target.removeClass(this.markerClassName).empty();
	},

	/* Enable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_enableDatepicker: function(target) {
		target.disabled = false;
		$(target).siblings('button.' + this._triggerClass).each(function() { this.disabled = false; }).end().
			siblings('img.' + this._triggerClass).css({opacity: '1.0', cursor: ''});
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_disableDatepicker: function(target) {
		target.disabled = true;
		$(target).siblings('button.' + this._triggerClass).each(function() { this.disabled = true; }).end().
			siblings('img.' + this._triggerClass).css({opacity: '0.5', cursor: 'default'});
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	   @param  target    element - the target input field or division or span
	   @return boolean - true if disabled, false if enabled */
	_isDisabledDatepicker: function(target) {
		if (!target)
			return false;
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] == target)
				return true;
		}
		return false;
	},

	/* Update the settings for a date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span
	   @param  name    object - the new settings to update or
	                   string - the name of the setting to change or
	   @param  value   any - the new value for the setting (omit if above is an object) */
	_changeDatepicker: function(target, name, value) {
		var settings = name || {};
		if (typeof name == 'string') {
			settings = {};
			settings[name] = value;
		}
		if (inst = $.data(target, PROP_NAME)) {
			extendRemove(inst.settings, settings);
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	   @param  target   element - the target input field or division or span
	   @param  date     Date - the new date
	   @param  endDate  Date - the new end date for a range (optional) */
	_setDateDatepicker: function(target, date, endDate) {
		var inst = $.data(target, PROP_NAME);
		if (inst) {
			this._setDate(inst, date, endDate);
			this._updateDatepicker(inst);
		}
	},
	
	

	/* Set the Minimum dates for a jQuery selection.    [ john@johnbarry.us, 11/2009 ]
	   @param  target   element - the target input field or division or span
	   @param  minDate  Date - the new min date for a range (optional) */
	_setMinDateDatepicker: function(target, minDate) {
	    
        	        var inst = $.data(target, PROP_NAME);
	        if (inst) {
	            inst.settings.minDate = minDate;
	            this._updateDatepicker(inst);
	        }
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	   @param  target  element - the target input field or division or span
	   @return Date - the current date or
	           Date[2] - the current dates for a range */
	_getDateDatepicker: function(target) {
		var inst = $.data(target, PROP_NAME);
		if (inst)
			this._setDateFromField(inst); 
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(e) {
		var inst = $.data(e.target, PROP_NAME);
		var handled = true;
		if ($.datepicker._datepickerShowing)
			switch (e.keyCode) {
				case 9:  $.datepicker._hideDatepicker(null, '');
						break; // hide on tab out
				case 13: $.datepicker._selectDay(e.target, inst.selectedMonth, inst.selectedYear,
							$('td.ui-datepicker-days-cell-over', inst.dpDiv)[0]);
						return false; // don't submit the form
						break; // select the value on enter
				case 27: $.datepicker._hideDatepicker(null, $.datepicker._get(inst, 'duration'));
						break; // hide on escape
				case 33: $.datepicker._adjustDate(e.target, (e.ctrlKey ? -1 :
							-$.datepicker._get(inst, 'stepMonths')), (e.ctrlKey ? 'Y' : 'M'));
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(e.target, (e.ctrlKey ? +1 :
							+$.datepicker._get(inst, 'stepMonths')), (e.ctrlKey ? 'Y' : 'M'));
						break; // next month/year on page down/+ ctrl
				case 35: if (e.ctrlKey) $.datepicker._clearDate(e.target);
						break; // clear on ctrl+end
				case 36: if (e.ctrlKey) $.datepicker._gotoToday(e.target);
						break; // current on ctrl+home
				case 37: if (e.ctrlKey) $.datepicker._adjustDate(e.target, -1, 'D');
						break; // -1 day on ctrl+left
				case 38: if (e.ctrlKey) $.datepicker._adjustDate(e.target, -7, 'D');
						break; // -1 week on ctrl+up
				case 39: if (e.ctrlKey) $.datepicker._adjustDate(e.target, +1, 'D');
						break; // +1 day on ctrl+right
				case 40: if (e.ctrlKey) $.datepicker._adjustDate(e.target, +7, 'D');
						break; // +1 week on ctrl+down
				default: handled = false;
			}
		else if (e.keyCode == 36 && e.ctrlKey) // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		else
			handled = false;
		if (handled) {
			e.preventDefault();
			e.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(e) {
		var inst = $.data(e.target, PROP_NAME);
		var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
		var chr = String.fromCharCode(e.charCode == undefined ? e.keyCode : e.charCode);
		return e.ctrlKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
	},

	/* Pop-up the date picker for a given input field.
	   @param  input  element - the input field attached to the date picker or
	                  event - if triggered by focus */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
			input = $('input', input.parentNode)[0];
		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
			return;
		var inst = $.data(input, PROP_NAME);
		var beforeShow = $.datepicker._get(inst, 'beforeShow');
		extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
		$.datepicker._hideDatepicker(null, '');
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);
		if ($.datepicker._inDialog) // hide cursor
			input.value = '';
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}
		var isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css('position') == 'fixed';
			return !isFixed;
		});
		if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
			$.datepicker._pos[0] -= document.documentElement.scrollLeft;
			$.datepicker._pos[1] -= document.documentElement.scrollTop;
		}
		var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		inst.rangeStart = null;
		// determine sizing offscreen
		inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px'});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		inst.dpDiv.width($.datepicker._getNumberOfMonths(inst)[1] *
			(1 + $('.ui-datepicker', inst.dpDiv[0])[0].offsetWidth));
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
			left: offset.left + 'px', top: offset.top + 'px'});
		if (!inst.inline) {
			var showAnim = $.datepicker._get(inst, 'showAnim') || 'show';
			var duration = $.datepicker._get(inst, 'duration');
			var postProcess = function() {
				$.datepicker._datepickerShowing = true;
				if ($.browser.msie && parseInt($.browser.version) < 7) // fix IE < 7 select problems
					$('iframe.ui-datepicker-cover').css({width: inst.dpDiv.width() + 4,
						height: inst.dpDiv.height() + 4});
			};
			if ($.effects && $.effects[showAnim])
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[showAnim](duration, postProcess);
			if (duration == '')
				postProcess();
			if (inst.input[0].type != 'hidden')
				inst.input[0].focus();
			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		var dims = {width: inst.dpDiv.width() + 4,
			height: inst.dpDiv.height() + 4};
		inst.dpDiv.empty().append(this._generateDatepicker(inst)).
			find('iframe.ui-datepicker-cover').
			css({width: dims.width, height: dims.height});
		var numMonths = this._getNumberOfMonths(inst);
		inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
		inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
		if (inst.input && inst.input[0].type != 'hidden')
			$(inst.input[0]).focus();
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var pos = inst.input ? this._findPos(inst.input[0]) : null;
		var browserWidth = window.innerWidth || document.documentElement.clientWidth;
		var browserHeight = window.innerHeight || document.documentElement.clientHeight;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		// reposition date picker horizontally if outside the browser window
		if (this._get(inst, 'isRTL') || (offset.left + inst.dpDiv.width() - scrollX) > browserWidth)
			offset.left = Math.max((isFixed ? 0 : scrollX),
				pos[0] + (inst.input ? inst.input.width() : 0) - (isFixed ? scrollX : 0) - inst.dpDiv.width() -
				(isFixed && $.browser.opera ? document.documentElement.scrollLeft : 0));
		else
			offset.left -= (isFixed ? scrollX : 0);
		// reposition date picker vertically if outside the browser window
		if ((offset.top + inst.dpDiv.height() - scrollY) > browserHeight)
			offset.top = Math.max((isFixed ? 0 : scrollY),
				pos[1] - (isFixed ? scrollY : 0) - (this._inDialog ? 0 : inst.dpDiv.height()) -
				(isFixed && $.browser.opera ? document.documentElement.scrollTop : 0));
		else
			offset.top -= (isFixed ? scrollY : 0);
		return offset;
	},
	
	/* Find an object's position on the screen. */
	_findPos: function(obj) {
        while (obj && (obj.type == 'hidden' || obj.nodeType != 1)) {
            obj = obj.nextSibling;
        }
        var position = $(obj).offset();
	    return [position.left, position.top];
	},

	/* Hide the date picker from view.
	   @param  input  element - the input field attached to the date picker
	   @param  duration  string - the duration over which to close the date picker */
	_hideDatepicker: function(input, duration) {

		var inst = this._curInst;
		if (!inst)
			return;
		var rangeSelect = this._get(inst, 'rangeSelect');
		if (rangeSelect && this._stayOpen)
			this._selectDate('#' + inst.id, this._formatDate(inst,
				inst.currentDay, inst.currentMonth, inst.currentYear));
		this._stayOpen = false;
		if (this._datepickerShowing) {
			duration = (duration != null ? duration : this._get(inst, 'duration'));
			var showAnim = this._get(inst, 'showAnim');
			var postProcess = function() {
				$.datepicker._tidyDialog(inst);
			};
			if (duration != '' && $.effects && $.effects[showAnim])
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'),
					duration, postProcess);
			else
				inst.dpDiv[(duration == '' ? 'hide' : (showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide')))](duration, postProcess);
			if (duration == '')
				this._tidyDialog(inst);
			var onClose = this._get(inst, 'onClose');
			if (onClose)
				onClose.apply((inst.input ? inst.input[0] : null),
					[this._getDate(inst), inst]);  // trigger custom callback
			this._datepickerShowing = false;
			this._lastInput = null;
			inst.settings.prompt = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
				if ($.blockUI) {
					$.unblockUI();
					$('body').append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
		this._curInst = null;
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker');
		$('.' + this._promptClass, inst.dpDiv).remove();
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst)
			return;
		var $target = $(event.target);
		if (($target.parents('#' + $.datepicker._mainDivId).length == 0) &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.hasClass($.datepicker._triggerClass) &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))
			$.datepicker._hideDatepicker(null, '');
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		this._adjustInstDate(inst, offset, period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		}
		else {
		var date = new Date();
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._adjustDate(target);
		this._notifyChange(inst);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		inst._selectingMonthYear = false;
		inst[period == 'M' ? 'drawMonth' : 'drawYear'] =
			select.options[select.selectedIndex].value - 0;
		this._adjustDate(target);
		this._notifyChange(inst);
	},

	/* Restore input focus after not changing month/year. */
	_clickMonthYear: function(id) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		if (inst.input && inst._selectingMonthYear && !$.browser.msie)
			inst.input[0].focus();
		inst._selectingMonthYear = !inst._selectingMonthYear;
	},

	/* Action for changing the first week day. */
	_changeFirstDay: function(id, day) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		inst.settings.firstDay = day;
		this._updateDatepicker(inst);
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		if ($(td).hasClass(this._unselectableClass))
			return;
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		var rangeSelect = this._get(inst, 'rangeSelect');
		if (rangeSelect) {
			this._stayOpen = !this._stayOpen;
			if (this._stayOpen) {
				$('.ui-datepicker td').removeClass(this._currentClass);
				$(td).addClass(this._currentClass);
			} 
		}
		inst.selectedDay = inst.currentDay = $('a', td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		if (this._stayOpen) {
			inst.endDay = inst.endMonth = inst.endYear = null;
		}
		else if (rangeSelect) {
			inst.endDay = inst.currentDay;
			inst.endMonth = inst.currentMonth;
			inst.endYear = inst.currentYear;
		}
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
		if (this._stayOpen) {
			inst.rangeStart = new Date(inst.currentYear, inst.currentMonth, inst.currentDay);
			this._updateDatepicker(inst);
		}
		else if (rangeSelect) {
			inst.selectedDay = inst.currentDay = inst.rangeStart.getDate();
			inst.selectedMonth = inst.currentMonth = inst.rangeStart.getMonth();
			inst.selectedYear = inst.currentYear = inst.rangeStart.getFullYear();
			inst.rangeStart = null;
			if (inst.inline)
				this._updateDatepicker(inst);
		}
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		if (this._get(inst, 'mandatory'))
			return;
		this._stayOpen = false;
		inst.endDay = inst.endMonth = inst.endYear = inst.rangeStart = null;
		this._selectDate(target, '');
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var target = $(id);
		var inst = $.data(target[0], PROP_NAME);
		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (this._get(inst, 'rangeSelect') && dateStr)
			dateStr = (inst.rangeStart ? this._formatDate(inst, inst.rangeStart) :
				dateStr) + this._get(inst, 'rangeSeparator') + dateStr;
		if (inst.input)
			inst.input.val(dateStr);
		this._updateAlternate(inst);
		var onSelect = this._get(inst, 'onSelect');
		if (onSelect)
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		else if (inst.input)
			inst.input.trigger('change'); // fire the change event
		if (inst.inline)
			this._updateDatepicker(inst);
		else if (!this._stayOpen) {
			this._hideDatepicker(null, this._get(inst, 'duration'));
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) != 'object')
				inst.input[0].focus(); // restore focus
			this._lastInput = null;
		}
	},
	
	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // update alternate field too
			var altFormat = this._get(inst, 'altFormat');
			var date = this._getDate(inst);
			dateStr = (isArray(date) ? (!date[0] && !date[1] ? '' :
				this.formatDate(altFormat, date[0], this._getFormatConfig(inst)) +
				this._get(inst, 'rangeSeparator') + this.formatDate(
				altFormat, date[1] || date[0], this._getFormatConfig(inst))) :
				this.formatDate(altFormat, date, this._getFormatConfig(inst)));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	   @param  date  Date - the date to customise
	   @return [boolean, string] - is this date selectable?, what is its CSS class? */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ''];
	},
	
	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	   @param  date  Date - the date to get the week for
	   @return  number - the number of the week within the year that contains this date */
	iso8601Week: function(date) {
		var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), (date.getTimezoneOffset() / -60));
		var firstMon = new Date(checkDate.getFullYear(), 1 - 1, 4); // First week always contains 4 Jan
		var firstDay = firstMon.getDay() || 7; // Day of week: Mon = 1, ..., Sun = 7
		firstMon.setDate(firstMon.getDate() + 1 - firstDay); // Preceding Monday
		if (firstDay < 4 && checkDate < firstMon) { // Adjust first three days in year if necessary
			checkDate.setDate(checkDate.getDate() - 3); // Generate for previous year
			return $.datepicker.iso8601Week(checkDate);
		} else if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) { // Check last three days in year
			firstDay = new Date(checkDate.getFullYear() + 1, 1 - 1, 4).getDay() || 7;
			if (firstDay > 4 && (checkDate.getDay() || 7) < firstDay - 3) { // Adjust if necessary
				checkDate.setDate(checkDate.getDate() + 3); // Generate for next year
				return $.datepicker.iso8601Week(checkDate);
			}
		}
		return Math.floor(((checkDate - firstMon) / 86400000) / 7) + 1; // Weeks to given date
	},
	
	/* Provide status text for a particular date.
	   @param  date  the date to get the status for
	   @param  inst  the current datepicker instance
	   @return  the status display text for this date */
	dateStatus: function(date, inst) {
		return $.datepicker.formatDate($.datepicker._get(inst, 'dateStatus'),
			date, $.datepicker._getFormatConfig(inst));
	},

	/* Parse a string value into a date object.
	   See formatDate below for the possible formats.

	   @param  format    string - the expected format of the date
	   @param  value     string - the date in the above format
	   @param  settings  Object - attributes include:
	                     shortYearCutoff  number - the cutoff year for determining the century (optional)
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  Date - the extracted date value or null if value is blank */
	parseDate: function (format, value, settings) {
		if (format == null || value == null)
			throw 'Invalid arguments';
		value = (typeof value == 'object' ? value.toString() : value + '');
		if (value == '')
			return null;
		var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		var year = -1;
		var month = -1;
		var day = -1;
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;	
		};
		// Extract a number from the string value
		var getNumber = function(match) {
			lookAhead(match);
			var origSize = (match == '@' ? 14 : (match == 'y' ? 4 : 2));
			var size = origSize;
			var num = 0;
			while (size > 0 && iValue < value.length &&
					value.charAt(iValue) >= '0' && value.charAt(iValue) <= '9') {
				num = num * 10 + (value.charAt(iValue++) - 0);
				size--;
			}
			if (size == origSize)
				throw 'Missing number at position ' + iValue;
			return num;
		};
		// Extract a name from the string value and convert to an index
		var getName = function(match, shortNames, longNames) {
			var names = (lookAhead(match) ? longNames : shortNames);
			var size = 0;
			for (var j = 0; j < names.length; j++)
				size = Math.max(size, names[j].length);
			var name = '';
			var iInit = iValue;
			while (size > 0 && iValue < value.length) {
				name += value.charAt(iValue++);
				for (var i = 0; i < names.length; i++)
					if (name == names[i])
						return i + 1;
				size--;
			}
			throw 'Unknown name at position ' + iInit;
		};
		// Confirm that a literal character matches the string value
		var checkLiteral = function() {
			if (value.charAt(iValue) != format.charAt(iFormat))
				throw 'Unexpected literal at position ' + iValue;
			iValue++;
		};
		var iValue = 0;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					checkLiteral();
			else
				switch (format.charAt(iFormat)) {
					case 'd':
						day = getNumber('d');
						break;
					case 'D': 
						getName('D', dayNamesShort, dayNames);
						break;
					case 'm': 
						month = getNumber('m');
						break;
					case 'M':
						month = getName('M', monthNamesShort, monthNames); 
						break;
					case 'y':
						year = getNumber('y');
						break;
					case '@':
						var date = new Date(getNumber('@'));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'"))
							checkLiteral();
						else
							literal = true;
						break;
					default:
						checkLiteral();
				}
		}
		if (year < 100)
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		var date = new Date(year, month - 1, day);
		if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
			throw 'Invalid date'; // E.g. 31/02/*
		return date;
	},

	/* Standard date formats. */
	ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
	COOKIE: 'D, dd M yy',
	ISO_8601: 'yy-mm-dd',
	RFC_822: 'D, d M y',
	RFC_850: 'DD, dd-M-y',
	RFC_1036: 'D, d M y',
	RFC_1123: 'D, d M yy',
	RFC_2822: 'D, d M yy',
	RSS: 'D, d M y', // RFC 822
	TIMESTAMP: '@',
	W3C: 'yy-mm-dd', // ISO 8601

	/* Format a date object into a string value.
	   The format can be combinations of the following:
	   d  - day of month (no leading zero)
	   dd - day of month (two digit)
	   D  - day name short
	   DD - day name long
	   m  - month of year (no leading zero)
	   mm - month of year (two digit)
	   M  - month name short
	   MM - month name long
	   y  - year (two digit)
	   yy - year (four digit)
	   @ - Unix timestamp (ms since 01/01/1970)
	   '...' - literal text
	   '' - single quote

	   @param  format    string - the desired format of the date
	   @param  date      Date - the date value to format
	   @param  settings  Object - attributes include:
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  string - the date in the above format */
	formatDate: function (format, date, settings) {
		if (!date)
			return '';
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;	
		};
		// Format a number, with leading zero if necessary
		var formatNumber = function(match, value) {
			return (lookAhead(match) && value < 10 ? '0' : '') + value;
		};
		// Format a name, short or long as requested
		var formatName = function(match, value, shortNames, longNames) {
			return (lookAhead(match) ? longNames[value] : shortNames[value]);
		};
		var output = '';
		var literal = false;
		if (date)
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						output += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							output += formatNumber('d', date.getDate()); 
							break;
						case 'D': 
							output += formatName('D', date.getDay(), dayNamesShort, dayNames);
							break;
						case 'm': 
							output += formatNumber('m', date.getMonth() + 1); 
							break;
						case 'M':
							output += formatName('M', date.getMonth(), monthNamesShort, monthNames); 
							break;
						case 'y':
							output += (lookAhead('y') ? date.getFullYear() : 
								(date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
							break;
						case '@':
							output += date.getTime(); 
							break;
						case "'":
							if (lookAhead("'"))
								output += "'";
							else
								literal = true;
							break;
						default:
							output += format.charAt(iFormat);
					}
			}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var chars = '';
		var literal = false;
		for (var iFormat = 0; iFormat < format.length; iFormat++)
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					chars += format.charAt(iFormat);
			else
				switch (format.charAt(iFormat)) {
					case 'd': case 'm': case 'y': case '@':
						chars += '0123456789'; 
						break;
					case 'D': case 'M':
						return null; // Accept anything
					case "'":
						if (lookAhead("'"))
							chars += "'";
						else
							literal = true;
						break;
					default:
						chars += format.charAt(iFormat);
				}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst) {
		var dateFormat = this._get(inst, 'dateFormat');
		var dates = inst.input ? inst.input.val().split(this._get(inst, 'rangeSeparator')) : null; 
		inst.endDay = inst.endMonth = inst.endYear = null;
		var date = defaultDate = this._getDefaultDate(inst);
		if (dates.length > 0) {
			var settings = this._getFormatConfig(inst);
			if (dates.length > 1) {
				date = this.parseDate(dateFormat, dates[1], settings) || defaultDate;
				inst.endDay = date.getDate();
				inst.endMonth = date.getMonth();
				inst.endYear = date.getFullYear();
			}
			try {
				date = this.parseDate(dateFormat, dates[0], settings) || defaultDate;
			} catch (e) {
				this.log(e);
				date = defaultDate;
			}
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates[0] ? date.getDate() : 0);
		inst.currentMonth = (dates[0] ? date.getMonth() : 0);
		inst.currentYear = (dates[0] ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},
	
	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		var date = this._determineDate(this._get(inst, 'defaultDate'), new Date());
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		date = (minDate && date < minDate ? minDate : date);
		date = (maxDate && date > maxDate ? maxDate : date);
		return date;
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(date, defaultDate) {
		var offsetNumeric = function(offset) {
			var date = new Date();
			date.setUTCDate(date.getUTCDate() + offset);
			return date;
		};
		var offsetString = function(offset, getDaysInMonth) {
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 'd') {
					case 'd' : case 'D' :
						day += (matches[1] - 0); break;
					case 'w' : case 'W' :
						day += (matches[1] * 7); break;
					case 'm' : case 'M' :
						month += (matches[1] - 0); 
						day = Math.min(day, getDaysInMonth(year, month));
						break;
					case 'y': case 'Y' :
						year += (matches[1] - 0);
						day = Math.min(day, getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day);
		};
		return (date == null ? defaultDate :
			(typeof date == 'string' ? offsetString(date, this._getDaysInMonth) :
			(typeof date == 'number' ? offsetNumeric(date) : date)));
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, endDate) {
		var clear = !(date);
		date = this._determineDate(date, new Date());
		inst.selectedDay = inst.currentDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
		if (this._get(inst, 'rangeSelect')) {
			if (endDate) {
				endDate = this._determineDate(endDate, null);
				inst.endDay = endDate.getDate();
				inst.endMonth = endDate.getMonth();
				inst.endYear = endDate.getFullYear();
			} else {
				inst.endDay = inst.currentDay;
				inst.endMonth = inst.currentMonth;
				inst.endYear = inst.currentYear;
			}
		}
		this._adjustInstDate(inst);
		if (inst.input)
			inst.input.val(clear ? '' : this._formatDate(inst) +
				(!this._get(inst, 'rangeSelect') ? '' : this._get(inst, 'rangeSeparator') +
				this._formatDate(inst, inst.endDay, inst.endMonth, inst.endYear)));
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
		if (this._get(inst, 'rangeSelect')) {
			return [inst.rangeStart || startDate, (!inst.endYear ? null :
				new Date(inst.endYear, inst.endMonth, inst.endDay))];
		} else
			return startDate;
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateDatepicker: function(inst) {
		var today = new Date();
		today = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // clear time
		var showStatus = this._get(inst, 'showStatus');
		var isRTL = this._get(inst, 'isRTL');
		// build the date picker HTML
		var clear = (this._get(inst, 'mandatory') ? '' :
			'<div class="ui-datepicker-clear"><a onclick="jQuery.datepicker._clearDate(\'#' + inst.id + '\');"' +
			(showStatus ? this._addStatus(inst, this._get(inst, 'clearStatus') || '&#xa0;') : '') + '>' +
			this._get(inst, 'clearText') + '</a></div>');
		var controls = '<div class="ui-datepicker-control">' + (isRTL ? '' : clear) +
			'<div class="ui-datepicker-close"><a onclick="jQuery.datepicker._hideDatepicker();"' +
			(showStatus ? this._addStatus(inst, this._get(inst, 'closeStatus') || '&#xa0;') : '') + '>' +
			this._get(inst, 'closeText') + '</a></div>' + (isRTL ? clear : '')  + '</div>';
		var prompt = this._get(inst, 'prompt');
		var closeAtTop = this._get(inst, 'closeAtTop');
		var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
		var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
		var numMonths = this._getNumberOfMonths(inst);
		var stepMonths = this._get(inst, 'stepMonths');
		var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
		var currentDate = (!inst.currentDay ? new Date(9999, 9, 9) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		var drawMonth = inst.drawMonth;
		var drawYear = inst.drawYear;
		if (maxDate) {
			var maxDraw = new Date(maxDate.getFullYear(),
				maxDate.getMonth() - numMonths[1] + 1, maxDate.getDate());
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (new Date(drawYear, drawMonth, 1) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		// controls and links
		var prevText = this._get(inst, 'prevText');
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(
			prevText, new Date(drawYear, drawMonth - stepMonths, 1), this._getFormatConfig(inst)));
		var prev = '<div class="ui-datepicker-prev">' + (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? 
			'<a onclick="jQuery.datepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' +
			(showStatus ? this._addStatus(inst, this._get(inst, 'prevStatus') || '&#xa0;') : '') + '>' + prevText + '</a>' :
			(hideIfNoPrevNext ? '' : '<label>' + prevText + '</label>')) + '</div>';
		var nextText = this._get(inst, 'nextText');
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(
			nextText, new Date(drawYear, drawMonth + stepMonths, 1), this._getFormatConfig(inst)));
		var next = '<div class="ui-datepicker-next">' + (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			'<a onclick="jQuery.datepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' +
			(showStatus ? this._addStatus(inst, this._get(inst, 'nextStatus') || '&#xa0;') : '') + '>' + nextText + '</a>' :
			(hideIfNoPrevNext ? '' : '<label>' + nextText + '</label>')) + '</div>';
		var currentText = this._get(inst, 'currentText');
		currentText = (!navigationAsDateFormat ? currentText: this.formatDate(
			currentText, today, this._getFormatConfig(inst)));
		var html = (prompt ? '<div class="' + this._promptClass + '">' + prompt + '</div>' : '') +
			(closeAtTop && !inst.inline ? controls : '') +
			'<div class="ui-datepicker-links">' + (isRTL ? next : prev) +
			(this._isInRange(inst, (this._get(inst, 'gotoCurrent') && inst.currentDay ?
			currentDate : today)) ? '<div class="ui-datepicker-current">' +
			'<a onclick="jQuery.datepicker._gotoToday(\'#' + inst.id + '\');"' +
			(showStatus ? this._addStatus(inst, this._get(inst, 'currentStatus') || '&#xa0;') : '') + '>' +
			currentText + '</a></div>' : '') + (isRTL ? prev : next) + '</div>';
		var firstDay = this._get(inst, 'firstDay');
		var changeFirstDay = this._get(inst, 'changeFirstDay');
		var dayNames = this._get(inst, 'dayNames');
		var dayNamesShort = this._get(inst, 'dayNamesShort');
		var dayNamesMin = this._get(inst, 'dayNamesMin');
		var monthNames = this._get(inst, 'monthNames');
		var beforeShowDay = this._get(inst, 'beforeShowDay');
		var highlightWeek = this._get(inst, 'highlightWeek');
		var showOtherMonths = this._get(inst, 'showOtherMonths');
		var showWeeks = this._get(inst, 'showWeeks');
		var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
		var status = (showStatus ? this._get(inst, 'dayStatus') || '&#xa0;' : '');
		var dateStatus = this._get(inst, 'statusForDate') || this.dateStatus;
		var endDate = inst.endDay ? new Date(inst.endYear, inst.endMonth, inst.endDay) : currentDate;
		for (var row = 0; row < numMonths[0]; row++)
			for (var col = 0; col < numMonths[1]; col++) {
				var selectedDate = new Date(drawYear, drawMonth, inst.selectedDay);
				html += '<div class="ui-datepicker-one-month' + (col == 0 ? ' ui-datepicker-new-row' : '') + '">' +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					selectedDate, row > 0 || col > 0, showStatus, monthNames) + // draw month headers
					'<table class="ui-datepicker" cellpadding="0" cellspacing="0"><thead>' + 
					'<tr class="ui-datepicker-title-row">' +
					(showWeeks ? '<td>' + this._get(inst, 'weekHeader') + '</td>' : '');
				for (var dow = 0; dow < 7; dow++) { // days of the week
					var day = (dow + firstDay) % 7;
					var dayStatus = (status.indexOf('DD') > -1 ? status.replace(/DD/, dayNames[day]) :
						status.replace(/D/, dayNamesShort[day]));
					html += '<td' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end-cell"' : '') + '>' +
						(!changeFirstDay ? '<span' :
						'<a onclick="jQuery.datepicker._changeFirstDay(\'#' + inst.id + '\', ' + day + ');"') + 
						(showStatus ? this._addStatus(inst, dayStatus) : '') + ' title="' + dayNames[day] + '">' +
						dayNamesMin[day] + (changeFirstDay ? '</a>' : '</span>') + '</td>';
				}
				html += '</tr></thead><tbody>';
				var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				var printDate = new Date(drawYear, drawMonth, 1 - leadDays);
				var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7)); // calculate the number of rows to generate
				for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					html += '<tr class="ui-datepicker-days-row">' +
						(showWeeks ? '<td class="ui-datepicker-week-col">' + calculateWeek(printDate) + '</td>' : '');
					for (var dow = 0; dow < 7; dow++) { // create date picker days
						var daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
						var otherMonth = (printDate.getMonth() != drawMonth);
						var unselectable = otherMonth || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						html += '<td class="ui-datepicker-days-cell' +
							((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end-cell' : '') + // highlight weekends
							(otherMonth ? ' ui-datepicker-otherMonth' : '') + // highlight days from other months
							(printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth ?
							' ui-datepicker-days-cell-over' : '') + // highlight selected day
							(unselectable ? ' ' + this._unselectableClass : '') +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ?  // in current range
							' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							(unselectable ? (highlightWeek ? ' onmouseover="jQuery(this).parent().addClass(\'ui-datepicker-week-over\');"' + // highlight selection week
							' onmouseout="jQuery(this).parent().removeClass(\'ui-datepicker-week-over\');"' : '') : // unhighlight selection week
							' onmouseover="jQuery(this).addClass(\'ui-datepicker-days-cell-over\')' + // highlight selection
							(highlightWeek ? '.parent().addClass(\'ui-datepicker-week-over\')' : '') + ';' + // highlight selection week
							(!showStatus || (otherMonth && !showOtherMonths) ? '' : 'jQuery(\'#ui-datepicker-status-' +
							inst.id + '\').html(\'' + (dateStatus.apply((inst.input ? inst.input[0] : null),
							[printDate, inst]) || '&#xa0;') +'\');') + '"' +
							' onmouseout="jQuery(this).removeClass(\'ui-datepicker-days-cell-over\')' + // unhighlight selection
							(highlightWeek ? '.parent().removeClass(\'ui-datepicker-week-over\')' : '') + ';' + // unhighlight selection week
							(!showStatus || (otherMonth && !showOtherMonths) ? '' : 'jQuery(\'#ui-datepicker-status-' +
							inst.id + '\').html(\'&#xa0;\');') + '" onclick="jQuery.datepicker._selectDay(\'#' +
							inst.id + '\',' + drawMonth + ',' + drawYear + ', this);"') + '>' + // actions
							(otherMonth ? (showOtherMonths ? printDate.getDate() : '&#xa0;') : // display for other months
							(unselectable ? printDate.getDate() : '<a>' + printDate.getDate() + '</a>')) + '</td>'; // display for this month
						               printDate.setDate(printDate.getDate() + 1);   // fix for double date in Novembers [ john@johnbarry.us, 11/2009 ] 
					}
					html += '</tr>';
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				html += '</tbody></table></div>';
			}
		html += (showStatus ? '<div style="clear: both;"></div><div id="ui-datepicker-status-' + inst.id + 
			'" class="ui-datepicker-status">' + (this._get(inst, 'initStatus') || '&#xa0;') + '</div>' : '') +
			(!closeAtTop && !inst.inline ? controls : '') +
			'<div style="clear: both;"></div>' + 
			($.browser.msie && parseInt($.browser.version) < 7 && !inst.inline ? 
			'<iframe src="javascript:false;" class="ui-datepicker-cover"></iframe>' : '');
		return html;
	},
	
	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			selectedDate, secondary, showStatus, monthNames) {
		minDate = (inst.rangeStart && minDate && selectedDate < minDate ? selectedDate : minDate);
		var html = '<div class="ui-datepicker-header">';
		html += monthNames[drawMonth] + '&#xa0;';
		html += drawYear;
		html += '</div>'; // Close datepicker_header
		return html;
	},

	/* Provide code to set and clear the status panel. */
	_addStatus: function(inst, text) {
		return ' onmouseover="jQuery(\'#ui-datepicker-status-' + inst.id + '\').html(\'' + text + '\');" ' +
			'onmouseout="jQuery(\'#ui-datepicker-status-' + inst.id + '\').html(\'&#xa0;\');"';
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period == 'Y' ? offset : 0);
		var month = inst.drawMonth + (period == 'M' ? offset : 0);
		var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
			(period == 'D' ? offset : 0);
		var date = new Date(year, month, day);
		// ensure it is within the bounds set
		var minDate = this._getMinMaxDate(inst, 'min', true);
		var maxDate = this._getMinMaxDate(inst, 'max');
		date = (minDate && date < minDate ? minDate : date);
		date = (maxDate && date > maxDate ? maxDate : date);
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period == 'M' || period == 'Y')
			this._notifyChange(inst);
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, 'onChangeMonthYear');
		if (onChange)
			onChange.apply((inst.input ? inst.input[0] : null),
				[new Date(inst.selectedYear, inst.selectedMonth, 1), inst]);
	},
	
	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, 'numberOfMonths');
		return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set - may be overridden for a range. */
	_getMinMaxDate: function(inst, minMax, checkRange) {
		var date = this._determineDate(this._get(inst, minMax + 'Date'), null);
		if (date) {
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
		}
		return (!checkRange || !inst.rangeStart ? date :
			(!date || inst.rangeStart > date ? inst.rangeStart : date));
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - new Date(year, month, 32).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst);
		var date = new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[1]), 1);
		if (offset < 0)
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		// during range selection, use minimum of selected date and range start
		var newMinDate = (!inst.rangeStart ? null :
			new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay));
		newMinDate = (newMinDate && inst.rangeStart < newMinDate ? inst.rangeStart : newMinDate);
		var minDate = newMinDate || this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate));
	},
	
	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, 'shortYearCutoff');
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
			monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day == 'object' ? day : new Date(year, month, day)) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
		return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
	}
});

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props)
		if (props[name] == null || props[name] == undefined)
			target[name] = props[name];
	return target;
};

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && (($.browser.safari && typeof a == 'object' && a.length) ||
		(a.constructor && a.constructor.toString().match(/\Array\(\)/))));
};

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
                    Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate'))
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	return this.each(function() {
		typeof options == 'string' ?
			$.datepicker['_' + options + 'Datepicker'].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
	
/* Initialise the date picker. */
$(document).ready(function() {
	$(document.body).append($.datepicker.dpDiv).
		mousedown($.datepicker._checkExternalClick);
});

})(jQuery);

