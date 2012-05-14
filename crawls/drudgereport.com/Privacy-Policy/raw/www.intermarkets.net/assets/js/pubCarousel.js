// JavaScript Document

$(document).ready(function(){
  var currentPosition = 0;
  var width = 354;
  var height = 125;
  var selected = $('.selected');
  var numOfSlides = selected.length;
  var slideCount = 0;
  var currSlide = $("#featureSlide div.current");
  var nxtSlide = currSlide.next();  

//add elements to make slides work 

  // Remove scrollbar in JS
  $('#carouselWrap').css('overflow', 'hidden');

  // Wrap all .slides with #wrappedSlides div
  selected.wrapAll('<div id="wrappedSlides"></div>')
  // Float left to display horizontally, readjust .slides width
  .css({
    'float' : 'left',
	'height' : height
  });

  // Set #wrappedSlides width equal to total width of all slides
  $('#wrappedSlides').css('height', height * numOfSlides);  
  
  
  // Insert left and right arrow controls in the DOM
  
  var prev = $('<a class="pubControlPrev"><span>&nbsp;</span></a>');
  var next = $('<a class="pubControlNext"><span>&nbsp;</span></a>');
  
  $('#pubCarousel')
    .prepend(prev)
    .append(next)
	

//end adding HTML elements

		// start event listener for right control click ------------------------------------------------------------------->
		  $('.pubControlNext').click( function(){
			  slideNext();
			 // $("#box" + currentPosition).css({'background-color': '#0078c1'});
		  });
		//end right control click  ------------------------------------------------------------------->
		
		//determin if slide should move to the next slide or loop back to the first slide
		function slideNext() {
			  if(currentPosition == numOfSlides -1){			  
				currentPosition++;
				}
				
			  if(currentPosition < numOfSlides -1){
			  
			  currentPosition++;
						  
			  $('#wrappedSlides').stop(true, true).animate( {'margin-top' : height*(-currentPosition), opacity:0.20 }, 0, "swing", function() { });
			  
			  $('#wrappedSlides').animate( {opacity: 1.0 }, 500, "swing", function() { });
			  
			  }
		  
			  if(currentPosition > numOfSlides-1){
			  //alert('slides exceed maximum, must reset');
				currentPosition=0;
				
				$('#wrappedSlides').stop(true, true).animate( {'margin-top' : height*(-currentPosition), opacity:0.20 }, 0, "swing", function() { });
				
				$('#wrappedSlides').animate( {opacity: 1.0 }, 500, "swing", function() { });
							
			  }
			  
		}
			
  
		//start event listener for left control click ------------------------------------------------------------------->
		  $('.pubControlPrev').click( function(prevSlide){
			  slidePrev();
		  });
//end left control click ------------------------------------------------------------------->
		
		//determin if slide should move to the previous slide or loop back to the last slide
		function slidePrev() {
		
			  if(currentPosition == 0){
			  currentPosition--;
			  }
			  
			  if(currentPosition > 0){
			  
			  currentPosition--;	
			  
			  
			  $('#wrappedSlides').stop(true, true).animate( {'margin-top' : height*(-currentPosition), opacity:0.20 }, 0, "swing", function() { });
			  
			  $('#wrappedSlides').animate( {opacity: 1.0 }, 500, "swing", function() { });
			  
			  }
			  
			  if(currentPosition < 0){
			  
			  currentPosition=numOfSlides-1;
			  
			  //decreaseSlides();
			  
			  $('#wrappedSlides').stop(true, true).animate( {'margin-top' : height*(-currentPosition), opacity:0.20 }, 0, "swing", function() { });
			  
			  $('#wrappedSlides').animate( {opacity: 1.0 }, 500, "swing", function() { });
										  
			  }
		
		}

});//end document------>