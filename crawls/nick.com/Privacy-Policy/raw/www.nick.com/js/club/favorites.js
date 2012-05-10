/* Settings Panel */
NICK.namespace('club.favorites');

NICK.club.favorites.attributePrivacy = 'nick_privacy';
NICK.club.favorites.settingsSetUrl		=	'http://'+ NICK.utils.getNickDomain() + '/sbcom/data/profile/nick/setStringAttr-JS.jhtml';
NICK.club.favorites.settingsGetUrl		=	'http://'+ NICK.utils.getNickDomain() + '/sbcom/data/profile/nick/getAttrValue-JS.jhtml';
NICK.club.favorites.favoritesSetUrl		=	'http://'+ NICK.utils.getNickDomain() + '/sbcom/data/profile/nick/setFavListAuth-JS.jhtml';
NICK.club.favorites.itemId = null;
NICK.club.favorites.attribute = null;

NICK.club.favorites.addFavorite = function(itemId, attribute) {
	this.itemId = itemId;
	this.attribute = attribute;
	if(!NICK.utils.isEmptyString(NICK.login.getNickName())){
		NICK.club.favorites.getFavorites(attribute, function( response ) {
			if ( response.attributeValue == null || response.attributeValue.split(",").length < 100 ) {
				NICK.club.favorites.saveMergedFavorites(itemId, response, attribute, false);
				//reporting moved to saveMergedFavorites

			} else {
				NICK.overlay.message("Oops! We're sorry, but you must remove a game from your favorites before you can add this one.");
			}
		});
	}else{
		NICK.login.prompt();
		$(document).bind("authStatus loggedIn", function(){
			if (NICK.login.isLoggedIn()) {
				NICK.club.favorites.getFavorites(attribute, function(response) {
					NICK.club.favorites.saveMergedFavorites(itemId, response, attribute, true);
					//reporting moved to saveMergedFavorites
				});
			}
		})
	}
}

NICK.club.favorites.onRemovedClicked = function(cmsid,attribute, element){
	NICK.club.favorites.removeFavorite(cmsid,attribute);
	$(element).parent("li").trigger('deleted').remove();
}

NICK.club.favorites.removeFavorite = function(itemId, attribute) {
	//reporting removed from 	/*try{KIDS.reporting.omnifunctions.sendClubProfileEdit("remove", attribute, itemId);}catch(error){}*/
	
	NICK.club.favorites.getFavorites(attribute, function(response) {
		NICK.club.favorites.searchAndRemoveFavorite(itemId, response, attribute);
	});
}

NICK.club.favorites.getFavorites = function(attribute, callback) {
	NICK.club.favorites.getAttribute(attribute, callback, NICK.club.favorites.settingsGetUrl);
}

NICK.club.favorites.getAttribute = function(attribute, callback, attrGetUrl, user) {
	if(!attribute) attribute = NICK.club.favorites.attributePrivacy;
	if(!attrGetUrl) attrGetUrl = NICK.club.favorites.settingsGetUrl;
	if(!user) user = NICK.login.getNickName();
	
	var requestParams = {
		//sbauth:SBCOM.utils.getCookie('auth'), // if auth url
		username:user,
		attName:attribute
	}
	
	NICK.request.doRequest({
		dataType: "jsonp",
		url: attrGetUrl,
		data: requestParams,
		onSuccess: callback,
		onFail: function(errors){
			for (var error in errors) {
				NICK.utils.doLog("Sort Response: Error: " + error + " - " + errors[error]);
			}
		}
	});
}

NICK.club.favorites.searchAndRemoveFavorite = function(itemId, response, profileAttribute) {
	if(!response) return;
	
	var favorites = NICK.club.favorites.getFavoritesArray(response.attributeValue);
	
	if(favorites == null || favorites.length <= 0) {
		NICK.utils.doLog('you have no favorite, therfore nothing to remove');
	} else {
		var tempArray = new Array();
		for(var i = 0; i < favorites.length; i++) {
			if(itemId != favorites[i]) {
				tempArray.push(favorites[i])
			}
		}
		
		if(favorites.length == tempArray.length){
			NICK.utils.doLog('Item can not be found');
		}else{
			favorites = tempArray;
			
			NICK.club.favorites.saveFavorites(profileAttribute, favorites.toString(), NICK.club.favorites.savedFavorite);
		}
		
	}	
}

NICK.club.favorites.saveMergedFavorites = function(itemId, response, profileAttribute, afterLogin) {
	if ( !response )
		return;

	//Clean out favs for blank spaces and -1
	
	// Collect current favorites as array
	var currentFavorites = this.getFavoritesArray( response.attributeValue );

	// Check if this user already has this item as a favorite
	if ( this.hasFavorite( itemId, currentFavorites ) ) {
		NICK.overlay.message("You already saved this item in your favorite.");
	} else {
		currentFavorites.push( itemId );

		this.saveFavorites(profileAttribute, currentFavorites.toString(), function() {
			var msg, section;

			switch( profileAttribute ) {
				case "fav_games":
					section = "games";
					msg = "This is now one of your favorite games!<br />You can find your other favorites on your Profile!";
					break;
				case "fav_videos":
					section = "videos";
					msg = "This is now one of your favorite videos!<br />You can find your other favorites on your Profile!";
					break;
				case "fav_shows":
					section = "shows";
					msg = "You are now a fan of this show! Your profile will show an exclusive badge and you'll get even more fan exclusives in the future!";
					break;
				case "fav_stars":
					section = "star";
					msg = "You are now a fan of this star! Whenever there's news, you'll be the first to find out on your profile!";
					break;
				default:
					section = "main";
					msg = "This is now one of your favorites!<br />You can find your other favorites on your Profile!";
			}
			
			NICK.club.favorites.setFavoriteButtonText();
			
			setTimeout( function() {
				NICK.club.favorites.saveOverlay( msg, section );
			}, ( afterLogin ? 0 : 1500 ) );
		});
		try{
			var urlAlias = KIDS.get("urlAlias");
			//KIDS.reporting.omnifunctions.sendClubProfileEdit("add", attribute, itemId);  call from add favorite
			if(profileAttribute == "fav_shows"){
				KIDS.reporting.omnifunctions.sendClubProfileEdit("add", profileAttribute, itemId);
			}else{
				KIDS.reporting.omnifunctions.sendClubProfileEdit("add", profileAttribute, urlAlias);
			}
		}catch(error){
			
		}
	}
}
NICK.club.favorites.setFavoriteButtonText = function (){
	if($("#become-a-fan").length){
		$("#become-a-fan").addClass("isFan");
		$("#become-a-fan a").html($("#become-a-fan a").html().replace('Become a',"You are a") );
	}
}
NICK.club.favorites.resetFavoriteButtonText = function (){
	if($("#become-a-fan").length){
		$("#become-a-fan").removeClass("isFan");
		$("#become-a-fan a").html($("#become-a-fan a").html().replace("You are a",'Become a') );
	}
}

NICK.club.favorites.getFavoritesArray = function( strFavoriteList ) {
	if ( !!!strFavoriteList || typeof strFavoriteList != "string" )
		return [];
	//split and remove any spaces or -1
	
	var favList = strFavoriteList.split(",");
	try{
	for (var i=favList.length-1; i>=0; i--) {
	    if (favList[i] == "" || favList[i] == "-1" ) {
	    	favList.splice(i, 1);
	    }
	}}catch(err){NICK.utils.doLog('Error cleaning fav array');}
	
	return favList;
}

NICK.club.favorites.hasFavorite = function(itemId, favorites) {
	if(!favorites) return false;
	for(var i = 0; i < favorites.length; i++) {
		if(itemId == favorites[i]) return true;
	}
	return false;
}

/*NICK.club.favorites.savedFavorite = function(response) {
	if(response == null) {
		NICK.utils.doLog('msg_favorites_saves_error');
		NICK.overlay.open('Error', "/overlay/favorite-error.html");
	} else if(response.code == 'OK') {
		NICK.utils.doLog('msg_favorites_saved');
		NICK.overlay.open('Message', "/overlay/favorite-success.html");
	} else if(response.message && response.message.toLowerCase() == 'notloggedin') {
		NICK.utils.doLog('msg_favorites_login_error');
		//NICK.overlay.open('', "/overlay/favorite-error-login.html");
	} else {
		NICK.utils.doLog('msg_favorites_saves_error');
	}
}*/

NICK.club.favorites.saveFavorites = function(attribute, attributeValue, callback) {
	NICK.club.favorites.setAttribute(attribute, attributeValue, callback, NICK.club.favorites.favoritesSetUrl);
}

NICK.club.favorites.setAttribute = function(attribute, attributeValue, callback, attrSetUrl) {
	if(!attribute) return;
	if(!attributeValue) attributeValue="-1";
	if(!attrSetUrl) attrSetUrl = NICK.club.favorites.settingsSetUrl;

	var requestParams = {
		//sbauth:SBCOM.utils.getCookie('auth'),
		screenName:NICK.login.getNickName(),
		attName:attribute
	}
	requestParams[attribute] = attributeValue;
	NICK.request.doRequest({
		dataType: "jsonp",
		url: attrSetUrl,
		data: requestParams,
		onSuccess: callback,
		onFail: function(errors){
			for (var error in errors) {
				NICK.utils.doLog("Sort Response: Error: " + error + " - " + errors[error]);
			}
		}
	});
}

NICK.club.favorites.saveOverlay = function( message, section ) {
	NICK.overlay.customHTML( 'Save Favorite',
			'<p style="padding-bottom: 10px;">' + message + '</p>' +
			'<a href="javascript:NICK.overlay.close()" style="float: left; display: inline; margin-right: 5px;" class="icon icon-close">Close</a><a href="javascript:NICK.club.global.gotoProfile()" style="float: left;" class="icon icon-gotoprofile">Go to Profile</a>',
			400 );
}

NICK.club.favorites.removeFavoriteDialog = function( cmsid, attribute, element ) {
	var msg;

	switch( attribute ) {
		case "fav_games":
			msg = "Are you sure you want to remove this game from your favorites?";
			break;
		case "fav_videos":
			msg = "Are you sure you want to remove this video from your favorites?";
			break;
		case "fav_shows":
			msg = "Are you sure you want to stop being a fan of this show?";
			break;
		default:
			msg = "Are you sure you want to remove this item from your favorites?";
	}

	NICK.overlay.confirm(msg, function(){
		NICK.club.favorites.onRemovedClicked(cmsid, attribute, element);
	}, null);
}



