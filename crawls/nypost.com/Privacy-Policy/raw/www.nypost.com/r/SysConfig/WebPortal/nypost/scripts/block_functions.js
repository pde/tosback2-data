//@Author: tmoussignac@nypost.com
function href(url){window.location.href=url}function story_tab_href(tab,urls){var from=document.referrer;var key='';var found=false;var name='';for(key in urls.links){if(urls.links[key].url==from){found=true;break}}switch(tab){case "Photos":name="&lid=story_tab&lpos=photos";break;case "Comment":name="&lid=story_tab&lpos=comments";break;case "Video":name="&lid=story_tab&lpos=video";break;case "Story":name="&lid=story_tab&lpos=video";break;default: break;}return'<a href="'+(found?from:urls.links[0].url)+'" name="'+name+'">'+tab+'</a>'}function mycarousel_initCallback(carousel){carousel.buttonNext.bind('click',function(){carousel.startAuto(0)});carousel.buttonPrev.bind('click',function(){carousel.startAuto(0)});carousel.clip.hover(function(){carousel.stopAuto()},function(){carousel.startAuto()})};$(document).ready(function(){function initCarousel(object,numScroll,isWrap){$(object).jcarousel({wrap:isWrap,initCallback:mycarousel_initCallback,scroll:numScroll})}function initTabs(object,rotation){$(object).tabs({cache:true}).tabs('rotate',rotation)}$('.pointer').hover(function(){$(this).css({'cursor':'pointer'})},function(){$(this).css({'cursor':'hand'})})});
function initCarousel(object, numScroll, isWrap){$(object).jcarousel({ wrap: isWrap , initCallback: mycarousel_initCallback, scroll: numScroll });}
function setCookie(c_name, value, expires, path, domain, secure) {
	if(path === undefined) { path="/"; }
	var newcookie = c_name+ "=" + escape(value);
	if(expires) {
		var today = new Date();
		today.setTime( today.getTime() );
		var exdate = new Date();
		exdate.setDate(today.getTime() + expires);
		newcookie = newcookie + ((expires === null) ? "" : ";expires=" + exdate.toGMTString() );
	}
	newcookie = newcookie + ";path=" + path;
	if(domain) { newcookie = newcookie + ";domain=" + domain; }
	if(secure) { newcookie = newcookie + ";secure"; }
	document.cookie = newcookie;
}
function getCookie(c_name) {var c_end, c_start;if (document.cookie.length > 0) {c_start = document.cookie.indexOf(c_name + "=");if (c_start!=-1) {c_start = c_start + c_name.length + 1;c_end = document.cookie.indexOf(";", c_start);if (c_end == -1) {c_end = document.cookie.length;}return unescape(document.cookie.substring(c_start, c_end));}}return "";}

//general post pics functions
$(document).ready(function(){
	$('#post_pics_block ul.post_pics li').mouseenter(function(){
		$(this).find('.caption').slideDown();
		$(this).addClass('li_hovie');
	}).mouseleave(function(){
		$(this).find('.caption').slideUp();
		$(this).removeClass('li_hovie');
	});
	
	$("a[href*='#comments']").attr("name", "&lid=story_tab&lpos=comments");
	
	/*$('#popwrap #popwrap_content #poptops li').fadeIn();
	initCarousel('#poptops', 5, 'last');*/
	
	/**** corner styles ****/
	if($.browser.mozilla){
		$('.story_list_tabs_nav li, #most_popular_nav li').corner('top 7px');
		$('.ent_top_story, #top_gallery').corner('7px');
	}
	
	if($.browser.safari){
		if($.browser.version >= parseInt('531.21.8') ){
			$('.story_list_tabs_nav li, #most_popular_nav li').corner('top 7px');
			$('.ent_top_story, #top_gallery').corner('7px');
		}
	}
});
