//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~Mobile/Desktop device linker~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~common to all mobile and desktop pages~~~~~~~~~~~~~~~~
//~~~~~~~~~~Need to add runOnLoad(); to kh_loadFunctions~~~~~~~~~~~~~
//~~~~~~~~~~~~within /standard_licensee/js/functions.js~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~and kh_common.js~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Set Common Vars for Mobile
arrivingURL=window.location.href;
lowercaseURL=arrivingURL.toLowerCase();
insert2URL="m.";
hashLocation=lowercaseURL.indexOf("#");
portMobile=':8002';
portDesktop=':8005';
subMobilePreProd='http://m-enzo.kidshealth';
subDesktopPreProd='http://enzo.kidshealth';
subMobileProd='http://m.kidshealth';
subDesktopProd='http://kidshealth';

function subPortDesktopSwitcher() {
	if(desktopURL.indexOf(subMobileProd)!=-1) {
		desktopURL=desktopURL.replace(subMobileProd,subDesktopProd);	
	}
	else if(desktopURL.indexOf(subMobilePreProd)!=-1) {
		desktopURL=desktopURL.replace(subMobilePreProd,subDesktopPreProd);
	}
	else if(desktopURL.indexOf(portMobile)!=-1) {
		desktopURL=desktopURL.replace(portMobile,portDesktop);	
	}
}

function subPortMobileSwitcher() {
	if(mobileURL.indexOf(subDesktopProd)!=-1) {
		mobileURL=mobileURL.replace(subDesktopProd,subMobileProd);	
	}
	else if(mobileURL.indexOf(subDesktopPreProd)!=-1) {
		mobileURL=mobileURL.replace(subDesktopPreProd,subMobilePreProd);
	}
	else if(mobileURL.indexOf(portDesktop)!=-1) {
		mobileURL.replace(portDesktop,portMobile);	
	}
}

function createStaticURL() {
	if(mothershipMobileURL==0 || mothershipMobileURL=='' || mothershipMobileURL==null || mothershipMobileURL.indexOf("#mobile")!=-1){
		staticURL=mothershipDesktopURL;}
		else {staticURL=mothershipMobileURL;}
}

function isItDynamicChecker() {
	if(lowercaseURL.indexOf("pagemanager")!=-1)	{
		isItDynamic=1;	
	}
	else {
		isItDynamic=0;
		createStaticURL();
	}
}


function isItMothershipChecker() {
	if((isItDynamic==0) || (lowercaseURL.indexOf("lic=1&")!=-1) || (lowercaseURL.indexOf("lic=152")!=-1) || (lowercaseURL.indexOf("m.kidshealth")!=-1)) {
	isItMothership=1;	
	}
	else { isItMothership=0;}
}


//Check if we're on mobile or desktop
function isItMobileChecker() {
	if(lowercaseURL.indexOf("m=y")!=-1 || lowercaseURL.indexOf("m.k")!=-1 || mothershipDesktopURL!='' || lowercaseURL.indexOf("m-enzo.k")!=-1) {
		isItMobile = 1;	
	}
	else {
		isItMobile = 0;	
	}
}


//Function to create desktop link
function createDesktopLink() {
	if(isItDynamic==1) {
	desktopURL=(arrivingURL.replace("&m=y", ""));
	}
	else {
		createStaticURL();
		desktopURL=staticURL;
	}
	if((isItMothership==1)&&(isItDynamic==1)){
		desktopURL=desktopURL.replace('lic=152','lic=1');	
		// Add port changer for this
		// desktopURL=desktopURL.replace(portMobile,portDesktop);
		// New function for port and sub-domain switching.
		subPortDesktopSwitcher();
	}
}

function dynamicWellnessCenter2Category() {
	/* Making this function empty as we are reverting wellness center to category redirection.
	if(mobileWcURL!='') { mobileURL = mobileWcURL; }
	*/
}

//Create mobile link
function createMobileLink() {
	
	if(isItDynamic==1 && lowercaseURL.indexOf("#")!=-1) {
		mobileURL=arrivingURL.substr(0,hashLocation)+"\&m=y"+arrivingURL.substr(hashLocation);
		dynamicWellnessCenter2Category();
	}
	
	else if(isItDynamic==1) {
		mobileURL=arrivingURL+"\&m=y";
		dynamicWellnessCenter2Category();
	}
	
	else {
		createStaticURL();
		mobileURL=staticURL;
	}
	if((isItMothership==1)&&(isItDynamic==1)){
		dynamicWellnessCenter2Category();
		mobileURL=mobileURL.replace('lic=1','lic=152');
		// Add port changer for this
		// mobileURL=mobileURL.replace(portDesktop,portMobile);
		// New function for port and sub-domain switching.
		subPortMobileSwitcher();
	}
}

function sendToMobile() {
	createMobileLink();	
	window.location=mobileURL;
}

function sendToDesktop() {
	createDesktopLink();
	window.location=desktopURL;	
}
		
function createCookie22(name,value,days) {
	
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+";path=/;domain=kidshealth.org";
}
	
function readCookie22(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function createDeviceLinkage() { //Needs to be called onload
	if(isItMobile==1) {
		createDesktopLink();
		// link to appear on mobile version
		deviceLinkToInsert='View: <span class="currentDevice">Mobile</span> | <a onclick="createCookie22(\'desktopPref\',\'1\',\'365\'); sendToDesktop();" title="'+desktopURL+'">Desktop</a>';
		
		}
	else if(isItMobile==0) {
		
		// link to appear on desktop version
		createMobileLink();
		deviceLinkToInsert='View: <a onclick="createCookie22(\'desktopPref\',\'0\',\'-1\'); sendToMobile();" title="'+mobileURL+'">Mobile</a> | <span class="currentDevice">Desktop</span>';
		}	
	// Create container for device linking
	deviceDiv = document.createElement("div");
	deviceDiv.id = "deviceSelector";
	deviceDiv.innerHTML = deviceLinkToInsert;
	// Decide where we'll put it
	if((isItMobile==0)&&(isItMothership==1)) {
		footerContainer=document.getElementById('kidsHealthFooter');
		
		}
		
	else if((isItMothership==1)&&(isItMobile==1)) {
		footerContainer=document.getElementById('khMothershipMobileFooter');	
		
	}
	else if(isItMothership==1){
		footerContainer=document.getElementById('kidsHealthFooter');
		
	}
	else {
		footerContainer=document.getElementById('kh_lic_footer');
		
		}
	footerExistingContentStart=footerContainer.firstChild;
	footerContainer.insertBefore(deviceDiv,footerExistingContentStart);
}
function runOnLoad() {
	isItDynamicChecker();
	isItMothershipChecker();
	isItMobileChecker();
	createDeviceLinkage();
}
//~~~~~~~~~~~~~~~~~~~~~End mobile device linker~~~~~~~~~~~~~~~~~~~~~~~

// Empty functions to cure mobile discrepencies
// function initRotator() {}

//~~~~~~~~~~~~~ link to classroom ~~~~~~~~~~~~~~~//
function classroomAlert() {
	if(confirm('Please note that our Classroom site is not yet mobile optimized. Do you still wish to continue?')) {
		window.open('http://classroom.kidshealth.org/');
	}
	else stop;
}