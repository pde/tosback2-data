if (BrowserDetect.browser == "Explorer") {
	//document.write('<style type="text/css">#quickView {behavior: url("/static/styles/iepngfix.htc");}</style>');
	try {
		document.execCommand('BackgroundImageCache', false, true);
	} catch(e) {}
} else if (BrowserDetect.browser=="Firefox") {
	if (BrowserDetect.version == 2) {
		if (BrowserDetect.OS == "Windows") {
				document.write('<link rel="stylesheet" href="/static/styles/firefox2.css" type="text/css" charset="utf-8" />');
			}
			else if (BrowserDetect.OS == "Mac") {
				document.write('<link rel="stylesheet" href="/static/styles/ff_2_mac.css" type="text/css" charset="utf-8" />');
			}
		}
	else if (BrowserDetect.version == 3){
		if (BrowserDetect.OS == "Windows") {
			document.write('<link rel="stylesheet" href="/static/styles/firefox3.css" type="text/css" charset="utf-8" />');
		}
		else if (BrowserDetect.OS == "Mac") {
			document.write('<link rel="stylesheet" href="/static/styles/ff_3_mac.css" type="text/css" charset="utf-8" />');
		}
	}
} else if (BrowserDetect.browser == "Safari") {
	if (BrowserDetect.OS == "Windows") {
		document.write('<link rel="stylesheet" href="/static/styles/safari.css" type="text/css" charset="utf-8" />');
	} else if (BrowserDetect.OS == "Mac") {
		document.write('<link rel="stylesheet" href="/static/styles/safari.css" type="text/css" charset="utf-8" />');
	}
} else if (BrowserDetect.browser == "Chrome") {
	document.write('<link rel="stylesheet" href="/static/styles/chrome.css" type="text/css" charset="utf-8" />');
} else if (BrowserDetect.browser == "Opera") {
	document.write('<link rel="stylesheet" href="/static/styles/opera.css" type="text/css" charset="utf-8" />');
}