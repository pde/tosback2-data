commentsExpanded = false;

$(function(){

// Topics Widget
    $('#topics .topic-title').append("<span class='tt-arrow'></span>");

	$('#topics .topic-title').click(function() {
	    $(this).toggleClass("on");
		$(this).next(".topic-content").slideToggle("fast");
		return false;
	}).next().hide();
	// here's a comment //
	// hover state for the arrows
	$('#topics .topic-title').hover(
      function () {
        $(this).addClass("hover");
      },
      function () {
        $(this).removeClass("hover");
      }
    );


// Comments Widget

	$("#comments .num-replies").live("click", function(){
	    	$(this).toggleClass("on");
    		$(this).parents(".comments-content").find(".reply-container").slideToggle("fast");
    		//	$(this).next(".reply-container").slideToggle("fast");
    		return false;
    }).next().hide();

	$('.comments-options #expand-all-comments').click(function() {
		$(this).hide();
		$('.comments-options #collapse-all-comments').show();
		$('#comments .num-replies').addClass('on');
		$('#comments .reply-container').slideDown('fast');
		commentsExpanded = true;
		return false;
	});

	$('.comments-options #collapse-all-comments').click(function() {
		$(this).hide();
		$('.comments-options #expand-all-comments').show();
		$('#comments .num-replies').removeClass('on');
		$('#comments .reply-container').slideUp('fast');
		commentsExpanded = false;
		return false;
	});



	// Hide the reply button if the user is not logged in
	if ( $('.reply').is(':hidden') ) {
        $('.reply').show();
    	$('.num-replies').show();
    }

	var u = mtGetUser();
	if (!u) {
    	$('.reply-button').hide();
    }
    else{
    	$('.reply-button').show();
    }



    /* REPLY BUTTON NEEDS TO BE HIDDEN ON COMMENT PAGINATION PAGES - This code is not fully working _ under development */
	$("#prev-comments").live("click", function(){
    	if (!u) {
        	$('.reply-button').hide();
        }
    });

    $("#next-comments").live("click", function(){
    	if (!u) {
        	$('.reply-button').hide();
        }
    });

    $("#top-prev-comments").live("click", function(){
    	if (!u) {
        	$('.reply-button').hide();
        }
    });

    $("#top-next-comments").live("click", function(){
    	if (!u) {
        	$('.reply-button').hide();
        }
    });

// Featured & Popular

    $('#featured-popular #popular a').addClass("on");

  $('#featured-popular #popular a').click(function() {
	    $('#popular a').toggleClass("on");
	    $('#featured a').removeClass("on");
  $('#popular-content').show();	  
  $('#featured-content').hide();
	  
	});


    $('#featured-popular #featured a').click(function() {
	    $('#featured a').toggleClass("on");
	    $('#popular a').removeClass("on");
 $('#popular-content').hide();	   
 $('#featured-content').show();
	   
	});

  

// Hot Stories Carousel
    function mycarousel_initCallback(carousel)
    {
        // Disable autoscrolling if the user clicks the prev or next button.
        carousel.buttonNext.bind('click', function() {
            carousel.startAuto(0);
        });

        carousel.buttonPrev.bind('click', function() {
            carousel.startAuto(0);
        });

        // Pause autoscrolling if the user moves with the cursor over the clip.
        carousel.clip.hover(function() {
            carousel.stopAuto();
        }, function() {
            carousel.startAuto();
        });
    };

	$('#hot-carousel').jcarousel({
         scroll: 1,
         /* wrap: "both", */
         initCallback: mycarousel_initCallback
     });

    $('#video-carousel').jcarousel({
          scroll: 1,
         /*  wrap: "both", */
          initCallback: mycarousel_initCallback
    });

    if ($('body.company-directory').size) {
        var all_text = $('.alpha-nav h3 span').text();
        $('.industry-filters').show();
        $('a.industry').click(function () {
            var target = $(this).attr('href').substring(1);
            $('div.company').hide();
            $('div.' + target).show();
            $('a.current-filter').removeClass('current-filter');
            $('a.' + target).addClass('current-filter');
            $('.alpha-nav h3 span').html($(this).text());
            return false;
        });
        $('a.all').click(function () {
            $('.company').show();
            $('.alpha-nav h3 span').html(all_text);
            return false;
        });
    };

// Profile Tabs (the dumb easy way)
// edit from the future -- I am not the responsible for this... (grck)
    $('.tab1').click(function() {
		$('#tab_content1').show();
	  	$('#tab_content2').hide();
	  	$('#tab_content3').hide();
	  	$('#tab_content4').hide();
	  	$('#tab_content5').hide();
	  	$('#tab_content6').hide();
		$(".tab1").addClass("active");
		$(".tab2").removeClass("active");
		$(".tab3").removeClass("active");
		$(".tab4").removeClass("active");
		$(".tab5").removeClass("active");
		$(".tab6").removeClass("active");
	  return false;
	});
	$('.tab2').click(function() {
		$('#tab_content2').show();
	  	$('#tab_content1').hide();
	  	$('#tab_content3').hide();
	  	$('#tab_content4').hide();
	  	$('#tab_content5').hide();
	  	$('#tab_content6').hide();
		$(".tab2").addClass("active");
		$(".tab1").removeClass("active");
		$(".tab3").removeClass("active");
		$(".tab4").removeClass("active");
		$(".tab5").removeClass("active");
		$(".tab6").removeClass("active");
	  return false;
	});
    $('.tab3').click(function() {
		$('#tab_content3').show();
	  	$('#tab_content2').hide();
	  	$('#tab_content1').hide();
	  	$('#tab_content4').hide();
	  	$('#tab_content5').hide();
	  	$('#tab_content6').hide();
		$(".tab3").addClass("active");
		$(".tab2").removeClass("active");
		$(".tab1").removeClass("active");
		$(".tab4").removeClass("active");
		$(".tab5").removeClass("active");
		$(".tab6").removeClass("active");
	  return false;
	});
    $('.tab4').click(function() {
		$('#tab_content4').show();
	  	$('#tab_content2').hide();
	  	$('#tab_content3').hide();
	  	$('#tab_content1').hide();
	  	$('#tab_content5').hide();
	  	$('#tab_content6').hide();
		$(".tab4").addClass("active");
		$(".tab2").removeClass("active");
		$(".tab3").removeClass("active");
		$(".tab1").removeClass("active");
		$(".tab5").removeClass("active");
		$(".tab6").removeClass("active");
	  return false;
	});
    $('.tab5').click(function() {
   		$('#tab_content5').show();
   	  	$('#tab_content2').hide();
   	  	$('#tab_content3').hide();
   	  	$('#tab_content4').hide();
   	  	$('#tab_content1').hide();
	  	$('#tab_content6').hide();
   		$(".tab5").addClass("active");
   		$(".tab2").removeClass("active");
   		$(".tab3").removeClass("active");
   		$(".tab4").removeClass("active");
   		$(".tab1").removeClass("active");
  		$(".tab6").removeClass("active");
   	  return false;
   	});
    $('.tab6').click(function() {
		$('#tab_content6').show();
	  	$('#tab_content2').hide();
	  	$('#tab_content3').hide();
	  	$('#tab_content4').hide();
	  	$('#tab_content5').hide();
	  	$('#tab_content1').hide();
		$(".tab6").addClass("active");
		$(".tab2").removeClass("active");
		$(".tab3").removeClass("active");
		$(".tab4").removeClass("active");
		$(".tab5").removeClass("active");
		$(".tab1").removeClass("active");
	  return false;
	});

// Blockquote styling
	$('blockquote').prepend('<div class="quote-open">&ldquo;</div>');
	$('blockquote').append('<div class="quote-close">&rdquo;</div>');
	$('.attribution').prev('blockquote').addClass('attributed');

// Clear/restore default text in textarea (for comments)
	$('textarea').focus(function() {
		if (this.value==this.defaultValue)
		this.value = ''
	});
	$('textarea').blur(function() {
		if (this.value=='')
		this.value = this.defaultValue
	});

	$('#comment-submit').click(function() {
		comment_text = $('#comment-text').val();
		if (comment_text=='Enter text...') {
			alert('Please enter a comment for submission');
			return false;
		} else {
			return true;
		}
	});

// Delicious
/*
    var delicious = "<script type=\"text/javascript\" src=\"http://feeds.delicious.com/v2/js/gercheq?title=&count=5&sort=date&extended\"><";
    delicious += "/script>";

    $('#reports .w-content').append(delicious);
*/


// Set the exact place of the ad
    $('.entry-container').eq(2).insertAfter("#ad520x85");

// Remove extra stuff from homepage pagination secondary pages
    if( $('#current-string').text() != "" )
    {
        $('#yes-search-results').show();
    }

// Hover on states for jCarousel prev-next buttons


    $(".jcarousel-prev").hover(
      function () {
        $(this).css("background-position","left bottom");
      },
      function () {
          $(this).css("background-position","left top");
      }
    );

    $(".jcarousel-next").hover(
      function () {
        $(this).css("background-position","right bottom");
      },
      function () {
          $(this).css("background-position","right top");
      }
    );

});

// Create URL to allow comment moderation
function moderateComment (c) {
    var u = 'http://consumerist.com/cgi-bin/mt/mt.cgi';
    var m = '?__mode=view&_type=comment&id=';
    var b = '&blog_id=1';
    window.location = u + m + c + b;
}

