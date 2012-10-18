/* Argos Validation object
 *************************/
argos.validation = (new function(){
	var _validation = this;
	
	// INIT
	$(document).ready(function(){
		var $body = argos.page.elements.body;
		
		if($body.hasClass(".register")) {
			_validation.applyRegitrationValidation();
		}
	});
		
	this.setErrorMessage = function() {
		// What?
	}
	
	this.setErrorField = function(field) {
		// Do something here...
		field.addClass("error");
	}
	
	this.highlightField = function(field) {
		field.className += " error";
		field.focus();
		field.select();
	}


	/* Argos Validation Check Functions
	 **********************************/
	this.check = {
		onlyValidCharacters: function(value, validChars) {
			// Allow only certain characters in a string
			// example usage:	isValidChar('132 \'-.', 'abcdefghijklmnopqrstuvwxyz1234567890 \'-.')"
			var valid = true;
			for (var i = 0; i < validChars.length; i++) {
				if (validChars.indexOf(value.charAt(i).toLowerCase()) == -1) {
					valid = false;
					break;
				}
			}
			return valid;
		},
	
		hasNumbers: function(str) {
			//Check string for numbers
			return str.search(/\d/) >= 0;
		},
	
		isNumeric: function(str) {
			return str.replace(",","").search(/^\d+\.(?=\d)\d*$/) >= 0;
		},
	
		isAlpha: function(str) {
			return str.search(/^[A-Za-z]+$/) >=0;
		},
	
		isAlphaAndNumeric: function(str) {
			return str.search(/^\w+$/) >=0;
		},
			
		// This function checks that the security question and answer have been entered
		// and it validates the length of these fields. 
		validateSecurityAnswer: function(field,text,text2) {
			var valid=true;
			var QAStr = String(field.value).trim();
			field.value = QAStr;
	
			if(QAStr.length == 0) {
				alert("Please enter "+text);
				argos.validation.highlightField(field);
				valid=false;
			} else if(QAStr.length == 1) {
				alert(text2+" must be a minimum of 2 characters/digits.");
				argos.validation.highlightField(field);
				valid=false;
			} else if (QAStr.length >= 2 && QAStr.length > 120) {
				alert("Please enter " + text + " no more than 121 characters.");
				argos.validation.highlightField(field);
				valid=false; 
			}
			
			return valid;
		}, 
		
		// This function checks that the security question and answer have been entered
		// and it validates the length of these fields. 
		validateSecurityQuestion: function(field,text,text2) {
			var valid=true;
			var QAStr = String(field.value).trim();
			field.value = QAStr;
		
			if( QAStr.length == 0 || QAStr == '0' ) {
				alert( "Please select " + text );
				field.focus();
				valid=false;
			}
			return valid;
		}, 
		
		
		// This function checks that a login name has been entered.
		// It also validates the length of the login name.
		login: function(field) {
			var valid=true;
			var loginStr = "" + field.value;
			if (loginStr == "") {
				valid=false;
				argos.validation.highlightField(field);
				alert(argos.validation.messages.EMAIL_BLANK); 
			}
			else if (loginStr.length < 6 && loginStr.length > 254 ) {
				valid=false;
				argos.validation.highlightField(field);
				alert(argos.validation.messages.EMAIL_INVALID); 
			}
			
			return valid;
		},
		
		// This function checks that a login name has been entered.
		// It also validates the length of the login name.
		validateRepeatLogin: function(field, repeatLoginIdField, repeatLoginName ) {
			var valid=true;
			var rln = (repeatLoginName == null ) ? "confirm" : repeatLoginName;
			var repeatLoginNameSC = rln.substring(0,1).toUpperCase() + rln.substring(1);
			var loginStr = "" + field.value;
			var repeatLoginStr = "" + repeatLoginIdField.value;
		
			if(repeatLoginStr == "") {
				valid=false;	
				alert("Please " + rln + " your email address.");
				argos.validation.highlightField(field);
			}
			else if (repeatLoginIdField.value.toLowerCase()!=field.value.toLowerCase()) {
				valid=false;	
				alert( repeatLoginNameSC + " email address must be the same as email address.");
				argos.validation.highlightField(field);
			}
			
			return valid;
		},
		
		// This function checks that a password has been entered when creating an
		// account and it checks the password is the correct length and contains
		// the correct number of digits(2) and alphabetic characters(2). 
		password: function(field) {
			var valid=true;
			var passwordStr = String(field.value).trim();
			var alphaChars = 0;
			var nonAlphaChars = 0;
		
			// Count no of alpha and non alpha chars
			for(var i=0;i<passwordStr.length;i++) {
				if(_validation.check.isAlpha(passwordStr.charAt(i))) alphaChars++;
			else
				nonAlphaChars++;
			}
	
			if(passwordStr == "") {
				alert(_validation.messages.PASSWORD_BLANK);
				_validation.highlightField(field);
				valid=false;
			}
			else if( alphaChars < 2 || nonAlphaChars < 2 || passwordStr.length < 6 ) {
				alert(_validation.messages.PASSWORD_RULES);
				_validation.highlightField(field);
				valid=false;
			} else if (passwordStr.length > 60) {
				alert(_validation.messages.PASSWORD_LENGTH);
				_validation.highlightField(field);
				valid=false;
			}
			
			return valid;
		},
			
		// This function checks that a password has been entered and
		// that the confirm password has been entered and is the same
		// as the entered password.	
		validateRepeatPassword: function(field1,field2) { 
			var valid=true;
			var password1Str = "" + field1.value;
			var password2Str = "" + field2.value;
	
			if(password2Str == "") {
				alert(argos.validation.messages.PASSWORD_MISSING);
				argos.validation.highlightField(field2);
				valid=false;
			} else if (password1Str != password2Str && password2Str.length != 0) {
				alert(argos.validation.messages.PASSWORD_NON_MATCHING);
				argos.validation.highlightField(field2);
				valid=false;
			}
			
			return valid;
		},
		
		// This function checks that a password has been entered when creating an
		// account and it checks the password is the correct length and contains
		// the correct number of digits(2) and alphabetic characters(2). 
		validatePasswordForUpdate: function(field) {
			var valid=true;
			var passwordStr = String(field.value).trim();
			if(passwordStr.length >0 && passwordStr =='************'){
				valid=true;
				return valid;
			}
			return argos.validation.check.password(field);
		},
		
		validateRepeatPasswordForUpdate: function(field1,field2) {
			return argos.validation.validateRepeatPassword(field1,field2);		
		},
		
		// This function checks that the email address has been entered
		// and that only valid characters have been entered.
		isValidEmail: function(field) {
			var valid=true;
			var errorStr = "";
			var atCount = 0;
			var strEmail = String(field.value).trim();
			var emailFilter=/^.+@.+\..{2,6}$/;
			var illegalChars= /[\(\)\ \{\}\!\¬\%\£\€\\`\?\$\^\&\*\|\¦\#\=\+\<\>\,\;\:\\\/\"\[\]]/; // Defect-5570
			var domain;
			field.value = strEmail;
	
			if(strEmail == ""){
				_validation.highlightField(field);
				alert(_validation.messages.EMAIL_BLANK); 
				valid=false;
			}
			else {
				domain = strEmail.substring(strEmail.lastIndexOf(".")+1,strEmail.length);
				for (var i=0;i<strEmail.length;i++) {
					if (strEmail.charAt(i) == "@") atCount++;
				}
			
				if(strEmail=="") {
					valid=false;
			 	}
			 	
				// Check Domain
				else if ((strEmail.lastIndexOf(".") == strEmail.length-1) || !_validation.check.isAlpha(domain)) {	
					valid=false;
				} else if (strEmail !="" && !(emailFilter.test(strEmail)) || atCount > 1 || strEmail.indexOf("..")!=-1 
					|| strEmail.indexOf(".") == 0 || strEmail.indexOf(".@") != -1 || strEmail.indexOf("@.") != -1) {
					valid=false;
				} else if (strEmail.match(illegalChars)) {
					valid=false;
				}
		
				if (!valid) {
					_validation.highlightField(field);
					alert(_validation.messages.EMAIL_INVALID); 
				}
			}
		
			return valid;
		},
		
		validatePWinQA: function(QandAField, PWField, msgText) {
			// This function checks that the security question and answer do not contain password
			var valid=true;
			var QAStr = String(QandAField.value).trim();
			var PWStr = String(PWField.value).trim();
	
			if(QAStr.indexOf(PWStr) != -1) {
				alert(msgText);
				argos.validation.highlightField(QandAField);
				valid=false;
			}
			return valid;
		},
		
		validateName: function(field) {
			// This function checks the first name has been entered and that only
			// valid characters have been entered.
			var valid=true;
			var nameStr = String(field.value).trim();
			field.value=nameStr;
	
			if(nameStr=="") {
				alert(argos.validation.messages.NAME_BLANK);
				argos.validation.highlightField(field);
				valid=false;
			} else if(hasNumbers(trimSpaces(nameStr))) {
				alert(argos.validation.messages.CHARACTERS_ONLY);
				argos.validation.highlightField(field);
				valid=false;
			}
			return valid;
		},
	
		/*
		prepareDeliveryAddressForm: function(eventSrc){
			if(eventSrc=='signInError'){		
				var str = document.getElementById('signInError').href;
				alert(str.substring(str.lastIndexOf("&"), str.length));
				return str.substring(str.lastIndexOf("&"), str.length);
			}
		},
		*/
	
		// Postcode must be numbers and letters and 5 to 7 characters in length including an optional space.
		validatePostcode: function( postcodeField, countryField ) {
			var valid=true;
			var country = $.trim( $(countryField).val() ); 
			var postcode = $.trim( $(postcodeField).val() );
			postcode = postcode.replace(/\s+/, " ").postcode.toUpperCase();
			postcodeField.value = postcode;
			if (country == "United Kingdom") {
				postcode = postcode.replace(/\s/, "");
				if (postcode == "") {
					alert(argos.validation.messages.POSTCODE_BLANK); // Do this better.
					valid = false;
				} else {
					if (postcodeStr.length < 5 || postcodeNSStr.length > 7 || ! postcodeNSStr.match( /^[A-Z\d]{2,4}\d[A-Z]{2}$/ ) ) {
						alert(argos.validation.messages.POSTCODE_INVALID); 
						valid = false;
					}
				}
			}		
			return valid;
		}
	}
	
	
	/* Argos Validation Messages
	 ***************************/
	this.messages = {
		// These should all be set in storetext.
		CHARACTERS_ONLY : "Please enter characters only.",
		EMAIL_BLANK : "Please enter your email address.",
		EMAIL_INVALID : "The email you've entered is invalid. Please check your email address and try again.",
		NAME_BLANK : "Please enter your name.",
		PASSWORD_BLANK : "Please enter a password.",
		PASSWORD_LENGTH : "Password can not be greater than 60 characters",
		PASSWORD_MISSING : "Please confirm your password.",
		PASSWORD_NON_MATCHING : "Confirm password must be the same as your password.",
		PASSWORD_RULES : "Passwords must be at least 6 characters in length, and include 2 digit(s) and 2 letter(s). Please re-enter your password.",
		POSTCODE_BLANK : "Please enter your postcode.",
		POSTCODE_INVALID : "Please enter a valid postcode."
	}
	
});



/* Argos Validation General and (small only) Page Specific Functions
 *******************************************************************/
argos.validation.applySearchValidation = function() {
	// JS to remove '/' char from the search string + upper case
	// + mid (colapse multiple spaces to 1), left and right trim (whitespace)
	var check = argos.validation.check;
	var $input = $("#search form input[type='text']");
	var text = $input.attr("value");
	var newSearchText = text.replace(/\//gi, "");
	var count = newSearchText.split('"').length;
	var leftChr = newSearchText.charAt(newSearchText.indexOf('"')-1);
	var isValidChr = true;
	var valid = true;
	var escapedSearchText;

	//PEP429 Convert one occurance of double quote to IN if after letter or number
	//if there is more than one quote, convert them all to blank
	//or if there is just one quote but it's the first character or is after a space then convert to blank
	if (count > 2 || (leftChr == "" || leftChr == " ") && count == 2) {
		newSearchText = newSearchText.replace(/"/g, '');
	}

	//Now our string either has no quotes or just one so lastly we need to
	//check that the character before the double quote is a valid char. If
	//it isn't, remove it.
	if (!check.isAlpha(leftChr) && !check.isNumeric(leftChr)) {
		isValidChr = false;
		newSearchText = newSearchText.replace(/"/,'')
	}
	//If it's valid, convert the quote to IN
	if (count == 2 && (leftChr != "" || leftChr != " ") && isValidChr) {
		newSearchText = newSearchText.replace(/"/,'IN')
	}
	
	newSearchText = newSearchText.toUpperCase();
	newSearchText = newSearchText.replace(/[\s]+/g, " ");
	$input.attr("value", newSearchText);
	
	// Currently code above does not invalidate code.
	return valid;
}

argos.validation.signInOrJoinForm = function(form) {
	var context = form ? form : $(document.body);
	var $email = $("#logonId", context);
	var $new = $("#customertype1", context);
	var $password = $("#password", context);
	var check = argos.validation.check;
	var valid = true;
	valid = check.login($email.get(0));
	if(valid) valid = check.isValidEmail($email.get(0));
	if(valid && $new.attr("checked") != "checked") valid = check.password($password.get(0));
	return valid;
}
