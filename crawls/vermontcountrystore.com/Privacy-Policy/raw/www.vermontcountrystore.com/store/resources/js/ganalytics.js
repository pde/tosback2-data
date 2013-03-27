(function(window, $, undefined) {
	if(window._gaq === undefined) {
		window._gaq = [];
	}

	var hall_log = function(item) {
		if(console && console.log) {
			console.log(item);
		}
	};

	//Setup CookieValueArray to store cookie values for the page until the next header request when they will be saved.
	var CookieValueArray = [];

	// Start of functions for Analytics
	var site_analytics = {
		trackEvent: function(Category, Action, Label) {
			_gaq.push(['_trackEvent', Category, Action, Label,0,true]);
			//hall_log('Track Event | ' + Category + ' | ' + Action + ' | ' + Label);
		}
	};

	// Get the Current Page Domain
	var SiteURL = window.location.hostname;

	// Get the Current Page URL
	var PagePath = location.href;
	var PageName = PagePath.substring(PagePath.lastIndexOf('.com/') + 4);
	var FullPageName = PageName;
	// Check if there is a query string and remove it
	if(PageName.indexOf("?") !== -1) {
		var parts = PageName.split("?");
		PageName = parts[0];
	}

	if(SiteURL.indexOf("vermontcountrystore.com")!=-1) {
		// Setup Dynamic function calls for actions taken on the Page
		$(window).load(function() {

		});
		if(/store\/jump\/productDetail\/.*/.test(PageName)) {
			// Setup Dynamic function calls for actions taken on the Page
			$(window).load(function() {
				$('.email-link').click(function() {
					site_analytics.trackEvent('Email Product to a Friend', 'Email Product to a Friend', 'Email Product to a Friend');
				});

				$('div.action a.submit').click(function() {
					site_analytics.trackEvent('Add to Cart Button Click', 'Add to Cart Button Click', 'Add to Cart Button Click');
				});
			});
		}
	}

})(window, jQuery);