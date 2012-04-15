/*
Item Name : jQuery Sticky Footer 
Author URI : http://themeforest.net/user/Keliah
Version : 1.0
*/


(function($){


	$.fn.stickyFooter = function(options){


		var options = $.extend({
			speed : 'fast', // Drop up speed (how fast it appears on mouse hover or click
			effect : 'hover_fade', // Effect to show the drop ups : 'hover_fade', 'hover_slide', 'hover_toggle', 'click_fade', 'click_slide' or 'click_toggle' 
			showhidefooter : 'hide', // Footer can be hidden when the page loads
			hide_speed : 1000, // Time to hide the footer (in milliseconds) if the 'showhidefooter' option is set to 'hide'
			hide_delay : 2000 // Time before hiding the footer (in milliseconds) if the 'showhidefooter' option is set to 'hide'
		}, options);


		return this.each(function() {
			
			
			var $this = $(this),
				footerItems = $this.find('li'),
				footerDropup = $(footerItems).children('.footer_dropup')


			footerSetup();
			positionFooter();
			//opacityElements();
		
			
			function dropupOver(){
				
				var dropUp = $('.footer_dropup',this);
				
				if(options.effect == 'hover_fade'){
					$(dropUp).fadeIn(options.speed);
				}
				if(options.effect == 'hover_slide'){
					$(dropUp).slideDown(options.speed);
				}
				if(options.effect == 'hover_toggle'){
					$(dropUp).toggle(options.speed);
				}
				if(options.effect == 'click_fade'){
					$(this).click(function() {
						$(dropUp).fadeIn(options.speed); 
					});
				}
				if(options.effect == 'click_slide'){
					$(this).click(function() {
						$(dropUp).slideDown(options.speed);
					});
				}
				if(options.effect == 'click_toggle'){
					$(this).click(function() {
						$(dropUp).show(options.speed);
					});
				}

			}
		
			
			function dropupOut(){
				
				var dropUp = $('.footer_dropup',this);
				$(dropUp).hide();
				
			}


			function footerSetup(){

				// HoverIntent Configuration
				var config = {
					sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)
					interval: 100, // number = milliseconds for onMouseOver polling interval
					over: dropupOver, // function = onMouseOver callback (REQUIRED)
					timeout: 200, // number = milliseconds delay before onMouseOut
					out: dropupOut // function = onMouseOut callback (REQUIRED)
				};
				
				$(footerItems).hoverIntent(config);
				$(footerDropup).hide();
				
			}


			function positionFooter() {
				
				if( options.showhidefooter == 'hide' ) { // Option to hide the footer when the page loads
					$this.stop().delay(options.hide_delay).slideToggle(options.hide_speed);
					$('#footer_trigger').toggleClass("active");
				} else if( options.showhidefooter == 'show' ) {
					$this.stop().hide().fadeIn(300);
				}
				
				$('#footer_trigger').live('click', function() { // Hiding and showing the footer when clicking on the trigger
					$this.slideToggle(400);
					$('#footer_trigger').toggleClass("active");
					return false;
				});
				
			}	


		}); // End each


		function opacityElements() { // Chaging opacity of the social icons on mouse hover and mouse out
			
			/*$('.tooltip').css({"opacity": 0.85}).hover(function() { 
				$(this).stop().animate({"opacity": 1}); 
			},function() { 
				$(this).stop().animate({"opacity": 0.85}); 
			});*/
			
			// jQuery Mega Menu Effects
	

			
		}	

		
	};
	
	
})(jQuery);