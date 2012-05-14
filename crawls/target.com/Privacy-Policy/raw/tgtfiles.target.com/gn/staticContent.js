$(document).ready(function() {
	//For Static assets path
	Target.globals.loadingIndicatorImage = Target.globals.staticAssetsPath+"images/spinner-small.gif";
	
	//For Login Section
	Target.globals.endedText = "Your session has been inactive and it has now ended. You may be required to login again.";
	Target.globals.extendText = "Your session will end if left inactive. Would you like to extend your session now?";
	Target.globals.redirectText = "Your session has been inactive and it has now ended. You may be required to login again.";
	Target.globals.loginWrapper={
			"guestUser":{
				"welcomeGuestUser":"hello guest",
				"welcome":
					{"id":"OpenLoginPopup","title":"sign in","url":"javascript:void(0)","text":"sign in"},
				"myAccount":
					{"id":"headerMyAccount","title":"my account","url":Target.globals.LoginURL,"text":"my account"},
				"loginStatus":
					{"id":"headerGuest","title":"new guest","url":Target.globals.RegisterURL,"text":"new guest?"}					
			},
			"LoggedUser":{
				"welcomeLoggedUser":"${loggedUserGreeting}",
				"welcome":
					{"id":"headerWelcome","title":"","url":"","text":"Hello "},		
				"loginStatus":
					{"id":"headerMyAccount","title":"my account","url":Target.globals.UserHomeURL,"text":"my account"},		
				"myAccount":
					{"id":"headerGuest","title":"sign out","url":Target.globals.LogoffURL,"text":"sign out"}	
			}
	}
	//TypeAhead URL
	Target.globals.autocompleteURL = Target.globals.typeAheadUrl;
	$("#Login-container").ready(
		function()
		{			
			$("#Login-container").hide();
		}
	)
	//GRDA URL
	Target.globals.loadListGRDA = Target.globals.serverName+"/LoadListView?";

	//For Forsee Trigger
	GlobalURLs = {  urlMap: {} };
	GlobalURLs.urlMap.staticAssetsPath = Target.globals.staticAssetsPath;      	
	GlobalURLs.urlMap.basePageHost = Target.globals.basePageHost;
	
	//To load CI js
	var isSecureLinkKey = $("#secureLinkKey_12033_landing");
	if(typeof isSecureLinkKey != "undefined" && isSecureLinkKey.length > 0){
	    var absPath = GlobalURLs.urlMap.staticAssetsPath;
		Target.util.loadScript({
			src: absPath + 'javascript/CI/12033_landing.js', 
			delayLoad: true,
	 		cache : true
		})
	}else{
		Target.util.loadScript({
			src:Target.globals.staticAssetsPath+'javascript/CI/12033_landing.js',
			delayLoad: true,
				cache : true
		})
	}
	
	//To check User ID
	var userActiveId = "",
		sess_id=Target.controller.header.cookie.read(Target.globals.JSESSIONID);
	
	userActiveId=Target.controller.header.cookie.readUserActivityfromCookieForRR(sess_id);
	$(document).trigger('session-start.framework');
	 
	 //Error Code Script
	 var errorCode = Target.globals.errorCode,
		orgReferrelUrl = Target.globals.currentUrl,
		currentView = "",
		currentUrl = "";
	
	Target.globals.loginLinks={
		currentView:"",
		currentUrl:""
	}
	
	if(errorCode != null && errorCode !="") {
		Target.globals.loginLinks.currentView = "ErrorViewLogin";
	} else {
		Target.globals.loginLinks.currentView = Target.globals.currentView;
	}
	if(orgReferrelUrl != null && orgReferrelUrl !="") {
		Target.globals.loginLinks.currentUrl = Target.globals.currentUrl;
	} else {
		Target.globals.loginLinks.currentUrl = "";
	}
});