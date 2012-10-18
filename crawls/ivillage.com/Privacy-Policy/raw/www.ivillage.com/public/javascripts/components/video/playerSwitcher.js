brightcove.isSupportedMobileBrowser = function() {
  // console.log("supported mobile browser");
    var supportedBrowsers = [
        "android 2.2"
    ];

    var uagent = navigator.userAgent.toLowerCase();
    
    for (var i=0; i < supportedBrowsers.length; i++) {
        if (uagent.search(supportedBrowsers[i]) > -1) {
            return true;
        }
    }
    
    return false;
}

brightcove.insertPlayer = function(pContainerElementID, pPlayerElementID, pDesktopParams, pMobileParams) {
   //console.log("inside insert player");
    var params;
    if (brightcove.isSupportedMobileBrowser()) {
   		params = pMobileParams;
    } else { 
        params = pDesktopParams;
    }

    var player = brightcove.createElement("object");
    player.id = pPlayerElementID;
    var parameter;
    for (var i in params) {
         parameter = brightcove.createElement("param");
         if (i == "videoPlayer") {
           parameter.name = "@"+i; 
         }
		 else {
		   parameter.name = i;
         }
         parameter.value = params[i];
         player.appendChild(parameter);
    }
    var playerContainer = document.getElementById(pContainerElementID);
    brightcove.createExperience(player, playerContainer, true);
}


brightcove.insertPlayer(
  "playerContainer",
  "myPlayer",
  desktopPlayer,
  mobilePlayer
);
