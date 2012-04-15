// Travel Baggage Info Scripts

var uiTabs = {
	init: function() {
		$(".ui-tabs").tabs();
	}
}; uiTabs.init();

var travelInfoDrop = {
	
		init: function(){

			$('#category-drop li.cat-active').click(function(){
					$('#cat-item-contain').toggle();
			});

			$('li.cat-item').click(function(){
				var newText = $(this).text();

				$('#cat-item-contain').toggle();
				$('li.cat-active').text(newText);

			});

		}
		
}; travelInfoDrop.init();

// End Travel Baggage Info Scripts

// Partner Airlines Scripts

var showHide = {
	
	init: function(){
		
		$('#container').find('a.show-hide').bind('click', function(){
		
			$(this).parent().siblings('div.show-hide-content').toggle();
			
			if($(this).hasClass('open')){
				$(this).removeClass('open');
			} else {
				$(this).addClass('open');
			}
			
		});
	}
	
}; showHide.init();

// End Partner Airlines Scripts

// Cancellations and Delays Scripts

var flightStatusRadio = {
	
	init: function(){
		
		var radioBtns = $('.flight-when').find('input[type=radio]');
		var ageRadioBtns = $('.age-checker').find('input[type=radio]');
		
		radioBtns.beautifier();
		ageRadioBtns.beautifier();
		
	}
	
}; flightStatusRadio.init();

// End Cancellations and Delays Scripts