function areTheseElementsFilled()
{
	for(var i=0; i<arguments.length; ++i)
	{
		var arg = arguments[i];
		if(arg.value.length == 0)
		{
			var szMsg = arg.getAttribute("empty_msg");
			if(szMsg == null)
				szMsg = arg.form.getAttribute("empty_msg");
			if(szMsg != null) alert(szMsg);
			arg.focus();
			return false;
		}
	}
	return true;
}

function checkname(txtFName) {
	var filter = /[^A-Za-z0-9\s]/;
	if (txtFName == "") {
		alert("Name is a required field");
		return false;
	}
	else if (filter.test(txtFName)) {
		alert("Please enter a valid name");
		return false;
	} 
	else {
		return true;
	}
}
//--->AR96001
function checkLname(txtLName) {
	var filter = /[^A-Za-z0-9\s]/;
	var filterspace = /^[\s]*$/;
    if (txtLName == "") {
        alert("Please enter a last name");
        return false;
    }
    else if (filter.test(txtLName)) {
        alert("Please enter a valid name");
        return false;
       }
    else if (filterspace.test(txtLName)) {
       	alert("Please enter a valid name");
       	return false; 
	   }
    else {
        return true;
    }
}

function checkemail(txtemail) {
    // trim
    txtemail = txtemail.replace(/^\s+|\s+$/g, "");
    var filter = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "i");
    if (filter.test(txtemail)) {
        return true;
    }
	else {
		alert("Please enter a valid email address");
		return false;
	}
}

function onStateChange() {
	var slObj = document.getElementById('selStateShip');
	var raObj = document.getElementsByName('radPOBoxShip');
	var stValue = slObj.options[slObj.selectedIndex].value;

	if (stValue == "AA" || stValue == "AE" || stValue == "AP") {
		for (var i = 0; i < raObj.length; i++) {
			raObj[i].disabled = true;
		}
	}
	else {
		for (var i = 0; i < raObj.length; i++) {
			raObj[i].disabled = false;
		}
	}
}

function checkpwd(txtpwd1, txtpwd2){
	if (txtpwd1 != "" && txtpwd1 == txtpwd2)
		return true;
	else if (txtpwd1 != txtpwd2){
		alert("Passwords don't match");
		return false;
		}
	else {
		alert("Please enter a password");
		return false;
	}
}

function validate(txtemail, txtpwd1, txtpwd2, txtLName) {
    if (document.layers || document.getElementById || document.all) {  
         if (checkLname(txtLName) == false) {
            return false;
         }
        else if (checkemail(txtemail) == false) {
            return false;
        }
        else {
            return checkpwd(txtpwd1, txtpwd2);
        }
    }
    return true;
  }
function copyBillingToShipping() {
	var l_oForm = document.frmAddBillShip;

	if (l_oForm.cbCopyBillToShip.checked) {
		l_oForm.txtNameShip.value = l_oForm.txtName.value;
		l_oForm.txtAddr1Ship.value = l_oForm.txtAddr1.value;
		l_oForm.txtAddr2Ship.value = l_oForm.txtAddr2.value;
		l_oForm.txtCityShip.value = l_oForm.txtCity.value;
		l_oForm.selStateShip.value = l_oForm.selState.value;
		l_oForm.txtZipShip.value = l_oForm.txtZip.value;
		l_oForm.txtPhoneShip.value = l_oForm.txtPhone.value;
	}
}

function updateCheckoutPageParams(p_szURL, p_szName, p_szValue) {
	nixPlaceOrderButton();    
		var l_szAppendChar;
		if (p_szURL.indexOf('?') != -1) {
			l_szAppendChar = '&';
		}
		else {
			l_szAppendChar = '?';

}
document.location.href = p_szURL + l_szAppendChar + 'state=state_checkout&' + p_szName + '=' + p_szValue + '&paymentmethodselected=selected';
}

function updatePaymentOptionParams(p_szURL, p_szName, p_szValue) {
	nixPlaceOrderButton();
	var l_szAppendChar;
	if (p_szURL.indexOf('?') != -1) {
		l_szAppendChar = '&';
	}
	else {
		l_szAppendChar = '?';

	}
	document.location.href = p_szURL + l_szAppendChar + 'state=state_checkout&' + p_szName + '=' + p_szValue + '&rdobtnchk=chk' + '&paymentmethodselected=selected';
}

function nixPlaceOrderButton() {
	var l_oPlaceOrderButton = getElement('tbl_place_your_order');
	if (l_oPlaceOrderButton != null) {
		l_oPlaceOrderButton.style.display = 'none';
	}
}

function getElement(id) {
	// the check for (document.all) was only necessary for IE 4 and is long obsolete. getElementById is the W3C standard
	return document.getElementById(id);
}

// switch UI from the disabled version of the button to the enabled version
function fnUseThisCardEnable()
{
	toggleVisibleContent('btnAddCC', true);
	toggleVisibleContent('btnAddCCDisabled', false);
}

// switch UI from the enabled version of the button to the disabled version
function fnUseThisCardDisable()
{
	toggleVisibleContent('btnAddCC', false);
	toggleVisibleContent('btnAddCCDisabled', true);
}


function resetCCFields()
{
	if ((getElement('paymentmethod').value == '0') && ((getElement('txtCCNumber').value == '5049990000000000') || (getElement('txtCCNumber').value == '0000000000000')))
	{
		var l_oCCTypes = getElement('selCCType');
		var l_oCCOption;
		for(var i = 0; i < l_oCCTypes.childNodes.length; i++)
		{
			l_oCCOption = l_oCCTypes.childNodes[i];
			if (l_oCCOption.text == 'PayPal')
			{
				l_oCCTypes.removeChild(l_oCCOption);
			}
			else 
			{
				if (i == 0)
				{
					l_oCCOption.setAttribute('selected', 'selected');
				}
				else
				{
					l_oCCOption.setAttribute('selected', '');
				}
			}
		}

		setDropdownValue('selCCExpMonth', 0);								// The first month from the month dropdown
		setDropdownValue('selCCExpYear', 0);								// The first year from the expiration year dropdown
		getElement('txtCCNumber').value = '';
		getElement('txtCCNameOnCard').value = '';
		if (getElement('paymentmethod').checked)
			fnUseThisCardEnable();
	}
}

// '' TODO	- make these more robust by checking for null before acting, etc..
//			- use getElement

// Select Credit Card as the payment type
function selectPaymentTypeCC(p_nTypeCC)
{
	getElement('paymentmethod').value = p_nTypeCC;

	// reset the credit card fields - there is the case where the customer hits the back button and could see the BML info
	resetCCFields();

	// show credit card fields
	toggleVisibleContent('dvCreditcard', true);

	// show the billing address form
	toggleVisibleContent('dvBillAddress', true);

	// hide PayPal
	toggleVisibleContent('dvPaypal', false);

	// hide BML
	toggleVisibleContent('dvBML', false);

	// enable button
	fnUseThisCardEnable();
}

// Select Bill Me Later as the payment type
function selectPaymentTypeBML(p_nTypeBML)
{
	getElement('paymentmethod').value = p_nTypeBML;

	// hide credit card fields
	toggleVisibleContent('dvCreditcard', false);

	// hide PayPal
	toggleVisibleContent('dvPaypal', false);

	// show the billing address form
	toggleVisibleContent('dvBillAddress', true);

	// show BML
	toggleVisibleContent('dvBML', true);

	// enable button
	fnUseThisCardEnable();
}

// Select PayPal as the payment type
function selectPaymentTypePayPal(p_nTypePayPal)
{
	getElement('paymentmethod').value = p_nTypePayPal;

	// hide credit card fields
	toggleVisibleContent('dvCreditcard', false);

	// hide the billing address form, only show if errors occur
	toggleVisibleContent('dvBillAddress', false);

	// hide BML
	toggleVisibleContent('dvBML', false);

	// show PayPal
	toggleVisibleContent('dvPaypal', true);

	// enable button
	fnUseThisCardEnable();
}

// when customer submits payment information
function doPaymentSubmit(p_oForm)
{
	// to avoid cases where customer double+ clicks the "add" or continue button and site attempts to process perform more than one submission
	fnUseThisCardDisable();

	// required for Address Verification Service (AVS), these forms need this value set to 'true'...
	var l_oAVS;
	for (var k = 0; k < document.forms.length; k++)
	{
		l_oAVS = document.forms[k].jsenabled;
		if (l_oAVS != null)
		{
			l_oAVS.value = 'true';
		}
	}

	var l_fBMLChecked = false;
	var l_fPayPalChecked = false;
	
	for (i=0; i < p_oForm.paymentmethod.length; i++)
	{
		if (p_oForm.paymentmethod[i].checked)
		{
			switch(p_oForm.paymentmethod[i].value)
			{
				case '11': 
					l_fBMLChecked = true;
				case '12':
					l_fPayPalChecked = true;
			}
		}
	}

	// For Bill Me Later and PayPal, update the credit card fields appropriately.
	// Note: this has to be done on submit, because doing earlier risks getting wiped out by Google toolbar and the like...
	if (l_fBMLChecked || l_fPayPalChecked)
	{

		// Deselect whatever credit card type they may have previously selected...
		var l_oCCTypes = getElement('selCCType');
		var l_oCCOption;
		for(var i = 0; i < l_oCCTypes.childNodes.length; i++)
		{
			l_oCCOption = l_oCCTypes.childNodes[i];
			l_oCCOption.setAttribute('selected', '');
		}

		// BML
		if (l_fBMLChecked)
		{
			// Add Bill Me Later as a credit card type to the dropdown, and select it...
			var optionBML = document.createElement('option');
			optionBML.setAttribute('value','11');
			optionBML.setAttribute('selected', 'selected');
			optionBML.innerHTML = 'Bill Me Later';
			l_oCCTypes.appendChild(optionBML);
			
			// Enter the official Bill Me Later credit card number...
			getElement('txtCCNumber').value = '5049990000000000';

			// Enter the official name on the Bill Me Later credit card...
			getElement('txtCCNameOnCard').value = 'Bill Me Later';
		}
		// PayPal
		else if (l_fPayPalChecked)
		{
			// Add PayPal as a credit card type to the dropdown, and select it...
			var optionPPL = document.createElement('option');
			optionPPL.setAttribute('value','12');
			optionPPL.setAttribute('selected', 'selected');
			optionPPL.innerHTML = 'PayPal';
			l_oCCTypes.appendChild(optionPPL);

			// Enter the PayPal credit card number...
			getElement('txtCCNumber').value = getElement('hdnPayPalPayerID').value;

			// Enter the name on the PayPal credit card...
			getElement('txtCCNameOnCard').value = getElement('hdnPayPalName').value;
		}

		// Select the first month from the month dropdown, and the last year from the expiration year dropdown...
		setDropdownValue('selCCExpMonth', 0);								
		setDropdownValue('selCCExpYear', -1);
	}
}

// hide or unhide a given block of content
function toggleVisibleContent(p_szID, p_fShow)
{
	var l_oElement = getElement(p_szID);
	
	if (l_oElement != null)
	{
		if (p_fShow == true)
		{
			l_oElement.style.visibility = 'visible';
			l_oElement.style.display = 'block';
		}
		else
		{
			l_oElement.style.visibility = 'hidden';
			l_oElement.style.display = 'none';
		}
	}
}

//***********************************************************************************************************
//Function Name	:	getDropdownValue
//Purpose		:	To retrieve either the first or the last value in a dropdown form field.
//Prameters		:	p_szElementID	- the element ID
//					p_nOrdinal		- if -1, get the last; otherwise get the value of this ordinal
//***********************************************************************************************************
// TODO -- 1. verify that it IS a dropdown, 2. verify the length
function getDropdownValue(p_szElementID, p_nOrdinal)
{
	var l_sz;
	l_sz = '';

	var l_oElement;	
	l_oElement = getElement(p_szElementID)

	if (l_oElement != null)
	{
		if (p_nOrdinal >= 0)
		{
			l_sz = l_oElement.options[p_nOrdinal].value;
		}
		else
		{
			l_sz = l_oElement.options[l_oElement.length - 1].value;
		}
	}

	return l_sz;
}

function setDropdownValue(p_szElementID, p_nOrdinal)
{
	var l_oElement;
	l_oElement = getElement(p_szElementID)

	if (l_oElement != null)
	{
		l_oElement.value = getDropdownValue(p_szElementID, p_nOrdinal);
	}
}

//**************************************************************************************
//Function Name :  RedirectToURL()
//Purpose       :  To redirect to order feed back page when the place your order button
//                 is clicked in place order page.
//Parameters    :  button name and orderfeedback url
//**************************************************************************************
function RedirectToURL(btnObj, szURL)
{
	try
	{
		btnObj.form.action = szURL;
	}
	catch(e)
	{}
	return true;
}

// for Modify Until Ship -- open
function openOrderDialog(szName, szContainer) {
	var dlg = getElement(szName);
	if (!dlg) return;
	
	var pg = getElement(szContainer);
	if (pg) {
		var pgPos = new PositionInfo(pg);
		dlg.style.left = ((pgPos.getElementLeft() + (pg.offsetWidth / 2)) - (dlg.offsetWidth / 2)) + "px";
		dlg.style.top = (pgPos.getElementTop() + (pg.offsetHeight / 2)) - (dlg.offsetHeight / 2) + "px";
		toggleElement(pg, true, null, null, null, null);
	}

	dlg.style.visibility = 'visible';
	dlg.scrollIntoView(false);
	
}

// for Modify Until Ship -- close
function closeOrderDialog(szName, szContainer, szEditButton, bIsModifiable, szCancelButton, bCanCancel) {
	var pg = getElement(szContainer);
	if (pg) toggleElement(pg, false, szEditButton, bIsModifiable, szCancelButton, bCanCancel);
	
	var dlg = getElement(szName);
	if (!dlg) return;
	
	dlg.style.visibility = 'hidden';
}

// Element disable/enable function (recursive call to support FireFox)
function toggleElement(el, disabledflag, szEditButton, bIsModifiable, szCancelButton, bCanCancel) {

	try {
		if (disabledflag)
		{    
			el.disabled = disabledflag;
		}
		else
		{
			if (el.id == szEditButton)
			{
				el.disabled = !bIsModifiable;
			}
			else if (el.id == szCancelButton)
			{
				el.disabled = !bCanCancel;
			}
			else
			{
				el.disabled = disabledflag;
			}
		}
	}
	catch (E) { }

	if (el.childNodes && el.childNodes.length > 0) {
		for (var x = 0; x < el.childNodes.length; x++) {
			toggleElement(el.childNodes[x], disabledflag, szEditButton, bIsModifiable, szCancelButton, bCanCancel);
		}
	}
}



function updateBillingAddress(name, addrs1, addrs2, city, state, zip, country, phone)
 {
	if (getElement('chkShpAddrs').checked)
	 {
		document.getElementById('txtName').value = name;
		document.getElementById('txtAddr1').value = addrs1;
		document.getElementById('txtAddr2').value = addrs2;
		document.getElementById('txtCity').value = city;
		document.getElementById('selState').value = state;		
		document.getElementById('selCountry').value = country;
		document.getElementById('txtPhone').value = phone;
		if (zip.length == 9) 
		{
			zip = zip.substring(0, 5) + "-" + zip.substring(6 - 1);
		}		
		document.getElementById('txtZip').value = zip;
	}
	else 
	{
		document.getElementById('txtName').value = "";
		document.getElementById('txtAddr1').value = "";
		document.getElementById('txtAddr2').value = "";
		document.getElementById('txtCity').value = "";
		document.getElementById('selState').value = "";
		document.getElementById('txtZip').value = "";
		document.getElementById('selCountry').value = "";
		document.getElementById('txtPhone').value = "";
	}
}
// Select unSelect BML promotion check box
function handle90DayCheckboxOnPlaceOrder(oCheckbox, bRequiresReAuth) {
	if (bRequiresReAuth) {
		var Response = confirm("You have selected the BillMeLater option which requires you to re-authenticate with BillMeLater. Would you like to continue?")
		if (Response) {
			document.getElementById("hdnBMLChanged").value = "1";
			document.forms[0].submit();
		} else {
			if (oCheckbox.checked) {
				oCheckbox.checked = false
			}
			else {
				oCheckbox.checked = true
			}
		}
	}
}


//to show the non- Paypal payment methods
function showNonPaypalPaymentmethod() 
{ 
	var row1 = document.getElementById('tblNonPaypalPaymentInfo');
	var mesage = document.getElementById('viewotherpayment');
	if (row1 != null) {
		if (row1.style.display = 'none') {
			row1.style.display = 'block';
			mesage.style.display = 'none';
		}
	}
	var row2 = document.getElementById('tblBMLPaymentInfo');
	if (row2 != null) {
		if (row2.style.display = 'none') {
			row2.style.display = 'block';
			mesage.style.display = 'none';
		}
	}
}

function RestrictSpace(evt1, evt2) 
{
	if (evt2 == 32 || evt1 == 32)
	{
		return false;
	}
}

