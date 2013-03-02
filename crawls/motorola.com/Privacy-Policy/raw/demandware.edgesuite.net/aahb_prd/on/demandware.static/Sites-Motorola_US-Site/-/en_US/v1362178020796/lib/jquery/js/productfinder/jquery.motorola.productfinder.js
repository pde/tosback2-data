(function($){
	
	$.fn.productFinder = function(options){
		// cache the element we want to operate on
		var $this = $(this)
			$ul = $this.children('ul'), // the unordered list which holds the products
			$lis = $ul.children('li'), // the list items of the ul
			settings = $.extend({
				boxHeight: 108,
				boxWidth: 75
			},options),
			ulLen = 0,
			$jspC = '';
		
		// calculate the length required for the UL list
		$lis.each(function(){
			ulLen += $(this).outerWidth();
		});
		// set the width of the UL so that LI elements will not be break
		$ul.width(ulLen);	
		
		// after the DOM is set-up, add the handlers on the a elements so that 
		// animations can be done
		 $lis.hover(function(){
			$(this).find('img.rollover')
				.fadeIn('slow')
				.siblings('img.static')
				.fadeOut('slow');
		 },
		 function(){
			 $(this).find('img.static')
				.fadeIn('slow')
				.siblings('img.rollover')
				.fadeOut('slow');
		 });		
		
		// activate the jScrollPane
		$this.jScrollPane({
            showArrows : true
        }); 
		
//		$jspC = $this.find('.jspContainer');
//		// add the masks
//		$('<div>', {
//			class : 'mask mask-left'
//		}).appendTo($jspC);
//		$('<div>', {
//			class : 'mask mask-right'
//		}).appendTo($jspC);
		
		return $(this);
	}
	
})(jQuery);