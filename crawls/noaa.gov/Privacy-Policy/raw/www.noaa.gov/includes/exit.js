/* exit URL wrapper */

window.onload = function() {
	wrapExitLinks();
}

function wrapExitLinks() {
	var whiteList = "^gov^mil^us^";
	var exitURL = document.location.protocol + "//" + document.location.host + "/exit.html";
	var currentBaseURL = document.location.protocol + "//" + document.location.host + document.location.pathname;
	var links = document.getElementsByTagName("a");

	var linkDest;
	var linkTLD;
	var govTLD;
	if  (currentBaseURL != exitURL) {
		for (var i in links) {
			if (linkDest = links[i].hostname) {
				// Do not wrap addThis links
				if ((links[i].className.indexOf("addthis_") == -1) && (links[i].className.indexOf("bypass") == -1)) {			
					linkTLD = linkDest.substr(linkDest.lastIndexOf(".") + 1);
					if (whiteList.indexOf("^" + linkTLD + "^") == -1) {
							links[i].href = exitURL + "?" + encodeURIComponent(links[i].href);
					}
				}
			}	
		}
	} else {
		confirmExit();	
	}
	
}

function confirmExit() {
	var linkDest = decodeURIComponent(document.location.search.substring(1));
	var exitLink = document.getElementById("exitLink");
	exitLink.href = linkDest;
	exitLink.innerHTML = linkDest;
}