// Determine platform and browser and use the appropriate style sheet
// Also adds a global boolean var for general browser detection - isIE
//
// 01/08/2010 - Ernest Lombardi: added global vars to test for IE8 and IE8 compatability mode
// 

var isMac = (navigator.appVersion.indexOf("Mac") != -1);
var isIE = true;
//
// Use CSS for PC / IE 4.0+
if((navigator.appName == "Microsoft Internet Explorer") && (parseInt(navigator.appVersion) >= 4 ) && !isMac) {
  document.write('<link rel="stylesheet" href="' + cssPath + 'llbean_ie.css" type="text/css">');
	//alert('llbean_ie.css');
}
// Use CSS for Safari Users (Both PC & MAC)
else if (navigator.userAgent.toLowerCase().indexOf('safari') != -1 ) {
  document.write('<link rel="stylesheet" href="' + cssPath + 'llbean_mac_nn.css" type="text/css">');
  	isIE = false;
  	//alert('llbean_mac_nn.css');
}
// Use CSS for PC / NN 4.0+ / Firefox
else if ((navigator.appName == "Netscape") && (parseInt(navigator.appVersion) >= 4) && !isMac ) {
  document.write('<link rel="stylesheet" href="' + cssPath + 'llbean_nn.css" type="text/css">');
	isIE = false;
	//alert('llbean_nn.css');
}
// Use CSS for MAC / IE 4.0+
else if ((navigator.appName == "Microsoft Internet Explorer") && (parseInt(navigator.appVersion) >= 4) && isMac) {
  document.write('<link rel="stylesheet" href="' + cssPath + 'llbean_mac_ie.css" type="text/css">');
	//alert('llbean_mac_ie.css');
}
// Use CSS for MAC / NN 4.0+ / Firefox
else if ((navigator.appName == "Netscape") && (parseInt(navigator.appVersion) >= 4) && isMac) {
  document.write('<link rel="stylesheet" href="' + cssPath + 'llbean_mac_nn.css" type="text/css">');
	isIE = false;
	//alert('llbean_mac_nn.css');
}

// always load this CSS
document.write('<LINK REL=STYLESHEET TYPE="text/css" HREF="' + cssPath + 'llbeanStyles.css" TITLE="MASTER">');


var isIE8 = false;
if(document.documentMode != null){
	isIE8 = true;
	var isIE8CompatOn = (document.documentMode < 8) ? true : false;	// true if we're on ie 8 && compat mode is ON
}
