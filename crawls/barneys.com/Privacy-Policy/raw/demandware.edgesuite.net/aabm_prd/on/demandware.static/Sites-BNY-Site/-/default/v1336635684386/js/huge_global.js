	
/*
Namespace: BNYS
Barneys Global Javascript

File: huge_global.js

About: Version
0.1

Description:
Global HUGE Javascript for barneys.com

Requires:

*/

var BNYS = (function ($, bnys, app) {
	
	bnys.views = bnys.views || {};

	bnys.isiPad = navigator.userAgent.match(/iPad/i) != null;
	bnys.isiPhone = navigator.userAgent.match(/iPhone/i) != null;
	bnys.isIe6 = (window.XMLHttpRequest == undefined) && (ActiveXObject != undefined);
	
	
	var global = {
		ie6Fixes:function(){

			$("ul#navigation li.dropdown").hover(function(){
				$(this).addClass("hover")
			}, function(){
			    $(this).removeClass("hover")
			});
		},
		clearFormDefaults:function(){
			// clear defaults on forms
			$("input:text").not($('.no-clear')).clearDefault();
		},
		toggleNewsletterForm:function(){
			var newsletter = $("#newsletter");
			var newsletterLink = newsletter.find("a.flyout");
			var dropdown = $("#newsletter").find("div.dropdown");
			var config = {    
			    over: function(){
					dropdown.show();
					newsletterLink.addClass("flyout-open")
					
				},    
				timeout: 500, // number = milliseconds delay before onMouseOut    
				out: function(){
					dropdown.hide();
					newsletterLink.removeClass("flyout-open")
				}    
			};
			
			newsletter.hoverIntent(config);
			
			// stop the newsletter from clicking through
			newsletterLink.click(function(e){
				e.preventDefault();
			});
		},
		
		headerCallout:function() {
			var clickArea = $('#header-shipping');
			var toolTip = $('#header-shipping-tooltip');
			var closeButton = $('.tipper-close');


			clickArea.mouseover(function () {
					toolTip.show();
			});
			
			clickArea.mouseout(function () {
				toolTip.hide();	    
		});
			

			toolTip.mouseover(function () {
					toolTip.show();
				});

			toolTip.mouseout(function () {
				toolTip.hide();
			});
				
			closeButton.click(function(e) {
				e.preventDefault();
				toolTip.stop().fadeOut('fast');
			});
		},
		
		extendMiniCart:function(){
			if (app.minicart) {
				
				app.minicart.addScrollbars = function(){
					
					var miniCartContent = jQuery("#minicart .minicartcontent");
					var checkoutMiniCart = jQuery('#minicart .checkoutminicart');
					var numOfItems = checkoutMiniCart.children("div.summaryproduct").length;
					
					if (numOfItems > 6){
						
						miniCartContent.show();
						checkoutMiniCart.css({"height":"480px"}).jScrollPane({
							verticalGutter: 16});
						miniCartContent.hide();
					}
				}

				app.minicart.addScrollbars();
				$(".addtocartbutton").click(function(e) {
					app.minicart.addScrollbars();

				});
				
				// slide down and show the contents of the mini cart
				app.minicart.slide =  function() {
					if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
						return;
					}
						
					// show the item
					jQuery('.minicartcontent').show();

					clearTimeout(app.minicart.timer);
					app.minicart.timer = null;
						
					// after a time out automatically close it
					app.minicart.timer = setTimeout( 'app.minicart.close()', 5000 );
				};
				
				// closes the mini cart with given delay
				app.minicart.close =  function(delay) {
					if ( app.minicart.timer != null || delay == 0) {
						clearTimeout( app.minicart.timer );
						app.minicart.timer = null;					
						jQuery('.minicartcontent').hide(); // hide with "slide" causes to fire mouse enter/leave events sometimes infinitely thus changed it to fadeOut
					}
				};
			}
		}
	};
	
	bnys.views.initGlobal = function(){
		global.clearFormDefaults();
		global.toggleNewsletterForm();
		global.extendMiniCart();
		global.headerCallout();

		
		if( bnys.isIe6){
			global.ie6Fixes();
		}
	}
	return bnys;
	
})(jQuery, BNYS || {}, app)
