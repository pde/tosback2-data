var gTrackLinkQueue = new Array();

function gfCallTracker(strVirtualPath, objWTOptions) {

	try {
		trackLink(strVirtualPath, objWTOptions);
		//alert("gfCallTracker() -- called trackLink() -- strVirtualPath = " + strVirtualPath + "");
		return;
	} catch (e) {
		//alert("gfCallTracker() -- called trackLink() -- Error:  " + e);
	}

	var arrTrackLinkQueue = new Array();

	try {
		arrTrackLinkQueue = gTrackLinkQueue;

	} catch(e) {
	
	}

	arrTrackLinkQueue[arrTrackLinkQueue.length] = {"virtualPath":strVirtualPath, "WTOptions":objWTOptions};

	gTrackLinkQueue = arrTrackLinkQueue;
}

var strVirtualPathOnExit = "";
var objWTOptionsOnExit = new Object();

function setExitListenerValues(strVirtualPath, objWTOptions) {
	strVirtualPathOnExit = strVirtualPath;
	objWTOptionsOnExit = objWTOptions;
}

function trackLinkOnExit() {
	trackLink(strVirtualPathOnExit, objWTOptionsOnExit);
}


function gfCallExitTracker(strVirtualPath, objWTOptions) {
	try {
		/*
		addUnloadEvents(trackLink(strVirtualPath, objWTOptions));
		*/
		// UBET: trying a direct listener approach
		setExitListenerValues(strVirtualPath, objWTOptions);
		if(window.addEventListener) {
			window.addEventListener('unload',trackLinkOnExit,false);
		} else if(window.attachEvent) {
			window.attachEvent('onunload',trackLinkOnExit);
		}
		//alert("gfCallExitTracker() -- adding trackLink() to unload events -- strVirtualPath = " + strVirtualPath + "");
	} catch (e) {
		//alert("gfCallExitTracker() -- adding trackLink() to unload events  -- Error:  " + e);
	}
}
