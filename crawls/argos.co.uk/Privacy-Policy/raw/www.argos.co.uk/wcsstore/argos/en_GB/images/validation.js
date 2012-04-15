// initialise namespace
if (!argos) var argos = {};

argos.validation = {

	// This function checks that a password has been entered and
	// that the confirm password has been entered and is the same
	// as the entered password.
	
	validateRepeatPassword: function(field1,field2) { 

		var ERROR_REPEAT_PASSWORD_MISSING = 'Please confirm your password.';
		var ERROR_REPEAT_PASSWORD_NON_MATCHING = 'Confirm password must be the same as your password.';

		sendForm=true;

		var password1Str = "" + field1.value;
		var password2Str = "" + field2.value;

		if(password2Str == "") {
			alert( ERROR_REPEAT_PASSWORD_MISSING );
			highlightField(field2);
			sendForm=false;
		} else if (password1Str != password2Str && password2Str.length != 0) {
			alert( ERROR_REPEAT_PASSWORD_NON_MATCHING );
			highlightField(field2);
			sendForm=false;
		}
	},
	 

	// This function checks that the security question and answer have been entered
	// and it validates the length of these fields. 

	validateSecurityAnswer: function(field,text,text2) {

		sendForm=true;

		var QAStr = trimOutsideSpaces(""+field.value);

		field.value = QAStr;

		if(QAStr.length == 0) {
			alert("Please enter "+text);
			highlightField(field);
			sendForm=false;
		} else if(QAStr.length == 1) {
			alert(text2+" must be a minimum of 2 characters/digits.");
			highlightField(field);
			sendForm=false;
		} else if (QAStr.length >= 2 && QAStr.length > 120) {
			alert("Please enter " + text + " no more than 121 characters.");
			highlightField(field);
			sendForm=false; 
		}
	}, 
	
	// This function checks that the security question and answer have been entered
	// and it validates the length of these fields. 

	validateSecurityQuestion: function(field,text,text2) {
		sendForm=true;
		
		var QAStr = trimOutsideSpaces(""+field.value);

		field.value = QAStr;
	
		if( QAStr.length == 0 || QAStr == '0' ) {
			alert( "Please select " + text );
			field.focus();
			sendForm=false;
		}
	}, 
	
	
	// This function checks that a login name has been entered.
	// It also validates the length of the login name.
	validateLogin: function(field) {

		sendForm=true;
		
		var loginStr = "" + field.value;
		
		if (loginStr == "") {
			sendForm=false;
			highlightField(field);
			alert( "Please enter your email address" ); 
		}
		else if (loginStr.length < 6 && loginStr.length > 254 ) {
			sendForm=false;
			highlightField(field);
			alert( "The email you’ve entered is invalid. Please check your email address and try again." ); 
		}
	},
	
	// This function checks that a login name has been entered.
	// It also validates the length of the login name.
	validateRepeatLogin: function(field, repeatLoginIdField, repeatLoginName ) {

		sendForm=true;
		//var repeatLoginName;
	
		if ( repeatLoginName == null )   {
			repeatLoginName = "confirm";
		}
		
		var repeatLoginNameSC = repeatLoginName.substring(0,1).toUpperCase() + repeatLoginName.substring(1);
	
		var loginStr = ""+field.value;
		var repeatLoginStr = ""+repeatLoginIdField.value;
	
		if(repeatLoginStr == "") {
			sendForm=false;	
			alert("Please " + repeatLoginName + " your email address.");
			highlightField(field);
		}
		else if (repeatLoginIdField.value.toLowerCase()!=field.value.toLowerCase()) {
			sendForm=false;	
			alert( repeatLoginNameSC + " email address must be the same as email address.");
			highlightField(field);
		}
	},
	
	// This function checks that a password has been entered when creating an
	// account and it checks the password is the correct length and contains
	// the correct number of digits(2) and alphabetic characters(2). 
	validatePassword: function(field) {

		sendForm=true;

		var passwordStr = trimOutsideSpaces( "" + field.value );
		
		var alphaChars = 0;
		var nonAlphaChars = 0;
	
		// Count no of alpha and non alpha chars
		for(var i=0;i<passwordStr.length;i++) {
			if(isAlpha(passwordStr.charAt(i))) alphaChars++;
		else
			nonAlphaChars++;
		}

		if(passwordStr == "") {
			alert("Please enter a password.");
			highlightField(field);
			sendForm=false;
		}
		else if( alphaChars < 2 || nonAlphaChars < 2 || passwordStr.length < 6 ) {
			alert("Passwords must be at least 6 characters in length, and include 2 digit(s) and 2 letter(s). Please re-enter your password.");
			highlightField(field);
			sendForm=false;
		} else if (passwordStr.length > 60) {
			alert("Password can not be greater than 60 characters");
			highlightField(field);
			sendForm=false;
		}
	},
	
	// This function checks that a password has been entered when creating an
	// account and it checks the password is the correct length and contains
	// the correct number of digits(2) and alphabetic characters(2). 
	validatePasswordForUpdate: function(field) {

		sendForm=true;

		var passwordStr = trimOutsideSpaces( "" + field.value );
		
		if(passwordStr.length >0 && passwordStr =='************'){
			sendForm=true;
			return ;
		}
		
		argos.validation.validatePassword(field);
		
	},
	
	validateRepeatPasswordForUpdate: function(field1,field2) {
		argos.validation.validateRepeatPassword(field1,field2);		
	},
	
	// This function checks that the email address has been entered
	// and that only valid characters have been entered.
	isValidEmail: function(field) {

		sendForm=true;
	
		var strEmail = trimOutsideSpaces( "" + field.value );
		
		field.value = strEmail;
		
		if(strEmail == ""){
			highlightField(field);
			alert( "Please enter your email address." ); 
			sendForm=false;
			return;
		}
		
		var errorStr = "";
		var atCount = 0;
		var domain = strEmail.substring(strEmail.lastIndexOf(".")+1,strEmail.length);
		
		for (var i=0;i<strEmail.length;i++) {
			if (strEmail.charAt(i) == "@") atCount++;
		}
		
		var emailFilter=/^.+@.+\..{2,6}$/;
		//\'Defect-5570
		var illegalChars= /[\(\)\ \{\}\!\¬\%\£\€\\`\?\$\^\&\*\|\¦\#\=\+\<\>\,\;\:\\\/\"\[\]]/;
	
		if(strEmail=="") {
			sendForm=false;
	 	}
	 	
		// Check Domain
		else if ((strEmail.lastIndexOf(".") == strEmail.length-1) || !isAlpha(domain)) {	
			sendForm=false;
		} else if (strEmail !="" && !(emailFilter.test(strEmail)) || atCount > 1 || strEmail.indexOf("..")!=-1 
			|| strEmail.indexOf(".") == 0 || strEmail.indexOf(".@") != -1 || strEmail.indexOf("@.") != -1) {
			sendForm=false;
		} else if (strEmail.match(illegalChars)) {
			sendForm=false;
		}

		if ( ! sendForm ) {
			highlightField(field);
			alert( "The email you’ve entered is invalid. Please check your email address and try again." ); 
		}
	
	},
	
	validatePWinQA: function(QandAField, PWField, msgText) {

		// This function checks that the security question and answer do not contain password
		sendForm=true;

		var QAStr = trimOutsideSpaces(""+QandAField.value);
		var PWStr = trimOutsideSpaces(""+PWField.value);

		if(QAStr.indexOf(PWStr) != -1) {
			alert(msgText);
			highlightField(QandAField);
			sendForm=false;
		}
	},
	
	validateName: function(field) {
		// This function checks the first name has been entered and that only
		// valid characters have been entered.
		sendForm=true;
		var nameStr = trimOutsideSpaces(""+field.value);
		field.value=nameStr;

		if(nameStr=="") {
			alert("Please enter your name.");
			highlightField(field);
			sendForm=false;
		} else if(hasNumbers(trimSpaces(nameStr))) {
			alert("Please enter characters only.");
			highlightField(field);
			sendForm=false;
		}
	},
		

	prepareDeliveryAddressForm: function(eventSrc){			
		if(eventSrc=='signInError'){		
			var str = document.getElementById('signInError').href;
			alert(str.substring(str.lastIndexOf("&"), str.length));
			return str.substring(str.lastIndexOf("&"), str.length);
		}
	},

	// Postcode must be numbers and letters and 5 to 7 characters in length including an optional space.
	validatePostcode: function( postcodeField, countryField ) {
	
		sendForm=true;

		var countryStr = $.trim( $( countryField ).val() ); 

		var postcodeStr = $.trim( $( postcodeField ).val() );
		postcodeStr = postcodeStr.replace( /\s+/, " " );
		postcodeStr = postcodeStr.toUpperCase();

		postcodeField.value = postcodeStr;
		
		var errorStr = "";
		
		if ( countryStr == "United Kingdom" ) {
			if ( postcodeStr == "" ) {
				errorStr = "Please enter your postcode.";
			} else {
				
				var postcodeNSStr = postcodeStr.replace( /\s/, "" );
				
				if ( postcodeNSStr.length < 5 || 
					postcodeNSStr.length > 7 || 
					! postcodeNSStr.match( /^[A-Z\d]{2,4}\d[A-Z]{2}$/ ) ) {
					errorStr = "Please enter a valid postcode.";
				}
			
			}
		}
		
		if ( errorStr != "" ) {
			sendForm = false;
			alert( errorStr );
			highlightField( postcodeField );
		}
	}

};


