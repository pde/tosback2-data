(function () {
	var requiredFlashVersion = /Safari|safari/.test(navigator.userAgent) ?
		"10.0.32.18" :
		"9.0.115";

	if (!swfobject.hasFlashPlayerVersion(requiredFlashVersion) && !(typeof upgradeFlashPage != "undefined")) {
		for (var prop in CONFIG.languages) if (CONFIG.languages.hasOwnProperty(prop)) {
			var languagePath = '';
	
			if ((new RegExp('^' + CONFIG.languages[prop])).test(window.pathname)) {
				languagePath = CONFIG.languages[prop];	
			}
		}

		window.location = languagePath + '/upgrade-flash.aspx';	
	}
})();
