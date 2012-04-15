/* override iframe_safeway_hosted.js to fix scrollbar issue with fixed layout */

var OVERRIDE_IFRAME_HEIGHT_ADDITION = 35;
var OVERRIDE_IFRAME_WIDTH_ADDITION = 35;

function get3rdPartyLocation(contentUrl, viewName, hostname)
{
	var path = '/'
	var width = '730';
	var iframe = document.getElementById('ifrm');
	var domain = ''; //setURL(contentUrl);
	width = getWidth(viewName) + OVERRIDE_IFRAME_WIDTH_ADDITION; // ***** OVERRIDE - increase width on outer frame *****
	var iFrmPath = ''; // domain;
	//if(SubDomain.length > 0) {
	//	iFrmPath = SubDomain + '.' + domain;
	//}

	var contentUrlProtocal = contentUrl.substring(0,5);
	
	if(contentUrlProtocal.indexOf('https') > -1) {
		contentUrlProtocal = 'https://';
	}
	else{
		contentUrlProtocal = 'http://';
	}
	
	var protocal = window.location.protocol + "//";
	
	var url = unescape(contentUrl);
	domain = url.substring(url.indexOf('//') + 2, url.length);
	domain = domain.substring(0, domain.indexOf('/'));
	iFrmPath = contentUrlProtocal + domain;
	path = getFilePath(iFrmPath);
	if(path.length == 0) {
		window.location.href = '/IFL/Grocery/GenericApplicationError';
		return;
	}
	iframe.width = width;

	// ***** OVERRIDE - increase height on outer frame *****
	if ((iframe.height.length > 0) && !isNaN(iframe.height)) {
		iframe.height = parseInt(iframe.height) + OVERRIDE_IFRAME_HEIGHT_ADDITION ;
	}
	var innerWidth = width - 20; // ***** OVERRIDE - inner frame should be 20 pixels smaller than outer

	var fullPath = path + "protocol="+protocal+"&width="+innerWidth+"&hostname="+hostname+"&contentURL=" + escape(contentUrl);
	//alert('fullPath=' + fullPath);
	return fullPath; 
}


function resize(frame, height, width) {
	//alert('resizing ' + frame + ' width = ' + width + ' height = ' + height);
	// ***** OVERRIDE - increase width/height pixels for 'ifrm' to match above
	if (frame == 'ifrm') {
		height = parseInt(height) + OVERRIDE_IFRAME_HEIGHT_ADDITION;
		width = parseInt(width) + OVERRIDE_IFRAME_WIDTH_ADDITION;
	}

	var oframe = document.getElementById(frame);
	oframe.height = height;
	if(!isNaN(width) && width != '') {
		//alert("changing the width to:" + width);
		oframe.width = width;
	} 
}
