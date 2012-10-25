if(location.protocol != 'https'){

	// Call event manager to get most recent token balance and update page display
	memberAwards_updateMemberTokenBalance = function( memberId )
	{
		var topdir = ( parseInt( memberId / 1000000 ) % 100 ).toString();
		var subdir = ( parseInt( memberId / 1000 ) % 1000 ).toString();
		while ( topdir.length < 2 ) topdir = "0" + topdir;
		while ( subdir.length < 3 ) subdir = "0" + subdir;

		var tokenBalanceUrl = eventManagerBaseUrl + "/shockwave/member/" + topdir + "/" + subdir + "/awards." + memberId + ".dat?callback=?";

		$.getJSON(tokenBalanceUrl,
			function(data) {
				// Do nothing. Callback is handled in awardResponseCallback()
			}
		);
	};

	// Callback function accessed directly from event manager .dat files
	awardResponseCallback = function(data)
	{
		var awardData = eval('(' + data + ')');

		// Iterate through the awardData.MemberAwards to pull out the Trophies and Tokens won
		var trophiesWon = new Array();
		if ( awardData && awardData.MemberAwards ) {
			for ( award in awardData.MemberAwards ) {

				// If we're looking at the tokens, update them
				if ( award == "Tokens" ) {

					var newTokenBalance = awardData.MemberAwards[award].Value;
					$.cookie('token_balance_lifetime',awardData.MemberAwards[award].LifetimeValue, { path: '/', domain: '.shockwave.com' });

					// if newTokenBalance is different than currentTokenBalance, then update page and cookie
					if ( newTokenBalance != currentTokenBalance ) {
						updateTokens( newTokenBalance );
						currentTokenBalance = newTokenBalance;
						// set token_balance cookie
						$.cookie('token_balance',currentTokenBalance, { path: '/', domain: '.shockwave.com' });
					}

				// If we're looking at scash, update it
				} else if ( award == "shockwave-cash" ) {

					var newCashBalance = awardData.MemberAwards[award].Value;

					// if newCashBalance is different than currentCashBalance, then update page and cookie
					if ( newCashBalance != currentCashBalance ) {
						updateCash( newCashBalance );
						currentCashBalance = newCashBalance;
						// set token_balance cookie
						$.cookie('cash_balance',currentCashBalance, { path: '/', domain: '.shockwave.com' });
					}

				// otherwise, add the value to the trophies won cookie string
				} else {
					trophiesWon.push( award );
				}
			}

			// write the trophies cookie
			//$.cookie('trophies_won',trophiesWon.join(","), { path: '/', domain: '.shockwave.com' });
			// TODO: temporarily write blank trophies_won cookie until create and share akamai is fixed.  see pete
			$.cookie('trophies_won',"", { path: '/', domain: '.shockwave.com' });

		// if we have no member data be sure to blank out the cookies for the next user
		} else {
			$.cookie('token_balance_lifetime',0, { path: '/', domain: '.shockwave.com' });
			$.cookie('token_balance',0, { path: '/', domain: '.shockwave.com' });
			$.cookie('trophies_won',"", { path: '/', domain: '.shockwave.com' });
		}

		// Iterate through the awardData.EventData to pull out the last member event
		if ( awardData && awardData.EventData ) {
			if( awardData.EventData.Event ) {
				var lastEventName = awardData.EventData.Event.Code;
			}
			var lastEventDate = awardData.EventData.Time;
			if( awardData.EventData.Element ) {
				var lastEventSource = awardData.EventData.Element.SourceElementReference;
			}

			for ( award in awardData.EventData.MemberEventAwards ) {

				// Grab only the tokens
				if ( award == "Tokens" ) {
					var lastEventTokenCount = awardData.EventData.MemberEventAwards.Tokens.Value;
				}
			}
			var memberEventCookieValue = lastEventName + "||" + lastEventDate + "||" + lastEventSource + "||" + lastEventTokenCount;
			$.cookie('last_member_event', memberEventCookieValue, { path: '/', domain: '.shockwave.com' });

			// If the last token message element is available on page write the values now
			$("#podMyTokensPrizes").each( function(){
				//loadLastTokenEvent();
			})

		// if we have no event data be sure to blank out the cookies for the next user
		} else {
			$.cookie('last_member_event', "", { path: '/', domain: '.shockwave.com' });
		}

	};

	loadLastTokenEvent = function() {

		// Pull the event values from the cookie
		var lastMemberEvent = $.cookie( 'last_member_event' ).split( "||" );
		if( lastMemberEvent != null && lastMemberEvent.length == 4 ) {
			// Note: position of the values is specific based on where the cookie is set
			var lastEventName = lastMemberEvent[0];
			var lastEventDate = lastMemberEvent[1];
			var lastEventSource = lastMemberEvent[2];
			var lastEventTokenCount = lastMemberEvent[3];

			// check to make sure values are valid
			if ( lastEventName != null && lastEventDate != null && lastEventSource != null &&
					lastEventTokenCount != null ) {

				// Last member event messages
				var tokenEventMessages = {
					GameComplete :		   				"You earned <b>{0}</b> tokens for playing <a href='/gamelanding/{1}.jsp'>{2}</a> on {3}",
					GameStart :		       				"You spent <b>{0}</b> tokens for playing <a href='/gamelanding/{1}.jsp'>{2}</a> on {3}",
					GameUpdate :		   				"You earned <b>{0}</b> tokens for playing <a href='/gamelanding/{1}.jsp'>{2}</a> on {3}",
					GameDownload :		   				"You earned <b>{0}</b> tokens for downloading and playing <a href='/gamelanding/{1}.jsp'>{2}</a> on {3}",
					GamePurchase :		   				"You earned <b>{0}</b> tokens for purchasing <a href='/gamelanding/{1}.jsp'>{2}</a> on {3}",
					GameRating :		   				"You earned <b>{0}</b> tokens for rating <a href='/gamelanding/{1}.jsp'>{2}</a> on {3}",
					GameReview :		   				"You earned <b>{0}</b> tokens for reviewing <a href='/gamelanding/{1}.jsp'>{2}</a> on {3}",
					GameShareConsumer :		   			"You earned <b>{0}</b> tokens for accepting a friend's invitation to play <a href='/gamelanding/{1}.jsp'>{2}</a> on {3}",
					GameShareProducer :		   			"You earned <b>{0}</b> tokens for sharing <a href='/gamelanding/{1}.jsp'>{2}</a> with a friend on {3}",
					InstantWin :		   				"You used <b>{0}</b> tokens for playing scratcher <a href='/gamelanding/{1}.jsp'>{2}</a> on {3}",
					SweepstakeEntry :		   			"You traded <b>{0}</b> tokens for <b>sweepstakes tickets</b> on {3}",
					ProfileComplete : 					"You earned <b>{0}</b> tokens for completing your <b>profile</b> on {3}",
					NewsletterSubscription : 			"You earned <b>{0}</b> tokens by signing up for the {1} on {3}",
					MembershipSubscriptionPurchase :	"You earned <b>{0}</b> tokens by signing up for a <b>{1}</b> on {3}",
					MembershipSubscriptionRenewal : 	"You earned <b>{0}</b> tokens by renewing your <b>{1}</b> on {3}",
					MembershipSubscriptionUpgrade : 	"You earned <b>{0}</b> tokens by upgrading to a <b>{1}</b> on {3}",
					MembershipSubscriptionExisting :	"You earned <b>{0}</b> tokens by signing up for a <b>{1}</b> on {3}"
				};

				var tokenImageUrls = {
					GameComplete : 			"i/picons/" + lastEventSource + "_regular.jpg",
					GameStart : 			"i/picons/" + lastEventSource + "_regular.jpg",
					GameUpdate : 			"i/picons/" + lastEventSource + "_regular.jpg",
					GameDownload : 			"i/picons/" + lastEventSource + "_regular.jpg",
					GamePurchase : 			"i/picons/" + lastEventSource + "_regular.jpg",
					GameRating : 			"i/picons/" + lastEventSource + "_regular.jpg",
					GameReview : 			"i/picons/" + lastEventSource + "_regular.jpg",
					GameShareConsumer : 	"i/picons/" + lastEventSource + "_regular.jpg",
					GameShareProducer : 	"i/picons/" + lastEventSource + "_regular.jpg",
					InstantWin : 			"/i/picons/non_game_instant_win_regular.jpg",
					SweepstakeEntry : 		"/i/picons/non_game_sweepstakes_regular.jpg",
					ProfileComplete : 		"/i/picons/non_game_complete_profile_regular.jpg",
					NewsletterSubscription : 	"/i/picons/non_game_newsletter_regular.jpg",
					MembershipSubscriptionPurchase :	"/i/picons/{1}.jpg",
					MembershipSubscriptionRenewal : 	"/i/picons/{1}.jpg",
					MembershipSubscriptionUpgrade : 	"/i/picons/{1}.jpg",
					MembershipSubscriptionExisting: 	"/i/picons/{1}.jpg"
				};

				var membershipUrls = {
					SIS : "non_game_free_reg_regular",
					SIC : "non_game_club_v2_regular",
					SIP : "non_game_swu_v2_regular"
				};



				// look up the message to display based on last event name
				var tokenMessage = tokenEventMessages[lastEventName];
				if ( tokenMessage != null ) {

					// replace variables with values
					tokenMessage = tokenMessage.replace( '{0}', lastEventTokenCount );
					tokenMessage = tokenMessage.replace( '{1}', lastEventSource );
					tokenMessage = tokenMessage.replace( '{2}', lastEventSource ); // to be replaced with game title
					tokenMessage = tokenMessage.replace( '{3}', lastEventDate );

					// Inject message into html
					$("#lastTokenEvent").html( tokenMessage );
				}

				// update image
				var tokenImageUrl = tokenImageUrls[lastEventName];
				if( tokenImageUrl != null ) {
					var membershipSrc = membershipUrls[lastEventSource];
					if( membershipSrc != null ) {
						tokenImageUrl = tokenImageUrl.replace( '{1}', membershipSrc );
					}
					$("#lastTokenEventImage").attr( "src", tokenImageUrl );
				}
			}
		}
	};
}