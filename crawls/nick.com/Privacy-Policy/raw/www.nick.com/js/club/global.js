NICK.namespace("club.global");

NICK.club.global.buddyRequestData  = null;

//get buddy requests
NICK.club.global.getBuddiesRequest = function(callback) {
		NICK.request.doRequest({
			dataType: "jsonp",
			url: "http://" + NICK.utils.getNickDomain() + "/sbcom/data/profile/nick/buddy/getBuddyRequestList.jhtml",
			onSuccess: callback
		});
}

NICK.club.global.gotoProfile = function(section, userTrak){
	if(userTrak == undefined){ userTrak = "unknown"};
	section = !!section ? section : "main";
	if (NICK.login.isLoggedIn()) {
		NICK.club.global.goToProfileLink(section);
	}
	else {
		NICK.login.prompt(userTrak);
		$(document).bind("authStatus loggedIn", function(){
			if (NICK.login.isLoggedIn()) {
				NICK.club.global.goToProfileLink(section);
			}
		})
	}
}

NICK.club.global.goToProfileLink = function( section ) {
	var link = "http://" + NICK.utils.getNickDomain() + "/club/" + section + "/"+NICK.login.getNickName()+"/";
	if ( NICK.get('adfree') == 'true' ) {
		NICK.utils.openBumper('fullPage', link, null, null, null, false);
	} else {
		window.location = link;
	}
}

NICK.club.global.goToBuddyRequest = function() {	
	var link = "http://" + NICK.utils.getNickDomain() + "/club/buddies/buddies-request.html";
	if ( NICK.get('adfree') == 'true' ) {
		NICK.utils.openBumper('fullPage', link, null, null, null, false);
	} else {
		window.location = link;
	}
}