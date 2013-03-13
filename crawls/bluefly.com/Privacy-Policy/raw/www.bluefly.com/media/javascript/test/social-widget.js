(function($){

	$.couponModule = function( customOptions ) {

        var defaultOptions = {
			urlToLike : '',
			discount : '', 
			code : '',
			discountInfo : '',
			terms : '',			
            welcomeText : '', 
            pageHasFB : false, // if true, requires a fbApiInit = true; //init inside fbAsyncInit
            fbAppId : '', 
            // bfly: 175011075869854
            // b+c: 246979982059722 
            promoUrlActivate : false, // If coupon directly activated by a url instead of a coupon code 
            couponUrl : '',
			textBackground : false, // Used on Belleandclive
            textBorder : false, // Used on Bluefly
			rightArrow : '&raquo;',
            leftArrow : '&laquo;'
		};

		// Overriding default options with any custom options            
       var options = $.extend( {}, defaultOptions, customOptions ),
        couponActivateMessage,
        couponCodeHtml,

        // HTML for the popup
		popupHTML = '<div id="fb-root"></div>'+
		'<div class="promo-slider">'+
			'<div class="promo-offer-tab">'+
				'<div class="promo-tab-text">GET ' + options.discount + ' OFF</div>'+
				'<div class="promo-tab-plusminus">' + options.rightArrow + '</div>'+
			'</div>'+
			'<div class="promo-offer-box">'+
				'<div class="promo-offer-wrapper">'+
					'<div class="arrow-down"></div>' + 
					'<div class="promo-text promo-var1">' + options.welcomeText + '</div>'+
					'<div class="promo-text promo-var3">Like us and get<br/>'+ options.discount + ' off ' + options.discountInfo +'</div>'+
					'<div class="pointer"></div>'+ 
					'<div class="promo-text promo-like-area">'+
						'<fb:like href="'+ options.urlToLike +'" width="265" send="false" show_faces="false" action="like"></fb:like>'+
					'</div>'+
					'<div class="promo-text promo-var5 promo-alredy-liked"><a href="#">Already Like Us?</a></div>'+
				'</div>'+
			'</div>'+
			'<div class="promo-terms">'+
				'<div class="promo-terms-details">'+
				'<p>' + options.terms + '</p>' + 
				'</div>'+
				'<div class="promo-terms-show-hide">Terms +</div>'+
			'</div>'+
		'</div>';
			
		$('body').append( $(popupHTML) );

		if ( options.promoUrlActivate ) {
			
			// Used on Belleandclive
			couponCodeHtml = '<div class="promo-offer-wrapper promo-coupon-wrapper">'+
				'<div class="promo-text promo-var2">Thank You For Liking Us On</div>'+
				'<div class="promo-text promo-var3">Facebook</div>' + 
				'<div class="promo-var4">Your discount will automatically apply</div>'+
            	'<div class="promo-var4">during checkout.</div>'+
			'</div>';

		} else {

			// Used on Bluefly
			couponCodeHtml = '<div class="promo-offer-wrapper promo-coupon-wrapper">'+
				'<div class="promo-text promo-var3">Thank You</div>'+
				'<div class="promo-var4">Apply this code during checkout.</div>'+
				'<div class="promo-coupon-code">'+ options.code +'</div>'+
				'</div>';
			'</div>';
		}
		
		// Used on Bluefly
		if ( options.textBorder ) {
			$('.promo-var4').wrap('<div class="promo-border-style"><div class="promo-block">');
			$('.promo-border-style').prepend('<div class="promo-border"></div>');
		}

		// Used on Belleandclive
		if ( options.textBackground ) {
			$('.promo-text:lt(4):gt(0)').wrapAll('<div class="social-background"></div>')
		}

		// Caching Dom Lookups
		var $tab = $('.promo-offer-tab'),
			$tabPlusMinus = $('.promo-tab-plusminus'),
			$sliderBox = $('.promo-slider'),
			$termsTab = $('.promo-terms-show-hide'),
			$terms = $('.promo-terms-details'),
			$alreadyLiked = $('.promo-alredy-liked').find('a');

		if ( options.pageHasFB ) {

			function fbEnsureInit(callback) {
		        if(!window.fbApiInit) {
		            setTimeout(function() {fbEnsureInit(callback);}, 50);
		        } else {
		            if(callback) {
		                callback();
		            }
		        }
		    }
		 
			fbEnsureInit(function() {
			    FB.Event.subscribe('edge.create',
				    function(response) {
				    	if ( options.couponUrl ) {

				    		$.ajax({
					    		url : options.couponUrl,
					    		success : function (data) {
					    			//console.log(data);
					    		}
				    		})

				    	}

				        $('.promo-offer-box').html( couponCodeHtml );
				    }
				);
			});

		} else {

			window.fbAsyncInit = function() {
				// init the FB JS SDK
				FB.init({
				  appId   : options.fbAppId, // App ID from the App Dashboard
				  xfbml   : true  // parse XFBML tags on this page?
				});

				// Additional initialization code such as adding Event Listeners goes here
				// Event for when user likes
				FB.Event.subscribe('edge.create',
				    function(response) {
				        $('.promo-offer-box').html( couponCodeHtml );
				    }
				);

			};

			// FB Call
			(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=" + options.fbAppId;
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));

		}

		//Already Liked link
		$alreadyLiked.click(function(){

			if ( options.couponUrl ) {

	    		$.ajax({
		    		url : options.couponUrl,
		    		success : function (data) {
		    			console.log(data);
		    		}
	    		})

	    	}

			$('.promo-offer-box').html( couponCodeHtml );
			return false; 

		})

		// Slider Toggle
		$tab.toggle(
			function() {
				$sliderBox.animate({ left: '0' }, 500, function(){
					$tabPlusMinus.html(options.leftArrow);
				});
				return false;
			},
			function() {
				$sliderBox.animate({ left: '-450px' }, 500, function(){
					$tabPlusMinus.html(options.rightArrow);
				});
				return false;
			}

		);

		// Terms Toggle
		$termsTab.toggle(
			function() {
				$terms.slideDown('fast', function(){
					$termsTab.text('Terms -');
				});
			},
			function() {
				$terms.slideUp('fast', function(){
					$termsTab.text('Terms +');
				});	
			}
		);
	} 

}(jQuery));
 



