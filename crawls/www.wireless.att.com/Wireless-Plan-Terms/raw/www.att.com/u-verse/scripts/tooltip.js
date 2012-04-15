jQuery(function($){
	$.getScript = function(url, callback, cache){
		$.ajax({
				type: "GET",
				url: url,
				success: callback,
				dataType: "script",
				cache: cache
		});
	};

	if($('.tooltips').length != 0){
		$.getScript('http://www.att.com/scripts/jquery.poshytip.js', $.fn.tooltips, true);
	}
});

/* BEGIN FUNCTIONS */
(function($){

	/* TOOLTIPS*/
	$.fn.tooltips = function(){
		$(".tooltips").focus(function(){
			$(this).mouseover();
		});
		$(".tooltips").blur(function(){
			$(this).mouseout();
		});		
		$(".tooltips").each(function() {
			$(this).poshytip({
				content: jQuery($(this).attr('href')).html(),				  
				className: 'tip-white',
				showTimeout: 0.2,
				alignTo: 'target',
				alignX: 'center',
				offsetX: 10,
				allowTipHover: true,
				bgImageFrameSize: 6,
				backgroundGradient: '//www.att.com/images/global/tooltip/tip-white/backgroundwhite.gif',
				//	showOn: 'focus', 
				fade: true,
				slide: false
			});							  	
		}); 
	};

})(jQuery);
