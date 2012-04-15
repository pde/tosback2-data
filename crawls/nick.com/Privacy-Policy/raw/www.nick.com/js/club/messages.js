NICK.namespace("club.messages");
NICK.club.messages.getAttrUrl = 'http://'+ NICK.utils.getNickDomain() + '/sbcom/data/profile/nick/getTracker-JS.jhtml';
NICK.club.messages.list = {
	"loginWelcome":{"legacyUser":"/overlay/legacyLoginWelcome.html" , "newUser":"none"},
	"profileWelcome":{"legacyUser":"/overlay/legacyProfileWelcome.html" , "newUser":"/overlay/newProfileWelcome.html"},
	"whereIsMyStuff":{"legacyUser":"/overlay/legacyWhereIsMyStuff.html" , "newUser":"/overlay/newWhereIsMyStuff.html"},
	"whereAreMyBuddies":{"legacyUser":"/overlay/legacyWhereAreMyBuddies.html" , "newUser":"/overlay/newWhereAreMyBuddies.html"},
	"firstRoomVisit":{"legacyUser":"/overlay/legacyFirstRoomVisit.html" , "newUser":"/overlay/newFirstRoomVisit.html"}
}

$(document).bind("clubReady", function(){
	
})


NICK.club.messages.loginWelcome = function(){
	if(NICK.login.isLoggedIn()){
		NICK.club.messages.load("loginWelcome",function(data){
			NICK.club.messages.showMessage(data, "loginWelcome", 'Welcome to Nick.com!');
		})
	}
}

NICK.club.messages.profileWelcome = function(){
	if(NICK.club.loginName!=""){
		
		NICK.club.messages.load("profileWelcome",function(data){
			NICK.club.messages.showMessage(data, "profileWelcome", 'Welcome to your new Profile Page!');
		})
	}
}

NICK.club.messages.whereIsMyStuff = function(){
	if(NICK.club.loginName!=""){
		NICK.club.messages.load("whereIsMyStuff",function(data){
			NICK.club.messages.showMessage(data, "whereIsMyStuff", 'Where is my stuff?');
		})
	}
}

NICK.club.messages.whereAreMyBuddies = function(){
	if(NICK.club.loginName!=""){
		NICK.club.messages.load("whereAreMyBuddies",function(data){
			/********FOR TESTING************/
			//data.attributeValue = "true";
			//*test new user
			//NICK.login.getCreated() = "2010-03-01";
			//*test legacy user
			//NICK.login.getCreated() = "2010-01-01";
			/********FOR TESTING************/
			if (data.code == "OK" && data.attributeValue == "false") {
				if(NICK.club.messages.toDate(data.legacyUserDate) > NICK.club.messages.toDate(NICK.login.getCreated())){
					//legacy msg
					$("#where-old-buddies").show();
				}else{
					$("#where-old-buddies").hide();
				}
				
			}
		})
	}
}

NICK.club.messages.firstRoomVisit= function(){
	if(NICK.club.loginName!=""){
		NICK.club.messages.load("firstRoomVisit",function(data){
			NICK.club.messages.showMessage(data, "firstRoomVisit", 'Welcome to your new room!');
		})
	}
}

NICK.club.messages.load = function(attr, callback){
	var username = NICK.login.getNickName();
	NICK.request.doRequest({
			dataType: "jsonp",
			url: this.getAttrUrl,
			data: {username:username,attName:attr},
			onSuccess: callback,
			onFail: function(errors){
				for (var error in errors) {
					NICK.utils.doLog("Sort Response: Error: " + error + " - " + errors[error]);
				}
			}
		});
}

NICK.club.messages.showMessage = function(data,attr,title){
	
	/********FOR TESTING************/
		//data.attributeValue = "false";
		//*test new user
		//NICK.login.getCreated() = "2010-03-01";
		//*test legacy user
		//NICK.login.getCreated() = "2010-01-01";
	/********FOR TESTING************/
	//alert(data.attributeValue)
	if(data.code=="OK" && data.attributeValue == "false"){
		if(this.toDate(data.legacyUserDate) > this.toDate(NICK.login.getCreated())){
			//legacy msg
			var msgUrl = NICK.club.messages.list[attr].legacyUser;
		}else{
			//new msg
			var msgUrl = NICK.club.messages.list[attr].newUser;
		}
		if(msgUrl!="none"){
			NICK.overlay.open(title, msgUrl);
		}else{
			NICK.overlay.close();
		}
	
		NICK.club.favorites.setAttribute(attr, "true", function(data){}, NICK.club.favorites.settingsSetUrl);
	}else{
		NICK.overlay.close();
	}
}

NICK.club.messages.toDate = function(strdate){
	var arrDate = strdate.split("-");
	return (new Date(arrDate[0],arrDate[1]-1,arrDate[2]));
}

/* replace messageboard-embedded 'marquee' tags with spans */
$(window).load(function() {
	$("marquee").each(function() {
		$(this).replaceWith("<span>" + $(this).html() + "</span>");
	});
	$("font").each(function() {
		$(this).replaceWith("<span>" + $(this).html() + "</span>");
	});
});		

