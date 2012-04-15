function _linkGA (href, target) {
	var pageTracker = _gaq._getAsyncTracker('global');
	var dstURL = pageTracker._getLinkerUrl(href);
	if (target == "_blank")
		window.open (dstURL);
	else
		window.location.href = dstURL;
}

function recordOutboundLink(link, category, action) {
  try {
    var pageTracker=_gat._getTracker("UA-18261064-1");
    pageTracker._trackEvent(category, action);
    setTimeout('document.location = "' + link.href + '"', 100)
  }catch(err){}
}

function addLinkerEvents () {
	var curHref;
	var as = document.getElementsByTagName("a");
	var extTrack = new RegExp (".*acer.*");
	for (var i = 0; i < as.length; i++) {
		curHref = as[i].href;
		if (extTrack.test (curHref) && curHref.indexOf (document.domain) == -1) {
			var temp = as[i].getAttribute('onclick');
			if(temp == null)temp="";
			as[i].setAttribute('onclick', "_gaq.push(function() { _linkInNewWindow ('"+curHref+"');});"+temp+";return true;");
		}
	}
}

addLinkerEvents();
