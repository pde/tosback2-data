(function() {
	var vemba_referer = document.referrer;
	var vemba_page = document.URL;

	if (vemba_referer === undefined) {
		vemba_referer = '';
	} else {
		vemba_referer = encodeURIComponent(vemba_referer);
	}

	if (vemba_page === undefined) {
		vemba_page = '';
	} else {
		vemba_page = encodeURIComponent(vemba_page);
	}

	document.writeln('<iframe width="160" height="600" marginwidth=0 marginheight=0 frameborder=0 border=0 scrolling=no src="http://i.vemba.com/10?referer='+vemba_referer+'&page='+vemba_page+'"></iframe>');
})();
