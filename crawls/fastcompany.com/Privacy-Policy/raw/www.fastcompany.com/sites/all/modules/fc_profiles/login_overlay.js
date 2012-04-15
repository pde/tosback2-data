function add_login_or_signup(){
	$('.curr_issue_wrap').after('<div id="login_message_wrap"><a id="not_logged_link" class="modalInput login_signup" href="#" rel="#login_form_overlay" alt="login or sign up">Login</a> | <a id="not_logged_link" class="modalInput login_signup" href="#" rel="#login_form_overlay" alt="login or sign up">Sign up</a> to Comment</div>');
}

function change_post_button_text(){
	$("#forgotten_pass").click(function(){
	  $("#forgot_pass").html('Forgot Password?');
	  $("#left_forms #user-pass #edit-submit").attr("value","");
	  $("#left_forms #user-pass").slideDown("slow");
	});
}

function forgot_pass_word_field(){
	$('#left_forms form#user-pass #edit-name').val('Screen name or Email');
	
	$('#left_forms form#user-pass #edit-name').focus(function() {
		if($('#left_forms form#user-pass #edit-name').val() == 'Screen name or Email') {
			$('#left_forms form#user-pass #edit-name').val('');
		}
	});
	$('#left_forms form#user-pass #edit-name').blur(function() {
		if($('#left_forms form#user-pass #edit-name').val() == '') {
			$('#left_forms form#user-pass #edit-name').val('Screen name or Email');
		}
	});
}

function hide_overlay_ads(the_ie_version){
  if(navigator.appName == "Microsoft Internet Explorer" && the_ie_version == 7){
    $('div#usertoolbar').addClass('hide_user_login_ie');
    $('div#usertoolbar_inner1').addClass('dark_overlay_background');
    $('div#usertoolbar_inner2').addClass('dark_overlay_background');
  }
  $('div.banner-advt').css('visibility','hidden');
  $('div#block-fc_ads-fc_ads_imu1').css('visibility','hidden');
  $('div.banner-advt').css('display','none');
  $('div#block-fc_ads-fc_ads_pencil').css('visibility','hidden');
}

function show_overlay_ads(the_ie_version){
  if(navigator.appName == "Microsoft Internet Explorer" && the_ie_version == 7){
    $('div#usertoolbar').removeClass('hide_user_login_ie');
    $('div#usertoolbar_inner1').removeClass('dark_overlay_background');
    $('div#usertoolbar_inner2').removeClass('dark_overlay_background');
  }
  $('div.banner-advt').css('visibility','visible');
  $('div#block-fc_ads-fc_ads_imu1').css('visibility','visible');
  $('div.banner-advt').css('display','block');
  $('div#block-fc_ads-fc_ads_pencil').css('visibility','visible');
}

function hide_edit_overlay_ads(){
  $('div#block-fc_ads-fc_ads_imu1').css('visibility','hidden');
}

function show_edit_overlay_ads(){
  $('div#block-fc_ads-fc_ads_imu1').css('visibility','visible');
}

function display_overlay_as_block() {
  $('div#sitewrapper div#content div#center').addClass('display_edit_overlay_blocked');
}
function remove_overlay_as_block() {
  $('div#sitewrapper div#content div#center').removeClass('display_edit_overlay_blocked');
}


$(document).ready(function() {
  
  /*if(readCommentCookie('fastcache') == 'false'){
    add_login_or_signup();
  }*/

	change_post_button_text();
	forgot_pass_word_field();
	var split_url = location.href.split('/');
  var ie_version = parseFloat($.browser.version);
  
  
	// IE6 - Forward any users to Login landing page
	if(($.browser.msie && ie_version < 7) || (split_url[3]=='login')){
  }else{
	
    if ($('#login_form_overlay').attr('class') == 'modal') {
      var triggers = $("a.modalInputSignup").overlay({

        // some expose tweaks suitable for modal dialogs
        expose: {
          color: '#333',
          loadSpeed: 0,
          opacity: 0.5
        },
        onLoad: function() {
          hide_overlay_ads(ie_version);
        },
        onClose: function() { 
          show_overlay_ads(ie_version);
        },

        closeOnClick: false
      });
    }

		var edittriggers = $("a.modalInput").overlay({

			// some expose tweaks suitable for modal dialogs
			expose: {
				color: '#333',
				loadSpeed: 0,
				opacity: 0.0
			},
      onLoad: function() {
        hide_edit_overlay_ads();
        
        if($.browser.msie && ie_version == 7){
			display_overlay_as_block();
		}
      },
      onClose: function() { 
        show_edit_overlay_ads();
        
        if($.browser.msie && ie_version == 7){
			remove_overlay_as_block()
		}
      },
			left:180,
			top:0,
			closeOnClick: false
		});
	}
	
	//------------------------------------------------------------/
	//------ "Login Form" field value formatting - START ---------/
	//------------------------------------------------------------/

	//FOCUS
	$("form#profilLoginForm #edit-name").focus(function() {
		if ( $(this).val() == "Email"){
			$(this).val('');
		}
	});

	$("form#profilLoginForm #edit-pass").focus(function() {
		$(this).css('background','none');
		$(this).removeClass('loginpass_field_image')
	});

	//BLUR
	$("form#profilLoginForm #edit-name").blur(function() {
		if ( $(this).val() == ""){
			$(this).val('Email');
		}
	});

	$("form#profilLoginForm #edit-pass").blur(function() {
		if ( $(this).val() == ""){
		   $(this).addClass('loginpass_field_image');
		}
	});

	//----------------------------------------------------------/
	//------ "Login Form" field value formatting - END ---------/
	//----------------------------------------------------------/


	//----------------------------------------------------------/
	//------ "Signup Form" Field Value Formatting - START ------/
	//----------------------------------------------------------/

	// REMOVE ANY VALUES
	$('form#profileSignUpForm #edit-regPass').val('');

	// DISPLAY THE TEXT PASSWORD FIELD
	$('form#profileSignUpForm #edit-regPassClear').hide();
	$('form#profileSignUpForm #edit-regPass').show();

	// FOCUS
	$("form#profileSignUpForm #edit-regFullName").focus(function() {
		$(this).css('background','none');
		$(this).removeClass('fullname_field_image');
	});
	$("form#profileSignUpForm #edit-regEmail").focus(function() {
		$(this).css('background','none');
		$(this).removeClass('email_field_image');
	});

	$("form#profileSignUpForm #edit-regPass").focus(function() {
		$('form#profileSignUpForm #edit-regPass').css('background','none');
		if ( $(this).val() == ""){
			$(this).css('background','none');
			$(this).removeClass('pass_field_image');
		}
	});	


	//BLUR

	$("form#profileSignUpForm #edit-regFullName").blur(function() {
		if ( $(this).val() == ""){
			$(this).addClass('fullname_field_image');
		}
	});

	$("form#profileSignUpForm #edit-regEmail").blur(function() {
		if ( $(this).val() == ""){
			$(this).addClass('email_field_image');
		}
	});

	$('form#profileSignUpForm #edit-regPass').blur(function() {
		if($('form#profileSignUpForm #edit-regPass').val() == '') {
		   $('form#profileSignUpForm #edit-regPass').css('background','transparent url(../../themes/fc_v1/images/password_field.gif) no-repeat scroll 0 0;');
		   $(this).addClass('pass_field_image');
		}
	});

	//----------------------------------------------------------/
	//------ "Signup Form" Field Value Formatting - END --------/
	//----------------------------------------------------------/


	//----------------------------------------------------------/
	//----------- FORM SUBMISSION EVENTS - START ---------------/
	//----------------------------------------------------------/

    // bind to the form's submit event 
    $('#left_forms form#user-pass #edit-submit').click(function() { 
        // inside event callbacks 'this' is the DOM element so we first 
        // wrap it in a jQuery object and then invoke ajaxSubmit 
        
      $('#forgotpasserr').html('');
			var current_email_field = $('#left_forms form#user-pass #edit-name').val();
      var values = $('#user-pass').serialize();
      if(isValidEmailAddress(current_email_field)){
        var quickform_pw_return = function(data) {

          switch(data){
          case 'neemail':
            $('#left_forms form#user-pass #edit-name').css('border-color','red').css('border-style','solid');
            $("#user-pass #edit-name-wrapper").after('<div id="forgotpasserr">Email is not registered</div>');
            return false;
            break;
          case 'isrealemail':	
            $('#left_forms form#user-pass').submit();
            return true;
            break;
          }
        }
        $.post('/validateforgotpw', values, quickform_pw_return, "json");
			}else{
        $('#left_forms form#user-pass #edit-name').css('border-color','red').css('border-style','solid');
        $("#user-pass #edit-name-wrapper").after('<div id="forgotpasserr">Improper email format</div>');
      }
		
			return false;
	});



    // bind to the form's submit event 
    $('form#profilLoginForm #edit-submit').click(function() { 
        // inside event callbacks 'this' is the DOM element so we first 
        // wrap it in a jQuery object and then invoke ajaxSubmit 
        
		var values = $('#profilLoginForm').serialize();
		var quickform_return = function(data) {

				switch(data){
				case 'email':
					$('form#profilLoginForm #edit-name').css('border-color','red').css('border-style','solid');
					$('form#profilLoginForm #edit-pass').css('border-color','red').css('border-style','solid');
					$("#catch_err").html("Incorrect Email or Password");
					$('#edit-field-profile-full-name-0-value-wrapper').append('<div>WOW!</div>');
					return false;
					break;
				case 'pass':
					$('form#profilLoginForm #edit-name').css('border-color','red').css('border-style','solid');
					$('form#profilLoginForm #edit-pass').css('border-color','red').css('border-style','solid');
					$("#catch_err").html("Incorrect Email or Password");
					return false;
					break;
				case 'welcome':
					$('form#profilLoginForm').submit();
					return true;
					break;
				}
		}
		$.post('/validatelogin', values, quickform_return, "json");
		
		return false;
	});
	
	
	$('form#profileSignUpForm #edit-submit').click(function() { 
	// inside event callbacks 'this' is the DOM element so we first 
	// wrap it in a jQuery object and then invoke ajaxSubmit 
	
	// Clear previous error messages/highlighting
	$('.email_exists_blurb').html('').css('border','');
	$('.pass_exists_blurb').html('').css('border','');
	$('form#profileSignUpForm #edit-regEmail').css('border-color','').css('border-style','');
	$('form#profileSignUpForm #edit-regPass').css('border-color','').css('border-style','');
	
	var values = $('#profileSignUpForm').serialize();
	var quickform_signup_return = function(data) {

			switch(data){
			case 'baduser':
				$('form#profileSignUpForm #edit-regFullName').css('border-color','red').css('border-style','solid');
				return false;
				break;
			case 'exists':
				$('form#profileSignUpForm #edit-regEmail').css('border-color','red').css('border-style','solid');
				$('#edit-regEmail-wrapper').prepend('<div class="email_exists_blurb">There is an existing account with this email address.</div>');
				return false;
				break;
			case 'invalidemail':
				$('form#profileSignUpForm #edit-regEmail').css('border-color','red').css('border-style','solid');
				$('#edit-regEmail-wrapper').prepend('<div class="email_exists_blurb">Not a proper email address.</div>');
				return false;
				break;
			case 'nopassprovided':
				$('form#profileSignUpForm #edit-regPass').css('border-color','red').css('border-style','solid');
				$('#edit-regPass-wrapper').prepend('<div class="pass_exists_blurb">Password is required.</div>');
				return false;
				break;
			case 'confirmsignup':
				$('form#profileSignUpForm').submit();
				return true;
				break;
			}
	}
	$.post('/validatesignup', values, quickform_signup_return, "json");
	
	return false;
	});
	
	$('form#user-edit #edit-submit').click(function() { 
	// inside event callbacks 'this' is the DOM element so we first 
	// wrap it in a jQuery object and then invoke ajaxSubmit 
		var fullname = $("#edit-field-profile-full-name-0-value").val();
		var email = $("#edit-mail").val();
		var pass = $("#edit-pass-pass1").val();
		var otheroccupation = $("#edit-field-other-job-title-0-value").val();

		$('div').remove('#field_err');
		$("#error_box").html("");

		if(fullname != 0){
			$('form#user-edit #edit-field-profile-full-name-0-value').css('border-color','').css('border-style','');
			$('#edit-field-profile-full-name-0-value-wrapper').css('color','');
			fullname = true;
		}else{
			$('form#user-edit #edit-field-profile-full-name-0-value').css('border-color','red').css('border-style','solid');
			$('#edit-field-profile-full-name-0-value-wrapper').css('color','red');
			$('#edit-field-profile-full-name-0-value-wrapper').append('<div id="field_err">Full Name field must be filled out.</div>');
			fullname = false;
		}
		
		if($("#edit-field-other-job-title-0-value-wrapper").css('display') == "block"){
			if(otheroccupation != 0){
				$('form#user-edit #edit-field-other-job-title-0-value').css('border-color','').css('border-style','');
				$('#edit-field-other-job-title-0-value-wrapper').css('color','');
				otheroccupation = true;
			}else{
				$('form#user-edit #edit-field-other-job-title-0-value').css('border-color','red').css('border-style','solid');
				$('#edit-field-other-job-title-0-value-wrapper').css('color','red');
				$('#edit-field-other-job-title-0-value-wrapper').append('<div id="field_err">Other occupation must be entered.</div>');
				otheroccupation = false;
			}
		}else{
			otheroccupation = true;
		}
		
		if(email != 0){
			if(isValidEmailAddress(email)){
				$('form#user-edit #edit-mail').css('border-color','').css('border-style','');
				$('#edit-mail-wrapper').css('color','');
				email = true;
			}else{
				$('form#user-edit #edit-mail').css('border-color','red').css('border-style','solid');
				$('#edit-mail-wrapper').css('color','red');
				$('#edit-mail-wrapper').append('<div id="field_err">Email is not properly formatted</div>');
				email = false;
			}
		}else{
			$('form#user-edit #edit-mail').css('border-color','red').css('border-style','solid');
			$('#edit-mail-wrapper').css('color','red');
			$('#edit-mail-wrapper').append('<div id="field_err">An Email address is required</div>');
			email = false;
		}
		
		if(pass != 0 ){
			var pass1 = $("#edit-pass-pass1").val();
			var pass2 = $("#edit-pass-pass2").val()

			if(pass1 == pass2){
				$('form#user-edit #edit-pass-pass1').css('border-color','').css('border-style','');
				$('form#user-edit #edit-pass-pass2').css('border-color','').css('border-style','');
				$('#edit-pass-pass2-wrapper').css('color','');
				pass = true;
			}else{
				$('form#user-edit #edit-pass-pass1').css('border-color','red').css('border-style','solid');
				$('form#user-edit #edit-pass-pass2').css('border-color','red').css('border-style','solid');
				$('#edit-pass-pass2-wrapper').css('color','red');
				$('#edit-pass-pass2-wrapper').append('<div id="field_err">The password fields do not match.</div>');
				pass = false;
			}
		}else{
			$('form#user-edit #edit-pass-pass1').css('border-color','').css('border-style','');
			$('form#user-edit #edit-pass-pass2').css('border-color','').css('border-style','');
			$('#edit-pass-pass2-wrapper').css('color','');
			pass = true;
		}
		
		if(!fullname || !email || !pass || !otheroccupation){
			$("#error_box").html("Please correct the highlighted fields.");
			$("#error_box").css('color','red').css('text-align','center');
			return false;
		}else{
			//$('form#user-edit').submit();
      //document.user-edit.submit();
      //document.getElementById('user-edit').submit();
      
      if(navigator.appName == "Microsoft Internet Explorer") {
        document.forms["user-edit"].submit();
      }else{
        document.user-edit.submit();
      }
      
			return true;
		}
	
		return false;
	});
	
});

//----------------------------------------------------------/
//----------- FORM SUBMISSION EVENTS - END -----------------/
//----------------------------------------------------------/


/*
 *  Function: isValidEmailAddress();
 *  Decription: RegEx pattern to confirm that an e-mail address is properly formatted
 *  Params: emailAddress - the email address being validated
*/
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}
