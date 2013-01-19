/*	
 * Function for calling the carousel with conditions.
*/   
   function loadCarousel() {
		var len;
		$(".overview").each(function() {
			len = $(this).children("li").length;
		});

		if (len > 3) {
			$('#slider-code').carousel({
				display : 1,
				start : 1,
				controls : true
			});
		} else {
			$('#slider-code').carousel({
				display : 1,
				start : 1,
				controls : false
			});
		}
   }
 
/*	
* Function for making the carousel height the same.
*/ 
   function makeDivHeightSame(elements) {
		maxheight = 0;
		$.each($('.viewport li div'),function() {
		thisHeight = $(this).height();
			if(thisHeight > maxheight) {
				maxheight = thisHeight;
			}
		});
		if(maxheight > 0)
			$('.viewport li').css('height',maxheight);
					
		$('.viewport').height(maxheight+ 25);    
		$('#slider-code').height(maxheight+ 25);
	}
   
$(document).ready(function() {
	
	$('.continueShoppingButton').myplugin({ 
		'backDropId'    : 'continueShoppingOverlayDropBox',
		'lightBoxId'    : 'continueShoppingOverlayLightBox'
	});
	
	$('#MobileSharedPlansSDF .openCloseMSPArrow').click(function(){
		var currentArrow = $(this);
		var closestMspTBodyWrapper = $(this).closest('.MspTBodyWrapper');
		
		if(currentArrow.hasClass('openMSP')){
			closestMspTBodyWrapper.find('tr.SDF').show();
			closestMspTBodyWrapper.find('img.closeMSP').show();
		}else{
			closestMspTBodyWrapper.find('tr.SDF').hide();
			closestMspTBodyWrapper.find('img.openMSP').show();
		}
		
		if(closestMspTBodyWrapper.find('.selectedPlan').length > 0){
			$('.selectedPlan').show();
		}
		
		currentArrow.hide();
	});
	
	
	// Highlight the row for ratePlan section
	$(".outerAccordian tr").not('.header').hover(
		  function () {
		    $(this).css("background","#F8F8F8");
		  }, 
		  function () {
		    $(this).css("background","");
		  }
	);
	
	
});