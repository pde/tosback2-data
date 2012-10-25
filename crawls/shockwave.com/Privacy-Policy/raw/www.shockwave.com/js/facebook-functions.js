/**
 * Called from the facebookFooter to setup FB related variables from the server on page load
 * @param fbConnected
 * @param fbAutoPublish
 * @param contentBase
 * @param disabledPerms
 * @param fbUserName
 */
setupFacebookVars = function(fbConnected, fbAutoPublish, contentBase, disabledPerms, fbUserName, fbAuthToken) {
	//isFacebookConnected = fbConnected;
	isFacebookAutoPublish = fbAutoPublish;
	contentBaseUrl = contentBase;
	disabledPermissions = disabledPerms;
	facebookUserName = fbUserName;
	facebookAuthToken = fbAuthToken;
};

$(document).ready(function() {

// ----------------------------------------------------
// opens document ready function, edit below this line


	var facebookConnectClass = new ShareWithFacebook();
	facebookConnectClass.init();

	var facebookAccessToken = "";
	var facebookId = "";




	/**
	 * Calls Facebook login, with the extended permissions
	 * @param linkEventName optional sends this name with Omniture link event
	 * @param callbackFunction optional
	 */
	facebookConnectLink = function( linkEventName, callbackFunction ) {
		//reg tracking - button clicked
		if( !linkEventName ) { linkEventName = "fbc_btn_noSrcLink"}
		sendCustomLinkEvent(linkEventName, {
			eVar14: 'signInFacebook',
			prop26: 'signInFacebook'
		});

		closeCallback = false;
		FB.login(function(response) {
			if ( response.authResponse ) {

				// get the auth token
				facebookAccessToken = response.authResponse.accessToken;
				facebookId = response.authResponse.userID;
				clickFacebookConnect( callbackFunction, true );
//              add FB.api here
				var fbUrl = '/me/shockwave-devgames:play';
                var prodURL = /www/.test(self.location.href);
				if ( prodURL ) fbUrl =  '/me/shockwavegames:play';

				FB.api(fbUrl, 'post', { game: document.location.toString(), access_token: facebookAuthToken }, function(response){
				  if(!response || response.error) {

					  console.log('Error occured: ' + response.error.message);
					  console.log(response.error.message);
				  } else {
					  console.log('Post ID: ' + response.id);
					  //_gaq.push(['_trackSocial', 'facebook', 'playaction', gameUrl]);
				  }
				});

			} else {
//				alert( "FB Status: " + response.status );
				facebookPopupClosed();
				showAjaxMessage( '/ajax/facebookCancelConfirmPod.jsp', '#facebookCancelConfirm', false, '700', '', '', '', function () {
					sendCustomLinkEvent( 'fbc_AreYouSureShown',{
						prop26: "signInFacebook:are you sure"
					});
					$('.dimmerBtnClose').click( function() {
						btg.Controller.sendLinkEvent('fbc_regoverlay_alt_close'); // probably can remove this later.
						if( typeof callbackFunction == 'function'){
								closeCallback = true;
								callbackFunction();
						}
					});
				});
			}
		}, {scope:'publish_stream,email,user_birthday,publish_actions'});
		facebookPopupOpened();
	};


	// Show the Facebook login buttons now that the FB login functions are available
	$(".facebookConnectPopupLink").live( 'click', function() {
        facebookConnectLink( $(this).attr("id") );
		hideMessage();
		return false;
	});
	$("#facebookHeaderLogin, a.btnFacebook").show();

	pageLevelLoginCallbackFunction = null;
	closeCallback = false;


	/**
	 * Called from Facebook's response to a FB.login call to make a call to our servers to check the mappings.
	 *
	 * @param callbackFunction
	 * @param requireSWLink Whether to require a SW account (set one up if none exist), or whether to fail sliently if not found
	 */
	clickFacebookConnect = function( callbackFunction, requireSWLink ) {
		// make a post request to the logout controller
		var hasCallback = ( typeof callbackFunction != 'undefined' );
		$.get( "/facebook/authenticate.jsp", {"has_callback": hasCallback, "auth_token": facebookAccessToken, "facebook_id":facebookId},
			function (requireSWLink) {
				return function ( data ) {
					// Expecting a JSON response back from login controller
					var results = eval( '(' + data + ')' );

					// If the user logged in through FB and already has a mapped SW account
					if (results.needsLogin == 'false') {
						// Omniture reg/signup tracking
						sendCustomLinkEvent("facebookLoginSuccess", {
							events: 'event13',
							eVar9: convertSignInState( results.login_state ),
							eVar12: results.member_id,
							eVar20: results.creationDateInDays,
							eVar21: results.gender,
							eVar22: results.birthDateInDays,
							prop13: results.creationDateInDays,
							prop14: results.gender,
							prop16: results.member_id,
							prop18: results.birthDateInDays
						});
						// If a callback function was specified, execute it instead of reloading the page
						if ( typeof callbackFunction != 'undefined' ) {
							hideMessage();

							// change some page local variables so any other scripts see the user as signed in too
							updateUserInfo(results);

							// so that other areas see as being connected without a page refresh
							isFacebookConnected = true;
						
							//callbackFunction( results );
							callShowInviteCallback(callbackFunction, results);

						// Otherwise, reload the page after connected
						} else if (requireSWLink) {
							window.location.reload(true);
						}

					// The user logged in through FB and now needs to create a SW account to be mapped to
					} else {
						pageLevelLoginCallbackFunction = callbackFunction;
						// post to omniture: connect dialog opened
						// Omniture reg/signup tracking
						sendCustomLinkEvent("fbc_regoverlay", {
							events: 'event10,event28',
							prop26: 'signInFacebook:already-have-account'
						});
						showAjaxMessage( '/ajax/facebookLinkAccountsPod.jsp', '#facebookPopup', false, '700', '', '', '', function () {
							$('.dimmerBtnClose').unbind('click');
							$('.dimmerBtnClose').click(function() {
								btg.Controller.sendLinkEvent('fbc_regoverlay_close');  // post to omniture: connect dialog closed
								hideMessage();
								removeFacebookAssociation(false);
								if( typeof pageLevelLoginCallbackFunction == 'function'){
									closeCallback = true;
									pageLevelLoginCallbackFunction();
								}
								return false;
							});
						});
					}
				}
			}(requireSWLink)
		);
	};


	/**
	 * Called after a signin call to, after logging in, show the confirmation if we have a callback stored
	 * in the pageLevelLoginCallbackFunction variable, which is set in clickFacebookConnect
	 */
	linkMyAccountsSigninCallback = function() {
		// if linkMyAccountsSigninCallback is called: signIn was successful
		btg.Controller.sendLinkEvent( 'fbc_regoverlay_linked' );  // post to omniture: facebook succesfully linked to existing account
		if ( typeof pageLevelLoginCallbackFunction == 'function' ) {
			showFacebookConnectConfirmation();
		} else {
			location.reload();
		}

	};

	removeFacebookAssociation = function(shouldLogoutFacebook) {
		// use time in the query string to keep IE from caching the logout request
		var time = new Date().getTime();
		// make a post request to the logout controller
		$.get( "/facebook/removeShockwaveFromFacebook.jsp", null,
			function ( data ) {
				// Expecting a JSON response back from login controller
				var results = eval( '(' + data + ')' );
				headerSignOutNoRedirect(function(results) {
					if (shouldLogoutFacebook) facebookLogout();
				});
			}
		);
	};


	facebookLogout = function() {
//		facebookPopupOpened();
		FB.getLoginStatus(function(response) {
		  if (response.authResponse) {
			  FB.logout(function(response) {
				  window.location.reload(true);
			  });
		  } else {
			  window.location.reload(true);
		  }
		});
	};

	facebookAndShockwaveLogout = function() {
		headerSignOutNoRedirect();
		facebookLogout();
	};



	getFacebookUserName = function() {
		return facebookUserName;
	};

	facebookShareGame = function(shareCode, title, description, callback, customParams) {
		facebookConnectClass.facebookShareGame(shareCode, title, description, callback, customParams);	
	}


	var wallPostCallback = null;
	facebookPostToWall = function(postType, comment, gameTitle, description, keyword, trophy, postCallback) {

		if (!isFacebookConnected) {
			if (postCallback) {
				postCallback( null );
			}
			return;
		}


		if (disabledPermissions && disabledPermissions.length > 0) {
			for (i = 0;i < disabledPermissions.length;i++) {
				if (postType == disabledPermissions[i]) {
					if (postCallback) {
						postCallback( null );
					}
					return;
				}
			}
		}

		var playNowGameLink = null;
		var attachment = null;
		var actionLinks = null;

		if (keyword)    // we have a game
		{
			var imageSrc = contentBaseUrl + '/i/picons/' + keyword + '_regular.jpg';
			var gameLinkBaseUrl = contentBaseUrl + '/gamelanding/' + keyword + '.jsp?extcmp=fbc_' + postType + '_' + keyword;
			if (gameArchiveValue == 'list' || gameArchiveValue == 'picture') {
                var year = getRequestParameter("year");
				var day = getRequestParameter("day");
				var month = getRequestParameter("month");
				if (day == "")
				{
					var d = new Date();
					year = d.getFullYear().toString().substring(2);
					month = (d.getMonth() + 1).toString();
					day = d.getDate();
					if (month.length < 10) month = "0" + month;
				}
                gameLinkBaseUrl = gameLinkBaseUrl + "&day=" + day + "&month=" + month + "&year=" + year;
                if (gameArchiveValue == 'picture') {
					imageSrc = contentBaseUrl + "/content/" + keyword + "/dailyThumbnails/" + month + "_" + year + "/daily" + day + "_tiny.png";
				}
            }

			// even for daily diff, trophies override
			if (trophy) imageSrc = contentBaseUrl + "/i/trophies/offsite/" + keyword + "/" + trophy + ".png";

			var imageGameLink = gameLinkBaseUrl;
			var nameGameLink = gameLinkBaseUrl;
			var playNowGameLink = gameLinkBaseUrl;
			var attachment = {
				'media': [{'type':'image',
						 'src':imageSrc,
						 'href':imageGameLink}],
				'name':gameTitle,
				'description':description,
				'href': nameGameLink
			};

			actionLinks = [{ "text": "Play Now", "href": playNowGameLink}];
		}
		postingType = postType;
		postingKeyword = keyword;
		wallPostCallback = postCallback;
        var json = {
				method: 'stream.publish',
				message: '',
				attachment: attachment,
				action_links: actionLinks,
				user_prompt_message: 'Post to your wall?'
			   };

		if ( isFacebookAutoPublish )
		{
			var json = {
					message: '',
					picture: imageSrc,
					link: nameGameLink,
					description: description,
					caption: gameTitle
				   };
			var url = '/me/feed';
			FB.api(url, 'post', json, facebookWallPostCallback);
		} else {
			var json = {
					method: 'stream.publish',
					message: '',
					attachment: attachment,
					action_links: actionLinks,
					user_prompt_message: 'Post to your wall?'
				   };
			FB.ui( json, facebookWallPostCallback );
		}

		if ( isFacebookAutoPublish ) {
			var customLink = 'fbc_share_' + postType + '_' + keyword;
			var omniVars= {
				events: "event22",
				prop12: customLink
			};
			sendCustomLinkEvent(customLink, omniVars);
		} else if ( !postCallback ) {
			facebookPopupOpened();
		}
	};

	var postingType = "";
	var postingKeyword = "";
	facebookWallPostCallback = function(response) {
		if (response && response.post_id) {
			var customLink = 'fbc_share_' + postingType + '_prompt_' + postingKeyword;
			var omniVars= {
				events: "event22",
				prop12: customLink
			};
			sendCustomLinkEvent(customLink, omniVars );
		}
		if ( wallPostCallback ) {
			wallPostCallback( response );
		} else if ( !isFacebookAutoPublish ) {
			facebookPopupClosed();
		}
	};

	if (window.FB) {
		FB.Event.subscribe('edge.create', function(response) {  // response is the URL that the user liked
			if ( typeof gameKeyword != "undefined" ) {
				//btg.Controller.sendLinkEvent( "fblike_" + gameKeyword );
                btg.Controller.sendLinkEvent( "fblike_click_" + gameKeyword );

                $.post("/activityFeed/addFbLikeMessage.jsp",
					{
                        keyword : gameKeyword
					}
			    );
			}
		});
	}

	$(".inviteFriendsDiv").live('mouseover', function() {
		// set hidden input gameKeyword field
		if (typeof(gameKeyword) != "undefined" && gameKeyword != null) {
			$("#gameKeyword").val(gameKeyword);
		}

		// set hidden input bestScore field
		if (typeof(bestScore) != "undefined" && bestScore != null) {
			$("#bestScore").val(bestScore);
		}
	});


	$(".facebookSignInFromInviteForm").live( 'click', function() {
		facebookConnectLink( 'fbc_btn_mysw_friends_invite' );
		return false;
	});


	inviteSWFriends = {
		limitText: "- limit is ",
		maxInvitations: null,
		highlightCSSClass: "inviteFriendMultiSelected",
		highlightSelectedElements: function() {
			$(".avatar4Up").children().each( function() {
				if ( inviteSWFriends.isSelected( $(this) ) ) {
					inviteSWFriends.makeActive( $(this), false );
				}
			});
		},
		/*
			canSelectMore has a couple inobvious side effects:
			- if maxInvitations is set and there invites remaining, it will update the
			  text in the dialog that reads "Select <x> Shockwave Friends" where <x> is the number of invites remaining
			- if maxInvitations is set and there are no invites remaining, it will replace <x> with a blank string
		 */
		canSelectMore: function() {
			if (this.maxInvitations != null) {
				var accumulator = 0;
				for (var entry in this.selectedList) {
					if (this.selectedList[entry] === true) {
						accumulator++;
					}
				}

				if (accumulator < this.maxInvitations) {
					$("#swMultiInviteError").text(""); //
					var invitesRemaining = this.maxInvitations - accumulator;
					if (invitesRemaining > 0 ) {
						$("#swInviteFriendsCount").text(invitesRemaining + " ");
					}
					return true;
				} else {
					$("#swInviteFriendsCount").text("");
					return false;
				}
			} else {
				return true;
			}
		},
		highlightElement: function(el) {
			if ( !this.isSelected(el) ) {
				el.addClass("inviteFriendMultiHighlight");
			}
		},
		init: function(invitesLimit) {
			this.selectedList = {};
			/*
			  checks to see if the returned data indicates that the user has no friends
			  TODO: replace this with code that checks the session for shockwaveFriendsCount > 0
			*/
			if ($("#swInviteFriendsContainer").children().length !== 0) {
				if (typeof invitesLimit != 'undefined' && invitesLimit != null) {
					this.maxInvitations = invitesLimit;
					this.canSelectMore();
				}
			} else {
				$("#swFriendsInviteDiv").remove();
				$("#swFriendsFriendsDefault").show();
			}
		},
		isSelected: function( el ) {
			var emailAddress = el.attr("name");
			if ( this.selectedList[emailAddress] === undefined || this.selectedList[emailAddress] == false ) {
				return false;
			} else {
				return true;
			}
		},
		makeActive: function( el, isUserInitiated ) {
			if (!isUserInitiated || this.canSelectMore()) {
				if ($.browser.msie && $.browser.version.substr(0,1) == "7") {
					el.prepend('<img src="/i/common/site/avatarOverlay.png" alt="" style="position: absolute; margin-left: -50px; margin-top: -3px;" />');
				} else {
					el.prepend('<img src="/i/common/site/avatarOverlay.png" alt="" style="position: absolute;" />');
				}
				if (isUserInitiated) {
					this.selectedList[ el.attr("name") ] = true;
					if (!this.canSelectMore()) {
						$("#swMultiInviteError").text(this.limitText + this.maxInvitations);
					}
				}
				el.addClass( this.highlightCSSClass );
			}
		},
		makeInactive: function( el ) {
			el.children(":first").remove(); // remove checkmark image
			this.selectedList[ el.attr("name") ] = false;
			el.removeClass( this.highlightCSSClass );
			this.canSelectMore(); // clear any status messages that were spawned because we hit an invite limit
		},
		selectedList: {}
	};
	$(".inviteFriendMultiSelect").live("click", function() {

		if ( inviteSWFriends.isSelected( $(this) ) ) {
			inviteSWFriends.makeInactive( $(this) );
		} else {
			inviteSWFriends.makeActive( $(this), true );
		}
	});
	$("#inviteFriendForm").live('submit', function() {
		clearFormErrors( $("#inviteFriendForm") );
		$( ".inviteFriendsDiv" ).hide();

		$(this).ajaxSubmit( function( data ) {
			showJsonFormErrors( data, $('#inviteFriendForm'), function () {
				//insert success message if it gets more design pull it in with ajax
				var successMessage = "<div class='mb20'><h4>Your invitation email was sent.</h4><p class='mt20'><a class='btnBig btnOnlineFull' id='sendEmailContinueButton' href='#'>Continue</a></p></div>";
				$('.inviteBody').html(successMessage);
				$("#sendEmailContinueButton").bind('click', function() {
					//bind whatever you want here
					hideMessage();
					callShowInviteCallback(facebookConnectClass.options.callback, 'success');
				} );
			});
			$( ".inviteFriendsDiv" ).show();
		});
		return false;
	});

	submitInviteFriendsForm = function( callBackFunction, swFriendsSubmit ){
		// the personalMessage field is included twice in the invite modal; the following code
		// checks to see if one of them is empty, and, if so, removes it.
		var messageArray = [];

		$(".personalMessage").each(function() {
			messageArray.push($(this));
		});

		for ( var i=0; i < messageArray.length; i++ ) {
			if (messageArray[i].val() === "") {
				messageArray[i].remove();
				break;
			}
		}

		if (swFriendsSubmit) {
			/*
				sending an email from the ShockwaveFriends tab, so we need to populate the recipientEmails and
				myName fields before posting the form.  we also change the value of the isShockwaveFriends
				input field to true
			*/
			var recipients = "";
			for (var entry in inviteSWFriends.selectedList) {
				if (inviteSWFriends.selectedList[entry] === true) {
					recipients += (entry + ", ");
				}
			}

			recipients = recipients.substr(0, recipients.length - 2);

			// jquery apparently can't write the value of an invisible text field.  doing it the old fashioned way.
			var refForm = null;
			for (var theForm in document.forms) {
				if (document.forms[theForm].id == "inviteFriendForm") {
					refForm = document.forms[theForm];
					break;
				}
			}
			refForm.elements["recipientEmails"].value = recipients;

			$("#myName").val( $("#defaultName").val() );
			$("#isShockwaveFriends").val( "true" );
		}

        $('#inviteFriendForm').submit();
        var inviteType = $('#inviteFriendForm #inviteType').val();
        var recipientEmails = $('#inviteFriendForm #recipientEmails').val();
        var customInviteParams = $('#inviteFriendForm #customInviteParams').val();


		callShowInviteCallback(callBackFunction, 'success');
    };

    friendInviteCallBack = function() {

        var inviteType = $('#inviteFriendForm #inviteType').val();
        var recipientEmails = $('#inviteFriendForm #recipientEmails').val();
        var customInviteParams = $('#inviteFriendForm #customInviteParams').val();
        var fromSwFriends = $("#isShockwaveFriends").val();

        var invShort;
        var localGameKeyword = gameKeyword;

		var httpParams = getHttpParamsFromParams( customInviteParams);

        if ( inviteType == 'gamepageInvite' ) {
            invShort = 'gpi';
        }
        else if ( inviteType == 'gamepageChallenge' ) {
            invShort = 'gpc';
        }
        else if ( inviteType == 'overlayChallenge' ) {
            invShort = 'olc';
        }
        else if (inviteType == 'friendInvite' ) {
            invShort = 'fri';
        }
		var omnitureText = "";

        if( fromSwFriends == 'true' )
        {
            omnitureText = 'inv_out_sw_' + invShort;
        }
        else
        {
            omnitureText = 'inv_out_em_' + invShort;
        }

        if( localGameKeyword != null ) {
            omnitureText = omnitureText + '_' + localGameKeyword;
        }

        if( recipientEmails != null ) {
            var emails = recipientEmails.split(",");
            if( emails ) {
                for(var i=0; i < emails.length;i++) {
                    btg.Controller.sendLinkEvent( omnitureText );
                }
            }
        }
    };

	hideMessageAfterEmailConfirmButton = function() {
		hideMessage();
		callShowInviteCallback(facebookConnectClass.options.callback, 'success');
	}


	/**
	 * This is the old showInviteFriends, which is now only called from Chess-Rivals, and is deprecated
	 * it simply calls showInviteFriends
	 *
	 * redirectUri, gameImageUrl
	 * @param customMessage
	 * @param inviteType
	 * @param invitesLimit
	 * @param customParams
	 * @param callbackFunction
	 */
	showInviteFriends = function ( customMessage, inviteType, invitesLimit, customParams, callbackFunction ) {

		var options = {'inviteType':inviteType, 'giftCode':"", 'giftUuid':"", 'title':customMessage, 'description':"",'limitParam':invitesLimit, 'customParams':customParams, 'callback':callbackFunction, 'redirectUri':'/facebook/blank.jsp', 'gameImageUri':""};

		facebookConnectClass.inviteFriendDialog(options);

	};

	var giftInviteCallback;

	// to test in FF, copy the 2 lines below
	//var options = {inviteType:'giftStandard', giftCode:'gift-one', giftUuid:'asdfasdf', title:'title', description:'description',limitParam:'0', customParams:'', callback:'function(res) {alert(res.status);}'};
	//var options = {inviteType:'giftThankYou', recipients:[{'reference':'1234'}],giftCode:'gift-one', giftUuid:'asdfasdf', title:'title', description:'description',limitParam:'0', customParams:'', callback:'function(res) {alert(res.status);}'};
	//sendGift(options);
	sendGift = function( options ) {
//		console.log("sendGift()");
//		for (var key in options) {
//			if (options.hasOwnProperty(key))
//			{
//				console.log("\toption: " + key + "=" + options[key]);
//			}
//		}


		if ( "giftThankYou" == options.inviteType) {
			if ( typeof(options.recipients) == 'undefined') {

				// for thank you, we need the recipientId
				var status = {'status':'error', 'error': 'No recipientId for thank you gift'};
				callShowInviteCallback(options.callback, status);
				return;
			}

			var links = facebookConnectClass.getLinks(options.inviteType, options.giftCode);
			var recipients = options.recipients;
			var recipientIds = "";
			var userName = "";
			for (i = 0;i < recipients.length;i++) {
				if (recipientIds.length > 0) recipientIds = ",";
				recipientIds = recipientIds + recipients[i].reference;
				userName = recipients[i].name;
			}

			$.post("/member/sendInviteMail.jsp",
					{
						gameKeyword: gameKeyword,
						personalMessage: options.description,
						inviteType: options.inviteType,
						invitesLimit: options.limitParam,
						customInviteParams: options.customParams,
						giftName: options.giftName,
						recipientIds: recipientIds
					},
					function(data) {
						showThankYouGiftConfirm(options.title, links.gameImage, userName, function() {
							var status = {'status':'success'};
							callShowInviteCallback(options.callback, status);
						});
					}
			);
			return;
		}

		giftInviteCallback = options.callback;
		options.callback = sendGiftCallback;
		options.redirectUri =  "/facebook/sendGiftRecipients.jsp";
		options.shareCode = options.giftCode;
		options.customParams = "giftName:" + options.giftName + ",iUUID:" + options.uuid;

		facebookConnectClass.inviteFriendDialog(options);
	}

	/**
	 * This is the callback from sendGift to loop until the user is done and tally a total of users.
	 * @param data
	 */
	var confirmName = "";
	var confirmImage = "";
	var confirmCallback = null;
	var closeCallback = null;
	sendGiftCallback = function(data)
	{
		if (data.status == 'success' || data == 'success') {

			// ask the user if we want to go again
			confirmName = facebookConnectClass.options.giftName;
			confirmImage = facebookConnectClass.options.giftImageUrl;

			if (data.recipients && data.recipients.length > 0) {
				if (facebookConnectClass.users && facebookConnectClass.users.length > 0) {
					for (i = 0;i < data.recipients.length;i++) {
						facebookConnectClass.users.push(data.recipients[i]);
					}
				} else {
					facebookConnectClass.users = data.recipients;
				}
			}

			var doConfirm = true;
			//console.log("Limit: " + facebookConnectClass.options.limitParam);
			var userLimit = facebookConnectClass.options.limitParam;
			if (facebookConnectClass.users) {
				if (userLimit > 0 && userLimit <= facebookConnectClass.users.length)
				{
//					console.log("limit of users reached " + userLimit + " < " + facebookConnectClass.users.length);
					doConfirm = false;
				}
			}

			if (doConfirm) {
				confirmCallback = function() {
					sendGift(facebookConnectClass.options);
				};
				closeCallback = function() {

					// to make sure we have all the users from all round-trips.
					if (facebookConnectClass.users) {
						data = {'status':'success', 'recipients':facebookConnectClass.users};
					}
					callShowInviteCallback(giftInviteCallback, data);
				};
				setTimeout("sendGiftConfirmDelayed()", 1000);
			} else {
				// to make sure we have all the users from all round-trips.
				if (facebookConnectClass.users) {
					data = {'status':'success', 'recipients':facebookConnectClass.users};
				}
				callShowInviteCallback(giftInviteCallback, data);
			}


		} else if (data.status == 'cancelled') {

			// to make sure we have all the users from all round-trips.
			if (facebookConnectClass.users) {
				data = {'status':data.status, 'recipients':facebookConnectClass.users};
			}
			callShowInviteCallback(giftInviteCallback, data);
		} else {
			alert("No status, no data");
		}
	};

	sendGiftConfirmDelayed = function() {

		showGiftConfirm(confirmName, confirmImage, confirmCallback, closeCallback);
	};

	/**
	 * Show the gift sent confirmation modal overlay.
	 *
	 * @param giftName required
	 * @param giftImageUrl required
	 */
	showGiftConfirm = function ( giftName, giftImageUrl, confirmCallback, closeCallback ){

		if (!giftName) giftName = "";
		if (!giftImageUrl) giftImageUrl = "";

		showAjaxMessage( "/html/giftingOverlay/giftingDialogs.html", "#modalGiftConfirm", false, 580, null, null, null, function () {
			$(".giftingDialogs .giftImage").attr("alt", giftName);
			$(".giftingDialogs .giftImage").attr("src", giftImageUrl);
			$(".giftingDialogs .giftName").html( giftName );
			$('.btnGiftingClose').unbind();
			$('.btnGiftingClose').bind("click", function(){
				hideMessage();
				closeCallback();
			});
			$('.giftSendMore').unbind();
			$('.giftSendMore').bind("click", function(){
				hideMessage();
				confirmCallback();
			});
		});
	}

	/**
	 * Show the thank you gift sent confirmation modal overlay.
	 *
	 * @param giftName required
	 * @param giftImageUrl required
	 * @param receiverMemberName required
	 */
	showThankYouGiftConfirm = function ( giftName, giftImageUrl, receiverMemberName, callback ){
//		console.log("showThankYouGiftConfirm(" + giftName + "," + giftImageUrl + "," + receiverMemberName);

		if( !giftName || !giftImageUrl || !receiverMemberName ){
			return false;
		}
		showAjaxMessage( "/html/giftingOverlay/giftingDialogs.html", "#modalThankYouGiftConfirm", false, 580, null, null, null, function () {
			$(".giftingDialogs .giftImage").attr("alt", giftName);
			$(".giftingDialogs .giftImage").attr("src", giftImageUrl);
			$(".giftingDialogs .receiverAvatarImage").attr("src", "/member/avatarViewer.jsp?p=1&screenname=" + receiverMemberName);
			$(".giftingDialogs .receiverAvatarImage").attr("alt", receiverMemberName);
			$(".giftingDialogs .giftName").html( giftName );
			$(".giftingDialogs .receiverMemberName").html( receiverMemberName );

			$('.btnGiftingClose').unbind();
			$('.btnGiftingClose').bind("click", function(){
				hideMessage();
				callback();
				return false;
			});
		});
	}


    callLinkEvents = function(){
        var omnitureText = 'inv_out_fb_' + inviteType;
    };

	callShowInviteCallback = function(callbackFunction, status) {


		if (typeof(callbackFunction) == 'undefined') {
			return;
		}

		if ( typeof callbackFunction == 'function' ) {
			callbackFunction(status);
		} else if ( typeof callbackFunction == 'string') {

			// Since the callback function is a string, assume it's coming from flash
			var flash = getFlashGameHandle();
			try {
				eval("flash." + callbackFunction + "( status );" );
			} catch ( e ) {
//				console.log( "Problem calling callback '" + callbackFunction + "': " + e.message );
			}
		}
	}



	// potentially called back after connecting with facebook or logging in
	inviteFriendDialogCallback = function(response) {
		setTimeout( "inviteFriendDialogWrapper()" , 1000 );
	};

	inviteFriendDialogWrapper = function() {
		facebookConnectClass.inviteFriendDialog();
	};

	// look for the keyword, and build my button, and append any other customParams
	// to the end of any url
	getHttpParamsFromParams = function( customParams ) {
		var params = "";
		if ( typeof(customParams) != 'undefined' && customParams != null && customParams.length > 0) {
			var paramsArray = customParams.split(",");
			if (paramsArray) {
				for (i = 0;i < paramsArray.length;i++) {
					var keysArray = paramsArray[i].split(":");
					if (keysArray) {
						if ("keyword" != keysArray[0]) {
							if (params.length > 0) params = params + "&";
							params = params + jQuery.trim(keysArray[0]) + "=" + jQuery.trim(keysArray[1]);
						}
					}
				}
			}
		}
		return params;
	};





// closes document ready function, edit above this line
// -----------------------------------------------------
});


// Class to do facebook connect from a game, such as posting to the wall, or inviting someone
ShareWithFacebook = function() {


	

	this.init = function() {

	};

	// in case we need to call showInviteFriends again after connecting to facebook, store the values here
	this.options = null;
	this.users = null;


	this.convertTracking = function(originalLink,gameKeyword, shareType, shareCode) {
		var newLink =  originalLink.replace(/\{game_keyword\}/g,gameKeyword);
		newLink = newLink.replace(/\{share_type\}/g,shareType);
		newLink = newLink.replace(/\{share_code\}/g,shareCode);
		return newLink;
	}


	this.getLinks = function(shareType, shareCode, userName, httpParams) {


		var keywordAppend = "";
		var shareCodeAppend = "";
		var gamePicon = gameKeyword + ".png";
		if (gameKeyword) keywordAppend = "_" + gameKeyword;
		if (shareCode && shareCode.length > 0) {

			var folderName = "events";
			gamePicon = folderName + "/" + shareCode + ".png";
			if (shareType.substring(0,4) == 'gift')
			{
				folderName = "gifts";
				gamePicon = folderName + "/" + shareCode + ".png";
			}
			shareCodeAppend = "&event=" + shareCode;
		}
		var trackingParamGame = "inv_bck_fb_{share_type}_lnk_{game_keyword}";
		var trackingParamButtonGame = "inv_bck_fb_{share_type}_btn_{game_keyword}";
		var trackingParamImage = "inv_bck_fb_{share_type}_lnk_{game_keyword}";
		var trackingParamUser = "inv_bck_fb_{share_type}_prf_{game_keyword}";
		var trackingParamPlayNow = "inv_bck_fb_{share_type}_cta_{game_keyword}";
		var trackingParamShockwave = "inv_bck_fb_{share_type}_{game_keyword}";

		if (typeof(gameKeyword) == 'undefined') {
			trackingParamGame = "inv_bck_fb_{share_type}_lnk";
			trackingParamButtonGame = "inv_bck_fb_{share_type}_btn";
			trackingParamImage = "inv_bck_fb_{share_type}_lnk";
			trackingParamUser = "inv_bck_fb_{share_type}_prf";
			trackingParamPlayNow = "inv_bck_fb_{share_type}_cta";
			trackingParamShockwave = "inv_bck_fb_{share_type}";
		}

		if ("post" == shareType)
		{
			trackingParamGame = "fbc_{game_keyword}_{share_code}";
			trackingParamButtonGame = "fbc_{game_keyword}_{share_code}";
			trackingParamImage = "fbc_{game_keyword}_{share_code}";
			trackingParamUser = "fbc_{game_keyword}_{share_code}";
			trackingParamPlayNow = "fbc_{game_keyword}_{share_code}";
			trackingParamShockwave = "fbc_{game_keyword}_{share_code}";
		}

		if (httpParams && httpParams.length > 0) httpParams = "&" + httpParams;
		trackingParamGame = this.convertTracking(trackingParamGame, gameKeyword, shareType, shareCode);
		trackingParamButtonGame = this.convertTracking(trackingParamButtonGame, gameKeyword, shareType, shareCode);
		trackingParamImage = this.convertTracking(trackingParamImage, gameKeyword, shareType, shareCode);
		trackingParamUser = this.convertTracking(trackingParamUser, gameKeyword, shareType, shareCode);
		trackingParamPlayNow = this.convertTracking(trackingParamPlayNow, gameKeyword, shareType, shareCode);
		trackingParamShockwave = this.convertTracking(trackingParamShockwave, gameKeyword, shareType, shareCode);

		var urlBase = getWindowUrlBase();

		var gameImageUrl = urlBase + "/content/" + gameKeyword + "/sis/" + gamePicon;
		if (shareType.substring(0,4) == 'gift') gameImageUrl = urlBase + "/content/" + gameKeyword + "/" + gamePicon;

		var gameLink = urlBase + "/gamelanding/" + gameKeyword + ".jsp?extcmp=" + trackingParamGame + shareCodeAppend + httpParams;
		var gameButtonLink = urlBase + "/gamelanding/" + gameKeyword + ".jsp?extcmp=" + trackingParamButtonGame + shareCodeAppend + httpParams;
		var gameImageLink = urlBase + "/gamelanding/" + gameKeyword + ".jsp?extcmp=" + trackingParamImage +  shareCodeAppend + httpParams;
		var userLink = urlBase + "/member/profiles/" + userName + ".jsp?extcmp=" + trackingParamUser +  shareCodeAppend + httpParams;
		var playNowLink = urlBase + "/gamelanding/" + gameKeyword + ".jsp?extcmp=" + trackingParamPlayNow +  shareCodeAppend + httpParams;
		var shockwaveLink = urlBase + "/home.jsp?extcmp=" + trackingParamShockwave +  shareCodeAppend + httpParams;

		return {
			'gameImage':gameImageUrl,
			'gameLink':gameLink,
			'gameButtonLink':gameButtonLink,
			'gameImageLink':gameImageLink,
			'userLink':userLink,
			'playNowLink':playNowLink,
			'shockwaveLink':shockwaveLink
		};
	}

	this.generateDefaultMessage = function(localGameKeyword, inviteType) {
		// default messages based upon inviteType
		var customMessage = "";
		var typeShort = "lnk";

		if ('gamepageInvite' == inviteType) {
			customMessage = "{user_link} is playing {game_link} on {shockwave_link} and wants you to play, too! {game_description} {cmon_play_now_link}";
			typeShort = 'gpi';
		}
		if ('gamepageChallenge' == inviteType) {
			customMessage = "{user_link} is playing {game_link} on {shockwave_link} and is challenging you to play to beat their score! {game_description} Try to beat {user_link}'s score! {play_now_link}"
			typeShort = 'gpc';
		}
		if ('overlayChallenge' == inviteType) {
			customMessage = "{user_link} is playing {game_link} on {shockwave_link} and wants you to play, too! {user_link}'s high score is: {high_score}. Think you can beat it?  {play_now_link}";
			typeShort = 'olc';
		}
		if ('friendInvite' == inviteType) {
			customMessage = "{user_link} would like to become your friend on {shockwave_com_link} where you can play puzzle, racing, and brain games for free. Add {user_link} as a friend! and be automatically added to {user_link}'s Friends list on {shockwave_com_link}";
			typeShort = 'fri';
		}
		return {'message':customMessage, 'typeShort': typeShort};
	}

	this.parseMessage = function(localGameKeyword, inviteType, inviteTypeShort, customMessage, highScore, httpParams) {


		var swMemberId = $('#swMemberId').html();
		var swMemberName = $('#swMemberName').html();
		var swFirstName = $('#swFirstName').html();
		var swLastName = $('#swLastName').html();

		if (swFirstName.length == 0) swFirstName = swMemberName;

		var links = this.getLinks(inviteType, "", swMemberName, httpParams);

		var keywordLinkAppend = "";
		if (localGameKeyword != '') {
			keywordLinkAppend = "_" + localGameKeyword;
		}

		// get the facebook first name if we have one.
		if(typeof isFacebookConnected != "undefined" && isFacebookConnected){
			swFirstName = $("#fbFacebookFirstName").html();
		}


		if (typeof inviteType == 'undefined') inviteType = "friendInvite";
		var typeShort = "lnk";

		var userLink = "<a href='" + links.userLink + "'>" + swFirstName + "</a>";
		var gameLink = "<a href='" + links.gameLink + "'>" + gameTitle + "</a>";
		var playNowLink = "<a href='" + links.playNowLink + "'>Play Now!</a>";
		var cmonPlayNowLink = "<a href='" + links.playNowLink + "'>Check it out! C'mon Play Now!</a>";
		var shockwaveLink = "<a href='" + links.shockwaveLink + "'>Shockwave</a>";
		var shockwaveComLink = "<a href='" + links.shockwaveLink + "'>Shockwave.com</a>";


		// parse the tags into the actual links
		customMessage = customMessage.replace(/\{user_link\}/g,userLink);
		customMessage = customMessage.replace(/\{game_link\}/g,gameLink);
		customMessage = customMessage.replace(/\{shockwave_link\}/g,shockwaveLink);
		customMessage = customMessage.replace(/\{shockwave_com_link\}/g,shockwaveComLink);
		customMessage = customMessage.replace(/\{game_description\}/g,myGameDescription);
		customMessage = customMessage.replace(/\{cmon_play_now_link\}/g,cmonPlayNowLink);
		customMessage = customMessage.replace(/\{play_now_link\}/g,playNowLink);
		customMessage = customMessage.replace(/\{high_score\}/g,highScore);
		customMessage = customMessage.replace(/\{type\}/g, inviteTypeShort);


		// facebook message adds a button to the end of the message
		var facebookMessage = "";
		if(typeof isFacebookConnected != "undefined" && isFacebookConnected){

			var facebookButtonUrl = links.gameButtonLink;

			var facebookButton = "<fb:req-choice url='" + facebookButtonUrl + "' label='Go to Shockwave' />";
			facebookButton = facebookButton.replace(/\{type\}/g, typeShort);

			facebookMessage = customMessage + " " + facebookButton;

		}


		return {'message':customMessage, 'facebookMessage':facebookMessage};
	};


	/**
	 * This is the new showInviteFriends dialog
	 * @param inviteType
	 * @param shareCode
	 * @param title
	 * @param description
	 * @param limitParam
	 * @param customParams
	 * @param callback
	 */
	//this.inviteFriendDialog = function(inviteType, shareCode, giftUuid, title, description, limitParam, customParams, callbackFunction, redirectUri, gameImageUrl ) {
	this.inviteFriendDialog = function( options ) {

		if ( typeof(options) == 'undefined') options = this.options;

//		console.log("inviteFriendDialog()");
//		for (var key in options) {
//			if (options.hasOwnProperty(key))
//			{
//				console.log("\toption: " + key + "=" + options[key]);
//			}
//		}

		var httpParams = getHttpParamsFromParams(options.customParams);

		var links = this.getLinks(options.inviteType, options.shareCode, "", httpParams);

		// if the invites limit is not null and 0, that is the same as null
		if (typeof options.limitParam != 'undefined' && options.limitParam != null && options.limitParam == 0) options.limitParam = null;

		// if we have a callback, re-bind the link to pass through the callback
		// setup my vars so that we can call showInviteFriends again after we've connected
		options.giftImageUrl = links.gameImage;
		this.options = options;

		// If the inviteType matches the criteria below, just submit the invite to the server (login not required)
		var urlBase = getWindowUrlBase();
		if ( "gameNextMove" == options.inviteType ) {
			$.post("/member/sendInviteMail.jsp",
					{
						personalMessage: options.description,
						inviteType: options.inviteType,
						invitesLimit: options.limitParam,
						customInviteParams: options.customParams
					}
			);
			return;
		}

		// if the user is not logged in, pop open the login
		if (userInfo.signedInStateCode == 'NSI') {
			showStaticSignIn(inviteFriendDialogCallback);
			return;
		}

		var localGameKeyword = gameKeyword;
		var highScore =  typeof(bestScore) != 'undefined' ? bestScore : "";

		// put member's shockwave-friends in session
		//$.post("/member/populateSessionFriends.jsp" );


		var cm = options.description;
		var cmForShockwave = "";
		var typeShort = "lnk";
		var passCm = false;
		if (cm && cm.length > 0) {
			if ("chess-rivals" == localGameKeyword) {
				cm = "A Chess Rivals challenge from {user_link} - " + cm;
			}
			passCm = true;
		} else {
			var res = this.generateDefaultMessage(localGameKeyword, options.inviteType);
			typeShort = res.typeShort;
			cm = res.message;
		}


		// pass this up to the custom message
		if (passCm) cmForShockwave = cm;


		// these are only used in the shockwave and email templates, the FB request only uses the custom message
		var customImageUrl = "";
		var customImageLinkUrl = "";
		var customTitle = "";

		if (options.shareCode && options.shareCode.length > 0)
		{
			customImageUrl = links.gameImage;
			customTitle = options.title;
		}

		if (!(options.inviteType && options.inviteType.length > 0)) options.inviteType = "friendInvite";

		if (options.limitParam) options.invitesLimit = options.limitParam;

		var inviteParams = "?m=" + cmForShockwave +
				"&t=" + (( typeof options.inviteType != 'undefined' && options.inviteType != null ) ? options.inviteType : "") +
				"&l=" + (( typeof options.invitesLimit != 'undefined' && options.invitesLimit != null ) ? options.invitesLimit : "") +
				"&ci=" + customImageUrl +
				"&ct=" + customTitle +
				"&p=" + (( typeof options.customParams != 'undefined' && options.customParams != null ) ? escape( options.customParams ) : "") +
				"&giftUuid=" + options.uuid +
				"&giftName=" + options.giftName +
				"&giftCode=" + options.shareCode;
		var requestUrl = "/ajax/inviteFriendsFormPod.jsp" + inviteParams;
		var myObj = this;

		showAjaxMessage(requestUrl, "#inviteFriend", true, 760, null, null, null, function() {


			// parse the message - the data is in the form, so this has to be called after the form loads
			var cmRes = myObj.parseMessage(localGameKeyword, options.inviteType, typeShort, cm, highScore, httpParams);

			// if the dialog is invoked multiple times on one page the isShockwaveFriends field may
			// lead to false positives (it's set right before the form is submitted), so we reset it here
			$("#isShockwaveFriends").val("false");

			// initialise inviteSWFriends object
			inviteSWFriends.init( options.limitParam );


			// assign the cancel callback to the close buttons if specified
			$(".dimmerBtnClose, .hideMessageBtn").bind( 'click', function() {

				callShowInviteCallback(options.callbackFunction, 'cancelled');
			});

			$(".facebookSignInFromInviteForm").bind( 'click', function() {
				hideMessage();
				facebookConnectLink( inviteFriendDialogCallback );
				btg.Controller.sendLinkEvent('fbc_btn_mysw_friends_invite');
				return false;
			});

			$( ".inviteFriendMultiSelect" ).unbind( "mouseover" );
			$( ".inviteFriendMultiSelect" ).bind( "mouseover", function() {
				inviteSWFriends.highlightElement( $(this) );
			});
			$(".inviteFriendMultiSelect").live("mouseout", function() {
				$(this).removeClass("inviteFriendMultiHighlight");
			});

			// if inviteType == friendInvite, remove the 'shockwave friends' tab from the dialog
			if (options.inviteType === "friendInvite") {
				$("#inviteShockwaveFriendTab").remove();
				$("#comm-2").remove();
			}

			$("#challengeFriend").tabs();


			if(typeof isFacebookConnected != "undefined" && isFacebookConnected){

				var facebookInviteLimit = $('#fbFacebookInviteLimit').html();

				var redirectPage = urlBase + options.redirectUri;
				var excludeList = "";
				if (myObj.users) {
					for (i = 0;i < myObj.users.length;i++) {
						//console.log("user: " + myObj.users[i].name + ", source: " + myObj.users[i].source + ", id: " + myObj.users[i].reference);
						if (myObj.users[i].source == 'Facebook') {
							if (excludeList.length > 0) {
								excludeList = excludeList + ",";
							} else {
								excludeList = " exclude_ids=\"";
							}
							excludeList = excludeList + myObj.users[i].reference;
						}
					}
					if (excludeList.length > 0) excludeList = excludeList + "\"";
				}

				var fbml = "<fb:fbml>" +
					"<fb:request-form id=\"fbRequestForm\" method=\"POST\" action=\"" + redirectPage + "\" invite=\"true\" type=\"Shockwave\" content=\"" + cmRes.facebookMessage + "\" target=\"_self\">" +
					"<input type=\"hidden\" name=\"inviteType\" value=\"" + options.inviteType + "\"/>" +
					"<input type=\"hidden\" name=\"shareCode\" value=\"" + options.shareCode + "\"/>" +
					"<input type=\"hidden\" name=\"giftUuid\" value=\"" + options.giftUuid + "\"/>" +
					"<input type=\"hidden\" name=\"gameKeyword\" value=\"" + localGameKeyword + "\"/>" +
					"<fb:multi-friend-selector " + facebookInviteLimit + excludeList + " showborder=\"false\" rows=\"2\" cols=\"4\" bypass=\"cancel\" email_invite=\"false\" actiontext=\"Send Shockwave Friend Invitation\" import_external_friends=\"false\" target=\"_self\"/>" +
					"</fb:request-form></fb:fbml>";

				//hack to get fb friends in dimmer message http://langer.tumblr.com/post/159961006
				$("#fbFriendsContainer").html('<fb:serverfbml id="fbFriends" width="660"></fb:serverfbml>');
				var new_elm = $('<script>');
				new_elm.attr('type', 'text/fbml');
				new_elm.attr('text', fbml);
				$('#fbFriends').html(new_elm);

				// the trigger to bind a function on frame reload needs to be done only after we've
				// loaded the FBML, otherwise the iframe load would happen twice.
				FB.XFBML.parse(document.getElementById('fbFriendsContainer'), function() {

					// the frame reloads into itself, because the target is _self, so this triggers to close the message when
					// we know we've reloaded
					$("#fbFriendsContainer").find("iframe").load(function() {


						// get the data from the resulting JS coming from the reload
						var json = readCookie('facebookRecipients');
						//eraseCookie('facebookUserJson');

						var jsonObject = "success";
						if (json && json.length > 0) {

							if (json.substring(0,1) == '"') {
								json = json.slice(1, json.length - 1);
							}
							json = json.replace(/\\/g,"");
							jsonObject = eval('(' + json + ')');

							var gameKeywordAppend = "";
							if (gameKeyword) gameKeywordAppend = "_" + gameKeyword;
							var linkEvent = "inv_out_fb_" + options.inviteType + gameKeywordAppend;
							btg.Controller.sendLinkEvent(linkEvent);
						}

						hideMessage();

						callShowInviteCallback(options.callback, jsonObject);

					});
				});
			}

			//populate preview text
			var previewTextUrl = "/member/inviteCopy.jsp?inviteType=" + options.inviteType;
			if ( options.inviteType !== "friendInvite" ) {
				previewTextUrl = previewTextUrl + "&gameKeyword=" + localGameKeyword;
			}
			if ( options.giftCode !== "" ) {
				previewTextUrl = previewTextUrl + "&giftCode=" + options.giftCode;
			}
			if ( highScore !== "" ) {
				previewTextUrl = previewTextUrl + "&bestScore=" + highScore;
			}
			if ( customImageUrl !== "" ) {
				previewTextUrl = previewTextUrl + "&customImageUrl=" + customImageUrl;
			}
			if ( customImageLinkUrl !== "" ) {
				previewTextUrl = previewTextUrl + "&customImageLinkUrl=" + customImageLinkUrl;
			}
			if ( customTitle !== "" ) {
				previewTextUrl = previewTextUrl + "&customTitle=" + customTitle;
			}
			if ( cmForShockwave !== "" ) {
				previewTextUrl = previewTextUrl + "&customMessage=" + cmForShockwave;
			}
			$.get( previewTextUrl, function(data) {
				$( ".invitePreviewText" ).html( data );
			});

		});
	};


	this.facebookShareGame = function(shareCode, title, description, callback, customParams) {
		var myObj = this;
		FB.getLoginStatus(function(response) {
			if (response.authResponse) {
				myObj.facebookShareGameReturn(shareCode, title, description, callback, customParams);
			} else {
				showAjaxMessage( '/ajax/facebookConfirmNSIPod.jsp', '#facebookConfirmNSIPopup', false, '340', '', '', '', function () {
					$("#facebookConfirmPopupButton").click(function () {
						hideMessage();
						facebookPopupOpened();
						FB.login(function(response) {
							if (response.authResponse) {
								clickFacebookConnect(function () {
									hideFlashObjects();
									notifyServiceManager("LOGIN");
								});
								myObj.facebookShareGameReturn(shareCode, title, description, callback, customParams);
							} else {
								callShowInviteCallback(callback, 'cancelled');
								facebookPopupClosed();
							}
						}, false);
					});
					// need to send canceled message to flash if close overlay icon is clicked
					$('.dimmerBtnClose').click(function() {
						callShowInviteCallback(callback, 'cancelled');
						hideMessage();
						return false;
					});
				});

			}
		});
	};

	this.facebookShareGameReturn = function(shareCode, title, description, callback, customParams) {

		facebookPopupOpened();

		var httpParams = getHttpParamsFromParams(customParams);

		var links = this.getLinks("post", shareCode, "", httpParams);

		var imageUrl = links.gameImage;
		var imageLinkUrl = links.gameImageLink;
		var linkUrl = links.gameLink;

		//console.log("imageUrl: " + imageUrl + ", imageLinkUrl: " + imageLinkUrl + ", linkUrl: " + linkUrl);

		var attachment = {
			'media': [{'type':'image',
					 'src':imageUrl,
					 'href':imageLinkUrl}],
			'name':title,
			'description':description,
			'href': linkUrl
		};

		var actionLinks = [{ "text": "Play Now", "href": linkUrl}];

		var json = {
				method: 'stream.publish',
				message: '',
				attachment: attachment,
				action_links: actionLinks,
				user_prompt_message: prompt
			   };

		FB.ui( json, function(response) {
			if (response && response.post_id) {
				var customLink = 'fbc_share_prompt_' + gameID + '_' + shareCode;
				var omniVars= {
					events: "event22",
					prop12: customLink
				};
				sendCustomLinkEvent(customLink, omniVars);
				callShowInviteCallback(callback, 'success');
				facebookPopupClosed();

			}
			else
			{
				callShowInviteCallback(callback, 'cancelled');
				facebookPopupClosed();
			}
		});

	};
};

function notifyServiceManager( command, object ){
	var flash = getFlashObject();
	flash.notifyServiceManager(command, object);
}

function getFlashObject() {
	var flashId = "FlashContent";  // REQUIRES flash game to have this ID

	// For IE
	if ( ! jQuery.support.opacity ) {
		return document.getElementById( flashId );
	// For other browsers
	} else {
		return eval( "document." + flashId );
	}
}
