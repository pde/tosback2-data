if (typeof NICK == 'undefined') { NICK = {}; }
NICK.flux = (function() {

	var baseURL = 'http://daapiak.flux.com/2.0/00001/JSON/';
	var ucid = '95F6FFFF0099CB350002FFFFF695';
	var location = window.location.href;
	var commentsLength = 10;
	var contributors = Array();
	var defaultContributorImage = "http://filesll.fluxstatic.com/0000000000000000000100000000/TNV/Jpg/B-15472/AR90x90";
	var haloContentUrl = "";
	var haloContent = false;

	userLoggedIn = function() {
		return window.Widgets4Context.user != null;
	};
	launchSignInWidget = function() {
		Flux4.signIn(null, null, 'Login');
	};

	/*
	 *	Roadblocks a page. Shows the login upon page load.
	 */
	loginRequired = function(required, wait) {
		// console.log('login is' + ((!required) ? ' not' : '' ) + ' required on this page.');
		if (required) {
			// If they aren't logged in, show the login window on page load.
			// Grab the referrer to kick them back to
			var _referrer = (document.referrer != '') ? document.referrer : '/';
			if (userLoggedIn() === false) {
				$('.closeButton').live('click', function() {
					// If they close the signIn window and aren't logged in, 
					// kick them back to where they arrived from OR the homepage.
					if (!userLoggedIn()) {
						// console.log('user is still not logged in. kicking out');
						document.location = _referrer;
					}
				});
				launchSignInWidget();
			}
		}
	};

	// Display the sign in/logout box in the header. Called on every page load.
	createUserBar = function() {
		Flux4.createWidget('UserBar', {displayMode: 'EmbeddedTop'});
	};

	// Basically only used for debugging.
	initialBindings = function() {
		Flux4.addEventListener('signUp', function (eventContext, userContext) { 
			// console.log('User has signed up as ' + userContext.name + ' from ' + eventContext.widgetName); 
		});
    	Flux4.addEventListener('signIn', function (eventContext, userContext) { 
    		// console.log('User has signed in as ' + userContext.name + ' from ' + eventContext.widgetName); 
    	});
	}

	return {
		loginRequired: loginRequired,
		createUserBar: createUserBar,
		initialBindings: initialBindings
	}

})();

userMgr = {};
userMgr.loginRequired = function(required) {
	NICK.flux.loginRequired(required);
};