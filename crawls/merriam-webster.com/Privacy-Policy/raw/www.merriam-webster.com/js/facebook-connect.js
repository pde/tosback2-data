// This function handles all login events.
function def_onMySavedWordsLogin (data)
	{
	};

// This function handles all logout events.
function def_onMySavedWordsLogout (data)
	{
	};

// This function handles all login failure events.
function def_onMySavedWordsLoginFailure (data)
	{
	};

window.fbAsyncInit = function()
		{	// alert("Calling window.fbAsyncInit.");
			FB.curr_user = { uid: null, access_token: null, callback: null }; 
			FB.init({appId: '178450008855735', status: true, cookie: true, xfbml: true, oauth: true });

			/* All the events registered */
			FB.Event.subscribe('auth.login', function(response)
				{	// Log the user in.
					//alert("FB.Event.auth.login");
					//alert("UID: " + response['session']['uid']);
					//alert("ACCESS TOKEN: " + response['session']['access_token']);
					setCookieValue('my_saved_logged_in', 1);
					FB.curr_user.uid			= typeof(response.authResponse.userID) !== 'undefined' ? response.authResponse.userID : null;
					FB.curr_user.access_token	= typeof(response.authResponse.accessToken) !== 'undefined' ? response.authResponse.accessToken : null;
					//FB.curr_user.uid			= response['session']['uid'];
					//FB.curr_user.access_token	= response['session']['access_token'];


					// Execute the callback.
					if ( FB.curr_user.callback !== null )
						{	FB.curr_user.callback();
						};

					// Execute the callback.
					if ( FB_callback !== null )
						{	FB_callback();
						};

					if ( typeof(onFBStatusChange) !== 'undefined' )
						{	onFBStatusChange(response.authResponse);
						};
				});

			FB.getLoginStatus (function(response)
				{	// alert("TOKEN: " + (response.session ? response.session.access_token : 'null'));
					//alert("FB.getLoginStatus");
					/**
					alert('Response: ' + response);
					for ( var x in response )
					{	alert(x + ' = ' + response[x]);
					};
					**/
					var status = 
						response && 
						typeof(response.authResponse) !== 'undefined' && 
						response.authResponse !== null && 
						typeof(response.authResponse.accessToken) !== 'undefined' && 
						response.authResponse.accessToken !== null ? 1 : 0;
					setCookieValue('my_saved_logged_in', status ? 1 : 0);					
					//alert('Login status: ' + status);
					if ( status == 1 )
						{	FB.curr_user.uid			= typeof(response.authResponse.userID) !== 'undefined' ? response.authResponse.userID : null;
							FB.curr_user.access_token	= typeof(response.authResponse.accessToken) !== 'undefined' ? response.authResponse.accessToken : null;
							//alert('UID: ' + response.authResponse.userID);
							//alert('UID: ' + response.authResponse.accessToken);
							//FB.curr_user.uid			= response['session']['uid'];
							//FB.curr_user.access_token	= response['session']['access_token'];
						}

					else
						{	FB.curr_user.uid			= null;
							FB.curr_user.access_token	= null;
						};

					if ( typeof(onFBStatusChange) !== 'undefined' )
						{	// onFBStatusChange(response['session'] ? response['session'] : null);
							onFBStatusChange(response);
						};
				});

			FB.Event.subscribe('auth.logout', function(response)
				{	// Log the user out.
					setCookieValue('my_saved_logged_in', 0);
					FB.curr_user.uid			= null;
					FB.curr_user.access_token	= null;

					if ( typeof(onFBStatusChange) !== 'undefined' )
						{	onFBStatusChange(null);
						};
				});
	};

(function() {
	var e = document.createElement('script');
	e.type = 'text/javascript';
	e.src = /** document.location.protocol + **/
		'https://connect.facebook.net/en_US/all.js';
	e.async = true;
	document.getElementById('fb-root').appendChild(e);
}());