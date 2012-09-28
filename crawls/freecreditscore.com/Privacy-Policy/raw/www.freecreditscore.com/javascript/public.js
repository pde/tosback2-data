/* note: using jQuery() instead of $() */

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

(function() {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

jQuery(function() {
	jQuery("#username").val("");
	jQuery("#username").focus(function() {
		jQuery("#usernameLabel").css("display","none");
	})
	.blur(function() {
		if (jQuery("#username").val() == "")
		jQuery("#usernameLabel").css("display","block");
	});
	jQuery("#password").focus(function() {
		jQuery("#passwordLabel").css("display","none");
	})
	.blur(function() {
		if (jQuery("#password").val() == "")
		jQuery("#passwordLabel").css("display","block");
	});
	
	jQuery("#signIn").click(function(){
		if(jQuery("#username").val()==""){
			window.location="/sign-in";
		}
		else{
			jQuery("#memberLogin").submit();
		}
	});

	jQuery("#memberLogin #username, #memberLogin #password, #memberLogin #signIn").keyup(function(event){
		if(event.keyCode == 13){
			jQuery("#signIn")[0].click();
		}
	});
	if(jQuery("#BlueFunnelOP1, #BlueFunnelOP2, #BlueFunnelAS, #BlueFunnelOP2-alt").length > 0){
		blueFunnelErrorReplacement();
	}
});

jQuery('.showhide').click(function () {
    jQuery(this).parent().next().toggle("fast");
if (jQuery(this).html() == "[ + ]")
    jQuery(this).html("[ - ]");
else
    jQuery(this).html("[ + ]");
});

function blueFunnelErrorReplacement() { // must be called on DOM ready event
	var validator = $.data($('form')[0], 'validator');
	var settings = validator.settings;

	// override errorPlacement()
	var oldErrorFunction = settings.errorPlacement;
	settings.errorPlacement = function (error, inputElement) {
		switch(inputElement.attr("id")) {
			case "VerificationInfoDOB_DOBMonth":
			case "VerificationInfoDOB_DOBDay":
			case "CreditCardInfo_ExpirationMonth":
			case "Phone1":
			case "Phone2":
				break;
			default:
				oldErrorFunction(error, inputElement);
		}
	};
}
