if(typeof NICK == "undefined" || !NICK) var NICK = {};

NICK.flux = (function() {

	var baseURL = 'http://daapiak.flux.com/2.0/00001/JSON/';
	var ucid = '95F6FFFF0099CB350002FFFFF695';
	var location = window.location.href;
	var commentsLength = 10;
	var contributors = Array();
	var defaultContributorImage = "http://filesll.fluxstatic.com/0000000000000000000100000000/TNV/Jpg/B-15472/AR90x90";
	var haloContentUrl = "";
	var haloContent = false;

	// Check Flux login object to see if user is logged in.
	var userLoggedIn = function() {
		return window.Widgets4Context.user != null;
	};

	// Show Flux sign-in box.
	var launchSignInWidget = function() {
		Flux4.signIn(null, null, 'Login');
	};

	// Kicks user to referring page OR homepage.
	var kickbackUserToReferrer = function() {
		var referrer = (document.referrer != '') ? document.referrer : '/';
		document.location = referrer;
	};

	// Bind event to signOut that kicks them back to the homepage.
	var setupKickbackBinding = function() {
		Flux4.addEventListener('signOut', function (eventContext, userContext) {
			kickbackUserToReferrer();
		});
	};

	/**
	 *	Roadblocks a page.
	 *	1. It will force a login box if the user is not already logged in.
	 *	2. It binds an event to the Close button of the login box to kick them out 
	 *	if they do not login.
	 *	3. It binds an event to a Flux Sign Out to kick them out if they logout at 
	 *	any point.
	 */
	var loginRequired = function(required) {
		if (required) {
			// If they aren't logged in, show the login window on page load.
			if (userLoggedIn() === false) {
				$('.closeButton').live('click', function() {
					// If they close the signIn window and aren't logged in, 
					// kick them back to where they arrived from OR the homepage.
					if (!userLoggedIn()) {
						kickbackUserToReferrer();
					}
				});
				launchSignInWidget();
			}
			// Bind the kickback to the Sign Out event.
			setupKickbackBinding();
		}
	};

	// Display the sign in/logout box in the header. Called on every page load.
	var createUserBar = function() {
		Flux4.createWidget('UserBar', {displayMode: 'EmbeddedTop'});
	};

	return {
		loginRequired: loginRequired,
		createUserBar: createUserBar
	}

})();

userMgr = {};
userMgr.loginRequired = function(required) {
	NICK.flux.loginRequired(required);
};