/* 
Author: JP Schwinghamer | Mint.com
*/

$(document).ready(function(){

	//Login
	
	if($.cookie('wa_login') == null && $.cookie('userguid') == null){ // If the wa_login and userguid cookie is absent (if the user is not a current active user)
	    $('#credentials').remove(); // Remove login credentials form
	}
	else { // So if the wa_login cookie is present (if the user is an active user)
	    $.cookie('mintRememberMe', null, {expires: -7, path:'/', domain: '.mint.com'}); // Clear the login.event remember me cookie
	    $('#credentials #password, #credentials #username').css({opacity: 1});  // Fade In the credentials form
	    if($.cookie('hp-mintRememberMe') != null){ // If the remember me cookie is present
	    	$('#credentials #username').val($.cookie('hp-mintRememberMe'));  // Set the username value to the cookie value
	    	$('#credentials #password').val('');  // Remove the faux password to prevent confusion
	    } // Done fading in form
	    
	    $('#user_auth .login.button').click(function(e){  // When the user clicks the login button
	    	if($('#remember').is(':checked')){  /* If the remember me checkbox is checked */
	    		$.cookie('hp-mintRememberMe', $('#username').val(), {expires: 7, path: '/', domain: '.mint.com'}); // Create the remember me cookie with the username
	    	}
	    	else	{  // If it's not checked
	    		$.cookie('hp-mintRememberMe', null, {expires: -7, path:'/', domain: '.mint.com'}); // Clear the remember me cookie
	    	}
	    	
			if($('#user_auth #username').val() == 'Email') { /* If the username is set to 'Email' on click event */	    	
				$('#user_auth #username').val(''); /* Change it to be null when submitted */
			}
			$('#credentials').submit();  // Submit the form	
	    	e.preventDefault();
	    })
	} // end login cookie
	
	$('#user_auth input').focus(function(){ // On focus
	    $('.form_box').animate({opacity: 1}, 300);  // Fadein the form background
	    $('#user_auth .hide').animate({opacity: 1}, 300); // Fadein anything with the hide class (form elements)
	    if($('#user_auth #username').val() == 'Email') {  // If the form is in the default state, 'Email' is still the input value
	    	$('#credentials #password, #credentials #username').val(''); // Clear the input values			
	    }
	    if($.cookie('hp-mintRememberMe') != null){  // If the remember me cookie is set
	    	$('#remember').attr('checked', true);
	    }
	}); //end
	    
	$('#user_auth #password').keypress(function(e){  // If you the user presses a key while in the form

	    if(e.which == 13) { // If that key is 'enter'
	    	if($('#remember').is(':checked')){  /* If the remember me checkbox is checked */
	    		$.cookie('hp-mintRememberMe', $('#username').val(), {expires: 7, path: '/', domain: '.mint.com'}); // Create the remember me cookie with the username
	    	}
	    	else	{  // If it's not checked
	    		$.cookie('hp-mintRememberMe', null, {expires: -7, path:'/', domain: '.mint.com'}); // Clear the remember me cookie
	    	}
	    	
			if($('#user_auth #username').val() == 'Email') { /* If the username is set to 'Email' on click event */	    	
				$('#user_auth #username').val(''); /* Change it to be null when submitted */
			}
	  		$('#credentials').submit(); //Submit the credentials form
	  		e.preventDefault();
	  	}
	}) // end
	
	//Signup
	$('#signup-form .signup-button').click(function(e){
		mboxUpdate('mint_hp_signup_submit');		
		setTimeout(function(){
			$('#signup-form').submit();
		}, 1000)
		e.preventDefault();
	}) // end
	
	$('#signup-form').keypress(function(e){
	    if(e.which == 13){ // If that key is 'enter'
			mboxUpdate('mint_hp_signup_submit');			
			setTimeout(function(){
				$('#signup-form').submit();
			}, 1000)
	    }
	}) // end
	
	//Launch Video
	
	$('.launch_video').click(function(){	
		
		if (navigator.mimeTypes ["application/x-shockwave-flash"]==undefined){
			window.open('http://www.youtube.com/watch?v=rK6WLHNYjwM');
			return false;
		}
		
		$('<div id="video_overlay"><iframe title="YouTube video player" class="youtube-player" type="text/html" width="844" height="505" src="https://www.youtube.com/embed/rK6WLHNYjwM?rel=0&amp;hd=1;autoplay=1" frameborder="0" style="display:block; margin-bottom:15px"></iframe></div>').appendTo('body').append('<div class="close"></div>').append('<a class="medium orange button" href="https://wwws.mint.com/login.event?task=S"><span class="get_started">Free! Get started here</span></a>').fadeIn('fast');

		//Append the page transparent overlay
		$('body').append('<div id="page_overlay"></div>');
		
		/* Grab viewport height middle position */ 
		var vph = $(window).height() / 2;
		
		/* Grab viewport width middle position */ 
		var vpw = $(window).width() / 2;
		
		/* Grab overlay height middle position */ 
		var vbh = $('#video_overlay').height() /2;

		/* Grab overlay width middle position */ 
		var vbw = $('#video_overlay').width() /2;
		
		/* Find overlay height middle on screen */ 
		var hoffsetval = vph - vbh - 15 + 'px';
		
		/* Find overlay width middle on screen */ 
		var woffsetval = vpw - vbw - 15 + 'px';
		
		/* Assign top offset to overlay and make visible */ 
		$('#video_overlay').css({'top' : hoffsetval, 'left' : woffsetval,  'visibility': 'visible'});
		return false
	});	

	//Launch Security Video
	
	$('.launch_security_video').click(function(){	

		if (navigator.mimeTypes ["application/x-shockwave-flash"]==undefined){
			window.open('http://www.youtube.com/watch?v=go5YnAlp0iw');
			return false;
		}
	
		$('<div id="video_overlay"><iframe title="YouTube video player" class="youtube-player" type="text/html" width="700" height="550" src="https://www.youtube.com/embed/go5YnAlp0iw?rel=0&amp;hd=1;autoplay=1" frameborder="0" style="display:block; margin-bottom:15px"></iframe></div>').appendTo('body').append('<div class="close"></div>').append('<a class="medium orange button" href="https://wwws.mint.com/login.event?task=S"><span class="get_started">Free! Get started here</span></a>').fadeIn('fast');
		
		//Append the page transparent overlay
		$('body').append('<div id="page_overlay"></div>');
		
		/* Grab viewport height middle position */ 
		var vph = $(window).height() / 2;
		
		/* Grab viewport width middle position */ 
		var vpw = $(window).width() / 2;
		
		/* Grab overlay height middle position */ 
		var vbh = $('#video_overlay').height() /2;

		/* Grab overlay width middle position */ 
		var vbw = $('#video_overlay').width() /2;
		
		/* Find overlay height middle on screen */ 
		var hoffsetval = vph - vbh - 15 + 'px';
		
		/* Find overlay width middle on screen */ 
		var woffsetval = vpw - vbw - 15 + 'px';
		
		/* Assign top offset to overlay and make visible */ 
		$('#video_overlay').css({'top' : hoffsetval, 'left' : woffsetval,  'visibility': 'visible'});
		return false
	});	
	
	//Launch How-To Video
	
	$('.launch_how-to_video').click(function(){
		var videoURL = $(this).find('a').attr('href');
		
		if (navigator.mimeTypes ["application/x-shockwave-flash"]==undefined){
			window.open(videoURL);
			return false;
		}
	
		$('<div id="video_overlay"><iframe title="YouTube video player" class="youtube-player" type="text/html" width="844" height="505" src="' + videoURL + '?hd=1;autoplay=1" frameborder="0" style="display:block; margin-bottom:15px"></iframe></div>').appendTo('body').append('<div class="close"></div>').append('<a class="medium orange button" href="https://wwws.mint.com/login.event?task=S"><span class="get_started">Free! Get started here</span></a>').fadeIn('fast');
		
		//Append the page transparent overlay
		$('body').append('<div id="page_overlay"></div>');
		
		/* Grab viewport height middle position */ 
		var vph = $(window).height() / 2;
		
		/* Grab viewport width middle position */ 
		var vpw = $(window).width() / 2;
		
		/* Grab overlay height middle position */ 
		var vbh = $('#video_overlay').height() /2;

		/* Grab overlay width middle position */ 
		var vbw = $('#video_overlay').width() /2;
		
		/* Find overlay height middle on screen */ 
		var hoffsetval = vph - vbh - 15 + 'px';
		
		/* Find overlay width middle on screen */ 
		var woffsetval = vpw - vbw - 15 + 'px';
		
		/* Assign top offset to overlay and make visible */ 
		$('#video_overlay').css({'top' : hoffsetval, 'left' : woffsetval,  'visibility': 'visible'});
		return false
	});	

	//Launch Community Video
	
	$('.launch_community_video').click(function(){
		var videoURL = $(this).find('a').attr('href');
		
		if (navigator.mimeTypes ["application/x-shockwave-flash"]==undefined){
			window.open(videoURL);
			return false;
		}
	
		$('<div id="video_overlay"><iframe title="YouTube video player" class="youtube-player" type="text/html" width="844" height="505" src="' + videoURL + '?hd=1;autoplay=1" frameborder="0" style="display:block; margin-bottom:15px"></iframe></div>').appendTo('body').append('<div class="close"></div>').append('<a class="medium orange button" href="https://wwws.mint.com/login.event?task=S"><span class="get_started">Free! Get started here</span></a>').fadeIn('fast');
		
		//Append the page transparent overlay
		$('body').append('<div id="page_overlay"></div>');
		
		/* Grab viewport height middle position */ 
		var vph = $(window).height() / 2;
		
		/* Grab viewport width middle position */ 
		var vpw = $(window).width() / 2;
		
		/* Grab overlay height middle position */ 
		var vbh = $('#video_overlay').height() /2;

		/* Grab overlay width middle position */ 
		var vbw = $('#video_overlay').width() /2;
		
		/* Find overlay height middle on screen */ 
		var hoffsetval = vph - vbh - 15 + 'px';
		
		/* Find overlay width middle on screen */ 
		var woffsetval = vpw - vbw - 15 + 'px';
		
		/* Assign top offset to overlay and make visible */ 
		$('#video_overlay').css({'top' : hoffsetval, 'left' : woffsetval,  'visibility': 'visible'});
		return false
	});	
	
	//Close Video
	$('#video_overlay .close').live('click', function(){
		$(this).parent().fadeOut('fast', function(){
			$('#video_overlay').remove();
		});
		$('#page_overlay').fadeOut('fast', function(){
			$(this).remove();
		});		
	})
	
	$(document).click(function(){
	    if($('#video_overlay').is(':visible')){
	    	$('#video_overlay').fadeOut('fast', function(){
	    		$('#video_overlay').remove();
	    	});
			$('#page_overlay').fadeOut('fast', function(){
				$(this).remove();
			});		
	    }
	})
	
	/* Accolades */
	
	/* Toggle Panels */
	$('.show_more_button').toggle(function(){	
		if($.browser.msie){
	    	$(this).parent().parent().find('.hidden').show().css({visibility : 'visible'});
		}
		else{
	    	$(this).parent().parent().find('.hidden').slideDown().css({opacity: 0, visibility : 'visible'}).animate({opacity : '1'});
	    }
	    var title = $(this).parent().parent().find('h3').html().toLowerCase();
	    $(this).html('See less ' + title).addClass('open');
	    },
	    function()	{
	    	if($.browser.msie){
	    		$(this).parent().parent().find('.hidden').hide();
	    	}
	    	else{
	    		$(this).parent().parent().find('.hidden').animate({opacity : '0'}).slideUp();
	    	}
	    	var title = $(this).parent().parent().find('h3').html().toLowerCase();
	    	$(this).html('See more ' + title).removeClass('open');
	    }
	);
	
	/* Launch Mini Video Popup */
	$('.video_popup').click(function(){
		var videoURL = $(this).attr('href');
		
		if (navigator.mimeTypes ["application/x-shockwave-flash"]==undefined){
			return false;
		}
		
		$('<div id="video_overlay"><iframe title="YouTube video player" class="youtube-player" type="text/html" width="844" height="505" src="' + videoURL + '?hd=1;autoplay=1" frameborder="0" style="display:block; margin-bottom:15px"></iframe></div>').appendTo('body').append('<div class="close"></div>').append('<a class="medium orange button" href="https://wwws.mint.com/login.event?task=S"><span class="get_started">Free! Get started here</span></a>').fadeIn('fast');

		//Append the page transparent overlay
		$('body').append('<div id="page_overlay"></div>');
		
		/* Grab viewport height middle position */ 
		var vph = $(window).height() / 2;
		
		/* Grab viewport width middle position */ 
		var vpw = $(window).width() / 2;
		
		/* Grab overlay height middle position */ 
		var vbh = $('#video_overlay').height() /2;

		/* Grab overlay width middle position */ 
		var vbw = $('#video_overlay').width() /2;
		
		/* Find overlay height middle on screen */ 
		var hoffsetval = vph - vbh + 'px';
		
		/* Find overlay width middle on screen */ 
		var woffsetval = vpw - vbw + 'px';
		
		/* Assign top offset to overlay and make visible */ 
		$('#video_overlay').css({'top' : hoffsetval, 'left' : woffsetval,  'visibility': 'visible'});
		return false
	});
	
	//Grab mintlife json feed for news updates
	
	if($('.news_updates').length){
		$.getJSON('https://www.mint.com/blog/feed/service/?cat=Updates&count=20&orderby=desc&callback=?', function(data){	
			$.each(data.posts, function(i,post){
			
				var date = new Date(post.published);
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var year = date.getFullYear();
				
				if(i < 5) {
					$('.news_updates .initial').append('<div class="entry clearfix"><div class="news_date">' + month + '/' + day + '/' + year + '</div><div class="news_item"><a href="' + post.link + '">' + post.title + '</a></div></div>');
				}
				else {
					$('.news_updates .hidden').append('<div class="entry clearfix"><div class="news_date">' + month + '/' + day + '/' + year + '</div><div class="news_item"><a href="' + post.link + '">' + post.title + '</a></div></div>');
				}
			})
		})
	}
	
	//Grab twitter json feed for news updates
	
	if($('.news_updates').length){
		$.getJSON('https://twitter.com/status/user_timeline/mint.json?count=15&callback=?', function(data){	
			$.each(data, function(i,post){
				
				// convert to local string and remove seconds and year //		
				var timestamp = post.created_at;
				var newtext = timestamp.replace(/(\+\S+) (.*)/, '$2 $1')          
				var date = new Date(newtext);
				
				// this is for Safari it was returning NaN when newtext is used. It's a know issue related to date formatting
				if(isNaN(date)) {
					var date = new Date(timestamp);
				} 

				var month = date.getMonth() + 1;
				var day = date.getDate();
				var year = date.getFullYear();
        
				if(i < 5) {
				$('.news_tweets .initial').append('<div class="entry clearfix"><div class="news_date">' + month + '/' + day + '/' + year + '</div><div class="news_item"><a href="https://www.twitter.com/mint/">' + post.text + '</a></div></div>');
				}
				else {
					$('.news_tweets .hidden').append('<div class="entry clearfix"><div class="news_date">' + month + '/' + day + '/' + year + '</div><div class="news_item"><a href="https://www.twitter.com/mint/">' + post.text + '</a></div></div>');
				}
			})
		})
	}
	
	// Tax Legalese Popup
	$('.tax_popup').click(function(){
		$('<div id="tax_popup"><h1 style="font-size: 22px">Maximum Refund Guarantee – or Your Money Back</h1><p class="nowrap">If you get a larger refund or smaller tax due from another tax preparation method, we\'ll refund the applicable<br /> TurboTax federal and/or state purchase price paid. TurboTax Federal Free Edition customers are entitled<br />to payment of $14.95 and a refund of your state purchase price paid.*</p><hr/><p>*Claims must be submitted within 60 days of your TurboTax filing date and no later than 6/17/12.<br />Optional add-on services excluded.  Cannot be combined with TurboTax Satisfaction (Easy) Guarantee.</p></div>').appendTo('body').append('<div class="close"></div>').fadeIn('fast');
		
		//Append the page transparent overlay
		$('body').append('<div id="page_overlay"></div>');
				
		/* Grab viewport height middle position */ 
		var vph = $(window).height() / 2;
		
		/* Grab viewport width middle position */ 
		var vpw = $(window).width() / 2;
		
		/* Grab overlay height middle position */ 
		var vbh = $('#tax_popup').height() /2;

		/* Grab overlay width middle position */ 
		var vbw = $('#tax_popup').width() /2;
		
		/* Find overlay height middle on screen */ 
		var hoffsetval = vph - vbh + 'px';
		
		/* Find overlay width middle on screen */ 
		var woffsetval = vpw - vbw + 'px';
		
		/* Assign top offset to overlay and make visible */ 
		$('#tax_popup').css({'top' : hoffsetval, 'left' : woffsetval,  'visibility': 'visible'});
		return false
	});
	
	//Close Tax Popup
	$('#tax_popup .close').live('click', function(){
		$(this).parent().fadeOut('fast', function(){
			$('#tax_popup').remove();
		});
		$('#page_overlay').fadeOut('fast', function(){
			$(this).remove();
		});		
	})
	
	$(document).click(function(){
	    if($('#tax_popup').is(':visible')){
	    	$('#tax_popup').fadeOut('fast', function(){
	    		$('#tax_popup').remove();
	    	});
			$('#page_overlay').fadeOut('fast', function(){
				$(this).remove();
			});		
	    }
	})
	
	/* Education Feed */
	if($('body#education').length){
		$.getJSON('https://www.mint.com/blog/feed/service/?tag=education&count=6&orderby=desc&callback=?', function(data){	
			
			/* Create an array for the post categories */
			var catArray = new Array();
			
			$.each(data.posts, function(i,post){
				
				/* Loop through each category */
				$.each(post.categories, function(j,category){
				    
				    /* Construct a link for each category and push it to the array */
				    catArray.push('<a href="http://www.mint.com/blog/category/' + category.category_nicename + '">' + category.cat_name + '</a>');
				});
				
				/* Join each category array element with a comma */
				var cats = catArray.join(', ');
				
				/* Ensure HTTPS image reference */
				var image = post.thumbnail.replace('http', 'https');
				
				$('.left.column .articles').append('<div class="article clearfix"><div class="thumb"><img src="' + image + '"/></div><div class="category">' + cats + '</div><div class="title"><a href="' + post.link + '">' + post.title + '</a></div><div class="date">' + post.published + '</div></div>');
				
				/* Clear Array before each loop */
				catArray = [];
			})
		})
	}
	
	/* Launch Education Game */
	$('.launch_game').click(function(){
		$('<div id="video_overlay"><iframe src="https://www.mint.com/wp-content/themes/mint7/games/questformoney/mint_dot_com.swf" width="800px" height="600px"></iframe></div>').appendTo('body').append('<div class="close"></div>').show();
		
		//Append the page transparent overlay
		$('body').append('<div id="page_overlay"></div>');
		
		/* Grab viewport height middle position */ 
		var vph = $(window).height() / 2;
		
		/* Grab viewport width middle position */ 
		var vpw = $(window).width() / 2;
		
		/* Grab overlay height middle position */ 
		var vbh = $('#video_overlay').height() /2;

		/* Grab overlay width middle position */ 
		var vbw = $('#video_overlay').width() /2;
		
		/* Find overlay height middle on screen */ 
		var hoffsetval = vph - vbh - 15 + 'px';
		
		/* Find overlay width middle on screen */ 
		var woffsetval = vpw - vbw - 15 + 'px';
		
		/* Assign top offset to overlay and make visible */ 
		$('#video_overlay').css({'top' : hoffsetval, 'left' : woffsetval,  'visibility': 'visible'});
		return false
	})	
	
	//Launch Quest Video
	
	$('.launch_quest_video').click(function(){	
		
		if (navigator.mimeTypes ["application/x-shockwave-flash"]==undefined){
			window.open('http://www.youtube.com/watch?v=rK6WLHNYjwM');
			return false;
		}
		
		$('<div id="video_overlay"><iframe title="YouTube video player" class="youtube-player" type="text/html" width="844" height="505" src="https://www.youtube.com/embed/a8BYVLc8Ev4?rel=0&amp;hd=1;autoplay=1" frameborder="0" style="display:block; margin-bottom:15px"></iframe></div>').appendTo('body').append('<div class="close"></div>').append('<a class="medium orange button" href="https://wwws.mint.com/login.event?task=S"><span class="get_started">Free! Get started here</span></a>').fadeIn('fast');

		//Append the page transparent overlay
		$('body').append('<div id="page_overlay"></div>');
		
		/* Grab viewport height middle position */ 
		var vph = $(window).height() / 2;
		
		/* Grab viewport width middle position */ 
		var vpw = $(window).width() / 2;
		
		/* Grab overlay height middle position */ 
		var vbh = $('#video_overlay').height() /2;

		/* Grab overlay width middle position */ 
		var vbw = $('#video_overlay').width() /2;
		
		/* Find overlay height middle on screen */ 
		var hoffsetval = vph - vbh - 15 + 'px';
		
		/* Find overlay width middle on screen */ 
		var woffsetval = vpw - vbw - 15 + 'px';
		
		/* Assign top offset to overlay and make visible */ 
		$('#video_overlay').css({'top' : hoffsetval, 'left' : woffsetval,  'visibility': 'visible'});
		return false
	});	

	// dismiss alert box on community page
	$(".community .close").click(function() {
		$(this).parent().slideUp().children().fadeOut();
	});
	

	//iPad link in hero on home page
	$(".mobile_caption .ipad").click(function(){
        wa.iPadAppDownload($(this),'link', 'ipad')
    });
	
	//Links on the mobile landing page //////////////////////////////////////
	//ipad
	$('.anywhere .ipad .get-app').click(function(){
        wa.appDownloadAttempt($(this), 'link', 'ipad');
    });
	
	//iphone
	$('.anywhere .iphone .get-app').click(function(){
        wa.appDownloadAttempt($(this), 'link', 'iphone');
    });
	
	//android
	$('.anywhere .android .get-app').click(function(){
        wa.appDownloadAttempt($(this), 'link', 'android');
    });

    //android tablet 
    $('.anywhere .android-tablet .get-app').click(function(){
        wa.appDownloadAttempt($(this), 'link', 'android-tablet');
      });

    // Links on the ipad page //////////////////////////////////////////////////////////
	// It's Free! Get the app link
	$('body.ipad .top_cta_text').click(function(){
		wa.appDownloadAttempt($(this),'link','ipad');
	});
	
	// CTA link in hero copy
	$('body.ipad .more').click(function(){
		wa.appDownloadAttempt($(this),'link','ipad');
	});
	
	//CTA button at bottom of ipad page
	$('body.ipad .button').click(function(){
		wa.appDownloadAttempt($(this),'button','ipad');
		var t=setTimeout("return(true)",350);
	});
  
  
  // Links on the iphone page ///////////////////////////////////////////////////////
	// It's Free! Get the app link
	$('body.iphone .top_cta_text').click(function(){
		wa.appDownloadAttempt($(this),'link','iphone');
	});
	
	// CTA link in hero copy
	$('body.iphone .more').click(function(){
		wa.appDownloadAttempt($(this),'link','iphone');
	}); 
	
	// CTA button at bottom of the page
	$('body.iphone .button').click(function(){
		wa.appDownloadAttempt($(this),'button','iphone');
		var t=setTimeout("return(true)",350);
	});

    // Links on the android page ///////////////////////////////////////////////////////
	// It's Free! Get the app link
	$('body.android .top_cta_text').click(function(){
		wa.appDownloadAttempt($(this),'link','android');
	}); 

	// CTA link in hero copy
	$('body.android .more').click(function(){
		wa.appDownloadAttempt($(this),'link','android');
	}); 
	
	// CTA button at bottom of the page
	$('body.android .button').click(function(){
		wa.appDownloadAttempt($(this),'button','android');
		var t=setTimeout("return(true)",350);
	});

	 // Links on the android tablet page ///////////////////////////////////////////////////////
	// It's Free! Get the app link
	$('body.android-tablet .top_cta_text').click(function(){
		wa.appDownloadAttempt($(this),'link','android-tablet');
	}); 

	// CTA link in hero copy
	$('body.android-tablet .more').click(function(){
		wa.appDownloadAttempt($(this),'link','android-tablet');
	}); 
	
	// CTA button at bottom of the page
	$('body.android-tablet .button').click(function(){
		wa.appDownloadAttempt($(this),'button','android-tablet');
		var t=setTimeout("return(true)",350);
	});
	
  	// Mobile links - iPad, iPhone and Android ////////////////////////////////////////////
  	$('#mobile.m.ipad .button').click(function() {
    	wa.appDownloadAttempt($(this),'button','ipad');
  	});
  
  	$('#mobile.m.iphone .button').click(function() {
    	wa.appDownloadAttempt($(this),'button','iphone');
  	});
  
  	$('#mobile.m.android .button').click(function() {
    	wa.appDownloadAttempt($(this),'button','android');
  	});

  	$('#mobile.m.android-tablet .button').click(function() {
    	wa.appDownloadAttempt($(this),'button','android-tablet');
  	});


// start home page tour
  // if(typeof waTourTest != 'undefined'){
  //     // add variable for test switching
  //     if (waTourTest === 'tour-b') {
  //       $('#hp-tour').addClass('tour-b');
  //       $('.mobile_hero').hide();
  //     } 
  //     else if (waTourTest === 'tour-c') {
  //       $('#hp-tour').addClass('tour-c');
  //       $('.mobile_hero').hide();
  //     } 
  //     else if (waTourTest === 'default') {
  //       $('#hp-tour').css('display', 'none');
  //     };
  // } 
  
// start slide show stuff
  $("#previous").hide();
 
  var currentPosition = 0;
  var slideWidth = 960;
  var slides = $(".slide");
  var numberOfSlides = slides.length;
  var slideShowWidth = slideWidth * numberOfSlides;
  
  //caching often used DOM elements
  var slideInner = $('#slideInner');
  var caret = $('.caret');
  var previous = $('#previous');
  var next = $('#next');

  // set width of #slideinner to the width of all the slides
  $("#slideInner").css('width', slideShowWidth);

  // autoplay commented out for the time being
  var t = setInterval(autoPlay, 6000);

  // slideshow animations. Left or Right arrow click
  $(caret).click(function() {
    "use strict";
    clearInterval(t);
    currentPosition = ($(this).attr('id')==='next') ? currentPosition+1 : currentPosition-1; 
    manageControls(currentPosition);
    moveSlide(currentPosition);
    return false;
  });

  // slideshow nav
  // $('#hp-tour #slide-nav a').click(function() {
  //   var navMarker = $(this).attr('id');
  //   var destinationPosition = parseInt(/\d/.exec(navMarker));
  //   // stop auto play
  //   clearInterval(t); 
  //   currentPosition = destinationPosition-1;
  //   updateNavIcon(currentPosition);
  //   manageControls(currentPosition);
  //   moveSlide(currentPosition);
  //   return false;
  // });

  function manageControls(position) {
    "use strict";
    if (position === 0) {  //hide previous slide arrow if on first slide
     $(previous).hide();
    } 
    else {
      $(previous).show();
    }

    // hide right arrow
    if(position === numberOfSlides-1) { //hide next slide arrow if on last slide 
      $(next).hide();  
    }
    else {
      $(next).show();
    }
  } // end manageControls
  
  //create a navigation function 
  function updateNavIcon(position) {
    "use strict";
    var targetId = '#slideNumber'+ (parseInt(position, 10) + 1);
    //first remove the indicator for currnetly highlighted 
    $('#slide-nav a.selected').removeClass('selected');
    //add indicator as to which slide is selected
    $('#slide-nav').find(targetId).addClass('selected');
  } // end navigationIndicator
  
  function autoPlay() {
    "use strict";
    $("#previous").show();
    if (currentPosition === 2) {
      currentPosition = 0;
      moveSlide(currentPosition);
      // updateNavIcon(currentPosition);
    } 
    else {
      currentPosition += 1;
      moveSlide(currentPosition);
      // updateNavIcon(currentPosition);
    }
  } // end autoPlay

  function moveSlide(position) {
    "use strict";
    var leftPosition = (slideWidth * (-position)).toString();
    $('#slideInner').animate({
      "left" : leftPosition
    });
  }



}) // end doc.ready



