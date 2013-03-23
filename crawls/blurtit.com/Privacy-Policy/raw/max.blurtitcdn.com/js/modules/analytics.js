var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-5849863-1']);
_gaq.push(['_setDomainName', 'blurtit.com']);
_gaq.push(['_trackPageview']);
if(blurtit.loggedin) {
	_gaq.push(['_setVar','logged-in']);
}

(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
