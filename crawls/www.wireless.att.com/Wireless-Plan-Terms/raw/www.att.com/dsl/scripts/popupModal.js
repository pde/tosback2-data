
//
// Note that JSP page may need to set certain variables in JavaScript before calling function,
// such as btnModalTitle in function popupBTNModal(), btnModalTitle & localeState in
// popupBTNModal_or_redirect(), and addressModalTitle in popupAddressModal().
//
function popupBTNModal(flowType, promoCode) {
	if(typeof(isForceRedirect) != 'undefined' && typeof(region) != 'undefined' && isForceRedirect == 'true' && region == 'L9'){
		//New DSL(Linshare) and L 9 - C-Order
		location.href='http://www.bellsouth.com/orderservice/change_existing_service.html';
	}
	else if(typeof(isForceRedirect) != 'undefined' && typeof(region) != 'undefined' && isForceRedirect == 'true' && (region == '' || region == null)){
		location.href='/dsl/start/index.jsp';
	}
	else{
		if (flowType == null || flowType == '') {
			flowType = "shared";
		}
		setModalFlowType(flowType);
		setPlanIdForQual('');
		var modalUrl = v_contextRoot + '/modals/checkAvailabilityByTN.jsp'
		if (promoCode != null && promoCode != '') {
			modalUrl = modalUrl + '?promoCode=' + promoCode;
		}
		showPopupByUrl(modalUrl, btnModalTitle, true, 500, true);
		focusOnAreaCode();
		if (flowType == 'existing') {
			var msgDiv = document.getElementById('existingBTNModalMessage');
			if (msgDiv != null) {
				msgDiv.style.display='block';
			}
		}
	}
}

function popupBTNModal_or_redirect(flowType, promoCode) {
	if(typeof(isForceRedirect) != 'undefined' && typeof(region) != 'undefined' && isForceRedirect == 'true' && region == 'L9'){
		//Existing(Upgrade) and L9 – redirect to C-Order
		location.href='http://www.bellsouth.com/orderservice/change_existing_service.html';
	}
	else if(typeof(isForceRedirect) != 'undefined' && typeof(region) != 'undefined' && isForceRedirect == 'true' && (region == '' || region == null)){
		location.href='/dsl/start/index.jsp';
	}
	else{
		if (localeState == 'Connecticut') {
		location.href='http://www.att.com/gen/general?pid=9112';
		} 
		else {
			if (flowType == null || flowType == '') {
				flowType = "shared";
			}
			if (flowType == 'existing' && ((typeof userAlreadyQualifiedExisting != 'undefined') && userAlreadyQualifiedExisting == 'true')) {
				location.href=v_contextRoot + '/shop/plansUpgrade.jsp';
			} else {
				setModalFlowType(flowType);
				setPlanIdForQual('');
				var modalUrl = v_contextRoot + '/modals/checkAvailabilityByTN.jsp'
				if (promoCode != null && promoCode != '') {
					modalUrl = modalUrl + '?promoCode=' + promoCode;
				}
				showPopupByUrl(modalUrl, btnModalTitle, true, 500, true);
				focusOnAreaCode();
				if (flowType == 'existing') {
					var msgDiv = document.getElementById('existingBTNModalMessage');
					if (msgDiv != null) {
						msgDiv.style.display='block';
					}
				}
			}
		}
	}
}

function popupAddressModal(noIE6HideSelect) {
	if(typeof(isForceRedirect) != 'undefined' && isForceRedirect == 'true'){
		//Dryloop and L22 – redirect to Super-N
		location.href='https://connect.att.com/apps/supern/StartAction.form';
	}
	else{
		if (noIE6HideSelect == null || noIE6HideSelect == '') {
			noIE6HideSelect = true;   // Note we're making it the default here to NOT hide select box in IE6...
		}
		setPlanIdForQual('');
		showPopupByUrl(v_contextRoot + '/modals/checkAvailabilityByAddress.jsp', addressModalTitle, true, 500, true, noIE6HideSelect);
		focusOnAddressLine1();
	}
}

function popupAddressModal_or_superN(noIE6HideSelect) {
	if (typeof(localeState) != "undefined" && localeState == 'Connecticut') {
		location.href='https://connect.att.com/apps/supern/StartAction.form';
	} else {
		if (noIE6HideSelect == null || noIE6HideSelect == '') {
			noIE6HideSelect = true;   // Note we're making it the default here to NOT hide select box in IE6...
		}
		setPlanIdForQual('');
		showPopupByUrl(v_contextRoot + '/modals/checkAvailabilityByAddress.jsp', addressModalTitle, true, 500, true, noIE6HideSelect);
		focusOnAddressLine1();
	}
}

function testFlash() {
	alert('called function testFlash');
}



