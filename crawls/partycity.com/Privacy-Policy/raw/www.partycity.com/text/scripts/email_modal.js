
function repositionEmailModal () {
	var wrapper_div = document.getElementById('emailSignupModalWrapper');
	var content_div = document.getElementById('emailSignupModalContent');

	if (wrapper_div.style.display == "block") {
		var left = Math.floor(document.body.clientWidth / 2) - Math.floor(wrapper_div.clientWidth / 2);
		wrapper_div.style.left = left + "px";

		left += 5;
		content_div.style.left = left + "px";
	}
}

function getEmailModalCookie(name) {
	var i, x , y, ARRcookies = document.cookie.split(";");
	for (i = 0;i < ARRcookies.length; i ++) {
		x =  ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g,"");

		if (x == name) {
			return unescape(y);
		}
	}
}

function setEmailModalCookie(name, value, exp_days) {
	var exp_date = new Date();
	exp_date.setDate(exp_date.getDate() + exp_days);

	var new_cookie = name + "=" +  escape(value) + ((exp_days == null) ? "" : "; expires=" + exp_date.toUTCString()) + ";";
	document.cookie = new_cookie;
}

function showEmailModal() {
	var wrapper_div = document.getElementById('emailSignupModalWrapper');
	var content_div = document.getElementById('emailSignupModalContent');

	wrapper_div.style.display = 'block';
	content_div.style.display = 'block';

	repositionEmailModal();

	setEmailModalCookie('email_modal_session_popped', 'Y');
}

function hideEmailModal() {
	var wrapper_div = document.getElementById('emailSignupModalWrapper');
	var content_div = document.getElementById('emailSignupModalContent');

	wrapper_div.style.display = 'none';
	content_div.style.display = 'none';
}

function validateEmailModalForm() {
	var email = document.getElementById('email_modal_field');
	var valid = (email.value != '' && email.value != 'Enter Email Address');

	if (valid === true) {
		setEmailModalCookie('email_modal_signup_completed', 'Y', 365 * 5);
		hideEmailModal();
	}

	return valid;
}

/*
var popped_for_session   = (getEmailModalCookie('email_modal_session_popped') == 'Y');
var submitted_on_machine = (getEmailModalCookie('email_modal_signup_completed') == 'Y');

if (popped_for_session === false && submitted_on_machine === false) {
	showEmailModal();
}
*/