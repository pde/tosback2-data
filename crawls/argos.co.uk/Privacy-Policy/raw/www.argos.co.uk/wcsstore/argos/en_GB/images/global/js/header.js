if (!argos) var argos = {};
if (!argos.loginHeader) argos.loginHeader = {};

argos.loginHeader = {
		ready:	false			
};

function isSessionChanged(oldSessionValue){
	var jsessionIdValue = unescape(Argos.Page.getCookie("Apache"));	
	return !(jsessionIdValue !="null" && jsessionIdValue.indexOf(oldSessionValue)>-1);
}

function setUserRecognised(cookieParts){
	if(cookieParts[6]=="" || cookieParts[6]=="REMEMBER_NO"){
		cookieParts[2] = "LOGGEDOUT";
		cookieParts[3] = "";
	}else{
		cookieParts[2] = "RECOGNISED";
		cookieParts[3] = "";						
	}
	var newCookieValue = "";
	for(i=0;i<cookieParts.length; i++){
		newCookieValue += cookieParts[i]+(((i+1)==cookieParts.length)?"":";");
	}						
	argos.page.setCookie("UserPersistentSessionCookie",escape(newCookieValue),(365*10)+"");
}

function setUserLoggedOut(cookieParts){
	cookieParts[2] = "RECOGNISED";
	cookieParts[3] = "";
	
	var newCookieValue = "";
	for(i=0;i<cookieParts.length; i++){
		newCookieValue += cookieParts[i]+(((i+1)==cookieParts.length)?"":";");
	}						
	argos.page.setCookie("UserPersistentSessionCookie",escape(newCookieValue),(365*10)+"");
}

argos.loginHeader = new (function(){
	
	this.displayLinks = displayLinks;
    function displayLinks(){
		var redoCookieProcessing = false;
		var redirectUserToLogout = false;
		
		//set max loop limit
		var redoCounter = 10;
		
		do{
			redoCounter-- ;
			redoCookieProcessing = false;
			// grab cookie in format "value;value;value;value;" and convert to array
			var cookieParts = unescape(Argos.Page.getCookie("UserPersistentSessionCookie")).split(";");
			if(cookieParts.length === 0) return;
			
			var firstName = unescape(cookieParts[1]); // first name from username 
				// done twice due to normalization done in UserPersistentSessionCookie			
			var state = cookieParts[2];
			var myAccountClass = cookieParts[3];
			
			var domElements = {
				welcome: $("#globalNavigation p.welcome")[0],
				signIn: $("#globalNavigation li.signIn")[0],
				register: $("#globalNavigation li.register")[0],
				signOut: $("#globalNavigation li.signOut")[0],
				myAccount: $("#globalNavigation li.myAccount")[0]
			}						

			switch(state) {
				case "LOGGEDIN":
					//Check if a JSESSIONID cookie is present and the session id here is equal to the sessionid in JSESSIONID
					//If yes cookie current else it is stale and needs to be updated
					//var jsessionIdValue = unescape(Argos.Page.getCookie("JSESSIONID"));
					if(isSessionChanged(cookieParts[5])){
						//jsessionIdValue !="null" && jsessionIdValue.indexOf(cookieParts[5])>-1){
						//Its a new session. Cookie is stale
						//Update cookie
						setUserLoggedOut(cookieParts);
						redoCookieProcessing = true;
						//redirectUserToLogout = true;
						break;
					}
					
					if(domElements.welcome !== undefined) {
						domElements.welcome.innerHTML += firstName;
					}
					
					$(domElements.signIn).remove();
					
					//my acount link is reintroduced in gift flow CR 582 - rebrand
				//	if (typeof GLOBAL_WORKFLOW != "undefined" && GLOBAL_WORKFLOW == 'ARGOS_GIFT_LIST') { 
					// 	$(domElements.myAccount).remove();
				//	} else {
						$(domElements.myAccount).find("a").addClass(myAccountClass);
				//	}
					
					$(domElements.register).remove();
					break;
				
				case "RECOGNISED":	
					$(domElements.register).remove();
					$(domElements.signOut).remove();	
					$(domElements.signIn).remove();	
					$(domElements.myAccount).addClass("last");
					if(domElements.welcome !== undefined) {
						domElements.welcome.innerHTML += firstName + '<span class="notText"> ( <a href="#" id="notUserLink">Not '+firstName+'</a> )</span>'
					}
				
					//no myaccount link when recognised during giftlist flow
					if (typeof GLOBAL_WORKFLOW != "undefined" && GLOBAL_WORKFLOW == 'ARGOS_GIFT_LIST') { 
					 	$(domElements.myAccount).remove();
					}
				
					$(domElements.register).remove();
					
					break;
				
				case "UNKNOWN":
					if(isSessionChanged(cookieParts[5])){
						setUserRecognised(cookieParts);
						redoCookieProcessing = true;
					
					}
				
				default:
					$(domElements.signOut).remove();	
					$(domElements.myAccount).addClass("last");
					
					//check if in gifting or checkout flow
					if (typeof GLOBAL_WORKFLOW != "undefined" && (GLOBAL_WORKFLOW == 'ARGOS_GIFT_LIST' || GLOBAL_WORKFLOW == 'ARGOS_CHECKOUT_FLOW')) { 
						
					 	switch(GLOBAL_WORKFLOW_TYPE) {
					 		//PEP 582 - rebrand - now only hide sign out
						 		case "ORDER_CONFIRMATION":
						 			//$(domElements.welcome).remove();
								 	//$(domElements.signIn).remove();
								 	//$(domElements.register).remove();
								 	$(domElements.signOut).remove();
									break;
								 	
								 //leave sign in block intact if on sign out page	
								 case "ARGOS_LOGOFF":
								 	break;
								 	
								 
								 	
								//no sign in top bar when undefined during giftlist or checkout flow
						 		default:
						 			$("#globalNavigation .primaryInner").remove();
						 			if (typeof GLOBAL_WORKFLOW == 'ARGOS_CHECKOUT_FLOW') {
							 			$("#globalNavigation .secondary").addClass("secondaryunknown");
									}
							}
					 	
						} 
					break;
			}
			
		}while(redoCookieProcessing && redoCounter>0);
		
		argos.loginHeader.ready = true;
		if(redirectUserToLogout){
			document.location.href="/webapp/wcs/stores/servlet/ReLogonFormView?langId="+argos.page.langId+"&storeId="+argos.page.storeId;
		}
		
		
	
	}

	this.adjustGlobalNav = adjustGlobalNav;
    function adjustGlobalNav(){
    
    	var IE6 = ($.browser.msie && parseInt($.browser.version) == 6);
    	
    	$("#globalNavigation div.primary div.trolley p span.trolleysummary").show();
    
    	var headerItemAdjust = ($("#globalNavigation div.primary p.welcome").width()>$("#globalNavigation div.primary div.trolley p").width()) ? $("#globalNavigation div.primary p.welcome").width() : $("#globalNavigation div.primary div.trolley p").width();
		headerItemAdjust -= 213; 
		
		if (headerItemAdjust>0){
			var primaryAdjust = ($("#globalNavigation div.primary").width() + headerItemAdjust);
			var additionalAdjust = ((299-primaryAdjust)/2);
			var siteSearchAdjust = ($("#globalNavigation #sitesearch").width() - headerItemAdjust + additionalAdjust);				
				
			if(primaryAdjust >299){
				primaryAdjust = 299;
			}
		
			$("#globalNavigation div.primary").css("width",primaryAdjust);
			
			if(IE6){
				$("#globalNavigation div.primary div.trolley p").css("width",primaryAdjust);	

			} else {
				$("#globalNavigation div.primary div.trolley p").css("width",primaryAdjust+10);			
			}
			
			
											
			if(siteSearchAdjust < 327){
				siteSearchAdjust = 327;
			}							
			if((siteSearchAdjust) >= 359){
				siteSearchAdjust = 359;
			}
			$("#globalNavigation #sitesearch").css("width",(siteSearchAdjust));
			
			var globalNavAdjust = (primaryAdjust + siteSearchAdjust + 199);
			
			if(globalNavAdjust >826){
				globalNavAdjust = 826;
			}							
			if(globalNavAdjust < 776){
				globalNavAdjust = 776;
			}
			
			$("#globalNavigation div.links").css("width",(globalNavAdjust));
			
		}

		$("#globalNavigation div.primary p.welcome").css("white-space","normal");
		$("#globalNavigation div.primary div.trolley p").css("white-space","normal");
		
		
		
		$("#globalNavigation div.links div.secondary a.signup").click(function(){
			var targetUrl = $(this).attr("href");
			spawn(targetUrl, 'thegos', 'width=795,height=580,directories=yes,location=yes,menubar=yes,scrollbars=yes,toolbar=yes,status=yes,resizable=yes,top=0,left=0');
			return false;		
		});
		
	}
	
	this.clearSearch = clearSearch;
    function clearSearch(options){
    
    	var config = {
			siteSearchDefaultMessage: "Search by word or catalogue number"
    	}
    
    	if(typeof options === "object") {
			config.siteSearchDefaultMessage = (typeof options.siteSearchDefaultMessage === "string") ? options.siteSearchDefaultMessage : config.siteSearchDefaultMessage;
    	}
    	
    	$("#globalNavigation #sitesearch input#search").focus(function() {
			if( this.value == config.siteSearchDefaultMessage ) {
				this.value = "";
			}
		});
  	}
	
});
