// wForms - a javascript extension to web forms.
// Copyright (c) 2007-2010  Veer West LLC http://www.veerwest.com

// document.addEventListener('DOMContentLoaded',enableResumeLater,false);
base2.DOM.Element.addEventListener(document, 'DOMContentLoaded',enableResumeLater,false);

function enableResumeLater() {
	var b = document.getElementById('tfa_resumeLater');
	if(b) {
		/**
		 * Routine for password confirmation check (localized string can be set in localization-*.js file)
		 */
		if(!wFORMS.behaviors.validation.messages.isPasswordConfirmed) {
			wFORMS.behaviors.validation.messages.isPasswordConfirmed = "Your password and confirmation field did not match.";
		}
		wFORMS.behaviors.validation.instance.prototype.isPasswordConfirmed = function(element, password) {
			if(document.getElementById('tfa_confirmPassword')) {
				if(password != document.getElementById('tfa_confirmPassword').value){
					return false;
				}		
			}
			return true;
		}
		/**
		 * Routines for password strength check (localized string can be set in localization-*.js file)
		 */
		if(!wFORMS.behaviors.validation.messages.isPasswordStrong) {
			wFORMS.behaviors.validation.messages.isPasswordStrong = "Please choose a more secure password. Passwords must contain 8 or more characters, with at least 1 letter (a to z), 1 number (0 to 9), and 1 symbol (like '%', '$' or '!').";
		}
		wFORMS.behaviors.validation.instance.prototype.isPasswordStrong = function(element, password) {
			var regexp_array = [/^([^\s]{8,})/, /[a-zA-Z]/i, /[0-9]/, /[\"!#$%&'()*+,-.\/:;<=>?@\[\]\\\^_`{|}~]/];
			for(var i =0; i<regexp_array.length; i++){
				if(!password.match(regexp_array[i])){
					return false;
				}
			}
			return true;			
		}
		if(!wFORMS.behaviors.validation.messages.isPasswordMedium) {
			wFORMS.behaviors.validation.messages.isPasswordMedium = "Please choose a more secure password. Passwords must contain 4 or more characters, with at least 1 letter (a to z) and 1 number (0 to 9).";								
		}
		wFORMS.behaviors.validation.instance.prototype.isPasswordMedium = function(element, password) {
			var regexp_array = [/^([^\s]{4,})/, /[a-zA-Z]/i, /[0-9]/]; 
			for(var i =0; i<regexp_array.length; i++){
				if(!password.match(regexp_array[i])){
					return false;
				}
			}
			return true;			
		}
		if(!wFORMS.behaviors.validation.messages.isPasswordWeak) {
			wFORMS.behaviors.validation.messages.isPasswordWeak   = "Your password cannot be empty.";
		}					
		wFORMS.behaviors.validation.instance.prototype.isPasswordWeak   = function(element, password) {
			var regexp_array = [/^([^\s]{1,})/];
			for(var i =0; i<regexp_array.length; i++){
				if(!password.match(regexp_array[i])){
					return false;
				}
			}
			return true;
		}

		// Click handler for the link that opens the Save&Resume fieldset.
		var l = document.getElementById('tfa_saveForLaterLink');
		if(l) {	
			l.onclick = function() {
				
				// Get form element, necessary to retrieve instance.
				f = this;
				while(f && f.tagName!='FORM') {
					f = f.parentNode;
				}
				
				elem = document.getElementById('tfa_saveForLater');
				if(!elem.checked) {
					elem.checked = true;
				}
				if(elem.scrollIntoView) {	
					elem.scrollIntoView();
				} else {
					location.hash="#tfa_saveForLater";
				}
				
				var b = wFORMS.getBehaviorInstance(f,"switch");
				b.run(null, elem);
			}
		}
		
		// Save button click handler.
		b.onclick = function(e) { 
			var f = this.form;
			
			// Save & Resume should not run the full validation. Only resume email and resume password check.
			var bv = wFORMS.getBehaviorInstance(f,"validation");
			if(bv) {				
				// Overwrite the default validation rules, keep a backup. 
				var _savedRules = bv.behavior.rules;
				bv.behavior.rules = [];
				
				// Add email validation on save email field.
				bv.behavior.rules.isEmail 	 = { selector: "#tfa_resumeEmail", check: 'validateEmail' }
				bv.behavior.rules.isRequired = { selector: "#tfa_resumeEmail", check: 'validateRequired' }
				
				// passwordStrength is a server-side configuration setting, set for javascript evaluation in final.xsl.
				if(!wFORMS.behaviors.validation.passwordStrength) {
					wFORMS.behaviors.validation.passwordStrength = 'low';
				}
				
				// Set validation rules according to desired password strength.
				switch(wFORMS.behaviors.validation.passwordStrength) {
					case 'high':
						bv.behavior.rules.isPasswordStrong = { selector: "#tfa_resumePassword", check: 'isPasswordStrong' }
						break;
		  	        case 'medium':
		  	        	bv.behavior.rules.isPasswordMedium = { selector: "#tfa_resumePassword", check: 'isPasswordMedium' }
		  	        	break;
					case 'low':
					default:
						bv.behavior.rules.isPasswordWeak = { selector: "#tfa_resumePassword", check: 'isPasswordWeak' }
				}
				// Add validation rule to check for password confirmation match
				bv.behavior.rules.isPasswordConfirmed = { selector: "#tfa_resumePassword", check: 'isPasswordConfirmed' }
				
			} 
			// Bypass multi-page unload warning
			var b = wFORMS.getBehaviorInstance(f,"paging");
			if(b) { b.behavior.warnOnUnload=false; }
			
			// Run validation
			if(bv && bv.run(null,f)){
				this.value=" ... "; 
				f.submit();
			} else {
				// restore default validation rules.
				if(bv) {
					bv.behavior.rules = _savedRules;
				}
			}
		};
	}
}

/**
 * Display of validation error. Alert message + scroll into view of the first field in error.
 */
wFORMS.behaviors.validation.onFail = function(bInstance) {
	var m = wFORMS.behaviors.validation.messages.notification;
	var firstErrorId = null;
	var c = 0;
	for (var id in bInstance.elementsInError) {
		c++;
		if(!firstErrorId) 
			firstErrorId = id;
	}
	m = m.replace('%%', c);
	
	var elem = document.getElementById(firstErrorId);
	if(elem.scrollIntoView) {	
		elem.scrollIntoView();
	} else {
		location.hash="#"+firstErrorId;
	}
	alert(m);
}
