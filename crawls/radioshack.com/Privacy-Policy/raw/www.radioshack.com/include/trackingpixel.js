// establishing namespace if it doesn't already exist
var TA = TA || {};


TA.filterPixelProtocol = function(html) {
	// make request match current protocol
	if (window.location.protocol == 'https:') {
		html = html.replace(/^http:/i,'https:');
	} else {
		html = html.replace(/^https:/i,'http:');
	}
	return html;
}

/*
*	'load' function for use with iFrame tracking pixels
*	Optional boolean filterProtocol parameter can be used to prevent filterPixelProtocol from beign applied
*	Optional boolean async parameter can be used when firing pixels off of an ajax call
*/
TA.loadPixel = function(src, filterProtocol, async) {
	// create iFrame
	async = (typeof(async) !== "undefined") ? async : false;
	filterProtocol = (typeof(filterProtocol) !== "undefined") ? filterProtocol : true;
	var iframe = document.createElement('iframe');
	iframe.src = (filterProtocol) ? TA.filterPixelProtocol(src) : src;
	iframe.height = "1";
	iframe.width = "1";
	iframe.frameBorder = "0";
	iframe.marginHeight = "0";
	iframe.marginWidth = "0";
	iframe.topMargin = "0";
	iframe.leftMargin = "0";
	iframe.scrolling = "No";
	function myOnLoad() {
		document.body.appendChild(iframe);
	}
	// check for existing event
	// if async is set the pixel will be added automatically
	if(async)
	{
		myOnLoad();
	} else
	{
		if (window.onload) {
			// load existing event and load iFrame
			var curOnLoad = window.onload;
			window.onload = function () {
				curOnLoad();
				myOnLoad();
			}
		} else {
			// load iFrame
			window.onload = myOnLoad;
		}
	}
}

// 'ping' function for use with IMG tracking pixels
TA.pingPixel = function(src) {
	// create and send ping as img element
	document.createElement('img').src = TA.filterPixelProtocol(src);
};

// create random var for tracking
TA.axel = Math.random() + "";
TA.random = TA.axel * 10000000000000;
