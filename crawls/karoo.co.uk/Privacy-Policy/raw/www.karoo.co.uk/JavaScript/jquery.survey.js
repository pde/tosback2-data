// JavaScript Document

$(document).ready(function() {
		
		$("#survey-link").hide();
		
		var i = 0;
		var activetime = 15000;
		if ($.cookie('pagecount')) {
			pagecount = $.cookie('pagecount');
			if (pagecount < 3) {
				pagecount++;
				$.cookie('pagecount', pagecount, { path: '/' })
			}
		} else {
			$.cookie('pagecount', "1", { path: '/' });
		}
		
		if ($.cookie('pagecount') >= 3) {
			activetime = 0;
		}
			
		// settting the cookie info
		var survey = $.cookie('survey'); // sets variable with the value of the cookie.
		var survey_never = $.cookie('survey_never'); // sets variable with the value of the cookie.
		if (survey == 'notnow' || survey_never == 'never') { //if cookie exists and has a value of 'yes the do this ...
			return false; // if already visited return false
		} else { // if cookie does not exist do this ...
			setTimeout(function(){
				$("#survey-link").trigger('click');
			},activetime);
		}
		
		$('.not-now').click(function() {
			$('#fancybox-close').trigger('click');
			$.cookie('survey', 'notnow', { path: '/' }); // set cookie to say user has visited. expires in 7 days
		});
		
		$('.never').click(function() {
			$('#fancybox-close').trigger('click');
			$.cookie('survey_never', 'never', { path: '/', expires: 28 }); // set cookie to say user has visited. expires in 7 days
		});
		
		$('.take-survey').click(function() {
			$('#fancybox-close').trigger('click');
			$.cookie('survey_never', 'never', { path: '/', expires: 28 }); // set cookie to say user has visited. expires in 7 days
		});
		
		$('#fancybox-close').click(function() {
			$.cookie('survey', 'notnow', { path: '/' }); // set cookie to say user has visited. expires in 7 days
		});
		


$("a.surveytermslb").fancybox({
		'transitionIn'	:	'fade',
		'transitionOut'	:	'fade',
		'speedIn'		:	200, 
		'speedOut'		:	200, 
		'padding'		:	20,
		'autoDimensions' :	false,
		'width'			:	800,
		'height'		:	400,
		'centerOnScroll' :	false,
		'overlayShow'	:	true,
		'scrolling'	:	'yes',
		'titleShow'	:	false
		});

});