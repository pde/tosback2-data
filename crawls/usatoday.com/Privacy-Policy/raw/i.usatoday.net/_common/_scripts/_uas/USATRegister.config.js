// Override UAS client-side validation messages (vm) //
// registration messages
usatAuth.vm.regHandleReq        = "Username is required for membership";
usatAuth.vm.regHandleInvalid    = "Handle cannot contain special characters";
usatAuth.vm.regHandleSpaces     = "Handle cannot begin or end with a space";
usatAuth.vm.regEmailReq         = "Email address is required for membership";
usatAuth.vm.regEmailInvalid     = "Email address is not a valid format";
usatAuth.vm.regPassMin          = "Passwords must be at least 6 characters in length";
usatAuth.vm.regPassMatch        = "Passwords do not match";
usatAuth.vm.regGenderReq        = "Please select Male or Female";
usatAuth.vm.regYearInvalid      = "Please enter a four digit year";
usatAuth.vm.regYearAfter1889    = "Please enter a year after 1889";
usatAuth.vm.regYearBefore       = "Please enter a year before "+((new Date()).getFullYear()-13); 
usatAuth.vm.regZipReq           = "Please enter your Zip Code";
usatAuth.vm.regZipInvalid       = "Please enter your five-digit Zip Code";
usatAuth.vm.regCountryReq       = "Please select your Country";
usatAuth.vm.regJobReq           = "Please select your Job Title";
usatAuth.vm.regIndReq           = "Please select your Industry";
usatAuth.vm.regSizeReq          = "Please select your Company Size";
// options messages
usatAuth.vm.optHandleReq        = "Username is invalid";
usatAuth.vm.optHandleInvalid    = "Handle cannot contain special characters";
usatAuth.vm.optHandleSpaces     = "Handle cannot begin or end with a space";
usatAuth.vm.optEmailReq         = "Email Address is invalid";
usatAuth.vm.optEmailInvalid     = "Email address is not a valid format";
usatAuth.vm.optOldPassReq       = "Please enter your old password";
usatAuth.vm.optPassMin          = "Passwords must be at least 6 characters in length";
usatAuth.vm.optPassMatch        = "Passwords do not match";
// transition messages
usatAuth.vm.trnPassReminder     = "Sending reminder...";
usatAuth.vm.trnLogIn            = "Logging in...";
usatAuth.vm.trnChangeHandle     = "Changing Username...";
usatAuth.vm.trnChangeEmail      = "Changing Email...";
usatAuth.vm.trnChangePass       = "Changing password...";
usatAuth.vm.trnUnregister       = "Registration being deleted...";
usatAuth.vm.trnRegister         = "Processing registration...";      
    