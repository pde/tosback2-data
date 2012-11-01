(function(){
	
	var theReferer = document.referrer;
	var yahooPattern = new RegExp(/^((?!search).)+yahoo.com/);
	var logoCookie = 'yahooLogoCookie';
	var $logo = $('#yahoo-header-logo');
	
	jQuery(function($) {
		if(yahooPattern.test(theReferer) || $.cookie(logoCookie)) {
			$logo.show();
			
			if(!$.cookie(logoCookie)) {
				$.cookie(logoCookie, '1', { path: '/'});
			}
		}
	});
	
	
})();
