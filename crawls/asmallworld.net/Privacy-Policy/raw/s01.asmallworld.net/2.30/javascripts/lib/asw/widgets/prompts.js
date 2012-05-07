/**
 * This is current just a dump of scripts required for the email cleanup
 * prompt. Once we get another prompt campaign we should abstract the
 * common code here and have the prompt campaign specific code in the
 * appropriate public/javascripts/pages folder (imho)
 */

jQuery(document).ready(function() {
  var emailScreens = [
    "#message-screen",
    "#bounce-screen",
    "#input-screen",
    "#thank-you-screen",
    "#error-screen"
  ];

  if(jQuery('#email-prompt-confirm').length) {
    jQuery('#email-prompt-confirm').modal({
      containerCss: { height: 252, width: 548 },
      focus: false
    });
  }

  var showScreen = function(screen) {
    for (var i=0; i < emailScreens.length; i++) {
      currentScreen = emailScreens[i];
      if (currentScreen === screen) {
        jQuery(currentScreen).show();
      } else {
        jQuery(currentScreen).hide();
      }
    };
  };

  var showErrorScreen = function(request){
    response = jQuery.parseJSON(request.responseText);
    jQuery('#error-screen .error-message').text(response.error);
    showScreen('#error-screen');
  };

  var showThankYouScreen = function() {
    showScreen('#thank-you-screen');
  };

  var clearError = function() {
    jQuery('.error-message').text("");
    jQuery('#email-prompt-confirm input').removeClass('border-highlight');
  };

  jQuery('#update-button').click(function() {
    showScreen('#input-screen');
  });

  jQuery('#back-button').click(function() {
    clearError();
    jQuery('#email-form').clearForm();
    showScreen('#message-screen');
  });

  var confirmed = function() {
    jQuery('#confirm-action').text('verifying');
    showThankYouScreen();
  };

  jQuery('#remind-button').click(function() {
    var promptId = jQuery('#prompt_id').val();
    jQuery.ajax({
      type: "POST",
      url: "/prompts/" + promptId + "/remind_me_later",
      dataType: "json",
      success: function() { jQuery.modal.close(); },
      error: showErrorScreen
    });
  });

  jQuery('#confirm-button').click(function() {
    var emailId = jQuery('#email_id').val();
    jQuery.ajax({
      type: "POST",
      url: "/member_emails/" + emailId + "/confirm",
      dataType: "json",
      success: confirmed,
      error: showErrorScreen
    });
  });

  var sendEmailUpdate = function(email) {
    var url = jQuery('#email-form').attr('action');
    jQuery.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      data: "email=" + email,
      success: showThankYouScreen,
      error: showErrorScreen
    });
  };

  var validateEmailAddress = function(address, field) {
    var validPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    var isValid = validPattern.test(address);

    if (!isValid) {
      jQuery('#email-prompt-confirm input#' + field).addClass('border-highlight');
      throw 'Please enter a valid email address.';
    }
  };

  var validateEmailsMatch = function(email, emailConfirm) {
    var isValid = (email === emailConfirm);
    if (!isValid) {
      jQuery('#email-prompt-confirm input').addClass('border-highlight');
      throw "The email addresses entered do not match, please try again.";
    }
  };

  var validateEmailChanged = function(email) {
    var currentEmail = jQuery('#current_email').val();
    var isValid = (email !== currentEmail);
    if (!isValid) {
      jQuery('#email-prompt-confirm input').addClass('border-highlight');
      throw "Please use a different email to the one we currently have on file.";
    }
  };

  var checkEmailValid = function(email, emailConfirm) {
    var error = '';
    try {
      validateEmailAddress(email, 'email');
      validateEmailAddress(emailConfirm, 'email_confirm');
      validateEmailsMatch(email, emailConfirm);
      validateEmailChanged(email);
    } catch(e) {
      error = e;
    }
    return error;
  };

  jQuery('#email-form').submit(function(e){
    var email = jQuery('input#email').val();
    var emailConfirm = jQuery('input#email_confirm').val();
    var errorMessage = checkEmailValid(email, emailConfirm);

    if (errorMessage === '') {
      sendEmailUpdate(email);
    } else {
      jQuery('.error-message').text(errorMessage);
    }

    e.preventDefault();
  });

  jQuery('input#email, input#email_confirm').keydown(function(){
    clearError();
  });
});

