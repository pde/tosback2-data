window.SalonComments = {};

// Copied from grid per Vynce TODO move this to a common/utility location?
SalonComments.zeropad = function (number, length) { 
	if (length == undefined) length = 2;
	if (number == undefined) number = 0;
	var string = '';
	for (var i = 0; i < length; i++) { 
		string = string + '0';
	}
	string = string + number;
	return string.substr(-1*length);
}

// parent_element should be a jquery handle on something we append comments to, data is the comment json data for this comment 
SalonComments.makeComment = function( parent_element, data, options ) {

	// Get the parent class information, parse it up, figure out our depth
	var max_depth_limit = 6; // TODO hardcode
	var max_depth = false; // flag that indicates we are at max depth
	var parent_class = parent_element.attr( 'class' );
	var parent_class_array = parent_class.split( ' ' );
	var this_class = '';
	var new_class = '';
	var depth = '';
	var depth_array = '';
	var new_depth = 1;
	jQuery.each( parent_class_array, function( key, val ) {
		if( 'even' == val ) {
			new_class += 'odd ';
		}
		if( 'odd' == val ) {
			new_class += 'even ';
		}
		depth = val.substr( 0, 5 );
		if( 'depth' == depth ) {
			depth_array = val.split( '-' );
			depth = depth_array[1];
			new_depth = parseInt( depth );
			new_depth += 1;
			if( new_depth > max_depth_limit ) new_depth = max_depth_limit; 
			new_class += 'depth-'+new_depth+' ';
		}
	}); // iterate over parent comment CSS classes
	if( data.depth >= max_depth_limit ) {
		max_depth = true;
	}
	
	data.max_depth = max_depth; // this flags if we are at maximum depth, and if so we won't print any more reply links
	new_class += 'comment-author-'+data.author+' '; // This lets us highlight the author
	parent_element.jqoteapp( '#comment-template', data ); // Copy the template over and append it to the parent element
	jQuery( '#comment-'+data.comment_id ).addClass( new_class );
	// Lets convert the date from GMT to browser local
	d = new Date( data.date_gmt*1000 );  // milliseconds shmilliseconds
	var days = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday' };
	var months = { 0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December' };
	var date_string = days[d.getDay()]+', '+months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()+' at ';
	if( d.getHours() > 12 ) date_string += (d.getHours() - 12)+':'+SalonComments.zeropad( d.getMinutes(), 2 )+' pm';
	if( d.getHours() <= 12 ) date_string += d.getHours()+':'+SalonComments.zeropad( d.getMinutes(), 2 )+' am';
	jQuery( '#datetime-'+data.comment_id ).html( date_string );
	// Figure out if the user has already flagged this post
	var flagged_cookie = getCookie( "salon_reported_comments_list" );	
	var flagged_array;
	if( typeof( flagged_cookie ) == 'string' && flagged_cookie != undefined && flagged_cookie.length > 0 ) {
		flagged_array = flagged_cookie.split( "%2C" ); //lolcomma
		jQuery.each( flagged_array, function( key, val ) {
			if( val == data.comment_id ) {
				SalonComments.showFlagged( data.comment_id );
				return;
			}
		});
	}
	// Check if the user is Premium
	if( typeof( data.comment_type ) == 'string' && data.comment_type.indexOf("p") > -1 ) {
		jQuery( '#commentAuthor-'+data.comment_id ).after('<a title="Salon Core Member" href="/premium/" class="core_user"><img src="/content/themes/salon/images/ui/icon_salonCore20.png" alt="Salon Core Member" /></a>');
	}
	if( options != null && options.highlight ) {  // Flash the post background
		setTimeout(function(){ SalonComments.showComment( data.comment_id ); }, 500); 
		setTimeout(function(){ jQuery( '#comment-'+data.comment_id ).effect( "highlight", {}, 3000 ); }, 500);
	}	

	return true;
}

var previewHolder, previewButton;

SalonComments.previewComment = function(){
    var date = new Date(),
        data = {
            comment:'<p>'+jQuery("textarea#comment").val().split(/[\n\r]/).join("</p><p>")+'</p>',
            author:jQuery(".userName").html(),
            authorURL:"#",
            avatar:"",
            depth:0,
            permalink:"#",
            date_gmt:date.toLocaleDateString() + " " + date.toLocaleTimeString().match(/\d\d\:\d\d/)
        };

    data.comment = data.comment.replace(/<script\b[^>]*>(.*?)<\/script>/gi, "");

    previewHolder.empty();
    previewHolder.jqoteapp( '#comment-template', data );
    previewHolder.find(".comment-content *:not(p,a[href],b,em,strong,i,blockquote)").remove();
};

// This is from Wordpress originally, /wp-includes/js/comment-reply.dev.js -- had to debug it, might as well move it in for performance
SalonComments.moveForm = function(commId, parentId, respondId, postId)
{
	var t = this, div; 
	var comm = document.getElementById(commId);
	var respond = document.getElementById(respondId);
	var cancel = document.getElementById('cancel-comment-reply-link');
	var parent = document.getElementById('comment_parent'); 
	var post = document.getElementById('comment_post_ID');

	if ( ! comm || ! respond || ! cancel || ! parent ) {
		return;
	}

	t.respondId = respondId;

	postId = postId || false;

	if ( ! document.getElementById('wp-temp-form-div') ) {
		div = document.createElement('div');
		div.id = 'wp-temp-form-div';
		div.style.display = 'none';
		respond.parentNode.insertBefore(div, respond);
	}

	comm.parentNode.insertBefore(respond, comm.nextSibling);
	if ( post && postId )
		post.value = postId;
	parent.value = parentId;
	cancel.style.display = '';

	cancel.onclick = function() {
        if(previewHolder){
            previewHolder.empty();
        }
		var temp = document.getElementById('wp-temp-form-div'), respond = document.getElementById(t.respondId);

		if ( ! temp || ! respond )
			return;

		document.getElementById('comment_parent').value = '0';
		temp.parentNode.insertBefore(respond, temp);
		temp.parentNode.removeChild(temp);
		this.style.display = 'none';
		this.onclick = null;

		jQuery('#comment').val(''); // Erase the contents of the comment submit form
		SalonComments.moveForm( 'respond-home', '0', 'respond', post_id ); 

		return false;
	}

	// If this is a reply to a comment, lets make sure the parent is in view?
	if( parentId != null && parentId != 0 && jQuery( '#comment-'+parentId ) != null ) {
		SalonComments.showComment( parentId ); 
	}

	return false;
} // end SalonComments.moveForm

SalonComments.highlight = function( ele_id, on_or_off, color ) {
	if( color == '' ) color = '#ffff99';
	if( on_or_off ) {
		jQuery( ele_id ).effect( "highlight", { 'color': color }, 3000 );
	} else {
		jQuery( ele_id ).stop( true, true ); // clear the hightlight effect
	}
}

// Generate the comments list for a given post/page of comments
SalonComments.doComments = function( post_id, currentpage, options ) {
	// Now fetch the actual comments 
	var target_url = salon_ssl_home +  '/comment-json/'+post_id+'/'+currentpage+'/';
	if( options != null && options['target_comment'] > 0 ) {
		target_url += options['target_comment']+'/';
	}

    if(previewHolder){
        previewHolder.empty();
    }

	jQuery.ajax({
		url: target_url,
		type: 'GET',
		dataType: 'jsonp',
		success: function(data) { 
			var perpage = comments_per_page;
			if( data == null ) {
				return;
			}
			if( data.error != null ) {
				jQuery('#error').html( data.error );
				return;
			}
			jQuery('#commentCount_'+post_id).html( data['comment_count'] ); // Update the number of comments
			if( data['comment_count'] == 0 ) {
				return;
			}
			jQuery('.pagination_'+post_id).html(''); // erase old pagination
			// Do pagination 
			var totalpages = Math.ceil( data['comment_count'] / perpage );
			if( totalpages < 1 ) totalpages = 1;
			if( totalpages > 1 ) {
				var paginationdata = 	{ 	
							'totalpages' : totalpages,
							'currentpage' : currentpage,
							'prevpage' : (currentpage-1),
							'nextpage' : (currentpage+1),
							'post_id' : post_id
							}
				jQuery('.pagination_'+post_id).jqoteapp( '#pagination-template', paginationdata );
			}
			jQuery( '.pagination_'+post_id ).append( '<a href="javascript:SalonComments.doComments( '+post_id+', '+currentpage+', {} );" class="refreshComments">Refresh Comments</a>' );
			// We need to rescue the comment form if it's in this list and we destroy it, we don't have a mechanism to rebuild it yet TODO? 
			SalonComments.moveForm( 'respond-home', '0', 'respond', post_id ); // Move it to the top where it's a response to the post, not to a comment
			// Wipe out the current comments, if any
			jQuery( '#commentList_'+post_id ).html('');
			var ad_moved = false;
			jQuery.each( data['comments'], function( key, val ) {
				var parent_element;
				if( val.parent_comment_id == null ) { // if this is a reply to a comment, put it below that parent TODO what if parent doesn't exist 
					parent_element = jQuery( '#comment-'+data.parent_comment_id ); // TODO untested
				}
				if( parent_element == null ) {
					parent_element = jQuery( '#commentList_'+post_id );
				}
				val.permalink = data['post_permalink']+'singleton/#comment-'+val.comment_id;
				val.status = data.status;
				if( options != null && options['highlight'] == val.comment_id ) {
					SalonComments.makeComment( parent_element, val, { 'highlight' : true } );
				} else {
					SalonComments.makeComment( parent_element, val );
				}
				if( ad_moved == false && key > Math.floor( data.comment_count / 2 ) ) {
					ad_moved = true;
					jQuery( '#comment-'+val.comment_id ).after( jQuery('#commentsAd') );
				}
			}); // iterate over each of the returned comments 
		}
	});
} // SalonComments.doComments 

// Rate up a comment
SalonComments.rateComment = function( post_id, comment_id ) { 
	jQuery.ajax({
		url: salon_ssl_home + '/comment-rate/'+post_id+'/'+comment_id+'/',
		type: 'GET',
		dataType: 'jsonp',
		success: function(data) {
			if( data == null ) {
				jQuery('#error').html( "Unable to rate this comment, please email help@salon.com" ); // TODO 
				return;
			}
			if( data.error != null ) {
				jQuery('#error').html( data.error );
				return;
			}
			if( data.rated != null && data.rated == true ) {
				jQuery('#karma-'+comment_id).html( data.karma ).css( 'color', 'green' ).attr( 'onclick', '' );
				jQuery('#comment-rating-'+comment_id).effect( "highlight", {}, 3000 );
			} else {
				jQuery('#error').html( "Unable to rate this comment, please email help@salon.com" ); // TODO 
			}
		},
		error: function(data) {
			jQuery('#error').html( "There was a problem reporting this comment. Please email help@salon.com" ); // TODO 
		}
	});
} // SalonComments.rateComment 

SalonComments.reportComment = function( comment_id ) {
	jQuery.ajax({
		url: salon_ssl_home + '/comment-report/'+comment_id+'/',
		type: 'GET',
		dataType: 'jsonp',
		success: function(data) {
			if( data == null ) {
				jQuery('#error').html( "Unable to flag this comment, please email help@salon.com" ); // TODO 
				return;
			}
			if( data.error != null ) {
				jQuery('#error').html( data.error );
				return;
			}
			if( data.reported != null && data.reported == true ) {
				SalonComments.showFlagged( comment_id );
			} else {
				jQuery('#error').html( "Unable to flag this comment, please email help@salon.com" ); // TODO 
			}
		},
		error: function(data) {
			jQuery('#error').html( "There was a problem reporting this comment. Please email help@salon.com" ); // TODO 
		}
	});
} // SalonComments.reportComment 

// This shows that the comment is flagged, called from reportComment when someone clicks the link and from makeComment when building a comment that this user has reported
SalonComments.showFlagged = function( comment_id ) {
	jQuery('#reportcomment_results_div_'+comment_id).html( "Flagged" ).css( 'color', 'red' ).attr( 'onclick', '' );
} // SalonComments.showFlagged

SalonComments.showComment = function( comment_id ) {

	// Hacked up from code found here -- http://beski.wordpress.com/2009/04/21/scroll-effect-with-local-anchors-jquery/
	// Figure out the parent element we're looking for
	var trgt = 'comment-'+comment_id;
	//get the top offset of the target anchor
	var target_offset = jQuery("#"+trgt);
	var target_top = target_offset.offset().top - 20; // Float 20 pixels higher up the page, so it looks better

	//goto that anchor by setting the body scroll top to anchor top
	jQuery('html, body').animate({scrollTop:target_top}, 500);
}


// Fetch the comments -- this code was adapted from a plugin called "ajax-comment-posting", hence the ACP.  It's not .45 Automatic Colt Pistol
// TODO break this off into a function
jQuery(document).ready(function($){
	jQuery.noConflict();

	// Enable the POST button again
	jQuery( '#submit' ).removeAttr( 'disabled' );

	// initialise
	var form, err;
	function acp_initialise() {
		jQuery('#commentform').after('<div id="error"></div>');
		form = jQuery('#commentform');
		err = jQuery('#error');
	}
	acp_initialise();
	
	jQuery('.comment-reply-link').live('click', function() {
		err.empty();
	});

    var oldValue = jQuery("textarea#comment").val();
    previewHolder = jQuery('<div class="previewHolder"></div>');
    previewButton = jQuery('<input type="submit" name="preview" value="Preview"/>');
    previewHolder.insertAfter(jQuery("#reply-title"));
    previewButton.insertBefore(jQuery("input#submit"));
    previewButton.click(function(e){
        e.preventDefault();
        previewButton.attr("disabled", "disabled");
        SalonComments.previewComment();
        return false;
    });
    jQuery("textarea#comment").keyup(function(e){
        var newValue = jQuery("textarea#comment").val();
        if(oldValue !== newValue){
            oldValue = newValue;
            previewButton.removeAttr("disabled");
        }
    });


	// Handle the Comment Form
        jQuery('#commentform').live('submit', function(evt) {
		err.empty();
    
		if(form.find('#comment').val() == '') {
		    err.html('<span class="error">Please enter your comment</span>');
		    return false;
		}
		jQuery(this).ajaxSubmit({
			dataType: 'jsonp',
			beforeSend: function(xhr) {
				xhr.withCredentials = true;
			},
			beforeSubmit: function() {
				jQuery('#loading').show();
				jQuery('#submit').attr('disabled','disabled');
			}, // end beforeSubmit
			complete: function(data) { },
			error: function(request,more,info){
				err.empty();
				jQuery('#error').html( "There was an error posting your comment, contact help@salon.com" );
				jQuery('#loading').hide();
				jQuery('#submit').removeAttr("disabled");
				return false;
			}, // end error()
			success: function(data) {
				jQuery('#submit').removeAttr("disabled"); // Re-enable the submit button
				jQuery('#loading').hide(); // Hide the spinner
				if( data == null ) {
					jQuery('#error').html( "There was an error posting your comment" );
					return;
				}
				if( data.error != null ) {
					jQuery('#error').html( data.error );
					return;
				}
				jQuery('#comment').val(''); // Erase the contents of the comment submit form
				// Get the parent element, the new comment will be appended to this
				SalonComments.doComments( data.post_id, data.comment_page, { 'highlight' : data.comment_id } );
			} // end success()
		}); // end ajaxSubmit()
		return false;  // Prevent default window event
	}); // end form.submit()
}); // end document.ready()
