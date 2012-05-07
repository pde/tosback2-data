// JavaScript Document

$(document).ready(function(){
	
	//fade accordion buttons
	
	$('.activeTab, .inactiveTab').hover(function() {
			$(this).stop(true, true).fadeTo(250, .80);
			}, function() {
			  $(this).stop(true, true).fadeTo(250, 1);
			});
		
	$('div#items').click(function() {
		
		//alert('you clicked on a tab!')
		if ($(this).hasClass('activeTab')) {
		            
        //remove the selected class from all items    
        $('div#items').removeClass('activeTab').addClass('inactiveTab');
		
		$(this).next().removeClass('expanded').addClass('collapsed').hide();
		
		}
		
		else if (!$(this).hasClass('activeTab')) {
		            
        //remove the selected class from all items
		$('div#items').removeClass('activeTab').addClass('inactiveTab');
		
		$('.expanded').removeClass('expanded').addClass('collapsed').hide();
		
        $(this).addClass('activeTab').removeClass('inactiveTab');
		
		$(this).next().removeClass('collapsed').addClass('expanded').show(0, function() {
			
			//$('.expanded').fadeTo(0, .1)
			//$('.expanded').fadeTo(1000, 1)
			
			$('.expanded').slideUp(0)
			$('.expanded').slideDown(200)
		
		})
		
		}
         
	})
	
});