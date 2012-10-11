//**************************************************
// uverse.js
// Author: Tong Lim
// Version: 1.3
// Date: 6/21/2008
// Update: 4/24/2009
//***************************************************

var version = navigator.appVersion;
var IE6 = (version.indexOf("MSIE 6.0") != -1) ? true : false;
var IE = (version.indexOf("MSIE") != -1) ? true : false;


function showPopup(divId,  blockBG, closeButton) {
	try {
		var messDivObj, buttonDivObj, v_Width, vButtonStr=null;
		if (divId != undefined) {
			messDivObj = commonFunc.getElementObj(divId);
			buttonDivObj = commonFunc.getElementObj(divId + "Button");
			if (buttonDivObj != null) vButtonStr = buttonDivObj.innerHTML;
			v_Width = messDivObj.style.width.substring(0, messDivObj.style.width.length - 2);
			showPopupByStr(messDivObj.innerHTML,  messDivObj.title, blockBG, closeButton, vButtonStr, v_Width);
		}
	} catch(e) {
		// do nothing
	}
} // end of showPopup

/*
function showFormPopup(title, pwidth, form_num, setSuccessURL) {
	if (form_num == "1") {
		form_num = "";
	}
	try {
		var overLayDiv_id;
		overLayDiv_id = commonFunc.overLayDiv(true);
		commonFunc.getElementObj("formPopUpTitle" + form_num).innerHTML = title;
		commonFunc.getElementObj("formPopupDiv" + form_num).style.width = pwidth + "px" ; 
		commonFunc.divPopUp('formPopupDiv' + form_num,true);
		
		//optional override of errorURL and successURL
		if (setSuccessURL != null) {
			var formInputs = document.getElementById('formPopupBody' + form_num).getElementsByTagName('form')[0].getElementsByTagName('input');
			var successHiddenInput = null;
			for (var i=0; i < formInputs.length; i++) {
				if (formInputs[i].name.indexOf('successURL') > 0) {
					successHiddenInput = formInputs[i];
					break;
				}
			}
			//var successURLVal = successHiddenInput.value;
			//alert('success hidden input before: ' + successURLVal);
			successHiddenInput.value = setSuccessURL;
			alert('in showFormPopup, set the successHiddenInput value to ' + setSuccessURL);
			//successURLVal = successHiddenInput.value;
			//alert('set it.  success hidden input after: ' + successURLVal);
		}
		
	} catch(e) {
		// do nothing
	}
} // end of showFormPopup
*/


function showPopupByStr(str, title, blockBG, closeButton, buttonStr, pWidth, pHeight, noIE6HideSelect, keepPopupInvisible) {
	try {
		var overLayDiv_id, popupDiv, id, v_width = "600px", v_height = '500px'; 
		if (pWidth != undefined && pWidth != null) v_width = pWidth + "px";
		if (pHeight != undefined && pHeight != null) v_height = pHeight + "px";
		
		if (blockBG) {
			overLayDiv_id = commonFunc.overLayDiv(true);
		}
		if (closeButton == true && keepPopupInvisible != true) {
			commonFunc.visibleElement("popCloseButton", true);
		} else {
			commonFunc.visibleElement("popCloseButton", false);
		}
		try {
			if (str != undefined) {
				commonFunc.getElementObj("mainPopUpTitle").innerHTML = title;
				commonFunc.getElementObj("mainPopupBody").innerHTML = str;
				popupDiv = commonFunc.getElementObj("mainPopupDiv");
				popupDiv.style.width = v_width;
				//popupDiv.style.height = v_height;			
			}
			if ((buttonStr != undefined) || (buttonStr != null)) {
				commonFunc.getElementObj("mainPopupButton").innerHTML  = buttonStr;
			}
			if (IE6 && (! noIE6HideSelect)) {
				hideSelectOption(true);
			}
			if (keepPopupInvisible != true) {
				commonFunc.divPopUp('mainPopupDiv',true);
			}
		} catch(e) {
			// If there was a problem accessing modal divs (because they have not loaded yet, for example),
			// clear the screen overlay so user will not be prevented from trying again.  Also, if in IE6,
			// un-hide any select boxes that *may* have been hidden (unless arg to function suppressed
			// that behavior), though it's unlikely that we got that far in the "try" block above.
			if (blockBG) {
				commonFunc.overLayDiv(false);
			}
			if (IE6 && (! noIE6HideSelect)) {
				hideSelectOption(false);
			}
		}
	  setModalFocus();		
	} catch(e) {
		// do nothing
	}
} // end of showPopupByStr

function showPopupByUrl(url,  title, blockBG, width, closeButton, noIE6HideSelect) {
	try {
		var strUrl = ShoppingCart.AjaxRequest(url);
		showPopupByStr(strUrl, title, blockBG, closeButton, null, null, null, noIE6HideSelect);
		if (width != undefined)
			commonFunc.getElementObj("mainPopupDiv").style.width = width + "px";
	} catch(e) {
		// do nothing
	}
} // end of showPopupByUrl

function addHiddenPopupByUrl(url,  title, blockBG, width, closeButton, noIE6HideSelect) {
	try {
		var strUrl = ShoppingCart.AjaxRequest(url);
		showPopupByStr(strUrl, title, blockBG, closeButton, null, null, null, noIE6HideSelect, true);
		if (width != undefined)
			commonFunc.getElementObj("mainPopupDiv").style.width = width + "px";
	} catch(e) {
		// do nothing
	}
} // end of addHiddenPopupByUrl


function showProgressPopupByStr(str, pWidth) {
	try {
		var overLayDiv_id, popupDiv, id, v_width = "600px"; 
		if (pWidth != undefined) v_width = pWidth + "px";
		
		overLayDiv_id = commonFunc.overLayDiv(true);
		
		if (str != undefined) {
			//commonFunc.getElementObj("progressPopupTitle").innerHTML = title;   // now defined by RB key in popupDivs.jsp
			commonFunc.getElementObj("progressPopupBody").innerHTML = str;
			popupDiv = commonFunc.getElementObj("progressPopupDiv");
			popupDiv.style.width = v_width;
			//popupDiv.style.height = v_height;			
		}

		commonFunc.divPopUp('progressPopupDiv',true);
		
	} catch(e) {
		// do nothing
	}
} // end of showPopupByStr


function showProgressPopupByUrl(url, width) {
	try {
		var strUrl = ShoppingCart.AjaxRequest(url);
		showProgressPopupByStr(strUrl, width);
	} catch(e) {
		// do nothing
	}
} // end of showProgressPopupByUrl

function closeProgressPopup(keepOverlay) {
	try {
		var mainPopupDiv = commonFunc.getElementObj("progressPopupDiv");
		if (keepOverlay != true) {
			overLayDiv_id = commonFunc.overLayDiv(false);
		}
		commonFunc.divPopUp('progressPopupDiv',false);
		commonFunc.getElementObj("progressPopupBody").innerHTML = " ";
	} catch(e) {
		// do nothing
	}
} // end of closeProgressPopup


/*
function closePopupNew(param) {
	var vName = 'mainPopupDiv';
	if (param == '2') vName = 'mainPopupDiv2';
	commonFunc.fadeOutThePopup(vName);
	setTimeout('closePopup2(' + param + ')', 800 );
}
*/

function closePopup(param) {
//function closePopup() {
	try {
		var mainPopupDiv = commonFunc.getElementObj("mainPopupDiv");
		if (param == undefined) {
			overLayDiv_id = commonFunc.overLayDiv(false);
			commonFunc.divPopUp('mainPopupDiv',false);
			commonFunc.getElementObj("mainPopupBody").innerHTML = " ";
			commonFunc.visibleElement("popCloseButton", false);
			commonFunc.getElementObj("mainPopupButton").innerHTML = " ";
			if (IE6) {
				if (mainPopupDiv.style.visibility == 'hidden') {
					hideSelectOption(false);
				}
			}
		}
		else if (param == '2') {
			//if (mainPopupDiv.style.visibility == 'hidden') {
				overLayDiv_id = commonFunc.overLayDiv(false);
			//} else {
			//	mainPopupDiv.style.zIndex = '100';
			//}
			commonFunc.divPopUp('mainPopupDiv2',false);
			commonFunc.getElementObj("mainPopupBody2").innerHTML = " ";
			//commonFunc.visibleElement("popCloseButton2", true);
			commonFunc.visibleElement("popCloseButton2", false);
			commonFunc.getElementObj("mainPopupButton2").innerHTML = " ";
			if (IE6) {
				if (mainPopupDiv2.style.visibility == 'hidden') {
					hideSelectOption(false);
				}
			}
		}
		
	} catch(e) {
		// do nothing
	}
} // end of closePopup


function showPopupIframe(url, title, pWidth, pHeight, scrollFlag, buttonUrl, closeFlag) {
	try {
		var url = url;
		var buttonUrl = buttonUrl;
		var vWidth = 745;
		var vHeight = 800;
		if (pWidth != undefined) vWidth = pWidth;
		if (pHeight != undefined) vHeight = pHeight;
		var scroll = "no";
		if (scrollFlag == true) {
			scroll = "auto";
		}
		if (closeFlag == undefined || closeFlag == null) {
			closeFlag = true;   // default is to show "close" button
		}
		
		var mainPopupBody2 = commonFunc.getElementObj('mainPopupBody2');
		mainPopupBody2.innerHTML = '<iframe src="' + url + '" name="ifm2" id="ifm2" frameborder="0" width="' + vWidth + '" height="' + vHeight + '" scrolling="' + scroll + '" style="z-index:110"></iframe>';
		
		if (buttonUrl != null && buttonUrl != "") {
			var strButtonUrl = ShoppingCart.AjaxRequest(buttonUrl);
			var mainPopupButton2 = commonFunc.getElementObj("mainPopupButton2");
			if (strButtonUrl != undefined) {
				mainPopupButton2.innerHTML = strButtonUrl;	
			}
			mainPopupBody2.style.margin = "10px 10px 0px 10px";
		}
		
		var mainPopupDiv2 = commonFunc.getElementObj('mainPopupDiv2');
		mainPopupDiv2.style.width = (vWidth + 45) + 'px';
		//mainPopupDiv2.style.height = (vHeight + vbHeight + 80) + 'px'; 
		commonFunc.getElementObj("mainPopUpTitle2").innerHTML = title;
		overLayDiv_id = commonFunc.overLayDiv(true);
		//commonFunc.visibleElement("popCloseButton2", true);
		commonFunc.visibleElement("popCloseButton2", closeFlag);
		
		if (IE6) {
			hideSelectOption(true);
		}

		commonFunc.divPopUp('mainPopupDiv2',true);
		setModalFocus();		
		//var mainPopupDiv = commonFunc.getElementObj("mainPopupDiv");
		//if (mainPopupDiv.style.visibility == 'visible') mainPopupDiv.style.zIndex = '';
		//if (IE6) hideSelectOption(true);
	} catch(e) {
		// do nothing
	}
}  // end of showPopupIframe


/*
function disableAllFormElement(status) {
	try {
		if (status != undefined) {
			array_obj = document.getElementsByTagName("input");
			for (i=0; i<array_obj.length; i++) {
				if ((array_obj[i].name != 'q') && (array_obj[i].type != 'hidden')) {
					if ((array_obj[i].type == 'text') || (array_obj[i].type == 'checkbox') || (array_obj[i].type == 'radio'))
						commonFunc.disableTextInput(array_obj[i], status);
				}
			}
			array_obj = document.getElementsByTagName("select");
			for (i=0; i<array_obj.length; i++) {
				array_obj[i].disabled = status;
			}
			array_obj = document.getElementsByTagName("textarea");
			for (i=0; i<array_obj.length; i++) {
				array_obj[i].disabled = status;
			}
		}
	} catch(e) {
		// do nothing
	}
} // end of disableAllFormElement
*/

function hideSelectOption(p) {
	try {
		// for IE6
		var version=navigator.appVersion;
		if (version.indexOf("MSIE 6.0") != -1){ 
			var select_array = document.getElementsByTagName("select");
			for (i=0; i<select_array.length; i++) {
				if (p) {
					commonFunc.visibleElement(select_array[i], false);
				} else {
					commonFunc.visibleElement(select_array[i], true);
				}
			}
		}
	} catch(e) {
		// do nothing
	}
}

//
// Hide just one select option, not all of them...pass in element ID
//
function hideOneSelectOption(el, p) {
	try {
		
		var element = document.getElementById(el);
		
		// for IE6
		var version=navigator.appVersion;
		if (version.indexOf("MSIE 6.0") != -1){ 
			if (p) {
				commonFunc.visibleElement(element, false);
			} else {
				commonFunc.visibleElement(element, true);
			}
		}
	} catch(e) {
		// do nothing
	}
}

function showProcessBar(param) {
	var v_status = true;
	if (param != undefined) v_status = false;
	commonFunc.overLayDiv(v_status);
	commonFunc.centerDiv("pleaseWaitPopupDiv");
	commonFunc.visibleElement("pleaseWaitPopupDiv", v_status);

	if (IE6) hideSelectOption(v_status);
	//if (IE) setTimeout("showAnimatedImageForIE(3)",300);
	if (IE) setTimeout("showAnimatedImageForIE()",300);
}



function showAnimatedImageForIE(p) { 
/*	if (p == 1)
		commonFunc.getElementObj("availabilityImage").src = v_mediaContextRoot + '/images/ani/ani_progress_Check-availability_AA0009X8.gif';
	if (p == 2)
		commonFunc.getElementObj("processImage").src = v_mediaContextRoot + '/images/ani/ani_progress_Checkout_AA0009Z5.gif';
	if (p == 3) */
		commonFunc.getElementObj("pleaseWaitImage").src = v_mediaContextRoot + '/progress/ani_progress_Checkout_201x14_CM000GPV.gif';
}	

/*
// added by darwin for cart and checkout js popups 8/21/08
function confirm_checkout_reset(p) {
	if (confirm(p)) {
		return true;
	} else {
		return false;
	}
}

function confirm_empty_cart(p) {
	if (confirm(p)) {
		return true;
	} else {
		return false;
	}
}

// this will display  progressesing bar for pages using iframes
function showOverLayCenterDiv() {
	commonFunc.overLayDiv(true);
	commonFunc.centerDiv("iframeprogressbar");
}
*/

// this will display availability progress for pages using iframes
function hideProcessBar() {
	commonFunc.overLayDiv(false);
	commonFunc.visibleElement("iframeprogressbar", false);
}


function showWinPopupCenter(pageURL, title,w,h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	var targetWin = window.open (pageURL, 'title', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function showWinPopupScroll(pageURL, title,w,h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	var targetWin = window.open (pageURL, 'title', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function format24TimeAs12(time) {
	var len = time.length;
	var hours = time.substring(0, len - 2);
	var minutes = time.substring((len - 2), len);
	var hoursAsNum = new Number(hours);
	var meridian = "am";
	if ((hoursAsNum.toString() == 0) || (hoursAsNum.toString() == 24)) {
		hours = 12;
		meridian = "am";
	} else if (hoursAsNum.toString() == 12) {
		meridian = "pm";
	} else if ((hoursAsNum.toString() > 12) && (hoursAsNum.toString() < 24)) {
		hours = hours - 12;
		meridian = "pm";
	} else {
		hours = hoursAsNum.toString();  //gets rid of leading zero, if there is one
		meridian="am";
	}
	var formattedTime = hours + ":" + minutes + meridian;
	return formattedTime;
}

function  setModalFocus(){
	var modal_objmain = commonFunc.getElementObj("modal-content");
	if(modal_objmain){   
		modal_objmain.focus();
	}
		var modal_objsub = commonFunc.getElementObj("modal-contentsub");
	if(modal_objsub){   
		modal_objsub.focus();
	}
}

