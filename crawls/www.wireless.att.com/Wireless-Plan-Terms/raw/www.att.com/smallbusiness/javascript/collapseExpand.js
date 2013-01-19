(function($)
{
    
	var defaultSettings = {
			rowsToHide			: 0 , 
			expandClass 		: '',
			collapseClass		: '',
			collapsableContent	: '',
			spanClass			: ''
		    
	};

	var settings = $.extend({}, defaultSettings, settings || {});
	
	function toggleImage($minus_sign,$plus_sign){
		if ($plus_sign.is(':visible')) {
    		$plus_sign.css("display", "none");
    		$minus_sign.css("display", "block");
		} else {
			$minus_sign.css("display", "none");
			$plus_sign.css("display", "block");
		}
	}
	
	$.fn.CollapseExpand = function(settings)
	{
	    return this.each(function()
	    {	
	    	
	    	var elem = $(this);
	    	
	    	//Collapse and expand only specified rows
	    	if(settings['rowsToHide'] > 0){
	    		
		    	var wrapper			=	$(this).closest('.wrapper');
		    	var $collapseImage	=	wrapper.find('.'+settings['collapseClass']);
		    	var $expandImage	=	wrapper.find('.'+settings['expandClass']);
	            var table 			=	wrapper.find('table');
	            table.find('td').wrapInner('<div style="display:block" />');
				table.find('tr:gt('+settings['rowsToHide']+') div').css("display","none");
	            $(this).bind('click',function(){
	            	table.find('tr:gt('+settings['rowsToHide']+') div').slideToggle(900);
	            	toggleImage($collapseImage,$expandImage);
	            });
	            return true;
	    	}
	    	
	    	// Normal Collapse and Expand
	        var $tabHeading 		= 	elem.find('.'+settings['spanClass']);
	        var $expandImage		=	$tabHeading.find('.'+settings['expandClass']);
	        var $collapseImage		=	$tabHeading.find('.'+settings['collapseClass']);
	        var $collapsableContent = 	elem.find('.'+settings['collapsableContent']);
	       
	        $tabHeading.each(function(){
	        	$tabHeading.click(function(){
		        	$collapsableContent.toggle();
		        	toggleImage($collapseImage,$expandImage);
		        });
	        });
	        
	        $('#expandAll').click(function(event){
	    		event.preventDefault();
	    		$collapsableContent.show();
	    		elem.find('.'+settings['collapseClass']).show();
	    		elem.find('.'+settings['expandClass']).hide();
			});
			
			$('#collapseAll').click(function(event){
				event.preventDefault();
				$collapsableContent.hide();
				elem.find('.'+settings['expandClass']).show();
				elem.find('.'+settings['collapseClass']).hide();
			});
			
			$('#expandAll').click();
	    });
	}	
})(jQuery);

TableSlider = {
		init: function(){ 
			$(".slider").click(function(e){
				e.preventDefault(); 
				$(this).parent().parent().find('.slider-rows').toggle();
				$(this).toggleClass("slide-down");
				$(this).toggleClass("slide-up");
				if(($(this).text().indexOf('Full')!= -1) || ($(this).text().indexOf('Expand')!= -1))
					$(this).text('Simple Comparison');
				else{
					$(this).text('Expand comparison');
					var thisTableId = $(this).attr('id').replace("_link","");
					thisTableId = "CTABLE-" + thisTableId
					var p = $("#"+thisTableId).position();
					$(window).scrollTop(p.top);
				}
					

			});
		}
};

jQuery(function(){TableSlider.init()});