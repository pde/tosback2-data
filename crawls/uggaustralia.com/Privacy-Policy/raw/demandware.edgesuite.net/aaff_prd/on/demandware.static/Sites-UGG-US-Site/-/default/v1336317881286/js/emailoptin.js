(function(app){
	if (app) {
		app.showEmailSignupDialog = function (){
			app.dialog.open(app.URLs.emailOptIn, app.resources["ACCOUNT_EMAIL_OPTIN"],{width:450, height:675});
			 
		}
	}
})(app);
