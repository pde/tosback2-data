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
var documentElement = (!document.documentElement || document.compatMode == "BackCompat") ? document.body : document.documentElement;
//var popUpDivName = new Array();


function showPopup(divId,  blockBG, closeButton) {
	try {
		var messDivObj, buttonDivObj, v_Width, vButtonStr=null;
		if (divId != undefined) {
			messDivObj = commonFunc.getElementObj(divId);
			buttonDivObj = commonFunc.getElementObj(divId + "Button");
			if (buttonDivObj != null) vButtonStr = buttonDivObj.innerHTML;
			if (!messDivObj.title) {
				if(messDivObj.childNodes[0].title == undefined) { 
				//do nothing
				} else if (messDivObj.childNodes[0].title == "") {
					//Firefox (B2C-105783)
					messDivObj.title = messDivObj.childNodes[2].title;
				} else {
					//Other browsers
					messDivObj.title = messDivObj.childNodes[0].title;
				};
			};
			v_Width = messDivObj.style.width.substring(0, messDivObj.style.width.length - 2);
			showPopupByStr(messDivObj.innerHTML,  messDivObj.title, blockBG, closeButton, vButtonStr, v_Width);
		}
	} catch(e) {
		// do nothing
	}
} // end of showPopup 

//Titan 5.1 code change start

function showPopupForTitanReferral(divId,  blockBG, closeButton, height) {
	try {
		var messDivObj, buttonDivObj, v_Width, vButtonStr=null;
		if (divId != undefined) {
			messDivObj = commonFunc.getElementObj(divId);
			buttonDivObj = commonFunc.getElementObj(divId + "Button");
			if (buttonDivObj != null) vButtonStr = buttonDivObj.innerHTML;
			if (!messDivObj.title) {
					if(messDivObj.childNodes[0].title == undefined) { 
					//do nothing
					} else {
						messDivObj.title = messDivObj.childNodes[0].title;
						};
				};
				
			v_Width = messDivObj.style.width.substring(0, messDivObj.style.width.length - 2);
			
			showPopupByStr(messDivObj.innerHTML,  messDivObj.title, blockBG, closeButton, vButtonStr, v_Width);
			var mainPopupBodyReferral = commonFunc.getElementObj('mainPopupBody');
			mainPopupBodyReferral.style.height = height + "px";			
		}
	} catch(e) {
		// do nothing
	}
} // end of showPopupForTitanReferral

//Titan 5.1 code change end

function showFormPopup(title, pwidth, closeButton, showSelect) {
	try {
		var overLayDiv_id;
		overLayDiv_id = commonFunc.overLayDiv(true);
		commonFunc.getElementObj("formPopUpTitle").innerHTML = title;
		//var popupDiv = commonFunc.getElementObj("formPopupDiv");
		//popupDiv.style.width = pwidth + "px";
		commonFunc.getElementObj("formPopupDiv").style.width = pwidth + "px" ;
		if (closeButton != undefined) {
			commonFunc.visibleElement("formPopupCloseButton", closeButton);
		}
		if (IE6) {
			hideSelectOption(true, showSelect);
		}
		commonFunc.divPopUp('formPopupDiv',true);
	} catch(e) {
		// do nothing
	}
} // end of showFormPopup

function showMsgModal(popupDivID,closeID,titleID,title, pwidth, closeButton, showSelect) {
	try {
		var overLayDiv_id;
		overLayDiv_id = commonFunc.overLayDiv(true);
		commonFunc.getElementObj(titleID).innerHTML = title;
		commonFunc.getElementObj(popupDivID).style.width = pwidth + "px" ;
		if (closeButton != undefined) {
			commonFunc.visibleElement(closeID, closeButton);
		}
		commonFunc.divPopUp(popupDivID,true);
	} catch(e) {
	
	}
}

function showPopupByStr(str,  title, blockBG, closeButton, buttonStr, pWidth, pHeight, pBorder, url) {
	try {
		var overLayDiv_id, popupDiv, popupBody, id, v_width = "700px", v_height = '500px'; 
		if ((pWidth != undefined) && (pWidth != '')) v_width = pWidth + "px";
		if ((pHeight != undefined) && (pHeight != '')) v_height = pHeight + "px";

		var v_mainPopupDivIDM = commonFunc.getElementObj('mainPopupDivIDM');
		if (v_mainPopupDivIDM.style.visibility != 'hidden') {
			v_mainPopupDivIDM.style.zIndex = '0';
		}
		var v_mainPopupDivIDM2 = commonFunc.getElementObj('mainPopupDivIDM2');
		if (v_mainPopupDivIDM2.style.visibility != 'hidden') {
			v_mainPopupDivIDM2.style.zIndex = '0';
		}
		
		if (blockBG) overLayDiv_id = commonFunc.overLayDiv(true); 
		if (closeButton != undefined) commonFunc.visibleElement("popCloseButton", closeButton);
		
		var v_mainPopupDiv2 = '';
		var v_mainPopupDivObj = commonFunc.getElementObj('mainPopupDiv');
		if (v_mainPopupDivObj.style.visibility != 'hidden') v_mainPopupDiv2 = '2';
		
		if (str != undefined) {
			commonFunc.getElementObj("mainPopUpTitle" + v_mainPopupDiv2).innerHTML = title;
			popupBody = commonFunc.getElementObj("mainPopupBody" + v_mainPopupDiv2)
			popupBody.style.height = '';
			
			str = getHiddenWebTrendEvents(str);
			//revert back fix #TITAN1202-70 for #ECOM1203-99, added try cath to fix PROD12-431
			try {
				firePopupWebTrendPageView(str, title, url);
			} catch(e) {
				// do nothing 
			}
			popupBody.innerHTML = str;
			popupDiv = commonFunc.getElementObj("mainPopupDiv" + v_mainPopupDiv2);
			popupDiv.style.width = v_width;
			//popupDiv.style.height = v_height;
			if (IE) {
				var iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
				var winH = parseInt(iebody.clientHeight);
			} else {
				var winH = parseInt(window.innerHeight);
			}
			divH = popupDiv.offsetHeight;
			if (divH > winH) popupBody.style.height = (winH - 300) + 'px'; 
		}
		if ((buttonStr != undefined) || (buttonStr != null)) {
			buttonStr = getHiddenWebTrendEvents(buttonStr);
			commonFunc.getElementObj("mainPopupButton" + v_mainPopupDiv2).innerHTML  = buttonStr;
		}
		if (IE6) {
			hideSelectOption(true);
		}
		if (v_mainPopupDiv2 == '2') v_mainPopupDivObj.style.zIndex = '45';
		commonFunc.divPopUp('mainPopupDiv' + v_mainPopupDiv2,true); 
		//popUpDivName[popUpDivName.length - 1] = 'mainPopupDiv';
		setTimeout(function(){captureWebTrendTags()}, 1000);
	} catch(e) {
		// do nothing
	}
} // end of showPopupByStr

function showPopupByUrl(url,  title, blockBG, width, height, pBorder) {
	try {
		var strUrl = ShoppingCart.AjaxRequest(url);
		if (pBorder) {
			showPopupByStr(strUrl,  title, blockBG, true, null, width, height, true, url);
		} else {
			showPopupByStr(strUrl,  title, blockBG, true, null, width, height, false, url);
		}
	} catch(e) {
		// do nothing
	}
} // end of showPopupByUrl

/*
function closePopupNew(param) {
	var vName = 'mainPopupDiv';
	if (param == '2') vName = 'mainPopupDiv2';
	commonFunc.fadeOutThePopup(vName);
	setTimeout('closePopup2(' + param + ')', 800 );
}*/

function savePopupBody(div, id) {
	var tempPopupBody = document.createElement('DIV');
	tempPopupBody.innerHTML = div.innerHTML;
	tempPopupBody.setAttribute('id', id);
	if (document.getElementById(id)) {
		document.getElementById(id) = tempPopupBody;
	} else {
		document.appendChild(tempPopupBody);
	}
}


function closePopup(param) {
	try {
		var mainPopupDiv = commonFunc.getElementObj("mainPopupDiv");
		var mainPopupDiv2 = commonFunc.getElementObj("mainPopupDiv2");
		if (mainPopupDiv2.style.visibility != 'hidden') param = '2';
		var v_mainPopupDivIDM = commonFunc.getElementObj('mainPopupDivIDM'); 
		if (param == undefined) {
			if ((commonFunc.getElementObj("mainPopupDivIDM").style.visibility == 'hidden') && (commonFunc.getElementObj("mainPopupDivIDM2").style.visibility == 'hidden'))
				overLayDiv_id = commonFunc.overLayDiv(false);
			commonFunc.divPopUp('mainPopupDiv',false);
			commonFunc.getElementObj("mainPopupBody").innerHTML = " ";
			commonFunc.visibleElement("popCloseButton", true);
			commonFunc.getElementObj("mainPopupButton").innerHTML = " ";
			
			if (v_mainPopupDivIDM.style.visibility != 'hidden') {
				v_mainPopupDivIDM.style.zIndex = '92';
			}
			var v_mainPopupDivIDM2 = commonFunc.getElementObj('mainPopupDivIDM2'); 
			if (v_mainPopupDivIDM2.style.visibility != 'hidden') {
				v_mainPopupDivIDM2.style.zIndex = '92';
			}
		}
		else if (param == '2') {
			if (mainPopupDiv.style.visibility == 'hidden' && v_mainPopupDivIDM.style.visibility == 'hidden') {
				overLayDiv_id = commonFunc.overLayDiv(false);
			} else {
				mainPopupDiv.style.zIndex = '100';
			}
			commonFunc.divPopUp('mainPopupDiv2',false);
			commonFunc.getElementObj("mainPopupBody2").innerHTML = " ";
			commonFunc.divPopUp('mainPopupDivChannelLineup',false);
			commonFunc.getElementObj("mainPopupBodyChannelLineup").innerHTML = " ";
			commonFunc.visibleElement("popCloseButton2", true);
			commonFunc.getElementObj("mainPopupButton2").innerHTML = " ";
		}
		if (IE6) {
			if (mainPopupDiv.style.visibility == 'hidden') {
				hideSelectOption(false);
			}
		}
	} catch(e) {
		// do nothing
	}
} // end of closePopup


function closeFormPopup() {
	overLayDiv_id = commonFunc.overLayDiv(false);
	commonFunc.divPopUp('formPopupDiv',false);
	hideSelectOption(false);
}
// close modal using ID
function closeModal(modalId) {
	overLayDiv_id = commonFunc.overLayDiv(false);
	commonFunc.divPopUp(modalId,false);
	hideSelectOption(false);
}

function showChannelLineUp() {
	try {
		var zip = gZip;
		var url = 'https://uma.att.com/uma/RetrieveChannelLineup?ZIP=' + zip + '&packgeList_select=0&channelList_select=&APPID=UMA&actionType=GETCHANNELSBYPACKAGE';
		var mainPopupBody = commonFunc.getElementObj('mainPopupBody');
		mainPopupBody.innerHTML = '<iframe src="' + url + '" id="ifm" frameborder="0" width="745" height="520" scrolling="no"></iframe>';
		var mainPopupDiv = commonFunc.getElementObj('mainPopupDiv');
		//mainPopupDiv.style.height = "600px";
		mainPopupDiv.style.width = "790px";
		commonFunc.getElementObj("mainPopUpTitle").innerHTML = "Channel Line-Up";
		overLayDiv_id = commonFunc.overLayDiv(true);
		commonFunc.divPopUp('mainPopupDiv',true);
	} catch(e) {
		// do nothing
	}
}  // end of showChannelLineUp


function showPopupByFullUrl(url,  title, pWidth, pHeight, scroll) {
	try {
		var url = url;
		var vWidth = 745;
		var vHeight = 520;
		var vScroll = 'no';
		if (pWidth != undefined) vWidth = pWidth;
		if (pHeight != undefined) vHeight = pHeight;
		if ((scroll != undefined) && (scroll == 'scroll')) vScroll = 'yes'
		var vIframeHeight = vHeight-40;
		var mainPopupBody = commonFunc.getElementObj('mainPopupBody2');
		if(vScroll=='yes'){
			mainPopupBody.innerHTML = '<iframe src="' + url + '" id="ifm2" frameborder="0" width="' + vWidth + '" height="' + vIframeHeight + '" style="z-index:110;overflow:scroll;"></iframe>';
		}else{
			mainPopupBody.innerHTML = '<iframe src="' + url + '" id="ifm2" scrolling="no" frameborder="0" width="' + vWidth + '" height="' + vIframeHeight + '" style="z-index:110;"></iframe>';
		}
		var mainPopupDiv = commonFunc.getElementObj('mainPopupDiv2');
		mainPopupDiv.style.width = (vWidth + 45) + 'px';
		mainPopupDiv.style.height = (vHeight + 80) + 'px'; 
		commonFunc.getElementObj("mainPopUpTitle2").innerHTML = title;
		firePopupWebTrendPageView('', title, url);
		overLayDiv_id = commonFunc.overLayDiv(true);
		commonFunc.divPopUp('mainPopupDiv2',true);
		var mainPopupDiv = commonFunc.getElementObj("mainPopupDiv");
		if (mainPopupDiv.style.visibility == 'visible') mainPopupDiv.style.zIndex = '';
		if (IE6) hideSelectOption(true);
	} catch(e) {
		// do nothing
	}
}  // end of showPopupByFullUrl

function showChannelLineupPopup(url,  title, pWidth, pHeight, scroll) {
	try {
		var url = url;
		var vWidth = 745;
		var vHeight = 520;
		var vScroll = 'no';
		if (pWidth != undefined) vWidth = pWidth;
		if (pHeight != undefined) vHeight =1000;
		if ((scroll != undefined) && (scroll == 'scroll')) vScroll = 'yes'
		var vIframeHeight = vHeight-40;
		var mainPopupBody = commonFunc.getElementObj('mainPopupBodyChannelLineup');
		if(vScroll=='yes'){
			mainPopupBody.innerHTML = '<iframe src="' + url + '" id="ifm2" frameborder="0" width="' + vWidth + '" height="' + vHeight + '" style="z-index:110;overflow:scroll;"></iframe>';
		}else{
			mainPopupBody.innerHTML = '<iframe src="' + url + '" id="ifm2" scrolling="no" frameborder="0" width="' + vWidth + '" height="' + vHeight + '" style="z-index:110;"></iframe>';
		}
		var mainPopupDiv = commonFunc.getElementObj('mainPopupDivChannelLineup');
		var left = (screen.width/2)-(vWidth/2);
		var top = (screen.height/2)-(vHeight/2);
		//mainPopupDiv.style.width = (vWidth + 45) + 'px';
		mainPopupDiv.style.width = (vWidth+5) + 'px';
		mainPopupDiv.style.height = (vHeight + 80) + 'px'; 
		mainPopupDiv.style.left = left-15+ 'px';
		commonFunc.getElementObj("mainPopupTitleChannelLineup").innerHTML = title;
		//firePopupWebTrendPageView('', title, url);
		overLayDiv_id = commonFunc.overLayDiv(true);
		commonFunc.visibleElement('mainPopupDivChannelLineup',true);
		var mainPopupDiv = commonFunc.getElementObj("mainPopupDiv");
		if (mainPopupDiv.style.visibility == 'visible') mainPopupDiv.style.zIndex = '';
		if (IE6) hideSelectOption(true);
	} catch(e) {
		// do nothing
	}
}  // end of showChannelLineupPopup

function getPopupC2C(newC2CDiv) {
	if (newC2CDiv) {
		var oldC2CDiv = parent.document.getElementById('click2chatButton');
		newC2CDiv.onclick = function () {oldC2CDiv.childNodes[0].childNodes[0].click()};
		newC2CDiv.innerHTML = oldC2CDiv.innerHTML;
		if (!~newC2CDiv.innerHTML.indexOf('img')) {
			//newC2CDiv.parentNode.parentNode.childNodes[0].style.display = 'none';
			//newC2CDiv.parentNode.parentNode.childNodes[1].style.paddingLeft='10px';
		} else {
			newC2CDiv.parentNode.style.display = 'block';
			newC2CDiv.parentNode.parentNode.childNodes[1].style.paddingLeft='20px';
		}
	}
}

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


function hideSelectOption(p, p2) {
	try { 
		// for IE6
		var version=navigator.appVersion;
		if (version.indexOf("MSIE 6.0") != -1){ 
			var select_array = document.getElementsByTagName("select");
			for (i=0; i<select_array.length; i++) {
				if (p) { 
					if (p2 == undefined) { 
						commonFunc.visibleElement(select_array[i], false);	
					} else { 
						if (select_array[i].id != p2) {
							commonFunc.visibleElement(select_array[i], false);	
						}
					}
					
				} else {
					commonFunc.visibleElement(select_array[i], true);
				}
			}
		}
	} catch(e) {
		// do nothing
	}
}


function showProcessBar(param) {
	var v_status = true;
	if (param != undefined) v_status = false;
	var v_mainPopupDivIDM = commonFunc.getElementObj('mainPopupDivIDM');
	var v_mainPopupDivIDM2 = commonFunc.getElementObj('mainPopupDivIDM2');
	if (v_mainPopupDivIDM.style.visibility == 'hidden') {
		commonFunc.overLayDiv(v_status);
	}

	if (v_mainPopupDivIDM.style.visibility != 'hidden') {
		if (v_status) v_mainPopupDivIDM.style.zIndex = '0';
		else v_mainPopupDivIDM.style.zIndex = '92';
	}
	if (v_mainPopupDivIDM2.style.visibility != 'hidden') {
		if (v_status) v_mainPopupDivIDM2.style.zIndex = '0';
		else v_mainPopupDivIDM2.style.zIndex = '92';
	}

	commonFunc.centerDiv("checkoutprogressbar");
	commonFunc.visibleElement("checkoutprogressbar", v_status);

	if (IE6) hideSelectOption(v_status);
	if (IE) setTimeout("showAnimatedImageForIE(2)",300);
}

function showAnimatedImageForIE(p) { 
	if (p == 1)
		commonFunc.getElementObj("availabilityImage").src = v_mediaContextRoot + '/images/ani/ani_progress_Check-availability_AA0009X8.gif';
	if (p == 2)
		commonFunc.getElementObj("processImage").src = v_mediaContextRoot + '/images/ani/ani_progress_Checkout_AA0009Z5.gif';
}	


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
// this will display availability progress for pages using iframes
function hideProcessBar() {
	commonFunc.overLayDiv(false);
	commonFunc.visibleElement("iframeprogressbar", false);
}


function showWinPopupCenter(pageURL, title,w,h,scroll) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	var vScroll = 'no';
	if ((scroll == true) && (scroll != undefined)) vScroll = 'yes';
	var targetWin = window.open (pageURL, 'title', 'toolbar=no, location=no, directories=no, status=no, menubar='+vScroll+', scrollbars='+vScroll+', resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function showIDMPopupByStr(str, divType, title, blockBG, pWidth, pHeight) {
	try {
		var overLayDiv_id, popupDiv, id, v_width = "934px", v_height = "519px"; 
		if (pWidth != undefined) v_width = pWidth + "px";
		if (pHeight != undefined) v_height = pHeight + "px";
		if (blockBG) overLayDiv_id = commonFunc.overLayDiv(true);
		if (str != undefined) {
			if (divType == 'cn') {
				commonFunc.getElementObj("mainPopUpTitleIDM2").innerHTML = title; 
				commonFunc.getElementObj('mainPopupBodyIDM2').innerHTML = str;
				popupDiv = commonFunc.getElementObj("mainPopupDivIDM2");
				commonFunc.divPopUp('mainPopupDivIDM2',true);
			} else {
				commonFunc.getElementObj("mainPopUpTitleIDM").innerHTML = title; 
				commonFunc.getElementObj('mainPopupBodyIDM').innerHTML = str;
				popupDiv = commonFunc.getElementObj("mainPopupDivIDM");
				//popupDiv.style.width = v_width;
				commonFunc.divPopUp('mainPopupDivIDM',true);
			}
		}
		if (IE6) commonFunc.visibleElement("saving-selection-dropdown", false);
	} catch(e) {
		// do nothing
	}
} // end of showIDMPopupByStr

function closeIDMPopup(param) {
	try {
		var mainPopupDiv = commonFunc.getElementObj("mainPopupDivIDM");
		var mainPopupDiv2 = commonFunc.getElementObj("mainPopupDivIDM2");
		if (IE6) commonFunc.visibleElement("saving-selection-dropdown", true);
		if (param == undefined) {
			overLayDiv_id = commonFunc.overLayDiv(false);
			if (mainPopupDiv.style.visibility != 'hidden') {
				commonFunc.divPopUp('mainPopupDivIDM',false);
				commonFunc.getElementObj("mainPopupBodyIDM").innerHTML = " ";
				var mainPopupDetailsIDM_obj = commonFunc.getElementObj("mainPopupDetailsIDM"); if (mainPopupDetailsIDM_obj != null) mainPopupDetailsIDM_obj.innerHTML = " ";
				mainPopupDiv.style.zIndex = '92';
				togglePhoneLineTwo.index2 = null;
			}
			if (mainPopupDiv2.style.visibility != 'hidden') {
				commonFunc.divPopUp('mainPopupDivIDM2',false);
				commonFunc.getElementObj("mainPopupBodyIDM2").innerHTML = " ";
				mainPopupDiv.style.zIndex = '92';
			}
		}
		
		if (IE6) {
			if (mainPopupDiv.style.visibility == 'hidden') {
				hideSelectOption(false);
			}
		}
	} catch(e) {
		// do nothing
	}
} // end of closeIDMPopup

function cancelModal(serv, step, redir) {
	serv = serv||showModal.curServ;
	step = step||showModal.curSetep;	
	window.location.virtual = '';
	if (Modal && Modal[serv]) {
		Modal[serv].revert();
		if (Modal[serv].saved == 'reset') Modal[serv].saved = '';
	}
	closeIDMPopup();
	setTimeOutPopup();
	setTimeOutWarning();
	if (~location.href.indexOf('/u-verse/cart/port-in-retrieve-cart.jsp')) {
		location.href = '/u-verse/shop/customize.jsp';
	}
	if (redir) {
		location.replace(redir);
	}
}

function resetModal(serv) {
	if (Modal && Modal[serv]) {
		Modal[serv].saved = 'reset';
		Modal[serv].finished = [];
	}
}

function showModal(serv, step, mode) {
	serv = showModal.curServ = (serv||showModal.curServ||'iptv');
	step = showModal.curStep = (step == -2 ? (showModal.curStep||0) +1 : (step == -1 ? (showModal.curStep||2) -1 : (step||1)));	
	if (!showModal.curStep) cancelModal(serv, step);
	
	service = [];
	service['iptv'] = ['', 'iptvPackages', 'iptvHdOptions', 'iptvReceivers'];
	service['hsia'] = ['', 'hsiaSelectInternetSpeed'];
	service['voip'] = ['', 'voipSelectPhoneLines', 'voipVoicePlan', 'voipDirectoryListing'];
	service['equipmentInstall'] = ['', 'equipmentOnly', 'installOnly'];
	service['equipmentOnly'] = ['', 'equipmentOnly'];
	service['installOnly'] = ['', 'installOnly'];
	
	for (var i=1; i < service[serv].length; ++i) {
		commonFunc.displayElement(service[serv][i], i == step ? true : false);
	}
	
	showModalHeader(serv);
	showModalFooter(serv, step);
	showModalButton(1, mode, serv);

	if (Modal) {
		var div = '';
		Modal.Details.init(serv);
		switch (serv) {
			case ('iptv') : 
				Modal[serv].requires = ['iptvPackage', 'Receivers'];
				//only step 3 is required in IPTV modal now
				Modal[serv].finished[0] = Modal[serv].finished[1] = true;
				break;
			case ('hsia') : 
				Modal[serv].requires = ['hsiaSelectInternetSpeed'];
				break;
			case ('voip') : 
				Modal[serv].requires = ['phoneLine1', 'voipPLine', 'voipDirectoryListingprimary'];
				break;
			case ('equipmentInstall') : case ('equipmentOnly') : case ('installOnly') : 
				div = serv;
				enableUpdateButton(serv);
				break;
		}
		
		//length of this array should be at least maximum number of steps in modals
		if (mode == 'e' || mode == 'edit') Modal[serv].finished = [true, true, true];
		else Modal[serv].finished[step-1] = true;
		
		Modal.Details(serv, div);
		if (mode == 'd' && !Modal[serv].saved) Modal[serv].saved = 'reset';
	}

    if (webTrendTag) {
        webTrendTag('Uverse_Spoke_'+serv+'_Step'+step+'_ConfigPg', 0, 'System', 'dcsuri', '/myuverse/virtual/iptvconfigstep'+step+'.jsp', 'wtBuyFlowType', 'PROVIDE', 'flowtype', 'UVERSE');
    }
}

function showModalHeader(serv, step) {
	var block;
	if (block = document.getElementsByClassName('modal header-iptv')[0])
		block.style.display = serv == 'iptv' ? 'block' : 'none';
	if (block = document.getElementsByClassName('modal header-hsia')[0])
		block.style.display = serv == 'hsia' ? 'block' : 'none';
	if (block = document.getElementsByClassName('modal header-voip')[0])
		block.style.display = serv == 'voip' ? 'block' : 'none';
}

function showModalFooter(serv, step) {
	var buttons = [
		document.getElementById('modalFooterCancel'),
		document.getElementById('modalFooterNext'),
		document.getElementById('modalFooterBack'),
		document.getElementById('modalFooterSave')

	];

	if (serv == 'equipmentInstall' || serv == 'equipmentOnly' || serv == 'installOnly') {
		commonFunc.displayElement('modalFooterNext2', service[serv][step+1] ? true : false);
		commonFunc.displayElement('modalFooterBack2', service[serv][step-1] ? true : (service[serv][step+1] ? true : false));
	}
	else {
		commonFunc.displayElement('modalFooterNext', service[serv][step+1] ? true : false);
		commonFunc.displayElement('modalFooterBack', service[serv][step-1] ? true : false);
	}
}

function showModalButton(able, mode, serv) {
	var stndMode = ['addToCartDis','addToCartEna','addToCartDis'];
	var editMode = ['updateCartDis','updateCartEna','returnToCartEna'];

	if (!mode) mode = showModalButton.mode;
	else showModalButton.mode = mode;
	
	if (mode == 'e' || mode == 'edit') button = editMode;
	else button = stndMode;
	
	var en = 1, dis = 0;
	for (var i=0; i < stndMode.length; ++i) commonFunc.displayElement(stndMode[i], !!(dis*able));
	for (var i=0; i < editMode.length; ++i) commonFunc.displayElement(editMode[i], !!(dis*able));
	commonFunc.displayElement(button[dis+able], !!(en+able));

	//special cases below -- should rework logic to allow for these situations
	if (showModal.curServ == 'equipmentInstall' && showModal.curStep == 1) {
		//no "return to cart" button for first step of equipmentInstall modal
		commonFunc.displayElement(button[dis+able], !(en+able));
	}
	else if ($('updateSummaryEna')) {
		//need "update summary" button for equipmentOnly modal on summary page
		for (var i=0; i < button.length; ++i) commonFunc.displayElement(button[i].replace('Cart','Summary'), !!(dis*able));
		if (showModal.curServ == 'equipmentOnly') {
			commonFunc.displayElement(button[dis+able], !(en+able));
			commonFunc.displayElement(button[dis+able].replace('Cart','Summary'), !!(en+able));
		}
	}
}

function openClose(id) {
	var table = document.getElementById(id);
	var tag = document.getElementById('openOut');
	if(table.style.display == 'block')
		(table.style.display = 'none') && (tag.style.listStyleImage = 'url(/images/Wireless/GlobalAssets/Buttons-Icons/English/btn_toggle_plus_AA000ENF.png)');
	else
		(table.style.display = 'block') && (tag.style.listStyleImage = 'url(/images/Wireless/GlobalAssets/Buttons-Icons/English/btn_toggle_minus_AA000ENE.png)');
}

function getTooltips() {
	var titled = commonFunc.getElementsByClassName('tooltip');
	for (var i=0; i < titled.length; ++i) {
		var popup = document.getElementById(titled[i].className.match(/\btooltip\s*(.*)(\s|$)/)[1]);
		if (!popup) continue;
			popup.style.position = 'absolute';
			popup.style.visibility = 'hidden';
			popup.style.display = 'inline-block';
			if (location.pathname == '/u-verse/availability/' || location.pathname == '/u-verse/availability/index.jsp' && navigator.appName != 'Microsoft Internet Explorer') {
				popup.style.width = '250px';
			} else {
				popup.style.width = '20em';
			}
		var paragraph = popup.getElementsByTagName('P')[0];
		if (!paragraph) continue;
		var text = titled[i].alt || titled[i].title || paragraph.innerHTML;
			paragraph.innerHTML = text;
			paragraph.style.width = paragraph.style.height = '';
		//rough width to height ratio here can be changed, ie. 4 : 3
		if (location.pathname == '/u-verse/availability/' || location.pathname == '/u-verse/availability/index.jsp' && navigator.appName != 'Microsoft Internet Explorer') {
			var width = 250;
		} else {
			var	width = parseInt(Math.sqrt(popup.scrollWidth * popup.scrollHeight) * 4 / 3);
		}
		var	height = parseInt((popup.style.width = width, paragraph.offsetHeight));
			popup.style.display = 'none';
			popup.style.visibility = 'visible';
			
		titled[i].onmouseover = titled[i].onmouseenter = (function (popup, paragraph, text, width, height) {
			return function (event) {
				showTitle(event, popup, paragraph, text, width, height);
			};
		})(popup, paragraph, text, width, height);
		
		titled[i].onmouseout = (function (popup, paragraph, text, width, height) {
			return function (event) {
				hideTitle(event, popup, paragraph, text, width, height);
			};
		})(popup, paragraph, text, width, height);
	}
}

function showTitle(event, popup, paragraph, text, width, height) {
	// calling showTitle onmousemove directly is deprecated, please use class="tooltip" and title="<text>"
	if (!event) event = window.event;
	if (!event.srcElement) event.srcElement = event.target;
	event.srcElement.alt = event.srcElement.title = '';
	event.srcElement.parentNode.alt = event.srcElement.parentNode.title = '';
	hideTitle.titleText = text;

	popup = $(popup);
	paragraph = $(paragraph);
	if (!width) width = popup.scrollWidth > 1 ? popup.scrollWidth : 162;
	if (!height) height = popup.scrollHeight > 1 ? popup.scrollHeight : 62;
	if (paragraph && text) paragraph.innerHTML = text;
	popup.style.width = width;
	popup.style.display = 'inline-block';

	//get page width to support all browsers
	var pageWidth = 0, pageHeight = 0;
	if(typeof(window.innerWidth) == 'number') {
		//Non-IE
		pageWidth = window.innerWidth - 17;
		pageHeight = window.innerHeight;
	} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		//IE 6+ in 'standards compliant mode'
		pageWidth = document.documentElement.clientWidth - 7;
		pageHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    myWidth = document.body.clientWidth - 7;
	    myHeight = document.body.clientHeight;
	}

	//get scrollTop and scrollLeft
	var scrollL = 0, scrollT = 0;
	if(typeof(window.pageYOffset) == 'number') {
	    //Netscape compliant
		scrollT = window.pageYOffset;
		scrollL = window.pageXOffset;
	} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
	    //DOM compliant
		scrollT = document.body.scrollTop;
		scrollL = document.body.scrollLeft;
	} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
	    //IE6 standards compliant mode
		scrollT = document.documentElement.scrollTop;
		scrollL = document.documentElement.scrollLeft;
	}

	//set absolute position
	var posX = 0, posY = 0, tempWidth = 0, subtractFromY = 0;
	//check pageWidth against main content width and set accordingly
	if (pageWidth > 960) {
		tempWidth = pageWidth - 960;
	} else {
		tempWidth = pageWidth;
	}
	//check if on /u-verse/availability/
	if (location.pathname == '/u-verse/availability/' || location.pathname == '/u-verse/availability/index.jsp' && navigator.appName != 'Microsoft Internet Explorer') {
		subtractFromY = 265;
	} else {
		subtractFromY = 180;
	}
	//set posX
	if (event.pageX == undefined) {
		posX = event.clientX - (tempWidth / 2) + 5;
	} else {
		posX = event.pageX - (tempWidth / 2) + 5;
	}
	//set posY
	if (event.pageY == undefined) {
		posY = event.clientY + scrollT - subtractFromY;
	} else {
		posY = event.pageY - subtractFromY;
	}

	var scrollW = pageWidth + scrollL - popup.offsetParent.offsetLeft;
	var scrollH = scrollT - popup.offsetParent.offsetTop;

	var mirror = posX + width > scrollW;
	if (mirror) posX -= width;

	var flip = posY + height > scrollH;
	if (flip) posY -= height + 4;

	popup.style.left = posX + 'px';
	popup.style.top = posY + 'px';

	if (~popup.className.indexOf('rounded')) roundedCorners.addDialogArrow(popup, mirror, flip);
}

function hideTitle(event, popup, paragraph, text, width, height) {
	// calling showTitle onmouseout directly is deprecated, please use class="tooltip" and title="<text>"
	if (!event) event = window.event;
	if (!event.srcElement) event.srcElement = event.target;
	if (event.srcElement.nodeType == 3) event.srcElement = event.srcElement.parentNode;
	event.srcElement.alt = event.srcElement.title = text || hideTitle.titleText;
	popup = $(popup);
	popup.style.display = 'none';
}

function roundedCorners(div) {
	if (div) div.className += ' rounded';
	var rounding = commonFunc.getElementsByClassName('rounded');
	for (var i=0; i < rounding.length; ++i) {
		for (var j=0; rounding[i].childNodes[j].nodeType == 3; ++j);
		if (rounding[i].childNodes[j].tagName == 'S' || rounding[i].childNodes[j].tagName == 'B') continue;
		if (rounding[i].childNodes[j].tagName != 'P') rounding[i].innerHTML = '<P>' + rounding[i].innerHTML + '</P>';
		rounding[i].childNodes[j].style.paddingLeft = rounding[i].childNodes[j].style.paddingRight = '10px';
		rounding[i].childNodes[j].style.width = parseInt(rounding[i].style.width || rounding[i].offsetWidth) -22 + 'px';
		rounding[i].innerHTML = ' \
			<s><s><b><b><u></u></b></b></s></s> \
			<s><b><b><b>       </b></b></b></s> \
			<b><b><b>              </b></b></b> \
			<b><b>                     </b></b> \
			' +   rounding[i].innerHTML     + ' \
			<b><b>                     </b></b> \
			<b><b><b>              </b></b></b> \
			<s><b><b><b>       </b></b></b></s> \
			<s><s><b><b><u></u></b></b></s></s> \
		';
	}
}

roundedCorners.addDialogArrow = function (box, mirror, flip) {
	if (box.position == [box.offsetWidth, box.offsetHeight, mirror, flip].toString()) return;
	box.position = [box.offsetWidth, box.offsetHeight, mirror, flip].toString();

	if (box.dialogArrow) box.removeChild(box.dialogArrow);
	var dialogArrow = document.createElement('DIV');
	box.style.marginTop = flip ? '-20px' : '+0px';
	box.style.marginLeft = mirror ? '+10px' : '-15px';
	dialogArrow.style.position = 'relative';
	dialogArrow.style.marginLeft = (mirror ? box.scrollWidth -40 : 20) + 'px';
	dialogArrow.style.marginTop = dialogArrow.style.marginBottom = -1 + 'px';

	for (var h=20, i=0; i <= h; ++i) {
		var width = flip ? h - i : 0 + i;
		var margin = mirror ? h - 2*width : 0 + width;
		var feather = document.createElement('P');
		feather.appendChild(document.createElement('S'));
		feather.style.width = width + 'px';
		feather.style.height = '1px';
		feather.style.marginLeft = margin + 'px';
		feather.style.borderLeft = mirror ? '2px solid #666666' : '1px solid #666666';
		feather.style.borderRight = mirror ? '1px solid #666666' : '2px solid #666666';
		feather.style.overflowX = 'hidden';
		dialogArrow.appendChild(feather);
	}

	flip ? box.appendChild(dialogArrow) : box.insertBefore(dialogArrow, box.firstChild);
	box.dialogArrow = dialogArrow;
}

function getDefaultText() {
	var defaulted = commonFunc.getElementsByClassName('defaultText');
	for (var i=0; i < defaulted.length; ++i) {
		var defaultText = defaulted[i].title;
		defaulted[i].childNodes[0].onfocus = (function (defaultText) {
			return function () {
				if (this.value==defaultText) this.value = ''};
		})(defaultText);
		defaulted[i].childNodes[0].onblur = (function (defaultText) {
			return function () {
				if (this.value=='') this.value = defaultText};
		})(defaultText);
		defaulted[i].childNodes[0].onblur();
	}
}

function printChannels(){
	var iframeHandle = document.frames ? document.frames['ifm2'] : document.getElementById('ifm2');
	var iframeDocument;
	if(iframeHandle.contentDocument){
		iframeDocument=iframeHandle.contentDocument;
	}else if(iframeHandle.contentWindow){
		iframeDocument=iframeHandle.contentWindow.document;
	}else if(iframeHandle.document){
		iframeDocument=iframeHandle.document;
	}
	innerIframeHandle = iframeDocument.getElementById('ifm');
	printWindowUrl = innerIframeHandle.src+'&printClu=yes';
	window.open(printWindowUrl, '');
		
}
//method for printing the package channels in a new window
var printPackageChannels = function(){
	var printHtml ='<HTML>\n<HEAD>';
	var headTags = document.getElementsByTagName("head");
	printHtml +='<div id="mainPopupDiv">';
	//applying the parent window styles 
	var jStyleDiv = jQuery( "<div>" ).append(
					jQuery( "link" ).clone());
	printHtml+=jStyleDiv.html();
	//CSS to hide the print button, close button and scroll bars
	printHtml+="<style>\n\n#packageChannelList{overflow: visible !important;height: auto !important;}\n #popCloseButton,#printIcon{display:none}\n #mainPopupBody{height:auto}\n</style>";
	
	printHtml += '\n</HEAD>\n<BODY>\n';  
	var popupContent = commonFunc.getElementObj("mainPopupDiv");
	
	printHtml +=jQuery(popupContent).clone().html();
	printHtml +='</div>';
	printHtml+='\n</BODY>\n</HTML>';
	var printWindow = window.open('Print Package Channels', '');
	printWindow.document.open();
	printWindow.document.write(printHtml);
	printWindow.document.close();
	printWindow.print();
};


commonFunc.addOnload("roundedCorners();");
commonFunc.addOnload("getTooltips();");
commonFunc.addOnload("getDefaultText();");

function showIPTVOffer(param) {
	commonFunc.displayElement('iptvPremiumOffers', false);
	commonFunc.displayElement('iptvInternationalOffers', false);
	commonFunc.displayElement(param, true); 
}