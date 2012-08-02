
//
// If key pressed was "enter", call function to perform service qual (equivalent of "submitting the form").
// If some other key was pressed call commonFunc.autoTab to tab forward to next input if current input has been filled.
//
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

    // remove all child nodes - shouldn't be any, but do it just in case
	while(errorMsgsList.hasChildNodes()){
		errorMsgsList.removeChild(errorMsgsList.lastChild);
	}
	
	commonFunc.displayElement("error_div", false);

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

/*
function validationErrorsCallbackTN(resp) {

	alert('TODO: add code to display validation errors');

}
*/

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
	
	//alert('in doServiceQualificationTN');
	
	//
	// Clear any error messages so we're starting with a clean slate
	//
	clearErrorMessagesTN();
	
	//alert('cleared errors');
	
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
	
	//alert('phoneFormInputsObj.phoneNumber=' + phoneFormInputsObj.phoneNumber);
	//alert('phoneFormInputsObj.prospectPlanId=' + phoneFormInputsObj.prospectPlanId);
	//alert('phoneFormInputsObj.successUrl=' + phoneFormInputsObj.successUrl);
			
	//phoneFormInputsObj.flowType='shared';
	//alert('flowType set to ' + flowType);
	phoneFormInputsObj.flowType = flowType;
	
			
	var success = validateInputsTN();
	if (success) {
		//alert('TODO: display "now loading DSL plans" modal');
		
		commonFunc.divPopUp("mainPopupDiv", false);
		commonFunc.visibleElement("popCloseButton", false);
		
		//commonFunc.divPopUp("checkoutprogressbar", true);
		//if (v_url.indexOf('https') == 0) {
		//	showProgressPopupByUrl('/dsl/modals/loadingPlansProgress_SSL.jsp', 'Thank You!', 450);
		//} else {
		//	showProgressPopupByUrl('/dsl/modals/loadingPlansProgress.jsp', 'Thank You!', 450);
		//}
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
	
	//alert('now in validateInputsTN')
		
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
	
	/*
	var errCount = 0;
	for (k in errorMap) {
		if (errorMap.hasOwnProperty(k)) errCount++;
	}
	if (errCount > 0) {
		displayErrorMessagesTN(errorMap);
		return false;
	} else {
		return true;
	}
	*/
	
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


function serviceQualTN(data){
	
	//alert('now in serviceQualTN');
	
	//commonFunc.divPopUp("checkoutprogressbar", false);
	closeProgressPopup();
	
	var redirectFlag = data.redirect;
	var newUrl = data.url;
	var errors = data.errors;
	
	if (errors != null) {
	
		//alert('errors found: phoneNumber=' + errors.phoneNumber);
		
		displayServerSideValidationErrorsTN(errors);

	} else {
		
		//alert('in serviceQual callback: no validation errors, redirect=' + redirectFlag + ', url=' + newUrl);
	
		if (redirectFlag == true) {
			
				//
				// Response from server indicates we need to redirect to new page.  Grab url sent by server and
			    // go there.  Note that this could be either a success or error condition - we're trusting the back end
			    // to send us to the right page regardless of what is going on here.
				//
	
				//alert('setting window location to ' + newUrl);
				window.location = newUrl;
			
		} 
		/*
		else {
	
			//
			// Response from server indicates we do not need to redirect to a new page.  For BTN modal, this
			// should mean that we have validation errors.
			//
			
			idx = newUrl.indexOf("testErrors");
			if (idx > -1) {
	
				//
				// URL returned from Ajax call indicates validation errors.  Get the errors and update the
				// modal to display them and highlight problem field(s).
				//
				
				//alert('doing Ajax with validationErrorsCallback');
	
				ShoppingCart.AjaxRequest(v_contextRoot + newUrl, validationErrorsCallbackTN);
			}	
	
		}
		*/
	
	}	 
}

