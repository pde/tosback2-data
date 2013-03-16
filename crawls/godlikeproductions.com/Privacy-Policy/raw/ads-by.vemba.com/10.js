(function() {
	var vwindow = window;
	var vdocument = document;

	var zone = "10";
	var width = "160";
	var height = "600";

	var referer = vdocument.referer;
	var page = vdocument.URL;

	if (referer === undefined) {
		referer = '';
	} else {
		referer = encodeURIComponent(referer);
	}

	if (page === undefined) {
		page = '';
	} else {
		page = encodeURIComponent(page);
	}

	document.writeln('<iframe width='+width+' height='+height+' marginwidth=0 marginheight=0 frameborder=0 border=0 scrolling=no src="http://i.vemba.com/'+zone+'?referer='+referer+'&page='+page+'"></iframe>');
})();