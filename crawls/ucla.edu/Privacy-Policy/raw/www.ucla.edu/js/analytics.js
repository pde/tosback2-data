// Set account and track pageviews
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-423028-6']);
_gaq.push(['_trackPageview']);

//GLOBAL GA ACCOUNT
_gaq.push(['b._setAccount', 'UA-35157935-1']);
_gaq.push(['b._setDomainName', 'ucla.edu']);
_gaq.push(['b._trackPageview']);

// Call asynchronous tracking script
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();




// Event tracking calls
// jQuery required for DOM selection
$(function() {

	
	// Default link tracking
	$('a[href]').each(function() {				
		
		var currPageTitle = document.title; // Page title
		var currPagePath = window.location.pathname; // URL path
		var linkURL = $(this).attr('href'); // Hyperlink URL
		var linkText = $(this).text(); // Hyperlink text

		// Outbound link
		if ( linkURL.match(/^https?\:/i) && (!linkURL.match(document.domain)) ) {
			$(this).click(function() {
				var outboundURL = linkURL.replace(/^https?\:\/\//i, ''); // Outbound URL without http(s)
				_gaq.push(['_trackEvent', currPageTitle + ' - (' + currPagePath + ')', 'Click', linkText + ' (' + outboundURL + ')']);
			});
		}
		// Email link
		if ( linkURL.match(/^mailto\:/i) ) {
			$(this).click(function() {
				var emailAddress = linkURL.replace(/^mailto\:/i, ''); // Email link without mailto:
				_gaq.push(['_trackEvent', currPageTitle + ' - (' + currPagePath + ')', 'Click - email', linkText + ' (' + emailAddress + ')']);
			});
		}
		// Download link
		if ( linkURL.match(/\.(zip|pdf|doc*|xls*|ppt*|mp3)$/i) ) {
			$(this).click(function() {
				var docExtension = linkURL.slice(linkURL.lastIndexOf(".") +1);
				var docPath = linkURL.replace(/^https?\:\/\/(www.)ucla\.edu\//i, ''); // Document file path
				_gaq.push(['_trackEvent', currPageTitle + ' - (' + currPagePath + ')', 'Click - ' + docExtension, linkText + ' (' + docPath + ')']);
			});
		}
	
	});
	
	
});