$(document).ready(function() {
// ----------------------------------------------------
// opens document ready function, edit below this line

	initDynamicLead();
	attachCarousel();

// closes document ready function, edit above this line
// -----------------------------------------------------
});

initDynamicLead = function () {
	// sets auto cycle for dynamic lead
	var carouselCycleSpeed = 7000; // set carouselCycleSpeed to milliseconds
	moveCarousel = function() { $("#dynLead .carousel-nav-right a").click(); }; // triggers right click for each cycle
	var intervalID;
	cycleCarousel = function() { intervalID = setInterval(moveCarousel, carouselCycleSpeed); };
	// stops rotation on mousehover, restarts on mouseout
	$("#dynLead .carousel").hover(
		function () { clearInterval(intervalID); },
		function () { cycleCarousel(); }
	 );
	cycleCarousel();
	// now that the carousel is attached, turn on the controls
	$("#dynLead .carousel-nav").css("visibility","visible");
};

fadeDisplay = function(trigger,direction,clickIndex) {

	var targetCarousel = $(trigger).parents(".carousel"); // the parent carousel

	var carouselSwitch = false;
	if ( $(targetCarousel).hasClass("carouselSwitch") ) { carouselSwitch = true; }

	var elLength = $(targetCarousel).find(".carousel-element").length; // find number of carousel elements
	var targetEls = $(targetCarousel).find(".carousel-element"); // array of all the carousel elements

	var elToHide = $(targetCarousel).find(".carousel-element.active"); // find the active carousel element
	var elToHideIndex = $(targetCarousel).find(".carousel-element").index($(elToHide)); // get the index of the active carousel element
	if (elToHideIndex == -1) { elToHideIndex = 0 }

	var navBtnLeft = $(trigger).parents(".carousel-nav").find(".carousel-nav-left a"); // get the left nav button
	var navBtnRight = $(trigger).parents(".carousel-nav").find(".carousel-nav-right a"); // get the right nav button
	var navProgress = $(trigger).parents(".carousel-nav").find(".carousel-progress a"); // path to all of the progress circle buttons

	// function that fades in/out the carousel element and changes the progress button display
	// clickIndex: if progress button clicked, this tells us which one
	// trigger: the source of the mouse click
	// direction: whether we're going forward '+1', backward '-1', or '0' if a progress button has been clicked
	fadeInOutEls = function(clickIndex,elToHideIndex,targetEls,navProgress,trigger,direction) {

		$(targetEls).eq(elToHideIndex).hide().removeClass("active"); // acts on carousel element

		$(navProgress).removeClass("active"); // acts on progress links

		// Calculate the index of the element to show, otherwise use clickIndex
		// uses modulus to calcluate remainder
		var newEl = (clickIndex == undefined) ?  (elToHideIndex+elLength+direction)%(elLength) : clickIndex;

		$(targetEls).eq(newEl).show().addClass("active");

		$(navProgress).eq(newEl).addClass("active");
		// Using newEl calcluate which carousel element that the text of the right/left button should be using via an index of +/- 1

		if ( $(targetEls).eq( (newEl+elLength-1)%(elLength) ).children(".carousel-element-name").length > 0 ) {
			$(navBtnRight).html( $(targetEls).eq( (newEl+elLength+1)%(elLength) ).children(".carousel-element-name").html() );
			$(navBtnLeft).html( $(targetEls).eq( (newEl+elLength-1)%(elLength) ).children(".carousel-element-name").html() );
		}
	};

	// if user clicks on a navigation button
	if  ( direction != 0 ) {
		fadeInOutEls(clickIndex,elToHideIndex,targetEls,navProgress,trigger,direction);
	}	else if ( clickIndex != elToHideIndex ) {
		fadeInOutEls(clickIndex,elToHideIndex,targetEls,navProgress,trigger,0);
	}

};

carouselNavLeftHandler = function() {
	var trigger = $(this);
	fadeDisplay(trigger,-1); // passes the dom element clicked and direction
	return false;
};

carouselNavRightHandler = function() {
	var trigger = $(this);
	fadeDisplay(trigger,1); // passes the dom element clicked and direction
	return false;
};

carouselProgressHandler = function() {
	var trigger = $(this);
	clickIndex = $(this).html();
	if ( clickIndex != 0){ clickIndex = parseFloat(clickIndex); }
	fadeDisplay(trigger,0,clickIndex); // passes the dom element clicked and the index of the progress button clicked
	return false;
};

attachCarousel = function() {
	$(".carouselFade .carousel-nav-left a, .carouselSwitch .carousel-nav-left a").live("click", carouselNavLeftHandler);
	$(".carouselFade .carousel-nav-right a, .carouselSwitch .carousel-nav-right a").live("click", carouselNavRightHandler);
	$(".carouselFade .carousel-progress a, .carouselSwitch .carousel-progress a").live("click", carouselProgressHandler);
};
