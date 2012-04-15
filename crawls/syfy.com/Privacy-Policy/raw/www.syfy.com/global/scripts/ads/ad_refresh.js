function refreshAds() {
	//global_header_ad
	//300x250ad
	// insert iframes into both, load in new ad code.
	if (jqN && php_site && php_section) {
		if (document.getElementById('global_header_ad') && document.getElementById('300x250ad')) {
			var container_728x90 = document.getElementById('global_header_ad');
			var container_300x250 = document.getElementById('300x250ad');

			jqN(container_728x90).children().remove();
			jqN(container_728x90).append('<iframe width="728" height="90" scrolling="no" frameborder="0" src="/global/ads/ajax/ad_controller.php?size=728x90&site=' + php_site + '&section=' + php_section + '"></iframe>');

			jqN(container_300x250).children().remove();
			jqN(container_300x250).append('<iframe width="300" height="250" scrolling="no" frameborder="0" src="/global/ads/ajax/ad_controller.php?size=300x250&site=' + php_site + '&section=' + php_section + '"></iframe>');

		}		
	}
}
