// JavaScript Document

$(document).ready(function(){
  var currentPosition = 0;
  var slideWidth = 898;
  var slideHeight = 350;
  var highlight = $('.highlight');
  var numberOfSlides = highlight.length;
  var slideCount = 0;
  var currSlide = $("#featureSlide div.current");
  var nxtSlide = currSlide.next(); 
  
  //Set color of slide markers
  var colorActive = '#0078c1'; //current slide marker color
  var colorInactive = '#999'; //previous slide marker color
  
  var slideDelay = '10'; //set the slide transition timer in seconds
  var fadeDelay = '.5'; //set the fade transition speed in seconds

  var numbering = true;
  var numberValue = '';
  
  var timer = '';
  var slideTimer;
  

//add elements to make slides work 

  // Remove scrollbar in JS
  $('#slidesContainer').css('overflow', 'hidden');

  // Wrap all .slides with #slideWrap div
  highlight.wrapAll('<div id="slideWrap"></div>')
  // Float left to display horizontally, readjust .slides width
  .css({
    'float' : 'left',
	'height' : slideHeight
  });

  // Set #slideWrap width equal to total width of all slides
  $('#slideWrap').css('height', slideHeight * numberOfSlides);  
  
  
  // Insert left and right arrow controls in the DOM
  
  var prev = $('<a class="controlPrev"><span> </span></a>');
  var next = $('<a class="controlNext"><span> </span></a>');
  
  $('#carousel')
    .prepend(prev)
    .append(next)

//adds box markers for each slide on the page and also marks the first slide
$(".highlight").each(

	function(intIndex){
		
		if(numbering == true){
			//alert('number is equal to one')	  
			numberValue = intIndex + 1;
		}
		
		else{
			//alert('number is not equal to one')		  
			numberValue = '';
		}

		$('#boxHolder').append ('<div id="box' + intIndex + '"><a href="#"><span>' + numberValue + '</span></a></div>');
						
		$('#box' + intIndex).bind ("click",function(){
			jumpToSlide();
			//alert( "you clicked box number " + intIndex );
			//if(){}
		}
		
);

//sets first initial marker to blue
$('#box0').css({'background-color': colorActive});

function jumpToSlide() {
	clearInterval(slideTimer);
	
	//Fade in new slide
	
	$('#slideWrap').stop(true, true).fadeTo(150, .2).animate( {'margin-top' : slideHeight*(-intIndex) }, 0, "swing", function() {
		$('#slideWrap').fadeTo(150, 1)
	})
	
	//reset all box markers to gray
	$(".highlight").each(
		function(intIndex){
		$('#box' + intIndex).css({'background-color': colorInactive});
		
		}
	)
	
	//set current slide marker to blue
	$('#box' + intIndex).css({'background-color': colorActive});
	
	//set var currentPosition equal to the newly jumped to position
	currentPosition = intIndex;
	
	}
	
	}

);

//This changes the color of the box markers to indicate the current slide
function slideMarker() {	
	$(".highlight").each(
	
		function(intIndex){
			
			if(intIndex == currentPosition){
			$('#box' + intIndex).css({'background-color': colorActive});
			}
			
			else if(intIndex != currentPosition){
				$('#box' + intIndex).css({'background-color': colorInactive});
			}
		}
	
	);
}

//end adding HTML elements

		// start event listener for right control click ------------------------------------------------------------------->
		  $('.controlNext').click( function(){
			  clearInterval(slideTimer);
			  slideNext();
			  slideMarker();
		  });
		//end right control click  ------------------------------------------------------------------->
		
		//determin if slide should move to the next slide or loop back to the first slide
		function slideNext() {
			  if(currentPosition == numberOfSlides -1){			  
				currentPosition++;
				}
				
			  if(currentPosition < numberOfSlides -1){
			  
			  currentPosition++;
						  
			  $('#slideWrap').stop(true, true).fadeTo(150, .2).animate( {'margin-top' : slideHeight*(-currentPosition) }, 0, "swing", function() {
				  $('#slideWrap').fadeTo(150, 1)
			  })
			  
			  }
		  
			  if(currentPosition > numberOfSlides-1){
			  //alert('slides exceed maximum, must reset');
				currentPosition=0;
				
			   $('#slideWrap').stop(true, true).fadeTo(150, .2).animate( {'margin-top' : slideHeight*(-currentPosition) }, 0, "swing", function() {
				  $('#slideWrap').fadeTo(150, 1)
			  })
							
			  }
			  
		}
			
  
		//start event listener for left control click ------------------------------------------------------------------->
		  $('.controlPrev').click( function(prevSlide){
			  clearInterval(slideTimer);
			  slidePrev();
			  slideMarker();
		  });
//end left control click ------------------------------------------------------------------->
		
		//determin if slide should move to the previous slide or loop back to the last slide
		function slidePrev() {
		
			  if(currentPosition == 0){
			  currentPosition--;
			  }
			  
			  if(currentPosition > 0){
			  
			  currentPosition--;	
			  
			  
			  $('#slideWrap').stop(true, true).fadeTo(150, .2).animate( {'margin-top' : slideHeight*(-currentPosition) }, 0, "swing", function() {
				  $('#slideWrap').fadeTo(150, 1)
			  })
			  
			  }
			  
			  if(currentPosition < 0){
			  
			  currentPosition=numberOfSlides-1;
			  
			  //decreaseSlides();
			  
			  $('#slideWrap').stop(true, true).fadeTo(150, .2).animate( {'margin-top' : slideHeight*(-currentPosition) }, 0, "swing", function() {
				  $('#slideWrap').fadeTo(150, 1)
			  })
										  
			  }
		
		}

//start timer event for scrolling through slides ----------------------->

function startInterval() {
	
timer = true;

slideTimer = setInterval (function () {
    //alert("the interval is running");
	slideNext();
	slideMarker();
	
}, slideDelay * 1000);

}//end startInterval function

  $(window).blur(function(){
	//alert('you stopped the timer');
	timer = false;
	clearInterval(slideTimer);
  });
  
  $(window).focus(function(){
	//alert('you started the timer');
	if(timer == false) {
	timer = true;
	startInterval();
	}
	
	else{
		//alert('timer already exists')
	}
  });
  
  startInterval()

});//end document------>