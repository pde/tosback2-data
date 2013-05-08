//saves scroll position on back button
(function( scrollUtils, $, undefined ) {	
	//setup handler to retrieve scroll position
	scrollUtils.setupScrollHandler = function(){
		$(window).scroll(function(){
			$.cookie('scrollPosition', window.location.href + "zzz" + $(document).scrollTop(), { path: '/' });
		});
	};
	
	//retrieve previous scroll position
	scrollUtils.getScrollPosition = function(){
		var cookie = $.cookie('scrollPosition');
		if(cookie){
			var cookieValues = cookie.split("zzz");
			if(cookieValues[0] == window.location.href)
				return cookieValues[1];
			//we're accessing the cookie on a different page, so remove the previous cookie as it's no longer relavant
			else
				$.removeCookie('scrollPosition', { path: '/' });			
		}		
		
		return 0;
	};
	
	//put the scroll position back to previous value
	scrollUtils.restoreScrollPosition = function(pos){
		if(pos == undefined){
			pos = scrollUtils.getScrollPosition();
		}
	
		$(document).scrollTop(pos);
	};
	
	//store page number, used primarily for category pages
	scrollUtils.setPageNum = function(num){
		$.cookie('scrollPage', window.location.href + "zzz" + num, { path: '/' });
	};
	
	//retrieve page number, used primarily for category pages
	scrollUtils.getPageNum = function(){
		var cookie = $.cookie('scrollPage');
		if(cookie){
			var cookieValues = cookie.split("zzz");
			if(cookieValues[0] == window.location.href)
				return cookieValues[1];
			//we're accessing the cookie on a different page, so remove the previous cookie as it's no longer relavant
			else
				$.removeCookie('scrollPage', { path: '/' });
		}
		
		return 1;
	};
}( window.scrollUtils = window.scrollUtils || {}, jQuery ));