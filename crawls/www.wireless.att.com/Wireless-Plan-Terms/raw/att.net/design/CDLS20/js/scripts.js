$(document).ready(function(){
	
	$('.mainNav li.last').hover(
		function(){
			$(this).find('.subNav').stop(true, true).slideDown('fast');
			$(this).find('a').not('.subNav a').css({'color':'#ff7100','text-decoration':'underline'});
			$(this).css({'background-position':'-251px -48px'});
		},
		function(){
			$(this).find('.subNav').stop(true, true).slideUp();
			$(this).find('a').not('.subNav a').css({'color':'#1e1e1e','text-decoration':'none'});
			$(this).css({'background-position':'72px -48px'});
		}
	)	
	
	
	// LEGACY IE DETECTION FOR CSS PIE - ROUNDED CORNERS
	if ( $.browser.msie ) {
		var ieVer = parseInt($.browser.version, 10);
			if (ieVer < 9 ) {
				// ADD CSS PIE JS TO THE DOM
				$.getScript('/js/pie/1.0b5/pie.js', function(){
				if (window.PIE) {
					$('#GlobalNav ul li.selected, #masthead section, .subChannels, #pageBody, .searchInput input').each(function() {
						PIE.attach(this);
					});
				}
			});
		}
	}
	
})