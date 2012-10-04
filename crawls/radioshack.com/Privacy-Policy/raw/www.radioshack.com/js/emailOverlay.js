     // Use jQuery via jQuery(...)
     jQuery(document).ready(function(){
	 
	function emailPopUp(){
		jQuery("#emailoverlaywrap").overlay({
		// some mask tweaks suitable for facebox-looking dialogs
		mask: {
			color: '#999',
			loadSpeed: 'slow',
			opacity: 0.5,
			maskId: 'exposeMask'
		},

		// disable this for modal dialog-type of overlays
		closeOnClick: false,
		fixed: false,
		// load it immediately after the construction
		load: true

		});
		}
		
		jQuery('#emailAddress').click(function(){
			addressVal = jQuery('#emailAddress').val();
			if(addressVal == 'Enter Your E-mail'){
				jQuery('#emailAddress').val('')
			}

		})


	var cookieValue = readCookie("emailOverlaySeen");
	if(cookieValue != null)
	{

	}
	else
	{
		emailPopUp();
		createCookie("emailOverlaySeen","1",30);		
	}
	
	// Start - These functions are for cookie creation, reding cookie and deleting the cookie

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// End - These functions are for cookie creation, reading cookie and deleting the cookie
	
	
});

// Start - Code to limit the user entry of sweepstakes data
	





var formFunc = {};
	formFunc.email = {
		clearEmailVal: function(){
				if($F('emailAddress').include('Enter Your E-mail')){
					$('emailAddress').value = '';
				}
			}
		}
	


var email = {};
email.formValidation = {
	
	checkEmail: function(str){
		var email = str;
		var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

		if (filter.test(str)){
			return true;
		} else {
			return false;
		}
	},

	scanForm: function (formId) {
		if(!email.formValidation.checkEmail($F('emailAddress'))){
			alert('Please enter a valid Email Address');
			return false;
		} else {
			$('targetPage').value = '/emailThanks/index.jsp?e=' + $F('emailAddress') + '&src=' + $F('contestValue') + '&olay=y';
			return true;		
		}
	}
}

