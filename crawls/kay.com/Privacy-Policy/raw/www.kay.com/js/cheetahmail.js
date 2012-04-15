// functions for cheetah mail

function cheetahMailTextBoxOnClick(){
	if (document.EmailSignup.email.value == 'Enter email address'){
		document.EmailSignup.email.value = '';
	}
}

function cheetahMailTextBoxOnBlur(){
	if (document.EmailSignup.email.value == ''){
		document.EmailSignup.email.value = 'Enter email address';
	}
}

function submitCheetahEmail(){
	if (isValidEmail(document.EmailSignup.email.value)){
		//reUrl = location.protocol + '//' + location.host + '/EmailSignUpThankYouView?langId=-1&storeId=10101&catalogId=10001&email=' + document.EmailSignup.email.value;
		//document.EmailSignup.re.value = reUrl;
		document.EmailSignup.submit();
	}else{
		alert('The email address format is invalid.  Please enter a valid email address.');
	}
}