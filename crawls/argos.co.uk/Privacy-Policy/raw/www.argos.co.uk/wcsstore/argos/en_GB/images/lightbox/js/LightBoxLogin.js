var LightBoxLogin = {};
var LoggedInTimeout = {};
$(document).ready(function(){

	/*************************************************************
	* do not run when on comparison page
	*************************************************************/
	var isComparisonPage = $("body").hasClass("productcompare");
	//if(isComparisonPage) return;

	var IE6 = ($.browser.msie && parseInt($.browser.version) == 6);
	var IE7 = ($.browser.msie && parseInt($.browser.version) == 7);
	var FF = ($.browser.mozilla); //needs work to not do it for FF3 etc

	var dialogue = $("#lightBox")[0];
	var	overlay = $("#overlay")[0];	
	//next toggle used on trolley lister only
	var forceTopMargin = false;
	LoggedInTimeout = new (function(){
		/*
		var	cookieParts = unescape(Argos.Page.getCookie("UserPersistentSessionCookie")).split(";");
       	var timeoutActiveUser;
       	var timeoutDelay = 3600000; //(60mins)

    	if(cookieParts[2] == "LOGGEDIN") {
       		timeoutActiveUser = setTimeout(function() {window.location = "/webapp/wcs/stores/servlet/ArgosLogoff?langId="+argos.page.langId+"&storeId="+argos.page.storeId+"&timeoutActiveUser=yes";},timeoutDelay);
			window.onunload = function() {
    			clearTimeout(timeoutActiveUser);
		   	}
    	}
    	*/
	});
	
	LightBoxLogin = new (function(){

		if(typeof LOGIN_REGISTRATION_NEW_ENABLED == 'undefined' || LOGIN_REGISTRATION_NEW_ENABLED!="true") return;				
		$("a#signInError, input#buyUsingInstantCreditButton.recognised, input#buyForHomeDeliveryButton.loggedOut, a#loginLink, a#myAccountLink:not(.loggedIn), a.setupListLoginLightBox, a.amendListLoginLightBox").bind("click", loginLink_onClick);	    	    
		
		//Bind events for skip links
		//$("a#skipLinkLoginLink, a#skipLinkMyAccountLink:not(.loggedIn)").bind("click", loginLink_onClick);
		
		//Bind login events
		//$("input#enterDiffDelAddress.recognised").bind("click", loginLink_onClick);
		
		
		//force top margin in lister
		$("a#loginLink, a#myAccountLink").bind("click", function() {
			forceTopMargin = true;
		});
		
		$("a#notUserLink").bind("click", function(){
			//signOut(); this link refers to signintoanother account and not the direct signout link
			setUserLoggedOut();
		});
		
		$("li.signOut").bind("click", function(){
			signOut();			
		});
		
	    $("input#continueToCheckout").bind("click", function(){
	    	var radios = $("input[name='chtype']");
	    	var showLightbox = false;
	    	for(var i = 0; i < radios.length; i++) {
	    		if(radios[i].checked){
		    		if(radios[i].value === "del" ) {
		    			showLightbox = true;
		    			break;
		    		}else if( radios[i].value === "cre"){
		    			if($("input#buyUsingInstantCreditButton").hasClass("recognised")){
			    			showLightbox = true;
			    			break;
			    		}
		    		}
		    	}
	    	}
   			if(showLightbox) {
   				loginLink_onClick.call(this);
   				return false;
   			}
	    	return true;
	    });
	    
	    this.TRK_EVENTS={ 
	    		signinsuccessful: 			{tag:"", event:"event5"}, 	
	    											//The 'signinsuccessful' event is invoked only when the user is successfully logged on and 
	    											//not on click of a link like the others
	    		lightboxclose: 				{tag:"login:accountsignin:close:", 						event:"event3"},
                lightboxforgotpwd: 			{tag:"login:accountsignin:forgotpassword:", 			event:"event3"},
                lightboxsignin: 			{tag:"login:accountsignin:signin:", 					event:"event3"},
                lightboxsignout: 			{tag:"login:accountsignin:signout:", 					event:"event3"},
                lightboxsignintoanother: 	{tag:"login:accountsignin:signintoanotheraccount:", 	event:"event3"},
                lightboxnewaccount: 		{tag:"login:accountsignin:createnewaccount:", 			event:"event3"},
                lightboxcontinuewithout: 	{tag:"login:accountsignin:continuewithoutsigningin:", 	event:"event3"}
	    };
	    
	    this.signOut = signOut;
	    function signOut(){
	    	LightBoxLogin.trackLightboxEvents(this, LightBoxLogin.TRK_EVENTS.lightboxsignout);
	    }
	    
	    this.trackLightbox = trackLightbox;
	    function trackLightbox(){
	    	var s=s_gi(s_account);
			s.tl(this,'o','Login lightbox');
	    }
	    
	    this.getTrackingObj = getTrackingObj;
	    function getTrackingObj(input){
	    	var output;	    	
	    	if($.browser.msie){
	    		//Create new object without the attributes that crash inside s_code in IE
		    	output = new Object();
		    	try{
			    	for(g in input){
						output[g] = input[g];			    	
			    	}
		    	}catch(e){/*silent failure*/}
	    	}else{
	    		output = input;
	    	}
	    	
	    	return output;
	    }

	    this.trackLightboxEvents = trackLightboxEvents;
	    function trackLightboxEvents(obj, action){
	    	//alert(obj+"\n"+action.tag+"\n"+action.event+"\n");	    	
	    	var s=s_gi(s_account);                
			s.linkTrackVars="events,products,eVar15";					
			if(typeof action.tag !== "undefined" && action.tag !=="" ){				
				s.eVar15=action.tag;
			}
			if(typeof action.event !== "undefined" ){
				s.linkTrackEvents=action.event;
				s.events=action.event;				
			}	
			
			//alert("s.linkTrackVars="+s.linkTrackVars+"\n"+"s.eVar15="+s.eVar15+"\n"+"s.linkTrackEvents="+s.linkTrackEvents+"\n"+"s.events="+s.events+"\n");					
			var obj = LightBoxLogin.getTrackingObj(obj);
			s.tl(obj,'o','Login lightbox');	
	    }	    
	    this.trackLightboxEventsSignedInError = trackLightboxEventsSignedInError;	    
	    function trackLightboxEventsSignedInError(obj, action){
	    	//alert(obj+"\n"+action.tag+"\n"+action.event+"\n");	    	
	    	var s=s_gi(s_account);                
			s.linkTrackVars="events,products,eVar15,prop14";	
			s.prop14="ar:trolley:buy:yourdetails:signedinerror";				
			if(typeof action.tag !== "undefined" && action.tag !=="" ){				
				s.eVar15=action.tag;
			}
			if(typeof action.event !== "undefined" ){
				s.linkTrackEvents=action.event;
				s.events=action.event;				
			}
			s.prop14="ar:trolley:buy:yourdetails:signedinerror";
			//alert("s.linkTrackVars="+s.linkTrackVars+"\n"+"s.eVar15="+s.eVar15+"\n"+"s.linkTrackEvents="+s.linkTrackEvents+"\n"+"s.events="+s.events+"\n");					
			var obj = LightBoxLogin.getTrackingObj(obj);
			s.tl(obj,'o','Login lightbox');	
	    }
	    this.setUserLoggedOut = setUserLoggedOut;
	    function setUserLoggedOut(){ 	
	    	var cookieParts = unescape(Argos.Page.getCookie("UserPersistentSessionCookie")).split(";");
	    	var newCookieValue = "";
	    	if(cookieParts.length >=7){
				cookieParts[2] = "RECOGNISEDOUT";
				cookieParts[3] = "";				
				//alert("logged out now");
				for(i=0;i<cookieParts.length; i++){
					newCookieValue += cookieParts[i]+(((i+1)==cookieParts.length)?"":";");
				}						
			}
			argos.page.setCookie("UserPersistentSessionCookie",escape(newCookieValue),"");
			window.location.reload();
		}
	    
	    /*
	     * This will call an AJAX request and show a lightbox
	     * Some subtle differences in the request occur depending on the id of the link that was clicked
	     * @param void
	     * @return false (to stop default action)
	     */
	    this.loginLink_onClick = loginLink_onClick;
	    function loginLink_onClick() { 
	    	
	    	if(argos.page.storeId == undefined){argos.page.storeId=10151;}
	    	if(argos.page.langId == undefined){argos.page.langId=110;}
	    	var data = "&storeId="+argos.page.storeId+"&langId="+argos.page.langId;   	
	    	var loginReturnAction ="";
	    	
			switch(this.id) {				
				case "notUserLink":
					data += "&notMeClicked=true";
					data += "&lightboxSrc=TOPNAV_NOTME";
				case "signInToOtherAccount":
					var lastKnownUser = getLastLoggedOutUser();
					if(lastKnownUser != ""){
						data+="&lastKnownUser="+lastKnownUser;
					}
					data += "&lightboxSrc="+$("input#lightboxSrc").val();					
				/*
					FSD Signin v0.9
					071: The customer Signs out (e.g. clicks on ‘Not xxxxxxxxx’ link in the header or on the Sign out link) 
					074: The system deletes the ‘Remember Me’ cookie and signs the customer out. They are now unknown.				
				*/
					//if(this.id == 'signInToOtherAccount'){
						try{
							argos.page.setCookie("UserPersistentSessionCookie","",-1);
						} catch(e){}					
					//}
					LightBoxLogin.trackLightboxEvents(this, LightBoxLogin.TRK_EVENTS.lightboxsignintoanother);
			  		data += "&overrideRecognised=true&loginAsDifferentUser=true";			  		
					break;
				case "enterDiffDelAddress"://same behaviour as 'buyForHomeDeliveryButton'
					data += "&showContinueWithoutSigninButton=true&workflow=ARGOS_TROLLEY_LISTER&workflowType=TROLLEY_LISTER";
			  		data += "&lightboxSrc=ENTER_DIFF_DEL_ADDRESS";
				case "buyForHomeDeliveryButton":
			  		data += "&showContinueWithoutSigninButton=true&workflow=ARGOS_TROLLEY_LISTER&workflowType=TROLLEY_LISTER";
			  		data += "&lightboxSrc=BUY_FOR_HOMEDELIVERY";
			  		break;
			  	case "buyUsingInstantCreditButton":
			  		data += "&showContinueWithoutSigninButton=true&workflow=ARGOS_TROLLEY_LISTER&workflowType=TROLLEY_LISTER";
			  		data += "&lightboxSrc=BUY_USING_INSTANTCREDIT";
			  		break;
			  	case "continueToCheckout":			  		
			  		data += "&showContinueWithoutSigninButton=true&workflow=ARGOS_TROLLEY_LISTER&workflowType=TROLLEY_LISTER";
			  		data += "&lightboxSrc="+selectedOrderType();
			  		break;
			  	case "skipLinkMyAccountLink":			  	
			  		//when ever this skip link is available the user will be logged in so wud never occur
			  		//do nothing 
			  		break;
			  	case "myAccountLink":
			  		loginReturnAction = encodeURIComponent( "https://" + window.location.host + "/webapp/wcs/stores/servlet/EditMyAccount?storeId="+argos.page.storeId+"&langId="+argos.page.langId);			  		
			  		data += "&lightboxSrc=MY_ACCOUNT";
			  		break;			  	
			  	
			}	
			try{
				if(prepareLoginRequest){				
		    		data += prepareLoginRequest(this.id);    						
		    	}	   

	    	}catch(e){}

	    	if(data.indexOf("&returnURL=")==-1){
		    	data+="&returnURL="+encodeURIComponent( window.location.href );
		    }
	    	try{
	  	 		if(loginReturnAction==""){
		    		loginReturnAction = $("#loginReturnAction").val();
		    	}
	    		if(loginReturnAction){
		    		data +="&loginReturnAction="+loginReturnAction;
		    	}
	    	}catch(e){}
	    	data = preprocessData(data);	
			LightBox.setHTML(LightBox.loadingHTML);
			LightBox.showOverlay();
	        LightBox.setOverlayTooltip("To close the login tool box click on the 'Close X' link") 
	       	LightBox.showLightBox();	       	
			//reposition if required - false = not resizing window
			compTablePositioning(false);
			LightBox.extended.request({
				url: "https://" + window.location.host + "/webapp/wcs/stores/servlet/Login",
				dataType: "jsonp",
				type: "get",
				data: data,
				success: showLoginLightBox,
				error: showRequestError
			});
		    return false;
	    }
	    
	    /*
	     * shows the login form and calls prepare function
	     * @param json as json response object
	     * @return void
	     */
	    function showLoginLightBox(json) {
	    	LightBox.hideLightBox();
			LightBox.setHTML(json.html);
			giftingAdjustments();
			shadowAdjustments();
			LightBox.showLightBox();
			//reposition if required - false = not resizing window
			compTablePositioning(false);
			lightBoxFormFocus();
			topMarginAdjustments();
			LightBoxLoginForm.init();			
			
		} 
			
	    function preprocessData(requestData){	    	

			if(requestData.indexOf("&workflow=")==-1 && typeof GLOBAL_WORKFLOW != 'undefined'){
				requestData = requestData+"&workflow="+GLOBAL_WORKFLOW;
			}
			if(requestData.indexOf("&workflowType=")==-1 && typeof GLOBAL_WORKFLOW_TYPE != 'undefined'){
				requestData = requestData+"&workflowType="+GLOBAL_WORKFLOW_TYPE;
			}
			return requestData;
		}
		
	    /*
	     * Shows an AJAX request error in a lightbox
	     * @param XMLHttpRequest as object
	     * @param textStatus as string
	     * @param errorThrown as string
	     * @return void
	     */
	    this.showRequestError = showRequestError;
	    function showRequestError(XMLHttpRequest, textStatus, errorThrown) {
	    	
	    	var html = '';
	    	html += '<div id="lightBoxError">';
	    	html +=		'<div class="heading"><h2>An error occured</h2><a href="#" class="closeLightBox">Close</a></div>'
	    	html +=		'<div class="details">';
	    	html +=			'<p>Request: '+XMLHttpRequest+'</p>';
	    	html +=			'<p>Status: '+textStatus+'</p>';
	    	html +=			'<p>Code: '+XMLHttpRequest.status+'</p>';
	    	html +=			'<p>Error: '+errorThrown+'</p>';
	    	html +=		'</div>';
	    	html += '</div>';
	    	LightBox.hideLightBox();
	    	LightBox.setHTML(html);
	    	giftingAdjustments();
			shadowAdjustments();
	    	LightBox.showLightBox();
	    	//reposition if required - false = not resizing window
			compTablePositioning(false);
			lightBoxFormFocus();
			topMarginAdjustments();
	    }	
	    
	    function getLastLoggedOutUser(){	
			var cookieParts = unescape(Argos.Page.getCookie("UserPersistentSessionCookie")).split(";");
			if(cookieParts.length === 0) return "";
			
			var userId = cookieParts[0];
			var state = cookieParts[2];
			return userId;		
		}
	    	
		this.giftingAdjustments = giftingAdjustments;
		function giftingAdjustments() {
			if (typeof GLOBAL_WORKFLOW != "undefined"){ 
				if (GLOBAL_WORKFLOW == "ARGOS_GIFT_LIST") {
					//reshape lightbox if amending list (not setting up)
					if ($("#loginformWorkflowType").val() == "GIFT_LIST_AMEND") {
						$(dialogue).addClass("amendgiftingflow");
					}
				}
			}
		}
		
		this.shadowAdjustments = shadowAdjustments;
		function shadowAdjustments() {	
			if(IE6) {
				//ie6 needs dropshadow container dimensions
				var dialogueShadow = $("#lightBox .lightBoxShadow")[0];
				if ($(dialogueShadow)) {
					$(dialogueShadow).css({
						height: $(dialogue).height()+"px",
						width: $(dialogue).width()+"px"
	}); 
				}
			}
		}

		this.topMarginAdjustments = topMarginAdjustments;
		function topMarginAdjustments() {		
			
			var lightBoxY = "64px";
			if (IE7) {
				lightBoxY = "67px";
			} 
			
			if (!FF && isComparisonPage) {
				lightBoxY = "50px";
			}
		
			//login light box has specific top margin when not in trolley lister
			if (typeof GLOBAL_WORKFLOW_TYPE != "undefined"){ 
				if (GLOBAL_WORKFLOW_TYPE != "TROLLEY_LISTER" || forceTopMargin) {	
					$(dialogue).css({top: lightBoxY});
				} 
			} else {
				$(dialogue).css({top: lightBoxY});
			}
		}
	
		this.lightBoxFormFocus = lightBoxFormFocus;
		function lightBoxFormFocus() {
			var input = $("#lightBoxLogin").find('input[type="text"]')[0] || null;
			if(input) {
				//ie requires focus to be set twice
				input.focus();
				input.focus();				
			}
		}
	
		this.compTablePositioning = compTablePositioning;
	    function compTablePositioning(resized) {
    		if (isComparisonPage) {
    		  	//calculate diff between window and default outerwrap width and initial X positions
				var viewDiff = ($(window).width() - 896);
				var lightBoxX = argos.product.comparison.result.getPageX(document.getElementById("lightBox"));
				var overlayX = argos.product.comparison.result.getPageX(document.getElementById("outerwrap"));
	
				if (IE7) {
					if (!resized) {		
						if (viewDiff > 0) {
							lightBoxX = (lightBoxX - viewDiff/2);
							$(dialogue).css({left: lightBoxX + "px"});
						} 
					}	
	
				} else if (!FF) {	
					viewDiff = ($(window).width() - $("#outerwrap").width());
					if (viewDiff > 0) {
						overlayX -= (viewDiff/2);
						lightBoxX -= (viewDiff/2);
					} else {
						overlayX += (viewDiff/2);
					}				
					if (IE6) {					
						$(overlay).css({left: overlayX + "px"});	
									
					}
					if (!resized) {
						$(dialogue).css({left: lightBoxX + "px"});
						
					} 
				}			
			}
		}

		
		this.lightBoxAdjustments = lightBoxAdjustments;
	    function lightBoxAdjustments() {
	    	giftingAdjustments();
			shadowAdjustments();
			//reposition if required - false = not resizing window
			compTablePositioning(false);
			lightBoxFormFocus();
			topMarginAdjustments();
	    }
	}); 
});

var LightBoxLoginForm = new (function() {
	this.init = init;
	function init() {
		$(window).bind("resize", function(){
			//reposition if required - true = resizing window
			LightBoxLogin.compTablePositioning(true);
		});
		$("#lightBoxLogin form").bind("submit", loginForm_onSubmit);
		$("#lightBoxLogin #forgotPassword").bind("click", loginForm_onSubmit);
		$("a#lightboxcreatenewaccount").bind("click", loginForm_onSubmit);		
		// continueWithoutSignInFunc only sometimes exists, page specific
		if(typeof continueWithoutSignInFunc === "function") {
			$("#continueWithoutSignInButton").bind("click", function(){
				LightBoxLogin.trackLightboxEvents($("div#withoutSignin"), LightBoxLogin.TRK_EVENTS.lightboxcontinuewithout);
				continueWithoutSignInFunc();
			});			
		}else{
			$("#continueWithoutSignInButton").bind("click", continueWithoutSignInGeneric);
		}
		$("a#signInToOtherAccount").bind("click", LightBoxLogin.loginLink_onClick);
		$("input#returnURL").val(window.location.href);	
		
		
		$("#lightBoxLogin .closeLightBox").bind("click", closeLightBox_onClick);
		
			
	}
	
	function closeLightBox_onClick() {
		try {
			argos.page.setCookie("UserPersistentSessionCookie","",-1);
		} catch(e){}
		$(window).unbind("resize");
		LightBoxLogin.trackLightboxEvents(this, LightBoxLogin.TRK_EVENTS.lightboxclose);
		var doReload = ("true" == onCloseHandler());
		if(doReload){
			window.location.reload()
		}
		return false;
	}
	
	function onCloseHandler(){
		if(typeof loginLightboxOnClose =='function'){
			return loginLightboxOnClose(); //This method should return a string "true" or "false" to control page reload on close.
		}

		return "true";
	}
	
	
	/*
	 * when the form is submitted an AJAX post will occur
	 * @param void
	 * @return false (to stop default action) 
	 */
	function loginForm_onSubmit() {			
		var data = $("#lightBoxLogin form").serialize();		
		switch(this.id) {
			case "continueWithoutSignIn":
				data += "&continueWithoutSignIn=true";				
				LightBoxLogin.trackLightboxEvents(this, LightBoxLogin.TRK_EVENTS.lightboxcontinuewithout);				
				break;
			case "signInToOtherAccount":
				data += "&loginReturnAction="+$("#loginReturnAction").val();
				LightBoxLogin.trackLightboxEvents(this, LightBoxLogin.TRK_EVENTS.lightboxsignintoanother);
				break;
			case "forgotPassword":
				data += "&gethelp.x=1";
				LightBoxLogin.trackLightboxEvents(this, LightBoxLogin.TRK_EVENTS.lightboxforgotpwd);
				break;
			case "lightboxcreatenewaccount":
				LightBoxLogin.trackLightboxEvents(this, LightBoxLogin.TRK_EVENTS.lightboxnewaccount);
				window.location.href=this.href;	
				return false;//do no further processing							
			default :				
				LightBoxLogin.trackLightboxEvents(this, LightBoxLogin.TRK_EVENTS.lightboxsignin);
		}
    	if(data.indexOf("&returnURL=")==-1){
			data+="&returnURL="+window.location.href;
		}
		data = preprocessData(data);
		LightBox.hideLightBox();
		LightBox.setHTML(LightBox.loadingHTML);
		LightBox.showLightBox();
		//reposition if required - false = not resizing window
		LightBoxLogin.compTablePositioning(false);
		LightBox.extended.request({
			url: "https://" + window.location.host + "/webapp/wcs/stores/servlet/LoginSecure",
			dataType: "jsonp",
			type: "get",
			success: checkLoginState,
			data: data,
			error: LightBoxLogin.showRequestError
		});
		return false;
	}
		
	/*
	 * Check to see if the user is logged in successfully
	 * @param json as json response object
	 * @return void
	 */
	function checkLoginState(json){

		if(json.status == "success") {
			//User has logged in successfully
			if(json.loginReturnAction!='ForgotPassword')LightBoxLogin.trackLightboxEvents(this, LightBoxLogin.TRK_EVENTS.signinsuccessful);											
			LightBox.hideLightBox();
			LightBox.hideOverlay();				
			try{							
				if(typeof json.loginReturnAction !='undefined'){					
					if(json.loginReturnAction=='REDIRECT_TO_RETURN_URL'){ // Since all pages may not have a processLoginResponse we handle it here						
						window.location.href=json.returnURL;
					}else if(json.loginReturnAction=='ForgotPassword'){
						window.location.href=json.returnURL; // The returnURL has been updated by the LogonCmd
					}else if(json.loginReturnAction.indexOf("EditMyAccount")>-1){
						window.location.href=json.loginReturnAction;
					}else{						
						//alert("processLoginResponse");
						//If you need page level response handling add a loginReturnAction param to your request
						// and define processLoginResponse on your page
						if(typeof processLoginResponse == 'function'){							
							processLoginResponse(json);
						}
					}
				}else{
					alert("json.loginReturnAction is 'undefined'");
				}
			}catch(e){}
			
		}
		else {
			try{
				//if called from trolley list, set the prop14
				if(typeof trolleyList != 'undefined'){
					LightBoxLogin.trackLightboxEventsSignedInError(this, LightBoxLogin.TRK_EVENTS.lightboxsignin);
				}
			}catch(e){}

			LightBox.hideLightBox();
			LightBox.setHTML(json.html);
			LightBox.showLightBox();
			LightBoxLogin.lightBoxAdjustments();
			LightBoxLoginForm.init();
		}
	}		
		
	/*
	 * Hides the lightbox
	 * @param void
	 * @return false (to stop default action) 
	 */
	function continueWithout_onClick() {
		LightBox.hideLightBox();
		LightBox.hideOverlay();
		return false;
	}	
	
	function preprocessData(requestData){

		if(requestData.indexOf("&workflow=")==-1 && $("div#global_variables div#global_workflow").length>0){
			requestData = requestData+"&workflow="+$("div#global_variables div#global_workflow").html();
		}

		if(requestData.indexOf("&workflowtype=")==-1 && $("div#global_variables div#global_workflowtype").length>0){
			requestData = requestData+"&workflowtype="+$("div#global_variables div#global_workflowtype").html();
		}

		return requestData;
	}
	
	function continueWithoutSignInGeneric(){
		try{
			argos.page.setCookie("UserPersistentSessionCookie","",-1);
		} catch(e){}
		LightBoxLogin.trackLightboxEvents(this, LightBoxLogin.TRK_EVENTS.lightboxcontinuewithout);
		window.location.reload();
	}
	
	
	
});
