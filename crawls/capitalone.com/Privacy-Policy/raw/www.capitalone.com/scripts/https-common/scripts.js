// Common Javascript library
function windowit(url) {javascript:window.open(url,'fullwindow','width=742,height=500,menubar,toolbar,titlebar,status,scrollbars,location,resizable');}
function windowCustom(url,param){javascript:window.open(url,'fullwindow',param);}

function popup(url,name,width,height) {
        if (! width) { width=525; }
        if (! height) { height=600; }
        popwindow=window.open(url,name,'menubar,scrollbars,dependent,width='+width+',height='+height+',left=164,top=4');
}
function openWindow(url, name) {popupWin = window.open(url, name, 'resizable,scrollbars,dependent,width=620,height=400,left=5,top=5')}
function Logout()
{
    var WindowClosed = window.Closed;
    if (WindowClosed) {popupWin = window.open('/ias_static/need_flash.html', 'needFlashWindow', 'menubar,status,scrollbars,resizable,width=600,height=400,left=10,top=10')}
}
function openPopUp(url, name) {popupWin = window.open(url, name, 'resizable,scrollbars,dependent,menubar,toolbar,width=600,height=400,left=5,top=5')}
function roll(image1, reference1) {if (document.images) { document.images[image1].src = reference1; }}

function openWindowSav(url, name){
popupWin = window.open(url, name, 'resizable,scrollbars,dependent,width=585,height=420,left=500,top=325');
}

// added by sravan kumar 12/18/2003 for the media player clip

function popupNoScroll(url,name,width,height,top,left) {
		if (! width) 	{ width=525; }
        if (! height) 	{ height=600; }
		if (! top) 		{ top=5; }
		if (! left) 	{ left=5; }
		popupWin = window.open(url, name, 'dependent,width='+width+',height='+height+',left='+left+',top='+top+'');
}

// end of addition by sravan kumar 12/18/2003

// added by sravan kumar 12/29/2003 for the Tracking of Promo code

function getCookie(NameOfCookie) {
	
	// First we check to see if there is a cookie stored.
	// Otherwise the length of document.cookie would be zero 
	
	if (document.cookie.length > 0) { 
	
	// Second we check to see if the cookie's name is stored in the
	// "document.cookie" object for the page.

	// Since more than one cookie can be set on a
	// single page it is possible that our cookie
	// is not present, even though the "document.cookie" object
	// is not just an empty text.
	// If our cookie name is not present the value -1 is stored
	// in the variable called "begin".

		begin = document.cookie.indexOf(NameOfCookie+"="); 
			if (begin != -1) { 
			
			// Our cookie was set. 
			// The value stored in the cookie is returned from the function.
			
				begin += NameOfCookie.length+1; 
				end = document.cookie.indexOf(";", begin);
				if (end == -1) end = document.cookie.length;
				return unescape(document.cookie.substring(begin, end)); 
			} 
	}
	return null; 
	
	// Our cookie was not set. 
	// The value "null" is returned from the function.
}



function setCookie(NameOfCookie, value, expiredays) { 

	// Three variables are used to set the new cookie. 
	// The name of the cookie, the value to be stored,
	// and finally the number of days until the cookie expires.
	// The first lines in the function convert 
	// the number of days to a valid date.

		var ExpireDate = new Date ();
		ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));
		
	// The next line stores the cookie, simply by assigning 
	// the values to the "document.cookie" object.
	// Note the date is converted to Greenwich Mean time using
	// the "toGMTstring()" function		
	
		document.cookie = NameOfCookie + "=" + escape(value) + 
				((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}

function delCookie (NameOfCookie) {

	// The function simply checks to see if the cookie is set.
	// If so, the expiration date is set to Jan. 1st 1970.

	if (getCookie(NameOfCookie)) {
		document.cookie = NameOfCookie + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}



function makenum() { 
	var randomnumber=0;
	randomnumber = Math.round(Math.random()*999999)
	strNum = new String(randomnumber);
	while(strNum.length < 6) {			
		strNum = strNum + Math.round(Math.random()*9);
	}
	
	return strNum;
}
// end of addition by sravan kumar 12/29/2003 for the Tracking of Promo code
// New code added for the MiniUSA test project by Dean Phillips

		expireDate1 = new Date
		expireDate1.setMonth(expireDate1.getMonth()+12)
		path = "/"

		state = ""
		if (document.cookie != "") {
		state = document.cookie.split("=")[1]
		}

		function setStateCookie() {
		state = document.stateForm.name
		document.cookie = "state=" +state+"; path=" +path+"; expires=" + expireDate1.toGMTString()
		}
		
		zipCode = ""
		if (document.cookie != "") {
		zipCode = document.cookie.split("=")[1]
		}

		function setZipCookie() {
		zipCode = document.zipForm.name
		document.cookie = "zipCode=" +zipCode+"; path=" +path+"; expires=" + expireDate1.toGMTString()
		}
		
		investments = ""
		if (document.cookie != "") {
		investments = document.cookie.split("=")[1]
		}

		function setInvestCookie() {
		investments = window.name
		document.cookie = "investments=" +investments+"; path=" +path+"; expires=" + expireDate1.toGMTString()
		}
		
		nucInvestments = ""
		if (document.cookie != "") {
		nucInvestments = document.cookie.split("=")[1]
		}

		function setNUCCookie(val) {
		var NUCInvURL = (val)
		nucInvestments = NUCInvURL
		document.cookie = "nucInvestments=" +nucInvestments+"; path=" +path+"; expires=" + expireDate1.toGMTString()
		}
//End of addition by Dean Phillips 03/10/2004

// Tooltip functions
var timerID = 0;
var currentTooltip = '';
var tooltipDelay = 1000; //the number of milliseconds before the active tooltip disappears when rolled out
function showTooltip(theTip,theLink) {
	if(currentTooltip != theTip && currentTooltip != ''){
		hideTooltip();
	}
	if(typeof(WebTracker) != "undefined"){
		var trackingName = theTip.substr(0,theTip.lastIndexOf('.'));
		WebTracker.send(trackingName,'click','display');
	}
	currentTooltip = theTip;
	document.getElementById(theTip).style.display = 'block';
	document.getElementById(theTip).style.left = document.getElementById(theLink).offsetLeft + document.getElementById(theLink).offsetWidth + 5 + "px";
	document.getElementById(theTip).style.top = document.getElementById(theLink).offsetTop - 0 + "px";
	if(timerID) {
      clearTimeout(timerID);
   	}
}
function tooltipTimer(){
	if(timerID) {
      clearTimeout(timerID);
   	}
	timerID  = setTimeout("hideTooltip()", tooltipDelay);
}
function hideTooltip() {
    if( ! currentTooltip )
        return;
	document.getElementById(currentTooltip).style.display = 'none';
	if(timerID) {
      clearTimeout(timerID);
      timerID  = 0;
   	}
}
function resetTooltipTimer(){
	if(timerID) {
      clearTimeout(timerID);
      timerID  = 0;
   	}
}

