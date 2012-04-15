var lpdbButtonName;
if (typeof(lpdbButtonName)=="undefined") {
	lpdbButtonName = lpUASunit + "-" + lpUASlanguage;	
}
var lpdbButtonRoom;
if (typeof(lpdbButtonRoom)=="undefined") {
	lpdbButtonRoom = lpUASunit +"-"+ lpUASlanguage;
}
var lpdbButtonContext = lpUAScontext;
var lpdbButtonImageURL = lpUASimagesPath + "/" + lpUASbuttonImagesFolder + "/reponline.gif"; 
var lpdbAlternateButtonBusyImageURL = lpUASimagesPath +	"/" + lpUASbuttonImagesFolder + "/repoccupied.gif";
var lpdbAlternateButtonOfflineImageURL = lpUASimagesPath + "/" + lpUASbuttonImagesFolder + "/repoffline.gif";
var lpUASalternateButtonImageName;
if (typeof(lpUASalternateButtonImageName)=="undefined") {
	lpUASalternateButtonImageName = "repoffline.gif";
}
var lpdbAlternateImageURL = lpUASimagesPath + "/" + lpUASbuttonImagesFolder + "/" + lpUASalternateButtonImageName;

function lpdbAlternateFunctionDefault() {
	window.open(lpUASimagesPath + "/" + lpUASbuttonImagesFolder + "/service_temporarily_unavailable.html"); 
}
if (typeof(lpUASalternateButtonFunction)!="undefined") {
	lpdbAlternateFunction=lpUASalternateButtonFunction;
} else {	
	lpdbAlternateFunction=lpdbAlternateFunctionDefault;
}
var lpdbRefreshRate;
if (typeof(lpdbRefreshRate)=="undefined")
	lpdbRefreshRate=-1;
var lpdbSSL;
if (typeof(lpdbSSL)=="undefined")
	lpdbSSL=true;

// Optional - In the code below you may provide generic button image height/width (in pixels)
if (typeof(lpdbButtonImageHeight)=="undefined" || lpdbButtonImageHeight.indexOf('<')>=0)
	lpdbButtonImageHeight = "<generic button image height>";
if (typeof(lpdbButtonImageWidth)=="undefined" || lpdbButtonImageWidth.indexOf('<')>=0)
	lpdbButtonImageWidth = "<generic button image width>";

