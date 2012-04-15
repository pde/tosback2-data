$(document).ready(function() {
	
	//home slideshows
	$('#main-slideshow').flexslider({animationDuration: 400, directionNav: false, controlsContainer: "#main-slideshow"});
	//$('#featured-stories').flexslider({animationDuration: 600, controlNav: false, animation: "slide", slideshow: false, animationLoop: false, controlsContainer: "#featured-stories"});
	$('#featured-stories').tinycarousel({duration: 400});

	//scale videos
	$('#main-content').fitVids();
	
	//fancybox overlay
	$('.gallery li a').fancybox({
		scrolling : 'no',
		helpers: {
			overlay : {
				css : {
					'background-color' : '#002256'	
				},
				opacity : 0.50
			}
		}
	});

	//main-nav
	var activeTab;
	$("#main-nav").idTabs();
	$('#main-nav li a').removeClass('active');
	
	$("#main-nav li a").not(".link").click(function(e){
		e.preventDefault();
		var clicked = $(this);
		if (activeTab && activeTab[0] == clicked[0]) {
			activeTab = undefined;
			$('#expand-menu').slideUp(300, function() {clicked.removeClass("active");});	
		} else {
			activeTab = clicked;			
			$('#expand-menu').slideDown(300);	
		}	
	});

	//close main-nav
	$('#close-menu').click(function(e){
		e.preventDefault();
		$('#expand-menu').slideUp(300);
		$('#main-nav li a').removeClass('active');
	});

	//mobile nav drop-down
	var $window = $(window);
	var $open = 0;
	
	$('#nav-control').click(function(){
		if ($open == 0){
			$('#main-nav').slideDown(300);
			$open = 1;
		}
		else {
			$('#main-nav').slideUp(300);
			$open = 0;
		}	
	});
	
	// Temporarily removed until implementation of responsive design
	/*
	$(window).resize(function() {
		if (($window.width() <= 767) && $open == 1) {
			$('#main-nav').css('display', 'block');
			//$('#main-nav li a').removeClass('active');
			//$('#expand-menu').css('display', 'none');
		}
		else if (($window.width() >= 767) && $open == 0) {
			$('#main-nav').css('display', 'block');
		}
		else if (($window.width() <= 767) && $open == 0) {
			$('#main-nav').css('display', 'none');
		}
	});
	*/

	//DEPARTMENT LISTINGS A-Z NAV
	$('.dept-list-group').each(function(key, value) {
		var letter = $(this).text().toLowerCase();
		$("#dept-list-" + letter).removeClass("dept-list-inactive").addClass("dept-list-active");
	});
	
	//audience nav drop-down
	$('#audience-nav #students-btn').click(function(e){
		e.preventDefault();
		//$(this).toggleClass('active');
		$('#audience-nav li ul').slideToggle(300);
	});
	
	//stylesheet switcher
	$("#mobile-full-site").click(function() { 
		$("#main-stylesheet").attr("href",$(this).attr('rel'));
		$.cookie("css",$(this).attr('rel'), {expires: 365, path: '/'});
	});

	//table row stripes
	$(".stripe tbody tr:odd").addClass("alt");
	
	//searchbox
	var searchbox = $("#searchbox-input")
	$(searchbox).focus(function() {
		$(this).addClass("focus");
	});
	$(searchbox).blur(function() {
		if ( !searchbox.val() ) {
			$(this).removeClass("focus");
		}
	});
	if ( searchbox.val() ) {
		searchbox.addClass("focus");
	}


});