function chkGftListSignUp(f) {
    var errMsg = "";
    var formValid = true;
    var email = alltrim(document.getElementById("txtEmail").value);
    if (chkElement("txtEmail", "lblEmail") == false) {
        errMsg = errMsg + "Please enter your email address.<br>";
        formValid = false;
    } else {
        if (!isEmail(email)) {
            errMsg = errMsg + "* Your email is invalid.<br>";
            setFieldRed("txtEmail", "lblEmail");
            formValid = false;
        }
    }
    var txtFirstName = alltrim(document.getElementById("txtFirstName").value);
    if (chkElement("txtFirstName", "lblFname") == false) {
        errMsg = errMsg + "Please enter your first name.<br>";
        formValid = false;
    }
    var txtLastName = alltrim(document.getElementById("txtLastName").value);
    if (chkElement("txtLastName", "lblLname") == false) {
        errMsg = errMsg + "Please enter your last name.<br>";
        formValid = false;
    }
    return formValid;
}
function chkFrmEmailSignUp(f)
{
	var errMsg = "";
	var formValid = true;
	var email = alltrim(document.getElementById("txtEmail").value);
	if (chkElement("txtEmail", "lblEmail") == false)
	{
		errMsg = "Please enter your email address.<br>";
		formValid = false;
	} else
	{
		if (!isEmail(email))
		{
			errMsg = "* Your email is invalid.<br>";
			setFieldRed("txtEmail", "lblEmail");
			formValid = false;
		}
	}
	var email2 = alltrim(document.getElementById("txtEmail2").value);
	if (chkElement("txtEmail2", "lblEmail2") == false)
	{
		errMsg = errMsg + "Please verify your email address.<br>";
		formValid = false;
	} else
	{
		if (!isEmail(email2))
		{
			errMsg = errMsg + "* Your email is invalid.<br>";
			setFieldRed("txtEmail2", "lblEmail2");
			formValid = false;
		}
	}
	if ((formValid == true) && (email != email2))
	{
		errMsg = "Your emails do not match.<br>";
		setFieldRed("txtEmail", "lblEmail");
		setFieldRed("txtEmail2", "lblEmail2");
		formValid = false;
	}
	if (chkElement("txtZip", "lblZip") == false)
	{
		errMsg = errMsg + "Please enter your zip code.<br>";
		formValid = false;
	}
	if (formValid == false)
	{
		document.getElementById("errInputNotMatch").innerHTML = errMsg;
	}
	return formValid;
}
function chkFrmCatalogRequest(f)
{
	var FirstName = alltrim(document.getElementById("txtFirstName").value);
	if (FirstName.length < 2)
	{
		alert("Please enter your first name. (least two letters)");
		document.getElementById("txtFirstName").value = FirstName;
		document.getElementById("txtFirstName").focus();
		return false;
	}
	var LastName = alltrim(document.getElementById("txtLastName").value);
	if (LastName.length < 2)
	{
		alert("Please enter your last name. (least two letters)");
		document.getElementById("txtLastName").value = LastName;
		document.getElementById("txtLastName").focus();
		return false;
	}
	var City = alltrim(document.getElementById("txtCity").value);
	if (City.length < 2)
	{
		alert("Please enter your first name. (least two letters)");
		document.getElementById("txtCity").value = City;
		document.getElementById("txtCity").focus();
		return false;
	}
	var xState = alltrim(document.getElementById("txtState").value);
	if (xState == "")
	{
		alert("Please select your state.");
		document.getElementById("txtState").focus();
		return false;
	}
	return true;
}
function chkFrmGetPW(f)
{
	var email = alltrim(document.getElementById("txtGetPWEmail").value);
	if (isEmpty(email))
	{
		alert('Please enter your email.');
		document.getElementById("txtGetPWEmail").value = email;
		document.getElementById("txtGetPWEmail").focus();
		return false;
	} else
	{
		if (!isEmail(email))
		{
			alert('Your email is invalid.');
			document.getElementById("txtGetPWEmail").value = email;
			document.getElementById("txtGetPWEmail").focus();
			return false;
		}
	}
	return true;
}
function chkFrmRegister(f)
{
	var validForm = true;
	var validEmail = true;
	var errMSG = "";
	document.getElementById("dvErrMsg").innerHTML = "";

	if (chkElement("txtFirstName", "lblFirstName") == false) { validForm = false; }
	if (chkElement("txtLastName", "lblLastName") == false) { validForm = false; }
	if (chkElement("txtEmail", "lblEmail") == false)
	{
		validForm = false;
	} else
	{
		if (!isEmail(alltrim(document.getElementById("txtEmail").value)))
		{
			setFieldRed("txtEmail", "lblEmail");
			validEmail = false;
		}
	}
	if (chkElement("txtAddress1", "lblAddress1") == false) { validForm = false; }
	document.getElementById("dvErrPW").innerHTML = "&nbsp;"
	var pw = alltrim(document.getElementById("txtPassword").value);
	if (chkElement("txtPassword", "lblPassword") == false)
	{
		validForm = false;
	} else
	{
		if (pw.length < 6)
		{
			document.getElementById("dvErrPW").innerHTML = "Your password is invalid. (least 6 letters)";
			setFieldRed("txtPassword", "lblPassword");
			validForm = false;
		}
	}
	var vfpw = alltrim(document.getElementById("txtVerifyPassword").value);
	if (chkElement("txtVerifyPassword", "lblVerifyPassword") == false)
	{
		validForm = false;
	} else
	{
		if (vfpw.length < 6)
		{
			document.getElementById("dvErrPW").innerHTML = "Your password is invalid. (least 6 letters)";
			setFieldRed("txtVerifyPassword", "lblVerifyPassword");
			validForm = false;
		}
	}
	if (pw != vfpw)
	{
		document.getElementById("dvErrPW").innerHTML = "Your password doesn't match. Please try again.";
		setFieldRed("txtPassword", "lblPassword");
		setFieldRed("txtVerifyPassword", "lblVerifyPassword");
		validForm = false;
	}
	if (chkElement("txtAddress1", "lblAddress1") == false) { validForm = false; }
	if (chkElement("txtCity", "lblCity") == false) { validForm = false; }
	if (chkElement("txtState", "lblState") == false) { validForm = false; }
	if (chkElement("txtZip", "lblZip") == false) { validForm = false; }
	if (chkElement("txtCountry", "lblCountry") == false) { validForm = false; }
	if (chkElement("txtPhone1", "lblPhone1") == false) { validForm = false; }
	if (validForm == false) { errMSG = "Please enter the missing information.<br>"; }
	if (validEmail == false)  { errMSG = errMSG + "Your email is invalid.<br>" }
	document.getElementById("dvErrMsg").innerHTML = errMSG;
	return validForm;
}
function chkFrmSiteReview(f)
{
	if (document.getElementById("txtName"))
	{
		var xName = alltrim(document.getElementById("txtName").value);
		if (xName.length < 2)
		{
			alert("Please enter your name. (least two letters)");
			document.getElementById("txtName").value = xName;
			document.getElementById("txtName").focus();
			return false;
		}
	}
	if (document.getElementById("txtFirstName"))
	{
		var xFirstName = alltrim(document.getElementById("txtFirstName").value);
		if (xFirstName.length < 2)
		{
			alert("Please enter your first name. (least two letters)");
			document.getElementById("txtFirstName").value = xFirstName;
			document.getElementById("txtFirstName").focus();
			return false;
		}
	}
	if (document.getElementById("txtLastName"))
	{
		var xLastName = alltrim(document.getElementById("txtLastName").value);
		if (xLastName.length < 2)
		{
			alert("Please enter your last name. (least two letters)");
			document.getElementById("txtLastName").value = xLastName;
			document.getElementById("txtLastName").focus();
			return false;
		}
	}
	var xLocation = alltrim(document.getElementById("txtLocation").value);
	if (xLocation.length < 2)
	{
		alert("Please enter your location. (least two letters)");
		document.getElementById("txtLocation").value = xLocation;
		document.getElementById("txtLocation").focus();
		return false;
	}
	if (document.getElementById("txtType"))
	{
		if (document.getElementById('txtType').options[0].selected == true)
		{
			alert("Please choose a Comment Type.");
			document.getElementById("txtType").focus();
			return false;
		}
	}
	if (document.getElementById("txtEmail"))
	{
		var xEmail = alltrim(document.getElementById("txtEmail").value);
		var xConfirmEmail = alltrim(document.getElementById("txtConfirmEmail").value);
		if (xEmail.length < 1)
		{
			alert("Please enter your Email Address.");
			document.getElementById("txtEmail").value = xEmail;
			document.getElementById("txtEmail").focus();
			return false;
		} else {
			if (xEmail !== xConfirmEmail)
			{
				alert("Please confirm your Email Address.");
				document.getElementById("txtConfirmEmail").value = xConfirmEmail;
				document.getElementById("txtConfirmEmail").focus();
				return false;
			}
		}
	}
	if (document.getElementById("terms"))
	{
		if (document.getElementById("terms").checked == false)
		{
			alert("Our terms need to be agreed upon to proceed with your submission.");
			document.getElementById("terms").focus();
			return false;
		}
	}
	if (document.getElementById("ccode"))
	{
		var ccode = alltrim(document.getElementById("ccode").value);
		if (ccode.length < 2)
		{
			alert("Please enter the captcha code");
			document.getElementById("ccode").value = ccode;
			document.getElementById("ccode").focus();
			return false;
		}
	}
	return true;
}
function chkFrmContacts(f){
	document.getElementById("dvErrMSG").style.display = "none";
	document.getElementById("dvErrMSG").innerHTML = "";
	var validForm = true;
	var	validEmail = true;
	var	errMSG = "";
	if (chkElement("txtShipNickname", "lblShipNickname") == false){ 
		setFieldRed("txtShipNickname", "");
		validForm = false;	
	}else{
		resetField("txtShipNickname", "");	
	}
	if (chkElement("txtFirstName", "lblFirstName") == false) {
		setFieldRed("txtFirstName", "");
         validForm = false; 
	}else {
		resetField("txtFirstName", "");	
    }
    if (chkElement("txtLastName", "lblLastName") == false) {
		setFieldRed("txtLastName", "");
        validForm = false;
    }
    else {
		resetField("txtLastName", "");
    }
	
    if (chkElement("txtAddress1", "lblAddress1") == false) {
		setFieldRed("txtAddress1", "");
        validForm = false;
    }
    else {
		resetField("txtAddress1", "");
    }

	if (chkElement("txtCity", "lblCity") == false) {
		setFieldRed("txtCity", "");
	    validForm = false;
	}
	else {
		resetField("txtCity", "");
	}
	
	if (chkElement("txtState", "lblState") == false){	
		setFieldRed("txtState", "");
		validForm = false;	
	}else{
		resetField("txtState", "");
	}
	
	
	if (chkElement("txtCountry", "lblCountry") == false){   
		setFieldRed("txtCountry", "");
		validForm = false; 
	}else{
		resetField("txtCountry", "");	
	}
	
	if (chkElement("txtZip", "lblZip") == false){	
		setFieldRed("txtZip", "");
		validForm = false;	
	}else{
		xmlHttp = new GetXmlHttpObject();
		rnumber=Math.floor(Math.random()*1001);
		state = document.getElementById('txtState').options[document.getElementById('txtState').selectedIndex];
		country = document.getElementById('txtCountry').options[document.getElementById('txtCountry').selectedIndex];
		var url = "/ajaxed/checkzipcode.asp?rqAVSZip=" + document.getElementById("txtZip").value +"&rqState=" + state.value + "&rqCountry=" + country.value+ "&rnum=" + rnumber;
		xmlHttp.open("POST",url,false);
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					if(xmlHttp.responseText == "N"){
						
						validForm = false;	
						errMSG = errMSG + 'Zip code ' + document.getElementById("txtZip").value + ' not found for state ' + state.value;
						resetField("txtZip", "");	
					}else{
						resetField("txtZip", "");	
					}
				}
			}
		}
		xmlHttp.send(null);
	}

	
	validPhone = true;
	if (document.getElementById("txtDayPhone1").value.length > 0 && document.getElementById("txtDayPhone1").value.length < 3){
		validPhone = false;
	}
	if (document.getElementById("txtDayPhone2").value.length > 0 && document.getElementById("txtDayPhone2").value.length < 3){
		validPhone = false;
	}
	if (document.getElementById("txtDayPhone3").value.length > 0 && document.getElementById("txtDayPhone3").value.length < 4){
		validPhone = false;
	}
	if (validPhone == false){
		errMSG = errMSG + "Your phone number is invalid.<br>";
    }

	if (validForm == false){
		if(errMSG.length > 0){
			document.getElementById("dvErrMSG").style.display = "block";
			document.getElementById("dvErrMSG").innerHTML = errMSG;
		}
		return false;
	}else{
		return true;
	}
}
function chkFrmAccount(f)
{
	var validForm = true;
	var validForm2 = true;
	var	validEmail = true;
	var	errMSG1 = "";
	var	errMSG2 = "";
	var	errMSG3 = "";
	var	errMSG4 = "";
	document.getElementById("errMsg1").innerHTML = "";
	if (chkElement("txtEmail", "lblEmail") == false) { validForm = false }
	if (chkElement("txtFirstName", "lblFirstName") == false) { validForm = false }
	if (chkElement("txtLastName", "lblLastName") == false) { validForm = false }
	if (chkElement("txtPassword", "lblPassword") == false) { validForm = false }
	if (chkElement("txtPassword2", "lblPassword2") == false) { validForm = false }
	var pw = alltrim(document.getElementById("txtPassword").value);
	var pw2 = alltrim(document.getElementById("txtPassword2").value);
	if (pw.length < 6)
	{
		errMSG1 = "Your password is invalid. (least 6 letters)";
	} else
	{
		if (pw != pw2)
		{
			errMSG1 = "Your password do not match. please enter again!";
			setFieldRed("txtPassword", "lblPassword");
			setFieldRed("txtPassword2", "lblPassword2");
		}
	}
	if (!isEmail(alltrim(document.getElementById("txtEmail").value)))
	{
		setFieldRed("txtEmail", "lblEmail");
	}
	if (validEmail ==  false)
	{
		errMSG1 = "Your email address is invalid.";
	}
	if (validForm ==  false)
	{
		errMSG1 = "Please enter all required fields(*).";
	}
	document.getElementById("errMsg1").innerHTML = errMSG1;
	document.getElementById("errMsg2").innerHTML = "";
	if (chkElement("txtAddress1", "lblAddress1") == false) { validForm2 = false }
	if (chkElement("txtCity", "lblCity") == false) { validForm2 = false }
	if (chkElement("txtState", "lblState") == false) { validForm2 = false }
	if (chkElement("txtZip", "lblZip") == false) { validForm2 = false }
	if (chkElement("txtCountry", "lblCountry") == false) { validForm2 = false }
	validForm4 = true;
	if (document.getElementById("txtDayPhone1").value.length > 0 && document.getElementById("txtDayPhone1").value.length < 3)
	{
		validForm4 = false;
	}
	if (document.getElementById("txtDayPhone2").value.length > 0 && document.getElementById("txtDayPhone2").value.length < 3)
	{
		validForm4 = false;
	}
	if (document.getElementById("txtDayPhone3").value.length > 0 && document.getElementById("txtDayPhone3").value.length < 4)
	{
		validForm4 = false;
	}
	if (validForm2 == false)
	{
		errMSG2 = "Please enter all required fields(*).";
	}
	if (validForm4 == false)
	{
		errMSG4 = "Please enter a complete phone number (xxx-xxx-xxxx).";
	}
	document.getElementById("errMsg2").innerHTML = errMSG2;
	errMSG3 = chkZipCountry("txtZip", "txtCountry");
	if (errMSG3 != "") {
	    document.getElementById("errMsg2").innerHTML = document.getElementById("errMsg2").innerHTML + '' + errMSG3;
	}
	if (errMSG4 != "") {
	    document.getElementById("errMsg2").innerHTML = document.getElementById("errMsg2").innerHTML + '' + errMSG4;
	}
	validForm = true; 
	if ((errMSG1 != "") || (errMSG2 != "") || (errMSG3 != "") || (errMSG4 != ""))
	{
		validForm = false;
    }
	return validForm;
}
function chkElement(eleIPT, eleLBL)
{
	var eleValid = true;
	if (document.getElementById(eleIPT))
	{
		var eleValue = alltrim(document.getElementById(eleIPT).value);
		if (isEmpty(eleValue))
		{
			document.getElementById(eleIPT).value = eleValue;
			setFieldRed(eleIPT, eleLBL);
			eleValid = false;
		} else {
			resetField(eleIPT, eleLBL);
		}
	}
	return eleValid;
}
function chkElementLen(eleIPT, eleLBL ,eleLen) {
    var eleValid = true;
    var eleValue = alltrim(document.getElementById(eleIPT).value);
    if (eleValue.length > eleLen) {
        setFieldRed(eleIPT, eleLBL);
        eleValid = false;
    } else {
        resetField(eleIPT, eleLBL);
    }
    return eleValid;
}
function chkFrmCC(f)
{
	var formValid = true;
	var PayPalPayment = false;
	if (document.getElementById("txtPPType"))
	{
		PayPalPayment = document.getElementById("txtPPType").checked;
	}
	f.prc.value = "chkCCInfo";
	if (PayPalPayment != true)
	{
		var cvv = document.getElementById("txtSecurityNumber");
		var CardType = '';
		if (document.getElementById("txtCardType"))
		{
			CardType = alltrim(document.getElementById("txtCardType").value);
		}
		var formError = "";
		if (document.getElementById("ccErr"))
		{
			document.getElementById("ccErr").innerHTML = "";
			document.getElementById("ccErr").style.display = "none";
		}		
		if (chkElement("txtCardType", "lblCreditCardType") == false)
		{
			formError = "Please select your payment type.<br>";
			formValid = false;
		}
		if (document.getElementById("lblCCNumer"))
		{
			document.getElementById("lblCCNumer").style.color="#522b1a";
		}
		var CardNumber = '';
		if (document.getElementById("txtCardNumber"))
		{
			CardNumber = alltrim(document.getElementById("txtCardNumber").value);
		}
		if (chkElement("txtCardNumber", "lblCCNumer") == false)
		{
			formError = formError + "Please enter your credit card number.<br>";
			formValid = false;
		} else
		{
				if (isValidCreditCard(CardType, CardNumber))
				{

				} else
				{
					formError = formError + "Your credit card number is invalid!<br>";
					if (document.getElementById("lblCCNumer"))
					{
						document.getElementById("lblCCNumer").style.color="red";
					}
					formValid = false;
				}
		}
		var today=new Date();
		var mth = today.getMonth() + 1;
		var yr = today.getYear() + 1900;
		if ((chkElement("txtCCMonth", "lblExpirationDate") == false) || (chkElement("txtCCYear", "lblExpirationDate") == false))
		{
			formError = formError + "Please enter your card expiration date.<br>";
			formValid = false;
		} else
		{
			if (document.getElementById("txtCCMonth"))
			{
				var ccMonth = document.getElementById('txtCCMonth').options[document.getElementById('txtCCMonth').selectedIndex].value;
				var ccYear = document.getElementById('txtCCYear').options[document.getElementById('txtCCYear').selectedIndex].text;
				var today = new Date();
				ccMonth = ccMonth * 1;
				ccYear = ccYear * 1;
				if (ccYear < today.getFullYear() || ccYear == 0) {
					formError = formError + "Card expiration year invalid";
					setFieldRed("txtCCYear", "lblExpirationDate");
					formValid = false;
				}
				if ((ccYear == today.getFullYear()) && (ccMonth < (today.getMonth() + 1)) || ccMonth == 0) {
					formError = formError + "Card expiration month invalid";
					setFieldRed("txtCCMonth", "lblExpirationDate");
					formValid = false;
				}
			}
		}
		if (document.getElementById("ccErr"))
		{
			if (formValid == false && document.getElementById("ccErr"))
			{
				document.getElementById("ccErr").innerHTML = formError;
				document.getElementById("ccErr").style.display = "block";
			}
		}
	} else {
		if (PayPalPayment == true)
		{
			formValid = true;
		}
	}
	if (document.getElementById('chkCCNotNeeded'))
	{
		if (document.getElementById('chkCCNotNeeded').value == 'Y')
		{
			formValid = true;
		}
	}
	if (formValid == true)
	{
		document.getElementById('ccinfo').submit();
	}
}
function validate(f)
{
	var v;
	v = chkElement(f.name, 'lbl' + f.name);
}
function chkFrmEmailFriend2(f)
{
	var FriendEmail = alltrim(document.getElementById("txtFriendEmail").value);
	if (isEmpty(FriendEmail))
	{
		alert('Please enter your friend email.');
		document.getElementById("txtFriendEmail").value = FriendEmail;
		document.getElementById("txtFriendEmail").focus();
		return false;
	} else
	{
		if (!isEmail(FriendEmail))
		{
			alert('Your friend email is invalid.');
			document.getElementById("txtFriendEmail").value = FriendEmail;
			document.getElementById("txtFriendEmail").focus();
			return false;
		}
	}
	var YourEmail = alltrim(document.getElementById("txtYourEmail").value);
	if (isEmpty(YourEmail))
	{
		alert('Please enter your email address.');
		document.getElementById("txtYourEmail").value = YourEmail;
		document.getElementById("txtYourEmail").focus();
		return false;
	} else
	{
		if (!isEmail(FriendEmail))
		{
			alert('Your email is invalid.');
			document.getElementById("txtYourEmail").value = YourEmail;
			document.getElementById("txtYourEmail").focus();
			return false;
		}
	}
	return true;
}
function chkFrmGiftLists(f)
{
	var glTitle = document.getElementById("txtTitle");
	if (chkElement("txtTitle", "lblTitle") == false)
	{
		document.getElementById("dvErrMSG").innerHTML = "Please enter a title for your gift list.";
		glTitle.focus();
		return false;
	}
	return true;
}
function chkFrmSaveGiftList(f)
{
	var GiftList = alltrim(document.getElementById("GiftList").value);
	if (isEmpty(GiftList))
	{
		alert("Please select a gift list.");
		document.getElementById("GiftList").focus();
		return false;
	}
	if (GiftList == "new")
	{
		var newGiftList = alltrim(document.getElementById("txtNewGiftList").value);
		if (isEmpty(newGiftList))
		{
			alert("Please enter new gift list.");
			document.getElementById("txtNewGiftList").focus();
			return false;
		}
	}
	var sltRecipient = alltrim(document.getElementById("sltRecipient").value);
	if (isEmpty(sltRecipient))
	{
		alert("Please select a recipient.");
		document.getElementById("sltRecipient").focus();
		return false;
	}
	if (sltRecipient == "new")
	{
		var NewRecipient = alltrim(document.getElementById("txtNewRecipient").value);
		if (isEmpty(NewRecipient))
		{
			alert("Please enter new recipient.");
			document.getElementById("txtNewRecipient").focus();
			return false;
		}
	}
	return true;
}
function chkFrmOrderLogin(f)
{
	var errMsg = "";
	var validFrom = true;
	document.getElementById("dvErrMsg").innerHTML = "";
	if (chkElement("txtLoginEmail", "lblLoginEmail") == false)
	{
		errMsg = "Please enter your email.<br>";
		validFrom = false;
	} else
	{
		if (!isEmail(alltrim(document.getElementById("txtLoginEmail").value)))
		{
			errMsg = "Your email is invalid.<br>";
			setFieldRed("txtLoginEmail", "lblLoginEmail")
			validFrom = false;
		}
	}
	if (chkElement("txtLoginPassword", "lblLoginPW") == false)
	{
		errMsg = errMsg + "Please enter your password.<br>";
		validFrom = false;
	} else
	{
		var pw = alltrim(document.getElementById("txtLoginPassword").value);
		if (pw.length < 2)
		{
			errMsg = errMsg + "Your password is invalid. (least 2 letters)";
			setFieldRed("txtLoginPassword", "lblLoginPW")
			validFrom = false;
		}
	}
	if (validFrom == false) {
		document.getElementById("dvErrMsg").innerHTML = errMsg;
	}
	return validFrom;
}
function chkFrmContactUs(f)
{
	var errMsg = "";
	var validFrom = true;
	var validEmail = true;
	document.getElementById("dvErrMsg").innerHTML = "";
	if (chkElement("txtEmail", "lblEmail") == false)
	{
		validFrom = false;
	} else
	{
		if (!isEmail(alltrim(document.getElementById("txtEmail").value)))
		{
			validEmail = false;
			setFieldRed("txtEmail", "lblEmail");
		}
	}
	if (chkElement("txtFirstName", "lblFirstName") == false)
	{
		validFrom = false;
	}
	if (chkElement("txtLastName", "lblLastName") == false)
	{
		validFrom = false;
	}
	if (chkElement("txtZip", "lblZip") == false)
	{
		validFrom = false;
	}
	if (chkElement("txtSubject", "lblSubject") == false)
	{
		validFrom = false;
	}
	if (chkElement("txtQuestion", "lblQuestion") == false)
	{
		validFrom = false;
	}	
	if (validFrom == false) {
		errMsg = "Please enter all the missing information.<br>";
	}
	if (validEmail == false) {
		errMsg = errMsg + "Your email is invalid!<br>";
	}
	if ((validFrom == false) || (validEmail == false)) {
		document.getElementById("dvErrMsg").innerHTML = errMsg;
		validFrom = false;
	}
	return validFrom;
}
function frmChkPromos(f)
{
	document.getElementById("lblErrMsgPromo").innerHTML = "&nbsp;"
	if (chkElement("txtPromoCode", "lblPromoCode") == false)
	{
		document.getElementById("lblErrMsgPromo").innerHTML = "Please enter your source Code!";
		return false;
	}
	return true;
}
function frmChkCert(f)
{
	document.getElementById("lblErrMsgCertificate").innerHTML = "&nbsp;";
	if (chkElement("txtCertCoupon", "lblErrMsgCertificate") == false)
	{
		document.getElementById("lblErrMsgCertificate").innerHTML = "Please enter your code!";
		return false;
	}
	return true;
}
function chkDefaultCountry(iState, iCountry) {
    var myStateArray = createUSAStateArray();
    var myState = iState.value;
    var i;
    for (i = 1; i < myStateArray.length; i++) {
        if (myState == myStateArray[i]) {
            setDefaultCountry(iCountry, myStateArray[0]);
            return true;
        }
    }
    var myStateArray = createCandaStateArray();
    for (i = 1; i < myStateArray.length; i++) {
        if (myState == myStateArray[i]) {
            setDefaultCountry(iCountry, myStateArray[0]);
            return true;
        }
    }
    document.getElementById(iCountry).options[0].selected = true;
    return true;
}
function createCandaStateArray() {
    return (new Array("CANADA", "NU", "AB", "BC", "MB", "NB", "NL", "NS", "NT", "ON", "PE", "QC", "SK", "YT"));
}
function createUSAStateArray() {
    return (new Array("USA", "AA", "AE", "AK", "AL", "AP", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"));
}
function setDefaultCountry(iCountryObj, iCountryName) {
    var j;
    for (j = 0; j < document.getElementById(iCountryObj).options.length; j++) {
        if (document.getElementById(iCountryObj).options[j].text == iCountryName) {
            document.getElementById(iCountryObj).options[j].selected = true;
            return true;
        }
    }
}
function addtobag(div,result)
{
	qty = parseInt(document.getElementById("qty").value);
	sku = document.getElementById("Sku").value;
	if(qty > parseInt(document.getElementById(sku + "_invlevel").value)){
		err_nostock(sku,qty);
		return false;
	}else{
		if (document.getElementById("OutOfStock"))
		{
			var oos = document.getElementById("OutOfStock");
			
			document.getElementById('dateSpan').innerHTML = oos.innerHTML.replace('This item is available to deliver after','');
			var div = document.getElementById("win_warning");
			var divWidth = 339;
			var divHeight = 150;
			var setX = ( getViewportWidth() - divWidth ) / 2;
			var setY = ( getViewportHeight() - divHeight ) / 2;
			if( setX < 0 ) setX = 0;
			if( setY < 0 ) setY = 0;
			div.style.left = setX + "px";
			div.style.top = getViewportScrollY() + setY + "px";
			div.style.display = 'block';
			return false;
		} else {
			loadVeil();
			if (div == 'HF')
			{
				ajxAddtoCart(result);
			}
			if (div == 'PF')
			{
				ajxAddtoCart(result);
			}
			return true;
		}
	}
}
function carttobag(sku,result,qty)
{
	
	if(qty > parseInt(document.getElementById(sku + "_invlevel").value)){
		err_nostock(sku,qty);
		return false;
	}else{
		document.getElementById("Sku").value = sku;
		document.getElementById("ItemNo").value = sku;
		scroll(0,0);
		hideProdInfoVeil(sku);
		ajxAddtoCart(result,qty);
		document.getElementById(sku + "_invlevel").value = parseInt(document.getElementById(sku + "_invlevel").value)-qty;
		return true;
	}
	
}
var last_stock_open = "";
function err_nostock(sku,qty){
	ns = document.getElementById(sku + "_nostock");
	last_stock_open = ns;
	ns.style.display = "block";
	num_avail = parseInt(document.getElementById(sku + "_invlevel").value);
	if(num_avail == 0){
		ns.innerHTML = "This item is out of stock and cannot be purchased at this time.";
	}else{
		ns.innerHTML = "The amount you selected is greater than the amount we have in stock. We only have " + num_avail +" available. Please adjust your quantity.";
	}
}
function hide_nostock(){
	if(last_stock_open){
		last_stock_open.style.display = "none";
	}
}
function val_email(){
	msg = "";
	email = document.newslettersignup.hpemail.value;
	if(email.length <= 0){
		msg = msg + "Please provide an email address before submitting the form\r\n";
	}else{
		if(email.indexOf("@") < 0){
			msg = msg + "Email provided does not appear to be valid\r\n";	
		}else if(email.indexOf(".") < 0){
			msg = msg + "Email provided does not appear to be valid\r\n";	
		}	
	}
	
	if(msg.length > 0){
		alert(msg);	
	}else{
		document.getElementById("newslettersignup").submit();
	}
}
function chkFrmLogin(f){
	var formvalid = true;
	var errMsg = "";
	
	if(chkElement("txtLoginPassword", "lblLoginPassword") == false){
		formvalid = false;
	}
	if(chkElement("txtLoginEmail", "lblEmail") == false){
		formvalid = false;
	}else{
		var email = alltrim(document.getElementById("txtLoginEmail").value);
		if (!isEmail(email)){
			errMsg += "Your email is invalid.<br>"
		}
	}

	if (errMsg != ""){
		document.getElementById("errMsg").innerHTML = errMsg
		document.getElementById("errMsg").style.display = "block";
		formvalid = false;
	}
	return formvalid;
}
function chkFrmBillingSlim(f){
	var formvalid = true;
	var errMsg = "";
	
	if(document.getElementById("create_account_option").checked == true){
		document.getElementById("lerr").innerHTML = "";
		document.getElementById("lerr").style.display = "none";
		
		var email = alltrim(document.getElementById("txtEmail").value);
		emailValid = true;
		if(chkElement("txtEmail", "lblEmail") == false){
			formvalid = false;
		}else if(!isEmail(email)){
			errMsg = errMsg + "Please enter a valid email address (ex:john123@email.com)<br>";
			formvalid = false;
		}	
		if(chkElement("txtPassword", "lblPassword") == false){
			formvalid = false;
			if(chkElement("txtPassword2", "lblPassword2") == false){
				formvalid = false;
			}
		}else if (document.getElementById("CustLog").value == "G") {
			if(chkElement("txtPassword2", "lblPassword2") == false){
				formvalid = false;
			}else{
				
				var xPassword = alltrim(document.getElementById("txtPassword").value);
				var xPassword2 = alltrim(document.getElementById("txtPassword2").value);
				
				if (xPassword.length < 3 || xPassword.length > 16){
					errMsg = errMsg + "Password must be between 3 and 16 characters<br>";
					formvalid = false;
				}else if (xPassword2.length < 3 || xPassword2.length > 16 ){
					errMsg = errMsg +  "Confirm password must be between 3 and 16 characters<br>";
					formvalid = false;
				}else if (xPassword != xPassword2){
					errMsg = errMsg + "Your password and confirm password do not match. Please re-enter your password and confirmed password.<br>";
					formvalid = false;
				}
			}
		}			
	}
	if (errMsg != ""){
		document.getElementById("lerr").innerHTML = errMsg;
		document.getElementById("lerr").style.display = "block";
		formvalid = false;
	}
	return formvalid;
}
function resetField(iTxt, iLabel){
	if (document.getElementById(iTxt + "_required")){
		document.getElementById(iTxt + "_required").style.display = "none";
	}
	if (document.getElementById(iLabel + "_required")){
		document.getElementById(iLabel + "_required").style.display = "none";
	}
}
function setFieldRed(iTxt, iLabel){
	//alert(document.getElementById(iTxt + "_required"));
	if (document.getElementById(iTxt + "_required")){
		document.getElementById(iTxt + "_required").style.display = "block";
	}
	if (document.getElementById(iLabel + "_required")){
		document.getElementById(iLabel + "_required").style.display = "block";
	}
}