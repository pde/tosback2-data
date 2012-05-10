// JavaScript Document
(function($) {

	$(document).ready(function() {
	
   	var banner = $('#tapitBanner'),
   		closeBanner = false,
   		tapCount = 1,
   		closeSize = banner.height()/3,
   		img_src = 'http://img.tapit.com/close-button.png';
   	   banner.css({'display':'none'});
		if( DetectSmartphone() || DetectTierTablet() ) {
			banner.prepend('<div id="closeTapitBanner" style="text-align:center;height:'+closeSize+'px; width:'+closeSize+'px;z-index:999;float:right;position:relative;cursor:pointer;font-size:'+closeSize+'px;"><img src="'+img_src+'" /></div>');
			
			function positionBanner() {
				var scale = 0;
				if(scale == 0) {
					scale=0.15625;
				}
				var height = Math.round(window.innerWidth*scale);
				var width = window.innerWidth;
				var top = window.pageYOffset+window.innerHeight-height;	
				var left = window.pageXOffset;
				
				$('#test').html('');
				$('#test').html("test: ");
				banner.css({'height':height,'width':width,'top':top, 'left':left, 'z-index':'1699999'});
			}
		}		
	if( DetectSmartphone() || DetectTierTablet() ) {
		setInterval(positionBanner,1);
	}
		banner.delegate('#closeTapitBanner', 'click', function() {
			closeBanner = true;
			banner.hide();
		});	
		document.addEventListener('touchstart',function(e) {
			touch = e.touches[0];
			if(touch.pageY<banner.position().top && closeBanner === false) {
				banner.animate({'opacity':0},0); 
			} else {
				if(tapCount < 5) {
					tapCount++;
				} else {
					tapCount = 1;
					closeBanner = false;
					banner.show();
				}
			}
		}, false);
		
		document.addEventListener('touchend',function(e) {
				setTimeout(function() {
					banner.animate({'opacity':1},300);
				},500);
				if(closeBanner === false) {
					
				} else {
					
				}
		}, false);
			
   });
   
})(jQuery);
