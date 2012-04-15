// jQuery Mega Menu Effects

$(document).ready(function(){
	
	$(".fullwidth").css('left', '-1px').hide();
	
	var menuOn = false; 
		
		$('li.menuItem').hover(function() {
				menuOn = true;
				runMenuTest();
			}, function() {
				menuOn = false;
				runMenuTest();
			});
		
		function runMenuTest() {
			
			if(menuOn == true){
				//alert('open menu')
				$('.dropcontent').stop(true, true).fadeTo(250, 1);
			}
			
			if(menuOn == false){
				$('.dropcontent').stop(true, true).fadeTo(10, 0);
			}
		
		}
		
		function opacityElements() { // Chaging opacity of the social icons on mouse hover and mouse out
			buttonMode = false;
			
			if (buttonMode == true) {
				//adds pointer cursor to items using fade or fadeOut
				$('.fadeUp, .fade').css({'cursor': 'pointer'})
			}
			
			$('.fade').hover(function() {
			$(this).stop(true, true).fadeTo(250, .80);
			}, function() {
			  $(this).stop(true, true).fadeTo(250, 1);
			});
			
			
			$('.fadeUp').fadeTo(250, .80);//sets initial fade (only required for fadeOut)
			
			$('.fadeUp').hover(function() {
			  $(this).stop(true, true).fadeTo(250, 1);
			}, function() {
			  $(this).stop(true, true).fadeTo(250, .80);
			});
			
		}
		
	opacityElements();	
	runMenuTest();
		
	
})
