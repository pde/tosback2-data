// You have to have jQuery for this to work!
// Google Analytics is called here along with custom functions to
// enable Even Tracking of external links and files.

$(document).ready(function(){

	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	var pageTitle = document.title; //get page title
	var path = document.location.pathname; //get path for page
	
	//use jQuery to call the Google Analytics JavaScript
	$.getScript(gaJsHost + "google-analytics.com/ga.js", function(){
	
		//tell Analytics about the current page load using standard _trackPageview method
		try {
			var pageTracker = _gat._getTracker("UA-423028-6");
			pageTracker._trackPageview();
		} catch(err) {}
		
		//loop though each anchor element
		$('a[href]').each(function(){
			
			var href = $(this).attr('href');
			var linkTitle = $(this).text();
			var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
			
			//check for links starting with http or https, making sure that links to our own domain are excluded
			if ((href.match(/^https?\:/i)) && (!href.match(document.domain))){
				$(this).click(function() {
					var extLink = href.replace(/^https?\:\/\//i, '');
					pageTracker._trackEvent(pageTitle + ' - (' + path + ')', 'Click', linkTitle + ' (' + extLink + ')');
				});
			}
			//check for links starting with mailto:
			else if (href.match(/^mailto\:/i)){
				$(this).click(function() {
					var mailLink = href.replace(/^mailto\:/i, '');
					pageTracker._trackEvent(pageTitle + ' - (' + path + ')', 'Click', linkTitle + ' (' + mailLink + ')');
				});
			}
			//check for links with file extension that match the filetypes regular expression:
			else if (href.match(filetypes)){
				$(this).click(function() {
  					var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
					var filePath = href.replace(/^https?\:\/\/(www.)mydomain\.com\//i, '');
					pageTracker._trackEvent(pageTitle + ' - (' + path + ')', 'Click - ' + extension, linkTitle + ' (' + filePath + ')');
				});
			}

		});
		
	});

});