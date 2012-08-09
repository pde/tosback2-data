
//
// If key pressed was "enter", call function to perform service qual (equivalent of "submitting the form").
// If some other key was pressed call commonFunc.autoTab to tab forward to next input if current input has been filled.
//
	function validateAndSubmit()
	{	
			var tnForm = $('tnForm');
			var userOptionChosenFlag = false;
			var errorMap = new Object();
			var userOptionTypeDiv1 = $('user_option1_div');
			var userOptionTypeDiv2 = $('user_option2_div');
			//var serviceTypeDiv = $('service_type_div_radio_buttons');
			
			clearErrorMessagesTN();		
			lastErrorType='';
			
			userOptionTypeDiv1.className ="";
			userOptionTypeDiv2.className ="";
			
			for (var r=0; r < tnForm.user_option.length; r++) {
				if (tnForm.user_option[r].checked) {
					userOptionChosenFlag = true;
					break;
				}
			}
			
			if (!userOptionChosenFlag) {
				userOptionTypeDiv1.addClassName('focusInputRadio');
				userOptionTypeDiv2.addClassName('focusInputRadio');
				errorMap.err7="Please choose phone or address validation";
			} 	
			
			var errCount = 0;
			for (k in errorMap) {
				if (errorMap.hasOwnProperty(k)) errCount++;
			}
			if (errCount > 0) {
				displayErrorMessages1(errorMap);
				lastErrorType = 'newAddress';		
				// Re-center the modal
				commonFunc.centerDiv("mainPopupDiv");		
				return false;		
			} else {				
				if(document.tnForm.user_option[0].checked == true)
				{
					addsubmitFormWT(((flowType != null && flowType == 'shared') ? 'DSL_Shared_Qual_TN_Check_Avail_Submit' : 'DSL_Upgrade_Qual_Check_Avail_Submit'),'1');
					doServiceQualificationTN();
				}
				else
				{
					addsubmitFormWT('DSL_Direct_Address_Qual_Check_Avail_Submit','1');
					doServiceQualificationByAddress('NORMAL', '${v_multiTitle}', '${v_rangedTitle}');
				}
				return true;
			}
	}

function keyUpOnTN(textbox, e) {
		
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;
	
	if (keycode == 13) {
		doServiceQualificationTN();
	    return false;
	} else {
			
		var textboxId = textbox.id;
	
		if (textboxId == 'phoneAreaCode') {
			commonFunc.autoTab(textbox,'phoneMiddle3', e)
		} else if (textboxId == 'phoneMiddle3') {
			commonFunc.autoTab(textbox,'phoneLast4', e)
		} else if (textboxId == 'phoneLast4') {
			commonFunc.autoTab(textbox,'btn_check_modal_button', e)
		}
		return true;
	}
}

function onlyNumbers(evt) {
	var e = evt
	if(window.event){ // IE
		var charCode = e.keyCode;
	} else if (e.which) { // Safari 4, Firefox 3.0.4
		var charCode = e.which
	}
	if (charCode > 31 && (charCode < 48 || charCode > 57))
	return false;
	return true;
}

function focusOnAreaCode() {
	try {
		document.getElementById("phoneAreaCode").focus();
	} catch(e) {
		// do nothing
	}
}

function testErrorMessagesTestTN(){
	var nameArray = new Array("1109","1110","1111");
	DWRRequestManager.getErrorMessagesByCodes(nameArray,displayErrorMessages1);
}

function clearErrorMessagesTN(){

	//alert('now in clearErrorMessages1');
	
	var errorMsgsList = commonFunc.getElementObj("errorMsgsList");
	var errorsArray = $$('.focusInput');
    // remove all child nodes - shouldn't be any, but do it just in case
	while(errorMsgsList.hasChildNodes()){
		errorMsgsList.removeChild(errorMsgsList.lastChild);
	}
	
	commonFunc.displayElement("error_div", false);
	for(var i=0; i < errorsArray.length; i++) {
		errorsArray[i].removeClassName('focusInput');
		errorsArray[i].removeClassName('padLeft');
	}
}


function displayErrorMessagesTN(data){

	//alert('now in displayErrorMessagesTN');

	var errorMsgsList = commonFunc.getElementObj("errorMsgsList");

    // remove all child nodes - shouldn't be any, but do it just in case
	while(errorMsgsList.hasChildNodes()){
		errorMsgsList.removeChild(errorMsgsList.lastChild);
	}
	
	var key = new String("");
	for(key in data)
	{	
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(data[key]));
		errorMsgsList.appendChild(li);
	} 

	commonFunc.displayElement("error_div", true);

}


var planIdForQual = '';
function setPlanIdForQual(plan) {
	planIdForQual = plan;
}

var flowType = 'shared';   // default to shared (non-existing) flow
function setModalFlowType(flow) {
	if (flow == null || flow == '') {
		flow = 'shared';
	}
	flowType = flow;
}


var phoneFormInputsObj = new Object();

function doServiceQualificationTN(){	
	//
	// Clear any error messages so we're starting with a clean slate
	//
	clearErrorMessagesTN();
	
	var phoneAreaCode = commonFunc.Trim(document.getElementById('phoneAreaCode').value);
	var phoneMiddle3 = commonFunc.Trim(document.getElementById('phoneMiddle3').value);
	var phoneLast4 = commonFunc.Trim(document.getElementById('phoneLast4').value);
	
	phoneFormInputsObj.phoneNumber = phoneAreaCode + phoneMiddle3 + phoneLast4;
		
	//
	// If qual is for a specific plan ID, add attribute to phoneFormInputsObj...
	//
	if (planIdForQual != null && planIdForQual != '') {
		phoneFormInputsObj.prospectPlanId = planIdForQual;
		phoneFormInputsObj.successUrl = "/dsl/shop/plandetails.jsp?q_repId=" + planIdForQual;
	}
	
	phoneFormInputsObj.flowType = flowType;
	
			
	var success = validateInputsTN();
	if (success) {
		//alert('TODO: display "now loading DSL plans" modal');
		
		commonFunc.divPopUp("mainPopupDiv", false);
		commonFunc.visibleElement("popCloseButton", false);

		showProgressPopupByUrl('/dsl/modals/loadingPlansProgress.jsp', 450);		
		DWRRequestManager.getServiceQualificationEligibilityByPhone(phoneFormInputsObj, serviceQualTN);
	}
		
}

var areaCodeObjOrigClass = "";
var middle3ObjOrigClass = "";
var last4ObjOrigClass = "";

function getInitialBTNInputClasses() {
	try{
		areaCodeObjOrigClass = document.getElementById('phoneAreaCode').className;
		middle3ObjOrigClass = document.getElementById('phoneMiddle3').className;
		last4ObjOrigClass = document.getElementById('phoneLast4').className;
	}catch(e){
		//error caught
	}
}
commonFunc.addOnload("getInitialBTNInputClasses();");

function validateInputsTN(item) {
	
	//
	// Currently only checking for missing required values here on client side
	//
		
	var areaCodeObj = document.getElementById('phoneAreaCode');
	var middle3Obj = document.getElementById('phoneMiddle3');
	var last4Obj = document.getElementById('phoneLast4');
	var phoneWrapperObj = commonFunc.getElementObj('phone_div');
	
		
	var area = commonFunc.Trim(areaCodeObj.value);
	var mid = commonFunc.Trim(middle3Obj.value);
	var last = commonFunc.Trim(last4Obj.value);
	
	//alert('checking for validation errors');
		
	var errorMap = new Object();
	
	if ( (area == null || area.length < 3) || 
	     (mid == null || mid.length < 3) ||
	     (last == null || last.length < 4))
	{
		phoneWrapperObj.className = "focusInput padLeft";
		
		var errorCodeArray = new Array("DS10008");
		DWRRequestManager.getErrorMessagesByCodes(errorCodeArray,displayErrorMessagesTN);
		return false;
	} else {
		phoneWrapperObj.className = "";
		return true;
	}
		
}

function displayServerSideValidationErrorsTN(errors) {
	
	//alert('now in displayServerSideValidationErrorsTN');
	
	commonFunc.overLayDiv(true);
	commonFunc.divPopUp("mainPopupDiv", true);
	commonFunc.visibleElement("popCloseButton", true);
	
	var areaCodeObj = document.getElementById('phoneAreaCode');
	var middle3Obj = document.getElementById('phoneMiddle3');
	var last4Obj = document.getElementById('phoneLast4');
	var phoneWrapperObj = commonFunc.getElementObj('phone_div');
	
	//alert('areaCodeObj=' + areaCodeObj + ', middle3Obj=' + middle3Obj + 'last4Obj=' + last4Obj);
	
	var errorCodeArray = new Array();
	if (errors.phoneNumber != null) {
		phoneWrapperObj.className = "focusInput padLeft";
		errorCodeArray.push(errors.phoneNumber);
	}
	//alert('about to call getErrorMessagesByCodes');
	DWRRequestManager.getErrorMessagesByCodes(errorCodeArray,displayErrorMessagesTN);
}

/*
 * This is is new function introduced to validate the address fields in the combined modal.
 * Refer jira ticket # B2C-118172
 * 
 */

function doServiceQualificationByAddress(thisModalType, multiTitle, rangedTitle) {
	multipleAddressTitle = multiTitle;
	rangedAddressTitle = rangedTitle;
	clearErrorMessages1();
	lastErrorType='';
	validateNewAddress();
}

function validateNewAddress() {
	var addr1WrapperObj = $('address_line_1_div');
	var addr2WrapperObj = $('address_line_2_div');
	var cityWrapperObj = $('city_div');
	var stateWrapperObj = $('state_div');
	var zipWrapperObj = $('zip_div');
	var addrForm = $('address_form');
	var addr1 = commonFunc.Trim($('streetAddress').value);
	var addr2Type = commonFunc.Trim($('unitTypeName').options[$('unitTypeName').selectedIndex].value);
	var addr2 = commonFunc.Trim($('unitNumber').value);
	var city = commonFunc.Trim($('city').value);
	var state =commonFunc.Trim($('stateName').options[$('stateName').selectedIndex].value);
	var zip = commonFunc.Trim($('zip').value);
	var serviceTypeChosenFlag = false;	
	var errorMap = new Object();
	var superNurl = "https://connect.att.com/apps/supern/StartAction.form";
	
	if (addr1 == null || addr1 == '') {
		addr1WrapperObj.addClassName('focusInput');
		errorMap.err1 = "Please enter address line 1";
	} 
	if (addr1.charAt(0) == '-'){
		addr1WrapperObj.addClassName('focusInput');
		errorMap.err1 = "Please enter a valid address line 1";
	}	

	if (city == null || city == '') {
		cityWrapperObj.addClassName('focusInput');
		errorMap.err3 = "Please enter city";
	}	
	if (state == null || state == '' || state == '0') {
		stateWrapperObj.addClassName('focusInput');
		errorMap.err4="Please select a state";
	}	
	if (zip == null || zip == '') {
		zipWrapperObj.addClassName('focusInput');
		errorMap.err5="Please enter ZIP code";
	}	
	
	var errCount = 0;
	for (k in errorMap) {
		if (errorMap.hasOwnProperty(k)) errCount++;
	}
	if (errCount > 0) {
		displayErrorMessages1(errorMap);
		lastErrorType = 'newAddress';		
		// Re-center the modal
		commonFunc.centerDiv("mainPopupDiv");		
		return false;		
	} else {	
		
		showProgressPopupByUrl('/dsl/modals/loadingPlansProgress.jsp', 450);
		
		superNurl += "?addressLine1="+addr1;
		superNurl += "&addressLine2="+addr2Type;
		superNurl += "%20"+addr2;
		superNurl += "&addressCity="+city;
		superNurl += "&addressState="+state;
		superNurl += "&zipCode="+zip;
		
		//superNurl = encodeURIComponent(superNurl);
		window.location = superNurl;
		return true;		
	}	
}

function serviceQualTN(data){
	
	//commonFunc.divPopUp("checkoutprogressbar", false);
	closeProgressPopup();
	
	var redirectFlag = data.redirect;
	var newUrl = data.url;
	var errors = data.errors;
	
	if (errors != null) {	
		displayServerSideValidationErrorsTN(errors);

	} else {
	
		if (redirectFlag == true) {
				window.location = newUrl;			
		} 	
	} 
}
