function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

function changeImages() {
	if (document.images && (preloadFlag == true)) {
		for (var i=0; i<changeImages.arguments.length; i+=2) {
			document[changeImages.arguments[i]].src = changeImages.arguments[i+1];
		}
	}
}

var preloadFlag = false;
function preloadImages() {
	if (document.images) {
		for_businesses_over  = newImage("/images/for_businesses-over.gif");
		for_consumers_over   = newImage("/images/for_consumers-over.gif");
		for_sealholders_over = newImage("/images/for_sealholders-over.gif");
		about_truste_over    = newImage("/images/about_truste-over.gif");
		preloadFlag = true;
	}
}
