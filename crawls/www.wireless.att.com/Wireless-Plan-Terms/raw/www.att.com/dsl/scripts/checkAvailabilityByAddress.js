
function focusOnAddressLine1() {
	try {
		$('availabilityAddressInputLine1').focus();
	} catch(e) {
		// do nothing
	}
}

function enableOnlyTableSelection(uncheckNewAddrRadio) {
	newAddressFieldsEnabled(false);
	exactHouseFieldEnabled(true);
	if (uncheckNewAddrRadio != null && uncheckNewAddrRadio == true) {
		$('newAddress').checked = false;
	}
	setTableRowClass('blueRow');
}

function enableOnlyNewAddressInputs() {
	newAddressFieldsEnabled(true);
	exactHouseFieldEnabled(false);
	setTableRowClass('grayRow');
}

function newAddressFieldsEnabled(enable) {	
	var labelsArray = $$('.addressLabel')
	var serviceTypeDivObj = $('service_type_div');
	var asterisksArray = $$('.asterisk');
	var inputsArray = $$('.addressInput');	
	clearErrorMessages1();	
	if (enable) {		
		for (var i=0; i < labelsArray.length; i++) {
			labelsArray[i].removeClassName('disabledTextColor');
			labelsArray[i].addClassName('normalTextColor');
		}
		serviceTypeDivObj.removeClassName('disabledTextColor');
		serviceTypeDivObj.addClassName('normalTextColor');
		for (var i=0; i < asterisksArray.length; i++) {
			asterisksArray[i].removeClassName('disabledTextColor');
			asterisksArray[i].addClassName('orange');
		}
		for (var i=0; i < inputsArray.length; i++) {
			inputsArray[i].enable();
		}
		repopulateForm();
		validateInputsNewAddress();
	} else {		
		for (var i=0; i < labelsArray.length; i++) {
			labelsArray[i].removeClassName('normalTextColor');
			labelsArray[i].addClassName('disabledTextColor');
		}
		serviceTypeDivObj.removeClassName('normalTextColor');
		serviceTypeDivObj.addClassName('disabledTextColor');		
		for (var i=0; i < asterisksArray.length; i++) {
			asterisksArray[i].removeClassName('orange');
			asterisksArray[i].addClassName('disabledTextColor');
		}		
		for (var i=0; i < inputsArray.length; i++) {
			inputsArray[i].disable();
		}	
		clearForm();		
	}
}

function exactHouseFieldEnabled(enable) {
	var exactHouseObj = $('exact_num');
	var exactHouseLabelObj = $('exact_house_label');
	var exactHouseAsteriskObj = $('exact_house_asterisk');
	
	if (enable) {
		exactHouseLabelObj.className='label normalTextColor';
		exactHouseAsteriskObj.className='orange';
		exactHouseObj.disabled = false;
	} else {
		exactHouseLabelObj.className='label disabledTextColor';
		exactHouseAsteriskObj.className='disabledTextColor';
		exactHouseObj.disabled = true;
	}
}

function clearErrorMessages1(){
	var errorMsgsList = commonFunc.getElementObj("errorMsgsList");
	var errorsArray = $$('.focusInput');
	while(errorMsgsList.hasChildNodes()){
		errorMsgsList.removeChild(errorMsgsList.lastChild);
	}
	commonFunc.displayElement("error_div", false);
	for(var i=0; i < errorsArray.length; i++) {
		errorsArray[i].removeClassName('focusInput');
		errorsArray[i].removeClassName('padLeft');
	}
}

function displayErrorMessages1(data){
	var errorMsgsList = commonFunc.getElementObj("errorMsgsList");
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

function checkForRanged() {
	// get 'address1' line from first address returned - parse it to see if it is a ranged address
	var addressLine1 = document.getElementById('address1_address_line_1');		
	var pattern = /\d+\s*\-\s*\d+/;
	var matchResult = pattern.test(addressLine1.innerHTML);
	if (matchResult == true) {
		return true;
	} else {
		return false;
	}
}

var planIdForQual = '';

function setPlanIdForQual(plan) {
	planIdForQual = plan;
}

var params = new Array();
var formInputsObj = new Object();
var formInputsStreetObj = new Object();
var lastAddressInputsObj = new Object();
var multipleAddressTitle = '';
var rangedAddressTitle = '';

function doServiceQualification(thisModalType, multiTitle, rangedTitle) {
	multipleAddressTitle = multiTitle;
	rangedAddressTitle = rangedTitle;
	clearErrorMessages1();
	lastErrorType='';
	if (thisModalType == 'MULTIPLE') {
		// User pressed 'continue' button on either the Multiple Address or Ranged Address
		// version of the address modal.
		
		// Determine if the user checked one of the existing addresses, or chose to enter
		// an entirely new address
		var addrForm = document.getElementById('address_form');
		var chosenRow = 'none';
		for (var r=0; r < addrForm.chosenAddress.length; r++) {
			if (addrForm.chosenAddress[r].checked) {
				var chosenAddressId = addrForm.chosenAddress[r].id
				if (chosenAddressId == 'newAddress') {
					chosenRow = 'new';
				} else {
					chosenRow = (addrForm.chosenAddress[r].id.split(':'))[1];
				}
				break;
			}
		}
		// User didn't choose anything - show validation error
		if (chosenRow == 'none') {
			var errorMap = new Object();
			var rangedFlag = checkForRanged();
			if (rangedFlag == true) {
				errorMap.err1 = "Please either select an existing address range and enter exact house number, or supply an entirely new address";
			} else {
				errorMap.err1 = "Please either select an existing address or supply an entirely new address";
			}
			displayErrorMessages1(errorMap);
			lastErrorType = 'none';
			return;
		}
		// User chose to enter a new address rather than choosing from the list of existing
		// addresses or address ranges
		var success = false;
		if (chosenRow == 'new') {
			formInputsObj.address1 = $('availabilityAddressInputLine1').value;
			if (formInputsObj.hasOwnProperty('street')) {
				delete formInputsObj.street;
			}
			formInputsObj.passFieldedAddress = false;
			var add2Type = $('availabilityAddressLine2Select');
			formInputsObj.addressLine2Key = add2Type.options[add2Type.selectedIndex].value;		
			formInputsObj.addressLine2Type = getAddressLine2Type(formInputsObj.addressLine2Key);
			formInputsObj.address2 = $('availabilityAddressInputLine2').value;
			formInputsObj.city = $('availabilityCityInput').value;
			var sta = $('availabilityStateSelect');
			formInputsObj.state = sta.options[sta.selectedIndex].value;
			formInputsObj.postalCode = $('availabilityZipInput').value;
			var addrForm = $('address_form');
			for (var r=0; r < addrForm.serviceType.length; r++) {
				if (addrForm.serviceType[r].checked) {
					formInputsObj.addressType = addrForm.serviceType[r].value;
					break;
				}
			}			
			// remember values input, for repopuplation of form later if needed
			lastAddressInputsObj.address1 = formInputsObj.address1;
			lastAddressInputsObj.address2Type = formInputsObj.addressLine2Key;
			lastAddressInputsObj.address2 = formInputsObj.address2;
			lastAddressInputsObj.city = formInputsObj.city;
			lastAddressInputsObj.state = formInputsObj.state;
			lastAddressInputsObj.postalCode = formInputsObj.postalCode;
			lastAddressInputsObj.addressType = formInputsObj.addressType;
			
			success = validateInputsNewAddress();
			
		// User chose to use an address from the list of matching addresses or address ranges
		// returned from the previous search
		} else {
			var rangedFlag = checkForRanged();
			if (rangedFlag == true) {
				success = validateInputExactHouse();
			} else {
				success = true;  // no validation needed if selecting existing specific (non-ranged) address
			}
			if (success) {
				var addr1 = commonFunc.Trim($('address' + chosenRow + '_address_line_1').innerHTML);
				if (rangedFlag == true) {
					addr1 = addr1.replace(/\s*\d+\s*\-\s*\d+\s*/, '');
					addr1 = commonFunc.Trim($('exact_num').value) + " " + addr1;
				}
				formInputsObj.address1 = addr1;
				
				var streetHiddenInputValue = $('address' + chosenRow + '_street').value;
				var streetSplit = streetHiddenInputValue.split(':');
				formInputsStreetObj.assignedStreetNumber = streetSplit[0];
				formInputsStreetObj.streetDirection = streetSplit[1];
				formInputsStreetObj.streetName = streetSplit[2];
				formInputsStreetObj.streetNameSuffix = streetSplit[3];
				if (rangedFlag == true) {
					formInputsStreetObj.streetNumber = commonFunc.Trim($('exact_num').value);
				} else {
					formInputsStreetObj.streetNumber = streetSplit[4];
				}
				formInputsStreetObj.streetNumberPrefix = streetSplit[5];
				formInputsStreetObj.streetNumberSuffix = streetSplit[6];
				formInputsStreetObj.streetTrailingDirection = streetSplit[7];
				formInputsStreetObj.streetType = streetSplit[8];
				
				formInputsObj.street = formInputsStreetObj;
				formInputsObj.passFieldedAddress = true;
				
				var tempUnitType = streetSplit[9];
				if (tempUnitType != null && tempUnitType != '') {
					formInputsObj.unitType = tempUnitType;
				}
				var tempUnitValue = streetSplit[10];
				if (tempUnitValue != null && tempUnitValue != '') {
					formInputsObj.unitValue = tempUnitValue;
				}
				
				var tempElevationType = streetSplit[11];
				if (tempElevationType != null && tempElevationType != '') {
					formInputsObj.elevationType = tempElevationType;
				}
				var tempElevationValue = streetSplit[12];
				if (tempElevationValue != null && tempElevationValue != '') {
					formInputsObj.elevationValue = tempElevationValue;
				}
				
				var tempStructureType = streetSplit[13];
				if (tempStructureType != null && tempStructureType != '') {
					formInputsObj.structureType = tempStructureType;
				}
				var tempStructureValue = streetSplit[14];
				if (tempStructureValue != null && tempStructureValue != '') {
					formInputsObj.structureValue = tempStructureValue;
				}
				
				
				var addr2 = commonFunc.Trim($('address' + chosenRow + '_address_line_2').innerHTML);			
				if (addr2 == 'address2 not set') {
					addr2 = '';
				}
				formInputsObj.address2= addr2;
				var city = commonFunc.Trim($('address' + chosenRow + '_city').innerHTML);
				formInputsObj.city = city
				var state = commonFunc.Trim($('address' + chosenRow + '_state').innerHTML);
				formInputsObj.state = state;
				var postalCode = commonFunc.Trim($('address' + chosenRow + '_zip').innerHTML);
				formInputsObj.postalCode = postalCode;
			}
			
			//
			//formInputsObj.addressType - should still be set from inital form submission, it's just been hidden
			//	
			
			// Note: NOT updating "lastAddressInputsObj" for this case, in which user chose address from
			// list of matches.  Pre-population of text boxes and drop-downs will only come from values typed
			// in directly to those inputs, not from values in row selected from table
			lastAddressInputsObj.address1 = formInputsObj.address1;
			if(formInputsObj.address2 == ''){
				lastAddressInputsObj.address2Type = '';
				lastAddressInputsObj.address2 = '';
			}
			lastAddressInputsObj.city = formInputsObj.city;
			lastAddressInputsObj.state = formInputsObj.state;
			lastAddressInputsObj.postalCode = formInputsObj.postalCode;
		
		}

		//
		// If qual is for a specific plan ID, add attribute to formInputsObjs...
		// (if plan ID was set, it should still be set from initial form submission)
		//
		if (planIdForQual != null && planIdForQual != '') {
			formInputsObj.prospectPlanId = planIdForQual;
			formInputsObj.successUrl = "/dsl/shop/plandetails.jsp?q_repId=" + planIdForQual;
		}
		
		if (success) {
			params.push(formInputsObj);
			commonFunc.divPopUp("mainPopupDiv", false);
			commonFunc.visibleElement("popCloseButton", false);
			
			showProgressPopupByUrl('/dsl/modals/loadingPlansProgress.jsp', 450);
			
			DWRRequestManager.getQualificationByAddress(params,serviceQual);
		}
		
	} else {

		//
		// User pressed 'check availability' button on the initial, non-multiple address
		// version of address modal.
		//
		
		//
		// Put form inputs into a hash map object called formInputsObj
		//
		formInputsObj.overrideAddrLine2 = 'false';
		var addressLine2CB = $('addressLine2Checkbox');
		if(addressLine2CB != null) formInputsObj.overrideAddrLine2 = addressLine2CB.checked;
		formInputsObj.address1 = commonFunc.Trim($('availabilityAddressInputLine1').value);
		var add2Type = $('availabilityAddressLine2Select');
		formInputsObj.addressLine2Key = add2Type.options[add2Type.selectedIndex].value;		
		formInputsObj.addressLine2Type = getAddressLine2Type(formInputsObj.addressLine2Key);
		formInputsObj.address2 = commonFunc.Trim($('availabilityAddressInputLine2').value);
		formInputsObj.city = commonFunc.Trim($('availabilityCityInput').value);
		var sta = $('availabilityStateSelect');
		formInputsObj.state = sta.options[sta.selectedIndex].value;
		formInputsObj.postalCode = commonFunc.Trim($('availabilityZipInput').value);
		var addrForm = $('address_form');
		for (var r=0; r < addrForm.serviceType.length; r++) {
			if (addrForm.serviceType[r].checked) {
				formInputsObj.addressType = addrForm.serviceType[r].value;
				break;
			}
		}
		
		// remember values input, for repopuplation of form later if needed
		lastAddressInputsObj.address1 = formInputsObj.address1;
		lastAddressInputsObj.address2Type = formInputsObj.addressLine2Key;
		lastAddressInputsObj.address2 = formInputsObj.address2;
		lastAddressInputsObj.city = formInputsObj.city;
		lastAddressInputsObj.state = formInputsObj.state;
		lastAddressInputsObj.postalCode = formInputsObj.postalCode;
		lastAddressInputsObj.addressType = formInputsObj.addressType;

		//
		// If qual is for a specific plan ID, add attribute to formInputsObjs...
		//
		if (planIdForQual != null && planIdForQual != '') {
			formInputsObj.prospectPlanId = planIdForQual;
			formInputsObj.successUrl = "/dsl/shop/plandetails.jsp?q_repId=" + planIdForQual;
		}		

		var success = validateInputsNewAddress();
		if (success) {
			params.push(formInputsObj);
			commonFunc.divPopUp("mainPopupDiv", false);
			commonFunc.visibleElement("popCloseButton", false);
			
			showProgressPopupByUrl('/dsl/modals/loadingPlansProgress.jsp', 450);

			//
			// In case multiple/ranged address modal was previously displayed, and because it might be displayed
			// again...need to reset "current active classes" of inputs (or set flag to allow them to be reset)
			// so any previous error styles will not be incorrectly retained
			//
			gotInitialAddressInputClassesFlag = false;
			
			DWRRequestManager.getQualificationByAddress(params,serviceQual);
		}
	}
}

function getAddressLine2Type(al2key){
	if(al2key == 'APT' || al2key == 'RM' || al2key == 'UNIT' || al2key == 'SLIP' || al2key == 'STE' || al2key == 'LOT'){
		return 'Unit';
	}else if(al2key == 'BLDG' || al2key == 'WING'){
		return 'Structure'
	}else if(al2key == 'FL'){
		return 'Elevation'
	}else{
		return '';
	}	
}


var gotInitialAddressInputClassesFlag = false;
var gotExactHouseInputClassesFlag = false;
var lastErrorType = "";

function setTableRowClass(nameOfClass) {
	if (nameOfClass == null || nameOfClass == '') {
		nameOfClass == 'blueRow';
	}
	var tableObj = $('multiple_address_table');
	var rowObjArray = tableObj.getElementsByTagName('tr');
	for (var r=0; r < rowObjArray.length; r++) {
		rowObjArray[r].className = nameOfClass;
	}
}

function updateLastAddress1() {
	lastAddressInputsObj.address1 = $('availabilityAddressInputLine1').value;
}
function updateLastAddress2Type() {
	lastAddressInputsObj.address2Type = $('availabilityAddressLine2Select').value;
}
function updateLastAddress2() {
	lastAddressInputsObj.address2 = $('availabilityAddressInputLine2').value;
}
function updateLastCity() {
	lastAddressInputsObj.city = $('availabilityCityInput').value;
}
function updateLastState() {
	lastAddressInputsObj.state = $('availabilityStateSelect').value;
}
function updateLastZip() {
	lastAddressInputsObj.postalCode = $('availabilityZipInput').value;
}
function updateLastServiceType() {
	var addrForm = $('address_form');
	for (var r=0; r < addrForm.serviceType.length; r++) {
		if (addrForm.serviceType[r].checked == true) {
			lastAddressInputsObj.addressType = addrForm.serviceType[r].value;
			break;
		}
	}
}

function repopulateForm() {
	if (lastAddressInputsObj.hasOwnProperty("address1")) {
		document.getElementById('availabilityAddressInputLine1').value = lastAddressInputsObj.address1;
	}
	if (lastAddressInputsObj.hasOwnProperty("address2Type")) {
		document.getElementById('availabilityAddressLine2Select').value = lastAddressInputsObj.address2Type;
	}	
	if (lastAddressInputsObj.hasOwnProperty("address2")) {
		document.getElementById('availabilityAddressInputLine2').value = lastAddressInputsObj.address2;
	}
	if (lastAddressInputsObj.hasOwnProperty("city")) {
		document.getElementById('availabilityCityInput').value = lastAddressInputsObj.city;
	}
	if (lastAddressInputsObj.hasOwnProperty("state")) {
		document.getElementById('availabilityStateSelect').value = lastAddressInputsObj.state;
	}
	if (lastAddressInputsObj.hasOwnProperty("postalCode")) {
		document.getElementById('availabilityZipInput').value = lastAddressInputsObj.postalCode;
	}
	if (lastAddressInputsObj.hasOwnProperty("addressType")) {
		var addrForm = document.getElementById('address_form');
		for (var r=0; r < addrForm.serviceType.length; r++) {
			if (addrForm.serviceType[r].value == lastAddressInputsObj.addressType) {
				addrForm.serviceType[r].checked = true;
				break;
			}
		}
	}
}


function clearForm() {	
	$('availabilityAddressInputLine1').value = '';
	$('availabilityAddressLine2Select').value = '';
	$('availabilityAddressInputLine2').value = '';
	$('availabilityCityInput').value = '';
	$('availabilityStateSelect').value = '';
	$('availabilityZipInput').value = '';
	var addrForm = $('address_form');
	for (var r=0; r < addrForm.serviceType.length; r++) {
			addrForm.serviceType[r].checked = false;
	}
}

function validateInputExactHouse() {
	var exactHouseWrapperObj = $('ranged_address_exact_number');
	var exactHouse = commonFunc.Trim($('exact_num').value);
	var errorMap = new Object();
	if (exactHouse == null || exactHouse == '') {
		exactHouseWrapperObj.addClassName('focusInput');
		exactHouseWrapperObj.addClassName('padLeft');		
		errorMap.err1 = "Please include exact house number with your selected address range";
	}	
	var errCount = 0;
	for (k in errorMap) {
		if (errorMap.hasOwnProperty(k)) errCount++;
	}
	if (errCount > 0) {
		displayErrorMessages1(errorMap);
		lastErrorType = 'exactHouse';
		// Re-center the modal
		commonFunc.centerDiv("mainPopupDiv");		
		return false;		
	} else {
		return true;
	}	
}

function validateInputsNewAddress() {
	var addr1WrapperObj = $('address_line_1_div');
	var addr2WrapperObj = $('address_line_2_div');
	var cityWrapperObj = $('city_div');
	var stateWrapperObj = $('state_div');
	var zipWrapperObj = $('zip_div');
	var addrForm = $('address_form');
	var addr1 = commonFunc.Trim($('availabilityAddressInputLine1').value);
	var addr2Type = commonFunc.Trim($('availabilityAddressLine2Select').options[$('availabilityAddressLine2Select').selectedIndex].value);
	var addr2 = commonFunc.Trim($('availabilityAddressInputLine2').value);
	var city = commonFunc.Trim($('availabilityCityInput').value);
	var state =commonFunc.Trim($('availabilityStateSelect').options[$('availabilityStateSelect').selectedIndex].value);
	var zip = commonFunc.Trim($('availabilityZipInput').value);
	var serviceTypeChosenFlag = false;
	var errorMap = new Object();	
	
	if (addr1 == null || addr1 == '') {
		addr1WrapperObj.addClassName('focusInput');
		errorMap.err1 = "Please enter address line 1";
	} 
	if (addr1.charAt(0) == '-'){
		addr1WrapperObj.addClassName('focusInput');
		errorMap.err1 = "Please enter a valid address line 1";
	}
	if (addr2Type != '' && (addr2 == null || addr2 == '')) {
		addr2WrapperObj.addClassName('focusInput');
		errorMap.err2 = "Please supply a number for Address Line 2.";
	}else if(addr2Type == ''&& addr2 != null && addr2 != ''){ 
		addr2WrapperObj.addClassName('focusInput');
		errorMap.err2 = "Please select from the drop-down menu for Address Line 2";
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
	var serviceTypeDiv = $('service_type_div_radio_buttons');
	for (var r=0; r < addrForm.serviceType.length; r++) {
		if (addrForm.serviceType[r].checked) {
			serviceTypeChosenFlag = true;
			break;
		}
	}
	if (!serviceTypeChosenFlag) {
		serviceTypeDiv.addClassName('focusInputRadio');
		errorMap.err6="Please choose a service type";
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
		return true;
	}
	
}

function displayServerSideValidationErrors(errors) {
	
	commonFunc.overLayDiv(true);
	commonFunc.divPopUp("mainPopupDiv", true);
	commonFunc.visibleElement("popCloseButton", true);
	
	var addr1WrapperObj = $('address_line_1_div');
	var addr2WrapperObj = $('address_line_2_div');
	var cityWrapperObj = $('city_div');
	var stateWrapperObj = $('state_div');
	var zipWrapperObj = $('zip_div');
	var errorCodeArray = new Array();
	
	if (errors.address1 != null) {
		addr1WrapperObj.addClassName('focusInput');
		errorCodeArray.push(errors.address1);
	}
	if (errors.address2 != null) {
		addr2WrapperObj.addClassName('focusInput');
		errorCodeArray.push(errors.address2);
	}
	if (errors.city != null) {
		cityWrapperObj.addClassName('focusInput');
		errorCodeArray.push(errors.city);
	}
	if (errors.state != null) {
		stateWrapperObj.addClassName('focusInput');		
		errorCodeArray.push(errors.state);
	}
	if (errors.postalCode != null) {
		zipWrapperObj.addClassName('focusInput');
		errorCodeArray.push(errors.postalCode);
	}

	lastErrorType = 'newAddress';  // currently only looking at server side validation errors for new address input

	DWRRequestManager.getErrorMessagesByCodes(errorCodeArray,displayErrorMessages1);
}

var newUrl = '';
var localizationNumImagesReady = 0;

function anotherImageReady() {
	localizationNumImagesReady++;
	//console.log('img ready, localizationNumImagesReady=' + localizationNumImagesReady);
	if (localizationNumImagesReady >= 3) {
		if (newUrl != null && newUrl != '') {
			//console.log('going to newUrl=' + newUrl);
			//alert('click to continue');
			closeProgressPopup();
			window.location = newUrl;
		}
	}
}

function serviceQual(data){
	
	var redirectFlag = data.redirect;
	newUrl = data.url;
	var errors = data.errors;
	
	if (errors != null) {
		
		closeProgressPopup();
		
		//alert('errors found: address1=' + errors.address1 + ', address2=' + errors.address2 + ', state=' + errors.state + ', city=' + errors.city + ', postalCode=' + errors.postalCode);
		
		displayServerSideValidationErrors(errors);
	
	} else {
	
		//alert('in serviceQual callback: no validation errors, redirect=' + data.redirect + ', url=' + data.url);
		
		if (redirectFlag == true && (newUrl.indexOf('plansShared.jsp') > 0 || newUrl.indexOf('plansDirect.jsp') > 0 || newUrl.indexOf('plansUpgrade.jsp') > 0 || newUrl.indexOf('plandetails.jsp') > 0)) {
						
			//
			// Response from server indicates we need to redirect to new page.  Grab url sent by server and
		    // go there.  Note that this could be either a success or error condition - we're trusting the back end
		    // to send us to the right page regardless of what is going on here.
			//

			var attLocalizationUrl = data.attLocalizationUrl;
			var bellSouthLocalizationUrl = data.bellSouthLocalizationUrl;
			var sbcLocalizationUrl = data.sbcLocalizationUrl;
			
			//alert('attLocalizationUrl=' + attLocalizationUrl);
			//alert('bellSouthLocalizationUrl=' + bellSouthLocalizationUrl);
			//alert('sbcLocalizationUrl=' + sbcLocalizationUrl); 
			
			// This code will set attPersistantLocalization cookies for att.com, bellsouth.com, and sbc.com domains
			if (attLocalizationUrl != null && bellSouthLocalizationUrl != null && sbcLocalizationUrl != null) {
			
				var img1 = document.createElement("img");
				var img2 = document.createElement("img");
				var img3 = document.createElement("img");
				img1.width=1;
				img1.height=1;
				img1.border=0;
				img1.onload=anotherImageReady;  // *probably* not needed...the image isn't a real image, so onerror should be triggered, not onload
				img1.onerror=anotherImageReady;
				img2.width=1;
				img2.height=1;
				img2.border=0;
				img2.onload=anotherImageReady; // *probably* not needed...the image isn't a real image, so onerror should be triggered, not onload
				img2.onerror=anotherImageReady;
				img3.width=1;
				img3.height=1;
				img3.border=0;
				img3.onload=anotherImageReady; // *probably* not needed...the image isn't a real image, so onerror should be triggered, not onload
				img3.onerror=anotherImageReady;
				
				var bod = document.getElementsByTagName("body");
				bod[0].appendChild(img1);
				bod[0].appendChild(img2);
				bod[0].appendChild(img3);
				
				// set src attributes to URLs retured from DWR call...this is what will actually trigger HTTP requests and
				// the responses that will set "attPersistantLocalization" cookies for att.com, bellsouth.com, and sbc.com
				img1.src=attLocalizationUrl;
				img2.src=bellSouthLocalizationUrl;
				img3.src=sbcLocalizationUrl;
				
				// Note: in this case, closeProgressPopup will be called in anotherImageReady event handler
				
			} else {
				// no URLs to use to update cookies, so just proceed to the new URL anyway
				
				closeProgressPopup();
				window.location = newUrl;

			}
			
		} else if (redirectFlag == true) {
			
			//
			// redirecting to new page, but URL doesn't seem to indicate this was a successful qual...might
			// be qual error page, etc.  So don't update cookies, just proceed to the new URL.
			//
			
			closeProgressPopup();
			
			window.location = newUrl;
					
		} else {
			
			closeProgressPopup(true);   // passing in 'true' argment means "keep overlay"...which we want here because we
										// know we're about to popup the multiple address modal
	
			//
			// Response from server indicates we do not need to redirect to a new page.  This should mean that
			// we have a multiple/ranged address scenario.  Use the showPopupByUrl function to display the multiple
			// addresses modal - and modify it to be the "ranged addresses" version if needed.
			//
			
			var idx = newUrl.indexOf("multipleAddress");
			if (idx > -1) {
				//
				// URL returned from Ajax call indicates there are multiple address matches - will need to change
				// modal to either Multiple Address modal or Ranged Address modal, depending on whether the address
				// line 1 of the matched address contain a single address or range (multiAddrCallback will parse to
				// determine).
				//

				//
				// First, "pop up" the modal, but keep it invisible until the modifications below are made to it
				//
				//showPopupByUrl(newUrl, multipleAddressTitle, true, 600, true, true);
				addHiddenPopupByUrl(newUrl, multipleAddressTitle, true, 600, true, true);
				
				//
				// call function to examine the multiple address table contents to see if it's ranged address...
				// if it is, call function to change modal title and show/hide appropriate divs to turn it from
				// multiple address modal into ranged address modal
				//
				var rangedFlag = checkForRanged();
				//alert('rangedFlag=' + rangedFlag);
				if (rangedFlag == true) {
					document.getElementById('multiple_address_instructions').style.display="none";
					document.getElementById("mainPopUpTitle").innerHTML = rangedAddressTitle;
					document.getElementById('ranged_address_instructions').style.display="block";	
					document.getElementById('ranged_address_exact_number').style.display="block";
					//
					// If this is first display of ranged address modal, remember the CSS classes initially
					// applied to the "exact house" input text box, so we can properly apply error CSS
					//
					if (gotExactHouseInputClassesFlag == false) {
						exactHouseObjOrigClass = document.getElementById('exact_num').className;
						gotExactHouseInputClassesFlag = true;
					}
					
				} else {
					document.getElementById("mainPopUpTitle").innerHTML = multipleAddressTitle;
					document.getElementById('ranged_address_instructions').style.display="none";	
					document.getElementById('ranged_address_exact_number').style.display="none";
					document.getElementById('multiple_address_instructions').style.display="block";
				}
				
				//commonFunc.divPopUp("mainPopupDiv", true);
				
				//
				// Wait 10ms, then call function to display the multiple/ranged address modal that we loaded above with
				// "addHiddenPopupByUrl".  If we don't wait a little while like this, Firefox will calculate the offsetHeight
				// of the div incorrectly for some reason, and the modal will be placed too high on the screen and be
				// partially obscured.  (Would prefer some kind of event rather than using setTimeout, but haven't
				// determined yet how to make that work...in interest of time constraints, using setTimeout...)
				//
				var makeMainPopupDivVisible = function() {
					commonFunc.divPopUp("mainPopupDiv", true);
					commonFunc.visibleElement("popCloseButton", true);

					try {
						WT['ti'] = '';
						DCS['dcsqry'] = '';
						
						var localDCSRef = window.location.protocol + "//" + window.location.host + "/dsl/modals/checkAvailabilityByAddress.jsp";
						
						var multiAddrEnteredForWt = "";
						if($('multiAddrEnteredForWt'))
							multiAddrEnteredForWt = $('multiAddrEnteredForWt').value; 
						
						dcsMultiTrack(
							'DCS.dcsuri','/dsl/modals/checkAvailabilityMultiAddress.jsp',
							'DCS.dcsref',localDCSRef,
							'DCSext.wtEvent', 'DSL_Direct_Address_Qual_Check_Avail_Submit',
							'DCS.wtEvent', '',
							'DCSext.wtPN','DSL Dryloop Multiaddress Modal',
							'DCSext.wtStatusCode', 'Multi-Address',
							'DCSext.wtSuccessFlag', '0',
							'DCSext.wtNoHit', '',
							'DCSext.wtSlotContent', '',
							'DCSext.wtSlotClick', '',
							'DCSext.wtUserResp', multiAddrEnteredForWt
						);
					} catch(e) {
					}					
				}
				setTimeout(makeMainPopupDivVisible, 10);
				
				
			} 
			else{
				addHiddenPopupByUrl('/dsl/modals/checkAvailabilityByAddress.jsp', addressModalTitle, true, 500, true, true);
				
				var makeMainPopupDivVisible = function() {
					commonFunc.divPopUp("mainPopupDiv", true);
					commonFunc.visibleElement("popCloseButton", true);
					repopulateForm();

					/*
					try {
						WT['ti'] = '';
						DCS['dcsqry'] = '';
						
						var localDCSRef = window.location.protocol + "//" + window.location.host + "/dsl/modals/checkAvailabilityByAddress.jsp";
						
						var multiAddrEnteredForWt = "";
						if($('multiAddrEnteredForWt'))
							multiAddrEnteredForWt = $('multiAddrEnteredForWt').value; 
						
						dcsMultiTrack(
							'DCS.dcsuri','/dsl/modals/checkAvailabilityMultiAddress.jsp',
							'DCS.dcsref',localDCSRef,
							'DCSext.wtEvent', 'DSL_Direct_Address_Qual_Check_Avail_Submit',
							'DCS.wtEvent', '',
							'DCSext.wtPN','DSL Dryloop Multiaddress Modal',
							'DCSext.wtStatusCode', 'Multi-Address',
							'DCSext.wtSuccessFlag', '0',
							'DCSext.wtNoHit', '',
							'DCSext.wtSlotContent', '',
							'DCSext.wtSlotClick', '',
							'DCSext.wtUserResp', multiAddrEnteredForWt
						);
					} catch(e) {
					}	
					*/				
				}
				setTimeout(makeMainPopupDivVisible, 10);

			}
	
		}
		
	}
	 
}

