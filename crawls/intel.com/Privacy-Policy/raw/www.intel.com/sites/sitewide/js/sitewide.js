<!--

var agt=navigator.userAgent.toLowerCase();
var appVer = navigator.appVersion.toLowerCase();
var is_mac = (agt.indexOf("mac")!=-1);
var is_minor = parseFloat(appVer);
var is_major = parseInt(is_minor);
var is_opera = (agt.indexOf("opera") != -1);
var iePos  = appVer.indexOf('msie');
var is_mac_ie = false;
if (iePos !=-1) {
   is_minor = parseFloat(appVer.substring(iePos+5,appVer.indexOf(';',iePos)));
   is_major = parseInt(is_minor);
}
var is_ie = ((iePos!=-1) && (!is_opera));
if (is_mac && is_ie) {
	is_mac_ie = true;
}
var is_ie5up = (is_ie && is_minor >= 5);
var is_ie5_5up =(is_ie && is_minor >= 5.5);   
var is_safari = ((agt.indexOf('safari')!=-1)&&(agt.indexOf('mac')!=-1))?true:false;
var nn4 = false;
if (document.layers) {
	nn4 = true;
}

function sectionOn(section,geoPath) {
	if (geoPath == "" || geoPath==undefined) {
		geoPath = "/sites/sitewide/pix/";
	}
	document.images["nav" + section].src = geoPath.toString() + "nav" + section + "_on.gif";

	/*var href = document.location + "";
	var hrefData = href.split("/");
	var sections = new Array("products","techtrends","solutions","resources","support");
	var changeThis;
	var topfolder = hrefData[3];
	
	if (topfolder == "cd") {
		topfolder = hrefData[4];
	}
	
	for (i = 0; i < sections.length; i++) {
		if (topfolder == sections[i]) {
			changeThis = i;
		}
	}
	
	if (changeThis || changeThis == 0) {
		var image = document.images["nav" + changeThis].src.split(".gif");
		var target = image[0] + "_on.gif";
		document.images["nav" + changeThis].src = target;
	}*/
}

function goURL(s) { var val=s.options[s.selectedIndex].value.toString(); if (val!='') window.location.href=val; }

var ns6,ns4,ie4;
// Show/Hide functions for non-pointer layer/objects
ns4 = (document.layers)? true:false
ie4 = (document.all)? true:false
ns6 = false;
//if the DOM is not IE and not NS4, it must be NS6
if (ns4 == ie4) {
	ns6 = true;
	ie4 = ns4 = false;
}

var URL,width,height,scroll,menubar,toolbar,resize,xPos,yPos,s_gs;winName = "";
function openWin(URL,width,height,scroll,menubar,toolbar,resize,xPos,yPos,winName){
	var focusFail = false;
	if (width == "") width = "500";
	if (height == "") height = "500";
	if (scroll == "") scroll = "auto";
	if (menubar =="") menubar = "no";
	if (toolbar == "") toolbar = "no";
	if (resize == "") resize = "yes";
	if (xPos == "") xPos = "5";
	if (yPos == "") yPos = "5";
	if (winName == "") winName = "win";
	var features ="width=" +width+ ",height=" +height+ ",scrollbars=" +scroll+ ",menubar=" +menubar+ ",toolbar=" +toolbar+ ",resizable=" +resize+ ",left=" +xPos+ ",top=" +yPos;
	var newWin = window.open(URL,winName,features);
	if (navigator.appVersion.indexOf("NT")!= -1){
		if (navigator.appVersion.indexOf("NT 5")!= -1){
			focusFail = false;
		} else if (ie4 == true)	focusFail = true;
	}
	if (focusFail == false){
		if (window.focus) newWin.focus();
	}
}

function showmore(which) {
	getObj("showmore" + which).style.display = "none";
	getObj("content" + which).style.display = "block";
}

function showless(which) {
	getObj("content" + which).style.display = "none";
	getObj("showmore" + which).style.display = "block";
}

function popExternal(url) { var win=window.open('/sites/sitewide/external_popup.htm?url='+escape(url),'externalPop','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=520,height=230'); if (window.focus)win.focus(); }

//***** Function for Demo popup Centered in the Window *****//
function demoPopCentered(url, w, h, name) {
   var t = Math.floor( (screen.height - h) / 2);
   var l = Math.floor( (screen.width - w) / 2);
   var winParms = "top=" + t + ",left=" + l + ",width=" + w + ",height=" + h;
   if (name=="") {name="demoPop"}
   var win = window.open(url, name, winParms);
   if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
   //return win;
}
//***** END *****//

/*
function emailThisPage() {
	var u = "Thought you might be interested in this information from Intel Corporation - ";
	var t = "Information from Intel Corporation - "
	t = t + document.title
	t = t.replace(/™/g, "(TM)");
	t = t.replace(/®/g, "(R)");
	t = t.replace(/©/g, "(C)");
	u = u + window.location + ".";
	document.location.href= "mailto:?subject=" + t + "&body=" + u 
}
*/

function emailFriend(location) {
	var width = "492";
	var height = "540";
	if (!location) { location = "en_US";}
	if (location == "cs_CZ"|location == "es_MX"|location == "es_LA"|location == "es_ES"|location == "nl_NL"|location == "pt_BR") {width = "525";}
	if (location == "fr_FR"|location == "vi_VN") {width = "550";}
	if (location == "pl_PL") {width = "555";}
	if (location == "ro_RO") {width = "610";}
	if (location == "ru_RU") {width = "600";}
	if (location == "th_TH") {width = "500";}
	if (location == "uk_UA") {width = "540";}
	var shareUrl = "http://www.intel.com/sites/sitewide/" + location + "/emailfriend.htm?param=" + document.location.href;
	openWin(shareUrl,width,height,"no","no","no","yes",110,40,"emailfriend");
}

//-->
