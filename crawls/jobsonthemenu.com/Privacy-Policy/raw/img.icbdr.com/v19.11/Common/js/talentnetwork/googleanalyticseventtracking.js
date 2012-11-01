var _gaq = _gaq || [];

$(function () {
	function GetPageType(location) {
		var pagePath = location.pathname.toLowerCase(),
		    pageQuery = location.search.toLowerCase();

		// handle dev
		if (pagePath.indexOf('/cbsys/cbweb/') > -1) {
			pagePath = pagePath.substr(pagePath.indexOf('/cbsys/cbweb/') + 12);
		}

		if (/^(\/jobs\/[^\/]+)?\/search\/(?=\?.+$|$)/i.test(pagePath)) {
			return 'Results';
		} else if (/^(\/jobs\/[^\/]+)?\/search\/(city|state|category)\//i.test(pagePath)) {
			return 'Search';
		} else if (/^(\/jobs\/[^\/]+)?\/?$/i.test(pagePath)) {
			return 'Home';
		} else if (/^(\/jobs\/[^\/]+)?\/all-jobs/i.test(pagePath)) {
			return 'AllJobs';
		} else if (/^(\/jobs\/[^\/]+)?\/all-job-searches/i.test(pagePath)) {
			return 'AllJobSearches';
		} else if (/^(\/jobs\/[^\/]+)?\/search\//i.test(pagePath)) {
			if ($('#branding-wrapper').length > 0) {
				return 'FeaturedLink';
			} else {
				return 'SEOLink';
			}
		} else if (/^(\/jobs\/[^\/]+)?\/job\//i.test(pagePath)) {
			return 'JobDetails';
		} else if (pagePath.indexOf('/applyfinish.aspx') > -1) {
			return 'ApplyFinish';
		} else if (pagePath.indexOf('/join.aspx') > -1 || /\/join\/?$/i.test(pagePath)) {
			if (pageQuery.indexOf('portable=1') > -1) {
				return 'PortableJoin';
			} else {
				return 'Join';
			}
		} else if (pagePath.indexOf('/landing.aspx') > -1) {
			return 'Home';
		} else {
			return pagePath;
		}
	}

	// Join
	(function () {
		var startPath = '',
			pageType = '',
			submitCount = 0,
			isComplete = false;

		$(document.body).bind('joinStarted', function (e, elem) {
			elem = $(elem);
			var elemId = elem.attr('id');

			if (elem.length < 1) {
				startPath = '';
			} else if (elemId === 'hlTalentNetworkHeaderJoin') {
				startPath = 'Header';
			} else if (/hlJoin1$/.test(elemId) || /hlJoin2$/.test(elemId)) {
				startPath = 'NotReadyToApply';
			} else if (/btnApply/.test(elemId) && /Join\.aspx/i.test(elem.attr('href'))) {
				startPath = 'Apply';
			} else if (elem.parents('#no-results').length > 0) {
				startPath = 'NoResults';
			} else {
				startPath = elemId;
			}

			pageType = GetPageType(document.location);

			_gaq.push(['tn._trackEvent', 'Join', 'Start', startPath + '--' + pageType]);
		});
		$(document.body).bind('joinSubmitted', function () {
			submitCount = submitCount + 1;
			if (pageType === '') {
				pageType = GetPageType(document.location);
			}
            _gaq.push(['tn._trackEvent', 'Join', 'Submit', startPath + '--' + pageType, submitCount]);
		});
		$(document.body).one('joinCompleted', function () {
			if (pageType === '') {
				pageType = GetPageType(document.location);
			}
            _gaq.push(['tn._trackEvent', 'Join', 'Complete', startPath + '--' + pageType]);
			isComplete = true;
		});
		$(document.body).one('joinAlreadyUser', function () {
			if (pageType === '') {
				pageType = GetPageType(document.location);
			}
            _gaq.push(['tn._trackEvent', 'Join', 'AlreadyUser', startPath + '--' + pageType]);
			isComplete = true;
		});
		$(document.body).bind('joinCancelled', function () {
			if (!isComplete) {
				if (pageType === '') {
					pageType = GetPageType(document.location);
				}
	            _gaq.push(['tn._trackEvent', 'Join', 'Close', startPath + '--' + pageType]);
			}
		});
	} ());


	// Apply without Join
	(function () {
		$('[id*="btnApply"]').filter(function (i) {
			return !(/Join\.aspx/i).test($(this).attr('href'));
		}).one('click', function (e) {
			var url = $(e.target).attr('href');
			_gaq.push(['tn._trackEvent', 'Apply', 'Start', 'Direct']);
			window.setTimeout(function () {
				document.location.href = url;
			}, 100);
			e.preventDefault();
		});
	} ());
});


