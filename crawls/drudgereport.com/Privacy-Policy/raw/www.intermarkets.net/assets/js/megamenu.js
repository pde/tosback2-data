// jQuery Mega Menu Effects

$(document).ready(function(){
	
	$(".fullwidth").css('left', '-1px').hide();
	
	var menuOn = false; 
			
		$('li.menuItem a.open').hover(function() {
				menuOn = true;
				$(this).removeClass('open').addClass('close');
				runMenuTest();
			}, function() {
				$('li.menuItem').mouseleave( function() {
					menuOn = false;
					$('li.menuItem a.close').removeClass('close').addClass('open');
					runMenuTest();
				})
				
			});
		
		function runMenuTest() {
			
			if(menuOn == true){
				//alert('open menu')
				$('.dropcontent').stop(true, true).fadeTo(250, 1);
				//$('a.open').removeClass('open').addClass('close');
			}
			
			if(menuOn == false){
				$('.dropcontent').stop(true, true).fadeTo(10, 0);
				//$('a.close').removeClass('close').addClass('open');
			}
		
		}
		
			$('li.menuItem a.open').click( function() {
				var selected = $(this)
								
				if(menuOn == true){
					menuOn = false;
					if( $(selected).hasClass('open') ){
						$(selected).removeClass('open').addClass('close');
					}
					
					else if( $(selected).hasClass('close') ){
						$(selected).removeClass('close').addClass('open');
					}
					
					//alert('you clicked on the menu item.')
					runMenuTest();
					$('#menu li .dropcontent').hide();
				}
				
				else if(menuOn == false){
					menuOn = true;
					
					if( $(selected).hasClass('open') ){
						$(selected).removeClass('open').addClass('close');
					}
					
					else if( $(selected).hasClass('close') ){
						$(selected).removeClass('close').addClass('open');
					}
					
					//alert('you clicked on the menu item.')
					runMenuTest();
					$('#menu li .dropcontent').show();
				}
				
			})
		
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
