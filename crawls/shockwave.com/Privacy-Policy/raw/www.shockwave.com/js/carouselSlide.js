$(document).ready(function() {
// ----------------------------------------------------
// opens document ready function, edit below this line

	$(".carouselSlide .carousel-nav-right a").live("click", function(){
		var trigger = $(this);
		slideDisplay(trigger,+1); // passes the dom element clicked and direction
		return false;
	});
	$(".carouselSlide .carousel-nav-left a").live("click", function(){
		var trigger = $(this);
		slideDisplay(trigger,-1); // passes the dom element clicked and direction
		return false;
	});
	$(".carouselSlide .carousel-progress a").live("click", function(){
		var trigger = $(this);
		clickIndex = $(this).html();
		slideDisplay(trigger,0,clickIndex); // passes the dom element clicked and direction
		return false;
	});

// closes document ready function, edit above this line
// -----------------------------------------------------
});

slideDisplay = function(trigger,direction,clickIndex) {

	var navBtnLeft = $(trigger).parents(".carousel-nav").find(".carousel-nav-left a"); // get the left nav button
	var navBtnRight = $(trigger).parents(".carousel-nav").find(".carousel-nav-right a"); // get the right nav button
	var navProgress = $(trigger).parents(".carousel-nav").find(".carousel-progress a"); // path to all of the progress circle buttons

	var targetCarousel = $(trigger).parents(".carousel"); // the parent carousel
	var targetCarouselWidth = $(trigger).parents(".carousel").width(); // width of carousel, delcared in CSS, must match element's total width+margins * elements showing
	var elLength = $(targetCarousel).find(".carousel-element").length; // find number of carousel elements
	var elOuterWidth = $(targetCarousel).find(".carousel-element").outerWidth({margin: true}); // width of each element, including margin
	var targetEls = $(targetCarousel).find(".carousel-element"); // array of all the carousel elements
	var containerWidth = elLength*elOuterWidth; // width of container that houses all the elements, extends beyond carousel width
	var visibleEls = targetCarouselWidth / elOuterWidth; // the number of elements showing when the page loads
	$(targetCarousel).find(".carousel-container").width(containerWidth); // sets width of container that houses all the elements, extends beyond carousel width

	getContainerOffsetLeft = function(targetCarousel){
		var carouselOffset = targetCarousel.offset();
		var carouselOffsetLeft = carouselOffset.left + 1; // to adjust for the border TO DO: calculate the border width
		var containerOffset = $(targetCarousel).find(".carousel-container").offset();
		var containerOffsetLeft = carouselOffsetLeft - containerOffset.left;
		return containerOffsetLeft;
	};

	var carouselMove;

	if ( direction == 0 ) {
		if ( targetCarouselWidth * clickIndex < containerWidth ) {
			carouselMove = -(targetCarouselWidth * clickIndex - targetCarouselWidth);
		} else {
			carouselMove = -(containerWidth - targetCarouselWidth);
		}
	} else {
		var containerOffsetLeft = getContainerOffsetLeft(targetCarousel);
		// if it's going to extend too far
		if ( containerOffsetLeft + 2 * targetCarouselWidth > containerWidth && direction == 1 ) {
			carouselMove = -( containerWidth - targetCarouselWidth);
		} else if ( containerOffsetLeft < targetCarouselWidth && direction == -1 ) {
			carouselMove = 0;
		} else {
			carouselMove = -( containerOffsetLeft + direction * targetCarouselWidth);

			// Test and correct for ie8 faulty calculation of offset().left (IE8 is off by 1px for uneven window sizes.)
			var sizeDifference = containerOffsetLeft % targetCarouselWidth  // should be 0 unless ie8
			if ( sizeDifference && sizeDifference < targetCarouselWidth && containerOffsetLeft != 0  ) {
				carouselMove--;
			}
//			alert(
//					"\noffsetLeft: " + containerOffsetLeft +
//					"\ndirection: " + direction +
//					"\ntargetWidth: " + targetCarouselWidth +
//					"\nmove: " + carouselMove +
//					"\nwindow: " + $(document).width() +
//					"\nposition: " + $(targetCarousel).find(".carousel-container").position().left +
//					"\nmod: " + sizeDifference
//			);
		}
	}

	$(targetCarousel).find(".carousel-container").animate({ marginLeft: carouselMove+"px" },function(){
		var progressPanel = Math.ceil( getContainerOffsetLeft(targetCarousel) / targetCarouselWidth);
		$(navProgress).removeClass("active");
		$(navProgress).eq(progressPanel).addClass("active");
		if (carouselMove == 0) {
			$(navBtnLeft).addClass("disabled");
			$(navBtnRight).removeClass("disabled");
		} else if ( carouselMove - targetCarouselWidth <= -(containerWidth) ){
			$(navBtnLeft).removeClass("disabled");
			$(navBtnRight).addClass("disabled");
		} else {
			$(navBtnLeft).removeClass("disabled");
			$(navBtnRight).removeClass("disabled");
		}
	});

};

