/* Globals */

var shortUrl = '';
/*
 * All setup procedures and inits should go in here
 */
twitterBaseUrl = "";
twitterAjaxUrl = "";
var shortUrl = '';
function twiterconnect_init() {
	twitterBaseUrl = viralappsURL + "public/twitterconnect/" + fbcClientId
			+ "/";
	twitterAjaxUrl = viralappsURL + "public/twitterconnect/" + fbcClientId
			+ "/" + "index.php";
	getUserLoginStatus();
	var twitterLoginStatus = readCookie("isUserLoggedIn");
	if (getLoggedInState() == 'N') {
		renderTwitterLoginButton();
	} else {
		processAuthenticationParams();
		getTwitterUserProfile();
		//processLogin();
	}
}
function getTwitterUserProfile() {
	var userid = getLoggedInUserId();
	if (getLoggedInState() == 'N') {
		return '';
	}
	var udata_uid = readCookie("udata_uid");
	if (udata_uid != null) {
		//user object is already set
		var udata_name = readCookie("udata_name");
		var udata_first_name = readCookie("udata_first_name");
		var udata_pic_square = readCookie("udata_pic_square");
		var loginState = (getFBconnectedState() == "Y") ? true : false;
		loggedInContainerSite = readCookie("udata_loggedInContainerSite");
		user = {
			"externalPlatformId" :udata_uid,
			"name" :udata_name,
			"loggedInUserName" :udata_first_name,
			"profilePic" :udata_pic_square,
			"loggedIn" :loginState,
			"imgURL" :twitterBaseUrl + 'img/',
			"loggedInContainerSite" :loggedInContainerSite
		};
		userProfileLoaded = true;
		executeCallbackfunctions(functionToCallbacks.getUserProfile);
		functionToCallbacks.getUserProfile = [];
		return '';
	}

	if (twitterAjaxUrl == 'notset') {
		get_required_url();
	}
	var fullURL = twitterAjaxUrl + "?controller=Ajax";

	var date = new Date();
	var queryParams = {
		"requestedController" :"Account",
		"requestedMethod" :"displayUserProfile",
		"loggedIn" :getLoggedInState(),
		"showName" :clientParams.showName
	};

	if (userParams != null) {
		queryParams = appendUserParamObjects(queryParams, userParams);
	}
	if (clientParams != null) {
		queryParams = appendJSObjects(queryParams, clientParams);
	}
	jQuery.ajax( {
		type :"GET",
		url :fullURL,
		data :queryParams,
		dataType :"jsonp",
		success : function(data) {
			user = data;
			/*if (typeof data.loggedInContainerSite != "undefined" && data.loggedInContainerSite != "" && data.loggedInContainerSite != null) {
				loggedInContainerSite = data.loggedInContainerSite;
				createCookie("udata_loggedInContainerSite", loggedInContainerSite, 1);
			}*/
			if (typeof data.externalPlatformId != "undefined"
					&& data.externalPlatformId != ""
					&& data.externalPlatformId != null) {
				createCookie("udata_uid", data.externalPlatformId, 1);
			}
			/*if (typeof data.name != "undefined" && data.name != "" && data.name != null) {
				createCookie("udata_name", data.name, 1);
			}*/
			if (typeof data.loggedInUserName != "undefined"
					&& data.loggedInUserName != ""
					&& data.loggedInUserName != null) {
				createCookie("udata_first_name", data.loggedInUserName, 1);
			}
			if (typeof data.profilePic != "undefined" && data.profilePic != ""
					&& data.profilePic != null) {
				createCookie("udata_pic_square", data.profilePic, 1);
			}

			userProfileLoaded = true;
			executeCallbackfunctions(functionToCallbacks.getUserProfile);
		},
		error : function(request, textStatus, thrownError) {
			alert('An error has occured ' + textStatus);
		}
	});
}

function getTwitterClientIdFromDomainName() {
	var fullDomainArray = new Array();
	var domainArray = new Array();
	fullDomainArray = String(window.location).split("/");
	domainArray = fullDomainArray[2].split(".");
	twitterConnectURL = fullDomainArray[0] + "//" + fullDomainArray[2];

	domainName = domainArray[domainArray.length - 2] + "."
			+ domainArray[domainArray.length - 1];
	switch (domainName) {
	case "bravotv.com":
		fbcClientId = "bravo";
		fbcClientIdImg = "bravo";
		break;
	case "televisionwithoutpity.com":
		fbcClientId = "twop";
		//images are rendered from bravo
		fbcClientIdImg = "bravo";
		break;
	case "nbc.com":
		fbcClientId = "nbc"
		fbcClientIdImg = "nbc";
		break;
	case "viralappsdev2.nbcuni.com": // Test env can be changed based on domain name used
		fbcClientId = "bravo"
		fbcClientIdImg = "bravo";
		break;
	default:
		fbcClientId = "bravo";
		fbcClientIdImg = "bravo";
		break;
	}

}

function getUserLoginStatus() {
	var requestToken = readCookie(clientParams.showName + "_oAuthToken");
	var requestTokenSecret = readCookie(clientParams.showName
			+ "_oAuthTokenSecret");
	var accessToken = readCookie(clientParams.showName + "_access_token");
	var accessTokenSecret = readCookie(clientParams.showName
			+ "_access_token_secret");
	if (accessToken != 'null' && accessToken != null) {
		userStatus = 'Authenticated';
		return true;
	} else if (requestToken != 'null' && requestToken != null) {
		userStatus = 'Logged In';
		return true;
	} else {
		userStatus = 'Logged out';
		return false;
	}

}
function postTweet(tweetMessage) {
	processAuthenticationParams();
	var tweetStatusMessage = tweetMessage;
	tweetStatusMessage += '  ' ;
	//alert(tweetStatusMessage );
	var fullURL = twitterAjaxUrl + "?controller=Ajax";
	var queryParams = new Object();
	var queryParams = {
		"requestedController" :"Account",
		"requestedMethod" :"postTweet",
		"userStatus" :tweetStatusMessage,
              "bitUrl" : shortUrl,
		"showName" :clientParams.showName

	};

	if (userParams != null) {
		queryParams = appendJSObjects(queryParams, userParams);
	}
	if (clientParams != null) {
		queryParams = appendJSObjects(queryParams, clientParams);
	}
	jQuery.ajax( {
		type :"GET",
		url :fullURL,
		data :queryParams,
		dataType :"jsonp",
		success : function(data) {

		},
		error : function(request, textStatus, thrownError) {
		}
	});
}
function processLogin() {
	if (userStatus == 'Logged out') {
		//displayLoginButton();   
	}
	renderMainSection();

}
function displayLoginButton() {
	twitterBaseUrl = viralappsURL + "public/twitterconnect/default/img/";
	html = '<img style="cursor:pointer" onclick="renderTwitterLoginButton()" src="' + twitterBaseUrl + 'twitter_login_button.gif" />';
	jQuery('#login_button').html(html);
	jQuery('#login_button').css( {
		display :"block"
	});

}
function setAuthorizeparams(url, oAuthToken, oAuthTokenSecret) {
       isPopBlocked();
	window.open(url, 'mywindow', 'width=900,height=500,scrollbars=yes');
     if(clientParams.showName == ""){
        createCookie(clientParams.pageName+ "_oAuthToken", oAuthToken, 10);
   	 createCookie(clientParams.pageName+ "_oAuthTokenSecret", oAuthTokenSecret,	10);
      }else{
	createCookie(clientParams.showName + "_oAuthToken", oAuthToken, 10);
	createCookie(clientParams.showName + "_oAuthTokenSecret", oAuthTokenSecret,	10);
     } 
}

function renderTwitterLoginButton() {
	var fullURL = twitterAjaxUrl + "?controller=Ajax";
	var queryParams = new Object();
	var queryParams = {
		"requestedController" :"Account",
		"requestedMethod" :"renderLoginButton",
		"userStatus" :userStatus,
		"showName" :clientParams.showName

	};

	if (userParams != null) {
		queryParams = appendJSObjects(queryParams, userParams);
	}

	jQuery.ajax( {
		type :"GET",
		url :fullURL,
		data :queryParams,
		dataType :"jsonp",
		success : function(data) {
			setAuthorizeparams(data.url, data.oauth_token,
					data.oauth_token_secret);
		},
		error : function(request, textStatus, thrownError) {
		}
	});
}
function handleTwitterLogout() {
	clearAuthenticationCookies();
	var fullURL = twitterAjaxUrl + "?controller=Ajax";
	var queryParams = new Object();
	var queryParams = {
		"requestedController" :"Account",
		"requestedMethod" :"clearSessionToken"
	};

	jQuery.ajax( {
		type :"GET",
		url :fullURL,
		data :queryParams,
		dataType :"jsonp",
		success : function(data) {
			createCookie("isUserLoggedIn", "false", 10);
			user = "";
			//displayLoginButton();
		/*renderMainSection();
		renderHeaderSection();*/
              facebook_onload_function = 0;
              connect_onload_functions();
	},
	error : function(request, textStatus, thrownError) {
	}
	});

}

function getLoggedInUserId() {
	var userid = '';
	for ( var name in userParams) {

		if (name.indexOf('user') != -1) {
			userid = userParams[name];
		}
	}

	return userid;
}
function displayProfileContent() {
	jQuery('#display_comments').html(ajaxBusyTag);
	processAuthenticationParams();
	var fullURL = twitterAjaxUrl + "?controller=Ajax&Platform=twitter";
	var queryParams = new Object();
	var queryParams = {
		"requestedController" :"Account",
		"requestedMethod" :"displayUserProfile",
		"userStatus" :userStatus
	};

	if (userParams != null) {
		queryParams = appendJSObjects(queryParams, userParams);
	}
	if (clientParams != null) {
		queryParams = appendJSObjects(queryParams, clientParams);
	}
	jQuery.ajax( {
		type :"GET",
		url :fullURL,
		data :queryParams,
		dataType :"jsonp",
		success : function(data) {
			jQuery('#login_button').html(data.html);
			user = data;
                    //frameLoginSrc=data.frameSrc;
 
			/*if (typeof data.loggedInContainerSite != "undefined" && data.loggedInContainerSite != "" && data.loggedInContainerSite != null) {
				loggedInContainerSite = data.loggedInContainerSite;
				createCookie("udata_loggedInContainerSite", loggedInContainerSite, 1);
			}*/
			if (typeof data.externalPlatformId != "undefined"
					&& data.externalPlatformId != ""
					&& data.externalPlatformId != null) {
				createCookie("udata_uid", data.externalPlatformId, 1);
			}
			/*if (typeof data.name != "undefined" && data.name != "" && data.name != null) {
				createCookie("udata_name", data.name, 1);
			   
			}*/
			if (typeof data.loggedInUserName != "undefined"
					&& data.loggedInUserName != ""
					&& data.loggedInUserName != null) {
				createCookie("udata_first_name", data.loggedInUserName, 1);
			}
			if (typeof data.profilePic != "undefined" && data.profilePic != ""
					&& data.profilePic != null) {
				createCookie("udata_pic_square", data.profilePic, 1);
			}
                     if(clientParams.showName == ""){
                        createCookie(clientParams.pageName+ "_access_token_secret",data.access_token_secret, 1);
     			   createCookie(clientParams.pageName+ "_access_token",data.access_token, 1);
                     }else{
			createCookie(clientParams.showName + "_access_token_secret",data.access_token_secret, 1);
			createCookie(clientParams.showName + "_access_token",data.access_token, 1);
                    }  
			userProfileLoaded = true;
			createCookie("isUserLoggedIn", "true");

			platform = "twitter";
			facebook_onload_function = 0;
			processAuthenticationParams();
			connect_onload_functions();

		},
		error : function(request, textStatus, thrownError) {
		}
	});
}

/*function shortenUrl() {
	//var url = clientParams.TweetData.TweetLink;
	var url = location.href;
	BitlyCB.shortenResponse = function(data) {
		var s = '';
		var first_result;
		// Results are keyed by longUrl, so we need to grab the first one.
		for ( var r in data.results) {
			first_result = data.results[r];
			break;
		}
		for ( var key in first_result) {
			if (key == "shortUrl") {
				shortUrl = first_result[key].toString();
			}
		}
	}
	BitlyClient.shorten(url, 'BitlyCB.shortenResponse');
}

*/

function shortenUrl() {
       var url = location.href;
       var request = "http://api.bit.ly/v3/shorten?longUrl="+url+"&login=viralapps&apiKey=R_387b9f0e660a523b3a5740e4fe26cc6a&format=json&callback=bitResponse";
       
       aObj = new JSONscriptRequest(request);
       aObj.buildScriptTag();
       aObj.addScriptTag();
}


function bitResponse(json){
shortUrl = json.data.url;
}