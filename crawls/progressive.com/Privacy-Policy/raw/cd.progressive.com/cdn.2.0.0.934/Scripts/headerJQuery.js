
$(document).ready(function() {
	if( $.browser.msie ) {
		var zIndexNumber = 1000;
		$('div').each(function() {
			$(this).css('zIndex', zIndexNumber);
			zIndexNumber -= 10;
		});
	}
	$('ul.utilityNav').superfish({ 
			delay:       400,                            // 400 millisecond delay on mouseout 
			animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
			speed:       'fast',                          // faster animation speed 
			autoArrows:  false,                           // disable generation of arrow mark-up 
			dropShadows: true,                         // enable drop shadows 
			disableHI: 	 false						// true disables hoverIntent detection
		}).find('ul').bgIframe({opacity:false}); 
    $("ul.globalNav").superfish({ 
			delay:       400,                            // 400 millisecond delay on mouseout 
			animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
			speed:       'fast',                          // faster animation speed 
			autoArrows:  false,                           // disable generation of arrow mark-up 
			dropShadows: true,                         // enable drop shadows 
			disableHI: 	 false						// true disables hoverIntent detection

		}).find('ul').bgIframe({opacity:false}); 
	 var winWidth = $(window).width();
                    if (winWidth < 800) {
                        var widthDiff = parseInt($(document).width()) - parseInt(winWidth);
                        window.scrollBy(widthDiff,0);
                    }
	});
