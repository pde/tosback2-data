/* :::::::::::::::::::::::::::::::::::::::::::::::::::
	
	GLOBAL SCRIPTS
	
:::::::::::::::::::::::::::::::::::::::::::::::::::*/


// DROPDOWN MENU
function dropDownMenu() {
	
	var dropdownLinks = $(".dropdown-link");
	var dropdownWrapper = $(this).next(".dropdown-wrapper");
	var dropdownSpacer = $("#dropdown-spacer");
	
	//if all dropdown menus are closed
	if ( !($(dropdownLinks).hasClass("selected")) ) {
		$(this).addClass("selected");
		$(dropdownSpacer).animate({
			height: "115"
		}, "fast");
		$(dropdownWrapper).slideDown("fast");
	} 
	//if $(this) dropdown menu is open
	else if ( $(this).hasClass("selected") ) { 
		$(this).removeClass("selected");
		$(dropdownSpacer).animate({
			height: "0"
		}, "fast");
		$(dropdownWrapper).slideUp("fast");
	} 
	//if another dropdown menu is open
	else if ( $(dropdownLinks).not(this).hasClass("selected") ) { 
		$(dropdownLinks).removeClass("selected");
		$(this).addClass("selected");
		$(".dropdown-wrapper").hide();
		$(dropdownWrapper).show();
	}
	
	//don't follow the link
	return false;
}




/* :::::::::::::::::::::::::::::::::::::::::::::::::::
	
	DOM IS LOADED
	
:::::::::::::::::::::::::::::::::::::::::::::::::::*/
$(document).ready(function() {
	
	
	// MAIN NAV
	$(".dropdown-link").bind("click",dropDownMenu); //bind dropdown menu function
	
	$(".close").click(function(){ //close menu
		$('.selected').focus();
		$(".dropdown-link").removeClass('selected');		
		$(this).parents(".dropdown-wrapper").slideUp("fast");
		$("#dropdown-spacer").animate({
    		height: ""
 		}, "fast");
 		
 		return false;
	});

	
	// HOME IMAGE SLIDESHOW
	$('#main-slideshow').flexslider({animationDuration: 400, directionNav: false, controlsContainer: "#main-slideshow"});
		
	
	// FEATURED STORIES CAROUSEL
	$('#featured-stories').tinycarousel({duration: 400});
	
	if ($('#logo a').css('display') == 'block') {
		$('#featured-stories').clone().removeAttr('featured-stories').attr('id','featured-stories-mobile').insertAfter('#featured-stories');
		$('#featured-stories-mobile .overview').width('105%');
	}
	

	// RESPONSIVE VIDEOS
	$('#main-content').fitVids();
	
	
	//::::: FANCYBOX GALLERIES
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
	
	
	// DEPARTMENTS & PROGRAMS NAVIGATION
	$('.dept-list-group').each(function(key, value) {
		var letter = $(this).text().toLowerCase();
		$("#dept-list-" + letter).removeClass("dept-list-inactive").addClass("dept-list-active");
	});
	

	// TABLE STRIPING
	$(".stripe").find("tbody tr:odd").addClass("alt");
	
	
	// iOS4 DETECTION TO REMOVE FIXED FOOTER
	if ( /iPad/i.test(navigator.userAgent) ) {
		if ( /OS [2-4]_\d(_\d)? like Mac OS X/i.test(navigator.userAgent) ) {
			$('#page-wrap').css('margin-bottom','-30px');
			$('#footer').css('position','relative');
		}
	}
	
	
});


