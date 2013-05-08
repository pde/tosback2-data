var hideNavTimer;
var showNavTimer;

$(window).load(function() {
	$('#wrapper #main_nav .root').each(function(){
		$(this).mouseenter(function(){displayNav(this);});
		$(this).mouseleave(clearShowNavTimer);
		$(this).next('div.main_nav_flyout').mouseleave(startHideNavTimer);
		$(this).next('div.main_nav_flyout').mouseenter(clearHideNavTimer);
	});
});

function displayNav(domElm){
	var nav = $(domElm).next('div.main_nav_flyout');
	var navbar_width = $('#main_nav').width();
	var fly_pos = $(domElm).position().left
	var fly_width = nav.innerWidth();
	var max_left = navbar_width - fly_width;
	fly_pos = fly_pos > max_left ? max_left : fly_pos;
	showNavTimer = setTimeout(function(){
		hideNavs();
		$(domElm).addClass('over');
		$('.main_nav_flyout').hide().removeAttr('style');
		nav.css('left', fly_pos).fadeIn(startHideNavTimer,200);
	}, 200);
}

function hideNavs(){
	clearHideNavTimer();
	$('.main_nav_flyout').hide().removeAttr('style');
	$('#wrapper #main_nav .root').removeClass('over');
}

function hideNav(domElm){
	var nav = domElm;
	$(nav).hide().removeAttr('style');
	$(domElm).removeClass('over');
}

function startHideNavTimer(){
	clearHideNavTimer();
	hideNavTimer = setTimeout(hideNavs, 300);
}


function clearHideNavTimer(){
	clearTimeout(hideNavTimer);
}

function clearShowNavTimer(){
	clearTimeout(showNavTimer);
	startHideNavTimer();
}

